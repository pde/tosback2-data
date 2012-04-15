//**************************************************
// targetingFW.js
// Author: Andrew Burgess 
// Version: 1.6
// Date: 7/21/2008
// release: 10/28/2008
// Update: 1/14/2010
// this framework is the js side of the 
// homepage targeting framework
//***************************************************

/*
Rich Media Hash
Author: Zac Winstrom
This function replaces the Hash function
from prototype, removing the last remnants
of the prototype library from this file
*/
function Rich_Media_Hash() {
	var keyList = [];
	var map = {};
	
	this.set = function (key, value) {
		keyList.push(key);
		map[key] = value;
	}
	
	this.get = function (key) {
		return map[key];
	}
	
	this.each = function(action){
		for (var i=0; i<keyList.length; i++) {
			var pair = {key: keyList[i], value: map[keyList[i]]};
			action(pair);
		}
	}
}

if(typeof console !== 'undefined') {var debug = false;}

var currentGeoList = '';
//global function to be called by flash adManager for geolocation
var getPageLevelGeos = function() {
	//if(debug){console.log('getPageLevelGeos called, returned: '+currentGeoList);}
	if(typeof ABSplitVal != 'undefined') {
		currentGeoList += ','+ABSplitVal;
	}
	return currentGeoList;
}
function targetingFWLib() {

	// global stuff
	var isDomReady = false;
	var marqueeBuffer;
	var marqueeInjected = false;
	slotCaller = new Array();
	var contentDropletRequestURL = '/homepage/contentItemDroplet.jsp?q_name=';
	var emergencySlotName = 'HRUF_emergency_response_slot1';
	var userDataHash = new Rich_Media_Hash();
	var contentItems = new Rich_Media_Hash();
	var geoTargetedSlots = new Array('marquee1', 'mainSlot1', 'mainSlot2', 'mainSlot3', 'menuTray0Slot5', 'menuTray1Slot5', 'menuTray2Slot5', 'menuTray3Slot5', 'menuTray4Slot5', 'menuTray5Slot5'); // add slot names here to enable geo flagging, marquee is first item
	var stateBucket;
	var region_13_state = new Array('AR','KS','MS','OK',"TX",'CA','NE','CO','IL','IN','MI','OH','WI');
	var region_9_state = new Array('AL','FL','GA','KN',"LO",'MS','NC','SC','TN');
	var region_OF = new Array('AK','AZ','CT','DE','DC','HI','ID','IA','ME','MD','MA','MN','MT','NV','NH','NJ','NM','NY','ND','OR','PA','RI','SD','UT','VT','VA','WA','WV','WY');
	var region_13_state_fullName = new Array('Arkansas','Kansas','Missouri','Oklahoma',"Texas",'California','Nebraska','Colorado','Illinois','Indiana','Michigan','Ohio','Wisconsin');
	var region_9_state_fullName = new Array('Alabama','Florida','Georgia','Kentucky',"Louisiana",'Mississippi','North Carolina','South Carolina','Tennesee');
	var region_OF_fullName = new Array('Alaska','Arizona','Connecticut','Delaware','District of Columbia','Hawaii','Idaho','Iowa','Maine','Maryland','Massachusetts','Minnesota','Montana','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Dakota','Oregon','Pennsylvania','Rhode Island','South Dakota','Utah','Vermont','Virginia','Washington','West Virginia','Wyoming');
	var validTargetCodes = new Array('3_13_UM','3_13_DM_UG','3_13_DM','3_13_M_UG','3_13_M','3_13_U','3_13_D_UG','3_13_D','2_13_UG','2_13_CI','2_13','3_9_UM','3_9_DM','3_9_DM_UG','3_9_M_UG','3_9_M','3_9_U','3_9_D_UG','3_9_D','2_9_UG','2_9_CI','2_9','3_OF_M','2_OF','1');
	//var uverseLGDMACodes = new Array('4','13','16');
	
	// to force the default marquee to show for all states, set this to true
	var forceDefaultMarquee = false;
	
	// to trigger emergency content item in slot1 for any DMA overriding all other parameters, add to this array.
	var emergencyDMA = new Array();
	
	// global to hold querystring params for overriding akamai headers during testing
	var overrideArgs = {};
	
	// vars to pivot targeting
	var existingCustomerType = 1;
	var accountType = '';
	var compISP ='';
	var uverseEligible = '';
	var region = '';
	var testing;
	var Geo = '';
	//var metaTagsInHead = $$('head meta');
	var metaTagsInHead = jQuery('head meta');
	var trackingPageParam;
	
	//test numbers
	this.isNumeric = function(inputVal) {
		if (isNaN(parseFloat(inputVal))) {
         	return false;
     	}
    	return true
	}
	
	this.setPageLevelGeos = function() {
		//if(debug){console.log('in setGeos');}
		if(userDataHash.get('DCSext.wt_aka_region_code')) {
			currentGeoList += userDataHash.get('DCSext.wt_aka_region_code');
			//if(debug){console.log('state set to '+currentGeoList);}
		}
		if(currentGeoList != '' && userDataHash.get('DCSext.wt_aka_dma')) {
			currentGeoList += ','+userDataHash.get('DCSext.wt_aka_dma');
			//if(debug){console.log('added DMA '+currentGeoList);}
		} else if(currentGeoList == '' && userDataHash.get('DCSext.wt_aka_dma')) {
			currentGeoList += userDataHash.get('DCSext.wt_aka_dma');
			//if(debug){console.log('added DMA '+currentGeoList);}
		}
		if(currentGeoList != '' && userDataHash.get('idFlow')) {
			currentGeoList += ','+'IDCompleted';
			//if(debug){console.log('added ID '+currentGeoList);}
		} else if(currentGeoList == '' && userDataHash.get('idFlow')) {
			currentGeoList += 'IDCompleted';
			//if(debug){console.log('added ID '+currentGeoList);}
		}
		//if(debug){console.log('PageLevelGeos set '+currentGeoList);}
	}
	
	// convert texas to tx and vice-versa
	
	
	this.convertStateName = function(name) {
		var foundRetVal = false;
		var foundLocation;
		if(name.length > 2) {
			var foundLocation = jQuery.inArray(name, region_13_state_fullName);
			if(foundLocation == -1) {
				foundLocation = jQuery.inArray(name, region_9_state_fullName);
				if(foundLocation == -1) {
					foundLocation = jQuery.inArray(name, region_OF_fullName);
					if(foundLocation == -1) {
						// not in a US state
					}
					else {
						foundRetVal = region_OF[foundLocation];
					}
				}
				else {
					foundRetVal = region_9_state[foundLocation];
				}
			}
			else {
				foundRetVal = region_13_state[foundLocation];
			}
		}
		return foundRetVal;
	}
	
	// method for overriding akamai headers during testing
	this.checkOverrideArgs = function() {
		var retval = false;
		if(location.search.indexOf('testMode=testing') != -1) {
			if (debug) {console.log('targetingFW: testing!');}
			var params = window.location.search.substring(1).split('&');
			for (i=0; i<params.length; i++) {
				var temp = params[i].split('=');
				if (temp[0] && temp[1])
					overrideArgs[temp[0]] = temp[1]; 
			}
			if (debug) {console.log(overrideArgs);}
			retval = true;
			testing = true;
		}
		return retval;
	}
	// accessors for pivot vars
	this.getMarqueeBuffer = function() {
		return marqueeBuffer;
	}
	this.getGeoTargetedSlots = function() {
		return geoTargetedSlots;
	}
	this.getExistingCustomerType = function() {
		return existingCustomerType;
	}
	this.getAccountType = function() {
		return accountType;
	}
	this.getRegion = function() {
		return region;
	}
	this.getCompISP = function() {
		return compISP;
	}
	this.getUverseEligible = function() {
		return uverseEligible;
	}
	
	// returns the concatenated userScheme
	this.getUserScheme = function() {
		if(!userDataHash.get('mUserScheme')) {
			var pUserScheme;
			pUserScheme = existingCustomerType;
			trackingPageParam = existingCustomerType + '~';
			if(region != '') {
				pUserScheme = pUserScheme + '_' + region;
				trackingPageParam = trackingPageParam + region;
			}
			trackingPageParam = trackingPageParam + '~';
			if(accountType != '') {
				pUserScheme = pUserScheme + '_' + accountType;
				trackingPageParam = trackingPageParam + accountType;
			}
			trackingPageParam = trackingPageParam + '~';
			if(compISP != '') {
				pUserScheme = pUserScheme + '_' + compISP;
				trackingPageParam = trackingPageParam + compISP;
			}
			trackingPageParam = trackingPageParam + '~';
			if(uverseEligible != '') {
				pUserScheme = pUserScheme + '_' + uverseEligible;
				trackingPageParam = trackingPageParam + uverseEligible;
			}
			this.setPageLevelGeos();
			if(userDataHash.get('idFlow')) {
				trackingPageParam += '~ID';	
			}
			//if(debug){console.info('in getUserScheme scheme= '+pUserScheme);}
			userDataHash.set('mUserScheme' ,pUserScheme);
			return pUserScheme;
		} else {
			//if(debug){console.info('userScheme already computed, returning value from userDataHash');}
			return userDataHash.get('mUserScheme');
		}
	}
	// return the current record of a user's state (as in 'WA' not 'cookied')
	this.getStateBucket = function() {
		return stateBucket;
	}
	
	// sets the content Items in a hash
	this.setContentItems = function(userType) {
		
		//var uverseStatus = 'uverse_green';
		
		var isValidType = jQuery.inArray(userType, validTargetCodes);
		if(isValidType == -1) {
			userType = '1';
			trackingPageParam='1~~~~';
			if(userDataHash.get('idFlow')) {
				trackingPageParam = '1~~~~ID';	
			}
		}
		var contentItemsForUser = this.getContentHash();
		
		contentItemsForUser.set('marquee1', 'HRUF_' + userType + '_marquee1');

		contentItemsForUser.set('menuTray0Slot5', 'HRUF_' + userType + '_Wireless_Slot5');
		contentItemsForUser.set('menuTray1Slot5', 'HRUF_' + userType + '_DigitalTV_Slot5');
		contentItemsForUser.set('menuTray2Slot5', 'HRUF_' + userType + '_Internet_Slot5');		
		contentItemsForUser.set('menuTray3Slot5', 'HRUF_' + userType + '_HomePhone_Slot5');
		contentItemsForUser.set('menuTray4Slot5', 'HRUF_' + userType + '_Bundles_Slot5');
		contentItemsForUser.set('menuTray5Slot5', 'HRUF_' + userType + '_ATTUverse_Slot5');
		
		contentItemsForUser.set('mainSlot1', 'HRUF_' + userType + '_slot1');
		contentItemsForUser.set('mainSlot2', 'HRUF_' + userType + '_slot2');
		contentItemsForUser.set('mainSlot3', 'HRUF_' + userType + '_slot3');

	}
	
	// determines if user is 9 or 13 state and stores that information
	this.setStateBucket = function(stateToMatch) {
		var foundLocation = jQuery.inArray(stateToMatch, region_13_state);
		if(foundLocation == -1) {
			foundLocation = jQuery.inArray(stateToMatch, region_9_state);
			if(foundLocation == -1) {
				stateBucket = 'region_0';
				region = 'OF';
			}
			else {
				stateBucket = 'region_9';
				region = '9';
			}
		}
		else {
			stateBucket = 'region_13';
			region = '13';
		}
	}
	
	// return the current hash of user data to the caller
	this.getUserHash = function() {
		return userDataHash;
	}
	
	// return the current hash of contentItems to the caller
	this.getContentHash = function() {
		return contentItems;
	}
	
	// parse content map
	this.parseMap = function() {
		this.collectMeta();
		//this.getContentItems();
	}
	
	//calls content droplet by sending ajax request for each item in contentItems map
	this.getContentItems = function() {
		var reqURI;
		var ajaxUpd;
		var isCali = false;
		var found;
		var subst;
		if(userDataHash.get('DCSext.wt_aka_region_code') == 'CA') {isCali = true}
		var caliSlotNames = new Array('HRUF_2_13_slot1','HRUF_2_13_slot2','HRUF_2_13_slot3','HRUF_2_13_Wireless_Slot5','HRUF_2_13_DigitalTV_Slot5','HRUF_2_13_Internet_Slot5','HRUF_2_13_HomePhone_Slot5','HRUF_2_13_Bundles_Slot5','HRUF_2_13_ATTUverse_Slot5',
				'HRUF_2_13_UG_slot1','HRUF_2_13_UG_slot2','HRUF_2_13_UG_slot3','HRUF_2_13_UG_Wireless_Slot5','HRUF_2_13_UG_DigitalTV_Slot5','HRUF_2_13_UG_Internet_Slot5','HRUF_2_13_UG_HomePhone_Slot5','HRUF_2_13_UG_Bundles_Slot5','HRUF_2_13_UG_ATTUverse_Slot5',
				'HRUF_2_13_CI_slot1','HRUF_2_13_CI_slot2','HRUF_2_13_CI_slot3','HRUF_2_13_CI_Wireless_Slot5','HRUF_2_13_CI_DigitalTV_Slot5','HRUF_2_13_CI_Internet_Slot5','HRUF_2_13_CI_HomePhone_Slot5','HRUF_2_13_CI_Bundles_Slot5','HRUF_2_13_CI_ATTUverse_Slot5',
				'HRUF_3_13_U_slot1','HRUF_3_13_U_slot2','HRUF_3_13_U_slot3','HRUF_3_13_U_Wireless_Slot5','HRUF_3_13_U_DigitalTV_Slot5','HRUF_3_13_U_Internet_Slot5','HRUF_3_13_U_HomePhone_Slot5','HRUF_3_13_U_Bundles_Slot5','HRUF_3_13_U_ATTUverse_Slot5',
				'HRUF_3_13_D_UG_slot1','HRUF_3_13_D_UG_slot2','HRUF_3_13_D_UG_slot3','HRUF_3_13_D_UG_Wireless_Slot5','HRUF_3_13_D_UG_DigitalTV_Slot5','HRUF_3_13_D_UG_Internet_Slot5','HRUF_3_13_D_UG_HomePhone_Slot5','HRUF_3_13_D_UG_Bundles_Slot5','HRUF_3_13_D_UG_ATTUverse_Slot5',
				'HRUF_3_13_D_slot1','HRUF_3_13_D_slot2','HRUF_3_13_D_slot3','HRUF_3_13_D_Wireless_Slot5','HRUF_3_13_D_DigitalTV_Slot5','HRUF_3_13_D_Internet_Slot5','HRUF_3_13_D_HomePhone_Slot5','HRUF_3_13_D_Bundles_Slot5','HRUF_3_13_D_ATTUverse_Slot5',
				'HRUF_3_13_M_UG_slot1','HRUF_3_13_M_UG_slot2','HRUF_3_13_M_UG_slot3','HRUF_3_13_M_UG_Wireless_Slot5','HRUF_3_13_M_UG_DigitalTV_Slot5','HRUF_3_13_M_UG_Internet_Slot5','HRUF_3_13_M_UG_HomePhone_Slot5','HRUF_3_13_M_UG_Bundles_Slot5','HRUF_3_13_M_UG_ATTUverse_Slot5',
				'HRUF_3_13_M_slot1','HRUF_3_13_M_slot2','HRUF_3_13_M_slot3','HRUF_3_13_M_Wireless_Slot5','HRUF_3_13_M_DigitalTV_Slot5','HRUF_3_13_M_Internet_Slot5','HRUF_3_13_M_HomePhone_Slot5','HRUF_3_13_M_Bundles_Slot5','HRUF_3_13_M_ATTUverse_Slot5',
				'HRUF_3_13_UM_slot1','HRUF_3_13_UM_slot2','HRUF_3_13_UM_slot3','HRUF_3_13_UM_Wireless_Slot5','HRUF_3_13_UM_DigitalTV_Slot5','HRUF_3_13_UM_Internet_Slot5','HRUF_3_13_UM_HomePhone_Slot5','HRUF_3_13_UM_Bundles_Slot5','HRUF_3_13_UM_ATTUverse_Slot5',
				'HRUF_3_13_DM_UG_slot1','HRUF_3_13_DM_UG_slot2','HRUF_3_13_DM_UG_slot3','HRUF_3_13_DM_UG_Wireless_Slot5','HRUF_3_13_DM_UG_DigitalTV_Slot5','HRUF_3_13_DM_UG_Internet_Slot5','HRUF_3_13_DM_UG_HomePhone_Slot5','HRUF_3_13_DM_UG_Bundles_Slot5','HRUF_3_13_DM_UG_ATTUverse_Slot5',
				'HRUF_3_13_DM_slot1','HRUF_3_13_DM_slot2','HRUF_3_13_DM_slot3','HRUF_3_13_DM_Wireless_Slot5','HRUF_3_13_DM_DigitalTV_Slot5','HRUF_3_13_DM_Internet_Slot5','HRUF_3_13_DM_HomePhone_Slot5','HRUF_3_13_DM_Bundles_Slot5','HRUF_3_13_DM_ATTUverse_Slot5'
				);
		var caliMarqueeNames = new Array('HRUF_2_13_marquee1','HRUF_2_13_UG_marquee1','HRUF_2_13_CI_marquee1','HRUF_3_13_U_marquee1','HRUF_3_13_D_UG_marquee1','HRUF_3_13_D_marquee1','HRUF_3_13_M_UG_marquee1','HRUF_3_13_M_marquee1','HRUF_3_13_UM_marquee1','HRUF_3_13_DM_UG_marquee1','HRUF_3_13_DM_marquee1');
		
		contentItems.each(function(pair) {
			reqURI = contentDropletRequestURL + pair.value;	

			if(jQuery.inArray(pair.key, geoTargetedSlots) != -1 && typeof userDataHash.get('DCSext.wt_aka_dma') != 'undefined') {
				reqURI = contentDropletRequestURL + pair.value + '&q_geography=' + userDataHash.get('DCSext.wt_aka_dma') + '&q_default=false';
			} else {
				reqURI = contentDropletRequestURL + pair.value + '&q_default=true';
			}
			
			if(pair.key == 'marquee1') {
				
				// hack for CA content
				found = jQuery.inArray(pair.value, caliMarqueeNames);
				if(isCali && found != -1) {
					subst = pair.value.replace('_marquee', '_CA_marquee');
					if(jQuery.inArray(pair.key, geoTargetedSlots) != -1 && typeof userDataHash.get('DCSext.wt_aka_dma') != 'undefined') {
						reqURI = contentDropletRequestURL + subst + '&q_geography=' + userDataHash.get('DCSext.wt_aka_dma') + '&q_default=false';
					} else {
						reqURI = contentDropletRequestURL + subst;
					}
				}
				
				// force the default marquee to show for all states
				if (forceDefaultMarquee) {
					reqURI = contentDropletRequestURL + 'HRUF_1_marquee1&q_default=true';
				}
				
				jQuery.get(reqURI, function(data) {
					marqueeBuffer = data.replace('<script type="text/javascript" src="/media/en_US/scripts/flash.js"></script>', '');
					if (isDomReady) {
						if (debug) {console.log('targetingFW: failsafe marquee injection');}
						targetingFW.populateMarquee();
					}
				});
			} 
			else {
				// hack for CA content
				found = jQuery.inArray(pair.value, caliSlotNames);
				if(isCali && found != -1) {
					if (pair.value.indexOf('_Wireless_Slot') != -1) {
						subst = pair.value.replace('_Wireless_Slot', '_CA_Wireless_Slot');
					} else if (pair.value.indexOf('_DigitalTV_Slot') != -1) {
						subst = pair.value.replace('_DigitalTV_Slot', '_CA_DigitalTV_Slot');
					} else if (pair.value.indexOf('_Internet_Slot') != -1) {
						subst = pair.value.replace('_Internet_Slot', '_CA_Internet_Slot');
					} else if (pair.value.indexOf('_HomePhone_Slot') != -1) {
						subst = pair.value.replace('_HomePhone_Slot', '_CA_HomePhone_Slot');
					} else if (pair.value.indexOf('_Bundles_Slot') != -1) {
						subst = pair.value.replace('_Bundles_Slot', '_CA_Bundles_Slot');
					} else if (pair.value.indexOf('_ATTUverse_Slot') != -1) {
						subst = pair.value.replace('_ATTUverse_Slot', '_CA_ATTUverse_Slot');
					} else {
						subst = pair.value.replace('_slot', '_CA_slot');
					}
					reqURI = contentDropletRequestURL + subst;
				}	
				
				var hasUsDma = false;
				for (var i=0; i<emergencyDMA.length; i++) {
					if (emergencyDMA[i] === 'US')
						hasUsDma = true;
				}
				
				if(emergencyDMA.length > 0 && (hasUsDma || typeof userDataHash.get('DCSext.wt_aka_dma') != 'undefined') ) {
					var hasEmergency = false;
					emergencyDMA.each(function(item){
						if(item == 'US' || item == userDataHash.get('DCSext.wt_aka_dma')){
							hasEmergency = true;
						} 
					});
					if(hasEmergency && pair.key == 'mainSlot1') {
						reqURI = contentDropletRequestURL + emergencySlotName;
					}
					
				}
				slotCaller.push([reqURI, pair.key]);
			}
		});
	}
	
	// returns userType
	this.getUserType = function() {
		var pUserType = this.getUserScheme();
		return pUserType;
	}
	
	// get the cookie
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
	
	//sets up DTAB cookie write params
	this.setDtab = function() {
		setCookie("DTAB","Tab=Res","90","/",".att.com")	
	}
	
		
	// read a cookie, parse logic depends on name of cookie, we know how to parse if we know the name
	this.parseCookie = function(cookieToParse) {
		var myCookie = this.getCookie(cookieToParse);
		var pRegion = this.getRegion();
		var cookieCtr = 0;
		if( myCookie != null) {
			switch(cookieToParse) {
				case 'attPersistantLocalization' :
					var contentArray = myCookie.split("|");
					var numNodes = contentArray.length;
					if(numNodes >= 5) {
						// if user has localised to something other than the header says, trust the user
						var localizedState = contentArray[3].substring(6);
						var convertedStateName = this.convertStateName(localizedState);
						if(convertedStateName && convertedStateName != userDataHash.get('DCSext.wt_aka_region_code')) {
							this.setStateBucket(convertedStateName);
							userDataHash.set('DCSext.wt_aka_region_code', convertedStateName);
							if(region == 'OF') {
								if(accountType.indexOf('D') != -1) {
									accountType = accountType.replace('D', '');
									if(accountType == '') {existingCustomerType = 2}
								}
								compISP = '';
							}
						}
					}
					break; 
				case 'attTargetUverse' :
					if(accountType.indexOf('U') == -1 && pRegion != 'OF') {
						userDataHash.set('uverseGreen', true);
						uverseEligible = uverseEligible + 'UG';
						if(compISP == 'CI') {compISP = ''}
					}
					break; 
				case 'uvp_env' :
					if(pRegion != 'OF') {
						userDataHash.set('uverse', true);
						cookieCtr++;
						accountType = accountType.replace(/D/g, '') + 'U';
						compISP = '';
					}
					break; 
				case 'colam_ctn' :
					if(this.isNumeric(myCookie.substr(4, 9))) {
						userDataHash.set('olam', true);
						cookieCtr++;
						accountType = accountType + 'M';
					}
					break; 
				case 'IDcookie' :
					userDataHash.set('idFlow', true);
					break; 
			}
			if(cookieCtr > 0 && accountType != '') {
				existingCustomerType = 3;
				compISP = '';
			}
		}
	}
	
	// call parser on a list of cookies and set values in hash
	this.parseCookies = function() {
		var cookieList = new Array('attPersistantLocalization', 'uvp_env', 'attTargetUverse', 'colam_ctn', 'IDcookie');
		for(i = 0; i < cookieList.length; i++) {
			this.parseCookie(cookieList[i]);
		}
	}
	
	// grab meta tags from the head and store in a hash
	this.collectMeta = function() {
		var akaMetaCtr = 0;
		// see if we're in test mode, if so: override headers with test data from harness page
		if(this.checkOverrideArgs()) {
			var items = overrideArgs;
			if(typeof items.region_code != 'undefined') {
				if(items.region_code != 'unknown') {
					userDataHash.set('DCSext.wt_aka_region_code', items.region_code);
				}
				akaMetaCtr++;
			}
			if(typeof items.network != 'undefined') {
				userDataHash.set('DCSext.wt_aka_network', items.network);
				akaMetaCtr++;
			}
			if(typeof items.dma != 'undefined') {
				userDataHash.set('DCSext.wt_aka_dma', items.dma);
				akaMetaCtr++;
			}
		}
		else {
			for(var i = 0; i < metaTagsInHead.length; i++) {
				if(metaTagsInHead[i].name.toString().indexOf('aka_') != -1) {	
					userDataHash.set(metaTagsInHead[i].name, metaTagsInHead[i].content);
					akaMetaCtr++;
				}			
			}	
		}	
		if(akaMetaCtr > 0) {
			if(typeof userDataHash.get('DCSext.wt_aka_region_code') != 'undefined') {
				existingCustomerType = 2;
				this.setStateBucket(userDataHash.get('DCSext.wt_aka_region_code'));
			}
			if(typeof userDataHash.get('DCSext.wt_aka_network') != 'undefined') {
				var pRegion = this.getRegion();
				if(userDataHash.get('DCSext.wt_aka_network') == 'att' || userDataHash.get('DCSext.wt_aka_network') == 'sbc_internet' || userDataHash.get('DCSext.wt_aka_network') == 'prodigy') {
					if(accountType.indexOf('U') == -1 && region != 'OF') {					
						accountType = 'D' + accountType;
						existingCustomerType = 3;
					}
				}
				else {
					if(region != 'OF' || existingCustomerType != 3) {
						compISP = compISP + 'CI';
					}
				}
			}
		}
		this.parseCookies();
	}
	
	//tracking stuff
	this.initTracking = function() {
		for(var i = 0; i < metaTagsInHead.length; i++) {
			if(metaTagsInHead[i].name.toString().indexOf('wtPN') != -1) {	
				jQuery(metaTagsInHead[i]).attr('content', 'ATT Homepage|' + trackingPageParam);
			}
		}
		
		delete DCSext["wtNoHit"];
	
		this.runWT();	
	}
	
	
	this.runWT = function() {
		setTimeout(function() {
			dcsMain();
			try {reporting.tag.clear()} catch (e) {};
		}, 3000);
	}
	
	// this sets up any linkfarm differences in the link farm for user types
	/*
	this.setupLinkFarm = function() {
		if(this.getUserType().indexOf('9') != -1 || this.getUserType().indexOf('13') != -1) {
			$('movingLink').show();
		}
	}
	*/
	
	// init for runtime
	this.runTargeting = function() {
		this.parseMap();	
		var pUserType = this.getUserType();
		
		this.setContentItems(pUserType);
		
		this.getContentItems();
		
		jQuery(document).ready(function() {
			isDomReady = true;
		
			if (debug) {console.log('targetingFW: DOMready marquee injection');}
			targetingFW.populateMarquee();
			
			targetingFW.populateSlots();
			
			targetingFW.initTracking();
			//if(pUserType != 1) {this.setupLinkFarm()};
			targetingFW.setDtab();
		});
	}
	
	this.populateMarquee = function() {
		if (debug) {console.log('targetingFW: typeof marqueeBuffer? ' + typeof marqueeBuffer);};
		if (debug) {console.log('targetingFW: marquee already injected? ' + marqueeInjected);}
		if (marqueeBuffer && !marqueeInjected) {
			marqueeInjected = true;
			jQuery('#' + geoTargetedSlots[0]).html(marqueeBuffer);
			if (debug) {console.log('targetingFW: marquee injected!')};
		}
	}

	this.populateSlots = function() {
		for (var i=0; i<slotCaller.length; i++) {
			this.callSlot(slotCaller[i][0], slotCaller[i][1]);
		}
	}
	
	this.callSlot = function (url, divName) {
		jQuery.get(url, function(data) {
			jQuery('#' + divName).html(data);
			jQuery('#' + divName + ' .featuredItemTile').css('visibility','visible');
		});
	}

}
// Instantiation of the class
var targetingFW = new targetingFWLib();
//if(debug){setTimeout('console.info(getPageLevelGeos())', 3000);}
targetingFW.runTargeting();