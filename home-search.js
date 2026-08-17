// Home page search CTA — opens Mintlify's search modal.
//
// The big "Search the docs…" button on home.mdx (`.bru-home-search-btn`) is
// plain MDX markup; this delegated listener makes it act like the navbar
// search field. Mintlify renders its search trigger as `#search-bar-entry`
// (desktop navbar); clicking it opens the shared search/command-K modal. If
// that id ever disappears after a Mintlify bump, we fall back to synthesizing
// the Cmd/Ctrl+K shortcut the modal also listens for.
//
// Delegation on document (capture-free, one listener) means this works no
// matter when the home page's DOM hydrates, and is inert on every other page.
(function () {
  document.addEventListener("click", function (e) {
    var btn = e.target.closest && e.target.closest(".bru-home-search-btn");
    if (!btn) return;
    var trigger = document.getElementById("search-bar-entry");
    if (trigger) {
      trigger.click();
      return;
    }
    document.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "k",
        metaKey: navigator.platform.indexOf("Mac") > -1,
        ctrlKey: navigator.platform.indexOf("Mac") === -1,
        bubbles: true,
      }),
    );
  });
})();
