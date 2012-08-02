/**
 * COMMON DHTML FUNCTIONS
 * These are handy functions I use all the time.
 *
 * By Seth Banks (webmaster at subimage dot com)
 * http://www.subimage.com/
 *
 * Up to date code can be found at http://www.subimage.com/dhtml/
 *
 * This code is free for you to use anywhere, just keep this comment block.
 */

/**
 * X-browser event handler attachment and detachment
 * TH: Switched first true to false per http://www.onlinetools.org/articles/unobtrusivejavascript/chapter4.html
 *
 * @argument obj - the object to attach event to
 * @argument evType - name of the event - DONT ADD "on", pass only "mouseover", etc
 * @argument fn - function to call
 */

var ie=document.all?1:0; 
var ns=document.layers?1:0; 
var dom=document.getElementById?1:0;

function categorystyle(scategory, flag) {
    var categoryname = '';
    categoryname = '81outerwear'.toLowerCase();
    if (categoryname == 'girls_whatsnewall') {
        categoryname = 'girls_whatsnew';
        scategory = 'girls_whatsnew';
    }

    if (scategory.substring(0, 3) == '21m') {
        if (flag == 1) document.getElementById(scategory).innerHTML = '';
        else {
            if (scategory == categoryname) document.getElementById(scategory).innerHTML = '';
            else document.getElementById(scategory).innerHTML = '';
        }
    } else {
        if (flag == 1) document.getElementById(scategory).innerHTML = '&gt;&nbsp;';
        else {
            if (scategory == categoryname) document.getElementById(scategory).innerHTML = '&gt;&nbsp;';
            else document.getElementById(scategory).innerHTML = '&nbsp;&nbsp;&nbsp;';
        }
    }
}

function addEvent(obj, evType, fn){
 if (obj.addEventListener){
    obj.addEventListener(evType, fn, false);
    return true;
 } else if (obj.attachEvent){
    var r = obj.attachEvent("on"+evType, fn);
    return r;
 } else {
    return false;
 }
}
function removeEvent(obj, evType, fn, useCapture){
  if (obj.removeEventListener){
    obj.removeEventListener(evType, fn, useCapture);
    return true;
  } else if (obj.detachEvent){
    var r = obj.detachEvent("on"+evType, fn);
    return r;
  } else {
    alert("Handler could not be removed");
  }
}

/**
 * Code below taken from - http://www.evolt.org/article/document_body_doctype_switching_and_more/17/30655/
 *
 * Modified 4/22/04 to work with Opera/Moz (by webmaster at subimage dot com)
 *
 * Gets the full width/height because it's different for most browsers.
 */
function getViewportHeight() {
	if (window.innerHeight!=window.undefined) return window.innerHeight;
	if (document.compatMode=='CSS1Compat') return document.documentElement.clientHeight;
	if (document.body) return document.body.clientHeight; 

	return window.undefined; 
}
function getViewportWidth() {
	var offset = 17;
	var width = null;
	if (window.innerWidth!=window.undefined) return window.innerWidth; 
	if (document.compatMode=='CSS1Compat') return document.documentElement.clientWidth; 
	if (document.body) return document.body.clientWidth; 
}

/**
 * Gets the real scroll top
 */
function getScrollTop() {
	if (self.pageYOffset) // all except Explorer
	{
		return self.pageYOffset;
	}
	else if (document.documentElement && document.documentElement.scrollTop)
		// Explorer 6 Strict
	{
		return document.documentElement.scrollTop;
	}
	else if (document.body) // all other Explorers
	{
		return document.body.scrollTop;
	}
}
function getScrollLeft() {
	if (self.pageXOffset) // all except Explorer
	{
		return self.pageXOffset;
	}
	else if (document.documentElement && document.documentElement.scrollLeft)
		// Explorer 6 Strict
	{
		return document.documentElement.scrollLeft;
	}
	else if (document.body) // all other Explorers
	{
		return document.body.scrollLeft;
	}
}


function ReplaceStr(strOriginal,strFind,strChange)
{
	return strOriginal.split(strFind).join(strChange);
}



