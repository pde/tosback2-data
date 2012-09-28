utilityBrowserVer = parseInt(navigator.appVersion, 10);

function SetCookie (name, value, expires, path, domain, secure) {
   // set time, it's in milliseconds
   var today = new Date();
   today.setTime( today.getTime() );

   // if the expires variable is set, make the correct
   // expires time, the current script below will set
   // it for x number of days, to make it for hours,
   // delete * 24, for minutes, delete * 60 * 24

   if (expires) {
      expires = expires * 1000 * 60 * 60 * 24;
   }

   var expires_date = new Date( today.getTime() + (expires) );
   document.cookie = name + "=" + escape (value) +
      ((expires) ? "; expires=" + expires_date.toGMTString() : "") +
      ((path) ? "; path=" + path : "") +
      ((domain) ? "; domain=" + domain : "") +
      ((secure) ? "; secure" : "");
}

function imgOn(imgName) {
	if (utilityBrowserVer >= 3) {
   	imgOnString = eval(imgName + "_on.src");
	   document.images[imgName].src = imgOnString;
   }
}

function imgOff(imgName) {
   if (utilityBrowserVer >= 3) {
      imgOffString = eval(imgName + "_off.src");
      document.images[imgName].src = imgOffString;
   }
}

function goToLink(address) {
   var linkURL = address.options[address.selectedIndex].value;
   window.top.location.href = linkURL;
   address.selectedIndex = 0;
}

function openWindow(address, width, height) {
   var newWindow = window.open(address, 'Popup_Window', 'width=' + width + ',height=' + height + ',toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=auto,resizable=no');
   newWindow.focus();
}

function openWindowScroll(address, width, height) {
   var newWindow = window.open(address, 'Popup_Window', 'width=' + width + ',height=' + height + ',toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=1,resizable=no');
   newWindow.focus();
}

function openWindow1(address, width, height,resize	) {
   var newWindow = window.open(address, 'Popup_Window', 'width=' + width + ',height=' + height + ',toolbar=yes,location=yes,directories=no,status=no,menubar=no,scrollbars=no,resizable='+resize);
   newWindow.focus();
}

function confirmWindow(url, text) {
   if (confirm(text)) {
      window.go = url;
      window.location = url;
   }
}

// Function to remove all non alpha numeric character except ('_' underscore  since it could be use to give predefined window names[_blabk, _top, _self,_media]) from a given string
// and return the modified string. If there are errors return the given string as is
function removeNonAlphaNumericChars(string) {
   if (typeof(string) != 'string') {
      return string;
   }

   var modifiedString = "";

   for(i = 0; i < string.length; i++) {
      var tempChar = string.charAt(i);

      if ((tempChar >= '0' &&  tempChar <= '9') ||
         (tempChar >= 'a' && tempChar <= 'z') ||
         (tempChar >= 'A' && tempChar <= 'Z') ||
         (tempChar == '_')) {

         modifiedString += tempChar;
      }
   }

   if (modifiedString != "") {
      return modifiedString;
   } else {
      return string;
   }
}

// This function launches a new web browser window to a specified width, height and features.
// Features string is a comma separated window's feature needed for this new window. For Instance
// If a new window needs a toolbar the feature string must be "toolbar" like needs scroll bar and
// and toolbar then it must be "toolbar,scrollbars". Note that the order of the feature is not required.
// Also it's case insensitive. Therefore, "scrollbars,toolbar" is identical to "Toolbar,ScrollBars".
//
// NOTE: By default window will be shown at center of screen, if you'd like to display it at a specific coordinates
//       pass the left and top properties as a feature string. For instance, to display a window at 100px on X and 100px on Y
//       set feature string as "left=100,top=100"
//
// If the features string is ommitted then all the features are turned off. To turn all the features on
// use the word "all" for features instead of specifying each feature.
//
// @address URL to open in new window
// @width width of new window in pixel. Defaults to 400 pixels.
// @height height of new window in pixel. Default to 350 pixels.
// @features feature string to have window features enable. Such as scrollbars,toolbars,menubars etc.
// @name string if new window to be named window.
// @retrun opened Window Instance.

