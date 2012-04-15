/*
 * Baynote Observer for urbanoutfitters.com
 * Last updated: April 3, 2009

function bn_isNotEmpty(name) {
	return (name != null) && (name != "");
}
function bn_getTotalPurchases() {
	if (typeof(bnOrderId) != "undefined" && bn_isNotEmpty(bnOrderId))
		baynote_tag.attrs.purchaseId = bnOrderId;
	if (typeof(bnOrderTotal) != "undefined" && bn_isNotEmpty(bnOrderTotal))
		baynote_tag.attrs.totalPurchases = parseFloat(bnOrderTotal);
	if (typeof(bnOrderDetails) != "undefined" && bn_isNotEmpty(bnOrderDetails))
		baynote_tag.attrs.purchaseDetails = bnOrderDetails;
}
function bn_showObserver() {
	var bn_locHref = window.location.href;
	if (bn_locHref.indexOf("https://") == 0) {
		baynote_tag.server = "https://urbanout-www.baynote.net";
	} else {
		baynote_tag.server = "http://urbanout-www.baynote.net";
	}
	baynote_tag.customerId = "urbanout";
	baynote_tag.code = "www";
	baynote_tag.type = "baynoteObserver";
	baynote_globals.cookieDomain = "urbanoutfitters.com";
	baynote_tag.exitConfirmation = bn_onClickHandler;
	bn_getTotalPurchases();
	baynote_tag.show();
}
if (typeof(baynote_tag)!="undefined") {
	bn_showObserver();
}

function bn_onClickHandler(clickedElement, exitInfo) {


	if(typeof(bnObserver) != 'undefined' && typeof(bnObserver.defaultExitConfirmation) != 'undefined') {
			exitResult = bnObserver.defaultExitConfirmation(clickedElement,exitInfo);
		}
if(clickedElement) {
bn_cross_sell = 'cross-sell';
bn_guide_param = 'guide-bn';
bn_clicked_url = clickedElement.parentNode.href;
bn_cross_sell_value = bn_getUrlParam(bn_cross_sell, bn_clicked_url);
bn_is_bnguide = bn_getUrlParam(bn_guide_param, bn_clicked_url);

if (bn_isNotEmpty(clickedElement.tagName) && clickedElement.tagName == "IMG" && bn_cross_sell_value!= 'undefined' && bn_cross_sell_value == 'true' && bn_is_bnguide== '') {
exitInfo.attrs = new Object();
exitInfo.attrs.nonBnGuide = 'true';
exitInfo.baynote_bnrank = "1";
exitInfo.baynote_guide = "uoGuide";
exitInfo.baynote_req = "uoGuide";
		}
								
	}
		return exitResult;
}

function bn_getUrlParam(name, url) {
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp(regexS,"i");
	var results = regex.exec(url);
	if(results == null)
		return "";
	else
		return unescape(results[1]);
}
 */