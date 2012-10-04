/* =================================================================================================
 * TransMenu 
 * March, 2003
 *
 * Customizable multi-level animated DHTML menus with transparency.
 *
 * Copyright 2003-2004, Aaron Boodman (www.youngpup.net)
 * YoungPup rules da school
 * =================================================================================================
*/

TransMenu.spacerGif = "../images/pixel.gif";
TransMenu.dingbatOn = "../images/tri.gif";
TransMenu.dingbatOff = "../images/tri.gif";
TransMenu.dingbatSize = 5;
TransMenu.menuPadding = 5;
TransMenu.itemPadding = 3;
TransMenu.shadowSize = 2;
TransMenu.shadowOffset = 3;
TransMenu.shadowColor = "#888";
TransMenu.shadowPng = "../images/nav_grey.png";
TransMenu.backgroundColor = "#ffffff";
TransMenu.backgroundPng = "../images/nav_white.png";
TransMenu.hideDelay = 1000;
TransMenu.slideTime = 200;

TransMenu.reference = {topLeft:1,topRight:2,bottomLeft:3,bottomRight:4};
TransMenu.direction = {down:1,right:2};
TransMenu.registry = [];
TransMenu._maxZ = 100;

TransMenu.isSupported = function() {
        var ua = navigator.userAgent.toLowerCase();
        var pf = navigator.platform.toLowerCase();
        var an = navigator.appName;
        var r = false;

        if (ua.indexOf("gecko") > -1 && navigator.productSub >= 20020605) r = true; // gecko >= moz 1.0
        else if (an == "Microsoft Internet Explorer") {
                if (document.getElementById) { // ie5.1+ mac,win
                        if (pf.indexOf("mac") == 0) {
                            r = /msie (\d(.\d*)?)/.test(ua) && Number(RegExp.$1) >= 5.1;
                        }
                        else r = true;
                }
        }

        return r;
}

TransMenu.initialize = function() {
        for (var i = 0, menu = null; menu = this.registry[i]; i++) {
                menu.initialize();
        }
}

TransMenu.renderAll = function() {
        var aMenuHtml = [];
        for (var i = 0, menu = null; menu = this.registry[i]; i++) {
                aMenuHtml[i] = menu.toString();
        }
        document.write(aMenuHtml.join(""));
}

