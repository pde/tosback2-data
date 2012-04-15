function toggleQandA(qIdx) {
    var qObj = document.getElementById("que" + qIdx);
    var aObj = document.getElementById("ans" + qIdx);
    if (aObj.style.display != "none") {
        aObj.style.display = "none";
        qObj.innerHTML = "+";
    } else {
        aObj.style.display = "";
        qObj.innerHTML = "-";
    }
}

/****** Start ajax.js ******/
var defaultpage = ""+window.location;
var serverHost = ""+window.location.host;
if (window.location.hash != null){
    defaultpage = defaultpage.replace(window.location.hash, "");
}
defaultpage = defaultpage.substring( defaultpage.indexOf(serverHost)+serverHost.length, defaultpage.length );
defaultpage = "/exclude" + defaultpage;

function getRefToDiv(divID,oDoc) {
    if( document.getElementById ) { return document.getElementById(divID); }
    if( document.all ) { return document.all[divID]; }
    if( !oDoc ) { oDoc = document; }
    if( document.layers ) {
        if( oDoc.layers[divID] ) { return oDoc.layers[divID]; }
        else {
            //repeatedly run through all child layers
            for( var x = 0, y; !y && x < oDoc.layers.length; x++ ) {
                //on success, return that layer, else return nothing
                y = getRefToDiv(divID,oDoc.layers[x].document);
            }
            return y;
        }
    }
    return false;
}

function getCompStyle(obj, styleProp) {
    var cs, prop = 'undefined';
    if(document.defaultView && document.defaultView.getComputedStyle) {
        cs = document.defaultView.getComputedStyle(obj, '');
        if (cs) { prop = cs.getPropertyValue(styleProp); }
    } else if(obj.currentStyle) {
        var propName = styleProp.split('-');
        styleProp = propName[0];
        for (var i=1; i<propName.length; ++i) {
            var ch = propName[i].charAt(0);
            styleProp += propName[i].replace(ch, ch.toUpperCase());
        }
        prop = obj.currentStyle[styleProp];
    } else { return null; }
    return prop;
}

function showLoading() {
    var loadingObj = document.getElementById('loadingMsg');
    var windowWidth = 0;
    var windowHeight = 0;
    var scrollXOffset = 0;
    var scrollYOffset = 0;
    var XOffset = 0;
    var YOffset = 0;
    if (loadingObj != null ) {
        if (isIE) {
/*
            windowWidth = parent.document.documentElement.clientWidth;
            windowHeight = parent.document.documentElement.clientHeight;
            XOffset = parent.document.documentElement.scrollLeft;
            YOffset = parent.document.documentElement.scrollTop;
*/
            windowWidth = document.body.clientWidth;
            windowHeight = document.body.clientHeight;
            XOffset = document.body.scrollLeft;
            YOffset = document.body.scrollTop;
            scrollX = 0;
            scrollY = 0;
        } else {
            windowWidth = parent.window.innerWidth;
            windowHeight = parent.window.innerHeight;
            scrollX = parent.window.pageXOffset;
            scrollY = parent.window.pageYOffset;
            XOffset = 0;
            YOffset = 0;
        }
        loadingObj.style.left = (windowWidth - parseInt(parseInt(getCompStyle(loadingObj, "width")))) / 2 + scrollX + XOffset + "px";
        loadingObj.style.top = (windowHeight - parseInt(parseInt(getCompStyle(loadingObj, "height")))) / 2 + scrollY + YOffset + "px";
        //    loadingObj.left = parseInt(loadingObj.style.left);
        //    loadingObj.top = parseInt(loadingObj.style.top);
        loadingObj.style.visibility = 'visible';
    }
}

function hideLoading() {
    var loadingObj = document.getElementById('loadingMsg');
    if (loadingObj != null ) {
        loadingObj.style.visibility = 'hidden';
    }
}

function showDiv(divID_as_a_string) {
    //get a reference as above ...
    if (document.getElementById(divID_as_a_string) != null ) {
        myReference = getRefToDiv(divID_as_a_string);
        if( !myReference ) {
//            window.alert('Nothing works in this browser');
            return; //don't go any further
        }
        //now we have a reference to it
        if( myReference.style ) {
            //DOM & proprietary DOM
            //myReference.style.visibility = 'visible';
            myReference.style.display = 'block';
        } else {
            //layers syntax
            myReference.visibility = 'show';
        }
    }
}

function hideDiv(divID_as_a_string) {
    //get a reference as above ...
    if (document.getElementById(divID_as_a_string) != null ) {
        myReference = getRefToDiv(divID_as_a_string);
        if( !myReference ) {
//            window.alert('Nothing works in this browser');
            return; //don't go any further
        }
        //now we have a reference to it
        if( myReference.style ) {
            //DOM & proprietary DOM
            //myReference.style.visibility = 'hidden';
            myReference.style.display = 'none';
        } else {
            //layers syntax
            myReference.visibility = 'hidden';
        }
    }
}

/*
* Makes a XMLHttpRequest with the given url
*/
var http_request = false;
function makeRequest(url) {
    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
            http_request.overrideMimeType('text/xml');
            // See note below about this line
        }
    } else if (window.ActiveXObject) { // IE
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }
    if (!http_request) {
//        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
    }
    showLoading();
    http_request.onreadystatechange = function() { applyContents( http_request); };
    try {
        http_request.open('GET', url, true);
    } catch (e) {
        //alert(e);
    }
    http_request.send(null);
}

/*
* Replace page content with content from the XMLHttpRequest
*/
function applyContents(http_request) {
    if (http_request.readyState == 4) {
        if (http_request.status == 200) {
            var content = http_request.responseText;
            omni_clearS();
            omni_setS(omni_parse(content));
            void(s.t());
            document.getElementById(divContentID).innerHTML = content;
            hideLoading();
        } else {
//            alert('There was a problem with the request.');
        }
    }
}

/*
* Initialisation of DHTML history and history events
*/
function initialize() {
    dhtmlHistory.initialize();   // initialize our DHTML history
    dhtmlHistory.addListener(historyChange);   // subscribe to DHTML history change events
    // if this is the first time we have loaded the page...
    if (dhtmlHistory.isFirstLoad()) {
        checkAjaxBookMark();
    }
    /*
    if (historyStorage.get("url") != null) {
        makeRequest(historyStorage.get("url"));
    }
    */
}

/*
* Our callback to receive history change events.
*/
function historyChange(newLocation, historyData) {
    var historyMsg = historyData;
    if (newLocation != null && newLocation != "") {
        if (newLocation.indexOf("exclude") >= 0) { //add for VTC-691, so that it will scroll to internal anchors i.e #77
            makeRequest(unescape(newLocation));
            var thisPageUrl = unescape(newLocation);
            buildList(getUrlParameter(thisPageUrl, "section"));
            if (getUrlParameter(thisPageUrl, "section") != null) {
                tabState = getUrlParameter(thisPageUrl, "section");
            }
        }
    } else {
        if (defaultpage.indexOf("prodAvailSearch.jspa") < 0) {
            makeRequest(defaultpage);
        }
        buildList(getUrlParameter(defaultpage, "section"));
    }
}

/*
* Our callback to receive history change events.
*/
function displayPage(pageUrl) {
    dhtmlHistory.add(escape(pageUrl), pageUrl);  //Register page to Dthml history
    //historyStorage.put("url", pageUrl);  //Register page to Dthml history
    makeRequest(pageUrl);   //grab page
}

/*
 * Redirect user to bookmarked page
 */
