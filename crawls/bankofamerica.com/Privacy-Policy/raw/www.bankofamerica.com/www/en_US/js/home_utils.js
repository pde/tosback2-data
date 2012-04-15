/* refactored for SOLB */

var ERROR_MESSAGE_EMPTY_FIELDS = "You did not enter your Online ID. Please enter your Online ID to continue.";
var ERROR_MESSAGE_INVALID_ID = "The Online ID you entered does not match our records. Please re-enter your Online ID.";
var TXT_ENTER_OID = "Enter Online ID:";
var TXT_SAVE_OID = "Save this Online ID";
var TXT_ADD_OR_USE = "Add or use another Online ID";
var TXT_OR = "Or";
var IMAGE_PATH = "/www/en_US/images/";


function hover(ref, classRef) { eval(ref).className = classRef; }
		
		function getCookie(NameOfCookie) {
			//alert(NameOfCookie);	//BOA_HPR, country, state(8)
			if (document.cookie.length > 0) {
				begin = document.cookie.indexOf(NameOfCookie+"=");
				if (begin != -1) {
					begin += NameOfCookie.length+1;
					end = document.cookie.indexOf(";", begin);
					if (end == -1) end = document.cookie.length;
					return unescape(document.cookie.substring(begin, end));
				}
			}
			return null;
		}

		var challenger_cookie = getCookie("BOA_HPR");
		statecookie = getCookie("state");
		if (statecookie != null) {
			if(outageCheck(statecookie)) {
				if(!versionCheck()) {
						location.href = "/index.cfm?page_msg=outage&showstatic=no";
				} else {
					if ( statecookie == "WA" || statecookie == "ID" ) {
							location.href = "/outage/index_nw.htm";
					} else {
						if( challenger_cookie == "challenger") {
							location.href = "/outage/index2.htm";
						} else {
							location.href = "/outage/index.htm";
						}
					}
				}
			}
		}

if (top != self) {top.location=self.location;}

function goPage(selectlist) {
	theURL = selectlist.options[selectlist.selectedIndex].value
	if (theURL != "") { location.href = theURL }
}

function submit_search(){ document.SiteSearchForm.submit(); }

function bt_rollover(ref, classRef) { eval(ref).className = classRef; }

function create_button(text, href, css_class, onclick_evt, onmouseover_evt, onmouseout_evt, tabindex, txt_title) {
	var t = "";
	if (( document.getElementById )||( document.all )) {
		// browser implements part of W3C DOM HTML
		// Gecko, Internet Explorer 5+, Opera 5+
		// Internet Explorer 4 or Opera with IE user agent
		t = "<div class=" + css_class + "><a href=\"" + href + "\" class=" + css_class
		  + " onFocus='bt_rollover(this, \"" + css_class + "-over\")'"
		  + " onBlur='bt_rollover(this, \"" + css_class + "\")'";

		if (onclick_evt) { t = t + " onClick=\"" + onclick_evt + "\""; }
		if (onmouseover_evt) { t = t + " onMouseOver=\"" + onmouseover_evt + "\""; }
		if (onmouseout_evt) { t = t + " onMouseOut=\"" + onmouseout_evt + "\""; }
		if (tabindex) { t = t + " tabindex=\"" + tabindex + "\""; }
		if (txt_title) { t = t + " title=\"" + txt_title + "\""; }
		t = t + ">" + text + "<\/a><\/div>";

	} else if ( document.layers ) {
		// Netscape 4
		t = "<input type=submit  name=" + text + " value=" + text + " alt=" + text + " class=" + css_class + ">";
	}
	document.write(t);
}

var rememberme_prefill = "";
var cname = "olb_signin_prefill=";
// Get the cookie value
var dcookie = document.cookie;

var clen = dcookie.length;
var cbegin = 0;

