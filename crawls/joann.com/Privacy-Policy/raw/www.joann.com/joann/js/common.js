function field_required(field)
{
	var str=document.getElementById(field).value;
	str=trim(str);
	if(str==null || str=="")
		return false;
	else
		return true;
}

function LTrim( value ) {
	
	var re = /\s*((\S+\s*)*)/;
	return value.replace(re, "$1");
	
}
function RTrim( value ) {
	
	var re = /((\s*\S+)*)\s*/;
	return value.replace(re, "$1");
	
}
function trim( value ) {
	
	return LTrim(RTrim(value));
	
}

function field_minmax(field,min,max)
{
	var str=document.getElementById(field).value;
	if(str.length<min || str.length>max)
		return false
	else
		return true;
}

function compare(field1,field2)
{
	var str1=document.getElementById(field1).value;
	var str2=document.getElementById(field2).value;
	
	if (str1==str2)
		return true;
	else 
		return false;
}

function checkname(evt)
{
	var key= (evt.which) ? evt.which : event.keyCode;
	var exp=String.fromCharCode(key);
	var r=new RegExp("[-'.a-zA-Z\r ]","g");
	if(key!=8)
	{
		if(exp.match(r)== null)
			return false;
		else
			return true;
	}
	
}

function checkaddress(evt)
{
	var key= (evt.which) ? evt.which : event.keyCode;
	var exp=String.fromCharCode(key);
	var r=new RegExp("[-'.a-zA-Z0-9\r # ]","g");
	if(key!=8)
	{
		if(exp.match(r)== null)
			return false;
		else
			return true;
	}
}

function checkzip(e,state,zipcode)
{
	var key= (e.which) ? e.which : event.keyCode;
	var exp=String.fromCharCode(key);
	var stat=document.getElementById(state).value;
	var zip=document.getElementById(zipcode).value;
	if(key!=8)
	{
		if(stat=="FN")
		{
			if(zip.length>=10) return false;
			var r=new RegExp("[0-9a-zA-Z]","g");
			if(exp.match(r)== null)
				return false;
		}else{
			if(zip.length>=5) return false;
			var r=new RegExp("[0-9]","g");
			if(exp.match(r)== null)
				return false;
		}
	}
}

function checkphno(evt)
{
	var key= (evt.which) ? evt.which : event.keyCode;
	var exp=String.fromCharCode(key);
	var r=new RegExp("[-()0-9\r ]","g");
	if(key!=8)
	{
		if(exp.match(r)== null)
			return false;
		else
			return true;
	}
}

function checkphextn(evt)
{
	var key= (evt.which) ? evt.which : event.keyCode;
	var exp=String.fromCharCode(key);
	var r=new RegExp("[0-9\r]","g");
	if(key!=8)
	{
		if(exp.match(r)== null)
			return false;
		else
			return true;
	}
}

function checkorderno(evt)
{
	var key= (evt.which) ? evt.which : event.keyCode;
	var exp=String.fromCharCode(key);
	var r=new RegExp("[0-9a-zA-Z\r]","g");
	if(key!=8)
	{
		if(exp.match(r)== null)
			return false;
		else
			return true;
	}
}

function isnumber(evt)
{
	var key= (evt.which) ? evt.which : event.keyCode;
	var exp=String.fromCharCode(key);
	var r=new RegExp("[0-9\r]","g");
	if(key!=8)
	{
		if(exp.match(r)== null)
			return false;
		else
			return true;
	}
}

function checklength(evt,fid)
{
	var str=document.getElementById(fid).value;
	if(str.length>=120) 
	{
		str=str.substr(0,120);
		document.getElementById(fid).value=str;
	}
}

function checkemail(evt)
{
	var key= (evt.which) ? evt.which : event.keyCode;
	var exp=String.fromCharCode(key);
	var r=new RegExp("[-0-9a-zA-Z@.,_\r]","g");
	if(key!=8)
	{
		if(exp.match(r)== null)
			return false;
		else
			return true;
	}
}
function checkpassword(evt)
{
	var key= (evt.which) ? evt.which : event.keyCode;
	if(key==32) return false;
	
}

function getCookieValue(c_name)	{
  if (document.cookie.length>0) {
    c_start=document.cookie.indexOf(c_name + "=");
    if (c_start!=-1) {
      c_start=c_start + c_name.length+1;
      c_end=document.cookie.indexOf(";",c_start);
      if (c_end==-1)
        c_end=document.cookie.length;
      return unescape(document.cookie.substring(c_start,c_end));
    }
  }
  return "";
}

function pageScroll() {
    	window.scrollBy(0,700); // horizontal and vertical scroll increments
    	}  
    	
function isNumberKey(evt){
		var charCode = (evt.which) ? evt.which : event.keyCode
		if (charCode > 31 && (charCode < 48 || charCode > 57)){
			return false;
		}
		return true;
	}
	function checkDigit(evt, formObj)
	{  
		var charCode = (evt.which) ? evt.which : evt.keyCode
		if(charCode == 13)
		{
		return false;
		}
		if(charCode == 48 )
		{
			var form, f = 0, el, e;
			while (form = document.forms[f++]) {
				if (formObj.name == form.name) {
					e = 0;
					while (el = form.elements[e++]) {
						if (el.type == 'text') {
							if (el.value == null || el.value == '') 
								return false;
							if (el.value.length > 1)
								return true;	
						}													
					}							
				}	
			}
		}
		else
			return isNumberKey(evt);
	}
		function checkData(formObj)
		{
		var frm, c, e, x;
		c = 0; 
		while (frm = document.forms[c++]) {
			if (formObj.name == frm.name) {
			x = 0;
			while (e = frm.elements[x++]) {
			if (e.type == 'text') {
			if (e.value == null || e.value == ''|| e.value == 0) {
			e.value = 1;
			return true;
			} 
			} 
			} 
			} 
		}
		} 
		
