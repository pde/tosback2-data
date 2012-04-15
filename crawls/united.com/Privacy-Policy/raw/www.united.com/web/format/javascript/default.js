startList=function(){
	if (document.all&&document.getElementById){
		var i,navRoot=document.getElementById("nav");
		if(navRoot!=null){
			for(i=0;i<navRoot.childNodes.length;i++){
				var node=navRoot.childNodes[i];
				if(node.nodeName=="LI"){
					node.onmouseover=function(){this.className+=" over";}
					node.onmouseout=function(){this.className=this.className.replace(" over","");}
				}
			}
		}
	}
}
window.onload = startList; setCookie("ctest", "1");

function getElementOffset(oe){
	var offset={left:0,top:0}
	for (var ot=oe; ot && ot.tagName!='BODY'; ot=ot.offsetParent){
		offset.left+=ot.offsetLeft;
		offset.top+=ot.offsetTop;
	}
	return offset;
}
function IsDatePattern(value) {
	var pattern=new RegExp("(\\d{1,2}[-./ ]\\d{1,2}[-./ ]\\d{2,4})");
	return pattern.test(value);
}
function ChangeValue(strVar,strFind,strReplace) {
	if (strVar.indexOf(strFind)>0) {
		var arrVar=splitString(strVar,strFind,"");
		var strTemp="";
		for (var i= 0;i<arrVar.length;i++) {
			if (arrVar[i]!="") {
				strTemp=strTemp+arrVar[i];
				if (i<(arrVar.length-1))strTemp=strTemp+strReplace;
			}
		}
		strVar=strTemp;
		return strTemp;
	}
	else return strVar;
}
function splitString(strCheck,strSep,strReturn) { var arryReturn = new Array(); var arryIndex = 1; var strTemp = ""; for (var i = 0; i < strCheck.length; i++) { if (strCheck.charAt(i) != strSep) { strTemp = strTemp + strCheck.charAt(i); } else { arryReturn[arryIndex] = strTemp; strTemp = ""; arryIndex = arryIndex + 1; } } if (strTemp != "") { arryReturn[arryIndex] = strTemp; } arryReturn[0] = strReturn; return arryReturn; }
function setYear(strYear){
	if(strYear<100){strYear=eval(strYear)+2000;}
	else if(strYear<1000){strYear=eval(strYear)+1900;}
	return strYear;
}
function CalcYear(intMonth,intDay) {
	dteNow=new Date();
	var intYear=dteNow.getFullYear();
	if (eval(intMonth)<(eval(dteNow.getMonth())+1)){intYear=eval(intYear+1);}
	return setYear(intYear);
}
function ParseDate(strDate,intMonth,intDay,intYear,intDatePOS){
	var strSeparator="/";
	strDate=ChangeValue(strDate,".","/");
	strDate=ChangeValue(strDate," ","/");
	strDate=ChangeValue(strDate,"-","/");

	var arrDate=splitString(strDate,strSeparator,"");
	var arrRetValue=new Array(2);

	if(arrDate.length==4){
		if(intDatePOS==3){intMonth=parseInt(arrDate[2],10);intDay=parseInt(arrDate[1],10);}
		else{intMonth=parseInt(arrDate[1],10);intDay=parseInt(arrDate[2],10);}
		intYear=setYear(parseInt(arrDate[3],10));
	}
	else if(arrDate.length==3){
		if(intDatePOS==3){intMonth=parseInt(arrDate[2],10);intDay =parseInt(arrDate[1],10);}
		else{intMonth=parseInt(arrDate[1],10);intDay=parseInt(arrDate[2],10);}
		intYear=CalcYear(intMonth,intDay);
	}
	if(intMonth>12){intMonth=0;}
	if(intDay>31){intDay=0;}
	else if(arrDate.length==2){
		intMonth=parseInt(arrDate[1],10);
	}
	arrRetValue[0]=intMonth;
	arrRetValue[1]=intDay;
	arrRetValue[2]=intYear;
	return arrRetValue;
}
function cleanDateInput(x,intDatePOS){
	var o=$(x),strDate=o.val(),arrDate=new Array(),dteNow=new Date();
	arrDate=ParseDate(strDate,0,0,0,intDatePOS);
	if (arrDate[0]>0 && arrDate[1]>0 && arrDate[2]>0){
		if(intDatePOS==3){
			if (strDate.length>5 && intDatePOS==3){
				strDate=arrDate[1]+"/"+arrDate[0]+"/"+arrDate[2];
			}
			else{
				if(parseInt(arrDate[0])<(dteNow.getMonth()+1) && parseInt(arrDate[2])<(dteNow.getFullYear()+1)){
					arrDate[2]=parseInt(arrDate[2])+1;
				}
				strDate=arrDate[1]+"/"+arrDate[0]+"/"+arrDate[2];
			}
		}
		else {
			strDate=arrDate[0]+"/"+arrDate[1]+"/"+arrDate[2];
		}
	}
	o.val(strDate);
}
function ClearDateFormat(objItem,objForm,strFormat){
	if (objItem.value==strFormat){objItem.value='';}
}
function OpenAirports(objLink,strFieldName,strLinkName){
	var objForm=document.forms[0];
	var strLangCode="en-US";
	if(objForm.hdnLangCode!=null){
		strLangCode=objForm.hdnLangCode.value;
	}
	if(strLangCode!="es"&&strLangCode!="de-DE"&&strLangCode!="ja-JP" && strLangCode!="zh-CN"&&strLangCode!="fr"&&strLangCode!="pt"&&strLangCode!="en-US"){strLangCode="en-US";}
	var strURL="/web/"+strLangCode+"/apps/booking/flight/airportList.aspx?FN="+strFieldName;
	window.open(strURL,"Airport","toolbar=0,status=0,menubar=0,location=0,scrollbars=1,resizable=1,width=540,height=560,top=50,left=50");
}
function getElementStyle(oe, styleProp) {
	var y
	if (oe.currentStyle)
		y = oe.currentStyle[styleProp];
	else if (window.getComputedStyle)
		y = document.defaultView.getComputedStyle(oe, null).getPropertyValue(styleProp);
	return y;
}


