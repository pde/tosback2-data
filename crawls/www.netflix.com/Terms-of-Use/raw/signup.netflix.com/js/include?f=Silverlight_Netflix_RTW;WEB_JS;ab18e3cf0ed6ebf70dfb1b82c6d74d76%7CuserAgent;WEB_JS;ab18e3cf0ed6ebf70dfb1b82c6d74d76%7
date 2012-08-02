///////////////////////////////////////////////////////////////////////////////
//
// @nfPackageName SILVERLIGHT_CUSTOM_NETFLIX_RTW
//
// NOTE: This is a stripped down version of Silverlight.js
//  to remove unused methods that aren't needed by Silverlight.Plugin.js
//  It is also slightly modified to work with Silverlight.Plugin.js
//  mainly changes calls in Silverlight methods from "Silverlight" to "this",
//  allowing for copying Silverlight methods to another object to create callbacks
//  that only apply to that plugin instance
//
// See Silverlight.js for the original version provided by Microsoft
//
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
//
//  Silverlight.js              version 2.0.31005.0
//
//  This file is provided by Microsoft as a helper file for websites that
//  incorporate Silverlight Objects. This file is provided under the Microsoft
//  Public License available at 
//  http://code.msdn.microsoft.com/silverlightjs/Project/License.aspx.  
//  You may not use or distribute this file or the code in this file except as 
//  expressly permitted under that license.
// 
//  Copyright (c) Microsoft Corporation. All rights reserved.
//
///////////////////////////////////////////////////////////////////////////////

if (!window.Silverlight)
{
    window.Silverlight = { };
}

//////////////////////////////////////////////////////////////////
//
// minRuntimeVersion
//
// Added by Netflix so we can dynamically control
// the minimum runtime version required by our plugin instance
//
//////////////////////////////////////////////////////////////////
Silverlight.minRuntimeVersion = "2.0.31005";

//////////////////////////////////////////////////////////////////
//
// __onSilverlightInstalledCalled:
//
// Prevents onSilverlightInstalled from being called multiple 
// times
//
//////////////////////////////////////////////////////////////////
Silverlight.__onSilverlightInstalledCalled = false;

//////////////////////////////////////////////////////////////////
//
// __installationEventFired:
//
// Ensures that only one Installation State event is fired.
//
//////////////////////////////////////////////////////////////////
Silverlight.__installationEventFired = false;

//////////////////////////////////////////////////////////////////
//
// onSilverlightInstalled:
//
// Called by Silverlight.WaitForInstallCompletion when the page detects
// that Silverlight has been installed. The event handler is not called
// in upgrade scenarios.
//
//////////////////////////////////////////////////////////////////
Silverlight.onSilverlightInstalled = function () {window.location.reload(false);};

