


if (typeof audi_ngw === 'undefined') {
  audi_ngw = {};
}
if (typeof audi_ngw.cms === 'undefined') {
  audi_ngw.cms = {};
}
if (typeof audi_ngw.cms.usertracking === 'undefined') {
  audi_ngw.cms.usertracking = {};
}


audi_ngw.cms.usertracking.onCustomEvent = function(pParameters) {
  audi_ngw.cms.usertracking.sendCustomEvent(
      pParameters.eventType,
      pParameters.eventSourceUrl,
      audi_ngw.cms.usertracking.limitedUniqueString(pParameters.eventSourceTitle,100),
      pParameters.eventTargetUrl,
      audi_ngw.cms.usertracking.limitedUniqueString(pParameters.eventTargetTitle,100),
      pParameters.eventParameters,
      pParameters.eventUserId,
      pParameters.config
  );
};


audi_ngw.cms.usertracking.sendCustomEvent = function(pType, pSourceUrl, pSourceTitle, pTargetUrl, pTargetTitle, pParamters, pUserId, pConfig) {

  
  var eventType = pType;
  var eventSourceUrl = pSourceUrl;
  var eventSourceTitle = pSourceTitle;
  var eventTargetUrl = pTargetUrl;
  var eventTargetTitle = pTargetTitle;
  var eventParameters = pParamters;
  var eventUserId = pUserId;

  
  

  

  if (pConfig==null || pConfig.indexOf("Omniture=3")>=0) {
    if (typeof s_gi == "function") {
var s=s_gi("audiag222007");
s.linkTrackVars = "None";
s.linkTrackEvents = "None";
var eventLinkObject = {href:eventTargetUrl};
if (eventParameters!=null) {
for (var eventParamName in eventParameters) {
var eventParamValue = eventParameters[eventParamName];
if (eventParamName.indexOf("Omniture_")==0 && (typeof eventParamValue == "string" || typeof eventParamValue == "number")) {
eventParamName = eventParamName.substring(9);
if (eventParamName=="events") {
if (s.linkTrackEvents=="None") {s.linkTrackEvents = eventParamValue;} else {s.linkTrackEvents += "," + eventParamValue;}
}
if (s.linkTrackVars=="None") {s.linkTrackVars = eventParamName;} else {s.linkTrackVars += "," + eventParamName;}
s[eventParamName] = eventParamValue;
}
}
}
if (eventType=="PageLoad") {
if (eventSourceTitle!=null) { s.pageName=eventSourceTitle; 
 s.eVar37=s.pageName;}
if (eventSourceUrl!=null) { s.pageURL=eventSourceUrl; }
s.t();
}
else if (eventType=="LinkInternal") {
s.tl(eventLinkObject,"o",eventTargetUrl);
}
else if (eventType=="LinkExternal") {
s.tl(eventLinkObject,"e",eventTargetUrl);
}
else if (eventType=="LinkDownload") {
if (s.linkTrackVars=="None") {s.linkTrackVars = "events";} else {s.linkTrackVars += ",events";}
s.linkTrackEvents = "event4";
s.events = "event4";
s.tl(eventLinkObject,"d",eventTargetTitle);
}
}

  }

}


audi_ngw.cms.usertracking.limitedUniqueString = function(pPageTitle, pMaxLength) {
  var title = pPageTitle;
  if (title!=null && title.length > 100) {
    var hashCodeString = "_" + audi_ngw.cms.usertracking.generateHashCode(title);
    title = title.substring(0, 100 - hashCodeString.length) + hashCodeString;
  }
  return title;
}


audi_ngw.cms.usertracking.generateHashCode = function(pString) {
  var h = 0;
  if (pString!=null) {
	  var len = pString.length;
	  var maxNumber = Math.pow(2, 32);
	  for (var i = 0; i < len; i++) {
	    h = (31*h + pString.charCodeAt(i)) % maxNumber;
	  }
	}
  return h;
}


audi_ngw.config.onClickTrack = audi_ngw.cms.usertracking.onCustomEvent;
audi_ngw.config.onAjaxLoadTrack = audi_ngw.cms.usertracking.onCustomEvent;
