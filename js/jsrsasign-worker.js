function generateKeys(e, s, a, r, t) {
  var n,
    i,
    K = e.prvKeyObj,
    p = e.pubKeyObj;
  return (
    "PKCS1" === s ? (r = !1) : "PKCS5" === s ? (r = !0) : (a = void 0),
    (i = r ? KEYUTIL.getPEM(K, s + "PRV", t, a) : KEYUTIL.getPEM(K, s + "PRV")),
    (n = KEYUTIL.getPEM(p, "PKCS8PUB")),
    [i, n]
  );
}
(window = self),
  importScripts("jsrsasign-all-min.min.js"),
  (onmessage = function (e) {
    var s = e.data,
      a = KEYUTIL.generateKeypair("RSA", s.bits),
      r = generateKeys(
        a,
        s.format,
        s.cipher,
        s.passphraseEnabled,
        s.passphrase,
      );
    postMessage(r), close();
  });
