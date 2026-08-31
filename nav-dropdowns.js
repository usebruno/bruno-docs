// Hover dropdowns for the desktop nav tabs.
//
// Mintlify has no native "hover a tab, see its sections" affordance — the only
// built-in dropdown is the click-to-open `menu` tab format (our "Popular" tab).
// This script injects a small panel into each tab listing that tab's main
// sections (the sidebar groups), linked to each section's first page. Show/hide
// is pure CSS (:hover / :focus-within — see the "Nav tab dropdowns" block in
// style.css); this file only builds the DOM.
//
// NAV_SECTIONS_BY_VERSION is generated from docs.json (`navigation.versions`):
// one map per version, chosen at attach time from the URL's /v2 | /v3 prefix
// (v4 pages carry no prefix). Per tab: one row per group (or per page for
// pages-only tabs, or per menu item for menu tabs), href = the group's first
// page. Single-group tabs (Mock Servers) list their pages instead, like
// pages-only tabs. Maps are matched to tabs BY LABEL (the tab's visible text),
// so renaming a tab in docs.json without updating this map simply leaves that
// tab dropdown-less — a safe failure, but keep the two files in sync. Tabs
// with fewer than 2 sections get no dropdown on purpose. Several versions
// share tab labels ("Getting Started" exists in v2 AND v3) and React may
// re-use tab DOM nodes across a version switch, so each injected panel is
// stamped with its version (data-ver) and rebuilt when it goes stale.
//
// Mechanics worth knowing before editing:
// - Each `.nav-tabs-item` is position:relative and overflow-visible, so the
//   panel is appended INSIDE the item (absolute, top:100%). That is what lets
//   plain CSS :hover keep the panel open while the pointer is over it.
// - The tab itself is a Next.js client-side <Link> whose click handler lives
//   on React's delegated root listener. Clicks inside the panel therefore
//   stopPropagation(), otherwise bubbling would ALSO trigger the outer link
//   and route to the tab's landing page instead of the clicked section. The
//   inner anchor then navigates natively (full page load — fine for docs).
// - "Popular" (the docs.json `menu` tab) is a <button> whose native Radix
//   menu ALREADY opens on hover, with icons and per-item descriptions. It is
//   skipped here — attaching a second panel would stack the two dropdowns.
//   Its NAV_SECTIONS entry is kept so the map stays a complete mirror of
//   docs.json, and in case the tab ever becomes a plain link.
// - React hydration owns the navbar DOM at startup and SPA route changes can
//   re-render it, discarding injected nodes. attach() is idempotent and cheap
//   (9 items), so it runs on load and again via MutationObserver whenever the
//   navbar re-renders. If hydration strips the first injection, the observer
//   converges on the next mutation.
(function () {
  var NAV_SECTIONS_BY_VERSION = {
    v4: {
      "Get Started": [
        { label: "Introduction", href: "/introduction/getting-started" },
        {
          label: "Bruno Basics",
          href: "/get-started/bruno-basics/create-a-workspace",
        },
        {
          label: "Import & Migrate",
          href: "/get-started/import-export-data/import-collections",
        },
      ],
      "API Client": [
        { label: "Overview", href: "/api-client/overview" },
        { label: "Send Requests", href: "/send-requests/overview" },
        { label: "Variables", href: "/variables/overview" },
        { label: "Authentication", href: "/auth/overview" },
        { label: "Secret Management", href: "/secrets-management/overview" },
        { label: "Tests", href: "/testing/tests/introduction" },
        { label: "Scripts", href: "/testing/script/overview" },
        { label: "Git & Collaboration", href: "/git-integration/overview" },
        { label: "AI", href: "/ai/bruno-ai/introduction" },
        { label: "Apps", href: "/apps/overview" },
        { label: "Settings", href: "/get-started/configure/settings" },
        { label: "Debugging", href: "/debugging/timeline" },
      ],
      CLI: [
        { label: "Overview", href: "/bru-cli/overview" },
        { label: "Run Collections", href: "/bru-cli/runCollection" },
        { label: "Configuration", href: "/bru-cli/proxyConfiguration" },
        { label: "CI/CD", href: "/bru-cli/docker" },
      ],
      "API Docs": [
        { label: "Overview", href: "/api-docs/overview" },
        { label: "Write Docs in Bruno", href: "/api-docs/workspace-docs" },
        { label: "Generate HTML Docs", href: "/html-docs/overview" },
      ],
      "Mock Servers": [
        { label: "Overview", href: "/mock-servers/overview" },
        {
          label: "Getting Started",
          href: "/mock-servers/tutorial/mock-from-response-examples",
        },
        {
          label: "Create a Mock Server",
          href: "/mock-servers/create-mock-server",
        },
        { label: "Run a Mock Server", href: "/mock-servers/run-mock-server" },
      ],
      "VS Code": [
        { label: "Overview", href: "/vs-code-extension/overview" },
        {
          label: "Install and Configure",
          href: "/vs-code-extension/install-config",
        },
        { label: "Send Requests", href: "/vs-code-extension/send-req" },
      ],
      Formats: [
        { label: "Overview", href: "/reference/overview" },
        { label: "OpenAPI", href: "/open-api/overview" },
        { label: "OpenCollection YAML", href: "/opencollection-yaml/overview" },
        { label: "Converters", href: "/converters/overview" },
        { label: "Bru Lang", href: "/bru-lang/overview" },
      ],
      Licensing: [
        { label: "Overview", href: "/license-overview" },
        { label: "End Users", href: "/license-end-users/activate-license" },
        {
          label: "Administrators",
          href: "/license-administrators/license-portal",
        },
      ],
      Popular: [
        {
          label: "JavaScript API Reference",
          href: "/testing/script/javascript-reference",
        },
        {
          label: "Postman Migration",
          href: "/get-started/import-export-data/postman-migration",
        },
        {
          label: "Environment Variables",
          href: "/variables/environment-variables",
        },
        { label: "Bruno CLI Examples", href: "/bru-cli/runCollection" },
      ],
    },
    v3: {
      "Getting Started": [
        { label: "Introduction", href: "/v3/introduction/getting-started" },
        {
          label: "Bruno Basics",
          href: "/v3/get-started/bruno-basics/create-a-workspace",
        },
        {
          label: "Import or Export Data",
          href: "/v3/get-started/import-export-data/import-collections",
        },
        { label: "Configure", href: "/v3/get-started/configure/settings" },
      ],
      "Core Features": [
        { label: "Send Requests", href: "/v3/send-requests/overview" },
        { label: "Variables", href: "/v3/variables/overview" },
        {
          label: "Git Integration & Collaboration",
          href: "/v3/git-integration/overview",
        },
        { label: "Git Providers", href: "/v3/git-providers/overview" },
        { label: "Tests and Scripts", href: "/v3/testing/tests/introduction" },
        { label: "Secret Management", href: "/v3/secrets-management/overview" },
        { label: "Authentication & Authorization", href: "/v3/auth/overview" },
        { label: "Debugging", href: "/v3/debugging/timeline" },
      ],
      "API Tools": [
        { label: "Create Documentation", href: "/v3/api-docs/overview" },
        { label: "OpenAPI", href: "/v3/open-api/overview" },
      ],
      "Developer Tools": [
        { label: "AI Agents", href: "/v3/agents/overview" },
        { label: "Bruno CLI", href: "/v3/bru-cli/overview" },
        { label: "Bru Lang", href: "/v3/bru-lang/overview" },
        {
          label: "OpenCollection YAML",
          href: "/v3/opencollection-yaml/overview",
        },
        { label: "Converters", href: "/v3/converters/overview" },
        { label: "VS Code Extension", href: "/v3/vs-code-extension/overview" },
      ],
      "License Management": [
        { label: "Overview", href: "/v3/license-overview" },
        { label: "End Users", href: "/v3/license-end-users/activate-license" },
        {
          label: "License Administrators",
          href: "/v3/license-administrators/license-portal",
        },
      ],
      "Advanced Guides": [
        { label: "Visualizer", href: "/v3/advanced-guides/visualize" },
      ],
    },
    v2: {
      Introduction: [
        { label: "What is Bruno?", href: "/v2/introduction/what-is-bruno" },
        { label: "Manifesto", href: "/v2/introduction/manifesto" },
        {
          label: "Feedback & Community",
          href: "/v2/introduction/feedback-community",
        },
      ],
      "Getting Started": [
        {
          label: "Bruno Basics",
          href: "/v2/get-started/bruno-basics/download",
        },
        {
          label: "Import or Export Data",
          href: "/v2/get-started/import-export-data/import-collections",
        },
        { label: "Configure", href: "/v2/get-started/configure/settings" },
      ],
      "Core Features": [
        { label: "Send Requests", href: "/v2/send-requests/overview" },
        { label: "Variables", href: "/v2/variables/overview" },
        {
          label: "Git Integration & Collaboration",
          href: "/v2/git-integration/overview",
        },
        { label: "Tests and Scripts", href: "/v2/testing/tests/introduction" },
        { label: "Secret Management", href: "/v2/secrets-management/overview" },
        { label: "Authentication & Authorization", href: "/v2/auth/overview" },
      ],
      "API Tools": [
        { label: "Create Documentation", href: "/v2/api-docs/overview" },
        { label: "OpenAPI", href: "/v2/open-api/overview" },
      ],
      "Developer Tools": [
        { label: "Bruno CLI", href: "/v2/bru-cli/overview" },
        { label: "Bru Lang", href: "/v2/bru-lang/overview" },
        { label: "Converters", href: "/v2/converters/overview" },
        { label: "VS Code Extension", href: "/v2/vs-code-extension/overview" },
      ],
      "License Management": [
        { label: "Overview", href: "/v2/license-overview" },
        { label: "End Users", href: "/v2/license-end-users/activate-license" },
        {
          label: "License Administrators",
          href: "/v2/license-administrators/license-portal",
        },
      ],
      "Advanced Guides": [
        {
          label: "Bruno Starter Guide",
          href: "/v2/advanced-guides/starter-guide",
        },
        {
          label: "Response Visualization",
          href: "/v2/advanced-guides/visualize",
        },
      ],
    },
  };

  function buildDropdown(sections) {
    var wrap = document.createElement("div");
    wrap.className = "bru-nav-dd";
    var panel = document.createElement("div");
    panel.className = "bru-nav-dd-panel";
    sections.forEach(function (s) {
      var a = document.createElement("a");
      a.className = "bru-nav-dd-link";
      a.href = s.href;
      a.textContent = s.label;
      panel.appendChild(a);
    });
    wrap.appendChild(panel);
    // Keep panel clicks away from the surrounding tab link/button (see header
    // comment); the anchor's own default navigation still runs.
    wrap.addEventListener("click", function (e) {
      e.stopPropagation();
    });
    return wrap;
  }

  // Right-align panels that would spill past the viewport's right edge
  // (the last tabs on narrow desktop widths).
  function alignDropdowns() {
    document
      .querySelectorAll(".nav-tabs .nav-tabs-item > .bru-nav-dd")
      .forEach(function (dd) {
        var itemLeft = dd.parentElement.getBoundingClientRect().left;
        dd.classList.toggle(
          "bru-dd-right",
          itemLeft + dd.offsetWidth > window.innerWidth - 8,
        );
      });
  }

  function attach() {
    var items = document.querySelectorAll(".nav-tabs .nav-tabs-item");
    if (!items.length) return;
    var match = window.location.pathname.match(/^\/(v2|v3)(\/|$)/);
    var version = match ? match[1] : "v4";
    var sectionsByTab = NAV_SECTIONS_BY_VERSION[version];
    var added = false;
    items.forEach(function (item) {
      // Menu tabs (<button>, e.g. "Popular") have a native hover menu — skip.
      if (item.tagName !== "A") return;
      var existing = item.querySelector(".bru-nav-dd");
      if (existing && existing.getAttribute("data-ver") === version) return;
      if (existing) {
        // Tab node survived a version switch with a panel built for the old
        // version's map — rebuild below (or drop, if this label has none).
        existing.remove();
        item.classList.remove("bru-has-dd");
      }
      var sections = sectionsByTab[(item.textContent || "").trim()];
      if (!sections || sections.length < 2) return;
      var dd = buildDropdown(sections);
      dd.setAttribute("data-ver", version);
      item.appendChild(dd);
      item.classList.add("bru-has-dd");
      added = true;
    });
    if (added) alignDropdowns();
  }

  var scheduled = false;
  function scheduleAttach() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(function () {
      scheduled = false;
      attach();
    });
  }

  function start() {
    attach();
    new MutationObserver(scheduleAttach).observe(document.body, {
      childList: true,
      subtree: true,
    });
    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(alignDropdowns, 150);
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
