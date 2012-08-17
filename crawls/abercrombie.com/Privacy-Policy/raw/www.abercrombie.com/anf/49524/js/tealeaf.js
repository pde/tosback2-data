/*
 * Copyright � 1999-2012 TeaLeaf Technology, Inc.
 * All rights reserved.
 *
 * THIS SOFTWARE IS PROVIDED BY TEALEAF ``AS IS''
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING,
 * BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT ARE DISCLAIMED.
 * IN NO EVENT SHALL TEALEAF BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
 * THE POSSIBILITY OF SUCH DAMAGE.
 *
 * @fileoverview
 * This is the configuration for the main UI Client Event Capture JavaScript.
 *
 * @version 2012.06.01.1
 *
 */
if (typeof TeaLeaf === "undefined") {
  TeaLeaf = {};
  TeaLeaf.Private = {};
  TeaLeaf.tlStartLoad = new Date();

  if (!TeaLeaf.Configuration) {
    TeaLeaf.Configuration = {
      "tlversion" :                 "2012.06.01.1",

      "tlSetGUID":                  false,
      /* Sample GUID cookie config (only used when tlSetGUID is true) */
      "tlGUIDCookie":               {
                                      name: "TLGUID",
                                      // The following are optional
                                      valueLength: 32,
                                      valueSet: "0123456789ABCDEF",
                                      path: "",
                                      domain: "",
                                      expires: 0,    // minutes; 0 implies a session cookie
                                      secure: false
                                    },

      "tlurl":                      "/tl/data.html", 
      "tlsecureurl":                "/tl/data.html", 
      "xhrAsync":                   true,
      "xhrAsyncOnUnload":           false,

      "tlDisableIfInactive":        false,
      "tlActivityTimeout":          5,     // minutes, 0 = disable


      /* Cross-domain configuration (if any) */
      "xd_CommonDomain":            "",
      "xd_iframeID":                "",
      "xd_iframeSrcURL":            "",
      "xd_iframeSrcURLSecure":      ""
    };

    TeaLeaf.Configuration.tlversion += ".XM";
  }
}
/*
 * Copyright � 1999-2012 TeaLeaf Technology, Inc.
 * All rights reserved.
 *
 * THIS SOFTWARE IS PROVIDED BY TEALEAF ``AS IS''
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING,
 * BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT ARE DISCLAIMED.
 * IN NO EVENT SHALL TEALEAF BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
 * THE POSSIBILITY OF SUCH DAMAGE.
 *
 * @fileoverview
 * Configuration file for TeaLeafEvent.js
 *
 * @version 2012.06.01.1
 *
 */

if (window.TeaLeaf &&
    ((typeof TeaLeaf.replay === "function") ? !TeaLeaf.replay() : !TeaLeaf.replay) &&
    !TeaLeaf.Event)
{
  TeaLeaf.Event = {};

  TeaLeaf.Event.Configuration = {
            "tlinit"                    : false,
            "tlqueueevents"             : true,
            "tlqueueeventstimer"        : 10000,
            "tlqueuemaxevents"          : 30,
            "tlshowexceptions"          : false,
            "tleventcount"              : 0,
            "tlexceptioncount"          : 0,
            "tlpageid"                  : "", 
            "tlinitflag"                : false,
            "tlusetopqueue"             : false,
            "tllastdwelltime"           : "",
            "tlidoflastvisitedcontrol"  : "",
            "tlcatcherrors"             : true,
            /* tlcatchpopups
             * Set this to 'true' if you want the SDK to report on window.open() status.
             * Used to determine if popup windows were blocked on the client.
             */
            "tlcatchpopups"             : false,
            /* tlCatchAlerts
             * Set this to 'true' if you want the SDK to report on window.alert(),
             * window.confirm() and window.prompt() calls.
             */
            "tlCatchAlerts"             : false,
            "tlignoresendfailure"       : true,
            "tlasync"                   : true,
            "tlvisitorder"              : "",
            "t1970"                     : 0,
		    "tlmaxeventcount"           : 300,
		    "tlmaxeventexception"       : 10,


            tlResolution:[
                {"width": 799,       "height": 599,     "type": 0,  "displayText": "small"},
                {"width": 800,       "height": 600,     "type": 1,  "displayText": "800x600"},
                {"width": 1024,      "height": 760,     "type": 2,  "displayText": "1024x760"},
                {"width": 1280,      "height": 1024,    "type": 3,  "displayText": "1280x1024"},
                {"width": 1000000,   "height": 1000000, "type": 4,  "displayText": "large"}
            ],		             
            //This is the list of HTTP headers that are static and are
		    tlHTTPRequestHeadersSet:[
			    {"tlreqhttpheadername": "X-TeaLeafType",                    "tlsethttpheader": true,    "tlreqhttpheadervalue": "TeaLeaf.Event.tlEventType()"},
			    {"tlreqhttpheadername": "X-TeaLeafSubType",                 "tlsethttpheader": true,    "tlreqhttpheadervalue": "TeaLeaf.Event.tlEventSubType()"},
			    {"tlreqhttpheadername": "X-TeaLeaf-Page-Url",               "tlsethttpheader": true,    "tlreqhttpheadervalue": "TeaLeaf.Event.tlGetUrlPath()"}
		    ],   
		    //This is the list of HTTP headers that have the eval value at the time of POST
		    tlHTTPRequestHeadersEvalInit:[
			    {"tlreqhttpheadername": "X-TeaLeaf-Screen-Res",         "tlsethttpheader": true,    "tlreqhttpheadervalue": "TeaLeaf.Event.tlResolutionType(screen.width ,screen.height)"},
			    {"tlreqhttpheadername": "X-TeaLeaf-Browser-Res",        "tlsethttpheader": true,    "tlreqhttpheadervalue": "TeaLeaf.Event.tlResolutionTypeBrowser()"},
			    {"tlreqhttpheadername": "X-TeaLeaf-Page-Render",        "tlsethttpheader": true,    "tlreqhttpheadervalue": "(function () { var RENDER_TIME_CAP = 3600000, rt = TeaLeaf.Event.tlGetRenderTime(); return (rt > RENDER_TIME_CAP ? RENDER_TIME_CAP : rt); })()"},
			    {"tlreqhttpheadername": "X-TeaLeaf-Page-Objects",       "tlsethttpheader": true,    "tlreqhttpheadervalue": "TeaLeaf.Event.tlGetElementCount(\"object\")"},
			    {"tlreqhttpheadername": "X-TeaLeaf-Page-Img-Fail",      "tlsethttpheader": true,    "tlreqhttpheadervalue": "TeaLeaf.Event.tlBadImageCount()"}
		    ],  
		    tlHTTPRequestHeadersEvalBeforeUnload:[
			    {"tlreqhttpheadername": "X-TeaLeaf-Page-Cui-Events",    "tlsethttpheader": true,    "tlreqhttpheadervalue": "TeaLeaf.Event.tlGetEventCount()"},
			    {"tlreqhttpheadername": "X-TeaLeaf-Page-Cui-Bytes",     "tlsethttpheader": true,    "tlreqhttpheadervalue": "TeaLeaf.Request.GetTotalDataLength()"},
			    {"tlreqhttpheadername": "X-TeaLeaf-Page-Cui-Exceptions","tlsethttpheader": true,    "tlreqhttpheadervalue": "TeaLeaf.Event.tlGetExceptionCount()"},
			    {"tlreqhttpheadername": "X-TeaLeaf-Alert-Count",        "tlsethttpheader": true,    "tlreqhttpheadervalue": "TeaLeaf.Event.tlGetAlertCount()"},
			    {"tlreqhttpheadername": "X-TeaLeaf-Page-Dwell",         "tlsethttpheader": true,    "tlreqhttpheadervalue": "TeaLeaf.Event.tlGetDwellTime()"},
			    {"tlreqhttpheadername": "X-TeaLeaf-Page-Last-Field",    "tlsethttpheader": true,    "tlreqhttpheadervalue": "TeaLeaf.Event.tlGetLastVisitedElementID()"},   
			    {"tlreqhttpheadername": "X-TeaLeaf-Visit-Order",        "tlsethttpheader": true,    "tlreqhttpheadervalue": "TeaLeaf.Event.tlGetVisitOrder()"}   
		    ]   
  };
}
/*
 * Copyright � 1999-2012 TeaLeaf Technology, Inc.
 * All rights reserved.
 *
 * THIS SOFTWARE IS PROVIDED BY TEALEAF ``AS IS''
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING,
 * BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT ARE DISCLAIMED.
 * IN NO EVENT SHALL TEALEAF BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
 * THE POSSIBILITY OF SUCH DAMAGE.
 *
 * @fileoverview
 * This is the configuration for TeaLeafEnv.js
 *
 * @version 2012.06.01.1
 *
 */
if (typeof TeaLeaf !== "undefined" &&
    ((typeof TeaLeaf.replay === "function") ? !TeaLeaf.replay() : !TeaLeaf.replay) &&
    !TeaLeaf.Env)
{
	TeaLeaf.Env = {};

    if(typeof TeaLeaf.Env.Configuration == "undefined"){
        TeaLeaf.Env.Configuration = {
            "tlinit" : false,

            tlPlugins : [
		        {"tlIEplugin": "ShockwaveFlash.ShockwaveFlash.1",         "tlpluginname": "Shockwave Flash",      "tlversion":"1.0",    "tlenable": false},    
		        {"tlIEplugin": "MediaPlayer.MediaPlayer.1",               "tlpluginname": "Windows Media Player", "tlversion":"",    "tlenable": false},
		        {"tlIEplugin": "PDF.PdfCtrl.1",                           "tlpluginname": "Adobe Acrobat",        "tlversion":"",     "tlenable": false},
		        {"tlIEplugin": "QuickTimeCheckObject.QuickTimeCheck.1",   "tlpluginname": "QuickTime",            "tlversion":"",     "tlenable": false}
			]
        };
    }
}
/*
 * Copyright � 1999-2012 TeaLeaf Technology, Inc.
 * All rights reserved.
 *
 * THIS SOFTWARE IS PROVIDED BY TEALEAF ``AS IS''
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING,
 * BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT ARE DISCLAIMED.
 * IN NO EVENT SHALL TEALEAF BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
 * THE POSSIBILITY OF SUCH DAMAGE.
 *
 * @fileoverview
 * This is the configuration file for capturing Client Events that
 * happen on the rendered DOM. It proviedes the capabilty to block fields
 * and turn off an on events on the Window and Document object.
 *
 * @version 2012.06.01.1
 *
 */
if (typeof TeaLeaf !== "undefined" &&
    ((typeof TeaLeaf.replay === "function") ? !TeaLeaf.replay() : !TeaLeaf.replay) &&
    !TeaLeaf.Client)
{
    TeaLeaf.Client = {};

    if(typeof TeaLeaf.Client.Configuration == "undefined"){
	    TeaLeaf.Client.Configuration = {
	        "tlinit" : false,
		    "tlpassword"         : 1,		// 1 no capture, 2 don't send value
		    "tlsendfocus"        : false,
		    "tlsendblur"         : false,
		    "attachToFrames"     : false, // Remove TL from frames to prevent console errors in Chrome
		    "pinchOnly"          : true,
		    "tlactiontype"       : "No Submit",
		    "tlcontrolsattached" : false,
		    "tlscanupdate"       : 0,
		    "tlIEhref"           : false,
		    "tlEnableAttr"       : false,
		    "tlDiscardInvalidXPath"  : false,
		    "tlUniqueIDCheckEnabled" : false,
		    "tlScrollOffsetX" : 0,
		    "tlScrollOffsetY" : 0,
		    "tlScrollX" : 0,
		    "tlScrollY" : 0,
		    "tlScrollXDirection" : 0,
		    "tlScrollYDirection" : 0,
		    "tlScrollDirection" : "",
		    "tlScrollDirectionOrig" : "",
		    "tlAndroidOrientation" : 0,


		    //	tlScheduledScan controls whether or not to periodically scan the DOM
		    //	for changes (and tag the appropriate nodes) at the interval defined by
		    //	tlscanupdate
		    tlScheduledScan : false,

		    //  tlExcludeTags controls whether to explicitly exclude or include the
		    //  tags listed in tlNodeTags when attaching to descendent elements using
		    //  TeaLeaf.Client.tlProcessNode(). See TeaLeaf.Client.tlTagNameAllowed()
		    tlExcludeTags : true,

		    //	If events are being cancelled, the document object will not catch events
		    //	since they are not being bubbled up. In order to combat this, we can attach
		    //	to every relevant item (see tlExcludeTags and tlNodeTags), except this may
		    //	result in duplicate events being captured.
		    tlUniversalAttach : false,

		    //  Option to store the xml of queued events on a page unload in a cookie, so
		    //  that it may be sent up with the next page's events. Since this may interfere
		    //  with the existing cookies on the site, this is disabled by default.
		    tlStoreQueueInCookie : false,

        //	This is where input fields can be globally blocked.  A few examples are shown
        //	below. Add or remove fields as appropriate. The parameters are
        //    name and/or id: JavaScript regular expression to match against the name and/or id of the element
        //    className: JavaScript regular expression to match against the CSS class of the element
        //    attributeName: String indicating name of the custom attribute
        //    attributeValue: JavaScript regular expression to match against the value of the custom attribute
        //    caseinsensitive (optional): the above regex match will be case insensitive.
        //    exclude (optional): If true, no value is sent (equivalent to setting the EmptyMask)
        //    mask: Callback function used to mask the element value. This can be a 3rd party custom function.
        //          The following masking functions are provided by default:
        //            PreserveMask(): Preserves the character type and value length according to the tlPrivacyMask setting below.
        //            BasicMask(): Returns a fixed string "XXXXXX" regardless of the element value.
        //            EmptyMask(): Returns the empty string "" regardless of the element value.
        //
        //  Note: The block rules are applied in the order they appear in the tlFieldBlock array.
        tlFieldBlock:[
        /* Sample block rules:
          // Mask all elements that have "private" or "secure" as one of their CSS class using the PreserveMask() function.
          {"className": "private|secure", "caseinsensitive": true,  "exclude": false, "mask": function () { return TeaLeaf.Client.PreserveMask.apply(this, arguments); }}
          // Mask all field names that have "creditcard" or "password" substrings using the PreserveMask() function.
          {"name": "creditcard|password", "caseinsensitive": true,  "exclude": false, "mask": function () { return TeaLeaf.Client.PreserveMask.apply(this, arguments); }}
          // Mask all field ids that match pvt0, pvt1 ... pvt9 using the EmptyMask() function.
          {"id": "^pvt[0-9]$",           "caseinsensitive": true,  "exclude": false, "mask": function () { return TeaLeaf.Client.EmptyMask.apply(this, arguments); }}
          // Paranoid mode: Mask all name and id values with the BasicMask() function.
          {"id": ".*", "name": ".*",     "caseinsensitive": false, "exclude": true,  "mask": function () { return TeaLeaf.Client.BasicMask.apply(this, arguments); }}
          // Mask all elements that have a private attribute "myID" and value of "secret" using the BasicMask() function.
          {"attributeName": "myID", "attributeValue": "secret", "caseinsensitive": true,  "exclude": false, "mask": function () { return TeaLeaf.Client.PreserveMask.apply(this, arguments); }}
        */
        {"className": "tealeaf-pci", "caseinsensitive": true,  "exclude": false, "mask": function () { return TeaLeaf.Client.PreserveMask.apply(this, arguments); }}
        ],

	      // The mask used by the PreserveMask() masking function.
		    tlPrivacyMask: {
		      "upperChar":   "X",
		      "lowerChar":   "x",
		      "numericChar": "9",
		      "symbolChar":  "#"
		    },
		
            // This is the list of events we catch off of the window object
            tlWindowHandlers:[
                {"domevent": "resize",       "load": false,    "tlhandler": "TeaLeaf.Client.tlQueueResize"},
                {"domevent": "focus",        "load": true,     "tlhandler": "TeaLeaf.Client.tlSetFocusTime"},
                {"domevent": "help",         "load": true,     "tlhandler": "TeaLeaf.Client.tlAddEvent"},
                {"domevent": "scroll",       "load": false,    "tlhandler": "TeaLeaf.Client.tlSendScroll"},
                {"domevent": "beforeprint",  "load": false,    "tlhandler": "TeaLeaf.Client.tlAddEvent"},
                {"domevent": "afterprint",   "load": false,    "tlhandler": "TeaLeaf.Client.tlAddEvent"},
                {"domevent": "beforeunload", "load": true,     "tlhandler": "TeaLeaf.Event.tlBeforeUnload"},
                {"domevent": "unload",       "load": false,    "tlhandler": "TeaLeaf.Event.tlUnload"}
            ],

            // This is the list of events we catch off of the document object
            tlDocumentHandlers:[
                {"domevent": "click",        "load": true,     "tlhandler": "TeaLeaf.Client.tlAddEvent"},
                {"domevent": "dblclick",     "load": true,     "tlhandler": "TeaLeaf.Client.tlAddEvent"},
                {"domevent": "keyup",        "load": true,     "tlhandler": "TeaLeaf.Client.tlQueueKey"},
                {"domevent": "mousedown",    "load": true,    "tlhandler": "TeaLeaf.Client.tlAddEvent"},
                {"domevent": "mouseup",      "load": false,    "tlhandler": "TeaLeaf.Client.tlAddEvent"},
                {"domevent": "mouseover",    "load": false,    "tlhandler": "TeaLeaf.Client.tlAddEvent"},
                {"domevent": "mouseout",     "load": false,    "tlhandler": "TeaLeaf.Client.tlAddEvent"},
                {"domevent": "contextmenu",  "load": false,    "tlhandler": "TeaLeaf.Client.tlAddEvent"},
                // This event is only caught once and turned off.  This is used to
                // detect robots, since a robot will never have mouse movement.
                {"domevent": "mousemove",    "load": false,    "tlhandler": "TeaLeaf.Client.tlUserMovement"}
            ],

		    tlSingleAttach:[
			    {"domelementID": "",    "domevent": "mousedown",    "tlhandler": "TeaLeaf.Client.tlAddEvent"},
			    {"domelementID": "",    "domevent": "mouseup",      "tlhandler": "TeaLeaf.Client.tlAddEvent"},
			    {"domelementID": "",    "domevent": "mouseover",    "tlhandler": "TeaLeaf.Client.tlAddEvent"},
			    {"domelementID": "",    "domevent": "mouseout",     "tlhandler": "TeaLeaf.Client.tlAddEvent"}
		    ],

            tlAttributeCapture:[
                {"tltagname":"a", "tlattributename":"href", "tlevent":"click"},
                {"tltagname":"button", "tlattributename":"value", "tlevent":"click"}
            ],
            

            tlIDBlackList:[
                /* Insert blacklist strings (JavaScript regular expressions) as a comma
                 * separated list here. Leave this empty for default behavior.
                 *
                 * WARNING: Use the blacklist with caution as any id that is matched by
                 * the blacklist will be ignored!
                 * Example:
                "random",
                "jQuery",
                "^gwt",
                "^GWT"
                */
            ],

            tlIDWhiteList:[
                /* Insert whitelist strings (JavaScript regular expressions) as a comma
                 * separated list here. Leave this empty for default behavior.
                 *
                 * WARNING: Use the whitelist with caution as any id that is NOT matched by
                 * the whitelist will be ignored!
                 * Example:
                "static$",
                "^unique"
                */
            ],

		    /*  tlNodeTags by default includes a list of tag names that are "unimportant"
		     *  or not rendered. The associated true/false value is used in conjunction with
		     *  tlExcludeTags - e.g. if tlExcludeTags is true and a node tag is true, it will
		     *  be excluded; if tlExcludeTags is true and a node tag is false, the tag will be
		     *  included. Similarly if tlExcludeTags is false (meaning to explicitly include the
		     *  listed node tags, those with "true" with be excluded.
		     */
		    tlNodeTags : {
		        "APPLET"    : true,
		        "ATTRIBUTE" : true,
			"B"	    : true,
		        "BASE"      : true,
			"BODY"	    : true,
		        "BR"        : true,
		        "CENTER"    : true,
		        "COL"       : true,
		        "COLGROUP"  : true,
		        "COMMENT"   : true,
			"DIV"	    : true,
		        "DEFAULT"   : true,
		        "DEL"       : true,
		        "EVENT"     : true,
		        "FONT"      : true,
			"FORM"	    : true,
			"HEAD"	    : true,
		        "HISTORY"   : true,
		        "HR"        : true,
		        "HTML"      : true,
		        "I"         : true,
		        "INS"       : true,
		        "LINK"      : true,
		        "MAP"       : true,
		        "META"      : true,
		        "NAMESPACE" : true,
		        "NAVIGGATOR" : true,
		        "NOBR"      : true,
		        "OPTION"    : true,
		        "P"         : true,
		        "PARAM"     : true,
		        "S"         : true,
		        "SCRIPT"    : true,
		        "SMALL"     : true,
		        "STRIKE"    : true,
		        "STRONG"    : true,
		        "STYLE"     : true,
		        "SUB"       : true,
		        "SUP"       : true,
		        "TH"        : true,
		        "TITLE"     : true,
		        "THEAD"     : true,
		        "TFOOT"     : true,
		        "TR"        : true,
		        "U"         : true
		    },

		    /*  tlSpecialChildNodeTags represents tags with a special
		     *  situation where the event that fires is attached to a
		     *  non-visual item that is inside the actual UI element.
                 *  Example would be a menu with a <nobr> tag inside to
                 *  keep the visual text of the menu on one line. The <nobr>
                 *  fires the event when we really want the parent menu.
		     */

		    tlSpecialChildNodeTags : {
		        "NOBR" : true,
		        "P"    : true
		    }
	    };
	    	
	    TeaLeaf.Client.Configuration.tlIdCounter = [];
    }
}
/*
 * Copyright � 1999-2012 TeaLeaf Technology, Inc.
 * All rights reserved.
 *
 * THIS SOFTWARE IS PROVIDED BY TEALEAF ``AS IS''
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING,
 * BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT ARE DISCLAIMED.
 * IN NO EVENT SHALL TEALEAF BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
 * THE POSSIBILITY OF SUCH DAMAGE.
 *
 * @fileoverview
 * This is the main UI Client Event Capture JavaScript file that is
 * used by other JavaScript to register their onload routines.
 *
 * @requires
 * TeaLeafCfg.js
 *
 * @version 2012.06.01.1
 *
 */

