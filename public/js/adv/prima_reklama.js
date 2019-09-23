function isDefined(subject) {
  if (Array.isArray(subject)) {
    var arrLength = subject.length;
    for (var i = 0; i < arrLength; i++) {
      if (typeof subject[i] === 'undefined' || subject[i] == null) {
        return false;
      }
    }
    return true;
  }
  return this.isDefined([subject]);
}

var PrimaPL = PrimaPL || {};
PrimaPL.pQ = {
  getByClass: function (input) {
    return document.getElementsByClassName(input);
  },
  getById: function (input) {
    return document.getElementById(input);
  },
  getByTag: function (input) {
    return document.getElementsByTagName(input);
  },
  children: function (input) {
    return document.getElementById(input).children;
  },
  hasClass: function (el, className) {
    if (el.classList)
      return el.classList.contains(className);
    else
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  },
  addClass: function (el, className) {
    if (el.classList)
      el.classList.add(className);
    else
      el.className += ' ' + className;
  },
  removeClass: function (el, className) {
    if (el.classList)
      el.classList.remove(className);
    else
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  },
  attr: function (el, attr, value) {
    if (value) {
      el.setAttribute(attr, value);
    } else {
      return el.getAttribute(attr);
    }
  },
  html: function (el) {
    return el.innerHTML;
  },
  text: function (el) {
    return el.textContent;
  },
  next: function (el) {
    return el.nextElementSibling;
  },
  prev: function (el) {
    return el.previousElementSibling;
  },
  offset: function (el) {
    var rect = el.getBoundingClientRect();
    return {
      top: rect.top + document.body.scrollTop,
      left: rect.left + document.body.scrollLeft
    }
  },
  outerHeight: function (el, margin) {
    if (margin) {
      var height = el.offsetHeight;
      var style = getComputedStyle(el);

      height += parseInt(style.marginTop) + parseInt(style.marginBottom);
      return height;
    } else {
      return el.offsetHeight;
    }
  },
  outerWidth: function (el, margin) {
    if (margin) {
      var width = el.offsetWidth;
      var style = getComputedStyle(el);

      width += parseInt(style.marginLeft) + parseInt(style.marginRight);
      return width;
    } else {
      return el.offsetWidth;
    }
  },
  parent: function (el) {
    return el.parentNode;
  },
  position: function (el) {
    return { left: el.offsetLeft, top: el.offsetTop };
  },
  remove: function (el) {
    el.parentNode.removeChild(el);
  },
  inArray: function (item, array) {
    return array.indexOf(item);
  },
  isArray: function (array) {
    return Array.isArray(arr);
  },
  now: function () {
    return Date.now();
  }
};

PrimaPL.addListener = function (state, fn, doc) {
  var doc = doc || true;
  if (window.addEventListener && state == 'load' && doc === true) {
    document.addEventListener("DOMContentLoaded", fn);
  } else {
    window.addEventListener(state, fn);
  }
};
PrimaPL.url = {
  original: null,
  search: null,
  hash: null,
  clean: null,
  ext: {},
  getQueries: function () {
    if (PrimaPL.url.search !== null) {
      var params = {};
      var vars = PrimaPL.url.search.substring(1).split('&');
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        params[pair[0]] = decodeURIComponent(pair[1]);
      }
      return params;
    } else {
      return null;
    }
  },
  getQuery: function (queryName) {
    var queries = PrimaPL.url.getQueries();
    if (queries !== null) {
      return queries[queryName];
    } else {
      return null;
    }
  },
  initURL: function () {
    PrimaPL.url.original = window.location.href;
    PrimaPL.url.search = window.location.search;
    PrimaPL.url.hash = window.location.hash;
    PrimaPL.url.clean = window.location.origin + window.location.pathname;
    PrimaPL.url.ext.html = PrimaPL.url.clean.match(/\.html/);
    PrimaPL.url.ext.php = PrimaPL.url.clean.match(/\.php/);
  }
};
PrimaPL.addListener('load', PrimaPL.url.initURL);

PrimaPL.log = function (message, color, text) {
  var bgcolor = color || 'blue';
  var txcolor = text || 'white';
  if (typeof currentUserIsAdmin !== 'undefined' && currentUserIsAdmin) {
    console.log('%c' + message, 'background:' + bgcolor + '; color:' + txcolor + '; font-weight: bold;');
  }
};

PrimaPL.warn = function (message) {
  if (typeof currentUserIsAdmin !== 'undefined' && currentUserIsAdmin) {
    console.warn(message);
  }
};

window.$ = function (selector) {
  selector = selector.substr(1, selector.length);
  if (selector.indexOf('#') === 0) {
    return PrimaPL.pQ.getById(selector);
  } else {
    return PrimaPL.pQ.getByClass(selector);
  }
};

(function ($) {
  window.$ = window.jQuery;
})(jQuery);

