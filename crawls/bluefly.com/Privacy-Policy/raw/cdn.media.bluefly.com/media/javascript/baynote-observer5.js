/* Last updated: 11/12/2009 */
function bn_isNotEmpty(name) {
	return (name != null) && (name != "");
}
function bn_getOrderInfo() {
	if (typeof(bnOrderId) != "undefined" && bn_isNotEmpty(bnOrderId))
		baynote_tag.attrs.purchaseId = bnOrderId;
	if (typeof(bnOrderTotal) != "undefined" && bn_isNotEmpty(bnOrderTotal))
		baynote_tag.attrs.totalPurchases = parseFloat(bnOrderTotal);
	if (typeof(bnOrderDetails) != "undefined" && bn_isNotEmpty(bnOrderDetails))
		baynote_tag.attrs.purchaseDetails = bnOrderDetails;
}

function bn_showObserver() {	
	bn_customerId = "bluefly";	
	bn_code = "www";
	var bn_locHref = window.location.href;
	if (bn_locHref.indexOf("https://") == 0) {
		baynote_tag.server = "https://" + bn_customerId + "-" + bn_code + ".baynote.net";
	} else {
		baynote_tag.server = "http://" + bn_customerId + "-" + bn_code + ".baynote.net";
	}
	baynote_tag.customerId = bn_customerId;
	baynote_tag.code = bn_code;
	baynote_tag.type = "baynoteObserver";	
	baynote_globals.cookieDomain = "bluefly.com";	 
	bn_getOrderInfo();	
	baynote_tag.exitConfirmation = bn_onClickHandler;
	baynote_tag.show();
	bnResourceManager.waitForResource("Policy", "bn_checkPolicy()");
}


function computePageURL(){
	var head_tag  = document.getElementsByTagName('head')[0];
	var link_tags = head_tag.getElementsByTagName('link');
		for ( var i=0; i<link_tags.length; i++ ) {
			if ( link_tags[i].getAttribute('rel').toLowerCase() == 'canonical' ){
				var url = 'http://www.bluefly.com' + link_tags[i].getAttribute('href');
				return url;
			}
		}
	return window.location.href;
	}	
	baynote_tag.url = computePageURL();
	
if (typeof(baynote_tag)!="undefined") {
	bn_showObserver();
}

function bn_onClickHandler(clickedElement, exitInfo) {
	var bn_location_href = window.location.href;
	if(typeof(bnObserver) != 'undefined' && typeof(bnObserver.defaultExitConfirmation) != 'undefined') {
			exitResult = bnObserver.defaultExitConfirmation(clickedElement,exitInfo);
	}
	if(clickedElement) {
		
		bn_clicked_url = clickedElement.parentNode.href;
		

		if (bn_isNotEmpty(clickedElement.tagName) && clickedElement.tagName == "IMG" && clickedElement.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.className == "promoBox" ){
		var endHtml = bn_location_href.lastIndexOf('/');
		var subEnd = bn_location_href.indexOf('.fly');
		exitInfo.attrs = new Object();
		exitInfo.attrs.nonBnGuide = 'true';
		exitInfo.baynote_bnrank = "1";
		exitInfo.baynote_guide = "blueflyGuide";
		exitInfo.baynote_req = bn_location_href.substring(endHtml+1,subEnd)+ ".fly";
		}else if (bn_isNotEmpty(clickedElement.tagName) && clickedElement.tagName == "A" && clickedElement.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.className == "promoBox" ){
		var endHtml = bn_location_href.lastIndexOf('/');
		var subEnd = bn_location_href.indexOf('.fly');
		exitInfo.attrs = new Object();
		
		exitInfo.attrs.nonBnGuide = 'true';
		exitInfo.baynote_bnrank = "1";
		exitInfo.baynote_guide = "blueflyGuide";
		exitInfo.baynote_req = bn_location_href.substring(endHtml+1, subEnd) + ".fly";
		}
								
	}
		
		return exitResult;
}

/*
 * baynote_policyLoaded
 *
 * Once the policy has loaded, check to see if the guide
 * is showing.  If not, show the default guide.
 
function baynote_policyLoaded()
{
   if (bnPolicy.get("guide","ok"))
   {
      if(document.getElementById("productCrossSellBox")) 
		(document.getElementById("productCrossSellBox")).style.display = "block";
	  if(document.getElementById("productMostWanted"))
		(document.getElementById("productMostWanted")).style.display = "none";
   } else {
	  if(document.getElementById("productMostWanted"))
		(document.getElementById("productMostWanted")).style.display = "block";
      if(document.getElementById("productCrossSellBox")) 
		(document.getElementById("productCrossSellBox")).style.display = "none";
   }
}*/

function bn_setCookie(c_name,c_value,c_domain,expiredays) {
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	if (c_domain != null && c_domain != "") {
		document.cookie = c_name+"="+escape(c_value)+";domain="+c_domain+";path=/"+((expiredays==null)?"":";expires="+exdate.toGMTString());
	} else {
		document.cookie = c_name+"="+escape(c_value)+";path=/"+((expiredays==null)?"":";expires="+exdate.toGMTString());
	}
}
function bn_checkPolicy() {
	if (bnPolicy.get("inf","cd") != null) {
		var cdValue = bnPolicy.get("inf","cd");
		
	    bn_setCookie('bn_cd',cdValue,baynote_globals.cookieDomain,90);
	} 
	 bn_policyLoaded = true;
}

