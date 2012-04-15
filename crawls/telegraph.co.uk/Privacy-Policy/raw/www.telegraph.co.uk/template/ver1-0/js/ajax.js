/* $Id: ajax.js,v 1.2 2008/09/23 15:55:46 dysonl Exp $ */
function AJAXInteraction(url,parameters,callback_function,return_xml) {
	var http_request = false;
    if (window.XMLHttpRequest) {
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
            http_request.overrideMimeType('text/xml');
        }
    } else if (window.ActiveXObject) {
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }
    http_request.onreadystatechange = function() {
        if (http_request.readyState == 4) {				
            if (http_request.status == 200 && callback_function) {				
                if (return_xml) {
                    callback_function(http_request.responseXML);
                } else {
                    callback_function(http_request.responseText);
                }				
            } else {
				if (window.location.hostname.indexOf("www")==-1) {
					alert('There was a problem with the request.(Code: ' + http_request.status + ')');
				}
            }
        }
    }
	this.doGet = function() {
		http_request.open("GET", url, true);
		http_request.send(null);
	};
	this.doPost = function() {
		http_request.open('POST', url, true);
		/* fixes Firefox's no req params problem */
		http_request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		http_request.send(parameters);
	};
}
