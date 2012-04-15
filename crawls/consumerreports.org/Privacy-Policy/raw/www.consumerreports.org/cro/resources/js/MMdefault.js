<!--
function header_preloadImages() {
}

function MM_preloadImages() {
}

function MM_swapImgRestore() { 
}

function MM_findObj(n, d) {
}

function MM_swapImage() {
}


function adjustColumnWidth() {
		if (document.getElementById("s_image_image"))
		{
            var keyimages = document.getElementById("s_image_image").getElementsByTagName("img");
            if (keyimages[0]) {
            document.getElementById("s_image_image").style.width = keyimages[0].width;
            document.getElementById("s_image_caption").style.width = keyimages[0].width;
            }
        }
}

function formnCheck() 

{
        if (document.forms.cr_header_search_form.elements['SEARCH_INPUT\<\>searchFor'].value == "") 
        {
        alert("Please Enter At Least One Keyword to Search!");
        return false;
        }
}

function crxtra_formnCheck() 

{
        if (document.forms.crExtra_form.elements["magcode"].value == "") 
        {
        alert("Please enter report code!");
        return false;
        }
}

function bizratePopUp(URL) {
        day = new Date();
        id = day.getTime();
        eval("page" + id + " = window.open(URL, '" + id + "', 'toolbar=1,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=830,height=675,left=90,top=20');");
}


function Start(page) {
OpenWin = this.open(page, "CtrlWindow", "toolbar=yes,menubar=yes,location=yes,scrollbars=yes,resizable=yes,width=800,height=600");
}

function CUStart(page) {
OpenWin = this.open(page, "CtrlWindow", "toolbar=yes,menubar=yes,location=no,scrollbars=yes,resizable=yes,width=420,height=480");
}

function cuPopLink(obj) {
	var href = obj.href;
        Start(href);
	return false;
}

function cuPopLinkSpec(title, obj, w, h, x, y) {
  var href = obj.href;
  popup(title, href, w, h, x, y);
  return false;
}


function clearDefault(el) {
  if (el.defaultValue==el.value) el.value = ""
}

//
// Parameters:
//
// id: name of the table/object to show or hide
// b:  boolean flag which keeps track of state. (true/shown

// this function will show a table if b

//
function toggleShowHide(id, imgname, srcopen, srcclose)
{

var ns4 = (document.layers);
var ie4 = (document.all && !document.getElementById);
var ie5 = (document.all && document.getElementById);
var ns6 = (!document.all && document.getElementById);

  if (ie5 || ns6)
  {
    if ( document.getElementById(id).style.display == "none" )
    {
      document.getElementById(id).style.display ="";
      document.images[imgname].src = srcopen;
      document.getElementById(id).style.display ="";
      document.images[imgname].src = srcopen;
    }
    else
    {
      document.getElementById(id).style.display ="none";
      document.images[imgname].src = srcclose;
    }
  }
  else if (ie4)
  {
    if (document.all[id].style.display =="none")
    {
      document.all[id].style.display = "";
      document.images[imgname].src = srcopen;
    }
    else
    {
      document.all[id].style.display = "none";
      document.images[imgname].src = srcclose;
    }
  }
}

function hide(id, imgname, srcclose)
{
  if (ie5 || ns6)
  {
    document.getElementById(id).style.display ="none";
    document.images[imgname].src = srcclose;
  }
  else if (ie4) {
    document.all[id].style.display = "none";
    document.images[imgname].src = srcclose;
  }
}


	function popup(mytitle, myurl, width, height, x, y) {
		var w;
		var netscape = (navigator.appName.substring(0, 8) == "Netscape");
		var microsoft = (navigator.appName.substring(0, 9) == "Microsoft");
		var other = (!netscape && !microsoft);
		var version = parseFloat(navigator.appVersion);
		if (netscape || (microsoft && version >= 4.0)) {
			// Netscape3+ & IE4 like this.
			w = window.open("", mytitle, "width=" + width + ",height=" + height + ",resizable=yes,status=no,toolbar=no,scrollbars=no,left=" + x + ",top=" + y + ",screenX=" + x + ",screenY=" + y);
			w.location.href = myurl;	// keep x11 happy
			w.focus();
			return;
		} else {
			// IE3 groks this.	Hope everybody else does too
			w = window.open(myurl, mytitle, "width=" + width + ",height=" + height + ",resizable=yes,status=no,toolbar=no,scrollbars=no,left=" + x + ",top=" + y + ",screenX=" + x + ",screenY=" + y);
			return;
		}
	}

 function wstat(s) { window.status = s; return true; }

