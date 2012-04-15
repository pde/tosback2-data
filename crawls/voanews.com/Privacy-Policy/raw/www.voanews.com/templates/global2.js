/*VOANews.com 12.17.08*/

//Table of Content
//01.Magic Box Tabs: Images as Tabs
//02.Magic Box Tabs: Text as Tabs
//03.Side Navigation: Expandable List
//04. Dreamweaver javascript for rollover images
//05. Function for Striping Tables
//06. UFO  
//07. transparent png for ie6 or less
//08.Side Content: Expandable List
//09.Media Links: javascript pop-up window function

/*------------	01.Magic Box Tabs: Images as Tabs ------------ */

function showContents(div){

    var num = div.charAt(4);
    
    /* Hide All Divs */
    for (var i = 1; i < 6; i++) {
        document.getElementById("news" + i).style.display = "none";
    }
    
    /* Set all the Tabs to Off */
    document.getElementById('tab1').src = 'http://media.voanews.com/designimages/tabs-portal-en-off.gif';
    document.getElementById('tab2').src = 'http://media.voanews.com/designimages/tabs-portal-ch-off.gif';
    document.getElementById('tab3').src = 'http://media.voanews.com/designimages/tabs-portal-ru-off.gif';
    document.getElementById('tab4').src = 'http://media.voanews.com/designimages/tabs-portal-pe-off.gif';
    document.getElementById('tab5').src = 'http://media.voanews.com/designimages/tabs-portal-es-off.gif';
    
    
    // Show the clicked Div
    document.getElementById(div).style.display = "block";
    
    // Set the Tab to On
    switch (num) {
        case '1':
            document.getElementById('tab1').src = 'http://media.voanews.com/designimages/tabs-portal-en-on.gif';
            break;
        case '2':
            document.getElementById('tab2').src = 'http://media.voanews.com/designimages/tabs-portal-ch-on.gif';
            break;
        case '3':
            document.getElementById('tab3').src = 'http://media.voanews.com/designimages/tabs-portal-ru-on.gif';
            break;
        case '4':
            document.getElementById('tab4').src = 'http://media.voanews.com/designimages/tabs-portal-pe-on.gif';
            break;
        case '5':
            document.getElementById('tab5').src = 'http://media.voanews.com/designimages/tabs-portal-es-on.gif';
            break;
    }
    
}

/*------------	02.Magic Box Tabs: Text as Tabs ------------ */

/*	Magic Box JavaScript 
 Used on News Landing Pages
 Usage: Can use as many tabs as is practical, but divs need to be named
 in ascending order (1 through X) in tabBoxOpen(X), NewsTabLinkX, and
 newsTabContentX (where X is the number).
 
 Basic HTML:
 <div class="newsTabsBox">
 <div id="newsTabs">
 <a href="javascript:tabBoxOpen(1)" id="NewsTabLink1" class="tabOn">Show Tab 1</a>
 <a href="javascript:tabBoxOpen(2)" id="NewsTabLink2">Show Tab 2</a>
 <a href="javascript:tabBoxOpen(3)" id="NewsTabLink3">Show Tab 3</a>
 </div>
 <div class="newsTabContents" id="newsTabContent1">
 Tabs contents 1
 </div>
 <div class="newsTabContentsOff" id="newsTabContent2">
 Tabs contents 2
 </div>
 <div class="newsTabContentsOff" id="newsTabContent3">
 Tabs contents 3
 </div>
 </div>
 CSS styles needed (see main.css):
 .tabOn {  }
 .newsTabContentOff { display: hidden; }
 */
function tabBoxOpen(tabId){
    // Turn tab contents off/on 
    var i = 1;
    while (document.getElementById("newsTabContent" + i)) {
        if (i != tabId) 
            document.getElementById("newsTabContent" + i).className = "newsTabContentsOff";
        else 
            document.getElementById("newsTabContent" + i).className = "newsTabContents";
        i++;
    }
    i = 1;
    // Turn tabs off/on
    while (document.getElementById("NewsTabLink" + i)) {
        if (i != tabId) 
            document.getElementById("NewsTabLink" + i).className = "";
        else 
            document.getElementById("NewsTabLink" + i).className = "tabOn";
        i++;
    }
}