//////////////////////////////////////////////////////////////////
//
// isInstalled:
//
// Checks to see if the correct version is installed
//
//////////////////////////////////////////////////////////////////
Silverlight.isInstalled = function(version)
{
    if (version == undefined)
        version = null;
        
    var isVersionSupported = false;

    try
    {
        var control = null;
        var tryNS = false;

        if (window.ActiveXObject)
        {
            try
            {
                control = new ActiveXObject('AgControl.AgControl');
                if (version === null)
                {
                    isVersionSupported = true;
                }
                else if (control.IsVersionSupported(version))
                {
                    isVersionSupported = true;
                }
                control = null;
            }
            catch (e)
            {
                tryNS = true;
            }
        }
        else
        {
            tryNS = true;
        }
        if (tryNS)
        {
            var plugin = navigator.plugins["Silverlight Plug-In"];
            if (plugin)
            {
                if (version === null)
                {
                    isVersionSupported = true;
                }
                else
                {
                    var actualVer = plugin.description;
                    if (actualVer === "1.0.30226.2")
                        actualVer = "2.0.30226.2";
                    var actualVerArray = actualVer.split(".");
                    while (actualVerArray.length > 3)
                    {
                        actualVerArray.pop();
                    }
                    while (actualVerArray.length < 4)
                    {
                        actualVerArray.push(0);
                    }
                    var reqVerArray = version.split(".");
                    while (reqVerArray.length > 4)
                    {
                        reqVerArray.pop();
                    }

                    var requiredVersionPart;
                    var actualVersionPart
                    var index = 0;


                    do
                    {
                        requiredVersionPart = parseInt(reqVerArray[index]);
                        actualVersionPart = parseInt(actualVerArray[index]);
                        index++;
                    }
                    while (index < reqVerArray.length && requiredVersionPart === actualVersionPart);

                    if (requiredVersionPart <= actualVersionPart && !isNaN(requiredVersionPart))
                    {
                        isVersionSupported = true;
                    }
                }
            }
        }
    }
    catch (e)
    {
        isVersionSupported = false;
    }

    return isVersionSupported;
};
//////////////////////////////////////////////////////////////////
//
// WaitForInstallCompletion:
//
// Occasionally checks for Silverlight installation status. If it
// detects that Silverlight has been installed then it calls
// Silverlight.onSilverlightInstalled();. This is only supported
// if Silverlight was not previously installed on this computer.
//
//////////////////////////////////////////////////////////////////
Silverlight.WaitForInstallCompletion = function()
{
    if ( ! this.isBrowserRestartRequired && this.onSilverlightInstalled )
    {
        try
        {
            navigator.plugins.refresh();
        }
        catch(e)
        {
        }
        if (this.isInstalled(null) && !this.__onSilverlightInstalledCalled)
        {
            this.onSilverlightInstalled();
            this.__onSilverlightInstalledCalled = true;
        }
        else
        {
            var self = this;
            setTimeout(function(){ self.WaitForInstallCompletion(); }, 3000);
        }    
    }
};
//////////////////////////////////////////////////////////////////
//
// __startup:
//
// Performs startup tasks. 
//////////////////////////////////////////////////////////////////
Silverlight.__startup = function()
{
		// console.log("inside __startup");
    navigator.plugins.refresh();
    this.isBrowserRestartRequired = this.isInstalled(null);
    if (!this.isBrowserRestartRequired)
    {
        this.WaitForInstallCompletion();
        if (!this.__installationEventFired)
        {
            this.onInstallRequired();
            this.__installationEventFired = true;
        }
    }
    else if (window.navigator.mimeTypes)
    {
        var mimeSL2 =   navigator.mimeTypes["application/x-silverlight-2"];
        var mimeSL2b2 = navigator.mimeTypes["application/x-silverlight-2-b2"];
        var mimeSL2b1 = navigator.mimeTypes["application/x-silverlight-2-b1"];
        var mimeHighestBeta = mimeSL2b1;
        if (mimeSL2b2)
            mimeHighestBeta = mimeSL2b2;
            
        if (!mimeSL2 && (mimeSL2b1 || mimeSL2b2))
        {
            if (!this.__installationEventFired)
            {
                this.onUpgradeRequired();
                this.__installationEventFired = true;
            }
        }
        else if (mimeSL2 && mimeHighestBeta)
        {
            if (mimeSL2.enabledPlugin &&
                mimeHighestBeta.enabledPlugin)
            {
                if (mimeSL2.enabledPlugin.description !=
                    mimeHighestBeta.enabledPlugin.description)
                {
                    if (!this.__installationEventFired)
                    {
                        this.onRestartRequired();
                        this.__installationEventFired = true;
                    }
                }
            }
        }
    }
};