//Pop-up for print button
function popUpPrintPage(URL){
  day = new Date();       
  id = day.getTime();       
  eval("page" + id + " = window.open(URL, '" + id + "', 'toolbar=1,scrollbars=1,location=0,statusbar=0,menubar=1,resizable=1,width=570,height=650,left=90,top=20');");
}

sfHover = function() {
	try{
	var sfEls = document.getElementById("nav").getElementsByTagName("LI");
	for (var i=0; i<sfEls.length; i++) {
		sfEls[i].onmouseover=function() {
			this.className+=" sfhover";
		}
		sfEls[i].onmouseout=function() {
			this.className=this.className.replace(new RegExp(" sfhover\\b"), "");
		}
	}
	}catch(e){}
}
if (window.attachEvent) window.attachEvent("onload", sfHover);

/***** Start of Active Content JavaScript (V 3.0) For JsEnhanced ******
 *  PT_AC_ prefixing on variables and functions to minimize namespace conflicts
 *  Note that function PT_AC_Write auto-appends fmt=JsEnhanced
 */
// the following variable can be set to control the AC behavior for older or rarer browsers
var PT_AC_OldBrowserSupport = 1;	// For browsers that don't support innerHTML
							// 0=only show defaultHTML, 1=Show AC except during maintenance windows
							// 2=always show AC

// the remaining code should be left as-is
var PT_AC_SupportLevel = -1;	// -1 none (default), 0 document.write, 1 innerHTML, 2 getElementById.innerHtml 
var PT_AC_SrcArray = new Array();
var PT_AC_Total = 0;

if (document.getElementsByTagName) {
	if (document.getElementsByTagName("HEAD")[0].innerHTML) {
		if (document.getElementById)
			PT_AC_SupportLevel = 2;
		else
			PT_AC_SupportLevel = 1;
	}
}
else if (document.all) {
	if (document.all[0].innerHTML) {
		if (document.getElementById)
			PT_AC_SupportLevel = 2;
		else
			PT_AC_SupportLevel = 1;
	}
}

function PT_AC_CheckMaintWindow() {	
	PT_AC_SupportLevel = 0;
	if (PT_AC_OldBrowserSupport == 1) {
		var PT_AC_Now = new Date();
		PT_AC_Now.setHours(PT_AC_Now.getHours() + (PT_AC_Now.getTimezoneOffset()/60) - 5);
		var PT_AC_Day = PT_AC_Now.getDay();
		var PT_AC_Month = PT_AC_Now.getMonth();
		var PT_AC_Date = PT_AC_Now.getDate();
		if (PT_AC_Day == 3 || PT_AC_Day == 6) {
			if ((PT_AC_Month > 4 || (PT_AC_Month == 4 && ((PT_AC_Day == 3 && PT_AC_Date > 3) || (PT_AC_Day == 6 && PT_AC_Date > 6)))) &&
				(PT_AC_Month < 10 || (PT_AC_Month == 10 && ((PT_AC_Day == 3 && PT_AC_Date < 28) || (PT_AC_Day == 6 && PT_AC_Date < 31)))))
				PT_AC_Now.setHours(PT_AC_Now.getHours() + 1);
			if (PT_AC_Now.getHours() >= 5 && PT_AC_Now.getHours() <= 6)
				PT_AC_SupportLevel = -1;
		}
	}
}

function PT_AC_Write(PT_AC_Src, PT_AC_DefaultHTML) {
	PT_AC_Total++;
	PT_AC_SrcArray[PT_AC_Total] = PT_AC_Src + '&fmt=JsEnhanced&DivId=' + PT_AC_Total;
	if (PT_AC_SupportLevel > 0)
		document.write ('<div id="PT_AC_DivId'+PT_AC_Total+'">'+PT_AC_DefaultHTML+'<\/div>');
	else if (PT_AC_SupportLevel == 0)
		document.write ('<script src="' + PT_AC_SrcArray[PT_AC_Total] + '"><\/script>');
	else
		document.write (PT_AC_DefaultHTML);
}

