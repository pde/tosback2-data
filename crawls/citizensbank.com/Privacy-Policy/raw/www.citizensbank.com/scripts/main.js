function globalInit() {
    // MM_preloadImages();
    if (window.localInit) localInit();
    if (window.formInit) formInit();
    if (window.errorInit) errorInit();
    if (window.topNavInit) topNavInit();
    window.focus();
}

function popupInit() {
    if (window.opener) window.opener.name = 'main';
    window.focus();
    if (window.localInit) localInit();
    if (window.formInit) formInit();
    if (window.errorInit) errorInit();
    if (getSearch('printthis') == '1') window.print();
 }

 function eraseCookie(name) {
    createCookie(name, "", -1);
 }

function getCookie(name) {
    var the_cookie = unescape(document.cookie);
    if (the_cookie.indexOf(";") > -1) {
        var cArr = the_cookie.split("; ");
        for (var i = 0; i < cArr.length; i++) {
            if (cArr[i].indexOf(name + "=") == 0) return cArr[i].substr(name.length + 1);
        }
    }
    else if (the_cookie.indexOf(name + "=") == 0) return the_cookie.substr(name.length + 1);
    return "";
}

function setCookie(name, value, days) {
    var expires = '';
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = '; expires=' + date.toGMTString();
    }
    document.cookie = name + '=' + value + expires + '; path=/';
}

function getCookieSubKey(data, key) {
    var value = '';

    if (data != '') {
        var regex = new RegExp("(.*?)=(.*)");
        var arr = data.split('&');
        key = key.toLowerCase();

        for (var i = 0; i < arr.length; i++) {
            var match = regex.exec(arr[i]);

            if (match != null && match.length > 2) {
                if (match[1].toLowerCase() == key) {
                    value = match[2];
                    break;
                }
            }
        }
    }

    return value;
}

function getQueryStringVariable(val) {
    var hu = window.location.search.substring(1);
    var gy = hu.split("&");

    for (i = 0; i < gy.length; i++) {
        var ft = gy[i].split("=");
        if (ft[0].toLowerCase() == val.toLowerCase()) {
            return ft[1];
        }
    }

    return '';
}

function CookieExists(name) {
    var the_cookie = unescape(document.cookie);
    if (the_cookie.indexOf(";") > -1) {
        var cArr = the_cookie.split("; ");
        for (var i = 0; i < cArr.length; i++) {
            if (cArr[i].indexOf(name + "=") == 0) return true;
        }
    }
    else if (the_cookie.indexOf(name + "=") == 0) return true;
    return false;
}

function getSearch(name) {
    var src = window.location.search;
    var sArr;
    if (src == '' || src.indexOf(name + '=') == -1) return null;
    if (src.indexOf('?') == 0) src = src.substr(1);
    if (src.indexOf('&') != -1) sArr = src.split('&');
    else sArr = new Array(src);
    for (var i = 0; i < sArr.length; i++) {
        if (sArr[i].indexOf(name + '=') == 0) {
            return unescape(sArr[i].split(name + '=')[1]).replace(/\+/g, ' ');
        }
    }
    return null;
}

function Guid() {
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4()).toUpperCase();
}

function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function heuxPlayNeed(type) {

    if (type != null) {
        switch (type * 1) {
            case 1:
                HEUX_NEED = '1';
                playVideo("buyAHome");
                heuxShowDiv();
                break;
            case 2:
                HEUX_NEED = '2';
                playVideo("improveYourHome");
                heuxShowDiv();
                break;
            case 3:
                HEUX_NEED = '3';
                playVideo("consolidateDebt");
                heuxShowDiv();
                break;
            case 4:
                HEUX_NEED = '4';
                playVideo("lowerYourPayment");
                heuxShowDiv();
                break;
            case 5:
                HEUX_NEED = '5';
                playVideo("getCash");
                heuxShowDiv();
                break;
            default:
                window.location.href = BASE_URL + 'loans/needs-video.aspx?type=' + type;
                break;
        }
    }
}

