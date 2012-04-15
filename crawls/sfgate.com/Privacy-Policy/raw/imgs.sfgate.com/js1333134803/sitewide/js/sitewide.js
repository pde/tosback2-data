// types/topmost/js/topmost.js
// Preload Tab Images
var most_read =    new Image(); most_read.src =    "http://imgs.sfgate.com/graphics/contentmodules/topmost/cre/most_read_on.gif";
var most_emailed = new Image(); most_emailed.src = "http://imgs.sfgate.com/graphics/contentmodules/topmost/cre/most_emailed_on.gif";
var most_commented =  new Image(); most_commented.src =  "http://imgs.sfgate.com/graphics/contentmodules/topmost/cre/most_commented_on.gif";

var divids=new Array('mostread','mostemailed','topstories');
var tabids=new Array('most_read','most_emailed','most_commented');


function switchid(id,tab){  
        hideallids();
        showdiv(id,tab);
}

function hideallids(){
        //loop through the array and hide each element by id
        for (var i=0;i<divids.length;i++){
                hidediv(divids[i],tabids[i]);
        }                 
}

function hidediv(id,taboff) {
        //safe function to hide an element with a specified id
        if (document.getElementById) { // DOM3 = IE5, NS6
                document.getElementById(id).style.display = 'none';
        }
        else {
                if (document.layers) { // Netscape 4
                        document.id.display = 'none';
                }
                else { // IE 4
                        document.all.id.style.display = 'none';
                }
        }
        // switch tab image to off state
        document.getElementById(taboff).src = "http://imgs.sfgate.com/graphics/contentmodules/topmost/cre/"+taboff+"_off.gif";
}

function showdiv(id,tab) {
        //safe function to show an element with a specified id
                  
        if (document.getElementById) { // DOM3 = IE5, NS6
                document.getElementById(id).style.display = 'block';
        }
        else {
                if (document.layers) { // Netscape 4
                        document.id.display = 'block';
                }
                else { // IE 4
                        document.all.id.style.display = 'block';
                }
        }
        // switch tab image to current selection
        document.getElementById(tab).src = "http://imgs.sfgate.com/graphics/contentmodules/topmost/cre/"+tab+"_on.gif";
}
// end types/topmost/js/topmost.js

// types/common/pages/searchbar/sfgate_un_p787.js
function sfgate_un() {
    var start = document.cookie.indexOf('hd=')
    if (start == -1) {
        return '';
    }
    start +=3 ;
    var username = document.cookie.substr(start);
    var end = username.indexOf(';');
    if ( end != -1 ) {
        username = username.substr(0,end);
    }
    if ( username.length == 0 ) {
        return '';
    }
    end = username.indexOf('|');
    if ( end == -1 ) {
        return '';
    }

    return username.substr(0,end);
}

function print_sfgate_un() {
    var encodedURL = escape(window.location);
    var sfgate_user = sfgate_un();
    if (sfgate_user) {
        document.write('Hello, <span class="pipe"><a href="/cgi-bin/contribute/sn/persona?plckPersonaPage=PersonaHome&amp;plckUserId='+sfgate_user+'&amp;User='+sfgate_user+'">' + sfgate_user + '</a>');
        document.write(' | <a href="/cgi-bin/webreg/user/account?user=' +
                       sfgate_user + '">My Account</a>');
        document.write(' | <a href="/cgi-bin/webreg/user/loaccount">Sign Out</a></span>');
    } else {
        document.write('<span class="pipe"><a href="/cgi-bin/webreg/user/xaccount">Sign In</a>');
        document.write(' | <a href="/cgi-bin/webreg/user/reg_cnt">Register</a></span>');
    }
}

