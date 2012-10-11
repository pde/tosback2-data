CheckCookie = function(){
};

CheckCookie.prototype = {
	check : function(){
		var result=false;
        if(navigator.cookiesEnabled)
          result=true;
        document.cookie = "cookie=yes;";
        if (document.cookie.indexOf("cookie=yes") > -1)
          result=true;
        
		if(!result){
			 alert("Please enable your cookies for an enhanced online experience.");
			 return;
		}
		 var date = new Date();
		 date.setTime(date.getTime() - 10000);
		 document.cookie = "cookie=yes; expires=" + date.toGMTString();

	}
}
var checkcookie = new CheckCookie();
$(document).ready(function() {
	checkcookie.check();
});