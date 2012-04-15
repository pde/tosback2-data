/*
 * cmdatatagutils.js for IBM Websphere Commerce
 * $Id: cmdatatagutils.js,v 1.5 2010-03-04 17:22:19 jmckinney Exp $
 * $Revision: 1.5 $
 *
 * Version 4.2.0
 *
 * Coremetrics Tag v4.0, 8/7/2006
 * COPYRIGHT 1999-2002 COREMETRICS, INC. 
 * ALL RIGHTS RESERVED. U.S.PATENT PENDING
 *
 * The following functions aid in the creation of Coremetrics data tags.
 *
 */

var cm_exAttr=new Array;  
var cm_ClientID = "90269769";
var cm_TrackLink = "A";
var cm_TrackImpressions = "RSCM";
var cm_JSFEnabled = true;

// code to determine javascript version
var cmJv = "1.0";
if (typeof(isNaN) == "function") cmJv = "1.1";
if (typeof(isFinite) == "function") cmJv = "1.2";
if (typeof(NaN) == "number") cmJv = "1.3";
if (typeof(decodeURI) == "function") cmJv = "1.5";
if (typeof(Array.forEach) == "function") cmJv = "1.6";
if (typeof(Iterator) == "object") cmJv = "1.7";

var cmCheckCMEMFlag = true;
var cmSendOSLinkClickTag = true;

function cmSetProduction(){
	cm_HOST="data.coremetrics.com/cm?";
	cm_JSFPCookieDomain = "petsathome.com";
}

 function cmCreateConversionEventTag(eventID, actionType, categoryID, points,attributes) {
 	if (attributes){
		var cm_exAttr=new Array;
		cm_exAttr=attributes.split("-_-");
	}
	cmMakeTag(["tid","14","cid",eventID,"cat",actionType,"ccid",categoryID,"cpt",points,"cm_exAttr",cm_exAttr]);
 }

function cmCreatePageviewTag(__pi,__cg,__se,__sr, store_id, attributes) {
	if (attributes){
		var cm_exAttr=new Array;
		cm_exAttr=attributes.split("-_-");
	}	
	cmMakeTag(["tid","1","pi",__pi,"cg",__cg,"se",__se,"sr",__sr,"pc","Y","pv11",store_id,"cm_exAttr",cm_exAttr]);
}

function cmCreateDefaultPageviewTag(__cg) {
	cmCreatePageviewTag(cmGetDefaultPageID(),__cg);
}

function cmCreateProductviewTag(__pi,__pr,__pm,__cg,store_id,pageCount,masterItemCategory,catIDoverride,attributes) {
	if (catIDoverride)	{
		if (catIDoverride != "0") {				// allows client to override WSC auto-catID value if catIDoverride is not null or "0"
			__cg = catIDoverride;
		}
	}
	if ((pageCount == null) || pageCount == "") {
		pageCount = 'Y';
	}
	if ((__pi == null) || (__pi == "") || (pageCount == "N")) {
		__pi = cG7.cM0[cm_ClientID];
	}
	if (attributes){
		var cm_exAttr=new Array;
		cm_exAttr=attributes.split("-_-");
	}
	cmMakeTag(["tid","5","pi",__pi,"pr",__pr,"pm",__pm,"cg",__cg,"pc",pageCount,"pv11",store_id,"cm_vc",cmExtractParameter("cm_vc",document.location.href),"cm_exAttr",cm_exAttr]);
}

var __sArray = new Array();
var __skuString = "";
var __ex=new Array();
function __cmGetPI(__id){
	var __pI;
	for (__pI = 0; __pI < __sArray.length; ++__pI) {
		if (__id == __sArray[__pI][1]) return __pI;
	}
	return -1;
}

