!(function () {
  window.base32Encode = function (e) {
    return base32.encode(e);
  };
  (window.FILE_BATCH_SIZE = 2097120),
    (base32Encode.update = function (e) {
      ot.setFilename("base32.txt");
      var n = new ot.DownloadBuilder(),
        o = {
          update: function (e) {
            var t = new Uint8Array(e);
            return n.push(base32Encode(t)), o;
          },
          hex: function () {
            return (
              ot.setDownload(n.finalize()),
              n.result.length <= 1
                ? n.result[0]
                : "The file is too large to display. " + ot.DOWNLOAD_MESSAGE
            );
          },
        };
      return o.update(e);
    }),
    (window.download = function (e) {
      if (e) {
        var n = base32.decode.asBytes(e),
          o = new ot.DownloadBuilder();
        return o.push(n), ot.setDownload(o.finalize()), ot.DOWNLOAD_MESSAGE;
      }
    }),
    (download.update = function (e) {
      var n = new TextDecoder(),
        o = new ot.DownloadBuilder(),
        t = {
          update: function (e) {
            var a = n.decode(e);
            return o.push(base32.decode.asBytes(a)), t;
          },
          hex: function () {
            return ot.setDownload(o.finalize()), ot.DOWNLOAD_MESSAGE;
          },
        };
      return t.update(e);
    });
})();