while (cbegin < clen) {
	var vbegin = cbegin + cname.length;
	if (dcookie.substring(cbegin, vbegin) == cname) {
		var vend = dcookie.indexOf (";", vbegin);
		if (vend == -1) vend = clen;
		rememberme_prefill = unescape(dcookie.substring(vbegin, vend));
	}
	cbegin = dcookie.indexOf(" ", cbegin) + 1;
	if (cbegin == 0) break;
}


if (rememberme_prefill != "") {
	vlen = rememberme_prefill.length;
	var vcolon = rememberme_prefill.indexOf(":", 0) + 1;
	if (vcolon == 0) {
		
		rememberme_prefill = "";
	}
	else {
		rememberme_prefill = rememberme_prefill.substring(vcolon, vlen);
	
		
		rememberme_prefill = new Array(rememberme_prefill);
		rememberme_prefill[0] = new Array(rememberme_prefill[0]);	
		var today = new Date();
		rememberme_prefill[0][1] = today;
	}
	
}


if (rememberme_prefill == "") {

	var cname = "olb_signin_prefill_multi=";
	var cbegin = 0;
	// The following while() loop returns the VALUE of the 'olb_signin_prefill_multi' cookie(if it exists)
	while (cbegin < clen) {
		var vbegin = cbegin + cname.length;
		if (dcookie.substring(cbegin, vbegin) == cname) {
			var vend = dcookie.indexOf (";", vbegin);
			if (vend == -1) vend = clen;
			rememberme_prefill = unescape(dcookie.substring(vbegin, vend));
		}
		cbegin = dcookie.indexOf(" ", cbegin) + 1;
		if (cbegin == 0) break;
	}
	
	if (rememberme_prefill !="") {
		
		if (rememberme_prefill.indexOf("||")!= -1) {
			var myArray = rememberme_prefill.split("||");
		} else {
			myArray = new Array();
			myArray[0] = rememberme_prefill;
		}
			
		var i = 0;							
		var aLen = myArray.length;			
		rememberme_prefill = new Array();	
		var mySplit;						
		
		
		while (i<aLen) {
			rememberme_prefill[i] = new Array(2);
			mySplit = myArray[i].split(":");

			rememberme_prefill[i][0]=mySplit[0];
			rememberme_prefill[i][1]=mySplit[1];
			i++
		}
	}
}



function displayOnlineIDField(orText) {
		
	//Build Online ID field out into variables
	var dynamicIDCode1 = '<div class="home-signin-txt4"><label for="id"><strong>'+TXT_ENTER_OID+'<\/strong><\/label><\/div>';
	var dynamicIDCode2 = '<input type="text" name="id" maxlength="32" id="id" class="home-signin-textbox" size="17" value="" tabindex="1" />';
	var dynamicIDCode3 = '<input type="checkbox" name="rembme" id="rembme" value="Y" tabindex="2" />';
	var dynamicIDCode4 = '<div class="home-signin-txt4"><label for="rembme">'+TXT_SAVE_OID+'<\/label><\/div>';
	var dynamicOrCode = '<div class="home-signin-txt4"><img src="/x.gif" width="1" height="6" alt="" border="0" /><br /><strong>'+TXT_OR+'<\/strong><\/div>';
	var dynamicBlankRowCode = '<img src="/x.gif" width="1" height="5" alt="" border="0" />';
	
	if( document.getElementById )
    {
		if (orText) {
			document.getElementById("dynamicOrText").innerHTML = dynamicOrCode;				
		}
        document.getElementById("dynamicOnlineIDField1").innerHTML = dynamicIDCode1;	
		document.getElementById("dynamicOnlineIDField2").innerHTML = dynamicIDCode2;	
		document.getElementById("dynamicOnlineIDField3").innerHTML = dynamicIDCode3;	
		document.getElementById("dynamicOnlineIDField4").innerHTML = dynamicIDCode4;	
		document.getElementById("dynamicAddIDLink").innerHTML = '';						
		
    }
    else if( document.all )
    {
		if (orText) {
			document.all.dynamicOrText.innerHTML = dynamicOrCode;						
		}
		document.all.dynamicOnlineIDField1.innerHTML = dynamicIDCode1;				
		document.all.dynamicOnlineIDField2.innerHTML = dynamicIDCode2;				
		document.all.dynamicOnlineIDField3.innerHTML = dynamicIDCode3;				
		document.all.dynamicOnlineIDField4.innerHTML = dynamicIDCode4;				
		document.all.dynamicAddIDLink.innerHTML = '';								
    }
	
	if (document.frmSignIn.id != null) {	
		document.frmSignIn.id.focus();
	}
	
    return;
	
}