function checkAjaxBookMark(){
    if (window.document.referrer.length<=0) {
        var hashedUrl = window.location.hash;
        hashedUrl = unescape(hashedUrl);
        hashedUrl = hashedUrl.replace("/exclude", "");
        hashedUrl = hashedUrl.replace("#", "");
        if (hashedUrl.length > 0) {
            window.location.replace(hashedUrl);
        }
    }
}

/*
* Returns a value in a url given the key
*/

function getUrlParameter(pageUrl, key) {
    if (pageUrl != null) {
        var justParameters = pageUrl.substring( pageUrl.indexOf("?")+1, pageUrl.length );
        if (justParameters != null) {
            var parameters = justParameters.split("&");
            for (i=0; i<parameters.length;i++) {
                var keyValue = parameters[i].split("=");
                //comparism of param key against argument key
                if (keyValue[0] == key) {
                    return keyValue[1];
                }
            }
        }

        if (key == "section") {
            if (pageUrl.indexOf("-ttd") >= 0 ) {
                return "ttd";
            } else if (pageUrl.indexOf("-vd") >= 0 ) {
                return "vd";
            } else if (pageUrl.indexOf("TravelerReviews") >= 0 ) {
                return "ur";
            } else {
                return "hl";
            }
        }
    }
}
/****** End of ajax.js ******/

/****** Start booking.js ******/
function moveNextVoucherInput(theField, theNextField) {
    if (theField.value.length == 4) {
        theField.blur();
        theNextField.focus();
    }
}
function watchGCInput(theField, theNextField) {
    if (theField.value.length < 1) {
        gcIntervalID = setInterval('moveNextVoucherInput(document.mainform.'+theField.name+', document.mainform.'+theNextField.name+')', 10);
    }
    return gcIntervalID;
}
/****** End of booking.js ******/

/****** Start calendar.js ******/
function showHideCalendar(calObj, show, hostName) {
    if (calObj != null)
    {
        //for some weird reason cal object on VML sites is being initialised with height of 10!! instead of 340
        //force it
        /* that didn't seem to make a difference 
        var h = $(calObj).attr("height");
        if(h < 340)
        {
            $(calObj).attr("height",340);
        }*/
        
        if (typeof(show) == "undefined") {
            if (calObj.style.display == "block") {
                show = false;
            } else {
                show = true;
            }
        }

        if (show) {
//            calObj.timeoutID = setTimeout("showHideCalendar(document.getElementById('"+calObj.id+"'), false)", 3000);
            var calSrc = "";
            if (hostName) {
                calSrc = hostName;
            }
            calSrc += "/calendar.jspa?cid="+calObj.id+"&dy="+getSelVal(calObj.yField)+"&dm="+(parseInt(getSelVal(calObj.mField)) - 1)+"&sy="+getSelVal(calObj.yField)+"&sm="+(parseInt(getSelVal(calObj.mField)) - 1)+"&sd="+getSelVal(calObj.dField);
            if (typeof(calObj.codeField) == 'string') {
                if (calObj.codeField != null) { calSrc += "&code="+calObj.codeField; }
            } else if (typeof(calObj.codeField) != 'undefined') {
                if (calObj.codeField != null) { calSrc += "&code="+calObj.codeField.value; }
            }
            if (typeof(calObj.ptField) == 'string') {
                if (calObj.ptField != null) { calSrc += "&productType="+calObj.ptField; }
            } else if (typeof(calObj.ptField) != 'undefined') {
                if (calObj.ptField != null) { calSrc += "&productType="+calObj.ptField.value; }
            }
            if (typeof(calObj.startDateCal) != 'undefined') {
                if (calObj.startDateCal != null) {
                    calSrc += "&fy="+getSelVal(calObj.startDateCal.yField);
                    calSrc += "&fm="+(parseInt(getSelVal(calObj.startDateCal.mField)) - 1);
                    calSrc += "&fd="+getSelVal(calObj.startDateCal.dField);
                }
            }
            calObj.src = calSrc;
            //calObj.style.visibility = "visible";
            //calObj.style.display = "block";
            //void(document.body.appendChild(calObj));
            $(calObj).show();
        } else {
            if (calObj.timeoutID) { clearTimeout(calObj.timeoutID); }
            //calObj.style.display = "none";
            //calObj.style.visibility = "hidden";
            calObj.left = "";
            calObj.top = "";
            $(calObj).hide();
        }
    }
}

function createCalendar(ifID, trgYYYY, trgMM, trgDD, startDateCal, srcCode, srcPT) {
    var calObj = document.createElement("IFRAME");
    calObj.setAttribute("id", ifID);
    calObj.setAttribute("width", "150");
    calObj.setAttribute("height", "340");
    calObj.style.display = "none";
    calObj.style.zIndex = "99";
    calObj.style.position = "absolute";
    calObj.style.left = "500px";
    calObj.style.top = "172px";
    calObj.style.border = "0px";
    calObj.setAttribute("scrolling", "no");
    calObj.frameBorder = 0;
    calObj.setAttribute("src", "javascript:void(0);");
    calObj.dispDate = new Date();
    calObj.selDate = new Date();
     calObj.onmouseover = function() { if (this.timeoutID) { clearTimeout(this.timeoutID); } };
     calObj.onmouseout = function() { clearTimeout(this.timeoutID); this.timeoutID = setTimeout("showHideCalendar(document.getElementById('"+calObj.id+"'), false)", 1000); };
    calObj.yField = trgYYYY;
    calObj.mField = trgMM;
    calObj.dField = trgDD;
    calObj.startDateCal = startDateCal;
    calObj.ptField = srcPT;
    calObj.codeField = srcCode;
     return calObj;
}

function do_dateClick(calFrameRef, yyyy, mm, dd) {
    if(calFrameRef.stopDateCal != null) {
        var stopDateCal = calFrameRef.stopDateCal;
        var currStopY = getSelVal(stopDateCal.yField)
        var currStopM = getSelVal(stopDateCal.mField)
        var currStopD = getSelVal(stopDateCal.dField);
        setSelVal(calFrameRef.yField, yyyy);
        setSelVal(calFrameRef.mField, parseInt(mm + 1));
        setSelVal(calFrameRef.dField, dd);
//        setSelVal(stopDateCal.dField, currStopD);
        if (currStopY < yyyy || (currStopY == yyyy && currStopM < parseInt(mm + 1)) || (currStopY == yyyy && currStopM == parseInt(mm + 1) && currStopD < dd)) {
            setSelVal(stopDateCal.yField, yyyy);
            setSelVal(stopDateCal.mField, (mm+1));
            setSelVal(stopDateCal.dField, dd);
        }
    } else {
        setSelVal(calFrameRef.yField, yyyy);
        setSelVal(calFrameRef.mField, parseInt(mm + 1));
        setSelVal(calFrameRef.dField, dd);
    }
    showHideCalendar(calFrameRef, false);
    /**
     *the code below is to facilitate changes required in AFF-3023
     *at the moment we'll simply trigger a button that submits the search form
     *the button will need to have an id wih the following pattern "button_ + calObjId
     */
    var calId = $(calFrameRef).attr("id");
    var theButId = "button[id='button_"+calId+"']";
    var parDoc = $(window.parent.document);
    var theBut = $(parDoc).find(theButId);
    if(theBut != null)
        $(theBut).click();
    
}