function TrimLeft( str ) {
	var resultStr = "";
	var i = len = 0;

	// Return immediately if an invalid value was passed in
	if (str+"" == "undefined" || str == null)	
		return null;

	// Make sure the argument is a string
	str += "";

	if (str.length == 0) 
		resultStr = "";
	else {	
  		// Loop through string starting at the beginning as long as there
  		// are spaces.
//	  	len = str.length - 1;
		len = str.length;
		
  		while ((i <= len) && (str.charAt(i) == " "))
			i++;

   	// When the loop is done, we're sitting at the first non-space char,
 		// so return that char plus the remaining chars of the string.
  		resultStr = str.substring(i, len);
  	}

  	return resultStr;
} // end TrimLeft

function TrimRight( str ) {
	var resultStr = "";
	var i = 0;

	// Return immediately if an invalid value was passed in
	if (str+"" == "undefined" || str == null)	
		return null;

	// Make sure the argument is a string
	str += "";
	
	if (str.length == 0) 
		resultStr = "";
	else {
  		// Loop through string starting at the end as long as there
  		// are spaces.
  		i = str.length - 1;
  		while ((i >= 0) && (str.charAt(i) == " "))
 			i--;
 			
 		// When the loop is done, we're sitting at the last non-space char,
 		// so return that char plus all previous chars of the string.
  		resultStr = str.substring(0, i + 1);
  	}
  	
  	return resultStr;  	
} // end TrimRight

function formatCurrency(num) {
	num = num.toString().replace(/\$|\,/g,'');
	if(isNaN(num))
	num = "0";
	sign = (num == (num = Math.abs(num)));
	num = Math.floor(num*100+0.50000000001);
	cents = num%100;
	num = Math.floor(num/100).toString();
	if(cents<10)
	cents = "0" + cents;
	for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
	num = num.substring(0,num.length-(4*i+3))+','+
	num.substring(num.length-(4*i+3));
	return (((sign)?'':'-') + '$' + num + '.' + cents);
}

