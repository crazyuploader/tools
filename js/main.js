!(function (t, e, a, o) {
  function n(t, e, a) {
    c({
      src: t[e++],
      onload: function () {
        e === t.length ? a() : n(t, e, a);
      },
    });
  }
  function r(t) {
    t = Array.isArray(t) ? t : [t];
    var e = {
      status: 0,
      load: function (a) {
        e.status ||
          ((e.status = 1),
          n(t, 0, function () {
            (e.status = 2), a && setTimeout(a);
          }));
      },
    };
    return e;
  }
  function c(t) {
    var e = a.createElement("script");
    (e.async = !0),
      (e.src = t.src),
      (e.onload = t.onload),
      a.body.appendChild(e);
  }
  function i() {
    for (var t = 0; t < delayScripts.length; ++t)
      !(function (t) {
        setTimeout(function () {
          t.src ? c(t) : t.onload && t.onload();
        }, t.delay || 0);
      })(delayScripts[t]);
  }
  function l(o, n) {
    var r = t("#remember-input"),
      c = t("[data-remember]"),
      i = localStorage.getItem(d);
    return (
      o ||
        n ||
        !i ||
        (r.prop("checked", !0),
        c.each(function () {
          var e = localStorage.getItem(d + "_" + t(this).data("remember"));
          e &&
            ("SELECT" === this.tagName
              ? t(this).find('option[value="' + e + '"]').length &&
                t(this).val(e)
              : "checkbox" === this.type
                ? t(this).prop("checked", "1" === e)
                : t(this).val(e));
        })),
      r.change(function () {
        r.prop("checked")
          ? ((i = !0),
            localStorage.setItem(d, "1"),
            c.trigger("input"),
            n &&
              ((n = !1), e.history.pushState({}, a.title, location.pathname)))
          : ((i = !1),
            localStorage.removeItem(d),
            c.each(function () {
              localStorage.removeItem(d + "_" + t(this).data("remember"));
            }));
      }),
      c.on("input", function () {
        if (i) {
          var e = d + "_" + t(this).data("remember");
          "checkbox" === this.type
            ? t(this).prop("checked")
              ? localStorage.setItem(e, 1)
              : localStorage.setItem(e, 0)
            : localStorage.setItem(e, t(this).val());
        }
      }),
      c.length || r.closest(".option-block").hide(),
      i
    );
  }
  function s() {
    for (
      var t = {}, e = location.search.substring(1), a = e.split("&"), o = 0;
      o < a.length;
      ++o
    ) {
      var n = a[o].split("=");
      t[n[0]] = decodeURIComponent(n[1]);
    }
    return t;
  }
  function u() {
    if (t("#share-link").length) {
      var e = s(),
        a = !1;
      return (
        t("[data-share]").each(function () {
          var o = t(this).data("share"),
            n = e[o];
          n &&
            ((n = n),
            "SELECT" === this.tagName
              ? t(this).find('option[value="' + n + '"]').length &&
                t(this).val(n)
              : "checkbox" === this.type
                ? t(this).prop("checked", "1" === n)
                : t(this).val(n),
            (a = !0));
        }),
        a
      );
    }
  }
  function h() {
    var e = localStorage.getItem("SWAP") || "{}";
    localStorage.removeItem("SWAP");
    try {
      e = JSON.parse(e);
    } catch (t) {
      return !1;
    }
    for (var a = Object.keys(e), o = 0; o < a.length; ++o) {
      var n = a[o],
        r = t(n);
      r.length &&
        ("checkbox" === r[0].type ? r.prop("checked", !0) : r.val(e[n]));
    }
    var c = localStorage.getItem("NO_SWAPPED");
    return localStorage.removeItem("NO_SWAPPED"), a.length && !c;
  }
  function p() {
    var e = t("#share-link");
    if (e.length) {
      var a = [];
      t("[data-share]:not([data-share-ignore])").each(function () {
        var e = t(this).data("share"),
          o = "";
        (o =
          "checkbox" === this.type
            ? t(this).prop("checked")
              ? "1"
              : "0"
            : t(this).val()) && a.push(e + "=" + encodeURIComponent(o));
      });
      var o = "";
      a.length && (o = location.origin + location.pathname + "?" + a.join("&")),
        e.val(o);
    }
  }
  (e.ot = e.ot || {}),
    (e.method = e.method || null),
    Object.assign ||
      (++waitLoadCount,
      delayScripts.push({
        src: "https://cdnjs.cloudflare.com/ajax/libs/core-js/3.33.1/minified.js",
        onload: function () {
          methodLoad();
        },
      })),
    (e.withOptions = function (e, a, o) {
      o = o || 0;
      var n = a.map(function (e) {
          var a = t('[data-option="' + e + '"]');
          return { name: e, element: a, type: a.data("option-type") };
        }),
        r = function (t) {
          return function () {
            for (var e = [], a = 0; a < n.length; ++a) {
              var o = n[a];
              if ("encoding" === o.type) {
                var r = m(o.element);
                if (!1 === r) return !1;
                e.push(r);
              } else {
                var c = o.element.val();
                "number" === o.element.attr("type")
                  ? (c = parseFloat(c))
                  : "checkbox" === o.element.attr("type") &&
                    (c = o.element.prop("checked")),
                  e.push(c);
              }
            }
            return (
              (e = Array.prototype.slice.call(arguments, 0).concat(e)),
              t.apply(this, e)
            );
          };
        },
        c = r(e);
      return e.update && (c.update = r(e.update)), c;
    });
  var d = "REMEMBER_INPUT";
  e.swap = function (e, a) {
    gtag("event", "swap");
    for (var o = {}, n = 0; n < a.length; ++n) {
      var r = a[n],
        c = t(r[0]);
      o[r[1]] = r[2] ? (c.prop("checked") ? "1" : "") : c.val();
    }
    localStorage.setItem("SWAP", JSON.stringify(o)), (location.href = e);
  };
  var g, f, m, v;
  t(a).ready(function () {
    i();
    var a,
      o = h(),
      n = !o && u(),
      c = l(o, n),
      d = t("#input"),
      y = t("#output"),
      b = t("#auto-update"),
      k = b.prop("checked");
    handleOutput = function (t) {
      t instanceof Promise
        ? t
            .then(function (t) {
              v(y, t);
            })
            .catch(function (t) {
              y.val(t);
            })
        : v(y, t);
    };
    var S = !1;
    if (
      ((g = function () {
        if (C < waitLoadCount) return (S = !0), void y.val("loading...");
        if (method)
          try {
            if ((p(), (val = m(d)), !1 === val)) return;
            gtag("event", "submit"), handleOutput(method(val));
          } catch (t) {
            y.val(t);
          }
      }),
      (f = function () {
        b[0].checked &&
          (a && (clearTimeout(a), (a = null)),
          (a = setTimeout(function () {
            g();
          }, 0)));
      }),
      (m = function (t) {
        return t.val();
      }),
      (v = function (t, e) {
        t.val(e);
      }),
      b.length > 0)
    ) {
      var I = function () {
        t(this).off("change", f), t(this).off("input propertychange", I);
      };
      t("[data-auto-update], [data-option]").on("input propertychange", I),
        t("[data-auto-update], [data-option]").on(
          "input propertychange change",
          f,
        ),
        b.change(f);
    }
    t("#execute").click(function () {
      g();
    });
    var C = 0;
    (e.methodLoad = function () {
      ++C < waitLoadCount ||
        (t(e).trigger("methodLoad"), (o || n || (c && k) || S) && g());
    }),
      (ot.getQuery = s),
      (ot.createOnDemandScript = r),
      (ot.getInput = m),
      (ot.setOutput = v),
      (ot.autoUpdate = f),
      (ot.handleOutput = handleOutput),
      (ot.execute = g),
      (ot.setExecute = function (t) {
        ot.execute = g = t;
      }),
      (ot.setGetInput = function (t) {
        ot.getInput = m = t;
      }),
      (ot.setSetOutput = function (t) {
        ot.setOutput = v = t;
      });
    var O = t("#sidebar details.active")[0];
    O && O.scrollIntoView(),
      t("#sidebar-toggler").click(function () {
        t("#sidebar").addClass("open"),
          t("#sidebar-toggler").attr("aria-expanded", !0);
      }),
      t("#sidebar .mask").click(function () {
        t("#sidebar").removeClass("open"),
          t("#sidebar-toggler").attr("aria-expanded", !1);
      }),
      t(".theme").click(function () {
        t("html").toggleClass("dark-theme"),
          localStorage.setItem(
            "DARK",
            t("html").hasClass("dark-theme") ? 1 : 0,
          ),
          gtag("event", "theme");
      }),
      t('[data-toggle="copyblock"]').each(function () {
        var e = t(this),
          a = t(e.find("[data-clipboard-target]").data("clipboard-target")),
          o = t("<div></div>");
        e.prop("open") ||
          (a.replaceWith(o), a.appendTo("body").addClass("hidden-input")),
          e.on("toggle", function () {
            e.prop("open")
              ? o.replaceWith(a.removeClass("hidden-input"))
              : (a.replaceWith(o), a.appendTo("body").addClass("hidden-input"));
          });
      }),
      t('[data-toggle="toggle"]').each(function () {
        var e = t(this),
          a = t(e.data("target")),
          o = function () {
            a.toggle(e.prop("checked"));
          };
        e.change(o), o();
      }),
      t('[data-toggle="fullscreen"]').each(function () {
        var e = t(this),
          a = e.closest(".block");
        e.click(function () {
          a.toggleClass("fullscreen"), gtag("event", "fullscreen");
        });
      }),
      t("summary").on("click", ".toolbar", function (t) {
        t.preventDefault();
      });
  });
  var y;
  e.showMessage = function (e, a) {
    t("#message").stop(!0, !0).text(e).show(),
      t("#message").toggleClass("error", !!a),
      clearTimeout(y),
      (y = setTimeout(function () {
        t("#message").fadeOut(1e3);
      }, 1e3));
  };
})(jQuery, window, document);
