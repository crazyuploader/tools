!(function () {
  function e(e, n) {
    for (var t = new Array(e), o = e.length, r = n ? f : s, i = 0; i < o; ++i)
      t[i] = r[255 & e[i]];
    return t.join("");
  }
  function n(e, n) {
    if (((n = n || Array), !e)) return new n(0);
    if (!e.match(/^[0-9a-fA-F]+$/))
      throw new Error("Input is not a hex string.");
    e.length % 2 != 0 && (e = "0" + e);
    for (var t = e.length, o = new n(t >> 1), r = 0; r < t - 8; r += 8) {
      var i = parseInt(e.substring(r, r + 8), 16),
        d = r >> 1;
      (o[d++] = (i >> 24) & 255),
        (o[d++] = (i >> 16) & 255),
        (o[d++] = (i >> 8) & 255),
        (o[d] = 255 & i);
    }
    for (; r < t; r += 2) o[r >> 1] = parseInt(e.substring(r, r + 2), 16);
    return o;
  }
  function t(e) {
    return w || (w = new p()), w.encode(e);
  }
  function o(e) {
    return x || (x = new v()), x.decode(e);
  }
  function r(e, n) {
    return "base64" === e && 2 !== h.base64.status
      ? (h.base64.load(n || ot.execute), !1)
      : 1 === e && 2 !== h.encoding.status
        ? (h.encoding.load(n || ot.execute), !1)
        : 2 !== e ||
          2 === h.encodingIndexes.status ||
          (h.encoding.load(n || ot.execute),
          h.encodingIndexes.load(n || ot.execute),
          !1);
  }
  function i(e, t) {
    return "hex" === e
      ? n(t)
      : "base64" === e
        ? base64.decode.bytes(t)
        : "utf-8" !== e
          ? new TextEncoding.TextEncoder(e, {
              NONSTANDARD_allowLegacyEncoding: !0,
            }).encode(t)
          : t;
  }
  function d(n, t) {
    if ("hex" === n) return e(t);
    if ("hex_upper" === n) return e(t, !0);
    if ("base64" === n) return base64.encode(t);
    if (window.Uint8Array) return new v(n).decode(new Uint8Array(t));
    if ("utf-8" === n) return ot.bytesToUtf8(t);
    throw new Error("Browser is not suppored.");
  }
  function a(e, t) {
    return "hex" === e
      ? t
      : "hex_upper" === e
        ? t.toUpperCase()
        : "base64" === e
          ? base64.encode(n(t))
          : void 0;
  }
  function c(e, n, t, o) {
    if (n.length && n.is(":visible")) {
      return (
        !!r(n.find("option:selected").data("load-encoding"), o) && t(n.val(), e)
      );
    }
    return e;
  }
  function u() {
    $('[data-toggle="encoding"]').each(function () {
      var e = $(this);
      e.val() ||
        (e.find('option[value="utf-8"]').length
          ? e.val("utf-8")
          : e.val(e.find("option")[0].value));
    });
  }
  for (var s = new Array(256), f = new Array(256), g = 0; g < 256; ++g) {
    var l = g < 16 ? "0" : "";
    (s[g] = l + g.toString(16)), (f[g] = s[g].toUpperCase());
  }
  var w,
    x,
    p = window.TextEncoder,
    v = window.TextDecoder,
    h = {
      encoding: ot.createOnDemandScript("js/encoding.min.js?v=1"),
      encodingIndexes: ot.createOnDemandScript("js/encoding-indexes.min.js"),
      base64: ot.createOnDemandScript("js/base64.min.js"),
    };
  (ot.onDemandScripts = h),
    (ot.hexToBytes = n),
    (ot.bytesToHex = e),
    (ot.utf8ToBytes = t),
    (ot.bytesToUtf8 = o),
    (ot.loadEncodingLevel = r),
    (ot.refreshEncodingSelect = u);
  var m = ot.getInput;
  ot.setGetInput(function (e) {
    e.encodingElement || (e.encodingElement = $(e.data("encoding-from")));
    var n = e.encodingElement;
    return c(m(e), n, i);
  });
  var E = ot.setOutput;
  ot.setSetOutput(function (e, n) {
    e.encodingElement || (e.encodingElement = $(e.data("encoding-from")));
    var t = e.encodingElement,
      o = "hex" === t.data("type") ? a : d,
      r = c(n, t, o, function () {
        ot.setOutput(e, n);
      });
    if (!1 === r) return void e.val("loading...");
    E(e, r);
  }),
    u(),
    window.Uint8Array
      ? window.TextEncoder ||
        (++waitLoadCount,
        h.encoding.load(function () {
          (p = window.TextEncoder || TextEncoding.TextEncoder),
            (v = window.TextDecoder || TextEncoding.TextDecoder),
            methodLoad();
        }))
      : (++waitLoadCount,
        ot.createOnDemandScript("js/utf8.js").load(function () {
          methodLoad();
        }));
})();