function newWindow(address, width, height, features, name) {
   //Find out what features need to be enable

   if (features) {
      features = features.toLowerCase();
   } else {
      features = "";
   }

   if (!name) {
      name = "Popup_Window";
   }

   var toolbar = (features == "all" ? 1 : 0);
   var menubar = (features == "all" ? 1 : 0);
   var location = (features == "all" ? 1 : 0);
   var directories = (features == "all" ? 1 : 0);
   var status = (features == "all" ? 1 : 0);
   var scrollbars = (features == "all" ? 1 : 0);
   var resizable = (features == "all" ? 1 : 0);

   if (typeof(width) != "number") {
      width = 400;
   }

   if (typeof(height) != "number") {
      height = 350;
   }

   var left = ("left=" + ((screen.width-width) / 2));
   var top = ("top=" + ((screen.height-height) / 2));

   if (features != "all") {
      //split features
      var feature = features.split(",");

      for(i = 0; i < feature.length; i++) {
         if (feature[i] == "toolbar") {
            toolbar = 1;
         } else if (feature[i] == "menubar") {
            menubar = 1;
         } else if (feature[i] == "location") {
            location = 1;
         } else if (feature[i] == "directories") {
            directories = 1;
         } else if (feature[i] == "status") {
            status = 1;
         } else if (feature[i] == "scrollbars") {
            scrollbars = 1;
         } else if (feature[i] == "resizable") {
            resizable = 1;
         } else if (feature[i].indexOf("left=") != -1) {
            left = feature[i];
         } else if (feature[i].indexOf("top=") != -1) {
            top = feature[i];
         }
      }
   }

   features = "toolbar=" + toolbar + ",";
   features += "menubar=" + menubar + ",";
   features += "location=" + location + ",";
   features += "directories=" + directories + ",";
   features += "status=" + status + ",";
   features += "scrollbars=" + scrollbars + ",";
   features += "resizable=" + resizable + ",";
   features += left + "," + top;
   var thisWindow = window.open(address, removeNonAlphaNumericChars(name), 'width=' + width + ',height=' + height + ',"' + features + '"');
   thisWindow.focus();
   return thisWindow;
}

// Function to trim spaces from left part of string

function ltrim(str) {
   if (typeof(str) != 'string') {
      return str;
   }

   return str.replace(/^\s+/,'');
}

// Function to trim spaces from right part of string
function rtrim(str) {
   if (typeof(str) != 'string') {
      return str;
   }

   return str.replace(/\s+$/,'');
}

// Function to trim spaces from left and right part of a string
function trim(str) {
   return ltrim(rtrim(str));
}

function hideElement(elementName) {
	if (document.getElementById(elementName)) {
		document.getElementById(elementName).style.display = "none";
	}
}

function showElement(elementName) {
 	if (document.getElementById(elementName)) {
		document.getElementById(elementName).style.display = "block";
	}
}

function hideLoginForm(elementName, signInElement) {
	hideElement(elementName);
	showElement(signInElement);
}

// This function is called from the "Ship To" drop down on it's onChange event.
// The idea is to popup a dialog box for accepting new nick names when user
// selects the option "Other Address" from the list. Up on success append added nick name to an
// existing list and make it selected.
//
// @selector select object on which this onChange event triggered.
// @formName string representing form name to which this select element belongs to
// @returns nothing.

function ship_to_changed(selector, elementName) {
    //first hide the product login
	hideLoginForm('productLogin', 'signInTable');
	//Ignore if selected value isn't "Other Address"
	var nickName = selector.options[selector.selectedIndex].value;

	if (nickName == "Another Recipient") {
		document.getElementById(elementName).style.display = "block";
		var frm = document.forms['productForm'];

		if (frm == null) {
		   frm = document.forms['giftCertForm'];
		}

		if (frm != null) {
         frm.shipToFirstName.value = '';
         frm.shipToLastName.value = '';
         frm.shipToZipCode.value = '';
         frm.shipToPOBox.value = 'Y';
      }
 	} else {
		document.getElementById(elementName).style.display = "none";
	}
}

function ship_to_changed2(selector, elementName) {
	//first hide the product login
	hideLoginForm('productLogin2', 'signInTable2');
	//Ignore if selected value isn't "Other Address"
	var nickName = selector.options[selector.selectedIndex].value;

	if (nickName == "Another Recipient") {
		document.getElementById(elementName).style.display = "block";
		var frm = document.forms['productForm'];

		if (frm == null) {
		   frm = document.forms['giftCertForm'];
		}

		if (frm != null) {
         frm.shipToFirstName.value = '';
         frm.shipToLastName.value = '';
         frm.shipToZipCode.value = '';
         frm.shipToPOBox.value = 'Y';
      }
 	} else {
		document.getElementById(elementName).style.display = "none";
	}
}


