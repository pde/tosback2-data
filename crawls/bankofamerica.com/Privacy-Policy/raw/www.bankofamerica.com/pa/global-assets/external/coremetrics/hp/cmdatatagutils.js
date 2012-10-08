/* cmdatatagutils.js
* $Id: cmdatatagutils-borneo-MASTER.txt 194182 2012-04-16 20:22:52Z whbird $
*
* Coremetrics Tag v4.0, 8/11/2006
* COPYRIGHT © 1999-2011 COREMETRICS, AN IBM COMPANY. 
* ALL RIGHTS RESERVED. U.S. PATENT PENDING
* The following functions aid in the creation of Coremetrics data tags.
*
* Date:			Name:				Description:
* 03/24/2011	Corey Terrell		Modified product tags to accept multiple quantities of a single product.
* 04/27/2011	Corey Terrell		Modified Registration and Shop 9 tags to set and use new cookie instead of BOA_0020.
* 04/09/2012	Corey Terrell		Modified path to TouchClarity libraries for migration to Borneo.
* 04/12/2012	Corey Terrell		Modified TouchClarity _4 variable to force secure reference. Cleaned extraneous variable instantiations.
*/

document.hitImage = new Array();
var cm_hitImageIndex = 0, cm_pageID = "", cmRandom, cmAppName, cmAppStepName, cmAppStepNumber, cmAppCategory, cmJv = "1.0", cm_FormPageID=true;

if (typeof(isNaN) == "function") cmJv = "1.1";
if (typeof(isFinite) == "function") cmJv = "1.2";
if (typeof(NaN) == "number") cmJv = "1.3";
if (typeof(decodeURI) == "function") cmJv = "1.5";
if (typeof(Array.forEach) == "function") cmJv = "1.6";
if (typeof(Iterator) == "object") cmJv = "1.7";

function cmSetProduction() {
	cm_ClientID="90010394";
	cm_HOST="sofa.bankofamerica.com/eluminate?";
}

function cmSetStaging() {
	cm_ClientID="90026697;60010394";
	cm_HOST="testdata.coremetrics.com/eluminate?";
}

function cmCreateConversionEventTag(_EID,_AT,_CID,_PT,_PID,_PRID,_AID,_RPID,_EATR) {
	cmMakeTag(["tid","14","vn2","e4.0","cid",_EID,"cat",_AT,"ccid",_CID,"cpt",_PT,"cx1",_PID,"cx2",_PRID,"cx3",_AID,"cx4",_RPID,
	"cm_exAttr",cmAttr(_EATR)]); 
}

function cmCreateCustomError(pgID,appName,appStpNum,appStpName,errCd,catID,errMsg) {
	cmMakeTag(["tid","7","li","207","ps1",pgID,"ps2",appName,"ps3",appStpNum,"ps4",appStpName,"ps5",errCd,"ps6",catID,"ps7",errMsg]);
}

function cmCreateErrorTag(pgID,catID,attr) {
   if (!pgID) { pgID = getDefaultPageID(templateName); }
   cmMakeTag(["tid","404","pi",pgID,"pc","Y","cg",catID,"ul",document.URL,"cm_exAttr",cmAttr(attr)]); 
}

function cmCreateImpressionTag(_pi,_SP,_RE) {
	cmMakeTag(["tid","9","vn2","e4.0","pi",_pi,"cm_sp",_SP,"cm_re",_RE,"st",cm_ClientTS]); 
}

function cmCreateManualLinkClickTag(_hr,_nm,_PID) {	
	if (cmCreateLinkTag == null && cM != null) { var cmCreateLinkTag = cM; }
	if (cmCreateLinkTag != null) {		
		var dt = new Date();
		cmLnkT3 = dt.getTime();
		cmCreateLinkTag(cm_ClientTS, cmLnkT3, _nm, _hr, false, _PID);
	}
}

function cmCreateManualPageviewTag(_PID,_CID,_DURL,_RURL,_EATR) {
	cmMakeTag(["tid","1","pi",_PID,"cg",_CID,"ul",_DURL,"rf",_RURL,"cm_exAttr",cmAttr(_EATR)]); 	
}

