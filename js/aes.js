!(function () {
  function r(r) {
    for (var t = r.length, o = [], e = 0; e < t; e++)
      o[e >>> 2] |= r[e] << (24 - (e % 4) * 8);
    return new CryptoJS.lib.WordArray.init(o, t);
  }
  function t(r) {
    for (var t = r.words, o = r.sigBytes, e = [], n = 0; n < o; n++)
      e.push((t[n >>> 2] >>> (24 - (n % 4) * 8)) & 255);
    return e;
  }
  function o(t) {
    return r("string" == typeof t ? ot.utf8ToBytes(t) : t);
  }
  function e(r, t, e, n, i, a, s, p, c, d) {
    if ("custom" === e) {
      if (((p = o(p)), p.sigBytes !== r / 8))
        throw new Error("Key must be " + r + " bits.");
      if ("ECB" !== t && ((c = o(c)), 16 !== c.sigBytes))
        throw new Error("IV must be 128 bits.");
    } else {
      var y, g;
      "PBKDF2" === e
        ? ((y = CryptoJS.PBKDF2), (g = 1e4))
        : ((y = CryptoJS.EvpKDF), (g = 1));
      var u = y(n, d || "", {
        keySize: r / 32 + 4,
        iterations: a ? s : g,
        hasher: CryptoJS.algo[i],
      }).toString();
      (p = CryptoJS.enc.Hex.parse(u.substr(0, r / 4))),
        (c = CryptoJS.enc.Hex.parse(u.substr(r / 4)));
    }
    return [p, c];
  }
  function n(r, t) {
    var o = 255 & r.words[(r.sigBytes - 1) >>> 2],
      e = r.sigBytes;
    if (0 === o || o > e) throw new Error(i);
    if ("Iso10126" !== t)
      for (var n = "Pkcs7" === t ? o : 0, a = e - 2; a > e - o - 1; --a) {
        var s = (r.words[a >>> 2] >>> (24 - (a % 4) * 8)) & 255;
        if (s !== n) throw new Error(i);
      }
    r.sigBytes -= o;
  }
  var i = "bad decrypt",
    a = { CBC: !0, ECB: !0 };
  (window.encrypt = function (r, n, i, s, p, c, d, y, g, u, l, f, C) {
    if (!r) return [];
    if ("NoPadding" === s && r.length % 16 != 0)
      throw new Error("Message must be multipler of 128 bits.");
    if ("random" === f) C = CryptoJS.lib.WordArray.random(8);
    else if ("nosalt" === f) C = null;
    else if (((C = o(C)), 8 !== C.sigBytes))
      throw new Error("Salt must be 64 bits.");
    var S = a[i] ? CryptoJS.pad[s] : CryptoJS.pad.NoPadding,
      h = e(n, i, p, c, d, y, g, u, l, C),
      w = CryptoJS.AES.encrypt(o(r), h[0], {
        iv: h[1],
        mode: CryptoJS.mode[i],
        padding: S,
      }),
      v = w.ciphertext;
    return (
      "custom" !== p &&
        C &&
        (v = CryptoJS.lib.WordArray.create([1398893684, 1701076831])
          .concat(C)
          .concat(v)),
      t(v)
    );
  }),
    (window.decrypt = function (o, n, s, p, c, d, y, g, u, l, f) {
      if (o.length) {
        var C;
        if (((o = r(o)), "custom" === c))
          o = CryptoJS.lib.CipherParams.create({ ciphertext: o });
        else {
          var S = o.words;
          1398893684 == S[0] &&
            1701076831 == S[1] &&
            ((C = CryptoJS.lib.WordArray.create(S.slice(2, 4))),
            S.splice(0, 4),
            (o.sigBytes -= 16)),
            (o = CryptoJS.lib.CipherParams.create({ ciphertext: o, salt: C }));
        }
        var h = a[s] ? CryptoJS.pad[p] : CryptoJS.pad.NoPadding,
          w = e(n, s, c, d, y, g, u, l, f, C),
          v = CryptoJS.AES.decrypt(o, w[0], {
            iv: w[1],
            mode: CryptoJS.mode[s],
            padding: h,
          }),
          J = o.ciphertext.sigBytes,
          b = J - 16;
        if (v.sigBytes < b || v.sigBytes > J) throw new Error(i);
        return t(v);
      }
    });
  var s = $("#mode"),
    p = $("#iv-block"),
    c = $("#padding-block");
  s.change(function () {
    var r = s.val();
    p.toggle("ECB" !== r), c.toggle(!!a[r]);
  }),
    s.change();
  var d = $("#key-type"),
    y = $("#key-iv"),
    g = $("#derivation-block");
  d.change(function () {
    var r = "custom" === d.val();
    y.toggle(r), g.toggle(!r);
  }),
    d.change();
  var u = $("#salt-type"),
    l = $("#salt-block");
  u.length &&
    (u.change(function () {
      l.toggle("custom" === u.val());
    }),
    u.change()),
    $(window).on("methodLoad", function () {
      (CryptoJS.pad.Pkcs7.unpad = function (r) {
        n(r, "Pkcs7");
      }),
        (CryptoJS.pad.Iso97971.unpad = function (r) {
          CryptoJS.pad.ZeroPadding.unpad(r);
          var t = r.sigBytes - 1;
          if (128 != ((r.words[t >>> 2] >>> (24 - (t % 4) * 8)) & 255))
            throw new Error(i);
          r.sigBytes--;
        }),
        (CryptoJS.pad.AnsiX923.unpad = function (r) {
          n(r, "AnsiX923");
        }),
        (CryptoJS.pad.Iso10126.unpad = function (r) {
          n(r, "Iso10126");
        });
    });
})();
