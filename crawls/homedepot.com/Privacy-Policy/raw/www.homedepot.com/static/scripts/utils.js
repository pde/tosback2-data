	/* 
		This section will be executed when the file gets loaded
		by the browser		
	*/

// Modified WCS 7Up Code Merge 4.6 on 07/22/2011
	var cookieManager = null;
    var nbrOfItemsInCart;
	var currentCookiedomain;
	
	
    
    // Onload methods BEGIN
    var HideThePrintLink = null;
    // Onload methods END

	/*
		 Checks to see if cookie exists 
	*/
	function hasBrowserCookie(name) {
		var nameEQ = name;
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++){
			var c = ca[i];
			while (c.charAt(0) == ' '){
				c = c.substring(1,c.length);
			}
			if (c.indexOf(nameEQ) == 0){
				return true;
			}
		}
		return false;
	}
	
	
	/*
		 Returns value of browser cookie
	*/
	function readBrowserCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++){
			var c = ca[i];
			while (c.charAt(0) == ' '){
				c = c.substring(1,c.length);
			}
			if (c.indexOf(nameEQ) == 0){
				return decodeURIComponent(c.substring(nameEQ.length,c.length));
			}
		}
		return "";
	}


	/*
		  Deletes browser cookie by expiring it
	*/
	function deleteBrowserCookie(name) {
		var date = new Date();
 		var expires = "; expires=" + date.toGMTString();
		document.cookie = name + "=" + expires + "; path=/";
	}


	/*
		 This will create either a browser cookie or a cookie crumb 
		 this exists inside a master cookie
	*/
	function createCookie(name, value, days){
		cookieManager.createCookie(name, value, days);
	}


	/*
		Don't use the domain value being passed in, just use the default domain
	*/
	function createCookieWDomain(name, value, days, domain) {
		cookieManager.createCookie(name, value, days);
	}
	
	
	/*
		Determine if the default domain should be used or 
		if the domain of the document should be used instead
		It should be noted that the document.domain will return 
		the fully qualified hostname, not just the domain name. 
		The implication is that the value returned will NOT have
		a leading period.
	*/
	
	function getCurrentDomain(defaultDomain) {
               var currentDomain = defaultDomain;
               var documentDomain = "." + document.domain;
              
               if(documentDomain.indexOf(currentDomain) == -1){
                       currentDomain = document.domain.substr(document.domain.indexOf("."));
               }             
               return currentDomain;
    }
	
	function getPopupCurrentCookieDomain(){
            return currentCookiedomain;
    }
                
    function setPopupCurrentCookieDomain(domain){
          currentCookiedomain = domain;
    }
	
	// Initialize the CookieManager
	function initializeCookieManager(cookieDomain){
		 	
		var xmlString = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"
					+ "<cookieJar>"
					+ "<cookies domain=\"\" path=\"/\" regular_delimiter=\":;\" cache_delimiter=\"_~\" regular_equals=\"=\" cache_equals=\"~\" expiration_suffix=\"_EXP\">"
					+	"<cookie type=\"R\" name=\"THD_PERSIST\" expiration=\"51840000\" path=\"/\"></cookie>"
					+	"<cookie type=\"R\" name=\"THD_SESSION\" expiration=\"-1\" path=\"/\"></cookie>"
					+	"<cookie type=\"C\" name=\"THD_CACHE_NAV_SESSION\" expiration=\"-1\" path=\"/\"></cookie>"
					+	"<cookie type=\"C\" name=\"THD_CACHE_NAV_PERSIST\" expiration=\"51840000\" path=\"/\"></cookie>"
					+"</cookies>"
					+"<crumbs>"
					+	"<crumb type=\"R\" alias=\"THD_BROWSESTATUS\"   name=\"C1\"  exp=\"-1\"></crumb>"
					+	"<crumb type=\"R\" alias=\"CJInfo\"   name=\"C2\"  exp=\"2592000\"></crumb>"
					+	"<crumb type=\"C\" alias=\"THD_KIOSK\"   name=\"C3\"  exp=\"\" cookie=\"THD_CACHE_NAV_PERSIST\"></crumb>"
					+	"<crumb type=\"R\" alias=\"THD_LOCSTORE\"   name=\"C4\"  exp=\"51840000\"></crumb>"
					+	"<crumb type=\"R\" alias=\"THD_LOCSTOREFILTER\"   name=\"C5\"  exp=\"51840000\"></crumb>"
					+	"<crumb type=\"R\" alias=\"THD_MINICART\"   name=\"C6\"  exp=\"2592000\"></crumb>"
					+	"<crumb type=\"R\" alias=\"THD_MINILIST\"   name=\"C7\"  exp=\"51840000\"></crumb>"
					+	"<crumb type=\"R\" alias=\"THD_REFERRER\"   name=\"C8\"  exp=\"86400\"></crumb>"
					+	"<crumb type=\"R\" alias=\"THD_REMEMBERME\"   name=\"C9\"  exp=\"51840000\"></crumb>"
					+	"<crumb type=\"C\" alias=\"RPP\"   name=\"C10\" exp=\"\" cookie=\"THD_CACHE_NAV_PERSIST\"></crumb>"
					+	"<crumb type=\"C\" alias=\"THD_SPLASSORT\"   name=\"C11\" exp=\"\" cookie=\"THD_CACHE_NAV_SESSION\"></crumb>"
					+	"<crumb type=\"R\" alias=\"THD_USEREMAIL\"   name=\"C12\"  exp=\"51840000\"></crumb>"
					+	"<crumb type=\"R\" alias=\"THD_USERNAME\"   name=\"C13\"  exp=\"51840000\"></crumb>"
					+	"<crumb type=\"R\" alias=\"THD_USERSTATUS\"   name=\"C14\"  exp=\"-1\"></crumb>"
					+	"<crumb type=\"R\" alias=\"THD_GRMODE\"   name=\"C15\"  exp=\"-1\"></crumb>"
					+	"<crumb type=\"R\" alias=\"THD_AOL\"   name=\"C16\"  exp=\"-1\"></crumb>"
					+	"<crumb type=\"R\" alias=\"THD_USERREGTYPE\"   name=\"C17\"  exp=\"86400\"></crumb>"
					+	"<crumb type=\"R\" alias=\"THD_USERREF\"   name=\"C18\"  exp=\"86400\"></crumb>"
					+	"<crumb type=\"R\" alias=\"THD_ZIPCODE\"   name=\"C19\"  exp=\"86400\"></crumb>"
					+	"<crumb type=\"C\" alias=\"THD_NAVONLINESTORE\"   name=\"C20\" exp=\"\" cookie=\"THD_CACHE_NAV_SESSION\"></crumb>"
					+	"<crumb type=\"C\" alias=\"THD_NAVLOCALSTORE\"   name=\"C22\" exp=\"\" cookie=\"THD_CACHE_NAV_SESSION\"></crumb>"
					+	"<crumb type=\"R\" alias=\"THD_STRFINDERZIP\"   name=\"C24\" exp=\"51840000\"></crumb>"
					+	"<crumb type=\"R\" alias=\"THD_ADMIN_HOST_INFO\"   name=\"C25\" exp=\"51840000\"></crumb>"
					+	"<crumb type=\"C\" alias=\"THD_USERSORTOPTION\"   name=\"C26\" exp=\"\" cookie=\"THD_CACHE_NAV_SESSION\"></crumb>"
					+	"<crumb type=\"R\" alias=\"THD_AUTOLOCALIZEZIP\"   name=\"C27\" exp=\"51840000\"></crumb>"
					+	"<crumb type=\"R\" alias=\"THD_LITHIUMENCRYTOKEN\"   name=\"C28\"exp=\"51840000\"></crumb>"				
					+	"<crumb type=\"R\" alias=\"THD_AUTOLOCINTERCEPT\"   name=\"C29\" exp=\"-1\"></crumb>"
					+	"<crumb type=\"R\" alias=\"THD_CA_USER\"   name=\"C30\" exp=\"-1\"></crumb>"					
					+	"<crumb type=\"R\" alias=\"THD_REQUIRED_PARTS_SELECTION\"   name=\"C31\" exp=\"-1\"></crumb>"						
					+	"<crumb type=\"R\" alias=\"THD_PASS_TEMP_VAL\" name=\"C32\"  exp=\"51840000\"></crumb>"
					+   "<crumb type=\"R\" alias=\"THD_PREVIOUS_LOCAL_STORE\"   name=\"C33\" exp=\"51840000\"></crumb>"
					+	"<crumb type=\"R\" alias=\"FEATURE_THROTTLE\"   name=\"C34\"  exp=\"86400\"></crumb>"
					+	"<crumb type=\"R\" alias=\"THD_LIVEPERSON_ERRORCOUNT\"   name=\"C35\"  exp=\"86400\"></crumb>"
					+   "<crumb type=\"R\" alias=\"THD_GEOLOCATION_INFO\" name=\"C36\" exp=\"-1\"></crumb>"
					+	"<crumb type=\"R\" alias=\"THD_AUTOLOCALIZED_SESSION\" name=\"C37\" exp=\"-1\"></crumb>"
					+"</crumbs>"
				   +"</cookieJar>";
		

		document.write(xmlString);
		cookieManager = new CookieManager();
		
		cookieManager.setCookieDomain(getCurrentDomain(cookieDomain));
		setPopupCurrentCookieDomain(cookieDomain);

		// Initialize all the master cookies in config
		cookieManager.initializeMasterCookie();
	}
	
	
	
	
	/*
		 Creates a CookieManager object that manages MasterCookie objects
		 PARAMETER: xmlId - The id of the XML island used to reference config data
	*/
	function CookieManager(){
		this.masterCookies = new Object();
		this.masterCookiesLength = 0;
		this.cookieDomain = "";
		this.path = "";
		this.cookieDelimiter = "";
		this.regularDelimiter = "";
		this.cacheDelimiter = "";
		this.regularEquals = "";
		this.cacheEquals = "";	
		this.expiration_suffix = "";


		CookieManager.prototype.getCookiePath = function(){
			return this.path;
		}
	
		CookieManager.prototype.setCookiePath = function(path){
			this.path = path;
		}
		
		CookieManager.prototype.getCookieExpirationSuffix = function(){
			return this.expiration_suffix;
		}
	
		CookieManager.prototype.setCookieExpirationSuffix = function(suffix){
			this.expiration_suffix = suffix;
		}

		CookieManager.prototype.getRegularDelimiter = function(){
			return this.regularDelimiter;
		}
	
		CookieManager.prototype.setRegularDelimiter = function(delimiter){
			this.regularDelimiter = delimiter;
		}

		CookieManager.prototype.getCacheDelimiter = function(){
			return this.cacheDelimiter;
		}
	
		CookieManager.prototype.setCacheDelimiter = function(delimiter){
			this.cacheDelimiter = delimiter;
		}

		CookieManager.prototype.getCookieDomain = function(){
			return this.cookieDomain;
		}
	
		CookieManager.prototype.setCookieDomain = function(domain){
			this.cookieDomain = domain;
		}


		/*
			Get the crumbType for a given crumb name
		*/
		CookieManager.prototype.getCrumbType = function(crumbName){
			var crumbList = document.getElementsByTagName("crumb");
			var cookieCrumb = null;
			
			// Iterate through all the crumb entries to find the one 
			// that matches the one that the caller wants 
			for (var i=0; i < crumbList.length; i++) {
		    	var crumbNode = crumbList[i];
		    	var currentCrumbName = crumbNode.getAttribute("name");

	    		// Alias name matches what is in config for this cookieName
		    	if(currentCrumbName == crumbName){
		    		return crumbNode.getAttribute("type");
		    	}
		    }
		}
		
		
		/*
			Get the Cookie name for a cache crumb
		*/
		CookieManager.prototype.getCrumbCookieName = function(crumbName){
			var crumbList = document.getElementsByTagName("crumb");
			var cookieCrumb = null;
			
			// Iterate through all the crumb entries to find the one 
			// that matches the one that the caller wants 
			for (var i=0; i < crumbList.length; i++) {
		    	var crumbNode = crumbList[i];
		    	var currentCrumbName = crumbNode.getAttribute("name");

	    		// Alias name matches what is in config for this cookieName
		    	if(currentCrumbName == crumbName){
		    		return crumbNode.getAttribute("cookie");
		    	}
		    }
		}
	
	
		/*
			 This initializes the CookieManager to create the necessary in-memory data structures
			 of the cookies and their associated crumbs.		
		*/
		CookieManager.prototype.initializeMasterCookie = function(){	
			var cookies = document.getElementsByTagName("cookies")[0];
			
			// Uncomment when the domain is dynamic
			//this.setCookieDomain(cookies.getAttribute("domain"));
			
			this.setCookieExpirationSuffix(cookies.getAttribute("expiration_suffix"));
			this.cacheDelimiter = cookies.getAttribute("cache_delimiter");
			this.regularDelimiter = cookies.getAttribute("regular_delimiter");
			this.cacheEquals = cookies.getAttribute("cache_equals");
			this.regularEquals = cookies.getAttribute("regular_equals");
			this.setCookiePath(cookies.getAttribute("path"));
			
			var masterCookieList = document.getElementsByTagName("cookie");
	
			for (var i=0; i < masterCookieList.length; i++) {
		    	var objNode = masterCookieList[i];
		    	var cookieName = objNode.getAttribute("name");
		    	var cookieExpiration;
		    	if(objNode.getAttribute("expiration") != -1){
		    		cookieExpiration = parseInt(objNode.getAttribute("expiration")) * 1000;
		    	}
		    	else{
		    		cookieExpiration = parseInt(objNode.getAttribute("expiration")); 
		    	}
		    	
		    	var cookiePath = this.getCookiePath();
		    	var cookieType = objNode.getAttribute("type");	    	
	
		    	// Check if the cookie exists already
		    	// If not, create it
		    	var cookieValue = readBrowserCookie(cookieName);
	    		var delimiter;
	    		var equals;
	    		
	    		if(cookieType == "R"){
	    			delimiter = this.regularDelimiter;
	    			equals = this.regularEquals;
	    		}
	    		else{
	    			delimiter = this.cacheDelimiter;
	    			equals = this.cacheEquals;
	    		}
	    		
    			this.masterCookies[cookieName] = new MasterCookie(cookieName, cookieValue, cookieType, cookiePath, cookieExpiration, this.cookieDomain, equals, delimiter, this.getCookieExpirationSuffix());
				++this.masterCookiesLength;
		    	
		    	if(!hasBrowserCookie(cookieName)){	    	
					document.cookie = this.masterCookies[cookieName].makeCookieString();
		    	}			    
			}
		}
		
	
		/*
			 Retrieves a cookie crumb value 
			 PARAMETER: cookieName - The alias of a cookie crumb whose value is to be retrieved		
		*/
		CookieManager.prototype.readCookie = function(cookieName){
			var aliasList = document.getElementsByTagName("crumb");
			var crumbFound = false;

			for (var i=0; i < aliasList.length; i++) {
		    	var aliasNode = aliasList[i];
		    	var aliasName = aliasNode.getAttribute("alias"); 	
		    	var crumbName = aliasNode.getAttribute("name");
		    	var cookieCrumb = null;
				
		    	if(aliasName == cookieName){
		    	
		    	  	var crumbType = this.getCrumbType(crumbName);
		    	  	if(crumbType == "R"){
			    	  	// Look through all the master cookies and remove the crumb if found
			    	  	// then retrieve the crumb.	    	  	
						var masterCookieList = document.getElementsByTagName("cookie");
								
						for (var j=0; j < masterCookieList.length; j++) {
					    	var objNode = masterCookieList[j];
					    	var masterCookieName = objNode.getAttribute("name");
	
				    		// Check if alias name matches any entry in the config
				    	    crumbFound = true;
				    	    if(this.masterCookies[masterCookieName] != null){
				    	    	cookieCrumb = this.masterCookies[masterCookieName].getCrumb(crumbName);
					    	    
					    	    // If the crumb is not NULL then we have found it
					    	    // Otherwise continue looking for crumb in based on 
					    	    // Additional aliases if they exist in the config
					    	    if (cookieCrumb != null){			    	    	
				    	    		return decodeURIComponent(cookieCrumb.getValue());
					    	    }		    	    
				    		}   		    		
		    			}
		    		}
		    		else{
			    		// Check if alias name matches any entry in the config
						var masterCookieName = this.getCrumbCookieName(crumbName);
		    	    	cookieCrumb = this.masterCookies[masterCookieName].getCrumb(crumbName);
			    	    crumbFound = true;
			    	    
			    	    // If the crumb is not NULL then we have found it
			    	    // Otherwise continue looking for crumb in based on 
			    	    // Additional aliases if they exist in the config
			    	    if (cookieCrumb != null){			    	    	
		    	    		return decodeURIComponent(cookieCrumb.getValue());
			    	    }		    	    		    		
		    		}
		    	
		    	}
		    }
		    
		    // CookieName parameter doesn't match any alias names in config
		    // so it must be a real cookie being requested
		    if(crumbFound && cookieCrumb == null){
		    	return "";
		    }	    
		    
		    if(!crumbFound){
		    	return readBrowserCookie(cookieName);
		    }
		}
	
	
		/*
			This function determines if the expirations are the same length, i.e. they are both
			session or both actual expiration values
			PARAMETER: expirationValue1 - The expiration of the master cookie 		
			PARAMETER: expirationValue2 - The expiration to the cookie crumb				
		*/
		CookieManager.prototype.hasSameExpiration = function(expirationValue1, expirationValue2){		
	
		  	if(expirationValue1 == -1 && expirationValue2 == -1){
				return true;
			}
		  	if(expirationValue1 == -1 && expirationValue2 == 0){
				return true;
			}
		  	if(expirationValue1 > 0 && expirationValue2 > 0){
				return true;
			}
			
			return false;				
		}
	
	
		/*
			Create a new cookie based on parameters
			PARAMETER: cookieName - The alias of the cookie crumb to be created
			PARAMETER: cookieValue - The value of the cookie crumb to be created
			PARAMETER: cookieExpiration - The expiration in days of the cookie crumb to be created
		*/
		CookieManager.prototype.createCookie = function(cookieName, cookieValue, cookieExpiration){
			
			var aliasList = document.getElementsByTagName("crumb");
			var cookieCrumb = null;
			
			// Iterate through all the alias entries to fins the one 
			// that matches the one that the caller wants to add
			for (var i=0; i < aliasList.length; i++) {
		    	var aliasNode = aliasList[i];
		    	var aliasName = aliasNode.getAttribute("alias");
		    	var crumbName = aliasNode.getAttribute("name");
	    		// Alias name matches what is in config for this cookieName
		    	if(aliasName == cookieName){
		    	  	
		    	  	var crumbType = this.getCrumbType(crumbName);
		    	  	if(crumbType == "R"){
			    	  	// Convert the expiration to -1 from empty string since the server code is interpreting 
			    	  	// a session crumb in that manner.
			    	  	if(cookieExpiration == "" || cookieExpiration == null){
			    	  		cookieExpiration = -1;
			    	  	}
			    	  	
			    	  	// Look through all the master cookies and remove the crumb if found
			    	  	// then add the crumb to the appropriate cookie.	    	  	
						var masterCookieList = document.getElementsByTagName("cookie");
				
						for (var j=0; j < masterCookieList.length; j++) {
					    	var objNode = masterCookieList[j];
					    	var masterCookieName = objNode.getAttribute("name");
			    	  		
			    	  		// Always attempt to remove crumb
			    	  		this.masterCookies[masterCookieName].removeCrumb(cookieName);
			    	  	
				    	  	// Check if the expirations are the same.
				    	  	// If so, add the new crumb to the master cookie
				    	  	if(this.hasSameExpiration(this.masterCookies[masterCookieName].getConfigExpiration(), cookieExpiration)){
					    		cookieCrumb = new CookieCrumb(crumbName, cookieValue, cookieExpiration);
					    	    this.masterCookies[masterCookieName].addCrumb(cookieCrumb);

					    	    // Recreate the new master cookie in the browser.
					    	    document.cookie = this.masterCookies[masterCookieName].makeCookieString();	
					    	    break;    
				    	  	}
				    	}   
		    	  	}
		    	  	else{
						var masterCookieName = this.getCrumbCookieName(crumbName);
					    cookieCrumb = new CookieCrumb(crumbName, cookieValue, cookieExpiration);
					    this.masterCookies[masterCookieName].addCrumb(cookieCrumb);					    	

			    	    // Recreate the new master cookie in the browser.
			    	    document.cookie = this.masterCookies[masterCookieName].makeCookieString();	    
		    	  	}

		    	  	
		    		break;
		    	}
		    }									
		}
	
		
		/*
			 Removes a cookie crumb object
			 PARAMETER: cookieName - The alias of a cookie crumb to be deleted
		*/
		CookieManager.prototype.removeCookie = function(cookieName){		
			var aliasList = document.getElementsByTagName("crumb");
			var crumbFound = false;

			for (var i=0; i < aliasList.length; i++) {
		    	var aliasNode = aliasList[i];
		    	var aliasName = aliasNode.getAttribute("alias"); 	
		    	var crumbName = aliasNode.getAttribute("name");
		    	var cookieCrumb = null;
				
	    		// Check if alias name matches any entry in the config
		    	if(aliasName == cookieName){	    			    	  	
		    	  	var crumbType = this.getCrumbType(crumbName);
		    	  	if(crumbType == "R"){
			    	  	// Look through all the master cookies and remove the crumb if found
			    	  	// A crumb should only exist in one master cookie at a time   	  	
						var masterCookieList = document.getElementsByTagName("cookie");
								
						for (var j=0; j < masterCookieList.length; j++) {
					    	var objNode = masterCookieList[j];
					    	var masterCookieName = objNode.getAttribute("name");
			    	  		
				    	    crumbFound = true;
				    	    cookieCrumb = this.masterCookies[masterCookieName].removeCrumb(crumbName);
				    	    break;			    	    
				    	}   
					}
					else{
						var masterCookieName = this.getCrumbCookieName(crumbName);
			    	    cookieCrumb = this.masterCookies[masterCookieName].removeCrumb(crumbName);
			    	    crumbFound = true;
					}
		    		break;					
		    	}
		    }
		    
		    // CookieName parameter doesn't match any alias names in config
		    // so it must be a real cookie being requested
		    if(!crumbFound){
		    	return deleteBrowserCookie(cookieName);
		    }			
		}
		
	}


	/*
	 Creates a MasterCookie object that contains CookieCrumb objects
	 Expiration for each master cookie is stored in milliseconds where the value will be
	 cookie expiration = expiration(milliseconds) + current time(milliseconds). 
	 PARAMETER: name - The name of a MasterCookie that should be in configuration
	 PARAMETER: value - The unparsed value of a MasterCookie that the  browser contains
	 					The value parameter is parsed and CookieCrumb objects are created.
	 PARAMETER: type - The type of the MasterCookie, R - Regular, C - Cache
	 PARAMETER: path - The path of the MasterCookie which should come from configuration
	 PARAMETER: expiration - The number of milliseconds from now the master cookie is set to expire
	 PARAMETER: domain - The domain of the cookie
	 PARAMETER: equals - The value used to separate the crumb name and its value
	 PARAMETER: delimiter - The delimiter used to separate cookie crumbs	 
	 PARAMETER: expSuffix - The expiration suffix used for cookie crumbs
	*/
	function MasterCookie(name, value, type, path, expiration, domain, equals, delimiter, expSuffix){
	    this.crumbArray = new Array();
		this.name = name;
		this.value = value;
		this.type = type
		this.path = path;


		this.expiration = expiration;
		this.configExpiration = expiration;


		this.equals = equals;
		this.delimiter = delimiter;
		this.cookieDomain = domain;
		this.expirationSuffix = expSuffix;
			
		MasterCookie.prototype.getExpiration = function(){
			return this.expiration;
		}		
	
		MasterCookie.prototype.getConfigExpiration = function(){
			return this.configExpiration;
		}		
	
		MasterCookie.prototype.isRegularType = function(){
			if(this.type == "R"){
				return true;
			}
			else{
				return false;
			}
		}		
		
		MasterCookie.prototype.isCacheType = function(){
			if(this.type == "C"){
				return true;
			}
			else{
				return false;
			}
		}		

	
		/*
			Adjust the master cookie expiration to the latest expiration
			of the crumbs contained within it. This only applies to Regular Cookies.
		*/
		MasterCookie.prototype.updateToLatestExpiration = function(){
			// The master cookie my be a session cookie so check for empty string
			if(this.expiration != -1){
				var date = new Date();
				var currentExpirationValue = this.expiration;
				
				if(this.isRegularType()){
					// Get the crumb with the latest expiration
					for(var i=0; i < this.crumbArray.length; i++){
						if(currentExpirationValue < (this.crumbArray[i].getExpiration())){
							currentExpirationValue = this.crumbArray[i].getExpiration();
						}
					}				
				}
							
				if((parseInt(currentExpirationValue) - date.getTime() > ( 24 * 60 * 60 * 1000))){
					// Convert milliseconds back into days	
					this.expiration = currentExpirationValue;
				}
				else{
				    // Expire cookies after one day
					this.expiration = date.getTime() + ( 24 * 60 * 60 * 1000);
				}		
			}
		}	
					
		/*
			This function will check if the crumb already exists
			and then attempt to remove it. Then it will add the crumb 
			to the master cookie 
		*/
		MasterCookie.prototype.addCrumb = function(crumb){
			var crumbExists = false;
			if(crumb != null && crumb instanceof CookieCrumb){
				var crumbName = crumb.getName();
				for(i=0;i < this.crumbArray.length; i++){
					if(this.crumbArray[i].getName() == crumbName){
						this.removeCrumb(crumbName);
					}
				}
				this.crumbArray.push(crumb);
				this.updateToLatestExpiration();
			}
		}
	
	
		/*
			This function will remove a crumb from the master cookie
			and adjust the expiration date based on the cooies inside of it.
		*/
		MasterCookie.prototype.removeCrumb = function(crumbName){
			for(i=0;i < this.crumbArray.length; i++){
				if(this.crumbArray[i].getName() == crumbName){
					this.crumbArray.splice(i,1);
				}
			}
			
   			if(this.isRegularType()){
				// Set expiration of master cookie to default value defined in config
				// if there are no crumbs left
				if(this.crumbArray.length == 0){
					this.expiration = new Date().getTime() + (this.configExpiration * 1000);
				}
				else{
					this.updateToLatestExpiration();	
				}		
			}
		}
	
		/*
			Returns the requested crumb to the caller
			If not found, returns null.
		*/
		MasterCookie.prototype.getCrumb = function(crumbName){
			for(var i=0;i < this.crumbArray.length; i++){
				if(this.crumbArray[i].getName() == crumbName){   	    	
	    			if(this.isRegularType()){
		    	    	// Remove the crumb if it has already expired
		    	    	if(this.crumbArray[i].getExpiration() != -1){
				   	    	var date = new Date();
			    	    	if(this.crumbArray[i].getExpiration() < date.getTime()){
				    	    	this.crumbArray.splice(i,1);
				    	    	break;
				    	    }
		    	    	}
	    			}				
					return this.crumbArray[i];
				}
			}
			// Crumb was not found or has expired
			return null;
		}
	
		/*
			This will convert the string representation of the current
			master cookie instance into a browser cookie
		*/
		MasterCookie.prototype.makeCookieString = function(){
			var expiresValue = "";
		
			if (this.expiration != null && this.expiration != "" && parseInt(this.expiration) > 0){
				var date = new Date();
				date.setTime(parseInt(this.expiration));
				expiresValue = "; expires=" + date.toGMTString();
			}
			else {
				
					expiresValue = ";";
							
			}
			
					
			if (this.path != null && this.path != ""){
				var pathValue = "; path=" + this.path;
			}
			else {
				var pathValue = ";";
			}		
			
			if (this.cookieDomain != null && this.cookieDomain != ""){
				var domainValue = "; domain=" + this.cookieDomain;
			}
			else {
				var domainValue = ";";
			}		
			
			return this.name + "=" + encodeURIComponent(this.makeCookieCrumbString()) + pathValue + domainValue + expiresValue;
		}
		
		
		/*
			Sort the crumbs based on name	
		*/
		MasterCookie.prototype.sortCrumbs = function(a,b){
			var crumbAName = a.getName();
			var crumbBName = b.getName();		
			var sortA = parseInt(crumbAName.substr(1));
			var sortB = parseInt(crumbBName.substr(1));
						
			return (sortA < sortB?-1:(sortA > sortB?1:0));
		}		
		
	
		/*
			This will convert all the cookie crumbs into a string
			that will get set to the value of the containing master cookie		
		*/
		MasterCookie.prototype.makeCookieCrumbString = function(){
			var crumbString = "";
			this.crumbArray.sort(this.sortCrumbs);
			for(i=0;i < this.crumbArray.length; i++){			
				if(crumbString != ""){
					crumbString += this.delimiter;
				}
				crumbString += this.crumbArray[i].getName() + this.equals + this.crumbArray[i].getValue();
				
				var crumbExp = this.equals;  
				if(this.isRegularType()){
					crumbExp += this.crumbArray[i].getExpirationInSeconds();						
				}

				crumbString += this.delimiter + this.crumbArray[i].getName() + this.expirationSuffix + crumbExp;			
			}				
			return crumbString;
		}
		
		
		/*
			Parse the value into crumbs based off of the delimiter
		*/
		MasterCookie.prototype.initialize = function(){
		
		
			if(this.value != null && this.value != ""){
				var cookieCrumbArray = this.value.split(this.delimiter);
				
				for(var i=0; i < cookieCrumbArray.length; i = i + 2){
				    var crumbString = cookieCrumbArray[i];
				    var index = crumbString.indexOf(this.equals);		    
					var name = crumbString.substring(0, index);
					var value = crumbString.substring(index+1, crumbString.length);

					var crumbObject = null;
					var crumbExpiration = "";
					
					if(this.isRegularType()){
						// Parse Expiration info					
					    crumbString = cookieCrumbArray[i + 1];
					    // Defect # 8794
					    if(crumbString !=null){					    					    
					    	index = crumbString.indexOf(this.equals);						
					    	crumbExpiration = crumbString.substring(index+1, crumbString.length);
					    }
						
						if(crumbExpiration != -1){
							// Convert seconds back into milliseconds since that is what the interface specifies
							crumbExpiration = parseInt(crumbExpiration) * 1000;
							crumbObject = new CookieCrumb(name, value, null);
							crumbObject.setExpiration(crumbExpiration);		
						}
						else{
							crumbObject = new CookieCrumb(name, value, crumbExpiration);
						}
					}
					else{
						crumbObject = new CookieCrumb(name, value, null);						
						crumbObject.setExpiration("");		
					}										
					this.addCrumb(crumbObject);					
				}
			}			
			
			// Initialize the real expiration date of cookie here
			if(this.expiration != -1){
				var date = new Date();
				this.expiration = parseInt(this.configExpiration) + date.getTime();
			}

			this.updateToLatestExpiration();
		}
		
		// This will setup the in-memory data structures for use later	
		this.initialize();		
	}
	
	
	/*
		 Creates a CookieCrumb object that contains info about a logical cookie
		 Expiration for each cookie crumb is stored in milliseconds where the value will be
	 	 cookie crumb expiration = expiration(milliseconds) + current time(milliseconds). 
		 PARAMETER: name - The name of the crumb.
		 PARAMETER: value - The unparsed value of the crumb.
		 PARAMETER: expiration - The number of days until the cookie expires	
	*/
	function CookieCrumb(name, value, expiration){
		this.name = name;
		this.value = value;
	
		// A null expiration means that the expiration value should be set explicitly 
		// by calling the setExpiration method
		if (expiration != null){
			if (expiration != "" && expiration > 0){
				var date = new Date();
				date.setTime(date.getTime() + (parseInt(expiration) * 24 * 60 * 60 * 1000));
				this.expiration = date.getTime();
			}
			else {
				// This means the cookie is a session crumb
				if(expiration < 0 || expiration == ""){
					this.expiration = -1;
				}
				else{
					// A zero means to expire the crumb
					this.expiration = 0;
				}
			}
		}
			
		CookieCrumb.prototype.getName = function(){
			return this.name;
		}		
	
		CookieCrumb.prototype.getValue = function(){
			return this.value;
		}		
	
		CookieCrumb.prototype.getExpiration = function(){
			return this.expiration;
		}

		/*
			PARAMETER: expiration - The number of miliseconds until the cookie expires	
		*/
		CookieCrumb.prototype.setExpiration = function(expiration){
			this.expiration = expiration;
		}
		
		CookieCrumb.prototype.getExpirationInSeconds = function(){
			if(this.expiration != null && this.expiration != "" && this.expiration != -1){
				return parseInt(this.expiration / 1000);
			}
			else{
				return this.expiration;
			}
		}
				
	}


	// Uses CookieManager to return 
	function readCookie(name) {
		return cookieManager.readCookie(name);
	}


	// Onload Stacker Function
	var onloadHandlers = [];
	window.onload = function(){
		for(var i=0;i<onloadHandlers.length;i++){
			eval(onloadHandlers[i]);
		}
	};


	// Get Elements By ClassName
	function getElementsByClassName(oElm, strTagName, strClassName){
		var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
		var arrReturnElements = new Array();
		strClassName = strClassName.replace(/\-/g, "\\-");
		var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
		var oElement;
		for(var i=0; i<arrElements.length; i++){
			oElement = arrElements[i];
			if(oRegExp.test(oElement.className)){
				arrReturnElements.push(oElement);
			}
		}
		return (arrReturnElements);
	}

	//Call to scroll the window to the top for DHTML layers
	function toTop() {
		self.scrollTo(0, 0);
	}


	function clickCheckInStoreLink(FORM,itemId)
	{
		if(FORM.checkCoordStatus !=null && FORM.checkCoordStatus.value == 'Y')
		{
			openLayer('checkInStoreAvail');
		}
		else
		{
			openLayer('checkInStoreAvail_'+ itemId);
		}
	}


	function findArg (name) {
		var sArgs = location.search.slice(1).split('&');
		var r = '';
		for (var i = 0; i < sArgs.length; i++) {
			if (sArgs[i].slice(0,sArgs[i].indexOf('=')) == name) {
				r = sArgs[i].slice(sArgs[i].indexOf('=')+1);
				break;
			}
		}
		return (r.length > 0 ? unescape(r) : '');
	}

	function openBuyingAppliances(url) {
		var openBuyingAppliances = window.open(url,'');
	}


	function openFAQs(url) {
		var openFAQs = window.open(url,'');
	}


	function launchNewWindow(newURL, height, width) {
		var newwindow = window.open(newURL,null,"height=" + height + ",width=" + width + ",resizable=1,scrollbars=1");
		return newwindow;
	}


	function openNewWindow(href, name) {
		var popupWin = window.open(href,name,'menubar, toolbar, location, directories, status, scrollbars, resizable, dependent, width=640, height=480, left=0, top=0');
	}


	function openFlexWindow(href, name) {
		popupWin = window.open(href,
		name,
		'width=500', 'height=500', 'left=0', 'top=0');
	}


	//Open New Window call for HomeDepotTV
	function MM_openBrWindow(theURL,winName,features) { //v2.0
		window.open(theURL,winName,features);
	}


	function isLocalStoreTab(defstore, param_locStore) {
		
		var url = window.location + '';
		// no local store number in the url
		if(url.indexOf(param_locStore) == -1) {
			return false;
		} else if (url.indexOf(param_locStore) > -1) {
			var startIdx = url.indexOf(param_locStore);
			var afterLocStore = url.substring(startIdx);
			var endIdx = afterLocStore.indexOf('=');
			var stopIdx = afterLocStore.indexOf('&');
			var locStore;
			if (stopIdx > 0) {
				locStore = afterLocStore.substring(endIdx +1, stopIdx);
			} else {
				locStore = afterLocStore.substring(endIdx + 1);
			}
			if (defstore != locStore){
				return true;
			}
		} else if (readCookie('THD_BROWSESTATUS') == '1') {
			return true;
		}
		return false;
	}


	function buildURLParam(param, value){
		param='&'+param+'='+value;
		return param;
	}


	function CreateClubLink(link){
		var THD_USERNAME = readCookie('THD_USERNAME');
		var THD_USEREMAIL = readCookie('THD_USEREMAIL');
		var THD_REMEMBERME = readCookie('THD_REMEMBERME');
		var THD_LOCSTORE = readCookie('THD_LOCSTORE');
		var THD_USERSTATUS = readCookie('THD_USERSTATUS');
		var THD_MINICART = readCookie('THD_MINICART');
		var THD_MINILIST = readCookie('THD_MINILIST');
		//Create the link with cookie information.
		if (THD_USERNAME != ''){link = link + buildURLParam('THD_USERNAME', THD_USERNAME);}
		if (THD_USEREMAIL != ''){link = link + buildURLParam('THD_USEREMAIL', THD_USEREMAIL);}
		if (THD_REMEMBERME != ''){link = link + buildURLParam('THD_REMEMBERME', THD_REMEMBERME);}
		if (THD_LOCSTORE != ''){link = link + buildURLParam('THD_LOCSTORE', THD_LOCSTORE);}
		if (THD_USERSTATUS != ''){link = link + buildURLParam('THD_USERSTATUS', THD_USERSTATUS);}
		if (THD_MINICART != ''){link = link + buildURLParam('THD_MINICART', THD_MINICART);}
		if (THD_MINILIST != ''){link = link + buildURLParam('THD_MINILIST', THD_MINILIST);}
		link = escape(link);
		document.location.href = link;
	}


	function getURLParam(strParamName){
		var strRet = "";
		var strHref = window.location.href;
		if ( strHref.indexOf("?") > -1 ){
			var strQueryString = strHref.substr(strHref.indexOf("?")).toLowerCase();
			var aQueryString = strQueryString.split("&");
			for ( var iParam = 0; iParam < aQueryString.length; iParam++ ){
				if ( aQueryString[iParam].indexOf(strParamName + "=") > -1 ){
					var aParam = aQueryString[iParam].split("=");
					strRet = aParam[1];
					break;
				}
			}
		}
		return strRet;
	}


	function numbersOnly(event) {
		var Key;
		if (event.keyCode) {
			Key = event.keyCode;
			// ignore backspace
			if (Key == 8 || Key == 13 || Key == 9){
				return true;
			}
		}else if(event.which) {
			Key = event.which;
		} else {
			Key = event.charCode;
		}
		if (Key<48||Key>57) {
			return false;
		}
	}


	function ccCharsOnly(e) {
		var keynum;
		if(e.keyCode)
		{
			keynum = e.keyCode;
		} else if(e.which) {
			keynum = e.which;
		} else if (e.charCode) {
			keynum = e.charCode;
		}
		if ( (keynum == 8) || (keynum == 9) || (keynum == 32) || (keynum == 45) || (keynum>47 && keynum<58)) {
			return true;
		} else {return false;}
	}


	function removeNonNumbers(event, field) {
		var filteredValue = '';
		var digits = "0123456789";
		for (var i=0; i<field.value.length; i++) {
			// do not add non-numeric values
			if (digits.indexOf(field.value.charAt(i)) != -1) {
				// current digit is ok, can add this
				filteredValue += field.value.charAt(i);
			}
		}
		// replace the filtered value
		field.value = filteredValue;
	}


	function removeNonCCChars(event, field) {
		var filteredValue = '';
		var digits = "0123456789 -";
		for (var i=0; i<field.value.length; i++) {
			// do not add non-numeric values
			if (digits.indexOf(field.value.charAt(i)) != -1) {
				// current digit is ok, can add this
				filteredValue += field.value.charAt(i);
			}
		}
		// replace the filtered value
		field.value = filteredValue;
	}


	function createHeaderCookies() {
		var val = findArg('referral');
		if(val.length > 0) {
			createCookie("THD_REFERER_WC", val, null);
		}
		var onlineStore = '';
		if(onlineStore.length > 0 && onlineStore == "true") {
			createCookie('THD_BROWSESTATUS', '-1', '-1');
		}
	}

	function goToTHDMyAccountFromJS(){
		var nonRegisteredTHDMyAcctURL = THDLogonCmd + "URL=UserAccountView&";
		goToLinkFromJS(nonRegisteredTHDMyAcctURL,nonRegisteredTHDMyAcctURL);
	}

	function goToOrderStatusFromJS() {
		var nonRegisteredURL = 'http://' + getHostNameNonSecure() + '/webapp/wcs/stores/servlet/OrderTrackingForm?langId=-1&storeId=10051&catalogId=10053';
		var registeredURL = 'https://' + getHostNameSecure() + '/webapp/wcs/stores/servlet/OrderSummaryJSONView?storeId=10051&langId=-1&catalogId=10053&orderType=online&ParentPageName=OnlineOrdersPage';
		//var registeredURL = 'https://' + getHostNameSecure() + '/webapp/wcs/stores/servlet/OrderSummary?langId=-1&storeId=10051&catalogId=10053&newPage=true&orderType=online';
		//var registeredURL = 'https://' + getHostNameSecure() + '/webapp/wcs/stores/servlet/OrderStatusDisplay?langId=-1&storeId=10051&catalogId=10053';

		goToLinkFromJSForCatalog(nonRegisteredURL,registeredURL);
	}

	function goToTHDMyCreditFromJS(){
		var CreditCenterURL = THDContentViewCmd + "pn=Credit_Center&";
		goToLinkFromJS(CreditCenterURL,CreditCenterURL);
	}
	
	function goToTHDMyListFromJS(){
		goToLinkFromJS(THDInterestItemVerifyCmd,InterestItemDisplayCmd);
	}
	
	function goToTHDMyProjectsFromJS(){
		var nonRegisteredTHDMyProjectsURL = THDLogonCmd + "URL=THDUserProjListView&";
		goToLinkFromJS(nonRegisteredTHDMyProjectsURL,THDUserProjListViewCmd);
	}
	
	function goToLinkFromJS(nonRegisteredURL, RegisteredURL) {
		var cmd = nonRegisteredURL;
		// readCookie is located in utils.js file
		var isLoggedOn = readCookie("THD_USERSTATUS") == '1';		
		if(isLoggedOn) {
			cmd = RegisteredURL;
			document.location.href = cmd;
		}else if(nonRegisteredURL.indexOf('THDInterestItemVerify') != -1){
			var splitIndex = nonRegisteredURL.indexOf('?');
			//var ajaxURL = nonRegisteredURL.slice(0, splitIndex);
			var ajaxURL =  '/webapp/wcs/stores/servlet/THDInterestItemListOperation';
			var postData =nonRegisteredURL.slice(splitIndex+1) ;

			postData = postData + '&opCode=13'+ '&requestType=ajax';
			var response = $.ajax({
				url: ajaxURL, 
				type:"POST", 		
				data: postData,
				success: function(data) {	 
				var fromPage = $('#fromPage').val(); 
				loadFancyPopup(data, fromPage, 13); 
			},
	   complete: function (data, fromPage){
	   var opCode = $('input[name="opCode"]').val();
	   if (fromPage == "quickView" ) 
			{
			$('#fancybox-content', top.document).css({'width':'378px', 'height':'auto'});
			$('#fancybox-content', top.document).children('div:first').css({'width':'378px', 'height':'auto'});	
			$('.cartPopup', top.document).append('<div style="clear:both"></div>');
			$('#popupSignIn', top.document).append('<div style="clear:both"></div>');
			if(opCode==9){
				$('#popupCreateNewList', top.document).css({'display':'none'});
			}
		}
		else{
			$('#fancybox-content').css({'width':'460px', 'height':'auto'});
			$('#fancybox-content').children('div:first').css({'width':'460px', 'height':'auto'});	
			$('#popupSignIn').append('<div style="clear:both"></div>');
			$('.cartPopup').append('<div style="clear:both"></div>');
			if(opCode==9){
				$('#popupCreateNewList').css({'display':'none'});
			}
		}
		},
			error: function(data){
			}});	

		}else{
			document.location.href = cmd;
		}
	}
	function goToLinkFromJSForCatalog(nonRegisteredURL, registeredURL) {
		var url = nonRegisteredURL;
		// readCookie is located in utils.js file
		var isLoggedOn = readCookie("THD_USERSTATUS") == '1';
		if(isLoggedOn) {
			url = registeredURL;
		}
		document.location.href = url;
	}
	
	/*MyAccount Rel2 - New method Added : Start*/
	var qv_fromPage;
	function displayModalWindow() {
		// readCookie is located in utils.js file 
		var isLoggedOn = readCookie("THD_USERSTATUS") == '1'; 
		if(isLoggedOn) { 
		fromPage = getURLParam('qv_frompage'); 
		qv_fromPage = getURLParam('qv_frompage');
		if(fromPage =='undefined' || fromPage ==''){ 
			if(document.getElementById("fromPage") != null) 
			var fromPage = $("#fromPage").val();
				if (fromPage == 'quickview'){
				fromPage = 'quickView';
		}
		$("#fromPage").val(fromPage);
		} 
		if(document.getElementById("clickAddToListButton")){ 
		var click = $("#clickAddToListButton").val(); 
		} 
		if(typeof click =='undefined' || click ==''){ 
		click = getURLParam('clickaddtolistbutton'); 
		$("#clickAddToListButton").val(click);
		} 
		if(click !='' && click != 'false' && click !='undefined'){
		// Set the variable to false so that the ajaxcall doesnot run everytime on refresh 
		$("#clickAddToListButton").val(false);
		if(fromPage !='undefined' && fromPage !='' && fromPage == "shoppingCart") { 
		if(document.getElementById("matchIndex") != null){ 
		var matchIndex = $("#matchIndex").val(); 
		} 
		var catEntryId = document.getElementById("productId_" + matchIndex).value; 
		makeAjaxCall('',9,'',catEntryId,'','','',matchIndex); 
		} 
		else if(fromPage !='undefined' && fromPage !='' && fromPage == 'productDetail'){ 
		var catEntryId = $('input[name="productId"]').val(); 
		makeAjaxCall('',9,'',catEntryId,'','','',1); 
		} 
		else if(fromPage !='undefined' && fromPage !='' && (fromPage == 'quickView' || fromPage == 'quickview')) { 
		var catEntryId = getURLParam('qv_login_productid'); 
		//var catEntryId = document.getElementById("QV_Login_ProductId").value;
		if(catEntryId == '' || catEntryId == 'undefined'){ 
			if(document.getElementById("productId_1"))
			$("#productId_1").val(catEntryId);
			if(document.getElementById("QV_Login_ProductId"))
			$("#QV_Login_ProductId").val(catEntryId);
		} 
		
		//For Create Account, Even if CatEntryId is empty, set the catEntryId from url.
		if(catEntryId == '' || catEntryId == 'undefined'){ 
			catEntryId = getURLParam('catentryid');
			$("#QV_Login_ProductId").val(catEntryId);
			
		}
		var quantity = getURLParam('qv_login_quantiyid');
		//var quantity = document.getElementById("QV_Login_QuantiyId").value; 
		if(quantity == '' || quantity == 'undefined'){ 
		if(document.getElementById("QV_Login_QuantiyId"))
		$("#QV_Login_QuantiyId").val(quantity);
		} 
			
		//For Create Account, Even if quantity is empty, set the quantity as 1.
		/*if(quantity == '' || quantity == 'undefined'){ 
			document.getElementById("QV_Login_QuantiyId").value = 1;
		}*/
		
		var iFrame = 'http://' + getHostNameNonSecure() + '/webapp/wcs/stores/servlet/QuickViewService?storeId=';

		var langId, catalogId, storeId, superSkuId;
		if (document.getElementById("langId"))
		langId = document.getElementById("langId").value;
		else
		langId = getURLParam('langid');
		if (document.getElementById("catalogId"))
		catalogId = document.getElementById("catalogId").value;
		else
		catalogId = getURLParam('catalogid');

		if (document.getElementById("storeId"))
		storeId = document.getElementById("storeId").value;
		else
		storeId = getURLParam('storeid');
		
		superSkuId = getURLParam('superskuid');
		
		iframeURL = iFrame+ storeId +'&langId='+langId+'&catalogId='+catalogId+'&R='+catEntryId+'&catEntryId='+catEntryId;
			
		if(superSkuId != '' && superSkuId != 'undefined'){ 
			iframeURL = iframeURL+'&superSkuId='+superSkuId;
		}
		
		makeAjaxCall('',9,'',catEntryId,quantity,'','',1); 
		} 
		} 
		} 
		} 
	
	function setUserstatusCookieTo2() {
		createCookie("THD_USERSTATUS","1");
	}

	function getMiniCartInfo(freeShipThreshold, hasRunningFreeShipPromo, numberItemsInCart, totalCartAmount, orderQualifiesForFreeShip){
	    var amtRemainingForFreeShipping;
	    var miniCartJsonStr = readCookie("THD_MINICART");
	    
		// ***********************************************************************************************************************
		// Check to see if the cookie contains part of the expected JSON object.  
		//		If it doesn't, build the generic JSON object (0 in cart....)
		// NOTE: This if statement handles 
		//        1) cookie is null
		//        2) cookie is present but it's the old style cookie (just a number in the cart) .. NO JSON OBJECT
		// **********************************************************************************************************************	      

  	    if (miniCartJsonStr == "" || miniCartJsonStr.indexOf("I1") < 0 ){
			miniCartJsonStr = '{"I1":"' + numberItemsInCart + '","F1":"' + hasRunningFreeShipPromo + '","F2":"' + orderQualifiesForFreeShip + '","D1":"'+ totalCartAmount +'","D2":"'+ freeShipThreshold + '"}';
	    	createCookie("THD_MINICART", miniCartJsonStr);
	    }
	}


	function getMiniListInfo(){
		var ARG_THD_MINILIST = findArg('THD_MINILIST');
		var isLoggedOn = readCookie("THD_USERSTATUS") == '1';
		if(isLoggedOn) {
			if (ARG_THD_MINILIST > 0) {
				document.write('(' + ARG_THD_MINILIST + ')');
			} else {
				ARG_THD_MINILIST = readCookie("THD_MINILIST");
				if(ARG_THD_MINILIST > 0) {
					document.write('(' + ARG_THD_MINILIST + ')');
				} else {
				}
			}
		}
	}


	//Function retrieves the users local store as stored in the THD_LOCSTORE cookie
	//This is then set into the global variable locStoreNo so that it is available to all functions
	function getLocalStore(){
		var locStoreAddress = readCookie('THD_LOCSTORE');
		window.locStoreNo = "";
		
		if(locStoreAddress != null && locStoreAddress.length != 0) {
			var splLocStoreAddress = locStoreAddress.split('+');
		  	if (splLocStoreAddress.length < 2) {
			    locStoreAddress = unescape(locStoreAddress);
			    splLocStoreAddress = locStoreAddress.split('+');
		    if (splLocStoreAddress.length < 2) {
		     return;
		    }
		 }
	
		 var tmpLocStoreNo = splLocStoreAddress[0];

		 if (tmpLocStoreNo != null) {
		 	window.locStoreNo=tmpLocStoreNo;
		 }
		}
	}


	/*	Function To Show/Hide PopUp Layers	*/
	/* ========================================================================= */
	// Hide and Show Select Boxes
	function showSelects(context){
		var selects = document.getElementsByTagName('select');
		for(var s=0, select;s<selects.length ; s++){
			select=selects[s];
			select.style.visibility='visible';
		}
	}


	function hideSelects(context){
		var selects = document.getElementsByTagName('select');
		for(var s=0, select;s<selects.length ; s++){
			select=selects[s];
			select.style.visibility='hidden';
		}
	}


	function closeLayer(id){
		showSelects();
		var layer = document.getElementById(id);
		layer.style.display = 'none';
		var navCover = document.getElementById('nav-cover');
		if (navCover) {
			navCover.style.visibility='hidden';
		}
	}


	function openLayer(id){
		hideSelects();
		var layer = document.getElementById(id);
		layer.style.display = 'block';
		var navCover = document.getElementById('nav-cover');
		if (navCover) {
			navCover.style.visibility='visible';
		}
	}


	function getStyle(elem, style){
		if (elem.currentStyle){
			return elem.currentStyle[style];
		}
		else if(window.getComputedStyle){
			var compStyle = window.getComputedStyle(elem, "");
			return compStyle.getPropertyValue(style);
		}
	}

	function PopUpDetector(){
		if(!document.getElementById){return;}
		var t = this;
		t.popups = getElementsByClassName(document, 'div', 'popup-layer');
		if(!t.popups){return;}
		if(t.popups.length>0){
			// Check for visible layer & hide form elements
			var disp = getStyle(t.popups[0], 'display');
			if(disp=='block'){
				hideSelects();
				return false;
			}
		}
	}


	onloadHandlers[onloadHandlers.length] = "PopUpLayerDetector = new PopUpDetector()";


	/*		Function To Show/Hide the "Add a Message" for the cart       */
	/* ========================================================================= */
	function turnOffSelects(isChecked){
		var selectBoxes = document.getElementsByTagName('select');
		for(var i=0;i<selectBoxes.length;i++){
			if(isChecked){
				selectBoxes[i].style.visibility="hidden";
			}
			else{
				selectBoxes[i].style.visibility="visible";
			}
		}
		return;
	}


	// Used to show the Personalized Message
	function addMessage(thisProd, isChecked){
		turnOffSelects(isChecked);
		var pos = thisProd.childNodes.length;
		for(var i=0; i<pos; i++){
			if (thisProd.childNodes[i].className=="personalized-message"){
				if(isChecked){
					thisProd.childNodes[i].style.display = "block";
					thisProd.childNodes[i].parentNode.style.zIndex = thisProd.childNodes[i].parentNode.style.zIndex + 5;
					thisProd.childNodes[i].zIndex = thisProd.childNodes[i].zIndex + 10;
					var divObj = document.getElementById("OrderItemShipMethodChooseDIV");
					if(divObj != null){
						divObj.style.visibility="hidden";
					}
				}
				else{
					thisProd.childNodes[i].style.display = "none";
					thisProd.style.zIndex = thisProd.style.zIndex - 10;
					var divObj = document.getElementById("OrderItemShipMethodChooseDIV");
					if(divObj != null){
						divObj.style.visibility="visible";
					}
				}
			}
		}
	}


	function editMessage(thisProd) {
		turnOffSelects(true);
		var pos = thisProd.childNodes.length;
		for(var i=0; i<pos; i++){
			if (thisProd.childNodes[i].className=="personalized-message"){
				thisProd.childNodes[i].style.display = "block";
				var divObj = document.getElementById("OrderItemShipMethodChooseDIV");
				if(divObj != null){
					divObj.style.visibility="hidden";
				}
			}
		}
		var messageCheck = thisProd.getElementsByTagName('input');
		for(i=0;i<messageCheck.length;i++){
			if(messageCheck[i].className=="checkbox message-check"){messageCheck[i].checked=true;}
		}
	}