function print_sfgate_un_stacked() {
    var encodedURL = escape(window.location);
    var sfgate_user = sfgate_un();
    if (sfgate_user) {
        document.write('Hello, <a href="/cgi-bin/contribute/sn/persona?plckPersonaPage=PersonaHome&amp;plckUserId='+sfgate_user+'&amp;User='+sfgate_user+'">' + sfgate_user + '</a>');
        document.write('<span style="display:block;line-height:15px;"><a href="/cgi-bin/webreg/user/account?user=' + sfgate_user + '">My Account</a></span>');
        document.write('<span style="display:block;line-height:15px;"><a href="/cgi-bin/webreg/user/loaccount">Sign Out</a></span>');
    } else {
        document.write('<span style="display:block;line-height:15px;"><a href="/cgi-bin/webreg/user/xaccount">Sign In</a></span>');
        document.write('<span style="display:block;line-height:15px;"><a href="/cgi-bin/webreg/user/reg_cnt">Register</a></span>');
    }
}
function sfgate_get_hd_cookie_username() {
//try { console.log('detect hd un #1: ' + document.cookie); } catch(err) {}
    var start = document.cookie.indexOf('hd=')
//try { console.log('found "hd=" @: ' + start); } catch(err) {}
    if (start == -1) {
        return '';
    }
    start +=3 ;
    var username = document.cookie.substr(start);

//try { console.log('detect hd un #2: ' + username); } catch(err) {}
    var end = username.indexOf(';');
    if ( end != -1 ) {
        username = username.substr(0,end);
    }

//try { console.log('detect hd un #3: ' + username); } catch(err) {}
    if ( username.length == 0 ) {
        return '';
    }
    end = username.indexOf('|');
    if ( end == -1 ) {
        return '';
    }
//try { console.log('detect hd un #4: ' + username); } catch(err) {}

    return username.substr(0,end);
}

function sfgate_get_at_cookie_username() {
    var start = document.cookie.indexOf('at=');
    if (start == -1) {
        return '';
    }
    start +=3 ;
    var username = document.cookie.substr(start);

    var end = username.indexOf(';');
    if ( end != -1 ) {
        username = username.substr(0,end);
    }

    username_found = 0;

    // the next line could potentially match a URL parameter with a key ending in 'u=' (i.e. 'foou='
    // the best solution to handle this case is a '.split("&")'
    //   then loop through that array,
    //   then test line.substr(0, 2) against 'u=' 
    allATCookieParams	= username.split('&');

    for (i=0; i<allATCookieParams.length; i++) {
        if(allATCookieParams[i].substr(0,2) == 'u=') {
            username = allATCookieParams[i].substr(2);
            username_found = 1;
            i = allATCookieParams.length; // equivelent to a break
        }
    }

    if(username_found != 1)
        return '';

    var end2 = username.indexOf('&');
    if ( end2 != -1 ) {
        username = username.substr(0,end2);
    }

    var end = username.indexOf(';');
    if ( end != -1 ) {
        username = username.substr(0,end);
    }

    if ( username.length == 0 ) {
        return '';
    }
    end = username.indexOf('&');
    if ( end != -1 ) {
        username = username.substr(0,end);
    }

    return username;
}

function print_sfgate_at_un() {
    var encodedURL = escape(window.location);
    var sfgate_user = sfgate_get_at_cookie_username();
    document.write('<div class="userlinks">');
    if (sfgate_user) {
        document.write('Hello, <a href="http://www.sfgate.com/cgi-bin/contribute/sn/persona?plckPersonaPage=PersonaHome&amp;plckUserId='+sfgate_user+'&amp;User='+sfgate_user+'">'+sfgate_user+'</a>');
        document.write(' <span class="pipe">|</span> <a href="http://www.sfgate.com/cgi-bin/webreg/user/account?user='+sfgate_user+'">My Account</a>');
        document.write(' <span class="pipe">|</span> <a href="http://www.sfgate.com/cgi-bin/webreg/user/loaccount">Sign Out</a>');
    } else {
        document.write('<a href="http://www.sfgate.com/cgi-bin/sso/action/login?url=http://'+document.location.host+'">Sign In</a>');
        document.write(' <span class="pipe">|</span> <a href="http://www.sfgate.com/cgi-bin/webreg/user/reg_cnt?url=http://'+document.location.host+'">Register</a>');
    }
    document.write('</div>');
}


