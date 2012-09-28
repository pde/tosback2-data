var get = {
	id : function(id){
		return document.getElementById(id);
	},
	tag : function(tag, node){
		if (typeof(node) != 'undefined') {
			return node.getElementsByTagName(tag);
		} else {
			return document.getElementsByTagName(tag);
		}
	},
	className : function(c, node){
		var d = get.tag("*", node);
		var a = [];
		var x = new RegExp("(^|\\s)"+c+"(\\s|$)");
		for(i=0;i<d.length;i++){
			if(x.test(d[i].className)){ a.push(d[i]); }
		}
		return a;
	},
	urlParam : function(p){
		p = p.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		var regexS = "[\\?&]"+p+"=([^&#]*)";
		var regex = new RegExp(regexS);
		var results = regex.exec(window.location.href);
		if(results == null){
			return null;
		} else {
			return results[1];
		}
	}			
};

var element = {
		
	//getElementStyle
	getStyle : function(elem, name) {
		if (elem.style[name]) {
			return elem.style[name];
		} else if ( elem.currentStyle ) {
			return elem.currentStyle[name];
		} else if ( document.defaultView && document.defaultView.getComputedStyle ) {
			name = name.replace(/([A-Z])/g,"-1");
			name = name.toLowerCase();
			var s = document.defaultView.getComputedStyle( elem, "" );
			return s && s.getPropertyValue( name );
		} else {
			return null;
		}
	},
	
	//findElementX
	findX : function(elem) {
		return elem.offsetParent ?
		elem.offsetLeft + element.findX( elem.offsetParent ) :
		elem.offsetLeft;
	},
	
	//findElementY
	findY : function(elem) {
		return elem.offsetParent ?
		elem.offsetTop + element.findY( elem.offsetParent ) :
		elem.offsetTop;
	},
	
	//parentX
	parentX : function(elem) {
		return elem.parentNode == elem.offsetParent ? elem.offsetLeft :
		element.findX( elem ) - element.findX( elem.parentNode );
	},
	
	//parentY
	parentY : function(elem) {
		return elem.parentNode == elem.offsetParent ? elem.offsetTop :
		element.findY( elem ) - element.findY( elem.parentNode );
	},
	
	//posX
	posX : function(elem) {
		return parseInt( element.getStyle( elem, "left" ) );
	},
	
	//posY
	posY : function(elem) {
		return parseInt( element.getStyle( elem, "top" ) );
	},
	
	//setX
	setX : function(elem, pos) {
		elem.style.left = pos + "px";
	},
	
	//setY
	setY : function(elem, pos) {
		elem.style.top = pos + "px";
	},
	
	//addX
	addX : function(elem, pos) {
		element.setX( element.posX(elem) + pos );
	},
	
	//addY
	addY : function(elem, pos) {
		element.setY( element.posY(elem) + pos );
	},
	
	//getElementHeight
	getHeight : function(elem) {
		return parseInt( element.getStyle( elem, 'height' ) );
	},
	
	//getElementWidth
	getWidth : function(elem) {
		return parseInt( element.getStyle( elem, 'width' ) );
	},
	
	//fullHeight
	fullHeight : function(elem) {
		if ( element.getStyle( elem, 'display' ) != 'none' ) {
			return elem.offsetHeight || element.getHeight( elem );
		}
		var old = element.resetCSS( elem, {
			display: '',
			visibility: 'hidden',
			position: 'absolute'
		});
		var h = elem.clientHeight || element.getHeight( elem );
		element.restoreCSS( elem, old );
		return h;
	},
	
	//fullWidth
	fullWidth : function(elem) {
		if ( element.getStyle( elem, 'display' ) != 'none' ) {
			return elem.offsetWidth || element.getWidth( elem );
		}
		var old = element.resetCSS( elem, {
			display: '',
			visibility: 'hidden',
			position: 'absolute'
		});
		var w = elem.clientWidth || element.getWidth( elem );
		element.restoreCSS( elem, old );
		return w;
	},
	
	//resetCSS
	resetCSS : function(elem, prop) {
		var old = {};
		for ( var i in prop ) {
			old[ i ] = elem.style[ i ];
			elem.style[ i ] = prop[i];
		}
		return old;
	},
	
	//restoreCSS
	restoreCSS : function(elem, prop) {
		for ( var i in prop ) {
			elem.style[ i ] = prop[ i ];
		}
	},
	
	//hide
	hide : function(elem) {
		var curDisplay = element.getStyle( elem, 'display' );
		if ( curDisplay != 'none' ) {
			elem.$oldDisplay = curDisplay;
		}		
		elem.style.display = 'none';
	},
	
	//show
	show : function(elem) {
		elem.style.display = elem.$oldDisplay || '';
	},
	
	//setOpacity
	setOpacity : function(elem, level) {
		if ( elem.filters ) {
			elem.style.filters = 'alpha(opacity=' + level + ')';
		} else {
			elem.style.opacity = level / 100;
		}
	},
	
	//slideDown
	slideDown : function(elem) {
		elem.style.height = '0px';
		element.show( elem );
		var h = element.fullHeight( elem );
		for ( var i = 0; i <= 100; i += 5 ) {
			(function(){
				var pos = i;
				setTimeout(function(){
					elem.style.height = (( pos / 100 ) * h ) + "px";
				}, ( pos + 1 ) * 10 );
			})();
		}
	},

	//fadeIn
	fadeIn : function(elem) {
		element.setOpacity( elem, 0 );
		element.show( elem );
		for ( var i = 0; i <= 100; i += 5 ) {
			(function(){
				var pos = i;
				setTimeout(function(){
					element.setOpacity( elem, pos );
				}, ( pos + 1 ) * 10 );
			})();
		}
	},
	
	//setElementClass
	setClass : function(e, cl) {
		e.className = cl;
	},
	
	//byId
	byId : function(e) {
		return document.getElementById(e);
	},
	
	//getNodeID
	getNodeID : function(object, target) {
		var nodeNumber;
		var nodeLength = object.childNodes.length;
		for (i = 0; i < nodeLength; i++) {
			if (object.childNodes[i].id == target) { nodeNumber = i; }
		}
		return object.childNodes[nodeNumber];
	},
	
	//getNodeNum
	getNodeNum : function(object, target) {
		var nodeCount = 0;
		var nodeLength = object.childNodes.length;
		for (i = 0; i < nodeLength; i++) {
			if ((object.childNodes[i].nodeType != 3) && (object.childNodes[i].nodeType != 8)) {
				nodeCount++;
				if (nodeCount == target) {
					return object.childNodes[i];
				}
			}
		}
	},
	
	//remChildren
	remChildren : function(x) {
		while (x.firstChild) { x.removeChild( x.firstChild ); }
		return;
	}	
	
};