/*------------	03.Side Navigation: Expandable List ------------ */
function openMoreTopics(){
    var obj1 = window.document.getElementById('sideNavMoreTopics');
    var obj2 = window.document.getElementById('sideNavMoreTopicsLink');
    if (obj1.className == 'expandableLeftNav') 
        obj1.className = 'expandableLeftNavOpen';
    else 
        obj1.className = 'expandableLeftNav';
    if (obj2.className == 'expandLink') 
        obj2.className = 'expandLinkOpen';
    else 
        obj2.className = 'expandLink';
}



/*------------ 04. Dreamweaver javascript for rollover images ------------ */

function MM_preloadImages(){ //v3.0
    var d = document;
    if (d.images) {
        if (!d.MM_p) 
            d.MM_p = new Array();
        var i, j = d.MM_p.length, a = MM_preloadImages.arguments;
        for (i = 0; i < a.length; i++) 
            if (a[i].indexOf("#") != 0) {
                d.MM_p[j] = new Image;
                d.MM_p[j++].src = a[i];
            }
    }
}

function MM_swapImgRestore(){ //v3.0
    var i, x, a = document.MM_sr;
    for (i = 0; a && i < a.length && (x = a[i]) && x.oSrc; i++) 
        x.src = x.oSrc;
}

function MM_findObj(n, d){ //v4.01
    var p, i, x;
    if (!d) 
        d = document;
    if ((p = n.indexOf("?")) > 0 && parent.frames.length) {
        d = parent.frames[n.substring(p + 1)].document;
        n = n.substring(0, p);
    }
    if (!(x = d[n]) && d.all) 
        x = d.all[n];
    for (i = 0; !x && i < d.forms.length; i++) 
        x = d.forms[i][n];
    for (i = 0; !x && d.layers && i < d.layers.length; i++) 
        x = MM_findObj(n, d.layers[i].document);
    if (!x && d.getElementById) 
        x = d.getElementById(n);
    return x;
}

function MM_swapImage(){ //v3.0
    var i, j = 0, x, a = MM_swapImage.arguments;
    document.MM_sr = new Array;
    for (i = 0; i < (a.length - 2); i += 3) 
        if ((x = MM_findObj(a[i])) != null) {
            document.MM_sr[j++] = x;
            if (!x.oSrc) 
                x.oSrc = x.src;
            x.src = a[i + 2];
        }
}


/*------------ 05. Function for Striping Tables ------------ */
// CREDIT FOR THIS SCRIPT: Matthew Pennell
// URL: http://www.thewatchmakerproject.com

var Event = {
    add: function(obj, type, fn){
        if (obj.attachEvent) {
            obj['e' + type + fn] = fn;
            obj[type + fn] = function(){
                obj['e' + type + fn](window.event);
            }
            obj.attachEvent('on' + type, obj[type + fn]);
        }
        else 
            obj.addEventListener(type, fn, false);
    },
    remove: function(obj, type, fn){
        if (obj.detachEvent) {
            obj.detachEvent('on' + type, obj[type + fn]);
            obj[type + fn] = null;
        }
        else 
            obj.removeEventListener(type, fn, false);
    }
}

function alternating(){
    var tablestripes = new Array();
    for (var i = 0; i < arguments.length; i++) {
        var tablestripe = arguments[i];
        if (typeof tablestripe == 'string') 
            tablestripe = document.getElementById(tablestripe);
        if (arguments.length == 1) 
            return tablestripe;
        stripes.push(tablestripe);
    }
    return tablestripes;
}

String.prototype.trim = function(){
    return this.replace(/^\s+|\s+alternating/, "");
}

function addClassName(el, className){
    removeClassName(el, className);
    el.className = (el.className + " " + className).trim();
}

function removeClassName(el, className){
    el.className = el.className.replace(className, "").trim();
}