function TransMenu(oActuator, iDirection, iLeft, iTop, iReferencePoint, parentMenuSet) {

        this.addItem = addItem;
        this.addMenu = addMenu;
        this.toString = toString;
        this.initialize = initialize;
        this.isOpen = false;
        this.show = show;
        this.hide = hide;
        this.items = [];

        // events
        this.onactivate = new Function();
        this.ondeactivate = new Function();
        this.onmouseover = new Function();
        this.onqueue = new Function();
        this.ondequeue = new Function();

        // initialization
        this.index = TransMenu.registry.length;
        TransMenu.registry[this.index] = this;

        var id = "TransMenu" + this.index;
        var contentHeight = null;
        var contentWidth = null;
        var childMenuSet = null;
        var animating = false;
        var childMenus = [];
        var slideAccel = -1;
        var elmCache = null;
        var ready = false;
        var _this = this;
        var a = null;

        var pos = iDirection == TransMenu.direction.down ? "top" : "left";
        var dim = null;

        function addItem(sText, sUrl) {
                var item = new TransMenuItem(sText, sUrl, this);
                item._index = this.items.length;
                this.items[item._index] = item;
        }

        function addMenu(oMenuItem) {
                if (!oMenuItem.parentMenu == this) throw new Error("Cannot add a menu here");
				if (childMenuSet == null) childMenuSet = new TransMenuSet(TransMenu.direction.right, -5, 2, TransMenu.reference.topRight);
                var m = childMenuSet.addMenu(oMenuItem);

                childMenus[oMenuItem._index] = m;
                m.onmouseover = child_mouseover;
                m.ondeactivate = child_deactivate;
                m.onqueue = child_queue;
                m.ondequeue = child_dequeue;

                return m;
        }

        function initialize() {
                initCache();
                initEvents();
                initSize();
                ready = true;
        }

        function show() {
                if (ready) {
                        _this.isOpen = true;
                        animating = true;
                        setContainerPos();
                        elmCache["clip"].style.visibility = "visible";
                        elmCache["clip"].style.zIndex = TransMenu._maxZ++;
						slideStart();
                        _this.onactivate();
                }
        }

        function hide() {
                if (ready) {
                        _this.isOpen = false;
                        animating = true;

                        for (var i = 0, item = null; item = elmCache.item[i]; i++) 
                                dehighlight(item);

                        if (childMenuSet) childMenuSet.hide();

                        slideStart();
                        _this.ondeactivate();
                }
        }

        function setContainerPos()
		{
                var sub = oActuator.constructor == TransMenuItem; 
                var act = sub ? oActuator.parentMenu.elmCache["item"][oActuator._index] : oActuator; 
                var el = act;
                
                var x = 0;
                var y = 0;

                
                var minX = 0;
                var maxX = (window.innerWidth ? window.innerWidth : document.body.clientWidth) - parseInt(elmCache["clip"].style.width);
				
                var minY = 0;
                var maxY = (window.innerHeight ? window.innerHeight : document.body.clientHeight) - parseInt(elmCache["clip"].style.height);

                while (sub ? el.parentNode.className.indexOf("transMenu") == -1 : el.offsetParent) {
                        x += el.offsetLeft;
                        y += el.offsetTop;

                        if (el.scrollLeft) x -= el.scrollLeft;
                        if (el.scrollTop) y -= el.scrollTop;
                        
                        el = el.offsetParent;
                }

                if (oActuator.constructor == TransMenuItem) {
                        x += parseInt(el.parentNode.style.left);
                        y += parseInt(el.parentNode.style.top);
                }

                switch (iReferencePoint) {
                        case TransMenu.reference.topLeft:
                                break;
                        case TransMenu.reference.topRight:
                                x += act.offsetWidth;
                                break;
                        case TransMenu.reference.bottomLeft:
                                y += act.offsetHeight;
                                break;
                        case TransMenu.reference.bottomRight:
                                x += act.offsetWidth;
                                y += act.offsetHeight;
                                break;
                }
				//  Begin fix for Safari 1.2 Submenu Positions

				if (act.tagName == "TR" && act.childNodes[0] && act.childNodes[1] && act.offsetWidth == 0 && act.offsetHeight == 0)
				{
				    switch (iReferencePoint)
				    {
				        case TransMenu.reference.topLeft:
			                break;
				
				        case TransMenu.reference.topRight:
				                x += act.childNodes[1].offsetLeft + act.childNodes[1].offsetWidth;
				                y += act.childNodes[0].offsetTop;
			                break;
				
				        case TransMenu.reference.bottomLeft:
				                y += act.childNodes[0].offsetTop + act.childNodes[0].offsetHeight;
				                break;
				
				        case TransMenu.reference.bottomRight:
				            x += act.childNodes[1].offsetLeft + act.childNodes[1].offsetWidth;
				            y += act.childNodes[0].offsetTop + act.childNodes[0].offsetHeight;
				            break;
				    }
				}
				
				//  End fix for Safaria 1.2 Submenu Positions
				
                x += iLeft;
                y += iTop;

                x = Math.max(Math.min(x, maxX), minX);
                y = Math.max(Math.min(y, maxY), minY);

                elmCache["clip"].style.left = x + "px";
                elmCache["clip"].style.top = y + "px";
				
        }

        function slideStart() {
                var x0 = parseInt(elmCache["content"].style[pos]);
                var x1 = _this.isOpen ? 0 : -dim;
                if (a != null) a.stop();
                a = new Accelimation(x0, x1, TransMenu.slideTime, slideAccel);

                a.onframe = slideFrame;
                a.onend = slideEnd;

                a.start();
        }

        function slideFrame(x) {
                elmCache["content"].style[pos] = x + "px";
        }

        function slideEnd() {
                if (!_this.isOpen) elmCache["clip"].style.visibility = "hidden";
                animating = false;
        }

        function initSize() {
                var ow = elmCache["items"].offsetWidth;
                var oh = elmCache["items"].offsetHeight;
                var ua = navigator.userAgent.toLowerCase();

                elmCache["clip"].style.width = ow + TransMenu.shadowSize +  2 + "px";
                elmCache["clip"].style.height = oh + TransMenu.shadowSize + 2 + "px";

                elmCache["content"].style.width = ow + TransMenu.shadowSize + "px";
                elmCache["content"].style.height = oh + TransMenu.shadowSize + "px";

                contentHeight = oh + TransMenu.shadowSize;
                contentWidth = ow + TransMenu.shadowSize;
               
                dim = iDirection == TransMenu.direction.down ? contentHeight : contentWidth;

                elmCache["content"].style[pos] = -dim - TransMenu.shadowSize + "px";
                elmCache["clip"].style.visibility = "hidden";

                // if *not* mac/ie 5
                if (ua.indexOf("mac") == -1 || ua.indexOf("gecko") > -1 ) {

                        elmCache["background"].style.width = ow + "px";
                        elmCache["background"].style.height = oh + "px";
                        elmCache["background"].style.backgroundColor = TransMenu.backgroundColor;

                        elmCache["shadowRight"].style.left = ow + "px";
                        elmCache["shadowRight"].style.height = oh - (TransMenu.shadowOffset - TransMenu.shadowSize) + "px";
                        elmCache["shadowRight"].style.backgroundColor = TransMenu.shadowColor;

                        elmCache["shadowBottom"].style.top = oh + "px";
                        elmCache["shadowBottom"].style.width = ow - TransMenu.shadowOffset + "px";
                        elmCache["shadowBottom"].style.backgroundColor = TransMenu.shadowColor;
                }
                // mac ie is a little different because we use a PNG for the transparency
                else {
                        elmCache["background"].firstChild.src = TransMenu.backgroundPng;
                        elmCache["background"].firstChild.width = ow;
                        elmCache["background"].firstChild.height = oh;

                        elmCache["shadowRight"].firstChild.src = TransMenu.shadowPng;
                        elmCache["shadowRight"].style.left = ow + "px";
                        elmCache["shadowRight"].firstChild.width = TransMenu.shadowSize;
                        elmCache["shadowRight"].firstChild.height = oh - (TransMenu.shadowOffset - TransMenu.shadowSize);

                        elmCache["shadowBottom"].firstChild.src = TransMenu.shadowPng;
                        elmCache["shadowBottom"].style.top = oh + "px";
                        elmCache["shadowBottom"].firstChild.height = TransMenu.shadowSize;
                        elmCache["shadowBottom"].firstChild.width = ow - TransMenu.shadowOffset;
                }
        }
        
        function initCache() {
                var menu = document.getElementById(id);
                var all = menu.all ? menu.all : menu.getElementsByTagName("*"); // IE/win doesn't support * syntax, but does have the document.all thing

                elmCache = {};
                elmCache["clip"] = menu;
                elmCache["item"] = [];
                
                for (var i = 0, elm = null; elm = all[i]; i++) {
                        switch (elm.className) {
                                case "items":
                                case "content":
                                case "background":
                                case "shadowRight":
                                case "shadowBottom":
                                        elmCache[elm.className] = elm;
                                        break;
                                case "item":
                                        elm._index = elmCache["item"].length;
                                        elmCache["item"][elm._index] = elm;
                                        break;
                        }
                }
                _this.elmCache = elmCache;
        }

        function initEvents() {
                for (var i = 0, item = null; item = elmCache.item[i]; i++) {
                        item.onmouseover = item_mouseover;
                        item.onmouseout = item_mouseout;
                        item.onclick = item_click;
                }

                if (oActuator != null && typeof oActuator.tagName != "undefined") {
                        oActuator.onmouseover = actuator_mouseover;
                        oActuator.onmouseout = actuator_mouseout;
                }

                elmCache["content"].onmouseover = content_mouseover;
                elmCache["content"].onmouseout = content_mouseout;
        }

        function highlight(oRow) {
                oRow.className = "item hover";
                if (childMenus[oRow._index]) 
                        oRow.lastChild.firstChild.src = TransMenu.dingbatOn;
        }

        function dehighlight(oRow) {
                oRow.className = "item";
                if (childMenus[oRow._index]) 
                        oRow.lastChild.firstChild.src = TransMenu.dingbatOff;
        }

        function item_mouseover() {
                if (!animating) {
                        highlight(this);

                        if (childMenus[this._index]) 
                                childMenuSet.showMenu(childMenus[this._index]);
                        else if (childMenuSet) childMenuSet.hide();
                }
        }

        function item_mouseout() {
                if (!animating) {
                        if (childMenus[this._index])
                                childMenuSet.hideMenu(childMenus[this._index]);
                        else    // otherwise child_deactivate will do this
                                dehighlight(this);
                }
        }
        function item_click() {
				var sort_param = readCookie("productSort");
                if (!animating) {
                        if (_this.items[this._index].url) 
                        	if ((sort_param != "" || sort_param != "null") && ((_this.items[this._index].url.indexOf("family")>-1) || _this.items[this._index].url.indexOf("search")>-1)) {
                        		var url = _this.items[this._index].url;
                        		location.href = url + "&s=" + sort_param;
                        	} else {
								location.href = _this.items[this._index].url;
                            }
                }
        }

        function actuator_mouseover() {
                _this.mouseIsOver = true;
          		window.setTimeout(actuator_pause,200);
        }

		function actuator_pause(){
        		if (_this.mouseIsOver == true){
            		parentMenuSet.showMenu(_this);
          		}
        }

        function actuator_mouseout() {
                _this.mouseIsOver = false;
          		parentMenuSet.hideMenu(_this);
        }

        function content_mouseover() {
                if (!animating) {
                        parentMenuSet.showMenu(_this);
                        _this.onmouseover();
                }
        }

        function content_mouseout() {
                if (!animating) {
                        parentMenuSet.hideMenu(_this);
                }
        }

        function child_mouseover() {
                if (!animating) {
                        parentMenuSet.showMenu(_this);
                }
        }

        function child_deactivate() {
                for (var i = 0; i < childMenus.length; i++) {
                        if (childMenus[i] == this) {
                                dehighlight(elmCache["item"][i]);
                                break;
                        }
                }
        }

        function child_queue() {
                parentMenuSet.hideMenu(_this);
        }

        function child_dequeue() {
                parentMenuSet.showMenu(_this);
        }

        function toString() {
                var aHtml = [];
				if(oActuator == null) {
					sClassName = "transMenu"+"";
				} else {
					var sClassName = "transMenu" + (oActuator.constructor != TransMenuItem ? " top" : "");
				}
                
                for (var i = 0, item = null; item = this.items[i]; i++) 
				{
                        aHtml[i] = item.toString(childMenus[i])+"<tr><td height=1 bgcolor=#d8d8d8 colspan=2></td></tr>";
                }
                return '<div id="' + id + '" class="' + sClassName + '">' + 
                        '<div class="content"><table class="items" cellpadding="0" cellspacing="0" border="0">' + 
						'<tr><td colspan="2"><img src="' + TransMenu.spacerGif + '" width="1" alt="" height="' + TransMenu.menuPadding + '"></td></tr>' + 
                        aHtml.join('') + 
                        '<tr><td colspan="2"><img src="' + TransMenu.spacerGif + '" width="1" alt="" height="' + TransMenu.menuPadding + '"></td></tr></table>' + 
                        '<div class="shadowBottom"><img src="' + TransMenu.spacerGif + '" width="1" alt="" height="1"></div>' + 
                        '<div class="shadowRight"><img src="' + TransMenu.spacerGif + '" width="1" alt="" height="1"></div>' + 
                		'<div class="background"><img src="' + TransMenu.spacerGif + '" width="1" alt="" height="1"></div>' + 
                    	'</div></div>';
        }
}

