(function ($) {
    $.expr[':'].fn = function (obj, index, meta, stack) {
        return ($(obj).attr('data-bn-fn') == meta[3]);
    };

    $.fn.comboBoxNavigation = function () {
        $(this).change(function () {
            document.location = $(this).val();
        });
        return this;
    };

    $.fn.popupLink = function (specs) {
        var settings = {
            height: '100px',
            width: '100px',
            left: '100px',
            location: 'yes',
            menubar: 'yes',
            resizable: 'yes',
            scrollbars: 'yes',
            titlebar: 'yes',
            toolbar: 'yes',
            status: 'yes'
        };

        var mySet = $.extend(settings, specs);
        var windowsSpecs = [];
        for (var x in settings) {
            if (settings.hasOwnProperty(x)) {
                arr[arr.length] = x + '=' + settings[x];
            }
        }

        $(this).click(function (evt) {
            window.open(this.href, '_blank', windowsSpecs.join(','));
            evt.preventDefault();
        });

        return this;

    };

})(jQuery);

/* jquery onAvailable-1.0.min */
(function(A){A.extend({onAvailable:function(C,F){if(typeof F!=="function"){throw new TypeError();}var E=A.onAvailable;if(!(C instanceof Array)){C=[C];}for(var B=0,D=C.length;B<D;++B){E.listeners.push({id:C[B],callback:F,obj:arguments[2],override:arguments[3],checkContent:!!arguments[4]});}if(!E.interval){E.interval=window.setInterval(E.checkAvailable,E.POLL_INTERVAL);}return this;},onContentReady:function(C,E,D,B){A.onAvailable(C,E,D,B,true);}});A.extend(A.onAvailable,{POLL_RETRIES:2000,POLL_INTERVAL:20,interval:null,listeners:[],executeCallback:function(C,D){var B=C;if(D.override){if(D.override===true){B=D.obj;}else{B=D.override;}}D.callback.call(B,D.obj);},checkAvailable:function(){var F=A.onAvailable;var D=F.listeners;for(var B=0;B<D.length;++B){var E=D[B];var C=document.getElementById(E.id);if(C&&(!E.checkContent||(E.checkContent&&(C.nextSibling||C.parentNode.nextSibling||A.isReady)))){F.executeCallback(C,E);D.splice(B,1);--B;}if(D.length===0||--F.POLL_RETRIES===0){F.interval=window.clearInterval(F.interval);}}}});})(jQuery);



;/* C:\Inetpub\wwwroot\ImagemasterTrunk//presources/global/js/jquery/jquery-plugins-misc.js Monday, November 14, 2011 2:41:58 PM */

BN('Navigation.URL', function($) {
    //add get domain function....
    // add get protocol
    var qsToHash = function(str) {
        if (str.length > 0) {
            var queryArr = str.split('&');
            var returnArr = [];
            //add array support
            for (var x in queryArr) {
                if (queryArr.hasOwnProperty(x)) {
                    var pair = queryArr[x].split('=');
                    returnArr[pair[0]] = pair[1];
                }
            }
            return returnArr;
        } else {
            return {};
        }
    };

    var hashToQs = function(obj) {
        var ret = '';
        var first = true;
        //add array support
        for (var x in obj) {
            if (obj.hasOwnProperty(x)) {
                if (first === true) {
                    first = false;
                } else {
                    ret += '&';
                }
                ret += x + '=' + obj[x];
            }
        }
        return ret;
    };

    var qsFromURL = function(str) {
        return (str.indexOf('?') !== -1) ? str.slice(str.indexOf('?') + 1) : '';
    };

    var locFromURL = function(str) {
        var x = str.indexOf('?');
        return (x === -1) ? str : str.substr(0, x);
    };


    var RequestClass = function(str, obj) {
        var loc = qsStr = '';
        var qs = {};
        var isFriendly = false;
        var unfriendlyQS, unfriendlyLoc;
        var toFriendly = function(fn, revertLoc, revertQS) {
            var friendlyQS = fn(loc);
            isFriendly = true;
            updateParams(friendlyQS);

            unfriendlyLoc = revertLoc;
            unfriendlyQS = revertQS;
        };
        var initialize = function() {
            //if no second paramater
            if (!(obj)) {
                // temporary fix below for detecting object types
                if (typeof str !== "string") {
                    str = str.toString();
                    //alert("Not really: " + str.toString());
                }
                qsStr = qsFromURL(str);
                //or it is a string
            } else if (typeof obj == 'string') {
                qsStr = qsFromURL(obj);
                //if it exist and is a number
            } else if (typeof obj == 'number') {
                throw ('input number when expecting object in request object constructor');
            } else {
                qsStr = hashToQs(obj);
            }

            loc = locFromURL(str);
            qs = qsToHash(qsStr);
        };

        var restore = function() {
            qs = qsToHash(qsStr);
        };
        //get case insensitive param - for getting. Returns name
        //of paramater in case insensitive format (or creates new from name, if flag is flipped and no match


        var getCInsPar = function(nam, allowNew) {
            var ret = undefined;
            for (var key in qs) {
                if (key.toLowerCase() === nam.toLowerCase()) {
                    ret = key;
                }
            }
            if (allowNew && !(ret)) {
                qs[nam] = undefined;
                ret = nam;
            }
            return ret;
        };



        var formAbsorb = function(formObj) {
            $(':input:visible[name]', formObj).each(function() {

                var myKey = getCInsPar($(this).attr('name'), true);
                updateParams(myKey, $(this).val());

            });
        };

        var getParamVal = function(nam) {
            find = getCInsPar(nam);
            return ((find) ? qs[nam] : undefined);
        };

        var updateParams = function(nam, val) {
            if (typeof nam === 'string') {
                key = getCInsPar(nam);
                if (key) {
                    qs[key] = val;
                } else {
                    throw new Error('The name ' + nam + ' is not defined on the querystring');
                }
            } else {
                qs = $.extend(qs, nam);
            }
            return this;
        };
        
        var prependParams = function(nam, val, striplast) {
        	if(striplast){
        		str = str.split('#')[0];
        		str = str+'?'+nam+'='+val;
            }
            else {
            	str = str+'?'+nam+'='+val;
            }
            return str;
        };
        var getQsAsStr = function() {
            return (isFriendly && unfriendlyQS) ? hashToQs(unfriendlyQS(loc, qs)) : hashToQs(qs);
        };

        var getQs = function(v) {
            var temp = {};
            if (v) {
                temp = qs;
            } else {
                for (var key in qs) {
                    if (qs.hasOwnProperty(key)) {
                        temp[key] = qs[key];
                    }
                }
            }
            return temp;
        };

        var getUrl = function() {
            return (isFriendly && unfriendlyLoc) ? unfriendlyLoc(loc, qs) : loc;
        };

        var getFullStr = function() {
            return getUrl() + '?' + getQsAsStr();
        };
        // this function gets everything after the hash in the query string
        var getFriendlyHash = function(){
        	qsArray = str.split('/');
        	//console.log("str:"+str);
        	for (var x in qsArray) {
        		var name = x, value = qsArray[x],hashparam = value.split('#')[1];
					if (qsArray.hasOwnProperty(x) && qsArray[x].indexOf('#')!==-1) { 
						if(hashparam.indexOf('?')!==-1){
							arr = hashparam.split('?');
							hashparam = arr[0]+'&'+arr[1];
							return hashparam;
						}
						else {
							// change property value of url here
							//queryArr[name] = newparam+seobasedparam[1];
							return hashparam;
						}
				}
			}
        };
        
        //call 'constructor'
        initialize();
        //define interface here.
        this.paramaterize = toFriendly;
        this.loadForm = formAbsorb; //this copies values from form into url
        this.getQueryObject = getQs; //this returns copy (not reference) of internal unless you pass true
        this.restore = restore; //This restores qs to original (construction time) value
        this.getQueryString = getQsAsStr; //Returns the qs as a string
        this.getLocation = getUrl; //Returns the first part of th eurl (up to the ?)
        this.getFullLocation = getFullStr; //Returns the whole url
        this.updateQuery = updateParams; //Updates named paramater with new value: takes (str,val) or (obj)
        this.prependQSParams = prependParams;
        this.queryValue = getParamVal; //Gets value of a particular paramater
        this.getFriendlyHashValue = getFriendlyHash;
    };

    var createURL = function(a, b) {
        return new RequestClass(a, b);
    };

    var u = {};
    u.queryStingToHash = qsToHash;
    u.hashToQueryString = hashToQs;
    u.queryStringFromUrl = qsFromURL;
    u.locationFromUrl = locFromURL;

    return {
        newURL: createURL,
        queryStringToObj: qsToHash,
        objToQueryString: hashToQs,
        extractQueryString: qsFromURL,
        extractLocation: locFromURL,
        u: u
    };
});