function __cmGetPIPC(__pr,__cg) {
	var __pI, i;
	var cmAttr1=new Array();
	var cmAttr2=new Array();
	for (i=0;i<__ex.length;++i){
		cmAttr1=cmAttr1+__ex[i];
	}		
	for (__pI = 0; __pI < __sArray.length; ++__pI) {
		if (__ex.length>0){
			cmAttr2=new Array();		
			for (i=__sArray[__pI].length-__ex.length*2+1;i<__sArray[__pI].length;i=i+2){
				cmAttr2=cmAttr2+__sArray[__pI][i];
			}
	
			if (__pr == __sArray[__pI][1] && __cg == __sArray[__pI][9] && cmAttr1==cmAttr2){
				return __pI;
			}
		} else {
		if (__pr == __sArray[__pI][1] && __cg == __sArray[__pI][9]) return __pI;
	}
	}	
	return -1;
}

function cmAddShop(__v) {

	var __i = __cmGetPIPC(__v[1],__v[9]);
	if (__i == -1) {
		if (__ex.length>0){
			for (var i=0; i<__ex.length; ++i){
				__v[__v.length]="s_a"+(i+1);
				__v[__v.length]=__ex[i];
			}
		}
		__sArray[__sArray.length] = __v;
	}
	else {
		var __oQ = __sArray[__i][5];
		var __oP = __sArray[__i][7];
		__sArray[__i][5] = parseInt(__sArray[__i][5]) + parseInt(__v[5]);
		__sArray[__i][7] = (((__v[7]*__v[5])+(__oP*__oQ))/__sArray[__i][5]);
	}
}

function cmCreateShopAction5Tag(__pr,__pm,__qt,__bp,__cg,store_id,currency,masterItemCategory,catIDoverride,attributes) {
	if (catIDoverride)	{
		if (catIDoverride != "0") {				// allows client to override WSC auto-catID value if catIDoverride is not null or "0"
			__cg = catIDoverride;
		}
	} 
	var cm_slotNum;
	if (attributes){
		__ex=attributes.split("-_-");
	} else {
	__ex=new Array();
	}	
	cmAddShop(["pr",__pr,"pm",__pm,"qt",__qt,"bp",__bp,"cg",__cg,"at","5","tid","4","pc","N","sx11",store_id,"cc",currency]);
}

function cmCreateShopAction9Tag(__pr,__pm,__qt,__bp,__cd,__on,__tr,__cg,store_id,currency,account_name,contract_name,masterItemCategory,catIDoverride,attributes) {
	if (catIDoverride)	{
		if (catIDoverride != "0") {				// allows client to override WSC auto-catID value if catIDoverride is not null or "0"
			__cg = catIDoverride;
		}
	}	  
	var cm_slotNum;	  
	if (attributes){
		__ex=attributes.split("-_-");
	} else {
	__ex=new Array();
	}
	cmAddShop(["pr",__pr,"pm",__pm,"qt",__qt,"bp",__bp,"cg",__cg,"cd",__cd,"on",__on,"tr",__tr,"at","9","tid","4","pc","N","sx11",store_id,"cc",currency,"sx13",account_name,"sx14",contract_name]);
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
		for (var l=0;l<__sArray[i].length;++l){
			if (__sArray[i][l]=="sn"){
				__sArray[i][l+1]=i.toString();
			}
		}
		cmMakeTag(__sArray[i]);
	}
	__sArray = new Array();
}

function cmCreateOrderTag(__on,__tr,__sg,__cd,__ct,__sa,__zp, store_id, currency, promotion_name, promotion_discount, promotion_code,attributes) {
	if (((promotion_code == null) || (promotion_code == "")) && promotion_name) { promotion_code = "No Code"; } 
	if (attributes){
		var cm_exAttr=new Array;
		cm_exAttr=attributes.split("-_-");
	}
	cmMakeTag(["tid","3","osk",__skuString,"on",__on,"tr",__tr,"sg",__sg,"cd",__cd,"ct",__ct,"sa",__sa,"zp",__zp,"or11",store_id,"cc",currency,"or13",promotion_name,"or14",promotion_discount,"or15",promotion_code,"cm_exAttr",cm_exAttr]);
}