function resizeMe(calObj) {
    if (calObj != null) {
        calObj.height = this.document.body.scrollHeight;
        if (calObj.launcher != null) {
            var newLeft = calObj.launcher.offsetLeft + calObj.launcher.offsetWidth + 2;
            var newTop = calObj.launcher.offsetTop;

            if (typeof(calObj.offsetBodyID) != "undefined" && calObj.offsetBodyID != null) {
                var tmpObj = calObj.launcher;
                var oslTotal = 0;
                var ostTotal = 0;
                while (tmpObj.offsetParent != null && calObj.offsetBodyID != tmpObj.id) {
                    oslTotal += tmpObj.offsetLeft;
                    ostTotal += tmpObj.offsetTop;
                    tmpObj = tmpObj.offsetParent;
                }
                newLeft = (oslTotal + calObj.launcher.offsetWidth) + 5;
                newTop = ostTotal;

                if (isIE) {
                    windowWidth = parent.document.body.clientWidth;
                    windowHeight = parent.document.body.clientHeight;
                    scrollX = parent.document.body.scrollLeft;
                    scrollY = parent.document.body.scrollTop;
                    scrollX = parent.document.documentElement.scrollLeft;
                    scrollY = parent.document.documentElement.scrollTop;
                } else {
                    windowWidth = parent.window.innerWidth;
                    windowHeight = parent.window.innerHeight;
                    scrollX = parent.window.pageXOffset;
                    scrollY = parent.window.pageYOffset;
                }

                if ((newLeft + parseInt(getCompStyle(calObj, "width", true)) - scrollX) + 18 > windowWidth) {
                    newLeft = windowWidth + scrollX - parseInt(calObj.width) - 18;
                }
                if ((newTop + parseInt(getCompStyle(calObj, "height", true)) - scrollY) + 18 > windowHeight) {
                    newTop = windowHeight + scrollY - parseInt(calObj.height) - 18;
                }
            }

            calObj.style.left = newLeft + "px";
            calObj.style.top = newTop + "px";
            calObj.style.visibility = "visible";
        }
    }
}

function writeBody(reqObj, params, calFrameRef) {
    var calFrameRef = params[0];
    if (reqObj.readyState == 4) {
        if (reqObj.status == 200) {
            document.body.innerHTML = reqObj.responseText;
            resizeMe(calFrameRef);
        }
    }
}
/****** End of calendar.js ******/

/****** Start capsPromocode.js ******/
function getCapsPromo()
{
    var temp=document.getElementById('p-code').value;
    document.getElementById('p-code').value=temp.toUpperCase();
    return true;
}

function getSicCapsPromo()
{
    var temp=document.getElementById('promo-code').value;
    document.getElementById('promo-code').value=temp.toUpperCase();
    return true;
}
/****** End of capsPromocode.js ******/

/****** Start cookie.js ******/
function setCookie(name, value, expires, path, domain, secure) {
    // set time, it's in milliseconds
    var today = new Date();
    today.setTime(today.getTime());

    /*
    if the expires variable is set, make the correct
    expires time, the current script below will set
    it for x number of days, to make it for hours,
    delete * 24, for minutes, delete * 60 * 24
    */
    if (expires) {
        expires = expires * 1000 * 60 * 60 * 24;
    }
    var expires_date = new Date(today.getTime() + (expires));

    document.cookie = name + "=" +escape(value) +
    ((expires) ? ";expires=" + expires_date.toGMTString() : "") +
    ((path) ? ";path=" + path : "") +
    ((domain) ? ";domain=" + domain : "") +
    ((secure) ? ";secure" : "");
}

// this function gets the cookie, if it exists
function getCookie(name) {
    var start = document.cookie.indexOf(name + "=");
    var len = start + name.length + 1;
    if ((!start) && (name != document.cookie.substring(0, name.length))) {
        return null;
    }
    if (start == -1) return null;
    var end = document.cookie.indexOf(";", len);
    if (end == -1) end = document.cookie.length;
    return unescape(document.cookie.substring(len, end));
}

// this deletes the cookie when called
function deleteCookie(name, path, domain) {
    if (getCookie(name)) document.cookie = name + "=" +
    ((path) ? ";path=" + path : "") +
    ((domain) ? ";domain=" + domain : "") +
    ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
}
/****** End of cookie.js ******/

/****** Start dateThingies.js ******/
// requires tools.js

function writeAvailDays(yField, mField, dField, fyField, fmField, fdField, cField, ptField) {
    var url = '/availDates.jspa';
    url += '?yyyy=' + escape(getSelVal(yField));
    url += '&mm=' + escape(getSelVal(mField));
    url += '&dd=' + escape(getSelVal(dField));
    url += '&f=date';
    if (typeof(fyField) != 'undefined' && typeof(fmField) != 'undefined' && typeof(fdField) != 'undefined' && fyField != null && fmField != null && fdField != null) {
        url += '&fy=' + escape(getSelVal(fyField));
        url += '&fm=' + escape(getSelVal(fmField));
        url += '&fd=' + escape(getSelVal(fdField));
    }
    if (typeof(cField) == 'string' && typeof(ptField) == 'string' && cField != null && ptField != null) {
        url += '&code='+escape(cField);
        url += '&productType='+escape(ptField);
    } else if (typeof(cField) != 'undefined' && typeof(ptField) != 'undefined' && cField != null && ptField != null) {
        url += '&code='+escape(cField.value);
        url += '&productType='+escape(ptField.value);
    }
    getXML(url, false, xmlDD, [dField]);
    if (dField.onchange != null && typeof(dField.onchange) != 'undefined') {
        dField.onchange();
    }
}

function writeAvailMonths(yField, mField, dField, fyField, fmField, fdField, cField, ptField) {
    var url = '/availDates.jspa';
    url += '?yyyy=' + escape(getSelVal(yField));
    url += '&mm=' + escape(getSelVal(mField));
    url += '&dd=' + escape(getSelVal(dField));
    url += '&f=month';
    if (typeof(fyField) != 'undefined' && typeof(fmField) != 'undefined' && typeof(fdField) != 'undefined' && fyField != null && fmField != null && fdField != null) {
        url += '&fy=' + escape(getSelVal(fyField));
        url += '&fm=' + escape(getSelVal(fmField));
        url += '&fd=' + escape(getSelVal(fdField));
    }
    if (typeof(cField) != 'undefined' && typeof(ptField) != 'undefined' && cField != null && ptField != null) {
        url += '&code='+escape(cField.value);
        url += '&productType='+escape(ptField.value);
    }
    getXML(url, false, xmlDD, [mField]);
    if (mField.onchange != null && typeof(mField.onchange) != 'undefined') {
        mField.onchange();
    }
}

function writeAvailYears(yField, mField, dField, fyField, fmField, fdField, cField, ptField) {
    var url = '/availDates.jspa';
    url += '?yyyy=' + escape(getSelVal(yField));
    url += '&mm=' + escape(getSelVal(mField));
    url += '&dd=' + escape(getSelVal(dField));
    url += '&f=year';
    if (typeof(fyField) != 'undefined' && typeof(fmField) != 'undefined' && typeof(fdField) != 'undefined' && fyField != null && fmField != null && fdField != null) {
        url += '&fy=' + escape(getSelVal(fyField));
        url += '&fm=' + escape(getSelVal(fmField));
        url += '&fd=' + escape(getSelVal(fdField));
    }
    if (typeof(cField) != 'undefined' && typeof(ptField) != 'undefined' && cField != null && ptField != null) {
        url += '&code='+escape(cField.value);
        url += '&productType='+escape(ptField.value);
    }
    getXML(url, false, xmlDD, [yField]);
    if (yField.onchange != null && typeof(yField.onchange) != 'undefined') {
        yField.onchange();
    }
}

