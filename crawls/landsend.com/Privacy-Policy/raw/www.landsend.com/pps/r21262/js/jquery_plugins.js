/**
* hoverIntent r5 // 2007.03.27 // jQuery 1.1.2+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne <brian@cherne.net>
*/
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY;};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev]);}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev]);};var handleHover=function(e){var p=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;while(p&&p!=this){try{p=p.parentNode;}catch(e){p=this;}}if(p==this){return false;}var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);}if(e.type=="mouseover"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob);},cfg.timeout);}}};return this.mouseover(handleHover).mouseout(handleHover);};})(jQuery);

/**
 * Cookie plugin
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
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
 */
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
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
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
jQuery.cookie.test = function()	{
	var returnValue = false, testName = 'cT', testValue = 'data';
	jQuery.cookie(testName, testValue);
	if( jQuery.cookie(testName) === testValue ) {
		jQuery.cookie(testName, null);
		returnValue = true;
	}
	return returnValue;
};

/**
 * jQuery.dataStore - local/session storage API with cookie fallback
 * Dependent on $.cookie plugin by Klaus Hartl
 * @param String key The name of the variable.
 * @param String value The value of the variable.
 * @param Number|Date expires If null adds to sessionStorage or session cookie, if present, adds to localStorage or cookie with expires date
 **/
jQuery.dataStore = function(key, value, expires){
	var ls = window.localStorage;
	var ss = window.sessionStorage;	
	if(ls){ // clear out expired localStorage variables, tracking expiration is done by creating a second variable with the expires date
		for (var i = 0; i < ls.length; i++){
		    if(	ls.key(i).indexOf('EXPIRES') == -1 
		    	&& ls.getItem(ls.key(i)+'EXPIRES') 
		    	&& new Date(ls.getItem(ls.key(i)+'EXPIRES')) < new Date()
		    ){
		    	ls.removeItem(ls.key(i));
		    	ls.removeItem(ls.key(i)+'EXPIRES');
		    }
		}
	}	
	if(key && value && expires && (typeof expires == 'number' || expires.toUTCString)){ // set local storage/cookie with expires date
		var expireDate;
		if(typeof expires == 'number') {
			expireDate = new Date();
			expireDate.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
			expireDate = expireDate.toUTCString();
		} else {
			expireDate = expires.toUTCString();
		}
		if(ls){ 
			ls.setItem(key,value);
			ls.setItem(key + 'EXPIRES',expireDate);
		} else { 
			$.cookie(key, value, {path: '/', expires:expires});
		}
	} else if(key && value){ // set session storage/cookie
		if(ss){
			ss.setItem(key,value);
		} else { 
			$.cookie(key, value, {path: '/'});
		}
	} else if(key && value === undefined || expires < 0){ // get value
		var r = null;
		if(ss && ss.getItem(key)){ 
			r = ss.getItem(key);
		} else if(ls && ls.getItem(key)){ 
			r = ls.getItem(key);
		} else { 
			r = $.cookie(key);
		}
		return r;
	} else if(key && (value === null || value === "")){ // delete value
		if(ss && ss.getItem(key)){
			ss.removeItem(key);
		} else if(ls && ls.getItem(key)){
			ls.removeItem(key);
			if(ls.getItem(key+'EXPIRES')){
				ls.removeItem(key+'EXPIRES');
			}
		} else {
			$.cookie(key,null);
		}
	}	
};


/**
 * jQuery.query - Query String Modification and Creation for jQuery
 * Written by Blair Mitchelmore (blair DOT mitchelmore AT gmail DOT com)
 * Licensed under the WTFPL (http://sam.zoy.org/wtfpl/).
 * Date: 2009/8/13
 *
 * @author Blair Mitchelmore
 * @version 2.1.7
 *
 **/