function PT_AC_Rewrite(PT_AC_DivId, PT_AC_NewHTML) {
	if (PT_AC_SupportLevel == 2)
		document.getElementById(PT_AC_DivId).innerHTML=PT_AC_NewHTML + "\n";
	else if (PT_AC_SupportLevel == 1)
		eval ('document.all.' + PT_AC_DivId + '.innerHTML =PT_AC_NewHTML + "\n";');
	else
		document.write (PT_AC_NewHTML);
}

function PT_AC_Iterate() {
	if (PT_AC_SupportLevel > 0 && PT_AC_Total > 0) {
		var PT_AC_Ctr;
		for (PT_AC_Ctr = 1; PT_AC_Ctr <= PT_AC_Total; PT_AC_Ctr++) {
			document.write ('<script src="' + PT_AC_SrcArray[PT_AC_Ctr] + '"><\/script>');
		}
	}
}

if (PT_AC_SupportLevel == -1 && PT_AC_OldBrowserSupport > 0)
		PT_AC_CheckMaintWindow();

function PTAC_SubmitTalkback()
{
  var domain = document.getElementById("PTAC_domain").value;
  var newUrl = "http://" + domain + "/dir-app/acx/ACPost.aspx?toUserId=0";
  newUrl += PTAC_AddUrlParam("webtag");
  newUrl += PTAC_AddUrlParam("folderId");
  newUrl += PTAC_AddUrlParam("tid");
  newUrl += PTAC_AddUrlParam("subject");
  newUrl += PTAC_AddUrlParam("contentId");
  newUrl += PTAC_AddUrlParam("returnUrl");
  newUrl += PTAC_AddUrlParam("contentUrl");
  newUrl += PTAC_AddUrlParam("signature");
  newUrl += PTAC_AddUrlParam("body");
  window.location = newUrl;
}

function PTAC_AddUrlParam(elmId)
{
  var ctl = document.getElementById("PTAC_" + elmId);
  if (ctl) {
    return "&" + elmId + "=" + ctl.value;
      } else {
    return "";
        }
}



//******** End of Active Content JavaScript ****


// Start of Javascript for classroom order form


function validate(passedemail) {

    var emailad=passedemail.value;

    var exclude=/[^@\-\.\w]|^[_@\.\-]|[\._\-]{2}|[@\.]{2}|(@)[^@]*\1/;

    var check=/@[\w\-]+\./;

    var checkend=/\.[a-zA-Z]{2,3}$/;

    if(((emailad.search(exclude) != -1)||(emailad.search(check)) == -1)||(emailad.search(checkend) == -1)){

        alert("Please correct this email address!");

        if (passedemail.style) {passedemail.style.backgroundColor="FF8080";}

        passedemail.focus();

        return false;

    }

    else {

        if (passedemail.style) {passedemail.style.backgroundColor="white";}

        return true;

    }

}

 

function validatelength(object,text) {

    if (object.value.length > 0)

    {

        if (object.style) {object.style.backgroundColor="white";}

            return true;

    }

    else {

        alert('Please fill in ' +  text);

        object.focus();

        if (object.style) {object.style.backgroundColor="#FF8080";}

        return false;

    }

}

 

