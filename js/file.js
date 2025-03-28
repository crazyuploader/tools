!(function (t) {
  function e() {
    this.result = [];
  }
  (t.ot = t.ot || {}),
    (e.prototype.push = function (t) {
      (t = "string" == typeof t ? t : new Uint8Array(t)), this.result.push(t);
    }),
    (e.prototype.finalize = function () {
      var e = new Blob(this.result);
      return t.URL.createObjectURL(e);
    });
  var o,
    a = $("#droppable-zone"),
    n = $("#file-type"),
    l = $("#input"),
    r = $("#output"),
    i = $("#download-image"),
    d = $(".text-only"),
    u = $(".file-only"),
    c = n.data("url-placeholder"),
    f = l.attr("placeholder");
  a.on("droppableFile:change", function (t, e) {
    (g = o = e[0]), r.val(""), i.hide(), ot.autoUpdate();
  });
  var h = function () {
      if ("text" === n.val()) return void ot.autoUpdate();
      if ("url" === n.val()) {
        r.val("download...");
        var t = l.val();
        ot.getBlob(
          t,
          function (e) {
            e
              ? ((g = e), ot.autoUpdate())
              : ((g = null),
                setTimeout(function () {
                  r.val(t ? "download failed" : "");
                }));
          },
          function (t) {
            var e =
              (t.total ? ((t.loaded / t.total) * 100).toFixed(2) : 100) + "%";
            r.val("download..." + e);
          },
        );
      }
    },
    p = function () {
      l.off("change", h), l.off("input propertychange", p);
    };
  l.on("input propertychange", p), l.on("input propertychange change", h);
  var v = $("#download-file-name");
  v.change(function () {
    i.attr("download", v.val());
  }),
    v.change();
  var s = function () {
    w && (w.abort(), (w = null));
  };
  n.change(function () {
    var t = "text" === n.val();
    d.toggle(t),
      u.toggle(!t),
      t ? l.attr("placeholder", f) : c && l.attr("placeholder", c),
      "file" === n.val()
        ? (ot.cancelGetBlob(), l.hide(), a.show(), (g = o))
        : (s(), l.show(), a.hide(), (g = null), h());
  });
  var g,
    w,
    y = ot.execute;
  ot.setExecute(function () {
    if ((r.val(""), i.hide(), !b)) return r.val("loading...");
    if ((s(), "text" === n.val())) return y();
    if (g) {
      if (!t.FileReader) return r.text("Your browser does not support.");
      gtag("event", "submit");
      var e = t.PROCESSING_MESSAGE || "hashing...";
      if (((w = new FileReader()), method.update)) {
        var o = t.FILE_BATCH_SIZE || 2097152,
          a = 0,
          l = g.size,
          d = method;
        w.onload = function (t) {
          try {
            (d = d.update(t.target.result)), u();
          } catch (t) {
            r.val(t);
          }
        };
        var u = function () {
          if (a < l) {
            r.val(e + ((a / l) * 100).toFixed(2) + "%");
            var t = Math.min(a + o, l);
            w.readAsArrayBuffer(g.slice(a, t)), (a = t);
          } else ot.handleOutput(d.hex());
        };
        u();
      } else
        r.val(e),
          (w.onload = function (t) {
            try {
              ot.handleOutput(method(t.target.result));
            } catch (t) {
              r.val(t);
            }
          }),
          w.readAsArrayBuffer(g);
    }
  }),
    (ot.DownloadBuilder = e),
    (ot.DOWNLOAD_MESSAGE = "Please click the download icon to download."),
    (ot.getFile = function () {
      return g;
    }),
    (ot.setFilename = function (t) {
      i.attr("download", t);
    }),
    (ot.setDownload = function (t) {
      i.attr("href", t), i.show();
    });
  var b = !1;
  $(t).on("methodLoad", function () {
    (b = !0), r.val(""), n.change();
  }),
    !!(t.Blob && t.URL && t.URL.createObjectURL) ||
      (++waitLoadCount,
      ot
        .createOnDemandScript("js/data-uri-download-builder.js")
        .load(function () {
          methodLoad();
        }));
})(window);
