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

var global_cell_number = 0;

// function for reloading the current page
// for theme/scene style changes...
function submitFormToTemplate(url) {
	document.form_ht_select_show.submit();
}

function to2Node(num) {
	document.location = "/store/nodePage.asp?LS=0&G=2&RN="+num;
}

function to2Style(url_c) {
	//alert ("to2Style --> url_c: " + url_c);
	document.location = url_c;
}

function doIMouseClick(i) {
	document.location = "/store/nodePage.asp?LS=0&G=2&RN="+i;
	return true;
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

var	docObj = "document.";
var	styleObj = "";
if (document.all) {
	docObj = "document.all.";
	styleObj = ".style";
}
function clearMenus() { // ie
	var	i,e;
	for (i = 0; i < selected.length; i++) {
		e = selected[i];
		if (e != "undefined") {
			elempt = eval(docObj+"sO" + e + styleObj);
			if (elempt != null) {
				elempt.visibility = "hidden"; } } }
	clearLitp("-1");
	selected.length = 0;
}

//function clearMenus() {	// Netscape 6
//	var	i,e;
//	for (i = 0; i < selected.length; i++) {
//		e = selected[i];
//		elempt = document.getElementById("sO" + e);
//		if (elempt != null) {
//			elempt.style.visibility = "hidden";
//		}
//	}
//	clearLitp("-1");
//	selected.length = 0;
//}

function doIMouseOut(cdiv) {
	setClearTime();
}

function clearOtherMenus(lev) {
	if (selected.length > lev) {
		e = selected[lev];
		if (e != "undefined") {
			elempt = eval(docObj+"sO" + e + styleObj);
			if (elempt != null) elempt.visibility = "hidden";
		}
		for (k = lev+1; k < selected.length; k++) {
			e = selected[k];
			if (e != "undefined") {
				elempt = eval(docObj+"sO" + e + styleObj);
				if (elempt != null) elempt.visibility = "hidden";
			}
		}
		selected.length = lev;
	}
	for (k = lev+1; k < 4; k++) {
		if (hilited[k] != -1) {
			elempt = eval(docObj+"cell" + hilited[k] + styleObj);
			if ((elempt != null)&&(elempt.type != "undefined")) { 			
			
			//global_cell_number
			identity=document.getElementById("cell" + global_cell_number); 
			identity.className="menup_off";
			
			//elempt.background = "#164053";
			//elempt.background = global_back_color;
			elempt = eval(docObj+"cell" + hilited[k] + ".all['c']" + styleObj); 
			//elempt.color = "#FFFFFF";
			hilited[k] = -1;
			}
		}
	}
}

function doTMouseOver(lev,cdiv,src) {
	var	elempt;
	var elemID = "cell" + cdiv;
	var temp1;
	var temp2;
	if (cdiv != "undefined") {
		if (hilited[lev] != cdiv) {
			if (hilited[lev] != -1) {
				elempt = eval(docObj+"cell" + hilited[lev] + styleObj);
			elempt = eval(docObj+"cell" + hilited[lev] + styleObj);
				if ((elempt != null)&&(elempt.type != "undefined")) { 								
				
				//temp1 = getElementStyle(elemID, "backgroundColor", "BACKGROUND-COLOR");				
				//alert ("temp1..." + temp1);
				//elempt.background = temp1;
				//global_back_color = temp1;
				
				identity=document.getElementById("cell" + hilited[lev]); 
				identity.className="menup_off";
				
				elempt = eval(docObj+"cell" + hilited[lev] + ".all['c']" + styleObj); 				
				//elempt.color = "#FFFFFF";
				}
			}
			elempt = eval(docObj+"cell" + cdiv + styleObj);
			if ((elempt != null)&&(elempt.type != "undefined")) {
			
			//temp1 = getElementStyle(elemID, "borderBottomColor", "BORDER-BOTTOM-COLOR");				
			//
			//elempt.background = "#000000";			
			
			identity=document.getElementById("cell" + cdiv); 			
			identity.className="menup_on";
			global_cell_number = cdiv;
			
			elempt = eval(docObj+"cell" + cdiv + ".all['c']" + styleObj); 
			//elempt.color = "#89BCCE";
			//elempt.color = temp1;
			hilited[lev] = cdiv; 
			}
		}
	}
	clearOtherMenus(lev);
	cancelClearTime();
}
function clearLitp(ltab) {
	var	elempt;
	if ((mlit != "-1")&&(mlit != ltab)) {
		elempt = eval(mlit + styleObj);
		//elempt.background = "#548597";
		elempt.background = "";
	}
	mlit = ltab;
}

function img_actp(divname,n) {
	var	elempt;
	elempt = eval(divname + styleObj);
	elempt.background = "#000000";
	clearLitp(divname);
	cancelClearTime();
	lit = n;
}

function doIMouseOver(i,lev,ccc,src) {
	var	k,e;
	var	elempt;
	var	OK = false;
	if (i == -1) clearOtherMenus(lev);
	else {
	if (ccc == -1) OK = true;
	else {
		elempt = eval(docObj+"sO" + src + styleObj);
		OK = (elempt.visibility == "visible");
	}
	clearOtherMenus(lev);
	if (hilited[lev] != ccc) {
		if (hilited[lev] != -1) {
		elempt = eval(docObj+"cell" + hilited[lev] + styleObj);
			if ((elempt != null)&&(elempt.type != "undefined")) { 
			//var elemID = "cell" + lev;
			//temp1 = getElementStyle(elemID, "backgroundColor", "BACKGROUND-COLOR");				
			
			identity=document.getElementById("cell" + global_cell_number); 
			identity.className="menup_off";
			
			//elempt.background = "#164053";
			//elempt.background = global_back_color;
			elempt = eval(docObj+"cell" + hilited[lev] + ".all['c']" + styleObj); 
			//elempt.color = "#FFFFFF";
			hilited[lev] = -1;
			}
		}
	}
	if (ccc == "undefined") ccc = -1;
	if (ccc != -1) {
		elempt = eval(docObj+"cell" + ccc + styleObj);
		if (elempt != null) {
		
			//identity=document.getElementById("cell" + ccc); 
			//identity.className="menup_on";
			
			elempt.background = "#000000";
			elempt = eval(docObj+"cell" + ccc + ".all['c']" + styleObj); 
			//elempt.color = "#89BCCE";
			hilited[lev] = ccc;
		}
	}
	if (OK) {
		if (i != "undefined") {
			elempt = eval(docObj+"sO" + i + styleObj);
			if ((elempt != null)&&(elempt.type != "undefined")) elempt.visibility = "visible";
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