function cmCreateRegistrationTag(__cd,__em,__ct,__sa,__zp,__nl,__sd, store_id, customer_country, age, gender, marital_status, num_children, num_in_household, company_name, hobbies, income, Pet1, Pet2, Pet3, Pet4, attributes) {
	 if (attributes){
		var cm_exAttr=new Array;
		cm_exAttr=attributes.split("-_-");
	}
	cmMakeTag(["tid","2","cd",__cd,"em",__em,"ct",__ct,"sa",__sa,"zp",__zp,"nl",__nl,"sd",__sd,
	"cy",customer_country,"ag",age,"gd",gender,"ml",income,"rg1",Pet1,"rg2",Pet2,"rg3",Pet3,"rg4",Pet4, "cm_exAttr",cm_exAttr]);
}

function cmCreateErrorTag(__pi,__cg, store_id,attributes) {	
	if (attributes){
		var cm_exAttr=new Array;
		cm_exAttr=attributes.split("-_-");
	}
	cmMakeTag(["tid","404","pi",__pi,"cg",__cg,"pc","Y","pv1",store_id,"cm_exAttr",cm_exAttr]);
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

	var datestamp = new Date();	
	var stamp = (Math.floor(Math.random() * 11111111)) + datestamp.valueOf();	
	cm.rnd = stamp;
	
	if (cm.tid == "6") {
		cm.addTP();
		document.cookie = "cmTPSet=Y; path=/";
	}

	if (cm.tid == "1") {
		if (cI("cmTPSet") != 'Y') {
			cm.tid = "6";
			cm.pc = 'Y';
			cm.addTP();
			document.cookie = "cmTPSet=Y; path=/";
		}
	}

	if (cm.tid != "4" && typeof(cm.cm_exAttr)!="undefined"){
		switch(cm.tid){
			case "6":
				prefix="pv";
				break;
			case "1":
				prefix="pv";
				break;
			case "2":
				prefix="rg";
				break;
			case "5":
				prefix="pr";
				break;
			case "3":
				prefix="o";
				break;
			case "14":
				prefix="c";
				break;
			case "15":
				prefix="e";
				break;
			default:
				break;
		}		
		var attrNum=cm.cm_exAttr.length;
		if (attrNum>15){
			attrNum=15;
		}
		for (i=0;i<attrNum;i++){
			if (cm.tid == "2"){
				Attval=prefix+(i+1);
			} else {
				Attval=prefix+"_a"+(i+1);
			}
			cm[Attval]=cm.cm_exAttr[i];
		}
		cm.cm_exAttr=null;
	}	
	if ((cm.pi == null) && (cm.pc == "Y")) {
		cm.pi = cmGetDefaultPageID();
	}

	try{
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
	}
	catch(err){}
	
	if (!(cm.ul)) {
		cm.ul = document.location.href;
	}
	if (!(cm.rf)) {
		cm.rf = document.referrer;
	}

	cm.ul = cmRemoveParameter("krypto",cm.ul);
	cm.rf = cmRemoveParameter("krypto",cm.rf);

	if (cmCheckCMEMFlag){cmStartTagSet();}
    cm.writeImg();
	if (cmCheckCMEMFlag) {
		cmCheckCMEM();
		cmCheckCMEMFlag = false;
		cmSendTagSet();	
	}

	//check to see if we fire link click for email campaign (cm_cr)
	if (cmSendOSLinkClickTag) {
		if ((window.location.href.indexOf("cm_cr=OS:") > -1) || (window.location.href.indexOf("cm_cr=OS%3A") > -1) || (window.location.href.indexOf("cm_cr=OS%3a") > -1)) {
			var tempHref = window.location.href;
			tempHref = tempHref.split("cm_cr=OS:").join("cm_cr=");
			tempHref = tempHref.split("cm_cr=OS%3A").join("cm_cr=");
			tempHref = tempHref.split("cm_cr=OS%3a").join("cm_cr=");
			tempHref = tempHref.split("-_-E-mail%20Activity-_-").join("-_-1-_-");
			tempHref = tempHref.split("-_-E-mail%2BActivity-_-").join("-_-1-_-");
			tempHref = tempHref.split("-_-E-mail%2bActivity-_-").join("-_-1-_-");
			cmCreateManualLinkClickTag(tempHref,null,"Email");
			cmSendOSLinkClickTag = false;
		}
	}
}