TransMenuSet.registry = [];

function TransMenuSet(iDirection, iLeft, iTop, iReferencePoint) {

        this.addMenu = addMenu;
        this.showMenu = showMenu;
        this.hideMenu = hideMenu;
        this.hide = hide;
        this.hideCurrent = hideCurrent;

        var menus = [];
        var _this = this;
        var current = null;

        this.index = TransMenuSet.registry.length;
        TransMenuSet.registry[this.index] = this;

        function addMenu(oActuator) {
                var m = new TransMenu(oActuator, iDirection, iLeft, iTop, iReferencePoint, this);
                menus[menus.length] = m;
                return m;
        }

        function showMenu(oMenu) {
                if (oMenu != current) {
                        if (current != null) hide(current);        

                        current = oMenu;

						oMenu.show();
                }
                else {
                        cancelHide(oMenu);
                }
        }

        function hideMenu(oMenu) {
                if (current == oMenu && oMenu.isOpen) {
                        if (!oMenu.hideTimer) scheduleHide(oMenu);
                }
        }

        function scheduleHide(oMenu) {
                oMenu.onqueue();
                oMenu.hideTimer = window.setTimeout("TransMenuSet.registry[" + _this.index + "].hide(TransMenu.registry[" + oMenu.index + "])", TransMenu.hideDelay);
        }

        function cancelHide(oMenu) {
                if (oMenu.hideTimer) {
                        oMenu.ondequeue();
                        window.clearTimeout(oMenu.hideTimer);
                        oMenu.hideTimer = null;
                }
        }

        function hide(oMenu) {   
                if (!oMenu && current) oMenu = current;

                if (oMenu && current == oMenu && oMenu.isOpen) {
                        hideCurrent();
                }
        }

        function hideCurrent() {
                cancelHide(current);
                current.hideTimer = null;
                current.hide();
                current = null;
        }
}

