var newWindow = null;

function closeWin(){
	if (newWindow != null){
		if(!newWindow.closed)
			newWindow.close();
	}
}

function popUpWin(url, type, strWidth, strHeight){
	
	closeWin();
		
	type = type.toLowerCase();
	
	if (type == "fullscreen"){
		strWidth = screen.availWidth;
		strHeight = screen.availHeight;
	}
	var tools="";
	if (type == "standard") tools = "resizable,toolbar=yes,location=yes,scrollbars=yes,menubar=yes,width="+strWidth+",height="+strHeight+",top=0,left=0";
	if (type == "console" || type == "fullscreen") tools = "resizable,toolbar=no,location=no,scrollbars=yes,width="+strWidth+",height="+strHeight+",left=0,top=0";
	if (type == "console-noscroll") tools = "resizable,toolbar=no,location=no,scrollbars=no,width="+strWidth+",height="+strHeight+",left=0,top=0";
	newWindow = window.open(url, 'newWin', tools);
	newWindow.focus();
}

function doPopUp(e)
{
//set defaults - if nothing in rel attrib, these will be used
var t = "standard";
var w = "780";
var h = "580";
//look for parameters
if (this.rel != null) {
  attribs = this.rel.split(" ");
}
else {
  attribs = this.target.split(" ");
}
if (attribs[1]!=null) {t = attribs[1];}
if (attribs[2]!=null) {w = attribs[2];}
if (attribs[3]!=null) {h = attribs[3];}
//call the popup script
popUpWin(this.href,t,w,h);
//cancel the default link action if pop-up activated
if (window.event) 
	{
	window.event.returnValue = false;
	window.event.cancelBubble = true;
	} 
else if (e) 
	{
	e.stopPropagation();
	e.preventDefault();
	}
}

function findPopUps()
{
var popups = document.getElementsByTagName("a");

for (i=0;i<popups.length;i++)
	{
	if (popups[i].rel.indexOf("popup")> -1)
		{
		// attach popup behaviour
		popups[i].onclick = doPopUp;
		// add popup indicator		
		// add info to title attribute to alert fact that it's a pop-up window
		popups[i].title = popups[i].title + " [Opens in pop-up window]";
		}
	}
	
var areapop = document.getElementsByTagName("area");
for (i=0;i<areapop.length;i++)
	{
	if (areapop[i].target.indexOf("popup")> -1)
		{
		// attach popup behaviour
		areapop[i].onclick = doPopUp;		
		// add info to title attribute to alert fact that it's a pop-up window
		areapop[i].title += " [Opens in pop-up window]";
		}
	}

}



addEvent(window, 'load', findPopUps, false);


// added from add-event.js

function addEvent(elm, evType, fn, useCapture){if(elm.addEventListener){elm.addEventListener(evType, fn, useCapture);return true;}else if (elm.attachEvent){var r = elm.attachEvent('on' + evType, fn);return r;}else{elm['on' + evType] = fn;}}



// old popup function for onclick event
function popup(url, w, h) {
	var option = 'menubar=0,toolbars=0,scrollbars=1,status=0,';
	var wo = 'width=' + w;
	var ho = ',height=' + h;
	option = option + wo + ho;
	thepopup = window.open(url,'new',option);
	thepopup.moveTo(100,100);

}