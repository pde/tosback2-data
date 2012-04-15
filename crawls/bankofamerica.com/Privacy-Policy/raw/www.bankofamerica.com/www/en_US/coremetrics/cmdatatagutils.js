/* cmdatatagutils.js
* $Id: cmdatatagutils-Comprehensive-Condensed-master.txt 169225 2011-04-27 17:42:22Z cterrell $
*
* Coremetrics Tag v4.0, 8/11/2006
* COPYRIGHT © 1999-2011 COREMETRICS, AN IBM COMPANY.
* ALL RIGHTS RESERVED. U.S. PATENT PENDING
* The following functions aid in the creation of Coremetrics data tags.
*
* Legacy changelist is available from BAC CM Team.
*
* Date:			Name:			Description:
* 05/18/2010	Corey Terrell	Added timestamp randomization and force mmc to lowercase to MakeTag.
* 06/28/2010	Corey Terrell	Modified data direction functions to handle new test system.
* 09/28/2010	Corey Terrell	Migrate to first party Coremetrics-managed data collection.
* 03/24/2011	Corey Terrell	Modified product tags to accept mutiple quantities of a single product.
* 04/27/2011	Corey Terrell	Modified Registration and Shop 9 tags to set and use new cookie instead of BOA_0020.
*/

document.hitImage = new Array();
var cm_hitImageIndex = 0, cm_pageID = "", cmRandom, cmAppName, cmAppStepName, cmAppStepNumber, cmAppCategory, cmJv = "1.0", cmFormEventCounter=0, cmFormEventElement = new Array(), cmFormEventPointer = new Array(), cmFormEventFirst = new Array(), cm_FormPageID=true;

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

function cmCreateAppError(ssn,email,OLBUser,OLBPass,promoCode) {
  cmMakeTag(["tid","7","li","207","ps1",ssn,"ps2",email,"ps3",OLBUser,"ps4",OLBPass,"ps5",promoCode]);
}

function cmCreateApplicationTags(pgID,appName,appStpNum,appStpName,help,err,errmsg,tool,cat,first,last,saved,state,prID,custID,ordID,adlink,adlob,ovDraft, fund,instDec,resumed,prName,prType,pgCnt,attr) {
	
  var tBC = cI("olbcmid");
  if (tBC == "BC") {
    if (appName.toUpperCase() == "OLB ENROLLMENT") {
      appName = "BC " + appName;
      category = "ONLINE BANKING ENROLLMENT - BANKING CENTER";
    }
  }

  if (tBC == "ISSP") {
    if (appName.toUpperCase() == "OLB ENROLLMENT") {
      appName = "ISSP" + appName;
      category = "ONLINE BANKING ENROLLMENT - ISSP";
    }
  }

  if (appStpName) { cmAppStepName = appStpName; } else cmAppStepName = null; 
  if (appName) { cmAppName = cmRemoveWhiteSpace(appName); } else cmAppName = null; 
  if (appStpNum) { cmAppStepNumber = appStpNum; } else cmAppStepNumber = null;
  if (!pgID || pgID==null) { pgID = getDefaultApplicationPageID(appName, appStpName, appStpNum ); }
  if (!cat || cat==null) { cat = appName + ":" + state; }
  if (!pgCnt && pgCnt !== null && pgCnt !== undefined) pc="N"; else pc="Y";   
  	
  if (prID) {
    prAr = prID.split(',');
    prNmAr = new Array();
    prTyAr = new Array();
    if (prName) { prNmAr = prName.split(','); }
    if (prType) { prTyAr = prType.split(','); }
    var oSD = '', oT = 0;
    if (first) { deleteCookie("OrderIDcookie","/"); }
    if (last) {
      if (!ordID) { ordID = autoOrderID(); }
    }

    for (var i=0; i<prAr.length; i++) {
      if (first && prAr[i]) {
	var tN = appName;
	if ((prNmAr[i] != null) && (prNmAr[i] != "")) {
	  tN = prNmAr[i];
	}
	var tPT = prTyAr[i];
	if (prTyAr.length > 1) { sPF=1; } else { sPF=0; }
	if (!tPT) { tPT = null };
	cmCreateShopAction5Tag(prAr[i], tN, cat, state, tPT, sPF);
      }

      if ((last)&&(prAr[i])) {
	var tN = appName;
	if ((prNmAr[i] != null) && (prNmAr[i] != "")) {
	  tN = prNmAr[i];
	}

	var sPF=0, tPT = prTyAr[i];
	if (prTyAr.length > 1) { sPF = 1; }
	if (!tPT) { tPT = null };
	cmCreateShopAction9Tag(prAr[i], tN, custID, ordID, cat, ovDraft, fund, state, tPT, sPF, instDec);
	oSD = oSD + '|' + prAr[i] + '|1|1|';
	oT++;
      }
    }

    if (last && oSD) cmCreateOrderTag(ordID, oT, oSD, custID, state);
  }

cmMakeTag(cmHTE(help,tool,err,["tid","1","pi",pgID,"cg",cat,"pv1",cmAppName,"pv2",cmAppStepNumber,"pv3",cmAppStepName,"pv7",ordID,"pv14",prID,"pv15",prName,"pv5",errmsg,"pv6",adlink,"pv8",adlob,"pc",pc,"cm_exAttr",cmAttr(attr)]));  

  cmSetupApplicationTextBoxTags(cat,first,last,saved,ovDraft,fund,instDec,resumed,state,ordID);
}

