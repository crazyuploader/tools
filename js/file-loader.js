!(function () {
  function e() {
    "text" !== a.val() &&
      (a.off("change", e),
      (waitLoadCount += 3),
      ot.createOnDemandScript("js/url-blob.js?v=1").load(methodLoad),
      ot.createOnDemandScript("js/droppable-file.js").load(methodLoad),
      ot.createOnDemandScript("js/file.js?v=10").load(methodLoad));
  }
  var a = $("#file-type");
  a.change(e), e();
})();
