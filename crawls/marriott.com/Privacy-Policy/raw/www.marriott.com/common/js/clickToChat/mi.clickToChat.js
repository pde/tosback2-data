
// Object used by Click to Chat administration console.
// object parameters used in checking rule conditions.
// example if ctc.resAmount >= 1500 then display invitation.
var ctc = new Object();

var clickToChat = {
	/*	Get chat beacon query string parameters.
	---------------------------------------------- */
	parseQuerystring : function(parameterName) {
   		var lletter, fletter;
   		var querystring, parameterValue, rSpace; 
   		querystring = document.location.search;
   		parameterValue = "";   
   		if (querystring.length > 1) {
    	    querystring = querystring.substr(1);
    	    fletter = querystring.indexOf(parameterName);
    	    if (fletter != -1) {
    	         fletter += parameterName.length + 1;
    	         lletter = querystring.indexOf('&', fletter);
    	         if (lletter == -1) {
    	              lletter = querystring.length;
    	         }
    	         parameterValue = querystring.substring(fletter,lletter);
    	         rSpace = new RegExp(" ","g");
    	         parameterValue = parameterValue.replace(rSpace, "+");
    	    }
	   }  
		return parameterValue;
	},
	/*	Adding leadingZeros if Reward number less than 9 digits and adding space for every 3 digits.
	---------------------------------------------- */
	formatRewardsNum : function(rewardsNumber){
	    if(rewardsNumber == null) 
	    	return null;
	    
		var formattedAccountNum = rewardsNumber + "";
		if(formattedAccountNum.length > 0 && formattedAccountNum.match(/^[0-9]+$/)){			
			if(formattedAccountNum.length > 0){	
				while(formattedAccountNum.length <9){
					formattedAccountNum = "0" + formattedAccountNum;
				}
				formattedAccountNum = formattedAccountNum.replace(/(\d{3})/g, '$1 ');
			}	
		}
		return formattedAccountNum;
	},	
  	/*	Send chat beacon values to Site Catalyst.
	---------------------------------------------- */
	beaconToSiteCatalyst : function() {
		var customerID = unescape(clickToChat.parseQuerystring('customerID'));
		var invitationName = unescape(clickToChat.parseQuerystring('invitationName'));
		var s = s_gi(s_account);
		s.linkTrackVars	= 'prop46,eVar49,events';
		s.linkTrackEvents = 'event56';
		s.prop46 = customerID;
		s.eVar49 = invitationName;
		s.events = 'event56';
		void(s.tl(this,'o','Agent Joins Session'));
	},
	/*	get cookie function
	----------------------- */
	getCookie : function(cName) {
		if (document.cookie.length > 0) {
			var beginCookie = document.cookie.indexOf(cName+'=');
			if (beginCookie != -1) {
		   		beginCookie += cName.length+1;
				var endCookie = document.cookie.indexOf(';',beginCookie);
				if(endCookie==-1){ endCookie = document.cookie.length; }
				return unescape(document.cookie.substring(beginCookie,endCookie));
	   		}
		}
		return '';
	},
	processCTCCookie : function() {
		var ctcData = clickToChat.getCookie('ctcData');
		if(ctcData.length>0){
			var ctcDataSub = "";
			if(ctcData.match('searchCount_')){
				ctcDataSub = ctcData.substring(ctcData.indexOf('searchCount_'));
				ctcDataSub = ctcDataSub.substring(0,ctcDataSub.indexOf('*'));
				var searchCount = parseInt(ctcDataSub.substring(12));
				if(ctc.searchCount > 0) {
					if(ctc.searchCount < searchCount) { 
						ctc.searchCount = searchCount;
					} else { searchCount = ctc.searchCount; }
				} else { ctc.searchCount = searchCount; }
				ctcData = ctcData.replace(ctcDataSub, "searchCount_"+searchCount);
			} else {
				if(ctc.searchCount > 0) { ctcData += "searchCount_"+ctc.searchCount+"*"; }
				else { ctcData += "searchCount_0*"; }
			}
			if(ctcData.match('resAmount_')){
				ctcDataSub = ctcData.substring(ctcData.indexOf('resAmount_'));
				ctcDataSub = ctcDataSub.substring(0,ctcDataSub.indexOf('*'));
				var resAmount = parseInt(ctcDataSub.substring(10));
				if(ctc.resAmount > 0) {
					if(ctc.resAmount < resAmount) { 
						ctc.resAmount = resAmount;
					} else { resAmount = ctc.resAmount; }
				} else { ctc.resAmount = resAmount; }
				ctcData = ctcData.replace(ctcDataSub, "resAmount_"+resAmount);
			} else {
				if(ctc.resAmount > 0) { ctcData += "resAmount_"+ctc.resAmount+"*"; }
				else { ctcData += "resAmount_0*"; }
			}
			if(ctcData.match('inByTomorrow_')){
				ctcDataSub = ctcData.substring(ctcData.indexOf('inByTomorrow_'));
				ctcDataSub = ctcDataSub.substring(0,ctcDataSub.indexOf('*'));
				if(!ctc.inByTomorrow && ctcDataSub.substring(13).match('true')) { 
					ctc.inByTomorrow = true;
				} else { ctcData = ctcData.replace(ctcDataSub, 'inByTomorrow_true'); }
			} else {
				if(ctc.inByTomorrow || !ctc.inByTomorrow) { ctcData += "inByTomorrow_"+ctc.inByTomorrow+"*"; }
			}
			if(ctcData.match('city_')){
				ctcDataSub = ctcData.substring(ctcData.indexOf('city_'));
				ctcDataSub = ctcDataSub.substring(0,ctcDataSub.indexOf('*'));
				if(ctc.city.length>0) {	ctcData = ctcData.replace(ctcDataSub, "city_"+ctc.city); }
			} else {
				if(ctc.city.length>0) { ctcData += "city_"+ctc.city+"*"; }
			}
			if(ctcData.match('state_')){
				ctcDataSub = ctcData.substring(ctcData.indexOf('state_'));
				ctcDataSub = ctcDataSub.substring(0,ctcDataSub.indexOf('*'));
				if(ctc.state.length>0) { ctcData = ctcData.replace(ctcDataSub, 'state_'+ctc.state); }
			} else {
				if(ctc.state.length>0) { ctcData += "state_"+ctc.state+"*"; }
			}
			if(ctcData.match('country_')){
				ctcDataSub = ctcData.substring(ctcData.indexOf('country_'));
				ctcDataSub = ctcDataSub.substring(0,ctcDataSub.indexOf('*'));
				if(ctc.country.length>0) { ctcData = ctcData.replace(ctcDataSub, 'country_'+ctc.country); }
			} else {
				if(ctc.country.length>0) { ctcData += "country_"+ctc.country+"*"; }
			}
		} else {
			ctcData = "";
			if(ctc.searchCount > 0) { ctcData += "searchCount_"+ctc.searchCount+"*"; }
			else { ctcData += "searchCount_0*"; }
			if(ctc.resAmount > 0) { ctcData += "resAmount_"+ctc.resAmount+"*"; }
			else { ctcData += "resAmount_0*"; }
			if(ctc.inByTomorrow) { ctcData += "inByTomorrow_true*"; }
			else { ctcData += "inByTomorrow_false*"; }
			if(ctc.city.length>0) { ctcData += "city_"+ctc.city+"*"; }
			if(ctc.state.length>0) { ctcData += "state_"+ctc.state+"*"; }
			if(ctc.country.length>0) { ctcData += "country_"+ctc.country+"*"; }
		}
		document.cookie = "ctcData="+ctcData+";path=/";
	},
	init : function(){
		// if chat beacon, track agent
		if($('#chatBeaconFileFlag').length>0 && $('#chatBeaconFileFlag').val().match('true')) {
			clickToChat.beaconToSiteCatalyst();
		// if chat form
		}  else {
			var city = $('#global-header-hotel-city-airport').length>0?$('#global-header-hotel-city-airport').val():'';
			var state = $('#find-a-hotel-form select[name="destinationAddress.stateProvince"]').length>0?$('#find-a-hotel-form select[name="destinationAddress.stateProvince"]').val():'';
			var country = $('#find-a-hotel-form select[name="destinationAddress.country"]').length>0?$('#find-a-hotel-form select[name="destinationAddress.country"]').val():'';
			var searchCount = $('#ctc-search-count').length>0?parseInt($('#ctc-search-count').val()):0;
			var resAmount = $('#ctc-stay-total').length>0?parseInt($('#ctc-stay-total').val()):0;
			var bookingPace = $('#ctc-booking-pace');
			var bookingPaceTomorrow = (bookingPace.length>0 && (bookingPace.val()==1 || bookingPace.val()==0))?true:false;
			ctc.city = city;
			ctc.state = state;
			ctc.country = country;
			ctc.inByTomorrow = bookingPaceTomorrow;
			if(searchCount>0){ ctc.searchCount = searchCount; }
			if(resAmount>0){ ctc.resAmount = resAmount; }
			clickToChat.processCTCCookie();
		}
	}
};
if(typeof applyApplicationLoadScenario === "function"){
	applyApplicationLoadScenario("clickToChat.init()","chat-application");
}