function finalvalidate() {

    stopnow=true; 

 

    if (stopnow) { if (!validatelength(document.orderform.shippingName,'Shipping Name')) {stopnow=false;}}

    document.orderform.sender.value = document.orderform.shippingName.value;

    if (stopnow) { if (!validate(document.orderform.emailAddr)) {stopnow=false;}}

    if (stopnow) { if (!validatelength(document.orderform.shippingSchool,'Shipping School')) {stopnow=false;}}

    if (stopnow) { if (!validatelength(document.orderform.shippingDepartment,'Shipping Department')) {stopnow=false;}}

    if (stopnow) { if (!validatelength(document.orderform.shippingStreet,'Shipping Street')) {stopnow=false;}}

    if (stopnow) { if (!validatelength(document.orderform.shippingCity,'Shipping City')) {stopnow=false;}}

    if (stopnow) { if (!validatelength(document.orderform.shippingState,'Shipping State')) {stopnow=false;}}

    if (stopnow) { if (!validatelength(document.orderform.shippingZip,'Shipping Zip')) {stopnow=false;}}

    if (stopnow) { if (!validatelength(document.orderform.phone,'Shipping Telephone #')) {stopnow=false;}}

    

    if (stopnow) {

        if (document.orderform.billingOptions[1].checked) {

            if (stopnow) { if (!validatelength(document.orderform.billingName,'Billing Name')) {stopnow=false;}}

            if (stopnow) { if (!validatelength(document.orderform.billingSchool,'Billing School')) {stopnow=false;}}

            if (stopnow) { if (!validatelength(document.orderform.billingStreet,'Billing Street')) {stopnow=false;}}

            if (stopnow) { if (!validatelength(document.orderform.billingCity,'Billing City')) {stopnow=false;}}

            if (stopnow) { if (!validatelength(document.orderform.billingState,'Billing State')) {stopnow=false;}}

            if (stopnow) { if (!validatelength(document.orderform.billingZip,'Billing Zip')) {stopnow=false;}}

        } else if (document.orderform.billingOptions[2].checked) {

            alert("If enclosing payment, you must print and mail this form to Consumer Reports Classroom Program, P.O.Box 729, Vandalia, OH 45377");

            stopnow=false;

        } else if (document.orderform.billingOptions[0].checked) {

            // ok

        } else {

            alert("Please choose a billing option.");

            stopnow=false;

        }

    }

    

    if (stopnow) {document.orderform.submit()};

}

 

function CharControl(e,n){

    var code, keychar, check;

    if(window.event){ // IE

        code = e.keyCode;

    }else if(e.which){ // Netscape/Firefox/Opera

        code = e.which;

    }

    keychar = String.fromCharCode(code);

    if(n){

        check = /\d|\\b/;

        return check.test(keychar);

    }else{

        check = /\d/;

        return !check.test(keychar);

    }

}

	var nowOpen = null;
	function ShowHide(id, visibility) { 
		if(visibility == "visible") {
			if(nowOpen != null) {
		nowOpen.style.visibility = "hidden";
			}
		}
		obj = document.getElementsByTagName("div"); 
		obj[id].style.visibility = visibility; 
		nowOpen = obj[id];
	}

// end  of Javascript for classroom order form

function shareDialog() {
	var div = document.createElement("div");
	div.setAttribute("id","side_borders");
	if (document.getElementById("cars_header"))
	{
		var isIe6 = (navigator.userAgent.toLowerCase().indexOf('msie 6') != -1) && (navigator.userAgent.toLowerCase().indexOf('msie 7') == -1);
		if (isIe6)
		{
			div.setAttribute("style","left: 580px; top: 277px; z-index:999;");
			div.style.top = "277px";
		}
		else
		{
			div.setAttribute("style","left: 580px; top: 274px; z-index:999;");
			div.style.top = "274px";
		}
	}
	else
	{
		div.setAttribute("style","left: 580px; top: 255px; z-index:999;");
		div.style.top = "255px";
	}
	div.style.left = "580px";
	div.style.zIndex = "999";
	var dl = document.createElement("dl");
	dl.setAttribute("id","side_borders_dl");
	var ddTop = document.createElement("dd");
	ddTop.className = "top";
	ddTop.setAttribute("id","side_borders_ddtop");
	ddTop.appendChild(document.createTextNode(" "));
	var ddDigg = social("icon_digg.gif", "digg", "Digg", "url", "title", "http://digg.com/submit");
	//var ddYahoo = social("icon_yahoo_buzz.gif", "yahoo", "Yahoo! Buzz", "", "", "");
	var ddFacebook = social("icon_facebook.gif", "facebook", "Facebook", "u", "t", "http://www.facebook.com/share.php");
	var ddStumbleUpon = social("icon_stumbleupon.gif", "stumbleupon", "StumbleUpon", "url", "title", "http://www.stumbleupon.com/submit");
	var ddBottom = document.createElement("dd");
	ddBottom.className = "bottom";
	ddBottom.setAttribute("id","side_borders_ddbottom");
	ddBottom.appendChild(document.createTextNode(" "));
	dl.appendChild(ddTop);
	dl.appendChild(ddDigg);
	//dl.appendChild(ddYahoo);
	dl.appendChild(ddFacebook);
	dl.appendChild(ddStumbleUpon);
	dl.appendChild(ddBottom);
	div.appendChild(dl);
	var tools = document.getElementById("tools");
	if (tools) {
		if (tools.nextSibling) {
			tools.parentNode.insertBefore(div, tools.nextSibling);
		} else {
			tools.parentNode.appendChild(div);
		}
	}
	addMouseOut(div);
	addMouseOut(dl);
	addMouseOut(ddBottom);
	addMouseOut(ddTop);
	addMouseOut(ddDigg);
	//addMouseOut(ddYahoo);
	addMouseOut(ddFacebook);
	addMouseOut(ddStumbleUpon);
}