// This function is called from "Ship To" popup window.
// It will append the given name if it's unique to an existing list.
// Upon success it returns true.
//
// @name String representing the nick name to add
// @formName String representing form name to which this select element belongs
// @elementName String representing select element name
// @isCaseAware boolean to ignore case sensitivity. Optional as it defualts to true
// @returns one of the following string:
//    EMPTY if null value or empty string is passed for name
//    EXIST if the given name already exist in the list
//    SUCCESS if the given name is added to the list.
//    FAILURE if the given name contains special characters '@' and double quotes '"'
function addShipToName(name, formName, elementName, isCaseAware) {
   //lets first check if name is not empty
   if (typeof((name = trim(name))) != "string" || name == "") {
      return "EMPTY";
   }

   // Check if the given name contains special characters '@' and '"'
   // Since it's not allowed.
   if (name.indexOf("@") != -1 || name.indexOf('"') != -1) {
      return "FAILURE";
   }

   //check if it's case sensitive
   if (typeof(isCaseAware) != "boolean") {
      isCaseAware = true;  //Case sensitive
   }

   if (!isCaseAware) {
      name = name.toLowerCase();
   }

   // Lets check if this name already exist in the list.
   var selector = document.forms[formName].elements[elementName];

   for (index = 0; index < selector.options.length; index++) {
      var thisName =  selector.options[index].value;

      if (!isCaseAware) {
         thisName = thisName.toLowerCase();
      }

      if (selector.options[index].value == name) {
         return "EXIST";
      }
   }

   //Given name can't be found so lets add it
   var count = selector.options.length;
   var optionObj = new Option(name);

   //Now set text and value since some browser's will leave the value part as empty
   optionObj.text = name;
   optionObj.value = name;
   selector.options[count] = optionObj;

   //Now select this added nick name
   selector.options.selectedIndex = count; //since index starts at 0
   return "SUCCESS"; //indicate success
}

// Checks if a recipient to add already exists in a added recipients list.
// Returns true if one exist and false in all other cases.
function isRecipientExist(recipient, formName, elementName, isCaseAware) {
   //check if it's case sensitive
   if (typeof(isCaseAware) != "boolean") {
      isCaseAware = true;  //Case sensitive
   }

   //  alert("recipient:" + recipient + "\nformName:" + formName + "\nelementName:" + elementName + "\nisCaseAware:" + isCaseAware);
   if (!isCaseAware) {
      recipient = recipient.toLowerCase();
   }

   // Lets check if this name already exist in the list.
   var selector = document.forms[formName].elements[elementName];

   for (index = 0; index < selector.options.length; index++) {
      var thisRecipient = selector.options[index].value;
      //alert("index" + index + ":" + thisRecipient);

      if (!isCaseAware) {
         thisRecipient = thisRecipient.toLowerCase();
      }

      //alert(thisRecipient + "==" + recipient);
      if (thisRecipient == recipient) {
         return true;
      }
   }

   return false;
}

// Function to add shipToNames to shipTo drop downs.
// This function will allow to add duplicate names aslong as they contains different value.
// @param fullName name that will be visible to select from
// @param value that will be sent when form is submitted of the selected option.
// @param formName name of the form that is holding the select box
// @param elementName name of the select box
// @param isCaseAware to indicate if filtering is based on case sensitiveness
// @return true upon adding and false in all other cases.
function addRecipient(fullName, value, formName, elementName, isCaseAware) {
   if (!isRecipientExist(value, formName, elementName, isCaseAware)) {
     //Given name can't be found so lets add it
     var selector = document.forms[formName].elements[elementName];
     var count = selector.options.length;
     var optionObj = new Option(name);

     //Now set text and value since some browser's will leave the value part as empty
     optionObj.text = fullName;
     optionObj.value = value;
     selector.options[count] = optionObj;

     //Now select this added nick name
     selector.options.selectedIndex = count; //since index starts at 0
     return true;
   }

   return false;
}

// This function is used for shipTo drop downs to lookup for same name recipients. Since one or more recipients can have same name but different addresses.
// In which case it appends their zipcode. Also makes the given defaultSelection as selected.
function appendZipCodeForSameNameRecipients(formName, elementName, defaultSelection) {
   // This loop will iterate each recipient name from the shipTo drop down
   // and compares with all other recipient names, if it matches it appends zip code to it.
   var selector = document.forms[formName].elements[elementName];
   var count = selector.options.length;
   var changesArray = new Array(count);
   var changeCount = 0;

   for (i = 0; i < selector.options.length; i++) {
      // Is this recipient needs to be selected as default
      if (selector.options[i].value == defaultSelection) {
          selector.selectedIndex = i;
      }

      var thisRecipient =  selector.options[i].text;

      for (j = 0; j < selector.options.length; j++) {
         if (j != i) {
            var nextRecipient =  selector.options[j].text;

            if (nextRecipient == thisRecipient) {
               changesArray[changeCount] = i;
               changeCount++;
            }
         }
      }
   }

   for (i = 0; i < changeCount; i++) {
      var index = changesArray[i];
      recipientInfo = selector.options[index].value.split(";");

      if (recipientInfo.length == 3) {
         selector.options[index].text = recipientInfo[0] + " " + recipientInfo[1] + " " + recipientInfo[2];
      }
   }

   return false;
}