/*

    CUSTOM

*/
var PrimaPL = PrimaPL || {};
PrimaPL.global = {
  window: {
    scrolling: {
      direction: null,
      lastScroll: null,
      up: function () {
        if (PrimaPL.global.window.scrolling.direction === 'up') {
          return true;
        } else {
          return false;
        }
      },
      down: function () {
        if (PrimaPL.global.window.scrolling.direction === 'down') {
          return true;
        } else {
          return false;
        }
      },
      setScrolled: function (scrolled) {
        if (PrimaPL.global.window.scrolling.lastScroll !== scrolled) {
          PrimaPL.global.window.scrolling.lastScroll = scrolled;
        }
      },
      getScrolled: function () {
        return PrimaPL.global.window.scrolling.lastScroll;
      }
    },
    offset: {
      element: null,
      height: null,
      fromTop: null,
      adminBar: 0,
      init: function () {
        PrimaPL.global.window.offset.element = PrimaPL.pQ.getById('sitesHeader') || PrimaPL.pQ.getById('moneElementTopOffset') || null;
        if (PrimaPL.pQ.getById('main') != null) {
          PrimaPL.global.window.offset.fromTop = PrimaPL.pQ.getById('main').offsetTop;
        } else {
          PrimaPL.global.window.offset.fromTop = 0;
        }
        if (PrimaPL.pQ.getById('admin-menu') != null) {
          PrimaPL.global.window.offset.adminBar = PrimaPL.pQ.getById('admin-menu').offsetHeight;
        } else {
          PrimaPL.global.window.offset.adminBar = 0;
        }
        if (PrimaPL.global.window.offset.element != null) {
          PrimaPL.global.window.offset.height = PrimaPL.global.window.offset.element.offsetHeight;
        } else {
          PrimaPL.global.window.offset.height = 0;
        }
      },
      top: function () {
        return PrimaPL.global.window.offset.height;
      },
      top40: function () {
        if (typeof PrimaPL != 'undefined' && typeof PrimaPL.sitesHeader != 'undefined') {
          var headerHeight = PrimaPL.sitesHeader.getHeight() || 0;
          if (PrimaPL.pQ.getById('cpex-premium-leaderboard') && isDesktop() && PrimaPL.pQ.getById('cpex-premium-leaderboard').clientHeight > 0) {
            return PrimaPL.global.window.offset.top() + 40 + headerHeight;
          } else {
            return PrimaPL.global.window.offset.top() + headerHeight;
          }
        }
      }
    },
    sizes: {
      width: null,
      height: null,
      setSizes: function () {
        var w = window,
          d = document,
          e = d.documentElement,
          g = d.getElementsByTagName('body')[0],
          x = w.innerWidth || e.clientWidth || g.clientWidth,
          y = w.innerHeight || e.clientHeight || g.clientHeight;
        if (PrimaPL.global.window.sizes.getWidth() === null || PrimaPL.global.window.sizes.getWidth() !== x) {
          PrimaPL.global.window.sizes.width = x;
        }
        if (PrimaPL.global.window.sizes.getHeight() === null || PrimaPL.global.window.sizes.getHeight() !== y) {
          PrimaPL.global.window.sizes.height = y;
        }
      },
      getWidth: function () {
        return PrimaPL.global.window.sizes.width;
      },
      getHeight: function () {
        return PrimaPL.global.window.sizes.height;
      }
    }
  },
  device: {
    isDesktop: function (old) {
      var old = old || false;
      var width = PrimaPL.global.window.sizes.getWidth();
      if (old) {
        if (width > 760) {
          return true;
        } else {
          return false;
        }
      } else {
        if (width >= 1024) {
          return true;
        } else {
          return false;
        }
      }
    },
    isMobile: function (old) {
      var old = old || false;
      var width = PrimaPL.global.window.sizes.getWidth();
      if (old) {
        if (width > 760) {
          return false;
        } else {
          return true;
        }
      } else {
        if (width >= 375) {
          return false;
        } else {
          return true;
        }
      }
    },
    isBigMobile: function () {
      var width = PrimaPL.global.window.sizes.getWidth();
      if (width < 1024 && width >= 375) {
        return true;
      } else {
        return false;
      }
    }
  },
  url: {
    getParameter: function (name) {
      var regexS = "[\?&]" + name + "=([^&#]*)",
        regex = new RegExp(regexS),
        results = regex.exec(window.location.search);
      if (results == null) {
        return "";
      } else {
        return decodeURIComponent(results[1].replace(/\+/g, " "));
      }
    }
  },
  cookies: {
    create: function (name, value, expireMinutes) {
      var cookieExpire;
      if (expireMinutes) {
        var date = new Date();
        date.setTime(date.getTime() + (expireMinutes * 60 * 1000));
        cookieExpire = '; expires=' + date.toGMTString();
      }
      else {
        cookieExpire = '';
      }
      document.cookie = name + '=' + value + cookieExpire + '; path=/';
    },
    read: function (name) {
      var nameEQ = name + '=';
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
          return c.substring(nameEQ.length, c.length);
        }
      }
      return null;
    }
  }
};
PrimaPL.global.window.sizes.setSizes();
PrimaPL.global.window.offset.init();
isDesktop = function (old) {
  return PrimaPL.global.device.isDesktop(old);
};
isMobile = function (old) {
  return PrimaPL.global.device.isMobile(old);
};
isBigMobile = function () {
  return PrimaPL.global.device.isBigMobile();
};

PrimaPL.custom = {
  mpRender: function () {
    var iframeEL = PrimaPL.pQ.getById('cpex-miniplayer') || PrimaPL.pQ.getById('mini-player') || null;
    if ((isMobile() || isBigMobile()) && iframeEL !== null) {
      PrimaPL.pQ.remove(iframeEL);
      PrimaPL.log('[Removing]: wrapper with MiniPlayer [' + PrimaPL.pQ.attr(iframeEL, 'id') + ']', '#009eee');
    }
  }
};

PrimaPL.addListener('load', PrimaPL.custom.mpRender);
PrimaPL.addListener('resize', PrimaPL.global.window.sizes.setSizes);
PrimaPL.addListener('scroll', function () {
  PrimaPL.global.window.offset.top();
  var windowScrollTop = window.pageYOffset;
  var windowScrollTopLast = PrimaPL.global.window.scrolling.getScrolled();
  if (windowScrollTop < windowScrollTopLast) {
    PrimaPL.global.window.scrolling.direction = 'up';
  } else if (windowScrollTop > windowScrollTopLast) {
    PrimaPL.global.window.scrolling.direction = 'down';
  }
  PrimaPL.global.window.scrolling.setScrolled(windowScrollTop);
});




/*

    SEZNAM MONE.JS

*/
var utm_source = PrimaPL.global.url.getParameter("utm_source");
var utm_medium = PrimaPL.global.url.getParameter("utm_medium");
var loadSeznamMones = (((utm_source == "seznam.cz" || utm_source == "www.seznam.cz") && (utm_medium == "sekce-z-internetu" || utm_medium == "z-boxiku")) || PrimaPL.global.cookies.read('mone_provider_session') !== null) ? true : false;
window.localSeznamAds = 0;
if (loadSeznamMones) {
  window.localSeznamAds = 1;
  PrimaPL.global.cookies.create('mone_provider_session', 'seznam', 10);
  var SeznamAdsScript = document.createElement("script");
  SeznamAdsScript.src = '//ssp.imedia.cz/static/js/ssp.js'; // SSP implementation
  document.head.appendChild(SeznamAdsScript);
  SeznamAdsScript.onload = function (response) {
    PrimaPL.log('[SSSP]: script loaded!', 'green');
    if (typeof PrimaPL !== 'undefined' && typeof response.path !== 'undefined' && typeof response.path[0].src !== 'undefined') {
      PrimaPL.warn(response.path[0].src);
    }
  };
  PrimaPL.log('[SSSP]: Enabled seznam ADS!', 'green');
} else {
  PrimaPL.log('[SSSP]: Disabled seznam ADS!', 'red');
}


/*

    SSSPs

*/
var SeznamSSP = [];