var mouse = {
		
	//getMouseX
	getX : function(e) {
		e = e || window.event;
		return e.pageX || e.clientX + page.scrollX();
	},
	
	//getMouseY
	getY : function(e) {
		e = e || window.event;
		return e.pageY || e.clientY + page.scrollY();
	},
	
	//getMouseElementX
	getElementX : function(e) {
		return  ( e && e.offsetX )  || ( e && e.layerX ) || window.event.offsetX;
	},
	
	//getMouseElementY
	getElementY : function(e) {
		return  ( e && e.offsetY ) || ( e && e.layerY ) || window.event.offsetY;
	},
	
	//findMousePosX
	findPosX : function(e) {
		var curleft = obj.offsetLeft;
		while (obj = obj.offsetParent) { curleft += obj.offsetLeft; }
		return curleft;
	},
	
	//findMousePosY
	findPosY : function(e) {
		var curTop = obj.offsetTop;
		while (obj = obj.offsetParent) { curTop += obj.offsetTop; }
		return curTop;
	}
	
};

var page = {
		
	//pageHeight
	height : function() {
		return document.body.scrollHeight;
	},
	
	//pageWidth
	width : function() {
		return document.body.scrollWidth;
	},
	
	//scrollX
	scrollX : function() {
		var de = document.documentElement;
		return self.pageXOffset || ( de && de.scrollLeft ) || document.body.scrollLeft;
	},
	
	//scrollY
	scrollY : function() {
		var de = document.documentElement;
		return self.pageYOffset || ( de && de.scrollTop ) || document.body.scrollTop;
	},
	
	//windowHeight
	windowHeight : function() {
		var de = document.documentElement;
		return self.innerHeight || ( de && de.clientHeight ) || document.body.clientHeight;
	},
	
	//windowWidth
	windowWidth : function() {
		var de = document.documentElement;
		return self.innerWidth || ( de && de.clientWidth ) || document.body.clientWidth;
	},
	
	//blockTextSelection
	blockTextSelection : function() {
		document.body.focus();
		document.onselectstart = function () {
			document.body.style.cursor = "pointer";
			return false;
		};
	},
	
	//unblockTextSelection
	unblockTextSelection : function() {
		document.onselectstart = function () {
			document.body.style.cursor = "default";
			return true;
		};
	}

};

var debug = {
		
	//log
	log : function(info) {
		//document.getElementById('debug').innerHTML += '<br><br>' + info;
		document.getElementById('debug').innerHTML += '<br><br><strong>==>&nbsp;&nbsp;</strong> ' + info;
		
	}

};

var string = {
	condense : function(str, len, strCase ){		
		str = String(str);
		var s = str.replace(/\W/g, "");
		var l = s.substr(0, len);
		var finalStr;
		if (strCase == "upper"){
			finalStr = l.toUpperCase()
		} else {
			finalStr = l.toLowerCase() 
		}
		return finalStr;
	}
};

