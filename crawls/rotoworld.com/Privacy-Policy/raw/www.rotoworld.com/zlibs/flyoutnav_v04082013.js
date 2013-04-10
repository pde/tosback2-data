



















var menuBar;
var menuItems;
var menuLayers = [];
var mousePos = { x: 0, y: 0 };
function intersects(b) {
    position = $(b).position();
    var a = ((mousePos.y >= position.top) && (mousePos.y <= (position.top + $(b).height() + 25))); return a
}

function swapPictures(c, b) {
    var a = $(c)[0];
    if (a.src.indexOf(b) == -1) {
        $(a).animate({ opacity: "0" }, 100, "swing", function () { a.src = b; $(a).animate({ opacity: "1" }, 100, "swing") })
    }
}

function clearFlyouts(a) {
    $('#shim').hide("fast");
    jQuery.each(menuLayers, function (b, c) { if (a == "hide") { c.slideUp(400) } else { c.slideUp(400) } })
}
function clearMenuItems() {
    $('#shim').hide("fast");
    jQuery.each(menuItems, function (a, b) {
        if ($(b).hasClass("active")) { $(b).removeClass("active") }
        if ($(b).hasClass("next")) { $(b).removeClass("next") }
    })

}

function repositionLayers() {
    position = menuBar.position();
    if (position == null) {
        return;
    }
    jQuery.each(menuLayers, function (a, b) {
        b.css({ position: "absolute", top: position.top + menuBar.height(), left: position.left, width: menuBar.width(), "z-index": 12000 })
    })
    $("#shim").css({ position: "absolute", top: position.top + menuBar.height(), left: position.left, width: menuBar.width(), "z-index": 11999 })
}

function showMenu() {
    if (!$("#" + this.id + "_layer").is(":visible")) {
        if ($("#" + this.id + "_layer").length > 0) {
            clearFlyouts("hide"); repositionLayers(); $("#" + this.id + "_layer").slideDown(500); $('#shim').show(600);
        } else {
            clearFlyouts("hide"); repositionLayers();
        }
    }
}
function hideMenu() {
    if (!intersects(menuBar)) { clearMenuItems(); clearFlyouts("slow") }
}
function misc() { }

$(document).ready(function () {
    $(document).bind("mousemove", function (a) {
        position = menuBar.position(); mousePos.x = a.clientX; mousePos.y = a.clientY;

        if (mousePos.y <= position.top || mousePos.y > (position.top + 300)) {
            clearMenuItems(); clearFlyouts("slow")
        } else if (mousePos.x < (position.left - 10) || mousePos.x > (position.left + 1010)) {
            clearMenuItems(); clearFlyouts("slow")
        }
    });

    menuBar = $("ul[id=RW_nav]");
    menuItems = menuBar.find("li");
    menuLinks = menuBar.find("a");
    position = menuBar.position();
    if (position == null) {
        return;
    }
    menuLinks.each(function (a, b) {
        if (b.id) {
            var c = $("#" + b.id + "_layer");
            menuLayers.push(c); c.hide();
            if ($("#" + b.id + "_layer")) {

                $("#" + b.id).hoverIntent({
                    over: showMenu,
                    out: misc,
                    selector: ''
                });
                $("#" + b.id + "_layer").hoverIntent({
                    over: misc,
                    out: hideMenu,
                    selector: '',
                    sensitivity: 7,
                    interval: 100
                });
            }
            else {
                $("#" + b.id).hoverIntent({
                    over: hideMenu,
                    out: hideMenu,
                    selector: ''
                });
            }
        }
    });
    repositionLayers();
});











/* misc functions */
function showPlayerCard(el) { $('#' + el).show(600); }
function hidePlayerCard(el) { $('#' + el).hide("fast"); }
var uri=document.location.href;
var title=document.title;
var windowParams = 'toolbar=no,location=no,directories=no,status=no,menubar=yes,scrollbars=yes,resizable=no,copyhistory=yes,width=800,height=400,left=10, top=10,screenX=50,screenY=100';

function fbs_click(uri, title) {
    if (uri == null || uri =='') { uri = document.location.href; }
    if (title == null || title=='') { title = document.title; }
    try {
        var fb1 = window.open('http://www.facebook.com/sharer.php?u=' + encodeURIComponent(uri) + '&t=' + encodeURIComponent(title), 'facebook', windowParams);
    } catch (ex) { alert(ex.Description); }   //alert('This feature opens a pop-up window, make sure your browser settings are not preventing the window from opening.'); }
  return false;
}

function twitter_click(uri, title) {
    if (uri == null || uri == '') { uri = document.location.href; }
    if (title == null || title == '') { title = document.title; }
  try {
      var twit1 = window.open('http://twitter.com/home?status=' + encodeURIComponent(title) + '. ' + encodeURIComponent(uri), 'twitter', windowParams);
  } catch (ex) { alert('This feature opens a pop-up window, make sure your browser settings are not preventing the window from opening.'); }
  return false;
}