function encodeURL(str) {
    var s0, i, s, u;
    s0 = "";                // encoded str
    for (i = 0; i < str.length; i++) {   // scan the source
        s = str.charAt(i);
        u = str.charCodeAt(i);          // get unicode of the char
        if (s == " ") { s0 += "+"; }       // SP should be converted to "+"
        else {
            if (u == 0x2a || u == 0x2d || u == 0x2e || u == 0x5f || ((u >= 0x30) && (u <= 0x39)) || ((u >= 0x41) && (u <= 0x5a)) || ((u >= 0x61) && (u <= 0x7a))) {       // check for escape
                s0 = s0 + s;            // don't escape
            }
            else {                  // escape
                if ((u >= 0x0) && (u <= 0x7f)) {     // single byte format
                    s = "0" + u.toString(16);
                    s0 += "%" + s.substr(s.length - 2);
                }
                else if (u > 0x1fffff) {     // quaternary byte format (extended)
                    s0 += "%" + (oxf0 + ((u & 0x1c0000) >> 18)).toString(16);
                    s0 += "%" + (0x80 + ((u & 0x3f000) >> 12)).toString(16);
                    s0 += "%" + (0x80 + ((u & 0xfc0) >> 6)).toString(16);
                    s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
                }
                else if (u > 0x7ff) {        // triple byte format
                    s0 += "%" + (0xe0 + ((u & 0xf000) >> 12)).toString(16);
                    s0 += "%" + (0x80 + ((u & 0xfc0) >> 6)).toString(16);
                    s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
                }
                else {                      // double byte format
                    s0 += "%" + (0xc0 + ((u & 0x7c0) >> 6)).toString(16);
                    s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
                }
            }
        }
    }
    return s0;
}
 

 function decodeURL(str){
     var s0, i, j, s, ss, u, n, f;
     s0 = "";                // decoded str
     for (i = 0; i < str.length; i++){   // scan the source str
         s = str.charAt(i);
         if (s == "+"){s0 += " ";}       // "+" should be changed to SP
         else {
             if (s != "%"){s0 += s;}     // add an unescaped char
             else{               // escape sequence decoding
                 u = 0;          // unicode of the character
                 f = 1;          // escape flag, zero means end of this sequence
                 while (true) {
                     ss = "";        // local str to parse as int
                         for (j = 0; j < 2; j++ ) {  // get two maximum hex characters for parse
                             sss = str.charAt(++i);
                             if (((sss >= "0") && (sss <= "9")) || ((sss >= "a") && (sss <= "f"))  || ((sss >= "A") && (sss <= "F"))) {
                                 ss += sss;      // if hex, add the hex character
                             } else {--i; break;}    // not a hex char., exit the loop
                         }
                     n = parseInt(ss, 16);           // parse the hex str as byte
                     if (n <= 0x7f){u = n; f = 1;}   // single byte format
                     if ((n >= 0xc0) && (n <= 0xdf)){u = n & 0x1f; f = 2;}   // double byte format
                     if ((n >= 0xe0) && (n <= 0xef)){u = n & 0x0f; f = 3;}   // triple byte format
                     if ((n >= 0xf0) && (n <= 0xf7)){u = n & 0x07; f = 4;}   // quaternary byte format (extended)
                     if ((n >= 0x80) && (n <= 0xbf)){u = (u << 6) + (n & 0x3f); --f;}         // not a first, shift and add 6 lower bits
                     if (f <= 1){break;}         // end of the utf byte sequence
                     if (str.charAt(i + 1) == "%"){ i++ ;}                   // test for the next shift byte
                     else {break;}                   // abnormal, format error
                 }
             s0 += String.fromCharCode(u);           // add the escaped character
             }
         }
     }
     return s0;
 }

 function setCookie(cookieName, cookieValue, expireDate) {
     var today = new Date();
     today.setDate(today.getDate() + parseInt(expireDate));
     document.cookie = cookieName + "=" + escape(cookieValue) + "; path=/; expires=" + today.toGMTString() + ";"
 }

 function getCookie(cookieName) {
     var search = cookieName + "=";
     var cookie = document.cookie;

     if (cookie.length > 0) {
         startIndex = cookie.indexOf(cookieName);
         if (startIndex != -1) {
             startIndex += cookieName.length;

             endIndex = cookie.indexOf(";", startIndex);

             if (endIndex == -1) endIndex = cookie.length;

             return unescape(cookie.substring(startIndex + 1, endIndex));
         } else {
             return false;
         }
     } else {
         return false;
     }
 }

 function deleteCookie(cookieName) {
     var expireDate = new Date();

     expireDate.setDate(expireDate.getDate() - 1);
     document.cookie = cookieName + "= ; expires=" + expireDate.toGMTString() + "; path=/";
 }

 function checkByte(str) {
     var passValue = true;
     for (var i = 0; i < str.length; i++) {
         if (str.charCodeAt(i) > 127) {
             passValue = false;
             break;
         }
     }

     return passValue;
 }

 function OnlyNumber(e) {
     if (ie) {
         if (event.keyCode >= 48 && event.keyCode <= 57) //0~9
             return true;
         else if (event.keyCode == 8 || event.keyCode == 45 || event.keyCode == 40 || event.keyCode == 41 || event.keyCode == 32)	 //backspace,-,(,),sp
             return true;
         else
             return false;
     } else {
         if (e.which >= 48 && e.which <= 57) //0~9
             return true;
         else if (e.which == 8 || e.which == 45 || e.which == 40 || e.which == 41 || e.which == 32)	 //backspace,-,(,),sp
             return true;
         else
             return false;
     }
 }

 function OnlyNum(e) {
     if (ie) {
         if ((event.keyCode < 48) || (event.keyCode > 57))
             event.returnValue = false;
     } else {
         if ((event.keyCode < 48) || (event.keyCode > 57))
             e.returnValue = false;
     }
 }

 function fn_Trim(sourceString) {
     var strResult;
     strResult = sourceString.replace(/\s/g, "");

     return strResult;
 }

 function fn_RLTrim(strSource) {
     return strSource.replace(/(^\s*)|(\s*$)/g, "");
 }

 function fn_CheckStringLength(str, limit) {
     if (str.length >= limit)
         event.returnValue = false;
 }

 function OnlyString(e) {
     if (ie) {
         if (event.keyCode >= 48 && event.keyCode <= 57) //0~9
             return false;
         else if (event.keyCode == 59 || event.keyCode == 47) // ;,/
             return false;
         else if (event.keyCode == 8 || event.keyCode == 45 || event.keyCode == 40 || event.keyCode == 41 || event.keyCode == 32)	 //backspace,-,(,),sp
             return true;
         else
             return true;
     } else {
         if (e.which >= 48 && e.which <= 57) //0~9
             return false;
         else if (e.which == 59 || e.which == 47) // ;,/
             return false;
         else if (e.which == 8 || e.which == 45 || e.which == 40 || e.which == 41 || e.which == 32)	 //backspace,-,(,),sp
             return true;
         else
             return true;
     }
 }

 function OnlyAlphabet(e) {
     if (ie) {
         if (event.keyCode >= 65 && event.keyCode <= 90) //A~Z
             return true;
         else if (event.keyCode >= 97 && event.keyCode <= 122) //a~z
             return true;
         else if (event.keyCode == 32 || event.keyCode == 8 || event.keyCode == 46) //space,backspace,del
             return true;
         else
             return false;
     } else {
         if (e.which >= 65 && e.which <= 90) //A~Z
             return true;
         else if (e.which >= 97 && e.which <= 122) //a~z
             return true;
         else if (e.which == 32 || event.which == 8 || event.which == 46)	 //space,backspace,del
             return true;
         else
             return false;
     }
 }

 function xss(value) {

     var str;
     str = value;

     str.replace(/[\"\'][\s]*javascript:(.*)[\"\']/g, "\"\"");
     str = str.replace(/script(.*)/g, "");
     str = str.replace(/eval\((.*)\)/g, "");

     return str;
 }

function OnlyStringNumber(e)
{
	if(ie){
		if(event.keyCode >=48 && event.keyCode <=57) //0~9
			return true;
		else if(event.keyCode == 8 || event.keyCode == 45 || event.keyCode == 40 || event.keyCode == 41 || event.keyCode == 32 ||  event.keyCode == 13)	 //backspace,-,(,),sp,enter
			return true;
		else if(event.keyCode >=65 && event.keyCode <=90 || event.keyCode >=97 && event.keyCode <=122)	 //a~z,A~Z
			return true;
		else
			return false;
	}else{
		if(e.which >=48 && e.which <=57) //0~9
			return true;
		else if(e.which == 8 || e.which == 45 || e.which == 40 || e.which == 41 || e.which == 32 ||  e.which == 13)	 //backspace,-,(,),sp,enter
			return true;
		else if(e.which >=65 && e.which <=90 || e.which >=97 && e.which <=122)	 //a~z,A~Z
			return true;
		else
			return false;
	}
}

String.prototype.trim = function() {
    return this.replace(/(^ *)|( *$)/g, "");
}

function initMoving(target, position, topLimit, btmLimit) {
	if (!target)
		return false;

	var obj = target;
	obj.initTop = position;
	obj.topLimit = topLimit;
	obj.bottomLimit = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) - btmLimit - obj.offsetHeight;

	obj.style.position = "absolute";
	obj.top = obj.initTop;
	obj.left = obj.initLeft;

	if (typeof(window.pageYOffset) == "number") {	//WebKit
		obj.getTop = function() {
			return window.pageYOffset;
		}
	} else if (typeof(document.documentElement.scrollTop) == "number") {
		obj.getTop = function() {
			return Math.max(document.documentElement.scrollTop, document.body.scrollTop);
		}
	} else {
		obj.getTop = function() {
			return 0;
		}
	}

	if (self.innerHeight) {	//WebKit
		obj.getHeight = function() {
			return self.innerHeight;
		}
	} else if(document.documentElement.clientHeight) {
		obj.getHeight = function() {
			return document.documentElement.clientHeight;
		}
	} else {
		obj.getHeight = function() {
			return 500;
		}
	}

	obj.move = setInterval(function() {
		if (obj.initTop > 0) {
			pos = obj.getTop() + obj.initTop;
		} else {
			pos = obj.getTop() + obj.getHeight() + obj.initTop;
			//pos = obj.getTop() + obj.getHeight() / 2 - 15;
		}

		if (pos > obj.bottomLimit)
			pos = obj.bottomLimit;
		if (pos < obj.topLimit)
			pos = obj.topLimit;

		interval = obj.top - pos;
		obj.top = obj.top - interval / 3;
		obj.style.top = obj.top + "px";
	}, 30)
}

