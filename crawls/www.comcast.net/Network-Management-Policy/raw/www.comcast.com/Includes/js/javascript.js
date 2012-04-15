//<Script>

// Adds Local Name prefix to page title
function UseLocalTitle()
{
    var localName = ReplaceAll(getCookieVal("CorpName"), "&#160;", " ");
	if(localName && localName != "")
		document.title = localName + " - " + document.title;
}

function openExtBrowserWindow(sUrl)
{	
	//alert("opening " + sUrl);
	
	var extWindow = window.open(sUrl, 'ComcastExternal');
	extWindow.focus();
}

function openExtTextWindow(openURL,WindowName,width,height,scroll,resizeable) 
{
    var winl = (screen.width-width)/2;
    var wint = (screen.height-height)/2;
    var settings  ='height='+height+',';
      settings +='width='+width+',';
      settings +='top='+wint+',';
      settings +='left='+winl+',';
      settings +='scrollbars='+scroll+',';
      settings +='toolbar=no,location=no,status=no,menubar=no';
      if(resizeable != null)
      {
        settings += ',resizeable=' + resizeable;
      }
      else
      {
        settings += ',resizeable=yes';
      }
    var newwindow = window.open(openURL,WindowName,settings);
    newwindow.focus();
    return newwindow;
}


// Popup for email preferences
function OpenEmailPopup(PopupEmail,PopupAccount) {

	var sUrl = "";
	var newwindow = openExtTextWindow('','EmailPopup',500, 655, 'yes');
	
	var oPopForm = GetEmailPopupForm();
	oPopForm.e.value = PopupEmail;
	oPopForm.AcctNum.value = PopupAccount;
	oPopForm.submit();
	   
    newwindow.focus();
}

function GetEmailPopupForm()
{
	var oForm;
	if(document.getElementById)
		oForm = document.getElementById("PopupForm");
	else if (document.all)
		oForm = document.all["PopupForm"];
	else
		oForm = document.forms["PopupForm"];
		
	return oForm;
}


	

// Set width of text box depending on NN/IE to maintain layout.
function setBoxsize(oName) {
	if (document.layers) 
		oName.size = 20;
	else {
		oName.size = 30; 
	}
}

function ViewDemo()
{	
	window.open("/UserIncludes/Demo.html",'Demo','toolbar=no,location=no,status=no,menubar=no,resizable=no,width=660,height=420,scrollbars=no')
}

function swap(oImage,sNew)
{
	oImage.src = "/images/buttons/" + sNew;
}

function GetCookie(key1,key2)
{	

	var sCookie = new String(document.cookie);
	//alert(sCookie)
	if(key1 != null)
	{
		var aCList = sCookie.split('; ');
		for(var i = 0;i < aCList.length;i++)
		{
			sCookie = aCList[i];
			var oReg = new RegExp("(^"+key1+"=)(.*)","ig");
			var aResult = oReg.exec(sCookie);
			if(aResult != null)
			{
				sCookie = RegExp.$2;
				if(key2 != null)
				{
					aCList = sCookie.split("&");
					for(var i = 0;i < aCList.length;i++)
					{
						sCookie = aCList[i];
						var oReg = new RegExp("(^"+key2+"=)(.*)","ig");
						var aResult = oReg.exec(sCookie);;
						if(aResult != null)
						{
							sCookie = unescape(RegExp.$2);
							break;
						}else {
							sCookie = false;
						}
					}
				}
				break;
			} else {
				sCookie = false;
			}
		}
	}
	return sCookie;
}

function GetMenuCookie(key1,key2)
{	

	var sCookie = new String(document.cookie);
	//alert(sCookie)
	if(key1 != null)
	{
		var aCList = sCookie.split('; ');
		for(var i = 0;i < aCList.length;i++)
		{
			sCookie = aCList[i];
			var oReg = new RegExp("(^"+key1+"=)(.*)","ig");
			var aResult = oReg.exec(sCookie);
			if(aResult != null)
			{
				sCookie = RegExp.$2;
				if(key2 != null)
				{
					aCList = sCookie.split("&");
					for(var i = 0;i < aCList.length;i++)
					{
						sCookie = aCList[i];
						var oReg = new RegExp("(^"+key2+"=)(.*)","ig");
						var aResult = oReg.exec(sCookie);
						if(aResult != null)
						{
							sCookie = unescape(RegExp.$2);
							break;
						}else {
							sCookie = -1;
						}
					}
				}
				break;
			} else {
				sCookie = -1;
			}
		}
	}
	return sCookie;
}


