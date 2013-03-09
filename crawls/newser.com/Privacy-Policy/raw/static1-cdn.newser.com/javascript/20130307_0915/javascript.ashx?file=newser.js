
function css_browser_selector(u) { var ua = u.toLowerCase(), is = function (t) { return ua.indexOf(t) > -1 }, g = 'gecko', f = 'ff', w = 'webkit', s = 'safari', o = 'opera', m = 'mobile', h = document.documentElement, b = [(!(/opera|webtv/i.test(ua)) && /msie\s(\d)/.test(ua)) ? ('ie ie' + RegExp.$1) : is('firefox') ? g + " " + f + "  " + (/version\/(\d+)/.test(ua) ? ' ' + f + RegExp.$1 : (/firefox(\s|\/)(\d+)/.test(ua) ? ' ' + f + RegExp.$2 : '')) : is('gecko/') ? g : is('opera') ? o + (/version\/(\d+)/.test(ua) ? ' ' + o + RegExp.$1 : (/opera(\s|\/)(\d+)/.test(ua) ? ' ' + o + RegExp.$2 : '')) : is('konqueror') ? 'konqueror' : is('blackberry') ? m + ' blackberry' : is('android') ? m + ' android' : is('chrome') ? w + ' chrome' : is('iron') ? w + ' iron' : is('applewebkit/') ? w + ' ' + s + (/version\/(\d+)/.test(ua) ? ' ' + s + RegExp.$1 : '') : is('mozilla/') ? g : '', is('j2me') ? m + ' j2me' : is('iphone') ? m + ' iphone' : is('ipod') ? m + ' ipod' : is('ipad') ? m + ' ipad' : is('mac') ? 'mac' : is('darwin') ? 'mac' : is('webtv') ? 'webtv' : is('win') ? 'win' + (is('windows nt 6.0') ? ' vista' : '') : is('freebsd') ? 'freebsd' : (is('x11') || is('linux')) ? 'linux' : '', 'js']; c = b.join(' '); h.className += ' ' + c; return c; };

var rolloverTimeoutId = -1;
var readTimeout = -1;
var clearReadTimeout = -1;
var loaded = false;
var ready = false;
var showingRollover = false;
var googleAdsCheckNoDoubleCall = false;
var videoClickEventRecorded = false;
var registerOpen = false;

function setLoaded() {
    loaded = true;
}
function setReady() {
    ready = true;
}

//Use this method to call a URL and specify function to call upon success and failure
function AjaxCall(URL,Success,Error) {
	jQuery.ajax({
		url: URL,
		success: function (data) {
			Success(data);
		},
		error: function (xhr, status, error) {
			Error(xhr, status, error);
		}
	});
}

//Use this method to call a URL (via POST) and specify function to call upon success and failure
function AjaxCallPost(URL, Data, Success, Error) {
    jQuery.ajax({
        type: 'POST',
        url: URL,
        data: Data,
        success: function (data) {
            Success(data);
        },
        error: function (xhr, status, error) {
            Error(xhr, status, error);
        }
    });
}

//Use this method to call a URL SYNCHRONOUSLY and specify function to call upon success
function AjaxCallSync(URL, Success) {
	jQuery.ajax({
		url: URL,
		success: function (data) {
			Success(data);
		},
		async:false,
		timeout:3000
	});
}

//Use this method to replace an element with the response from a requested url
function AjaxReplace(url, elementToReplace) {
	jQuery.ajax({
		url: url,
		success: function (data) {
			jQuery(elementToReplace).html(data);
		},
		error: function (xhr, status, error) {
			jQuery(elementToReplace).css("display", "none");
		}
	});
}

//Use this method to call a url when you don't care about response
function AjaxUpdate(url) {
	jQuery.ajax({
		url: url,
		success: function (data) { },
		error: function (xhr, status, error) { }
	});
}

//use this method to call a url and then refresh the page after it is called
function AjaxUpdateAndRefresh(url) {
    jQuery.ajax({
        url: url,
        success: function (data) {
            var sURL = unescape(window.location.pathname);
            window.location.href = sURL;
        },
        error: function (xhr, status, error) {
        }
    });
}

function closeWelcomeShade(shadeNumber) {
	jQuery('#welcomescreen').slideUp(1000);
	AjaxUpdate("/utility.aspx?function=lastwelcomeshadeclosed&lastwelcomeshadeclosed=" + shadeNumber);
	return false;
}

//Determine the scroll position from the top (works on all browsers)
function ScrollTop() {
	var scrollTop = document.body.scrollTop;
	if (scrollTop == 0) {
		if (window.pageYOffset) {
			scrollTop = window.pageYOffset;
		}
		else {
			scrollTop = (document.body.parentElement) ? document.body.parentElement.scrollTop : 0;
		}
	}
	return scrollTop;
}

function doInterstitialAd() {
	jQuery(window).load(function () {
		doPopup('interstitialpopup.aspx?promotype=ad&autoclose=true', 975, 550, -1, -1, false, true);
	});
}

function GetMonthAbbreviation(m) {
	var mon;
	if (m == 1) { mon = 'Jan' }
	else if (m == 2) { mon = 'Feb' }
	else if (m == 3) { mon = 'Mar' }
	else if (m == 4) { mon = 'Apr' }
	else if (m == 5) { mon = 'May' }
	else if (m == 6) { mon = 'Jun' }
	else if (m == 7) { mon = 'Jul' }
	else if (m == 8) { mon = 'Aug' }
	else if (m == 9) { mon = 'Sep' }
	else if (m == 10) { mon = 'Oct' }
	else if (m == 11) { mon = 'Nov' }
	else if (m == 12) { mon = 'Dec' }
	return mon;
}

/* Story UserErrorReportForm Begin */

function openErrorReport(Headline, URL, EntityType, EntityId) {
	if (ready) {
		doPopup("UserErrorReportForm.aspx?storyheadline=" + Headline + "&linkurl=" + URL + "&entityType=" + EntityType + "&entityId=" + EntityId, 390, 301, -1, 100, false);
	}
	return false;
}
function closeErrorReport() {
	top.HideLightBox();
	document.getElementById('ErrorReportForm').style.display = 'none';
	top.document.getElementById('iframe_overlay').src = '';
	top.document.getElementById('iframe_overlay').style.left = '-1000000px';
	top.document.getElementById('iframe_overlay').style.display = 'none';
	top.document.getElementById('iframe_overlay').style.visibility = 'hidden';
}
function sendErrorReport() {
	if (jQuery('#ErrorType').get(0).selectedIndex == 0) {
		jQuery('#errorFieldError').html('Choose an error type');
		return;
	}
	else {
		jQuery('#errorFieldError').html('');
	}
	if (jQuery('#ErrorDescription').val() == "") {
		jQuery('#errorFieldError').html('Enter an error description');
		return;
	}
	else {
		jQuery('#errorFieldError').html('');
    }

    var data = "ErrorType=" + jQuery('#ErrorType').val() +
               "&ErrorDescription=" + jQuery('#ErrorDescription').val() + 
               "&Headline=" + jQuery('#headline').val() + 
               "&URL=" + jQuery('#url').val() + 
               "&EntityType=" + jQuery('#entitytype').val() +
               "&EntityId=" + jQuery('#entityid').val();

    AjaxCallPost("/usererrorreportajax" + ".aspx", data, sendErrorReportSuccess, sendErrorReportError);
}
function sendErrorReportSuccess() {
    closeErrorReport();
}
function sendErrorReportError() {
    top.location.href("/error.aspx");
}
/* Story UserErrorReportForm End */


/* Story UserFlagReportForm Begin */

function OpenFlagReport(EntityType, EntityId) {
	if (IsLoggedIn()) {
	    doPopup("UserFlagReportForm.aspx?entityType=" + EntityType + "&entityId=" + EntityId, 331, 301, -1, 100, false);
	}
	else {
		doPopup('LoginOrRegister.aspx?url=' + window.location + '?flag=y', 290, 160, -1, 100, false);
	}
	return false;
}
function CloseFlagReport() {
    top.HideLightBox();
    document.getElementById('FlagAsInappropriateForm').style.display = 'none';
    top.document.getElementById('iframe_overlay').src = '';
    top.document.getElementById('iframe_overlay').style.left = '-1000000px';
    top.document.getElementById('iframe_overlay').style.display = 'none';
    top.document.getElementById('iframe_overlay').style.visibility = 'hidden';
}
function FlagStory() {
	if (jQuery('#ReasonType').get(0).selectedIndex == 0) {
		jQuery('#errorFieldError').html('Choose a reason');
		return;
	}
	else {
		jQuery('#errorFieldError').html('');
	}

    var data = "Reason=" + jQuery('#ReasonType :selected').text() +
               "&ErrorDescription=" + jQuery('#ErrorDescription').val() + 
               "&EntityType=" + jQuery('#entitytype').val() +
               "&EntityId=" + jQuery('#entityid').val();

    AjaxCallPost("/userflagreportajax" + ".aspx", data, FlagStorySuccess, FlagStoryError);
}
function FlagStorySuccess(data) {
    jQuery('#FlagResultsMessage', top.document).html(data.msg);
    CloseFlagReport();
}
function FlagStoryError() {
    top.location.href("/error.aspx");
}
/* Story UserFlagReportForm End */
function ChangeStoryView(StoryView) {
	var url = "/utility.aspx?function=StoryView&StoryView=" + StoryView;
	AjaxCallSync(url, ChangeStoryViewSuccess);
}
function ChangeStoryViewSuccess() {
	top.location.href = top.location.href;
}
/***** BEGIN - code formerly in timeTracker.js *****/
// Copyright 2007 Google, Inc.
// This sample code is under the Apache2 license, see
// http://www.apache.org/licenses/LICENSE-2.0 for license details.

/**
* @fileoverview Wrapper for Time Tracking
*/

/**
* @class Time Tracking component.
*     This class encapsulates all logic for time tracking on a particular
*     page. Time tracking could be for any object within a page or the page
*     itself.
*
* @param {Array.<Number>} arg1 Optional array that represents the bucket
* @constructor
*/
var TimeTracker = function (opt_bucket) {
    if (opt_bucket) {
        this.bucket_ = opt_bucket.sort(this.sortNumber);
    } else {
        this.bucket_ = TimeTracker.DEFAULT_BUCKET;
    }
};

TimeTracker.prototype.startTime_;
TimeTracker.prototype.stopTime_;
TimeTracker.prototype.bucket_;
TimeTracker.DEFAULT_BUCKET = [100, 500, 1500, 2500, 5000];

/**
* Calculates time difference between start and stop
* @return {Number} The time difference between start and stop
*/
TimeTracker.prototype._getTimeDiff = function () {
    return (this.stopTime_ - this.startTime_);
};

/**
* Helper function to sort an Array of numbers
* @param {Number} arg1 The first number
* @param {Number} arg2 The second number
* @return {Number} The difference used to sort
*/
TimeTracker.prototype.sortNumber = function (a, b) {
    return (a - b);
}

/**
* Records the start time
* @param {Number} arg1 Optional start time specified by user
*/
TimeTracker.prototype._recordStartTime = function (opt_time) {
    if (opt_time != undefined) {
        this.startTime_ = opt_time;
    } else {
        this.startTime_ = (new Date()).getTime();
    }
};

/**
* Records the stop time
* @param {Number} arg1 Optional stop time specified by user
*/
TimeTracker.prototype._recordEndTime = function (opt_time) {
    if (opt_time != undefined) {
        this.stopTime_ = opt_time;
    } else {
        this.stopTime_ = (new Date()).getTime();
    }
};

/**
* Tracks the event. Calculates time and sends information to
* the event tracker passed
* @param {Object} arg1 GA tracker created by user
* @param {String} arg2 Optional event category
* @param {String} arg3 Optional event label
*/
TimeTracker.prototype._track = function (tracker,
										opt_event_category,
                                        opt_event_label,
                                        opt_page) {

    var i;
    var bucketString;
    var category;
    var page;

    if (opt_event_category != undefined && opt_event_category.length != 0) {
        category = opt_event_category;
    } else {
        category = 'TimeTracker';
    }

    if (opt_event_label != undefined && opt_event_label.length != 0) {
        page = opt_event_label;
    } else {
        page = 'Page';
    }

    for (i = 0; i < this.bucket_.length; i++) {
        if ((this._getTimeDiff()) < this.bucket_[i]) {
            if (i == 0) {
                bucketString = "0-" + (this.bucket_[0]);
                break;
            } else {
                bucketString = this.bucket_[i - 1] + "-" + (this.bucket_[i] - 1);
                break;
            }
        }
    }
    if (!bucketString) {
        bucketString = this.bucket_[i - 1] + "+";
    }

    try {
        if (this._getTimeDiff() < 60000 && this._getTimeDiff() > 0) {  /* Only record events less than a minute */
            _gaq.push(['eventTracker._trackEvent', category, opt_page, opt_event_label, this._getTimeDiff()]);
        }
    } catch (e) { }
};

/**
* Sets the bucket for histogram generation in GA
* @param {Array.<Number>} The bucket array
*/
TimeTracker.prototype._setHistogramBuckets = function (buckets_array) {
    this.bucket_ = buckets_array.sort(this.sortNumber);
};

/*=========================================================================*/

/**
* @class Page Load Tracking component.
*     This class encapsulates all logic for page load time tracking on a particular
*     page. 
*
* @param {String} arg1 Variable name of the Google Analytics tracking object used on the page
* @param {String} arg2 Optional page name of index page
* @param {Number} arg3 Optional start time specified by user
* @constructor
*/

var PageLoadTracker = function (GATrackerObj, defaultPage, startTime) {
    this.GATrackerObj_ = GATrackerObj;
    this.defaultPage_ = defaultPage;
    this.timeTracker_ = new TimeTracker(PageLoadTracker.DEFAULT_BUCKET);
    this.timeTracker_._recordStartTime(startTime);
};

PageLoadTracker.prototype.GATrackerObj_;
PageLoadTracker.prototype.defaultPage_;
PageLoadTracker.prototype.timeTracker_;
PageLoadTracker.DEFAULT_BUCKET = [1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500, 8000, 9000, 10000, 15000, 20000];

/**
*  Determines what page name to send as the event label, and sends the event tracking request
*/
PageLoadTracker.prototype.track = function () {

    var GATrackerObj = null;
    var pageName = "";

    if (window.location.pathname.search(/\/$/) >= 0)
        pageName = window.location.pathname + this.defaultPage_;
    else
        pageName = window.location.pathname;

    if (_gaq != null && typeof _gaq == 'object') {
        try {
            this.timeTracker_._recordEndTime();
            this.timeTracker_._track(GATrackerObj, 'PageLoadTimes', pageName, this.defaultPage_);
        } catch (e) { }
    }
};

/**
*  Adds event handler for specified event to an element
*  
*  @param	element	Element to add event listener to
*  @param	type		Event to listen for.  Do not prepend event with 'on', as the functions automatically prepends it
*  @param	expression	Javascript function to execute on event.  Can be either a function name or anonymous function
*  @param	bubbling	Sets whether to register the event on bubbling phase (true) or capturing phase (false).  Only applies to W3C compliant browsers.
*  @return			True on success, false on failure
*/
function addListener(element, type, expression, bubbling) {
    bubbling = bubbling || false;

    if (window.addEventListener) { // Standard
        element.addEventListener(type, expression, bubbling);
        return true;
    } else if (window.attachEvent) { // IE
        element.attachEvent('on' + type, expression);
        return true;
    } else return false;
}
/***** END - code formerly in timeTracker.js *****/
/***** BEGIN - code formerly in media.js *****/
/////////////////////////
//Javascript for Images
/////////////////////////

var icurscroll = 1;
var qcurscroll = 1;
var toid = null;
var pstatus = 0;
var pstatusQuote = 0;
var scrollVid = false;
var scrollQuo = false;
var scrollImg = false;

function play() {
    if (pstatus == 0) {
        //added this check and moved variables for proper ability to pause
        pause();
    }
    else {
        if (icurscroll == imaxscroll) {
            icurscroll = 1;
            jQuery('#iscrollview').css("left", "0");
            changeiScrollCount();
        }
        else {
            nextImage(0, 0);
        }
        toid = setTimeout(play, 3000);
    }
}

function pause() {
    clearTimeout(toid)
}

function playpause() {
    if (pstatus == 0) {
        pstatus = 1;
        play();
        jQuery('#pbutton').html("Pause");
    }
    else {
        pstatus = 0;
        pause();
        jQuery('#pbutton').html("Slideshow");
    }

}

function prevImage(pause) {
    if (pause && pstatus == 1) {
        //added this check and moved variables for proper ability to pause
        playpause();
    }
    var cs = eval('icurscroll');
    var maxs = eval('imaxscroll');
    if (cs > 1) {
        if (cs < images1.length && jQuery("#image1_" + cs).attr("src").indexOf("loading3.gif") >= 0) {
            jQuery("#image1_" + cs).attr("src", images1[cs]);
        }
        jQuery("#iscrollview").animate({ "left": "+=300" }, "slow");
        icurscroll--;
        changeiScrollCount();
    }
}