function TransMenuItem(sText, sUrl, oParent) {
        this.toString = toString;
        this.text = sText;
        this.url = sUrl;
        this.parentMenu = oParent;

        function toString(bDingbat) {
                var sDingbat = bDingbat ? TransMenu.dingbatOff : TransMenu.spacerGif;
                var iEdgePadding = TransMenu.itemPadding + TransMenu.menuPadding;
                var sPaddingLeft = "padding:" + TransMenu.itemPadding + "px; padding-left:" + iEdgePadding + "px;"
                var sPaddingRight = "padding:" + TransMenu.itemPadding + "px; padding-right:" + iEdgePadding + "px;"

                return '<tr onMouseover="this.style.backgroundColor=\'#570202\';" onMouseOut="this.style.backgroundColor=\'#ffffff\';"><td nowrap class="item">' + 
                        sText + '<img src="' + sDingbat + '" width="5" alt="" height="5"></td></tr>';
        }
}

//=====================================================================
// bezier functions lifted from the lib_animation.js file in the 
// 13th Parallel API. www.13thparallel.org
//=====================================================================

function Accelimation(from, to, time, zip) {
    if (typeof zip  == "undefined") zip  = 0;
    if (typeof unit == "undefined") unit = "px";

        this.x0         = from;
        this.x1        = to;
    this.dt        = time;
    this.zip    = -zip;
    this.unit    = unit;
    this.timer    = null;
    this.onend    = new Function();
        this.onframe    = new Function();
}

