// Floating registration card for the "Bruno v4 Live" webinar.
// Desktop: card pinned bottom-right. Mobile: slim bar pinned to the bottom edge.
// Auto-hides after the event ends; safe to delete after 2026-08-19.
(function () {
  var KEY = "bruno-webinar-2026-08-19";
  var ENDS = Date.parse("2026-08-19T16:00:00Z"); // 12:00 PM EDT

  if (Date.now() > ENDS) return;

  try {
    if (localStorage.getItem(KEY)) return;
  } catch (e) {
    // Private browsing / storage blocked — show the card, just don't persist dismissal.
  }

  var render = function () {
    if (document.getElementById("bru-webinar")) return;

    var el = document.createElement("div");
    el.innerHTML =
      "<style>" +
      // right/max-width track --assistant-sheet-width so the card slides aside when the AI
      // assistant panel opens, the same way Mintlify's own fixed navbar does.
      "#bru-webinar{position:fixed;bottom:1.25rem;z-index:60;width:20rem;" +
      "right:calc(1.25rem + var(--assistant-sheet-width, 0px));" +
      "max-width:calc(100vw - 2.5rem - var(--assistant-sheet-width, 0px));" +
      "padding:1rem;border-radius:.75rem;border:1px solid #E5E7EB;" +
      "background:#fff;color:#111827;box-shadow:0 10px 30px rgba(0,0,0,.12);font-size:.875rem;" +
      "line-height:1.4}" +
      ".dark #bru-webinar{background:#0F1117;border-color:#26272B;color:#F3F4F6;" +
      "box-shadow:0 10px 30px rgba(0,0,0,.5)}" +
      "#bru-webinar .bru-eyebrow{display:flex;align-items:center;gap:.4rem;font-size:.6875rem;" +
      "font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#F2994A}" +
      "#bru-webinar .bru-dot{flex:none;width:.4rem;height:.4rem;border-radius:9999px;" +
      "background:#F2994A}" +
      "#bru-webinar .bru-narrow{display:none}" +
      "#bru-webinar h4{margin:.5rem 0 .25rem;font-size:.9375rem;font-weight:600}" +
      "#bru-webinar p{margin:0;opacity:.7;font-size:.8125rem}" +
      "#bru-webinar a.bru-cta{display:inline-block;margin-top:.75rem;padding:.4rem .75rem;" +
      // Dark ink on the orange: white was only ~2.2:1, this is ~8:1.
      "border-radius:.5rem;background:#F2994A;color:#111827;font-weight:600;" +
      "text-decoration:none}" +
      "#bru-webinar button{position:absolute;top:.5rem;right:.5rem;border:0;background:none;" +
      "cursor:pointer;color:inherit;opacity:.5;font-size:1rem;line-height:1;padding:.25rem}" +
      "#bru-webinar button:hover{opacity:1}" +
      // Below 1024px the assistant is a bottom drawer, and search/mobile-nav are modals — all
      // Radix dialogs. Stand down entirely rather than cover their inputs.
      "html:has([role=dialog][data-state=open]) #bru-webinar{display:none}" +
      // Mobile: collapse the card into a single-line bar across the bottom edge.
      "@media (max-width:640px){" +
      "#bru-webinar{left:0;right:0;bottom:0;width:auto;max-width:none;display:flex;" +
      "align-items:center;gap:.625rem;padding:.625rem .875rem;" +
      "padding-bottom:calc(.625rem + env(safe-area-inset-bottom));border-radius:0;" +
      "border-left:0;border-right:0;border-bottom:0;box-shadow:0 -4px 16px rgba(0,0,0,.1)}" +
      ".dark #bru-webinar{box-shadow:0 -4px 16px rgba(0,0,0,.5)}" +
      "#bru-webinar h4,#bru-webinar p,#bru-webinar .bru-wide{display:none}" +
      "#bru-webinar .bru-narrow{display:inline}" +
      "#bru-webinar .bru-eyebrow{flex:1;min-width:0}" +
      "#bru-webinar .bru-label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}" +
      "#bru-webinar a.bru-cta{flex:none;margin-top:0;font-size:.8125rem}" +
      "#bru-webinar button{position:static;flex:none;font-size:1.125rem}" +
      "}" +
      "</style>" +
      '<div id="bru-webinar" role="complementary" aria-label="Upcoming webinar">' +
      '<button type="button" aria-label="Dismiss webinar notification">&times;</button>' +
      '<div class="bru-eyebrow"><span class="bru-dot"></span>' +
      '<span class="bru-label"><span class="bru-wide">Live webinar</span>' +
      '<span class="bru-narrow">v4 Webinar</span> &middot; Aug 19</span></div>' +
      "<h4>Bruno v4 Live: AI, Scripting, Docs &amp; What’s New</h4>" +
      "<p>11:00 AM EDT / 4:00 PM BST &middot; Zoom</p>" +
      '<a class="bru-cta" href="https://www.usebruno.com/webinar" target="_blank" rel="noopener">' +
      "Register →</a>" +
      "</div>";

    document.body.appendChild(el);

    el.querySelector("button").addEventListener("click", function () {
      try {
        localStorage.setItem(KEY, "1");
      } catch (e) {}
      el.remove();
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
