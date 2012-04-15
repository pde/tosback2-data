var availCheckDone = false;
var availCheckResponseText = "";
var partsServicesCheckDone = false;
var partsServicesCheckResponseText = "";
var numPolls = 0;
var maxPolls = 5;
var addressCounter = 0;
///////////////////////////////////////////////////////////
// 
///////////////////////////////////////////////////////////
function zipCodeValidator(zip) {

	var re5digit = /^\d{5}$/;
	
	if ( (zip.length == 5) && (re5digit.test(zip)) ) {
		
			return true;
	}
	
	return false;

}



function checkAvailabilityCallback(text) { 	 
	document.getElementById('appliance_fragment').innerHTML = text;	 
}

///////////////////////////////////////////////////////////
function checkAvailability (form) {
	doubleCheckAvailability(form, "avail");
}


function displayEditZipCodePIPErrorCallback(text) { 	 
	document.getElementById('appliance_fragment').innerHTML = text;	 
}

///////////////////////////////////////////////////////////
function displayEditZipCodePIPError(zipCode, storeId) {
   //change text to waiting image
   //note taglib can not be used in javascript because the page need to
   //be re-interpreted for them to be processed so all links must be 
   //hard-coded
   document.getElementById('pip-appliance-deliveryb1').innerHTML = '<img src=\"/static/images/layout/animationloader-1.png\" width=\"70\" height=\"10\" />';
   
   //set up to call ajax
   var url = '/webapp/wcs/stores/servlet/AOLPIPUndeliverableWrapperView?storeId='+storeId+'&zipCode='+zipCode;
   makeHttpRequest(url, 'displayEditZipCodePIPErrorCallback');
}

     
///////////////////////////////////////////////////////////
function psCheckAvailabilityCallback(text) { 	 
	document.getElementById('tab-parts_services').innerHTML = text; 
	// Start - WCS7UP - Code Merge_Apr20
	//Check if the div tag is present, else hide view parts button.
	if(text != null && text.indexOf('hdr-appliance-required-parts') > 0)
	{
		if(document.getElementById("grp_requiredParts") != null && typeof(document.getElementById("grp_requiredParts")) != "undefined")
		{	
			document.getElementById("grp_requiredParts").style.display = 'block';
		}
	}
	// End - WCS7UP - Code Merge_Apr20
}

///////////////////////////////////////////////////////////
function psCheckAvailability (form) {
//alert("psCheckAvailability");
 if (browser =='Microsoft Internet Explorer') {
 	
 	nickName = document.getElementById('nickName').value;
 	
 	if (nickName == 'APLNC') {
 		zipCode = document.getElementById('psZipCode').value;
 	} else {
 		zipCode = document.getElementById('zipCode').value;	
 	}
 	
 	 
 	modelNumber = document.getElementById('modelNumber').value;
 	vendorNumber = document.getElementById('vendorNumber').value;
 	classNumber = document.getElementById('classNumber').value;
 	subClassNumber = document.getElementById('subClassNumber').value;
  	storeId = document.getElementById('storeId').value;	
	productId = document.getElementById('productId').value;
  	
 } else {
 	nickName = form.nickName.value;
 	if (nickName == 'APLNC') {
 		zipCode = form.psZipCode.value;
 	} else {
 		zipCode = form.zipCode.value;
 		if(zipCode == undefined || zipCode == null)
 		{
  			zipCode = form.zipCodeHidden.value;
  		}
 	}
 	
 	 //alert("else zip code = "+zipCode);
 	
 	modelNumber = form.modelNumber.value;
 	vendorNumber = form.vendorNumber.value;
 	classNumber = form.classNumber.value;
 	subClassNumber = form.subClassNumber.value;
	storeId =form.storeId.value; 
	productId =form.productId.value; 
}
 
 if (zipCodeValidator(zipCode)) {  
   document.getElementById('tab-parts_services').innerHTML = '<img src=\"/static/images/pleasewait_3a.gif\" width=\"335\" height=\"65\" />';
 
   //set up to call ajax
   var url = '/webapp/wcs/stores/servlet/AOLPIPRelatedServicesLookup?storeId='+storeId+'&productId='+productId+'&zipCode='+zipCode+'&modelNumber='+modelNumber+'&vendorNumber='+vendorNumber+'&classNumber='+classNumber+'&subClassNumber='+subClassNumber;
   makeHttpRequest(url, 'psCheckAvailabilityCallback');
 }
 else {
   alert('zip code invalid');
 }
}
 