;/* C:\Inetpub\wwwroot\ImagemasterTrunk//presources/global/js/BN/Navigation/url.js Monday, November 14, 2011 2:41:58 PM */
BN('Types.ParserLibrary', function($) {
    var parserLookup = {};
    var addParser = function(n, parserFn) {
        parserLookup[n] = new Parser(parserFn);
    };
    var getParser = function(n) {
        if (!parserLookup[n]) {
            throw "No Parser named " + n;
        }
        return parserLookup[n];
    };

    var Parser = function(fn) {
        var parse = function(str, options) {
            return fn(str, options)
        };
        var parseAndIterate = function(str, iterFn, options) {
            var propName,
                iterateThrough,
                iterFnResult,
                result = [],
                parseResult = parse(str, options);
            if (typeof parseResult !== 'object') {//array or object
                iterateThrough = parseResult;
            } else {
                iterateThrough = [parseResult];
            }
            for (propName in iterateThrough) {
                if(iterateThrough.hasOwnProperty(propName)){
                    iterFnResult=iterFn(iterateThrough[propName],propName);
                    if(iterFnResult!== undefined){
                        result[result.length] = iterFnResult;
                    }
                }
            } //this can be optimized for arrays if necessary
            return result;
        };
        return{
            parse:parse,
            forEachParsedElement:parseAndIterate
        };
    };
    return{
        addParser: addParser,
        getParser: getParser
    };
});

;/* C:\Inetpub\wwwroot\ImagemasterTrunk//presources/global/js/BN/Types/ParserLibrary.js Monday, November 14, 2011 2:41:58 PM */
//Validation stuff

(function($){
	//Rules
	var GlobalRules={
		'alwaysGood':function(){return true;}
	};
	
	//Fail Actions
	var GlobalActions={
		'alertIt':function(){alert('alertIt');},
		'nothing':function(){}
	};
	
	//this is the interface for a rule,or fail action- optionally inistantiable, but not exposing for now.
	var Pair=function(n,fn){
		this.name=n;
		this.fn=fn;
	};
	
	var createBook=function(){
		//this is a rule class
		var PairClass=function(globalRef){
			var book=[];
			var addItem=function(x,y){
				var n,fn;
				if(x.name && x.fn){
					n=x.name;
					fn=x.fn;
				}else{
					n=x;
					fn=y;
				}
				book[n]=fn;
			};
			
			var getItem=function(n){
				//maybe set global rules as prototype instead
				var item = book[n] || globalRef[n];
				return item;
			};
			this.add = addItem;
			this.get = getItem;
		};
		return {
			rules:function(){return new PairClass(GlobalRules);},
			actions:function(){return new PairClass(GlobalActions);}
		};
	};
	
	
	
	//A test obj = {rule: , action: , param:,sel:}
	//Validator
	var ValidatorClass =function(root){
		var rt=root||document;
		var tests=[];
		var rules=createBook().rules();
		var actions = createBook().actions();
		
		var getTestFns=function(tst){
			var findFn=function(chk,n){
				return chk(n) || function(){alert("function " + n +" was not found");};
			};
						
			var fnToExec = function(obj,n){				
				return function(){
					var locRoot=(typeof rt === 'string')? $(rt).get(0):rt;
					
					var fn=findFn(obj.get,n);
					var $item = $(tst.sel,locRoot);
					return fn($item,tst.param);
				};
			};
			
			return {test:fnToExec(rules,tst.rule),
					onFail:fnToExec(actions,tst.action)};
		};
			
		var makeTest=function(obj){
			//action is also part of the object interface
			var def={
				rule:'alwaysGood',
				sel:'*',
				param:{}
			};
			 return $.extend(def,obj);
		};
		
		
		var loadTest=function(obj){
			tests.push(makeTest(obj));
		};
		
		
		var runTest=function(tst){
			var x=getTestFns(tst);
			var res=x.test();
			if(!(res)){
				x.onFail();
			}
			return res;
		};
		
		var runThisTest=function(obj){
			return runTest(makeTest(obj));
		};

		var runAllTests=function(){
			var result=true;
			for(var idx in tests){
				if(tests.hasOwnProperty(idx)){
					if(runTest(tests[idx])===false){
						result=false;
					}
				}
			}
			return result;
		};
		
		//makeTest
		this.setRoot=function(x){rt=x;};
		this.runFullTest = runAllTests;
		this.runThisTest =  runThisTest;
		this.addTest=loadTest;
		this.addRule =rules.add;
		this.addAction = actions.add;
		
	};
	
	var x = BN('BN.Util.Validation');
	x.createValidator=function(y){return new ValidatorClass(y);};
	
})(jQuery);
;/* C:\Inetpub\wwwroot\ImagemasterTrunk//presources/global/js/BN/Util/Validation.js Monday, November 14, 2011 2:41:58 PM */
BN('Util.PidToJson', ['BN.Navigation.URL'], function($, URL){
      
      var getUrl = function(isSecure) {
         var url;
         
         if (isSecure == 'secure') {
            url = 'https://secure.barnesandnoble.com/help/content.asp';
         } else {
            url = 'http://www.barnesandnoble.com/help/content.asp';
         }
	  	   return url;
      };
      
      var getUniqueId = function() {
         var random = Math.floor(Math.random()*10001);
         return 'jsonp'+(new Date().getTime())+random;
      };
      
      var callbackFN = function(response, selector) {
          // console.log('callback!<br/>' + '<br/><br/>resp: ' + response + '<br/><br/>sel: ' + selector);
          $(selector).html(response.html);
      };
         
      var pidToJsonP = function(){
             var uniqueifier = 0;
                 
           return function(pidParam, selector, isSecure){
              var myFNId = 'jsonp'+(new Date().getTime())+uniqueifier++;
              var params = {pid:pidParam,outformat:'1'};
              var testDate = URL.newURL(document.location.href).queryValue('date');
              
              //this check is for "A" version of pdp with jquery142v2 config file
              if (testDate === undefined) {
                 testDate = '';
              }
              
              if (testDate !== '') {
                 params.date = testDate;
              }
             window[myFNId]=function(response){
                 callbackFN(response, selector);
             };
             var url = getUrl(isSecure);
             params.callbackfunc = myFNId;
             $.get(url,params,function(){},'jsonp');
            };
         }();	 
       
    return {
       getResponse:pidToJsonP
       };

   });



;/* C:\Inetpub\wwwroot\ImagemasterTrunk//presources/global/js/BN/Util/PidToJson.js Monday, November 14, 2011 2:41:58 PM */
BN('Events.PersistentTriggers', function($) {
    var persistentEvents = {};
    var PersistentEvent = function() {
        var hasFired = false;
        var queued = [];
        var trigger = function() {
            var i;
            hasFired = true;
            for (i = 0; i < queued.length; i++) {
                queued[i]();
            }
        };
        var bind = function(fn) {
            if (hasFired) {
                fn();
            } else {
                queued[queued.length] = fn;
            }
        };
        return {
            bind: bind,
            trigger: trigger
        };
    };

    var bind = function(n, fn) {
        var persistentEvent = persistentEvents[n];
        if (!persistentEvent) {
            persistentEvent = persistentEvents[n] = new PersistentEvent();
        }
        persistentEvent.bind(fn);
    };

    var trigger = function(n) {
        var persistentEvent = persistentEvents[n];
        if (!persistentEvent) {
            persistentEvent = persistentEvents[n] = new PersistentEvent();
        }
        persistentEvent.trigger();
    };

    return {
        fire: trigger,
        bind: bind
    };
});

;/* C:\Inetpub\wwwroot\ImagemasterTrunk//presources/global/js/BN/Events/PersistentTriggers.js Monday, November 14, 2011 2:41:58 PM */
/**
* @class BN Cookie
* @public
* @author Paul Bronshteyn
*/
BN('Cookie',function () {
    var 
    /**
    * Cookie Cache Object.
    * @description Contains all the cookies parsed on the page.
    * @memberOf BN.cookie
    * @private
    * @type object
    */
        cookieCache = {},

    /**
    * Delete cookie cache
    * @param {string} Cookie name
    * @memberOf BN.cookie
    * @private
    * @param {String} Cookie name
    */
        deleteCache = function (name) {
            delete cookieCache[name];
        };
	/**
	 * Determines whether or not the provided object is a date
	 * @param {Mixed} mixed The object being tested
	 * @return {Boolean} The result
	 */
	isDate = function(mixed) {
	   return Object.prototype.toString.call(mixed) === '[object Date]';
	};		
	/**
	 * Determines whether or not the provided object is a legal number
	 * @param {Mixed} mixed The object being testing
	 * @return {Boolean} The result
	 */
	isNumber = function(mixed) {
	    return typeof mixed === 'number' && isFinite(mixed);
	};		
    /**
    * @scope BN.cookie
    */
    return {
        /**
        * Get the value of a cookie with the given name.
        * @param {String} name Cookie name
        * @param {Boolean} cache Cache state
        * @return {String} Cookie value
        *
        * @example
        Get the value of a cookie:
        BN.cookie.get('the_cookie');
        */
        get: function (name) {
            if (cookieCache[name]) {
                return cookieCache[name];
            }

            var cookies = document.cookie.split('; '),
                cookie = [],
                c = 0,
                cl = cookies.length;

            for (; c < cl; c++) {
                cookie = cookies[c].split('=');
                cookieCache[cookie[0]] = decodeURIComponent(cookie.slice(1).join('='));
                if (cookie[0] === name) {
                    return cookieCache[cookie[0]];
                }
            }

            deleteCache(name);
            return '';
        },

        /**
        * Delete the cookie with the given name.
        * @param {String} name Cookie name
        * @param {Object} [options] Cookie options
        * @options {Date|Integer} expires Cookie expiration date or number of hours to expire in
        * @options {String} path Cookie site path, default = /
        * @options {String} domain Cookie domain
        * @options {Boolean} secure Secure cookie setting
        * @otpions {Boolean} httpOnly HTTP only cookie setting
        *
        * @example
        Delete the cookie:
        BN.cookie.del('the_cookie');

        Delete the cookie set with path:
        BN.cookie.del('the_cookie', { path: '/' });
        */
        del: function (name, options) {
            options = options || {};
            options.expires = -1;
            return this.set(name, '', options);
        },

        /**
        * Create a cookie with the given name and value and other optional parameters.
        * @param {String} name Cookie name
        * @param {String} [value] Cookie value
        * @param {Object} [options] Cookie options
        * @options {Date|Integer} expires Cookie expiration date or number of hours to expire in
        * @options {String} path Cookie site path, default = /
        * @options {String} domain Cookie domain
        * @options {Boolean} secure Secure cookie setting
        * @otpions {Boolean} httpOnly HTTP only cookie setting
        *
        * @example
        Create or set the value of a cookie:
        BN.cookie.set('the_cookie', 'the_value');

        Create a cookie with all available options:
        BN.cookie.set('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'domain.com', secure: true });

        Delete the cookie:
        BN.cookie.set('the_cookie', '', { expires: -1 });
        */
        set: function (name, value, options) {
            deleteCache(name);

            options = options || {};
            value = value || '';
            options.expires = isDate(options.expires) ? options.expires.toUTCString() : isNumber(options.expires) ? (new Date(+(new Date) + options.expires * 60 * 60 * 1000)).toUTCString() : '';

            var cookie = [name + '=' + encodeURIComponent(value)];

            if (options.expires) {
                cookie.push('expires=' + options.expires);
            }
            if (options.path) {
                cookie.push('path=' + options.path);
            }
            if (options.domain) {
                cookie.push('domain=' + options.domain);
            }
            if (options.secure) {
                cookie.push('secure');
            }
            if (options.httpOnly) {
                cookie.push('httpOnly');
            }
            if (value && options.cache !== false) {
                cookieCache[name] = value;
            }
            document.cookie = cookie.join('; ');
            return this;
        }
    }
});


