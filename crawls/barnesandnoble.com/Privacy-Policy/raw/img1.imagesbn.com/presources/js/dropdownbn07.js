var isSafari=false;
if ( navigator.vendor && navigator.vendor.indexOf("Apple")!=-1) isSafari=true;
/*suckerFish dropdowns: http://www.htmldog.com/articles/suckerfish/dropdowns/*/
/*ie only*/
// Created a long, long time ago by Tanny O'Haley
// Update history.
// 24 Oct 2006 - Added to http://tanny.ica.com
// 14 Jul 2006 - Modified the way the iframe is added to the DOM. I no longer use
//			innerHTML but use DOM methods.
// 15 Sep 2006 - Added a check to see if the target element onmouseout is contained
//			in the onmouseout element. If it is then I dont' remove the
//			sfhover class. I made use of the Microsoft proprietary
//			obj.contains() method.
//		 Added check to make sure that the sfhover class is not already in
//			the li element.
//
sfHover = function() {
	// Support the standard nav without a class of nav.
	var div = document.getElementById("hb-nav") || undefined;

	if(!div){
		return false;
	}

	var el = div.firstChild;
	if(!/\bnav\b/.test(el.className) && el.tagName == "UL")
		setHover(el);

	// Find all unordered lists.
	var ieNavs = document.getElementsByTagName('ul');
	for(i=0; i<ieNavs.length; i++) {
		var ul = ieNavs[i];
		// If they have a class of nav add the menu hover.
		if(/\bnav\b/.test(ul.className))
			setHover(ul);
	}

}

function setHover(nav) {
	var ieULs = nav.getElementsByTagName('ul');
	if (navigator.appVersion.substr(22,3)!="5.0") {
		// IE script to cover <select> elements with <iframe>s
		for (j=0; j<ieULs.length; j++) {
			var ieMat=document.createElement('iframe');
			if(document.location.protocol == "https:")
				ieMat.src="//0";
			else if(window.opera != "undefined")
				ieMat.src="";
			else
				ieMat.src="javascript:false";
			ieMat.scrolling="no";
			ieMat.frameBorder="0";
			ieMat.style.width=ieULs[j].offsetWidth+"px";
			ieMat.style.height=ieULs[j].offsetHeight+"px";
			ieMat.style.zIndex="-1";
			ieULs[j].insertBefore(ieMat, ieULs[j].childNodes[0]);
			ieULs[j].style.zIndex="101";

		}
		// IE script to change class on mouseover
		var ieLIs = nav.getElementsByTagName('li');
		for (var i=0; i<ieLIs.length; i++) if (ieLIs[i]) {
			// Add a sfhover class to the li.
			ieLIs[i].onmouseover=function() {
				if(!/\bsfhover\b/.test(this.className))
					this.className+=" sfhover";
			}
			ieLIs[i].onmouseout=function() {
				if(!this.contains(event.toElement))
					this.className=this.className.replace(' sfhover', '');
			}
		}
	} else {
		// IE 5.0 doesn't support iframes so hide the select statements on hover and show on mouse out.
		// IE script to change class on mouseover
		var ieLIs = document.getElementById('nav').getElementsByTagName('li');
		for (var i=0; i<ieLIs.length; i++) if (ieLIs[i]) {
			ieLIs[i].onmouseover=function() {this.className+=" sfhover";hideSelects();}
			ieLIs[i].onmouseout=function() {this.className=this.className.replace(' sfhover', '');showSelects()}
		}
	}
}

// If IE 5.0 hide and show the select statements.
function hideSelects(){
	var oSelects=document.getElementsByTagName("select");
	for(var i=0;i<oSelects.length;i++)
		oSelects[i].className+=" hide";
}

function showSelects(){
	var oSelects=document.getElementsByTagName("select");
	for(var i=0;i<oSelects.length;i++)
		oSelects[i].className=oSelects[i].className.replace(" hide","");
}

// Run this only for IE.
if (window.attachEvent) window.attachEvent('onload', sfHover);
// end
function initNav () {
	var x = document.getElementsByTagName('img');
	for(var i = 0; i < x.length; i++){
		if(x[i].className != 'rollOver') continue;

			var newSrc = x[i].src.substring(0, x[i].src.lastIndexOf('.'));
			newSrc += "_roll.gif";
			x[i].newSrc = newSrc;
			x[i].origSrc = x[i].src;

			x[i].onmouseover = function() {
			    if (this.src.indexOf("_on.gif") < 0)
				    this.src = this.newSrc;
		}
			x[i].onmouseout = function() {
				this.src = this.origSrc;
		}

	}
	var y = document.getElementById('rollover-menu');
	if (y) {
	    var imgId = y.getAttribute('image');
	    var img = document.getElementById(imgId);
	    var newSrc = img.src.substring(0, img.src.lastIndexOf('.'));
			    newSrc += "_roll.gif";
	    y.newSrc = newSrc;
	    y.origSrc = img.src;
	    y.onmouseover = function () {
		        if (img.src.indexOf("_on.gif") < 0)
			        img.src = this.newSrc;
		    }
	    y.onmouseout = function () {
		    img.src = this.origSrc;
	    }
	}
	if(isSafari) {
		z = getElementsByClassName(document.getElementById("hb-nav"), "hb-more");
		if(z[0]) {
			z[0].onmouseover = function () {
				hideFlash();
			}
			z[0].onmouseout = function () {
				showFlash();
			}
		}
	}
}
function hideFlash() {
	if(isSafari && document.getElementById('bnbanner')) {
		document.getElementById('bnbanner').style.visibility = "hidden";
	}
}
function showFlash() {
	if(isSafari && document.getElementById('bnbanner')) {
		document.getElementById('bnbanner').style.visibility = "visible";
	}
}
function output(msg) {
	document.getElementById("output").innerHTML = msg;
}
function getElementsByClassName(node, classname){
	var a = [];
	var re = new RegExp('\\b' + classname + '\\b');
	var els = node.getElementsByTagName("*");
	for(var i=0,j=els.length; i<j; i++)
		if(re.test(els[i].className))a.push(els[i]);
	return a;
}
addEventSimple(window,"load",initNav);
function addEventSimple(obj,evt,fn) {
	if (obj.addEventListener)
		obj.addEventListener(evt,fn,false);
	else if (obj.attachEvent)
		obj.attachEvent('on'+evt,fn);
}
// JavaScript Document