//This function is used to get DHTML object reference.
function getElement(id) {
   if (document.getElementById) {
      return document.getElementById(id);
   } else if(document.layers) {
      return document.layers[id];
   } else if(document.all) {
      return document.all[id];
   } else {
      return null;
   }
}

function mediaRelationsSignUp(emailAddress) {
   emailSignUp(emailAddress);
}

function memberSubscribe(emailAddress, firstName, lastName) {
}

function setPageTitle(pageTitle) {
   document.title = pageTitle;
}

function buildBreadCrumbAndTitle(pageName, secondaryLinkName, secondaryLinkURL, thirdLinkName, thirdLinkURL) {
   buildBreadCrumb(pageName, secondaryLinkName, secondaryLinkURL, thirdLinkName, thirdLinkURL);
   var pageTitle = getPageTitle(pageName);
   setPageTitle(pageTitle);
}

function buildBreadCrumbTitleAndSubheader(pageName, secondaryLinkName, secondaryLinkURL,thirdLinkName, thirdLinkURL) {
   buildBreadCrumbAndTitle(pageName, secondaryLinkName, secondaryLinkURL, thirdLinkName, thirdLinkURL);
   var subHdrTxt = getElement('corpPageSubText');

   if (subHdrTxt) {
      subHdrTxt.innerHTML = pageName;
      var subHdr = getElement('corpPageSubHead');

      if (subHdr) {
         subHdr.style.display = "block";
      }
   }
}

function setPopupHeight(paddingOverride) {
   var padding = (paddingOverride == null || paddingOverride == 'undefined') ? 40 : paddingOverride;

   if (!document.all && document.getElementById) {
      if (document.getElementById("popupHeader") && document.getElementById("popupFooter") && document.getElementById("popupContent")) {
         var popHeader = document.getElementById("popupHeader");
         var popFooter = document.getElementById("popupFooter");
         var popContent = document.getElementById("popupContent");
         var windowHeight = window.innerHeight;
         popContent.style.height = windowHeight - (popHeader.offsetHeight + popFooter.offsetHeight + padding);
      }
   }
}

function MM_swapImgRestore() { //v3.0
   var i, x, a = document.MM_sr;

   for(i = 0; a && i < a.length && (x = a[i]) && x.oSrc; i++) {
      x.src = x.oSrc;
   }
}

function MM_findObj(n, d) { //v4.01
   var p, i, x;
   if (!d) {
      d = document;
   }

   if ((p=n.indexOf("?")) > 0 && parent.frames.length) {
      d = parent.frames[n.substring(p + 1)].document;
      n = n.substring(0, p);
   }

   if (!(x = d[n]) && d.all) {
      x = d.all[n];
   }

   for (i = 0; !x && i < d.forms.length; i++) {
      x = d.forms[i][n];
   }

   for (i = 0; !x && d.layers && i < d.layers.length; i++) {
      x = MM_findObj(n, d.layers[i].document);
   }

   if (!x && d.getElementById) {
      x = d.getElementById(n);
   }

   return x;
}

function MM_swapImage() { //v3.0
   var i, j = 0, x, a = arguments;
   document.MM_sr = new Array();

   for (i = 0; i < (a.length - 2); i +=3) {
      if ((x = MM_findObj(a[i])) != null){
         document.MM_sr[j++] = x;

         if (!x.oSrc) {
            x.oSrc = x.src;
         }

         x.src = a[i + 2];}
   }
}


// This function replaces all instances of a value in a string with the following parms.
// NOTE: Special characters such as ' and / will need to be passed in as \' and \/.
// string = The value to be searched on. (required)
// match = The value to find in the string. (required)
// replacement = The to replace the match with. (required)

function stringReplace(string, match, replacement) {
   var result = '';
   var index = 0;
   var lastIndex = index;

   while (string.length > lastIndex) {
      index = string.indexOf(match, lastIndex);

      if (index == -1) {
         break;
      }

      result += string.substring(lastIndex, index) + replacement;
      lastIndex = index + match.length;
   }

   result += string.substring(lastIndex, string.length);
   return result;
}

function saveReviewId(reviewIdStr, foundHelpfulVal) {
	document.updateProductReviewHelpfulCountForm.productReviewId.value = reviewIdStr;
	document.updateProductReviewHelpfulCountForm.foundHelpful.value = foundHelpfulVal;
	document.updateProductReviewHelpfulCountForm.submit();
}

function popPrdVariant(prodVarId) {
	document.productForm.productVariantId.value = prodVarId;
}

function popProductVariant(elementId, prodVarId) {
   document.getElementById(elementId).value = prodVarId;
}

function setSelectedProductValues(productVariantId, prefixCode) {
	setSelectedProductElementsValues('productVariantId', productVariantId, 'prefixCode', prefixCode);
}

