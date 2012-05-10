//Most of this code comes from Brightcove. It does not play well in a OO format.

var player;
var modVP;
var modExp;
var companionAds;
var companionUrl;
var clickThruUrl;
 
function myTemplateLoaded(experienceID) {
    player = brightcove.api.getExperience(experienceID);
    modVP = player.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);
    modExp = player.getModule(brightcove.api.modules.APIModules.EXPERIENCE);
    modExp.addEventListener(brightcove.api.events.ExperienceEvent.TEMPLATE_READY, onTemplateReady);
}
 
function onTemplateReady(evt) {
    modVP.addEventListener(brightcove.api.events.MediaEvent.BEGIN, onMediaEventFired);
}

//Note: Brightcove players call this function by name. We can't change it.
function slateAdHandler(xml, expId){
	companionAds = getXMLDoc(xml);
	companionUrl = $(companionAds).find('StaticResource').first().text();
	clickThruUrl = $(companionAds).find('CompanionClickThrough').first().text();
	var a = $(document.createElement('a'));
	a.attr('href', clickThruUrl);
	a.attr('target', '_blank');
	var img = $(document.createElement('img'));
	img.attr('src', companionUrl);
	a.append(img);
	var cadDiv = $('#tsg-cad-' + expId);
	if(cadDiv.contents()){
		cadDiv.empty();
	}
	cadDiv.append(a);
	cadDiv.slideDown('slow');
	
	a.click(function(){
		modVP.pause();
	});
}

function closeAd(expId){
	var cadDiv = $('#tsg-cad-' + expId);
	cadDiv.slideUp('slow');
	cadDiv.empty();
}

//Util function, code provided by Brightcove
function getXMLDoc(pXML){
	var adXML;
	if (window.ActiveXObject){ //parses the XML for IE browsers
	   adXML = new ActiveXObject("Microsoft.XMLDOM");
	   adXML.async = false; 
	   adXML.loadXML(pXML);
	} else //parses the XML for Mozilla browsers
	if (window.XMLHttpRequest) {
		adXML = (new DOMParser()).parseFromString(pXML, "text/xml");
	}
	return adXML;
}

