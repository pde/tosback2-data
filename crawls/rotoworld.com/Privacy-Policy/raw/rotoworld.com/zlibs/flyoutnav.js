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
    jQuery.each(menuLayers, function (b, c) { if (a == "hide") { c.hide() } else { c.hide("fast") } })
    $('#shim').hide();
}
function clearMenuItems() {
    jQuery.each(menuItems, function (a, b) {
        if ($(b).hasClass("active")) { $(b).removeClass("active") }
        if ($(b).hasClass("next")) { $(b).removeClass("next") }
    })
    $('#shim').hide();
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

  $(document).ready(function () {
      menuBar = $("ul[id=RW_nav]");
      menuItems = menuBar.find("li");
      menuLinks = menuBar.find("a");
      position = menuBar.position();
      if (position == null) {
          return;
      }
      $(document.body).bind("mousemove", function (a) {
          position = menuBar.position(); mousePos.x = a.clientX; mousePos.y = a.clientY;
          if (a.clientY <= position.top) { clearMenuItems(); clearFlyouts("slow") }
      });
      jQuery.each(menuLinks, function (a, b) {
          if (b.id) {
              $(b).bind("mouseenter", function () {
                  clearMenuItems(); $(b).parent("li").addClass("active");
                  $($(b).parent("li").next("li")).addClass("next")
              })
          } else {
              $(b).bind("mouseenter", function () {
                  clearMenuItems()
              })
          }
      });
      menuLinks.each(function (a, b) {
          if (b.id) {
              var c = $("#" + b.id + "_layer");
              menuLayers.push(c); c.hide();
              c.bind("mouseleave", function () {
                  if (!intersects(menuBar)) { clearMenuItems(); clearFlyouts("slow") }
              });
              $(b).bind("mouseenter", function () {
                  clearFlyouts("hide"); repositionLayers(); $('#shim').show(); $("#" + this.id + "_layer").show();
              })
          } else {
              $(b).bind("mouseover", function () {
                  clearFlyouts("slow")
              })
          }
      });
      repositionLayers(); $(window).bind("resize", function () { repositionLayers() })
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


function manageAdStream(sport, page) {
    //remove anything after and including the "?"

    if (page.indexOf("?") > 0) { page = page.substring(0, page.indexOf("?")) }

    rndm = Math.round(Math.random() * 100000);
    $("#RW_ad728").html('').html('<div style="width:730px;"><iframe id="iad728" height="90" src="" frameBorder="0" width="728" scrolling="no" /></div>');
    $("#ad300").html('').html('<div style="width:300px;"><iframe id="iad300" height="250" src="" frameBorder="0" width="300" scrolling="no" /></div>');
    $("#ad160").html('').html('<div style="width:160px;"><iframe id="iad600" height="600" src="" frameBorder="0" width="160" scrolling="no" /></div>');


    $("#iad728").attr("src", "");
    $("#iad728").attr("src", "/zcomponents/a728.html?rndm=" + rndm + "&sport=" + sport + "&page=" + page);
    $("#iad300").attr("src", "");
    $("#iad300").attr("src", "/zcomponents/a300.html?rndm=" + rndm + "&sport=" + sport + "&page=" + page);
    $("#iad600").attr("src", "");
    $("#iad600").attr("src", "/zcomponents/a160.html?rndm=" + rndm + "&sport=" + sport + "&page=" + page);

}


//Login / Register
function RotoAuthenticate(cont, eml, pass, f_name, l_name, age_v, reg) {
    $.ajax({
        type: "POST",
        url: "/serv" + "ices/utilities.as" + "mx/AuthUser",
        data: "eml=" + eml + "&pass=" + pass + "&first=" + f_name + "&last=" + l_name + "&verified=" + age_v + "&reg=" + reg,
        dataType: "json",
        success: function (msg) {
            alert('hi');
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

/**
* Create a cookie with the given name and value and other optional parameters.
*
* @example $.cookie('the_cookie', 'the_value');
* @desc Set the value of a cookie.
* @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
* @desc Create a cookie with all available options.
* @example $.cookie('the_cookie', 'the_value');
* @desc Create a session cookie.
* @example $.cookie('the_cookie', null);
* @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
*       used when the cookie was set.
*
* @param String name The name of the cookie.
* @param String value The value of the cookie.
* @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
* @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
*                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
*                             If set to null or omitted, the cookie will be a session cookie and will not be retained
*                             when the the browser exits.
* @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
* @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
* @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
*                        require a secure protocol (like HTTPS).
* @type undefined
*
* @name $.cookie
* @cat Plugins/Cookie
* @author Klaus Hartl/klaus.hartl@stilbuero.de
*/

/**
* Create multiple cookies at once stored in an object, with optional parameters affecting them all.
*
* @example $.cookie({ 'the_cookie' : 'the_value' });
* @desc Set/delete multiple cookies at once.
* @example $.cookie({ 'the_cookie' : 'the_value' }, { expires: 7, path: '/', domain: 'jquery.com', secure: true });
* @desc Set/delete multiple cookies with options.
*
* @param Object name An object with multiple cookie name-value pairs.
* @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
* @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
*                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
*                             If set to null or omitted, the cookie will be a session cookie and will not be retained
*                             when the the browser exits.
* @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
* @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
* @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
*                        require a secure protocol (like HTTPS).
* @type undefined
*
* @name $.cookie
* @cat Plugins/Cookie
* @author Klaus Hartl/klaus.hartl@stilbuero.de
*/

/**
* Get the value of a cookie with the given name.
*
* @example $.cookie('the_cookie');
* @desc Get the value of a cookie.
*
* @param String name The name of the cookie.
* @return The value of the cookie.
* @type String
*
* @name $.cookie
* @cat Plugins/Cookie
* @author Klaus Hartl/klaus.hartl@stilbuero.de
*/

/**
* Get the names and values of all cookies for the page.
*
* @example $.cookie();
* @desc Get all the cookies for the page
*
* @return an object with the name-value pairs of all available cookies.
* @type Object
*
* @name $.cookie
* @cat Plugins/Cookie
* @author Klaus Hartl/klaus.hartl@stilbuero.de
*/


jQuery.cookie = function (name, value, options) {
    if (typeof value != 'undefined' || (name && typeof name != 'string')) { // name and value given, set cookie
        if (typeof name == 'string') {
            options = options || {};
            if (value === null) {
                value = '';
                options.expires = -1;
            }
            var expires = '';
            if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                var date;
                if (typeof options.expires == 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
            }
            // CAUTION: Needed to parenthesize options.path and options.domain
            // in the following expressions, otherwise they evaluate to undefined
            // in the packed version for some reason...
            var path = options.path ? '; path=' + (options.path) : '';
            var domain = options.domain ? '; domain=' + (options.domain) : '';
            var secure = options.secure ? '; secure' : '';
            document.cookie = name + '=' + encodeURIComponent(value) + expires + path + domain + secure;
        } else { // `name` is really an object of multiple cookies to be set.
            for (var n in name) { jQuery.cookie(n, name[n], value || options); }
        }
    } else { // get cookie (or all cookies if name is not provided)
        var returnValue = {};
        if (document.cookie) {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (!name) {
                    var nameLength = cookie.indexOf('=');
                    returnValue[cookie.substr(0, nameLength)] = decodeURIComponent(cookie.substr(nameLength + 1));
                } else if (cookie.substr(0, name.length + 1) == (name + '=')) {
                    returnValue = decodeURIComponent(cookie.substr(name.length + 1));
                    break;
                }
            }
        }
        return returnValue;
    }
};



//partner methods - to be called after header/footer is loaded.
function RotoMenuHelper() {


    menuBar = $("ul[id=RW_nav]");
    menuItems = menuBar.find("li");
    menuLinks = menuBar.find("a");
    position = menuBar.position();
    $(document.body).bind("mousemove", function (a) {
        position = menuBar.position(); mousePos.x = a.clientX; mousePos.y = a.clientY;
        if (a.clientY <= position.top) { clearMenuItems(); clearFlyouts("slow") }
    });
    jQuery.each(menuLinks, function (a, b) {
        if (b.id) {
            $(b).bind("mouseenter", function () {
                clearMenuItems(); $(b).parent("li").addClass("active");
                $($(b).parent("li").next("li")).addClass("next")
            })
        } else {
            $(b).bind("mouseenter", function () {
                clearMenuItems()
            })
        }
    });
    menuLinks.each(function (a, b) {
        if (b.id) {
            var c = $("#" + b.id + "_layer");
            menuLayers.push(c); c.hide();
            c.bind("mouseleave", function () {
                if (!intersects(menuBar)) { clearMenuItems(); clearFlyouts("slow") }
            });
            $(b).bind("mouseenter", function () {
                clearFlyouts("hide"); repositionLayers(); $('#shim').show(); $("#" + this.id + "_layer").show();
            })
        } else {
            $(b).bind("mouseover", function () {
                clearFlyouts("slow")
            })
        }
    });
    repositionLayers(); $(window).bind("resize", function () { repositionLayers() })
}