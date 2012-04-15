function Tracking(){}

Tracking.Ct = function() {
          
        var url, id = this.getAttribute("myId");   	
	//alert("i am here" + this.href);
	if (this && this.href && id) {
		if (this.wzup) return true;
        	url = this.href;
        	this.href = Tracking.buildUrl(id, url);
        	
                this.wzup = 1;	
        }
}


Tracking.buildUrl = function(id, url){
        var trackingUrl;
        var baseUrl = "http://wzus.ask.com/r?t=a&d=us&s=a&c=sttc&ti=1&ai=" + Tracking.enc(id) + "&";
	if(Cookie.isEnabled() == true){
	   if(Cookie.getCookie("user")){
	   	//alert("i am here: " + Cookie.getCookie("user"));
	   	baseUrl += Cookie.getCookie("user");
	   	baseUrl += "&";
	   }	
	}
	
	var u = "u=" + Tracking.enc(url);
	baseUrl += u;
	return baseUrl;
	


}


Tracking.init = function(){

	var i, value, id, status, links = document.getElementsByTagName("a");
	
       	for(i = 0; i < links.length; i++){
               	status = links[i].getAttribute("tracking");
               	if(status && status != "null"){ // if(status) is equivalent to if(status != null && status != '' && status != 0)
               	    value = status.split(":");
               	    id = value[1];
               	    links[i].setAttribute("myId", id);
               	    links[i].onmousedown = Tracking.Ct;
        	}
        }

}


Tracking.enc = function(s){

	return (typeof encodeURIComponent != "undefined") ? encodeURIComponent(s) : escape(s);
	
}