function writeAvailYearMonths(ymField, yField, mField, dField, fyField, fmField, fdField, cField, ptField) {
    var url = '/availDates.jspa';
    url += '?yyyy=' + escape(getSelVal(yField));
    url += '&mm=' + escape(getSelVal(mField));
    url += '&dd=' + escape(getSelVal(dField));
    url += '&f=yearmonth';
    if (typeof(fyField) != 'undefined' && typeof(fmField) != 'undefined' && typeof(fdField) != 'undefined' && fyField != null && fmField != null && fdField != null) {
        url += '&fy=' + escape(getSelVal(fyField));
        url += '&fm=' + escape(getSelVal(fmField));
        url += '&fd=' + escape(getSelVal(fdField));
    }
    if (typeof(cField) != 'undefined' && typeof(ptField) != 'undefined' && cField != null && ptField != null) {
        url += '&code='+escape(cField.value);
        url += '&productType='+escape(ptField.value);
    }
    getXML(url, false, xmlDD, [ymField]);
    if (mField.onchange != null && typeof(mField.onchange) != 'undefined') {
        mField.onchange();
    }
}
/****** End of dateThingies.js ******/

/****** Start dateTTD-popup.js ******/
function showChangeDatespopup()
{
  changedatesUrl = "http://"+document.location.host+"/common/datesTTD-popup.jsp";
  changedatesWindow = window.open(changedatesUrl,'CookiedateManagerWindow','toolbar=no,location=no,directories=no,status=yes,menubar=yes,scrollbars=yes,resizable=yes,width=420,,height=300,left=120,top=120');
  changedatesWindow.focus();
  return false;

}
/****** End of dateTTD-popup.js ******/

/****** Start doubleClick.js ******/
var isClicked = false;
function checkDoubleClick(alertMsg) {
    if (isClicked) {
        alert(alertMsg);
        return false;
    } else {
        isClicked=true;
        return true;
    }
}
/****** End of doubleClick.js ******/

/****** Start shopCart.js ******/
function getPageURL() {
        var pageURL = document.location.href;
    if (pageURL.indexOf("#/exclude") > 0 && !(pageURL.indexOf("#/exclude")+1 == pageURL.length) ) {
        pageURL = pageURL.substring(pageURL.indexOf("#/exclude")+1, pageURL.length)
        pageURL = pageURL.replace("/exclude", "");
        pageURL = unescape(pageURL);
    }
    return escape(pageURL);
}

function deleteSCItem(productID, puid) {
    var delSCUrl = "/deleteFromShoppingCart.jspa?id=" + productID;
    delSCUrl += "&PUID="+puid;
    // delSCUrl += "&thisPage="+escape(getPageURL());
    var thisPageURL = getPageURL();
    if (thisPageURL.indexOf("%3FshowPromoCodeError%3DSTATE_ERROR")>0)
    {
        thisPageURL = thisPageURL.replace("%3FshowPromoCodeError%3DSTATE_ERROR","");
    }
    delSCUrl += "&thisPage="+escape(thisPageURL);
    document.location.href = delSCUrl;
}

function confirmClearShoppingCart(alertMsg, puid) {
    var result = confirm(alertMsg);
    if (result) {
        window.location="/clearShoppingCart.jspa?PUID=" + puid;
    }
}

function displayGiftBox(checkbox, giftbox) {
    if (document.getElementById(checkbox).checked) {
        document.getElementById(giftbox).style.display = 'block';
        wrapGift2(checkbox, 'YES');
    }
    else {
        document.getElementById(giftbox).style.display = 'none';
        wrapGift2(checkbox, 'NO');
    }
}

function wrapGift(giftField, giftValue) {
    var xmlHttp;
    try
    {   // Firefox, Opera 8.0+, Safari
        xmlHttp=new XMLHttpRequest();
    }
    catch (e)
    {   // Internet Explorer
        try
        {
            xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e)
        {
            try
            {
                xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e)
            {
                alert("Your browser does not support AJAX!");
                return false;
            }
        }
    }
    giftValue = giftValue.replace(/&/g, '!n!');
    giftValue = giftValue.replace(/\r\n/g, '!br!') //windows
    giftValue = giftValue.replace(/\r/g, '!br!') //mac
    giftValue = giftValue.replace(/\n/g, '!br!')  //linux etc.

    xmlHttp.open("GET", "/wrapGift.jspa?giftField="+encodeURIComponent(giftField)+"&giftValue="+encodeURIComponent(giftValue), true);
    xmlHttp.send(null);
}

function wrapGift2(giftField, giftValue) {
    var xmlHttp;try{xmlHttp=new XMLHttpRequest();}catch (e){try{xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");}catch (e){try{xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");}catch (e){alert("Your browser does not support AJAX!");return false;}}}xmlHttp.open("POST", "/wrapGift.jspa?giftField="+giftField+"&giftValue="+giftValue, true);xmlHttp.send(null);
}
/****** End of shopCart.js ******/

/****** Start showCookieManager.js ******/
function showCookieManager(jsID) {
  cookieManagerUrl = "http://"+document.location.host+"/wishlistManager.jspa";
  cookieManagerWindow = window.open(cookieManagerUrl,'CookieManagerWindow','toolbar=no,location=no,directories=no,status=yes,menubar=yes,scrollbars=yes,resizable=yes,width=420,,height=300,left=120,top=120');
  cookieManagerWindow.focus();
  return false;
}
/****** End of showCookieManager.js ******/

/****** Start showLearnGiftCert.js ******/
function showLearnGiftCert() {
  learnGiftCertUrl = "http://"+document.location.host+"/common/gc-popup.jsp";
  GiftCertWindow = window.open(learnGiftCertUrl,'GiftCertWindow','toolbar=no,location=no,directories=no,status=yes,menubar=yes,scrollbars=yes,resizable=yes,width=420,,height=600,left=120,top=120');
  GiftCertWindow.focus();
  return false;
}
/****** End of showLearnGiftCert.js ******/

/****** Start sitemap.js ******/
function siteMap_toggDest(destID, onOff) {
    if (typeof(onOff) == 'undefined') { onOff = 2; }
    var obj = document.getElementById('dest_'+destID);
    var imgObj = document.getElementById('expColImg_'+destID);
    if (obj.style.display == 'none' || onOff == 1) {
        obj.style.display = 'block';
        imgObj.src = '/images/icon-collapse.gif';
        imgObj.alt = 'collapse';
    } else {
        obj.style.display = 'none';
        imgObj.src = '/images/icon-expand.gif';
        imgObj.alt = 'expand';
    }
}

function siteMap_toggAllDest(onOff) {
    var imgList = document.getElementById('main').getElementsByTagName('IMG');
    for(var i=0;i<imgList.length;i++) {
        var imgObj = imgList.item(i);
        if (imgObj.getAttribute('ID') != null) {
            if (imgObj.getAttribute('ID').indexOf('expColImg_') == 0) {
                var destID = imgObj.getAttribute('ID').substr(10);
                var destObj = document.getElementById('dest_'+destID);
                if (onOff) {
                imgObj.src = '/images/icon-collapse.gif';
                imgObj.alt = 'collapse';
                destObj.style.display = 'block';
                } else {
                imgObj.src = '/images/icon-expand.gif';
                imgObj.alt = 'expand';
                destObj.style.display = 'none';
                }
            }
        }
    }
}
/****** End of sitemap.js ******/

/****** Start spotlight.js ******/
function getSpotlight(reqObj, params) {
    var trgObj = document.getElementById(params[0]);
    if (reqObj.readyState == 4) {
        if (reqObj.status == 200) {
            trgObj.innerHTML = reqObj.responseText;
        }
    }
}
/****** End of spotlight.js ******/

