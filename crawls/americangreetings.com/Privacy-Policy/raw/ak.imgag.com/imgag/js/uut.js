// Client-side webvar access (though this may not work on a page that is the
// result of a POST.  Your mileage may vary...

function getWebvars() {
    var args = new Object();
    var query = location.search.substring(1);
    var pairs = query.split("&")
    for(var i=0; i<pairs.length; i++) {
        var pos = pairs[i].indexOf('=');
        if(pos == -1) continue;
        var argname = pairs[i].substring(0,pos);
        var value = pairs[i].substring(pos+1);
        if(args[argname]) {
            args[argname] = args[argname]+','+unescape(value);
        } else {
            args[argname] = unescape(value);
        }
    }
    return args;
}

var webvars = getWebvars()
var Base64 = new Object();


Base64.CARRAY = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
        "abcdefghijklmnopqrstuvwxyz0123456789+/=";


Base64.encode = function(input) {
   var output = "";
   var chr1, chr2, chr3;
   var enc1, enc2, enc3, enc4;
   var i = 0;

   do {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
         enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
         enc4 = 64;
      }

      output = output + Base64.CARRAY.charAt(enc1)
            + Base64.CARRAY.charAt(enc2)
            + Base64.CARRAY.charAt(enc3)
            + Base64.CARRAY.charAt(enc4);
   } while (i < input.length);

   return output;
}


Base64.decode = function(input) {
   var output = "";
   var chr1, chr2, chr3;
   var enc1, enc2, enc3, enc4;
   var i = 0;

   // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
   input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

   do {
      enc1 = Base64.CARRAY.indexOf(input.charAt(i++));
      enc2 = Base64.CARRAY.indexOf(input.charAt(i++));
      enc3 = Base64.CARRAY.indexOf(input.charAt(i++));
      enc4 = Base64.CARRAY.indexOf(input.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      output = output + String.fromCharCode(chr1);

      if (enc3 != 64) {
         output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
         output = output + String.fromCharCode(chr3);
      }
   } while (i < input.length);

   return output;
}


var NVP = new Object();


/* name value pair get the value */
NVP.getValue = function(data, name, sep, term) {
    var spos, epos;

    spos = data.indexOf(term+name+sep);
    if (-1 == spos) {
        spos = data.indexOf(name+sep);
        if (-1 == spos) return null;
        spos += name.length + sep.length;
    } else {
        spos += term.length + name.length + sep.length;
    }

    epos = data.indexOf(term, spos);
    if (-1 == epos) epos = data.length;

    return data.substring(spos, epos);
}


NVP.toMap = function(s, pairsep, sep) {
    var map = new Array();
    var pairs = s.toString().split(pairsep);
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];
        if (pair) {
            var data = pair.split(sep);
            map[unescape(data[0])] = unescape(data[1]);
        }
    }
    return map;
}


NVP.fromMap = function(map, pairsep, sep) {
    var s = '';
    for (var name in map) {
        if (map[name] == null) { continue; }
        if (typeof(map[name]) == 'function') { continue; }
        s += escape(name) + sep + escape(map[name]) + pairsep;
    }
    if (s) { s = s.substr(0, s.length-1); }
    return s;
}


var AGCookie = new Object();


AGCookie.SUBHOSTS = [[/\.yahoo\./, '_yh'],
        [/\.msn\./, '_msn'],
        [/\.aol\.|^aol\./, '_aol'],
        [/\.target\./, '_tg']];


AGCookie.getCookieDomain = function() {
    var names = window.location.hostname.split('.');
    var idx = names.length - 2;
    var tld = names.slice(-1);
    if (tld != 'com' && tld != 'net' && tld != 'org') {
        idx = names.length -3;
    }
    names = names.slice(idx);
    return '.' + names.join('.');
}


AGCookie.getCookieName = function(name) {
    var hn = window.location.hostname.split('.')[0];
    for (var i = 0; i < AGCookie.SUBHOSTS.length; i++) {
        var pair = AGCookie.SUBHOSTS[i];
        if (pair[0].test(window.location.hostname)) { name += pair[1]; }
    }
    switch (hn) {
        case 'dev':
        case 'dev1':
        case 'dev2':
            name += '_dev';
            break;
        case 'vanilla':
        case 'vanilla1':
        case 'vanilla2':
            name += '_dev';
            break;
        case 'work':
        case 'work1':
        case 'work2':
            name += '_work';
            break;
        case 'stage':
        case 'stage1':
        case 'stage2':
            name += '_stage';
    }
    return escape(name);
}


