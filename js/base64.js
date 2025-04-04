!(function () {
  function e(e) {
    if (!/^[\w+/\-,]*={0,2}$/.test(e.replace(/[\r\n]/g, "")))
      throw new Error("Invalid base64 string");
  }
  window.base64Encode = function (e, n) {
    return base64.encode(e, !1, n);
  };
  (window.FILE_BATCH_SIZE = 2097144),
    (base64Encode.update = function (e, n) {
      ot.setFilename("base64.txt");
      var t = new ot.DownloadBuilder(),
        o = {
          update: function (e) {
            var r = new Uint8Array(e),
              a = base64Encode(r, n);
            return t.push(a), o;
          },
          hex: function () {
            return (
              ot.setDownload(t.finalize()),
              t.result.length <= 1
                ? t.result[0]
                : "The file is too large to display. " + ot.DOWNLOAD_MESSAGE
            );
          },
        };
      return o.update(e);
    }),
    (window.base64Decode = function (n) {
      return e(n), base64.decode.bytes(n);
    }),
    (window.download = function (n) {
      if (n) {
        var t = new ot.DownloadBuilder();
        return (
          e(n),
          t.push(base64.decode.uint8Array(n)),
          ot.setDownload(t.finalize()),
          ot.DOWNLOAD_MESSAGE
        );
      }
    }),
    (download.update = function (n) {
      var t = new TextDecoder(),
        o = new ot.DownloadBuilder(),
        r = "",
        a = {
          update: function (n) {
            var d = t.decode(n);
            e(d), (d = r + d.replace(/[\r\n]/g, ""));
            var i = d.length - (d.length % 4);
            return (
              (r = d.substring(i)),
              (d = d.substring(0, i)),
              o.push(base64.decode.uint8Array(d)),
              a
            );
          },
          hex: function () {
            return (
              r && o.push(base64.decode.uint8Array(r)),
              ot.setDownload(o.finalize()),
              ot.DOWNLOAD_MESSAGE
            );
          },
        };
      return a.update(n);
    }),
    $('option[data-load-encoding="base64"]').attr("disabled", !0).hide(),
    ot.refreshEncodingSelect && ot.refreshEncodingSelect();
})();