function nextImage(supressEvent, pause) {
    if (pause && pstatus == 1) {
        //added this check and moved variables for proper ability to pause
        playpause();
    }
    var cs = eval('icurscroll');
    var maxs = eval('imaxscroll');
    if (cs < maxs) {
        if (cs > 0 && jQuery("#image1_" + cs).attr("src").indexOf("loading3.gif") >= 0) {
            jQuery("#image1_" + cs).attr("src", images1[cs]);
        }
        jQuery("#iscrollview").animate({ "left": "-=300" }, "slow");
        icurscroll++;
        changeiScrollCount();
    }
    if (jQuery('#pbutton').html() == 'Slideshow') {
        if (!scrollImg) {
            scrollImg = true;
        }
    }
}

function iScrollTo(idx) {
    var scroll = (idx - 1) * -300;
    jQuery("#iscrollview").animate({ "left": "-=" + scroll }, "slow");
    icurscroll = idx;
    changeiScrollCount();
}

function changeiScrollCount() {
    var scrollstatusdiv = jQuery('#iscrollstatus');
    if (scrollstatusdiv != undefined) {
        scrollstatusdiv.html("(" + icurscroll + " of " + imaxscroll + ")");
    }
    checkPrevNextImage();
}

function checkPrevNextImage() {
    var curScroll = eval('icurscroll');
    var maxScroll = eval('imaxscroll');
    if ((curScroll == 1 && maxScroll == 1)) {
        if (largeImages) {
            jQuery('#mediaControlButtons').css("display", "none");

        }
        else {
            jQuery('#mediaControlsImages').css("display", "none");
        }
    }
    else {
        if (curScroll == 1) {
            jQuery('#spanPrevImageEna').css("display", "none");
            jQuery('#spanPrevImageDis').css("display", "inline");
        }
        else {
            jQuery('#spanPrevImageEna').css("display", "inline");
            jQuery('#spanPrevImageDis').css("display", "none");
        }
        if (curScroll == maxScroll) {
            jQuery('#spanNextImageEna').css("display", "none");
            jQuery('#spanNextImageDis').css("display", "inline");
        }
        else {
            jQuery('#spanNextImageEna').css("display", "inline");
            jQuery('#spanNextImageDis').css("display", "none");
        }
    }
}

/////////////////////////
//Javascript for 2nd image control
/////////////////////////

var icruscroll2 = 1;
var toid2 = null;
var pstatus2 = 0;
var scrollImg2 = false;

function play2() {
    if (pstatus2 == 0) {
        //added this check and moved variables for proper ability to pause
        pause2();
    }
    else {
        if (icruscroll2 == imaxscroll2) {
            icruscroll2 = 1;
            jQuery('#iscrollview2').css("left", "0");
            changeiScrollCount2();
        }
        else {
            nextImage2(0, 0);
        }
        toid2 = setTimeout(play2, 3000);
    }
}

function pause2() {
    clearTimeout(toid2)
}

function playpause2() {
    if (pstatus2 == 0) {
        pstatus2 = 1;
        play2();
        jQuery('#pbutton2').html("Pause");
    }
    else {
        pstatus2 = 0;
        pause2();
        jQuery('#pbutton2').html("Slideshow");
    }

}

function prevImage2(pause) {
    if (pause && pstatus2 == 1) {
        //added this check and moved variables for proper ability to pause
        playpause2();
    }
    var cs = eval('icruscroll2');
    var maxs = eval('imaxscroll2');
    if (cs > 1) {
        if (cs < images2.length && jQuery("#image2_" + cs).attr("src").indexOf("loading3.gif") >= 0) {
            jQuery("#image2_" + cs).attr("src", images2[cs]);
        }
        jQuery("#iscrollview2").animate({ "left": "+=300" }, "slow");
        icruscroll2--;
        changeiScrollCount2();
    }
}

function nextImage2(supressEvent, pause) {
    if (pause && pstatus2 == 1) {
        //added this check and moved variables for proper ability to pause
        playpause2();
    }
    var cs = eval('icruscroll2');
    var maxs = eval('imaxscroll2');
    if (cs < maxs) {
        if (cs > 0 && jQuery("#image2_" + cs).attr("src").indexOf("loading3.gif") >= 0) {
            jQuery("#image2_" + cs).attr("src", images2[cs]);
        }
        jQuery("#iscrollview2").animate({ "left": "-=300" }, "slow");
        icruscroll2++;
        changeiScrollCount2();
    }
    if (jQuery('#pbutton2').html() == 'Slideshow') {
        if (!scrollImg2) {
            scrollImg2 = true;
        }
    }
}

function iScrollTo2(idx) {
    var scroll = (idx - 1) * -300;
    jQuery("#iscrollview2").animate({ "left": "-=" + scroll }, "slow");
    icruscroll2 = idx;
    changeiScrollCount2();
}

function changeiScrollCount2() {
    var scrollstatusdiv = jQuery('#iscrollstatus2');
    if (scrollstatusdiv != null) {
        scrollstatusdiv.html(icruscroll2 + " of " + imaxscroll2);
    }
    checkPrevNextImage2();
}

function checkPrevNextImage2() {
    var curScroll = eval('icruscroll2');
    var maxScroll = eval('imaxscroll2');
    if (curScroll == 1 && maxScroll == 1) {
        jQuery('#mediaControlsImages2').css("display", "none");
    }
    else {
        if (curScroll == 1) {
            jQuery('#spanPrevImage2Ena').css("display", "none");
            jQuery('#spanPrevImage2Dis').css("display", "inline");
        }
        else {
            jQuery('#spanPrevImage2Ena').css("display", "inline");
            jQuery('#spanPrevImage2Dis').css("display", "none");
        }
        if (curScroll == maxScroll) {
            jQuery('#spanNextImage2Ena').css("display", "none");
            jQuery('#spanNextImage2Dis').css("display", "inline");
        }
        else {
            jQuery('#spanNextImage2Ena').css("display", "inline");
            jQuery('#spanNextImage2Dis').css("display", "none");
        }
    }
}

/////////////////////////
//Javascript for Videos
/////////////////////////

var vcurscroll = 0;

function prevVideo() {
    videoClickEventRecorded = false;
    var cs = eval('vcurscroll');
    var maxs = eval('vmaxscroll');
    if (cs > 0) {
        jQuery('#video' + vcurscroll).css("display", 'none');
        vcurscroll--;
        changeVideoCount();
    }
}

function nextVideo() {
    videoClickEventRecorded = false;
    var cs = eval('vcurscroll');
    var maxs = eval('vmaxscroll') - 1;
    if (cs < maxs) {
        jQuery('#video' + vcurscroll).css("display", 'none')
        vcurscroll++;
        changeVideoCount();
    }
    if (!scrollVid) {
        scrollVid = true;
    }
}

function vScrollTo(idx) {
    var maxs = eval('vmaxscroll') - 1;
    if (idx > maxs) {
        idx = maxs;
    }
    jQuery('#video' + vcurscroll).css("display", 'none');
    vcurscroll = idx;
    changeVideoCount();
}

function changeVideoCount() {
    var scrollstatusdiv = jQuery('#vscrollstatus');
    jQuery('#video' + vcurscroll).css("display", 'block');
    var cs = eval('vcurscroll') + 1;
    var ms = eval('vmaxscroll');
    if (scrollstatusdiv != null) {
        scrollstatusdiv.html("(" + cs + " of " + ms + ")");
    }
    checkPrevNextVideo();
}

function checkPrevNextVideo() {
    var curScroll = eval('vcurscroll') + 1;
    var maxScroll = eval('vmaxscroll');
    if (curScroll == 1 && maxScroll == 1) {
        jQuery('#videoControlButtons').css("display", "none");
        document.writeln('<style type="text/css">#videos_panel * .mediaCaption {margin-top:20px;}</style>');
    }
    else {
        if (curScroll == 1) {
            jQuery('#spanPrevVideoEna').css("display", "none");
            jQuery('#spanPrevVideoDis').css("display", "inline");
        }
        else {
            jQuery('#spanPrevVideoEna').css("display", "inline");
            jQuery('#spanPrevVideoDis').css("display", "none");
        }
        if (curScroll == maxScroll) {
            jQuery('#spanNextVideoEna').css("display", "none");
            jQuery('#spanNextVideoDis').css("display", "inline");
        }
        else {
            jQuery('#spanNextVideoEna').css("display", "inline");
            jQuery('#spanNextVideoDis').css("display", "none");
        }
    }
}

/////////////////////////
//Javascript for Quotes
/////////////////////////

function playQuote() {
    if (pstatusQuote == 0) {
        //added this check and moved variables for proper ability to pause
        pauseQuote();
    }
    else {
        if (qcurscroll == qmaxscroll) {
            qcurscroll = 1;
            jQuery('#qscrollview').css("left", "0");
            changeqScrollCount();
        }
        else {
            nextQuote(0, 0);
        }
        toid = setTimeout(playQuote, 4000);
    }
}

function pauseQuote() {
    clearTimeout(toid)
}

function playpauseQuote() {
    if (pstatusQuote == 0) {
        pstatusQuote = 1;
        playQuote();
        jQuery('#pbuttonQuote').html("Pause");
    }
    else {
        pstatusQuote = 0;
        pauseQuote();
        jQuery('#pbuttonQuote').html("Slideshow");
    }
}

function prevQuote(pause) {
    if (pause && pstatusQuote == 1) {
        //added this check and moved variables for proper ability to pause
        playpauseQuote();
    }
    var cs = eval('qcurscroll');
    var maxs = eval('qmaxscroll');
    if (cs > 1) {
        jQuery("#qscrollview").animate({ "left": "+=300" }, "slow");
        qcurscroll--;
        changeqScrollCount();
    }
}

function nextQuote(supressEvent, pause) {
    if (pause && pstatusQuote == 1) {
        //added this check and moved variables for proper ability to pause
        playpauseQuote();
    }
    var cs = eval('qcurscroll');
    var maxs = eval('qmaxscroll');
    if (cs < maxs) {
        jQuery("#qscrollview").animate({ "left": "-=300" }, "slow");
        qcurscroll++;
        changeqScrollCount();
    }
    if (jQuery('#pbuttonQuote').html() == 'Slideshow') {
        if (!scrollQuo) {
            scrollQuo = true;
        }
    }
}

function qScrollTo(idx) {
    var scroll = (idx - 1) * -300;
    jQuery("#qscrollview").animate({ "left": "-=" + scroll }, "slow");
    new Effect.MoveBy('qscrollview', 0, scroll, { duration: 0.0, queue: 'end' });
    qcurscroll = idx;
    changeqScrollCount();
}

function changeqScrollCount() {
    var scrollstatusdiv = jQuery('#qscrollstatus');
    if (scrollstatusdiv != null) {
        scrollstatusdiv.html("(" + qcurscroll + " of " + qmaxscroll + ")");
    }
    checkPrevNextQuote();
}

function checkPrevNextQuote() {
    var curScroll = eval('qcurscroll');
    var maxScroll = eval('qmaxscroll');
    if (curScroll == 1 && maxScroll == 1) {
        jQuery('#mediaControlsQuotes').css("display", "none");
    }
    else {
        if (curScroll == 1) {
            jQuery('#spanPrevQuoteEna').css("display", "none");
            jQuery('#spanPrevQuoteDis').css("display", "inline");
        }
        else {
            jQuery('#spanPrevQuoteEna').css("display", "inline");
            jQuery('#spanPrevQuoteDis').css("display", "none");
        }
        if (curScroll == maxScroll) {
            jQuery('#spanNextQuoteEna').css("display", "none");
            jQuery('#spanNextQuoteDis').css("display", "inline");
        }
        else {
            jQuery('#spanNextQuoteEna').css("display", "inline");
            jQuery('#spanNextQuoteDis').css("display", "none");
        }
    }
}
/***** END - code formerly in media.js *****/
/***** BEGIN - code formerly in grid.js *****/
////////////////////////////////////////////////////////////////////////////////
// Function calls for story grid
////////////////////////////////////////////////////////////////////////////////

function BuildAjaxURL(gridRowNum, numGridRows, numGridCols, autorefresh) {
    var ajaxURL = "/controlpage.aspx?control=storysquarecontainer&sectionid=" + storySectionId + "&SITEPAGENAME=" + sitePageName + "&donotshowads=" + storyDoNotShowAds + "&gridrownum=" + gridRowNum + "&squarewidth=" + storySquareWidth + "&squareheight=" + storySquareHeight + "&numgridrows=" + numGridRows + "&numgridcols=" + numGridCols + "&hardsoft=" + storyHardsoft + "&StartDate=" + storyStartDate + "&EndDate=" + storyEndDate + "&PickADate=" + storyPickADate + "&ShowPopular=" + storyShowPopular + "&PopularType=" + storyPopularType + "&viewhardsoft=n&ajaxcall=y&autorefreshcall=" + autorefresh + "&lastrefreshdate=" + storyLastRefreshDate + "&firststorypubdate=" + storyFirstStoryPubDate + "&siteid=" + storySiteId + "&tagid=" + storyTagId + "&userid=" + storyUserId + "&taggroupid=" + storyTagGroupId + "&type=" + storyType + "&linkstorytype=" + storyLinkStoryType + "&scrollcount=" + storyScrollcount + "&displayadsection=" + storyDisplayAdSection + "&categoryid=" + storyCategoryId + "&channelid=" + storyChannelId + "&ShowGridLeaderboardAds=" + storyShowGridLeaderboardAds + "&RenderUserFormat=" + isUserGrid + "&StoryView=" + storyStoryView + "&ShowNBUFrontPage=" + storyShowNBUFrontPage + "&ShowStats=" + storyShowStats + "&StoryId=" + storyStoryId + "&ShowSimpleListView=" + storyShowSimpleListView + "&ShowRolloversOverride=" + storyShowRolloversOverride + "&URLSubfolder=" + storyURLSubfolder + "&Website=" + storyWebsite + "&showipadads=N";
    return ajaxURL;
}

function StoryGetRows() {
    storyLoadInProcess = true;
    if (storyBuffer != '') {
        var gaEventType = "Click";
        AnalyticsCustomEvent('GridScroll', sitePageName + '-' + gaEventType, storyScrollcount + '');
        StoryAddToGrid(storyBuffer, storyBufferMore);
        storyBuffer = '';
        StoryGetRowsBuffer();
        storyBufferCheckCount = 0;
        storyBufferRetry = false;
    }
    else {
        storyBufferCheckCount++;
        if (storyBufferCheckCount < 10) {
            setTimeout(StoryGetRows, 1000);
        }
        else {
            storyBufferCheckCount = 0;
            if (!storyBufferRetry) {
                storyBufferRetry = true;
                StoryGetRowsBufferCall();
                setTimeout(StoryGetRows, 1000);
            }
            else {
                //give up
            }
        }
    }
}

function StoryGetRowsBuffer() {
    storyRowsInit = storyRowsTotal + 1;
    storyRowsTotal = storyRowsTotal + storyRowsToGetScroll;
    storyScrollcount = storyScrollcount + 1;
    StoryGetRowsBufferCall();
}

function StoryGetRowsBufferCall() {
    AjaxCall(BuildAjaxURL(storyRowsInit, storyRowsToGetScroll, storyCols, 'n'), StoryGetRowsBufferCallSuccess, StoryGetRowsBufferCallError);
}
function StoryGetRowsBufferCallSuccess(transport) {
    var array = ParseMessage(transport);
    storyBufferMore = array[0];
    storyBuffer = array[1];
    //Load the buffered html into a hidden div to preload the images
    var tempBuffer = document.createElement('div');
    jQuery(tempBuffer).css("visibility", "hidden");
    jQuery(tempBuffer).html(storyBuffer);
}
function StoryGetRowsBufferCallError() {
}

function StoryAddToGrid(data, more) {
    var spanid = 'scroll' + storyScrollcount;
    var ieVer = getIEVersion();
    var displayStyle = "display:block;";
    if (ieVer < 0 || ieVer > 8) {
        displayStyle = "display:none;";
    }
    jQuery('#GridMoreBarMore').css("display", "none");
    data = '<span id="' + spanid + '" class="buggyElement" style="' + displayStyle + 'background:transparent;clear:left;margin-bottom:4px;">' + data + '</span>';
    jQuery('#storyGridData').append(data);
    if (ieVer < 0 || ieVer > 8) {
        jQuery('#' + spanid).fadeIn(1000);
    }
    //Setting this div "fixes" IE7 rendering issue with AJAX updates occurring
    jQuery('#homeBottom').css("display", "none");
    jQuery('#homeBottom').css("display", "block");
    jQuery('#GridMoreBarMore').css("display", "block");
    storyLoadInProcess = false;

    //Update the "more" bar
    if (more == 'True') {
        jQuery('#GridMoreBarMore').css("display", "block");
        jQuery('#GridMoreBarNoMore').css("display", "none");
    }
    else {
        jQuery('#GridMoreBarMore').css("display", "none");
        jQuery('#GridMoreBarNoMore').css("display", "block");
    }
    jQuery('#GridMoreBarBack').css("display", "block");
}