/*
	function editMessageAbs(itemIndex, thisProd) {
		turnOffSelects(true);
		var msgDiv = document.getElementById("gcm_" + itemIndex);
		if (msgDiv == null)
		{
			editMessage(thisProd);		
		}
		else
		{
			msgDiv.style.display = "block";
			var divObj = document.getElementById("OrderItemShipMethodChooseDIV");
			if(divObj != null){
				divObj.style.visibility="hidden";
			}
			
			var messageCheck = thisProd.getElementsByTagName('input');
			for(i=0;i<messageCheck.length;i++){
				if(messageCheck[i].className=="checkbox message-check"){messageCheck[i].checked=true;}
			}
		}
	}
*/

	function cancelMsg(thisMess){
		var messInputs = thisMess.getElementsByTagName('input');
		for(var i=0;i<messInputs.length;i++){
			messInputs[i].value="";
		}
		var messageCheck = thisMess.parentNode.parentNode.getElementsByTagName('input');
		for(i=0;i<messageCheck.length;i++){
			if(messageCheck[i].className=="checkbox message-check"){messageCheck[i].checked=false;}
		}
		thisMess.style.display = 'none';
		var divObj = document.getElementById("OrderItemShipMethodChooseDIV");
		if(divObj != null){
			divObj.style.visibility="visible";
		}
		turnOffSelects(false);
	}


	function addGiftCardMessage(formId, urlValue) {
		if (!busy) {
		    var form = document.getElementById(eval(formId));
			busy = true;
			form.URL.value = eval(urlValue);
			form.submit();
		}
	}


	function cancelMsgSummConfirm(thisMess,itemNumber,frmName){
		thisMess.style.display = 'none';
		turnOffSelects(false);
		
		var line1 = eval("document."+frmName+".messageLine_"+itemNumber+"_1");
		line1.value = eval("document."+frmName+".LineSaved_"+itemNumber+"_1.value");
		var line2 = eval("document."+frmName+".messageLine_"+itemNumber+"_2");
		line2.value = eval("document."+frmName+".LineSaved_"+itemNumber+"_2.value");
		var line3 = eval("document."+frmName+".messageLine_"+itemNumber+"_3");
		line3.value = eval("document."+frmName+".LineSaved_"+itemNumber+"_3.value");
	
		var fromField1 = eval("document."+frmName+".messageFrom_"+itemNumber+"_2");
		if(fromField1){
				
		var From1 = eval("document."+frmName+".messageFrom_"+itemNumber+"_1");
		From1.value = eval("document."+frmName+".FromSaved_"+itemNumber+"_1.value");
		
		var From2 = eval("document."+frmName+".messageFrom_"+itemNumber+"_2");
		From2.value = eval("document."+frmName+".FromSaved_"+itemNumber+"_2.value");}
		
		var divObj = document.getElementById("OrderItemShipMethodChooseDIV");
		if(divObj != null){
			divObj.style.visibility="visible";
		}
	}

	function addMessage1(thisMess,itemNumber,frmName){
		thisMess.style.display = 'none';
		turnOffSelects(false);
		
		var lineSaved1 = eval("document."+frmName+".LineSaved_"+itemNumber+"_1");
		lineSaved1.value = eval("document."+frmName+".messageLine_"+itemNumber+"_1"+".value");
		var lineSaved2 = eval("document."+frmName+".LineSaved_"+itemNumber+"_2");
		lineSaved2.value = eval("document."+frmName+".messageLine_"+itemNumber+"_2"+".value");
		var lineSaved3 = eval("document."+frmName+".LineSaved_"+itemNumber+"_3");
		lineSaved3.value = eval("document."+frmName+".messageLine_"+itemNumber+"_3"+".value");
		var fromField1 = eval("document."+frmName+".messageFrom_"+itemNumber+"_1");
	
		if(fromField1){
			var FromSaved1 = eval("document."+frmName+".FromSaved_"+itemNumber+"_1");
			FromSaved1.value = eval("document."+frmName+".messageFrom_"+itemNumber+"_1"+".value");
			var FromSaved2 = eval("document."+frmName+".FromSaved_"+itemNumber+"_2");
			FromSaved2.value = eval("document."+frmName+".messageFrom_"+itemNumber+"_2"+".value"); 
		}
	
		var divObj = document.getElementById("OrderItemShipMethodChooseDIV");
		if(divObj != null){
			divObj.style.visibility="visible";
		}
	}


	/*	Functions To control printing	*/
	/* ========================================================================= */
	// Control Print Functionality
	function basicPrint(){
		window.print();
	}


	// Assign Print Functionality
	function assignPrintLinks(){
		var element = document.getElementById('noPrintPage');
		//if the noPrintPage ID is defined on the page then do not run this script
		//currently on the SiteMap page has this ID. this page has to many link on it for this JS to be efficient
		if ( element == null ){
			var printPageLinks = getElementsByClassName(document, 'a', 'print-page');
			for(var i=0, link; i<printPageLinks.length; i++){
				link=printPageLinks[i];
				link.onclick=function(){basicPrint(); return false;};
			}
		}
	}


	// Assign OnLoad
	onloadHandlers[onloadHandlers.length] = "assignPrintLinks();";


	/*	Functions To Flash Inclusion	*/
	/* ========================================================================= */
	function FlashDetector(instanceName){
		var t = this;
		var activeX = false;
		t.ieAutoInstall = true;
		t.hasVersion = function(ver){
			t.swf = false;
			if(!ver){ver = 0;}
			var n = navigator;
			if(n.plugins && n.plugins.length > 0){
				var m,tp,d,v;
				m = n.mimeTypes;
				tp = 'application/x-shockwave-flash';
				if(m && m[tp] && m[tp].enabledPlugin && m[tp].enabledPlugin.description){
					d = m[tp].enabledPlugin.description;
					v = d.substring(d.indexOf('.')-2, d.indexOf('.'));
					v.replace(' ','');
					t.swf = (v >= ver) ? true : false;
				}
			}else if(n.appVersion.indexOf("Mac") == -1 && window.execScript){
				for(var i=ver; i<=10&&i!=1&&t.swf!=true; i++){
					execScript('on error resume next: '+instanceName+'.swf=IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash'+((i==0)?'':'.'+i)+'"))','VBScript');
				}
				activeX = true;
			}else{
				t.swf = false;
			}
			return t.swf;
		};
		t.getPluginTag = function(swfFile,width,height,align,bgcolor,ver,altFormat,params){
			var s = '';
			var win = (navigator.appVersion.toLowerCase().indexOf("win")!=-1);
			var ie = (navigator.appName=="Microsoft Internet Explorer");
			if(t.hasVersion(ver) && swfFile || win && ie && swfFile && t.ieAutoInstall){
				var additionalParams = '';
				if(params && params.length>0){
					var pArray = params.split(",");
					for(var i=0; i<pArray.length; i++){
						var ta = pArray[i].substr(0,pArray[i].indexOf('='));
						var v = pArray[i].substr(pArray[i].indexOf('=')+1,pArray[i].length);
						additionalParams += (activeX)?'\t<param name="' + ta + '" value="' + v + '" />\n': ' '+ ta + '="' + v + '"';
					}
				}
				if(activeX){
					s = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,21,0" width="'+width+'" height="'+height+'" align="'+align+'">\n';
					s += '\t<param name="movie" value="'+swfFile+'" />\n';
					s += '\t<param name="quality" value="high" />\n';
					s += '\t<param name="menu" value="false" />\n';
					s += '\t<param name="bgcolor" value="'+bgcolor+'" />\n';
					s += additionalParams;
					s += altFormat;
					s += '</object>\n\n';
					return s;
				}else{
					s = '<embed src="'+swfFile+'" quality="high" pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" menu="false" width="'+width+'" height="'+height+'" align="'+align+'" bgcolor="'+bgcolor+'"'+additionalParams+'></embed>\n';
					return s;
				}
			}else{
				t.noFlash = true;
				return altFormat;
			}
		};
		t.embedMovie = function(swfFile,width,height,bgcolor,ver,altFormat,params){
			document.write(flash.getPluginTag(swfFile,width,height,'',bgcolor,ver,altFormat,params));
		};
		t.embedMovieWithAlign = function(swfFile,width,height,align,bgcolor,ver,altFormat,params){
			document.write(flash.getPluginTag(swfFile,width,height,align,bgcolor,ver,altFormat,params));
		};
	}


	var flash = new FlashDetector("flash");
	var StyleGallery = function(){
		var t = this;
		if(!document.getElementById('gallery')){return;}
		// Properties
		t.thumbs = document.getElementById('gallery-thumbs').getElementsByTagName('a');
		t.bigImg = document.getElementById('gallery-image');
		t.contents = document.getElementById('gallery-details-content').getElementsByTagName('div');
		t.view = document.getElementById('gallery-larger');
		t.prev = document.getElementById('gallery-prev');
		t.next = document.getElementById('gallery-next');
		t.current = 0;
		// Setup Thumb Links
		t.initThumbs = function(){
			if(!t.thumbs){return;}
			for(var i=0;i<t.thumbs.length;i++){
				if(t.thumbs[i].className=='gallery-thumb-link'){
					t.thumbs[i].position=i;
					t.thumbs[i].onclick=function(){
						t.current = this.position;
						t.switchImage(this.position);
						t.switchContent(this.position);
						return false;
					};
				}
			}
		};
		// Setup Controls
		t.initControls = function(){
			//View Larger
			t.view.onclick = function(){
				var regex = /_hero/i;// This will ignore the case of the hero letters.
				var largeImgURL = t.thumbs[t.current].href.replace(regex,'_large');
				window.open(largeImgURL,'ViewLarger', 'status = 1, height = 438, width = 670, resizable = 0');

				return false;
			};
			// Previous
			t.prev.onclick = function(){
				if(t.current>0){
					t.current--;
					t.switchImage(t.current);
					t.switchContent(t.current);
				}
				return false;
			};
			// Next
			t.next.onclick = function(){
				if(t.current<t.thumbs.length-1){
					t.current++;
					t.switchImage(t.current);
					t.switchContent(t.current);
				}
				return false;
			};
		};// End Setup Controls
		// Switch Image
		t.switchImage = function(num){
			if(t.thumbs[num].href==''){return;}
			t.bigImg.src = t.thumbs[num].href;
		};//End Switch Image
		// Switch Content
		t.switchContent = function(num){
			if(!t.contents[num]){return;}
			for(var i=0; i<t.contents.length; i++){
				t.contents[i].style.display = 'none';
			}
			t.contents[num].style.display = 'block';
		};//End Switch Content
		// Initialization
		t.init = function(){
			t.initThumbs();
			t.initControls();
		};// End Initialization
		// Initialize
		this.init();
	};


	// Onload Init
	onloadHandlers[onloadHandlers.length] = 'StyleGallery = new StyleGallery();';

	// Function for Collapsible Link
	function collapsexpand(ID) { 
		if (document.getElementById(ID).style.display == "block"){ 
			document.getElementById(ID).style.display = "none";        
			if(ID.charAt(0)=="a"){
		    	document.getElementById("z"+ID).className="collapsecat2";
			}
			if(ID.charAt(0)=="b"){
		    	document.getElementById("s"+ID).className="collapseqst2";
			} 
		}
		else { 
			document.getElementById(ID).style.display = "block"; 
			if(ID.charAt(0)=="a"){
		    	document.getElementById("z"+ID).className="collapsecat3";
			}
			if(ID.charAt(0)=="b"){
				document.getElementById("s"+ID).className="collapseqst3";
			} 
		} 
	}


	function displayMessageDiv(divId){
	
		var divObj = document.getElementById(divId);
		divObj.style.display = "block";
		try{
		 hideSelects();
		}
		catch(e){
		}
		
		var offset = getOffset(event.srcElement, divId);




		divObj.style.top = offset;
		scrollToDIV(divId);
		return offset;
	}

	function cancelMessageDiv(divId){
		var divObj = document.getElementById(divId);
		divObj.style.display = "none";
		try{
		 showSelects();
		}
		catch(e){
		}	
	}
	
	function getOffset(srcElement, divId){
		var parentObj = srcElement;
		var offset = 0;
	
		for(;;){
			parentObj = parentObj.offsetParent;		
			if(parentObj.tagName == "HTML"){







				break;
			}
			offset += parentObj.offsetTop;
		}
	
		var divObj = document.getElementById(divId);
	
	
		offset = offset - divObj.clientHeight - 10;
		return offset;
	}
	
	function scrollToDIV(divId){
	    var offset = getOffset(event.srcElement, divId);
		window.scrollTo(0, offset);
	}
	
	/**
	 * Allows the user to change just the captcha image without refreshing the entire page.
	 * used by CaptchaInclude.jspf.  The time on the end is to help prevent caching.
	 * 
	 * Added for GCO project.
	 */
	function changeCaptcha(formName)
	{
//		document.getElementById('captchaVerification').value = '';
		var formsArrayLength = document.forms.length
		for (var i=0; i< formsArrayLength; i++)
		{
			var captchaVerification = document.forms[i].captchaVerification;
			if (captchaVerification != null)
			{
				captchaVerification.value = '';
				break;
			}
			
		}
		var image = document.getElementById("captcha-image");
		image.src = "CaptchaView?storeId=10051&catalogId=10053&"+ (new Date().getTime());
	}
	
	/**
	 * Added WCS7Up CodeMerge 4.5.2 STARTS
	 * PARAMETER: rxg8229 searchTerm - This is the input html object and not the value being searched for : Modified as a part of INTERSEARCPRO-rxg8229
	 */
  // this is used in several search functions below
  var searchFieldText = 'Enter Keyword or SKU';

  function validateSearchRequest(searchTerm,searchUrl){
		    searchTerm.value = searchTerm.value.replace(/^\s+|\s+$/g,'');
			if(searchTerm.value != '' && searchTerm.value != searchFieldText){
				try{
					lpAddVars('session','SearchKeyword', searchTerm.value);
				}catch(err){}	
				/*
				  Check if the user selected any category.
				*/ 	 
				 var category_name = $("#HeaderArea").val();
				 var selectedCategory = category_name;
				 if(selectedCategory.indexOf("&")>=0)
				 {
					 selectedCategory = selectedCategory.replace(/ /g,'');
					 var newCategoryname = selectedCategory.split("&");
					 selectedCategory = newCategoryname[0]+encodeURIComponent("&")+newCategoryname[1];
				 }
				 else
				 {
					 selectedCategory = selectedCategory.replace(/ /g,'');
				 }
				 if(category_name!="SEARCH ALL"){	
				    var selectedVal = $("#encodedNVal").val(); 
					var category_value = "5yc1vZ"+selectedVal;	
					var omnivalue = encodeURIComponent(encodeURIComponent(encodeURIComponent(category_name))); //Triple encoding							
					if(category_name.indexOf("&")>=0){ 
					  category_name = category_name.replace(/ /g,'');
					  category_name = category_name.replace(/&/g,'-');
					}else{
					  category_name = category_name.replace(/ /g,'-');
					}	
					var encodedKeyWord = encodeURIComponent(encodeURIComponent(searchTerm.value));//Double Encoding if contains & symbol
			        var host_name = searchUrl.substring(0,searchUrl.indexOf("/webapp"));
			        var urlParams = 'keyword='+ encodeURIComponent(searchTerm.value)+'&Ns=None&Ntpr=1&Ntpc=1&selectedCatgry='+selectedCategory+'&omni='+omnivalue
			        				+'&langId=-1&storeId=10051&catalogId=10053';
			        var formActionURL = host_name +"/"+category_name+"/h_d1/N-"+category_value+"/Ntt-"+encodedKeyWord+"/searchNav-true/h_d2/Navigation?"+urlParams;
				}else{
					var urlParams = 'keyword='+ encodeURIComponent(searchTerm.value)+'&Ns=None&Ntpr=1&Ntpc=1&selectedCatgry='+ selectedCategory;
				    var formActionURL = searchUrl+urlParams;
				}

				// Used to add analytics tracking of Google SAYT usage
				if ($('#searchFocus').attr('data-typeAheadMode') === 'SAYT') {
					formActionURL += '&sayt=sayt';
				}
				// QC-23900 12-3-2012 remove 'document.location= formActionURL;' replace with submit
				$('#searchBoxForm').attr('action',formActionURL).submit();
				return true;
			}else{
				searchTerm.value = searchFieldText;
				return false;
			}
	}