///////////////////////////////////////////////////////////
function doubleCheckAvailability (form, src) {
 if (browser =='Microsoft Internet Explorer') {
 	if(src && src == 'avail') {
 		zipCode = document.getElementById('zipCode').value;	
 	} else {
 		zipCode = document.getElementById('psZipCode').value;
 	}
 	modelNumber = document.getElementById('modelNumber').value;
 	vendorNumber = document.getElementById('vendorNumber').value;
 	classNumber = document.getElementById('classNumber').value;
 	subClassNumber = document.getElementById('subClassNumber').value;
  	storeId = document.getElementById('storeId').value;	
	productId = document.getElementById('productId').value;	
 } else {
 	if (src && src == 'avail') {
 		zipCode = form.zipCode.value;
 	} else {
 		zipCode = form.psZipCode.value;
 	}
 	
 	modelNumber = form.modelNumber.value;
 	vendorNumber = form.vendorNumber.value;
 	classNumber = form.classNumber.value;
 	subClassNumber = form.subClassNumber.value;
	storeId =form.storeId.value; 
	productId =form.productId.value; 
}
 
 
 if (zipCodeValidator(zipCode)) {  
	document.getElementById('tab-parts_services').innerHTML = '<img src=\"/static/images/pleasewait_3a.gif\" width=\"335\" height=\"65\" />';
	//document.getElementById('pip-appliance-deliveryb1').innerHTML = '<img style=\"float:left\" src=\"/static/images/layout/animationloader-1.png\" width=\"70\" height=\"10\" />';
 
   // initialize our working vars
   availCheckDone = false;
   partsServicesCheckDone = false;
   partsServicesCheckResponseText = "";
   availCheckResponseText = "";
   numPolls = 0;
   //var urlAvailability = '/webapp/wcs/stores/servlet/AOLProductAvailabilityLookup?storeId='+storeId+'&productId='+productId+'&zipCode='+zipCode+'&modelNumber='+modelNumber+'&vendorNumber='+vendorNumber+ '&URL=AOLProductAvailabilityLookupView';
   
   var urlPartsServices = '/webapp/wcs/stores/servlet/AOLPIPRelatedServicesLookup?storeId='+storeId+'&productId='+productId+'&zipCode='+zipCode+'&modelNumber='+modelNumber+'&vendorNumber='+vendorNumber+'&classNumber='+classNumber+'&subClassNumber='+subClassNumber;

   if(!isWebServiceExceptionOccurred()) {
	   //set up to call ajax
	   //makeHttpRequest(urlAvailability, 'dblCheckAvailabilityCallback'); 
	   makeHttpRequest(urlPartsServices, 'dblPsCheckAvailabilityCallback');
     $superPIP.getJSON_applianceCheckAvailability(zipCode); 
 	   
	   
   }
   else {
	   partsServicesCheckDone = true;
	   partsServicesCheckResponseText = "";
	   //(urlAvailability, 'dblCheckAvailabilityCallback'); 
   }
 }
 else {
   alert('zip code invalid');
 }
}


///////////////////////////////////////////////////////////
function dblPsCheckAvailabilityCallback(text) { 	 
	partsServicesCheckResponseText = text;
	partsServicesCheckDone = true;
	updatePIPElements();
	
}


///////////////////////////////////////////////////////////
function dblCheckAvailabilityCallback(text) { 	 
	availCheckResponseText = text;
	//alert("availCheckResponseText"+availCheckResponseText)
	availCheckDone = true;
	//updatePIPElements();
	
}


