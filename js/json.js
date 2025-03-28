!(function () {
  "use strict";
  function t(t) {
    try {
      return JSON.parse(t), "Valid";
    } catch (t) {
      return t.message;
    }
  }
  function e(t) {
    return JSON.stringify(JSON.parse(t));
  }
  function a(t, e, a) {
    var n = JSON.stringify(JSON.parse(t), null, a);
    return (
      "tab" === e &&
        (n = n.replace(/^\s+/gm, function (t) {
          return t.replace(/ /g, "\t");
        })),
      n
    );
  }
  function n(t) {
    r ||
      ((r = document.createElement("andypf-json-viewer")),
      (r.id = "json"),
      (r.expanded = !0),
      (r.indent = 2),
      (r.showDataTypes = !1),
      (r.showToolbar = !0),
      (r.showSize = !0),
      (r.showCopy = !0),
      (r.expandIconType = "square"),
      $("#output").html(r)),
      r.setAttribute(
        "theme",
        "1" === localStorage.getItem("DARK") ? "monokai" : "default-light",
      );
    try {
      r.data = JSON.parse(t);
    } catch (t) {
      r.data = t.message;
    }
  }
  var r;
  $(".theme").click(function () {
    r &&
      r.setAttribute(
        "theme",
        "1" === localStorage.getItem("DARK") ? "monokai" : "default-light",
      );
  }),
    (window.json = { validate: t, minify: e, format: a, view: n });
})();