function makeHeader(HeaderTitle,EncodedValue,index) {
		document.getElementById('HeaderArea').value = HeaderTitle;
		document.getElementById('encodedNVal').value = EncodedValue;
		document.getElementById('dept-dropdown').className = 'dept-dropdown2'; 
		document.getElementById('selectedCatgry').value = HeaderTitle;
		var totCnt = $('#searchDeptCnt').val();
 		for(i=0;i<=totCnt;i++){
 		  if(i!=index){ 
 		  		$('#department'+i).css('background-color', '');
 		  }
 		}
 	      $('#department'+index).css('background-color', '#FFFFFF');
}

function resetClass() {
	if (document.getElementById('dept-dropdown').className != 'dept-dropdown') {
		document.getElementById('dept-dropdown').className = 'dept-dropdown';
	}
	else {
	    document.getElementById('dept-dropdown').className = 'dept-dropdown2'; 
	}
}
function resetClass2() {
	setTimeout("document.getElementById('dept-dropdown').className = 'dept-dropdown2';",500);
}


function resetClassagain() {
	if (document.getElementById('dept-dropdownagain').className != 'dept-dropdownagain') {
		document.getElementById('dept-dropdownagain').className = 'dept-dropdownagain';
	}
	else { document.getElementById('dept-dropdownagain').className = 'dept-dropdown2again'; 
	}
}
function resetClass2again() {
	setTimeout("document.getElementById('dept-dropdownagain').className = 'dept-dropdown2again';",500); 
}
function makeHeaderagain(HeaderTitle,EncodedValue,index) {
	// move selection text to input field, add spaces	
		document.getElementById('HeaderAreaagain').value = HeaderTitle;
		document.getElementById('encodedNValagain').value = EncodedValue;
		document.getElementById('dept-dropdownagain').className = 'dept-dropdown2again'; 
		document.getElementById('selectedCatgryagain').value = HeaderTitle;
		var totCnt = $('#searchDeptCntagain').val();
 		for(i=0;i<=totCnt;i++){
 		  if(i!=index){ 
 		  		$('#departmentagain'+i).css('background-color', '');
 		  }
 		}
 	      $('#departmentagain'+index).css('background-color', '#FFFFFF');
	
}

	
	function validateSearchRequestagain(searchTerm,searchUrl){
		    searchTerm.value = searchTerm.value.replace(/^\s+|\s+$/g,'');
			if(searchTerm.value != '' && searchTerm.value != searchFieldText){
				try{
				lpAddVars('session','SearchKeyword', searchTerm.value);
				}catch(err){}
				/*
				  Check if the user selected any category.
				*/ 	
				 
				  category_name = $("#HeaderAreaagain").val();				   
				 if(category_name!="SEARCH ALL"){
					var selectedVal = $("#encodedNValagain").val(); 	
				    var category_value = "5yc1vZ"+selectedVal;				  	
					var omnivalue = encodeURIComponent(encodeURIComponent(category_name)); //Double encoding							
					if(category_name.indexOf("&")>=0){ 
					  category_name = category_name.replace(/ /g,'');
					  category_name = category_name.replace(/&/g,'-');						  
					}else{
					  category_name = category_name.replace(/ /g,'-');
					}	
					$("#omni").val(omnivalue);//Setting Omni Value for capturing omnievents
 					var encodedKeyWord = encodeURIComponent(encodeURIComponent(searchTerm.value));//Double Encoding if contains & symbol
			        var host_name = searchUrl.substring(0,searchUrl.indexOf("/webapp"));
			        var formActionURL = host_name +"/"+category_name+"/h_d1/N-"+category_value+"/Ntt-"+encodedKeyWord+"/searchNav-true/h_d2/Navigation";
				}else{
				     var formActionURL = searchUrl;
				  	 $("#omni").remove();
				}
				 
				   $('#searchBoxFormagain').attr("action",formActionURL);
				   return true;
			}else{
				searchTerm.value = searchFieldText;
				return false;
			}
	}
	// Added WCS7Up CodeMerge 4.5.2 ENDS	