function setCookie(name, value, expiredays) {
    var today = new Date();
    today.setDate(today.getDate() + expiredays);
    document.cookie = name + "=" + escape(value) + "; path=/; expires=" + today.toGMTString() + ";"
}
function getCookie(key) {
    var cook = document.cookie + ";";
    var idx = cook.indexOf(key, 0);
    var val = "";

    if (idx != -1) {
        cook = cook.substring(idx, cook.length);
        begin = cook.indexOf("=", 0) + 1;
        end = cook.indexOf(";", begin);
        val = unescape(cook.substring(begin, end));
    }

    return val;
}
function deleteCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();
}
function fn_login(value) {
    var url = "Forever21";
    if (value == "h1981" || value == "girls")
        url = "Others";
    else {
        value = "f21";
    }

    var StatusURL = AppPath+'/Ajax/AjaxUserStatus.aspx';
    var xmlHttpUserStatus = new XMLHttpRequest();
    xmlHttpUserStatus.open('get', StatusURL, true);
    xmlHttpUserStatus.onreadystatechange = function () {

        if (xmlHttpUserStatus.readyState == 4) {
            if (xmlHttpUserStatus.status == 200) {
                var response = xmlHttpUserStatus.responseText;
                if (response != "login")
                    document.getElementById("dvLogin").innerHTML = "<a href='" + AppPath + "/Login/" + url + "/Login.aspx?br=" + value + "' class='menuTopLink'>SIGN IN</a>  <a href='" + AppPath + "/Login/" + url + "/RegisterUser.aspx?br=" + value + "' class='menuTopLink'>/ REGISTER</a>";
                else
                    document.getElementById("dvLogin").innerHTML = "<a href='" + AppPath + "/Login/" + url + "/LogOut.aspx?br=" + value + "' class='menuTopLink'>SIGN OUT</a>  <a href='" + AppPath + "/MyAccount/" + url + "/OverView.aspx?br=" + value + "' class='menuTopLink'>/ MY ACCOUNT</a>";
            }
        }
    }
    xmlHttpUserStatus.send(null);
}