function heuxCompare() {
    var param = '';

    if (HEUX_NEED != '') {
        param = '?tab=1&need=' + HEUX_NEED;
    }

    window.location.href = BASE_URL + 'loans/compare.aspx' + param;
}

function mortgageApply(url, WTuri) {
    if (!WTuri) WTuri = '/mortgages/applyclick';

    // WT Tracking
    if (WTuri != '') dcsMultiTrack('DCS.dcsuri', WTuri);

    // send the user to the page
    window.location.href = url;
}

function heuxShowDiv(div) {
    var obj = document.getElementById('heuxratecontainerdiv');
    if (!div) div = HEUX_NEED;

    if (obj && div != '') {
        var divs = obj.getElementsByTagName('DIV');
        var ctr = 0;
        div = div * 1;
        for (var i = 0; i < divs.length; i++) {
            if (divs[i].id.indexOf('RateBox') >= 0) {
                if (ctr == div - 1) {
                    divs[i].style.display = 'block';
                }
                else {
                    divs[i].style.display = 'none';
                }

                ctr++
            }
        }
    }

    var lnks = document.getElementsByTagName('LI');
    var ctr = 0;

    for (var i = 0; i < lnks.length; i++) {
        if (lnks[i].className.indexOf('heuxvidlnk') >= 0) {
            ctr++;
            if (ctr == div) {
                lnks[i].className = 'heuxvidlnk active';
            }
            else {
                lnks[i].className = 'heuxvidlnk';
            }
        }
    }
}

function popup(url, w, h, id, options) {
    if (!w) w = 820;
    if (!h) h = 600;
    if (!id) id = 'popupmain';
    if (!options) options = 'scrollbars,resizable,status=yes';
    window.open(url, id, 'width=' + w + ',height=' + h + ',' + options);
}

/*function compare(id) {
    popup(BASE_URL + 'tools/productcomparison.aspx?prodtype=' + id);
}*/

function compare(id) {
	try {
		switch(id * 1) {
			case 6:
			case 7:
			case 8:
				popup(BASE_URL + 'tools/productcomparison.' + id + '.aspx?prodtype=' + id);
			break;
			default: popup(BASE_URL + 'tools/productcomparison.aspx?prodtype=' + id); break;
		}
	}
	catch(er) {
		popup(BASE_URL + 'tools/productcomparison.aspx?prodtype=' + id);
	}
}

function waoPopup(url, id, pType) {
    if (!id) id = 0;
    if (!pType) pType = 0;

    var link = '';


    if (id > 0) {
        link = url + '?productid=' + id;
    }
    else if (pType > 0) {
        link = url + '?producttype=' + pType;
    }
    else {
        link = url;
    }

    popup(link);
}

function swapTab(obj, cls) {
    if (obj) {
        if (obj.className) {
            obj.className = cls;
        }
    }
}

function clickTab(obj) {
    var event = window.event;
    if (window.event) {
        if (event.srcElement.tagName != 'TD') return;
        obj = event.srcElement;
    }
    if (obj.children) {
        for (var i = 0; i < obj.children.length; i++) {
            if (obj.children[i].tagName == 'A') {
                obj.children[i].click();
                break;
            }
        }
    }
}

function quickLink(url) {
    window.location.href = url;
}