function validateSearchReq(searchTerm){
	    searchTerm.value = searchTerm.value.replace(/^\s+|\s+$/g,'');
		if(searchTerm.value != '' && searchTerm.value != searchFieldText){
			lpAddVars('session','SearchKeyword', searchTerm.value);
			return true;
		}else{
			searchTerm.value = searchFieldText;
			return false;
		}
	}
	
	
		
/*************************************************************************************************
*  Function:  loadLightBox
*	function that that is responsible for loading a lightbox object (id + overlay)
*
*  Parms:
*	idToShow:  the id of the div that needs to be shown 
**************************************************************************************************/
	function loadLightBox(idToShow)
	{
		 turnOffSelects(true);
		 var lightBox = document.getElementById(idToShow);
 
  	  	if (lightBox != null)
	  	{ 
	   		if ( lightBox.className != "lightbox" )
	  	  	{
	 //  		lightBox.style.zIndex="6000";
	  	  	}
	
	        lightBox.style.display = "block";  	  			
	        lightBox.style.visibility = "visible";  
		}
	
		var overlay = document.getElementById("overlay");
		// the statements within this if statement are causing IE to not build the overlay correctly...don't know why yet. 
		// until this is figured out it is best to put the following div into your html:
		//  		<div id="overlay" class="overlay">	</div>
		if (overlay == null)  
		{
			alert('no overlay found');
			var bod 			= document.getElementsByTagName('body')[0];
		  	overlay		 		= document.createElement('div');
		  	overlay.id			= 'overlay';
		  	overlay.className = "overlay";
		  	bod.appendChild(overlay);
		}
		overlay.style.minHeight = screen.height + 'px';
		overlay.style.height	= (screen.height) * 10 + 'px';
		overlay.style.width  	= screen.width  + 'px';
		overlay.style.display 	= "block";
	//		overlay.style.zIndex="2000"
	  
	}  // end function loadLightBox



