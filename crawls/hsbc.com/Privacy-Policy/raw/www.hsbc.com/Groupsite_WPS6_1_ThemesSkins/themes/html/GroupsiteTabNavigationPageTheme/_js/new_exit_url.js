var ns = (navigator.appName.indexOf("Netscape") != -1);
var d = document;
var windowUrl;

/*
* createNode(t, p)
* creates a DOM node and appends it to a parent node
* t:	String - tag name of element to be added
* p:	Node to append new node into
* Returns:	New node
*/
function createNode (t,p){
	var n = document.createElement(t);
	return p.appendChild(n);
}


/*
* openWindow()
* open the link in new window and clear the content
* Returns:	Nothing
*/
function openWindow(){
	window.open(windowUrl);
	closePopUp();
}

/*
* createPopup(url,type)
* create the popup at run time
* url:	lnik that need to be open in new window
* Returns:	Nothing
*/
function createPopup(url,type){
	var contentDiv ;
	var blankDiv ;
	windowUrl = url;
	type=type;

	if(document.getElementById('light1') == null){
		
		var contentDiv = createNode('div',document.body);
		var blankDiv = createNode('div',document.body);

		contentDiv.id="light1";
		blankDiv.id="fade1";
		blankDiv.innerHTML = '';
		
	}else{
		
		contentDiv = document.getElementById('light1');
		blankDiv = document.getElementById('fade1');
	}			

	if(type == '1'){

		str = "This link may direct you to another HSBC Group website. Please read the terms and conditions of the linked website, which may differ from the terms and conditions of HSBC.com Inc's website.";

	}else if(type == '2'){

		str = "This link may direct you to a non-HSBC website. HSBC.com Inc has no control over the linked website and is not liable for your use of it.";

	}

	contentDiv.innerHTML = "<h2>You are leaving HSBC.com </h2><p>"+str+"</p><p><img src='/1/content/images/common/link_arrow.gif' alt='Open link in a new window' width='18' height='18' />&nbsp;&nbsp;&nbsp;<a href='javascript:openWindow()'>Open link in a new window</a></p><p><img src='/1/content/images/common/link_arrow.gif' alt='Close this window and return to HSBC.com' width='18' height='18' />&nbsp;&nbsp;&nbsp;<a href='javascript:closePopUp()'>Close this window and return to HSBC.com</a></p>";
	contentDiv.className = "white_content";
	blankDiv.className = "black_overlay";
	JSFX_FloatDiv("light1", 100,200).floatIt();


	document.getElementById('light1').style.display='block';
	var dims = getWinSize();
	var blank = document.getElementById('fade1');
	var scrY = window.scrollY||document.documentElement.scrollTop||document.body.scrollTop;
	var _left = Math.max((dims[0]-blank.offsetWidth)/2,0)+'px';
	var _top = Math.max((dims[1]-blank.offsetHeight)/2+scrY,0)+'px';
	var docSize = getDocSize();

	document.getElementById('fade1').style.width = docSize[0]+"px";
	document.getElementById('fade1').style.height = docSize[1]+"px";
	document.getElementById('fade1').style.display='block';
	return;
}

/*
* getWinSize()
* gets the size of the window
* Returns:	Array of dimensions
*/
function getWinSize() {
			var w = 0;
			var h = 0;
			if(window.innerWidth) {
				w = window.innerWidth;
				h = window.innerHeight;
			}
			else if(document.documentElement.clientWidth) {
				w = document.documentElement.clientWidth;
				h = document.documentElement.scrollHeight;
			}
			else if(document.body.clientWidth) {
				w = document.body.clientWidth;
				h = document.body.scrollHeight;
			}
			return [w,h];
}

/*
* closePopUp()
* Remove the display content from body
* Returns:	Nothing
*/
function closePopUp(){

	document.getElementById('light1').style.display='none';
	document.getElementById('fade1').style.display='none';
}

/*
* removeClass(o,c)
* remove a class from an element
* o:	Node to remove class from
* c:	String - class to remove
* Returns:	Nothing
*/
function removeClass(o,c) {
		var p = new RegExp("(^| )" + c + "( |$)");
		o.className = o.className.replace(p, "$1");
		o.className = o.className.replace(/ $/, "");
}

/*
* getDocSize()
* gets the size of the document, if the document is shorter than the window, returns window height
* Returns:	Array of dimensions
*/
function getDocSize() {
		var dims = this.getWinSize();
		var w = dims[0];
		var h = dims[1];
		w = Math.max(w,document.body.offsetWidth);
		w = Math.max(w,document.documentElement.offsetWidth);
		h = Math.max(h,document.body.offsetHeight);
		h = Math.max(h,document.documentElement.offsetHeight);
		h = Math.max(h,document.documentElement.scrollHeight);
		h = Math.max(h,document.body.scrollHeight);
		return [w,h];
}

/*
* JSFX_FloatDiv(id, sx, sy)
* for float the content div in a screen
* id:	Node to be float
* sx:	top location in screen
* sy:   Left location in screen
* Returns: elment
*/
function JSFX_FloatDiv(id, sx, sy)
{
	var el=d.getElementById?d.getElementById(id):d.all?d.all[id]:d.layers[id];
	var px = document.layers ? "" : "px";
	window[id + "_obj"] = el;
	if(d.layers)el.style=el;
	el.cx = el.sx = sx;el.cy = el.sy = sy;
	el.sP=function(x,y){this.style.left=x+px;this.style.top=y+px;};

	el.floatIt=function()
	{
		var pX, pY;
		pX = (this.sx >= 0) ? 0 : ns ? innerWidth :
		document.documentElement && document.documentElement.clientWidth ?
		document.documentElement.clientWidth : document.body.clientWidth;
		pY = ns ? pageYOffset : document.documentElement && document.documentElement.scrollTop ?
		document.documentElement.scrollTop : document.body.scrollTop;
		if(this.sy<0)
		pY += ns ? innerHeight : document.documentElement && document.documentElement.clientHeight ?
		document.documentElement.clientHeight : document.body.clientHeight;
		this.cx += (pX + this.sx - this.cx)/8;this.cy += (pY + this.sy - this.cy)/8;
		this.sP(this.cx, this.cy);
		setTimeout(this.id + "_obj.floatIt()", 40);
	}
	return el;
}


