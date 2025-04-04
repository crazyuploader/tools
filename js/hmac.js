!(function () {
  "use strict";
  function t(t, e) {
    e = e || 64;
    var r = function (r) {
      "string" == typeof r && (r = ot.utf8ToBytes(r)),
        r.length > e && (r = t.array ? t.array(r) : ot.hexToBytes(t(r)));
      for (var a = [], n = [], u = 0; u < e; ++u) {
        var o = r[u] || 0;
        (a[u] = 92 ^ o), (n[u] = 54 ^ o);
      }
      var c = this;
      (this.current = t.update(n)),
        (this.update = function (t) {
          return c.current.update(t), c;
        }),
        (this.hex = function () {
          var e = c.current.array
            ? c.current.array()
            : ot.hexToBytes(c.current.hex());
          return t.update(a).update(e).hex();
        });
    };
    (t.hmac = function (t, e) {
      return new r(t).update(e).hex();
    }),
      (t.hmac.update = function (t, e) {
        return new r(t).update(e);
      });
  }
  (window.hmacable = function (e) {
    var r = $("#hmac"),
      a = $("#hmac-enabled"),
      n = $("#hmac-key");
    a.prop("checked") && r.show(),
      a.change(function () {
        var t = a.prop("checked");
        r.toggle(t);
      }),
      e.hmac || t(e);
    var u = function (t, e) {
        return function (r) {
          if (a.prop("checked")) {
            var u = ot.getInput(n);
            return !1 !== u && e(u, r);
          }
          return t(r);
        };
      },
      o = u(e, e.hmac);
    return e.update && (o.update = u(e.update, e.hmac.update)), o;
  }),
    method
      ? (method = hmacable(method))
      : $(window).on("methodLoad", function () {
          method = hmacable(method);
        }),
    methodLoad();
})();
