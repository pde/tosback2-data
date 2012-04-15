/*                                                                  
* Copyright © 1999-2010 TeaLeaf Technology, Inc.  
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
* It contains versioning information and the the flag thant turns 
* the JavaScript into a true SDK.  
*
* @version 2010.10.04.1
*                                                                   
*/
if (typeof TeaLeaf === "undefined") {
  TeaLeaf = {};
  TeaLeaf.Private = {};
  TeaLeaf.tlStartLoad = new Date();

  if (!TeaLeaf.Configuration) {
    TeaLeaf.Configuration = {
      "tlversion" :                 "2010.10.04.1.P35885",
      "tlinit" :                    false,
      "tlSDK" :                     false,

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

      "tlurl":                      "/common/js/teaLeaf/TeaLeafTarget.html",
      "tlsecureurl":                "/common/js/teaLeaf/TeaLeafTarget.html",
      "xhrAsync":                   true,

      /* Cross-domain configuration (if any) */
      "xd_CommonDomain":            "",
      "xd_iframeID":                "",
      "xd_iframeSrcURL":            "",
      "xd_iframeSrcURLSecure":      ""
    };
  }
}
/*                                                                  
* Copyright © 1999-2010 TeaLeaf Technology, Inc.  
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
* @version 2010.10.04.1
*                                                                   
*/

