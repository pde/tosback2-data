var ANALYTICS_USER_TOKEN = "ANALYTICS_USER_TOKEN"; var BASE_SERVICE_URL = "http://analytics.newsinc.com/"
String.format = function(text) {
    if (arguments.length <= 1) { return text; }
    var tokenCount = arguments.length - 2; for (var token = 0; token <= tokenCount; token++) { text = text.replace(new RegExp("\\{" + token + "\\}", "gi"), arguments[token + 1]); }
    return text;
}; function GenerateUuid() {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''); var uuid = []; var r; uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'; uuid[14] = '4'; for (var i = 0; i < 36; i++) { if (!uuid[i]) { r = 0 | Math.random() * 16; uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r]; } }
    var d = new Date(); return uuid.join('') + d.getTime();
}
function SetAnalyticsCookie() {
    var cookieCheck = GetAnalyticsUserToken()
    if (cookieCheck == null) { var token = GenerateUuid(); SetCookie(ANALYTICS_USER_TOKEN, token, 30); return token; }
    else { return cookieCheck; } 
}
function GetAnalyticsUserToken() { return GetCookie(ANALYTICS_USER_TOKEN); }
function SavePageView(WidgetID, FullUrl, ParentUrl, SiteSectionID, AdNetworkID) { var token = SetAnalyticsCookie(); var wsUrl = BASE_SERVICE_URL + 'AnalyticsProvider/jsonp/analytics/PageViewJSONP?' + 'wid=' + WidgetID + '&uut=' + token + '&furl=' + FullUrl + '&purl=' + ParentUrl + '&ssid=' + SiteSectionID + '&anid=' + AdNetworkID; jsonp(wsUrl); }
function jsonp(url) { var script = document.createElement("script"); script.setAttribute("src", url); script.setAttribute("type", "text/javascript"); var head1 = document.getElementsByTagName("head")[0]; head1.appendChild(script); }
function Callback_SavePageView(data) { return; }
function SetCookie(sName, sValue, expiredays) {
    var exdate = new Date(); exdate.setDate(exdate.getDate() + expiredays); document.cookie = sName + "=" + escape(sValue) +
((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}
function GetCookie(sName) {
    var aCookie = document.cookie.split("; "); for (var i = 0; i < aCookie.length; i++) {
        var aCrumb = aCookie[i].split("="); if (sName == aCrumb[0])
            return unescape(aCrumb[1]);
    }
    return null;
}
function GetQueryStringValue(qs) {
    var qs = qs.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]"); var regexS = "[\\?&]" + qs.toLowerCase() + "=([^&#]*)"; var regex = new RegExp(regexS); var results = regex.exec(window.location.href.toLowerCase()); if (results == null)
    { return ""; }
    else
    { return results[1]; } 
}
<!-- Quantcast Audience Integration -->

quantSegs="";
function qc_results(result) {
	for (var i = 0; i < result.segments.length; i++) {
		quantSegs += "qcseg=" + result.segments[i].id + ";"; //customizable per your ad server
	}
}
function getQS(){
	return(quantSegs);	
}
jsonp("http://pixel.quantserve.com/api/segments.json?a=p-573scDfDoUH6o&callback=qc_results");