function getElementScroll(oe) {
	var scroll = { left: 0, top: 0 }
	for (var ot = oe; ot && ot.tagName != 'BODY'; ot = ot.parentNode) {
		if (getElementStyle(ot,'position') != 'relative') {
			scroll.left += ot.scrollLeft;
			scroll.top += ot.scrollTop;
		}
	}
	return scroll;
}
function getScrollTop() {
	if (document.documentElement.scrollTop) return document.documentElement.scrollTop;
	if (document.body.scrollTop) return document.body.scrollTop;
	if (window.pageYOffset) return window.pageYOffset;
	return 0;
}
function getScrollLeft(){
	if (document.documentElement.scrollLeft) return document.documentElement.scrollLeft;
	if (document.body.scrollLeft) return document.body.scrollLeft;
	if (window.pageXOffset) return window.pageXOffset;
	return 0;
}
function getViewportHeight(){
	if (document.documentElement.clientHeight) return document.documentElement.clientHeight;
	if (window.innerHeight) return window.innerHeight;
	if (document.body.clientHeight) return document.body.clientHeight;
	return 0;
}
function getViewportWidth(){
	if (document.documentElement.clientWidth) return document.documentElement.clientWidth;
	if (window.innerWidth) return window.innerWidth;
	if (document.body.clientWidth) return document.body.clientWidth;
	return 0;
}
function getElementWidth(o){
	if (o.offsetWidth) return o.offsetWidth;
	return 0;
}
function getElementHeight(o){
	if (o.offsetHeight) return o.offsetHeight;
	return 0;
}
function positionSatelite(oPrimary,oSatelite,bShowStem,iOffsetX,iOffsetY,bDefaultAbove){
	bShowStem=(typeof bShowStem=="undefined")?true:bShowStem;
	bDefaultAbove=(typeof bDefaultAbove=="undefined")?false:bDefaultAbove;
	iOffsetX=(typeof iOffsetX=="undefined")?-7:iOffsetX;
	iOffsetY=(typeof iOffsetY=="undefined")?-7:iOffsetY;
	var oPOffset=getElementOffset(oPrimary);
	var oPScroll = getElementScroll(oPrimary);
//	alert(oPScroll.left + " " + oPScroll.top);
	var iPHeight=getElementHeight(oPrimary);
	var iSHeight=getElementHeight(oSatelite);
	var iVHeight=getViewportHeight();
	var iScrollTop=getScrollTop();
	var sStemClass
	var bFitsBelow=(oPOffset.top+iPHeight+iSHeight)<=(iVHeight+iScrollTop+oPScroll.top)
	var bFitsAbove=(oPOffset.top-iSHeight)>=(iScrollTop+oPScroll.top)
	if ((bFitsAbove&&bDefaultAbove)||(bDefaultAbove&&!(bFitsAbove||bFitsBelow))||(bFitsAbove&&!(bFitsBelow||bDefaultAbove))){
		oPOffset.top-=iSHeight+iOffsetY+oPScroll.top;
		sStemClass="s_b";
	}
	else {
		oPOffset.top+=iPHeight+iOffsetY-oPScroll.top;
		sStemClass="s_t";
	}
	var iPWidth=getElementWidth(oPrimary);
	var iSWidth=getElementWidth(oSatelite);
	var iVWidth=getViewportWidth();
	var iScrollLeft=getScrollLeft();
	if (oPOffset.left-iSWidth>=iScrollLeft+oPScroll.left&&oPOffset.left+iSWidth>iVWidth+iScrollLeft+oPScroll.left){
		oPOffset.left-=((iSWidth-iPWidth)-iOffsetX)+oPScroll.left;
		sStemClass+="r";
	}
	else {
		oPOffset.left+=-(iOffsetX+oPScroll.left);
		sStemClass+="l";
	}
	var oPOffsetParent=oPrimary.offsetParent||document.body;
	var oSOffsetParent=oSatelite.offsetParent||document.body;
	var oSOffset = /^html|body$/i.test(oSOffsetParent.nodeName) ? { top: 0, left: 0} : getElementOffset(oSOffsetParent);
//	alert(oSOffset.left + " " + oPScroll.top);
	oPOffset.left-=oSOffset.left;
	oPOffset.top-=oSOffset.top;
	oSatelite.style.left=oPOffset.left+'px';
	oSatelite.style.top=oPOffset.top+'px';
	if (bShowStem){
		if (oSatelite.stem){
			oSatelite.stem.className="stem "+sStemClass;
		}
		else {
			var objStem=document.createElement('div');
			oSatelite.stem=objStem;
			objStem.className="stem "+sStemClass;
			oSatelite.appendChild(objStem);
		}
	}
}

