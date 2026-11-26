// Add tracking script for CommonRoom
(function() {
  if (typeof window === 'undefined') return;
  if (typeof window.signals !== 'undefined') return;
  var script = document.createElement('script');
  script.src = 'https://cdn.cr-relay.com/v1/site/2274ff79-01af-495e-acb0-ed0a2e1f2b5e/signals.js';
  script.async = true;
  window.signals = Object.assign(
    [],
    { _opts: { apiHost: 'https://api.cr-relay.com' } },
    ['page', 'identify', 'form'].reduce(function (acc, method){
      acc[method] = function () {
        signals.push([method, arguments]);
        return signals;
      };
      return acc;
    }, {})
  );
  document.head.appendChild(script);
})();