;/* C:\Inetpub\wwwroot\ImagemasterTrunk//presources/global/js/BN/Cookie/Cookie.js Monday, November 14, 2011 2:41:58 PM */
(function($){
BN('Navigation',function(){

 /**
         * Open a new browser window with set of options
         * @param {String} url Url to open in the new window
		 * @param {Object} [options] New window options
         * @param {String} [name] Name of the new window
         * @return {Boolean} Status of the window opening
         */
      var  winOpen =function(url, options, name) {
            var argument,
                arguments = [],
                win;
            //shift interface
            var settings = {
                height: '318px',
                width: '416px',
                left: '0px',
                location: 'yes',
                menubar: 'yes',
                resizable: 'no',
                scrollbars: 'yes',
                titlebar: 'no',
                toolbar: 'no',
                status: 'no'
            };
			if (typeof options === 'string') {
				name = options;
				options = {};
			}

			name = name || 'BNWIN' + +new Date(); // +new Date() return integer timer in milliseconds

            options = $.extend({}, settings, options || {});

            for (argument in options) {
                if(options.hasOwnProperty(argument) ){
                    arguments.push(argument + '=' + options[argument]);
                }
            }

            win = window.open(url, name, '' + arguments.join(',') + '');
            return (win) ? (true, win.focus()) : false;
        }
        $.fn.popupLink = function (specs) {
            $(this).click(function (evt) {
                winOpen(this.href, '_blank', windowsSpecs.join(','));
                evt.preventDefault();
            });
            return this;
        };
        return {
            newWindow:winOpen
        }
    });



})(jQuery);


;/* C:\Inetpub\wwwroot\ImagemasterTrunk//presources/global/js/BN/Navigation/Popup.js Monday, November 14, 2011 2:41:59 PM */
    (function($){
        var u =BN.Navigation.URL;
        $.fn.comboBoxNavigation = function (inherit) {
            var pageURL=u.newURL(document.location);
            $(this).change(function () {
                var location=$(this).val();
                /*if(inherit){
                    location=pageUrl.updateQuery(u.queryStringToObj(location) ).getQueryString();
                }*/
                document.location = location;
            });
            return this;
        };
    })(jQuery);
;/* C:\Inetpub\wwwroot\ImagemasterTrunk//presources/global/js/BN/Navigation/misc-nav.js Monday, November 14, 2011 2:41:59 PM */
BN('Navigation.Ajax', ['BN.Navigation.URL'], function($, URL) {
    var AsynchRequest = function(url) {
        var urlObj = url ? URL.newURL(url) : undefined;
        var toRunOnLoad = function() { };
        this.setUrl = function(url) { urlObj = URL.newURL(url) };
        this.getUrlObj = function() { return urlObj; };
        this.onLoad = function(fn, when) {
            var replace = (when === true); //no casting!!!! 
            when = (when === 'after') ? 'after' : 'before'; //default is before
            var backup = replace ? function() { } : toRunOnLoad;
            toRunOnLoad = function(data) {
                if (when === 'before') {
                    fn(data);
                }
                backup(data);
                if (when === 'after') {
                    fn(data);
                }
            };
        };
        this.loadData = function(fn) {
            $.get(urlObj.getFullLocation(), function(response) {
                var responseData = $(response.content).get(0);
                toRunOnLoad(responseData)
                if (fn) {
                    fn(responseData);
                }
            }, 'jsonp');
        };
    };
    return {
        getAjaxRequestor: function(url) { return new AsynchRequest(url); }
    };
});
;/* C:\Inetpub\wwwroot\ImagemasterTrunk//presources/global/js/BN/Navigation/Ajax.js Monday, November 14, 2011 2:41:59 PM */
/*
@module Product.Link
@requires BN.Navigation.URL
@returns link objects with registered onclick event, 
that converts SEO product links to parameter based URL

(Example:
Before: http://www.barnesandnoble.com/The-Berenstain-Bears-and-The-Trouble-with-Chores/Jan-Berenstain/w/18320322/#1200
After: http://www.barnesandnoble.com/The-Berenstain-Bears-and-The-Trouble-with-Chores/Jan-Berenstain/w/18320322/?FMT=1200
)
*/

BN('Product.Link', function () {
		//constructor that returns an array of product links, reformatted
		var ProductLink = function (node) {
			// first find the nodes
			this.linknodes = findLinks(node);
			// next register onclick for all link objects. 			
			$(this.linknodes).each(function () {
				$(this).bind('click', function (e) {
					e.preventDefault();
					var newlocation = setFriendlyUrlParams(this.href);
					document.location = newlocation;
				});
			});	
		};
		// searches the dom for nodes to convert
		var findLinks = function (node) {
			//look for all anchors
			var links = $(node);
			//console.log("I found-- %o",links);
			return links;
		};
		//add new param to a specified link string
		var setFriendlyUrlParams = function (str) {
			if (str.length > 0) {
				var link = BN.Navigation.URL.newURL(str), nl;
				//console.log("friendly hash--"+link.getFriendlyHashValue());
				if (link.getFriendlyHashValue() !== undefined) {
					nl = link.prependQSParams('FMT', link.getFriendlyHashValue(), true);
					//console.log(nl);
				} else { 
					nl = str;
				}
				return nl;
			} else {
				throw new Error('Required string url parameter not available');
			}
		};
		return {
			ProductLink: ProductLink,
			findLinks: findLinks,
			setFriendlyUrlParams: setFriendlyUrlParams
		};
	});

$(function () {
	// a new collection of product link objects, converted to the new format. This only happens onclick!!
	var productLinkObjs = new BN.Product.Link.ProductLink($('.wgt-additional-product-formats a, .result-item .product-title a, .pricing-table a').get());
});




;/* C:\Inetpub\wwwroot\ImagemasterTrunk//presources/global/js/BN/Product/Link.js Monday, November 14, 2011 2:41:59 PM */
/*
@module Product
@requires BN.Purchasing
@requires BN.Navigation
*/

BN('Product', function () {
    var isProductUrl = function (str, excludeUsed) {
        var result = false;
        if (str.indexOf("barnesandnoble.com") >= 0 && //is our link and ...
				str.indexOf('wrk=') < 0 && //does not contain a work id. Work id means it is malformed.
				(str.indexOf("/search/product.asp") >= 0 ||  //direct to product page or
				str.indexOf("/e/") >= 0 ||  //seo friendly or
				(str.indexOf("used/product.asp") > 0 && excludeUsed !== true) || //is a used page, and we care
				str.indexOf("/booksearch/isbninquiry.asp") >= 0) || //straight isbn link
				(str.indexOf("cart2.barnesandnoble.com") > 0 && str.indexOf('ean=') > 0 && str.indexOf('stage=') < 0)  //is this a gift card page? Make sure its not stage...
				) {
            result = true;
        }
        return result;
    };

    var extractId = function (url) {
        var found, result, eanHalf;
        try {
            found = url.match(/(?:EAN|ISBN)=([0-9X]{3,13})&?/i);
            if (found) {
                result = found[1];
            } else {
                eanHalf = url.split('/e/')[1]; //get the half of the url after the /e/
                result = eanHalf.split('/')[0]; //since the following part is the ean, break that part from all that follows it.			
            }
        } catch (e) {
            //alas do nothing for now.
        }
        return result;
    };


    return {
        isProductPageUrl: isProductUrl,
        extractProductId: extractId
    };
});