Accelimation.prototype.start = function() {
    this.t0 = new Date().getTime();
    this.t1 = this.t0 + this.dt;
    var dx    = this.x1 - this.x0;
    this.c1 = this.x0 + ((1 + this.zip) * dx / 3);
    this.c2 = this.x0 + ((2 + this.zip) * dx / 3);
    Accelimation._add(this);
}

Accelimation.prototype.stop = function() {
    Accelimation._remove(this);
}

Accelimation.prototype._paint = function(time) {
    if (time < this.t1) {
        var elapsed = time - this.t0;
            this.onframe(Accelimation._getBezier(elapsed/this.dt,this.x0,this.x1,this.c1,this.c2));
        }
    else this._end();
}

Accelimation.prototype._end = function() {
    Accelimation._remove(this);
        this.onframe(this.x1);
    this.onend();
}

Accelimation._add = function(o) {
    var index = this.instances.length;
    this.instances[index] = o;
    if (this.instances.length == 1) {
        this.timerID = window.setInterval("Accelimation._paintAll()", this.targetRes);
    }
}

Accelimation._remove = function(o) {
    for (var i = 0; i < this.instances.length; i++) {
        if (o == this.instances[i]) {
            this.instances = this.instances.slice(0,i).concat( this.instances.slice(i+1) );
            break;
        }
    }
    if (this.instances.length == 0) {
        window.clearInterval(this.timerID);
        this.timerID = null;
    }
}