function setCookie(c_name,value,expiredays){
	document.cookie=c_name+"="+escape(value);
}
function readCookie(name){
	var nameEQ=name+"=";
	var ca=document.cookie.split(';');
	for (var i=0; i < ca.length; i++){
		var c=ca[i];
		while (c.charAt(0)==' ') c=c.substring(1,c.length);
		if (c.indexOf(nameEQ)==0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
function Expert(version){
	ExpertQuestion(version,'');
}
function ExpertQuestion(version,question){
	var urlprotocol="https:";
	if (window.location.host.toLowerCase().indexOf("localhost") > -1 || window.location.host.toLowerCase().indexOf("10.") > -1) urlprotocol="http:";

	var url=urlprotocol+"//"+window.location.host;
	if (version){url=url+'/alex/Agent.aspx';}
	else {url=url+'/superalex/Agent.aspx';}
	if (question!='') url=url+"?Question="+question;
	if (version){
		LaunchExternalAgent(url);
	}
	else {
		LaunchInternalAgent(url);
	}
	if (location.protocol.toLowerCase()=='http:' & urlprotocol=='https:'){
		location.href=location.href.replace('http:',urlprotocol);
	}
}
function ShowDiv(id,hideIds){
	var arrShowIds=id.split(",");
	var arrHideIds=hideIds.split(",");
	var objElement;
	for(var i=0;i<arrShowIds.length;i++){
		if(arrShowIds[i]!=""){
			objElement=document.getElementById(arrShowIds[i]);
			if(objElement!=null)objElement.style.display="";
			objElement=document.getElementById(arrShowIds[i]+"Text");
			if(objElement!=null)objElement.className="active";
		}
	}
	for(var i=0;i<arrHideIds.length;i++){
		if(arrHideIds[i]!=""){
			objElement=document.getElementById(arrHideIds[i]);
			if(objElement!=null)objElement.style.display="none";
			objElement=document.getElementById(arrHideIds[i]+"Text");
			if(objElement!=null)objElement.className="inactive";
		}
	}
}
function ShowDivToggle(id,hideIds){
	var arrShowIds=id.split(",");
	var arrHideIds=hideIds.split(",");
	var objElement;
	var showIds="";
	var newHideIds="";
	for(var i=0;i<arrShowIds.length;i++){
		if(arrShowIds[i]!=""){
			objElement=document.getElementById(arrShowIds[i]);
			if(objElement!=null)
				if(objElement.style.display=="")newHideIds+=arrShowIds[i]+",";else showIds+=arrShowIds[i]+",";
		}
	}
//	for(var i=0;i<arrHideIds.length;i++){
//		if(arrHideIds[i]!=""){
//			objElement=document.getElementById(arrHideIds[i]);
//			if(objElement!=null)
//				if(objElement.style.display=="")newHideIds+=arrHideIds[i]+",";else showIds+=arrHideIds[i]+",";
//		}
//	}
	ShowDiv(showIds,newHideIds);
}

function surveyWindow(langCode){
	if(langCode=="es"){
		window.open('http://survey.novatris.com/cit/airtrack/fev06/invite_CO_sp.html','daughter','height=300,width=500,resizeable=no,scrollbars=no');
	}
	else{
		window.open('http://survey.novatris.com/cit/airtrack/fev06/invite_CO.html','daughter','height=300,width=500,resizeable=no,scrollbars=no');
	}
}
function launchSurvey(type,url){
	var rnd=Math.random();
	if (rnd * 10 < 4){
		var cookieValue=readCookie(type);
		var count=0;
		if (cookieValue!=null){
			if (!isNaN(cookieValue)) count=eval(cookieValue)+1;
			if (count < 3){
				window.open(url,'daughter','width=500,resizeable=no,scrollbars=no');
				count=3;
			}
		}
		setCookie(type,count,'');
	}
}
function test(){
	alert(window.location.href);
	alert('host '+window.location.host);
	alert('test '+document.url);
}

function DetectFlashVer(intReqMajorVer){
	var strVersion,strMajorVer,strError,objFlash
	var blnIE=(navigator.appVersion.indexOf("MSIE")!=-1) ? true : false;
	var blnWin=(navigator.appVersion.toLowerCase().indexOf("win")!=-1) ? true : false;
	var blnOpera=(navigator.userAgent.indexOf("Opera")!=-1) ? true : false;
	if (blnIE && blnWin && !blnOpera){
		try {
			objFlash=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+intReqMajorVer);
			objFlash.AllowScriptAccess="always";
			strVersion=objFlash.GetVariable("$version");
			}
		catch (strError){
			strVersion="0";
			}
		if (strVersion!="0") strMajorVer=strVersion.split(" ")[1].split(",")[0];
		else strMajorVer=strVersion;
		}
	else if ((navigator.plugins!=null && navigator.plugins.length > 0) && navigator.plugins["Shockwave Flash"]){
		strMajorVer=navigator.plugins["Shockwave Flash"].description.split(" ")[2].split(".")[0];
		}
	else return false;
	if (parseInt(strMajorVer) >= intReqMajorVer) return true;
	else return false ;
}

function RunFlashVer(intReqMajorVer,strObjCode){
if (DetectFlashVer(intReqMajorVer)){
	document.write(strObjCode);
	return true;
	}
else return false;
}
function ShowDivItemSelected(objItem,id,hideIds){
	if(objItem.checked){
		ShowDiv(id,"");
	}
	else{
		ShowDiv("",hideIds);
	}
}
function ShowDivSetItemSelected(id,hideIds,id1,id2){
	var objElement1=document.getElementById(ChangeValue(id1,"$","_"));
	if (objElement1!=null){objElement1.checked=true;}
	var objElement2=document.getElementById(ChangeValue(id2,"$","_"));
	if (objElement2!=null){objElement2.checked=false;}
	ShowDiv(id,hideIds);
}
//get value selected in dropdown list - lyn manimtim
function GetItemSelected(objItem)
{
	var opt="";
	var idx=objItem.selectedIndex;
	opt=objItem.options[idx].value;
	return opt;
}
function GetItemTextSelected(objItem) {
    var opt = "";
    var idx = objItem.selectedIndex;
    opt = objItem.options[idx].text;
    return opt;
}
function GetElement(id){
	return document.getElementById(ChangeValue(id,"$","_"));
}
function GetValue(id){
	var o=GetElement(id);
	return GetValueElement(o);
}

var EventHandlerCache=function () {
	var arrayEvents=[];
	return {
		add: function (oNode,sEventType,oFunction,useCapture) {
			arrayEvents.push(arguments);
		},
		flush: function () {
			var i, o;
			for (i=arrayEvents.length-1;i>=0;i--) {
				o=arrayEvents[i];
				if (o[0].removeEventListener) o[0].removeEventListener(o[1],o[2],o[3]);
				if (o[0].detachEvent) o[0].detachEvent("on"+o[1],o[0][o[1]+o[2]]);
				o[0][o[1]+o[2]]=null;
				o[0]['e'+o[1]+o[2]]=null;
				//o[0][o[1]] = null;
			};
		}
	};
} ();
AddEventHandlerElement(window, 'unload', EventHandlerCache.flush);

function AddEventHandlerElement(o,sEventType,oFunction,useCapture){
	if (o.addEventListener){
		useCapture=(typeof useCapture=="undefined")?false:useCapture;
		o.addEventListener(sEventType,oFunction,useCapture);
		EventHandlerCache.add(o,sEventType,oFunction,useCapture);
		return true;
	}
	else if(o.attachEvent){
		o['e'+sEventType+oFunction]=oFunction;
		o[sEventType+oFunction]=function () {return o['e'+sEventType+oFunction](window.event);};
		var r=o.attachEvent('on'+sEventType,o[sEventType+oFunction]);
		EventHandlerCache.add(o,sEventType,oFunction);
		return r;
	}
	else{
		o['on'+sEventType]=oFunction;
		return false;
	}
}
function AddEventHandler(id,sEventType,oFunction,useCapture){
	var o = GetElement(id);
	return AddEventHandlerElement(o,sEventType,oFunction,useCapture);
}
function GetValueElement(o){
	var value="";
	if (o!=null){value=o.value;}
	return value;
}
function GetText(id){
	var o=GetElement(id);
	return GetTextElement(o);
}
function GetTextElement(o){
	var text="";
	if (o!=null){text=o.innerHTML;}
	return text;
}
function GetClass(id){
	var o=GetElement(id);
	return GetClassElement(o);
}
function GetClassElement(o){
	var className="";
	if (o!=null){className=o.className;}
	return className;
}
function GetTitle(id){
	var o=GetElement(id);
	return GetTitleElement(o);
}
function GetTitleElement(o){
	var title="";
	if (o!=null){title=o.title;}
	return title;
}
function SetText(id,text){
	var o=GetElement(id);
	SetTextElement(o,text);
}
function SetTextElement(o,text){
	if (o!=null){o.innerHTML=text;}
}
function SetValueItem(id,value){
	var o=GetElement(id);
	SetValueElement(o,value);
}
function SetValueElement(o,value){
	if (o!=null){o.value=value;}
}
function SetClass(id,className){
	var o=GetElement(id);
	SetClassElement(o,className);
}
function SetClassElement(o,className){
	if (o!=null){o.className=className;}
}
function SetFocus(id){
	var o=GetElement(id);
	SetFocusElement(o);
}
function SetFocusElement(o){
	if (o!=null){o.focus();}
}
function SetTitle(id,title){
	var o=GetElement(id);
	SetTitleElement(o,title);
}
function SetTitleElement(o,title){
	if (o!=null){o.title=title;}
}
function SetDisabled(id, disabled) {
	var o = GetElement(id);
	SetDisabledElement(o, disabled);
}
function SetDisabledElement(o, disabled) {
	if (o != null) { o.disabled = disabled; }
}
function SetChecked(id, checked) {
	var o = GetElement(id);
	SetCheckedElement(o, checked);
}
function SetCheckedElement(o, checked) {
	if (o != null) { o.checked = checked; }
}
function appendClassElement(o,strClass){
	if (o!=null){
		var p=RegExp("\\b"+strClass+"\\b");
		if (!o.className.match(p)){
			o.className+=' '+strClass;
		}
	}
}
function appendClass(id,strClass){
	var o=GetElement(id);
	appendClassElement(o,strClass);
}
function removeClassElement(o, strClass){
	if (o!=null){
		var p=RegExp("\\b[ \\t]*"+strClass+"\\b", "g");
		o.className=o.className.replace(p, '');
	}
}
function removeClass(id,strClass){
	var o=GetElement(id);
	removeClassElement(o,strClass);
}
function toggleClassElement(o,strClassA,strClassB){
	if (o != null) {
		var pA=RegExp("\\b"+strClassA+"\\b");
		var pB=RegExp("\\b"+strClassB+"\\b");
		if (o.className.match(pA)){
			o.className=o.className.replace(pA,strClassB);
		}
		else {
			o.className=o.className.replace(pB,strClassA);
		}
	}
}
function toggleClass(id,strClassA,strClassB){
	var o=GetElement(id);
	toggleClassElement(o,strClassA,strClassB);
}
function ShowDivAdd(id,hideIds){
	var arrShowIds=id.split(",");
	var objElement;
	var blnPrevShown=false;
	var blnLastShown=false;
	for(var i=0;i<arrShowIds.length;i++){
		if(arrShowIds[i]!=""){
			objElement=document.getElementById(arrShowIds[i]);
			if(objElement!=null){
				if(objElement.style.display==""){
					blnPrevShown=true;
				}
				else if(blnPrevShown){
					objElement.style.display="";
					if(i==arrShowIds.length-1){blnLastShown=true;}
					break;
				}
			}
		}
	}
	if(blnLastShown){ //only hide if the last item has been shown
		ShowDiv("",hideIds);
	}
}

var gblnAbandonPopUp=true;
var gblnInvokeAbandon=false;
var gstrConfNum= "";
var gstrLangCode="";

function PurchaseAbandon(){
//alert(gblnAbandonPopUp+" | "+window.location.href);
if(gblnAbandonPopUp & gblnInvokeAbandon){
	var strSID="";
	if(document.forms[0].hdnSID){
		strSID=document.forms[0].hdnSID.value;
	}
	if (gstrLangCode!="es" && gstrLangCode!="de-DE" && gstrLangCode!="ja-JP" && gstrLangCode!="zh-CN" && gstrLangCode!="fr" && gstrLangCode!="pt" && gstrLangCode!="en-US"){gstrLangCode="en-US";}
	var strURL="/web/"+gstrLangCode+"/apps/booking/flight/call.aspx?SID="+strSID+"&ConfNum="+gstrConfNum+"&LangCode="+gstrLangCode;
	window.open(strURL,"CallCO","toolbar=0,status=0,menubar=0,location=0,scrollbars=0,resizable=1,width=500,height=300,top=50,left=50");
	}
}

function DisableAbandonPopUp(objActiveItem) {
   if (objActiveItem!=null && !(/(Safari)/.test(navigator.userAgent))){
			//alert(objActiveItem.tagName);
			//alert(objActiveItem.attributes);
			if(objActiveItem.tagName=='A'){
				var strItemID=objActiveItem.getAttribute("id")||"";
				if(strItemID.indexOf("Header") > 0 || strItemID.indexOf("Footer") > 0) {
					gblnAbandonPopUp=true;
				}
				else{
					gblnAbandonPopUp=false;
				}
			}
			else if(objActiveItem.tagName=='INPUT'){
				var strItemID = objActiveItem.getAttribute("id") || "";
				var strActiveElement = document.getElementById(strItemID) || "";
				//TD#17072 added check for "strItemID.indexOf("Btn") > 0" with a capital "B"
				//QC 19748 added check for radio button to disable popup
				if ((strItemID.indexOf("button") > 0 || strItemID.indexOf("btn") > 0 || strItemID.indexOf("Btn") > 0 || strItemID.indexOf("Button") > 0
					|| strActiveElement.type=="radio")) {
					gblnAbandonPopUp=false;
				}
				else{
					gblnAbandonPopUp=true;
				}
			}
			else{
				gblnAbandonPopUp=false;
			}
	}
	else
	{
		//alert("check for firefox any version and disable popup.");
		//TD#14478
		if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)){ //test for Firefox
			var ffversion=new Number(RegExp.$1) //grab version
			if (ffversion >= 1) //disable all firefox versions
			{
				gblnAbandonPopUp=false;
			}
			else {
				gblnAbandonPopUp=true;
			}
		} else {
		gblnAbandonPopUp=false; //mainly to disable popup in safari browser.
		}
	}
}