/****** Start states.js ******/
States = new Array();

function state(country, value, name) {
    this.COUNTRY = country;
    this.VALUE = value;
    this.NAME = name;
}

States[0] = new state("", "", "");
States[1] = new state("CA","","Select Province");
States[2] = new state("CA","Alberta","Alberta");
States[3] = new state("CA","British Columbia","British Columbia");
States[4] = new state("CA","Manitoba","Manitoba");
States[5] = new state("CA","New Brunswick","New Brunswick");
States[6] = new state("CA","Newfoundland and Labrador","Newfoundland");
States[7] = new state("CA","Northwest Territories","Northwest Territories");
States[8] = new state("CA","Nova Scotia","Nova Scotia");
States[9] = new state("CA","Nunavut","Nunavut");
States[10] = new state("CA","Ontario","Ontario");
States[11] = new state("CA","Prince Edward Island","Prince Edward Island");
States[12] = new state("CA","Quebec","Québec");
States[13] = new state("CA","Saskatchewan","Saskatchewan");
States[14] = new state("CA","Yukon","Yukon Territory");
States[15] = new state("US","","Select State");
States[16] = new state("US","AL","Alabama");
States[17] = new state("US","AK","Alaska");
States[18] = new state("US","AZ","Arizona");
States[19] = new state("US","AR","Arkansas");
States[20] = new state("US","CA","California");
States[21] = new state("US","CO","Colorado");
States[22] = new state("US","CT","Connecticut");
States[23] = new state("US","DE","Delaware");
States[24] = new state("US","DC","District of Columbia");
States[25] = new state("US","FL","Florida");
States[26] = new state("US","GA","Georgia");
States[27] = new state("US","HI","Hawaii");
States[28] = new state("US","ID","Idaho");
States[29] = new state("US","IL","Illinois");
States[30] = new state("US","IN","Indiana");
States[31] = new state("US","IA","Iowa");
States[32] = new state("US","KS","Kansas");
States[33] = new state("US","KY","Kentucky");
States[34] = new state("US","LA","Louisiana");
States[35] = new state("US","ME","Maine");
States[36] = new state("US","MD","Maryland");
States[37] = new state("US","MA","Massachusetts");
States[38] = new state("US","MI","Michigan");
States[39] = new state("US","MN","Minnesota");
States[40] = new state("US","MS","Mississippi");
States[41] = new state("US","MO","Missouri");
States[42] = new state("US","MT","Montana");
States[43] = new state("US","NE","Nebraska");
States[44] = new state("US","NV","Nevada");
States[45] = new state("US","NH","New Hampshire");
States[46] = new state("US","NJ","New Jersey");
States[47] = new state("US","NM","New Mexico");
States[48] = new state("US","NY","New York");
States[49] = new state("US","NC","North Carolina");
States[50] = new state("US","ND","North Dakota");
States[51] = new state("US","OH","Ohio");
States[52] = new state("US","OK","Oklahoma");
States[53] = new state("US","OR","Oregon");
States[54] = new state("US","PA","Pennsylvania");
States[55] = new state("US","RI","Rhode Island");
States[56] = new state("US","SC","South Carolina");
States[57] = new state("US","SD","South Dakota");
States[58] = new state("US","TN","Tennessee");
States[59] = new state("US","TX","Texas");
States[60] = new state("US","UT","Utah");
States[61] = new state("US","VT","Vermont");
States[62] = new state("US","VA","Virginia");
States[63] = new state("US","WA","Washington");
States[64] = new state("US","WV","West Virginia");
States[65] = new state("US","WI","Wisconsin");
States[66] = new state("US","WY","Wyoming");
States[67] = new state("AU","",  "Select State");
States[68] = new state("AU","ACT","Australian Capital Territory");
States[69] = new state("AU","NSW","New South Wales");
States[70] = new state("AU","NT" ,"Northern Territory");
States[71] = new state("AU","QLD","Queensland");
States[72] = new state("AU","SA","South Australia");
States[73] = new state("AU","TAS","Tasmania");
States[74] = new state("AU","VIC","Victoria");
States[75] = new state("AU","WA" ,"Western Australia");

/* AFF-1914 Revisions to State/Province field on checkout page ( only AU,GB,CA,US )*/
function setStateLabel(theCountryField,StateArea) {
    var area = StateArea;
    if (theCountryField) {
        selectedCountry = theCountryField.options[theCountryField.selectedIndex].value;
        if (selectedCountry == "US" || selectedCountry == "CA" || selectedCountry == "AU" || selectedCountry == "GB") {
             area.style.display='block';
        }
        else {
             area.style.display='none';
        }
    } else {
             area.style.display='none';
    }
}
/* End of AFF-1914 CHANGE*/

function setState(theCountryField, theStateListField) {
    if (theCountryField) {
        selectedCountry = theCountryField.options[theCountryField.selectedIndex].value;
        if (selectedCountry == "US" || selectedCountry == "CA" || selectedCountry == "AU") {
            theStateListField.length = 0;
            for(var i=0;i<States.length; i++) {
                if (States[i].COUNTRY == selectedCountry) {
                    theStateListField[theStateListField.length] = new Option(States[i].NAME,States[i].VALUE);
                }
            }
        }
        else {
            theStateListField.length = 0;
        }
        if (theStateListField.length == 0) {
            theStateListField[theStateListField.length] = new Option(" ---- ","");
        }
        theStateListField.options[0].selected = true;
    }
}

function getStateByCode(theStateCode) { 
    for(var i=0;i<States.length; i++) {
        if (States[i].VALUE == theStateCode) {
            return States[i].VALUE; 
            break; 
        }
    }
}

/*AFF-4861 */
function getStateByCode(theCountryCode, theStateCode) { 
    for(var i=0;i<States.length; i++) {
        if(States[i].COUNTRY != theCountryCode) { 
            continue;
        } 
        
        if (States[i].VALUE == theStateCode) {
            return States[i].NAME; 
            break; 
        }
    }
    return ""; 
}

/****** End of states.js ******/

/****** Start swfobject.js ******/
/**
 * SWFObject v1.4.2: Flash Player detection and embed - http://blog.deconcept.com/swfobject/
 *
 * SWFObject is (c) 2006 Geoff Stearns and is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * **SWFObject is the SWF embed script formerly known as FlashObject. The name was changed for
 *   legal reasons.
 */
