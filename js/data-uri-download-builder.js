!(function () {
  function t() {
    (this.result = []), (this.prev = []), (this.plain = !0);
  }
  (t.prototype.push = function (t) {
    "string" != typeof t && ((t = this.encodeArray(t)), (this.plain = !1)),
      this.result.push(t);
  }),
    (t.prototype.encodeArray = function (t) {
      t = this.prev.concat(Array.from(t));
      var e = t.length - (t.length % 3);
      return (this.prev = t.slice(e)), (t = t.slice(0, e)), base64.encode(t);
    }),
    (t.prototype.finalize = function () {
      return (
        this.prev.length && this.result.push(base64.encode(this.prev)),
        "data:" +
          (this.plain ? "text/plain;," : "application/octet-stream;base64,") +
          this.result.join("")
      );
    }),
    window.base64 ||
      (++waitLoadCount,
      ot.createOnDemandScript("js/base64.min.js").load(function () {
        methodLoad();
      })),
    (ot.DownloadBuilder = t);
})();
