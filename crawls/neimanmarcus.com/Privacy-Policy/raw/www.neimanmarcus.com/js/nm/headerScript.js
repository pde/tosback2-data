function GetFragmentReq(){}
GetFragmentReq.prototype.objectType=function(){return "GetFragmentReq";}
var GetFragmentReq_url = "url";

function ContextChooserReq(){}
ContextChooserReq.prototype.objectType=function(){return "ContextChooserReq";}
var ContextChooserReq_country = "country";
var ContextChooserReq_currency = "currency";

var nm = window.nm || {};

nm.headerScript = (function($) {
	
	function init() {
		$('#assistanceHeaderLink').live('click', function(ev){
			var $assistDD = $('#assistDD');
			$assistDD.toggleClass('active');
		});

		$('#assistanceClose').live('click', function(ev){
			var $assistDD = $('#assistDD');
			$assistDD.removeClass('active');
		});
		
		$('body').click(function(ev){
			var $assistDD = $('#assistDD');
			$assistDD.removeClass('active');
		});
		
		$('#changeCountryLink').live('click', function(ev){
			ev.preventDefault(); // this prevents the raiseShield() function (in the nm.endeca.filter.ajax.js file) from being called
			var getFragmentReq = new GetFragmentReq();
			getFragmentReq[GetFragmentReq_url] = '/page/service/contextChooser.jsp';
			defaultGateway.ajaxService(getFragmentReq, showFragLightbox, onError, null, this);
		});
		
		$('#welcome').live('click', function(ev){
			var getFragmentReq = new GetFragmentReq();
			getFragmentReq[GetFragmentReq_url] = '/welcomeMatTest.jsp';
			defaultGateway.ajaxService(getFragmentReq, showFragLightbox, onError, null, this);
		});
	}
	
	function highlightCurrentSilo(currentSiloId) {
		$('#siloheader').find('[id^=silo]').filter(function() {
			var siloId = '';
			var href = $(this).attr('href');
			
			if (href) {
				siloId = getUrlParam('siloId', href);
			} else {
				siloId = $(this).data('category-id');
			}
			
			// filter down to silo that matches any of the current catIds
			return siloId && siloId == currentSiloId;
			
		}).addClass('current');
	}
	
	function loadContextChooserForFiftyOne()
	{
		
		var getFragmentReq = new GetFragmentReq();
		getFragmentReq[GetFragmentReq_url] = '/page/service/contextChooser.jsp';
		defaultGateway.ajaxService(getFragmentReq, showFragLightbox, onError, null, this);
	}
	function invokeNMWelcomeMat(ev){
		var getFragmentReq = new GetFragmentReq();
		getFragmentReq[GetFragmentReq_url] = '/NMWelcomeMat.jsp';
		defaultGateway.ajaxService(getFragmentReq, showFragLightbox, onError, null, this);
	}
	
	function invokeFiftyOneWelcomeMat(ev){
		alert("!!!"+ev);
		var getFragmentReq = new GetFragmentReq();
//		getFragmentReq[GetFragmentReq_url] = ev;
		getFragmentReq[GetFragmentReq_url] = 'https://sandbox.fiftyone.com/welcome/welcome.srv?merchId=3646&countryId=IN&setCookie=Y';
		defaultGateway.ajaxService(getFragmentReq, showFragLightbox, onError, null, this);
	}
	
	function invokeRestrictionModal(ev){
		var url = '/page/service/shoppingBagRestrictionPage.jsp?shoppingBagErrorMessage=' + ev;
			var getFragmentReq = new GetFragmentReq();
			getFragmentReq[GetFragmentReq_url] = url;
			defaultGateway.ajaxService(getFragmentReq, showFragLightbox, onError, null, this);
		}
		

	
	function showFragLightbox(content) {
		lightboxWindow.Populate(content.string);
		omnitureHandler.contextChooser(document.getElementById("contextChooserCurrency").value);
	}
	
	function highlightCurrentSilo(currentSiloId) {
		$('#siloheader').find('[id^=silo]').filter(function() {
			var siloId = '';
			var href = $(this).attr('href');
			
			if (href) {
				siloId = getUrlParam('siloId', href);
			} else {
				siloId = $(this).data('category-id');
			}
			
			// filter down to silo that matches any of the current catIds
			return siloId && siloId == currentSiloId;
			
		}).addClass('current');
	}

	function onError(error) {
		alert('There was an error processing your request.');
	}
	
	function setCountryAndCurrencyPrefs() {
		var contextChooserReq = new ContextChooserReq();
		
		contextChooserReq[ContextChooserReq_country] = document.getElementById("contextChooserCountry").value;
		contextChooserReq[ContextChooserReq_currency] = document.getElementById("contextChooserCurrency").value;
		
		defaultGateway.ajaxService(contextChooserReq, closeContextChooser, onError, null, this);
	}
	
	function shipToUS() {
		var contextChooserReq = new ContextChooserReq();		
		contextChooserReq[ContextChooserReq_country] = 'US';
		contextChooserReq[ContextChooserReq_currency] = 'USD';
		defaultGateway.ajaxService(contextChooserReq, closeContextChooser, onError, null, this);
	}

	
	function closeContextChooser() {
		omnitureHandler.contextChooser(document.getElementById("contextChooserCountry").value);

		lightboxWindow.Close();
		var QueryString = location.href.substring ( location.href.indexOf ( "?" ) );
		if(QueryString.indexOf("showContextChooser")>0)
			{
			window.location="/index.jsp";
			}
		else{
		window.location.reload();
		}
	}
	
	/*
	 * Currently, the function is called when the onchange and onfocus events fire.
	 * The event is passed as a parameter.
	 * The currency that corresponds to the selected country should
	 * only be changed when the onchange event fires and when the country is not Canada,
	 * which defaults to the US Dollars because this functionality is not supported via FiftyOne, 
	 * but by the current online implementation, which only supports the US Dollars.
	 * When the onfocus event fires(when the modal initially opens), the currency will be defaulted
	 * to the currency preference stored in the customer's profile.
	 */
	function setCurrency(e) {
		var selectCountry = document.getElementById("contextChooserCountry");
		var selectCurrency = document.getElementById("contextChooserCurrency");
		var selectCurrencyLength = selectCurrency.length;
		
		for (i = 0; i < selectCurrencyLength; i++) {
			// the selectCountry id contains the currency code, the selectCountry value contains the country code
			if (selectCurrency.options[i].value == selectCountry.options[selectCountry.selectedIndex].id) {
				// change the currency that corresponds to the selected country only when the onchange event fires
				if (e.type == 'change') {
					// shipping to Canada is not enabled via FiftyOne, but via the current online functionality, which only supports the US Dollars 
					if (selectCountry.options[selectCountry.selectedIndex].value == 'CA') {
						selectCurrency.options[selectCurrency.selectedIndex].value = 'USD';
						selectCurrency.options[selectCurrency.selectedIndex].text = 'US Dollar';
					} else {
						selectCurrency.selectedIndex = i;
					}
				}	
			} 
		}
		
		// disable the selectCurrency drop-down for the United States and Canada since on the US Dollar is supported 
		if (selectCountry.options[selectCountry.selectedIndex].value == 'US' ||
			selectCountry.options[selectCountry.selectedIndex].value == 'CA') {
			selectCurrency.disabled = "disabled";
		} else {
			selectCurrency.disabled = "";
		}
	}

	
	return {
		init: init,
		highlightCurrentSilo: highlightCurrentSilo,
		setCountryAndCurrencyPrefs: setCountryAndCurrencyPrefs,
		setCurrency: setCurrency,
		shipToUS: shipToUS,
		highlightCurrentSilo: highlightCurrentSilo,
		invokeNMWelcomeMat: invokeNMWelcomeMat,
		invokeFiftyOneWelcomeMat : invokeFiftyOneWelcomeMat,
		loadContextChooserForFiftyOne: loadContextChooserForFiftyOne,
		invokeRestrictionModal:invokeRestrictionModal
	}
})(jQuery.noConflict());

jQuery(nm.headerScript.init);
