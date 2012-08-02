// Underscore.js 1.3.3
// (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
// Underscore is freely distributable under the MIT license.
// Portions of Underscore are inspired or borrowed from Prototype,
// Oliver Steele's Functional, and John Resig's Micro-Templating.
// For all details and documentation:
// http://documentcloud.github.com/underscore
(function(){function r(a,c,d){if(a===c)return 0!==a||1/a==1/c;if(null==a||null==c)return a===c;a._chain&&(a=a._wrapped);c._chain&&(c=c._wrapped);if(a.isEqual&&b.isFunction(a.isEqual))return a.isEqual(c);if(c.isEqual&&b.isFunction(c.isEqual))return c.isEqual(a);var e=l.call(a);if(e!=l.call(c))return!1;switch(e){case "[object String]":return a==""+c;case "[object Number]":return a!=+a?c!=+c:0==a?1/a==1/c:a==+c;case "[object Date]":case "[object Boolean]":return+a==+c;case "[object RegExp]":return a.source==
c.source&&a.global==c.global&&a.multiline==c.multiline&&a.ignoreCase==c.ignoreCase}if("object"!=typeof a||"object"!=typeof c)return!1;for(var f=d.length;f--;)if(d[f]==a)return!0;d.push(a);var f=0,g=!0;if("[object Array]"==e){if(f=a.length,g=f==c.length)for(;f--&&(g=f in a==f in c&&r(a[f],c[f],d)););}else{if("constructor"in a!="constructor"in c||a.constructor!=c.constructor)return!1;for(var h in a)if(b.has(a,h)&&(f++,!(g=b.has(c,h)&&r(a[h],c[h],d))))break;if(g){for(h in c)if(b.has(c,h)&&!f--)break;
g=!f}}d.pop();return g}var s=this,I=s._,o={},k=Array.prototype,p=Object.prototype,i=k.slice,J=k.unshift,l=p.toString,K=p.hasOwnProperty,y=k.forEach,z=k.map,A=k.reduce,B=k.reduceRight,C=k.filter,D=k.every,E=k.some,q=k.indexOf,F=k.lastIndexOf,p=Array.isArray,L=Object.keys,t=Function.prototype.bind,b=function(a){return new m(a)};"undefined"!==typeof exports?("undefined"!==typeof module&&module.exports&&(exports=module.exports=b),exports._=b):s._=b;b.VERSION="1.3.3";var j=b.each=b.forEach=function(a,
c,d){if(a!=null)if(y&&a.forEach===y)a.forEach(c,d);else if(a.length===+a.length)for(var e=0,f=a.length;e<f;e++){if(e in a&&c.call(d,a[e],e,a)===o)break}else for(e in a)if(b.has(a,e)&&c.call(d,a[e],e,a)===o)break};b.map=b.collect=function(a,c,b){var e=[];if(a==null)return e;if(z&&a.map===z)return a.map(c,b);j(a,function(a,g,h){e[e.length]=c.call(b,a,g,h)});if(a.length===+a.length)e.length=a.length;return e};b.reduce=b.foldl=b.inject=function(a,c,d,e){var f=arguments.length>2;a==null&&(a=[]);if(A&&
a.reduce===A){e&&(c=b.bind(c,e));return f?a.reduce(c,d):a.reduce(c)}j(a,function(a,b,i){if(f)d=c.call(e,d,a,b,i);else{d=a;f=true}});if(!f)throw new TypeError("Reduce of empty array with no initial value");return d};b.reduceRight=b.foldr=function(a,c,d,e){var f=arguments.length>2;a==null&&(a=[]);if(B&&a.reduceRight===B){e&&(c=b.bind(c,e));return f?a.reduceRight(c,d):a.reduceRight(c)}var g=b.toArray(a).reverse();e&&!f&&(c=b.bind(c,e));return f?b.reduce(g,c,d,e):b.reduce(g,c)};b.find=b.detect=function(a,
c,b){var e;G(a,function(a,g,h){if(c.call(b,a,g,h)){e=a;return true}});return e};b.filter=b.select=function(a,c,b){var e=[];if(a==null)return e;if(C&&a.filter===C)return a.filter(c,b);j(a,function(a,g,h){c.call(b,a,g,h)&&(e[e.length]=a)});return e};b.reject=function(a,c,b){var e=[];if(a==null)return e;j(a,function(a,g,h){c.call(b,a,g,h)||(e[e.length]=a)});return e};b.every=b.all=function(a,c,b){var e=true;if(a==null)return e;if(D&&a.every===D)return a.every(c,b);j(a,function(a,g,h){if(!(e=e&&c.call(b,
a,g,h)))return o});return!!e};var G=b.some=b.any=function(a,c,d){c||(c=b.identity);var e=false;if(a==null)return e;if(E&&a.some===E)return a.some(c,d);j(a,function(a,b,h){if(e||(e=c.call(d,a,b,h)))return o});return!!e};b.include=b.contains=function(a,c){var b=false;if(a==null)return b;if(q&&a.indexOf===q)return a.indexOf(c)!=-1;return b=G(a,function(a){return a===c})};b.invoke=function(a,c){var d=i.call(arguments,2);return b.map(a,function(a){return(b.isFunction(c)?c||a:a[c]).apply(a,d)})};b.pluck=
function(a,c){return b.map(a,function(a){return a[c]})};b.max=function(a,c,d){if(!c&&b.isArray(a)&&a[0]===+a[0])return Math.max.apply(Math,a);if(!c&&b.isEmpty(a))return-Infinity;var e={computed:-Infinity};j(a,function(a,b,h){b=c?c.call(d,a,b,h):a;b>=e.computed&&(e={value:a,computed:b})});return e.value};b.min=function(a,c,d){if(!c&&b.isArray(a)&&a[0]===+a[0])return Math.min.apply(Math,a);if(!c&&b.isEmpty(a))return Infinity;var e={computed:Infinity};j(a,function(a,b,h){b=c?c.call(d,a,b,h):a;b<e.computed&&
(e={value:a,computed:b})});return e.value};b.shuffle=function(a){var b=[],d;j(a,function(a,f){d=Math.floor(Math.random()*(f+1));b[f]=b[d];b[d]=a});return b};b.sortBy=function(a,c,d){var e=b.isFunction(c)?c:function(a){return a[c]};return b.pluck(b.map(a,function(a,b,c){return{value:a,criteria:e.call(d,a,b,c)}}).sort(function(a,b){var c=a.criteria,d=b.criteria;return c===void 0?1:d===void 0?-1:c<d?-1:c>d?1:0}),"value")};b.groupBy=function(a,c){var d={},e=b.isFunction(c)?c:function(a){return a[c]};
j(a,function(a,b){var c=e(a,b);(d[c]||(d[c]=[])).push(a)});return d};b.sortedIndex=function(a,c,d){d||(d=b.identity);for(var e=0,f=a.length;e<f;){var g=e+f>>1;d(a[g])<d(c)?e=g+1:f=g}return e};b.toArray=function(a){return!a?[]:b.isArray(a)||b.isArguments(a)?i.call(a):a.toArray&&b.isFunction(a.toArray)?a.toArray():b.values(a)};b.size=function(a){return b.isArray(a)?a.length:b.keys(a).length};b.first=b.head=b.take=function(a,b,d){return b!=null&&!d?i.call(a,0,b):a[0]};b.initial=function(a,b,d){return i.call(a,
0,a.length-(b==null||d?1:b))};b.last=function(a,b,d){return b!=null&&!d?i.call(a,Math.max(a.length-b,0)):a[a.length-1]};b.rest=b.tail=function(a,b,d){return i.call(a,b==null||d?1:b)};b.compact=function(a){return b.filter(a,function(a){return!!a})};b.flatten=function(a,c){return b.reduce(a,function(a,e){if(b.isArray(e))return a.concat(c?e:b.flatten(e));a[a.length]=e;return a},[])};b.without=function(a){return b.difference(a,i.call(arguments,1))};b.uniq=b.unique=function(a,c,d){var d=d?b.map(a,d):a,
e=[];a.length<3&&(c=true);b.reduce(d,function(d,g,h){if(c?b.last(d)!==g||!d.length:!b.include(d,g)){d.push(g);e.push(a[h])}return d},[]);return e};b.union=function(){return b.uniq(b.flatten(arguments,true))};b.intersection=b.intersect=function(a){var c=i.call(arguments,1);return b.filter(b.uniq(a),function(a){return b.every(c,function(c){return b.indexOf(c,a)>=0})})};b.difference=function(a){var c=b.flatten(i.call(arguments,1),true);return b.filter(a,function(a){return!b.include(c,a)})};b.zip=function(){for(var a=
i.call(arguments),c=b.max(b.pluck(a,"length")),d=Array(c),e=0;e<c;e++)d[e]=b.pluck(a,""+e);return d};b.indexOf=function(a,c,d){if(a==null)return-1;var e;if(d){d=b.sortedIndex(a,c);return a[d]===c?d:-1}if(q&&a.indexOf===q)return a.indexOf(c);d=0;for(e=a.length;d<e;d++)if(d in a&&a[d]===c)return d;return-1};b.lastIndexOf=function(a,b){if(a==null)return-1;if(F&&a.lastIndexOf===F)return a.lastIndexOf(b);for(var d=a.length;d--;)if(d in a&&a[d]===b)return d;return-1};b.range=function(a,b,d){if(arguments.length<=
1){b=a||0;a=0}for(var d=arguments[2]||1,e=Math.max(Math.ceil((b-a)/d),0),f=0,g=Array(e);f<e;){g[f++]=a;a=a+d}return g};var H=function(){};b.bind=function(a,c){var d,e;if(a.bind===t&&t)return t.apply(a,i.call(arguments,1));if(!b.isFunction(a))throw new TypeError;e=i.call(arguments,2);return d=function(){if(!(this instanceof d))return a.apply(c,e.concat(i.call(arguments)));H.prototype=a.prototype;var b=new H,g=a.apply(b,e.concat(i.call(arguments)));return Object(g)===g?g:b}};b.bindAll=function(a){var c=
i.call(arguments,1);c.length==0&&(c=b.functions(a));j(c,function(c){a[c]=b.bind(a[c],a)});return a};b.memoize=function(a,c){var d={};c||(c=b.identity);return function(){var e=c.apply(this,arguments);return b.has(d,e)?d[e]:d[e]=a.apply(this,arguments)}};b.delay=function(a,b){var d=i.call(arguments,2);return setTimeout(function(){return a.apply(null,d)},b)};b.defer=function(a){return b.delay.apply(b,[a,1].concat(i.call(arguments,1)))};b.throttle=function(a,c){var d,e,f,g,h,i,j=b.debounce(function(){h=
g=false},c);return function(){d=this;e=arguments;f||(f=setTimeout(function(){f=null;h&&a.apply(d,e);j()},c));g?h=true:i=a.apply(d,e);j();g=true;return i}};b.debounce=function(a,b,d){var e;return function(){var f=this,g=arguments;d&&!e&&a.apply(f,g);clearTimeout(e);e=setTimeout(function(){e=null;d||a.apply(f,g)},b)}};b.once=function(a){var b=false,d;return function(){if(b)return d;b=true;return d=a.apply(this,arguments)}};b.wrap=function(a,b){return function(){var d=[a].concat(i.call(arguments,0));
return b.apply(this,d)}};b.compose=function(){var a=arguments;return function(){for(var b=arguments,d=a.length-1;d>=0;d--)b=[a[d].apply(this,b)];return b[0]}};b.after=function(a,b){return a<=0?b():function(){if(--a<1)return b.apply(this,arguments)}};b.keys=L||function(a){if(a!==Object(a))throw new TypeError("Invalid object");var c=[],d;for(d in a)b.has(a,d)&&(c[c.length]=d);return c};b.values=function(a){return b.map(a,b.identity)};b.functions=b.methods=function(a){var c=[],d;for(d in a)b.isFunction(a[d])&&
c.push(d);return c.sort()};b.extend=function(a){j(i.call(arguments,1),function(b){for(var d in b)a[d]=b[d]});return a};b.pick=function(a){var c={};j(b.flatten(i.call(arguments,1)),function(b){b in a&&(c[b]=a[b])});return c};b.defaults=function(a){j(i.call(arguments,1),function(b){for(var d in b)a[d]==null&&(a[d]=b[d])});return a};b.clone=function(a){return!b.isObject(a)?a:b.isArray(a)?a.slice():b.extend({},a)};b.tap=function(a,b){b(a);return a};b.isEqual=function(a,b){return r(a,b,[])};b.isEmpty=
function(a){if(a==null)return true;if(b.isArray(a)||b.isString(a))return a.length===0;for(var c in a)if(b.has(a,c))return false;return true};b.isElement=function(a){return!!(a&&a.nodeType==1)};b.isArray=p||function(a){return l.call(a)=="[object Array]"};b.isObject=function(a){return a===Object(a)};b.isArguments=function(a){return l.call(a)=="[object Arguments]"};b.isArguments(arguments)||(b.isArguments=function(a){return!(!a||!b.has(a,"callee"))});b.isFunction=function(a){return l.call(a)=="[object Function]"};
b.isString=function(a){return l.call(a)=="[object String]"};b.isNumber=function(a){return l.call(a)=="[object Number]"};b.isFinite=function(a){return b.isNumber(a)&&isFinite(a)};b.isNaN=function(a){return a!==a};b.isBoolean=function(a){return a===true||a===false||l.call(a)=="[object Boolean]"};b.isDate=function(a){return l.call(a)=="[object Date]"};b.isRegExp=function(a){return l.call(a)=="[object RegExp]"};b.isNull=function(a){return a===null};b.isUndefined=function(a){return a===void 0};b.has=function(a,
b){return K.call(a,b)};b.noConflict=function(){s._=I;return this};b.identity=function(a){return a};b.times=function(a,b,d){for(var e=0;e<a;e++)b.call(d,e)};b.escape=function(a){return(""+a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2F;")};b.result=function(a,c){if(a==null)return null;var d=a[c];return b.isFunction(d)?d.call(a):d};b.mixin=function(a){j(b.functions(a),function(c){M(c,b[c]=a[c])})};var N=0;b.uniqueId=
function(a){var b=N++;return a?a+b:b};b.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var u=/.^/,n={"\\":"\\","'":"'",r:"\r",n:"\n",t:"\t",u2028:"\u2028",u2029:"\u2029"},v;for(v in n)n[n[v]]=v;var O=/\\|'|\r|\n|\t|\u2028|\u2029/g,P=/\\(\\|'|r|n|t|u2028|u2029)/g,w=function(a){return a.replace(P,function(a,b){return n[b]})};b.template=function(a,c,d){d=b.defaults(d||{},b.templateSettings);a="__p+='"+a.replace(O,function(a){return"\\"+n[a]}).replace(d.escape||
u,function(a,b){return"'+\n_.escape("+w(b)+")+\n'"}).replace(d.interpolate||u,function(a,b){return"'+\n("+w(b)+")+\n'"}).replace(d.evaluate||u,function(a,b){return"';\n"+w(b)+"\n;__p+='"})+"';\n";d.variable||(a="with(obj||{}){\n"+a+"}\n");var a="var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};\n"+a+"return __p;\n",e=new Function(d.variable||"obj","_",a);if(c)return e(c,b);c=function(a){return e.call(this,a,b)};c.source="function("+(d.variable||"obj")+"){\n"+a+"}";return c};
b.chain=function(a){return b(a).chain()};var m=function(a){this._wrapped=a};b.prototype=m.prototype;var x=function(a,c){return c?b(a).chain():a},M=function(a,c){m.prototype[a]=function(){var a=i.call(arguments);J.call(a,this._wrapped);return x(c.apply(b,a),this._chain)}};b.mixin(b);j("pop,push,reverse,shift,sort,splice,unshift".split(","),function(a){var b=k[a];m.prototype[a]=function(){var d=this._wrapped;b.apply(d,arguments);var e=d.length;(a=="shift"||a=="splice")&&e===0&&delete d[0];return x(d,
this._chain)}});j(["concat","join","slice"],function(a){var b=k[a];m.prototype[a]=function(){return x(b.apply(this._wrapped,arguments),this._chain)}});m.prototype.chain=function(){this._chain=true;return this};m.prototype.value=function(){return this._wrapped}}).call(this);
/* 
Script: Namespace.js
	Namespace utility

Copyright:
	Copyright (c) 2009 Maxime Bouroumeau-Fuseau

License:
	MIT-style license.
	
Version:
	1.1
*/
var Namespace = (function() {

	var _listeners = {};
	var _includedIdentifiers = [];
	
	/**
	 * Returns an object in an array unless the object is an array
	 *
	 * @param	mixed	obj
	 * @return	Array
	 */
	var _toArray = function(obj) {
		// checks if it's an array
		if (typeof(obj) == 'object' && obj.sort) {
			return obj;
		}
		return new Array(obj);
	};
	
	/**
	 * Creates an XMLHttpRequest object
	 *
	 * @return XMLHttpRequest
	 */
	var _createXmlHttpRequest = function() {
		var xhr;
		try { xhr = new XMLHttpRequest() } catch(e) {
			try { xhr = new ActiveXObject("Msxml2.XMLHTTP.6.0") } catch(e) {
				try { xhr = new ActiveXObject("Msxml2.XMLHTTP.3.0") } catch(e) {
					try { xhr = new ActiveXObject("Msxml2.XMLHTTP") } catch(e) {
						try { xhr = new ActiveXObject("Microsoft.XMLHTTP") } catch(e) {
							throw new Error( "This browser does not support XMLHttpRequest." )
						}
					}
				}
			}
		}
		return xhr;
	};
	
	/**
	 * Checks if an http request is successful based on its status code.
	 * Borrowed from dojo (http://www.dojotoolkit.org).
	 *
	 * @param	Integer	status 	Http status code
	 * @return	Boolean
	 */
	var _isHttpRequestSuccessful = function(status) {
		return (status >= 200 && status < 300) || 	// Boolean
				status == 304 || 						// allow any 2XX response code
				status == 1223 || 						// get it out of the cache
				(!status && (location.protocol == "file:" || location.protocol == "chrome:") ); // Internet Explorer mangled the status code
	};
	
	/**
	 * Creates a script tag with the specified data as content
	 *
	 * @param	String	data	The content of the script
	 */
	var _createScript = function(data) {
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.text = data;
		document.body.appendChild(script);
	};
	
	/**
	 * Dispatches an event
	 *
	 * @param	String	eventName
	 * @param	Object	properties
	 */
	var _dispatchEvent = function(eventName, properties) {
		if (!_listeners[eventName]) return;
		properties.event = eventName;
		for (var i = 0; i < _listeners[eventName].length; i++) {
			_listeners[eventName][i](properties);
		}
	};
	
	/**
	 * Creates an Object following the specified namespace identifier.
	 *
	 * @public
	 * @param 	String	identifier	The namespace string
	 * @param	Object	klasses		(OPTIONAL) An object which properties will be added to the namespace
	 * @return	Object				The most inner object
	 */
	var _namespace = function(identifier) {
		var klasses = arguments[1] || false;
		var ns = window;
		
		if (identifier != '') {
			var parts = identifier.split(Namespace.separator);
			for (var i = 0; i < parts.length; i++) {
				if (!ns[parts[i]]) {
					ns[parts[i]] = {};
				}
				ns = ns[parts[i]];
			}
		}
		
		if (klasses) {
			for (var klass in klasses) {
				ns[klass] = klasses[klass];
			}
		}
		
		_dispatchEvent('create', { 'identifier': identifier });
		return ns;
	};
	
	/**
	 * Checks if the specified identifier is defined
	 *
	 * @public
	 * @param 	String	identifier	The namespace string
	 * @return	Boolean
	 */
	_namespace.exist = function(identifier) {
		if (identifier == '') return true;
		
		var parts = identifier.split(Namespace.separator);
		var ns = window;
		for (var i = 0; i < parts.length; i++) {
			if (!ns[parts[i]]) {
				return false;
			}
			ns = ns[parts[i]];
		}
		
		return true;
	};
	
	/**
	 * Maps an identifier to a uri. Is public so it can be overriden by custom scripts.
	 *
	 * @public
	 * @param	String	identifier 	The namespace identifier
	 * @return	String				The uri
	 */
	_namespace.mapIdentifierToUri = function(identifier) {
		var regexp = new RegExp('\\' + Namespace.separator, 'g');
		return Namespace.baseUri + identifier.replace(regexp, '/') + '.js';
	};
	
	/**
	 * Loads a remote script atfer mapping the identifier to an uri
	 *
	 * @param	String		identifier			The namespace identifier
	 * @param	Function	successCallback		When set, the file will be loaded asynchronously. Will be called when the file is loaded
	 * @param	Function	errorCallback		Callback to be called when an error occurs
	 * @return	Boolean							Success of failure when loading synchronously
	 */
	_loadScript = function(identifier) {
		var successCallback = arguments[1] || false;
		var errorCallback = arguments[2] || false;
		var async = successCallback != false;
		var uri = _namespace.mapIdentifierToUri(identifier);
		var event = { 'identifier': identifier, 'uri': uri, 'async': async, 'callback': successCallback };
		
		var xhr = _createXmlHttpRequest();
		xhr.open("GET", uri, async);

		if (async) {
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					if (_isHttpRequestSuccessful(xhr.status || 0)) {
						_createScript(xhr.responseText);
						_dispatchEvent('include', event);
						successCallback();
						return;
					}
					event.status = xhr.status;
					_dispatchEvent('includeError', event);
					errorCallback && errorCallback();
				}
			};
		}
		
		xhr.send(null);
		
		if (!async) {
			if (_isHttpRequestSuccessful(xhr.status || 0)) {
				_createScript(xhr.responseText);
				_dispatchEvent('include', event);
				return true;
			}
			event.status = xhr.status;
			_dispatchEvent('includeError', event);
			return false;
		}
	};
	
	/**
	 * Includes a remote javascript file identified by the specified namespace string. The identifier
	 * must point to a class. Separators in the string will be converted to slashes and the .js extension will be appended.
	 *
	 * @public
	 * @param	String		identifier	The namespace string
	 * @param	Function	callback	(OPTIONAL) A function to call when the remote script has been included
	 */
	_namespace.include = function(identifier) {
		var successCallback = arguments[1] || false;
		var errorCallback = arguments[2] || false;
		
		// checks if the identifier is not already included
		if (_includedIdentifiers[identifier]) {
			successCallback && successCallback();
			return true;
		}
		
		if (successCallback) {
			_loadScript(identifier, function() {
				_includedIdentifiers[identifier] = true;
				successCallback();
			}, errorCallback);
		} else {
			if (_loadScript(identifier)) {
				_includedIdentifiers[identifier] = true;
				return true;
			}
			return false;
		}
	};
	
	/**
	 * Imports properties from the specified namespace to the global space (ie. under window)
	 *
	 * The identifier string can contain the * wildcard character as its last segment (eg: com.test.*) 
	 * which will import all properties from the namespace.
	 * 
	 * If not, the targeted namespace will be imported (ie. if com.test is imported, the test object 
	 * will now be global). If the targeted object is not found, it will be included using include().
	 *
	 * @public
	 * @param	String		identifier 	The namespace string
	 * @param	Function	callback	(OPTIONAL) A function to call when the process is completed (including the include() if used)
	 * @param	Boolean		autoInclude	(OPTIONAL) Whether to automatically auto include the targeted object is not found. Default is Namespace.autoInclude
	 */
	_namespace.use = function(identifier) {
		var identifiers 		= _toArray(identifier);
		var callback 			= arguments[1] || false;
		var autoInclude 		= arguments.length > 2 ? arguments[2] : Namespace.autoInclude;
		var event				= { 'identifier': identifier };
		
		for (var i = 0; i < identifiers.length; i++) {
			identifier = identifiers[i];
		
			var parts = identifier.split(Namespace.separator);
			var target = parts.pop();
			var ns = _namespace(parts.join(Namespace.separator));
		
			if (target == '*') {
				// imports all objects from the identifier, can't use include() in that case
				for (var objectName in ns) {
					window[objectName] = ns[objectName];
				}
			} else {
				// imports only one object
				if (ns[target]) {
					// the object exists, import it
					window[target] = ns[target];
				} else {
					// the object does not exist
					if (autoInclude) {
						// try to auto include it
						if (callback) {
							_namespace.include(identifier, function() {
								window[target] = ns[target];
							
								if (i + 1 < identifiers.length) {
									// we continue to unpack the rest from here
									_namespace.unpack(identifiers.slice(i + 1), callback, autoInclude);
								} else {
									// no more identifiers to unpack
									_dispatchEvent('use', event);
									callback && callback();
								}
							});
							return;
						} else {
							_namespace.include(identifier);
							window[target] = ns[target];
						}
					}
				}
			}
		
		}
		
		// all identifiers have been unpacked
		_dispatchEvent('use', event);
		callback && callback();
	};
	
	/**
	 * Binds the include() and unpack() method to a specified identifier
	 *
	 * @public
	 * @param	String	identifier 	The namespace identifier
	 * @return	Object
	 */
	_namespace.from = function(identifier) {
		return {
			/**
			 * Includes the identifier specified in from()
			 *
			 * @see Namespace.include()
			 */
			include: function() {
				var callback = arguments[0] || false;
				_namespace.include(identifier, callback);
			},
			/**
			 * Includes the identifier specified in from() and unpack
			 * the specified indentifier in _identifier
			 *
			 * @see Namespace.use()
			 */
			use: function(_identifier) {
				var callback = arguments[1] || false;
				if (_identifier.charAt(0) == '.') {
					_identifier = identifier + _identifier;
				}
				
				if (callback) {
					_namespace.include(identifier, function() {
						_namespace.use(_identifier, callback, false);
					});
				} else {
					_namespace.include(identifier);
					_namespace.use(_identifier, callback, false);
				}
			}
		};
	};
	
	/**
	 * Registers a namespace so it won't be included
	 *
	 * Idea and code submitted by Nathan Smith (http://github.com/smith)
	 *
	 * @param	String|Array	identifier
	 */
	_namespace.provide = function(identifier) {
		var identifiers = _toArray(identifier);
		
		for (var i = 0; i < identifiers.length; i++) {
			if (!(identifier in _includedIdentifiers)) {
				_dispatchEvent('provide', { 'identifier': identifier });
				_includedIdentifiers[identifier] = true;
			}
		}
	};
	
	/**
	 * Registers a function to be called when the specified event is dispatched
	 *
	 * @param	String		eventName
	 * @param	Function	callback
	 */
	_namespace.addEventListener = function(eventName, callback) {
		if (!_listeners[eventName]) _listeners[eventName] = [];
		_listeners[eventName].push(callback);
	};
	
	/**
	 * Unregisters an event listener
	 *
	 * @param	String		eventName
	 * @param	Function	callback
	 */
	_namespace.removeEventListener = function(eventName, callback) {
		if (!_listeners[eventName]) return;
		for (var i = 0; i < _listeners[eventName].length; i++) {
			if (_listeners[eventName][i] == callback) {
				delete _listeners[eventName][i];
				return;
			}
		}
	};
	
	/**
	 * Adds methods to javascript native's object
	 * Inspired by http://thinkweb2.com/projects/prototype/namespacing-made-easy/
	 *
	 * @public
	 */
	_namespace.registerNativeExtensions = function() {
		/**
		 * @see Namespace()
		 */
		String.prototype.namespace = function() {
			var klasses = arguments[0] || {};
			return _namespace(this.valueOf(), klasses); 
		};
		/**
		 * @see Namespace.include()
		 */
		String.prototype.include = function() {
			var callback = arguments[0] || false;
			return _namespace.include(this.valueOf(), callback);
		}
		/**
		 * @see Namespace.use()
		 */
		String.prototype.use = function() {
			var callback = arguments[0] || false;
			return _namespace.use(this.valueOf(), callback);
		}
		/**
		 * @see Namespace.from()
		 */
		String.prototype.from = function() {
			return _namespace.from(this.valueOf());
		}
		/**
		 * @see Namespace.provide()
		 * Idea and code submitted by Nathan Smith (http://github.com/smith)
		 */
		String.prototype.provide = function() {
			return _namespace.provide(this.valueOf());
		}
		/**
		 * @see Namespace.use()
		 */
		Array.prototype.use = function() {
			var callback = arguments[0] || false;
			return _namespace.use(this, callback);
		}
		/**
		 * @see Namespace.provide()
		 */
		Array.prototype.provide = function() {
			return _namespace.provide(this);
		}
	};

	return _namespace;
})();

/**
 * Namespace segment separator
 *
 * @var String
 */
Namespace.separator = '.';

/**
 * Base uri when using Namespace.include()
 * Must end with a slash
 *
 * @var String
 */
Namespace.baseUri = './';

/**
 * Whether to automatically call Namespace.include() when Namespace.import() 
 * does not find the targeted object.
 *
 * @var Boolean
 */
Namespace.autoInclude = true;
	
/**
 * @fileOverview
 * @suppress {checkTypes|checkVars|globalThis|missingProperties}
 */
/**
 * @function
 * @suppress {checkTypes|checkVars|globalThis|missingProperties}
 */
var Mustache = function() {
  var Renderer = function() {};

  Renderer.prototype = {
    otag: "{{",
    ctag: "}}",
    pragmas: {},
    buffer: [],
    pragmas_implemented: {
      "IMPLICIT-ITERATOR": true
    },
    context: {},

    render: function(template, context, partials, in_recursion) {
      // reset buffer & set context
      if(!in_recursion) {
        this.context = context;
        this.buffer = []; // TODO: make this non-lazy
      }

      // fail fast
      if(!this.includes("", template)) {
        if(in_recursion) {
          return template;
        } else {
          this.send(template);
          return;
        }
      }

      template = this.render_pragmas(template);
      var html = this.render_section(template, context, partials);
      if(in_recursion) {
        return this.render_tags(html, context, partials, in_recursion);
      }

      this.render_tags(html, context, partials, in_recursion);
    },

    /*
      Sends parsed lines
    */
    send: function(line) {
      if(line != "") {
        this.buffer.push(line);
      }
    },

    /*
      Looks for %PRAGMAS
    */
    render_pragmas: function(template) {
      // no pragmas
      if(!this.includes("%", template)) {
        return template;
      }

      var that = this;
      var regex = new RegExp(this.otag + "%([\\w-]+) ?([\\w]+=[\\w]+)?" +
            this.ctag);
      return template.replace(regex, function(match, pragma, options) {
        if(!that.pragmas_implemented[pragma]) {
          throw({message: 
            "This implementation of mustache doesn't understand the '" +
            pragma + "' pragma"});
        }
        that.pragmas[pragma] = {};
        if(options) {
          var opts = options.split("=");
          that.pragmas[pragma][opts[0]] = opts[1];
        }
        return "";
        // ignore unknown pragmas silently
      });
    },

    /*
      Tries to find a partial in the curent scope and render it
    */
    render_partial: function(name, context, partials) {
      name = this.trim(name);
      if(!partials || partials[name] === undefined) {
        throw({message: "unknown_partial '" + name + "'"});
      }
      if(typeof(context[name]) != "object") {
        return this.render(partials[name], context, partials, true);
      }
      return this.render(partials[name], context[name], partials, true);
    },

    /*
      Renders inverted (^) and normal (#) sections
    */
    render_section: function(template, context, partials) {
      if(!this.includes("#", template) && !this.includes("^", template)) {
        return template;
      }

      var that = this;
      // CSW - Added "+?" so it finds the tighest bound, not the widest
      var regex = new RegExp(this.otag + "(\\^|\\#)\\s*(.+)\\s*" + this.ctag +
              "\n*([\\s\\S]+?)" + this.otag + "\\/\\s*\\2\\s*" + this.ctag +
              "\\s*", "mg");

      // for each {{#foo}}{{/foo}} section do...
      return template.replace(regex, function(match, type, name, content) {
        var value = that.find(name, context);
        if(type == "^") { // inverted section
          if(!value || that.is_array(value) && value.length === 0) {
            // false or empty list, render it
            return that.render(content, context, partials, true);
          } else {
            return "";
          }
        } else if(type == "#") { // normal section
          if(that.is_array(value)) { // Enumerable, Let's loop!
            return that.map(value, function(row) {
              return that.render(content, that.create_context(row),
                partials, true);
            }).join("");
          } else if(that.is_object(value)) { // Object, Use it as subcontext!
            return that.render(content, that.create_context(value),
              partials, true);
          } else if(typeof value === "function") {
            // higher order section
            return value.call(context, content, function(text) {
              return that.render(text, context, partials, true);
            });
          } else if(value) { // boolean section
            return that.render(content, context, partials, true);
          } else {
            return "";
          }
        }
      });
    },

    /*
      Replace {{foo}} and friends with values from our view
    */
    render_tags: function(template, context, partials, in_recursion) {
      // tit for tat
      var that = this;

      var new_regex = function() {
        return new RegExp(that.otag + "(=|!|>|\\{|%)?([^\\/#\\^]+?)\\1?" +
          that.ctag + "+", "g");
      };

      var regex = new_regex();
      var tag_replace_callback = function(match, operator, name) {
        switch(operator) {
        case "!": // ignore comments
          return "";
        case "=": // set new delimiters, rebuild the replace regexp
          that.set_delimiters(name);
          regex = new_regex();
          return "";
        case ">": // render partial
          return that.render_partial(name, context, partials);
        case "{": // the triple mustache is unescaped
          return that.find(name, context);
        default: // escape the value
          return that.escape(that.find(name, context));
        }
      };
      var lines = template.split("\n");
      for(var i = 0; i < lines.length; i++) {
        lines[i] = lines[i].replace(regex, tag_replace_callback, this);
        if(!in_recursion) {
          this.send(lines[i]);
        }
      }

      if(in_recursion) {
        return lines.join("\n");
      }
    },

    set_delimiters: function(delimiters) {
      var dels = delimiters.split(" ");
      this.otag = this.escape_regex(dels[0]);
      this.ctag = this.escape_regex(dels[1]);
    },

    escape_regex: function(text) {
      // thank you Simon Willison
      if(!arguments.callee.sRE) {
        var specials = [
          '/', '.', '*', '+', '?', '|',
          '(', ')', '[', ']', '{', '}', '\\'
        ];
        arguments.callee.sRE = new RegExp(
          '(\\' + specials.join('|\\') + ')', 'g'
        );
      }
      return text.replace(arguments.callee.sRE, '\\$1');
    },

    /*
      find `name` in current `context`. That is find me a value
      from the view object
    */
    find: function(name, context) {
      name = this.trim(name);

      // Checks whether a value is thruthy or false or 0
      function is_kinda_truthy(bool) {
        return bool === false || bool === 0 || bool;
      }

      var value;
      if(is_kinda_truthy(context[name])) {
        value = context[name];
      } else if(is_kinda_truthy(this.context[name])) {
        value = this.context[name];
      }

      if(typeof value === "function") {
        return value.apply(context);
      }
      if(value !== undefined) {
        return value;
      }
      // silently ignore unkown variables
      return "";
    },

    // Utility methods

    /* includes tag */
    includes: function(needle, haystack) {
      return haystack.indexOf(this.otag + needle) != -1;
    },

    /*
      Does away with nasty characters
    */
    escape: function(s) {
      s = String(s === null ? "" : s);
      return s.replace(/&(?!\w+;)|["'<>\\]/g, function(s) {
        switch(s) {
        case "&": return "&amp;";
        case "\\": return "\\\\";
        case '"': return '&quot;';
        case "'": return '&#39;';
        case "<": return "&lt;";
        case ">": return "&gt;";
        default: return s;
        }
      });
    },

    // by @langalex, support for arrays of strings
    create_context: function(_context) {
      if(this.is_object(_context)) {
        return _context;
      } else {
        var iterator = ".";
        if(this.pragmas["IMPLICIT-ITERATOR"]) {
          iterator = this.pragmas["IMPLICIT-ITERATOR"].iterator;
        }
        var ctx = {};
        ctx[iterator] = _context;
        return ctx;
      }
    },

    is_object: function(a) {
      return a && typeof a == "object";
    },

    is_array: function(a) {
      return Object.prototype.toString.call(a) === '[object Array]';
    },

    /*
      Gets rid of leading and trailing whitespace
    */
    trim: function(s) {
      return s.replace(/^\s*|\s*$/g, "");
    },

    /*
      Why, why, why? Because IE. Cry, cry cry.
    */
    map: function(array, fn) {
      if (typeof array.map == "function") {
        return array.map(fn);
      } else {
        var r = [];
        var l = array.length;
        for(var i = 0; i < l; i++) {
          r.push(fn(array[i]));
        }
        return r;
      }
    }
  };

  return({
    name: "mustache.js",
    version: "0.3.1-dev",

    /*
      Turns a template and view into HTML
    */
    to_html: function(template, view, partials, send_fun) {
      var renderer = new Renderer();
      if(send_fun) {
        renderer.send = send_fun;
      }
      renderer.render(template, view, partials);
      if(!send_fun) {
        return renderer.buffer.join("\n");
      }
    }
  });
}();
/*!
 * jQuery JavaScript Library v1.4.4
 * http://jquery.com/
 *
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2010, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Thu Nov 11 19:04:53 2010 -0500
 */
(function(E,B){function ka(a,b,d){if(d===B&&a.nodeType===1){d=a.getAttribute("data-"+b);if(typeof d==="string"){try{d=d==="true"?true:d==="false"?false:d==="null"?null:!c.isNaN(d)?parseFloat(d):Ja.test(d)?c.parseJSON(d):d}catch(e){}c.data(a,b,d)}else d=B}return d}function U(){return false}function ca(){return true}function la(a,b,d){d[0].type=a;return c.event.handle.apply(b,d)}function Ka(a){var b,d,e,f,h,l,k,o,x,r,A,C=[];f=[];h=c.data(this,this.nodeType?"events":"__events__");if(typeof h==="function")h=
h.events;if(!(a.liveFired===this||!h||!h.live||a.button&&a.type==="click")){if(a.namespace)A=RegExp("(^|\\.)"+a.namespace.split(".").join("\\.(?:.*\\.)?")+"(\\.|$)");a.liveFired=this;var J=h.live.slice(0);for(k=0;k<J.length;k++){h=J[k];h.origType.replace(X,"")===a.type?f.push(h.selector):J.splice(k--,1)}f=c(a.target).closest(f,a.currentTarget);o=0;for(x=f.length;o<x;o++){r=f[o];for(k=0;k<J.length;k++){h=J[k];if(r.selector===h.selector&&(!A||A.test(h.namespace))){l=r.elem;e=null;if(h.preType==="mouseenter"||
h.preType==="mouseleave"){a.type=h.preType;e=c(a.relatedTarget).closest(h.selector)[0]}if(!e||e!==l)C.push({elem:l,handleObj:h,level:r.level})}}}o=0;for(x=C.length;o<x;o++){f=C[o];if(d&&f.level>d)break;a.currentTarget=f.elem;a.data=f.handleObj.data;a.handleObj=f.handleObj;A=f.handleObj.origHandler.apply(f.elem,arguments);if(A===false||a.isPropagationStopped()){d=f.level;if(A===false)b=false;if(a.isImmediatePropagationStopped())break}}return b}}function Y(a,b){return(a&&a!=="*"?a+".":"")+b.replace(La,
"`").replace(Ma,"&")}function ma(a,b,d){if(c.isFunction(b))return c.grep(a,function(f,h){return!!b.call(f,h,f)===d});else if(b.nodeType)return c.grep(a,function(f){return f===b===d});else if(typeof b==="string"){var e=c.grep(a,function(f){return f.nodeType===1});if(Na.test(b))return c.filter(b,e,!d);else b=c.filter(b,e)}return c.grep(a,function(f){return c.inArray(f,b)>=0===d})}function na(a,b){var d=0;b.each(function(){if(this.nodeName===(a[d]&&a[d].nodeName)){var e=c.data(a[d++]),f=c.data(this,
e);if(e=e&&e.events){delete f.handle;f.events={};for(var h in e)for(var l in e[h])c.event.add(this,h,e[h][l],e[h][l].data)}}})}function Oa(a,b){b.src?c.ajax({url:b.src,async:false,dataType:"script"}):c.globalEval(b.text||b.textContent||b.innerHTML||"");b.parentNode&&b.parentNode.removeChild(b)}function oa(a,b,d){var e=b==="width"?a.offsetWidth:a.offsetHeight;if(d==="border")return e;c.each(b==="width"?Pa:Qa,function(){d||(e-=parseFloat(c.css(a,"padding"+this))||0);if(d==="margin")e+=parseFloat(c.css(a,
"margin"+this))||0;else e-=parseFloat(c.css(a,"border"+this+"Width"))||0});return e}function da(a,b,d,e){if(c.isArray(b)&&b.length)c.each(b,function(f,h){d||Ra.test(a)?e(a,h):da(a+"["+(typeof h==="object"||c.isArray(h)?f:"")+"]",h,d,e)});else if(!d&&b!=null&&typeof b==="object")c.isEmptyObject(b)?e(a,""):c.each(b,function(f,h){da(a+"["+f+"]",h,d,e)});else e(a,b)}function S(a,b){var d={};c.each(pa.concat.apply([],pa.slice(0,b)),function(){d[this]=a});return d}function qa(a){if(!ea[a]){var b=c("<"+
a+">").appendTo("body"),d=b.css("display");b.remove();if(d==="none"||d==="")d="block";ea[a]=d}return ea[a]}function fa(a){return c.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:false}var t=E.document,c=function(){function a(){if(!b.isReady){try{t.documentElement.doScroll("left")}catch(j){setTimeout(a,1);return}b.ready()}}var b=function(j,s){return new b.fn.init(j,s)},d=E.jQuery,e=E.$,f,h=/^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]+)$)/,l=/\S/,k=/^\s+/,o=/\s+$/,x=/\W/,r=/\d/,A=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,
C=/^[\],:{}\s]*$/,J=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,w=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,I=/(?:^|:|,)(?:\s*\[)+/g,L=/(webkit)[ \/]([\w.]+)/,g=/(opera)(?:.*version)?[ \/]([\w.]+)/,i=/(msie) ([\w.]+)/,n=/(mozilla)(?:.*? rv:([\w.]+))?/,m=navigator.userAgent,p=false,q=[],u,y=Object.prototype.toString,F=Object.prototype.hasOwnProperty,M=Array.prototype.push,N=Array.prototype.slice,O=String.prototype.trim,D=Array.prototype.indexOf,R={};b.fn=b.prototype={init:function(j,
s){var v,z,H;if(!j)return this;if(j.nodeType){this.context=this[0]=j;this.length=1;return this}if(j==="body"&&!s&&t.body){this.context=t;this[0]=t.body;this.selector="body";this.length=1;return this}if(typeof j==="string")if((v=h.exec(j))&&(v[1]||!s))if(v[1]){H=s?s.ownerDocument||s:t;if(z=A.exec(j))if(b.isPlainObject(s)){j=[t.createElement(z[1])];b.fn.attr.call(j,s,true)}else j=[H.createElement(z[1])];else{z=b.buildFragment([v[1]],[H]);j=(z.cacheable?z.fragment.cloneNode(true):z.fragment).childNodes}return b.merge(this,
j)}else{if((z=t.getElementById(v[2]))&&z.parentNode){if(z.id!==v[2])return f.find(j);this.length=1;this[0]=z}this.context=t;this.selector=j;return this}else if(!s&&!x.test(j)){this.selector=j;this.context=t;j=t.getElementsByTagName(j);return b.merge(this,j)}else return!s||s.jquery?(s||f).find(j):b(s).find(j);else if(b.isFunction(j))return f.ready(j);if(j.selector!==B){this.selector=j.selector;this.context=j.context}return b.makeArray(j,this)},selector:"",jquery:"1.4.4",length:0,size:function(){return this.length},
toArray:function(){return N.call(this,0)},get:function(j){return j==null?this.toArray():j<0?this.slice(j)[0]:this[j]},pushStack:function(j,s,v){var z=b();b.isArray(j)?M.apply(z,j):b.merge(z,j);z.prevObject=this;z.context=this.context;if(s==="find")z.selector=this.selector+(this.selector?" ":"")+v;else if(s)z.selector=this.selector+"."+s+"("+v+")";return z},each:function(j,s){return b.each(this,j,s)},ready:function(j){b.bindReady();if(b.isReady)j.call(t,b);else q&&q.push(j);return this},eq:function(j){return j===
-1?this.slice(j):this.slice(j,+j+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(N.apply(this,arguments),"slice",N.call(arguments).join(","))},map:function(j){return this.pushStack(b.map(this,function(s,v){return j.call(s,v,s)}))},end:function(){return this.prevObject||b(null)},push:M,sort:[].sort,splice:[].splice};b.fn.init.prototype=b.fn;b.extend=b.fn.extend=function(){var j,s,v,z,H,G=arguments[0]||{},K=1,Q=arguments.length,ga=false;
if(typeof G==="boolean"){ga=G;G=arguments[1]||{};K=2}if(typeof G!=="object"&&!b.isFunction(G))G={};if(Q===K){G=this;--K}for(;K<Q;K++)if((j=arguments[K])!=null)for(s in j){v=G[s];z=j[s];if(G!==z)if(ga&&z&&(b.isPlainObject(z)||(H=b.isArray(z)))){if(H){H=false;v=v&&b.isArray(v)?v:[]}else v=v&&b.isPlainObject(v)?v:{};G[s]=b.extend(ga,v,z)}else if(z!==B)G[s]=z}return G};b.extend({noConflict:function(j){E.$=e;if(j)E.jQuery=d;return b},isReady:false,readyWait:1,ready:function(j){j===true&&b.readyWait--;
if(!b.readyWait||j!==true&&!b.isReady){if(!t.body)return setTimeout(b.ready,1);b.isReady=true;if(!(j!==true&&--b.readyWait>0))if(q){var s=0,v=q;for(q=null;j=v[s++];)j.call(t,b);b.fn.trigger&&b(t).trigger("ready").unbind("ready")}}},bindReady:function(){if(!p){p=true;if(t.readyState==="complete")return setTimeout(b.ready,1);if(t.addEventListener){t.addEventListener("DOMContentLoaded",u,false);E.addEventListener("load",b.ready,false)}else if(t.attachEvent){t.attachEvent("onreadystatechange",u);E.attachEvent("onload",
b.ready);var j=false;try{j=E.frameElement==null}catch(s){}t.documentElement.doScroll&&j&&a()}}},isFunction:function(j){return b.type(j)==="function"},isArray:Array.isArray||function(j){return b.type(j)==="array"},isWindow:function(j){return j&&typeof j==="object"&&"setInterval"in j},isNaN:function(j){return j==null||!r.test(j)||isNaN(j)},type:function(j){return j==null?String(j):R[y.call(j)]||"object"},isPlainObject:function(j){if(!j||b.type(j)!=="object"||j.nodeType||b.isWindow(j))return false;if(j.constructor&&
!F.call(j,"constructor")&&!F.call(j.constructor.prototype,"isPrototypeOf"))return false;for(var s in j);return s===B||F.call(j,s)},isEmptyObject:function(j){for(var s in j)return false;return true},error:function(j){throw j;},parseJSON:function(j){if(typeof j!=="string"||!j)return null;j=b.trim(j);if(C.test(j.replace(J,"@").replace(w,"]").replace(I,"")))return E.JSON&&E.JSON.parse?E.JSON.parse(j):(new Function("return "+j))();else b.error("Invalid JSON: "+j)},noop:function(){},globalEval:function(j){if(j&&
l.test(j)){var s=t.getElementsByTagName("head")[0]||t.documentElement,v=t.createElement("script");v.type="text/javascript";if(b.support.scriptEval)v.appendChild(t.createTextNode(j));else v.text=j;s.insertBefore(v,s.firstChild);s.removeChild(v)}},nodeName:function(j,s){return j.nodeName&&j.nodeName.toUpperCase()===s.toUpperCase()},each:function(j,s,v){var z,H=0,G=j.length,K=G===B||b.isFunction(j);if(v)if(K)for(z in j){if(s.apply(j[z],v)===false)break}else for(;H<G;){if(s.apply(j[H++],v)===false)break}else if(K)for(z in j){if(s.call(j[z],
z,j[z])===false)break}else for(v=j[0];H<G&&s.call(v,H,v)!==false;v=j[++H]);return j},trim:O?function(j){return j==null?"":O.call(j)}:function(j){return j==null?"":j.toString().replace(k,"").replace(o,"")},makeArray:function(j,s){var v=s||[];if(j!=null){var z=b.type(j);j.length==null||z==="string"||z==="function"||z==="regexp"||b.isWindow(j)?M.call(v,j):b.merge(v,j)}return v},inArray:function(j,s){if(s.indexOf)return s.indexOf(j);for(var v=0,z=s.length;v<z;v++)if(s[v]===j)return v;return-1},merge:function(j,
s){var v=j.length,z=0;if(typeof s.length==="number")for(var H=s.length;z<H;z++)j[v++]=s[z];else for(;s[z]!==B;)j[v++]=s[z++];j.length=v;return j},grep:function(j,s,v){var z=[],H;v=!!v;for(var G=0,K=j.length;G<K;G++){H=!!s(j[G],G);v!==H&&z.push(j[G])}return z},map:function(j,s,v){for(var z=[],H,G=0,K=j.length;G<K;G++){H=s(j[G],G,v);if(H!=null)z[z.length]=H}return z.concat.apply([],z)},guid:1,proxy:function(j,s,v){if(arguments.length===2)if(typeof s==="string"){v=j;j=v[s];s=B}else if(s&&!b.isFunction(s)){v=
s;s=B}if(!s&&j)s=function(){return j.apply(v||this,arguments)};if(j)s.guid=j.guid=j.guid||s.guid||b.guid++;return s},access:function(j,s,v,z,H,G){var K=j.length;if(typeof s==="object"){for(var Q in s)b.access(j,Q,s[Q],z,H,v);return j}if(v!==B){z=!G&&z&&b.isFunction(v);for(Q=0;Q<K;Q++)H(j[Q],s,z?v.call(j[Q],Q,H(j[Q],s)):v,G);return j}return K?H(j[0],s):B},now:function(){return(new Date).getTime()},uaMatch:function(j){j=j.toLowerCase();j=L.exec(j)||g.exec(j)||i.exec(j)||j.indexOf("compatible")<0&&n.exec(j)||
[];return{browser:j[1]||"",version:j[2]||"0"}},browser:{}});b.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(j,s){R["[object "+s+"]"]=s.toLowerCase()});m=b.uaMatch(m);if(m.browser){b.browser[m.browser]=true;b.browser.version=m.version}if(b.browser.webkit)b.browser.safari=true;if(D)b.inArray=function(j,s){return D.call(s,j)};if(!/\s/.test("\u00a0")){k=/^[\s\xA0]+/;o=/[\s\xA0]+$/}f=b(t);if(t.addEventListener)u=function(){t.removeEventListener("DOMContentLoaded",u,
false);b.ready()};else if(t.attachEvent)u=function(){if(t.readyState==="complete"){t.detachEvent("onreadystatechange",u);b.ready()}};return E.jQuery=E.$=b}();(function(){c.support={};var a=t.documentElement,b=t.createElement("script"),d=t.createElement("div"),e="script"+c.now();d.style.display="none";d.innerHTML="   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";var f=d.getElementsByTagName("*"),h=d.getElementsByTagName("a")[0],l=t.createElement("select"),
k=l.appendChild(t.createElement("option"));if(!(!f||!f.length||!h)){c.support={leadingWhitespace:d.firstChild.nodeType===3,tbody:!d.getElementsByTagName("tbody").length,htmlSerialize:!!d.getElementsByTagName("link").length,style:/red/.test(h.getAttribute("style")),hrefNormalized:h.getAttribute("href")==="/a",opacity:/^0.55$/.test(h.style.opacity),cssFloat:!!h.style.cssFloat,checkOn:d.getElementsByTagName("input")[0].value==="on",optSelected:k.selected,deleteExpando:true,optDisabled:false,checkClone:false,
scriptEval:false,noCloneEvent:true,boxModel:null,inlineBlockNeedsLayout:false,shrinkWrapBlocks:false,reliableHiddenOffsets:true};l.disabled=true;c.support.optDisabled=!k.disabled;b.type="text/javascript";try{b.appendChild(t.createTextNode("window."+e+"=1;"))}catch(o){}a.insertBefore(b,a.firstChild);if(E[e]){c.support.scriptEval=true;delete E[e]}try{delete b.test}catch(x){c.support.deleteExpando=false}a.removeChild(b);if(d.attachEvent&&d.fireEvent){d.attachEvent("onclick",function r(){c.support.noCloneEvent=
false;d.detachEvent("onclick",r)});d.cloneNode(true).fireEvent("onclick")}d=t.createElement("div");d.innerHTML="<input type='radio' name='radiotest' checked='checked'/>";a=t.createDocumentFragment();a.appendChild(d.firstChild);c.support.checkClone=a.cloneNode(true).cloneNode(true).lastChild.checked;c(function(){var r=t.createElement("div");r.style.width=r.style.paddingLeft="1px";t.body.appendChild(r);c.boxModel=c.support.boxModel=r.offsetWidth===2;if("zoom"in r.style){r.style.display="inline";r.style.zoom=
1;c.support.inlineBlockNeedsLayout=r.offsetWidth===2;r.style.display="";r.innerHTML="<div style='width:4px;'></div>";c.support.shrinkWrapBlocks=r.offsetWidth!==2}r.innerHTML="<table><tr><td style='padding:0;display:none'></td><td>t</td></tr></table>";var A=r.getElementsByTagName("td");c.support.reliableHiddenOffsets=A[0].offsetHeight===0;A[0].style.display="";A[1].style.display="none";c.support.reliableHiddenOffsets=c.support.reliableHiddenOffsets&&A[0].offsetHeight===0;r.innerHTML="";t.body.removeChild(r).style.display=
"none"});a=function(r){var A=t.createElement("div");r="on"+r;var C=r in A;if(!C){A.setAttribute(r,"return;");C=typeof A[r]==="function"}return C};c.support.submitBubbles=a("submit");c.support.changeBubbles=a("change");a=b=d=f=h=null}})();var ra={},Ja=/^(?:\{.*\}|\[.*\])$/;c.extend({cache:{},uuid:0,expando:"jQuery"+c.now(),noData:{embed:true,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:true},data:function(a,b,d){if(c.acceptData(a)){a=a==E?ra:a;var e=a.nodeType,f=e?a[c.expando]:null,h=
c.cache;if(!(e&&!f&&typeof b==="string"&&d===B)){if(e)f||(a[c.expando]=f=++c.uuid);else h=a;if(typeof b==="object")if(e)h[f]=c.extend(h[f],b);else c.extend(h,b);else if(e&&!h[f])h[f]={};a=e?h[f]:h;if(d!==B)a[b]=d;return typeof b==="string"?a[b]:a}}},removeData:function(a,b){if(c.acceptData(a)){a=a==E?ra:a;var d=a.nodeType,e=d?a[c.expando]:a,f=c.cache,h=d?f[e]:e;if(b){if(h){delete h[b];d&&c.isEmptyObject(h)&&c.removeData(a)}}else if(d&&c.support.deleteExpando)delete a[c.expando];else if(a.removeAttribute)a.removeAttribute(c.expando);
else if(d)delete f[e];else for(var l in a)delete a[l]}},acceptData:function(a){if(a.nodeName){var b=c.noData[a.nodeName.toLowerCase()];if(b)return!(b===true||a.getAttribute("classid")!==b)}return true}});c.fn.extend({data:function(a,b){var d=null;if(typeof a==="undefined"){if(this.length){var e=this[0].attributes,f;d=c.data(this[0]);for(var h=0,l=e.length;h<l;h++){f=e[h].name;if(f.indexOf("data-")===0){f=f.substr(5);ka(this[0],f,d[f])}}}return d}else if(typeof a==="object")return this.each(function(){c.data(this,
a)});var k=a.split(".");k[1]=k[1]?"."+k[1]:"";if(b===B){d=this.triggerHandler("getData"+k[1]+"!",[k[0]]);if(d===B&&this.length){d=c.data(this[0],a);d=ka(this[0],a,d)}return d===B&&k[1]?this.data(k[0]):d}else return this.each(function(){var o=c(this),x=[k[0],b];o.triggerHandler("setData"+k[1]+"!",x);c.data(this,a,b);o.triggerHandler("changeData"+k[1]+"!",x)})},removeData:function(a){return this.each(function(){c.removeData(this,a)})}});c.extend({queue:function(a,b,d){if(a){b=(b||"fx")+"queue";var e=
c.data(a,b);if(!d)return e||[];if(!e||c.isArray(d))e=c.data(a,b,c.makeArray(d));else e.push(d);return e}},dequeue:function(a,b){b=b||"fx";var d=c.queue(a,b),e=d.shift();if(e==="inprogress")e=d.shift();if(e){b==="fx"&&d.unshift("inprogress");e.call(a,function(){c.dequeue(a,b)})}}});c.fn.extend({queue:function(a,b){if(typeof a!=="string"){b=a;a="fx"}if(b===B)return c.queue(this[0],a);return this.each(function(){var d=c.queue(this,a,b);a==="fx"&&d[0]!=="inprogress"&&c.dequeue(this,a)})},dequeue:function(a){return this.each(function(){c.dequeue(this,
a)})},delay:function(a,b){a=c.fx?c.fx.speeds[a]||a:a;b=b||"fx";return this.queue(b,function(){var d=this;setTimeout(function(){c.dequeue(d,b)},a)})},clearQueue:function(a){return this.queue(a||"fx",[])}});var sa=/[\n\t]/g,ha=/\s+/,Sa=/\r/g,Ta=/^(?:href|src|style)$/,Ua=/^(?:button|input)$/i,Va=/^(?:button|input|object|select|textarea)$/i,Wa=/^a(?:rea)?$/i,ta=/^(?:radio|checkbox)$/i;c.props={"for":"htmlFor","class":"className",readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",
colspan:"colSpan",tabindex:"tabIndex",usemap:"useMap",frameborder:"frameBorder"};c.fn.extend({attr:function(a,b){return c.access(this,a,b,true,c.attr)},removeAttr:function(a){return this.each(function(){c.attr(this,a,"");this.nodeType===1&&this.removeAttribute(a)})},addClass:function(a){if(c.isFunction(a))return this.each(function(x){var r=c(this);r.addClass(a.call(this,x,r.attr("class")))});if(a&&typeof a==="string")for(var b=(a||"").split(ha),d=0,e=this.length;d<e;d++){var f=this[d];if(f.nodeType===
1)if(f.className){for(var h=" "+f.className+" ",l=f.className,k=0,o=b.length;k<o;k++)if(h.indexOf(" "+b[k]+" ")<0)l+=" "+b[k];f.className=c.trim(l)}else f.className=a}return this},removeClass:function(a){if(c.isFunction(a))return this.each(function(o){var x=c(this);x.removeClass(a.call(this,o,x.attr("class")))});if(a&&typeof a==="string"||a===B)for(var b=(a||"").split(ha),d=0,e=this.length;d<e;d++){var f=this[d];if(f.nodeType===1&&f.className)if(a){for(var h=(" "+f.className+" ").replace(sa," "),
l=0,k=b.length;l<k;l++)h=h.replace(" "+b[l]+" "," ");f.className=c.trim(h)}else f.className=""}return this},toggleClass:function(a,b){var d=typeof a,e=typeof b==="boolean";if(c.isFunction(a))return this.each(function(f){var h=c(this);h.toggleClass(a.call(this,f,h.attr("class"),b),b)});return this.each(function(){if(d==="string")for(var f,h=0,l=c(this),k=b,o=a.split(ha);f=o[h++];){k=e?k:!l.hasClass(f);l[k?"addClass":"removeClass"](f)}else if(d==="undefined"||d==="boolean"){this.className&&c.data(this,
"__className__",this.className);this.className=this.className||a===false?"":c.data(this,"__className__")||""}})},hasClass:function(a){a=" "+a+" ";for(var b=0,d=this.length;b<d;b++)if((" "+this[b].className+" ").replace(sa," ").indexOf(a)>-1)return true;return false},val:function(a){if(!arguments.length){var b=this[0];if(b){if(c.nodeName(b,"option")){var d=b.attributes.value;return!d||d.specified?b.value:b.text}if(c.nodeName(b,"select")){var e=b.selectedIndex;d=[];var f=b.options;b=b.type==="select-one";
if(e<0)return null;var h=b?e:0;for(e=b?e+1:f.length;h<e;h++){var l=f[h];if(l.selected&&(c.support.optDisabled?!l.disabled:l.getAttribute("disabled")===null)&&(!l.parentNode.disabled||!c.nodeName(l.parentNode,"optgroup"))){a=c(l).val();if(b)return a;d.push(a)}}return d}if(ta.test(b.type)&&!c.support.checkOn)return b.getAttribute("value")===null?"on":b.value;return(b.value||"").replace(Sa,"")}return B}var k=c.isFunction(a);return this.each(function(o){var x=c(this),r=a;if(this.nodeType===1){if(k)r=
a.call(this,o,x.val());if(r==null)r="";else if(typeof r==="number")r+="";else if(c.isArray(r))r=c.map(r,function(C){return C==null?"":C+""});if(c.isArray(r)&&ta.test(this.type))this.checked=c.inArray(x.val(),r)>=0;else if(c.nodeName(this,"select")){var A=c.makeArray(r);c("option",this).each(function(){this.selected=c.inArray(c(this).val(),A)>=0});if(!A.length)this.selectedIndex=-1}else this.value=r}})}});c.extend({attrFn:{val:true,css:true,html:true,text:true,data:true,width:true,height:true,offset:true},
attr:function(a,b,d,e){if(!a||a.nodeType===3||a.nodeType===8)return B;if(e&&b in c.attrFn)return c(a)[b](d);e=a.nodeType!==1||!c.isXMLDoc(a);var f=d!==B;b=e&&c.props[b]||b;var h=Ta.test(b);if((b in a||a[b]!==B)&&e&&!h){if(f){b==="type"&&Ua.test(a.nodeName)&&a.parentNode&&c.error("type property can't be changed");if(d===null)a.nodeType===1&&a.removeAttribute(b);else a[b]=d}if(c.nodeName(a,"form")&&a.getAttributeNode(b))return a.getAttributeNode(b).nodeValue;if(b==="tabIndex")return(b=a.getAttributeNode("tabIndex"))&&
b.specified?b.value:Va.test(a.nodeName)||Wa.test(a.nodeName)&&a.href?0:B;return a[b]}if(!c.support.style&&e&&b==="style"){if(f)a.style.cssText=""+d;return a.style.cssText}f&&a.setAttribute(b,""+d);if(!a.attributes[b]&&a.hasAttribute&&!a.hasAttribute(b))return B;a=!c.support.hrefNormalized&&e&&h?a.getAttribute(b,2):a.getAttribute(b);return a===null?B:a}});var X=/\.(.*)$/,ia=/^(?:textarea|input|select)$/i,La=/\./g,Ma=/ /g,Xa=/[^\w\s.|`]/g,Ya=function(a){return a.replace(Xa,"\\$&")},ua={focusin:0,focusout:0};
c.event={add:function(a,b,d,e){if(!(a.nodeType===3||a.nodeType===8)){if(c.isWindow(a)&&a!==E&&!a.frameElement)a=E;if(d===false)d=U;else if(!d)return;var f,h;if(d.handler){f=d;d=f.handler}if(!d.guid)d.guid=c.guid++;if(h=c.data(a)){var l=a.nodeType?"events":"__events__",k=h[l],o=h.handle;if(typeof k==="function"){o=k.handle;k=k.events}else if(!k){a.nodeType||(h[l]=h=function(){});h.events=k={}}if(!o)h.handle=o=function(){return typeof c!=="undefined"&&!c.event.triggered?c.event.handle.apply(o.elem,
arguments):B};o.elem=a;b=b.split(" ");for(var x=0,r;l=b[x++];){h=f?c.extend({},f):{handler:d,data:e};if(l.indexOf(".")>-1){r=l.split(".");l=r.shift();h.namespace=r.slice(0).sort().join(".")}else{r=[];h.namespace=""}h.type=l;if(!h.guid)h.guid=d.guid;var A=k[l],C=c.event.special[l]||{};if(!A){A=k[l]=[];if(!C.setup||C.setup.call(a,e,r,o)===false)if(a.addEventListener)a.addEventListener(l,o,false);else a.attachEvent&&a.attachEvent("on"+l,o)}if(C.add){C.add.call(a,h);if(!h.handler.guid)h.handler.guid=
d.guid}A.push(h);c.event.global[l]=true}a=null}}},global:{},remove:function(a,b,d,e){if(!(a.nodeType===3||a.nodeType===8)){if(d===false)d=U;var f,h,l=0,k,o,x,r,A,C,J=a.nodeType?"events":"__events__",w=c.data(a),I=w&&w[J];if(w&&I){if(typeof I==="function"){w=I;I=I.events}if(b&&b.type){d=b.handler;b=b.type}if(!b||typeof b==="string"&&b.charAt(0)==="."){b=b||"";for(f in I)c.event.remove(a,f+b)}else{for(b=b.split(" ");f=b[l++];){r=f;k=f.indexOf(".")<0;o=[];if(!k){o=f.split(".");f=o.shift();x=RegExp("(^|\\.)"+
c.map(o.slice(0).sort(),Ya).join("\\.(?:.*\\.)?")+"(\\.|$)")}if(A=I[f])if(d){r=c.event.special[f]||{};for(h=e||0;h<A.length;h++){C=A[h];if(d.guid===C.guid){if(k||x.test(C.namespace)){e==null&&A.splice(h--,1);r.remove&&r.remove.call(a,C)}if(e!=null)break}}if(A.length===0||e!=null&&A.length===1){if(!r.teardown||r.teardown.call(a,o)===false)c.removeEvent(a,f,w.handle);delete I[f]}}else for(h=0;h<A.length;h++){C=A[h];if(k||x.test(C.namespace)){c.event.remove(a,r,C.handler,h);A.splice(h--,1)}}}if(c.isEmptyObject(I)){if(b=
w.handle)b.elem=null;delete w.events;delete w.handle;if(typeof w==="function")c.removeData(a,J);else c.isEmptyObject(w)&&c.removeData(a)}}}}},trigger:function(a,b,d,e){var f=a.type||a;if(!e){a=typeof a==="object"?a[c.expando]?a:c.extend(c.Event(f),a):c.Event(f);if(f.indexOf("!")>=0){a.type=f=f.slice(0,-1);a.exclusive=true}if(!d){a.stopPropagation();c.event.global[f]&&c.each(c.cache,function(){this.events&&this.events[f]&&c.event.trigger(a,b,this.handle.elem)})}if(!d||d.nodeType===3||d.nodeType===
8)return B;a.result=B;a.target=d;b=c.makeArray(b);b.unshift(a)}a.currentTarget=d;(e=d.nodeType?c.data(d,"handle"):(c.data(d,"__events__")||{}).handle)&&e.apply(d,b);e=d.parentNode||d.ownerDocument;try{if(!(d&&d.nodeName&&c.noData[d.nodeName.toLowerCase()]))if(d["on"+f]&&d["on"+f].apply(d,b)===false){a.result=false;a.preventDefault()}}catch(h){}if(!a.isPropagationStopped()&&e)c.event.trigger(a,b,e,true);else if(!a.isDefaultPrevented()){var l;e=a.target;var k=f.replace(X,""),o=c.nodeName(e,"a")&&k===
"click",x=c.event.special[k]||{};if((!x._default||x._default.call(d,a)===false)&&!o&&!(e&&e.nodeName&&c.noData[e.nodeName.toLowerCase()])){try{if(e[k]){if(l=e["on"+k])e["on"+k]=null;c.event.triggered=true;e[k]()}}catch(r){}if(l)e["on"+k]=l;c.event.triggered=false}}},handle:function(a){var b,d,e,f;d=[];var h=c.makeArray(arguments);a=h[0]=c.event.fix(a||E.event);a.currentTarget=this;b=a.type.indexOf(".")<0&&!a.exclusive;if(!b){e=a.type.split(".");a.type=e.shift();d=e.slice(0).sort();e=RegExp("(^|\\.)"+
d.join("\\.(?:.*\\.)?")+"(\\.|$)")}a.namespace=a.namespace||d.join(".");f=c.data(this,this.nodeType?"events":"__events__");if(typeof f==="function")f=f.events;d=(f||{})[a.type];if(f&&d){d=d.slice(0);f=0;for(var l=d.length;f<l;f++){var k=d[f];if(b||e.test(k.namespace)){a.handler=k.handler;a.data=k.data;a.handleObj=k;k=k.handler.apply(this,h);if(k!==B){a.result=k;if(k===false){a.preventDefault();a.stopPropagation()}}if(a.isImmediatePropagationStopped())break}}}return a.result},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
fix:function(a){if(a[c.expando])return a;var b=a;a=c.Event(b);for(var d=this.props.length,e;d;){e=this.props[--d];a[e]=b[e]}if(!a.target)a.target=a.srcElement||t;if(a.target.nodeType===3)a.target=a.target.parentNode;if(!a.relatedTarget&&a.fromElement)a.relatedTarget=a.fromElement===a.target?a.toElement:a.fromElement;if(a.pageX==null&&a.clientX!=null){b=t.documentElement;d=t.body;a.pageX=a.clientX+(b&&b.scrollLeft||d&&d.scrollLeft||0)-(b&&b.clientLeft||d&&d.clientLeft||0);a.pageY=a.clientY+(b&&b.scrollTop||
d&&d.scrollTop||0)-(b&&b.clientTop||d&&d.clientTop||0)}if(a.which==null&&(a.charCode!=null||a.keyCode!=null))a.which=a.charCode!=null?a.charCode:a.keyCode;if(!a.metaKey&&a.ctrlKey)a.metaKey=a.ctrlKey;if(!a.which&&a.button!==B)a.which=a.button&1?1:a.button&2?3:a.button&4?2:0;return a},guid:1E8,proxy:c.proxy,special:{ready:{setup:c.bindReady,teardown:c.noop},live:{add:function(a){c.event.add(this,Y(a.origType,a.selector),c.extend({},a,{handler:Ka,guid:a.handler.guid}))},remove:function(a){c.event.remove(this,
Y(a.origType,a.selector),a)}},beforeunload:{setup:function(a,b,d){if(c.isWindow(this))this.onbeforeunload=d},teardown:function(a,b){if(this.onbeforeunload===b)this.onbeforeunload=null}}}};c.removeEvent=t.removeEventListener?function(a,b,d){a.removeEventListener&&a.removeEventListener(b,d,false)}:function(a,b,d){a.detachEvent&&a.detachEvent("on"+b,d)};c.Event=function(a){if(!this.preventDefault)return new c.Event(a);if(a&&a.type){this.originalEvent=a;this.type=a.type}else this.type=a;this.timeStamp=
c.now();this[c.expando]=true};c.Event.prototype={preventDefault:function(){this.isDefaultPrevented=ca;var a=this.originalEvent;if(a)if(a.preventDefault)a.preventDefault();else a.returnValue=false},stopPropagation:function(){this.isPropagationStopped=ca;var a=this.originalEvent;if(a){a.stopPropagation&&a.stopPropagation();a.cancelBubble=true}},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=ca;this.stopPropagation()},isDefaultPrevented:U,isPropagationStopped:U,isImmediatePropagationStopped:U};
var va=function(a){var b=a.relatedTarget;try{for(;b&&b!==this;)b=b.parentNode;if(b!==this){a.type=a.data;c.event.handle.apply(this,arguments)}}catch(d){}},wa=function(a){a.type=a.data;c.event.handle.apply(this,arguments)};c.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){c.event.special[a]={setup:function(d){c.event.add(this,b,d&&d.selector?wa:va,a)},teardown:function(d){c.event.remove(this,b,d&&d.selector?wa:va)}}});if(!c.support.submitBubbles)c.event.special.submit={setup:function(){if(this.nodeName.toLowerCase()!==
"form"){c.event.add(this,"click.specialSubmit",function(a){var b=a.target,d=b.type;if((d==="submit"||d==="image")&&c(b).closest("form").length){a.liveFired=B;return la("submit",this,arguments)}});c.event.add(this,"keypress.specialSubmit",function(a){var b=a.target,d=b.type;if((d==="text"||d==="password")&&c(b).closest("form").length&&a.keyCode===13){a.liveFired=B;return la("submit",this,arguments)}})}else return false},teardown:function(){c.event.remove(this,".specialSubmit")}};if(!c.support.changeBubbles){var V,
xa=function(a){var b=a.type,d=a.value;if(b==="radio"||b==="checkbox")d=a.checked;else if(b==="select-multiple")d=a.selectedIndex>-1?c.map(a.options,function(e){return e.selected}).join("-"):"";else if(a.nodeName.toLowerCase()==="select")d=a.selectedIndex;return d},Z=function(a,b){var d=a.target,e,f;if(!(!ia.test(d.nodeName)||d.readOnly)){e=c.data(d,"_change_data");f=xa(d);if(a.type!=="focusout"||d.type!=="radio")c.data(d,"_change_data",f);if(!(e===B||f===e))if(e!=null||f){a.type="change";a.liveFired=
B;return c.event.trigger(a,b,d)}}};c.event.special.change={filters:{focusout:Z,beforedeactivate:Z,click:function(a){var b=a.target,d=b.type;if(d==="radio"||d==="checkbox"||b.nodeName.toLowerCase()==="select")return Z.call(this,a)},keydown:function(a){var b=a.target,d=b.type;if(a.keyCode===13&&b.nodeName.toLowerCase()!=="textarea"||a.keyCode===32&&(d==="checkbox"||d==="radio")||d==="select-multiple")return Z.call(this,a)},beforeactivate:function(a){a=a.target;c.data(a,"_change_data",xa(a))}},setup:function(){if(this.type===
"file")return false;for(var a in V)c.event.add(this,a+".specialChange",V[a]);return ia.test(this.nodeName)},teardown:function(){c.event.remove(this,".specialChange");return ia.test(this.nodeName)}};V=c.event.special.change.filters;V.focus=V.beforeactivate}t.addEventListener&&c.each({focus:"focusin",blur:"focusout"},function(a,b){function d(e){e=c.event.fix(e);e.type=b;return c.event.trigger(e,null,e.target)}c.event.special[b]={setup:function(){ua[b]++===0&&t.addEventListener(a,d,true)},teardown:function(){--ua[b]===
0&&t.removeEventListener(a,d,true)}}});c.each(["bind","one"],function(a,b){c.fn[b]=function(d,e,f){if(typeof d==="object"){for(var h in d)this[b](h,e,d[h],f);return this}if(c.isFunction(e)||e===false){f=e;e=B}var l=b==="one"?c.proxy(f,function(o){c(this).unbind(o,l);return f.apply(this,arguments)}):f;if(d==="unload"&&b!=="one")this.one(d,e,f);else{h=0;for(var k=this.length;h<k;h++)c.event.add(this[h],d,l,e)}return this}});c.fn.extend({unbind:function(a,b){if(typeof a==="object"&&!a.preventDefault)for(var d in a)this.unbind(d,
a[d]);else{d=0;for(var e=this.length;d<e;d++)c.event.remove(this[d],a,b)}return this},delegate:function(a,b,d,e){return this.live(b,d,e,a)},undelegate:function(a,b,d){return arguments.length===0?this.unbind("live"):this.die(b,null,d,a)},trigger:function(a,b){return this.each(function(){c.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0]){var d=c.Event(a);d.preventDefault();d.stopPropagation();c.event.trigger(d,b,this[0]);return d.result}},toggle:function(a){for(var b=arguments,d=
1;d<b.length;)c.proxy(a,b[d++]);return this.click(c.proxy(a,function(e){var f=(c.data(this,"lastToggle"+a.guid)||0)%d;c.data(this,"lastToggle"+a.guid,f+1);e.preventDefault();return b[f].apply(this,arguments)||false}))},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}});var ya={focus:"focusin",blur:"focusout",mouseenter:"mouseover",mouseleave:"mouseout"};c.each(["live","die"],function(a,b){c.fn[b]=function(d,e,f,h){var l,k=0,o,x,r=h||this.selector;h=h?this:c(this.context);if(typeof d===
"object"&&!d.preventDefault){for(l in d)h[b](l,e,d[l],r);return this}if(c.isFunction(e)){f=e;e=B}for(d=(d||"").split(" ");(l=d[k++])!=null;){o=X.exec(l);x="";if(o){x=o[0];l=l.replace(X,"")}if(l==="hover")d.push("mouseenter"+x,"mouseleave"+x);else{o=l;if(l==="focus"||l==="blur"){d.push(ya[l]+x);l+=x}else l=(ya[l]||l)+x;if(b==="live"){x=0;for(var A=h.length;x<A;x++)c.event.add(h[x],"live."+Y(l,r),{data:e,selector:r,handler:f,origType:l,origHandler:f,preType:o})}else h.unbind("live."+Y(l,r),f)}}return this}});
c.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "),function(a,b){c.fn[b]=function(d,e){if(e==null){e=d;d=null}return arguments.length>0?this.bind(b,d,e):this.trigger(b)};if(c.attrFn)c.attrFn[b]=true});E.attachEvent&&!E.addEventListener&&c(E).bind("unload",function(){for(var a in c.cache)if(c.cache[a].handle)try{c.event.remove(c.cache[a].handle.elem)}catch(b){}});
(function(){function a(g,i,n,m,p,q){p=0;for(var u=m.length;p<u;p++){var y=m[p];if(y){var F=false;for(y=y[g];y;){if(y.sizcache===n){F=m[y.sizset];break}if(y.nodeType===1&&!q){y.sizcache=n;y.sizset=p}if(y.nodeName.toLowerCase()===i){F=y;break}y=y[g]}m[p]=F}}}function b(g,i,n,m,p,q){p=0;for(var u=m.length;p<u;p++){var y=m[p];if(y){var F=false;for(y=y[g];y;){if(y.sizcache===n){F=m[y.sizset];break}if(y.nodeType===1){if(!q){y.sizcache=n;y.sizset=p}if(typeof i!=="string"){if(y===i){F=true;break}}else if(k.filter(i,
[y]).length>0){F=y;break}}y=y[g]}m[p]=F}}}var d=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,e=0,f=Object.prototype.toString,h=false,l=true;[0,0].sort(function(){l=false;return 0});var k=function(g,i,n,m){n=n||[];var p=i=i||t;if(i.nodeType!==1&&i.nodeType!==9)return[];if(!g||typeof g!=="string")return n;var q,u,y,F,M,N=true,O=k.isXML(i),D=[],R=g;do{d.exec("");if(q=d.exec(R)){R=q[3];D.push(q[1]);if(q[2]){F=q[3];
break}}}while(q);if(D.length>1&&x.exec(g))if(D.length===2&&o.relative[D[0]])u=L(D[0]+D[1],i);else for(u=o.relative[D[0]]?[i]:k(D.shift(),i);D.length;){g=D.shift();if(o.relative[g])g+=D.shift();u=L(g,u)}else{if(!m&&D.length>1&&i.nodeType===9&&!O&&o.match.ID.test(D[0])&&!o.match.ID.test(D[D.length-1])){q=k.find(D.shift(),i,O);i=q.expr?k.filter(q.expr,q.set)[0]:q.set[0]}if(i){q=m?{expr:D.pop(),set:C(m)}:k.find(D.pop(),D.length===1&&(D[0]==="~"||D[0]==="+")&&i.parentNode?i.parentNode:i,O);u=q.expr?k.filter(q.expr,
q.set):q.set;if(D.length>0)y=C(u);else N=false;for(;D.length;){q=M=D.pop();if(o.relative[M])q=D.pop();else M="";if(q==null)q=i;o.relative[M](y,q,O)}}else y=[]}y||(y=u);y||k.error(M||g);if(f.call(y)==="[object Array]")if(N)if(i&&i.nodeType===1)for(g=0;y[g]!=null;g++){if(y[g]&&(y[g]===true||y[g].nodeType===1&&k.contains(i,y[g])))n.push(u[g])}else for(g=0;y[g]!=null;g++)y[g]&&y[g].nodeType===1&&n.push(u[g]);else n.push.apply(n,y);else C(y,n);if(F){k(F,p,n,m);k.uniqueSort(n)}return n};k.uniqueSort=function(g){if(w){h=
l;g.sort(w);if(h)for(var i=1;i<g.length;i++)g[i]===g[i-1]&&g.splice(i--,1)}return g};k.matches=function(g,i){return k(g,null,null,i)};k.matchesSelector=function(g,i){return k(i,null,null,[g]).length>0};k.find=function(g,i,n){var m;if(!g)return[];for(var p=0,q=o.order.length;p<q;p++){var u,y=o.order[p];if(u=o.leftMatch[y].exec(g)){var F=u[1];u.splice(1,1);if(F.substr(F.length-1)!=="\\"){u[1]=(u[1]||"").replace(/\\/g,"");m=o.find[y](u,i,n);if(m!=null){g=g.replace(o.match[y],"");break}}}}m||(m=i.getElementsByTagName("*"));
return{set:m,expr:g}};k.filter=function(g,i,n,m){for(var p,q,u=g,y=[],F=i,M=i&&i[0]&&k.isXML(i[0]);g&&i.length;){for(var N in o.filter)if((p=o.leftMatch[N].exec(g))!=null&&p[2]){var O,D,R=o.filter[N];D=p[1];q=false;p.splice(1,1);if(D.substr(D.length-1)!=="\\"){if(F===y)y=[];if(o.preFilter[N])if(p=o.preFilter[N](p,F,n,y,m,M)){if(p===true)continue}else q=O=true;if(p)for(var j=0;(D=F[j])!=null;j++)if(D){O=R(D,p,j,F);var s=m^!!O;if(n&&O!=null)if(s)q=true;else F[j]=false;else if(s){y.push(D);q=true}}if(O!==
B){n||(F=y);g=g.replace(o.match[N],"");if(!q)return[];break}}}if(g===u)if(q==null)k.error(g);else break;u=g}return F};k.error=function(g){throw"Syntax error, unrecognized expression: "+g;};var o=k.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+\-]*)\))?/,
POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(g){return g.getAttribute("href")}},relative:{"+":function(g,i){var n=typeof i==="string",m=n&&!/\W/.test(i);n=n&&!m;if(m)i=i.toLowerCase();m=0;for(var p=g.length,q;m<p;m++)if(q=g[m]){for(;(q=q.previousSibling)&&q.nodeType!==1;);g[m]=n||q&&q.nodeName.toLowerCase()===
i?q||false:q===i}n&&k.filter(i,g,true)},">":function(g,i){var n,m=typeof i==="string",p=0,q=g.length;if(m&&!/\W/.test(i))for(i=i.toLowerCase();p<q;p++){if(n=g[p]){n=n.parentNode;g[p]=n.nodeName.toLowerCase()===i?n:false}}else{for(;p<q;p++)if(n=g[p])g[p]=m?n.parentNode:n.parentNode===i;m&&k.filter(i,g,true)}},"":function(g,i,n){var m,p=e++,q=b;if(typeof i==="string"&&!/\W/.test(i)){m=i=i.toLowerCase();q=a}q("parentNode",i,p,g,m,n)},"~":function(g,i,n){var m,p=e++,q=b;if(typeof i==="string"&&!/\W/.test(i)){m=
i=i.toLowerCase();q=a}q("previousSibling",i,p,g,m,n)}},find:{ID:function(g,i,n){if(typeof i.getElementById!=="undefined"&&!n)return(g=i.getElementById(g[1]))&&g.parentNode?[g]:[]},NAME:function(g,i){if(typeof i.getElementsByName!=="undefined"){for(var n=[],m=i.getElementsByName(g[1]),p=0,q=m.length;p<q;p++)m[p].getAttribute("name")===g[1]&&n.push(m[p]);return n.length===0?null:n}},TAG:function(g,i){return i.getElementsByTagName(g[1])}},preFilter:{CLASS:function(g,i,n,m,p,q){g=" "+g[1].replace(/\\/g,
"")+" ";if(q)return g;q=0;for(var u;(u=i[q])!=null;q++)if(u)if(p^(u.className&&(" "+u.className+" ").replace(/[\t\n]/g," ").indexOf(g)>=0))n||m.push(u);else if(n)i[q]=false;return false},ID:function(g){return g[1].replace(/\\/g,"")},TAG:function(g){return g[1].toLowerCase()},CHILD:function(g){if(g[1]==="nth"){var i=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(g[2]==="even"&&"2n"||g[2]==="odd"&&"2n+1"||!/\D/.test(g[2])&&"0n+"+g[2]||g[2]);g[2]=i[1]+(i[2]||1)-0;g[3]=i[3]-0}g[0]=e++;return g},ATTR:function(g,i,n,
m,p,q){i=g[1].replace(/\\/g,"");if(!q&&o.attrMap[i])g[1]=o.attrMap[i];if(g[2]==="~=")g[4]=" "+g[4]+" ";return g},PSEUDO:function(g,i,n,m,p){if(g[1]==="not")if((d.exec(g[3])||"").length>1||/^\w/.test(g[3]))g[3]=k(g[3],null,null,i);else{g=k.filter(g[3],i,n,true^p);n||m.push.apply(m,g);return false}else if(o.match.POS.test(g[0])||o.match.CHILD.test(g[0]))return true;return g},POS:function(g){g.unshift(true);return g}},filters:{enabled:function(g){return g.disabled===false&&g.type!=="hidden"},disabled:function(g){return g.disabled===
true},checked:function(g){return g.checked===true},selected:function(g){return g.selected===true},parent:function(g){return!!g.firstChild},empty:function(g){return!g.firstChild},has:function(g,i,n){return!!k(n[3],g).length},header:function(g){return/h\d/i.test(g.nodeName)},text:function(g){return"text"===g.type},radio:function(g){return"radio"===g.type},checkbox:function(g){return"checkbox"===g.type},file:function(g){return"file"===g.type},password:function(g){return"password"===g.type},submit:function(g){return"submit"===
g.type},image:function(g){return"image"===g.type},reset:function(g){return"reset"===g.type},button:function(g){return"button"===g.type||g.nodeName.toLowerCase()==="button"},input:function(g){return/input|select|textarea|button/i.test(g.nodeName)}},setFilters:{first:function(g,i){return i===0},last:function(g,i,n,m){return i===m.length-1},even:function(g,i){return i%2===0},odd:function(g,i){return i%2===1},lt:function(g,i,n){return i<n[3]-0},gt:function(g,i,n){return i>n[3]-0},nth:function(g,i,n){return n[3]-
0===i},eq:function(g,i,n){return n[3]-0===i}},filter:{PSEUDO:function(g,i,n,m){var p=i[1],q=o.filters[p];if(q)return q(g,n,i,m);else if(p==="contains")return(g.textContent||g.innerText||k.getText([g])||"").indexOf(i[3])>=0;else if(p==="not"){i=i[3];n=0;for(m=i.length;n<m;n++)if(i[n]===g)return false;return true}else k.error("Syntax error, unrecognized expression: "+p)},CHILD:function(g,i){var n=i[1],m=g;switch(n){case "only":case "first":for(;m=m.previousSibling;)if(m.nodeType===1)return false;if(n===
"first")return true;m=g;case "last":for(;m=m.nextSibling;)if(m.nodeType===1)return false;return true;case "nth":n=i[2];var p=i[3];if(n===1&&p===0)return true;var q=i[0],u=g.parentNode;if(u&&(u.sizcache!==q||!g.nodeIndex)){var y=0;for(m=u.firstChild;m;m=m.nextSibling)if(m.nodeType===1)m.nodeIndex=++y;u.sizcache=q}m=g.nodeIndex-p;return n===0?m===0:m%n===0&&m/n>=0}},ID:function(g,i){return g.nodeType===1&&g.getAttribute("id")===i},TAG:function(g,i){return i==="*"&&g.nodeType===1||g.nodeName.toLowerCase()===
i},CLASS:function(g,i){return(" "+(g.className||g.getAttribute("class"))+" ").indexOf(i)>-1},ATTR:function(g,i){var n=i[1];n=o.attrHandle[n]?o.attrHandle[n](g):g[n]!=null?g[n]:g.getAttribute(n);var m=n+"",p=i[2],q=i[4];return n==null?p==="!=":p==="="?m===q:p==="*="?m.indexOf(q)>=0:p==="~="?(" "+m+" ").indexOf(q)>=0:!q?m&&n!==false:p==="!="?m!==q:p==="^="?m.indexOf(q)===0:p==="$="?m.substr(m.length-q.length)===q:p==="|="?m===q||m.substr(0,q.length+1)===q+"-":false},POS:function(g,i,n,m){var p=o.setFilters[i[2]];
if(p)return p(g,n,i,m)}}},x=o.match.POS,r=function(g,i){return"\\"+(i-0+1)},A;for(A in o.match){o.match[A]=RegExp(o.match[A].source+/(?![^\[]*\])(?![^\(]*\))/.source);o.leftMatch[A]=RegExp(/(^(?:.|\r|\n)*?)/.source+o.match[A].source.replace(/\\(\d+)/g,r))}var C=function(g,i){g=Array.prototype.slice.call(g,0);if(i){i.push.apply(i,g);return i}return g};try{Array.prototype.slice.call(t.documentElement.childNodes,0)}catch(J){C=function(g,i){var n=0,m=i||[];if(f.call(g)==="[object Array]")Array.prototype.push.apply(m,
g);else if(typeof g.length==="number")for(var p=g.length;n<p;n++)m.push(g[n]);else for(;g[n];n++)m.push(g[n]);return m}}var w,I;if(t.documentElement.compareDocumentPosition)w=function(g,i){if(g===i){h=true;return 0}if(!g.compareDocumentPosition||!i.compareDocumentPosition)return g.compareDocumentPosition?-1:1;return g.compareDocumentPosition(i)&4?-1:1};else{w=function(g,i){var n,m,p=[],q=[];n=g.parentNode;m=i.parentNode;var u=n;if(g===i){h=true;return 0}else if(n===m)return I(g,i);else if(n){if(!m)return 1}else return-1;
for(;u;){p.unshift(u);u=u.parentNode}for(u=m;u;){q.unshift(u);u=u.parentNode}n=p.length;m=q.length;for(u=0;u<n&&u<m;u++)if(p[u]!==q[u])return I(p[u],q[u]);return u===n?I(g,q[u],-1):I(p[u],i,1)};I=function(g,i,n){if(g===i)return n;for(g=g.nextSibling;g;){if(g===i)return-1;g=g.nextSibling}return 1}}k.getText=function(g){for(var i="",n,m=0;g[m];m++){n=g[m];if(n.nodeType===3||n.nodeType===4)i+=n.nodeValue;else if(n.nodeType!==8)i+=k.getText(n.childNodes)}return i};(function(){var g=t.createElement("div"),
i="script"+(new Date).getTime(),n=t.documentElement;g.innerHTML="<a name='"+i+"'/>";n.insertBefore(g,n.firstChild);if(t.getElementById(i)){o.find.ID=function(m,p,q){if(typeof p.getElementById!=="undefined"&&!q)return(p=p.getElementById(m[1]))?p.id===m[1]||typeof p.getAttributeNode!=="undefined"&&p.getAttributeNode("id").nodeValue===m[1]?[p]:B:[]};o.filter.ID=function(m,p){var q=typeof m.getAttributeNode!=="undefined"&&m.getAttributeNode("id");return m.nodeType===1&&q&&q.nodeValue===p}}n.removeChild(g);
n=g=null})();(function(){var g=t.createElement("div");g.appendChild(t.createComment(""));if(g.getElementsByTagName("*").length>0)o.find.TAG=function(i,n){var m=n.getElementsByTagName(i[1]);if(i[1]==="*"){for(var p=[],q=0;m[q];q++)m[q].nodeType===1&&p.push(m[q]);m=p}return m};g.innerHTML="<a href='#'></a>";if(g.firstChild&&typeof g.firstChild.getAttribute!=="undefined"&&g.firstChild.getAttribute("href")!=="#")o.attrHandle.href=function(i){return i.getAttribute("href",2)};g=null})();t.querySelectorAll&&
function(){var g=k,i=t.createElement("div");i.innerHTML="<p class='TEST'></p>";if(!(i.querySelectorAll&&i.querySelectorAll(".TEST").length===0)){k=function(m,p,q,u){p=p||t;m=m.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!u&&!k.isXML(p))if(p.nodeType===9)try{return C(p.querySelectorAll(m),q)}catch(y){}else if(p.nodeType===1&&p.nodeName.toLowerCase()!=="object"){var F=p.getAttribute("id"),M=F||"__sizzle__";F||p.setAttribute("id",M);try{return C(p.querySelectorAll("#"+M+" "+m),q)}catch(N){}finally{F||
p.removeAttribute("id")}}return g(m,p,q,u)};for(var n in g)k[n]=g[n];i=null}}();(function(){var g=t.documentElement,i=g.matchesSelector||g.mozMatchesSelector||g.webkitMatchesSelector||g.msMatchesSelector,n=false;try{i.call(t.documentElement,"[test!='']:sizzle")}catch(m){n=true}if(i)k.matchesSelector=function(p,q){q=q.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!k.isXML(p))try{if(n||!o.match.PSEUDO.test(q)&&!/!=/.test(q))return i.call(p,q)}catch(u){}return k(q,null,null,[p]).length>0}})();(function(){var g=
t.createElement("div");g.innerHTML="<div class='test e'></div><div class='test'></div>";if(!(!g.getElementsByClassName||g.getElementsByClassName("e").length===0)){g.lastChild.className="e";if(g.getElementsByClassName("e").length!==1){o.order.splice(1,0,"CLASS");o.find.CLASS=function(i,n,m){if(typeof n.getElementsByClassName!=="undefined"&&!m)return n.getElementsByClassName(i[1])};g=null}}})();k.contains=t.documentElement.contains?function(g,i){return g!==i&&(g.contains?g.contains(i):true)}:t.documentElement.compareDocumentPosition?
function(g,i){return!!(g.compareDocumentPosition(i)&16)}:function(){return false};k.isXML=function(g){return(g=(g?g.ownerDocument||g:0).documentElement)?g.nodeName!=="HTML":false};var L=function(g,i){for(var n,m=[],p="",q=i.nodeType?[i]:i;n=o.match.PSEUDO.exec(g);){p+=n[0];g=g.replace(o.match.PSEUDO,"")}g=o.relative[g]?g+"*":g;n=0;for(var u=q.length;n<u;n++)k(g,q[n],m);return k.filter(p,m)};c.find=k;c.expr=k.selectors;c.expr[":"]=c.expr.filters;c.unique=k.uniqueSort;c.text=k.getText;c.isXMLDoc=k.isXML;
c.contains=k.contains})();var Za=/Until$/,$a=/^(?:parents|prevUntil|prevAll)/,ab=/,/,Na=/^.[^:#\[\.,]*$/,bb=Array.prototype.slice,cb=c.expr.match.POS;c.fn.extend({find:function(a){for(var b=this.pushStack("","find",a),d=0,e=0,f=this.length;e<f;e++){d=b.length;c.find(a,this[e],b);if(e>0)for(var h=d;h<b.length;h++)for(var l=0;l<d;l++)if(b[l]===b[h]){b.splice(h--,1);break}}return b},has:function(a){var b=c(a);return this.filter(function(){for(var d=0,e=b.length;d<e;d++)if(c.contains(this,b[d]))return true})},
not:function(a){return this.pushStack(ma(this,a,false),"not",a)},filter:function(a){return this.pushStack(ma(this,a,true),"filter",a)},is:function(a){return!!a&&c.filter(a,this).length>0},closest:function(a,b){var d=[],e,f,h=this[0];if(c.isArray(a)){var l,k={},o=1;if(h&&a.length){e=0;for(f=a.length;e<f;e++){l=a[e];k[l]||(k[l]=c.expr.match.POS.test(l)?c(l,b||this.context):l)}for(;h&&h.ownerDocument&&h!==b;){for(l in k){e=k[l];if(e.jquery?e.index(h)>-1:c(h).is(e))d.push({selector:l,elem:h,level:o})}h=
h.parentNode;o++}}return d}l=cb.test(a)?c(a,b||this.context):null;e=0;for(f=this.length;e<f;e++)for(h=this[e];h;)if(l?l.index(h)>-1:c.find.matchesSelector(h,a)){d.push(h);break}else{h=h.parentNode;if(!h||!h.ownerDocument||h===b)break}d=d.length>1?c.unique(d):d;return this.pushStack(d,"closest",a)},index:function(a){if(!a||typeof a==="string")return c.inArray(this[0],a?c(a):this.parent().children());return c.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var d=typeof a==="string"?c(a,b||this.context):
c.makeArray(a),e=c.merge(this.get(),d);return this.pushStack(!d[0]||!d[0].parentNode||d[0].parentNode.nodeType===11||!e[0]||!e[0].parentNode||e[0].parentNode.nodeType===11?e:c.unique(e))},andSelf:function(){return this.add(this.prevObject)}});c.each({parent:function(a){return(a=a.parentNode)&&a.nodeType!==11?a:null},parents:function(a){return c.dir(a,"parentNode")},parentsUntil:function(a,b,d){return c.dir(a,"parentNode",d)},next:function(a){return c.nth(a,2,"nextSibling")},prev:function(a){return c.nth(a,
2,"previousSibling")},nextAll:function(a){return c.dir(a,"nextSibling")},prevAll:function(a){return c.dir(a,"previousSibling")},nextUntil:function(a,b,d){return c.dir(a,"nextSibling",d)},prevUntil:function(a,b,d){return c.dir(a,"previousSibling",d)},siblings:function(a){return c.sibling(a.parentNode.firstChild,a)},children:function(a){return c.sibling(a.firstChild)},contents:function(a){return c.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:c.makeArray(a.childNodes)}},function(a,
b){c.fn[a]=function(d,e){var f=c.map(this,b,d);Za.test(a)||(e=d);if(e&&typeof e==="string")f=c.filter(e,f);f=this.length>1?c.unique(f):f;if((this.length>1||ab.test(e))&&$a.test(a))f=f.reverse();return this.pushStack(f,a,bb.call(arguments).join(","))}});c.extend({filter:function(a,b,d){if(d)a=":not("+a+")";return b.length===1?c.find.matchesSelector(b[0],a)?[b[0]]:[]:c.find.matches(a,b)},dir:function(a,b,d){var e=[];for(a=a[b];a&&a.nodeType!==9&&(d===B||a.nodeType!==1||!c(a).is(d));){a.nodeType===1&&
e.push(a);a=a[b]}return e},nth:function(a,b,d){b=b||1;for(var e=0;a;a=a[d])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){for(var d=[];a;a=a.nextSibling)a.nodeType===1&&a!==b&&d.push(a);return d}});var za=/ jQuery\d+="(?:\d+|null)"/g,$=/^\s+/,Aa=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,Ba=/<([\w:]+)/,db=/<tbody/i,eb=/<|&#?\w+;/,Ca=/<(?:script|object|embed|option|style)/i,Da=/checked\s*(?:[^=]|=\s*.checked.)/i,fb=/\=([^="'>\s]+\/)>/g,P={option:[1,
"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]};P.optgroup=P.option;P.tbody=P.tfoot=P.colgroup=P.caption=P.thead;P.th=P.td;if(!c.support.htmlSerialize)P._default=[1,"div<div>","</div>"];c.fn.extend({text:function(a){if(c.isFunction(a))return this.each(function(b){var d=
c(this);d.text(a.call(this,b,d.text()))});if(typeof a!=="object"&&a!==B)return this.empty().append((this[0]&&this[0].ownerDocument||t).createTextNode(a));return c.text(this)},wrapAll:function(a){if(c.isFunction(a))return this.each(function(d){c(this).wrapAll(a.call(this,d))});if(this[0]){var b=c(a,this[0].ownerDocument).eq(0).clone(true);this[0].parentNode&&b.insertBefore(this[0]);b.map(function(){for(var d=this;d.firstChild&&d.firstChild.nodeType===1;)d=d.firstChild;return d}).append(this)}return this},
wrapInner:function(a){if(c.isFunction(a))return this.each(function(b){c(this).wrapInner(a.call(this,b))});return this.each(function(){var b=c(this),d=b.contents();d.length?d.wrapAll(a):b.append(a)})},wrap:function(a){return this.each(function(){c(this).wrapAll(a)})},unwrap:function(){return this.parent().each(function(){c.nodeName(this,"body")||c(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,true,function(a){this.nodeType===1&&this.appendChild(a)})},
prepend:function(){return this.domManip(arguments,true,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,false,function(b){this.parentNode.insertBefore(b,this)});else if(arguments.length){var a=c(arguments[0]);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,false,function(b){this.parentNode.insertBefore(b,
this.nextSibling)});else if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,c(arguments[0]).toArray());return a}},remove:function(a,b){for(var d=0,e;(e=this[d])!=null;d++)if(!a||c.filter(a,[e]).length){if(!b&&e.nodeType===1){c.cleanData(e.getElementsByTagName("*"));c.cleanData([e])}e.parentNode&&e.parentNode.removeChild(e)}return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++)for(b.nodeType===1&&c.cleanData(b.getElementsByTagName("*"));b.firstChild;)b.removeChild(b.firstChild);
return this},clone:function(a){var b=this.map(function(){if(!c.support.noCloneEvent&&!c.isXMLDoc(this)){var d=this.outerHTML,e=this.ownerDocument;if(!d){d=e.createElement("div");d.appendChild(this.cloneNode(true));d=d.innerHTML}return c.clean([d.replace(za,"").replace(fb,'="$1">').replace($,"")],e)[0]}else return this.cloneNode(true)});if(a===true){na(this,b);na(this.find("*"),b.find("*"))}return b},html:function(a){if(a===B)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(za,""):null;
else if(typeof a==="string"&&!Ca.test(a)&&(c.support.leadingWhitespace||!$.test(a))&&!P[(Ba.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Aa,"<$1></$2>");try{for(var b=0,d=this.length;b<d;b++)if(this[b].nodeType===1){c.cleanData(this[b].getElementsByTagName("*"));this[b].innerHTML=a}}catch(e){this.empty().append(a)}}else c.isFunction(a)?this.each(function(f){var h=c(this);h.html(a.call(this,f,h.html()))}):this.empty().append(a);return this},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(c.isFunction(a))return this.each(function(b){var d=
c(this),e=d.html();d.replaceWith(a.call(this,b,e))});if(typeof a!=="string")a=c(a).detach();return this.each(function(){var b=this.nextSibling,d=this.parentNode;c(this).remove();b?c(b).before(a):c(d).append(a)})}else return this.pushStack(c(c.isFunction(a)?a():a),"replaceWith",a)},detach:function(a){return this.remove(a,true)},domManip:function(a,b,d){var e,f,h,l=a[0],k=[];if(!c.support.checkClone&&arguments.length===3&&typeof l==="string"&&Da.test(l))return this.each(function(){c(this).domManip(a,
b,d,true)});if(c.isFunction(l))return this.each(function(x){var r=c(this);a[0]=l.call(this,x,b?r.html():B);r.domManip(a,b,d)});if(this[0]){e=l&&l.parentNode;e=c.support.parentNode&&e&&e.nodeType===11&&e.childNodes.length===this.length?{fragment:e}:c.buildFragment(a,this,k);h=e.fragment;if(f=h.childNodes.length===1?h=h.firstChild:h.firstChild){b=b&&c.nodeName(f,"tr");f=0;for(var o=this.length;f<o;f++)d.call(b?c.nodeName(this[f],"table")?this[f].getElementsByTagName("tbody")[0]||this[f].appendChild(this[f].ownerDocument.createElement("tbody")):
this[f]:this[f],f>0||e.cacheable||this.length>1?h.cloneNode(true):h)}k.length&&c.each(k,Oa)}return this}});c.buildFragment=function(a,b,d){var e,f,h;b=b&&b[0]?b[0].ownerDocument||b[0]:t;if(a.length===1&&typeof a[0]==="string"&&a[0].length<512&&b===t&&!Ca.test(a[0])&&(c.support.checkClone||!Da.test(a[0]))){f=true;if(h=c.fragments[a[0]])if(h!==1)e=h}if(!e){e=b.createDocumentFragment();c.clean(a,b,e,d)}if(f)c.fragments[a[0]]=h?e:1;return{fragment:e,cacheable:f}};c.fragments={};c.each({appendTo:"append",
prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){c.fn[a]=function(d){var e=[];d=c(d);var f=this.length===1&&this[0].parentNode;if(f&&f.nodeType===11&&f.childNodes.length===1&&d.length===1){d[b](this[0]);return this}else{f=0;for(var h=d.length;f<h;f++){var l=(f>0?this.clone(true):this).get();c(d[f])[b](l);e=e.concat(l)}return this.pushStack(e,a,d.selector)}}});c.extend({clean:function(a,b,d,e){b=b||t;if(typeof b.createElement==="undefined")b=b.ownerDocument||
b[0]&&b[0].ownerDocument||t;for(var f=[],h=0,l;(l=a[h])!=null;h++){if(typeof l==="number")l+="";if(l){if(typeof l==="string"&&!eb.test(l))l=b.createTextNode(l);else if(typeof l==="string"){l=l.replace(Aa,"<$1></$2>");var k=(Ba.exec(l)||["",""])[1].toLowerCase(),o=P[k]||P._default,x=o[0],r=b.createElement("div");for(r.innerHTML=o[1]+l+o[2];x--;)r=r.lastChild;if(!c.support.tbody){x=db.test(l);k=k==="table"&&!x?r.firstChild&&r.firstChild.childNodes:o[1]==="<table>"&&!x?r.childNodes:[];for(o=k.length-
1;o>=0;--o)c.nodeName(k[o],"tbody")&&!k[o].childNodes.length&&k[o].parentNode.removeChild(k[o])}!c.support.leadingWhitespace&&$.test(l)&&r.insertBefore(b.createTextNode($.exec(l)[0]),r.firstChild);l=r.childNodes}if(l.nodeType)f.push(l);else f=c.merge(f,l)}}if(d)for(h=0;f[h];h++)if(e&&c.nodeName(f[h],"script")&&(!f[h].type||f[h].type.toLowerCase()==="text/javascript"))e.push(f[h].parentNode?f[h].parentNode.removeChild(f[h]):f[h]);else{f[h].nodeType===1&&f.splice.apply(f,[h+1,0].concat(c.makeArray(f[h].getElementsByTagName("script"))));
d.appendChild(f[h])}return f},cleanData:function(a){for(var b,d,e=c.cache,f=c.event.special,h=c.support.deleteExpando,l=0,k;(k=a[l])!=null;l++)if(!(k.nodeName&&c.noData[k.nodeName.toLowerCase()]))if(d=k[c.expando]){if((b=e[d])&&b.events)for(var o in b.events)f[o]?c.event.remove(k,o):c.removeEvent(k,o,b.handle);if(h)delete k[c.expando];else k.removeAttribute&&k.removeAttribute(c.expando);delete e[d]}}});var Ea=/alpha\([^)]*\)/i,gb=/opacity=([^)]*)/,hb=/-([a-z])/ig,ib=/([A-Z])/g,Fa=/^-?\d+(?:px)?$/i,
jb=/^-?\d/,kb={position:"absolute",visibility:"hidden",display:"block"},Pa=["Left","Right"],Qa=["Top","Bottom"],W,Ga,aa,lb=function(a,b){return b.toUpperCase()};c.fn.css=function(a,b){if(arguments.length===2&&b===B)return this;return c.access(this,a,b,true,function(d,e,f){return f!==B?c.style(d,e,f):c.css(d,e)})};c.extend({cssHooks:{opacity:{get:function(a,b){if(b){var d=W(a,"opacity","opacity");return d===""?"1":d}else return a.style.opacity}}},cssNumber:{zIndex:true,fontWeight:true,opacity:true,
zoom:true,lineHeight:true},cssProps:{"float":c.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,b,d,e){if(!(!a||a.nodeType===3||a.nodeType===8||!a.style)){var f,h=c.camelCase(b),l=a.style,k=c.cssHooks[h];b=c.cssProps[h]||h;if(d!==B){if(!(typeof d==="number"&&isNaN(d)||d==null)){if(typeof d==="number"&&!c.cssNumber[h])d+="px";if(!k||!("set"in k)||(d=k.set(a,d))!==B)try{l[b]=d}catch(o){}}}else{if(k&&"get"in k&&(f=k.get(a,false,e))!==B)return f;return l[b]}}},css:function(a,b,d){var e,f=c.camelCase(b),
h=c.cssHooks[f];b=c.cssProps[f]||f;if(h&&"get"in h&&(e=h.get(a,true,d))!==B)return e;else if(W)return W(a,b,f)},swap:function(a,b,d){var e={},f;for(f in b){e[f]=a.style[f];a.style[f]=b[f]}d.call(a);for(f in b)a.style[f]=e[f]},camelCase:function(a){return a.replace(hb,lb)}});c.curCSS=c.css;c.each(["height","width"],function(a,b){c.cssHooks[b]={get:function(d,e,f){var h;if(e){if(d.offsetWidth!==0)h=oa(d,b,f);else c.swap(d,kb,function(){h=oa(d,b,f)});if(h<=0){h=W(d,b,b);if(h==="0px"&&aa)h=aa(d,b,b);
if(h!=null)return h===""||h==="auto"?"0px":h}if(h<0||h==null){h=d.style[b];return h===""||h==="auto"?"0px":h}return typeof h==="string"?h:h+"px"}},set:function(d,e){if(Fa.test(e)){e=parseFloat(e);if(e>=0)return e+"px"}else return e}}});if(!c.support.opacity)c.cssHooks.opacity={get:function(a,b){return gb.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var d=a.style;d.zoom=1;var e=c.isNaN(b)?"":"alpha(opacity="+b*100+")",f=
d.filter||"";d.filter=Ea.test(f)?f.replace(Ea,e):d.filter+" "+e}};if(t.defaultView&&t.defaultView.getComputedStyle)Ga=function(a,b,d){var e;d=d.replace(ib,"-$1").toLowerCase();if(!(b=a.ownerDocument.defaultView))return B;if(b=b.getComputedStyle(a,null)){e=b.getPropertyValue(d);if(e===""&&!c.contains(a.ownerDocument.documentElement,a))e=c.style(a,d)}return e};if(t.documentElement.currentStyle)aa=function(a,b){var d,e,f=a.currentStyle&&a.currentStyle[b],h=a.style;if(!Fa.test(f)&&jb.test(f)){d=h.left;
e=a.runtimeStyle.left;a.runtimeStyle.left=a.currentStyle.left;h.left=b==="fontSize"?"1em":f||0;f=h.pixelLeft+"px";h.left=d;a.runtimeStyle.left=e}return f===""?"auto":f};W=Ga||aa;if(c.expr&&c.expr.filters){c.expr.filters.hidden=function(a){var b=a.offsetHeight;return a.offsetWidth===0&&b===0||!c.support.reliableHiddenOffsets&&(a.style.display||c.css(a,"display"))==="none"};c.expr.filters.visible=function(a){return!c.expr.filters.hidden(a)}}var mb=c.now(),nb=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
ob=/^(?:select|textarea)/i,pb=/^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,qb=/^(?:GET|HEAD)$/,Ra=/\[\]$/,T=/\=\?(&|$)/,ja=/\?/,rb=/([?&])_=[^&]*/,sb=/^(\w+:)?\/\/([^\/?#]+)/,tb=/%20/g,ub=/#.*$/,Ha=c.fn.load;c.fn.extend({load:function(a,b,d){if(typeof a!=="string"&&Ha)return Ha.apply(this,arguments);else if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var f=a.slice(e,a.length);a=a.slice(0,e)}e="GET";if(b)if(c.isFunction(b)){d=b;b=null}else if(typeof b===
"object"){b=c.param(b,c.ajaxSettings.traditional);e="POST"}var h=this;c.ajax({url:a,type:e,dataType:"html",data:b,complete:function(l,k){if(k==="success"||k==="notmodified")h.html(f?c("<div>").append(l.responseText.replace(nb,"")).find(f):l.responseText);d&&h.each(d,[l.responseText,k,l])}});return this},serialize:function(){return c.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?c.makeArray(this.elements):this}).filter(function(){return this.name&&
!this.disabled&&(this.checked||ob.test(this.nodeName)||pb.test(this.type))}).map(function(a,b){var d=c(this).val();return d==null?null:c.isArray(d)?c.map(d,function(e){return{name:b.name,value:e}}):{name:b.name,value:d}}).get()}});c.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){c.fn[b]=function(d){return this.bind(b,d)}});c.extend({get:function(a,b,d,e){if(c.isFunction(b)){e=e||d;d=b;b=null}return c.ajax({type:"GET",url:a,data:b,success:d,dataType:e})},
getScript:function(a,b){return c.get(a,null,b,"script")},getJSON:function(a,b,d){return c.get(a,b,d,"json")},post:function(a,b,d,e){if(c.isFunction(b)){e=e||d;d=b;b={}}return c.ajax({type:"POST",url:a,data:b,success:d,dataType:e})},ajaxSetup:function(a){c.extend(c.ajaxSettings,a)},ajaxSettings:{url:location.href,global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:function(){return new E.XMLHttpRequest},accepts:{xml:"application/xml, text/xml",html:"text/html",
script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},ajax:function(a){var b=c.extend(true,{},c.ajaxSettings,a),d,e,f,h=b.type.toUpperCase(),l=qb.test(h);b.url=b.url.replace(ub,"");b.context=a&&a.context!=null?a.context:b;if(b.data&&b.processData&&typeof b.data!=="string")b.data=c.param(b.data,b.traditional);if(b.dataType==="jsonp"){if(h==="GET")T.test(b.url)||(b.url+=(ja.test(b.url)?"&":"?")+(b.jsonp||"callback")+"=?");else if(!b.data||
!T.test(b.data))b.data=(b.data?b.data+"&":"")+(b.jsonp||"callback")+"=?";b.dataType="json"}if(b.dataType==="json"&&(b.data&&T.test(b.data)||T.test(b.url))){d=b.jsonpCallback||"jsonp"+mb++;if(b.data)b.data=(b.data+"").replace(T,"="+d+"$1");b.url=b.url.replace(T,"="+d+"$1");b.dataType="script";var k=E[d];E[d]=function(m){if(c.isFunction(k))k(m);else{E[d]=B;try{delete E[d]}catch(p){}}f=m;c.handleSuccess(b,w,e,f);c.handleComplete(b,w,e,f);r&&r.removeChild(A)}}if(b.dataType==="script"&&b.cache===null)b.cache=
false;if(b.cache===false&&l){var o=c.now(),x=b.url.replace(rb,"$1_="+o);b.url=x+(x===b.url?(ja.test(b.url)?"&":"?")+"_="+o:"")}if(b.data&&l)b.url+=(ja.test(b.url)?"&":"?")+b.data;b.global&&c.active++===0&&c.event.trigger("ajaxStart");o=(o=sb.exec(b.url))&&(o[1]&&o[1].toLowerCase()!==location.protocol||o[2].toLowerCase()!==location.host);if(b.dataType==="script"&&h==="GET"&&o){var r=t.getElementsByTagName("head")[0]||t.documentElement,A=t.createElement("script");if(b.scriptCharset)A.charset=b.scriptCharset;
A.src=b.url;if(!d){var C=false;A.onload=A.onreadystatechange=function(){if(!C&&(!this.readyState||this.readyState==="loaded"||this.readyState==="complete")){C=true;c.handleSuccess(b,w,e,f);c.handleComplete(b,w,e,f);A.onload=A.onreadystatechange=null;r&&A.parentNode&&r.removeChild(A)}}}r.insertBefore(A,r.firstChild);return B}var J=false,w=b.xhr();if(w){b.username?w.open(h,b.url,b.async,b.username,b.password):w.open(h,b.url,b.async);try{if(b.data!=null&&!l||a&&a.contentType)w.setRequestHeader("Content-Type",
b.contentType);if(b.ifModified){c.lastModified[b.url]&&w.setRequestHeader("If-Modified-Since",c.lastModified[b.url]);c.etag[b.url]&&w.setRequestHeader("If-None-Match",c.etag[b.url])}o||w.setRequestHeader("X-Requested-With","XMLHttpRequest");w.setRequestHeader("Accept",b.dataType&&b.accepts[b.dataType]?b.accepts[b.dataType]+", */*; q=0.01":b.accepts._default)}catch(I){}if(b.beforeSend&&b.beforeSend.call(b.context,w,b)===false){b.global&&c.active--===1&&c.event.trigger("ajaxStop");w.abort();return false}b.global&&
c.triggerGlobal(b,"ajaxSend",[w,b]);var L=w.onreadystatechange=function(m){if(!w||w.readyState===0||m==="abort"){J||c.handleComplete(b,w,e,f);J=true;if(w)w.onreadystatechange=c.noop}else if(!J&&w&&(w.readyState===4||m==="timeout")){J=true;w.onreadystatechange=c.noop;e=m==="timeout"?"timeout":!c.httpSuccess(w)?"error":b.ifModified&&c.httpNotModified(w,b.url)?"notmodified":"success";var p;if(e==="success")try{f=c.httpData(w,b.dataType,b)}catch(q){e="parsererror";p=q}if(e==="success"||e==="notmodified")d||
c.handleSuccess(b,w,e,f);else c.handleError(b,w,e,p);d||c.handleComplete(b,w,e,f);m==="timeout"&&w.abort();if(b.async)w=null}};try{var g=w.abort;w.abort=function(){w&&Function.prototype.call.call(g,w);L("abort")}}catch(i){}b.async&&b.timeout>0&&setTimeout(function(){w&&!J&&L("timeout")},b.timeout);try{w.send(l||b.data==null?null:b.data)}catch(n){c.handleError(b,w,null,n);c.handleComplete(b,w,e,f)}b.async||L();return w}},param:function(a,b){var d=[],e=function(h,l){l=c.isFunction(l)?l():l;d[d.length]=
encodeURIComponent(h)+"="+encodeURIComponent(l)};if(b===B)b=c.ajaxSettings.traditional;if(c.isArray(a)||a.jquery)c.each(a,function(){e(this.name,this.value)});else for(var f in a)da(f,a[f],b,e);return d.join("&").replace(tb,"+")}});c.extend({active:0,lastModified:{},etag:{},handleError:function(a,b,d,e){a.error&&a.error.call(a.context,b,d,e);a.global&&c.triggerGlobal(a,"ajaxError",[b,a,e])},handleSuccess:function(a,b,d,e){a.success&&a.success.call(a.context,e,d,b);a.global&&c.triggerGlobal(a,"ajaxSuccess",
[b,a])},handleComplete:function(a,b,d){a.complete&&a.complete.call(a.context,b,d);a.global&&c.triggerGlobal(a,"ajaxComplete",[b,a]);a.global&&c.active--===1&&c.event.trigger("ajaxStop")},triggerGlobal:function(a,b,d){(a.context&&a.context.url==null?c(a.context):c.event).trigger(b,d)},httpSuccess:function(a){try{return!a.status&&location.protocol==="file:"||a.status>=200&&a.status<300||a.status===304||a.status===1223}catch(b){}return false},httpNotModified:function(a,b){var d=a.getResponseHeader("Last-Modified"),
e=a.getResponseHeader("Etag");if(d)c.lastModified[b]=d;if(e)c.etag[b]=e;return a.status===304},httpData:function(a,b,d){var e=a.getResponseHeader("content-type")||"",f=b==="xml"||!b&&e.indexOf("xml")>=0;a=f?a.responseXML:a.responseText;f&&a.documentElement.nodeName==="parsererror"&&c.error("parsererror");if(d&&d.dataFilter)a=d.dataFilter(a,b);if(typeof a==="string")if(b==="json"||!b&&e.indexOf("json")>=0)a=c.parseJSON(a);else if(b==="script"||!b&&e.indexOf("javascript")>=0)c.globalEval(a);return a}});
if(E.ActiveXObject)c.ajaxSettings.xhr=function(){if(E.location.protocol!=="file:")try{return new E.XMLHttpRequest}catch(a){}try{return new E.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}};c.support.ajax=!!c.ajaxSettings.xhr();var ea={},vb=/^(?:toggle|show|hide)$/,wb=/^([+\-]=)?([\d+.\-]+)(.*)$/,ba,pa=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];c.fn.extend({show:function(a,b,d){if(a||a===0)return this.animate(S("show",
3),a,b,d);else{d=0;for(var e=this.length;d<e;d++){a=this[d];b=a.style.display;if(!c.data(a,"olddisplay")&&b==="none")b=a.style.display="";b===""&&c.css(a,"display")==="none"&&c.data(a,"olddisplay",qa(a.nodeName))}for(d=0;d<e;d++){a=this[d];b=a.style.display;if(b===""||b==="none")a.style.display=c.data(a,"olddisplay")||""}return this}},hide:function(a,b,d){if(a||a===0)return this.animate(S("hide",3),a,b,d);else{a=0;for(b=this.length;a<b;a++){d=c.css(this[a],"display");d!=="none"&&c.data(this[a],"olddisplay",
d)}for(a=0;a<b;a++)this[a].style.display="none";return this}},_toggle:c.fn.toggle,toggle:function(a,b,d){var e=typeof a==="boolean";if(c.isFunction(a)&&c.isFunction(b))this._toggle.apply(this,arguments);else a==null||e?this.each(function(){var f=e?a:c(this).is(":hidden");c(this)[f?"show":"hide"]()}):this.animate(S("toggle",3),a,b,d);return this},fadeTo:function(a,b,d,e){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,d,e)},animate:function(a,b,d,e){var f=c.speed(b,
d,e);if(c.isEmptyObject(a))return this.each(f.complete);return this[f.queue===false?"each":"queue"](function(){var h=c.extend({},f),l,k=this.nodeType===1,o=k&&c(this).is(":hidden"),x=this;for(l in a){var r=c.camelCase(l);if(l!==r){a[r]=a[l];delete a[l];l=r}if(a[l]==="hide"&&o||a[l]==="show"&&!o)return h.complete.call(this);if(k&&(l==="height"||l==="width")){h.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY];if(c.css(this,"display")==="inline"&&c.css(this,"float")==="none")if(c.support.inlineBlockNeedsLayout)if(qa(this.nodeName)===
"inline")this.style.display="inline-block";else{this.style.display="inline";this.style.zoom=1}else this.style.display="inline-block"}if(c.isArray(a[l])){(h.specialEasing=h.specialEasing||{})[l]=a[l][1];a[l]=a[l][0]}}if(h.overflow!=null)this.style.overflow="hidden";h.curAnim=c.extend({},a);c.each(a,function(A,C){var J=new c.fx(x,h,A);if(vb.test(C))J[C==="toggle"?o?"show":"hide":C](a);else{var w=wb.exec(C),I=J.cur()||0;if(w){var L=parseFloat(w[2]),g=w[3]||"px";if(g!=="px"){c.style(x,A,(L||1)+g);I=(L||
1)/J.cur()*I;c.style(x,A,I+g)}if(w[1])L=(w[1]==="-="?-1:1)*L+I;J.custom(I,L,g)}else J.custom(I,C,"")}});return true})},stop:function(a,b){var d=c.timers;a&&this.queue([]);this.each(function(){for(var e=d.length-1;e>=0;e--)if(d[e].elem===this){b&&d[e](true);d.splice(e,1)}});b||this.dequeue();return this}});c.each({slideDown:S("show",1),slideUp:S("hide",1),slideToggle:S("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){c.fn[a]=function(d,e,f){return this.animate(b,
d,e,f)}});c.extend({speed:function(a,b,d){var e=a&&typeof a==="object"?c.extend({},a):{complete:d||!d&&b||c.isFunction(a)&&a,duration:a,easing:d&&b||b&&!c.isFunction(b)&&b};e.duration=c.fx.off?0:typeof e.duration==="number"?e.duration:e.duration in c.fx.speeds?c.fx.speeds[e.duration]:c.fx.speeds._default;e.old=e.complete;e.complete=function(){e.queue!==false&&c(this).dequeue();c.isFunction(e.old)&&e.old.call(this)};return e},easing:{linear:function(a,b,d,e){return d+e*a},swing:function(a,b,d,e){return(-Math.cos(a*
Math.PI)/2+0.5)*e+d}},timers:[],fx:function(a,b,d){this.options=b;this.elem=a;this.prop=d;if(!b.orig)b.orig={}}});c.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this);(c.fx.step[this.prop]||c.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a=parseFloat(c.css(this.elem,this.prop));return a&&a>-1E4?a:0},custom:function(a,b,d){function e(l){return f.step(l)}
var f=this,h=c.fx;this.startTime=c.now();this.start=a;this.end=b;this.unit=d||this.unit||"px";this.now=this.start;this.pos=this.state=0;e.elem=this.elem;if(e()&&c.timers.push(e)&&!ba)ba=setInterval(h.tick,h.interval)},show:function(){this.options.orig[this.prop]=c.style(this.elem,this.prop);this.options.show=true;this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur());c(this.elem).show()},hide:function(){this.options.orig[this.prop]=c.style(this.elem,this.prop);this.options.hide=true;
this.custom(this.cur(),0)},step:function(a){var b=c.now(),d=true;if(a||b>=this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;for(var e in this.options.curAnim)if(this.options.curAnim[e]!==true)d=false;if(d){if(this.options.overflow!=null&&!c.support.shrinkWrapBlocks){var f=this.elem,h=this.options;c.each(["","X","Y"],function(k,o){f.style["overflow"+o]=h.overflow[k]})}this.options.hide&&c(this.elem).hide();if(this.options.hide||
this.options.show)for(var l in this.options.curAnim)c.style(this.elem,l,this.options.orig[l]);this.options.complete.call(this.elem)}return false}else{a=b-this.startTime;this.state=a/this.options.duration;b=this.options.easing||(c.easing.swing?"swing":"linear");this.pos=c.easing[this.options.specialEasing&&this.options.specialEasing[this.prop]||b](this.state,a,0,1,this.options.duration);this.now=this.start+(this.end-this.start)*this.pos;this.update()}return true}};c.extend(c.fx,{tick:function(){for(var a=
c.timers,b=0;b<a.length;b++)a[b]()||a.splice(b--,1);a.length||c.fx.stop()},interval:13,stop:function(){clearInterval(ba);ba=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){c.style(a.elem,"opacity",a.now)},_default:function(a){if(a.elem.style&&a.elem.style[a.prop]!=null)a.elem.style[a.prop]=(a.prop==="width"||a.prop==="height"?Math.max(0,a.now):a.now)+a.unit;else a.elem[a.prop]=a.now}}});if(c.expr&&c.expr.filters)c.expr.filters.animated=function(a){return c.grep(c.timers,function(b){return a===
b.elem}).length};var xb=/^t(?:able|d|h)$/i,Ia=/^(?:body|html)$/i;c.fn.offset="getBoundingClientRect"in t.documentElement?function(a){var b=this[0],d;if(a)return this.each(function(l){c.offset.setOffset(this,a,l)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return c.offset.bodyOffset(b);try{d=b.getBoundingClientRect()}catch(e){}var f=b.ownerDocument,h=f.documentElement;if(!d||!c.contains(h,b))return d||{top:0,left:0};b=f.body;f=fa(f);return{top:d.top+(f.pageYOffset||c.support.boxModel&&
h.scrollTop||b.scrollTop)-(h.clientTop||b.clientTop||0),left:d.left+(f.pageXOffset||c.support.boxModel&&h.scrollLeft||b.scrollLeft)-(h.clientLeft||b.clientLeft||0)}}:function(a){var b=this[0];if(a)return this.each(function(x){c.offset.setOffset(this,a,x)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return c.offset.bodyOffset(b);c.offset.initialize();var d,e=b.offsetParent,f=b.ownerDocument,h=f.documentElement,l=f.body;d=(f=f.defaultView)?f.getComputedStyle(b,null):b.currentStyle;
for(var k=b.offsetTop,o=b.offsetLeft;(b=b.parentNode)&&b!==l&&b!==h;){if(c.offset.supportsFixedPosition&&d.position==="fixed")break;d=f?f.getComputedStyle(b,null):b.currentStyle;k-=b.scrollTop;o-=b.scrollLeft;if(b===e){k+=b.offsetTop;o+=b.offsetLeft;if(c.offset.doesNotAddBorder&&!(c.offset.doesAddBorderForTableAndCells&&xb.test(b.nodeName))){k+=parseFloat(d.borderTopWidth)||0;o+=parseFloat(d.borderLeftWidth)||0}e=b.offsetParent}if(c.offset.subtractsBorderForOverflowNotVisible&&d.overflow!=="visible"){k+=
parseFloat(d.borderTopWidth)||0;o+=parseFloat(d.borderLeftWidth)||0}d=d}if(d.position==="relative"||d.position==="static"){k+=l.offsetTop;o+=l.offsetLeft}if(c.offset.supportsFixedPosition&&d.position==="fixed"){k+=Math.max(h.scrollTop,l.scrollTop);o+=Math.max(h.scrollLeft,l.scrollLeft)}return{top:k,left:o}};c.offset={initialize:function(){var a=t.body,b=t.createElement("div"),d,e,f,h=parseFloat(c.css(a,"marginTop"))||0;c.extend(b.style,{position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",
height:"1px",visibility:"hidden"});b.innerHTML="<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";a.insertBefore(b,a.firstChild);d=b.firstChild;e=d.firstChild;f=d.nextSibling.firstChild.firstChild;this.doesNotAddBorder=e.offsetTop!==5;this.doesAddBorderForTableAndCells=
f.offsetTop===5;e.style.position="fixed";e.style.top="20px";this.supportsFixedPosition=e.offsetTop===20||e.offsetTop===15;e.style.position=e.style.top="";d.style.overflow="hidden";d.style.position="relative";this.subtractsBorderForOverflowNotVisible=e.offsetTop===-5;this.doesNotIncludeMarginInBodyOffset=a.offsetTop!==h;a.removeChild(b);c.offset.initialize=c.noop},bodyOffset:function(a){var b=a.offsetTop,d=a.offsetLeft;c.offset.initialize();if(c.offset.doesNotIncludeMarginInBodyOffset){b+=parseFloat(c.css(a,
"marginTop"))||0;d+=parseFloat(c.css(a,"marginLeft"))||0}return{top:b,left:d}},setOffset:function(a,b,d){var e=c.css(a,"position");if(e==="static")a.style.position="relative";var f=c(a),h=f.offset(),l=c.css(a,"top"),k=c.css(a,"left"),o=e==="absolute"&&c.inArray("auto",[l,k])>-1;e={};var x={};if(o)x=f.position();l=o?x.top:parseInt(l,10)||0;k=o?x.left:parseInt(k,10)||0;if(c.isFunction(b))b=b.call(a,d,h);if(b.top!=null)e.top=b.top-h.top+l;if(b.left!=null)e.left=b.left-h.left+k;"using"in b?b.using.call(a,
e):f.css(e)}};c.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),d=this.offset(),e=Ia.test(b[0].nodeName)?{top:0,left:0}:b.offset();d.top-=parseFloat(c.css(a,"marginTop"))||0;d.left-=parseFloat(c.css(a,"marginLeft"))||0;e.top+=parseFloat(c.css(b[0],"borderTopWidth"))||0;e.left+=parseFloat(c.css(b[0],"borderLeftWidth"))||0;return{top:d.top-e.top,left:d.left-e.left}},offsetParent:function(){return this.map(function(){for(var a=this.offsetParent||t.body;a&&!Ia.test(a.nodeName)&&
c.css(a,"position")==="static";)a=a.offsetParent;return a})}});c.each(["Left","Top"],function(a,b){var d="scroll"+b;c.fn[d]=function(e){var f=this[0],h;if(!f)return null;if(e!==B)return this.each(function(){if(h=fa(this))h.scrollTo(!a?e:c(h).scrollLeft(),a?e:c(h).scrollTop());else this[d]=e});else return(h=fa(f))?"pageXOffset"in h?h[a?"pageYOffset":"pageXOffset"]:c.support.boxModel&&h.document.documentElement[d]||h.document.body[d]:f[d]}});c.each(["Height","Width"],function(a,b){var d=b.toLowerCase();
c.fn["inner"+b]=function(){return this[0]?parseFloat(c.css(this[0],d,"padding")):null};c.fn["outer"+b]=function(e){return this[0]?parseFloat(c.css(this[0],d,e?"margin":"border")):null};c.fn[d]=function(e){var f=this[0];if(!f)return e==null?null:this;if(c.isFunction(e))return this.each(function(l){var k=c(this);k[d](e.call(this,l,k[d]()))});if(c.isWindow(f))return f.document.compatMode==="CSS1Compat"&&f.document.documentElement["client"+b]||f.document.body["client"+b];else if(f.nodeType===9)return Math.max(f.documentElement["client"+
b],f.body["scroll"+b],f.documentElement["scroll"+b],f.body["offset"+b],f.documentElement["offset"+b]);else if(e===B){f=c.css(f,d);var h=parseFloat(f);return c.isNaN(h)?f:h}else return this.css(d,typeof e==="string"?e:e+"px")}})})(window);Namespace('SLAYER.JQUERY');SLAYER.JQUERY=jQuery.noConflict(true);/**
 * easyXDM
 * http://easyxdm.net/
 * Copyright(c) 2009-2011, Øyvind Sean Kinsey, oyvind@kinsey.no.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
(function(N,d,p,K,k,H){var b=this;var n=Math.floor(Math.random()*10000);var q=Function.prototype;var Q=/^((http.?:)\/\/([^:\/\s]+)(:\d+)*)/;var R=/[\-\w]+\/\.\.\//;var F=/([^:])\/\//g;var I="";var o={};var M=N.easyXDM;var U="easyXDM_";var E;var y=false;var i;var h;function C(X,Z){var Y=typeof X[Z];return Y=="function"||(!!(Y=="object"&&X[Z]))||Y=="unknown"}function u(X,Y){return !!(typeof(X[Y])=="object"&&X[Y])}function r(X){return Object.prototype.toString.call(X)==="[object Array]"}function c(){try{var X=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");i=Array.prototype.slice.call(X.GetVariable("$version").match(/(\d+),(\d+),(\d+),(\d+)/),1);h=parseInt(i[0],10)>9&&parseInt(i[1],10)>0;X=null;return true}catch(Y){return false}}var v,x;if(C(N,"addEventListener")){v=function(Z,X,Y){Z.addEventListener(X,Y,false)};x=function(Z,X,Y){Z.removeEventListener(X,Y,false)}}else{if(C(N,"attachEvent")){v=function(X,Z,Y){X.attachEvent("on"+Z,Y)};x=function(X,Z,Y){X.detachEvent("on"+Z,Y)}}else{throw new Error("Browser not supported")}}var W=false,J=[],L;if("readyState" in d){L=d.readyState;W=L=="complete"||(~navigator.userAgent.indexOf("AppleWebKit/")&&(L=="loaded"||L=="interactive"))}else{W=!!d.body}function s(){if(W){return}W=true;for(var X=0;X<J.length;X++){J[X]()}J.length=0}if(!W){if(C(N,"addEventListener")){v(d,"DOMContentLoaded",s)}else{v(d,"readystatechange",function(){if(d.readyState=="complete"){s()}});if(d.documentElement.doScroll&&N===top){var g=function(){if(W){return}try{d.documentElement.doScroll("left")}catch(X){K(g,1);return}s()};g()}}v(N,"load",s)}function G(Y,X){if(W){Y.call(X);return}J.push(function(){Y.call(X)})}function m(){var Z=parent;if(I!==""){for(var X=0,Y=I.split(".");X<Y.length;X++){Z=Z[Y[X]]}}return Z.easyXDM}function e(X){N.easyXDM=M;I=X;if(I){U="easyXDM_"+I.replace(".","_")+"_"}return o}function z(X){return X.match(Q)[3]}function f(X){return X.match(Q)[4]||""}function j(Z){var X=Z.toLowerCase().match(Q);var aa=X[2],ab=X[3],Y=X[4]||"";if((aa=="http:"&&Y==":80")||(aa=="https:"&&Y==":443")){Y=""}return aa+"//"+ab+Y}function B(X){X=X.replace(F,"$1/");if(!X.match(/^(http||https):\/\//)){var Y=(X.substring(0,1)==="/")?"":p.pathname;if(Y.substring(Y.length-1)!=="/"){Y=Y.substring(0,Y.lastIndexOf("/")+1)}X=p.protocol+"//"+p.host+Y+X}while(R.test(X)){X=X.replace(R,"")}return X}function P(X,aa){var ac="",Z=X.indexOf("#");if(Z!==-1){ac=X.substring(Z);X=X.substring(0,Z)}var ab=[];for(var Y in aa){if(aa.hasOwnProperty(Y)){ab.push(Y+"="+H(aa[Y]))}}return X+(y?"#":(X.indexOf("?")==-1?"?":"&"))+ab.join("&")+ac}var S=(function(X){X=X.substring(1).split("&");var Z={},aa,Y=X.length;while(Y--){aa=X[Y].split("=");Z[aa[0]]=k(aa[1])}return Z}(/xdm_e=/.test(p.search)?p.search:p.hash));function t(X){return typeof X==="undefined"}var O=function(){var Y={};var Z={a:[1,2,3]},X='{"a":[1,2,3]}';if(typeof JSON!="undefined"&&typeof JSON.stringify==="function"&&JSON.stringify(Z).replace((/\s/g),"")===X){return JSON}if(Object.toJSON){if(Object.toJSON(Z).replace((/\s/g),"")===X){Y.stringify=Object.toJSON}}if(typeof String.prototype.evalJSON==="function"){Z=X.evalJSON();if(Z.a&&Z.a.length===3&&Z.a[2]===3){Y.parse=function(aa){return aa.evalJSON()}}}if(Y.stringify&&Y.parse){O=function(){return Y};return Y}return null};function T(X,Y,Z){var ab;for(var aa in Y){if(Y.hasOwnProperty(aa)){if(aa in X){ab=Y[aa];if(typeof ab==="object"){T(X[aa],ab,Z)}else{if(!Z){X[aa]=Y[aa]}}}else{X[aa]=Y[aa]}}}return X}function a(){var Y=d.body.appendChild(d.createElement("form")),X=Y.appendChild(d.createElement("input"));X.name=U+"TEST"+n;E=X!==Y.elements[X.name];d.body.removeChild(Y)}function A(X){if(t(E)){a()}var Z;if(E){Z=d.createElement('<iframe name="'+X.props.name+'"/>')}else{Z=d.createElement("IFRAME");Z.name=X.props.name}Z.id=Z.name=X.props.name;delete X.props.name;if(X.onLoad){v(Z,"load",X.onLoad)}if(typeof X.container=="string"){X.container=d.getElementById(X.container)}if(!X.container){T(Z.style,{position:"absolute",top:"-2000px"});X.container=d.body}var Y=X.props.src;delete X.props.src;T(Z,X.props);Z.border=Z.frameBorder=0;Z.allowTransparency=true;X.container.appendChild(Z);Z.src=Y;X.props.src=Y;return Z}function V(aa,Z){if(typeof aa=="string"){aa=[aa]}var Y,X=aa.length;while(X--){Y=aa[X];Y=new RegExp(Y.substr(0,1)=="^"?Y:("^"+Y.replace(/(\*)/g,".$1").replace(/\?/g,".")+"$"));if(Y.test(Z)){return true}}return false}function l(Z){var ae=Z.protocol,Y;Z.isHost=Z.isHost||t(S.xdm_p);y=Z.hash||false;if(!Z.props){Z.props={}}if(!Z.isHost){Z.channel=S.xdm_c;Z.secret=S.xdm_s;Z.remote=S.xdm_e;ae=S.xdm_p;if(Z.acl&&!V(Z.acl,Z.remote)){throw new Error("Access denied for "+Z.remote)}}else{Z.remote=B(Z.remote);Z.channel=Z.channel||"default"+n++;Z.secret=Math.random().toString(16).substring(2);if(t(ae)){if(j(p.href)==j(Z.remote)){ae="4"}else{if(C(N,"postMessage")||C(d,"postMessage")){ae="1"}else{if(Z.swf&&C(N,"ActiveXObject")&&c()){ae="6"}else{if(navigator.product==="Gecko"&&"frameElement" in N&&navigator.userAgent.indexOf("WebKit")==-1){ae="5"}else{if(Z.remoteHelper){Z.remoteHelper=B(Z.remoteHelper);ae="2"}else{ae="0"}}}}}}}Z.protocol=ae;switch(ae){case"0":T(Z,{interval:100,delay:2000,useResize:true,useParent:false,usePolling:false},true);if(Z.isHost){if(!Z.local){var ac=p.protocol+"//"+p.host,X=d.body.getElementsByTagName("img"),ad;var aa=X.length;while(aa--){ad=X[aa];if(ad.src.substring(0,ac.length)===ac){Z.local=ad.src;break}}if(!Z.local){Z.local=N}}var ab={xdm_c:Z.channel,xdm_p:0};if(Z.local===N){Z.usePolling=true;Z.useParent=true;Z.local=p.protocol+"//"+p.host+p.pathname+p.search;ab.xdm_e=Z.local;ab.xdm_pa=1}else{ab.xdm_e=B(Z.local)}if(Z.container){Z.useResize=false;ab.xdm_po=1}Z.remote=P(Z.remote,ab)}else{T(Z,{channel:S.xdm_c,remote:S.xdm_e,useParent:!t(S.xdm_pa),usePolling:!t(S.xdm_po),useResize:Z.useParent?false:Z.useResize})}Y=[new o.stack.HashTransport(Z),new o.stack.ReliableBehavior({}),new o.stack.QueueBehavior({encode:true,maxLength:4000-Z.remote.length}),new o.stack.VerifyBehavior({initiate:Z.isHost})];break;case"1":Y=[new o.stack.PostMessageTransport(Z)];break;case"2":Y=[new o.stack.NameTransport(Z),new o.stack.QueueBehavior(),new o.stack.VerifyBehavior({initiate:Z.isHost})];break;case"3":Y=[new o.stack.NixTransport(Z)];break;case"4":Y=[new o.stack.SameOriginTransport(Z)];break;case"5":Y=[new o.stack.FrameElementTransport(Z)];break;case"6":if(!i){c()}Y=[new o.stack.FlashTransport(Z)];break}Y.push(new o.stack.QueueBehavior({lazy:Z.lazy,remove:true}));return Y}function D(aa){var ab,Z={incoming:function(ad,ac){this.up.incoming(ad,ac)},outgoing:function(ac,ad){this.down.outgoing(ac,ad)},callback:function(ac){this.up.callback(ac)},init:function(){this.down.init()},destroy:function(){this.down.destroy()}};for(var Y=0,X=aa.length;Y<X;Y++){ab=aa[Y];T(ab,Z,true);if(Y!==0){ab.down=aa[Y-1]}if(Y!==X-1){ab.up=aa[Y+1]}}return ab}function w(X){X.up.down=X.down;X.down.up=X.up;X.up=X.down=null}T(o,{version:"2.4.15.118",query:S,stack:{},apply:T,getJSONObject:O,whenReady:G,noConflict:e});o.DomHelper={on:v,un:x,requiresJSON:function(X){if(!u(N,"JSON")){d.write('<script type="text/javascript" src="'+X+'"><\/script>')}}};(function(){var X={};o.Fn={set:function(Y,Z){X[Y]=Z},get:function(Z,Y){var aa=X[Z];if(Y){delete X[Z]}return aa}}}());o.Socket=function(Y){var X=D(l(Y).concat([{incoming:function(ab,aa){Y.onMessage(ab,aa)},callback:function(aa){if(Y.onReady){Y.onReady(aa)}}}])),Z=j(Y.remote);this.origin=j(Y.remote);this.destroy=function(){X.destroy()};this.postMessage=function(aa){X.outgoing(aa,Z)};X.init()};o.Rpc=function(Z,Y){if(Y.local){for(var ab in Y.local){if(Y.local.hasOwnProperty(ab)){var aa=Y.local[ab];if(typeof aa==="function"){Y.local[ab]={method:aa}}}}}var X=D(l(Z).concat([new o.stack.RpcBehavior(this,Y),{callback:function(ac){if(Z.onReady){Z.onReady(ac)}}}]));this.origin=j(Z.remote);this.destroy=function(){X.destroy()};X.init()};o.stack.SameOriginTransport=function(Y){var Z,ab,aa,X;return(Z={outgoing:function(ad,ae,ac){aa(ad);if(ac){ac()}},destroy:function(){if(ab){ab.parentNode.removeChild(ab);ab=null}},onDOMReady:function(){X=j(Y.remote);if(Y.isHost){T(Y.props,{src:P(Y.remote,{xdm_e:p.protocol+"//"+p.host+p.pathname,xdm_c:Y.channel,xdm_p:4}),name:U+Y.channel+"_provider"});ab=A(Y);o.Fn.set(Y.channel,function(ac){aa=ac;K(function(){Z.up.callback(true)},0);return function(ad){Z.up.incoming(ad,X)}})}else{aa=m().Fn.get(Y.channel,true)(function(ac){Z.up.incoming(ac,X)});K(function(){Z.up.callback(true)},0)}},init:function(){G(Z.onDOMReady,Z)}})};o.stack.FlashTransport=function(aa){var ac,X,ab,ad,Y,ae;function af(ah,ag){K(function(){ac.up.incoming(ah,ad)},0)}function Z(ah){var ag=aa.swf+"?host="+aa.isHost;var aj="easyXDM_swf_"+Math.floor(Math.random()*10000);o.Fn.set("flash_loaded"+ah.replace(/[\-.]/g,"_"),function(){o.stack.FlashTransport[ah].swf=Y=ae.firstChild;var ak=o.stack.FlashTransport[ah].queue;for(var al=0;al<ak.length;al++){ak[al]()}ak.length=0});if(aa.swfContainer){ae=(typeof aa.swfContainer=="string")?d.getElementById(aa.swfContainer):aa.swfContainer}else{ae=d.createElement("div");T(ae.style,h&&aa.swfNoThrottle?{height:"20px",width:"20px",position:"fixed",right:0,top:0}:{height:"1px",width:"1px",position:"absolute",overflow:"hidden",right:0,top:0});d.body.appendChild(ae)}var ai="callback=flash_loaded"+ah.replace(/[\-.]/g,"_")+"&proto="+b.location.protocol+"&domain="+z(b.location.href)+"&port="+f(b.location.href)+"&ns="+I;ae.innerHTML="<object height='20' width='20' type='application/x-shockwave-flash' id='"+aj+"' data='"+ag+"'><param name='allowScriptAccess' value='always'></param><param name='wmode' value='transparent'><param name='movie' value='"+ag+"'></param><param name='flashvars' value='"+ai+"'></param><embed type='application/x-shockwave-flash' FlashVars='"+ai+"' allowScriptAccess='always' wmode='transparent' src='"+ag+"' height='1' width='1'></embed></object>"}return(ac={outgoing:function(ah,ai,ag){Y.postMessage(aa.channel,ah.toString());if(ag){ag()}},destroy:function(){try{Y.destroyChannel(aa.channel)}catch(ag){}Y=null;if(X){X.parentNode.removeChild(X);X=null}},onDOMReady:function(){ad=aa.remote;o.Fn.set("flash_"+aa.channel+"_init",function(){K(function(){ac.up.callback(true)})});o.Fn.set("flash_"+aa.channel+"_onMessage",af);aa.swf=B(aa.swf);var ah=z(aa.swf);var ag=function(){o.stack.FlashTransport[ah].init=true;Y=o.stack.FlashTransport[ah].swf;Y.createChannel(aa.channel,aa.secret,j(aa.remote),aa.isHost);if(aa.isHost){if(h&&aa.swfNoThrottle){T(aa.props,{position:"fixed",right:0,top:0,height:"20px",width:"20px"})}T(aa.props,{src:P(aa.remote,{xdm_e:j(p.href),xdm_c:aa.channel,xdm_p:6,xdm_s:aa.secret}),name:U+aa.channel+"_provider"});X=A(aa)}};if(o.stack.FlashTransport[ah]&&o.stack.FlashTransport[ah].init){ag()}else{if(!o.stack.FlashTransport[ah]){o.stack.FlashTransport[ah]={queue:[ag]};Z(ah)}else{o.stack.FlashTransport[ah].queue.push(ag)}}},init:function(){G(ac.onDOMReady,ac)}})};o.stack.PostMessageTransport=function(aa){var ac,ad,Y,Z;function X(ae){if(ae.origin){return j(ae.origin)}if(ae.uri){return j(ae.uri)}if(ae.domain){return p.protocol+"//"+ae.domain}throw"Unable to retrieve the origin of the event"}function ab(af){var ae=X(af);if(ae==Z&&af.data.substring(0,aa.channel.length+1)==aa.channel+" "){ac.up.incoming(af.data.substring(aa.channel.length+1),ae)}}return(ac={outgoing:function(af,ag,ae){Y.postMessage(aa.channel+" "+af,ag||Z);if(ae){ae()}},destroy:function(){x(N,"message",ab);if(ad){Y=null;ad.parentNode.removeChild(ad);ad=null}},onDOMReady:function(){Z=j(aa.remote);if(aa.isHost){var ae=function(af){if(af.data==aa.channel+"-ready"){Y=("postMessage" in ad.contentWindow)?ad.contentWindow:ad.contentWindow.document;x(N,"message",ae);v(N,"message",ab);K(function(){ac.up.callback(true)},0)}};v(N,"message",ae);T(aa.props,{src:P(aa.remote,{xdm_e:j(p.href),xdm_c:aa.channel,xdm_p:1}),name:U+aa.channel+"_provider"});ad=A(aa)}else{v(N,"message",ab);Y=("postMessage" in N.parent)?N.parent:N.parent.document;Y.postMessage(aa.channel+"-ready",Z);K(function(){ac.up.callback(true)},0)}},init:function(){G(ac.onDOMReady,ac)}})};o.stack.FrameElementTransport=function(Y){var Z,ab,aa,X;return(Z={outgoing:function(ad,ae,ac){aa.call(this,ad);if(ac){ac()}},destroy:function(){if(ab){ab.parentNode.removeChild(ab);ab=null}},onDOMReady:function(){X=j(Y.remote);if(Y.isHost){T(Y.props,{src:P(Y.remote,{xdm_e:j(p.href),xdm_c:Y.channel,xdm_p:5}),name:U+Y.channel+"_provider"});ab=A(Y);ab.fn=function(ac){delete ab.fn;aa=ac;K(function(){Z.up.callback(true)},0);return function(ad){Z.up.incoming(ad,X)}}}else{if(d.referrer&&j(d.referrer)!=S.xdm_e){N.top.location=S.xdm_e}aa=N.frameElement.fn(function(ac){Z.up.incoming(ac,X)});Z.up.callback(true)}},init:function(){G(Z.onDOMReady,Z)}})};o.stack.NameTransport=function(ab){var ac;var ae,ai,aa,ag,ah,Y,X;function af(al){var ak=ab.remoteHelper+(ae?"#_3":"#_2")+ab.channel;ai.contentWindow.sendMessage(al,ak)}function ad(){if(ae){if(++ag===2||!ae){ac.up.callback(true)}}else{af("ready");ac.up.callback(true)}}function aj(ak){ac.up.incoming(ak,Y)}function Z(){if(ah){K(function(){ah(true)},0)}}return(ac={outgoing:function(al,am,ak){ah=ak;af(al)},destroy:function(){ai.parentNode.removeChild(ai);ai=null;if(ae){aa.parentNode.removeChild(aa);aa=null}},onDOMReady:function(){ae=ab.isHost;ag=0;Y=j(ab.remote);ab.local=B(ab.local);if(ae){o.Fn.set(ab.channel,function(al){if(ae&&al==="ready"){o.Fn.set(ab.channel,aj);ad()}});X=P(ab.remote,{xdm_e:ab.local,xdm_c:ab.channel,xdm_p:2});T(ab.props,{src:X+"#"+ab.channel,name:U+ab.channel+"_provider"});aa=A(ab)}else{ab.remoteHelper=ab.remote;o.Fn.set(ab.channel,aj)}ai=A({props:{src:ab.local+"#_4"+ab.channel},onLoad:function ak(){var al=ai||this;x(al,"load",ak);o.Fn.set(ab.channel+"_load",Z);(function am(){if(typeof al.contentWindow.sendMessage=="function"){ad()}else{K(am,50)}}())}})},init:function(){G(ac.onDOMReady,ac)}})};o.stack.HashTransport=function(Z){var ac;var ah=this,af,aa,X,ad,am,ab,al;var ag,Y;function ak(ao){if(!al){return}var an=Z.remote+"#"+(am++)+"_"+ao;((af||!ag)?al.contentWindow:al).location=an}function ae(an){ad=an;ac.up.incoming(ad.substring(ad.indexOf("_")+1),Y)}function aj(){if(!ab){return}var an=ab.location.href,ap="",ao=an.indexOf("#");if(ao!=-1){ap=an.substring(ao)}if(ap&&ap!=ad){ae(ap)}}function ai(){aa=setInterval(aj,X)}return(ac={outgoing:function(an,ao){ak(an)},destroy:function(){N.clearInterval(aa);if(af||!ag){al.parentNode.removeChild(al)}al=null},onDOMReady:function(){af=Z.isHost;X=Z.interval;ad="#"+Z.channel;am=0;ag=Z.useParent;Y=j(Z.remote);if(af){Z.props={src:Z.remote,name:U+Z.channel+"_provider"};if(ag){Z.onLoad=function(){ab=N;ai();ac.up.callback(true)}}else{var ap=0,an=Z.delay/50;(function ao(){if(++ap>an){throw new Error("Unable to reference listenerwindow")}try{ab=al.contentWindow.frames[U+Z.channel+"_consumer"]}catch(aq){}if(ab){ai();ac.up.callback(true)}else{K(ao,50)}}())}al=A(Z)}else{ab=N;ai();if(ag){al=parent;ac.up.callback(true)}else{T(Z,{props:{src:Z.remote+"#"+Z.channel+new Date(),name:U+Z.channel+"_consumer"},onLoad:function(){ac.up.callback(true)}});al=A(Z)}}},init:function(){G(ac.onDOMReady,ac)}})};o.stack.ReliableBehavior=function(Y){var aa,ac;var ab=0,X=0,Z="";return(aa={incoming:function(af,ad){var ae=af.indexOf("_"),ag=af.substring(0,ae).split(",");af=af.substring(ae+1);if(ag[0]==ab){Z="";if(ac){ac(true)}}if(af.length>0){aa.down.outgoing(ag[1]+","+ab+"_"+Z,ad);if(X!=ag[1]){X=ag[1];aa.up.incoming(af,ad)}}},outgoing:function(af,ad,ae){Z=af;ac=ae;aa.down.outgoing(X+","+(++ab)+"_"+af,ad)}})};o.stack.QueueBehavior=function(Z){var ac,ad=[],ag=true,aa="",af,X=0,Y=false,ab=false;function ae(){if(Z.remove&&ad.length===0){w(ac);return}if(ag||ad.length===0||af){return}ag=true;var ah=ad.shift();ac.down.outgoing(ah.data,ah.origin,function(ai){ag=false;if(ah.callback){K(function(){ah.callback(ai)},0)}ae()})}return(ac={init:function(){if(t(Z)){Z={}}if(Z.maxLength){X=Z.maxLength;ab=true}if(Z.lazy){Y=true}else{ac.down.init()}},callback:function(ai){ag=false;var ah=ac.up;ae();ah.callback(ai)},incoming:function(ak,ai){if(ab){var aj=ak.indexOf("_"),ah=parseInt(ak.substring(0,aj),10);aa+=ak.substring(aj+1);if(ah===0){if(Z.encode){aa=k(aa)}ac.up.incoming(aa,ai);aa=""}}else{ac.up.incoming(ak,ai)}},outgoing:function(al,ai,ak){if(Z.encode){al=H(al)}var ah=[],aj;if(ab){while(al.length!==0){aj=al.substring(0,X);al=al.substring(aj.length);ah.push(aj)}while((aj=ah.shift())){ad.push({data:ah.length+"_"+aj,origin:ai,callback:ah.length===0?ak:null})}}else{ad.push({data:al,origin:ai,callback:ak})}if(Y){ac.down.init()}else{ae()}},destroy:function(){af=true;ac.down.destroy()}})};o.stack.VerifyBehavior=function(ab){var ac,aa,Y,Z=false;function X(){aa=Math.random().toString(16).substring(2);ac.down.outgoing(aa)}return(ac={incoming:function(af,ad){var ae=af.indexOf("_");if(ae===-1){if(af===aa){ac.up.callback(true)}else{if(!Y){Y=af;if(!ab.initiate){X()}ac.down.outgoing(af)}}}else{if(af.substring(0,ae)===Y){ac.up.incoming(af.substring(ae+1),ad)}}},outgoing:function(af,ad,ae){ac.down.outgoing(aa+"_"+af,ad,ae)},callback:function(ad){if(ab.initiate){X()}}})};o.stack.RpcBehavior=function(ad,Y){var aa,af=Y.serializer||O();var ae=0,ac={};function X(ag){ag.jsonrpc="2.0";aa.down.outgoing(af.stringify(ag))}function ab(ag,ai){var ah=Array.prototype.slice;return function(){var aj=arguments.length,al,ak={method:ai};if(aj>0&&typeof arguments[aj-1]==="function"){if(aj>1&&typeof arguments[aj-2]==="function"){al={success:arguments[aj-2],error:arguments[aj-1]};ak.params=ah.call(arguments,0,aj-2)}else{al={success:arguments[aj-1]};ak.params=ah.call(arguments,0,aj-1)}ac[""+(++ae)]=al;ak.id=ae}else{ak.params=ah.call(arguments,0)}if(ag.namedParams&&ak.params.length===1){ak.params=ak.params[0]}X(ak)}}function Z(an,am,ai,al){if(!ai){if(am){X({id:am,error:{code:-32601,message:"Procedure not found."}})}return}var ak,ah;if(am){ak=function(ao){ak=q;X({id:am,result:ao})};ah=function(ao,ap){ah=q;var aq={id:am,error:{code:-32099,message:ao}};if(ap){aq.error.data=ap}X(aq)}}else{ak=ah=q}if(!r(al)){al=[al]}try{var ag=ai.method.apply(ai.scope,al.concat([ak,ah]));if(!t(ag)){ak(ag)}}catch(aj){ah(aj.message)}}return(aa={incoming:function(ah,ag){var ai=af.parse(ah);if(ai.method){if(Y.handle){Y.handle(ai,X)}else{Z(ai.method,ai.id,Y.local[ai.method],ai.params)}}else{var aj=ac[ai.id];if(ai.error){if(aj.error){aj.error(ai.error)}}else{if(aj.success){aj.success(ai.result)}}delete ac[ai.id]}},init:function(){if(Y.remote){for(var ag in Y.remote){if(Y.remote.hasOwnProperty(ag)){ad[ag]=ab(Y.remote[ag],ag)}}}aa.down.init()},destroy:function(){for(var ag in Y.remote){if(Y.remote.hasOwnProperty(ag)&&ad.hasOwnProperty(ag)){delete ad[ag]}}aa.down.destroy()}})};b.easyXDM=o})(window,document,location,window.setTimeout,decodeURIComponent,encodeURIComponent);// Backbone.js 0.9.2

// (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
// Backbone may be freely distributed under the MIT license.
// For all details and documentation:
// http://backbonejs.org
(function(){var l=this,y=l.Backbone,z=Array.prototype.slice,A=Array.prototype.splice,g;g="undefined"!==typeof exports?exports:l.Backbone={};g.VERSION="0.9.2";var f=l._;!f&&"undefined"!==typeof require&&(f=require("underscore"));var i=l.jQuery||l.Zepto||l.ender;g.setDomLibrary=function(a){i=a};g.noConflict=function(){l.Backbone=y;return this};g.emulateHTTP=!1;g.emulateJSON=!1;var p=/\s+/,k=g.Events={on:function(a,b,c){var d,e,f,g,j;if(!b)return this;a=a.split(p);for(d=this._callbacks||(this._callbacks=
{});e=a.shift();)f=(j=d[e])?j.tail:{},f.next=g={},f.context=c,f.callback=b,d[e]={tail:g,next:j?j.next:f};return this},off:function(a,b,c){var d,e,h,g,j,q;if(e=this._callbacks){if(!a&&!b&&!c)return delete this._callbacks,this;for(a=a?a.split(p):f.keys(e);d=a.shift();)if(h=e[d],delete e[d],h&&(b||c))for(g=h.tail;(h=h.next)!==g;)if(j=h.callback,q=h.context,b&&j!==b||c&&q!==c)this.on(d,j,q);return this}},trigger:function(a){var b,c,d,e,f,g;if(!(d=this._callbacks))return this;f=d.all;a=a.split(p);for(g=
z.call(arguments,1);b=a.shift();){if(c=d[b])for(e=c.tail;(c=c.next)!==e;)c.callback.apply(c.context||this,g);if(c=f){e=c.tail;for(b=[b].concat(g);(c=c.next)!==e;)c.callback.apply(c.context||this,b)}}return this}};k.bind=k.on;k.unbind=k.off;var o=g.Model=function(a,b){var c;a||(a={});b&&b.parse&&(a=this.parse(a));if(c=n(this,"defaults"))a=f.extend({},c,a);b&&b.collection&&(this.collection=b.collection);this.attributes={};this._escapedAttributes={};this.cid=f.uniqueId("c");this.changed={};this._silent=
{};this._pending={};this.set(a,{silent:!0});this.changed={};this._silent={};this._pending={};this._previousAttributes=f.clone(this.attributes);this.initialize.apply(this,arguments)};f.extend(o.prototype,k,{changed:null,_silent:null,_pending:null,idAttribute:"id",initialize:function(){},toJSON:function(){return f.clone(this.attributes)},get:function(a){return this.attributes[a]},escape:function(a){var b;if(b=this._escapedAttributes[a])return b;b=this.get(a);return this._escapedAttributes[a]=f.escape(null==
b?"":""+b)},has:function(a){return null!=this.get(a)},set:function(a,b,c){var d,e;f.isObject(a)||null==a?(d=a,c=b):(d={},d[a]=b);c||(c={});if(!d)return this;d instanceof o&&(d=d.attributes);if(c.unset)for(e in d)d[e]=void 0;if(!this._validate(d,c))return!1;this.idAttribute in d&&(this.id=d[this.idAttribute]);var b=c.changes={},h=this.attributes,g=this._escapedAttributes,j=this._previousAttributes||{};for(e in d){a=d[e];if(!f.isEqual(h[e],a)||c.unset&&f.has(h,e))delete g[e],(c.silent?this._silent:
b)[e]=!0;c.unset?delete h[e]:h[e]=a;!f.isEqual(j[e],a)||f.has(h,e)!=f.has(j,e)?(this.changed[e]=a,c.silent||(this._pending[e]=!0)):(delete this.changed[e],delete this._pending[e])}c.silent||this.change(c);return this},unset:function(a,b){(b||(b={})).unset=!0;return this.set(a,null,b)},clear:function(a){(a||(a={})).unset=!0;return this.set(f.clone(this.attributes),a)},fetch:function(a){var a=a?f.clone(a):{},b=this,c=a.success;a.success=function(d,e,f){if(!b.set(b.parse(d,f),a))return!1;c&&c(b,d)};
a.error=g.wrapError(a.error,b,a);return(this.sync||g.sync).call(this,"read",this,a)},save:function(a,b,c){var d,e;f.isObject(a)||null==a?(d=a,c=b):(d={},d[a]=b);c=c?f.clone(c):{};if(c.wait){if(!this._validate(d,c))return!1;e=f.clone(this.attributes)}a=f.extend({},c,{silent:!0});if(d&&!this.set(d,c.wait?a:c))return!1;var h=this,i=c.success;c.success=function(a,b,e){b=h.parse(a,e);if(c.wait){delete c.wait;b=f.extend(d||{},b)}if(!h.set(b,c))return false;i?i(h,a):h.trigger("sync",h,a,c)};c.error=g.wrapError(c.error,
h,c);b=this.isNew()?"create":"update";b=(this.sync||g.sync).call(this,b,this,c);c.wait&&this.set(e,a);return b},destroy:function(a){var a=a?f.clone(a):{},b=this,c=a.success,d=function(){b.trigger("destroy",b,b.collection,a)};if(this.isNew())return d(),!1;a.success=function(e){a.wait&&d();c?c(b,e):b.trigger("sync",b,e,a)};a.error=g.wrapError(a.error,b,a);var e=(this.sync||g.sync).call(this,"delete",this,a);a.wait||d();return e},url:function(){var a=n(this,"urlRoot")||n(this.collection,"url")||t();
return this.isNew()?a:a+("/"==a.charAt(a.length-1)?"":"/")+encodeURIComponent(this.id)},parse:function(a){return a},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return null==this.id},change:function(a){a||(a={});var b=this._changing;this._changing=!0;for(var c in this._silent)this._pending[c]=!0;var d=f.extend({},a.changes,this._silent);this._silent={};for(c in d)this.trigger("change:"+c,this,this.get(c),a);if(b)return this;for(;!f.isEmpty(this._pending);){this._pending=
{};this.trigger("change",this,a);for(c in this.changed)!this._pending[c]&&!this._silent[c]&&delete this.changed[c];this._previousAttributes=f.clone(this.attributes)}this._changing=!1;return this},hasChanged:function(a){return!arguments.length?!f.isEmpty(this.changed):f.has(this.changed,a)},changedAttributes:function(a){if(!a)return this.hasChanged()?f.clone(this.changed):!1;var b,c=!1,d=this._previousAttributes,e;for(e in a)if(!f.isEqual(d[e],b=a[e]))(c||(c={}))[e]=b;return c},previous:function(a){return!arguments.length||
!this._previousAttributes?null:this._previousAttributes[a]},previousAttributes:function(){return f.clone(this._previousAttributes)},isValid:function(){return!this.validate(this.attributes)},_validate:function(a,b){if(b.silent||!this.validate)return!0;var a=f.extend({},this.attributes,a),c=this.validate(a,b);if(!c)return!0;b&&b.error?b.error(this,c,b):this.trigger("error",this,c,b);return!1}});var r=g.Collection=function(a,b){b||(b={});b.model&&(this.model=b.model);b.comparator&&(this.comparator=b.comparator);
this._reset();this.initialize.apply(this,arguments);a&&this.reset(a,{silent:!0,parse:b.parse})};f.extend(r.prototype,k,{model:o,initialize:function(){},toJSON:function(a){return this.map(function(b){return b.toJSON(a)})},add:function(a,b){var c,d,e,g,i,j={},k={},l=[];b||(b={});a=f.isArray(a)?a.slice():[a];c=0;for(d=a.length;c<d;c++){if(!(e=a[c]=this._prepareModel(a[c],b)))throw Error("Can't add an invalid model to a collection");g=e.cid;i=e.id;j[g]||this._byCid[g]||null!=i&&(k[i]||this._byId[i])?
l.push(c):j[g]=k[i]=e}for(c=l.length;c--;)a.splice(l[c],1);c=0;for(d=a.length;c<d;c++)(e=a[c]).on("all",this._onModelEvent,this),this._byCid[e.cid]=e,null!=e.id&&(this._byId[e.id]=e);this.length+=d;A.apply(this.models,[null!=b.at?b.at:this.models.length,0].concat(a));this.comparator&&this.sort({silent:!0});if(b.silent)return this;c=0;for(d=this.models.length;c<d;c++)if(j[(e=this.models[c]).cid])b.index=c,e.trigger("add",e,this,b);return this},remove:function(a,b){var c,d,e,g;b||(b={});a=f.isArray(a)?
a.slice():[a];c=0;for(d=a.length;c<d;c++)if(g=this.getByCid(a[c])||this.get(a[c]))delete this._byId[g.id],delete this._byCid[g.cid],e=this.indexOf(g),this.models.splice(e,1),this.length--,b.silent||(b.index=e,g.trigger("remove",g,this,b)),this._removeReference(g);return this},push:function(a,b){a=this._prepareModel(a,b);this.add(a,b);return a},pop:function(a){var b=this.at(this.length-1);this.remove(b,a);return b},unshift:function(a,b){a=this._prepareModel(a,b);this.add(a,f.extend({at:0},b));return a},
shift:function(a){var b=this.at(0);this.remove(b,a);return b},get:function(a){return null==a?void 0:this._byId[null!=a.id?a.id:a]},getByCid:function(a){return a&&this._byCid[a.cid||a]},at:function(a){return this.models[a]},where:function(a){return f.isEmpty(a)?[]:this.filter(function(b){for(var c in a)if(a[c]!==b.get(c))return!1;return!0})},sort:function(a){a||(a={});if(!this.comparator)throw Error("Cannot sort a set without a comparator");var b=f.bind(this.comparator,this);1==this.comparator.length?
this.models=this.sortBy(b):this.models.sort(b);a.silent||this.trigger("reset",this,a);return this},pluck:function(a){return f.map(this.models,function(b){return b.get(a)})},reset:function(a,b){a||(a=[]);b||(b={});for(var c=0,d=this.models.length;c<d;c++)this._removeReference(this.models[c]);this._reset();this.add(a,f.extend({silent:!0},b));b.silent||this.trigger("reset",this,b);return this},fetch:function(a){a=a?f.clone(a):{};void 0===a.parse&&(a.parse=!0);var b=this,c=a.success;a.success=function(d,
e,f){b[a.add?"add":"reset"](b.parse(d,f),a);c&&c(b,d)};a.error=g.wrapError(a.error,b,a);return(this.sync||g.sync).call(this,"read",this,a)},create:function(a,b){var c=this,b=b?f.clone(b):{},a=this._prepareModel(a,b);if(!a)return!1;b.wait||c.add(a,b);var d=b.success;b.success=function(e,f){b.wait&&c.add(e,b);d?d(e,f):e.trigger("sync",a,f,b)};a.save(null,b);return a},parse:function(a){return a},chain:function(){return f(this.models).chain()},_reset:function(){this.length=0;this.models=[];this._byId=
{};this._byCid={}},_prepareModel:function(a,b){b||(b={});a instanceof o?a.collection||(a.collection=this):(b.collection=this,a=new this.model(a,b),a._validate(a.attributes,b)||(a=!1));return a},_removeReference:function(a){this==a.collection&&delete a.collection;a.off("all",this._onModelEvent,this)},_onModelEvent:function(a,b,c,d){("add"==a||"remove"==a)&&c!=this||("destroy"==a&&this.remove(b,d),b&&a==="change:"+b.idAttribute&&(delete this._byId[b.previous(b.idAttribute)],this._byId[b.id]=b),this.trigger.apply(this,
arguments))}});f.each("forEach,each,map,reduce,reduceRight,find,detect,filter,select,reject,every,all,some,any,include,contains,invoke,max,min,sortBy,sortedIndex,toArray,size,first,initial,rest,last,without,indexOf,shuffle,lastIndexOf,isEmpty,groupBy".split(","),function(a){r.prototype[a]=function(){return f[a].apply(f,[this.models].concat(f.toArray(arguments)))}});var u=g.Router=function(a){a||(a={});a.routes&&(this.routes=a.routes);this._bindRoutes();this.initialize.apply(this,arguments)},B=/:\w+/g,
C=/\*\w+/g,D=/[-[\]{}()+?.,\\^$|#\s]/g;f.extend(u.prototype,k,{initialize:function(){},route:function(a,b,c){g.history||(g.history=new m);f.isRegExp(a)||(a=this._routeToRegExp(a));c||(c=this[b]);g.history.route(a,f.bind(function(d){d=this._extractParameters(a,d);c&&c.apply(this,d);this.trigger.apply(this,["route:"+b].concat(d));g.history.trigger("route",this,b,d)},this));return this},navigate:function(a,b){g.history.navigate(a,b)},_bindRoutes:function(){if(this.routes){var a=[],b;for(b in this.routes)a.unshift([b,
this.routes[b]]);b=0;for(var c=a.length;b<c;b++)this.route(a[b][0],a[b][1],this[a[b][1]])}},_routeToRegExp:function(a){a=a.replace(D,"\\$&").replace(B,"([^/]+)").replace(C,"(.*?)");return RegExp("^"+a+"$")},_extractParameters:function(a,b){return a.exec(b).slice(1)}});var m=g.History=function(){this.handlers=[];f.bindAll(this,"checkUrl")},s=/^[#\/]/,E=/msie [\w.]+/;m.started=!1;f.extend(m.prototype,k,{interval:50,getHash:function(a){return(a=(a?a.location:window.location).href.match(/#(.*)$/))?a[1]:
""},getFragment:function(a,b){if(null==a)if(this._hasPushState||b){var a=window.location.pathname,c=window.location.search;c&&(a+=c)}else a=this.getHash();a.indexOf(this.options.root)||(a=a.substr(this.options.root.length));return a.replace(s,"")},start:function(a){if(m.started)throw Error("Backbone.history has already been started");m.started=!0;this.options=f.extend({},{root:"/"},this.options,a);this._wantsHashChange=!1!==this.options.hashChange;this._wantsPushState=!!this.options.pushState;this._hasPushState=
!(!this.options.pushState||!window.history||!window.history.pushState);var a=this.getFragment(),b=document.documentMode;if(b=E.exec(navigator.userAgent.toLowerCase())&&(!b||7>=b))this.iframe=i('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow,this.navigate(a);this._hasPushState?i(window).bind("popstate",this.checkUrl):this._wantsHashChange&&"onhashchange"in window&&!b?i(window).bind("hashchange",this.checkUrl):this._wantsHashChange&&(this._checkUrlInterval=setInterval(this.checkUrl,
this.interval));this.fragment=a;a=window.location;b=a.pathname==this.options.root;if(this._wantsHashChange&&this._wantsPushState&&!this._hasPushState&&!b)return this.fragment=this.getFragment(null,!0),window.location.replace(this.options.root+"#"+this.fragment),!0;this._wantsPushState&&this._hasPushState&&b&&a.hash&&(this.fragment=this.getHash().replace(s,""),window.history.replaceState({},document.title,a.protocol+"//"+a.host+this.options.root+this.fragment));if(!this.options.silent)return this.loadUrl()},
stop:function(){i(window).unbind("popstate",this.checkUrl).unbind("hashchange",this.checkUrl);clearInterval(this._checkUrlInterval);m.started=!1},route:function(a,b){this.handlers.unshift({route:a,callback:b})},checkUrl:function(){var a=this.getFragment();a==this.fragment&&this.iframe&&(a=this.getFragment(this.getHash(this.iframe)));if(a==this.fragment)return!1;this.iframe&&this.navigate(a);this.loadUrl()||this.loadUrl(this.getHash())},loadUrl:function(a){var b=this.fragment=this.getFragment(a);return f.any(this.handlers,
function(a){if(a.route.test(b))return a.callback(b),!0})},navigate:function(a,b){if(!m.started)return!1;if(!b||!0===b)b={trigger:b};var c=(a||"").replace(s,"");this.fragment!=c&&(this._hasPushState?(0!=c.indexOf(this.options.root)&&(c=this.options.root+c),this.fragment=c,window.history[b.replace?"replaceState":"pushState"]({},document.title,c)):this._wantsHashChange?(this.fragment=c,this._updateHash(window.location,c,b.replace),this.iframe&&c!=this.getFragment(this.getHash(this.iframe))&&(b.replace||
this.iframe.document.open().close(),this._updateHash(this.iframe.location,c,b.replace))):window.location.assign(this.options.root+a),b.trigger&&this.loadUrl(a))},_updateHash:function(a,b,c){c?a.replace(a.toString().replace(/(javascript:|#).*$/,"")+"#"+b):a.hash=b}});var v=g.View=function(a){this.cid=f.uniqueId("view");this._configure(a||{});this._ensureElement();this.initialize.apply(this,arguments);this.delegateEvents()},F=/^(\S+)\s*(.*)$/,w="model,collection,el,id,attributes,className,tagName".split(",");
f.extend(v.prototype,k,{tagName:"div",$:function(a){return this.$el.find(a)},initialize:function(){},render:function(){return this},remove:function(){this.$el.remove();return this},make:function(a,b,c){a=document.createElement(a);b&&i(a).attr(b);c&&i(a).html(c);return a},setElement:function(a,b){this.$el&&this.undelegateEvents();this.$el=a instanceof i?a:i(a);this.el=this.$el[0];!1!==b&&this.delegateEvents();return this},delegateEvents:function(a){if(a||(a=n(this,"events"))){this.undelegateEvents();
for(var b in a){var c=a[b];f.isFunction(c)||(c=this[a[b]]);if(!c)throw Error('Method "'+a[b]+'" does not exist');var d=b.match(F),e=d[1],d=d[2],c=f.bind(c,this),e=e+(".delegateEvents"+this.cid);""===d?this.$el.bind(e,c):this.$el.delegate(d,e,c)}}},undelegateEvents:function(){this.$el.unbind(".delegateEvents"+this.cid)},_configure:function(a){this.options&&(a=f.extend({},this.options,a));for(var b=0,c=w.length;b<c;b++){var d=w[b];a[d]&&(this[d]=a[d])}this.options=a},_ensureElement:function(){if(this.el)this.setElement(this.el,
!1);else{var a=n(this,"attributes")||{};this.id&&(a.id=this.id);this.className&&(a["class"]=this.className);this.setElement(this.make(this.tagName,a),!1)}}});o.extend=r.extend=u.extend=v.extend=function(a,b){var c=G(this,a,b);c.extend=this.extend;return c};var H={create:"POST",update:"PUT","delete":"DELETE",read:"GET"};g.sync=function(a,b,c){var d=H[a];c||(c={});var e={type:d,dataType:"json"};c.url||(e.url=n(b,"url")||t());if(!c.data&&b&&("create"==a||"update"==a))e.contentType="application/json",
e.data=JSON.stringify(b.toJSON());g.emulateJSON&&(e.contentType="application/x-www-form-urlencoded",e.data=e.data?{model:e.data}:{});if(g.emulateHTTP&&("PUT"===d||"DELETE"===d))g.emulateJSON&&(e.data._method=d),e.type="POST",e.beforeSend=function(a){a.setRequestHeader("X-HTTP-Method-Override",d)};"GET"!==e.type&&!g.emulateJSON&&(e.processData=!1);return i.ajax(f.extend(e,c))};g.wrapError=function(a,b,c){return function(d,e){e=d===b?e:d;a?a(b,e,c):b.trigger("error",b,e,c)}};var x=function(){},G=function(a,
b,c){var d;d=b&&b.hasOwnProperty("constructor")?b.constructor:function(){a.apply(this,arguments)};f.extend(d,a);x.prototype=a.prototype;d.prototype=new x;b&&f.extend(d.prototype,b);c&&f.extend(d,c);d.prototype.constructor=d;d.__super__=a.prototype;return d},n=function(a,b){return!a||!a[b]?null:f.isFunction(a[b])?a[b]():a[b]},t=function(){throw Error('A "url" property or function must be specified');}}).call(this);
function apprise(string,args,callback)
{var default_args={'confirm':false,'verify':false,'input':false,'animate':false,'textOk':'Ok','textCancel':'Cancel','textYes':'Yes','textNo':'No'}
if(args)
{for(var index in default_args)
{if(typeof args[index]=="undefined")args[index]=default_args[index];}}
var aHeight=$(document).height();var aWidth=$(document).width();$('body').append('<div class="appriseOverlay" id="aOverlay"></div>');$('.appriseOverlay').css('height',aHeight).css('width',aWidth).fadeIn(100);$('body').append('<div class="appriseOuter"></div>');$('.appriseOuter').append('<div class="appriseInner"></div>');$('.appriseInner').append(string);$('.appriseOuter').css("left",($(window).width()-$('.appriseOuter').width())/2+$(window).scrollLeft()+"px");if(args)
{if(args['animate'])
{var aniSpeed=args['animate'];if(isNaN(aniSpeed)){aniSpeed=400;}
$('.appriseOuter').css('top','-200px').show().animate({top:"100px"},aniSpeed);}
else
{$('.appriseOuter').css('top','100px').fadeIn(200);}}
else
{$('.appriseOuter').css('top','100px').fadeIn(200);}
if(args)
{if(args['input'])
{if(typeof(args['input'])=='string')
{$('.appriseInner').append('<div class="aInput"><input type="text" class="aTextbox" t="aTextbox" value="'+args['input']+'" /></div>');}
else
{$('.appriseInner').append('<div class="aInput"><input type="text" class="aTextbox" t="aTextbox" /></div>');}
$('.aTextbox').focus();}}
$('.appriseInner').append('<div class="aButtons"></div>');if(args)
{if(args['confirm']||args['input'])
{$('.aButtons').append('<button value="ok">'+args['textOk']+'</button>');$('.aButtons').append('<button value="cancel">'+args['textCancel']+'</button>');}
else if(args['verify'])
{$('.aButtons').append('<button value="ok">'+args['textYes']+'</button>');$('.aButtons').append('<button value="cancel">'+args['textNo']+'</button>');}
else
{$('.aButtons').append('<button value="ok">'+args['textOk']+'</button>');}}
else
{$('.aButtons').append('<button value="ok">Ok</button>');}
$(document).keydown(function(e)
{if($('.appriseOverlay').is(':visible'))
{if(e.keyCode==13)
{$('.aButtons > button[value="ok"]').click();}
if(e.keyCode==27)
{$('.aButtons > button[value="cancel"]').click();}}});var aText=$('.aTextbox').val();if(!aText){aText=false;}
$('.aTextbox').keyup(function()
{aText=$(this).val();});$('.aButtons > button').click(function()
{$('.appriseOverlay').remove();$('.appriseOuter').remove();if(callback)
{var wButton=$(this).attr("value");if(wButton=='ok')
{if(args)
{if(args['input'])
{callback(aText);}
else
{callback(true);}}
else
{callback(true);}}
else if(wButton=='cancel')
{callback(false);}}});}/*
 * jScrollPane - v2.0.0beta11 - 2011-07-04
 * http://jscrollpane.kelvinluck.com/
 *
 * Copyright (c) 2010 Kelvin Luck
 * Dual licensed under the MIT and GPL licenses.
 */
(function(b,a,c){b.fn.jScrollPane=function(e){function d(D,O){var az,Q=this,Y,ak,v,am,T,Z,y,q,aA,aF,av,i,I,h,j,aa,U,aq,X,t,A,ar,af,an,G,l,au,ay,x,aw,aI,f,L,aj=true,P=true,aH=false,k=false,ap=D.clone(false,false).empty(),ac=b.fn.mwheelIntent?"mwheelIntent.jsp":"mousewheel.jsp";aI=D.css("paddingTop")+" "+D.css("paddingRight")+" "+D.css("paddingBottom")+" "+D.css("paddingLeft");f=(parseInt(D.css("paddingLeft"),10)||0)+(parseInt(D.css("paddingRight"),10)||0);function at(aR){var aM,aO,aN,aK,aJ,aQ,aP=false,aL=false;az=aR;if(Y===c){aJ=D.scrollTop();aQ=D.scrollLeft();D.css({overflow:"hidden",padding:0});ak=D.innerWidth()+f;v=D.innerHeight();D.width(ak);Y=b('<div class="jspPane" />').css("padding",aI).append(D.children());am=b('<div class="jspContainer" />').css({width:ak+"px",height:v+"px"}).append(Y).appendTo(D)}else{D.css("width","");aP=az.stickToBottom&&K();aL=az.stickToRight&&B();aK=D.innerWidth()+f!=ak||D.outerHeight()!=v;if(aK){ak=D.innerWidth()+f;v=D.innerHeight();am.css({width:ak+"px",height:v+"px"})}if(!aK&&L==T&&Y.outerHeight()==Z){D.width(ak);return}L=T;Y.css("width","");D.width(ak);am.find(">.jspVerticalBar,>.jspHorizontalBar").remove().end()}Y.css("overflow","auto");if(aR.contentWidth){T=aR.contentWidth}else{T=Y[0].scrollWidth}Z=Y[0].scrollHeight;Y.css("overflow","");y=T/ak;q=Z/v;aA=q>1;aF=y>1;if(!(aF||aA)){D.removeClass("jspScrollable");Y.css({top:0,width:am.width()-f});n();E();R();w();ai()}else{D.addClass("jspScrollable");aM=az.maintainPosition&&(I||aa);if(aM){aO=aD();aN=aB()}aG();z();F();if(aM){N(aL?(T-ak):aO,false);M(aP?(Z-v):aN,false)}J();ag();ao();if(az.enableKeyboardNavigation){S()}if(az.clickOnTrack){p()}C();if(az.hijackInternalLinks){m()}}if(az.autoReinitialise&&!aw){aw=setInterval(function(){at(az)},az.autoReinitialiseDelay)}else{if(!az.autoReinitialise&&aw){clearInterval(aw)}}aJ&&D.scrollTop(0)&&M(aJ,false);aQ&&D.scrollLeft(0)&&N(aQ,false);D.trigger("jsp-initialised",[aF||aA])}function aG(){if(aA){am.append(b('<div class="jspVerticalBar" />').append(b('<div class="jspCap jspCapTop" />'),b('<div class="jspTrack" />').append(b('<div class="jspDrag" />').append(b('<div class="jspDragTop" />'),b('<div class="jspDragBottom" />'))),b('<div class="jspCap jspCapBottom" />')));U=am.find(">.jspVerticalBar");aq=U.find(">.jspTrack");av=aq.find(">.jspDrag");if(az.showArrows){ar=b('<a class="jspArrow jspArrowUp" />').bind("mousedown.jsp",aE(0,-1)).bind("click.jsp",aC);af=b('<a class="jspArrow jspArrowDown" />').bind("mousedown.jsp",aE(0,1)).bind("click.jsp",aC);if(az.arrowScrollOnHover){ar.bind("mouseover.jsp",aE(0,-1,ar));af.bind("mouseover.jsp",aE(0,1,af))}al(aq,az.verticalArrowPositions,ar,af)}t=v;am.find(">.jspVerticalBar>.jspCap:visible,>.jspVerticalBar>.jspArrow").each(function(){t-=b(this).outerHeight()});av.hover(function(){av.addClass("jspHover")},function(){av.removeClass("jspHover")}).bind("mousedown.jsp",function(aJ){b("html").bind("dragstart.jsp selectstart.jsp",aC);av.addClass("jspActive");var s=aJ.pageY-av.position().top;b("html").bind("mousemove.jsp",function(aK){V(aK.pageY-s,false)}).bind("mouseup.jsp mouseleave.jsp",ax);return false});o()}}function o(){aq.height(t+"px");I=0;X=az.verticalGutter+aq.outerWidth();Y.width(ak-X-f);try{if(U.position().left===0){Y.css("margin-left",X+"px")}}catch(s){}}function z(){if(aF){am.append(b('<div class="jspHorizontalBar" />').append(b('<div class="jspCap jspCapLeft" />'),b('<div class="jspTrack" />').append(b('<div class="jspDrag" />').append(b('<div class="jspDragLeft" />'),b('<div class="jspDragRight" />'))),b('<div class="jspCap jspCapRight" />')));an=am.find(">.jspHorizontalBar");G=an.find(">.jspTrack");h=G.find(">.jspDrag");if(az.showArrows){ay=b('<a class="jspArrow jspArrowLeft" />').bind("mousedown.jsp",aE(-1,0)).bind("click.jsp",aC);x=b('<a class="jspArrow jspArrowRight" />').bind("mousedown.jsp",aE(1,0)).bind("click.jsp",aC);
if(az.arrowScrollOnHover){ay.bind("mouseover.jsp",aE(-1,0,ay));x.bind("mouseover.jsp",aE(1,0,x))}al(G,az.horizontalArrowPositions,ay,x)}h.hover(function(){h.addClass("jspHover")},function(){h.removeClass("jspHover")}).bind("mousedown.jsp",function(aJ){b("html").bind("dragstart.jsp selectstart.jsp",aC);h.addClass("jspActive");var s=aJ.pageX-h.position().left;b("html").bind("mousemove.jsp",function(aK){W(aK.pageX-s,false)}).bind("mouseup.jsp mouseleave.jsp",ax);return false});l=am.innerWidth();ah()}}function ah(){am.find(">.jspHorizontalBar>.jspCap:visible,>.jspHorizontalBar>.jspArrow").each(function(){l-=b(this).outerWidth()});G.width(l+"px");aa=0}function F(){if(aF&&aA){var aJ=G.outerHeight(),s=aq.outerWidth();t-=aJ;b(an).find(">.jspCap:visible,>.jspArrow").each(function(){l+=b(this).outerWidth()});l-=s;v-=s;ak-=aJ;G.parent().append(b('<div class="jspCorner" />').css("width",aJ+"px"));o();ah()}if(aF){Y.width((am.outerWidth()-f)+"px")}Z=Y.outerHeight();q=Z/v;if(aF){au=Math.ceil(1/y*l);if(au>az.horizontalDragMaxWidth){au=az.horizontalDragMaxWidth}else{if(au<az.horizontalDragMinWidth){au=az.horizontalDragMinWidth}}h.width(au+"px");j=l-au;ae(aa)}if(aA){A=Math.ceil(1/q*t);if(A>az.verticalDragMaxHeight){A=az.verticalDragMaxHeight}else{if(A<az.verticalDragMinHeight){A=az.verticalDragMinHeight}}av.height(A+"px");i=t-A;ad(I)}}function al(aK,aM,aJ,s){var aO="before",aL="after",aN;if(aM=="os"){aM=/Mac/.test(navigator.platform)?"after":"split"}if(aM==aO){aL=aM}else{if(aM==aL){aO=aM;aN=aJ;aJ=s;s=aN}}aK[aO](aJ)[aL](s)}function aE(aJ,s,aK){return function(){H(aJ,s,this,aK);this.blur();return false}}function H(aM,aL,aP,aO){aP=b(aP).addClass("jspActive");var aN,aK,aJ=true,s=function(){if(aM!==0){Q.scrollByX(aM*az.arrowButtonSpeed)}if(aL!==0){Q.scrollByY(aL*az.arrowButtonSpeed)}aK=setTimeout(s,aJ?az.initialDelay:az.arrowRepeatFreq);aJ=false};s();aN=aO?"mouseout.jsp":"mouseup.jsp";aO=aO||b("html");aO.bind(aN,function(){aP.removeClass("jspActive");aK&&clearTimeout(aK);aK=null;aO.unbind(aN)})}function p(){w();if(aA){aq.bind("mousedown.jsp",function(aO){if(aO.originalTarget===c||aO.originalTarget==aO.currentTarget){var aM=b(this),aP=aM.offset(),aN=aO.pageY-aP.top-I,aK,aJ=true,s=function(){var aS=aM.offset(),aT=aO.pageY-aS.top-A/2,aQ=v*az.scrollPagePercent,aR=i*aQ/(Z-v);if(aN<0){if(I-aR>aT){Q.scrollByY(-aQ)}else{V(aT)}}else{if(aN>0){if(I+aR<aT){Q.scrollByY(aQ)}else{V(aT)}}else{aL();return}}aK=setTimeout(s,aJ?az.initialDelay:az.trackClickRepeatFreq);aJ=false},aL=function(){aK&&clearTimeout(aK);aK=null;b(document).unbind("mouseup.jsp",aL)};s();b(document).bind("mouseup.jsp",aL);return false}})}if(aF){G.bind("mousedown.jsp",function(aO){if(aO.originalTarget===c||aO.originalTarget==aO.currentTarget){var aM=b(this),aP=aM.offset(),aN=aO.pageX-aP.left-aa,aK,aJ=true,s=function(){var aS=aM.offset(),aT=aO.pageX-aS.left-au/2,aQ=ak*az.scrollPagePercent,aR=j*aQ/(T-ak);if(aN<0){if(aa-aR>aT){Q.scrollByX(-aQ)}else{W(aT)}}else{if(aN>0){if(aa+aR<aT){Q.scrollByX(aQ)}else{W(aT)}}else{aL();return}}aK=setTimeout(s,aJ?az.initialDelay:az.trackClickRepeatFreq);aJ=false},aL=function(){aK&&clearTimeout(aK);aK=null;b(document).unbind("mouseup.jsp",aL)};s();b(document).bind("mouseup.jsp",aL);return false}})}}function w(){if(G){G.unbind("mousedown.jsp")}if(aq){aq.unbind("mousedown.jsp")}}function ax(){b("html").unbind("dragstart.jsp selectstart.jsp mousemove.jsp mouseup.jsp mouseleave.jsp");if(av){av.removeClass("jspActive")}if(h){h.removeClass("jspActive")}}function V(s,aJ){if(!aA){return}if(s<0){s=0}else{if(s>i){s=i}}if(aJ===c){aJ=az.animateScroll}if(aJ){Q.animate(av,"top",s,ad)}else{av.css("top",s);ad(s)}}function ad(aJ){if(aJ===c){aJ=av.position().top}am.scrollTop(0);I=aJ;var aM=I===0,aK=I==i,aL=aJ/i,s=-aL*(Z-v);if(aj!=aM||aH!=aK){aj=aM;aH=aK;D.trigger("jsp-arrow-change",[aj,aH,P,k])}u(aM,aK);Y.css("top",s);D.trigger("jsp-scroll-y",[-s,aM,aK]).trigger("scroll")}function W(aJ,s){if(!aF){return}if(aJ<0){aJ=0}else{if(aJ>j){aJ=j}}if(s===c){s=az.animateScroll}if(s){Q.animate(h,"left",aJ,ae)
}else{h.css("left",aJ);ae(aJ)}}function ae(aJ){if(aJ===c){aJ=h.position().left}am.scrollTop(0);aa=aJ;var aM=aa===0,aL=aa==j,aK=aJ/j,s=-aK*(T-ak);if(P!=aM||k!=aL){P=aM;k=aL;D.trigger("jsp-arrow-change",[aj,aH,P,k])}r(aM,aL);Y.css("left",s);D.trigger("jsp-scroll-x",[-s,aM,aL]).trigger("scroll")}function u(aJ,s){if(az.showArrows){ar[aJ?"addClass":"removeClass"]("jspDisabled");af[s?"addClass":"removeClass"]("jspDisabled")}}function r(aJ,s){if(az.showArrows){ay[aJ?"addClass":"removeClass"]("jspDisabled");x[s?"addClass":"removeClass"]("jspDisabled")}}function M(s,aJ){var aK=s/(Z-v);V(aK*i,aJ)}function N(aJ,s){var aK=aJ/(T-ak);W(aK*j,s)}function ab(aW,aR,aK){var aO,aL,aM,s=0,aV=0,aJ,aQ,aP,aT,aS,aU;try{aO=b(aW)}catch(aN){return}aL=aO.outerHeight();aM=aO.outerWidth();am.scrollTop(0);am.scrollLeft(0);while(!aO.is(".jspPane")){s+=aO.position().top;aV+=aO.position().left;aO=aO.offsetParent();if(/^body|html$/i.test(aO[0].nodeName)){return}}aJ=aB();aP=aJ+v;if(s<aJ||aR){aS=s-az.verticalGutter}else{if(s+aL>aP){aS=s-v+aL+az.verticalGutter}}if(aS){M(aS,aK)}aQ=aD();aT=aQ+ak;if(aV<aQ||aR){aU=aV-az.horizontalGutter}else{if(aV+aM>aT){aU=aV-ak+aM+az.horizontalGutter}}if(aU){N(aU,aK)}}function aD(){return -Y.position().left}function aB(){return -Y.position().top}function K(){var s=Z-v;return(s>20)&&(s-aB()<10)}function B(){var s=T-ak;return(s>20)&&(s-aD()<10)}function ag(){am.unbind(ac).bind(ac,function(aM,aN,aL,aJ){var aK=aa,s=I;Q.scrollBy(aL*az.mouseWheelSpeed,-aJ*az.mouseWheelSpeed,false);return aK==aa&&s==I})}function n(){am.unbind(ac)}function aC(){return false}function J(){Y.find(":input,a").unbind("focus.jsp").bind("focus.jsp",function(s){ab(s.target,false)})}function E(){Y.find(":input,a").unbind("focus.jsp")}function S(){var s,aJ,aL=[];aF&&aL.push(an[0]);aA&&aL.push(U[0]);Y.focus(function(){D.focus()});D.attr("tabindex",0).unbind("keydown.jsp keypress.jsp").bind("keydown.jsp",function(aO){if(aO.target!==this&&!(aL.length&&b(aO.target).closest(aL).length)){return}var aN=aa,aM=I;switch(aO.keyCode){case 40:case 38:case 34:case 32:case 33:case 39:case 37:s=aO.keyCode;aK();break;case 35:M(Z-v);s=null;break;case 36:M(0);s=null;break}aJ=aO.keyCode==s&&aN!=aa||aM!=I;return !aJ}).bind("keypress.jsp",function(aM){if(aM.keyCode==s){aK()}return !aJ});if(az.hideFocus){D.css("outline","none");if("hideFocus" in am[0]){D.attr("hideFocus",true)}}else{D.css("outline","");if("hideFocus" in am[0]){D.attr("hideFocus",false)}}function aK(){var aN=aa,aM=I;switch(s){case 40:Q.scrollByY(az.keyboardSpeed,false);break;case 38:Q.scrollByY(-az.keyboardSpeed,false);break;case 34:case 32:Q.scrollByY(v*az.scrollPagePercent,false);break;case 33:Q.scrollByY(-v*az.scrollPagePercent,false);break;case 39:Q.scrollByX(az.keyboardSpeed,false);break;case 37:Q.scrollByX(-az.keyboardSpeed,false);break}aJ=aN!=aa||aM!=I;return aJ}}function R(){D.attr("tabindex","-1").removeAttr("tabindex").unbind("keydown.jsp keypress.jsp")}function C(){if(location.hash&&location.hash.length>1){var aL,aJ,aK=escape(location.hash);try{aL=b(aK)}catch(s){return}if(aL.length&&Y.find(aK)){if(am.scrollTop()===0){aJ=setInterval(function(){if(am.scrollTop()>0){ab(aK,true);b(document).scrollTop(am.position().top);clearInterval(aJ)}},50)}else{ab(aK,true);b(document).scrollTop(am.position().top)}}}}function ai(){b("a.jspHijack").unbind("click.jsp-hijack").removeClass("jspHijack")}function m(){ai();b("a[href^=#]").addClass("jspHijack").bind("click.jsp-hijack",function(){var s=this.href.split("#"),aJ;if(s.length>1){aJ=s[1];if(aJ.length>0&&Y.find("#"+aJ).length>0){ab("#"+aJ,true);return false}}})}function ao(){var aK,aJ,aM,aL,aN,s=false;am.unbind("touchstart.jsp touchmove.jsp touchend.jsp click.jsp-touchclick").bind("touchstart.jsp",function(aO){var aP=aO.originalEvent.touches[0];aK=aD();aJ=aB();aM=aP.pageX;aL=aP.pageY;aN=false;s=true}).bind("touchmove.jsp",function(aR){if(!s){return}var aQ=aR.originalEvent.touches[0],aP=aa,aO=I;Q.scrollTo(aK+aM-aQ.pageX,aJ+aL-aQ.pageY);aN=aN||Math.abs(aM-aQ.pageX)>5||Math.abs(aL-aQ.pageY)>5;
return aP==aa&&aO==I}).bind("touchend.jsp",function(aO){s=false}).bind("click.jsp-touchclick",function(aO){if(aN){aN=false;return false}})}function g(){var s=aB(),aJ=aD();D.removeClass("jspScrollable").unbind(".jsp");D.replaceWith(ap.append(Y.children()));ap.scrollTop(s);ap.scrollLeft(aJ)}b.extend(Q,{reinitialise:function(aJ){aJ=b.extend({},az,aJ);at(aJ)},scrollToElement:function(aK,aJ,s){ab(aK,aJ,s)},scrollTo:function(aK,s,aJ){N(aK,aJ);M(s,aJ)},scrollToX:function(aJ,s){N(aJ,s)},scrollToY:function(s,aJ){M(s,aJ)},scrollToPercentX:function(aJ,s){N(aJ*(T-ak),s)},scrollToPercentY:function(aJ,s){M(aJ*(Z-v),s)},scrollBy:function(aJ,s,aK){Q.scrollByX(aJ,aK);Q.scrollByY(s,aK)},scrollByX:function(s,aK){var aJ=aD()+Math[s<0?"floor":"ceil"](s),aL=aJ/(T-ak);W(aL*j,aK)},scrollByY:function(s,aK){var aJ=aB()+Math[s<0?"floor":"ceil"](s),aL=aJ/(Z-v);V(aL*i,aK)},positionDragX:function(s,aJ){W(s,aJ)},positionDragY:function(aJ,s){V(aJ,s)},animate:function(aJ,aM,s,aL){var aK={};aK[aM]=s;aJ.animate(aK,{duration:az.animateDuration,easing:az.animateEase,queue:false,step:aL})},getContentPositionX:function(){return aD()},getContentPositionY:function(){return aB()},getContentWidth:function(){return T},getContentHeight:function(){return Z},getPercentScrolledX:function(){return aD()/(T-ak)},getPercentScrolledY:function(){return aB()/(Z-v)},getIsScrollableH:function(){return aF},getIsScrollableV:function(){return aA},getContentPane:function(){return Y},scrollToBottom:function(s){V(i,s)},hijackInternalLinks:function(){m()},destroy:function(){g()}});at(O)}e=b.extend({},b.fn.jScrollPane.defaults,e);b.each(["mouseWheelSpeed","arrowButtonSpeed","trackClickSpeed","keyboardSpeed"],function(){e[this]=e[this]||e.speed});return this.each(function(){var f=b(this),g=f.data("jsp");if(g){g.reinitialise(e)}else{g=new d(f,e);f.data("jsp",g)}})};b.fn.jScrollPane.defaults={showArrows:false,maintainPosition:true,stickToBottom:false,stickToRight:false,clickOnTrack:true,autoReinitialise:false,autoReinitialiseDelay:500,verticalDragMinHeight:0,verticalDragMaxHeight:99999,horizontalDragMinWidth:0,horizontalDragMaxWidth:99999,contentWidth:c,animateScroll:false,animateDuration:300,animateEase:"linear",hijackInternalLinks:false,verticalGutter:4,horizontalGutter:4,mouseWheelSpeed:0,arrowButtonSpeed:0,arrowRepeatFreq:50,arrowScrollOnHover:false,trackClickSpeed:0,trackClickRepeatFreq:70,verticalArrowPositions:"split",horizontalArrowPositions:"split",enableKeyboardNavigation:true,hideFocus:false,keyboardSpeed:0,initialDelay:300,speed:30,scrollPagePercent:0.8}})(SLAYER.JQUERY,this);/*! Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.4
 * 
 * Requires: 1.2.2+
 */

(function($) {

var types = ['DOMMouseScroll', 'mousewheel'];

$.event.special.mousewheel = {
    setup: function() {
        if ( this.addEventListener ) {
            for ( var i=types.length; i; ) {
                this.addEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = handler;
        }
    },
    
    teardown: function() {
        if ( this.removeEventListener ) {
            for ( var i=types.length; i; ) {
                this.removeEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = null;
        }
    }
};

$.fn.extend({
    mousewheel: function(fn) {
        return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
    },
    
    unmousewheel: function(fn) {
        return this.unbind("mousewheel", fn);
    }
});


function handler(event) {
    var orgEvent = event || window.event, args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
    event = $.event.fix(orgEvent);
    event.type = "mousewheel";
    
    // Old school scrollwheel delta
    if ( event.wheelDelta ) { delta = event.wheelDelta/120; }
    if ( event.detail     ) { delta = -event.detail/3; }
    
    // New school multidimensional scroll (touchpads) deltas
    deltaY = delta;
    
    // Gecko
    if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
        deltaY = 0;
        deltaX = -1*delta;
    }
    
    // Webkit
    if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY/120; }
    if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = -1*orgEvent.wheelDeltaX/120; }
    
    // Add event and delta to the front of the arguments
    args.unshift(event, delta, deltaX, deltaY);
    
    return $.event.handle.apply(this, args);
}

})(SLAYER.JQUERY);(function(a){a.tools=a.tools||{version:"v1.2.6"},a.tools.overlay={addEffect:function(a,b,d){c[a]=[b,d]},conf:{close:null,closeOnClick:!0,closeOnEsc:!0,closeSpeed:"fast",effect:"default",fixed:!a.browser.msie||a.browser.version>6,left:"center",load:!1,mask:null,oneInstance:!0,speed:"normal",target:null,top:"10%"}};var b=[],c={};a.tools.overlay.addEffect("default",function(b,c){var d=this.getConf(),e=a(window);d.fixed||(b.top+=e.scrollTop(),b.left+=e.scrollLeft()),b.position=d.fixed?"fixed":"absolute",this.getOverlay().css(b).fadeIn(d.speed,c)},function(a){this.getOverlay().fadeOut(this.getConf().closeSpeed,a)});function d(d,e){var f=this,g=d.add(f),h=a(window),i,j,k,l=a.tools.expose&&(e.mask||e.expose),m=Math.random().toString().slice(10);l&&(typeof l=="string"&&(l={color:l}),l.closeOnClick=l.closeOnEsc=!1);var n=e.target||d.attr("rel");j=n?a(n):null||d;if(!j.length)throw"Could not find Overlay: "+n;d&&d.index(j)==-1&&d.click(function(a){f.load(a);return a.preventDefault()}),a.extend(f,{load:function(d){if(f.isOpened())return f;var i=c[e.effect];if(!i)throw"Overlay: cannot find effect : \""+e.effect+"\"";e.oneInstance&&a.each(b,function(){this.close(d)}),d=d||a.Event(),d.type="onBeforeLoad",g.trigger(d);if(d.isDefaultPrevented())return f;k=!0,l&&a(j).expose(l);var n=e.top,o=e.left,p=j.outerWidth({margin:!0}),q=j.outerHeight({margin:!0});typeof n=="string"&&(n=n=="center"?Math.max((h.height()-q)/2,0):parseInt(n,10)/100*h.height()),o=="center"&&(o=Math.max((h.width()-p)/2,0)),i[0].call(f,{top:n,left:o},function(){k&&(d.type="onLoad",g.trigger(d))}),l&&e.closeOnClick&&a.mask.getMask().one("click",f.close),e.closeOnClick&&a(document).bind("click."+m,function(b){a(b.target).parents(j).length||f.close(b)}),e.closeOnEsc&&a(document).bind("keydown."+m,function(a){a.keyCode==27&&f.close(a)});return f},close:function(b){if(!f.isOpened())return f;b=b||a.Event(),b.type="onBeforeClose",g.trigger(b);if(!b.isDefaultPrevented()){k=!1,c[e.effect][1].call(f,function(){b.type="onClose",g.trigger(b)}),a(document).unbind("click."+m).unbind("keydown."+m),l&&a.mask.close();return f}},getOverlay:function(){return j},getTrigger:function(){return d},getClosers:function(){return i},isOpened:function(){return k},getConf:function(){return e}}),a.each("onBeforeLoad,onStart,onLoad,onBeforeClose,onClose".split(","),function(b,c){a.isFunction(e[c])&&a(f).bind(c,e[c]),f[c]=function(b){b&&a(f).bind(c,b);return f}}),i=j.find(e.close||".close"),!i.length&&!e.close&&(i=a("<a class=\"close\"></a>"),j.prepend(i)),i.click(function(a){f.close(a)}),e.load&&f.load()}a.fn.overlay=function(c){var e=this.data("overlay");if(e)return e;a.isFunction(c)&&(c={onBeforeLoad:c}),c=a.extend(!0,{},a.tools.overlay.conf,c),this.each(function(){e=new d(a(this),c),b.push(e),a(this).data("overlay",e)});return c.api?e:this}})(SLAYER.JQUERY);
(function(a){a.tools=a.tools||{version:"v1.2.6"};var b;b=a.tools.expose={conf:{maskId:"exposeMask",loadSpeed:"slow",closeSpeed:"fast",closeOnClick:!0,closeOnEsc:!0,zIndex:9998,opacity:.8,startOpacity:0,color:"#fff",onLoad:null,onClose:null}};function c(){if(a.browser.msie){var b=a(document).height(),c=a(window).height();return[window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,b-c<20?c:b]}return[a(document).width(),a(document).height()]}function d(b){if(b)return b.call(a.mask)}var e,f,g,h,i;a.mask={load:function(j,k){if(g)return this;typeof j=="string"&&(j={color:j}),j=j||h,h=j=a.extend(a.extend({},b.conf),j),e=a("#"+j.maskId),e.length||(e=a("<div/>").attr("id",j.maskId),a("body").append(e));var l=c();e.css({position:"absolute",top:0,left:0,width:l[0],height:l[1],display:"none",opacity:j.startOpacity,zIndex:j.zIndex}),j.color&&e.css("backgroundColor",j.color);if(d(j.onBeforeLoad)===!1)return this;j.closeOnEsc&&a(document).bind("keydown.mask",function(b){b.keyCode==27&&a.mask.close(b)}),j.closeOnClick&&e.bind("click.mask",function(b){a.mask.close(b)}),a(window).bind("resize.mask",function(){a.mask.fit()}),k&&k.length&&(i=k.eq(0).css("zIndex"),a.each(k,function(){var b=a(this);/relative|absolute|fixed/i.test(b.css("position"))||b.css("position","relative")}),f=k.css({zIndex:Math.max(j.zIndex+1,i=="auto"?0:i)})),e.css({display:"block"}).fadeTo(j.loadSpeed,j.opacity,function(){a.mask.fit(),d(j.onLoad),g="full"}),g=!0;return this},close:function(){if(g){if(d(h.onBeforeClose)===!1)return this;e.fadeOut(h.closeSpeed,function(){d(h.onClose),f&&f.css({zIndex:i}),g=!1}),a(document).unbind("keydown.mask"),e.unbind("click.mask"),a(window).unbind("resize.mask")}return this},fit:function(){if(g){var a=c();e.css({width:a[0],height:a[1]})}},getMask:function(){return e},isLoaded:function(a){return a?g=="full":g},getConf:function(){return h},getExposed:function(){return f}},a.fn.mask=function(b){a.mask.load(b);return this},a.fn.expose=function(b){a.mask.load(b,this);return this}})(SLAYER.JQUERY);
(function(a){a.fn.mousewheel=function(a){return this[a?"bind":"trigger"]("wheel",a)},a.event.special.wheel={setup:function(){a.event.add(this,b,c,{})},teardown:function(){a.event.remove(this,b,c)}};var b=a.browser.mozilla?"DOMMouseScroll"+(a.browser.version<"1.9"?" mousemove":""):"mousewheel";function c(b){switch(b.type){case"mousemove":return a.extend(b.data,{clientX:b.clientX,clientY:b.clientY,pageX:b.pageX,pageY:b.pageY});case"DOMMouseScroll":a.extend(b,b.data),b.delta=-b.detail/3;break;case"mousewheel":b.delta=b.wheelDelta/120}b.type="wheel";return a.event.handle.call(this,b,b.delta)}})(SLAYER.JQUERY);
(function(a){a.tools=a.tools||{version:"v1.2.6"},a.tools.tooltip={conf:{effect:"toggle",fadeOutSpeed:"fast",predelay:0,delay:30,opacity:1,tip:0,fadeIE:!1,position:["top","center"],offset:[0,0],relative:!1,cancelDefault:!0,events:{def:"mouseenter,mouseleave",input:"focus,blur",widget:"focus mouseenter,blur mouseleave",tooltip:"mouseenter,mouseleave"},layout:"<div/>",tipClass:"tooltip"},addEffect:function(a,c,d){b[a]=[c,d]}};var b={toggle:[function(a){var b=this.getConf(),c=this.getTip(),d=b.opacity;d<1&&c.css({opacity:d}),c.show(),a.call()},function(a){this.getTip().hide(),a.call()}],fade:[function(b){var c=this.getConf();!a.browser.msie||c.fadeIE?this.getTip().fadeTo(c.fadeInSpeed,c.opacity,b):(this.getTip().show(),b())},function(b){var c=this.getConf();!a.browser.msie||c.fadeIE?this.getTip().fadeOut(c.fadeOutSpeed,b):(this.getTip().hide(),b())}]};function c(b,c,d){var e=d.relative?b.position().top:b.offset().top,f=d.relative?b.position().left:b.offset().left,g=d.position[0];e-=c.outerHeight()-d.offset[0],f+=b.outerWidth()+d.offset[1],/iPad/i.test(navigator.userAgent)&&(e-=a(window).scrollTop());var h=c.outerHeight()+b.outerHeight();g=="center"&&(e+=h/2),g=="bottom"&&(e+=h),g=d.position[1];var i=c.outerWidth()+b.outerWidth();g=="center"&&(f-=i/2),g=="left"&&(f-=i);return{top:e,left:f}}function d(d,e){var f=this,g=d.add(f),h,i=0,j=0,k=d.attr("title"),l=d.attr("data-tooltip"),m=b[e.effect],n,o=d.is(":input"),p=o&&d.is(":checkbox, :radio, select, :button, :submit"),q=d.attr("type"),r=e.events[q]||e.events[o?p?"widget":"input":"def"];if(!m)throw"Nonexistent effect \""+e.effect+"\"";r=r.split(/,\s*/);if(r.length!=2)throw"Tooltip: bad events configuration for "+q;d.bind(r[0],function(a){clearTimeout(i),e.predelay?j=setTimeout(function(){f.show(a)},e.predelay):f.show(a)}).bind(r[1],function(a){clearTimeout(j),e.delay?i=setTimeout(function(){f.hide(a)},e.delay):f.hide(a)}),k&&e.cancelDefault&&(d.removeAttr("title"),d.data("title",k)),a.extend(f,{show:function(b){if(!h){l?h=a(l):e.tip?h=a(e.tip).eq(0):k?h=a(e.layout).addClass(e.tipClass).appendTo(document.body).hide().append(k):(h=d.next(),h.length||(h=d.parent().next()));if(!h.length)throw"Cannot find tooltip for "+d}if(f.isShown())return f;h.stop(!0,!0);var o=c(d,h,e);e.tip&&h.html(d.data("title")),b=a.Event(),b.type="onBeforeShow",g.trigger(b,[o]);if(b.isDefaultPrevented())return f;o=c(d,h,e),h.css({position:"absolute",top:o.top,left:o.left}),n=!0,m[0].call(f,function(){b.type="onShow",n="full",g.trigger(b)});var p=e.events.tooltip.split(/,\s*/);h.data("__set")||(h.unbind(p[0]).bind(p[0],function(){clearTimeout(i),clearTimeout(j)}),p[1]&&!d.is("input:not(:checkbox, :radio), textarea")&&h.unbind(p[1]).bind(p[1],function(a){a.relatedTarget!=d[0]&&d.trigger(r[1].split(" ")[0])}),e.tip||h.data("__set",!0));return f},hide:function(c){if(!h||!f.isShown())return f;c=a.Event(),c.type="onBeforeHide",g.trigger(c);if(!c.isDefaultPrevented()){n=!1,b[e.effect][1].call(f,function(){c.type="onHide",g.trigger(c)});return f}},isShown:function(a){return a?n=="full":n},getConf:function(){return e},getTip:function(){return h},getTrigger:function(){return d}}),a.each("onHide,onBeforeShow,onShow,onBeforeHide".split(","),function(b,c){a.isFunction(e[c])&&a(f).bind(c,e[c]),f[c]=function(b){b&&a(f).bind(c,b);return f}})}a.fn.tooltip=function(b){var c=this.data("tooltip");if(c)return c;b=a.extend(!0,{},a.tools.tooltip.conf,b),typeof b.position=="string"&&(b.position=b.position.split(/,?\s/)),this.each(function(){c=new d(a(this),b),a(this).data("tooltip",c)});return b.api?c:this}})(SLAYER.JQUERY);
/*
* vertical news ticker
* Tadas Juozapaitis ( kasp3rito@gmail.com )
* http://www.jugbit.com/jquery-vticker-vertical-news-ticker/
*/
(function($){
$.fn.vTicker = function(options) {
	var defaults = {
		speed: 700,
		pause: 4000,
		showItems: 3,
		animation: 'fade',
		mousePause: true,
		isPaused: false,
		direction: 'up',
		height: 0
	};

	var options = $.extend(defaults, options);

	moveUp = function(obj2, height, options){
		if(options.isPaused)
			return;
                    
	var obj = obj2.children('ul');
		
    	var clone = obj.children('li:first').clone(true);
		
		if(options.height > 0)
		{
			height = obj.children('li:first').height();
		}		
		
    	obj.animate({top: '-=' + height + 'px'}, options.speed, function() {
        	$(this).children('li:first').remove();
        	$(this).css('top', '0px');
        });
		
		if(options.animation == 'fade')
		{
			obj.children('li:first').fadeOut(options.speed);
			if(options.height == 0)
			{
			obj.children('li:eq(' + options.showItems + ')').hide().fadeIn(options.speed).show();
			}
		}

    	clone.appendTo(obj);
	};
	
	moveDown = function(obj2, height, options){
		if(options.isPaused)
			return;
		
	var obj = obj2.children('ul');

    	var clone = obj.children('li:last').clone(true);
		
		if(options.height > 0)
		{
			height = obj.children('li:first').height();
		}
		
		obj.css('top', '-' + height + 'px')
			.prepend(clone);
			
    	obj.animate({top: 0}, options.speed, function() {
        	$(this).children('li:last').remove();
        });
		
		if(options.animation == 'fade')
		{
			if(options.height == 0)
			{
				obj.children('li:eq(' + options.showItems + ')').fadeOut(options.speed);
			}
			obj.children('li:first').hide().fadeIn(options.speed).show();
		}
	};
	
	return this.each(function() {
		var obj = $(this);
                        
                obj.show();
		var maxHeight = 0;

		obj.css({overflow: 'hidden', position: 'relative'});
//			.children('ul').css({position: 'absolute', margin: 0, padding: 0})
//			.children('li').css({margin: 0, padding: 0}
//                    );

		if(options.height == 0)
		{
			obj.children('ul').children('li').each(function(){
				if($(this).height() > maxHeight)
				{
					maxHeight = $(this).height();
				}
			});

			obj.children('ul').children('li').each(function(){
				$(this).height(maxHeight);
			});

			obj.height(maxHeight * options.showItems);
		}
		else
		{
			obj.height(options.height);
		}
                
        var getRand = function() { return Math.round(Math.random() * (5000 - options.speed) + options.speed) };
        
        var run = function(){ 
                        
                if(options.direction == 'up')
                { 
                        moveUp(obj, maxHeight, options); 
                }
                else
                {
                        moveDown(obj, maxHeight, options); 
                }

                setTimeout(run, getRand());
        };
		
    	setTimeout(run, getRand());
		
        if(options.mousePause)
        {
                obj.bind("mouseenter",function(){
                        options.isPaused = true;
                }).bind("mouseleave",function(){
                        options.isPaused = false;
                });
        }
	});
};
})(SLAYER.JQUERY);var SLAYER=SLAYER||{};SLAYER.CORE=SLAYER.CORE||{};SLAYER.UI=SLAYER.UI||{};SLAYER.TEMPLATES=SLAYER.TEMPLATES||{};SLAYER.JQUERY=SLAYER.JQUERY||{};SLAYER.CONFIG=SLAYER.CONFIG||{};SLAYER.CFG=SLAYER.CFG||{};SLAYER.CONFIG=Backbone.Model.extend({validate:function(c){for(var a in c){var g=this.validateRequiredParameter(a,c[a]);if(void 0!=g)return g}},mergeConfiguration:function(c,a){var g=c.gameId;c.invite=c.invite||{};for(var b in a[g])c.invite[b]=a[g][b];c.facebook=c.facebook||{};c.facebook.appId=this.setFacebookAppId(c);return c},init:function(c){"undefined"==typeof c.config.gameId?SLAYER.CORE.Log.debug("Could not find required parameter 'gameId'","","CONFIG","error"):this.buildInitialConfig(c)},buildInitialConfig:function(c){var a=
SLAYER.CORE.Bp.isDev()?(new SLAYER.INVITESETTINGSDEV).getSettings():(new SLAYER.INVITESETTINGSLIVE).getSettings();c.config=this.mergeConfiguration(c.config,a);this.set({config:c.config},{error:function(a,b){SLAYER.CORE.Log.debug("Could not find required parameter '"+b+"'","","CONFIG","error")}})},get:function(c){var a=this.get("config"),c=a[c]||{};c.gameId=a.gameId;c.instanceId=a.instanceId;c.affiliateId=a.affiliateId;c.dispatcherUrl=a.dispatcherUrl;c.userId=a.userId;c.userKeyId=a.userKeyId;return c},
validateRequiredParameter:function(c,a){for(var g=this.getRequiredParameter(c),b=0;b<g.length;b++){var f=g[b];if("undefined"==typeof a[f])return f}},getRequiredParameter:function(){return"gameTitle dispatcherUrl instanceId affiliateId userId userKeyId".split(" ")}});SLAYER.SLAYER=function(c){function a(d,i){SLAYER.CORE.Log.debug(d,_settings.debugFilter,"SLAYER",i||"")}function g(){if(null==e){if("undefined"!=typeof _settings.facebook){var d=_settings.facebook;d.core=l;d.invite=p;d.gameId="undefined"!=typeof _settings.gameId?_settings.gameId:0;d.affiliateId="undefined"!=typeof _settings.affiliateId?_settings.affiliateId:0;e=new SLAYER.FACEBOOK(d);return!0}a("ERROR: No settings for Facebook found","error");return!1}return!0}function b(){if(null==h){if("undefined"!=
typeof _settings.google){var d=_settings.google;d.core=l;d.gameId="undefined"!=typeof _settings.gameId?_settings.gameId:0;d.affiliateId="undefined"!=typeof _settings.affiliateId?_settings.affiliateId:0;h=new SLAYER.GOOGLE(d);return!0}a("ERROR: No settings for Google found","error");return!1}return!0}function f(){if(null==p){var d="undefined"==typeof _settings.invite?{}:_settings.invite;d.gameId="undefined"==typeof _settings.gameId?a("INVITE: ERROR: No gameId set for invite dialog!","error"):_settings.gameId;
d.instanceId="undefined"==typeof _settings.instanceId?a("INVITE: ERROR: No instanceId set!","error"):_settings.instanceId;d.userId="undefined"==typeof _settings.userId?a("INVITE: ERROR: No userId set!","error"):_settings.userId;d.userKeyId="undefined"==typeof _settings.userKeyId?a("INVITE: ERROR: No userKeyId set!","error"):_settings.userKeyId;d.affiliateId="undefined"==typeof _settings.affiliateId?a("INVITE: ERROR: No affiliateId found!","error"):_settings.affiliateId;d.gameTitle="undefined"==typeof _settings.gameTitle?
a("INVITE: ERROR: No game title found!","error"):_settings.gameTitle;d.dispatcherUrl="undefined"==typeof _settings.dispatcherUrl?a("INVITE: ERROR: No dispatcher url found!","error"):_settings.dispatcherUrl;d.cssDev="undefined"==typeof _settings.cssDev?!1:_settings.cssDev;d.core=l;d.queue=r;d.facebook={};"undefined"!=typeof _settings.facebook&&(d.facebook.appId="undefined"==typeof _settings.facebook.appId?(SLAYER.CORE.Bp.isDev()?new SLAYER.FBDEV:new SLAYER.FBLIVE).getSettings()[d.gameId]:_settings.facebook.appId,
d.facebook.language="undefined"==typeof _settings.facebook.language?a("INVITE: ERROR: No Facebook language given!","error"):_settings.facebook.language,d.facebook.message="undefined"==typeof _settings.facebook.message?a("INVITE: ERROR: No Facebook message for invite given!","error"):_settings.facebook.message,d.facebook.data="undefined"==typeof _settings.facebook.data?a("INVITE: WARNING: No data given.","warning"):_settings.facebook.data,d.facebook.filter="undefined"==typeof _settings.facebook.filter?
a("INVITE: WARNING: No filter given, using default","warning"):_settings.facebook.filter,d.facebook.to="undefined"==typeof _settings.facebook.to?a("INVITE: WARNING:No assignee given. Dialog will show friendlist","warning"):_settings.facebook.to,"undefined"!=typeof _settings.facebook.callbacks?(d.facebook.callbacks={},d.facebook.callbacks.onDone="undefined"==typeof _settings.facebook.callbacks.onDone?a("INVITE: WARNING: No Facebook callback onDone given!","warning"):_settings.facebook.callbacks.onDone,
d.facebook.callbacks.onSuccess="undefined"==typeof _settings.facebook.callbacks.onSuccess?a("INVITE: WARNING: No Facebook callback onSuccess given!","warning"):_settings.facebook.callbacks.onSuccess,d.facebook.callbacks.onFailed="undefined"==typeof _settings.facebook.callbacks.onFailed?a("INVITE: WARNING: No Facebook callback onFailed given!","warning"):_settings.facebook.callbacks.onFailed):(a("INVITE: WARNING: No callbacks for Facebook given!","warning"),d.facebook.callbacks={onDone:function(){},
onSuccess:function(){},onFailed:function(){}}));if("undefined"==typeof d.gameId&&"undefined"==typeof d.facebook.appId)d.facebookTab=!1;else if("undefined"==typeof d.facebook&&"undefined"==typeof d.facebook.appId){var i=-1==location.hostname.search("bigpoint.net")?new SLAYER.FBDEV:new SLAYER.FBLIVE;"undefined"==typeof i.getSettings()[d.gameId]?d.facebookTab=!1:d.facebook.appId=i.getSettings()[d.gameId]}p=new SLAYER.INVITE(d)}return!0}function j(){if(null==v){if("undefined"!=typeof _settings.events){var d=
_settings.events;d.core=l;d.gameId="undefined"!=typeof _settings.gameId?_settings.gameId:0;d.affiliateId="undefined"!=typeof _settings.affiliateId?_settings.affiliateId:0;d.dispatcherUrl="undefined"!=typeof _settings.dispatcherUrl?_settings.dispatcherUrl:a("ERROR: No Dispatcher URL found!","error");d.cssDev="undefined"==typeof _settings.cssDev?!1:_settings.cssDev;v=new SLAYER.EVENTS(d);return!0}a("ERROR: No settings for Game Event Service found!","error");return!1}return!0}function o(){if(null==t){if("undefined"==
typeof _settings.dispatcherUrl)return l.debug("ERROR: Dispatcher URL is required!","error"),!1;t=new SLAYER.FRIENDSHIP({core:l,dispatcherUrl:_settings.dispatcherUrl})}return!0}function q(){var d=null;"undefined"!=typeof _settings.invite&&"undefined"!=typeof _settings.invite.hideClient&&(d=_settings.invite.hideClient);null==d&&"undefined"!=typeof _settings.hideClient&&(d=_settings.hideClient);if(null==d)return l.debug("WARNING: No hiding parameter found!","warning"),!1;if("undefined"==typeof d.container)return l.debug("WARNING: No client container in hiding parameter found!",
"warning"),!1;if("undefined"==typeof d.imageUrl)return l.debug("WARNING: No background image url in hiding parameter found!","warning"),!1;_settings.invite=_settings.invite||{};_settings.invite.hideClient=d;return!0}function m(d){d.settings.renderPlaceholder=!1;var i=d.module;"google"==d.module?(d.settings.size="undefined"==typeof d.settings.size?"standard":d.settings.size,i+="_plusone_"+d.settings.size):"facebook"==d.module&&(d.settings.action="undefined"==typeof d.settings.action?"like":d.settings.action,
i+="_like_"+d.settings.action);var i='<a href="javascript:;"><img src="/sharedpages/static/plugin/social/slayer/img/socialmedia/'+(i+".png")+'" border="0" title="Der Datenschutz ist uns wichtig! Ihre Daten werden nicht automatisch an die Social-Media Plattformen weitergeleitet. Bevor Sie diese Funktion nutzen k\u00f6nnen, klicken Sie bitte hier zur Aktivierung. Danach k\u00f6nnen Sie mit einem weiteren Klick den Beitrag auf Ihrer gew\u00fcnschten Social Media Plattform teilen." /></a>',x=document.getElementById("undefined"==
typeof d.settings.container?!1:d.settings.container);null!=x?(x.innerHTML=i,x.onclick=function(){x.innerHTML="Lade...";d.settings.forceRendering=true;if(k(d.module)==null){r.addCommand(d);r.addLoader(d.module);w(d.module);r.updateLoader(d.module,"init",true)}else l.run(d)}):a("WRAPPER: ERROR: "+d.module+": "+d.func+": No container found! May be DOM was not ready","error")}function s(d){var i=[];i.push("de");i.push("de_DE");i.push("de-DE");for(var a=0;a<i.length;a++)if(i[a]==d)return!0;return!1}function w(d){switch(d){case "facebook":g();
break;case "google":b();break;case "invite":f();break;case "events":j();break;case "friendship":o()}}function k(d){switch(d){case "facebook":return e;case "google":return h;case "invite":return p;case "events":return v;case "share":return u;case "friendship":return t}}var n=!1,e=null,h=null,p=null,v=null,u=null,t=null,l=this,r=null;l.isDevEnv=!1;l.instance=null;_settings=0;l.initModule=function(d){w(d)};l.getSettings=function(){return _settings};l.run=function(d){var i=k(d.module),a=l.getSettings()[d.module],
a="undefined"==typeof a?{}:a,e="undefined"==typeof d.settings.forceRendering?!1:d.settings.forceRendering;if(a=s("undefined"!=typeof a.language?a.language:"en_US")){a:{var a=d.func,b=[];b.push("renderLike");b.push("renderPlusOne");for(var f=0;f<b.length;f++)if(b[f]==a){a=!0;break a}a=!1}a=a&&!1==e}a?m(d):null!=i&&r.isLoadingComplete(d.module)?(i.setRunSettings(d.settings),i.run(d.func)):r.addCommand(d)};l.enableDevMode=function(){n=!0;l.debug("enabled development mode")};l.disableDevMode=function(){n=
!1;l.debug("disabled development mode")};l.debug=function(d,i){a(d,"undefined"==typeof i?"":i)};l.isDevMode=function(){return n};l.hideGameClient=function(){q()&&(l.debug("Hiding the game client!"),SLAYER.JQUERY("#"+_settings.invite.hideClient.container).css("visibility","hidden"),SLAYER.JQUERY("#"+_settings.invite.hideClient.container).parent().css("background-repeat","no-repeat"),SLAYER.JQUERY("#"+_settings.invite.hideClient.container).parent().css("background-image",'url("'+_settings.invite.hideClient.imageUrl+
'")'))};l.unhideGameClient=function(){q()&&(l.debug("Unhiding the game client!"),SLAYER.JQUERY("#"+_settings.invite.hideClient.container).css("visibility","visible"),SLAYER.JQUERY("#"+_settings.invite.hideClient.container).parent().css("background-image","none"))};l.ajax=function(d){a("Prepare Ajax call");var i=!0;"undefined"==typeof d.type&&(a("WARNING: No type set. Using POST as default","warning"),d.type="POST");"undefined"==typeof d.data&&(a("WARNING: No data to send found","warning"),d.data=
{});"undefined"==typeof d.dataType&&(a("WARNING: No dataType set. Using JSON as default","warning"),d.dataType="json");"undefined"==typeof d.url&&(a("ERROR:   No URL set. Cannot make ajax call","error"),i=!1);"undefined"==typeof d.success&&(a("WARNING: No success callback found","warning"),d.success=function(){});"undefined"==typeof d.error&&(a("WARNING: No error callback found","warning"),d.error=l.ajaxError);i?SLAYER.JQUERY.ajax(d):a("Cannot make ajax call, please check ERRORs/WARNINGs")};l.ajaxError=
function(d,i,e){a("AJAX-ERROR: "+i,"error");a(e)};l.getInviteCode=function(d){return u.getInviteCode(d)};l.updateLoader=function(d,i,a){r.updateLoader(d,i,a)};l.getShare=function(){return u};l.onReady=function(d,i){if("function"==typeof _settings[d].onReady)_settings[d].onReady(i)};l.getVersion=function(){return"Release-2012-25-So_Alone"};l.printLog=function(d){SLAYER.CORE.Log.print(d)};l.getModule=function(d){return k(d)};l.initModule=function(d){switch(d){case "facebook":null==e&&(r.addLoader("facebook"),
g())}r.updateLoader(d,"init",!0)};(function(d){SLAYER.CORE.Log.clearLog();l.isDevEnv=SLAYER.CORE.Bp.isDev();"undefined"!=typeof d.preDevMode&&d.preDevMode&&(n=!0);u=new SLAYER.SHARE;_settings=d;_settings.core=l;r=new SLAYER.QUEUE({dev:n,core:l});d=[];"undefined"!=typeof _settings.facebook&&(_settings.facebook.language="undefined"==typeof _settings.facebook.language?"en_US":_settings.facebook.language,s(_settings.facebook.language)||(r.addLoader("facebook"),d.push("facebook")));"undefined"!=typeof _settings.google&&
(_settings.google.language="undefined"==typeof _settings.google.language?"en":_settings.google.language,s(_settings.google.language)||(r.addLoader("google"),d.push("google")));"undefined"!=typeof _settings.invite&&(r.addLoader("invite"),d.push("invite"));"undefined"!=typeof _settings.events&&(r.addLoader("events"),d.push("events"));"undefined"!=typeof _settings.friendship&&(r.addLoader("friendship"),d.push("friendship"));for(var i=0;i<d.length;i++){var a=!1;switch(d[i]){case "facebook":a=g();break;
case "google":a=b();break;case "invite":a=f();break;case "events":a=j();break;case "friendship":a=o()}a&&r.updateLoader(d[i],"init",!0)}})(c)};SLAYER.init=function(c){"undefined"==typeof c&&(c={});SLAYER.instance=new SLAYER.SLAYER(c)};SLAYER.enableDevMode=function(){SLAYER.instance.enableDevMode()};SLAYER.disableDevMode=function(){SLAYER.instance.disableDevMode()};SLAYER.printLog=function(c){SLAYER.instance.printLog(c||"")};SLAYER.getInviteCode=function(c){return SLAYER.instance.getInviteCode(c)};SLAYER.doWallPost=function(c){SLAYER.instance.initModule("facebook");SLAYER.instance.run({module:"facebook",func:"doWallPost",settings:c})};
SLAYER.renderLike=function(c){SLAYER.instance.run({module:"facebook",func:"renderLike",settings:c})};SLAYER.sendAppInvite=function(c){c.type="invite";SLAYER.instance.run({module:"facebook",func:"sendRequest",settings:c})};SLAYER.sendAppGift=function(c){c.type="gift";c.filter="all";SLAYER.instance.run({module:"facebook",func:"sendRequest",settings:c})};SLAYER.getFacebookFriends=function(c){SLAYER.instance.run({module:"facebook",func:"getFriends",settings:c})};
SLAYER.renderPlusOne=function(c){SLAYER.instance.run({module:"google",func:"renderPlusOne",settings:c})};SLAYER.renderGoogleShare=function(c){SLAYER.instance.run({module:"google",func:"renderShare",settings:c})};SLAYER.renderInviteDialog=function(){SLAYER.instance.run({module:"invite",func:"dialog",settings:{}})};SLAYER.renderInviteDialogButton=function(){SLAYER.instance.run({module:"invite",func:"button",settings:{}})};
SLAYER.updateInviteSettings=function(c){SLAYER.instance.run({module:"invite",func:"settings",settings:c})};SLAYER.getShareUrl=function(c){SLAYER.instance.run({module:"invite",func:"shareUrl",settings:c})};SLAYER.getGESFeed=function(c){SLAYER.instance.run({module:"events",func:"getFeed",settings:c})};SLAYER.getGameFriends=function(c){SLAYER.instance.run({module:"friendship",func:"getGameFriends",settings:c})};
SLAYER.getNetworkFriends=function(c){var a=SLAYER.instance.getSettings();SLAYER.instance.ajax({type:"GET",data:{slService:"friendship:getNetworkfriends"},dataType:"json",url:"undefined"==typeof a.dispatcherUrl?"undefined"==typeof a.actionUrl?"":a.actionUrl:a.dispatcherUrl,success:function(a){"undefined"==typeof a.meta?SLAYER.CORE.Log.debug("Slayer error in response: "+a):a.meta.success?"undefined"!=a.data?c(a.data):SLAYER.CORE.Log.debug("Slayer error: data not set"+a):SLAYER.CORE.Log.debug("Slayer error in response: "+
a)},error:function(){}})};SLAYER.QUEUE=function(c){function a(a,b){SLAYER.CORE.Log.debug(a,g.core.getSettings().debugFilter||"","QUEUE",b||"")}var g=null,b=[],f=this,j=[],o=!1,q=[];f.init=function(a){g=a};f.init(c);f.addLoader=function(a){j.push({identifier:a,init:!1,externals:!1})};f.removeLoader=function(a){for(var b=0;b<j.length;b++)if(j[b].identifier==a){j.splice(b,1);break}f.run(a)};f.updateLoader=function(b,c,g){for(var k=0;k<j.length;k++)j[k].identifier==b&&(j[k][c]=g,a("Updating "+b+": Set "+c+" to "+g),"undefined"!=
typeof j[k]&&(!0==j[k].init&&!0==j[k].externals)&&(a("Removing "+b+" from queue"),f.removeLoader(b)))};f.addCommand=function(f){a("Added "+f.module+"->"+f.func);b.push(f)};f.run=function(c){if(o)q.push(c);else{o=!0;a("Locked Queue");var j=b,w=[];a("Run Queue commands for "+c);for(var k=0;k<j.length;k++)j[k].module==c?(a("Run "+j[k].module+"->"+j[k].func),g.core.run(j[k])):w.push(j[k]);b=w;a("Queue run complete for "+c);o=!1;a("Unlocked Queue");"undefined"!=typeof q.shift()&&f.run(q.shift())}};f.isLoadingComplete=
function(a){for(var b=0;b<j.length;b++)if(j[b].identifier==a)return!1;return!0}};SLAYER.SHARE=function(){function c(a,f){SLAYER.CORE.Log.debug(a,f,"SHARE",f||"")}function a(a){for(var a=a+"",f="",c=0;c<a.length;c++)var g=parseInt(a.charAt(c),0)+97,f=f+String.fromCharCode(g);return f}function g(a){switch(a){case "invite":return"baa";case "facebook":return"b";case "google":return"d";case "twitter":return"c";case "web":return"bab"}}this.renderShareBar=function(){};this.getInviteCode=function(b){"undefined"==typeof b.instanceId&&c("INVITE-CODE: WARNING: No instance Id found!","warning");
"undefined"==typeof b.userId&&c("INVITE-CODE: WARNING: No user Id found!","warning");"undefined"==typeof b.userKeyId&&c("INVITE-CODE: WARNING: No user key Id found!","warning");"undefined"==typeof b.type&&c("INVITE-CODE: WARNING: No type found!","warning");"undefined"==typeof b.affiliateId&&(b.affiliateId=0);var f=Math.round((new Date).getTime()/1E3);return"x"+a(""+f)+"x"+a(b.userId)+"x"+a(b.userKeyId)+"x"+a(b.instanceId)+"x"+a(b.affiliateId)+"x"+g(b.type)}};SLAYER.CSS=function(c){function a(a){if("undefined"==typeof b[j.gameId])return q.onReady("invite",{init:!1,message:"CSS file not found for given game ID"}),!1;var c=[];c.push(b[0][a][0]);SLAYER.JQUERY.each(b[j.gameId][a],function(a,b){-1<b.search("_ie")?"undefined"!=typeof navigator&&"undefined"!=typeof navigator.appName&&"Microsoft Internet Explorer"==navigator.appName&&c.push(b):c.push(b)});return c}function g(){if(0<f.length){var a=f.shift(),b=a.split("/"),b=b[b.length-1],b=b.replace(".css",""),
b=-1<a.search("_ie")?b+"_ie":b;if("000_slayer"==b)0<SLAYER.JQUERY("#"+b).length&&SLAYER.JQUERY("#"+b).remove();else{var c=window.document.getElementsByTagName("link");SLAYER.JQUERY(c).each(function(){var a=SLAYER.JQUERY(this).attr("id"),b=SLAYER.JQUERY(this).attr("href");"undefined"!=typeof b&&-1<b.search("plugin/social/slayer/css")&&"000_slayer"!=a&&SLAYER.JQUERY(this).remove()})}var c=document.getElementsByTagName("head")[0],j=document.createElement("link");j.rel="stylesheet";j.id=b;j.className=
"slayer_css";j.type="text/css";j.media="screen";j.href=a;"Microsoft Internet Explorer"==navigator.appName||"Opera"==navigator.appName?j.onreadystatechange=function(){g()}:SLAYER.JQUERY.get(a,function(){g()});c.appendChild(j)}else SLAYER.CORE.Log.debug("All CSS files were loaded!",q.getSettings().debugFilter,"CSS-MAPPER",""),o.CSSLoadingDone()}var b={"0":{invite:{"0":"000_slayer.css"}},14:{invite:{"0":"14_seafight.css"}},22:{invite:{"0":"22_darkorbit.css"}},171:{invite:{"0":"171_farmerama.css"}},525:{invite:{"0":"525_ramacity.css"}},
696:{invite:{"0":"696_skyrama.css"}},481:{invite:{"0":"481_drakensang.css"},ticker:{"0":"481_drakensang_ticker.css"}},525:{invite:{"0":"525_ramacity.css"}},610:{invite:{"0":"481_drakensang.css"},ticker:{"0":"481_drakensang_ticker.css"}},791:{invite:{"0":"791_iceage.css"}},824:{invite:{"0":"824_pizzaconnection.css"}},865:{invite:{"0":"937_risingcities.css"}},936:{invite:{"0":"937_risingcities.css"}},937:{invite:{"0":"937_risingcities.css"}}},f=[],j=null,o=null,q=null;this.loadCSSFiles=function(b){b=
a(b.module);if(!b)return!1;var c=[];SLAYER.JQUERY.each(b,function(a,b){c.push("/sharedpages/static/plugin/social/slayer/css/"+b)});f=c;g()};(function(a){q=a.core;o=a.caller;j=o.getSettings()})(c)};SLAYER.AFFILIATE=function(c){function a(a,c,f,m){f="live"==f?g:b;return"undefined"!=typeof f[a]&&"undefined"!=typeof f[a][c]&&"undefined"!=f[a][c][m]?f[a][c][m].visible:!0}var g=null,b=null,f=null;this.getAffiliateSettings=function(){return f.core.isDevEnv?b:g};this.isFacebookLikeAllowed=function(b,c,f){return a(b,c,"undefined"==typeof f?"live":f,"facebook_like")};this.isGooglePlusOneAllowed=function(b,c,f){return a(b,c,"undefined"==typeof f?"live":f,"google_plus_one")};f=c;g=(new SLAYER.LIVESETTINGS).getSettings();
b=(new SLAYER.DEVSETTINGS).getSettings()};Namespace("SLAYER.CORE");SLAYER.CORE.Utils=function(){return{isArray:function(c){return c&&c.constructor==Array},compareStrings:function(c,a){if("string"!=typeof c||"string"!=typeof a)return!1;for(var g=c.length>=a.length?c:a,b=c.length>=a.length?a:c,f=0,j=0;j<b.length;j++)b.charAt(j)==g.charAt(j)&&f++;return f}}}();SLAYER.CORE.Bp=function(){function c(a){return-1==("undefined"!=typeof location?location.href:"").search(a)?!1:!0}return{isDev:function(){return c("bigpoint.net")},isCssDevEnv:function(){return c("bpdevsys-slayer.bigpoint.net")}}}();
SLAYER.CORE.Log=function(){var c=null;return{debug:function(a,g,b,f){a={message:a,cl:b,type:f};c=c||[];c.push(a)},print:function(){console.clear();console.log("- - - SLAYER-LOG - - -");console.log("SLAYER-DEBUG: SLAYER: Version: "+SLAYER.instance.getVersion());for(var a=0;a<c.length;a++){var g=c[a];console.log("SLAYER-DEBUG: "+g.cl+": "+g.message)}console.log("- - - SLAYER-END - - -")},clearLog:function(){c=[]}}}();Namespace("SLAYER.CORE");
SLAYER.CORE.I18n=function(){var c={facebook:{def:"de_DE","0":"af_ZA",1:"ar_AR",2:"az_AZ",3:"be_BY",4:"bg_BG",5:"bn_IN",6:"bs_BA",7:"ca_ES",8:"cs_CZ",9:"cy_GB",10:"da_DK",11:"de_DE",12:"el_GR",13:"en_GB",14:"en_PI",15:"en_UD",16:"en_US",17:"eo_EO",18:"es_ES",19:"es_LA",20:"et_EE",21:"eu_ES",22:"fa_IR",23:"fb_LT",24:"fi_FI",25:"fo_FO",26:"fr_CA",27:"fr_FR",28:"fy_NL",29:"ga_IE",30:"gl_ES",31:"he_IL",32:"hi_IN",33:"hr_HR",34:"hu_HU",35:"hy_AM",36:"id_ID",37:"is_IS",38:"it_IT",39:"ja_JP",40:"ka_GE",41:"ko_KR",
42:"ku_TR",43:"la_VA",44:"lt_LT",45:"lv_LV",46:"mk_MK",47:"ml_IN",48:"ms_MY",49:"nb_NO",50:"ne_NP",51:"nl_NL",52:"nn_NO",53:"pa_IN",54:"pl_PL",55:"ps_AF",56:"pt_BR",57:"pt_PT",58:"ro_RO",59:"ru_RU",60:"sk_SK",61:"sl_SI",62:"sq_AL",63:"sr_RS",64:"sv_SE",65:"sw_KE",66:"ta_IN",67:"te_IN",68:"th_TH",69:"tl_PH",70:"tr_TR",71:"uk_UA",72:"vi_VN",73:"zh_CN",74:"zh_HK",75:"zh_TW"},google:{def:"de","0":"ar",1:"bg",2:"ca",3:"zh-CN",4:"zh-TW",5:"hr",6:"cs",7:"da",8:"nl",9:"en-GB",10:"en-US",11:"et",12:"fil",
13:"fi",14:"fr",15:"de",16:"el",17:"iw",18:"hi",19:"hu",20:"id",21:"it",22:"ja",23:"ko",24:"lv",25:"lt",26:"ms",27:"no",28:"fa",29:"pl",30:"pt-BR",31:"pt-PT",32:"ro",33:"ru",34:"sr",35:"sk",36:"sl",37:"es",38:"es-419",39:"sv",40:"th",41:"tr",42:"uk",43:"vi"}};return{getText:function(a,c,b){var a="undefined"==typeof b?a:b?a+".sing":a,b=[],b="undefined"==typeof c?{}:c,f=f||new SLAYER.LANGUAGE,c=f.getLanguage()[a];if("undefined"==typeof c)return a;var a=c.split("%s"),f="",j=a.length;if(1<j){if(SLAYER.CORE.Utils.isArray(b))for(c=
0;0<b.length&&c<j;)f=0!=c?f+(b.shift()+a[c]):f+a[c],c++;else f=a[0]+b+a[1];return f}return c},getValidLanguage:function(a,g){if("undefined"==typeof c[a])return!1;var b="",f=0,j;for(j in c[a])if("def"!=j){if(g==c[a][j])return g;var o=SLAYER.CORE.Utils.compareStrings(g,c[a][j]);o>f&&(b=c[a][j],f=o)}0==f&&(console.log("set default"),b=c[a].def);return b}}}();Namespace("SLAYER.UI");SLAYER.UI.HELPER=function(){return{getLoadingIcon:function(){return'<center><img src="/sharedpages/static/plugin/social/slayer/img/dialog/default/ajax-loader.gif" border="0" /></center>'}}}();Namespace("SLAYER");
SLAYER.EVENTS=function(c){function a(){this.append=b;this.length=0;this.lastNode=this.firstNode=null;return!0}function g(a){this.text=a;this.next=null;return!0}function b(a){null==this.firstNode&&(this.firstNode=a);this.lastNode&&(this.lastNode.next=a);this.lastNode=a;this.length++}function f(){if(!v){var a=Math.round(Math.random()*(s-500)+500);h&&clearTimeout(h);h=setTimeout(j,a)}}function j(){SLAYER.JQUERY("#slayer_ticker div:first").animate({height:"0px",opacity:"toggle"},"slow",function(){SLAYER.JQUERY(this).remove();
SLAYER.JQUERY("#slayer_ticker div").length<=m&&("game"==p?q.getGameEventItems():"user"==p&&q.getUserEventItems());SLAYER.JQUERY("#slayer_ticker div:nth-child("+m+")").fadeIn("slow");f()})}function o(a){var b=!1;SLAYER.JQUERY.each(t,function(d,i){i==a&&(b=!0)});return b}var q=null,m=0,s=0,w="",k=this,n=null,e={},h=0,p="",v=!1,u=null,t=[];k.isDevEnv=!1;k.handleTickerData=function(b,c){if(null==b.data)k.debug("WARNING: No response data","warning");else if(b.data.itemCount){b.data.itemCount>=m&&(e=new a,
p=c);var d=0;for(d in b.data.items)if(b.data.items[d].text){var i=new g(b.data.items[d].text);e.append(i)}d=e.firstNode;i=0;if(d){do{var x=SLAYER.JQUERY("<div><span><span>"+d.text+"</span></span></div>");SLAYER.JQUERY("#slayer_ticker").append(x);x.index()>=m&&x.hide();d=d.next;i++}while(d)}f()}};k.debug=function(a,b){SLAYER.CORE.Log.debug(a,k.getSettings().core.getSettings().debugFilter,"EVENTS",b||"")};k.getSettings=function(){return n};k.setSettings=function(a){n=a};k.run=function(a){k.debug("Call Handler");
switch(a){case "renderGameTicker":q.getGameEventItems();break;case "renderUserTicker":q.getUserEventItems();break;case "getFeed":a=u;a.feed="undefined"==typeof a.feed?"":a.feed;o(a.feed)?"undefined"==typeof a.callback?k.debug("FEED: WARNING: No callback found","warning"):(a={url:k.getSettings().core.getSettings().dispatcherUrl,type:"GET",dataType:"json",success:a.callback,error:k.getSettings().core.ajaxError,data:{slService:"event:get"+a.feed}},k.getSettings().core.ajax(a)):k.debug('FEED: ERROR: Feed "'+
a.feed+'" not found',"error");break;default:k.debug("HANDLER: ERROR: No function found! ("+a+")","error")}};k.setRunSettings=function(a){u=a};k.CSSLoadingDone=function(){n.core.removeLoader("events")};(function(b){t.push("UserGameFeed");t.push("GlobalUserFeed");t.push("GlobalUserGameFeed");t.push("BatchedGlobalUserGameFeed");t.push("GameFeed");t.push("BatchedGameFeed");t.push("GlobalFeed");k.setSettings(b);new SLAYER.CSS({core:k.getSettings().core,caller:k});q=new SLAYER.EVENTSMODEL({events:k});k.isDevEnv=
b.core.isDevEnv;b=k.getSettings();m="undefined"==typeof b.itemLimit?4:b.itemLimit;s="undefined"==typeof b.itemSpeed?5E3:b.itemSpeed;w="undefined"==typeof b.renderTarget?!1:b.renderTarget;b.selectItems="undefined"==typeof b.selectItems?10:10<b.selectItems?10:b.selectItems;b.userKeyId="undefined"==typeof b.userKeyId?k.debug("No user key id found!"):b.userKeyId;w?SLAYER.JQUERY("#"+w).append('<div id="slayer_ticker"></div>'):k.debug("ERROR: No renderTarget in settings");e=new a;k.getSettings().core.updateLoader("events",
"externals",!0)})(c)};Namespace("SLAYER");
SLAYER.EVENTSMODEL=function(c){var a=this,g=null;a.getGameEventItems=function(){var b=g.getSettings();a.ajax({type:"POST",data:{slService:"event:getGametickerFeed",slP:{offset:0,limit:b.selectItems}},dataType:"json",url:"undefined"==typeof b.dispatcherUrl?"undefined"==typeof b.actionUrl?"":b.actionUrl:b.dispatcherUrl,success:function(a){g.handleTickerData(a,"game")},error:function(a,b,c){g.getSettings().core.ajaxError(a,b,c)}})};a.getUserEventItems=function(){var b=g.getSettings();a.ajax({type:"POST",
data:{slService:"event:getUserFeed",slP:{offset:0,limit:b.selectItems}},dataType:"json",url:"undefined"==typeof b.dispatcherUrl?"undefined"==typeof b.actionUrl?"":b.actionUrl:b.dispatcherUrl,success:function(a){g.handleTickerData(a,"user")},error:function(a,b,c){g.getSettings().core.ajaxError(a,b,c)}})};a.ajax=function(a){g.getSettings().core.ajax(a)};g=c.events};SLAYER.FACEBOOK=function(c){var a,g;function b(){if("undefined"==typeof FB){f("FB was undefined");var d=e;e.language=SLAYER.CORE.I18n.getValidLanguage("facebook","undefined"==typeof e.language?u:e.language);var d="http://connect.facebook.net/"+d.language+"/all.js",i=document.getElementsByTagName("head")[0],a=document.createElement("script");a.type="text/javascript";a.onreadystatechange=function(){"complete"==this.readyState&&b()};"Microsoft Internet Explorer"==navigator.appName&&a.attachEvent("onreadystatechange",
b);a.onload=function(){b()};a.src=d;i.appendChild(a)}else f("Facebook was already loaded"),null==FB._apiKey&&window.fbAsyncInit(),e.core.updateLoader("facebook","externals",!0)}function f(d,a){SLAYER.CORE.Log.debug(d,"","FACEBOOK",a||"")}function j(d){p.hideGameClient();FB.ui(d,function(a){if(null==typeof d.callbacks)f("WARNING: No callback for request found!","warning");else{if("undefined"==typeof d.callbacks.onDone)f("WARNING: No onDone callback found!","warning");else d.callbacks.onDone();if(a)if("undefined"==
typeof d.callbacks.onSuccess)f("WARNING: No onSuccess callback found!","warning");else d.callbacks.onSuccess(a);else if("undefined"==typeof d.callbacks.onFailed)f("WARNING: No onFailed callback found!","warning");else d.callbacks.onFailed(a)}p.unhideGameClient()})}function o(){var d=h;FB.Event.subscribe("edge.create",function(a){"undefined"==typeof d.callback?f("WARNING: You did not registered any kind of callback!","warning"):d.callback(a)})}function q(){FB.getLoginStatus(function(d){if("undefined"==
typeof d.status)return!1;d=d.status;d==a?!1==x&&(x=!0,FB.api("/me/friends?fields=name,picture",s)):m(d)},!0)}function m(d){var a=e,i=a.core.getSettings();FB.login(function(a){a.authResponse&&("not_authorized"===d&&e.core.ajax({dataType:"json",type:"POST",data:{slService:"connect:storeFacebookId",slP:{accessToken:a.authResponse.accessToken,fbUserId:a.authResponse.userID,userId:i.userId,userKeyId:i.userKeyId}},url:"undefined"==typeof i.dispatcherUrl?i.actionUrl:i.dispatcherUrl,success:function(){},
error:function(){}}),q(a.status))},{scope:a.permissions})}function s(d){var a=d.data,i="undefined"==typeof e.message?"Play with me.":e.message;p.getModule("invite").getView().renderContacts(a,{main:"slayer_friendSelect",table:"slayer_friendSelectFacebookFriends",button:"slayer_friendSelectFacebooFriendsButton",select:"slayer_fbContactSelectAll",unselect:"slayer_fbContactUnselectAll",limit:"slayer_fbContactInviteLimit"},function(a){for(var b=p.getSettings(),c="",f=0;f<a.length;f++)c+=""==c?a[f]:","+
a[f];FB.ui({method:"apprequests",message:i,to:c,data:{inviteCode:SLAYER.getInviteCode({userId:b.userId,userKeyId:b.userKeyId,instanceId:b.instanceId,affiliateId:b.affiliateId,type:"facebook"})}},function(a){if("undefined"!=typeof a&&null!=a){var i={},b=function(d,a){var i={};SLAYER.JQUERY.each(d.data,function(d,b){if(b.id==a)return i=b,!0});return i};SLAYER.JQUERY.each(a.to,function(a,c){var f=b(d,c);i[f.name]=!0});p.getModule("invite").getView().showResult(i)}})})}function w(){"function"==typeof h.callback&&
n(function(){FB.api("/me/friends?fields=name,picture",h.callback)})}function k(d){FB.getLoginStatus(function(a){i=a.status;d()})}function n(d){null==i?k(function(){n(d)}):i==g?FB.login(function(){d()}):d()}var e=null,h=null,p=null,v=null,u="en_US",t=null,l=this,r=this,d=this,i=null;g="unknown";a="connected";var x=!1;l.setRunSettings=function(d){h=d};l.run=function(d){switch(d){case "doWallPost":var a=h;"undefined"==typeof a.title&&f("WARNING: No title found!","warning");"undefined"==typeof a.userId&&
f("WARNING: No userId found!","warning");"undefined"==typeof a.userKeyId&&f("WARNING: No userKeyId found!","warning");"undefined"==typeof a.actionLink&&f("WARNING: No action link  found!","warning");"undefined"==typeof a.mediaItem&&f("WARNING: No media item found!","warning");"undefined"==typeof a.mediaItem.source&&f("WARNING: No media item source found!","warning");"undefined"==typeof a.mediaItem.type&&f("WARNING: No media item type found!","warning");"undefined"==typeof a.mediaItem.href&&f("WARNING: No media item href found!",
"warning");"undefined"==typeof a.actions&&f("WARNING: No actions object found!","warning");"undefined"==typeof a.actions.name&&f("WARNING: No actions name found!","warning");"undefined"==typeof a.actions.link&&f("WARNING: No actions link found!","warning");"undefined"==typeof a.description&&f("WARNING: No description found!","warning");"undefined"==typeof a.userDefaultMessage&&f("WARNING: No user default message found!","warning");"undefined"==typeof a.caption&&f("WARNING: No caption found!","warning");
"undefined"==typeof a.assignee&&(a.assignee=null);"undefined"==typeof a.callbacks&&(a.callbacks=null);d=e;d={userId:a.userId,userKeyId:a.userKeyId,type:"b",instanceId:d.gameId,affiliateId:d.affiliateId};d="?inviteCode="+p.getShare().getInviteCode(d);a.actionLink+=d;a.mediaItem.href+=d;a.actions.link+=d;d={method:"feed",name:a.title,link:a.actionLink,picture:a.mediaItem.source,description:a.description,message:a.userDefaultMessage,to:a.assignee,caption:a.caption,callbacks:a.callbacks};"undefined"!=
typeof a.actions&&(d.actions=a.actions);j(d);break;case "renderLike":d=e;if(t.isFacebookLikeAllowed(d.affiliateId,d.gameId)){f("Preparing render settings");var d=h,i="<fb:like";for(a in d){var b=d[a];"container"!=a&&(i="ref"==a?i+' ref="2640"':i+(" "+a+'="'+b+'"'))}i+="></fb:like>";f("Render LIKE button");a=document.getElementById(d.container);null!=a?(a.innerHTML=i,o(),FB.XFBML.parse(document.getElementById(d.container)[0])):f("Could not find container '"+d.container+"'. Please check your DOM","error")}else f("WARNING: Like button is blocked by Sales-Tool",
"warning");break;case "sendRequest":a={type:h.type,data:h.data};d=h;i="undefined"==typeof h.filter?v._default:h.filter;i!=v._default&&"undefined"==typeof v[i]&&(f("WARNING: Filter is invalid! It will be set to default!","warning"),i=v._default);d.filter=i;"undefined"==typeof h.title&&f("WARNING: No title found!","warning");"undefined"==typeof h.message&&f("WARNING: No message found!","warning");"undefined"==typeof h.callbacks&&f("WARNING: No callbacks found!","warning");"undefined"==typeof h.data&&
(h.data="");"undefined"==typeof h.to&&(h.to=null);j({method:"apprequests",title:h.title,message:h.message,to:h.to,callbacks:h.callbacks,filters:[h.filter],data:a});break;case "renderFriends":q();break;case "getFriends":w();break;case "init":f("FB Loading & Initiation done!");break;default:f("HANDLER: ERROR: No function found! ("+d+")","error")}};l.getLanguage=function(){return"undefined"==typeof e.language?"":e.language};l.getAppId=function(){var a=!1;if("undefined"!=typeof p.getSettings().gameId)if("undefined"!=
typeof e.appId)a=e.appId;else{var i=-1==location.hostname.search("bigpoint.net")?"live":"dev";"live"==i&&(a=d.getSettings()[p.getSettings().gameId]);"dev"==i&&(a=r.getSettings()[p.getSettings().gameId])}return"undefined"==typeof a?!1:a};(function(a){p=a.core;r=new SLAYER.FBDEV;d=new SLAYER.FBLIVE;if(null==document.getElementById("fb-root")){var i=document.getElementsByTagName("body")[0],c=document.createElement("div");i.appendChild(c)}"undefined"!=typeof a?e=a:f("ERROR: No initialization parameter found!",
"error");"undefined"==typeof window.fbAsyncInit&&(window.fbAsyncInit=function(){FB.init({appId:l.getAppId(),status:!0,cookie:!0,xfbml:!1,oauth2:!1});f("FB initialized with AppId "+l.getAppId())});v={_default:"all",all:["all"],app_users:["app_users"],non_app_users:["non_app_users"]};b("init");t=new SLAYER.AFFILIATE(e.core)})(c)};Namespace("SLAYER");
SLAYER.GOOGLE=function(c){function a(a,b){SLAYER.CORE.Log.debug(a,m.core.getSettings().debugFilter,"GOOGLE",b||"")}function g(){if(0==s.length)a("All Google modules are loaded"),m.core.updateLoader("google","externals",!0);else{var b=s.shift();SLAYER.JQUERY.getScript(o+b,function(){a("Loaded module: "+b);g()})}}function b(){if(q.isGooglePlusOneAllowed(m.affiliateId,m.gameId)){var b=j;if("undefined"==typeof b.container)a("PLUSONE: ERROR: No container found!","error");else{var c=b.container;b.container=
void 0;"undefined"==typeof b.href&&(a("PLUSONE: WARNING: Parameter 'href' not found.","warning"),b.href="http://www.bigpoint.com");"undefined"==typeof b.size&&(a("PLUSONE: WARNING: Parameter 'size' not found.","warning"),b.size="standard");"undefined"==typeof b.annotation&&(a("PLUSONE: WARNING: Parameter 'annotation' not found.","warning"),b.annotation="none");"undefined"==typeof b.width&&(a("PLUSONE: WARNING: Parameter 'width' not found.","warning"),b.width=0);"undefined"==typeof b.expandto&&(a("PLUSONE: WARNING: Parameter 'expandto' not found.",
"warning"),b.expandto="");"undefined"==typeof b.callback&&(a("PLUSONE: WARNING: Parameter 'callback' not found.","warning"),b.callback=function(){});"undefined"==typeof b.onstartinteraction&&(a("PLUSONE: WARNING: Parameter 'onstartinteraction' not found.","warning"),b.onstartinteraction=function(){});"undefined"==typeof b.onendinteraction&&(a("PLUSONE: WARNING: Parameter 'onendinteraction' not found.","warning"),b.onendinteraction=function(){});gapi.plusone.render(c,b)}}else a("Plusone button is blocked by Sales-Tool")}
function f(){if(171!=m.gameId&&311!=m.gameId)a("WARNING: Sharing is not available for your game","warning");else if(q.isGooglePlusOneAllowed(m.affiliateId,m.gameId)){var b=j;b.renderType="undefined"==typeof b.renderType?"direct":b.renderType;"undefined"==typeof b.type&&(a("SHARE: WARNING: Parameter 'type' not found!","warning"),b.type="http://www.bigpoint.com");if("undefined"==typeof b.properties)a("SHARE: ERROR: No 'properties' object found!","error");else if("undefined"==typeof b.properties.name&&
(a("SHARE: WARNING: Parameter 'name' not found!","warning"),b.properties.name="Bigpoint"),"undefined"==typeof b.properties.description&&(a("SHARE: WARNING: Parameter 'description' not found!","warning"),b.properties.description="No description"),"undefined"==typeof b.properties.image&&(a("SHARE: WARNING: Parameter 'image' not found!","warning"),b.properties.image=""),"undefined"==typeof b.properties.url)a("SHARE: WARNING: Parameter 'url' not found!","warning"),b.properties.url="http://www.bigpoint.com";
var c={items:[b]},f={apiMode:"games"};if("container"==b.renderType){window.SLAYER_SHARE=function(){gapi.share.lightbox(c,f)};var e='<a href="javascript:SLAYER_SHARE();">'+("undefined"==typeof b.text?"Share with Google":b.text)+"</a>";SLAYER.JQUERY("#"+b.container).html(e)}else gapi.share.lightbox(c,f)}else a("WARNING: Plusone button is blocked by Sales-Tool","warning")}var j=null,o="https://apis.google.com/js/",q=null,m=null,s=[];this.setRunSettings=function(a){j=a};this.run=function(c){a("Call Handler");
switch(c){case "renderPlusOne":b();break;case "renderShare":f();break;default:a("HANDLER: ERROR: Function not found("+c+")","error")}};this.getLanguage=function(){return"undefined"==typeof m.language?"":m.language};(function(a){m="undefined"!=typeof a?a:null;m.language=SLAYER.CORE.I18n.getValidLanguage("google","undefined"==typeof m.language?"en-US":m.language);window.___gcfg={lang:a.language,parsetags:"explicit"};q=new SLAYER.AFFILIATE(m.core);s.push("plusone.js");g()})(c)};Namespace("SLAYER");
SLAYER.MAILHANDLER=function(){function c(a,b){SLAYER.instance.debug("MAILHANDLER: "+a,b)}var a=this;a.validateEmails=function(g){c("Validate emails...");if(g=a.prepareEmails(g)){var b=0!=g.length;SLAYER.JQUERY.each(g,function(a,g){c("Validate email: "+g);/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(g)||(b=!1)});return b}c("No valid mails after preparation!");return!1};a.prepareEmails=function(a){if(0==a.length)return c("WARNING: No raw data found!","warning"),!1;var a=a.replace(/\s;|\s,|;\s|,\s|;|\s|\x0B|\n\r/g,
",").split(","),b=[];SLAYER.JQUERY.each(a,function(a,c){0!=c&&(b[a++]=c)});return b}};Namespace("SLAYER");SLAYER.FRIENDSHIP=function(c){function a(){var a=g;a.callback="undefined"==typeof a.callback?function(){}:a.callback;b.core.ajax({url:b.dispatcherUrl,dataType:"json",type:"GET",data:{slService:"friendship:getGameFriends"},success:function(b){a.callback(b)},error:b.core.ajaxError})}var g=null,b=null;this.setRunSettings=function(a){g=a};this.run=function(b){switch(b){case "getGameFriends":a()}};b=c;b.core.updateLoader("friendship","externals",!0)};Namespace("SLAYER");
SLAYER.INVITE=function(c){function a(){var a=h.getSettings();a.renderTarget="undefined"==typeof a.renderTarget?"overlay":""==a.renderTarget?"overlay":a.renderTarget;a.dev="undefined"==typeof a.dev?!1:a.dev;a.language="undefined"==typeof a.language?"de_DE":a.language;a.iFrame="undefined"==typeof a.iFrame?!1:a.iFrame;a.editableUsername="undefined"==typeof a.editableUsername?!1:a.editableUsername;a.currentUsername="undefined"==typeof a.currentUsername?b("ERROR: No username found!","error"):a.currentUsername;
a.showTooltip="undefined"==typeof a.showTooltip?!0:a.showTooltip;a.facebookTab="undefined"==typeof a.facebookTab?!0:a.facebookTab;a.addressbookTab="undefined"==typeof a.addressbookTab?!1:a.addressbookTab;a.shareUrl="undefined"==typeof a.shareUrl?!0:a.shareUrl;a.defaultTab="undefined"==typeof a.defaultTab?"Facebook":a.defaultTab;a.showInviteInfo="undefined"==typeof a.showInviteInfo?!1:a.inviteInfo;a.buddyList="undefined"==typeof a.buddyList?!1:a.buddyList;a.additionalCssFile="undefined"==typeof a.additionalCssFile?
"":a.additionalCssFile;a.inviteTypes="undefined"==typeof a.inviteTypes?'{"facebook":"b","twitter":"c","google":"d","mail":"baa","web":"bab"}':a.inviteTypes;a.inviteUrl="undefined"==typeof a.inviteUrl?d:a.inviteUrl;a.onComplete="undefined"==typeof a.onComplete?function(){}:a.onComplete;a.contactInviteLimit=50;a.friendSearch="undefined"==typeof a.friendSearch?{}:a.friendSearch;a.friendSearch.url="undefined"==typeof a.friendSearch.url?b("ERROR: No friend search url found","error"):a.friendSearch.url;
var c=-1==location.href.search("bigpoint.net")?new SLAYER.INVITESETTINGSLIVE:new SLAYER.INVITESETTINGSDEV;a.provider={google:!1,yahoo:!1,live:!1};if("undefined"!=typeof c.getSettings()[a.gameId]&&(c=c.getSettings()[a.gameId],a.defaultTab="undefined"==typeof c.defaultTab?a.defaultTab:c.defaultTab,a.facebookTab="undefined"==typeof c.facebookTab?!1:c.facebookTab,a.shareUrl="undefined"==typeof c.shareUrl?a.shareUrl:c.shareUrl,"Facebook"==a.defaultTab&&!1==a.facebookTab&&(a.defaultTab="Mail"),a.addressbookTab=
"undefined"==typeof c.provider&&"undefined"==typeof c.provider.enable||!1==a.addressbookTab?a.addressbookTab:c.provider.enable,a.addressbookTab))a.provider.google="undefined"==typeof c.provider.google?a.provider.google:c.provider.google,a.provider.yahoo="undefined"==typeof c.provider.yahoo?a.provider.yahoo:c.provider.yahoo;a.shareUrl=g(a.shareUrl);l=a.defaultTab;h.setSettings(a)}function g(a){var d=h.getSettings();if("undefined"==typeof d.userId||"undefined"==typeof d.userKeyId||"undefined"==typeof d.instanceId||
"undefined"==typeof d.affiliateId)a=!1;return a}function b(a,d){SLAYER.CORE.Log.debug(a,p.getSettings().debugFilter,"INVITE",d||"")}function f(){SLAYER.JQUERY("a#slayer_sendMailButton").unbind("click").bind("click",function(){b("Handle email sending");var a=null,d=SLAYER.JQUERY(".slayer_mailInviteInputMessage textarea").val(),c=!0;m.clearErrorMessage();w.validateEmails(SLAYER.JQUERY(".slayer_mailInviteInputEmail textarea").val())?a=w.prepareEmails(SLAYER.JQUERY(".slayer_mailInviteInputEmail textarea").val()):
(c=h.getText("gl.socialInvite.error.input.mails"),m.showEmailError(c),c=!1);b("Validate user message");d.length<=v||(c=[],c[0]=v,m.showUserMessageError(h.getText("gl.socialInvite.error.input.userMessage",c)),c=!1);c&&(m.showLoader(),c=h.getSettings(),c=!SLAYER.JQUERY(".slayer_mailInviteForm input").val()?c.currentUsername:SLAYER.JQUERY(".slayer_mailInviteForm input").val(),s.send({emails:a,userMessage:d,username:c}))});SLAYER.JQUERY(".slayer_closeOverlayBottom").unbind("click").bind("click",function(){m.closeOverlay();
o();j(1)});SLAYER.JQUERY(".slayer_closeOverlay").unbind("click").bind("click",function(){m.closeOverlay();o();j(2)});SLAYER.JQUERY("a#slayer_inviteNewButton").unbind("click").bind("click",function(){m.clearForm();h.setCurrentTab("Mail")});SLAYER.JQUERY("li.slayer_tabsFacebook").unbind("click").bind("click",function(){h.setCurrentTab("Facebook")});SLAYER.JQUERY("li.slayer_tabsAddressbook").unbind("click").bind("click",function(){h.setCurrentTab("Addressbook")});SLAYER.JQUERY("li.slayer_tabsMail").unbind("click").bind("click",
function(){h.setCurrentTab("Mail")});SLAYER.JQUERY("#slayer_buddyList input").bind("click",function(){SLAYER.JQUERY("#slayer_buddyList input").val("")});SLAYER.JQUERY("li.slayer_tabsBuddy").unbind("click").bind("click",function(){var a=SLAYER.JQUERY("#slayer_buddyListResult").data("jsp");"undefined"!=typeof a&&a.destroy();h.setCurrentTab("Buddy")});SLAYER.JQUERY("#slayer_buddyListSearch a").unbind("click").bind("click",function(){var a=h.getSettings(),d={search_str:SLAYER.JQUERY(".buddyId").val()};
p.ajax({endpoint:a.friendSearch.endpoint,data:d,dataType:"json",url:a.friendSearch.url,success:m.displayFriendSearchResults,error:m.displayFriendSearchResults,type:"GET"})})}function j(){if("function"==typeof k.onComplete)k.onComplete()}function o(){b("Reset tabs and hide content");m.hideContent()}function q(){var a=h.getSettings();SLAYER.JQUERY.each(n,function(d,b){"object"==typeof b?SLAYER.JQUERY.each(b,function(d,b){a[d]="1"==b||"0"==b?"1"==b?!0:!1:b}):a[d]="1"==b||"0"==b?"1"==b?!0:!1:b});s=new SLAYER.INVITEMODEL(h);
m=new SLAYER.INVITEVIEW(h);f();a.showInviteInfo&&(s.getUserLimits(),s.getUserInvites())}var m=null,s=null,w=null,k=null,n=null,e=null,h=this,p=null,v=140,u=null,t={},l="",r=[],d="http://"+window.location.host+"/";h.isDevEnv=!1;h.addObjectToLoad=function(a){r.push(a)};h.removeObjectToLoad=function(a){SLAYER.JQUERY.each(r,function(d,b){a==b&&r.splice(d,1)});0==r.length&&h.getSettings().core.updateLoader("invite","externals",!0)};h.CSSLoadingDone=function(){h.removeObjectToLoad("css");p.onReady("invite",
{init:!0,message:""})};h.getRunSettings=function(){return n};h.initTabs=function(){var a=h.getSettings();(a.facebookTab||a.buddyList||a.addressbookTab)&&SLAYER.JQUERY("#slayer_tabs").show()};h.getCurrentTab=function(){return l};h.setCurrentTab=function(a){l=a;m.switchTabs()};h.getSettings=function(){return k};h.setSettings=function(a){k=a};h.getText=function(a,d,b){return SLAYER.CORE.I18n.getText(a,d,b)};h.debug=function(a,d){b(a,d)};h.ajax=function(a){p.ajax(a)};h.ajaxError=function(a,d,b){p.ajaxError(a,
d,b)};h.getView=function(){return m};h.getModel=function(){return s};h.getMail=function(){return w};h.run=function(a){switch(a){case "dialog":m.renderInviteDialog();break;case "button":m.renderInviteDialogButton();break;case "settings":q();break;case "shareUrl":m.getShareUrl()}};h.addFriend=function(a){var d=h.getSettings();p.ajax({data:{slService:"friendship:invite",slP:{invitedID:a.data.userId,invitedKeyID:a.data.userKeyId}},type:"POST",dataType:"json",error:m.addFriendFailedCallback,url:d.dispatcherUrl,
success:m.addFriendCallback})};h.removeFriend=function(a){var d=h.getSettings();p.ajax({data:{slService:"friendship:cancel",slP:{userID:a.data.userId,userKeyID:a.data.userKeyId}},type:"POST",dataType:"json",error:m.removeFriendFailedCallback,url:d.dispatcherUrl,success:m.removeFriendCallback})};h.setRunSettings=function(a){n=a};h.displayFacebookInviteCounter=function(a){SLAYER.JQUERY("#slayer_friendSelectFacebookResponse").html(h.getText("gl.socialInvite.dialog.success.friendsInvited",""+a));SLAYER.JQUERY("#slayer_friendSelectFacebookResponse").attr("onmousedown",
null)};h.getStorage=function(){return t};h.setStorage=function(a){t=a};h.getCore=function(){return p};h.showFacebookFriendSelection=function(){var a=h.getSettings(),a={container:"slayer_friendSelectFacebook",title:a.gameTitle,message:a.facebook.message,data:a.facebook.data,filter:a.facebook.filter,to:a.facebook.to,callbacks:a.facebook.callbacks,forceRendering:!0,counter:!0,invite:h};SLAYER.JQUERY("#"+a.container+"Response").html(SLAYER.UI.HELPER.getLoadingIcon());p.initModule("facebook");p.run({module:"facebook",
func:"renderFriends",settings:a})};(function(d){h.addObjectToLoad("css");h.addObjectToLoad("view");h.addObjectToLoad("model");k=d;p=k.core;h.isDevEnv=p.isDevEnv;e=new SLAYER.LANGUAGE;e=e.getLanguage();a();0==SLAYER.JQUERY("#slayer-root").length?(SLAYER.JQUERY("body").append('<div id="slayer-root"></div>'),b("Created SLAYER-ROOT")):(b("SLAYER-ROOT found"),SLAYER.JQUERY("#slayer-root").empty());0==SLAYER.JQUERY("#slayer-button").length?(SLAYER.JQUERY("body").append('<div id="slayer-button"></div>'),
b("Created SLAYER-BUTTON")):(b("SLAYER-BUTTON found"),SLAYER.JQUERY("#slayer-button").empty());u=new SLAYER.CSS({core:p,caller:h});w=new SLAYER.MAILHANDLER;s=new SLAYER.INVITEMODEL(h);m=new SLAYER.INVITEVIEW(h);h.initTabs();f();k.showInviteInfo&&(s.getUserLimits(),s.getUserInvites());u.loadCSSFiles({isDevEnv:h.isDevEnv,cssDev:k.cssDev,gameId:k.gameId,module:"invite"})})(c)};Namespace("SLAYER");
SLAYER.INVITEVIEW=function(c){function a(a,b){SLAYER.CORE.Log.debug(a,n.getCore().getSettings().debugFilter,"INVITE-VIEW",b||"")}function g(){var d=e.getSettings(),c=e.getSettings(),g={buttonTooltip:e.getText("gl.socialInvite.button.tooltip",c.gameTitle),buddyHeader:e.getText("gl.socialInvite.dialog.buddy.header"),buddyInputValue:e.getText("gl.socialInvite.dialog.buddy.inputValue"),buddyResultHeader:e.getText("gl.socialInvite.dialog.buddy.resultHeader"),desc:e.getText("gl.socialInvite.dialog.desc"),formAgreed:e.getText("gl.socialInvite.dialog.form.agreed"),
formCancel:e.getText("gl.socialInvite.dialog.form.cancel"),formClose:e.getText("gl.socialInvite.dialog.form.close"),formInvited:e.getText("gl.socialInvite.dialog.form.invited"),formInvitedDesc:e.getText("gl.socialInvite.dialog.form.invited.desc"),formInviter:e.getText("gl.socialInvite.dialog.form.inviter"),formMessage:e.getText("gl.socialInvite.dialog.form.message"),formMessageDesc:e.getText("gl.socialInvite.dialog.form.message.desc"),formMoreFriendInvites:e.getText("gl.socialInvite.dialog.form.moreFriendInvites"),
formSearch:e.getText("gl.socialInvite.dialog.form.search"),formSend:e.getText("gl.socialInvite.dialog.form.send"),header:e.getText("gl.socialInvite.dialog.header"),socialNetworkHeader:e.getText("gl.socialInvite.dialog.socialNetworksHeader"),isEditableUser:c.editableUsername,showFbTab:c.facebookTab,showBuddyTab:c.buddyList,showAddressbookTab:c.addressbookTab,showTabs:c.facebook||c.buddyList||c.addressbookTab?!0:!1,showShareURL:c.shareUrl,tabNameBuddy:e.getText("gl.socialInvite.dialog.buddy.tabName"),
tabNameFb:e.getText("gl.socialInvite.dialog.gigya.tabName"),tabNameMail:e.getText("gl.socialInvite.dialog.mail.tabName"),tabNameAddressbook:e.getText("gl.socialInvite.dialog.addressbook.tabName"),userName:c.currentUsername,slideMessageInput:c.slideMessageInput?!0:!1,renderPopup:c.popup};c.shareUrl&&("undefined"==typeof c.shareImage&&(c.shareImage=h),g.shareMsgMail=encodeURIComponent(e.getText("gl.socialInvite.shareURL.message",c.gameTitle)+"\n")+b("mail",!0),g.shareMsg=e.getText("gl.socialInvite.shareURL.message",
c.gameTitle)+"\n"+c.inviteUrl,g.mailFormHeader=e.getText("gl.socialInvite.dialog.mailHeader"),g.shareHeader=e.getText("gl.socialInvite.dialog.shareHeader"),g.shareMsgGoogle=encodeURIComponent(e.getText("gl.socialInvite.shareURL.message",c.gameTitle)+"\n")+b("google",!0),g.shareMsgTwitter=encodeURIComponent(e.getText("gl.socialInvite.shareURL.message",c.gameTitle)),g.inviteUrlGoogle=b("google",!0),g.inviteUrlTwitter=b("twitter",!0),g.inviteUrlWeb=b("web",!1),g.shareMailSubject=e.getText("gl.socialInvite.shareURL.mailSubject",
c.gameTitle),g.shareFacebookPostURL="http://www.facebook.com/dialog/feed?app_id="+c.facebook.appId+"&link="+b("facebook",!0)+"&redirect_uri="+b("facebook",!0)+"&message="+encodeURIComponent(e.getText("gl.socialInvite.shareURL.message",c.gameTitle))+"&picture="+c.shareImage+"&caption="+e.getText("gl.socialInvite.fbCaption")+"&name={{shareMailSubject}}");c=[];c.button=v.to_html(SLAYER.TEMPLATES.inviteTemplateButton,g);c.dialog=v.to_html(SLAYER.TEMPLATES.inviteTemplate,g);SLAYER.JQUERY("#slayer-root").empty();
SLAYER.JQUERY("#slayer-button").empty();SLAYER.JQUERY("#slayer-root").append(c.dialog);g="undefined"==typeof d.hideButton?!1:d.hideButton;SLAYER.JQUERY("#slayer-button").append(c.button);SLAYER.JQUERY("#slayer_dialog").addClass(d.language);g&&SLAYER.JQUERY(".social-invite a").hide();d.slideMessageInput&&f(!1);d.buddyList&&!u&&(SLAYER.JQUERY("#slayer-root").append('<div class="buddyFeedback" style="display:none;"><span></span></div>'),"undefined"!=typeof SLAYER.JQUERY(".buddyFeedback").overlay?u=SLAYER.JQUERY(".buddyFeedback").overlay({oneInstance:!1,
fixed:!1,closeOnClick:!1,top:"center",left:"center"}):a("ERROR: Cannot create Overlay","error"))}function b(a,b){var c=e.getSettings();SLAYER.JQUERY.parseJSON(c.inviteTypes);var f=c.inviteUrl+"?",f=f+n.getModel().getAIDUrlParam(a,"share");"undefined"!=typeof c.userId&&("undefined"!=typeof c.userKeyId&&"undefined"!=typeof c.instanceId&&"undefined"!=typeof c.affiliateId)&&(f+="&invID="+n.getCore().getInviteCode({type:"invite",userId:c.userId,userKeyId:c.userKeyId,instanceId:c.instanceId,affiliateId:c.affiliateId}));
return b?encodeURIComponent(f):f}function f(a){if("undefined"!=typeof a){var b=!0;SLAYER.JQUERY(".slayer_mailInviteInputMessage label").click(function(){b?SLAYER.JQUERY(".slayer_mailInviteInputMessage .slideContent").slideDown():SLAYER.JQUERY(".slayer_mailInviteInputMessage .slideContent").slideUp();b=!b})}}function j(a){var b=e.getSettings(),a=SLAYER.JQUERY(a).overlay({mask:{color:"#333",loadSpeed:200,opacity:0.7},closeOnClick:!1,fixed:!1,oneInstance:!1,onBeforeLoad:function(){b.core.hideGameClient();
k=""==k?SLAYER.JQUERY("#slayer_tabs li").not("li.slayer_tabsCurrent").css("margin-left"):k;n.initTabs();b.facebookTab||b.buddyList||b.addressbookTab?""!=n.getCurrentTab()&&e.switchTabs(1):e.showForm()},onClose:function(){e.clearErrorMessage();e.clearForm();b.core.unhideGameClient();var a=b.onComplete;if(a&&"function"==typeof a){var d=null==n.getStorage()?null:n.getStorage().responseData;a(d)}}});e.setOverlay(a)}function o(a){e.hideContent();SLAYER.JQUERY("#slayer_mailInviteResult").find("ul").remove();
var b=SLAYER.JQUERY("#slayer_mailInviteResult").prepend("<ul></ul>").find("ul");SLAYER.JQUERY.each(a,function(a,d){b.append("<li>"+e.getText(d?"gl.socialInvite.dialog.success.user":"gl.socialInvite.dialog.success.failed",Array(a))+"</li>")});SLAYER.JQUERY("#slayer_mailInviteResult").fadeIn(500)}function q(a){var a="gl.socialInvite.error."+a,b=e.getText(a);return b=b!=a?b:e.getText("gl.socialInvite.error.500")}function m(a){SLAYER.JQUERY("div.buddyFeedback span").empty().append(a);u&&(u.overlay().isOpened()&&
(u.overlay().close(),null!=t&&clearTimeout(t)),u.overlay().load(),t=setTimeout(u.overlay().close,3E3))}function s(){function a(d){document.getElementById("slayer_provider_"+d).onclick=function(){g.contacts(d,{},function(a){if(0==a.length)alert("No contacts found");else{document.getElementById("slayer_contactInviteInput").style.display="block";for(var d=[],b=0;b<a.length;b++){var c={};c.id=a[b].email;c.name=a[b].name==a[b].email||""==a[b].name?a[b].email.split("@")[0]:a[b].name;c.picture="undefined"==
typeof a[b].picture?"/sharedpages/static/plugin/social/slayer/img/dialog/default/dummy_user.png":a[b].picture;d.push(c)}e.renderContacts(d,{main:"slayer_addressbook",table:"slayer_contactTable",button:"slayer_contactInviteButton",select:"slayer_contactSelectAll",unselect:"slayer_contactUnselectAll",limit:"slayer_contactInviteLimit"},function(a){var d=n.getMail(),b=n.getModel(),c=n.getView(),f=SLAYER.JQUERY("textarea[name=slayer_contactMessage]").val();d.validateEmails(a.join(","))?b.send({emails:a,
userMessage:f}):c.showSendError(e.getText("gl.socialInvite.error.200.04"))})}})}}SLAYER.JQUERY("#slayer_contactSelectAll").html("");SLAYER.JQUERY("#slayer_contactUnselectAll").html("");SLAYER.JQUERY("#slayer_contactInviteLimit").html("");SLAYER.JQUERY("#slayer_contactInviteButton").html("");SLAYER.JQUERY("#slayer_contactTable").html("");var b=n.getSettings(),c="",f;for(f in b.provider)b.provider[f]&&(c+='<div id="slayer_provider_'+f+'"> </div>');document.getElementById("slayer_contactTable").innerHTML=
c;var c=SLAYER.CORE.Bp.isDev()?"http://sociallayertest-release.bpdevsys-slayer.bigpoint.net/proxy.html":"http://externs.social.bigpoint.com/proxy.html",g=new r.Rpc({remote:c},{remote:{contacts:{}}});for(f in b.provider)b.provider[f]&&a(f)}var w=null,k="",n=null,e=this,h="",p=[],v=null,u=null,t=null,l=0,r=null;e.getShareUrl=function(){var a=n.getRunSettings();a.encoded="undefined"==typeof a.encoded?!1:a.encoded;var c=b(a.provider,a.encoded);a.callback(c)};e.switchTabs=function(a){"undefined"==typeof a&&
(a="slow");var b="li.slayer_tabs"+n.getCurrentTab();SLAYER.JQUERY(b).animate({"margin-left":0},{duration:a,queue:!1,complete:function(){SLAYER.JQUERY(this).addClass("slayer_tabsCurrent")}});SLAYER.JQUERY("#slayer_tabs li").not(b).animate({"margin-left":e.getTabMargin()},{duration:a,queue:!1,complete:function(){SLAYER.JQUERY(this).removeClass("slayer_tabsCurrent")}});"li.slayer_tabsMail"==b?(e.showForm(500),n.getSettings().showInviteInfo&&(n.getModel().getUserInvites(),n.getModel().getUserLimits())):
"li.slayer_tabsFacebook"==b?e.showFriendSelection(500):"li.slayer_tabsAddressbook"==b?e.showAddressbook(500):"li.slayer_tabsBuddy"==b&&e.showBuddyList(500);SLAYER.JQUERY("#slayer_dialog").removeClass();a=b.substring(3)+"_active";SLAYER.JQUERY("#slayer_dialog").addClass(a)};e.clearForm=function(){SLAYER.JQUERY(".slayer_mailInviteInput textarea").val("");SLAYER.JQUERY("#slayer_mailInviteResult ul").val("");e.clearErrorMessage()};e.renderInviteDialog=function(){a("RenderInviteDialog");if("overlay"==
e.getSettings().renderTarget)null==e.getOverlay()&&(a("Preinitialize the Button"),e.renderInviteDialogButton()),e.getOverlay().overlay().load(),SLAYER.JQUERY("#slayer_dialog").show();else if("popup"==e.getSettings().renderTarget){a("Render dialog in popUp");var d=e.getSettings(),b="http://"+document.location.host,b=b+(d.dev?"/plugin/social/services/slayer/html/template.html":"/sharedpages/static/plugin/social/slayer/html/template.html"),b="undefined"!=typeof p[d.gameId]?p[d.gameId]:b,c;c=""+("gameTitle="+
d.gameTitle+"&");c+="gameId="+d.gameId+"&";c+="affiliateId="+d.affiliateId+"&";c+="dispatcherUrl="+d.dispatcherUrl+"&";c+="currentUsername="+d.currentUsername+"&";c+="editableUsername="+d.editableUsername+"&";c+="language="+d.language+"&";c+="shareUrl="+d.shareUrl+"&";c+="dev="+d.dev+"&";c=encodeURIComponent(c);window.open(b+"?"+c,d.gameTitle,"width=709,height=520").focus()}};e.renderInviteDialogButton=function(){a("RenderInviteDialogButton");e.getSettings().hideButton||SLAYER.JQUERY(".slayer_overlayTrigger").show();
j(".slayer_overlayTrigger a")};e.closeOverlay=function(){w.overlay().close()};e.getSettings=function(){return n.getSettings()};e.setSettings=function(a){n.setSettings(a)};e.getOverlay=function(){return w};e.setOverlay=function(a){w=a};e.getTabMargin=function(){return k?k:0};e.getText=function(a,b,c){return n.getText(a,b,c)};e.hideContent=function(){SLAYER.JQUERY("#slayer_busy").hide();SLAYER.JQUERY("#slayer_mailInvite").hide();SLAYER.JQUERY("#slayer_mailInviteResult").hide();SLAYER.JQUERY(".slayer_mailInviteSendError").hide();
SLAYER.JQUERY("#slayer_friendSelect").hide();SLAYER.JQUERY("#slayer_friendSelectFacebookFriendsButton").hide();SLAYER.JQUERY("#slayer_addressbook").hide();SLAYER.JQUERY("#slayer_buddyList").hide();SLAYER.JQUERY("#slayer_shareUrlContainer").hide();SLAYER.JQUERY("#slayer_tabs li").css("margin-left","");SLAYER.JQUERY("#slayer_buddyListResult").html("");u&&u.overlay().close()};e.showForm=function(a){a="undefined"==typeof a?0:a;e.hideContent();e.clearForm();SLAYER.JQUERY("#slayer_dialogContainer").fadeIn(a);
SLAYER.JQUERY("#slayer_mailInvite").fadeIn(a);SLAYER.JQUERY("#slayer_shareUrlContainer").fadeIn(a)};e.showUserLimits=function(){};e.showUserInvites=function(){};e.showFriendSelection=function(a){a="undefined"==typeof a?0:a;e.hideContent();SLAYER.JQUERY("#slayer_friendSelect").fadeIn(a);setTimeout(n.showFacebookFriendSelection,a)};e.showAddressbook=function(a){a="undefined"==typeof a?0:a;e.hideContent();SLAYER.JQUERY("#slayer_addressbook").fadeIn(a);setTimeout(s,a)};e.showBuddyList=function(a){a="undefined"==
typeof a?0:a;e.hideContent();SLAYER.JQUERY("#slayer_buddyList").fadeIn(a)};e.addFriendCallback=function(a){var b=e.getText("gl.socialInvite.dialog.search.friendAddedFailed"),c=e.getText("gl.socialInvite.dialog.search.friendAdded");m("undefined"==typeof a||null==typeof a?b:"undefined"==typeof a.meta?b:"undefined"==typeof a.meta.success?b:!1==a.meta.success?b:c)};e.addFriendFailedCallback=function(){a("ERROR: Adding a friend failed (Ajax Error)","error")};e.removeFriendCallback=function(a){var b=e.getText("gl.socialInvite.dialog.search.friendRemovedFailed"),
c=e.getText("gl.socialInvite.dialog.search.friendRemoved");m("undefined"==typeof a||null==typeof a?b:"undefined"==typeof a.meta?b:"undefined"==typeof a.meta.success?b:!1==a.meta.success?b:c)};e.removeFriendFailedCallback=function(){a("ERROR: Removing a friend failed (Ajax Error)","error")};e.clearErrorMessage=function(){SLAYER.JQUERY(".slayer_mailInviteInputMessage .slayer_mailInviteHelpText").html(e.getText("gl.socialInvite.dialog.form.message.desc"));SLAYER.JQUERY(".slayer_mailInviteInputEmail .slayer_mailInviteHelpText").html(e.getText("gl.socialInvite.dialog.form.invited.desc"));
SLAYER.JQUERY(".slayer_mailInviteFooterError").html("");SLAYER.JQUERY(".slayer_mailInviteInput").removeClass("slayer_mailInviteInputError")};e.showLoader=function(){e.clearErrorMessage();e.hideContent();SLAYER.JQUERY("#slayer_busy").fadeIn(500)};e.showSendError=function(a){a="undefined"==typeof a?"":a;SLAYER.JQUERY("#slayer_mailInvite").show();SLAYER.JQUERY("#slayer_busy").hide();SLAYER.JQUERY(".slayer_mailInviteSendError").html(a);SLAYER.JQUERY(".slayer_mailInviteSendError").fadeIn(500)};e.updateHTML=
function(){g()};e.handleServiceResponse=function(a){a="undefined"==typeof a?null:a;e.clearErrorMessage();null==a?e.showSendError(q()):null==a.data?e.showSendError(q(a.meta.error)):o(a.data)};e.showEmailError=function(a){SLAYER.JQUERY(".slayer_mailInviteInputEmail .slayer_mailInviteHelpText").html(a);SLAYER.JQUERY(".slayer_mailInviteInputEmail").addClass("slayer_mailInviteHelpError")};e.showUserMessageError=function(a){SLAYER.JQUERY(".slayer_mailInviteInputMessage .slayer_mailInviteHelpText").html(a);
SLAYER.JQUERY(".slayer_mailInviteInputMessage").addClass("slayer_mailInviteHelpError")};e.displayFriendSearchResults=function(a){var a="undefined"==typeof a?"":"undefined"==typeof a.data?"":a.data,b="<ul>";if(0==a.length)b=e.getText("gl.socialInvite.dialog.search.nothingFound"),SLAYER.JQUERY("#slayer_buddyListResult").html(b);else{var c=[];SLAYER.JQUERY.each(a,function(a,d){b=1==d.isFriend?b+v.to_html(SLAYER.TEMPLATES.inviteTemplateItemRemove,d):b+v.to_html(SLAYER.TEMPLATES.inviteTemplateItemAdd,
d);c[d.userId]=d.userKeyId});b+="</ul>";a=SLAYER.JQUERY("#slayer_buddyListResult").data("jsp");"undefined"!=typeof a&&a.destroy();SLAYER.JQUERY("#slayer_buddyListResult").html();SLAYER.JQUERY("#slayer_buddyListResult").html(b);SLAYER.JQUERY("#slayer_buddyListResult").jScrollPane();SLAYER.JQUERY(".slayer_buddyAdd").bind("click",function(){var a=SLAYER.JQUERY(this).attr("value"),b=c[a];SLAYER.JQUERY(this).css("backgroundPosition","bottom left");SLAYER.JQUERY(this).unbind("click");n.addFriend({data:{userId:a,
userKeyId:b}})});SLAYER.JQUERY(".slayer_buddyDel").bind("click",function(){var a=SLAYER.JQUERY(this).attr("value"),b=c[a];SLAYER.JQUERY(this).css("backgroundPosition","bottom left");SLAYER.JQUERY(this).unbind("click");n.removeFriend({data:{userId:a,userKeyId:b}})})}};e.renderContacts=function(a,b,c){function f(a){a=a.replace("@","");return a=a.replace(".","")}a.sort(function(a,b){return a.name<b.name?-1:a.name==b.name?0:1});l=0;var g='<table id="slayer_contacts"><tr>',h=0;SLAYER.JQUERY.each(a,function(a,
b){4==h&&(g+="</tr><tr>",h=0);b.picture="no image"==b.picture?"":b.picture;var c=-1==b.id.search("@")?b.name:b.id;g+='<td><div class="slayer_contact" id="slayerContact-'+f(b.id)+'">';g+='<img class="slayer_contactImage" src="'+b.picture+'" title="'+c+'" /><br />';g+="<b>"+b.name+"</b></div></td>";h++});var g=g+"</table>",j='<a id="slayer_contactsInviteButton" class="slayer_button" href="javascript:;"><span><em>'+e.getText("gl.socialInvite.dialog.form.send")+"</em></span></a>";SLAYER.JQUERY("#"+b.table).html();
SLAYER.JQUERY("#"+b.table).html(g);SLAYER.JQUERY("#"+b.button).empty().html(j);SLAYER.JQUERY("#"+b.table).jScrollPane();SLAYER.JQUERY.each(a,function(a,b){var c="#slayerContact-"+f(b.id);SLAYER.JQUERY(c).bind("click",function(){SLAYER.JQUERY(this).hasClass("slayer_contactSelected")?(SLAYER.JQUERY(this).removeClass("slayer_contactSelected"),l--):l<e.getSettings().contactInviteLimit&&(SLAYER.JQUERY(this).addClass("slayer_contactSelected"),l++)})});SLAYER.JQUERY("#"+b.button).bind("click",function(){var e=
SLAYER.JQUERY("#"+b.table+" .slayer_contactSelected"),g=[];SLAYER.JQUERY.each(e,function(){var b=this.id.substring(14);SLAYER.JQUERY.each(a,function(a,c){f(c.id)==b&&(b=c.id)});g.push(b)});c(g)})};e.showResult=function(a){o(a)};(function(b){n=b;v=Mustache;b=e.getSettings();"undefined"==typeof b.gameTitle&&(a("WARNING: You didnt set a game title. Tooltip will be disabled!","warning"),SLAYER.JQUERY(".slayer_overlayTrigger a").attr("title",""),b.showTooltip=0,e.setSettings(b));h="http://assets-575-www.bigpoint.net/marketingassets/bigpoint/bigpoint_logo_90x90.jpg";
g();e.getSettings().invite=n;e.clearErrorMessage();n.removeObjectToLoad("view");r=easyXDM})(c)};Namespace("SLAYER");
SLAYER.INVITEMODEL=function(c){var a=null,g=this;g.getSettings=function(){return a.getSettings()};g.setSettings=function(b){a.setSettings(b)};g.getText=function(b,c,g){return a.getText(b,c,g)};g.getUserLimits=function(){var b=g.getSettings();g.ajax({type:"POST",data:{slService:"invite:getUserLmits"},dataType:"json",url:"undefined"==typeof b.dispatcherUrl?b.actionUrl:b.dispatcherUrl,success:function(a){g.showUserLimits(a.data)},error:function(b,c,g){a.ajaxError(b,c,g)}})};g.getUserInvites=function(){var b=
g.getSettings();g.ajax({type:"POST",data:{slService:"invite:getUserInvites"},dataType:"json",url:"undefined"==typeof b.dispatcherUrl?b.actionUrl:b.dispatcherUrl,success:function(a){g.showUserInvites(a.data)},error:function(b,c,g){a.ajaxError(b,c,g)}})};g.ajax=function(b){a.ajax(b)};g.ajaxError=function(b,c,g){a.ajaxError(b,c,g)};g.send=function(b){var c=g.getSettings(),j=null,o=null,o=c.currentUsername,j=document.getElementById("slayer_customUsername");null!=j&&0<j.value.length&&(o=j.value);"undefined"!=
typeof c.dispatcherUrl?(j=c.dispatcherUrl,o={slService:"invite:sendinvite",slP:{emails:b.emails.join(","),userMessage:b.userMessage,userName:o}},c.dev&&(o.slP.userID=c.userId,o.slP.userKeyID=c.userKeyId,o.slP.gameID=c.gameId,o.slP.instanceID=c.instanceId,o.slP.language=c.language)):(j=c.actionUrl,o={emails:b.emails.join(","),userMessage:b.userMessage,userName:o});g.ajax({url:j,data:o,success:function(b){var c=a.getStorage();c.responseData=b==null?b:b.data!=null?b.data:b;a.setStorage(c);a.getView().handleServiceResponse(b)},
error:function(){a.getView().showSendError(g.getText("gl.socialInvite.error.500"))}})};g.getAIDUrlParam=function(a,c){var g=[];g.facebook={share:3520,gigyaShare:3518,invite:2641};g.twitter={share:3521,gigyaShare:3519};g.email={share:2883};g.google={share:3547};g.web={share:3546};var o="";"undefined"!=typeof g[a]&&"undefined"!=typeof g[a][c]&&(o="&aid="+g[a][c]);return o};a=c;g.getSettings();a.removeObjectToLoad("model")};Namespace("SLAYER.TEMPLATES");SLAYER.TEMPLATES.inviteTemplate='<div id="slayer_dialogContainer" {{#renderPopup}}class="slayer_popup"{{/renderPopup}}>\n        <div id="slayer_dialog" style="display:none;">\n            {{#showTabs}}\n            <div id="slayer_tabs" style="display:none;">\n                <ul>\n                    {{#showFbTab}}\n                    <li class="slayer_tabsFacebook slayer_tabsCurrent"><a href="#"><div class="icon"></div>{{tabNameFb}}</a></li>\n                    {{/showFbTab}}\n                    <li class="slayer_tabsMail"><a href="#"><div class="icon"></div>{{tabNameMail}}</a></li>\n                    {{#showBuddyTab}}\n                    <li class="slayer_tabsBuddy"><a href="#"><div class="icon"></div>{{tabNameBuddy}}</a></li>\n                    {{/showBuddyTab}}\n                    {{#showAddressbookTab}}\n                    <li class="slayer_tabsAddressbook"><a href="#"><div class="icon"></div>{{tabNameAddressbook}}</a></li>\n                    {{/showAddressbookTab}}\n                </ul>\n            </div>{{/showTabs}}\n            <div id="slayer_dialogBg">\n                <a class="slayer_closeOverlay close"></a>\n                <div id="slayer_header">\n                    <div id="slayer_headerContent">\n                        <span>{{header}}</span>\n                        <div>{{desc}}</div>\n                    </div>\n                </div>\n                <div id="slayer_content">\n                    {{#showShareURL}}\n                    <div id="slayer_shareUrlContainer">\n                        <div class="slayer_title"><span>{{shareHeader}}</span></div>\n                        <div id="slayer_shareUrl">\n                            <a class="slayer_shareUrlIcons slayer_shareUrlIconFb" target="_blank" href="{{shareFacebookPostURL}}"></a>\n                            <a href="mailto:%20?subject={{shareMailSubject}}&body={{shareMsgMail}}" class="slayer_shareUrlIcons slayer_shareUrlIconMail" alt="share url via email"></a>\n                            <script type="text/javascript" src="http://platform.twitter.com/widgets.js"><\/script>\n                            <div id="custom-tweet-button"><a target="_blank" href="http://twitter.com/share?url={{inviteUrlTwitter}}&amp;text={{shareMsgTwitter}}&amp;count=none" class="slayer_shareUrlIcons slayer_shareUrlIconTwitter"></a></div>\n                            <span class="slayer_shareUrlText">{{inviteUrlWeb}}</span>\n                        </div>\n                    </div>\n                    {{/showShareURL}}\n                    <div id="slayer_mailInvite">\n                        <div class="slayer_title"><span>{{mailFormHeader}}</span></div>\n                        <div class="inner">\n                          <div class="slayer_mailInviteForm">{{formInviter}}\n                              {{#isEditableUser}}\n                                  <input id="slayer_customUsername" type="text" value="{{userName}}">\n                              {{/isEditableUser}} \n                              {{^isEditableUser}}\n                                  <span>{{userName}}</span>\n                              {{/isEditableUser}}</div>\n                          <div class="slayer_mailInviteInput slayer_mailInviteInputEmail">\n                              <label for="slayer_emails">{{formInvited}}</label>\n                              <textarea type="textarea" name="slayer_emails" rows="4"></textarea>\n                              <div class="slayer_mailInviteHelp">\n                                  <div class="slayer_mailInviteHelpText">{{formInvitedDesc}}</div>\n                              </div>\n                          </div>\n                          <div class="slayer_mailInviteInput slayer_mailInviteInputMessage">\n                              <label for="slayer_message">{{formMessage}}</label>\n                              {{#slideMessageInput}}\n                                  <div class="slayer_mailInviteSlideContent">\n                              {{/slideMessageInput}}\n                                  <textarea type="textarea" name="slayer_message" rows="4"></textarea>\n                                  <div class="slayer_mailInviteHelp">\n                                      <div class="slayer_mailInviteHelpText">{{formMessageDesc}}</div>\n                                  </div>\n                              {{#slideMessageInput}}\n                                  </div>\n                              {{/slideMessageInput}}\n                          </div>\n                      <div class="slayer_mailInviteFooter">\n                            <div class="slayer_mailInviteSendError"></div>\n                            <div class="slayer_mailInviteStatistics"></div>\n                           <a href="javascript:;" class="slayer_button" id="slayer_sendMailButton"><span><em>{{formSend}}</em>{{formAgreed}}</span></a>\n                       </div>\n                     </div>\n                </div>\n                <div id="slayer_mailInviteResult">\n                    <div class="slayer_mailInviteFooter">\n                        <a href="javascript:;" class="slayer_button" id="slayer_inviteNewButton"><span><em>{{formMoreFriendInvites}}</em></span></a>\n                    </div>\n                </div>\n                <div id="slayer_busy"></div>\n                {{#showFbTab}}\n                    <div id="slayer_friendSelect">\n                        <div class="slayer_title"><span>{{socialNetworkHeader}}</span></div>\n                        <div id="slayer_fbContactInviteLimit"></div>\n                        <div id="slayer_fbContactSelectAll"></div>\n                        <div id="slayer_fbContactUnselectAll"></div>\n                        <div id="slayer_friendSelectFacebookFriends"></div>\n                        <div id="slayer_friendSelectFacebooFriendsButton"></div>\n                    </div>\n                {{/showFbTab}}\n                {{#showAddressbookTab}}\n                    <div id="slayer_addressbook">\n                        <div id="slayer_contactInviteLimit"></div>\n                        <div id="slayer_contactSelectAll"></div>\n                        <div id="slayer_contactUnselectAll"></div>\n                        <div id="slayer_contactTable"></div>\n                        <div id="slayer_contactMessage"></div>\n                        <div id="slayer_contactInviteButton"></div>\n                        <div class="slayer_contactInviteInput slayer_contactInviteInputMessage">\n                              <label for="slayer_contactMessage">{{formMessage}}</label>\n                              {{#slideMessageInput}}\n                                  <div class="slayer_contactInviteSlideContent">\n                              {{/slideMessageInput}}\n                                  <textarea name="slayer_contactMessage" rows="4"></textarea>\n                                  <div class="slayer_contactInviteHelp">\n                                      <div class="slayer_contactInviteHelpText">{{formMessageDesc}}</div>\n                                  </div>\n                              {{#slideMessageInput}}\n                                  </div>\n                              {{/slideMessageInput}}\n                        </div>\n                    </div>\n                {{/showAddressbookTab}}\n                {{#showBuddyTab}}\n                    <div id="slayer_buddyList">\n                        <div class="slayer_title"><span>{{buddyHeader}}</span></div>\n                        <div class="inner">\n                          <div class="slayer_buddySearch">\n                              <input type="text" value="{{buddyInputValue}}" class="buddyId">\n                              <div id="slayer_buddyListSearch"><a href="javascript:;"><span><em>{{formSearch}}</em></span></a></div>\n                          </div>\n                          <div class="slayer_title"><span>{{buddyResultHeader}}</span></div>\n                          <div id="slayer_buddyListResult"></div>\n                        </div>\n                    </div>\n                {{/showBuddyTab}}\n                <div class="slayer_closeOverlayBottom"><a href="javascript:;">{{formClose}}</a></div>\n            </div>\n        </div>\n        <div id="slayer_footer"></div>\n        </div>\n    </div>\n';
SLAYER.TEMPLATES.inviteTemplateButton='<div class="slayer_overlayTrigger" style="display:none" >\n    <a href="javascript:;" rel="#slayer_dialog" alt="invite-friends" title="{{buttonTooltip}}">\n        <span>{{formSend}}</span>\n    </a>\n</div>\n';SLAYER.TEMPLATES.inviteTemplateItemRemove='<li><span>{{userName}} (ID: {{userId}})</span><a class="slayer_buddyDel" value="{{userId}}" href="javascript:;" alt="remove buddy"></a></li>\n\n';SLAYER.TEMPLATES.inviteTemplateItemAdd='\n<li><span>{{userName}} (ID: {{userId}})</span><a class="slayer_buddyAdd" value="{{userId}}" href="javascript:;" alt="add buddy"></a></li>\n';SLAYER.FBDEV=function(){var c={195:"",694:"167358906661063",441:"190714187640611",440:"",311:"",826:"171958362865555",623:"",14:"",500:"",721:"",522:"201835296501572",791:"102488683222863",201:"230043510358380",467:"",610:"217541778262500",865:"217541778262500",930:"335671573163506",481:"217541778262500",25:"",936:"217541778262500",86:"",824:"",693:"167358906661063",22:"263446213760589",937:"217541778262500",525:"428675853823282",1:"217541778262500",696:"",454:"",171:"144885742218767",603:"",19:"",
880:""};this.getSettings=function(){return c}};SLAYER.FBLIVE=function(){var c={195:"",441:"172652859589",440:"",311:"",826:"109974702426362",14:"",500:"",721:"109974702426362",522:"201835296501572",791:"429736510389591",221:"230043510358380",467:"",610:"197041727008151",865:"",930:"335671573163506",481:"197041727008151",25:"",936:"",86:"",824:"",22:"364160817714",937:"",525:"428675853823282",1:"174688605996737",696:"",454:"",171:"349417181688",603:"",19:"",880:""};this.getSettings=function(){return c}};SLAYER.DEVSETTINGS=function(){var c={333:{171:{facebook_like:{visible:0},google_plus_one:{visible:0}}},350:{522:{facebook_like:{visible:1},google_plus_one:{visible:0}}},1:[{facebook_like:{visible:1},google_plus_one:{visible:1}}],123:{623:{facebook_like:{visible:0},google_plus_one:{visible:1}}},337:{171:{facebook_like:{visible:0},google_plus_one:{visible:0}},481:{facebook_like:{visible:0},google_plus_one:{visible:1}}},1626:{467:{facebook_like:{visible:1},google_plus_one:{visible:1}}},2043:{522:{facebook_like:{visible:0},
google_plus_one:{visible:0}}}};this.getSettings=function(){return c}};SLAYER.LIVESETTINGS=function(){var c={350:{481:{facebook_like:{visible:0},google_plus_one:{visible:0}},696:{facebook_like:{visible:0},google_plus_one:{visible:1}}},337:{14:{facebook_like:{visible:1},google_plus_one:{visible:1}},171:{facebook_like:{visible:1},google_plus_one:{visible:1}},481:{facebook_like:{visible:1},google_plus_one:{visible:1}},721:{facebook_like:{visible:0},google_plus_one:{visible:0}},930:{facebook_like:{visible:0},google_plus_one:{visible:0}}},415:[{facebook_like:{visible:0},
google_plus_one:{visible:0}}],573:{4:{facebook_like:{visible:0},google_plus_one:{visible:0}},7:{facebook_like:{visible:0},google_plus_one:{visible:0}},10:{facebook_like:{visible:0},google_plus_one:{visible:0}},14:{facebook_like:{visible:0},google_plus_one:{visible:0}},22:{facebook_like:{visible:0},google_plus_one:{visible:0}},54:{facebook_like:{visible:0},google_plus_one:{visible:0}},56:{facebook_like:{visible:0},google_plus_one:{visible:0}},86:{facebook_like:{visible:0},google_plus_one:{visible:0}},
171:{facebook_like:{visible:0},google_plus_one:{visible:0}},204:{facebook_like:{visible:0},google_plus_one:{visible:0}},311:{facebook_like:{visible:0},google_plus_one:{visible:0}},441:{facebook_like:{visible:0},google_plus_one:{visible:0}},481:{facebook_like:{visible:0},google_plus_one:{visible:0}},696:{facebook_like:{visible:0},google_plus_one:{visible:0}},721:{facebook_like:{visible:1},google_plus_one:{visible:0}}},964:[{facebook_like:{visible:0},google_plus_one:{visible:0}}],1417:{171:{facebook_like:{visible:0},
google_plus_one:{visible:0}},311:{facebook_like:{visible:0},google_plus_one:{visible:0}},481:{facebook_like:{visible:0},google_plus_one:{visible:0}},721:{facebook_like:{visible:0},google_plus_one:{visible:0}},930:{facebook_like:{visible:0},google_plus_one:{visible:0}}},2043:{171:{facebook_like:{visible:0},google_plus_one:{visible:0}}},2682:{481:{facebook_like:{visible:0},google_plus_one:{visible:0}}},2863:{481:{facebook_like:{visible:0},google_plus_one:{visible:0}},721:{facebook_like:{visible:0},
google_plus_one:{visible:0}}},3169:{481:{facebook_like:{visible:0},google_plus_one:{visible:0}},721:{facebook_like:{visible:0},google_plus_one:{visible:0}}},3889:[{facebook_like:{visible:0},google_plus_one:{visible:0}}],4491:{311:{facebook_like:{visible:0},google_plus_one:{visible:0}},481:{facebook_like:{visible:0},google_plus_one:{visible:0}}}};this.getSettings=function(){return c}};SLAYER.INVITESETTINGSDEV=function(){var c={195:{shareUrl:!0,defaultTab:"Facebook",facebookTab:!0,provider:{enable:!0,google:!0,yahoo:!0}},694:{shareUrl:!0,defaultTab:"Facebook",facebookTab:!0,provider:{enable:!0,google:!0,yahoo:!0}},441:{shareUrl:!0,defaultTab:"Facebook",facebookTab:!0,provider:{enable:!0,google:!0,yahoo:!0}},440:{shareUrl:!0,defaultTab:"Facebook",facebookTab:!0,provider:{enable:!0,google:!0,yahoo:!0}},311:{shareUrl:!0,defaultTab:"Facebook",facebookTab:!0,provider:{enable:!0,google:!0,
yahoo:!0}},826:{shareUrl:!0,defaultTab:"Facebook",facebookTab:!0,provider:{enable:!0,google:!0,yahoo:!0}},623:{shareUrl:!0,defaultTab:"Facebook",facebookTab:!0,provider:{enable:!0,google:!0,yahoo:!0}},14:{shareUrl:!0,defaultTab:"Facebook",facebookTab:!0,provider:{enable:!0,google:!0,yahoo:!0}},500:{shareUrl:!0,defaultTab:"Facebook",facebookTab:!0,provider:{enable:!1,google:!0,yahoo:!0}},721:{shareUrl:!0,defaultTab:"Facebook",facebookTab:!0,provider:{enable:!0,google:!0,yahoo:!0}},522:{shareUrl:!0,
defaultTab:"Facebook",facebookTab:!0,provider:{enable:!0,google:!0,yahoo:!0}},791:{shareUrl:!0,defaultTab:"Buddy",facebookTab:!0,provider:{enable:!1,google:!0,yahoo:!0}},201:{shareUrl:!0,defaultTab:"Facebook",facebookTab:!0,provider:{enable:!0,google:!0,yahoo:!0}},467:{shareUrl:!0,defaultTab:"Facebook",facebookTab:!0,provider:{enable:!0,google:!0,yahoo:!0}},610:{shareUrl:!0,defaultTab:"Mail",facebookTab:!0,provider:{enable:!0,google:!0,yahoo:!0}},865:{shareUrl:!0,defaultTab:"Mail",facebookTab:!0,
provider:{enable:!0,google:!0,yahoo:!0}},930:{shareUrl:!0,defaultTab:"Mail",facebookTab:!0,provider:{enable:!1,google:!0,yahoo:!0}},481:{shareUrl:!0,defaultTab:"Mail",facebookTab:!0,provider:{enable:!0,google:!0,yahoo:!0}},25:{shareUrl:!0,defaultTab:"Facebook",facebookTab:!0,provider:{enable:!0,google:!0,yahoo:!0}},936:{shareUrl:!0,defaultTab:"Mail",facebookTab:!0,provider:{enable:!0,google:!0,yahoo:!0}},86:{shareUrl:!0,defaultTab:"Facebook",facebookTab:!0,provider:{enable:!0,google:!0,yahoo:!0}},
824:{shareUrl:!0,defaultTab:"Facebook",facebookTab:!0,provider:{enable:!0,google:!0,yahoo:!0}},693:{shareUrl:!0,defaultTab:"Facebook",facebookTab:!0,provider:{enable:!0,google:!0,yahoo:!0}},22:{shareUrl:!0,defaultTab:"Facebook",facebookTab:!0,provider:{enable:!0,google:!0,yahoo:!0}},937:{shareUrl:!0,defaultTab:"Mail",facebookTab:!0,provider:{enable:!0,google:!0,yahoo:!0}},525:{shareUrl:!0,defaultTab:"Mail",facebookTab:!1,provider:{enable:!1,google:!0,yahoo:!0}},1:{shareUrl:!0,defaultTab:"Facebook",
facebookTab:!0,provider:{enable:!0,google:!0,yahoo:!0}},696:{shareUrl:!0,defaultTab:"Facebook",facebookTab:!0,provider:{enable:!0,google:!0,yahoo:!0}},454:{shareUrl:!0,defaultTab:"Facebook",facebookTab:!0,provider:{enable:!0,google:!0,yahoo:!0}},171:{shareUrl:!0,defaultTab:"Facebook",facebookTab:!0,provider:{enable:!0,google:!0,yahoo:!0}},603:{shareUrl:!0,defaultTab:"Facebook",facebookTab:!0,provider:{enable:!1,google:!0,yahoo:!0}},19:{shareUrl:!0,defaultTab:"Facebook",facebookTab:!0,provider:{enable:!0,
google:!0,yahoo:!0}},880:{shareUrl:!0,defaultTab:"Facebook",facebookTab:!0,provider:{enable:!0,google:!0,yahoo:!0}}};this.getSettings=function(){return c}};SLAYER.INVITESETTINGSLIVE=function(){var c={195:{shareUrl:!0,defaultTab:"Facebook",facebookTab:!0,provider:{enable:!0,google:!0,yahoo:!0}},441:{shareUrl:!0,defaultTab:"Facebook",facebookTab:!0,provider:{enable:!1,google:!0,yahoo:!0}},440:{shareUrl:!0,defaultTab:"Facebook",facebookTab:!0,provider:{enable:!0,google:!0,yahoo:!0}},311:{shareUrl:!0,defaultTab:"Facebook",facebookTab:!0,provider:{enable:!0,google:!0,yahoo:!0}},826:{shareUrl:!0,defaultTab:"Facebook",facebookTab:!0,provider:{enable:!1,google:!0,
yahoo:!0}},14:{shareUrl:!0,defaultTab:"Facebook",facebookTab:!0,provider:{enable:!0,google:!0,yahoo:!0}},500:{shareUrl:!0,defaultTab:"Facebook",facebookTab:!0,provider:{enable:!0,google:!0,yahoo:!0}},721:{shareUrl:!0,defaultTab:"Facebook",facebookTab:!0,provider:{enable:!0,google:!0,yahoo:!0}},522:{shareUrl:!0,defaultTab:"Facebook",facebookTab:!0,provider:{enable:!1,google:!0,yahoo:!0}},791:{shareUrl:!0,defaultTab:"Mail",facebookTab:!0,provider:{enable:!1,google:!1,yahoo:!1}},221:{shareUrl:!0,defaultTab:"Facebook",
facebookTab:!0,provider:{enable:!1,google:!0,yahoo:!0}},467:{shareUrl:!0,defaultTab:"Facebook",facebookTab:!0,provider:{enable:!0,google:!0,yahoo:!0}},610:{shareUrl:!0,defaultTab:"Mail",facebookTab:!0,provider:{enable:!0,google:!0,yahoo:!0}},865:{shareUrl:!0,defaultTab:"Mail",facebookTab:!1,provider:{enable:!1,google:!1,yahoo:!1}},930:{shareUrl:!0,defaultTab:"Mail",facebookTab:!1,provider:{enable:!1,google:!0,yahoo:!0}},481:{shareUrl:!0,defaultTab:"Mail",facebookTab:!1,provider:{enable:!1,google:!0,
yahoo:!0}},25:{shareUrl:!0,defaultTab:"Facebook",facebookTab:!0,provider:{enable:!0,google:!0,yahoo:!0}},936:{shareUrl:!0,defaultTab:"Mail",facebookTab:!1,provider:{enable:!1,google:!1,yahoo:!1}},86:{shareUrl:!0,defaultTab:"Facebook",facebookTab:!0,provider:{enable:!0,google:!0,yahoo:!0}},824:{shareUrl:!0,defaultTab:"Facebook",facebookTab:!0,provider:{enable:!0,google:!0,yahoo:!0}},22:{shareUrl:!0,defaultTab:"Mail",facebookTab:!1,provider:{enable:!1,google:!0,yahoo:!0}},937:{shareUrl:!0,defaultTab:"Mail",
facebookTab:!1,provider:{enable:!1,google:!1,yahoo:!1}},525:{shareUrl:!0,defaultTab:"Mail",facebookTab:!1,provider:{enable:!1,google:!0,yahoo:!0}},1:{shareUrl:!0,defaultTab:"Facebook",facebookTab:!0,provider:{enable:!1,google:!0,yahoo:!0}},696:{shareUrl:!0,defaultTab:"Facebook",facebookTab:!0,provider:{enable:!0,google:!0,yahoo:!0}},454:{shareUrl:!0,defaultTab:"Facebook",facebookTab:!0,provider:{enable:!0,google:!0,yahoo:!0}},171:{shareUrl:!0,defaultTab:"Facebook",facebookTab:!0,provider:{enable:!1,
google:!0,yahoo:!0}},603:{shareUrl:!0,defaultTab:"Facebook",facebookTab:!0,provider:{enable:!1,google:!0,yahoo:!0}},19:{shareUrl:!0,defaultTab:"Facebook",facebookTab:!0,provider:{enable:!0,google:!0,yahoo:!0}},880:{shareUrl:!0,defaultTab:"Facebook",facebookTab:!0,provider:{enable:!0,google:!0,yahoo:!0}}};this.getSettings=function(){return c}};SLAYER.LANGUAGE=function(){var c={"gl.socialInvite.dialog.buddy.header":"Add a player to your buddy list:","gl.socialInvite.dialog.buddy.inputValue":"Username / User ID","gl.socialInvite.dialog.buddy.tabName":"Buddy list","gl.socialInvite.dialog.buddy.resultHeader":"Search results","gl.socialInvite.dialog.desc":"Why play alone when you can play together? Invite friends to your game.","gl.socialInvite.dialog.failed.failed":"Invite failed","gl.socialInvite.dialog.form.inviter":"From:","gl.socialInvite.dialog.form.invited":"To:",
"gl.socialInvite.dialog.form.invited.desc":"(separate multiple e-mail addresses with commas)","gl.socialInvite.dialog.form.message":"Send message:","gl.socialInvite.dialog.form.message.desc":"(optional)","gl.socialInvite.dialog.form.agreed":"I know the people I'd like to invite.","gl.socialInvite.dialog.form.search":"Search","gl.socialInvite.dialog.form.send":"Invite friends","gl.socialInvite.dialog.form.cancel":"Cancel","gl.socialInvite.dialog.form.moreFriendInvites":"Invite more friends","gl.socialInvite.dialog.form.close":"Close",
"gl.socialInvite.dialog.gigya.tabName":"Facebook","gl.socialInvite.dialog.header":"Invite your friends!","gl.socialInvite.dialog.sendInfo.emailInvites.sing":"%s friend already registered.","gl.socialInvite.dialog.sendInfo.emailInvites":"%s friends already registered.","gl.socialInvite.dialog.sendInfo.emailsOpen":"You can still send %s e-mails today.","gl.socialInvite.dialog.sendInfo.emailsOpen.sing":"You can still send %s e-mail today.","gl.socialInvite.dialog.sendInfo.emailsSent":"You already sent %s e-mails today.",
"gl.socialInvite.dialog.sendInfo.emailsSent.sing":"You already sent %s e-mails today.","gl.socialInvite.dialog.success.user":"%s was successfully invited.","gl.socialInvite.dialog.success.failed":"Unable to invite %s.","gl.socialInvite.dialog.success.friendsInvited":"You invited %s friend(s).","gl.socialInvite.error.200.03":"You've invited the maximum number of friends for today. Invite more friends tomorrow!","gl.socialInvite.error.200.04":"Invalid e-mail address; please provide a valid e-mail address.",
"gl.socialInvite.error.500":"Oops, that didn't work. Please try again later.","gl.socialInvite.error.input.mails":"Please verify the e-mail address(es) you entered.","gl.socialInvite.error.input.agreed":"Please confirm that you are personally acquainted with the people you'd like to invite.","gl.socialInvite.error.input.userMessage":"Message may not contain more than %s characters.","gl.socialInvite.button.tooltip":"Don't wanna play alone? Invite friends to play %s.","gl.socialInvite.dialog.shareHeader":"Use your existing social networks:",
"gl.socialInvite.dialog.mailHeader":"Or send friends an e-mail invitation:","gl.socialInvite.dialog.mail.tabName":"E-mail","gl.socialInvite.dialog.socialNetworksHeader":"Invite friends from your social networks:","gl.socialInvite.notification.text.body":"Body:","gl.socialInvite.notification.text.subject":"Subject:","gl.socialInvite.notification.success":"Messages successfully sent:","gl.socialInvite.shareURL.mailSubject":"Invitation to %s","gl.socialInvite.shareURL.message":"Players wanted! %s is a lot of fun and it's free. Join now at:",
"gl.socialInvite.fbCaption":"A bigpoint.com game","gl.socialInvite.dialog.search.nothingFound":"No player found","gl.socialInvite.dialog.search.friendRemovedFailed":"Friend couldn't be deleted.","gl.socialInvite.dialog.search.friendRemoved":"Friend was successfully deleted.","gl.socialInvite.dialog.search.friendAddedFailed":"Player couldn't be added.","gl.socialInvite.dialog.search.friendAdded":"Player was successfully added.","gl.socialInvite.dialog.addressbook.tabName":"Import"};this.getLanguage=
function(){return c}};