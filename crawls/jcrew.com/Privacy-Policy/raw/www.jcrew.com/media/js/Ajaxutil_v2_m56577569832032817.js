var urlsArray=[];

function getIndex(arrayObj, obj){
        for(var i=0,j=arrayObj.length;i<j;i++){
            if(arrayObj[i]==obj){return i;}
        }
        return -1;
}

function sendAjaxRequest(async, url, formObject, divsToPopulate, simulateButtonSubmit, buttonId, postProcessCallFunc, callBack, showMessage, messageIndex, element, loadMessage, width, height){
	if(urlsArray.length>0 && getIndex(urlsArray, url) >= 0){
		return;
	}
	urlsArray.push(url);
	var httpRequest;
	if (window.ActiveXObject) {
		// Internet Explorer
			try {			
				httpRequest = new ActiveXObject( 'Microsoft.XMLHTTP' );
			} catch( e ) {
				try {		
					httpRequest = new ActiveXObject( 'Msxml2.XMLHTTP' );
					} 
				catch( e ) { // Do nothing; we failed.
				}//try again
			}//try to make the object
    		//httpRequest = new ActiveXObject("Msxml2.XMLHTTP"); 
	}else if (window.XMLHttpRequest){ 
    		httpRequest = new XMLHttpRequest(); 
    		if (httpRequest.overrideMimeType) {
         		// set type accordingly to anticipated content type
				httpRequest.overrideMimeType('text/html');
			}
	} 
	//httpRequest.setRequestHeader('Cache-Control', 'no-cache');
	//httpRequest.setRequestHeader('Pragma', 'no-cache');
    httpRequest.open("POST", url, async); 
    if (showMessage) {
    	showAJAXLoadMessage(messageIndex, element, loadMessage, width, height);
    }
    //httpRequest.onreadystatechange = function(){
	var function_body = function(){
    	if (httpRequest.readyState == 4){ 
    		if(httpRequest.status == 200) { 
        		var httpDATA = httpRequest.responseText;
	        	var divType = typeof(divsToPopulate);
	        	var divsPopulated = "";
    	    	if (divType == 'string') {
        			var innerHTMLForDiv = parseAjaxDataForDiv(divsToPopulate, httpDATA);
        			if (innerHTMLForDiv != null) {
	        			// document.getElementById(divsToPopulate).innerHTML = innerHTMLForDiv;
	        			dynamicDivPopulate(divsToPopulate, innerHTMLForDiv);
	        			divsPopulated = divsToPopulate;
	        		}
    	    	} else {
    	    		divsPopulated = new Array(divsToPopulate.length);
        			for (i = 0 ; i < divsToPopulate.length; i++) {
        				var divTagId = divsToPopulate[i];
        				var innerHTMLForDiv = parseAjaxDataForDiv(divTagId, httpDATA);
        				divsPopulated[i] = null;
	        			if (innerHTMLForDiv != null) {
	        				// document.getElementById(divTagId).innerHTML = innerHTMLForDiv;
	        				dynamicDivPopulate(divTagId, innerHTMLForDiv);
	        				divsPopulated[i] = divTagId;
	        			}
    	    		}        		
        		}
        		if (showMessage) {
	        		hideAJAXLoadMessage(messageIndex);
	        	}
				var urlIndex = getIndex(urlsArray, url);
				if(urlIndex > -1){
				  urlsArray.splice(urlIndex,1);
				}
			}else {
				// THIS WILL HAPPEN	when we have ERROR loading the page.
				if (showMessage) {
	        		hideAJAXLoadMessage(messageIndex);
	        	}

				var urlIndex = getIndex(urlsArray, url);
				if(urlIndex > -1){
				  urlsArray.splice(urlIndex,1);
				}
			}
			if (postProcessCallFunc == true) {
				eval(callBack);
				callBackFunc(divsPopulated);
			}
		} 
    } ; 
	// On ready state change function:
	var function_onreadystatechange = function () {
		function_body( httpRequest );
	}//End anonymous onreadystatechange function
	try {
		// Firefox uses onload, but only when you have multiple AJAX requests going.
		// Usually you can bind to onreadystatechange, but only if you are not doing too many requests at once.
		httpRequest.onload = function( e ) {
			var evt = window.event ? window.event : e;
			var targ = evt.target ? evt.target : evt.srcElement;
			function_body( targ );
		}
	} catch( e ) {
		// IE does not have an onload handler, so bind the onreadystatechange
		httpRequest.onreadystatechange = function_onreadystatechange;
	}
    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpRequest.setRequestHeader("Content-length", 0);
    var postData = null;    
    if (null != formObject) {
    	var data =loopThroughElements(formObject,simulateButtonSubmit, buttonId);
			
	    if (data != null) {
    		postData = data.substring(1, data.length);
			
			if (simulateButtonSubmit == true)
			{
				if (postData != null)
				{
					postData += "&" + buttonId + "=true";
					
				} else {
					postData = buttonId + "=true";
				}
				
			}
    		if (postData != null) {
    			httpRequest.setRequestHeader("Content-length", postData.length);
	    	} 
    	}
    } else {
		if (simulateButtonSubmit == true)
		{
			postData = buttonId + "=true";
			httpRequest.setRequestHeader("Content-length", postData.length);
		}
	}

    httpRequest.setRequestHeader("Connection", "close");
    if (postData != null)
    {
    httpRequest.send(postData); 
}
    else
    {
    	httpRequest.send("");
    }
}

