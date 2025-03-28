!(function () {
  function e() {
    window.base58 ||
      (window.base58 = base(
        "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",
      ));
  }
  function o(e) {
    if (e.length > n) throw new Error("File is too large. Limit is 20 KB");
  }
  var n = 20480;
  (window.base58Encode = function (n) {
    return (
      e(),
      (n = "string" == typeof n ? ot.utf8ToBytes(n) : n),
      o(n),
      base58.encode(n)
    );
  }),
    (window.base58EncodeFile = function (n) {
      e(), ot.setFilename("base58.txt");
      var t = new ot.DownloadBuilder(),
        i = new Uint8Array(n);
      return (
        o(i),
        t.push(base58.encode(i)),
        ot.setDownload(t.finalize()),
        t.result[0]
      );
    }),
    (window.base58Decode = function (o) {
      return e(), base58.decode(o);
    }),
    (window.download = function (o) {
      if ((e(), "string" != typeof o)) {
        o = new TextDecoder().decode(o);
      }
      var n = base58.decode(o),
        t = new ot.DownloadBuilder();
      return t.push(n), ot.setDownload(t.finalize()), ot.DOWNLOAD_MESSAGE;
    });
})();
