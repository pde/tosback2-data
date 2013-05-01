var skaTools = {
	GNSessionCookie: {},
	domains: {"1": "www.att.com","2": "www.wireless.att.com","3": "www.uversecentral.att.com","4": "m.att.com"},
	hitURL: function(url, callback){
		var hitTest= document.createElement("script");
		hitTest.style.display = "none";
		if(typeof callback == "function"){
			hitTest.onload = function(){callback.apply(hitTest, [true])}
			hitTest.onerror = function(){callback.apply(hitTest, [false])}
		}
		hitTest.src = url;
		document.getElementsByTagName("head")[0].appendChild(hitTest);
	},
	getContextRoot: function(uri){
		var thisAnchor = document.createElement("a");
		thisAnchor.href = uri;
		return thisAnchor.pathname.split("/")[1];
	},
	allCookies:document.cookie.split(';'),
	main: function(){
	
		for (var i=0;i<skaTools.allCookies.length;i++) {
			var cookiePair = skaTools.allCookies[i].split('=');
			var cookieName = cookiePair[0];
			cookieName = cookieName.replace(/^\s+|\s+$/g,'');
			cookiePair.shift();
			var cookieValue = cookiePair.join('=');
			if(cookieName == "GNSESS"){skaTools.GNSessionCookie = new Function("return " + cookieValue)()}
		}
		
		if(typeof skaTools.GNSessionCookie.SKA != "undefined"){
			var skaItems = skaTools.GNSessionCookie.SKA;
			for(var i=0; i < skaItems.length; i ++){
				var thisDomain = skaTools.domains[skaItems[i][0]];
				var thisContextRoot = skaItems[i][1];
				if(skaTools.getContextRoot(window.location).toLowerCase() == thisContextRoot.toLowerCase()){
					skaTools.hitURL('https://' + thisDomain + '/' + thisContextRoot + '/keepsessionalive.jsp')
				}
			}
		}
	
	}
}

if(document.addEventListener){window.addEventListener("load", skaTools.main, false )}else if(document.attachEvent){window.attachEvent("onload", skaTools.main)}