Accelimation._paintAll = function() {
    var now = new Date().getTime();
    for (var i = 0; i < this.instances.length; i++) {
        this.instances[i]._paint(now);
    }
}

Accelimation._B1 = function(t) { return t*t*t }
Accelimation._B2 = function(t) { return 3*t*t*(1-t) }
Accelimation._B3 = function(t) { return 3*t*(1-t)*(1-t) }
Accelimation._B4 = function(t) { return (1-t)*(1-t)*(1-t) }

Accelimation._getBezier = function(percent,startPos,endPos,control1,control2) {
    return endPos * this._B1(percent) + control2 * this._B2(percent) + control1 * this._B3(percent) + startPos * this._B4(percent);
}

Accelimation.instances = [];
//3.14.05, playing with accelimation. Original value:10
Accelimation.targetRes = 5;
Accelimation.timerID = null;


//=====================================================================
// IE win memory cleanup
//=====================================================================

if (window.attachEvent) {
    var cearElementProps = [
        'data',
        'onmouseover',
        'onmouseout',
        'onmousedown',
        'onmouseup',
        'ondblclick',
        'onclick',
        'onselectstart',
        'oncontextmenu'
    ];

    window.attachEvent("onunload", function() {
        var el;
        for(var d = document.all.length;d--;){
            el = document.all[d];
            for(var c = cearElementProps.length;c--;){
                el[cearElementProps[c]] = null;
            }
        }
    });
}

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	WCH.js - Windowed Controls Hider v3.10
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	(c) Copyright 2003, Aleksandar Vacic, aleck@sezampro.yu, www.aplus.co.yu
	## This work is licensed under the Creative Commons Attribution-ShareAlike License.
	## To view a copy of this license, visit http://creativecommons.org/licenses/by-sa/1.0/ or send a letter to Creative Commons, 559 Nathan Abbott Way, Stanford, California 94305, USA
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	Credits: Mike Foster for x functions (cross-browser.com)
	Credits: Tim Connor for short and sweet way of dealing with IE5.0 - dynamic creation of style rule (www.infosauce.com)
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	Based on idea presented by Joe King. Works with IE5.0+/Win
	IE 5.5+: place iFrame below the layer to hide windowed controls
	IE 5.0 : hide/show all elements that have "WCHhider" class
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/

