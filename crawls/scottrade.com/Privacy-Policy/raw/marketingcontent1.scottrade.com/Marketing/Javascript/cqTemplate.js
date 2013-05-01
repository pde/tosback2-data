/***************************************************************
* 
* This a combined js file mainly used by template code.
*
*  1. topnav drop-down menu
*  2. Omniture tracking code
*
**************************************************************/


/** 
* Topnav drop-down menu
*/
$(function () {

    var timeout    = 500;
    var closetimer = 0;
    var ddmenuitem = 0;

    function jsddm_open() {
        jsddm_canceltimer();
        jsddm_close();
        ddmenuitem = $(this).find('ul').css('visibility', 'visible');
    }

    function jsddm_open_a() {
        jsddm_canceltimer();
        jsddm_close();
        ddmenuitem = $(this).parent().find('ul').css('visibility', 'visible');
    }

    function jsddm_close()
    { if (ddmenuitem) ddmenuitem.css('visibility', 'hidden'); }

    function jsddm_timer()
    {  closetimer = window.setTimeout(jsddm_close, timeout);}
    
    function jsddm_canceltimer()
    {  if(closetimer)
       {  window.clearTimeout(closetimer);
          closetimer = null;}}
    
    $(document).ready(function()
    {  $('#dd-menu > li').bind('mouseover', jsddm_open)
       $('#dd-menu > li > a').bind('focus', jsddm_open_a)
       $('#dd-menu > li').bind('mouseout',  jsddm_timer)
       $('#dd-menu > li > a').bind('blur',  jsddm_canceltimer)});   
});

/**
* code to call omniture to track on a click on link
*/
function sTracklink(name) {
    if (typeof (s) !== 'undefined' && s && s.customTracklink) {
        s.customTracklink("events=event11|eVar46=Share:" + name + ":" + s.getPageName() + "", "Share");
    }
    googleAnalyticsEvent(name, "sTracklink");
}

/**
* code to call omniture to track
*/
function sCustomTrack(name) {
    if (typeof (s) !== 'undefined' && s && s.customTrack) {
        s.customTrack("pageName=" + s.getPageName() + ":" + name);
    }
    googleAnalyticsEvent(name, "sCustomTrack");
}

/**
* code to call omniture to track on a click on accordion section
*/
function sTrackAccordion(name) {
    if (typeof (s) !== 'undefined' && s && s.customTracklink) {
        s.customTracklink("prop16=" + s.getPageName() + " - " + name, "Accordion");
    }
    googleAnalyticsEvent(name, "sTrackAccordion");
}

/**
* code to call omniture to track on a click on Embed Video
*/
function sTrackEmbedVideo(name) {
    if (typeof (s) !== 'undefined' && s && s.customTracklink) {
        s.customTracklink("prop16=" + name + ":" + s.getPageName(), "EmbedVideo");
    }
    googleAnalyticsEvent(name, "sTrackEmbedVideo");
}


/**
* code to call omniture to track on RSS Feed:
*  1. NewsRelease; 2. Blog; 3. Photos
*/
function sTrackRSS(name) {
    if (typeof (s) !== 'undefined' && s && s.customTracklink) {
        s.customTracklink("events=event11|prop16=RSS:" + name + "|eVar46=RSS:" + name, "RSS");
    }
    googleAnalyticsEvent(name, "sTrackRSS");
}

/**
* omniture code for tracking share link clicks.
*/
function sTrackShare(name) {
    if (typeof (s) !== 'undefined' && s && s.customTracklink) {
        s.customTracklink("events=event11|prop16=share:" + name + ":" + s.getPageName() + "|eVar46=Share:" + name + ":" + s.getPageName() + "", "Share");
    }
    googleAnalyticsEvent(name, "sTrackShare");
}

function googleAnalyticsEvent(name, label) {
	if (this.event != undefined) {
		dataLayer.push({
			'event' : name,
			'elementId' : this.event.srcElement.id,
			'elementName' : this.event.srcElement.name,
			'elementClass' : this.event.srcElement.className,
			'elementType' : this.event.srcElement.localName,
			'elementTarget' : this.event.srcElement.title,
			'elementHref' : this.event.srcElement.href,
			'eventCategory' : this.event.srcElement.baseURI,
			'eventAction' : this.event.type,
			'eventLabel' : label,
			'eventValue' : this.innerWidth,
			'eventNonInt' : false
		});
	}
}
/**
 * MOD tracking for login button on home page.
 */
function loadWSODLoginScript() {
    var activityURL = "https://ad.wsod.com/activity/8bec9b10877d5d7fd7c0fb6e6a631357/11.img.activity/";
    var activityImageObject = new Image();
    activityImageObject.onload = function () { }
    activityImageObject.src = activityURL;
}

/**
* loading remessaging tag iframe for home page flood light.
*/
function loadDelayedItems() {
    var remessageURL = "https://scottrade.wsod.com/action/8bec9b10877d5d7fd7c0fb6e6a631357/35.iframe.action/";
    var remessageIframeObject = document.getElementById("remessageIframe");
    if (remessageIframeObject != null)
        remessageIframeObject.src = remessageURL;
}

var t = setTimeout(loadDelayedItems, 500);
