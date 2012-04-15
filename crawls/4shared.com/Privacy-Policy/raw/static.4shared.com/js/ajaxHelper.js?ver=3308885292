
function AjaxHelper(){
    this.xmlHttpRequest = null;

    this.sendGetTextRequest = function(url,textResultCallback){
        var thisRef = this;
        this.processResult = function(){
            textResultCallback(thisRef.xmlHttpRequest.responseText);
        }
        this.xmlHttpRequest = this.createXMLHttpRequest();
        if(this.xmlHttpRequest) {
            this.xmlHttpRequest.open("GET", url, true);
            this.xmlHttpRequest.send(null);
        }
    };

    this.sendGetXMLRequest = function(url,textResultCallback){
      var thisRef = this;
      this.processResult = function(){
          textResultCallback(thisRef.xmlHttpRequest.responseXML);
      }
      this.xmlHttpRequest = this.createXMLHttpRequest();
      if(this.xmlHttpRequest) {
          this.xmlHttpRequest.open("GET", url, true);
          this.xmlHttpRequest.send(null);
      }
    };

    this.createXMLHttpRequest = function (){
        var r = false;
        // branch for native XMLHttpRequest object
        if(window.XMLHttpRequest) {
            try {
                r = new XMLHttpRequest();
            } catch(e) {
                r = false;
            }
            // branch for IE/Windows ActiveX version
        } else if(window.ActiveXObject) {
            try {
                r = new ActiveXObject("Msxml2.XMLHTTP");
            } catch(e) {
                try {
                    r = new ActiveXObject("Microsoft.XMLHTTP");
                } catch(e) {
                    r = false;
                }
            }
        }
        if( r ){
            var thisRef = this; // seems to be necessary step in JavaScript
            r.onreadystatechange = function() {
                // only if req shows "loaded"
                if (r.readyState == 4) {
                    // only if "OK"
                    if (r.status == 200) {
                        thisRef.processResult();
                    } else {
                        thisRef.processError();
                    }
                }
            };
        }
        return r;
    };

    this.processError = function(){
        alert("Unable to reach 4shared. Please check your internet connection and try again. [c1]");
    }

    this.processResult = function(){
        alert('processResult ' + this.xmlHttpRequest.responseText.substring(0,500));
    }

}
