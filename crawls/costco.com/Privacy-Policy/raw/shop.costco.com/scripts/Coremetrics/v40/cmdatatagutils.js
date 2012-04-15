<!--
function cmSetProduction(){
	cm_HOST="data.coremetrics.com/cm?"; 
}
function cmCreateTechPropsTag(__pi,__cg) {
	cmMakeTag(["tid","6","pi",__pi,"cg",__cg,"pc","Y"]);
}
function cmCreatePageviewTag(__pi,__se,__cg,__sr) {
	cmMakeTag(["tid","1","pi",__pi,"cg",__cg,"se",__se,"sr",__sr,"pc","Y"]);
}
function cmCreateDefaultPageviewTag(__cg) {
	cmCreatePageviewTag(cmGetDefaultPageID(),__cg);
}
function cmCreateProductviewTag(__pr,__pm,__cg) {
	cmMakeTag(["tid","5","pi","PRODUCT: "+__pm+" ("+__pr+")","pr",__pr,"pm",__pm,"cg",__cg,"pc","Y"]);
}
var __sArray = new Array();
var __skuString = "";
function __cmGetPI(__id){
	var __pI;
	for (__pI = 0; __pI < __sArray.length; ++__pI) {
		if (__id == __sArray[__pI][1]) return __pI;
	}
	return -1;
}
function cmAddShop(__v) {
	var __i = __cmGetPI(__v[1]);
	if (__i == -1) {
		__sArray[__sArray.length] = __v;
	}
	else {
		var __oQ = __sArray[__i][5];
		var __oP = __sArray[__i][7];
		__sArray[__i][5] = parseInt(__sArray[__i][5]) + parseInt(__v[5]);
		__sArray[__i][7] = (((__v[7]*__v[5])+(__oP*__oQ))/__sArray[__i][5]);
	}
}
function cmCreateShopAction5Tag(__pr,__pm,__qt,__bp,__cg) {
	cmAddShop(["pr",__pr,"pm",__pm,"qt",__qt,"bp",__bp,"cg",__cg,"at","5","tid","4","pc","N"]);
}
function cmCreateShopAction9Tag(__pr,__pm,__qt,__bp,__cd,__on,__tr,__cg) {
	if (__cd == null || __cd == ''){__cd=__on;}
	cmAddShop(["pr",__pr,"pm",__pm,"qt",__qt,"bp",__bp,"cg",__cg,"cd",__cd,"on",__on,"tr",__tr,"at","9","tid","4","pc","N"]);
	cmCalcSKUString();
}
function cmDisplayShop5s() {
	cmDisplayShops();
}
function cmDisplayShop9s() {
	cmCalcSKUString();
	cmDisplayShops();
}
function cmCalcSKUString() {
	__skuString = "";
	for (i = 0; i < __sArray.length; ++i) {
		__skuString += "|"+__sArray[i][1]+"|"+__sArray[i][7]+"|"+__sArray[i][5]+"|";
	}
}
function cmDisplayShops() {
	var i;
	for (i = 0; i < __sArray.length; ++i) {
		cmMakeTag(__sArray[i]);
	}
	__sArray = new Array();
}
function cmCreateOrderTag(__on,__tr,__sg,__cd,__ct,__sa,__zp) {
	if (__cd == null || __cd == ''){__cd=__on;}
	cmMakeTag(["tid","3","osk",__skuString,"on",__on,"tr",__tr,"sg",__sg,"cd",__cd,"ct",__ct,"sa",__sa,"zp",__zp]);
}
function cmCreateRegistrationTag(__cd,__em,__ct,__sa,__zp,__nl,__sd) {
	cmMakeTag(["tid","2","cd",__cd,"em",__em,"ct",__ct,"sa",__sa,"zp",__zp,"nl",__nl,"sd",__sd]);
}
function cmCreateErrorTag(__pi,__cg) {
	if (__cg == null) {
		__cg = "ERROR";
	}
	cmMakeTag(["tid","404","pi",__pi,"cg",__cg,"pc","Y"]);
}
function cmGetDefaultPageID () {
	var __p = window.location.pathname;
	var __t1 = __p.indexOf("?");
	if (__t1 != -1) __p = __p.substr(0, __t1);
	var __t2 = __p.indexOf("#");
	if (__t2 != -1) __p = __p.substr(0, __t2);
	var __t3 = __p.indexOf(";");
	if (__t3 != -1) __p = __p.substr(0, __t3);
	var __sp = __p.lastIndexOf("/");
	if (__sp == __p.length - 1) {
		__p = __p + "default.asp"; /* SET TO DEFAULT DOC NAME */
	}
	while (__p.indexOf("/") == 0) {
		__p = __p.substr(1,__p.length);
	}
	return(__p);
}
function cmMakeTag(__v) {
	var cm = new _cm("vn2", "e4.0");
	var i;
	for (i = 0; i < __v.length; i += 2) {
		var _n = __v[i];
		var _v = __v[i + 1];
		cm[_n] = _v;
	}

	if (cm.tid == "6") {
		cm.addTP();
	}
	if ((cm.pi == null) && (cm.pc == "Y")) {
		cm.pi = cmGetDefaultPageID();
	}

	if (parent.cm_ref != null) {
		cm.rf = parent.cm_ref;
		if (cm.pc == "Y") {
			parent.cm_ref = document.URL;
		}
	}

	// if parent had mmc variables and this is the first pageview, add mmc to this url
	if(parent.cm_set_mmc) {
		cm.ul = document.location.href + 
				((document.location.href.indexOf("?") < 0) ? "?" : "&") + 
				parent.cm_mmc_params; 
		if (cm.pc == "Y") {
			parent.cm_ref = cm.ul;
			parent.cm_set_mmc = false;
		}
	}

    cm.writeImg();
}
if (defaultNormalize == null) { var defaultNormalize = null; }
function myNormalizeURL(url, isHref) {
    var newURL = url;
    if (isHref) {
	    var blackList = ["SessionID="];
	    var paramString;
	    var paramIndex = newURL.indexOf("?");
	    var params;
	    var keepParams = new Array();
	    var goodParam;
	    if (paramIndex > 0) {
		paramString = newURL.substring(paramIndex+1);
		newURL = newURL.substring(0, paramIndex);
		params = paramString.split("&");
		for(var i=0; i<params.length; i++) {
			goodParam = true;
			for(var j=0; j<blackList.length; j++) {
				if (params[i].indexOf(blackList[j]) == 0) {
					goodParam = false;
				}
			}
			if(goodParam == true) {
				keepParams[keepParams.length] = params[i];
			}
		}
		newURL += "?" + keepParams.join("&");
	    }
	    if (defaultNormalize != null) {
	        newURL = defaultNormalize(newURL, isHref);
	    }
	}	
    return newURL;
} 
if (document.cmTagCtl != null) {
    var func = "" + document.cmTagCtl.normalizeURL;
    if (func.indexOf('myNormalizeURL') == -1) {
        defaultNormalize = document.cmTagCtl.normalizeURL;
        document.cmTagCtl.normalizeURL = myNormalizeURL;
    }
}
//-->