AGCookie.getCookieValueRaw = function(name, pairname) {
    var c = AGCookie.getCookie(name);
    if (c == null) { return null; }
    var v = NVP.getValue(Base64.decode(c), pairname, "=", "&");

    if(v) { /* do this because IE is dumb! */ return unescape(v); }
    return v;
}


/* Get the entire value of the cookie and unescape it. */
AGCookie.getCookie = function(name) {
    var c = NVP.getValue(document.cookie,
            AGCookie.getCookieName(name), '=', ';');
    if(!c)
        return c;
    c = unescape(c);
    while (c.indexOf('%0A') > -1 || c.indexOf('%0a') > -1) {
        c = c.replace(/\%0[aA]/,'');
    }
    c = unescape(c);
    return c;
}


/* Set the value of a cookie. */
AGCookie.setCookie = function(name, value, expires, perm) {
    name = AGCookie.getCookieName(name);
    var cki = name + '=' + escape(value) + ';';
    if (perm) { expires = 'Thursday, 31-Dec-2037 00:01:00 GMT'; }
    if (expires) { cki = cki + 'expires=' + expires + ';'; }
    cki = cki + 'path=/;domain=' + AGCookie.getCookieDomain();
    document.cookie = cki;
}


AGCookie.expireCookie = function(name) {
    AGCookie.setCookie(name, '', 'Friday, 01-Jan-99 00:00:00 GMT');
}


AGCookie.getCookieValue = function(name, pairname) {
    var v = AGCookie.getCookieValueRaw(name, pairname);
    if(!v && name == 'customer' && pairname == 'name') {
        v = AGCookie.getCookieValueRaw(name, 'email');
    }
    if(!v && name == 'customer' && pairname == 'name') {
        v = "member";
    }
    return v;
}


AGCookie.setCookieValue =
        function(name, pairname, value, expires, perm) {
    var map = null;
    var c = AGCookie.getCookie(name);
    if (c) { map = NVP.toMap(Base64.decode(c), '&', '='); }
    else { map = new Array(); }
    map[pairname] = value;
    AGCookie.setCookie(name, Base64.encode(NVP.fromMap(map, '&', '=')),
            expires, perm);
}


var MagicCookie = new Object();


MagicCookie.setCookieValue = function(pairname, value, perm) {
    var name = perm ? 'mc_p' : 'mc_s';
    return AGCookie.setCookieValue(name, pairname, value, null, perm);
}


MagicCookie.getCookieValue = function(pairname) {
    var value = AGCookie.getCookieValue('mc_s', pairname);
    if (!value) {
        value = AGCookie.getCookieValue('mc_p', pairname);
    }
    return value;
}


MagicCookie.delCookieValue = function(pairname, perm) {
    return MagicCookie.setCookieValue(pairname, null, perm);
}


/***** LEGACY -- this stuff is deprecated and should not be used. *****/

var CARRAY = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

function b64_decode(str)
{
    var data = "";

    if ((str.length % 4) != 0)
        return "ERROR";

    for (var i = 0; i < str.length; i+=4) {
        var i24 = 0;
        i24 |= (CARRAY.indexOf(str.charAt(i)) & 0xFF) << 18;
        i24 |= (CARRAY.indexOf(str.charAt(i+1)) & 0xFF) << 12;
        i24 |= (CARRAY.indexOf(str.charAt(i+2)) & 0xFF) << 6;
        i24 |= (CARRAY.indexOf(str.charAt(i+3)) & 0xFF) << 0;

        data += String.fromCharCode((i24 & 0xFF0000) >> 16);
        if (str.charAt(i+2) != '=')
            data += String.fromCharCode((i24 & 0xFF00) >> 8);
        if (str.charAt(i+3) != '=')
            data += String.fromCharCode((i24 & 0xFF) >> 0);
    }
    return data;
}


get_cookie_domain = AGCookie.getCookieDomain;
get_cookie_name = AGCookie.getCookieName;

nvp_getval = NVP.getValue;


