!(function () {
  function n() {
    r && (r.abort(), (r = null));
  }
  function o(n) {
    return /^(http(s?)):\/\//i.test(n);
  }
  function t(t, l, s) {
    if (!o(t)) return l(null);
    var i = e === t;
    return (
      i || n(),
      (e = t),
      u[t]
        ? l(u[t])
        : t
          ? (i || (r = new XMLHttpRequest()),
            (r.onprogress = s),
            (r.onload = function () {
              l(2 === Math.floor(r.status / 100) ? (u[t] = r.response) : null);
            }),
            void (
              i ||
              ((r.onerror = function () {
                (r.onerror = function () {
                  l(null);
                }),
                  r.open("GET", "https://cors-proxy.emn178.workers.dev/" + t),
                  r.send();
              }),
              r.open("GET", t),
              (r.responseType = "blob"),
              r.send())
            ))
          : l(null)
    );
  }
  window.ot = window.ot || {};
  var e,
    r,
    u = {};
  (ot.cancelGetBlob = n), (ot.getBlob = t);
})();
