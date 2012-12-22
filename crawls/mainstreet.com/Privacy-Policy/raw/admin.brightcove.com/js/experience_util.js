var playerIndex;
var flashId;
function createExperience(config, flashVersion) {
   // default version to 7 for backwards compatability
   if (flashVersion == undefined) var flashVersion = 7;
   // Config parameters to pass into the SWF file.
   var servicesURL = "http://console.brightcove.com/services";
   var viewerSecureGatewayURL = "https://console.brightcove.com/services/amfgateway";
   var cdnURL = "http://admin.brightcove.com";

   var bgcolor = config["preloadBackColor"];
   var externalAds = (typeof(playAd) != "undefined");
   var sendReports = (typeof(reportEvent) != "undefined");
   
   var width = config["width"];
   var height = config["height"];
   if (width == null) {
    width = "100%";    
   }
   if (height == null) {
    height = "100%";    
   }
  //specify version required Flash version
  if (config["requireFlash8"] || flashVersion == 8){
    requiredMajorVersion = 8;
  } else{
	//mac requires flash 8
	requiredMajorVersion = 7;
	var isMac = navigator.appVersion.toLowerCase().indexOf("mac") > 0;
	if (isMac) requiredMajorVersion = 8;
  }
  var requiredMinorVersion = 0;
  var requiredRevision = 0;
  
  var hasRightVersion = DetectFlashVer(requiredMajorVersion,requiredMinorVersion,requiredRevision);
  if(hasRightVersion) { 
  
	var pid = getParameter("bcpid");
	if(pid.length < 1  || (pid == config["playerId"]))  {
		var titleParam = getParameter("bctid");
		if (titleParam.length > 0) {
		  config["videoId"] = titleParam;
		  config["autoStart"] = true;
		  config["fromLink"] = true;
		}
		var lineupParam = getParameter("bclid");
		if (lineupParam.length > 0) {
		  config["lineupId"] = lineupParam;
		}
	}
  
    if (playerIndex == undefined){
		playerIndex = 0;
	}else{
		playerIndex++;
	}	

    if (config["flashId"] == undefined) {
      flashId = "flashObj" + playerIndex;
    } else {
      flashId = escapeValue(config["flashId"]) + playerIndex;
    }

    var configItems = "";
    for (var i in config) {
       if (i == "flashId") continue;
       if (typeof(config[i]) == "function" || typeof(config[i]) == "object") continue;
       
       configItems += "&" + i + "=" + escapeValue(config[i]);
    }

    // Hook for Internet Explorer.
    if (navigator.appName && navigator.appName.indexOf("Microsoft") != -1 && navigator.userAgent.indexOf("Windows") != -1 && navigator.userAgent.indexOf("Windows 3.1") == -1) {
	document.write('<script language=\"VBScript\"\>\n');
	document.write('On Error Resume Next\n');
	document.write('Sub ' + flashId + '_FSCommand(ByVal command, ByVal args)\n');
	document.write('	Call onFSCommand(command, args)\n');
	document.write('End Sub\n');
	document.write('</script\>\n');
    }

    var swfFile = "federated.swf";
    if (flashVersion == 8) {
      swfFile = "federated_f8.swf";
    }

    var file = cdnURL + "/viewer/" + swfFile + "?flashId="+flashId+
         "&servicesURL="+escapeValue(servicesURL)+
         "&viewerSecureGatewayURL="+escapeValue(viewerSecureGatewayURL)+
         "&cdnURL="+escapeValue(cdnURL)+
         configItems+
         "&externalAds="+escapeValue(externalAds)+
         "&sendReports="+escapeValue(sendReports)+
         "&buildNumber=" + 196 +
         "&ranNum=" + Math.floor(Math.random()*1000000);   

    if (!DetectFlashVer(8,0,0)) {
      file += "&domain=" + getDomain();
    }
    
    wmode = config["wmode"];
	if (wmode == null) wmode = "window";
	
    version = "7,0,0,0"; // why write 7 always??
    quality = "high";
    document.write("<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=" + version + "\" id=\""+flashId+"\" width=\""+width+"\" height=\""+height+"\">");
    document.write("  <param name=\"allowScriptAccess\" value=\"always\"/>");
    document.write("  <param name=\"allowFullScreen\" value=\"true\"/>");
    document.write("  <param name=\"movie\" value=\""+file+"\"/>");
    document.write("  <param name=\"wmode\" value=\""+wmode+"\"/>");
    document.write("  <param name=\"quality\" value=\""+quality+"\"/>");
    document.write("  <param name=\"bgcolor\" value=\"" + bgcolor + "\"/>");
    document.write("  <param name=\"base\" value=\""+cdnURL+"/viewer/\"/>");
    document.write("  <param name=\"SeamlessTabbing\" value=\"false\"/>");
    document.write("  <embed src=\""+file+"\" base=\""+cdnURL+"/viewer/\" quality=\""+quality+"\" bgcolor=\""+bgcolor+"\" allowScriptAccess=\"always\" name=\""+flashId+"\" width=\""+width+"\" height=\""+height+"\" wmode=\""+wmode+"\" seamlesstabbing=\"false\" type=\"application/x-shockwave-flash\" swLiveConnect=\"true\" pluginspage=\"http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash\"></embed>");
    document.write("</object>"); 
    
  } else {  // flash is too old or we can't detect the plugin 
    document.write("<table width='" + width + "' height='" + height + "' border='0' bgcolor='"+bgcolor+"'>");
    document.write("<tr><td align='center' valign='middle'>");
    document.write("<a href='http://www.adobe.com/go/getflash/' target='_blank'><img src='"+cdnURL+"/viewer/upgrade_flash_player.gif' alt='Get Flash Player' width='314' height='200' border='0'></a>");
    document.write("</td></tr></table>");      
   }

   return flashId;
}

