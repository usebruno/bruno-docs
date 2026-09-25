// Home page search CTA — hands off to the site search.
//
// The big "Search the docs…" button on index.mdx (`.bru-home-search-btn`) is
// plain MDX markup; this delegated listener makes it act like the navbar
// search trigger. Preferred target is the Algolia autocomplete: algolia-search.js
// exposes window.bruAlgoliaSearch.focus(), which opens the centred search
// modal (the same one the navbar trigger and Cmd+K open) and returns true. If
// the widget hasn't rendered — Algolia still loading, or blocked — fall back to
// Mintlify's stock search, which is exactly what the navbar shows in that
// case: click its `#search-bar-entry` trigger (a documented Mintlify hook), or
// failing that synthesize the Cmd/Ctrl+K shortcut its modal listens for.
//
// Delegation on document (capture-free, one listener) means this works no
// matter when the home page's DOM hydrates, and is inert on every other page.
(function () {
  document.addEventListener("click", function (e) {
    var btn = e.target.closest && e.target.closest(".bru-home-search-btn");
    if (!btn) return;
    var algolia = window.bruAlgoliaSearch;
    if (algolia && algolia.focus()) return;
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
