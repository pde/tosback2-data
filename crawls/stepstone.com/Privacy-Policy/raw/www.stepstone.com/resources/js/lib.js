var debug = true; 
var ErrorMessages = []; // new Array()
var dosetRoundedCorners = true;
var ShowAlerts = false;
var prototypeAvailable = false;
var ConsoleAvailable = false;

/**
 * Debug log wrapper
 * Uses console.log if available, otherwise alerts the log messages
 * Use when building functions
 * @param {String} msg
 */
function log(msg){
    if (ErrorMessages && typeof ErrorMessages == 'object') {
        ErrorMessages.push(msg);
    }
}

/**
 * Show gathered messages in one alert
 * Use this to output intermediate log messages in the code on execution
 * @param {String} msg
 */
function dump(msg){
    if (msg != null && msg.length > 0) {
        //old_alerts = alerts;
        alerts = msg;
    }
    else {
        for (var i = 0; i < ErrorMessages.length; i++) {
            alerts += ErrorMessages[i] + '\r\n';
        }
    }
    if (debug) {
        // use console if available? Works in FireFox firebug, Safari 3
        if (window.console && console.log) {
            console.log(alerts);
        }
        else {
            // opera alternative
            if (window.opera && opera.postError) {
                opera.postError(alerts);
            }
            else {
                // only alert if requested
                if (window.alert && ShowAlerts) {
                    alert(alerts);
                }
            }
        }
    }
}

/**
 * Create a browser popup window
 *
 * @param {String} url
 * @param {String} name
 * @param {String} w
 * @param {String} h
 * @param {String} scroll
 * @param {String} menubar
 */
function PopUp(url, name, w, h, scroll, menubar){
    var Window = null;
    LeftPosition = (screen.width) ? (screen.width - w) / 2 : 0;
    TopPosition = (screen.height) ? (screen.height - h) / 2 : 0;
    if(menubar == null){
		menubar = 0;
	}
	settings = 'height=' + h + ',width=' + w + ',top=' + TopPosition + ',left=' + LeftPosition + ',scrollbars=' + scroll+',resizable=1,menubar=' + menubar;
	Window = window.open(url, "_blank", settings);
    
}

function OpenWindow(URL) {
	var MyPopupWindow = window.open(URL,"Window","scrollbars=1,status=1,toolbar=0,menubar=1,resizable=1");
}

/**
 * Simple load handler
 * @param {Object} func
 */
function addLoadEvent(func){
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    }
    else {
        window.onload = function(){
            if (oldonload) {
                oldonload();
            }
            func();
        }
    }
}

/**
 *	aliases for addLoadEvent
 */
addloadevent = addLoadEvent;
RegisterOnLoad = addLoadEvent;
addLoadListener = addLoadEvent;

//DOM ready watcher - scripting by brothercake -- http://www.brothercake.com/
function domFunction(f, a){
    var n = 0;
    var t = setInterval(function(){
        var c = true;
        n++;
        if (typeof document.getElementsByTagName != 'undefined' && (document.getElementsByTagName('body')[0] != null || document.body != null)) {
            c = false;
            if (typeof a == 'object') {
                for (var i in a) {
                    if ((a[i] == 'id' && document.getElementById(i) == null) ||
                    (a[i] == 'tag' && document.getElementsByTagName(i).length < 1)) {
                        c = true;
                        break;
                    }
                }
            }
            if (!c) {
                f();
                clearInterval(t);
            }
        }
        if (n >= 60) {
            clearInterval(t);
        }
    }, 250);
};

/**
 * Get Elements by classname
 * @param {Object} classname
 * @param {Object} node
 */
function getElementsByClassName(classname, node){
    if (!node) 
        node = document.getElementsByTagName("body")[0];
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for (var i = 0, j = els.length; i < j; i++) 
        if (re.test(els[i].className)) 
            a.push(els[i]);
    return a;
}

/**
 *	Adds divs in side a container that can be positioned and styled using css.
 *	These divs will be positioned in the top left, top right, bottom left and bottom right corner of the block element.
 *	This of course requires the styles to be defined.
 */
function CreateRoundedCorners(className, containerId){
    //dump("CreateRoundedCorners");
	var className = (className != null) ? className : "rounded";
    var containerId = (containerId != null) ? containerId : "container"; // PageContent only add the rounded corners to the elements in this container with the assigned classname
    var allcorners = '<div class="topleft"><!-- tl --></div><div class="topright"><!-- tr --></div><div class="bottomleft"><!-- bl --></div><div class="bottomright"><!-- br --></div>';
    var topcorners = '<div class="topleft"><!-- tl --></div><div class="topright"><!-- tr --></div>';
    var bottomcorners = '<div class="bottomleft"><!-- bl --></div><div class="bottomright"><!-- br --></div>';
    var corners = allcorners;
	var els;
	var container = document.getElementById(containerId);
	if(typeof container == 'undefined') return false;
	
	els = getElementsByClassName(className, container);
	
	if(typeof els == "object"){	
		
		for (var i = 0, j = els.length; i < j; i++) {
			
			if(typeof Element != 'undefined' && typeof Element.insert == 'function'){
				// uses Prototype
				Element.insert(els[i], corners);
			}else if(typeof $ != 'undefined'){
				// uses jquery
				$(els[i]).append(corners);
			}else{
				// dangerous because we lose the elements if we copy the html "raw"
				els[i].innerHTML = els[i].innerHTML + corners;
			}
		}
	
	}	
		
}

function SetRoundedCorners(){
    CreateRoundedCorners();
}

// set rounded corners / create the divs when the dom is loaded
if (dosetRoundedCorners) {	
	var rounding = new domFunction(function(){
		if (!document.getElementById('footer')) return false;
		CreateRoundedCorners();
    }, {
        'footer': 'id' // execute the function when this element is loaded
    });
}