function escapeValue(str) {
  return encodeURIComponent(str);
}

function getDomain() {
  var domain = window.location.href;
  if (domain.substring(0, 7) == "http://") {
    domain = domain.substring(7, domain.length);
  }
  var i = domain.indexOf("/");
  if (i != -1) {
    domain = domain.substring(0, i);
  }
  i = domain.indexOf(":");
  if (i != -1) {
    domain = domain.substring(0, i);
  }
  return domain;
}
var ID_DELIM = "|||";

function onFSCommand(command, args) {
  if (command == "eval"){
    eval(args);
    return;
  }
  if (this[command] == null) return;
  var obj = convertToObject(unescape(args));
  if (obj != null) {
    var callback = obj.callback;
    var flashId = obj.flashId;
    if (obj.flashId != null && callback != null) {
      callback = obj.flashId + ID_DELIM + callback;
    }
    if (obj.args == null) {
      eval(command + "(callback);");
    } else {
      eval(command + "(obj.args, callback);");
    }
  } else {
    eval(command + "();");
  }
}

var flashCallback;
var flashCallbacks = [];
function setAPICallback(id, callback) {
  flashCallback = callback;
  flashCallbacks[id] = callback;
}

function callFlash() {
  var method = arguments[0];
  var params = [];
  for (var i = 1; i < arguments.length; i++) {
    params.push(arguments[i]);
  }
  callbackFlash(flashCallback, {method:method, params:params});
}

function callFlashInstance() {
  var flashId = arguments[0];
  var method = arguments[1];
  var params = [];
  for (var i = 2; i < arguments.length; i++) {
    params.push(arguments[i]);
  }
  var callback = flashCallbacks[flashId];
  callbackFlash(callback, {method:method, params:params});
}

function callbackFlash(callback, returnValue) {
  var flashId = "flashObj";

  var arry = callback.split(ID_DELIM);
  
  if (arry.length > 1) {
    if (arry[0].length > 0) {
      flashId = arry[0];
    }
    callback = arry[1];
  }

  var fo = document[flashId];
  if (fo == null) fo = document.embeds[flashId];
  if (fo == null) fo = document.getElementById(flashId);

  if (fo[callback] != null) {
    return fo[callback](convertToXML(returnValue, "js2flash"));
  } else {
    try {
      fo.SetVariable(callback, convertToXML(returnValue, "js2flash"));
    } catch (e) {}
  }
}