function GoUrl(sUrl) 
{
    var sCurrentUrl = location.href;
    var sBr = "";

    if (sCurrentUrl.indexOf("list_id=") != -1)
        sBr = sCurrentUrl.substring(sCurrentUrl.lastIndexOf("br=") + 3, sCurrentUrl.indexOf("list_id=") - 1).toLowerCase();
    else
        sBr = sCurrentUrl.substring(sCurrentUrl.lastIndexOf("br=") + 3, sCurrentUrl.length).toLowerCase();

    location.href = sUrl + "?br=" + sBr;
}

function GoSubScribe(sBr) 
{
    var objRegExpEmail = /^[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+)*@[0-9a-zA-Z-]+(\.)+([0-9a-zA-Z-]+)([\.0-9a-zA-Z-])*$/;  
    var sCurrentUrl = location.href;
    var sBrandFolder = "";
    
    if ($("ibEmailAddress").value == "") 
    {
        alert("Please enter email address");
        $("ibEmailAddress").focus();
        return false;
    }
    
    if (objRegExpEmail.test($("ibEmailAddress").value) == false) 
    {
        alert("Please re-enter email address");
        $("ibEmailAddress").focus();
        return false;
    }

    //$("form1").target = "_self";
    //$("form1").action = "/SignUp" + sBrandFolder + "SubScribe.aspx?br=" + sBr;
    //$("form1").action = "/SignUp/SubScribe.aspx?br=" + sBr;
    //$("form1").method = "post";
    //$("form1").submit();    

    location.href = "/SubScribe/SubScribe.aspx?br=" + sBr + "&email=" + $("ibEmailAddress").value;

    return true;
}