/* Switch button from "Products In My Area" to "Order Now" if they're localized.
	Pass in product type to select its box on next page (Serviceability)
*/	
function SwitchButtons (Product) {	
	//alert("called the switcher");

	var sAddress = GetCookie("Serviceability","Address");
	var sInternet = GetCookie("Serviceability","NumInternetProductsAvailable");
	var sDigital = GetCookie("Serviceability","NumDigitalProductsAvailable");
	
	/* debug strings
	alert("Address is: " + sAddress + "\n" +
		"Int Products:  " + sInternet+ "\n" +
		"Dig Products:  " + sDigital);
	*/
	
	if (!sAddress) {		// Not localized
		document.write('<a href="/Products/Serviceability.asp?SourcePage=' + Product + ' " onmouseover="swap(document.Continue,\'productsinmyarea_over.gif\')" onmouseout="swap(document.Continue,\'productsinmyarea.gif\')"><img align="right" src="/images/buttons/productsinmyarea.gif" border="0" name="Continue" /></a>');
	}
		
	if (sAddress) {			// Localized
		
		// Hold this fork until Phase 2	
		// if ( (sDigital > 0) || (sInternet > 0) )		// Product available
			document.write('<a href="/Products/Serviceability.asp?SourcePage=' + Product + ' " onmouseover="swap(document.Continue,\'OrderNow_over.gif\')" onmouseout="swap(document.Continue,\'OrderNow.gif\')"><img align="right" src="/images/buttons/OrderNow.gif" border="0" name="Continue" /></a>');

		/* Hold until Phase 2
		else {											// Product NOT available
			//alert("No products");
			document.write('<a href="../ContactUs/NotifyMe.ashx" onmouseover="swap(document.Continue,\'NotifyMe_over.gif\')" onmouseout="swap(document.Continue,\'NotifyMe.gif\')"><img align="right" src="/images/buttons/NotifyMe.gif" border="0" name="Continue" /></a>');
			// TODO Need to fix the link for aspgen???
		}
		*/
	}
}


/*  The cookies N
	Switch button from "Products In My Area" to "Check Availability" if they're localized.
	Pass in product type to select its box on next page (Serviceability)
*/	
function SwitchToContinue(Product, sButton1, sButton2) {	
	//alert("called the switcher" + Product);

	var sAddress = GetCookie("Serviceability","Address");
	
	// Use default button images if non are provided
	if((!sButton1 && !sButton2) || (sButton1.length == 0 && sButton2.length == 0))
	{
		if(sAddress)
		{
			sButton1 = "Continue.gif";
			sButton2 = "Continue_over.gif";
		}
		else
		{
			sButton1 = "CheckAvailability.gif";
			sButton2 = "CheckAvailability_over.gif";
		}
	}
	
	/* debug strings
	alert("Address is: " + sAddress + "\n" +
		"Int Products:  " + sInternet+ "\n" +
		"Dig Products:  " + sDigital);
	*/
	
	
	document.write('<a href="/Buyflow/default.ashx?SourcePage=' + Product + ' " onmouseover="swap(document.Continue,\'' + sButton2 + '\')" onmouseout="swap(document.Continue,\'' + sButton1 + '\')"><img align="right" src="/images/buttons/' + sButton1 + '" border="0" name="Continue" /></a>');
}


/* 
	Trim a string to fit. Shortens and adds ellipsis (...).
	Pass in string and max length.
	Used to trim long corp name display in header bar (menu.xslt).	
	Remove broken character entity at end of line to prevent rendering '&#16' for '&#160;', etc.
*/
function TrimString(LongString,MaxLength)
{
	
	//Check for end-of-line partial character entity after trimming a string to prevent rendering something like '&#16' for '&#160;'
	var oRegYes = new RegExp("(&.{0,5}\.\.\.)$" );

	var NewString = LongString;
		
	if (LongString.length > MaxLength)
	{
		NewString = LongString.substr(0,MaxLength) + "... ";
		
		if( NewString.match(oRegYes) )
		{
			//alert(NewString.search(oRegYes));			
			NewString = NewString.replace(oRegYes,"... ");
			//alert("after: " + NewString);
		}
	}
	return NewString;
}