var sitesSSSPs = {
  zoommagazin_iprima_cz: {
    mobile: {
      zoneId: 105760,
      width: 111,
      height: 111
    },
    desktop: {
      zoneId: 105760,
      width: 111,
      height: 111
    }
  },
  coolmagazin_iprima_cz: {
    mobile: {
      zoneId: 105765,
      width: 111,
      height: 111
    },
    desktop: {
      zoneId: 105765,
      width: 111,
      height: 111
    }
  },
  napady_iprima_cz: {
    mobile: {
      zoneId: 105770,
      width: 111,
      height: 111
    },
    desktop: {
      zoneId: 105770,
      width: 111,
      height: 111
    }
  },
  cars_iprima_cz: {
    mobile: {
      zoneId: 105755,
      width: 300,
      height: 300
    },
    desktop: {
      zoneId: 105755,
      width: 111,
      height: 111
    }
  },
  living_iprima_cz: {
    mobile: {
      zoneId: 105745,
      width: 111,
      height: 111
    },
    desktop: {
      zoneId: 105740,
      width: 111,
      height: 111
    }
  },
  zeny_iprima_cz: {
    mobile: {
      zoneId: 105730,
      width: 111,
      height: 111
    },
    desktop: {
      zoneId: 105725,
      width: 111,
      height: 111
    }
  },
  fresh_iprima_cz: {
    mobile: {
      zoneId: 105750,
      width: 111,
      height: 111
    },
    desktop: {
      zoneId: 105750,
      width: 111,
      height: 111
    }
  }
};

function relatedDesktopSSSP() {
  if (typeof iprimaDomain !== 'undefined' && (iprimaDomain === 'zoommagazin_iprima_cz' || iprimaDomain === 'coolmagazin_iprima_cz')) {
    return isDesktop(true) ? 'desktop' : 'mobile';
  } else {
    return isDesktop() ? 'desktop' : 'mobile';
  }
}

function relatedSwitchSSSP(input) {
  var ssspArray = {
    'id': 'async-related-mone'
  };
  ssspArray.zoneId = input[relatedDesktopSSSP()].zoneId;
  ssspArray.width = input[relatedDesktopSSSP()].width;
  ssspArray.height = input[relatedDesktopSSSP()].height;
  var moneWrapper = document.getElementById(ssspArray.id);
  if (moneWrapper) {
    SeznamSSP.push(ssspArray);
    PrimaPL.log('[SSSP]: data sended for SSSP ADS! [' + iprimaDomain + ']', 'green');
    PrimaPL.warn(ssspArray);
  } else {
    PrimaPL.log('[SSSP]: wrapper not exist! [' + iprimaDomain + ']', 'red');
  }
}

function loadSwitchSSSP() {
  if (typeof currentUserLevelPremium !== 'undefined' && currentUserLevelPremium) {
    return false;
  } else if (typeof loadSeznamMones !== 'undefined' && loadSeznamMones) {
    return true;
  } else {
    return false;
  }
}

function initSSSPBuilder() {
  if (loadSwitchSSSP()) {
    if (typeof iprimaDomain !== 'undefined' && typeof sitesSSSPs[iprimaDomain] !== 'undefined') {
      relatedSwitchSSSP(sitesSSSPs[iprimaDomain]);
    } else {
      PrimaPL.log('[SSSP]: Domain or data not exist!', 'red');
    }
  } else {
    PrimaPL.log('[SSSP]: disabled ADS!', 'red');
  }
}


/*

    PERFORMAX

*/
var PerformaxInit = false;

var PerformaxScripts = {
  zoommagazin_iprima_cz: 'zoom_iprima',
  coolmagazin_iprima_cz: 'cool_iprima',
  napady_iprima_cz: 'napady_iprima',
  lajk_iprima_cz: 'lajk_iprima_cz',
  cars_iprima_cz: 'autosalon_iprima',
  living_iprima_cz: 'living_iprima',
  zeny_iprima_cz: 'zeny_iprima',
  fresh_iprima_cz: 'fresh_iprima'
};

var PerformaxScriptTypes = {
  related: 'sklik_souvisejici',
  fixed: 'sklik_mobile_fix'
};

function renderPerformax() {
  if (typeof currentUserLevelPremium !== 'undefined' && currentUserLevelPremium) {
    return false;
  } else if (typeof loadSeznamMones !== 'undefined' && loadSeznamMones) {
    return false;
  } else {
    return true;
  }
}

function initPerformaxBuilder(type, element) {
  if (renderPerformax()) {
    type = (typeof type !== 'undefined') ? type : false;
    element = (typeof element !== 'undefined') ? element : false;
    if (!PerformaxInit) {
      var builderJs = document.createElement('script');
      builderJs.src = '//cdn.performax.cz/async-builder/asyncBuilder.js';
      document.head.appendChild(builderJs);
      builderJs.onload = function (response) {
        PerformaxInit = true;
        PrimaPL.log('[Performax]: asyncBuilder.js loaded!', '#efae36', 'green');
        if (typeof PrimaPL !== 'undefined' && typeof response.path !== 'undefined' && typeof response.path[0].src !== 'undefined') {
          PrimaPL.warn(response.path[0].src);
        }
        getPerformaxScriptName(type, element);
        if (typeof pfmMoveElement === 'undefined') {
          var jsMoveElement = document.createElement('script');
          jsMoveElement.src = '//cdn.performax.cz/js-move-element/jsMoveElement.js';
          jsMoveElement.async = true;
          document.body.appendChild(jsMoveElement);
        }
      };
    } else {
      getPerformaxScriptName(type, element);
    }
  }
}

// Types: related, fixed
function getPerformaxScriptName(type, element) {
  if (typeof iprimaDomain !== 'undefined' && type) {
    if (type === 'related' && !element) {
      if (iprimaDomain === 'zoommagazin_iprima_cz' || iprimaDomain === 'coolmagazin_iprima_cz') {
        element = '.organism--section-area--related-section-area--section--inner--content > div:nth-of-type(2)';
      } else if (iprimaDomain === 'napady_iprima_cz') {
        element = '.article-content';
      } else {
        element = '.organism--contents-area--article-detail-content-area--inner--content';
      }
    }
    var elementExist = document.querySelector(element);
    if (elementExist) {
      if (typeof PerformaxScripts[iprimaDomain] !== 'undefined') {
        var nameVar = 'pfmx' + Math.random().toString(36).substring(10);
        window[nameVar] = pxAsyncBuilder(element);
        var delivery = document.createElement('script');
        delivery.src = '//delivery.performax.cz/' + PerformaxScriptTypes[type] + '/' + PerformaxScripts[iprimaDomain] + '?format=js&callback=' + nameVar;
        delivery.async = true;
        elementExist.appendChild(delivery);
        delivery.onload = function (response) {
          PrimaPL.log('[Performax]: loaded for [' + iprimaDomain + ']', '#efae36', 'black');
          PrimaPL.warn(response.path[0].src);
        };
      } else {
        PrimaPL.log('[Performax]: No data for ' + iprimaDomain, '#efae36', 'red');
      }
    } else {
      PrimaPL.log('[Performax]: Element ' + element + ' not exist', '#efae36', 'red');
    }
  }
}