function cmCreatePageElementTag(_EID,_ECID,_EATR) {
	cmMakeTag(["tid","15","vn2","e4.0","eid",_EID,"ecat",_ECID,"pflg",0,"cm_exAttr",cmAttr(_EATR)]); 
}

function cmCreatePageviewTag(_PID,_TN,_SSTR,_CID,_H,_ER,_ERM,_T,_F,_ADL,_APPI,_ADB,_SRES,_SESSID,_APNM,_APSNUM,_APSNM,_ATR,_SBCPM,_RURL,_DURL) {
   if (!_PID) { _PID = getDefaultPageID(_TN); }		
cmMakeTag(cmHTE(_H,_T,_ER,["tid","1","pi",_PID,"se",_SSTR,"cg",_CID,"pv5",_ERM,"pv6",_ADL,"pv7",_APPI,"pv8",_ADB,"sr",_SRES,"pv10",_SESSID,"pv1",_APNM,"pv2",_APSNUM,"pv3",_APSNM,"pv9",_SBCPM,"cm_exAttr",cmAttr(_ATR),"refURL",_RURL,"destURL",_DURL]));
}

function cmCreateProductDetailsTag(pgID,prID,appID,org,pid,gc,pat,sc,mc,cmpID) {
  cmMakeTag(["tid","7","li","300","ps1",pgID,"ps2",prID,"ps3",appID,"ps4",org,"ps5",pid,"ps6",gc,"ps7",pat,"ps8",sc,"ps9",mc,"ps10",cmpID])
}

function cmCreateProductviewTag(_PRID,_PRNM,_CID,_SSTR,_H,_ER,_ERM,_T,_ADL,_ADB,_PCNT,_PTYP) {
   if (_PRNM == null) _PRNM = ""; 
  
   if (!_PCNT && _PCNT !== null && _PCNT !== undefined) { pc="N"; } else { pc="Y"; }
   if (_PTYP) {
      _CID += ":" + _PTYP; li=350; ps1=_PRID; ps2=_PRNM; ps3=_CID; ps4=_PTYP;
   }
   else {
      li=null; ps1=null; ps2=null; ps3=null; ps4=null; 
   }
   cmMakeTag(cmHTE(_H,_T,_ER,["tid","5","pr",_PRID,"pm",_PRNM,"cg",_CID,"pi","PRODUCT: "+_PRNM+" ("+_PRID+")","se",_SSTR,"pv5",_ERM,"pv6",_ADL,"pv8",_ADB,"li",li,"ps1",ps1,"ps2",ps2,"ps3",ps3,"ps4",ps4,"pc",pc])); 
}

function cmCreateRegistrationTag(_PID,_TN,_CUID,_OCU,_ST,_AIN,_CID,_FRM,_ADL,_ADB,_HLNK,_OLNK,_PCNT,_ACTNM,_EF7,_EF8,_EF9,_EF10,_EF13,_EF14,_EF15) {
   if (!_PID) _PID = getDefaultPageID(_TN); 
   if (!_PCNT && _PCNT !== null && _PCNT !== undefined) pc="N"; else pc="Y";
   _CUID = getCustIDVal();
cmMakeTag(["tid","2","pi",_PID,"cd",_CUID,"sa",_ST,"cg",_CID,"pv6",_ADL,"pv8",_ADB,"rg1",_CUID,"rg2",_AIN,"rg11",_OCU,"li","101","ps1",_CUID,"ps2",_AIN,"ps3",_ST,"ps4",_OCU,"ps5",_FRM,"ps6",_HLNK,"ps7",_OLNK,"rg3",_FRM,"rg4",_HLNK,"rg5",_OLNK,"rg6",_ACTNM,"rg12",_ST,"pc",pc,"rg7",_EF7,"rg8",_EF8,"rg9",_EF9,"rg10",_EF10,"rg13",_EF13,"rg14",_EF14,"rg15",_EF15]); 	
}

function cmCreateShopAction5Tag(prID,prName,catID,state,prType,sPF,attr,prQty){
   if (!prQty) prQty = "1";

cmMakeTag(["tid","4","at","5","pr",prID,"pm",prName,"qt",prQty,"bp","1","cg",catID,"sx3",state,"sx14",prType,"sx15",sPF,"cm_exAttr",cmAttr(attr)]);  	
   deleteCookie("OrderIDcookie","/");
}

