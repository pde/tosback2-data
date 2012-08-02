(function() {

    var exclude = [ /^\/designsquad/ ]; 
    
    for (var i=0; i < exclude.length; i++){ 
	if (window.location.pathname.match(exclude[i])){
	    return 0;
	}  
    }

    var getCookie = function(c_name) {
	if (document.cookie.length>0) {
            c_start=document.cookie.indexOf(c_name + "=");
            if (c_start!=-1) {
		c_start=c_start + c_name.length+1;
		c_end=document.cookie.indexOf(";",c_start);
		if (c_end==-1) c_end=document.cookie.length;
		return unescape(document.cookie.substring(c_start,c_end));
            }
	}
	return "";
    };
    
    var surveyed = getCookie('surveyed');
    
    var FREQUENCY = 1000;
    var rn;
    
    if (!surveyed){	
	rn = Math.floor(Math.random() * FREQUENCY);
	if (rn == 0){
	    
	    var head = document.getElementsByTagName('head')[0];
            var js = document.createElement('script');
            js.setAttribute('type', 'text/javascript');
	    js.setAttribute('src', '/survey/2012/js/pbskids-survey.js');
            head.appendChild(js);	 
	}
    }
    
})();