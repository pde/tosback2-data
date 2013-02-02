/* Timestamp: Wed Jan 30 14:00:10 PST 2013*/if (window["v3Lander"]==null){
v3Lander={

    codeVersion:'1359583210558',
	v3Frame:false,
	domState: "defer-failed",
	domReady: false,
	normalizeProtocol: function(url){
		return url.replace(  /^HTTPS?:/i , window.parent.location.protocol );
	},
	
	hostedFileURL:"/inqChat.html",
	isAtHostedFileURL: false,
	log:function(s) {
    	if (typeof console != "undefined" && console.log) {
        	console.log(s);
    	}
	},
	
	FMProxy:	{
		fcns:{},
		addFcn: function(name, fcnStr){
			var obj = null;
			try{
				obj = eval("({'"+name+"':"+fcnStr+"})");
			}
			catch(err){
				throw "function eval failed. err="+err.toString();
			}
			this.fcns[name]=obj[name];
		},
		getFcn: function(name){
			return this.fcns[name];
		},
		/*Removes a function from the collection of functions */
		removeFcn: function(name){
			if(!!this.fcns[name]){
				delete this.fcns[name];
				return true;
			}
			return false;
		}
	},
	
	// multiHost=false


	_getHostedFileURL:function(domain){
		if (!domain) domain = top.location.host ;					/* if domain has not been supplied, use our domain */
		domain = domain.toUpperCase();								/* make the domain upper case */
		if ((!v3Lander.hostToPath) || v3Lander.hostToPath=={})		/* If we have no host-to-path map, then return the default URL */
			return v3Lander.hostedFileURL;
		var url = null;
		try{
			url = v3Lander.hostToPath[domain];						/* Get the path from the map */
		} catch (e) {
		
		}
		if (!url) 													/* If the url is null, return the default hosted file */
			return v3Lander.hostedFileURL = this.defaultHostToPath;
		return url;
	},


	getHostedFileURL:function(domain){
		var url = this._getHostedFileURL(domain);		
		if (url.indexOf("//")!=0){						
		url = "//"+domain+url;						
		}
		url = window.location.protocol + url;			
		return url;										
	},
	

	
	assignDomain:function(){
		try{
			if (this.isAtHostedFileURL){
				var domainName = document.domain;
				var temp = domainName.split('.');
				for (var i=0; i < temp.length; i++){
					try{
						var tempwindow = null;
						if (this.isAtHostedFileURL && (window.location.search == ""))
							tempwindow = window.opener;
						else if (this.isAtHostedFileURL && (window.location.search.indexOf('?IFRAME') == 0 || window.location.search == "?IEXF"))
							tempwindow = window.parent;
						else if (this.isAtHostedFileURL && window.location.search == "?PRXY")
							tempwindow = window.parent.parent;
						else return ;

						
						if (document.domain == tempwindow.document.domain){
							break;
						} else {
							temp.shift();
							document.domain = temp.join('.');
						}
					}
					catch(ee){
						temp.shift();
						var finalVar = temp.join('.');
						document.domain = finalVar;
					}
				}
			}
		}catch(e){

		}
	},

	embeddedHostedFile: null,
	embeddedDiv: null,
	c2cQueryData: null,
	registerDivRetry: 0,


	resizeAnscestorIframe: function(){
		var items = name.split("||");		
		var iframeName = items[1];			
		var width = items[2];				
		var height = items[3];				
		
		var iframeElements = parent.parent.document.getElementsByName(iframeName);
		if (iframeElements.length > 0) {	
			try {
				var iframe = iframeElements[0];	
				
				iframe.style.cssText += ";"+"width: "+width+ "px;"+
											"height: "+height+"px;"+
											"display: block;"+
											"overflow: hidden;" +
											"overflow-x: hidden;"+
											"overflow-y: hidden;"+
											"border-style: hidden;"+
											"border-style: none;"+
											"border-width: 0px;" ;
			} catch(e){
			}
		}
	},

	registerDiv: function(retryCount){
		if (!!retryCount)
			v3Lander.registerDivRetry = retryCount;
		try {
			if (top["Inq"]==null) throw (new Error("Inq not ready"));
			if (top.Inq["fireCustomEvent"]==null) throw (new Error("fireCustomEvent not ready"));
			top.Inq.fireCustomEvent("IframeC2C",{div: v3Lander.embeddedDiv, queryData:v3Lander.c2cQueryData});
		} catch(e){
			if (--(v3Lander.registerDivRetry) > 0)
				window.setTimeout(v3Lander.registerDiv, 500);
		}
	},

	resizeIframe: function(width, height){
		var name = "RESIZE||"+window.name+"||" + width + "||" + height ;
		var div = document.createElement("div");
		div.innerHTML = '<ifr'+'ame id="inqChatStage" name="'+name+'" src="'+this.embeddedHostedFile+'?RSC2C"'
					+ ' style="z-index:9999999;overflow:hidden;position:absolute;height:1px;width:1px;left:0px;top:0px;border-style: none;border-width: 0px;display: none;"'
					+ ' scrolling="NO"'
					+ ' frameborder=0'
					+ '></ifr'+'ame>' ;
		var ifrm = div.firstChild ;
		document.body.appendChild(ifrm);
	},

	setSource:function(attributes, domain){
		v3Lander.embeddedHostedFile = v3Lander.getHostedFileURL(domain);
		
		v3Lander.embeddedDiv.innerHTML = "";
		
		var image = new Image();
		
		image.onload = function(e){
			
			v3Lander.resizeIframe(this.width, this.height);
			return false;
			};
		
		for (attr in attributes){
			image.setAttribute(attr, attributes[attr]);
		}
		
		if (!!image.onclick){
			try {
				
				if (!!image.style["cursor"]) image.style.cursor = "pointer";	
				else image.style.cssText += ";cursor: pointer;cursor: hand;";	
			} catch(e){};
			var fun = "" + image.onclick ;					
			if (fun.indexOf("function")!=0) {				
				var funInner = image.onclick;				
				image.onclick = new Function(funInner);		
			}
		}
		v3Lander.embeddedDiv.appendChild(image);			
	},

	fixV3IFrames:function(div){
		var inqFrames = div.getElementsByTagName("IFRAME");
		div.style.cssText = "overflow:hidden;position:absolute;height:1px;width:1px;left:0px;top:0px;"
					+"border-style: none;border-width: 0px;" ;
		for (var ix=0; ix < inqFrames.length; ix++)
		{
			inqFrame = inqFrames[ix] ;
			inqFrame.allowTransparency="true" ;
			inqFrame.border="0";
			inqFrame.frameBorder="no" ;
			inqFrame.frameSpacing=0;
			inqFrame.marginWidth=0;
			inqFrame.style.cssText =
				"z-index:9999999;overflow:hidden;position:absolute;left:0px;top:0px;width:1px;height:1px;border-style: none;border-width: 0px;BACKGROUND-COLOR: Transparent;" ;
		}
	},
	
	prepareBeforeUnloadForEH: function(){
		if (!inqFrame.Inq.EC.isInitialized()) { // don't replace onbeforeunload handler set by EC
			window.onbeforeunload = function(evt) {
				inqFrame.Inq.EH.fireBeforeUnloadEvent();
			}
		}
	},
	
	prepareBeforeUnload: function(atxt, ctxt, cancelFcn, showImage, imageElement){
		window.onbeforeunload = function(evt){
			if (inqFrame.Inq.EH.isInitialized()) {
				inqFrame.Inq.EH.fireBeforeUnloadEvent();
			}

			if(inqFrame.Inq.EC.update()){
				if(showImage) {
					var positionX = (window.innerWidth - imageElement.width)/2;
					var positionY = (window.innerHeight - imageElement.height)/2;
					
					var style = inqFrame.frameElement.style;
					style["display"] = "none";
					style["z-index"] = "9999999";
					style["overflow"] = "hidden";
					style["position"] = "absolute";
					style["height"] = imageElement.height + "px";
					style["width"] = imageElement.width + "px";
					style["left"] = positionX + "px";
					style["top"] = positionY + "px";
					style["border-style"] = "none";
					style["border-width"] = "0px";
					inqFrame.Inq.CHM.isImagePosition  = true;
				}

				
				inqFrame.Inq.EC.fireBeforeExitConfirmationEvent();

				if(atxt)
					alert(atxt);
				window.onbeforeunload = null; 


				
				setTimeout(cancelFcn, 200);
				return String(ctxt);
			}
		};
	},

	initV3Frame:function(){
		if (window.frameElement)
			window.clientwin = window.parent;
		else if (window.opener)
			window.clientwin = window.opener;
		if (window.clientwin)
			window.clientwin.inqFrame=window ;
		window.inqFrame = window ;
		window.name = opener ? "_inqPersistentChat" : "inqV3";
		v3Lander.insertLandingTag();
	},
	
	reload: function(){
		this.domReady = false;
		self.setTimeout("v3Lander._reload()", 50);
	},
	_reload: function(){
		document.body.removeChild(document.getElementById("inqChatStage"));
		var corner=document.getElementById("inqDivResizeCorner");
		var title=document.getElementById("inqTitleBar");
		if (corner)document.body.removeChild(corner) ;
		if (title)document.body.removeChild(title) ;
		window.inqFrame = null;
		this.main();
	},
	createV3Frame: function(){
		var div = document.createElement("div") ;
		var port = (document.location.port=="")?"":(":"+document.location.port);
		var iframesrc=((v3Lander.hostedFileURL).indexOf("/")==0)
			? document.location.protocol+'//'+document.location.hostname+port+v3Lander.hostedFileURL+'?IFRAME'
			: v3Lander.hostedFileURL ;

		
		if (top != parent) {
			var rand = (Math.round(Math.random()*1000000000000)).toString(36);
			iframesrc += (iframesrc.indexOf('?') == -1)?'?':'&';
			iframesrc += "rand=" + rand;
		}

		div.id = "inqChatStage";
		div.style.cssText = "z-index:9999999;overflow:hidden;position:absolute;height:1px;width:1px;left:0px;top:0px;"
						+"border-style: none;border-width: 0px;" ;
		div.innerHTML = '<ifr'+'ame id="inqChatStage" name="345" src="'+iframesrc+'"'
					  + ' style="z-index:9999999;overflow:hidden;position:absolute;height:1px;width:1px;left:0px;top:0px;border-style: none;border-width: 0px;display: none;"'
					  + ' scrolling="NO"'
					  + ' frameborder=0'
					  + '></iframe>'
					  + '<div style="border-width: 0px; position: absolute; z-index: 9999999; left: 0px; top: 0px; cursor: move; height: 55px; width: 410px; display: none;" id="inqTitleBar">'
					  + '<img />'
					  + '</div>'
					  + '<div style="border-width: 0px; position: absolute; z-index: 9999999; left: 0px; top: 0px; display:none; height: 0px; width: 0px;" id="inqResizeBox">'
					  + '<div style="border-width: 0px; position: absolute; z-index: 9999999; left: 424px; top: 284px; cursor: se-resize; height: 16px; width: 16px; display: none;" id="inqDivResizeCorner"></div>'  ;
		var bdy=document.getElementsByTagName("BODY");
		if (bdy && bdy[0]){
			var iframes = div.getElementsByTagName("IFRAME") ;
			var divs = div.getElementsByTagName("DIV");
			if (iframes) for (ix=iframes.length-1; ix >-1;--ix)
				bdy[0].appendChild(iframes[ix]);
			if (divs&&divs.length>0)for (ix=divs.length-1; ix >-1;--ix)
				bdy[0].appendChild(divs[ix]);
		}
		if (iframesrc==this.hostedFileURL) {
			var stg = document.getElementById("inqChatStage");
			var doc =  (stg.contentDocument)?stg.contentDocument:stg.contentWindow.document ;
			if (typeof(doc)=="undefined"||doc==null) return ;
			doc.open("replace") ;
			doc.write(
				'<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">\n'
				+'<html><head><title></title>\n'
				+'<meta http-equiv=Content-Type content="text/html; charset=utf-8">\n'
				+'</head>\n'
				+'<body>\n'
				+'<script type="text\/javascript" language="javascript" charset="utf-8" \n'
				+'\t\tsrc="' + v3Lander.normalizeProtocol('https://citizens.inq.com')+'/chatskins/launch/inqChatLaunch345.js"><\/script>\n'
				+'</body>\n'
				+'</html>');
			doc.close();
		}
		v3Lander.fixV3IFrames(div);
	},
	insertLandingTag:function(){
        function insertScript(name) {
			var srctag=document.createElement("SC"+"RIPT");
            srctag.src=v3Lander.normalizeProtocol("https://citizens.inq.com")+ name;
			srctag.type="text/javascript";
			srctag.charset="utf-8";
			srctag.language="javascript";
			bdy[0].appendChild(srctag);
		}

		var bdy=document.getElementsByTagName("BODY");
		if (bdy && bdy[0]){

             insertScript("/chatskins/launch/tcFramework345.js?codeVersion=" + encodeURIComponent(this.codeVersion));
         }
     },
     parseC2CQueryString: function() {
         
		var queryStringIndex = window.location.href.indexOf("?C2C");
		var queryString = window.location.href.substring(queryStringIndex + 4);
		if(queryString.length > 1) {
			
			var c2cQueryData = "{"; 
			var queryStringPairs = queryString.substring(1).split("&");
			for(var i=0; i<queryStringPairs.length; i++) {
				var pair = queryStringPairs[i].split("=");
				if(pair.length >= 1 || pair.length <= 2)
					c2cQueryData += (i==0 ? "" : ", ")
									+ pair[0] + ": "
									+ (pair.length == 2
										? "\"" + unescape(pair[1]) + "\""
										: "\"\"");
			}
			c2cQueryData += "}";
			
			v3Lander.c2cQueryData = c2cQueryData;
		}
	},
	renderC2CDiv: function(){
		
		document.body.style.cssText = "border-style: none; border-width: 0px; margin: 0px; padding: 0px;overflow: hidden;overflow-x: hidden;overflow-y: hidden;";
		
		var c2cdiv = document.createElement("DIV");
		c2cdiv.id = window.name;

		
		document.body.appendChild(c2cdiv);
		
		v3Lander.embeddedDiv = c2cdiv;
		
		c2cdiv["setSource"] = v3Lander.setSource;
	},

	onDomReady:function(){
		if (v3Lander.domReady)return;
		v3Lander.domReady=true;
		if (window.location.href.indexOf("?C2C")!=-1){
		    try{
				v3Lander.renderC2CDiv();
				v3Lander.parseC2CQueryString();
				v3Lander.registerDiv(200);	
			} catch(e) {}
			return;
		}
		
		try {
			if (window != window.parent && !v3Lander.isAtHostedFileURL && window.document.domain == window.parent.document.domain) {
				return;
			}
		} catch(e) {
			
		}
        if(!v3Lander.v3Frame) {
            v3Lander.createV3Frame();
        } else {
            v3Lander.initV3Frame();
        }
	},

	testReady:function(){
        if (typeof $ != "undefined" && $.isReady) {
			setTimeout("v3Lander.onDomReady()", 1);
		} else if (typeof document.readyState == "undefined") {
			if (document.addEventListener){
				document.addEventListener("load",function(){setTimeout("v3Lander.onDomReady();", 0);}, false);
				document.addEventListener(
					"DOMContentLoaded",
					function(){	setTimeout("v3Lander.onDomReady();", 0);},
					false
				);
			}
			setTimeout("v3Lander.onDomReady()", 100);
		} else {
			if (document.readyState=="complete")
				setTimeout("v3Lander.onDomReady();", 0);
			else if (document.all && !window.opera){
				try {
					
					document.write('<sc'+'ript type="text/javascript" id="v3ContentLoadTag" defer="defer" '+'></sc'+'ript>');

					
					var isExitChat = false;
					if (isExitChat) {
					    
					    if (this.isAtHostedFileURL) {
							document.write('<iframe id="tcBBFrame" src="' + v3Lander.normalizeProtocol('https://citizens.inq.com')+'/tagserver/v3/blank.html" ' +
					            'frameborder="0" style="height:0px;width:0px;visibility:hidden" ' +
					            'onload="window.v3Lander._tcBBFrameOnload()"></iframe>');
					    }
					}
				} catch (e) {this.log(e);}
				var v3ContentLoadTag=document.getElementById("v3ContentLoadTag");
				if (v3ContentLoadTag){
					v3ContentLoadTag.onreadystatechange=function(){
						v3Lander.domState=this.readyState;
						if (this.readyState=="complete"){
							setTimeout("v3Lander.onDomReady()", 100);
						}
					};
				}
				else {
					this.uponError(); 
				}
			}
			else if (document.addEventListener){
				if(/loaded|complete/.test(document.readyState))
					setTimeout("v3Lander.onDomReady();", 0);
				else {
					setTimeout(arguments.callee,0);
					return ;
				}
			}
		}
	},
	uponError:function(){
		
		if (document.readyState == "complete") {
			setTimeout("v3Lander.onDomReady()", 1);
		}
		else {
			document.attachEvent("onreadystatechange", function(){
				if (document.readyState === "complete") {
					document.detachEvent("onreadystatechange", arguments.callee);
					setTimeout("v3Lander.onDomReady()", 1);
					}
				});
		}
	},
    
	prepBBDetect: function(){
		var blankURL = v3Lander.normalizeProtocol("https://citizens.inq.com")+"/tagserver/v3/blank.html";

		function _tcBBLoader() {
			setTimeout('document.getElementById("tcBBFrame").src = "'+blankURL+'?tc=1";', 100);
		}

		function _tcBBFrameOnload() {
			var tcBBFrame = window.document.getElementById("tcBBFrame");
			if(!tc_iframe_loaded_flag && tcBBFrame.src.indexOf("?tc=1") == -1) {
				if(isIE) {
					window.attachEvent("onload", _tcBBLoader);
				} else {
					window.addEventListener("load", _tcBBLoader, true);
				}
			} else if(!tc_iframe_loaded_flag && tcBBFrame.src.indexOf("?tc=1") != -1) {
				tc_iframe_loaded_flag = true;
			} else if(tc_iframe_loaded_flag) {
				window.inqFrame.Inq.EC.setEnabled(false);
				history.back();
			}
		}
		v3Lander._tcBBFrameOnload = _tcBBFrameOnload;

		var tc_iframe_loaded_flag = false;
		var isIE = navigator.userAgent.toLowerCase().indexOf("msie")>-1;

		if(!isIE){
			var iframe=window.document.createElement('iframe');
			iframe.style.position = "absolute";
			iframe.style.width = "10px";
			iframe.style.height = "10px";
			iframe.style.left = 0;
			iframe.style.top = 0;
			iframe.style.zIndex = 0;
			iframe.style.display = "none";
			iframe.style.padding = 0;
			iframe.style.margin = 0;
			iframe.id = "tcBBFrame";
			iframe.name = "tcBBFrame";
			iframe.src = blankURL;
			iframe.onload = v3Lander._tcBBFrameOnload;
			window.document.body.appendChild(iframe);
		}
	},

	
    removeNode:function(id){
		try {
			var tempID = document.getElementById(id);
			var tag = null;
			if (!!tempID)
        		tag = parent.parent.tempID;
        	if (tag) {
            tag = tag.parentNode ;
            var p = tag.parentNode ;
            var grandparent = parent.parent;
            if (grandparent["Inq"]==null) return;
            if (grandparent.Inq["removeProxyNode"]==null)
                grandparent.Inq["removeProxyNode"]= new grandparent.Function( "id",
                'var node=document.getElementById(id);\n'
              + 'try{\n'
			  + 'if(!!node) {\n'
              + 'var p=node.parentNode;\n'
              + 'p.removeChild(node);\n'
              + 'node=p;\n'
			  + 'if(!!node) {\n'
              + 'p=node.parentNode;\n'
              + 'p.removeChild(node);\n'
			  + '}\n'
			  + '}\n'
              + '}catch(e){}\n'
              );
             grandparent.setTimeout('Inq.removeProxyNode("'+id+'")', 100);
        }
	} catch(ee){

	}
    },
    
    removeNodeXF:function(id){
		try {
			var tag = parent.parent.document.getElementById(id);
			if (tag) {
				tag = tag.parentNode ;
				var p = tag.parentNode ;
				if (p) try { p.removeChild(tag); } catch (e){}
			}
		} catch(e){}
    },
	
	wrapWithTryCatch:function(code){
		return "try {\n"
			 + code
			 + "\n} catch(e){"
             + "Inq.log('ERROR:' + e.message);"
			 +"};";
	},
    
    xframeToIjsf:function(){
        var items = name.split("||");
        var code = decodeURIComponent(items[3]);
        
        var chatStageWindow = window.parent.parent.parent.document.getElementById('inqChatStage').contentWindow;
		chatStageWindow.setTimeout(v3Lander.wrapWithTryCatch(code), 1);
	},

	
	 xhfToIjsf:function(){
		var code = decodeURIComponent(name);
		var chatStageWindow = window.parent.parent;
		chatStageWindow.setTimeout(v3Lander.wrapWithTryCatch(code), 1);
	},

	
     postReturnsIE:function(){
        var items = name.split("||");
        var code = decodeURIComponent(items[1]);
        var grandParent = window.parent; 
		/* NOTICE: in IE it is problematic to delete an active window
		 * Using eval, we were executing a code from this thread that deletes this iframe
		 * This caused problems in IE7 and IE6
		 * We replaced the eval with a timeout to ensure a different thread
		 * @author: fpinn@touchcommerce.com
		 */
		/* Wrap the code with try catch */
        grandParent.setTimeout(v3Lander.wrapWithTryCatch(code), 1);
        v3Lander.removeNode(items[0]);
    },
    
    postReturns:function(){
        var items = name.split("||");
        var code = decodeURIComponent(items[1]);
        var grandParent = window.parent.parent;

		/* NOTICE: in IE it is problematic to delete an active window
		 * Using eval, we were executing a code from this thread that deletes this iframe
		 * This caused problems in IE7 and IE6
		 * We replaced the eval with a timeout to ensure a different thread
		 * @author: fpinn@touchcommerce.com
		 */
		/* Wrap the code with try catch */
        grandParent.setTimeout(v3Lander.wrapWithTryCatch(code), 1);
		v3Lander.removeNode(items[0]);
    },


	main:function(){
		if(navigator.userAgent.indexOf("Opera") >= 0) {
			return;
		}
		try {
			this.assignDomain();
			v3Lander.v3Frame=(window.frameElement!=null&&typeof(window.frameElement)!="undefined"&& window.frameElement.id=="inqChatStage")
		} catch(e){v3Lander.v3Frame=false}
		
		var isExitChat = false;
		if (isExitChat) {
			
		if (this.isAtHostedFileURL)
			this.prepBBDetect();
		}
		v3Lander.testReady();
	}
};


	(v3Lander).isAtHostedFileURL=(window.location.href.indexOf(v3Lander.hostedFileURL) > -1);
	if (window.location.href.indexOf("?BLNK")!=-1) {}/* Do nothing, it's blank :) */
	else if (window.location.href.indexOf("?XHR")!=-1) {
			v3Lander.xhfToIjsf() ;
			window.close();
	}
	else if (window.location.href.indexOf("?IEXF")!=-1) {
		v3Lander.assignDomain();
		v3Lander.postReturnsIE();
		window.close();
	}
	
	else if (window.location.href.indexOf("?C2C")!=-1) {
		v3Lander.testReady();
	}
	/* This code is for resizing the iframe in the inner IFRAME (parents parent)
	The name field of the window is "RESIZE||iframename||width||height */
	else if (window.location.href.indexOf("?RSC2C")!=-1) {
		v3Lander.resizeAnscestorIframe();
	}
	else if (!!window.name && window.name.indexOf("||")!=-1 && v3Lander.isAtHostedFileURL) {
		if (window.location.search == "?XFRM"){
			v3Lander.xframeToIjsf() ;
			window.close();
		}
		else{
			v3Lander.assignDomain();
			v3Lander.postReturns() ;
			window.close();
		}
	}
	else {
		v3Lander.main();
	}
}
/* Timestamp: Wed Jan 30 14:00:10 PST 2013*/