function dynamicDivPopulate(divId, htmlData){
	if (document.getElementById(divId)) {
		document.getElementById(divId).innerHTML = htmlData;
		var iframe = document.getElementById('if_'+divId);
		if(iframe != null){
				var layer = document.getElementById(divId);
				iframe.style.display = 'block';
				iframe.style.width = layer.offsetWidth;
				iframe.style.height = layer.offsetHeight;
				iframe.style.left = layer.offsetLeft;
				iframe.style.top = layer.offsetTop;
	     } 
     }
}

// This function returns data for the div based on our custom html.
function parseAjaxDataForDiv(divTagId, httpDATA){
	var splitTag = "<split name='" + divTagId + "'>";
	var data = httpDATA.split(splitTag);
	if (data != null && data.length >= 3) {
		return data[1];
	}
	//error msg
	
	//return httpDATA;
}

function showAJAXLoadMessage(messageIndex, element, loadMessage, width, height){

	var componentObject = document.getElementById(element.id);
	nLeftPos = findPosX(componentObject);
	nTopPos = findPosY(componentObject);

	nextAvailableMessage = "ajaxLoadMessage_" + messageIndex;

	// show IFRAME
	var iframe = document.getElementById('if_'+nextAvailableMessage);
	iframe.src = "/include/load_ajax_refresh_img.jsp";

var isIE = false;

if (/MSIE (\d+\.\d+);/.test(navigator.userAgent))
{
	isIE = true;
}

/*if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)){ 
 var ffversion=new Number(RegExp.$1) // capture x.x portion and store as a number
 if (ffversion>=3)
  document.write("You're using FF 3.x or above")
 else if (ffversion>=2)
  document.write("You're using FF 2.x")
 else if (ffversion>=1)
  document.write("You're using FF 1.x")
}*/

	//alert(iframe.document.body.style.background);
	//iframe.document.body.style.background ="transparent";
	iframe.style.width = width;
	iframe.style.height = height;
	iframe.style.left = nLeftPos-30;
	iframe.style.top = nTopPos-6;

	if (isIE)
	{
		iframe.style.top = nTopPos - 12;
	}

	iframe.style.display = 'block';
/*alert(iframe.document.body.style.background);
	var messageStyleObject = document.getElementById(nextAvailableMessage);
	messageStyleObject.style.top = nTopPos;
	messageStyleObject.style.left = nLeftPos;
	messageStyleObject.style.width = width;
	messageStyleObject.style.height = height;
messageStyleObject.style.background ="transparent";*/
	

	//messageStyleObject.innerHTML = '<table width="100%" height="100%" border="0" align="left" cellpadding="0" cellspacing="3" style="border:1px solid black;"><tr><td class="block1" width="50"></td></tr></table>';
	//messageStyleObject.innerHTML = '<div class="block1" width="50" style="border:1px solid black;"></div>';
	//messageStyleObject.style.display = 'block';
	//alert(messageStyleObject.style.background);

	do_disable_buttons(true);
		
}