if (typeof TeaLeaf !== "undefined" &&
    ((typeof TeaLeaf.replay === "function") ? !TeaLeaf.replay() : !TeaLeaf.replay) &&
    TeaLeaf.Configuration &&
    !TeaLeaf.setupComplete)
{
  TeaLeaf.setupComplete = true;
  if (!TeaLeaf.tlBrowser) {
    // tlBrowser contains the detected browser. This is determined after the
    // page loads. See PageSetup() for implementation details.
    TeaLeaf.tlBrowser = { "UNKNOWN": true };
  }
  if (!TeaLeaf.$C) {
    TeaLeaf.$C = function(attr) {
      return attr;
    };
  }

  if (!Array.prototype.push) {
    Array.prototype.stackEnd = 0;
    /**
     * Add push if the browser does not supply
     * them with the Array object (IE6 and earlier)
     * @addon
     */
    Array.prototype.push = function(obj) {
      this[this.stackEnd] = obj;
      this.stackEnd++;
    };
  }
  if (!Array.prototype.pop) {
    /**
     * Add pop if the browser does not supply
     * them with the Array object (IE6 and earlier)
     * @addon
     */
    Array.prototype.pop = function() {
      this.stackEnd--;
      return this[this.stackEnd];
    };
  }

  /* Whitespace trimming functions
   *
   */
  TeaLeaf.trim = function (str) {
    if (!str || !str.toString) {
      return "";
    }
    return str.toString().replace(/^\s+|\s+$/g, "");
  };

  TeaLeaf.ltrim = function (str) {
    if (!str || !str.toString) {
      return "";
    }
    return str.toString().replace(/^\s+/, "");
  };

  TeaLeaf.rtrim = function (str) {
    if (!str || !str.toString) {
      return "";
    }
    return str.toString().replace(/\s+$/, "");
  };

  /* Performs a deep copy of parent objects own members to the child object.
   *
   * @method extend
   * @param {object} parent Object whose members will be copied into the child object.
   * @param {object} child Optional child object which needs to be augmented with
   * parent's members. If this is not passed, a new object will be created.
   * @return {object} Returns the extended child object (or a new object).
   */
  TeaLeaf.extend = function (parent, child) {
    var i;

    if (!child || typeof child !== "object") {
      child = {};
    }
    if (!parent || typeof parent !== "object") {
      return child;
    }
    // Copy all of parent object's own properties
    for (i in parent) {
      if (parent.hasOwnProperty(i)) {
        if (typeof parent[i] !== "object" || parent[i] === null) {
          // Direct/shallow copy of non-objects and null
          child[i] = parent[i];
        }
        else {
          // Deep copy
          // First determine if this member is an array or object
          child[i] = (Object.prototype.toString.call(parent[i]) === "[object Array]") ? [] : {};
          TeaLeaf.extend(parent[i], child[i]);
        }
      }
    }
    return child;
  };

  /* Serializes the event queue into an XML string.
   * XXX - Expose serializeJSONtoXML as a generic helper function?
   *
   * @method serializeEventsToXML
   * @param {object} eventQ A TeaLeaf.Queue() object.
   * @return {string} Serialized XML output.
   */
  TeaLeaf.serializeEventsToXML = (function () {
    var count = 1,
        serializeJSONtoXML = function (objTag, jsonObj) {
          var i,
              childObjects = [],
              childObjectsCount = 0,
              prop,
              serializedArr = [],
              UNDEFINED;

          if (!objTag || typeof jsonObj !== "object") {
            return "";
          }
          // Normalize tag name to valid XML
          objTag = TeaLeaf.Event.tlFormatXMLName(objTag);

          // Start tag
          serializedArr.push("<" + objTag);

          // Parse any properties and child objects
          for (prop in jsonObj) {
            if (!jsonObj.hasOwnProperty(prop) ||
                jsonObj[prop] === UNDEFINED ||
                jsonObj[prop] === "" ||
                jsonObj[prop] === null)
            {
              continue;
            }

            if (typeof jsonObj[prop] === "object") {
              // Serialize array or object types
              childObjects.push(serializeJSONtoXML(prop, jsonObj[prop]));
            }
            else {
              // Serialize primitive types: integer, strings, boolean etc.
              serializedArr.push(TeaLeaf.Event.tlFormatXMLName(prop) + '="' + TeaLeaf.Event.tlFormatXMLValue(jsonObj[prop].toString()) + '"');
            }
          }
          // Add the child objects (if any)
          childObjectsCount = childObjects.length;
          if (childObjectsCount) {
            // Close the opening tag
            serializedArr.push(">");
            // Add the child tags
            for (i = 0; i < childObjectsCount; i++) {
              serializedArr.push(childObjects[i]);
            }
            // End the parent tag
            serializedArr.push("</" + objTag + ">");
          }
          else {
            // End the parent tag
            serializedArr.push("/>");
          }

          return serializedArr.join(" ");
        };

    return function (eventQ) {
      var eventObj,
          pageId = TeaLeaf.Event.tlGetPageId(),
          serializedArr = [];

      serializedArr.push('<ClientEventSet PostTimeStamp="' + (new Date()).getTime() + '">');
      while (!eventQ.isEmpty()) {
        eventObj = eventQ.dequeue();
        if (typeof eventObj !== "object") {
          continue;
        }
        eventObj.count = count++;
        eventObj.PageID = pageId;
        serializedArr.push(serializeJSONtoXML("ClientEvent", eventObj));
      }
      serializedArr.push("</ClientEventSet>");
      return serializedArr.join("\n");
    };
  }());

  /* XHR Factory (Singleton)
   * Provides the interface for creating and requesting XMLHttpRequests
   *
   * createXHRObject()
   * Creates and returns a new XMLHttpRequest object.
   *
   * xhrRequest(reqMethod, reqUrl, reqHeaders, reqData, reqAsync, callback, xhr)
   * Makes an XMLHttpRequest and also returns the XMLHttpRequest object.
   * @param reqMethod
   *        "GET" or "POST"   
   * @param reqUrl
   *        The request URL.
   * @param reqHeaders
   *        Optional array of HTTP header objects in the form of {name, value} pairs.
   * @param reqData
   *        Optional request data.
   * @param reqAsync
   *        Optional true or false. Default 'false'
   * @param callback
   *        Optional callback object {loaded, success, failure}
   * @param xhr
   *        Optional XHR object to use. If not provided, a new XHR object is created.
   */
  TeaLeaf.XHRFactory = (function () {
    var isHttpSuccess,
        MAX_XHR_WAIT_TIME;

    // Private properties.
    /* Timeout for XHR requests (milliseconds)
     */
    MAX_XHR_WAIT_TIME = 30000;

    // Private methods.
    isHttpSuccess = function(statusCode) {
      if ((statusCode >= 200 && statusCode < 300) ||
          statusCode === 304)
      {
        return true;
      }
      return false;
    };
  
    // The public interface object.
    return {
      "createXHRObject": function() {
        var i,
            methods,
            xhr;

        methods = [
          // All modern browsers
          function () { return new XMLHttpRequest(); },
          // IE 6 (on some platforms)
          function () { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); },
          // IE 5.5, IE 6 (on some platforms)
          function () { return new ActiveXObject("Microsoft.XMLHTTP"); }
        ];

        for (i = 0; i < methods.length; i++) {
          try {
            // Try each of the functions
            xhr = methods[i]();
          }
          catch (e) {
            // Did not work
            continue;
          }

          if (xhr) {
            // Success! Memoize for the future
            this.createXHRObject = methods[i];
            return xhr;
          }
        }
        // None of the methods works!
        return null;
      },

      "xhrRequest": function(reqMethod, reqUrl, reqHeaders, reqData, reqAsync, callback, xhr) {
        var i,
            timeoutID;

        if (!reqMethod || !reqUrl) {
          return null;
        }
        reqMethod = reqMethod.toUpperCase();

        if (!xhr) {
          xhr = this.createXHRObject();
        }
        if (!xhr) {
          return null;
        }
        // Setup the callbacks but only if this is going to be an asynchronous request
        if (reqAsync) {
          xhr.onreadystatechange = function() {
            var status,
                statusText;

            try {
              switch (xhr.readyState) {
                case 0:  // UNSENT
                  break;
                case 1:  // OPENED
                  break;
                case 2:  // HEADERS_RECEIVED
                  if (callback && callback.loaded) {
                    /* Per W3C, status and statusText should exist as this state is triggered
                     * after HTTP response headers have been received. However, we ignore this
                     * callback as all browsers do not seem to implement it correctly.
                     */
                    try {
                      status = xhr.status;
                      statusText = xhr.statusText;
                    }
                    catch (e) {
                      // Set default values
                      if (!status) {
                        status = 0;
                      }
                      if (!statusText) {
                        statusText = "None";
                      }
                    }
                    finally {
                      callback.loaded(status, statusText);
                    }
                  }
                  break;
                case 3:  // LOADING
                  break;
                case 4:  // DONE
                  // Remove the circular reference to allow proper GC in IE 6 and 7
                  TeaLeaf.XHRFactory.deleteXHRObj(xhr);
                  if (isHttpSuccess(xhr.status)) {
                    if (callback && callback.success) {
                      callback.success(xhr.responseText, xhr.responseXML);
                    }
                  }
                  else {
                    if (callback && callback.failure) {
                      callback.failure(xhr.status, xhr.statusText);
                    }
                  }
                  break;
                default:  // UNKNOWN
                  break;
              }
            } catch (e2) {
              // Ignore unhandled exceptions in callback routines.
            }
          };
        }

        xhr.open(reqMethod, reqUrl, reqAsync);
        if (reqHeaders) {
          for (i = 0; i < reqHeaders.length; i++) {
            xhr.setRequestHeader(reqHeaders[i].name, reqHeaders[i].value);
          }
        }
        // Send the request along with POST data (if any)
        if (reqMethod !== "POST" || !reqData) {
          reqData = null;
        }

        if (reqAsync) {
          try {
            // Finally, schedule the cleanup before sending the request.
            timeoutID = setTimeout(function () { 
                                     TeaLeaf.XHRFactory.deleteXHRObj(xhr);
                                   }, MAX_XHR_WAIT_TIME);
            xhr.timeoutID = timeoutID;
          } catch (e) {
            // Expected if using an ActiveX object.
          }
        }
        xhr.send(reqData);

        return xhr;
      },

      "deleteXHRObj": function(xhr) {
        // Reset the onreadystatechange callback to enable proper GC in IE 6 and 7
        xhr.onreadystatechange = function () {};

        if (xhr && xhr.readyState !== 4) {
          if (xhr.abort) {
            xhr.abort();
          }
        }
        // Cancel any pending timeout.
        if (xhr.timeoutID) {
          clearTimeout(xhr.timeoutID);
          xhr.timeoutID = null;
        }
      }
    };
  }());

  /* A simple JavaScript Array based Queue
   *
   * @class Queue
   * @namespace TeaLeaf
   * @constructor
   */
  TeaLeaf.Queue = function () {
    // IF the constructor was called without the "new" operator
    // i.e. called as a regular function, then "this" would point to
    // the global object and not be an instance of this object.
    if (!(this instanceof TeaLeaf.Queue)) {
      return new TeaLeaf.Queue();
    }
    /* Array storage for the queue.
     * @property _q
     * @type Array
     * @private
     */
    this._q = [];
    // TODO - make _q a true private

    /* Size of the queue
     * @property size
     * @type integer
     */
    this.size = 0;
  };

  TeaLeaf.Queue.prototype = {
    /* Adds the given parameter to the end of queue.
     *
     * @method enqueue
     * @param {object} obj The object to be queued.
     * @return {integer} The size of the queue after adding the object.
     */
    enqueue: function (obj) {
      if (typeof obj === "undefined") {
        return this.size;
      }
      this.size = this._q.push(obj);
      return this.size;
    },

    /* Removes and returns the first object in the queue.
     *
     * @method dequeue
     * @return {object} The first object in the queue. If the queue is empty the behavior is undefined.
     */
    dequeue: function () {
      var obj = this._q.shift();
      this.size = this._q.length;
      return obj;
    },

    /* Indicates if the queue is empty or not.
     *
     * @method isEmpty
     * @return {boolean} True if the queue is empty, otherwise false.
     */
    isEmpty: function () {
      return !this.size;
    }
  };

  /* Event queue that buffers the events. 
   *
   * @property eventQ
   * @type TeaLeaf.Queue
   * @private
   */
  TeaLeaf.eventQ = new TeaLeaf.Queue();

  /* Request API
   *
   */
  TeaLeaf.Request = function () {
    var data,
        headers,
        method,
        url;

    // Private properties
    data = headers = url = null;
    method = "POST";

    // Privileged methods
    this.getUrl = function () {
      // Get the appropriate URL
      var TCfg,
          tmpPath,
          tmpUrl,
          windowLocation,
          windowProtocol;

      if (url) {
        return url;
      }
      TCfg = TeaLeaf.Configuration;
      windowLocation = window.location;
      windowProtocol = windowLocation.protocol;
      tmpUrl = windowProtocol + "//" + windowLocation.host;
      if (windowProtocol === "http:") {
        tmpPath = TCfg.tlurl;
      }
      else {
        tmpPath = TCfg.tlsecureurl;
      }
      // Is this a site-root relative vs. page relative path
      if (tmpPath.substr(0, 1) === "/") {
        // site-root relative
        tmpUrl += tmpPath;
      }
      else {
        // page relative
        tmpUrl += windowLocation.pathname.substr(0, windowLocation.pathname.lastIndexOf("/")+1) + tmpPath;
      }

      return tmpUrl;
    };

    this.setUrl = function (newUrl) {
      url = newUrl;
    };

    this.getMethod = function () {
      return method;
    };

    this.setMethod = function (newMethod) {
      method = newMethod;
    };

    this.getData = function () {
      return data;
    };

    this.setData = function (newData) {
      var length;

      data = newData;
      if (data) {
        length = TeaLeaf.Request.totalDataLength || 0;
        length += data.length;
        TeaLeaf.Request.totalDataLength = length;
      }
    };

    this.getHeaders = function () {
      return headers;
    };

    this.setHeaders = function(newHeaders) {
      headers = newHeaders;  
    };

    this.clear = function () {
      data = headers = url = null;
    };
  };

  TeaLeaf.Request.prototype = {
    send: function(callback) {
      var iframeNode,
          iframeWindow,
          thatRequest,
          thatTealeaf,
          TCfg,
          xhr;

      TCfg = TeaLeaf.Configuration;

      // Check configuration
      if (!TCfg.xd_iframeID) {
        // Use direct XHR
        xhr = TeaLeaf.XHRFactory.xhrRequest(this.getMethod(), this.getUrl(), this.getHeaders(), this.getData(), TCfg.xhrAsync, callback);
        if (!xhr) {
          if (callback && callback.failure) {
            callback.failure(0, "XHR request failed!");
          }
          return;
        }
      }
      else {
        // Use TeaLeaf.Request API of the target iframe
        try {
          iframeNode = document.getElementById(TCfg.xd_iframeID);
          if (!iframeNode || !iframeNode.contentWindow) {
            if (callback && callback.failure) {
              callback.failure(0, "Could not retrive cross-domain iframe target!");
            }
            return;
          }

          iframeWindow = iframeNode.contentWindow;
          if (iframeWindow.postMessage && window.JSON && 0) {
            // Do nothing.
            // TODO: Use postMessage API (JSON stringify)
          }
          else {
            thatTealeaf = iframeWindow.TeaLeaf;
            if (thatTealeaf && thatTealeaf.Request) {
              thatRequest = new thatTealeaf.Request();
              thatRequest.clear();
              this.setUrl(thatRequest.getUrl());
              thatRequest.setHeaders(this.getHeaders());
              thatRequest.setData(this.getData());
              thatRequest.send(callback);
            }
          }
        }
        catch (e) {
          if (callback && callback.failure) {
            callback.failure(0, (e.name ? (e.name + ": " + e.message) : e.toString()));
          }
          return;
        }
      }
    }
  };

  TeaLeaf.Request.GetTotalDataLength = function() {
    var length;

    length = TeaLeaf.Request.totalDataLength || 0;
    return length;
  };

  /* This method makes an XHR POST request to the preconfigured URL
   * with the specified data.
   *
   * @method sendData
   * @param {string} data The serialized data to be included in the POST
   * @param {string} contentType The content type that the data should be advertised as (default is text/plain)
   * @return {integer} Status code reflecting success (0) or failure (non-zero)
   */
  TeaLeaf.sendData = function (data, contentType) {
    var TeaLeaf = window.TeaLeaf,
        callback,
        headers,
        req,
        xTealeafValue;

    if (!data) {
      // Nothing to send.
      return -1;
    }
    contentType = contentType || "text/plain";
    req = new TeaLeaf.Request();
    if (!req) {
      // Error: Cannot make request.
      return -1;
    }
    req.clear();
    req.setData(data);

    // Get and set the headers
    xTealeafValue = "ClientEvent";
    headers = [ {"name": "X-TeaLeaf", "value": xTealeafValue},
                {"name": "Content-Type", "value": contentType}
              ];
    headers = headers.concat(TeaLeaf.Event.tlGetHTTPHeaders(TeaLeaf.Event.Configuration.tlHTTPRequestHeadersSet));

    if (!TeaLeaf.initHeadersSent) {
      headers = headers.concat(TeaLeaf.Event.tlGetHTTPHeaders(TeaLeaf.Event.Configuration.tlHTTPRequestHeadersEvalInit));
      TeaLeaf.initHeadersSent = true;
    }
    if (TeaLeaf.Event.SendUnloadHeaders && !TeaLeaf.Event.UnloadHeadersSent) {
      headers = headers.concat(TeaLeaf.Event.tlGetHTTPHeaders(TeaLeaf.Event.Configuration.tlHTTPRequestHeadersEvalBeforeUnload));
      TeaLeaf.Event.UnloadHeadersSent = true;
    }
    req.setHeaders(headers);

    callback = {
      "loaded": function(statusCode, statusText) {
          /* Clear the queued xml stored in the cookie.
           * Done on readyState == 2, which means data has been sent
           * and is waiting on a server response.
           */
          if (TeaLeaf.tlGetCookieValue("tlQueuedXML")) {
            TeaLeaf.tlEraseCookie("tlQueuedXML");
          }
      },

      "failure": function(statusCode, statusText) {
          // Only report client side failures, server failures would be presumably captured by the PCA
          if (statusCode < 200 && !TeaLeaf.Event.Configuration.tlignoresendfailure) {
            TeaLeaf.Event.Configuration.tlignoresendfailure = true;
            TeaLeaf.Event.tlErrorHandler("XHR failure - Status " + statusCode + ": " + statusText, req.getUrl());
          }
      },

      "success": function(respText, respXML) {
          // Do nothing!
          TeaLeaf.Event.Configuration.tlignoresendfailure = false;
      }
    };
    // Send the request
    TeaLeaf.Event.Configuration.tlignoresendfailure = true;
    req.send(callback);

    return 0;
  };

  /**
   * Random string generator
   */
  TeaLeaf.makeRandomString = function(length, inputSet) {
    var i, j,
        rv;

    if (!length || length <= 0) {
      return;
    }

    if (!inputSet) {
      // The default input set from which random characters will be chosen to create the string.
      inputSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890~!@$-";
    }
    rv = "";
    for (i = 0; i < length; i++) {
      j = Math.floor(Math.random() * inputSet.length);
      rv += inputSet.charAt(j);
    }
    return rv;
  };

  TeaLeaf.getNodeType = function(node) {
    var nodeName,
        nodeType;

    if (!node) {
      return "";
    }

    nodeName = node.nodeName ? node.nodeName.toLowerCase() : "";
    nodeType = "";
    if (nodeName === "input" || nodeName === "object" || nodeName === "script") {
      nodeType = node.type ? node.type.toLowerCase() : "";
    }

    return nodeType;
  };

  /**
   * Array to store all the object that need to be loaded after the page is rendered.
   * NOTE: This will not be used if the UI Client Event Capture is used as an SDK.
   */
  TeaLeaf.tLoadObjs = [];
  /**
   * This function is used for the other javascript files to register their
   * onload functions to be called
   * @param obj object that is registered from other JavaScript to be loaded
   * @param functionName object function that is registered from other JavaScript to be loaded
   * @requires
   * TeaLeafCfg.js
   * @addon
   */
  TeaLeaf.addOnLoad = function(obj, functionName) {
    if (arguments.length === 1) {
      TeaLeaf.tLoadObjs.push(obj);
    }
    else if (arguments.length > 1) {
      TeaLeaf.tLoadObjs.push(obj[functionName]);
    }
  };

  /**
   * tlSetCookie: Sets the cookie value. Automatically creates the cookie if
   *              it doesn't already exist.
   * @param name
   *        cookie name.
   * @param value
   *        cookie value.
   * @param expires (optional) Date object
   *        cookie expiration. Default is null, which indicates a
   *        session cookie.
   * @param path (optional)
   *        cookie path. Default is root "/"
   * @param domain (optional)
   *        cookie domain, pages on a domain made up of more than one
   *        server can share cookie info. Default is same domain as that
   *        of the current page.
   * @param secure (optional) boolean
   *        Set to true if the stored info. should only be accessible from
   *        a secure environment (e.g. https) Default is false.
   */
  TeaLeaf.tlSetCookie = function(name, value, expires, path, domain, secure) {
    if (!name) {
      return;
    }
    document.cookie = name + "=" + value +
                      (expires ? (";expires=" + expires.toUTCString()) : "") +
                      ";path=" + (path || "/") +
                      (domain ? (";domain=" + domain) : "") +
                      (secure ? ";secure" : "");
  };

  /**
   * tlGetCookieValue: Returns the cookie value if it exists.
   * @param name
   *        cookie name.
   * @addon
   */
  TeaLeaf.tlGetCookieValue = function(name) {
    var i,
        c,
        cookies,
        value,
        nameEQ;

    nameEQ = name + "=";
    value = null;
    cookies = document.cookie.split(';');
    for (i = 0; i < cookies.length; i++) {
      c = TeaLeaf.ltrim(cookies[i]);

      // Compare the name
      if (c.indexOf(nameEQ) === 0) {
        value = c.substring(nameEQ.length, c.length);
        break;
      }
    }
	  return value;
  };

  /**
   * tlEraseCookie: Deletes the cookie if it exists.
   * @param name
   *        cookie name.
   * @addon
   */
  TeaLeaf.tlEraseCookie = function (name) {
    var expires;
    expires = new Date(1970, 1, 1);
	  TeaLeaf.tlSetCookie(name, "", expires);
  };

  /**
   * Browser sniffing functions.
   * CAUTION: Do not use these unless absolutely justified! For
   *          most cases where you would think about using these,
   *          object and functionality detection can be employed.
   */ 
  TeaLeaf.tlBrowserIsIE = function () {
    var TB;
    TB = TeaLeaf.tlBrowser;
    if (TB) {
      return !!TB.MSIE;
    }
    return false;
  };

  TeaLeaf.tlBrowserIsMozilla = function () {
    var TB;
    TB = TeaLeaf.tlBrowser;
    if (TB) {
      return !!TB.MOZILLA;
    }
    return false;
  };

  TeaLeaf.tlBrowserIsWebKit = function () {
    var TB;
    TB = TeaLeaf.tlBrowser;
    if (TB) {
      return !!TB.WEBKIT;
    }
    return false;
  };

  TeaLeaf.tlBrowserIsAndroid = function () {
    var TB;
    TB = TeaLeaf.tlBrowser;
    if (TB) {
      return !!TB.ANDROID;
    }
    return false;
  };

  TeaLeaf.tlBrowserIsOpera = function () {
    var TB;
    TB = TeaLeaf.tlBrowser;
    if (TB) {
      return !!TB.OPERA;
    }
    return false;
  };

  TeaLeaf.tlBrowserIsUnknown = function () {
    var TB;
    TB = TeaLeaf.tlBrowser;
    if (TB) {
      return !!TB.UNKNOWN;
    }
    return false;
  };

  /**
   * Keepalive
   * This functionality is used to determine how long the UI SDK
   * remains active on the page. If the keepalive callback function
   * does not register any activity the inactivity timer will trigger.
   * 
   * When the inactivity timer triggers, the action taken is dependent
   * on the configuration specified.
   *
   * If tlDisableIfInactive is set to true, the UI SDK will detach all
   * it's event listeners (for a hard disable) and not report on any
   * subsequent user activity.
   *
   * If tlDisableIfInactive is set to false, the UI SDK will NOT detach
   * it's event listeners (for a soft disable) but will continue to monitor
   * for user activity and report on it. If there is no user activity,
   * the UI SDK will not report on the beforeunload/unload event.
   */
  (function () {
    // Private members
    var T = TeaLeaf,
        TC = T.Client,
        TCfg = T.Configuration,
        TE = T.Event,
        acTimerID = null,
        activityFlag = true,
        disabled = false,
        eventLimit = TE ? TE.Configuration.tlmaxeventcount : 300,
        eventLimitReached = false;

    // Public members
    T.tlDisable = function () {
      // Soft disable.
      activityFlag = false;

      // Hard disable. tlDisableIfInactive == true
      if ((eventLimitReached || TCfg.tlDisableIfInactive) && !disabled) {
        try {
          TE.tlFlushQueue(true);
          TC.tlDetachFromAllControls();
          // Detach the beforeunload/unload handlers
          TeaLeaf.Event.tlRemoveHandler(window, "beforeunload", TeaLeaf.Event.tlBeforeUnload, false);
          TeaLeaf.Event.tlRemoveHandler(window, "unload", TeaLeaf.Event.tlUnload, false);
        }
        catch(e) {
          // Do nothing.
        }
        disabled = true;
      }
    };

    T.activitySinceDisabled = function () {
      return activityFlag;
    };

    /**
     * Call this function to indicate any user activity. Calling this
     * function resets the inactivity timer and activity flag.
     *
     * Currently called from whenever events representing user activity are queued up.
     */
    T.tlKeepAlive = function () {
      if (acTimerID) {
        window.clearTimeout(acTimerID);
        acTimerID = null;
      }
      if (eventLimitReached || T.Event.getEventCount() >= eventLimit) {
        eventLimitReached = true;
        T.tlDisable();
        // Rewrite tlKeepAlive to empty function
        T.tlKeepAlive = function () {};
        return;
      }
      // Setup the inactivity timer
      if (!disabled && TCfg.tlActivityTimeout) {
        // Reset the inactivity timer
        acTimerID = window.setTimeout(function () {
                                        T.tlDisable();
                                      }, (TCfg.tlActivityTimeout * 60000));
      }
      if (!activityFlag) {
        // Reset
        activityFlag = true;
      }
    };
  }());
  
  /**
   * This function is used to load UI Client Event Capture or the
   * UI Client Event Capture SDK.
   * @requires
   * TeaLeafCfg.js
   * @addon
   */
  TeaLeaf.PageSetup = function (e) {
    var i,
        cValue,
        expires,
        iframeNode,
        iframeSrc,
        now,
        T,
        TCfg,
        TCfgGUIDCookie,
        ua;

    // Note: FF versions prior to 3.6 do not support document.readyState
    if (document.readyState && document.readyState !== "complete") {
      // Page has not been loaded yet!
      return;
    }

    T = TeaLeaf;
    TCfg = T.Configuration;
    TCfgGUIDCookie = TCfg.tlGUIDCookie;

    if (T.PageSetup.Complete) {
      // Being called more than one time.
      return;
    }
    T.PageSetup.Complete = true;
    T.Event.UnloadHeadersSent = false;
    T.unloadSent = false;

    // Cleanup callback (if one exists)
    if (T.PageSetup.Cleanup) {
      T.PageSetup.Cleanup();
    }

    // Record the initial orientation
    T.initialOrientation = window.orientation || 0;

    // Browser detection based on the User Agent
    T.tlBrowser.UNKNOWN = false;
    ua = navigator.userAgent.toLowerCase();
    if (/opera|presto/i.test(ua)) {
      T.tlBrowser.OPERA = true;
    }
    else if (/android/i.test(ua)) {
      T.tlBrowser.ANDROID = true;
    }
    else if (/(apple)?webkit|safari|chrome/i.test(ua)) {
      T.tlBrowser.WEBKIT = true;
    }
    else if (/msie|trident/i.test(ua)) {
      T.tlBrowser.MSIE = true;
    }
    else if (/mozilla|gecko|firefox/i.test(ua)) {
      T.tlBrowser.MOZILLA = true;
    }
    else {
      T.tlBrowser.UNKNOWN = true;
    }

    // Cross domain initialization and iframe creation (optional)
    if (TCfg.xd_CommonDomain) {
      try {
        document.domain = TCfg.xd_CommonDomain;
      }
      catch (e) {
      }
    }
    if (TCfg.xd_iframeID) {
      try {
        // check if the cross-domain iframe exists
        iframeNode = document.getElementById(TCfg.xd_iframeID);
        if (!iframeNode) {
          // create the iframe
          iframeSrc = ((window.location.protocol === "http:") ? TCfg.xd_iframeSrcURL : TCfg.xd_iframeSrcURLSecure);
          if (iframeSrc) {
            iframeNode = document.createElement("IFRAME");
            if (iframeNode) {
              iframeNode.id = TCfg.xd_iframeID;
              iframeNode.src = iframeSrc;
              iframeNode.style.display = "none";
              iframeNode.style.visibility = "hidden";
              document.body.appendChild(iframeNode);
            }
          }
        }
      }
      catch (e2) {
      }
    }

    // The SDK GUID
    if (TCfg.tlSetGUID) {
      if (!TCfgGUIDCookie || !TCfgGUIDCookie.name) {
      }
      else {
        // Check for optional members and assign defaults wherever applicable
        if (!TCfgGUIDCookie.valueLength) {
          TCfgGUIDCookie.valueLength = 32;
        }
        if (!TCfgGUIDCookie.valueSet) {
          TCfgGUIDCookie.valueSet = "0123456789ABCDEF";
        }

        cValue = T.tlGetCookieValue(TCfgGUIDCookie.name);
        if (!cValue) {
          now = new Date();
          cValue = T.makeRandomString(TCfgGUIDCookie.valueLength, TCfgGUIDCookie.valueSet);
          expires = TCfgGUIDCookie.expires ? new Date(now.getTime() + TCfgGUIDCookie.expires * 60 * 1000) : null;
          // Create a new cookie
          T.tlSetCookie(TCfgGUIDCookie.name, cValue, expires, TCfgGUIDCookie.path, TCfgGUIDCookie.domain, TCfgGUIDCookie.secure);
        }
      }
    }

    for (i = 0; i < T.tLoadObjs.length; i++) {
      T.tLoadObjs[i]();
    }

    T.EndLoad = new Date();
  };

  if (document.readyState === "complete") {
    // Page is already initialized!
    TeaLeaf.PageSetup();
  }
  else if (document.addEventListener) {
    // Mozilla, Opera and Webkit
    document.addEventListener("DOMContentLoaded", TeaLeaf.PageSetup, false);
    // fallback
    window.addEventListener("load", TeaLeaf.PageSetup, false);
    TeaLeaf.PageSetup.Cleanup = function () {
      var T;

      T = TeaLeaf;
      document.removeEventListener("DOMContentLoaded", T.PageSetup, false);
      window.removeEventListener("load", T.PageSetup, false);
    };
  }
  else if (document.attachEvent) {
    // IE
    document.attachEvent("onreadystatechange", TeaLeaf.PageSetup);
    // fallback
    window.attachEvent("onload", TeaLeaf.PageSetup);
    TeaLeaf.PageSetup.Cleanup = function () {
      var T;
      
      T = TeaLeaf;
      document.detachEvent("onreadystatechange", T.PageSetup);
      window.detachEvent("onload", T.PageSetup);
    };
  }
  else {
    // others
    if (typeof window.onload === "function" ) {
      TeaLeaf.OnLoad = window.onload;
    }
    else {
      TeaLeaf.OnLoad = null;
    }
    window.onload = function() {
      var T;

      T = TeaLeaf;
      T.PageSetup();
      window.onload = T.OnLoad;
      if (T.OnLoad) {
        T.OnLoad();
      }
    };
  }
}
/*
 * Copyright � 1999-2012 TeaLeaf Technology, Inc.
 * All rights reserved.
 *
 * THIS SOFTWARE IS PROVIDED BY TEALEAF ``AS IS''
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING,
 * BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT ARE DISCLAIMED.
 * IN NO EVENT SHALL TEALEAF BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
 * THE POSSIBILITY OF SUCH DAMAGE.
 *
 * @fileoverview
 * Event and communication setup.
 *
 * @requires
 * TeaLeaf.js
 * TeaLeafEventCfg.js
 *
 * @version 2012.06.01.1
 *
 */