/***************************************************************************
	Autotab the 3-box phone fields
	NOTE: Don't call from 3rd box if the next field cannot receive focus.
****************************************************************************/

var isNN = (navigator.appName.indexOf("Netscape") != -1 ); 
 
function autoTab(input,len, e) { 
	var keyCode	= (isNN) ? e.which : e.keyCode; 
	var filter	= (isNN) ? [0,8,9] : [0,8,9,16,17,18,37,38,39,40,46]; 
	if( input.value.length >= len && !containsElement(filter, keyCode)) { 
		input.value = input.value.slice( 0, len ); 
		input.form[(getIndex(input) + 1) % input.form.length].focus(); 
	} 
	return true; 
} 
 
function containsElement(arr, ele) { 
	var found = false, index = 0; 
	while(!found && index < arr.length) 
	if(arr[index] == ele) { 
		found = true; 
	} else { 
		index++; 
	} 
	return found; 
} 
 
function getIndex(input) { 
	var index = -1, i = 0, found = false; 
	while (i < input.form.length && index == -1) 
	if (input.form[i] == input) { 
		index = i; 
	} else { 
		i++; 
	} 
	return index; 
}


//Get Telephony Serviceability from cookies. Used by search.
function GetTelephonyServ()
{
	var iTelType = -1;
	var ServType = GetCookie('Serviceability','LocalizationTypeID')
	if(ServType == 1 || ServType == 2  || ServType == 9 )
	{
		var bVOIP = GetCookie("Menu","VO") == 1;
		var bDTS = GetCookie("Menu","DP") == 1;
		if(bDTS && bVOIP)
		{
			iTelType = -2;
		}
		else if(bVOIP)
		{
			iTelType = 5;
		}
		else if(bDTS)
		{
			iTelType = 4;
		}	
	}

	return iTelType;
}

/********************************************
Query String parsing
*********************************************/
function PageQuery(q) {
	if(q.length > 1) this.q = q.substring(1, q.length);
	else this.q = null;
	this.keyValuePairs = new Array();
	if(q) {
		for(var i=0; i < this.q.split("&").length; i++) {
			this.keyValuePairs[i] = this.q.split("&")[i];
		}
	}
	this.getKeyValuePairs = function() { return this.keyValuePairs; }
	this.getValue = function(s) {
		for(var j=0; j < this.keyValuePairs.length; j++) {
			if(this.keyValuePairs[j].split("=")[0] == s)
			return this.keyValuePairs[j].split("=")[1];
		}
		return false;
	}
	this.getParameters = function() {
		var a = new Array(this.getLength());
		for(var j=0; j < this.keyValuePairs.length; j++) {
			a[j] = this.keyValuePairs[j].split("=")[0];
		}
		return a;
	}
	this.getLength = function() { return this.keyValuePairs.length; }
}
//This function will return the value of the named pair specified by "key"
function queryString(key){
	var page = new PageQuery(window.location.search);
	return unescape(page.getValue(key));
}

function displayItem(key){
	if(queryString(key)=='false')
	{
		document.write("you didn't enter a ?name=value querystring item.");
	}else{
		document.write(queryString(key));
	}
}

function addClassToNode(node, className)
{
	node.className += " " + className;
	
}

function removeClassFromNode(node, className)
{
	// Try removing w/ the space first then w/o the leading space.
	// The first class on a node won't have the leading space.
	node.className = node.className.replace(new RegExp(" " + className + "\\b"), "");
	node.className = node.className.replace(new RegExp(className + "\\b"), "");
}

function clearValue(input, defaultValue)
{
	if(defaultValue == "Password" && input.type == "text")
	{	
		try
		{
			var type = input.getAttributeNode("type");
			type.nodeValue = "password";
		}
		catch (e)
		{
			var newInput = document.createElement("input");
			newInput.type = "password";
			input.replaceNode(newInput);
			newInput.id = "password"
			newInput.name = "password";
			newInput.className = "text";
			newInput.onblur = function() { testValue(newInput, "Password"); }
			newInput.focus();
			newInput.focus(); // needs double focus for some reason
			input = newInput;
		}
		input.focus();
	}
	if(input.value == defaultValue)
		input.value = "";
}