function StoryShowNBUFrontPage() {
    storyShowNBUFrontPage = true;
    GridMainNavSelect("NBUFrontPage");
    StoryShowLatestAll();
}

function StoryShowLatest() {
    storyShowNBUFrontPage = false;
    GridMainNavSelect("Latest");
    StoryShowLatestAll();
}

function StoryShowPopular() {
    storyShowNBUFrontPage = false;
    GridMainNavSelect("Popular");
    StoryShowPopularType('Views');
}

function GridMainNavSelect(type) {
    jQuery('#LiNBUFrontPage').removeClass('active').addClass('inactive');
    jQuery('#LiLatest').removeClass('active').addClass('inactive');
    jQuery('#LiPopular').removeClass('active').addClass('inactive');
    jQuery('#NBUFrontPageSubNav').css("display", "none");
    jQuery('#LatestSubNav').css("display", "none");
    jQuery('#PopularSubNav').css("display", "none");
    jQuery("#Li" + type).removeClass('inactive').addClass('active');
    jQuery('#' + type + "SubNav").css("display", "block");
    if (type == "Latest" && storySectionId == 122) {
        jQuery("#SubNav").css("display", "none");
    }
    ResetGridNav();
}

function ResetGridNav() {
    if (jQuery('#GridTitle').html() == '') {
        jQuery('#GridTitleBar').css('display', 'none');
    }
    else {
        jQuery('#GridTitleBar').css('display', 'block');
    }
    jQuery('#pickadatediv').css("display", "none");
    jQuery('#ALatestSubNavAll').removeClass('active').addClass('inactive');
    jQuery('#ALatestSubNavToday').removeClass('active').addClass('inactive');
    jQuery('#ALatestSubNavYesterday').removeClass('active').addClass('inactive');
    jQuery('#ALatestSubNavPickADate').removeClass('active').addClass('inactive');
    jQuery('#APopularSubNavViews').removeClass('active').addClass('inactive');
    jQuery('#APopularSubNavComments').removeClass('active').addClass('inactive');
    jQuery('#APopularSubNavLikes').removeClass('active').addClass('inactive');
    document.getElementById('DivLatestSubNavPositionAndReset').style.display = "none";
    document.getElementById('DivNBUFrontPageSubNavPositionAndReset').style.display = "none";
}

function StoryShowLatestAll() {
    storyStartDate = '';
    storyEndDate = '';
    storyPickADate = '';
    storyShowPopular = 'n';
    ResetGridNav();
    jQuery('#ALatestSubNavAll').addClass('active').removeClass('inactive');
    StoryReloadGrid();
}

function StoryShowLatestToday() {
    var thisDate = new Date();
    ResetGridNav();
    jQuery('#ALatestSubNavToday').addClass('active').removeClass('inactive');
    StoryShowDate(thisDate);
}

function StoryShowLatestYesterday() {
    var thisDate = new Date();
    thisDate.setDate(thisDate.getDate() - 1);
    ResetGridNav();
    jQuery('#ALatestSubNavYesterday').addClass('active').removeClass('inactive');
    StoryShowDate(thisDate);
}

function StoryShowLatestPickADate() {
    StoryViewHide('storyCalendarContainer');
    ResetGridNav();
    jQuery('#ALatestSubNavPickADate').addClass('active').removeClass('inactive');
}

function StoryShowPopularType(type) {
    storyStartDate = '';
    storyEndDate = '';
    storyPickADate = '';
    storyShowPopular = 'y';

    if (type == 'Views') { storyPopularType = 'ViewCount'; }
    else if (type == 'Comments') { storyPopularType = 'CommentCount'; }
    else if (type == 'Likes') { storyPopularType = 'FacebookTotal'; }

    ResetGridNav();
    jQuery('#APopularSubNav' + type).addClass('active').removeClass('inactive');
    StoryReloadGrid();
}

function StoryShowDate(thisDate) {
    var y = thisDate.getFullYear();
    var m = thisDate.getMonth() + 1;
    var d = thisDate.getDate();
    storyPickADate = y + '-' + m + '-' + d;
    storyShowPopular = 'n';    
    jQuery('#pickadatediv').css("display", "inline");
    jQuery('#pickadatedate').html(GetMonthAbbreviation(m) + ' ' + d + ', ' + y);
    if (jQuery('#GridTitle').html() == '') {
        jQuery('#GridTitleSeparator').css('display', 'none');
    }
    else {
        jQuery('#GridTitleSeparator').css('display', 'inline');
    }
    jQuery('#GridTitleBar').css('display', 'block');
    StoryReloadGrid();
}

function StoryReloadGrid() {
    storyScrollcount = 0;
    storyBuffer = '';
    storyBufferCheckCount = 0;
    jQuery('#GridMoreBarMore').css("display", "none");
    jQuery('#GridMoreBarNoMore').css("display", "none");
    jQuery('#GridMoreBarBack').css("display", "none");
    jQuery('#storyGridData').html(storyLoading);
    StoryGetNewGrid(1, storyRowsToGetInitial);
}

function StoryGetNewGrid(gridRowNum, numGridRows) {
    AjaxCall(BuildAjaxURL(gridRowNum, numGridRows, storyCols, 'n'), StoryGetNewGridSuccess, StoryGetNewGridError);
}

function StoryGetNewGridSuccess(data) {
    StoryNewGrid(data);
}

function StoryGetNewGridError() {
}

function StoryNewGrid(data) {
    //Get message data at beginning
    var array = ParseMessage(data);
    storyLastRefreshDate = array[0];
    storyFirstStoryPubDate = array[1];
    storyTotalRows = array[2];
    var numNewStories = array[3];
    var more = array[4];
    data = array[5];

    storyRowsToGetInitial = storyRows;
    storyRowsTotal = storyRowsToGetInitial;
    //Update the grid
    jQuery('#storyGridData').html(data);
    //Update the "more" bar
    if (more == 'True') {
        jQuery('#GridMoreBarMore').css("display", "block");
        jQuery('#GridMoreBarNoMore').css("display", "none");
    }
    else {
        jQuery('#GridMoreBarMore').css("display", "none");
        jQuery('#GridMoreBarNoMore').css("display", "block");
    }
    jQuery('#GridMoreBarBack').css("display", "block");
    //Reset the More bar
    StoryGridMore(0);
    //Tell the user the grid was refreshed
    jQuery('#GridMoreStoriesTop').css("display", "none");
    jQuery('#GridMoreStoriesTopNoClick').css("display", "inline");
    jQuery('#GridMoreStoriesTopNoClick').html('Grid refreshed at ' + GetCurrentTime());
    //Refill the buffer
    StoryGetRowsBuffer();
    //Fill in some more rows
    if (storyClickToScroll) {
        //Simulate two clicks of the "get more stories" button to anynchronously add more rows to the grid (home page only)
        StoryGetRows(); 
        StoryGetRows();
    }
    else {
        //Simulate a scroll which triggers more rows to be added to the grid (home and story page)
        StoryGetRows();
    }
    //Start autorefreshing
    StoryCancelAutorefresh();
    StoryStartAutorefresh();
}

function StoryStartAutorefresh() {
    if (storyAutofreshTimerId == null && storyAutorefreshTime > 0) {
        storyAutofreshTimerId = setInterval(StoryAutorefresh, storyAutorefreshTime);
    }
}

function StoryCancelAutorefresh() {
    clearInterval(storyAutofreshTimerId);
    storyAutofreshTimerId = null;
}

function StoryAutorefresh() {
    AjaxCall(BuildAjaxURL(1, storyRowsToGetInitial, storyCols, 'y'), StoryAutorefreshSuccess, StoryAutorefreshError);
}
function StoryAutorefreshSuccess(transport) {
    StoryCheckAutorefresh(transport);
}
function StoryAutorefreshError() {
}

function StoryCheckAutorefresh(data) {
    var array = ParseMessage(data);
    var numNewStories = array[0];
    //Check to see if the user is scrolled to the top, if so just show them otherwise display message
    if (numNewStories > 0) {
        if (StoryScrolledToTop()) {
            //At the top so just give them the stories (reload the grid)
            StoryReloadGrid();
            return;
        }
    }
    //Turn off autorefresh if more than 3 stories queued up
    if (numNewStories > 3) {
        StoryCancelAutorefresh();
    }
    StoryGridMore(numNewStories);
}

function StoryScrolledToTop() {
    var scrollTop;
    if (storyClickToScroll) {
        scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;  //Scroll position of entire window
        if (scrollTop == 0) {
            return true;
        }
        return false;
    }
    else {
        scrollTop = jQuery('#storyGrid').scrollTop();  //Scroll position from top of data to top of viewport
        if (scrollTop == 0) {
            return true;
        }
        return false;
    }
}

function StoryCheckAutorefreshScroll() {
    //Check to see if the user scrolled to the top.  If so, call autorefresh to see if there are more stories
    if (StoryScrolledToTop()) {
        //Cancel and restart autorefresh timer
        StoryCancelAutorefresh();
        StoryStartAutorefresh();
        StoryAutorefresh();
    }
}

function StoryGridMore(numNewStories) {
    if (numNewStories == 0) {
        jQuery('#GridMoreStoriesTop').html('');
        jQuery('#GridMoreStoriesTop').css("display", "none");
        jQuery('#GridMoreStoriesTopNoClick').css("display", "none");
    }
    else if (numNewStories == 1) {
        jQuery('#GridMoreStoriesTop').html('1 new story');
        jQuery('#GridMoreStoriesTop').css("display", "inline");
        jQuery('#GridMoreStoriesTopNoClick').css("display", "none");
    }
    else if (numNewStories == 2 || numNewStories == 3) {
        jQuery('#GridMoreStoriesTop').html(numNewStories + ' new stories');
        jQuery('#GridMoreStoriesTop').css("display", "inline");
        jQuery('#GridMoreStoriesTopNoClick').css("display", "none");
    }
    else {
        jQuery('#GridMoreStoriesTop').html('3+ new stories');
        jQuery('#GridMoreStoriesTop').css("display", "inline");
        jQuery('#GridMoreStoriesTopNoClick').css("display", "none");
    }

    //Update the title bar text
    var title = jQuery('#GridMoreStoriesTop').html();
    if (title == '') {
        document.title = storyTitle;
    }
    else {
        document.title = title + ' | ' + storyTitle;
    }
}

function StoryViewHide(id) {
    var d = document.getElementById(id);
    if (d.style.display == 'none') {
        d.style.display = 'block';
    }
    else {
        d.style.display = 'none';
    }
}

function GetCalendarDate(calendar) {
    StoryViewHide('storyCalendarContainer');
    StoryShowDate(calendar.date);
}

function ChangeHardSoftSliderValue(v, target) {
    //Put value for slider in hidden field
    var obj = document.getElementById(target);
    obj.value = v;
    //Adjust images
    var vis1, vis2, vis3, vis4, vis5;
    if (v == 1) {
        vis5 = "hidden";
        vis4 = "hidden";
        vis3 = "hidden";
        vis2 = "hidden";
        vis1 = "visible";
    }
    else if (v == 2) {
        vis5 = "hidden";
        vis4 = "hidden";
        vis3 = "hidden";
        vis2 = "visible";
        vis1 = "visible";
    }
    else if (v == 3) {
        vis5 = "hidden";
        vis4 = "hidden";
        vis3 = "visible";
        vis2 = "visible";
        vis1 = "visible";
    }
    else if (v == 4) {
        vis5 = "hidden";
        vis4 = "visible";
        vis3 = "visible";
        vis2 = "visible";
        vis1 = "visible";
    }
    else if (v == 5) {
        vis5 = "visible";
        vis4 = "visible";
        vis3 = "visible";
        vis2 = "visible";
        vis1 = "visible";
    }
    else if (v == 6) {
        vis5 = "visible";
        vis4 = "visible";
        vis3 = "visible";
        vis2 = "visible";
        vis1 = "hidden";
    }
    else if (v == 7) {
        vis5 = "visible";
        vis4 = "visible";
        vis3 = "visible";
        vis2 = "hidden";
        vis1 = "hidden";
    }
    else if (v == 8) {
        vis5 = "visible";
        vis4 = "visible";
        vis3 = "hidden";
        vis2 = "hidden";
        vis1 = "hidden";
    }
    else if (v == 9) {
        vis5 = "visible";
        vis4 = "hidden";
        vis3 = "hidden";
        vis2 = "hidden";
        vis1 = "hidden";
    }
    jQuery('#ImageHardSoft5').css("visibility", vis5);
    jQuery('#ImageHardSoft4').css("visibility", vis4);
    jQuery('#ImageHardSoft3').css("visibility", vis3);
    jQuery('#ImageHardSoft2').css("visibility", vis2);
    jQuery('#ImageHardSoft1').css("visibility", vis1);

    //Adjust the text
    if (v < 5) {
        jQuery('#HardSoftLeft').html('More Serious');
        jQuery('#HardSoftRight').html('Less Serious');
    }
    else if (v == 5) {
        jQuery('#HardSoftLeft').html('Less Gossip');
        jQuery('#HardSoftRight').html('Less Serious');
    }
    else {
        jQuery('#HardSoftLeft').html('Less Gossip');
        jQuery('#HardSoftRight').html('More Gossip');
    }
}

function ConvertHardSoftValueToSliderValue(value) {
    return (((value * -1) + 9) / 8);
}

function ConvertSliderValueToHardSoftValue(value) {
    return (((value * 8) - 9) * -1);
}

function HardSoftLeft(field) {
    var hardsoft = document.getElementById(field).value;
    if (hardsoft != 9) {
        hardsoft++;
        ChangeHardSoftSliderValue(hardsoft, field);
        sliderControl.setValue(ConvertHardSoftValueToSliderValue(hardsoft), true);
    }
}

function HardSoftRight(field) {
    var hardsoft = document.getElementById(field).value;
    if (hardsoft != 1) {
        hardsoft--;
        ChangeHardSoftSliderValue(hardsoft, field);
        sliderControl.setValue(ConvertHardSoftValueToSliderValue(hardsoft), true);
    }
}

function HardSoftReset(field) {
    ChangeHardSoftSliderValue(5, field);
    sliderControl.setValue(ConvertHardSoftValueToSliderValue(5), true);
}

function ShowRollover(storyid) {
    //Don't start doing rollovers until the page is loaded
    if (!loaded) {
        return;
    }

    //Check to see if the ShowRollovers variable is defined (if not then no rollovers)
    if (typeof ShowRollovers == "undefined") {
        return false;
    }

    //Check to see if user has rollovers turned off
    if (ShowRollovers == false) {
        //ShowRollovers variable is set in ShowRollover.ascx
        return false;
    }
    showingRollover = true;
    //Do the rollover
    var pageSize = getPageSize();
    var sX = window.pageXOffset || document.documentElement.scrollLeft || 0;
    var sY = window.pageYOffset || document.documentElement.scrollTop || 0;
    var rX;
    var rY;

    //Compute position for left coordinate of rollover - centered it on the page
    if (pageSize[2] < RolloverOverallWidth) {
        rX = sX;
    }
    else {
        rX = sX + (pageSize[2] - RolloverOverallWidth) / 2;
    }
    //Compute position for top coordinate of rollover - goal is vertically centered on the viewport: 
    // scroll location + (window height - rollover size) / 2
    if (pageSize[3] < RolloverHeight) {
        rY = sY;
    }
    else {
        rY = sY + (pageSize[3] - RolloverHeight) / 2;
    }
    rolloverTimeoutId = setTimeout("PopRollover('" + storyid + "','" + rX + "','" + rY + "')", 400);
    return true;
}

////// Functions for legacy scroll /////////