new function(settings) { 
  // Various Settings
  var $separator = settings.separator || '&';
  var $spaces = settings.spaces === false ? false : true;
  var $suffix = settings.suffix === false ? '' : '[]';
  var $prefix = settings.prefix === false ? false : true;
  var $hash = $prefix ? settings.hash === true ? "#" : "?" : "";
  var $numbers = settings.numbers === false ? false : true;
  
  jQuery.query = new function() {
    var is = function(o, t) {
      return o != undefined && o !== null && (!!t ? o.constructor == t : true);
    };
    var parse = function(path) {
      var m, rx = /\[([^[]*)\]/g, match = /^([^[]+)(\[.*\])?$/.exec(path), base = match[1], tokens = [];
      while (m = rx.exec(match[2])) tokens.push(m[1]);
      return [base, tokens];
    };
    var set = function(target, tokens, value) {
      var o, token = tokens.shift();
      if (typeof target != 'object') target = null;
      if (token === "") {
        if (!target) target = [];
        if (is(target, Array)) {
          target.push(tokens.length == 0 ? value : set(null, tokens.slice(0), value));
        } else if (is(target, Object)) {
          var i = 0;
          while (target[i++] != null);
          target[--i] = tokens.length == 0 ? value : set(target[i], tokens.slice(0), value);
        } else {
          target = [];
          target.push(tokens.length == 0 ? value : set(null, tokens.slice(0), value));
        }
      } else if (token && token.match(/^\s*[0-9]+\s*$/)) {
        var index = parseInt(token, 10);
        if (!target) target = [];
        target[index] = tokens.length == 0 ? value : set(target[index], tokens.slice(0), value);
      } else if (token) {
        var index = token.replace(/^\s*|\s*$/g, "");
        if (!target) target = {};
        if (is(target, Array)) {
          var temp = {};
          for (var i = 0; i < target.length; ++i) {
            temp[i] = target[i];
          }
          target = temp;
        }
        target[index] = tokens.length == 0 ? value : set(target[index], tokens.slice(0), value);
      } else {
        return value;
      }
      return target;
    };
    
    var queryObject = function(a) {
      var self = this;
      self.keys = {};
      
      if (a.queryObject) {
        jQuery.each(a.get(), function(key, val) {
          self.SET(key, val);
        });
      } else {
        jQuery.each(arguments, function() {
          var q = "" + this;
          q = q.replace(/^[?#]/,''); // remove any leading ? || #
          q = q.replace(/[;&]$/,''); // remove any trailing & || ;
          if ($spaces) q = q.replace(/[+]/g,' '); // replace +'s with spaces
          
          jQuery.each(q.split(/[&;]/), function(){
            var key = decodeURIComponent(this.split('=')[0] || "");
            var val = decodeURIComponent(this.split('=')[1] || "");
            
            if (!key) return;
            
            if ($numbers) {
              if (/^[+-]?[0-9]+\.[0-9]*$/.test(val)) // simple float regex
                val = parseFloat(val);
              else if (/^[+-]?[0-9]+$/.test(val)) // simple int regex
                val = parseInt(val, 10);
            }
            
            val = (!val && val !== 0) ? true : val;
            
            if (val !== false && val !== true && typeof val != 'number')
              val = val;
            
            self.SET(key, val);
          });
        });
      }
      return self;
    };
    
    queryObject.prototype = {
      queryObject: true,
      has: function(key, type) {
        var value = this.get(key);
        return is(value, type);
      },
      GET: function(key) {
        if (!is(key)) return this.keys;
        var parsed = parse(key), base = parsed[0], tokens = parsed[1];
        var target = this.keys[base];
        while (target != null && tokens.length != 0) {
          target = target[tokens.shift()];
        }
        return typeof target == 'number' ? target : target || "";
      },
      get: function(key) {
        var target = this.GET(key);
        if (is(target, Object))
          return jQuery.extend(true, {}, target);
        else if (is(target, Array))
          return target.slice(0);
        return target;
      },
      value: function(key){
    	 var theValue = this.get(key);
    	 if(theValue != null && theValue != undefined && typeof theValue == "boolean"){
    		 return null;
    	 }
    	 
    	 return theValue;
      },
      SET: function(key, val) {
        var value = !is(val) ? null : val;
        var parsed = parse(key), base = parsed[0], tokens = parsed[1];
        var target = this.keys[base];
        this.keys[base] = set(target, tokens.slice(0), value);
        return this;
      },
      set: function(key, val) {
        return this.copy().SET(key, val);
      },
      REMOVE: function(key) {
        return this.SET(key, null).COMPACT();
      },
      remove: function(key) {
        return this.copy().REMOVE(key);
      },
      EMPTY: function() {
        var self = this;
        jQuery.each(self.keys, function(key, value) {
          delete self.keys[key];
        });
        return self;
      },
      load: function(url) {
        var hash = url.replace(/^.*?[#](.+?)(?:\?.+)?$/, "$1");
        var search = url.replace(/^.*?[?](.+?)(?:#.+)?$/, "$1");
        return new queryObject(url.length == search.length ? '' : search, url.length == hash.length ? '' : hash);
      },
      empty: function() {
        return this.copy().EMPTY();
      },
      copy: function() {
        return new queryObject(this);
      },
      COMPACT: function() {
        function build(orig) {
          var obj = typeof orig == "object" ? is(orig, Array) ? [] : {} : orig;
          if (typeof orig == 'object') {
            function add(o, key, value) {
              if (is(o, Array))
                o.push(value);
              else
                o[key] = value;
            }
            jQuery.each(orig, function(key, value) {
              if (!is(value)) return true;
              add(obj, key, build(value));
            });
          }
          return obj;
        }
        this.keys = build(this.keys);
        return this;
      },
      compact: function() {
        return this.copy().COMPACT();
      },
      toString: function() {
        var i = 0, queryString = [], chunks = [], self = this;
        var encode = function(str) {
          str = str + "";
          if ($spaces) str = str.replace(/ /g, "+");
          return encodeURIComponent(str);
        };
        var addFields = function(arr, key, value) {
          if (!is(value) || value === false) return;
          var o = [encode(key)];
          if (value !== true) {
            o.push("=");
            o.push(encode(value));
          }
          arr.push(o.join(""));
        };
        var build = function(obj, base) {
          var newKey = function(key) {
            return !base || base == "" ? [key].join("") : [base, "[", key, "]"].join("");
          };
          jQuery.each(obj, function(key, value) {
            if (typeof value == 'object') 
              build(value, newKey(key));
            else
              addFields(chunks, newKey(key), value);
          });
        };
        
        build(this.keys);
        
        if (chunks.length > 0) queryString.push($hash);
        queryString.push(chunks.join($separator));
        
        return queryString.join("");
      }
    };
    
    return new queryObject(location.search, location.hash);
  };
}(jQuery.query || {}); // Pass in jQuery.query as settings object

/**
 * jQuery.debugWindow - debug window logger
 * usage: $.debug("message");
 * @author mtambo
 **/
(function($){
	var line=0, debug=($.query.get("debug")==="true");
	$.debug=function(msg){
		if(!debug)return;
		var clr = (line++ % 2 == 0)?"background-color:#E3E3D6;":"";
		var win = window.open("","debugWindow","width=700,height=600,resizable=yes,scrollbars=yes,status=no,alwaysraised=yes");
		win.document.writeln("<div style='border-top:solid .1em;font-size:small;"+clr+"'>"+new Date().toLocaleTimeString()+":"+ msg+"</div>\n");
		win.scrollTo(0,999999999);
	}; 
})(jQuery);

/**
 * jQuery.namespace - create an object in given namespace path
 * usage: $.namespace("com.landsend.newnamespace", object); // place object at com.landsend.newnamespace
 *		  $.namespace("com.landsend.newnamespace");         // ensure "com.landsend.newnamepace" is defined
 * @param ns - period delimited string for namespace hierarchy
 * @param obj - optional object to place at "newnamepace", overwriting any existing object
 * @return a reference to new/existing namespace
 * @author mtambo - based on numerous web examples
 **/
(function ($){
	$.namespace = function(ns, obj) {
		var nsElms = ns.split(".");
		for (var i=0, cur = window; i < nsElms.length; cur=cur[nsElms[i++]]) {
			if (obj === undefined && cur[nsElms[i]] === undefined) {
				cur[nsElms[i]] = {};
			} else 	if (obj !== undefined && i==nsElms.length-1) {
				cur[nsElms[i]] = obj;
			} else if (cur[nsElms[i]] === undefined) {
				cur[nsElms[i]] = {};
			}
		}
		return eval(ns);
	}
})(jQuery);

/**
 * jQuery.hoverIntentLive - function that combines the behaviors of the hoverIntent plugin and $().live().
 * requires the hoverIntent plugin.
 * usage: $(selector).hoverIntentLive({over:function(){}, out:function(){}, interval:(optional), timeout:(optional)}); 
 *     or: $(selector).hoverIntentLive(overFunction, outFunction); 
 * @author mtambo - mostly copied - http://rndnext.blogspot.com/2009/02/jquery-live-and-plugins.html
 **/
(function($){
	$.fn.hoverIntentLive = function(configOrFunction, outFunction) {
		this.live("mouseover", function() {
			if (!$(this).data('hoverInit')) {
				$(this).data('hoverInit', true).hoverIntent(configOrFunction, outFunction).trigger('mouseover');
			} 
		});
	}
})(jQuery);


$.fn.setCursorPosition = function(pos) {
	  this.each(function(index, elem) {
	    if (elem.setSelectionRange) {
	      elem.setSelectionRange(pos, pos);
	    } else if (elem.createTextRange) {
	      var range = elem.createTextRange();
	      range.collapse(true);
	      range.moveEnd('character', pos);
	      range.moveStart('character', pos);
	      range.select();
	    }
	  });
	  return this;
	};
	
	new function($) {
	    $.fn.getCursorPosition = function() {
	        var pos = 0;
	        var input = $(this).get(0);
	        // IE Support
	        if (document.selection) {
	            input.focus();
	            var sel = document.selection.createRange();
	            var selLen = document.selection.createRange().text.length;
	            sel.moveStart('character', -input.value.length);
	            pos = sel.text.length - selLen;
	        }
	        // Firefox support
	        else if (input.selectionStart || input.selectionStart == '0')
	            pos = input.selectionStart;

	        return pos;
	    }
} (jQuery);

/*
* @Copyright (c) 2010 Ricardo Andrietta Mendes - eng.rmendes@gmail.com
* 
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
* 
* How to use it:
* var formated_value = $().number_format(final_value);
* 
* Advanced:
* var formated_value = $().number_format(final_value, 
* 													{
* 													numberOfDecimals:3,
* 													decimalSeparator: '.',
* 													thousandSeparator: ',',
* 													symbol: 'R$'
* 													});
*/
//indica que est� sendo criado um plugin
//jQuery.fn.extend({ //indica que est� sendo criado um plugin
new function($){	
	$.number_format =  function(numero, params) //indica o nome do plugin que ser� criado com os parametros a serem informados
		{ 
		//parametros default
		var sDefaults = 
			{			
			numberOfDecimals: 2,
			decimalSeparator: '.',
			thousandSeparator: '',
			symbol: ''
			}
 
		//fun��o do jquery que substitui os parametros que n�o foram informados pelos defaults
		var options = jQuery.extend(sDefaults, params);

		//CORPO DO PLUGIN
		var number = numero; 
		var decimals = options.numberOfDecimals;
		var dec_point = options.decimalSeparator;
		var thousands_sep = options.thousandSeparator;
		var currencySymbol = options.symbol;
		
		var exponent = "";
		var numberstr = number.toString ();
		var eindex = numberstr.indexOf ("e");
		if (eindex > -1)
		{
		exponent = numberstr.substring (eindex);
		number = parseFloat (numberstr.substring (0, eindex));
		}
		
		if (decimals != null)
		{
		var temp = Math.pow (10, decimals);
		number = Math.round (number * temp) / temp;
		}
		var sign = number < 0 ? "-" : "";
		var integer = (number > 0 ? 
		  Math.floor (number) : Math.abs (Math.ceil (number))).toString ();
		
		var fractional = number.toString ().substring (integer.length + sign.length);
		dec_point = dec_point != null ? dec_point : ".";
		fractional = decimals != null && decimals > 0 || fractional.length > 1 ? 
				   (dec_point + fractional.substring (1)) : "";
		if (decimals != null && decimals > 0)
		{
		for (i = fractional.length - 1, z = decimals; i < z; ++i)
		  fractional += "0";
		}
		
		thousands_sep = (thousands_sep != dec_point || fractional.length == 0) ? 
					  thousands_sep : null;
		if (thousands_sep != null && thousands_sep != "")
		{
		for (i = integer.length - 3; i > 0; i -= 3)
		  integer = integer.substring (0 , i) + thousands_sep + integer.substring (i);
		}
		
		if (options.symbol == '')
		{
		return sign + integer + fractional + exponent;
		}
		else
		{
		return currencySymbol + ' ' + sign + integer + fractional + exponent;
		}
		//FIM DO CORPO DO PLUGIN	
		
	}
}(jQuery);


/*
*
* Copyright (c) 2011 Cloudgen Wong (<a href="http://www.cloudgen.w0ng.hk">Cloudgen Wong</a>)
* Licensed under the MIT License:
* http://www.opensource.org/licenses/mit-license.php
*
*/
//version 1.05 
//fix the problem of jQuery 1.5 when using .val() 
//fix the problem when precision has been set and the input start with decimal dot or comma ,e.g. precision set to 3 and input with ".1234"
var email={tldn:new RegExp("^[^\@]+\@[^\@]+\.(A[C-GL-OQ-UWXZ]|B[ABD-JM-OR-TVWYZ]|C[ACDF-IK-ORUVX-Z]|D[EJKMOZ]|E[CEGR-U]|F[I-KMOR]|G[ABD-IL-NP-UWY]|H[KMNRTU]|I[DEL-OQ-T]|J[EMOP]|K[EG-IMNPRWYZ]|L[A-CIKR-VY]|M[AC-EGHK-Z]|N[ACE-GILOPRUZ]|OM|P[AE-HKL-NR-TWY]|QA|R[EOSUW]|S[A-EG-ORT-VYZ]|T[CDF-HJ-PRTVWZ]|U[AGKMSYZ]|V[ACEGINU]|W[FS]|XN|Y[ETU]|Z[AMW]|AERO|ARPA|ASIA|BIZ|CAT|COM|COOP|EDU|GOV|INFO|INT|JOBS|MIL|MOBI|MUSEUM|NAME|NET|ORG|PRO|TEL|TRAVEL)$","i")};
(function($){
 $.extend($.expr[":"],{
   regex:function(d,a,c){
     var e=new RegExp(c[3],"g");
     var b=("text"===d.type)?d.value:d.innerHTML;
     return(b=="")?true:(e.exec(b))
   }
 });
 $.fn.output=function(d){
   if(typeof d=="undefined")
     return (this.is(":text"))?this.val():this.html();
   else
     return (this.is(":text"))?this.val(d):this.html(d);
 };
 formatter={
   getRegex:function(settings){
     var settings=$.extend({type:"decimal",precision:5,decimal:'.',allow_negative:true},settings);
     var result="";
     if(settings.type=="decimal"){
       var e=(settings.allow_negative)?"-?":"";
       if(settings.precision>0)
         result="^"+e+"\\d+$|^"+e+"\\d*"+settings.decimal+"\\d{1,"+settings.precision+"}$";
       else result="^"+e+"\\d+$"
     }else if(settings.type=="phone-number"){
       result="^\\d[\\d\\-]*\\d$"
     }else if(settings.type=="alphabet"){
       result="^[A-Za-z]+$"
     }
     return result
   },
   isEmail:function(d){
     var a=$(d).output();
     var c=false;
     var e=true;
     var e=new RegExp("[\s\~\!\#\$\%\^\&\*\+\=\(\)\[\]\{\}\<\>\\\/\;\:\,\?\|]+");
     if(a.match(e)!=null){
       return c
     }
     if(a.match(/((\.\.)|(\.\-)|(\.\@)|(\-\.)|(\-\-)|(\-\@)|(\@\.)|(\@\-)|(\@\@))+/)!=null){
       return c
     }
     if(a.indexOf("\'")!=-1){
       return c
     }
     if(a.indexOf("\"")!=-1){
       return c
     }
     if(email.tldn&&a.match(email.tldn)==null){
       return c
     }
     return e
   },
   formatString:function(target,settings){
     var settings=$.extend({type:"decimal",precision:5,decimal:'.',allow_negative:true},settings);
     var oldText=$(target).output();
     var newText=oldText;
     if(settings.type=="decimal"){
       if(newText!=""){
         var g;
         var h=(settings.allow_negative)?"\\-":"";
         var i="\\"+settings.decimal;
         g=new RegExp("[^\\d"+h+i+"]+","g");
         newText=newText.replace(g,"");
         var h=(settings.allow_negative)?"\\-?":"";
         if(settings.precision>0)
           g=new RegExp("^("+h+"\\d*"+i+"\\d{1,"+settings.precision+"}).*");
         else g=new RegExp("^("+h+"\\d+).*");
         newText=newText.replace(g,"$1")
       }
     }else if(settings.type=="phone-number"){
       newText=newText.replace(/[^\-\d]+/g,"").replace(/^\-+/,"").replace(/\-+/,"-")
     }else if(settings.type=="alphabet"){
       newText=newText.replace(/[^A-Za-z]+/g,"")
     }
     if(newText!=oldText)
       $(target).output(newText)
   }
 };
 $.fn.format=function(settings,wrongFormatHandler){
   var settings=$.extend({type:"decimal",precision:5,decimal:".",allow_negative:true,autofix:false},settings);
   var decimal=settings.decimal;
   wrongFormatHandler=typeof wrongFormatHandler=="function"?wrongFormatHandler:function(){};
   this.keypress(function(d){
     $(this).data("old-value",$(this).val());
     var a=d.charCode?d.charCode:d.keyCode?d.keyCode:0;
     if(a==13&&this.nodeName.toLowerCase()!="input"){return false}
     if((d.ctrlKey&&(a==97||a==65||a==120||a==88||a==99||a==67||a==122||a==90||a==118||a==86||a==45))||(a==46&&d.which!=null&&d.which==0))
       return true;
     if(a<48||a>57){
       if(settings.type=="decimal"){
         if(settings.allow_negative&&a==45&&this.value.length==0)return true;
         if(a==decimal.charCodeAt(0)){
           if(settings.precision>0&&this.value.indexOf(decimal)==-1)return true;
           else return false
         }
         if(a!=8&&a!=9&&a!=13&&a!=35&&a!=36&&a!=37&&a!=39){return false}
         return true
       }else if(settings.type=="email"){
         if(a==8||a==9||a==13||(a>34&&a<38)||a==39||a==45||a==46||(a>64&&a<91)||(a>96&&a<123)||a==95){return true}
         if(a==64&&this.value.indexOf("@")==-1)return true;
         return false
       }else if(settings.type=="phone-number"){
         if(a==45&&this.value.length==0)return false;
         if(a==8||a==9||a==13||(a>34&&a<38)||a==39||a==45){return true}
         return false
       }else if(settings.type=="alphabet"){
         if(a==8||a==9||a==13||(a>34&&a<38)||a==39||(a>64&&a<91)||(a>96&&a<123))
         return true
       }else return false
     }else{
       if(settings.type=="alphabet"){
         return false
       }else return true
     }
   })
   .blur(function(){
     if(settings.type=="email"){
       if(!formatter.isEmail(this)){
         wrongFormatHandler.apply(this)
       }
     }else{
       if(!$(this).is(":regex("+formatter.getRegex(settings)+")")){
         wrongFormatHandler.apply(this)
       }
     }
   })
   .focus(function(){
     $(this).select()
   });
   if(settings.autofix){
     this.keyup(function(d){
       if($(this).data("old-value")!=$(this).val())
         formatter.formatString(this,settings)
       }
     )
   }
   return this
 }
})(jQuery);



/*
 * jQuery plugin: fieldSelection - v0.1.0 - last change: 2006-12-16
 * (c) 2006 Alex Brem <alex@0xab.cd> - http://blog.0xab.cd
 */

(function() {
	var fieldSelection = {
		getSelection: function() {
			var e = this.jquery ? this[0] : this;
			return (
				/* mozilla / dom 3.0 */
				('selectionStart' in e && function() {
					var l = e.selectionEnd - e.selectionStart;
					return { start: e.selectionStart, end: e.selectionEnd, length: l, text: e.value.substr(e.selectionStart, l) };
				}) ||
				/* exploder */
				(document.selection && function() {
					e.focus();
					var r = document.selection.createRange();
					if (r == null) {
						return { start: 0, end: e.value.length, length: 0 }
					}
					var re = e.createTextRange();
					var rc = re.duplicate();
					re.moveToBookmark(r.getBookmark());
					rc.setEndPoint('EndToStart', re);

					return { start: rc.text.length, end: rc.text.length + r.text.length, length: r.text.length, text: r.text };
				}) ||
				/* browser not supported */
				function() {
					return { start: 0, end: e.value.length, length: 0 };
				}
			)();
		},

		replaceSelection: function() {
			var e = this.jquery ? this[0] : this;
			var text = arguments[0] || '';
			return (
				/* mozilla / dom 3.0 */
				('selectionStart' in e && function() {
					e.value = e.value.substr(0, e.selectionStart) + text + e.value.substr(e.selectionEnd, e.value.length);
					return this;
				}) ||
				/* exploder */
				(document.selection && function() {
					e.focus();
					document.selection.createRange().text = text;
					return this;
				}) ||
				/* browser not supported */
				function() {
					e.value += text;
					return this;
				}
			)();
		}
	};
	jQuery.each(fieldSelection, function(i) { jQuery.fn[i] = this; });
})();

$.fn.selectRange = function(start, end) {
    return this.each(function() {
        if (this.setSelectionRange) {
            this.focus();
            this.setSelectionRange(start, end);
        } else if (this.createTextRange) {
            var range = this.createTextRange();
            range.collapse(true);
            range.moveEnd('character', end);
            range.moveStart('character', start);
            range.select();
        }
    });
};