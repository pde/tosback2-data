// JavaScript Written  at R/GA Interactive in fall 1999
	var	n;
	var	mlit = -1;
	var	lit = -1;
	var	imglit = "";


var	selected = new Array();
var	hilited = new Array(4);
hilited[0] = -1;
hilited[1] = -1;
hilited[2] = -1;
hilited[3] = -1;
var	timer = null;
function to2Node(num) {
	document.location = "/store/nodePage.asp?LS=0&RN="+num;
}
function to2Style(num) {
	document.location = "/store/nodePage.asp?LS=0&RN="+num;
}
function doIMouseClick(i) {
	document.location = "/store/nodePage.asp?LS=0&RN="+i;
	return true;
}

function to2Style(url_c) {
	//alert ("to2Style --> url_c: " + url_c);
	document.location = url_c;
}

function setClearTime() {
	if (timer) clearTimeout(timer);
	timer = null;
	timer = setTimeout("clearMenus()",600);
}
function cancelClearTime() {
	if (timer) clearTimeout(timer);
	timer = null;
}


function clearMenus() {	// Netscape 6
	var	i,e;
	for (i = 0; i < selected.length; i++) {
		e = selected[i];
		elempt = document.getElementById("sO" + e);
		if (elempt != null) {
			elempt.style.visibility = "hidden";
		}
	}
	clearLitp("-1");
	selected.length = 0;
}

function doIMouseOut(cdiv,src) { // Netscape 6
	setClearTime();
}
function clearOtherMenus(lev) {	// Netscape 6
	if (selected.length > lev) {
		e = selected[lev];
		if (e != "undefined") {
			elempt = document.getElementById("sO" + e);
			if (elempt != null) elempt.style.visibility = "hidden";
		}
		for (k = lev+1; k < selected.length; k++) {
			e = selected[k];
			if (e != "undefined") {
				elempt = document.getElementById("sO" + e);
				if (elempt != null) elempt.style.visibility = "hidden";
			}
		}
		selected.length = lev;
	}
}

function doTMouseOver(i,lev,cdiv,src) {	// Netscape 6
	var	elempt;
	if (cdiv != "undefined") {
		if (hilited[lev] != cdiv) {
			if (hilited[lev] != -1) {
				elempt = document.getElementById("cell" + cdiv);
				if ((elempt != null)&&(elempt.style.type != "undefined")) {
					//elempt.style.backgroundColor="#89BCCE";
				}
			}
		}
	}
	clearOtherMenus(lev);
	cancelClearTime();
}
function clearLitp(ltab) {	// Netscape 6
	var	elempt;
	if ((mlit != "-1")&&(mlit != ltab)) {
		elempt = document.getElementById(mlit);
		//elempt.style.background = "";
	}
	mlit = ltab;
}

function img_actp(divname,n) {	// Netscape 6
	var	elempt;
	elempt = document.getElementById(divname);
	//elempt.style.background = "#000000";
	clearLitp(divname);
	cancelClearTime();
	lit = n;
}

function doIMouseOver(i,lev,ccc,src) {	// Netscape 6
	var	k,e;
	var	elempt;
	var	OK = false;
	if (i == -1) clearOtherMenus(lev);
	else {
		if (ccc == -1) OK = true;
		else {
			elempt = document.getElementById("sO" + src);
			OK = (elempt.visibility == "visible");
		}
		clearOtherMenus(lev);

		if (hilited[lev] != ccc) {
			if (hilited[lev] != -1) {
				elempt = document.getElementById("cell" + hilited[lev]);
				if ((elempt != null)&&(elempt.type != "undefined")) { 
					//elempt.style.backgroundColor="#89BCCE";
					//elempt.style.color = "#FFFFFF";
					hilited[lev] = -1;
				}
			}
		}
		if (ccc == "undefined") ccc = -1;
		if (ccc != -1) {
			elempt = document.getElementById("cell" + ccc);
			if (elempt != null) {
				//elempt.style.backgroundColor="#89BCCE";
			}
		}
		if (OK) {
			if (i != "undefined") {
				elempt = document.getElementById("sO" + i);
				if ((elempt != null)&&(elempt.type != "undefined")) elempt.style.visibility = "inherit";

				selected[lev] = i;
			}
			cancelClearTime();
		}
	}
}

function fnGetCookieVal (offset) {
  var endstr = document.cookie.indexOf (";", offset);
  if (endstr == -1)
    endstr = document.cookie.length;
  return unescape(document.cookie.substring(offset, endstr));
}

function fnFixCookieDate (date) {
  var base = new Date(0);
  var skew = base.getTime(); // dawn of (Unix) time - should be 0
  if (skew > 0)  // Except on the Mac - ahead of its time
    date.setTime (date.getTime() - skew);
}