/*

    MONE.JS

*/
        (function ($) {
            // Main vars declaration for mones
            // Mobile breakpoint
            if ($('body').hasClass('domain-www-iprima-cz') || $('body').hasClass('domain-channel-subdomain')) {
                var mobileBreakpoint = 760;
            } else {
                var mobileBreakpoint = 1024;
            }
            var DomainID = $('body').data('bbelements') || 24139; // Server ID
            var moneClass = '.element-mone'; // Class of mone element
            var moneParentClass = '.mone--element-mone'; // Class of mone parent element
            var moneCloseButton = '.mone--element-mone--inner--close'; // Close button class
            var moneParentInnerClass =
            '.mone--element-mone--inner'; // Class of inner element of mone parent element
            var moneSidebarClass = '.mone--sidebar-mone'; // Class of sidebars
            var moneMobClass = ".mone--mobile-mone"; // Class of mobile mone element
            var moneElementTopOffset = "#moneElementTopOffset";
            var moneSectionClass = ".section--articles-section";
            var PremLeadCanv = "#PremiumLeaderboardMone";
            var PremLeadCanvWrapper = "#PremiumLeaderboardMoneWrapper";
            var PremLeadCanvInner = "#PremiumLeaderboardMoneInner";

            // Main vars declaration for MiniPlayer
            var miniPlayerID = '#mini-player';

            // SeznamAds Conditions and Variables
            /* Seznam positions has 2 levels
             - Calling only Seznam positions -> needs to be mapped within Drupal administrations
             - Replaces bbElements positions ID -> needs to check this option in Drupal admin
             */
            var SeznamAdsInitialization = window.localSeznamAds ||
            0; // Determinates if Seznam ads should be called at all
            var SeznamAdsPositions =
        new Array(); // Array of Seznam ads positions - filling on same level as manageAdSlot
            var SeznamOverrideBBservers = (typeof Drupal !== 'undefined' && Drupal.settings.prima_theme_pl
                .seznam_bbelements_retype ? Drupal.settings.prima_theme_pl.seznam_bbelements_retype : 0
                ); // Check if its need to fill Seznam position or just change bbElements ID

            $.moneElementTopOffset = function () {
                if ($(moneElementTopOffset).length) {
                    return $(moneElementTopOffset).outerHeight();
                } else {
                    return false;
                }
            };

            // Fn for selecting mone elements by according numbers
            $.moneElementEQ = function (eq) {
                return moneClass + ':eq(' + eq + ')';
            };

            $.moneMobileAllow = function () {
                // If exist mobile mones
                if ($(moneMobClass).length) {
                    $(moneMobClass).each(function () { // For each mobile mone element
                        $(this).addClass('loaded-on-mobile');
                        $(this).find(moneClass).data('load', true); // Set load data = true
                        if (Boolean($(this).data('inContent'))) { // If must be moved in content
                            var moneElement = $(this);
                            $.each(['p', 'ul', 'ol', 'h2', 'table'], function (index, element) {
                                ElementFirst = moneElement.parent().find(element +
                                ':eq(0)'); // Find first element from array above
                                if (ElementFirst.length) { // If element exist
                                    moneElement.insertAfter(
                                    ElementFirst); // Move it after first element
                                    return false; // Break each
                                }
                            });
                        }
                    });
                }
            };

            // If it isn't mobile device
            if ($(window).outerWidth() >= mobileBreakpoint) {
                // If exist mone sidebar -> check and work with his height and contained mone elements
                if ($(moneSidebarClass).length) {
                    var slidePlace = 50;
                    if ($('#popular-articles-sidebar').length) {
                        var minHeight = 1200;
                    } else {
                        var minHeight = 600; // Minimum height of sidebar for load standard mone
                    }
                    if ($(miniPlayerID).length) {
                        slidePlace = slidePlace + $(miniPlayerID).outerHeight();
                    }
                    var moneReqHeight = minHeight + slidePlace; // Required height of space for one mone element
                    $(moneSidebarClass).each(function () {
                        var moneSidebarHeight = $(this).outerHeight(); // Get height of sidebar
                        var moneFirst = $(this).find($.moneElementEQ(0)); // Get the first mone element
                        if ($(this).hasClass('mone--sidebar-more-mone') === true) {
                            if (moneSidebarHeight < minHeight && $(miniPlayerID)
                                .length) { // Disable mone if sidebar is too low
                                moneFirst.data('load', false);
                            } else {
                                if (moneSidebarHeight <
                                    moneReqHeight) { // If lower then sidebar required height set fallback mone
                                    moneFirst.data('desktopSlot', moneFirst.data(
                                    'fallbackSlot')); // set fallback SLOT
                                    moneFirst.data('desktopPosition', moneFirst.data(
                                    'fallbackPosition')); // set fallback POSITION
                                    moneFirst.data('desktopFormat', moneFirst.data(
                                    'fallbackFormat')); // set fallback FORMAT
                                } else {
                                    var moneCount = 5; // Total count of mone elements in sidebar
                                    if ($(this).find(moneClass).length !== moneCount) {
                                        moneCount = $(this).find(moneClass)
                                        .length; // If there is diferent count of mone elements in sidebar
                                    }
                                    for (var i = 1; i <= moneCount; i++) {
                                        if (moneSidebarHeight >= (moneReqHeight *
                                            i)) { // If higher then multiple of sidebar required height. Start from first element!!! i = 1 -> each multiple = allow next mone
                                            if ($(this).find($.moneElementEQ(i - 1)).data('load') !==
                                                true || $(this).find($.moneElementEQ(i - 1)).data(
                                                'load') !== 1
                                                ) { // If the mone element has no load value on true || 1
                                                $(this).find($.moneElementEQ(i - 1)).data('load',
                                                true); // Set the mone element value on true
                                            }
                                            $(this).addClass('elements-row-' +
                                            i); // Add appropriate class with mone count to sidebar
                                        }
                                    }
                                }
                            }
                        }
                    });
                }
            }

            // If it's mobile device
            if ($(window).outerWidth() < mobileBreakpoint && $('.main-content-block').length) {
                $.moneMobileAllow();
            }

            mobileMonesInContent = function () {
                var moneNo = 0;
                var parent = $('.main-content-block');
                var parentTopPos = parent.offset().top;
                var loopMin = 300; // Alowed tolerance
                var loopNext = 1300; // First mone will be loaded after this, then by calculating
                var loopStandard = 1300; // Optional distance between mones
                var alowedEls = ['p', 'ul', 'ol', 'table']; // Allowed elements
                var contentElements = parent.children(); // Get all 1st level childrens
                var monesArray = parent.find('.mone--article-rectangles-mone');
                contentElements.each(function () {
                    var elType = $(this).get(0).tagName.toLowerCase(); // Get element type
                    if ($.inArray(elType, alowedEls) != -1) { // If element type is in array
                        var elementPos = $(this).offset().top - parentTopPos;
                        if (elementPos > (loopNext - loopMin)) {
                            loopNext = elementPos + loopStandard;
                            moneNo = moneNo + 1;
                            var moneEl = monesArray.eq(moneNo);
                            moneEl.find(moneClass).data('load', true);
                            moneEl.insertAfter($(this)); // Move it after this element
                        }
                    }
                });
            }

            // Mones in content detail
            if ($(window).outerWidth() < mobileBreakpoint && $('.main-content-block').length && $(
                    '.mone--article-rectangles-mone').length) {
                mobileMonesInContent();
            }

            // Check if ibbAds was correctly loaded
            if (typeof ibbAds !== 'undefined') {
                var bbElements = ibbAds.tag.useAdProvider("BbmEu"); // Create bbElements variable if ibbAds exist
                var getIbbId = ibbAds.tag.useDataProvider('BbnautIdDataProvider', {
                    url: '//bbcdn-static.bbelements.com/scripts/ibb-async/stable/plugins/BbnautIdDataProvider.js'
                });
                bbElements.attachData("ibbid", getIbbId); // IBBID plugin setting
            }
            // Fn for generate of random hash
            $.moneRandSuffix = function () {
                return Math.random().toString(36).substr(2);
            };
            // Fn for generate of mone element ID
            $.moneRandID = function () {
                return "moneID-" + $.moneRandSuffix();
            };
            // Main mone fn for all mone elements, which have not yet been loaded
            $.moneLoad = function () {
                if ($(window).outerWidth() < mobileBreakpoint) {
                    $.moneMobileAllow();
                }
                var moneIDsArray = []; // Create empty array of mone IDs
                $(moneClass).each(function () { // For each mone element
                    if ($(this).closest(moneParentClass).hasClass('mone-loaded') === false && $(this)
                        .closest(moneParentClass).hasClass('mone-not-loaded') === false) {
                        if (Boolean($(this).data('load'))) {
                            moneRandomID = $.moneRandID(); // Generate random ID
                            $(this).attr('id', moneRandomID); // Add random ID
                            moneIDsArray.push(moneRandomID); // Push ID into array

                            if ($(window).outerWidth() < mobileBreakpoint) {
                                moneSlot = $(this).data("mobileSlot");
                                monePosition = $(this).data("mobilePosition");
                                moneFormat = $(this).data('mobileFormat');
                            } else {
                                if (Boolean($(this).data('footer'))) {
                                    $(this).addClass('footer');
                                    if ($(window).outerWidth() < 1200) {
                                        moneSlot = $(this).data("fallbackSlot");
                                        monePosition = $(this).data("fallbackPosition");
                                        moneFormat = $(this).data('fallbackFormat');
                                    } else {
                                        moneSlot = $(this).data("desktopSlot");
                                        monePosition = $(this).data("desktopPosition");
                                        moneFormat = $(this).data('desktopFormat');
                                    }
                                } else {
                                    if (Boolean($(this).data('sticky'))) {
                                        $(this).addClass('sticky');
                                    }

                                    moneSlot = $(this).data("desktopSlot");
                                    if (typeof moneSlot === 'undefined') {
                                        moneSlot = $(this).data("fallbackSlot");
                                    }

                                    monePosition = $(this).data("desktopPosition");
                                    if (typeof monePosition === 'undefined') {
                                        // Try to define from fallback
                                        monePosition = $(this).data("fallbackPosition");
                                        moneSectionPosition = $(this).closest(moneSectionClass).data(
                                            'sectionPosition');
                                        moneSectionPositionTemp = $(this).closest(moneSectionClass)
                                            .data('sectionPositionTemp');
                                        if (typeof moneSectionPositionTemp === 'undefined') {
                                            moneTempPosition = moneSectionPosition;
                                            $(this).closest(moneSectionClass).data(
                                                'section-position-temp', true);
                                        } else {
                                            moneTempPosition = moneSectionPosition + 1;
                                            $(this).closest(moneSectionClass).removeData(
                                                'section-position-temp');
                                        }
                                        // If position stil not defined (no fallback exist)
                                        if (typeof monePosition === 'undefined') {
                                            if (monePosition < moneTempPosition + 10) {
                                                monePosition = moneTempPosition + 10;
                                            } else {
                                                monePosition = moneTempPosition;
                                            }
                                        }
                                    }
                                    moneFormat = $(this).data("desktopFormat");
                                    if (typeof moneFormat === 'undefined') {
                                        moneFormat = $(this).data("fallbackFormat");
                                    }
                                }
                            }
                            if (typeof moneSlot !== 'undefined' && typeof monePosition !==
                                'undefined' && typeof moneFormat !== 'undefined' &&
                                typeof bbElements !== 'undefined') {
                                var moneServerClass = (SeznamOverrideBBservers == 1 &&
                                    SeznamAdsInitialization == 1 ? (moneSlot == 1 ? 5 : 6) :
                                    moneSlot) + '-' + monePosition + '-' +
                                moneFormat; // Server composition
                                var moneServer = DomainID + '.' + (SeznamOverrideBBservers == 1 &&
                                    SeznamAdsInitialization == 1 ? (moneSlot == 1 ? 5 : 6) :
                                    moneSlot) + '.' + monePosition + '.' + moneFormat;
                                var SeznamAdPosition = '';
                                if (typeof Drupal !== 'undefined' && Drupal.settings.prima_theme_pl
                                    .seznam_mapped_positions && SeznamOverrideBBservers == 0) {
                                    SeznamAdPosition = Drupal.settings.prima_theme_pl
                                        .seznam_mapped_positions[moneServer];
                                }

                                if (SeznamAdsInitialization == 0 || SeznamAdsInitialization == 1 &&
                                    SeznamOverrideBBservers == 1) {
                                    bbElements.manageAdSlot(moneRandomID, moneServer);
                                } // push position with ID & server
                                $(this).addClass('mone-' + moneServerClass);
                                $.moneAuthorizedBehavior($(this), moneParentClass, moneServer);
                                if (SeznamAdsInitialization == 1 && SeznamOverrideBBservers == 0) {
                                    console.warn('Disabled calling for ' + moneServer +
                                        ', Reason: Calling Seznam ads');
                                    console.log('%c Reason: Initialization of Seznam ADS',
                                        'background:black;color:white;', SeznamAdsInitialization);

                                    if (SeznamAdPosition) {
                                        SeznamAdsPositions.push({
                                            id: moneRandomID,
                                            zoneId: SeznamAdPosition
                                        });
                                        var moneID = '#' + moneRandomID;
                                        $(moneID).closest(moneParentClass).addClass('mone-loaded');
                                    }

                                    console.log(SeznamAdsPositions);
                                }
                            }
                        }
                    }
                });
                $.moneReqPlaceAll(moneIDsArray); // Call all at once
                if (SeznamAdsInitialization == 0 || SeznamAdsInitialization == 1 && SeznamOverrideBBservers ==
                    1) {
                    $.moneCheck(moneParentClass);
                } // Check all at once
            };

            $.moneIsAuthorized = function (moneElement, moneParent) {
                return moneElement.closest(moneParent).find('.show-mone-server').length ? true : false;
            };

            $.moneCalled = function (value, moneElement, moneParent) {
                if ($.moneIsAuthorized(moneElement, moneParent)) {
                    moneElement.closest(moneParent).addClass('admin-show-mone').find('.call-result').html(
                        value ? ', vrĂˇtil reklamu' : ', nevrĂˇtil reklamu');
                }
                moneElement.closest(moneParent).addClass(value ? 'mone-loaded' : 'mone-not-loaded');
            };

            $.moneAuthorizedBehavior = function (moneElement, moneParent, serverID) {
                if ($.moneIsAuthorized(moneElement, moneParent)) {
                    var renderText = ' : ' + serverID;
                    moneElement.closest(moneParent).find('.server-id').html(Boolean(moneElement.data(
                        'sticky')) ? renderText + ', plovoucĂ­' : renderText + ', standardnĂ­');
                    console.log('For element with ID: ' + moneElement.attr('id') +
                        ' was called mone from server: ' + serverID
                        ); // Console.log of called server & element ID
                }
            };

            $.moneGalleryLoadOnScroll = function (GalleryID, GalleryMoneElement, GalleryMoneCount) {
                var Gallery = '#' + GalleryID;
                if ($(Gallery).find('.mone-first').length) {
                    var LoadMoneAfter = $(Gallery).find('.mone-first');
                    var LoadMoneOffset = LoadMoneAfter.offset().top - $(window).scrollTop() - LoadMoneAfter
                        .outerHeight() * 2;
                    if (LoadMoneOffset <= 0 && $(Gallery).hasClass('load') === true && typeof pbjs ==
                        "undefined") {
                        $.moneGalleryLoadMoreMone(GalleryID, GalleryMoneElement, GalleryMoneCount);
                    }
                }
            };
            $.moneGalleryLoadMoreMone = function (GalleryID, GalleryMoneElement, GalleryMoneCount) {
                var Gallery = '#' + GalleryID;
                if ($(Gallery).data('page')) {
                    var gallery_page = $(Gallery).data('page') + 1;
                } else {
                    var gallery_page = 1;
                }
                $(Gallery).data('page', gallery_page);

                if ($(Gallery).data('original_url')) {
                    var original_url = $(Gallery).data('original_url');
                } else {
                    var original_url = window.location.origin + window.location.pathname;
                    $(Gallery).data('original_url', original_url);
                }

                if ($(Gallery).data('hash_url')) {
                    var hash_url = $(Gallery).data('hash_url');
                } else {
                    var hash_url = window.location.hash;
                    $(Gallery).data('hash_url', hash_url);
                }

                var GalleryMone = GalleryMoneElement || 'mone-load';
                var GalleryMoneClass = '.' + GalleryMone;
                var CountOfMoreMone = GalleryMoneCount || 5;
                if ($(Gallery).hasClass('load') === true) {
                    var new_url = original_url + '-stranka-' + gallery_page + hash_url;
                    history.pushState('', document.title, new_url);
                    $(Gallery).removeClass('load');
                    $(Gallery).find(GalleryMoneClass).nextAll().slice(0, CountOfMoreMone - 1).removeClass(
                        GalleryMone).find(moneClass).data('load', true); // Remove class from next x elements
                    $(Gallery).find(GalleryMoneClass).nextAll().slice(CountOfMoreMone - 1, CountOfMoreMone)
                        .removeClass(GalleryMone).addClass('mone-first');
                    $(Gallery).find(GalleryMoneClass + '.mone-first').removeClass('mone-first mone-load').find(
                        moneClass).data('load', true); // Remove class from first element
                    $(Gallery).find('.mone-first').addClass(
                    GalleryMone); // Add first class to next x-th element
                    $.moneLoad();
                    if ($(Gallery).find(GalleryMoneClass + '.mone-first').next().length > 0) {
                        $(Gallery).addClass(
                        'load'); // If there is more mone elements -> add class for load more mone
                    }
                }
            };
            $.moneReqPlaceAll = function (moneIDs) {
                if (typeof bbElements !== 'undefined') {
                    if (SeznamAdsInitialization == 0 || SeznamOverrideBBservers == 1 &&
                        SeznamAdsInitialization == 1) {
                        ibbAds.tag.requestAndPlaceAds(moneIDs);
                    } else if (SeznamAdsInitialization == 1 && window.im) {
                        window.im.getAds(SeznamAdsPositions);
                        SeznamAdsPositions = [];
                    }
                }
            };
            $.moneReqPlaceByOne = function (moneID) {
                if (typeof bbElements !== 'undefined' && SeznamAdsInitialization == 0 || typeof bbElements !==
                    'undefined' && SeznamOverrideBBservers == 1 && SeznamAdsInitialization == 1) {
                    ibbAds.tag.requestAndPlaceAds([moneID]);
                }
            };
            $.moneCheck = function (moneParentClass) {
                if (typeof bbElements !== 'undefined') {
                    ibbAds.tag.on("ADS_WRITTEN_TO_AD_SLOT", function (event) {
                        var moneID = '#' + event.getData().slotId;
                        $.moneCalled(true, $(moneID), moneParentClass);
                    });
                    ibbAds.tag.on("NO_AD_RETURNED_FOR_AD_SLOT", function (event) {
                        var moneID = '#' + event.getData().getCustomId();
                        $.moneCalled(false, $(moneID), moneParentClass);
                    });
                }
            };
            $.moneCheckSize = function (value) {
                var moneID = '#' + value;
                if ($.moneChildWidth(value) > 0 && $(moneID).children().length && $(moneID).closest(
                        moneParentClass).hasClass('mone-element-size-checked') === false) {
                    var moneChildrenWidth = $.moneChildWidth(value);
                    var moneChildrenHeight = $(moneID).children()
                .outerHeight(); // TODO: remove after change settings in mone servers
                    if ($(moneID).hasClass('footer') === true) {
                        $(moneID).closest(moneParentClass).addClass('mone-element-footer-size');
                        if ($(moneID).find('.footer-fluid').length) {
                            $(moneID).addClass('footer-fluid');
                        } else if ($(moneID).find('.footer-standard').length) {
                            $(moneID).addClass('footer-standard');
                        } // TODO: remove after change settings in mone servers
                        else if (moneChildrenHeight >= 550) {
                            $(moneID).addClass('footer-fluid');
                        } else if (moneChildrenWidth > 300) {
                            $(moneID).addClass('footer-standard');
                        } // TODO: finish
                    } else {
                        // Check if super size
                        if (moneChildrenWidth >= 500 && $(moneID).closest(moneParentClass).hasClass(
                                'mone-element-super-size') === false) {
                            $(moneID).closest(moneParentClass).addClass('mone-element-super-size');
                        } else if ($(moneID).find('.wallpaper-mone').length) {
                            $(moneID).closest(moneParentClass).addClass('mone-element-wallpaper-size');
                        } else {
                            $(moneID).closest(moneParentClass).addClass('mone-element-standard-size');
                        }
                    }
                    $(moneID).closest(moneParentClass).addClass('mone-element-size-checked');
                    // Check if sticky
                    if ($(moneID).hasClass('sticky') === true && $(moneID).closest(moneParentClass).hasClass(
                            'mone-element-sticky') === false) {
                        $(moneID).closest(moneParentClass).removeClass('mone-element-not-sticky').addClass(
                            'mone-element-sticky');
                    } else {
                        $(moneID).closest(moneParentClass).removeClass('mone-element-sticky').addClass(
                            'mone-element-not-sticky');
                    }
                }
            };
            $.moneSticky = function () {
                $(moneParentClass).each(function () {
                    var moneID = $(this).find(moneClass).attr('id');
                    if (typeof moneID !== 'undefined') {
                        //        if ($(window).outerWidth() >= mobileBreakpoint) {
                        if ($(this).hasClass('mone-element-size-checked') === true) {
                            if ($(this).hasClass('mone-element-sticky') === true) {
                                var moneParTopPos = $(this).offset().top - $(window).scrollTop();
                                var moneParBotPos = moneParTopPos + $(this).outerHeight();
                                var moneTopPos = moneParTopPos;
                                if ($(this).parent().hasClass('mone--section-sidebar-mone') === true) {
                                    moneBotPosMargin = 10;
                                } else {
                                    moneBotPosMargin = 0;
                                }
                                var moneBotPos = moneParBotPos - $(this).find(moneParentInnerClass)
                                    .outerHeight() - moneBotPosMargin;
                                if ($.moneElementTopOffset() !== false) {
                                    ElementTopOffset = $.moneElementTopOffset();
                                } else {
                                    ElementTopOffset = 0;
                                }

                                if (moneTopPos <= ElementTopOffset && moneBotPos >= ElementTopOffset) {
                                    if ($(this).find(moneParentInnerClass).hasClass('mone-sticky') ===
                                        false) {
                                        $(this).find(moneParentInnerClass).removeClass('mone-absolute')
                                            .addClass('mone-sticky');
                                        if (ElementTopOffset > 0) {
                                            $(this).find(moneParentInnerClass).css('top',
                                                ElementTopOffset);
                                        } else {
                                            $(this).find(moneParentInnerClass).css('top', '');
                                        }
                                    }
                                } else if (moneBotPos < ElementTopOffset) {
                                    if ($(this).find(moneParentInnerClass).hasClass('mone-absolute') ===
                                        false) {
                                        $(this).find(moneParentInnerClass).removeClass('mone-sticky')
                                            .addClass('mone-absolute').css('top', '');
                                    }
                                } else if ($(this).find(moneParentInnerClass).hasClass('mone-sticky') ||
                                    $(this).find(moneParentInnerClass).hasClass('mone-absolute')) {
                                    $(this).find(moneParentInnerClass).removeClass(
                                        'mone-sticky mone-absolute').css('top', '');
                                }
                            }
                        } else if ($(this).hasClass('mone-loaded') === true) {
                            $.moneCheckSize(moneID);
                        }
                        //        }
                    }
                });
            };
            $.moneChildWidth = function (value) {
                var moneID = '#' + value;
                var moneChildWidth = 0;
                $.each(['iframe', 'img', 'div', 'table'], function (index, element) {
                    var moneChildFirstElement = $(moneID).find(element +
                    ':eq(0)'); // Find first element from array above
                    if (moneChildFirstElement.length) { // If element exist
                        moneChildWidth = moneChildFirstElement.outerWidth();
                    }
                });
                if (moneChildWidth > 0) {
                    return moneChildWidth;
                } else {
                    return $(moneID).children().outerWidth(); // Just fallback
                }
            };
            $.moneReCheckSize = function () {
                if ($(window).outerWidth() >= mobileBreakpoint) {
                    $.moneCheckAfterLoad(false);
                }
            };
            $.moneResetAfterLoad = function (moneElement) {
                moneElement.removeClass(
                    'mone-element-size-checked mone-element-super-size mone-element-standard-size mone-element-wallpaper-size'
                    ).data('height', moneElement.outerHeight(true));
            };

            $.moneCheckAfterLoad = function (areaIdent, hasChanges) {
                hasChanges = hasChanges || false;
                if (areaIdent == false) {
                    $(moneParentClass).each(function () {
                        if ($(this).data('height') !== $(this).outerHeight(true)) {
                            $.moneResetAfterLoad($(this));
                            hasChanges = true;
                        }
                    });
                } else {
                    $(areaIdent).find(moneParentClass).each(function () {
                        if ($(this).data('height') !== $(this).outerHeight(true)) {
                            $.moneResetAfterLoad($(this));
                            hasChanges = true;
                        }
                    });
                }
                return hasChanges;
            };

            $.moneLeaderBoardCanvas = function () {
                if ($(PremLeadCanv).hasClass('canvasLoaded') === false && $(PremLeadCanv).find(
                        '.mone--element-mone').hasClass('mone-loaded')) {
                    $(PremLeadCanv).addClass('canvasLoaded');
                }
                if ($(PremLeadCanv).hasClass('canvasLoaded')) {
                    if ($(PremLeadCanv).height() != $(PremLeadCanvInner).height()) {
                        $(PremLeadCanv).height($(PremLeadCanvInner).height());
                    }
                    if ($(PremLeadCanv).outerHeight() - $(PremLeadCanv).offset().top - $(window).scrollTop() >
                        0) {
                        $(PremLeadCanvWrapper).height($(PremLeadCanv).outerHeight() - $(window).scrollTop());
                        if ($(PremLeadCanvWrapper).hasClass('canvasHidden')) {
                            $(PremLeadCanvWrapper).removeClass('canvasHidden');
                        }
                    } else {
                        $(PremLeadCanvWrapper).height(0);
                        if ($(PremLeadCanvWrapper).hasClass('canvasHidden') === false) {
                            $(PremLeadCanvWrapper).addClass('canvasHidden');
                        }
                    }
                }
            };

            $(moneParentClass).each(function () {
                $(this).find(moneCloseButton).click(function () {
                    $.PremiumTriggerPromoPage();
                });
            });
            $.remoteScriptUTM = function () {
                $.each(['#footer-text-mone-scripts', '#footer-related-mone-scripts',
                    '#footer-sticky-mone-scripts'
                ], function (index, elID) {
                    if ($(elID).length) {
                        $.remoteScriptUTMLoad(elID);
                    }
                });
            };
            $.remoteScriptUTMLoad = function (elID) {
                if ($.remoteScriptUTMProvider() != false) {
                    var loadScript = $.remoteScriptUTMProvider();
                    $.remoteScriptUTMCookie(loadScript, PrimaPL.url.getQuery('hostname'));
                } else if (typeof $.cookie('mone_provider_session') !== 'undefined') {
                    var loadScript = $.cookie('mone_provider_session');
                } else {
                    var loadScript = 'default';
                }
                $(elID).find('script').each(function () {
                    if (loadScript != 'default') {
                        if ($(this).data(loadScript + 'Src')) {
                            $(this).attr('src', $(this).data(loadScript + 'Src'));
                        }
                    } else {
                        if ($(this).data('performaxSrc')) {
                            $(this).attr('src', $(this).data('performaxSrc'));
                        }
                    }
                });
            };
            $.remoteScriptUTMProvider = function () {
                if (PrimaPL.url.getQuery('?utm_medium') != undefined && PrimaPL.url.getQuery('?utm_medium') ==
                    'sekce-z-internetu') {
                    return 'seznam';
                } else {
                    return false;
                }
            };
            $.remoteScriptUTMCookie = function (provider, domain) {
                if (typeof $.cookie('mone_provider_session') === 'undefined') {
                    var UTMCookieDate = new Date();
                    UTMCookieDate.setTime(UTMCookieDate.getTime() + (10 * 60 *
                    1000)); // minutes * secounds * milisecond, can add: (days * hours) on start
                    document.cookie = 'mone_provider_session=' + provider + ';expires=' + UTMCookieDate
                        .toGMTString() + ';domain=' + domain + ';path=/';
                }
            };

            // Leaderboard in content
            var ldb_content = $('#ContentLeaderboard');
            var ldb_content_mone = ldb_content.find('.mone--element-mone');
            // LDB show as scroll
            function ldb_content_fn_height(scrolled, moneHeight, limit, start, limited) {
                ldb_content.css('height', function (index, height) {
                    var actHeight = parseInt(height);
                    if (limited) {
                        var newHeight = scrolled - limit;
                    } else {
                        var newHeight = actHeight + scrolled - start;
                    }
                    if (moneHeight > actHeight) {
                        if (newHeight > actHeight) {
                            if (!ldb_content.hasClass('opening')) {
                                ldb_content.addClass('opening');
                            }
                            return (newHeight * 1.01);
                        }
                    } else {
                        ldb_content.removeClass('opening').addClass('opened');
                        return moneHeight;
                    }
                });
            }
            // LDB behavior
            function ldb_content_fn(scrolled, moneHeight, winHeight, ldb_top, start) {
                var limit = ldb_top - (winHeight / 1.2);
                if (!ldb_content.hasClass('opened') && ldb_content_mone.hasClass('mone-loaded')) {
                    if (ldb_content.hasClass('opening')) {
                        ldb_content_fn_height(scrolled, moneHeight, limit, start, false);
                    } else if (scrolled > limit) {
                        ldb_content_fn_height(scrolled, moneHeight, limit, start, true);
                    }
                } else if (ldb_content.hasClass('opened') && ldb_content.height() != moneHeight) {
                    ldb_content_fn_height(scrolled, moneHeight, limit, start, true);
                }
            }

            $(window).on("load", function () {
                $.moneLoad();
                $.moneSticky();
                $.moneLeaderBoardCanvas();
                $.remoteScriptUTM();
            });

            var lastScroll = 0;
            $(window).on("scroll", function () {
                $.moneReCheckSize();
                $.moneSticky();
                $.moneLeaderBoardCanvas();
                if (ldb_content.length && ldb_content_mone.length) {
                    var scrolled = $(this).scrollTop();
                    if (scrolled > lastScroll) {
                        // On down scroll
                        ldb_content_fn(scrolled, ldb_content_mone.data('height'), $(window).height(),
                            ldb_content.offset().top, lastScroll);
                    }
                    lastScroll = scrolled;
                }
            });

            $(window).on("resize", function () {
                $.moneSticky();
                $.moneLeaderBoardCanvas();
            });
        })(jQuery);