function setSelectedProductElementsValues(productVariantIdElementId, productVariantId, prefixCodeElementId, prefixCode) {
	document.getElementById(productVariantIdElementId).value = productVariantId;
	document.getElementById(prefixCodeElementId).value = prefixCode;
}

function populatePNCQuantity(my_form_name) {
   var qty_max = document.forms[my_form_name].elements['selectedKitQuantity'].value;
	var haveLimit = false;
	var qtyCount = 0;
	my_form = document.forms[my_form_name];

	for (i = 0; i < my_form.productVariantId.length; i++){
		if (document.productForm.productVariantId[i].checked == true){
			qty_max = document.productForm.kitQuantity[i].value;
			document.productForm.selectedKitQuantity.value = qty_max;
			break;
		}
	}

	//not update display of quantity
	document.getElementById("selectedRadioQty").innerHTML = qty_max;

	for (i = 0; i < selectArray.length; i++) {
		qtyCount = qtyCount + parseInt(my_form.elements[selectArray[i]].options[my_form.elements[selectArray[i]].selectedIndex].value, 10);

		if (qtyCount > qty_max) {
			//subtract out value set it to zero
			qtyCount = qtyCount - parseInt(my_form.elements[selectArray[i]].options[my_form.elements[selectArray[i]].selectedIndex].value, 10);
			my_form.elements[selectArray[i]].options[my_form.elements[selectArray[i]].selectedIndex].value = 0;
		} else if (qtyCount == qty_max) {
		     haveLimit = true;
		}
	}

   dropDownCount = (qty_max - qtyCount) + 1;

	//alert('ddCount=' + dropDownCount);
	if(dropDownCount > 0) {
		for (i = 0; i < selectArray.length; i++) {
			if (parseInt(my_form.elements[selectArray[i]].options[my_form.elements[selectArray[i]].selectedIndex].value, 10) == 0) {
				my_form.elements[selectArray[i]].options.length = 0;

				for (j =0; j < dropDownCount; j++) {
               my_form.elements[selectArray[i]].options[j] = new Option(j, j);
				}
			} else {
				selectValue = parseInt(my_form.elements[selectArray[i]].options[my_form.elements[selectArray[i]].selectedIndex].value, 10);
				//alert('selectvalue=' + selectValue);
				iteratorLen= dropDownCount + selectValue;
				my_form.elements[selectArray[i]].options.length = 0;

				for (j = 0; j < iteratorLen; j++) {
               my_form.elements[selectArray[i]].options[j] = new Option(j, j);
				}

				my_form.elements[selectArray[i]].options[selectValue].selected = true;
			}
		}
	}
}

function populatePNCQuantityInEnsemble(my_form_name, count) {
   var qty_max = document.forms[my_form_name].elements['selectedKitQuantity'].value;
	var haveLimit = false;
	var qtyCount = 0;
	my_form = document.forms[my_form_name];
   var prodVar = eval("document.productForm.productVariantId_" + count);

	for (i = 0; i < prodVar.length; i++) {
		if (prodVar[i].checked==true) {
			qty_max = document.productForm.kitQuantity[i].value;
			document.productForm.selectedKitQuantity.value = qty_max;
			break;
		}
	}

	//not update display of quantity
	document.getElementById("selectedRadioQty").innerHTML = qty_max;

	for (i = 0; i < selectArray.length; i++) {
		qtyCount = qtyCount + parseInt(my_form.elements[selectArray[i]].options[my_form.elements[selectArray[i]].selectedIndex].value, 10);

		if (qtyCount > qty_max) {
			//subtract out value set it to zero
			qtyCount = qtyCount - parseInt(my_form.elements[selectArray[i]].options[my_form.elements[selectArray[i]].selectedIndex].value, 10);
			my_form.elements[selectArray[i]].options[my_form.elements[selectArray[i]].selectedIndex].value = 0;
		} else if (qtyCount == qty_max) {
		     haveLimit = true;
		}
	}

   dropDownCount = (qty_max - qtyCount) + 1;

	if (dropDownCount > 0) {
		for (i = 0; i < selectArray.length; i++) {
			if (parseInt(my_form.elements[selectArray[i]].options[my_form.elements[selectArray[i]].selectedIndex].value, 10) == 0) {
				my_form.elements[selectArray[i]].options.length = 0;

				for (j = 0; j < dropDownCount; j++) {
               my_form.elements[selectArray[i]].options[j] = new Option(j,j);
				}
			} else {
				selectValue = parseInt(my_form.elements[selectArray[i]].options[my_form.elements[selectArray[i]].selectedIndex].value, 10);
				iteratorLen= dropDownCount + selectValue;
				my_form.elements[selectArray[i]].options.length = 0;

				for (j = 0; j < iteratorLen; j++) {
               my_form.elements[selectArray[i]].options[j] = new Option(j,j);
				}

				my_form.elements[selectArray[i]].options[selectValue].selected= true;
			}
		}
	}
}