;/* C:\Inetpub\wwwroot\ImagemasterTrunk//presources/global/js/BN/Product/Product.js Monday, November 14, 2011 2:41:59 PM */
/*
    @module Purchasing
    @requires BN.Cookie
*/

/*
    @class Cart
    @static
*/
BN('Purchasing.Cart', function () {
    var items = [];
    var prodIdArray;
    var findItems = function () {
        var prodCookie = BN.Cookie.get('vcprodid');
        var itemPairs = prodCookie.split('&');   //items are set in pairs of x=x&y=y in cookie. Strange, but true
        for (var i = 0; i < itemPairs.length; i++) {
            items[i] = itemPairs[i].split('='); //split a=a into an array  and take the first
        }
        checked = true;
    };

    var isInCart = function (productId) {
        findItems(); //gain performance with intro here.
        var found = false;
        for (var i = 0; i < items.length; i++) {
            if (items[i][0] == productId || items[i][1] == productId) {
                found = true;
                break;
            }
        }
        return found;
    };
    return {
        hasProduct: isInCart
    }

});


;/* C:\Inetpub\wwwroot\ImagemasterTrunk//presources/global/js/BN/Purchasing/ItemInCart.js Monday, November 14, 2011 2:41:59 PM */
BN('DOMApplication.DataStore', function($) {
    var DomBasedObjectStorage = function() {
        var objects = [];
        var iterateThroughObjects = function(fn) {
            var arr = [], fnResult, i;
            for (i = 0; i < objects.length; i++) {
                fnResult = fn(objects[i]);
                if (fnResult !== undefined) {
                    arr[arr.length] = fnResult;
                }
            }
            return arr;
        };
        var addObject = function(node, obj) {
            objects[objects.length] = { api: obj, node: node };
            return obj;
        };
        //takes fn that gets the node. If function returns true for that node, the object is included in the set.
        var findObjects = function(fn) {
            var results = iterateThroughObjects(function(obj) {
                return (fn(obj.node, obj.api)) ? obj.api : undefined;
            });
            return results;
        };
        var findObject = function(fn) {
            var results = findObjects(fn);
            return results ? results[0] : undefined;
        };
        var removeObjects = function(fn) {
            var returnItems = [];
            var arr = iterateThroughObjects(function(object) {
                var markedForRemoval = fn(object.node, object.api);
                if (markedForRemoval) {
                    returnItems[returnItems.length] = object;
                }
                return (markedForRemoval === true) ? undefined : true;
            });
            objects = arr;
            return returnItems;

        };
        return {
            addObject: addObject,
            findObjects: findObjects,
            findObject: findObject,
            removeObjects:removeObjects,
            iterateThroughObjects: iterateThroughObjects
        };
    };
    return {
        dataStoreFactory: function() { return DomBasedObjectStorage(); }
    };
});



;/* C:\Inetpub\wwwroot\ImagemasterTrunk//presources/global/js/BN/DOMApplication/DataStore.js Monday, November 14, 2011 2:41:59 PM */




BN('DOMApplication.Rule', function ($) {
    var uniqueify = 1;
    var Rule = function (desc, fn, name) {
        var localName = name || 'rule:' + uniqueify++;
        var applyTo = function (elem, event, eventElem) {
            if (event) {
                $((eventElem || document)).bind(eventName, function () { fn(elem) });
            } else {
                fn(elem);
            }
        };
        return {
            applyTo: applyTo,
            applyToDocument: function (onDomReady) { applyTo(document, (onDomReady ? 'ready' : undefined)); },
            applyOnDomReady: function (elem) { applyTo((elem || document), 'ready'); },
            getDescription: function () { return desc; },
            getName: function () { return localName; }
        };
    };
    return {
        factory: function (desc, fn, name) { return Rule(desc, fn, name); }
    };
});

;/* C:\Inetpub\wwwroot\ImagemasterTrunk//presources/global/js/BN/DOMApplication/Rule.js Monday, November 14, 2011 2:41:59 PM */


BN('DOMApplication.RulesLibrary', ['BN.DOMApplication.Rule'], function ($, Rule) {
    var ruleList = [];

    var add = function (rule) {
        ruleList[ruleList.length] = rule;
        return rule;
    };
    /* iterates throught the triggers, calling passed function on each item added via 'addTrigger'
    @method iterate 
    @param iterFn {function} a function that takes two params - description, and function as added to 'addTrigger'
    */
    var iterate = function (iterFn) {
        var i;
        for (i = 0; i < ruleList.length; i++) {
            iterFn(ruleList[i]);
        }
    };
    /* Reruns all the triggers relative to the node passed in.
    @method applyTo
    @param root {DOMNode} node relative to which triggers will be applied
    */
    var setRootAndExec = function (root) {

        iterate(function (rule) {
            rule.applyTo(root);
        });
    };
    return {
        addRule: function (desc, fn, name) {
            var rule = (!fn && typeof desc === 'object') ? desc : Rule.factory(desc, fn, name); //if passed Rule obj, else create one},
            return add(rule);
        },
        iterate: iterate,
        applyTo: setRootAndExec
    };

});

;/* C:\Inetpub\wwwroot\ImagemasterTrunk//presources/global/js/BN/DOMApplication/RulesLibrary.js Monday, November 14, 2011 2:41:59 PM */
BN('Widget.AsynchronousWidgets',
    ['BN.DOMApplication.RulesLibrary',
     'BN.DOMApplication.Rule',
     'BN.DOMApplication.DataStore',
     'BN.Navigation.URL',
     'BN.Navigation.Ajax'], function($, RuleLib, Rule, DataStore, URL, Ajax) {
         var registeredWidgets = DataStore.dataStoreFactory();
      //   var quickRegister = DataStore.quickRegistryFactory('asynchWidgetNames');
         var randomNamer = 0;



         var AsynchWidget = function(nodeToReplace, dataSource) {
             //if applicable - otherwise it will be defined first time inserted into dom  
             var props = { originalSource: '',
                 theme: '',
                 id: '',
                 name: '',
                 dataExtractionId: '',
                 properties: ''
             }, requestor, interfaceObject;


             var initialize = function() {
                 var useDom = (typeof dataSource !== 'object');
                 if (useDom) {
                     dataSource = $(dataSource, nodeToReplace);
                 }

                 var setProp = function(propLookup) {
                     var propName, newVal;
                     for (propName in propLookup) {
                         if (propLookup.hasOwnProperty(propName)) {
                             newVal = useDom ? dataSource.attr('data-clientLoaded' + propLookup[propName]) : dataSource[propLookup[propName]];
                             props[propName] = newVal;
                         }
                     }
                 };

                 setProp({ originalSource: 'Url',
                     theme: 'Theme',
                     id: 'Id',
                     name: 'Name',
                     dataExtractionId: 'Identifier',
                     properties: 'Properties'
                 });
                 requestor = Ajax.getAjaxRequestor(props.originalSource);
             };

             var insertWidgetIntoDom = function(node) {
                 var oldPlaceHolder = nodeToReplace;
                 nodeToReplace = node;
                 $(oldPlaceHolder).replaceWith(nodeToReplace);
                 $(nodeToReplace).attr('data-BNWidgetProperties', props.properties);
                 $(nodeToReplace).attr('data-BNWidgetName', props.name || 'unnamed' + randomNamer);
                 registeredWidgets.addObject(nodeToReplace, interfaceObject);
                 RuleLib.applyTo(nodeToReplace);
             };

             initialize();
             interfaceObject = {
                 getWidgetTypeId: function() { return props.dataExtractionId; },
                 insertWidget: insertWidgetIntoDom,
                 getWidgetName: function() { return props.name; }
             };
             return $.extend(interfaceObject, requestor)

         }; //close AsynchWidget  class
         var extractNamedWidget = function(content, name, domNode) {
             var $extracted = $(content).children('[name = "' + name + '"]');
             return domNode ? $extracted.get(0) : $extracted;
         };


         var asynchWidgetLoader = function(node) {
             $('.client-loaded-widget', node).each(function() {
                 var asynchWidget = new AsynchWidget(this, '.client-loaded-data');
                 asynchWidget.loadData(function(contentNode) {
                     var $relevantWidget = extractNamedWidget(contentNode, asynchWidget.getWidgetTypeId());
                     if ($relevantWidget.length === 0) {
                         $relevantWidget = $('<div><em class="tvar-error"><span>##ERR## UNDEF# ' + asynchWidget.getWidgetTypeId() + '-- --</span></em></div>');
                     } else {
                         asynchWidget.insertWidget($relevantWidget.children());
                         $(document).trigger('WidgetInserted.asynch', { 'baseNode': node, 'widget': asynchWidget, 'fromServer': contentNode });
                     }
                 });
             });

         }; //close asynch widget loader fn

         var myRule = Rule.factory('asynchronous "widget" loader', asynchWidgetLoader, 'asynchLoader');
         RuleLib.addRule(myRule);


         return {
             getLoadedWidgets: registeredWidgets,
             asynchWidgetFactory: function(node, dataSource) { return new AsynchWidget(node, dataSource); },
             extractWidgetFromNode: extractNamedWidget
         };
     });
