/*
ADOBE CONFIDENTIAL
Copyright 2005 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  All information contained herein is, and remains the property of Adobe Systems Incorporated and its suppliers,
if any.  The intellectual and technical concepts contained herein are proprietary to Adobe Systems Incorporated and its
suppliers and may be covered by U.S. and Foreign Patents, patents in process, and are protected by trade secret or 
copyright law. Dissemination of this information or reproduction of this material is strictly forbidden unless prior 
written permission is obtained from Adobe Systems Incorporated.
*/

function SjTextLoader() {
	this._id = SjTextLoader._cnt ++;
	this.req = null;
	this.tid=null;
	this.text=null;
	this.IFrameDoc=null;
	this.first = false;
	this.json = false;
	this.counter = 0;
	SjTextLoader.all[this._id] = this;
	if( document.childNodes && document.createElement ) {
		sjCreateDiv(null,"datadiv"+this._id);
		var dname="datadiv"+this._id;
		var lname="loader"+this._id;
		var str=' <div id='+dname+' style="position:absolute;visibility:hidden"><iframe src="about:blank" id='+lname+' name='+lname+' onload=""></iframe> </div> ';
		sjSetLayerHTML("datadiv"+this._id,str);
	}
}

SjTextLoader.prototype.load = function(inURL,firstLoading) {
	if (inURL.indexOf("json") >= 0){
		this.json = true;
		tljson = this;
		//inURL = inURL.substring(inURL.indexOf(S7Config.isRoot)+S7Config.isRoot.length,inURL.indexOf("?"));
		sjLoadCtx(tljson,inURL);
		this.counter = 0;
		clearInterval(this.tid);
	}else{
		this.json = false;
		if (!firstLoading){
			if (window.XMLHttpRequest) {//native XMLHttpRequest object
				this.req = new XMLHttpRequest();
				eval('this.req.onreadystatechange = function() { SjTextLoader.all[' + this._id + ']._onLoadText(); }');
				this.req.open("GET", inURL, true);
				this.req.send(null);
			}else {
				var elm=sjGetElement("loader" + this._id);
				if (elm){
					if (typeof elm.src != 'undefined')
						elm.src = inURL;
					else if (typeof elm.location != 'undefined')
						elm.location = inURL;
					this.tid=setInterval(this+'.checkLoad()', 100);
				}
			} 
		}else{
			image = new Object;
			metadata = new Object;//for future
			protocol = new Object;//for future
			context = new Object;//for future
			this.first = true;
			document.write("<script language='javascript' src='" + inURL+  ",javascript'></" + "script>");
			this.tid=setInterval(this+'.checkLoad()', 100);
		}
	}
};

SjTextLoader.prototype._onLoadText = function() {
	if (this.req.readyState == 4) {//"loaded";0 = uninitialized 1 = loading 2 = loaded 3 = interactive 4 = complete
		if (this.req.status == 200) {//"OK" Numeric code returned by server, such as 404 for "Not Found" or 200 for "OK"
			this.text = this.req.responseText;
			if (this.onLoadText){
				this.onLoadText();
			}
        } else {
            //alert("There was a problem retrieving data:\n" + this.req.statusText);
            alert(sj_resource.getResource("%THERE_WAS_A_PROBLEM_RETRIEVING_DATA%:\n") + this.req.statusText);
        }
    }
};

function dumpProps(obj,obj_name) {
	var str = "", i ="";
	for (i in obj)
	str += obj_name +"."+ i +" = "+ obj[i] +"\n";
	return str;
}

SjTextLoader.prototype.checkLoad = function() {
	if (this.first == true){
		if (image.rect) {
			this.text = dumpProps(image,"image");
			if (metadata){
				this.text += dumpProps(metadata,"metadata");
			}
			if (protocol){
				this.text += dumpProps(protocol,"protocol");
			}
			if (context){
				this.text += dumpProps(context,"context");
			}
			if (this.onLoadText){
				this.onLoadText();
			}
			this.counter = 0;
			clearInterval(this.tid);
		}else{
			if (this.counter < 100){
				this.counter++;
			}else{
				alert(sj_resource.getResource('%ERROR_LOADING_CONTEXT%!'));
				this.counter = 0;
				clearInterval(this.tid);
			}
		}
	}else{
		var elm=sjGetElement("loader" + this._id);
		if (elm != null)
		if(document.frames){
		 if(document.frames[elm.name]) { this.IFrameDoc=document.frames[elm.name].document } // For IE5
		}else if (elm.contentDocument) { this.IFrameDoc=elm.contentDocument } //For NS6
		 else if (elm.contentWindow) { this.IFrameDoc=elm.contentWindow.document } //For IE5.5
		else{
			alert(sj_resource.getResource('%PROBLEMS%.....'));
			clearInterval(this.tid);
			return true;
		}
		var inf = sjGetTextContent(this.IFrameDoc);
		if (inf){
			this.text = inf;
			if (this.onLoadText){
				this.onLoadText();
			}
			clearInterval(this.tid);
		}
	}
}