function StoryHandleGridScroll(adSection) {
    var scrollPos = jQuery('#storyGrid').scrollTop();  //Scroll position from top of data to top of viewport
    var viewportHeight = jQuery('#storyGrid').height();  //Height of viewport
    var bottom = jQuery('#storyGridBottom').position().top;   //Distance from top of viewport to bottom of data
    if (scrollPos == 0) {
        StoryCheckAutorefreshScroll();
    }
    else {
        //If we're within 100 pixels of the bottom, then load some more
        if ((bottom - viewportHeight) < 100) {
            if (!storyLoadInProcess) {
                StoryGetRows();
                refreshAd("grid_728x90_middle", 728, 90, adSection);
            }
        }
    }
}
/***** END - code formerly in grid.js *****/
/***** BEGIN - code formerly in calendar.js *****/
function Calendar(params) {
    var months = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
    var days = new Array("S", "M", "T", "W", "T", "F", "S");
    var daysInMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    var dateObj = new Date();

    window.calObj = this;
    this.outputObj = params["outputObj"];
    this.callFunction = params["clickListener"];
    this.date = dateObj;

    function isLeapYear() {
        var year = dateObj.getFullYear();
        if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0))
            return 1;
        else
            return 0;
    }

    function getFirstDayOfMonth() {
        var td = new Date();
        td.setTime(dateObj.getTime());
        td.setDate(1);
        return td.getDay();
    }

    function getNumRows() {
        var month = dateObj.getMonth();
        var dow = getFirstDayOfMonth();
        var dim = daysInMonth[month];
        if (isLeapYear() && month == 1)
            dim++;
        var minweeks = Math.ceil(dim / 7);
        var extras = dim % 7;
        if (extras + dow > 7)
            return minweeks + 1;
        else
            return minweeks;
    }

    this.fireEvent = function (month, day, year) {
        this.date.setDate(day);
        this.date.setMonth(month);
        this.date.setFullYear(year);
        this.callFunction(window.calObj);
        var theMonth = month + 1;
    }

    this.getPrevYear = function () {
        var month = dateObj.getMonth() - 1;
        if (month < 0)
            return dateObj.getFullYear() - 1;
        else
            return dateObj.getFullYear();
    }

    this.getPrevMonth = function () {
        var month = dateObj.getMonth() - 1;
        if (month < 0)
            return 11;
        else
            return month;
    }

    this.getNextYear = function () {
        var month = dateObj.getMonth() + 1;
        if (month > 11)
            return dateObj.getFullYear() + 1;
        else
            return dateObj.getFullYear();
    }

    this.getNextMonth = function () {
        var month = dateObj.getMonth() + 1;
        if (month > 11)
            return 0;
        else
            return month;
    }

    this.setDate = function (y, m, d) {
        dateObj.setFullYear(y, m - 1, d);
    }

    this.showPrevMonth = calendarShowPrevMonth;
    this.showNextMonth = calendarShowNextMonth;

    this.render = function () {
        var todayObj = new Date();
        var thisDay = todayObj.getDate();
        var thisMonth = todayObj.getMonth();
        var thisYear = todayObj.getFullYear();
        var firstDayOfMonth = getFirstDayOfMonth();
        var curMonth = dateObj.getMonth();
        var curDay = dateObj.getDate();
        var curYear = dateObj.getFullYear();
        var prevMonth = this.getPrevMonth();
        var prevYear = curYear;
        if (prevMonth == 11)
            prevYear = curYear - 1;
        var nextMonth = this.getNextMonth();
        var nextYear = curYear;
        if (nextMonth == 0)
            nextYear = curYear + 1;
        var prevMonthDay = daysInMonth[prevMonth] - firstDayOfMonth + 1;
        var nextMonthDay = 1;
        var curMonthDay = 1;
        var dim = daysInMonth[curMonth];
        if (isLeapYear() && curMonth == 1)
            dim++;
        var result;

        result = '<div class="calendar">';
        result += '<table cellpadding="0" border="0" cellspacing="0">';
        result += '<tr class="today">';
        result += '<td colspan="4" align="left">';
        params = (thisMonth) + ',' + thisDay + ',' + thisYear;
        result += '<a href="javascript:calendarGoToDate(' + params + ');" onmouseover="window.status=\'\';return true;">TODAY</a>';
        result += '</td>';
        result += '<td colspan="3" align="right">';
        result += '<a href="javascript:StoryViewHide(\'' + this.outputObj + '\')">close<img src="http://img2-cdn.newser.com/images/interrupter-close-button2.png" width="11" height="11" alt="close" /></a>';
        result += '</td>';
        result += '</tr>';
        result += '<tr>';
        result += '<td class="button">';
        result += '<a href="#" class="button" onclick="calendarShowPrevMonth();return false;">&laquo;</a>';
        result += '</td>';
        result += '<td colspan="5" class="header">';
        result += months[curMonth];
        result += '&nbsp;';
        result += curYear;
        result += '</td>';
        result += '<td class="button">';
        result += '<a href="#" class="button" onclick="calendarShowNextMonth();return false;">&raquo;</a>';
        result += '</td>';
        result += '</tr>';
        result += '<tr>';
        for (var i = 0; i < 7; i++) {
            result += '<td class="days">';
            result += days[i];
            result += '</td>';
        }
        result += '</tr>';
        var rows = getNumRows();
        for (var i = 0; i < rows; i++) {
            result += '<tr>';
            for (var j = 0; j < 7; j++) {
                if (prevMonthDay <= daysInMonth[prevMonth]) {
                    result += '<td class="outside">';
                    params = (prevMonth) + ',' + prevMonthDay + ',' + prevYear;
                    result += '<a href="javascript:window.calObj.fireEvent(' + params + ');" onmouseover="window.status=\'\';return true;">';
                    result += prevMonthDay++;
                    result += '</a>';
                    result += '</td>';
                }
                else if (curMonthDay <= dim) {
                    if (curMonthDay == thisDay && thisMonth == curMonth && thisYear == curYear)
                        result += '<td class="today">';
                    else
                        result += '<td class="day">';
                    params = (curMonth) + ',' + curMonthDay + ',' + curYear;
                    result += '<a href="javascript:window.calObj.fireEvent(' + params + ');" onmouseover="window.status=\'\';return true;">';
                    result += curMonthDay++;
                    result += '</a>';
                    result += '</td>';
                }
                else {
                    result += '<td class="outside">';
                    params = (nextMonth) + ',' + nextMonthDay + ',' + nextYear;
                    result += '<a href="javascript:window.calObj.fireEvent(' + params + ');" onmouseover="window.status=\'\';return true;">';
                    result += nextMonthDay++;
                    result += '</a>';
                    result += '</td>';
                }
            }
            result += '</tr>';
        }
        result += '</table>';
        result += '</div>';
        jQuery('#' + this.outputObj).html(result);
    }
}

function calendarGoToDate(month, day, year) {
    window.calObj.setDate(year, month, day);
    window.calObj.fireEvent(month, day, year);
    window.calObj.render();
}

function calendarShowNextMonth() {
    var month = window.calObj.getNextMonth();
    var year = window.calObj.getNextYear();
    window.calObj.setDate(year, month + 1, 1);
    window.calObj.render();
}

function calendarShowPrevMonth() {
    var month = window.calObj.getPrevMonth();
    var year = window.calObj.getPrevYear();
    window.calObj.setDate(year, month + 1, 1);
    window.calObj.render();
}
/***** END - code formerly in calendar.js *****/
/***** BEGIN - code formerly in dynifs.js *****/
var DYNIFS = {
    iframes: {},
    oldresize: null,
    ready: false,
    dim: [-1, -1],
    timerID: 0,
    getDim: function (d) {
        var w = 200, h = 200, scr_h, off_h;
        if (d.height) { return [d.width, d.height]; }
        with (d.body) {
            if (scrollHeight) { h = scr_h = scrollHeight; w = scrollWidth; }
            if (offsetHeight) { h = off_h = offsetHeight; w = offsetWidth; }
            if (scr_h && off_h) h = Math.max(scr_h, off_h);
        }
        return [w, h];
    },
    onresize: function () {
        if (typeof this.oldresize == 'function') { this.oldresize(); }
        var dim = this.getDim(document);
        if (this.dim[0] == dim[0] && this.dim[1] == dim[1]) return;
        if (this.timerID) return;
        this.timerID = setTimeout('DYNIFS.deferred_resize();', 10);
    },
    deferred_resize: function () {
        for (var id in this.iframes) this.resize(id);
        this.dim = this.getDim(document);
        this.timerID = 0;
    },
    resize: function (id) {
        if (!window.frames || !window.frames[id] || !document.getElementById || !document.body)
            return;
        var iframe = window.frames[id];
        var div = document.getElementById(id);
        if (!div) return;
        if (!this.iframes[id]) {
            this.iframes[id] = true;
        }
        if (!this.ready) {
            this.ready = true;
            this.oldresize = window.onresize;
            window.onresize = new Function('DYNIFS.onresize();');
        }
        if (document.all) div.style.height = '0px';
        var dim = this.getDim(iframe.document);
        div.style.height = (dim[1]) + 'px';
    }
};
/***** END - code formerly in dynifs.js *****/
function expandCollapseStoryListText(storyid) {
    if (jQuery("#storyListExpand" + storyid).hasClass("collapsed")) {
        jQuery("#storyListExpand" + storyid).fadeIn(500);
        jQuery("#storyListExpand" + storyid).removeClass("collapsed").addClass("xpanded");
        jQuery("#storyListTextButton" + storyid).attr("src", jQuery("#storyListTextButton" + storyid).attr("src").replace("Up", "Down"));
    }
    else {
        jQuery("#storyListExpand" + storyid).removeClass("xpanded").addClass("collapsed");
        jQuery("#storyListTextButton" + storyid).attr("src", jQuery("#storyListTextButton" + storyid).attr("src").replace("Down", "Up"));
        jQuery("#storyListExpand" + storyid).fadeOut(50);
    }
}

function doPopup(source, width, height, xOffset, yOffset, dynamicResize, scrollTop) {
    jQuery('#div_iframe_overlay').unbind("mouseout mouseleave");
    //Make sure the iframe exists before we continue. 
    if (jQuery('#div_iframe_overlay').length <= 0) {
        return;
    }

    //Scroll the parent window to the top
    if (scrollTop == true) {
        scroll(0, 0);
    }

    //Compute offsets if requested -- a value of -1 signals this routine to center it
    if (xOffset == -1 || yOffset == -1) {
        var size = getPageSize();
        if (xOffset == -1) {
            if (width > size[2]) {
                xOffset = 0;
            }
            else {
                xOffset = (size[2] - width) / 2;
            }
        }
        if (yOffset == -1) {
            if (height > size[3]) {
                yOffset = 0;
            }
            else {
                yOffset = (size[3] - height) / 2;
            }
        }
    }

    var el = jQuery('#div_iframe_overlay');

    if (jQuery(el).length > 0) {
        ShowLightBox();
        //create the iframe and add it
        //Clear rollover
        jQuery(el).html("");
        var e = document.createElement("iframe");

        //Have the window slide down the page to account for the window 
        //being vertically scrolled
        var sY = window.pageYOffset || document.documentElement.scrollTop || 0;
        yOffset += sY;        

        var chk = '';
        jQuery(el).css('left', xOffset + 'px');
        jQuery(el).css('top', yOffset + 'px');
        jQuery(el).css('display', 'block');
        jQuery(el).css('visibility', 'visible');
        
        e.src = "/" + source;
        e.id = "iframe_overlay";
        e.name = "iframe_overlay";
        e.frameBorder = 0;
        e.marginwidth = 0;
        e.marginheight = 0;
        e.width = width;
        e.height = height;
        e.async = true;
        e.scrolling = "no";
        if (dynamicResize == true) {
            e.onLoad="DYNIFS.resize(\'iframe_overlay\')";
        }
        document.getElementById("div_iframe_overlay").appendChild(e);
    }
    return false;
}

function HoverScreen(storyId) {    
    if (!jQuery('#screen' + storyId).hasClass('hoveryes')) {
        jQuery('#screen' + storyId).removeClass('hoverno').addClass('hoveryes');
    }
    if (typeof (jQuery('#hover' + storyId)) != undefined && jQuery('#hover' + storyId) != null) {
        if (!jQuery('#hover' + storyId).hasClass('HoverBorderYes')) {
            jQuery('#hover' + storyId).removeClass('HoverBorderNo').addClass('HoverBorderYes');
        }
    }
    if (jQuery('#YouAreHereIcon' + storyId).length > 0) {
        jQuery('#YouAreHereIcon' + storyId).css('display','none');
    }
}

function UnhoverScreen(storyId) {
    if (!jQuery('#screen' + storyId).hasClass('hoverno')) {
        jQuery('#screen' + storyId).removeClass('hoveryes').addClass('hoverno');
    }
    if (typeof (jQuery('#hover' + storyId)) != undefined && jQuery('#hover' + storyId) != null) {
        if (!jQuery('#hover' + storyId).hasClass('HoverBorderNo')) {
            jQuery('#hover' + storyId).removeClass('HoverBorderYes').addClass('HoverBorderNo');
        }
    }
    if (jQuery('#YouAreHereIcon' + storyId).length > 0) {
        jQuery('#YouAreHereIcon' + storyId).css('display', 'block');
    }
}

function storyParagraphLinks() {
    jQuery('#storyParagraphContainer a').each(function (idx) {
        var parm;
        if (this.href.indexOf('newser.com') < 0) {
            this.target = "_blank";
            parm = 'OutboundTraffic';
        }
        else {
            parm = 'CrossLink';
        }
        jQuery(this).bind('click', function () { AnalyticsCustomEvent(parm, "sum-" + this.href); });
    });
}

/*New Carousel Methods*/
var actions = 0;
function carousel_itemLoadCallback(carousel, state) {
    // Check if the requested items already exist

    if (carousel.has(carousel.first, carousel.last)) {
        return;
    }

    jQuery.get(
            CarouselAsyncLoc,
            {
                gridrownum: Math.floor((carousel.last - 1) / 3 + 1)
            },
            function (xml) {
                carousel_itemAddCallback(carousel, carousel.first, carousel.last, xml);
            },
            'xml'
        );
};

function carousel_initCallback(carousel) {
    carousel.add(1, carousel_getItemHTML(CarouselFirstItemStoryId, CarouselFirstItemImageURL, CarouselFirstItemURL, "false"));
    addedItems[0] = CarouselFirstItemURL;
}
var addedItems = Array();
function carousel_itemAddCallback(carousel, first, last, xml) {
    // Set the size of the carousel
    //carousel.size((parseInt(jQuery('total', xml).text())-1)*3);
    var found = 0;
    jQuery('item', xml).each(function (i) {
        var storyId = parseInt(jQuery(this).find("story_id").text());
        var linkStr = jQuery(this).find("link").text();
        var imageStr = jQuery(this).find("image").text();
        var targetStr = jQuery(this).find("target_blank").text();
        for (addedIndex = 0; addedIndex < addedItems.length; addedIndex++) {
            if (addedItems[addedIndex] == linkStr) { found = 1; carousel.remove(last - 1); }
        }
        carousel.add(first + i - found, carousel_getItemHTML(storyId, imageStr, linkStr, targetStr));
        addedItems[first + i] = linkStr;

    });
};

/**
* Item html creation helper.
*/
function carousel_getItemHTML(storyId, imageUrl, linkUrl, target) {
    var targetStr = "_self";
    if (target == "true") {
        targetStr = "_blank";
    }
    return '<a onclick="AnalyticsCustomEvent(\'StoryClick\',\'TopCarouselAjax\',\'' + storyId + '\'); CheckForCarouselSameLink(document.location.href,\'' + linkUrl + '\');" class="carouselLink" target="' + targetStr + '" href="' + linkUrl + '"><img src="' + imageUrl + '" width="120" height="80" alt="" /></a>';
};
function CheckForCarouselSameLink(Current, Target) {
    if (Current.indexOf(Target) >= 0) {
        AnalyticsCustomEvent("StoryCarouselClick", "Same");
    }
    else {
        AnalyticsCustomEvent("StoryCarouselClick", "Different");
    }
}
function StoryCarouselNext() {
    jQuery('#StoryEmbed').css("display", "none");
    AnalyticsCustomEvent("StoryClick", "TopCarouselAjax", "NextButton");
}
function CheckAdForRefresh() {
    //Note: this routine gets called initially once on load before the user clicks the scroll button.  Actions will be 0.
    actions = actions + 1;
    if (actions%3==2) {
        jQuery("#carouselImage img").attr("src", "http://img1-cdn.newser.com/images/spacer.gif").attr("class","jcarousel-item");
        jQuery("#carouselImage").attr("href", "javascript:void(0);");
        jQuery("#carouselImage").css("display", "block");
        jQuery("#StoryCarousel .jcarousel-clip-horizontal").css("display", "none");
        jQuery("#StoryCarousel jcarousel-list").css("display", "none");
        refreshAd("story_728x90_top", 728, 90, storyAdSec);
        refreshAd("story_300x250_right_top", 300, 250, storyAdSec);
    }
}
function HideSpinner(){
    if (actions%3==2) {
        wait(2000);
        jQuery("#carouselImage").css("display", "none");
        jQuery("#StoryCarousel .jcarousel-clip-horizontal").css("display", "block");
        jQuery("#StoryCarousel jcarousel-list").css("display", "block"); 
    }
}