function fn_goSignUp() {
    var objRegExpEmail = /^[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+)*@[0-9a-zA-Z-]+(\.)+([0-9a-zA-Z-]+)([\.0-9a-zA-Z-])*$/;
    var sCurrentUrl = location.href;
    var sBrandFolder = "";

    if ($("txtSignUp").value == "") {
        alert("Please enter email address");
        $("txtSignUp").focus();
        return false;
    }

    if (objRegExpEmail.test($("txtSignUp").value) == false) {
        alert("Please re-enter email address");
        $("txtSignUp").focus();
        return false;
    }

    //$("form1").target = "_self";
    //$("form1").action = "/SignUp" + sBrandFolder + "SubScribe.aspx?br=" + sBr;
    //$("form1").action = "/SignUp/SubScribe.aspx?br=" + sBr;
    //$("form1").method = "post";
    //$("form1").submit();    

    location.href = "/mobile/SubScribe/SubScribe.aspx?br=mobile&email=" + $("txtSignUp").value;

    return true;
}

function searchClear() {
    document.getElementById("ihKeyword").value = "";
    document.getElementById("ihKeyword").focus();
}

function search_go() 
{
    var kyeValue = document.getElementById("ihKeyword").value;
    
    if (ReplaceStr(kyeValue," ","") == "enterkeywordoritem#") {
        alert('please enter the keyword');
        document.getElementById("ihKeyword").focus();
        return false;
    }

    if (kyeValue == '') {
        alert('please enter the keyword');
        document.getElementById("ihKeyword").focus();
        return false;
    }

    var sCurrentUrl = location.href;

    if (sCurrentUrl.lastIndexOf("br=") != -1) {

        if (sCurrentUrl.lastIndexOf("&keyword=") == -1) {
              sBr = sCurrentUrl.substring(sCurrentUrl.lastIndexOf("br=") + 3, sCurrentUrl.length).toLowerCase();
        }
        else if (sCurrentUrl.lastIndexOf("&keyword=") != -1) {
            sBr = sCurrentUrl.substring(sCurrentUrl.lastIndexOf("br=") + 3, sCurrentUrl.indexOf("&keyword=")).toLowerCase();
        }
        location.href = AppPath + "/Search/Search.aspx?br=" + sBr + "&keyword=" + document.getElementById("ihKeyword").value;

    }
    else {
        location.href = AppPath + "/Search/Search.aspx?" + "keyword=" + document.getElementById("ihKeyword").value;
    }
}

function fnGetCategoryBannerItems(category, count) 
{
    var url = "/Product/Tbt/_getCategoryBannerItems.asp?";
    url += "category=" + category;

    if (count > 1) 
    {
        showPopWin(url, 500, 850, null);
    }
    else 
    {
        showPopWin(url, 500, 520, null);
    }

    $("popupMask").style.background = "#ffffff";
    $("popupTitleBar").style.background = "#ffffff";
    $("popupContainer").style.background = "#ffffff";
    $("popupInner").style.background = "#ffffff";
    $("popupControls").style.padding = "7";
    $("popupControls").innerHTML = '<a onclick="hidePopWin(false);" id="popCloseBox"><img src="'+SiteImagePath+'/common/btn_closetext.gif" width="47" height="12" border="0"></a>';
}

function fnShowMaternitySizeChart() 
{
    if ($("maternity_size").style.display == 'none') 
    {
        $("maternity_size").show();
    }
    else 
    {
        $("maternity_size").hide();
    }
}

function oosPopup() 
{
    var sUrl = "/Popup/OosPop.html";

    showPopWin(sUrl, 360, 50, null);
}

function _log(msg) {
    if (typeof console == "object" && typeof console.log == "function") console.log(msg);
}