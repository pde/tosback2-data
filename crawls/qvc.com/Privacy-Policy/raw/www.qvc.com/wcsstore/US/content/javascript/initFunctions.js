/*
Script: initFunctions.js
version: v1.0.8
*/

function initFunctions(){
	//setSignOut();
	
	// initOperators is used to show the various tables on the Order Status page.
	// It is only there for demonstration purposes and should be removed from all live code.
	//initOperators();
	
	// get_children searches the page for a specific class that needs to have rounded borders;
	// then puts the rounded borders on.
	

	if (document.body.className.match(new RegExp('(\\s|^)'+'myAccountEmailServices'+'(\\s|$)'))){
		var allCheckBoxes = getElementsByClass( "cb" );
		var cbUnselectAllEmailSubscriptions = document.getElementById("cbUnselectAllEmailSubscriptions");
		for (i=0; i<allCheckBoxes.length; i++) {
			if ( cbUnselectAllEmailSubscriptions != allCheckBoxes[i] ){
				
				if (document.addEventListener){
					allCheckBoxes[i].addEventListener("click", checkEachCheckBox, false);
				}else {
					allCheckBoxes[i].attachEvent("onclick", checkEachCheckBox);
				}
				
			}
		}		
	}
	
	var rbExchangeItem = document.getElementById("rbExchangeItem");
	var divExchange = document.getElementById("divExchange");
	if ( rbExchangeItem != null && divExchange != null ){
		displayColorSize();
		changeRecieveReturnConfirmation();
		var rbRefundMethod = document.getElementsByName("rbRefundMethod");
		for (i=0; i<rbRefundMethod.length; i++) {
			if (document.addEventListener){
				rbRefundMethod[i].addEventListener("click", displayColorSize, false);
			}else {
				rbRefundMethod[i].attachEvent("onclick", displayColorSize);
			}		
		}	
	}
	
	/* Rajib- this is not required since order team is handling in page itself 
	var rbNewPaymentMethod = document.getElementsByName("rbNewPaymentMethod");
	if ( rbNewPaymentMethod != null && rbNewPaymentMethod.length > 0 ){
		if (document.body.className.match(new RegExp('(\\s|^)'+'checkoutStep3'+'(\\s|$)'))){
			checkSelectedPaymentMethod();
		}else {
			checkMyAccountSelectedPaymentMethod();
		}
	}
	*/
	
	var cbGiftCard = document.getElementById("cbGiftCard");
	if ( cbGiftCard != null ){
		 checkGiftCardSelection();
	}
	
	var allTags = $$(".stripeTable");
	for (i=0; i<allTags.length; i++) {
		stripe(allTags[i]);
	}
	
	if (document.getElementById("fade") != null) {
 		var fade = new Fade('fade', '#ffff99', '#fff', 20, 100, 0);
 		fade.init();
	}
	
	var imgFound = false;
	$$('#divProductDetailViewThumbnailsImages a img').each(function(img){
		img.setStyle("border", "2px solid #e4e2e3");
		var imgsrc = img.src;
            if(imgsrc.contains(MainImageUrl)){
                        setSelected(img); 
                        imgFound = true;  
                  }
            
	});
	if(imgFound == false && $$('#divProductDetailViewThumbnailsImages a img')[0]){
                  setSelected($$('#divProductDetailViewThumbnailsImages a img')[0]);
             }
}

function getElementRounded(elementClassName, level){
	return true;
	retValue = false;
	for(var i=0; i<level.childNodes.length; i++){
	  if(level.childNodes[i].className == elementClassName ){
		  return true;
	  }
	  if(level.childNodes[i].hasChildNodes){
		  if (!retValue){ retValue = getElementRounded(elementClassName, level.childNodes[i]);}
	  }
	}
	return retValue;
}

function setSignOut(){
	if(( qvcgc("QSV").length != 0 ) || ( qvcgc("QCS").length > 1 ) )
	{
		var elem = document.getElementById("spanSignOut");
		if ( elem != null ){
			elem.innerHTML= '<a href="">Register</a> (<a href="">Sign In</a>)<span class="spanDivider">|</span>' ;
		}
	}
}

function qvcgc(N){
	var s=N+"=";var rv="";
	if(document.cookie.length>0){
	var o=document.cookie.indexOf(s);
	if(o!=-1){o+=s.length;var e=document.cookie.indexOf(";",o);if(e==-1)e=document.cookie.length;rv=unescape(document.cookie.substring(o,e));}
	}
//	return rv;
// TO DO: Be sure to uncomment "return rv;" and remove "return "test";" before this files goes into production
	return "test";
}
			