function displayAddAnotherIDLink() {
	var IDLinkCode = '<div class="home-signin-txt1"><a href="javascript:displayOnlineIDField(true);" tabindex="3">'+TXT_ADD_OR_USE+'<\/a><\/div>';
	
	if( document.getElementById ) {
		document.getElementById("dynamicAddIDLink").innerHTML = IDLinkCode;
	} else if(document.all) {
		document.all.dynamicAddIDLink.innerHTML = IDLinkCode;
	}
	return;
}


function dateCheck(lDate) {
	
	var today = new Date();
	
	var convertedDate = Date.parse(lDate);
	var date2 = new Date(convertedDate);
	
    var difference =
        Date.UTC(y2k(today.getYear()),today.getMonth(),today.getDate(),0,0,0)
      - Date.UTC(y2k(date2.getYear()),date2.getMonth(),date2.getDate(),0,0,0);
    return difference/1000/60/60/24;
}

function y2k(number) { return (number < 1000) ? number + 1900 : number; }


var signincnt = 0;
var isNav = (navigator.appName.indexOf("Netscape") != -1);
var isIE = (navigator.appName.indexOf("Microsoft") != -1);

function initHandlers () {
	addhandlers( window );
	addhandlers( document );
	addhandlers( document.frmSignIn );
	if (document.frmSignIn.pc != null) { 
		addhandlers( document.frmSignIn.pc );
	}
	
	if (document.frmSignIn.id.value == "*******") {document.frmSignIn.id.value = ""}

	if (document.frmSignIn.id != null) {
		if (document.frmSignIn.id.value == "") {
			document.frmSignIn.id.focus();
		} else {
			if (document.frmSignIn.pc != null) {
				document.frmSignIn.pc.focus();
			}
		}
	} else if (document.frmSignIn.pc != null) {
		document.frmSignIn.pc.focus();
	}

}

function mainHandler( e ) {
	var whichField;

	if ( isNav ) {
		if ( e.target.name )
			whichField = e.target.name;
		Key = e.which;
	}
	if ( isIE ) {
		e = window.event;
		if ( e.srcElement && e.srcElement.name )
			whichField = e.srcElement.name;
		Key = e.keyCode;
		e.cancelBubble = true;  
	}
	if (( Key == 13 ) && ( whichField == "pc" )) {
		// alert( "Key: " + Key + " whichField: " + whichField);
		doSignIn();
	}
}
function addhandlers(o) {
	if ( isNav )
		window.captureEvents(Event.KEYPRESS);
	o.onkeypress = mainHandler;
}

function isValidAccessID(accessIDString) {

  var accessID = strip(accessIDString, " ");
  if (!containsValidCharsID(accessID)) {
    return false;
  }
  if ((accessID.length < 5) || (accessID.length > 32)) {
    return false;
  }
  return true;
}

function doLocatorSearch() {
    imgLocator = new Image();
    imgLocator.src = IMAGE_PATH + "tracking/homepage_locator.gif";
    document.frmLocator.submit();
}


function jsInclude(jsFile) {

      document.write('<scr' + 'ipt type="text/javascript" src="' + jsFile + '"></scr' + 'ipt>'); 

}

function submit_search(){ 
	document.SiteSearchForm.submit(); 
}

jsInclude( "/www/en_US/js/search/jquery-1.2.6.js" );
jsInclude( "/www/en_US/js/search/jquery.autocomplete.js" );
jsInclude( "/www/en_US/js/search/search-lite.js" );