///////////////////////////////////////////////////////////
function updatePIPElements() {
	//if(availCheckDone && partsServicesCheckDone) {
	if(partsServicesCheckDone) {
	
		document.getElementById('tab-parts_services').innerHTML = partsServicesCheckResponseText; 
		//document.getElementById('appliance_fragment').innerHTML = availCheckResponseText;
	}
	else {
		numPolls++;
		if(numPolls <= maxPolls) {
			setTimeout('updatePIPElements()', 1000);
		}
		else {
			if(partsServicesCheckDone) {
				document.getElementbYId('tab-parts_services').innerHTML = partsServicesCheckResponseText;
			}
			else {
				var text = '<h5 class="tab-alt-heading"><a name="parts_services"><fmt:message key="ITEM_DISP_PARTS_SERVICES_TAB_TITLE" bundle="${storeText}" /></a></h5>';
				text +='    <p class="pip-appliance-tab-msg">';
				text +='					An error occurred retrieving parts and services.';
				text +='	</p>';
				document.getElementById('tab-parts_services').innerHTML = text;
			}


		}
	}
   // Added for Requirement# THD_WCS_007 - Add Omniture tracking on the Availability Check Page - Start
   var APP_AVAI_CHECK_VAL = '> appliance availability check';   
   callOmnitureFnc('' ,APP_AVAI_CHECK_VAL);  
   // Added for Requirement# THD_WCS_007 - Add Omniture tracking on the Availability Check Page - End 	
}

///////////////////////////////////////////////////////////
function PSStep0Submit(form) {//Used by Parts and Services Step 0 to display the please wait image until submit occurs
	if (zipCodeValidator(document.getElementById('zipCodeTextBoxId').value)) { 
		document.getElementById('appliance-check-cont').style.display = 'none';
		document.getElementById('appliance-check-cont-pleaseWait').style.display = 'block';
		form.submit(); 
	}
	else{
	alert("zip code invalid");
	}
			
}

///////////////////////////////////////////////////////////
function RelatedServicesCallback(text) { 	 	
 
	//add code to check data in the response 
	document.getElementById('psDisplayArea').innerHTML = text; 
	updatePartsServicesSelectedItems();
}


///////////////////////////////////////////////////////////
function RelatedServicesCheck (form) {
 
	zipCode = document.getElementById('zipCode').value; 	
 	modelNumber = document.getElementById('modelNumber').value;
 	vendorNumber = document.getElementById('vendorNumber').value;
 	classNumber = document.getElementById('classNumber').value;
 	subClassNumber = document.getElementById('subClassNumber').value;
 	storeId = document.getElementById('storeId').value;	
 	productId = document.getElementById('productId').value;
 
 if (zipCodeValidator(zipCode)) {   
    document.getElementById('psDisplayArea').innerHTML = '<img src=\"/static/images/pleasewait_3a.gif\" width=\"335\" height=\"65\" />';
    var url = '/webapp/wcs/stores/servlet/AOLPartsServicesLookup?storeId='+storeId+'&zipCode='+zipCode+'&productId='+productId+'&modelNumber='+modelNumber+'&vendorNumber='+vendorNumber+ '&classNumber='+classNumber+'&subClassNumber='+subClassNumber;
   makeHttpRequest(url, 'RelatedServicesCallback');
 } else {
   alert('zip code invalid');
 }
}


  
///////////////////////////////////////////////////////////
function DeliveryCalendarCallback(text) {
	//add code to check data in the response 
	document.getElementById('calendar-area').innerHTML = text; 

	var monthsLong =    ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
	var daysLong =    ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	
	var temp = document.getElementById('selectedDate').value;
	temp = temp.replace(/^\s+|\s+$/g, '') ;

	if (temp != null && temp != ""){
		tempParts = temp.split(" ");
		var date = tempParts[0]+","+monthsLong[tempParts[0]]+","+tempParts[1]+","+tempParts[2];

		dateParts = date.split(",");
		aDate = new Date(dateParts[3], dateParts[0], dateParts[2]);
		monthNum = aDate.getMonth();

		dayName = daysLong[aDate.getDay()];

		document.getElementById('dateSelected').innerHTML = dayName+", "+dateParts[1]+" "+dateParts[2]+" "+dateParts[3];
		document.getElementById('selectedDate').value = monthNum+" "+dateParts[2]+" "+dateParts[3];

		var calElems = document.getElementsByName('calElem_' + monthNum + '_' + dateParts[2]);
		if(calElems && calElems.length > 0) {
			for(var i = 0; i < calElems.length; i++) {
				calElems[i].className = 'selected-available';
			}

			var calPanelMonthsField = document.getElementById('monthPanels');
			if(calPanelMonthsField) {
				var calPanelMonths = calPanelMonthsField.value.split(",");
				var panelToDisplay = calPanelMonths[monthNum];
				if(panelToDisplay > -1) {
					NextMonth(0, panelToDisplay);
				}
			}
		}
		else {
			document.getElementById('dateSelected').innerHTML = '';
			document.getElementById('selectedDate').value = '';
		}
	}
}
///////////////////////////////////////////////////////////