function hideAJAXLoadMessage(messageIndex){

	nextAvailableMessage = "ajaxLoadMessage_" + messageIndex;
	var messageStyleObject = document.getElementById(nextAvailableMessage);
	messageStyleObject.style.display = 'none';

	var iframe = document.getElementById('if_'+nextAvailableMessage);
	iframe.style.display = 'none';
	
	do_disable_buttons(false)
}
	
// This function loops through the form
// and finds all elements and generates 
// name value pairs
function loopThroughElements(formObject,simulateButtonSubmit, buttonId){
	var data = "";
	var last=formObject.elements.length-1;
	for (var i=0; i<formObject.elements.length; i++) {
		if (simulateButtonSubmit==true)
		{
			if (i==1){
				data +="&bmSubmit="+buttonId;
			}else if (i==last){
				data +="&bmSubmit="+buttonId;
				//data +=",bmSubmit";
			}
		}
		if (formObject.elements[i].name != "")
		{
			data +=generateNameValuePair(formObject.elements[i]);		
		}
	}
	return data;
}

function generateNameValuePair(myElement) {

	var type = myElement.type;
	var name = "&" + encodeURI(myElement.name);
	if (type == 'text' || type == 'textarea' || type== 'hidden') {
		var idx1 = myElement.value.indexOf('<');
		var idx2 = myElement.value.indexOf('>');
		var length = myElement.value.length;
		var idxlength = idx2 - idx1;
		var temp = new Array();
		temp = myElement.value.split('<>');
		var stemp = temp[0];
		if(idxlength != 1 || stemp.length == 0)
		{
		  //myElement.value = myElement.value.replace(new RegExp( "((\%3C)|<)((\%2F)|\/)*[a-zA-Z0-9\%]+((\%3E)|>)", "g" ),"");
		  myElement.value = myElement.value.replace(new RegExp( "((\%3C)|<)|((\\%3E)|>)", "g" ),"");
		}
		var value = encodeURI(myElement.value);
		var ret = name + "=" + value;
		return ret;
	}
	if (type == 'select-one') {
		if (myElement.selectedIndex >= 0) {
			var value = myElement.options[myElement.selectedIndex].value;
			var ret = name + "=" + value;
			return ret;
		}
		return "";
	}
	if(type == 'checkbox') {
		var value = "false";
		if (myElement.checked) {
			value = "true";
		}
		var ret = name + "=" + value;
		return ret;
	}
	if(type == 'radio') {
		var value = "";
		if (myElement.checked) {
			value = encodeURI(myElement.value);
			var ret = name + "=" + value;
			return ret;
		}
	}
return "";
}

function findPosX(obj){
    var curleft = 0;
    if(obj.offsetParent)
        while(1){
          curleft += obj.offsetLeft;
          if(!obj.offsetParent)
            break;
          obj = obj.offsetParent;
    }else if(obj.x)
        curleft += obj.x;

    return curleft;
}

function findPosY(obj){

    var curtop = 0;
    if(obj.offsetParent)
        while(1){
          curtop += obj.offsetTop;
          if(!obj.offsetParent)
            break;
          obj = obj.offsetParent;
        }
    else if(obj.y)
        curtop += obj.y;

    return curtop;
}

function do_disable_buttons(disable)
{
	if (typeof(disableButtons) != 'undefined')
	{
		var length = disableButtons.length;
		for (i=0; i<length; i++)
		{
			if (typeof(disableButtons[i]) != 'undefined')
			{
				if (disableButtons[i] != 'undefined')
					disableButtons[i].disabled = disable;
			}
		}
	}
}



function __dynamicFunction(functionName, functionParameters)
{
    var t = typeof(functionParameters);
    var callBack =  functionName + "(";
    if (t == 'undefined' || t == null) {
      callBack = functionName + "();";
    } else {
      if (t == 'string' || t == 'number') {
        callBack = functionName + "('" + functionParameters + "');";
      } else {
        callBack = functionName + "(" ; 
        for (i = 0; i < functionParameters.length-1; i++) {
          callBack += "functionParameters["+i+"],";
        }
        callBack += "functionParameters["+  (functionParameters.length-1) + "]);";
      }
    }
    try {
      eval(callBack);
    } catch(e) {
      alert("method not available");
    }
}

function toggleDiv(divId) {
	var divElement = document.getElementById(divId);
	if(divElement) {
		if (divElement.style.display == 'block') {
			divElement.style.display = 'none';
		} else {
			divElement.style.display = 'block';
		}
	}
}