SjTextLoader.prototype.clearText = function(txt) {
	var testText = txt;
	if ((testText != null) && (testText != '')) {
	    var result = testText;
	    var teg=testText.substring(testText.indexOf("<"),testText.indexOf(">")+1);
		var idx = testText.indexOf(teg);
		while (idx != -1) {
			result = result.substring(0, idx) + '' + result.substring(idx + teg.length);
			testText=result;
		    idx=-1;
			teg=testText.substring(testText.indexOf("<"),testText.indexOf(">")+1);
			if (teg!=''){
		     idx = testText.indexOf(teg);
			 result=testText;
			}
		}
 	    
		testText=testText.replace("&lt;","<"); 
		testText=testText.replace("&gt;",">"); 
		this.text = testText;
	}
	return this.text;
}

SjTextLoader.prototype.toString = function() {
	return 'SjTextLoader.all[' + this._id + ']';
};

SjTextLoader.all = [];
SjTextLoader._cnt = 0;

//private functions and variables
var sjCallbacks=new Object();//!global variable MUST be created !
var sjErrCallbacks=new Object();//!global variable MUST be created !

function sjGetResponse(inReq, inImg, inCallback, inErrCallback) {
	var urljson = "";
	var tempi = inImg.indexOf("?");
	if(tempi >= 0){
		urljson = inImg + '&' + inReq;
	}else{
		urljson = inImg + '?' + inReq;
	}
	var id = sjHashCode(urljson);
	urljson += '&id=' + id;
	if (typeof inCallback != 'undefined'){
		sjCallbacks[id] = inCallback;
	}
	if (typeof inErrCallback != 'undefined'){
		sjErrCallbacks[id] = inErrCallback;
	}
    var oScript = document.getElementById('sjScript_'+id);
    if (oScript) {
		document.getElementsByTagName("head")[0].removeChild(oScript);
	}
    oScript = document.createElement('script');
	oScript.type = 'text/javascript';
	oScript.id= 'sjScript_'+id;
    oScript.src= urljson;
	if (typeof oScript!="undefined"){
		document.getElementsByTagName("head")[0].appendChild(oScript);
	}
}

function s7jsonResponse(inArg, inId) {
	sjCallbacks[inId](inArg);
}

function s7jsonError(inArg, inId) {
	if (typeof sjErrCallbacks[inId] != 'undefined'){
		sjErrCallbacks[inId](inArg);
	}else{
		alert(inArg.message);
	}
}

function sjDebug(inPsResponse, inJsonResponse, inPsResponseParserName, inPsRequest) {
}

function sjHashCode(d) {//unix style
	if (!d || d=="") return 1;
	var h=0,g=0;
	for (var i=d.length-1;i>=0;i--) {
		var c=parseInt(d.charCodeAt(i));
		h=((h << 6) & 0xfffffff) + c + (c << 14);
		if ((g=h & 0xfe00000)!=0) h=(h ^ (g >> 21));
	}
	return h;
}

function sjLoadCtx(tl,inURL) {
	sjGetResponse(
		'req=ctx,json&scl=1',
		inURL,
		function(inArg) {
			tl.text = dumpProps(inArg,"");
			if (tl.onLoadText){
				tl.onLoadText();
			}
		},
		function(inArg) {
			//alert('failed loading ctx for image [' + inURL + ']: ' + inArg.message);
		}
	);
}

function sjAddAreaToMap(inMap,inArg) {
    var oMap = document.getElementById(inMap);
	if (typeof oMap != "undefined"){
		var oArea = document.createElement('area');
		oArea.shape = inArg.shape;
		oArea.coords = inArg.coords;
		oArea.href = inArg.href;
		oArea.alt = inArg.alt;
		oArea.title = inArg.alt;
		oArea.setAttribute("origcoords",oArea.coords);
		oArea.setAttribute("rollover_key",inArg.rollover_key);
		if (typeof oArea != "undefined"){
			oMap.appendChild(oArea);
		}
	}
}

function sjLoadMap(inImage,inSclX,inSclY,inId,inCallback) {
	sjGetResponse(
		'req=map,json&scl=1',
		inImage,
		function(inArg) {
			var oMap = document.getElementById("s7map_"+inId);
			if (inArg != null) {
					if ((typeof oMap != "undefined")&&(oMap != null)){
						for (var k = oMap.childNodes.length-1; k >= 0 ; k--) {
							oMap.removeChild(oMap.childNodes[k])
						}
						for (var i = 0; i < inArg.length; i ++) {
							sjAddAreaToMap("s7map_"+inId,inArg[i]);
						}
						sjResetMap("s7map_"+inId);
						sjZoomMap ("s7map_"+inId,inSclX,inSclY);
						inCallback();
					}
				} else {
					if (typeof oMap != "undefined"){
						for (var k = oMap.childNodes.length-1; k >= 0 ; k--) {
							oMap.removeChild(oMap.childNodes[k])
						}
					}
				}
		},
		function(inArg) {
			//alert('failed loading map for image [' + inImage + ']: ' + inArg.message);
		}
	);
}