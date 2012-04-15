var cnnLockToggle = false;

function CNN_getCookies() {
	var hash = new Array;
	if ( document.cookie ) {
		var cookies = document.cookie.split( '; ' );
		for ( var i = 0; i < cookies.length; i++ ) {
			var namevaluePairs = cookies[i].split( '=' );
			hash[namevaluePairs[0]] = unescape( namevaluePairs[1] ) || null;
		}
	}
	return hash;
}

function CNN_parseCookieData( cookieDataString ) {
	var cookieValues = new Object();
	var separatePairs = cookieDataString.split( '&' );
	for ( var i = 0; i < separatePairs.length; i++  ) {
		var separateValues = separatePairs[i].split( ':' );
		cookieValues[separateValues[0]] = separateValues[1] || null;
	}
	return cookieValues;
}

function CNN_setCookie( name, value, hours, path, domain, secure ) {
		var numHours = 0;

		if ( hours) {
			if ( (typeof(hours) == 'string') && Date.parse(hours) ) { // already a Date string
				numHours = hours;
			} else if ( typeof(hours) == 'number' ) { // calculate Date from number of hours
				numHours = ( new Date((new Date()).getTime() + hours*3600000) ).toGMTString();
			}
		}

		document.cookie = name + '=' + escape(value) + ((numHours)?(';expires=' + numHours):'') + ((path)?';path=' + path:'') + ((domain)?';domain=' + domain:'') + ((secure && (secure == true))?'; secure':''); // Set the cookie, adding any parameters that were specified.

}


function CNN_killCookie( name, path, domain ) {
	var allCookies = CNN_getCookies();

	var theValue = allCookies[ name ] || null; // We need the value to kill the cookie
	if ( theValue ) {
		document.cookie = name + '=' + theValue + '; expires=Fri, 13-Apr-1970 00:00:00 GMT' + ((path)?';path=' + path:'') + ((domain)?';domain=' + domain:''); // set an already-expired cookie
	}
}


var allCookies = CNN_getCookies();
var cnnDomainArray = location.hostname.split( '.' );
var cnnCurrDomain = ( cnnDomainArray.length > 1 ) ? '.' + cnnDomainArray[cnnDomainArray.length-2] + '.' + cnnDomainArray[cnnDomainArray.length-1] : '';

var pagetypeTS="";

function cnnRenderTimeStamp(date,timeString) {
	var cnnIsIntl = (location.hostname.indexOf('edition.') > -1) ? true : false;
	cnnStoryPublishTime = (date) ? new Date(date) : cnnStoryPublishTime;
	var days = new Array('Sun','Mon','Tue','Wed','Thur','Fri','Sat');
	var months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');

    var cnnTimeStampDiff = cnnCurrTime.getTime() - cnnStoryPublishTime.getTime();

    var daysDifference = Math.floor(cnnTimeStampDiff/1000/60/60/24);

    cnnTimeStampDiff -= daysDifference*1000*60*60*24

    var hoursDifference = Math.floor(cnnTimeStampDiff/1000/60/60);

    cnnTimeStampDiff -= hoursDifference*1000*60*60

    var minutesDifference = Math.floor(cnnTimeStampDiff/1000/60);

    cnnTimeStampDiff -= minutesDifference*1000*60

	var cnnDays = (daysDifference > 1) ? "days" : "day";
	var cnnHours = (hoursDifference > 1) ? "hours" : "hour";
	var cnnMinutes = (minutesDifference > 1) ? "minutes" : "minute";
	var cnnHPMinutes = "min";
	var cnnCMSTimeString = '';
	var cnnBlankString = "";

	if (timeString) {
		cnnCMSTimeString = (cnnIsIntl) ? timeString[0] : timeString[1];
	}	else { //for legacy support
		cnnCMSTimeString = "updated " + (!cnnIsIntl ? days[cnnStoryPublishTime.getUTCDay()] : '') + " " + months[cnnStoryPublishTime.getUTCMonth()] + " " + cnnStoryPublishTime.getUTCDate() + ", " + cnnStoryPublishTime.getUTCFullYear();
	}


	if (hoursDifference > 4 && daysDifference >= 0 || daysDifference >= 1) {
		switch(pagetypeTS) {
			case "homepage": //t2 formatted
				return cnnBlankString;
			break;
			case "mosaic":
				return "<div class=\"cnnGryTmeStmp\">" + cnnCMSTimeString + "<\/div>";
			break;
			case "search_07":
				if (daysDifference < 1) {
					if (minutesDifference > 0) {
						return "<span class=\"cnnContentTimeStampGrey\">updated " + hoursDifference + " "+cnnHours+", " + minutesDifference + " "+cnnMinutes+" ago<\/span>";
					} else {
						return "<span class=\"cnnContentTimeStampGrey\">updated " + hoursDifference + " "+cnnHours+" ago<\/span>";
					}
				} else if (daysDifference < 3) {
					return "<span class=\"cnnContentTimeStampGrey\">updated " + daysDifference + " "+cnnDays+" ago<\/span>";
				} else {
					return "<span class=\"cnnContentTimeStampGrey\">" + cnnCMSTimeString + "<\/span>";
				}
			break;
			case "section":
			default:
				if (pagetypeTS == 'section' && cnnIsIntl) {
					return "<div class=\"cnnGryTmeStmp\">" + cnnCMSTimeString + "<\/div>";
				} else {
					return "<div class=\"cnnGryTmeStmp\">updated " + (!cnnIsIntl ? days[cnnStoryPublishTime.getUTCDay()] : '') + " " + months[cnnStoryPublishTime.getUTCMonth()] + " " + cnnStoryPublishTime.getUTCDate() + ", " + cnnStoryPublishTime.getUTCFullYear() + "<\/div>";
				}
		}
	} else if( hoursDifference <= 4 && hoursDifference >= 1) {
		switch(pagetypeTS) {
			case "homepage": //t2 formatted
				return cnnBlankString;
			break;
			case "search_07":
				if (minutesDifference > 0) {
					return "<span class=\"cnnContentTimeStampGrey\">updated " + hoursDifference + " "+cnnHours+", " + minutesDifference + " "+cnnMinutes+" ago<\/span>";
				} else {
					return "<span class=\"cnnContentTimeStampGrey\">updated " + hoursDifference + " "+cnnHours+" ago<\/span>";
				}
			break;
			case "mosaic":
			default:
				if (minutesDifference > 0) {
					return "<div class=\"cnnGryTmeStmp\">updated " + hoursDifference + " "+cnnHours+", " + minutesDifference + " "+cnnMinutes+" ago<\/div>";
				} else {
					return "<div class=\"cnnGryTmeStmp\">updated " + hoursDifference + " "+cnnHours+" ago<\/div>";
				}
		}
	} else {
		switch(pagetypeTS) {
			case "homepage": //t2 formatted
				if(hoursDifference < 1 && minutesDifference > 0){
					return '<span>' + minutesDifference + " min<\/span>";
				} else {
					return "<span>1 min<\/span>";
				}
			break;
			case "search_07":
				if(hoursDifference < 1 && minutesDifference > 0){
					return "<span class=\"cnnContentTimeStamp\">updated " + minutesDifference + " "+cnnMinutes+" ago<\/span>";
				} else {
					return "<span class=\"cnnContentTimeStamp\">updated 1 minute ago<\/span>";
				}
			case "mosaic":
			default:
				if(hoursDifference < 1 && minutesDifference > 0){
					return "updated " + minutesDifference + " "+cnnMinutes+" ago";
				} else {
					return "updated 1 minute ago";
				}
		}

	}
}

function cnnRenderBackStoryTimeStamp(date,timeString) {
	cnnStoryPublishTime = new Date(date);
	var days = new Array('Sun','Mon','Tue','Wed','Thur','Fri','Sat');
	var months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
    var cnnTimeStampDiff = cnnCurrTime.getTime() - cnnStoryPublishTime.getTime();
    var daysDifference = Math.floor(cnnTimeStampDiff/1000/60/60/24);
    cnnTimeStampDiff -= daysDifference*1000*60*60*24
    var hoursDifference = Math.floor(cnnTimeStampDiff/1000/60/60);
    cnnTimeStampDiff -= hoursDifference*1000*60*60
    var minutesDifference = Math.floor(cnnTimeStampDiff/1000/60);
    cnnTimeStampDiff -= minutesDifference*1000*60
	var cnnDays = (daysDifference > 1) ? "days" : "day";
	var cnnHours = (hoursDifference > 1) ? "hours" : "hour";
	var cnnMinutes = (minutesDifference > 1) ? "minutes" : "minute";
	var cnnCMSTimeString = '';
	if (timeString) {
		cnnCMSTimeString = timeString;
	}
	if (hoursDifference > 4 && daysDifference >= 0 || daysDifference >= 1) {
		return "<span class=\"cnnDate\">" + cnnCMSTimeString + "<\/span>";
	} else if( hoursDifference <= 4 && hoursDifference >= 1) {
		if (minutesDifference > 0) {
			return "<span class=\"cnnDate\">updated " + hoursDifference + " "+cnnHours+", " + minutesDifference + " "+cnnMinutes+" ago<\/span>";
		} else {
			return "<span class=\"cnnDate\">updated " + hoursDifference + " "+cnnHours+" ago<\/span>";
		}
	} else {
		if(hoursDifference < 1 && minutesDifference > 0){
			return "<span class=\"cnnDate\" style=\"color:#CB0003;\">updated " + minutesDifference + " "+cnnMinutes+" ago</span>";
		} else {
			return "<span class=\"cnnDate\" style=\"color:#CB0003;\">updated 1 minute ago</span>";
		}
	}
}

function cnnRenderT1TimeStamp(date,useLongFormat) {

	cnnStoryPublishTime = (date) ? new Date(date) : cnnStoryPublishTime;
	var cnnTimeStampString;
	var nullString="";



    var cnnTimeStampDiff = cnnCurrTime.getTime() - cnnStoryPublishTime.getTime();

    var daysDifference = Math.floor(cnnTimeStampDiff/1000/60/60/24);

    cnnTimeStampDiff -= daysDifference*1000*60*60*24

    var hoursDifference = Math.floor(cnnTimeStampDiff/1000/60/60);

    cnnTimeStampDiff -= hoursDifference*1000*60*60

    var minutesDifference = Math.floor(cnnTimeStampDiff/1000/60);

    cnnTimeStampDiff -= minutesDifference*1000*60

    var secondsDifference = Math.floor(cnnTimeStampDiff/1000);


	var cnnDays = (daysDifference > 1) ? "days" : "day";
	var cnnHours = (hoursDifference > 1) ? "hours" : "hour";
	var cnnMinutes = (minutesDifference > 1) ? "minutes" : "minute";
	var cnnSeconds = (secondsDifference > 1) ? "seconds" : "second";
	var cnnHPMinutes = (minutesDifference > 1) ? "minutes" : "minute";
	var cnnHPSeconds = (secondsDifference > 1) ? "secs" : "sec";

	if (pagetypeTS=='homepage') {

			cnnTimeStampString = 'updated ';

		if(hoursDifference < 1 && minutesDifference > 0){
			cnnTimeStampString += minutesDifference + " "+(useLongFormat?cnnMinutes:cnnHPMinutes)+" ago";
		} else if(hoursDifference < 1 && minutesDifference < 1) {
			cnnTimeStampString += secondsDifference + " "+(useLongFormat?cnnSeconds:cnnHPSeconds)+" ago";
		} else if(hoursDifference >= 1) {
			return nullString;
		}
		return '<span>'+cnnTimeStampString+'</span>';
	}

}


function CNN_submitUserComment(form) {
var cnnSubmitForm = true;

if(typeof(cnnThread) != "undefined") {
	$(form).threadName.value = cnnThread;
}
if(typeof(cnnForum) != "undefined") {
  $(form).forumName.value  = cnnForum;
}

var errorDivs = $('cnnROCSubFrm').getElementsByClassName('cnnError');
for (var i = 0; i<errorDivs.length; i++) {
	errorDivs[i].remove();
}

allFormEls = Form.getElements(form);
for(i = 0; i < allFormEls.length; i++) {
    //do something to each form field
    allFormEls[i].value = allFormEls[i].value.strip().stripScripts().stripTags();
    if (allFormEls[i].value == "") {
    		if (allFormEls[i].name == "name") {
    			new Insertion.Before('cnnUserResponseName',' <span id="cnnUserResponseNameError" class="cnnError">&raquo;<\/span>');
    		}
    		if (allFormEls[i].name == "location") {
    			new Insertion.Before('cnnUserResponseLocation',' <span id="cnnUserResponseNameError" class="cnnError">&raquo;<\/span>');
    		}
    		if (allFormEls[i].name == "body") {
    			new Insertion.Before('cnnUserResponseComment',' <span id="cnnUserResponseNameError" class="cnnError">&raquo;<\/span>');
    		}
    	cnnSubmitForm = false;
	}
}

	if (cnnSubmitForm) {

			new Effect.Opacity('cnnROCFrm',
					{
						duration:1.0,
						from:1.0,
						to:0,
						beforeStart:function() {
					  		document.cnnROCSubFrm.submit();
						},
						afterFinish: function(obj)
							{
							Form.reset(form);					      		$('cnnROCFrmComplete').innerHTML = "Thank you for contributing. Comments are moderated by CNN and will not appear on this story until after they have been reviewed and deemed appropriate for posting. Unfortunately, due to the volume of comments we receive, not all comments can be posted.<br><br><a href=\"javascript:void(0);\" onclick=\"CNN_toggleSubmissionForm('cnnROCFrm','cnnROCFrmComplete')\">Post another comment<\/a>";
									new Effect.Opacity('cnnROCFrmComplete',
										{
											duration:1.0,
											from:0,
											to:1.0,
											beforeUpdate:function(obj) {
												$('cnnROCFrm').hide();
												obj.element.show();
											}
										}
									);
							}

					}
				);
	}
}

function CNN_toggleSubmissionForm(show,hide) {

new Effect.Opacity(hide,
					{
						duration:1.0,
						from:1.0,
						to:0,
						afterFinish: function(obj)
							{
								new Effect.Opacity(show,
										{
											duration:1.0,
											from:0,
											to:1.0,
											beforeUpdate:function(obj) {
												$(hide).hide();
												obj.element.show();
											}
										}
									);
							}
					}
				)


}

function cnnShowExtendedComments(el) {
	var block = document.getElementsByClassName('cnnExtended',el.parentNode.parentNode);
	if (block && block.length > 0) {
		cnnToggleUGC(block[0],el);
		el.style.display = "none";
	}
}

function cnnHideExtendedComments(el) {
	var block = el.parentNode.parentNode;
	var blockLinks = block.parentNode.getElementsByTagName('a');
	if (block) {
		cnnToggleUGC(block,el);
			for (var i=0; i < blockLinks.length; i++) {
				blockLinks[i].style.display = "inline";
		}
	}
}

function cnnShowMore(el) {
	var block = document.getElementsByClassName('cnnExtended',el.parentNode.parentNode);
	var initialGraph = el.parentNode.getElementsByTagName('p');
	if (block && block.length > 0) {
el.parentNode.hide();
block[0].show();
	}
}

function cnnShowLess(el) {
	var block = el.parentNode.parentNode;
	var blockLinks = block.parentNode.getElementsByTagName('p');

	block.hide();
	blockLinks[0].show();

}

function cnnToggleUGC(el,lnk) {
	if (cnnLockToggle) {
		return;
	}

	cnnLockToggle = true;
	var cnnToggleClass = (lnk.parentNode.className.indexOf('Closed') > -1) ? true : false;

		Effect.toggle(el,'blind',
		{
			beforeStart:function(obj) {
				try {
					lnk.blur();
				} catch(e) {};
				if (cnnToggleClass) {
				switch(lnk.parentNode.className) {
					case 'cnnOpinionClosed':
						lnk.parentNode.className = 'cnnOpinion';
					break;
					case 'cnnIReportClosed':
						lnk.parentNode.className = 'cnnIReport';
					break;
					case 'cnnBlogsClosed':
						lnk.parentNode.className = 'cnnBlogs';
						Sphere.Widget.search();
					break;
					default:
				}
				}

			},
			afterFinish:function(obj) {
				if (!cnnToggleClass) {
				switch(lnk.parentNode.className) {
					case 'cnnOpinion':
						lnk.parentNode.className = 'cnnOpinionClosed';
					break;
					case 'cnnIReport':
						lnk.parentNode.className = 'cnnIReportClosed';
					break;
					case 'cnnBlogs':
						lnk.parentNode.className = 'cnnBlogsClosed';
					break;
					default:
				}
				}
				cnnLockToggle = false;
			}
		}
	);
}

