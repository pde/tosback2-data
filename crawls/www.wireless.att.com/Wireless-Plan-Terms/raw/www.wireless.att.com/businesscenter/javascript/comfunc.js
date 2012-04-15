/**
 Function: Function will submit email address to servlet email campaign collector
 
 Required input is formObj as defined:
 formName: This is the name of the form being submitted from (REQUIRED)
 campaignName: This is the unique campaign name (REQUIRED)
 bref: Associated BREF
 domain: Domain to foward to
 errorURL: URL for OnError redirect, NOTE: do not include domain (REQUIRED)
 successURL: URL for OnSuccess redirect, NOTE: do not include domain (REQUIRED)
 textElement: ID of element that contains the email (REQUIRED)
 */
function onSubmitEmailNotify(formObj) {
    // These params are passed into the MarketingProductInterest Servlet - they are pulled out here for easy changing.
    if(!formObj) { return false; }
    var campaign = formObj.campaignName;
    var bref = formObj.bref;
    var domain = formObj.domain;
    var errorUrl = domain + formObj.errorURL;
    var successUrl = domain + formObj.successURL;
    var domain = "https://www.wireless.att.com/MarketingProductInterest.dyn";
    var emailAddr= document.getElementById(formObj.textElement).value;
    // The params from above are built into a full URL here (don't need to change anything below here)
    var strUrl = domain + "?emailAddr=" + emailAddr +  "&campaign=" + campaign + "&bref=" + bref + "&errorUrl=" + errorUrl + "&successUrl=" + successUrl;
    eval("document." + formObj.formName + ".action = strUrl;");
    eval("document." + formObj.formName + ".submit();");
}

/**
 Function: Function will submit email address to servlet and determine if user qualifies for Premier
 
 Required input is formObj as defined:
 formName: This is the name of the form being submitted from (REQUIRED)
 textElement: ID of element that contains the email (REQUIRED)
 bref: hold BREF
 */
function onSubmitCheckElgible(formObj) {
    if(!formObj) { return false; }
    var formName = formObj.formName;
    var txtField = formObj.textElement;
    var strUrl = window.open("https://www.wireless.att.com/IRUEmailDispatch.dyn?emailAddr=" + document.getElementById(txtField).value + "&bref=" + formObj.bref);
    return false;
    eval("document." + formObj.formName + ".action = strUrl;");
    eval("document." + formObj.formName + ".submit();");
}

function showTab(tabsArray,tabIndex) {
    showBlock(tabsArray[tabIndex]);
    var obj = null;
    for(var i=0;i<tabsArray.length;i++) {
		obj = document.getElementById(tabsArray[i] + "_tab");
		if(!obj) { return; }
		if(i!=tabIndex) {
			obj.className = "tab1";
			hideBlock(tabsArray[i]);
		}
		else {
			obj.className = "tab2";
		}
    }
    return false;
}

function dotComPopUp(theURL, theWidth, theHeight) {
	window.open(theURL, "", "width=" + theWidth + ", height=" + theHeight + ", resizable=1, scrollbars=1");
	 // for onclick handlers, so the parent page doesn't renavigate...
}
