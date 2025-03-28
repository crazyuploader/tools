!(function () {
  function t(t, r) {
    for (var n = new Array(r), e = 0; e < r; ++e) {
      var a = t ? parseInt(t.slice(-8), 16) : 0;
      if (isNaN(a)) throw new Error("Invalid hex");
      (n[r - e - 1] = a), (t = t.substring(0, t.length - 8));
    }
    return n;
  }
  function r(r, n, e, a, o, i) {
    var u = Math.ceil(r / 32);
    return (
      (n = t(n, u)),
      (e = t(e, u)),
      (a = t(a, u)),
      1 === u && ((n = n[0]), (e = e[0]), (a = a[0])),
      { width: r, poly: n, init: e, xorout: a, refin: o, refout: i }
    );
  }
  function n(t, r, e, a, o, i, u, c) {
    return n.update(t, r, e, a, o, i, u, c).hex();
  }
  (window.crc = n),
    (n.update = function (t, n, e, a, o, i, u, c) {
      return "custom" === n
        ? createModel(r(e, a, o, i, u, c)).update(t)
        : window[n].update(t);
    });
  var e = $("#model"),
    a = $("#custom-block"),
    o = a.find("[data-share]"),
    i = function () {
      var t = "custom" === e.val();
      a.toggle(t),
        t ? o.removeAttr("data-share-ignore") : o.attr("data-share-ignore", !0);
    };
  e.change(i),
    i(),
    ++waitLoadCount,
    ot
      .createOnDemandScript(["js/crc.min.js?v=0.3.0", "js/models.min.js"])
      .load(function () {
        methodLoad();
      });
})();
