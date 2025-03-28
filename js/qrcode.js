!(function () {
  function o(o) {
    var e = o.replace("-", "_"),
      n = {};
    return (
      (n[e + "_option_type"] = $("#" + o + "-option-type").val()),
      (n[e + "_option_color_type"] = $("#" + o + "-option-color-type").val()),
      (n[e + "_option_color"] = $("#" + o + "-option-color").val()),
      (n[e + "_option_gradient_color"] = $(
        "#" + o + "-option-gradient-color",
      ).val()),
      (n[e + "_option_rotation"] = $("#" + o + "-option-rotation").val()),
      n
    );
  }
  function e(o, e) {
    var n,
      r = o[e + "_option_color_type"];
    if (r)
      try {
        var t = JSON.parse(o[e + "_option_gradient_color"]);
        n = {
          type: r,
          rotation: (o[e + "_option_rotation"] / 180) * Math.PI,
          colorStops: t.map(function (o) {
            return { offset: o[0] / 100, color: o[1] };
          }),
        };
      } catch (o) {}
    return {
      color: o[e + "_option_color"],
      type: o[e + "_option_type"],
      gradient: n,
    };
  }
  function n(o, e) {
    var n = new FileReader();
    (n.onloadend = function () {
      e(n.result);
    }),
      n.readAsDataURL(o);
  }
  function r(o, e) {
    if (o instanceof File) return n(o, e);
    ot.getBlob(o, function (o) {
      n(o, e);
    });
  }
  function t(o, n) {
    var r = o.type,
      t = "svg" === r ? "svg" : "canvas";
    "file" === o.image_type && delete o.image;
    var a = o.ec;
    void 0 === a && (a = o.image ? "H" : "Q");
    var i = {
        width: o.size,
        height: o.size,
        margin: o.padding || 5,
        type: t,
        data: o.input,
        image: o.image,
        imageOptions: {
          imageSize: o.image_size || 0.4,
          margin: o.image_margin || 0,
          hideBackgroundDots: "1" !== o.image_show_background,
        },
        dotsOptions: e(o, "dot"),
        cornersSquareOptions: e(o, "corners_square"),
        cornersDotOptions: e(o, "corners_dot"),
        backgroundOptions: e(o, "background"),
        qrOptions: { errorCorrectionLevel: a },
      },
      c = document.getElementById("qrcode");
    new QRCodeStyling(i)
      .getRawData(r)
      .then(function (o) {
        var e = new FileReader();
        (e.onload = function (o) {
          (c.innerHTML = '<img src="' + o.target.result + '"/>'),
            n && n(o.target.result, r);
        }),
          e.readAsDataURL(o);
      })
      .catch(function (o) {
        console.log(o), n(null);
      });
  }
  if (
    ((window.fetchQuery = function () {
      for (
        var o = {}, e = location.search.substring(1), n = e.split("&"), r = 0;
        r < n.length;
        ++r
      ) {
        var t = n[r].split("=");
        o[t[0]] = decodeURIComponent(t[1]);
      }
      return o;
    }),
    (window.generateByQuery = function (o, e) {
      o.image
        ? r(o.image, function (n) {
            (o.image = n), t(o, e);
          })
        : t(o, e);
    }),
    window.$)
  ) {
    $.fn.grapick = function () {
      this.each(function () {
        function o(o) {
          $(o.getEl().querySelector(".grp-handler-cp-wrap")).css(
            "background-color",
            o.getColor(),
          );
        }
        var e = $(this);
        e.hide();
        var n = $("<div></div>").attr("class", e.attr("class"));
        n.insertAfter(e);
        var r,
          t = n.next().find("input");
        t.on("input", function () {
          r && (r.setColor(t.val()), o(r));
        });
        var a = new Grapick({
          el: n[0],
          colorEl: '<div class="grp-handler-cp-wrap"></div>',
        });
        a.on("handler:select", function (o) {
          (r = o), t.val(o.getColor()), t.change();
        }),
          a.on("handler:remove", function (o) {
            o === r && (r = null);
          }),
          a.on("change", function () {
            var o = a.getHandlers(),
              n = JSON.stringify(
                o.map(function (o) {
                  return [o.position, o.color];
                }),
              );
            e.val(n), e.trigger("input");
          }),
          a.setColorPicker(function (e) {
            o(e);
          });
        try {
          JSON.parse(e.val()).forEach(function (o) {
            a.addHandler(o[0], o[1]);
          });
        } catch (o) {}
      });
    };
    var a = $("#qrcode"),
      i = $("#image-type"),
      c = $("#image"),
      l = $("#url-block"),
      d = $(".share-block"),
      g = $("#download-image"),
      s = a.html(),
      u = $("#file-block"),
      p = $(".droppable-zone");
    if (!window.FileReader)
      return void a.text("Your browser does not support.");
    var h;
    p.on("droppableFile:change", function (o, e) {
      h = e[0];
    }),
      (window.generate = function (e) {
        var n = i.val(),
          r = "file" === n ? h : c.val(),
          t = $("#size").val(),
          l = Object.assign(
            {
              input: e,
              type: $("#type").val(),
              size: t,
              padding: $("#padding").val(),
              ec: $("#ec").val(),
              image: r,
              image_size: $("#image-size").val(),
              image_margin: $("#image-margin").val(),
              image_show_background: $("#image-show-background").prop("checked")
                ? "1"
                : "0",
            },
            o("dot"),
            o("corners-square"),
            o("corners-dot"),
            o("background"),
          );
        generateByQuery(l, function (o, e) {
          o
            ? (g.attr("download", "qrcode." + e).attr("href", o), g.show())
            : (a.html(s), g.hide());
        });
        var d = $("#share-link").val().replace("/generator/?", "/?");
        return (
          $("#qrcode-link").val(d),
          '<iframe src="' +
            d +
            '" frameborder="0" scrolling="no" width="' +
            t +
            '" height="' +
            t +
            '"></iframe>'
        );
      }),
      $(window).on("methodLoad", function () {
        i.change(function () {
          "url" === i.val()
            ? (l.show(), u.hide(), d.show())
            : (l.hide(), u.show(), d.hide());
        }),
          i.change(),
          $(".color-input").each(function () {
            var o,
              e = $(this).find("input"),
              n = $(this).find(".color");
            n.css("background-color", e.val()),
              e.change(function () {
                n.css("background-color", e.val()),
                  o && (o.color.setColor(e.val()), o.render());
              }),
              n.colorPicker({
                buildCallback: function () {
                  o = this;
                },
                renderCallback: function (o, n) {
                  !1 === n &&
                    (e.val(o._css.backgroundColor), e.trigger("input"));
                },
              });
          }),
          $('[data-toggle="grapick"]').grapick(),
          $('[data-toggle="color-type"]').each(function () {
            var o = $(this),
              e = o.closest(".setting-group"),
              n = e.find(".color-block"),
              r = e.find(".grapick-block"),
              t = e.find(".rotation-block"),
              a = function () {
                var e = o.val();
                "linear" === e
                  ? (n.hide().find("input").attr("data-share-ignore", !0),
                    r.show().find("input").removeAttr("data-share-ignore"),
                    t.show().find("input").removeAttr("data-share-ignore"))
                  : "radial" === e
                    ? (n.hide().find("input").attr("data-share-ignore", !0),
                      r.show().find("input").removeAttr("data-share-ignore"),
                      t.hide().find("input").attr("data-share-ignore", !0))
                    : (n.show().find("input").removeAttr("data-share-ignore"),
                      r.hide().find("input").attr("data-share-ignore", !0),
                      t.hide().find("input").attr("data-share-ignore", !0));
              };
            o.change(a), a();
          });
      });
  }
})();
