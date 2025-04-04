!(function (t, n, e) {
  function r(t) {
    return "string" == typeof t || "number" == typeof t ? t : new Uint8Array(t);
  }
  function a(t) {
    for (var n = [], e = 0; e < t.length; ++e) n.push(r(t[e]));
    return n;
  }
  function u(t, n) {
    t.then(function (t) {
      t.update(r(n));
    });
    var e = {
      update: function (n) {
        return (
          t.then(function (t) {
            t.update(r(n));
          }),
          e
        );
      },
      hex: function () {
        return t.then(function (t) {
          return t.digest();
        });
      },
    };
    return e;
  }
  for (
    var c = [
        ["blake2b", "createBLAKE2b"],
        ["blake2s", "createBLAKE2s"],
        ["blake3", "createBLAKE3"],
        ["md5", "createMD5"],
      ],
      i = 0;
    i < c.length;
    ++i
  ) {
    var o = c[i][0],
      h = c[i][1];
    (t["hashwasm_" + o] = (function (t) {
      var n = function (n) {
          return u(
            hashwasm[t].apply(
              this,
              a(Array.prototype.slice.call(arguments, 1)),
            ),
            n,
          );
        },
        e = function () {
          return n.apply(this, arguments).hex();
        };
      return (e.update = n), e;
    })(h)).hmac = (function (t) {
      var n = function (n, e) {
          var c = hashwasm[t].apply(
            this,
            a(Array.prototype.slice.call(arguments, 2)),
          );
          return u(hashwasm.createHMAC(c, r(n)), e);
        },
        e = function () {
          return n.apply(this, arguments).hex();
        };
      return (e.update = n), e;
    })(h);
  }
})(window, document);
