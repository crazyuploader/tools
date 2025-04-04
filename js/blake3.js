!(function () {
  function e(e) {
    return "string" == typeof e ? ot.utf8ToBytes(e) : e;
  }
  function n(n) {
    if ("hash" === u) return blake3Js.newRegular();
    if ("keyed_hash" === u) {
      if (((n = e(n)), 32 !== n.length))
        throw new Error("key must be 32 bytes.");
      return blake3Js.newKeyed(n);
    }
    return blake3Js.newDeriveKey(e(n));
  }
  function t(n, t, r) {
    (r = r || 256), n.update(e(t));
    var u = {
      update: function (t) {
        return n.update(e(t)), u;
      },
      hex: function () {
        return n.finalize(r / 8);
      },
    };
    return u;
  }
  function r(e, r, u) {
    return t(n(u), e, r);
  }
  var u = "hash";
  (window.blake3 = function (e, n, t) {
    return r(e, n, t).hex();
  }),
    (window.blake3.update = r),
    $(document).ready(function () {
      var e = $("#blake3-mode"),
        n = $('[data-option="key"]').closest(".setting-group"),
        t = function () {
          (u = e.val()), n.toggle("hash" !== u);
        };
      e.change(t), t();
    }),
    (window.FILE_BATCH_SIZE = 3072);
})();