function wait(milsecs) {
    var to_time = new Date().getTime() + milsecs;
    while (new Date().getTime() < to_time) { } 
}
function initCarousel() {
    jQuery("#carouselImage").css("display", "none");
    jQuery("#backToGrid").click(function () { AnalyticsCustomEvent("StoryClick", "TopCarouselAjax", "BackToGrid"); document.location.href = CarouselLargerGridURL; });
    initCarouselVariables();
    jQuery('#StoryCarousel').jcarousel({
        // Uncomment the following option if you want items
        // which are outside the visible range to be removed
        // from the DOM.
        // Useful for carousels with MANY items.

        //itemVisibleOutCallback: {onAfterAnimation: function(carousel, item, i, state, evt) { carousel.remove(i); }},
        itemLoadCallback: carousel_itemLoadCallback,
        initCallback: carousel_initCallback,
        scroll: 1,
        //buttonNextCallback: button_NextCallback,  Removed because they were not working properly 9/28/12 MTK
        //buttonPrevCallback: button_PrevCallback,
        itemVisibleInCallback: {
                                onBeforeAnimation:CheckAdForRefresh,
                                onAfterAnimation: HideSpinner
                                }
    });
}

/*End New Carousel Methods*/
/*************************LARGE GALLERY********************************/
var selectedMediaId;
var imageIDs = Array();
var mediaCount = Array();
var playing = false;
var timeout;
var myCarousel;

var largeMediaClicks = 0;
function stopError(errMsg, errScript, errLine) {
    return false;
}
function sizeThis() {
    if (inPopup) {
        var imageHeight = jQuery('#mainImage').clientHeight;
        var addHeight;
        if (imageHeight > 400) {
            addHeight = imageHeight - 400;
        }
        else {
            addHeight = 0;
        }
        parent.jQuery('#iframe_overlay').height(590 + addHeight);
        parent.DYNIFS.resize('iframe_overlay');
    }
}
function initCarouselGallery() {
    jQuery('#ImageCarousel').jcarousel({
        horizontal: true,
        scroll: 5,
        initCallback: initjCarouselGallery,
        buttonPrevHTML: '<div class="jcarousel-prev jcarousel-prev-vertical jcarousel-prev-disabled jcarousel-prev-disabled-vertical" style="display: block;" disabled="true"></div>',
        buttonNextHTML: '<div class="jcarousel-next jcarousel-next-vertical jcarousel-next-disabled jcarousel-next-disabled-vertical" style="display: block;" disabled="true"></div>'
    });
}
function initjCarouselGallery(c,s) {
    myCarousel = c;
}
function initMediaArray() {
    if (hide) {
        top.hideOverlay('div_iframe_overlay', true);
    }
    var listElements = Array();
    var anchors = Array();

    var i = 0;
    jQuery('#ImageCarousel li').each(function (idx, elm) {
        if (this.id != 'liFooter') {
            anchors[i] = this.childNodes[0].childNodes[0].childNodes[0];
            imageIDs[i] = anchors[i].id;
            mediaCount[imageIDs[i]] = i;
            i++;
        }
    });

    selectedMediaId = imageIDs[selectedMediaIndex];
}
function selectMedia(mediaId, continuePlaying) {
    if (!continuePlaying && playing) {
        goPlayPause();
    }
    if (mediaId != selectedMediaId) {
        //make the selected item normal
        jQuery('#thumbContainer' + selectedMediaId).removeClass('selectedThumbContainer').addClass('thumbContainer');
        jQuery('#Caption' + selectedMediaId).css('display','none');
    }
    jQuery('#thumbContainer' + mediaId).removeClass('thumbContainer').addClass('selectedThumbContainer');
    jQuery('#Caption' + mediaId).css('display','block');
    jQuery('#mainImage').attr('src', srcURLs[mediaId]);
    selectedMediaId = mediaId;
    if (imageIDs.length > 1) {
        jQuery('#iscrollstatus').html((mediaCount[mediaId] + 1) + ' of ' + totalImages);
    }
    if (jQuery('#loadingPanel').css('display') == 'block') {
        jQuery('#loadingPanel').css('display','none');
        jQuery('#mainPanel').css('display','block');
    }

    if (jQuery('#imageCaptionContainer').clientHeight > jQuery('#LargeImageResize').clientHeight - 20) {
        jQuery('#LargeImageResize').css('minHeight', jQuery('#imageCaptionContainer').clientHeight + 'px');
    } else {
        //jQuery('#LargeImageResize').css('minHeight','400px');
    }
    refreshAd("gallery_728x90_bottom", 728, 90, top.storyAdSec);
    AnalyticsCustomEvent('MediaAd', 'gallery_728x90_bottom'); //Track in google analytics
    StoryImageGalleryMore('C');  //Close the story text (if present)

    if (galleryFirstTime) {
        galleryFirstTime = false;
    }
    else {
        refreshAd("story_300x250_right_top", 300, 250, top.storyAdSec);  //Refresh the ad in the right rail of the story page
    }

    sizeThis();
    return false;
}
function goNextImage(continuePlaying) {
    var indexer;
    if (mediaCount[selectedMediaId] == (imageIDs.length - 1)) {
        indexer = 0;
        myCarousel.scroll(indexer + 1, true);
    }
    else {
        indexer = mediaCount[selectedMediaId] + 1;
        if (indexer % 5 == 0) {
            myCarousel.scroll(indexer + 1, true);
        }
    }
    selectMedia(imageIDs[indexer], continuePlaying);
    return false;
}
function goPrevImage() {
    var indexer;
    if (mediaCount[selectedMediaId] == 0) {
        indexer = imageIDs.length - 1;
        myCarousel.scroll(indexer + 1, true);
    }
    else {
        indexer = mediaCount[selectedMediaId] - 1;
        if (indexer % 5 == 4) {
            myCarousel.scroll(indexer + 1 - 4, true);
        }
    }
    selectMedia(imageIDs[indexer], false);
    return false;
}
function goPlayPause() {
    if (playing) {
        playing = false;
        pauseLarge();
        jQuery('#slideshow').html('slideshow');
    }
    else {
        playing = true;
        playLarge();
        jQuery('#slideshow').html('pause');
    }
    return false;
}
function pauseLarge() {
    clearTimeout(timeout);
}
function playLarge() {
    if (!playing) {
        pause();
    }
    else {
        goNextImage(true);
        timeout = setTimeout(playLarge, 3000);
    }
}
function checkLoadLargeMediaAd() {
    if (largeMediaClicks == numLargeClicksB4Ad) {
        largeMediaClicks = 0;
        showAd();
        return true;
    }
    else {
        largeMediaClicks++;
        hideAd();
        return false;
    }
}
function showAd() {
    jQuery('#LargeImageResize').css('display','none');
    jQuery('#LargeImageAd').css('display','block');
    AnalyticsCustomEvent('MediaAd', adName);
    jQuery('#adframe_largeImageInterstitial').attr('src', interstitialSrc);
    jQuery('#AdvertisementCaption').css('display','block');
    jQuery('#CaptionsHider').css('display','none');
    //jQuery('#StoryTitleHolder').css('visibility', 'hidden');
    //resize the iframe
    parent.jQuery('#iframe_overlay').height(570);
    parent.DYNIFS.resize('iframe_overlay');
}
function hideAd() {
    jQuery('#LargeImageResize').css('display','block');
    jQuery('#LargeImageAd').css('display','none');
    jQuery('#adframe_largeImageInterstitial').attr('src','');
    jQuery('#AdvertisementCaption').css('display','none');
    jQuery('#CaptionsHider').css('display','block');
    if (inPopup) {
        //jQuery('#StoryTitleHolder').css('visibility', 'visible');
    }
}
function initVideoArray() {
    selectedMediaId = videoIDs[selectedMediaIndex];
    selectVideo(selectedMediaId);
}
function selectVideo(mediaId) {
    if (mediaId != selectedMediaId) {
        //make the selected item hide
        jQuery('#Caption' + selectedMediaId).css('display','none');
        jQuery('#VideoPlayerHolder').html('');
    }
    jQuery('#Caption' + mediaId).css('display', 'block');
    if (vids[mediaId].indexOf("src=") == 0) {
        var content = "<iframe frameborder=\"0\" scrolling=\"no\" height=\"350\" width=\"600\" src=\"/videoframe.aspx?url=" +escape(vids[mediaId].substring(4)) +"\"></iframe>";
        jQuery('#VideoPlayerHolder').html(content);
    }
    else {
        jQuery('#VideoPlayerHolder').html(vids[mediaId]);
    }
    

    selectedMediaId = mediaId;
    if (videoIDs.length > 1) {
        jQuery('#iscrollstatus').html('(' + (mediaCount[mediaId] + 1) + ' of ' + totalVideos + ')');
    }
    if (jQuery('#loadingPanel').css('display') == "block") {
        jQuery('#loadingPanel').css('display','none');
        jQuery('#mainPanel').css('display','block');
    }
    refreshAd("gallery_728x90_bottom", 728, 90, top.storyAdSec);
    AnalyticsCustomEvent('MediaAd', 'gallery_728x90_bottom'); //Track in google analytics

    if (galleryFirstTime) {
        galleryFirstTime = false;
    }
    else {
        refreshAd("story_300x250_right_top", 300, 250, top.storyAdSec);  //Refresh the ad in the right rail of the story page
    }
    
    sizeThisVideo(jQuery('#VideoPlayerHolder').clientHeight);
    return false;
}
function closeVideoPlayer() {
    jQuery('#VideoPlayerHolder').html('');
    return top.hideOverlay('div_iframe_overlay', true);
}
function goNextVideo() {
    videoClickEventRecorded = false;
    var indexer;
    if (mediaCount[selectedMediaId] == (videoIDs.length - 1)) {
        indexer = 0;
    }
    else {
        indexer = mediaCount[selectedMediaId] + 1
    }
    selectVideo(videoIDs[indexer]);
    return false;
}
function goPrevVideo() {
    videoClickEventRecorded = false;
    var indexer;
    if (mediaCount[selectedMediaId] == 0) {
        indexer = videoIDs.length - 1;
    }
    else {
        indexer = mediaCount[selectedMediaId] - 1;
    }
    selectVideo(videoIDs[indexer]);
    return false;
}

function sizeThisVideo(videoHeight) {
    var addHeight;
    if (videoHeight > 400) {
        addHeight = videoHeight - 400;
    }
    else {
        addHeight = 0;
    }

    parent.jQuery('#iframe_overlay').height(590 + addHeight);
    parent.DYNIFS.resize('iframe_overlay');
}
/*************************LARGE GALLERY END********************************/
function AnalyticsCustomEvent(prop1, prop2, prop3, prop4) {
    if (typeof (_gat) == "object") {
        _gaq.push(['eventTracker._trackEvent', prop1, prop2, prop3, prop4]);
    } //4th parameter must be an integer
}
function VideoAnalyticsCustomEvent(videoType) {
    //this is called from embed code in the videotemplate table
    if (!videoClickEventRecorded) {
        AnalyticsCustomEvent("StoryClick", "videoaction", videoType);
        videoClickEventRecorded = true;
    }
}
function closePromotion(promotionId) {
    AjaxCallSync("/utility.aspx?function=lastpromotionclosed&lastpromotionclosed=" + promotionId, closePromotionSuccess);
    return false;
}
function closePromotionSuccess() {
    StoryReloadGrid('n');
}
/*******************Menu***********************/
function NavMouseOver(obj, subMenu) {
    obj.src = obj.src.replace("out", "over");
    obj.className = "NavMousedOver";
    if (obj.src.indexOf("sel") > 0) {
        obj.className = "NavMousedOut";
    }
}
function NavMouseOut(obj, subMenu) {
    //Check to see if the submenu associated with this nav image is open, if so dont change the image.
    if (subMenu == '' || jQuery('#'+subMenu).css('display') != "block") {
        obj.src = obj.src.replace("over", "out");
        obj.className = "NavMousedOut";
        if (obj.src.indexOf("sel") > 0) {
            obj.className = "NavMousedOver";
        }
    }
}
function SubMenu(subMenu, image) {
    //Turn off images
    jQuery('#newserGridsImage').attr('src', jQuery('#newserGridsImage').attr('src').replace("over", "out"));
    //Toggle setting of this menu
    if (jQuery('#'+subMenu).css('display') == "block") {
        jQuery('#'+subMenu).css('display','none');
        AnalyticsCustomEvent('NavClick', subMenu + "Close");
    }
    else {
        jQuery('#'+subMenu).css('display','block');
        AnalyticsCustomEvent('NavClick', subMenu + "Open");
        if (image != '' && image != 'none') {
            jQuery('#'+image).attr('src', jQuery('#'+image).attr('src').replace("out", "over"));
        }
    }
    return false;
}

function showSubMenu(navlink, subElement, imgElement) {
    //hide all, fix onclicks
    jQuery('#sectionSubMenu').css('display','none');
    jQuery('#topicsSubMenu').css('display','none');
    jQuery('#sourcesSubMenu').css('display','none');
    jQuery('#sectionImage').addClass('NavMousedOut');
    jQuery('#topicsImage').addClass('NavMousedOut');
    jQuery('#sourcesImage').addClass('NavMousedOut');
    mouseOut(jQuery('#sectionImage'));
    mouseOut(jQuery('#topicsImage'));
    mouseOut(jQuery('#sourcesImage'));
    jQuery('#sectionLink').click(function () { showSubMenu(jQuery('#sectionLink'), jQuery('#sectionSubMenu'), jQuery('#sectionImage')) });
    jQuery('#topicLink').click(function () { showSubMenu(jQuery('#topicLink'), jQuery('#topicsSubMenu'), jQuery('#topicsImage')) });
    jQuery('#sourceLink').click(function () { showSubMenu(jQuery('#sourceLink'), jQuery('#sourcesSubMenu'), jQuery('#sourcesImage')) });
    navlink.onclick = function () { hideSubMenu(navlink, subElement, imgElement); }
    imgElement.onmouseover = imgElement.onmouseout = null;
    mouseOver(imgElement);
    subElement.style.display = "block";
    return false;
}
function hideSubMenu(navlink, subElement, imgElement) {
    subElement.style.display = "none";
    mouseOut(imgElement);
    navlink.onclick = function () { showSubMenu(navlink, subElement, imgElement); }
    return false;
}
/***************END Menu***********************/
//Rollover Code
function ShowRolloverTrigger(storyId) {
    //Check to see if the ShowRollovers variable is defined (if not then no rollovers)
    if (typeof ShowRollovers == "undefined") {
        return;
    }
    //Check to see if user has rollovers turned off
    if (ShowRollovers == true) {
        //ShowRollovers variable is set in ShowRollover.ascx
        if (!loaded) {
            jQuery('#preloader_' + storyId).css('display', 'block');
        }
        else {
            jQuery('#rolloverTrigger' + storyId).css('display','block');
        }
    }
}

function HideRolloverTrigger(storyId) {
    //Check to see if the ShowRollovers variable is defined (if not then no rollovers)
    if (typeof ShowRollovers == "undefined") {
        return false;
    }
    jQuery('#rolloverTrigger' + storyId).css('display','none');
    jQuery('#preloader_' + storyId).css('display','none');
}

function ShowRollover(storyid) {
    //Don't start doing rollovers until the page is loaded
    if (!loaded) {
        return;
    }

    //Check to see if user has rollovers turned off
    if (ShowRollovers == false) {
        //ShowRollovers variable is set in ShowRollover.ascx
        return false;
    }
    showingRollover = true;
    //Do the rollover
    var pageSize = getPageSize();
    var sX = window.pageXOffset || document.documentElement.scrollLeft || 0;
    var sY = window.pageYOffset || document.documentElement.scrollTop || 0;
    var rX;
    var rY;

    //Compute position for left coordinate of rollover - goal is centered over the squares on the grid: 
    // compute the size of the data on the page (square size * # columns plus right rail etc.)
    // then compute how much whitespace if any is on each side
    // then compute the left coordinate which is the size of the grid squares minus the rollover divided by 2 
    // (the distance from the left side of the squares to the left side of the rollover) 
    // plus the whitespace 
    // plus a fudge factor for the border on the left of the grid
    var datasize = (storySquareWidth * storyCols);
    var whitespace = (pageSize[2] - datasize) / 2;
    if (whitespace < 0) {
        whitespace = 0;
    }
    rX = whitespace + (((storySquareWidth * storyCols) - RolloverOverallWidth) / 2) + 6;
    if (rX < 0) {
        rX = 0;
    }
    //Compute position for top coordinate of rollover - goal is vertically centered on the viewport: 
    // scroll location + (window height - rollover size) / 2
    if (pageSize[3] < RolloverHeight) {
        rY = sY;
    }
    else {
        rY = sY + (pageSize[3] - RolloverHeight) / 2;
    }
    rolloverTimeoutId = setTimeout("PopRollover('" + storyid + "','" + rX + "','" + rY + "')", 400);
    return true;
}

