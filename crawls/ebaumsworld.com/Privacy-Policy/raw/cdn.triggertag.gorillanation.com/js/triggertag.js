function gn_addScript (url, callback) {
	// Create a new script element and set its source
	var head = document.getElementsByTagName("head")[0];
	var script = document.createElement("script");
	script.src = url;

  // Attach handlers for all browsers
  script.onload = script.onreadystatechange = function(){
		if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") {
    	if (typeof callback == 'function') callback.call();
			// Handle memory leak in IE
			script.onload = script.onreadystatechange = null;
			head.removeChild(script);
		}
  };

  head.appendChild(script);
}

function getTrigger(id, isDynamic) {
  var gn_country = "";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf("gn_country=") == 0)  {
			gn_country = c.substring(11,c.length);
			break;
		}
	}

	document.write('<script src="http://cdn.assets.craveonline.com/js/tracking/gn_tracking.js" type="text/javascript"><\/script>');

	if (gn_country == "") {
		document.write('<script src="http://geo.gorillanation.com/geo.php?dynamic='+parseInt(0|isDynamic)+'&website_id=' + id + '" type="text/javascript"><\/script>');
	} else {
		if (typeof(isDynamic)=='undefined' || isDynamic == false) {
			document.write('<script src="http://cdn.triggertag.gorillanation.com/js/' + id + '_' + gn_country + '.php" type="text/javascript"><\/script>');		  	
		}	else {
			document.write('<script src="http://cdn.triggertag.gorillanation.com/js/' + id + '_' + gn_country + '_manifest.php" type="text/javascript"><\/script>');	  
		}
		
		// Nielsen tag //
		if (gn_country == "AU") {
			(function () { var d = new Image(1,1); d.onerror = d.onload = function () {
				d.onerror = d.onload = null; };
				d.src = ["//secure-au.imrworldwide.com/cgi-bin/m?ci=gorillanation-au&cg=0&cc=1&si=", escape(window.location.href), "&rp=", escape(document.referrer), "&ts=compact&rnd=", (new Date()).getTime()].join('');
			})();
		}
	}
}