function shareDialogWithEvent(e) {
	if(document.getElementById("side_borders"))
		return;
	var ev = e || window.event;
	var left = -200;
        if(ev.pageX)
		left += ev.pageX;
	else
		left += ev.clientX + document.body.scrollLeft;
	var div = document.createElement("div");
	div.setAttribute("id","side_borders");
	if (document.getElementById("cars_header"))
	{
		var isIe6 = (navigator.userAgent.toLowerCase().indexOf('msie 6') != -1) && (navigator.userAgent.toLowerCase().indexOf('msie 7') == -1);
		if (isIe6)
		{
			var styleStr = "left: " + left + "px; top: 277px; z-index:999;";
			div.setAttribute("style",styleStr);
			div.style.top = "277px";
		}
		else
		{
			var styleStr = "left: " + left + "px; top: 274px; z-index:999;";
			div.setAttribute("style",styleStr);
			div.style.top = "274px";
		}
	}
	else
	{
		var styleStr = "left: " + left + "px; top: 255px; z-index:999;";
		div.setAttribute("style",styleStr);
		div.style.top = "255px";
	}
	div.style.left = left + "px";
	div.style.zIndex = "999";
	var dl = document.createElement("dl");
	dl.setAttribute("id","side_borders_dl");
	var ddTop = document.createElement("dd");
	ddTop.className = "top";
	ddTop.setAttribute("id","side_borders_ddtop");
	ddTop.appendChild(document.createTextNode(" "));
	var ddDigg = social("icon_digg.gif", "digg", "Digg", "url", "title", "http://digg.com/submit");
	//var ddYahoo = social("icon_yahoo_buzz.gif", "yahoo", "Yahoo! Buzz", "", "", "");
	var ddFacebook = social("icon_facebook.gif", "facebook", "Facebook", "u", "t", "http://www.facebook.com/share.php");
	var ddStumbleUpon = social("icon_stumbleupon.gif", "stumbleupon", "StumbleUpon", "url", "title", "http://www.stumbleupon.com/submit");
	var ddBottom = document.createElement("dd");
	ddBottom.className = "bottom";
	ddBottom.setAttribute("id","side_borders_ddbottom");
	ddBottom.appendChild(document.createTextNode(" "));
	dl.appendChild(ddTop);
	dl.appendChild(ddDigg);
	//dl.appendChild(ddYahoo);
	dl.appendChild(ddFacebook);
	dl.appendChild(ddStumbleUpon);
	dl.appendChild(ddBottom);
	div.appendChild(dl);
	var tools = document.getElementById("tools");
	if (tools) {
		if (tools.nextSibling) {
			tools.parentNode.insertBefore(div, tools.nextSibling);
		} else {
			tools.parentNode.appendChild(div);
		}
	}
	addMouseOut(div);
	addMouseOut(dl);
	addMouseOut(ddBottom);
	addMouseOut(ddTop);
	addMouseOut(ddDigg);
	//addMouseOut(ddYahoo);
	addMouseOut(ddFacebook);
	addMouseOut(ddStumbleUpon);
}

function addMouseOut(ele) {
	if (ele.addEventListener) {
		ele.addEventListener("mouseout", mouseOutShare, false);
	} else if (ele.attachEvent) {
		ele.attachEvent("mouseout", mouseOutShare);
	} else {
		ele["onmouseout"] = mouseOutShare;
	}
	ele.onmouseout = mouseOutShare;
}

