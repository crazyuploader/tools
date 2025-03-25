!(function () {
  "use strict";
  function r(r) {
    function e(e) {
      if (
        (e instanceof Uint8Array ||
          (ArrayBuffer.isView(e)
            ? (e = new Uint8Array(e.buffer, e.byteOffset, e.byteLength))
            : Array.isArray(e) && (e = Uint8Array.from(e))),
        !(e instanceof Uint8Array))
      )
        throw new TypeError("Expected Uint8Array");
      if (0 === e.length) return "";
      for (var n = 0, o = 0, t = 0, a = e.length; t !== a && 0 === e[t]; )
        t++, n++;
      for (var i = ((a - t) * u + 1) >>> 0, f = new Uint8Array(i); t !== a; ) {
        for (
          var c = e[t], h = 0, y = i - 1;
          (0 !== c || h < o) && -1 !== y;
          y--, h++
        )
          (c += (256 * f[y]) >>> 0), (f[y] = c % d >>> 0), (c = (c / d) >>> 0);
        if (0 !== c) throw new Error("Non-zero carry");
        (o = h), t++;
      }
      for (var s = i - o; s !== i && 0 === f[s]; ) s++;
      for (var A = w.repeat(n); s < i; ++s) A += r.charAt(f[s]);
      return A;
    }
    function n(r) {
      if ("string" != typeof r) throw new TypeError("Expected String");
      if (0 === r.length) return new Uint8Array();
      for (var e = 0, n = 0, o = 0; r[e] === w; ) n++, e++;
      for (
        var a = ((r.length - e) * h + 1) >>> 0, i = new Uint8Array(a);
        r[e];

      ) {
        var f = t[r.charCodeAt(e)];
        if (255 === f) return;
        for (var c = 0, u = a - 1; (0 !== f || c < o) && -1 !== u; u--, c++)
          (f += (d * i[u]) >>> 0),
            (i[u] = f % 256 >>> 0),
            (f = (f / 256) >>> 0);
        if (0 !== f) throw new Error("Non-zero carry");
        (o = c), e++;
      }
      for (var y = a - o; y !== a && 0 === i[y]; ) y++;
      for (var s = new Uint8Array(n + (a - y)), A = n; y !== a; )
        s[A++] = i[y++];
      return s;
    }
    function o(r) {
      var e = n(r);
      if (e) return e;
      throw new Error("Non-base" + d + " character");
    }
    if (r.length >= 255) throw new TypeError("Alphabet too long");
    for (var t = new Uint8Array(256), a = 0; a < t.length; a++) t[a] = 255;
    for (var i = 0; i < r.length; i++) {
      var f = r.charAt(i),
        c = f.charCodeAt(0);
      if (255 !== t[c]) throw new TypeError(f + " is ambiguous");
      t[c] = i;
    }
    var d = r.length,
      w = r.charAt(0),
      h = Math.log(d) / Math.log(256),
      u = Math.log(256) / Math.log(d);
    return { encode: e, decodeUnsafe: n, decode: o };
  }
  (window.base = r),
    (window.base58 = r(
      "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",
    ));
  var e,
    n,
    o = "undefined" != typeof ArrayBuffer;
  (window.base58Encode = function (r) {
    return (
      "string" == typeof r
        ? (e || (e = new TextEncoder()), (r = e.encode(r)))
        : o && r.constructor === ArrayBuffer && (r = new Uint8Array(r)),
      base58.encode(r)
    );
  }),
    (window.base58Decode = function (r) {
      return n || (n = new TextDecoder()), n.decode(base58.decode(r));
    }),
    (window.downloadMethod = function (r) {
      return base64.encode(base58.decode(r));
    }),
    window.TextEncoder ||
      (++waitLoadCount,
      onDemandScripts.encoding.load(function () {
        methodLoad();
      }));
})();
