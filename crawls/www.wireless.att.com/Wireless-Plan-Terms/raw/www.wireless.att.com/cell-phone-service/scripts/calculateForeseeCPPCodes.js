function CalculateForeseeCPPCodes() {
	var metaTagsInHead = $$('meta');
	
	this.getCookie = function(name) {
		var dc = document.cookie;
	  	var prefix = name + "=";
	 	var begin = dc.indexOf("; " + prefix);
	  	if (begin == -1) {
	    	begin = dc.indexOf(prefix);
	    	if (begin != 0) {
	    		return null;
	    	}
	  	} 
	  	else {
	    	begin += 2;
	    }
	  	var end = document.cookie.indexOf(";", begin);
	  	if (end == -1) {
	    	end = dc.length;
	    }
	  	return unescape(dc.substring(begin + prefix.length, end));
	}

	this.parseCookie = function(cookieToParse) {
		var myCookie = this.getCookie(cookieToParse);
		//alert('in cookies');
		if( myCookie != null) {
			switch(cookieToParse) {
				case 'cust_type' :
					ForeSee.CPPS.fsr$set('customer_type', myCookie);
					//alert(myCookie);
				break;
				case 'browserid' :
					ForeSee.CPPS.fsr$set('app_visitor_cookie', myCookie);
					//alert(myCookie);
				break;
			}
		}
	}

	this.parseCookies = function() {
		var cookieList = new Array('cust_type', 'browserid');
		for(i = 0; i < cookieList.size(); i++) {
			this.parseCookie(cookieList[i]);
		}
	}
	
	this.collectMeta = function() { 
		for(var i = 0; i < metaTagsInHead.size(); i++) {
			//console.log(metaTagsInHead[i].name.toString());
			if(metaTagsInHead[i].name.toString().include('wtABTest')) {	
				var myArr = metaTagsInHead[i].content.split('~');
				ForeSee.CPPS.fsr$set('a/b_test_'+myArr[0], myArr[1]);
				//alert('a/b_test_'+myArr[0]+ ' value= ' + myArr[1]);
			}			
		}
		this.parseCookies();	
	}
	
	this.collectMeta();

}

var cppCodesForUser = new CalculateForeseeCPPCodes();