function cnnToggleNestedContent(el,lnk,num,desc) {
if (cnnLockToggle) {
	return;
}

cnnLockToggle = true;
var cnnLnkTxt = "Last 3 comments only";
		Effect.toggle(el,'blind',
		{
			duration:0.5,
			afterFinish: function() {
				if(!desc) {
					if (lnk.innerHTML == cnnLnkTxt) {
						lnk.innerHTML = "See all " + num + " comments";
					} else {
						lnk.innerHTML = cnnLnkTxt;
					}
				}
				cnnLockToggle = false;
			},
			beforeStart: function() {
				if(desc) {
					$(lnk).style.display = "none";
				}

			}
		}

		);


}


function CNN_displayBlogContent(widgetLoading,widgetContent) {
	if (!$(widgetLoading) || !$(widgetContent)) {
		return;
	}

			Effect.BlindUp(widgetLoading,
				{
					afterFinish:function(obj) {
						$(obj.element.id).remove();
					}
				}
			);
			Effect.BlindDown(widgetContent);
}


var cnnHasOpenPopup = 0;
// this is for opening pop-up windows
function CNN_openPopup( url, name, widgets, openerUrl )
{
	var host = location.hostname;
	if (window == top) { window.top.name = "opener"; }
	var popupWin = window.open( url, name, widgets );
	if(popupWin) {cnnHasOpenPopup = 1;}
	if ( popupWin && popupWin.opener ) {
		if ( openerUrl )
		{
			popupWin.opener.location = openerUrl;
		}
	}
	if ( popupWin) {
		popupWin.focus();
	}
}

function cnnImgSwap( strId, intSwap ) {
	// assumes 2 images: image.gif and image_over.gif
	var imgObj = (typeof(strId) == "object") ? strId.getElementsByTagName('img')[0] : document.getElementById( strId );
	var strTemp = imgObj.src;
	var intStrLength = strTemp.length;
	var intChop, strEnd;

	if ( intSwap ) {
		if (strTemp.indexOf('_over.gif') == -1) {
			intChop = intStrLength - 4;
			strEnd = '_over.gif';
		}
	} else {
		if (strTemp.indexOf('_over.gif') > -1) {
			intChop = intStrLength - 9;
			strEnd = '.gif';
		}
	}

	if (typeof(intChop) != "undefined") {
		strTemp = strTemp.substring( 0, intChop );
	}

	if (typeof(strEnd) != "undefined") {
		imgObj.src = strTemp + strEnd;
	}
}

/*

Flash Detect and Render
=======================

The CNN_FlashObject takes a few required arguments...

	name ......... the id/name of the object/embed
	src .......... the URL of the swf
	width ........ (i think this should be required)
	height ....... (i think this should be required)

...and some optional arguments...

	parameters ... this is a "hash" of keys and values
		{ menu: "true", play: "false", loop: "false" }
		(or set this to null or an empty string to skip)

	flashVars .... this is a hash or a string
		{ cs_url: "/football/nfl/scoreboards/today/" }
		- or -
		"cs_url=/football/nfl/scoreboards/today/"


Sample Usage:
if ( new CNN_FlashDetect().detectVersion( 6 ) ) {

	var cnn_Scoreboard = new CNN_FlashObject( "cnnScoreboard",
		"/.element/img/2.0/swf/nfl_scoreboard.swf",
		420, 85, null, "cs_url=/football/nfl/scoreboards/today/" );

	cnn_Scoreboard.writeHtml();

} else {
	document.write( 'alternate html' );
}

Of course, if you plan to have Flash in lots of places on a page,
it might make more sense to make a global variable for the detection.
You could go as far as creating a session-based cookie...

*/

var VBS_Result = false;

function CNN_FlashDetect() { }

CNN_FlashDetect.prototype.maxVersionToDetect = 10;
CNN_FlashDetect.prototype.minVersionToDetect = 3;

CNN_FlashDetect.prototype.hasPlugin = ( navigator.mimeTypes &&
		navigator.mimeTypes.length &&
		navigator.mimeTypes["application/x-shockwave-flash"] &&
		navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin );

CNN_FlashDetect.prototype.hasActiveX = window.ActiveXObject;

CNN_FlashDetect.prototype.hasWinIE = ( navigator.userAgent &&
		( navigator.userAgent.indexOf( "MSIE" ) != -1 ) &&
		navigator.appVersion &&
		( navigator.appVersion.indexOf( "Win" ) != -1 ) );

CNN_FlashDetect.prototype.getVersion = function () {
	var versionNum = 0;
	var i = 0;

	if ( this.hasActiveX ) {
		var activeXObject = false;
		for ( i = this.maxVersionToDetect; i >= this.minVersionToDetect && !activeXObject; versionNum = ( activeXObject ? i : versionNum ), i-- ) {
			try {
				activeXObject = new ActiveXObject( "ShockwaveFlash.ShockwaveFlash." + i );
			} catch( e ) {
				// do nothing
			}
		}
	} else if ( this.hasWinIE ) {
		VBS_Result = false;
		for ( i = this.maxVersionToDetect; i >= this.minVersionToDetect && !VBS_Result; versionNum = ( VBS_Result ? i : versionNum ), i-- ) {
			execScript( 'on error resume next: VBS_Result = IsObject( CreateObject( "ShockwaveFlash.ShockwaveFlash.' + i + '" ) )', 'VBScript' );
		}
	} else if ( this.hasPlugin ) {
		if ( navigator.plugins && navigator.plugins.length && navigator.plugins["Shockwave Flash"] ) {
			var words = navigator.plugins["Shockwave Flash"].description.split( " " );
			for ( i = 0; i < words.length; ++i ) {
				var wordAsNum = parseInt( words[i], 10 ); 
				if ( isNaN( wordAsNum ) ) { 
					continue; 
				}
				else { 
					versionNum = wordAsNum; 
					break; // assume first number we get is version number 
				} 
			}
		}
	}

	return ( versionNum );
}

CNN_FlashDetect.prototype.detectVersion = function ( num ) {
	var isVersionSupported = false;

	if ( ! isNaN( num ) ) {
		isVersionSupported = ( parseInt( this.getVersion(), 10 ) >= parseInt( num, 10 ) ); 
	}

	return ( isVersionSupported );
}


function CNN_FlashObject( p_name, p_src, p_width, p_height, p_parameters, p_flashVars ) {
	this.m_name			= p_name;
	this.m_src			= p_src;
	this.m_width		= p_width;
	this.m_height		= p_height;
	this.m_flashVars	= p_flashVars;

// constructor
	if ( p_parameters )
	{
		this.setParams( p_parameters );
	}
}

// Declare member properties
CNN_FlashObject.prototype.m_name = '';
CNN_FlashObject.prototype.m_src = '';
CNN_FlashObject.prototype.m_width = '';
CNN_FlashObject.prototype.m_height = '';
CNN_FlashObject.prototype.m_flashVars = '';

CNN_FlashObject.prototype.m_params = {
	menu:		"false",
	quality:	"high",
	allowScriptAccess:		"always",
	wmode:		"transparent"

};

CNN_FlashObject.prototype.setParam = function ( p_name, p_value ) {
	this.m_params[ p_name ] = p_value;
}

CNN_FlashObject.prototype.setParams = function ( p_paramHash ) {
	if ( typeof p_paramHash == "object" ) {
		for ( var param in p_paramHash ) {
			if ( p_paramHash[param] ) {
				this.setParam( param, p_paramHash[param] );
			}
		}
	}
}

CNN_FlashObject.prototype.getParam = function ( p_name ) {
	return ( this.m_params[ p_name ] );
}

CNN_FlashObject.prototype.getParams = function () {
	return ( this.m_params );
}

CNN_FlashObject.prototype.getFlashVarsString = function () {
	var flashVarsString = '';

	if ( typeof this.m_flashVars == "string" ) {
		flashVarsString = this.m_flashVars;
	} else if ( typeof this.m_flashVars == "object" ) {
		for ( var flashVar in this.m_flashVars ) {
			if ( flashVarsString != '' ) {
				flashVarsString += "&";
			}
			flashVarsString += flashVar + "=" + escape( this.m_flashVars[flashVar] );
		}
	}

	return ( flashVarsString );
}

CNN_FlashObject.prototype.getAttributeString = function ( p_attr, p_value ) {
	return ( p_value ? ' ' + p_attr + '="' + p_value + '"' : '' );
}

CNN_FlashObject.prototype.getParamTag = function ( p_name, p_value ) {
	return ( p_value ? '<param name="' + p_name + '" value="' + p_value + '">' : '' );
}

CNN_FlashObject.prototype.getHtml = function () {
	var htmlString = '';
	var eachParam = '';
	var flashUrl = 'http://www.macromedia.com/go/getflashplayer';

// open object
	htmlString += '<object type="application/x-shockwave-flash" \
					classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"';
	htmlString += this.getAttributeString( 'pluginspage', flashUrl );
	htmlString += this.getAttributeString( 'id', this.m_name );
	htmlString += this.getAttributeString( 'data', this.m_src );
	htmlString += this.getAttributeString( 'width', this.m_width );
	htmlString += this.getAttributeString( 'height', this.m_height );
	htmlString += '>';
	htmlString += this.getParamTag( 'movie', this.m_src );
	for ( eachParam in this.getParams() ) {
		htmlString += this.getParamTag( eachParam, this.getParam( eachParam ) );
	}
	htmlString += this.getParamTag( 'flashVars', this.getFlashVarsString() );

// open embed
	htmlString += '<embed type="application/x-shockwave-flash"';
	htmlString += this.getAttributeString( 'pluginspage', flashUrl );
	htmlString += this.getAttributeString( 'name', this.m_name );
	htmlString += this.getAttributeString( 'src', this.m_src );
	htmlString += this.getAttributeString( 'width', this.m_width );
	htmlString += this.getAttributeString( 'height', this.m_height );
	for ( eachParam in this.getParams() ) {
		htmlString += this.getAttributeString( eachParam, this.getParam( eachParam ) );
	}
	htmlString += this.getAttributeString( 'flashVars', this.getFlashVarsString() );
	htmlString += '>';

// close embed
	htmlString += '<\/embed>';

// close object
	htmlString += '<\/object>';

	return ( htmlString );
}

CNN_FlashObject.prototype.writeHtml = function () {
	document.write( this.getHtml() );
}

CNN_FlashObject.prototype.writeMosaicHtml = function (id) {
	document.getElementById(id).innerHTML =  this.getHtml();
}


//   story comments functions
//====================================================== START

var commentsWindow = 25;
var currentPage = 1;
var cnnInitialDisplay = 3;
var nextLink = false;
var loadingComments = false;
var firstTimeNested = true;
var getThisMany = 0;

//gets next set of comments - of length: commentsWindow*currentPage
function CNN_getNextComments(){
	if(loadingComments){ return; }
	loadingComments=true;
	currentPage++;
	getThisMany = commentsWindow * currentPage + cnnInitialDisplay + 1;

	window.setTimeout(function() {	
		CSIManager.getInstance().call('http://comments.cnn.com/comments/rss/rssmessages.jspa','full=true&outputType=JSON_BOXED&forumName='+cnnForum+'&threadName='+cnnThread+'&numItems='+getThisMany,'objectid', CNN_loadNextIntoOpinionBox, false, 'cnnComments'+currentPage);
	},500);
}

//handler for CNN_getNextComments
function CNN_loadNextIntoOpinionBox(obj){
    var CNN_comment = '';
	var hideableComments = '';
	var makeHidden = 'visible';
	for (var xx = 0; xx < cnnInitialDisplay; xx++){
    		var clObject = obj.rss.channel.item[xx];
		hideableComments += CNN_generateACommentDiv(clObject);
    	}
    	for (var xx = ((currentPage-1) * commentsWindow)+cnnInitialDisplay; xx < obj.rss.channel.item.length; xx++) {
		var clObject = obj.rss.channel.item[xx];
			if (xx < (getThisMany -1))	{	
				CNN_comment += CNN_generateACommentDiv(clObject);
			}
    	}
        if(obj.rss.channel.item.length < getThisMany || (obj.rss.channel.item.length-((currentPage-1) * commentsWindow))+cnnInitialDisplay < commentsWindow){
		document.getElementById('nextLink').style.visibility = "hidden";
		nextLink = false;
	}
	var nextLinkHtmlVisible = 'visible';
	if(!nextLink){
		nextLinkHtmlVisible='hidden';
	}

	var cnnShowExpandedLnk = $('cnnOpinionContainer').getElementsByClassName('cnnExpandCommentsLnk');
	cnnShowExpandedLnk[0].innerHTML = '<a href="javascript:void(0)" onclick="CNN_ToggleNestedStoryContent(\'cnnOpinionSubContainer\',this, \''+commentsWindow+'\',null);">Last '+cnnInitialDisplay+' comments only<\/a><span id="nextLink" style="visibility:'+nextLinkHtmlVisible+'"> | <a href="javascript:void(0)" onclick="CNN_getNextComments();">Next '+commentsWindow+' comments &raquo;</a></span>';
	loadingComments = false;
	return "<div id='allComments'>"+hideableComments+"<div id='cnnOpinionSubContainer'>"+document.getElementById("cnnOpinionSubContainer").innerHTML+CNN_comment+"</div></div>";
}

//builds a single comment element
function CNN_generateACommentDiv(clObject){
		var CNN_comment = '';
        CNN_comment += '                <div class="cnnUGCBox">';
        CNN_comment += '                        <div class="cnnUGCBoxHeader"><img src="http://i.cdn.turner.com/cnn/.element/img/2.0/mosaic/base_skins/UGC/b_ugc_TL.gif" alt="" width="4" height="4"><\/div>';
        CNN_comment += '                        <div class="cnnBoxContent">';
        CNN_comment += '                                <div class="cnnMeta">';
        CNN_comment +=                                  '<span class="cnnContributor">'+clObject['jf:author']+'<\/span><br>';
        CNN_comment += cnnRenderTimeStamp(clObject['pubDate']);
        CNN_comment += '                                <\/div>';
        CNN_comment += '                                <p>';
        CNN_comment += clObject['description'].truncate(300,' ...<a href="javascript:void(0);" onclick="cnnShowMore(this);return false">more<\/a>');
        CNN_comment += '                                <\/p>';

        CNN_comment += '                                <div class="cnnExtended" style="display:none;"><p>';
        CNN_comment += clObject['description'];
        CNN_comment += '                                <a href="javascript:void(0);" onclick="cnnShowLess(this);return false;">less<\/a><\/p><\/div>';


        CNN_comment += '                        <\/div>';
        CNN_comment += '                        <div class="clear"><img src="http://i.cdn.turner.com/cnn/images/1.gif" width="1" height="1" border="0" alt=""></div><div class="cnnUGCBoxFooter"><img src="http://i.cdn.turner.com/cnn/.element/img/2.0/mosaic/base_skins/UGC/b_ugc_BL.gif" alt="" width="4" height="4"><\/div>';
        CNN_comment += '                <\/div>';
	return CNN_comment;
}

//empties the comments
function CNN_clearOutComments(){
	currentPage = 0;
	document.getElementById("cnnOpinionSubContainer").innerHTML='';
}

