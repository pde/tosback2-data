// KidsHealth common Javascript

// Copyright date
var KHcopyDate=2012;

function MM_openBrWindow(theURL,winName,features)
{
	window.open(theURL,winName,features);

}

// Close window in all browsers
function closeWindow() {
	window.open('','_parent','');
	window.close();
}

// This is common for both Webby PopUp and Tracking Cookie.
function retrieveCookie( cookieName ) {
	var cookieJar = document.cookie.split( "; " );
	for( var x = 0; x < cookieJar.length; x++ ) 
	{
                var oneCookie = cookieJar[x].split( "=" );
		if( oneCookie[0] == escape( cookieName ) ) 
		{ 
                   return unescape( oneCookie[1] ); 
		}
	}
	return null;
}

// The following code is for Webby Popup - 2008

var page = "http://enzo.kidshealth.org/misc/voteForUs/vote.html"; 

var windowprops = "width=600,height=400,location=no,toolbar=no,menubar=no,scrollbars=no,resizable=no"; 
var expDays = .021;	//.02 means 30 minutes
//var expDays = .0021; // 3 minutes
var exp = new Date(); 
exp.setTime(exp.getTime() + (expDays*24*60*60*1000)); 


function delay()
{
	for(i=0; i<100000;i++){
	}
}

function setWebbyCookie( cookieName, cookieValue, lifeTime, path, domain, isSecure ) {
 	if( !cookieName ) { return false; }
	if( lifeTime == "delete" ) { lifeTime = -10; } //this is in the past. Expires immediately.
	
	document.cookie = escape( cookieName ) + "=" + escape( cookieValue ) +
		(lifeTime ? ";expires=" + exp.toGMTString() : "") +
		( path ? ";path=" + path : "") + ( domain ? ";domain=" + domain : "") + 
		( isSecure ? ";secure" : "");
	//check if the cookie has been set/deleted as required
	if( lifeTime < 0 ) 
	{ 
	 if( typeof( retrieveCookie( cookieName ) ) == "string" ) 
		{ 
			return false; 
		} 
        		return true; 
	}
	if( typeof( retrieveCookie( cookieName ) ) == "string" ) 
	{ 

		return true; 
	} 
	return false;
}
function DeleteCookie (name) 
{ 
	var expNow = new Date(); 
	expNow.setTime (expNow.getTime() - 1); 
	var cval = retrieveCookie ("kidshealthParentCookie"); 
	if(cval != null && cval.length > 0)
		document.cookie = "kidshealthParentCookie" + "=" + cval + "; expires=" + expNow.toGMTString() + "; path=/"; 
	else
		document.cookie = "kidshealthParentCookie=pkh_cookie" + "; expires=" + expNow.toGMTString() + "; path=/"; 
} 

function checkCookie()
{
	var myCookie = retrieveCookie( "kidshealthParentCookie" );
	
	if(myCookie != null && myCookie != "" && myCookie != "null" && myCookie.length > 0)
	{
		// alert("Webby Cookie already exists, so do not create and not show the survey screen");
	}
	else
	{
		// alert("Webby Cookie does not exists, please create it and show the survey screen.");
		
		DeleteCookie("kidshealthParentCookie");
		delay();
		var cookieAccepted = setWebbyCookie( "kidshealthParentCookie", "pkh_cookie", "10000", "/", "", "");
		// alert("cookieAccepted is : " + cookieAccepted);
		if(cookieAccepted == true)
    		   var newWindow = window.open(page, "test", windowprops); 
         }
}

// The following code is created for cookie tracking ... 

var TrackingCookingexpiryDate = new Date ( 2024, 02, 12 );
function setCookie( cookieName, cookieValue, lifeTime, path, domain, isSecure ) {
	if( !cookieName ) { return false; }
	document.cookie = escape( cookieName ) + "=" + escape( cookieValue ) +
 		(lifeTime ? ";expires=" + TrackingCookingexpiryDate.toGMTString() : "") +
		( path ? ";path=" + path : "") + ( domain ? ";domain=" + domain : "") + 
		( isSecure ? ";secure" : "");
}