function sfgate_at_is_bad () {
    var start = document.cookie.indexOf('at=');
    if (start == -1) {
        return 0;
    }
    start +=3 ;
    var at = document.cookie.substr(start);

    var end = at.indexOf(';');
    if ( end != -1 ) {
        at = at.substr(0,end);
    }

    if (at.indexOf('pwd_md5_tmpl') != -1) { return 1; }

    return 0;
}

// end types/common/pages/searchbar/sfgate_un_p787.js

// /js/ads/yld/yld_global.js

if (typeof yld_mgr == 'undefined') { yld_mgr = new Object(); }
yld_mgr.pub_id = "22658131511";
yld_mgr.site_name = "SFGate";
yld_mgr.request_type = "ac";
yld_mgr.container_type = "js";
yld_mgr.content_lang="en-US";

function sfgate_IsTsp() {
   var ref = document.referrer;
   var refRE = /^http:\/\/[a-z.]*sfgate\.com(\/|\/index.s?html)?$/;
   if ( ! ref.match(refRE) ) {
      return false;
   }
   var qs = window.location.search.substring(1, window.location.search.length);
   if (qs.length > 1) {
      var qarray = qs.split("&");
      var re = /^tsp=/;
      for(var i=0; i < qarray.length; i++) {
         if (qarray[i].match(re)) {
            return true;
         }
      }
   }
   return false;
}

function sfgate_yldslotok(pos) {
   if (typeof yld_mgr.slots != 'undefined') {
      if (typeof yld_mgr.slots[pos] != 'undefined'
         && typeof yld_mgr.slots[pos]['ad_size_list'] != 'undefined'
         && yld_mgr.slots[pos]['ad_size_list']
         && typeof yld_mgr.slots[pos]['ad_delivery_mode'] != 'undefined'
         && yld_mgr.slots[pos]['ad_delivery_mode']
         && typeof yld_mgr.slots[pos]['ad_format_list'] != 'undefined'
         && yld_mgr.slots[pos]['ad_format_list']) {
         return true;
      } else {
         return false;
      }
   } else {
      return false;
   }
}

// end /js/ads/yld/yld_global.js

// js/ads/ysm/cm.js
function sfg_ShowListings() {
  var i=6;
  var last_item = 0;
  if ( typeof zSr != "undefined" && zSr != null && zSr.length > i ) {
    var lastel = zSr.length - 6;
    document.write('\n<div class="contextualad">\n<div class="sfg_ysm001">\n');
    document.write('<h3><a href="http://searchmarketing.yahoo.com/srch/contentmatch.php" target="_new">Ads by Yahoo!</a></h3>\n');
    while (i < zSr.length) {
      if (i == lastel) {
        last_item = 1;
      }
      var descr = zSr[i++];
      var unused1 = zSr[i++];
      var clickURL = zSr[i++];
      var title = zSr[i++];
      var sitehost = zSr[i++];
      var unused2 = zSr[i++];
      if (last_item) {
        document.write('<div class="item_last">\n');
      } else {
        document.write('<div class="item">\n');
      }
      document.write('<h4><a target="_new" href="' + clickURL + '">' + title + '</a></h4>\n');
      document.write('<p><a target="_new" href="' + clickURL + '">' + descr + '</a></p>\n');
      document.write('<p class="sitehost"><a target="_new" href="' + clickURL + '">(' + sitehost + ')</a></p>\n');
      document.write('</div>\n\n');
    }
    document.write('</div>\n</div><!-- end contextual ad -->\n');
  } else {
      document.write('<!-- YSM error - no ads returned -->');
  }
}
// end js/ads/ysm/cm.js

