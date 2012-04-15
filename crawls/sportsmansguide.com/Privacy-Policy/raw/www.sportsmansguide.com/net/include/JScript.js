// JScript File

// Set focus to supplied form field
function setFocus(passedformfield)
{
    eval("document.all." + passedformfield + ".focus();")
    eval("document.all." + passedformfield + ".blur();")
    eval("document.all." + passedformfield + ".select();")
}

// Redirect to supplied URL
function jump(oThis, sURL){
    var cid = oThis.options[oThis.selectedIndex].value;    
    if(cid != ''){
        window.location=(sURL+cid);
    }
}

// Open page in new window
function openNewWindow(sUrl, sWindowName, sAttributes){
    window.open(sUrl, sWindowName, sAttributes);
    return false;
}


// Set Navigator family
if (document.layers) {navigator.family = "nn4"}
if (document.all) {navigator.family = "ie4"}
if (window.navigator.userAgent.toLowerCase().match("gecko")) {navigator.family = "gecko"}

// Browser Detection Javascript
// copyright 1 February 2003, by Stephen Chapman, Felgall Pty Ltd
function whichBrowser() {
    var agt=navigator.userAgent.toLowerCase();
    if (agt.indexOf("opera") != -1) return 'Opera';
    if (agt.indexOf("staroffice") != -1) return 'Star Office';
    if (agt.indexOf("webtv") != -1) return 'WebTV';
    if (agt.indexOf("beonex") != -1) return 'Beonex';
    if (agt.indexOf("chimera") != -1) return 'Chimera';
    if (agt.indexOf("netpositive") != -1) return 'NetPositive';
    if (agt.indexOf("phoenix") != -1) return 'Phoenix';
    if (agt.indexOf("firefox") != -1) return 'Firefox';
    if (agt.indexOf("safari") != -1) return 'Safari';
    if (agt.indexOf("skipstone") != -1) return 'SkipStone';
    if (agt.indexOf("msie") != -1) return 'Internet Explorer';
    if (agt.indexOf("netscape") != -1) return 'Netscape';
    if (agt.indexOf("mozilla/5.0") != -1) return 'Mozilla';
    if (agt.indexOf('\/') != -1) {
        if (agt.substr(0,agt.indexOf('\/')) != 'mozilla') {
            return navigator.userAgent.substr(0,agt.indexOf('\/'));
        }
        else
            return 'Netscape';
    } 
    else if (agt.indexOf(' ') != -1)
        return navigator.userAgent.substr(0,agt.indexOf(' '));
    else
        return navigator.userAgent;
}

function getCookie(NameOfCookie)
{
    if (document.cookie.length > 0) 
    { 
        begin = document.cookie.indexOf(NameOfCookie+"="); 
        if (begin != -1) // Note: != means "is not equal to"
        { 
            begin += NameOfCookie.length+1; 
            end = document.cookie.indexOf(";", begin);
            if (end == -1) end = document.cookie.length;
            return unescape(document.cookie.substring(begin, end));
        } 
    }
    return null; 
}

function setCookieWithExpires(NameOfCookie, value, expiredays) 
{
    var ExpireDate = new Date ();
    ExpireDate.setTime(ExpireDate.getTime() + (expiredays * 24 * 3600 * 1000));
    document.cookie = NameOfCookie + "=" + escape(value) + 
        ((expiredays == null) ? "" : "; expires=" + ExpireDate.toGMTString());
}

function delCookie (NameOfCookie) 
{
    if (getCookie(NameOfCookie)) 
    {
        document.cookie = NameOfCookie + "=" + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
}
function large_popup(imagefile, sCaption){
	var loc
	if(typeof sCaption == 'undefined'){ sCaption = ''; }
	loc="/zoom/largepop.asp?i=" + imagefile + "&c=" + sCaption;
	zoompop=window.open(loc,"zoom",'toolbar=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=0,width=420,height=420');
}
function xlarge_popup(imagefile, sSize, sCaption){
	var loc
	if(typeof sCaption == 'undefined'){ sCaption = ''; }
	loc="/zoom/xlargepop.asp?i=" + imagefile + "&s=" + sSize + "&c=" + sCaption;
	zoompop=window.open(loc,"zoom",'toolbar=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=1,width=720,height=420');
}
function zoom_popup(imagefile, sHeight, sWidth, sBackColor, sUserInt, sMaxClicks, sClickFactor, sNavLoc, sCaption){
	var loc
	if(typeof sCaption == 'undefined'){ sCaption = ''; }
	loc="/zoom/zoompop.asp?i=" + imagefile + "&h=" + sHeight + "&w=" + sWidth + "&bgc=" + sBackColor + "&ui=" + sUserInt + "&mc=" + sMaxClicks + "&cf=" + sClickFactor + "&nv=" + sNavLoc + "&c=" + sCaption;
	zoompop=window.open(loc,"zoom",'toolbar=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=1,width=500,height=500');
}

function setCookie(name, value, domain)
{
    var path = "/";
    var today = new Date();
    today.setTime( today.getTime() );
    expires = 10000 * 60 * 60 * 24;
    var expires_date = new Date( today.getTime() + (expires) );
    document.cookie = name + "=" + value + ";path = "+path+"; domain = "+domain+"; expires = "+expires_date;

}

function setConnType(domain)
{
    var agt=navigator.userAgent.toLowerCase();
    var is_major = parseInt(navigator.appVersion);
    var is_ie     = ((agt.indexOf("msie") != -1) && (agt.indexOf("opera") == -1));
    var is_ie3    = (is_ie && (is_major < 4));
    var is_ie4    = (is_ie && (is_major == 4) && (agt.indexOf("msie 4")!=-1) );
    var is_ie5up  = (is_ie && !is_ie3 && !is_ie4);
    if (is_ie5up)
      setCookie('connType',oClientCaps.connectionType,domain);
}

function swapImage(e, divId, divToSwap, imageUrl, hrefLoc)
{
    var e = e || window.event;
    if (!e) var e = window.event;
    var tg = (window.event) ? e.srcElement : e.target;
    if (tg.id != divId) return;
    var reltg = (e.relatedTarget) ? e.relatedTarget : e.toElement;
    if (reltg != null)
    {
        while (reltg != tg && reltg.nodeName != 'FORM' && reltg.parentNode != null)
        {
            reltg = reltg.parentNode
            if (reltg == tg) return;
        }
    }
    //the above makes sure that we actually left the div and didn't mouse out of 
    //any of the div's child elements (which would bubble up and fire the onMouseOut event,
    //even though we're still in the div.  The above code handles this.
    var wDiv = document.getElementById(divToSwap);
    wDiv.innerHTML="<a href=\""+hrefLoc+"\" target=\"_top\" style=\"text-decoration:none;\"><img src=\""+imageUrl+"\" width=\"548px\" border=\"0\"></img></a><br/>";
    wDiv.className="HoverAdContent";
}

function closeDiv(divToClose)
{
  elem = document.getElementById(divToClose);
  if (elem != null)
    elem.style.display = 'none';
}

function openDiv(divToOpen)
{
  elem = document.getElementById(divToOpen);
  if (elem != null)
    elem.style.display = 'block';
}

function _hbLink(a,b,c)
{
  var nothing="";
}
