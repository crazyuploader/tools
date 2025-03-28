!(function () {
  function e(e, a, t, r) {
    return "pem_text" === e
      ? t
        ? KEYUTIL.getKey(a).pubKeyHex
        : KEYUTIL.getKey(a, r).prvKeyHex
      : "base64" === e
        ? b64tohex(a)
        : a;
  }
  var a = {
      "2b81040006": "secp112r1",
      "2b8104001c": "secp128r1",
      "2a8648ce3d030101": "secp192r1",
    },
    t = {
      secp112r1: "1.3.132.0.6",
      secp128r1: "1.3.132.0.28",
      secp192r1: "1.2.840.10045.3.1.1",
      secp192k1: "1.3.132.0.31",
      secp224r1: "1.3.132.0.33",
    };
  (window.sign = function (a, t, r, n, i, c) {
    if ((n = e(r, n, !1, c))) {
      var o = new KJUR.crypto.Signature({ alg: i });
      return (
        o.init({ d: n, curve: t }),
        "string" == typeof a
          ? o.updateString(a)
          : o.updateHex(ot.bytesToHex(a)),
        o.sign()
      );
    }
  }),
    (window.verify = function (a, t, r, n, i, c, o) {
      try {
        if (!(n = e(r, n, !0))) return "Public key is blank";
        if (!(o = e(c, o))) return "Signature key is blank";
        var p = new KJUR.crypto.Signature({ alg: i });
        return (
          p.init({ xy: n, curve: t }),
          "string" == typeof a
            ? p.updateString(a)
            : p.updateHex(ot.bytesToHex(a)),
          p.verify(o) ? "Valid" : "Signature is invalid"
        );
      } catch (e) {
        return e.message;
      }
    });
  var r = $("#public-key"),
    n = $("#download-image"),
    i = $("#download-public");
  n.attr("download", "private.pem"),
    (window.generate = function (e, a, t, c, o, p, s) {
      r.val("");
      var d, h;
      if ("pem_text" === t) {
        var b = KEYUTIL.generateKeypair("EC", a),
          u = b.prvKeyObj,
          g = b.pubKeyObj;
        "PKCS1" === c ? (p = !1) : "PKCS5" === c ? (p = !0) : (o = void 0),
          (h = p
            ? KEYUTIL.getPEM(u, c + "PRV", s, o)
            : KEYUTIL.getPEM(u, c + "PRV")),
          (d = KEYUTIL.getPEM(g, "PKCS8PUB")),
          n.attr("href", "data:application/octet-stream;," + h),
          i.attr("href", "data:application/octet-stream;," + d),
          n.show(),
          i.show();
      } else {
        n.hide(), i.hide();
        var f = new KJUR.crypto.ECDSA({ curve: a }),
          y = f.generateKeyPairHex();
        (d = y.ecpubhex),
          (h = y.ecprvhex),
          "base64" === t && ((d = hextob64(d)), (h = hextob64(h)));
      }
      return r.val(d), h;
    });
  var c = $("#pem-format"),
    o = $("#cipher-algorithm-block"),
    p = $("#passpharse-wrap"),
    s = $("#passphrase-enabled-block"),
    d = $("#passphrase-enabled"),
    h = $("#passphrase-block");
  c.change(function () {
    var e = c.val();
    "PKCS8" === e
      ? (o.hide(), p.show(), s.show(), d.change())
      : "PKCS5" === e
        ? (o.show(), p.show(), s.hide(), h.show())
        : (o.hide(), p.hide(), s.show());
  }),
    c.change(),
    $('[data-toggle="key-type"]').each(function () {
      var e = $(this),
        a = $(e.data("target"));
      e.change(function () {
        a.toggle("pem_text" === e.val());
      }),
        e.change();
    }),
    $(window).on("methodLoad", function () {
      Object.keys(t).forEach(function (e) {
        KJUR.asn1.x509.OID.name2oidList[e] = t[e];
      }),
        Object.keys(a).forEach(function (e) {
          KJUR.crypto.OID.oidhex2name[e] = a[e];
        });
      var e = KJUR.crypto.ECDSA.getName;
      (KJUR.crypto.ECDSA.getName = function (t) {
        return a[t] ? a[t] : e(t);
      }),
        KJUR.crypto.ECParameterDB.regist(
          "secp112r1",
          112,
          "db7c2abf62e35e668076bead208b",
          "db7c2abf62e35e668076bead2088",
          "659ef8ba043916eede8911702b22",
          "db7c2abf62e35e7628dfac6561c5",
          "1",
          "09487239995a5ee76b55f9c2f098",
          "a89ce5af8724c0a23e0e0ff77500",
          [],
        );
    });
})();