var ZebraTable = {
    bgcolor: '',
    classname: '',
    stripe: function(el){
        if (!alternating(el)) 
            return;
        var rows = alternating(el).getElementsByTagName('tr');
        for (var i = 1, len = rows.length; i < len; i++) {
            if (i % 2 == 0) 
                rows[i].className = 'alt';
            Event.add(rows[i], 'mouseover', function(){
                ZebraTable.mouseover(this);
            });
            Event.add(rows[i], 'mouseout', function(){
                ZebraTable.mouseout(this);
            });
        }
    },
    mouseover: function(row){
        this.bgcolor = row.style.backgroundColor;
        this.classname = row.className;
        addClassName(row, 'over');
    },
    mouseout: function(row){
        removeClassName(row, 'over');
        addClassName(row, this.classname);
        row.style.backgroundColor = this.bgcolor;
    }
}

window.onload = function(){
    ZebraTable.stripe('programTableTV');
    ZebraTable.stripe('programTableRadio');
    ZebraTable.stripe('webcastTableTV');
    ZebraTable.stripe('webcastTableRadio');
    ZebraTable.stripe('table1');
    ZebraTable.stripe('table2');
    ZebraTable.stripe('table3');
    ZebraTable.stripe('table4');
}


/*------------ 06. UFO ------------ */

/*	Unobtrusive Flash Objects (UFO) v3.22 <http://www.bobbyvandersluis.com/ufo/>
 Copyright 2005-2007 Bobby van der Sluis
 This software is licensed under the CC-GNU LGPL <http://creativecommons.org/licenses/LGPL/2.1/>
 */
