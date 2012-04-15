/*
 * Copyright © 1999-2011 TeaLeaf Technology, Inc.
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
 * @version 2011.03.15.1
 *
 */
if (typeof TeaLeaf === "undefined") {
TeaLeaf = {};
TeaLeaf.Private = {};
TeaLeaf.tlStartLoad = new Date();

if (!TeaLeaf.Configuration) {
	TeaLeaf.Configuration = {
	"tlversion" :                 "2011.03.15.1",
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

	"tlurl":                      "/store/tealeaf/TealeafTarget.jsp",
	"tlsecureurl":                "/store/tealeaf/TealeafTargetSecure.jsp",
	"xhrAsync":                   true,
	"xhrAsyncOnUnload":           true,

	"tlDisableIfInactive":        false,
	"tlActivityTimeout":          5,     // minutes, 0 = disable

	/* Cross-domain configuration (if any) */
	"xd_CommonDomain":            "",
	"xd_iframeID":                "",
	"xd_iframeSrcURL":            "",
	"xd_iframeSrcURLSecure":      ""
	};
}
}
/*
 * Copyright © 1999-2011 TeaLeaf Technology, Inc.
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
 * @version 2011.03.15.1
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
			"tlqueueeventstimer"        : 1800000,
			"tlqueueeventsmaxsz"        : 8192, //8192
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
 * Copyright © 1999-2011 TeaLeaf Technology, Inc.
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
 * @version 2011.03.15.1
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
 * Copyright © 1999-2011 TeaLeaf Technology, Inc.
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
 * @version 2011.03.15.1
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
				{"tlfieldname": "TLCREDITCARD",        "caseinsensitive": true, "eventvaluereplace": "",  "eventnovalue": true},
				{"tlfieldname": "tlpassword",          "caseinsensitive": true, "eventvaluereplace": "",  "eventnovalue": true},
				{"tlfieldname": "tlpwd",               "caseinsensitive": true, "eventvaluereplace": "",  "eventnovalue": true},
				{"tlfieldname": "tlqty",               "caseinsensitive": true, "eventvaluereplace": "333",  "eventnovalue": false},
				{"tlfieldname": "billingCardNumber",   "caseinsensitive": true, "eventvaluereplace": "&&&&&&&&&&&&&&&&",  "eventnovalue": false},
				{"tlfieldname": "billingSecurityCode", "caseinsensitive": true, "eventvaluereplace": "&&&&",  "eventnovalue": false},
				{"tlfieldname": "signInUserPassword",  "caseinsensitive": true, "eventvaluereplace": "&&&&&&&&&&&&&&&&",  "eventnovalue": false},
				{"tlfieldname": "BMLsocSecNumb",       "caseinsensitive": true, "eventvaluereplace": "&&&&",  "eventnovalue": false}
		],

		// The mask used by the PreserveMask() masking function.
			tlPrivacyMask: {
			"upperChar":   "X",
			"lowerChar":   "x",
			"numericChar": "9",
			"symbolChar":  "#"
			},

			//	This is the list of events we catch off of the window object
			tlWindowHandlers:[
				{"domevent": "resize",          "load": false,  "tlhandler": "TeaLeaf.Client.tlQueueResize"},
				{"domevent": "focus",           "load": true,  "tlhandler": "TeaLeaf.Client.tlSetFocusTime"},
				{"domevent": "help",            "load": true,  "tlhandler": "TeaLeaf.Client.tlAddEvent"},
				{"domevent": "scroll",          "load": false,  "tlhandler": "TeaLeaf.Client.tlSendScroll"},
				{"domevent": "beforeprint",     "load": false,  "tlhandler": "TeaLeaf.Client.tlAddEvent"},
				{"domevent": "afterprint",      "load": false,  "tlhandler": "TeaLeaf.Client.tlAddEvent"},
				//Mobile events
				{"domevent": "devicemotion",    "load": false,  "tlhandler": "TeaLeaf.Client.tlMotionEvent"},
				{"domevent": "deviceorientation","load": false,  "tlhandler": "TeaLeaf.Client.tlDeviceOrientationEvent"},
				{"domevent": "orientationchange","load": false,  "tlhandler": "TeaLeaf.Client.tlOrientationChangeEvent"}

			],

			//	This is the list of events we catch off of the document object
			tlDocumentHandlers:[
				{"domevent": "click",        "load": true,     "tlhandler": "TeaLeaf.Client.tlAddEvent"},
				{"domevent": "dblclick",     "load": true,     "tlhandler": "TeaLeaf.Client.tlAddEvent"},
				{"domevent": "keyup",        "load": true,     "tlhandler": "TeaLeaf.Client.tlQueueKey"},
				{"domevent": "mousedown",    "load": false,     "tlhandler": "TeaLeaf.Client.tlAddEvent"},
				{"domevent": "mouseup",      "load": false,     "tlhandler": "TeaLeaf.Client.tlAddEvent"},
				{"domevent": "mouseover",    "load": false,     "tlhandler": "TeaLeaf.Client.tlAddEvent"},
				{"domevent": "mouseout",     "load": false,     "tlhandler": "TeaLeaf.Client.tlAddEvent"},
				//	This event is only caught once and turned off.  This is used to
				//	detect robots, since a robot will never have mouse movement.
				{"domevent": "mousemove",    "load": false,     "tlhandler": "TeaLeaf.Client.tlUserMovement"},
				{"domevent": "contextmenu",      "load": false,     "tlhandler": "TeaLeaf.Client.tlAddEvent"},

				//Mobile events:
				{"domevent": "gesturestart",    "load": false,     "tlhandler": "TeaLeaf.Client.tlAddGestureEvent"},
				{"domevent": "gesturechange",   "load": false,     "tlhandler": "TeaLeaf.Client.tlAddGestureEvent"},
				{"domevent": "gestureend",      "load": false,     "tlhandler": "TeaLeaf.Client.tlAddGestureEvent"},
				{"domevent": "touchmove",       "load": false,     "tlhandler": "TeaLeaf.Client.tlAddTouchEvent"},
				{"domevent": "touchstart",      "load": false,     "tlhandler": "TeaLeaf.Client.tlAddTouchEvent"},
				{"domevent": "touchend",        "load": false,     "tlhandler": "TeaLeaf.Client.tlAddTouchEvent"},
				{"domevent": "touchcancel",     "load": false,     "tlhandler": "TeaLeaf.Client.tlAddTouchEvent"}
			],

			tlSingleAttach:[
				{"domelementID": "",    "domevent": "mousedown",    "tlhandler": "TeaLeaf.Client.tlAddEvent"},
				// product details alt view clicks
				{"domelementID": "view_base",    "domevent": "mousedown",    "tlhandler": "TeaLeaf.Client.tlAddEvent"},
				{"domelementID": "view_1top",    "domevent": "mousedown",    "tlhandler": "TeaLeaf.Client.tlAddEvent"},
				{"domelementID": "view_2bottom",    "domevent": "mousedown",    "tlhandler": "TeaLeaf.Client.tlAddEvent"},
				{"domelementID": "view_3front",    "domevent": "mousedown",    "tlhandler": "TeaLeaf.Client.tlAddEvent"},
				{"domelementID": "view_4left",    "domevent": "mousedown",    "tlhandler": "TeaLeaf.Client.tlAddEvent"},
				{"domelementID": "view_5right",    "domevent": "mousedown",    "tlhandler": "TeaLeaf.Client.tlAddEvent"},
				{"domelementID": "view_6back",    "domevent": "mousedown",    "tlhandler": "TeaLeaf.Client.tlAddEvent"},
				//{"domelementID": "fysGoButton",    "domevent": "mousedown",    "tlhandler": "TeaLeaf.Client.tlAddEvent"},

				// product details alt view hovers
				{"domelementID": "view_base",    "domevent": "mouseover",    "tlhandler": "TeaLeaf.Client.tlAddEvent"},
				{"domelementID": "view_1top",    "domevent": "mouseover",    "tlhandler": "TeaLeaf.Client.tlAddEvent"},
				{"domelementID": "view_2bottom",    "domevent": "mouseover",    "tlhandler": "TeaLeaf.Client.tlAddEvent"},
				{"domelementID": "view_3front",    "domevent": "mouseover",    "tlhandler": "TeaLeaf.Client.tlAddEvent"},
				{"domelementID": "view_4left",    "domevent": "mouseover",    "tlhandler": "TeaLeaf.Client.tlAddEvent"},
				{"domelementID": "view_5right",    "domevent": "mouseover",    "tlhandler": "TeaLeaf.Client.tlAddEvent"},
				{"domelementID": "view_6back",    "domevent": "mouseover",    "tlhandler": "TeaLeaf.Client.tlAddEvent"},

				{"domelementID": "",    "domevent": "mouseout",     "tlhandler": "TeaLeaf.Client.tlAddEvent"},
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