if(typeof deconcept=="undefined"){var deconcept=new Object();}
if(typeof deconcept.util=="undefined"){deconcept.util=new Object();}
if(typeof deconcept.SWFObjectUtil=="undefined"){deconcept.SWFObjectUtil=new Object();}
deconcept.SWFObject=function(_1,id,w,h,_5,c,_7,_8,_9,_a,_b){
if(!document.getElementById){return;}
this.DETECT_KEY=_b?_b:"detectflash";
this.skipDetect=deconcept.util.getRequestParameter(this.DETECT_KEY);
this.params=new Object();
this.variables=new Object();
this.attributes=new Array();
if(_1){this.setAttribute("swf",_1);}
if(id){this.setAttribute("id",id);}
if(w){this.setAttribute("width",w);}
if(h){this.setAttribute("height",h);}
if(_5){this.setAttribute("version",new deconcept.PlayerVersion(_5.toString().split(".")));}
this.installedVer=deconcept.SWFObjectUtil.getPlayerVersion();
if(c){this.addParam("bgcolor",c);}
var q=_8?_8:"high";
this.addParam("quality",q);
this.setAttribute("useExpressInstall",_7);
this.setAttribute("doExpressInstall",false);
var _d=(_9)?_9:window.location;
this.setAttribute("xiRedirectUrl",_d);
this.setAttribute("redirectUrl","");
if(_a){this.setAttribute("redirectUrl",_a);}};
deconcept.SWFObject.prototype={setAttribute:function(_e,_f){
this.attributes[_e]=_f;
},getAttribute:function(_10){
return this.attributes[_10];
},addParam:function(_11,_12){
this.params[_11]=_12;
},getParams:function(){
return this.params;
},addVariable:function(_13,_14){
this.variables[_13]=_14;
},getVariable:function(_15){
return this.variables[_15];
},getVariables:function(){
return this.variables;
},getVariablePairs:function(){
var _16=new Array();
var key;
var _18=this.getVariables();
for(key in _18){_16.push(key+"="+_18[key]);}
return _16;
},getSWFHTML:function(){
var _19="";
if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){
if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","PlugIn");}
_19="<embed wmode=\"transparent\" type=\"application/x-shockwave-flash\" src=\""+this.getAttribute("swf")+"\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\"";
_19+=" id=\""+this.getAttribute("id")+"\" name=\""+this.getAttribute("id")+"\" ";
var _1a=this.getParams();
for(var key in _1a){_19+=key+"=\""+_1a[key]+"\" ";}
var _1c=this.getVariablePairs().join("&");
if(_1c.length>0){_19+="flashvars=\""+_1c+"\"";}
_19+="/>";
}else{if(this.getAttribute("doExpressInstall")){
this.addVariable("MMplayerType","ActiveX");}
_19="<object id=\""+this.getAttribute("id")+"\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\">";
_19+="<param name=\"movie\" value=\""+this.getAttribute("swf")+"\" />";
_19+="<param name=\"wmode\" value=\"transparent\" />";
var _1d=this.getParams();
for(var key in _1d){_19+="<param name=\""+key+"\" value=\""+_1d[key]+"\" />";}
var _1f=this.getVariablePairs().join("&");
if(_1f.length>0){_19+="<param name=\"flashvars\" value=\""+_1f+"\" />";}
_19+="</object>";}
return _19;
},write:function(_20){
if(this.getAttribute("useExpressInstall")){
var _21=new deconcept.PlayerVersion([6,0,65]);
if(this.installedVer.versionIsValid(_21)&&!this.installedVer.versionIsValid(this.getAttribute("version"))){
this.setAttribute("doExpressInstall",true);
this.addVariable("MMredirectURL",escape(this.getAttribute("xiRedirectUrl")));
document.title=document.title.slice(0,47)+" - Flash Player Installation";
this.addVariable("MMdoctitle",document.title);}}
if(this.skipDetect||this.getAttribute("doExpressInstall")||this.installedVer.versionIsValid(this.getAttribute("version"))){
var n=(typeof _20=="string")?document.getElementById(_20):_20;
n.innerHTML=this.getSWFHTML();
return true;
}else{
if(this.getAttribute("redirectUrl")!=""){document.location.replace(this.getAttribute("redirectUrl"));}}
return false;}};
deconcept.SWFObjectUtil.getPlayerVersion=function(){
var _23=new deconcept.PlayerVersion([0,0,0]);
if(navigator.plugins&&navigator.mimeTypes.length){
var x=navigator.plugins["Shockwave Flash"];
if(x&&x.description){_23=new deconcept.PlayerVersion(x.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split("."));}
}else{
try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");}
catch(e){try{
var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
_23=new deconcept.PlayerVersion([6,0,21]);
axo.AllowScriptAccess="always";}
catch(e){
if(_23.major==6){return _23;}}try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");}
catch(e){}}
if(axo!=null){_23=new deconcept.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","));}}
return _23;};
deconcept.PlayerVersion=function(_27){
this.major=_27[0]!=null?parseInt(_27[0]):0;
this.minor=_27[1]!=null?parseInt(_27[1]):0;
this.rev=_27[2]!=null?parseInt(_27[2]):0;
};
deconcept.PlayerVersion.prototype.versionIsValid=function(fv){
if(this.major<fv.major){return false;}
if(this.major>fv.major){return true;}
if(this.minor<fv.minor){return false;}
if(this.minor>fv.minor){return true;}
if(this.rev<fv.rev){return false;}
return true;
};
deconcept.util={getRequestParameter:function(_29){
var q=document.location.search||document.location.hash;
if(q){
var _2b=q.substring(1).split("&");
for(var i=0;i<_2b.length;i++){
if(_2b[i].substring(0,_2b[i].indexOf("="))==_29){
return _2b[i].substring((_2b[i].indexOf("=")+1));}}}
return "";}};
deconcept.SWFObjectUtil.cleanupSWFs=function(){
var _2d=document.getElementsByTagName("OBJECT");
for(var i=0;i<_2d.length;i++){
_2d[i].style.display="none";
for(var x in _2d[i]){if(typeof _2d[i][x]=="function"){_2d[i][x]=null;}}}};
if(typeof window.onunload=="function"){
var oldunload=window.onunload;
window.onunload=function(){
deconcept.SWFObjectUtil.cleanupSWFs();
oldunload();};
}else{window.onunload=deconcept.SWFObjectUtil.cleanupSWFs;}
if(Array.prototype.push==null){
Array.prototype.push=function(_30){
this[this.length]=_30;
return this.length;};}

var getQueryParamValue=deconcept.util.getRequestParameter;
var FlashObject=deconcept.SWFObject; // for legacy support
var SWFObject=deconcept.SWFObject;
/****** End of swfobject.js ******/

/****** Start tools.js ******/
var months = new Array(12);
months[0] = new monthObj(31,"January","Jan");
months[1] = new monthObj(28,"February","Feb");
months[2] = new monthObj(31,"March","Mar");
months[3] = new monthObj(30,"April","Apr");
months[4] = new monthObj(31,"May","May");
months[5] = new monthObj(30,"June","Jun");
months[6] = new monthObj(31,"July","Jul");
months[7] = new monthObj(31,"August","Aug");
months[8] = new monthObj(30,"September","Sep");
months[9] = new monthObj(31,"October","Oct");
months[10] = new monthObj(30,"November","Nov");
months[11] = new monthObj(31,"December","Dec");

var days = new Array(7);
days[0] = new dayObj("Sunday","Sun");
days[1] = new dayObj("Monday","Mon");
days[2] = new dayObj("Tuesday","Tue");
days[3] = new dayObj("Wednesday","Wed");
days[4] = new dayObj("Thursday","Thu");
days[5] = new dayObj("Friday","Fri");
days[6] = new dayObj("Saturday","Sat");

var isIE = (document.all)? true:false;

var mouseX = 0;
var mouseY = 0;

document.onmousemove = function(e) {
    if (typeof(event)!= "undefined") {
        mouseX = event.x;
        mouseY = event.y;
    } else {
        mouseX = e.pageX;
        mouseY = e.pageY;
    }
};

function setSelVal(theField, theVal) {
    if (typeof(theField.nodeName) == "SELECT" && theField.options.length > 0) {
        for(var i=0;i<theField.options.length;i++) {
            if (theField.options[i].value == theVal) {
                theField.options[i].selected = true;
            } else {
                theField.options[i].selected = false;
            }
        }
    } else {
        theField.value = theVal;
    }
    if (theField.onchange != null && typeof(theField.onchange) != 'undefined') {
        theField.onchange();
    }
}