/*************************************************************************************************
*  Function:  deactivateLightBox
*	function that that is responsible for deactivating a lightbox object (id + overlay)
*
*  Parms:
*	idToHide:  the id of the div that needs to be hidden 
**************************************************************************************************/
	function deactivateLightBox(idToHide)
	{
	  var overlayElm = document.getElementById("overlay");
	  if (overlayElm != null)
	  {
	  	overlayElm.style.display = "none";
	  } 
	  var idToHideElm = document.getElementById(idToHide);
	  if ( idToHideElm != null )
	  {
	  	idToHideElm.style.display = "none";
	  }

  	  turnOffSelects(false);
	}  // end function deactivateLightBox
	
	
	


/*************************************************************************************************
*  Function:  cancelLightBox
*	function that represents the user action of cancel on a lightbox.  
*
*  Parms:
*	idToHide:  the id of the div that needs to be hidden
**************************************************************************************************/ 
  	function cancelLightBox(idToHide)
	{
		deactivateLightBox(idToHide);
	}  // end function  cancel
	



/*************************************************************************************************
*  Function:  getSelectedIndex
*	function to find and return the key value of the selected index in order to set it later on.
*
*  Parms:
*	selectObject:  the <select> object
*	value		:  the string to search for 
*
*   returns     :  the index number that was found
**************************************************************************************************/  	
	function getSelectedIndex(selectObject, value)
	{
		for (i=0; i<selectObject.length; i++)
		{
			if (selectObject[i].value == value)
			{
				return i;
			}
		} // end for
		return 0;
	}  // end function getSelectedIndex



	