function checkSelectedPaymentMethod() {
	chosenPaymentMethod = ""
	len = document.getElementsByName("rbNewPaymentMethod").length
	for (i = 0; i <len; i++) {
	if (document.getElementsByName("rbNewPaymentMethod")[i].checked) {
		chosenPaymentMethod = document.getElementsByName("rbNewPaymentMethod")[i].value;
		}
		
	}
	
	if (chosenPaymentMethod == "") {
		document.getElementById('trEnterNewCard-2').style.display = "none";
		document.getElementById('trCvvNeeded1-2').style.display = "none";	
		document.getElementById('trExpiredCard1-2').style.display = "none";	
		document.getElementById('trBillMeLaterRow-2').style.display = "none";
		document.getElementById('btnSubmitChanges').value = "Continue Checkout";
	}
	else if (chosenPaymentMethod == "rbNewCard") {
		document.getElementById('trEnterNewCard-2').style.display = ""; //table-row
		document.getElementById('trCvvNeeded1-2').style.display = "none";	
		document.getElementById('trExpiredCard1-2').style.display = "none";	
		document.getElementById('trBillMeLaterRow-2').style.display = "none";
		document.getElementById('btnSubmitChanges').value = "Continue Checkout";
	}
	
	else if (chosenPaymentMethod == "rbBillLater") {
		
		document.getElementById('trEnterNewCard-2').style.display = "none";
		document.getElementById('trCvvNeeded1-2').style.display = "none";	
		document.getElementById('trExpiredCard1-2').style.display = "none";	
		document.getElementById('trBillMeLaterRow-2').style.display = "";
		document.getElementById('btnSubmitChanges').value = "I Agree and Continue";
	}
	
	else if (chosenPaymentMethod == "rbMasterCard") {
		document.getElementById('trEnterNewCard-2').style.display = "none";
		document.getElementById('trCvvNeeded1-2').style.display = ""; //table-row
		document.getElementById('trExpiredCard1-2').style.display = "none";	
		document.getElementById('trBillMeLaterRow-2').style.display = "none";
		document.getElementById('btnSubmitChanges').value = "Continue Checkout";
	}
	
	else if (chosenPaymentMethod == "rbVisa") {
		
		document.getElementById('trEnterNewCard-2').style.display = "none";
		document.getElementById('trCvvNeeded1-2').style.display = "none";
		document.getElementById('trExpiredCard1-2').style.display = ""; //table-row
		document.getElementById('trBillMeLaterRow-2').style.display = "none";
		document.getElementById('btnSubmitChanges').value = "Continue Checkout";
	}
	
	else {
		document.getElementById('trEnterNewCard-2').style.display = "none";
		document.getElementById('trCvvNeeded1-2').style.display = "none";	
		document.getElementById('trExpiredCard1-2').style.display = "none";	
		document.getElementById('trBillMeLaterRow-2').style.display = "none";
		document.getElementById('btnSubmitChanges').value = "Continue Checkout";
	}
}

function checkMyAccountSelectedPaymentMethod() {
	chosenPaymentMethod = ""
	len = document.getElementsByName("rbNewPaymentMethod").length
	for (i = 0; i <len; i++) {
	if (document.getElementsByName("rbNewPaymentMethod")[i].checked) {
		chosenPaymentMethod = document.getElementsByName("rbNewPaymentMethod")[i].value;
		}
		
	}
	
	if (chosenPaymentMethod == "") {
		document.getElementById('trEnterNewCard-2').style.display = "none";
		document.getElementById('trCvvNeeded1-2').style.display = "none";	
		document.getElementById('trExpiredCard1-2').style.display = "none";	
		document.getElementById('trBillMeLaterRow-2').style.display = "none";
		document.getElementById('btnSubmitChanges').value = "Continue Checkout";
	}
	else if (chosenPaymentMethod == "rbNewCard") {
		document.getElementById('trEnterNewCard-2').style.display = "inline";	
		document.getElementById('trEnterNewCard-2').style.display = "table-row";
		document.getElementById('trCvvNeeded1-2').style.display = "none";	
		document.getElementById('trExpiredCard1-2').style.display = "none";	
		document.getElementById('trBillMeLaterRow-2').style.display = "none";
		document.getElementById('btnSubmitChanges').value = "Continue Checkout";
	}
	
	else if (chosenPaymentMethod == "rbBillLater") {
		
		document.getElementById('trEnterNewCard-2').style.display = "none";
		document.getElementById('trCvvNeeded1-2').style.display = "none";	
		document.getElementById('trExpiredCard1-2').style.display = "none";	
		document.getElementById('trBillMeLaterRow-2').style.display = "inline";	
		document.getElementById('trBillMeLaterRow-2').style.display = "";
		document.getElementById('btnSubmitChanges').value = "I Agree and Continue";
	}
	
	else if (chosenPaymentMethod == "rbMasterCard") {
		document.getElementById('trEnterNewCard-2').style.display = "none";
		document.getElementById('trCvvNeeded1-2').style.display = "inline";	
		document.getElementById('trCvvNeeded1-2').style.display = "table-row";
		document.getElementById('trExpiredCard1-2').style.display = "none";	
		document.getElementById('trBillMeLaterRow-2').style.display = "none";
		document.getElementById('btnSubmitChanges').value = "Continue Checkout";
	}
	
	else if (chosenPaymentMethod == "rbVisa") {
		document.getElementById('trEnterNewCard-2').style.display = "none";
		document.getElementById('trCvvNeeded1-2').style.display = "none";	
		document.getElementById('trExpiredCard1-2').style.display = "inline";	
		document.getElementById('trExpiredCard1-2').style.display = "table-row";
		document.getElementById('trBillMeLaterRow-2').style.display = "none";
		document.getElementById('btnSubmitChanges').value = "Continue Checkout";
	}
	
	else {
		document.getElementById('trEnterNewCard-2').style.display = "none";
		document.getElementById('trCvvNeeded1-2').style.display = "none";	
		document.getElementById('trExpiredCard1-2').style.display = "none";	
		document.getElementById('trBillMeLaterRow-2').style.display = "none";
		document.getElementById('btnSubmitChanges').value = "Continue Checkout";
	}
}
			

function checkGiftCardSelection() {
	if (document.getElementById('cbGiftCard').checked == true) {
		document.getElementById('divQvcGiftCardEntry').style.display = "block";	
	}
	else {
		document.getElementById('divQvcGiftCardEntry').style.display = "none";
	}
}

// Commented out to resolve a PCI compliance issue.
/*function setAsTopWindow(){
	try
	{
		if (self != top) 
		{
			top.location.replace(location.href);
		} 
	}
	catch(er)
	{ } 
}
*/