function cmCreateAppSubmitTimingStart() {
  cmMakeTag(["tid","7","li","600"]); 
}

function cmCreateAppSubmitTimingEnd() {
  cmMakeTag(["tid","7","li","601"]); 
}

function cmCreateConversionEventTag(eventID,actType,catID,pts,pgID,prID,appID,refPgID,attr) {
  cmMakeTag(["tid","14","cid",eventID,"cat",actType,"ccid",catID,"cpt",pts,"cx1",pgID,"cx2",prID,"cx3",appID,"cx4",refPgID,"cm_exAttr",cmAttr(attr)]);
}

function cmCreateCustomError(pgID,appName,appStpNum,appStpName,errCd,catID,errMsg) {
  cmMakeTag(["tid","7","li","207","ps1",pgID,"ps2",appName,"ps3",appStpNum,"ps4",appStpName,"ps5",errCd,"ps6",catID,"ps7",errMsg]);
}

function cmCreateCustomRegistrationTag(custId,olbCust,state,advInfo,firm) {
   cmMakeTag(["tid","4","li","101","ps1",custId,"ps2",advInfo,"ps3",state,"ps4",olbCust,"ps5",firm]); 
}

function cmCreateDefaultPageviewTag(tN) {
  cmCreatePageviewTag(getDefaultPageID(tN), null, null);
}

function cmCreateErrorTag(pgID,catID,attr) {
   if (!pgID) { pgID = getDefaultPageID(templateName); }
   cmMakeTag(["tid","404","pi",pgID,"pc","Y","cg",catID,"ul",document.URL,"cm_exAttr",cmAttr(attr)]); 
}

function cmCreateFormEventTag(appName,appStpNum,appStpName,appCat,elemName,elemState) {
  cmMakeTag(["tid","7","li","4","ps1",appName,"ps2",appStpNum,"ps3",appStpName,"ps4",elemName,"ps5",elemState,"ps6",appCat]); 
}

function cmCreateFormFieldTag(appName,appStpNum,appStpName,appCat,fldName) {
  var dt = new Date();
  cmMakeTag(["tid","7","li","2","ps1",appName,"ps2",appStpNum,"ps3",appStpName,"ps4",dt.getTime()%10000000,"ps5",fldName,"ps6",appCat]);
}

function cmCreateImpressionTag(pgID,sp,re) {
  cmMakeTag(["tid","9","pi",pgID,"cm_sp",sp,"cm_re",re,"st",cm_ClientTS]);          
}

function cmCreateManualLinkClickTag(href,name,pgID) {	
  if (cmCreateLinkTag == null && cM != null) {
    var cmCreateLinkTag = cM;
  }
  if (cmCreateLinkTag != null) {		
    var dt=new Date();
    cmCreateLinkTag(cm_ClientTS,dt.getTime(),name,href,false,pgID);
  }
}

function cmCreateManualPageviewTag(pgID,catID,destURL,refURL,attr) {
  cmMakeTag(["tid","1","pi",pgID,"cg",catID,"ul",destURL,"rf",refURL,"cm_exAttr",cmAttr(attr)]); 	
}

function cmCreateOrderTag(ordID,ordTot,ordSKUData,custId,state,attr) {
   if (!ordID) ordID = autoOrderID();
   cmMakeTag(["tid","3","on",ordID,"tr",ordTot,"osk",ordSKUData,"sg","0","cd",custId,"sa",state,"cm_exAttr",cmAttr(attr)]); 
}

