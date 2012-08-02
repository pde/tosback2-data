//******************************************************************************
// Get User Agent
var ua		= navigator.userAgent;
var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
var isOpera	= /opera [56789]|opera\/[56789]/i.test(ua);
var isIE = !isOpera && /msie [56789]/i.test(ua);
var isIE6 = isIE && /msie 6/i.test(ua);
var isIE7 = isIE && /msie 7/i.test(ua);
var isMoz		= !isOpera && /mozilla\/[56789]/i.test(ua);
var isSafari = /safari/i.test(ua);

/****************************************************************************************
 * SWFObject v1.5: Flash Player detection and embed - http://blog.deconcept.com/swfobject/
 *
 * SWFObject is (c) 2007 Geoff Stearns and is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
if(typeof deconcept=="undefined"){
	var deconcept=new Object();
}
if(typeof deconcept.util=="undefined"){
	deconcept.util=new Object();
}
if(typeof deconcept.SWFObjectUtil=="undefined"){
	deconcept.SWFObjectUtil=new Object();
}
deconcept.SWFObject=function(_1,id,w,h,_5,c,_7,_8,_9,_a){
	if(!document.getElementById){return;}this.DETECT_KEY=_a?_a:"detectflash";this.skipDetect=deconcept.util.getRequestParameter(this.DETECT_KEY);this.params=new Object();this.variables=new Object();this.attributes=new Array();if(_1){this.setAttribute("swf",_1);}if(id){this.setAttribute("id",id);}if(w){this.setAttribute("width",w);}if(h){this.setAttribute("height",h);}if(_5){this.setAttribute("version",new deconcept.PlayerVersion(_5.toString().split(".")));}this.installedVer=deconcept.SWFObjectUtil.getPlayerVersion();if(!window.opera&&document.all&&this.installedVer.major>7){deconcept.SWFObject.doPrepUnload=true;}if(c){this.addParam("bgcolor",c);}var q=_7?_7:"high";this.addParam("quality",q);this.setAttribute("useExpressInstall",false);this.setAttribute("doExpressInstall",false);var _c=(_8)?_8:window.location;this.setAttribute("xiRedirectUrl",_c);this.setAttribute("redirectUrl","");if(_9){this.setAttribute("redirectUrl",_9);}
};
deconcept.SWFObject.prototype={
		useExpressInstall:function(_d){this.xiSWFPath=!_d?"expressinstall.swf":_d;this.setAttribute("useExpressInstall",true);},
			setAttribute:function(_e,_f){this.attributes[_e]=_f;},
			getAttribute:function(_10){return this.attributes[_10];},
			addParam:function(_11,_12){this.params[_11]=_12;},
			getParams:function(){return this.params;},
			addVariable:function(_13,_14){this.variables[_13]=_14;},
			getVariable:function(_15){return this.variables[_15];},
			getVariables:function(){return this.variables;},
			getVariablePairs:function(){var _16=new Array();var key;var _18=this.getVariables();for(key in _18){_16[_16.length]=key+"="+_18[key];}return _16;},
			getSWFHTML:function(){
				var _19="";
					if(this.getAttribute("doExpressInstall")){
						this.addVariable("MMplayerType","ActiveX");
						this.setAttribute("swf",this.xiSWFPath);
					}
					_19="<object id=\""+this.getAttribute("id")+"\"";
					
					if( isIE ){
						_19+=" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\"";
					}else{
						_19+=" data=\""+this.getAttribute("swf")+"\" ";
					}
					_19+=" type=\"application/x-shockwave-flash\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\">";
					_19+="<param name=\"movie\" value=\""+this.getAttribute("swf")+"\" />";
					var _1d=this.getParams();
					for(var key in _1d){
						_19+="<param name=\""+key+"\" value=\""+_1d[key]+"\" />";
					}
					var _1f=this.getVariablePairs().join("&");
					if(_1f.length>0){
						_19+="<param name=\"flashvars\" value=\""+_1f+"\" />";
					}
					_19+="</object>";
				return _19;
			},
			write:function(_20){
				if(this.getAttribute("useExpressInstall")){
					var _21=new deconcept.PlayerVersion([6,0,65]);
					if(this.installedVer.versionIsValid(_21)&&!this.installedVer.versionIsValid(this.getAttribute("version"))){
						this.setAttribute("doExpressInstall",true);
						this.addVariable("MMredirectURL",escape(this.getAttribute("xiRedirectUrl")));
						document.title=document.title.slice(0,47)+" - Flash Player Installation";
						this.addVariable("MMdoctitle",document.title);
					}
				}
				if(this.skipDetect||this.getAttribute("doExpressInstall")||this.installedVer.versionIsValid(this.getAttribute("version"))){
					var n=(typeof _20=="string")?document.getElementById(_20):_20;
					n.innerHTML=this.getSWFHTML();
					return true;
				}
				else{
					if(this.getAttribute("redirectUrl")!=""){
						document.location.replace(this.getAttribute("redirectUrl"));
					}
				}
				return false;
			}
			};
			deconcept.SWFObjectUtil.getPlayerVersion=function(){
				var _23=new deconcept.PlayerVersion([0,0,0]);if(navigator.plugins&&navigator.mimeTypes.length){var x=navigator.plugins["Shockwave Flash"];if(x&&x.description){_23=new deconcept.PlayerVersion(x.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split("."));}}else{if(navigator.userAgent&&navigator.userAgent.indexOf("Windows CE")>=0){var axo=1;var _26=3;while(axo){try{_26++;axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+_26);_23=new deconcept.PlayerVersion([_26,0,0]);}catch(e){axo=null;}}}else{try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");}catch(e){try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");_23=new deconcept.PlayerVersion([6,0,21]);axo.AllowScriptAccess="always";}catch(e){if(_23.major==6){return _23;}}try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");}catch(e){}}if(axo!=null){_23=new deconcept.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","));}}}return _23;
			};
			deconcept.PlayerVersion=function(_29){
				this.major=_29[0]!=null?parseInt(_29[0]):0;this.minor=_29[1]!=null?parseInt(_29[1]):0;this.rev=_29[2]!=null?parseInt(_29[2]):0;
			};
			deconcept.PlayerVersion.prototype.versionIsValid=function(fv){
				if(this.major<fv.major){return false;}if(this.major>fv.major){return true;}if(this.minor<fv.minor){return false;}if(this.minor>fv.minor){return true;}if(this.rev<fv.rev){return false;}return true;
			};
			deconcept.util={
				getRequestParameter:function(_2b){var q=document.location.search||document.location.hash;if(_2b==null){return q;}if(q){var _2d=q.substring(1).split("&");for(var i=0;i<_2d.length;i++){if(_2d[i].substring(0,_2d[i].indexOf("="))==_2b){return _2d[i].substring((_2d[i].indexOf("=")+1));}}}return "";}
			};
			deconcept.SWFObjectUtil.cleanupSWFs=function(){
				var _2f=document.getElementsByTagName("OBJECT");for(var i=_2f.length-1;i>=0;i--){_2f[i].style.display="none";for(var x in _2f[i]){if(typeof _2f[i][x]=="function"){_2f[i][x]=function(){};}}}
			};
			if(deconcept.SWFObject.doPrepUnload){
				if(!deconcept.unloadSet){
					deconcept.SWFObjectUtil.prepUnload=function(){
						__flash_unloadHandler=function(){};
						__flash_savedUnloadHandler=function(){};
						window.attachEvent("onunload",deconcept.SWFObjectUtil.cleanupSWFs);
					};
					window.attachEvent("onbeforeunload",deconcept.SWFObjectUtil.prepUnload);
					deconcept.unloadSet=true;
				}
			}
			if(!document.getElementById&&document.all){
				document.getElementById=function(id){return document.all[id];};
			}
			var getQueryParamValue=deconcept.util.getRequestParameter;
			var FlashObject=deconcept.SWFObject;
			var SWFObject=deconcept.SWFObject;

// -- DEBUT Fichier AC_OETags.js

// Flash Player Version Detection - Rev 1.5
// Detect Client Browser type
// Copyright(c) 2005-2006 Adobe Macromedia Software, LLC. All rights reserved.


function ControlVersion()
{
	var version;
	var axo;
	var e;

	// NOTE : new ActiveXObject(strFoo) throws an exception if strFoo isn't in the registry

	try {
		// version will be set for 7.X or greater players
		axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
		version = axo.GetVariable("$version");
	} catch (e) {
	}

	if (!version)
	{
		try {
			// version will be set for 6.X players only
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");

			// installed player is some revision of 6.0
			// GetVariable("$version") crashes for versions 6.0.22 through 6.0.29,
			// so we have to be careful.

			// default to the first public version
			version = "WIN 6,0,21,0";

			// throws if AllowScripAccess does not exist (introduced in 6.0r47)
			axo.AllowScriptAccess = "always";

			// safe to call for 6.0r47 or greater
			version = axo.GetVariable("$version");

		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 4.X or 5.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
			version = axo.GetVariable("$version");
		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 3.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
			version = "WIN 3,0,18,0";
		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 2.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			version = "WIN 2,0,0,11";
		} catch (e) {
			version = -1;
		}
	}

	return version;
}

// JavaScript helper required to detect Flash Player PlugIn version information
function GetSwfVer(){
	// NS/Opera version >= 3 check for Flash plugin in plugin array
	var flashVer = -1;

	if (navigator.plugins != null && navigator.plugins.length > 0) {
		if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
			var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
			var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;
			var descArray = flashDescription.split(" ");
			var tempArrayMajor = descArray[2].split(".");
			var versionMajor = tempArrayMajor[0];
			var versionMinor = tempArrayMajor[1];
			if ( descArray[3] != "" ) {
				tempArrayMinor = descArray[3].split("r");
			} else {
				tempArrayMinor = descArray[4].split("r");
			}
			var versionRevision = tempArrayMinor[1] > 0 ? tempArrayMinor[1] : 0;
			var flashVer = versionMajor + "." + versionMinor + "." + versionRevision;
		}
	}
	// MSN/WebTV 2.6 supports Flash 4
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) flashVer = 4;
	// WebTV 2.5 supports Flash 3
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) flashVer = 3;
	// older WebTV supports Flash 2
	else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 2;
	else if ( isIE && isWin && !isOpera ) {
		flashVer = ControlVersion();
	}
	return flashVer;
}

// When called with reqMajorVer, reqMinorVer, reqRevision returns true if that version or greater is available
function DetectFlashVer(reqMajorVer, reqMinorVer, reqRevision)
{
	versionStr = GetSwfVer();
	if (versionStr == -1 ) {
		return false;
	} else if (versionStr != 0) {
		if(isIE && isWin && !isOpera) {
			// Given "WIN 2,0,0,11"
			tempArray         = versionStr.split(" "); 	// ["WIN", "2,0,0,11"]
			tempString        = tempArray[1];			// "2,0,0,11"
			versionArray      = tempString.split(",");	// ['2', '0', '0', '11']
		} else {
			versionArray      = versionStr.split(".");
		}
		var versionMajor      = versionArray[0];
		var versionMinor      = versionArray[1];
		var versionRevision   = versionArray[2];

        	// is the major.revision >= requested major.revision AND the minor version >= requested minor
		if (versionMajor > parseFloat(reqMajorVer)) {
			return true;
		} else if (versionMajor == parseFloat(reqMajorVer)) {
			if (versionMinor > parseFloat(reqMinorVer))
				return true;
			else if (versionMinor == parseFloat(reqMinorVer)) {
				if (versionRevision >= parseFloat(reqRevision))
					return true;
			}
		}
		return false;
	}
}

function AC_AddExtension(src, ext)
{
  if (src.indexOf('?') != -1)
    return src.replace(/\?/, ext+'?');
  else
    return src + ext;
}

function AC_Generateobj(objAttrs, params, embedAttrs)
{
    var str = '';
    if (isIE && isWin && !isOpera)
    {
  		str += '<object ';
  		for (var i in objAttrs)
  			str += i + '="' + objAttrs[i] + '" ';
  		for (var i in params)
  			str += '><param name="' + i + '" value="' + params[i] + '" /> ';
  		str += '></object>';
    } else {
  		str += '<embed ';
  		for (var i in embedAttrs)
  			str += i + '="' + embedAttrs[i] + '" ';
  		str += '> </embed>';
    }

    document.write(str);
}

function AC_FL_RunContent(){
  var ret =
    AC_GetArgs
    (  arguments, ".swf", "movie", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
     , "application/x-shockwave-flash"
    );
  AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs);
}

function AC_GetArgs(args, ext, srcParamName, classid, mimeType){
  var ret = new Object();
  ret.embedAttrs = new Object();
  ret.params = new Object();
  ret.objAttrs = new Object();
  for (var i=0; i < args.length; i=i+2){
    var currArg = args[i].toLowerCase();

    switch (currArg){
      case "classid":
        break;
      case "pluginspage":
        ret.embedAttrs[args[i]] = args[i+1];
        break;
      case "src":
      case "movie":
        args[i+1] = AC_AddExtension(args[i+1], ext);
        ret.embedAttrs["src"] = args[i+1];
        ret.params[srcParamName] = args[i+1];
        break;
      case "onafterupdate":
      case "onbeforeupdate":
      case "onblur":
      case "oncellchange":
      case "onclick":
      case "ondblClick":
      case "ondrag":
      case "ondragend":
      case "ondragenter":
      case "ondragleave":
      case "ondragover":
      case "ondrop":
      case "onfinish":
      case "onfocus":
      case "onhelp":
      case "onmousedown":
      case "onmouseup":
      case "onmouseover":
      case "onmousemove":
      case "onmouseout":
      case "onkeypress":
      case "onkeydown":
      case "onkeyup":
      case "onload":
      case "onlosecapture":
      case "onpropertychange":
      case "onreadystatechange":
      case "onrowsdelete":
      case "onrowenter":
      case "onrowexit":
      case "onrowsinserted":
      case "onstart":
      case "onscroll":
      case "onbeforeeditfocus":
      case "onactivate":
      case "onbeforedeactivate":
      case "ondeactivate":
      case "type":
      case "codebase":
      case "id":
        ret.objAttrs[args[i]] = args[i+1];
        break;
      case "width":
      case "height":
      case "align":
      case "vspace":
      case "hspace":
      case "class":
      case "title":
      case "accesskey":
      case "name":
      case "tabindex":
        ret.embedAttrs[args[i]] = ret.objAttrs[args[i]] = args[i+1];
        break;
      default:
        ret.embedAttrs[args[i]] = ret.params[args[i]] = args[i+1];
    }
  }
  ret.objAttrs["classid"] = classid;
  if (mimeType) ret.embedAttrs["type"] = mimeType;
  return ret;
}

// -- FIN Fichier AC_OETags.js

// -----------------------------------------------------------------------------
function detectFlash() {
  return DetectFlashVer(4, 0, 0);
}

var plugin = 0;
if (detectFlash()) {
	plugin = 1; 
}


/* ========================================================================================== */
// Détection plugin flash 
function MGFlashDetect(flashVer, divApp, dwidth, dheight) {
	var bDetectFlash = false;
	if (! DetectFlashVer(flashVer, 0, 0)) {	
		var dhtml = "<table><tr><td align='center' width='"+dwidth+"' height='"+dheight+"' bgcolor='#F0F0F0'><strong>";
		dhtml += "Nous vous invitons à télécharger la dernière version du plug-in Flash en cliquant sur ce <a href='http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash&promoid=BIOW' target='_new'>lien</a>."
		dhtml += "</strong></td></tr></table>";
		var oDiv = document.getElementById(divApp);
		if( oDiv ){
			oDiv.innerHTML = dhtml;
		}
		
		bDetectFlash = false;
	} else {
		bDetectFlash = true;
	}
	return bDetectFlash;
}	

