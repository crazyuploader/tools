!(function () {
  var a = $("#validate-result"),
    t = ot.setOutput;
  ot.setSetOutput(function (l, d) {
    t(l, d),
      "Valid" === l.val()
        ? (a.addClass("valid").removeClass("invalid").text("Valid"), l.val(""))
        : a.addClass("invalid").removeClass("valid").text("Invalid");
  });
})();