function setStyle(id) {
    var dt = new Date();
    var cssArr = new Array('small.css', 'medium.css', 'large.css');
    var imgArr = new Array('imgCssSmall', 'imgCssMedium', 'imgCssLarge');
    var srcArr = new Array('small', 'medium', 'large');
    var img;

    dt.setFullYear(dt.getFullYear() + 3);
    document.cookie = 'stylesheet=' + escape(cssArr[id]) + ';path=/;expires=' + dt.toGMTString();
    if (document.getElementsByTagName) {
        for (var i = 0; i < document.getElementsByTagName("link").length; i++) {
            var obj = document.getElementsByTagName("link")[i];
            if (obj.href.indexOf('small.css') != -1 || obj.href.indexOf('medium.css') != -1 || obj.href.indexOf('large.css') != -1) obj.disabled = true;
            if (obj.href.indexOf(cssArr[id]) != -1) obj.disabled = false;
        }
    }
    else location.reload();
    for (var i = 0; i < imgArr.length; i++) {
        img = MM_findObj(imgArr[i]);
        if (img) {
            img.src = BASE_URL + 'images/nav/textsize_' + ((i == id) ? srcArr[i] + '_on.gif' : srcArr[i] + '.gif');
            img.oSrc = BASE_URL + 'images/nav/textsize_' + ((i == id) ? srcArr[i] + '_on.gif' : srcArr[i] + '.gif');
        }
    }
}

function IPValidate() {
    var ErrorMsg = '';
    var term;

    term = document.forms[0][IP_TERM_FIELD];

    if (term.value == '' || term.value == 'Search')
        ErrorMsg += 'Please enter a search term.\n';

    if (ErrorMsg == '') {
        return true;
    }
    else {
        alert(ErrorMsg);
        return false;
    }
}

function MSQueryCheck() {
    var val = $('.query').val();
    if (val == "") {
        alert('Please enter a search term.');
        return false;
    }
    return true;
}

function IPGetHeaderSearchTerm() {
    var term;
    term = document.forms[0][IP_TERM_FIELD];
    if (term.value == 'Search') term.value = '';
    return term.value;
}


function SubmitEmailBoxForm(field, formAction, errorMsg) {
    var f = document.forms[0];
    if (validateEmail(f[field].value, true)) {
        var action = f.action;
        f.target = "_blank";
        f.action = formAction;
        f.submit();
        f.target = "";
        f.action = action;
    }
    else {
        alert(errorMsg);
    }
}
function launchSlHomeUrl(field) {
    var f = document.forms[0];
    var url = f[field].options[f[field].selectedIndex].value;
    if (url != '') window.location.href = url;
}

function ShowHideRegionDiv(DivID, hlID, divContainerID) {
    var dRegion = document.getElementById(DivID);
    var hl = document.getElementById(hlID);
    var dContainer = document.getElementById(divContainerID);
    if (dRegion != null && hlID != null && dContainer != null) {
        //Toggle Element visibility
        if (dRegion.style.visibility == "hidden" || dRegion.style.visibility == '') {
            dRegion.style.visibility = "visible";
            hl.innerHTML = "Cancel <img src='" + BASE_URL + "images/regionalization/up_arrow.png' border='0' />";
            dContainer.className = "ZipFormOpen";
            return ("open");
        }
        else {
            dRegion.style.visibility = "hidden";
            hl.innerHTML = "Change <img src='" + BASE_URL + "images/regionalization/down_arrow.png' border='0' />";
            dContainer.className = "ZipFormClosed";
            return ("closed");
        }
    }
    else {
        return ('');
    }
}

function preventDefaultAction(evt) {
    if (evt) {
        if (typeof evt.preventDefault != 'undefined') {
            evt.preventDefault(); // W3C 
        }
        else {
            evt.returnValue = false; // IE 
        }
    }

    // safey for handling DOM Level 0 
    return false;
}

function isRegionSet(globalSet) {
    var cookie = getCookie('Region');
    var cookieSet = true;

    if (!globalSet) globalSet = false;

    if (cookie == '' || getCookieSubKey(cookie, "zip").length < 5 || getCookieSubKey(cookie, "RegionID") == '') {
        cookieSet = false;
    }

    if (globalSet == false && cookieSet == false) {
        return false;
    }

    return true;
}

function addEvent(element, eventType, lamdaFunction, useCapture) {
    if (element.addEventListener) {
        element.addEventListener(eventType, lamdaFunction, useCapture);
        return true;
    } else if (element.attachEvent) {
        var r = element.attachEvent('on' + eventType, lamdaFunction);
        return r;
    } else {
        return false;
    }
}