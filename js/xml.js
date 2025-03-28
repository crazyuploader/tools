!(function () {
  "use strict";
  function r(r) {
    return "Comment" !== r.type;
  }
  function t(r) {
    if (!i) return "Sorry, your browser does not support this tool.";
    var t = i.parseFromString(r, "application/xml"),
      e = t.querySelector("parsererror div");
    return e && t.documentElement.outerHTML !== r ? e.innerText : "Valid";
  }
  function e(r) {
    if (i) {
      var e = t(r);
      if ("Valid" !== e) throw new Error(e);
    }
  }
  function n(t, n) {
    return (
      e(t),
      xmlFormatter.minify(t, {
        strictMode: !0,
        collapseContent: !0,
        filter: n && r,
      })
    );
  }
  function o(r, t, n) {
    e(r);
    for (var o = "space" === t ? " " : "\t", i = "", a = 0; a < n; ++a) i += o;
    return xmlFormatter(r, {
      strictMode: !0,
      collapseContent: !0,
      indentation: i,
    });
  }
  var i;
  window.DOMParser && (i = new DOMParser()),
    (window.xml = { validate: t, minify: n, format: o });
})();
