!(function () {
  ($.fn.droppableFile = function () {
    var e = !1;
    e &&
      ((e = !0),
      $(document.body).on("dragover drop", function (e) {
        return e.preventDefault(), !1;
      })),
      this.each(function () {
        var e = $(this),
          n = e.find("input"),
          o = e.find(".droppable-zone-text"),
          r = o.text();
        e.on("dragover", function () {
          e.addClass("hover");
        }),
          e.on("dragleave", function () {
            e.removeClass("hover");
          }),
          e.on("drop", function (r) {
            e.removeClass("hover");
            var a = r.originalEvent.dataTransfer.files;
            (n[0].files = a),
              o.text(a[0].name),
              e.trigger("droppableFile:change", [a]);
          }),
          n.change(function () {
            var a = n[0].files;
            a[0] ? o.text(a[0].name) : o.text(r),
              e.trigger("droppableFile:change", [a]);
          });
      });
  }),
    $(".droppable-zone").droppableFile();
})();
