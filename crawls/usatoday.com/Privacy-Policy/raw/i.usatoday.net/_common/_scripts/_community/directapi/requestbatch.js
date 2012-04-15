
RequestBatch = function() {
  this.initialize.apply(this, arguments);
};

// for unique id
var counter = 0;

// how many requests are still pending?
var pendingRequests = 0;

function DirectAccessErrorHandler(msg,ex){
//alert(msg);
}

// the core object to request batches
RequestBatch.prototype = {
    initialize: function() {
        this.UniqueId = counter++;
        this.Requests = new Array()
    },

    AddToRequest: function(requestThis) {
        this.Requests[this.Requests.length] = requestThis;
    },
   
    BeginRequest: function(serverUrl, callback) {
        pendingRequests++;
        
        var jsonString = JSON.stringify(this);

        var form = generateForm(this.UniqueId, serverUrl, jsonString);
        new iframe(form, {onComplete: function(request) {processResponse(callback, request);} }, this.UniqueId);

        // in case they reuse the requestbatch
        this.UniqueId = counter++;
    }
};

function generateForm(formId, serverUrl, inputVal) {
    // create the form
	var form = document.createElement("form");
	form.acceptCharset = "UTF-8";
	form.name = "f" + formId;
	form.id = "f" + formId;
	form.action = serverUrl;
	
	// create the input element on the form
	var inputElem = document.createElement("input");
	inputElem.name = "jsonRequest";
	inputElem.type = "hidden";
	inputElem.value = inputVal;
	form.appendChild(inputElem);

	// Firefox has a behavior on refresh that displays a popup confirming that is it reloading a form.
	// We work around this by attempting to perform a get action if the size is below a threshold, else
	// we will run as a post
	form.method = "post";
    if(navigator.userAgent.toLowerCase().indexOf('firefox') != -1) {
        var separator = serverUrl.indexOf('?') == -1 ? "?" : "&";
        var fullRequestURL = serverUrl + separator + "jsonRequest="+ escape(inputVal);
        if (fullRequestURL.length < 15000) {
            // we plan to perform a get, so we need to parse the sid out of the url and place it
            // inside the form
            var sidPos = serverUrl.indexOf('sid=');
            if (sidPos != -1) {
                var endPos = serverUrl.indexOf('&', sidPos);
                var sid = serverUrl.substring(sidPos + 'sid='.length, endPos == -1 ? serverUrl.length : endPos);
	            var sidInputElem = document.createElement("input");
	            sidInputElem.name = "sid";
	            sidInputElem.type = "hidden";
	            sidInputElem.value = sid;
	            form.appendChild(sidInputElem);
	            // remove the sid from the url
	            form.action = serverUrl.substring(0, sidPos-1);
            }
            form.method = "get";
        }
    }
	
	// append the form to the document body
	// users must be cautious of when they call this due to a bug in IE
	// see http://support.microsoft.com/kb/927917 for details
	document.body.appendChild(form);
	return form;
}

function processResponse(callback, request)
{   
    pendingRequests--;
    try { 
        var jsonResponse = unescape(request.responseText);
        var responseObject = JSON.parse(jsonResponse);
        try {
            callback(responseObject.ResponseBatch);
        } catch (e) {
            DirectAccessErrorHandler("exception during client callback", e);
        }
    } catch (e) {
        DirectAccessErrorHandler("exception during processResponse", e);
    }
}

function getPendingRequestCount()
{
    return pendingRequests;
}