function mouseOutShare(event) {
	event = event || window.event;
	if (event) {
		var target = event.relatedTarget || event.toElement;
		if (target && target.id) {
			if (target.id.indexOf("side_borders") != -1) {
				return;
			}
		}
		var div = document.getElementById("side_borders");
		if (div) {
			div.setAttribute("style", "display: none;");
			div.style.display = "none";
			div.parentNode.removeChild(div);
		}
	}
}

function socialYahoo(id) {
	var dd = document.createElement("dd");
	dd.setAttribute("id", "side_borders_" + id);
	var script = document.createElement("script");
	script.setAttribute("type", "text/javascript");
	script.setAttribute("src", "http://d.yimg.com/ds/badge2.js");
	script.setAttribute("badgetype", "text");
	script.appendChild(document.createTextNode(window.location));
	dd.appendChild(script);
	return dd;
}

function social(icon, id, name, urlName, titleName, submit) {
	var url = submit + "?" + urlName + "=" + encodedUrl() + "&" + titleName + "=" + encodedTitle();
	var dd = document.createElement("dd");
	dd.setAttribute("id", "side_borders_" + id);
	var a1 = document.createElement("a");
	a1.setAttribute("href", url);
	a1.setAttribute("id", "side_borders_a1_" + id);
	a1.setAttribute("target", "sharewindow");
	var img = document.createElement("img");
	img.className = "iconImg";
	img.setAttribute("src", "http://www.consumerreports.org/cro/resources/mid-level/images/" + icon);
	img.setAttribute("alt", name);
	img.setAttribute("id", "side_borders_i_" + id);
	var a2 = document.createElement("a");
	a2.setAttribute("href", url);
	a2.setAttribute("id", "side_borders_a2_" + id);
	a2.setAttribute("target", "sharewindow");
	a2.appendChild(document.createTextNode(name));
	a1.appendChild(img);
	dd.appendChild(a1);
	dd.appendChild(a2);
	return dd;
}

function encodedUrl() {
	return encode(window.location);
}

function encodedTitle() {
	return encode(document.title);
}

function encode(str) {
	str = escape(str);
	str = str.replace('+', '%2B');
	str = str.replace('*', '%2A');
	str = str.replace('/', '%2F');
	str = str.replace('@', '%40');
	return str;
}


//JS for bullet list functionaliy for money index page

function showRolloverItem(that){

var idRoot = that.id; 
if(idRoot.indexOf('-text') != -1){ idRoot = idRoot.substr(0,idRoot.indexOf('-text')); } // this is to strip-out the extranious '-text' from the text IDs

   var thisNavDiv = idRoot + '-nav-list'; //create nav list div id from root
   //var thisNavTextDiv = idRoot + '-container'; //create nav text div id from root  (this is the text under the under icon) 
   var thisNavTextDiv = idRoot + '-text'; //create nav text div id from root  (this is the text under the under icon)
     	
	 
   //turn off all tabs (make this more generic)
   document.getElementById('rollover-finances').style.backgroundPosition = 'center top';
   document.getElementById('rollover-home').style.backgroundPosition = 'center top';
   document.getElementById('rollover-family').style.backgroundPosition = 'center top';
   document.getElementById('rollover-car').style.backgroundPosition = 'center top';

   //make nav text unselected color (make this more generic)
   document.getElementById('rollover-finances-text').style.color = '#1770ce';
   document.getElementById('rollover-home-text').style.color = '#1770ce';
   document.getElementById('rollover-family-text').style.color = '#1770ce';
   document.getElementById('rollover-car-text').style.color = '#1770ce';
   
   
   //turn off all nav bullet lists (make this more generic)
   document.getElementById('rollover-finances-nav-list').style.display = 'none';
   document.getElementById('rollover-home-nav-list').style.display = 'none';
   document.getElementById('rollover-family-nav-list').style.display = 'none';
   document.getElementById('rollover-car-nav-list').style.display = 'none';	 	 	 

    //turn on the current tab
    //that.style.backgroundPosition = 'center -26px';
	document.getElementById(idRoot).style.backgroundPosition = 'center -26px';
	
	//highlight text color
    document.getElementById(thisNavTextDiv).style.color = '#000'; 
	
	//turn on the current nav list
	document.getElementById(thisNavDiv).style.display = 'block';

} //end showRolloverItem