var ajax = {
	'requestObj' : null,
	'isBusy' : false,
	
	grabFile : function(file, fct, format) {
		if (ajax.isBusy) {
			ajax.requestObj.onreadystatechange = function () {};
			ajax.requestObj.abort();
			ajax.data = null;
		}
		ajax.requestObj = ajax.getHTTPObject();
		if (ajax.requestObj) {
			ajax.requestObj.onreadystatechange = function() {
				ajax.parseResponse(ajax.requestObj, fct);
			};
			ajax.requestObj.open("GET", file, true);
			ajax.isBusy = true;
			ajax.requestObj.send(null);
		}
	},
	
	getHTTPObject : function() {
		var xhr = false;
		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			try {
				xhr = new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e) {
				try {
					xhr = new ActiveXObject("Microsoft.XMLHTTP");
				} catch(e) {
					xhr = false;
				}
			}
		}
		return xhr;
	},
	
	parseResponse : function(request, fct) {
		if (request.readyState == 4) {
			if (request.status == 200 || request.status == 304) {
				ajax.data = eval('(' + request.responseText + ')');
				ajax.isBusy = false;
				console.log( ajax.data );
				if (fct != null) { fct.call(); }
			}
		}
	},
	
	abort : function() {
		if ( typeof(ajax.requestObj) == 'object' ){
			ajax.requestObj.onreadystatechange = function() {};
			ajax.requestObj.abort();
		} else {
			return;
		}
	},
	
	data : {}
};

var flash = {
	'isIE' : (navigator.appVersion.indexOf("MSIE") != -1) ? true : false,
	'isWin' : (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false,
	'isOpera' : (navigator.userAgent.indexOf("Opera") != -1) ? true : false,
	
	controlVersion : function() {
		var version;
		var axo;
		var e;
		try {
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
			version = axo.GetVariable("$version");
		} catch (e) {
		}
		if (!version) {
			try {
				axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
				version = "WIN 6,0,21,0";
				axo.AllowScriptAccess = "always";
				version = axo.GetVariable("$version");
			} catch (e) {
			}
		}
		if (!version) {
			try {
				axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
				version = axo.GetVariable("$version");
			} catch (e) {
			}
		}
		if (!version) {
			try {
				axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
				version = "WIN 3,0,18,0";
			} catch (e) {
			}
		}
		if (!version) {
			try {
				axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
				version = "WIN 2,0,0,11";
			} catch (e) {
				version = -1;
			}
		}
		return version;
	},

	getSwfVersion : function () {
        var flashVer = -1;
		if (navigator.plugins != null && navigator.plugins.length > 0) {
			if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
				var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
				var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;
				var descArray = flashDescription.split(" ");
				var tempArrayMajor = descArray[2].split(".");
				var versionMajor = tempArrayMajor[0];
				var versionMinor = tempArrayMajor[1];
				var versionRevision = descArray[3];
				if (versionRevision == "") { versionRevision = descArray[4]; }
				if (versionRevision[0] == "d") {
					versionRevision = versionRevision.substring(1);
				} else if (versionRevision[0] == "r") {
					versionRevision = versionRevision.substring(1);
					if (versionRevision.indexOf("d") > 0) { versionRevision = versionRevision.substring(0, versionRevision.indexOf("d")); }
				}
				var flashVer = versionMajor + "." + versionMinor + "." + versionRevision;
			}
		} else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) {
			flashVer = 4;
		} else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) {
			flashVer = 3;
		} else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) {
			flashVer = 2;
		} else if ( flash.isIE && flash.isWin && !flash.isOpera ) {
			flashVer = flash.controlVersion();
		}
		return flashVer;
    },

	detectVersion : function(reqMajorVer, reqMinorVer, reqRevision) {
		versionStr = flash.getSwfVersion();
		if (versionStr == -1 ) {
			return false;
		} else if (versionStr != 0) {
			if (flash.isIE && flash.isWin && !flash.isOpera) {
				tempArray = versionStr.split(" ");
				tempString = tempArray[1];
				versionArray = tempString.split(",");
			} else {
				versionArray = versionStr.split(".");
			}
			var versionMajor      = versionArray[0];
			var versionMinor      = versionArray[1];
			var versionRevision   = versionArray[2];
			if (versionMajor > parseFloat(reqMajorVer)) {
				return true;
			} else if (versionMajor == parseFloat(reqMajorVer)) {
				if (versionMinor > parseFloat(reqMinorVer)) {
					return true;
				} else if (versionMinor == parseFloat(reqMinorVer)) {
					if (versionRevision >= parseFloat(reqRevision)) { return true; }
				}
			}
			return false;
		}
	}
}