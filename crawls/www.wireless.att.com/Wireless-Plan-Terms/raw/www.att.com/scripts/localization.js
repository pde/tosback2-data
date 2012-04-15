var Localization = (function(){
	var successURL = null;
	var notavailURL = "";
	var enteredZip = "";
	var modalExpanded = false;
	var modalSize = {min:315, max:610};
	
	function serviceNotAvailable(info) {
		var redirectL22 = (info.outOfL22FootPrint &&  Localization.config.requiredL22);
		var redirectWire = (info.outOfWirelessFootPrint &&  Localization.config.requiredWireless);
		var redirectOut = (info.outOfL22FootPrint && info.outOfWirelessFootPrint);
		
		if (redirectL22 || redirectWire || redirectOut) {
			var url = "/shop/availability/service-not-available-zip.jsp?saveme=true&q_zipCode=" + enteredZip;
			if (Localization.config.service) { url += "&q_serviceType=" + Localization.config.service; }
			var messageCode = (redirectOut == true) ? 'SHLOC1007' : (redirectL22 == true) ? 'SHLOC1005' : 'SHLOC1006';
			notavailURL = url + "&q_message=" + messageCode;
		}
		return (redirectL22 || redirectWire || redirectOut);
	}
	
	return {
		init : function(args) {
			successURL = (/\/\blocalization\/|\bloc\//.test(args.element.href)) ? null : args.element.href;
			args.config.cbConfig.href = "/shop/localization/index.jsp";
		},
		
		submit : function(element) {
			enteredZip = jQuery("#zipCodeEntry", element).val();
			var returnURL = jQuery("#returnURL", element).val();
			if (returnURL) { Localization.config.init(returnURL); successURL = returnURL; }/* fake return page behavior */
			var tmpURL = (window.location.href.indexOf("/availability/") < 0 ? window.location.href : null);/* URL if not availability page */
			DWRRequestManager.localize(enteredZip, tmpURL, Localization.callback);
			return false;
		},
		
		resizeModal : function() {
			var newSize = (modalExpanded) ? modalSize.min : modalSize.max;
			modalExpanded = !modalExpanded;
			setTimeout(function(){ jQuery.colorbox.resize({height:newSize}); }, 900);
		},
		
		callback : function(pData) {
			var info = jQuery.parseJSON(pData);
			if (info.errorCode) {/* display error modal */
				var errorURL = ("/shop/localization/localization-error.jsp?q_message="+info.errorCode + "&q_zipCode=" +(!/^[0-9a-zA-Z]+$/.test(enteredZip)?"":enteredZip));
				modalExpanded = false;
				modalSize = {min:357, max:652};
				jQuery.colorbox({scrolling:false, iframe:true, width:505, height:modalSize.min, onComplete:modalUtils.initIframe, href:errorURL});
			} else if (serviceNotAvailable(info)) {/* display SNA page */
				window.location = notavailURL;
			} else {/* reload page or got success */
				if(successURL) { window.location = successURL; }
				else { window.location.reload(); }
			}
		}
	}
})();

Localization.config = {
		requiredL22 : false, requiredWireless : false, service : null,
		init : function(url) {
			Localization.config.requiredL22 = /\/shop\/(\bbundles|\bhome-phone|\binternet|\bu-verse)/.test(url);
			Localization.config.requiredWireless = /\/shop\/(\bwireless)/.test(url);
			var matches = url.match(/\bbundles|\bhome-phone|\binternet|\bu-verse|\bwireless/);
			Localization.config.service = (matches) ? matches[0] : null;
		}
};
Localization.config.init(window.location.href);