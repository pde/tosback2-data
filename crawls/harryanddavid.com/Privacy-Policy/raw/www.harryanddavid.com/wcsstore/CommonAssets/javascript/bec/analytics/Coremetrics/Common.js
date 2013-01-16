// Common CM Utils
dojo.provide("bec.analytics.Coremetrics.Common");

// Coremetrics widget
dojo.declare("bec.analytics.Coremetrics.Common", null, 
{
	/** 
	 * Generate CM Category Name
	**/
	generateCategoryName: function(category)
	{
		try
		{	
			var scope = this;
			var categoryName = category;
			var type = "standard";
			
			/**
			 * Did we find a virtual_cat JS var on the page with a valid value?
			 */
			if(typeof virtual_cat !== "undefined" && virtual_cat !== null) 
			{
				if(virtual_cat != '')
					scope.updateCookie('virtCatCM', virtual_cat);
			}
			
			/**
			 * Determine if virtual category passed on URL string.
			 * Override virtual_cat JS var is URL param is found.
			 */ 
			var urlParamsArr = location.search.substring(1).split('&');	
			for(var i = 0; i < urlParamsArr.length; i++)
			{ 	
				// Check for presence of "baseProductId" to handle Product Page Up-Sell navigation.
				// Clear virtual cat if baseProductId URL param is found.
				var baseProductIdpos = urlParamsArr[i].indexOf('baseProductId');
				if (baseProductIdpos != -1) {
					scope.expireCookie("virtCatCM");
					continue;
				}
				
				// Check for virtual category value on URL
				var pos = urlParamsArr[i].indexOf('urlVirtualCat');
				if (pos == -1) // Not Found, move on.
				{
					continue;
				}
				else // Virtual Cat found
				{
					var vcValue = urlParamsArr[i].substr(urlParamsArr[i].indexOf('=')+1);
					if(vcValue != "")
					{ 
						scope.updateCookie('virtCatCM', vcValue);
					}
				}
			}
			
			/**
			 * Determine if sliSearch value passed on URL string
			 */
			for(var i = 0; i < urlParamsArr.length; i++)
			{ 	var pos = urlParamsArr[i].indexOf('sliSearch');
				if (pos != -1)
					cmSearch = urlParamsArr[i].substr(urlParamsArr[i].indexOf('=')+1);	
			}
			
			/**
			 * Should we clear the Virtual Category?
			 */
			if(clear_virtual_cat)
			{
				scope.expireCookie("virtCatCM");
				console.debug("Coremetrics: Generate Category - virtual category cleared");
			}
			
			/**
			 * Does a Virtual Category cookie exist?
			 * 	If so, set categoryName to cookie value.
			 */
			else if(scope.readCookie('virtCatCM'))
			{
				categoryName = scope.readCookie('virtCatCM');
				type = "virtual";
			}
			
			/**
			 * No Category name set, do we have a cm_merch_cat var (Category page)?
			 */
			if((categoryName == "") || (categoryName == null))
			{
				if(typeof cm_merch_cat != "undefined") {
					categoryName = cm_merch_cat;
					type = "merchant";
				}
			}
			
			/**
			 * Did we ever find a category name?
			 */
			if(categoryName != "")
			{
				cmCategory = scope.appendESiteID(categoryName);
				console.debug("Coremetrics: Generate Category - COMPLETE (type = " + type + " / name = " + categoryName + ")");
			}
			else
				console.error("Coremetrics: Generate Category name - FAILED");
				
		}
		catch(e)
		{
			console.error("Coremetrics: generateCategoryName() Exception: " + e);
		}
	},

	//Update CM pageName to handle eSites
	appendESiteID: function(idVal)
	{		
		var scope = this;
		
		if(idVal != "" && !scope.isStorefront())
		{
			idVal = jsStoreIdent + ": " + idVal;
		}
		
		return idVal;
	},

	isStorefront: function() {
		var results = false;
		var storefrontArr = ["Hand","Wolf","Cush","Hand2"];
		
		dojo.forEach(storefrontArr, function(storeIdent, idx) {
			if(jsStoreIdent == storeIdent)
				results = true;
		});
		
		return results;
	},

	//This function creates or modifies a cookie.
	updateCookie: function(name, value) {
		var exdays = 1*24*60*60*1000;
		var exdate=new Date();
		exdate.setDate(exdate.getDate() + exdays);
		
		var c_value = escape(value) + ((exdays==null) ? "" : ";path=/; expires="+exdate.toUTCString());
		document.cookie = name + "=" + c_value;
	},

	//This function reads a cookie.
	readCookie: function(name) {
		var i,x,y,ARRcookies=document.cookie.split(";");
		
		for (i=0;i<ARRcookies.length;i++)
		{
			x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
			y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
			x=x.replace(/^\s+|\s+$/g,"");
			
			if (x == name)
		    {
				return unescape(y);
		    }
		}
	},

	//Sets the expiration date of a cookie (set to zero to delete cookie).
	expireCookie: function(name) {
		var scope = this;
		document.cookie = name + "=" + scope.readCookie(name) + ";path=/;expires=" + new Date(0).toUTCString();
	},

	//Right trims spaces from a string
	RTrim: function(VALUE) {
		var w_space = String.fromCharCode(32);
		var v_length = VALUE.length;
		var strTemp = "";
		
		if(v_length >= 0)
		{
		  	var iTemp = v_length -1;    	
		  	while(iTemp > -1)
		  	{
		  		if(VALUE.charAt(iTemp) == w_space)
		  		{
		  		}
		  		else
		  		{
		  			strTemp = VALUE.substring(0,iTemp +1);
		  			break;
		  		}
		  		iTemp = iTemp-1;
		  	}
		}
		
		return strTemp;
	},
	
	clearHTMLTags: function(strHTML)
	{
		var strMarkedUp = strHTML.replace(/&lt;([^&]*)&gt;/g,"<$1>");
		
		return strMarkedUp.replace(/<[^>]*>/g, "");   
	}
});
