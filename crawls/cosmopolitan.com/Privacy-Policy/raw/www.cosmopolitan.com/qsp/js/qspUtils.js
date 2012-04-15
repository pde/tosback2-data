// JavaScript Document 
var swfName = "qspviewer.swf";
//var swfPath = "/qsp/qspviewer.swf";
var jsReady = false;
var preview = false;
var qspId = -1;
var rPage = -1
var debug = false;
//var qspTarget;// = "mainSWFContainer";

function imQSP(senderName, recipientAIMScreenName, message){

	var pageUrl = location.href;
        recipientAIMScreenName = recipientAIMScreenName.replace(/ /g,'+');
	message = message + ' ' + pageUrl;
        message = message.replace(/ /g,'+');
        location.href='aim:goim?screenname='+recipientAIMScreenName+'&message='+message;
}

function emailQSP(senderName, recipientName, recipientEmail, message){
	var pageUrl = location.href;
        location.href='mailto:'+recipientEmail+'?subject=Check this out&body='+message+' '+pageUrl;
}



function thisMovie(movieName) {
	if (navigator.appName.indexOf("Microsoft") != -1) {
		return window[movieName];
	} else {
		return document[movieName];
	}
}


function isReady() {
	return jsReady;
}



function sendToActionScript(value) {
	//alert("Sending: "+ value);
	thisMovie(swfName).sendToActionScript(value);
}

function sendToJavaScript(value) {	
	//alert("SendToJS: "+ value);
	switch(value[0]){
		case "reload" : 
			if(value[1] == "clear") rPage = -1;
			if ((navigator.appName.indexOf("Microsoft") != -1) && (navigator.appVersion.indexOf("Win") != -1))
			{
				window.location.reload();
//				var targetElement = document.getElementById(value[2]);
//				renderPlayer(value[2], targetElement.style.width, targetElement.style.height);
			}
			else
			{
				window.location.reload();
			}
			break;
		case "imQsp" : imQSP(value[1], value[2], value[3]); break;
		case "emailQsp" : emailQSP(value[1], value[2], value[3], value[4]); break;
		case "getUrl" : sendToActionScript(window.location); break;
		case "refreshAds" : refreshAds(); break;
	}
}


function loadSwfs(width, height){
	try{
		if(width == null || height == null) {
			width = "100%";
			height = "100%";
		}
		loadQSP("mainSWFContainer", width, height);
	} catch(e){alert("loadSwfs: "+ e);}
}



function QSP(rPageP, swfNameP, width, height){
	try{
		var qspTarget = "qspSwfContainer"+Math.floor(Math.random()*1000);
		
		var divTag = "<div id='"+ qspTarget +"' style='width:"+width+";height:"+height+";border:0px'\"></div>";
		document.write(divTag);
		rPage = rPageP;
		swfName	= swfNameP;
		loadQSP(qspTarget, width, height);
	} catch(e){alert("QSP: "+ e);}
}

function loadQSP(qspTarget, width, height){
	var targetElement = document.getElementById(qspTarget);
	if(targetElement == null)
		setTimeout("loadQSP("+qspTarget+")",100);
	else
		renderPlayer(qspTarget, width, height);
}

function renderPlayer(qspTarget, width, height){
	try{
		var so = new SWFObject(swfName, "qspSwfId", width, height, "9", "#ffffff");
		so.addParam("quality", "high");
		so.addParam("allowScriptAccess", "always");
	//	so.addParam("scale", "exactfit");
		//so.addParam("bgcolor", document.bgColor);
		so.addParam("wmode", "transparent");
		if ( preview )
			so.addVariable("preview", preview);
		if ( debug )
			so.addVariable("debug", debug);
		so.addVariable("rPage", rPage);
		so.addVariable("qspTarget", qspTarget);
		so.addVariable("appWidth", width);
		so.addVariable("appHeight", height);
		so.useExpressInstall('/cm/shared/ria/swfObject1.5/expressinstall.swf');
//		so.setAttribute("installPlayerHTML", "<div style='font-size:11;color:#000000;font-family:verdana,arial'>To view this Hearst content you need the latest version of the Adobe Flash Player. <font color='#005FA9'><a href='http://www.adobe.com/go/getflashplayer'>Download</a></font> the free Macromedia Flash Player now.</div>");
		so.write(qspTarget);
		jsReady = true;
	}
	catch(e){alert("loadPlayer: "+ swfName +" : "+ e);}
}


