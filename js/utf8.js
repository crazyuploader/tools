!(function () {
  function r(r) {
    var o,
      t = [],
      e = r.length,
      n = 0;
    for (i = 0; i < e; ++i)
      (o = r.charCodeAt(i)),
        o < 128
          ? (t[n++] = o)
          : o < 2048
            ? ((t[n++] = 192 | (o >>> 6)), (t[n++] = 128 | (63 & o)))
            : o < 55296 || o >= 57344
              ? ((t[n++] = 224 | (o >>> 12)),
                (t[n++] = 128 | ((o >>> 6) & 63)),
                (t[n++] = 128 | (63 & o)))
              : ((o =
                  65536 + (((1023 & o) << 10) | (1023 & r.charCodeAt(++i)))),
                (t[n++] = 240 | (o >>> 18)),
                (t[n++] = 128 | ((o >>> 12) & 63)),
                (t[n++] = 128 | ((o >>> 6) & 63)),
                (t[n++] = 128 | (63 & o)));
    return t;
  }
  function o(r) {
    for (var o, e, i = [], n = 0, f = r.length, h = 0; n < f; )
      if ((o = r[n++]) <= 127) i.push(String.fromCharCode(o));
      else {
        if (o > 191 && o <= 223) (e = 31 & o), (h = 1);
        else if (o <= 239) (e = 15 & o), (h = 2);
        else {
          if (!(o <= 247)) throw new Error(t);
          (e = 7 & o), (h = 3);
        }
        for (var a = 0; a < h; ++a) {
          if ((o = r[n++]) < 128 || o > 191) throw new Error(t);
          (e <<= 6), (e += 63 & o);
        }
        if (e >= 55296 && e <= 57343) throw new Error(t);
        if (e > 1114111) throw new Error(t);
        e <= 65535
          ? i.push(String.fromCharCode(e))
          : ((e -= 65536),
            i.push(
              String.fromCharCode(55296 + (e >> 10)),
              String.fromCharCode(56320 + (1023 & e)),
            ));
      }
    return i.join("");
  }
  var t = "not a UTF-8 string";
  (ot.utf8ToBytes = r), (ot.bytesToUtf8 = o);
})();