if (typeof TeaLeaf !== "undefined" &&
    ((typeof TeaLeaf.replay === "function") ? !TeaLeaf.replay() : !TeaLeaf.replay) &&
    !TeaLeaf.Event)
{
	//	Constructor for the Event
    TeaLeaf.Event = function(type, subtype, source) {    
	    this.date = new Date();
	    if( subtype ) {
		    this.EventType    = type;
		    this.EventSubType = subtype;
		    if( source ) {
			    this.EventSource = source;
		    }
		    else{
		        //default is empty string
		        this.EventSource ="";
		    }
	    }
	    else {
		    this.EventType    = "CUSTOM";
		    this.EventSubType = type;
	    }
    }
    
   if(typeof TeaLeaf.Event.Configuration == "undefined"){  
        TeaLeaf.Event.Configuration = {
            "tlinit"                    : false,
            "tlqueueevents"             : true,
            "tlqueueeventstimer"        : 30000,
            "tlqueueeventsmaxsz"        : 8192,
            "tlshowexceptions"          : false,
            "tleventcount"              : 0,
            "tlexceptioncount"          : 0,
            "tlpageid"                  : "", 
            "tlinitflag"                : false,
            "tlbeforeunloadflag"        : false,
            "tlusetopqueue"             : false,
            "tllastdwelltime"           : "",
            "tlidoflastvisitedcontrol"  : "",
            "tleventunloadflag"         : true,
            "tleventbeforeunloadflag"   : true,
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
            "tlXP"                      : "",
		    "tlXPCount"                 : 0,
		    "tlXPTable"                 : "",
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
		        {"tlreqhttpheadername": "Content-Type",                     "tlsethttpheader": true,    "tlreqhttpheadervalue": "TeaLeaf.Event.tlGetContentType()"},
			    {"tlreqhttpheadername": "X-TeaLeafType",                    "tlsethttpheader": true,    "tlreqhttpheadervalue": "TeaLeaf.Event.tlEventType()"},
			    {"tlreqhttpheadername": "X-TeaLeafSubType",                 "tlsethttpheader": true,    "tlreqhttpheadervalue": "TeaLeaf.Event.tlEventSubType()"},
			    {"tlreqhttpheadername": "X-TeaLeaf-Page-Url",               "tlsethttpheader": true,    "tlreqhttpheadervalue": "TeaLeaf.Event.tlGetUrlPath()"},
                {"tlreqhttpheadername": "X-TeaLeaf-UIEventCapture-Version", "tlsethttpheader": true,    "tlreqhttpheadervalue": "TeaLeaf.Event.tlGetJSVersion()"}
		    ],   
		    //This is the list of HTTP headers that have the eval value at the time of POST
		    tlHTTPRequestHeadersEvalInit:[
			    {"tlreqhttpheadername": "X-TeaLeaf-Screen-Res",         "tlsethttpheader": true,    "tlreqhttpheadervalue": "TeaLeaf.Event.tlResolutionType(screen.width ,screen.height)"},
			    {"tlreqhttpheadername": "X-TeaLeaf-Browser-Res",        "tlsethttpheader": true,    "tlreqhttpheadervalue": "TeaLeaf.Event.tlResolutionTypeBrowser()"},
			    {"tlreqhttpheadername": "X-TeaLeaf-Page-Render",        "tlsethttpheader": true,    "tlreqhttpheadervalue": "TeaLeaf.Event.tlGetRenderTime()"},
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
}

/*                                                                  
* Copyright © 1999-2010 TeaLeaf Technology, Inc.  
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
* @version 2010.10.04.1
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
            "tlinitpost" : true,
            
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
* Copyright © 1999-2010 TeaLeaf Technology, Inc.  
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
* @version 2010.10.04.1
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
		    "tlsendblur"         : true,
		    "tlunloadflag"       : true,
		    "tlactiontype"       : "No Submit",
		    "tlbeforeunloadflag" : true,
		    "tlcontrolsattached" : false,
		    "tlassignTLID"       : false,   
		    "tlscanupdate"       : 0,
		    "tlIEhref"           : false,
		    "tlEnableAttr"       : false,
		    "tlDiscardInvalidXPath"  : false,
		    "tlUniqueIDCheckEnabled" : false,

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
        //    name and/or id: JavaScript regular expression to match against the name and/or id of the field
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
          // Mask all field names that have "creditcard" or "password" substrings using the PreserveMask() function.
          {"name": "creditcard|password", "caseinsensitive": true,  "exclude": false, "mask": function () { return TeaLeaf.Client.PreserveMask.apply(this, arguments); }}
          // Mask all field ids that match pvt0, pvt1 ... pvt9 using the EmptyMask() function.
          {"id": "^pvt[0-9]$",           "caseinsensitive": true,  "exclude": false, "mask": function () { return TeaLeaf.Client.EmptyMask.apply(this, arguments); }}
          // Paranoid mode: Mask all name and id values with the BasicMask() function.
          {"id": ".*", "name": ".*",     "caseinsensitive": false, "exclude": true,  "mask": function () { return TeaLeaf.Client.BasicMask.apply(this, arguments); }}
        */
           //      {"id": "cardnumber|securitycode|cardExpMonth|cardExpYear", "caseinsensitive": true,  "exclude": false, "mask": function () { return TeaLeaf.Client.PreserveMask.apply(this, arguments); }}		    
           {"id": "cardnumber|securitycode|cardExpMonth|cardExpYear|loginPassword", "caseinsensitive": true,  "exclude": false, "mask": function () { return TeaLeaf.Client.PreserveMask.apply(this, arguments); }}		    

        ],

	      // The mask used by the PreserveMask() masking function.
		    tlPrivacyMask: {
		      "upperChar":   "X",
		      "lowerChar":   "x",
		      "numericChar": "1",
		      "symbolChar":  "#"
		    },
		
		    //	This is the list of events we catch off of the window object
		    tlWindowHandlers:[
			    {"domevent": "resize",          "load": false,  "tlhandler": "TeaLeaf.Client.tlQueueResize"},
			    {"domevent": "focus",           "load": true,  "tlhandler": "TeaLeaf.Client.tlSetFocusTime"},
			    {"domevent": "help",            "load": true,  "tlhandler": "TeaLeaf.Client.tlAddEvent"},
			    {"domevent": "scroll",          "load": false,  "tlhandler": "TeaLeaf.Client.tlQueueScroll"},
			    {"domevent": "beforeprint",     "load": false,  "tlhandler": "TeaLeaf.Client.tlAddEvent"},
			    {"domevent": "afterprint",      "load": false,  "tlhandler": "TeaLeaf.Client.tlAddEvent"}
		    ],

		    //	This is the list of events we catch off of the document object
		    tlDocumentHandlers:[
			    {"domevent": "click",        "load": true,     "tlhandler": "TeaLeaf.Client.tlAddEvent"},
			    {"domevent": "dblclick",     "load": true,     "tlhandler": "TeaLeaf.Client.tlAddEvent"},
			    {"domevent": "keyup",        "load": true,     "tlhandler": "TeaLeaf.Client.tlQueueKey"},
			    {"domevent": "mousedown",    "load": true,     "tlhandler": "TeaLeaf.Client.tlAddEvent"},
			    {"domevent": "mouseup",      "load": false,     "tlhandler": "TeaLeaf.Client.tlAddEvent"},
			    {"domevent": "mouseover",    "load": false,     "tlhandler": "TeaLeaf.Client.tlAddEvent"},
			    {"domevent": "mouseout",      "load": false,     "tlhandler": "TeaLeaf.Client.tlAddEvent"},
			    //	This event is only caught once and turned off.  This is used to 
			    //	detect robots, since a robot will never have mouse movement.
			    {"domevent": "mousemove",    "load": false,     "tlhandler": "TeaLeaf.Client.tlUserMovement"}
		    ],
		    
		    tlSingleAttach:[
			    {"domelementID": "",    "domevent": "mousedown",    "tlhandler": "TeaLeaf.Client.tlAddEvent"},
			    {"domelementID": "",    "domevent": "mouseup",      "tlhandler": "TeaLeaf.Client.tlAddEvent"},
			    {"domelementID": "",    "domevent": "mouseover",    "tlhandler": "TeaLeaf.Client.tlAddEvent"},
			    {"domelementID": "",    "domevent": "mouseout",     "tlhandler": "TeaLeaf.Client.tlAddEvent"},
			   	{"domelementID": "verificationButton",    "domevent": "click",     	"tlhandler": "TeaLeaf.Client.tlAddEvent"}
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
if (typeof TeaLeaf !== "undefined" && ((typeof TeaLeaf.replay === "function") ? !TeaLeaf.replay() : !TeaLeaf.replay) && TeaLeaf.Configuration && !TeaLeaf.Configuration.tlinit) {
    TeaLeaf.Configuration.tlinit = true;
    if (!TeaLeaf.tlBrowser) {
        TeaLeaf.tlBrowser = {
            UNKNOWN: true
        }
    }
    if (!TeaLeaf.$C) {
        TeaLeaf.$C = function (a) {
            return a
        }
    }
    if (!Array.prototype.push) {
        Array.prototype.stackEnd = 0;
        Array.prototype.push = function (a) {
            this[this.stackEnd] = a;
            this.stackEnd++
        }
    }
    if (!Array.prototype.pop) {
        Array.prototype.pop = function (a) {
            this.stackEnd--;
            return this[this.stackEnd]
        }
    }
    TeaLeaf.XHRFactory = (function () {
        var a;
        a = 60000;

        function b(c) {
            if ((c >= 200 && c < 300) || c === 304) {
                return true
            }
            return false
        }
        return {
            createXHRObject: function () {
                var d, c, g;
                c = [function () {
                    return new XMLHttpRequest()
                }, function () {
                    return new ActiveXObject("Msxml2.XMLHTTP.6.0")
                }, function () {
                    return new ActiveXObject("Microsoft.XMLHTTP")
                }];
                for (d = 0; d < c.length; d++) {
                    try {
                        g = c[d]()
                    } catch (f) {
                        continue
                    }
                    if (g) {
                        this.createXHRObject = c[d];
                        return g
                    }
                }
                return null
            },
            xhrRequest: function (h, l, c, j, o, m, n) {
                var f, d;
                if (!h || !l) {
                    return null
                }
                h = h.toUpperCase();
                if (!n) {
                    n = this.createXHRObject()
                }
                if (!n) {
                    return null
                }
                if (o) {
                    n.onreadystatechange = function () {
                        var p, r;
                        try {
                            switch (n.readyState) {
                            case 0:
                                break;
                            case 1:
                                break;
                            case 2:
                                if (m && m.loaded) {
                                    try {
                                        p = n.status;
                                        r = n.statusText
                                    } catch (q) {
                                        if (!p) {
                                            p = 0
                                        }
                                        if (!r) {
                                            r = "None"
                                        }
                                    } finally {
                                        m.loaded(p, r)
                                    }
                                }
                                break;
                            case 3:
                                break;
                            case 4:
                                if (b(n.status)) {
                                    if (m && m.success) {
                                        m.success(n.responseText, n.responseXML)
                                    }
                                } else {
                                    if (m && m.failure) {
                                        m.failure(n.status, n.statusText)
                                    }
                                }
                                break;
                            default:
                                break
                            }
                        } catch (q) {}
                    }
                }
                n.open(h, l, o);
                if (c) {
                    for (f = 0; f < c.length; f++) {
                        n.setRequestHeader(c[f].name, c[f].value)
                    }
                }
                if (h !== "POST" || !j) {
                    j = null
                }
                n.send(j);
                try {
                    d = setTimeout(function () {
                        TeaLeaf.XHRFactory.deleteXHRObj(n)
                    }, a);
                    n.timeoutID = d
                } catch (g) {}
                return n
            },
            deleteXHRObj: function (c) {
                if (c && c.readyState !== 4) {
                    if (c.abort) {
                        c.abort()
                    }
                }
                if (c.timeoutID) {
                    clearTimeout(c.timeoutID);
                    c.timeoutID = null
                }
                c.onreadystatechange = function () {};
                c = null
            }
        }
    })();
    TeaLeaf.Request = function () {
        var b, c, d, a;
        b = c = a = null;
        d = "POST";
        this.getUrl = function () {
            var l, h, g, j, f;
            if (a) {
                return a
            }
            l = TeaLeaf.Configuration;
            j = window.location;
            f = j.protocol;
            g = f + "//" + j.host;
            if (f == "http:") {
                h = l.tlurl
            } else {
                h = l.tlsecureurl
            }
            if (h.substr(0, 1) == "/") {
                g += h
            } else {
                g += j.pathname.substr(0, j.pathname.lastIndexOf("/") + 1) + h
            }
            return g
        };
        this.setUrl = function (f) {
            a = f
        };
        this.getMethod = function () {
            return d
        };
        this.setMethod = function (f) {
            d = f
        };
        this.getData = function () {
            return b
        };
        this.setData = function (f) {
            var g;
            b = f;
            if (b) {
                g = TeaLeaf.Request.totalDataLength || 0;
                g += b.length;
                TeaLeaf.Request.totalDataLength = g
            }
        };
        this.getHeaders = function () {
            return c
        };
        this.setHeaders = function (f) {
            c = f
        };
        this.clear = function () {
            b = c = a = null
        }
    };
    TeaLeaf.Request.prototype = {
        send: function (j) {
            var a, c, b, d, h, g;
            h = TeaLeaf.Configuration;
            if (!h.xd_iframeID) {
                g = TeaLeaf.XHRFactory.xhrRequest(this.getMethod(), this.getUrl(), this.getHeaders(), this.getData(), h.xhrAsync, j);
                if (!g) {
                    if (j && j.failure) {
                        j.failure(0, "XHR request failed!")
                    }
                    return
                }
            } else {
                try {
                    a = document.getElementById(h.xd_iframeID);
                    if (!a || !a.contentWindow) {
                        if (j && j.failure) {
                            j.failure(0, "Could not retrive cross-domain iframe target!")
                        }
                        return
                    }
                    c = a.contentWindow;
                    if (c.postMessage && window.JSON && 0) {
                        alert("Not implemented!")
                    } else {
                        d = c.TeaLeaf;
                        if (d && d.Request) {
                            b = new d.Request();
                            b.clear();
                            this.setUrl(b.getUrl());
                            b.setHeaders(this.getHeaders());
                            b.setData(this.getData());
                            b.send(j)
                        }
                    }
                } catch (f) {
                    if (j && j.failure) {
                        j.failure(0, (f.name ? (f.name + ": " + f.message) : f.toString()))
                    }
                    return
                }
            }
        }
    };
    TeaLeaf.Request.GetTotalDataLength = function () {
        var a;
        a = TeaLeaf.Request.totalDataLength || 0;
        return a
    };
    TeaLeaf.settlSDK = function () {
        TeaLeaf.Configuration.tlSDK = true
    };
    TeaLeaf.resettlSDK = function () {
        TeaLeaf.Configuration.tlSDK = false
    };
    TeaLeaf.tlSetPostURL = function (a) {
        TeaLeaf.Configuration.tlurl = a
    };
    TeaLeaf.tlGetPostURL = function () {
        return TeaLeaf.Configuration.tlurl
    };
    TeaLeaf.makeRandomString = function (d, c) {
        var b, a, f;
        if (!d || d <= 0) {
            return
        }
        if (!c) {
            c = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890~!@#$%^+-?"
        }
        f = "";
        for (b = 0; b < d; b++) {
            a = Math.floor(Math.random() * c.length);
            f += c.charAt(a)
        }
        return f
    };
    TeaLeaf.tLoadObjs = [];
    TeaLeaf.addOnLoad = function (b, a) {
        if (arguments.length === 1) {
            TeaLeaf.tLoadObjs.push(b)
        } else {
            if (arguments.length > 1) {
                TeaLeaf.tLoadObjs.push(b[a])
            }
        }
    };
    TeaLeaf.tlSetCookie = function (b, d, a, g, c, f) {
        if (!b) {
            return
        }
        document.cookie = b + "=" + d + (a ? (";expires=" + a.toUTCString()) : "") + ";path=" + (g ? g : "/") + (c ? (";domain=" + c) : "") + (f ? ";secure" : "")
    };
    TeaLeaf.tlGetCookieValue = function (b) {
        var d, a, l, f, g, h;
        h = b + "=";
        g = null;
        f = document.cookie.split(";");
        for (d = 0; d < f.length; d++) {
            l = f[d];
            for (a = 0; l.charAt(a) == " "; a++) {}
            if (a) {
                l = l.substring(a, l.length)
            }
            if (l.indexOf(h) === 0) {
                g = l.substring(h.length, l.length);
                break
            }
        }
        return g
    };
    TeaLeaf.tlEraseCookie = function (b) {
        var a;
        a = new Date(1970, 1, 1);
        TeaLeaf.tlSetCookie(b, "", a)
    };
    TeaLeaf.tlBrowserIsIE = function () {
        var a;
        a = TeaLeaf.tlBrowser;
        if (a) {
            return !!a.MSIE
        }
        return false
    };
    TeaLeaf.tlBrowserIsMozilla = function () {
        var a;
        a = TeaLeaf.tlBrowser;
        if (a) {
            return !!a.MOZILLA
        }
        return false
    };
    TeaLeaf.tlBrowserIsWebKit = function () {
        var a;
        a = TeaLeaf.tlBrowser;
        if (a) {
            return !!a.WEBKIT
        }
        return false
    };
    TeaLeaf.tlBrowserIsOpera = function () {
        var a;
        a = TeaLeaf.tlBrowser;
        if (a) {
            return !!a.OPERA
        }
        return false
    };
    TeaLeaf.tlBrowserIsUnknown = function () {
        var a;
        a = TeaLeaf.tlBrowser;
        if (a) {
            return !!a.UNKNOWN
        }
        return false
    };
    TeaLeaf.PageSetup = function () {
        var f, n, c, j, m, b, d, l, h, a;
        if (document.readyState !== "complete") {
            return
        }
        d = TeaLeaf;
        l = d.Configuration;
        h = l.tlGUIDCookie;
        if (d.PageSetup.Complete) {
            return
        }
        d.PageSetup.Complete = true;
        if (d.PageSetup.Cleanup) {
            d.PageSetup.Cleanup()
        }
        d.tlBrowser.UNKNOWN = false;
        a = navigator.userAgent.toLowerCase();
        if (/opera|presto/.test(a)) {
            d.tlBrowser.OPERA = true
        } else {
            if (/(apple)?webkit|safari|chrome/.test(a)) {
                d.tlBrowser.WEBKIT = true
            } else {
                if (/msie|trident/.test(a)) {
                    d.tlBrowser.MSIE = true
                } else {
                    if (/^(?=.*?\b(mozilla|gecko|firefox)\b)((?!compatible).)*$/.test(a)) {
                        d.tlBrowser.MOZILLA = true
                    } else {
                        d.tlBrowser.UNKNOWN = true
                    }
                }
            }
        }
        if (l.xd_CommonDomain) {
            try {
                document.domain = l.xd_CommonDomain
            } catch (g) {}
        }
        if (l.xd_iframeID) {
            try {
                j = document.getElementById(l.xd_iframeID);
                if (!j) {
                    m = ((window.location.protocol === "http:") ? l.xd_iframeSrcURL : l.xd_iframeSrcURLSecure);
                    if (m) {
                        j = document.createElement("IFRAME");
                        if (j) {
                            j.id = l.xd_iframeID;
                            j.src = m;
                            j.style.display = "none";
                            j.style.visibility = "hidden";
                            document.body.appendChild(j)
                        }
                    }
                }
            } catch (g) {}
        }
        if (l.tlSetGUID) {
            if (!h || !h.name) {} else {
                if (!h.valueLength) {
                    h.valueLength = 32
                }
                if (!h.valueSet) {
                    h.valueSet = "0123456789ABCDEF"
                }
                n = d.tlGetCookieValue(h.name);
                if (!n) {
                    b = new Date();
                    n = d.makeRandomString(h.valueLength, h.valueSet);
                    c = h.expires ? new Date(b.getTime() + h.expires * 60 * 1000) : null;
                    d.tlSetCookie(h.name, n, c, h.path, h.domain, h.secure)
                }
            }
        }
        if (!l.tlSDK) {
            for (f = 0; f < d.tLoadObjs.length; f++) {
                d.tLoadObjs[f]()
            }
        }
        d.EndLoad = new Date()
    };
    if (document.readyState === "complete") {
        TeaLeaf.PageSetup()
    } else {
        if (document.addEventListener) {
            document.addEventListener("DOMContentLoaded", TeaLeaf.PageSetup, false);
            window.addEventListener("load", TeaLeaf.PageSetup, false);
            TeaLeaf.PageSetup.Cleanup = function () {
                var a;
                a = TeaLeaf;
                document.removeEventListener("DOMContentLoaded", a.PageSetup, false);
                window.removeEventListener("load", a.PageSetup, false)
            }
        } else {
            if (document.attachEvent) {
                document.attachEvent("onreadystatechange", TeaLeaf.PageSetup);
                window.attachEvent("onload", TeaLeaf.PageSetup);
                TeaLeaf.PageSetup.Cleanup = function () {
                    var a;
                    a = TeaLeaf;
                    document.detachEvent("onreadystatechange", a.PageSetup);
                    window.detachEvent("onload", a.PageSetup)
                }
            } else {
                if (typeof window.onload === "function") {
                    TeaLeaf.OnLoad = window.onload
                } else {
                    TeaLeaf.OnLoad = null
                }
                window.onload = function () {
                    var a;
                    a = TeaLeaf;
                    a.PageSetup();
                    window.onload = a.OnLoad;
                    if (a.OnLoad) {
                        a.OnLoad()
                    }
                }
            }
        }
    }
}
if (typeof TeaLeaf !== "undefined" && ((typeof TeaLeaf.replay === "function") ? !TeaLeaf.replay() : !TeaLeaf.replay) && TeaLeaf.Event && TeaLeaf.Event.Configuration) {
    try {
        if (typeof TeaLeaf_PageID == "undefined") {
            TeaLeaf_PageID = null
        }
    } catch (e) {
        TeaLeaf_PageID = null
    }
    TeaLeaf.Event.tlQueuedXML = "";
    TeaLeaf.Event.tlQueuedXPXML = "";
    TeaLeaf.Event.tlWindowObjects = [{
        tlWindowName: "",
        tlWindowObject: ""
    }];
    TeaLeaf.Event.tlGetContentType = function () {
        var a = "text/xml";
        return a
    };
    TeaLeaf.Event.tlGetTeaLeafXEvent = function () {
        var a = TeaLeaf.$C("ClientEvent");
        return a
    };
    TeaLeaf.Event.tlEventType = function () {
        var a;
        a = TeaLeaf.Event.SetType;
        TeaLeaf.Event.SetType = "";
        return a
    };
    TeaLeaf.Event.tlEventSubType = function () {
        var a;
        a = TeaLeaf.Event.SetSubType;
        TeaLeaf.Event.SetSubType = "";
        return a
    };
    TeaLeaf.Event.tlGetUrlPath = function () {
        var a = window.location.pathname;
        return a
    };
    TeaLeaf.Event.tlGetJSVersion = function () {
        return TeaLeaf.Configuration.tlversion
    };
    TeaLeaf.Event.tlResolutionType = function (d, a) {
        var c = TeaLeaf.Event.Configuration.tlResolution;
        for (var b = 0; b < c.length; b++) {
            if (d <= c[b].width || a <= c[b].height) {
                return c[b].type
            }
        }
        return c[c.length - 1].type
    };
    TeaLeaf.Event.tlResolutionTypeBrowser = function () {
        var b = 0;
        var a = 0;
        if (window.innerWidth) {
            b = window.innerWidth;
            a = window.innerHeight
        } else {
            if (document.documentElement && document.documentElement.clientWidth) {
                b = document.documentElement.clientWidth;
                a = document.documentElement.clientHeight
            } else {
                if (document.body && document.body.clientWidth) {
                    b = document.body.clientWidth;
                    a = document.body.clientHeight
                } else {
                    var c = document.getElementsByTagName("body");
                    if (c.length > 0) {
                        b = c[0].clientWidth;
                        a = c[0].clientHeight
                    }
                }
            }
        }
        var d = TeaLeaf.Event.tlResolutionType(b, a);
        return d
    };
    TeaLeaf.Event.tlGetRenderTime = function () {
        return TeaLeaf.Event.PageLoadMilliSecs
    };
    TeaLeaf.Event.tlGetElementCount = function (a) {
        return document.getElementsByName(a).length
    };
    TeaLeaf.Event.tlBadImageCount = function () {
        var c, f, d, a, b;
        f = 0;
        d = document.images;
        b = d.length;
        for (c = 0; c < b; c++) {
            a = d[c];
            if ((!a) || (typeof a.complete === "boolean" && !a.complete) || (typeof a.naturalWidth !== "undefined" && a.naturalWidth === 0)) {
                f++;
                continue
            }
        }
        return f
    };
    TeaLeaf.Event.tlFlashSend = function (c, b, f, a) {
        var d = new TeaLeaf.Event(c, b);
        d.tlAddData(f.split(a));
        d.tlSend()
    };
    TeaLeaf.Event.tlShowFlashDebug = function (a, c) {
        c += "<BR>";
        for (i = 0; i < TeaLeaf.Event.tlWindowObjects.length; i++) {
            if (TeaLeaf.Event.tlWindowObjects[i].tlWindowName == a) {
                if (TeaLeaf.Event.tlWindowObjects[i].tlWindowObject.closed) {
                    TeaLeaf.Event.tlWindowObjects[i].tlWindowObject = window.open("", a, "width=600,height=300,scrollbars=yes,resizable=yes")
                }
                TeaLeaf.Event.tlWindowObjects[i].tlWindowObject.document.writeln(c.fontsize(2));
                TeaLeaf.Event.tlWindowObjects[i].tlWindowObject.scrollTo(0, 50000);
                return
            }
        }
        var b = window.open("", a, "width=600,height=300,scrollbars=yes,resizable=yes");
        TeaLeaf.Event.tlWindowObjects.push({
            tlWindowName: a,
            tlWindowObject: b
        });
        b.document.writeln(c.fontsize(2))
    };
    TeaLeaf.Event.tlSetEventCount = function (a) {
        TeaLeaf.Event.Configuration.tleventcount = a
    };
    TeaLeaf.Event.tlGetEventCount = function () {
        return TeaLeaf.Event.Configuration.tleventcount
    };
    TeaLeaf.Event.tlGetSendStringBytes = function (a) {
        return a.length
    };
    TeaLeaf.Event.tlGetExceptionCount = function () {
        return (TeaLeaf.Event.Configuration.tlcatcherrors ? TeaLeaf.Event.Configuration.tlexceptioncount : null)
    };
    TeaLeaf.Event.tlGetDwellTime = function () {
        return TeaLeaf.Event.tlDateDiff(TeaLeaf.tlStartLoad, TeaLeaf.Event.Configuration.tllastdwelltime)
    };
    TeaLeaf.Event.tlGetLastVisitedElementID = function () {
        return TeaLeaf.Event.Configuration.tlidoflastvisitedcontrol
    };
    TeaLeaf.Event.tlDateDiff = function (b, a) {
        return Math.abs(b - a)
    };
    TeaLeaf.Event.tlGetVisitOrder = function () {
        return TeaLeaf.Event.Configuration.tlvisitorder
    };
    TeaLeaf.Event.tlFormatXML = function (a) {
        if (a) {
            if (a.replace) {
                return a.replace(/&/g, "&amp;").replace(/\"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            }
            return a
        }
        return ""
    };
    TeaLeaf.Event.tlGetCookie = function (c) {
        var b = document.cookie;
        var f = c + "=";
        var d = b.indexOf("; " + f);
        if (d == -1) {
            d = b.indexOf(f);
            if (d != 0) {
                return ""
            }
        } else {
            d += 2
        }
        var a = document.cookie.indexOf(";", d);
        if (a == -1) {
            a = b.length
        }
        return unescape(b.substring(d + f.length, a))
    };
    TeaLeaf.Event.tlGetHTTPHeaders = function (tlheaderconfig) {
        var i, headers, value;
        headers = [];
        for (i = 0; i < tlheaderconfig.length; i++) {
            if (tlheaderconfig[i].tlsethttpheader) {
                value = eval(tlheaderconfig[i].tlreqhttpheadervalue);
                if (value) {
                    headers.push({
                        name: tlheaderconfig[i].tlreqhttpheadername,
                        value: value
                    })
                }
            }
        }
        return headers
    };
    TeaLeaf.Event.tlGetPageId = function () {
        if (TeaLeaf.Event.Configuration.tlpageid) {
            return TeaLeaf.Event.Configuration.tlpageid
        }
        if (TeaLeaf_PageID) {
            TeaLeaf.Event.Configuration.tlpageid = TeaLeaf_PageID;
            return TeaLeaf.Event.Configuration.tlpageid
        }
        TeaLeaf.Event.Configuration.tlpageid = "ID" + TeaLeaf.tlStartLoad.getHours() + "H" + TeaLeaf.tlStartLoad.getMinutes() + "M" + TeaLeaf.tlStartLoad.getSeconds() + "S" + TeaLeaf.tlStartLoad.getMilliseconds() + "R" + Math.random();
        return TeaLeaf.Event.Configuration.tlpageid
    };
    TeaLeaf.Event.tlSendFailure = function (a, l, j) {
        var d, g, b, c;
        g = new Date();
        d = Date.UTC(g.getUTCFullYear(), g.getUTCMonth(), g.getUTCDate(), g.getUTCHours(), g.getUTCMinutes(), g.getUTCSeconds(), g.getUTCMilliseconds());
        if (TeaLeaf.tlStartLoad) {
            c = TeaLeaf.Event.tlDateDiff(g, TeaLeaf.tlStartLoad)
        }
        TeaLeaf.Event.Configuration.tleventcount++;
        TeaLeaf.Event.Configuration.tlexceptioncount++;
        b = "<" + TeaLeaf.$C("ClientEvent") + " " + TeaLeaf.$C("Count") + '="' + TeaLeaf.Event.Configuration.tleventcount + '" ' + TeaLeaf.$C("Type") + '="' + TeaLeaf.$C("INFO") + '" ' + TeaLeaf.$C("SubType") + '="' + TeaLeaf.$C("EXCEPTION") + '" ' + TeaLeaf.$C("FailedUrl") + '="' + TeaLeaf.Event.tlFormatXML(l) + '" ' + TeaLeaf.$C("Message") + '="' + TeaLeaf.Event.tlFormatXML(j) + '" ' + TeaLeaf.$C("TimeDuration") + '="' + c + '" ' + TeaLeaf.$C("DateSince1970") + '="' + d + '" ' + TeaLeaf.$C("PageId") + '="' + TeaLeaf.Event.tlGetPageId() + '"  />\r\n';
        try {
            TeaLeaf.Event.Configuration.tlasync = true;
            var f = new TeaLeaf.Event(TeaLeaf.$C("INFO"), TeaLeaf.$C("EXCEPTION"));
            f.tlSendXML(b, true)
        } catch (h) {
            if (TeaLeaf.Event.Configuration.tlshowexceptions) {
                alert(h.name + ": " + h.message + "\r\n\r\nPos 4")
            }
        }
    };
    TeaLeaf.Event.tlGetTransport = function () {
        var a;
        if (window.XMLHttpRequest) {
            try {
                a = new XMLHttpRequest()
            } catch (b) {
                a = null
            }
        } else {
            if (window.ActiveXObject) {
                try {
                    a = new ActiveXObject("Msxml2.XMLHTTP")
                } catch (b) {
                    try {
                        a = new ActiveXObject("Microsoft.XMLHTTP")
                    } catch (b) {
                        a = null
                    }
                }
            }
        }
        return a
    };
    TeaLeaf.Event.TransportArray = [];
    TeaLeaf.Event.tlXMLHTTPObj = function () {
        var a = 0;
        for (; a < TeaLeaf.Event.TransportArray.length; a++) {
            if (TeaLeaf.Event.TransportArray[a] && TeaLeaf.Event.TransportArray[a].readyState > 0) {
                if (TeaLeaf.Event.TransportArray[a].readyState == 4) {
                    TeaLeaf.Event.TransportArray[a].abort();
                    TeaLeaf.Event.TransportArray[a].onreadystatechange = new
                    function () {};
                    return TeaLeaf.Event.TransportArray[a]
                }
            } else {
                TeaLeaf.Event.TransportArray[a] = TeaLeaf.Event.tlGetTransport();
                return TeaLeaf.Event.TransportArray[a]
            }
        }
        TeaLeaf.Event.TransportArray[a] = TeaLeaf.Event.tlGetTransport();
        return TeaLeaf.Event.TransportArray[a]
    };
    TeaLeaf.Event.tlCleanXMLHTTPObj = function (b) {
        var a = 0;
        for (; a < TeaLeaf.Event.TransportArray.length; a++) {
            if (b == TeaLeaf.Event.TransportArray[a]) {
                TeaLeaf.Event.TransportArray[a] = null
            }
        }
    };
    TeaLeaf.Event.tlAddHandler = function (b, f, d, c) {
        try {
            if (!b) {
                return
            }
            if (b.addEventListener) {
                b.addEventListener(f, d, c)
            } else {
                if (b.attachEvent) {
                    b.attachEvent("on" + f, d)
                } else {}
            }
        } catch (a) {
            if (TeaLeaf.Event.Configuration.tlshowexceptions) {
                alert(a.name + ": " + a.message + "\r\n\r\nPos 4")
            }
        }
    };
    TeaLeaf.Event.tlRemoveHandler = function (b, f, d, c) {
        try {
            if (!b) {
                return
            }
            if (b.removeEventListener) {
                b.removeEventListener(f, d, c)
            } else {
                if (b.detachEvent) {
                    b.detachEvent("on" + f, d)
                }
            }
        } catch (a) {
            if (TeaLeaf.Event.Configuration.tlshowexceptions) {
                alert(a.name + ": " + a.message + "\r\n\r\nPos 5")
            }
        }
    };
    TeaLeaf.Event.tlFlushQueue = function (f) {
        var h = null;
        var b = TeaLeaf.Event.Configuration.tlqueueeventstimer;
        var d = b * 3;
        if (TeaLeaf.Event.Configuration.tlusetopqueue) {
            var c = new Date();
            var g = (c - top.TeaLeaf.Event.TimeSent);
            if (top.TeaLeaf.Event.tlQueuedXML) {
                if (f || g >= b) {
                    h = top.TeaLeaf.Event.tlQueuedXML;
                    top.TeaLeaf.Event.tlQueuedXML = "";
                    top.TeaLeaf.Event.TimeSent = c
                }
            }
            if (!h) {
                if (!f && g < (b / 2)) {
                    if (b >= d) {
                        b = d
                    } else {
                        b = (b * 3) / 2
                    }
                }
                return b
            }
        } else {
            if (!TeaLeaf.Event.tlQueuedXML) {
                return b
            }
            h = TeaLeaf.Event.tlQueuedXML;
            TeaLeaf.Event.tlQueuedXML = ""
        }
        var a = new TeaLeaf.Event(TeaLeaf.$C("GUI"), TeaLeaf.$C("QUEUED"));
        a.tlSendXML(h);
        return b
    };
    TeaLeaf.Event.prototype.tlPushXML = function (a, c) {
        if (!this.XMLStack) {
            this.XMLStack = []
        }
        if (c) {} else {
            var b = "  <" + a + " ";
            if (this.XMLData) {
                this.XMLData += b
            } else {
                this.XMLData = b
            }
        }
    };
    TeaLeaf.Event.prototype.tlPopXML = function () {
        if (this.XMLData) {
            this.XMLData += "/>\r\n"
        } else {
            return false
        }
    };
    TeaLeaf.Event.prototype.tlAddData = function (a) {
        var g = "";
        if (this.XMLStack) {
            for (var d = 0; d < this.XMLStack.length; d++) {
                g += "  "
            }
        }
        var f = [];
        for (var d = 0; d < a.length; d += 2) {
            var c = a[d];
            var b = TeaLeaf.Event.tlFormatXML(a[d + 1]);
            if (c && b) {
                f[f.length] = g + c + '="' + b + '" '
            }
        }
        if (!this.XMLData) {
            this.XMLData = ""
        }
        this.XMLData += f.join("");
        a = null
    };
    TeaLeaf.Event.prototype.tlSendXML = function (a, b) {
        var m, c, g;
        try {
            g = new TeaLeaf.Request();
            if (!g) {
                return
            }
            g.clear();
            var l = new Date();
            var d = Date.UTC(l.getUTCFullYear(), l.getUTCMonth(), l.getUTCDate(), l.getUTCHours(), l.getUTCMinutes(), l.getUTCSeconds(), l.getUTCMilliseconds());
            var j = "<" + TeaLeaf.$C("ClientEventSet") + " " + TeaLeaf.$C("PostTimeStamp") + '="' + d + '" >';
            a = j + a + "</" + TeaLeaf.$C("ClientEventSet") + ">";
            TeaLeaf.Event.Configuration.tlignoresendfailure = b;
            g.setData(a);
            c = [{
                name: "X-TeaLeaf",
                value: "ClientEvent"
            }];
            c = c.concat(TeaLeaf.Event.tlGetHTTPHeaders(TeaLeaf.Event.Configuration.tlHTTPRequestHeadersSet));
            if (TeaLeaf.Event.Configuration.tlinitflag && !TeaLeaf.Event.InitHeadersSent) {
                c = c.concat(TeaLeaf.Event.tlGetHTTPHeaders(TeaLeaf.Event.Configuration.tlHTTPRequestHeadersEvalInit));
                TeaLeaf.Event.InitHeadersSent = true
            }
            if (TeaLeaf.Event.Configuration.tlbeforeunloadflag && !TeaLeaf.Event.UnloadHeadersSent) {
                c = c.concat(TeaLeaf.Event.tlGetHTTPHeaders(TeaLeaf.Event.Configuration.tlHTTPRequestHeadersEvalBeforeUnload));
                TeaLeaf.Event.UnloadHeadersSent = true
            }
            g.setHeaders(c);
            m = {
                loaded: function (n, o) {
                    if (TeaLeaf.tlGetCookieValue("tlQueuedXML")) {
                        TeaLeaf.tlEraseCookie("tlQueuedXML")
                    }
                },
                failure: function (n, o) {
                    if (!TeaLeaf.Event.Configuration.tlignoresendfailure) {
                        TeaLeaf.Event.Configuration.tlignoresendfailure = true;
                        TeaLeaf.Event.tlSendFailure(g.getUrl(), g.getUrl(), "Status " + n + ": " + o)
                    }
                },
                success: function (n, o) {
                    TeaLeaf.Event.Configuration.tlignoresendfailure = false
                }
            };
            g.send(m)
        } catch (h) {
            var f;
            f = g ? g.getUrl() : "none";
            if (TeaLeaf.Event.Configuration.tlshowexceptions) {
                if (h.name) {
                    alert(h.name + ": " + h.message + "\r\n\r\nURL: " + f + "\r\n\r\nPos 3 ")
                } else {
                    alert(h + "\r\n\r\nURL: " + f + "\r\n\r\nPos 3 ")
                }
            }
            if (!TeaLeaf.Event.Configuration.tlignoresendfailure) {
                TeaLeaf.Event.Configuration.tlignoresendfailure = true;
                TeaLeaf.Event.tlSendFailure(f, f, h.name ? (h.name + ": " + h.message) : h.toString())
            }
        }
    };
    TeaLeaf.Event.prototype.tlSend = function (a) {
        TeaLeaf.Event.Configuration.tleventcount++;
        if (this.XMLStack) {
            while (this.XMLStack.length > 0) {
                this.tlPopXML()
            }
        }
        if (TeaLeaf.Event.Configuration.tleventcount > TeaLeaf.Event.Configuration.tlmaxeventcount) {
            TeaLeaf.Event.tlFlushQueue();
            return
        }
        var b = Date.UTC(this.date.getUTCFullYear(), this.date.getUTCMonth(), this.date.getUTCDate(), this.date.getUTCHours(), this.date.getUTCMinutes(), this.date.getUTCSeconds(), this.date.getUTCMilliseconds());
        sendStr = "<" + TeaLeaf.$C("ClientEvent") + " " + TeaLeaf.$C("Count") + '="' + TeaLeaf.Event.Configuration.tleventcount + '" ' + TeaLeaf.$C("Type") + '="' + this.EventType + '" ' + TeaLeaf.$C("SubType") + '="' + this.EventSubType + '" ';
        if (this.EventSource) {
            sendStr += TeaLeaf.$C("Source") + '="' + this.EventSource + '" '
        }
        if (!a) {
            sendStr += this.XMLData
        }
        if (TeaLeaf.tlStartLoad) {
            sendStr += TeaLeaf.$C("TimeDuration") + '="' + TeaLeaf.Event.tlDateDiff(this.date, TeaLeaf.tlStartLoad) + '" '
        }
        sendStr += TeaLeaf.$C("DateSince1970") + '="' + b + '" ';
        sendStr += TeaLeaf.$C("PageId") + '="' + TeaLeaf.Event.tlGetPageId() + '" ';
        if (a) {
            sendStr += ">\r\n" + this.XMLData + "</" + TeaLeaf.$C("ClientEvent") + ">\r\n"
        } else {
            sendStr += "/>\r\n"
        }
        if (TeaLeaf.Event.Configuration.tlqueueevents) {
            if (TeaLeaf.Event.Configuration.tlusetopqueue) {
                if (top.TeaLeaf.Event.tlQueuedXML) {
                    top.TeaLeaf.Event.tlQueuedXML += sendStr
                } else {
                    top.TeaLeaf.Event.tlQueuedXML = sendStr
                }
            } else {
                if (TeaLeaf.Event.tlQueuedXML) {
                    TeaLeaf.Event.tlQueuedXML += sendStr
                } else {
                    TeaLeaf.Event.tlQueuedXML = sendStr
                }
            }
            if (TeaLeaf.Event.Configuration.tlqueueeventsmaxsz < TeaLeaf.Event.tlQueuedXML.length) {
                TeaLeaf.Event.tlFlushQueue()
            }
            return
        }
        try {
            this.tlSendXML(sendStr);
            this.XMLData = ""
        } catch (c) {}
        this.XMLData = ""
    };
    TeaLeaf.Event.tlXMLEncode = function (a) {
        if (a == null) {
            return a
        }
        a = a.replace(/&/g, "&#38;");
        a = a.replace(/"/g, "&#34;");
        a = a.replace(/'/g, "&#39;");
        a = a.replace(/:/g, "&#58;");
        return a
    };
    TeaLeaf.Event.tlXMLDecode = function (a) {
        if (a == null) {
            return a
        }
        a = a.replace(/&#58;/g, ":");
        a = a.replace(/&#39;/g, "'");
        a = a.replace(/&#34;/g, '"');
        a = a.replace(/&#38;/g, "&");
        return a
    };
    TeaLeaf.Event.tlEnableAllHTTPHeaders = function (a) {
        if (a) {
            if (a == "info") {
                TeaLeaf.Event.tlEventJSONCfgUtil(TeaLeaf.Event.Configuration.tlHTTPRequestHeadersSet, true, "all")
            } else {
                if (a == "init") {
                    TeaLeaf.Event.tlEventJSONCfgUtil(TeaLeaf.Event.Configuration.tlHTTPRequestHeadersEvalInit, true, "all")
                } else {
                    if (a == "beforeunload") {
                        TeaLeaf.Event.tlEventJSONCfgUtil(TeaLeaf.Event.Configuration.tlHTTPRequestHeadersEvalBeforeUnload, true, "all")
                    }
                }
            }
        } else {
            TeaLeaf.Event.tlEventJSONCfgUtil(TeaLeaf.Event.Configuration.tlHTTPRequestHeadersSet, true, "all");
            TeaLeaf.Event.tlEventJSONCfgUtil(TeaLeaf.Event.Configuration.tlHTTPRequestHeadersEvalInit, true, "all");
            TeaLeaf.Event.tlEventJSONCfgUtil(TeaLeaf.Event.Configuration.tlHTTPRequestHeadersEvalBeforeUnload, true, "all")
        }
    };
    TeaLeaf.Event.tlEnableHTTPHeader = function (a, b) {
        if (a == "info") {
            TeaLeaf.Event.tlEventJSONCfgUtil(TeaLeaf.Event.Configuration.tlHTTPRequestHeadersSet, true, b)
        } else {
            if (a == "init") {
                TeaLeaf.Event.tlEventJSONCfgUtil(TeaLeaf.Event.Configuration.tlHTTPRequestHeadersEvalInit, true, b)
            } else {
                if (a == "beforeunload") {
                    TeaLeaf.Event.tlEventJSONCfgUtil(TeaLeaf.Event.Configuration.tlHTTPRequestHeadersEvalBeforeUnload, true, b)
                }
            }
        }
    };
    TeaLeaf.Event.tlDisableAllHTTPHeaders = function (a) {
        if (a) {
            if (a == "info") {
                TeaLeaf.Event.tlEventJSONCfgUtil(TeaLeaf.Event.Configuration.tlHTTPRequestHeadersSet, false, "all")
            } else {
                if (a == "init") {
                    TeaLeaf.Event.tlEventJSONCfgUtil(TeaLeaf.Event.Configuration.tlHTTPRequestHeadersEvalInit, false, "all")
                } else {
                    if (a == "beforeunload") {
                        TeaLeaf.Event.tlEventJSONCfgUtil(TeaLeaf.Event.Configuration.tlHTTPRequestHeadersEvalBeforeUnload, false, "all")
                    }
                }
            }
        } else {
            TeaLeaf.Event.tlEventJSONCfgUtil(TeaLeaf.Event.Configuration.tlHTTPRequestHeadersSet, false, "all");
            TeaLeaf.Event.tlEventJSONCfgUtil(TeaLeaf.Event.Configuration.tlHTTPRequestHeadersEvalInit, false, "all");
            TeaLeaf.Event.tlEventJSONCfgUtil(TeaLeaf.Event.Configuration.tlHTTPRequestHeadersEvalBeforeUnload, false, "all")
        }
    };
    TeaLeaf.Event.tlEnableQueueEvents = function () {
        TeaLeaf.Event.Configuration.tlqueueevents = true
    };
    TeaLeaf.Event.tlDisableQueueEvents = function () {
        TeaLeaf.Event.Configuration.tlqueueevents = false
    };
    TeaLeaf.Event.tlEnableShowExceptions = function () {
        TeaLeaf.Event.Configuration.tlshowexceptions = true
    };
    TeaLeaf.Event.tlDisableShowExceptions = function () {
        TeaLeaf.Event.Configuration.tlshowexceptions = false
    };
    TeaLeaf.Event.tlSetQueueEventTime = function (a) {
        TeaLeaf.Event.Configuration.tlqueueeventstimer = a
    };
    TeaLeaf.Event.tlGetQueueEventTime = function () {
        return TeaLeaf.Event.Configuration.tlqueueeventstimer
    };
    TeaLeaf.Event.tlSetQueueEventMaxSize = function (a) {
        TeaLeaf.Event.Configuration.tlqueueeventsmaxsz = a
    };
    TeaLeaf.Event.tlGetQueueEventMaxSize = function () {
        return TeaLeaf.Event.Configuration.tlqueueeventsmaxsz
    };
    TeaLeaf.Event.tlGetAlertCount = function () {
        var b, c, a;
        b = TeaLeaf;
        c = b.Event;
        a = c.getAlertCount ? c.getAlertCount() : 0;
        return a
    };
    TeaLeaf.Event.tlEventJSONCfgUtil = function (d, c, a) {
        for (var b = 0; b < d.length; b++) {
            if (a == "all") {
                d[b].load = c
            } else {
                if (a == d[b].domevent) {
                    d[b].load = c
                }
            }
        }
    };
    TeaLeaf.Event.tlErrorHandler = function (d, c, a) {
        TeaLeaf.Event.Configuration.tlexceptioncount++;
        if (TeaLeaf.Event.Configuration.tlexceptioncount > TeaLeaf.Event.Configuration.tlmaxeventexception) {
            return
        }
        if ((typeof d !== "string") && !c) {
            return false
        }
        var b = new Date();
        if (!a) {
            a = "-"
        }
        var g = new TeaLeaf.Event(TeaLeaf.$C("INFO"), TeaLeaf.$C("EXCEPTION"));
        var f = [TeaLeaf.$C("Message"), d, TeaLeaf.$C("URL"), escape(c), TeaLeaf.$C("Line"), a];
        g.tlAddData(f);
        TeaLeaf.Event.Configuration.tlasync = true;
        g.tlSend();
        TeaLeaf.Event.tlFlushQueue();
        return false
    };
    TeaLeaf.Event.tlBeforeUnload = function () {
        if (TeaLeaf.Event.Configuration.tleventbeforeunloadflag == true) {
            TeaLeaf.Event.Configuration.tleventunloadflag = false;
            var tlevt = new TeaLeaf.Event(TeaLeaf.$C("PERFORMANCE"), TeaLeaf.$C("BeforeUnload"));
            TeaLeaf.Event.SetType = tlevt.EventType;
            if (TeaLeaf.Event.SetSubType == "") {
                TeaLeaf.Event.SetSubType = tlevt.EventSubType
            } else {
                TeaLeaf.Event.SetSubType += "; " + tlevt.EventSubType
            }
            TeaLeaf.Event.Configuration.tlbeforeunloadflag = true;
            TeaLeaf.Event.Configuration.tlignoresendfailure = true;
            TeaLeaf.Event.Configuration.tlasync = false;
            tlevt.tlSend();
            TeaLeaf.Event.tlFlushQueue(true)
        }
        TeaLeaf.Event.tlRemoveHandler(window, "beforeunload", eval(TeaLeaf.Event.tlBeforeUnload), false);
        TeaLeaf.Event.tlRemoveHandler(window, "unload", eval(TeaLeaf.Event.tlUnload), false)
    };
    TeaLeaf.Event.tlUnload = function () {
        if (TeaLeaf.Event.Configuration.tleventunloadflag) {
            TeaLeaf.Event.Configuration.tllastdwelltime = new Date();
            TeaLeaf.Event.Configuration.tleventbeforeunloadflag = false;
            var tlevt = new TeaLeaf.Event(TeaLeaf.$C("PERFORMANCE"), TeaLeaf.$C("Unload"));
            TeaLeaf.Event.SetType = tlevt.EventType;
            if (TeaLeaf.Event.SetSubType == "") {
                TeaLeaf.Event.SetSubType = tlevt.EventSubType
            } else {
                TeaLeaf.Event.SetSubType += "; " + tlevt.EventSubType
            }
            TeaLeaf.Event.Configuration.tlignoresendfailure = true;
            TeaLeaf.Event.Configuration.tlasync = false;
            tlevt.tlSend();
            TeaLeaf.Event.tlFlushQueue(true)
        }
        TeaLeaf.Event.tlRemoveHandler(window, "beforeunload", eval(TeaLeaf.Event.tlBeforeUnload), false);
        TeaLeaf.Event.tlRemoveHandler(window, "unload", eval(TeaLeaf.Event.tlUnload), false)
    };
    TeaLeaf.Event.EventSetup = function () {
        var T, TE, TECfg;
        T = TeaLeaf;
        TE = T.Event;
        TECfg = TE.Configuration;
        if (TECfg.tlCatchAlerts) {
            (function () {
                var alertCount, originalAlert, originalConfirm, originalPrompt;
                alertCount = 0;
                if (window.alert && window.alert.apply) {
                    originalAlert = window.alert;
                    window.alert = function () {
                        var retVal;
                        retVal = originalAlert.apply(window, arguments);
                        alertCount++;
                        return retVal
                    }
                }
                if (window.confirm && window.confirm.apply) {
                    originalConfirm = window.confirm;
                    window.confirm = function () {
                        var retVal;
                        retVal = originalConfirm.apply(window, arguments);
                        alertCount++;
                        return retVal
                    }
                }
                if (window.prompt && window.prompt.apply) {
                    originalPrompt = window.prompt;
                    window.prompt = function () {
                        var retVal;
                        retVal = originalPrompt.apply(window, arguments);
                        alertCount++;
                        return retVal
                    }
                }
                TE.getAlertCount = function () {
                    return alertCount
                }
            })()
        }
        if (TeaLeaf.Event.Configuration.tlcatcherrors) {
            if (typeof window.onerror !== "function") {
                window.onerror = TeaLeaf.Event.tlErrorHandler
            }
        }
        if (!TeaLeaf.Client) {
            TeaLeaf.Event.tlAddHandler(window, "beforeunload", eval(TeaLeaf.Event.tlBeforeUnload), false);
            TeaLeaf.Event.tlAddHandler(window, "unload", eval(TeaLeaf.Event.tlUnload), false)
        }
        if (TeaLeaf.Event.Configuration.tlqueueevents) {
            TeaLeaf.Event.tlTimerRoutine = function () {
                var timeAmount = TeaLeaf.Event.Configuration.tlqueueeventstimer;
                try {
                    timeAmount = TeaLeaf.Event.tlFlushQueue()
                } catch (exc) {
                    if (TeaLeaf.Event.Configuration.tlshowexceptions) {
                        alert(exc.name + ": " + exc.message + "\r\n\r\nPos 7")
                    }
                }
                setTimeout("TeaLeaf.Event.tlTimerRoutine()", timeAmount)
            };
            setTimeout("TeaLeaf.Event.tlTimerRoutine()", TeaLeaf.Event.Configuration.tlqueueeventstimer)
        }
        var tlnow = new Date();
        var t1970 = Date.UTC(tlnow.getUTCFullYear(), tlnow.getUTCMonth(), tlnow.getUTCDate(), tlnow.getUTCHours(), tlnow.getUTCMinutes(), tlnow.getUTCSeconds(), tlnow.getUTCMilliseconds());
        TeaLeaf.Event.Configuration.t1970 = t1970;
        TeaLeaf.Event.Loaded = true
    };
    if (TeaLeaf.Event.Configuration.tlinit == false) {
        TeaLeaf.Event.Configuration.tlinit = true;
        TeaLeaf.Event.prototype.XMLData = "";
        TeaLeaf.addOnLoad(TeaLeaf.Event.EventSetup)
    }
}
if (typeof TeaLeaf !== "undefined" && ((typeof TeaLeaf.replay === "function") ? !TeaLeaf.replay() : !TeaLeaf.replay) && TeaLeaf.Env && TeaLeaf.Env.Configuration) {
    TeaLeaf.Env.tlSendPageSummary = function () {
        var c, a, b, d, h, f, g;
        c = TeaLeaf;
        a = c.Configuration;
        b = c.Env;
        d = c.Event;
        h = b.Configuration;
        f = d.Configuration;
        if (a.tlSDK || !h.tlinitpost) {
            return
        }
        h.tlinitpost = false;
        g = new d(c.$C("PERFORMANCE"), c.$C("INIT"));
        d.PageLoadMilliSecs = d.tlDateDiff(c.tlStartLoad, g.date);
        d.SetType = g.EventType;
        if (!d.SetSubType) {
            d.SetSubType = g.EventSubType
        } else {
            d.SetSubType += "; " + g.EventSubType
        }
        f.tlinitflag = true;
        b.tlInfo(g);
        b.tlDOMDocumentInfo(g);
        b.tlDOMWindowInfo(g);
        b.tlDOMScreenInfo(g);
        b.tlPluginInfo(g);
        g.tlSend(true)
    };
    TeaLeaf.Env.tlInfo = function (b) {
        b.tlPushXML(TeaLeaf.$C("Info"));
        var a = [TeaLeaf.$C("PageLoadMilliSecs"), TeaLeaf.Event.tlGetRenderTime(), TeaLeaf.$C("Version"), TeaLeaf.Event.tlGetJSVersion(), TeaLeaf.$C("TimezoneOffset"), b.date.getTimezoneOffset()];
        b.tlAddData(a);
        b.tlPopXML()
    };
    TeaLeaf.Env.tlDOMDocumentInfo = function (d) {
        var c, b, a;
        a = TeaLeaf;
        d.tlPushXML(a.$C("Document"));
        c = [a.$C("Title"), document.title, a.$C("Referer"), document.referer, a.$C("ContentType"), document.contentType, a.$C("LastModified"), document.lastModified, a.$C("CharacterSet"), document.characterSet, a.$C("Height"), document.height, a.$C("Width"), document.width];
        d.tlAddData(c);
        b = [a.$C("Anchors"), document.anchors.length, a.$C("Applets"), document.applets.length, a.$C("Embeds"), document.embeds.length, a.$C("Forms"), document.forms.length, a.$C("Images"), document.images.length, a.$C("BadImages"), (a.tlBrowserIsWebKit() ? 0 : a.Event.tlBadImageCount()), a.$C("Links"), document.links.length, a.$C("Plugins"), document.plugins.length];
        d.tlAddData(b);
        d.tlPopXML()
    };
    TeaLeaf.Env.tlDOMWindowInfo = function (g) {
        var b, f, c, a;
        b = TeaLeaf;
        g.tlPushXML(b.$C("Window"));
        f = [b.$C("WindowHref"), escape(window.location.href), b.$C("WindowProtocol"), window.location.protocol, b.$C("WindowHost"), window.location.host, b.$C("WindowHostName"), window.location.hostname, b.$C("WindowPort"), window.location.port, b.$C("WindowPathName"), window.location.pathname];
        g.tlAddData(f);
        if (window.innerHeight && window.innerWidth) {
            g.tlAddData([b.$C("ClientSize"), (window.innerHeight + "x" + window.innerWidth)])
        } else {
            if (document.body) {
                if (document.body.clientWidth && document.body.clientHeight) {
                    g.tlAddData([b.$C("ClientSize"), (document.body.clientHeight + "x" + document.body.clientWidth)])
                }
            }
        }
        c = [b.$C("FullScreen"), navigator.fullScreen, b.$C("Frames"), window.frames.length];
        if (typeof window.sessionStorage === "object") {
            try {
                a = window.sessionStorage.TLTWID;
                if (a == null) {
                    a = b.makeRandomString(6);
                    window.sessionStorage.TLTWID = a
                }
            } catch (d) {
                a = null
            } finally {
                g.tlAddData([b.$C("WindowId"), a])
            }
        }
        g.tlAddData(c);
        g.tlPopXML()
    };
    TeaLeaf.Env.tlDOMNavigatorInfo = function (b) {
        b.tlPushXML(TeaLeaf.$C("Navigator"));
        var a = [TeaLeaf.$C("AppCodeName"), navigator.appCodeName, TeaLeaf.$C("AppName"), navigator.appName, TeaLeaf.$C("AppVersion"), navigator.appVersion, TeaLeaf.$C("BrowserLanguage"), navigator.browserLanguage, TeaLeaf.$C("CookieEnabled"), navigator.cookieEnabled, TeaLeaf.$C("CPUClass"), navigator.cpuClass, TeaLeaf.$C("Language"), navigator.language, TeaLeaf.$C("OSCPU"), navigator.oscpu, TeaLeaf.$C("Platform"), navigator.platform, TeaLeaf.$C("Product"), navigator.product, TeaLeaf.$C("SystemLanguage"), navigator.systemLanguage, TeaLeaf.$C("UserAgent"), navigator.userAgent, TeaLeaf.$C("UserLanguage"), navigator.userLanguage, TeaLeaf.$C("Vendor"), navigator.vendor, TeaLeaf.$C("VendorSub"), navigator.vendorSub];
        b.tlAddData(a);
        b.tlPopXML()
    };
    TeaLeaf.Env.tlDOMScreenInfo = function (b) {
        b.tlPushXML(TeaLeaf.$C("Screen"));
        var a = [TeaLeaf.$C("AvailHeight"), screen.availHeight, TeaLeaf.$C("AvailLeft"), screen.availLeft, TeaLeaf.$C("AvailTop"), screen.availTop, TeaLeaf.$C("AvailWidth"), screen.availWidth, TeaLeaf.$C("BufferDepth"), screen.bufferDepth, TeaLeaf.$C("ColorDepth"), screen.colorDepth, TeaLeaf.$C("DeviceXDPI"), screen.deviceXDPI, TeaLeaf.$C("DeviceYDPI"), screen.deviceYDPI, TeaLeaf.$C("FontSmoothingEnabled"), screen.fontSmoothingEnabled, TeaLeaf.$C("Height"), screen.height, TeaLeaf.$C("Left"), screen.left, TeaLeaf.$C("LogicalXDPI"), screen.logicalXDPI, TeaLeaf.$C("LogicalYDPI"), screen.logicalYDPI, TeaLeaf.$C("Top"), screen.top, TeaLeaf.$C("UpdateInterval"), screen.updateInterval, TeaLeaf.$C("Width"), screen.width];
        b.tlAddData(a);
        b.tlPopXML()
    };
    TeaLeaf.Env.tlPluginInfo = function (l) {
        if (window.ActiveXObject) {
            for (var d = 0; d < TeaLeaf.Env.Configuration.tlPlugins.length; d++) {
                if (!TeaLeaf.Env.Configuration.tlPlugins[d].tlenable) {
                    continue
                }
                var b = TeaLeaf.Env.Configuration.tlPlugins[d].tlIEplugin;
                try {
                    var a = new ActiveXObject(b);
                    if (a) {
                        l.tlPushXML(TeaLeaf.$C("Plugin"));
                        var h = [TeaLeaf.$C("Pluginname"), TeaLeaf.Env.Configuration.tlPlugins[d].tlpluginname, TeaLeaf.$C("Version"), TeaLeaf.Env.Configuration.tlPlugins[d].tlversion];
                        l.tlAddData(h);
                        l.tlPopXML()
                    }
                } catch (g) {}
            }
        } else {
            for (var d = 0; d < navigator.plugins.length; d++) {
                for (var c = 0; c < TeaLeaf.Env.Configuration.tlPlugins.length; c++) {
                    if (!TeaLeaf.Env.Configuration.tlPlugins[c].tlenable) {
                        continue
                    }
                    var f = navigator.plugins[d].name.substr(0, TeaLeaf.Env.Configuration.tlPlugins[c].tlpluginname.length);
                    if (f == TeaLeaf.Env.Configuration.tlPlugins[c].tlpluginname) {
                        TeaLeaf.Env.Configuration.tlPlugins[c].tlenable = false;
                        l.tlPushXML(TeaLeaf.$C("Plugin"));
                        var h = [TeaLeaf.$C("Pluginname"), TeaLeaf.Env.Configuration.tlPlugins[c].tlpluginname, TeaLeaf.$C("Version"), TeaLeaf.Env.Configuration.tlPlugins[c].tlversion];
                        l.tlAddData(h);
                        l.tlPopXML()
                    }
                }
            }
        }
    };
    TeaLeaf.Env.CallInit = function () {
        TeaLeaf.addOnLoad(TeaLeaf.Env.tlSendPageSummary)
    };
    if (TeaLeaf.Env.Configuration.tlinit == false) {
        TeaLeaf.Env.Configuration.tlinit = true;
        TeaLeaf.Env.CallInit()
    }
}
if (typeof TeaLeaf !== "undefined" && ((typeof TeaLeaf.replay === "function") ? !TeaLeaf.replay() : !TeaLeaf.replay) && TeaLeaf.Client && TeaLeaf.Client.Configuration) {
    TeaLeaf.Client.tlTimeoutID = -1;
    TeaLeaf.Client.tlEnableAllEventHandlers = function (a) {
        if (a) {
            if (a == window) {
                TeaLeaf.Client.tlClientJSONCfgUtil(TeaLeaf.Client.Configuration.tlWindowHandlers, true, "all")
            } else {
                if (a == document) {
                    TeaLeaf.Client.tlClientJSONCfgUtil(TeaLeaf.Client.Configuration.tlDocumentHandlers, true, "all")
                }
            }
        } else {
            TeaLeaf.Client.tlClientJSONCfgUtil(TeaLeaf.Client.Configuration.tlWindowHandlers, true, "all");
            TeaLeaf.Client.tlClientJSONCfgUtil(TeaLeaf.Client.Configuration.tlDocumentHandlers, true, "all")
        }
    };
    TeaLeaf.Client.tlEnableEventHandler = function (b, a) {
        if (b == window) {
            TeaLeaf.Client.tlClientJSONCfgUtil(TeaLeaf.Client.Configuration.tlWindowHandlers, true, a)
        } else {
            TeaLeaf.Client.tlClientJSONCfgUtil(TeaLeaf.Client.Configuration.tlDocumentHandlers, true, a)
        }
    };
    TeaLeaf.Client.tlDisableAllEventHandlers = function (a) {
        if (a) {
            if (a == window) {
                TeaLeaf.Client.tlClientJSONCfgUtil(TeaLeaf.Client.Configuration.tlWindowHandlers, false, "all")
            } else {
                if (a == document) {
                    TeaLeaf.Client.tlClientJSONCfgUtil(TeaLeaf.Client.Configuration.tlDocumentHandlers, false, "all")
                }
            }
        } else {
            TeaLeaf.Client.tlClientJSONCfgUtil(TeaLeaf.Client.Configuration.tlWindowHandlers, false, "all");
            TeaLeaf.Client.tlClientJSONCfgUtil(TeaLeaf.Client.Configuration.tlDocumentHandlers, false, "all")
        }
    };
    TeaLeaf.Client.tlDisableEventHandlers = function (b, a) {
        if (b == window) {
            TeaLeaf.Client.tlClientJSONCfgUtil(TeaLeaf.Client.Configuration.tlWindowHandlers, false, a)
        } else {
            TeaLeaf.Client.tlClientJSONCfgUtil(TeaLeaf.Client.Configuration.tlDocumentHandlers, false, a)
        }
    };
    TeaLeaf.Client.tlClientJSONCfgUtil = function (d, c, a) {
        for (var b = 0; b < d.length; b++) {
            if (a == "all") {
                d[b].load = c
            } else {
                if (a == d[b].domevent) {
                    d[b].load = c
                }
            }
        }
    };
    TeaLeaf.Client.tlHasUserMovement = false;
    TeaLeaf.Client.tlUserMovement = function () {
        TeaLeaf.Client.tlHasUserMovement = true;
        TeaLeaf.Event.tlRemoveHandler(document, "mousemove", TeaLeaf.Client.tlUserMovement, false)
    };
    TeaLeaf.Client.tlAddIdToControl = function (d) {
        if ((d.id && d.id != "") || (d.name && d.name != "")) {
            return
        }
        var f = d.tagName;
        var g = TeaLeaf.Client.Configuration.tlIdCounter[f];
        if (g == undefined) {
            TeaLeaf.Client.Configuration.tlIdCounter[f] = 0
        }
        var a = "_TL_" + f + "_" + TeaLeaf.Client.Configuration.tlIdCounter[f];
        var c = document.getElementById(a);
        var b = a;
        if (c) {
            while (document.getElementById("_TL_" + f + "_" + TeaLeaf.Client.Configuration.tlIdCounter[f]++)) {}
        }
        d.id = b;
        TeaLeaf.Client.Configuration.tlIdCounter[f]++
    };
    TeaLeaf.Client.tlFindinJSON = function (a, c) {
        var d = TeaLeaf.Client.tlGetName(a);
        if (d) {
            for (var b = 0; b < c.length; b++) {
                if (d == c[b].tlfieldname) {
                    return c[b]
                }
            }
        }
    };
    TeaLeaf.Client.EmptyMask = function (a) {
        return ""
    };
    TeaLeaf.Client.BasicMask = function (a) {
        if (!a || !a.value) {
            return null
        }
        return "XXXXXX"
    };
    TeaLeaf.Client.PreserveMask = function (b) {
        var a, c;
        if (!b || !b.value) {
            return null
        }
        a = TeaLeaf.Client.Configuration.tlPrivacyMask;
        c = b.value;
        c = c.replace(/[A-Z]/g, a.upperChar);
        c = c.replace(/[a-z]/g, a.lowerChar);
        c = c.replace(/[0-9]/g, a.numericChar);
        c = c.replace(/[^A-Za-z0-9]/g, a.symbolChar);
        return c
    };
    TeaLeaf.Client.getFieldBlockMatch = function (b) {
        var a, c;
        c = TeaLeaf.Client.Configuration.tlFieldBlock;
        if (typeof b === "string") {
            b = document.getElementById(b)
        }
        if (!b) {
            return null
        }
        for (a = 0; a < c.length; a++) {
            if (c[a].id) {
                if (!c[a].idRE) {
                    c[a].idRE = new RegExp(c[a].id, (c[a].caseinsensitive ? "i" : ""))
                }
                if (c[a].idRE.test(b.id)) {
                    return c[a]
                }
            }
            if (c[a].name) {
                if (!c[a].nameRE) {
                    c[a].nameRE = new RegExp(c[a].name, (c[a].caseinsensitive ? "i" : ""))
                }
                if (c[a].nameRE.test(b.name)) {
                    return c[a]
                }
            }
        }
        return null
    };
    TeaLeaf.Client.tlIsReplace = function (a) {
        if (typeof a === "string") {
            a = document.getElementById(a)
        }
        if (!a) {
            return false
        }
        if (TeaLeaf.Client.getFieldBlockMatch(a)) {
            return true
        }
        if (a.type === "password") {
            return TeaLeaf.Client.Configuration.tlpassword === 2
        }
        return false
    };
    TeaLeaf.Client.tlReplaceValue = function (a) {
        var b;
        if (typeof a === "string") {
            a = document.getElementById(a)
        }
        if (!a) {
            return null
        }
        b = TeaLeaf.Client.getFieldBlockMatch(a);
        if (b) {
            return b.mask(a)
        }
        return a.value
    };
    TeaLeaf.Client.tlIsExcluded = function (a) {
        var b;
        if (typeof a === "string") {
            a = document.getElementById(a)
        }
        if (!a) {
            return false
        }
        b = TeaLeaf.Client.getFieldBlockMatch(a);
        if (b) {
            return b.exclude
        }
        if (a.type === "password") {
            return TeaLeaf.Client.Configuration.tlpassword === 2
        }
        return false
    };
    TeaLeaf.Client.tlGetName = function (c) {
        if (c == null) {
            return null
        }
        var b = c.id;
        if (b && b != "") {
            return b
        }
        var a = c.name;
        if (a && a != "") {
            return a
        }
        return null
    };
    TeaLeaf.Client.tlGetEventSource = function (b) {
        var a;
        a = null;
        if (!b) {
            return null
        }
        if (b.srcElement) {
            a = b.srcElement
        } else {
            a = b.target;
            if (!a) {
                a = b.explicitOriginalTarget
            }
            if (!a) {
                a = b.originalTarget
            }
        }
        if (a && !a.name) {
            if (a.parentNode && a.parentNode.tagName) {
                if (a.parentNode.tagName == "A" || a.parentNode.tagName == "LINK") {
                    a = a.parentNode
                }
            }
        }
        if (!a || !a.tagName) {
            a = window.document.body
        }
        return a
    };
    TeaLeaf.Client.tlGetAnchor = function (c, b) {
        if (c == null) {
            return null
        }
        if (c.name && c.name != "") {
            return null
        }
        var a;
        for (a = 0; a < document.anchors.length; a++) {
            if (document.anchors[a] == c) {
                if (b) {
                    return "<AnchorElement>" + a + "</AnchorElement>\r\n"
                } else {
                    return "Anchor-" + a
                }
            }
        }
        for (a = 0; a < document.links.length; a++) {
            if (document.links[a] == c) {
                if (b) {
                    return "<LinkElement>" + a + "</LinkElement>\r\n"
                } else {
                    return "Link-" + a
                }
            }
        }
        return null
    };
    TeaLeaf.Client.checkIsInput = function (a) {
        if (typeof(a) == "string") {
            a = document.getElementById(a)
        }
        switch (a.tagName) {
        case "INPUT":
        case "SELECT":
        case "TEXTAREA":
            return true
        }
        return false
    };
    TeaLeaf.Event.tlFormatXMLName = function (d) {
        if (!d || d.length <= 0) {
            return null
        }
        var b = "";
        if (!TeaLeaf.Event.tlNameStartChar(d.charCodeAt(0))) {
            b = "_"
        }
        var a = d.length;
        var c;
        for (c = 0; c < a; c++) {
            if (TeaLeaf.Event.tlNameChar(d.charCodeAt(c))) {
                b = b + d.charAt(c)
            } else {
                b = b + "_"
            }
        }
        return b
    };
    TeaLeaf.Event.tlNameStartChar = function (a) {
        return (a >= 65 && a <= 90) || a == 95 || (a >= 97 && a <= 122) || (a >= 192 && a <= 214) || (a >= 216 && a <= 246) || (a >= 248 && a <= 767) || (a >= 880 && a <= 893) || (a >= 895 && a <= 8191) || (a >= 8204 && a <= 8205) || (a >= 8304 && a <= 8591) || (a >= 11264 && a <= 12271) || (a >= 12289 && a <= 55295) || (a >= 63744 && a <= 64975) || (a >= 65008 && a <= 65533)
    };
    TeaLeaf.Event.tlNameChar = function (a) {
        return TeaLeaf.Event.tlNameStartChar(a) || a == 45 || a == 46 || (a >= 48 && a <= 57) || a == 183 || (a >= 768 && a <= 879) || (a >= 8255 && a <= 8256)
    };
    TeaLeaf.Client.tlQueuedKeys = "";
    TeaLeaf.Client.getNormalizedKeyCode = function (b) {
        var a;
        if (!b || !b.keyCode || (b.keyCode < 32 && b.keyCode !== 8 && b.keyCode !== 20)) {
            return null
        }
        a = "";
        if (b.ctrlKey) {
            a += "c-"
        }
        if (b.altKey) {
            a += "a-"
        }
        if (b.shiftKey) {
            a += "s-"
        }
        if (!TeaLeaf.tlBrowserIsIE()) {
            switch (b.keyCode) {
            case 59:
                a += 186;
                break;
            default:
                a += b.keyCode;
                break
            }
        } else {
            a += b.keyCode
        }
        return a
    };
    TeaLeaf.Client.tlQueueKey = function (h) {
        var f, d, g, c, a, b;
        c = TeaLeaf;
        a = c.Client;
        b = a.Configuration;
        a.tlSendResize();
        a.tlSendScroll();
        if (!h) {
            h = window.event
        }
        d = a.tlGetEventSource(h);
        if (!d) {
            return
        }
        if (!d.TeaLeafFocusTime) {
            d.TeaLeafFocusTime = new Date()
        }
        if (a.tlQueuedKeySource) {
            if (a.tlQueuedKeySource != d) {
                if (a.tlQueuedKeys && a.tlQueuedKeys.length > 0) {
                    a.tlSendKeys()
                }
                a.tlQueuedKeySource = d
            }
        } else {
            a.tlQueuedKeySource = d
        }
        f = a.tlGetName(d);
        if (!f) {
            f = a.tlGetXPathFromNode(d);
            if (!f) {
                if (!a.tlGetAnchor(d, false)) {
                    a.tlQueuedKeySource = null
                }
                return
            } else {
                a.tlQueuedKeySource = d
            }
        } else {
            if (a.tlIsReplace(d)) {
                a.tlQueuedKeysCount++;
                return
            }
            if (a.tlIsExcluded(d)) {
                a.tlQueuedKeys = null;
                a.tlQueuedKeysCount++;
                return
            }
        }
        g = a.getNormalizedKeyCode(h);
        if (g) {
            if (a.tlQueuedKeys && a.tlQueuedKeys.length > 0) {
                a.tlQueuedKeys += ";"
            }
            a.tlQueuedKeys += g
        }
    };
    TeaLeaf.Client.tlSendKeys = function () {
        var p = TeaLeaf.Client,
            g, f;
        if (!p.tlQueuedKeySource || (!p.tlQueuedKeys && !p.tlQueuedKeysCount)) {
            return
        }
        var d = p.tlQueuedKeySource;
        var l = p.tlQueuedKeys;
        var s = p.tlQueuedKeysCount;
        p.tlQueuedKeySource = null;
        p.tlQueuedKeys = "";
        p.tlQueuedKeysCount = 0;
        f = p.tlGetXPathFromNode(d);
        if (!f && p.Configuration.tlDiscardInvalidXPath) {
            return
        }
        var q = false;
        if (TeaLeaf.Client.tlIsReplace(d)) {
            q = true;
            return
        }
        var n = false;
        if (TeaLeaf.Client.tlIsExcluded(d)) {
            n = true;
            l = null
        }
        var a = TeaLeaf.Client.tlGetName(d);
        var b = null;
        g = d.id;
        if (!TeaLeaf.Client.CheckIfIdValid(d)) {
            g = ""
        }
        var o = new TeaLeaf.Event(TeaLeaf.$C("GUI"), TeaLeaf.$C("KeyUp"));
        var m = [TeaLeaf.$C("Name"), d.name, TeaLeaf.$C("Id"), g, TeaLeaf.$C("Lev"), b, TeaLeaf.$C("ElementType"), d.type, TeaLeaf.$C("TagName"), d.tagName, TeaLeaf.$C("XPath"), f, TeaLeaf.$C("KeyCount"), s];
        o.tlAddData(m);
        if (n) {
            o.tlAddData([TeaLeaf.$C("Excluded"), TeaLeaf.$C("True")])
        } else {
            if (q) {
                var j = TeaLeaf.Client.tlGetReplaceValue(d);
                var r = [TeaLeaf.$C("ValueIn"), a, a, j, TeaLeaf.$C("KeyCode"), l];
                o.tlAddData(r)
            } else {
                var c = TeaLeaf.Event.tlFormatXMLName(a);
                if (!c) {
                    c = f;
                    c = TeaLeaf.Event.tlFormatXMLName(c)
                }
                var h = [TeaLeaf.$C("ValueIn"), c, c, d.value, TeaLeaf.$C("KeyCode"), l];
                o.tlAddData(h)
            }
        }
        o.tlSend()
    };
    TeaLeaf.Client.tlSendResize = function () {
        if (!TeaLeaf.Client.ResizeClientX && !TeaLeaf.Client.ResizeClientY) {
            return
        }
        var b = new TeaLeaf.Event(TeaLeaf.$C("GUI"), TeaLeaf.$C("Resize"));
        var a = [TeaLeaf.$C("ClientX"), TeaLeaf.Client.ResizeClientX, TeaLeaf.$C("ClientY"), TeaLeaf.Client.ResizeClientY, TeaLeaf.$C("ScreenX"), TeaLeaf.Client.ResizeScreenX, TeaLeaf.$C("ScreenY"), TeaLeaf.Client.ResizeScreenY];
        b.tlAddData(a);
        TeaLeaf.Client.ResizeClientX = null;
        TeaLeaf.Client.ResizeClientY = null;
        TeaLeaf.Client.ResizeScreenX = null;
        TeaLeaf.Client.ResizeScreenY = null;
        b.tlSend()
    };
    TeaLeaf.Client.tlQueueScroll = function (a) {
        TeaLeaf.Client.tlSendKeys();
        TeaLeaf.Client.tlSendResize();
        if (!a) {
            a = window.event
        }
        if (a.clientX) {
            TeaLeaf.Client.ScrollClientX = a.clientX;
            TeaLeaf.Client.ScrollClientY = a.clientY;
            TeaLeaf.Client.ScrollScreenX = a.screenX;
            TeaLeaf.Client.ScrollScreenY = a.screenY
        } else {
            TeaLeaf.Client.ScrollHeight = a.target.scrollHeight;
            TeaLeaf.Client.ScrollWidth = a.target.scrollWidth;
            TeaLeaf.Client.ScrollTop = a.target.scrollTop;
            TeaLeaf.Client.ScrollLeft = a.target.scrollLeft
        }
    };
    TeaLeaf.Client.tlSendScroll = function () {
        if (!TeaLeaf.Client.ScrollClientX && !TeaLeaf.Client.ScrollHeight) {
            return
        }
        var b = new TeaLeaf.Event(TeaLeaf.$C("GUI"), TeaLeaf.$C("Scroll"));
        var a = [TeaLeaf.$C("ClientX"), TeaLeaf.Client.ScrollClientX, TeaLeaf.$C("ClientY"), TeaLeaf.Client.ScrollClientY, TeaLeaf.$C("ScreenX"), TeaLeaf.Client.ScrollScreenX, TeaLeaf.$C("ScreenY"), TeaLeaf.Client.ScrollScreenY, TeaLeaf.$C("ScrollHeight"), TeaLeaf.Client.ScrollHeight, TeaLeaf.$C("ScrollWidth"), TeaLeaf.Client.ScrollWidth, TeaLeaf.$C("ScrollTop"), TeaLeaf.Client.ScrollTop, TeaLeaf.$C("ScrollLeft"), TeaLeaf.Client.ScrollLeft];
        b.tlAddData(a);
        TeaLeaf.Client.ScrollClientX = TeaLeaf.Client.ScrollClientY = null;
        TeaLeaf.Client.ScrollScreenX = TeaLeaf.Client.ScrollScreenY = null;
        TeaLeaf.Client.ScrollHeight = TeaLeaf.Client.ScrollWidth = null;
        TeaLeaf.Client.ScrollTop = TeaLeaf.Client.ScrollLeft = null;
        b.tlSend()
    };
    TeaLeaf.Client.tlFindAncestorByTag = function (b, a) {
        var c = b.parentNode;
        while (c && c != window.document) {
            if (c.nodeType != 1) {
                continue
            }
            if (c.tagName == a) {
                break
            } else {
                c = c.parentNode
            }
        }
        return c
    };
    TeaLeaf.Client.tlCheckBlackList = function (a) {
        var d, c, b;
        if (!TeaLeaf.Client.Configuration.tlIDBlackList || !TeaLeaf.Client.Configuration.tlIDBlackList.length) {
            return false
        }
        if (a) {
            for (d = 0; d < TeaLeaf.Client.Configuration.tlIDBlackList.length; d++) {
                b = new RegExp(TeaLeaf.Client.Configuration.tlIDBlackList[d], "g");
                c = a.match(b);
                if (c) {
                    return true
                }
            }
        }
        return false
    };
    TeaLeaf.Client.tlCheckWhiteList = function (a) {
        var d, c, b;
        if (!TeaLeaf.Client.Configuration.tlIDWhiteList || !TeaLeaf.Client.Configuration.tlIDWhiteList.length) {
            return true
        }
        if (a) {
            for (d = 0; d < TeaLeaf.Client.Configuration.tlIDWhiteList.length; d++) {
                b = new RegExp(TeaLeaf.Client.Configuration.tlIDWhiteList[d], "g");
                c = a.match(b);
                if (c) {
                    return true
                }
            }
        }
        return false
    };
    TeaLeaf.Client.tlGetXPathFromNode = function (a) {
        if (!a) {
            return null
        }
        var g = [];
        var l = a;
        var h = null;
        var m = null;
        for (var f in TeaLeaf.Client.Configuration.tlSpecialChildNodeTags) {
            if (l.tagName.toString() == f) {
                l = l.parentNode
            }
        }
        var d = false;
        for (d = TeaLeaf.Client.CheckIfIdValid(l); l != window.document && (!d); d = TeaLeaf.Client.CheckIfIdValid(l)) {
            h = null;
            m = null;
            switch (l.tagName) {
            case "TD":
                if (m = TeaLeaf.Client.tlFindAncestorByTag(l, "TR")) {
                    h = m.cells
                }
                break;
            case "TR":
                if (m = TeaLeaf.Client.tlFindAncestorByTag(l, "TABLE")) {
                    h = m.rows
                }
                break;
            case "OPTION":
                if (m = TeaLeaf.Client.tlFindAncestorByTag(l, "SELECT")) {
                    h = m.options
                }
                break;
            default:
                m = l.parentNode;
                if (!m) {
                    m = window.document
                }
                h = m.childNodes;
                break
            }
            if (h == null) {
                return null
            }
            var c = 0;
            for (var f = 0; f < h.length; f++) {
                if (h[f].nodeType == 1 && h[f].tagName == l.tagName) {
                    if (h[f] == l) {
                        g[g.length] = [l.tagName.toUpperCase(), c];
                        break
                    }
                    c++
                }
            }
            l = m
        }
        if (d) {
            g[g.length] = [l.id]
        }
        if (!g.length) {
            return null
        }
        var b = [];
        for (var f = g.length - 1; f >= 0; f--) {
            if (g[f].length > 1) {
                b[b.length] = "['" + g[f][0] + "'," + g[f][1] + "]"
            } else {
                b[b.length] = "['" + g[f][0].toString().replace(/'/g, "\\'") + "']"
            }
        }
        return "[" + b.join(",") + "]"
    };
    TeaLeaf.Client.CheckIfIdValid = function (a) {
        var c;
        if (!a || !a.id || typeof(a.id) != "string") {
            return false
        }
        if (TeaLeaf.Client.tlCheckBlackList(a.id) === true) {
            return false
        }
        if (TeaLeaf.Client.tlCheckWhiteList(a.id) === false) {
            return false
        }
        if (!TeaLeaf.Client.Configuration.tlUniqueIDCheckEnabled) {
            return true
        }
        c = a.id;
        a.id = (new Date()).getTime() + "_TeaLeaf";
        try {
            if (!document.getElementById(c)) {
                a.id = c;
                return true
            } else {
                a.id = c;
                return false
            }
        } catch (b) {
            return false
        } finally {
            a.id = c
        }
    };
    TeaLeaf.Client.tlGetNodeFromXPath = function (path, decode) {
        if (path == null) {
            return null
        }
        if (decode) {
            path = TeaLeaf.Event.tlXMLDecode(path)
        }
        var xpath = eval(path);
        if (xpath == null) {
            return null
        }
        var cur_node = window.document;
        for (var i = 0; i < xpath.length; i++) {
            found = false;
            if (xpath[i].length == 1) {
                cur_node = document.getElementById(xpath[i]);
                if (cur_node == null) {
                    return null
                }
            } else {
                k = 0;
                switch (cur_node.tagName) {
                case "TABLE":
                    children = cur_node.rows;
                    break;
                case "TR":
                    children = cur_node.cells;
                    break;
                case "SELECT":
                    children = cur_node.options;
                    break;
                default:
                    children = cur_node.childNodes;
                    break
                }
                for (var j = 0; j < children.length; j++) {
                    if (children[j].nodeType != 1) {
                        continue
                    }
                    if (children[j].tagName.toUpperCase() == xpath[i][0]) {
                        if (k == xpath[i][1]) {
                            cur_node = children[j];
                            found = true;
                            break
                        }
                        k++
                    }
                }
                if (!found) {
                    return null
                }
            }
        }
        return cur_node
    };
    window.TeaLeaf_Client_tlGetNodeFromXPath = TeaLeaf.Client.tlGetNodeFromXPath;
    TeaLeaf.Private.tlPrevEvent;
    TeaLeaf.Private.setLastProcessedEvent = function (b) {
        var c = TeaLeaf.Private,
            a;
        if (!b) {
            return
        }
        if (!c.tlPrevEvent) {
            c.tlPrevEvent = {}
        }
        c.tlPrevEvent.type = b.type;
        c.tlPrevEvent.button = b.button;
        c.tlPrevEvent.clientX = b.clientX;
        c.tlPrevEvent.clientY = b.clientY;
        if (typeof b.keyCode !== "undefined") {
            c.tlPrevEvent.keyCode = b.keyCode
        } else {
            c.tlPrevEvent.keyCode = a
        }
        if (typeof b.charCode !== "undefined") {
            c.tlPrevEvent.charCode = b.charCode
        } else {
            c.tlPrevEvent.charCode = a
        }
        if (typeof b.timeStamp !== "undefined") {
            if (b.timeStamp.getTime) {
                c.tlPrevEvent.timeStamp = b.timeStamp.getTime()
            } else {
                c.tlPrevEvent.timeStamp = b.timeStamp
            }
        } else {
            c.tlPrevEvent.timeStamp = new Date().getTime()
        }
        if (typeof b.target !== "undefined") {
            c.tlPrevEvent.target = b.target
        } else {
            c.tlPrevEvent.target = a
        }
        if (typeof b.srcElement !== "undefined") {
            c.tlPrevEvent.srcElement = b.srcElement
        } else {
            c.tlPrevEvent.srcElement = a
        }
    };
    TeaLeaf.Private.getLastProcessedEvent = function () {
        return TeaLeaf.Private.tlPrevEvent
    };
    TeaLeaf.Client.isDuplicateEvent = function (a) {
        var d = TeaLeaf.Private,
            c = d.getLastProcessedEvent();
        if (!c || !a) {
            d.setLastProcessedEvent(a);
            return false
        }
        if (c.type !== a.type) {
            d.setLastProcessedEvent(a);
            return false
        }
        if (c.target !== a.target) {
            d.setLastProcessedEvent(a);
            return false
        }
        if (c.srcElement !== a.srcElement) {
            d.setLastProcessedEvent(a);
            return false
        }
        if (c.button !== a.button) {
            d.setLastProcessedEvent(a);
            return false
        }
        if (c.clientX !== a.clientX || c.clientY !== a.clientY) {
            d.setLastProcessedEvent(a);
            return false
        }
        if (c.keyCode !== a.keyCode) {
            d.setLastProcessedEvent(a);
            return false
        }
        if (typeof a.timeStamp !== "undefined") {
            var b = a.timeStamp.getTime ? a.timeStamp.getTime() : a.timeStamp;
            if (c.timeStamp !== b) {
                d.setLastProcessedEvent(a);
                return false
            }
        } else {
            a.timeStamp = new Date().getTime();
            if (Math.abs(a.timeStamp - c.timeStamp) > 300) {
                d.setLastProcessedEvent(a);
                return false
            }
        }
        d.setLastProcessedEvent(a);
        return true
    };
    TeaLeaf.Client.tlCheckAttributes = function (g, h) {
        var c = [];
        var b = TeaLeaf.Client.Configuration.tlAttributeCapture;
        for (var d = 0; d < b.length; d++) {
            if (b[d].tlevent == h.type) {
                var j = b[d].tltagname.toLowerCase();
                var f = g.tagName.toLowerCase();
                if (j == f) {
                    var a = g.getAttribute(b[d].tlattributename);
                    if (a) {
                        c.push(b[d].tlattributename, escape(a))
                    }
                }
            }
        }
        return c
    };
    TeaLeaf.Client.tlAddEvent = function (a) {
        var g = TeaLeaf,
            f = g.Client,
            t = f.Configuration,
            q, r, c, s, l, m, n, h, p, u, j, d, b, v, o;
        if (!a) {
            a = window.event
        }
        r = f.tlGetEventSource(a);
        if (!r) {
            return
        }
        o = f.tlGetXPathFromNode(r);
        if (!o && t.tlDiscardInvalidXPath) {
            return
        }
        m = [];
        if (t.tlEnableAttr) {
            m = f.tlCheckAttributes(r, a)
        }
        f.tlSendKeys();
        f.tlSendResize();
        f.tlSendScroll();
        if (!r.TeaLeafFocusTime) {
            switch (a.type.toLowerCase()) {
            case "keyup":
            case "change":
            case "click":
            case "dblclick":
            case "mousedown":
                r.TeaLeafFocusTime = new Date();
                break
            }
        }
        if (a.type.toLowerCase() === "blur" && r.type && r.type.toLowerCase() === "application/x-shockwave-flash") {
            return
        }
        if (a.type.toLowerCase() === "click" && f.checkIsInput(r)) {
            g.Event.Configuration.tlidoflastvisitedcontrol = f.tlGetName(r)
        }
        if (a.type.toLowerCase() === "click" && (r.tagName.toUpperCase() === "A") && g.tlBrowserIsIE()) {
            t.tlIEhref = false;
            p = r.href;
            if (p === "#") {
                t.tlIEhref = true
            } else {
                u = "javascript:";
                n = p.substr(0, u.length);
                if (n.toLowerCase() == u) {
                    t.tlIEhref = true
                }
            }
        }
        h = new g.Event(g.$C("GUI"), a.type);
        d = f.tlGetName(r);
        b = r.id;
        if (!f.CheckIfIdValid(r)) {
            b = ""
        }
        s = [g.$C("Name"), r.name, g.$C("Id"), b, g.$C("ElementType"), r.type, g.$C("TagName"), r.tagName, g.$C("AltKey"), a.altKey ? g.$C("True") : null, g.$C("CtrlKey"), a.ctrlKey ? g.$C("True") : null, g.$C("ShiftKey"), a.shiftKey ? g.$C("True") : null, g.$C("XPath"), o];
        h.tlAddData(s);
        if (t.tlEnableAttr && m && m.length > 0) {
            h.tlAddData(m)
        }
        if (a.type.toLowerCase() === "blur" && r.TeaLeafFocusTime) {
            c = new Date();
            h.tlAddData([g.$C("TimeInControl"), g.Event.tlDateDiff(c, r.TeaLeafFocusTime)]);
            r.TeaLeafFocusTime = null
        }
        if (f.tlIsExcluded(r)) {
            h.tlAddData([g.$C("Excluded"), g.$C("True")])
        } else {
            v = null;
            j = null;
            l = [];
            if (!r.value && a.type.toLowerCase() === "change" && r.tagName.toUpperCase() === "SELECT") {
                q = r.selectedIndex;
                if (q >= 0 && q < r.options.length) {
                    v = escape(r.options[q].text)
                }
            } else {
                v = f.tlReplaceValue(r)
            }
            if (v) {
                j = g.Event.tlFormatXMLName(d);
                if (!j) {
                    j = o;
                    j = g.Event.tlFormatXMLName(j)
                }
                l = [g.$C("ValueIn"), j, j, v]
            }
            if (r.type && (r.type.toLowerCase() === "checkbox" || r.type.toLowerCase() === "radio")) {
                l.push(g.$C("Checked"), r.checked ? g.$C("True") : g.$C("False"))
            }
            h.tlAddData(l)
        }
        h.tlSend()
    };
    TeaLeaf.Client.tlHandleFormSubmit = function (h) {
        TeaLeaf.Client.Configuration.tlactiontype = "Submit";
        TeaLeaf.Client.tlSendKeys();
        TeaLeaf.Client.tlSendResize();
        TeaLeaf.Client.tlSendScroll();
        if (!h) {
            h = window.event
        }
        var j = TeaLeaf.Client.tlGetEventSource(h);
        if (!j) {
            return
        }
        var l;
        if (!j.name) {
            var a = document.forms;
            for (l = 0; l < a.length; l++) {
                if (a[l] == j) {
                    j.name = "Ordinal-" + l;
                    break
                }
            }
        }
        if (!j.name) {
            return
        }
        if (TeaLeaf.Client.tlIsReplace(j)) {
            var n = TeaLeaf.Client.tlGetReplaceValue(j);
            var b = TeaLeaf.Client.tlGetName(j);
            var q = [TeaLeaf.$C("ValueIn"), b, b, n];
            p.tlAddData(q)
        }
        var p = new TeaLeaf.Event(TeaLeaf.$C("GUI"), h.type);
        var o = [TeaLeaf.$C("Name"), j.name, TeaLeaf.$C("Id"), j.id, TeaLeaf.$C("ElementType"), j.type, TeaLeaf.$C("TagName"), j.tagName, TeaLeaf.$C("AltKey"), h.altKey ? TeaLeaf.$C("True") : null, TeaLeaf.$C("CtrlKey"), h.ctrlKey ? TeaLeaf.$C("True") : null, TeaLeaf.$C("ShiftKey"), h.shiftKey ? TeaLeaf.$C("True") : null, TeaLeaf.$C("NodeName"), h.nodeName, TeaLeaf.$C("NodeValue"), h.nodeValue, TeaLeaf.$C("VisitOrder"), TeaLeaf.Event.Configuration.tlvisitorder];
        p.tlAddData(o);
        var f = j.getElementsByTagName("INPUT");
        p.tlAddData([TeaLeaf.$C("InputFieldCount"), f.length]);
        p.tlPushXML(TeaLeaf.$C("InputFields"));
        for (l = 0; l < f.length; l++) {
            var d = f[l];
            if (!d.name) {
                continue
            }
            p.tlPushXML(TeaLeaf.$C("Field") + l);
            var c = [TeaLeaf.$C("Name"), d.name, TeaLeaf.$C("Id"), d.id, TeaLeaf.$C("ElementType"), d.type, TeaLeaf.$C("TagName"), d.tagName];
            p.tlAddData(c);
            if (TeaLeaf.Client.tlIsExcluded(b)) {
                p.tlAddData([TeaLeaf.$C("Excluded"), TeaLeaf.$C("True")])
            } else {
                if (TeaLeaf.Client.tlIsReplace(d.name)) {
                    var n = TeaLeaf.Client.tlGetReplaceValue(d);
                    var b = TeaLeaf.Client.tlGetName(d);
                    var q = [TeaLeaf.$C("ValueIn"), b, b, n];
                    p.tlAddData(q)
                } else {
                    var g = TeaLeaf.Event.tlFormatXMLName(d.name);
                    var m = [TeaLeaf.$C("ValueIn"), g, g, d.value];
                    p.tlAddData(m)
                }
            }
            p.tlPopXML()
        }
        p.tlPopXML();
        p.tlSend();
        TeaLeaf.Event.Configuration.tlvisitorder = ""
    };
    TeaLeaf.Client.tlQueueResize = function (a) {
        TeaLeaf.Client.tlSendKeys();
        TeaLeaf.Client.tlSendScroll();
        if (!a) {
            a = window.event
        }
        if (a.clientX) {
            TeaLeaf.ResizeClientX = a.clientX;
            TeaLeaf.ResizeClientY = a.clientY;
            TeaLeaf.ResizeScreenX = a.screenX;
            TeaLeaf.ResizeScreenY = a.screenY
        } else {
            TeaLeaf.ResizeClientX = a.target.width;
            TeaLeaf.ResizeClientY = a.target.height
        }
    };
    TeaLeaf.Client.tlHandleFormReset = function (c) {
        TeaLeaf.Client.tlSendKeys();
        TeaLeaf.Client.tlSendResize();
        TeaLeaf.Client.tlSendScroll();
        if (!c) {
            c = window.event
        }
        var d = TeaLeaf.Client.tlGetEventSource(c);
        if (!d) {
            return
        }
        var f;
        if (!d.name) {
            var a = document.forms;
            for (f = 0; f < a.length; f++) {
                if (a[f] == d) {
                    d.name = "Ordinal-" + f;
                    break
                }
            }
        }
        if (!d.name) {
            return
        }
        if (TeaLeaf.Client.tlIsReplace(d)) {
            var g = TeaLeaf.Client.tlGetReplaceValue(d);
            var b = TeaLeaf.Client.tlGetName(d);
            var l = [TeaLeaf.$C("ValueIn"), b, b, g];
            j.tlAddData(l)
        }
        var j = new TeaLeaf.Event(TeaLeaf.$C("GUI"), c.type);
        var h = [TeaLeaf.$C("Name"), d.name, TeaLeaf.$C("Id"), d.id, TeaLeaf.$C("ElementType"), d.type, TeaLeaf.$C("TagName"), d.tagName, TeaLeaf.$C("AltKey"), c.altKey ? TeaLeaf.$C("True") : null, TeaLeaf.$C("CtrlKey"), c.ctrlKey ? TeaLeaf.$C("True") : null, TeaLeaf.$C("ShiftKey"), c.shiftKey ? TeaLeaf.$C("True") : null, TeaLeaf.$C("NodeName"), c.nodeName, TeaLeaf.$C("NodeValue"), c.nodeValue, TeaLeaf.$C("VisitOrder"), TeaLeaf.Event.Configuration.tlvisitorder];
        j.tlAddData(h);
        j.tlSend();
        TeaLeaf.tlVisitOrder = ""
    };
    TeaLeaf.Client.tlBeforeUnload = function () {
        if (TeaLeaf.Client.tlBeforeUnloadFired) {
            return
        }
        if (TeaLeaf.Client.Configuration.tlIEhref) {
            TeaLeaf.Client.Configuration.tlIEhref = false;
            return
        }
        TeaLeaf.Client.tlBeforeUnloadFired = true;
        if (!TeaLeaf.Configuration.xhrAsyncOnUnload) {
            TeaLeaf.Configuration.xhrAsync = false
        }
        if (TeaLeaf.Client.Configuration.tlStoreQueueInCookie) {
            var c = new Date();
            c.setTime(c.getTime() + 300000);
            var b = TeaLeaf.Event.tlQueuedXML.replace(/(\r|\n)/g, "").replace(/;/g, "%3B");
            TeaLeaf.tlSetCookie("tlQueuedXML", b, c, "/")
        }
        if (TeaLeaf.Client.Configuration.tlbeforeunloadflag == true) {
            TeaLeaf.Event.Configuration.tllastdwelltime = new Date();
            TeaLeaf.Client.Configuration.tlunloadflag = false;
            var f = new TeaLeaf.Event(TeaLeaf.$C("PERFORMANCE"), TeaLeaf.$C("BeforeUnload"));
            TeaLeaf.Event.SetType = f.EventType;
            if (!TeaLeaf.Event.SetSubType) {
                TeaLeaf.Event.SetSubType = f.EventSubType
            } else {
                TeaLeaf.Event.SetSubType += "; " + f.EventSubType
            }
            TeaLeaf.Event.Configuration.tlbeforeunloadflag = true;
            var a = [TeaLeaf.$C("MouseMove"), TeaLeaf.Client.tlHasUserMovement ? TeaLeaf.$C("True") : TeaLeaf.$C("False"), TeaLeaf.$C("Action"), TeaLeaf.Client.Configuration.tlactiontype, TeaLeaf.$C("VisitOrder"), TeaLeaf.Event.Configuration.tlvisitorder, TeaLeaf.$C("Alerts"), TeaLeaf.Event.tlGetAlertCount()];
            f.tlAddData(a);
            TeaLeaf.Event.Configuration.tlasync = false;
            f.tlSend();
            TeaLeaf.Event.tlFlushQueue(true);
            TeaLeaf.Event.Configuration.tlvisitorder = ""
        }
        setTimeout(function () {
            TeaLeaf.Client.tlBeforeUnloadFired = false;
            TeaLeaf.Configuration.xhrAsync = true
        }, 1000)
    };
    TeaLeaf.Client.tlUnload = function () {
        var c, a, b, h, d, f, g;
        c = TeaLeaf;
        a = c.Client;
        b = a.Configuration;
        h = c.Event;
        d = h.Configuration;
        a.tlDetachFromAllControls();
        if (!a.tlBeforeUnloadFired && b.tlunloadflag) {
            d.tllastdwelltime = new Date();
            b.tlbeforeunloadflag = false;
            g = new h(c.$C("PERFORMANCE"), c.$C("Unload"));
            h.SetType = g.EventType;
            if (!h.SetSubType) {
                h.SetSubType = g.EventSubType
            } else {
                h.SetSubType += "; " + g.EventSubType
            }
            f = [c.$C("MouseMove"), a.tlHasUserMovement ? c.$C("True") : c.$C("False"), c.$C("Action"), b.tlactiontype, c.$C("VisitOrder"), d.tlvisitorder];
            g.tlAddData(f);
            c.Configuration.xhrAsync = false;
            g.tlSend();
            h.tlFlushQueue(true);
            d.tlvisitorder = ""
        }
    };
    TeaLeaf.Client.tlAttachToAllControls = function () {
        TeaLeaf.Client.Configuration.tlcontrolsattached = true;
        TeaLeaf.Event.tlAddHandler(window, "beforeunload", eval(TeaLeaf.Client.tlBeforeUnload), false);
        TeaLeaf.Event.tlAddHandler(window, "unload", eval(TeaLeaf.Client.tlUnload), false);
        TeaLeaf.Client.tlAttachToControls(window);
        try {
            var ind;
            for (ind = 0; ind < window.frames.length; ind++) {
                if (window == window.frames[ind]) {
                    continue
                }
                TeaLeaf.Client.tlAttachToControls(window.frames[ind])
            }
        } catch (e) {}
    };
    TeaLeaf.Client.tlSingleAttach = function () {
        var tldomsingleelements = TeaLeaf.Client.Configuration.tlSingleAttach;
        for (var i = 0; i < tldomsingleelements.length; i++) {
            if (tldomsingleelements[i].domelementID && tldomsingleelements[i].domelementID != "") {
                var tlelement = document.getElementById(tldomsingleelements[i].domelementID);
                if (tlelement) {
                    var func = eval(tldomsingleelements[i].tlhandler);
                    TeaLeaf.Event.tlAddHandler(tlelement, tldomsingleelements[i].domevent, func, false)
                }
            }
        }
    };
    TeaLeaf.Client.tlAttachToControls = function (win) {
        try {
            var handlers = TeaLeaf.Client.Configuration.tlWindowHandlers;
            for (var i = 0; i < handlers.length; i++) {
                if (handlers[i].load) {
                    var func = eval(handlers[i].tlhandler);
                    TeaLeaf.Event.tlAddHandler(win, handlers[i].domevent, func, false)
                }
            }
            handlers = TeaLeaf.Client.Configuration.tlDocumentHandlers;
            for (var i = 0; i < handlers.length; i++) {
                if (handlers[i].load) {
                    var func = eval(handlers[i].tlhandler);
                    TeaLeaf.Event.tlAddHandler(win.document, handlers[i].domevent, func, false)
                }
            }
            TeaLeaf.Client.tlProcessNode(win.document.body)
        } catch (e) {}
    };
    TeaLeaf.Client.tlCheckAttach = function (control) {
        var i, handlers, item_name, lower_item_name;
        if (control.TeaLeaf || control.TeaLeafExclude) {
            return
        }
        control.TeaLeaf = true;
        if (TeaLeaf.Client.Configuration.tlassignTLID) {
            TeaLeaf.Client.tlAddIdToControl(control)
        }
        switch (control.tagName) {
        case "INPUT":
        case "SELECT":
        case "TEXTAREA":
            TeaLeaf.Event.tlAddHandler(control, "focus", TeaLeaf.Client.tlSetFocusTime, false);
            TeaLeaf.Event.tlAddHandler(control, "blur", TeaLeaf.Client.tlHandleBlur, false);
            TeaLeaf.Event.tlAddHandler(control, "change", TeaLeaf.Client.tlAddEvent, false);
            break
        }
        if (TeaLeaf.Client.Configuration.tlUniversalAttach) {
            handlers = TeaLeaf.Client.Configuration.tlDocumentHandlers;
            for (i = 0; i < handlers.length; i++) {
                if (handlers[i].load) {
                    TeaLeaf.Event.tlAddHandler(control, handlers[i].domevent, eval(handlers[i].tlhandler), false)
                }
            }
        }
    };
    TeaLeaf.Client.tlCheckIndControls = function (d) {
        try {
            if (d.document) {
                var a = d.document.getElementsByTagName("INPUT");
                for (var b = 0; b < a.length; b++) {
                    TeaLeaf.Client.tlCheckAttach(a[b])
                }
                a = d.document.getElementsByTagName("SELECT");
                for (var b = 0; b < a.length; b++) {
                    TeaLeaf.Client.tlCheckAttach(a[b])
                }
                a = d.document.getElementsByTagName("BODY");
                if (a.length > 0) {
                    a = a[0].getElementsByTagName("*");
                    for (var b = 0; b < a.length; b++) {
                        TeaLeaf.Client.tlCheckAttach(a[b])
                    }
                }
            }
        } catch (c) {}
    };
    TeaLeaf.Client.tlProcessNode = function (h, c) {
        var f, b, d, a;
        if (typeof(h) === "string") {
            h = document.getElementById(h)
        }
        if (!h) {
            h = window.document.body
        }
        try {
            switch (h.tagName) {
            case "INPUT":
            case "SELECT":
            case "TEXTAREA":
                TeaLeaf.Client.tlCheckAttach(h);
                break;
            default:
                if (TeaLeaf.Client.Configuration.tlUniversalAttach && TeaLeaf.Client.tlTagNameAllowed(h.tagName)) {
                    TeaLeaf.Client.tlCheckAttach(h)
                }
                break
            }
            if (!c) {
                d = ["INPUT", "SELECT", "TEXTAREA"];
                for (f = 0; f < d.length; f++) {
                    a = h.getElementsByTagName(d[f]);
                    for (b = 0; b < a.length; b++) {
                        TeaLeaf.Client.tlCheckAttach(a[b])
                    }
                }
                if (TeaLeaf.Client.Configuration.tlUniversalAttach) {
                    if (TeaLeaf.Client.Configuration.tlExcludeTags) {
                        a = h.getElementsByTagName("*");
                        for (f = 0; f < a.length; f++) {
                            if (TeaLeaf.Client.tlTagNameAllowed(a[f].tagName)) {
                                TeaLeaf.Client.tlCheckAttach(a[f])
                            }
                        }
                    } else {
                        for (f in TeaLeaf.Client.Configuration.tlNodeTags) {
                            a = h.getElementsByTagName(f);
                            for (b = 0; b < a.length; b++) {
                                TeaLeaf.Client.tlCheckAttach(a[b])
                            }
                        }
                    }
                }
            }
        } catch (g) {}
    };
    TeaLeaf.Client.tlSetFocusTime = function (b) {
        if (!b) {
            b = window.event
        }
        var a = TeaLeaf.Client.tlGetEventSource(b);
        if (!a || a.type == "application/x-shockwave-flash") {
            return
        }
        var a = TeaLeaf.Client.tlGetEventSource(b);
        if (!a) {
            return
        }
        if (!a.TeaLeafFocusTime) {
            a.TeaLeafFocusTime = new Date()
        }
        if (TeaLeaf.Client.Configuration.tlsendfocus) {
            TeaLeaf.Client.tlAddEvent(b)
        }
    };
    TeaLeaf.Client.tlHandleBlur = function (b) {
        if (!b) {
            b = window.event
        }
        var a = TeaLeaf.Client.tlGetEventSource(b);
        if (!a || a.type == "application/x-shockwave-flash") {
            return
        }
        TeaLeaf.Client.tlEndVisit(a);
        if (TeaLeaf.Client.checkIsInput(a)) {
            TeaLeaf.Event.Configuration.tlidoflastvisitedcontrol = TeaLeaf.Client.tlGetName(a)
        }
        if (TeaLeaf.Client.Configuration.tlsendblur) {
            TeaLeaf.Client.tlAddEvent(b)
        }
        a.TeaLeafFocusTime = null
    };
    TeaLeaf.Client.tlEndVisit = function (c) {
        if (c.TeaLeafFocusTime) {
            var a = TeaLeaf.Client.tlGetName(c);
            if (!a) {
                a = TeaLeaf.Client.tlGetAnchor(c, false);
                if (a) {
                    a = "LEVEL" + a
                } else {
                    a = "unnamed"
                }
            }
            var d = TeaLeaf.Event.tlDateDiff(c.TeaLeafFocusTime, new Date());
            var b = a + ":" + d;
            if (TeaLeaf.Event.Configuration.tlvisitorder != "") {
                TeaLeaf.Event.Configuration.tlvisitorder = TeaLeaf.Event.Configuration.tlvisitorder + ";" + b
            } else {
                TeaLeaf.Event.Configuration.tlvisitorder = b
            }
        }
    };
    TeaLeaf.Client.tlDetachFromAllControls = function () {
        TeaLeaf.Client.Configuration.tlcontrolsattached = false;
        TeaLeaf.Client.tlDetachFromControls(window);
        try {
            var b;
            for (b = 0; b < window.frames.length; b++) {
                var a = window.frames[b];
                TeaLeaf.Client.tlDetachFromControls(a)
            }
        } catch (c) {}
    };
    TeaLeaf.Client.tlDetachFromControls = function (win) {
        try {
            var handlers = TeaLeaf.Client.Configuration.tlWindowHandlers;
            for (var i = 0; i < handlers.length; i++) {
                var func = eval(handlers[i].tlhandler);
                TeaLeaf.Event.tlRemoveHandler(win, handlers[i].domevent, func, false)
            }
            handlers = TeaLeaf.Client.Configuration.tlDocumentHandlers;
            for (var i = 0; i < handlers.length; i++) {
                var func = eval(handlers[i].tlhandler);
                TeaLeaf.Event.tlRemoveHandler(win.document, handlers[i].domevent, func, false)
            }
            var items = win.document.getElementsByTagName("INPUT");
            var i;
            for (i = 0; i < items.length; i++) {
                TeaLeaf.Event.tlRemoveHandler(items[i], "change", TeaLeaf.Client.tlAddEvent, false);
                TeaLeaf.Event.tlRemoveHandler(items[i], "blur", TeaLeaf.Client.tlHandleBlur, false);
                items[i].TeaLeaf = false
            }
            items = win.document.getElementsByTagName("SELECT");
            for (i = 0; i < items.length; i++) {
                TeaLeaf.Event.tlRemoveHandler(items[i], "change", TeaLeaf.Client.tlAddEvent, false);
                TeaLeaf.Event.tlRemoveHandler(items[i], "blur", TeaLeaf.Client.tlHandleBlur, false);
                items[i].TeaLeaf = false
            }
        } catch (e) {}
    };
    TeaLeaf.Client.tlAttachToControl = function (domelement, eventtype, eventHandler) {
        if (eventHandler) {
            TeaLeaf.Event.tlAddHandler(domelement, eventtype, eventHandler, false)
        } else {
            TeaLeaf.Event.tlAddHandler(domelement, eventtype, eval(TeaLeaf.Client.tlAddEvent), false)
        }
    };
    TeaLeaf.Client.tlDetachFromControl = function (domelement, eventtype, eventHandler) {
        if (eventHandler) {
            TeaLeaf.Event.tlRemoveHandler(domelement, eventtype, eventHandler, false)
        } else {
            TeaLeaf.Event.tlRemoveHandler(domelement, eventtype, eval(TeaLeaf.Client.tlAddEvent), false)
        }
    };
    TeaLeaf.Client.tlScanForAdditions = function () {
        if (!TeaLeaf.Client.Configuration.tlScheduledScan) {
            return
        }
        TeaLeaf.Client.tlProcessNode(document.body);
        try {
            for (var b = 0; b < window.frames.length; b++) {
                var a = window.frames[b];
                TeaLeaf.Client.tlProcessNode(a.document.body)
            }
        } catch (c) {}
        window.clearTimeout(TeaLeaf.Client.tlTimeoutID);
        TeaLeaf.Client.tlTimeoutID = window.setTimeout(TeaLeaf.Client.tlScanForAdditions, TeaLeaf.Client.Configuration.tlscanupdate)
    };
    TeaLeaf.Client.tlTagNameAllowed = function (a) {
        if (a == null) {
            return false
        }
        var b = TeaLeaf.Client.Configuration.tlNodeTags[a];
        if (b == null) {
            b = false
        }
        if (TeaLeaf.Client.Configuration.tlExcludeTags) {
            return !b
        } else {
            return b
        }
    };
    TeaLeaf.Client.tlStartListeners = function () {
        TeaLeaf.Client.tlAttachToAllControls();
        TeaLeaf.Client.tlSingleAttach()
    };
    TeaLeaf.Client.tlEndListeners = function () {
        TeaLeaf.Event.tlFlushQueue(true);
        TeaLeaf.Client.tlDetachFromAllControls()
    };
    TeaLeaf.Client.tlSendValueChange = function (c, d) {
        var j = new TeaLeaf.Event(TeaLeaf.$C("GUI"), d);
        var h = [TeaLeaf.$C("Name"), c.name, TeaLeaf.$C("Id"), c.id, TeaLeaf.$C("ElementType"), c.type];
        j.tlAddData(h);
        var f = TeaLeaf.Client.tlGetName(c);
        var b = TeaLeaf.Event.tlFormatXMLName(f);
        var a = TeaLeaf.Client.tlReplaceValue(c);
        var g = [TeaLeaf.$C("ValueIn"), b, b, a];
        j.tlAddData(g);
        j.tlSend()
    };
    TeaLeaf.Client.tlSetup = function () {
        var a = TeaLeaf.tlGetCookieValue("tlQueuedXML");
        if (a) {
            TeaLeaf.Event.tlQueuedXML += a.replace(/%3B/g, ";")
        }
        TeaLeaf.Client.tlAttachToAllControls();
        TeaLeaf.Client.tlSingleAttach();
        if (TeaLeaf.Event.Configuration.tlcatchpopups) {
            TeaLeaf.SavedWindowOpen = window.open;
            window.open = function (b, c, f, g) {
                var h = "blocked";
                var d;
                if (typeof TeaLeaf.SavedWindowOpen == "function") {
                    d = TeaLeaf.SavedWindowOpen.apply(this, arguments)
                } else {
                    b = b ? b : "";
                    c = c ? c : "";
                    f = f ? f : "";
                    d = TeaLeaf.SavedWindowOpen(b, c, f, g)
                }
                try {
                    if (!d.closed) {
                        h = "visible"
                    }
                } catch (m) {
                    if (TeaLeaf.Event.Configuration.tlshowexceptions) {
                        alert(m.name + ": " + m.message + "\r\n\r\nPos 8")
                    }
                }
                var l = new TeaLeaf.Event(TeaLeaf.$C("GUI"), TeaLeaf.$C("WindowOpen"));
                var j = [TeaLeaf.$C("Status"), h, TeaLeaf.$C("URL"), escape(b), TeaLeaf.$C("Name"), c, TeaLeaf.$C("Features"), f, TeaLeaf.$C("Replace"), g];
                l.tlAddData(j);
                l.tlSend();
                return d
            }
        }
        window.clearTimeout(TeaLeaf.Client.tlTimeoutID);
        if (TeaLeaf.Client.Configuration.tlscanupdate > 0) {
            TeaLeaf.Client.tlTimeoutID = window.setTimeout(TeaLeaf.Client.tlScanForAdditions, TeaLeaf.Client.Configuration.tlscanupdate)
        }
    };
    TeaLeaf.Client.CallInit = function () {
        TeaLeaf.Event.tlRemoveHandler(window, "beforeunload", eval(TeaLeaf.Client.tlBeforeUnload), false);
        TeaLeaf.Event.tlRemoveHandler(window, "unload", eval(TeaLeaf.Client.tlUnload), false);
        TeaLeaf.addOnLoad(TeaLeaf.Client.tlSetup)
    };
    if (TeaLeaf.Client.Configuration.tlinit == false) {
        TeaLeaf.Client.Configuration.tlinit = true;
        TeaLeaf.Client.CallInit()
    }
};