function cmCreateShopAction9Tag(prID,prName,custId,ordID,catID,ovDraft,fund,state,prType,sPF,instDec,attr,prQty) {
   if (!ordID) ordID = autoOrderID();
   if (!prQty) prQty = "1";
   custId = getCustIDVal();
cmMakeTag(["tid","4","at","9","pr",prID,"pm",prName,"qt",prQty,"bp","1","cd",custId,"on",ordID,"cg",catID,   "tr","1","sx1",ovDraft,"sx2",fund,"sx3",state,"sx14",prType,"sx15",sPF,"sx4",instDec,"cm_exAttr",cmAttr(attr)]);  	
}

function cmMakeTag(__v) {
	var cm = new _cm("vn2", "e4.0"), i;
	for (i=0; i<__v.length; i+=2) { 
		var _n=__v[i];  
		var _v=__v[i + 1];
		if (_v && _v != null) cm[_n] = _v; 
	}

	var datestamp = new Date();	
	var stamp = (Math.floor(Math.random() * 11111111)) + datestamp.valueOf();	
	cm.rnd = stamp;

	if (cI("cmTPSet")!='Y'&&cm.tid=="1") { cm.tid="6"; }
	if (cm.tid=="6" && cI("cmTPSet")!='Y') {  
		if (window.location.href.toLowerCase().indexOf("bankofamerica.com") > -1) 
			document.cookie = "cmTPSet=Y; domain=bankofamerica.com; path=/";
		else 
			document.cookie = "cmTPSet=Y; path=/";
		 
	}
	if (cm.tid=="6")
	{
	        cm.pc="Y";
	        cm.addTP();	
	}

	try{
		if (parent.cm_ref != null) {
			cm.rf = parent.cm_ref;
			if (cm.pc == "Y") {
				parent.cm_ref = document.URL;
			}
		}
	}
	catch(err){}

	try {
		if(parent.cm_set_mmc) {
			cm.ul = document.location.href + ((document.location.href.indexOf("?") < 0) ? "?" : "&") + parent.cm_mmc_params; 
			if (cm.pc == "Y") {
				parent.cm_ref = cm.ul;
				parent.cm_set_mmc = false;
			}
		}
	}
	catch(err){}

	
	if (cm.ul == null) cm.ul = window.location.href?window.location.href:document.URL?document.URL:"UNDEFINED";  

	var urli = cm.ul.toLowerCase().indexOf("cm_ref=");
	
	if (urli >= 0) {
		var stop = cm.ul.indexOf("&",urli+7);
		if (stop < 0) {
			stop = cm.ul.length;
		}
		cm.rf = unescape(cm.ul.substring(urli+7, stop));
	}

	if (cm.refURL && typeof(cm.refURL)=="string") {
		cm.rf = cm.refURL; 
	}
  
	if (cm.destURL && typeof(cm.destURL)=="string") {
		cm.ul = cm.destURL;
	}
 
	if (cm.tid == "1" || cm.tid == "6")
		cm=cmFillAdStrings(cm); 

	if (this.manual_cm_mmc != null && cm.ul.indexOf("cm_mmc") < 0 && cm.ul.indexOf("cm_ven") < 0 && cm.tid != "9") 
		cm.ul+=((cm.ul.indexOf("&") == -1) ? ((cm.ul.indexOf("?") == -1) ? "?" : "&") : "&") + "cm_mmc=" + this.manual_cm_mmc;

	cm.ul = cm.ul.replace(/cm_mmc/gi,"cm_mmc");
	cm.ul = cm.ul.replace(/cm_ven/gi,"cm_ven");
	cm.ul = cm.ul.replace(/cm_cat/gi,"cm_cat");
	cm.ul = cm.ul.replace(/cm_pla/gi,"cm_pla");
	cm.ul = cm.ul.replace(/cm_ite/gi,"cm_ite");
 
	if (cm.tid != "4" && typeof(cm.cm_exAttr)!="undefined"){
		if (cm.tid=="6" || cm.tid=="1") prefix="pv";
		else if (cm.tid=="14") prefix="c";
		else if (cm.tid=="15") prefix="e"; 
					
		var attrNum=cm.cm_exAttr.length;
		if (attrNum>15) attrNum=15;
	
		for (i=0;i<attrNum;i++){
			Attval=prefix+"_a"+(i+1);
			cm[Attval]=cm.cm_exAttr[i];
		}
    		cm.cm_exAttr=null;
  	}	
 
 	 cm.writeImg();
}