// This method is used by both Tracking Cookie and webby popup.
function reInitializeCookie () 
{ 
   // Following is for Traking Cookie
     
     var myCookie = retrieveCookie ("KHCookie"); 

    if(myCookie != null && myCookie != "" && myCookie != "null" && myCookie.length > 0)
	{
             // alert("Cookie exists don't do any thing ....");		
	}
    else
        {
               var currentDate = new Date();
               var randomnumber=Math.floor(Math.random()*101);
             // alert("Cookie is created for the first time: random number Generated is :"  + randomnumber);
 	       var cookieAccepted = setCookie( "KHCookie", "KH_"+ randomnumber + currentDate.getTime(), "10000", "/", "",""); // modfied by sudha 

        } 

  // Commented out to prevent Webby Cookie from coming up. (CMH)
  // Following is for Webby Cookie.
   // var myWebbyCookie = retrieveCookie ("kidshealthParentCookie"); 
	// alert("myWebbyCookie = " + myWebbyCookie);
   	// if(myWebbyCookie != null && myWebbyCookie != "" && myWebbyCookie != "null" && myWebbyCookie.length > 0)
   	// {
        //	DeleteCookie("kidshealthParentCookie");
        //	delay();
        //	var webbycookieAccepted = setWebbyCookie( "kidshealthParentCookie", "pkh_cookie", "10000", "/", "", "");
		// alert("WebbycookieAccepted : " + webbycookieAccepted);
        // }
  // End of commenting out for Webby Award popup and cookie tracking (CMH)

}

// A seperate method is used for Licensees so that we don't have a coflict with Webby cookie as webby cookie is only for Mothership.
function reInitializeLicenseeCookie () 
{ 
   // Following is for Licensee Traking Cookie 
     
     var myCookie = retrieveCookie ("KHCookie"); 

    if(myCookie != null && myCookie != "" && myCookie != "null" && myCookie.length > 0)
	{
            //  alert("Cookie exists don't do any thing ....");		
	}
    else
        {
               var currentDate = new Date();
               var randomnumber=Math.floor(Math.random()*101);
             //  alert("Cookie is created for the first time: random number Generated is :"  + randomnumber);
 	       var cookieAccepted = setCookie( "KHCookie", "KH_"+ randomnumber + currentDate.getTime(), "10000", "/", "",""); // modfied by sudha 

        } 
}

function KH_unloadFunctions()
{
    // no need to do any thing for tracking cookie

    //following is for Webby cookie
     // alert("Before calling check cookie");

    // Comment out call from Webby popup and cookie trackin (CMH)
    // checkCookie();
    // End Commenting out from Webby popup and cookie trackin (CMH)

}

function toggleLayer(whichLayer)
{
	if (document.getElementById)
		{
			// this is the way the standards work
			var style2 = document.getElementById(whichLayer).style;
			style2.display = style2.display? "":"none";
			//alert("toggle1");
		}
	else if (document.all)
		{
			// this is the way old msie versions work
			var style2 = document.all[whichLayer].style;
			style2.display = style2.display? "":"none";
			//alert("toggle2");
		}
	else if (document.layers)
		{
			// this is the way nn4 works
			var style2 = document.layers[whichLayer].style;
			style2.display = style2.display? "":"none";
			//alert("toggle3");
		}
}
//document.body.style.backgroundImage="url(bgdesert.jpg)";

function toggleBackground(whatLayer)
{
	if (document.getElementById)
		{
			// this is the way the standards work
			var style2 = document.getElementById(whatLayer).style;
			style2.backgroundImage = style2.backgroundImage="url(/licensees/standard_licensee/images/articleShrink.gif)";
		}
	else if (document.all)
		{
			// this is the way old msie versions work
			var style2 = document.all[whatLayer].style;
			style2.backgroundImage = style2.backgroundImage="url(/licensees/standard_licensee/images/articleShrink.gif)";

		}
	else if (document.layers)
		{
			// this is the way nn4 works
			var style2 = document.layers[whatLayer].style;
			style2.backgroundImage = style2.backgroundImage="url(/licensees/standard_licensee/images/articleShrink.gif)";

		}
}

function toggleClass(id, classOne, classtwo) {
	identity=document.getElementById(id);
	class_name = identity.className;
	//createCookie('khStickyCat',id);
	if (class_name == classOne) {
		identity.className = classtwo;
	}
	else {
		identity.className = classOne;
	}
} 

function ltrim ( s ) 
{ 
	return s.replace( /^\s*/, "" ) 
} 

function rtrim ( s2 ) 
{ 
	return s2.replace( /\s*$/, "" ); 
} 

function trim ( s ) 
{ 
	return rtrim(ltrim(s)); 
} 


