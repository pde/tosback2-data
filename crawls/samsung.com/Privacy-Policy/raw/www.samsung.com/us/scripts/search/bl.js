
function BackgroundLoader() {}


//
// Private members
//

BackgroundLoader.prototype.__request = false;
BackgroundLoader.prototype.__sequenceNumber = false;
BackgroundLoader.prototype.__loadedCallback = function(content) {};
BackgroundLoader.prototype.__errorCallback = function(error) {};


//
// Public methods
//

BackgroundLoader.prototype.setSequenceNumber = function(sequenceNumber) {
    this.__sequenceNumber = sequenceNumber;
};

BackgroundLoader.prototype.setLoadedCallback = function(loadedCallback) {
    this.__loadedCallback = loadedCallback;
};

BackgroundLoader.prototype.setErrorCallback = function(errorCallback) {
    this.__errorCallback = errorCallback;
};

BackgroundLoader.prototype.loadUrl = function(url) {
    this.__request = this.__getXmlHttpRequest();
  
    if (this.__request) {
        var loader = this;
        this.__request.onreadystatechange = function() { loader.__processReqChange(); };
        //this.__request.open("GET", encodeURI(url), true);
        this.__request.open("GET", (url), true);
        this.__request.send(null);
    }
};

BackgroundLoader.prototype.isEnabled = function() {
    return this.__getXmlHttpRequest() != null;
};


//
// Private methods
//

BackgroundLoader.prototype.__processReqChange = function() {
    var request = this.__request;
    // only if req shows "loaded"
    if (request.readyState == 4) {
        // only if "OK"
        if (request.status == 200) {
        	//alert(request.responseText);
            this.sequenceNumber == false
                    ? this.__loadedCallback(request.responseText)
                    : this.__loadedCallback(request.responseText, this.__sequenceNumber);
        } else {
            this.sequenceNumber == false
                    ? this.__errorCallback(request.status + ": " + request.statusText)
                    : this.__errorCallback(request.status + ": " + request.statusText, this.__sequenceNumber);
        }
    }
};

BackgroundLoader.prototype.__getXmlHttpRequest = function() {
    if (typeof XMLHttpRequest != "undefined") {
        return new XMLHttpRequest();
    } else {
        try {
            return new ActiveXObject("Msxml2.XMLHTTP");
        } catch(e1) {
            try {
                return new ActiveXObject("Microsoft.XMLHTTP");
            } catch(e2) {
                return null;
            }
        }
    }
};