//shows/hides comments + next link appropraitely
function CNN_ToggleNestedStoryContent(el,lnk,num,desc) {
	if (cnnLockToggle) {
		return;
	}
	cnnLockToggle = true;
	var cnnLnkTxt = "Last 3 comments only";
		Effect.toggle(el,'blind',
		{
			duration:0.5,
			afterFinish: function() {
				if(!desc) {
					if (lnk.innerHTML == cnnLnkTxt) {
						lnk.innerHTML = "Next " + commentsWindow + " comments &raquo;";
						nextLink = false;
						currentPage = 0;
						CNN_clearOutComments();
						document.getElementById('nextLink').style.visibility = "hidden";
					} else {
						if(!firstTimeNested){
							CNN_getNextComments();
						}						
						if(firstTimeNested && (num < (commentsWindow * currentPage + cnnInitialDisplay + 1))) {
							nextLink = false;
						} else {
							nextLink = true;
							document.getElementById('nextLink').style.visibility = "visible";
						}
						firstTimeNested = false;
						lnk.innerHTML = cnnLnkTxt;

					}
				}
				cnnLockToggle = false;
			},
			beforeStart: function() {
				if(desc) {
					$(lnk).style.display = "none";
				}

			}
		}

	);
}

//initial load
function CNN_loadReaderOpinion(obj) {

	if (typeof cnnFirstPub != "undefined") {
	    var cnnTimeDiff = cnnCurrTime.getTime() - cnnFirstPub.getTime();
    	var hoursDifference = Math.floor(cnnTimeDiff/1000/60/60);
		if (hoursDifference > 23) {
			cnnCommentsClosed = true;
		}
	}

if (typeof cnnExtendCommenting != "undefined" && cnnExtendCommenting) {
	cnnCommentsClosed = false;
}


if (typeof cnnCommentsClosed != "undefined" && cnnCommentsClosed) {
	if ($('cnnCommentFooter')) {
		$('cnnCommentFooter').remove();
	}
	if ($('cnnROCFrm')) {
		$('cnnROCFrm').remove();
	}
	if ($('cnnROCFrmComplete')) {
		$('cnnROCFrmComplete').innerHTML = "This story is no longer available for comments, though you may read comments that were posted previously. Browse other stories for new opportunities to comment on the latest news.";
		$('cnnROCFrmComplete').show();
	}
}

			var CNN_comment = '';


		if(!obj || !obj.rss || !obj.rss.channel || !obj.rss.channel.item) {
    	CNN_comment += '		<div class="cnnUGCBox">';
    	CNN_comment += '			<div class="cnnUGCBoxHeader"><img src="http://i.cdn.turner.com/cnn/.element/img/2.0/mosaic/base_skins/UGC/b_ugc_TL.gif" alt="" width="4" height="4"><\/div>';
    	CNN_comment += '			<div class="cnnBoxContent">';
    	CNN_comment += '<p style="margin-left:6px;">No comments yet.<\/p>';
    	CNN_comment += '			<\/div>';
    	CNN_comment += '			<div class="clear"><img src="http://i.cdn.turner.com/cnn/images/1.gif" width="1" height="1" border="0" alt=""></div><div class="cnnUGCBoxFooter"><img src="http://i.cdn.turner.com/cnn/.element/img/2.0/mosaic/base_skins/UGC/b_ugc_BL.gif" alt="" width="4" height="4"><\/div>';
    	CNN_comment += '		<\/div>';

			return CNN_comment;
		}


    if (typeof(obj.rss.channel.item.length) == "undefined") {
				var clObject = obj.rss.channel.item;
    	CNN_comment += '		<div id="cnnOpinionSubContainer"><div class="cnnUGCBox">';
    	CNN_comment += '			<div class="cnnUGCBoxHeader"><img src="http://i.cdn.turner.com/cnn/.element/img/2.0/mosaic/base_skins/UGC/b_ugc_TL.gif" alt="" width="4" height="4"><\/div>';
    	CNN_comment += '			<div class="cnnBoxContent">';
    	CNN_comment += '				<div class="cnnMeta">';
    	CNN_comment += 					'<span class="cnnContributor">'+clObject['jf:author']+'<\/span><br>';
    	CNN_comment += cnnRenderTimeStamp(clObject['pubDate']);
    	CNN_comment += '				<\/div>';
    	CNN_comment += '				<p>';
    	CNN_comment += clObject['description'].truncate(300,' ...<a href="javascript:void(0);" onclick="cnnShowMore(this);return false">more<\/a>');
    	CNN_comment += '				<\/p>';

      	CNN_comment += '				<div class="cnnExtended" style="display:none;"><p>';
    	CNN_comment += clObject['description'];
    	CNN_comment += '				<a href="javascript:void(0);" onclick="cnnShowLess(this);return false;">less<\/a><\/p><\/div>';


    	CNN_comment += '			<\/div>';
    	CNN_comment += '			<div class="clear"><img src="http://i.cdn.turner.com/cnn/images/1.gif" width="1" height="1" border="0" alt=""></div><div class="cnnUGCBoxFooter"><img src="http://i.cdn.turner.com/cnn/.element/img/2.0/mosaic/base_skins/UGC/b_ugc_BL.gif" alt="" width="4" height="4"><\/div>';
    	CNN_comment += '		<\/div><\/div>';

		return CNN_comment;

    }



		var cnnShowExpandedCont = $('cnnOpinionContainer').parentNode.getElementsByTagName('a')[0];

		var cnnShowExpandedLnk = $('cnnOpinionContainer').getElementsByClassName('cnnExpandCommentsLnk');


			var numLength = obj.rss.channel.item.length;
			var displayNum = numLength - 1;
			if (numLength > 3) {
				cnnShowExpandedLnk[0].innerHTML = '<a href="javascript:void(0)" onclick="CNN_ToggleNestedStoryContent(\'cnnOpinionSubContainer\',this, \''+numLength+'\',null);">Next '+commentsWindow+' comments &raquo;<\/a> <span id="nextLink" style="visibility:hidden"> | <a href="javascript:void(0)" onclick="CNN_getNextComments()">Next '+commentsWindow+' comments &raquo;</a></span>';
			}
		if (numLength >= 1 && (typeof(cnnReaderOpinions) != "undefined" && cnnReaderOpinions)) {
			cnnToggleUGC('cnnOpinionContainer',cnnShowExpandedCont)
		}

    for (var xx = 0; xx < numLength; xx++) {
				var clObject = obj.rss.channel.item[xx];
				if(xx == 0){
					CNN_comment+='<div id="allComments">';
				}
				if(xx == cnnInitialDisplay)
				{
					CNN_comment+='<div id="cnnOpinionSubContainer" style="display:none;">';
				}


		if(xx < (commentsWindow * currentPage + cnnInitialDisplay)) {
	    	CNN_comment += '		<div class="cnnUGCBox">';
    		CNN_comment += '			<div class="cnnUGCBoxHeader"><img src="http://i.cdn.turner.com/cnn/.element/img/2.0/mosaic/base_skins/UGC/b_ugc_TL.gif" alt="" width="4" height="4"><\/div>';
	    	CNN_comment += '			<div class="cnnBoxContent">';
    		CNN_comment += '				<div class="cnnMeta">';
    		CNN_comment += 					'<span class="cnnContributor">'+clObject['jf:author']+'<\/span><br>';
    		CNN_comment += cnnRenderTimeStamp(clObject['pubDate']);
    		CNN_comment += '				<\/div>';
    		CNN_comment += '				<p>';
    		CNN_comment += clObject['description'].truncate(300,' ...<a href="javascript:void(0);" onclick="cnnShowMore(this);return false">more<\/a>');
	    	CNN_comment += '				<\/p>';

    	  	CNN_comment += '				<div class="cnnExtended" style="display:none;"><p>';
    		CNN_comment += clObject['description'];
    		CNN_comment += '				<a href="javascript:void(0);" onclick="cnnShowLess(this);return false;">less<\/a><\/p><\/div>';


    		CNN_comment += '			<\/div>';
    		CNN_comment += '			<div class="clear"><img src="http://i.cdn.turner.com/cnn/images/1.gif" width="1" height="1" border="0" alt=""></div><div class="cnnUGCBoxFooter"><img src="http://i.cdn.turner.com/cnn/.element/img/2.0/mosaic/base_skins/UGC/b_ugc_BL.gif" alt="" width="4" height="4"><\/div>';
    		CNN_comment += '		<\/div>';
		}
				if(xx == displayNum)
				{
					CNN_comment+='<\/div></div>';
				}
    }

	return CNN_comment;
}

//   story comments functions
//====================================================== END

/* share link functions 
=============================================================== */
function cnnSetShareLnks() {
	// mixx
	var mixxURL = 'http://www.mixx.com/submit/story?page_url='+encodeURIComponent(location.href)+'&title='+cnnShareTitle+'&description='+cnnShareDesc+'&partner=CNN';
	if($('cnnSBtnMixx')) {
		$('cnnSBtnMixx').href = mixxURL;
		$('cnnSBtnMixx').target="_blank";
	}
	if($('cnnSBtnMixxBot')) {
		$('cnnSBtnMixxBot').href = mixxURL;
		$('cnnSBtnMixxBot').target="_blank";
	}
	if($('cnnMixxEmbedLnk')) {
		$('cnnMixxEmbedLnk').href = mixxURL;
		$('cnnMixxEmbedLnk').target="_blank";
	}
	// Digg
	var diggURL = 'http://digg.com/submit?phase=2&url='+encodeURIComponent(location.href)+'&title='+cnnShareTitle+'&bodytext='+cnnShareDesc;
	if($('cnnSBtnDigg')) {
		$('cnnSBtnDigg').href = diggURL;
		$('cnnSBtnDigg').target="_blank";
	}
	if($('cnnSBtnDiggBot')) {
		$('cnnSBtnDiggBot').href = diggURL;
		$('cnnSBtnDiggBot').target="_blank";
	}
	// Facebook
	var facebookURL = 'http://www.facebook.com/share.php?u='+encodeURIComponent(location.href);
	if($('cnnSBtnFacebook')) {
		$('cnnSBtnFacebook').href = facebookURL;
		$('cnnSBtnFacebook').target="_blank";
	}
	if($('cnnSBtnFacebookBot')) {
		$('cnnSBtnFacebookBot').href = facebookURL;
		$('cnnSBtnFacebookBot').target="_blank";
	}
	// del.icio.us
	var deliciousURL = 'http://del.icio.us/post?v=4&partner=cnn&noui&jump=close&url='+encodeURIComponent(location.href)+'&title='+cnnShareTitle+'delicious';
	if($('cnnSBtnDelicious')) {
		$('cnnSBtnDelicious').href = deliciousURL;
		$('cnnSBtnDelicious').target="_blank";
	}
	if($('cnnSBtnDeliciousBot')) {
		$('cnnSBtnDeliciousBot').href = deliciousURL;
		$('cnnSBtnDeliciousBot').target="_blank";
	}
	// reddit
	var redditURL = 'http://reddit.com/submit?url='+encodeURIComponent(location.href)+'&title='+cnnShareTitle;
	if($('cnnSBtnReddit')) {
		$('cnnSBtnReddit').href = redditURL;
		$('cnnSBtnReddit').target="_blank";
	}
	if($('cnnSBtnRedditBot')) {
		$('cnnSBtnRedditBot').href = redditURL;
		$('cnnSBtnRedditBot').target="_blank";
	}
	// stumbleupon
	var stumbleuponURL = 'http://www.stumbleupon.com/submit?url='+encodeURIComponent(location.href)+'&title='+cnnShareTitle;
	if($('cnnSBtnStumbleUpon')) {
		$('cnnSBtnStumbleUpon').href = stumbleuponURL;
		$('cnnSBtnStumbleUpon').target="_blank";
	}
	if($('cnnSBtnStumbleUponBot')) {
		$('cnnSBtnStumbleUponBot').href = stumbleuponURL;
		$('cnnSBtnStumbleUponBot').target="_blank";
	}
	// myspace
	var myspaceURL = 'http://www.myspace.com/Modules/PostTo/Pages/?' + 't=' + cnnShareTitle + '&c=' + cnnShareDesc + '&u=' + encodeURIComponent(location.href);
	if($('cnnSBtnMyspace')) {
		$('cnnSBtnMyspace').href = myspaceURL;
		$('cnnSBtnMyspace').target="_blank";
	}
	if($('cnnSBtnMyspaceBot')) {
		$('cnnSBtnMyspaceBot').href = myspaceURL;
		$('cnnSBtnMyspaceBot').target="_blank";
	}
	var twitterURL = 'http://cnntweet.appspot.com/articles/' + encodeURIComponent(location.href) + '/' + cnnShareTitle + '/tweet/';
	if($('cnnSBtnTwitter')) {
		$('cnnSBtnTwitter').href = twitterURL;
		$('cnnSBtnTwitter').target="_blank";
	}
	if($('cnnSBtnTwitterBot')) {
		$('cnnSBtnTwitterBot').href = twitterURL;
		$('cnnSBtnTwitterBot').target="_blank";
	}
}

/* main page market box
====================================================== */
/* called on focus */
function cnnMbChangeTxtClass( obj ) {
	if(obj.className == 'cnnTxtMBGetQuote') {
		obj.value = '';
		obj.className = 'cnnTxtMBGetQuoteType';
	}
}

/* called on blur */
function cnnMbCheckTxtClass( obj ) {
	if((obj.className == 'cnnTxtMBGetQuoteType') && (obj.value == '')) {
		obj.className = 'cnnTxtMBGetQuote';
		obj.value = 'enter symbol';
	}
}
/* end main page market box
====================================================== */

/* search functions
===================================================================== */

var cnnStrInvalidSrchMsg = 'Please enter a valid search term and try again.'+"\n"+'HTML, URLs, and Scripts are not allowed.';

function cnnSearch( frm ) {
	if($('cnnHeadSrchTxt').value != '') {
		if(!cnnVerifySearchString($('cnnHeadSrchTxt').value)) {alert(cnnStrInvalidSrchMsg);}
		else {
			var strSearchLoc = cnnGetSearchLoc();
			strSearchLoc += 'query=' + cnnLeftTrim($('cnnHeadSrchTxt').value);

			strSearchLoc += '&';
			strSearchLoc += 'primaryType=mixed';
			strSearchLoc += '&';
			strSearchLoc += 'sortBy=date';
			if(location.hostname.indexOf('edition') < 0) {
				strSearchLoc += '&';
				strSearchLoc += 'intl=false';
			} else {
				strSearchLoc += '&';
				strSearchLoc += 'intl=true';
			}
			location.href = strSearchLoc;
		}
	}
	return false;
}

function cnnVerifySearchString( srchTerm ) {
	var htmlRegEx = new RegExp('[\w*|\W*]*<[[\w*|\W*]*|/[\w*|\W*]]>[\w*|\W*]*');

	if(htmlRegEx.exec(srchTerm) || (srchTerm == null) || (cnnLeftTrim(srchTerm).length == 0) || (srchTerm.indexOf(">") >= 0) || (srchTerm.indexOf(";") >= 0) ){
		return false;
	}
	else return true;
}

function cnnGetSearchLoc() {
	var strSearchLoc = 'http://www.cnn.com/search/?'; // default

	if(location.hostname.indexOf('qai') != -1) {
		strSearchLoc = 'http://search.qai.cnn.com/cnnrelaunch/search.jsp?'
	}
	else if(location.hostname.indexOf('beta') != -1) {
		strSearchLoc = 'http://www.cnn.com/search/?'
	}

	return strSearchLoc;
}

function cnnLeftTrim(sString) {
	while (sString.substring(0,1) == ' ') {
		sString = sString.substring(1, sString.length);
	}
	return sString;
}

function cnnFootSearch( frm ) {
	if($('cnnFootSrchTxt').value != '') {
		if(!cnnVerifySearchString($('cnnFootSrchTxt').value)) {alert(cnnStrInvalidSrchMsg);}
		else {

			var strSearchLoc = cnnGetSearchLoc();
			strSearchLoc += 'query=' + cnnLeftTrim($('cnnFootSrchTxt').value);
			strSearchLoc += '&';
			strSearchLoc += 'primaryType=mixed';
			strSearchLoc += '&';
			strSearchLoc += 'sortBy=date';
			if(location.hostname.indexOf('edition') < 0) {
				strSearchLoc += '&';
				strSearchLoc += 'intl=false';
			} else {
				strSearchLoc += '&';
				strSearchLoc += 'intl=true';
			}
			location.href = strSearchLoc;
		}
	}
	return false;
}

function cnnUpdateSrchType( searchType ) {
	if($('cnnHeadSrchType')) {
		$('cnnHeadSrchType').value = searchType;
	}
	cnnUpdateSrchTypeLnks( searchType );
}