var UFO = {
    req: ["movie", "width", "height", "majorversion", "build"],
    opt: ["play", "loop", "menu", "quality", "scale", "salign", "wmode", "bgcolor", "base", "flashvars", "devicefont", "allowscriptaccess", "seamlesstabbing", "allowfullscreen", "allownetworking"],
    optAtt: ["id", "name", "align"],
    optExc: ["swliveconnect"],
    ximovie: "ufo.swf",
    xiwidth: "215",
    xiheight: "138",
    ua: navigator.userAgent.toLowerCase(),
    pluginType: "",
    fv: [0, 0],
    foList: [],
    
    create: function(FO, id){
        if (!UFO.uaHas("w3cdom") || UFO.uaHas("ieMac")) 
            return;
        UFO.getFlashVersion();
        UFO.foList[id] = UFO.updateFO(FO);
        UFO.createCSS("#" + id, "visibility:hidden;");
        UFO.domLoad(id);
    },
    
    updateFO: function(FO){
        if (typeof FO.xi != "undefined" && FO.xi == "true") {
            if (typeof FO.ximovie == "undefined") 
                FO.ximovie = UFO.ximovie;
            if (typeof FO.xiwidth == "undefined") 
                FO.xiwidth = UFO.xiwidth;
            if (typeof FO.xiheight == "undefined") 
                FO.xiheight = UFO.xiheight;
        }
        FO.mainCalled = false;
        return FO;
    },
    
    domLoad: function(id){
        var _t = setInterval(function(){
            if ((document.getElementsByTagName("body")[0] != null || document.body != null) && document.getElementById(id) != null) {
                UFO.main(id);
                clearInterval(_t);
            }
        }, 250);
        if (typeof document.addEventListener != "undefined") {
            document.addEventListener("DOMContentLoaded", function(){
                UFO.main(id);
                clearInterval(_t);
            }, null); // Gecko, Opera 9+
        }
    },
    
    main: function(id){
        var _fo = UFO.foList[id];
        if (_fo.mainCalled) 
            return;
        UFO.foList[id].mainCalled = true;
        document.getElementById(id).style.visibility = "hidden";
        if (UFO.hasRequired(id)) {
            if (UFO.hasFlashVersion(parseInt(_fo.majorversion, 10), parseInt(_fo.build, 10))) {
                if (typeof _fo.setcontainercss != "undefined" && _fo.setcontainercss == "true") 
                    UFO.setContainerCSS(id);
                UFO.writeSWF(id);
            }
            else 
                if (_fo.xi == "true" && UFO.hasFlashVersion(6, 65)) {
                    UFO.createDialog(id);
                }
        }
        document.getElementById(id).style.visibility = "visible";
    },
    
    createCSS: function(selector, declaration){
        var _h = document.getElementsByTagName("head")[0];
        var _s = UFO.createElement("style");
        if (!UFO.uaHas("ieWin")) 
            _s.appendChild(document.createTextNode(selector + " {" + declaration + "}")); // bugs in IE/Win
        _s.setAttribute("type", "text/css");
        _s.setAttribute("media", "screen");
        _h.appendChild(_s);
        if (UFO.uaHas("ieWin") && document.styleSheets && document.styleSheets.length > 0) {
            var _ls = document.styleSheets[document.styleSheets.length - 1];
            if (typeof _ls.addRule == "object") 
                _ls.addRule(selector, declaration);
        }
    },
    
    setContainerCSS: function(id){
        var _fo = UFO.foList[id];
        var _w = /%/.test(_fo.width) ? "" : "px";
        var _h = /%/.test(_fo.height) ? "" : "px";
        UFO.createCSS("#" + id, "width:" + _fo.width + _w + "; height:" + _fo.height + _h + ";");
        if (_fo.width == "100%") {
            UFO.createCSS("body", "margin-left:0; margin-right:0; padding-left:0; padding-right:0;");
        }
        if (_fo.height == "100%") {
            UFO.createCSS("html", "height:100%; overflow:hidden;");
            UFO.createCSS("body", "margin-top:0; margin-bottom:0; padding-top:0; padding-bottom:0; height:100%;");
        }
    },
    
    createElement: function(el){
        return (UFO.uaHas("xml") && typeof document.createElementNS != "undefined") ? document.createElementNS("http://www.w3.org/1999/xhtml", el) : document.createElement(el);
    },
    
    createObjParam: function(el, aName, aValue){
        var _p = UFO.createElement("param");
        _p.setAttribute("name", aName);
        _p.setAttribute("value", aValue);
        el.appendChild(_p);
    },
    
    uaHas: function(ft){
        var _u = UFO.ua;
        switch (ft) {
            case "w3cdom":
                return (typeof document.getElementById != "undefined" && typeof document.getElementsByTagName != "undefined" && (typeof document.createElement != "undefined" || typeof document.createElementNS != "undefined"));
            case "xml":
                var _m = document.getElementsByTagName("meta");
                var _l = _m.length;
                for (var i = 0; i < _l; i++) {
                    if (/content-type/i.test(_m[i].getAttribute("http-equiv")) && /xml/i.test(_m[i].getAttribute("content"))) 
                        return true;
                }
                return false;
            case "ieMac":
                return /msie/.test(_u) && !/opera/.test(_u) && /mac/.test(_u);
            case "ieWin":
                return /msie/.test(_u) && !/opera/.test(_u) && /win/.test(_u);
            case "gecko":
                return /gecko/.test(_u) && !/applewebkit/.test(_u);
            case "opera":
                return /opera/.test(_u);
            case "safari":
                return /applewebkit/.test(_u);
            default:
                return false;
        }
    },
    
    getFlashVersion: function(){
        if (UFO.fv[0] != 0) 
            return;
        if (navigator.plugins && typeof navigator.plugins["Shockwave Flash"] == "object") {
            UFO.pluginType = "npapi";
            var _d = navigator.plugins["Shockwave Flash"].description;
            if (typeof _d != "undefined") {
                _d = _d.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                var _m = parseInt(_d.replace(/^(.*)\..*$/, "$1"), 10);
                var _r = /r/.test(_d) ? parseInt(_d.replace(/^.*r(.*)$/, "$1"), 10) : 0;
                UFO.fv = [_m, _r];
            }
        }
        else 
            if (window.ActiveXObject) {
                UFO.pluginType = "ax";
                try { // avoid fp 6 crashes
                    var _a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
                } 
                catch (e) {
                    try {
                        var _a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
                        UFO.fv = [6, 0];
                        _a.AllowScriptAccess = "always"; // throws if fp < 6.47 
                    } 
                    catch (e) {
                        if (UFO.fv[0] == 6) 
                            return;
                    }
                    try {
                        var _a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                    } 
                    catch (e) {
                    }
                }
                if (typeof _a == "object") {
                    var _d = _a.GetVariable("$version"); // bugs in fp 6.21/6.23
                    if (typeof _d != "undefined") {
                        _d = _d.replace(/^\S+\s+(.*)$/, "$1").split(",");
                        UFO.fv = [parseInt(_d[0], 10), parseInt(_d[2], 10)];
                    }
                }
            }
    },
    
    hasRequired: function(id){
        var _l = UFO.req.length;
        for (var i = 0; i < _l; i++) {
            if (typeof UFO.foList[id][UFO.req[i]] == "undefined") 
                return false;
        }
        return true;
    },
    
    hasFlashVersion: function(major, release){
        return (UFO.fv[0] > major || (UFO.fv[0] == major && UFO.fv[1] >= release)) ? true : false;
    },
    
    writeSWF: function(id){
        var _fo = UFO.foList[id];
        var _e = document.getElementById(id);
        if (UFO.pluginType == "npapi") {
            if (UFO.uaHas("gecko") || UFO.uaHas("xml")) {
                while (_e.hasChildNodes()) {
                    _e.removeChild(_e.firstChild);
                }
                var _obj = UFO.createElement("object");
                _obj.setAttribute("type", "application/x-shockwave-flash");
                _obj.setAttribute("data", _fo.movie);
                _obj.setAttribute("width", _fo.width);
                _obj.setAttribute("height", _fo.height);
                var _l = UFO.optAtt.length;
                for (var i = 0; i < _l; i++) {
                    if (typeof _fo[UFO.optAtt[i]] != "undefined") 
                        _obj.setAttribute(UFO.optAtt[i], _fo[UFO.optAtt[i]]);
                }
                var _o = UFO.opt.concat(UFO.optExc);
                var _l = _o.length;
                for (var i = 0; i < _l; i++) {
                    if (typeof _fo[_o[i]] != "undefined") 
                        UFO.createObjParam(_obj, _o[i], _fo[_o[i]]);
                }
                _e.appendChild(_obj);
            }
            else {
                var _emb = "";
                var _o = UFO.opt.concat(UFO.optAtt).concat(UFO.optExc);
                var _l = _o.length;
                for (var i = 0; i < _l; i++) {
                    if (typeof _fo[_o[i]] != "undefined") 
                        _emb += ' ' + _o[i] + '="' + _fo[_o[i]] + '"';
                }
                _e.innerHTML = '<embed type="application/x-shockwave-flash" src="' + _fo.movie + '" width="' + _fo.width + '" height="' + _fo.height + '" pluginspage="http://www.macromedia.com/go/getflashplayer"' + _emb + '></embed>';
            }
        }
        else 
            if (UFO.pluginType == "ax") {
                var _objAtt = "";
                var _l = UFO.optAtt.length;
                for (var i = 0; i < _l; i++) {
                    if (typeof _fo[UFO.optAtt[i]] != "undefined") 
                        _objAtt += ' ' + UFO.optAtt[i] + '="' + _fo[UFO.optAtt[i]] + '"';
                }
                var _objPar = "";
                var _l = UFO.opt.length;
                for (var i = 0; i < _l; i++) {
                    if (typeof _fo[UFO.opt[i]] != "undefined") 
                        _objPar += '<param name="' + UFO.opt[i] + '" value="' + _fo[UFO.opt[i]] + '" />';
                }
                var _p = window.location.protocol == "https:" ? "https:" : "http:";
                _e.innerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + _objAtt + ' width="' + _fo.width + '" height="' + _fo.height + '" codebase="' + _p + '//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=' + _fo.majorversion + ',0,' + _fo.build + ',0"><param name="movie" value="' + _fo.movie + '" />' + _objPar + '</object>';
            }
    },
    
    createDialog: function(id){
        var _fo = UFO.foList[id];
        UFO.createCSS("html", "height:100%; overflow:hidden;");
        UFO.createCSS("body", "height:100%; overflow:hidden;");
        UFO.createCSS("#xi-con", "position:absolute; left:0; top:0; z-index:1000; width:100%; height:100%; background-color:#fff; filter:alpha(opacity:75); opacity:0.75;");
        UFO.createCSS("#xi-dia", "position:absolute; left:50%; top:50%; margin-left: -" + Math.round(parseInt(_fo.xiwidth, 10) / 2) + "px; margin-top: -" + Math.round(parseInt(_fo.xiheight, 10) / 2) + "px; width:" + _fo.xiwidth + "px; height:" + _fo.xiheight + "px;");
        var _b = document.getElementsByTagName("body")[0];
        var _c = UFO.createElement("div");
        _c.setAttribute("id", "xi-con");
        var _d = UFO.createElement("div");
        _d.setAttribute("id", "xi-dia");
        _c.appendChild(_d);
        _b.appendChild(_c);
        var _mmu = window.location;
        if (UFO.uaHas("xml") && UFO.uaHas("safari")) {
            var _mmd = document.getElementsByTagName("title")[0].firstChild.nodeValue = document.getElementsByTagName("title")[0].firstChild.nodeValue.slice(0, 47) + " - Flash Player Installation";
        }
        else {
            var _mmd = document.title = document.title.slice(0, 47) + " - Flash Player Installation";
        }
        var _mmp = UFO.pluginType == "ax" ? "ActiveX" : "PlugIn";
        var _uc = typeof _fo.xiurlcancel != "undefined" ? "&xiUrlCancel=" + _fo.xiurlcancel : "";
        var _uf = typeof _fo.xiurlfailed != "undefined" ? "&xiUrlFailed=" + _fo.xiurlfailed : "";
        UFO.foList["xi-dia"] = {
            movie: _fo.ximovie,
            width: _fo.xiwidth,
            height: _fo.xiheight,
            majorversion: "6",
            build: "65",
            flashvars: "MMredirectURL=" + _mmu + "&MMplayerType=" + _mmp + "&MMdoctitle=" + _mmd + _uc + _uf
        };
        UFO.writeSWF("xi-dia");
    },
    
    expressInstallCallback: function(){
        var _b = document.getElementsByTagName("body")[0];
        var _c = document.getElementById("xi-con");
        _b.removeChild(_c);
        UFO.createCSS("body", "height:auto; overflow:auto;");
        UFO.createCSS("html", "height:auto; overflow:auto;");
    },
    
    cleanupIELeaks: function(){
        var _o = document.getElementsByTagName("object");
        var _l = _o.length
        for (var i = 0; i < _l; i++) {
            _o[i].style.display = "none";
            for (var x in _o[i]) {
                if (typeof _o[i][x] == "function") {
                    _o[i][x] = null;
                }
            }
        }
    }
    
};