function DeliveryCalendarCheck (form) {
if (browser =='Microsoft Internet Explorer') {
  	storeId = document.getElementById('storeId').value;	
  	orderId = document.getElementById('orderId').value;	
  	catalogId = document.getElementById('catalogId').value;	  	
} else {
 	storeId =form.storeId.value; 
 	orderId =form.orderId.value; 
 	catalogId =form.catalogId.value;  	 	
}
 
 document.getElementById('calendar-area').innerHTML = '<img src=\"/static/images/cart/pleasewait_3a.gif\" width=\"335\" height=\"65\" />';
 var url = '/webapp/wcs/stores/servlet/AOLDeliveryCalendarLookup?storeId='+storeId+'&orderId='+orderId+'&catalogId='+catalogId;
 makeHttpRequest(url, 'DeliveryCalendarCallback');
 
}

///////////////////////////////////////////////////////////
function DeliveryCalendarPagerCallback(text) { 	 	
	//add code to check data in the response 
	document.getElementById('calendar-area').innerHTML = text; 
}


///////////////////////////////////////////////////////////
function DeliveryCalendarPagerCheck (form) {
 
 
 document.getElementById('calendar-area').innerHTML = '<img src=\"/static/images/cart/pleasewait_3a.gif\" width=\"335\" height=\"65\" />';
 var url = '/webapp/wcs/stores/servlet/AOLDeliveryCalendarLookup?storeId='+storeId+'&orderId='+orderId+'&catalogId='+catalogId;
 makeHttpRequest(url, 'DeliveryCalendarCallback');
 
}

 
///////////////////////////////////////////////////////////
function RelatedServicesPagerCallback(text) { 	 	
 
	//add code to check data in the response 
	document.getElementById('appliance-parts-cont').innerHTML = text; 
}


///////////////////////////////////////////////////////////
function RelatedServicesPager (form) {
 
 if (browser =='Microsoft Internet Explorer') {
 	stepNumber = document.getElementById('nextStepNbr').value;
 	psvb = document.getElementById('partsServicesViewBean').value;
 } else {
  	stepNumber = form.nextStepNbr.value;
  	psvb =form.partsServicesViewBean.value;
 }
 
 // WCS7Up CodeMerge 4.5.2 Modified
 //alert('stepNbr = '+stepNumber);

document.getElementById('appliance-parts-cont').innerHTML = '<img src=\"/static/images/pleasewait_3a.gif\" width=\"335\" height=\"65\" />';
 var url = '/webapp/wcs/stores/servlet/AOLPartsServicesPageLoader?stepNumber='+stepNumber+'&partsServicesViewBean='+psvb;
makeHttpRequest(url, 'RelatedServicesPagerCallback');
 
}

///////////////////////////////////////////////////////////
function relatedServicesStart(form)
{
	if(!isWebServiceExceptionOccurred() && !partsServicesCheckDone) {
		if (browser =='Microsoft Internet Explorer') {
			nickName = document.getElementById('nickName').value;
		} else {
			nickName = form.nickName.value;
		}	
		if (nickName == 'APLNC') {
			displayCheckAvailabilityForm();
		} else {
			 psCheckAvailability (form);
		}  
	}
}