function cmCreatePageElementTag(elemID,elemCat,pgID,pgCatID,elemLoc,attr) {
  cmMakeTag(["tid","15","eid",elemID,"ecat",elemCat,"pflg","0","pid",pgID,"pcat",pgCatID,"eloc",elemLoc,"cm_exAttr",cmAttr(attr)]); 
}

function cmCreatePageviewTag(pgID,tempName,searchStr,catID,help,err,errmsg,tool,flash,adlink,appID,adlob,searchRes,sessID,appName,appStpNum,appStpName,attr,subcmpgnCode,refURL,destURL) {
   if (!pgID) { pgID = getDefaultPageID(tempName); }		
cmMakeTag(cmHTE(help,tool,err,["tid","1","pi",pgID,"se",searchStr,"cg",catID,"pv5",errmsg,"pv6",adlink,"pv7",appID,"pv8",adlob,"sr",searchRes,"pv10",sessID,"pv1",appName,"pv2",appStpNum,"pv3",appStpName,"pv9",subcmpgnCode,"cm_exAttr",cmAttr(attr),"refURL",refURL,"destURL",destURL]));
}

function cmCreateProductDetailsTag(pgID,prID,appID,org,pid,gc,pat,sc,mc,cmpID) {
  cmMakeTag(["tid","7","li","300","ps1",pgID,"ps2",prID,"ps3",appID,"ps4",org,"ps5",pid,"ps6",gc,"ps7",pat,"ps8",sc,"ps9",mc,"ps10",cmpID])
}

function cmCreateProductviewTag(prID,prName,catID,searchStr,help,err,errmsg,tool,adlink,adlob,pgCnt,prType) {
   if (prName == null) prName = ""; 
  
   if (!pgCnt && pgCnt !== null && pgCnt !== undefined) { pc="N"; } else { pc="Y"; }
   if (prType) {
      catID += ":" + prType; li=350; ps1=prID; ps2=prName; ps3=catID; ps4=prType;
   }
   else {
      li=null; ps1=null; ps2=null; ps3=null; ps4=null; 
   }
   cmMakeTag(cmHTE(help,tool,err,["tid","5","pr",prID,"pm",prName,"cg",catID,"pi","PRODUCT: "+prName+" ("+prID+")","se",searchStr,"pv5",errmsg,"pv6",adlink,"pv8",adlob,"li",li,"ps1",ps1,"ps2",ps2,"ps3",ps3,"ps4",ps4,"pc",pc])); 
}

function cmCreateRegistrationTag(_PID,_TN,_CUID,_OCU,_ST,_AIN,_CID,_FRM,_ADL,_ADB,_HLNK,_OLNK,_PCNT,_ACTNM,_EF7,_EF8,_EF9,_EF10,_EF13,_EF14,_EF15) {
   if (!_PID) _PID = getDefaultPageID(_TN); 
   if (!_PCNT && _PCNT !== null && _PCNT !== undefined) pc="N"; else pc="Y"; 
   _CUID = getCustIDVal();
cmMakeTag(["tid","2","pi",_PID,"cd",_CUID,"sa",_ST,"cg",_CID,"pv6",_ADL,"pv8",_ADB,"rg1",_CUID,"rg2",_AIN,"rg11",_OCU,"li","101","ps1",_CUID,"ps2",_AIN,"ps3",_ST,"ps4",_OCU,"ps5",_FRM,"ps6",_HLNK,"ps7",_OLNK,"rg3",_FRM,"rg4",_HLNK,"rg5",_OLNK,"rg6",_ACTNM,"rg12",_ST,"pc",pc,"rg7",_EF7,"rg8",_EF8,"rg9",_EF9,"rg10",_EF10,"rg13",_EF13,"rg14",_EF14,"rg15",_EF15]); 	
}