if (typeof window.attachEvent != "undefined" && UFO.uaHas("ieWin")) {
    window.attachEvent("onunload", UFO.cleanupIELeaks);
}


/*------------ 07. transparent png ------------ */
/* source: http://labs.unitinteractive.com/unitpngfix.php 


 var clear="http://media.voanews.com/designimages/blank.gif" //path to clear.gif


 pngfix=function(){var els=document.getElementsByTagName('*');var ip=/\.png/i;var i=els.length;while(i-- >0){var el=els[i];var es=el.style;if(el.src&&el.src.match(ip)&&!es.filter){es.height=el.height;es.width=el.width;es.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+el.src+"',sizingMethod='crop')";el.src=clear;}else{var elb=el.currentStyle.backgroundImage;if(elb.match(ip)){var path=elb.split('"');var rep=(el.currentStyle.backgroundRepeat=='no-repeat')?'crop':'scale';es.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+path[1]+"',sizingMethod='"+rep+"')";es.height=el.clientHeight+'px';es.backgroundImage='none';var elkids=el.getElementsByTagName('*');if (elkids){var j=elkids.length;if(el.currentStyle.position!="absolute")es.position='static';while (j-- >0)if(!elkids[j].style.position)elkids[j].style.position="relative";}}}}}


 window.attachEvent('onload',pngfix);*/