function get_cookie(name)
{
    var c = nvp_getval(document.cookie, name, '=', ';');
    c = unescape(c);
    while(c.indexOf('%0A') > -1 || c.indexOf('%0a') > -1) {
        c = c.replace(/\%0[aA]/,'');
    }
    c = unescape(c);
    return c;
}

function get_cookie_value_raw(name, pairname)
{
    var c = get_cookie(name);
    var v = nvp_getval(b64_decode(c), pairname, "=", "&");
    if(v) { /* do this because IE is dumb! */
        return unescape(v);
    }
    else {
        return '';
    }
}

function get_cookie_value(name, pairname)
{
    var v = get_cookie_value_raw(name, pairname);
    if(!v && name == 'customer' && pairname == 'name') {
        v = get_cookie_value_raw(name, 'email');
    }
    if(!v && name == 'customer' && pairname == 'name') {
        v = "member";
    }
    return v;
}

function set_cookie(name, value, expires, perm) {
    if(perm) {
        expires = 'Thursday, 31-Dec-2037 00:01:00 GMT';
    }
    var cki = name+'='+value+';';
    if(expires) {
        cki = cki+'expires='+expires+';';
    }
    cki=cki+'path=/;domain='+get_cookie_domain();
    document.cookie = cki;
}

expire_cookie = AGCookie.expireCookie;
// Customer cookie related utilities
// Note that this script relies on cookie_util.js having been already loaded
// somewhere else on the page (first)...

function getCustomerCookieName() {
    try {
        if(cust_ck_name) { return cust_ck_name; } else { return 'customer'; }
    } catch(er) { return 'customer'; }
}

function getMagicSessionCookieName() {
    try {
        if(mcs_ck_name) { return mcs_ck_name; } else { return 'mc_s'; }
    } catch(er) { return 'mc_s'; }
}

function getMagicPersistentCookieName() {
    try {
        if(mcp_ck_name) { return mcp_ck_name; } else { return 'mc_p'; }
    } catch(er) { return 'mc_p'; }
}

function getCustomerStatus() {
    try {
        var ck = getCustomerCookieName();
        var v = get_cookie_value_raw(ck,'status');
        if(!v) { v = '1'; }
        return v;
    } catch(er) { return '1'; }
}

function getCustomerPrevStatus() {
    try {
        var ck = getCustomerCookieName();
        var v = get_cookie_value_raw(ck,'pstatus');
        if(!v) { v = '1'; }
        return v;
    } catch(er) { return '1'; }
}

function getCustomerNumber() {
    try {
        var ck = getCustomerCookieName();
        var v = get_cookie_value_raw(ck,'memnum');
        if(!v) { v = 'Unknown'; }
        return v;
    } catch(er) { return 'Unknown'; }
}

function getCustomerEntryStatus() {
    try {
        var ck = getMagicSessionCookieName();
        var v = parseInt(get_cookie_value_raw(ck,'estatus'));
        if(!v) { return 'afu'; }
        switch(v) {
            case 2: return 'rfu'; break;
            case 3: return 'mcp'; break;
            case 4: return 'mcs'; break;
            case 5: return 'reg'; break;
            default: return 'afu'; break;
        }
    } catch(er) { return 'afu'; }
}


function getCustomerEntryStatusForUUT() {
    known_status = '';
    known_status = getCustomerEntryStatus();

    if (!known_status || known_status == '') { known_status = 'huh'; }
    if (known_status != 'afu' && known_status != 'huh' ) { return known_status; } 

    try {
        var ck = getCustomerCookieName();
        var v = get_cookie_value_raw(ck,'eknown');
        if ( v == '' ) { v = -1; }
    } catch(er) {
        v = -1;
    }

    try {
        if (v == 0) {
            if (!known_status) { return 'a_not_identified' ; } 
            return known_status + '_not_identified';
        } else if (v == -1) {
            return known_status + '_nocookie';
        } else {
            return known_status + '_identified';
        }
    } catch(er) {
        return known_status + '_unknown';
    }
}


function getCountry() {
    try {
        var ck = getMagicSessionCookieName();
        var v = get_cookie_value_raw(ck,'country');
        if(!v) { v = 'US'; }
        return v;
    } catch(er) { return 'US'; }
}

