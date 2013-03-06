/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-svg-touch-shiv-cssclasses-teststyles-prefixes-load
 */
;window.Modernizr=function(a,b,c){function x(a){j.cssText=a}function y(a,b){return x(m.join(a+";")+(b||""))}function z(a,b){return typeof a===b}function A(a,b){return!!~(""+a).indexOf(b)}function B(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:z(f,"function")?f.bind(d||b):f}return!1}var d="2.6.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n={svg:"http://www.w3.org/2000/svg"},o={},p={},q={},r=[],s=r.slice,t,u=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},v={}.hasOwnProperty,w;!z(v,"undefined")&&!z(v.call,"undefined")?w=function(a,b){return v.call(a,b)}:w=function(a,b){return b in a&&z(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=s.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(s.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(s.call(arguments)))};return e}),o.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:u(["@media (",m.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},o.svg=function(){return!!b.createElementNS&&!!b.createElementNS(n.svg,"svg").createSVGRect};for(var C in o)w(o,C)&&(t=C.toLowerCase(),e[t]=o[C](),r.push((e[t]?"":"no-")+t));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)w(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},x(""),i=k=null,function(a,b){function k(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function l(){var a=r.elements;return typeof a=="string"?a.split(" "):a}function m(a){var b=i[a[g]];return b||(b={},h++,a[g]=h,i[h]=b),b}function n(a,c,f){c||(c=b);if(j)return c.createElement(a);f||(f=m(c));var g;return f.cache[a]?g=f.cache[a].cloneNode():e.test(a)?g=(f.cache[a]=f.createElem(a)).cloneNode():g=f.createElem(a),g.canHaveChildren&&!d.test(a)?f.frag.appendChild(g):g}function o(a,c){a||(a=b);if(j)return a.createDocumentFragment();c=c||m(a);var d=c.frag.cloneNode(),e=0,f=l(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function p(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return r.shivMethods?n(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+l().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(r,b.frag)}function q(a){a||(a=b);var c=m(a);return r.shivCSS&&!f&&!c.hasCSS&&(c.hasCSS=!!k(a,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),j||p(a,c),a}var c=a.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,e=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,f,g="_html5shiv",h=0,i={},j;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",f="hidden"in a,j=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){f=!0,j=!0}})();var r={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,supportsUnknownElements:j,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:q,createElement:n,createDocumentFragment:o};a.html5=r,q(b)}(this,b),e._version=d,e._prefixes=m,e.testStyles=u,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+r.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};;
jQuery.extend ({

    URLEncode: function (s) {
        s = encodeURIComponent (s);
        s = s.replace (/\~/g, '%7E').replace (/\!/g, '%21').replace (/\(/g, '%28').replace (/\)/g, '%29').replace (/\'/g, '%27');
        s = s.replace (/%20/g, '+');
        return s;
    },

    URLDecode: function (s) {
        s = s.replace (/\+/g, '%20');
        s = decodeURIComponent (s);
        return s;
    },

    setCookie: function (c_name, value, exdays) 
    {
        var exdate=new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
        document.cookie=c_name + "=" + c_value + ";path=/";
    }

});;
/*!
 * 'addPlaceholder' Plugin for jQuery
 *
 * @author Ilia Draznin
 * @link http://iliadraznin.com/2011/02/jquery-placeholder-plugin/
 * @created 19-02-2011
 * @updated 06-04-2011
 * @version 1.0.3
 *
 * Description:
 * jQuery plugin that adds "placeholder" functionality (like in Chrome) to browsers that
 * don't support it natively (like Firefox 3.6 or lower, or IE naturally)
 *
 * Usage:
 * $(selector).addPlaceholder(options);
 */
(function($){
    $.extend($.support, {placeholder: !!('placeholder' in document.createElement('input'))});

    $.fn.addPlaceholder = function(options){
        var settings = {
            'class': 'placeholder',
            'allowspaces': false,
            'dopass': true,
            'dotextarea': true,
            'checkafill': false
        };

        return this.each(function(){
            if ($.support.placeholder) return false;

            $.extend( settings, options );

            if ( !( this.tagName.toLowerCase()=='input' || (settings['dotextarea'] && this.tagName.toLowerCase()=='textarea') ) ) return true;

            var $this = $(this),
                ph = this.getAttribute('placeholder'),
                ispass = $this.is('input[type=password]');

            if (!ph) return true;

            if (settings['dopass'] && ispass) {
                passPlacehold($this, ph);
            }
            else if (!ispass) {
                inputPlacehold($this, ph)
            }
        });

        function inputPlacehold(el, ph) {
            if ( valueEmpty(el.val()) || el.val()==ph ) {
                el.val(ph);
                el.addClass(settings['class']);
            }

            el.focusin(function(){
                if (el.hasClass(settings['class'])) {
                    el.removeClass(settings['class']);
                    el.val('');
                }
            });
            el.focusout(function(){
                if ( valueEmpty(el.val()) ) {
                    el.val(ph);
                    el.addClass(settings['class']);
                }
            });
        }

        function passPlacehold(el, ph) {
            el.addClass(settings['class']);
            var span = $('<span/>',{
                'class': el.attr('class')+' '+settings['class'],
                text: ph,
                css: {
                    border:     'none',
                    cursor:     'text',
                    background: 'transparent',
                    position:   'absolute',
                    top:        el.position().top,
                    left:       el.position().left,
                    lineHeight: el.height()+3+'px',
                    paddingLeft:parseFloat(el.css('paddingLeft'))+2+'px'
                }
            }).insertAfter(el);

            span.click(function() {
                el.focusin();
                el.focus();
            });

            el.focusin(function(){
                if (el.hasClass(settings['class'])) {
                    span.hide();
                    el.removeClass(settings['class']);
                }
            });
            el.focusout(function(){
                if ( valueEmpty(el.val()) ) {
                    span.show();
                    el.addClass(settings['class']);
                }
            });

            if (settings['checkafill']) {
                (function checkPass(){
                    if (!valueEmpty(el.val()) && el.hasClass(settings['class'])) {
                        el.focusin();
                    }
                    setTimeout(checkPass, 250);
                })();
            }
        }

        function valueEmpty( value ) {
            return settings['allowspaces'] ? value==='' : $.trim(value)==='';
        }
    };
})(jQuery);

jQuery(document).ready(function() {
    jQuery('[placeholder]').addPlaceholder({'checkafill': true});
});
;
(function() {
    
    var BrowserDetect = {
        init: function () {
            this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
            this.version = this.searchVersion(navigator.userAgent)
                || this.searchVersion(navigator.appVersion)
                || "an unknown version";
            this.OS = this.searchString(this.dataOS) || "an unknown OS";
        },
        searchString: function (data) {
            for (var i=0;i<data.length;i++) {
                var dataString = data[i].string;
                var dataProp = data[i].prop;
                this.versionSearchString = data[i].versionSearch || data[i].identity;
                if (dataString) {
                    if (dataString.indexOf(data[i].subString) != -1)
                        return data[i].identity;
                }
                else if (dataProp)
                    return data[i].identity;
            }
        },
        searchVersion: function (dataString) {
            var index = dataString.indexOf(this.versionSearchString);
            if (index == -1) return;
            return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
        },
        dataBrowser: [
            {
                string: navigator.userAgent,
                subString: "Chrome",
                identity: "Chrome"
            },
            {   string: navigator.userAgent,
                subString: "OmniWeb",
                versionSearch: "OmniWeb/",
                identity: "OmniWeb"
            },
            {
                string: navigator.vendor,
                subString: "Apple",
                identity: "Safari",
                versionSearch: "Version"
            },
            {
                prop: window.opera,
                identity: "Opera"
            },
            {
                string: navigator.vendor,
                subString: "iCab",
                identity: "iCab"
            },
            {
                string: navigator.vendor,
                subString: "KDE",
                identity: "Konqueror"
            },
            {
                string: navigator.userAgent,
                subString: "Firefox",
                identity: "Firefox"
            },
            {
                string: navigator.vendor,
                subString: "Camino",
                identity: "Camino"
            },
            {       // for newer Netscapes (6+)
                string: navigator.userAgent,
                subString: "Netscape",
                identity: "Netscape"
            },
            {
                string: navigator.userAgent,
                subString: "MSIE",
                identity: "Explorer",
                versionSearch: "MSIE"
            },
            {
                string: navigator.userAgent,
                subString: "Gecko",
                identity: "Mozilla",
                versionSearch: "rv"
            },
            {       // for older Netscapes (4-)
                string: navigator.userAgent,
                subString: "Mozilla",
                identity: "Netscape",
                versionSearch: "Mozilla"
            }
        ],
        dataOS : [
            {
                string: navigator.userAgent,
                subString: "Windows NT 5",
                identity: "Windows XP"
            },
            {
                string: navigator.platform,
                subString: "Win",
                identity: "Windows"
            },
            {
                string: navigator.platform,
                subString: "Mac",
                identity: "Mac"
            },
            {
                string: navigator.userAgent,
                subString: "iPhone",
                identity: "iPhone/iPod"
            },
            {
                string: navigator.platform,
                subString: "Linux",
                identity: "Linux"
            }
        ]
    
    };
    
    BrowserDetect.init();
    
    window.jQuery.client = { os : BrowserDetect.OS, browser : BrowserDetect.browser };
    
})();;
/**
 * jQuery Masonry v2.1.06
 * A dynamic layout plugin for jQuery
 * The flip-side of CSS Floats
 * http://masonry.desandro.com
 *
 * Licensed under the MIT license.
 * Copyright 2012 David DeSandro
 */
(function(a,b,c){"use strict";var d=b.event,e;d.special.smartresize={setup:function(){b(this).bind("resize",d.special.smartresize.handler)},teardown:function(){b(this).unbind("resize",d.special.smartresize.handler)},handler:function(a,c){var d=this,f=arguments;a.type="smartresize",e&&clearTimeout(e),e=setTimeout(function(){b.event.handle.apply(d,f)},c==="execAsap"?0:100)}},b.fn.smartresize=function(a){return a?this.bind("smartresize",a):this.trigger("smartresize",["execAsap"])},b.Mason=function(a,c){this.element=b(c),this._create(a),this._init()},b.Mason.settings={isResizable:!0,isAnimated:!1,animationOptions:{queue:!1,duration:500},gutterWidth:0,isRTL:!1,isFitWidth:!1,containerStyle:{position:"relative"}},b.Mason.prototype={_filterFindBricks:function(a){var b=this.options.itemSelector;return b?a.filter(b).add(a.find(b)):a},_getBricks:function(a){var b=this._filterFindBricks(a).css({position:"absolute"}).addClass("masonry-brick");return b},_create:function(c){this.options=b.extend(!0,{},b.Mason.settings,c),this.styleQueue=[];var d=this.element[0].style;this.originalStyle={height:d.height||""};var e=this.options.containerStyle;for(var f in e)this.originalStyle[f]=d[f]||"";this.element.css(e),this.horizontalDirection=this.options.isRTL?"right":"left";var g=this.element.css("padding-"+this.horizontalDirection),h=this.element.css("padding-top");this.offset={x:g?parseInt(g,10):0,y:h?parseInt(h,10):0},this.isFluid=this.options.columnWidth&&typeof this.options.columnWidth=="function";var i=this;setTimeout(function(){i.element.addClass("masonry")},0),this.options.isResizable&&b(a).bind("smartresize.masonry",function(){i.resize()}),this.reloadItems()},_init:function(a){this._getColumns(),this._reLayout(a)},option:function(a,c){b.isPlainObject(a)&&(this.options=b.extend(!0,this.options,a))},layout:function(a,b){for(var c=0,d=a.length;c<d;c++)this._placeBrick(a[c]);var e={};e.height=Math.max.apply(Math,this.colYs);if(this.options.isFitWidth){var f=0;c=this.cols;while(--c){if(this.colYs[c]!==0)break;f++}e.width=(this.cols-f)*this.columnWidth-this.options.gutterWidth}this.styleQueue.push({$el:this.element,style:e});var g=this.isLaidOut?this.options.isAnimated?"animate":"css":"css",h=this.options.animationOptions,i;for(c=0,d=this.styleQueue.length;c<d;c++)i=this.styleQueue[c],i.$el[g](i.style,h);this.styleQueue=[],b&&b.call(a),this.isLaidOut=!0},_getColumns:function(){var a=this.options.isFitWidth?this.element.parent():this.element,b=a.width();this.columnWidth=this.isFluid?this.options.columnWidth(b):this.options.columnWidth||this.$bricks.outerWidth(!0)||b,this.columnWidth+=this.options.gutterWidth,this.cols=Math.floor((b+this.options.gutterWidth)/this.columnWidth),this.cols=Math.max(this.cols,1)},_placeBrick:function(a){var c=b(a),d,e,f,g,h;d=Math.ceil(c.outerWidth(!0)/this.columnWidth),d=Math.min(d,this.cols);if(d===1)f=this.colYs;else{e=this.cols+1-d,f=[];for(h=0;h<e;h++)g=this.colYs.slice(h,h+d),f[h]=Math.max.apply(Math,g)}var i=Math.min.apply(Math,f),j=0;for(var k=0,l=f.length;k<l;k++)if(f[k]===i){j=k;break}var m={top:i+this.offset.y};m[this.horizontalDirection]=this.columnWidth*j+this.offset.x,this.styleQueue.push({$el:c,style:m});var n=i+c.outerHeight(!0),o=this.cols+1-l;for(k=0;k<o;k++)this.colYs[j+k]=n},resize:function(){var a=this.cols;this._getColumns(),(this.isFluid||this.cols!==a)&&this._reLayout()},_reLayout:function(a){var b=this.cols;this.colYs=[];while(b--)this.colYs.push(0);this.layout(this.$bricks,a)},reloadItems:function(){this.$bricks=this._getBricks(this.element.children())},reload:function(a){this.reloadItems(),this._init(a)},appended:function(a,b,c){if(b){this._filterFindBricks(a).css({top:this.element.height()});var d=this;setTimeout(function(){d._appended(a,c)},1)}else this._appended(a,c)},_appended:function(a,b){var c=this._getBricks(a);this.$bricks=this.$bricks.add(c),this.layout(c,b)},remove:function(a){this.$bricks=this.$bricks.not(a),a.remove()},destroy:function(){this.$bricks.removeClass("masonry-brick").each(function(){this.style.position="",this.style.top="",this.style.left=""});var c=this.element[0].style;for(var d in this.originalStyle)c[d]=this.originalStyle[d];this.element.unbind(".masonry").removeClass("masonry").removeData("masonry"),b(a).unbind(".masonry")}},b.fn.imagesLoaded=function(a){function h(){a.call(c,d)}function i(a){var c=a.target;c.src!==f&&b.inArray(c,g)===-1&&(g.push(c),--e<=0&&(setTimeout(h),d.unbind(".imagesLoaded",i)))}var c=this,d=c.find("img").add(c.filter("img")),e=d.length,f="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",g=[];return e||h(),d.bind("load.imagesLoaded error.imagesLoaded",i).each(function(){var a=this.src;this.src=f,this.src=a}),c};var f=function(b){a.console&&a.console.error(b)};b.fn.masonry=function(a){if(typeof a=="string"){var c=Array.prototype.slice.call(arguments,1);this.each(function(){var d=b.data(this,"masonry");if(!d){f("cannot call methods on masonry prior to initialization; attempted to call method '"+a+"'");return}if(!b.isFunction(d[a])||a.charAt(0)==="_"){f("no such method '"+a+"' for masonry instance");return}d[a].apply(d,c)})}else this.each(function(){var c=b.data(this,"masonry");c?(c.option(a||{}),c._init()):b.data(this,"masonry",new b.Mason(a,this))});return this}})(window,jQuery);

// Masonry corner stamp modifications
jQuery.Mason.prototype.resize = function() {
  this._getColumns();
  this._reLayout();
};

jQuery.Mason.prototype._reLayout = function( callback ) {
  var freeCols = this.cols;
  if ( this.options.cornerStampSelector ) {
    var $cornerStamp = this.element.find( this.options.cornerStampSelector ),
        cornerStampX = $cornerStamp.offset().left - 
          ( this.element.offset().left + this.offset.x + parseInt($cornerStamp.css('marginLeft')) );
    freeCols = Math.floor( cornerStampX / this.columnWidth );
  }
  // reset columns
  var i = this.cols;
  this.colYs = [];
  while (i--) {
    this.colYs.push( this.offset.y );
  }

  for ( i = freeCols; i < this.cols; i++ ) {
    this.colYs[i] = this.offset.y + $cornerStamp.outerHeight(true);
  }

  // apply layout logic to all bricks
  this.layout( this.$bricks, callback );
};;
/*

    13twelve vs. jQuery

    This javascript is the main javascript for the sites actions.

*/

// --------------------------------------------------------------------------------------------------------------

var BB = {
};

BB.Behaviors = {
}
BB.Functions = {
}

BB.LoadBehavior = function(context){
  if(context === undefined){
    context = jQuery(document);
  }

  context.find("*[data-behavior]").each(function(){
    var that = jQuery(this);
    var behaviors = that.attr('data-behavior');

    jQuery.each(behaviors.split(" "), function(index,behaviorName){
      try {
        var BehaviorClass = BB.Behaviors[behaviorName];
        var initializedBehavior = new BehaviorClass(that);
      }
      catch(e){
        // No Operation
      }
    });
  });
};

BB.onReady = function(){
  BB.LoadBehavior();
};

jQuery(document).ready(function($){
  if  (jQuery.client.os == "Windows XP" && jQuery.client.browser == "Safari")
  {
    jQuery('body, body *').css('font-family', 'Arial');
  }
  BB.isBBBiz = jQuery('#bb').hasClass('bbbiz');
  BB.onReady();
});

/*
Disable "Complitly" Chrome Plugin/malware to prevent /udefinined URLs from being called"
http://stackoverflow.com/a/14174452
*/
window.suggestmeyes_loaded = true;;
/* bbbiz */
BB.Behaviors.bbbiz = function(container){

    /* navigation */
    if (jQuery('#navigation').size()) {
        jQuery('#navigation .expanded').find('ul > li').each(function()
        {
            var _li = jQuery(this);
            var _title = jQuery(this).find('h3').first();
            _li.addClass(_title.attr('class'));
        });
        jQuery('#navigation .title-link').each(function()
        {
            var _title = jQuery(this);
            _title.parent().addClass(_title.attr('class'));
            _title.replaceWith(jQuery('<h3>'+_title.html()+'</h3>'));
        });
        jQuery('#navigation .ipad-icon, #navigation .col-1').each(function()
        {
            var _obj = jQuery(this);
            _obj.parent().addClass(_obj.attr('class'));
        });
    }

    /* Play entire chart */
    if (jQuery('.play-entire').size())
    {
        var myspace_id = [];
        jQuery('input.myspace').each(function() 
        {
            myspace_id.push(jQuery(this).val());
        });
        jQuery('.play-entire').click(function() 
        {
            window.open('http://www.myspace.com/music/player?songs='+myspace_id.join(','), 'Myspace', 'location=1,status=1,scrollbars=0,width=650,height=480');
            return false;
        });
    }

    /* Fix Biz search */
    if (jQuery('body.page-biz-search').size() && BB.isBBBiz)
    {
        jQuery('body.page-biz-search').addClass('page-search');
    }
    if (jQuery('#header #search-block-form').size() && BB.isBBBiz)
    {
        jQuery('#header #search-block-form').submit(function()
        {
            document.location.href = "/biz/search/site/" + jQuery('.form-text').val();
            return false;
        });
    }

    /* make backbeat items same height */
    if (BB.isBBBiz)
    {   
        var $beckbeat_view = jQuery('.view-bbbiz-landing-pages.view-display-id-block_bbbiz_backbeat, .view-id-bbbiz_landing_pages.view-display-id-block_backbeat, .view-id-bbbiz_landing_pages.view-display-id-block_community_backbeat');
        if ($beckbeat_view.length) {
            $beckbeat_view.find(".views-row-odd").each(function() {
                var p1 = jQuery(this).children(),
                    p2 = jQuery(this).next().children();

                if (p1.length && p2.length) {
                    if (p1.height() > p2.height()) 
                        p2.height(p1.height());
                    else
                        p1.height(p2.height());
                }
            });
        }
    }


}
;
/* general */
BB.Behaviors.billboard = function(container){
    /* fix navigation width */
    /* fix expanded click */
    if (jQuery('#navigation').size()) {
        var _menu = jQuery('#navigation .menu').first();
        var _width = _menu.width();
        var _items_width = 0;
        _menu.find('>li').each(function(){
            _items_width += jQuery(this).outerWidth(true);
        });
        var _diff_width = _width - _items_width - 1;
        if (_diff_width > 0)
        {
            var _d = Math.floor(_diff_width/_menu.find('>li').size());
            var _last_d = _diff_width - _menu.find('>li').size()*_d;
            _menu.find('>li').each(function(i){
                jQuery(this).width(jQuery(this).width()+_d);
            });
            var _last = _menu.find('>li').last();
            _last.width(_last.width() + _last_d);
        }
        _menu.find('>li.expanded>a').each(function(){
            jQuery(this).click(function(){ return false; })
        });
    }

    /* header search hover effects */
    jQuery('#header #search-block-form').find('input.form-text').focus(function()
    {
        jQuery('#header #search-block-form input.form-submit').unbind();
        jQuery('#header #search-block-form input.form-submit').hover(function(){
            if (BB.isBBBiz)
            {
                jQuery('#header #search-block-form input.form-submit').css('background-color','#FA3D33');
            }
            else
            {
                jQuery('#header #search-block-form input.form-submit').css('background-color','#1cace2');
            }
            jQuery('#header #search-block-form input.form-submit').css('background-position', '10px -92px');
        },
        function(){
            jQuery('#header #search-block-form input.form-submit').css('background-color','transparent');
            jQuery('#header #search-block-form input.form-submit').css('background-position', '-140px -92px');
        });
    })
    .focusout(function(){
        jQuery('#header #search-block-form input.form-submit').unbind();
        jQuery('#header #search-block-form input.form-submit').removeAttr('style');
    });
    jQuery('.not-logged .star').mouseover(function(){
      var url = jQuery('.field-name-field-fan-voting .facebook-action-connect').attr('href');
      if (typeof url !== 'undefined') {
        window.location = url;
      }
    });

    /* disable autocomplete on search from */
    jQuery('#edit-keys').attr('autocomplete', 'off').attr('disabled', 'disabled');

    /* disqus tracker */
    var _comments_count = [];
    jQuery('a[data-disqus-identifier]').each(function(i)
    {
        _comments_count[i] = jQuery(this).html();
    });
    var _disqus_tracker = setInterval(function()
    {
        jQuery('a[data-disqus-identifier]').each(function(i)
        {
            if (jQuery(this).html() != _comments_count[i])
            {
                var _tmp = jQuery(this).html().split(' ');

                var _o = jQuery(this).prev('.comments-link-text');
                if (_o.length != 0) {
                  _tmp[0] = _o.text() + ' (' + _tmp[0] + ')';
                  _o.remove();
                }

                var _o = jQuery(this).prev('.comments-link-text-promo_278');
                if (_o.length != 0) {
                  _tmp[0] = _tmp[0] + ' ' + _o.text();
                  _o.remove();
                }

                jQuery(this).html(_tmp[0]);
                _comments_count[i] = true;
            }
        });
        var _is_all_ok = true;
        for(var i in _comments_count)
        {
            if (_comments_count[i] != true) _is_all_ok = false;
        }
        if (_is_all_ok) clearInterval(_disqus_tracker);
    }, 500);

    /* articles landing page */
    if (jQuery('.field-name-field-landing-page-articles .view-filters form').size())
    {
        var _pathname = document.location.pathname;
        var _filter = jQuery('.field-name-field-landing-page-articles .view-filters');
        _filter.find('form').attr('action', _pathname);
        if (jQuery('#content .tertiary-menu').size())
        {
            jQuery('#content .tertiary-menu > .content').append(_filter);
            _filter.find('input').unbind('click').unbind('submit');
            jQuery('#sidebar-second').css('margin-top', jQuery('#content .tertiary-menu').height());
        }
        else
        {
            _filter.remove();
        }
        var selector = '.views-widget-filter-type, .views-widget-filter-field_review_template_value';
        if (jQuery(selector).size())
        {
            var _obj = jQuery(selector).find('select');
            jQuery(selector).hide();
            var _obj_html = jQuery('<div class="filter-type"></div>');
            _obj.find('option').each(function()
            {
                var _a = jQuery('<a href="#">'+jQuery(this).text()+'</a>');
                var _val = jQuery(this).attr('value');
                if (jQuery(this).attr('selected') == 'selected') _a.addClass('active');
                _a.click(function()
                {
                    jQuery('.filter-type a').removeClass('active');
                    jQuery(this).addClass('active');
                    _obj.val(_val);
                    jQuery('#content .tertiary-menu form').submit();
                    return false;
                });
                _obj_html.append(_a);
            });
            jQuery('#content .tertiary-menu > .content').append(_obj_html);
        }
    }

    /* backbeat page */
    if (jQuery('#views-exposed-form-billboard-gallery-block-bbbiz-backbeat').size())
    {
        var _pathname = document.location.pathname;
        var _filter = jQuery('#views-exposed-form-billboard-gallery-block-bbbiz-backbeat').parent();
        _filter.find('form').attr('action', _pathname);
        if (jQuery('#block-menu-menu-bbbiz-community-backbeat').size())
        {
            jQuery('#block-menu-menu-bbbiz-community-backbeat > .content').append(_filter);
            _filter.find('input').unbind('click').unbind('submit');
            jQuery('#sidebar-bottom').css('margin-top', jQuery('#block-menu-menu-bbbiz-community-backbeat').parent().height() + 20);
        }
        else
        {
            _filter.remove();
        }
    }

    /* fix exposed filters */
    if (jQuery('.views-exposed-widget.views-widget-filter-title').size())
    {
        jQuery('.views-exposed-widget.views-widget-filter-title').each(function()
        {
            _filter = jQuery(this).parents('form');
            var _pathname = document.location.pathname;
            // articles pages
            if (/^(\/?)(articles)/.test(_pathname))
            {
                _filter.submit(function(){
                    document.location.href = '/search/site/'+_filter.find('#edit-title').val()+'?f[0]=ss_bb_type%3Aarticle';
                    return false;
                });
            }
            // artists pages
            if (/^(\/?)(artists)/.test(_pathname))
            {
                _filter.submit(function(){
                    document.location.href = '/search/site/'+_filter.find('#edit-title').val()+'?f[0]=ss_bb_type%3Aartist';
                    return false;
                });
            }
        });
    }

    /* latest tweet */
    if (jQuery('.artist_latest_tweet').size())
    {
        var _username = jQuery('#twitter_username').val();
        if (_username) {
            jQuery('.artist_latest_tweet').hide();
            jQuery.ajax({
                type : "GET",
                dataType : "json",
                url : "http://search.twitter.com/search.json?q=from:" + _username + "&rpp=1&callback=?",
                success : function(data) {
                    if (data)
                    {
                        jQuery(".twitter_content").html(data.results[0].text);
                        var _url = jQuery(".twitter_link").attr('href');
                        jQuery(".twitter_link").attr('href', _url + jQuery.URLEncode('RT '+_username+' '+data.results[0].text));
                        jQuery('.artist_latest_tweet').slideDown();
                    }
                }
            });
        }
    }

    /* rss */
    if (jQuery('a.rss').size())
    {
        jQuery('a.rss').each(function() {
            jQuery(this).parent().addClass('rss-wrap');
        });
    }

    /* chart page */
    if (jQuery('.node-type-chart-landing .comment-print').size()) {
        jQuery('.node-type-chart-landing .page-title').first().prepend(jQuery('.node-type-chart-landing .comment-print'));
    }
    if (jQuery('.node-type-chart .comment-print').size()) {
        jQuery('.node-type-chart .page-title').first().prepend(jQuery('.node-type-chart .comment-print'));
    }
    if (jQuery('.chart_filters').size()) {
        jQuery('.node-type-chart-landing .full_width').first().append(jQuery('.node-type-chart-landing .chart_filters'));
        jQuery('.node-type-chart .full_width').first().append(jQuery('.node-type-chart .chart_filters'));
    }
    if (jQuery('.horz_nav').size()) {
        jQuery('.node-type-chart-landing .page-title').first().append(jQuery('.node-type-chart-landing .horz_nav'));
        jQuery('.node-type-chart .page-title').first().append(jQuery('.node-type-chart .horz_nav'));
    }
    if (jQuery('.chart_pager_bottom').size()) {
        jQuery('.node-type-chart-landing #main-wrapper').first().append(jQuery('.node-type-chart-landing .chart_pager_bottom'));
        jQuery('.node-type-chart #main-wrapper').first().append(jQuery('.node-type-chart .chart_pager_bottom'));
    }

    /* biz commutiny page */
    if (jQuery('#bb.bbbiz > .full_width > .rss-link').size()) {
        jQuery('#bb.bbbiz .tertiary-menu > .content').first().append(jQuery('#bb.bbbiz > .full_width > .rss-link'));
    }

    /* chart browsing */
    if (jQuery('#bb-chart-form').size()) {
        jQuery('#bb-chart-form input[checked=checked]').next().addClass('current');
        jQuery('#bb-chart-form .form-item-month label').click(function(){
            jQuery('#bb-chart-form .form-item-month label').removeClass('current');
            jQuery(this).addClass('current');
        });
        var _obj_html = jQuery('<ul/>');
        var _current_year = jQuery('<a class="current_year" href="#"></a>')
        jQuery('#edit-year').find('option').each(function()
        {
            var _li = jQuery('<li><a href="#">'+jQuery(this).text()+'</a></li>');
            var _val = jQuery(this).attr('value');
            if (jQuery(this).attr('selected') == 'selected') _current_year.text(_val);
            _li.find('a').click(function()
            {
                jQuery('#edit-year').val(_val);
                jQuery('.current_year').text(_val);
                jQuery('#edit-year').change();
                return false;
            });
            _obj_html.append(_li);
        });
        jQuery('#edit-year').after(_obj_html);
        jQuery('#edit-year').after(_current_year);
    }

    /* chart archived browsing */
    // if (jQuery('#bb-chart-archived-form').size()) {
    //     jQuery('#bb-chart-archived-form input[checked=checked]').next().addClass('current');
    //     jQuery('#bb-chart-archived-form .form-item-archived-month label').click(function(){
    //         jQuery('#bb-chart-archived-form .form-item-archived-month label').removeClass('current');
    //         jQuery(this).addClass('current');
    //     });
    //     var _obj_html = jQuery('<ul/>');
    //     var _current_year = jQuery('<a onclick="return false;" class="current_year" href="#"></a>')
    //     jQuery('#edit-archived-year').find('option').each(function()
    //     {
    //         var _li = jQuery('<li><a href="#">'+jQuery(this).text()+'</a></li>');
    //         var _val = jQuery(this).attr('value');
    //         if (jQuery(this).attr('selected') == 'selected') _current_year.text(_val);
    //         _li.find('a').click(function()
    //         {
    //             jQuery('#edit-archived-year').val(_val);
    //             jQuery('#bb-chart-archived-form .current_year').text(_val);
    //             jQuery('#edit-archived-year').change();
    //             return false;
    //         });
    //         _obj_html.append(_li);
    //     });
    //     jQuery('#edit-archived-year').after(_obj_html);
    //     jQuery('#edit-archived-year').after(_current_year);
    // }

    /* remove height from all images in the article content */
    if (jQuery('.node-type-article').find('.fix_image').length > 0) {
        jQuery('.node-type-article').find('.fix_image').find('img').each(function() {
            jQuery(this).removeAttr('height');
        });
    }

    /* show / hide pinterest button on mouse over / mouse out */
    var _div_image = jQuery('.node-type-article').find('.node.node-article').find('.article-hero');
    var _div_social = jQuery('.node-type-article').find('.node.node-article').find('.social-actions');
    if (_div_image.length > 0 && _div_social.length > 0) {
        _div_image.mouseover(function() {
            _div_social.show();
        });
        _div_image.mouseout(function() {
            _div_social.hide();
        });
    }

    /* add columns breadcrumb */
    if (jQuery('#breadcrumb').size && /^\/articles\/columns/ig.test(document.location.pathname) && jQuery('body.node-type-landing-page').size()) {
        var _html = jQuery('#breadcrumb').html();
        jQuery('#breadcrumb').html(_html + '<span>Columns</span> / ');
    }

    /* print icon */
    jQuery('.print').click(function()
    {
        window.print();
        return false;
    });



    //var $hp_jcarousel = jQuery('.flashbox-slider.articles ul.jcarousel, .flashbox-slider.reviews ul.jcarousel, .page-videos .flashbox-slider ul.jcarousel');
    var $hp_jcarousel = jQuery('.flashbox-slider ul.jcarousel');
    if ($hp_jcarousel.length) {
        var hp_jcarousel_ID = setInterval(function() {
            if ($hp_jcarousel.hasClass('jcarousel-processed')) {
                if (jQuery.browser.safari) {
                    jQuery(window).trigger('load.jcarousel');
                    jQuery(window).unbind('load.jcarousel');
                }

                var carousel = $hp_jcarousel.data('jcarousel');
                if ($hp_jcarousel.parents('.flashbox-slider.articles').length || $hp_jcarousel.parents('.flashbox-slider.reviews').length) {
                    carousel.prev();
                }    

                jQuery(window).unbind('resize.jcarousel');
                clearInterval(hp_jcarousel_ID);
            }
        }, 10);
    }
    
}
;
BB.Behaviors.listing_clicks = function(container){

	container.find("article").each(function(){
		var $this = jQuery(this);

		$this.on("mouseenter",function(){
			jQuery(this).addClass("hover");
			hovering = true;
		}).on("mouseleave",function(){
			jQuery(this).removeClass("hover");
			hovering = false;
		}).on("click",function(event){
			window.location = $this.find("a:first").attr("href") || "#";
		});

		$this.find("a").not("h1 a").on("mouseenter",function(){
			$this.removeClass("hover");
		}).on("mouseleave",function(){
			if (hovering) {
				$this.addClass("hover");
			}
		}).on("click",function(event){
			event.stopPropagation();
		});

	});


};

BB.Behaviors.open_drawer = function(container){
    setOpenDrawerSubmenu(container);
}

function setOpenDrawerSubmenu(container) {
    var content = container.parent().parent();

    if (content.hasClass('expanded')) return false;
    if (!content.find('.drawer').size()) {
        content.append('<div class="drawer" style="display: none; position: relative;"></div>');
    }

    var drawer = content.find('.drawer');
    var _parent = content.parent();
    while (_parent.attr('id') != 'navigation' && _parent.attr('id') != 'bb')
    {
        _parent = _parent.parent();
    }
    var is_main_menu = (_parent.attr('id') == 'navigation');

    container.find('> a').unbind("click");
    container.find('> a').click(function(event){
        var _a = jQuery(this);
        event.preventDefault();
        if (!container.hasClass('open')) {
            content.find('.expanded.open').removeClass('open');
            if (drawer.find('#edit-chart-date-datepicker-popup-1').size() && typeof(jQuery.datepicker) != 'undefined') {
                drawer.find('#edit-chart-date-datepicker-popup-1').datepicker("destroy");
            }
            drawer.html('');
            drawer.append(container.find('> ul').first().clone(true));
            drawer.append(jQuery('<div class="cleaner"></div>'));
            drawer.find('.expanded').removeClass('expanded');
            if (is_main_menu && BB.isBBBiz)
            {
                var _close = jQuery('<p class="close"><a href="#">Close</a></a>');
                drawer.append(_close);
                _close.find('a').click(function(){ _a.click(); return false; });
            }
            drawer.slideDown();
            container.addClass("open");
            if (drawer.find('#edit-chart-date-datepicker-popup-0').size() && typeof(jQuery.datepicker) != 'undefined') {
                drawer.find('#edit-chart-date-datepicker-popup-0').datepicker("destroy").attr('id', 'edit-chart-date-datepicker-popup-1').datepicker({"changeMonth":true,"changeYear":true,"autoPopUp":"focus","closeAtTop":false,"speed":"immediate","firstDay":0,"dateFormat":"yy-mm-dd","yearRange":"1958:с","fromTo":false,"defaultDate":"0y"});
            }
        } else {
            drawer.slideUp();
            container.removeClass("open");
        }
        return false;
    });
}

;
BB.Behaviors.fake_header = function(container) {

	var $next_element = container.next(), 
			top_pos = $next_element.offset().top, 
			h = container.outerHeight(), 
			init = top_pos - h;

	jQuery(window).scrollTop(init).on("scroll",function(){
		var sT = jQuery(window).scrollTop();

		if (sT < init || sT > init + h) {
			container.fadeOut(250);
		}
	});

}
;
BB.Behaviors.my_rating = function(container) {

	var spans = container.find(".fivestar-widget").children(".star"), 
			saving = container.find(".saving"), 
			voted = container.hasClass("voted"), 
			//$connect = jQuery("#connect_with_facebook"), 
			offset;
   if (spans.length == 0) {
     spans = container.find(".fivestar-widget-static").children(".star")
   }
	spans.mouseover(function(event){
		if (!voted) {
			if (spans.index(jQuery(this)) > 1) {
				container.removeClass("low");
				container.addClass("high");
			} else {
				container.removeClass("high");
				container.addClass("low");
			}
			jQuery(this).addClass("active").addClass("hover").prevAll().addClass("active");
		}
	}).mouseout(function(event){
		if (!voted) {
			spans.removeClass("active").removeClass("hover");
		}
	});

	/*if ($connect.length > 0) {

		spans.mouseover(function(event){
			show_connect();
		});
  
  spans.mouseout(function(event){
			show_connect();
		})
  
  $connect.mouseout(function(event){
   hide_connect(); 
  });
		

	}*/

	function show_connect() {
		offset = container.offset();
		$connect.css({
			left: offset.left + (container.outerWidth(true)/2), 
			top: offset.top
		});
	}
	function hide_connect() {
		if (!$connect.is(":hover")) {
			$connect.css({
				left: "-999em", 
				top: "-999em"
			});
		}
	}

};
BB.Behaviors.gallery = function(container) {
  
  var $ph = container.find(".photos"), 
      $bN = container.find(".next a"), 
      $bP = container.find(".prev a"), 
      $n = container.find(".numerator"), 
      $f = container.find("footer"), 
      feed_url = container.data("feed-url") || false, 
      feed_id = container.data("feed-id") || false, 
      ad_every = container.data("ad-every") || false, 
      max, 
      slideAmount, 
      load_first_x_images = 10, 
      currentSliderPos = 0, 
      currentSet = 1, 
      sliderMoving = false, 
      reset = false, 
      active = false, 
      speed = 500,
      page_url = window.location.pathname,
      track_page = false,
      image_data;
     
  if (feed_url && feed_id) {
    load_data();
  }

  function load_data() {
    var currentFid = window.location.search.slice(3);
    jQuery.getJSON(feed_url+'?gallery_id='+feed_id+'&i='+currentFid, function(data) {
      if (data.length > 0) {
        image_data = data;
      
        // array to store the html
        var lis = [];
        max = data.length;
        j = 0;
        k = 0;
        
        jQuery.each(data, function(i,v){
          if (v.fid == currentFid) {
            k = i;
            return false;
          }
        });
        
				// loop data
        jQuery.each(data, function(i,v){
          // insert advert
          if (ad_every && i > 0 && i % ad_every == 0 && i != (max - 1)) {
              lis.push(insertAd(i));
              max++;
              j++;
          }
          // src or data-src
          var a_src = (i >= k && i < k + load_first_x_images) ? 'src' : 'data-src';
          // make html
          lis.push('<li data-num="'+i+'" data-fid='+v.fid+'><img '+a_src+'="'+v.src+'" alt="'+v.alt+'" /><div class="photo_caption">'+v.caption+'</div><i>'+v.credit+'</i></li>');
          j++;
          
          if (v.fid == currentFid) {
            currentSet = j;
          }
        });
				lis.push(insertLastSlide());
				max++;
        //
        if (max > 1) {
          $bN.parent().show();
          $bP.parent().show();
          var first_item = lis[0];
          var last_item = lis[max-1];
          lis.splice(0,0,last_item);
          lis.push(first_item);
          update_numerator();
        }
        
        // insert html
        $ph.html( lis.join('') );
        init_replay();

        set_tags();

        // set the vars
        slideAmount = $ph.children(":first").outerWidth();
        currentSliderPos = slideAmount * (-currentSet);
        //
        $ph.css({ left: currentSliderPos + "px" });
        //
        jQuery(window).load(function(){
          loadImages();
          set_url();
        });
        // so the keyboard events can trigger
        active = true;
      }
    }).error(function(){
      $ph.html('<li class="error">Data failed to load. Refresh page and try again!</li>');
    });
  }

  //return the ad code for m1, m2, etc. 
  function insertAd(count) {
    //return '<li class="ad">' + Drupal.settings.photo_detail_dart_tag + '</li>';
   count = count/ad_every;
    return '<li class="ad">    <div  id="dfp-ad-m'+ count + '_iframe" class="dfp-tag-wrapper">  <script type="text/javascript">   googletag.cmd.push(function() {      googletag.display("dfp-ad-m'+ count + '_iframe");    }); </script></div></li>';  

}

	function insertLastSlide() {
		var c = jQuery('#block-billboard-blocks-previous-galleries');
    c.find("a.previous-galleries-block-next").attr("href", jQuery('link[rel="next"]').attr('href'));
		var html = c.html();
		c.remove();
		return '<li class="last ad">' + html + '</li>';
	}
	
  var calculateNextPosition = function (direction) {
    if (direction == 'right' || direction == 'replay') {
      currentSliderPos -= slideAmount;

      if (currentSet == max) {
        reset = true;
        currentSet = 1;
      } else {
        currentSet++;
      }
    } else if (direction == 'left') {
      currentSliderPos += slideAmount;

      if (currentSet == 1) {
        reset = true;
        currentSet = max;
      } else {
        currentSet--;
      }
    }
  }
 
  function nextSlide(direction) {
    if (!sliderMoving) {
      if (direction == 'right' && currentSet == max && jQuery('link[rel="next"]').length) {
        // changed this behaviour because of .previous-galleries-block-next appear
        if (!jQuery('a.previous-galleries-block-next').length) {
          window.location.href = jQuery('link[rel="next"]').attr('href');
        }
        return;
      }
      var previousPosition = currentSet;
      calculateNextPosition(direction);


      sliderMoving = true;

      var currently_visible = $ph.children().eq(currentSet);

      // check for advert
      if (currently_visible.hasClass("ad")) {
        $f.addClass("ad");
      } else {
        $f.removeClass("ad");
        if (!currently_visible.find("img").attr("src")) {
          currently_visible.find("img").attr("src", currently_visible.find("img").attr("data-src"));
        }
      }

      update_numerator();

      set_tags();
      
      $ph.animate({
        left: currentSliderPos
      }, speed, function () {
        if (reset) {
          currentSliderPos = currentSet * slideAmount * -1;
          $ph.css({
            left: currentSliderPos
          });
          reset = false;
        }
    
        sliderMoving = false;
        
        set_url();
      });
    }
  }

  function loadImages() {
    var images = $ph.find("img");

    images.each(function(){
      var $this = jQuery(this);
      var newImg = new Image();
      var src = $this.attr("src") || $this.attr("data-src");
      src = (src != null && src != undefined && src.length > 0 && src != "null") ? src : "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
      //
      //
      newImg.onload = function() {
        $this.attr("src",src);
      };
      // this is to force a load in webkit
      newImg.src = src;
      newImg.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
      newImg.src = src;

      if ($this.parent().is('li')) {
        $this.parent().find("span.social-actions").css({
          top: $this.position().top + $this.height() - 21,
          left: "auto",
          right: ($this.parent().innerWidth() - $this.width())/2
        });
      }
    });
  }

  function update_numerator() {
    if (currentSet == max) {
      $bN.addClass('disabled');
      $n.fadeOut();
    } else {
      $bN.removeClass('disabled');
      $n.fadeIn().text(currentSet + " / " + (max-1));
    }
  }

  function set_tags() {
    var currently_visible = $ph.children().eq(currentSet);
    if (currently_visible.attr('class') != 'ad') {
      var current_fid = currently_visible.attr("data-fid");
      var tags = '<ul></ul>';
      for (var v in image_data) {
        if (image_data[v].fid == current_fid) {
          tags = image_data[v].tags;
          break;
        }
      }
      jQuery('.tagged ul').replaceWith(tags);
    }
  }
  
  function set_url() {
    var currently_visible = $ph.children().eq(currentSet);
    var current_fid = currently_visible.attr("data-fid");
    var url = current_fid == null ? page_url : page_url + "?i=" + current_fid;
    if (typeof window.history.pushState === "function") {
      window.history.pushState(null, null, url);
    }
    
    jQuery('footer p.comments a').attr('href', url + '#disqus_thread');

    jQuery.get('/post_counters/json?gallery_id='+feed_id+'&'+window.location.search.slice(1), function(data){
      if (data != '') {
        jQuery("#photo-social-wrapper").html(data);
      }
      post_init();
      twttr.widgets.load();
      jQuery(".g-plusone").each(function () {
        gapi.plusone.render(jQuery(this).get(0));
      });
      var pwidget = post_widget(".sep");
      if (typeof pwidget.updateConfig === "function") {
        if (currently_visible.hasClass('ad')) {
          var pwconfig = { url: window.location.hostname + url };
        } else {
          var pwconfig = { url: window.location.hostname + url, image: currently_visible.find('img').attr('src') };
        }
        pwidget.updateConfig(pwconfig);
      }
    });

    if (track_page) {
      _gaq.push(['_trackPageview', url]);
      jQuery('noscript:first').append('<img src="http://b.scorecardresearch.com/p?c1=2&c2=7395269&cv=2.0&cj=1" />');
    }
    track_page = true;
  }
	
	function init_replay() {
		jQuery('.previous-galleries-block-replay').click(function() {
			nextSlide('replay');
		});
	}
  
  /* clicks */

  $bP.click(function (e) {
    e.preventDefault();
    if (!$bP.hasClass('disabled')) nextSlide('left');
  });
  $bN.click(function (e) {
    e.preventDefault();
    if (!$bN.hasClass('disabled')) nextSlide('right');
  });

  /* keyboard! */
  
  jQuery(document).keydown(function (e) {
    if (active) {
      switch (e.keyCode) {
        case 37:
          // left arrow
          $bP.addClass("active");
          break;
        case 39:
          // right arrow
          $bN.addClass("active");
          break;
        }
     }
  });
  // on left and right arrow key up, un highlight and trigger movement
  jQuery(document).keyup(function (e) {
    if (active) {
      switch (e.keyCode) {
        case 37:
          // move left
          $bP.removeClass("active");
          nextSlide('left');
          break;
        case 39:
          // move right
          $bN.removeClass("active");
          nextSlide('right');
          break;
        }
     }
  });

}
jQuery(function($) {
  var $cats = jQuery("#photo-gallery-slider header .categories a");
  if ($cats.first().text().toLowerCase() == $cats.last().text().toLowerCase()) $cats.last().parent().hide();
});

BB.Behaviors.jcarousel = function(container){

    var $total = container.find('li').size();

    container.find(".views-field-counter").each(function(){
        jQuery(this).find('.field-content').html(jQuery(this).find('.field-content').html() + ' of ' + $total);
        jQuery(this).prependTo(jQuery(this).next().find('.views-field-title'));
    });

}
;
BB.Behaviors.pinteresterize = function(container){
  // http://benholland.me/javascript/how-to-build-a-site-that-works-like-pinterest/

  var colCount = parseInt(container.data("cols")) || 2, 
      colWidth = 310, 
      gutter = 30, 
      cols = [], 
      articles = container.children();    

  articles.css({
    opacity: 0
  });  
  
  function init(){
    for(var i=0;i<colCount;i++) {
      cols.push(0);
    }
    positionBlocks(articles);
  }  

  BB.Behaviors.pinteresterize.insert = function(items){
    container.append(items);
    container.imagesLoaded(function() {
      positionBlocks(items);
      items.animate({
        opacity: 1
      },250);
    });
  }
  
  function positionBlocks(elements) {
    elements.each(function(){
      var min = minInArray(cols);
      var index = jQuery.inArray(min, cols);
      var leftPos = (index*(colWidth+gutter));
      jQuery(this).css({
        "left":leftPos+"px", 
        "top":min+"px"
      });
      cols[index] = min+jQuery(this).outerHeight()+gutter;
    });
    container.height(maxInArray(cols));
  }
  
  function minInArray(arr) {
    return Math.min.apply(Math,arr);
  }
  function maxInArray(arr) {
    return Math.max.apply(Math,arr);
  }

  container.imagesLoaded(function() {
    init();
    articles.animate({
      opacity: 1
    },250);
  });

};;
BB.Behaviors.breaking_news_bar = function(container) {
    if (!container.find('.user-alert').size()) return false;
    container.show().find(".close").click(function(event){
        event.preventDefault();
        container.slideUp(250);
        jQuery.setCookie('hide_breaking_bar', 1, null);
    });
};

BB.Behaviors.more_copy = function(container){

    container.on("click", function(event){
        event.preventDefault();
        container.fadeOut();
        container.next("span").css({
                display: "block"
            }).hide().slideDown(250, function(){
                jQuery(this).css({
                    display: "block"
                });
        });
    });

};;
BB.Behaviors.sticky_social_links = function(container){

    var padding = 20,
        init_offset = container.offset(),
        init_top = init_offset.top,
        init_left = init_offset.left,
        upperlimit = init_top - padding,
        $article_content = jQuery(".article_content:first") || false,
        lowerlimit = ($article_content) ? $article_content.offset().top + $article_content.outerHeight(true) - container.outerHeight(true) : 99999,
        scrollTopNum;

    if (container.parent().find(".article-hero img").length > 0) {
        container.parent().find(".article-hero img").load(function(){
            init_offset = container.offset();
            init_top = init_offset.top;
            init_left = init_offset.left;
        });
    }

    if (container.parents(".article").children("img").length > 0) {
        container.parents(".article").children("img").load(function(){
            init_offset = container.offset();
            init_top = init_offset.top;
            init_left = init_offset.left;
        });
    }

    if (container.parent().find(".article_content img").length > 0) {
        container.parent().find(".article_content img").each(function(){
            jQuery(this).load(function(){
                init_offset = container.offset();
                init_top = init_offset.top;
                init_left = init_offset.left;
            });
        });
    }

    jQuery(window).scroll(function(event){
        init_offset = container.offset();
        scrollTopNum = jQuery(window).scrollTop();
        if (scrollTopNum > upperlimit && scrollTopNum < lowerlimit) {
            container.css({
                position: "fixed",
                left: init_offset.left,
                top: padding
            });
        } else if (scrollTopNum > lowerlimit) {
            container.css({
                position: "absolute",
                top: lowerlimit,
                left: init_offset.left
            });
        } else {
            container.css({
                position: "static"
            });
        }
    });


    // IE9 fix. Social vertical plugin

    jQuery(function() {

        if(jQuery.browser.msie) {

            jQuery('.social_vert ul.with_buttons').hover(
                function() {
                    jQuery(this).css({
                        'display': 'block',
                        'width': '150px',
                        'background': '#fff'
                    });
                    jQuery('li', this).css({
                        'display': 'block',
                        'width': '150px',
                        'overflow': 'visible',
                        'background': '#fff'
                    });
                    jQuery('li > div', this).css({
                        'width': '106px'
                    }).show();
                },
                function() {
                    jQuery(this).css({
                        'width': '35px'
                    });
                    jQuery('li', this).css({
                        'width': '35px'
                    });
                    jQuery('li > div', this).css('width', '1px').hide();
                }
            );

        };

    });

}


// IE9 fix. Social horizontal plugin

jQuery(function() {

    if(jQuery.browser.msie) {

        jQuery('.social:not(.social_vert) ul.with_buttons li').mouseenter(
            function() {
                jQuery('.social:not(.social_vert) ul.with_buttons li > div').hide();
                jQuery('> div', this).css({
                    'display': 'block',
                    'left': '-1px'
                });
            }
        );

        jQuery('.social:not(.social_vert) ul.with_buttons li > div').mouseleave(
            function() {
                jQuery(this).css({
                    'display': 'none'
                });
            }
        );

    };

});
;
BB.Behaviors.reveal_hidden = function(container){

  container.on("click",function(event){
  	event.preventDefault();
  	container.fadeOut(250).parents("div:first,section:first").find(".hide").removeClass("hide").hide().slideDown(250);
  })

};;
BB.Behaviors.top = function(container){

  container.on("click", function(event){
    event.preventDefault();
    jQuery('body,html').animate({
        scrollTop: 0
      }, 500);
  });

};;
BB.Behaviors.slide_switch = function(container){

    var $checkbox = container.find("input[type=checkbox]"), 
            $on = container.find("a:first"), 
            $off = container.find("a:last"), 
            sharing_on = false;

    function update(newStatus,init) {
        if (newStatus != sharing_on) {
            sharing_on = newStatus;
            if (sharing_on) {
                $on.addClass("active");
                $off.removeClass("active");
                container.addClass("sharing_on").removeClass("sharing_off");
                $checkbox.attr("checked","checked");
                if (!init) {
                    //alert("ajax call to turn on sharing");
                }
            } else {
                $on.removeClass("active");
                $off.addClass("active");
                container.removeClass("sharing_on").addClass("sharing_off");
                $checkbox.removeAttr("checked");
                if (!init) {
                    //alert("ajax call to turn off sharing");
                }
            }
        }
    }

    $checkbox.click(function(event){
        update($checkbox.is(":checked"),false);
    });

    $on.click(function(event){
        event.preventDefault();
        update(true,false);
    });

    $off.click(function(event){
        event.preventDefault();
        update(false,false);
    });

    update(container.hasClass("sharing_on"),true);

};
BB.Behaviors.fbc_switch = function(container){

    var $on = container.find("span:first"), 
            $off = container.find("span:last"), 
            connected = $on.hasClass("active");

    container.click(function(event){
        event.preventDefault();
        if (connected) {
            $on.removeClass("active");
            $off.addClass("active");
            //alert("ajax call to trigger change goes here!");
        } else {
            $off.removeClass("active");
            $on.addClass("active");
            //alert("ajax call to trigger change goes here!");
        }
        connected = !connected;
    });


};
BB.Behaviors.do_masonry = function(container) {

	var col_width = container.data("colwidth") || 140;

	container.imagesLoaded( function(){
		container.masonry({
			itemSelector: 'article',
			columnWidth: col_width, 
			gutterWidth: 30, 
			isAnimated: false, 
			cornerStampSelector: '.banner'
		});
	});
};
/*
Copyright 2012 Igor Vaynberg
 
Version: 3.2 Timestamp: Mon Sep 10 10:38:04 PDT 2012

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this work except in
compliance with the License. You may obtain a copy of the License in the LICENSE file, or at:

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is
distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/
(function(e){"undefined"==typeof e.fn.each2&&e.fn.extend({each2:function(g){for(var i=e([0]),m=-1,s=this.length;++m<s&&(i.context=i[0]=this[m])&&!1!==g.call(i[0],m,i););return this}})})(jQuery);
(function(e,g){function i(a,b){var c=0,d=b.length,j;if("undefined"===typeof a)return-1;if(a.constructor===String)for(;c<d;c+=1){if(0===a.localeCompare(b[c]))return c}else for(;c<d;c+=1)if(j=b[c],j.constructor===String){if(0===j.localeCompare(a))return c}else if(j===a)return c;return-1}function m(a,b){return a===b?!0:a===g||b===g||null===a||null===b?!1:a.constructor===String?0===a.localeCompare(b):b.constructor===String?0===b.localeCompare(a):!1}function s(a,b){var c,d,j;if(null===a||1>a.length)return[];
c=a.split(b);d=0;for(j=c.length;d<j;d+=1)c[d]=e.trim(c[d]);return c}function A(a,b,c){var c=c||g,d;return function(){var j=arguments;window.clearTimeout(d);d=window.setTimeout(function(){b.apply(c,j)},a)}}function l(a){a.preventDefault();a.stopPropagation()}function B(a,b,c){var d=a.toUpperCase().indexOf(b.toUpperCase()),b=b.length;0>d?c.push(a):(c.push(a.substring(0,d)),c.push("<span class='select2-match'>"),c.push(a.substring(d,d+b)),c.push("</span>"),c.push(a.substring(d+b,a.length)))}function C(a){var b,
c=0,d=null,j=a.quietMillis||100;return function(h){window.clearTimeout(b);b=window.setTimeout(function(){var b=c+=1,j=a.data,n=a.transport||e.ajax,f=a.traditional||!1,g=a.type||"GET",j=j.call(this,h.term,h.page,h.context);null!==d&&d.abort();d=n.call(null,{url:a.url,dataType:a.dataType,data:j,type:g,traditional:f,success:function(d){b<c||(d=a.results(d,h.page),h.callback(d))}})},j)}}function D(a){var b=a,c,d=function(a){return""+a.text};e.isArray(b)||(d=b.text,e.isFunction(d)||(c=b.text,d=function(a){return a[c]}),
b=b.results);return function(a){var c=a.term,f={results:[]},k;if(c==="")a.callback({results:b});else{k=function(b,f){var g,t,b=b[0];if(b.children){g={};for(t in b)b.hasOwnProperty(t)&&(g[t]=b[t]);g.children=[];e(b.children).each2(function(a,b){k(b,g.children)});g.children.length&&f.push(g)}else a.matcher(c,d(b))&&f.push(b)};e(b).each2(function(a,b){k(b,f.results)});a.callback(f)}}}function E(a){return e.isFunction(a)?a:function(b){var c=b.term,d={results:[]};e(a).each(function(){var a=this.text!==
g,e=a?this.text:this;if(""===c||b.matcher(c,e))d.results.push(a?this:{id:this,text:this})});b.callback(d)}}function u(a){if(e.isFunction(a))return!0;if(!a)return!1;throw Error("formatterName must be a function or a falsy value");}function v(a){return e.isFunction(a)?a():a}function F(a){var b=0;e.each(a,function(a,d){d.children?b+=F(d.children):b++});return b}function H(a,b,c,d){var e=a,h=!1,f,k,n,o;if(!d.createSearchChoice||!d.tokenSeparators||1>d.tokenSeparators.length)return g;for(;;){h=-1;k=0;
for(n=d.tokenSeparators.length;k<n&&!(o=d.tokenSeparators[k],h=a.indexOf(o),0<=h);k++);if(0>h)break;f=a.substring(0,h);a=a.substring(h+o.length);if(0<f.length&&(f=d.createSearchChoice(f,b),f!==g&&null!==f&&d.id(f)!==g&&null!==d.id(f))){h=!1;k=0;for(n=b.length;k<n;k++)if(m(d.id(f),d.id(b[k]))){h=!0;break}h||c(f)}}if(0!=e.localeCompare(a))return a}function x(a,b){var c=function(){};c.prototype=new a;c.prototype.constructor=c;c.prototype.parent=a.prototype;c.prototype=e.extend(c.prototype,b);return c}
if(window.Select2===g){var f,w,y,z,G,q;f={TAB:9,ENTER:13,ESC:27,SPACE:32,LEFT:37,UP:38,RIGHT:39,DOWN:40,SHIFT:16,CTRL:17,ALT:18,PAGE_UP:33,PAGE_DOWN:34,HOME:36,END:35,BACKSPACE:8,DELETE:46,isArrow:function(a){a=a.which?a.which:a;switch(a){case f.LEFT:case f.RIGHT:case f.UP:case f.DOWN:return!0}return!1},isControl:function(a){switch(a.which){case f.SHIFT:case f.CTRL:case f.ALT:return!0}return a.metaKey?!0:!1},isFunctionKey:function(a){a=a.which?a.which:a;return 112<=a&&123>=a}};var I=1;G=function(){return I++};
e(document).delegate("body","mousemove",function(a){e.data(document,"select2-lastpos",{x:a.pageX,y:a.pageY})});e(document).ready(function(){e(document).delegate("body","mousedown touchend",function(a){var b=e(a.target).closest("div.select2-container").get(0),c;b?e(document).find("div.select2-container-active").each(function(){this!==b&&e(this).data("select2").blur()}):(b=e(a.target).closest("div.select2-drop").get(0),e(document).find("div.select2-drop-active").each(function(){this!==b&&e(this).data("select2").blur()}));
b=e(a.target);c=b.attr("for");"LABEL"===a.target.tagName&&(c&&0<c.length)&&(b=e("#"+c),b=b.data("select2"),b!==g&&(b.focus(),a.preventDefault()))})});w=x(Object,{bind:function(a){var b=this;return function(){a.apply(b,arguments)}},init:function(a){var b,c;this.opts=a=this.prepareOpts(a);this.id=a.id;a.element.data("select2")!==g&&null!==a.element.data("select2")&&this.destroy();this.enabled=!0;this.container=this.createContainer();this.containerId="s2id_"+(a.element.attr("id")||"autogen"+G());this.containerSelector=
"#"+this.containerId.replace(/([;&,\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g,"\\$1");this.container.attr("id",this.containerId);var d=!1,j;this.body=function(){!1===d&&(j=a.element.closest("body"),d=!0);return j};a.element.attr("class")!==g&&this.container.addClass(a.element.attr("class").replace(/validate\[[\S ]+] ?/,""));this.container.css(v(a.containerCss));this.container.addClass(v(a.containerCssClass));this.opts.element.data("select2",this).hide().before(this.container);this.container.data("select2",
this);this.dropdown=this.container.find(".select2-drop");this.dropdown.addClass(v(a.dropdownCssClass));this.dropdown.data("select2",this);this.results=b=this.container.find(".select2-results");this.search=c=this.container.find("input.select2-input");c.attr("tabIndex",this.opts.element.attr("tabIndex"));this.resultsPage=0;this.context=null;this.initContainer();this.initContainerWidth();this.results.bind("mousemove",function(a){var b=e.data(document,"select2-lastpos");(b===g||b.x!==a.pageX||b.y!==a.pageY)&&
e(a.target).trigger("mousemove-filtered",a)});this.dropdown.delegate(".select2-results","mousemove-filtered",this.bind(this.highlightUnderEvent));var h=this.results,f=A(80,function(a){h.trigger("scroll-debounced",a)});h.bind("scroll",function(a){0<=i(a.target,h.get())&&f(a)});this.dropdown.delegate(".select2-results","scroll-debounced",this.bind(this.loadMoreIfNeeded));e.fn.mousewheel&&b.mousewheel(function(a,c,d,e){c=b.scrollTop();0<e&&0>=c-e?(b.scrollTop(0),l(a)):0>e&&b.get(0).scrollHeight-b.scrollTop()+
e<=b.height()&&(b.scrollTop(b.get(0).scrollHeight-b.height()),l(a))});c.bind("keydown",function(){e.data(c,"keyup-change-value")===g&&e.data(c,"keyup-change-value",c.val())});c.bind("keyup",function(){var a=e.data(c,"keyup-change-value");a!==g&&c.val()!==a&&(e.removeData(c,"keyup-change-value"),c.trigger("keyup-change"))});c.bind("keyup-change",this.bind(this.updateResults));c.bind("focus",function(){c.addClass("select2-focused");" "===c.val()&&c.val("")});c.bind("blur",function(){c.removeClass("select2-focused")});
this.dropdown.delegate(".select2-results","mouseup",this.bind(function(a){0<e(a.target).closest(".select2-result-selectable:not(.select2-disabled)").length?(this.highlightUnderEvent(a),this.selectHighlighted(a)):this.focusSearch();l(a)}));this.dropdown.bind("click mouseup mousedown",function(a){a.stopPropagation()});e.isFunction(this.opts.initSelection)&&(this.initSelection(),this.monitorSource());(a.element.is(":disabled")||a.element.is("[readonly='readonly']"))&&this.disable()},destroy:function(){var a=
this.opts.element.data("select2");a!==g&&(a.container.remove(),a.dropdown.remove(),a.opts.element.removeData("select2").unbind(".select2").show())},prepareOpts:function(a){var b,c,d;b=a.element;"select"===b.get(0).tagName.toLowerCase()&&(this.select=c=a.element);c&&e.each("id multiple ajax query createSearchChoice initSelection data tags".split(" "),function(){if(this in a)throw Error("Option '"+this+"' is not allowed for Select2 when attached to a <select> element.");});a=e.extend({},{populateResults:function(b,
c,d){var f,n=this.opts.id,o=this;f=function(b,c,j){var h,l,i,m,r,p,q;h=0;for(l=b.length;h<l;h=h+1){i=b[h];m=n(i)!==g;r=i.children&&i.children.length>0;p=e("<li></li>");p.addClass("select2-results-dept-"+j);p.addClass("select2-result");p.addClass(m?"select2-result-selectable":"select2-result-unselectable");r&&p.addClass("select2-result-with-children");p.addClass(o.opts.formatResultCssClass(i));m=e("<div></div>");m.addClass("select2-result-label");q=a.formatResult(i,m,d);q!==g&&m.html(o.opts.escapeMarkup(q));
p.append(m);if(r){r=e("<ul></ul>");r.addClass("select2-result-sub");f(i.children,r,j+1);p.append(r)}p.data("select2-data",i);c.append(p)}};f(c,b,0)}},e.fn.select2.defaults,a);"function"!==typeof a.id&&(d=a.id,a.id=function(a){return a[d]});if(c)a.query=this.bind(function(a){var c={results:[],more:false},d=a.term,f,n,o;o=function(b,c){var e;if(b.is("option"))a.matcher(d,b.text(),b)&&c.push({id:b.attr("value"),text:b.text(),element:b.get(),css:b.attr("class")});else if(b.is("optgroup")){e={text:b.attr("label"),
children:[],element:b.get(),css:b.attr("class")};b.children().each2(function(a,b){o(b,e.children)});e.children.length>0&&c.push(e)}};f=b.children();if(this.getPlaceholder()!==g&&f.length>0){n=f[0];e(n).text()===""&&(f=f.not(n))}f.each2(function(a,b){o(b,c.results)});a.callback(c)}),a.id=function(a){return a.id},a.formatResultCssClass=function(a){return a.css};else if(!("query"in a))if("ajax"in a){if((c=a.element.data("ajax-url"))&&0<c.length)a.ajax.url=c;a.query=C(a.ajax)}else"data"in a?a.query=D(a.data):
"tags"in a&&(a.query=E(a.tags),a.createSearchChoice=function(a){return{id:a,text:a}},a.initSelection=function(b,c){var d=[];e(s(b.val(),a.separator)).each(function(){var b=this,c=this,j=a.tags;e.isFunction(j)&&(j=j());e(j).each(function(){if(m(this.id,b)){c=this.text;return false}});d.push({id:b,text:c})});c(d)});if("function"!==typeof a.query)throw"query function not defined for Select2 "+a.element.attr("id");return a},monitorSource:function(){this.opts.element.bind("change.select2",this.bind(function(){!0!==
this.opts.element.data("select2-change-triggered")&&this.initSelection()}))},triggerChange:function(a){a=a||{};a=e.extend({},a,{type:"change",val:this.val()});this.opts.element.data("select2-change-triggered",!0);this.opts.element.trigger(a);this.opts.element.data("select2-change-triggered",!1);this.opts.element.click();this.opts.blurOnChange&&this.opts.element.blur()},enable:function(){this.enabled||(this.enabled=!0,this.container.removeClass("select2-container-disabled"))},disable:function(){this.enabled&&
(this.close(),this.enabled=!1,this.container.addClass("select2-container-disabled"))},opened:function(){return this.container.hasClass("select2-dropdown-open")},positionDropdown:function(){var a=this.container.offset(),b=this.container.outerHeight(),c=this.container.outerWidth(),d=this.dropdown.outerHeight(),j=e(window).scrollTop()+document.documentElement.clientHeight,b=a.top+b,f=a.left,j=b+d<=j,g=a.top-d>=this.body().scrollTop(),k=this.dropdown.hasClass("select2-drop-above"),n;"static"!==this.body().css("position")&&
(n=this.body().offset(),b-=n.top,f-=n.left);k?(k=!0,!g&&j&&(k=!1)):(k=!1,!j&&g&&(k=!0));k?(b=a.top-d,this.container.addClass("select2-drop-above"),this.dropdown.addClass("select2-drop-above")):(this.container.removeClass("select2-drop-above"),this.dropdown.removeClass("select2-drop-above"));a=e.extend({top:b,left:f,width:c},v(this.opts.dropdownCss));this.dropdown.css(a)},shouldOpen:function(){var a;if(this.opened())return!1;a=e.Event("open");this.opts.element.trigger(a);return!a.isDefaultPrevented()},
clearDropdownAlignmentPreference:function(){this.container.removeClass("select2-drop-above");this.dropdown.removeClass("select2-drop-above")},open:function(){if(!this.shouldOpen())return!1;window.setTimeout(this.bind(this.opening),1);return!0},opening:function(){var a=this.containerId,b=this.containerSelector,c="scroll."+a,d="resize."+a;this.container.parents().each(function(){e(this).bind(c,function(){var a=e(b);0==a.length&&e(this).unbind(c);a.select2("close")})});e(window).bind(d,function(){var a=
e(b);0==a.length&&e(window).unbind(d);a.select2("close")});this.clearDropdownAlignmentPreference();" "===this.search.val()&&this.search.val("");this.container.addClass("select2-dropdown-open").addClass("select2-container-active");this.updateResults(!0);this.dropdown[0]!==this.body().children().last()[0]&&this.dropdown.detach().appendTo(this.body());this.dropdown.show();this.positionDropdown();this.dropdown.addClass("select2-drop-active");this.ensureHighlightVisible();this.focusSearch()},close:function(){if(this.opened()){var a=
this;this.container.parents().each(function(){e(this).unbind("scroll."+a.containerId)});e(window).unbind("resize."+this.containerId);this.clearDropdownAlignmentPreference();this.dropdown.hide();this.container.removeClass("select2-dropdown-open").removeClass("select2-container-active");this.results.empty();this.clearSearch();this.opts.element.trigger(e.Event("close"))}},clearSearch:function(){},ensureHighlightVisible:function(){var a=this.results,b,c,d,f;c=this.highlight();0>c||(0==c?a.scrollTop(0):
(b=a.find(".select2-result-selectable"),d=e(b[c]),f=d.offset().top+d.outerHeight(),c===b.length-1&&(b=a.find("li.select2-more-results"),0<b.length&&(f=b.offset().top+b.outerHeight())),b=a.offset().top+a.outerHeight(),f>b&&a.scrollTop(a.scrollTop()+(f-b)),d=d.offset().top-a.offset().top,0>d&&a.scrollTop(a.scrollTop()+d)))},moveHighlight:function(a){for(var b=this.results.find(".select2-result-selectable"),c=this.highlight();-1<c&&c<b.length;){var c=c+a,d=e(b[c]);if(d.hasClass("select2-result-selectable")&&
!d.hasClass("select2-disabled")){this.highlight(c);break}}},highlight:function(a){var b=this.results.find(".select2-result-selectable").not(".select2-disabled");if(0===arguments.length)return i(b.filter(".select2-highlighted")[0],b.get());a>=b.length&&(a=b.length-1);0>a&&(a=0);b.removeClass("select2-highlighted");e(b[a]).addClass("select2-highlighted");this.ensureHighlightVisible()},countSelectableResults:function(){return this.results.find(".select2-result-selectable").not(".select2-disabled").length},
highlightUnderEvent:function(a){a=e(a.target).closest(".select2-result-selectable");if(0<a.length&&!a.is(".select2-highlighted")){var b=this.results.find(".select2-result-selectable");this.highlight(b.index(a))}else 0==a.length&&this.results.find(".select2-highlighted").removeClass("select2-highlighted")},loadMoreIfNeeded:function(){var a=this.results,b=a.find("li.select2-more-results"),c,d=this.resultsPage+1,e=this,f=this.search.val(),g=this.context;0!==b.length&&(c=b.offset().top-a.offset().top-
a.height(),0>=c&&(b.addClass("select2-active"),this.opts.query({term:f,page:d,context:g,matcher:this.opts.matcher,callback:this.bind(function(c){e.opened()&&(e.opts.populateResults.call(this,a,c.results,{term:f,page:d,context:g}),!0===c.more?(b.detach().appendTo(a).text(e.opts.formatLoadMore(d+1)),window.setTimeout(function(){e.loadMoreIfNeeded()},10)):b.remove(),e.positionDropdown(),e.resultsPage=d)})})))},tokenize:function(){},updateResults:function(a){function b(){f.scrollTop(0);d.removeClass("select2-active");
k.positionDropdown()}function c(a){f.html(k.opts.escapeMarkup(a));b()}var d=this.search,f=this.results,h=this.opts,i,k=this;if(!(!0!==a&&(!1===this.showSearchInput||!this.opened()))){d.addClass("select2-active");if(1<=h.maximumSelectionSize&&(i=this.data(),e.isArray(i)&&i.length>=h.maximumSelectionSize&&u(h.formatSelectionTooBig,"formatSelectionTooBig"))){c("<li class='select2-selection-limit'>"+h.formatSelectionTooBig(h.maximumSelectionSize)+"</li>");return}d.val().length<h.minimumInputLength&&u(h.formatInputTooShort,
"formatInputTooShort")?c("<li class='select2-no-results'>"+h.formatInputTooShort(d.val(),h.minimumInputLength)+"</li>"):(c("<li class='select2-searching'>"+h.formatSearching()+"</li>"),i=this.tokenize(),i!=g&&null!=i&&d.val(i),this.resultsPage=1,h.query({term:d.val(),page:this.resultsPage,context:null,matcher:h.matcher,callback:this.bind(function(i){var l;this.opened()&&((this.context=i.context===g?null:i.context,this.opts.createSearchChoice&&""!==d.val()&&(l=this.opts.createSearchChoice.call(null,
d.val(),i.results),l!==g&&null!==l&&k.id(l)!==g&&null!==k.id(l)&&0===e(i.results).filter(function(){return m(k.id(this),k.id(l))}).length&&i.results.unshift(l)),0===i.results.length&&u(h.formatNoMatches,"formatNoMatches"))?c("<li class='select2-no-results'>"+h.formatNoMatches(d.val())+"</li>"):(f.empty(),k.opts.populateResults.call(this,f,i.results,{term:d.val(),page:this.resultsPage,context:null}),!0===i.more&&u(h.formatLoadMore,"formatLoadMore")&&(f.append("<li class='select2-more-results'>"+k.opts.escapeMarkup(h.formatLoadMore(this.resultsPage))+
"</li>"),window.setTimeout(function(){k.loadMoreIfNeeded()},10)),this.postprocessResults(i,a),b()))})}))}},cancel:function(){this.close()},blur:function(){this.close();this.container.removeClass("select2-container-active");this.dropdown.removeClass("select2-drop-active");this.search[0]===document.activeElement&&this.search.blur();this.clearSearch();this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus")},focusSearch:function(){this.search.show();this.search.focus();
window.setTimeout(this.bind(function(){this.search.show();this.search.focus();this.search.val(this.search.val())}),10)},selectHighlighted:function(){var a=this.highlight(),b=this.results.find(".select2-highlighted").not(".select2-disabled"),c=b.closest(".select2-result-selectable").data("select2-data");c&&(b.addClass("select2-disabled"),this.highlight(a),this.onSelect(c))},getPlaceholder:function(){return this.opts.element.attr("placeholder")||this.opts.element.attr("data-placeholder")||this.opts.element.data("placeholder")||
this.opts.placeholder},initContainerWidth:function(){var a=function(){var a,c,d,f;if("off"===this.opts.width)return null;if("element"===this.opts.width)return 0===this.opts.element.outerWidth()?"auto":this.opts.element.outerWidth()+"px";if("copy"===this.opts.width||"resolve"===this.opts.width){a=this.opts.element.attr("style");if(a!==g){a=a.split(";");d=0;for(f=a.length;d<f;d+=1)if(c=a[d].replace(/\s/g,"").match(/width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/),null!==c&&1<=c.length)return c[1]}return"resolve"===
this.opts.width?(a=this.opts.element.css("width"),0<a.indexOf("%")?a:0===this.opts.element.outerWidth()?"auto":this.opts.element.outerWidth()+"px"):null}return e.isFunction(this.opts.width)?this.opts.width():this.opts.width}.call(this);null!==a&&this.container.attr("style","width: "+a)}});y=x(w,{createContainer:function(){return e("<div></div>",{"class":"select2-container"}).html("    <a href='#' onclick='return false;' class='select2-choice'>   <span></span><abbr class='select2-search-choice-close' style='display:none;'></abbr>   <div><b></b></div></a>    <div class='select2-drop select2-offscreen'>   <div class='select2-search'>       <input type='text' autocomplete='off' class='select2-input'/>   </div>   <ul class='select2-results'>   </ul></div>")},
opening:function(){this.search.show();this.parent.opening.apply(this,arguments);this.dropdown.removeClass("select2-offscreen")},close:function(){this.opened()&&(this.parent.close.apply(this,arguments),this.dropdown.removeAttr("style").addClass("select2-offscreen").insertAfter(this.selection).show())},focus:function(){this.close();this.selection.focus()},isFocused:function(){return this.selection[0]===document.activeElement},cancel:function(){this.parent.cancel.apply(this,arguments);this.selection.focus()},
initContainer:function(){var a,b=this.dropdown;this.selection=a=this.container.find(".select2-choice");this.search.bind("keydown",this.bind(function(a){if(this.enabled)if(a.which===f.PAGE_UP||a.which===f.PAGE_DOWN)l(a);else if(this.opened())switch(a.which){case f.UP:case f.DOWN:this.moveHighlight(a.which===f.UP?-1:1);l(a);break;case f.TAB:case f.ENTER:this.selectHighlighted();l(a);break;case f.ESC:this.cancel(a),l(a)}else a.which===f.TAB||f.isControl(a)||f.isFunctionKey(a)||a.which===f.ESC||!1===
this.opts.openOnEnter&&a.which===f.ENTER||this.open()}));this.search.bind("focus",this.bind(function(){this.selection.attr("tabIndex","-1")}));this.search.bind("blur",this.bind(function(){this.opened()||this.container.removeClass("select2-container-active");window.setTimeout(this.bind(function(){this.selection.attr("tabIndex",this.opts.element.attr("tabIndex"))}),10)}));a.bind("mousedown",this.bind(function(){this.opened()?(this.close(),this.selection.focus()):this.enabled&&this.open()}));b.bind("mousedown",
this.bind(function(){this.search.focus()}));a.bind("focus",this.bind(function(){this.container.addClass("select2-container-active");this.search.attr("tabIndex","-1")}));a.bind("blur",this.bind(function(){this.opened()||this.container.removeClass("select2-container-active");window.setTimeout(this.bind(function(){this.search.attr("tabIndex",this.opts.element.attr("tabIndex"))}),10)}));a.bind("keydown",this.bind(function(a){if(this.enabled)if(a.which===f.PAGE_UP||a.which===f.PAGE_DOWN)l(a);else if(!(a.which===
f.TAB||f.isControl(a)||f.isFunctionKey(a)||a.which===f.ESC)&&!(!1===this.opts.openOnEnter&&a.which===f.ENTER))if(a.which==f.DELETE)this.opts.allowClear&&this.clear();else{this.open();if(a.which!==f.ENTER&&!(48>a.which)){var b=String.fromCharCode(a.which).toLowerCase();a.shiftKey&&(b=b.toUpperCase());this.search.focus();this.search.val(b)}l(a)}}));a.delegate("abbr","mousedown",this.bind(function(a){this.enabled&&(this.clear(),l(a),this.close(),this.triggerChange(),this.selection.focus())}));this.setPlaceholder();
this.search.bind("focus",this.bind(function(){this.container.addClass("select2-container-active")}))},clear:function(){this.opts.element.val("");this.selection.find("span").empty();this.selection.removeData("select2-data");this.setPlaceholder()},initSelection:function(){if(""===this.opts.element.val())this.close(),this.setPlaceholder();else{var a=this;this.opts.initSelection.call(null,this.opts.element,function(b){b!==g&&null!==b&&(a.updateSelection(b),a.close(),a.setPlaceholder())})}},prepareOpts:function(){var a=
this.parent.prepareOpts.apply(this,arguments);"select"===a.element.get(0).tagName.toLowerCase()&&(a.initSelection=function(a,c){var d=a.find(":selected");e.isFunction(c)&&c({id:d.attr("value"),text:d.text()})});return a},setPlaceholder:function(){var a=this.getPlaceholder();""===this.opts.element.val()&&a!==g&&!(this.select&&""!==this.select.find("option:first").text())&&(this.selection.find("span").html(this.opts.escapeMarkup(a)),this.selection.addClass("select2-default"),this.selection.find("abbr").hide())},
postprocessResults:function(a,b){var c=0,d=this,f=!0;this.results.find(".select2-result-selectable").each2(function(a,b){if(m(d.id(b.data("select2-data")),d.opts.element.val()))return c=a,!1});this.highlight(c);!0===b&&(f=this.showSearchInput=F(a.results)>=this.opts.minimumResultsForSearch,this.dropdown.find(".select2-search")[f?"removeClass":"addClass"]("select2-search-hidden"),e(this.dropdown,this.container)[f?"addClass":"removeClass"]("select2-with-searchbox"))},onSelect:function(a){var b=this.opts.element.val();
this.opts.element.val(this.id(a));this.updateSelection(a);this.close();this.selection.focus();m(b,this.id(a))||this.triggerChange()},updateSelection:function(a){var b=this.selection.find("span");this.selection.data("select2-data",a);b.empty();a=this.opts.formatSelection(a,b);a!==g&&b.append(this.opts.escapeMarkup(a));this.selection.removeClass("select2-default");this.opts.allowClear&&this.getPlaceholder()!==g&&this.selection.find("abbr").show()},val:function(){var a,b=null,c=this;if(0===arguments.length)return this.opts.element.val();
a=arguments[0];if(this.select)this.select.val(a).find(":selected").each2(function(a,c){b={id:c.attr("value"),text:c.text()};return!1}),this.updateSelection(b),this.setPlaceholder();else{if(this.opts.initSelection===g)throw Error("cannot call val() if initSelection() is not defined");a?(this.opts.element.val(a),this.opts.initSelection(this.opts.element,function(a){c.opts.element.val(!a?"":c.id(a));c.updateSelection(a);c.setPlaceholder()})):this.clear()}},clearSearch:function(){this.search.val("")},
data:function(a){var b;if(0===arguments.length)return b=this.selection.data("select2-data"),b==g&&(b=null),b;!a||""===a?this.clear():(this.opts.element.val(!a?"":this.id(a)),this.updateSelection(a))}});z=x(w,{createContainer:function(){return e("<div></div>",{"class":"select2-container select2-container-multi"}).html("    <ul class='select2-choices'>  <li class='select2-search-field'>    <input type='text' autocomplete='off' class='select2-input'>  </li></ul><div class='select2-drop select2-drop-multi' style='display:none;'>   <ul class='select2-results'>   </ul></div>")},
prepareOpts:function(){var a=this.parent.prepareOpts.apply(this,arguments);"select"===a.element.get(0).tagName.toLowerCase()&&(a.initSelection=function(a,c){var d=[];a.find(":selected").each2(function(a,b){d.push({id:b.attr("value"),text:b.text()})});e.isFunction(c)&&c(d)});return a},initContainer:function(){var a;this.searchContainer=this.container.find(".select2-search-field");this.selection=a=this.container.find(".select2-choices");this.search.bind("keydown",this.bind(function(b){if(this.enabled){if(b.which===
f.BACKSPACE&&""===this.search.val()){this.close();var c;c=a.find(".select2-search-choice-focus");if(0<c.length){this.unselect(c.first());this.search.width(10);l(b);return}c=a.find(".select2-search-choice");0<c.length&&c.last().addClass("select2-search-choice-focus")}else a.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus");if(this.opened())switch(b.which){case f.UP:case f.DOWN:this.moveHighlight(b.which===f.UP?-1:1);l(b);return;case f.ENTER:case f.TAB:this.selectHighlighted();
l(b);return;case f.ESC:this.cancel(b);l(b);return}if(!(b.which===f.TAB||f.isControl(b)||f.isFunctionKey(b)||b.which===f.BACKSPACE||b.which===f.ESC)&&!(!1===this.opts.openOnEnter&&b.which===f.ENTER))this.open(),(b.which===f.PAGE_UP||b.which===f.PAGE_DOWN)&&l(b)}}));this.search.bind("keyup",this.bind(this.resizeSearch));this.search.bind("blur",this.bind(function(a){this.container.removeClass("select2-container-active");this.search.removeClass("select2-focused");this.clearSearch();a.stopImmediatePropagation()}));
this.container.delegate(".select2-choices","mousedown",this.bind(function(a){this.enabled&&!(0<e(a.target).closest(".select2-search-choice").length)&&(this.clearPlaceholder(),this.open(),this.focusSearch(),a.preventDefault())}));this.container.delegate(".select2-choices","focus",this.bind(function(){this.enabled&&(this.container.addClass("select2-container-active"),this.dropdown.addClass("select2-drop-active"),this.clearPlaceholder())}));this.clearSearch()},enable:function(){this.enabled||(this.parent.enable.apply(this,
arguments),this.search.removeAttr("disabled"))},disable:function(){this.enabled&&(this.parent.disable.apply(this,arguments),this.search.attr("disabled",!0))},initSelection:function(){""===this.opts.element.val()&&(this.updateSelection([]),this.close(),this.clearSearch());if(this.select||""!==this.opts.element.val()){var a=this;this.opts.initSelection.call(null,this.opts.element,function(b){if(b!==g&&b!==null){a.updateSelection(b);a.close();a.clearSearch()}})}},clearSearch:function(){var a=this.getPlaceholder();
a!==g&&0===this.getVal().length&&!1===this.search.hasClass("select2-focused")?(this.search.val(a).addClass("select2-default"),this.resizeSearch()):this.search.val(" ").width(10)},clearPlaceholder:function(){this.search.hasClass("select2-default")?this.search.val("").removeClass("select2-default"):" "===this.search.val()&&this.search.val("")},opening:function(){this.parent.opening.apply(this,arguments);this.clearPlaceholder();this.resizeSearch();this.focusSearch()},close:function(){this.opened()&&
this.parent.close.apply(this,arguments)},focus:function(){this.close();this.search.focus()},isFocused:function(){return this.search.hasClass("select2-focused")},updateSelection:function(a){var b=[],c=[],d=this;e(a).each(function(){0>i(d.id(this),b)&&(b.push(d.id(this)),c.push(this))});a=c;this.selection.find(".select2-search-choice").remove();e(a).each(function(){d.addSelectedChoice(this)});d.postprocessResults()},tokenize:function(){var a=this.search.val(),a=this.opts.tokenizer(a,this.data(),this.bind(this.onSelect),
this.opts);null!=a&&a!=g&&(this.search.val(a),0<a.length&&this.open())},onSelect:function(a){this.addSelectedChoice(a);this.select&&this.postprocessResults();this.opts.closeOnSelect?(this.close(),this.search.width(10)):0<this.countSelectableResults()?(this.search.width(10),this.resizeSearch(),this.positionDropdown()):this.close();this.triggerChange({added:a});this.focusSearch()},cancel:function(){this.close();this.focusSearch()},addSelectedChoice:function(a){var b=e("<li class='select2-search-choice'>    <div></div>    <a href='#' onclick='return false;' class='select2-search-choice-close' tabindex='-1'></a></li>"),
c=this.id(a),d=this.getVal(),f;f=this.opts.formatSelection(a,b);b.find("div").replaceWith("<div>"+this.opts.escapeMarkup(f)+"</div>");b.find(".select2-search-choice-close").bind("mousedown",l).bind("click dblclick",this.bind(function(a){this.enabled&&(e(a.target).closest(".select2-search-choice").fadeOut("fast",this.bind(function(){this.unselect(e(a.target));this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus");this.close();this.focusSearch()})).dequeue(),
l(a))})).bind("focus",this.bind(function(){this.enabled&&(this.container.addClass("select2-container-active"),this.dropdown.addClass("select2-drop-active"))}));b.data("select2-data",a);b.insertBefore(this.searchContainer);d.push(c);this.setVal(d)},unselect:function(a){var b=this.getVal(),c,d,a=a.closest(".select2-search-choice");if(0===a.length)throw"Invalid argument: "+a+". Must be .select2-search-choice";c=a.data("select2-data");d=i(this.id(c),b);0<=d&&(b.splice(d,1),this.setVal(b),this.select&&
this.postprocessResults());a.remove();this.triggerChange({removed:c})},postprocessResults:function(){var a=this.getVal(),b=this.results.find(".select2-result-selectable"),c=this.results.find(".select2-result-with-children"),d=this;b.each2(function(b,c){var e=d.id(c.data("select2-data"));0<=i(e,a)?c.addClass("select2-disabled").removeClass("select2-result-selectable"):c.removeClass("select2-disabled").addClass("select2-result-selectable")});c.each2(function(a,b){0==b.find(".select2-result-selectable").length?
b.addClass("select2-disabled"):b.removeClass("select2-disabled")});b.each2(function(a,b){if(!b.hasClass("select2-disabled")&&b.hasClass("select2-result-selectable"))return d.highlight(0),!1})},resizeSearch:function(){var a,b,c,d,f=this.search.outerWidth()-this.search.width();a=this.search;q||(c=a[0].currentStyle||window.getComputedStyle(a[0],null),q=e("<div></div>").css({position:"absolute",left:"-10000px",top:"-10000px",display:"none",fontSize:c.fontSize,fontFamily:c.fontFamily,fontStyle:c.fontStyle,
fontWeight:c.fontWeight,letterSpacing:c.letterSpacing,textTransform:c.textTransform,whiteSpace:"nowrap"}),e("body").append(q));q.text(a.val());a=q.width()+10;b=this.search.offset().left;c=this.selection.width();d=this.selection.offset().left;b=c-(b-d)-f;b<a&&(b=c-f);40>b&&(b=c-f);this.search.width(b)},getVal:function(){var a;if(this.select)return a=this.select.val(),null===a?[]:a;a=this.opts.element.val();return s(a,this.opts.separator)},setVal:function(a){var b;this.select?this.select.val(a):(b=
[],e(a).each(function(){0>i(this,b)&&b.push(this)}),this.opts.element.val(0===b.length?"":b.join(this.opts.separator)))},val:function(){var a,b=[],c=this;if(0===arguments.length)return this.getVal();if(a=arguments[0])if(this.setVal(a),this.select)this.select.find(":selected").each(function(){b.push({id:e(this).attr("value"),text:e(this).text()})}),this.updateSelection(b);else{if(this.opts.initSelection===g)throw Error("val() cannot be called if initSelection() is not defined");this.opts.initSelection(this.opts.element,
function(a){var b=e(a).map(c.id);c.setVal(b);c.updateSelection(a);c.clearSearch()})}else this.opts.element.val(""),this.updateSelection([]);this.clearSearch()},onSortStart:function(){if(this.select)throw Error("Sorting of elements is not supported when attached to <select>. Attach to <input type='hidden'/> instead.");this.search.width(0);this.searchContainer.hide()},onSortEnd:function(){var a=[],b=this;this.searchContainer.show();this.searchContainer.appendTo(this.searchContainer.parent());this.resizeSearch();
this.selection.find(".select2-search-choice").each(function(){a.push(b.opts.id(e(this).data("select2-data")))});this.setVal(a);this.triggerChange()},data:function(a){var b=this,c;if(0===arguments.length)return this.selection.find(".select2-search-choice").map(function(){return e(this).data("select2-data")}).get();a||(a=[]);c=e.map(a,function(a){return b.opts.id(a)});this.setVal(c);this.updateSelection(a);this.clearSearch()}});e.fn.select2=function(){var a=Array.prototype.slice.call(arguments,0),b,
c,d,f,h="val destroy opened open close focus isFocused container onSortStart onSortEnd enable disable positionDropdown data".split(" ");this.each(function(){if(0===a.length||"object"===typeof a[0])b=0===a.length?{}:e.extend({},a[0]),b.element=e(this),"select"===b.element.get(0).tagName.toLowerCase()?f=b.element.attr("multiple"):(f=b.multiple||!1,"tags"in b&&(b.multiple=f=!0)),c=f?new z:new y,c.init(b);else if("string"===typeof a[0]){if(0>i(a[0],h))throw"Unknown method: "+a[0];d=g;c=e(this).data("select2");
if(c!==g&&(d="container"===a[0]?c.container:c[a[0]].apply(c,a.slice(1)),d!==g))return!1}else throw"Invalid arguments to select2 plugin: "+a;});return d===g?this:d};e.fn.select2.defaults={width:"copy",closeOnSelect:!0,openOnEnter:!0,containerCss:{},dropdownCss:{},containerCssClass:"",dropdownCssClass:"",formatResult:function(a,b,c){b=[];B(a.text,c.term,b);return b.join("")},formatSelection:function(a){return a?a.text:g},formatResultCssClass:function(){return g},formatNoMatches:function(){return"No matches found"},
formatInputTooShort:function(a,b){return"Please enter "+(b-a.length)+" more characters"},formatSelectionTooBig:function(a){return"You can only select "+a+" item"+(1==a?"":"s")},formatLoadMore:function(){return"Loading more results..."},formatSearching:function(){return"Searching..."},minimumResultsForSearch:0,minimumInputLength:0,maximumSelectionSize:0,id:function(a){return a.id},matcher:function(a,b){return 0<=b.toUpperCase().indexOf(a.toUpperCase())},separator:",",tokenSeparators:[],tokenizer:H,
escapeMarkup:function(a){return a&&"string"===typeof a?a.replace(/&/g,"&amp;"):a},blurOnChange:!1};window.Select2={query:{ajax:C,local:D,tags:E},util:{debounce:A,markMatch:B},"class":{"abstract":w,single:y,multi:z}}}})(jQuery);
;
BB.Behaviors.chart_name_search = function(container) {
    var data,
    css_class = container.data("dropdown-class") || "";

        data = Drupal.settings.chart_list;
        container.select2({
            placeholder: "Chart name",
            data:{ results: data, text: 'chart_name' },
            formatSelection: format,
            formatResult: format,
            dropdownCssClass: css_class
        });

    function format(item) {
        return item.chart_name;
    }

    var dp1 = jQuery('#chart_date-datepicker-popup-0');

    dp1.datepicker({ dateFormat: 'yy-mm-dd' }).keydown(function(event) {

        if (event.keyCode == 10 || event.keyCode == 13) {
            dp1.val('');
            // event.preventDefault();
        }

    });

}
;
/**
 * Create a degradeable star rating interface out of a simple form structure.
 */
(function($){ // Create local scope.

Drupal.ajax.prototype.commands.fivestarUpdate = function (ajax, response, status) {
  response.selector = $('.fivestar-form-item', ajax.element.form);
  var avarage = $(response.data).find('.average-rating span').text();
  var percent = avarage/5 * 100;
  var result = Math.floor(percent);
  var my_rating = $(ajax.element.form).parent().parent().parent().parent().parent().find('.fan-rating b');
  if (my_rating.length > 0) {
    my_rating.html(result);
    my_rating.find(".my-rating").addClass('voted');
  }
  ajax.commands.insert(ajax, response, status);
  
};

})(jQuery);
;