function testValue(input, defaultValue)
{
	if(defaultValue == "Password" && input.value == "")
	{
		try
		{
			input.type = "text";
		}
		catch (e)
		{
			var newInput = document.createElement("input");
			newInput.type = "text";
			input.replaceNode(newInput);
			newInput.id = "password"
			newInput.name = "password";
			newInput.className = "text";
			newInput.onfocus = function() { clearValue(newInput, "Password"); }
			newInput.value = defaultValue;
			input = null;
			return;
		}
	}
	if(input.value == "")
		input.value = defaultValue;
}

// Functions for CM Forms

function FormRequired(field)
{
	if (field.type=="checkbox" || field.type=="radio") {
		if (!field.checked){
			return field.name + " is a required field.\n";
		}
	} else if (field[0] && (field[0].type=="checkbox" || field[0].type=="radio")) {
		var check = false;
		var name = field[0].name;
		for (var i=0; i<field.length; i++) {
			if (field[i].checked) {
				check = true;
			}
		}
		if (!check) {
			var msg;
			if (field.type=="checkbox"){
				msg = "Please choose at least one option from ";
			}
			else {
				msg = "Please choose an option from ";
			}
			return msg + name + "\n";
		}
	} else if (field.type=="select-one" || field.type=="select-multiple") {
		if (field.options[field.selectedIndex].value=="")
			return field.name + " is a required field.\n";
	} else {
		if (field.length == 0 || field.value == "") {
			return field.name+" is a required field.\n";
		}
	}
	return "";
}

// NOTE: Remove the else branch after localization is implemented. It simply prevents showing a broken page.
function validateZIP(zfield) 
{
		var zvalue = zfield.value;
		var zerocount = 0;
		if (zvalue.length!=5) {
			alert("Please enter a 5-digit ZIP Code.");
			zfield.focus();
			return false;
		}
		for (var i=0; i < zvalue.length; i++) {
			temp = "" + zvalue.substring(i, i+1);
			if (temp == "0") zerocount++;
			if (zerocount == 5) {
				alert("Please enter a valid 5-digit ZIP Code.");
				zfield.select();
				return false;
			}
		}
		var valid = "0123456789"
		var ok = "yes";
		var temp;
		for (var i=0; i < zvalue.length; i++) {
			temp = "" + zvalue.substring(i, i+1);
			if (valid.indexOf(temp) == "-1") ok = "no";
		}
		if (ok == "no") {
			alert("Please enter a valid 5-digit ZIP Code.");
			zfield.focus();
			return false;
		}
	
		return true;
}

function ValidateEmail(efield, required)
{
	if (required == false && efield.value == "") {
		return "";
	}
	
	var evalue = efield.value;

	var error = "Invalid E-mail Address.\n";
	var at = "@";
	var dot = ".";
	var lat = evalue.indexOf(at);
	var lstr = evalue.length;
	var ldot = evalue.indexOf(dot);

	if (lat == -1 || lat == 0 || lat == lstr){
		return error;
	}

	if (ldot == -1 || ldot == 0 || ldot == lstr){
		return error;
	}

	if (evalue.indexOf(at, (lat + 1)) != -1){
		return error;
	}

	if (evalue.substring(lat - 1, lat) == dot || evalue.substring(lat + 1, lat + 2) == dot || evalue.substring(lstr - 1, lstr) == dot || evalue.substring(lstr - 2, lstr - 1) == dot){
		return error;
	}

	if (evalue.indexOf(dot, (lat + 2)) == -1){
		return error;
	}

	if (evalue.indexOf(" ") != -1){
		return error;
	}
	
	return "";
}

function ValidatePhone(pfield, required)
{
	if (required == false && pfield.value == "") {
		return "";
	}
	
	var pvalue = pfield.value;
	rePhoneNumber = new RegExp(/^\([1-9]\d{2}\)\s?\d{3}\-\d{4}$/);

	if (!pvalue.match(rePhoneNumber)) {
		return "Please enter Phone Number in the format: (555) 555-1234\n";
	}
	
	return "";
}