/*/js/nav001/socialtools.js*/

   var active ='init'; 
    function ShowSocialMedia(id) { 
    if (document.all) { document.all[active].style.visibility = "hidden"; } 
    if(document.layers){ document.layers[active].visibility = "hide";} 
    if(document.getElementById) {document.getElementById(active).style.visibility='hidden';} 
    active = id; 
    if (document.all) { document.all[active].style.visibility = "visible";} 
    if(document.layers) { document.layers[active].visibility = "show" ;} 
    if(document.getElementById) {document.getElementById(active).style.visibility='visible';} 
    }
    function HideSocialMedia(id) { 
    if (document.all) { document.all[active].style.visibility = "hidden"; } 
    if(document.layers){ document.layers[active].visibility = "hide";} 
    if(document.getElementById) {document.getElementById(active).style.visibility='hidden';} 
    }

// /js/nav001/SearchToggle.js
//  does inner label toggle and
// modifies the searchbar onsubmit for biz radio button
function sfg_SrchClear(newwindow) {
   var term = document.forms['nav001_search_frm'].term;
   var radio = document.forms['nav001_search_frm'].st;
   if (term.value == 'Search') {
      term.value = '';
   }
   for (var i = 0; i < radio.length; i++) {
      if (radio[i].checked) {
         if (radio[i].value == 'b') {
            if (newwindow) {
               window.open('http://local.sfgate.com/search?keyword=' + encodeURIComponent(term.value), 'SFGate Search');
            } else {
               location.href = 'http://local.sfgate.com/search?keyword=' + encodeURIComponent(term.value);
            }
            return false;
         }
      }
   }
   document.forms['nav001_search_frm'].submit();
}
function sfg_SrchToggleOff() {
   var term = document.forms['nav001_search_frm'].term;
   if (term.value == 'Search') {
      term.value = '';
      term.className = 'textInput';
   }
   return false;
}
function sfg_SrchToggleOn() {
   var term = document.forms['nav001_search_frm'].term;
   if (!term.value) {
      term.value = 'Search';
      term.className = 'textInputNote';
   }
   return false;
}
// end /js/nav001/SearchToggle.js

//  js/visualrevenue/Hearst_VR_Trackingv5_SFGate.js
// Visual Revenue Reader Response Tracking Script (v5)
var _vrid = 12;
var _vrtrack = function(){};
(function(d, a) {
    var s = d.createElement(a),
	x = d.getElementsByTagName(a)[0];
    s.async = true;
    s.src = 'http://a.visualrevenue.com/vr.js';
    x.parentNode.insertBefore(s, x);
})(document, 'script');
// End of VR RR Tracking Script - All rights reserved
// e js/visualrevenue/Hearst_VR_Trackingv5_SFGate.js

// /js/home/ipadpromo.js
function getCookie(NameOfCookie) {
	if (document.cookie.length > 0) {
		begin = document.cookie.indexOf(NameOfCookie+"=");
		if (begin != -1) {
			begin += NameOfCookie.length+1;
			end = document.cookie.indexOf(";", begin);
			if (end == -1) end = document.cookie.length;
			return unescape(document.cookie.substring(begin, end));
		}
	}
	return null;
}
function setCookie(NameOfCookie, value, expiredays) {
	var ExpireDate = new Date ();
	ExpireDate.setTime(ExpireDate.getTime() + (expiredays * 24 * 3600 * 1000));
	document.cookie = NameOfCookie + "=" + escape(value) + ((expiredays == null) ? "" : "; expires=" + ExpireDate.toGMTString());
}
function DoTheCookieStuff() {
	visited=getCookie('iPadPromo');
	if (visited==null) {
		setCookie('iPadPromo','yes',20);
		var ippc = document.getElementById('iPadPromoContainer');
		var ippcI = document.getElementById('iPadImage');	
		ippc.style.display = 'block';
		ippcI.src="http://imgs.sfgate.com/graphics/ipad/promo/promo-safari-for-ipad.png";
	}
}
function linkCode(obj, cid) {
	s.linkTrackVars="campaign";
	s.campaign=cid;
	s.tl(obj,'o','iPadpromos');
}
// end /js/home/ipadpromo.js