///////////////////////////////////////////////////////////
function displayCheckAvailabilityForm()
{
	var text = '';
	if(!isWebServiceExceptionOccurred()) {
		var zipCodeData = getApplianceZip();
				
		text = '<h5 class="tab-alt-heading"><a name="parts_services"><fmt:message key="ITEM_DISP_PARTS_SERVICES_TAB_TITLE" bundle="${storeText}" /></a></h5>';
		text +='<p class="pip-appliance-tab-msg">';
		text +='					Options are based on your area.  Please enter your zip code to learn about delivery dates, delivery information, installation, and options.';
		text +='				</p>';
		text +='				<div style="width: 100%;">';
		
		if (zipCodeData.zipCode == "") {
			text +='					<div style="float: left; width: 95px;"><input type="text" name="psZipCode" style="width: 95px;"  /></div>';	
		} else {
			text +='                    <a href="#" onclick="javascript:displayMessageDiv(\'aol-edit-zip\');">(edit)</a>';
			text +='					<div style="float: left; width: 95px;"><input type="text" name="psZipCode" style="width: 95px;" value="' + zipCodeData.zipCode +'" ' + (zipCodeData.disableField ? 'disabled' : '') + ' /></div>';
			document.OrderItemAddForm.zipCodeTxt.value = zipCodeData.zipCode;
			//Start - WCS7UP - Code Merge_Apr20
			if (getParameter("ddkey") != null && getParameter("ddkey")!= "Search"){				
				if(getParameter("zipCode")!=null && !getParameter("zipCode")==""){
					document.OrderItemAddForm.zipCodeTxt.value = getParameter("zipCode");
				       $superPIP.getJSON_applianceCheckAvailability(document.OrderItemAddForm.zipCodeTxt.value); 
				}
            		}
			//End - WCS7UP - Code Merge_Apr20 
			
		}
		text +='					<div style="float: left; display: inline; margin-left: 20px; width: 69px; margin-top: 1px;"><img style="cursor: pointer;cursor: hand;" src="/static/images/btn_check_green.gif" width="69" height="20" name="Check" alt="Check" onclick="doubleCheckAvailability(document.OrderItemAddForm);"/></div>';
		text +='					<div class="clr"><!--  --></div>';
		text +='				</div>';
		text +='				<div class="pip-appliance-area-msg" style="float:left;">Enter Delivery Zip Code to learn about Options for this item. </div>';
	}
	if(isMajorAppliance){
		document.getElementById('tab-parts_services').innerHTML = text; 
	}
}


//
function newAOLZipIsDiff(newZip) {
	var aolCookieVal = getAOLCookieZipCode();
	if (newZip == aolCookieVal)
		return false;
	else
		return true;
}


///////////////////////////////////////////////////////////
function prePopulateZipCode(form, id, addHiddenField) {
	form.zipCode.focus();
	var zipCodeData = getApplianceZip();

	if(zipCodeData.zipCode != "") {
		form.zipCode.disabled = zipCodeData.disableField;
		form.zipCode.value = zipCodeData.zipCode;

		var textSpan = document.getElementById(id);
		// WCS7Up CodeMerge 4.5.2 STARTS
		//code commented for Defect #8709: to remove edit link on part ans services page
		//if(textSpan) {
		//	textSpan.innerHTML += " <a href=\"#\" onclick=\"javascript:displayMessageDiv('aol-edit-zip');\">(edit)</a>";
		//}
		// WCS7Up CodeMerge 4.5.2 ENDS

		if(addHiddenField) {
			if(textSpan) {
				textSpan.innerHTML += "<input type=\"hidden\" name=\"zipCode\" value=\"" + zipCodeData.zipCode + "\" />";
			}
		}
	}
	else {
		form.zipCode.focus = true;
	}
}


///////////////////////////////////////////////////////////
function ApplianceZipData() {
	this.zipCode = "";
	this.disableField = false;
}

///////////////////////////////////////////////////////////
// NOTE: handles retrieving AOL zip from either the THD_AOL or THD_STRFINDERZIP crumbs
// NOTE: returns an ApplianceZipData object
// WCS7Up CodeMerge 4.5.2 Modified
function getApplianceZip() {
	var retval = new ApplianceZipData();

	retval.zipCode = getAOLCookieZipCode();
	return retval;
}