function fnGetCookie (name) {
  var arg = name + "=";
  var alen = arg.length;
  var clen = document.cookie.length;
  var i = 0;
  while (i < clen) {
    var j = i + alen;
    if (document.cookie.substring(i, j) == arg)
      return fnGetCookieVal (j);
    i = document.cookie.indexOf(" ", i) + 1;
    if (i == 0) break; 
  }
  return null;
}

function fnSetCookie (name,value,expires,path,domain,secure) {
  document.cookie = name + "=" + escape (value) +
    ((expires) ? "; expires=" + expires.toGMTString() : "") +
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") +
    ((secure) ? "; secure" : "");

}

function CookiePopup(strPageName, strCookieName, intWidth, intHeight) {
	if (fnGetCookie(strCookieName) != "true") {
		if (strCookieName != "Preview") {
			fnSetCookie(strCookieName,"true",null,"/",null,false);
		}
		window.open(strPageName,strCookieName,'width=' + intWidth + ',height=' + intHeight);
	}
}
// onLoad="CookiePopup('/homepage/giftcards.html', 'giftcards', 350, 150);"

function OpenSizeWindow(){
	OpenViewWindow("/hottopic/services/size_chart.jsp",504,440,"yes","no");
}
function go() {	// local clientside javascript
	var	sstr = "";
	sstr = document.searchit.SSTR.value;
	//sstr = sstr.toUpperCase();
	var	len = sstr.length;
	var	strOut = "";
	var	i = 0;
	//var	len = sstr.split(" ");
	var	j = 0;
	while (i < len) {
		j = sstr.indexOf(" ",i);
		if (j > i) {
			strOut += sstr.substring(i,j)+"+";
			i = j+1;
		} else {
			strOut += sstr.substring(i,len);
			i = len;
		}
	}
	window.location = "/store/searchSKU.asp?LS=0&G=2&SSTR="+strOut+"&ret=/default";
}

var     windowpic = null;
var		windowpic2 = null ;

function init(){	// local clientside javascript
}
function OpenViewWindow( go_there, width, height,scbar,tbar ){		// local clientside javascript
   // mainCleanup();
	if(isNaN(width)) width=390 ;
	if(isNaN(height)) height=427 ;
	if(scbar != "yes") scbar="no" ;
	if(tbar != "yes") tbar ="no" ;

	var bars = "menubar=no,toolbar=no" ;
	if( tbar == "yes" ) bars = "menubar=yes,toolbar=yes" ;

    var strwindow = "toolbar=no,width=" + width + ",height=" + height + ",directories=no,status=no,scrollbars="+scbar+"," + bars + ",resizable=yes";
    if (navigator.appName == "Microsoft Internet Explorer") {
            strwindow = "toolbar=no,width=" + (width-10) + ",height=" + (height-5) + ",directories=no,status=no,scrollbars="+scbar+"," + bars + ",resizable=yes";
    } 
    windowpic = window.open(go_there, "wwchild", strwindow);
}

function OpenAboutWindow( go_there, width, height,scbar,tbar ) {	// local clientside javascript
	if(isNaN(width)) width=390 ;
	if(isNaN(height)) height=427 ;
	if(scbar != "yes") scbar="no" ;
	if(tbar != "yes") tbar ="no" ;

	var bars = "menubar=no,toolbar=no";
	if( tbar == "yes" ) {
		bars = "menubar=yes,toolbar=yes";
	}
    var strwindow = "toolbar=no,width=" + width + ",height=" + height + ",directories=no,status=no,scrollbars="+scbar+"," + bars + ",resizable=yes";
    if (navigator.appName == "Microsoft Internet Explorer") {
            strwindow = "toolbar=no,width=" + (width-10) + ",height=" + (height-5) + ",directories=no,status=no,scrollbars="+scbar+"," + bars + ",resizable=yes";
    } 
    windowpic2 = window.open(go_there, "wwchild", strwindow);
}

function doSubmit(mode) {
	document.addressForm.elements["mode"].value=mode;
	document.addressForm.submit();
}

	function formValidate(form) {
		mandatory = new Array("username","reminder") ;

		for(i = 0 ; i < mandatory.length ; i++) {
			control = eval("form."+mandatory[i]);
/*		if(control.value == "" || control.value.replace(/\s/g, "") == "") {
				alert("You must fill out all required fields before submitting the form");
				control.focus(); control.select();
				return false;
			}
*/
			var re = /'/i;
			if(control.value.search(re) != -1) {	
				alert('Fields cannot contain apostrophes.' );
				control.focus(); control.select();
				return false;
			}
		}
		form2.submit()
	}