/*************************************************************************************************
*  Function:  maskCCNumber
*	function to mask a number from a starting position to an ending position with a given character.
*
*  Parms:
*	ccNbr				:  the credit card number which needs to be masked
*   maskChar			:  the char to mask with.
*	nbrOfDigitsToLeave	:  the number of digits that we want shown at the end (must be <= 4)
*   returns     		:  the masked Credit Card number
**************************************************************************************************/
   function maskCCNumber(ccNbr, nbrOfDigitsToLeave, maskChar)
   {

   	var ccLength = ccNbr.length;

   	 // this is for PCI compliance

   	 if (nbrOfDigitsToLeave > 5)
   	 {
   	 	nbrOfDigitsToLeave = 4;
   	 }

   	 if ( maskChar == null || maskChar.length <= 0)
   	 {
   	  	maskChar = '*';
   	 }

	 var nbrOfDigitsToMask = ccLength - nbrOfDigitsToLeave;
	 var lastDigitsToShow = ccNbr.substring(nbrOfDigitsToMask, ccLength);
   	 var maskStr = '';
   	 for (i=0;i < nbrOfDigitsToMask; i++)
   	 {
   	 	maskStr = maskStr + maskChar;
   	 }

   	 return maskStr + lastDigitsToShow;

   } // end function maskCCNumber


   