/*------------	08.Side Content: Expandable List ------------ */

function openMoreSideContent(elmID,htmlTextExpand,htmlTextCollapse)
{
	var obj1 = document.getElementById('sideContentMore'+elmID);
	var obj2 = document.getElementById('sideContentMoreLink'+elmID);
	
	if(obj1.style.display == 'block') 
	{
    		obj1.style.display = 'none';
  	}
	else 
	{
		obj1.style.display = 'block';
	}
	
	if (obj2.className == 'expandable') 
	{
		obj2.className = 'collapsed';
		obj2.innerHTML = htmlTextCollapse;
	}
	else 
	{
		obj2.className = 'expandable';
		obj2.innerHTML = htmlTextExpand;
	}
}
function openMoreComments(elmID,htmlTextExpand,htmlTextCollapse)
{
	var obj1 = document.getElementById('commentsMore'+elmID);
	var obj2 = document.getElementById('commentsMoreLink'+elmID);
	
	if(obj1.style.display == 'block') 
	{
    		obj1.style.display = 'none';
  	}
	else 
	{
		obj1.style.display = 'block';
	}
	
	if (obj2.className == 'commentsMore commentsButton expandable') 
	{
		obj2.className = 'commentsMore commentsButton collapsed';
		obj2.innerHTML = '<span>'+htmlTextCollapse+'</span>';
	}
	else 
	{
		obj2.className = 'commentsMore commentsButton expandable';
		obj2.innerHTML = '<span>'+htmlTextExpand+'</span>';
	}
}

