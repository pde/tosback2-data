function accordionPop(x){
	commonFunc.overLayDiv(true); 
	commonFunc.centerDiv($('mainPopupDiv')); 
	$('mainPopupDiv').setStyle({visibility: 'visible'}); 
	loadAccordion(x); 
	setTimeout('recenterDiv()', 600);	
}

function accordionPopClose(){
	resetAccordion(); 
	$('mainPopupDiv').setStyle({visibility:'hidden'}); 
	commonFunc.overLayDiv(false);
}

function accordionPopDemo(){
	$('mainPopupDiv').setStyle({width: '700px'}); 
	$('accordion').hide(); 
	$('popCloseButton').hide(); 
	$('demoANDtours').show(); 
	$('popCloseButton2').show(); 
	commonFunc.centerDiv($('mainPopupDiv'));
}
function accordionPopDemoClose(){
	$('demoANDtours').hide(); 
	$('popCloseButton2').hide(); 
	$('mainPopupDiv').setStyle({width: '640px'}); 
	$('accordion').show(); 
	$('popCloseButton').show(); 
	commonFunc.centerDiv($('mainPopupDiv'));
}

function rockPopPackages(){
	commonFunc.overLayDiv(true);
	commonFunc.centerDiv($('mainPopupDiv'));
	$('mainPopupDiv').setStyle({visibility:'visible'});
	$('programmingPackages').show();
}

function rockPopDemo(){
	$('mainPopupDiv').setStyle({width: '700px'}); 
	$('programmingPackages').hide(); 
	$('popCloseButton').hide(); 
	$('demoANDtours').show(); 
	$('popCloseButton2').show(); 
	commonFunc.centerDiv($('mainPopupDiv'));
}
function rockPopDemoClose(){
	$('demoANDtours').hide(); 
	$('popCloseButton2').hide(); 
	$('mainPopupDiv').setStyle({width: '672px'}); 
	$('programmingPackages').show(); 
	$('popCloseButton').show(); 
	commonFunc.centerDiv($('mainPopupDiv'));
}


function resetAccordion(){
	Event.unloadCache();
}

jQuery(document).ready(function(){
	var slotMaxHeight=0;
	(function($){
		$('.slots.shop_offers').each(function(){
			var sh = $(this).height();
			slotMaxHeight = sh > slotMaxHeight ? sh : slotMaxHeight;
		});
		$('.slots.shop_offers').height(slotMaxHeight);
		var internetHeight = $('.product_not_selected').height();
		$('.shop_internet_main').height(internetHeight);
	})(jQuery);
});