function getCustomerName() {
    try {
        var ck = getCustomerCookieName();
        var v = get_cookie_value_raw(ck,'name');
        if(!v) { v = ''; }
        return v;
    } catch(er) { return ''; }
}

function getCustomerEmail() {
    try {
        var ck = getCustomerCookieName();
        var v = get_cookie_value_raw(ck,'email');
        if(!v) { v = ''; }
        return v;
    } catch(er) { return ''; }
}

function getCustomerAge() {
    try {
        var ck = getCustomerCookieName();
        var v = get_cookie_value_raw(ck,'age');
        if(!v) { v = ''; }
        age = parseInt(v);
        if (age < 18)
        {
          v = "";
        }
        else if (age > 65)
        {
          v = "65";
        }
        return v;
    } catch(er) { return ''; }
}

function getCustomerGender() {
    try {
        var ck = getCustomerCookieName();
        var v = get_cookie_value_raw(ck,'gender');
        if(!v) { v = ''; }
        return v.toLowerCase();
    } catch(er) { return ''; }
}

function getCustomerLanguage() {
    try {
        var ck = getCustomerCookieName();
        var v = get_cookie_value_raw(ck,'ulang');
        if(!v) { try{v=document.documentElement.getAttribute("lang");}catch(e){} }
        if(!v) { v = 'en'; }
        return v.toLowerCase();
    } catch(er) { return 'en'; }
}

function localize_resource(path, language) {
    if (!language) {
        language = getCustomerLanguage();
    }
    var pieces = path.split(".");
    pieces[pieces.length-2] += "_" + language;
    return pieces.join(".");
}

function getSource() {
    var v = MagicCookie.getCookieValue('src');
    return v;
}
// Usage related utilities
// Note that this script relies on cookie_util.js and webvar_util.js being
// already loaded somewhere else on the page (first)...

function getCountFromCookie() {
    try {
        var ck = new ConfirmCookie();
        ck.read();
        return ck.quantity;
    } catch(er) { return null; }
}

function getUsageCount() {
    try {
        var v = getCountFromCookie();
        if(!v) v = webvars.qty;
        if(!v) v = webvars.copies;
        if(!v) v = '1';
        return v;
    } catch(er) { return '1'; }
}
// User segmentation logic
// Note that this script relies on cookie_util.js being loaded first...

function isViewPage() {
    var v = window.location.pathname;
    if(v.indexOf('view.pd') > -1 || v.indexOf('findit.pd') > -1) {
        return 1;
    }
    return 0;
}

function getSegmentCookieName() {
    try {
        if(useg_ck_name) {
            return useg_ck_name;
        }
    }
    catch(er) {
        return 'useg';
    }
}

function getSegmentCookieValue() {
    try {
        var ck_name = 'useg';
        var oldval = AGCookie.getCookie(ck_name);
        var segment = MagicCookie.getCookieValue('afuseg');
        if(oldval && oldval != 'null' && (!segment || segment == 'null')) {
            segment = oldval;
        //    alert('found old value '+segment);
            AGCookie.expireCookie(ck_name);
        //    alert('expired old cookie '+ck_name);
            MagicCookie.setCookieValue('afuseg',segment,1);
        //    alert('set new cookie with afuseg = '+segment);
            return segment;
        }
        else if(segment && segment != 'null') {
        //    alert('found new value '+segment);
            if(oldval && oldval != 'null') {
                AGCookie.expireCookie(ck_name);
        //        alert('expired old cookie '+ck_name);
            }
            return segment;
        }
        else {
        //    alert('did not find old or new segment cookie');
            return '';
        }
    }
    catch(er) {
        //alert('error during getSegmentCookieValue()');
        return '';
    }
}

function doSegment() {
    /* Originally this checked the status before going into all this mess, but
       IE is too damaged to remove cookies from the JS model when they are
       expired... Duh! */
    try {
        var segment = getSegmentCookieValue();
        var ck_name = getSegmentCookieName();
        if((segment == '' || segment == 'recvonly') && !isViewPage()) {
            segment = 'browser';
        }
        else if(segment == '' && isViewPage()) {
            segment = 'recvonly';
        }
        MagicCookie.setCookieValue('afuseg', segment, 1)
        return 'afu_' + segment;
    }
    catch(er) {
        return 'afu_none';
    }
}

// do the magic
var useg = doSegment();
