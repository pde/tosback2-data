HW.Flash = function() {
	try{
	this.init();
	this.fla = {};
	this.fla.codebase = 'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0';
	this.fla.quality = 'high';
	this.fla.pluginspage = 'http://www.macromedia.com/go/getflashplayer';
	this.fla.align = 'middle';
	this.fla.play = 'true';
	this.fla.loop = 'true'; 
	this.fla.scale = 'showall',
	this.fla.devicefont = 'false';
	this.fla.bgcolor = '#FFF'; 
	this.fla.menu = 'true';
	this.fla.allowFullScreen = 'true';
	this.fla.allowScriptAccess = 'sameDomain';
	this.fla.salign = '';
	this.fla.wmode = 'transparent';
	this.fla.flashvars = '';
	this.fla.name = '';
	this.fla.id = '';
	this.fla.src = null;
	this.fla.width = null;
	this.fla.height = null;
	}catch(e){
		HW.error(e);
	}
}

HW.Flash.prototype = {
	isIE:null,
	isWin:null,
	isOpera:null,
	hasRequiredVersion:false,
	init:function() {
		this.isIE  = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
		this.isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
		this.isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;
	},
	ControlVersion:function() {
		var version;
		var axo;
		var e;
		try {
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
			version = axo.GetVariable("$version");
		} 
		catch (e) {
			
		}
		
		if (!version)
		{
			try {
				axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
				version = "WIN 6,0,21,0";
				axo.AllowScriptAccess = "always";
				version = axo.GetVariable("$version");
	
			}
			catch (e) {
				
			}
		}
		if (!version)
		{
			try {
				axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
				version = axo.GetVariable("$version");
			}
			catch (e) {
				
			}
		}
	
		if (!version)
		{
			try {
				axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
				version = "WIN 3,0,18,0";
			}
			catch (e) {
				
			}
		}
	
		if (!version)
		{
			try {
				axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
				version = "WIN 2,0,0,11";
			}
			catch (e) {
				version = -1;
			}
		}
		return version;
	},
	GetSwfVer:function() {
		// NS/Opera version >= 3 check for Flash plugin in plugin array
		var flashVer = -1;
		
		if (navigator.plugins != null && navigator.plugins.length > 0) {
			if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
				var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
				var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;
				var descArray = flashDescription.split(" ");
				var tempArrayMajor = descArray[2].split(".");			
				var versionMajor = tempArrayMajor[0];
				
				var flashVer = versionMajor;
			}
		}
		// MSN/WebTV 2.6 supports Flash 4
		else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) flashVer = 4;
		// WebTV 2.5 supports Flash 3
		else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) flashVer = 3;
		// older WebTV supports Flash 2
		else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 2;
		else if (this.isIE && this.isWin && !this.isOpera ) {
			flashVer = this.ControlVersion();
		}
		return flashVer;
	},
	DetectFlashVer:function(reqMajorVer, reqMinorVer, reqRevision) {
		versionStr = this.GetSwfVer();
		if (versionStr == -1 ) {
			return false;
		} else if (versionStr != 0) {
			if(this.isIE && this.isWin && !this.isOpera) {
				// Given "WIN 2,0,0,11"
				tempArray         = versionStr.split(" "); 	// ["WIN", "2,0,0,11"]
				tempString        = tempArray[1];			// "2,0,0,11"
				versionArray      = tempString.split(",");	// ['2', '0', '0', '11']
			} else {
				versionArray      = versionStr.split(".");
			}
			var versionMajor      = versionArray[0];
	
			if (versionMajor >= parseFloat(reqMajorVer)) {
				return true;
			}
			return false;
		}
	},
	AC_Generateobj:function(objAttrs, params, embedAttrs, targetElement,tohide) { 
		var str = '';
		if (this.isIE && this.isWin && !this.isOpera) {
			str += '<object ';
			for (var i in objAttrs) {
				str += i + '="' + objAttrs[i] + '" ';
			}
			str += '>';
			for (var i in params) {
				str += '<param name="' + i + '" value="' + params[i] + '" /> ';
			}
			str += '</object>';
		}
		else {
			str += '<embed ';
			for (var i in embedAttrs) {
				str += i + '="' + embedAttrs[i] + '" ';
			}
			str += '> </embed>';
		}
		if(targetElement && this.hasRequiredVersion) {
			targetElement.innerHTML = str;
			if(tohide) {
				var elms = $$(tohide,document.body,'div');
				for(var i=0,j=elms.length;i<j;i++) {
					HW.setStyle(elms[i],{display:'none'});
				}
			}
		}
	},
	AC_FL_RunContent:function(attrs,targetElement,tohide) {
		var ret = this.AC_GetArgs(attrs, "movie", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000", "application/x-shockwave-flash");
		this.AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs,targetElement,tohide);
	},
	AC_GetArgs:function(args, srcParamName, classid, mimeType) {
		var ret = new Object();
		ret.embedAttrs = new Object();
		ret.params = new Object();
		ret.objAttrs = new Object();
		for (var i=0; i < args.length; i=i+2){
			var currArg = args[i].toLowerCase();    
			
			switch (currArg) {	
				case "classid":
					break;
				case "pluginspage":
					ret.embedAttrs[args[i]] = args[i+1];
					break;
				case "src":
				case "movie":	
					for(var j=0;j<args[i+1].length;j=j+2) {
						if(args[i+1][j] && this.DetectFlashVer(args[i+1][j],0,0)) {
							ret.embedAttrs["src"] = args[i+1][j+1];
							ret.params[srcParamName] = args[i+1][j+1];
							this.hasRequiredVersion = true;
						}
					}				
					break;
				case "onafterupdate":
				case "onbeforeupdate":
				case "onblur":
				case "oncellchange":
				case "onclick":
				case "ondblclick":
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
					ret.objAttrs[args[i]] = args[i+1];
					break;
				case "id":
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
				case "flashvars":
					ret.embedAttrs[args[i]] = ret.objAttrs[args[i]] = args[i+1];
					break;
				default:
					ret.embedAttrs[args[i]] = ret.params[args[i]] = args[i+1];
			}
		}
		ret.objAttrs["classid"] = classid;
		if (mimeType) {ret.embedAttrs["type"] = mimeType;}
		return ret;
	},
	load:function(target,tohide) {
		if(this.width === null) {HW.error('Flash movie width is not defined');}
		if(this.height === null) {HW.error('Flash movie height is not defined');}
		if(this.src === null) {HW.error('Flash movie source is not defined');}
		if(!$(target)) {HW.error('Target element (id="'+target+'") is not defined or does not exist');}
		var attrs = [];
		for(a in this.fla) {
			attrs.push(a);
			if(this[a]) {
				attrs.push(this[a]);
			}
			else {
				attrs.push(this.fla[a]);
			}
		}
		this.AC_FL_RunContent(attrs,$(target),tohide);
	}
}