;/* C:\Inetpub\wwwroot\ImagemasterTrunk//presources/global/js/BN/Widget/AsynchWidgets.js Monday, November 14, 2011 2:41:59 PM */
BN('Recommendation.URL', function($) {
    var RecommendationServiceUrl = function(urlObj) {
        var init = function() {
            urlObj.paramaterize(function(loc) {
                return { ean: loc.split('/')[7] };
            }, function(loc, qsObj) {
                var location = loc.split('/');
                location[7] = qsObj.ean;
                loc = location.join('/');
                return loc;
            }, function(loc, qsObj) {
                var temp = {}, prop;
                for (prop in qsObj) {
                    if (qsObj.hasOwnProperty(prop)) {
                        if (prop !== 'ean') {
                            temp[prop] = qsObj[prop];
                        }
                    }
                }
                return temp;
            });
        };
        var changeRecommendationEan = function(ean) {
            urlObj.updateQuery({ 'ean': ean });
            return urlObj;
        };
        init();
        urlObj.updateEan = changeRecommendationEan; //extend urlObj
        return urlObj;
    };
    return {
        factory: function(urlObj) { return new RecommendationServiceUrl(urlObj); }
    };
});

;/* C:\Inetpub\wwwroot\ImagemasterTrunk//presources/global/js/BN/Recommendation/URL.js Monday, November 14, 2011 2:41:59 PM */
BN('Widget.Sets',
    ['BN.DOMApplication.DataStore',
     'BN.Widget.AsynchronousWidgets',
      'BN.Analytics.TagLibrary'], function($, DataStore, AsynchWidgets, TagLib) {
          var ContainerBehaviors = {
              defaultBehavior: {
                  distributionAlgorithm: function(jqElements, countThatFits, spaceToDistribute) {
                      //                      console.log('DEFAULT:');
                      var divisor = countThatFits * 2; //how much free space do we have
                      var addToEachItemsMargins = Math.floor(spaceToDistribute / divisor); //how much will we add to each item's margin
                      var unusedSpace = spaceToDistribute % divisor; //Since we used floor, there may be remaining space 
                      jqElements.each(function() {
                          $(this).css({
                              'marginRight': addToEachItemsMargins,
                              'marginLeft': addToEachItemsMargins
                          });
                      });
                      return unusedSpace;
                  },
                  manageExtras: function(spaceToManage, $container, widthForSet) {
                      $container.children('.w-box').width(widthForSet - spaceToManage);
                  }
              },
              flushEnds: {
                  distributionAlgorithm: function(jqElements, countThatFits, spaceToDistribute) {
                      //                      console.log('using flush ends');
                      //                      console.log(countThatFits + ' over ' + spaceToDistribute);
                      var divisor = countThatFits - 1; //how much free space do we have
                      var addToEachItemsRightMargin = Math.floor(spaceToDistribute / divisor); //how much will we add to each item's margin
                      var unusedSpace = spaceToDistribute % divisor; //Since we used floor, there may be remaining space
                      var position = 1;
                      jqElements.each(function() {
                          if (position++ % countThatFits !== 1) {
                              $(this).css({ 'marginLeft': addToEachItemsRightMargin });
                          }
                      });
                      //                      alert(unusedSpace);
                      return unusedSpace;
                  },
                  manageExtras: function(spaceToManage, $container, widthForSet) {
                      $container.children('.w-box').width(widthForSet - spaceToManage);
                  }
              }
          };

          //Finds the original placeholder widget replacement that used this key
          var WidgetRequestBinder = function(key) {
              //This code is for widget loading. Should be extracted? 
              var requestor, fn;
              var findAutoWidget = function() {
                  var widget = AsynchWidgets.getLoadedWidgets.findObject(function(node, obj) {
                      var rootWidgetName = key;
                      //var rootWidgetName = SetIdentifyingData.getWidgetName();
                      var nodeWidgetName = $(node).find("[data-BNWidgetName]").attr("data-BNWidgetName") || $(node).attr("data-BNWidgetName");
                      return rootWidgetName === nodeWidgetName;
                  });
                  return widget;
              };

              var getData = function() {
                  if (requestor === undefined) {
                      setData(findAutoWidget()); //atempt to default it.
                      if (requestor === undefined) { //still unsuccessfull
                          throw 'No Data source available for this widget';
                      }
                  }
                  return requestor;
              };
              var setData = function(requestorInput) {
                  requestor = requestorInput;
                  requestor.onLoad(function(contentNode) {
                      fn(contentNode);
                  });
              };
              return {
                  getRequestor: getData,
                  setRequestor: setData,
                  bindToRequestor: function(fnToBind) { fn = fnToBind; },
                  isPreBound: function() { return findAutoWidget() !== undefined; }
              };
          };

          var Resizer = function(jqElement) {
              var cachedWidth = jqElement.width();
              this.onResize = function(fn) {
                  $(window).bind('resize', function() {
                      if (parseInt(jqElement.width()) !== parseInt(cachedWidth)) {
                          fn();
                          cachedWidth = jqElement.width();
                      }
                  });
              };
          };

          var FunctionalitySet = function(nodeFinder) {
              var fnList = [];
              var applyFunctionalityToItems = function(offset) {
                  var elementPosition = offset || 0; //this represents the offset from which the $nodes were extracted before reaching this method
                  nodeFinder().slice(offset || 0).each(function() {
                      var i = 0;
                      for (; i < fnList.length; i++) {
                          fnList[i](this, elementPosition);
                      }
                      elementPosition++;
                  });
              };

              var addNewFunctionality = function(fn) {
                  var idx = 0,
			$applyTo = nodeFinder();
                  fnList[fnList.length] = fn;
                  $applyTo.each(function() { fn(this, idx++) });
              };
              return {
                  applyFunctionality: applyFunctionalityToItems,
                  addNewFunctionality: addNewFunctionality,
                  updateNodeFinder: function(fn) { nodeFinder = fn; }
              };
          };

          var ElementSet = function(selector, rootNode) {
              var $initialItems,
              api,
    	      $itemsParent,
    	      postPopulate = function() { },
              replaceContent = true,
    	      $removedItems = [], //ensure this is better than empty jquery object (delete this comment)
    	      functionalitySet = new FunctionalitySet(function() { return $(selector, rootNode); });

              var construct = function() {
                  $initialItems = selectFromNode();
                  $itemsParent = $initialItems.last().parent();
              };
              var repopulate = function(repressPostPopulate) {
                  cleanUp();
                  $itemsParent.append($removedItems);
                  $removedItems.length = 0;
                  if (!repressPostPopulate) {
                      postPopulate(api);
                  }
              };
              var selectFromNode = function(node, all) {
                  //two optional args - 'node' potential root to filter from, and a boolean that removes the filter
                  var contextNode = (node === true) ? (rootNode) : (node || rootNode);
                  return (all || node === true) ? $(selector, contextNode) : $(selector, contextNode).not('.ignore-item');
              };

              var addFillerElements = function(n) {//html() might give better performance here
                  var i,
               $fillerItemBasis = selectFromNode().eq(0).clone(),
               $toAppend;


                  for (i = 0; i < n; i++) {
                      $toAppend = $fillerItemBasis.clone().addClass('ignore-item').css('visibility', 'hidden');
                      selectFromNode().last().after($toAppend);
                  }

              };
              var copyElementsFrom = function(x, y, all) {
                  var includeIgnored = (all === true || y === true),
                 $itemsToCopy = typeof y === 'number' ? selectFromNode(includeIgnored).slice(x, y) : selectFromNode(includeIgnored).slice(x);
                  //alert('x=' + x + ' y=' + y + ' itemsToCopy:' + $itemsToCopy.length + ' total items=' + (typeof y === 'number' ? selectFromNode(includeIgnored).length : selectFromNode(includeIgnored).length) + ' include ignored:' + includeIgnored);
                  return $itemsToCopy.clone().addClass('ignore-item');
              };
              var cleanUp = function(node) {
                  selectFromNode(true).filter('.ignore-item').remove();
              };

              var changeContent = function(newContent, cbf) {
                  var $oldItems, //Wait till repopulated to initialize
	                 $newItems = selectFromNode(newContent),
	                 startPos = 0;
                  repopulate(true);
                  $oldItems = selectFromNode();

                  if (replaceContent) {        //If we are replacing
                      $oldItems.remove(); //, lets clean the slate
                  } else {                      //if not,
                      startPos = $oldItems.length; //Lets start copying to the end
                  }

                  //add to dom
                  if ($newItems.length > 0) {//no point in doing anything
                      $itemsParent.append($newItems);
                      //Add functionality as was on others
                      functionalitySet.applyFunctionality(startPos);
                  }
                  postPopulate(api);
                  return cbf();
              };

              construct();

              api = {
                  newContent: changeContent,
                  replaceWithNewContent: function(bool) { replaceContent = bool; },
                  fnSet: functionalitySet,
                  refill: repopulate,
                  trim: function(count) {
                      repopulate(true);
                      $removedItems = selectFromNode().slice(count).remove();
                      postPopulate(api);
                  },
                  isEmpty: function() { return selectFromNode().length === 0; },
                  getActiveItems: selectFromNode,
                  getFullCount: function() { return selectFromNode().length + $removedItems.length; },
                  addFillerElements: addFillerElements,
                  copyElementsFrom: copyElementsFrom,
                  setPostPopulate: function(fn) { postPopulate = fn; }
              };
              return api;
          };

          var ContainedElementSet = function(elementSet, elementItem, behaviorManager) {
              var outerMargins = { right: 0, left: 0 },
    	       $container,
    	       pageMax = false,
    	       cached = {
    	           w: 0,
    	           widthForSet: 0,
    	           h: {},
    	           pages: 1,
    	           itemsPerPage: 1
    	       };

              var setOuterMargins = function(left, right) {
                  outerMargins.right = right === undefined ? left : right;
                  outerMargins.left = left;
                  //              console.log('11111111111111set margin resize');
                  resize();
              };
              var findHeight = function(selectorToFind, forceSelEvaluation) {
                  var doForceEvaluation = forceSelEvaluation === true || selectorToFind === true; //Account for when no selector is passed in
                  var propToEval = typeof selectorToFind === 'string' ? selectorToFind : 'def';
                  if (cached.h[propToEval] === undefined || doForceEvaluation) {
                      cached.h[propToEval] = 0;
                      elementSet.getActiveItems().each(function() {
                          var currHeight = typeof selectorToFind === 'string' ? $(this).find(selectorToFind).height() : $(this).height();
                          if (currHeight > cached.h[propToEval]) {
                              cached.h[propToEval] = currHeight;
                          }
                      });
                  }
                  return cached.h[propToEval];
              };

              var trimToPages = function(n) {
                  var presetTarget = !(isNaN(n)) && n != 0, //if a number is passed in, it means we want not to exceed it (max pages)
                  //If we have a cutoff (n) use it, otherwise use all of the items
                   maxItems = presetTarget ? itemsThatFitInSet() * n : elementSet.getFullCount(),
                   maxPossible = Math.ceil(elementSet.getFullCount() / itemsThatFitInSet()), //dont want empty pages
                   maxAllowed = Math.ceil(maxItems / itemsThatFitInSet());

                  //if we have more pages than allowed
                  if (maxPossible > maxAllowed) {
                      cached.pages = maxAllowed;
                  } else {
                      cached.pages = maxPossible;
                  }
                  //WE trim either way, because trim fills all previously trimmed, before trimming. (it trims from the original amount - not //                   //from what was last trimmed to (if 50 items trimmed to 35, and then we trim to 40, it will have 40 items)
                  elementSet.trim(maxItems);
              };
              var itemsThatFitInSet = function() {
                  cached.widthForSet = $container.width() - outerMargins.right - outerMargins.left;

                  //                  console.log('Total size when evaluating container space = ' + cached.widthForSet);
                  return elementItem.getNumberOfElementsThatFitIn(cached.widthForSet);
              };
              var resize = function() {
                  var unusedSpace;
                  cached.itemsPerPage = itemsThatFitInSet();
                  trimToPages(pageMax); //Page max may be false, or undefined, and thats ok!
                  //                  console.log('about to resize based on ' + cached.widthForSet);
                  unusedSpace = elementItem.applyAlgorithm(cached.widthForSet, behaviorManager.distributionAlgorithm);
                  behaviorManager.manageExtras(unusedSpace, $container, cached.widthForSet);
                  //TODO: distrubute remaining across margins
              };



              this.setContainer = function(jqElement) {
                  $container = jqElement;
                  cached.w = $container.width();
              };
              this.getPages = function() { return cached.pages; };
              this.setPageMax = function(max) { pageMax = max; }
              this.setOuterMargins = setOuterMargins;
              this.getHeight = findHeight;
              this.getOuterMargins = function() { return { r: outerMargins.right, l: outerMargins.left }; };
              this.getItemsPerPage = itemsThatFitInSet;
              this.elementSet = elementSet;
              this.containedItem = elementItem;
              this.resize = resize;
          };
          ContainedElementSet.factory = function(elementSet, elementItem, behavior) {
              var behaviorObj, elementItemObj;
              if (!behavior) {
                  behaviorObj = ContainerBehaviors.defaultBehavior;
              } else if (typeof behavior === 'string') {
                  behaviorObj = ContainerBehaviors[behavior];
              } else {
                  behaviorObj = behavior;
              }

              if (typeof elementItem === 'boolean') {
                  elementItemObj = new ContainedElement(elementSet, elementItem);
              } else {
                  elementItemObj = elementItem
              }

              return new ContainedElementSet(elementSet, elementItemObj, behaviorObj);
          };

          var ContainedElement = function(elementSet, useMarginForInitialWidth) {
              var first = elementSet.getActiveItems().eq(0),
    	 itemInnerSize = useMarginForInitialWidth ? first.outerWidth(true) : first.width(),
         itemSize = first.outerWidth(true),
         itemMarginSpace = itemSize - itemInnerSize; //not used yet


              var elementsThatFitIn = function(spaceToFill) {
                  elementsThatFit = Math.floor(spaceToFill / itemSize);
                  /*                  console.log('tofill' + spaceToFill);
                  console.log('item-size' + itemSize);
                  console.log('allows for' + elementsThatFit);
                  */
                  return elementsThatFit;
              };
              var extraSpace = function(spaceToFill) {
                  var spaceConsumed = elementsThatFitIn(spaceToFill) * itemSize;
                  return spaceToFill - spaceConsumed;
              };

              var distributeExtraSpace = function(spaceToFill, howToFillFn) {
                  return howToFillFn(elementSet.getActiveItems(true), elementsThatFitIn(spaceToFill), extraSpace(spaceToFill));
              };
              var getMarginInfo = function() {
                  //note that using padding to build item width is deprecated ,so it will not be supported by this api
                  return {
                      r: first.css('margin-right'),
                      l: first.css('margin-left'),
                      both: first.css('margin-right') + first.css('margin-left'),
                      avg: (first.css('margin-right') + first.css('margin-left') / 2)
                  };
              };

              this.applyAlgorithm = distributeExtraSpace;
              this.getNumberOfElementsThatFitIn = elementsThatFitIn;
              this.getMarginInfo = getMarginInfo;
              //	this.getMarginOld = function(){return getMarginInfo().avg;};

              //clone = first.clone();
          };

          var itemSetStorage = DataStore.dataStoreFactory();
          var ItemSet = function(node, rows, options) {
              var settings = { widthCreator: 'padding' };
              options = options || {}
              $.extend(settings, settings, options);

              var ProductSetData = (function() {
                  var $dataSource;
                  var init = function($root) {
                      $dataSource = $root.find('.product-set-data');
                  };
                  return {
                      getData: function(name) {
                          return $dataSource.attr('data-' + name) || '';
                      },
                      init: init
                  };
              })();

              var SetIdentifyingData = (function() {
                  var dataSearchRoot;
                  var init = function(rootNode) { dataSearchRoot = rootNode; };
                  return {
                      getSetDataType: function() { return ProductSetData.getData('metrics-setType'); },
                      getSetFilterType: function() { return ProductSetData.getData('metrics-setTypeModifier'); },
                      getWidgetName: function() { return dataSearchRoot.find("[data-BNWidgetName]").attr("data-BNWidgetName") || dataSearchRoot.attr("data-BNWidgetName"); },
                      getWidgetType: function() { return "Rows"; },
                      init: init
                  };
              })();


              var initialize = function() {
                  var $setRealRoot,
           $setWrapperRoot,
           elementSet,
           containedElementSet,
           linkedService,
           extendedWrapperClass,
           wrapperClass = 'set-wrapper';

                  //Access initial data to set up scaffolding
                  ProductSetData.init($(node));
                  extendedWrapperClass = wrapperClass + ' ' + ProductSetData.getData('view-widget') + ' ' + ProductSetData.getData('view-version');
                  $setRealRoot = $(node).wrap('<div class="' + extendedWrapperClass + '"></div>').show(); //show just in case hidden to avoid repaint
                  $setWrapperRoot = $setRealRoot.parents('.' + wrapperClass);

                  //Set up supporting objects
                  SetIdentifyingData.init($setRealRoot);
                  elementSet = new ElementSet(ProductSetData.getData('view-widget-product-selector') || '.basic-product-set-item', node);
                  linkedService = new WidgetRequestBinder(SetIdentifyingData.getWidgetName());
                  containedElementSet = ContainedElementSet.factory(elementSet, true, ProductSetData.getData('spacing-pattern'));

                  //define initial state for contained elements
                  containedElementSet.setPageMax(rows); //OK if rows is undefined
                  containedElementSet.setContainer($setWrapperRoot);
                  containedElementSet.setOuterMargins(($setRealRoot.outerWidth(true) - $setRealRoot.width()) / 2);
                  containedElementSet.resize();

                  //define actions for future behaviors
                  linkedService.bindToRequestor(function(content) {
                      elementSet.newContent(content, function() {
                          if (elementSet.isEmpty()) {
                              $setWrapperRoot.hide();
                          } else {
                              $setWrapperRoot.show(); //so measurements work
                              containedElementSet.resize();
                          }
                      });
                  });


                  return apiPrep($setRealRoot, $setWrapperRoot, containedElementSet, linkedService);
              };

              var apiPrep = function($root, $wrapperRoot, containedElementSet, linkedService) {
                  var resizer = new Resizer($wrapperRoot),
    	   apiObject = {
    	       getRoot: function(domNode) { return domNode ? $root.get() : $root; },
    	       getWrapper: function(domNode) { return domNode ? $wrapperRoot.get() : $wrapperRoot; },
    	       getMarginSize: function() { return containedElementSet.containedItem.getMarginInfo(); },
    	       setMargins: containedElementSet.setOuterMargins,
    	       resize: containedElementSet.resize,
    	       getGroupCount: containedElementSet.getPages,
    	       getActiveItems: containedElementSet.elementSet.getActiveItems,
    	       getGroupHeight: containedElementSet.getHeight,
    	       getGroupSize: containedElementSet.getItemsPerPage,
    	       applyToEachItem: containedElementSet.elementSet.fnSet.addNewFunctionality,
    	       getWidgetIdentification: function() { return SetIdentifyingData; }, //better as exposed object, but external apis demand otherwise
    	       setDataSource: linkedService.setRequestor,
    	       startedAsynchronously: linkedService.isPreBound,
    	       getItemSetData: function(x) { return ProductSetData.getData(x); },
    	       getDataSource: linkedService.getRequestor,
    	       appendOnReload: function(bool) { containedElementSet.elementSet.replaceWithNewContent(!bool); },
    	       addPostResolutionModification: function(fn) { containedElementSet.elementSet.setPostPopulate(fn) },
    	       //setGroupCountAsMax: function (bool) { allowLeftovers = bool; },
    	       getNewItems: function(content) {
    	           containedElementSet.elementSet.newContent(content, function() {
    	               if (containedElementSet.elementSet.isEmpty()) {
    	                   $wrapperRoot.hide();
    	               } else {
    	                   $wrapperRoot.show(); //so measurements work 
    	                   containedElementSet.resize();
    	                   containedElementSet.getGroupHeight(true);
    	               }
    	           });
    	       }
    	   };
                  resizer.onResize(function() {
                      apiObject.resize();
                  });
                  // setGroupCountAsMax: function (bool) { allowLeftovers = bool; },
                  return apiObject;
              };



              return itemSetStorage.addObject(node, initialize());
          };


          var carouselSetStorage = DataStore.dataStoreFactory();
          var CarouselSet = function(node, options) {
              var customApi = {}, updatedDataSource = false, api,
        headerElement, itemsThatFit, carouselSet = new ItemSet(node, options.groupCount, options), doResize = carouselSet.resize;
              //This sets the buttons to the apropriate state, and moves the carousel to the correct starting position
              //this is also called on resize
              var determineInitialState = function() {
                  var numberOfGroups = carouselSet.getGroupCount(); //always query, never cache as it can change
                  if (numberOfGroups === 1) {
                      //disable if necessary
                      //    carouselSet.resize();
                      carouselSet.getWrapper().find('.prev').addClass('disappeared').end().find('.next').addClass('disappeared');
                  } else if (options.circular === 'true') {
                      //some of these will only be there when reloaded and sent back to the beginning
                      //   carouselSet.resize();
                      api.seekTo(carouselSet.getGroupSize() + 1);
                      carouselSet.getWrapper().find('.prev').
                        removeClass('disappeared').
                        removeClass('disabled').
                       end().find('.next').
                        removeClass('disappeared').
                        removeClass('disabled');

                  } else {
                      api.seekTo(0, 1);
                      carouselSet.getWrapper().find('.prev').
                        removeClass('disappeared').
                        addClass('disabled').
                       end().find('.next').
                        removeClass('disappeared').
                       removeClass('disabled');
                  }
              };
              //This assembles the carousel components
              var buildCarousel = function() {
                  var distance, $setControls;
                  //helper methods to provide boolean results for arrows
                  var isEnabled = function(el) {
                      return !($(el).hasClass('disabled')) && !($(el).hasClass('disappeared'));
                  };
                  var enable = function(el) {
                      $(el).removeClass('disabled').removeClass('disappeared');
                  };
                  var disable = function(el, tot) {
                      $(el).addClass(tot ? 'disappeared' : 'disabled');
                  };
                  var counter = 0;
                  //This allows for the most basic set of carousel styling, added to the expanding wrapper.
                  carouselSet.getWrapper().addClass('carousel-applier');
                  //get  header to move out of range of overflow:hidden , where header is sent together with data when they come from the same service
                  headerElement = $('h1,.set-header', carouselSet.getRoot()).get(0);
                  //Put the header element outside the carousel, and add the button (set-control) markup
                  carouselSet.getRoot().before(headerElement).before('<div class="set-control prev"> </div>').before('<div class="set-control next"> </div>');
                  $setControls = carouselSet.getWrapper().find('.set-control');
                  if (options.circular === 'true') {
                      //This method will execute after resizes, trims, repopulation and reloads
                      carouselSet.addPostResolutionModification(function(elementSet) {
                          var groupSize = carouselSet.getGroupSize(),
                          groupCount = carouselSet.getGroupCount(),
                          toPrepend,
                          toAppend; /*
                          console.log('CALLING NOW!!!');
                          console.log('group cpoinyt' + groupCount);
                          console.log('gourp size' + groupSize);
                          console.log('active items' + elementSet.getActiveItems().length);
                          console.log('amount of filler being added' + (groupCount * groupSize - elementSet.getActiveItems().length));
*/
                          elementSet.addFillerElements(groupCount * groupSize - elementSet.getActiveItems().length);
                          if (groupCount > 1) {
                              //moves a copy of the front to the back, and the back to the front so we can have smooth sliding.
                              toPrepend = elementSet.copyElementsFrom(groupSize * -1, true);
                              toAppend = elementSet.copyElementsFrom(0, groupSize);
                              elementSet.getActiveItems(true).last().after(toAppend).end().eq(0).before(toPrepend);
                          }

                      });
                  }
                  carouselSet.setMargins($setControls.outerWidth(true));


                  //This instantiates the jquery tools carousel                                                                                                      
                  api = $(carouselSet.getRoot()).scrollable({
                      items: '.wgt-bn-product-set-basic-container',
                      api: true,
                      speed: 400,
                      next: '.bob',
                      prev: '.larry'
                  });



                  carouselSet.getRoot().height(carouselSet.getGroupHeight());
                  carouselSet.applyToEachItem(function(item) {
                      $(item).height(carouselSet.getGroupHeight(!(options.optimizeForStatics === 'true')));
                      if (carouselSet.getItemSetData('view-version').substr(1) > 3) {
                          $(item).children().
                            hover(function() { $(item).addClass('set-hovered'); },
                                 function() { $(item).removeClass('set-hovered'); }).
                                click(function() {
                                    if (!$(this).hasClass('contributers-line')) {
                                        document.location = $(this).parent().find('a[href]').attr('href');
                                    } else {
                                        document.location = 'http://productsearch.barnesandnoble.com/search/results.aspx?ATH=' + $(this).text();
                                    }
                                });
                      }
                  });

                  determineInitialState();

                  carouselSet.getWrapper().find('.prev').click(function(e) {
                      var itemsThatFit = carouselSet.getGroupSize();
                      var meaningfulPageCount = carouselSet.getGroupCount();
                      if (isEnabled(this)) {
                          api.move(itemsThatFit * -1);
                          if (options.circular && api.getIndex() <= 1) {
                              api.seekTo((itemsThatFit * meaningfulPageCount) + 1, 1);
                          }

                          if (!options.circular) {
                              enable(carouselSet.getWrapper().find('.next').get(0)); //If prev was clicked, next can definitely be clicked
                              if (api.getIndex() - itemsThatFit < 0) {//If the next "prev" click would exceed beggining
                                  disable(this);
                              }
                          }
                      }
                      return false;
                  }).end().find('.next').click(function(e) {
                      var itemsThatFit = carouselSet.getGroupSize();
                      var meaningfulPageCount = carouselSet.getGroupCount();
                      if (isEnabled(this)) {
                          api.move(itemsThatFit);
                          if (options.circular && api.getIndex() > itemsThatFit * (meaningfulPageCount + 1)) { //the plus one is for the dummy from circular
                              api.seekTo(itemsThatFit + 1, 1);
                          }

                          if (!options.circular) {
                              enable(carouselSet.getWrapper().find('.prev').get(0)); //if next was click prev can definitely follow
                              if (api.getIndex() + itemsThatFit >= api.getSize()) {//If the next "next" click would exceed end
                                  disable(this);
                              }
                          }
                      }
                      return false;
                  });

                  carouselSet.getRoot().show();
              };




              buildCarousel();
              //**********
              //Building api here
              //*********


              //overload
              carouselSet.getWidgetIdentification().getWidgetType = function() { return "Carousel"; };

              carouselSet.resize = function() {
                  //overloads the resize method to do standard resize, plus resize the carousel
                  doResize();
                  determineInitialState();
              };
              
              //add additional onload functionality
              customApi.getDataSource = function() {
               var source = carouselSet.getDataSource();
              
                 if (!updatedDataSource) {
                   updatedDataSource = true;
                    //   console.log('updated src'); 
                   source.onLoad(function() {
                         determineInitialState();
                     }, 'after');
                 };
                 return source;
              };
            
              customApi = carouselSet;
              customApi.toolsApi = api;
              customApi.getRoot = carouselSet.getRoot;
              customApi.getWrapper = carouselSet.getWrapper;
              customApi.resize = carouselSet.resize;
              customApi.getPageSize = carouselSet.getGroupSize;
              customApi.getNumberOfPages = carouselSet.getGroupCount;
              customApi.applyToEachItem = carouselSet.applyToEachItem;
              customApi.getWidgetIdentification = carouselSet.getWidgetIdentification;
              customApi.setDataSource = carouselSet.setDataSource;
              return carouselSetStorage.addObject(node, customApi);
          };



          var leaderSetStorage = DataStore.dataStoreFactory();
          var LeaderProductSet = function(node, dataElement) {
              // alert('BUILDING LEADER');
              var singlePadding = 0,
                updatedDataSource = false,
                baseSet = new ItemSet(node, 1, { widthCreator: 'margin' }),
                origResize = baseSet.resize,
				leaderSetRoot = baseSet.getRoot(),
                itemVersion = baseSet.getItemSetData('view-version').substr(1);
              headerElement = $('.set-header-type', leaderSetRoot).get(0),
                leaderHeader = $('.product-set-leader-header', leaderSetRoot),
                subHeader = $('.product-set-sub-header', leaderSetRoot),
                leaderProducts = $('.leader-products  .basic-product-set-item', leaderSetRoot);

              var resizeHeaders = function() {
                  //Resizes the headers so that they align with the products inside
                  var spaceForLeaderProducts = leaderProducts.outerWidth(true);
                  //Padding on one size of the whole
                  singlePadding = parseInt(baseSet.getMarginSize().l);

                  leaderHeader.css('paddingLeft', singlePadding + 'px');

                  subHeader.css('marginLeft', (spaceForLeaderProducts + singlePadding) + 'px');
                  subHeader.width(subHeader.width() - spaceForLeaderProducts);
                  leaderHeader.width($(headerElement).width() - subHeader.width());



                  var newSize = $('.wgt-bn-product-set-basic-container:eq(1)', leaderSetRoot).width() + $('.wgt-bn-product-set-basic-container:eq(0)', leaderSetRoot).width() + $('.set-header', leaderSetRoot).width() - $('.wgt-bn-product-set-basic-carousel', leaderSetRoot).width();

                  $('.wgt-bn-product-set-basic-carousel', leaderSetRoot).width(newSize)


                  $('.wgt-bn-product-set-basic-container:eq(1)', leaderSetRoot).width(newSize - $('.wgt-bn-product-set-basic-container:eq(0)', leaderSetRoot).width())

              };

              var initialize = function() {
                  baseSet.getRoot().before(headerElement).before(leaderHeader).before(subHeader);
                  baseSet.setMargins(0);
                  resize(); // includes baseset and header resizing full resize functionality
                  baseSet.getRoot().height(baseSet.getGroupHeight());
                  baseSet.getRoot().hide();
                  baseSet.getRoot().slideDown(400);

                  baseSet.applyToEachItem(function(item) {

                      $(item).children().hover(function() {
                          $(item).addClass('set-hovered');
                      },
                      function() {
                          $(item).removeClass('set-hovered');
                      }).click(function() {
                          if (!$(this).hasClass('contributers-line') || itemVersion < 3) {
                              document.location = $(this).parent().find('a[href]').attr('href');
                          } else {
                              document.location = 'http://productsearch.barnesandnoble.com/search/results.aspx?ATH=' + $(this).text();
                          }
                      });
                      $(item).height(baseSet.getGroupHeight(true));
                  });

              };

              var resize = function() {
                  origResize();
                  resizeHeaders();
              };

              baseSet.resize = resize;
              initialize();
              return leaderSetStorage.addObject(node, baseSet);

          };
          return {
              itemSetFactory: function(node, groups) {
                  var itemSet = new ItemSet(node, groups);
                  $(function() { TagLib.getTag('ProductSetTagging').exec(itemSet) }); //add to Domready queue cause tags dont exist yet
                  return itemSet;
              }, //factory that returns new ItemSet object
              productCarouselFactory: function(node, groups) {
                  var carouselSet = new CarouselSet(node, groups);
                  $(function() { TagLib.getTag('ProductSetTagging').exec(carouselSet) }); //add to Domready queue cause tags dont exist yet
                  return carouselSet;
              }, //factory that returns new LeaderProductSet object
              leaderProductSetFactory: function(node, dataNode) {
                  var leaderProductSet = new LeaderProductSet(node, dataNode);
                  $(function() { TagLib.getTag('ProductSetTagging').exec(leaderProductSet) }); //add to Domready queue cause tags dont exist yet
                  return leaderProductSet;
              }, //factory that returns new carouselSet object
              itemSet: itemSetStorage, //function. Pass a function that takes a node and returns true if node is one you seek.
              carouselSet: carouselSetStorage, //Same as above for carouselset
              leaderSet: leaderSetStorage //Same as above for carouselset

          };
      });





      BN(['BN.DOMApplication.RulesLibrary', 'BN.Widget.Sets', 'BN.Navigation.URL'], function($, rulelib, sets, URL) {
          rulelib.addRule('This rule sets up the carousel', function(relNode) {
              var createSet = function(node) {
                  var $setDataNode = $(node).find('.product-set-data');
                  var properties = $(node).find('[data-BNWidgetProperties]').attr('data-BNWidgetProperties') || $(node).attr('data-BNWidgetProperties') || '';
                  var widgetType = $setDataNode.attr('data-view-widget');
                  //console.log(properties);
                  if (properties.length === 0) {
                      properties = { groupCount: $setDataNode.attr('data-view-widget-groups') };
                  } else if (properties.indexOf('=') === -1) {//if its the one property of old
                      properties = { groupCount: properties };
                  } else {
                      //console.log(URL.queryStringToObj(properties));
                      properties = URL.queryStringToObj(properties);
                  }
                  if ($(node).parents('.suppress-auto-carousel').length === 0) {
                     //console.log($(node).parents('.demoContainer').find('h2').text());
                      if (widgetType === 'leader-product-set') {
                          $(document).trigger('LeaderProductSet.ready', sets.leaderProductSetFactory(node, $setDataNode));
                      } else {
                          $(document).trigger('ProductCarousel.ready', sets.productCarouselFactory(node, properties));
                      }
                  }
              };


              $('.wgt-bn-product-set-basic-carousel', relNode).each(function() {
                  createSet(this);
              });
              if ($(relNode).hasClass('wgt-bn-product-set-basic-carousel')) {
                  createSet(relNode);
              }
          }, 'Carousel Rule');
          //This is a
      });
