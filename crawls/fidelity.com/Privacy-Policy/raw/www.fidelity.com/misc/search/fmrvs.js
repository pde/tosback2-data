/**
 * @fileoverview This file contains all javascript code that is used to perform measurement.
 */
/** The _VS object sets up the visual sciences stuff. */
var _VS = {};

/**
 * The protocol used to send the visual sciences info to the sensor.
 * Should be http or https.
 */
//_VS.protocol = location.protocol;//override "https:"
_VS.protocol = "https:";

/** The visual sciences version */
_VS.VSVERSION = "VS01.01";

/** The name of the object which provides page specific info. */
_VS.nspace = "vs";

/** Value which is used to determine if visual sciences info must be sent. */
_VS.LOG = "1";

/** assign site code values */
_VS.site = [];

/** Value which is used to determine if link tracking info must be sent */
_VS.site['lt'] = 1;

// Visual Sciences Code - BEGIN
//DO NOT EDIT BELOW
/**
 * Create a new array.
 * @return Array
 */
_VS.NA = function() {
	return [];
};

/**
 * Check if something is defined
 * 
 * @param {Object} v the object to check if it's defined
 * 
 * @return 1 if the object is defined, 0 otherwise.
 */
_VS.D = function(v) {
	return (typeof v!="undefined")?1:0;
};

/**
 * Get the length of the provided object.
 * 
 * @param {Object} a the object to get the length of
 * 
 * @return the length of the object or 0
 */
_VS.L = function(a) {
	return _VS.D(a)?a.length:0;
};

/**
 * get the index of the string b in the string a
 * 
 * @param {String} a the full string
 * @param {String} b the search string
 * @param {int}    c index to start looking for the search string
 * 
 * @return the index the search string appears in the full string
 */
_VS.I = function(a,b,c) {
	return a.indexOf(b,c?c:0);
};

/**
 * get the substring from the string a using the start index b and the end index c.
 * If the start index b is greater than the length of the string an empty string is returned.
 * 
 * @param {String} a the string to get the substring from
 * @param {int} b the start index to get the substring from
 * @param {int} c the end index to get the substring from
 * 
 * @return A substring of the string.
 */
_VS.S = function(a,b,c) {
	return (b>_VS.L(a))?"":a.substring(b,c!=null?c:_IL(a));
};

/**
 * Send a request to the sensor.
 * 
 * @param {url}    a the url to the sensor. Includes the parameters giving details of the event to track
 * @param {Object} b This isn't a parameter. It is a local variable.
 */
_VS.Q = function(a,b) {
	if (_VS.hf == 1)
		_VS.hf = 0;
	else {
		a += "&VSVID=" + Math.random();
		b = _VS.ii;
		
		if (b >= _VS.im)
			_VS.ii = 0;
		
		_VS.ia[b] = "";
		_VS.ia[b] = new Image();
		_VS.ia[b].src = a;
		_VS.ii++;
	}
};

/**
 * adds an event listener to the provided node
 * 
 * @param {Object}   a The node to attach the event to
 * @param {String}   b The event to connect the function to
 * @param {function} c The function to fire when the event is fired
 * @param {int}      d if this is equal to 1 on is added to the parameter b
 */
_VS.EL = function(a,b,c,d) {
	if (a.addEventListener) {
		a.addEventListener(b,c,false);
	}
	else if (a.attachEvent) {
		a.attachEvent(((d==1)?"":"on")+b,c);
	}
};

/**
 * executes a function which starts with the name _vsOn and ends with the provided text a
 * 
 * @param {String} a the end of the name of the function to execute
 * @param {Object} b the parameter to provide to the function which is executed
 * @param {Object} c not used?
 */
_VS.EI = function(a,b,c) {
	if (typeof eval("window._vsOn"+a)=="function")
		eval("window._vsOn"+a+"(b)");
};

/**
 * Event Listener which is used for link tracking. The link tracking is usually kicked off by 
 * the onmousedown event.
 * 
 * @param {Event} e
 */
_VS.LT = function(e) {
	if ((e.which && e.which==1) || (e.button && e.button==1) || (e.keyCode && e.keyCode==13)) {
		var a = document.all?window.event.srcElement:e.target;
		/*
		var x = '', y = '';

		if (e.pageX || e.pageY) {
			x = e.pageX;
			y = e.pageY;
		}
		else if (e.clientX||e.clientY) {
			x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
		
		_VS.SET('lidx',x);
		_VS.SET('lidy',y);
		*/
		/*added by Patrick O'Dwyer - a360382*/
		if (a.tagName && a.tagName.toLowerCase()!="a") {
			var b = a.parentNode;
			while(b.tagName.toLowerCase()!="body" && b.tagName.toLowerCase()!="a") {
				b = b.parentNode;
			}
			if (b.tagName.toLowerCase()=="a") {
				a = b;
			}
		}
		/* end added by Paddy */
		if (a.tagName && a.tagName.toLowerCase()=="a") {
			_VS.SET("VSLID",a.href);
			_VS.SEND("Link",a);
		}
	}
};

/**
 * Adds a property to the da object which is put on the on the request to the sensor
 *  
 * @param {Object} a The key uses to store a property in the da object
 * @param {Object} b The value of the property to store in the da object
 * @param {Object} c if c equal to 0 b is escaped
 */
_VS.SET = function(a,b,c) {
	_VS.da[a] = (c==0)?b:escape(b);
};

/**
 * Sends the request to the sensor
 * 
 * @param {Object} a The context which the request is sent to the sensor, eg. link, page.
 * Used to kick off the vsOnLink or vsOnPage functions
 * @param {Object} b parameter passed to vsOnLink/vsOnPage function
 */