/* ========================================================================================== */
// objet pjFlashObject
function pjFlashObject(pType, pCodePublicite, pLargeur, pHauteur, pIdImg, pTabParams, pTabVars) {
	this.type = pType;
	this.codePub = pCodePublicite;
 	this.largeur = pLargeur;
 	this.hauteur = pHauteur;
 	this.idImg = pIdImg;
 	this.tabParams = pTabParams;
 	this.tabVars = pTabVars;


	// chargement de la pub
	this.load = function() {
		var oDiv = document.getElementById(this.idImg);
		

		if (oDiv) {
			var nodeVRepli = document.getElementById("noscript_" + oDiv.id);
			if (nodeVRepli) {
				nodeVRepli.style.display = 'none';
			}				

			// code html
			if (this.type == "html") {
				oDiv.innerHTML = this.codePub;
			} else {
				// object flash
				if (this.type.indexOf("flash") > -1) {
					tabType = this.type.split("-");
					var flashVer = parseInt(tabType[1]);
		
					// version flash incorrect
					if (! DetectFlashVer(flashVer,0,0)) {	
						nodeVRepli.style.display = 'block';
					} else {
						var so = new SWFObject(this.codePub, 
				              	'id' + this.idImg,
				              	this.largeur, 
				              	this.hauteur, 
				              	flashVer, 
				              	"#FFFFFF");
						// XML Init :
						so.addParam("wmode", "transparent");
						so.addParam("PLAY" , "true");
						so.addParam("LOOP" , "true");
						so.addParam("QUALITY" , "autohigh");
						so.addParam("allowScriptAccess", "always");
						addParamOrVariableToPjFlashObject(so, this.tabParams, "param");
						addParamOrVariableToPjFlashObject(so, this.tabVars, "variable");
						so.write(this.idImg);								
					}
				}
			}
		}
	}

}

// ajout de paramètres ou de variables à un objet flash
function addParamOrVariableToPjFlashObject(pSo, pTabElems, pType) {
	if (pTabElems && pSo) {
		var tabElems = pTabElems.split(";");
		for(var i=0;i<tabElems.length;i++) {
			var elem = tabElems[i].split("=");
			if (pType == "param") {
				pSo.addParam(elem[0],elem[1]);
			}
			else if (pType == "variable") {
				pSo.addVariable(elem[0],elem[1]);
			}
		}
	}
}