//////////////////////////////////////////////////////////////////
//  
// onRequiredVersionAvailable:
//
// Called by version  verification control to notify the page that
// an appropriate build of Silverlight is available. The page 
// should respond by injecting the appropriate Silverlight control
//
//////////////////////////////////////////////////////////////////
Silverlight.onRequiredVersionAvailable = function() 
{
		// console.log("onRequiredVersionAvailable called");
    throw "Silverlight.onRequiredVersionAvailable not defined";
};
//////////////////////////////////////////////////////////////////
//  
// onRestartRequired:
//
// Called by version verification control to notify the page that
// an appropriate build of Silverlight is installed but not loaded. 
// The page should respond by injecting a clear and visible 
// "Thanks for installing. Please restart your browser and return
// to mysite.com" or equivalent into the browser DOM
//
//////////////////////////////////////////////////////////////////
Silverlight.onRestartRequired = function() 
{
    throw "Silverlight.onRestartRequired not defined";
};
//////////////////////////////////////////////////////////////////
//  
// onUpgradeRequired:
//
// Called by version verification control to notify the page that
// Silverlight must be upgraded. The page should respond by 
// injecting a clear, visible, and actionable upgrade message into
// the DOM. The message must inform the user that they need to 
// upgrade Silverlight to use the page. They are already somewhat
// familiar with the Silverlight product when they encounter this.
// Silverlight should be mentioned so the user expects to see that
// string in the installer UI. However, the Silverlight-powered
// application should be the focus of the solicitation. The user
// wants the app. Silverlight is a means to the app.
// 
// The upgrade solicitation will have a button that directs 
// the user to the Silverlight installer. Upon click the button
// should both kick off a download of the installer URL and replace
// the Upgrade text with "Thanks for downloading. When the upgarde
// is complete please restart your browser and return to 
// mysite.com" or equivalent.
//
// Note: For a more interesting upgrade UX we can use Silverlight
// 1.0-style XAML for this upgrade experience. Contact PiotrP for
// details.
//
//////////////////////////////////////////////////////////////////
Silverlight.onUpgradeRequired = function() 
{
    throw "Silverlight.onUpgradeRequired not defined";
};
//////////////////////////////////////////////////////////////////
//  
// onInstallRequired:
//
// Called by Silverlight.checkInstallStatus to notify the page
// that Silverlight has not been installed by this user.
// The page should respond by 
// injecting a clear, visible, and actionable upgrade message into
// the DOM. The message must inform the user that they need to 
// download and install components needed to use the page. 
// Silverlight should be mentioned so the user expects to see that
// string in the installer UI. However, the Silverlight-powered
// application should be the focus of the solicitation. The user
// wants the app. Silverlight is a means to the app.
// 
// The installation solicitation will have a button that directs 
// the user to the Silverlight installer. Upon click the button
// should both kick off a download of the installer URL and replace
// the Upgrade text with "Thanks for downloading. When installation
// is complete you may need to refresh the page to view this 
// content" or equivalent.
//
//////////////////////////////////////////////////////////////////
Silverlight.onInstallRequired = function() 
{
    throw "Silverlight.onInstallRequired not defined";
};