function ValidateZIPCode(zfield, required)
{
	if (required == false && zfield.value == "") {
		return "";
	}
	
	var zvalue = zfield.value;
	var zerocount = 0;
	if (zvalue.length!=5) {
		return "Please enter a 5-digit ZIP Code.\n";
	}
	for (var i=0; i < zvalue.length; i++) {
		temp = "" + zvalue.substring(i, i+1);
		if (temp == "0") zerocount++;
		if (zerocount == 5) {
			return "Please enter a valid 5-digit ZIP Code.\n";
		}
	}
	var valid = "0123456789"
	var ok = "yes";
	var temp;
	for (var i=0; i < zvalue.length; i++) {
		temp = "" + zvalue.substring(i, i+1);
		if (valid.indexOf(temp) == "-1") ok = "no";
	}
	if (ok == "no") {
		return "Please enter a valid 5-digit ZIP Code.\n";
	}

	return "";
}

//Depricated. Function moved to DF.js
function ForceSSL()
{
	if(window.location.protocol == "http:")
		window.location = "https://" + window.location.hostname + window.location.pathname + window.location.search;
}

//Depricated. Function moved to DF.js
function ForceNoSSL()
{
	if(window.location.protocol == "https:")
		window.location = "http://" + window.location.hostname + window.location.pathname + window.location.search;
}

function ReplaceAll(value, find, replace)
{
	while(value.indexOf(find) != -1) {
		value = value.replace(find, replace);
	}
	
	return value;
}

function openLink(behavior, destination, width, height, centered, x, y, scrollbars, resizeable)
{
	//alert("DF Test");
	//alert("behavior: " + behavior + "\ndest: " + destination + "\nhbxCode: " + hbxCode+ "\nwidth" + width+ "\nheigth: "+ height+ "\ncentered: " + centered+ "\nx: " + x+ "\ny: " + y+ "\n");
	//alert("scrollbars: " + scrollbars + "\nresizeable: " + resizeable);

	var winl = (screen.width-width)/2;
	var wint = (screen.height-height)/2;
	
	if (destination == "#TVPlanner")
	{
		if (theParentWindow != null)
		{
			if (theParentWindow.SearchTV)
				theParentWindow.SearchTV('schedule-grid');	// this function is in menu.js
		}
		return;
	}

	var _behavior;
	switch(behavior)
	{
		case "self":
			_behavior = "_self";
			break;
		case "new":
			_behavior = "_blank";
			break;
		case "parent":
			try {
				if(theParentWindow != null && !theParentWindow.closed)
				{
					theParentWindow.location = destination;
					theParentWindow.focus();
					return;
				}
				else
				{
					var newWin = window.open(destination);
					if(newWin == null)
						alert("Your popup blocker has stoped a window from opening." + '\n' + "Allow popups for this page and try again.");
					else
					{
						theParentWindow = newWin;
						window.opener = theParentWindow;
						newWin.focus();
					}
					return;
				}
			}
			catch(error)
			{
					var newWin = window.open(destination);
					if(newWin == null)
						alert("Your popup blocker has stoped a window from opening." + '\n' + "Allow popups for this page and try again.");
					else
					{
						theParentWindow = newWin;
						window.opener = theParentWindow;
						newWin.focus();
					}
					return;
			}
			break;
		default:
			_behavior = "_blank";
			break;
	}

	if(_behavior == "_blank")
	{
		var settings  ='height='+height+',';
		settings +='width='+width+',';
		if(centered == 'true')
		{
			settings +='top='+wint+',';
			settings +='left='+winl+',';
		}
		else
		{
			settings +='top='+y+',';
			settings +='left='+x+',';
		}
	}
	if(scrollbars == 'true')
	{
		settings +='scrollbars=yes,';
	}
	else
	{
		settings +='scrollbars=no,';
	}
	if(resizeable == 'true')
	{
		settings +='resizable=yes,';
	}
	else
	{
		settings +='resizable=no,';
	}
	settings +='toolbar=no,location=no,status=no,menubar=no';
	var newwindow = window.open(destination,_behavior,settings);
	if(newwindow != null)
		newwindow.focus();
	return;
}


function checkEnter(e, formButtonId)  //e is event object passed from function invocation
{
	var characterCode; //literal character code will be stored in this variable
	if(e && e.which) //if which property of event object is supported (NN4)
	{
		//e = e;
		characterCode = e.which; //character code is contained in NN4's which property
	}
	else if (e){
		//e = event;
		characterCode = e.keyCode; //character code is contained in IE's keyCode property
	}
	else
	{
		return true;
	}

	if(characterCode == 13) //if generated character code is equal to ascii 13 (if enter key)
	{
	    var formToSubmit = document.getElementById(formButtonId);
		if(formToSubmit != null)
		{
			formToSubmit.click();
		}
		//document.getElementById(formId).submit();
		//document.forms[1].submit(); //submit the form
		return false;
	}
	else
	{
		return true;
	}
}