/*************************************************************************************************
*  Function:  isComingFromKiosk
*	function that that is responsible checking if the request is coming from a kiosk.
*
*  Parms:
*	returns  : a boolean that represents if the request was coming from a kiosk.
**************************************************************************************************/
   function isComingFromKiosk()
   {
   		try 
   		{
			window.external.InitScriptInterface();
			return true;
   		}
   		catch (InitScriptInterfaceError)
		{
			return false;
		}
   }  // end function isComingFromKiosk
   

   

/*************************************************************************************************
*  Function:  isCardReaderAvailable
*	function that that is responsible checking if a card reader is a available on the kiosk
*
*  Parms:
*	returns  : The creditCardObject OR null if the credit card reader is not present.
**************************************************************************************************/
	function isCardReaderAvailable()
	{
		try
		{
			creditcard = SiteKiosk.Plugins("SiteCash").Devices("CreditCard");	
			return creditCard;
		}
		catch (creditCardReaderError)
		{
			return null;
		}
	}  //end function isCardReaderAvailable





/*************************************************************************************************
*  Function:  hideThePrintLink
*	function that that is responsible hiding the Print page link.  This should only be called if the 
*   request is coming from a kiosk. (but you can call it anytime you like.
*
*  Parms:
*	name  : The html name of the print link that needs to be hidden
**************************************************************************************************/
    function hideThePrintLink(name)
    {	
    	if( isComingFromKiosk() )
    	{
      		var nameObjArray = document.getElementsByName(name);
    		for (i=0;i<nameObjArray.length;i++)
    		{
    			nameObjArray[i].style.display = 'none';
    		}
    	}
    } // end function hideThePrintLink
    
    /*
    *	Function: getTHDLithiumEncryptedToken
    *		This function will get the encrypted token from the THD_LITHIUMENCRYTOKEN cookie crumb.
    *	Returns:
    *		This function returns the encrypted token of the logged in user.
    */
    
    function getTHDLithiumEncryptedToken()
    {
     return readCookie('THD_LITHIUMENCRYTOKEN');
     
    }
     /*
    *	Function: getTHDUserName
    *		This function will get the username from the THD_USERNAME cookie crumb.
    *	Returns:
    *		This function returns the username of the logged in user.
    */
    function getTHDUserName()
    {
         	return readCookie('THD_USERNAME');
    }
    
	/*
    *	Function: getTHDLocalStoreInfo
    *		This function will get the local store address from the THD_LOCSTORE cookie crumb.
    *	Returns:
    *		This function returns the city and state of the local store in the format "city, state".
    */

    function getTHDLocalStoreInfo()
    {
    	//Read the cookie to get the local store address
    	var locStoreAddress = readCookie('THD_LOCSTORE');
    	var storeInfo ="";
    	//Formatting the address to get city and state in this format city, state
    	if(locStoreAddress != "" & locStoreAddress.length != 0)
		{
			locStoreAddress = unescape(locStoreAddress);
			//Get the last index values of - and +. Use substring to get the city and state.
			storeInfo = locStoreAddress.substring(locStoreAddress.lastIndexOf('-') + 1,locStoreAddress.lastIndexOf('+'));
		}
		return storeInfo;
    }
    
    /*
    *	Function: readMiniCartCookie
    *		This is a generic method to get read the THD_MINICART cookie crumb and return the attributes
    *		of the JSON object.
    *	Parameter: param
    *		This parameter defines the attribute of the JSON object.
    *	Returns:
    *		This function returns the attributes of the JSON object based on the input passed.
    */
    
    function readMiniCartCookie(param)
    {
    	var miniCartJsonStr = readCookie("THD_MINICART");
 		if(miniCartJsonStr != "") {
			var miniCartJsonObj;
    	    eval('miniCartJsonObj = ' + miniCartJsonStr + ';');
		    
		    //Get the JSON attribute based on the passed parameter
		    
		    if(param == 'D2')
		    {
		    	return miniCartJsonObj.D2;
		    }
		    else if(param == 'I1')
		    {
		    	return miniCartJsonObj.I1;
		    }
		    else if(param == 'F1')
		    {
		    	return miniCartJsonObj.F1;
		    }
		    else if(param == 'D1')
		    {
		    	return miniCartJsonObj.D1;
		    }
		    else if(param == 'F2')
		    {
		    	return miniCartJsonObj.F2;
		    }
	    } 
	    else {
	    	return "";
	    }	    
    }    
    
    /*
    *	Function: getTHDFreeShippingPromoThreshold
    *		This function calls the readMiniCartCookie() to get the D2 attribute of JSON object.
    *	Returns:
    *		This function returns amtRemainingForFreeShipping.
    */
    
    function getTHDFreeShippingPromoThreshold()
    {    	
	    // The amount remaining (if any) on the order for it to qualify for free shipping
		return readMiniCartCookie('D2');
    }
    
    /*
    *	Function: getTHDNumberItemsInCart
    *		This function calls the readMiniCartCookie() to get the I1 attribute of JSON object.
    *	Returns:
    *		This function returns nbrOfItemsInCart.
    */
    
    function getTHDNumberItemsInCart()
    {    	
	    // The number of items in the shopping cart
		return readMiniCartCookie('I1');
    }
    
    /*
    *	Function: getTHDHasRunningFreeShippingPromo
    *		This function calls the readMiniCartCookie() to get the F1 attribute of JSON object.
    *	Returns:
    *		This function returns isFreeShipping boolean value.
    */
    
    function getTHDHasRunningFreeShippingPromo()
    {    	
	    // Is there a running free shipping promotion
		return readMiniCartCookie('F1');
    }
    
    /*
    *	Function: getTHDTotalCartAmount
    *		This function calls the readMiniCartCookie() to get the D1 attribute of JSON object.
    *	Returns:
    *		This function returns totalCartAmt.
    */
    
    function getTHDTotalCartAmount()
    {    	
	    // The total dollar amount in the shopping cart
		return readMiniCartCookie('D1');	    
    }
    
    /*
    *	Function: getTHDOrderQualifiesForFreeShippingPromo
    *		This function calls the readMiniCartCookie() to get the F2 attribute of JSON object.
    *	Returns:
    *		This function returns orderQualifiesForFreeShippingFlg boolean value.
    */
    
    function getTHDOrderQualifiesForFreeShippingPromo()
    {    	
	    // Does the order currently qualify for free shipping.
		return readMiniCartCookie('F2');	    
    }
    
    function getTHDStoreNo()
    {
    	var localStoreNo = readCookie('THD_NAVLOCALSTORE');
    	return localStoreNo;
    }
    
   
    
    function getTHDStoreName()
    {
    	var locStoreAddress = readCookie('THD_LOCSTORE');
    	var storeName = "";
    	if(locStoreAddress != null && locStoreAddress.length != 0) {
    		var splLocStoreAddress = locStoreAddress.split('+');
    		if (splLocStoreAddress.length < 2) {
    			locStoreAddress = unescape(locStoreAddress);
    			splLocStoreAddress = locStoreAddress.split('+');
    			if (splLocStoreAddress.length < 2) {
    				return "";
    			}
    		}
    	var tmpAddressLine = splLocStoreAddress[1];
    	storeName = tmpAddressLine.substring(0, tmpAddressLine.lastIndexOf('-') - 1);
    	}
    	return storeName;
    }
    
    function getTHDStoreZip()
    {
    	var storeZip = readCookie('THD_STRFINDERZIP');
    	return storeZip;
    }
   
   // Added WCS7Up CodeMerge 4.5.2 STARTS
   /**** Added for defect 8709 ****/
    function getAOLZip()
    {
    	var retval = "";

		var temp = readCookie("THD_AOL");
		if(temp != "") {
			retval = temp.split(",")[0];
			if(!zipCodeValidator(retval)) {
				retval = "";
			}
		}
	return retval;
    }
    // Added WCS7Up CodeMerge 4.5.2 ENDS
    /*************************************************************************************************
*  Function:  callOmnitureFnc
*  Added for Requirement# THD_WCS_007 - Add Omniture tracking on the Availability Check Page
*		This function will set the required omniture fields needed and will then
*		call ominture with them
*
*  Parms:
*		msg -- the message to set in omniture.
*		Breadcrumb - breadcrumb value
**************************************************************************************************/
	function callOmnitureFnc(msg, breadcrumb)
	{
		if (debugVal == 'true')
		{
			alert ('ENTERING Function: callOmniture(' + msg + ')'  );
		}
	
		try
		{
			var origPageName = s.pageName.replace(breadcrumb,'');
	
			
			s.linkTrackVars='prop27,events';  	// tell Omniture what fields that you will be tracking
			s.prop27 = msg;						// set the error message to what was passed in ('<space>' will not produce an error message in Omniture)
			s.linkTrackEvents = 'event10';  	// tell Omniture what events that you will be tracking
			s.events = 'event10';				// set the events to a page event.
			
		
			s.pageName = origPageName + breadcrumb; 	// set the page name for Omniture
			s.t();
	
		} 
		catch(e)
		{	 
		}
		
		if (debugVal == 'true')
		{
			alert ('EXITING Function: callOmniture(' + msg + ')'  );
		}
		
	}   // end callOmniture(msg)
	
	function getReqPartsCrumb(crumbName){
		return readCookie(crumbName);
	}
	
	/*
    *	Function: processRequiredPartsSelections is used to check/uncheck the required parts for AOL
    *		
    */
	function processRequiredPartsSelections(elementIdPrefix, negateLogic)
	{
	    var requiredParts = getReqPartsCrumb("THD_REQUIRED_PARTS_SELECTION");
    		if( requiredParts!= "" && requiredParts!= null && requiredParts.length !=0) {
    			var selectedCatentryIds = requiredParts.split(",");
 					for(var i=0;i<selectedCatentryIds.length;i++)
					{
						if(document.getElementById(elementIdPrefix+(selectedCatentryIds[i]))!=null)
							if(negateLogic==1)
							{
								document.getElementById(elementIdPrefix+(selectedCatentryIds[i])).checked=false
								changeRequiredLabel(document.getElementById(elementIdPrefix+(selectedCatentryIds[i])));
							}
							else{
								document.getElementById(elementIdPrefix+(selectedCatentryIds[i])).checked=true
								}
					}
    		
		}
	}	
	
