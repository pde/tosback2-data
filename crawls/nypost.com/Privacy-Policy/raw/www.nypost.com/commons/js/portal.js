

var PortalCommons = {

	servicesUrl : '/_mpsctx/services',
		
	createXmlHttp : function() {
	    if (window.XMLHttpRequest) {
	        return new XMLHttpRequest();		
	    } else if (typeof(ActiveXObject) != 'undefined') {
	        return new ActiveXObject('Microsoft.XMLHTTP');
	    } else {
	        return null;
	    }
	},
	
	getRemoteHTML : function(url) {
	    var xmlHttp = PortalCommons.createXmlHttp();
	    xmlHttp.open("GET",url,false);
	    xmlHttp.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");
	    xmlHttp.send(null);
	    var buffer = xmlHttp.responseText;
	    xmlHttp = null;
	    return buffer;
	},
		
	getRemoteHTMLAsync : function(url,fn) {
	    var xmlHttp = PortalCommons.createXmlHttp();
	    xmlHttp.open("GET", url, true);
	    xmlHttp.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");
	    xmlHttp.onreadystatechange = function () {
	        if (xmlHttp.readyState == 4) {
	            fn(xmlHttp.responseText);
	            xmlHttp = null;
	        }
	    };
	    xmlHttp.send(null);
	    return xmlHttp;
	},
	
	getRemoteXML : function(url) {
	    var xmlHttp = PortalCommons.createXmlHttp();
	    xmlHttp.open("GET",url,false);
	    xmlHttp.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");
	    xmlHttp.send(null);
	    var buffer = xmlHttp.responseXML;
	    xmlHttp = null;
	    return buffer;
	},

	getRemoteXMLAsync : function(url,fn) {
	    var xmlHttp = PortalCommons.createXmlHttp();
	    xmlHttp.open("GET", url, true);
	    xmlHttp.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");
	    xmlHttp.onreadystatechange = function () {
	        if (xmlHttp.readyState == 4) {
	            fn(xmlHttp.responseXML);
	            xmlHttp = null;
	        }
	    };
	    xmlHttp.send(null);
	    return xmlHttp;
	},

	postRemoteXML : function(url,data) {
	    var xmlHttp = PortalCommons.createXmlHttp();
	    xmlHttp.open("POST",url,false);
	    xmlHttp.send(data);
	    var buffer = xmlHttp.responseXML;
	    xmlHttp = null;
	    return buffer;
	},

	postRemoteHTML : function(url,data) {
	    var xmlHttp = PortalCommons.createXmlHttp();
	    xmlHttp.open("POST",url,false);
	    xmlHttp.send(data);
	    var buffer = xmlHttp.responseText;
	    xmlHttp = null;
	    return buffer;
	},
	
	postRemoteForm : function(url,data) {
	    var xmlHttp = PortalCommons.createXmlHttp();
	    xmlHttp.open("POST",url,false);
	    xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); 
	    xmlHttp.send(data);
	    var buffer = xmlHttp.responseText;
	    xmlHttp = null;
	    return buffer;
	},
	
	findUserZoneId : function(el) {
	    while(el) {
	        var id = el.getAttribute('userZoneId');
	        if (id)
	            return id;
	        
	        el = el.parentNode;
	    }
	    return null;
	},

	setUserContent : function(el,contentId) {
	    var zoneId = PortalCommons.findUserZoneId(el);
	    PortalCommons.postRemoteHTML(baseContext+'/Content/' + zoneId,contentId);
	    window.document.location.reload();
	},

	loadContent : function(elementId,baseContext,loidEx,key,timeout) {

		if (!elementId) throw {message: 'Null element id'};
		if (!loidEx) throw {message: 'Null loidEx'};

		if (!baseContext) var baseContext = '';
		if (!timeout) var timeout = 1000;

		PortalCommons.addLoadEvent(function() {		
			window.setTimeout(function() {
				
				var el = document.getElementById(elementId);
				if (el) {
					var urlString = baseContext+'/Content/loid/' + loidEx;
					if (key)
						urlString += '?key=' + key;
	
					PortalCommons.getRemoteHTMLAsync(urlString,function(buffer){
						el.innerHTML = buffer;
					});
				} 
	
			}, timeout);		
		});
	},

	addLoadEvent : function(func) {
		
		var oldonload = window.onload;
		
		if (typeof window.onload != 'function') {
			window.onload = func;
		} else {
			window.onload = function() {
				if (oldonload) {
					oldonload();
				}
				func();
			};
		}
	},

	addUnloadEvent : function(func) {
	
		var oldunload = window.onunload;
		
		if (typeof window.onunload != 'function') {
			window.onunload = func;
		} else {
			window.onunload = function() {
				if (oldunload) {
					oldunload();
				}
				func();
			};
		}
	},

	__end__ : null
};






String.prototype.truncate = function(maxLength) {

    if ( this.length <= maxLength )
        return new String(this.valueOf());

    var words = this.split(' ');
    var numWords = words.length;
    var output = new Array();
    var totalLength = 0
    var cWord;
    
    for (var i = 0; i < numWords; i++) {
        var currentWord = words[i];
        wordLength = currentWord.length;
        if ( (totalLength+wordLength) <= maxLength ) {
			output.push(currentWord);
			totalLength += wordLength + 1; // add 1 for a space after the word
        } else
        	break;
    }
    
    return output.join(' ') + '...';
}
