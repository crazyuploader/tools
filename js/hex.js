!(function () {
  (window.hexEncode = function (e, t) {
    return ot.bytesToHex("string" == typeof e ? ot.utf8ToBytes(e) : e, t);
  }),
    (hexEncode.update = function (t, o) {
      ot.setFilename("hex.txt");
      var n = new ot.DownloadBuilder(),
        r = {
          update: function (t) {
            var d = new e(t);
            return n.push(ot.bytesToHex(d, o)), r;
          },
          hex: function () {
            return (
              ot.setDownload(n.finalize(!0)),
              n.result.length <= 1
                ? n.result[0]
                : "The file is too large to display. " + ot.DOWNLOAD_MESSAGE
            );
          },
        };
      return r.update(t);
    }),
    (window.hexDecode = function (e) {
      return ot.hexToBytes(e);
    });
  var e = window.Uint8Array;
  (window.download = function (t) {
    if (t) {
      var o = ot.hexToBytes(t, e),
        n = new ot.DownloadBuilder();
      return n.push(o), ot.setDownload(n.finalize()), ot.DOWNLOAD_MESSAGE;
    }
  }),
    (download.update = function (t) {
      var o = new TextDecoder(),
        n = new ot.DownloadBuilder(),
        r = {
          update: function (t) {
            var d = o.decode(t);
            return n.push(ot.hexToBytes(d, e)), r;
          },
          hex: function () {
            return ot.setDownload(n.finalize()), ot.DOWNLOAD_MESSAGE;
          },
        };
      return r.update(t);
    }),
    $('[data-toggle="encoding"] option[value="hex"]')
      .attr("disabled", !0)
      .hide(),
    ot.refreshEncodingSelect && ot.refreshEncodingSelect();
})();