function AllowAbandonScript(strConfNum,strLangCode){
	gblnInvokeAbandon=true;
	gstrConfNum=strConfNum;
	gstrLangCode=strLangCode;
	//TD13945 - don't do the eStara pop up for languages where we don't have this translated
	if(strLangCode=="ja-JP"){
		gblnInvokeAbandon=false;
	}
}

function ShowAccountHistoryDetail(strCountrLogId,strLogID,strSrcTable,strDiv,sessionId){
	if (window.document.all['div'+strDiv+strCountrLogId].style.display=="inline"){
		window.document.all['div'+strDiv+strCountrLogId].style.display="none";
	}
	else{
		//if (window.document.all['txt'+strDiv+strLogID].value!="loaded"){	// if the IFrame has already been loaded then don't reset it's src property
			var strSrc='accountHistoryDetail.aspx?SrcTable='+strSrcTable+'&LogID='+strLogID+'&SID='+sessionId;
			window.document.all['iframe'+strDiv+strCountrLogId].src=strSrc;
			//window.document.all['txt'+strDiv+strLogID].value="loaded";
		//}
		window.document.all['div'+strDiv+strCountrLogId].style.display="inline";
	}
}

function ShowPreviewSiteMembersDetail(strCustomerID,strDiv,strSID){
	if (window.document.all['div'+strDiv+strCustomerID].style.display=="inline")
	{
		window.document.all['div'+strDiv+strCustomerID].style.display="none";
	}
	else
	{
		var strSrc='previewMembersDetail.aspx?CustomerID='+strCustomerID+'&SID='+strSID;
		window.document.all['iframe'+strDiv+strCustomerID].src=strSrc;

		window.document.all['div'+strDiv+strCustomerID].style.display="inline";
	}
}