function cnnUpdateSrchTypeLnks( searchType ) {
	if($('cnnHeadSrchTypeArea')) {
		switch(searchType) {
			case 'web':
				$('cnnHeadSrchTypeArea').innerHTML = '<span class="cnnSearchLabel">Web</span> | <a href="javascript:cnnUpdateSrchType(\'news\');">CNN News</a> | <a href="javascript:cnnUpdateSrchType(\'video\');">CNN Videos</a>';
				break;
			case 'news':
				$('cnnHeadSrchTypeArea').innerHTML = '<a href="javascript:cnnUpdateSrchType(\'web\');">Web</a> | <span class="cnnSearchLabel">CNN News</span> | <a href="javascript:cnnUpdateSrchType(\'video\');">CNN Videos</a>';
				break;
			case 'video':
				$('cnnHeadSrchTypeArea').innerHTML = '<a href="javascript:cnnUpdateSrchType(\'web\');">Web</a> | <a href="javascript:cnnUpdateSrchType(\'news\');">CNN News</a> | <span class="cnnSearchLabel">CNN Videos</span>';
				break;
			default:
				break;
		}
	}
}

/* end search functions
===================================================================== */

/* cnn live video popup
===================================================================== */
function cnnLiveVideo( strWhich ) {
	if(!strWhich) {
		strWhich = '1';
	}
	var strVidLoc = '/video/live/live.html?stream=stream' + strWhich;
	CNN_openPopup(strVidLoc,'liveplayer','scrollbars=yes,resizable=yes,width=672,height=540');
}
/* end cnn live video popup
===================================================================== */


function cnnVideo(mode, arg, expiration) {
	video_url = '/video/#' + arg;

	if(mode == 'live') { cnnLiveVideo(arg); }
	else if(top.location == self.location) { location.href = video_url; }
	else { vid_win = window.open(video_url, 'vid_win'); }
}


/* main page video box (domestic & intl)
===================================================================== */
var cnnMpVpCurPage = 1;
var cnnMpVpLock = false;
function cnnMpVpBlur( lnk ) {
	try {
		lnk.blur();
	} catch(e) {};
}
/*
 * cnnMpVpNext() and cnnMpVpPrev()
 * are called from previous and next buttons
 */
function cnnMpVpNext( lnk ) {
	cnnMpVpBlur( lnk );
	if((cnnMpVpCurPage < 3)&&(!cnnMpVpLock)) {
		cnnMpVpSlideLeft();
	}
}

function cnnMpVpPrev( lnk ) {
	cnnMpVpBlur( lnk );
	if((cnnMpVpCurPage > 1)&&(!cnnMpVpLock)) {
		cnnMpVpSlideRight();
	}
}

/*
 * cnnMpVpPage( intPage )
 * called from clicking on gray dot icon
 */
function cnnMpVpPage( intPage, lnk ) {
	cnnMpVpBlur( lnk );
	if((cnnMpVpCurPage != intPage)&&(!cnnMpVpLock)) {
		if(cnnMpVpCurPage < intPage) {
			if((intPage - cnnMpVpCurPage) > 1) {
				cnnMpVpSlideDoubleLeft();
			}
			else {
				cnnMpVpSlideLeft();
			}
		}
		else {
			if((cnnMpVpCurPage - intPage) > 1) {
				cnnMpVpSlideDoubleRight();
			}
			else {
				cnnMpVpSlideRight();
			}
		}
	}
}

function cnnLockMpVp( intDur ) {
	var cnnLockDur = intDur * 100;
	cnnMpVpLock = true;
	setTimeout(function() { cnnMpVpLock = false; },cnnLockDur);
}
function cnnMpVpSlideLeft() {
	cnnLockMpVp(3);
	new Effect.MoveBy( 'cnnMpVidCtnt0', 0, -336 , {duration: 0.3} );
	new Effect.MoveBy( 'cnnMpVidCtnt1', 0, -336 , {duration: 0.3} );
	new Effect.MoveBy( 'cnnMpVidCtnt2', 0, -336 , {duration: 0.3} );
	cnnMpVpCurPage++;
	cnnMpVpMoveDot();
	cnnMpVpUpdateBtns();
}

function cnnMpVpSlideDoubleLeft() {
	cnnLockMpVp(6);
	new Effect.MoveBy( 'cnnMpVidCtnt0', 0, -672 , {duration: 0.6} );
	new Effect.MoveBy( 'cnnMpVidCtnt1', 0, -672 , {duration: 0.6} );
	new Effect.MoveBy( 'cnnMpVidCtnt2', 0, -672 , {duration: 0.6} );
	cnnMpVpCurPage++;
	cnnMpVpCurPage++;
	cnnMpVpMoveDot();
	cnnMpVpUpdateBtns();
}

function cnnMpVpSlideRight() {
	cnnLockMpVp(3);
	new Effect.MoveBy( 'cnnMpVidCtnt0', 0, 336 , {duration: 0.3} );
	new Effect.MoveBy( 'cnnMpVidCtnt1', 0, 336 , {duration: 0.3} );
	new Effect.MoveBy( 'cnnMpVidCtnt2', 0, 336 , {duration: 0.3} );
	cnnMpVpCurPage--;
	cnnMpVpMoveDot();
	cnnMpVpUpdateBtns();
}

function cnnMpVpSlideDoubleRight() {
	cnnLockMpVp(6);
	new Effect.MoveBy( 'cnnMpVidCtnt0', 0, 672 , {duration: 0.6} );
	new Effect.MoveBy( 'cnnMpVidCtnt1', 0, 672 , {duration: 0.6} );
	new Effect.MoveBy( 'cnnMpVidCtnt2', 0, 672 , {duration: 0.6} );
	cnnMpVpCurPage--;
	cnnMpVpCurPage--;
	cnnMpVpMoveDot();
	cnnMpVpUpdateBtns();
}

function cnnMpDotMouseOver( id ) {
	$(id).src = 'http://i.cdn.turner.com/cnn/.element/img/2.0/content/in_the_news/gray_active_status.gif';
}

// image change functions
function cnnMpVpMoveDot() {
	for(i=1;i<4;i++) {
		$('cnnMpVidDot'+i).src = 'http://i.cdn.turner.com/cnn/.element/img/2.0/content/in_the_news/gray_status.gif';
		$('cnnMpVidDot'+i).onmouseover = function() {this.src = 'http://i.cdn.turner.com/cnn/.element/img/2.0/content/in_the_news/gray_active_status.gif';}
		$('cnnMpVidDot'+i).onmouseout = function() {this.src = 'http://i.cdn.turner.com/cnn/.element/img/2.0/content/in_the_news/gray_status.gif';}
	}
	$('cnnMpVidDot'+cnnMpVpCurPage).src = 'http://i.cdn.turner.com/cnn/.element/img/2.0/content/in_the_news/gray_active_status.gif';
	$('cnnMpVidDot'+cnnMpVpCurPage).onmouseover = function() {}
	$('cnnMpVidDot'+cnnMpVpCurPage).onmouseout = function() {}
}
function cnnMpVpUpdateBtns() {
	if(cnnMpVpCurPage > 1) {
		$('cnnMpVidBtnL').style.cursor ='auto';
		$('cnnMpVidBtnL').src = 'http://i.cdn.turner.com/cnn/.element/img/2.0/content/in_the_news/left_red_btn.gif';
		$('cnnMpVidBtnL').onmouseover = function() { this.src='http://i.cdn.turner.com/cnn/.element/img/2.0/content/in_the_news/left_red_over_btn.gif'; }
		$('cnnMpVidBtnL').onmouseout = function() { this.src='http://i.cdn.turner.com/cnn/.element/img/2.0/content/in_the_news/left_red_btn.gif'; }
	}
	else {
		$('cnnMpVidBtnL').style.cursor ='default';
		$('cnnMpVidBtnL').src = 'http://i.cdn.turner.com/cnn/.element/img/2.0/content/in_the_news/left_gray_btn.gif';
		$('cnnMpVidBtnL').onmouseover = function() {}
		$('cnnMpVidBtnL').onmouseout = function() {}
	}

	if(cnnMpVpCurPage < 3) {
		$('cnnMpVidBtnR').style.cursor ='auto';
		$('cnnMpVidBtnR').src = 'http://i.cdn.turner.com/cnn/.element/img/2.0/content/in_the_news/right_red_btn.gif';
		$('cnnMpVidBtnR').onmouseover = function() {this.src = 'http://i.cdn.turner.com/cnn/.element/img/2.0/content/in_the_news/right_red_over_btn.gif';}
		$('cnnMpVidBtnR').onmouseout = function() {this.src = 'http://i.cdn.turner.com/cnn/.element/img/2.0/content/in_the_news/right_red_btn.gif';}
	}
	else {
		$('cnnMpVidBtnR').style.cursor ='default';
		$('cnnMpVidBtnR').src = 'http://i.cdn.turner.com/cnn/.element/img/2.0/content/in_the_news/right_gray_btn.gif';
		$('cnnMpVidBtnR').onmouseover = function() {}
		$('cnnMpVidBtnR').onmouseout = function() {}
	}
}
/* end main page video box
===================================================================== */


/* intl market box
===================================================================== */
function cnnWbMarkets( intWhich ) {
	for(i=1;i<4;i++) {
		if(i==intWhich) {
			$('cnnWbMarkets' + i).style.display = 'block';
			$('cnnWbMarketsTab' + i).className = 'active';
		}
		else {
			$('cnnWbMarkets' + i).style.display = 'none';
			$('cnnWbMarketsTab' + i).className = '';
		}
	}
}
/* end intl market box
===================================================================== */



function cnnMosaicLoadGal( gal, lnk ) {
var cnn_gallery_config = (location.hostname.indexOf('edition.') > -1) ? 'intl' : 'www';
if ( new CNN_FlashDetect().detectVersion( 6 ) ) {
var cnn_Photos = new CNN_FlashObject( "cnnPhotos2", "http://i.cdn.turner.com/cnn/.element/swf/2.0/gallery/image.gallery.swf", 585, 425, null, "galleryUrl="+gal+"&configUrl=http://i.cdn.turner.com/cnn/.element/ssi/"+cnn_gallery_config+"/misc/2.0/omni/config.xml&emailHandler=onEmailClicked&pageType=mosaic&pageURL="+window.location.pathname);
cnn_Photos.writeMosaicHtml('cnnPhotoPlayer');
} else {
CNN_noFlash();
}

	// change the id
	if($('cnnCurGal')) {
		$('cnnCurGal').id = '';
	}
	lnk.parentNode.parentNode.id = 'cnnCurGal';

}

function cnnMosaicSelGalTab( intTab ) {
	// change the tabs
	for(i=1;i<7;i++) {
		if($('cnnPT'+i)) {
			tabObj = $('cnnPT'+i);
			if(i != intTab) {
				tabObj.className = '';
			}
			else {
				tabObj.className = 'cnnPTCurrent';
			}
		}
	}

	// show/hide the sections
	for(i=1;i<7;i++) {
		if($('cnnPPSect'+i)) {
			obj = $('cnnPPSect'+i);
			if(i != intTab) {
				obj.style.display = 'none';
			}
			else {
				obj.style.display = 'block';
			}
		}
	}
}

/* minor topic search */
function cnnUpdateMtSrch(obj){
	obj.value='';
	obj.style.color=(obj.style.color==""?"#000000":"")
}

/* local box main page */
function cnnUpdateTxtElem(obj, strTxt) {
	if(obj.value == strTxt) {
		obj.value='';
		obj.style.color=(obj.style.color==""?"#000":"");
	}
	else if(obj.value == '') {
		obj.value = strTxt;
		obj.style.color=(obj.style.color==""?"#ccc":"");
	}// else user entered something, leave it alone
}

/* breaking news banners
=========================================================================== */
function cnnRenderGenericBanner(object,flashURL,leftColor,rightColor)
{
	if (allCookies['cnnLastClosedBannerId'] == object.id)
	{
		// don't render anything if the banner has been closed.
		return '';
	}

	var myHtml = '<div id="cnnBannerContent"><div id="cnnBannerTopic" class="'+leftColor+'">';

	if (!(object.type == 'Live Breaking News' || object.type == 'Live Developing Story' || object.type == 'Connect with CNN' || object.type == 'Live Now (sponsored)' || object.type == 'Live Now') || !(new CNN_FlashDetect().detectVersion( 8 )))
	{
		myHtml += '<div id="cnnBannerHeader"><div id="cnnBannerHeaderTxt">'+object.title+'<\/div><\/div>';
	}
	else
	{
		leftColor = 'cnnTransparent';// put transparency behind swf files
		myHtml = '<div id="cnnBannerContent"><div id="cnnBannerTopic" class="'+leftColor+'">';
		var cnn_AnimatedBanner = new CNN_FlashObject( "cnnAnimatedBannerTitle", flashURL, 211, 73, null, { bn_title: object.title } );
		myHtml += cnn_AnimatedBanner.getHtml();
	}

	myHtml += '<\/div><div id="cnnBannerBox" class="'+rightColor+'">';
	myHtml += '<div id="cnnBannerBoxContent">';
	
		if(object.type == 'Live Now (sponsored)'){
		myHtml += '<div id="cnnBannerSponsor88"><a onclick="CNN_setCookie(\'cnnLastClosedBannerId\',\'1237577560\', 720, \'/\', \'.cnn.com\'); $(\'cnnBannerContainer\').hide(); return true;" onmouseout="cnnImgSwap(this,0);" onmouseover="cnnImgSwap(this,1);" href="#"><img height="14" width="14" alt="" src="http://i.cdn.turner.com/cnn/.element/img/2.0/content/live_news/banner_black_btn.gif" name="cnnBannerCloseBtn" class="cnnCloseBtn"/></a>';
		myHtml += '<div id="cnnBSponsorAd88"><div id="cnnBSponserAd88Out"><div id="cnnBSponserAd88In"><div><img height="10" border="0" width="88" alt="" src="http://i.cdn.turner.com/cnn/.element/img/2.0/global/ads/sponsored.by.top.gif"/></div><div id="cnnBNAdTrgt"></div></div></div></div></div>';
		cnnUpdateAdInDiv('cnnBNAdTrgt','/cnn_adspaces/2.0/live_event_banner/spon1.88x31.ad');
	} else {
		myHtml += '<a href="#" onMouseOver="cnnImgSwap(this,1);" onMouseOut="cnnImgSwap(this,0);" onClick="CNN_setCookie(\'cnnLastClosedBannerId\',\''+object.id+'\', 720, \'/\', \'.cnn.com\'); $(\'cnnBannerContainer\').hide(); return true;"><img class="cnnCloseBtn" name="cnnBannerCloseBtn" src="http://i.cdn.turner.com/cnn/.element/img/2.0/content/live_news/banner_'+rightColor.substring(3).toLowerCase()+'_btn.gif" width="14" height="14" alt="" /><\/a>';
	}

	if ((object.type == 'Live Breaking News' || object.type == 'Live Developing Story' || object.type == 'Live Election Coverage' || object.type == 'Live Inauguration Coverage' || object.type == 'Live Now') && object.image.length > 0)
	{
		if (object.pipe != 0)
		{
			var qStr = (object.liveQueryString === undefined) ? '' : '&'+object.liveQueryString;
			myHtml += '<a href="javascript:cnnLiveVideo(\''+object.pipe+qStr+'\');">';
		}
		myHtml += '<img class="cnnBannerPhoto" src="'+object.image+'" width="87" height="49" alt="" border="0" />';
		if (object.pipe != 0)
		{
			myHtml += '<\/a>';
		}
	}
	
	myHtml += '<div id="cnnBannerHeadline"';
	if (object.size == 'small')
	{
		myHtml += ' class="small"';
	}
	myHtml += '>'+object.content;
	if((object.options) && (object.options != '') && (object.type == 'Breaking News')) {// email link
		myHtml += '<span class="cnnBnEmailLnk"><a href="http://www.cnn.com/profile/?view=newsletterandalert&iref=BNemail">Get Breaking News by e-mail</a></span>';
	}
	myHtml += '<\/div>';
	if (object.pipe != 0 || object.tv != 0)
	{
		myHtml += '<div id="cnnBannerWatchNow">Watch Now: ';
		if (object.tv != 0)
		{
			myHtml += 'on CNN TV';
			if (object.pipe != 0)
			{
				myHtml += ' <span class="cnnGreyTxt">or <\/span>';
			}
		}
		if (object.pipe != 0)
		{
			var qStr = (object.liveQueryString === undefined) ? '' : '&'+object.liveQueryString;
			myHtml += '<a href="javascript:cnnLiveVideo(\''+object.pipe+qStr+'\');">Live on CNN.com &raquo;<\/a>';
		}
		myHtml += '<\/div>';
	}

	myHtml += '<\/div><\/div><\/div><div class="cnnPad12Top" style="clear:both;"> <\/div>';

	return myHtml;
}