/* Added for BOPIS - Starts - Saravanan V*/
	
function closeBopis(){
	document.getElementById('bopis').style.display = 'none';
}

function toggleMoreInfo(idz){

	if(document.getElementById('store_info_'+idz).style.display == 'block'){
		document.getElementById('store_info_'+idz).style.display = 'none';
		document.getElementById('store_link_'+idz).innerHTML ='Show Store Info';
	}else{
		document.getElementById('store_info_'+idz).style.display = 'block';
		document.getElementById('store_link_'+idz).innerHTML ='Hide Store Info';
	}
}


//?R=<c:out value="${WCParam.R}" />&langId=<c:out value="${WCParam.langId}" />&storeId=10051&catalogId=<c:out value="${WCParam.catalogId}" />
//&recordId=<c:out value="${recordId}"/>&storeCity=<c:out value="${city}" />&storeState=<c:out value="${state}" />&storeZip=<c:out value="${zip}"/>'");>ssssss </a>

function localizeToNewStore(recordId,returnUrl){
url='THDStoreFinderStoreSet?recordId=' 
	+ recordId + '&URL=' + returnUrl;
window.location=url;
}
/* Added for BOPIS - Ends - Saravanan V*/

/* Added for SuperSku - Starts */
	/*
    *	Function: isNumeric
    *		This function checks if only numbers are entered in the quantity box.
    *	Returns:
    *		Hides/Unhides the error <div> based on the input entered.
    */
    
function isNumeric(elem,errordiv){
	var numericExpression = /^[0-9]+$/;
	if(elem.value.match(numericExpression)!=null && Number(elem.value) > 0){
		document.getElementById(errordiv).style.display = 'none';
		return true;
	}else{
		elem.focus();
		elem.value="";
		document.getElementById(errordiv).style.display = 'block';
		return false;
	}
}
/* Added for SuperSku - Ends */
	
	function getReqPartsCrumb(crumbName){
		return readCookie(crumbName);
	}

	/*
    *	Function: processRequiredPartsSelections is used to check/uncheck the required parts for AOL
    *		
    */
	function processRequiredPartsSelections(elementIdPrefix, negateLogic)
	{
	    var requiredParts = getReqPartsCrumb("THD_REQUIRED_PARTS_SELECTION");
    		if( requiredParts!= "" && requiredParts!= null && requiredParts.length !=0) {
    			var selectedCatentryIds = requiredParts.split(",");
 					for(var i=0;i<selectedCatentryIds.length;i++)
					{
						if(document.getElementById(elementIdPrefix+(selectedCatentryIds[i]))!=null)
							if(negateLogic==1)
							{
								document.getElementById(elementIdPrefix+(selectedCatentryIds[i])).checked=false
								changeRequiredLabel(document.getElementById(elementIdPrefix+(selectedCatentryIds[i])));
							}
							else{
								document.getElementById(elementIdPrefix+(selectedCatentryIds[i])).checked=true
								}
					}
    		
		}
	}	
	
/* Added for BOPIS - Starts - Saravanan V*/
	
function closeBopis(){
	document.getElementById('bopis').style.display = 'none';
}

function toggleMoreInfo(idz){

	if(document.getElementById('store_info_'+idz).style.display == 'block'){
		document.getElementById('store_info_'+idz).style.display = 'none';
		document.getElementById('store_link_'+idz).innerHTML ='Show Store Info';
	}else{
		document.getElementById('store_info_'+idz).style.display = 'block';
		document.getElementById('store_link_'+idz).innerHTML ='Hide Store Info';
	}
}


//?R=<c:out value="${WCParam.R}" />&langId=<c:out value="${WCParam.langId}" />&storeId=10051&catalogId=<c:out value="${WCParam.catalogId}" />
//&recordId=<c:out value="${recordId}"/>&storeCity=<c:out value="${city}" />&storeState=<c:out value="${state}" />&storeZip=<c:out value="${zip}"/>'");>ssssss </a>

function localizeToNewStore(r,recordId,city,st,zip){
url='THDStoreFinderStoreSet?R=' + r+ '&langId=-1&storeId=10051&catalogId=10053&recordId=' 
	+ recordId + '&URL=' + document.location;
window.location=url;
} 

/* Added for Bopis2 - Defect#715 Fix */

 /*
    *	Function: disableEnterKey
    *		This function disables enter key actions which is needed in PIP 
    		when there is a Browse SKU and user presses enter in the quantity box.
    *	Returns:
    *		Hides/Unhides the error <div> based on the input entered.
    */


/* Added for Bopis2 - Defect#715 Fix - Starts */

function disableEnterKey(e)
{
     var key;

     if(window.event)
          key = window.event.keyCode;     //IE
     else
          key = e.which;     //firefox

     if(key == 13)
          return false;
     else
          return true;
}

/* Added for Bopis2 - Defect#715 Fix - Ends */


/* Dynamically includes a file to the page.  Moved from businessjs.json */
function includeJS(file){
	document.write('<scr'+'ipt src='+'"'+file+'" type="text/javascript"'+'></sc'+'ript>'+"\n");
}


/* 14651 */
/* When calling displayMessageDiv(divId) from the QuickViewOverlay, we must first close the fancybox and run all the code on the parent. */
function closeOverlayDisplayMessageDiv(divId) {
	if ($.fancybox) {
		$.fancybox.close();
	}
	$(window).scrollTop(0);
	displayMessageDiv(divId);
}


/* for PIP/Quick View - Add to My List - $updated 5.24.12 for all protocols $*/
function goToTHDMyListDetailsFromPIP(listId){

      	var HostName = window.location.hostname,
      		url = document.location.protocol + '//' + HostName + '/webapp/wcs/stores/servlet/THDInterestItemListOperation?langId=-1&catalogId=10053&storeId=10051&listId=' + listId + '&opCode=7';
      
            if(parent.window.location == window.location){ // true if PIP , false when loaded in iframe like PLP
            	window.location = url;
            }else{
            	parent.window.location = url;
            }
}