function showLogin(objComDivId) {
   document.getElementById(objComDivId).style.display = "block";
}

function setButton(val) {
	prodButton = val;
}

function submitLoginForm(my_form_name, my_dest) {
   //alert("submitLoginForm");
   setButton('2');
   my_form = document.forms[my_form_name];
   my_form.action = "/product/login.cmd";
   my_form.dest.value = my_dest;
   my_form.productShipToSubmit.value = false;
   my_form.loginSubmit.value = true;
   my_form.submit();
}

function submitLoginForm2(my_form_name, my_dest) {
   //alert("submitLoginForm");
   setButton('2');
   my_form = document.forms[my_form_name];
   my_form.action = "/product/login2.cmd";
   my_form.dest.value = my_dest;
   my_form.productShipToSubmit.value = false;
   my_form.loginSubmit.value = true;
   my_form.submit();
}

function submitProductLoginForm(my_form_name, my_dest, my_act) {
	//alert("submitProductLoginForm");
	setButton('2');
	my_form = document.forms[my_form_name];
	if (my_form == null) {
		my_form = document.forms['giftCertForm'];
	}
	my_form.action = my_act;
	my_form.dest.value = my_dest;
	my_form.productShipToSubmit.value = false;
	my_form.loginSubmit.value = true;
	my_form.submit();
}

function submitProductShipToForm(my_form_name, my_dest) {
	setButton('1');
	my_form = document.forms[my_form_name];
	my_form.action = "/catalog/add_recipient.cmd";
	my_form.dest.value = my_dest;
	my_form.productShipToSubmit.value = true;

	if (my_form.loginSubmit != null) {
		my_form.loginSubmit.value = false;
	}

	my_form.submit();
}

function submitProductShipToForm2(my_form_name, my_dest) {
	setButton('1');
	my_form = document.forms[my_form_name];
	my_form.action = "/catalog/add_recipient2.cmd";
	my_form.dest.value = my_dest;
	my_form.productShipToSubmit.value = true;

	if (my_form.loginSubmit != null) {
		my_form.loginSubmit.value = false;
	}

	my_form.submit();
}

function hideShipToForm(my_form_name, elementName) {
	my_form = document.forms[my_form_name];
	hideElement(elementName);
	my_form.shipTo.options[0].selected= true;
}

// takes values from one fields an assign it to hidden ones for add recipient
function  updateHiddenNewRecipient(form) {
	form.shipToFirstName.value = form.shipToFirstNameTemp.value;
	form.shipToLastName.value = form.shipToLastNameTemp.value;
	form.shipToZipCode.value = form.shipToZipCodeTemp.value;
	form.shipToPOBox.value = form.shipToPOBoxTemp.value;
	form.submit();
}

function submitProductForm(my_form_name) {
	my_form = document.forms[my_form_name];
	var destination = '/checkout/process_item.cmd';

    if (prodButton == 0) {
		my_form.action = destination;
		my_form.submit();
    } else if (prodButton == 1) {
		destination = my_form.destinationShipTo.value;

		if (destination.length == 0) {
			updateHiddenNewRecipient(my_form);
		} else {
			submitProductShipToForm(my_form_name, destination);
		}
    } else if (prodButton == 2) {
		destination = my_form.destinationLogin.value;
		submitLoginForm(my_form_name, destination);
    }
}

function submitProductsForm(my_form_name) {
	my_form = document.forms[my_form_name];
	var destination = '/checkout/process_items.cmd';

	if (prodButton == 0) {
		my_form.action = destination;
		my_form.submit();
	} else if(prodButton == 1) {
		destination = my_form.destinationShipTo.value;

		if (destination.length==0) {
			updateHiddenNewRecipient(my_form);
		} else {
			submitProductShipToForm(my_form_name, destination);
		}
	} else if(prodButton == 2) {
		destination = my_form.destinationLogin.value;
		submitLoginForm(my_form_name, destination);
	}
}

function clearLogin(my_form_name){
   //alert("clearLogin");
   my_form = document.forms[my_form_name];

   if (my_form.password != null) {
      my_form.password.value = '';
   }

   if (my_form.userName != null) {
      my_form.userName.value = '';
   }

   setButton('1');
}

function clearLogin2(my_form_name){
   //alert("clearLogin");
   my_form = document.forms[my_form_name];

   if (my_form.password2 != null) {
      my_form.password2.value = '';
   }

   if (my_form.userName2 != null) {
      my_form.userName2.value = '';
   }

   setButton('1');
}

function setAddTo(addToType, my_form_name) {
	my_form = document.forms[my_form_name];
	my_form.addTo.value = addToType;
}