function limit(field, chars) {
	if (field.value.length > chars) {
		field.value = field.value.substr(0, chars);
		// next line is optional
		alert('You are only allowed to enter '+chars+' characters in the '+field.name+' field!');
	}
}

//This fires an async request to the specified url
//Specifically designed not to handle the onreadystatechange event
//Used primarily to call the IDGenerator.
function makeHttpRequest(url) {
	var http_request = false;
	
	if(url && url.length > 0)
	{
		reHTTP = new RegExp("^(http://|https://)");
		if(!url.match(reHTTP))
		{
			if (window.XMLHttpRequest) { // Mozilla, Safari,...
				http_request = new XMLHttpRequest();
				if (http_request.overrideMimeType) {
					http_request.overrideMimeType('text/xml');
				}
			} else if (window.ActiveXObject) { // IE
				try {
					http_request = new ActiveXObject("Msxml2.XMLHTTP");
				} catch (e) {
					try {
						http_request = new ActiveXObject("Microsoft.XMLHTTP");
					} catch (e) {}
				}
			}

			if (!http_request) {
				//alert('Giving up :( Cannot create an XMLHTTP instance');
				return false;
			}
				
			http_request.open('GET', url, true);
			http_request.send(null);
		}
	}

}
function createRequestObject() {
	FORM_DATA = new Object();
	// The Object ("Array") where our data will be stored.
	separator = ',';
	// The token used to separate data from multi-select inputs
	query = '' + this.location;
	qu = query
	// Get the current URL so we can parse out the data.
	// Adding a null-string '' forces an implicit type cast
	// from property to string, for NS2 compatibility.
	query = query.substring((query.indexOf('?')) + 1);
	// Keep everything after the question mark '?'.
	if (query.length < 1) { return false; }  // Perhaps we got some bad data?
	keypairs = new Object();
	numKP = 1;
	// Local vars used to store and keep track of name/value pairs
	// as we parse them back into a usable form.
	while (query.indexOf('&') > -1) {
		keypairs[numKP] = query.substring(0,query.indexOf('&'));
		query = query.substring((query.indexOf('&')) + 1);
		numKP++;
		// Split the query string at each '&', storing the left-hand side
		// of the split in a new keypairs[] holder, and chopping the query
		// so that it gets the value of the right-hand string.
	}
	keypairs[numKP] = query;
	// Store what's left in the query string as the final keypairs[] data.
	for (i in keypairs) {
		if(typeof keypairs[i] == "string")
		{
			keyName = keypairs[i].substring(0,keypairs[i].indexOf('='));
			// Left of '=' is name.
			keyValue = keypairs[i].substring((keypairs[i].indexOf('=')) + 1);
			// Right of '=' is value.
			while (keyValue.indexOf('+') > -1) {
				keyValue = keyValue.substring(0,keyValue.indexOf('+')) + ' ' + keyValue.substring(keyValue.indexOf('+') + 1);
				// Replace each '+' in data string with a space.
			}
			keyValue = unescape(keyValue);
			// Unescape non-alphanumerics
			if (FORM_DATA[keyName]) {
				FORM_DATA[keyName] = FORM_DATA[keyName] + separator + keyValue;
				// Object already exists, it is probably a multi-select input,
				// and we need to generate a separator-delimited string
				// by appending to what we already have stored.
			} else {
				FORM_DATA[keyName] = keyValue;
				// Normal case: name gets value.
			}
		}
	}
	return FORM_DATA;
}

function getSSLServer() {
	var sLoc = window.location.href;
	var aURL = sLoc.split("/");
	var sServer = aURL[2];
	return "https://" + sServer;
}

function SetDisplayByName(name, display)
{
	var elements = document.getElementsByName(name);
	for (var i = 0; i < elements.length; i++)
	{
		elements[i].style.display = display;
	}
}

function RegisterScriptTag(scriptUri) {
    scriptUri = scriptUri.replace(/&amp;/g, '&');
    var script = document.createElement('script');
    script.src = scriptUri;
    script.type = 'text/javascript';
    script.defer = true;
    document.getElementsByTagName('head').item(0).appendChild(script);
}