//////////////////////////////////////////////////////////////////
//  
// IsVersionAvailableOnError:
//
// This function should be called at the beginning of a web page's
// Silverlight error handler. It will determine if the required 
// version of Silverlight is installed and available in the 
// current process.
//
// During its execution the function will trigger one of the 
// Silverlight installation state events, if appropriate.
//
// Sender and Args should be passed through from  the calling
// onError handler's parameters. 
//
// The associated Sivlerlight <object> tag must have
// minRuntimeVersion set and should have autoUpgrade set to false.
//
//////////////////////////////////////////////////////////////////
Silverlight.IsVersionAvailableOnError = function(sender, args)
{
    var retVal = false;
    try
    {
        if (args.ErrorCode == 8001 && !this.__installationEventFired)
        {
            this.onUpgradeRequired();
            this.__installationEventFired = true;
        }
        else if (args.ErrorCode == 8002 && !this.__installationEventFired)
        {
            this.onRestartRequired();
            this.__installationEventFired = true;
        }
        // this handles upgrades from 1.0. That control did not
        // understand the minRuntimeVerison parameter. It also
        // did not know how to parse XAP files, so would throw
        // Parse Error (5014). A Beta 2 control may throw 2106
        else if (args.ErrorCode == 5014 || args.ErrorCode == 2106)
        {
            if (this.__verifySilverlight2UpgradeSuccess(args.getHost()))
            {
                retVal = true;
            }
        }
        else
        {
            retVal = true;
        }
    }
    catch (e)
    {
    }
    return retVal;
};
//////////////////////////////////////////////////////////////////
//  
// IsVersionAvailableOnLoad:
//
// This function should be called at the beginning of a web page's
// Silverlight onLoad handler. It will determine if the required 
// version of Silverlight is installed and available in the 
// current process.
//
// During its execution the function will trigger one of the 
// Silverlight installation state events, if appropriate.
//
// Sender should be passed through from  the calling
// onError handler's parameters. 
//
// The associated Sivlerlight <object> tag must have
// minRuntimeVersion set and should have autoUpgrade set to false.
//
//////////////////////////////////////////////////////////////////
Silverlight.IsVersionAvailableOnLoad = function(sender)
{
    var retVal = false;
    try
    {
        if (this.__verifySilverlight2UpgradeSuccess(sender.getHost()))
        {
            retVal = true;
        }
    }
    catch (e)
    {
    }
    return retVal;
};
//////////////////////////////////////////////////////////////////
//
// __verifySilverlight2UpgradeSuccess:
//
// This internal function helps identify installation state by
// taking advantage of behavioral differences between the
// 1.0 and 2.0 releases of Silverlight. 
//
//////////////////////////////////////////////////////////////////
Silverlight.__verifySilverlight2UpgradeSuccess = function(host)
{
    var retVal = false;
    var version = this.minRuntimeVersion;
    var versionArr = version.split(".");
    if (versionArr.length > 3) {
        // enforce that the version is only qualified to 3 numbers
        // since this method appends .99 and .0 to the version
        // with the assumption that it is only 3 numbers
        version = versionArr.slice(0, 3).join(".");
    }
    var installationEvent = null;

    try
    {
        if (host.IsVersionSupported(version + ".99"))
        {
            installationEvent = this.onRequiredVersionAvailable;
            retVal = true;
        }
        else if (host.IsVersionSupported(version + ".0"))
        {
            installationEvent = this.onRestartRequired;
        }
        else
        {
            installationEvent = this.onUpgradeRequired;
        }

        if (installationEvent && !this.__installationEventFired)
        {
            installationEvent.call(this);
            this.__installationEventFired = true;
        }
    }
    catch (e)
    {
    }
    return retVal;
};var UserAgent = {
	matches: {},	// We'll populate this with String defName: boolean isMatched
	supports: {},	// We'll populate this with String defName: boolean isSupported

	// NOTE: Some of these definitions are order-sensitive (they check to see if prior UAs have been matched).
	uaDefs: {
		// Platforms
		mac: /(\bmac.os\b|\bmac_)/i,
		windows: /\b(win95|win98|win 9x|winnt|windows)\b/i,
		x11: /\bx11\b/i,
		nix: /\b(unix|linux|x11|bsd)\b/i,	// Linux, Unix, FreeBSD/NetBSD/whatever
        vista: /NT\s*6.0/,
        xp: /NT\s*5\.1/,
        xpsp2: /NT\s*5\.1\s?;\s*SV1/,  //XP Service Pack 2. Note that only IE reports SP2

        // Browsers
		iewin: /msie(.*)?windows/i,
		iewinlt7: /msie [1-6](.*)?windows/i,
		iewin7: /msie 7(.*)?windows/i,
		iewin6: /msie 6(.*)?windows/i,
		iewin55: /msie 5\.5(.*)?windows/i,
		iewin5: /msie 5\.0(.*)?windows/i,	// Not IE 5.5, but "msie 5" appears in the UA string
		iewinold: /msie [1-4](.*)?windows/i,
		iemac: /msie 5(.*)?mac/i,
		ns4: /netscape 4/i,
		safari: /(safari|applewebkit)/i,
		khtml: /(konqueror|khtml|safari|webkit)/i,	// We should transition this... we normally want to know about WebKit, not Konqueror's older KHTML engine.
		opera: /opera/i,
		opera9: /opera\/9/i,	// should be like "Opera/9.0 (Windows NT 5.1; U; en)"
        firefox: /firefox/i,
        firefox1dot0: /firefox\/1\.0/i,
        firefox1dot5: /firefox\/1\.5/i,
        firefox2dot0: /firefox\/2/i,
        ipad: /iPad/,
        iphone: /iPhone/,
        ipod: /iPod/

        // Some parsers don't like zero quantifiers
		//gecko: /([^[applewebkit]]){0}([^[khtml]]){0}([^[opera]]){0}(firefox|camino|gecko)/i
	},

	featureDefs: 	{
		// Supports PNG alpha in some way (includes IE 5.5+)
		pngAlpha: function() {
			var m = UserAgent.matches;
			return m.khtml || m.opera || m.gecko || m.iewin && !(m.iewinlt7);	// all IE/Win from 5.5+ thru 6
		},

		// Supports PNG alpha the IE 5.5+ way
		pngAlphaIEWin: function() {
			var m = UserAgent.matches;
			return m.iewin && !(m.iewin5 || m.iewinold);	// all IE/Win from 5.5+
		},

		// Supports alpha blending in some way (includes IE 5.0+)
		elementAlpha: function() {
			var m = UserAgent.matches;
			return m.khtml || m.opera9 || m.gecko || (m.iewin && !m.iewinold );	// not Opera < 9, and not old IE/Win
		},

		// Supports alpha the IE 5.0+ way (actually supported by IE 4.0, but we don't care about that)
		elementAlphaIEWin: function() {
			return UserAgent.supports.elementAlpha && UserAgent.matches.iewin;
		},

		fixedPosition: function() {
			var m = UserAgent.matches;
			return !m.iewin && (m.gecko || m.khtml || m.opera);
		},

		activeX: function() {
			if (!window.ActiveXObject) { return false; }
			try {
				new ActiveXObject("Msxml2.XMLHTTP");
				return true;
			} catch (ex) {
				return false;
			}
		}
	},

	init: function() {
		var m = this.matches;

		var doInclusion = function(defName, isIncluded) {
			m[defName] = isIncluded;
		};

		// Identify user agent
		for (var defName in this.uaDefs) {
			doInclusion(defName, this.uaDefs[defName].test(navigator.userAgent));
		}

		// Special thing for Gecko so we don't have to use a regex with zero quantifiers, which MacIE doesn't like
		doInclusion("gecko", !m.khtml && !m.opera && /(firefox|camino|gecko)/i.test(navigator.userAgent));

		// Determine platform capabilities
		for (var featureName in this.featureDefs) {
			this.supports[featureName] = this.featureDefs[featureName]();
		}

		// Globals for compatibility with older uses
		Browser = { MSIE: function() { return UserAgent.matches.iewin; } };
		isMacIE = this.matches.iemac;
		isSafari = this.matches.safari;
		isOpera = this.matches.opera;
	},

	addSupportedFeature: function(name, value) { this.supports[name] = value; }
};
var appVers = navigator.appVersion;	// for legacy support
UserAgent.init();// netflix.utils.Map:
//      makeEnum(arg1...argN) => {arg1: "arg1", argN: "argN"}
//      getValues(mapObj{a: 1, b: 2, c: 3} => [1, 2, 3]
//      make(key1, value1...keyOdd, valueEven) => {key1: value1, keyOdd: valueEven}
//      keyMap(args1...argsN) => {args1: 1, argsN: 1}
//      preserve(Object target, Object source)
//      copy(Object source, Object restrictTo)
//      map(Array/Object keys, Function callback)
//      makeFromArrays(Array keys, Array values)
//      fill(Array/Object keys, Aray/Function/other populate)
//      invert(Object origMap)

