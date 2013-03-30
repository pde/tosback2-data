<!--
// $Id: base64.js,v 1.19 2006-09-25 22:15:46 pgollucci Exp $

// WebToolKit Code below is freeware.

/**
*
*  WebToolKit.utf8 (UTF-8 encode / decode) component
*  Compiled by Justas Vinevicius <justas.vinevicius(at)gmail.com>
*  Original code by Tobias Kieslich <tobias(at)justdreams.de>
*
*  Homepage:
*  http://www.webtoolkit.info/
*
**/

if (typeof(WebToolKit) == "undefined") {
    var WebToolKit = {};
};

WebToolKit.utf8 = {

    encode : function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }

        return utftext;
    },

    decode : function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while ( i < utftext.length ) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i+1); c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }

};

if (typeof(String.prototype.utf8encode) == "undefined") {
    String.prototype.utf8encode = function () {
        return WebToolKit.utf8.encode(this);
    };
};

if (typeof(String.prototype.utf8decode) == "undefined") {
    String.prototype.utf8decode = function () {
        return WebToolKit.utf8.decode(this);
    };
};

/**
*
*  WebToolKit.base64 (Base64 encode / decode) component
*  Compiled by Justas Vinevicius <justas.vinevicius(at)gmail.com>
*  Original code by Tyler Akins <fidian(at)rumkin.com>
*
*  Dependencies:
*  WebToolKit.utf8 (UTF-8 encode / decode) component for correct UTF-8 handling
*
*  Homepage:
*  http://www.webtoolkit.info/
*
**/

if (typeof(WebToolKit) == "undefined") {
    var WebToolKit = {};
};

WebToolKit.base64 = {

    keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    encode : function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        if (typeof(String.prototype.utf8encode) !== "undefined") {
            input = input.utf8encode();
        }

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

            output = output + this.keyStr.charAt(enc1) + this.keyStr.charAt(enc2) +
            this.keyStr.charAt(enc3) + this.keyStr.charAt(enc4);
        } while (i < input.length);

        return output;
    },

    decode : function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        do {
            enc1 = this.keyStr.indexOf(input.charAt(i++));
            enc2 = this.keyStr.indexOf(input.charAt(i++));
            enc3 = this.keyStr.indexOf(input.charAt(i++));
            enc4 = this.keyStr.indexOf(input.charAt(i++));

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

        if (typeof(String.prototype.utf8decode) !== "undefined") {
            return output.utf8decode();
        } else {
            return output;
        }
    }

};

if (typeof(String.prototype.base64encode) == "undefined") {
    String.prototype.base64encode = function () {
        return WebToolKit.base64.encode(this);
    };
};

if (typeof(String.prototype.base64decode) == "undefined") {
    String.prototype.base64decode = function () {
        return WebToolKit.base64.decode(this);
    };
};



///////////////////// CODE ABOVE DECODES STRING /////////////////
/////////////////////////////////////////////////////////////////
///////////////////// CODE BELOW HANDLES COOKIE ////////////////


// Global Functions
var desc;

 var val = GetCookie("SDIS");
 if (val){
  desc = val.base64decode();
 }
 else{
  var desc = "";
 }

//-->
