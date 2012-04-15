function setCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	} else {
		var expires = "";
	}

	document.cookie = name+"="+value+expires+"; path=/";
}
	
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

// redirect anchor tag href based on rel pattern
jQuery(document).delegate('a', 'click', function() {
	var sort = readCookie("productSort");
	if (sort != null && sort != "null" && sort != "" && jQuery(this).attr("href").indexOf('family') > -1) {
		jQuery(this).attr("href", jQuery(this).attr("href") + "&s=" + sort);
	}	
});

document.observe("dom:loaded",function(e){
	if ($$('div.navi')[0]) {
		// RSK BLIND ACCESSIBILITY FIX - Rewriting the duplicate sort label and select ID
		var duplicateSort = Element.down($$('div.navi')[0], 'select');
		var duplicateLabel = Element.down($$('div.navi')[0], 'label');
		if(duplicateSort != null) Element.writeAttribute(duplicateSort, 'id', 's2');
		if(duplicateLabel != null) Element.writeAttribute(duplicateLabel, 'for', 's2');
	}
	// product page tabset fix
	function resetSummary() {
		var leftColHeight = Element.getHeight($('left-col'));
		var rightColHeight= Element.getHeight($('right-col'));
		var tabsetHeight;
		if(leftColHeight > rightColHeight) tabsetHeight = leftColHeight;
		else tabsetHeight = rightColHeight;
		Element.setStyle($('tabsetBasic'), {
		  height: ""+(tabsetHeight+50)+"px"
		});
	}

	if ($('tabsetBasic')) {	
		if($('summaryTab')){
			Element.observe($('summaryTab'), 'click', function(){
				resetSummary();
			});
		}
		resetSummary();
	}
	jQuery("#about h3.sprite").bind('click',function(){
		jQuery("#about div.content").toggle();
		return false;
	});
});


jQuery(function(){
	//Utility Nav flyout menu functionality
	jQuery('#servicesNav li.hideText, #servicesNav li.hideText ul.combohide li').hover(function(e){
		jQuery(this).addClass('active');
		jQuery(this).children('ul').show();
	}, function(e){
		jQuery(this).removeClass('active');
		jQuery(this).children('ul').hide();
	});
	
	//Navigation flyout menu functionality
	jQuery('#allProds, #batteriesAndPower,#cellAndService,#specialtyElectronics,#hobbyAndDIY').hover(function(e){
		jQuery(this).children('a').addClass('active');
		jQuery(this).children('ul').show();
	}, function(e){
		jQuery(this).children('a').removeClass('active');
		jQuery(this).children('ul').hide();
	});
	
	
	// handle display of default search field text
	var searchField = jQuery('#kw');
	if(searchField != null){
		//set the default text 
		if(searchField.val() == null || searchField.val() == ''){
			searchField.val("Search");
		} else if(searchField.val() == 'search enter keyword'){
			searchField.val("Search");
		}
		// on blur check if the default text needs to be applied
		searchField.blur(function(){
			if(searchField.val() == null || searchField.val() == ''){
				searchField.val("Search");
			}
		});
		// on focus remove default text if it is there
		searchField.focus(function(){
			if(jQuery.trim(searchField.val()) == "Search"){
				searchField.val('');
			}
		});
	}

});