function getSelVal(theField) {
    if (typeof(theField.nodeName) == "SELECT" && theField.options.length > 0) {
        return theField.options[theField.selectedIndex].value;
    } else {
        return theField.value;
    }
}

function rewriteDays(yField, mField, dField) {
    var year = yField.value;
    var mon = parseInt(mField.value) - 1;
    var monDays = getMonthDays(mon, year);
    var defVal = getSelVal(dField);
        for(var i=dField.length-1;i>=0;i--) {
            dField.options[i] = null;
        }
    dField.length = monDays;
    for(i=1;i<monDays+1;i++) {
        dField.options[i-1] = new Option(i, i);
    }
    setSelVal(dField, defVal);
}

function monthObj(days, name, shortName) {
    this.days = days;
    this.name = name;
    this.shortName = shortName;
}

function dayObj(name, shortName) {
    this.name = name;
    this.shortName = shortName;
}

function getMonthDays(theMonth, theYear) {
    theMonth = parseInt(theMonth, 10);
    if (theYear % 4 == 0 && theMonth == 1) { return 29; }
    else { return months[theMonth].days; }
}

function getXML(url, contExec, onReadyFunc, onReadyFuncParams) {
    var reqObj = getReqObj();
    if (reqObj) {
        if (contExec) {
            reqObj.onreadystatechange = function() {
                onReadyFunc(reqObj, onReadyFuncParams);
            }
            reqObj.open("GET", url, true);
            reqObj.send("");
        } else {
            reqObj.open("GET", url, false);
            reqObj.send("");
            onReadyFunc(reqObj, onReadyFuncParams);
        }
    }
}

function getReqObj() {
    var reqObj = false;
    if(window.XMLHttpRequest) {
        try {
            reqObj = new XMLHttpRequest();
        } catch(e) {
            reqObj = false;
        }
    } else if(window.ActiveXObject) {
           try {
            reqObj = new ActiveXObject("Msxml2.XMLHTTP");
          } catch(e) {
            try {
                  reqObj = new ActiveXObject("Microsoft.XMLHTTP");
            } catch(e) {
                  reqObj = false;
            }
        }
    }
    return reqObj;
}


function addClass(obj, cName) {
    obj.className += " "+cName;
}

function remClass(obj, cName) {
    var re = new RegExp();
    re.compile("\\b"+cName+"\\b", "g");
    obj.className = obj.className.replace(re, "");
}

function unEsc(str) {
    if (str != null) {
        str = str.replace(/\++/g, " ");
        str = unescape(str);
    }
    return str;
}