function convertToXML(obj, rootName) {
	if (obj instanceof Function) return "";
  	var type = getType(obj);
  	var xml = "<"+type.name+rootName+">";
  
	if(type.sub) {
  		for (var i in obj) {
 		  xml += convertToXML(obj[i], i);
    	}
	}
	else if (type.name == "str") {
		obj = replaceEntities(obj);
		xml += obj;
	} 
	else {
		  xml += obj;
	}
	xml += "</"+type.name+rootName+">";
	return xml;
}

function replaceEntities(obj) {
	obj = obj.replace("&", "&amp;");
	obj = obj.replace("<", "&lt;");
	obj = obj.replace(">", "&gt;");	
	return obj;
}

var s_xml_types = new Array();	
s_xml_types.push({name:"str",type:String,sub:false});
s_xml_types.push({name:"boo",type:Boolean,sub:false});
s_xml_types.push({name:"num", type:Number,sub:false});
//s_xml_types.push({name:"date", type:Date,sub:false});
s_xml_types.push({name:"arr", type:Array,sub:true});
s_xml_types.push({name:"cda", type:CData, sub:false});
s_xml_types.push({name:"obj", type:Object,sub:true});

function getType(obj) {
        switch (typeof(obj)) {
		case "boolean":
			return {name:"boo",type:Boolean,sub:false};
		case "string":
			return {name:"str",type:String,sub:false};
		case "number":
			return {name:"num",type:Number,sub:false};
	}
	for (var i = 0; i < s_xml_types.length; i++) {
	  if (obj instanceof s_xml_types[i].type) {
	    return s_xml_types[i];
	  }
	}
	return {name:"obj", type:Object,sub:true};
}
function getTypeClass(name) {
  if (name == null) return null;

  name = name.toLowerCase();
	for (var i = 0; i < s_xml_types.length; i++) {
	  if (name == s_xml_types[i].name) {
	    return s_xml_types[i].type;
	  }
	}
	return null;
}

function convertToObject(node) {
//  try {
    if (node == null) {
      return;
    }
    
    if (node.substring != null) {
      node = parseXML(node);
    }
	  
	  if (node == null || node.childNodes == null || node.childNodes.length == 0) {
	    return null;
	  }

	  var type = getTypeClass(node.nodeName.substring(0,3));
	  if (type == null) {
	    type = Object;
	  }

		if (node.firstChild.nodeType == 3 || node.firstChild.nodeType == 4) {
			return getObjectForNode(type, node);

		} else {
		
  		var obj = new type();
	  	var children = node.childNodes;
		  for (var i = 0; i < children.length; i++) {
		    var name = children[i].nodeName;
		    name = name.substring(3, name.length);
			  obj[name] = convertToObject(children[i]);
	  	}
		  return obj;
		}
//	} catch (e) {
//    alert("Error creating object:" + e.message);
//	  return null;
//	}
}

function getObjectForNode(type, node) {
	if (type == Boolean) {
		if (node.firstChild.nodeValue == "true") {
			return new Boolean(1);
		}
		else {
			return new Boolean(0);
		}
	}
	else {
		return new type(node.firstChild.nodeValue);
	}
}

function parseXML(str) {
  if (window.ActiveXObject) {
    var xmldoc = new ActiveXObject("Microsoft.XMLDOM");
    try {
      xmldoc.setProperty("SelectionLanguage", "XPath");
    } catch (e) {} // i.e. 5 doesn't like setting the selection language
    xmldoc.async = false;

    xmldoc.loadXML(str);
    return xmldoc.documentElement;  
  } else if (DOMParser) {

    var parser = new DOMParser();
    var doc = parser.parseFromString(str, "text/xml");
    
    return doc.firstChild;
    
  } else {
    return makeXMLNode(str);
  }
}


function makeXMLNode(str) {
  var node = {};
  var nodeName = node.nodeName = getNodeName(str);
  node.nodeType = 1;
  node.childNodes = [];
  node.firstChild = null;
  var startTagEndIndex = nodeName.length + 2;
  var endTagIndex = str.lastIndexOf("</" + nodeName);
  var nodeData = str.substring(startTagEndIndex, endTagIndex);
  if (nodeData.substring(0, 9) == "<![CDATA[") {
    var child = {};
    child.nodeName = null;
    child.nodeType = 4;
    child.nodeValue = getCDATA(nodeName, str.substring(startTagEndIndex, str.length));
    node.childNodes = [child];
  } else if (nodeData.indexOf("<") > -1) {
    node.childNodes = getChildNodes(nodeData);
  } else if (nodeData.length == 0) {
    //do nothing, we want 0 children here
  } else {
    var child = {};
    child.nodeName = null;
    child.nodeType = 3;
    child.nodeValue = getNodeValue(nodeName, nodeData);
    node.childNodes = [child];
  }
  if (node.childNodes.length > 0) {
    node.firstChild = node.childNodes[0];
  }
  return node;
}