function checknum(e,fid)
{	
	var browser=navigator.appName;
	var keyEntry;
	if(browser.indexOf("Microsoft")>=0){
		keyEntry=e.keyCode;
	}
	else{
		keyEntry=e.which;
	}
	if((keyEntry=="48")||(keyEntry==48))
	{
		var str = document.getElementById(fid).value;
		if((str.indexOf('0')==-1 || str.indexOf('0')==0) && str.length<=0)
			return false;
		else if(str.indexOf('0')==0 && str.length>0)
			return false;	}
		else {
			if((keyEntry > '47') && (keyEntry < '58'))
				return true;
			else if((keyEntry == '8')||(keyEntry=='0'))
				return true;
			else
				return false;
	}
}

function disableTabKey (evt) { 
	  var event; 
	  if (evt) { 
	  	event = evt; 
	  } 
	  else if (window.event) { 
	     event = window.event; 
	  } 
	  if (event) { 
	     var keyCode = event.keyCode ? event.keyCode : event.charCode; 
	     if (keyCode == 9 ) { 
	       if (event.preventDefault) { 
	         event.preventDefault(); 
	       } 
	       return false; 
	     } 
	  } 
} 
function setEventListener (eventListener) { 
	if (document.addEventListener) { 
	     document.addEventListener('keypress', eventListener, true); 
	} 
	else if (document.attachEvent) { 
	     document.attachEvent('onkeydown', eventListener); 
	} 
	else { 
	     document.onkeydown = eventListener; 
	} 
} 
function unsetEventListener (eventListener)
{ 
	if (document.removeEventListener) { 
		document.removeEventListener('keypress', eventListener, true); 
	} 
	else if (document.detachEvent) { 
		document.detachEvent('onkeydown', eventListener); 
	} 
	else { 
		document.onkeydown = null; 
	} 
} 

function limitText() {
	var str=document.getElementById('review_text').value;
	if(str.length>=750) return false;
}
function handleEnter(strId){
	var evt = window.event;
	if (evt.keyCode == 13){
		emptykey(strId);
		return false;
	} else return true;
}
function emptykey(strId) {
	try {
		var searchkey = document.getElementById(strId).value.replace(/^\s+|\s+$/g, '').replace(/\\/g,''); 
		if(searchkey=="") {
			window.alert('No search criteria was entered in the search field');
			return false;
		} else {
			document.getElementById('keyword').value = '_' + searchkey;
			searchkey = searchkey.replace(/\//g,' ').replace(/%/g,'_percent_').replace(/\;/g,'').replace(/ /g,'+').replace(/\+/g,'_');
		//	alert(searchkey);
			var url = '';
			if(strId == 'qsearch') {
				url = "";
				url = window.location.protocol + "//" + window.location.hostname + '/search/';
				url = url + '_'+ searchkey + '/';
			} else {
				url = window.location.protocol + "//" + window.location.host + window.location.pathname;
				if(url.charAt(url.length -1) != '/') {
					url = url + '/';
				}
				url = url + '_'+ searchkey + '/';
				url = url + window.location.search;
				if(isProject=='1' && url.indexOf("isPrj=") <= 0) {
					if(url.indexOf("?") <= 0) {
						url = url + "?isPrj=1";
					} else {
						url = url + "&isPrj=1";
					}
					
				}
			}
			window.location.href = url;
		}
	}
	catch (exp) {
	//	alert('exp');
	}
}


function showRequest(formData, jqForm, options) {
//alert('validation');
}
/*
$(".below a").hover(function(){
	$("#popupcart").slideDown(700);
});
*/


function showResponse(responseText, statusText, xhr, $form) {
	

	 //alert(responseText);
	if(responseText.search('error_handler') > -1)
	{
			$("#showCartErrors").show();
			$("#output").load("/joann/catalog/popupcart.jsp");
	}
	else if(responseText.search('popupcart') > -1)
	{
			$("#output").show();
			$("#popupcart").slideDown(700).delay(2000).slideUp(700);
			$("#account .below").load("/joann/common/commerceItemCount.jsp");
	}

   return false;
}


function cartFormSubmit(formId) {
	//alert($('#'+formId).html());
	var options = { 
			target:        '#output,#showCartErrors',   // target element(s) to be updated with server response 
			beforeSubmit:  showRequest,  // pre-submit callback 
			success:       showResponse,  // post-submit callback 
			error: showError
			
		}; 
	 $('#'+formId).ajaxSubmit(options); 
}
function closeCartPopup() {
	$("#popupcart").slideUp(700);
	$("#output").hide();
}
function showError() {
	//alert("Some Error Has Occured");
	$("#popupcart").slideUp(700);
	$("#output").hide();
}


function openCartPopup() {
	$("#output").show();
	$("#popupcart").slideDown(700);
}

$(document).ready(function(){
	var newProtocol = window.location.protocol;
	if(newProtocol=="http:") {
	$("#output").empty();
	$("#output").load("/joann/catalog/popupcart.jsp");

		$("body, #popupcarthead a").click(function(e){
			$("#popupcart").slideUp(700);
			e.stopPropagation();
			return true;
		});	 
	}
});