function autoOrderID()
{
  if ((getCookie("OrderIDcookie")==undefined)||((getCookie("OrderIDcookie"))&&(getCookie("OrderIDcookie")==""))) {
    orderID=cmGetDefaultOrderID();
    setCookie("OrderIDcookie",orderID,"/");
    return orderID;
  }
  return getCookie("OrderIDcookie");
}

function cmAttr(attr) {
   if (attr) return attr.split("-_-");
   return null; 
}

function cmFillAdStrings(cm) {
	var as = cmGetAdString();
	var l = as.length;
	if (l<=100){
		cm.pv11 = as;
	} else {
	cm.pv11 = as.substring(0,100);
	if (l<=200){
	cm.pv12 = as.substring(100,l);
	} else {
	cm.pv12 = as.substring(100,200);
	if (l<=300){
	cm.pv13 = as.substring(200,l);
	} else {
	cm.pv13 = as.substring(200,300);
	if (l<=400){
	cm.pv14 = as.substring(300,l);
	} else {
	cm.pv14 = as.substring(300,400);
	cm.pv15 = as.substring(400,l);
        }}}}
	return cm;
}

function cmGetAdString(){
	var linkCt = document.links.length; var lurl; var i; var adString = ""; var ndx; var ad;
	for (i = 0; i < linkCt; i++) {
		lurl = document.links[i].href;
		ndx = lurl.lastIndexOf("adlink=");
		ndx2 = lurl.lastIndexOf("/adtrack/");
		if ((ndx >= 0) && (ndx2>0)) {
			ad = lurl.substring(ndx+7, lurl.length).toLowerCase();
			if (ad.indexOf("&amp;") >= 0){
				ad = ad.substring(0, ad.indexOf("&amp;"));
			}
			adString += "|" + ad + "|";
		}
	}
	return adString;
}

function cmGetDefaultOrderID() {
  var dt=new Date();
  return dt.getTime()%10000000+''+Math.round(Math.random()*1000);	
}

function cmHTE(h,t,e,v)
{
   v[v.length]="pv4";
   vl=v.length;
   if (h) v[vl]="HELP"; 
   if (t) v[vl]="TOOL"; 
   if (e) v[vl]="ERROR"; 
   return v;
}


function deleteCookie(name,path) {
  if (getCookie(name)) {
    document.cookie = name + "=" + ((path) ? "; path=" + path : "")+ "; expires=Thu, 01-Jan-70 00:00:01 GMT";
  }
}

function getCookie (name) {
  var dcookie = document.cookie, cname = name + "=", clen = dcookie.length, cbegin = 0;
  while (cbegin < clen) {
    var vbegin = cbegin + cname.length;
    if (dcookie.substring(cbegin, vbegin) == cname) {
      var vend = dcookie.indexOf (";", vbegin);
      if (vend == -1) vend = clen;
      return unescape(dcookie.substring(vbegin, vend));
    }
    cbegin = dcookie.indexOf(" ", cbegin) + 1;
    if (cbegin == 0) break;
  }
  return null;
}

function getDefaultPageID(tN) {
  if (!tN) { tN =""; }
  var cmTitle = document.title;
  if (cmTitle.indexOf("Bank of America |") == 0) {
    cmTitle = cmTitle.substr(17);
  } 
  else if (cmTitle.indexOf("Banc of America Investment Services, Inc. |") == 0 ) {
    cmTitle = cmTitle.substr(43);
  }
  if ((tN == "interstitial : CA") || (tN == "interstitial : OOF") || (tN == "interstitial : NW") || (tN == "interstitial : MODEL")) 
     return cmTitle + " :" + tN;
  else
     return cmTitle+" ("+tN+")";
}

function setCookie(name,value,path) {
  document.cookie = name + "=" + escape (value) + ((path) ? "; path=" + path : "");
}

