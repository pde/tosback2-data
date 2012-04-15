/*	sIFR (Scalable Inman Flash Replacement) Version 2.0 Release Candidate 2
	Copyright 2004 Mike Davidson, Shaun Inman, Tomas Jogin and Mark Wubben
	This software is licensed under the CC-GNU LGPL <http://creativecommons.org/licenses/LGPL/2.1/>
*/
var hasFlash = function(){
	var nRequiredVersion = 6;
	if(navigator.appVersion.indexOf("MSIE") != -1 && navigator.appVersion.indexOf("Windows") > -1){
		document.write('<script language="VBScript"\> \n');
		document.write('on error resume next \n');
		document.write('hasFlash = (IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash." & ' + nRequiredVersion + '))) \n');
		document.write('<'+'/script\> \n');
		/*	If executed, the VBScript above checks for Flash and sets the hasFlash variable.
			If VBScript is not supported it's value will still be undefined, so we'll run it though another test
			This will make sure even Opera identified as IE will be tested */
		if(window.hasFlash != null){
			return window.hasFlash;
		}
	}
	if(navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"] && navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin){
		var flashDescription = (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description;
		var flashVersion = parseInt(flashDescription.charAt(flashDescription.indexOf(".") - 1));
		return flashVersion >= nRequiredVersion;
	}
	return false;
}();
String.prototype.normalize = function(){
	return this.replace(/\s+/g, " ");
};
/* IE 5.0 does not support the push method, so here goes */
if(Array.prototype.push == null){
	Array.prototype.push = function(){
		for(var i = 0; i < arguments.length; i++){
			this[this.length] = arguments[i];
		}
		return this.length;
	};
}
/*	Implement function.apply for browsers which don't support it natively
	Courtesy of Aaron Boodman - http://youngpup.net */
if (!Function.prototype.apply){
	Function.prototype.apply = function(oScope, args) {
		var sarg = [];
		var rtrn, call;
		if (!oScope){oScope = window;}
		if (!args){args = [];}
		for (var i = 0; i < args.length; i++) {
			sarg[i] = "args["+i+"]";
		}
		call = "oScope.__applyTemp__(" + sarg.join(",") + ");";
		oScope.__applyTemp__ = this;
		rtrn = eval(call);
		oScope.__applyTemp__ = null;
		return rtrn;
	};
}
/*	The following code parses CSS selectors.
	This script however is not the right place to explain it,
	please visit the documentation for more information. */
var parseSelector = function(){
	var reParseSelector = /^([^#\.>\`]*)(#|\.|\>|\`)(.+)$/;
	function parseSelector(sSelector, oParentNode, sMode){
		sSelector = sSelector.replace(" ", "`");
		var selector = sSelector.match(reParseSelector);
		var node, listNodes, listSubNodes, subselector;
		var listReturn = [];
		if(selector == null){ selector = [sSelector, sSelector];}
		if(selector[1] == ""){ selector[1] = "*";}
		if(sMode == null){ sMode = "`";}
		if(oParentNode == null && (selector[2] == null || selector[2] != ">")){
			oParentNode = document;
		}
		switch(selector[2]){
			case "#":
				subselector = selector[3].match(reParseSelector);
				if(subselector == null){ subselector = [null, selector[3]];}
				node = 	document.getElementById(subselector[1]);
				if(node == null || (selector[1] != "*" && node.nodeName.toLowerCase() != selector[1].toLowerCase())){
					return listReturn;
				}
				if(subselector.length == 2){
					listReturn.push(node);
					return listReturn;
				}
				return parseSelector(subselector[3], node, "#");
			case ".":
				if(sMode == "`"){
					listNodes = getElementsByTagName(oParentNode, selector[1]);
				} else {
					listNodes = oParentNode.childNodes;
				}
				for(var i = 0; i < listNodes.length; i++){
					node = listNodes[i];
					if(node.nodeType != 1){
						continue;
					}
					subselector = selector[3].match(reParseSelector);
					if(subselector != null){
						if(node.className.match("\\b" + subselector[1] + "\\b") == null){
							continue;
						}
						listSubNodes = parseSelector(subselector[3], node, subselector[2]);
						listReturn = listReturn.concat(listSubNodes);
					} else if(node.className.match("\\b" + selector[3] + "\\b") != null){
						listReturn.push(node);
					}
				}
				return listReturn;
			case ">":
				if(sMode == "`"){
					listNodes = getElementsByTagName(oParentNode, selector[1]);
				} else {
					listNodes = oParentNode.childNodes;
				}
				for(var i = 0; i < listNodes.length; i++){
					node = listNodes[i];
					if(node.nodeType != 1){
						continue;
					}
					if(node.nodeName.toLowerCase() != selector[1].toLowerCase()){
						continue;
					}
					listSubNodes = parseSelector(selector[3], node, ">");
					listReturn = listReturn.concat(listSubNodes);
				}
				return listReturn;
			case "`":
				listNodes = getElementsByTagName(oParentNode, selector[1]);
				for(var i = 0; i < listNodes.length; i++){
					node = listNodes[i];
					listSubNodes = parseSelector(selector[3], node, "`");
					listReturn = listReturn.concat(listSubNodes);
				}
				return listReturn;
			default:
				listNodes = getElementsByTagName(oParentNode, selector[0]);
				for(var i = 0; i < listNodes.length; i++){
					listReturn.push(listNodes[i]);
				}
				return listReturn;
		}
	}
	function getElementsByTagName(oParentNode, sTagName){
		/*	IE5.x does not support document.getElementsByTagName("*")
			therefore we're resorting to element.all */
		if(sTagName == "*" && oParentNode.all != null){
			return oParentNode.all;
		}
		return oParentNode.getElementsByTagName(sTagName);
	}
	return parseSelector;
}();
/*	Executes an anonymous function which returns the function sIFR (defined inside the function).
	You can replace elements using sIFR.replaceElement()
	All other variables and methods you see are private. If you want to understand how this works you should
	learn more about the variable-scope in JavaScript. */
var sIFR = function(){
	return false;
	/*	Disable sIFR for non-Flash or old browsers */
	if(window.hasFlash == false || !document.createElement || !document.getElementById){ return false; }
	/* Opera and Mozilla require a namespace when creating elements in an XML page */
	var sNameSpaceURI = "http://www.w3.org/1999/xhtml";
	var bIsInitialized = false;
	var bIsSetUp = false;
	var stackReplaceElementArguments = [];
	var UA = function(){
		var sUA = navigator.userAgent.toLowerCase();
		//alert(sUA+"\n"+sUA.match(/.*opera(\s|\/)(\d+\.\d+)/)[2])
		var oReturn =  {
			bIsKHTML: sUA.indexOf('safari') > -1 || sUA.indexOf('konqueror') > -1 || sUA.indexOf('omniweb') > -1,
			bIsOpera : sUA.indexOf('opera') > -1,
			bIsGecko : navigator.product != null && navigator.product.toLowerCase() == 'gecko', //sUA.indexOf('gecko') > -1,
			bIsXML : document.contentType != null && document.contentType.indexOf('xml') > -1
		};
		oReturn.bIsIE = sUA.indexOf('msie') > -1 && ! oReturn.bIsOpera && !oReturn.bIsKHTML && !oReturn.bIsGecko;
		if(oReturn.bIsOpera){ oReturn.nOperaVersion = new Number(sUA.match(/.*opera(\s|\/)(\d+\.\d+)/)[2]);}
		return oReturn;
	}();
	function sIFR(e){
		if((!self.bAutoInit && (window.event || e) != null) || !mayReplace(e)){
			return;
		}
		bIsInitialized = true;
		for(var i = 0; i < stackReplaceElementArguments.length; i++){
			replaceElement.apply(null, stackReplaceElementArguments[i]);
		}
		stackReplaceElementArguments = [];
	}
	var self = sIFR;
	function mayReplace(e){
		if(bIsSetUp == false || ((UA.bIsXML && UA.bIsGecko || UA.bIsKHTML) && e == null && bIsInitialized == false) || document.getElementsByTagName("body").length == 0){
			return false;
		}
		return true;
	}
	function fetchContent(oNode, oNewNode, sCase, nLinkCount, sLinkVars){
		var sContent = "";
		var oSearch = oNode.firstChild;
		var oRemove, oRemovedNode, oResult;
		if(nLinkCount == null){ nLinkCount = 0;}
		if(sLinkVars == null){ sLinkVars = "";}
		while(oSearch){
			if(oSearch.nodeType == 3){
				switch(sCase){
					case "lower":
						sContent += oSearch.nodeValue.toLowerCase();
						break;
					case "upper":
						sContent += oSearch.nodeValue.toUpperCase();
						break;
					default:
						sContent += oSearch.nodeValue;
				}
			} else if(oSearch.nodeType == 1){
				if(oSearch.nodeName.toLowerCase() == "a" && !oSearch.getAttribute("href") == false){
					if(oSearch.getAttribute("target")){
						sLinkVars += "&sifr_url_" + nLinkCount + "_target=" + oSearch.getAttribute("target");
					}
					sLinkVars += "&sifr_url_" + nLinkCount + "=" + oSearch.getAttribute("href").replace(/&/g, "%26");
					sContent += '<a href="asfunction:_root.launchURL,' + nLinkCount + '">';
					nLinkCount++;
				} else if(oSearch.nodeName.toLowerCase() == "br"){
					sContent += "\n";
				}
				if(oSearch.hasChildNodes){
					/*	The childNodes are already copied with this node, so oNewNode = null */
					oResult = fetchContent(oSearch, null, sCase, nLinkCount, sLinkVars);
					sContent += oResult.sContent;
					nLinkCount = oResult.nLinkCount;
					sLinkVars = oResult.sLinkVars;
				}
				if(oSearch.nodeName.toLowerCase() == "a"){
					sContent += "</a>";
				}
			}
			oRemove = oSearch;
			oSearch = oSearch.nextSibling;
			if(oNewNode != null){
				oRemovedNode = oRemove.parentNode.removeChild(oRemove);
				oNewNode.appendChild(oRemovedNode);
			}
		}
		return {"sContent" : sContent, "nLinkCount" : nLinkCount, "sLinkVars" : sLinkVars};
	}
	function createElement(sTagName){
		if(document.createElementNS && !UA.bIsOpera){
			return document.createElementNS(sNameSpaceURI, sTagName);
		} else {
			return document.createElement(sTagName);
		}
	}
	function createObjectParameter(nodeObject, sName, sValue){
		var node = createElement("param");
		node.setAttribute("name", sName);
		node.setAttribute("value", sValue);
		nodeObject.appendChild(node);
	}
	function replaceElement(sSelector, sFlashSrc, sColor, sLinkColor, sHoverColor, sBgColor, nPaddingTop, nPaddingRight, nPaddingBottom, nPaddingLeft, sFlashVars, sCase, sWmode, h,w){
		return false;
		if(!mayReplace()){
			return stackReplaceElementArguments.push(arguments);
		}
		if(sFlashVars != null){
			sFlashVars = "&" + sFlashVars.normalize();
		} else {
			sFlashVars = "";
		}
		var ghettoOpera = sBgColor;
		if(sBgColor == "transparent"){ sWmode = "transparent";}
		if(sWmode == null){ sWmode = "";}
		var node, sWidth, sHeight, sMargin, sPadding, sText, sVars, nodeAlternate, nodeFlash, oContent;
		var listNodes = parseSelector(sSelector);
		if(listNodes.length == 0){ return false;}
		for(var i = 0; i < listNodes.length; i++){
			node = listNodes[i];
			/* Prevents elements from being replaced multiple times. */
			if(node.className.match(/\bsIFR\-replaced\b/) != null){continue;}
			sWidth = nPaddingLeft; //need to soft code values.
			sHeight = nPaddingTop;
			nodeAlternate = createElement("span");
			nodeAlternate.className = "sIFR-alternate";
			oContent = fetchContent(node, nodeAlternate, sCase);
			sText = oContent.sContent;
			sText = sText.replace(/\+/g, "%2B");
			sText = sText.replace(/&/g, "%26");
			sText = sText.replace(/\"/g, "%22");
			sText = sText.normalize();
			sVars = "text=" + sText + sFlashVars + "&w=" + sWidth + "&h=" + sHeight + oContent.sLinkVars;
			if (sColor != null){sVars += "&textcolor=" + sColor;}
			if (sLinkColor != null){sVars += "&linkcolor=" + sLinkColor;}
			if (sHoverColor != null){sVars += "&hovercolor=" + sHoverColor;}
			node.className = node.className.normalize() + (node.className == ""  ? "" : " ") + "sIFR-replaced";
			/*	Opera only supports the object element, other browsers are given the embed element,
				for backwards compatibility reasons between different browser versions.
				Opera versions below 7.60 use innerHTML, from 7.60 and up we use the DOM */
			if(UA.bIsOpera){
				if(UA.nOperaVersion < 7.60){
					sBgColor=sColor;
					//alert(sBgColor);
					node.innerHTML = ['<object class="sIFR-flash" type="application/x-shockwave-flash" data="', sFlashSrc, '" quality="best" wmode="', sWmode, '" bgcolor="', sBgColor, '" flashvars="', sVars, '" width="', sWidth, '" height="', sHeight, '"></object>'].join("");
					//alert("wmode="+sWmode+", sBgColor="+ sBgColor+", "+node.innerHTML);
				} else {
					nodeFlash = createElement("object");
					nodeFlash.setAttribute("type", "application/x-shockwave-flash");
					nodeFlash.setAttribute("data", sFlashSrc);
					createObjectParameter(nodeFlash, "quality", "best");
					createObjectParameter(nodeFlash, "wmode", sWmode);
					createObjectParameter(nodeFlash, "bgcolor", sBgColor);
					createObjectParameter(nodeFlash, "flashvars", sVars);
				}
			} else {
				nodeFlash = createElement("embed");
				nodeFlash.setAttribute("src", sFlashSrc);
				nodeFlash.setAttribute("quality", "best");
				nodeFlash.setAttribute("flashvars", sVars);
				nodeFlash.setAttribute("type", "application/x-shockwave-flash");
				nodeFlash.setAttribute("wmode", sWmode);
				nodeFlash.setAttribute("bgcolor", sBgColor);
			}
			/*	This code is shared between the DOM-created objects */
			if(!UA.bIsOpera || UA.nOperaVersion >= 7.60){
				nodeFlash.className = "sIFR-flash";
				nodeFlash.setAttribute("width", sWidth);
				nodeFlash.setAttribute("height", sHeight);
				nodeFlash.style.width = sWidth + "px";
				nodeFlash.style.height = sHeight + "px";
				node.appendChild(nodeFlash);
			}
			node.appendChild(nodeAlternate);
			/*	Workaround to force KHTML-browsers to repaint the document.
				Additionally, IE for both Mac and PC need this.
				See: http://neo.dzygn.com/archive/2004/09/forcing-safari-to-repaint */
			if(UA.bIsKHTML || UA.bIsIE){
				node.innerHTML += "";
			}
		}
	}
	function setup(){
		bIsSetUp = true;
		/*	Providing a hook for you to hide certain elements if Flash has been detected. */
		if(document.documentElement){
			document.documentElement.className = document.documentElement.className.normalize() + (document.documentElement.className == "" ? "" : " ") + "sIFR-hasFlash";
		}
		if(window.attachEvent){
			window.attachEvent("onload", sIFR);
		} else if(document.addEventListener || window.addEventListener){
			if(document.addEventListener){
				document.addEventListener("load", sIFR, false);
			}
			if(window.addEventListener){
				window.addEventListener("load", sIFR, false);
			}
		} else {
			if(typeof window.onload == "function"){
				var fOld = window.onload;
				window.onload = function(){ fOld(); sIFR(); };
			} else {
				window.onload = sIFR;
			}
		}
	}
	/* Public Methods */
	self.UA = UA;
	self.bAutoInit = true;
	self.replaceElement = replaceElement;
	self.setup = setup;
	return self;
}();
/*	sIFR setup. You can add browser detection here.
	sIFR's browser detection is exposed through sIFR.UA. */
if(typeof(sIFRDisabled)=='undefined' ||sIFRDisabled==false){//allows sIFR to be disabled on a page by setting sIFRDisabled to the boolena value true
	if(sIFR != false){
		sIFR.setup();
	}
}