function manageAdStream(sport, page, prop1, prop4, sponsor) {
    //remove anything after and including the "?"

    if (page.indexOf("?") > 0) { page = page.substring(0, page.indexOf("?")) }

    rndm = Math.round(Math.random() * 100000);
    $("#RW_ad728").html('').html('<div style="width:730px;"><iframe id="iad728" height="90" src="" frameBorder="0" width="728" scrolling="no" /></div>');
    $("#ad300").html('').html('<div style="width:300px;"><iframe id="iad300" height="250" src="" frameBorder="0" width="300" scrolling="no" /></div>');
    $("#ad160").html('').html('<div style="width:160px;"><iframe id="iad600" height="600" src="" frameBorder="0" width="160" scrolling="no" /></div>');


    $("#iad728").attr("src", "");
    $("#iad728").attr("src", "/zcomponents/a728.html?rndm=" + rndm + "&sport=" + sport + "&page=" + page + "&prop1=" + prop1 + "&prop4=" + prop4 + "&sponsor=" + sponsor);
    $("#iad300").attr("src", "");
    $("#iad300").attr("src", "/zcomponents/a300.html?rndm=" + rndm + "&sport=" + sport + "&page=" + page + "&prop1=" + prop1 + "&prop4=" + prop4 + "&sponsor=" + sponsor);
    $("#iad600").attr("src", "");
    $("#iad600").attr("src", "/zcomponents/a160.html?rndm=" + rndm + "&sport=" + sport + "&page=" + page + "&prop1=" + prop1 + "&prop4=" + prop4 + "&sponsor=" + sponsor);

}


//Login / Register
function RotoAuthenticate(cont, eml, pass, f_name, l_name, age_v, reg) {
    $.ajax({
        type: "POST",
        url: "/serv" + "ices/utilities.as" + "mx/AuthUser",
        data: "eml=" + eml + "&pass=" + pass + "&first=" + f_name + "&last=" + l_name + "&verified=" + age_v + "&reg=" + reg,
        dataType: "json",
        success: function (msg) {
           // alert('hi');
            //$("#" + cont).html($(msg).find('string').text());
           // var cookdata = json;
           // alert(cookdata.Email);
        },
        error: function (emsg) {
            alert(emsg);
        }

    });
}



/**
* Cookie plugin
*
* Copyright (c) 2006 Klaus Hartl (stilbuero.de)
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*
*/
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals.
        factory(jQuery);
    }
} (function ($) {

    var pluses = /\+/g;

    function raw(s) {
        return s;
    }

    function decoded(s) {
        return decodeURIComponent(s.replace(pluses, ' '));
    }

    function converted(s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }
        try {
            return config.json ? JSON.parse(s) : s;
        } catch (er) { }
    }

    var config = $.cookie = function (key, value, options) {

        // write
        if (value !== undefined) {
            options = $.extend({}, config.defaults, options);

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = config.json ? JSON.stringify(value) : String(value);

            return (document.cookie = [
config.raw ? key : encodeURIComponent(key),
'=',
config.raw ? value : encodeURIComponent(value),
options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
options.path ? '; path=' + options.path : '',
options.domain ? '; domain=' + options.domain : '',
options.secure ? '; secure' : ''
].join(''));
        }

        // read
        var decode = config.raw ? raw : decoded;
        var cookies = document.cookie.split('; ');
        var result = key ? undefined : {};
        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = decode(parts.join('='));

            if (key && key === name) {
                result = converted(cookie);
                break;
            }

            if (!key) {
                result[name] = converted(cookie);
            }
        }

        return result;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
        if ($.cookie(key) !== undefined) {
            // Must not alter options, thus extending a fresh object...
            $.cookie(key, '', $.extend({}, options, { expires: -1 }));
            return true;
        }
        return false;
    };

}));


//jQuery.cookie = function (name, value, options) {
//    if (typeof value != 'undefined' || (name && typeof name != 'string')) { // name and value given, set cookie
//        if (typeof name == 'string') {
//            options = options || {};
//            if (value === null) {
//                value = '';
//                options.expires = -1;
//            }
//            var expires = '';
//            if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
//                var date;
//                if (typeof options.expires == 'number') {
//                    date = new Date();
//                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
//                } else {
//                    date = options.expires;
//                }
//                expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
//            }
//            // CAUTION: Needed to parenthesize options.path and options.domain
//            // in the following expressions, otherwise they evaluate to undefined
//            // in the packed version for some reason...
//            var path = options.path ? '; path=' + (options.path) : '';
//            var domain = options.domain ? '; domain=' + (options.domain) : '';
//            var secure = options.secure ? '; secure' : '';
//            document.cookie = name + '=' + encodeURIComponent(value) + expires + path + domain + secure;
//        } else { // `name` is really an object of multiple cookies to be set.
//            for (var n in name) { jQuery.cookie(n, name[n], value || options); }
//        }
//    } else { // get cookie (or all cookies if name is not provided)
//        var returnValue = {};
//        if (document.cookie) {
//            var cookies = document.cookie.split(';');
//            for (var i = 0; i < cookies.length; i++) {
//                var cookie = jQuery.trim(cookies[i]);
//                // Does this cookie string begin with the name we want?
//                if (!name) {
//                    var nameLength = cookie.indexOf('=');
//                    returnValue[cookie.substr(0, nameLength)] = decodeURIComponent(cookie.substr(nameLength + 1));
//                } else if (cookie.substr(0, name.length + 1) == (name + '=')) {
//                    returnValue = decodeURIComponent(cookie.substr(name.length + 1));
//                    break;
//                }
//            }
//        }
//        return returnValue;
//    }
//};