function cmCreateSavedApplicationTag(appName,appStpNum,appStpName) {
  cmMakeTag(["tid","7","li","999","ps1",appName,"ps2",appStpNum,"ps3",appStpName]); 	
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

function cmCreateTechProps(pgID,catID,tempName,adlink,adlob,attr){
   if (!pgID) { pgID = getDefaultPageID(tempName); }	
   cmMakeTag(["tid","6","pi",pgID,"cg",catID,"pv6",adlink,"pv8",adlob,"pc","Y","cm_exAttr",cmAttr(attr)]);
}

function cmCreateToolTag(pgID,toolName,toolStepNum,toolStpName,grp,cat,first,last,update,prodRec) {
   cmCreatePageviewTag(pgID, null, null, cat);
   if(first) ps6="FIRST"; else ps6=null;
   if(last) ps7="LAST";  else ps7=null;
   if(update) ps8="UPDATE"; else ps8=null;
   cmMakeTag(["tid","7","li","3","ps1",toolName,"ps2",toolStepNum,"ps3",toolStpName,"ps5",cat,"ps4",grp,"ps9",prodRec,"ps6",ps6,"ps7",ps7,"ps8",ps8]); 
}

function cmPageviewOnClick(pageID,theURL,category) {
   var rf = document.referrer; 
   if (parent.cm_ref != null) { rf = parent.cm_ref; parent.cm_ref = document.URL; } 
   var ul = window.location.href;
   if (theURL && theURL != "") { ul = theURL; }
   cmCreateManualPageviewTag(pageID,category,ul,rf); 
}

function cmSendFormFieldTag(name,w) {
  cmMakeTag(["tid","7","li","2","ps1",cmAppName,"ps2",cmAppStepNumber,"ps3",cmAppStepName,"ps4",cmRandom,"ps5",name,"ps6",cmAppCategory]);
}

function cmSetupApplicationTextBoxTags(cat,first,last,saved,ovDraft,fund,instDec,resumed,state,ordID){
 
  if (first) ps6="FIRST"; else ps6=null;
  if (last) ps7="LAST"; else ps7=null;
  if (saved) ps8="SAVED"; else ps8=null;
  if (resumed) ps12="RESUMED"; else ps12=null; 
  
  if (baisi=1) {
    var dt=new Date();
    on=dt.getTime()%10000000;
  } 
  else 
    on=orderID;

cmMakeTag(["tid","7","li","1","ps1",cmAppName,"ps2",cmAppStepNumber,"ps3",cmAppStepName,"ps5",cat,"ps9",ovDraft,"ps10",fund,"ps11",instDec,"ps13",state,"on",on,"ps6",ps6,"ps7",ps7,"ps8",ps8,"ps12",ps12]);  

  var cm_val;

  for (var i=0;i<document.forms.length; i++){
     for (var j=0;j<document.forms[i].elements.length; j++){
	var el = document.forms[i].elements[j];
	if (el.type=="checkbox"){
	  cm_val = el.checked ? "T":"F";
	  cmCreateFormEventTag(cmAppName, cmAppStepNumber, cmAppStepName, cmAppCategory, el.name, cm_val);
	  cmSetEvent(el);
	}
	else if (el.type=="radio"){
	  if(el.checked == true) cmCreateFormEventTag(cmAppName, cmAppStepNumber, cmAppStepName, cmAppCategory, el.name, el.value);		
	  cmSetEvent(el);
	}
	else if (el.type=="select") {
	  if(el.selectedIndex != -1){
	     cmCreateFormEventTag(cmAppName, cmAppStepNumber, cmAppStepName, cmAppCategory, el.name, el.options[el.selectedIndex]);
          }
	  cmSetEvent(el);
	}
	else if (el.type == "text" || el.type == "textarea" || el.type == "password") {
	  if(el.value==""){
	    cmSetEvent(el);
	  } else {
	    cmCreateFormFieldTag(cmAppName, cmAppStepNumber, cmAppStepName, cmAppCategory, el.name);
	  }
	}
     }
  }
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

  if (cm.tid=="4" && cm.sx14) cm.cg+=":"+cm.sx14; 
	
  try{
    if (parent.cm_ref != null) {
      cm.rf = parent.cm_ref;
      if (cm.pc == "Y") {
	 parent.cm_ref = document.URL;
      }
    }
  }
  catch(e){}

  try {
    if(parent.cm_set_mmc) {
      cm.ul = document.location.href + ((document.location.href.indexOf("?") < 0) ? "?" : "&") + parent.cm_mmc_params; 
      if (cm.pc == "Y") {
	 parent.cm_ref = cm.ul;
	 parent.cm_set_mmc = false;
      }
    }
  }
  catch(e){}

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

  if (cm.tid=="1" || cm.tid=="5" || cm.tid=="2" || cm.tid=="6" || cm.tid=="404") { 
    cm.ul=cmSafeMMC(cm.ul);
    cm=cmFillAdStrings(cm); 
    if(!cm_pageID) cm_pageID = cm.pi;
  }
 
  if (this.manual_cm_mmc != null && cm.ul.indexOf("cm_mmc") < 0 && cm.ul.indexOf("cm_ven") < 0 && cm.tid != "9") 
     cm.ul+=((cm.ul.indexOf("&") == -1) ? ((cm.ul.indexOf("?") == -1) ? "?" : "&") : "&") + "cm_mmc=" + this.manual_cm_mmc; 
 
	cm.ul = cm.ul.replace(/cm_mmc/gi,"cm_mmc");
	cm.ul = cm.ul.replace(/cm_ven/gi,"cm_ven");
	cm.ul = cm.ul.replace(/cm_cat/gi,"cm_cat");
	cm.ul = cm.ul.replace(/cm_pla/gi,"cm_pla");
	cm.ul = cm.ul.replace(/cm_ite/gi,"cm_ite");

  if (cm.tid != "4" && typeof(cm.cm_exAttr)!="undefined"){
    if (cm.tid=="6" || cm.tid=="1" || cm.tid=="404") prefix="pv";
    else if (cm.tid=="5") prefix="pr";
    else if (cm.tid=="3") prefix="o"; 
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

function cmAttr(attr)
{
   if (attr) return attr.split("-_-");
   return null; 
}

function cmExtractParameter(p,s) {
  if (s.indexOf(p) == -1) return null;
  var begin = s.indexOf(p);
  var end = s.indexOf("&", begin);
  if (end == -1) { end = s.length; }
  var middle = s.indexOf("=", begin);
  return s.substring(middle+1, end);
}

function cmFillAdStrings(cm) {
  var aS = cmGetAdString(), mL = 100; 
  var length = aS.length;
  if (length<=mL) { cm.pv11 = aS; } 
  else {
  cm.pv11 = aS.substring(0,mL);
  if (length<=2*mL){
  cm.pv12 = aS.substring(mL,length);
  } else {
  cm.pv12 = aS.substring(mL,2*mL);
  if (length<=3*mL){
  cm.pv13 = aS.substring(2*mL,length);
  } else {
  cm.pv13 = aS.substring(2*mL,3*mL);
  if (length<=4*mL){
  cm.pv14 = aS.substring(3*mL,length);
  } else {
  cm.pv14 = aS.substring(3*mL,4*mL);
  cm.pv15 = aS.substring(4*mL,length);
  } } } }
  return cm;
}

function cmGetAdString(){
  var linkCt = document.links.length, lurl, i, adString="", ndx, ad;
  for (i=0; i<linkCt; i++) {
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

function cmGetAppStepName() {}

function cmGetDefaultOrderID() {
  var dt=new Date();
  return dt.getTime()%10000000+''+Math.round(Math.random()*1000);	
}

function cmGetQueryParam(p,uS) {
  var s="", ndx=uS.lastIndexOf(p+"=");
  if (ndx >= 0) {
    s=uS.substring(ndx+p.length+1,uS.length).toLowerCase();
    if (s.indexOf("&") >= 0) s=s.substring(0,s.indexOf("&"));
  }
  return s;
}

function cmGetStepID(uS){
  var ndx, stepIdName=cmGetQueryParam("page",uS);
  ndx=stepIdName.indexOf("_");
  if (ndx >= 0) return stepIdName.substring(0,ndx).toLowerCase();  
  else return ""; 
}

function cmGetStepName(uS){
  var ndx, stepIdName=cmGetQueryParam("page",uS);
  ndx = stepIdName.indexOf("_");
  if (ndx >= 0) return stepIdName.substring(ndx+1,uS.length).toLowerCase();
  else return stepIdName;
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

function cmIndexOfParameter(p,s) { return s.indexOf(p); }

function cmMultipleEvents(id){
  if (cmFormEventElement[id])
  {
     var cm_elem=cmFormEventElement[id], cm_val;
     if(cm_elem.type == "radio") {
       cmCreateFormEventTag(cmAppName, cmAppStepNumber, cmAppStepName, cmAppCategory, cm_elem.name, cm_elem.value);
     } else if(cm_elem.type == "checkbox") {
       cm_val = cm_elem.checked ? "T":"F";
       cmCreateFormEventTag(cmAppName, cmAppStepNumber, cmAppStepName, cmAppCategory, cm_elem.name, cm_val);
     } else if(cm_elem.type == "select") {
         cm_val = cm_elem.options[cm_elem.selectedIndex];
         cmCreateFormEventTag(cmAppName, cmAppStepNumber, cmAppStepName, cmAppCategory, cm_elem.name, cm_val);
     } else if(cm_elem.type == "text" || cm_elem.type == "textarea" || cm_elem.type == "password") {
        if(cmFormEventFirst[id] == true ){
          cmCreateFormFieldTag(cmAppName, cmAppStepNumber, cmAppStepName, cmAppCategory, cm_elem.name);
	  cmFormEventFirst[id] = false;
        }
     }
  
     if (cm_elem.cm_oldOnChange != null) cm_elem.cm_oldOnChange(); 
  }
}

function cmRemoveParameter(p,s) {
  if (s.indexOf(p) == -1) return s;
  var begin=s.indexOf(p); 
  var start=(begin-1);
  var end = s.indexOf("&", begin);
  if (end == -1) { end = s.length; }
  if (s.substring(start, begin) == "?") {
    start = (start + 1);
    end = (end + 1);
  }
  return s.substring(0, start) + s.substring(end, s.length);
}

function cmRemoveWhiteSpace(str){
  while (str.substring(0,1) == ' ') str = str.substring(1);
  while (str.substring(str.length-1,str.length) == ' ') str = str.substring(0,str.length-1);
  var check = true;
  while (check) {
    var pos = str.indexOf('  ');
    if (pos>-1){
      str = str.substring(0,pos) + str.substring(pos+1,str.length);
    } else {
      check = false;
    }
  }
  return str;
}

function cmSafeMMC(ul) {	                   
  if ((ul.indexOf("#") > -1) && (ul.indexOf("cm_mmc") > ul.indexOf("#"))) {
    var tempMMC = cmExtractParameter("cm_mmc",ul);
    ul = cmRemoveParameter("cm_mmc",ul);
    var tempIndex = ul.indexOf("#");
    if (ul.substr(0,tempIndex).indexOf("?") > -1) {
      ul = ul.substr(0,tempIndex) + "&cm_mmc=" + tempMMC + ul.substr(tempIndex);
    }
    else {
      ul = ul.substr(0,tempIndex) + "?cm_mmc=" + tempMMC + ul.substr(tempIndex);
    }
  }
  return ul;
}

function cmSetEvent(elem) {
  cmFormEventElement[cmFormEventCounter] = elem;
  if (!elem.cm_touched) {
    if(elem.type == "text" || elem.type == "textarea" || elem.type == "password") {
      cmFormEventElement[cmFormEventCounter].cm_oldOnChange = elem.onchange;
      cmFormEventFirst[cmFormEventCounter] = true;
      elem.onchange = new Function("cmMultipleEvents("+cmFormEventCounter+");");
    } else if (elem.type == "select") {
      cmFormEventElement[cmFormEventCounter].cm_oldOnChange = elem.onchange;
      cmFormEventFirst[cmFormEventCounter] = true;
      elem.onchange = new Function("cmMultipleEvents("+cmFormEventCounter+");");
    } else {
      cmFormEventElement[cmFormEventCounter].cm_oldOnChange = elem.onclick;
      elem.onclick = new Function("cmMultipleEvents("+cmFormEventCounter+");");
    }
  }

  elem.cm_touched = true;
  cmFormEventCounter++;
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

function setBACRegCookie(c_name,cookievalue) {
var exdate=new Date();
exdate.setDate(exdate.getDate() + 15000);
var exdays = exdate.toUTCString();
document.cookie = c_name + "=" + cookievalue + ";expires=" + exdays + ";path=/" + ";domain=bankofamerica.com";
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

function getRegRandNum() {
  var dt=new Date();
  return dt.getTime()%10000000+''+Math.round(Math.random()*10000000);	
}

function getDefaultApplicationPageID(appName, appStepName, appStepNumber) {
  return "Application: " + appName + " Step: " + appStepNumber + " (" + appStepName + ")";
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

function setCookie(name,value,path) {
  document.cookie = name + "=" + escape (value) + ((path) ? "; path=" + path : "");
}
	
if (typeof(cm_Touch) == "undefined"){
	/* Touch Clarity 
	 * Copyright (c) Touch Clarity Ltd 2001-2007. All rights reserved. Patent Pending.
	 * Privacy Policy at http://www.touchclarity.com/privacy/
	 */
	(function(){
		var _1={Version:"4.2.1#323",Vendor:"Touch Clarity",Filename:"eluminate.js"};
		_1.Loader=function(){
			var _2=this;
			var _3={server:"www.bankofamerica.com",path:"/www/global/js/tc_logging",args:""};
			this.init=function(){
				return _buildScriptTag();
			};
			function _buildScriptTag(){
				var _4="";
				var _5="";
				if(_3.server){
					_4="http"+(window.location.href.substring(0,6)=="https:"?"s":"")+"://";
				}
				_5=""+_4+_3.server+_3.path+".js?"+_3.args;
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

//-->