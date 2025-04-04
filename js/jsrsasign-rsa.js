!(function () {
  (window.rsa = {}),
    (rsa.encrypt = function (r, t, n) {
      if (
        ((n = KEYUTIL.getKey(n)),
        "string" == typeof r && (r = ot.utf8ToBytes(r)),
        "RSA" !== t)
      ) {
        for (var e = "", o = 0; o < r.length; ++o)
          e += String.fromCharCode(r[o]);
        r = e;
      }
      return KJUR.crypto.Cipher.encrypt(r, n, t);
    }),
    (rsa.decrypt = function (r, t, n, e) {
      n = KEYUTIL.getKey(n, e);
      var o = KJUR.crypto.Cipher.decrypt(ot.bytesToHex(r), n, t);
      if (!o) throw new Error("bad decrypt");
      if ("RSA" !== t) {
        for (var i = [], u = 0; u < o.length; ++u) i.push(o.charCodeAt(u));
        return i;
      }
      return o;
    }),
    $(window).on("methodLoad", function () {
      function r(r, t) {
        if (t < r.length + 11) throw "Message too long for RSA";
        for (var n = new Array(), e = r.length - 1; e >= 0 && t > 0; ) {
          var o = r[e--];
          n[--t] = o;
        }
        n[--t] = 0;
        for (var i = new SecureRandom(), u = new Array(); t > 2; ) {
          for (u[0] = 0; 0 == u[0]; ) i.nextBytes(u);
          n[--t] = u[0];
        }
        return (n[--t] = 2), (n[--t] = 0), new BigInteger(n);
      }
      function t(r, t) {
        for (var n = r.toByteArray(), e = 0; e < n.length && 0 == n[e]; ) ++e;
        if (n.length - e != t - 1 || 2 != n[e]) return null;
        for (++e; 0 != n[e]; ) if (++e >= n.length) return null;
        for (var o = []; ++e < n.length; ) o.push(255 & n[e]);
        return o;
      }
      (RSAKey.prototype.decrypt = function (r) {
        if (r.length != Math.ceil(this.n.bitLength() / 4))
          throw new Error("wrong ctext length");
        var n = parseBigInt(r, 16),
          e = this.doPrivate(n);
        return null == e ? null : t(e, (this.n.bitLength() + 7) >> 3);
      }),
        (RSAKey.prototype.encrypt = function (t) {
          var n = r(t, (this.n.bitLength() + 7) >> 3);
          if (null == n) return null;
          var e = this.doPublic(n);
          if (null == e) return null;
          var o = e.toString(16);
          return 0 == (1 & o.length) ? o : "0" + o;
        });
    });
})();