function getCustIDVal() {
   if (getCookie('CM_RegCustID') == null) {	
	var cm_NewRegCookieVal = getCookie('BOA_0020');
		if ((cm_NewRegCookieVal == null)||(typeof(cm_NewRegCookieVal) == "undefined")) {
		cm_NewRegCookieVal = getRegRandNum();
		}
	setBACRegCookie('CM_RegCustID',cm_NewRegCookieVal);
	return cm_NewRegCookieVal;
	}
	else {
	var cm_ExistingCustIDVal = getCookie('CM_RegCustID');
	return cm_ExistingCustIDVal;
	}
}

function setBACRegCookie(c_name,cookievalue) {
var exdate=new Date();
exdate.setDate(exdate.getDate() + 15000);
var exdays = exdate.toUTCString();
document.cookie = c_name + "=" + cookievalue + ";expires=" + exdays + ";path=/" + ";domain=bankofamerica.com";
}
		
function getRegRandNum() {
  var dt=new Date();
  return dt.getTime()%10000000+''+Math.round(Math.random()*10000000);	
}

function myNormalizeFORM(forms) { return forms; }
function myNormalizeFIELDS(fields) { return fields; }
function myNormalizeURL(url, isHref) { return url; }

try {
	document.cmTagCtl.normalizeFIELDS = function(field) { 
   		if(typeof(fieldAlias)=="object") {
			if(fieldAlias[field]) {
				var cm_ENA=fieldAlias[field]; 
				return typeof(cm_ENA)=="string"&&cm_ENA!=""?cm_ENA:field;  
			}
   		}
		return field; 
	}
}
catch(e) {}

try {
	defaultNormalize = document.cmTagCtl.normalizeURL; 

	document.cmTagCtl.normalizeURL = function(url, isHref) { 
		var newURL = url, cmN    

		try {
			cmN=typeof(cm_NormalizeList)!="string"?"":cm_NormalizeList;  			

			if (isHref) { 
				if (newURL.indexOf("cid=")>-1) {
					cmN = "cid=;" + cmN;  
				}

				if (newURL.indexOf("/cid/")>-1) {
					cmN = "/cid/;" + cmN; 
				}

				if (newURL.indexOf("/ias/")>-1) {
					cmN = "/ias/;" + cmN; 
				}
			}
		
			if (cmN != "") {
				var blackList = cmN.split(";"),p; 

				for(x=0;x<blackList.length;x++) {
					p=blackList[x];
					if (p != "" && newURL.indexOf(p)>-1) { 
						if (p.indexOf("=")>-1) {
							if (newURL.indexOf("?")>-1 && newURL.indexOf("&")==-1) {
								newURL = newURL.replace("?",""); 
							}
							var rg1 = new RegExp(p+".*(&|$)","i"); 
							newURL = newURL.replace(rg1,""); 
						}
						if (p.indexOf("/")>-1) {
							var rg2 = new RegExp(p+".*(\/|$)","i");
							newURL = newURL.replace(rg2,"");  
						}
					}				
				}
	
				if (defaultNormalize && typeof(defaultNormalize)=="function") {
					newURL = defaultNormalize(newURL, isHref);
				}
			}
		}
		catch(e){}

		return newURL;
	}
}
catch(e){}

if (typeof(cm_Touch) == "undefined"){
	/* Touch Clarity 
	 * Copyright (c) Touch Clarity Ltd 2001-2007. All rights reserved. Patent Pending.
	 * Privacy Policy at http://www.touchclarity.com/privacy/
	 */
	(function(){
		var _1={Version:"4.2.1#323",Vendor:"Touch Clarity",Filename:"eluminate.js"};
		_1.Loader=function(){
			var _2=this;
			var _3={server:"www.bankofamerica.com",path:"/pa/global-assets/external/tc/tc_logging",args:""};
			this.init=function(){
				return _buildScriptTag();
			};
			function _buildScriptTag(){
				var _4="https://";
				var _5=""+_4+_3.server+_3.path+".js?"+_3.args;
				if (typeof(tc_override) == "undefined"){
					document.write("<scr" + "ipt type=\"text/javascript\" src=\""+_5+"\"></scr" + "ipt>");
				} else {
					document.write("<scr" + "ipt type=\"text/javascript\" src=\""+tc_override+"\"></scr" + "ipt>");
				}
				return true;
			}
		};
		var _6=new _1.Loader();
		_6.init();
	})
	();
}