var WCH_Constructor = function() {
	//	exit point for anything but IE5.0+/Win
	if ( !(document.all && document.getElementById && !window.opera && navigator.userAgent.toLowerCase().indexOf("mac") == -1) ) {
		this.Apply = function() {};
		this.Discard = function() {};
		return;
	}

	//	private properties
	var _bIE55 = false;
	var _bIE6 = false;
	var _oRule = null;
	var _bSetup = true;
	var _oSelf = this;

	//	public: hides windowed controls
	this.Apply = function(vLayer, vContainer, bResize) {
		if (_bSetup) _Setup();

		if ( _bIE55 && (oIframe = _Hider(vLayer, vContainer, bResize)) ) {
			oIframe.style.visibility = "visible";
		} else if(_oRule != null) {
			_oRule.style.visibility = "hidden";
		}

	};

	//	public: shows windowed controls
	this.Discard = function(vLayer, vContainer) {
		if ( _bIE55 && (oIframe = _Hider(vLayer, vContainer, false)) ) {
			oIframe.style.visibility = "hidden";
		} else if(_oRule != null) {
			_oRule.style.visibility = "visible";
		}
	};

	//	private: returns iFrame reference for IE5.5+
	function _Hider(vLayer, vContainer, bResize) {
		var oLayer = _GetObj(vLayer);
		var oContainer = ( (oTmp = _GetObj(vContainer)) ? oTmp : document.getElementsByTagName("body")[0] );
		if (!oLayer || !oContainer) return;
		//	is it there already?
		var oIframe = document.getElementById("WCHhider" + oLayer.id);
		
		//	if not, create it
		if ( !oIframe ) {
			//	IE 6 has this property, IE 5 not. IE 5.5(even SP2) crashes when filter is applied, hence the check
			var sFilter = (_bIE6) ? "filter:progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0);" : "";
			//	get z-index of the object
			var zIndex = oLayer.style.zIndex;
			if ( zIndex == "" ) zIndex = oLayer.currentStyle.zIndex;
			zIndex = parseInt(zIndex);
			//	if no z-index, do nothing
			if ( isNaN(zIndex) ) return null;
			//	if z-index is below 2, do nothing (no room for Hider)
			if (zIndex < 2) return null;
			//	go one step below for Hider
			zIndex--;
			var sHiderID = "WCHhider" + oLayer.id;
			oContainer.insertAdjacentHTML("afterBegin", '<iframe class="WCHiframe" src="javascript:false;" id="' + sHiderID + '" scroll="no" frameborder="0" style="position:absolute;visibility:hidden;' + sFilter + 'border:0;top:0;left;0;width:0;height:0;background-color:#ccc;z-index:' + zIndex + ';"></iframe>');
			oIframe = document.getElementById(sHiderID);
			//	then do calculation
			_SetPos(oIframe, oLayer);
		} else if (bResize) {
			//	resize the iFrame if asked
			_SetPos(oIframe, oLayer);
		}
		return oIframe;
	};

	//	private: set size and position of the Hider
	function _SetPos(oIframe, oLayer) {
		//	fetch and set size
		oIframe.style.width = oLayer.offsetWidth + "px";
		oIframe.style.height = oLayer.offsetHeight + "px";
		//	move to specified position
		oIframe.style.left = oLayer.offsetLeft + "px";
		oIframe.style.top = oLayer.offsetTop + "px";
	};

	//	private: returns object reference
	function _GetObj(vObj) {
		var oObj = null;
		switch( typeof(vObj) ) {
			case "object":
				oObj = vObj;
				break;
			case "string":
				oObj = document.getElementById(vObj);
				break;
		}
		return oObj;
	};

	//	private: setup properties on first call to Apply
	function _Setup() {
		_bIE55 = (typeof(document.body.contentEditable) != "undefined");
		_bIE6 = (typeof(document.compatMode) != "undefined");

		if (!_bIE55) {
			if (document.styleSheets.length == 0)
				document.createStyleSheet();
			var oSheet = document.styleSheets[0];
			oSheet.addRule(".WCHhider", "visibility:visible");
			_oRule = oSheet.rules(oSheet.rules.length-1);
		}

		_bSetup = false;
	};
};
var WCH = new WCH_Constructor();