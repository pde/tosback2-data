
	
var productCompare = new function() {

	this.BACK_PARAM = "&backURL=";
	this.COMPARE_URL = "/webapp/wcs/stores/servlet/CompareProductsDisplay?catalogId="+wcs.catalogId+"&storeId="+wcs.storeId;
	this.PART_NUMBER_PARAM = "&partNumbers=";
	this.MAX_PRODUCTS = 4;
	this.COOKIE_NAME = 'compare';
	
	this.products = [];
	
	this.addItem = function(item) {
		// item : partNumber, detailUrl, description, imageUrl
		if(this.products.length >= this.MAX_PRODUCTS) {
			alert(messages.COMPARE_TOO_MANY_PRODUCTS);
			$('#compare-product-'+item.partNumber).attr('checked', false);
			return false;
		} else {
			for(var i=0; i<this.products.length; i++) {
				if(this.products[i].partNumber == item.partNumber) {
					alert(messages.COMPARE_ALREADY_ADDED);
					$('#compare-product-'+item.partNumber).attr('checked', true);
					return false;
				}
			}
			this.products.push(item);
			this.updateDisplay();
			this.serializeToCookie();
			$('#compare-product-'+item.partNumber).attr('checked', true);
			return true;
		}
	}
	
	this.removeItem = function(item) {
		var found = false;
		for(var i=0; i<this.products.length; i++) {
			if(this.products[i].partNumber == item) {
				this.products.splice(i,1);
				found = true;
			}
		}
		if(found) {
			this.serializeToCookie();
			this.updateDisplay();
		}
		$('#compare-product-'+item).attr('checked', false);
		return found;
	}
	
	this.removeAll = function() {
		this.products = [];
		this.serializeToCookie();
		this.updateDisplay();
	}
	
	this.serializeToCookie = function() {
		$.cookie(this.COOKIE_NAME, JSON.stringify(this.products), { path: '/' });
	}
	
	this.deserializeFromCookie = function() {
		var c = $.cookie(this.COOKIE_NAME);
		if(c) {
			this.products = JSON.parse($.cookie(this.COOKIE_NAME));
		}
		this.updateDisplay();
	}
	
	this.deserializeFromQueryString = function(productString){
		this.products = [];
		var partNumbers = productString.split(',');
		for(var i=0; i<partNumbers.length; i++){
			if (partNumbers[i]){
				var item = { partNumber : partNumbers[i], compareImage : $('[partNumber=' + partNumbers[i] + ']').attr('compareImage') };
				this.addItem(item);
			}
		}
		this.updateDisplay();
	}
	
	this.compareURL = function() {
		var ids = $(this.products).map(function() { return this.partNumber; }).get().join(',');
		return this.COMPARE_URL + this.PART_NUMBER_PARAM + ids;
	}
	
	this.defaultCompareURL = function(){
		return this.compareURL() + this.BACK_PARAM + window.location.pathname + encodeURIComponent(window.location.search);
	}
	
	this.backCompareURL = function(backParam){
		return this.compareURL() + this.BACK_PARAM + encodeURIComponent(backParam);
	}
	
	this.initializeCheckboxes = function() {
		var products = this.products;
		$('.compare-box').each(function() {
			var item = $(this).attr('partNumber');
			var found = false;
			for(var i=0; i<products.length; i++) {
				if(products[i].partNumber == item) {
					found = true;
				}
			}
			$(this).attr('checked',found);
		});
	}
	
	this.updateDisplay = function() {
		$('#compare').html('');
		for(var i=0; i<this.MAX_PRODUCTS; i++) {
			if(this.products.length > i) {
				var e = 'onerror="this.onerror=\'\';this.src=\'' + wcs.globalImagePath + 'images/unavailable_32.png\'"';
				$('#compare').append($('<div class="compare-icon" onclick="productCompare.removeItem(\''+this.products[i].partNumber+'\')"><img '+e+' src="'+this.products[i].compareImage+'" alt=""></img></div>').data('item',this.products[i]));
			} else {
				$('#compare').append('<div class="compare-icon-empty"></div>');
			}
		}
		//.append($h);
		if(this.products.length > 0) {
			if(this.products.length == 1) {
				$('#compare').prepend('<p>'+messages.COMPARE_ONE_PRODUCT+'</p>');
			} else {
				$('#compare').append('<a class="submit" href="'+encodeURI(this.defaultCompareURL())+'">'+messages.COMPARE_BUTTON+'</a>');
				$('#compare a').wrapInner('<span class="s1"><span class="s2"></span></span>').addClass('costco-button');
			}
		//	$('#compare .compare-icon').click(function(){
		//		productCompare.removeItem($(this).data('item'));
		//	});
			$('#compare .compare-icon').hover(function() {
				$(this).append('<div class="delete-hover"></div>');
			}, function() { $('.delete-hover', $(this)).remove(); } );
		
		} else {
			$('#compare').prepend("<p>"+messages.COMPARE_NO_PRODUCTS+"</p>");
		}
	}
	
};

function cleanUpEmptyCompareRows() {
	$('.product-compare-table tr').each(
			function() {
				if($('*',this).length == 0)
					$(this).remove();
			});
}

$(window).load(function() {

	cleanUpEmptyCompareRows()
	
	if($('body').hasClass('show-compare') && $('.compare-box').size()>0) {
		$('.compare-box').change(function(event){
			var item = { partNumber : $(this).attr('partNumber'), compareImage : $(this).attr('compareImage') };
			if ($(this).is(':checked')) {
				if (item.partNumber){
					// Only propagate the event if the adding was successful
					return productCompare.addItem(item);
				}
			}
			else {
				
				// Remove the item and propagate the event even if no item was found
				productCompare.removeItem(item.partNumber);
				return true;
			}
		});
		$('#breadcrumbs').after('<div id="compare" class="no-items"></div>');
	}

	productCompare.deserializeFromCookie();
	productCompare.initializeCheckboxes();
	
	$('.product-compare-table tr:odd').addClass('even');
	$('.product-compare-table tr:first').equalHeights();
	$('.product-compare-table .product-tile').height($('.product-compare-table td.product').height());
});