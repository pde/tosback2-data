	var cvImage = new Image();
	function productBrowsed(userId, userType, storeId, categoryId, langId, productId, CIAServerUrl, browseItemType)
	{ 
		var merchantId = storeId;
		var channelId = "-1";
		var eventType = "browse";
		var currentTime = new Date();
		var url = location.href;
		
		var sessionId = getSessionId();
		
		// If punchoutEnable is true then event should not post to CIA server
		if(isPunchOutEnabled()){
			return;
		}		
		var userIdFromCookie = getCookie('WC_PERSISTENT');
		/* check put in place in case we are not using persistent cart */
		if(userIdFromCookie != null) {
			var arrayOfStrings = userIdFromCookie.split('_');
			if (arrayOfStrings.length >= 2) {
				//alert('arrayOfStrings[1]' + arrayOfStrings[1]);
				userId = arrayOfStrings[1];
			}
		}

		// If user browses the sku, item, product then sending 
		// browseItemType as SKU and eventData as productId(catentryId)		
		// and additional parameter browseCategory as categoryId.
		
		var temporaryUser = getCookie('CIA_USER_COOKIE');
		
		if (temporaryUser && "TEMPORARY_GUEST_USER" == temporaryUser) {
			userId = "";
		}
		if(browseItemType=="Skus")
		{
			cvImage.src= protocol + CIAServerUrl + '?merchantId='+merchantId+'&userId='+userId+
			'&userType='+userType+'&storeId='+storeId+'&langId='+langId+'&url='+url+'&tStamp='+currentTime.getTime()+
			'&brName='+navigator.appName+'&brVersion='+navigator.appVersion+'&brPlatform='+navigator.platform+
			'&brCodeName='+navigator.appCodeName+'&eventType='+eventType+'&channel_ID='+channelId+'&eventData='+productId+'&sessionId='+sessionId+'&browseItemType='+browseItemType+'&browseCategory='+categoryId;
		}
		// If user browses the category then sending 
		// browseItemType as CATEGORY and eventData as categoryId
		else if(browseItemType=="Categories")
		{
			cvImage.src= protocol + CIAServerUrl + '?merchantId='+merchantId+'&userId='+userId+
			'&userType='+userType+'&storeId='+storeId+'&langId='+langId+'&url='+url+'&tStamp='+currentTime.getTime()+
			'&brName='+navigator.appName+'&brVersion='+navigator.appVersion+'&brPlatform='+navigator.platform+
			'&brCodeName='+navigator.appCodeName+'&eventType='+eventType+'&channel_ID='+channelId+'&eventData='+categoryId+'&sessionId='+sessionId+'&browseItemType='+browseItemType;
		}
	}

	function searchProduct(userId, userType, storeId, langId, CIAServerUrl, searchTerm)
	{ 
		// If punchoutEnable is true then event should not post to CIA server
		if(isPunchOutEnabled()){
			return;
		}
		
		var merchantId = storeId;
		var channelId = "-1";
		var eventType = "search";
		var currentTime = new Date();
		var url = location.href;
		
		var sessionId = getSessionId();
		var userIdFromCookie = getCookie('WC_PERSISTENT');
		/* check put in place in case we are not using persistent cart */
		if(userIdFromCookie != null) {
			var arrayOfStrings = userIdFromCookie.split('_');
			if (arrayOfStrings.length >= 2) {
				//alert('arrayOfStrings[1]' + arrayOfStrings[1]);
				userId = arrayOfStrings[1];
			}
		}

		var temporaryUser = getCookie('CIA_USER_COOKIE');
		
		if (temporaryUser && "TEMPORARY_GUEST_USER" == temporaryUser) {
			userId = "";
		}
		cvImage.src= protocol + CIAServerUrl + '?merchantId='+merchantId+'&userId='+userId+
		'&userType='+userType+'&storeId='+storeId+'&langId='+langId+'&url='+url+'&tStamp='+currentTime.getTime()+
		'&brName='+navigator.appName+'&brVersion='+navigator.appVersion+'&brPlatform='+navigator.platform+
		'&brCodeName='+navigator.appCodeName+'&eventType='+eventType+'&channel_ID='+channelId+'&eventData='+searchTerm+'&sessionId='+sessionId;
	}
	
	
	function getSessionId()
	{
		var sessionId = getCookie('JSESSIONID');
		// regular expression used to extract the session id
		// In cookies we have JsessionId with padding values(0000<session id>:<str>)
		// Below is the regular expression which remove padded value from JSessionId
		var regex = /^[0-9]{4}(\S*)&?[:]{1}(\S*)/;
		var results = regex.exec(sessionId);
		return results[1];
	}
	
	
	// This method is checks CALL_CENTER_USER cookie in the Browser.
	// if this cookie present it means request is coming from punchout(CC). In this case event should not post to CIA )
	// If  this cookie is not present it means event is coming from CVWeb and hence post event to CIA
	function isPunchOutEnabled() {
		var ccCookie = getCookie('CALL_CENTER_USER');
		if(ccCookie == null){
			// Not post an event on CIA 
			return false;
		}else{
			// Post an event on CIA 
			return true;
		}
	}
	