if (!window.netflix) window.netflix = {};
if (!netflix.utils) netflix.utils = {};
(function($){
    // Private
        // functions
    var _makeEnum = function(enumObj, keys) {
            if (keys && keys instanceof Array) {
                $.each(keys, function(i, key) { _makeEnum(enumObj, key); });
            } else {
            	enumObj[keys] = keys;
            }
            return enumObj;
        }
    ;

    // PUBLIC API
    netflix.utils.Map = {
        // Make an enum from the arguments; ensures all keys and values are strings
        //
        // makeEnum(arg1...argN)
        // @param arg1...argN {Object} or {Array} or other
        //          if Object, adds all object keys to the enum
        //          if Array, adds all values to the enum
        //
        // Examples:
        //      netflix.utils.Map.makeEnum("a", "b", "c") => {a: "a", b: "b", c: "c"}
        //      netflix.utils.Map.makeEnum("a", ["b", "c"], "d") => {a: "a", b: "b", c: "c", d: "d"}
        //      netflix.utils.Map.makeEnum(enumObj1{toString: "a"}, enumObj2{toString: "b"}) => {a: enumObj1, b: enumObj2}
        makeEnum: function() {
            return _makeEnum({}, $.makeArray(arguments));
        },
        
        //
        // @param mapObj {Object} Object to retrieve values from
        // Examples:
        //      netflix.utils.Map.getValues({a: 1, b: 2, c: 3}) => [1, 2, 3]
        getValues: function(mapObj) {
            var values = [];
            for (var key in mapObj) {
                values.push(mapObj[key]);
            }
            return values;
        },
        
        // Make a map from arguments
        //
        // make(key1, value1...keyOdd, valueEven)
        // @param arg1...argOdd Map key
        // @param arg2...argEven Map value
        //
        // Example:
        //      netflix.utils.Map.make("a", 1, "c", 2, "c", 3) => {a: 1, b: 2, c: 3}
        make: function() {
            var newMap = {};
            for (var i=0, len=arguments.length; i<len; i+=2) {
                newMap[arguments[i]] = (i+1 < len) ? arguments[i+1] : null;
            }
            return newMap;
        },
        
        // Make a key map where all values are set to 1
        //
        // keyMap(args1...argsN)
        // @param args1...argsN Map keys
        //
        // Examples:
        //      netflix.utils.Map.keyMap("a", "b", "c") => { a: 1, b: 1, c: 1 }
        keyMap: function() {
            return this.fill($.makeArray(arguments), 1);
        },
        
        // @deprecated
        // Use jQuery.extend instead
        extend: function(target) {
            return $.extend.apply(this, (arguments.length === 1) ?
                                    [{}].push(Array.prototype.slice.call(arguments, 0))
                                :   arguments);
        },

        // An extend that will preserve existing properties on the target,
        // preventing them from being overridden during the extend
        //
        // preserve(Object target, Object source)
        // @param target {Object}
        // @param source {Object}
        preserve: function(target, source) {
            return $.extend({}, source, target);
        },
        
        // Make a copy of the map
        //
        // copy(Object source, Object restrictTo)
        // @param source {Object} Map to copy
        // @param restrictTo Object Optional; restrict the copy to only those properties on source that are also defined on the restrictTo object
        copy: function(source, restrictTo) {
            var copyOf = {};
            $.each(restrictTo || source, function(key) {
                copyOf[key] = source[key];
            });
            return copyOf;
        },
        
        // Map keys to callback return value for that key
        //
        // map(keys, Function callback)
        // @param arg1 {Array} or {Object} Array or object of map keys
        // @param arg2 {Function} callback(index, value) Callback that should return value for the map
        // Examples:
        //      netflix.utils.Map.map(["a", "b", "c"], function(index, key) { return index; }) => {a: 1, b: 2, c: 3}
        //      netflix.utils.Map.map({a: 1, b: 2, c: 3}, function(key, value) { return key + value; }) => {a: "a1", b: "b2", c: "c3"}
        map: function(keys, callback) {
            return this.fill(keys, callback);
        },
        
        // Merge two arrays into a map
        //
        // makeFromArrays(Array keys, Array values)
        // @param arg1 {Array} Array of map keys
        // @param arg2 {Array} Array of map values
        // 
        // Examples:
        //      netflix.utils.Map.makeFromArrays(["a", "b", "c", "d"], [1, 2, 3]) => {a:1, b:2, c:3, d:null}
        makeFromArrays: function(keys, values) {
            var newMap = {},
                valuesLen = (values) ? values.length : 0;
            $.each(keys, function(i, key) {
                newMap[String(key)] = (i < valuesLen) ? values[i] : null;
            });
            return newMap;
        },
        
        // Make a map where all keys are filled with the value
        //
        // fill(Array/Object keys, Aray/Function/other populate)
        // @param keys {Array} or {Object} Map keys
        // @param populate {Array} or {Function} or {Other (treated as single value)} Value to fill keys with
        //
        // Examples:
        //      netflix.utils.Map.fill(["a", "b", "c"], 0) => {a: 0, b: 0, c: 0}
        //      netflix.utils.Map.fill({a:1, b:2, c:3}, 0) => {a: 0, b: 0, c: 0}
        //      netflix.utils.Map.fill(["a", "b", "c"], [3, 2, 1] => {a:3, b:2, c:1}
        //      netflix.utils.Map.fill(["a", "b", "c"], function(key, index) { return index--; } => {a: 0, b: 1, c: 2}
        //      netflix.utils.Map.fill({a:1, b:2, c:3}, function(key, value) { return value++; } => {a: 2, b: 3, c: 4}
        fill: function(keys, populate) {
            var fillFunc,
                newMap = {};
            if (populate instanceof Function) {
                fillFunc = function(key, value) {
                    newMap[key] = populate(key, value);
                };
            } else if (populate instanceof Array
                        && keys instanceof Array) {
                var populateLen = populate.length;
                fillFunc = function(key, index) {
                    newMap[key] = (index < populateLen) ? populate[index] : null;
                };
            } else {
                fillFunc = function(key, value) {
                    newMap[key] = populate;
                }
            }
            if (keys instanceof Array) {
                var origFillFunc = fillFunc;
                fillFunc = function(index, key) {
                    origFillFunc(key, index);
                }
            }
            $.each(keys, fillFunc);
            return newMap;
        },
        
        // Invert a map, keys become values and values become keys; ensures all keys are strings
        //
        // invert(Object origMap)
        // @param origMap {Object} Map to reverse
        invert: function(origMap) {
            var newMap = {};
            for (var key in origMap) {
                newMap[origMap[key]] = key;
            }
            return newMap;
        }        
   };
    
})(jQuery);
if (!window.netflix) window.netflix = {};
if (!netflix.Silverlight) netflix.Silverlight = {};