;/* C:\Inetpub\wwwroot\ImagemasterTrunk//presources/global/js/BN/Widget/Carousel.js Monday, November 14, 2011 2:41:59 PM */




BN(['BN.DOMApplication.RulesLibrary', 'BN.Events.PersistentTriggers'], function($, RuleLib, Triggers) {
    RuleLib.addRule('This makes a select box navigate to the urls in its options when changed', function(node) {
        $('select:fn(combo-box-navigation)', node).comboBoxNavigation(true);
    }, 'ComboBoxNavigation');

    Triggers.bind('DOMApplication.ready', function() {
        RuleLib.applyTo(document);
    });
});


;/* C:\Inetpub\wwwroot\ImagemasterTrunk//presources/global/js/BN/DOMApplication/RulesLibrarySetup.js Monday, November 14, 2011 2:41:59 PM */
 BN(['BN.Events.PersistentTriggers'],function($,triggers){
    triggers.fire('DOMApplication.ready');
 });
 
;/* C:\Inetpub\wwwroot\ImagemasterTrunk//presources/global/js/BN/Events/ApplicationReady.js Monday, November 14, 2011 2:41:59 PM */

$.onContentReady('bn-footer', function () {

   // FOOTER EMAIL SIGNUP
   $('#ftr-email .ftr-button2').click(function(e) {
   	e.preventDefault();
   	var email = $('#ftr-email #emailInput').val().toLowerCase();
   	var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
   	if (email == '') {
   		$('#ftr-email #emailInput').removeClass("focusBlueBorder revertWhiteBorder").addClass("addRedBorder");
   		$('#ftr-email .ftr-error').show();
   		return false;
   	}
   	if (pattern.test(email) == false) {
   		$('#ftr-email .ftr-error').show();
   		return false;
   	};
   	if (pattern.test(email) == true) {
   		$.ajax({
   			type: 'POST',
   			url: '/proxies/email-signup.asp',
   			data: 'email='+ email,
   			success: function(){
   				$('#ftr-email .ftr-error, #ftr-email .ftr-text, #ftr-email .ftr-button1').hide();
   				$('#ftr-email .ftr-thanks').show();
   			},
   			error: function(){
   				$('#ftr-email .ftr-error2').show();
   			} 
   		});
   	}
   });
   
   $(".ftr-text input").focus(function() {
   	$(".ftr-text input").removeClass("addRedBorder revertWhiteBorder").addClass("focusBlueBorder");
   	$(".ftr-text").removeClass("error");
   	$(".ftr-error").hide();
   	// search input text removal
   		if ( $("input#emailInput").attr("value") == "Enter Your Email Address" ) {
   			$("input#emailInput").attr("value","");
   		}
   });
   
   $(".ftr-text input").blur(function() {
   		$(".ftr-text input").removeClass("addRedBorder focusBlueBorder").addClass("revertWhiteBorder");
   });
   
   $(".ftr-button2").mousedown(function() {
   	$(".ftr-button2").css("top","-72px");
   }).mouseup(function(){
   	$(".ftr-button2").css("top","-36px");
   });
   	
   $(".ftr-button2").mouseover(function() {
   	$(".ftr-button2").css("top","-36px");
   }).mouseout(function() {
   	$(".ftr-button2").css("top","0");
   });
   
});
;/* C:\Inetpub\wwwroot\ImagemasterTrunk//presources/global/js/legacy/footer.js Monday, November 14, 2011 2:41:59 PM */