function cnnUpdateAdInDiv(id,path)
{
	new Ajax.Updater({success: id}, path,
		{
			method:'get',
			evalScripts:true,
			asynchronous:true
		}
	);
}


function cnnRenderDomesticBanner(object){
	var flashURL='http://i.cdn.turner.com/cnn/.element/swf/2.0/breaking_news/bn_breaking_domestic.swf';
	var leftColor='';
	var rightColor='';
	switch (object.type) {
		case 'Live Breaking News':leftColor='cnnYellow';rightColor='cnnBlack';break;
		case 'Breaking News':leftColor='cnnBlack';rightColor='cnnYellow';break;
		case 'Live Developing Story':leftColor='cnnRed';rightColor='cnnBlack';flashURL='http://i.cdn.turner.com/cnn/.element/swf/2.0/breaking_news/bn_dev_domestic.swf';break;
		case 'Developing Story':leftColor='cnnBlack';rightColor='cnnRed';break;
		case 'Watch Now':leftColor='cnnBlue';rightColor='cnnBlue';break;
		case 'Live Election Coverage':leftColor='cnnBlackElex';rightColor='cnnDrkBlue';break;
		case 'Live Inauguration Coverage':leftColor='cnnBlackElex';rightColor='cnnDrkGry';break;
				case 'Connect with CNN':leftColor='cnnBlue';rightColor='cnnBlack';flashURL='http://i.cdn.turner.com/cnn/.element/swf/2.0/breaking_news/bn_connectWithCNN.swf';break;
		case 'Live Now (sponsored)':leftColor='cnnBlue';rightColor='cnnBlack';flashURL='http://i.cdn.turner.com/cnn/.element/swf/2.0/breaking_news/bn_liveNow.swf';break;
		case 'Live Now':leftColor='cnnBlue';rightColor='cnnBlack';flashURL='http://i.cdn.turner.com/cnn/.element/swf/2.0/breaking_news/bn_liveNow.swf';break;
		default:return '';
	}
	// Temporary change CNN-11385
	object.liveQueryString = 'iref=lb100';
	return cnnRenderGenericBanner(object,flashURL,leftColor,rightColor);
}

function cnnRenderInternationalBanner(object){
	var flashURL='http://i.cdn.turner.com/cnn/.element/swf/2.0/breaking_news/bn_int.swf';
	var leftColor='';
	var rightColor='cnnYellow';
	switch (object.type) {
		case 'Live Breaking News':leftColor='cnnYellow';rightColor='cnnBlack';break;
		case 'Breaking News':leftColor='cnnBlack';break;
		case 'Live Developing Story':leftColor='cnnYellow';rightColor='cnnBlack';flashURL='http://i.cdn.turner.com/cnn/.element/swf/2.0/breaking_news/bn_dev.swf';break;
		case 'Developing Story':leftColor='cnnBlack';break;
		case 'Watch Now':leftColor='cnnBlue';rightColor='cnnBlue';break;
		case 'Connect with CNN':leftColor='cnnBlue';rightColor='cnnBlack';flashURL='http://i.cdn.turner.com/cnn/.element/swf/2.0/breaking_news/bn_connectWithCNN.swf';break;
		case 'Live Now (sponsored)':leftColor='cnnBlue';rightColor='cnnBlack';flashURL='http://i.cdn.turner.com/cnn/.element/swf/2.0/breaking_news/bn_liveNow.swf';break;
		case 'Live Now':leftColor='cnnBlue';rightColor='cnnBlack';flashURL='http://i.cdn.turner.com/cnn/.element/swf/2.0/breaking_news/bn_liveNow.swf';break;
		default:return '';
	}
	return cnnRenderGenericBanner(object,flashURL,leftColor,rightColor);
}

/* end breaking news banners
=========================================================================== */


/* global event handlers
=========================================================================== */
function cnnMouseDown(e) {
	if (cnnDropdownOpen) cnnDD.mouseDownBody(e);
	if (cnnOverlayMenuOpen) cnnOverlayMouseDownBody(e);
	return true;
}
/* end global event handlers
=========================================================================== */


/* styled overlay menus
=========================================================================== */
var cnnOverlayOpenId = "";
var cnnOverlayClickedId = "";
var cnnOverlayMenuOpen = false;

// Map menu id's to button classes, for determining later on if the current menu
// is one with non-default behavior.
var cnnOverlayClass = [];


function cnnInitOverlay() {
	document.body.onmousedown = cnnMouseDown;

	// Overlay menus with default behavior
	cnnAddOverlayEvents("cnnOverlayLnk");

	// Add code here for overlay menus with non-default behavior
}


function cnnShowOverlay(menuId) {
	if ($(menuId)) {
		// If the menu is already open, close it
		if ($(menuId).style.display == "block") {
			$(menuId).style.display = "none";
		}
		else {
			$(menuId).style.display = "block";
			cnnOverlayOpenId = menuId;
		    cnnOverlayMenuOpen = true;
			cnnOverlayClickedId = "";
		}
	}

	// Add code here for overlay menus with non-default behavior
}


function cnnHideOverlay(menuId) {
	if ($(menuId)) {
		$(menuId).style.display = "none";
		cnnOverlayOpenId = '';
	    cnnOverlayMenuOpen = false;
	}

	// Add code here for overlay menus with non-default behavior
}


function cnnGetOverlayMenuId(btn) {
	// Get the id parameter from href="javascript:foo('myId')"
	return btn.href.substring(btn.href.indexOf("'") + 1, btn.href.lastIndexOf("'"));
}


function cnnAddOverlayEvents(btnClass) {
	var btnArray = document.getElementsByClassName(btnClass);
	for (var i = 0; i < btnArray.length; i++) {
		// button
		var btn = btnArray[i];
		btn.onmousedown = cnnOverlayMouseDownBtn;

		// menu
		var menuId = cnnGetOverlayMenuId(btn);
		if ($(menuId)) {
			$(menuId).onmousedown = cnnOverlayMouseDownMenu;
		}

		// Store the button class associated with the menu id
	    cnnOverlayClass[menuId] = btnClass;

		// Mac Safari image-rollover bug
		if ((navigator.userAgent.indexOf("Safari") != -1)
		 && (navigator.userAgent.indexOf("Mac") != -1)) {
			// If cnnImgSwap() is called by the onmouseout event
			if (btn.onmouseout && btn.onmouseout.toString().indexOf("cnnImgSwap") != -1) {
				// Make onclick call the onmouseout event handler
				btn.onclick = function onclick() { this.onmouseout(); return true; };
			}
		}
	}
}


function cnnOverlayMouseDownBtn(e) {
	// Get the menu id
	var menuId = cnnGetOverlayMenuId(this);
	cnnOverlayClickedId = menuId;
	return true;
}


function cnnOverlayMouseDownMenu(e) {
	// Get the menu id
	cnnOverlayClickedId = this.id;
	return true;
}


function cnnOverlayMouseDownBody(e) {
	// Close the open overlay menu, unless the mouse is inside the menu
	// or the menu button.
	if (cnnOverlayOpenId != cnnOverlayClickedId) {
		cnnHideOverlay(cnnOverlayOpenId);
	}
	cnnOverlayClickedId = "";
	return true;
}
/* end styled overlay menus
=========================================================================== */


/* styled dropdowns
=========================================================================== */
var cnnDropdownOpen = false;