function ShowDivByValue(objItem,arrValues,arrShowIds,arrHideIds){
	for(var i=0;i<arrValues.length;i++){
		if(objItem.value==arrValues[i]){
			ShowDiv(arrShowIds[i],arrHideIds[i]);
		}
	}
}
function SetValue(objItem,id,startIndex,endIndex,value){
	startIndex=startIndex-0+1;
	for(var i=startIndex;i < endIndex;i++){
		if(document.getElementById(ChangeValue(id,'#',i))!=null){
			document.getElementById(ChangeValue(id,'#',i)).value=value;
		}
	}
}

function SetDestValueWithSourceValue(sourceElementId,destElementId){
	var sourceElement=document.getElementById(sourceElementId);
	var destElement=document.getElementById(destElementId);
	if (sourceElement!=null && destElement!=null && sourceElement.value.length > 0 && (destElement.value.length==0 || !IsDatePattern(destElement.value)))
		destElement.value=sourceElement.value;
}

function GetData(){
	document.forms[0].hdnInfo.value='NO DATA COLLECTED';
	session_util.validate('hdnInfo');
}

function SetUniqueRadioButton(nameregex, current) {
	re = new RegExp(nameregex);
	for (i = 0; i < document.forms[0].elements.length; i++) {
		elm = document.forms[0].elements[i]
		if (elm.type == 'radio') {
			if (re.test(elm.name)) {
					elm.checked = false;
			}
		}
	}
	current.checked = true;
}