if (defaultNormalize == null) { var defaultNormalize = null; }

function myNormalizeURL(url, isHref) {
	if (cmIndexOfParameter("#",url) != -1) {
		newURL = (cmRemoveParameter ("cm_cr",url));
	} else {
		var newURL = url;
	}
    
    if (isHref) {
	    var blackList = ["krypto="];
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
			//This match is case insensitive.  Remove .toLowerCase() to add case sensitivity
				if (params[i].toLowerCase().indexOf(blackList[j].toLowerCase()) == 0) {
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


// install normalization
if (document.cmTagCtl != null) {
    var func = "" + document.cmTagCtl.normalizeURL;
    if (func.indexOf('myNormalizeURL') == -1) {
        defaultNormalize = document.cmTagCtl.normalizeURL;
        document.cmTagCtl.normalizeURL = myNormalizeURL;
    }
}

function cmIndexOfParameter (parameter, inString) {
	return inString.indexOf(parameter);
}

function cmExtractParameter (parameter, inString) {
    if (cmIndexOfParameter(parameter, inString) == -1) {
        return null;
    }
	var s = inString;
	var begin = s.indexOf(parameter);
	var end = s.indexOf("&", begin);
	if (end == -1) {
		end = s.length;
	}
	var middle = s.indexOf("=", begin);
	return s.substring(middle + 1, end);
}

function cmRemoveParameter (parameter, inString) {
    if (cmIndexOfParameter(parameter, inString) == -1) {
        return inString;
    }
	var s = inString;
	var begin = s.indexOf(parameter);
	var start = (begin - 1);
	var end = s.indexOf("&", begin);
	if (end == -1) {
		end = s.length;
	}
	if (s.substring(start, begin) == "?") {    // retain leading "?"
		start = (start + 1);
		end = (end + 1);
	}
	return s.substring(0, start) + s.substring(end, s.length);
}

function cmCheckCMEM() {
	if (cmIndexOfParameter("cm_em",document.location.href) != -1){
		var emailAddress = cmExtractParameter("cm_em",document.location.href);
		if (emailAddress.indexOf(":")>-1){
			emailAddress=emailAddress.substring(emailAddress.indexOf(":")+1);
		}	
		cmCreateRegistrationTag(emailAddress,emailAddress);
	}
	if (cmIndexOfParameter("cm_lm",document.location.href) != -1){
		var emailAddress = cmExtractParameter("cm_lm",document.location.href);
		if (emailAddress.indexOf(":")>-1){
			emailAddress=emailAddress.substring(emailAddress.indexOf(":")+1);
		}	
		cmCreateRegistrationTag(emailAddress,emailAddress);
	}
}

/* manual PageviewTag for off site page tagging.  Allows client to supply URL and Referring URL
*/
function cmCreateManualPageviewTag(pageID, categoryID,DestinationURL,ReferringURL) {
	cmMakeTag(["tid","1","pi",pageID,"cg",categoryID,"ul",DestinationURL,"rf",ReferringURL]);
}

function cmCreateManualImpressionTag(pageID, trackSP, trackRE) {
		// insert code to get pageID from cmTagControl if pageID is null
		cmMakeTag(["tid","9","pi",pageID,"cm_sp",trackSP,"cm_re",trackRE,"st",cm_ClientTS]);
}

function cmCreateManualLinkClickTag(href,name,pageID) {	
	if (cmCreateLinkTag == null && cM != null) {
		var cmCreateLinkTag = cM;
	}
	if (cmCreateLinkTag != null) {		
		var dt = new Date();
		cmLnkT3 = dt.getTime();
		href = cG7.normalizeURL(href, true);
		cmCreateLinkTag(cm_ClientTS, cmLnkT3, name, href, false, pageID);
	}
}

function cmCreatePageElementTag(elementID, elementCategory, attributes) {
	if (attributes){
		var cm_exAttr=new Array;
		cm_exAttr=attributes.split("-_-");
	}
	cmMakeTag(["tid","15","eid",elementID,"ecat",elementCategory,"pflg","0","cm_exAttr",cm_exAttr]);
}
