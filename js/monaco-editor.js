!(function () {
  function t() {
    require.config({
      paths: {
        vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.51.0/min/vs",
      },
    }),
      require(["vs/editor/editor.main"], function () {
        n.removeClass("loading"),
          $('[data-toggle="monacoEditor"]').monacoEditor(),
          n.prop("disabled", !1);
      });
  }
  function e(t) {
    var e = {};
    (e.automaticLayout = !0),
      (e.theme = "1" === localStorage.getItem("DARK") ? "vs-dark" : "vs"),
      (e.minimap = { enabled: !1 }),
      (e.value = t.val()),
      (e.language = t.data("language")),
      (e.readOnly = t.prop("readonly")),
      (this.element = t),
      (this.editorElement = $("<div></div>")
        .attr("class", t.attr("class"))
        .addClass("monaco-editor-wrap")
        .insertAfter(t)),
      (this.editor = monaco.editor.create(this.editorElement[0], e)),
      t.addClass("hidden-input"),
      (this.model = this.editor.getModel());
    var o = this;
    (this.locked = !1),
      this.model.onDidChangeContent(function (t) {
        o.locked ||
          ((o.locked = !0),
          (o.element[0].value = o.model.getValue()),
          o.element.trigger("input"),
          (o.locked = !1));
      }),
      this.element.on("input", function () {
        o.locked || o.model.setValue(o.element.val());
      });
  }
  function o() {
    if (1 !== i.status)
      if (n.prop("checked")) {
        if (((d = !0), localStorage.setItem(a, "1"), !i.status))
          return n.prop("disabled", !0), n.addClass("loading"), void i.load(t);
        $('[data-toggle="monacoEditor"]').monacoEditor("showRich");
      } else
        (d = !1),
          localStorage.removeItem(a),
          $('[data-toggle="monacoEditor"]').monacoEditor("showPlain");
  }
  var a = "MONACO_EDITOR_KEY",
    i = ot.createOnDemandScript(
      "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.51.0/min/vs/loader.min.js",
    );
  (e.prototype.showPlain = function () {
    this.element.removeClass("hidden-input"), this.editorElement.hide();
  }),
    (e.prototype.showRich = function () {
      this.element.addClass("hidden-input"), this.editorElement.show();
    }),
    ($.fn.monacoEditor = function (t) {
      if ("string" == typeof t)
        return void $(this).each(function () {
          $(this).data(a)[t]();
        });
      $(this).each(function () {
        var t = $(this);
        t.data(a, new e(t));
      });
    });
  var n = $("#pretty-display"),
    d = localStorage.getItem(a);
  n.change(o),
    $(".theme").click(function () {
      2 === i.status &&
        monaco.editor.setTheme(
          "1" === localStorage.getItem("DARK") ? "vs-dark" : "vs",
        );
    });
  var l = $.fn.val;
  ($.fn.val = function () {
    var t = l.apply(this, arguments),
      e = this.data(a);
    return (
      e && !e.locked && arguments.length && e.model.setValue(l.apply(this, [])),
      t
    );
  }),
    $(window).on("methodLoad", function () {
      d &&
        setTimeout(function () {
          n.prop("checked", !0), o();
        });
    });
})();