if (window.TeaLeaf &&
    ((typeof TeaLeaf.replay === "function") ? !TeaLeaf.replay() : !TeaLeaf.replay) &&
    TeaLeaf.Event &&
    !TeaLeaf.Event.setupComplete)
{
    TeaLeaf.Event.setupComplete = true;
    TeaLeaf.Event.tlQueuedXML = "";
    TeaLeaf.Event.tlWindowObjects = [{"tlWindowName": "", "tlWindowObject":""}];
    TeaLeaf.Event.queuedEventTypes = {};

    (function () {
      var count = 0;
      TeaLeaf.Event.setEventCount = function (c) {
        if (typeof c === "number") {
          count = c;
        }
        return count;
      };
      TeaLeaf.Event.getEventCount = function () {
        return count;
      };
    }());

    /* Factory method to create and initialize a Base event object.
     *
     * @method createBaseEvent
     * @param {string} type The type of event. "PERFORMANCE", "INFO", "GUI" etc.
     * @param {string} subType The sub-type of the event.
     * @return {object} The base event object initialized per the input parameters.
     */
    TeaLeaf.Event.createBaseEvent = function (type, subType) {
      var e;

      // Base Event object
      e = {
        'type': (type ? type.toString() : null),
        'subType': (subType ? subType.toString() : null),
        'timeDuration': 0
      };

      return e;
    };

    /* Factory method to create and initialize an Exception event object.
     *
     * @method createExceptionEvent
     * @param {string}  message Description of error or exception.     
     * @param {string}  url URL related to the error or exception.
     * @param {integer} line Optional line number associated with the error or exception.
     * @return {object} The Exception event object initialized per input parameters.
     */
    TeaLeaf.Event.createExceptionEvent = (function () {
      var exceptionBaseEvent;

      // Parent object - Created once
      exceptionBaseEvent = TeaLeaf.Event.createBaseEvent(TeaLeaf.$C("INFO"), TeaLeaf.$C("EXCEPTION"));

      // Actual implementation of createExceptionEvent()
      return function (message, url, line) {
        var e;

        e = TeaLeaf.extend(
          exceptionBaseEvent,
          // Child object - Exception object specific members
          {
            'message': message,
            'url': url,
            'line': line
          }
        );  // End of TeaLeaf.extend
        e.timeDuration = TeaLeaf.Event.tlDateDiff(new Date());
        TeaLeaf.Event.queuedEventTypes.EXCEPTION = true;
        return e;
      };
    }());

    /* Factory method to create and initialize a Custom event object.
     *
     * @method createCustomEvent
     * @param {string}  subType Custom string which will be used as the sub-type.
     * @param {object}  customObj Custom object.
     * @return {object} The custom event object initialized per customObj parameter.
     */
    TeaLeaf.Event.createCustomEvent = function (subType, customObj) {
      var customEvent;

      customEvent = TeaLeaf.Event.createBaseEvent('UIEventAppInfo', subType);
      customEvent.timeDuration = TeaLeaf.Event.tlDateDiff(new Date());
      TeaLeaf.Event.queuedEventTypes.CUSTOM = true;
      // Copy customObj members to customEvent
      return TeaLeaf.extend(customObj, customEvent);
    };

    /* Factory method to create and initialize a Performance event object.
     *
     * @method createPerformanceEvent
     * @param {string}  subType Performance event sub-type (e.g. INIT, UNLOAD etc.)
     * @param {object}  perfObj Object containing performance event properties.
     * @return {object} The Performance event object initialized per perfObj parameter.
     */
    TeaLeaf.Event.createPerformanceEvent = function (subType, perfObj) {
      var perfEvent;

      perfEvent = TeaLeaf.Event.createBaseEvent('PERFORMANCE', subType);
      perfEvent.timeDuration = TeaLeaf.Event.tlDateDiff(new Date());
      TeaLeaf.Event.queuedEventTypes.PERFORMANCE = true;
      // Copy perfObj members to perfEvent
      return TeaLeaf.extend(perfObj, perfEvent);
    };

    /* Factory method to create and initialize a GUI event object.
     *
     * @method createGuiEvent
     * @param {string}  subType GUI event sub-type (e.g. click, keyup etc.)
     * @param {object}  guiObj Object containing GUI event properties.
     * @return {object} The GUI event object initialized per guiObj parameter.
     */
    TeaLeaf.Event.createGuiEvent = function (subType, guiObj) {
      var TeaLeaf = window.TeaLeaf,
          guiEvent;

      guiEvent = TeaLeaf.Event.createBaseEvent('GUI', subType);
      guiEvent.timeDuration = TeaLeaf.Event.tlDateDiff(new Date());
      TeaLeaf.Event.queuedEventTypes.GUI = true;
      // Copy guiObj members to guiEvent
      return TeaLeaf.extend(guiObj, guiEvent);
    };


    /**
    * Get TeaLeaf UI Client Event XEvent that 
    * is sent in the HTTP headers of the TeaLeaf AJAX POST
    * that delivers the XML with the UI Cient Events to the 
    * capture device. 
    * @addon
    */
    TeaLeaf.Event.tlGetTeaLeafXEvent = function(){
        var teaLeafXEvent = TeaLeaf.$C("ClientEvent");
        return teaLeafXEvent;
    };
    /**
    * Get TeaLeaf UI Client Event type set during
    * TeaLeaf event definition.
    * @addon
    */    
    TeaLeaf.Event.tlEventType = function() {
      var i,
          eventTypes = "",
          queuedEventTypes;

      if (typeof TeaLeaf.Event.queuedEventTypes !== "object") {
        return "";
      }
      queuedEventTypes = TeaLeaf.Event.queuedEventTypes;
      for (i in queuedEventTypes) {
        if (queuedEventTypes.hasOwnProperty(i)) {
          eventTypes += i + "; ";
        }
      }
      TeaLeaf.Event.queuedEventTypes = {};
      return eventTypes;
    };
    /**
    * Get TeaLeaf UI Client Event sub type set during
    * TeaLeaf event definition.
    * @addon
    */        
    TeaLeaf.Event.tlEventSubType = function() {
      var subType;
      subType = TeaLeaf.Event.SetSubType;
      // XXX: Need a better way to accomplish this.
      TeaLeaf.Event.SetSubType = "";
      return subType;
    };
    /**
    * Get the path relative to the host.
    * @addon
    */            
    TeaLeaf.Event.tlGetUrlPath = function(){
        var strpath = window.location.pathname;
        return strpath;
    };
    /**
    * Get TeaLeaf UI Client Event version that 
    * is sent in the HTTP headers of the TeaLeaf AJAX POST
    * that delivers the XML with the UI Cient Events to the 
    * capture device. 
    * @requires 
    * TeaLeafEventCfg.js
    * @addon
    */
    TeaLeaf.Event.tlGetJSVersion = function(){
        return TeaLeaf.Configuration.tlversion;
    };
    /**
    * Get the resolution type (0-4) based on the resolution defined in 
    * the configuration file. 
    * @param width 
    * @param height 
    * @requires 
    * TeaLeafEventCfg.js
    * @addon
    */
    TeaLeaf.Event.tlResolutionType = function(width, height){ 
      var i,
          res = TeaLeaf.Event.Configuration.tlResolution;
        for(i=0; i<res.length; i++)
        {
            if(width <= res[i].width || height <= res[i].height)
            {
                return res[i].type;
            }
        }
        return res[res.length-1].type;        
    };
    /**
    * Get the browser resolution type. 
    * @requires 
    * TeaLeafEventCfg.js
    * @addon
    */
    TeaLeaf.Event.tlResolutionTypeBrowser = function(){
      var elems,
          retType,
          winWidth = 0,
          winHeight = 0;
        if(window.innerWidth){
            winWidth = window.innerWidth;
            winHeight = window.innerHeight;
        }
        else if(document.documentElement && document.documentElement.clientWidth){   
            winWidth = document.documentElement.clientWidth;
            winHeight = document.documentElement.clientHeight;
        }
        else if(document.body && document.body.clientWidth){
            winWidth = document.body.clientWidth;
            winHeight = document.body.clientHeight;
        }
        else{
            elems = document.getElementsByTagName("body"); 
            if(elems.length > 0){
                winWidth = elems[0].clientWidth;
                winHeight = elems[0].clientHeight;
            }
        }                
        retType = TeaLeaf.Event.tlResolutionType(winWidth, winHeight);  
        return retType;
    };
    /**
    * Get the page render time. 
    * @requires
    * TeaLeaf.js
    * TeaLeafCfg.js 
    * TeaLeafEventCfg.js
    * @addon
    */    
    TeaLeaf.Event.tlGetRenderTime = function(){
        return TeaLeaf.Event.PageLoadMilliSecs;
    };
  /**
   * Get element count.
   * @param element DOM element name
   * @addon
   */
  TeaLeaf.Event.tlGetElementCount = function (element) {
    return document.getElementsByName(element).length;
  };
  /**
   * Count the broken images.
   * @addon
   */
  TeaLeaf.Event.tlBadImageCount = function() {
    var	i,
        bad_image_count,
        documentImages,
        img,
        total_images;

    bad_image_count = 0;
    documentImages = document.images;    
    total_images = documentImages.length;

    for (i = 0; i < total_images; i++) {
      img = documentImages[i];

      if ((!img) ||
          (typeof img.complete === "boolean" && !img.complete) ||
          // img.complete is true if the image has been downloaded, decoded and found to be valid.
          (typeof img.naturalWidth !== "undefined" && img.naturalWidth === 0))
          // If the naturalWidth (intrinsic width of the image) exists and is zero, indicates an invalid image
      {
        bad_image_count++;
        continue;
      }
    }
    return bad_image_count;
  };

  /**
   * Send Flash UI event.
   */
  TeaLeaf.Event.tlFlashSend = function (tlType, tlSubType, tlData, tlDelimeter) {
    var TeaLeaf = window.TeaLeaf,
        i, j,
        flashEvent = TeaLeaf.Event.createBaseEvent(tlType, tlSubType),
        flashEventData = tlData.split(tlDelimeter);

    flashEvent.timeDuration = TeaLeaf.Event.tlDateDiff(new Date());
    for (i = 0, j = flashEventData.length - 1; i < j; i += 2) {
      // Create the name-value pairs from the successive array entries
      flashEvent[flashEventData[i]] = flashEventData[i+1];
    }
    TeaLeaf.eventQ.enqueue(flashEvent);
    TeaLeaf.tlKeepAlive();
  };
  /*
   * Display Flash Debug in a popup Window.
   */
  TeaLeaf.Event.tlShowFlashDebug = function (tlWindowName, tlDebugMessage) {
    var i,
        tlNewWindowObject;
    tlDebugMessage+="<BR>";
    for(i=0;i<TeaLeaf.Event.tlWindowObjects.length;i++){
      if(TeaLeaf.Event.tlWindowObjects[i].tlWindowName===tlWindowName){
        if(TeaLeaf.Event.tlWindowObjects[i].tlWindowObject.closed){
          TeaLeaf.Event.tlWindowObjects[i].tlWindowObject=window.open("",tlWindowName,"width=600,height=300,scrollbars=yes,resizable=yes");
        }
        TeaLeaf.Event.tlWindowObjects[i].tlWindowObject.document.writeln(tlDebugMessage.fontsize(2));
        TeaLeaf.Event.tlWindowObjects[i].tlWindowObject.scrollTo(0,50000);
        return;
      }
    }
    tlNewWindowObject=window.open("",tlWindowName,"width=600,height=300,scrollbars=yes,resizable=yes");
    TeaLeaf.Event.tlWindowObjects.push({"tlWindowName":tlWindowName,"tlWindowObject":tlNewWindowObject});
    tlNewWindowObject.document.writeln(tlDebugMessage.fontsize(2));
  };

  /*
   * Set TeaLeaf current event count.
   */
  TeaLeaf.Event.tlSetEventCount = function (tleventcount) {
    TeaLeaf.Event.Configuration.tleventcount += tleventcount;
  };

  /*
   * Get TeaLeaf current event count.
   */
  TeaLeaf.Event.tlGetEventCount = function () {
    return TeaLeaf.Event.Configuration.tleventcount;
  };

  /*
   * Get TeaLeaf current exception event count.
   */
  TeaLeaf.Event.tlGetExceptionCount = function () {
    return (TeaLeaf.Event.Configuration.tlcatcherrors ? TeaLeaf.Event.Configuration.tlexceptioncount : null);
  };

  /*
   * Get user dwell time on a page.
   */
  TeaLeaf.Event.tlGetDwellTime = function () {
    return TeaLeaf.Event.tlDateDiff(TeaLeaf.Event.Configuration.tllastdwelltime);
  };

  /*
   * Get the ID of the last visited DOM element that we have listeners attached.
   */
  TeaLeaf.Event.tlGetLastVisitedElementID = function () {
    return TeaLeaf.Event.Configuration.tlidoflastvisitedcontrol;
  };

  /*
   * Get the date difference between two values.
   * @param v1 first time value
   * @param v2 second time value
   */
  TeaLeaf.Event.tlDateDiff = function (v1, v2) {
    var defaultValue = TeaLeaf.tlStartLoad.getTime();

    v1 = v1 || defaultValue;
    v2 = v2 || defaultValue;

    return Math.abs(v1 - v2);
  };

  /*
   * Get the XForm path string with ids or names in fill out order.
   */
  TeaLeaf.Event.tlGetVisitOrder = function () {
    return TeaLeaf.Event.Configuration.tlvisitorder;
	};

  /**
   * Re-format the XML.
   * @param s string containing XML to be re-formated
   * @addon
   */
  TeaLeaf.Event.tlFormatXMLValue = function(s) {
    if (s && typeof s === "string") {
      if (s.replace) {
        return s.replace(/&/g, "&amp;").replace(/\"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      }
      return s;
    }
    return "";
  };

  /**
   *  Return the HTTP headers.
   * @param tlreq XMLHTTPRequest object
   * @param tlheaderconfig JSON array with the HTTP header field values.
   * @requires
   * TeaLeaf.js
   * TeaLeafCfg.js
   * TeaLeafEventCfg.js
   * @addon
   */
  TeaLeaf.Event.tlGetHTTPHeaders = function(tlheaderconfig) {
    var i,
        headers,
        value;
        
    headers = [];
    for (i=0; i < tlheaderconfig.length; i++) {
      if (tlheaderconfig[i].tlsethttpheader) {
        value = eval(tlheaderconfig[i].tlreqhttpheadervalue);
        if (value) {
          headers.push({"name": tlheaderconfig[i].tlreqhttpheadername, "value": value});
        }
      }
    }
    return headers;
  };

  /*
   * Get TeaLeaf page id.
   */
  TeaLeaf.Event.tlGetPageId = function () {
	    //	Have we already calculated this?
	    if(TeaLeaf.Event.Configuration.tlpageid) {
		    return TeaLeaf.Event.Configuration.tlpageid;
	    }
      // Look for the page id variable that will be
      // set by javascript outside of TeaLeaf.js
      if (window.TeaLeaf_PageID) {
        TeaLeaf.Event.Configuration.tlpageid = TeaLeaf_PageID;
        return TeaLeaf.Event.Configuration.tlpageid;
      }

      // Neither of the above options, go ahead and generate the
      // page id from a time stamp.
      TeaLeaf.Event.Configuration.tlpageid = "ID" + TeaLeaf.tlStartLoad.getHours() + "H" +
              TeaLeaf.tlStartLoad.getMinutes() + "M" +
              TeaLeaf.tlStartLoad.getSeconds() + "S" +
              TeaLeaf.tlStartLoad.getMilliseconds()+ "R"+
              Math.random();
	    return TeaLeaf.Event.Configuration.tlpageid;
    };

    /**
     * Add event handler.
     * @param tlitem element that we attach a listener
     * @param tlevt event that we listen for
     * @param tlhandler event handler
     * @addon
     */
    TeaLeaf.Event.tlAddHandler = function(tlitem, tlevt, tlhandler, tlcapture) {
      try {
        if (!tlitem) {
          return;
        }
        if (tlitem.addEventListener) {
          // DOM Level 2 compliant browsers (FF, Safari, Chrome etc.)
          tlitem.addEventListener(tlevt, tlhandler, tlcapture);
        }
        else if (tlitem.attachEvent) {
          // IE
          tlitem.attachEvent('on'+tlevt, tlhandler);
        }
      }
      catch (e) {
        // Do nothing!
        /*
         * This usually happens when we're trying to attach to
         * frames where there is a domain / protocol / port mismatch.
         * The browser does not allow access in such cases.
         */
      }
    };
    /**
     * Remove event handler.
     * @param tlitem element that we attached a listener
     * @param tlevt event that we listened
     * @param tlhandler event handler
     * @addon
     */
    TeaLeaf.Event.tlRemoveHandler = function(tlitem, tlevt, tlhandler, tlcapture) {
      try {
        if (!tlitem) {
          return;
        }
        if (tlitem.removeEventListener) {
          tlitem.removeEventListener(tlevt, tlhandler, tlcapture);
        }
        else if (tlitem.detachEvent) {
          tlitem.detachEvent('on'+tlevt, tlhandler);
        }
      }
      catch (e) {
        /* Do nothing!
         * This usually happens when we're trying to detach from
         * frames where there is a domain / protocol / port mismatch.
         * The browser does not allow access in such cases.
         */
      }
    };
  /*
   * Flush the event queue.
   */
  TeaLeaf.Event.tlFlushQueue = (function () {
    var contentType,
        flushCount = 1,
        serializeToJSON = (typeof TeaLeaf.Event.Configuration.jsonSerializer === "function") ? true : false;

    contentType = serializeToJSON ? "application/json" : "text/xml";

    return function (force) {
      var TeaLeaf = window.TeaLeaf,
          jsonData = {
            'messageVersion': "1.0.0.0",
            'serialNumber': flushCount,
 
            'sessions': [
              {
                'id': TeaLeaf.Event.tlGetPageId(),
                'startTime': TeaLeaf.tlStartLoad.getTime(),
                'timezoneOffset': TeaLeaf.tlStartLoad.getTimezoneOffset(),
                'messages': [],
                'meta': {
                  'libVersion': TeaLeaf.Event.tlGetJSVersion(),
                  'page': window.location.href,
                  'windowId': TeaLeaf.Env.getWindowId(),
                  'screen': {
                    'width': window.screen.width,
                    'height': window.screen.height,
                    'orientation': TeaLeaf.initialOrientation
                  }
                }
              }
            ]
          },
          qSize = TeaLeaf.eventQ.size,
          serializedData = "";

      if (TeaLeaf.eventQ.isEmpty()) {
        // Nothing to send.
        return;
      }
      force = force || !TeaLeaf.Event.Configuration.tlqueueevents;
      if (!force && qSize < TeaLeaf.Event.Configuration.tlqueuemaxevents) {
        // Do not flush until the configured threshold is reached.
        return;
      }

      if (serializeToJSON) {
        while (!TeaLeaf.eventQ.isEmpty()) {
          jsonData.sessions[0].messages.push(TeaLeaf.eventQ.dequeue());
        }
        // Use the JSON serializer
        serializedData = TeaLeaf.Event.Configuration.jsonSerializer(jsonData);
      }
      else {
        // Default is XML serialization
        serializedData = TeaLeaf.serializeEventsToXML(TeaLeaf.eventQ);
      }
      TeaLeaf.Event.tlSetEventCount(qSize);
      // Invoke the network send
      TeaLeaf.sendData(serializedData, contentType);
      flushCount += 1;
    };
  }());


    /* Returns the number of alert, prompt and confirm
     * dialogs shown to the user.
     *
     * Also see, TeaLeaf.Event.Configuration.tlCatchAlerts
     */
    TeaLeaf.Event.tlGetAlertCount = function() {
      var T,
          TE,
          alertCount;

      T = TeaLeaf;
      TE = T.Event;

      alertCount = TE.getAlertCount ? TE.getAlertCount() : 0;
      return alertCount;
    };

  /* window.onerror event handler. Also invoked directly from Tealeaf.js to report XHR failures.
   *
   * @method tlErrorHandler
   * @param {string}  message Browser provided error message.
   * @param {string}  url     Url in which the error occured.
   * @param {integer} line    (Optional) Line number in the resource where the error occured.
   * @return {boolean} Always returns false to allow the browsers default error handling to occur.
   * @namespace TeaLeaf.Event
   */
  TeaLeaf.Event.tlErrorHandler = function(message, url, line) {
    try {
      var TEC = TeaLeaf.Event.Configuration,
          exceptionEvent;

      TEC.tlexceptioncount += 1;
      if (TEC.tlexceptioncount > TEC.tlmaxeventexception) {
        return false;
      }
      if ((typeof message !== "string") && !url) {
        // If both "message" and "url" are not specified then the data is not all that useful.
        return false;
      }
      line = line || 0;
      exceptionEvent = TeaLeaf.Event.createExceptionEvent(message, url, line);
      TeaLeaf.eventQ.enqueue(exceptionEvent);
    }
    catch (e) {
      // Do nothing. We're already in an error handler!
    }
    return false;
  };

  (function () {
    // Private members
    var T,
        TCfg,
        TC,
        TCCfg,
        TE,
        TECfg,
        sendUnload;

    T = TeaLeaf;
    TCfg = T.Configuration;
    TC = T.Client;
    TCCfg = TC.Configuration;
    TE = T.Event;
    TECfg = TE.Configuration;

    sendUnload = function(unloadType) {
      var cookie_val,
          d = new Date(),
          unloadEvent;

      if (T.unloadSent) {
          return;
      }

      if (!T.activitySinceDisabled()) {
        // Do not report (before)unload if the activity timeout was triggered
        return;
      }

      // XXX - Global state: This is bad.
      if (TCCfg.tlIEhref) {
        TCCfg.tlIEhref = false;
        return;
      }

      // Send in any queued keys, resizes and scroll events
      TC.tlSendKeys();
      TC.tlSendResize();
      TC.tlSendScroll(null, true);

      if (!TCfg.xhrAsyncOnUnload) {
        // Switch to synchronous communication.
        // IE has a bug when asynchronous connections are open while
        // the page is unloaded. These connections are not cleaned up
        // correctly and end up rendering the browser unusable after
        // a few tries. This only happens when the browser has been
        // opened as a child window i.e. using window.open() or
        // if the anchor tag specifies target="_blank".
        TCfg.xhrAsync = false;
      }

      // If configured to do so, store the current event queue xml in a cookie
      // so if it fails to send up it can be sent with the next page's events
      if (TCCfg.tlStoreQueueInCookie) {
        d.setTime(d.getTime()+300000);
        cookie_val = TE.tlQueuedXML.replace(/(\r|\n)/g, "").replace(/;/g, "%3B");
        T.tlSetCookie("tlQueuedXML", cookie_val, d, "/");
      }

      TECfg.tllastdwelltime = new Date();

      TE.queuedEventTypes.PERFORMANCE = true;
      if (!TE.SetSubType) {
        TE.SetSubType = unloadType;
      }
      else {
        TE.SetSubType += "; " + unloadType;
      }

      // XXX: This is bad!
      TE.SendUnloadHeaders = true;

      unloadEvent = TeaLeaf.Event.createPerformanceEvent(unloadType, {
                      'MouseMove': TC.tlHasUserMovement ? 'True' : 'False',
                      'Action': TCCfg.tlactiontype,
                      'VisitOrder': TECfg.tlvisitorder,
                      'Alerts': TE.tlGetAlertCount()
                    });
      T.eventQ.enqueue(unloadEvent);
      // An unload event triggers an automatic flush of the UI event queue.
      TE.tlFlushQueue(true);

      // Set a callback timer to reset the flags in case this is not a real unload.
      setTimeout(function () {
                   T.unloadSent = false;
                   TCfg.xhrAsync = true;
                   TE.SendUnloadHeaders = false;
                 }, 1000);

      T.PageSetup.Complete = false;
      T.unloadSent = true;
    };

    // Public members
    /**
     * Handle the beforeunload event.
     */
    TE.tlBeforeUnload = function() {
      sendUnload(T.$C("BEFOREUNLOAD"));
    };

    /**
     * Handle the unload event.
     */
    TE.tlUnload = function(e) {
        if (!e.persisted) {
            TC.tlDetachFromAllControls();
        }
        sendUnload(T.$C("UNLOAD"));
    };
  }());

  /**
   * Event setup.
   * @requires
   * TeaLeafEventCfg.js
   * @addon
   */
  TeaLeaf.Event.EventSetup = function() {
    var T,
        TE,
        TECfg;

    T = TeaLeaf;
    TE = T.Event;
    TECfg = TE.Configuration;
        
    if (TECfg.tlCatchAlerts) {
      (function() {
        var alertCount,
            originalAlert,
            originalConfirm,
            originalPrompt;

        // This will hold the count for alert(), confirm() and prompt() calls
        alertCount = 0;

        if (window.alert && window.alert.apply) {
          originalAlert = window.alert;
          window.alert = function() {
            var retVal;

            retVal = originalAlert.apply(window, arguments);
            alertCount++;
            // TODO: POST the alert message as an INFO event
            return retVal;
          };
        }

        if (window.confirm && window.confirm.apply) {
          originalConfirm = window.confirm;
          window.confirm = function() {
            var retVal;

            retVal = originalConfirm.apply(window, arguments);
            alertCount++;
            // TODO: POST the confirm message and user response as an INFO event
            return retVal;
          };
        }

        if (window.prompt && window.prompt.apply) {
          originalPrompt = window.prompt;
          window.prompt = function() {
            var retVal;

            retVal = originalPrompt.apply(window, arguments);
            alertCount++;
            // TODO: POST the prompt message, optional value and user response as an INFO event
            return retVal;  
          };
        }

        TE.getAlertCount = function() {
          return alertCount;
        };
      }());
    }

        //Handle Errors
        if(TeaLeaf.Event.Configuration.tlcatcherrors){
            // If there is no error handler registered only then we attach ours.
            if (typeof window.onerror !== "function") {
              /* Use direct assignment instead of the normal event handler API.
               * If you use the latter to attach to onerror, Firefox will pass an
               * event object in the callback instead of the message, url, and line number.
               */
              window.onerror = TeaLeaf.Event.tlErrorHandler;
            }
        }

    // Set up the timer for the periodic flushing of the event queue
    TeaLeaf.Event.setupTimerRoutine();
    TeaLeaf.Event.Loaded = true;
  };

  TeaLeaf.Event.setupTimerRoutine = function (timeout) {
    if (TeaLeaf.Event.Configuration.tlqueueevents) {
        timeout = timeout || TeaLeaf.Event.Configuration.tlqueueeventstimer;
    }
    else {
        // Since we're not interested in queueing these we need to poll frequently.
        timeout = 1000;
    }

    // Sanity check on the timeout (atleast 1 second)
    timeout = (timeout > 999) ? timeout : 1000;
    setTimeout(function () {
                 TeaLeaf.Event.tlFlushQueue();
                 TeaLeaf.Event.setupTimerRoutine();
               }, timeout);
  };

  /* Helper function to create and add a custom event to the Tealeaf UIC stream.
   *
   * @method tlAddCustomEvent
   * @param {string} eventName Used to set the UI event "SubType" property
   * @param {object} nameValueObj Object containing name-value pairs
   *                 e.g.  {
   *                         elementName: "zipcode",
   *                         errorType: "validation",
   *                         errorMessage: "Please enter a valid zipcode."
   *                       }
   */
  TeaLeaf.Event.tlAddCustomEvent = function (eventName, nameValueObj) {
    var customEvent;

    // Input validation
    if (!eventName || typeof eventName !== "string") {
      eventName = "custom";
    }
    if (!nameValueObj || typeof nameValueObj !== "object") {
      return;
    }

    customEvent = TeaLeaf.Event.createCustomEvent(eventName, nameValueObj);
    TeaLeaf.eventQ.enqueue(customEvent);
  };


  if (!TeaLeaf.Event.Configuration.tlinit) {
    TeaLeaf.Event.Configuration.tlinit = true;
    TeaLeaf.addOnLoad(TeaLeaf.Event.EventSetup);
  }
}
/*
 * Copyright � 1999-2012 TeaLeaf Technology, Inc.
 * All rights reserved.
 *
 * THIS SOFTWARE IS PROVIDED BY TEALEAF ``AS IS'' AND ANY EXPRESS OR
 * IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE
 * AND NON-INFRINGEMENT ARE DISCLAIMED.  IN NO EVENT SHALL TEALEAF
 * BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
 * OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 *
 * @fileoverview
 * This file sends Summary about Window, Document, Navigator and
 * Screen objects rendered on the page.
 *
 * @requires
 * TeaLeaf.js
 * TeaLeafEnvCfg.js
 * TeaLeafEvent.js
 *
 * @version 2012.06.01.1
 *
 */
if (window.TeaLeaf &&
    ((typeof TeaLeaf.replay === "function") ? !TeaLeaf.replay() : !TeaLeaf.replay) &&
    TeaLeaf.Env &&
    !TeaLeaf.Env.setupComplete)
{
  TeaLeaf.Env.setupComplete = true;
  /*
   * Send a page summary about Window, Document, Navigator and Screen
   * object when the page is loaded.
   * @requires
   * TeaLeafEvent.js
   * @addon
   */
  TeaLeaf.Env.tlSendPageSummary = function () {
    var TeaLeaf = window.TeaLeaf,
        Env = TeaLeaf.Env,
        envEvent,
        envObj= {
          'document': Env.getDocumentInfo(),
          'window': Env.getWindowInfo(),
          'screen': Env.getScreenInfo()
          // TODO: Rewrite plugin detection: Env.getPluginInfo();
        };

    TeaLeaf.Event.queuedEventTypes.PERFORMANCE = true;
    TeaLeaf.Event.SetSubType = "INIT";
    envEvent = TeaLeaf.Event.createPerformanceEvent("INIT", envObj);
    TeaLeaf.Event.PageLoadMilliSecs = envEvent.timeDuration;
    TeaLeaf.eventQ.enqueue(envEvent);
  };

  /* Gather Information about the Document object.
   * @param tlevt TeaLeaf event used for reporting on the Document object.
   * @requires
   * TeaLeafEvent.js
   * @addon
   */
  TeaLeaf.Env.getDocumentInfo = function (document) {
    var T = TeaLeaf;

    document = document || window.document;
    return {
      'title': document.title,
      'referer': document.referrer,
      'contentType': document.contentType,
      'lastModified': document.lastModified,
      'characterSet': document.characterSet,
      'width': document.width,
      'height': document.height,
      'anchors': document.anchors.length,
      'embeds': (document.embeds ? document.embeds.length : 0),
      'forms': document.forms.length,
      'links': document.links.length,
      'images': document.images.length,
      'badImages': (T.tlBrowserIsWebKit() ? 0 : T.Event.tlBadImageCount()),
      'plugins': (document.plugins ? document.plugins.length : 0)
    };
  };

  /* Gather Information about the Window object.
   * @param tlevt TeaLeaf event used for reporting on the Window object.
   * @requires
   * TeaLeafEvent.js 
   * @addon
   */
  TeaLeaf.Env.getWindowInfo = (function () {
    var tlWindowId;

    TeaLeaf.Env.getWindowId = function () {
      if (typeof window.sessionStorage === "object") {
        try {
          tlWindowId = sessionStorage.TLTWID;
          if (!tlWindowId) {
            // Create a new window Id
            tlWindowId = TeaLeaf.makeRandomString(6);
            sessionStorage.TLTWID = tlWindowId;
          }
        }
        catch (e) {
          // Ignore exceptions and reset the window Id to null.
          tlWindowId = null;
        }
      }
      return tlWindowId;
    };

    return function () {
      var T = TeaLeaf,
          location = window.location,
          clientSize;

      if (window.innerHeight && window.innerWidth) {
        clientSize = window.innerWidth + "x" + window.innerHeight;
      }
      else if (document.body && document.body.clientWidth && document.body.clientHeight) {
        clientSize = document.body.clientHeight + "x" + document.body.clientWidth;
      }

      return {
        'initialOrientation': T.initialOrientation,
        'WindowHref': escape(location.href),
        'protocol': location.protocol,
        'hostName': location.hostname,
        'port': location.port,
        'pathName': location.pathname,
        'frames': window.frames.length
      };
    };
  }());

  /* Gather Information about the Screen object.
   * @param tlevt TeaLeaf event used for reporting on the Navigator object.
   * @requires
   * TeaLeafEvent.js 
   * @addon
   */
  TeaLeaf.Env.getScreenInfo = function () {
    var screen = window.screen;

    return {
      'width': screen.width,
      'height': screen.height,
      'deviceXDPI': screen.deviceXDPI,
      'deviceYDPI': screen.deviceYDPI,
      'logicalXDPI': screen.logicalXDPI,
      'logicalYDPI': screen.logicalYDPI
    };
  };

  /* Gather Information about the available plugins.
   * @param tlevt TeaLeaf event used for reporting on available plugins.
   * @requires
   * TeaLeafEvent.js
   * @addon
  // TODO - Fix this!
  TeaLeaf.Env.tlPluginInfo = function(tlevt) {
    if (window.ActiveXObject) {
      for (var i = 0; i < TeaLeaf.Env.Configuration.tlPlugins.length; i++) {
        if (!TeaLeaf.Env.Configuration.tlPlugins[i].tlenable) {
          continue;
        }
        var tlPlugin = TeaLeaf.Env.Configuration.tlPlugins[i].tlIEplugin;
        try {
          var tlActiveX = new ActiveXObject(tlPlugin);
          if (tlActiveX) {
            tlevt.tlPushXML(TeaLeaf.$C("Plugin"));
            var tlAddNameValueArray = [TeaLeaf.$C("Pluginname"), TeaLeaf.Env.Configuration.tlPlugins[i].tlpluginname,
                                       TeaLeaf.$C("Version"), TeaLeaf.Env.Configuration.tlPlugins[i].tlversion];
            tlevt.tlAddData(tlAddNameValueArray);
            tlevt.tlPopXML();
          }
        }
        catch(e) {
          // Do nothing
        }
      }
    }
    else {
      for (var i = 0; i < navigator.plugins.length; i++) {
        for (var j = 0; j < TeaLeaf.Env.Configuration.tlPlugins.length; j++) {
          if (!TeaLeaf.Env.Configuration.tlPlugins[j].tlenable) {
            continue;
          }
          var tlnavpluginname = navigator.plugins[i].name.substr(0, TeaLeaf.Env.Configuration.tlPlugins[j].tlpluginname.length);
          if (tlnavpluginname == TeaLeaf.Env.Configuration.tlPlugins[j].tlpluginname) {
            TeaLeaf.Env.Configuration.tlPlugins[j].tlenable = false;
            tlevt.tlPushXML(TeaLeaf.$C("Plugin"));
            var tlAddNameValueArray = [TeaLeaf.$C("Pluginname"), TeaLeaf.Env.Configuration.tlPlugins[j].tlpluginname,
                                       TeaLeaf.$C("Version"), TeaLeaf.Env.Configuration.tlPlugins[j].tlversion];
            tlevt.tlAddData(tlAddNameValueArray);
            tlevt.tlPopXML();
          }
        }
      }
    }
  }
  */

  TeaLeaf.addOnLoad(TeaLeaf.Env.tlSendPageSummary);
}
/*
 * Copyright © 1999-2012 TeaLeaf Technology, Inc.
 * All rights reserved.
 *
 * THIS SOFTWARE IS PROVIDED BY TEALEAF ``AS IS''
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING,
 * BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT ARE DISCLAIMED.
 * IN NO EVENT SHALL TEALEAF BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
 * THE POSSIBILITY OF SUCH DAMAGE.
 *
 * @fileoverview
 * This is the main UI Client Event Capture JavaScript file that is
 * used by other JavaScript to register their onload routines.
 *
 * @requires
 * TeaLeaf.js
 * TeaLeafEvent.js
 * TeaLeafClientCfg.js
 *
 * @version 2012.06.01.1
 *
 */
if (window.TeaLeaf &&
    ((typeof TeaLeaf.replay === "function") ? !TeaLeaf.replay() : !TeaLeaf.replay) &&
    TeaLeaf.Client &&
    !TeaLeaf.Client.setupComplete)
{
  TeaLeaf.Client.setupComplete = true;
	TeaLeaf.Client.tlTimeoutID = -1;
	TeaLeaf.Client.tlHasUserMovement = false;
	/**
    * Detect user movement.
    *
    * @requires 
    * TeaLeafClientCfg.js
    * TeaLeafEvent.js
    * @addon
   */
	TeaLeaf.Client.tlUserMovement = function() {
		TeaLeaf.Client.tlHasUserMovement = true;
		TeaLeaf.Event.tlRemoveHandler(document, "mousemove", TeaLeaf.Client.tlUserMovement, false);
	};

  TeaLeaf.Client.EmptyMask = function () {
    return "";
  };

  TeaLeaf.Client.BasicMask = function (elem) {
    if (!elem || !elem.value) {
      return null;
    }

    return "XXXXXX";
  };

  TeaLeaf.Client.PreserveMask = function (elem) {
    var PM,
        maskedValue;

    if (!elem || !elem.value) {
      return null;
    }

    PM = TeaLeaf.Client.Configuration.tlPrivacyMask;
    maskedValue = elem.value;
    maskedValue = maskedValue.replace(/[A-Z]/g, PM.upperChar);
    maskedValue = maskedValue.replace(/[a-z]/g, PM.lowerChar);
    maskedValue = maskedValue.replace(/[0-9]/g, PM.numericChar);
    maskedValue = maskedValue.replace(/[^A-Za-z0-9]/g, PM.symbolChar);

    return maskedValue;
  };

  TeaLeaf.Client.getFieldBlockMatch = function(elem) {
    var i,
        val,
        FB,
        FBitem;

    FB = TeaLeaf.Client.Configuration.tlFieldBlock;

    // If elem is not an object
    if (typeof elem === "string") {
      elem = document.getElementById(elem);
    }
    if (!elem) {
      return null;
    }

    for (i=0; i < FB.length; i++) {
      FBitem = FB[i];
      if (FBitem.id) {
        if (!FBitem.idRE) {
          FBitem.idRE = new RegExp(FBitem.id, (FBitem.caseinsensitive ? "i" : ""));
        }
        if (FBitem.idRE.test(elem.id)) {
          return FBitem;
        }
      }
      if (FBitem.name) {
        if (!FBitem.nameRE) {
          FBitem.nameRE = new RegExp(FBitem.name, (FBitem.caseinsensitive ? "i" : ""));
        }
        if (FBitem.nameRE.test(elem.name)) {
          return FBitem;
        }
      }
      if (FBitem.className) {
        if (!FBitem.classRE) {
          FBitem.classRE = new RegExp(FBitem.className, (FBitem.caseinsensitive ? "i" : ""));
        }
        if (FBitem.classRE.test(elem.className)) {
          return FBitem;
        }
      }
      /* Custom attributes */
      if (FBitem.attributeName && FBitem.attributeValue) {
        val = elem.getAttribute(FBitem.attributeName);
        if (val) {
          if (!FBitem.attributeRE) {
            FBitem.attributeRE = new RegExp(FBitem.attributeValue, (FBitem.caseinsensitive ? "i" : ""));
          }
          if (FBitem.attributeRE.test(val)) {
            return FBitem;
          }
        }
      }
    }
    return null;
  };

  /**
   * Check if element is silent.
   * @param element or id of element.
   * @requires
   * TeaLeafClientCfg.js
   * @addon
   */
  TeaLeaf.Client.tlIsReplace = function(elem) {
    // If elem is not an object
    if (typeof elem === "string") {
      elem = document.getElementById(elem);
    }
    if (!elem) {
      return false;
    }

    if (TeaLeaf.Client.getFieldBlockMatch(elem)) {
      return true;
    }

    if (TeaLeaf.getNodeType(elem) === "password") {
      return TeaLeaf.Client.Configuration.tlpassword === 2;
    }

    return false;
  };

  /**
   * Replace element with dummy value, needed in some cases
   * when there is client validation.
   * @param element or id of element
   * @requires
   * TeaLeafClientCfg.js
   * @addon
   */
  TeaLeaf.Client.tlReplaceValue = function(elem) {
    var blockObj;

    // If elem is not an object
    if (typeof elem === "string") {
      elem = document.getElementById(elem);
    }
    if (!elem) {
      return null;
    }

    blockObj = TeaLeaf.Client.getFieldBlockMatch(elem);
    if (blockObj) {
      return blockObj.mask(elem);
    }
    return elem.value;
  };

  /**
   * Check if element is excluded from capture.
   * @param element or id of element.
   * @requires
   * TeaLeafClientCfg.js
   * @addon
   */
  TeaLeaf.Client.tlIsExcluded = function(elem) {
    var blockObj;

    // If elem is not an object
    if (typeof elem === "string") {
      elem = document.getElementById(elem);
    }
    if (!elem) {
      return false;
    }

    blockObj = TeaLeaf.Client.getFieldBlockMatch(elem);
    if (blockObj) {
      return blockObj.exclude;
    }

    if (TeaLeaf.getNodeType(elem) === "password") {
      return TeaLeaf.Client.Configuration.tlpassword === 2;
    }

    return false;
  };

	/**
    * Get the name from a DOM node.
    * @param theNode DOM element.
    * @addon
   */
	TeaLeaf.Client.tlGetName = function(theNode) {
		if (!theNode) {
			return null;
		}
		var	id = theNode.id,
		    name = theNode.name;
		if (id) {
			return id;
		}
		if (name) {
			return name;
		}
		return null;
	};
  /**
   * Get event source DOM element.
   * @param theEvent DOM event.
   * @addon
   */
  TeaLeaf.Client.tlGetEventSource = function(theEvent) {
    var	itemSource;

    itemSource = null;
    if (!theEvent) {
      return null;
    }

    if (theEvent.srcElement) {
      // IE
      itemSource = theEvent.srcElement;
    }
    else {
      // W3C
      itemSource = theEvent.target;
      if (!itemSource) {
        // XXX: Mozilla only (non-standard)
        itemSource = theEvent.explicitOriginalTarget;
      }
      if (!itemSource) {
        // XXX: Mozilla only (non-standard)
        itemSource = theEvent.originalTarget;
      }
    }

    if (itemSource && itemSource.tagName === "HTML") {
      // XXX: Do not send any DOM events that target the HTML element.
      // e.g. mousedown events on the scroll bar.
      return null;
    }

    if (itemSource && !itemSource.name) {
      // If an Anchor or link, I can look info up in the list
      if (itemSource.parentNode && itemSource.parentNode.tagName) {
        if (itemSource.parentNode.tagName === "A" ||
            itemSource.parentNode.tagName === "LINK" )
        {
          itemSource = itemSource.parentNode;
        }
      }
    }

    if (!itemSource || !itemSource.tagName) {
      itemSource = window.document.body;
    }

    return itemSource;
  };
	/**
    * If we don't have an name, get the index from either the anchors
    * or the links collection.
    * @param theNode DOM element.
    * @param full XML format.
    * @addon
   */
	TeaLeaf.Client.tlGetAnchor = function(theNode, full) {
		if (!theNode) {
			return null;
		}
		if (theNode.name) {
			return null;
		}
		var		idx;
		for(idx = 0; idx < document.anchors.length; idx++) {
			if( document.anchors[idx] === theNode ) {
				if( full ) {
					return "<AnchorElement>" + idx + "</AnchorElement>\r\n";
				}
				else {
					return "Anchor-" + idx;
				}
			}
		}
		for(idx = 0; idx < document.links.length; idx++) {
			if( document.links[idx] === theNode ) {
				if( full ) {
					return "<LinkElement>" + idx + "</LinkElement>\r\n";
				}
				else {
					return "Link-" + idx;
				}
			}
		}	
		return null;
	};

  /*
   * Check if element is of type input
   */
  TeaLeaf.Client.checkIsInput = function (elem) {
    if (typeof elem === "string") {
      elem = document.getElementById(elem);
    }
    switch (elem.tagName) {
    case "INPUT":
    case "SELECT":
    case "TEXTAREA":
      return true;
    }

    return false;
	};


	/**
    * If we don't have an name, get the index from either the anchors
    * or the links collection.
    * @param str XML string.
    * @requires 
    * TeaLeafClientCfg.js
    * TeaLeafEvent.js
    * @addon
   */
	TeaLeaf.Event.tlFormatXMLName = function(str) {
		//	Nothing handed in
		if( ! str || str.length <= 0 ) {
			return null;
    }
		var	ind,
		    max,
		    rtn = "";
		if( ! TeaLeaf.Event.tlNameStartChar(str.charCodeAt(0)) ) {
			rtn = "_";
		}
		max = str.length;
		for(ind = 0; ind < max; ind++) {
			if( TeaLeaf.Event.tlNameChar(str.charCodeAt(ind)) ) {
				rtn = rtn + str.charAt(ind);
			}
			else {
				rtn = rtn + "_";
			}
		}
		return rtn;
	};
  /*
   * Utility function to help format the XML.
   */
    TeaLeaf.Event.tlNameStartChar = function(chr) {
		//	":" | [A-Z] | "_" | [a-z] | [#xC0-#xD6] | [#xD8-#xF6] |
		//	[#xF8-#x2FF] | [#x370-#x37D] | [#x37F-#x1FFF] |
		//	[#x200C-#x200D] | [#x2070-#x218F] | [#x2C00-#x2FEF] |
		//	[#x3001-#xD7FF] | [#xF900-#xFDCF] | [#xFDF0-#xFFFD]
		//	Note:  ":" was removed because it is only valid when a namespace
		//	is defined
		return (chr >= 0x41 && chr <= 0x5A) || chr === 0x5F ||
			(chr >= 0x61   && chr <= 0x7A)   || (chr >= 0xC0   && chr <= 0xD6)   ||
			(chr >= 0xD8   && chr <= 0xF6)   || (chr >= 0xF8   && chr <= 0x2FF)  ||
			(chr >= 0x370  && chr <= 0x37D)  || (chr >= 0x37F  && chr <= 0x1FFF) ||
			(chr >= 0x200C && chr <= 0x200D) || (chr >= 0x2070 && chr <= 0x218F) ||
			(chr >= 0x2C00 && chr <= 0x2FEF) || (chr >= 0x3001 && chr <= 0xD7FF) ||
			(chr >= 0xF900 && chr <= 0xFDCF) || (chr >= 0xFDF0 && chr <= 0xFFFD);
	};
	/**
	* Utility function to help format the XML.
    * @param chr character.
    * @addon
   */
    TeaLeaf.Event.tlNameChar = function(chr) {
		//	NameStartChar | "-" | "." | [0-9] | #xB7 | [#x0300-#x036F] | [#x203F-#x2040]
		return TeaLeaf.Event.tlNameStartChar(chr) || chr === 0x2D || chr === 0x2E ||
			(chr >= 0x30 && chr <= 0x39) || chr === 0xB7  ||
			(chr >= 0x0300 && chr <= 0x036F) || (chr >= 0x203F && chr <= 0x2040);
	};

  TeaLeaf.Client.tlQueuedKeys = "";

  /*
   * Returns the normalized (to IE) key code
   * @param theEvent DOM key event.
   */
  TeaLeaf.Client.getNormalizedKeyCode = function(theEvent) {
    var keyCodeStr;

    if (!theEvent || !theEvent.keyCode ||
        // Discard all control characters except backspace and Caps lock.
        (theEvent.keyCode < 0x20 && theEvent.keyCode !== 0x8 && theEvent.keyCode !== 0x14))
    {
      return null;
    }
    keyCodeStr = "";
    // build the normalized string
    if (theEvent.ctrlKey) {
      keyCodeStr += "c-";
    }
    if (theEvent.altKey) {
      keyCodeStr += "a-";
    }
    if (theEvent.shiftKey) {
      keyCodeStr += "s-";
    }

    if (!TeaLeaf.tlBrowserIsIE()) {
      // Standardize to IE values
      switch (theEvent.keyCode) {
        case 59:     // ;: - FF, Opera
          keyCodeStr += 186;
          break;

        default:
          keyCodeStr += theEvent.keyCode;
          break;
      }
    }
    else {
      // IE key codes are simply passed through.
      keyCodeStr += theEvent.keyCode;
    }

    return keyCodeStr;
  };

  /*
   * Queues the keys
   * @param theEvent DOM event.
   * @requires
   * TeaLeafClientCfg.js
   * TeaLeafEvent.js
   * @addon
   */
  TeaLeaf.Client.tlQueueKey = function(theEvent) {
    var itemName,
        itemSource,
        keyCode,
        T,
        TC,
        TCCfg;
    
    T = TeaLeaf;
    TC = T.Client;
    TCCfg = TC.Configuration;
    // Flush the resize and scroll events (if any)
    TC.tlSendResize();
    TC.tlSendScroll(null, true);

    if (!theEvent) {
      theEvent = window.event;
    }

    if (!TC.tlQueuedKeysCount) {
      TC.tlQueuedKeys = "";
      TC.tlQueuedKeysCount = 0;
    }

    // Residual keys to send in? Save the source for next time around
    itemSource = TC.tlGetEventSource(theEvent);
    if (!itemSource) {
      return;
    }


    // We only need to set the onFocus time for the first key invocation.
    if (!itemSource.TeaLeafFocusTime) {
      itemSource.TeaLeafFocusTime = new Date();
    }
    if (TC.tlQueuedKeySource) {
      if (TC.tlQueuedKeySource !== itemSource) {
        // This key belongs to a different element. Flush any queued keystrokes.
        if (TC.tlQueuedKeys && TC.tlQueuedKeys.length > 0) {
          TC.tlSendKeys();
        }
        TC.tlQueuedKeySource = itemSource;
      }
    }
    else {
      TC.tlQueuedKeySource = itemSource;
    }
    // Get the name/anchor where the key happened. If both are null, don't worry about logging.
    itemName = TC.tlGetName(itemSource);
    if (!itemName) {
      // No name, try the XPath.
      itemName = TC.tlGetXPathFromNode(itemSource);
      if (!itemName) {
        if (!TC.tlGetAnchor(itemSource, false)) {
          TC.tlQueuedKeySource = null;
        }
        return;
      }
      else {
        TC.tlQueuedKeySource = itemSource;
      }
    }
    else {
      if (TC.tlIsReplace(itemSource)) {
        TC.tlQueuedKeysCount++;
        return;
      }
      if (TC.tlIsExcluded(itemSource)) {
        TC.tlQueuedKeys = "";
        TC.tlQueuedKeysCount++;
        return;
      }
    }

    keyCode = TC.getNormalizedKeyCode(theEvent);
    if (keyCode) {
      // Put in the seperator if we need it
      if (TC.tlQueuedKeys && TC.tlQueuedKeys.length > 0) {
        TC.tlQueuedKeys += ";";
      }
      TC.tlQueuedKeys += keyCode;
      TC.tlQueuedKeysCount++;
    }
  };
	/**
    * Send the keys.
    * @requires 
    * TeaLeafClientCfg.js
    * TeaLeafEvent.js
    * @addon
   */
  TeaLeaf.Client.tlSendKeys = function() {
    var TeaLeaf = window.TeaLeaf,
        TC = TeaLeaf.Client,
        excluded,
        keyupEvent,
        keyupEventObjFixed,
        keyupEventObjVariable,
        name,
        qCount,
        qKeys,
	      qSource,
	      qSourceXPath,
	      tlManualName,
	      tlNodeID,
	      tlreplace;

    if (!TC.tlQueuedKeySource || (!TC.tlQueuedKeys && !TC.tlQueuedKeysCount)) {
      return;
    }

    // Save the values to temp variables and empty the queue variables
    qSource = TC.tlQueuedKeySource;
    qKeys = TC.tlQueuedKeys;
    qCount = TC.tlQueuedKeysCount;
    TC.tlQueuedKeySource = null;
    TC.tlQueuedKeys      = "";
    TC.tlQueuedKeysCount = 0;

    qSourceXPath = TC.tlGetXPathFromNode(qSource);
    if (!qSourceXPath && TC.Configuration.tlDiscardInvalidXPath) {
      return;
    }

    tlreplace = !!TC.tlIsReplace(qSource);
    excluded = !!TC.tlIsExcluded(qSource);
    if (tlreplace || excluded) {
      qKeys = null;
      qCount = 0;
    }

    // Get the name/anchor where the key happened.  If both are null,
    // don't worry about logging
		name  = TeaLeaf.Client.tlGetName(qSource);

    tlNodeID = qSource.id;

    if (!TeaLeaf.Client.CheckIfIdValid(qSource)) {
      tlNodeID = "";
    }

    // The object for the reporting event
    keyupEventObjFixed = {
      'Name': qSource.name,
      'Id': tlNodeID,
      'ElementType': TeaLeaf.getNodeType(qSource),
      'TagName': qSource.tagName,
      'XPath': qSourceXPath,
      'KeyCount': qCount
    };

    keyupEventObjVariable = {};
    tlManualName = TeaLeaf.Event.tlFormatXMLName(name);
    if (tlreplace) {
      if (!keyupEventObjVariable[tlManualName]) {
        keyupEventObjVariable = { 'ValueIn': tlManualName };
        keyupEventObjVariable[tlManualName] = TC.tlReplaceValue(qSource);
      }
    }
    else {
      if (!tlManualName) {
        tlManualName = qSourceXPath;
        tlManualName = TeaLeaf.Event.tlFormatXMLName(tlManualName);
      }
      keyupEventObjVariable = { 'KeyCode': qKeys };
      if (qSource.value) {
        keyupEventObjVariable.ValueIn = tlManualName;
        keyupEventObjVariable[tlManualName] = qSource.value;
      }
    }
    // Now create the event object and queue it up.
    keyupEvent = TeaLeaf.Event.createGuiEvent('KeyUp', TeaLeaf.extend(keyupEventObjVariable, keyupEventObjFixed));
    TeaLeaf.eventQ.enqueue(keyupEvent);
    TeaLeaf.tlKeepAlive();
  };

  /* Send resize event.
   * @requires 
   * TeaLeafClientCfg.js
   * TeaLeafEvent.js
   * @addon
   */
  TeaLeaf.Client.tlSendResize = function() {
   var TeaLeaf = window.TeaLeaf,
        Client = TeaLeaf.Client,
        guiEvent;
    if (!Client.ResizeClientX && !Client.ResizeClientY) {
      return;
    }
    guiEvent = TeaLeaf.Event.createGuiEvent('Resize', {
                 'clientX': Client.ResizeClientX,
                 'clientY': Client.ResizeClientY,
                 'screenX': Client.ResizeScreenX,
                 'screenY': Client.ResizeScreenY
               });
    TeaLeaf.eventQ.enqueue(guiEvent);
    Client.ResizeClientX = null;
    Client.ResizeClientY = null;
    Client.ResizeScreenX = null;
    Client.ResizeScreenY = null;
  };

  TeaLeaf.Client.tlCheckScroll = function () {
    var i,
        handlers = TeaLeaf.Client.Configuration.tlWindowHandlers;
      
    for (i=0; i < handlers.length; i++) {
      if (handlers[i].domevent === 'scroll' && handlers[i].load) {
        return true;
      }
    }
    return false;
  };

  /* Send scroll event.
   * @requires 
   * TeaLeafClientCfg.js
   * TeaLeafEvent.js
   * @addon
   */
  TeaLeaf.Client.tlSendScroll = function (domEvent, force) {
    var guiEvent,
        guiEventObj,
        scrOfX = 0,
        scrOfY = 0,
        targetObj;
    domEvent = domEvent || window.event;
      if (!TeaLeaf.Client.tlCheckScroll()) {
        return;
      }
        if (typeof window.pageYOffset === 'number') {
            //Netscape compliant
            scrOfY = window.pageYOffset;
            scrOfX = window.pageXOffset;
        } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
            //DOM compliant
            scrOfY = document.body.scrollTop;
            scrOfX = document.body.scrollLeft;
        } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
            //IE6 standards compliant mode
            scrOfY = document.documentElement.scrollTop;
            scrOfX = document.documentElement.scrollLeft;
        }
        if(TeaLeaf.Client.Configuration.tlScrollOffsetX === 0){
        TeaLeaf.Client.Configuration.tlScrollOffsetX = scrOfX;
      }
	    else if(scrOfX > TeaLeaf.Client.Configuration.tlScrollOffsetX){
		    TeaLeaf.Client.Configuration.tlScrollDirection = "right";
	    }
	    else if(scrOfX < TeaLeaf.Client.Configuration.tlScrollOffsetX){
		    TeaLeaf.Client.Configuration.tlScrollDirection = "left";
	    }

        if(TeaLeaf.Client.Configuration.tlScrollOffsetY === 0){
	        TeaLeaf.Client.Configuration.tlScrollOffsetY = scrOfY; 
        }	
	    else if(scrOfY > TeaLeaf.Client.Configuration.tlScrollOffsetY){
		    TeaLeaf.Client.Configuration.tlScrollDirection = "down";
	    }
	    else if(scrOfY < TeaLeaf.Client.Configuration.tlScrollOffsetY){
		    TeaLeaf.Client.Configuration.tlScrollDirection = "up";
	    }
        if(scrOfX > 0){
        TeaLeaf.Client.Configuration.tlScrollX = scrOfX;
        }
        if(scrOfY > 0){
	        TeaLeaf.Client.Configuration.tlScrollY = scrOfY; 
        }	
                
        if(TeaLeaf.Client.Configuration.tlScrollOffsetX === TeaLeaf.Client.Configuration.tlScrollX && TeaLeaf.Client.Configuration.tlScrollOffsetY === TeaLeaf.Client.Configuration.tlScrollY)
        {
            return;    
        }

        if (force || (TeaLeaf.Client.Configuration.tlScrollDirectionOrig !== TeaLeaf.Client.Configuration.tlScrollDirection)) {
          guiEventObj = {
            'ClientX': TeaLeaf.Client.ScrollClientX,
            'ClientY': TeaLeaf.Client.ScrollClientY,
            'ScreenX': TeaLeaf.Client.ScrollScreenX,
            'ScreenY': TeaLeaf.Client.ScrollScreenY,
            'ScrollHeight': TeaLeaf.Client.ScrollHeight,
            'ScrollWidth': TeaLeaf.Client.ScrollWidth,
            'ScrollTop': TeaLeaf.Client.ScrollTop,
            'ScrollLeft': TeaLeaf.Client.ScrollLeft,
            'OrigX': TeaLeaf.Client.Configuration.tlScrollOffsetX.toString(),
            'OrigY': TeaLeaf.Client.Configuration.tlScrollOffsetY.toString(),
            'CurrX': TeaLeaf.Client.Configuration.tlScrollX.toString(),
            'CurrY': TeaLeaf.Client.Configuration.tlScrollY.toString(),
            'OrigDirection': TeaLeaf.Client.Configuration.tlScrollDirectionOrig,
            'CurrDirection': TeaLeaf.Client.Configuration.tlScrollDirection
          };
          guiEvent = TeaLeaf.Event.createGuiEvent('scroll', guiEventObj);
          TeaLeaf.eventQ.enqueue(guiEvent);
          TeaLeaf.tlKeepAlive();
        }

        TeaLeaf.Client.Configuration.tlScrollOffsetX = TeaLeaf.Client.Configuration.tlScrollX;
        TeaLeaf.Client.Configuration.tlScrollOffsetY = TeaLeaf.Client.Configuration.tlScrollY; 
        TeaLeaf.Client.Configuration.tlScrollDirectionOrig = TeaLeaf.Client.Configuration.tlScrollDirection;
    };

  /**
   * Find the nearest ancestor for a DOM node of the given type
   * @param node The original node
   * @param tag The tag to match on
   * @addon
   */
  TeaLeaf.Client.tlFindAncestorByTag = function(node, tag) {
    var cur_node;
    if (!node || !tag) {
      return null;
    }
    for (cur_node=node.parentNode;
         cur_node && cur_node !== window.document;
         cur_node=cur_node.parentNode)
    {
      if (cur_node.nodeType === 1 && cur_node.tagName === tag) {
        break;
      }
    }

    return cur_node;
  };

    /**
     * Checks the ID black list and ignores those IDs
     * @param id of the node captured
     * @addon
     */
    TeaLeaf.Client.tlCheckBlackList = function(tlid) {
      var i,
          regExMatched,
          tlIDRegEx;

      if (!TeaLeaf.Client.Configuration.tlIDBlackList ||
          !TeaLeaf.Client.Configuration.tlIDBlackList.length)
      {
        // No blacklist defined.
        return false;
      }

      if (tlid) {
        for (i=0; i < TeaLeaf.Client.Configuration.tlIDBlackList.length; i++) {
          tlIDRegEx = new RegExp(TeaLeaf.Client.Configuration.tlIDBlackList[i], "g");
          regExMatched = tlid.match(tlIDRegEx);
          if (regExMatched) {
            return true;
          }
        }
      }
      return false;
    };


    /**
     * Checks the ID white list and includes those IDs
     * @param id of the node captured 
     * @addon
     */
    TeaLeaf.Client.tlCheckWhiteList = function(tlid) {
      var i,
          regExMatched,
          tlIDRegEx;

      if (!TeaLeaf.Client.Configuration.tlIDWhiteList ||
          !TeaLeaf.Client.Configuration.tlIDWhiteList.length)
      {
        // No whitelist defined
        return true;
      }
      if (tlid) {
        for (i=0; i < TeaLeaf.Client.Configuration.tlIDWhiteList.length; i++) {
          tlIDRegEx = new RegExp(TeaLeaf.Client.Configuration.tlIDWhiteList[i], "g");
          regExMatched = tlid.match(tlIDRegEx);
          if (regExMatched) {
            return true;
          }
        }
      }
      return false;
    };

  /**
   * Generate an XPath for the node
   * @param node The starting node
   */
  TeaLeaf.Client.tlGetXPathFromNode = function (node) {
    var i, j,
        cur_node,
        idValid = false,
        nodes_arr = null,
        parent_node = null,
        parts = [],
        xpath = [];

    if (!node || TeaLeaf.Client.CheckIfIdValid(node)) {
      // If node is not valid or node has a valid id then there is no xpath.
      return null;
    }
    cur_node = node;
    // Hack fix to handle tags that are not normally visual elements
    for (i in TeaLeaf.Client.Configuration.tlSpecialChildNodeTags) {
      if(cur_node.tagName.toString() === i) {
        cur_node = cur_node.parentNode;
      }
    }
    for (idValid = TeaLeaf.Client.CheckIfIdValid(cur_node); cur_node !== window.document && !idValid; idValid = TeaLeaf.Client.CheckIfIdValid(cur_node)) {
      nodes_arr = null;
      parent_node = null;
      switch (cur_node.tagName) {
      case "TD":
        parent_node = TeaLeaf.Client.tlFindAncestorByTag(cur_node, "TR");
        if (parent_node) {
          nodes_arr = parent_node.cells;
        }
        break;
      case "TR":
        parent_node = TeaLeaf.Client.tlFindAncestorByTag(cur_node, "TABLE");
        if (parent_node) {
          nodes_arr = parent_node.rows;
        }
        break;
      case "OPTION":
        parent_node = TeaLeaf.Client.tlFindAncestorByTag(cur_node, "SELECT");
        if (parent_node) {
          nodes_arr = parent_node.options;
        }
        break;
      default:
        parent_node = cur_node.parentNode;
        if (!parent_node) {
          parent_node = window.document;
        }
        nodes_arr = parent_node.childNodes;
        break;
      }

      if (!nodes_arr) {
        return null;
      }

      for (i = 0, j = 0; i < nodes_arr.length; i++) {
        if (nodes_arr[i].nodeType === 1 && nodes_arr[i].tagName === cur_node.tagName) {
          if (nodes_arr[i] === cur_node) {
            xpath[xpath.length] = [cur_node.tagName.toUpperCase(), j];
            break;
          }
          j++;
        }
      }
      cur_node = parent_node;
    }

    if (idValid) {
      xpath[xpath.length] = [cur_node.id];
    }

    if (!xpath.length) {
      // XXX - Is returning null the best thing here?
      return null;
    }
    for (i = xpath.length-1, parts = []; i >= 0; i--) {
      if (xpath[i].length > 1) {
        parts[parts.length] = "['" + xpath[i][0] + "'," + xpath[i][1] + "]";
      }
      else {
        parts[parts.length] = "['" + xpath[i][0].toString().replace(/'/g, "\\'") + "']";
      }
    }

    return ("[" + parts.join(",") + "]");
  };

	/**
    * Check the if the node has a valid id attribute for TeaLeaf.Client.tlGetNodeFromXPath
    * @param node The node to be tested
    * @addon
    */
	
  TeaLeaf.Client.CheckIfIdValid = function(node) {
    var oldId;

    if (!node || !node.id || typeof node.id !== "string") {
      return false;
    }

    if (TeaLeaf.Client.tlCheckBlackList(node.id) === true) {
      // node.id matched with blacklist
      return false;
    }

    if (TeaLeaf.Client.tlCheckWhiteList(node.id) === false) {
      // node.id did not match with whitelist
      return false;
    }
    
    if (!TeaLeaf.Client.Configuration.tlUniqueIDCheckEnabled) {
      // Uniqueness check is disabled.
      return true;
    }

    oldId = node.id;
    node.id = (new Date()).getTime() + "_TeaLeaf";
    try {
      if (!document.getElementById(oldId)) {
        // id is unique
        node.id = oldId;
        return true;
      }
      else {
        // id is non-unique
        node.id = oldId;
        return false;
      }
    }
    catch(e) {
      return false;
    }
    finally {
      node.id = oldId;
    }
  };

  TeaLeaf.Private.setLastProcessedEvent = function(e) {
    var TP = TeaLeaf.Private,
        NULL = null,
        UNDEFINED;
    
    if (!e) {
      return;
    }
    if (!TP.tlPrevEvent) {
      TP.tlPrevEvent = {};
    }
    // Copy the relevant parts
    TP.tlPrevEvent.type = e.type;
    TP.tlPrevEvent.button = e.button;
    TP.tlPrevEvent.clientX = e.clientX;
    TP.tlPrevEvent.clientY = e.clientY;

    if (e.keyCode !== UNDEFINED) {
      TP.tlPrevEvent.keyCode = e.keyCode;
    }
    else {
      TP.tlPrevEvent.keyCode = NULL;
    }

    if (e.charCode !== UNDEFINED) {
      TP.tlPrevEvent.charCode = e.charCode;
    }
    else {
      TP.tlPrevEvent.charCode = NULL;
    }

    if (e.timeStamp !== UNDEFINED) {
      if (e.timeStamp.getTime) {
        TP.tlPrevEvent.timeStamp = e.timeStamp.getTime();
      }
      else {
        TP.tlPrevEvent.timeStamp = e.timeStamp;
      }
    } else {
      TP.tlPrevEvent.timeStamp = new Date().getTime();
    }

    if (e.target !== UNDEFINED) {
      TP.tlPrevEvent.target = e.target;
    }
    else {
      TP.tlPrevEvent.target = NULL;
    }

    if (e.srcElement !== UNDEFINED) {
      TP.tlPrevEvent.srcElement = e.srcElement;
    }
    else {
      TP.tlPrevEvent.srcElement = NULL;
    }
  };

  TeaLeaf.Private.getLastProcessedEvent = function() {
    return TeaLeaf.Private.tlPrevEvent;
  };
  
  /* Return true or false */
  TeaLeaf.Client.isDuplicateEvent = function(currEvent) {
    var TP = TeaLeaf.Private,
        currTimeStamp,
        prevEvent = TP.getLastProcessedEvent();

    if (!prevEvent || !currEvent) {
      TP.setLastProcessedEvent(currEvent);
      return false;
    }

    // check for timestamp
    if (typeof currEvent.timeStamp !== "undefined") {
      currTimeStamp = currEvent.timeStamp.getTime ? currEvent.timeStamp.getTime() : currEvent.timeStamp;
      if (prevEvent.timeStamp !== currTimeStamp) {
        TP.setLastProcessedEvent(currEvent);
        return false;
      }
    }
    else {
      currEvent.timeStamp = new Date().getTime();
      /* XXX - need a better way to do this */
      if (Math.abs(currEvent.timeStamp - prevEvent.timeStamp) > 300) {
        TP.setLastProcessedEvent(currEvent);
        return false;
      }
    }

    // check for event type
    if (prevEvent.type !== currEvent.type) {
      TP.setLastProcessedEvent(currEvent);
      return false;
    }

    // check for event target
    if (('target' in currEvent) && (prevEvent.target !== currEvent.target)) {
      TP.setLastProcessedEvent(currEvent);
      return false;
    }
    if (('srcElement' in currEvent) && (prevEvent.srcElement !== currEvent.srcElement)) {
      // IE does not have event.target
      TP.setLastProcessedEvent(currEvent);
      return false;
    }

    // check for mouse button value
    if (prevEvent.button !== currEvent.button) {
      TP.setLastProcessedEvent(currEvent);
      return false;
    }

    // check for X, Y co-ordinates
    if (prevEvent.clientX !== currEvent.clientX ||
        prevEvent.clientY !== currEvent.clientY)
    {
      TP.setLastProcessedEvent(currEvent);
      return false;
    }

    // check for keycode
    if (('keyCode' in currEvent) && (prevEvent.keyCode !== currEvent.keyCode)) {
      TP.setLastProcessedEvent(currEvent);
      return false;
    }

    // TODO: check for charcode

    // TODO: check for shift / alt / ctrl key press state

    /* XXX - does re-setting this help or hurt? 
     * We may need this so the timestamp heuristic works in a lengthy event chain in IE
     */
    TP.setLastProcessedEvent(currEvent);
    return true;
  };

	/**
    * Check attributes if they need to be captured.
    * @param domEvent DOM event.
    * @requires 
    * TeaLeafClientCfg.js
    * TeaLeafEvent.js
    * @addon
   */
  TeaLeaf.Client.tlCheckAttributes = function (itemSource, domEvent) {
    var i,
        attrName,
        attrValue,
        customAttributes = {},
        tlAttributeCapture = TeaLeaf.Client.Configuration.tlAttributeCapture,
        UNDEFINED;

    for (i = 0; i < tlAttributeCapture.length; i++) {
      if (tlAttributeCapture[i].tltagname.toLowerCase() === itemSource.tagName.toLowerCase() &&
          tlAttributeCapture[i].tlevent === domEvent.type.toLowerCase())
      {
        attrName = tlAttributeCapture[i].tlattributename;
        attrValue = itemSource.getAttribute(attrName);
        if (attrValue !== UNDEFINED) {
          customAttributes[attrName] = attrValue;
        }
      }
    }
    return customAttributes;
  };

  TeaLeaf.Client.tlOrientationChangeEvent = function (domEvent) {
    var TeaLeaf = window.TeaLeaf,
        guiEvent,
        orientation;

    // IE does not pass the event object
    domEvent = domEvent || window.event;

    if (TeaLeaf.tlBrowserIsAndroid()) {
      orientation = TeaLeaf.Client.Configuration.tlAndroidOrientation + window.orientation;
      if (orientation === 270) {
        orientation = -90;
        TeaLeaf.Client.Configuration.tlAndroidOrientation = 90;
      }
      else if (orientation === 360) {
        orientation = 0;
        TeaLeaf.Client.Configuration.tlAndroidOrientation = 0;
      }
      else {
        TeaLeaf.Client.Configuration.tlAndroidOrientation += orientation;
      }
    }
    else {
      orientation = window.orientation;
    }
    guiEvent = TeaLeaf.Event.createGuiEvent(domEvent.type, {
                 'ClientSize': (window.innerWidth + "x" + window.innerHeight),
                 'orientation': orientation
               });
    TeaLeaf.eventQ.enqueue(guiEvent);
    TeaLeaf.tlKeepAlive();
  };

  // XXX - 'devicemotion' event handler. Revisit this as implementation may not be correct/complete
  TeaLeaf.Client.tlMotionEvent = function (domEvent) {
    var TeaLeaf = window.TeaLeaf,
        currState,
        guiEvent;

    // IE does not pass the event object
    domEvent = domEvent || window.event;
    currState = {
      'accelerationIncludingGravity': domEvent.accelerationIncludingGravity
    };
    if (domEvent.acceleration) {
      currState.acceleration = domEvent.acceleration;
    }
    if (domEvent.interval) {
      currState.interval = domEvent.interval;
    }
    if (domEvent.rotationRate) {
      currState.rotationRate = domEvent.rotationRate;
    }
    guiEvent = TeaLeaf.Event.createGuiEvent(domEvent.type, {
                 'target': {
                   'currState': currState
                 }
               });
    TeaLeaf.eventQ.enqueue(guiEvent);
    TeaLeaf.tlKeepAlive();
  };

  TeaLeaf.Client.tlDeviceOrientationEvent = function (domEvent) {
    var TeaLeaf = window.TeaLeaf,
        guiEvent;

    // IE does not pass the event object
    domEvent = domEvent || window.event;
    guiEvent = TeaLeaf.Event.createGuiEvent(domEvent.type, {
                 'target': {
                   'currState': {
                     'alpha': domEvent.alpha,
                     'beta': domEvent.beta,
                     'gamma': domEvent.gamma
                   }
                 }
               });
    TeaLeaf.eventQ.enqueue(guiEvent);
    TeaLeaf.tlKeepAlive();
  };

  TeaLeaf.Client.tlAddTouchEvent = (function () {
    var savedTouch = {
        "scale": 0,
        "timestamp": 0
    };

    function isDuplicate(touchState) {
        var result = false;
        if (savedTouch.scale === touchState.scale &&
            Math.abs((new Date()).getTime() - savedTouch.timestamp) < 500)
        {
            result = true;
        }
        return result;
    }

    function saveTouchState(touchState) {
        savedTouch.scale = touchState.scale;
        savedTouch.timestamp = (new Date()).getTime();
    }

    return function (domEvent) {
        var TeaLeaf = window.TeaLeaf,
            Client = TeaLeaf.Client,
            touchState;

        domEvent = domEvent || window.event;
        if (Client.Configuration.pinchOnly && (!domEvent.scale || domEvent.scale === 1)) {
            // Do not record if there is no "pinch" information for touch events.
            return;
        }
        touchState = {
            'rotation': domEvent.rotation ? domEvent.rotation.toFixed(2) : 0,
            'scale': domEvent.scale ? domEvent.scale.toFixed(2) : 1
        };
        if (Client.Configuration.pinchOnly && isDuplicate(touchState)) {
            // Do not record if this event has duplicate scale info.
            return;
        }
        saveTouchState(touchState);
        if (typeof domEvent.touches === "object") {
            touchState.touchCount = domEvent.touches.length || 0;
        }
        Client.tlAddEvent(domEvent, touchState);
    };
  }());

  TeaLeaf.Client.tlAddEvent = function(domEvent, additionalStateObj, additionalEventObj) {
    var TeaLeaf = window.TeaLeaf,
        Client = TeaLeaf.Client,
        ClientConfig = Client.Configuration,
        controlIsBoolean = false,
        currState,
        customAttributesObj,
        domEventType,
        dwellTime = 0,
        guiEvent,
        guiEventObj,
        i,
        itemChecked = false,
        itemSource,
        itemSourceType,
        savedState,
        targetObj,
        tlAddNameValueArrayManualName,
        tlcheck,
        tlhrefstr,
        tljsstr,
        tlManualName,
        tlName,
        tlNodeID,
        tlRepValue,
        tlXpath;

    if (!domEvent) {
      // IE does not pass the event object
      domEvent = window.event;
    }


    // Get the target - If we have no way to identify then discard
    itemSource = Client.tlGetEventSource(domEvent);
    if (!itemSource) {
      return;
    }

    domEventType = domEvent.type.toLowerCase();
    if (domEventType === "mousedown" && itemSource.tagName === "BODY") {
      // Special case handling for mousedowns.
      // Do not send mousedowns on body elements.
      return;
    }

    itemSourceType = TeaLeaf.getNodeType(itemSource);
    tlXpath = Client.tlGetXPathFromNode(itemSource);
    if (!tlXpath && ClientConfig.tlDiscardInvalidXPath) {
      return;
    }
    if (ClientConfig.tlEnableAttr) {
      customAttributesObj = Client.tlCheckAttributes(itemSource, domEvent);
    }

    // Send in any queued keys, resizes and scroll events
    Client.tlSendKeys();
    Client.tlSendResize();
    Client.tlSendScroll(null, true);

    // Do we need to set the onFocus time?
    if (!itemSource.TeaLeafFocusTime) {
      switch (domEventType) {
        case "keyup":
        case "change":
        case "click":
        case "dblclick":
        case "mousedown":
          itemSource.TeaLeafFocusTime = new Date();
          break;
      }
    }

    // Ignore flash for blur
    if (domEventType === "blur" && itemSourceType === "application/x-shockwave-flash") {
      return;
    }

    if (domEventType === "click" && Client.checkIsInput(itemSource)) {
      TeaLeaf.Event.Configuration.tlidoflastvisitedcontrol = Client.tlGetName(itemSource);
    }

    if (domEventType === "click" && (itemSource.tagName.toUpperCase() === "A") && TeaLeaf.tlBrowserIsIE()) {
      ClientConfig.tlIEhref = false;
      tlhrefstr = itemSource.href;

      if (tlhrefstr === "#") {
        ClientConfig.tlIEhref = true;
      }
      else {
        // TODO: Optimize this.
        tljsstr = "javascript:";
        tlcheck = tlhrefstr.substr(0, tljsstr.length);
        if (tlcheck.toLowerCase() === tljsstr) {
          ClientConfig.tlIEhref = true;
        }
      }
    }

    tlName = Client.tlGetName(itemSource);


    tlNodeID = itemSource.id;
    if (!Client.CheckIfIdValid(itemSource)) {
      // DO NOT pass a non-unique or blacklisted id.
      tlNodeID = "";
    }

    if ((domEventType === "blur" || domEventType === "change") && itemSource.TeaLeafFocusTime) {
      dwellTime = TeaLeaf.Event.tlDateDiff(new Date(), itemSource.TeaLeafFocusTime);
      itemSource.TeaLeafFocusTime = null;
    }

    tlRepValue = null;
    tlManualName = null;
    tlAddNameValueArrayManualName = [];

    if (!Client.tlIsExcluded(itemSource)) {
      if (!itemSource.value && domEventType === "change" &&
          itemSource.tagName.toUpperCase() === "SELECT")
      {
        i = itemSource.selectedIndex;

        if (i >= 0 && i < itemSource.options.length) {
          /* Option text does not go through privacy blocking as it is not user input. */
          tlRepValue = escape(itemSource.options[i].text);
        }
      }
      else {
        tlRepValue = Client.tlReplaceValue(itemSource);
      }

      if (tlRepValue) {
        tlManualName = TeaLeaf.Event.tlFormatXMLName(tlName);

        if (!tlManualName) {
          // Default to deriving the "ValueIn" attribute value from the Xpath
          tlManualName = tlXpath;
          tlManualName = TeaLeaf.Event.tlFormatXMLName(tlManualName);
        }
      }

      /* Special processing for checkbox and radio button input types
       * to indicate their checked/unchecked state
       */
      if (itemSourceType === "checkbox" || itemSourceType === "radio") {
        controlIsBoolean = true;
        itemChecked = !!itemSource.checked;
      }
    }

    targetObj = {
      'Name': itemSource.name,
      'Id': tlNodeID,
      'ElementType': itemSourceType,
      'TagName': itemSource.tagName,
      'XPath': tlXpath,
      'TimeInControl': dwellTime
    };
    guiEventObj = targetObj;
    if (tlManualName && tlRepValue) {
      guiEventObj.ValueIn = tlManualName;
      guiEventObj[tlManualName] = tlRepValue;
    }
    if (controlIsBoolean) {
      guiEventObj.Checked = itemChecked ? 'True' : 'False';
    }

    // Create and enqueue the GUI event
    guiEvent = TeaLeaf.Event.createGuiEvent(domEvent.type, guiEventObj);
    if (typeof additionalEventObj === "object") {
      guiEvent = TeaLeaf.extend(additionalEventObj, guiEvent);
    }
    if (typeof additionalStateObj === "object") {
      guiEvent = TeaLeaf.extend(additionalStateObj, guiEvent);
    }
    if (ClientConfig.tlEnableAttr && customAttributesObj) {
      guiEvent = TeaLeaf.extend(customAttributesObj, guiEvent);
    }
    TeaLeaf.eventQ.enqueue(guiEvent);
    TeaLeaf.tlKeepAlive();
  };


	/**
    * Handle the resize event.
    * @param tlEvent DOM event.
    * @requires 
    * TeaLeafClientCfg.js
    * TeaLeafEvent.js
    * @addon
   */
  TeaLeaf.Client.tlQueueResize = function (tlEvent) {
		TeaLeaf.Client.tlSendKeys();
		TeaLeaf.Client.tlSendScroll(null, true);
		if( ! tlEvent ) {
			tlEvent = window.event;
		}
		if( tlEvent.clientX) {
			TeaLeaf.ResizeClientX = tlEvent.clientX;
			TeaLeaf.ResizeClientY = tlEvent.clientY;
			TeaLeaf.ResizeScreenX = tlEvent.screenX;
			TeaLeaf.ResizeScreenY = tlEvent.screenY;
		}
		else {
			TeaLeaf.ResizeClientX = tlEvent.target.width;
			TeaLeaf.ResizeClientY = tlEvent.target.height;
		}
	};

  /**
    * Attach listeners to all controls including controls in frames.
    *
    * @requires 
    * TeaLeafClientCfg.js
    * TeaLeafEvent.js
    * @addon
   */
  TeaLeaf.Client.tlAttachToAllControls = function () {
    TeaLeaf.Client.Configuration.tlcontrolsattached = true;

    // Attach to the main window
    TeaLeaf.Client.tlAttachToControls(window);

    if (TeaLeaf.Client.Configuration.attachToFrames) {
    // Attach to the frame controls
    try {
      var	ind;
      for (ind=0; ind < window.frames.length; ind++) {
        if (window === window.frames[ind]) {
          continue;
        }
        TeaLeaf.Client.tlAttachToControls(window.frames[ind]);
      }
    }
    catch(e) {
      // XXX Debug here
    }
    }
  };
	
	/**
    * Attach listeners for specified events to specified controls.
    * 
    * @requires 
    * TeaLeafClientCfg.js
    * TeaLeafEvent.js
    * @addon
   */
	TeaLeaf.Client.tlSingleAttach = function() {	
	    var i,
	        func,
	        tldomsingleelements = TeaLeaf.Client.Configuration.tlSingleAttach,
	        tlelement;
	
        for(i=0; i<tldomsingleelements.length; i++){      
            if (tldomsingleelements[i].domelementID) {
                tlelement = document.getElementById(tldomsingleelements[i].domelementID);
                if(tlelement){
                    func = eval(tldomsingleelements[i].tlhandler);
                    TeaLeaf.Event.tlAddHandler(tlelement, tldomsingleelements[i].domevent, func, false);   
                }            
            }
        }
	};

  /**
    * Attach listeners to controls based on the configuration.
    * @param win window object.
    * @requires 
    * TeaLeafClientCfg.js
    * TeaLeafEvent.js
    * @addon
   */
  TeaLeaf.Client.tlAttachToControls = function(win) {
    try {
      // Attach to all listeners for all the window and document controls.
      var i,
          func,
          handlers = TeaLeaf.Client.Configuration.tlWindowHandlers;
      for (i=0; i < handlers.length; i++) {
        if (handlers[i].load) {
          func = eval(handlers[i].tlhandler);
          TeaLeaf.Event.tlAddHandler(win, handlers[i].domevent, func, false);
        }
      }

      handlers = TeaLeaf.Client.Configuration.tlDocumentHandlers;
      for (i=0; i < handlers.length; i++) {
        if (handlers[i].load) {
          func = eval(handlers[i].tlhandler);
          TeaLeaf.Event.tlAddHandler(win.document, handlers[i].domevent, func, false);
        }
      }

      // Look for the individual controls
      TeaLeaf.Client.tlProcessNode(win.document.body);
    }
    catch (e) {
      // Do nothing!
    }
  };
	/**
    * Check if a handler is attached to a control, otherwhise,
    * if the control is INPUT or SELECT attach focus, blur and change 
    * @param control control to check.
    * @requires 
    * TeaLeafEvent.js
    * @addon
   */
    TeaLeaf.Client.tlCheckAttach = function (control) {
        var i,
            handlers;

        // Already got this control
        if (control.TeaLeaf || control.TeaLeafExclude) {
            return;
        }
        control.TeaLeaf = true;
        // Set the visit count to 0
        control.TealeafVC = 0;
        // TODO: Save off the controls initial/default state.

        // Double check for the listed tagnames. If it matches, attach
        // for focus, blur and change, since the document object won't see these
        switch (control.tagName) {
            case "INPUT":
            case "SELECT":
            case "TEXTAREA":
                TeaLeaf.Event.tlAddHandler(control, 'focus', TeaLeaf.Client.tlSetFocusTime, false);
                TeaLeaf.Event.tlAddHandler(control, 'blur', TeaLeaf.Client.tlHandleBlur, false);
                TeaLeaf.Event.tlAddHandler(control, 'change', TeaLeaf.Client.tlAddEvent, false);
                break;
        }

        if (TeaLeaf.Client.Configuration.tlUniversalAttach) {
            handlers = TeaLeaf.Client.Configuration.tlDocumentHandlers;
            for (i=0; i < handlers.length; i++) {
                if (handlers[i].load) {
                    TeaLeaf.Event.tlAddHandler(control, handlers[i].domevent, eval(handlers[i].tlhandler), false);
                }
            }
        }
    };

  /**
   * Attach to the given DOM node and all descendants
   * @param obj (Optional) DOM object or element id. If obj is null or
   *                       an invalid id string then tlProcessNode defaults
   *                       to using document body.
   * @param ignore_descendants (Optional) boolean to ignore child nodes
   * @addon
   */
  TeaLeaf.Client.tlProcessNode = function(obj, ignore_descendants) {
    var i, j,
        explicit_tags,
        items;

    if (typeof(obj) === "string") {
      obj = document.getElementById(obj);
    }
    if (!obj) {
      obj = window.document.body;
    }
        try {
            switch (obj.tagName) {
                case "INPUT":
                case "SELECT":
                case "TEXTAREA":
                    TeaLeaf.Client.tlCheckAttach(obj);
                    break;
                default:
                    if (TeaLeaf.Client.Configuration.tlUniversalAttach &&
                        TeaLeaf.Client.tlTagNameAllowed(obj.tagName))
                    {
                        TeaLeaf.Client.tlCheckAttach(obj);
                    }
                    break;
            }

            if (!ignore_descendants) {
                explicit_tags = ["INPUT","SELECT","TEXTAREA"];
                for (i=0; i < explicit_tags.length; i++) {
                    items = obj.getElementsByTagName(explicit_tags[i]);
                    for (j=0; j < items.length; j++) {
                        TeaLeaf.Client.tlCheckAttach(items[j]);
                    }
                }

                if (TeaLeaf.Client.Configuration.tlUniversalAttach) {
                    if (TeaLeaf.Client.Configuration.tlExcludeTags) {
                        items = obj.getElementsByTagName("*");
                        for (i=0; i < items.length; i++) {
                            if (TeaLeaf.Client.tlTagNameAllowed(items[i].tagName)) {
                                TeaLeaf.Client.tlCheckAttach(items[i]);
                            }
                        }
                    }
                    else {
                        for (i in TeaLeaf.Client.Configuration.tlNodeTags) {
                            items = obj.getElementsByTagName(i);
                            for (j=0; j < items.length; j++) {
                                TeaLeaf.Client.tlCheckAttach(items[j]);
                            }
                        }
                    }
                }
            }
        }
        catch (e) {
        // Do nothing!
        }
    };
    (function (Client) {
        var savedTargetState = {};

        Client.parseTarget = function (target) {
            var i = 0,
                targetId = "",
                targetIdType = 0,
                targetState = {},
                targetType = TeaLeaf.getNodeType(target),
                targetValue = "";

            if (!target || Client.tlIsExcluded(target)) {
                return {};
            }
            targetId = Client.CheckIfIdValid(target) ? target.id : "";
            if (!targetId) {
                targetId = Client.tlGetXPathFromNode(target);
                targetIdType = -2;
            }
            else {
                targetIdType = -1;
            }
            switch (targetType) {
                case "radio":
                case "checkbox":
                    targetState.checked = target.checked;
                    /* Intentional fall through. */
                default:
                    if (target.tagName.toUpperCase() === "SELECT") {
                        i = target.selectedIndex;
                        if (i >= 0 && i < target.options.length) {
                            /* Option text does not go through privacy blocking as it is not user input. */
                            targetValue = escape(target.options[i].text);
                        }
                    }
                    else {
                        targetValue = target.value ? Client.tlReplaceValue(target) : "";
                    }
                    break;
            }
            targetState.value = targetValue;
            return {
                "id": targetId,
                "idType": targetIdType,
                "state": targetState
            };
        };

        Client.saveTargetState = function (itemSource) {
            var targetState = Client.parseTarget(itemSource);
            if (savedTargetState.id === targetState.id) {
                // Do not overwrite previously saved state of the same target.
                return;
            }
            savedTargetState = targetState;
            savedTargetState.timestamp = (new Date()).getTime();
            itemSource.TealeafVC = itemSource.TealeafVC || 0;
            itemSource.TealeafVC += 1;
            savedTargetState.visitCount = itemSource.TealeafVC;
        };

        Client.getSavedTargetState = function () {
            return savedTargetState;
        };

        Client.clearSavedTargetState = function () {
            savedTargetState = {};
        };
    }(TeaLeaf.Client));
    /**
     * Handle focus event.
     * @param theEvent DOM event.
     */
    TeaLeaf.Client.tlSetFocusTime = function (theEvent) {
        var itemSource,
            itemSourceType;

        if (!theEvent) {
            theEvent = window.event;
        }
        itemSource = TeaLeaf.Client.tlGetEventSource(theEvent);
        itemSourceType = TeaLeaf.getNodeType(itemSource);
        if (!itemSource || itemSourceType === "application/x-shockwave-flash") {
            return;
        }
        try {
            // Save off the value
            TeaLeaf.Client.saveTargetState(itemSource);
            if (!itemSource.TeaLeafFocusTime) {
                itemSource.TeaLeafFocusTime = new Date();
            }
        }
        catch (e) {
            // Do nothing!
        }
        // If we are sending the focus event, then send it!
        if (TeaLeaf.Client.Configuration.tlsendfocus) {
            TeaLeaf.Client.tlAddEvent(theEvent);
        }
    };
	/**
    * Handle blur event.
    * @param theEvent DOM event.
    * @requires 
    * TeaLeafClientCfg.js
    * @addon
   */
	TeaLeaf.Client.tlHandleBlur = function(theEvent) {
    var itemSource,
        itemSourceType;

		//	Check for a null
		if( ! theEvent ) {
			theEvent = window.event;
		}
		//	We need the item source.  Ignore flash
    itemSource = TeaLeaf.Client.tlGetEventSource(theEvent);
    itemSourceType = TeaLeaf.getNodeType(itemSource);
		if (!itemSource || itemSourceType === "application/x-shockwave-flash") {
			return;
		}
		TeaLeaf.Client.tlEndVisit(itemSource);
    if(TeaLeaf.Client.checkIsInput(itemSource)) {
      TeaLeaf.Event.Configuration.tlidoflastvisitedcontrol = TeaLeaf.Client.tlGetName(itemSource);
    }
		//	Send the event?
		if( TeaLeaf.Client.Configuration.tlsendblur ) {
			TeaLeaf.Client.tlAddEvent(theEvent);
		}
		itemSource.TeaLeafFocusTime = null;
	};
	/**
    * Last element visited.
    * @param itemSource DOM element.
    * @requires 
    * TeaLeafClientCfg.js
    * @addon
   */
	TeaLeaf.Client.tlEndVisit = function(itemSource) {
    var diff,
        entry,
        name;
		if( itemSource.TeaLeafFocusTime ) {
			name = TeaLeaf.Client.tlGetName(itemSource);
			if( ! name ) {
				name = TeaLeaf.Client.tlGetAnchor(itemSource, false);
				if( name ) {
					name = "LEVEL" + name;
				}
				else {
					name = "unnamed";
				}
			}
			diff = TeaLeaf.Event.tlDateDiff(itemSource.TeaLeafFocusTime, new Date());
			entry = name + ':' + diff;

      if (TeaLeaf.Event.Configuration.tlvisitorder) {
        TeaLeaf.Event.Configuration.tlvisitorder = TeaLeaf.Event.Configuration.tlvisitorder + ";" + entry;
      }
      else {
        TeaLeaf.Event.Configuration.tlvisitorder = entry;
      }
    }
  };
	/**
    * Detach from all controls including frames.
    *
    * @requires 
    * TeaLeafClientCfg.js
    * @addon
   */
	TeaLeaf.Client.tlDetachFromAllControls = function() {
		//	Mark as not attached
		TeaLeaf.Client.Configuration.tlcontrolsattached = false;

		//	Attach to this window
		TeaLeaf.Client.tlDetachFromControls(window);

		//	Do the frames
		try{
			var	ind,
			    w;
			for(ind = 0; ind < window.frames.length; ind++) {
				w = window.frames[ind];
				TeaLeaf.Client.tlDetachFromControls(w);
			}
		}
		catch(e){}
	};
	/**
    * Detach listeners to controls based on the configuration. 
    * @param win window object.
    * @requires 
    * TeaLeafClientCfg.js
    * TeaLeafEvent.js
    * @addon
   */
	TeaLeaf.Client.tlDetachFromControls = function(win) {
	try{
	    var i,
	        func,
	        handlers = TeaLeaf.Client.Configuration.tlWindowHandlers,
          items;
	    for(i=0; i<handlers.length; i++) {
	        func = eval(handlers[i].tlhandler);
	        TeaLeaf.Event.tlRemoveHandler(win, handlers[i].domevent, func, false);
	    }
	    handlers = TeaLeaf.Client.Configuration.tlDocumentHandlers;
	    for(i=0; i<handlers.length; i++) {
	        func = eval(handlers[i].tlhandler);
	        TeaLeaf.Event.tlRemoveHandler(win.document, handlers[i].domevent, func, false);
	    }

	    // Detach from Individual Items
	    items = win.document.getElementsByTagName("INPUT");
	    for(i = 0; i < items.length; i++) {
	        TeaLeaf.Event.tlRemoveHandler(items[i], 'change', TeaLeaf.Client.tlAddEvent, false);
            TeaLeaf.Event.tlRemoveHandler(items[i], 'blur',   TeaLeaf.Client.tlHandleBlur, false);
	        items[i].TeaLeaf = false;
	    }
	    items = win.document.getElementsByTagName("SELECT");
	    for(i = 0; i < items.length; i++) {
	        TeaLeaf.Event.tlRemoveHandler(items[i], 'change', TeaLeaf.Client.tlAddEvent, false);
            TeaLeaf.Event.tlRemoveHandler(items[i], 'blur',   TeaLeaf.Client.tlHandleBlur, false);
	        items[i].TeaLeaf = false;
	    }
	} 
	catch(e) { }
  };
  /**
  * Attach a listener to a specific control. 
  * @param domelement DOM element.
  * @param eventtype TeaLeaf Event type.
  * @param eventHandler Event handler.
  * @requires 
  * TeaLeafEvent.js
  * @addon
   */
  TeaLeaf.Client.tlAttachToControl = function(domelement, eventtype, eventHandler) {
    if(eventHandler){
        TeaLeaf.Event.tlAddHandler(domelement, eventtype, eventHandler, false);
    }
    else{
        TeaLeaf.Event.tlAddHandler(domelement, eventtype, eval(TeaLeaf.Client.tlAddEvent), false);
    }
  };
  /**
  * Detach a listener to a specific control. 
  * @param domelement DOM element.
  * @param eventtype TeaLeaf Event type.
  * @param eventHandler Event handler.
  * @requires 
  * TeaLeafEvent.js
  * @addon
   */
  TeaLeaf.Client.tlDetachFromControl = function(domelement, eventtype, eventHandler) {
    if(eventHandler){
        TeaLeaf.Event.tlRemoveHandler(domelement, eventtype, eventHandler, false);
    }
    else{
        TeaLeaf.Event.tlRemoveHandler(domelement, eventtype, eval(TeaLeaf.Client.tlAddEvent), false);
    }
  };

  /**
  * Scan the DOM based on a timer set in the configuration and attach
  * to controls that might have been rendered due to a DOM update. 
  *
  * @requires 
  * TeaLeafClientCfg.js
  * @addon
   */
  TeaLeaf.Client.tlScanForAdditions = function () {
    var i,
        w;

    if (!TeaLeaf.Client.Configuration.tlScheduledScan) {
      return;
    }

    // Attach to the main window
    TeaLeaf.Client.tlProcessNode(document.body);
    // attach to the frames
    try {
      for (i = 0; i < window.frames.length; i++) {
        w = window.frames[i];
        TeaLeaf.Client.tlProcessNode(w.document.body);
      }
    }
    catch(e) {
      // Do nothing!
    }

    window.clearTimeout(TeaLeaf.Client.tlTimeoutID);
    TeaLeaf.Client.tlTimeoutID = window.setTimeout(TeaLeaf.Client.tlScanForAdditions, TeaLeaf.Client.Configuration.tlscanupdate);
  };

  TeaLeaf.Client.tlTagNameAllowed = function (tag) {
    if (!tag) {
      return false;
    }
    var tagVal = TeaLeaf.Client.Configuration.tlNodeTags[tag];
    if (!tagVal) {
      tagVal = false;
    }
    if (TeaLeaf.Client.Configuration.tlExcludeTags) {
      return !tagVal;
    }
    return tagVal;
  };

  /**
  * Setup function that attaches to all the controls on the page. 
  * @addon
   */
  TeaLeaf.Client.tlSetup = function() {
    // If a previous event queue was stored in the cookie, apply it to the current queue
    var queuedXML = TeaLeaf.tlGetCookieValue("tlQueuedXML");
    if (queuedXML) {
      TeaLeaf.Event.tlQueuedXML += queuedXML.replace(/%3B/g, ";");
    }

		//	Get the lists we want to get
		TeaLeaf.Client.tlAttachToAllControls();	
		TeaLeaf.Client.tlSingleAttach();

    if (TeaLeaf.Event.Configuration.tlcatchpopups) {
      // Hook on to window.open()
      TeaLeaf.SavedWindowOpen = window.open;
      window.open = function(url, name, features, replace) {
        var guiEvent,
            status = "blocked",
            subWin;
        if (typeof TeaLeaf.SavedWindowOpen === "function") {
          // FF and other DOM compliant browsers
          subWin = TeaLeaf.SavedWindowOpen.apply(this, arguments);
        }
        else {
          // The rest
          url = url || "";
          name = name || "";
          features = features || "";
          subWin = TeaLeaf.SavedWindowOpen(url, name, features, replace);
        }
        try {
          if (!subWin.closed) {
            status = "visible";
          }
        }
        catch(exc) {
        // Do nothing!
        }

        guiEvent = TeaLeaf.Event.createGuiEvent("WindowOpen", {
                     'status': status,
                     'url': escape(url),
                     'name': name,
                     'features': features,
                     'replace': replace
                   });
        TeaLeaf.eventQ.enqueue(guiEvent);

        return subWin;
      };
    }

		//	At this point, lets scan periodically for added controls
		window.clearTimeout(TeaLeaf.Client.tlTimeoutID);
		
		if(TeaLeaf.Client.Configuration.tlscanupdate >0 ){
            TeaLeaf.Client.tlTimeoutID = window.setTimeout(TeaLeaf.Client.tlScanForAdditions, TeaLeaf.Client.Configuration.tlscanupdate);
        }
        

    };
  /**
   * Initialize the call to tlSetup UI Client Event
   * Capture is not used as an SDK.
   * @requires
   * TeaLeafEvent.js
   * @addon
   */
  TeaLeaf.Client.CallInit = function() {
    TeaLeaf.addOnLoad(TeaLeaf.Client.tlSetup);
  };
  if (!TeaLeaf.Client.Configuration.tlinit) {
    TeaLeaf.Client.Configuration.tlinit = true;
    TeaLeaf.Client.CallInit();
  }
}
ANF_helper.tealeaf = (function ($, ANF) {

	return {
		/**
		@author Collin Moser
		@description Initialize TeaLeaf event handlers
		*/
		init : function() {
		},
		behaviors : function() {
		}
	};
})( jQuery, ANF );