function submit_contact_us_form(){ 
	//alert("111"); //alert(" document.mailForm.txtField_findUs.value  =" + document.mailForm.txtField_findUs.value + ",    document.mailForm.txtField_whatArticle.value =" + document.mailForm.txtField_whatArticle.value + ",  document.mailForm.txtField_thoughts.value =" + document.mailForm.txtField_thoughts.value + "--");
	if( (trim(document.mailForm.txtField_findUs.value) == null || trim(document.mailForm.txtField_findUs.value) == "") && 
		(trim(document.mailForm.txtField_whatArticle.value) == null || trim(document.mailForm.txtField_whatArticle.value) == "") && 
		(trim(document.mailForm.txtField_thoughts.value) == null || trim(document.mailForm.txtField_thoughts.value) == "") )	
	{
		alert("The form is blank. Please fill in the fields and send it again."); 
		return false;	
	}
	else
	{
		if (document.referrer && document.referrer!="")
			document.mailForm.parent_win_url.value = document.referrer;
//		if( document.layers )
//			document.mailForm.parent_win_url.value = window.opener.location.href;
//		else
//			document.mailForm.parent_win_url.value = window.opener.location;

		document.mailForm.submit(); 
		return true;
	}
}

function gamRefresh(url) {
	//Fake GameRefresh to clear up a problem with multi-page instruction sheets.
}

// The Following is specific to LHR Search and Browse navigation elements

	function clearText(field) {
						if (field.defaultValue == field.value) field.value = '';
						else if (field.value == '') field.value = field.defaultValue;
						}
						
						




function licTabSwitcher(section)
{
	_licTabParents = document.getElementById('licTabParents');
	_licTabKids = document.getElementById('licTabKids');
	_licTabTeens = document.getElementById('licTabTeens');
	_licNavParentsLinks = document.getElementById('licNavParentsLinks');
	_licNavKidsLinks = document.getElementById('licNavKidsLinks');
	_licNavTeensLinks = document.getElementById('licNavTeensLinks');
	
	if(section == "Parents")
		{
			//alert("parents");
			if(_licTabParents.className == "licTabActive") {
				_licTabParents.className = "licTabWasActive";
			}
			else {
				if(_licTabTeens != null) {
					_licTabTeens.className = "licTabWasActive";
				}
				_licTabParents.className = "licTabActive";
				if(_licTabKids != null) {
					_licTabKids.className = "licTabWasActive";
				}
			}
			if(_licNavParentsLinks.style.display == "none" || _licNavParentsLinks.style.display == "")
				{
					_licNavParentsLinks.style.display = "block";
					if(_licNavKidsLinks != null) {
						_licNavKidsLinks.style.display = "none";
					}
					if(_licNavTeensLinks != null) {
						_licNavTeensLinks.style.display = "none";
					}
				}
			else {
					_licNavParentsLinks.style.display = "none";
				}
		}
	
	else if(section == "Teens")
		{
			//alert("teens");
			if(_licTabTeens.className == "licTabActive") {
				_licTabTeens.className = "licTabWasActive";
			}
			else {
				if(_licTabParents != null) {
					_licTabParents.className = "licWasTabActive";
				}
				if(_licTabKids != null) {
					_licTabKids.className = "licTabWasActive";
				}
			_licTabTeens.className = "licTabActive";
			
			}
			if(_licNavTeensLinks.style.display == "none" || _licNavTeensLinks.style.display == "")
				{
					if(_licNavParentsLinks != null) {
						_licNavParentsLinks.style.display = "none";
					}
					if(_licNavKidsLinks != null) {
						_licNavKidsLinks.style.display = "none";
					}
					_licNavTeensLinks.style.display = "block";
				}
			else {
					_licNavTeensLinks.style.display = "none";
				}
		}
	
	else
		{
			//alert("kids");
			if(_licTabKids.className == "licTabActive") {
				_licTabKids.className = "licTabWasActive";
			}
			else {
			
			if(_licTabParents != null) {
				_licTabParents.className = "licTabWasActive";
			}
			_licTabKids.className = "licTabActive";
			if(_licTabTeens != null) {
				_licTabTeens.className = "licTabWasActive";
			}
			
			}
			if(_licNavKidsLinks.style.display == "none" || _licNavKidsLinks.style.display == "")
				{
					if(_licNavParentsLinks != null) {
						_licNavParentsLinks.style.display = "none";
					}
					_licNavKidsLinks.style.display = "block";
					if(_licNavTeensLinks != null) {
						_licNavTeensLinks.style.display = "none";
					}
					}
			else {
					_licNavKidsLinks.style.display = "none";
				}
		
		}
} 

// End LHR Specifics