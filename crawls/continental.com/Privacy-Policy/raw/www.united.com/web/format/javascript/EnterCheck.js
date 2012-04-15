<!--
function keyCheck(objEvent){
	/*This checks to see if the what key has been
	pressed on the user's keyboard. The ascii value
	of the key that has been pressed is returned 
	by the function*/
	var intKey;
	if(objEvent.which == null){intKey = event.keyCode;}
	else{intKey = evnt.which;}
	return intKey;
}

function Enter(objEvent){if(keyCheck(objEvent) == 13){return true;}else{return false;}}

function EnterCheck(objEvent){if(Enter(objEvent) == true){SubmitForm(objEvent);}}

function SubmitForm(objEvent){}

var WaitScreen=(function (){
	// Private properties
	var _opts,_waitscreenEnabled,_htmlElement,_bodyElement,_elementsLoaded=false;
	// Private methods
	function _extend(o,e){
		var r={};
		for (var k in (o||{})) r[k]=o[k];
		for (var k in (e||{})) r[k]=e[k];
		return r;
	}
	function _loadElements(opts){
		var objHtmlElement=document.getElementsByTagName("HTML");
		if(objHtmlElement[0]!=null){
			_htmlElement=objHtmlElement[0];
		}
		var objBodyElement=document.getElementsByTagName("BODY");
		if(objBodyElement[0]!=null){
			_bodyElement=objBodyElement[0];
		}
		var wsElement=GetElement(opts.waitElementID);
		if(wsElement!=null){
			if(DetectFlashVer(6))wsElement.innerHTML='<div class="wsFlash"><object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="https://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="550" height="500" id="wsObject" align="middle"><param name="allowScriptAccess" value="sameDomain" /><param name="movie" value="/web/format/wait/wsua201107.swf" /><param name="FlashVars" value="'+opts.flashVars+'" /><param name="quality" value="high" /><param name="bgcolor" value="#000099" /><embed id="wsEmbed" src="/web/format/wait/wsua201107.swf" FlashVars="'+opts.flashVars+'" quality="high" bgcolor="#000099" width="550" height="500" name="wait" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></object></div>';
			else wsElement.innerHTML='<img class="wsLogoUA" src="/web/format/img/wait/waitlogo201107.gif" alt="United Airlines"/><img class="wsSpinner" src="/web/format/img/wait/waitspinner.gif" alt="One Moment Please"/><div><img class="wsMessage" src="/web/'+ opts.langCode +'/img/wait/waitmessage.gif" alt="Check in for your flight at united.com."/><img class="wsMoment" src="/web/'+opts.langCode+'/img/wait/waitonemoment.gif" alt="One Moment Please"/></div>';
		}
		wsElement=null;
		_elementsLoaded=true;
	}
	return {
		// Public properties
		defaults:{
			waitElementID:"ctl00_divWS",
			waitActiveClass:"waitscreen",
			langCode:"en-US",
			flashVars:"strQuoteString=Manage%2c+change+and+view+your+reservations+on+united.com%7enmChoose+your+seat%2c+print+your+boarding+pass+and+check+in+at+united.com&strSecondaryMSGs=+%7enm+&oneMoment=One+Moment+Please...",
			postPredicate:function (){return !Sys.WebForms.PageRequestManager.getInstance().get_isInAsyncPostBack()},
			enabled:true
		},
		// Public methods
		initialize:function (options){
			if(!document.getElementById||!document.getElementsByTagName){return;}
			_opts=_extend(WaitScreen.defaults,options);
			_waitscreenEnabled=_opts.enabled;
		},
		enable:function (){_waitscreenEnabled=true;},
		disable:function (){_waitscreenEnabled=false;},
		show:function (){
			if(_waitscreenEnabled){
				if(!_elementsLoaded)_loadElements(_opts);
				if(_htmlElement)appendClassElement(_htmlElement,_opts.waitActiveClass);
				if(_bodyElement)appendClassElement(_bodyElement,_opts.waitActiveClass);
			}
		},
		showOnPost:function (){
			if(_opts.postPredicate()){
				WaitScreen.show();
			}
		},
		hide:function (){
			if(!_elementsLoaded)_loadElements();
			if(_htmlElement)removeClassElement(_htmlElement,_opts.waitActiveClass);
			if(_bodyElement)removeClassElement(_bodyElement,_opts.waitActiveClass)
		}
	};
})();

var objReq;

function loadXMLDoc(url){
// branch for native XMLHttpRequest object
if(window.XMLHttpRequest){
	objReq = new XMLHttpRequest();
	objReq.onreadystatechange = processReqChange;
	objReq.open("GET", url, true);
	objReq.send(null);
// branch for IE/Windows ActiveX version
}else if (window.ActiveXObject) {
	objReq = new ActiveXObject("Microsoft.XMLHTTP");
	if (objReq){
		objReq.onreadystatechange = processReqChange;
		objReq.open("GET", url, true);
		objReq.send();
	}
}
}
function loadXMLDoc(url, returnText){
// branch for native XMLHttpRequest object
if(window.XMLHttpRequest){
	objReq = new XMLHttpRequest();
	objReq.onreadystatechange = processReqChange(returnText);
	objReq.open("GET", url, true);
	objReq.send(null);
// branch for IE/Windows ActiveX version
}else if (window.ActiveXObject) {
	objReq = new ActiveXObject("Microsoft.XMLHTTP");
	if (objReq){
		objReq.onreadystatechange = processReqChange(returnText);
		objReq.open("GET", url, true);
		objReq.send();
	}
}
}

function processReqChange(){
// only if req shows "complete"
if(objReq.readyState == 4){
	// only if "OK"
	if(objReq.status == 200){
		//alert(objReq.responseText);
		document.body.innerHTML = objReq.responseText;
	}
}
}

function processReqChange(returnText){
// only if req shows "complete"
if(objReq.readyState == 4){
	// only if "OK"
	if(objReq.status == 200){
		//alert(objReq.responseText);
		returnText = objReq.responseText;
	}
}
}
//-->