// CNN dropdown menu (JavaScript object literal)
var cnnDD = {
	curId: "", // id of currently-open dropdown
	ignoreMouseDownBody: false,
	menus: [],

	rowHeight: 17,
	combinedBorderWidth: 20,
	scrollbarWidth: 18,

	minMenuWidth: 105,
	maxMenuWidth: 400,
	defaultMenuWidth: 205,
	defaultRowWidth: 150,
	combinedRowLRPad: 18,
	scrollbarRPad: 12,


	buildDisabledDropdown: function(menuId, buttonWidth, buttonClass, hiddenListSuffix) {
		// default parameters
		if (!buttonWidth) buttonWidth = 140;
		if (!buttonClass) buttonClass = 'cnnDDWireLtg';

		var wrapId = menuId + "_wrap";
		var listId = menuId + "_list" + (hiddenListSuffix ? '_' + hiddenListSuffix : '');

		if ($(wrapId) && $(listId)) {

			// hide the <select>
			$(listId).style.display = "none";

			// Get the displayed value for the first select option
			var listItems = $(listId).options;
			var buttonText = listItems[0].innerHTML;

			var buttonTextLPad = 10;
			var buttonTextRPad = 34;
			var buttonTextWidth = buttonWidth - (buttonTextLPad + buttonTextRPad);

			var leftBgStyle = 'background:#fff url(http://i.cdn.turner.com/cnn/.element/img/2.0/global/dropdowns/btn_ltg_left.gif) 0 0 no-repeat;';
			var rightBgStyle = 'background:url(http://i.cdn.turner.com/cnn/.element/img/2.0/global/dropdowns/btn_ltg_right.gif) 100% 0 no-repeat;';

			switch (buttonClass) {
				case 'cnnDDWire':
					leftBgStyle = 'background:#fff url(http://i.cdn.turner.com/cnn/.element/img/2.0/global/dropdowns/btn_wire_left.gif) 0 0 no-repeat;';
					rightBgStyle = 'background:url(http://i.cdn.turner.com/cnn/.element/img/2.0/global/dropdowns/btn_wire_right.gif) 100% 0 no-repeat;';
					break;
				case 'cnnBlkBgWhtBox':
					leftBgStyle = 'background:#fff url(http://i.cdn.turner.com/cnn/.element/img/2.0/global/dropdowns/btn_blk_left.gif) 0 0 no-repeat;';
					rightBgStyle = 'background:url(http://i.cdn.turner.com/cnn/.element/img/2.0/global/dropdowns/btn_blk_right.gif) 100% 0 no-repeat;';
					break;
				case 'cnnBlueBgWhtBox':
					leftBgStyle = 'background:#fff url(http://i.cdn.turner.com/cnn/.element/img/2.0/global/dropdowns/btn_blue_left.gif) 0 0 no-repeat;';
					rightBgStyle = 'background:url(http://i.cdn.turner.com/cnn/.element/img/2.0/global/dropdowns/btn_blue_right.gif) 100% 0 no-repeat;';
					break;
			}


			// build content for the button
			var strContent = "\n\n\n\n";
			strContent += '	<div class="cnnDDContainer" style="width:'+buttonWidth+'px;">'+"\n";

			strContent += '		<div class="'+buttonClass+'">'+"\n";
			strContent += '			<div class="cnnDDBtn" onmousedown="return cnnDD.mouseDownBtn(event, \''+menuId+'\');" onclick="return cnnDD.open(\''+menuId+'\')" style="'+rightBgStyle+'">'+"\n";
			strContent += '				<table width="'+buttonWidth+'" border="0" cellspacing="0" cellpadding="0">'+"\n";
			strContent += '					<tr>'+"\n";
			strContent += '						<td width="'+buttonTextLPad+'"><div class="cnnDDBtnLeft" style="'+leftBgStyle+'"></div></td>'+"\n";
			strContent += '						<td width="'+buttonTextWidth+'">'+"\n";
			strContent += '							<div class="cnnDDValueContainer">'+"\n";
			strContent += '								<div id="'+menuId+'_Val" class="cnnDDValue" style="width:'+buttonTextWidth+'px;color:#c5c5c5;">'+buttonText+'</div>'+"\n";
			strContent += '						</td>'+"\n";
			strContent += '						<td width="'+buttonTextRPad+'"><img src="http://i.cdn.turner.com/cnn/.element/img/2.0/global/dropdowns/btn_icon_disabled.gif" alt="" border="0"></td>'+"\n";
			strContent += '					</tr>'+"\n";
			strContent += '				</table>'+"\n";
			strContent += '			</div><!--/cnnDDBtn -->'+"\n\n";
			strContent += '		</div><!--/'+buttonClass+' -->'+"\n\n";

			strContent += '	</div><!--/cnnDDContainer -->'+"\n";
			strContent += "\n\n";

			// draw the new content
			$(wrapId).innerHTML = strContent;

			// reset the list
			$(listId).selectedIndex = 0;

		}//else id of select not found [ abort ]
	},

	buildDropdown: function(menuId, buttonWidth, menuWidth, numVisibleRows, buttonClass, hiddenListSuffix) {
		// default parameters
		if (!buttonWidth) buttonWidth = 140;
		if (!menuWidth) menuWidth = this.defaultMenuWidth;
		if (!numVisibleRows) numVisibleRows = 10;
		if (!buttonClass) buttonClass = 'cnnDDWireLtg';

		if (menuWidth < this.minMenuWidth) menuWidth = this.minMenuWidth;
		if (menuWidth > this.maxMenuWidth) menuWidth = this.maxMenuWidth;

		var wrapId = menuId + "_wrap";
		var listId = menuId + "_list" + (hiddenListSuffix ? '_' + hiddenListSuffix : '');

		this.menus[menuId] = new Array();
		this.menus[menuId].listId = listId;
		this.menus[menuId].updateFirstRow = false;

		if ($(wrapId) && $(listId)) {
			// hide the <select>
			$(listId).style.display = "none";

			var displayedValue = new Array();
			var internalValue = new Array();
			var disabledRow = new Array();

			var listItems = $(listId).options;
			for (var i=0;i<listItems.length;i++) {
				displayedValue[i] = listItems[i].innerHTML;
				internalValue[i] = listItems[i].value;
				disabledRow[i] = listItems[i].disabled;
			}
			var selectedRow = $(listId).selectedIndex;

			// If no row was explicitly selected
			if (selectedRow == 0) {
				// See if the first row matches one of the later rows
				for (i=1;i<displayedValue.length;i++) {
					if (displayedValue[i] == displayedValue[0]) {
						selectedRow = i;
						this.menus[menuId].updateFirstRow = true;
						break;
					}
				}
			}
			var buttonText = displayedValue[selectedRow];
			var numRows = displayedValue.length;

			var buttonTextLPad = 10;
			var buttonTextRPad = 34;
			var buttonTextWidth = buttonWidth - (buttonTextLPad + buttonTextRPad);

			// minus left and right borders
			var fullRowWidth = menuWidth - this.combinedBorderWidth;

			// without scrollbar
			var visibleRowsHeight = numRows * this.rowHeight;
			var rowWidth = fullRowWidth;

			// with scrollbar
			if (numRows > numVisibleRows) {
				visibleRowsHeight = numVisibleRows * this.rowHeight;
				rowWidth -= 10;
			}

			var leftBgStyle = 'background:#fff url(http://i.cdn.turner.com/cnn/.element/img/2.0/global/dropdowns/btn_ltg_left.gif) 0 0 no-repeat;';
			var rightBgStyle = 'background:url(http://i.cdn.turner.com/cnn/.element/img/2.0/global/dropdowns/btn_ltg_right.gif) 100% 0 no-repeat;';

			switch (buttonClass) {
				case 'cnnDDWire':
					leftBgStyle = 'background:#fff url(http://i.cdn.turner.com/cnn/.element/img/2.0/global/dropdowns/btn_wire_left.gif) 0 0 no-repeat;';
					rightBgStyle = 'background:url(http://i.cdn.turner.com/cnn/.element/img/2.0/global/dropdowns/btn_wire_right.gif) 100% 0 no-repeat;';
					break;
				case 'cnnBlkBgWhtBox':
					leftBgStyle = 'background:#fff url(http://i.cdn.turner.com/cnn/.element/img/2.0/global/dropdowns/btn_blk_left.gif) 0 0 no-repeat;';
					rightBgStyle = 'background:url(http://i.cdn.turner.com/cnn/.element/img/2.0/global/dropdowns/btn_blk_right.gif) 100% 0 no-repeat;';
					break;
				case 'cnnBlueBgWhtBox':
					leftBgStyle = 'background:#fff url(http://i.cdn.turner.com/cnn/.element/img/2.0/global/dropdowns/btn_blue_left.gif) 0 0 no-repeat;';
					rightBgStyle = 'background:url(http://i.cdn.turner.com/cnn/.element/img/2.0/global/dropdowns/btn_blue_right.gif) 100% 0 no-repeat;';
					break;
			}


			// build content for the menu
			var strContent = "\n\n\n\n";
			strContent += '	<div class="cnnDDContainer" style="width:'+buttonWidth+'px;">'+"\n";

			strContent += '		<div class="cnnDDBoxContainer">'+"\n";
			strContent += '		<div class="cnnDDBox" id="'+menuId+'" style="width:'+menuWidth+'px;" onmousedown="return cnnDD.mouseDown(event, \''+menuId+'\');">'+"\n";
			strContent += '			<div class="cnnDDBoxHeader"><div class="cnnDDBoxHeaderTL"></div><div class="cnnDDBoxHeaderTR"></div></div>'+"\n";
			strContent += '			<div class="cnnDDBoxContent">'+"\n";

			strContent += '				<div class="cnnDDContent" style="width:'+fullRowWidth+'px;">'+"\n";
			strContent += '					<div class="cnnPad6Top"></div>'+"\n";
			strContent += '					<div class="cnnDDList" style="height:'+visibleRowsHeight+'px; width:'+rowWidth+'px;">'+"\n";
			strContent += '						<ul>'+"\n";

			for (var i=0;i<displayedValue.length;i++) {
				if ((i==0) && (this.menus[menuId].updateFirstRow)) {
					strContent += '						<li id="'+menuId+'_hdnVal"><a href="javascript:cnnDD.select('+i+',\''+this.encodeAttr(displayedValue[i])+'\',\''+this.encodeAttr(internalValue[i])+'\');">'+displayedValue[i]+'</a></li>'+"\n";
				}
				else if (disabledRow[i]) {
					strContent += '						<li class="cnnDDSeparator"><span>'+displayedValue[i]+'</span></li>'+"\n";
				}
				else {
					strContent += '						<li><a href="javascript:cnnDD.select('+i+',\''+this.encodeAttr(displayedValue[i])+'\',\''+this.encodeAttr(internalValue[i])+'\');">'+displayedValue[i]+'</a></li>'+"\n";
				}
			}
			strContent += '						</ul>'+"\n";
			strContent += '					</div>'+"\n";
			strContent += '					<div class="cnnPad8Top"></div>'+"\n";
			strContent += '				</div><!-- /cnnDDContent -->'+"\n";

			strContent += '			</div><!-- /cnnDDBoxContent -->'+"\n";
			strContent += '			<div class="cnnDDBoxFooter"><div class="cnnDDBoxFooterBL"></div><div class="cnnDDBoxFooterBR"></div></div>'+"\n";
			strContent += '		</div><!--/cnnDDBox-->'+"\n";
			strContent += '		</div><!--/cnnDDBoxContainer-->'+"\n";

			strContent += '		<div class="'+buttonClass+'">'+"\n";
			strContent += '			<div class="cnnDDBtn" onmousedown="return cnnDD.mouseDownBtn(event, \''+menuId+'\');" onclick="return cnnDD.open(\''+menuId+'\')" style="'+rightBgStyle+'">'+"\n";
			strContent += '				<table width="'+buttonWidth+'" border="0" cellspacing="0" cellpadding="0">'+"\n";
			strContent += '					<tr>'+"\n";
			strContent += '						<td width="'+buttonTextLPad+'"><div class="cnnDDBtnLeft" style="'+leftBgStyle+'"></div></td>'+"\n";
			strContent += '						<td width="'+buttonTextWidth+'">'+"\n";
			strContent += '							<div class="cnnDDValueContainer">'+"\n";
			strContent += '								<div id="'+menuId+'_Val" class="cnnDDValue" style="width:'+buttonTextWidth+'px;">'+buttonText+'</div>'+"\n";
			strContent += '						</td>'+"\n";
			strContent += '						<td width="'+buttonTextRPad+'"><img src="http://i.cdn.turner.com/cnn/.element/img/2.0/global/dropdowns/btn_icon.gif" alt="" border="0"></td>'+"\n";
			strContent += '					</tr>'+"\n";
			strContent += '				</table>'+"\n";
			strContent += '			</div><!--/cnnDDBtn -->'+"\n\n";
			strContent += '		</div><!--/'+buttonClass+' -->'+"\n\n";

			strContent += '	</div><!--/cnnDDContainer -->'+"\n";
			strContent += "\n\n";

			// draw the new content
			$(wrapId).innerHTML = strContent;

			// capture mousedown
			document.body.onmousedown = cnnMouseDown;
		}//else id of select not found [ abort ]
	},

	buildOverlay: function(menuId, menuWidth, numVisibleRows, dx, dy) {
		// default parameters
		if (!menuWidth) menuWidth = this.defaultMenuWidth;
		if (!numVisibleRows) numVisibleRows = 10;

		if (menuWidth < this.minMenuWidth) menuWidth = this.minMenuWidth;
		if (menuWidth > this.maxMenuWidth) menuWidth = this.maxMenuWidth;

		var leftPos = -20;
		var topPos = 1;
		if (dx) leftPos += dx;
		if (dy) topPos += dy;

		var wrapId = menuId + "_wrap";
		var listId = menuId + "_list";
		var titleId = menuId + "_title";

		if ($(wrapId) && $(titleId) && $(listId)) {
			// hide the list
			$(listId).style.display = "none";

			var title = $(titleId).innerHTML;

			// Get the displayed value for each select option
			var listItems = $(listId).getElementsByTagName('li');
			var displayedList = new Array();
			for (var i=0;i<listItems.length;i++) {
				displayedList[i] = listItems[i].innerHTML;
			}

			var numRows = displayedList.length;

			var menuTitleRPad = 60;
			var menuTitleWidth = menuWidth - menuTitleRPad;

			// minus left and right borders
			var fullRowWidth = menuWidth - this.combinedBorderWidth;

			// without scrollbar
			var visibleRowsHeight = numRows * this.rowHeight;
			var rowWidth = menuWidth - this.combinedBorderWidth;

			// with scrollbar
			if (numRows > numVisibleRows) {
				visibleRowsHeight = numVisibleRows * this.rowHeight;
				rowWidth -= 10;
			}


			// build content for the menu
			var strContent = "\n\n\n\n";
			strContent += ' <div class="cnnDDOvrBoxContainer">'+"\n";
			strContent += '		<div class="clear"><img src="http://i.cdn.turner.com/cnn/images/1.gif" width="1" height="1" border="0" alt=""></div>'+"\n";
			strContent += '		<div class="cnnDDOvrBox" id="'+menuId+'" style="width:'+menuWidth+'px;left:'+leftPos+'px; top:'+topPos+'px;" onmousedown="return cnnDD.mouseDown(event, \''+menuId+'\');">'+"\n";
			strContent += '			<div class="cnnDDBoxHeader"><div class="cnnDDBoxHeaderTL"></div><div class="cnnDDBoxHeaderTR"></div></div>'+"\n";
			strContent += '			<div class="cnnDDBoxContent">'+"\n";
			strContent += '				<div class="cnnDDOvrCloseContainer"><div class="cnnDDOvrClose" onclick="cnnDD.close(); return true;"><img src="http://i.cdn.turner.com/cnn/.element/img/2.0/global/dropdowns/overlay_close.png" width="12" height="12" alt="" border="0"></div></div>'+"\n";
			strContent += '				<div class="cnnDDContent" style="width:'+fullRowWidth+'px;">'+"\n";
			strContent += '					<div class="cnnDDOvrTitle" style="width:'+menuTitleWidth+'px;overflow:hidden;">'+title+'</div>'+"\n";
			strContent += '					<div class="cnnDDList" style="height:'+visibleRowsHeight+'px;width:'+rowWidth+'px;">'+"\n";
			strContent += '						<ul>'+"\n";

			for (var i=0;i<displayedList.length;i++) {
				strContent += '					<li>'+displayedList[i]+'</li>'+"\n";
			}
			strContent += '						</ul>'+"\n";
			strContent += '					</div><!-- /cnnDDList -->'+"\n";
			strContent += '					<div class="cnnPad12Top"></div>'+"\n";
			strContent += '				</div><!-- /cnnDDContent -->'+"\n";
			strContent += '			</div><!-- /cnnDDBoxContent -->'+"\n";
			strContent += '			<div class="cnnDDBoxFooter"><div class="cnnDDBoxFooterBL"></div><div class="cnnDDBoxFooterBR"></div></div>'+"\n";
			strContent += '		</div><!--/cnnDDOvrBox-->'+"\n";
			strContent += ' </div><!--/cnnDDOvrBoxContainer-->'+"\n";
			strContent += "\n\n";
			// draw the new content
			$(wrapId).innerHTML = strContent;

			// capture mousedown
			document.body.onmousedown = cnnMouseDown;

		}//else id of select not found [ abort ]
	},


	select: function(index, displayedValue, internalValue) {
		if ($(this.curId)) {
			var menuId = this.curId;

			// close the dropdown
			this.close();

			// change the displayed dropdown value (button text)
			if ($(menuId + '_Val')) {
				$(menuId + '_Val').innerHTML = displayedValue;
			}

			// set the first row of the menu to the current value
			if ((this.menus[menuId].updateFirstRow) && $(menuId + '_hdnVal')) {
				$(menuId+'_hdnVal').innerHTML = '<a href="javascript:cnnDD.select(' + index + ',\'' + this.encodeAttr(displayedValue) + '\',\'' + this.encodeAttr(internalValue) + '\')">' + displayedValue + '</a>';
			}

			var listId = this.menus[menuId].listId;
			if ($(listId)) {
				// if the value has changed
				if ($(listId).selectedIndex != index) {
					// set the index of the selected option for the invisible <select>
					$(listId).selectedIndex = index;

					// If an onchange event handler exists
					if ($(listId).onchange) {
						$(listId).onchange();
					}
				}
			}

			// if a callback function exists
			try {
				var onChoose = eval(menuId + '_OnChoose');
				if (onChoose) {
					onChoose();
				}
			}
			catch(err) {
			}
		}
	},

	open: function(id) {
		if($(id)) {
			// Was the same menu clicked again?
			var sameMenu = (this.curId == id);

			// If a menu is already open
			this.close();

			// If a different menu was clicked
			if (!sameMenu) {
				$(id).style.display = "block";
				this.curId = id;
				cnnDropdownOpen = true;
			}
		}
	},

	close: function() {
		if ($(this.curId)) {
			$(this.curId).style.display = "none";
			this.curId = '';
			cnnDropdownOpen = false;
		}
	},

	encodeAttr: function(str) {
		str=str.replace(/\\/g,'\\\\');
		str=str.replace(/\'/g,'\\\'');
		str=str.replace(/\"/g,'&quot;');
		str=str.replace(/\0/g,'\\0');
		return str;
	},

	mouseDown: function(e, id) {
		this.ignoreMouseDownBody = true;
		return true;
	},

	mouseDownBtn: function(e, id) {
		// True if the same dropdown button was clicked again.
		this.ignoreMouseDownBody = (id && (this.curId == id));
		return true;
	},

	mouseDownBody: function(e) {
		if (!this.ignoreMouseDownBody) {
			this.close();
		}
		this.ignoreMouseDownBody = false;
		return true;
	}
}
/* end styled dropdowns
=========================================================================== */


/* most popular module
========================================================================= */
var cnnMpActiveId = 'cnnMpStory';
var cnnMpLock = false;
var cnnie = false;
var cnnMostViewedVideoCSI = '/editionssi/misc/2.0/common/mostpopular.v1.csi.html';
var cnnMostEmailedVideoCSI = '/editionssi/misc/2.0/common/mostpopular.v2.csi.html';

function cnnToggleMP(idShow, loadVideoCSI) {
	if (cnnMpActiveId && cnnMpActiveId != idShow) {
		if(!cnnMpLock) {
			cnnMpLock = true;

			if(cnnie) {
				cnnToggleMPIE(idShow);
			}
			else {
				// hide the old
				var elHide = $(cnnMpActiveId);

				Effect.toggle(elHide,'blind',
				{
					duration:0.25,
					beforeStart:function()
					{
						var cnnHideHead = idShow + '-head';
						$(cnnHideHead).className="active";
					}
				}

				);

				// display the new
				var elShow = $(idShow);

				Effect.toggle(elShow,'blind',
				{
					duration:0.25,
					beforeStart:function(obj)
					{
						var cnnShowHead = cnnMpActiveId + '-head';
						$(cnnShowHead).className = "closed";
					},

					afterFinish:function(obj)
					{
						cnnMpActiveId = idShow;
					}
				}
				);
			}// end if cnnie

			// delay the unlock
			setTimeout("cnnMpLock = false;",250);

		}// end if !cnnMpLock

	}// end same id
	if(loadVideoCSI){
		cnnLoadDOMElementOnDemand('cnnMpVideos1Content', cnnMostViewedVideoCSI);
	}
}

function cnnToggleMPIE(idShow) {

	var elHide = $(cnnMpActiveId);
	var elShow = $(idShow);

	// hide the red header
	var cnnHideHead = idShow + '-head';
	$(cnnHideHead).className="active";

	new Effect.Parallel(
	[
		new Effect.SlideUp(elHide),
		new Effect.SlideDown(elShow)
	], {
		duration: 0.04
	});

	// show the previously active red header
	var cnnShowHead = cnnMpActiveId + '-head';
	$(cnnShowHead).className = "closed";

	// reset the active id
	cnnMpActiveId = idShow;

}

function cnnToggleMPNoSlide(idShow) {

	if (cnnMpActiveId && cnnMpActiveId != idShow) {

		var elHide = $(cnnMpActiveId);
		var cnnHideHead = idShow + '-head';
		$(cnnHideHead).className="active";
		elHide.style.display='none';

		var elShow = $(idShow);
		var cnnShowHead = cnnMpActiveId + '-head';
		$(cnnShowHead).className = "closed";
		elShow.style.display='block';

		cnnMpActiveId = idShow;

	}

}

/* most popular module tab functions */
function cnnMpStories( intWhich ) {
	for(i=1;i<4;i++) {
		if(i==intWhich) {
			$('cnnMpStories' + i).style.display = 'block';
			$('cnnMpStoriesTab' + i).className = 'active';
		}
		else {
			$('cnnMpStories' + i).style.display = 'none';
			$('cnnMpStoriesTab' + i).className = '';
		}
	}
	$('cnnMpStoriesTab'+ intWhich).blur();
}

function cnnMpVideos( intWhich ) {
	for(i=1;i<4;i++) {
		if(i==intWhich) {
			$('cnnMpVideos' + i).style.display = 'block';
			$('cnnMpVideosTab' + i).className = 'active';
		}
		else {
			if($('cnnMpVideos' + i)){
				$('cnnMpVideos' + i).style.display = 'none';
			}
			if($('cnnMpVideosTab' + i)){
				$('cnnMpVideosTab' + i).className = '';
			}
		}
	}
	$('cnnMpVideosTab'+ intWhich).blur();
}

/* most popular module init function */
function cnnInitMP() {
	$('cnnMpTopic').style.display = 'none';
	$('cnnMpVideo').style.display = 'none';
	$('cnnMostPopMod').style.display = 'block';
}

/* Load the images when needed. */
function cnnLoadDOMElementOnDemand(cnnElementIdStr, cnnIncludeLoc){
	if($(cnnElementIdStr) && !$(cnnElementIdStr).cnnCSILoaded){
		var cnnLoadElement = CSIManager.getInstance().call(cnnIncludeLoc,'',cnnElementIdStr);
		$(cnnElementIdStr).cnnCSILoaded = true;
	}
}
/* end most popular module
========================================================================= */

/* politics T1 video/story tabs */
function cnnPolShowStories() {
	$('cnnPolT2Videos').style.display = "none";
	$('cnnPolVideoTab').style.display = "none";
	$('cnnT1Video').style.display = "none";
	$('cnnT1Story').style.display = "block";
	$('cnnPolStoryTab').style.display = "block";
	$('cnnPolT2Stories').style.display = "block";
}
function cnnPolShowVideos() {
	$('cnnPolT2Videos').style.display = "block";
	$('cnnPolVideoTab').style.display = "block";
	$('cnnT1Video').style.display = "block";
	$('cnnT1Story').style.display = "none";
	$('cnnPolStoryTab').style.display = "none";
	$('cnnPolT2Stories').style.display = "none";
}

/* cnn affiliates (us section)
========================================================================= */
function cnnAffiliates_SetGoBtn(url) {
	var btnOff = "http://i.cdn.turner.com/cnn/.element/img/2.0/sect/us/affiliates/go_btn_disabled.gif";
	var btnOn = "http://i.cdn.turner.com/cnn/.element/img/2.0/sect/us/affiliates/go_btn.gif";
	var goButtonId = 'cnnAffiliatesGoBtn';
	if ($(goButtonId)) {
		if (url) {
			$(goButtonId).innerHTML = '<a id="cnnAffiliatesGoLink" href="'+url+'" target="_blank"><img src="'+btnOn+'" width="29" height="23" border="0" alt=""></a>';
		}
		else {
			$(goButtonId).innerHTML = '<img src="'+btnOff+'" width="29" height="23" border="0" alt="">';
		}
	}
}

function cnnAffiliates_SelectRegion(selectObj) {
	var region = selectObj.value.toLowerCase();
		if (region) {
		var mapId = 'cnnAffiliatesMap';
		if ($(mapId)) {
			$(mapId).src = 'http://i.cdn.turner.com/cnn/.element/img/2.0/sect/us/affiliates/affiliates_' + region + '.gif';
		}
		// reset the list
		var affiliatesId = 'cnnDDAffiliatesCity_list_' + region;
		if ($(affiliatesId)) {
			$(affiliatesId).selectedIndex = 0;
		}
		cnnDD.buildDropdown('cnnDDAffiliatesCity', 252, 270, 10, 'cnnDDWire', region);
		cnnAffiliates_SetGoBtn();
	}
	// no region selected
	else {
		var mapId = 'cnnAffiliatesMap';
		if ($(mapId)) {
			$(mapId).src = 'http://i.cdn.turner.com/cnn/.element/img/2.0/sect/us/affiliates/affiliates_default.gif';
		}
		cnnDD.buildDisabledDropdown('cnnDDAffiliatesCity', 252, 'cnnDDWire', 'northeast');
		cnnAffiliates_SetGoBtn();
	}
}

function cnnAffiliates_SelectCity(selectObj) {
	var url = selectObj.value;
	cnnAffiliates_SetGoBtn(url);
}

/* end cnn affiliates (us section)
========================================================================= */

/* cnet product reviews widget
=========================================================================== */
function cnnSearchCnet() {
	switch(document.tsearch.nodeid.value) {
		case "more":
		window.open("http://cnn-cnet.com.com/2001-1_7-0.html?part=cnn-cnet&subj=re&tag=search");
		break;
		case "6500":
		window.open("http://cnn-cnet.com.com/4323-6530_7-6509025.html?part=cnn-cnet&subj=re&tag=search");
		break;
		case "6501":
		window.open("http://cnn-cnet.com.com/4323-6530_7-6509037.html?part=cnn-cnet&subj=re&tag=search");
		break;
		case "3504":
		window.open("http://cnn-cnet.com.com/4323-6525_7-6509098.html?part=cnn-cnet&subj=re&tag=search");
		break;
		case "3000":
		window.open("http://cnn-cnet.com.com/4323-6526_7-6509032.html?part=cnn-cnet&subj=re&tag=search");
		break;
		case "3127":
		window.open("http://cnn-cnet.com.com/4323-6522_7-6509058.html?part=cnn-cnet&subj=re&tag=search");
		break;
		case "6463":
		window.open("http://cnn-cnet.com.com/4323-6531_7-6509125.html?part=cnn-cnet&subj=re&tag=search");
		break;
		case "6450":
		window.open("http://cnn-cnet.com.com/4323-6532_7-6509081.html?part=cnn-cnet&subj=re&tag=search");
		break;
		case "3132":
		window.open("http://cnn-cnet.com.com/4323-6528_7-6509067.html?part=cnn-cnet&subj=re&tag=search");
		break;
		case "3243":
		window.open("http://cnn-cnet.com.com/4323-6523_7-6509031.html?part=cnn-cnet&subj=re&tag=search");
		break;
	}
	return false;
}
/* end cnet product reviews widget
=========================================================================== */

/* partner box output
=========================================================================== */
function cnnPartnerRand_Asort(){ return (Math.round(Math.random())-0.5); }

function cnnPrintPartnerOutput() {
	var cnnPartner_Data = new Array();
	// name, logo, feed location, subscribe link, logo link
          cnnPartner_Data[0] = new Array("Time.com","http://i.cdn.turner.com/cnn/.element/img/2.0/content/partners/time_partner.gif","/.element/ssi/auto/2.0/sect/MAIN/ftpartners/partner.time.html", "/linkto/time.main.html", "/time/?cnn=yes");
          cnnPartner_Data[1] = new Array("EW.com","http://i.cdn.turner.com/cnn/.element/img/2.0/content/partners/entertainment_partner.gif","/.element/ssi/auto/2.0/sect/MAIN/ftpartners/partner.ew.html", "/linkto/subs/ew.html", "/ew/?cnn=yes");
          cnnPartner_Data[2] = new Array("People.com","http://i.cdn.turner.com/cnn/.element/img/2.0/content/partners/partner_people.gif","/.element/ssi/auto/2.0/sect/MAIN/ftpartners/partner.people.html", "/linkto/subs/people.html", "http://www.people.com/people");
          cnnPartner_Data[3] = new Array("CNNMoney.com","http://i.cdn.turner.com/cnn/.element/img/2.0/content/partners/money_partner.gif","/.element/ssi/auto/2.0/sect/MAIN/ftpartners/partner.money.txt", "http://money.cnn.com/services/bridge/contact.us.html", "/money/index.html?cnn=yes");
          cnnPartner_Data[4] = new Array("CNNSI.com","http://i.cdn.turner.com/cnn/.element/img/2.0/content/partners/si_partner.gif","/.element/ssi/auto/2.0/sect/MAIN/ftpartners/partner.si.txt", "/linkto/subs/si.html", "/si/?cnn=yes");

	cnnPartner_Data.sort(cnnPartnerRand_Asort);

	for(var i = 0;i < 2;i++) {

		var	temp_partner_html = '<div class="cnnWireBox"><div class="cnnBoxHeader"><div></div></div><div class="cnnBoxContent"><div class="cnnPad8TB12LR"><div class="cnnPartnerTop">';
		if(cnnPartner_Data[i][3] != "") {
			temp_partner_html += '<div class="cnnPartnerSubscribe"><a href="' + cnnPartner_Data[i][3] + '" onmouseover="cnnImgSwap(this,1)" onmouseout="cnnImgSwap(this,0)"><img src="http://i.cdn.turner.com/cnn/.element/img/2.0/content/partners/btn_subscribe.gif" width="61" height="17" border="0"></a></div>';
		}
		temp_partner_html += '<div>';
		if(cnnPartner_Data[i][4] != "") {
			temp_partner_html += '<a href="' + cnnPartner_Data[i][4] + '">';
		}
		temp_partner_html += '<img src="' + cnnPartner_Data[i][1] + '" class="cnnPartLogo" border="0" alt="">';
		if(cnnPartner_Data[i][4] != "") {
			temp_partner_html += '</a>';
		}
		temp_partner_html += '</div><div class="clear"></div></div><div id="cnnPartnerInclude_' + i + '">Loading...</div></div></div><div class="cnnBoxFooter"><div></div></div></div>';

		Element.update('randPartner_' + i, temp_partner_html);
		new Ajax.Updater('cnnPartnerInclude_' + i, cnnPartner_Data[i][2], {asynchronous:true, method:'get'});

	}
}

function cnnMpPartnerRotate() {
	var intRandom = Math.floor(Math.random()*2);
	switch(intRandom) {
		case 0:
			$('cnnMpPartnerEW').style.display = "block";
			break;
		case 1:
			$('cnnMpPartnerPeople').style.display = "block";
			break;
		default:
			break;
	}
}
/* end partner box output
=========================================================================== */

/* main page most popular overlay
=========================================================================== */
function cnnShowMoPo() {
	$('cnnOpacity').style.display = "block";
	$('cnnMoPo').style.display = "block";
}

function cnnHideMoPo() {
	$('cnnMoPo').style.display = "none";
	new Effect.Opacity('cnnOpacity', {duration:0.1, from:0.5, to:0.0});

	// reset opacity
	setTimeout("$('cnnOpacity').style.display = \"none\";new Effect.Opacity('cnnOpacity', {duration:0.1, from:0.0, to:0.8});",500)
}

/* partner box omniture tracking
=========================================================================== */
var cnnPSproducts="";
var cnnProducts = new Array();
/* end partner box output
=========================================================================== */

/* set edition js
========================================================================= */
var cnnDomestic_Host = 'www.cnn.com';
var cnnIntl_Host = 'edition.cnn.com';
var cnnUserEd_Pref = allCookies['SelectedEdition'];
var cnnShow_setPref = false;
var cnnUEPHost_Val = location.hostname;
var cnnOn_Dom_Flag;

if(location.hostname.indexOf(cnnDomestic_Host) > -1) { cnnOn_Dom_Flag = 1; }

var cnnSetPrefBox_HTML = '<div id="cnnSetCNNEd"><div class="cnnWireSeBox"><div class="cnnWireSeBoxHeader"><img src="http://i.cdn.turner.com/cnn/.element/img/2.0/global/set_edition/corner_se_tl.gif" width="4" height="4" alt="" id="cnnSeCnrTL" /></div><div id="cnnBoxSeContent"><a href="javascript:cnnSetPrefBox_Close();"><img class="cnnEditionCloseBtn" src="http://i.cdn.turner.com/cnn/.element/img/2.0/global/set_edition/se_close_btn.gif" width="14" height="14" alt="" /></a><form id="cnnsetPref_Form"><table align="center" class="cnnSetEdition" cellpadding="0" cellspacing="0" border="0"><tr><td class="setEdText"><b>Set your CNN.com Edition</b></td>';

if(cnnOn_Dom_Flag) { cnnSetPrefBox_HTML += '<td class="cnnEditionRadioTD"><input type="radio" id="edition" name="edition" class="cnnEditionRadioBtn" checked="checked" value="www" /></td><td>CNN U.S.</td><td class="cnnEditionRadioTD"><input type="radio" id="edition" name="edition" class="cnnEditionRadioBtn" value="edition" /></td><td>CNN International</td>'; }
else { cnnSetPrefBox_HTML += '<td class="cnnEditionRadioTD"><input type="radio" id="edition" name="edition" class="cnnEditionRadioBtn" checked="checked" value="edition" /></td><td>CNN International</td><td class="cnnEditionRadioTD"><input type="radio" id="edition" name="edition" class="cnnEditionRadioBtn" value="www" /></td><td>CNN U.S.</td>'; }

cnnSetPrefBox_HTML += '<td><a href="javascript:cnnSetEdPref_cooKie();"><img class="cnnEditionBoxBtn" src="http://i.cdn.turner.com/cnn/.element/img/2.0/global/set_edition/se_btn.gif" width="84" height="23" alt="" border="0" /></a></td></tr></table></form></div><div class="cnnWireSeBoxFooter"><img src="http://i.cdn.turner.com/cnn/.element/img/2.0/global/set_edition/corner_se_bl.gif" width="4" height="4" alt="" id="cnnSeCnrBL" /></div></div></div>';

if(cnnUserEd_Pref) {
	if(location.hostname == "cnn.com") {
		if(cnnUserEd_Pref == 'www') { location.replace('http://' + cnnDomestic_Host); }
		else{ location.replace('http://' + cnnIntl_Host); }
	}
}
else {
	cnnShow_setPref = true;
}

function cnnSetPrefBox_Close(pref_flag) {
	if (document.getElementById) { document.getElementById('cnnSetEditionContainer').style.display = 'none'; }
	else if (document.all) { document.all['cnnSetEditionContainer'].style.display = 'none'; }
}

function cnnSetEditionBox() {

	Element.update('cnnSetEditionContainer', cnnSetPrefBox_HTML);
	if (document.getElementById) { document.getElementById('cnnSetEditionContainer').style.display = 'block'; }
	else if (document.all) { document.all['cnnSetEditionContainer'].style.display = 'block'; }
	if(!cnnUserEd_Pref) {
		if(location.hostname.indexOf(cnnIntl_Host) > -1) { CNN_setCookie('SelectedEdition', 'edition', 854400, '/', '.cnn.com'); }
		else { CNN_setCookie('SelectedEdition', 'www', 854400, '/', '.cnn.com'); }
	}

}

function cnnSetEdPref_cooKie() {
	form_obj = document.getElementById('cnnsetPref_Form');
	cookie_val = (form_obj.edition[0].checked) ? form_obj.edition[0].value : form_obj.edition[1].value;
	CNN_setCookie('SelectedEdition', cookie_val, 854400, '/', '.cnn.com');
	cnnSetPrefBox_Close(1);
	current_loc = "" + document.location + '';
	if(cookie_val == 'www') {
		if(location.hostname.indexOf(cnnDomestic_Host) < 0) {
			if(location.hostname.indexOf(cnnIntl_Host) > -1) {
				current_loc = current_loc.replace(/^http:\/\/.+\.com/, 'http://' + cnnDomestic_Host);
				location.replace(current_loc);
			}
		}
	}
	else {
		if(location.hostname.indexOf(cnnIntl_Host) < 0) {
			if(location.hostname.indexOf(cnnDomestic_Host) > -1) {
				current_loc = current_loc.replace(/^http:\/\/.+\.com/, 'http://' + cnnIntl_Host);
				location.replace(current_loc);
			}
		}
	}
}

/* end set edition js
========================================================================= */

/* make cnn your home js
========================================================================= */
var cnnHPbkmrk = "http://www.cnn.com";
if(location.hostname == "edition.cnn.com") {
	cnnHPbkmrk = "http://edition.cnn.com";
}

var cnnMakeHPBox_HTML = '<div id="cnnMakeHPBanner"><div class="cnnWireSeBox"><div class="cnnWireSeBoxHeader"><img src="http://i.cdn.turner.com/cnn/.element/img/2.0/global/set_edition/corner_se_tl.gif" width="4" height="4" alt="" /></div><div id="cnnBoxSeContent"><a href="javascript:cnnMakeHPBox_Close();"><img class="cnnEditionCloseBtn" src="http://i.cdn.turner.com/cnn/.element/img/2.0/global/set_edition/se_close_btn.gif" width="14" height="14" alt="" /></a><form id="cnnsetPref_Form"><table align="center" class="cnnSetEdition" cellpadding="0" cellspacing="0" border="0"><tr><td class="setEdText"><b>Make CNN Your Home Page</b></td><td><a href="javascript:void(0);" onclick="if(document.all) { this.style.behavior=\'url(#default#homepage)\';this.setHomePage(\''+cnnHPbkmrk+'\');cnnMakeHPBox_Close(); }"><img src="http://i.cdn.turner.com/cnn/.element/img/2.0/global/make_hp/set_btn.gif" width="70" height="23" alt="" border="0" class="cnnEditionBoxBtn" /></a></td></tr></table></form></div><div class="cnnWireSeBoxFooter"><img src="http://i.cdn.turner.com/cnn/.element/img/2.0/global/set_edition/corner_se_bl.gif" width="4" height="4" alt="" /></div></div></div>';

function cnnMakeHPBox_Close() {
	if (document.getElementById) { document.getElementById('cnnMakeHPContainer').style.display = 'none'; }
	else if (document.all) { document.all['cnnMakeHPContainer'].style.display = 'none'; }
}

function cnnMakeHPBox() {
	if(document.all) {
		Element.update('cnnMakeHPContainer', cnnMakeHPBox_HTML);
		document.all['cnnMakeHPContainer'].style.display = 'block';
	}
	else {
	CNN_openPopup('/feedback/help/homepage/frameset.2.0.exclude.html','620x364','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=auto,resizable=no,width=620,height=430');
	}

}

/* end make cnn your home js
========================================================================= */

/* career builder widget variables js
========================================================================= */
cnnCBIds = {
	'mpot': 'cbcnn_mpot',
	'pt': 'cbcnn_pt',
	'sal': 'cbcnn_sal',
	'cs': 'cbcnn_cs',
	'mopt': 'cbcnn_mopt',
	'_160': 'cbcnn160'
};

/*
	cnnSetCBVars --
		Sets the site id links and the hidden search field on the form.
*/
function cnnSetCBVars() {
	// using cnnSectionName and cnnMosaicDetect to determine what suffix should be affixed.
	var cnnWhichSection = typeof(cnnSectionName) == "undefined" ? "" : cnnSectionName;
	var cnnIsMosaic = typeof(cnnMosaicDetect) != "undefined" && cnnMosaicDetect == "mosaic" ? true : false;
	var topic = typeof(cnnTopic1) == "undefined" ? "" : cnnTopic1;
	
	switch(cnnWhichSection)
	{
		case "World":			cnnSuffix = cnnIsMosaic ? "WSP" : "WMP";	break;
		case "US":				cnnSuffix = cnnIsMosaic ? "USSP" : "USMP";	break;
		case "Politics":		cnnSuffix = cnnIsMosaic ? "PSP" : "PMP";	break;
		case "Entertainment":	cnnSuffix = cnnIsMosaic ? "ESP" : "EMP";	break;
		case "Health":			cnnSuffix = cnnIsMosaic ? "HSP" : "HMP";	break;
		case "Tech":			cnnSuffix = cnnIsMosaic ? "" : "TMP";		break;
		case "Living":			cnnSuffix = cnnIsMosaic ? "LSP" : "LMP";	break;
		case "Hot Topic":
			switch(topic)
			{
				case "National_Economy":	cnnSuffix = "ROAD"; break;
				case "Unemployment_Rate":	cnnSuffix = "WHERE"; break;
			}		
			break;
		default:				cnnSuffix = "";								break;
	}
	
	ids = Object.clone(cnnCBIds);
	for(cnnprop in ids) 
	{
		ids[cnnprop] += cnnSuffix;
	}


	// Maps code ids (html ids in code) to site ids 
	var cnnMapLnkId = {
		"cnnLnkMopt" : ids.mopt, 
		"cnnLnkPt" : ids.pt, 
		"cnnLnkSal" : ids.sal, 
		"cnnLnkCs" : ids.cs, 
		"cnnLnkMopt2" : ids.mopt 
	};
	
	var cnnMapFormId = {
		"cnnLnkSiteID" : ids._160 
	};
		
	for(id in cnnMapLnkId)
	{
		if($(id) != null)
		{
			$(id).href = $(id).href.replace(/siteid=/, "siteid=" + cnnMapLnkId[id]);
		}
	}
	
	for(id in cnnMapFormId)
	{
		if($(id) != null)
		{
			$(id).value = cnnMapFormId[id];
		}
	}
}
/* career builder widget variables js
========================================================================= */

/* cnn horizontal slider js
========================================================================= */

var cnnHorizontalSlider = Class.create();
cnnHorizontalSlider.prototype = {
	initialize: function(objName,elContainer,elIdentifier,navContainer,displayWidth) {
	try {
		this.locked = false;
		this.objName = objName;
		this.elIdentifier = elIdentifier;
		this.container = elContainer;
		this.navDiv = navContainer;
		this.viewPort = displayWidth;
		this.sliderWidth = this.findPanels();
		this.numScreens = Math.round(this.sliderWidth/2);
		this.negativeOffSetMax = this.setOffSet();
		this.positiveOffSetMax = 0;
		this.currentPanel = 0;
		this.inactiveDot = "http://i.cdn.turner.com/cnn/.element/img/2.0/content/in_the_news/gray_status.gif";
		this.activeDot = "http://i.cdn.turner.com/cnn/.element/img/2.0/content/in_the_news/gray_active_status.gif";
		this.setSliderWidth() || 0;
		this.buildNav();
		this.getCurrentOffSet();
	} catch(e) {};
	},
	findPanels: function() {
		var panels = $(this.container).getElementsByTagName('div');
		var panelCount = 0;
		for(var i = 0; i<panels.length;i++) {
			if(panels[i].className == this.elIdentifier+' cnnMar9L' || panels[i].className == this.elIdentifier) {
				panelCount++;
			}
		}
		return panelCount;
	},
	setCurrentPanel: function(val) {
		this.getCurrentOffSet();
		this.currentPanel = (this.currOffSet/this.viewPort) * -1;
		this.updateNav();
	},
	setOffSet: function() {
		return ((this.numScreens * this.viewPort) - this.viewPort) * -1;
	},
	calculateSliderWidth: function() {
		return this.viewPort * this.numScreens;
	},
	setSliderWidth: function() {
		$(this.container).style.width = this.calculateSliderWidth() + "px";
	},
	buildNav: function() {
		var btnContainer = document.createElement('div');
		btnContainer.className = "cnnMpVidBtns";

		var previousBtnLnk = document.createElement('a');
		previousBtnLnk.setAttribute('href','javascript:void(0);');

		var previousBtn = document.createElement('img');
		previousBtn.setAttribute('src','http://i.cdn.turner.com/cnn/.element/img/2.0/content/in_the_news/left_gray_btn.gif');
		previousBtn.setAttribute('width','26');
		previousBtn.setAttribute('height','19');
		previousBtn.setAttribute('border','0');		
		previousBtn.setAttribute('id','cnnMpVidBtnL');

		previousBtn.setAttribute('onmouseover', 'this.src=this.src.replace(\'red_btn\', \'red_over_btn\');');
		previousBtn.setAttribute('onmouseout', 'this.src=this.src.replace(\'red_over_btn\', \'red_btn\');');
		
		previousBtnLnk.appendChild(previousBtn);
		btnContainer.appendChild(previousBtnLnk);

		for(var i = 0; i<this.numScreens;i++) {
			var dotBtnLnk = document.createElement('a');
			dotBtnLnk.setAttribute('href','javascript:'+this.objName+'.btnSlide(\''+i+'\')');
			
			var dotBtn = document.createElement('img');
			if(i<1) {
				dotBtn.setAttribute('src',this.activeDot);
			} else {
				dotBtn.setAttribute('src',this.inactiveDot);

				//dotBtn.setAttribute('onmouseout','this.src=\''+this.inactiveDot+'\'');
				//dotBtn.setAttribute('onmouseover','this.src=\''+this.activeDot+'\''); 
                                var imgPointer = this;
                                dotBtn.onmouseover = function() {
                                      this.src=imgPointer.activeDot;
                                 }
                                dotBtn.onmouseout = function() {
                                      this.src=imgPointer.inactiveDot;
                                 }				
			}
			dotBtn.setAttribute('width','5');
			dotBtn.setAttribute('height','5');
			dotBtn.setAttribute('border','0');		
			dotBtn.setAttribute('id','cnnMpVidDot'+(i+1));			
			dotBtn.className = "cnnMpVidBtnStatus";
			
			dotBtnLnk.appendChild(dotBtn);
			btnContainer.appendChild(dotBtnLnk);
		}

		var nextBtnLnk = document.createElement('a');
		nextBtnLnk.setAttribute('href','javascript:'+this.objName+'.btnSlide(\'1\')');

		var nextBtn = document.createElement('img');
		nextBtn.setAttribute('src','http://i.cdn.turner.com/cnn/.element/img/2.0/content/in_the_news/right_red_btn.gif');
		nextBtn.setAttribute('width','26');
		nextBtn.setAttribute('height','19');
		nextBtn.setAttribute('border','0');		
		nextBtn.setAttribute('id','cnnMpVidBtnR');

		nextBtn.setAttribute('onmouseover', 'this.src=this.src.replace(\'red_btn\', \'red_over_btn\');');
		nextBtn.setAttribute('onmouseout', 'this.src=this.src.replace(\'red_over_btn\', \'red_btn\');');
		
		nextBtnLnk.appendChild(nextBtn);
		btnContainer.appendChild(nextBtnLnk);		
		
		$(this.navDiv).appendChild(btnContainer);
		
		
	},
	updateNav: function() {
		var activeBtn = this.currentPanel+1;
		var dots = $(this.navDiv).getElementsByTagName('img');
		for(var i = 0; i<dots.length;i++) {
			var currImg = dots[i];
			if(currImg.id.indexOf('cnnMpVidDot') > -1) {
				var btnIDSubStr = currImg.id.split('cnnMpVidDot')[1];
				if (btnIDSubStr == activeBtn) {
					currImg.src = this.activeDot;
					currImg.onmouseover=function() {};
					currImg.onmouseout=function(){};
					currImg.style.cursor = "";
				} else {
					currImg.src = this.inactiveDot;
					currImg.style.cursor = "pointer";
					var imgPointer = this;
					currImg.onmouseover = function() {
						this.src=imgPointer.activeDot;
					}
					currImg.onmouseout = function() {
						this.src=imgPointer.inactiveDot;
					}
					
				}
			} else if(currImg.id == 'cnnMpVidBtnR') {
				if((this.currentPanel+1) < this.numScreens) {
					currImg.src = "http://i.cdn.turner.com/cnn/.element/img/2.0/content/in_the_news/right_red_btn.gif";
					currImg.style.cursor = "pointer";
					currImg.parentNode.href = "javascript:"+this.objName+".btnSlide('"+(this.currentPanel+1)+"')";
				} else {
					currImg.src = "http://i.cdn.turner.com/cnn/.element/img/2.0/content/in_the_news/right_gray_btn.gif";
					currImg.style.cursor = "default";
					currImg.parentNode.href = "javascript:void(0);";
				}
			
			} else if(currImg.id == 'cnnMpVidBtnL') {
				if(this.currentPanel > 0) {
					currImg.src = "http://i.cdn.turner.com/cnn/.element/img/2.0/content/in_the_news/left_red_btn.gif";
					currImg.style.cursor = "pointer";
					currImg.parentNode.href = "javascript:"+this.objName+".btnSlide('"+(this.currentPanel-1)+"')";					
				} else {
					currImg.src = "http://i.cdn.turner.com/cnn/.element/img/2.0/content/in_the_news/left_gray_btn.gif";
					currImg.style.cursor = "default";
					currImg.parentNode.href = "javascript:void(0);";					
				}
			}
		}
	},
	getCurrentOffSet: function(val){
		this.currOffSet = (!isNaN(parseInt($(this.container).style.left))) ? parseInt($(this.container).style.left) : 0;
	},
	btnSlide: function(arg) {
		if(!this.locked) {
			this.locked = true;
			var timeOutPointer = this;
			this.timer = setTimeout(function() {
				timeOutPointer.getCurrentOffSet();
				var finalCoord = (arg * timeOutPointer.viewPort) * -1;
				var moveByVal = (finalCoord > timeOutPointer.currOffSet) ? (finalCoord - timeOutPointer.currOffSet): (timeOutPointer.currOffSet - finalCoord) * -1;
				var duration = (moveByVal > 0) ? 0.3 * (moveByVal/timeOutPointer.viewPort) :  (0.3 * (moveByVal/timeOutPointer.viewPort)) * -1;
				if(duration < 0) {
					duration = duration * -1;
				}
				if(timeOutPointer.currOffSet > timeOutPointer.negativeOffSetMax || timeOutPointer.currOffSet < timeOutPointer.positiveOffSetMax) {
					new Effect.MoveBy( $(timeOutPointer.container).id, 0, moveByVal, {duration: duration,afterFinish:function() {timeOutPointer.setCurrentPanel()}} );
				}


				timeOutPointer.locked = false;
				
			},300);
		}
	}
}

/* cnn horizontal slider js
========================================================================= */

/* cnn T1 Flipper
========================================================================== */

var cnnT1Flipper;

var cnnChangeT1 = (typeof Class == "object") ? Class.create() : {};
cnnChangeT1.prototype = {
	initialize: function(lnkColor,activeLnkColor) {
		this.locked = false;
		this.panels = this.getNumPanels();
		this.iterations = 1;
		this.lnkColor = (lnkColor) ? lnkColor : '004276';
		this.activeLinkColor = (activeLnkColor) ? activeLnkColor : '999999';
	},
	changeT1:function(dir) {
		if($('cnnBlurb'+this.iterations)) {
			var thisPointer = this;
			this.locked = true;
			Effect.Fade($('cnnBlurb'+this.iterations).getElementsByClassName('cnnRotatorImg')[0],
			{ 
				duration: .25,
				beforeStart:function() {
					new Effect.Morph($('cnnRotatorNav'+thisPointer.iterations).getElementsByTagName('a')[0],
					{
  						style: 'color: #'+thisPointer.lnkColor,
  						duration: 0.25
					});
				},
				afterFinish:function() {
					if($('cnnRotatorNav'+thisPointer.iterations)) { 
						$('cnnRotatorNav'+thisPointer.iterations).getElementsByTagName('a')[0].style.color = "";
					}
					if(dir == 'back') {
						if(thisPointer.iterations > 1) {
							thisPointer.iterations--;
						} else {
							thisPointer.iterations = 3;
						}
					} else {
						if(thisPointer.iterations >= thisPointer.panels) {
							thisPointer.iterations = 1;
						} else {
							thisPointer.iterations++;
			
						}
					}
					new Effect.Morph($('cnnRotatorNav'+thisPointer.iterations).getElementsByTagName('a')[0],
					{
  						style: 'color: #'+thisPointer.activeLnkColor,
 						duration: 0.25
					});
					$('cnnRotator').className = "cnnActive"+thisPointer.iterations;
					Effect.Appear($('cnnBlurb'+thisPointer.iterations).getElementsByClassName('cnnRotatorImg')[0],
					{ 
						duration: .25,
						afterFinish:function() {
							thisPointer.locked = false;
						}
					});
				}
			});
		} else { //somehow iterator got lost, reset it and continue on
			this.iteration = 1;
		}
	},
	getNumPanels:function() {
		var numLinks = 0;
		var divSet = $('cnnRotator').getElementsByTagName('div')
		for (var i = 0;i<divSet.length;i++) {
			if(divSet[i].className == "cnnRotatorBlurb") {
				numLinks++;
			}
		}
		return numLinks;
	},
	navigatePanel:function(dir) {
		this.changeT1(dir);
	}
}


function cnnFlipperBack() {
	if(typeof cnnT1Flipper == "object") {
		if(!cnnT1Flipper.locked) {
			cnnT1Flipper.navigatePanel('back');
		}
	}
}

function cnnFlipperFwd() {
	if(typeof cnnT1Flipper == "object") {
		if(!cnnT1Flipper.locked) {
			cnnT1Flipper.navigatePanel();
		}
	}
}

function cnnFlipperImgClick(url) {
	window.location.href = url;
}

/* cnn T1 Flipper
========================================================================== */

/* Empty function that's triggered if and when a user is signed into MSIB and connected to FB  */
function cnn_onMemFBinit() { }


/* definte default metadata object */
if (typeof cnn_metadata == "undefined") {

	var cnn_metadata = {
	
		'section' : [],
		'friendly_name' : '',
		'template_type' : '',
		'template_type_content' : '',
		'business' : {
			'cnn' : {
				'page' : {
				
					'broadcast_franchise' : ''
					
				},
				'video' : {}
			}
		},
		'user' : {
		
			'authenticated' : '',
			'segment' : {
				
				'age' : '',
				'zip' : '',
				'gender' : ''
				
			}
			
		}
	};
}


var cnnDocDomain='';
if(location.hostname.indexOf('cnn.com')>0) { cnnDocDomain='cnn.com'; }
if(location.hostname.indexOf('turner.com')>0) { cnnDocDomain='turner.com'; }
if(cnnDocDomain) { document.domain = cnnDocDomain; }

