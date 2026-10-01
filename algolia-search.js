// Algolia site search + AI assistant — replaces Mintlify's built-in search
// and its AI assistant.
//
// One InstantSearch.js instance, two widgets and a button:
// - `autocomplete` (#autocomplete, in the navbar): docs search over the
//   Crawler index, in the widget's detached mode at every width, so the
//   navbar holds a trigger button and searching happens in a centred modal
//   (the shape Mintlify's search had; the home page CTA and Cmd+K open the
//   same modal). The search field carries the widget's "AI Mode" button,
//   which closes the modal and hands the typed query to the chat.
// - `chat` (#assistant, appended to <body>): the Agent Studio agent
//   "Documentation assistant" (dashboard: Algolia > Agent Studio > Agents;
//   its instructions, model, provider, search tool and approved domains
//   live there). Answers stream from
//   https://1qkgbjtdh4.algolia.net/agent-studio/1/agents/<AGENT_ID>/completions
//   which the widget calls itself with the same search-only key. The
//   conversation and the open state persist in sessionStorage (widget
//   default), so they survive page navigation.
// - our own "Ask AI" button (#assistant-trigger, next to the search
//   trigger). It drives the chat through the widget's render state
//   (setOpen / focusInput / sendMessage — the same handles AI Mode uses),
//   NOT through the `chatTrigger` widget: that widget keeps its own copy
//   of the open state, refreshed only when the instance re-renders, which
//   this instance (no main-index search) never does — so after an AI Mode
//   open it took two clicks to close. Cmd+I toggles the same button.
// The widgets MUST share one instance: AI Mode reaches the chat through
// the instance's render state, so a chat rendered by another instance
// would never receive the query. That is also why this file owns the
// search widget's configuration (index, templates, item URLs) instead of
// loading the Algolia Experiences snippet used earlier: an experience is
// its own instance, and the only way to add the assistant to it is the
// dashboard.
//
// Assets come from jsDelivr, pinned: the InstantSearch.js UMD bundle, the
// algoliasearch v5 lite client (UMD, global `algoliasearch/lite`) and the
// satellite theme stylesheet (tokens + autocomplete/chat/AI-mode styles;
// style.css "Site search" section overrides it). Mintlify inlines every
// repo .js file as an inline <script>, so these are injected at runtime.
// If a script fails to load, nothing here renders and Mintlify's own search
// stays usable (style.css hides it only while the widget is rendered).
//
// What this file also owns:
// - Containers. The widgets render into elements created here:
//   #bru-search-tools (> #assistant-trigger + #autocomplete) is appended as
//   the last child of the navbar rail row that already holds Mintlify's
//   search corners, located via #search-bar-entry / #search-bar-entry-mobile
//   (mintlify.com/docs/customize/custom-scripts), so it is in the DOM at
//   every viewport width; #assistant goes on <body>, out of React's reach.
// - Survival across React re-renders. Mintlify's navbar is React-owned, and
//   SPA navigation / version switches can rebuild it, discarding injected
//   nodes. tick() re-inserts the SAME wrapper (the widgets' Preact tree
//   inside it survives the move) and, if the widget itself is gone, mounts
//   a fresh instance. Remounts are capped so a broken setup can't loop.
// - Keyboard shortcuts. Mintlify opens its search/AI modal on Cmd/Ctrl+K
//   and toggles the assistant panel on Cmd/Ctrl+I. Both are intercepted in
//   the capture phase on window, ahead of Mintlify's document-level
//   handlers: Cmd+K opens the search modal (or focuses its input if it is
//   already open) and Cmd+I toggles the assistant panel, each once its
//   widget has rendered. Escape closes the search modal if it is open
//   (the widget only collapses the result list on Escape; Mintlify's modal
//   closed, so that's what people expect), otherwise the assistant panel.
// - window.bruAlgoliaSearch.focus() / .ask(message?), used by
//   home-search.js for the home page's search CTA (and available for an
//   "Ask AI" CTA: ask("question") opens the panel and sends it).
(function () {
  var APP_ID = "1QKGBJTDH4";
  var SEARCH_KEY = "3719e057af05aa9d9b579b3e75b29343"; // search-only, public
  var INDEX_NAME = "docs_usebruno_com_1qkgbjtdh4_pages";
  var AGENT_ID = "1a045459-f86d-476b-967c-91cfc358193e";
  var CDN = "https://cdn.jsdelivr.net/npm/";
  var ASSETS = [
    {
      kind: "css",
      src: CDN + "instantsearch.css@8.22.1/themes/satellite-min.css",
    },
    {
      kind: "js",
      src: CDN + "algoliasearch@5.59.0/dist/lite/builds/browser.umd.js",
    },
    {
      kind: "js",
      src:
        CDN + "instantsearch.js@4.117.0/dist/instantsearch.production.min.js",
    },
  ];
  var MAX_REMOUNTS = 5;

  var tools = null; // #bru-search-tools, in the navbar rail row
  var searchEl = null; // #autocomplete
  var triggerEl = null; // #assistant-trigger, our own <button>
  var panelEl = null; // #assistant, on <body>
  var search = null; // the InstantSearch instance
  var loadState = "idle"; // idle | loading | ready | failed
  var everRendered = false;
  var remounts = 0;
  var timer = 0;

  // ---------------------------------------------------------------- DOM

  // The rail row: parent of the desktop search wrapper (which holds
  // #search-bar-entry) and of the mobile icon cluster (#search-bar-entry-mobile).
  function findRow() {
    var entry =
      document.getElementById("search-bar-entry") ||
      document.getElementById("search-bar-entry-mobile");
    var wrapper = entry && entry.parentElement;
    return wrapper ? wrapper.parentElement : null;
  }

  function el(tag, id) {
    var node = document.createElement(tag);
    node.id = id;
    return node;
  }

  // Static markup only (no user data), so innerHTML is fine.
  var SPARKLE_SVG =
    '<svg viewBox="0 0 24 24" width="16" height="16" fill="none"' +
    ' stroke="currentColor" stroke-width="1.8" stroke-linecap="round"' +
    ' stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/>' +
    '<path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>' +
    "</svg>";

  function ensureContainers() {
    var row = findRow();
    if (!row) return false;
    if (!tools) {
      tools = el("div", "bru-search-tools");
      triggerEl = el("button", "assistant-trigger");
      triggerEl.type = "button";
      triggerEl.title = "Ask AI (\u2318I)";
      triggerEl.setAttribute("aria-expanded", "false");
      triggerEl.innerHTML =
        SPARKLE_SVG + '<span class="bru-ask-label">Ask AI</span>';
      triggerEl.addEventListener("click", toggleChat);
      searchEl = el("div", "autocomplete");
      tools.appendChild(triggerEl);
      tools.appendChild(searchEl);
      panelEl = el("div", "assistant");
      // Mirror the panel's open state onto the button (aria-expanded).
      new MutationObserver(syncTrigger).observe(panelEl, {
        attributes: true,
        attributeFilter: ["class"],
        subtree: true,
      });
    }
    // appendChild moves an already-attached node, widgets included.
    if (tools.parentElement !== row) row.appendChild(tools);
    if (panelEl.parentElement !== document.body)
      document.body.appendChild(panelEl);
    return true;
  }

  function searchRendered() {
    return !!(searchEl && searchEl.querySelector(".ais-Autocomplete"));
  }

  // ------------------------------------------------------------- assets

  function loadAssets(done) {
    var pending = 0;
    ASSETS.forEach(function (asset) {
      var node;
      if (asset.kind === "css") {
        node = document.createElement("link");
        node.rel = "stylesheet";
        node.href = asset.src;
        node.onerror = function () {
          console.warn(
            "[bruno-docs] Algolia theme stylesheet failed to load",
            asset.src,
          );
        };
        document.head.appendChild(node);
        return; // Styling only; never blocks the widgets.
      }
      pending++;
      node = document.createElement("script");
      node.src = asset.src;
      node.onload = function () {
        if (--pending === 0 && loadState === "loading") done();
      };
      node.onerror = function () {
        loadState = "failed";
        console.warn(
          "[bruno-docs] Algolia search failed to load; Mintlify search stays active.",
          asset.src,
        );
      };
      document.body.appendChild(node);
    });
  }

  // ---------------------------------------------------------- templates

  // Crawler records: title ("Page Title - Bruno Docs"), url, headers (the
  // page's headings, some with zero-width prefixes, plus Mintlify chrome
  // the crawler picked up), content, image.
  var TITLE_SUFFIX =
    /\s*[-–|]\s*(?:<mark>)?Bruno(?:<\/mark>)?\s+(?:<mark>)?Docs(?:<\/mark>)?\s*$/i;
  var CHROME_HEADINGS = /^(documentation index|on this page)$/i;

  function stripSuffix(s) {
    return String(s || "").replace(TITLE_SUFFIX, "");
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function humanize(segment) {
    return segment.replace(/[-_]+/g, " ").replace(/\b[a-z]/g, function (c) {
      return c.toUpperCase();
    });
  }

  // "Variables › Environment Variables" from the URL path, minus the page.
  function sectionOf(url) {
    try {
      var segments = new URL(url, location.href).pathname
        .split("/")
        .filter(Boolean);
      segments.pop();
      return segments.map(humanize).join(" › ");
    } catch (e) {
      return "";
    }
  }

  function headingsOf(item) {
    var title = stripSuffix(item.title).trim().toLowerCase();
    var seen = {};
    return (item.headers || [])
      .map(function (h) {
        return String(h).replace(/[​‌﻿]/g, "").trim();
      })
      .filter(function (h) {
        if (
          !h ||
          CHROME_HEADINGS.test(h) ||
          h.toLowerCase() === title ||
          seen[h]
        )
          return false;
        seen[h] = true;
        return true;
      })
      .slice(0, 4)
      .join(" · ");
  }

  // The widget escapes hit strings and turns its highlight tags into
  // <mark>, so _highlightResult values are safe to render as HTML.
  function highlightedTitle(item) {
    var hl = item._highlightResult && item._highlightResult.title;
    var value =
      hl && hl.value ? hl.value : escapeHtml(item.title || item.url || "");
    return stripSuffix(value);
  }

  // Search result row. Rendered as a real link so modifier-clicks and the
  // context menu work; Enter on the active row goes through getURL().
  function hitTemplate(args, tools_) {
    var item = args.item;
    var html = tools_.html;
    var meta = [sectionOf(item.url), headingsOf(item)]
      .filter(Boolean)
      .join(" — ");
    return html`<a class="bru-hit" href="${item.url}">
      <span
        class="bru-hit-title"
        dangerouslySetInnerHTML=${{ __html: highlightedTitle(item) }}
      ></span>
      ${meta ? html`<span class="bru-hit-meta">${meta}</span>` : null}
    </a>`;
  }

  // A page the agent cites: the chat renders these for its
  // "display results" tool, one card per hit.
  function chatHitTemplate(args, tools_) {
    var item = args && args.item ? args.item : args || {};
    var html = tools_.html;
    var url = item.url || item.objectID || "#";
    var section = sectionOf(url);
    return html`<a class="bru-chat-hit" href="${url}">
      <span class="bru-hit-title">${stripSuffix(item.title) || url}</span>
      ${section ? html`<span class="bru-hit-meta">${section}</span>` : null}
    </a>`;
  }

  function sparkleTemplate(_, tools_) {
    return tools_.html`<span dangerouslySetInnerHTML=${{ __html: SPARKLE_SVG }}></span>`;
  }

  // ------------------------------------------------------------ widgets

  function buildWidgets(is) {
    var w = is.widgets;
    var t = is.templates || {};
    var chatTemplates = {
      item: chatHitTemplate,
      header: { titleText: "Ask AI", titleIcon: sparkleTemplate },
    };
    if (t.chatSidePanelLayout) {
      // The side panel pushes the page aside by putting a right margin on
      // `parentElement` (default: <body>) while open. That squeezes the
      // page under a navbar whose layout tiers are viewport-based, so at
      // 1440px the tab row runs under the triggers. Pointing it at our own
      // empty container makes the panel a plain overlay instead.
      chatTemplates.layout = t.chatSidePanelLayout({
        parentElement: "#assistant",
      });
    }
    if (t.chatGreeting) {
      chatTemplates.empty = t.chatGreeting({
        translations: {
          heading: "Ask about Bruno",
          subheading:
            "Answers come from these docs and link to the pages they are based on.",
        },
      });
    }
    return [
      w.autocomplete({
        container: searchEl,
        placeholder: "Search",
        // Detached (trigger + modal) at every width; see style.css.
        detachedMediaQuery: "(min-width: 0px)",
        aiMode: true,
        // The widget searches its own indices; the instance's main index
        // (there is none) must not fire an empty search on every page.
        requiresSearch: false,
        translations: {
          detachedSearchButtonTitle: "Search",
          detachedCancelButtonText: "Cancel",
          detachedClearButtonTitle: "Clear",
        },
        indices: [
          {
            indexName: INDEX_NAME,
            getURL: function (item) {
              return item.url;
            },
            searchParameters: {
              hitsPerPage: 8,
              attributesToRetrieve: ["title", "url", "headers"],
              attributesToHighlight: ["title"],
            },
            templates: { item: hitTemplate },
          },
        ],
      }),
      w.chat({
        container: panelEl,
        agentId: AGENT_ID,
        feedback: true,
        // No `resume`: it GETs the completions URL on every page load to
        // look for an interrupted stream, and Agent Studio answers 405.
        // Same as above: the chat talks to Agent Studio, not the main index.
        requiresSearch: false,
        context: function () {
          return { page: location.pathname, title: document.title };
        },
        templates: chatTemplates,
      }),
    ];
  }

  function mount() {
    var lite = window["algoliasearch/lite"];
    var is = window.instantsearch;
    if (!lite || !is) {
      loadState = "failed";
      console.warn(
        "[bruno-docs] Algolia libraries missing after load; Mintlify search stays active.",
      );
      return;
    }
    loadState = "ready";
    try {
      search = is({
        searchClient: lite.liteClient(APP_ID, SEARCH_KEY),
        future: { preserveSharedStateOnUnmount: true },
      });
      search.addWidgets(buildWidgets(is));
      search.start();
    } catch (err) {
      loadState = "failed";
      console.warn("[bruno-docs] Algolia search failed to start", err);
    }
  }

  function remount() {
    if (search) {
      try {
        search.dispose();
      } catch (e) {
        /* already gone */
      }
      search = null;
    }
    loadState = "loading";
    mount();
  }

  // --------------------------------------------------------------- tick

  function schedule(ms) {
    if (timer) return;
    timer = setTimeout(tick, ms);
  }

  function tick() {
    timer = 0;
    if (!ensureContainers()) return; // Navbar not rendered yet; the observer retries.
    if (loadState === "idle") {
      loadState = "loading";
      loadAssets(mount);
      return;
    }
    if (loadState !== "ready") return;
    if (searchRendered()) {
      everRendered = true;
      return;
    }
    if (everRendered && remounts < MAX_REMOUNTS) {
      // Rendered once and since wiped (the navbar was rebuilt around it).
      remounts++;
      remount();
      schedule(400);
    }
  }

  // ---------------------------------------------------- open / shortcuts

  function visible(node) {
    return !!(
      node.offsetWidth ||
      node.offsetHeight ||
      node.getClientRects().length
    );
  }

  // Open the search modal, or focus its input if it is already open.
  // Returns false when the widget isn't rendered (callers fall back to
  // Mintlify's search).
  function focusSearch() {
    if (!searchEl) return false;
    var input = searchEl.querySelector(".ais-AutocompleteInput");
    if (input && visible(input)) {
      input.focus();
      input.select();
      return true;
    }
    var button = searchEl.querySelector(
      ".ais-AutocompleteDetachedSearchButton",
    );
    if (button && visible(button)) {
      button.click();
      return true;
    }
    return false;
  }

  // The chat widget's render state: open, setOpen, focusInput,
  // sendMessage, ... — what the autocomplete's AI Mode drives too.
  function chatState() {
    if (!search || !search.renderState) return null;
    var byIndex = search.renderState[search.mainIndex.getIndexId()];
    return (byIndex && byIndex.chat) || null;
  }

  // Read from the DOM: the render state's `open` is a snapshot from the
  // last instance render, the container class is live.
  function chatIsOpen() {
    return !!(panelEl && panelEl.querySelector(".ais-Chat-container--open"));
  }

  function syncTrigger() {
    if (!triggerEl) return;
    var open = chatIsOpen();
    triggerEl.setAttribute("aria-expanded", open ? "true" : "false");
  }

  // Returns false when the chat isn't rendered yet.
  function openChat(message) {
    var state = chatState();
    if (!state || typeof state.setOpen !== "function") return false;
    state.setOpen(true);
    if (message && typeof state.sendMessage === "function") {
      state.sendMessage({ text: String(message) });
    } else {
      setTimeout(function () {
        var live = chatState();
        if (live && typeof live.focusInput === "function") live.focusInput();
      }, 50);
    }
    return true;
  }

  function closeChat() {
    var state = chatState();
    if (!state || !chatIsOpen()) return false;
    state.setOpen(false);
    return true;
  }

  function toggleChat() {
    return chatIsOpen() ? closeChat() : openChat();
  }

  window.bruAlgoliaSearch = {
    focus: focusSearch,
    ask: function (message) {
      return openChat(message);
    },
  };

  window.addEventListener(
    "keydown",
    function (e) {
      if (e.key === "Escape") {
        var cancel =
          searchEl &&
          searchEl.querySelector(
            ".ais-AutocompleteDetachedContainer .ais-AutocompleteBackButton",
          );
        if (cancel) {
          cancel.click();
          e.preventDefault();
          e.stopImmediatePropagation();
          return;
        }
        if (closeChat()) {
          e.preventDefault();
          e.stopImmediatePropagation();
        }
        return;
      }
      if (!(e.metaKey || e.ctrlKey) || e.altKey || e.shiftKey) return;
      var key = (e.key || "").toLowerCase();
      if (key === "k") {
        if (focusSearch()) {
          e.preventDefault();
          e.stopImmediatePropagation();
        }
      } else if (key === "i") {
        // Mintlify's assistant panel stays closed either way; its button
        // is gone (style.css). Toggle ours once it has rendered.
        if (toggleChat()) e.preventDefault();
        e.stopImmediatePropagation();
      }
    },
    true,
  );

  // ------------------------------------------------------------- start

  var scheduled = false;
  function onMutation() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(function () {
      scheduled = false;
      tick();
    });
  }

  function start() {
    tick();
    new MutationObserver(onMutation).observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  // Wait for full load so React finishes hydrating the navbar before we
  // inject into it; the observer covers everything after that.
  if (document.readyState === "complete") {
    start();
  } else {
    window.addEventListener("load", start);
  }
})();
