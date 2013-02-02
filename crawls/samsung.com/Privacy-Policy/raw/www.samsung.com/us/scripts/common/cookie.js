/******************************************************************************
 Copyright (c) 2007 Samsung Electronics. All Rights Reserved.
 Project: Samsung.com Site Renewal(2007.01~07)

 File Name : sitecode.js
 Description : Cookie Get/Delete
 Author : Sanghun Jeong
 Since : 2007.06.05
 
 Modification Information
 Mod Date        Modifier         Description
 ----------      --------         ---------------------------
 2007.06.05      Sanghun Jeong    Initial creation 
******************************************************************************/


//************************************************************************************
// Description : Get Cookie Value
// Parameter: Cookie name
// Return: Cookie value
// Usage: 
//************************************************************************************
function getCookie(name) 
{
	var search = name + "=";
	if (document.cookie.length > 0) 
	{
		offset = document.cookie.indexOf(search);
		if (offset != -1)
		{
			offset += search.length;
			end = document.cookie.indexOf(";", offset);
			if (end == -1)
			end = document.cookie.length;
			return unescape(document.cookie.substring(offset, end));
		} 
	}
}

//************************************************************************************
// Description : Delete/Expire Cookie Value
// Parameter: Cookie name
// Return: 
// Usage: 
//************************************************************************************
function deleteCookie(name, path, domain)
{
	if (getCookie(name)) {
		document.cookie = name + '=' +
			((path) ? ';path=' + path : '') +
			((domain) ? ';domain=' + domain : '' ) +
			';expires=Thu, 01-Jan-1970 00:00:01 GMT';
	}
}

/**
* ??? check
*/
function isLogin(){
	var result = false;
	var remoteId = getCookie("remoteId");
	if ((remoteId != null) && (remoteId != "")) result = true;
	
	return result;
}

/**
* ????
*/
function clearCookiesAndMakeFinalURL(hrefValue)
{
     var mainURL=document.URL;

	 if(mainURL.indexOf("/us/appstore") >= 0){ 
		 mainURL = mainURL.substring(0,mainURL.indexOf("/us/appstore"))+"/us/appstore";
		 if(mainURL.indexOf("https://secureus") == 0){
			 mainURL = mainURL.replace("https://secureus", "http://www");
		 }
	 }

     var finalURL=hrefValue+"?url="+mainURL;
     $(".logout").attr("href", finalURL);
    

     deleteCookie("prof_country", "/", document.domain);
     deleteCookie("prof_id", "/", document.domain);
     //deleteCookie("prof_prolist", "/", document.domain);
     deleteCookie("bvdisplaycode", "/", "");
     deleteCookie("bvproductid", "/", "");
     deleteCookie("bvpage", "/", "");
     deleteCookie("bvcontenttype", "/", "");
     deleteCookie("bvauthenticateuser", "/", "");
     deleteCookie("bzv_url", "/", "");
     deleteCookie("auth_flag", "/", "");
     
     $.ajax({

	url: "http://shop.us.samsung.com/store?Action=Logout&Locale=en_US&SiteID=samsung&sout=json",
	dataType:'jsonp',
	data:'jsonp=callbackLogout'

	  
     });
     return true;
}

function callbackLogout(data){

/*
var mainURL=document.URL;

	 if(mainURL.indexOf("/us/appstore") >= 0){ 
		 mainURL = mainURL.substring(0,mainURL.indexOf("/us/appstore"))+"/us/appstore";
		 if(mainURL.indexOf("https://secureus") == 0){
			 mainURL = mainURL.replace("https://secureus", "http://www");
		 }
	 }

     var finalURL=hrefValue+"?url="+mainURL;
     
location.href = finalURL;
*/
}
/**
* get UserName
*/
function getUserName(){
	var prof_fname = getCookie("prof_fname");
	var prof_lname = getCookie("prof_lname");

	var name = "";

	try{
		name = prof_fname.substring(0, 10);
	}catch(e){}

	return name;
}