!(function (e, r) {
  if (typeof exports === 'object' && typeof module === 'object') {
    module.exports = r(
      require('window-or-global'),
      require('react'),
      require('react-progressive-image'),
      require('browser-image-size'),
      require('prop-types'),
    )
  } else if (typeof define === 'function' && define.amd) {
    define(
      ['window-or-global', 'react', 'react-progressive-image', 'browser-image-size', 'prop-types'],
      r,
    )
  } else {
    const t =
      typeof exports === 'object'
        ? r(
          require('window-or-global'),
          require('react'),
          require('react-progressive-image'),
          require('browser-image-size'),
          require('prop-types'),
        )
        : r(
          e['window-or-global'],
          e.react,
          e['react-progressive-image'],
          e['browser-image-size'],
          e['prop-types'],
        )
    for (const o in t) (typeof exports === 'object' ? exports : e)[o] = t[o]
  }
}(this, (e, r, t, o, n) => {
  return (function (e) {
    function r(o) {
      if (t[o]) return t[o].exports
      const n = (t[o] = { i: o, l: !1, exports: {} })
      return e[o].call(n.exports, n, n.exports, r), (n.l = !0), n.exports
    }
    var t = {}
    return (
      (r.m = e),
      (r.c = t),
      (r.d = function (e, t, o) {
        r.o(e, t) || Object.defineProperty(e, t, { configurable: !1, enumerable: !0, get: o })
      }),
      (r.n = function (e) {
        const t =
          e && e.__esModule
            ? function () {
              return e.default
            }
            : function () {
              return e
            }
        return r.d(t, 'a', t), t
      }),
      (r.o = function (e, r) {
        return Object.prototype.hasOwnProperty.call(e, r)
      }),
      (r.p = '/'),
      r((r.s = 2))
    )
  }([
    function (r, t) {
      r.exports = e
    },
    function (e, r, t) {
      function o(e, r, t) {
        function o(e) {
          return t[e]
        }
        function n(e, r) {
          return void 0 !== e ? r[e.mode] : null
        }
        function s(e, r, t) {
          return o(n(e, r)) || t
        }
        function c(r, t, o) {
          return r ? t[o]() : e.pass(t)
        }
        function u(r, o, n) {
          return void 0 !== r && Object.keys(r).length > 0
            ? o[n](r.width, r.height, s(r, a, t.HORIZONTAL_ALIGN_CENTER))
            : e.pass(e)
        }
        function p(r, t, o) {
          return void 0 !== r ? t[o](r) : e.pass(t)
        }
        let l = r.resize,
          f = r.quality,
          m = r.greyscale,
          d = r.contain,
          g = r.cover,
          h = r.normalize,
          b = r.invert,
          _ = r.opaque,
          y = r.sepia,
          v = r.dither565,
          I = r.scale,
          w = r.scaleToFit,
          O = r.flip,
          E = r.rotate,
          T = r.brightness,
          z = r.contrast,
          S = r.fade,
          R = r.opacity,
          k = r.blur,
          x = r.posterize,
          W = t.AUTO,
          j = function (e, r) {
            return void 0 !== e ? e : r
          }
        return (
          (e.__proto__.pass = function (e) {
            return e
          }),
          (e.__proto__.resizeAnImage = function (e, r) {
            return void 0 !== r && Object.keys(r).length > 0
              ? e.resize(j(r.width, W), j(r.height, W), s(r, i, t.RESIZE_BILINEAR))
              : e.pass(e)
          }),
          (e.__proto__.changeImageQuality = function (e, r) {
            return p(r, e, 'quality')
          }),
          (e.__proto__.applyGreyscale = function (e, r) {
            return c(r, e, 'greyscale')
          }),
          (e.__proto__.normalizeImage = function (e, r) {
            return c(r, e, 'normalize')
          }),
          (e.__proto__.invertImage = function (e, r) {
            return c(r, e, 'invert')
          }),
          (e.__proto__.opaqueImage = function (e, r) {
            return c(r, e, 'opaque')
          }),
          (e.__proto__.sepiaFilter = function (e, r) {
            return c(r, e, 'sepia')
          }),
          (e.__proto__.ditherFilter = function (e, r) {
            return c(r, e, 'dither565')
          }),
          (e.__proto__.scaleImage = function (e, r) {
            return p(r, e, 'scale')
          }),
          (e.__proto__.scaleToFitImage = function (e, r) {
            return void 0 !== r ? e.scaleToFit(j(r.width, W), j(r.height, W)) : e.pass(e)
          }),
          (e.__proto__.flipImage = function (e, r) {
            return void 0 !== r ? e.flip(j(r.horizontal, !1), j(r.vertical, !1)) : e.pass(e)
          }),
          (e.__proto__.rotateImage = function (e, r) {
            return void 0 !== r ? e.rotate(j(r.degree, 0), s(r, i, !1)) : e.pass(e)
          }),
          (e.__proto__.changeBrightness = function (e, r) {
            return p(r, e, 'brightness')
          }),
          (e.__proto__.changeContrast = function (e, r) {
            return p(r, e, 'contrast')
          }),
          (e.__proto__.fadeImage = function (e, r) {
            return p(r, e, 'fade')
          }),
          (e.__proto__.changeOpacity = function (e, r) {
            return p(r, e, 'opacity')
          }),
          (e.__proto__.blurImage = function (e, r) {
            return p(r, e, 'blur')
          }),
          (e.__proto__.posterizeImage = function (e, r) {
            return p(r, e, 'posterize')
          }),
          (e.__proto__.containImage = function (e, r) {
            return u(r, e, 'contain')
          }),
          (e.__proto__.coverImage = function (e, r) {
            return u(r, e, 'cover')
          }),
          e
            .clone()
            .resizeAnImage(e, l)
            .changeImageQuality(e, f)
            .applyGreyscale(e, m)
            .normalizeImage(e, h)
            .invertImage(e, b)
            .opaqueImage(e, _)
            .sepiaFilter(e, y)
            .ditherFilter(e, v)
            .scaleImage(e, I)
            .scaleToFitImage(e, w)
            .flipImage(e, O)
            .rotateImage(e, E)
            .changeBrightness(e, T)
            .changeContrast(e, z)
            .fadeImage(e, S)
            .changeOpacity(e, R)
            .blurImage(e, k)
            .posterizeImage(e, x)
            .coverImage(e, g)
            .color((function (e) {
              const r = []
              return void 0 !== e.colors
                ? (Object.keys(e.colors).forEach((t) => {
                  if (['mix', 'xor'].includes(t)) {
                    const o = { apply: t, params: [e.colors[t].color, e.colors[t].amount] }
                    r.push(o)
                  }
                  const n = { apply: t, params: [e.colors[t]] }
                  r.push(n)
                }),
                  r)
                : []
            }(r)))
            .containImage(e, d)
        )
      }
      var n = t(8),
        a = n.ALIGN_MODES,
        i = n.RESIZE_MODES
      e.exports = o
    },
    function (e, r, t) {
      function o(e, r) {
        const t = {}
        for (const o in e) {
          r.indexOf(o) >= 0 || (Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]))
        }
        return t
      }
      function n(e, r) {
        if (!(e instanceof r)) throw new TypeError('Cannot call a class as a function')
      }
      function a(e, r) {
        if (!e) {
          throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called')
        }
        return !r || (typeof r !== 'object' && typeof r !== 'function') ? e : r
      }
      function i(e, r) {
        if (typeof r !== 'function' && r !== null) {
          throw new TypeError(`Super expression must either be null or a function, not ${typeof r}`)
        }
        (e.prototype = Object.create(r && r.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0,
          },
        })),
        r && (Object.setPrototypeOf ? Object.setPrototypeOf(e, r) : (e.__proto__ = r))
      }
      Object.defineProperty(r, '__esModule', { value: !0 })
      let s = t(3),
        c = t.n(s),
        u = t(4),
        p = t.n(u),
        l = t(5),
        f = t.n(l),
        m = t(6),
        d = t.n(m),
        g = t(0),
        h = t.n(g),
        b = function (e) {
          return {
            resize: e.resize,
            quality: e.quality,
            greyscale: e.greyscale,
            contain: e.contain,
            cover: e.cover,
            normalize: e.normalize,
            invert: e.invert,
            opaque: e.opaque,
            sepia: e.sepia,
            dither565: e.dither565,
            scale: e.scale,
            scaleToFit: e.scaleToFit,
            flip: e.flip,
            rotate: e.rotate,
            brightness: e.brightness,
            contrast: e.contrast,
            fade: e.fade,
            opacity: e.opacity,
            blur: e.blur,
            posterize: e.posterize,
            colors: e.colors,
          }
        },
        _ = function (e) {
          e.image,
          e.resize,
          e.quality,
          e.greyscale,
          e.contain,
          e.cover,
          e.normalize,
          e.invert,
          e.opaque,
          e.sepia,
          e.dither565,
          e.scale,
          e.scaleToFit,
          e.flip,
          e.rotate,
          e.brightness,
          e.contrast,
          e.fade,
          e.opacity,
          e.blur,
          e.posterize,
          e.colors,
          e.placeholder,
          e.processedImage,
          e.storage,
          e.disableWebWorker,
          e.disableRerender,
          e.customCdn
          return o(e, [
            'image',
            'resize',
            'quality',
            'greyscale',
            'contain',
            'cover',
            'normalize',
            'invert',
            'opaque',
            'sepia',
            'dither565',
            'scale',
            'scaleToFit',
            'flip',
            'rotate',
            'brightness',
            'contrast',
            'fade',
            'opacity',
            'blur',
            'posterize',
            'colors',
            'placeholder',
            'processedImage',
            'storage',
            'disableWebWorker',
            'disableRerender',
            'customCdn',
          ])
        },
        y = function (e, r, t) {
          return void 0 !== e.resize
            ? e.resize[t]
            : void 0 !== e.contain
              ? e.contain[t]
              : void 0 !== e.cover
                ? e.cover[t]
                : void 0 !== e.scaleToFit
                  ? e.scaleToFit[t]
                  : void 0 !== e.style ? e.style[t] : void 0 !== e[t] ? parseInt(e[t], 10) : r
        },
        v = y,
        I =
          'Browser build for Jimp not found. Place this in your index.html file and restart the server - \n<script src="https://cdn.rawgit.com/oliver-moran/jimp/v0.2.27/browser/lib/jimp.min.js"></script>\n',
        w =
          'For better performance, set disableWebWorker to false. This will keep your UI responsive as the image will be processed in a web worker.',
        O = function (e, r, t) {
          return t !== null ? t.setItem(e, r) : null
        },
        E = function (e, r) {
          return r !== null ? r.getItem(e) : null
        },
        T = function (e, r) {
          return r !== null ? r.removeItem(e) : null
        },
        z = void 0 !== h.a.Jimp && typeof h.a.Jimp === 'function' ? h.a.Jimp : void 0,
        S = z,
        R = t(7),
        k = t.n(R),
        x = k.a.shape({ width: k.a.number, height: k.a.number, mode: k.a.string }),
        W = k.a.shape({ width: k.a.number, height: k.a.number, mode: k.a.string }),
        j = k.a.shape({ width: k.a.number, height: k.a.number, mode: k.a.string }),
        q = k.a.shape({ width: k.a.number, height: k.a.number }),
        L = k.a.shape({ horizontal: k.a.bool, vertical: k.a.bool }),
        A = k.a.shape({ degree: k.a.number, mode: k.a.string }),
        N = k.a.shape({ color: k.a.string, amount: k.a.number }),
        P = k.a.shape({ color: k.a.string, amount: k.a.number }),
        M = k.a.shape({
          lighten: k.a.number,
          brighten: k.a.number,
          darken: k.a.number,
          desaturate: k.a.number,
          saturate: k.a.number,
          greyscale: k.a.number,
          spin: k.a.number,
          mix: N,
          tint: k.a.number,
          shade: k.a.number,
          xor: P,
          red: k.a.number,
          green: k.a.number,
          blue: k.a.number,
        }),
        F = {
          blur: k.a.number,
          brightness: k.a.number,
          contain: W,
          cover: j,
          contrast: k.a.number,
          colors: M,
          dither565: k.a.bool,
          flip: L,
          fade: k.a.number,
          greyscale: k.a.bool,
          invert: k.a.bool,
          image: k.a.any.isRequired,
          normalize: k.a.bool,
          opacity: k.a.number,
          posterize: k.a.number,
          processedImage: k.a.func,
          opaque: k.a.bool,
          quality: k.a.number,
          rotate: A,
          resize: x,
          sepia: k.a.bool,
          scale: k.a.number,
          scaleToFit: q,
          disableRerender: k.a.bool,
          customCdn: k.a.string,
        },
        C = F,
        U = (function () {
          function e(e, r) {
            for (let t = 0; t < r.length; t++) {
              const o = r[t];
              (o.enumerable = o.enumerable || !1),
              (o.configurable = !0),
              'value' in o && (o.writable = !0),
              Object.defineProperty(e, o.key, o)
            }
          }
          return function (r, t, o) {
            return t && e(r.prototype, t), o && e(r, o), r
          }
        }()),
        B = t(1),
        G = (function (e) {
          function r() {
            let e,
              t,
              o,
              i
            n(this, r)
            for (var s = arguments.length, u = Array(s), l = 0; l < s; l++) u[l] = arguments[l]
            return (
              (t = o = a(
                this,
                (e = r.__proto__ || Object.getPrototypeOf(r)).call.apply(e, [this].concat(u)),
              )),
              (o.state = {
                src: '',
                err: '',
                height: null,
                width: null,
              }),
              (o.componentWillMount = function () {
                o.checkStorageSupport(),
                typeof Worker === 'undefined' ||
                    o.props.disableWebWorker ||
                    ((o.worker = d()(9)), o.sendPropsToWorker(o.props, o.worker))
              }),
              (o.componentDidMount = function () {
                o.getOriginalImageSize(o.props),
                o.processInMainThreadOrInWebWorker(o.worker, o.props, o.myStorage)
              }),
              (o.componentDidUpdate = function () {
                o.props.image &&
                  !o.props.disableRerender &&
                  (typeof Worker === 'undefined' || o.props.disableWebWorker
                    ? o.processInMainThread(o.props)
                    : o.sendPropsToWorker(o.props, o.worker))
              }),
              (o.componentWillUnmount = function () {
                o.worker !== null && o.worker.terminate(), T('placeholder', o.myStorage)
              }),
              (o.checkStorageSupport = function () {
                return typeof Storage !== 'undefined' && o.props.storage
                  ? (o.myStorage = h.a.localStorage)
                  : o.props.storage || typeof Storage === 'undefined'
                    ? (o.myStorage = null)
                    : (o.clearStorage(), (o.myStorage = null))
              }),
              (o.passPropsToParent = function (e, r, t) {
                return void 0 !== e.processedImage ? e.processedImage(r, t) : null
              }),
              (o.processInMainThreadOrInWebWorker = function (e, r, t) {
                return typeof Worker === 'undefined' || r.disableWebWorker
                  ? void 0 !== S && r.disableWebWorker
                    ? (console.info(w), o.processInMainThread(r))
                    : console.error(I)
                  : o.processInWebWorker(e, r, t)
              }),
              (o.clearStorage = function () {
                return h.a.localStorage.removeItem('placeholder')
              }),
              (o.getOriginalImageSize = function (e) {
                f()(e.image).then((e) => {
                  return o.setState({ height: e.height, width: e.width })
                })
              }),
              (o.getDefaultImageSize = function (e) {
                let r = o.state,
                  t = r.height,
                  n = r.width
                return { height: v(e, t, 'height'), width: v(e, n, 'width') }
              }),
              (o.myStorage = null),
              (o.processInMainThread = function (e) {
                S.read(e.image).then((r) => {
                  B(r, e, S).getBase64(S.AUTO, (r, t) => {
                    (o.state.src === t && o.state.err === r) ||
                      (o.setState({ src: t, err: r }), o.passPropsToParent(e, t, r))
                  })
                })
              }),
              (o.processInWebWorker = function (e, r, t) {
                e !== null &&
                  (e.onmessage = function (e) {
                    (e.data.src === o.state.src && e.data.err === o.state.err) ||
                      (o.setState({ src: e.data.src, err: e.data.err }),
                        O('placeholder', e.data.src, t),
                        o.passPropsToParent(r, e.data.src, e.data.err))
                  })
              }),
              (o.sendPropsToWorker = function (e, r) {
                r !== null && r.postMessage({ props: b(e), image: e.image })
              }),
              (o.worker = null),
              (o.processedImage = function (e, r, t) {
                return c.a.createElement('img', Object.assign({ src: e }, r, { style: t }))
              }),
              (o.placeholderImage = function (e) {
                return E('placeholder', o.myStorage) === null ? e : E('placeholder', o.myStorage)
              }),
              (o.showImage = function (e, r, t) {
                return c.a.createElement(
                  p.a,
                  { src: e, placeholder: o.placeholderImage(r.image) },
                  (e) => {
                    return o.processedImage(e, t, o.getDefaultImageSize(r))
                  },
                )
              }),
              (i = t),
              a(o, i)
            )
          }
          return (
            i(r, e),
            U(r, [
              {
                key: 'render',
                value() {
                  let e = this.state.src,
                    r = _(this.props)
                  return this.showImage(e, this.props, r)
                },
              },
            ]),
            r
          )
        }(s.Component));
      (G.propTypes = C),
      (G.defaultProps = {
        storage: !0,
        greyscale: !1,
        normalize: !1,
        invert: !1,
        opaque: !1,
        sepia: !1,
        dither565: !1,
        disableWebWorker: !1,
      })
      const Z = G
      r.default = Z
    },
    function (e, t) {
      e.exports = r
    },
    function (e, r) {
      e.exports = t
    },
    function (e, r) {
      e.exports = o
    },
    function (e, r, t) {
      function o(e) {
        function r(o) {
          if (t[o]) return t[o].exports
          const n = (t[o] = { i: o, l: !1, exports: {} })
          return e[o].call(n.exports, n, n.exports, r), (n.l = !0), n.exports
        }
        var t = {};
        (r.m = e),
        (r.c = t),
        (r.i = function (e) {
          return e
        }),
        (r.d = function (e, t, o) {
          r.o(e, t) || Object.defineProperty(e, t, { configurable: !1, enumerable: !0, get: o })
        }),
        (r.n = function (e) {
          const t =
              e && e.__esModule
                ? function () {
                  return e.default
                }
                : function () {
                  return e
                }
          return r.d(t, 'a', t), t
        }),
        (r.o = function (e, r) {
          return Object.prototype.hasOwnProperty.call(e, r)
        }),
        (r.p = '/'),
        (r.oe = function (e) {
          throw (console.error(e), e)
        })
        const o = r((r.s = ENTRY_MODULE))
        return o.default || o
      }
      function n(e) {
        return `${e}`.replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&')
      }
      function a(e) {
        let r = [],
          t = e.toString(),
          o = t.match(/^function\s?\(\w+,\s*\w+,\s*(\w+)\)/)
        if (!o) return r
        for (
          var a,
            i = o[1],
            s = new RegExp(
              `(\\\\n|\\W)${n(i)}\\((/\\*.*?\\*/)?s?.*?([\\.|\\-|\\w|/|@]+).*?\\)`,
              'g',
            );
          (a = s.exec(t));

        ) {
          r.push(a[3])
        }
        return r
      }
      function i(e, r) {
        for (var t = [r], o = [], n = {}; t.length;) {
          const i = t.pop()
          if (!n[i] && e[i]) {
            (n[i] = !0), o.push(i)
            const s = a(e[i])
            t = t.concat(s)
          }
        }
        return o
      }
      e.exports = function (e, r) {
        r = r || {}
        let n = t.m,
          a = r.all ? Object.keys(n) : i(n, e),
          s = `(${o.toString().replace('ENTRY_MODULE', JSON.stringify(e))})({${a
            .map((e) => {
              return `${JSON.stringify(e)}: ${n[e].toString()}`
            })
            .join(',')}})(self);`,
          c = new window.Blob([s], { type: 'text/javascript' })
        if (r.bare) return c
        let u = window.URL || window.webkitURL || window.mozURL || window.msURL,
          p = u.createObjectURL(c),
          l = new window.Worker(p)
        return (l.objectURL = p), l
      }
    },
    function (e, r) {
      e.exports = n
    },
    function (e, r) {
      let t = {
          neighbor: 'RESIZE_NEAREST_NEIGHBOR',
          bilinear: 'RESIZE_BILINEAR',
          bicubic: 'RESIZE_BICUBIC',
          hermite: 'RESIZE_HERMITE',
          bezier: 'RESIZE_BEZIER',
        },
        o = {
          horizontal_left: 'HORIZONTAL_ALIGN_LEFT',
          horizontal_center: 'HORIZONTAL_ALIGN_CENTER',
          horizontal_right: 'HORIZONTAL_ALIGN_RIGHT',
          vertical_top: 'VERTICAL_ALIGN_TOP',
          vertical_middle: 'VERTICAL_ALIGN_MIDDLE',
          vertical_bottom: 'VERTICAL_ALIGN_BOTTOM',
        }
      e.exports = { ALIGN_MODES: o, RESIZE_MODES: t }
    },
    function (e, r, t) {
      const o = t(1)
      e.exports = function (e) {
        e.onmessage = function (r) {
          try {
            Jimp
          } catch (e) {
            let t = r.data.customCdn,
              n =
                t ||
                'https://cdn.rawgit.com/nitin42/5fef1095f281aa0cdf36ad6e5c460c9a/raw/359af525cb063ac002ebcf39274fb6c7d12e2f3e/jimp.min.js'
            importScripts(n)
          }
          Jimp.read(r.data.image).then((t) => {
            o(t, r.data.props, Jimp).getBase64(Jimp.AUTO, (r, t) => {
              e.postMessage({ src: t, err: r })
            })
          })
        }
      }
    },
  ]))
}))
