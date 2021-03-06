"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (t) {
  "use strict";

  "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? module.exports = t(require("jquery")) : t(jQuery);
}(function (t) {
  "use strict";

  var e = "animsition",
      i = {
    init: function init(n) {
      n = t.extend({
        inClass: "fade-in",
        outClass: "fade-out",
        inDuration: 1500,
        outDuration: 800,
        linkElement: ".animsition-link",
        loading: !0,
        loadingParentElement: "body",
        loadingClass: "animsition-loading",
        loadingInner: "",
        timeout: !1,
        timeoutCountdown: 5e3,
        onLoadEvent: !0,
        browser: ["animation-duration", "-webkit-animation-duration"],
        overlay: !1,
        overlayClass: "animsition-overlay-slide",
        overlayParentElement: "body",
        transition: function transition(t) {
          window.location.href = t;
        }
      }, n), i.settings = {
        timer: !1,
        data: {
          inClass: "animsition-in-class",
          inDuration: "animsition-in-duration",
          outClass: "animsition-out-class",
          outDuration: "animsition-out-duration",
          overlay: "animsition-overlay"
        },
        events: {
          inStart: "animsition.inStart",
          inEnd: "animsition.inEnd",
          outStart: "animsition.outStart",
          outEnd: "animsition.outEnd"
        }
      };
      var o = i.supportCheck.call(this, n);
      return o || !(n.browser.length > 0) || o && this.length ? (i.optionCheck.call(this, n) && t("." + n.overlayClass).length <= 0 && i.addOverlay.call(this, n), n.loading && t("." + n.loadingClass).length <= 0 && i.addLoading.call(this, n), this.each(function () {
        var o = this,
            s = t(this),
            r = t(window),
            a = t(document);
        s.data(e) || (n = t.extend({}, n), s.data(e, {
          options: n
        }), n.timeout && i.addTimer.call(o), n.onLoadEvent && r.on("load." + e, function () {
          i.settings.timer && clearTimeout(i.settings.timer), i["in"].call(o);
        }), r.on("pageshow." + e, function (t) {
          t.originalEvent.persisted && i["in"].call(o);
        }), r.on("unload." + e, function () {}), a.on("click." + e, n.linkElement, function (e) {
          e.preventDefault();
          var n = t(this),
              s = n.attr("href");
          2 === e.which || e.metaKey || e.shiftKey || -1 !== navigator.platform.toUpperCase().indexOf("WIN") && e.ctrlKey ? window.open(s, "_blank") : i.out.call(o, n, s);
        }));
      })) : ("console" in window || (window.console = {}, window.console.log = function (t) {
        return t;
      }), this.length || console.log("Animsition: Element does not exist on page."), o || console.log("Animsition: Does not support this browser."), i.destroy.call(this));
    },
    addOverlay: function addOverlay(e) {
      t(e.overlayParentElement).prepend('<div class="' + e.overlayClass + '"></div>');
    },
    addLoading: function addLoading(e) {
      t(e.loadingParentElement).append('<div class="' + e.loadingClass + '">' + e.loadingInner + "</div>");
    },
    removeLoading: function removeLoading() {
      var i = t(this).data(e).options;
      t(i.loadingParentElement).children("." + i.loadingClass).fadeOut().remove();
    },
    addTimer: function addTimer() {
      var n = this,
          o = t(this).data(e).options;
      i.settings.timer = setTimeout(function () {
        i["in"].call(n), t(window).off("load." + e);
      }, o.timeoutCountdown);
    },
    supportCheck: function supportCheck(e) {
      var i = t(this),
          n = e.browser,
          o = n.length,
          s = !1;
      0 === o && (s = !0);

      for (var r = 0; o > r; r++) {
        if ("string" == typeof i.css(n[r])) {
          s = !0;
          break;
        }
      }

      return s;
    },
    optionCheck: function optionCheck(e) {
      var n = t(this);
      return !(!e.overlay && !n.data(i.settings.data.overlay));
    },
    animationCheck: function animationCheck(i, n, o) {
      var s = t(this).data(e).options,
          r = _typeof(i),
          a = !n && "number" === r,
          l = n && "string" === r && i.length > 0;

      return a || l ? i = i : n && o ? i = s.inClass : !n && o ? i = s.inDuration : n && !o ? i = s.outClass : n || o || (i = s.outDuration), i;
    },
    "in": function _in() {
      var n = this,
          o = t(this),
          s = o.data(e).options,
          r = o.data(i.settings.data.inDuration),
          a = o.data(i.settings.data.inClass),
          l = i.animationCheck.call(n, r, !1, !0),
          c = i.animationCheck.call(n, a, !0, !0),
          u = i.optionCheck.call(n, s),
          p = o.data(e).outClass;
      s.loading && i.removeLoading.call(n), p && o.removeClass(p), u ? i.inOverlay.call(n, c, l) : i.inDefault.call(n, c, l);
    },
    inDefault: function inDefault(e, n) {
      var o = t(this);
      o.css({
        "animation-duration": n + "ms"
      }).addClass(e).trigger(i.settings.events.inStart).animateCallback(function () {
        o.removeClass(e).css({
          opacity: 1
        }).trigger(i.settings.events.inEnd);
      });
    },
    inOverlay: function inOverlay(n, o) {
      var s = t(this),
          r = s.data(e).options;
      s.css({
        opacity: 1
      }).trigger(i.settings.events.inStart), t(r.overlayParentElement).children("." + r.overlayClass).css({
        "animation-duration": o + "ms"
      }).addClass(n).animateCallback(function () {
        s.trigger(i.settings.events.inEnd);
      });
    },
    out: function out(n, o) {
      var s = this,
          r = t(this),
          a = r.data(e).options,
          l = n.data(i.settings.data.outClass),
          c = r.data(i.settings.data.outClass),
          u = n.data(i.settings.data.outDuration),
          p = r.data(i.settings.data.outDuration),
          d = l || c,
          m = u || p,
          f = i.animationCheck.call(s, d, !0, !1),
          h = i.animationCheck.call(s, m, !1, !1),
          g = i.optionCheck.call(s, a);
      r.data(e).outClass = f, g ? i.outOverlay.call(s, f, h, o) : i.outDefault.call(s, f, h, o);
    },
    outDefault: function outDefault(n, o, s) {
      var r = t(this),
          a = r.data(e).options;
      r.css({
        "animation-duration": o + 1 + "ms"
      }).addClass(n).trigger(i.settings.events.outStart).animateCallback(function () {
        r.trigger(i.settings.events.outEnd), a.transition(s);
      });
    },
    outOverlay: function outOverlay(n, o, s) {
      var r = t(this),
          a = r.data(e).options,
          l = r.data(i.settings.data.inClass),
          c = i.animationCheck.call(this, l, !0, !0);
      t(a.overlayParentElement).children("." + a.overlayClass).css({
        "animation-duration": o + 1 + "ms"
      }).removeClass(c).addClass(n).trigger(i.settings.events.outStart).animateCallback(function () {
        r.trigger(i.settings.events.outEnd), a.transition(s);
      });
    },
    destroy: function destroy() {
      return this.each(function () {
        var i = t(this);
        t(window).off("." + e), i.css({
          opacity: 1
        }).removeData(e);
      });
    }
  };
  t.fn.animateCallback = function (e) {
    var i = "animationend webkitAnimationEnd";
    return this.each(function () {
      var n = t(this);
      n.on(i, function () {
        return n.off(i), e.call(this);
      });
    });
  }, t.fn.animsition = function (n) {
    return i[n] ? i[n].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != _typeof(n) && n ? void t.error("Method " + n + " does not exist on jQuery." + e) : i.init.apply(this, arguments);
  };
}), function () {
  var t,
      e,
      i,
      n = {
    frameRate: 150,
    animationTime: 400,
    stepSize: 80,
    pulseAlgorithm: !0,
    pulseScale: 4,
    pulseNormalize: 1,
    accelerationDelta: 50,
    accelerationMax: 3,
    keyboardSupport: !0,
    arrowScroll: 50,
    touchpadSupport: !1,
    fixedBackground: !0,
    excluded: ""
  },
      o = n,
      s = !1,
      r = !1,
      a = {
    x: 0,
    y: 0
  },
      l = !1,
      c = document.documentElement,
      u = [],
      p = /^Mac/.test(navigator.platform),
      d = {
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    spacebar: 32,
    pageup: 33,
    pagedown: 34,
    end: 35,
    home: 36
  },
      m = {
    37: 1,
    38: 1,
    39: 1,
    40: 1
  };

  function f() {
    if (!l && document.body) {
      l = !0;
      var n = document.body,
          a = document.documentElement,
          u = window.innerHeight,
          p = n.scrollHeight;
      if (c = document.compatMode.indexOf("CSS") >= 0 ? a : n, t = n, o.keyboardSupport && z("keydown", b), top != self) r = !0;else if (p > u && (n.offsetHeight <= u || a.offsetHeight <= u)) {
        var d,
            m = document.createElement("div");

        if (m.style.cssText = "position:absolute; z-index:-10000; top:0; left:0; right:0; height:" + c.scrollHeight + "px", document.body.appendChild(m), i = function i() {
          d || (d = setTimeout(function () {
            s || (m.style.height = "0", m.style.height = c.scrollHeight + "px", d = null);
          }, 500));
        }, setTimeout(i, 10), z("resize", i), (e = new L(i)).observe(n, {
          attributes: !0,
          childList: !0,
          characterData: !1
        }), c.offsetHeight <= u) {
          var f = document.createElement("div");
          f.style.clear = "both", n.appendChild(f);
        }
      }
      o.fixedBackground || s || (n.style.backgroundAttachment = "scroll", a.style.backgroundAttachment = "scroll");
    }
  }

  var h = [],
      g = !1,
      v = Date.now();

  function w(t, e, i) {
    var n, s;

    if (n = (n = e) > 0 ? 1 : -1, s = (s = i) > 0 ? 1 : -1, (a.x !== n || a.y !== s) && (a.x = n, a.y = s, h = [], v = 0), 1 != o.accelerationMax) {
      var r = Date.now() - v;

      if (r < o.accelerationDelta) {
        var l = (1 + 50 / r) / 2;
        l > 1 && (l = Math.min(l, o.accelerationMax), e *= l, i *= l);
      }

      v = Date.now();
    }

    if (h.push({
      x: e,
      y: i,
      lastX: e < 0 ? .99 : -.99,
      lastY: i < 0 ? .99 : -.99,
      start: Date.now()
    }), !g) {
      var c = t === document.body,
          u = function u(n) {
        for (var s = Date.now(), r = 0, a = 0, l = 0; l < h.length; l++) {
          var p = h[l],
              d = s - p.start,
              m = d >= o.animationTime,
              f = m ? 1 : d / o.animationTime;
          o.pulseAlgorithm && (f = N(f));
          var v = p.x * f - p.lastX >> 0,
              w = p.y * f - p.lastY >> 0;
          r += v, a += w, p.lastX += v, p.lastY += w, m && (h.splice(l, 1), l--);
        }

        c ? window.scrollBy(r, a) : (r && (t.scrollLeft += r), a && (t.scrollTop += a)), e || i || (h = []), h.length ? B(u, t, 1e3 / o.frameRate + 1) : g = !1;
      };

      B(u, t, 0), g = !0;
    }
  }

  function y(e) {
    l || f();
    var i = e.target,
        n = E(i);
    if (!n || e.defaultPrevented || e.ctrlKey) return !0;
    if (H(t, "embed") || H(i, "embed") && /\.pdf/i.test(i.src) || H(t, "object") || i.shadowRoot) return !0;
    var s = -e.wheelDeltaX || e.deltaX || 0,
        r = -e.wheelDeltaY || e.deltaY || 0;
    if (p && (e.wheelDeltaX && D(e.wheelDeltaX, 120) && (s = e.wheelDeltaX / Math.abs(e.wheelDeltaX) * -120), e.wheelDeltaY && D(e.wheelDeltaY, 120) && (r = e.wheelDeltaY / Math.abs(e.wheelDeltaY) * -120)), s || r || (r = -e.wheelDelta || 0), 1 === e.deltaMode && (s *= 40, r *= 40), !o.touchpadSupport && function (t) {
      if (t) return u.length || (u = [t, t, t]), t = Math.abs(t), u.push(t), u.shift(), clearTimeout(S), S = setTimeout(function () {
        window.localStorage && (localStorage.SS_deltaBuffer = u.join(","));
      }, 1e3), !W(120) && !W(100);
    }(r)) return !0;
    Math.abs(s) > 1.2 && (s *= o.stepSize / 120), Math.abs(r) > 1.2 && (r *= o.stepSize / 120), w(n, s, r);
  }

  function b(e) {
    var i = e.target,
        n = e.ctrlKey || e.altKey || e.metaKey || e.shiftKey && e.keyCode !== d.spacebar;
    document.body.contains(t) || (t = document.activeElement);
    var s = /^(button|submit|radio|checkbox|file|color|image)$/i;
    if (e.defaultPrevented || /^(textarea|select|embed|object)$/i.test(i.nodeName) || H(i, "input") && !s.test(i.type) || H(t, "video") || function (t) {
      var e = t.target,
          i = !1;
      if (-1 != document.URL.indexOf("www.youtube.com/watch")) do {
        if (i = e.classList && e.classList.contains("html5-video-controls")) break;
      } while (e = e.parentNode);
      return i;
    }(e) || i.isContentEditable || n) return !0;
    if ((H(i, "button") || H(i, "input") && s.test(i.type)) && e.keyCode === d.spacebar) return !0;
    if (H(i, "input") && "radio" == i.type && m[e.keyCode]) return !0;
    var r = 0,
        a = 0,
        l = E(t),
        c = l.clientHeight;

    switch (l == document.body && (c = window.innerHeight), e.keyCode) {
      case d.up:
        a = -o.arrowScroll;
        break;

      case d.down:
        a = o.arrowScroll;
        break;

      case d.spacebar:
        a = -(e.shiftKey ? 1 : -1) * c * .9;
        break;

      case d.pageup:
        a = .9 * -c;
        break;

      case d.pagedown:
        a = .9 * c;
        break;

      case d.home:
        a = -l.scrollTop;
        break;

      case d.end:
        var u = l.scrollHeight - l.scrollTop - c;
        a = u > 0 ? u + 10 : 0;
        break;

      case d.left:
        r = -o.arrowScroll;
        break;

      case d.right:
        r = o.arrowScroll;
        break;

      default:
        return !0;
    }

    w(l, r, a), e.preventDefault(), clearTimeout(x), x = setInterval(function () {
      T = {};
    }, 1e3);
  }

  function C(e) {
    t = e.target;
  }

  var I,
      x,
      S,
      k = (I = 0, function (t) {
    return t.uniqueID || (t.uniqueID = I++);
  }),
      T = {};

  function P(t, e) {
    for (var i = t.length; i--;) {
      T[k(t[i])] = e;
    }

    return e;
  }

  function E(t) {
    var e = [],
        i = document.body,
        n = c.scrollHeight;

    do {
      var o = T[k(t)];
      if (o) return P(e, o);

      if (e.push(t), n === t.scrollHeight) {
        var s = M(c) && M(i) || O(c);
        if (r && A(c) || !r && s) return P(e, j());
      } else if (A(t) && O(t)) return P(e, t);
    } while (t = t.parentElement);
  }

  function A(t) {
    return t.clientHeight + 10 < t.scrollHeight;
  }

  function M(t) {
    return "hidden" !== getComputedStyle(t, "").getPropertyValue("overflow-y");
  }

  function O(t) {
    var e = getComputedStyle(t, "").getPropertyValue("overflow-y");
    return "scroll" === e || "auto" === e;
  }

  function z(t, e) {
    window.addEventListener(t, e, !1);
  }

  function _(t, e) {
    window.removeEventListener(t, e, !1);
  }

  function H(t, e) {
    return (t.nodeName || "").toLowerCase() === e.toLowerCase();
  }

  function D(t, e) {
    return Math.floor(t / e) == t / e;
  }

  function W(t) {
    return D(u[0], t) && D(u[1], t) && D(u[2], t);
  }

  window.localStorage && localStorage.SS_deltaBuffer && (u = localStorage.SS_deltaBuffer.split(","));

  var $,
      B = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (t, e, i) {
    window.setTimeout(t, i || 1e3 / 60);
  },
      L = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
      j = function j() {
    if (!$) {
      var t = document.createElement("div");
      t.style.cssText = "height:10000px;width:1px;", document.body.appendChild(t);
      var e = document.body.scrollTop;
      document.documentElement.scrollTop, window.scrollBy(0, 3), $ = document.body.scrollTop != e ? document.body : document.documentElement, window.scrollBy(0, -3), document.body.removeChild(t);
    }

    return $;
  };

  function F(t) {
    var e, i;
    return (t *= o.pulseScale) < 1 ? e = t - (1 - Math.exp(-t)) : (t -= 1, e = (i = Math.exp(-1)) + (1 - Math.exp(-t)) * (1 - i)), e * o.pulseNormalize;
  }

  function N(t) {
    return t >= 1 ? 1 : t <= 0 ? 0 : (1 == o.pulseNormalize && (o.pulseNormalize /= F(1)), F(t));
  }

  var q,
      R = window.navigator.userAgent,
      Q = /Edge/.test(R),
      X = /chrome/i.test(R) && !Q,
      V = /safari/i.test(R) && !Q,
      K = /mobile/i.test(R),
      Y = /Windows NT 6.1/i.test(R) && /rv:11/i.test(R),
      U = (X || V || Y) && !K;

  function Z(t) {
    for (var e in t) {
      n.hasOwnProperty(e) && (o[e] = t[e]);
    }
  }

  "onwheel" in document.createElement("div") ? q = "wheel" : "onmousewheel" in document.createElement("div") && (q = "mousewheel"), q && U && (z(q, y), z("mousedown", C), z("load", f)), Z.destroy = function () {
    e && e.disconnect(), _(q, y), _("mousedown", C), _("keydown", b), _("resize", i), _("load", f);
  }, window.SmoothScrollOptions && Z(window.SmoothScrollOptions), "function" == typeof define && define.amd ? define(function () {
    return Z;
  }) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? module.exports = Z : window.SmoothScroll = Z;
}(), "function" != typeof Object.create && (Object.create = function (t) {
  function e() {}

  return e.prototype = t, new e();
}), function (t, e, i) {
  var n = {
    init: function init(e, i) {
      this.$elem = t(i), this.options = t.extend({}, t.fn.owlCarousel.options, this.$elem.data(), e), this.userOptions = e, this.loadContent();
    },
    loadContent: function loadContent() {
      var e,
          i = this;
      "function" == typeof i.options.beforeInit && i.options.beforeInit.apply(this, [i.$elem]), "string" == typeof i.options.jsonPath ? (e = i.options.jsonPath, t.getJSON(e, function (t) {
        var e,
            n = "";
        if ("function" == typeof i.options.jsonSuccess) i.options.jsonSuccess.apply(this, [t]);else {
          for (e in t.owl) {
            t.owl.hasOwnProperty(e) && (n += t.owl[e].item);
          }

          i.$elem.html(n);
        }
        i.logIn();
      })) : i.logIn();
    },
    logIn: function logIn() {
      this.$elem.data("owl-originalStyles", this.$elem.attr("style")), this.$elem.data("owl-originalClasses", this.$elem.attr("class")), this.$elem.css({
        opacity: 0
      }), this.orignalItems = this.options.items, this.checkBrowser(), this.wrapperWidth = 0, this.checkVisible = null, this.setVars();
    },
    setVars: function setVars() {
      if (0 === this.$elem.children().length) return !1;
      this.baseClass(), this.eventTypes(), this.$userItems = this.$elem.children(), this.itemsAmount = this.$userItems.length, this.wrapItems(), this.$owlItems = this.$elem.find(".owl-item"), this.$owlWrapper = this.$elem.find(".owl-wrapper"), this.playDirection = "next", this.prevItem = 0, this.prevArr = [0], this.currentItem = 0, this.customEvents(), this.onStartup();
    },
    onStartup: function onStartup() {
      this.updateItems(), this.calculateAll(), this.buildControls(), this.updateControls(), this.response(), this.moveEvents(), this.stopOnHover(), this.owlStatus(), !1 !== this.options.transitionStyle && this.transitionTypes(this.options.transitionStyle), !0 === this.options.autoPlay && (this.options.autoPlay = 5e3), this.play(), this.$elem.find(".owl-wrapper").css("display", "block"), this.$elem.is(":visible") ? this.$elem.css("opacity", 1) : this.watchVisibility(), this.onstartup = !1, this.eachMoveUpdate(), "function" == typeof this.options.afterInit && this.options.afterInit.apply(this, [this.$elem]);
    },
    eachMoveUpdate: function eachMoveUpdate() {
      !0 === this.options.lazyLoad && this.lazyLoad(), !0 === this.options.autoHeight && this.autoHeight(), this.onVisibleItems(), "function" == typeof this.options.afterAction && this.options.afterAction.apply(this, [this.$elem]);
    },
    updateVars: function updateVars() {
      "function" == typeof this.options.beforeUpdate && this.options.beforeUpdate.apply(this, [this.$elem]), this.watchVisibility(), this.updateItems(), this.calculateAll(), this.updatePosition(), this.updateControls(), this.eachMoveUpdate(), "function" == typeof this.options.afterUpdate && this.options.afterUpdate.apply(this, [this.$elem]);
    },
    reload: function reload() {
      var t = this;
      e.setTimeout(function () {
        t.updateVars();
      }, 0);
    },
    watchVisibility: function watchVisibility() {
      var t = this;
      if (!1 !== t.$elem.is(":visible")) return !1;
      t.$elem.css({
        opacity: 0
      }), e.clearInterval(t.autoPlayInterval), e.clearInterval(t.checkVisible), t.checkVisible = e.setInterval(function () {
        t.$elem.is(":visible") && (t.reload(), t.$elem.animate({
          opacity: 1
        }, 200), e.clearInterval(t.checkVisible));
      }, 500);
    },
    wrapItems: function wrapItems() {
      this.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>'), this.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">'), this.wrapperOuter = this.$elem.find(".owl-wrapper-outer"), this.$elem.css("display", "block");
    },
    baseClass: function baseClass() {
      var t = this.$elem.hasClass(this.options.baseClass),
          e = this.$elem.hasClass(this.options.theme);
      t || this.$elem.addClass(this.options.baseClass), e || this.$elem.addClass(this.options.theme);
    },
    updateItems: function updateItems() {
      var e, i;
      if (!1 === this.options.responsive) return !1;
      if (!0 === this.options.singleItem) return this.options.items = this.orignalItems = 1, this.options.itemsCustom = !1, this.options.itemsDesktop = !1, this.options.itemsDesktopSmall = !1, this.options.itemsTablet = !1, this.options.itemsTabletSmall = !1, this.options.itemsMobile = !1;
      if ((e = t(this.options.responsiveBaseWidth).width()) > (this.options.itemsDesktop[0] || this.orignalItems) && (this.options.items = this.orignalItems), !1 !== this.options.itemsCustom) for (this.options.itemsCustom.sort(function (t, e) {
        return t[0] - e[0];
      }), i = 0; i < this.options.itemsCustom.length; i += 1) {
        this.options.itemsCustom[i][0] <= e && (this.options.items = this.options.itemsCustom[i][1]);
      } else e <= this.options.itemsDesktop[0] && !1 !== this.options.itemsDesktop && (this.options.items = this.options.itemsDesktop[1]), e <= this.options.itemsDesktopSmall[0] && !1 !== this.options.itemsDesktopSmall && (this.options.items = this.options.itemsDesktopSmall[1]), e <= this.options.itemsTablet[0] && !1 !== this.options.itemsTablet && (this.options.items = this.options.itemsTablet[1]), e <= this.options.itemsTabletSmall[0] && !1 !== this.options.itemsTabletSmall && (this.options.items = this.options.itemsTabletSmall[1]), e <= this.options.itemsMobile[0] && !1 !== this.options.itemsMobile && (this.options.items = this.options.itemsMobile[1]);
      this.options.items > this.itemsAmount && !0 === this.options.itemsScaleUp && (this.options.items = this.itemsAmount);
    },
    response: function response() {
      var i,
          n,
          o = this;
      if (!0 !== o.options.responsive) return !1;
      n = t(e).width(), o.resizer = function () {
        t(e).width() !== n && (!1 !== o.options.autoPlay && e.clearInterval(o.autoPlayInterval), e.clearTimeout(i), i = e.setTimeout(function () {
          n = t(e).width(), o.updateVars();
        }, o.options.responsiveRefreshRate));
      }, t(e).resize(o.resizer);
    },
    updatePosition: function updatePosition() {
      this.jumpTo(this.currentItem), !1 !== this.options.autoPlay && this.checkAp();
    },
    appendItemsSizes: function appendItemsSizes() {
      var e = this,
          i = 0,
          n = e.itemsAmount - e.options.items;
      e.$owlItems.each(function (o) {
        var s = t(this);
        s.css({
          width: e.itemWidth
        }).data("owl-item", Number(o)), 0 != o % e.options.items && o !== n || o > n || (i += 1), s.data("owl-roundPages", i);
      });
    },
    appendWrapperSizes: function appendWrapperSizes() {
      this.$owlWrapper.css({
        width: this.$owlItems.length * this.itemWidth * 2,
        left: 0
      }), this.appendItemsSizes();
    },
    calculateAll: function calculateAll() {
      this.calculateWidth(), this.appendWrapperSizes(), this.loops(), this.max();
    },
    calculateWidth: function calculateWidth() {
      this.itemWidth = Math.round(this.$elem.width() / this.options.items);
    },
    max: function max() {
      var t = -1 * (this.itemsAmount * this.itemWidth - this.options.items * this.itemWidth);
      return this.options.items > this.itemsAmount ? this.maximumPixels = t = this.maximumItem = 0 : (this.maximumItem = this.itemsAmount - this.options.items, this.maximumPixels = t), t;
    },
    min: function min() {
      return 0;
    },
    loops: function loops() {
      var e,
          i,
          n = 0,
          o = 0;

      for (this.positionsInArray = [0], this.pagesInArray = [], e = 0; e < this.itemsAmount; e += 1) {
        o += this.itemWidth, this.positionsInArray.push(-o), !0 === this.options.scrollPerPage && (i = (i = t(this.$owlItems[e])).data("owl-roundPages")) !== n && (this.pagesInArray[n] = this.positionsInArray[e], n = i);
      }
    },
    buildControls: function buildControls() {
      !0 !== this.options.navigation && !0 !== this.options.pagination || (this.owlControls = t('<div class="owl-controls"/>').toggleClass("clickable", !this.browser.isTouch).appendTo(this.$elem)), !0 === this.options.pagination && this.buildPagination(), !0 === this.options.navigation && this.buildButtons();
    },
    buildButtons: function buildButtons() {
      var e = this,
          i = t('<div class="owl-buttons"/>');
      e.owlControls.append(i), e.buttonPrev = t("<div/>", {
        "class": "owl-prev",
        html: e.options.navigationText[0] || ""
      }), e.buttonNext = t("<div/>", {
        "class": "owl-next",
        html: e.options.navigationText[1] || ""
      }), i.append(e.buttonPrev).append(e.buttonNext), i.on("touchstart.owlControls mousedown.owlControls", 'div[class^="owl"]', function (t) {
        t.preventDefault();
      }), i.on("touchend.owlControls mouseup.owlControls", 'div[class^="owl"]', function (i) {
        i.preventDefault(), t(this).hasClass("owl-next") ? e.next() : e.prev();
      });
    },
    buildPagination: function buildPagination() {
      var e = this;
      e.paginationWrapper = t('<div class="owl-pagination"/>'), e.owlControls.append(e.paginationWrapper), e.paginationWrapper.on("touchend.owlControls mouseup.owlControls", ".owl-page", function (i) {
        i.preventDefault(), Number(t(this).data("owl-page")) !== e.currentItem && e.goTo(Number(t(this).data("owl-page")), !0);
      });
    },
    updatePagination: function updatePagination() {
      var e, i, n, o, s, r;
      if (!1 === this.options.pagination) return !1;

      for (this.paginationWrapper.html(""), e = 0, i = this.itemsAmount - this.itemsAmount % this.options.items, o = 0; o < this.itemsAmount; o += 1) {
        0 == o % this.options.items && (e += 1, i === o && (n = this.itemsAmount - this.options.items), s = t("<div/>", {
          "class": "owl-page"
        }), r = t("<span></span>", {
          text: !0 === this.options.paginationNumbers ? e : "",
          "class": !0 === this.options.paginationNumbers ? "owl-numbers" : ""
        }), s.append(r), s.data("owl-page", i === o ? n : o), s.data("owl-roundPages", e), this.paginationWrapper.append(s));
      }

      this.checkPagination();
    },
    checkPagination: function checkPagination() {
      var e = this;
      if (!1 === e.options.pagination) return !1;
      e.paginationWrapper.find(".owl-page").each(function () {
        t(this).data("owl-roundPages") === t(e.$owlItems[e.currentItem]).data("owl-roundPages") && (e.paginationWrapper.find(".owl-page").removeClass("active"), t(this).addClass("active"));
      });
    },
    checkNavigation: function checkNavigation() {
      if (!1 === this.options.navigation) return !1;
      !1 === this.options.rewindNav && (0 === this.currentItem && 0 === this.maximumItem ? (this.buttonPrev.addClass("disabled"), this.buttonNext.addClass("disabled")) : 0 === this.currentItem && 0 !== this.maximumItem ? (this.buttonPrev.addClass("disabled"), this.buttonNext.removeClass("disabled")) : this.currentItem === this.maximumItem ? (this.buttonPrev.removeClass("disabled"), this.buttonNext.addClass("disabled")) : 0 !== this.currentItem && this.currentItem !== this.maximumItem && (this.buttonPrev.removeClass("disabled"), this.buttonNext.removeClass("disabled")));
    },
    updateControls: function updateControls() {
      this.updatePagination(), this.checkNavigation(), this.owlControls && (this.options.items >= this.itemsAmount ? this.owlControls.hide() : this.owlControls.show());
    },
    destroyControls: function destroyControls() {
      this.owlControls && this.owlControls.remove();
    },
    next: function next(t) {
      if (this.isTransition) return !1;

      if (this.currentItem += !0 === this.options.scrollPerPage ? this.options.items : 1, this.currentItem > this.maximumItem + (!0 === this.options.scrollPerPage ? this.options.items - 1 : 0)) {
        if (!0 !== this.options.rewindNav) return this.currentItem = this.maximumItem, !1;
        this.currentItem = 0, t = "rewind";
      }

      this.goTo(this.currentItem, t);
    },
    prev: function prev(t) {
      if (this.isTransition) return !1;

      if (this.currentItem = !0 === this.options.scrollPerPage && 0 < this.currentItem && this.currentItem < this.options.items ? 0 : this.currentItem - (!0 === this.options.scrollPerPage ? this.options.items : 1), 0 > this.currentItem) {
        if (!0 !== this.options.rewindNav) return this.currentItem = 0, !1;
        this.currentItem = this.maximumItem, t = "rewind";
      }

      this.goTo(this.currentItem, t);
    },
    goTo: function goTo(t, i, n) {
      var o = this;
      return !o.isTransition && ("function" == typeof o.options.beforeMove && o.options.beforeMove.apply(this, [o.$elem]), t >= o.maximumItem ? t = o.maximumItem : 0 >= t && (t = 0), o.currentItem = o.owl.currentItem = t, !1 !== o.options.transitionStyle && "drag" !== n && 1 === o.options.items && !0 === o.browser.support3d ? (o.swapSpeed(0), !0 === o.browser.support3d ? o.transition3d(o.positionsInArray[t]) : o.css2slide(o.positionsInArray[t], 1), o.afterGo(), o.singleItemTransition(), !1) : (t = o.positionsInArray[t], !0 === o.browser.support3d ? (o.isCss3Finish = !1, !0 === i ? (o.swapSpeed("paginationSpeed"), e.setTimeout(function () {
        o.isCss3Finish = !0;
      }, o.options.paginationSpeed)) : "rewind" === i ? (o.swapSpeed(o.options.rewindSpeed), e.setTimeout(function () {
        o.isCss3Finish = !0;
      }, o.options.rewindSpeed)) : (o.swapSpeed("slideSpeed"), e.setTimeout(function () {
        o.isCss3Finish = !0;
      }, o.options.slideSpeed)), o.transition3d(t)) : !0 === i ? o.css2slide(t, o.options.paginationSpeed) : "rewind" === i ? o.css2slide(t, o.options.rewindSpeed) : o.css2slide(t, o.options.slideSpeed), void o.afterGo()));
    },
    jumpTo: function jumpTo(t) {
      "function" == typeof this.options.beforeMove && this.options.beforeMove.apply(this, [this.$elem]), t >= this.maximumItem || -1 === t ? t = this.maximumItem : 0 >= t && (t = 0), this.swapSpeed(0), !0 === this.browser.support3d ? this.transition3d(this.positionsInArray[t]) : this.css2slide(this.positionsInArray[t], 1), this.currentItem = this.owl.currentItem = t, this.afterGo();
    },
    afterGo: function afterGo() {
      this.prevArr.push(this.currentItem), this.prevItem = this.owl.prevItem = this.prevArr[this.prevArr.length - 2], this.prevArr.shift(0), this.prevItem !== this.currentItem && (this.checkPagination(), this.checkNavigation(), this.eachMoveUpdate(), !1 !== this.options.autoPlay && this.checkAp()), "function" == typeof this.options.afterMove && this.prevItem !== this.currentItem && this.options.afterMove.apply(this, [this.$elem]);
    },
    stop: function stop() {
      this.apStatus = "stop", e.clearInterval(this.autoPlayInterval);
    },
    checkAp: function checkAp() {
      "stop" !== this.apStatus && this.play();
    },
    play: function play() {
      var t = this;
      if (t.apStatus = "play", !1 === t.options.autoPlay) return !1;
      e.clearInterval(t.autoPlayInterval), t.autoPlayInterval = e.setInterval(function () {
        t.next(!0);
      }, t.options.autoPlay);
    },
    swapSpeed: function swapSpeed(t) {
      "slideSpeed" === t ? this.$owlWrapper.css(this.addCssSpeed(this.options.slideSpeed)) : "paginationSpeed" === t ? this.$owlWrapper.css(this.addCssSpeed(this.options.paginationSpeed)) : "string" != typeof t && this.$owlWrapper.css(this.addCssSpeed(t));
    },
    addCssSpeed: function addCssSpeed(t) {
      return {
        "-webkit-transition": "all " + t + "ms ease",
        "-moz-transition": "all " + t + "ms ease",
        "-o-transition": "all " + t + "ms ease",
        transition: "all " + t + "ms ease"
      };
    },
    removeTransition: function removeTransition() {
      return {
        "-webkit-transition": "",
        "-moz-transition": "",
        "-o-transition": "",
        transition: ""
      };
    },
    doTranslate: function doTranslate(t) {
      return {
        "-webkit-transform": "translate3d(" + t + "px, 0px, 0px)",
        "-moz-transform": "translate3d(" + t + "px, 0px, 0px)",
        "-o-transform": "translate3d(" + t + "px, 0px, 0px)",
        "-ms-transform": "translate3d(" + t + "px, 0px, 0px)",
        transform: "translate3d(" + t + "px, 0px,0px)"
      };
    },
    transition3d: function transition3d(t) {
      this.$owlWrapper.css(this.doTranslate(t));
    },
    css2move: function css2move(t) {
      this.$owlWrapper.css({
        left: t
      });
    },
    css2slide: function css2slide(t, e) {
      var i = this;
      i.isCssFinish = !1, i.$owlWrapper.stop(!0, !0).animate({
        left: t
      }, {
        duration: e || i.options.slideSpeed,
        complete: function complete() {
          i.isCssFinish = !0;
        }
      });
    },
    checkBrowser: function checkBrowser() {
      var t = i.createElement("div");
      t.style.cssText = "  -moz-transform:translate3d(0px, 0px, 0px); -ms-transform:translate3d(0px, 0px, 0px); -o-transform:translate3d(0px, 0px, 0px); -webkit-transform:translate3d(0px, 0px, 0px); transform:translate3d(0px, 0px, 0px)", t = t.style.cssText.match(/translate3d\(0px, 0px, 0px\)/g), this.browser = {
        support3d: null !== t && 1 === t.length,
        isTouch: "ontouchstart" in e || e.navigator.msMaxTouchPoints
      };
    },
    moveEvents: function moveEvents() {
      !1 === this.options.mouseDrag && !1 === this.options.touchDrag || (this.gestures(), this.disabledEvents());
    },
    eventTypes: function eventTypes() {
      var t = ["s", "e", "x"];
      this.ev_types = {}, !0 === this.options.mouseDrag && !0 === this.options.touchDrag ? t = ["touchstart.owl mousedown.owl", "touchmove.owl mousemove.owl", "touchend.owl touchcancel.owl mouseup.owl"] : !1 === this.options.mouseDrag && !0 === this.options.touchDrag ? t = ["touchstart.owl", "touchmove.owl", "touchend.owl touchcancel.owl"] : !0 === this.options.mouseDrag && !1 === this.options.touchDrag && (t = ["mousedown.owl", "mousemove.owl", "mouseup.owl"]), this.ev_types.start = t[0], this.ev_types.move = t[1], this.ev_types.end = t[2];
    },
    disabledEvents: function disabledEvents() {
      this.$elem.on("dragstart.owl", function (t) {
        t.preventDefault();
      }), this.$elem.on("mousedown.disableTextSelect", function (e) {
        return t(e.target).is("input, textarea, select, option");
      });
    },
    gestures: function gestures() {
      function n(t) {
        if (void 0 !== t.touches) return {
          x: t.touches[0].pageX,
          y: t.touches[0].pageY
        };

        if (void 0 === t.touches) {
          if (void 0 !== t.pageX) return {
            x: t.pageX,
            y: t.pageY
          };
          if (void 0 === t.pageX) return {
            x: t.clientX,
            y: t.clientY
          };
        }
      }

      function o(e) {
        "on" === e ? (t(i).on(a.ev_types.move, s), t(i).on(a.ev_types.end, r)) : "off" === e && (t(i).off(a.ev_types.move), t(i).off(a.ev_types.end));
      }

      function s(o) {
        o = o.originalEvent || o || e.event, a.newPosX = n(o).x - l.offsetX, a.newPosY = n(o).y - l.offsetY, a.newRelativeX = a.newPosX - l.relativePos, "function" == typeof a.options.startDragging && !0 !== l.dragging && 0 !== a.newRelativeX && (l.dragging = !0, a.options.startDragging.apply(a, [a.$elem])), (8 < a.newRelativeX || -8 > a.newRelativeX) && !0 === a.browser.isTouch && (void 0 !== o.preventDefault ? o.preventDefault() : o.returnValue = !1, l.sliding = !0), (10 < a.newPosY || -10 > a.newPosY) && !1 === l.sliding && t(i).off("touchmove.owl"), a.newPosX = Math.max(Math.min(a.newPosX, a.newRelativeX / 5), a.maximumPixels + a.newRelativeX / 5), !0 === a.browser.support3d ? a.transition3d(a.newPosX) : a.css2move(a.newPosX);
      }

      function r(i) {
        var n;
        (i = i.originalEvent || i || e.event).target = i.target || i.srcElement, l.dragging = !1, !0 !== a.browser.isTouch && a.$owlWrapper.removeClass("grabbing"), a.dragDirection = 0 > a.newRelativeX ? a.owl.dragDirection = "left" : a.owl.dragDirection = "right", 0 !== a.newRelativeX && (n = a.getNewPosition(), a.goTo(n, !1, "drag"), l.targetElement === i.target && !0 !== a.browser.isTouch && (t(i.target).on("click.disable", function (e) {
          e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault(), t(e.target).off("click.disable");
        }), n = (i = t._data(i.target, "events").click).pop(), i.splice(0, 0, n))), o("off");
      }

      var a = this,
          l = {
        offsetX: 0,
        offsetY: 0,
        baseElWidth: 0,
        relativePos: 0,
        position: null,
        minSwipe: null,
        maxSwipe: null,
        sliding: null,
        dargging: null,
        targetElement: null
      };
      a.isCssFinish = !0, a.$elem.on(a.ev_types.start, ".owl-wrapper", function (i) {
        var s;
        if (3 === (i = i.originalEvent || i || e.event).which) return !1;

        if (!(a.itemsAmount <= a.options.items)) {
          if (!1 === a.isCssFinish && !a.options.dragBeforeAnimFinish || !1 === a.isCss3Finish && !a.options.dragBeforeAnimFinish) return !1;
          !1 !== a.options.autoPlay && e.clearInterval(a.autoPlayInterval), !0 === a.browser.isTouch || a.$owlWrapper.hasClass("grabbing") || a.$owlWrapper.addClass("grabbing"), a.newPosX = 0, a.newRelativeX = 0, t(this).css(a.removeTransition()), s = t(this).position(), l.relativePos = s.left, l.offsetX = n(i).x - s.left, l.offsetY = n(i).y - s.top, o("on"), l.sliding = !1, l.targetElement = i.target || i.srcElement;
        }
      });
    },
    getNewPosition: function getNewPosition() {
      var t = this.closestItem();
      return t > this.maximumItem ? t = this.currentItem = this.maximumItem : 0 <= this.newPosX && (this.currentItem = t = 0), t;
    },
    closestItem: function closestItem() {
      var e = this,
          i = !0 === e.options.scrollPerPage ? e.pagesInArray : e.positionsInArray,
          n = e.newPosX,
          o = null;
      return t.each(i, function (s, r) {
        n - e.itemWidth / 20 > i[s + 1] && n - e.itemWidth / 20 < r && "left" === e.moveDirection() ? (o = r, e.currentItem = !0 === e.options.scrollPerPage ? t.inArray(o, e.positionsInArray) : s) : n + e.itemWidth / 20 < r && n + e.itemWidth / 20 > (i[s + 1] || i[s] - e.itemWidth) && "right" === e.moveDirection() && (!0 === e.options.scrollPerPage ? (o = i[s + 1] || i[i.length - 1], e.currentItem = t.inArray(o, e.positionsInArray)) : (o = i[s + 1], e.currentItem = s + 1));
      }), e.currentItem;
    },
    moveDirection: function moveDirection() {
      var t;
      return 0 > this.newRelativeX ? (t = "right", this.playDirection = "next") : (t = "left", this.playDirection = "prev"), t;
    },
    customEvents: function customEvents() {
      var t = this;
      t.$elem.on("owl.next", function () {
        t.next();
      }), t.$elem.on("owl.prev", function () {
        t.prev();
      }), t.$elem.on("owl.play", function (e, i) {
        t.options.autoPlay = i, t.play(), t.hoverStatus = "play";
      }), t.$elem.on("owl.stop", function () {
        t.stop(), t.hoverStatus = "stop";
      }), t.$elem.on("owl.goTo", function (e, i) {
        t.goTo(i);
      }), t.$elem.on("owl.jumpTo", function (e, i) {
        t.jumpTo(i);
      });
    },
    stopOnHover: function stopOnHover() {
      var t = this;
      !0 === t.options.stopOnHover && !0 !== t.browser.isTouch && !1 !== t.options.autoPlay && (t.$elem.on("mouseover", function () {
        t.stop();
      }), t.$elem.on("mouseout", function () {
        "stop" !== t.hoverStatus && t.play();
      }));
    },
    lazyLoad: function lazyLoad() {
      var e, i, n, o;
      if (!1 === this.options.lazyLoad) return !1;

      for (e = 0; e < this.itemsAmount; e += 1) {
        "loaded" !== (i = t(this.$owlItems[e])).data("owl-loaded") && (n = i.data("owl-item"), "string" != typeof (o = i.find(".lazyOwl")).data("src") ? i.data("owl-loaded", "loaded") : (void 0 === i.data("owl-loaded") && (o.hide(), i.addClass("loading").data("owl-loaded", "checked")), (!0 !== this.options.lazyFollow || n >= this.currentItem) && n < this.currentItem + this.options.items && o.length && this.lazyPreload(i, o)));
      }
    },
    lazyPreload: function lazyPreload(t, i) {
      function n() {
        t.data("owl-loaded", "loaded").removeClass("loading"), i.removeAttr("data-src"), "fade" === s.options.lazyEffect ? i.fadeIn(400) : i.show(), "function" == typeof s.options.afterLazyLoad && s.options.afterLazyLoad.apply(this, [s.$elem]);
      }

      var o,
          s = this,
          r = 0;
      "DIV" === i.prop("tagName") ? (i.css("background-image", "url(" + i.data("src") + ")"), o = !0) : i[0].src = i.data("src"), function t() {
        r += 1, s.completeImg(i.get(0)) || !0 === o ? n() : 100 >= r ? e.setTimeout(t, 100) : n();
      }();
    },
    autoHeight: function autoHeight() {
      function i() {
        var i = t(o.$owlItems[o.currentItem]).height();
        o.wrapperOuter.css("height", i + "px"), o.wrapperOuter.hasClass("autoHeight") || e.setTimeout(function () {
          o.wrapperOuter.addClass("autoHeight");
        }, 0);
      }

      var n,
          o = this,
          s = t(o.$owlItems[o.currentItem]).find("img");
      void 0 !== s.get(0) ? (n = 0, function t() {
        n += 1, o.completeImg(s.get(0)) ? i() : 100 >= n ? e.setTimeout(t, 100) : o.wrapperOuter.css("height", "");
      }()) : i();
    },
    completeImg: function completeImg(t) {
      return !(!t.complete || void 0 !== t.naturalWidth && 0 === t.naturalWidth);
    },
    onVisibleItems: function onVisibleItems() {
      var e;

      for (!0 === this.options.addClassActive && this.$owlItems.removeClass("active"), this.visibleItems = [], e = this.currentItem; e < this.currentItem + this.options.items; e += 1) {
        this.visibleItems.push(e), !0 === this.options.addClassActive && t(this.$owlItems[e]).addClass("active");
      }

      this.owl.visibleItems = this.visibleItems;
    },
    transitionTypes: function transitionTypes(t) {
      this.outClass = "owl-" + t + "-out", this.inClass = "owl-" + t + "-in";
    },
    singleItemTransition: function singleItemTransition() {
      var t = this,
          e = t.outClass,
          i = t.inClass,
          n = t.$owlItems.eq(t.currentItem),
          o = t.$owlItems.eq(t.prevItem),
          s = Math.abs(t.positionsInArray[t.currentItem]) + t.positionsInArray[t.prevItem],
          r = Math.abs(t.positionsInArray[t.currentItem]) + t.itemWidth / 2;
      t.isTransition = !0, t.$owlWrapper.addClass("owl-origin").css({
        "-webkit-transform-origin": r + "px",
        "-moz-perspective-origin": r + "px",
        "perspective-origin": r + "px"
      }), o.css({
        position: "relative",
        left: s + "px"
      }).addClass(e).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend", function () {
        t.endPrev = !0, o.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend"), t.clearTransStyle(o, e);
      }), n.addClass(i).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend", function () {
        t.endCurrent = !0, n.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend"), t.clearTransStyle(n, i);
      });
    },
    clearTransStyle: function clearTransStyle(t, e) {
      t.css({
        position: "",
        left: ""
      }).removeClass(e), this.endPrev && this.endCurrent && (this.$owlWrapper.removeClass("owl-origin"), this.isTransition = this.endCurrent = this.endPrev = !1);
    },
    owlStatus: function owlStatus() {
      this.owl = {
        userOptions: this.userOptions,
        baseElement: this.$elem,
        userItems: this.$userItems,
        owlItems: this.$owlItems,
        currentItem: this.currentItem,
        prevItem: this.prevItem,
        visibleItems: this.visibleItems,
        isTouch: this.browser.isTouch,
        browser: this.browser,
        dragDirection: this.dragDirection
      };
    },
    clearEvents: function clearEvents() {
      this.$elem.off(".owl owl mousedown.disableTextSelect"), t(i).off(".owl owl"), t(e).off("resize", this.resizer);
    },
    unWrap: function unWrap() {
      0 !== this.$elem.children().length && (this.$owlWrapper.unwrap(), this.$userItems.unwrap().unwrap(), this.owlControls && this.owlControls.remove()), this.clearEvents(), this.$elem.attr("style", this.$elem.data("owl-originalStyles") || "").attr("class", this.$elem.data("owl-originalClasses"));
    },
    destroy: function destroy() {
      this.stop(), e.clearInterval(this.checkVisible), this.unWrap(), this.$elem.removeData();
    },
    reinit: function reinit(e) {
      e = t.extend({}, this.userOptions, e), this.unWrap(), this.init(e, this.$elem);
    },
    addItem: function addItem(t, e) {
      var i;
      return !!t && (0 === this.$elem.children().length ? (this.$elem.append(t), this.setVars(), !1) : (this.unWrap(), (i = void 0 === e || -1 === e ? -1 : e) >= this.$userItems.length || -1 === i ? this.$userItems.eq(-1).after(t) : this.$userItems.eq(i).before(t), void this.setVars()));
    },
    removeItem: function removeItem(t) {
      if (0 === this.$elem.children().length) return !1;
      t = void 0 === t || -1 === t ? -1 : t, this.unWrap(), this.$userItems.eq(t).remove(), this.setVars();
    }
  };
  t.fn.owlCarousel = function (e) {
    return this.each(function () {
      if (!0 === t(this).data("owl-init")) return !1;
      t(this).data("owl-init", !0);
      var i = Object.create(n);
      i.init(e, this), t.data(this, "owlCarousel", i);
    });
  }, t.fn.owlCarousel.options = {
    items: 5,
    itemsCustom: !1,
    itemsDesktop: [1199, 4],
    itemsDesktopSmall: [979, 3],
    itemsTablet: [768, 2],
    itemsTabletSmall: !1,
    itemsMobile: [479, 1],
    singleItem: !1,
    itemsScaleUp: !1,
    slideSpeed: 200,
    paginationSpeed: 800,
    rewindSpeed: 1e3,
    autoPlay: !1,
    stopOnHover: !1,
    navigation: !1,
    navigationText: ["prev", "next"],
    rewindNav: !0,
    scrollPerPage: !1,
    pagination: !0,
    paginationNumbers: !1,
    responsive: !0,
    responsiveRefreshRate: 200,
    responsiveBaseWidth: e,
    baseClass: "owl-carousel",
    theme: "owl-theme",
    lazyLoad: !1,
    lazyFollow: !0,
    lazyEffect: "fade",
    autoHeight: !1,
    jsonPath: !1,
    jsonSuccess: !1,
    dragBeforeAnimFinish: !0,
    mouseDrag: !0,
    touchDrag: !0,
    addClassActive: !1,
    transitionStyle: !1,
    beforeUpdate: !1,
    afterUpdate: !1,
    beforeInit: !1,
    afterInit: !1,
    beforeMove: !1,
    afterMove: !1,
    afterAction: !1,
    startDragging: !1,
    afterLazyLoad: !1
  };
}(jQuery, window, document), function () {
  var t,
      e,
      i,
      n,
      o,
      s = function s(t, e) {
    return function () {
      return t.apply(e, arguments);
    };
  },
      r = [].indexOf || function (t) {
    for (var e = 0, i = this.length; i > e; e++) {
      if (e in this && this[e] === t) return e;
    }

    return -1;
  };

  e = function () {
    function t() {}

    return t.prototype.extend = function (t, e) {
      var i, n;

      for (i in e) {
        n = e[i], null == t[i] && (t[i] = n);
      }

      return t;
    }, t.prototype.isMobile = function (t) {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(t);
    }, t.prototype.createEvent = function (t, e, i, n) {
      var o;
      return null == e && (e = !1), null == i && (i = !1), null == n && (n = null), null != document.createEvent ? (o = document.createEvent("CustomEvent")).initCustomEvent(t, e, i, n) : null != document.createEventObject ? (o = document.createEventObject()).eventType = t : o.eventName = t, o;
    }, t.prototype.emitEvent = function (t, e) {
      return null != t.dispatchEvent ? t.dispatchEvent(e) : e in (null != t) ? t[e]() : "on" + e in (null != t) ? t["on" + e]() : void 0;
    }, t.prototype.addEvent = function (t, e, i) {
      return null != t.addEventListener ? t.addEventListener(e, i, !1) : null != t.attachEvent ? t.attachEvent("on" + e, i) : t[e] = i;
    }, t.prototype.removeEvent = function (t, e, i) {
      return null != t.removeEventListener ? t.removeEventListener(e, i, !1) : null != t.detachEvent ? t.detachEvent("on" + e, i) : delete t[e];
    }, t.prototype.innerHeight = function () {
      return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight;
    }, t;
  }(), i = this.WeakMap || this.MozWeakMap || (i = function () {
    function t() {
      this.keys = [], this.values = [];
    }

    return t.prototype.get = function (t) {
      var e, i, n, o;

      for (e = i = 0, n = (o = this.keys).length; n > i; e = ++i) {
        if (o[e] === t) return this.values[e];
      }
    }, t.prototype.set = function (t, e) {
      var i, n, o, s;

      for (i = n = 0, o = (s = this.keys).length; o > n; i = ++n) {
        if (s[i] === t) return void (this.values[i] = e);
      }

      return this.keys.push(t), this.values.push(e);
    }, t;
  }()), t = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (t = function () {
    function t() {
      "undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser."), "undefined" != typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.");
    }

    return t.notSupported = !0, t.prototype.observe = function () {}, t;
  }()), n = this.getComputedStyle || function (t, e) {
    return this.getPropertyValue = function (e) {
      var i;
      return "float" === e && (e = "styleFloat"), o.test(e) && e.replace(o, function (t, e) {
        return e.toUpperCase();
      }), (null != (i = t.currentStyle) ? i[e] : void 0) || null;
    }, this;
  }, o = /(\-([a-z]){1})/g, this.WOW = function () {
    function o(t) {
      null == t && (t = {}), this.scrollCallback = s(this.scrollCallback, this), this.scrollHandler = s(this.scrollHandler, this), this.resetAnimation = s(this.resetAnimation, this), this.start = s(this.start, this), this.scrolled = !0, this.config = this.util().extend(t, this.defaults), null != t.scrollContainer && (this.config.scrollContainer = document.querySelector(t.scrollContainer)), this.animationNameCache = new i(), this.wowEvent = this.util().createEvent(this.config.boxClass);
    }

    return o.prototype.defaults = {
      boxClass: "wow",
      animateClass: "animated",
      offset: 0,
      mobile: !0,
      live: !0,
      callback: null,
      scrollContainer: null
    }, o.prototype.init = function () {
      var t;
      return this.element = window.document.documentElement, "interactive" === (t = document.readyState) || "complete" === t ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start), this.finished = [];
    }, o.prototype.start = function () {
      var e, i, n, o;
      if (this.stopped = !1, this.boxes = function () {
        var t, i, n, o;

        for (o = [], t = 0, i = (n = this.element.querySelectorAll("." + this.config.boxClass)).length; i > t; t++) {
          e = n[t], o.push(e);
        }

        return o;
      }.call(this), this.all = function () {
        var t, i, n, o;

        for (o = [], t = 0, i = (n = this.boxes).length; i > t; t++) {
          e = n[t], o.push(e);
        }

        return o;
      }.call(this), this.boxes.length) if (this.disabled()) this.resetStyle();else for (i = 0, n = (o = this.boxes).length; n > i; i++) {
        e = o[i], this.applyStyle(e, !0);
      }
      return this.disabled() || (this.util().addEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live ? new t(function (t) {
        return function (e) {
          var i, n, o, s, r;

          for (r = [], i = 0, n = e.length; n > i; i++) {
            s = e[i], r.push(function () {
              var t, e, i, n;

              for (n = [], t = 0, e = (i = s.addedNodes || []).length; e > t; t++) {
                o = i[t], n.push(this.doSync(o));
              }

              return n;
            }.call(t));
          }

          return r;
        };
      }(this)).observe(document.body, {
        childList: !0,
        subtree: !0
      }) : void 0;
    }, o.prototype.stop = function () {
      return this.stopped = !0, this.util().removeEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().removeEvent(window, "resize", this.scrollHandler), null != this.interval ? clearInterval(this.interval) : void 0;
    }, o.prototype.sync = function (e) {
      return t.notSupported ? this.doSync(this.element) : void 0;
    }, o.prototype.doSync = function (t) {
      var e, i, n, o, s;

      if (null == t && (t = this.element), 1 === t.nodeType) {
        for (s = [], i = 0, n = (o = (t = t.parentNode || t).querySelectorAll("." + this.config.boxClass)).length; n > i; i++) {
          e = o[i], r.call(this.all, e) < 0 ? (this.boxes.push(e), this.all.push(e), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(e, !0), s.push(this.scrolled = !0)) : s.push(void 0);
        }

        return s;
      }
    }, o.prototype.show = function (t) {
      return this.applyStyle(t), t.className = t.className + " " + this.config.animateClass, null != this.config.callback && this.config.callback(t), this.util().emitEvent(t, this.wowEvent), this.util().addEvent(t, "animationend", this.resetAnimation), this.util().addEvent(t, "oanimationend", this.resetAnimation), this.util().addEvent(t, "webkitAnimationEnd", this.resetAnimation), this.util().addEvent(t, "MSAnimationEnd", this.resetAnimation), t;
    }, o.prototype.applyStyle = function (t, e) {
      var i, n, o, s;
      return n = t.getAttribute("data-wow-duration"), i = t.getAttribute("data-wow-delay"), o = t.getAttribute("data-wow-iteration"), this.animate((s = this, function () {
        return s.customStyle(t, e, n, i, o);
      }));
    }, o.prototype.animate = "requestAnimationFrame" in window ? function (t) {
      return window.requestAnimationFrame(t);
    } : function (t) {
      return t();
    }, o.prototype.resetStyle = function () {
      var t, e, i, n, o;

      for (o = [], e = 0, i = (n = this.boxes).length; i > e; e++) {
        t = n[e], o.push(t.style.visibility = "visible");
      }

      return o;
    }, o.prototype.resetAnimation = function (t) {
      var e;
      return t.type.toLowerCase().indexOf("animationend") >= 0 ? (e = t.target || t.srcElement).className = e.className.replace(this.config.animateClass, "").trim() : void 0;
    }, o.prototype.customStyle = function (t, e, i, n, o) {
      return e && this.cacheAnimationName(t), t.style.visibility = e ? "hidden" : "visible", i && this.vendorSet(t.style, {
        animationDuration: i
      }), n && this.vendorSet(t.style, {
        animationDelay: n
      }), o && this.vendorSet(t.style, {
        animationIterationCount: o
      }), this.vendorSet(t.style, {
        animationName: e ? "none" : this.cachedAnimationName(t)
      }), t;
    }, o.prototype.vendors = ["moz", "webkit"], o.prototype.vendorSet = function (t, e) {
      var i, n, o, s;

      for (i in n = [], e) {
        o = e[i], t["" + i] = o, n.push(function () {
          var e, n, r, a;

          for (a = [], e = 0, n = (r = this.vendors).length; n > e; e++) {
            s = r[e], a.push(t["" + s + i.charAt(0).toUpperCase() + i.substr(1)] = o);
          }

          return a;
        }.call(this));
      }

      return n;
    }, o.prototype.vendorCSS = function (t, e) {
      var i, o, s, r, a, l;

      for (r = (a = n(t)).getPropertyCSSValue(e), i = 0, o = (s = this.vendors).length; o > i; i++) {
        l = s[i], r = r || a.getPropertyCSSValue("-" + l + "-" + e);
      }

      return r;
    }, o.prototype.animationName = function (t) {
      var e;

      try {
        e = this.vendorCSS(t, "animation-name").cssText;
      } catch (i) {
        e = n(t).getPropertyValue("animation-name");
      }

      return "none" === e ? "" : e;
    }, o.prototype.cacheAnimationName = function (t) {
      return this.animationNameCache.set(t, this.animationName(t));
    }, o.prototype.cachedAnimationName = function (t) {
      return this.animationNameCache.get(t);
    }, o.prototype.scrollHandler = function () {
      return this.scrolled = !0;
    }, o.prototype.scrollCallback = function () {
      var t;
      return !this.scrolled || (this.scrolled = !1, this.boxes = function () {
        var e, i, n, o;

        for (o = [], e = 0, i = (n = this.boxes).length; i > e; e++) {
          (t = n[e]) && (this.isVisible(t) ? this.show(t) : o.push(t));
        }

        return o;
      }.call(this), this.boxes.length || this.config.live) ? void 0 : this.stop();
    }, o.prototype.offsetTop = function (t) {
      for (var e; void 0 === t.offsetTop;) {
        t = t.parentNode;
      }

      for (e = t.offsetTop; t = t.offsetParent;) {
        e += t.offsetTop;
      }

      return e;
    }, o.prototype.isVisible = function (t) {
      var e, i, n, o, s;
      return i = t.getAttribute("data-wow-offset") || this.config.offset, o = (s = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset) + Math.min(this.element.clientHeight, this.util().innerHeight()) - i, e = (n = this.offsetTop(t)) + t.clientHeight, o >= n && e >= s;
    }, o.prototype.util = function () {
      return null != this._util ? this._util : this._util = new e();
    }, o.prototype.disabled = function () {
      return !this.config.mobile && this.util().isMobile(navigator.userAgent);
    }, o;
  }();
}.call(void 0), function () {
  "use strict";

  function t(n) {
    if (!n) throw new Error("No options passed to Waypoint constructor");
    if (!n.element) throw new Error("No element option passed to Waypoint constructor");
    if (!n.handler) throw new Error("No handler option passed to Waypoint constructor");
    this.key = "waypoint-" + e, this.options = t.Adapter.extend({}, t.defaults, n), this.element = this.options.element, this.adapter = new t.Adapter(this.element), this.callback = n.handler, this.axis = this.options.horizontal ? "horizontal" : "vertical", this.enabled = this.options.enabled, this.triggerPoint = null, this.group = t.Group.findOrCreate({
      name: this.options.group,
      axis: this.axis
    }), this.context = t.Context.findOrCreateByElement(this.options.context), t.offsetAliases[this.options.offset] && (this.options.offset = t.offsetAliases[this.options.offset]), this.group.add(this), this.context.add(this), i[this.key] = this, e += 1;
  }

  var e = 0,
      i = {};
  t.prototype.queueTrigger = function (t) {
    this.group.queueTrigger(this, t);
  }, t.prototype.trigger = function (t) {
    this.enabled && this.callback && this.callback.apply(this, t);
  }, t.prototype.destroy = function () {
    this.context.remove(this), this.group.remove(this), delete i[this.key];
  }, t.prototype.disable = function () {
    return this.enabled = !1, this;
  }, t.prototype.enable = function () {
    return this.context.refresh(), this.enabled = !0, this;
  }, t.prototype.next = function () {
    return this.group.next(this);
  }, t.prototype.previous = function () {
    return this.group.previous(this);
  }, t.invokeAll = function (t) {
    var e = [];

    for (var n in i) {
      e.push(i[n]);
    }

    for (var o = 0, s = e.length; s > o; o++) {
      e[o][t]();
    }
  }, t.destroyAll = function () {
    t.invokeAll("destroy");
  }, t.disableAll = function () {
    t.invokeAll("disable");
  }, t.enableAll = function () {
    t.invokeAll("enable");
  }, t.refreshAll = function () {
    t.Context.refreshAll();
  }, t.viewportHeight = function () {
    return window.innerHeight || document.documentElement.clientHeight;
  }, t.viewportWidth = function () {
    return document.documentElement.clientWidth;
  }, t.adapters = [], t.defaults = {
    context: window,
    continuous: !0,
    enabled: !0,
    group: "default",
    horizontal: !1,
    offset: 0
  }, t.offsetAliases = {
    "bottom-in-view": function bottomInView() {
      return this.context.innerHeight() - this.adapter.outerHeight();
    },
    "right-in-view": function rightInView() {
      return this.context.innerWidth() - this.adapter.outerWidth();
    }
  }, window.Waypoint = t;
}(), function () {
  "use strict";

  function t(t) {
    this.element = t, this.Adapter = n.Adapter, this.adapter = new this.Adapter(t), this.key = "waypoint-context-" + e, this.didScroll = !1, this.didResize = !1, this.oldScroll = {
      x: this.adapter.scrollLeft(),
      y: this.adapter.scrollTop()
    }, this.waypoints = {
      vertical: {},
      horizontal: {}
    }, t.waypointContextKey = this.key, i[t.waypointContextKey] = this, e += 1, this.createThrottledScrollHandler(), this.createThrottledResizeHandler();
  }

  var e = 0,
      i = {},
      n = window.Waypoint,
      o = window.onload;
  t.prototype.add = function (t) {
    var e = t.options.horizontal ? "horizontal" : "vertical";
    this.waypoints[e][t.key] = t, this.refresh();
  }, t.prototype.checkEmpty = function () {
    var t = this.Adapter.isEmptyObject(this.waypoints.horizontal),
        e = this.Adapter.isEmptyObject(this.waypoints.vertical);
    t && e && (this.adapter.off(".waypoints"), delete i[this.key]);
  }, t.prototype.createThrottledResizeHandler = function () {
    function t() {
      e.handleResize(), e.didResize = !1;
    }

    var e = this;
    this.adapter.on("resize.waypoints", function () {
      e.didResize || (e.didResize = !0, n.requestAnimationFrame(t));
    });
  }, t.prototype.createThrottledScrollHandler = function () {
    function t() {
      e.handleScroll(), e.didScroll = !1;
    }

    var e = this;
    this.adapter.on("scroll.waypoints", function () {
      (!e.didScroll || n.isTouch) && (e.didScroll = !0, n.requestAnimationFrame(t));
    });
  }, t.prototype.handleResize = function () {
    n.Context.refreshAll();
  }, t.prototype.handleScroll = function () {
    var t = {},
        e = {
      horizontal: {
        newScroll: this.adapter.scrollLeft(),
        oldScroll: this.oldScroll.x,
        forward: "right",
        backward: "left"
      },
      vertical: {
        newScroll: this.adapter.scrollTop(),
        oldScroll: this.oldScroll.y,
        forward: "down",
        backward: "up"
      }
    };

    for (var i in e) {
      var n = e[i],
          o = n.newScroll > n.oldScroll ? n.forward : n.backward;

      for (var s in this.waypoints[i]) {
        var r = this.waypoints[i][s],
            a = n.oldScroll < r.triggerPoint,
            l = n.newScroll >= r.triggerPoint;
        (a && l || !a && !l) && (r.queueTrigger(o), t[r.group.id] = r.group);
      }
    }

    for (var c in t) {
      t[c].flushTriggers();
    }

    this.oldScroll = {
      x: e.horizontal.newScroll,
      y: e.vertical.newScroll
    };
  }, t.prototype.innerHeight = function () {
    return this.element == this.element.window ? n.viewportHeight() : this.adapter.innerHeight();
  }, t.prototype.remove = function (t) {
    delete this.waypoints[t.axis][t.key], this.checkEmpty();
  }, t.prototype.innerWidth = function () {
    return this.element == this.element.window ? n.viewportWidth() : this.adapter.innerWidth();
  }, t.prototype.destroy = function () {
    var t = [];

    for (var e in this.waypoints) {
      for (var i in this.waypoints[e]) {
        t.push(this.waypoints[e][i]);
      }
    }

    for (var n = 0, o = t.length; o > n; n++) {
      t[n].destroy();
    }
  }, t.prototype.refresh = function () {
    var t,
        e = this.element == this.element.window,
        i = e ? void 0 : this.adapter.offset(),
        o = {};

    for (var s in this.handleScroll(), t = {
      horizontal: {
        contextOffset: e ? 0 : i.left,
        contextScroll: e ? 0 : this.oldScroll.x,
        contextDimension: this.innerWidth(),
        oldScroll: this.oldScroll.x,
        forward: "right",
        backward: "left",
        offsetProp: "left"
      },
      vertical: {
        contextOffset: e ? 0 : i.top,
        contextScroll: e ? 0 : this.oldScroll.y,
        contextDimension: this.innerHeight(),
        oldScroll: this.oldScroll.y,
        forward: "down",
        backward: "up",
        offsetProp: "top"
      }
    }) {
      var r = t[s];

      for (var a in this.waypoints[s]) {
        var l,
            c,
            u,
            p,
            d = this.waypoints[s][a],
            m = d.options.offset,
            f = d.triggerPoint,
            h = 0,
            g = null == f;
        d.element !== d.element.window && (h = d.adapter.offset()[r.offsetProp]), "function" == typeof m ? m = m.apply(d) : "string" == typeof m && (m = parseFloat(m), d.options.offset.indexOf("%") > -1 && (m = Math.ceil(r.contextDimension * m / 100))), l = r.contextScroll - r.contextOffset, d.triggerPoint = h + l - m, c = f < r.oldScroll, u = d.triggerPoint >= r.oldScroll, p = !c && !u, !g && c && u ? (d.queueTrigger(r.backward), o[d.group.id] = d.group) : !g && p ? (d.queueTrigger(r.forward), o[d.group.id] = d.group) : g && r.oldScroll >= d.triggerPoint && (d.queueTrigger(r.forward), o[d.group.id] = d.group);
      }
    }

    return n.requestAnimationFrame(function () {
      for (var t in o) {
        o[t].flushTriggers();
      }
    }), this;
  }, t.findOrCreateByElement = function (e) {
    return t.findByElement(e) || new t(e);
  }, t.refreshAll = function () {
    for (var t in i) {
      i[t].refresh();
    }
  }, t.findByElement = function (t) {
    return i[t.waypointContextKey];
  }, window.onload = function () {
    o && o(), t.refreshAll();
  }, n.requestAnimationFrame = function (t) {
    (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function (t) {
      window.setTimeout(t, 1e3 / 60);
    }).call(window, t);
  }, n.Context = t;
}(), function () {
  "use strict";

  function t(t, e) {
    return t.triggerPoint - e.triggerPoint;
  }

  function e(t, e) {
    return e.triggerPoint - t.triggerPoint;
  }

  function i(t) {
    this.name = t.name, this.axis = t.axis, this.id = this.name + "-" + this.axis, this.waypoints = [], this.clearTriggerQueues(), n[this.axis][this.name] = this;
  }

  var n = {
    vertical: {},
    horizontal: {}
  },
      o = window.Waypoint;
  i.prototype.add = function (t) {
    this.waypoints.push(t);
  }, i.prototype.clearTriggerQueues = function () {
    this.triggerQueues = {
      up: [],
      down: [],
      left: [],
      right: []
    };
  }, i.prototype.flushTriggers = function () {
    for (var i in this.triggerQueues) {
      var n = this.triggerQueues[i],
          o = "up" === i || "left" === i;
      n.sort(o ? e : t);

      for (var s = 0, r = n.length; r > s; s += 1) {
        var a = n[s];
        (a.options.continuous || s === n.length - 1) && a.trigger([i]);
      }
    }

    this.clearTriggerQueues();
  }, i.prototype.next = function (e) {
    this.waypoints.sort(t);
    var i = o.Adapter.inArray(e, this.waypoints);
    return i === this.waypoints.length - 1 ? null : this.waypoints[i + 1];
  }, i.prototype.previous = function (e) {
    this.waypoints.sort(t);
    var i = o.Adapter.inArray(e, this.waypoints);
    return i ? this.waypoints[i - 1] : null;
  }, i.prototype.queueTrigger = function (t, e) {
    this.triggerQueues[e].push(t);
  }, i.prototype.remove = function (t) {
    var e = o.Adapter.inArray(t, this.waypoints);
    e > -1 && this.waypoints.splice(e, 1);
  }, i.prototype.first = function () {
    return this.waypoints[0];
  }, i.prototype.last = function () {
    return this.waypoints[this.waypoints.length - 1];
  }, i.findOrCreate = function (t) {
    return n[t.axis][t.name] || new i(t);
  }, o.Group = i;
}(), function () {
  "use strict";

  function t(t) {
    this.$element = e(t);
  }

  var e = window.jQuery,
      i = window.Waypoint;
  e.each(["innerHeight", "innerWidth", "off", "offset", "on", "outerHeight", "outerWidth", "scrollLeft", "scrollTop"], function (e, i) {
    t.prototype[i] = function () {
      var t = Array.prototype.slice.call(arguments);
      return this.$element[i].apply(this.$element, t);
    };
  }), e.each(["extend", "inArray", "isEmptyObject"], function (i, n) {
    t[n] = e[n];
  }), i.adapters.push({
    name: "jquery",
    Adapter: t
  }), i.Adapter = t;
}(), function () {
  "use strict";

  function t(t) {
    return function () {
      var i = [],
          n = arguments[0];
      return t.isFunction(arguments[0]) && ((n = t.extend({}, arguments[1])).handler = arguments[0]), this.each(function () {
        var o = t.extend({}, n, {
          element: this
        });
        "string" == typeof o.context && (o.context = t(this).closest(o.context)[0]), i.push(new e(o));
      }), i;
    };
  }

  var e = window.Waypoint;
  window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)), window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto));
}(), function (t) {
  "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? require("jquery") : window.jQuery || window.Zepto);
}(function (t) {
  var e,
      i,
      n,
      o,
      s,
      r,
      a = "Close",
      l = "BeforeClose",
      c = "MarkupParse",
      u = "Open",
      p = "Change",
      d = "mfp",
      m = "." + d,
      f = "mfp-ready",
      h = "mfp-removing",
      g = "mfp-prevent-close",
      v = function v() {},
      w = !!window.jQuery,
      y = t(window),
      b = function b(t, i) {
    e.ev.on(d + t + m, i);
  },
      C = function C(e, i, n, o) {
    var s = document.createElement("div");
    return s.className = "mfp-" + e, n && (s.innerHTML = n), o ? i && i.appendChild(s) : (s = t(s), i && s.appendTo(i)), s;
  },
      I = function I(i, n) {
    e.ev.triggerHandler(d + i, n), e.st.callbacks && (i = i.charAt(0).toLowerCase() + i.slice(1), e.st.callbacks[i] && e.st.callbacks[i].apply(e, t.isArray(n) ? n : [n]));
  },
      x = function x(i) {
    return i === r && e.currTemplate.closeBtn || (e.currTemplate.closeBtn = t(e.st.closeMarkup.replace("%title%", e.st.tClose)), r = i), e.currTemplate.closeBtn;
  },
      S = function S() {
    t.magnificPopup.instance || ((e = new v()).init(), t.magnificPopup.instance = e);
  };

  v.prototype = {
    constructor: v,
    init: function init() {
      var i = navigator.appVersion;
      e.isLowIE = e.isIE8 = document.all && !document.addEventListener, e.isAndroid = /android/gi.test(i), e.isIOS = /iphone|ipad|ipod/gi.test(i), e.supportsTransition = function () {
        var t = document.createElement("p").style,
            e = ["ms", "O", "Moz", "Webkit"];
        if (void 0 !== t.transition) return !0;

        for (; e.length;) {
          if (e.pop() + "Transition" in t) return !0;
        }

        return !1;
      }(), e.probablyMobile = e.isAndroid || e.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), n = t(document), e.popupsCache = {};
    },
    open: function open(i) {
      var o;

      if (!1 === i.isObj) {
        e.items = i.items.toArray(), e.index = 0;
        var r,
            a = i.items;

        for (o = 0; o < a.length; o++) {
          if ((r = a[o]).parsed && (r = r.el[0]), r === i.el[0]) {
            e.index = o;
            break;
          }
        }
      } else e.items = t.isArray(i.items) ? i.items : [i.items], e.index = i.index || 0;

      if (!e.isOpen) {
        e.types = [], s = "", i.mainEl && i.mainEl.length ? e.ev = i.mainEl.eq(0) : e.ev = n, i.key ? (e.popupsCache[i.key] || (e.popupsCache[i.key] = {}), e.currTemplate = e.popupsCache[i.key]) : e.currTemplate = {}, e.st = t.extend(!0, {}, t.magnificPopup.defaults, i), e.fixedContentPos = "auto" === e.st.fixedContentPos ? !e.probablyMobile : e.st.fixedContentPos, e.st.modal && (e.st.closeOnContentClick = !1, e.st.closeOnBgClick = !1, e.st.showCloseBtn = !1, e.st.enableEscapeKey = !1), e.bgOverlay || (e.bgOverlay = C("bg").on("click" + m, function () {
          e.close();
        }), e.wrap = C("wrap").attr("tabindex", -1).on("click" + m, function (t) {
          e._checkIfClose(t.target) && e.close();
        }), e.container = C("container", e.wrap)), e.contentContainer = C("content"), e.st.preloader && (e.preloader = C("preloader", e.container, e.st.tLoading));
        var l = t.magnificPopup.modules;

        for (o = 0; o < l.length; o++) {
          var p = l[o];
          p = p.charAt(0).toUpperCase() + p.slice(1), e["init" + p].call(e);
        }

        I("BeforeOpen"), e.st.showCloseBtn && (e.st.closeBtnInside ? (b(c, function (t, e, i, n) {
          i.close_replaceWith = x(n.type);
        }), s += " mfp-close-btn-in") : e.wrap.append(x())), e.st.alignTop && (s += " mfp-align-top"), e.fixedContentPos ? e.wrap.css({
          overflow: e.st.overflowY,
          overflowX: "hidden",
          overflowY: e.st.overflowY
        }) : e.wrap.css({
          top: y.scrollTop(),
          position: "absolute"
        }), (!1 === e.st.fixedBgPos || "auto" === e.st.fixedBgPos && !e.fixedContentPos) && e.bgOverlay.css({
          height: n.height(),
          position: "absolute"
        }), e.st.enableEscapeKey && n.on("keyup" + m, function (t) {
          27 === t.keyCode && e.close();
        }), y.on("resize" + m, function () {
          e.updateSize();
        }), e.st.closeOnContentClick || (s += " mfp-auto-cursor"), s && e.wrap.addClass(s);
        var d = e.wH = y.height(),
            h = {};

        if (e.fixedContentPos && e._hasScrollBar(d)) {
          var g = e._getScrollbarSize();

          g && (h.marginRight = g);
        }

        e.fixedContentPos && (e.isIE7 ? t("body, html").css("overflow", "hidden") : h.overflow = "hidden");
        var v = e.st.mainClass;
        return e.isIE7 && (v += " mfp-ie7"), v && e._addClassToMFP(v), e.updateItemHTML(), I("BuildControls"), t("html").css(h), e.bgOverlay.add(e.wrap).prependTo(e.st.prependTo || t(document.body)), e._lastFocusedEl = document.activeElement, setTimeout(function () {
          e.content ? (e._addClassToMFP(f), e._setFocus()) : e.bgOverlay.addClass(f), n.on("focusin" + m, e._onFocusIn);
        }, 16), e.isOpen = !0, e.updateSize(d), I(u), i;
      }

      e.updateItemHTML();
    },
    close: function close() {
      e.isOpen && (I(l), e.isOpen = !1, e.st.removalDelay && !e.isLowIE && e.supportsTransition ? (e._addClassToMFP(h), setTimeout(function () {
        e._close();
      }, e.st.removalDelay)) : e._close());
    },
    _close: function _close() {
      I(a);
      var i = h + " " + f + " ";

      if (e.bgOverlay.detach(), e.wrap.detach(), e.container.empty(), e.st.mainClass && (i += e.st.mainClass + " "), e._removeClassFromMFP(i), e.fixedContentPos) {
        var o = {
          marginRight: ""
        };
        e.isIE7 ? t("body, html").css("overflow", "") : o.overflow = "", t("html").css(o);
      }

      n.off("keyup.mfp focusin" + m), e.ev.off(m), e.wrap.attr("class", "mfp-wrap").removeAttr("style"), e.bgOverlay.attr("class", "mfp-bg"), e.container.attr("class", "mfp-container"), !e.st.showCloseBtn || e.st.closeBtnInside && !0 !== e.currTemplate[e.currItem.type] || e.currTemplate.closeBtn && e.currTemplate.closeBtn.detach(), e.st.autoFocusLast && e._lastFocusedEl && t(e._lastFocusedEl).focus(), e.currItem = null, e.content = null, e.currTemplate = null, e.prevHeight = 0, I("AfterClose");
    },
    updateSize: function updateSize(t) {
      if (e.isIOS) {
        var i = document.documentElement.clientWidth / window.innerWidth,
            n = window.innerHeight * i;
        e.wrap.css("height", n), e.wH = n;
      } else e.wH = t || y.height();

      e.fixedContentPos || e.wrap.css("height", e.wH), I("Resize");
    },
    updateItemHTML: function updateItemHTML() {
      var i = e.items[e.index];
      e.contentContainer.detach(), e.content && e.content.detach(), i.parsed || (i = e.parseEl(e.index));
      var n = i.type;

      if (I("BeforeChange", [e.currItem ? e.currItem.type : "", n]), e.currItem = i, !e.currTemplate[n]) {
        var s = !!e.st[n] && e.st[n].markup;
        I("FirstMarkupParse", s), e.currTemplate[n] = !s || t(s);
      }

      o && o !== i.type && e.container.removeClass("mfp-" + o + "-holder");
      var r = e["get" + n.charAt(0).toUpperCase() + n.slice(1)](i, e.currTemplate[n]);
      e.appendContent(r, n), i.preloaded = !0, I(p, i), o = i.type, e.container.prepend(e.contentContainer), I("AfterChange");
    },
    appendContent: function appendContent(t, i) {
      e.content = t, t ? e.st.showCloseBtn && e.st.closeBtnInside && !0 === e.currTemplate[i] ? e.content.find(".mfp-close").length || e.content.append(x()) : e.content = t : e.content = "", I("BeforeAppend"), e.container.addClass("mfp-" + i + "-holder"), e.contentContainer.append(e.content);
    },
    parseEl: function parseEl(i) {
      var n,
          o = e.items[i];

      if (o.tagName ? o = {
        el: t(o)
      } : (n = o.type, o = {
        data: o,
        src: o.src
      }), o.el) {
        for (var s = e.types, r = 0; r < s.length; r++) {
          if (o.el.hasClass("mfp-" + s[r])) {
            n = s[r];
            break;
          }
        }

        o.src = o.el.attr("data-mfp-src"), o.src || (o.src = o.el.attr("href"));
      }

      return o.type = n || e.st.type || "inline", o.index = i, o.parsed = !0, e.items[i] = o, I("ElementParse", o), e.items[i];
    },
    addGroup: function addGroup(t, i) {
      var n = function n(_n) {
        _n.mfpEl = this, e._openClick(_n, t, i);
      };

      i || (i = {});
      var o = "click.magnificPopup";
      i.mainEl = t, i.items ? (i.isObj = !0, t.off(o).on(o, n)) : (i.isObj = !1, i.delegate ? t.off(o).on(o, i.delegate, n) : (i.items = t, t.off(o).on(o, n)));
    },
    _openClick: function _openClick(i, n, o) {
      if ((void 0 !== o.midClick ? o.midClick : t.magnificPopup.defaults.midClick) || !(2 === i.which || i.ctrlKey || i.metaKey || i.altKey || i.shiftKey)) {
        var s = void 0 !== o.disableOn ? o.disableOn : t.magnificPopup.defaults.disableOn;
        if (s) if (t.isFunction(s)) {
          if (!s.call(e)) return !0;
        } else if (y.width() < s) return !0;
        i.type && (i.preventDefault(), e.isOpen && i.stopPropagation()), o.el = t(i.mfpEl), o.delegate && (o.items = n.find(o.delegate)), e.open(o);
      }
    },
    updateStatus: function updateStatus(t, n) {
      if (e.preloader) {
        i !== t && e.container.removeClass("mfp-s-" + i), n || "loading" !== t || (n = e.st.tLoading);
        var o = {
          status: t,
          text: n
        };
        I("UpdateStatus", o), t = o.status, n = o.text, e.preloader.html(n), e.preloader.find("a").on("click", function (t) {
          t.stopImmediatePropagation();
        }), e.container.addClass("mfp-s-" + t), i = t;
      }
    },
    _checkIfClose: function _checkIfClose(i) {
      if (!t(i).hasClass(g)) {
        var n = e.st.closeOnContentClick,
            o = e.st.closeOnBgClick;
        if (n && o) return !0;
        if (!e.content || t(i).hasClass("mfp-close") || e.preloader && i === e.preloader[0]) return !0;

        if (i === e.content[0] || t.contains(e.content[0], i)) {
          if (n) return !0;
        } else if (o && t.contains(document, i)) return !0;

        return !1;
      }
    },
    _addClassToMFP: function _addClassToMFP(t) {
      e.bgOverlay.addClass(t), e.wrap.addClass(t);
    },
    _removeClassFromMFP: function _removeClassFromMFP(t) {
      this.bgOverlay.removeClass(t), e.wrap.removeClass(t);
    },
    _hasScrollBar: function _hasScrollBar(t) {
      return (e.isIE7 ? n.height() : document.body.scrollHeight) > (t || y.height());
    },
    _setFocus: function _setFocus() {
      (e.st.focus ? e.content.find(e.st.focus).eq(0) : e.wrap).focus();
    },
    _onFocusIn: function _onFocusIn(i) {
      return i.target === e.wrap[0] || t.contains(e.wrap[0], i.target) ? void 0 : (e._setFocus(), !1);
    },
    _parseMarkup: function _parseMarkup(e, i, n) {
      var o;
      n.data && (i = t.extend(n.data, i)), I(c, [e, i, n]), t.each(i, function (i, n) {
        if (void 0 === n || !1 === n) return !0;

        if ((o = i.split("_")).length > 1) {
          var s = e.find(m + "-" + o[0]);

          if (s.length > 0) {
            var r = o[1];
            "replaceWith" === r ? s[0] !== n[0] && s.replaceWith(n) : "img" === r ? s.is("img") ? s.attr("src", n) : s.replaceWith(t("<img>").attr("src", n).attr("class", s.attr("class"))) : s.attr(o[1], n);
          }
        } else e.find(m + "-" + i).html(n);
      });
    },
    _getScrollbarSize: function _getScrollbarSize() {
      if (void 0 === e.scrollbarSize) {
        var t = document.createElement("div");
        t.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(t), e.scrollbarSize = t.offsetWidth - t.clientWidth, document.body.removeChild(t);
      }

      return e.scrollbarSize;
    }
  }, t.magnificPopup = {
    instance: null,
    proto: v.prototype,
    modules: [],
    open: function open(e, i) {
      return S(), (e = e ? t.extend(!0, {}, e) : {}).isObj = !0, e.index = i || 0, this.instance.open(e);
    },
    close: function close() {
      return t.magnificPopup.instance && t.magnificPopup.instance.close();
    },
    registerModule: function registerModule(e, i) {
      i.options && (t.magnificPopup.defaults[e] = i.options), t.extend(this.proto, i.proto), this.modules.push(e);
    },
    defaults: {
      disableOn: 0,
      key: null,
      midClick: !1,
      mainClass: "",
      preloader: !0,
      focus: "",
      closeOnContentClick: !1,
      closeOnBgClick: !0,
      closeBtnInside: !0,
      showCloseBtn: !0,
      enableEscapeKey: !0,
      modal: !1,
      alignTop: !1,
      removalDelay: 0,
      prependTo: null,
      fixedContentPos: "auto",
      fixedBgPos: "auto",
      overflowY: "auto",
      closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
      tClose: "Close (Esc)",
      tLoading: "Loading...",
      autoFocusLast: !0
    }
  }, t.fn.magnificPopup = function (i) {
    S();
    var n = t(this);
    if ("string" == typeof i) {
      if ("open" === i) {
        var o,
            s = w ? n.data("magnificPopup") : n[0].magnificPopup,
            r = parseInt(arguments[1], 10) || 0;
        s.items ? o = s.items[r] : (o = n, s.delegate && (o = o.find(s.delegate)), o = o.eq(r)), e._openClick({
          mfpEl: o
        }, n, s);
      } else e.isOpen && e[i].apply(e, Array.prototype.slice.call(arguments, 1));
    } else i = t.extend(!0, {}, i), w ? n.data("magnificPopup", i) : n[0].magnificPopup = i, e.addGroup(n, i);
    return n;
  };

  var k,
      T,
      P,
      E = "inline",
      A = function A() {
    P && (T.after(P.addClass(k)).detach(), P = null);
  };

  t.magnificPopup.registerModule(E, {
    options: {
      hiddenClass: "hide",
      markup: "",
      tNotFound: "Content not found"
    },
    proto: {
      initInline: function initInline() {
        e.types.push(E), b(a + "." + E, function () {
          A();
        });
      },
      getInline: function getInline(i, n) {
        if (A(), i.src) {
          var o = e.st.inline,
              s = t(i.src);

          if (s.length) {
            var r = s[0].parentNode;
            r && r.tagName && (T || (k = o.hiddenClass, T = C(k), k = "mfp-" + k), P = s.after(T).detach().removeClass(k)), e.updateStatus("ready");
          } else e.updateStatus("error", o.tNotFound), s = t("<div>");

          return i.inlineElement = s, s;
        }

        return e.updateStatus("ready"), e._parseMarkup(n, {}, i), n;
      }
    }
  });

  var M,
      O = "ajax",
      z = function z() {
    M && t(document.body).removeClass(M);
  },
      _ = function _() {
    z(), e.req && e.req.abort();
  };

  t.magnificPopup.registerModule(O, {
    options: {
      settings: null,
      cursor: "mfp-ajax-cur",
      tError: '<a href="%url%">The content</a> could not be loaded.'
    },
    proto: {
      initAjax: function initAjax() {
        e.types.push(O), M = e.st.ajax.cursor, b(a + "." + O, _), b("BeforeChange." + O, _);
      },
      getAjax: function getAjax(i) {
        M && t(document.body).addClass(M), e.updateStatus("loading");
        var n = t.extend({
          url: i.src,
          success: function success(n, o, s) {
            var r = {
              data: n,
              xhr: s
            };
            I("ParseAjax", r), e.appendContent(t(r.data), O), i.finished = !0, z(), e._setFocus(), setTimeout(function () {
              e.wrap.addClass(f);
            }, 16), e.updateStatus("ready"), I("AjaxContentAdded");
          },
          error: function error() {
            z(), i.finished = i.loadError = !0, e.updateStatus("error", e.st.ajax.tError.replace("%url%", i.src));
          }
        }, e.st.ajax.settings);
        return e.req = t.ajax(n), "";
      }
    }
  });

  var H,
      D,
      W = function W(i) {
    if (i.data && void 0 !== i.data.title) return i.data.title;
    var n = e.st.image.titleSrc;

    if (n) {
      if (t.isFunction(n)) return n.call(e, i);
      if (i.el) return i.el.attr(n) || "";
    }

    return "";
  };

  t.magnificPopup.registerModule("image", {
    options: {
      markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
      cursor: "mfp-zoom-out-cur",
      titleSrc: "title",
      verticalFit: !0,
      tError: '<a href="%url%">The image</a> could not be loaded.'
    },
    proto: {
      initImage: function initImage() {
        var i = e.st.image,
            n = ".image";
        e.types.push("image"), b(u + n, function () {
          "image" === e.currItem.type && i.cursor && t(document.body).addClass(i.cursor);
        }), b(a + n, function () {
          i.cursor && t(document.body).removeClass(i.cursor), y.off("resize" + m);
        }), b("Resize" + n, e.resizeImage), e.isLowIE && b("AfterChange", e.resizeImage);
      },
      resizeImage: function resizeImage() {
        var t = e.currItem;

        if (t && t.img && e.st.image.verticalFit) {
          var i = 0;
          e.isLowIE && (i = parseInt(t.img.css("padding-top"), 10) + parseInt(t.img.css("padding-bottom"), 10)), t.img.css("max-height", e.wH - i);
        }
      },
      _onImageHasSize: function _onImageHasSize(t) {
        t.img && (t.hasSize = !0, H && clearInterval(H), t.isCheckingImgSize = !1, I("ImageHasSize", t), t.imgHidden && (e.content && e.content.removeClass("mfp-loading"), t.imgHidden = !1));
      },
      findImageSize: function findImageSize(t) {
        var i = 0,
            n = t.img[0],
            o = function o(s) {
          H && clearInterval(H), H = setInterval(function () {
            return n.naturalWidth > 0 ? void e._onImageHasSize(t) : (i > 200 && clearInterval(H), void (3 == ++i ? o(10) : 40 === i ? o(50) : 100 === i && o(500)));
          }, s);
        };

        o(1);
      },
      getImage: function getImage(i, n) {
        var o = 0,
            s = function s() {
          i && (i.img[0].complete ? (i.img.off(".mfploader"), i === e.currItem && (e._onImageHasSize(i), e.updateStatus("ready")), i.hasSize = !0, i.loaded = !0, I("ImageLoadComplete")) : 200 > ++o ? setTimeout(s, 100) : r());
        },
            r = function r() {
          i && (i.img.off(".mfploader"), i === e.currItem && (e._onImageHasSize(i), e.updateStatus("error", a.tError.replace("%url%", i.src))), i.hasSize = !0, i.loaded = !0, i.loadError = !0);
        },
            a = e.st.image,
            l = n.find(".mfp-img");

        if (l.length) {
          var c = document.createElement("img");
          c.className = "mfp-img", i.el && i.el.find("img").length && (c.alt = i.el.find("img").attr("alt")), i.img = t(c).on("load.mfploader", s).on("error.mfploader", r), c.src = i.src, l.is("img") && (i.img = i.img.clone()), (c = i.img[0]).naturalWidth > 0 ? i.hasSize = !0 : c.width || (i.hasSize = !1);
        }

        return e._parseMarkup(n, {
          title: W(i),
          img_replaceWith: i.img
        }, i), e.resizeImage(), i.hasSize ? (H && clearInterval(H), i.loadError ? (n.addClass("mfp-loading"), e.updateStatus("error", a.tError.replace("%url%", i.src))) : (n.removeClass("mfp-loading"), e.updateStatus("ready")), n) : (e.updateStatus("loading"), i.loading = !0, i.hasSize || (i.imgHidden = !0, n.addClass("mfp-loading"), e.findImageSize(i)), n);
      }
    }
  }), t.magnificPopup.registerModule("zoom", {
    options: {
      enabled: !1,
      easing: "ease-in-out",
      duration: 300,
      opener: function opener(t) {
        return t.is("img") ? t : t.find("img");
      }
    },
    proto: {
      initZoom: function initZoom() {
        var t,
            i = e.st.zoom,
            n = ".zoom";

        if (i.enabled && e.supportsTransition) {
          var o,
              s,
              r = i.duration,
              c = function c(t) {
            var e = t.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                n = "all " + i.duration / 1e3 + "s " + i.easing,
                o = {
              position: "fixed",
              zIndex: 9999,
              left: 0,
              top: 0,
              "-webkit-backface-visibility": "hidden"
            },
                s = "transition";
            return o["-webkit-" + s] = o["-moz-" + s] = o["-o-" + s] = o[s] = n, e.css(o), e;
          },
              u = function u() {
            e.content.css("visibility", "visible");
          };

          b("BuildControls" + n, function () {
            if (e._allowZoom()) {
              if (clearTimeout(o), e.content.css("visibility", "hidden"), !(t = e._getItemToZoom())) return void u();
              (s = c(t)).css(e._getOffset()), e.wrap.append(s), o = setTimeout(function () {
                s.css(e._getOffset(!0)), o = setTimeout(function () {
                  u(), setTimeout(function () {
                    s.remove(), t = s = null, I("ZoomAnimationEnded");
                  }, 16);
                }, r);
              }, 16);
            }
          }), b(l + n, function () {
            if (e._allowZoom()) {
              if (clearTimeout(o), e.st.removalDelay = r, !t) {
                if (!(t = e._getItemToZoom())) return;
                s = c(t);
              }

              s.css(e._getOffset(!0)), e.wrap.append(s), e.content.css("visibility", "hidden"), setTimeout(function () {
                s.css(e._getOffset());
              }, 16);
            }
          }), b(a + n, function () {
            e._allowZoom() && (u(), s && s.remove(), t = null);
          });
        }
      },
      _allowZoom: function _allowZoom() {
        return "image" === e.currItem.type;
      },
      _getItemToZoom: function _getItemToZoom() {
        return !!e.currItem.hasSize && e.currItem.img;
      },
      _getOffset: function _getOffset(i) {
        var n,
            o = (n = i ? e.currItem.img : e.st.zoom.opener(e.currItem.el || e.currItem)).offset(),
            s = parseInt(n.css("padding-top"), 10),
            r = parseInt(n.css("padding-bottom"), 10);
        o.top -= t(window).scrollTop() - s;
        var a = {
          width: n.width(),
          height: (w ? n.innerHeight() : n[0].offsetHeight) - r - s
        };
        return void 0 === D && (D = void 0 !== document.createElement("p").style.MozTransform), D ? a["-moz-transform"] = a.transform = "translate(" + o.left + "px," + o.top + "px)" : (a.left = o.left, a.top = o.top), a;
      }
    }
  });

  var $ = "iframe",
      B = function B(t) {
    if (e.currTemplate[$]) {
      var i = e.currTemplate[$].find("iframe");
      i.length && (t || (i[0].src = "//about:blank"), e.isIE8 && i.css("display", t ? "block" : "none"));
    }
  };

  t.magnificPopup.registerModule($, {
    options: {
      markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
      srcAction: "iframe_src",
      patterns: {
        youtube: {
          index: "youtube.com",
          id: "v=",
          src: "//www.youtube.com/embed/%id%?autoplay=1"
        },
        vimeo: {
          index: "vimeo.com/",
          id: "/",
          src: "//player.vimeo.com/video/%id%?autoplay=1"
        },
        gmaps: {
          index: "//maps.google.",
          src: "%id%&output=embed"
        }
      }
    },
    proto: {
      initIframe: function initIframe() {
        e.types.push($), b("BeforeChange", function (t, e, i) {
          e !== i && (e === $ ? B() : i === $ && B(!0));
        }), b(a + "." + $, function () {
          B();
        });
      },
      getIframe: function getIframe(i, n) {
        var o = i.src,
            s = e.st.iframe;
        t.each(s.patterns, function () {
          return o.indexOf(this.index) > -1 ? (this.id && (o = "string" == typeof this.id ? o.substr(o.lastIndexOf(this.id) + this.id.length, o.length) : this.id.call(this, o)), o = this.src.replace("%id%", o), !1) : void 0;
        });
        var r = {};
        return s.srcAction && (r[s.srcAction] = o), e._parseMarkup(n, r, i), e.updateStatus("ready"), n;
      }
    }
  });

  var L = function L(t) {
    var i = e.items.length;
    return t > i - 1 ? t - i : 0 > t ? i + t : t;
  },
      j = function j(t, e, i) {
    return t.replace(/%curr%/gi, e + 1).replace(/%total%/gi, i);
  };

  t.magnificPopup.registerModule("gallery", {
    options: {
      enabled: !1,
      arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
      preload: [0, 2],
      navigateByImgClick: !0,
      arrows: !0,
      tPrev: "Previous (Left arrow key)",
      tNext: "Next (Right arrow key)",
      tCounter: "%curr% of %total%"
    },
    proto: {
      initGallery: function initGallery() {
        var i = e.st.gallery,
            o = ".mfp-gallery";
        return e.direction = !0, !(!i || !i.enabled) && (s += " mfp-gallery", b(u + o, function () {
          i.navigateByImgClick && e.wrap.on("click" + o, ".mfp-img", function () {
            return e.items.length > 1 ? (e.next(), !1) : void 0;
          }), n.on("keydown" + o, function (t) {
            37 === t.keyCode ? e.prev() : 39 === t.keyCode && e.next();
          });
        }), b("UpdateStatus" + o, function (t, i) {
          i.text && (i.text = j(i.text, e.currItem.index, e.items.length));
        }), b(c + o, function (t, n, o, s) {
          var r = e.items.length;
          o.counter = r > 1 ? j(i.tCounter, s.index, r) : "";
        }), b("BuildControls" + o, function () {
          if (e.items.length > 1 && i.arrows && !e.arrowLeft) {
            var n = i.arrowMarkup,
                o = e.arrowLeft = t(n.replace(/%title%/gi, i.tPrev).replace(/%dir%/gi, "left")).addClass(g),
                s = e.arrowRight = t(n.replace(/%title%/gi, i.tNext).replace(/%dir%/gi, "right")).addClass(g);
            o.click(function () {
              e.prev();
            }), s.click(function () {
              e.next();
            }), e.container.append(o.add(s));
          }
        }), b(p + o, function () {
          e._preloadTimeout && clearTimeout(e._preloadTimeout), e._preloadTimeout = setTimeout(function () {
            e.preloadNearbyImages(), e._preloadTimeout = null;
          }, 16);
        }), void b(a + o, function () {
          n.off(o), e.wrap.off("click" + o), e.arrowRight = e.arrowLeft = null;
        }));
      },
      next: function next() {
        e.direction = !0, e.index = L(e.index + 1), e.updateItemHTML();
      },
      prev: function prev() {
        e.direction = !1, e.index = L(e.index - 1), e.updateItemHTML();
      },
      goTo: function goTo(t) {
        e.direction = t >= e.index, e.index = t, e.updateItemHTML();
      },
      preloadNearbyImages: function preloadNearbyImages() {
        var t,
            i = e.st.gallery.preload,
            n = Math.min(i[0], e.items.length),
            o = Math.min(i[1], e.items.length);

        for (t = 1; t <= (e.direction ? o : n); t++) {
          e._preloadItem(e.index + t);
        }

        for (t = 1; t <= (e.direction ? n : o); t++) {
          e._preloadItem(e.index - t);
        }
      },
      _preloadItem: function _preloadItem(i) {
        if (i = L(i), !e.items[i].preloaded) {
          var n = e.items[i];
          n.parsed || (n = e.parseEl(i)), I("LazyLoad", n), "image" === n.type && (n.img = t('<img class="mfp-img" />').on("load.mfploader", function () {
            n.hasSize = !0;
          }).on("error.mfploader", function () {
            n.hasSize = !0, n.loadError = !0, I("LazyLoadError", n);
          }).attr("src", n.src)), n.preloaded = !0;
        }
      }
    }
  });
  var F = "retina";
  t.magnificPopup.registerModule(F, {
    options: {
      replaceSrc: function replaceSrc(t) {
        return t.src.replace(/\.\w+$/, function (t) {
          return "@2x" + t;
        });
      },
      ratio: 1
    },
    proto: {
      initRetina: function initRetina() {
        if (window.devicePixelRatio > 1) {
          var t = e.st.retina,
              i = t.ratio;
          (i = isNaN(i) ? i() : i) > 1 && (b("ImageHasSize." + F, function (t, e) {
            e.img.css({
              "max-width": e.img[0].naturalWidth / i,
              width: "100%"
            });
          }), b("ElementParse." + F, function (e, n) {
            n.src = t.replaceSrc(n, i);
          }));
        }
      }
    }
  }), S();
}), function (t) {
  "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? require("jquery") : window.jQuery || window.Zepto);
}(function (t) {
  var e,
      i,
      n,
      o,
      s,
      r,
      a = "Close",
      l = "BeforeClose",
      c = "MarkupParse",
      u = "Open",
      p = "Change",
      d = "mfp",
      m = "." + d,
      f = "mfp-ready",
      h = "mfp-removing",
      g = "mfp-prevent-close",
      v = function v() {},
      w = !!window.jQuery,
      y = t(window),
      b = function b(t, i) {
    e.ev.on(d + t + m, i);
  },
      C = function C(e, i, n, o) {
    var s = document.createElement("div");
    return s.className = "mfp-" + e, n && (s.innerHTML = n), o ? i && i.appendChild(s) : (s = t(s), i && s.appendTo(i)), s;
  },
      I = function I(i, n) {
    e.ev.triggerHandler(d + i, n), e.st.callbacks && (i = i.charAt(0).toLowerCase() + i.slice(1), e.st.callbacks[i] && e.st.callbacks[i].apply(e, t.isArray(n) ? n : [n]));
  },
      x = function x(i) {
    return i === r && e.currTemplate.closeBtn || (e.currTemplate.closeBtn = t(e.st.closeMarkup.replace("%title%", e.st.tClose)), r = i), e.currTemplate.closeBtn;
  },
      S = function S() {
    t.magnificPopup.instance || ((e = new v()).init(), t.magnificPopup.instance = e);
  };

  v.prototype = {
    constructor: v,
    init: function init() {
      var i = navigator.appVersion;
      e.isLowIE = e.isIE8 = document.all && !document.addEventListener, e.isAndroid = /android/gi.test(i), e.isIOS = /iphone|ipad|ipod/gi.test(i), e.supportsTransition = function () {
        var t = document.createElement("p").style,
            e = ["ms", "O", "Moz", "Webkit"];
        if (void 0 !== t.transition) return !0;

        for (; e.length;) {
          if (e.pop() + "Transition" in t) return !0;
        }

        return !1;
      }(), e.probablyMobile = e.isAndroid || e.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), n = t(document), e.popupsCache = {};
    },
    open: function open(i) {
      var o;

      if (!1 === i.isObj) {
        e.items = i.items.toArray(), e.index = 0;
        var r,
            a = i.items;

        for (o = 0; o < a.length; o++) {
          if ((r = a[o]).parsed && (r = r.el[0]), r === i.el[0]) {
            e.index = o;
            break;
          }
        }
      } else e.items = t.isArray(i.items) ? i.items : [i.items], e.index = i.index || 0;

      if (!e.isOpen) {
        e.types = [], s = "", i.mainEl && i.mainEl.length ? e.ev = i.mainEl.eq(0) : e.ev = n, i.key ? (e.popupsCache[i.key] || (e.popupsCache[i.key] = {}), e.currTemplate = e.popupsCache[i.key]) : e.currTemplate = {}, e.st = t.extend(!0, {}, t.magnificPopup.defaults, i), e.fixedContentPos = "auto" === e.st.fixedContentPos ? !e.probablyMobile : e.st.fixedContentPos, e.st.modal && (e.st.closeOnContentClick = !1, e.st.closeOnBgClick = !1, e.st.showCloseBtn = !1, e.st.enableEscapeKey = !1), e.bgOverlay || (e.bgOverlay = C("bg").on("click" + m, function () {
          e.close();
        }), e.wrap = C("wrap").attr("tabindex", -1).on("click" + m, function (t) {
          e._checkIfClose(t.target) && e.close();
        }), e.container = C("container", e.wrap)), e.contentContainer = C("content"), e.st.preloader && (e.preloader = C("preloader", e.container, e.st.tLoading));
        var l = t.magnificPopup.modules;

        for (o = 0; o < l.length; o++) {
          var p = l[o];
          p = p.charAt(0).toUpperCase() + p.slice(1), e["init" + p].call(e);
        }

        I("BeforeOpen"), e.st.showCloseBtn && (e.st.closeBtnInside ? (b(c, function (t, e, i, n) {
          i.close_replaceWith = x(n.type);
        }), s += " mfp-close-btn-in") : e.wrap.append(x())), e.st.alignTop && (s += " mfp-align-top"), e.fixedContentPos ? e.wrap.css({
          overflow: e.st.overflowY,
          overflowX: "hidden",
          overflowY: e.st.overflowY
        }) : e.wrap.css({
          top: y.scrollTop(),
          position: "absolute"
        }), (!1 === e.st.fixedBgPos || "auto" === e.st.fixedBgPos && !e.fixedContentPos) && e.bgOverlay.css({
          height: n.height(),
          position: "absolute"
        }), e.st.enableEscapeKey && n.on("keyup" + m, function (t) {
          27 === t.keyCode && e.close();
        }), y.on("resize" + m, function () {
          e.updateSize();
        }), e.st.closeOnContentClick || (s += " mfp-auto-cursor"), s && e.wrap.addClass(s);
        var d = e.wH = y.height(),
            h = {};

        if (e.fixedContentPos && e._hasScrollBar(d)) {
          var g = e._getScrollbarSize();

          g && (h.marginRight = g);
        }

        e.fixedContentPos && (e.isIE7 ? t("body, html").css("overflow", "hidden") : h.overflow = "hidden");
        var v = e.st.mainClass;
        return e.isIE7 && (v += " mfp-ie7"), v && e._addClassToMFP(v), e.updateItemHTML(), I("BuildControls"), t("html").css(h), e.bgOverlay.add(e.wrap).prependTo(e.st.prependTo || t(document.body)), e._lastFocusedEl = document.activeElement, setTimeout(function () {
          e.content ? (e._addClassToMFP(f), e._setFocus()) : e.bgOverlay.addClass(f), n.on("focusin" + m, e._onFocusIn);
        }, 16), e.isOpen = !0, e.updateSize(d), I(u), i;
      }

      e.updateItemHTML();
    },
    close: function close() {
      e.isOpen && (I(l), e.isOpen = !1, e.st.removalDelay && !e.isLowIE && e.supportsTransition ? (e._addClassToMFP(h), setTimeout(function () {
        e._close();
      }, e.st.removalDelay)) : e._close());
    },
    _close: function _close() {
      I(a);
      var i = h + " " + f + " ";

      if (e.bgOverlay.detach(), e.wrap.detach(), e.container.empty(), e.st.mainClass && (i += e.st.mainClass + " "), e._removeClassFromMFP(i), e.fixedContentPos) {
        var o = {
          marginRight: ""
        };
        e.isIE7 ? t("body, html").css("overflow", "") : o.overflow = "", t("html").css(o);
      }

      n.off("keyup.mfp focusin" + m), e.ev.off(m), e.wrap.attr("class", "mfp-wrap").removeAttr("style"), e.bgOverlay.attr("class", "mfp-bg"), e.container.attr("class", "mfp-container"), !e.st.showCloseBtn || e.st.closeBtnInside && !0 !== e.currTemplate[e.currItem.type] || e.currTemplate.closeBtn && e.currTemplate.closeBtn.detach(), e.st.autoFocusLast && e._lastFocusedEl && t(e._lastFocusedEl).focus(), e.currItem = null, e.content = null, e.currTemplate = null, e.prevHeight = 0, I("AfterClose");
    },
    updateSize: function updateSize(t) {
      if (e.isIOS) {
        var i = document.documentElement.clientWidth / window.innerWidth,
            n = window.innerHeight * i;
        e.wrap.css("height", n), e.wH = n;
      } else e.wH = t || y.height();

      e.fixedContentPos || e.wrap.css("height", e.wH), I("Resize");
    },
    updateItemHTML: function updateItemHTML() {
      var i = e.items[e.index];
      e.contentContainer.detach(), e.content && e.content.detach(), i.parsed || (i = e.parseEl(e.index));
      var n = i.type;

      if (I("BeforeChange", [e.currItem ? e.currItem.type : "", n]), e.currItem = i, !e.currTemplate[n]) {
        var s = !!e.st[n] && e.st[n].markup;
        I("FirstMarkupParse", s), e.currTemplate[n] = !s || t(s);
      }

      o && o !== i.type && e.container.removeClass("mfp-" + o + "-holder");
      var r = e["get" + n.charAt(0).toUpperCase() + n.slice(1)](i, e.currTemplate[n]);
      e.appendContent(r, n), i.preloaded = !0, I(p, i), o = i.type, e.container.prepend(e.contentContainer), I("AfterChange");
    },
    appendContent: function appendContent(t, i) {
      e.content = t, t ? e.st.showCloseBtn && e.st.closeBtnInside && !0 === e.currTemplate[i] ? e.content.find(".mfp-close").length || e.content.append(x()) : e.content = t : e.content = "", I("BeforeAppend"), e.container.addClass("mfp-" + i + "-holder"), e.contentContainer.append(e.content);
    },
    parseEl: function parseEl(i) {
      var n,
          o = e.items[i];

      if (o.tagName ? o = {
        el: t(o)
      } : (n = o.type, o = {
        data: o,
        src: o.src
      }), o.el) {
        for (var s = e.types, r = 0; r < s.length; r++) {
          if (o.el.hasClass("mfp-" + s[r])) {
            n = s[r];
            break;
          }
        }

        o.src = o.el.attr("data-mfp-src"), o.src || (o.src = o.el.attr("href"));
      }

      return o.type = n || e.st.type || "inline", o.index = i, o.parsed = !0, e.items[i] = o, I("ElementParse", o), e.items[i];
    },
    addGroup: function addGroup(t, i) {
      var n = function n(_n2) {
        _n2.mfpEl = this, e._openClick(_n2, t, i);
      };

      i || (i = {});
      var o = "click.magnificPopup";
      i.mainEl = t, i.items ? (i.isObj = !0, t.off(o).on(o, n)) : (i.isObj = !1, i.delegate ? t.off(o).on(o, i.delegate, n) : (i.items = t, t.off(o).on(o, n)));
    },
    _openClick: function _openClick(i, n, o) {
      if ((void 0 !== o.midClick ? o.midClick : t.magnificPopup.defaults.midClick) || !(2 === i.which || i.ctrlKey || i.metaKey || i.altKey || i.shiftKey)) {
        var s = void 0 !== o.disableOn ? o.disableOn : t.magnificPopup.defaults.disableOn;
        if (s) if (t.isFunction(s)) {
          if (!s.call(e)) return !0;
        } else if (y.width() < s) return !0;
        i.type && (i.preventDefault(), e.isOpen && i.stopPropagation()), o.el = t(i.mfpEl), o.delegate && (o.items = n.find(o.delegate)), e.open(o);
      }
    },
    updateStatus: function updateStatus(t, n) {
      if (e.preloader) {
        i !== t && e.container.removeClass("mfp-s-" + i), n || "loading" !== t || (n = e.st.tLoading);
        var o = {
          status: t,
          text: n
        };
        I("UpdateStatus", o), t = o.status, n = o.text, e.preloader.html(n), e.preloader.find("a").on("click", function (t) {
          t.stopImmediatePropagation();
        }), e.container.addClass("mfp-s-" + t), i = t;
      }
    },
    _checkIfClose: function _checkIfClose(i) {
      if (!t(i).hasClass(g)) {
        var n = e.st.closeOnContentClick,
            o = e.st.closeOnBgClick;
        if (n && o) return !0;
        if (!e.content || t(i).hasClass("mfp-close") || e.preloader && i === e.preloader[0]) return !0;

        if (i === e.content[0] || t.contains(e.content[0], i)) {
          if (n) return !0;
        } else if (o && t.contains(document, i)) return !0;

        return !1;
      }
    },
    _addClassToMFP: function _addClassToMFP(t) {
      e.bgOverlay.addClass(t), e.wrap.addClass(t);
    },
    _removeClassFromMFP: function _removeClassFromMFP(t) {
      this.bgOverlay.removeClass(t), e.wrap.removeClass(t);
    },
    _hasScrollBar: function _hasScrollBar(t) {
      return (e.isIE7 ? n.height() : document.body.scrollHeight) > (t || y.height());
    },
    _setFocus: function _setFocus() {
      (e.st.focus ? e.content.find(e.st.focus).eq(0) : e.wrap).focus();
    },
    _onFocusIn: function _onFocusIn(i) {
      return i.target === e.wrap[0] || t.contains(e.wrap[0], i.target) ? void 0 : (e._setFocus(), !1);
    },
    _parseMarkup: function _parseMarkup(e, i, n) {
      var o;
      n.data && (i = t.extend(n.data, i)), I(c, [e, i, n]), t.each(i, function (i, n) {
        if (void 0 === n || !1 === n) return !0;

        if ((o = i.split("_")).length > 1) {
          var s = e.find(m + "-" + o[0]);

          if (s.length > 0) {
            var r = o[1];
            "replaceWith" === r ? s[0] !== n[0] && s.replaceWith(n) : "img" === r ? s.is("img") ? s.attr("src", n) : s.replaceWith(t("<img>").attr("src", n).attr("class", s.attr("class"))) : s.attr(o[1], n);
          }
        } else e.find(m + "-" + i).html(n);
      });
    },
    _getScrollbarSize: function _getScrollbarSize() {
      if (void 0 === e.scrollbarSize) {
        var t = document.createElement("div");
        t.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(t), e.scrollbarSize = t.offsetWidth - t.clientWidth, document.body.removeChild(t);
      }

      return e.scrollbarSize;
    }
  }, t.magnificPopup = {
    instance: null,
    proto: v.prototype,
    modules: [],
    open: function open(e, i) {
      return S(), (e = e ? t.extend(!0, {}, e) : {}).isObj = !0, e.index = i || 0, this.instance.open(e);
    },
    close: function close() {
      return t.magnificPopup.instance && t.magnificPopup.instance.close();
    },
    registerModule: function registerModule(e, i) {
      i.options && (t.magnificPopup.defaults[e] = i.options), t.extend(this.proto, i.proto), this.modules.push(e);
    },
    defaults: {
      disableOn: 0,
      key: null,
      midClick: !1,
      mainClass: "",
      preloader: !0,
      focus: "",
      closeOnContentClick: !1,
      closeOnBgClick: !0,
      closeBtnInside: !0,
      showCloseBtn: !0,
      enableEscapeKey: !0,
      modal: !1,
      alignTop: !1,
      removalDelay: 0,
      prependTo: null,
      fixedContentPos: "auto",
      fixedBgPos: "auto",
      overflowY: "auto",
      closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
      tClose: "Close (Esc)",
      tLoading: "Loading...",
      autoFocusLast: !0
    }
  }, t.fn.magnificPopup = function (i) {
    S();
    var n = t(this);
    if ("string" == typeof i) {
      if ("open" === i) {
        var o,
            s = w ? n.data("magnificPopup") : n[0].magnificPopup,
            r = parseInt(arguments[1], 10) || 0;
        s.items ? o = s.items[r] : (o = n, s.delegate && (o = o.find(s.delegate)), o = o.eq(r)), e._openClick({
          mfpEl: o
        }, n, s);
      } else e.isOpen && e[i].apply(e, Array.prototype.slice.call(arguments, 1));
    } else i = t.extend(!0, {}, i), w ? n.data("magnificPopup", i) : n[0].magnificPopup = i, e.addGroup(n, i);
    return n;
  };

  var k,
      T,
      P,
      E = "inline",
      A = function A() {
    P && (T.after(P.addClass(k)).detach(), P = null);
  };

  t.magnificPopup.registerModule(E, {
    options: {
      hiddenClass: "hide",
      markup: "",
      tNotFound: "Content not found"
    },
    proto: {
      initInline: function initInline() {
        e.types.push(E), b(a + "." + E, function () {
          A();
        });
      },
      getInline: function getInline(i, n) {
        if (A(), i.src) {
          var o = e.st.inline,
              s = t(i.src);

          if (s.length) {
            var r = s[0].parentNode;
            r && r.tagName && (T || (k = o.hiddenClass, T = C(k), k = "mfp-" + k), P = s.after(T).detach().removeClass(k)), e.updateStatus("ready");
          } else e.updateStatus("error", o.tNotFound), s = t("<div>");

          return i.inlineElement = s, s;
        }

        return e.updateStatus("ready"), e._parseMarkup(n, {}, i), n;
      }
    }
  });

  var M,
      O = "ajax",
      z = function z() {
    M && t(document.body).removeClass(M);
  },
      _ = function _() {
    z(), e.req && e.req.abort();
  };

  t.magnificPopup.registerModule(O, {
    options: {
      settings: null,
      cursor: "mfp-ajax-cur",
      tError: '<a href="%url%">The content</a> could not be loaded.'
    },
    proto: {
      initAjax: function initAjax() {
        e.types.push(O), M = e.st.ajax.cursor, b(a + "." + O, _), b("BeforeChange." + O, _);
      },
      getAjax: function getAjax(i) {
        M && t(document.body).addClass(M), e.updateStatus("loading");
        var n = t.extend({
          url: i.src,
          success: function success(n, o, s) {
            var r = {
              data: n,
              xhr: s
            };
            I("ParseAjax", r), e.appendContent(t(r.data), O), i.finished = !0, z(), e._setFocus(), setTimeout(function () {
              e.wrap.addClass(f);
            }, 16), e.updateStatus("ready"), I("AjaxContentAdded");
          },
          error: function error() {
            z(), i.finished = i.loadError = !0, e.updateStatus("error", e.st.ajax.tError.replace("%url%", i.src));
          }
        }, e.st.ajax.settings);
        return e.req = t.ajax(n), "";
      }
    }
  });

  var H,
      D,
      W = function W(i) {
    if (i.data && void 0 !== i.data.title) return i.data.title;
    var n = e.st.image.titleSrc;

    if (n) {
      if (t.isFunction(n)) return n.call(e, i);
      if (i.el) return i.el.attr(n) || "";
    }

    return "";
  };

  t.magnificPopup.registerModule("image", {
    options: {
      markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
      cursor: "mfp-zoom-out-cur",
      titleSrc: "title",
      verticalFit: !0,
      tError: '<a href="%url%">The image</a> could not be loaded.'
    },
    proto: {
      initImage: function initImage() {
        var i = e.st.image,
            n = ".image";
        e.types.push("image"), b(u + n, function () {
          "image" === e.currItem.type && i.cursor && t(document.body).addClass(i.cursor);
        }), b(a + n, function () {
          i.cursor && t(document.body).removeClass(i.cursor), y.off("resize" + m);
        }), b("Resize" + n, e.resizeImage), e.isLowIE && b("AfterChange", e.resizeImage);
      },
      resizeImage: function resizeImage() {
        var t = e.currItem;

        if (t && t.img && e.st.image.verticalFit) {
          var i = 0;
          e.isLowIE && (i = parseInt(t.img.css("padding-top"), 10) + parseInt(t.img.css("padding-bottom"), 10)), t.img.css("max-height", e.wH - i);
        }
      },
      _onImageHasSize: function _onImageHasSize(t) {
        t.img && (t.hasSize = !0, H && clearInterval(H), t.isCheckingImgSize = !1, I("ImageHasSize", t), t.imgHidden && (e.content && e.content.removeClass("mfp-loading"), t.imgHidden = !1));
      },
      findImageSize: function findImageSize(t) {
        var i = 0,
            n = t.img[0],
            o = function o(s) {
          H && clearInterval(H), H = setInterval(function () {
            return n.naturalWidth > 0 ? void e._onImageHasSize(t) : (i > 200 && clearInterval(H), void (3 == ++i ? o(10) : 40 === i ? o(50) : 100 === i && o(500)));
          }, s);
        };

        o(1);
      },
      getImage: function getImage(i, n) {
        var o = 0,
            s = function s() {
          i && (i.img[0].complete ? (i.img.off(".mfploader"), i === e.currItem && (e._onImageHasSize(i), e.updateStatus("ready")), i.hasSize = !0, i.loaded = !0, I("ImageLoadComplete")) : 200 > ++o ? setTimeout(s, 100) : r());
        },
            r = function r() {
          i && (i.img.off(".mfploader"), i === e.currItem && (e._onImageHasSize(i), e.updateStatus("error", a.tError.replace("%url%", i.src))), i.hasSize = !0, i.loaded = !0, i.loadError = !0);
        },
            a = e.st.image,
            l = n.find(".mfp-img");

        if (l.length) {
          var c = document.createElement("img");
          c.className = "mfp-img", i.el && i.el.find("img").length && (c.alt = i.el.find("img").attr("alt")), i.img = t(c).on("load.mfploader", s).on("error.mfploader", r), c.src = i.src, l.is("img") && (i.img = i.img.clone()), (c = i.img[0]).naturalWidth > 0 ? i.hasSize = !0 : c.width || (i.hasSize = !1);
        }

        return e._parseMarkup(n, {
          title: W(i),
          img_replaceWith: i.img
        }, i), e.resizeImage(), i.hasSize ? (H && clearInterval(H), i.loadError ? (n.addClass("mfp-loading"), e.updateStatus("error", a.tError.replace("%url%", i.src))) : (n.removeClass("mfp-loading"), e.updateStatus("ready")), n) : (e.updateStatus("loading"), i.loading = !0, i.hasSize || (i.imgHidden = !0, n.addClass("mfp-loading"), e.findImageSize(i)), n);
      }
    }
  }), t.magnificPopup.registerModule("zoom", {
    options: {
      enabled: !1,
      easing: "ease-in-out",
      duration: 300,
      opener: function opener(t) {
        return t.is("img") ? t : t.find("img");
      }
    },
    proto: {
      initZoom: function initZoom() {
        var t,
            i = e.st.zoom,
            n = ".zoom";

        if (i.enabled && e.supportsTransition) {
          var o,
              s,
              r = i.duration,
              c = function c(t) {
            var e = t.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                n = "all " + i.duration / 1e3 + "s " + i.easing,
                o = {
              position: "fixed",
              zIndex: 9999,
              left: 0,
              top: 0,
              "-webkit-backface-visibility": "hidden"
            },
                s = "transition";
            return o["-webkit-" + s] = o["-moz-" + s] = o["-o-" + s] = o[s] = n, e.css(o), e;
          },
              u = function u() {
            e.content.css("visibility", "visible");
          };

          b("BuildControls" + n, function () {
            if (e._allowZoom()) {
              if (clearTimeout(o), e.content.css("visibility", "hidden"), !(t = e._getItemToZoom())) return void u();
              (s = c(t)).css(e._getOffset()), e.wrap.append(s), o = setTimeout(function () {
                s.css(e._getOffset(!0)), o = setTimeout(function () {
                  u(), setTimeout(function () {
                    s.remove(), t = s = null, I("ZoomAnimationEnded");
                  }, 16);
                }, r);
              }, 16);
            }
          }), b(l + n, function () {
            if (e._allowZoom()) {
              if (clearTimeout(o), e.st.removalDelay = r, !t) {
                if (!(t = e._getItemToZoom())) return;
                s = c(t);
              }

              s.css(e._getOffset(!0)), e.wrap.append(s), e.content.css("visibility", "hidden"), setTimeout(function () {
                s.css(e._getOffset());
              }, 16);
            }
          }), b(a + n, function () {
            e._allowZoom() && (u(), s && s.remove(), t = null);
          });
        }
      },
      _allowZoom: function _allowZoom() {
        return "image" === e.currItem.type;
      },
      _getItemToZoom: function _getItemToZoom() {
        return !!e.currItem.hasSize && e.currItem.img;
      },
      _getOffset: function _getOffset(i) {
        var n,
            o = (n = i ? e.currItem.img : e.st.zoom.opener(e.currItem.el || e.currItem)).offset(),
            s = parseInt(n.css("padding-top"), 10),
            r = parseInt(n.css("padding-bottom"), 10);
        o.top -= t(window).scrollTop() - s;
        var a = {
          width: n.width(),
          height: (w ? n.innerHeight() : n[0].offsetHeight) - r - s
        };
        return void 0 === D && (D = void 0 !== document.createElement("p").style.MozTransform), D ? a["-moz-transform"] = a.transform = "translate(" + o.left + "px," + o.top + "px)" : (a.left = o.left, a.top = o.top), a;
      }
    }
  });

  var $ = "iframe",
      B = function B(t) {
    if (e.currTemplate[$]) {
      var i = e.currTemplate[$].find("iframe");
      i.length && (t || (i[0].src = "//about:blank"), e.isIE8 && i.css("display", t ? "block" : "none"));
    }
  };

  t.magnificPopup.registerModule($, {
    options: {
      markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
      srcAction: "iframe_src",
      patterns: {
        youtube: {
          index: "youtube.com",
          id: "v=",
          src: "//www.youtube.com/embed/%id%?autoplay=1"
        },
        vimeo: {
          index: "vimeo.com/",
          id: "/",
          src: "//player.vimeo.com/video/%id%?autoplay=1"
        },
        gmaps: {
          index: "//maps.google.",
          src: "%id%&output=embed"
        }
      }
    },
    proto: {
      initIframe: function initIframe() {
        e.types.push($), b("BeforeChange", function (t, e, i) {
          e !== i && (e === $ ? B() : i === $ && B(!0));
        }), b(a + "." + $, function () {
          B();
        });
      },
      getIframe: function getIframe(i, n) {
        var o = i.src,
            s = e.st.iframe;
        t.each(s.patterns, function () {
          return o.indexOf(this.index) > -1 ? (this.id && (o = "string" == typeof this.id ? o.substr(o.lastIndexOf(this.id) + this.id.length, o.length) : this.id.call(this, o)), o = this.src.replace("%id%", o), !1) : void 0;
        });
        var r = {};
        return s.srcAction && (r[s.srcAction] = o), e._parseMarkup(n, r, i), e.updateStatus("ready"), n;
      }
    }
  });

  var L = function L(t) {
    var i = e.items.length;
    return t > i - 1 ? t - i : 0 > t ? i + t : t;
  },
      j = function j(t, e, i) {
    return t.replace(/%curr%/gi, e + 1).replace(/%total%/gi, i);
  };

  t.magnificPopup.registerModule("gallery", {
    options: {
      enabled: !1,
      arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
      preload: [0, 2],
      navigateByImgClick: !0,
      arrows: !0,
      tPrev: "Previous (Left arrow key)",
      tNext: "Next (Right arrow key)",
      tCounter: "%curr% of %total%"
    },
    proto: {
      initGallery: function initGallery() {
        var i = e.st.gallery,
            o = ".mfp-gallery";
        return e.direction = !0, !(!i || !i.enabled) && (s += " mfp-gallery", b(u + o, function () {
          i.navigateByImgClick && e.wrap.on("click" + o, ".mfp-img", function () {
            return e.items.length > 1 ? (e.next(), !1) : void 0;
          }), n.on("keydown" + o, function (t) {
            37 === t.keyCode ? e.prev() : 39 === t.keyCode && e.next();
          });
        }), b("UpdateStatus" + o, function (t, i) {
          i.text && (i.text = j(i.text, e.currItem.index, e.items.length));
        }), b(c + o, function (t, n, o, s) {
          var r = e.items.length;
          o.counter = r > 1 ? j(i.tCounter, s.index, r) : "";
        }), b("BuildControls" + o, function () {
          if (e.items.length > 1 && i.arrows && !e.arrowLeft) {
            var n = i.arrowMarkup,
                o = e.arrowLeft = t(n.replace(/%title%/gi, i.tPrev).replace(/%dir%/gi, "left")).addClass(g),
                s = e.arrowRight = t(n.replace(/%title%/gi, i.tNext).replace(/%dir%/gi, "right")).addClass(g);
            o.click(function () {
              e.prev();
            }), s.click(function () {
              e.next();
            }), e.container.append(o.add(s));
          }
        }), b(p + o, function () {
          e._preloadTimeout && clearTimeout(e._preloadTimeout), e._preloadTimeout = setTimeout(function () {
            e.preloadNearbyImages(), e._preloadTimeout = null;
          }, 16);
        }), void b(a + o, function () {
          n.off(o), e.wrap.off("click" + o), e.arrowRight = e.arrowLeft = null;
        }));
      },
      next: function next() {
        e.direction = !0, e.index = L(e.index + 1), e.updateItemHTML();
      },
      prev: function prev() {
        e.direction = !1, e.index = L(e.index - 1), e.updateItemHTML();
      },
      goTo: function goTo(t) {
        e.direction = t >= e.index, e.index = t, e.updateItemHTML();
      },
      preloadNearbyImages: function preloadNearbyImages() {
        var t,
            i = e.st.gallery.preload,
            n = Math.min(i[0], e.items.length),
            o = Math.min(i[1], e.items.length);

        for (t = 1; t <= (e.direction ? o : n); t++) {
          e._preloadItem(e.index + t);
        }

        for (t = 1; t <= (e.direction ? n : o); t++) {
          e._preloadItem(e.index - t);
        }
      },
      _preloadItem: function _preloadItem(i) {
        if (i = L(i), !e.items[i].preloaded) {
          var n = e.items[i];
          n.parsed || (n = e.parseEl(i)), I("LazyLoad", n), "image" === n.type && (n.img = t('<img class="mfp-img" />').on("load.mfploader", function () {
            n.hasSize = !0;
          }).on("error.mfploader", function () {
            n.hasSize = !0, n.loadError = !0, I("LazyLoadError", n);
          }).attr("src", n.src)), n.preloaded = !0;
        }
      }
    }
  });
  var F = "retina";
  t.magnificPopup.registerModule(F, {
    options: {
      replaceSrc: function replaceSrc(t) {
        return t.src.replace(/\.\w+$/, function (t) {
          return "@2x" + t;
        });
      },
      ratio: 1
    },
    proto: {
      initRetina: function initRetina() {
        if (window.devicePixelRatio > 1) {
          var t = e.st.retina,
              i = t.ratio;
          (i = isNaN(i) ? i() : i) > 1 && (b("ImageHasSize." + F, function (t, e) {
            e.img.css({
              "max-width": e.img[0].naturalWidth / i,
              width: "100%"
            });
          }), b("ElementParse." + F, function (e, n) {
            n.src = t.replaceSrc(n, i);
          }));
        }
      }
    }
  }), S();
}), jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
  def: "easeOutQuad",
  swing: function swing(t, e, i, n, o) {
    return jQuery.easing[jQuery.easing.def](t, e, i, n, o);
  },
  easeInQuad: function easeInQuad(t, e, i, n, o) {
    return n * (e /= o) * e + i;
  },
  easeOutQuad: function easeOutQuad(t, e, i, n, o) {
    return -n * (e /= o) * (e - 2) + i;
  },
  easeInOutQuad: function easeInOutQuad(t, e, i, n, o) {
    return (e /= o / 2) < 1 ? n / 2 * e * e + i : -n / 2 * (--e * (e - 2) - 1) + i;
  },
  easeInCubic: function easeInCubic(t, e, i, n, o) {
    return n * (e /= o) * e * e + i;
  },
  easeOutCubic: function easeOutCubic(t, e, i, n, o) {
    return n * ((e = e / o - 1) * e * e + 1) + i;
  },
  easeInOutCubic: function easeInOutCubic(t, e, i, n, o) {
    return (e /= o / 2) < 1 ? n / 2 * e * e * e + i : n / 2 * ((e -= 2) * e * e + 2) + i;
  },
  easeInQuart: function easeInQuart(t, e, i, n, o) {
    return n * (e /= o) * e * e * e + i;
  },
  easeOutQuart: function easeOutQuart(t, e, i, n, o) {
    return -n * ((e = e / o - 1) * e * e * e - 1) + i;
  },
  easeInOutQuart: function easeInOutQuart(t, e, i, n, o) {
    return (e /= o / 2) < 1 ? n / 2 * e * e * e * e + i : -n / 2 * ((e -= 2) * e * e * e - 2) + i;
  },
  easeInQuint: function easeInQuint(t, e, i, n, o) {
    return n * (e /= o) * e * e * e * e + i;
  },
  easeOutQuint: function easeOutQuint(t, e, i, n, o) {
    return n * ((e = e / o - 1) * e * e * e * e + 1) + i;
  },
  easeInOutQuint: function easeInOutQuint(t, e, i, n, o) {
    return (e /= o / 2) < 1 ? n / 2 * e * e * e * e * e + i : n / 2 * ((e -= 2) * e * e * e * e + 2) + i;
  },
  easeInSine: function easeInSine(t, e, i, n, o) {
    return -n * Math.cos(e / o * (Math.PI / 2)) + n + i;
  },
  easeOutSine: function easeOutSine(t, e, i, n, o) {
    return n * Math.sin(e / o * (Math.PI / 2)) + i;
  },
  easeInOutSine: function easeInOutSine(t, e, i, n, o) {
    return -n / 2 * (Math.cos(Math.PI * e / o) - 1) + i;
  },
  easeInExpo: function easeInExpo(t, e, i, n, o) {
    return 0 == e ? i : n * Math.pow(2, 10 * (e / o - 1)) + i;
  },
  easeOutExpo: function easeOutExpo(t, e, i, n, o) {
    return e == o ? i + n : n * (1 - Math.pow(2, -10 * e / o)) + i;
  },
  easeInOutExpo: function easeInOutExpo(t, e, i, n, o) {
    return 0 == e ? i : e == o ? i + n : (e /= o / 2) < 1 ? n / 2 * Math.pow(2, 10 * (e - 1)) + i : n / 2 * (2 - Math.pow(2, -10 * --e)) + i;
  },
  easeInCirc: function easeInCirc(t, e, i, n, o) {
    return -n * (Math.sqrt(1 - (e /= o) * e) - 1) + i;
  },
  easeOutCirc: function easeOutCirc(t, e, i, n, o) {
    return n * Math.sqrt(1 - (e = e / o - 1) * e) + i;
  },
  easeInOutCirc: function easeInOutCirc(t, e, i, n, o) {
    return (e /= o / 2) < 1 ? -n / 2 * (Math.sqrt(1 - e * e) - 1) + i : n / 2 * (Math.sqrt(1 - (e -= 2) * e) + 1) + i;
  },
  easeInElastic: function easeInElastic(t, e, i, n, o) {
    var s = 1.70158,
        r = 0,
        a = n;
    return 0 == e ? i : 1 == (e /= o) ? i + n : (r || (r = .3 * o), a < Math.abs(n) ? (a = n, s = r / 4) : s = r / (2 * Math.PI) * Math.asin(n / a), -a * Math.pow(2, 10 * (e -= 1)) * Math.sin((e * o - s) * (2 * Math.PI) / r) + i);
  },
  easeOutElastic: function easeOutElastic(t, e, i, n, o) {
    var s = 1.70158,
        r = 0,
        a = n;
    return 0 == e ? i : 1 == (e /= o) ? i + n : (r || (r = .3 * o), a < Math.abs(n) ? (a = n, s = r / 4) : s = r / (2 * Math.PI) * Math.asin(n / a), a * Math.pow(2, -10 * e) * Math.sin((e * o - s) * (2 * Math.PI) / r) + n + i);
  },
  easeInOutElastic: function easeInOutElastic(t, e, i, n, o) {
    var s = 1.70158,
        r = 0,
        a = n;
    return 0 == e ? i : 2 == (e /= o / 2) ? i + n : (r || (r = o * (.3 * 1.5)), a < Math.abs(n) ? (a = n, s = r / 4) : s = r / (2 * Math.PI) * Math.asin(n / a), e < 1 ? a * Math.pow(2, 10 * (e -= 1)) * Math.sin((e * o - s) * (2 * Math.PI) / r) * -.5 + i : a * Math.pow(2, -10 * (e -= 1)) * Math.sin((e * o - s) * (2 * Math.PI) / r) * .5 + n + i);
  },
  easeInBack: function easeInBack(t, e, i, n, o, s) {
    return null == s && (s = 1.70158), n * (e /= o) * e * ((s + 1) * e - s) + i;
  },
  easeOutBack: function easeOutBack(t, e, i, n, o, s) {
    return null == s && (s = 1.70158), n * ((e = e / o - 1) * e * ((s + 1) * e + s) + 1) + i;
  },
  easeInOutBack: function easeInOutBack(t, e, i, n, o, s) {
    return null == s && (s = 1.70158), (e /= o / 2) < 1 ? n / 2 * (e * e * ((1 + (s *= 1.525)) * e - s)) + i : n / 2 * ((e -= 2) * e * ((1 + (s *= 1.525)) * e + s) + 2) + i;
  },
  easeInBounce: function easeInBounce(t, e, i, n, o) {
    return n - jQuery.easing.easeOutBounce(t, o - e, 0, n, o) + i;
  },
  easeOutBounce: function easeOutBounce(t, e, i, n, o) {
    return (e /= o) < 1 / 2.75 ? n * (7.5625 * e * e) + i : e < 2 / 2.75 ? n * (7.5625 * (e -= 1.5 / 2.75) * e + .75) + i : e < 2.5 / 2.75 ? n * (7.5625 * (e -= 2.25 / 2.75) * e + .9375) + i : n * (7.5625 * (e -= 2.625 / 2.75) * e + .984375) + i;
  },
  easeInOutBounce: function easeInOutBounce(t, e, i, n, o) {
    return e < o / 2 ? .5 * jQuery.easing.easeInBounce(t, 2 * e, 0, n, o) + i : .5 * jQuery.easing.easeOutBounce(t, 2 * e - o, 0, n, o) + .5 * n + i;
  }
}), function (t) {
  t.fn.countdown = function (e, i) {
    var n = t.extend({
      date: null,
      offset: null,
      day: "Day",
      days: "Days",
      hour: "Hour",
      hours: "Hours",
      minute: "Minute",
      minutes: "Mins",
      second: "Sec",
      seconds: "Secs"
    }, e);
    n.date || t.error("Date is not defined."), Date.parse(n.date) || t.error("Incorrect date format, it should look like this, 12/24/2012 12:00:00.");
    var o = this,
        s = setInterval(function () {
      var t = new Date(n.date) - function () {
        var t = new Date(),
            e = t.getTime() + 6e4 * t.getTimezoneOffset();
        return new Date(e + 36e5 * n.offset);
      }();

      if (0 > t) return clearInterval(s), void (i && "function" == typeof i && i());
      var e = Math.floor(t / 864e5),
          r = Math.floor(t % 864e5 / 36e5),
          a = Math.floor(t % 36e5 / 6e4),
          l = Math.floor(t % 6e4 / 1e3),
          c = 1 === e ? n.day : n.days,
          u = 1 === r ? n.hour : n.hours,
          p = 1 === a ? n.minute : n.minutes,
          d = 1 === l ? n.second : n.seconds;
      e = String(e).length >= 2 ? e : "0" + e, r = String(r).length >= 2 ? r : "0" + r, a = String(a).length >= 2 ? a : "0" + a, l = String(l).length >= 2 ? l : "0" + l, o.find(".days").text(e), o.find(".hours").text(r), o.find(".minutes").text(a), o.find(".seconds").text(l), o.find(".days_text").text(c), o.find(".hours_text").text(u), o.find(".minutes_text").text(p), o.find(".seconds_text").text(d);
    }, 1e3);
  };
}(jQuery);