function getNodeName(str) {
  return str.substring(str.indexOf("<")+1, str.indexOf(">"));
}

function getChildNodes(nodeData) {
  var childNodes = [];
  var nodeName;
  var nextIndex;
  var endIndex;
  var dataLength;
  var nameLength;
  var startNodesArray;
  var endNodesArray;
  var startNodesLength;
  var endNodesLength;
  var endNodes;
  var startNodes;
  var endNode;
  var i;
  var j;
  while (nodeData.length > 0) {
    nodeName = getNodeName(nodeData);
    nameLength = nodeName.length;
    nextIndex = nodeData.indexOf("<"+nodeName, nameLength);
    endIndex = nodeData.indexOf("</"+nodeName, nameLength);
    if (endIndex < 0) return childNodes;
    if (nextIndex < 0 || endIndex < nextIndex) {
      dataLength = endIndex+nodeName.length+3;
      childData = nodeData.substr(0, dataLength);
      nodeData = nodeData.substr(dataLength);
      childNodes.push(makeXMLNode(childData));
    } else {
      endNodes = 0;
      startNodes = 0;
      startNodesArray = nodeData.split("<" + nodeName + ">");
      startNodesLength = startNodesArray.length;
      endNode = "</" + nodeName + ">";
      for (i = 0; i < startNodesLength; i++) {
        startNodes++;
        startNodesStr = startNodesArray[i];
        if (startNodesStr.indexOf(endNode) > -1) {
          endNodesArray = startNodesStr.split("</" + nodeName + ">");
          endNodesLength = endNodesArray.length;
          for (j = 0; j < endNodesLength; j++) {
            if (++endNodes == startNodes) {
              childData = startNodesArray.slice(0, startNodes).join("");
              dataLength = childData.length;
              nodeData = nodeData.substr(dataLength);
              childNodes.push(makeXMLNode(childData));
              return childNodes;
            }
          }
        }
      }
      childNodes.push(makeXMLNode(nodeData));
      nodeData = "";
    }
  }
  return childNodes;
}

function getCDATA(nodeName, nodeData) {
  var endCDATA = nodeData.indexOf("]]>", 9);
  if (endCDATA < 0) {
    return null;
  } else {
    return getNodeValue(nodeName, nodeData.substring(9, endCDATA));
  }
}

function getNodeValue(nodeName, nodeValue) {
  switch (nodeName.substr(0, 3)) {
    case "boo":
      return (nodeValue=="true");
    case "num":
      return Number(nodeValue);
    case "str":
      return String(nodeValue);
    default:
      return nodeValue;
  }
}

function CData(str) {
  this.data = str;
}

CData.prototype.toString = function() {
  return "<![CDATA[" + this.data + "]]>";
}