_VS.SEND = function(a,b) {
	if (_VS.D(a))
		_VS.EI(a,b);
	
	a = "";
		
	for (var i in _VS.da) {
		if (typeof _VS.da[i] != "function") {
			a += "&" + i + "=";
			a += _VS.da[i];
		}
	}
	
	_VS.Q(_VS.rq+a);
	_VS.da = _VS.NA();
};

/** Cancels sending the next request to the visual sensor. */
_VS.HALT = function() {
	_VS.hf = 1;
};

/**
 * Event handler which is used for tracking the page information. Called on the onload.
 */
_VS.P = function() {
	_VS.SET("VSDT",document.title);
	_VS.SET("VSDR",eval("document.referrer"));
	_VS.SET("VSPAGETAG",1);
};



/* Initial set up options. */
_VS.hf = 0;
_VS.ii = 0;
_VS.im = 10;
_VS.ia = _VS.NA();

/* Create the original array of images which are used to send the tracking requests. */
for (var i=0;i<_VS.im;i++) {
	_VS.ia[i] = new Image();
};

/* Set up the data array. */
_VS.da = _VS.NA();

/* Initialise the domain object. */
_VS.vs = eval("window."+_VS.nspace);
_VS.vs = (_VS.D(_VS.vs))?_VS.vs:new Object();

/* create a site object if there is none */
if (_VS.D(_VS.site))
	for (var i in _VS.site) {
		if (_VS.D(_VS.vs[i])==0)
			_VS.vs[i] = _VS.site[i];
	}

/*
 * Run the initialise function, add objects to the da object for the page request, add event listeners
 * to the mousedown and keydown events of all links and send the page request.
 */
if (typeof _VS.vs=="object") {
	if (_VS.D('Init'))
		_VS.EI('Init');
				
	_VS.rq = _VS.protocol + "//" + _VS.vs['sensor'] + "/VSTAG?LOG=" + _VS.LOG + "&VSVERSION=" + _VS.VSVERSION;
		
	if (_VS.vs['lt'] && _VS.vs['lt']=="1") {
		var a = document.links, b = 0;

		for (b=0;b<_VS.L(a);b++) {
			_VS.EL(a[b],'mousedown',_VS.LT);
			_VS.EL(a[b], 'keydown', _VS.LT);
		}
	}
	
	var sendPage = function() {
			for (var i in _VS.vs) {
				if (typeof _VS.vs[i] != 'function' && i!='sensor' && i!='lt' && i!='cancelPage') {
					_VS.da[i] = _VS.vs[i];
				}
			}
			_VS.P();
			_VS.SEND("PageView");
	}
	
	if (!_VS.vs['cancelPage']) {
		_VS.EL(window,"load",sendPage);
	}
}
//Visual Sciences Code - END

// FMR Specific Code

/**
 * Generating custom "location" tags based on the 'ltag' attribute of HTML element
 * 
 * @param {Object} node The node to look for ltag attributes on
 */
function VsGenerateTags(node) {
	var currentNode = node;
	
	while ( currentNode && currentNode.nodeType == 1 ) {    /*Node.ELEMENT_NODE*/
		var currentTag = currentNode.getAttribute('ltag');
		
		var splitParamArray = [];
		if (currentTag) {
			splitParamArray = currentTag.split("~");
		}
		for (var i = 0; i < splitParamArray.length; i++) {
			currentTag = splitParamArray[i];
			if ( currentTag && (currentTag.indexOf("^") != -1) ) {
				var splitTagArray = [];
				splitTagArray = currentTag.split('^');
				_VS.SET(splitTagArray[0], splitTagArray[1]);
			}
		}
		
		currentNode = currentNode.parentNode;
	}

	if (_VS.da.desc) {
		var descText = "";
		if (node.textContent) {
			descText = node.textContent;
		} else if (node.innerText) {
			descText = node.innerText;
		} 
		 //check for an image description
		 if (node.title.search(/^\s*$/) !== 0 && node.getElementsByTagName("img").length > 0) {
			descText = "Image[" + node.title + "]";
		}else if (node.getElementsByTagName("img").length > 0) {
			var firstImg = node.getElementsByTagName("img")[0];
			descText = "Image[" + firstImg.alt + "]";
		}
		_VS.SET('VSDESC', descText);
	}
}

/**
 * This function generates custom tracking "location" tags. This function is used on buttons as event
 * listeners are not added to them when the page is set up.
 * 
 * @param {Object} node The node which kicks off the tracking. Usually a button. Sometimes a link.
 */
function VsTrack(node) {
	
	VsGenerateTags(node);
	if (node.tagName && node.tagName.toLowerCase()=="a") {
		_VS.SET("VSLID",node.href);
	}
	_VS.SEND();	
}

/**
 * Tracking custom "location" tags on a link click in lieu of the HREF attribute
 * 
 * @param {Object} node The node which kicks off the tracking.
 */
function _vsOnLink(node) {		
	VsGenerateTags(node);
}

/**
 * This function add's the link tracking event to all links within the given node. This is used for links 
 * that get created or changed by ajax as this can remove any event listeners connected to them.
 * 
 * @param {Object} containerNode The node who's links get event handlers added to.
 */
function addLinkTracking(containerNode) {
	var a = containerNode.getElementsByTagName("a"), b = 0;
	for (b=0;b<_VS.L(a);b++) {
		_VS.EL(a[b],'mousedown',_VS.LT);
		_VS.EL(a[b], 'keydown', _VS.LT);
	}
}