(function($, Silverlight, UserAgent, MapUtils) {

	var _State = MapUtils
			.makeEnum("Ready", "Install", "Upgrade", "Restart", "InstallComplete", "ActiveXDisabled", "Error"),

					_instantiate = function(plugin) {
				if (plugin.instantiated) { 
					return; 
				}

				if (UserAgent.matches.iewin && !UserAgent.supports.activeX) {
					plugin.onActiveXDisabled();
					plugin.__installationEventFired = true;
					return;
				}

				// perform preliminary installation state checks; function provided by Silverlight.Netflix.RTW.js
				plugin.__startup();

				if (!plugin.__installationEventFired) {
					// Installation event wasn't fired, so ensure correct version installed
					if (!plugin.isInstalled(plugin.settings.minVersion)) {
						// upgrade state
						plugin.onUpgradeRequired();
						plugin.__installationEventFired = true;
					} else {
						// safe to render plugin object tag
						plugin.onRequiredVersionAvailable();
						plugin.__installationEventFired = true;
						// _renderPluginObject(plugin);
					}
				}

				plugin.instantiated = true;
			},


			/**
			 * Creates a closure to capture state and handler for event callbacks.
			 */
					_getStateHandler = function(plugin, state, handler, removePluginObject) {
						 // console.log("state is: " + state + ", and handler is: " + handler);
				return function() {
					if (handler) {
						handler();
					}
				};
			};


	netflix.Silverlight.Plugin = function(settings) {
		this.settings = settings;

		// see Silverlight.Netflix.RTW.js for more details on callbacks
		var handlers = settings.stateHandlers || {};
		this.minRuntimeVersion = settings.minVersion;
		this.onRequiredVersionAvailable = _getStateHandler(this, _State.Ready, handlers[_State.Ready], false);
		this.onInstallRequired = _getStateHandler(this, _State.Install, handlers[_State.Install], true);
		this.onUpgradeRequired = _getStateHandler(this, _State.Upgrade, handlers[_State.Upgrade], true);
		this.onRestartRequired = _getStateHandler(this, _State.Restart, handlers[_State.Restart], true);
		this.onInstallComplete = _getStateHandler(this, _State.InstallComplete, handlers[_State.InstallComplete], true);
		this.onActiveXDisabled = _getStateHandler(this, _State.ActiveXDisabled, handlers[_State.ActiveXDisabled], true);
	};


	/**
	 * Public API
	 *
	 * Methods from Silverlight (see Silverlight.Netflix.RTW.js) are copied to the netflix.Silverlight.Plugin.prototype,
	 * allowing Silverlight plugin instances to have different state handlers
	 */
	netflix.Silverlight.Plugin.prototype = $.extend({}, Silverlight, {

		/**
		 * Instantiates the Silverlight Plugin instance
		 * depending on installation state will either call one of the stateHandlers
		 * or will create the plugin object tag and append it to the parentDomId
		 */
		instantiate: function() {
			_instantiate(this);
		}

	});

	netflix.Silverlight.Plugin.State = _State;

})(jQuery, Silverlight, UserAgent, netflix.utils.Map);
netflix.Silverlight.InstallCheck = (function($, SilverlightPlugin) {

    function validateSettings(settings) {
        return (typeof settings === "object") && (settings.hasOwnProperty("stateHandlers"));
    }

    function init (settings) {

        if(!validateSettings(settings)) {
						// console.log("returned");
            return;
        }

        var plugin = new SilverlightPlugin(settings);
        plugin.instantiate();
    }

    return {
        init: init
    }

})(jQuery, netflix.Silverlight.Plugin);