!(function () {
  function r() {
    this.result = [];
  }
  function t(r) {
    for (var t = r.length, e = [], n = 0; n < t; n++)
      e[n >>> 2] |= r[n] << (24 - (n % 4) * 8);
    return new F.init(e, t);
  }
  function e(r) {
    for (var t = r.words, e = r.sigBytes, n = new g(e), o = 0; o < e; o++)
      n[o] = (t[o >>> 2] >>> (24 - (o % 4) * 8)) & 255;
    return n;
  }
  function n(r) {
    return "string" == typeof r ? ot.utf8ToBytes(r) : r;
  }
  function o(r) {
    return t(n(r));
  }
  function i(r, t, e, n, i, s, a, u, c, f, l) {
    if ("custom" === n) {
      if (((c = o(c)), c.sigBytes !== r / 8))
        throw new Error("Key must be " + r + " bits.");
      if ("ECB" !== e && ((f = o(f)), 8 * f.sigBytes !== t))
        throw new Error("IV must be " + t + " bits.");
    } else {
      var d, p;
      "PBKDF2" === n ? ((d = _.PBKDF2), (p = 1e4)) : ((d = _.EvpKDF), (p = 1));
      var w = d(i, l || "", {
        keySize: r / 32 + t / 32,
        iterations: a ? u : p,
        hasher: x[s],
      }).toString();
      (c = _.enc.Hex.parse(w.substr(0, r / 4))),
        (f = _.enc.Hex.parse(w.substr(r / 4)));
    }
    return [c, f];
  }
  function s(r, t, e, n, o, s, a, u, c, f, l, d, p) {
    var g = w[e] ? z[d] : z.NoPadding,
      y = i(r, t, e, n, o, s, a, u, c, f, l);
    return [y[0], { iv: y[1], mode: R[e], padding: g, drop: p }];
  }
  function a(r, t, e, n) {
    return !w[r] || "NoPadding" !== t || e % (n / 8) == 0;
  }
  function u(r, t, e) {
    if ("custom" === r && (e = 8 * o(t).sigBytes) < 40)
      throw new Error("Key should be greater or equal than 40 bits.");
    return e;
  }
  function c(t, i, u, c, f, l, d, p, w, g, h, v, E, B, D, m, b) {
    var A = c instanceof y;
    c = n(c);
    var S = c.length;
    if ((A && (ot.setFilename(t), (S = ot.getFile().size)), !a(l, d, S, u)))
      throw new Error("Message must be multipler of " + u + " bits.");
    if ("random" === D) m = F.random(8);
    else if ("nosalt" === D) m = null;
    else if (((m = o(m)), 8 !== m.sigBytes))
      throw new Error("Salt must be 64 bits.");
    var C = s(f, u, l, p, w, g, h, v, E, B, m, d, b),
      k = i.createEncryptor(C[0], C[1]),
      _ = new (A ? ot.DownloadBuilder : r)();
    "custom" !== p &&
      m &&
      _.push(e(F.create([1398893684, 1701076831]).concat(m)));
    var $ = {
      update: function (r) {
        var t = o(A ? new Uint8Array(r) : r),
          n = k.process(t);
        return _.push(e(n)), $;
      },
      hex: function () {
        var r = k.finalize();
        return (
          _.push(e(r)),
          A ? (ot.setDownload(_.finalize()), ot.DOWNLOAD_MESSAGE) : _.result
        );
      },
    };
    return $.update(c);
  }
  function f(r) {
    var t = function () {
      return r.apply(this, Array.prototype.slice.call(arguments, 0)).hex();
    };
    return (t.update = r), t;
  }
  function l(n, i, u, c, f, l, d, w, g, h, v, E, B, D) {
    var m = u instanceof y,
      b = u.length;
    m && (b = ot.getFile().size), (u = m ? new Uint8Array(u) : u);
    var A;
    if ("custom" !== d) {
      u = t(u);
      var S = u.words;
      1398893684 == S[0] &&
        1701076831 == S[1] &&
        ((A = F.create(S.slice(2, 4))),
        S.splice(0, 4),
        (u.sigBytes -= 16),
        (b -= 16)),
        (u = e(u));
    }
    if (!a(f, l, b, i))
      throw new Error("Message must be multipler of " + i + " bits.");
    var C = 0,
      k = s(c, i, f, d, w, g, h, v, E, B, A, l, D),
      _ = n.createDecryptor(k[0], k[1]),
      $ = new (m ? ot.DownloadBuilder : r)(),
      P = {
        update: function (r) {
          var t = o(m ? new Uint8Array(r) : r),
            n = _.process(t);
          return (C += n.sigBytes), $.push(e(n)), P;
        },
        hex: function () {
          var r = _.finalize();
          C += r.sigBytes;
          var t = b;
          if (C < t - i / 8 || C > t) throw new Error(p);
          return (
            $.push(e(r)),
            m ? (ot.setDownload($.finalize()), ot.DOWNLOAD_MESSAGE) : $.result
          );
        },
      };
    return P.update(u);
  }
  function d(r, t) {
    var e = 255 & r.words[(r.sigBytes - 1) >>> 2],
      n = r.sigBytes;
    if (0 === e || e > n) throw new Error(p);
    if ("Iso10126" !== t)
      for (var o = "Pkcs7" === t ? e : 0, i = n - 2; i > n - e - 1; --i) {
        var s = (r.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 255;
        if (s !== o) throw new Error(p);
      }
    r.sigBytes -= e;
  }
  var p = "bad decrypt",
    w = { CBC: !0, ECB: !0 },
    g = window.Uint8Array || Array,
    y = window.ArrayBuffer;
  (window.aes = {}),
    (window.des = {}),
    (window.tripleDes = {}),
    (window.rc4 = {}),
    (r.prototype.push = function (r) {
      this.result = this.result.concat(Array.from(r));
    }),
    (aes.encrypt = f(function (r, t, e, n, o, i, s, a, u, f, l, d, p) {
      return c("aes.dat", x.AES, 128, r, t, e, n, o, i, s, a, u, f, l, d, p);
    })),
    (des.encrypt = f(function (r, t, e, n, o, i, s, a, u, f, l, d) {
      return c("des.dat", x.DES, 64, r, 64, t, e, n, o, i, s, a, u, f, l, d);
    })),
    (tripleDes.encrypt = f(function (r, t, e, n, o, i, s, a, u, f, l, d, p) {
      return c(
        "3des.dat",
        x.TripleDES,
        64,
        r,
        t,
        e,
        n,
        o,
        i,
        s,
        a,
        u,
        f,
        l,
        d,
        p,
      );
    })),
    (rc4.encrypt = f(function (r, t, e, n, o, i, s, a, f, l, d) {
      return (
        (f = u(e, a, f)),
        c(
          "rc4.dat",
          x.RC4Drop,
          0,
          r,
          f,
          "ECB",
          null,
          e,
          n,
          o,
          i,
          s,
          a,
          null,
          l,
          d,
          t,
        )
      );
    })),
    (aes.decrypt = f(function (r, t, e, n, o, i, s, a, u, c, f) {
      return l(x.AES, 128, r, t, e, n, o, i, s, a, u, c, f);
    })),
    (des.decrypt = f(function (r, t, e, n, o, i, s, a, u, c) {
      return l(x.DES, 64, r, 64, t, e, n, o, i, s, a, u, c);
    })),
    (tripleDes.decrypt = f(function (r, t, e, n, o, i, s, a, u, c, f) {
      return l(x.TripleDES, 64, r, t, e, n, o, i, s, a, u, c, f);
    })),
    (rc4.decrypt = f(function (r, t, e, n, o, i, s, a, c) {
      return (
        (c = u(e, a, c)),
        l(x.RC4Drop, 0, r, c, "ECB", null, e, n, o, i, s, a, null, t)
      );
    }));
  var h = $("#mode"),
    v = $("#iv-block"),
    E = $("#padding-block"),
    B = function () {
      var r = h.val();
      v.toggle("ECB" !== r), E.toggle(!!w[r]);
    };
  h.change(B), B();
  var D = $("#key-type"),
    m = $("#key-iv"),
    b = $("#derivation-block"),
    A = function () {
      var r = "custom" === D.val();
      m.toggle(r), b.toggle(!r);
    };
  D.change(A), A();
  var S = $("#salt-type"),
    C = $("#salt-block");
  if (S.length) {
    var k = function () {
      C.toggle("custom" === S.val());
    };
    S.change(k), k();
  }
  var _, P, x, z, R, F;
  $(window).on("methodLoad", function () {
    (_ = CryptoJS),
      (P = _.lib),
      (x = _.algo),
      (z = _.pad),
      (R = _.mode),
      (F = P.WordArray),
      (z.Pkcs7.unpad = function (r) {
        d(r, "Pkcs7");
      }),
      (z.Iso97971.unpad = function (r) {
        z.ZeroPadding.unpad(r);
        var t = r.sigBytes - 1;
        if (128 != ((r.words[t >>> 2] >>> (24 - (t % 4) * 8)) & 255))
          throw new Error(p);
        r.sigBytes--;
      }),
      (z.AnsiX923.unpad = function (r) {
        d(r, "AnsiX923");
      }),
      (z.Iso10126.unpad = function (r) {
        d(r, "Iso10126");
      }),
      (function () {
        function r(r) {
          for (
            var t = this._S, e = this._i, n = this._j, o = 0, i = 0;
            i < r;
            i++
          ) {
            (e = (e + 1) % 256), (n = (n + t[e]) % 256);
            var s = t[e];
            (t[e] = t[n]),
              (t[n] = s),
              (o |= t[(t[e] + t[n]) % 256] << (24 - (i % 4) * 8));
          }
          return (this._i = e), (this._j = n), o;
        }
        var t = x.RC4,
          e = (x.RC4Drop = t.extend({
            cfg: t.cfg.extend({ drop: 192 }),
            _doReset: function () {
              t._doReset.call(this), r.call(this, this.cfg.drop);
            },
          }));
        _.RC4Drop = P.StreamCipher._createHelper(e);
      })();
  });
})();