/*------------	09.Media Links: javascript pop-up window function ------------ */

function popMediaWindow(mediaContentID,mediaPath) {
	var fileNameArray=mediaPath.split(".");
	var extension=fileNameArray[fileNameArray.length-1];
	extension = extension.toLowerCase();
	var w=500;
	var h=400; //500
	
	switch (extension) {
		case "mp3":
		case "wma":
			w=550; //310
			h=50; //30
		break;

		case "wmv":
		case "flv":
		case "mov":
		case "mp4":
			w=550;
			h=400; //380
		break;
	}
	
	var winl = (screen.width-w)/2;
	var wint = (screen.height-h)/2;
	settings='height='+h+',width='+w+',top='+wint+',left='+winl+',toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no'
	var fullPath="http://www.voanews.com/templates/mediaDisplay.html?mediaPath="+mediaPath+"&mediaContentID="+mediaContentID;
	win=window.open(fullPath,'Loading',settings)
	if(parseInt(navigator.appVersion) >= 4){win.window.focus();}
	
	return false;
}

function handleStreamClick(topLevelPath,streamIndex, fullURL) {
	
	
	if (navigator.userAgent.indexOf("Macintosh") > 0) {
		window.location=fullURL;
		return true;
	} else {
    	var w=500;
    	var h=400; //500
    	
    	var winl = (screen.width-w)/2;
    	var wint = (screen.height-h)/2;
    	settings='height='+h+',width='+w+',top='+wint+',left='+winl+',toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no'
    	var fullPath="http://www.voanews.com/templates/mediaDisplay.html?stream=1&topLevelPath="+topLevelPath+"&streamIndex="+streamIndex;
    	win=window.open(fullPath,'Loading',settings)
    	if(parseInt(navigator.appVersion) >= 4){win.window.focus();}
		return false;
    }
	
}

/*
var playerObj;
function playerReady(object)
{
	//alert('the player is ready');
	playerObj = document.getElementById(object.id);
	//alert(playerObj);
}

function playMedia(url,imageURL) 
{
   // alert('URL = ' + url);
   // alert(playerObj);
   // playerObj.sendEvent("LOAD",url);
    playerObj.sendEvent("LOAD",{file:url, image:imageURL});
    playerObj.sendEvent("PLAY");
    return true;
}
*/

function displayLoading(element) {
	var loadingDiv = document.createElement("div");
	loadingDiv.setAttribute('id','loadingDiv');
	loadingDiv.innerHTML='<div id=\'loadingImageDiv\'><img src=\'http://media.voanews.com/designimages/loader.gif\' width=\'28\' height=\'28\' alt=\'Loading...\' /></div>';
	element.appendChild(loadingDiv);
}