function PopRollover(storyid, mX, mY) {
    var rolloverLocation = "RolloverStory.aspx";
    var el = jQuery('#div_iframe_overlay');
    if (el != null) {
        el.bind("mouseout mouseleave", function () {  hideOverlay('div_iframe_overlay'); });
        //Clear rollover
        el.html('<center><br/>Loading...<br/></center>');
        //Set positions for the rollover            
        el.css('left', mX + 'px');
        el.css('top', mY + 'px');
        el.css('display', 'block');
        //Set the data for the rollover
        el.html('<div id="rolloverFrameLayer" class="rolloverFrame" style="text-align:left; position:relative; left:0; width:' + (RolloverOverallWidth + 7) + 'px; height:' + (RolloverHeight + 7) + 'px;background-color:transparent;overflow:hidden;"><img class="rolloverCornerTR" src="http://img1-cdn.newser.com/images/spacer.gif" style="position:absolute;" /><iframe src="' + '/' + rolloverLocation + '?storyid=' + storyid + '&showad=' + ShowRolloverAd + '" id="iframe_overlay" name="iframe_overlay" frameborder="0" marginwidth="0" marginheight="0" width="' + RolloverOverallWidth + '" height="' + RolloverHeight + '" scrolling="no" style="z-index:+1;background-color:transparent;"></iframe><img class="rolloverCornerBL" src="http://img1-cdn.newser.com/images/spacer.gif" style="position:absolute;" /><div class="rolloverBottom" style="width:' + (RolloverOverallWidth - 7) + 'px; bottom:0;">&nbsp;</div><div id="rolloverRightBorder" class="rolloverRight" style="height:' + (RolloverHeight - 7) + 'px; right:0;">&nbsp;</div><img class="rolloverCornerBR" src="http://img1-cdn.newser.com/images/spacer.gif" style="position:absolute;" /></div>');
    }
}

function CancelRollover() {
    clearTimeout(rolloverTimeoutId);
}

function sizeRolloverSourceBox(storyId) {
    var wid = document.getElementById("rolloverImage" + storyId).width;
    var bottomPos;
    jQuery("#sourceContainer" + storyId).css('width', wid + "px");
    jQuery("#rolloverImageSource").css('width', wid + "px");
    jQuery("#rolloverStoryContent").css('width', (top.RolloverMainWidth - 58 - wid) + 'px');
    jQuery("#rolloverStoryContent").css('left', (wid + 8) + 'px');
    jQuery("#sourceContainer" + storyId).css('display','block');
    jQuery("#sourceContainer" + storyId).css('visibility','visible');
    if (document.getElementById("sourceContainer" + storyId).clientHeight >= document.getElementById("rolloverStoryContent").clientHeight) {
        bottomPos = document.getElementById("rolloverStoryContent").clientHeight - 7;
    }
    else {
        bottomPos = document.getElementById("sourceContainer" + storyId).clientHeight - 3;
    }
    jQuery("#rolloverStoryContent").css('top', '-' + (document.getElementById("sourceContainer" + storyId).clientHeight + 3) + 'px');
    jQuery("#rolloverStoryContent").css('marginBottom','-' + bottomPos + 'px');
    //function added to resize the rollover box
    jQuery("#rolloverStoryContent").css('visibility','visible');
    jQuery("#rolloverImageSource").css('visibility','visible');
}

function hideOverlay(id, isScreened) {
    if (registerOpen) {
        return false;
    } 
    jQuery("#div_iframe_overlay").html();
    var obj = document.getElementById(id);
    var frameSrc = document.getElementById("iframe_overlay").src;
    if (frameSrc.toLowerCase().indexOf("rolloverstory.aspx") > 0 || isScreened) {
        var obj = document.getElementById(id);
        if (obj) {
            obj.style.display = "none";
        }
        clearTimeout(readTimeout);
        clearTimeout(clearReadTimeout);
        showingRollover = false;
    }
    if (isScreened) {
        jQuery('#lightbox').css('display','none');
    }
    return false;
}

function CustomizeSettingsOpen(id1, id2) {
    //Make the customize setting panel visible
    jQuery('#CustomizedSettings').css('visibility', 'visible');
    jQuery('#CustomizedSettings').css('display', 'block');

    //Make the client-side button invisible
    jQuery('#' + id2).css('visibility', 'hidden');
    jQuery('#' + id2).css('display', 'none');

    //Make the server-side button visible
    jQuery('#' + id1).css('visibility', 'visible');
    jQuery('#' + id1).css('display', 'inline');

    //Call a GoogleAnalytics custom event to record this 
    AnalyticsCustomEvent('CustomizeGrid', 'Grid');

    //Init the slider
    InitCustomizeGridSlider();
}

function CustomizeSettingsClose(id1, id2) {
    //Make the customize setting panel invisible
    jQuery('#CustomizedSettings').css('visibility', 'hidden');
    jQuery('#CustomizedSettings').css('display', 'none');

    //Make the server-side button invisible
    jQuery('#' + id1).css('visibility', 'hidden');
    jQuery('#' + id1).css('display', 'none');

    //Make the client-side button visible
    jQuery('#' + id2).css('visibility', 'visible');
    jQuery('#' + id2).css('display', 'inline');
}

function markStoryRead(storyid) {
    if (!isVisitor) {
        if (!jQuery("#Story" + storyid).hasClass('viewedscreen')) {
            var myStr = 'jQuery("#Story' + storyid + '").removeClass("unreadscreen").addClass("viewedscreen");';
            readTimeout = setTimeout(myStr, 5000);
        }
    }
}

function isRead(storyid) {
    if (jQuery("#Story" + storyid).hasClass("viewedscreen")) {
        return true;
    }
    return false;
}

function ShowLightBox() {
    var ps = getPageSize();
    jQuery('#lightbox').css('height', (ps[1]) + 'px');
    jQuery('#lightbox').css('display','block');
}

function HideLightBox() {
    document.getElementById('lightbox').style.display = 'none';
}

function getPageSize() {

    var xScroll, yScroll;

    if (window.innerHeight && window.scrollMaxY) {
        xScroll = document.body.scrollWidth;
        yScroll = window.innerHeight + window.scrollMaxY;
    } else if (document.body.scrollHeight > document.body.offsetHeight) { // all but Explorer Mac
        xScroll = document.body.scrollWidth;
        yScroll = document.body.scrollHeight;
    } else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
        xScroll = document.body.offsetWidth;
        yScroll = document.body.offsetHeight;
    }

    var windowWidth, windowHeight;
    if (self.innerHeight) { // all except Explorer
        windowWidth = self.innerWidth;
        windowHeight = self.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
        windowWidth = document.documentElement.clientWidth;
        windowHeight = document.documentElement.clientHeight;
    } else if (document.body) { // other Explorers
        windowWidth = document.body.clientWidth;
        windowHeight = document.body.clientHeight;
    }

    // for small pages with total height less then height of the viewport
    if (yScroll < windowHeight) {
        pageHeight = windowHeight;
    } else {
        pageHeight = yScroll;
    }

    // for small pages with total width less then width of the viewport
    if (xScroll < windowWidth) {
        pageWidth = windowWidth;
    } else {
        pageWidth = xScroll;
    }
    arrayPageSize = new Array(pageWidth, pageHeight, windowWidth, windowHeight, xScroll, yScroll)
    return arrayPageSize;
}

function ParseMessage(msg) {
    var array = new Array();
    var data = msg;
    var x = 0;
    data = data.replace(/\r\n/g, '');
    while (data.indexOf('|||||') > -1) {
        array[x] = data.substring(0, data.indexOf('|||||'));
        data = data.substring(data.indexOf('|||||') + 5);
        x++;
    }
    if (data != '') {
        array[x] = data;
    }
    return array;
}

function mouseLeaves(element, evt) {
    if (typeof evt.toElement != 'undefined' && typeof element.contains != 'undefined') {
        return !element.contains(evt.toElement);
    }
    else if (typeof evt.relatedTarget != 'undefined' && evt.relatedTarget) {
        return !containsForMouseLeaves(element, evt.relatedTarget);
    }
}

function containsForMouseLeaves(container, containee) {
    while (containee) {
        if (container == containee) {
            return true;
        }
        containee = containee.parentNode;
    }
    return false;
}

function stringTrim(theString) {
    return theString.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

//BEGIN - Google Ad Formatting
var az;
var showheader;
function google_ad_request_done(google_ads) {
    var s = '';
    var t = '';
    var i;
    var params;

    var str_adHeader = '<h4><a href="<!--param:url-->">Ads by Google</a></h4>';

    var str_adImage = '<a href="<!--param:url-->" target="_top" title="go to <!--param:visUrl-->">';
    str_adImage += '<img border="0" src="<!--param:imageSrc-->" width="<!--param:imageWidth-->" height="<!--param:imageHeight-->">';
    str_adImage += '</a>';

    var str_adFlash = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"';
    str_adFlash += ' codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0"';
    str_adFlash += ' width="<!--param:imageWidth-->" height="<!--param:imageHeight-->" value="<!--param:imageSrc-->">';
    str_adFlash += '<PARAM NAME="quality" VALUE="high"><PARAM NAME="AllowScriptAccess" VALUE="never">';
    str_adFlash += '<EMBED src="<!--param:imageSrc-->" WIDTH="<!--param:imageWidth-->" HEIGHT="<!--param:imageHeight-->"';
    str_adFlash += ' TYPE="application/x-shockwave-flash" AllowScriptAccess="never" ';
    str_adFlash += ' PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer"></EMBED></OBJECT>';

    var str_adBlock = '<div class="adBlock <!--param:addBlockClass-->">';
    str_adBlock += '<a href="<!--param:url-->" onmouseover="window.status=\'go to <!--param:visUrl-->\';" onmouseout="window.status=\'\';">';
    str_adBlock += '<span class="adTitle"><!--param:title--></span>';
    str_adBlock += '</a><br />';
    str_adBlock += '<a href="<!--param:url-->" onmouseover="window.status=\'go to <!--param:visUrl-->\';" onmouseout="window.status=\'\';">';
    str_adBlock += '<span class="adURL"><!--param:visUrl--></span>';
    str_adBlock += '</a><br />';
    str_adBlock += '<span class="adCopy"><!--param:copyOne--> <!--param:copyTwo--></span><br />';
    str_adBlock += '</div>';


    if (google_ads.length == 0) {
        if (window.location.href.indexOf("/story/") >= 0) {
            AnalyticsCustomEvent("TextAds", "ZeroAdsStoryPage");
            StoryLoadAd();
        }
        return;
    }
    else {
        if (showheader != 'N') {
            params = { url: google_info.feedback_url };
            s = replaceParams(str_adHeader, params);
        }
        if (google_ads[0].type == "flash") {
            params = { url: google_ads[0].url,
                visUrl: google_ads[0].visible_url,
                imageSrc: google_ads[0].image_url,
                imageWidth: google_ads[0].image_width,
                imageHeight: google_ads[0].image_height
            }
            s += replaceParams(srt_adFlash, params);
        }
        else if (google_ads[0].type == "image") {
            params = { url: google_ads[0].url,
                visUrl: google_ads[0].visible_url,
                imageSrc: google_ads[0].image_url,
                imageWidth: google_ads[0].image_width,
                imageHeight: google_ads[0].image_height
            }
            s += replaceParams(srt_adImage, params);
        }
        else if (google_ads.length == 1) {
            params = { url: google_ads[0].url,
                visUrl: google_ads[0].visible_url,
                title: google_ads[0].line1,
                copyOne: google_ads[0].line2,
                copyTwo: google_ads[0].line3
            }
            s += replaceParams(str_adBlock, params);
        }
        else if (google_ads.length > 1 && az == 'adzoneh') {
            for (i = 0; i < google_ads.length; ++i) {
                params = { addBlockClass: 'adHorz',
                    url: google_ads[i].url,
                    visUrl: google_ads[i].visible_url,
                    title: google_ads[i].line1,
                    copyOne: google_ads[i].line2,
                    copyTwo: google_ads[i].line3
                }
                s += replaceParams(str_adBlock, params);
            }
        }
        else if (google_ads.length > 1) {
            for (i = 0; i < google_ads.length; ++i) {
                params = { url: google_ads[i].url,
                    visUrl: google_ads[i].visible_url,
                    title: google_ads[i].line1,
                    copyOne: google_ads[i].line2,
                    copyTwo: google_ads[i].line3
                }
                s += replaceParams(str_adBlock, params);
            }
        }
    }

    document.write(s)
    return;
}

function replaceParams(str, oParams) {
    var regex = /<!--param:(.*?)-->/;
    while (match = regex.exec(str)) {
        var param = match[1];
        var replacement = "";
        if (oParams[param] !== undefined) { replacement = oParams[param]; }
        str = str.replace(regex, replacement);
    }
    return str;
}
//END - Google Ad Formatting

function StoryLoadAd() {
    jQuery('#IframeStoryAd').css('display', 'block');
    jQuery('#IframeStoryAd').attr('src', '/ad.aspx');
}

/************Browser Detection*****************/
function getIEVersion()
// Returns the version of Internet Explorer or a -1
// (indicating the use of another browser).
{
    var rv = -1; // Return value assumes failure.
    if (navigator.appName == 'Microsoft Internet Explorer') {
        var ua = navigator.userAgent;
        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat(RegExp.$1);
    }
    return rv;
}
/********END Browser Detection*****************/

function trim(stringToTrim) {
    return stringToTrim.replace(/^\s+|\s+$/g, "");
}
String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "");
}
String.prototype.ltrim = function () {
    return this.replace(/^\s+/, "");
}
String.prototype.rtrim = function () {
    return this.replace(/\s+$/, "");
}

function renderSquare(disp, layout, hed, dek, imgurl, pub, dispdate, swipe, swipecolor, isImageGallery, isVideoGallery, linkurl, isUserWritten, type, linkStoryType, noImage) {
    var linkStoryClass = "";
    if (type != null && type != "undefined" && type == 'L') {
        if (linkStoryType != 'OFF' || swipecolor != '') {
            linkStoryClass = "linkStory";
        }
    }
    if (isUserWritten) {
        layout += " UserSquare ";
        swipecolor = "7D7D7D";
        hed = hed.unescapeHTML();
        hed = hed.replace(/(\s|&nbsp;)+/g, " ");
    }
    else if (layout.indexOf("ConsistentLook") >= 0) {
        hed = hed.replace(/(\s|&nbsp;)+/g, " ");
    }
    var output = '<div class="square ' + layout + ' ' + linkStoryClass + '">';
    var newserURL = imgurl.substring(0, imgurl.indexOf("newser.com") + 10);
    var storyurl = "#";
    if (linkurl != null && linkurl != "undefined") {
        storyurl = linkurl;
    }
    var borderStyling = "";
    if (type != null && type != "undefined" &&
		(type == 'L' || isUserWritten)//if its a link story or userstory with new square type
		 && swipecolor && swipe && swipe.length > 1 && swipecolor != '') {
        borderStyling += 'border:2px solid #' + swipecolor + ';width:236px;height:156px;z-index:300;';
    }

    if (isImageGallery) {
        output += '<div id="imageGalleryIcon" class="imageGalleryIcon" style="z-index:+201;"><a href="javascript:void(0);"><img src="http://img1-cdn.newser.com/images/ico-camera.png" /></a></div>';
    }
    if (isVideoGallery) {
        output += '<div id="videoGalleryIcon" class="videoGalleryIcon" style="z-index:+201;"><a href="javascript:void(0);"><img src="http://img1-cdn.newser.com/images/ico-play.png" /></a></div>';
    }
    if (noImage == true) {
        output += '<a href="#"><div style="' + borderStyling + '"></div></a>';
    }
    else {
        if (imgurl.length > 0) {
            output += '<a href="' + storyurl + '"><img class="mainImg" src="' + imgurl + '" style="z-index:-100;" /><div style="' + borderStyling + '"></div></a>';
        }
        else {
            output += '<a href="#"><img class="mainImg" src="http://img1-cdn.newser.com/images/spacer.gif" style="z-index:-100;" /><div style="' + borderStyling + '"></div></a>';
        }
    }
    if ((isUserWritten) || (swipecolor && swipe && swipe.length > 1)) {
        output += '<h5 class="h5" style="background:#' + swipecolor + '">';
        if (isUserWritten) {
            output += '<img src="http://img2-cdn.newser.com/images/user-small1.png" border="0" alt="" /> ';
        }
        output += swipe;
        if (type != null && type != "undefined" && type == 'L' && linkurl != null && linkurl != "undefined" && linkurl.indexOf("http://www.newser.com/") < 0) {
            if (linkStoryType != 'OFF' || swipecolor != '') {
                output += ' <img src="http://img2-cdn.newser.com/images/ext-link1.png" border="0" alt="" /> ';
            }
        }
        output += '</h5>';
    }
    output += '<div class="x" style="z-index:-1;">';
    output += '<h2 class="h2"><a href="' + storyurl + '">' + hed + '</a></h2>';
    if (dek != "null") {
        output += '<h4 class="h4">' + dek + '</h4>';
    }
    output += '</div>';
    if (type != null && type != "undefined" && type == 'L' && linkStoryType == "PRO") {
        output += '<div class="byline"></div>';
    }
    else {
        output += '<div class="byline">' + dispdate + '</div>';
    }
    output += '</div>';
    jQuery('#'+disp).html(output);
}

