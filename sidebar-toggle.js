// Collapsible desktop sidebar.
//
// Mintlify has no way to hide the left nav on desktop; this adds a small
// panel-toggle button at the top-left corner of #sidebar (top-left, not
// top-right: the right edge is where the nav's scrollbar runs). Collapsed,
// the sidebar shrinks to a thin rail holding only that button — in the same
// spot, so it never jumps under the cursor — and the article reflows into
// the freed width. The state is kept in localStorage so it
// survives navigation and reloads, and is written as
// `data-bru-sidebar="collapsed"` on <html>; every visual consequence is CSS
// (the "Collapsible sidebar" block in style.css). This file only owns the
// button and the attribute.
//
// Mechanics worth knowing before editing:
// - The two Mintlify renderers differ here: the local CLI renders #sidebar
//   position:fixed and gives #content-area an explicit 23.7rem gutter; the
//   hosted renderer renders it as a sticky flex sibling with a 5.7rem gutter.
//   Both are positioned, so an absolutely positioned child of #sidebar lands
//   in the same corner in each, and the button is appended straight to
//   #sidebar (not into #sidebar-content, whose inner structure differs too:
//   a plain overflow div locally, a base-ui scroll-area on the hosted site).
// - The attribute is restored from localStorage at the top of this file,
//   before waiting for load, so a collapsed sidebar does not flash open on
//   each page view.
// - React owns the sidebar DOM; SPA route changes can re-render it and drop
//   the injected button. attach() is idempotent (one querySelector) and runs
//   on load and again via MutationObserver whenever the body mutates.
// - Below 1250px the shell is in mobile mode (see style.css) and #sidebar is
//   display:none, which hides the button with it. The mobile drawer is
//   Mintlify's own and is not affected by the attribute.
(function () {
  var KEY = "bru-sidebar-collapsed";
  var ATTR = "data-bru-sidebar";
  var root = document.documentElement;

  try {
    if (localStorage.getItem(KEY) === "1") root.setAttribute(ATTR, "collapsed");
  } catch (e) {
    /* storage blocked — start expanded */
  }

  function isCollapsed() {
    return root.getAttribute(ATTR) === "collapsed";
  }

  function syncButtons() {
    var collapsed = isCollapsed();
    var label = collapsed ? "Show navigation" : "Hide navigation";
    document.querySelectorAll(".bru-sb-toggle").forEach(function (btn) {
      btn.setAttribute("aria-expanded", String(!collapsed));
      btn.setAttribute("aria-label", label);
      btn.title = label;
    });
  }

  function setCollapsed(collapsed) {
    if (collapsed) {
      root.setAttribute(ATTR, "collapsed");
    } else {
      root.removeAttribute(ATTR);
    }
    try {
      localStorage.setItem(KEY, collapsed ? "1" : "0");
    } catch (e) {
      /* storage blocked — state lasts for this page only */
    }
    syncButtons();
  }

  function buildButton() {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "bru-sb-toggle";
    btn.setAttribute("aria-controls", "sidebar");
    // Panel-left glyph: a frame with the left pane marked off.
    btn.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<rect x="3" y="4" width="18" height="16" rx="2.5"></rect>' +
      '<line x1="9" y1="4" x2="9" y2="20"></line>' +
      "</svg>";
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      setCollapsed(!isCollapsed());
    });
    return btn;
  }

  function attach() {
    var sidebar = document.getElementById("sidebar");
    if (!sidebar || sidebar.querySelector(":scope > .bru-sb-toggle")) return;
    sidebar.appendChild(buildButton());
    syncButtons();
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
  }

  if (document.readyState === "complete") {
    start();
  } else {
    window.addEventListener("load", start);
  }
})();