function sel_processXML(xmlObj)
{
    var root = xmlObj.firstChild;
    var objArr = new Array();
    if (root.nodeName == "select") {
        if (root.hasChildNodes()) {
            for(var i=0;i<root.childNodes.length;i++) {
                var node = root.childNodes[i];
                if (node.nodeName == "option") {
                    var opt = document.createElement('option');
                    opt.value = unEsc(node.getAttribute('value'));
                    opt.text = unEsc(node.getAttribute('text'));
                    if (node.getAttribute('selected') != null) {
                        opt.selected = (unEsc(node.getAttribute('selected')) == 'true');
                    }
                    if (node.getAttribute('destinationType') != null) {
                        opt.setAttribute('destinationType', unEsc(node.getAttribute('destinationType')));
                    }
                    if (node.getAttribute('urlText') != null) {
                        opt.setAttribute('urlText', unEsc(node.getAttribute('urlText')));
                    }
                    objArr[objArr.length] = opt;
                }

                if (node.nodeName == "optgrp") {
                    var grpNode = node;
                    var grp = document.createElement('optgroup');
                    grp.label = unEsc(grpNode.getAttribute('label'));
                    objArr[objArr.length] = grp;
                    if (grpNode.hasChildNodes()) {
                        for(var j=0;j<grpNode.childNodes.length;j++) {
                            var optNode = grpNode.childNodes[j];
                            if (optNode.nodeName == "option") {
                                var opt = document.createElement('option');
                                opt.value = unEsc(optNode.getAttribute('value'));
                                opt.text = unEsc(optNode.getAttribute('text'));
                                if (optNode.getAttribute('selected') != null) {
                                    opt.selected = (unEsc(optNode.getAttribute('selected')) == 'true');
                                }

                                if (optNode.getAttribute('urlText') != null) {
                                    opt.setAttribute('urlText', optNode.getAttribute('urlText'));
                                }

                                if (optNode.getAttribute('destinationType') != null) {
                                    opt.setAttribute('destinationType', unEsc(optNode.getAttribute('destinationType')));
                                }

                                if (document.implementation.createDocument) {
                                    grp.appendChild(opt);
                                } else {
                                    objArr[objArr.length] = opt;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return objArr;
}

function xmlDD(reqObj, params) {
    var selObj = params[0];
    if (typeof(selObj) != 'undefined') {
        if (reqObj.readyState == 4) {
            if (reqObj.status == 200) {
                var responseText = html_entity_decode(reqObj.responseText);
                if (responseText.indexOf("&") >= 0) {
                    // replace & to &amp; after html entity converted
                    responseText = responseText.replace(/&/g, "&amp;");
                }
                var xmlObj;
                if (document.implementation.createDocument) {
                    xmlObj = (new DOMParser()).parseFromString(responseText, "text/xml");
                } else if (window.ActiveXObject) {
                    xmlObj = document.createElement("xml");
                    xmlObj.loadXML(responseText);
                }
                addSelOpt(selObj, sel_processXML(xmlObj), true);
            }
        }
    }
}

function html_entity_decode(str) {
  var ta=document.createElement("textarea");
  ta.innerHTML=str.replace(/</g,"&lt;").replace(/>/g,"&gt;");
  return ta.value;
}

function addSelOpt(selObj, opts, clearSel) {
    if (typeof(selObj) != 'undefined') {
        if (clearSel) { clearSelOpt(selObj); }
        var selIdx = 0;
        for (var i=0;i<opts.length;i++) {
            if (opts[i].selected) { selIdx = i; }
            if (document.implementation.createDocument || opts[i].nodeName == "OPTGROUP") {
                selObj.appendChild(opts[i]);
            } else {
                selObj[selObj.length] = opts[i];
            }
        }
        if (selObj.length > selIdx) { selObj.options[selIdx].selected = true; }
    }
}

function clearSelOpt(selObj) {
    if (typeof(selObj) != 'undefined') {
        while(selObj.hasChildNodes()) {
            selObj.removeChild(selObj.firstChild);
        }
    }
}
/****** End of tools.js ******/

/****** Start wishlist-popup.js ******/
//Take into accounts ajax urls, urls returned are unescaped
function getParentURL() {
    var parentURL = window.opener.document.location.href;
    if (parentURL.indexOf("#") > 0 && parentURL.indexOf("#") == parentURL.indexOf("#/exclude") && !(parentURL.indexOf("#")+1 == parentURL.length) ) {
        parentURL = parentURL.substring(parentURL.indexOf("#")+1, parentURL.length)
        parentURL = parentURL.replace("/exclude", "");
        parentURL = unescape(parentURL);
    }
    if (parentURL.indexOf("#product-display-page") > 0 || parentURL.indexOf("#intro") > 0
         || parentURL.indexOf("#schedule") > 0  || parentURL.indexOf("#pricing") > 0 || parentURL.indexOf("#additional") > 0 || parentURL.indexOf("#top") > 0 || parentURL.indexOf("#quote") > 0) {  //VTC-657
        parentURL = parentURL.substring(0, parentURL.indexOf("#"));
    }
    return parentURL;
}

function deleteWSItem(productCode, productType) {
    var delWSUrl = "/popupDeleteWishlistItem.jspa?ProductCode=" + productCode + "&ProductType=" + productType;
    document.location.href = delWSUrl;
}

function deleteAllWSItems() {
    var delAllWSUrl = "/popupDeleteAllWishlistItem.jspa";
    document.location.href = delAllWSUrl;
}

function showProduct(productCode, id, productType, productID) {
    showItemUrl = "http://"+document.location.host+"/showDetail.jspa?";
    if (productType == 'GIFT') {
        showItemUrl = "http://"+document.location.host+"/giftcertMsg.jspa?";
    }
      showItemUrl += "code=" + productCode + "&id=" + id + "&productType=" + productType + "&productId=" + productID;
      window.opener.document.location.href = showItemUrl;
      window.close();
}

function showProductRewriteURL(productCode, id, productType, productID, destName, destID, productName) {
    if (productType == 'GIFT') {
            showItemUrl = "http://"+document.location.host+"/gift-certificates-message?"+"code=" + productCode + "&id=" + id + "&productType=" + productType + "&productId=" + productID;
    } else if (productType == 'ATTRACT') {
            showItemUrl = "http://"+document.location.host+"/attractions/"+destName+"/"+productName+"/"+"d"+destID+"-"+productCode;
        } else if (productType == 'EVENT'){
            showItemUrl = "http://"+document.location.host+"/event/"+destName+"/"+productName+"/"+"d"+destID+"-"+productCode;
        } else if (productType == 'SIC'){
            showItemUrl = "http://"+document.location.host+"/tours/"+destName+"/"+productName+"/"+"d"+destID+"-"+productCode;
        }
        window.opener.document.location.href = showItemUrl;
      window.close();
}

function showProductReview(productCode, id, productType, productID) {
    showReviewItemUrl = "http://"+document.location.host+"/showProductReviews.jspa?";
      showReviewItemUrl += "code=" + productCode + "&id=" + id + "&productType=" + productType + "&productId=" + productID;
      window.opener.document.location.href = showReviewItemUrl;
      window.close();
}

function showWishlistEmailForm(newdocument) {
  wsEmailUrl = "http://"+document.location.host+"/common/emailWishlist-popup.jsp";
  document.location.href = wsEmailUrl;
  return false;
}

function closeWSManager() {
    window.opener.document.location.href = getParentURL();
    window.close();
}
/****** End of wishlist-popup.js ******/

/****** Start wishlist.js ******/
function showWishlistManager() {
  wsManagerUrl = document.location.protocol+"//"+document.location.host+"/wishlistManager.jspa";
  wsManagerWindow = window.open(wsManagerUrl,'CookieManagerWindow','toolbar=no,location=no,directories=no,status=yes,menubar=yes,scrollbars=yes,resizable=yes,width=420,,height=550,left=120,top=120');
  wsManagerWindow.focus();
  return false;
}

function showWishlistEmailForm() {
  wsEmailUrl = "http://"+document.location.host+"/common/emailWishlist-popup.jsp";
  wsEmailWindow = window.open(wsEmailUrl,'EmailWindow','toolbar=no,location=no,directories=no,status=yes,menubar=yes,scrollbars=yes,resizable=yes,width=420,,height=650,left=120,top=120');
  wsEmailWindow.focus();
  return false;
}

function popupToParentURL(url){
    window.opener.location.href = url;
    window.close();
}

//Take into accounts ajax urls, urls returned are escaped
function getCurrentURL() {
    var currentURL = document.location.href;

    if (currentURL.indexOf("#") > 0 && currentURL.indexOf("#") == currentURL.indexOf("#/exclude") ) {
        currentURL = currentURL.substring(currentURL.indexOf("#")+1, currentURL.length)
        currentURL = currentURL.replace("/exclude", "");
    } else {
        currentURL = escape(currentURL);
    }

    return currentURL;
}

function deleteWSItem(productCode, productType) {
    var delWSUrl = "/deleteWishlistItem.jspa?ProductCode=" + productCode + "&ProductType=" + productType;
    delWSUrl += "&thisPage="+getCurrentURL();
    document.location.href = delWSUrl;
}

function deleteAllWSItems() {
    var delAllWSUrl = "/deleteAllWishlistItem.jspa?thisPage="+getCurrentURL();
    document.location.href = delAllWSUrl;
}

function addWSItem(productCode, productType) {
  addWSUrl = "http://"+document.location.host+"/addWishlistItem.jspa?";
  addWSUrl += "productCode=" + productCode + "&productType=" + productType;
  addWSUrl += "&thisPage="+getCurrentURL();
  wsManagerWindow = window.open(addWSUrl,'WishlistManagerWindow','toolbar=no,location=no,directories=no,status=yes,menubar=yes,scrollbars=yes,resizable=yes,width=420,,height=550,left=120,top=120');
  wsManagerWindow.focus();
  return false;
}
/****** End of wishlist.js ******/


function endsWith(testString, endingString)
{
      if(endingString.length > testString.length)
          return false;
      else
          return testString.indexOf(endingString)==(testString.length-endingString.length);
}

/**
 * this function will split long continious strings (i.e. strings with no spaces or breaks)
 * into hyphenated "words", note, the hyphens aren't added according to any grammar rules
 * simply after a set number of characters
 */
function splitLine(st,n)
{
    var stringWords = st.split(' ');
    for (var i = 0; i < stringWords.length; i++) {
        if (stringWords[i].length > n)
        {
            stringWords[i] = stringWords[i].split('').join('&shy;');
        }
    }
    st = stringWords.join(' ');
    return st;
}

/**
 * this function will make all elements of the "group"
 * of equal height, height being the height of the talles element
 */
function equalHeight(group)
{
    tallest = 0;
    group.each(function() {
        thisHeight = $(this).height();
        if(thisHeight > tallest) {
            tallest = thisHeight;
        }
    });
    group.height(tallest);
}

/**
 * this is a utility function to trim a string
 */
function trimString(stringToTrim)
{
    return stringToTrim.replace(/^\s+|\s+$/g,"");
}

/**
 * this function is used by the pricing availability popup calendar
 */
function checkAddToCartURL()
{
    var addToCartParamsStr = $("#addToCartParams").html();
    var addToCartParms = addToCartParamsStr.split("|");
    if(addToCartParamsStr != "WAITING")
    {
        //alert(addToCartURL);
        var opnr = window.opener.document;
        var bookDate = $(opnr).find("input[id='addToCartFormBookDate']");
        $(bookDate).attr("value",addToCartParms[0]);
        var tourGrade = $(opnr).find("input[id='addToCartFormTourGrade']");
        $(tourGrade).attr("value",addToCartParms[1]);
        var itemKey = $(opnr).find("input[id='addToCartFormItemKey']");
        $(itemKey).attr("value",addToCartParms[2]);
        var btn = $(opnr).find("button[id='addToCartFormButton']");
        $(btn).click();
        window.close();
    }
}

function showRecaptcha(key, element, themeName)
{
    Recaptcha.create(key, element,
    {
        theme: themeName,
        tabindex: 0,
        callback: Recaptcha.focus_response_field
    });
}


function remainingCharsUpdate(field, maxChars, fieldToUpdate)
{
    var remChars = maxChars - $(field).val().length;
    if(remChars >= 0)
    {
        $("#"+fieldToUpdate).html(remChars);
    }
    else
    {
        $("#"+fieldToUpdate).html("0");
        $(field).val($(field).val().substring(0,maxChars));
    }
    //alert(remChars);
}