///////////////////////////////////////////////////////////
// NOTE: handles only retrieving AOL zip from the THD_AOL cookie
function getAOLCookieZipCode() {
	var retval = "";

	var temp = readCookie("THD_AOL");
	if(temp != "") {
		retval = temp.split(",")[0];
		if(!zipCodeValidator(retval)) {
			retval = "";
		}
	}

	return retval;
}


///////////////////////////////////////////////////////////
function getAOLCookieErrorCode() {
	var retval = "";

	var temp = readCookie("THD_AOL");
	if(temp != "") {
		var tempSplit = temp.split(",");
		if(tempSplit.length >= 3) {
			retval = tempSplit[2];
		}
	}

	return retval;
}


///////////////////////////////////////////////////////////
function isWebServiceExceptionOccurred() {
	var retval = false;

	if(getAOLCookieErrorCode() != "" && getAOLCookieErrorCode() != "0") {
		retval = true;
	}

	return retval;
}
///////////////////////////////////////////////////////////
function populateAddress(counter){

var storedAddressID;
//if (browser =='Microsoft Internet Explorer') {
 	storedAddressID = document.getElementById('storedAddressId_'+counter).value;	
 	storeId = document.getElementById('storeId').value;	
/* } else {
	storedAddressID = form.storedAddressId.value;
	storeId =form.storeId.value; 	
 }*/
 addressCounter = counter;

if(storedAddressID != ''){
   var url = '/webapp/wcs/stores/servlet/AOLAddressLookUp?storeId='+storeId+'&storedAddressId='+storedAddressID;
   makeHttpRequest(url, 'populateAddressCallback');
} 	
}
////////////////////////////////////////////////////////////
function populateAddressCallback(text){

var address = eval('('+text+')');


	document.getElementById('firstName_'+ addressCounter).value = address.firstName;
	document.getElementById('lastName_'+ addressCounter).value = address.lastName;
	document.getElementById('address1_'+ addressCounter).value = address.address1;
	if(document.getElementById('address2_'+ addressCounter) != null){
		document.getElementById('address2_'+ addressCounter).value = address.address2;
	}
	
	document.getElementById('city_'+ addressCounter).value = address.city;
	document.getElementById('state_'+ addressCounter).value = address.state;
	document.getElementById('zipCode_'+ addressCounter).value = address.zipCode;
	document.getElementById('fieldphone1_'+ addressCounter).value = address.fieldphone1;
	document.getElementById('fieldphone2_'+ addressCounter).value = address.fieldphone2;
	document.getElementById('fieldphone3_'+ addressCounter).value = address.fieldphone3;
	
	if(document.getElementById('altfieldphone1_'+ addressCounter) != null){
		document.getElementById('altfieldphone1_'+ addressCounter).value = address.altfieldphone1;
		document.getElementById('altfieldphone2_'+ addressCounter).value = address.altfieldphone2;
		document.getElementById('altfieldphone3_'+ addressCounter).value = address.altfieldphone3;
	}
	
	if(document.getElementById('applAddress') != null){
		var applAddress = address.firstName+" "+address.lastName+"<br/>"+address.address1;
		
		if(address.address2 != ''){
			applAddress = applAddress+"<br/>"+address.address2;
		}
		
		applAddress = applAddress+"<br/>"+address.city+", "+address.state+" "+ address.zipCode
						+"<br/>"+(address.fieldphone1)+" "+address.fieldphone2+"-"+address.fieldphone3;
		
		if(address.altfieldphone1 != ''){
			applAddress =	applAddress+"<br/>"+(address.altfieldphone1)+" "+address.altfieldphone2+"-"+address.altfieldphone3
		}
		
		document.getElementById('applAddress').innerHTML = applAddress;
	}	
	
	


}

function getParameter(paramName) {
  var searchString = window.location.search.substring(1),i, val, params = searchString.split("&");

  for (i=0;i<params.length;i++) {
    val = params[i].split("=");
    if (val[0] == paramName) {
      return unescape(val[1]);
    }
  }
  return null;
}