function validateEmail(str, elementName, addBreak) {
   var invalidEmailMessage = "Invalid email address. Please enter a valid email address.";

   if (addBreak == "true") {
      invalidEmailMessage = "<BR/>Invalid email address. Please enter a valid email address.";
   }

   var at = "@";
   var dot = ".";
   var lat = str.indexOf(at);
   var lstr = str.length;
   var ldot = str.indexOf(dot);

   if (str.indexOf(at) == -1) {
      document.getElementById(elementName).innerHTML= invalidEmailMessage;
      return false;
   }

   if (str.indexOf(at) == -1 || str.indexOf(at) == 0 || str.indexOf(at) == lstr){
      document.getElementById(elementName).innerHTML = invalidEmailMessage;
      return false;
   }

   if (str.indexOf(dot) == -1 || str.indexOf(dot) == 0 || str.indexOf(dot) == lstr){
      document.getElementById(elementName).innerHTML = invalidEmailMessage;
      return false;
   }

   if (str.indexOf(at, (lat + 1)) != -1) {
      document.getElementById(elementName).innerHTML = invalidEmailMessage;
      return false;
   }

   if (str.substring(lat - 1, lat) == dot || str.substring(lat + 1, lat + 2) == dot) {
      document.getElementById(elementName).innerHTML = invalidEmailMessage;
      return false;
   }

   if (str.indexOf(dot, (lat + 2)) == -1) {
      document.getElementById(elementName).innerHTML = invalidEmailMessage;
      return false;
   }

   if (str.indexOf(" ") != -1) {
      document.getElementById(elementName).innerHTML = invalidEmailMessage;
      return false;
   }

   return true;
}

var defaultEmailValue = "Enter email address";

function clearEmail() {
   if (document.footerSignUpForm.email_address.value == defaultEmailValue) {
      document.footerSignUpForm.email_address.value = "";
   }
}

function repopulateEmail() {
   if (trim(document.footerSignUpForm.email_address.value) == "") {
      document.footerSignUpForm.email_address.value = defaultEmailValue;
   } else {
      document.footerSignUpForm.email_address.value = trim(document.footerSignUpForm.email_address.value);
   }
}

//var defaultEmailValue = "Enter email address";
function emailSignUpSubmit1(my_form_name) {
  my_form = document.forms[my_form_name];
  var emailAddress1 = my_form.email_address.value;
  var firstName = my_form.first_name.value;
  var lastName = my_form.last_name.value;

  if (validateEmail(emailAddress1, "emailError")) {
      my_form.submit();
      my_form.email_address.value = defaultEmailValue;
      document.getElementById("emailError").innerHTML = "";
   }

   return false;
}

function emailSignUpSubmit2(my_form_name) {
   my_form = document.forms[my_form_name];
   var emailAddress1 =  my_form.email_address.value;
   var firstName = my_form.first_name.value;
   var lastName = my_form.last_name.value;
   var chkOption = my_form.optin;
   var validForm = "true";
   document.getElementById("firstNameError").innerHTML = "";
   document.getElementById("lastNameError").innerHTML = "";

   if(firstName == null || firstName == "" || firstName.length == 0) {
      validForm = "false";
      document.getElementById("firstNameError").innerHTML = "<BR/>Invalid First Name. Please enter a valid First Name.";
      //document.getElementById("trFirstNameErr").style = "display:block";
   }

   if(lastName == null || lastName == "" || lastName.length == 0) {
      validForm = "false";
      document.getElementById("lastNameError").innerHTML = "<BR/>Invalid Last Name. Please enter a valid Last Name.";
      //document.getElementById("trLastNameErr").style = "display:block";
   }
   
   if(!chkOption.checked) {
	   validForm = "false";
	   document.getElementById("optinError").innerHTML = "<BR/>To receive mailings, please check the box above.";      
   }

   if (validateEmail(emailAddress1, "emailError", "true")) {
      if (validForm == "true") {
         SetCookie('event4', 'event4', '', '/');
         my_form.submit();
         //BUG2197: Email signup - not completing/writing out in Google Chrome and Safari
         //my_form.email_address.value = defaultEmailValue;
         document.getElementById("emailError").innerHTML = "";
         document.getElementById("firstNameError").innerHTML = "";
         document.getElementById("lastNameError").innerHTML = "";
         document.getElementById("optinError").innerHTML = "";
      }
   }


   return false;
}

function unsubscribeEmailSubmit(my_form_name) {
   my_form = document.forms[my_form_name];
   var emailAddress1 =  my_form.email_address.value;

   if (validateEmail(emailAddress1, "emailError")) {
      //unsubscribeEmail( emailAddress1 );
      my_form.action = "http://optout.verticalresponse.com/do_opt_out.html";
      my_form.submit();
   }

   return false;
}