/**
* Calculate the height of an iframe's content
* Auto-resize an ifame depending on it's content
* Add this to the onload handler of the iframe tag
* Only works when iframe source is on the same domain!
* @param {Object} el The iframe to check
*/
function calcHeight(el,minHeight,minWidth){

	var f,c,minHeight,minWidth,fHeight,fWidth,newHeight,newWidth;	
	var name = 'calcHeight';
	var extraHeight = 50;
	var extraWidth = 50;
	
	var setHeight = true;
	var setWidth = true;
	
   minHeight = typeof(minHeight) != 'undefined' ? minHeight : 600;
   minWidth = typeof(minWidth) != 'undefined' ? minWidth : 740;
   
   newHeight = minHeight;
	newWidth = minWidth;
	fHeight = minHeight;
	fWidth = minWidth;
	
   f = document.getElementById(el);
	
	if (typeof f == 'undefined' || f.tagName.toLowerCase() != 'iframe') {
		log(name + ' : invalid target element');
		return false;
	}
	
	// find the main content element to set the as well to make the iframe fit nicely
	c = (document.getElementById("Content")) ? document.getElementById("Content") : document.getElementById("content");
	
	if(c == null){
		// try to find the "jobcontent" container, fail back to "container"
		c = (document.getElementById("jobcontent")) ? document.getElementById("jobcontent") : document.getElementById("container");
	}
	
	//log(name + ' : ' + f.id + ' / tagName: ' + f.tagName);
   
	// fallbacks for iframe height check
	if(setHeight){
		f.style.height = fHeight + "px";
		f.style.minHeight = fHeight + "px";
		f.setAttribute('height',fHeight);
		log(name + ' : iframe style.height set to ' + f.style.height);
	}
	
	if(setWidth){
		f.style.width = fWidth + "px";
		f.setAttribute('width',fWidth);
		log(name + ' : iframe style.width set to ' + f.style.width);
	}

	try{    
		//reset the iframe border
		f.setAttribute("frameBorder","0");
		
		//sets frameborder for IE
		try	{
			f.frameBorder = 0;
		} catch (e) {
			//continue
		}	
		
		// FireFox exception
       var getFFVersion = navigator.userAgent.substring(navigator.userAgent.indexOf("Firefox")).split("/")[1]
       var FFextraHeight = parseFloat(getFFVersion) >= 0.1 ? 32 : 0 //extra height in px to add to iframe in FireFox 1.0+ browsers
       
		// calc height of the iframe
		//try{			
			
       	if (f.contentDocument && f.contentDocument.body.scrollHeight) {
               //log(name + ' : ns6 syntax trying body.scrollHeight');
               newHeight = f.contentDocument.body.scrollHeight + extraHeight;
               newWidth = f.contentDocument.body.scrollWidth + extraWidth;
                   
           } else if (f.contentDocument && f.contentDocument.documentElement.offsetHeight) {
               //log(name + ' : ns6 syntax trying documentElement.offsetHeight');
               newHeight = f.contentDocument.documentElement.offsetHeight + extraHeight;
               newWidth = f.contentDocument.documentElement.offsetWidth + extraWidth;
               
           } else if (f.contentDocument && f.contentDocument.body.offsetHeight) {
           	//log(name + ' : ns6 syntax trying body.offsetHeight');
           	newHeight = f.contentDocument.body.offsetHeight + FFextraHeight + extraHeight;
               newWidth = f.contentDocument.body.offsetWidth + extraWidth;
               
           } else if (f.Document && f.Document.body.scrollHeight) { //ie5+ syntax                   
               //log(name + ' : ie5+ syntax trying body.scrollHeight');
               newHeight = f.Document.body.scrollHeight + extraHeight;
               newWidth = f.Document.body.scrollWidth;
               
           } else {
              // log(name + " error: problem getting the frame body dimensions");
           }

			
		//}catch(e){			
		//	return false;
		//}	        

       // set new width and heighy only if it's higher or equal the min width & height
		//log(name + ' : fHeight: ' + newHeight + ' minHeight: ' + minHeight + ' / fWidth: ' + newWidth + ' minWidth: ' + minWidth);
		
		fHeight = (parseInt(newHeight) >= parseInt(minHeight)) ? newHeight : minHeight;
		fWidth = (parseInt(newWidth) >= parseInt(minWidth)) ? newWidth : minWidth;
		
		//log(name + ' : fHeight: ' + fHeight + ' / fWidth: ' + fWidth);
		
		if(setHeight){
			f.style.height = fHeight + "px";
			f.style.minHeight = fHeight + "px";		
			f.setAttribute('height',fHeight);
			//log(name + ' : iframe height set to ' + fHeight);
		}
		
		if(setWidth){
			f.style.width = fWidth + "px";
			f.setAttribute('width',fWidth);
			//log(name + ' : iframe width set to ' + fWidth);
		}		
		
		// set the minHeight of #Content
		if (c != null && typeof c == 'object') {
			c.style.minHeight = fHeight + "px";
			//log(name + ' : c.style ok');
		}
		
		return true;   
		
	}catch(err){
		
		//log(name + ' : error : ' + err.description);
		
		if(err.description == 'undefined'){
			f.style.height = minHeight + "px"; // set height to a "save" height		
			//log(name + ' set height to ' + minHeight + 'px');
		}
			
		return false;
		
	}

}


function setiframeheight(iframe){
	var ch,nh;
	ch = $("#wrapper").innerHeight();
	nh = ch - 250 - 60 - 50; // manual heights of other containers
	//dump("height: " + nh + " / iframe: " + iframe + " = " + $("#"+iframe).innerHeight());	
  	$("#"+iframe).css({'height': nh + "px"});
}
