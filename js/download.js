!(function () {
  var t = $("#execute"),
    e = $("#download-file-name"),
    a = ot.getInput;
  ot.setGetInput(function (o) {
    return t.removeAttr("href"), t.attr("download", e.val()), a(o);
  }),
    ot.setSetOutput(function (e, a) {
      t.attr("href", "data:application/octet-stream;base64," + a),
        e.val("The download should have started.");
    });
})();