/*
var chunks = {}
function chunkCall(id, total, index, chunk) {
  if (chunks[id] == undefined) chunks[id] = [];
  chunks[id][index] = chunk;
  if (index == total) {
    eval(chunks[id].join(""));
    delete chunks[id];
  }
}
*/
//Flash Detection
var bcisIE  = (navigator.appVersion.indexOf("MSIE") != -1 && /opera/i.test(navigator.userAgent) == false) ? true : false;
var bcisWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
var bcisOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;
// JavaScript helper required to detect Flash Player PlugIn version information
function JSGetSwfVer(i){
	if (navigator.plugins != null && navigator.plugins.length > 0) {
		if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
			var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
      		var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;
			descArray = flashDescription.split(" ");
			tempArrayMajor = descArray[2].split(".");
			versionMajor = tempArrayMajor[0];
			versionMinor = tempArrayMajor[1];
			if ( descArray[3] != "" ) {
				tempArrayMinor = descArray[3].split("r");
			} else {
				tempArrayMinor = descArray[4].split("r");
			}
      		versionRevision = tempArrayMinor[1] > 0 ? tempArrayMinor[1] : 0;
            flashVer = versionMajor + "." + versionMinor + "." + versionRevision;
      	} else {
			flashVer = -1;
		}
	}
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) flashVer = 4;
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) flashVer = 3;
	else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 2;
	else {		
		flashVer = -1;
	}
	return flashVer;
} 
// If called with no parameters this function returns a floating point value 
// which should be the version of the Flash Player or 0.0 
// ex: Flash Player 7r14 returns 7.14
// If called with reqMajorVer, reqMinorVer, reqRevision returns true if that version or greater is available
function DetectFlashVer(reqMajorVer, reqMinorVer, reqRevision) 
{
 	reqVer = parseFloat(reqMajorVer + "." + reqRevision);
   	for (i=25;i>0;i--) {	
		if (bcisIE && bcisWin && !bcisOpera) {
			versionStr = VBGetSwfVer(i);
		} else {
			versionStr = JSGetSwfVer(i);		
		}
		if (versionStr == -1 ) { 
			return false;
		} else if (versionStr != 0) {
			if(bcisIE && bcisWin && !bcisOpera) {
				tempArray         = versionStr.split(" ");
				tempString        = tempArray[1];
				versionArray      = tempString .split(",");				
			} else {
				versionArray      = versionStr.split(".");
			}
			versionMajor      = versionArray[0];
			versionMinor      = versionArray[1];
			versionRevision   = versionArray[2];
			
			versionString     = versionMajor + "." + versionRevision;   // 7.0r24 == 7.24
			versionNum        = parseFloat(versionString);
    		if ( versionMajor > reqMajorVer ) {
				return true;
			} else {
				return ((versionMajor == reqMajorVer && versionMinor >= reqMinorVer) ? true : false );	
			}
		}
	}	
	return (reqVer ? false : 0.0);
}

// Visual basic helper required to detect Flash Player ActiveX control version information
if (navigator.appName && navigator.appName.indexOf("Microsoft") != -1 && navigator.userAgent.indexOf("Windows") != -1 && navigator.userAgent.indexOf("Windows 3.1") == -1) {
	document.write('<script language=\"VBScript\"\>\n');
	document.write('Function VBGetSwfVer(i)\n');
	document.write('  on error resume next\n');
	document.write('  Dim swControl, swVersion\n');
	document.write('  swVersion = 0  \n');
	document.write('  set swControl = CreateObject("ShockwaveFlash.ShockwaveFlash." + CStr(i))\n');
	document.write('  if (IsObject(swControl)) then\n');
	document.write('    swVersion = swControl.GetVariable("$version")\n');
	document.write('  end if\n');
	document.write('  VBGetSwfVer = swVersion\n');
	document.write('End Function\n');
	document.write('</script\>\n');
}
// Hook for Internet Explorer.
if (navigator.appName && navigator.appName.indexOf("Microsoft") != -1 && navigator.userAgent.indexOf("Windows") != -1 && navigator.userAgent.indexOf("Windows 3.1") == -1) {
	document.write('<script language=\"VBScript\"\>\n');
	document.write('On Error Resume Next\n');
	document.write('Sub flashObj_FSCommand(ByVal command, ByVal args)\n');
	document.write('	Call onFSCommand(command, args)\n');
	document.write('End Sub\n');
	document.write('</script\>\n');
}
// Functions to parse query string parameters
// version: 1.0
// written by Kevin Langdon


// #############################################
// function returns the query string part of url
// everything followed by the '?'
function getQueryString() {
    var urlStr = document.location.href;
    var i = urlStr.indexOf("?");
    if (i != -1) {
        return urlStr.substring(i, urlStr.length - 1);
    }
    return null;
}


// #############################################
// function parses the query string and returns each
// parameter and value seperated by '&'
function getParameter(name, defaultValue) {
    if (defaultValue == null) {
        defaultValue = "";
    }

    var url = document.location.href;
    var i = url.indexOf(name + "=");
    if (i != -1) {
        var valuestart = i+name.length+1;
        var valueend = url.length;

        i = url.indexOf("&", valuestart)
        if (i != -1) {
            valueend = i;
        }

        return unescape(url.substring(valuestart, valueend));
    }
    return defaultValue;
}