function IsLoggedIn() {
    var creds = GetCookie("USERCREDENTIALS");
    var email = ExtractCookieValue(creds, "EMAIL");
    var pwd = ExtractCookieValue(creds, "PASSWORD");

    if (email != "" && pwd != "") {
        return true;
    }
    else {
        return false;
    }
}

function GetCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

function ExtractCookieValue(cookieString, cookieName) {
    if (cookieString.length > 0) {
        c_start = cookieString.indexOf(cookieName + "=");
        if (c_start != -1) {
            c_start = c_start + cookieName.length + 1;
            c_end = cookieString.indexOf("&", c_start);
            if (c_end == -1) c_end = cookieString.length;
            return unescape(cookieString.substring(c_start, c_end));
        }
    }
    return "";
}

function createCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    document.cookie = name + "=" + value + expires + '; path=/';
    return null;
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function GetCurrentTime() {
    var a_p = "";
    var d = new Date();
    var curr_hour = d.getHours();
    if (curr_hour < 12) {
        a_p = "AM";
    }
    else {
        a_p = "PM";
    }
    if (curr_hour == 0) {
        curr_hour = 12;
    }
    if (curr_hour > 12) {
        curr_hour = curr_hour - 12;
    }
    var curr_min = d.getMinutes();
    curr_min = curr_min + "";
    if (curr_min.length == 1) {
        curr_min = "0" + curr_min;
    }
    return (curr_hour + ":" + curr_min + " " + a_p);
}

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

function closeNBUPromotion(NBUpromotionId) {
    AjaxCallSync("/utility.aspx?function=lastNBUpromotionclosed&lastNBUpromotionclosed=" + NBUpromotionId, closeNBUPromotionSuccess);
    return false;
}
function closeNBUPromotionSuccess() {
    jQuery('#NBUPromo').css('display', 'none');
    AnalyticsCustomEvent('NBU', 'ClosePromo');
    return false;
}

/* BEGIN - Slider */
/**
* JavaScript Slider v0.9
* http://blog.ovidiu.ch/javascript-slider
*
* Copyright (c) 2010, Ovidiu Chereche?
* MIT License
* http://legal.ovidiu.ch/licenses/MIT
*/

/* Mouse */

var Mouse =
{
    x: 0,
    y: 0,
    refresh: function (e) {
        var posx = 0, posy = 0;
        if (!e) {
            e = window.event;
        }
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        }
        else if (e.clientX || e.clientY) {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        this.x = posx;
        this.y = posy;
    }
};

var mouseMoveHandler = document.onmousemove || function () { };
document.onmousemove = function (e) {
    mouseMoveHandler(e);
    Mouse.refresh(e);
}

/* Position */

var PositionNew =
{
    get: function (obj) {
        var curleft = curtop = 0;
        if (obj.offsetParent) {
            do {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            }
            while ((obj = obj.offsetParent));
        }
        return [curleft, curtop];
    }
};

/* Slider */

var Slider = function (wrapper, options) {
    if (typeof (wrapper) == 'string') {
        wrapper = document.getElementById(wrapper);
    }
    if (!wrapper) {
        return;
    }
    var handle = wrapper.getElementsByTagName('div')[0];
    if (!handle || handle.className.search(/(^|\s)handle(\s|$)/) == -1) {
        return;
    }
    this.init(wrapper, handle, options || {});
    this.setup();
};
Slider.prototype =
{
    init: function (wrapper, handle, options) {
        this.wrapper = wrapper;
        this.handle = handle;
        this.options = options;

        this.value = {
            current: options.value || 0,
            target: options.value || 0,
            prev: -1
        };
        this.disabled = options.disabled || false;
        this.steps = options.steps || 0;
        this.snapping = options.snapping || false;
        this.speed = options.speed || 5;

        this.callback = options.callback || null;
        this.animation_callback = options.animation_callback || null;

        this.bounds = {
            pleft: options.pleft || 0, left: 0,
            pright: -(options.pright || 0), right: 0,
            width: 0,
            diff: 0
        };
        this.offset = { wrapper: 0, mouse: 0, target: 0, current: 0, prev: -9999 };

        this.dragging = false;
        this.tapping = false;
    },
    setup: function () {
        var self = this;

        this.wrapper.onselectstart = function () {
            return false;
        }
        this.handle.onmousedown = function (e) {
            self.preventDefaults(e, true);
            this.focus();
            self.handleMouseDownHandler(e);
        };
        this.wrapper.onmousedown = function (e) {
            self.preventDefaults(e);
            self.wrapperMouseDownHandler(e);
        };
        var mouseUpHandler = document.onmouseup || function () { };
        document.onmouseup = function (e) {
            mouseUpHandler(e);
            self.preventDefaults(e);
            self.documentMouseUpHandler(e);
        };
        var resizeHandler = document.onresize || function () { };
        window.onresize = function (e) {
            resizeHandler(e);
            self.setWrapperOffset();
            self.setBounds();
        };

        this.setWrapperOffset();

        if (!this.bounds.pleft && !this.bounds.pright) {
            this.bounds.pleft = PositionNew.get(this.handle)[0] - this.offset.wrapper;
            this.bounds.pright = -this.bounds.pleft;
        }
        this.setBounds();
        this.setSteps();

        this.interval = setInterval(function () { self.animate() }, 20);
        self.animate(false, true);
    },
    setWrapperOffset: function () {
        this.offset.wrapper = PositionNew.get(this.wrapper)[0];
    },
    setBounds: function () {
        this.bounds.left = this.bounds.pleft;
        this.bounds.right = this.bounds.pright + this.wrapper.offsetWidth;
        this.bounds.width = this.bounds.right - this.bounds.left;
        this.bounds.diff = this.bounds.width - this.handle.offsetWidth;
    },
    setSteps: function () {
        if (this.steps > 1) {
            this.stepsRatio = [];
            for (var i = 0; i <= this.steps - 1; i++) {
                this.stepsRatio[i] = i / (this.steps - 1);
            }
        }
    },
    disable: function () {
        this.disabled = true;
        this.handle.className += ' disabled';
    },
    enable: function () {
        this.disabled = false;
        this.handle.className = this.handle.className.replace(/\s?disabled/g, '');
    },
    handleMouseDownHandler: function (e) {
        this.startDrag();
        this.cancelEvent(e);
    },
    wrapperMouseDownHandler: function (e) {
        this.startTap();
    },
    documentMouseUpHandler: function (e) {
        this.stopDrag();
        this.stopTap();
    },
    startTap: function (target) {
        if (this.disabled) {
            return;
        }
        if (target === undefined) {
            target = Mouse.x - this.offset.wrapper - (this.handle.offsetWidth / 2);
        }
        this.setOffsetTarget(target);

        this.tapping = true;
    },
    stopTap: function () {
        if (this.disabled || !this.tapping) {
            return;
        }
        this.setOffsetTarget(this.offset.current);

        this.tapping = false;

        this.result();
    },
    startDrag: function () {
        if (this.disabled) {
            return;
        }
        this.offset.mouse = Mouse.x - PositionNew.get(this.handle)[0];

        this.dragging = true;
    },
    stopDrag: function () {
        if (this.disabled || !this.dragging) {
            return;
        }
        this.dragging = false;

        this.result();
    },
    feedback: function () {
        var value = this.value.current;
        if (this.steps > 1 && this.snapping) {
            value = this.getClosestStep(value);
        }
        if (value != this.value.prev) {
            if (typeof (this.animation_callback) == 'function') {
                this.animation_callback(value);
            }
            this.value.prev = value;
        }
    },
    result: function () {
        var value = this.value.target;
        if (this.steps > 1) {
            value = this.getClosestStep(value);
        }
        if (typeof (this.callback) == 'function') {
            this.callback(value);
        }
    },
    animate: function (onMove, first) {
        if (onMove && !this.dragging) {
            return;
        }
        if (this.dragging) {
            this.setOffsetTarget(Mouse.x - this.offset.mouse - this.offset.wrapper);
        }

        this.value.target = Math.max(this.value.target, 0);
        this.value.target = Math.min(this.value.target, 1);
        this.offset.target = this.getOffsetByRatio(this.value.target);

        if ((!this.dragging && !this.tapping) || this.snapping) {
            if (this.steps > 1) {
                this.setValueTarget(this.getClosestStep(this.value.target));
            }
        }
        if (this.dragging || first) {
            this.value.current = this.value.target;
        }
        this.slide();
        this.show();

        this.feedback();
    },
    slide: function () {
        if (this.value.target > this.value.current) {
            this.value.current += Math.min(this.value.target - this.value.current, this.speed / 100);
        }
        else if (this.value.target < this.value.current) {
            this.value.current -= Math.min(this.value.current - this.value.target, this.speed / 100);
        }
        if (!this.snapping) {
            this.offset.current = this.getOffsetByRatio(this.value.current);
        }
        else {
            this.offset.current = this.getOffsetByRatio(
				this.getClosestStep(this.value.current)
			);
        }
    },
    show: function () {
        if (this.offset.current != this.offset.prev) {
            this.handle.style.left = String(this.offset.current) + 'px';
            this.offset.prev = this.offset.current;
        }
    },
    setValue: function (value, snap) {
        this.setValueTarget(value);
        if (snap) {
            this.value.current = this.value.target;
        }
    },
    setValueTarget: function (value) {
        this.value.target = value;
        this.offset.target = this.getOffsetByRatio(value);
    },
    setOffsetTarget: function (value) {
        this.offset.target = value;
        this.value.target = this.getRatioByOffset(value);
    },
    getRatioByOffset: function (offset) {
        return (offset - this.bounds.left) / this.bounds.diff;
    },
    getOffsetByRatio: function (ratio) {
        return Math.round(ratio * this.bounds.diff) + this.bounds.left;
    },
    getClosestStep: function (value) {
        var k = 0;
        var min = 1;
        for (var i = 0; i <= this.steps - 1; i++) {
            if (Math.abs(this.stepsRatio[i] - value) < min) {
                min = Math.abs(this.stepsRatio[i] - value);
                k = i;
            }
        }
        return this.stepsRatio[k];
    },
    preventDefaults: function (e, selection) {
        if (!e) {
            e = window.event;
        }
        if (e.preventDefault) {
            e.preventDefault();
        }
        if (selection && document.selection) {
            document.selection.empty();
        }
    },
    cancelEvent: function (e) {
        if (!e) {
            e = window.event;
        }
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        else {
            e.cancelBubble = true;
        }
    }
};
/* END - Slider */
function ToggleMyAccount() {
    if (jQuery('#DivMyAccount').css('display') == 'none') {
        jQuery('#DivMyAccount').css('display', 'block');
    }
    else {
        jQuery('#DivMyAccount').css('display', 'none');
    }
}
function OpenRegister(registerType,isTwitReturn, query) {
    //0 = login
    //1 = Default Register Box
    var prettyRegName = "-";
    switch (parseInt(registerType)) {
        case 0:
            prettyRegName = "Login";
            break;
        case 1:
        default:
            prettyRegName = "Default";
            break;
        case 2:
            prettyRegName = "Settings";
            break;
        case 3:
            prettyRegName = "NBU";
            break;
        case 4:
            prettyRegName = "Comments";
            break;
        case 5:
            prettyRegName = "Rollover";
            break;
        case 6:
            prettyRegName = "SubscriptionsPage";
            break;
        case 7:
            prettyRegName = "SocialConnection";
            break;
        case 8:
            prettyRegName = "Account";
            break;
        case 9:
            prettyRegName = "UserInfo";
            break;
    }
    var height = 570;
    if (registerType == "0") {
        height = 300;
    }
    var twitReturnQuery = "";
    if (isTwitReturn) {
        twitReturnQuery = "&twitreturn=Y";
    }
    var queryString = "";
    if (query != undefined && query.length > 0) {
        queryString = query;
    }
    AnalyticsCustomEvent("RegisterOpened",registerType + prettyRegName);
    var src = "register" + "." + "aspx" + "?type=" + registerType + "&pageurl=" + escape(document.location.href) + twitReturnQuery + queryString;
    registerOpen = true;
    top.doPopup(src, 660, height, -1, -1, false, true);    
    return false;
}

function setupLogin() {
    jQuery(".fbLgnBtn").click(
        function () {
            FB.login(function (response) {
                if (response.authResponse && response.status == "connected") {
                    jQuery("#ctl00_ContentPlaceHolder1_HF_fat").val(response.authResponse.accessToken);
                    AnalyticsCustomEvent("Login", "Facebook");
                    __doPostBack(fbLBlgn_UID, "");
                }
            }, { scope: 'publish_stream,email,offline_access' });
        }
    );
    jQuery(".tLgnBtn").click(
        function () {
            ConnectionsTwitterConnect("login");
            return false;
        }
    );
}

function CloseRegister() {
    top.registerOpen = false;
    top.hideOverlay("div_iframe_overlay", true);
    return false;
}
function CloseShare() {
    CloseRegister();
}
function OpenShare(shareType, isTwitReturn, shareURL, shareTitle, shareDesc, shareComment, imageURL) {
    var twitReturnQuery = "";
    var src = "";
    if (isTwitReturn) {
        AnalyticsCustomEvent("SocialConnect", "Twitter", "Sharing.aspx");
        twitReturnQuery = "&twitreturn=Y";
        src = "sharing.aspx" + window.location.href.substring(window.location.href.indexOf("?") + 1) + twitReturnQuery;
    }
    else {
        AnalyticsCustomEvent("ShareOpen", shareType, shareURL);
        src = "sharing" + "." + "aspx" + "?sharetype=" + shareType + "&linkurl=" + shareURL + "&pagetitle=" + shareTitle + "&linksummary=" + shareDesc + "&linktext=" + shareComment + "&imageurl=" + imageURL + twitReturnQuery;
    }
    top.doPopup(src, 515, 460, -1, -1, false, true);

    return false;
}
function YesNoToggleClick(ImageId, HiddenId) {
    if (jQuery('#' + ImageId).attr('src') == 'http://img1-cdn.newser.com/images/toggleno.png') {
        jQuery('#' + ImageId).attr('src', 'http://img2-cdn.newser.com/images/toggleyes.png');
        jQuery('#' + HiddenId).val('Y');
    }
    else {
        jQuery('#' + ImageId).attr('src', 'http://img1-cdn.newser.com/images/toggleno.png');
        jQuery('#' + HiddenId).val('N');
    }
}
function ShowWhatIsThis(divObject) {
    document.getElementById(divObject).style.display = 'block';
}
function HideWhatIsThis(divObject) {
    document.getElementById(divObject).style.display = 'none';
}
function ShowHelp(Target, HelpDiv) {
    var offset = jQuery('#' + Target).offset();
    //Make the help text visible and position it with the top level with the image element passed in
    jQuery('#' + HelpDiv).css('display', 'block').offset({ top: offset.top, left: offset.left + 30 });
}
function HideHelp(HelpDiv) {
    jQuery('#' + HelpDiv).css('display', 'none');
}
function SizeShade(extra) {
    var shadeTop = jQuery('#ShadeTop').position().top;
    var shadeBot = jQuery('#ShadeBottom').position().top;
    var shadeHeight = shadeBot - shadeTop;
    var shadeLeft = jQuery('#ShadeTop').position().left;
    var shadeRight = jQuery('#ShadeBottom').position().left;
    var shadeWidth = (shadeRight - shadeLeft) + extra;
    jQuery('#Shade').css('height', shadeHeight + 'px').css('width', shadeWidth + 'px').css('top', shadeTop + 'px');
}