function PageQuery(q) {
	if(q.length > 1) 
		this.q = q.substring(1, q.length);
	else 
		this.q = null;
	
	this.keyValuePairs = new Array();
	
	if(q) {
		for(var i=0; i < this.q.split("&").length; i++) {
			this.keyValuePairs[i] = this.q.split("&")[i];
		}
	}

	this.getKeyValuePairs = function() { return this.keyValuePairs; }
	
	this.getValue = function(s) {
		for(var j=0; j < this.keyValuePairs.length; j++) {
			if(this.keyValuePairs[j].split("=")[0] == s)
				return this.keyValuePairs[j].split("=")[1];
		}
		
		return false;
	}
	
	this.getParameters = function() {
		var a = new Array(this.getLength());
		for(var j=0; j < this.keyValuePairs.length; j++) {
			a[j] = this.keyValuePairs[j].split("=")[0];
		}
		return a;
	}
	
	this.getLength = function() { return this.keyValuePairs.length; }
}



function queryString(key){
	var page = new PageQuery(window.location.search);
	return unescape(page.getValue(key));
}

function getValue(key){
	if(queryString(key)=='false')
	{
		return null
	}else{
		return queryString(key);
	}
}

/**
 * SWFObject v1.5: Flash Player detection and embed - http://blog.deconcept.com/swfobject/
 *
 * SWFObject is (c) 2007 Geoff Stearns and is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
if(typeof deconcept=="undefined"){var deconcept=new Object();}if(typeof deconcept.util=="undefined"){deconcept.util=new Object();}if(typeof deconcept.SWFObjectUtil=="undefined"){deconcept.SWFObjectUtil=new Object();}deconcept.SWFObject=function(_1,id,w,h,_5,c,_7,_8,_9,_a){if(!document.getElementById){return;}this.DETECT_KEY=_a?_a:"detectflash";this.skipDetect=deconcept.util.getRequestParameter(this.DETECT_KEY);this.params=new Object();this.variables=new Object();this.attributes=new Array();if(_1){this.setAttribute("swf",_1);}if(id){this.setAttribute("id",id);}if(w){this.setAttribute("width",w);}if(h){this.setAttribute("height",h);}if(_5){this.setAttribute("version",new deconcept.PlayerVersion(_5.toString().split(".")));}this.installedVer=deconcept.SWFObjectUtil.getPlayerVersion();if(!window.opera&&document.all&&this.installedVer.major>7){deconcept.SWFObject.doPrepUnload=true;}if(c){this.addParam("bgcolor",c);}var q=_7?_7:"high";this.addParam("quality",q);this.setAttribute("useExpressInstall",false);this.setAttribute("doExpressInstall",false);var _c=(_8)?_8:window.location;this.setAttribute("xiRedirectUrl",_c);this.setAttribute("redirectUrl","");if(_9){this.setAttribute("redirectUrl",_9);}};deconcept.SWFObject.prototype={useExpressInstall:function(_d){this.xiSWFPath=!_d?"expressinstall.swf":_d;this.setAttribute("useExpressInstall",true);},setAttribute:function(_e,_f){this.attributes[_e]=_f;},getAttribute:function(_10){return this.attributes[_10];},addParam:function(_11,_12){this.params[_11]=_12;},getParams:function(){return this.params;},addVariable:function(_13,_14){this.variables[_13]=_14;},getVariable:function(_15){return this.variables[_15];},getVariables:function(){return this.variables;},getVariablePairs:function(){var _16=new Array();var key;var _18=this.getVariables();for(key in _18){_16[_16.length]=key+"="+_18[key];}return _16;},getSWFHTML:function(){var _19="";if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","PlugIn");this.setAttribute("swf",this.xiSWFPath);}_19="<embed type=\"application/x-shockwave-flash\" src=\""+this.getAttribute("swf")+"\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\"";_19+=" id=\""+this.getAttribute("id")+"\" name=\""+this.getAttribute("id")+"\" ";var _1a=this.getParams();for(var key in _1a){_19+=[key]+"=\""+_1a[key]+"\" ";}var _1c=this.getVariablePairs().join("&");if(_1c.length>0){_19+="flashvars=\""+_1c+"\"";}_19+="/>";}else{if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","ActiveX");this.setAttribute("swf",this.xiSWFPath);}_19="<object id=\""+this.getAttribute("id")+"\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\">";_19+="<param name=\"movie\" value=\""+this.getAttribute("swf")+"\" />";var _1d=this.getParams();for(var key in _1d){_19+="<param name=\""+key+"\" value=\""+_1d[key]+"\" />";}var _1f=this.getVariablePairs().join("&");if(_1f.length>0){_19+="<param name=\"flashvars\" value=\""+_1f+"\" />";}_19+="</object>";}return _19;},write:function(_20){if(this.getAttribute("useExpressInstall")){var _21=new deconcept.PlayerVersion([6,0,65]);if(this.installedVer.versionIsValid(_21)&&!this.installedVer.versionIsValid(this.getAttribute("version"))){this.setAttribute("doExpressInstall",true);this.addVariable("MMredirectURL",escape(this.getAttribute("xiRedirectUrl")));document.title=document.title.slice(0,47)+" - Flash Player Installation";this.addVariable("MMdoctitle",document.title);}}if(this.skipDetect||this.getAttribute("doExpressInstall")||this.installedVer.versionIsValid(this.getAttribute("version"))){var n=(typeof _20=="string")?document.getElementById(_20):_20;n.innerHTML=this.getSWFHTML();return true;}else{if(this.getAttribute("redirectUrl")!=""){document.location.replace(this.getAttribute("redirectUrl"));}}return false;}};deconcept.SWFObjectUtil.getPlayerVersion=function(){var _23=new deconcept.PlayerVersion([0,0,0]);if(navigator.plugins&&navigator.mimeTypes.length){var x=navigator.plugins["Shockwave Flash"];if(x&&x.description){_23=new deconcept.PlayerVersion(x.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split("."));}}else{if(navigator.userAgent&&navigator.userAgent.indexOf("Windows CE")>=0){var axo=1;var _26=3;while(axo){try{_26++;axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+_26);_23=new deconcept.PlayerVersion([_26,0,0]);}catch(e){axo=null;}}}else{try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");}catch(e){try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");_23=new deconcept.PlayerVersion([6,0,21]);axo.AllowScriptAccess="always";}catch(e){if(_23.major==6){return _23;}}try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");}catch(e){}}if(axo!=null){_23=new deconcept.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","));}}}return _23;};deconcept.PlayerVersion=function(_29){this.major=_29[0]!=null?parseInt(_29[0]):0;this.minor=_29[1]!=null?parseInt(_29[1]):0;this.rev=_29[2]!=null?parseInt(_29[2]):0;};deconcept.PlayerVersion.prototype.versionIsValid=function(fv){if(this.major<fv.major){return false;}if(this.major>fv.major){return true;}if(this.minor<fv.minor){return false;}if(this.minor>fv.minor){return true;}if(this.rev<fv.rev){return false;}return true;};deconcept.util={getRequestParameter:function(_2b){var q=document.location.search||document.location.hash;if(_2b==null){return q;}if(q){var _2d=q.substring(1).split("&");for(var i=0;i<_2d.length;i++){if(_2d[i].substring(0,_2d[i].indexOf("="))==_2b){return _2d[i].substring((_2d[i].indexOf("=")+1));}}}return "";}};deconcept.SWFObjectUtil.cleanupSWFs=function(){var _2f=document.getElementsByTagName("OBJECT");for(var i=_2f.length-1;i>=0;i--){_2f[i].style.display="none";for(var x in _2f[i]){if(typeof _2f[i][x]=="function"){_2f[i][x]=function(){};}}}};if(deconcept.SWFObject.doPrepUnload){if(!deconcept.unloadSet){deconcept.SWFObjectUtil.prepUnload=function(){__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){};window.attachEvent("onunload",deconcept.SWFObjectUtil.cleanupSWFs);};window.attachEvent("onbeforeunload",deconcept.SWFObjectUtil.prepUnload);deconcept.unloadSet=true;}}if(!document.getElementById&&document.all){document.getElementById=function(id){return document.all[id];};}var getQueryParamValue=deconcept.util.getRequestParameter;var FlashObject=deconcept.SWFObject;var SWFObject=deconcept.SWFObject;