//var defaultEmailValue = "Enter email address";
function clearEmail1(my_form_name) {
   my_form = document.forms[my_form_name];

   if (my_form.email_address.value == defaultEmailValue) {
      my_form.email_address.value = "";
   }
}

function repopulateEmail1(my_form_name) {
   my_form = document.forms[my_form_name];

   if (trim(my_form.email_address.value) == "") {
      my_form.email_address.value = defaultEmailValue;
   } else {
      my_form.email_address.value = trim(my_form.email_address.value);
   }
}

function replace(string,text,by) {
   // Replaces text with by in string
   var strLength = string.length, txtLength = text.length;

   if ((strLength == 0) || (txtLength == 0)) {
      return string;
   }

   var i = string.indexOf(text);

   if ((!i) && (text != string.substring(0, txtLength))) {
      return string;
   }

   if (i == -1) {
      return string;
   }

   var newstr = string.substring(0, i) + by;

   if (i + txtLength < strLength) {
      newstr += replace(string.substring(i + txtLength, strLength), text, by);
   }

   return newstr;
}

function replaceHREF(unsecure, repUnSecure, secure, repSecure) {
   //alert("unsecure= " + unsecure + " repUnSecure= " + repUnSecure + " secure= " +secure + " repSecure =  " + repSecure);
   var anchorTags = document.getElementsByTagName("a");

   for (var i = 0; i < anchorTags.length ; i++) {
      hrefVal = anchorTags[i].href;
      //alert("hrefVal=" + hrefVal);
      anchorTags[i].href = replace(replace(hrefVal, unsecure, repUnSecure), secure, repSecure);
   }
}

function replaceIMGHREF(unsecure, secure, isSecure) {
   //alert("unsecure= " + unsecure + "  + " secure= " +secure);
   var imgTags = document.getElementsByTagName("img");

   for (var i = 0; i < imgTags.length ; i++) {
      src = imgTags[i].src;
      //alert("src=" + src);
      if (isSecure) {
         imgTags[i].src = replace(src, unsecure, secure);
      } else {
         imgTags[i].src = replace(src, secure, unsecure);
      }
   }
}

function replaceContentImgSrc(myText, unsecure, secure, isSecure) {
	if (isSecure == "true") {
		return stringReplace(myText, unsecure, secure);
	} else {
		return stringReplace(myText, secure, unsecure);
	}
}

function GetTextWidth(my_form, width){
	var my_width = width -1;

	if (my_form.value.length > my_width) {
		my_form.value = my_form.value.substring(0, my_width);
	}
}

function resetAssignToValue(count, fromEnsemble) {
   //alert("fromEnsemble: " + fromEnsemble);
   var name = "productVariantId";

   if (fromEnsemble == "true") {
      //alert(1);
      name = "productVariantId_" + count;
   }

   //alert("name: " + name);
   var obj = document.getElementById(name);

   if (obj) {
      obj.value = '';
   }

   if (fromEnsemble == "true") {
      name = "relatedProductId_" + count;
      obj = document.getElementById(name);

      if (obj) {
         obj.value = '';

         if (obj.type == "radio") {
            obj.checked = true;
         }
      }
   }
}

function searchBoxFocus(){

   var searchObj = document.getElementById("sli_search_1");

   if (searchObj){
      searchObj.focus();
   }

}

function myLogFunction(event){
		       var event_array=event.split(";");
				alert("Event: " + event_array[0] + "\n" + "TimeStamp: " + event_array[1] + "\n" + "SessionID: " + event_array[2] + "\n" + "ImageRoot: " + event_array[3] );
				return;
}


function swfEmbed(swfPath, writeLocation, autoStart, width, height, videoPath, flvPath, skinPath, allowfullscreen, wmode, allowscriptaccess, bgcolor, videoSkinColor, videoAnalyticsCode) {

	var vidEmbed = new SWFObject(swfPath, writeLocation, width, height,'7');
	vidEmbed.addParam('allowfullscreen',allowfullscreen);
	vidEmbed.addParam("wmode", wmode);
	vidEmbed.addParam('allowscriptaccess',allowscriptaccess);
	vidEmbed.addParam('ExternalInterface.available','true');
	vidEmbed.addParam('bgcolor',bgcolor);
    
	vidEmbed.addVariable("autostart", autoStart);
	vidEmbed.addVariable("videoPath", videoPath);
	vidEmbed.addVariable("flvPath", flvPath);
	vidEmbed.addVariable("ga_ua", videoAnalyticsCode);
	vidEmbed.addVariable("skinColor", videoSkinColor);
	vidEmbed.addVariable("skin", skinPath);
    vidEmbed.addVariable("eventLog", "");

	vidEmbed.write(writeLocation);


}