function GetComments() {
    //Increment the page number
    pageNum++;
    //If on page 1 then check to see if there is a comment id in the anchor that we will be scrolling to.
    //If so, then send it to the server to be sure that comment is returned (it may not be in the first page)
    var commentId = '';
    if (pageNum == 1) {
        //Check for an anchor tag
        //If found, then extract the comment id 
        //Sample anchor: #comment-60274197
        //Sample id: CommentAnchor60274197
        var x = window.location.href.indexOf("#");
        if (x >= 0) {
            var anchor = window.location.href.substr(x + 1);
            commentId = anchor.substr(8);
        }
    }
    //Construct the parameters
    var data = 'Action=' + 'GetComments' +
                   '&PageNum=' + pageNum +
                   '&EntityType=' + entityType +
                   '&EntityId=' + entityId +
                   '&EntityIdString=' + entityIdString +
                   '&CommentId=' + commentId;
    //Call to the server
    AjaxCallPost('/commentsajax' + '.aspx', data, GetCommentsSuccess, GetCommentsError);
}
function GetCommentsSuccess(response) {

    //Display message if present
    if (response.Message != 'OK') {
        jQuery('#CommentMsg').css('display', 'block');
        jQuery('#CommentMsg').html(response.Message);
        return;
    }
    else {
        jQuery('#CommentMsg').css('display', 'none');
    }

    for (i = 0; i < response.Comments.length; i++) {

        //Compute the indent for the comment
        var indent = response.Comments[i].Level * 30;

        if (response.Comments[i].EntityType == 'U') {

            //Copy the template to a new dom element
            newDom = document.getElementById('CommentTemplateU').cloneNode(true);

            //Set the attributes on elements in the new dom element
            newDom.id = 'Comment' + response.Comments[i].CommentId;
            newDom.style.display = "block";

            jQuery('#CommentEntityTitle', newDom).html(response.Comments[i].EntityTitle);
            jQuery('#CommentEntityLink', newDom).attr('href', response.Comments[i].EntityLink);

            if (response.Comments[i].Status == 'killed') {
                jQuery('#CommentText', newDom).html('Comment removed.');
                jQuery('#CommentText', newDom).css('font-style', 'italic');
                jQuery('#CommentBottom', newDom).remove();
            }
            else {
                jQuery('#CommentText', newDom).html(response.Comments[i].Text);
                jQuery('#CommentText', newDom).css('font-style', 'normal');
                if (response.Comments[i].Points == 0) {
                    jQuery('#CommentBottom', newDom).remove();
                }
                else {
                    jQuery('#CommentLikeCount', newDom).html(response.Comments[i].Points);
                    if (response.Comments[i].Points > 1) {
                        jQuery('#CommentLikeText', newDom).html('people');
                    }
                }
            }
            jQuery('#CommentDateAdded', newDom).html(response.Comments[i].DateAdded);
            jQuery('#CommentAnchor', newDom).attr('name', 'comment-' + response.Comments[i].CommentId);

            //Update the ids so they are unique
            jQuery('#CommentDiv', newDom).attr('id', 'CommentDiv' + response.Comments[i].CommentId);
            jQuery('#CommentEntityLink', newDom).attr('id', 'CommentEntityLink' + response.Comments[i].CommentId);
            jQuery('#CommentEntityTitle', newDom).attr('id', 'CommentEntityTitle' + response.Comments[i].CommentId);
            jQuery('#CommentDateAdded', newDom).attr('id', 'CommentDateAdded' + response.Comments[i].CommentId);
            jQuery('#CommentText', newDom).attr('id', 'CommentText' + response.Comments[i].CommentId);
            jQuery('#CommentBottom', newDom).attr('id', 'CommentBottom' + response.Comments[i].CommentId);
            jQuery('#CommentLikeCount', newDom).attr('id', 'CommentLikeCount' + response.Comments[i].CommentId);
            jQuery('#CommentLikeText', newDom).attr('id', 'CommentLikeText' + response.Comments[i].CommentId);
            jQuery('#CommentAnchor', newDom).attr('id', 'CommentAnchor' + response.Comments[i].CommentId);
        }
        else {

            //Copy the template to a new dom element
            newDom = document.getElementById('CommentTemplate').cloneNode(true);

            //Set the attributes on elements in the new dom element
            newDom.id = 'Comment' + response.Comments[i].CommentId;
            newDom.style.display = "block";

            jQuery('#CommentDiv', newDom).css('margin-left', indent + 'px');

            if (response.Comments[i].Status == 'killed') {
                jQuery('#CommentUsernameNoLink', newDom).html('Guest');
                jQuery('#CommentText', newDom).html('Comment removed.');
                jQuery('#CommentText', newDom).css('font-style', 'italic');
                jQuery('#CommentBottom', newDom).remove();
                jQuery('#CommentAAvatar', newDom).remove();
                jQuery('#CommentAUsername', newDom).remove();
            }
            else {
                if (response.Comments[i].ProfileURL == '') {
                    jQuery('#CommentAAvatar', newDom).remove();
                    jQuery('#CommentAUsername', newDom).remove();
                    jQuery('#CommentUsernameNoLink', newDom).html(response.Comments[i].Username);
                    if (response.Comments[i].Avatar != '') {
                        jQuery('#CommentAvatarNoLink', newDom).attr('src', response.Comments[i].Avatar);
                    }
                }
                else {
                    jQuery('#CommentAvatarNoLink', newDom).remove();
                    jQuery('#CommentUsernameNoLink', newDom).remove();
                    jQuery('#CommentAAvatar', newDom).attr('href', response.Comments[i].ProfileURL);
                    jQuery('#CommentAUsername', newDom).attr('href', response.Comments[i].ProfileURL);
                    jQuery('#CommentUsernameLink', newDom).html(response.Comments[i].Username);
                    if (response.Comments[i].Avatar != '') {
                        jQuery('#CommentAvatarLink', newDom).attr('src', response.Comments[i].Avatar);
                    }
                }
                jQuery('#CommentText', newDom).html(response.Comments[i].Text);
                jQuery('#CommentText', newDom).css('font-style', 'normal');
                if (response.Comments[i].Points == 0) {
                    jQuery('#CommentBottom', newDom).remove();
                }
                else {
                    jQuery('#CommentLikeCount', newDom).html(response.Comments[i].Points);
                    if (response.Comments[i].Points > 1) {
                        jQuery('#CommentLikeText', newDom).html('people');
                    }
                }
            }
            jQuery('#CommentDateAdded', newDom).html(response.Comments[i].DateAdded);
            jQuery('#CommentAnchor', newDom).attr('name', 'comment-' + response.Comments[i].CommentId);

            //Update the ids so they are unique
            jQuery('#CommentDiv', newDom).attr('id', 'CommentDiv' + response.Comments[i].CommentId);
            jQuery('#CommentAvatarLink', newDom).attr('id', 'CommentAvatarNoLink' + response.Comments[i].CommentId);
            jQuery('#CommentAvatarLink', newDom).attr('id', 'CommentAvatarLink' + response.Comments[i].CommentId);
            jQuery('#CommentProfileLink', newDom).attr('id', 'CommentProfileLink' + response.Comments[i].CommentId);
            jQuery('#CommentUsername', newDom).attr('id', 'CommentUsername' + response.Comments[i].CommentId);
            jQuery('#CommentDateAdded', newDom).attr('id', 'CommentDateAdded' + response.Comments[i].CommentId);
            jQuery('#CommentText', newDom).attr('id', 'CommentText' + response.Comments[i].CommentId);
            jQuery('#CommentBottom', newDom).attr('id', 'CommentBottom' + response.Comments[i].CommentId);
            jQuery('#CommentLikeCount', newDom).attr('id', 'CommentLikeCount' + response.Comments[i].CommentId);
            jQuery('#CommentLikeText', newDom).attr('id', 'CommentLikeText' + response.Comments[i].CommentId);
            jQuery('#CommentAnchor', newDom).attr('id', 'CommentAnchor' + response.Comments[i].CommentId);
        }

        //Add the new dom element to into the dom
        document.getElementById('CommentHolder').appendChild(newDom);
    }

    //Check to see if the "Load More Comments" button should be hidden
    if (response.NoMoreComments) {
        jQuery('#ButtonLoadMoreComments').css('display', 'none');
    }

    //If on page 1 then check to see if we should scroll to the desired comment
    if (pageNum == 1) {
        //Check for a Disqus formatted anchor tag
        //If found, then transform it into the id of the comment and scroll to it
        //Sample anchor: #comment-60274197
        //Sample id: CommentAnchor60274197
        var x = window.location.href.indexOf("#");
        if (x >= 0) {
            var anchor = window.location.href.substr(x + 1);
            var commentId = anchor.substr(8);
            var id = 'CommentAnchor' + commentId;
            ScrollToId(id);
        }
    }
}

function GetCommentsError() {
    jQuery('#CommentMsg').css('display', 'block');
    jQuery('#CommentMsg').html('Error...please try again later.');
}
function ReplaceInterrupter() {
    var url = "/controlpage.aspx?control=/common/controls/masterpage/interruptercontent&sitepagename=undefined&type=refresh&interrupterid=" + interruptID + "&lastinterrupterclosed=" + lastInterrupterClosed + interrupterStaffCacheBust;
    AjaxCall(url, InterrupterCallbackSuccess, InterrupterCallbackError);
}
function InterrupterCallbackSuccess(transport) {
    var response = transport;
    var trimmedResponse = response.replace(/^\s+|\s+$/g, "");
    var interrupterContents = jQuery('#InterrupterHolder').html().replace(/^\s+|\s+$/g, "");
    if ((trimmedResponse != '<span style="display:none;">notupdated</span>') && (interrupterContents != trimmedResponse)) {
        jQuery("#InterrupterHolder").html(response);
        if (response.indexOf("interruptID =") >= 0) {
            interruptID = response.substring(response.indexOf("interruptID =") + 14);
            interruptID = interruptID.substring(0, interruptID.indexOf(";"));
        }
        if (response.replace(/^\s+|\s+$/g, "") == "") {
            jQuery('#InterrupterHolder').css("display", "none");
        }
        else {
            jQuery('#InterrupterHolder').css("display", "block");
        }
        jQuery('#mainNav').css("display", "none");
        jQuery('#contentBounds').css("display", "none");
        jQuery('#mainNav').css("display", "block");
        jQuery('#contentBounds').css("display", "block");
        jQuery('#mainNav').css("top", "0");
        jQuery('#contentBounds').css("position", "0");
    }
    setTimeout("ReplaceInterrupter()", interrupterRefresh);
}
function InterrupterCallbackError(transport) {
    jQuery('#InterrupterHolder').css("display", "none");
    setTimeout("ReplaceInterrupter()", interrupterRefresh);
}

function ConnectionsFacebookConnect() {
    FB.login(function (response) { if (response.authResponse && response.status == "connected") jQuery("#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolderUserProfile1_HF_FAT").val(response.authResponse.accessToken); ConnectionsFacebookConnectSuccess(); }, { scope: 'publish_stream,email,offline_access' });
    return false;
}
function ConnectionsFacebookConnectSuccess() {
    AnalyticsCustomEvent("SocialConnect", "Facebook", "Connections.aspx");    
    __doPostBack('FacebookConnect', '');
}

function ConnectionsFacebookDisconnect() {
    //FB.logout(function (response) { ConnectionsFacebookDisconnectSuccess(); });
    ConnectionsFacebookDisconnectSuccess();  /* temporarily? remove Facebook logout and just postback to update the database */
}
function ConnectionsFacebookDisconnectSuccess() {
    AnalyticsCustomEvent("SocialDisconnect", "Facebook", "Connections.aspx");
    __doPostBack('FacebookDisconnect', '');
}
function ConnectionsTwitterConnect(action) {
    var actionQuery = "";
    if (action) {
        actionQuery = "?action=" + action;
    }
    var win = window.open('/twitterconnect.aspx' + actionQuery, 'TwitWin', 'menubar=0,resizable=0,width=780,height=425');
    return false;
}
function ScrollToId(id) {
    if (jQuery("#" + id).length > 0) {
        scroll(0, 0);
        jQuery('html,body').animate({ scrollTop: jQuery("#" + id).offset().top }, 1000);
        //scroll(0, jQuery("#" + id).offset().top);
    }
}
function refreshAd(AdToRefresh, width, height, AdSection) {
    //in order to refresh there must be a unit with AdToRefresh + _ref 
    jQuery("#" + AdToRefresh).html("");
    jQuery("#" + AdToRefresh + "_frame").remove();
    var dateMilli = new Date();
    dateMilli = dateMilli.getTime();
    jQuery("#" + AdToRefresh).html("<iframe src=\"/controlpage.aspx?control=" + ajaxAdControl + "&adname=" + AdToRefresh + "_ref&adsection=" + AdSection + "&refdomain=newser-com&width=" + width + "&height=" + height + "&d=" + dateMilli + "\" width=\"" + width + "\" height=\"" + height + "\" frameborder=\"0\" scrolling=\"no\" id=\"" + AdToRefresh + "_frame\" />");
}
function GetStoryTextHeight() {
    if (jQuery("#StoryTextTop").length > 0 && jQuery("#StoryTextBot").length > 0) {
        var storyTextTop = jQuery('#StoryTextTop').position().top;
        var storyTextBot = jQuery('#StoryTextBot').position().top;
        var storyTextHeight = storyTextBot - storyTextTop;
        document.getElementById('StoryTextHeight').innerHTML = Math.round(storyTextHeight);
    }
}
function SubmitStoryTrack() {
    AnalyticsCustomEvent('ContributeNews');
    return true;
}
function StoryImageGalleryMore(action) {
    if (jQuery("#StoryParagraphTopShort").length > 0 && jQuery("#StoryParagraphTopFull").length > 0) {
        if (action == 'O') {
            jQuery("#StoryParagraphTopShort").css('display', 'none');
            jQuery("#StoryParagraphTopFull").css('display', 'block');
        }
        else if (action == 'C') {
            jQuery("#StoryParagraphTopShort").css('display', 'block');
            jQuery("#StoryParagraphTopFull").css('display', 'none');
        }
        else {
            if (jQuery("#StoryParagraphTopShort").css('display') == 'block') {
                jQuery("#StoryParagraphTopShort").css('display', 'none');
                jQuery("#StoryParagraphTopFull").css('display', 'block');
            }
            else {
                jQuery("#StoryParagraphTopShort").css('display', 'block');
                jQuery("#StoryParagraphTopFull").css('display', 'none');
            }
        }
    }
}

function ScrolledToTop() {
    scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;  //Scroll position of entire window
    if (scrollTop == 0) {
        return true;
    }
    return false;
}

// Lazy load l2 images at ready
function LazyLoadImagesReady() {
    jQuery('img[l2-src]').each(function (idx, elm) {
        jQuery(this).attr('src', jQuery(this).attr('l2-src'));
    });

    //If we are not scrolled to the top then go ahead and load the l1 images now
    if (!ScrolledToTop()) {
        LazyLoadImagesScroll();
    }
}
// Lazy load l1 images when browser is scrolled 
function LazyLoadImagesScroll() {
    jQuery(window).unbind('scroll');
    jQuery('img[l1-src]').each(function (idx, elm) {
        jQuery(this).attr('src', jQuery(this).attr('l1-src'));
    });
}
//set grid baccground position for skins
function alignSkin(adWidth, id1, id2) {
    var pageWidth = getPageSize()[2] - 16; //16 for scroll bar
    var homepageWidth = 1008;
    var emptySpaceOnSides = (pageWidth - homepageWidth) / 2;
    var offsetForAd = emptySpaceOnSides - adWidth;
    var ieVer = getIEVersion();
    //Hack for IE7/8
    if (ieVer > 0 && ieVer < 9) {
        offsetForAd = offsetForAd + 9;
    }
    jQuery(id1).css("right", "" + offsetForAd + "px");
    jQuery(id2).css("left", "" + offsetForAd + "px");
}

function RecordUsagePartnerLink(ip, userid, entityid, visitorid) {
    var url = "/utility.aspx?function=USAGE&usagetype=PartnerLink" + "&ip=" + ip + "&userid=" + userid + "&entityid=" + entityid + "&visitorid=" + visitorid;
    AjaxCall(url, RecordUsagePartnerLinkSuccess, RecordUsagePartnerLinkError);
}
function RecordUsagePartnerLinkSuccess(transport) {
}
function RecordUsagePartnerLinkError() {
}
function openEmbed(StoryURL, SquareURL) {
    if (ready) {
        AnalyticsCustomEvent("EmbedStory", "ButtonClick");
        doPopup("Embed.aspx?PageURL=" + StoryURL + "&ImageURL=" + SquareURL, 430, 360, -1, 100, false);
    }
    return false;
}
function DoSearch() {
    var searchType = jQuery('.RadioButtonSearch:checked').val();
    var searchQuery = jQuery('#SearchText').val();
    if (searchType == 'RadioButtonSearchNewser') {
        AnalyticsCustomEvent('Search', 'Newser', escape(searchQuery));
        var url = "/searchgoogle.aspx?q=" + escape(searchQuery) + "&cx=partner-pub-4045642288028027:t07eee3sqoq&cof=FORID%3A11&ie=ISO-8859-1";
        window.location = url;
    }
    else {
        AnalyticsCustomEvent('Search', 'Yippy', escape(searchQuery));
        var url = "http://search.yippy.com/search?query=" + escape(searchQuery) + "&tb=sitesearch-site-web&host=";
        window.open(url);
    }
}