//function to toggle display of Reward Travel item in the dropdown list.
var marrListItems=new Array();
function SetItemByValue(objItem,arrValues,listId,arrIdValues,removeItem){

	var checkList=false;
	var arrItemExists=false;
	if(arrValues==''){
		checkList=true;
	}
	else{
		arrValues=arrValues.split(",");
		for(var i=0;i<arrValues.length;i++){
			if(objItem.value==arrValues[i]){
				checkList=true;
			}
		}
	}
	arrIdValues=arrIdValues.split(",");

	if(checkList){
		var objElement=document.getElementById(listId);
		if(objElement!=null){
			if(removeItem){
				for(var x=0;x<objElement.options.length;x++){
					for(var y=0;y<arrIdValues.length;y++){
						arrItemExists=false
						if(objElement.options[x].value==arrIdValues[y]){
							for(var z=0;z<marrListItems.length;z++){
								if(marrListItems[z].value==objElement.options[x].value){
									arrItemExists=true;
								}
							}
							if(!arrItemExists)marrListItems[marrListItems.length]=objElement.options[x];
							objElement.options[x]=null;
							x=0;//list has been modified so you have to start at the beginning again
							objElement.options.selectedIndex=0;
						}
					}
				}
			}
			else{
				for(var x=0;x<marrListItems.length;x++){
					for(var y=0;y<arrIdValues.length;y++){
						if(arrIdValues[y]==marrListItems[x].value){
							objElement.options.add(marrListItems[x]);
						}
					}
				}
			}
		}
	}
}
verbiageChange = function () {
	if (window.location.href.toLowerCase().indexOf("/apps/reservation/default.aspx") > -1
			|| window.location.href.toLowerCase().indexOf("/apps/reservation/import.aspx") > -1) {
		var oc = document.getElementById("ctl00_ContentInfo_FindRes_div1");
		if (oc) {
			oc.innerHTML = oc.innerHTML.replace("1-800-396-1751", "1-800-UNITED-1 (1-800-864-8331)")
			oc.innerHTML = oc.innerHTML.replace("1-800-296-1751", "1-800-UNITED-1 (1-800-864-8331)")
		}
	}
}
AddEventHandlerElement(window, 'load', verbiageChange);