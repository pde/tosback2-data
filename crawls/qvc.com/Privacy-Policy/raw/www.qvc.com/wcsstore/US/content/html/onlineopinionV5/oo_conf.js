/* OnlineOpinion v5.4.9 */
/* Released: 12/20/2011 */
/* Components: Full */
/* The following code is Copyright 1998-2011 Opinionlab, Inc.  All rights reserved. Unauthorized use is prohibited. This product and other products of OpinionLab, Inc. are protected by U.S. Patent No. 6606581, 6421724, 6785717 B1 and other patents pending. http://www.opinionlab.com */
/*Inline Feedback*/
var oo_inline = new OOo.Ocode({/* Configuration object goes here */});
/*Invitation Feedback*/
var oo_invite = new OOo.Invitation({
	pathToAssets: '/wcsstore/US/content/html/onlineopinionV5/' //update to local directory
	, responseRate: 5 //%
	, repromptTime: 2592000 //30 days 
	, promptDelay: 0
	, popupType: 'popunder'
	, newWindowSize: [545, 450]
	, friendlyDomains: ['http://www.qvc.com', 'http://qvc.com','http://iqvc.com', 'http://www.iqvc.com','https://quality-s.qvc.com']
	, referrerRewrite: {replacePattern: 'http://ecominvite.qvc.com'}
});
function neverShowMsg(){
	document.getElementById('oo_content').innerHTML = "<p>As you requested, our survey will no longer be presented to you on this computer.</p> <p>If you clear your cookies, use a different computer or browser, a survey may be presented to you again.</p> <p>Thank you for your understanding.</p> <div id=\"oo_buttons\"><input type=\"button\" class=\"primaryButton\" id=\"oo_close\" value=\"Close\" onclick=\"OOo.Invitation.hidePrompt()\" /></div>";
	OOo.createCookie('oo_inv_reprompt',1,157784630);
}
function cmOpinionClick(tag){
	if(typeof(CM_PageID) == "undefined") CM_PageID = "Unknown";
	cmCreateManualLinkClickTag('http://ecominvite.qvc.com?cm_sp=OPINIONLAB-_-SURVEY-_-'+tag, null, CM_PageID);
}
function cmOpinionEvent(action){
	cmCreateConversionEventTag('Customer', action, 'Survey', 0, 'null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-WSC');
}
function cmOpinionLoad(){cmOpinionEvent(1);}//fired by opinionlab when overlay is created