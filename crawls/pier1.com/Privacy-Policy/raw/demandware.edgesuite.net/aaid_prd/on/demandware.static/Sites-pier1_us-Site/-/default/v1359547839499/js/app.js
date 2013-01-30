/*
 * All java script logic for the application.
 *
 * The code relies on the jQuery JS library to
 * be also loaded. 
 */
// semi-colon to assure functionality upon script concatenation and minification
; 

// if jQuery has not been loaded, load from google cdn
if (!window.jQuery) {
	var s = document.createElement('script');
	s.setAttribute('src', 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js');
	s.setAttribute('type', 'text/javascript');
	document.getElementsByTagName('head')[0].appendChild(s);
}
//flood lights tag call method

function callFloodlight(source, type, cat) { 
	var tag_url="https://fls.doubleclick.net/activityi;src=" + source + ";type=" + type + ";cat=" + cat + ";ord=1;num="+Math.random()*10000000000000+"?"; 
	if(document.getElementById("DCLK_FLDiv")){var flDiv=document.getElementById("DCLK_FLDiv");} 
	else{var flDiv=document.body.appendChild(document.createElement("div"));flDiv.id="DCLK_FLDiv";flDiv.style.display="none";} 
	var DCLK_FLIframe=document.createElement("iframe"); 
	DCLK_FLIframe.id="DCLK_FLIframe_"+Math.random()*10000000000000; 
	DCLK_FLIframe.src=tag_url; 
	flDiv.appendChild(DCLK_FLIframe); 
}
function callFloodlightOrderConfirm(tag_url){
	if(document.getElementById("DCLK_FLDiv")){var flDiv=document.getElementById("DCLK_FLDiv");} 
	else{var flDiv=document.body.appendChild(document.createElement("div"));flDiv.id="DCLK_FLDiv";flDiv.style.display="none";} 
	var DCLK_FLIframe=document.createElement("iframe"); 
	DCLK_FLIframe.id="DCLK_FLIframe_"+Math.random()*10000000000000; 
	DCLK_FLIframe.src=tag_url; 
	flDiv.appendChild(DCLK_FLIframe); 
}
// non-cached session data
(function(app){
	app.user = {
			zip : $('#userSession').attr('data-userZip'),
			storeId : $('#userSession').attr('data-userStoreId')
	};
}(window.app = window.app || {}));


var app = (function (app, $) {
	document.cookie="dw=1";
	/******** private functions & vars **********/
	
	// cache dom elements accessed multiple times
	// app.ui holds globally available elements
	function initUiCache() {
		app.ui = {
			searchContainer : $("#header .header-search"),
			printPage		: $("a.print-page"),
			reviewsContainer: $("#pwrwritediv"),
			main			: $("#main"),
			primary			: $("#primary"),
			secondary		: $("#secondary"),
			// elements found in content slots
			slots : {
				subscribeEmail : $(".subscribe-email")
			},
			citiesjsondata  : []
		};		
	}

	function initializeEvents() {
		//loading the cities json at first
		$.ajax({
			url: app.urls.storesGetCitiesJson,
			cache: true,
			dataType: 'json',
			success:function(jsonResponse){
				app.ui.citiesjsondata = $( jsonResponse ).map(function() {
					return {
						value: this.SC + ', ' + this.SS,
						id: this.SZ
					};
				}).get();
			}
		});
		var controlKeys = ["8", "13", "46", "45", "36", "35", "38", "37", "40", "39"];
		// apply dialogify event handler to all elements that match
		// one or more of the specified selectors
		$("body").on("click", ".dialogify, [data-dlg-options], [data-dlg-action]", app.util.setDialogify)
		.on("keydown", "textarea[data-character-limit]", function(e) {
			var text = $.trim($(this).val()),
				charsLimit = $(this).data("character-limit"),
				charsUsed = text.length;
							
				if ((charsUsed >= charsLimit) && (controlKeys.indexOf(e.which.toString()) < 0)) {					
					e.preventDefault();
				}					
		})
		.on("change keyup mouseup", "textarea[data-character-limit]", function(e) {
			var text = $.trim($(this).val()),
				charsLimit = $(this).data("character-limit"),
				charsUsed = text.length,
				charsRemain = charsLimit - charsUsed;
			
			if(charsRemain < 0) {
				$(this).val( text.slice(0, charsRemain) );
				charsRemain = 0;
			}
			
			$(this).next('div.char-count').find('.char-remain-count').html(charsRemain);
		});

		// build custom menu
		app.nav.init();
		
		// set up toggle elements
		app.util.initToggleElements();
		
		//initialize search suggestions
		if(!$('body').hasClass('mobile')){
			app.searchsuggest.init(app.ui.searchContainer, app.resources.SIMPLE_SEARCH);
		}
		
		if(	(navigator.userAgent.toLowerCase().indexOf("ipad") > -1) ||
			(navigator.userAgent.toLowerCase().indexOf("iphone") > -1) ||
			(navigator.userAgent.toLowerCase().indexOf("ipod") > -1)
		 ) {$('body').addClass('iphone');}

		
		// print handler
		app.ui.printPage.on("click", function () { window.print(); return false; });

		// subscribe email box
		if (app.ui.slots.subscribeEmail.length > 0)	{
			app.ui.slots.subscribeEmail.focus(function () {
				var val = $(this.val());
				if(val.length > 0 && val !== app.resources.SUBSCRIBE_EMAIL_DEFAULT) {
					return; // do not animate when contains non-default value
				}

				$(this).animate({ color: '#999999'}, 500, 'linear', function () {
					$(this).val('').css('color','#333333');
				});
			}).blur(function () {
				var val = $.trim($(this.val()));
				if(val.length > 0) {
					return; // do not animate when contains value
				}

				$(this).val(app.resources.SUBSCRIBE_EMAIL_DEFAULT)
					   .css('color','#999999')
					   .animate({color: '#333333'}, 500, 'linear');

			});
		}
		
		// store search tools, used in global header
		app.storeTools.selectStore( $('.cities-auto input[type="text"]') );
		
		//set preferred store from map
		$(".makeThisMyStore").live("click", function () {
			var selectedStoreId = this.id 
			$("#"+this.id).removeClass('makeThisMyStore');
			$("#"+this.id).addClass('preferredStore');
			app.user.storeId = this.id;
			$.ajax({
				type: "POST",
				url: app.urls.setPreferredStore,
				data: { storeId : this.id }
			})
			.fail(function() {

			});			
			$("#"+this.id).text('Preferred store');
		});		
		
		// checkout login forgot pwd
		app.account.initForgotPwd();
		
		//security Policy
		$('.securityPolicy, .privacyPolicy').click(function(e){
			e.preventDefault();
			var options = $.extend(true, {}, app.dialog.settings, {
				height : 600,
				width : 1200,
				dialogClass : 'privacy'
			});
			app.dialog.open({url:this.href, options: options});
		});
		
		//PDP shipping options
		$('.shippingoptionsdialogcontent').click(function(e){
			e.preventDefault();
			var options = $.extend(true, {}, app.dialog.settings, {
				height : 'auto',
				width : 550,
				dialogClass : 'shippingoptionsdialog',
				title : 'Shipping Availability:'
			});
			app.dialog.open({url:this.href, options: options});
		});
		
		//cart page quantity emptyness restriction
		function checkQTYField(){
			var isEmpty = false;
			var qtyComps = $(".qtyInput");
			for(var i=0; i< qtyComps .length; i++){
			   if(qtyComps[i].value == '' && !isEmpty){
			        alert("Atleast one of the product line item quantity missing!");
			        isEmpty = true;
			        break;
			    }
			}
			return isEmpty;
		}
		
		//onclick checkotu & update QTY restrict emtyness of quantity
		$("#checkoutBtn, .updateQTY").click(function(e){
			if(checkQTYField()){
				return false;
			}
		});
		
		//allow numeric & submit update QTY on enter click
		$(".qtyInput").keypress(function(e){
			if(e.which == 13 || e.keyCode == 13){
				if(checkQTYField()){
					return false;
				}
			}else{
				$(".qtyInput").numeric({ decimal: false, negative: false }, function() { this.value = ""; this.focus(); });
			}
		});
		
		//submit update QTY on enter click
		$(".qtyInput").click(function(e){
			if(e.which == 13 || e.keyCode == 13){
				$(".updateQTY").click();						
			}
		});
		
		//allow numerics only
		$(".numsonly, .option-quantity-desired input").numeric({ decimal: false, negative: false }, function() { this.value = ""; this.focus(); });
		$('.srchField').focus(function(){
			if(!$('body').hasClass('mobile')){
				temp=$('.srchField').val();
			    if(temp == "Find what speaks to you."){
			    		$('.srchField').val("");
			    	}
			}
		});
		$('.srchField').blur(function(){
			if(!$('body').hasClass('mobile')){
			    temp=$('.srchField').val()
			    if($.trim(temp) == ""){
			    		$('.srchField').val("Find what speaks to you.");
			        }
			}
		}); 
		$('.srchField').val("Search");
		
		//key up event handler to update the set product price on change of quantity of set indivudual products
		$(".setIndQty").keyup(function(e){
			var setpriceFin=Number('$0.00'.replace(/[^0-9\.]+/g,""));
			var setForms = $("#product-set-list").find("form").toArray();
			if(e.keyCode >= 48 && e.keyCode <=57 || e.keyCode == 8 || e.keyCode == 46 || e.keyCode >= 96 && e.keyCode <=105){
				for(i=0; i < setForms.length; i++){
					var curr_prod_id = $(setForms[i]).find("input[name='pid']").val();
					var curr_prod_qty = $(setForms[i]).find("input[name='Quantity']").val();
					var no_of_prices = $(".indvidual-price-"+curr_prod_id).children().first().children().length;
					var price="";
					if(no_of_prices && no_of_prices > 1){
						price = $(".indvidual-price-"+curr_prod_id).children().first().children().last().text();						
					}else{
						price = $(".indvidual-price-"+curr_prod_id).children().first().children().first().text();
					}
					var priceFin = Number(price.replace(/[^0-9\.]+/g,""));
					setpriceFin = setpriceFin + (priceFin * curr_prod_qty);
				}
				setpriceFin = setpriceFin.toFixed(2);
				$(".setTotalPrice").children().first().text("$"+setpriceFin);
			}
		});
	}

	function initializeDom() {
		// add class to html for css targeting
		$('html').addClass('js');

		// load js specific styles
		app.util.loadCssFile(app.util.staticUrl("/css/js-style.css"));		
		app.util.limitCharacters();
	}


	// _app object
	// "inherits" app object via $.extend() at the end of this seaf (Self-Executing Anonymous Function
	var _app = {
		containerId		: "content",
		ProductCache	: null,  // app.Product object ref to the current/main product
		ProductDetail	: null,
		clearDivHtml	: '<div class="clear"></div>',
		currencyCodes	: app.currencyCodes || {}, // holds currency code/symbol for the site

		/**
		 * @name init
		 * @function
		 * @description Master page initialization routine
		 */
		init: function () {
			
			if (document.cookie.length===0) {
				$("<div/>").addClass("browser-compatibility-alert").append($("<p/>").addClass("browser-error").html(app.resources.COOKIES_DISABLED)).appendTo("#browser-check");
			}
			
			
			// init global cache
			initUiCache();

			// init global dom elements
			initializeDom();

			// init global events
			initializeEvents();

			// init specific global components
			app.tooltips.init();
			app.minicart.init();
			app.validator.init();
			app.components.init();
			app.searchplaceholder.init();
			app.storeTools.init();
			
			// execute page specific initializations
			var ns = app.page.ns;
			if (ns && app[ns] && app[ns].init) {
				app[ns].init();
			}
		}
	};

	return $.extend(app, _app);
}(window.app = window.app || {}, jQuery));



//app.nav
(function (app, $) {
	var $cache = {
			navItems : $('#navigation li.nav-item'),
			body : $('body')
	};
	
	
	var menuConfig = {
			
		over: function() {
		
			var titleSpan = $(this).children('span.nav-title');
			var assetBlock = $(this).children('div.nav-block');

			if( titleSpan.hasClass('nav-get-inspired') && !titleSpan.hasClass('loaded') ){
				$.ajax({
					url: app.urls.navGetInspired,
					success: function(data) {
						titleSpan.addClass("loaded");
						assetBlock.html(data).delay(300).slideDown(500);
					}
				});
			}
			else if( titleSpan.hasClass('nav-learn-how') && !titleSpan.hasClass('loaded') ){
				$.ajax({
					url: app.urls.navLearnHow,
					success: function(data) {
						titleSpan.addClass("loaded");
						assetBlock.html(data).delay(300).slideDown(500);
					}
				});
			}
			else if( titleSpan.hasClass('nav-share') && !titleSpan.hasClass('loaded') ){
				$.ajax({
					url: app.urls.navShare,
					success: function(data) {
						titleSpan.addClass("loaded");
						assetBlock.html(data).delay(300).slideDown(500);
					}
				});
			}
			else{
					$(this).addClass('active').children('.nav-block').slideDown(500);
			}
			
		},
		
		timeout: 500,
		
		out: function() {
			if( $('.ui-autocomplete:visible').length === 0 && !$('body').hasClass('mobile')  ) {
				$(this).removeClass('active').children('.nav-block').slideUp(500);
			}
		}
		
	};

	
	app.nav= {
		init : function () {

			$cache.navItems.hoverIntent(menuConfig);

			$('#navigation h1.navigation-header')
				.append('<span class="nav-close">close</span>')
				.click(
					function(){
						$('#navigation').find('.active').each(
								function(){
									$(this).removeClass('active');
								}
						);
						
						if( $(this).hasClass('over') ) {
							$(this).removeClass('over');
							$('.block-menu').hide();
						}
						else {
							$(this).addClass('over');
							$('.block-menu').show();
						}
	
					}
				);
			
			$('#navigation li li').hover(
				function(){
					if ( !$cache.body.hasClass('mobile') ){
						$(this).addClass('active').siblings().removeClass('active');
					}
				}
			);

			$('.nav-primary').find('a.level-2').each(function(){
				$(this).click(function(e){
					if (
						($cache.body.hasClass('mobile')) && 
						($(this).siblings('ul').length > 0) && 
						($(this).siblings('ul:visible').length === 0)
					){
						e.preventDefault();
						$(this).after('<span class="nav-close">close</span>');
						$(this).siblings('.nav-close').click(function(){
							$(this).parent().removeClass('active');
							$(this).siblings('a').removeClass('active');
							$(this).remove();
						});
						$(this).parent().addClass('active');
						$(this).addClass('active');
					}
				});
			});

		}
	};
	
	
	

}(window.app = window.app || {}, jQuery));

// app.storefront
(function (app, $) {
	var $cache = {
		body : $('body')
	};

	function loadFullStorefront() {
		
		// incase we are responding from mobile ui
		$cache.body.removeClass('homepage-mobile')
		
		
		if( $cache.body.hasClass('homepage-full') ) {
			// homepage is proccessed
		}
		else {
			// set up homepage
			$.ajax({
				url: app.urls.homeFull,
				success: function(data) {
					$('#storefront-content').html(data);
					app.quickView.initializeButton($('.theater'), ".product-image");
					$('body').addClass('homepage-full');
				}
			});
		}
		
	}

	function loadMobileStorefront() {
		
		// incase we are responding from full ui
		$cache.body.removeClass('homepage-full')
		
		
		if( $cache.body.hasClass('homepage-mobile') ) {
			// homepage is proccessed
		}
		else {
			// set up homepage
				
			$.ajax({
				url: app.urls.homeMobile,
				success: function(data) {
					$('#storefront-content').html(data);
					$('body').addClass('homepage-mobile');
				}
			});
			
		}
	}
	
	app.storefront = {

		init : function () {
			
			if( $('#storefront-content').size() !== 0 ){
				
				if( $('body').width() < 768 ) {
					loadMobileStorefront();
				}
				else {
					loadFullStorefront();
				}
				
			}

		}
	};

}(window.app = window.app || {}, jQuery));


//app.tooltips
(function (app, $) {
	var $cache = {};
	app.tooltips = {
			
		init : function () {
			
			$('.tooltip').tooltip({
				track: true,
				showURL: false,
			    bodyHandler: function() {
					// add a data attribute of data-layout="some-class" to your tooltip-content container if you want a custom class
					var tooltipClass = "";
					if( tooltipClass = $(this).find('.tooltip-content').data("layout") ) {
						tooltipClass = " class='" + tooltipClass + "' ";
					}
		        	return "<div " + tooltipClass + ">" + $(this).find('.tooltip-content').html() + "</div>"; 
				}, 
				showURL: false 
			});
			$('.tooltip').live('click',function(e){
				e.preventDefault();
			});
		}
	};

}(window.app = window.app || {}, jQuery));



//app.storeTools
(function (app, $) {
	
	/*************** private vars and functions ***************/
	
	var $cache = {};
	var pid = null;
	var currentTemplate = $('#wrapper.pt_cart').length ? "cart" : "pdp"	;
	
	function initializeCache() {
		
		$cache = {
			preferredStorePanel : $('<div id="preferred-store-panel"/> '),
			storeList : $('<div class="store-list"/>')
		};
		
	}

	function initializeDom() {
		
		// update online availability
		$('#product-content').find('span.online-avail-msg').each(function(){
			app.storeTools.getOnlineAvailabilityExt($(this).data('pid'), $(this),false);
		});
		$('#cart-table').find('span.online-avail-msg').each(function(){
			getOnlineAvailability($(this).data('pid'), $(this));
		});
		
		// check for items that trigger dialog
		$('#product-content, #cart-table').find('.set-preferred-store').each(function(){			
			
			// on pdp & zip is in session
			if( currentTemplate === 'pdp' && app.user.zip !== 'null') {
				$(this).text('Change Location');
				buildStoreList($(this).parent().attr('rel'));
			}
			
			// on cart & storeId in session
			if( currentTemplate === 'cart' && app.user.storeId !== 'null') {
				$(this).text('Change Location');
			}	
			
			// open dialog on click
			$(this).click( function(e){ 
				e.preventDefault();
				loadPreferredStorePanel($(this).parent().attr('rel'));
			});			
		});

	}
	

	function getOnlineAvailability (pid, target) {
	
			$.getJSON(
				app.util.appendParamsToUrl(app.urls.getAvailability , {pid:pid}),
				{
					format: "json"
				},
				function(data){
					if(data) {
						var status = data.status.toLowerCase();
						if(status === "not_available"){ status = "Not Available Online - Please Check Store Availability";}
						target.html('<div class="store-status ' + status.replace(/_/g,'-') + '">' + status.replace(/_/g,' ') + '</div>');
					}
					// no records
					else {
						
					}
				}
			)
			.success(function (){})		
			.error(function (){})
			.complete(function(){});	
	
	}
	
	function updateTile(pid) {
		
		app.ajax.getJson({
			url: app.util.appendParamsToUrl(app.urls.storesInventory , {pid:pid, zipCode:app.user.zip}),
			callback: function(data){
				if(data && data.length > 0) {
					for (var i=0; i < 3 && i < data.length; i++) {
						var item=data[i];
						var status = data[i].status.toLowerCase();
						var zip = item.postalCode.split('-');
						$('#'+pid).append(
								'<div class="tile-store-avail">' +
									'<span class="address">' + item.address1 + '<br />' + item.city + ', ' + item.stateCode + ' ' + zip[0] + '</span>' +
									'<div class="store-status ' + status.replace(/ /g,'-') + '">' + status + '</div>' +
								'</div>');
					}
					$('#'+pid).append('<span class="label">See more stores</span>');
				}					
				// no records
				else {
					$('#'+pid).append('<span class="label set-preferred-store">Check store availability</span>');
				}
			}
		});	
	}
	
	function setUserZip(zip) {
		
		app.user.zip = zip;
		$.ajax({
			type: "POST",
			url: app.urls.setZipCode,
			data: { zipCode : zip }
		})
		.fail(function() {

		});
		
	}
	
	function setPreferredStore(id) {
		
		app.user.storeId = id;
		$.ajax({
			type: "POST",
			url: app.urls.setPreferredStore,
			data: { storeId : id }
		})
		.fail(function() {

		});
		
	}
	
	function bubbleStoreUp (list, id) {
		
		var preferredEntry = list.find('li.store-'+id).clone();
		list.find('li.store-'+id).remove();
		list.prepend(preferredEntry);		
		
	}

	function buildStoreList(pid) {
		
		// request results from server
		app.ajax.getJson({
			url: app.util.appendParamsToUrl(app.urls.storesInventory , {pid:pid, zipCode:app.user.zip}),
			callback: function(data){
			
				// clear any previous results, then build new
				$cache.storeList.empty();
				var listings = $("<ul class='store-list'/>");
				if(data && data.length > 0) {					
					for (var i=0; i < 10 && i < data.length; i++) {
					    var item=data[i];

					    	// list item for cart
					    	if(currentTemplate === 'cart') {
							    listings.append('<li class="store-' +item.storeId + ' store-tile">' + 
					    				'<span class="store-tile-address ">' + item.address1 + ',</span>' +
						    			'<span class="store-tile-city ">' + item.city + '</span>' +
						    			'<span class="store-tile-state ">' + item.stateCode + '</span>' +
						    			'<span class="store-tile-postalCode ">' + item.postalCode + '</span>' +
						    			'<button value="'+ item.storeId +'" class="button-style-1 select-store-button">Select Store</button>' + 
						    			'</li>');							    
					    	}
					    	
					    	// list item for pdp
					    	else {
								var status = formatStatus('store', item);
								
							    listings.append('<li class="store-' +item.storeId +' store-tile">' + 
					    				'<span class="store-tile-address ">' + item.address1 + ',</span>' +
						    			'<span class="store-tile-city ">' + item.city + '</span>' +
						    			'<span class="store-tile-state ">' + item.stateCode + '</span>' +
						    			'<span class="store-tile-postalCode ">' + item.postalCode + '</span>' +
						    			'<span class="store-tile-status">' + status + '</span>' +
						    			'<span class="store-tile-map-this"><a href="'+app.urls.storeLocatorPage+'">Map this store</a></span>' +
						    			'<button value="'+ item.storeId +'" class="button-style-1 select-store-button">Set preferred store</button>' + 
						    			'</li>');
					    	}
					}
				}
				
				// no records
				else {
					if(app.user.zip !== 'null'){
						$cache.storeList.append("<div class='no-results'>No Results</div>");
						toggleAddToCartButton(pid);
					}
				}				
				
				// set up pagination for results
		    	var storeTileWidth = 176;
		    	var numListings = listings.find('li').size();
		    	$('#listings-nav').remove();
		    	var listingsNav = $('<div id="listings-nav"/>');
		    	for(var i = 0, link = 1; i <= numListings; i++){
		    		if(numListings >= i) { listingsNav.append('<a data-index="'+ i +'">'+link+'</a>'); }
		    		link++;
		    		i = i + 2;
		    	}		    	
		    	listingsNav.find('a').click(function(){
		    		$(this).siblings().removeClass('active');
		    		$(this).addClass('active');
		    		$('ul.store-list').animate({'left' : (storeTileWidth * $(this).data('index') * -1) },1000);
		    	}).first().addClass('active');
		    	$cache.storeList.after(listingsNav);
		    	
		    	// check for preferred store id, highlight, move to top
		    	if(currentTemplate === 'cart'){
		    		var selectedButtonText = 'Selected Store';
		    	}
		    	else {
		    		var selectedButtonText = 'Preferred store';
		    	}
		    	listings
		    		.find('li.store-'+app.user.storeId)
		    			.addClass('selected')
		    			.find('button.select-store-button ')
		    				.text(selectedButtonText);		    	
		    	bubbleStoreUp(listings,app.user.storeId);
		    	
		    	// if there is a block to show results on page (pdp)	    	
		    	if( currentTemplate !== 'cart' ) {
		    		
		    		var onPageList = listings.clone();
		    		var thisDiv = $('#avail-' + pid);
		    		
		    		thisDiv.find('ul.store-list').remove();
		    		thisDiv.append(onPageList);

		    		if( onPageList.find('li').size() > 1 ){
		    			thisDiv.find('li:gt(0)').each(function(){
		    				$(this).addClass('extended-list');
		    			});
		    			thisDiv.parent().find('.more-stores').remove();
		    			thisDiv.after('<span class="more-stores">See More Stores</span>');
			    		thisDiv.parent().find('.more-stores').click(function(){
			    			if( $(this).text() === 'See More Stores' ) {
			    				$(this).text('See Less Stores').addClass('active');
			    			}
			    			else {
			    				$(this).text('See More Stores').removeClass('active');
			    			}
			    			thisDiv.find(' ul.store-list').toggleClass('expanded');
			    			
			    		});
		    		}		    		

		    	}

		    	// update panel with new list
				listings.width(numListings * storeTileWidth).appendTo($cache.storeList);
				toggleAddToCartButton(pid);
				
					// set up 'set preferred store' action on new elements
					listings.find('button.select-store-button').click(function(e){
						var selectedStoreId = $(this).val();						
						if(currentTemplate === 'cart') {
							window.location = app.util.appendParamsToUrl(app.urls.setStoreIdCart , {storeId:selectedStoreId}) ;
							return;
						}
						
						if( app.user.storeId !== selectedStoreId ) {
							
							// set as selected
							setPreferredStore(selectedStoreId);
							bubbleStoreUp (onPageList, selectedStoreId);
							
							$('.store-list li.selected').removeClass('selected').find('button.select-store-button').text('Set preferred store');
							$('.store-list li.store-'+selectedStoreId+' button.select-store-button').text('Preferred store').parent().addClass('selected');
						}
	
					});

			} // end ajax callback
		});
		

	}
	
	function loadPreferredStorePanel (pid) {
		
		// clear any previous results
		$cache
			.preferredStorePanel
				.empty();
		
		// show form if no zip set
		if(app.user.zip === 'null' || app.user.zip === "") {
			$cache
				.preferredStorePanel
					.append('<div><span><input type="text" id="userZip" placeholder="Enter City or Zip" value="Enter City or Zip"/></span><button id="set-user-zip" class="button-style-1" disabled="disabled">Search</button></div>')
					.find('#set-user-zip')
						.click(function(){
							var zipCodePattern = /^\d{5}$/;
							var enteredZip = $('#userZip').val();
							if( zipCodePattern.test(enteredZip) ) {
								//good zip
								setUserZip(enteredZip);
								loadPreferredStorePanel(pid);
							}
							else {
								//bad zip
							}
						});
			$cache
				.preferredStorePanel
					.find('#userZip')
						.keypress(function(e) {
							if( $(this).val() === 'Enter City or Zip' ) {
								$(this).val('');
							}
							
						    code = e.keyCode ? e.keyCode : e.which;
						    if(code.toString() == 13) {
						    	$cache.preferredStorePanel.find('#set-user-zip').trigger('click');
						    }
						});

				// clear any on-page results
		    	$('div.store-stock ul.store-list').remove();
		    	toggleAddToCartButton(pid);
		    	
		    	
				// store search tools, used in global header
				app.storeTools.selectStore( $cache.preferredStorePanel.find('#userZip') );
			
		}
		// zip is set, build list
		else {
			buildStoreList(pid);
			$cache
				.preferredStorePanel
				 .append("<div>For " + app.user.zip + " <span class='update-location'>Change Location</span> | <span class='map-nearby-stores'><a href='"+app.urls.storeLocatorPage+"'>Map Nearby Stores</a></span></div>" )
				 .append($cache.storeList);
			$cache
				.preferredStorePanel
					.find('span.update-location')
						.click(function(){
							setUserZip('null');
							loadPreferredStorePanel(pid);
						});
			
		}
		
		// append close button
		if(app.user.storeId !== 'null') {
			$cache.preferredStorePanel.append("<button class='close button-style-1'>Continue with preferred store</button>");
		}
		else if(app.user.zip !== 'null') {
				$cache.preferredStorePanel.append("<button class='close button-style-1'>Continue with " + app.user.zip + "</button>");
		}

		// open the dialog
		$cache.preferredStorePanel.dialog({
			width: 550,
			modal: true,
			title: 'What\'s available at a store near you'
		});
		
		// action for close/continue
		$('button.close').click(function(){
			if(currentTemplate === "cart") {
				window.location = app.util.appendParamsToUrl(app.urls.setStoreIdCart , {storeId:app.user.storeId}) ;
			}
			$cache.preferredStorePanel.dialog("close");
		});
	}
	
	function toggleAddToCartButton(pid){

		// check for store; in-stock, availToGo = true
		if( $('#store-avail-'+pid+' .preorder').size() !== 0) {
			if( $('span.in-stock.availToGo-true').size() !== 0 ) {
				$('.add-to-cart').removeAttr('disabled');
			}
			else {
				$('.add-to-cart').attr('disabled','disabled');
			}
		}
		
	}
	
	function getStoreCites (input) {
		
		var inputCounter = 1;
		
		input.each(function(){
			
			var hiddenField = document.createElement('input');
			$(hiddenField)
				.attr('type','hidden')
				.attr('id',$(this).attr('id'))
				.attr('name',$(this).attr('name'));
			
			$(this)
				.attr('id','auto-complete-label')
				.attr('name','auto-complete-label')
				.addClass('store-select-' + inputCounter)
				.after($(hiddenField))
				.keyup(function(e){
					var zipCodePattern = /^\d{5}$/;
					var enteredZip = $(this).val();
					if( zipCodePattern.test(enteredZip) ) {
						//good zip
						$(this).parent().siblings('button').removeAttr('disabled');
						$(this).siblings('input[type="hidden"]').attr('value',enteredZip);
					}
					else {
						//bad zip
						e.preventDefault();
						$(this).parent().siblings('button').attr('disabled','disabled');
					}
				})
				.keypress(function(e){
					$('.store-select-' + inputCounter).autocomplete({
						source: app.ui.citiesjsondata,
						minLength: 3,
						autoFocus: true,
						select: function( event, ui ) {
							$(this).siblings('input[type="hidden"]').attr('value',ui.item.id);
							$(this).parent().siblings('button').removeAttr('disabled').trigger('click');
						}
					});
					var keycode = (e.keyCode ? e.keyCode : e.which);
					if(keycode == 13) {
						var zipCodePattern = /^\d{5}$/;
						var enteredZip = $(this).val();
						if( zipCodePattern.test(enteredZip) ) {
							//good zip
							$(this).parent().siblings('button').removeAttr('disabled');
							$(this).siblings('input[type="hidden"]').attr('value',enteredZip);
						}
						else {
							//bad zip
							e.preventDefault();
							$(this).parent().siblings('button').attr('disabled','disabled');
						}
				    }
				});
				
			
		});

	
	}
	
	
	function formatStatus(type, data ) {
		
		if(!data.status) return;

		//check for dynamic status with custom preorder/preview message
		if( data.status.search(app.resources.TO_YOU_MESSAGE) !== -1 || data.status.search(app.resources.TO_GO_MESSAGE) !== -1 ) {
			status = data.status;
			return status;
		}
		
		// clean up status for checks below
		var status = data.status.toLowerCase().replace(/_/g,' ').replace(/-/g,' ');
		
		// check for preorder flag in levels object
		if(data.levels) {
			if( data.levels.PREORDER > 0) {
				status = 'preorder';
			}
		}
		
		// get avail date if set
		var inStockDate = data.inStockDate ? data.inStockDate : '';
		if(inStockDate !== ''){
			inStockDate = inStockDate;
		}
		
		//check for dynamic status with store phone number
		if( status.search("please call") !== -1) {
			status = "call to confirm";
			//return status;
		}
		
		// check for isAvailablePier1ToYou - not avail online if so
		if( (type == 'online') && (data.isAvailablePier1ToYou === false) ) {
			status = 'Not Available Online - Please Check Store Availability';
			return status;
		}
		
		// check for pre-order items && is available To You
		if( (type == 'online') && (status === 'preorder') && (data.isAvailablePier1ToYou !== false) ) {
			status = '<span class="preorder">' + app.resources.TO_YOU_MESSAGE + ' ' + inStockDate + '</span>';
			//return status;
		}
		
		// check for pre-order items && is available To Go
		if( (type == 'store') && (status === 'preorder') && (data.isAvailablePier1ToGo !== false) ) {
			status = '<span class="preorder">' + app.resources.TO_GO_MESSAGE + ' ' + inStockDate + '</span>';
			return status;
		}

		// check for store in-stock, availToGo = true - override disabled button
		if( (type == 'store') && (status === 'in stock') && (data.isAvailablePier1ToGo !== false) ) {
			status = '<span class="in-stock availToGo-true">In Stock</span>';
			return status;
		}
		
		// check for store in-stock, availToGo = false
		if( (type == 'store') && (status === 'in stock') && (data.isAvailablePier1ToGo === false) ) {
			status = '<span class="in-stock availToGo-false">In Stock(Not available for Pier 1 To-Go)</span>';
			return status;
		}
		
		switch (status) {
		
			case 'in stock' :
				
				status = '<span class="in-stock">In Stock</span>';
				break;
				
			case 'in stock (item may be on display)' :
				
				status= '<span class="in-stock">In Stock <span>(Item may be on display)</span></span>';
				break;
				
			case 'in stock (not available for pier 1 to go)' :
				status = '<span class="in-stock availToGo-false">In Stock(Not available for Pier 1 To-Go)</span>';
				break;
				
			case 'not available' :
				
				if(type === 'online') {				
					status = '<span class="out-of-stock">Out of Stock</span>';				
				} else if(type === 'store') {				
					status = 'Not Available at this store';				
				}
	
				break;
				
			case 'out of stock' :
	
				status = '<span class="out-of-stock">Out of Stock</span>';
				break;
				
			case 'call to confirm' :
				
				status = 'Available for Order in Store';
				break;
				
			case 'arriving soon' :
				status = 'Arriving Soon';
				break;
	
			case 'preorder' :
				status = '<span class="preorder">Preorder</span>';
				break;
			
		}

			return status;

	}

function getTileStatusData (pidList) {

	var pidQueryString = pidList.join("&pid=");
	
	$.getJSON(
		app.urls.gridTileInventory + '?pid=' + pidQueryString + '&zipCode=' + app.user.zip ,
		{
			format: "json"
		},
		function(data) {
			
			if(data && data.length > 0) {

				for (var i=0; i < data.length; i++) {
					
					var item = data[i];
					
					var productAvailBlock = $('#pid-'+item.pid);

					var onlineAvailBlock = productAvailBlock.find('.online-stock .value');
					var storeAvailBlock =  productAvailBlock.find('.store-stock');
					
					var onlineStatus = formatStatus('online',item);
					
					var isAvailToYou = item.isAvailablePier1ToYou;
					var isAvailToGo = item.isAvailablePier1ToGo;
					
					onlineAvailBlock
						.html(onlineStatus);

					if(item.stores && item.stores.length > 0) {
						
						for (var s=0; s < 3 && s < item.stores.length; s++) {
							
							var store=item.stores[s];
							
							store["isAvailablePier1ToYou"] = isAvailToYou ;
							store["isAvailablePier1ToGo"]= isAvailToGo;
							
							var storeStatus = formatStatus('store',store);
							
							var zip = store.postalCode.split('-');

							storeAvailBlock.append(
									'<div class="tile-store-avail">' +
										'<span class="address">' + store.address1 + '<br />' + store.city + ', ' + store.stateCode + ' ' + zip[0] + '</span>' +
										'<div class="status">' + storeStatus + '</div>' +
									'</div>');
							
						}
						storeAvailBlock.append('<span class="label">See more stores</span>');
						
					}
					else {
						storeAvailBlock.append('<span class="label set-preferred-store">Check store availability</span>');
					}
				}
				
			}					
			// no records
			else {
				
			}
		})
		.success(function (data){})		
		.error(function (){})
		.complete(function(){});	
}
	
	
	/*************** app.storeTools public object ***************/

	app.storeTools = {
			
			init : function () {
				initializeCache();
				initializeDom();
			},
			
			selectStore : function(input) {
				getStoreCites(input);
			},
			
			updateGridItems : function() {
				
				var pidList = new Array();

						// grid tiles
						$('#search-result-items .store-stock').each(function(){
							
							// avoid dupes if called a few times on endless scroll
							if( !$(this).hasClass('processed') ) {
								
								$(this).addClass('processed');
								
								pidList.push($(this).attr('id'));
								
								if(app.user.storeId){
									$(this).find('.set-preferred-store a').text("Pier 1 To-Go");
								}
								else {
									$(this).find('.set-preferred-store a').text("Check Store Availability");
								}
								
								// update online availability
								$(this).siblings('.online-stock').find('span.online-avail-msg').each(function(){
								});
								
							}
							
						});
						
						getTileStatusData(pidList);
					
				},
			gridStoreAvailability : function() {

						// grid tiles
						$('#search-result-items .store-stock').each(function(){
							
							// avoid dupes if called a few times on endless scroll
							if( !$(this).hasClass('processed') ) {
								
								$(this).addClass('processed');
								
								var pid = $(this).attr('id');
								
								if(app.user.storeId){
									$(this).find('.set-preferred-store a').text("Pier 1 To-Go");
									updateTile(pid);
								}
								else {
									$(this).find('.set-preferred-store a').text("Check Store Availability");
								}
								
								// update online availability
								$(this).siblings('.online-stock').find('span.online-avail-msg').each(function(){
									getOnlineAvailability(pid, $(this));
								});
								
							}
							
						});
						

					
				},
				getOnlineAvailabilityExt : function(pid, target,qvflag){
					
					$.getJSON(
						app.util.appendParamsToUrl(app.urls.getAvailability , {pid:pid}),
						{
							format: "json"
						},
						function(data){
							if(data) {
								var status = data.status.toLowerCase();
								if(status != 'in_stock'){
									var individualBtn = $("#"+pid);
									if(individualBtn){
										if(individualBtn.attr('data2') == 'false'){
											var add_all_to_cart = $(".add-all-to-cart");
											if(individualBtn.attr('data1')=='false'){
												individualBtn.attr('disabled','disabled');
												if(!qvflag){
													$("."+pid).attr('disabled','disabled');
												}
												if(add_all_to_cart){
													add_all_to_cart.attr('disabled','disabled');
													if(qvflag){
														$(".setTotalPriceqv").addClass("hide");
													}else{
														$(".setTotalPrice").addClass("hide");
													}
												}
											}
										}
									}
								}
								
								var status = formatStatus('online',data);

								target.html('<div id="as_'+pid+'" class="store-status">' + status + '</div>');
							}
							// no records
							else {
								
							}
						}
					)
					.success(function (){})		
					.error(function (){})
					.complete(function(){});	
				
				},
				updateCartMessaging : function(type,data) {
					
					return formatStatus(type,data);
					
				}
		};
	
}(window.app = window.app || {}, jQuery));




/**
 @class app.product
 */
(function (app, $) {
	var $cache;

	/*************** app.product private vars and functions ***************/
	function loadProductNavigation() {
		var pidInput = $cache.pdpForm.find("input[name='pid']").last();
		var navContainer = $("#product-nav-container");
		// if no hash exists, or no pid exists, or nav container does not exist, return
		if (window.location.hash.length <= 1 || pidInput.length===0 || navContainer.length===0) {
			return;
		}

		var pid = pidInput.val();
		var hashParams = window.location.hash.substr(1);
		if (hashParams.indexOf("pid="+pid) < 0) {
			hashParams+="&pid="+pid;
		}

		var url = app.urls.productNav+(app.urls.productNav.indexOf("?") < 0 ? "?" : "&")+hashParams;
		app.ajax.load({url:url, target: navContainer});
	}

	//creates product recommendation carousel using jQuery jcarousel plugin
	function loadRecommendations() {
		
		
		var carousel = $(".thumb-carousel");
		if(!carousel || carousel.length === 0 || carousel.children().length === 0) {
			return;
		}

		carousel.jcarousel(app.components.carouselSettings);
		
		
		$('.tooltip-recomendation').hover(
			function(){
				$('#recommendation-tease').remove();
				var teaseContent = $(this).addClass('active').find('.tooltip-content').html();
				$('.cross-sell')
					.after('<div id="recommendation-tease">' + teaseContent + '</div>');
			},
			function(){
				$(this).removeClass('active');
			}
		);
	}

	/**
	 @description Sets the main image attributes and the href for the surrounding <a> tag
	 @param {Object} atts Simple object with url, alt, title and hires properties
	 */
	function setMainImage(atts) {
		var imgZoom = $cache.pdpMain.find("a.main-image");
		if (imgZoom.length>0) {
			imgZoom.attr("href", atts.hires);
		}

		imgZoom.find("img.primary-image").attr({
			"src" : atts.url,
			"alt" : atts.alt,
			"title" : atts.title
		});
	}

	/**
	 @description helper function for swapping main image on swatch hover
	 @param {Element} element DOM element with custom data-lgimg attribute
	 */
	function swapImage(element) {
		var lgImg = $(element).data("lgimg");

		var newImg = $.extend({}, lgImg);
		var imgZoom = $cache.pdpMain.find("a.main-image");
		var mainImage = imgZoom.find("img.primary-image");
		// store current image info
		lgImg.hires = imgZoom.attr("href");
		lgImg.url = mainImage.attr("src");
		lgImg.alt = mainImage.attr("alt");
		lgImg.title = mainImage.attr("title");
		// reset element's lgimg data attribute
		$(element).data(lgImg);
		// set the main image
		setMainImage(newImg);
	}



	function loadZoom() {
		if(app.quickView.isActive() || !app.zoomViewerEnabled) { return; }

		//zoom properties
		var options = {
			zoomType: 'standard',
			alwaysOn : 0, // setting to 1 will load load high res images on page load
			zoomWidth : 405,
			zoomHeight : 465,
			position:'right',
			preloadImages: 0, // setting to 1 will load load high res images on page load
			xOffset: 95,
			yOffset: 0
		};
		
		$cache.pdpMain.find("a.main-image").removeData("jqzoom").jqzoom(options);
	}

	function replaceImages() {		
		var newImages = $("#update-images");
		var imageContainer = $cache.pdpMain.find("div.product-image-container");
		
		imageContainer.html(newImages.html());
		newImages.remove();
		setMainImageLink();
		
		loadZoom();
	}
	
	function setMainImageLink() {
		if (app.quickView.isActive() || app.isMobileUserAgent) {
			$cache.pdpMain.find("a.main-image").removeAttr("href");
		}
		else {
			$cache.pdpMain.find("a.main-image").addClass("image-zoom");
		}
	}
	

	function initializeDom() {
		$cache.pdpMain.find('div.product-detail .product-tabs').tabs();
		if($('#pwrwritediv').length > 0) {
			var options = $.extend(true, {}, app.dialog.settings, {
				autoOpen : true,
				height : 750,
				width : 650,
				dialogClass : 'writereview',
				title : 'Product Review',
				resizable : false
			});

			app.dialog.create({
				target : app.ui.reviewsContainer,
				options : options
			});
		}

		loadRecommendations($cache.container);
		loadProductNavigation();
		setMainImageLink();		

		if ($cache.productSetList.length>0) {
			var unavailable = $cache.productSetList.find("form").find("button.add-to-cart[disabled]");
			if (unavailable.length > 0) {
				$cache.addAllToCart.attr("disabled", "disabled");
				$cache.addToCart.attr("disabled", "disabled"); // this may be a bundle

			}
		}

	}

	function initializeCache() {
		$cache = {
			productId : $("#pid"),
			pdpMain : $("#pdpMain"),
			productContent : $("#product-content"),
			thumbnails : $("#thumbnails"),
			bonusProductGrid : $(".bonusproductgrid"),
			imageContainer : $(".product-primary-image"),
			productSetList : $("#product-set-list"),
			addToCart : $("#add-to-cart"),
			addAllToCart : $("#add-all-to-cart"),
			addAllToWishList : $(".wl-actionqv")
		};
		$cache.detailContent = $cache.pdpMain.find("div.detail-content");
		$cache.pdpForm = $cache.pdpMain.find("form.pdpForm");
		$cache.swatches = $cache.pdpMain.find("ul.swatches");
		$cache.mainImageAnchor = $cache.imageZoom = $cache.imageContainer.find("a.main-image");
		$cache.mainImage = $cache.mainImageAnchor.find("img.primary-image");
	}

	function initializeEvents() {
		
		var availabilityContainer = $cache.pdpMain.find("div.availability");
		
		app.product.initAddThis();
		
		// add or update shopping cart line item
		app.product.initAddToCart();
		
		// commented the code to disable the ajax call on PDP and quickview as per the Bug#196
		/*$cache.pdpMain.on("change", "form.pdpForm input[name='Quantity']", function (e) {
			app.product.getAvailability(
					$cache.productId.val(),
					$(this).val(),
					function (data) {
						if (!data || data.isAvailable) {
							$cache.addToCart.removeAttr("disabled");
							availabilityContainer.find(".availability-qty-available").hide();
							availabilityContainer.find(".availability-msg").show();
							return;
						}
						$cache.addToCart.attr("disabled", "disabled");
						availabilityContainer.find(".availability-msg").hide();
						var avQtyMsg = availabilityContainer.find(".availability-qty-available");
						if (avQtyMsg.length===0) {
							avQtyMsg = $("<span/>").addClass("availability-qty-available value Not-In-Stock").appendTo($('.online-stock'));
						}
						avQtyMsg.text(data.inStockMsg).show();
					}
				);

		});*/

		
		$cache.pdpMain.on("click", "a.wl-action", function (e) {
			// work around for bundle products. options dropdown not included within form.
			e.preventDefault();
			
			var data = app.util.getQueryStringParams($cache.pdpForm.serialize());
			if (data.cartAction) {
				delete data.cartAction;
			}
			var url = app.util.appendParamsToUrl(this.href, data);
			url = this.protocol + "//" + this.hostname + ((url.charAt(0)==="/") ? url : ("/"+url));
			window.location.href = url;
		});

		$cache.pdpMain.on("hover", "ul.Color a.swatchanchor", function () {
			swapImage(this);
		});
		// productthumbnail.onclick()
		$cache.pdpMain.on("click", "img.productthumbnail", function () {
			Omniture.Events.PDPCarouselImageClicked.occurred();
			var lgImg = $(this).data("lgimg");

			// switch indicator
			$cache.pdpMain.find("div.product-thumbnails li.selected").removeClass("selected");
			$(this).closest("li").addClass("selected");

			setMainImage(lgImg);
			setMainImageLink();
			// load zoom if not quick view
			loadZoom();
		});

		// dropdown variations
		$cache.pdpMain.on("change", ".product-options select", function (e) {
			var salesPrice = $cache.pdpMain.find("div.product-add-to-cart .price-sales");
			
			var selectedItem = $(this).children().filter(":selected").first();
			var combinedPrice = selectedItem.data("combined");
			salesPrice.text(combinedPrice);
		});

		// prevent default behavior of thumbnail link and add this Button
		$cache.pdpMain.on("click", ".thumbnail-link:not(.recomendation-thumbnail), .addthis_toolbox a", false);
		$cache.pdpMain.on("click", "li.unselectable a", false);
		
		$cache.pdpMain.on("change", ".variation-select", function(e){
			if ($(this).val().length===0) {return;}
			var qty = $cache.pdpForm.find("input[name='Quantity']").first().val(),
				productSet = $(this).closest('.subProduct'),
				params = {
					Quantity : isNaN(qty) ? "1" : qty,
					format : "ajax"
				};
			
			var target = (productSet.length > 0 && productSet.children.length > 0) ? productSet : $cache.productContent;
			var url = app.util.appendParamsToUrl($(this).val(), params);
			app.progress.show($cache.pdpMain);
			
			app.ajax.load({
				url: url,
				callback : function (data) {
					target.html(data);
					app.product.initAddThis();
					app.product.initAddToCart();
					$("update-images").remove();				
				}
			});
		});

		// swatch anchor onclick()
		$cache.pdpMain.on("click", "div.product-detail a[href].swatchanchor", function (e) {
			e.preventDefault();
			if ($(this).parent("li").hasClass("selected")) {
				return;
			}
			
			var isColor = $(this).closest("ul.swatches").hasClass("Color");
						
			var anchor = $(this),
				qty = $cache.pdpForm.find("input[name='Quantity']").first().val(),
				productSet = $(anchor).closest('.subProduct'),
				params = {
					Quantity : isNaN(qty) ? "1" : qty
				};
			
			var target = (productSet.length > 0 && productSet.children.length > 0) ? productSet : $cache.productContent;
			var url = app.util.appendParamsToUrl(this.href, params);
			app.progress.show($cache.pdpMain);		
			
			app.ajax.load({
				url: url,
				callback : function (data) {
					target.html(data);
					app.product.initAddThis();
					app.product.initAddToCart();
					if (isColor) {
						replaceImages();
					}					
				}
			});
		});

		$cache.productSetList.on("click", "div.product-set-item li a[href].swatchanchor", function (e) {
			e.preventDefault();
			// get the querystring from the anchor element
			var params = app.util.getQueryStringParams(this.search);
			var psItem = $(this).closest(".product-set-item");

			// set quantity to value from form
			var qty = psItem.find("form").find("input[name='Quantity']").first().val();
			params.Quantity = isNaN(qty) ? "1" : qty;

			var url = app.urls.getSetItem + "?" + $.param(params);

			// get container
			var ic = $(this).closest(".product-set-item");
			ic.load(url, function () {
				app.progress.hide();
				if ($cache.productSetList.find("button.add-to-cart[disabled]").length>0) {
					$cache.addAllToCart.attr("disabled","disabled");
					$cache.addToCart.attr("disabled","disabled"); // this may be a bundle
				}
				else {
					$cache.addAllToCart.removeAttr("disabled");
					$cache.addToCart.removeAttr("disabled"); // this may be a bundle
				}
				
				app.product.initAddToCart(ic);

			});
		});

		$cache.addAllToCart.on("click", function (e) {
			e.preventDefault();
			var psForms = $cache.productSetList.find("form").toArray(),
				miniCartHtml = "",
				tempurl = "";
				enteredQty = $("#setQuantity").val();
				if(enteredQty){
					if(enteredQty === '' || enteredQty.length === 0 || isNaN(enteredQty) || parseInt(enteredQty, 10) === 0) {
						$("#setQuantity").val("1");
						return;
					}
					if(enteredQty > 0){
						tempurl = app.urls.addProduct;
						tempurl = app.util.appendParamToURL(tempurl,'Quantity',enteredQty);
					}
				}else{
					tempurl = app.urls.addProduct;
				}
				addProductUrl = app.util.ajaxUrl(tempurl);

			// add items to cart
			function addItems() {
				var form = $(psForms.shift());
				var itemid = form.find("input[name='pid']").val();

				$.ajax({
					dataType : "html",
					url: addProductUrl,
					data: form.serialize()
				})
				.done(function (response) {
					// success
					miniCartHtml = response;
				})
				.fail(function (xhr, textStatus) {
					// failed
					var msg = app.resources.ADD_TO_CART_FAIL;
					$.validator.format(msg, itemid);
					if(textStatus === "parsererror") {
						msg+="\n"+app.resources.BAD_RESPONSE;
					} else {
						msg+="\n"+app.resources.SERVER_CONNECTION_ERROR;
					}
					window.alert(msg);
				})
				.always(function () {
					if (psForms.length > 0) {
						addItems();
					}
					else {
						app.quickView.close();
						app.minicart.show(miniCartHtml);
					}
				});
			}
			addItems();
			callFloodlight('1391379','2012n236','2012a454');
			return false;
		});
		$cache.addAllToWishList.on("click", function (e) {
			e.preventDefault();
			var enteredQty = $("#setQuantity").val();
			if(enteredQty === '' || enteredQty.length === 0 || isNaN(enteredQty) || parseInt(enteredQty, 10) === 0) {
				$("#setQuantity").val("1");
				return;
			}
			var tempurl = this.href;
			var finalUrl =  app.util.appendParamToURL(tempurl,'Quantity',enteredQty);
			callFloodlight('1391379','2012n236','2012a311');
			window.location = finalUrl;
		});
		app.sendToFriend.initializeDialog($cache.pdpMain, "a.send-to-friend");
		
		$cache.pdpMain.find("button.add-to-cart[disabled]").attr('title', $cache.pdpMain.find(".availability-msg").html() );
		
		$(".moreDetails").on("click", function (){
			$(".setIndividuals").toggleClass('hide');
			$(".moreDetails").toggleClass('hide');
		});
	}
	
	function setAddToCartHandler(e) {
		e.preventDefault();		
		var form = $(this).closest("form");
		var qty = form.find("input[name='Quantity']");
		var isSubItem = $(this).hasClass("sub-product-item");
		if(qty.val() === '' || qty.length === 0 || isNaN(qty.val()) || parseInt(qty.val(), 10) === 0) {
			qty.val("1");
			return;
		}

		var data = form.serialize();
		app.cart.update(data, function (response) {
			var uuid = form.find("input[name='uuid']");
			if (uuid.length > 0 && uuid.val().length > 0) {
				app.cart.refresh();
			}
			else {				
				if (!isSubItem) {
					app.quickView.close();
				}
				app.minicart.show(response);
			}
		});
		callFloodlight('1391379','2012n236','2012a454');
	}
	
	

	/*************** app.product public object ***************/
	app.product = {
		init : function () {
			initializeCache();
			initializeDom();
			initializeEvents();
			loadZoom();
			app.gallery.init();
		},
		get : function (options) {
			// loads a product into a given container div
			// params
			//		containerId - id of the container div, if empty then global app.containerId is used
			//		source - source string e.g. search, cart etc.
			//		label - label for the add to cart button, default is Add to Cart
			//		url - url to get the product
			//		id - id of the product to get, is optional only used when url is empty
			var target = options.target || app.quickView.init();
			var source = options.source || "";

			var productUrl = options.url || app.util.appendParamToURL(app.urls.getProductUrl, "pid", options.id);
			if(source.length > 0) {
				productUrl = app.util.appendParamToURL(productUrl, "source", source);
			}			

			// show small loading image
			//app.progress.show(app.ui.primary);
			app.ajax.load({
				target : target,
				url : productUrl,
				data : options.data || "",
				// replace with callback passed in by options
				callback : options.callback || app.product.init
			});
		},
		getAvailability : function (pid, quantity, callback) {
			app.ajax.getJson({
				url: app.util.appendParamsToUrl(app.urls.getAvailability, {pid:pid, Quantity:quantity}),
				callback: callback
			});
		},

		
		initAddThis : function () {
			var addThisToolbox = $(".addthis_toolbox");

			addThisToolbox
				.append('<a class="addthis_button_google_plusone" g:plusone:size="medium" g:plusone:count="false" g:plusone:callback="plusone_vote"></a>')
				.append('<a class="addthis_button_tweet" tw:count="none"></a>')
				.append('<a class="addthis_button_facebook_like" fb:like:layout="button_count"></a>')
				.append('<a class="addthis_button_pinterest_pinit" pi:pinit:layout="horizontal" pi:pinit:media="' + $('#pinit_image_url').val() + '"></a>');
			addthis.toolbox(".addthis_toolbox");
		},
		initAddToCart : function (target) {
		
			if (target) {
				target.on("click", ".add-to-cart", setAddToCartHandler);
			}
			else {
				
				$("#Quantity").keypress(function(event) {
					  if ( event.which == 13 && !$('.add-to-cart:disabled') ) {
						  event.preventDefault();
						  $(".add-to-cart").trigger('click');
					   }
					});
				
				$(".add-to-cart").on("click", setAddToCartHandler);
			}
		}
	};

}(window.app = window.app || {}, jQuery));



//app.gallery
(function (app, $) {
	
	var $cache = {};
	var thumbSpecs = "sw=80&sh=80";
	var primarySpecs = "sw=600&sh=600";
	
	function initializeCache() {		
		$cache = {
			pdpImageContainer : $('.product-image-container'),
			primaryImage : $('<div id="gallery-primary"/>'),
			thumbnails : $('<ul id="gallery-thumbs"/>'),
			gallery : $('<div id="gallery"/>')
		};
	}
	
	function initializeDom() {
		$('a.click-to-enlarge').click(function(e){
			e.preventDefault();
			buildGallery();
			$cache.gallery.dialog({
				modal: false,
				width: 'auto',
				dialogClass : 'gallery-dialog',
				position: ['left','top']
			});
		});
		
		$(".ui-widget-overlay").live("click", function () {
            $(".ui-dialog-titlebar-close", $(this).prev()).trigger('click');
        });
	}
	
	function buildGallery() {
		
		// clean out any previous data
		$cache.thumbnails.empty();
		$cache.primaryImage.empty();
		$cache.gallery.empty();
		
		var primaryImageUrl = $('.product-primary-image .primary-image').attr('src').split('?');
		
		// set big image
		$cache.primaryImage.append( '<img src="' + primaryImageUrl[0] + '" />');
		
		// gather thumbs
		$cache.pdpImageContainer.find('.product-thumbnails .thumbnail-link').slice(0,28).each(function(){
			var thumbImageUrl = $(this).find('img').attr('src').split('?');
			var thisClass = (thumbImageUrl[0] === primaryImageUrl[0]) ? "active" : "";
			$cache.thumbnails.append('<li class="'+thisClass+'"><img src="' + thumbImageUrl[0] + '?' + thumbSpecs + '"></li>');
		});
		
		// put it into the gallery container
		$cache.gallery
			.append($cache.primaryImage)
			.append($cache.thumbnails)
			.append('<span class="gallery-next">next</span>')
			.append('<span class="gallery-prev">prev</span>');
		
		$cache.gallery.find('span.gallery-next').click(function(){
			$cache.thumbnails.find('.active').next('li').children('img').trigger('click');
		});
		
		$cache.gallery.find('span.gallery-prev').click(function(){
			$cache.thumbnails.find('.active').prev('li').children('img').trigger('click');
		});
		
		$cache.thumbnails.find('img').click(function(){
			$cache.primaryImage.find('img').attr('src',$(this).attr('src').split('?')[0]);
			$(this).parent().addClass('active').siblings().removeClass('active');
		});
	}
		
	app.gallery = {
		init : function () {
			initializeCache()
			initializeDom();
		}
	};

}(window.app = window.app || {}, jQuery));


// app.product.tile
(function (app, $) {
	var $cache = {};

	function initializeDom() {
		var tiles = $cache.container.find(".product-tile");
		if (tiles.length===0) { return; }
		tiles.each(function (idx) {
			$(this).data("idx",idx).hover(
					function(){
						$(this).parent().addClass('active').siblings().removeClass('active');
						$(this).click(function(){
							window.location = $(this).find('span.tile-more-link a').attr('href');
							return false;
						});
					},
					function(){
						$(this).parent().removeClass('active');
					});
		});
	}

	function initializeEvents() {
		
		if(app.resources.SHOW_QUICKVIEW){
			app.quickView.initializeButton($cache.container, ".product-image");
		}
		$cache.container.on("click", ".swatch-list a.swatch", function (e) {
			e.preventDefault();
			if ($(this).hasClass("selected")) { return; }
			
			var tile = $(this).closest(".grid-tile");
			$(this).closest(".swatch-list").find(".swatch.selected").removeClass("selected");
			$(this).addClass("selected");
			tile.find("a.thumb-link").attr("href", $(this).attr("href"));
			tile.find("a.name-link").attr("href", $(this).attr("href"));
		}).on("hover", ".swatch-list a.swatch", function (e) {
			if ($(this).hasClass("selected")) { return; }
			
			// get current thumb details
			var tile = $(this).closest(".grid-tile");
			var thumb = tile.find(".product-image a.thumb-link img").filter(":first");
			var swatchImg = $(this).children("img").filter(":first");			
			var data = swatchImg.data("thumb");			
			
			var currentAtts = {
				src : thumb.attr("src"),
				alt : thumb.attr("alt"),
				title : thumb.attr("title")
			}
			
			thumb.attr({
				src : data.src,
				alt : data.alt,
				title : data.title
			});
			
			swatchImg.data("thumb", currentAtts);			
		});		
	}
	

	/*************** app.product.tile public object ***************/
	app.product.tile = {
		init : function () {
			$cache = {
				container : $(".tiles-container")
			};
			initializeEvents();
			initializeDom();
		}
	};

}(window.app = window.app || {}, jQuery));

// app.product.compare
(function (app, $) {
	var $cache = {},
		_currentCategory = "",
		_isClearing = false,
		MAX_ACTIVE = 6,
		CI_PREFIX = "ci-";

	/************** private ****************/
	function refreshContainer() {
		if (_isClearing) { return; }
		
		var ac = $cache.compareContainer.find(".active").length;

		if (ac < 2) {
			$cache.compareButton.attr("disabled", "disabled");
		}
		else {
			$cache.compareButton.removeAttr("disabled");
		}
		
		// update list with sequential classes for ui targeting
		var compareItems = $cache.compareContainer.find('.compare-item');
		for( i=0; i < compareItems.length; i++ ){
			compareItems.removeClass('compare-item-' + i);
			$(compareItems[i]).addClass('compare-item-' + i);
		}
		
		$cache.compareContainer.toggle(ac > 0);
		
	}

	function addToList(data) {
		// get the first compare-item not currently active
		var item = $cache.compareContainer.find(".compare-item").not(".active").first();
		if (item.length===0) { return; } // safety only

		// if already added somehow, return
		if ($("#"+CI_PREFIX+data.uuid).length > 0) {
			return;
		}
		// set as active item
		item.addClass("active")
			.attr("id", CI_PREFIX+data.uuid)
			.data("itemid", data.itemid);

		// replace the item image
		var itemImg = item.children("img.compareproduct").first();
		itemImg.attr({src : $(data.img).attr("src"), alt : $(data.img).attr("alt")});

		// refresh container state
		refreshContainer();

		var tile = $("#"+data.uuid);
		if (tile.length===0) { return; }

		// ensure that the associated checkbox is checked
		tile.find(".compare-check")[0].checked = true;
	}

	function removeFromList(uuid) {
		var item = $("#"+CI_PREFIX+uuid);
		if (item.length===0) { return; }

		// replace the item image
		var itemImg = item.children("img.compareproduct").first();
		itemImg.attr({src : app.urls.compareEmptyImage, alt : app.resources.EMPTY_IMG_ALT});

		// remove class, data and id from item
		item.removeClass("active")
			.removeAttr("id")
			.removeAttr("data-itemid")
			.data("itemid", "");

		// use clone to prevent image flash when removing item from list
		var cloneItem = item.clone();
		item.remove();
		cloneItem.appendTo($cache.comparePanel);
		refreshContainer();
		// ensure that the associated checkbox is not checked
		var tile = $("#"+uuid);
		if (tile.length === 0 ) { return; }

		tile.find(".compare-check")[0].checked = false;
	}

	function initializeCache() {
		$cache = {
			primaryContent : $("#primary"),
			compareContainer : $("#compare-items"),
			compareButton : $("#compare-items-button"),
			clearButton : $("#clear-compared-items"),
			comparePanel : $("#compare-items-panel")
		};
	}

	function initializeDom() {
		_currentCategory = $cache.compareContainer.data("category") || "";
		var active = $cache.compareContainer.find(".compare-item").filter(".active");
		active.each(function () {
			var uuid = this.id.substr(CI_PREFIX.length);
			var tile = $("#"+uuid);
			if (tile.length === 0 ) { return; }

			tile.find(".compare-check")[0].checked = true;
		});
		// set container state
		refreshContainer();
	}

	function initializeEvents() {
		// add event to buttons to remove products
		$cache.primaryContent.on("click", ".compare-item-remove", function (e, async) {
			var item = $(this).closest(".compare-item");
			var uuid = item[0].id.substr(CI_PREFIX.length);
			var tile = $("#"+uuid);
			var args = {
				itemid : item.data("itemid"),
				uuid : uuid,
				cb :  tile.length===0 ? null : tile.find(".compare-check"),
				async : async
			};
			app.product.compare.removeProduct(args);
			refreshContainer();
		});

		// Button to go to compare page
		$cache.primaryContent.on("click", "#compare-items-button", function () {
			window.location.href = app.util.appendParamToURL(app.urls.compareShow, "category", _currentCategory);
		});

		// Button to clear all compared items
		$cache.primaryContent.on("click", "#clear-compared-items", function () {
			_isClearing = true;
			$cache.compareContainer.hide()
								   .find(".active .compare-item-remove")
								   .trigger("click", [false]);
			_isClearing = false;

		});
	}

	/*************** app.product.compare public object ***************/
	app.product.compare = {
		init : function () {
			initializeCache();
			initializeDom();
			initializeEvents();
		},
		initCache : initializeCache,
		addProduct : function (args) {
			var items = $cache.compareContainer.find(".compare-item");
			var cb = $(args.cb);
			var ac = items.filter(".active").length;
			if(ac===MAX_ACTIVE) {
				if(!window.confirm(app.resources.COMPARE_CONFIRMATION)) {
					cb[0].checked = false;
					return;
				}

				// remove product using id
				var item = items.first();

				// safety check only. should never occur.
				if (item[0].id.indexOf(CI_PREFIX)!==0) {
					cb[0].checked = false;
					window.alert(app.resources.COMPARE_ADD_FAIL);
					return;
				}
				var uuid = item[0].id.substr(CI_PREFIX.length);
				app.product.compare.removeProduct({
					itemid: item.data("itemid"),
					uuid: uuid,
					cb: $("#"+uuid).find(".compare-check")
				});
			}

			app.ajax.getJson({
				url : app.urls.compareAdd,
				data : { 'pid' : args.itemid, 'category' : _currentCategory },
				callback : function (response) {
					if (!response || !response.success) {
						// response failed. uncheck the checkbox return
						cb.checked = false;
						window.alert(app.resources.COMPARE_ADD_FAIL);
						return;
					}

					// item successfully stored in session, now add to list...
					addToList(args);
				}
			});
		},

		removeProduct : function (args) {
			if (!args.itemid) { return; }
			var cb = args.cb ? $(args.cb) : null;
			app.ajax.getJson({
				url : app.urls.compareRemove,
				data : { 'pid' : args.itemid, 'category' : _currentCategory },
				async: args.async,
				callback : function (response) {
					if (!response || !response.success) {
						// response failed. uncheck the checkbox return
						if (cb && cb.length > 0) { cb[0].checked = true; }
						window.alert(app.resources.COMPARE_REMOVE_FAIL);
						return;
					}

					// item successfully removed session, now remove from to list...
					removeFromList(args.uuid);
				}
			});
		}
	};

}(window.app = window.app || {}, jQuery));

// app.compare
(function (app, $) {
	var $cache = {};

	function initializeCache() {
		$cache = {
			compareTable : $("#compare-table"),
			categoryList : $("#compare-category-list")
		};
	}

	function initializeDom() {
		app.product.tile.init();
	}

	function initializeEvents() {
		$cache.compareTable.on("click", ".remove-link", function (e) {
			e.preventDefault();
			app.ajax.getJson({
				url : this.href,
				callback : function (response) {
					app.page.refresh();
				}
			});
		})
		.on("click", ".open-quick-view", function (e) {
			e.preventDefault();
			var form = $(this).closest("form");
			app.quickView.show({
				url:form.attr("action"),
				source:"quickview",
				data:form.serialize()
			});
		});

		$cache.categoryList.on("change", function () {
			$(this).closest("form").submit();
		});
	}

	/*************** app.compare public object ***************/
	app.compare = {
		init : function () {
			initializeCache();
			initializeDom();
			initializeEvents();
			app.product.initAddToCart();
		}
	};


}(window.app = window.app || {}, jQuery));

// send to friend
(function (app, $) {
	var $cache = {},
		initialized=false;
	function initializeEvents() {
		app.util.limitCharacters();		
		if (initialized) {return; }			
		$cache.dialog.on("click", ".preview-button, .send-button, .edit-button", function (e) {
			e.preventDefault();
			//$cache.form.validate();
			if (!$cache.form.valid()) {
				return false;
			}
			var requestType = $cache.form.find("#request-type");
			if (requestType.length>0) {
				requestType.remove();
			}
			$("<input/>").attr({id:"request-type", type:"hidden", name:$(this).attr("name"), value:$(this).attr("value")}).appendTo($cache.form);
			var data = $cache.form.serialize();
			app.ajax.load({url:$cache.form.attr("action"),
				   data: data,
				   target: $cache.dialog,
				   callback: function() {
						app.validator.init();
						app.util.limitCharacters();
						$cache.form = $("#send-to-friend-form");
						$(".ui-dialog-content").dialog("option", "position", "center");													
				   }
			});
		})
		.on("click", ".cancel-button, .close-button", function (e) {
			e.preventDefault();
			$cache.dialog.dialog("close");
		});
		initialized=true;
	}

	/*************** app.sendToFriend public object ***************/
	app.sendToFriend = {
		init : function () {
			$cache = {
				form: $("#send-to-friend-form"),
				dialog: $("#send-to-friend-dialog")
			};			
			initializeEvents();
		},
		initializeDialog : function (eventDelegate, eventTarget) {
			$(eventDelegate).on("click", eventTarget, function (e) {
				e.preventDefault();
				var dlg = app.dialog.create({target:$("#send-to-friend-dialog"), options:{
					width:'auto',
					height:'auto',
					title:this.title,
					open:function() {
						app.sendToFriend.init();
						app.validator.init();
						$(".ui-icon-closethick").remove();
					}
				}});

				app.ajax.load({
					url:app.util.ajaxUrl(this.href),
					target:dlg,
					callback: function () {
						dlg.dialog("open");	 // open after load to ensure dialog is centered
						
					}
				});
			});
		}
	};

}(window.app = window.app || {}, jQuery));


// app.search
(function (app, $) {
	var $cache = {};

	/**
	 *  replaces breadcrumbs, lefthand nav and product listing with ajax and puts a loading indicator over the product listing
	 */
	function updateProductListing(isHashChange, url) {
		
		var hash = window.location.hash;

		if(hash==='#results-content' || hash==='#results-products') { return; }

		var refineUrl = null;
		if (hash.length > 0) {
	        refineUrl = (url || window.location.pathname)+"?"+hash.substr(1);
		}
		else if (isHashChange) {
			refineUrl = url || window.location.href;
		}

		if (!refineUrl) { return; }
		
		if(refineUrl.search('showAll') > 0 ){
			app.util.scrollBrowser(0);
			endlessScroll(app.util.getUri(refineUrl));
			return;
		}
		
		app.util.scrollBrowser(0);
		app.progress.show($('#primary'));

		// standard listing refresh
		$cache.main.load(app.util.appendParamToURL(refineUrl, "format", "ajax"), function () {
			app.product.compare.init();
			app.product.tile.init();
			app.progress.hide();
			clearBooleanRefinements();
			app.util.initToggleElements();
			app.storeTools.updateGridItems();
		});


	}
	
	function endlessScroll (uri) {

		// set defaults
		var resultTotalResults = 0;
		var resultBlockStart = 0;
		var resultBlockItems = 30;
		var resultBlockUrl = window.location.pathname + "?";
		
		// get current request data via hash
		hashValues = app.util.getQueryStringParams(uri.query);
		
		// remove any pre-set starting point and size of list
		for(key in hashValues) {
			if( key !== 'start' && key !== 'sz'){
				resultBlockUrl = resultBlockUrl + [key] + '=' + hashValues[key] + '&';
			}
			if( key === 'showAll') {
				resultTotalResults = parseInt(hashValues[key]);
			}
		}

		resultBlockUrl = resultBlockUrl + 'format=ajax&';
		
		// clear any previous results
		$('#search-result-items').empty();
		
		// add first result set
		appendProductListing (resultBlockUrl, resultBlockStart, resultBlockItems, resultTotalResults);
		
		// add listener to keep adding records if the browser is scrolled near bottom
		$(window).smartScrollListener(function() {

			if  ( ($(window).scrollTop() + 2500 >= ( $(document).height() - ( $(window).height() ) ) ) && (window.location.hash.indexOf( "showAll" ) !== -1) ){
				
				// update numbers to get next set of records
				resultBlockStart = resultBlockStart + resultBlockItems;
				
				// if we are not trying to start higher than the total amount
				if(resultBlockStart <= resultTotalResults ){
					// call the append results function
					appendProductListing(resultBlockUrl, resultBlockStart, resultBlockItems, resultTotalResults);
				}
				else {
					
				}
				
			}			
		});
	}
	
	function appendProductListing (resultBlockUrl, resultBlockStart, resultBlockItems, resultTotalResults) {

		if ( $("#scroll-loading").length === 0){
			
			$('#search-result-items').after('<div id="scroll-loading"/>');
			
			// build the url for this recordset
			resultBlockUrl = resultBlockUrl + 'start=' + resultBlockStart + '&sz=' + resultBlockItems;
			
			var newListings = $('<div style="display:none;"/>').empty();
			
			newListings.load(
				resultBlockUrl + ' #search-result-items li.grid-tile', 
				function (data) {
					newListings.find('li.grid-tile').hide().appendTo($('#search-result-items')).fadeIn('slow');
					app.product.tile.init();
					app.storeTools.updateGridItems();
					$('#scroll-loading').remove();
				});
			
		}

	}
	
	function clearBooleanRefinements() {
		if($cache.main.find('a.refinement-true-false-active').size()){
			if($('#see_everything_in_category_link').size() == 1){
				var href = $('#see_everything_in_category_link').val();
				$('.refinement-true-false:first').before('<span class="refinement-true-false-clear" data-reset="' + href + '">See Everything in Category</span>');
				$('.refinement-true-false-clear').click(function(){
						window.location = $(this).data('reset');
					});
			}
		}
	}
	
	function initializeEvents() {

		// compare checked
		$cache.main.on("click", "input[type='checkbox'].compare-check", function (e) {
			var cb = $(this);
			var tile = cb.closest(".product-tile");

			var func = this.checked ? app.product.compare.addProduct : app.product.compare.removeProduct;
			var itemImg = tile.find("div.product-image a img").first();
			func({
				itemid : tile.data("itemid"),
				uuid : tile[0].id,
				img : itemImg
			});

		});

		// handle events for updating grid
		$cache.main.on("click", ".refinements a, .pagination a, .breadcrumb-refinement-value a", function (e) {                
		      if($(this).parent().hasClass("unselectable")) { return false; }
		      
		      var uri = app.util.getUri(this);
		      
		      if($(this).hasClass('clear-attributes')){
		    	  return true;
		      }

		      if($(this).hasClass('folder-content')){
		    	  return true;
		      }
		      
		      if($(this).hasClass('no-ajax')){
		    	  return true;
		      }
		      
		      if (uri.path.toLowerCase()!==window.location.pathname.toLowerCase() && window.location.pathname.indexOf('Search-Show') == -1) {
		            return true;
		      }     
		      
		      if (uri.query.length > 1) {
		            window.location.hash = uri.query.substr(1);
		      }
		      else {
		            updateProductListing(true, this.href);
		      }
		      
		      return false;
		});


		// handle events item click. append params.
		$cache.main.on("click", ".product-tile a:not('#quickviewbutton')", function (e) {
			var a = $(this);
			// get current page refinement values
			var wl = window.location;

			var qsParams = (wl.search.length > 1) ? app.util.getQueryStringParams(wl.search.substr(1)) : {};
			var hashParams = (wl.hash.length > 1) ? app.util.getQueryStringParams(wl.hash.substr(1)) : {};

			// merge hash params with querystring params
			var params = $.extend(hashParams, qsParams);
			if (!params.start) {
				params.start = 0;
			}
			// get the index of the selected item and save as start parameter
			var tile = a.closest(".product-tile");
			var idx = tile.data("idx") ? +tile.data("idx") : 0;

			// convert params.start to integer and add index
			params.start=(+params.start)+(idx+1);
			// set the hash and allow normal action to continue
			a[0].hash = $.param(params);
		});

		// handle events item click. append params.
		$cache.main.on("click", "#mobile-refinements", function (e) {
			$(this).toggleClass('active');
			$('#secondary').toggleClass('active');
		});
		
		// handle sorting change
		$cache.main.on("change", ".sort-by select", function (e) {
			var refineUrl = $(this).find('option:selected').val();
			var uri = app.util.getUri(refineUrl);
			window.location.hash = uri.query.substr(1);
			return false;
		})
		.on("change", ".items-per-page select", function (e) {
			var refineUrl = $(this).find('option:selected').val();
			var uri = app.util.getUri(refineUrl);
			window.location.hash = uri.query.substr(1);
			return false;
		});
	
		clearBooleanRefinements();
		
		
		// handle hash change
		if (app.page.type!=="content-results") {
		   // handle hash change
		   $(window).hashchange(function () {
		    updateProductListing(true, null);
		   });
		}
		
		app.storeTools.updateGridItems();

	}

	app.search = {
		init : function () {
			$cache = {
				main : $("#main"),
				items : $("#search-result-items")
			};
			$cache.content = $cache.main.find(".search-result-content");
			//if (app.product.compare) {
				app.product.compare.init();
			//}
			updateProductListing(false, false);
			app.product.tile.init();
			initializeEvents();
		}
	};

}(window.app = window.app || {}, jQuery));

// app.bonusProductsView
(function (app, $) {
	var $cache = {};
	var selectedList = [];
	var maxItems = 1;
	var bliUUID = "";

	function getBonusProducts() {
		var o = {};
		o.bonusproducts = [];

		var i, len;
		for (i=0, len=selectedList.length;i<len;i++) {
			var p = { pid : selectedList[i].pid,	qty : selectedList[i].qty, options : {} };
			var a, alen, bp=selectedList[i];
			for (a=0,alen=bp.options.length;a<alen;a++) {
				var opt = bp.options[a];
				p.options = {optionName:opt.name,optionValue:opt.value};
			}
			o.bonusproducts.push({product:p});
		}
		return o;
	}

	function updateSummary() {
		if (selectedList.length===0) {
			$cache.bonusProductList.find("li.selected-bonus-item").remove();
		}
		else {
			var ulList = $cache.bonusProductList.find("ul.selected-bonus-items").first();
			var itemTemplate = ulList.children(".selected-item-template").first();
			var i, len;
			for (i=0, len=selectedList.length;i<len;i++) {
				var item = selectedList[i];
				var li = itemTemplate.clone().removeClass("selected-item-template").addClass("selected-bonus-item");
				li.data("uuid", item.uuid).data("pid", item.pid); 
				li.find(".item-name").html(item.name);
				li.find(".item-qty").html(item.qty);
				var ulAtts = li.find(".item-attributes");
				var attTemplate = ulAtts.children().first().clone();
				ulAtts.empty();
				var att;
				for (att in item.attributes) {
					var attLi = attTemplate.clone();
					attLi.addClass(att);
					attLi.children(".display-name").html(item.attributes[att].displayName);
					attLi.children(".display-value").html(item.attributes[att].displayValue);
					attLi.appendTo(ulAtts);
				}
				li.appendTo(ulList);
			}
			ulList.children(".selected-bonus-item").show();
		}
		
		// get remaining item count
		var remain = maxItems - selectedList.length;
		$cache.bonusProductList.find(".bonus-items-available").text(remain);
		if (remain <= 0) {
			$cache.bonusProductList.find("button.button-select-bonus").attr("disabled", "disabled");
		}
		else {
			$cache.bonusProductList.find("button.button-select-bonus").removeAttr("disabled");
		}
	}
	/********* public app.bonusProductsView object *********/
	app.bonusProductsView = {
		init : function () {
			$cache = {
				bonusProduct : $("#bonus-product-dialog"),
				resultArea : $("#product-result-area")
			};
		},
		show : function (url) {
			// add element to cache if it does not already exist
			if(!$cache.bonusProduct) {
				app.bonusProductsView.init();
			}

			// create the dialog
			$cache.bonusProduct = app.dialog.create({
				target : $cache.bonusProduct,
				options : {
					width: 745,
					dialogClass : 'quickview',
					title : app.resources.BONUS_PRODUCTS
				}
			});

			// load the products then show
			app.ajax.load({
				target : $cache.bonusProduct,
				url : url,
				callback : function () {
					$cache.bonusProduct.dialog('open');
					app.bonusProductsView.initializeGrid();
				}
			});

		},
		// close the quick view dialog
		close : function () {
			$cache.bonusProduct.dialog('close');
		},
		loadBonusOption : function () {
			$cache.bonusDiscountContainer = $(".bonus-discount-container");
			if ($cache.bonusDiscountContainer.length===0) { return; }

			app.dialog.create({
				target : $cache.bonusDiscountContainer,
				options : {
					height : 'auto',
					width : 350,
					dialogClass : 'quickview',
					title : app.resources.BONUS_PRODUCT
				}
			});
			$cache.bonusDiscountContainer.dialog('open');

			// add event handlers
			$cache.bonusDiscountContainer.on("click", ".select-bonus-btn", function (e) {
				e.preventDefault();
				var uuid = $cache.bonusDiscountContainer.data("lineitemid");
				var url = app.util.appendParamsToUrl(app.urls.getBonusProducts,
													 {
														bonusDiscountLineItemUUID : uuid,
														source : "bonus"
													 });

				$cache.bonusDiscountContainer.dialog('close');
				app.bonusProductsView.show(url);
			}).on("click", ".no-bonus-btn", function (e) {
				$cache.bonusDiscountContainer.dialog('close');
			});
		},
		initializeGrid : function () {
			$cache.bonusProductList = $("#bonus-product-list"),
				bliData = $cache.bonusProductList.data("line-item-detail");

			maxItems = bliData.maxItems;
			bliUUID = bliData.uuid;
			
			if (bliData.itemCount>=maxItems) {
				$cache.bonusProductList.find("button.button-select-bonus").attr("disabled", "disabled");
			}
			
			var cartItems = $cache.bonusProductList.find(".selected-bonus-item");
			
			cartItems.each(function() {
				var ci = $(this);
				
				var product = {
					uuid : ci.data("uuid"),
					pid : ci.data("pid"),
					qty : ci.find(".item-qty").text(),
					name : ci.find(".item-name").html(),
					attributes: {}
				};
				var attributes = ci.find("ul.item-attributes li");
				attributes.each(function(){
					var li = $(this);
					product.attributes[li.data("attributeId")] = {
						displayName:li.children(".display-name").html(),
						displayValue:li.children(".display-value").html()
					};
				});
				selectedList.push(product);
			});

	
			$cache.bonusProductList.on("click", "div.bonus-product-item a[href].swatchanchor", function (e) {
				e.preventDefault();

				var anchor = $(this),
					bpItem = anchor.closest(".bonus-product-item"),
					bpForm = bpItem.find("form.bonus-product-form"),
					qty = bpForm.find("input[name='Quantity']").first().val(),
					params = {
						Quantity : isNaN(qty) ? "1" : qty,
						format : "ajax",
						source : "bonus",
						bonusDiscountLineItemUUID : bliUUID
					};

				var url = app.util.appendParamsToUrl(this.href, params);

				app.progress.show(bpItem);
				app.ajax.load({
					url: url,
					callback : function (data) {
						bpItem.html(data);
					}
				});
			})
			.on("click", "button.button-select-bonus", function (e) {
				e.preventDefault();
				if (selectedList.length>=maxItems) {
					$cache.bonusProductList.find("button.button-select-bonus").attr("disabled", "disabled");
					$cache.bonusProductList.find("bonus-items-available").text("0");
					return;
				}

				var form = $(this).closest("form.bonus-product-form"),
					detail = $(this).closest(".product-detail");
					uuid = form.find("input[name='productUUID']").val(),
					qtyVal = form.find("input[name='Quantity']").val(),
					qty = isNaN(qtyVal) ? 1 : (+qtyVal);

				var product = {
					uuid : uuid,
					pid : form.find("input[name='pid']").val(),
					qty : qty,
					name : detail.find(".product-name").text(),
					attributes : detail.find(".product-variations").data("current"),
					options : []
				};

				var optionSelects = form.find("select.product-option");

				optionSelects.each(function (idx) {
					product.options.push({
						name : this.name,
						value : $(this).val(),
						display : $(this).children(":selected").first().html()
					});
				});
				selectedList.push(product);
				updateSummary();
			})
			.on("click", ".remove-link", function(e){
				e.preventDefault();
				var container = $(this).closest("li.selected-bonus-item");
				if (!container.data("uuid")) { return; }
				
				var uuid = container.data("uuid");
				var i, len = selectedList.length;
				for(i=0;i<len;i++) {
					if (selectedList[i].uuid===uuid) {
						selectedList.splice(i,1);
						break;
					}
				}
				updateSummary();
			})
			.on("click", ".add-to-cart-bonus", function (e) {
				e.preventDefault();
				var url = app.util.appendParamsToUrl(app.urls.addBonusProduct, {bonusDiscountLineItemUUID:bliUUID});
				var bonusProducts = getBonusProducts();
				// make the server call
				$.ajax({
					type : "POST",
					dataType : "json",
					cache	: false,
					contentType : "application/json",
					url : url,
					data : JSON.stringify(bonusProducts)
				})
				.done(function (response) {
					// success
					app.page.refresh();
				})
				.fail(function (xhr, textStatus) {
					// failed
					if(textStatus === "parsererror") {
						window.alert(app.resources.BAD_RESPONSE);
					} else {
						window.alert(app.resources.SERVER_CONNECTION_ERROR);
					}
				})
				.always(function () {
					$cache.bonusProduct.dialog("close");
				});
			});
		}
	};

}(window.app = window.app || {}, jQuery));

// app.giftcard
(function (app, $) {
	
	app.giftcard = {
		checkBalance : function (id, callback) {
			// load gift certificate details
			var url = app.util.appendParamToURL(app.urls.giftCardCheckBalance, "giftCertificateID", id);

			app.ajax.getJson({
				url: url,
				callback: callback
			});
		}
	};
}(window.app = window.app || {}, jQuery));

// app.checkout
(function (app, $) {
	var $cache = {},
		isShipping = false,
		isMultiShipping = false,
		isBilling = false,
		shippingMethods = null;

	/**
	 * Helper method which constructs a URL for an AJAX request using the
	 * entered address information as URL request parameters.
	 */
	function getShippingMethodURL(url) {
		var newUrl = app.util.appendParamsToUrl(url, 
												{
													countryCode:$cache.countryCode.val(),
												 	stateCode:$cache.stateCode.val(),
												 	postalCode:$cache.postalCode.val(),
												 	city:$cache.city.val()
												 },
												 true);
		return newUrl;
	}

	//updates the order summary based on a possibly recalculated
	//basket after a shipping promotion has been applied
	function updateSummary() {
		var url = app.urls.summaryRefreshURL;
		var summary = $("#secondary .summary");
		// indicate progress
		app.progress.show(summary);

		// load the updated summary area
		summary.load( url, function () {
			// hide edit shipping method link
			summary.fadeIn("fast");
			summary.find('.checkout-mini-cart .minishipment .header a').hide();
			summary.find('.order-totals-table .order-shipping .label a').hide();
		});
		
		// disable continue if no shipping methods
		if( $('.no-shipping-methods').length  > 0 ){
			
			$('#continueOnShipping').attr('disabled','disabled');
		}
		else {
			$('#continueOnShipping').removeAttr('disabled');
		}
		
	}

	//selects a shipping method for the default shipment
	//and updates the summary section on the right hand side
	function selectShippingMethod(shippingMethodID) {
		// nothing entered
		if(!shippingMethodID) {
			return;
		}
		// attempt to set shipping method
		var url = app.util.appendParamsToUrl(app.urls.selectShippingMethodsList,
											 { countryCode:$cache.countryCode.val(),
											   stateCode:$cache.stateCode.val(),
											   postalCode:$cache.postalCode.val(),
											   city:$cache.city.val(),
											   shippingMethodID:shippingMethodID
											 },
											 true);

		 app.ajax.getJson({
			url: url,
			callback: function (data) {
				updateSummary();
				if(!data || !data.shippingMethodID) {
					window.alert("Couldn't select shipping method.");
					return false;
				}
				// display promotion in UI and update the summary section,
				// if some promotions were applied
				$(".shippingpromotions").empty();
				if(data.shippingPriceAdjustments && data.shippingPriceAdjustments.length > 0) {
					var i,len=data.shippingPriceAdjustments.length;
					for(i=0; i<len; i++) {
						var spa = data.shippingPriceAdjustments[i];
					}
				}
			}
		});
	}

	/**
	 * Make an AJAX request to the server to retrieve the list of applicable shipping methods
	 * based on the merchandise in the cart and the currently entered shipping address
	 * (the address may be only partially entered).  If the list of applicable shipping methods
	 * has changed because new address information has been entered, then issue another AJAX
	 * request which updates the currently selected shipping method (if needed) and also updates
	 * the UI.
	 */
	function updateShippingMethodList() {
		if ($cache.shippingMethodList.length === 0) { return; }
		var url = getShippingMethodURL(app.urls.shippingMethodsJSON);

		 app.ajax.getJson({
			url: url,
			callback: function (data) {
				if(!data) {
					window.alert("Couldn't get list of applicable shipping methods.");
					return false;
				}
				if (shippingMethods && shippingMethods.toString() === data.toString())
				{
					// No need to update the UI.  The list has not changed.
					return true;
				}

				// We need to update the UI.  The list has changed.
				// Cache the array of returned shipping methods.
				shippingMethods = data;

				var smlUrl = getShippingMethodURL(app.urls.shippingMethodsList);

				// indicate progress
				app.progress.show($cache.shippingMethodList);

				// load the shipping method form
				$cache.shippingMethodList.load( smlUrl, function () {
					$cache.shippingMethodList.fadeIn("fast");
					// rebind the radio buttons onclick function to a handler.
					$cache.shippingMethodList.find("[name$='_shippingMethodID']").click(function () {
						selectShippingMethod($(this).val());
					});

					// update the summary
					updateSummary();
					app.progress.hide();
					app.tooltips.init();
					
				});

			}
		});
	}

	//shipping page logic
	//checkout gift message counter
	function initGiftMessageBox() {
		// show gift message box, if shipment is gift
		$cache.giftMessage.each(function(){
			$(this).toggle($(this).prev().find("#is-gift-yes")[0].checked);
		});
	}

	function shippingLoad() {
		
		$cache.checkoutForm.on("click", "#is-gift-yes, #is-gift-no", function (e) {
			if( $(this).attr('id') == 'is-gift-yes' ) {
				$(this).parent().next(".gift-message-text").show();
			}
			else {
				$(this).parent().next(".gift-message-text").hide();
			}
			
			//$cache.checkoutForm.find(".gift-message-text").toggle($cache.checkoutForm.find("#is-gift-yes")[0].checked);
		})
		.on("change",
			"input[name$='_addressFields_city'], input[name$='_addressFields_zip']",
			updateShippingMethodList
		);
		$("#dwfrm_singleshipping_shippingAddress_addressFields_states_state").on("change",function(){
			updateShippingMethodList();
		});

		// gift message character limitation
		if(!isMultiShipping){
			initGiftMessageBox();
			return null;
		}
	}	

	function addressLoad() {
		var billingForm = $(".checkout-billing");
		isBilling = $(".checkout-billing").length > 0;
		// select address from list
		$cache.addressList.on("change", function () {
			
			//manually clear form before repopulating it (based on bug}
			$('.clear-on-change input[type="text"]').val('');
			
			var selected = $(this).children(":selected").first();
			var data = $(selected).data("address");
			if (!data) { return; }
			var p;
			for (p in data) {

				if ($cache[p] && data[p]) {
					$cache[p].val(data[p].replace("^","'"));
					// special handling for countrycode => stateCode combo
					if ($cache[p]===$cache.countryCode) {
						app.util.updateStateOptions($cache[p]);
						$cache.stateCode.val(data.stateCode);
						$cache.stateCode.trigger("change");
					}
					else {
						if(!isBilling){
							updateShippingMethodList();
						}
					}
				}
				
			}

			// re-validate the form
			$cache.checkoutForm.validate().form();
			selectedState = $("#dwfrm_singleshipping_shippingAddress_addressFields_states_state").val();
			selectedCountry = $("#dwfrm_singleshipping_shippingAddress_addressFields_country").val();
			if(isBilling){
				if(billingForm.valid()){
					$("#continueOnBilling").removeAttr('disabled');
				}
			}else{$("#continueOnShipping").removeAttr('disabled');}
		});

		// update state options in case the country changes
		$cache.countryCode.on("change", function () {
			app.util.updateStateOptions(this);
		});
	}

	//changes the payment method form
	function changePaymentMethod(paymentMethodID) {
		$cache.paymentMethods.removeClass("payment-method-expanded");
		var pmc = $cache.paymentMethods.filter("#PaymentMethod_"+paymentMethodID);
		if (pmc.length===0) {
			pmc = $("#PaymentMethod_Custom");
		}
		pmc.addClass("payment-method-expanded");

		// ensure checkbox of payment method is checked
		$("#is-" + paymentMethodID)[0].checked = true;
		
		// Reset BML form
		var bmlForm = $cache.checkoutForm.find("#PaymentMethod_BML");
		bmlForm.find("select[name$='_year']").removeClass("required");
		bmlForm.find("select[name$='_month']").removeClass("required");
		bmlForm.find("select[name$='_day']").removeClass("required");
		bmlForm.find("input[name$='_ssn']").removeClass("required");
		
		if (paymentMethodID==="BML") {
			var yr = bmlForm.find("select[name$='_year']");
			bmlForm.find("select[name$='_year']").addClass("required");
			bmlForm.find("select[name$='_month']").addClass("required");
			bmlForm.find("select[name$='_day']").addClass("required");
			bmlForm.find("input[name$='_ssn']").addClass("required");
		}
		
		// Reset CREDIT_CARD form
		var ccForm = $cache.checkoutForm.find("#PaymentMethod_CREDIT_CARD");
		ccForm.find("input[name$='_owner']").removeClass("required");
		ccForm.find("select[name$='_type']").removeClass("required");
		ccForm.find("input[name$='_number']").removeClass("required");
		ccForm.find("select[name$='_month']").removeClass("required");
		ccForm.find("select[name$='_year']").removeClass("required");
		ccForm.find("input[name$='_cvn']").removeClass("required");
		
		if (paymentMethodID==="CREDIT_CARD") {
			ccForm.find("input[name$='_owner']").addClass("required");
			ccForm.find("select[name$='_type']").addClass("required");
			ccForm.find("input[name$='_number']").addClass("required");
			ccForm.find("select[name$='_month']").addClass("required");
			ccForm.find("select[name$='_year']").addClass("required");
			ccForm.find("input[name$='_cvn']").addClass("required");
			updatePier1CcFields();
		}
		
		// Reset PIER1_REWARDS form
		var pier1CardForm = $cache.checkoutForm.find("#PaymentMethod_PIER1_REWARDS");
		pier1CardForm.find("input[name$='_owner']").removeClass("required");
		pier1CardForm.find("input[name$='_type']").removeClass("required");
		pier1CardForm.find("input[name$='_number']").removeClass("required");
		
		if (paymentMethodID==="PIER1_REWARDS") {
			pier1CardForm.find("input[name$='_owner']").addClass("required");
			pier1CardForm.find("input[name$='_type']").addClass("required").addClass("valid");
			pier1CardForm.find("input[name$='_number']").addClass("required");
		}
		
		app.validator.init();

		// Validate the form and enable/disable "Continue" button.
		$cache.checkoutForm.validate();
		if ($cache.checkoutForm.valid()) {
			$("#continueOnBilling").removeAttr("disabled");
		} else {
			$("#continueOnBilling").attr("disabled", "disabled");
		}
	}

	function setCCFields(data) {
		// fill the form / clear the former cvn input
		$cache.ccOwner.val(data.holder);
		$cache.ccType.val(data.type);
		$cache.ccNum.val(data.maskedNumber);
		$cache.ccMonth.val(data.expirationMonth);
		$cache.ccYear.val(data.expirationYear);
		$cache.ccCcv.val("");
		updatePier1CcFields();
		
		// remove error messages
		$cache.ccContainer.find(".errormessage")
						  .toggleClass("errormessage")
						  .filter("span").remove();

		$cache.ccContainer.find(".errorlabel").toggleClass("errorlabel");
	}

	function setPier1CardFields(data) {
		// fill the form / clear the former cvn input
		$cache.pier1CardOwner.val(data.holder);
		$cache.pier1CardType.val(data.type);
		$cache.pier1CardNum.val(data.maskedNumber);
		
		// remove error messages
		$cache.pier1CardContainer.find(".errormessage")
						  .toggleClass("errormessage")
						  .filter("span").remove();

		$cache.pier1CardContainer.find(".errorlabel").toggleClass("errorlabel");
	}

	//updates the credit card form with the attributes of a given card
	function populateCreditCardForm(cardID) {
		// load card details
		var url = app.util.appendParamToURL(app.urls.billingSelectCC, "creditCardUUID", cardID);
		 app.ajax.getJson({
			url: url,
			callback: function (data) {
				if(!data) {
					window.alert(app.resources.CC_LOAD_ERROR);
					return false;
				}
				$cache.ccList.data(cardID, data);
				setCCFields(data);
			}
		});
	}

	//updates the Pier1 rewards credit card form with the attributes of a given card
	function populatePier1CardForm(cardID) {
		// load card details
		var url = app.util.appendParamToURL(app.urls.billingSelectCC, "creditCardUUID", cardID);
		url = app.util.appendParamToURL(url, "paymentMethodID", "PIER1_REWARDS");
		 app.ajax.getJson({
			url: url,
			callback: function (data) {
				if(!data) {
					window.alert(app.resources.CC_LOAD_ERROR);
					return false;
				}
				$cache.pier1CardList.data(cardID, data);
				setPier1CardFields(data);
				
				// Validate the form and enable/disable "Continue" button
				// (Not required for regular credit card because user must enter CVN
				// every time, which forces validation on blur event. Pier1 Rewards
				// cards do not require secondary data entry.)
				$cache.checkoutForm.validate();
				if ($cache.checkoutForm.valid()) {
					$("#continueOnBilling").removeAttr("disabled");
				} else {
					$("#continueOnBilling").attr("disabled", "disabled");
				}
			}
		});
	}

	//loads billing address, Gift Certificates, Coupon and Payment methods
	function billingLoad() {
		$('.privacyPolicy').click(function(e){
			e.preventDefault();
			var options = $.extend(true, {}, app.dialog.settings, {
				height : 600,
				width : 1200				
			});
			app.dialog.open({url:this.href, options: options});
		});
		$cache.paymentMethodId.on("click", function () {
			changePaymentMethod($(this).val());
			
		});

		// get selected payment method from payment method form
		var paymentMethodId = $cache.paymentMethodId.filter(":checked");
		changePaymentMethod(paymentMethodId.length===0 ? "CREDIT_CARD" : paymentMethodId.val());

		// select credit card from list
		$cache.ccList.on("change", function () {
			var cardUUID = $(this).val();
			if(!cardUUID) { return; }
			var ccdata = $cache.ccList.data(cardUUID);
			if (ccdata && ccdata.holder) {
				setCCFields(ccdata);
				return;
			}
			populateCreditCardForm(cardUUID);
		});

		// select Pier1 card from list
		$cache.pier1CardList.on("change", function () {
			var cardUUID = $(this).val();
			if(!cardUUID) { return; }
			var ccdata = $cache.pier1CardList.data(cardUUID);
			if (ccdata && ccdata.holder) {
				setPier1CardFields(ccdata);
				return;
			}
			populatePier1CardForm(cardUUID);
		});
		
		// handle whole form submit (bind click to continue checkout button)
		// append form fields of current payment form to this submit
		// in order to validate the payment method form inputs too

		$cache.save.on('click', function (e) {
			// determine if the order total was paid using gift cert or a promotion
			if ($("#noPaymentNeeded").length > 0 && $(".giftcertpi").length > 0) {
				// as a safety precaution, uncheck any existing payment methods
				$cache.paymentMethodId.filter(":checked").removeAttr("checked");
				// add selected radio button with gift card payment method
				$("<input/>").attr({
									name:$cache.paymentMethodId.first().attr("name"),
									type:"radio",
									checked:"checked",
									value:app.constants.PI_METHOD_GIFT_CERTIFICATE})
							 .appendTo($cache.checkoutForm);
			}
			
			var tc = $cache.checkoutForm.find("input[name$='bml_termsandconditions']");
			if ($cache.paymentMethodId.filter(":checked").val()==="BML" && !$cache.checkoutForm.find("input[name$='bml_termsandconditions']")[0].checked) {
				alert(app.resources.BML_AGREE_TO_TERMS);
				return false;
			}
			
		});

		$cache.gcCheckBalance.on("click", function (e) {
			e.preventDefault();
			$cache.gcCode = $cache.gcCode || $cache.checkoutForm.find("input[name$='_giftCertCode']");
			$cache.balance = $cache.balance || $cache.checkoutForm.find("div.balance");
			if ($cache.gcCode.length===0 || $cache.gcCode.val().length===0) {
				var error = $cache.balance.find("span.error");
				if (error.length===0) {
					error = $("<span>").addClass("error").appendTo($cache.balance);
				}
				error.html(app.resources.GIFT_CERT_MISSING);
				return;
			}
			
			app.giftcard.checkBalance($cache.gcCode.val(), function (data) {
				if(!data || !data.giftCertificate) {
					// error
					var error = $cache.balance.find("span.error");
					if (error.length===0) {
						error = $("<span>").addClass("error").appendTo($cache.balance);
					}
					error.html(app.resources.GIFT_CERT_INVALID);
					return;
				}
				// display details in UI
				$cache.balance.find("span.error").remove();
				var balance = data.giftCertificate.balance;
				$cache.balance.html(app.resources.GIFT_CERT_BALANCE+" "+balance);
			});
		});
		
		$cache.addCoupon.on("click", function(e){
			e.preventDefault();
			$cache.couponCode = $cache.couponCode || $cache.checkoutForm.find("input[name$='_couponCode']");
			$cache.redemption = $cache.redemption || $cache.checkoutForm.find("div.redemption.coupon");
			var val = $cache.couponCode.val();
			if (val.length===0) { 
				var error = $cache.redemption.find("span.error");
				if (error.length===0) {
					error = $("<span>").addClass("error").appendTo($cache.redemption);
				}
				error.html(app.resources.COUPON_CODE_MISSING);					
				return;
			}
			
			var url = app.util.appendParamsToUrl(app.urls.addCoupon, {couponCode:val,format:"ajax"});
			$.getJSON(url, function(data) {
				var fail = false;
				var msg = "";
				if (!data) {
					msg = app.resources.BAD_RESPONSE;
					fail = true;
				}
				else if (!data.success) {
					msg = data.message;
					fail = true;
				}
				if (fail) {
					var error = $cache.redemption.find("span.error");
					if (error.length===0) {
						$("<span>").addClass("error").appendTo($cache.redemption);
					}
					error.html(msg);					
					return;
				}
				
				$cache.redemption.html(data.message);
			});
		});
	}

	function initializeDom() {
		isShipping = $(".checkout-shipping").length > 0;
		isMultiShipping = $(".multi-shipping-addresses").length > 0;
		isBilling = $(".checkout-billing").length > 0;
		isSubmitOrder = $(".submit-order").length > 0;
	}

	function initializeCache() {
		$cache.checkoutForm = $("form.address");
		$cache.addressList = $cache.checkoutForm.find(".select-address select[id$='_addressList']");
		$cache.firstName = $cache.checkoutForm.find("input[name$='_firstName']");
		$cache.lastName = $cache.checkoutForm.find("input[name$='_lastName']");
		$cache.address1 = $cache.checkoutForm.find("input[name$='_address1']");
		$cache.address2 = $cache.checkoutForm.find("input[name$='_address2']");
		$cache.city = $cache.checkoutForm.find("input[name$='_city']");
		$cache.postalCode = $cache.checkoutForm.find("input[name$='_zip']");
		$cache.phone = $cache.checkoutForm.find("input[name$='_phone']");
		$cache.countryCode = $cache.checkoutForm.find("select[id$='_country']");
		$cache.stateCode = $cache.checkoutForm.find("select[id$='_state']");
		$cache.addToAddressBook = $cache.checkoutForm.find("input[name$='_addToAddressBook']");

		if ($cache.checkoutForm.hasClass("checkout-shipping")) {
			// shipping only
			$cache.useForBilling = $cache.checkoutForm.find("input[name$='_useAsBillingAddress']");
			$cache.giftMessage = $cache.checkoutForm.find(".gift-message-text");
			$cache.shippingMethodList = $("#shipping-method-list");
		}

		if ($cache.checkoutForm.hasClass("checkout-billing")) {
			// billing only
			$cache.email = $cache.checkoutForm.find("input[name$='_emailAddress']");
			$cache.save = $cache.checkoutForm.find("button[name$='_billing_save']");
			$cache.paymentMethods = $cache.checkoutForm.find("div.payment-method");
			$cache.paymentMethodId = $cache.checkoutForm.find("input[name$='_selectedPaymentMethodID']");
			$cache.ccContainer = $("#PaymentMethod_CREDIT_CARD");
			$cache.ccList = $("#creditCardList");
			$cache.ccOwner = $cache.ccContainer.find("input[name$='_owner']");
			$cache.ccType = $cache.ccContainer.find("select[name$='_type']");
			$cache.ccNum = $cache.ccContainer.find("input[name$='_number']");
			$cache.ccMonth = $cache.ccContainer.find("[name$='_month']");
			$cache.ccYear = $cache.ccContainer.find("[name$='_year']");
			$cache.ccCcv = $cache.ccContainer.find("input[name$='_cvn']");
			$cache.pier1CardContainer = $("#PaymentMethod_PIER1_REWARDS");
			$cache.pier1CardList = $("#pier1CardList");
			$cache.pier1CardOwner = $cache.pier1CardContainer.find("input[name$='_owner']");
			$cache.pier1CardType = $cache.pier1CardContainer.find("select[name$='_type']");
			$cache.pier1CardNum = $cache.pier1CardContainer.find("input[name$='_number']");
			$cache.BMLContainer = $("#PaymentMethod_BML");
			$cache.gcCheckBalance = $("#gc-checkbalance");
			$cache.addCoupon = $("#add-coupon");
			
		}
	}

	function initializeEvents() {
		addressLoad();
		adjustConentHeight();
		if ( (isShipping) || (isMultiShipping) ) {
			shippingLoad();
			multiShipments();
		}
		else if ( isBilling ) {
			billingLoad();
		}
		else if ( isSubmitOrder ) {
			$('form.submit-order').submit(function(){
				$('.check-out-button').attr("disabled","disabled");
			});
		}
	}

	function multiShipments () {
		
		$(".edit-address").on("click",".add", function(e){			
			e.preventDefault();
			var options = $.extend(true, {}, {open: initMultiShipments}, {title : 'Add Address', dialogClass: 'addAddress'});
			app.myaccountdlg.open({url:this.href, options:options});
		
		}).on("click", ".edit", function(e){
			
			e.preventDefault();

			var addressID = $(this).parents("td.shipping-address").children("select").val();
			var url = $(this).attr("href");
			if(!addressID) {
				return false;
			}
			var add_edit_url = app.util.appendParamToURL(url, "addressID", addressID);
			var options = $.extend(true, {}, {open: initMultiShipments}, {title : 'Edit Address', dialogClass: 'editAddress'});
			app.myaccountdlg.open({url:add_edit_url, options:options});
			
		});	
		
	}
	
	function initMultiShipments () {
		$(".cancel").live("click", function(e) {
			e.preventDefault();
			app.myaccountdlg.close();
		});
		$(".apply").live("click", function(e) {
			var form = $("#EditAddressForm");
			e.preventDefault();
			if (!form.valid()) {
				return false; 
			}	
			var post = jQuery('#EditAddressForm').serialize();
			$.ajax({
				type: "POST",
				url: form.attr("action"),
				data: post,
				dataType: 'html',
				success: function(data){
				$("#dialog-container").empty().html(data);
			},
			failure: function(data) {
				alert("${Resource.msg('global.serverconnection','locale',null)}"); 

			},
			error : function(XMLHttpRequest, textStatus, errorThrown){
				$('#confirmation-container').show(); 
				$('#confirmation-container').dialog({
					bgiframe: true,
					autoOpen: false,
					modal: true,
					height: 100,
					width: 300,
					resizable: false
				});
				$('#confirmation-container').dialog('option', 'title', $('#dialog-container').dialog('option', 'title')); 
				$('#confirmation-container').dialog('open');
			}

			});
		});
		$(".remove").live("click", function(e) {
			app.myaccountdlg.close();
		});		
	}
	
	function updatePier1CcFields(){
		var ccForm = $cache.checkoutForm.find("#PaymentMethod_CREDIT_CARD");
		if($('#dwfrm_billing_paymentMethods_creditCard_type').val() == 'Pier1'){
			ccForm.find(".required-indicator.exp-date").hide();
			ccForm.find("select[name$='_month']").removeClass("required");
			ccForm.find("select[name$='_year']").removeClass("required");
			ccForm.find("label[for$='_cvn'] .required-indicator").hide();
			ccForm.find("input[name$='_cvn']").removeClass("required");	
		} else {
			ccForm.find(".required-indicator.exp-date").show();
			ccForm.find("select[name$='_month']").addClass("required");
			ccForm.find("select[name$='_year']").addClass("required");
			ccForm.find("label[for$='_cvn'] .required-indicator").show();
			ccForm.find("input[name$='_cvn']").addClass("required");
		}

		$cache.checkoutForm.validate();
		if ($cache.checkoutForm.valid()) {
			$("#continueOnBilling").removeAttr("disabled");
		} else {
			$("#continueOnBilling").attr("disabled", "disabled");
		}
	}
	
	initBillingPageEvents();
	function initBillingPageEvents(){
		$('#dwfrm_billing_paymentMethods_creditCard_cvn').keyup(function(e){
			if( $.trim( $('#dwfrm_billing_paymentMethods_creditCard_cvn').val() ).length >= 3){
				if($(".checkout-billing").valid()){
					$("#continueOnBilling").removeAttr("disabled");
				}
			}else{
				$("#continueOnBilling").attr("disabled", "disabled");
			}
			if(e.which == 13){
				$('.checkout-billing').submit();
			}else{
				$("#dwfrm_billing_paymentMethods_creditCard_cvn").numeric({ decimal: false, negative: false }, function() { this.value = ""; this.focus(); });
			}
		});
		$('#dwfrm_billing_paymentMethods_creditCard_type').change(updatePier1CcFields);
	}
	initGuestRegisterEvents();
	function initGuestRegisterEvents(){
	$('.occBtn').click(function() {
		$('.occBtnDiv').hide();
		$('#orderConfirmCreateAccount').removeClass('hide');
		});
	}
	function adjustConentHeight () {
		$('.primary-content').height( $('#main').height() );
	}
	function initAddressReviewSettings () {
		$(".enternew").live("click", function(e) {
			e.preventDefault();
			app.myaccountdlg.close();
		});
		$(".original, .originalLink").live("click", function(e) {
			e.preventDefault();
			$("#byPassVertex").attr('value',true);
			app.myaccountdlg.close();
			$("#continueOnShipping").click();
		});
		$(".corrected").live("click", function(e) {
			e.preventDefault();
			var vertexAddress = $("#crctdAddress").text().split("|");
			if(vertexAddress[0] != 'null'){$("#dwfrm_singleshipping_shippingAddress_addressFields_address1").attr('value',vertexAddress[0]);}else{$("#dwfrm_singleshipping_shippingAddress_addressFields_address1").attr('value','');}
			if(vertexAddress[1] != 'null'){$("#dwfrm_singleshipping_shippingAddress_addressFields_address2").attr('value',vertexAddress[1]);}else{$("#dwfrm_singleshipping_shippingAddress_addressFields_address2").attr('value','');}
			if(vertexAddress[2] != 'null'){$("#dwfrm_singleshipping_shippingAddress_addressFields_city").attr('value',vertexAddress[2]);}else{$("#dwfrm_singleshipping_shippingAddress_addressFields_city").attr('value','');}
			if(vertexAddress[3] != 'null'){$("#dwfrm_singleshipping_shippingAddress_addressFields_states_state option[value='"+vertexAddress[3]+"']").attr('selected', 'selected');}else{$("#dwfrm_singleshipping_shippingAddress_addressFields_states_state option[value='']").attr('selected', 'selected');}
			if(vertexAddress[4] != 'null'){$("#dwfrm_singleshipping_shippingAddress_addressFields_zip").attr('value',vertexAddress[4]);}else{$("#dwfrm_singleshipping_shippingAddress_addressFields_zip").attr('value','');}
			if(vertexAddress[5] != 'null'){$("#dwfrm_singleshipping_shippingAddress_addressFields_states_state option[value='"+vertexAddress[5]+"']").attr('selected', 'selected');}else{$("#dwfrm_singleshipping_shippingAddress_addressFields_states_state option[value='']").attr('selected', 'selected');}
			app.myaccountdlg.close();
			if(vertexAddress[3] == "AK" || vertexAddress[3] == "HI"){
				$("#byPassVertex").attr('value',false);
				updateShippingMethodList();
			}else{
				$("#byPassVertex").attr('value',true);
				$("#continueOnShipping").click();
			}
		});
	}
	/******* app.checkout public object ********/
	app.checkout = {
		init : function () {
			initializeCache();
			initializeDom();
			initializeEvents();
		},
		initAddressReview : function (){
			var url = app.util.appendParamsToUrl(app.urls.addresReviewUrl , {flag:'REVIEW'});
			var options = $.extend(true, {}, {open: initAddressReviewSettings}, {title : 'Review Your Address', dialogClass: 'arDlg'});
			app.myaccountdlg.open({url:url, options:options});
		},
		initAddressInvalid : function (){
			var url = app.util.appendParamsToUrl(app.urls.addresReviewUrl , {flag:'INVALID'});
			var options = $.extend(true, {}, {open: initAddressReviewSettings}, {title : 'Review Your Address', dialogClass: 'arDlg'});
			app.myaccountdlg.open({url:url, options:options});
		}
	};
}(window.app = window.app || {}, jQuery));


// app.quickview
(function (app, $) {
	var $cache = {};

	function bindQvButton() {
		$cache.qvButton.one("click", function (e) {
			e.preventDefault();
			app.quickView.show({
				url : $(this).attr("href"),
				source : "quickview"
			});
			return false;
		});
	}


	app.quickView = {
		initializeButton : function (container, target) {
			// quick view button
			$(container).on("mouseenter", target, function (e) {
				if(!$cache.qvButton) {
					$cache.qvButton = $("<a id='quickviewbutton'/>");					
				}
				bindQvButton();
				
				var link = $(this).children("a:first");
				$cache.qvButton.attr({
					"href" : link.attr("href"),
					"title" : link.attr("title")
				}).appendTo($(this));
			});
		},
		init : function () {
			if(app.quickView.exists()) {
				return $cache.quickView;
			}

			$cache.quickView = $("<div/>").attr("id", "QuickViewDialog").appendTo(document.body);
			return $cache.quickView;
		},
		// show quick view dialog and send request to the server to get the product
		// options.source - source of the dialog i.e. search/cart
		// options.url - product url
		show : function (options) {
			options.target = app.quickView.init();
			options.callback = function () {
				app.product.init();
				app.dialog.create({
					target : $cache.quickView,
					options : {
						height : 'auto',
						width : 745,
						dialogClass : 'quickview',
						title : 'Product Quickview',
						resizable : false,
						position : 'center',
						open : function () {							
							app.progress.hide();
						}
					}
				});
				$cache.quickView.dialog('open');
				$('#product-content').find('span.online-avail-msg').each(function(){
					app.storeTools.getOnlineAvailabilityExt($(this).data('pid'), $(this), true);
				});
				$(".numsonly").numeric({ decimal: false, negative: false }, function() { this.value = ""; this.focus(); });
			};
			app.product.get(options);
			return $cache.quickView;
		},
		// close the quick view dialog
		close : function () {
			if($cache.quickView) {
				$cache.quickView.dialog('close').empty();
				return $cache.quickView;
			}
		},
		exists : function () {
			return $cache.quickView && ($cache.quickView.length > 0);
		},
		isActive : function () {
			return $cache.quickView && ($cache.quickView.length > 0) && ($cache.quickView.children.length > 0);
		},
		container : $cache.quickView
	};

}(window.app = window.app || {}, jQuery));

// app.util
(function (app, $) {

	// sub namespace app.util.* contains utility functions
	app.util = {
		
		// trims a prefix from a given string, this can be used to trim
		// a certain prefix from DOM element IDs for further processing on the ID
		trimPrefix : function (str, prefix) {
			return str.substring(prefix.length);
		},
		
		initToggleElements : function() {
			// add generic toggle functionality
			$('.toggle')
				.click(function(){
					$(this).toggleClass('expanded').next('.toggle-content').toggle();
				})
				.next('.toggle-content').hide();
			
		},
		
		setDialogify : function (e) {
			e.preventDefault();
			var actionSource = $(this),			
				dlgAction = $(actionSource).data("dlg-action") || {}, // url, target, isForm
				dlgOptions = $.extend({}, app.dialog.settings, $(actionSource).data("dlg-options") || {});
				
			dlgOptions.title = dlgOptions.title || $(actionSource).attr("title") || "";

			var url = dlgAction.url // url from data
					  || (dlgAction.isForm ? $(actionSource).closest("form").attr("action") : null) // or url from form action if isForm=true
					  || $(actionSource).attr("href"); // or url from href

			if (!url) { return; }
			
			// if this is a content link, update url from Page-Show to Page-Include
			if ($(this).hasClass("attributecontentlink")) {
				var uri = app.util.getUri(url);
				url = app.urls.pageInclude+uri.query;
			}

			var dlg = app.dialog.create({target:dlgAction.target, options : dlgOptions});

			app.ajax.load({
				url:$(actionSource).attr("href") || $(actionSource).closest("form").attr("action"),
				target:dlg, callback: function () {
					dlg.dialog("open");	// open after load to ensure dialog is centered
					app.validator.init(); // re-init validator
				}
			});
		},

		padLeft : function (str, padChar, len) {
			var digs = len || 10;
			var s = str.toString();
			var dif = digs - s.length;
			while(dif > 0) {
				s = padChar + s;
				dif--;
			}
			return s;
		},
		// appends the parameter with the given name and
		// value to the given url and returns the changed url
		appendParamToURL : function (url, name, value) {
			var c = "?";
			if(url.indexOf(c) !== -1) {
				c = "&";
			}
			return url + c + name + "=" + value;
		},

		appendParamsToUrl : function (url, params) {			
			var uri = app.util.getUri(url),
				includeHash = arguments.length < 3 ? false : arguments[2];
			
			var qsParams = $.extend(uri.queryParams, params);
			var result = uri.path+"?"+$.param(qsParams);
			if (includeHash) {
				result+=uri.hash;
			}
			if (result.indexOf("http")<0 && result.charAt(0)!=="/") {
				result="/"+result;	
			}
			
			return result;
		},

		removeParamFromURL : function (url, parameter) {
			var urlparts = url.split('?');

			if(urlparts.length >= 2) {
				var urlBase = urlparts.shift();
				var queryString = urlparts.join("?");

				var prefix = parameter + '=';
				var pars = queryString.split(/[&;]/g);
				var i=pars.length;
				while(0 > i--) {
					if(pars[i].lastIndexOf(prefix, 0) !== -1) {
						pars.splice(i, 1);
					}
				}
				url = urlBase + '?' + pars.join('&');
			}
			return url;
		},

		staticUrl : function (path) {
			if(!path || $.trim(path).length === 0) {
				return app.urls.staticPath;
			}

			return app.urls.staticPath + (path.charAt(0) === "/" ? path.substr(1) : path );
		},

		ajaxUrl : function (path) {
			return app.util.appendParamToURL(path, "format", "ajax");
		},
		
		toAbsoluteUrl : function (url) {
			if (url.indexOf("http")!==0 && url.charAt(0)!=="/") {
				url = "/"+url;
			}
			return url;
		},

		loadDynamicCss : function (urls) {
			var i, len=urls.length;
			for(i=0; i < len; i++) {
				app.util.loadedCssFiles.push(app.util.loadCssFile(urls[i]));
			}
		},

		// dynamically loads a CSS file
		loadCssFile : function (url) {
			return $("<link/>").appendTo($("head")).attr({
				type : "text/css",
				rel : "stylesheet"
			}).attr("href", url); // for i.e. <9, href must be added after link has been appended to head
		},
		// array to keep track of the dynamically loaded CSS files
		loadedCssFiles : [],

		// removes all dynamically loaded CSS files
		clearDynamicCss : function () {
			var i = app.util.loadedCssFiles.length;
			while(0 > i--) {
				$(app.util.loadedCssFiles[i]).remove();
			}
			app.util.loadedCssFiles = [];
		},

		getQueryStringParams : function (qs) {
			if(!qs || qs.length === 0) { return {}; }

			var params = {};
			// Use the String::replace method to iterate over each
			// name-value pair in the string.
			qs.replace( new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
						function ( $0, $1, $2, $3 ) {	params[ $1 ] = $3; }
			);
			return params;
		},

		getUri : function (o) {
			var a;
			
			if (o.tagName && $(o).attr("href")) {
				a = o;
			}
			else if (typeof o === "string") {
				a = document.createElement("a");
				a.href = o;
			}
			else {
				return null;
			}

			/*
			return {
				protocol : a.protocol, //http:
				host : a.host, //www.myexample.com
				hostname : a.hostname, //www.myexample.com'
				port : a.port, //:80
				path : a.pathname, // /sub1/sub2
				query : a.search, // ?param1=val1&param2=val2
				queryParams : a.search.length > 1 ? app.util.getQueryStringParams(a.search.substr(1)) : {},
				hash : a.hash, // #OU812,5150
				url : a.protocol+ "//" + a.host + a.pathname,
				urlWithQuery : a.protocol+ "//" + a.host + a.port + a.pathname + a.search
			};
			*/
			
			var host = a.host.split(':')[0];			
			var path = a.pathname.slice(0,1) === '/' ? a.pathname : '/' + a.pathname;

			return {
				protocol : a.protocol, //http:
				host : host, //www.myexample.com
				hostname : host, //www.myexample.com'
				port : a.port, //:80
				path : path, // /sub1/sub2
				query : a.search, // ?param1=val1&param2=val2
				queryParams : a.search.length > 1 ? app.util.getQueryStringParams(a.search.substr(1)) : {},
				hash : a.hash, // #OU812,5150
				url : a.protocol+ "//" + host + path,
				urlWithQuery : a.protocol+ "//" + host + a.port + path + a.search
			};
			
		},

		postForm : function (args) {
			var form = $("<form>").attr({action:args.url,method:"post"}).appendTo("body");
			var p;
			for (p in args.fields) {
				$("<input>").attr({name:p,value:args.fields[p]}).appendTo(form);
			}
			form.submit();
		},

		getMessage : function (key, bundleName, callback) {
			if (!callback || !key || key.length===0) {
				return;
			}
			var params = {key:key};
			if (bundleName && bundleName.length===0) {
				params.bn = bundleName;
			}
			var url = app.util.appendParamsToUrl(app.urls.appResources, params);
			$.getJSON(url, callback);
		},
		
		updateStateOptions : function(countrySelect) {
			var country = $(countrySelect);
			if (country.length===0 || !app.countries[country.val()]) {
				 return; 
			}
			var form = country.closest("form");
			var stateField = country.data("stateField") ? country.data("stateField") : form.find("select[name$='_state']");
			if (stateField.length===0) {
				return;
			}
			
			var form = country.closest("form"),	
				c = app.countries[country.val()],
				arrHtml = [],
				labelSpan = form.find("label[for='"+stateField[0].id+"'] span").not(".required-indicator");
			
			// set the label text
			labelSpan.html(c.label);
	
			var s;
			for (s in c.regions) {
				arrHtml.push('<option value="'+s+'">'+c.regions[s]+'</option>');
			}
			// clone the empty option item and add to stateSelect
			var o1 = stateField.children().first().clone();
			stateField.html(arrHtml.join("")).removeAttr("disabled").children().first().before(o1);
			stateField[0].selectedIndex=0;
		},
		
		limitCharacters : function () {
			$('form').find('textarea[data-character-limit]').each(function(){				
				var characterLimit = $(this).data("character-limit");
				var charCountHtml = String.format(app.resources.CHAR_LIMIT_MSG, 
										'<span class="char-remain-count">'+characterLimit+'</span>',
										'<span class="char-allowed-count">'+characterLimit+'</span>');
				var charCountContainer = $(this).next('div.char-count');
				if (charCountContainer.length===0) {
					charCountContainer = $('<div class="char-count"/>').insertAfter($(this));
				}
				charCountContainer.html(charCountHtml);
				// trigger the keydown event so that any existing character data is calculated
				$(this).change();
			});
		},
		
		setDeleteConfirmation : function(container, message) {
			$(container).on("click", ".delete", function(e){
				return confirm(message);
			});
		},
		
		scrollBrowser : function (xLocation) {
			$('html, body').animate({ scrollTop: xLocation }, 500);
		},
		
		radioButtonUrlFetch : function() {
			$('input.radio-url').click(function(){
				window.location=$(this).data("url");
			});
		}

	};
}(window.app = window.app || {}, jQuery));

// app.page
(function (app, $) {

	app.page = {
		title : "",
		type : "",
		setContext : function (o) {
			$.extend(app.page, o);
		},
		params : app.util.getQueryStringParams(window.location.search.substr(1)),
		refresh : function() {
			var t=setTimeout("window.location.assign(window.location.href);",500);
			
		}
	};
}(window.app = window.app || {}, jQuery));

// app.registry
(function (app, $) {
	var $cache = {};

	function populateBeforeAddressForm(addressID) {
		// load address details
		var url = app.urls.giftRegAdd + addressID;
		 app.ajax.getJson({
			url: url,
			callback: function (data) {
				if(!data || !data.address) {
					window.alert(app.resources.REG_ADDR_ERROR);
					return false;
				}
				// fill the form
				$cache.addressBeforeFields.filter("[name$='_addressid']").val(data.address.ID);
				$cache.addressBeforeFields.filter("[name$='_firstname']").val(data.address.firstName);
				$cache.addressBeforeFields.filter("[name$='_lastname']").val(data.address.lastName);
				$cache.addressBeforeFields.filter("[name$='_address1']").val(data.address.address1);
				$cache.addressBeforeFields.filter("[name$='_address2']").val(data.address.address2);
				$cache.addressBeforeFields.filter("[name$='_city']").val(data.address.city);
				$cache.addressBeforeFields.filter("[name$='_zip']").val(data.address.postalCode);
				$cache.addressBeforeFields.filter("[name$='_state']").val(data.address.stateCode);
				$cache.addressBeforeFields.filter("[name$='_country']").val(data.address.countryCode);
				$cache.addressBeforeFields.filter("[name$='_phone']").val(data.address.phone);
				$cache.registryForm.validate().form();
			}
		});
	}

	//updates the after address form with the attributes of a given address
	function populateAfterAddressForm(addressID) {
		// load address details
		var url = app.urls.giftRegAdd + addressID;
		 app.ajax.getJson({
			url: url,
			callback: function (data) {
				if(!data || !data.address) {
					window.alert(app.resources.REG_ADDR_ERROR);
					return false;
				}
				// fill the form
				$cache.addressAfterFields.filter("[name$='_addressid']").val(data.address.ID);
				$cache.addressAfterFields.filter("[name$='_firstname']").val(data.address.firstName);
				$cache.addressAfterFields.filter("[name$='_lastname']").val(data.address.lastName);
				$cache.addressAfterFields.filter("[name$='_address1']").val(data.address.address1);
				$cache.addressAfterFields.filter("[name$='_address2']").val(data.address.address2);
				$cache.addressAfterFields.filter("[name$='_city']").val(data.address.city);
				$cache.addressAfterFields.filter("[name$='_zip']").val(data.address.postalCode);
				$cache.addressAfterFields.filter("[name$='_state']").val(data.address.stateCode);
				$cache.addressAfterFields.filter("[name$='_country']").val(data.address.countryCode);
				$cache.addressAfterFields.filter("[name$='_phone']").val(data.address.phone);
				$cache.registryForm.validate().form();
			}
		});
	}

	//copy address before fields to address after fields
	function copyBeforeAddress() {
		$cache.addressBeforeFields.each(function () {
			var fieldName = $(this).attr("name");
			var afterField = $cache.addressAfterFields.filter("[name='"+fieldName.replace("Before","After")+"']");
			afterField.val($(this).val());
		});
	}

	// disable the address after fields
	function setAfterAddressDisabled(disabled) {
		if (disabled) {
			$cache.addressAfterFields.attr("disabled", "disabled");
		}
		else {
			$cache.addressAfterFields.removeAttr("disabled");
		}
	}

	function initializeCache() {
		$cache = {
			registryForm : $("form[name$='_giftregistry']"),
			registryTable : $("#registry-results")
		};
		$cache.copyAddress = $cache.registryForm.find("input[name$='_copyAddress']");
		$cache.addressBeforeFields = $cache.registryForm.find("fieldset[name='address-before'] input:not(:checkbox), fieldset[name='address-before'] select");
		$cache.addressAfterFields = $cache.registryForm.find("fieldset[name='address-after'] input:not(:checkbox), fieldset[name='address-after'] select");
	}

	function initializeDom() {
		$cache.addressBeforeFields.filter("[name$='_country']").data("stateField", $cache.addressBeforeFields.filter("[name$='_state']"));
		$cache.addressAfterFields.filter("[name$='_country']").data("stateField", $cache.addressAfterFields.filter("[name$='_state']"));		
		
		if ($cache.copyAddress.length && $cache.copyAddress[0].checked) {
			// fill the address after fields
			copyBeforeAddress();
			setAfterAddressDisabled(true);
		}
	}

	function initializeEvents() {
		app.sendToFriend.initializeDialog("div.list-table-header", ".send-to-friend");
		app.util.setDeleteConfirmation("table.item-list", String.format(app.resources.CONFIRM_DELETE, app.resources.TITLE_GIFTREGISTRY));
		
		$cache.copyAddress.on("click", function () {
			if (this.checked) {
				// fill the address after fields
				copyBeforeAddress();
			}
		});
		$cache.registryForm.on("change", "select[name$='_addressBeforeList']", function (e) {
			var addressID = $(this).val();
			if (addressID.length===0) { return; }
			populateBeforeAddressForm(addressID);
			if ($cache.copyAddress[0].checked) {
				copyBeforeAddress();
			}
		})
		.on("change", "select[name$='_addressAfterList']", function (e) {
			var addressID = $(this).val();
			if (addressID.length===0) { return; }
			populateAfterAddressForm(addressID);
		})
		.on("change", $cache.addressBeforeFields.filter(":not([name$='_country'])"), function (e) {
			if (!$cache.copyAddress[0].checked) { return; }
			copyBeforeAddress();			
		});
		
		
		$("form").on("change", "select[name$='_country']", function(e) {
			app.util.updateStateOptions(this);
			
			if ($cache.copyAddress.length > 0 && $cache.copyAddress[0].checked && this.id.indexOf("_addressBefore") > 0) {
				copyBeforeAddress();
				$cache.addressAfterFields.filter("[name$='_country']").trigger("change");
			}
		});
	}


	app.registry = {
		init : function () {			
			initializeCache();
			initializeDom();
			initializeEvents();
			app.product.initAddToCart();
			
		}

	};

}(window.app = window.app || {}, jQuery));

// app.progress
(function (app, $) {
	var loader;
	app.progress = {
		show: function (container) {
			var target = (!container || $(container).length===0) ? $("body") : $(container);
			loader = loader || $(".loader");

			if (loader.length===0) {
				loader = $("<div/>").addClass("loader")
									.append($("<div/>").addClass("loader-indicator"), $("<div/>").addClass("loader-bg"));

			}
			return loader.appendTo(target).show();
		},
		hide: function () {
			if (loader) { loader.hide(); }
		}
	};
}(window.app = window.app || {}, jQuery));

// app.components
(function (app, dw, $) {
	// capture recommendation of each product when it becomes visible in the carousel

	function captureCarouselRecommendations(c, li, index, state) {
		if (!dw) { return; }

		$(li).find(".capture-product-id").each(function () {
			dw.ac.capture({
				id : $(this).text(),
				type : dw.ac.EV_PRD_RECOMMENDATION
			});
		});
	}


	app.components = {
		carouselSettings : {
			scroll : 1,
			itemFallbackDimension: '100%',
			itemVisibleInCallback : app.captureCarouselRecommendations
		},
		init : function () {
			// renders horizontal/vertical carousels for product slots
			$('#horizontal-carousel').jcarousel(app.components.carouselSettings);
			$('#vertical-carousel').jcarousel($.extend({vertical : true}, app.components.carouselSettings));
		}
	};
}(window.app = window.app || {}, window.dw, jQuery));

// app.cart
(function (app, $) {
	var $cache = {};

	function updateCart(postdata, callback) {
		var url = app.util.ajaxUrl(app.urls.addProduct);
		$.post(url, postdata, callback || app.cart.refresh);
	}

	function initializeCache() {
		$cache = {
			cartTable : $("#cart-table"),
			itemsForm : $("#cart-items-form"),
			addCoupon : $("#add-coupon"),
			couponCode : $("form input[name$='_couponCode']")
		};
	}

	function initializeEvents() {
		$cache.cartTable.on("click", ".item-edit-details a", function (e) {
			e.preventDefault();
			app.quickView.show({
				url : e.target.href,
				source : "cart"
			});
		})
		.on("click", ".bonus-item-actions a", function (e) {
			e.preventDefault();
			app.bonusProductsView.show(this.href);
		});

		// override enter key for coupon code entry
		$cache.couponCode.on("keydown", function (e) {
			if (e.which === 13 && $(this).val().length===0) { return false; }
		});
		
		app.util.radioButtonUrlFetch();

		$cache.cartTable.find('.product-availability-list li').each(function(){
			var text = $(this).text();
			$(this).html( app.storeTools.updateCartMessaging('online',{ 'status' : text } ) );
		});
		$cache.cartTable.find('.selected-store-availability span').each(function(){
			var text = $(this).text();
			$(this).html( app.storeTools.updateCartMessaging('store',{ 'status' : text } ) );
		});
	}

	app.cart = {
		add : function (postdata, callback) {
			updateCart(postdata, callback);
		},
		remove : function () {
			return;
		},
		update : function (postdata, callback) {
			updateCart(postdata, callback);
		},
		refresh : function () {
			// refresh without posting
			app.page.refresh();
		},
		init : function () {
			// edit shopping cart line item
			initializeCache();
			initializeEvents();
		}
	};

}(window.app = window.app || {}, jQuery));

// app.account
(function (app, $) {
	var $cache = {};
	
	function initializeAddressForm(form) {			
		$(".apply").live("click", function(e) {
			var form = $("#edit-address-form");
			e.preventDefault();			
			if (!form.valid()) {
				return false; 
			}
			form.find("input[name='format']").remove();
			var addressId = form.find("input[name$='_addressid']");
			addressId.val(addressId.val().replace(/[^\w+-]/g, "-"));			
			var post = jQuery('#edit-address-form').serialize();
			var formattedurl = app.util.ajaxUrl(form.attr("action"));
			$.ajax({
				type: "POST",
				url: formattedurl,
				data: post,
				dataType: 'html',
				success: function(data){
				$("#dialog-container").empty().html(data);
			},
			failure: function(data) {
				alert("${Resource.msg('global.serverconnection','locale',null)}"); 

			},
			error : function(XMLHttpRequest, textStatus, errorThrown){
				$('#confirmation-container').show(); 
				$('#confirmation-container').dialog({
					bgiframe: true,
					autoOpen: false,
					modal: true,
					height: 100,
					width: 300,
					resizable: false
				});
				$('#confirmation-container').dialog('option', 'title', $('#dialog-container').dialog('option', 'title')); 
				$('#confirmation-container').dialog('open');
			}
			});
		});
		$(".cancel").live("click", function(e){
			e.preventDefault();
			app.myaccountdlg.close();
		});
		$(".delete-button").on("click", function(e){
			var form = $("#edit-address-form");
			e.preventDefault();
			if (confirm(String.format(app.resources.CONFIRM_DELETE, app.resources.TITLE_ADDRESS))) {
				var url = app.util.appendParamsToUrl(app.urls.deleteAddress, {AddressID:form.find("#addressid").val(),format:"ajax"});
				$.ajax({
					url: url,
					method: "POST",
					dataType:"json"
				}).done(function(data){
					if (data.status.toLowerCase()==="ok") {
						app.dialog.close();
						app.page.refresh();
					}
					else if (data.message.length>0) {
						alert(data.message);
						return false;
					}
					else {
						app.myaccountdlg.close();
						app.page.refresh();
					}
				});
			}
		});
	}
	
	function toggleFullOrder () {
		$('.order-items')
			.find('li.hidden:first')
				.prev('li')
					.append('<a class="toggle">View All</a>')
					.children('.toggle')
						.click(function() {
							$(this).parent().siblings('li.hidden').show();
							$(this).remove();
						});
	}
	
	function initAddressEvents() {
		$(".address-edit").live("click", function(e){
			e.preventDefault();
			var options = $.extend(true, {}, {open: initializeAddressForm}, {title : 'Edit Address', dialogClass: 'aDlg'});
			app.myaccountdlg.open({url:this.href, options:options});
		});
		$(".address-delete").on("click", function(e){
			e.preventDefault();
			if (confirm(String.format(app.resources.CONFIRM_DELETE, app.resources.TITLE_ADDRESS))) {
				$.ajax({
					url: app.util.appendParamsToUrl($(this).attr("href"), {format:"ajax"}),
					dataType:"json"
				}).done(function(data){
					if (data.status.toLowerCase()==="ok") {
						app.page.refresh();
					}
					else if (data.message.length>0) {
						alert(data.message);
					}
					else {
						app.page.refresh();
					}
				});
			}
		});		
		$(".address-create").live("click", function(e){
			e.preventDefault();
			var options = $.extend(true, {}, {open: initializeAddressForm}, {title : 'Add Address', dialogClass: 'aDlg'});
			app.myaccountdlg.open({url:this.href, options:options});
		});
	}
	function initPaymentEvents() {
		$('.addCreditCard').click(function(e){
			var options = $.extend(true, {}, {open: initPaymentSettings}, {title : 'Add a Credit Card', dialogClass: 'addCard'});
			e.preventDefault();
			app.myaccountdlg.open({url:this.href, options:options});			
		});
		var paymentList = $(".payment-list");
		if (paymentList.length===0) { return; }
		
		app.util.setDeleteConfirmation(paymentList, String.format(app.resources.CONFIRM_DELETE, app.resources.TITLE_CREDITCARD));
		
		$("form[name='payment-remove']").on("submit", function(e){
			e.preventDefault();
			// override form submission in order to prevent refresh issues
			var button = $(this).find("button.delete");
			$("<input/>").attr({type:"hidden", name:button.attr("name"), value:button.attr("value")||"delete card"}).appendTo($(this));
			var data = $(this).serialize(); 
			$.ajax({
				type: "POST",
				url: $(this).attr("action"),
				data: data
			})
			.done(function(response) {
				app.page.refresh();	
			});
		});
	}
	
	function initPaymentSettings () {
		$(".cancel").live("click", function(e) {
			e.preventDefault();
			app.myaccountdlg.close();
		});
		$(".apply").live("click", function(e) {
			var form = $("#CreditCardForm");
			e.preventDefault();
			if (!form.valid()) {
				return false; 
			}
			var formattedurl = app.util.ajaxUrl(form.attr("action"));			
			var post = jQuery('#CreditCardForm').serialize();
			$.ajax({
				type: "POST",
				url: formattedurl,
				data: post,
				dataType: 'html',
				success: function(data){
				$("#dialog-container").empty().html(data);
			},
			failure: function(data) {
				alert("${Resource.msg('global.serverconnection','locale',null)}"); 

			},
			error : function(XMLHttpRequest, textStatus, errorThrown){
				$('#confirmation-container').show(); 
				$('#confirmation-container').dialog({
					bgiframe: true,
					autoOpen: false,
					modal: true,
					height: 100,
					width: 300,
					resizable: false
				});
				$('#confirmation-container').dialog('option', 'title', $('#dialog-container').dialog('option', 'title')); 
				$('#confirmation-container').dialog('open');
			}

			});
		});
		
		// Hide date fields if select Pier1 Rewards card type
		var dateFields = $("#CreditCardForm .addCreditCardRowExt");
		$("#dwfrm_paymentinstruments_creditcards_newcreditcard_type").change(function() {
			if ($(this).val() == 'Pier1')
			{
				dateFields.hide();
			}
			else
			{
				dateFields.show();
			}
		});

	}
	
	function initForgotPwdSettings(){
		$(".apply").live("click", function(e) {
			var form = $("#PasswordResetForm");
			e.preventDefault();
			if (!form.valid()) {
				return false; 
			}
			action = "${pdict.CurrentForms.requestpassword.send.htmlName}";
			$('#formaction').append("<input name='" + action + "' type='hidden' />");
			var formattedurl = app.util.ajaxUrl(app.urls.submitDialogURL);			
			var post = jQuery('#PasswordResetForm').serialize();
			$.ajax({
				type: "POST",
				url: formattedurl,
				data: post,
				dataType: 'html',
				success: function(data){
				$("#dialog-container").empty().html(data);
			},
			failure: function(data) {
				alert("${Resource.msg('global.serverconnection','locale',null)}"); 

			},
			error : function(XMLHttpRequest, textStatus, errorThrown){
				$('#confirmation-container').show(); 
				$('#confirmation-container').dialog({
					bgiframe: true,
					autoOpen: false,
					modal: true,
					height: 100,
					width: 300,
					resizable: false
				});
				$('#confirmation-container').dialog('option', 'title', $('#dialog-container').dialog('option', 'title')); 
				$('#confirmation-container').dialog('open');
			}
		  });
		});
		$(".cancel").live("click", function(e) {
			e.preventDefault();
			app.myaccountdlg.close();
		});
	}
	function initializeEvents() {
		toggleFullOrder();
		initAddressEvents();
		initPaymentEvents();
	}
		
	app.account = {
		init : function () {			
			initializeEvents();
		},
		initForgotPwd : function (){
			$('#password-reset').live('click',function(e){
				e.preventDefault();
				var options = $.extend(true, {}, {open: initForgotPwdSettings}, {title : 'Reset password', dialogClass: 'fpDlg'});
				app.myaccountdlg.open({url:this.href, options:options});			
			});
		}
	};
}(window.app = window.app || {}, jQuery));

// app.wishlist
(function (app, $) {
	var $cache = {};

	function initializeEvents() {
		app.sendToFriend.initializeDialog("div.list-table-header", ".send-to-friend");
		$cache.editAddress.on('change', function () {
			window.location.href = app.util.appendParamToURL(app.urls.wishlistAddress, "AddressID", $(this).val());
		});
		$(".findBtn").on('click',function (){
			var wemail = $(".wishlist-email input").val();
			var wllname = $(".wishlist-lname input").val();
			var wlfname = $(".wishlist-fname input").val();
			if(wemail == ''){
				if(wllname == '' && wlfname == ''){
					alert("Please enter a value for first & last names!");
					return false;
				}
				if(wllname == '' && wlfname != ''){
					alert("Please enter a value for last name!");
					return false;
				}
				if(wllname != '' && wlfname == ''){
					alert("Please enter a value for first name!");
					return false;
				}
			}			
		});		
	}

	app.wishlist = {
		init : function () {
			$cache.editAddress = $('#editAddress');
			app.product.initAddToCart();
			initializeEvents();
			
		}
	};
	
	$(".pt_wish-list .list-table-header p .copy-paste-wishlist-url").focus(function(){
		this.select();
	});
	$(".pt_wish-list .list-table-header p .copy-paste-wishlist-url").mouseup(function(e){
		e.preventDefault();
	});

}(window.app = window.app || {}, jQuery));

// app.minicart
(function (app, $) {
	// sub name space app.minicart.* provides functionality around the mini cart

	var $cache = {}, 
		initialized = false;

	var timer = {
		id : null,
		clear : function () {
			if(timer.id) {
				window.clearTimeout(timer.id);
				delete timer.id;
			}
		},
		start : function (duration) {
			timer.id = setTimeout(app.minicart.close, duration);
		}
	};

	app.minicart = {
		url : "", // during page loading, the Demandware URL is stored here

		// initializations
		init : function () {
		
			$cache.minicart = $("#mini-cart");
			$cache.mcTotal = $cache.minicart.find(".mini-cart-total");
			$cache.mcContent = $cache.minicart.find(".mini-cart-content");
			$cache.mcClose = $cache.minicart.find(".mini-cart-close");
			$cache.mcProductList = $cache.minicart.find(".mini-cart-products");
			$cache.mcProducts = $cache.mcProductList.children(".mini-cart-product");

			var collapsed = $cache.mcProductList.children().not(":first").addClass("collapsed");


			// bind hover event to the cart total link at the top right corner
			$cache.minicart.on("mouseenter", ".mini-cart-total", function () {
				if($cache.mcContent.not(":visible")) {
					app.minicart.slide();
				}
			})
			.on("mouseenter", ".mini-cart-content", function (e) {
				timer.clear();
			})
			.on("mouseleave", ".mini-cart-content", function (e) {
				timer.clear();
				timer.start(30);
			})
			.on("click", ".mini-cart-close", app.minicart.close);

			$cache.mcProducts.append('<div class="mini-cart-toggler">&nbsp;</div>');

			$cache.mcProductList.toggledList({toggleClass : "collapsed", triggerSelector:".mini-cart-toggler", eventName:"click"});

			var itemsInCart = $('.mini-cart-num-items');
			
		    var digitArray = itemsInCart.text().match(/(\d)/g);
		    itemsInCart.empty();
		    for( i = 0; i < digitArray.length; i++ )	{
		    	$('.mini-cart-num-items').append("<span class='num-image num-" + digitArray[i] + "'>"+digitArray[i]+"</span>");
		    }
		    $('.mini-cart-num-items').addClass('chars-' + digitArray.length);

			
			initialized = true;
		},
		// shows the given content in the mini cart
		show : function (html) {
			$cache.minicart.html(html);
			app.util.scrollBrowser(0);
			app.minicart.init();
			app.minicart.slide();
			app.bonusProductsView.loadBonusOption();
		},
		// slide down and show the contents of the mini cart
		slide : function () {
			if(!initialized) {
				app.minicart.init();
			}

			if(app.minicart.suppressSlideDown && app.minicart.suppressSlideDown()) {
				return;
			}

			timer.clear();

			// show the item
			$cache.mcContent.slideDown('slow');

			// after a time out automatically close it
			timer.start(6000);
		},
		// closes the mini cart with given delay
		close : function (delay) {
			timer.clear();
			$cache.mcContent.slideUp();
		},
		// hook which can be replaced by individual pages/page types (e.g. cart)
		suppressSlideDown : function () {
			return false;
		}
	};
}(window.app = window.app || {}, jQuery));

// app.dialog
(function (app, $) {
	// private

	var $cache = {};
	// end private

	app.dialog = {
		create : function (params) {
			// options.target can be an id selector or an jquery object
			var target = $(params.target || "#dialog-container");

			// if no element found, create one
			if(target.length === 0) {
				if(target.selector && target.selector.charAt(0) === "#") {
					id = target.selector.substr(1);
				}
				target = $("<div>").attr("id", id).addClass("dialog-content").appendTo("body");
			}

			// create the dialog
			$cache.container=target;
			$cache.container.dialog($.extend(true, {}, app.dialog.settings, params.options || {}));
			return $cache.container;
		},
		
		// opens a dialog using the given url
		open : function (params) {
			if (!params.url || params.url.length===0) { return; }
						
			$cache.container = app.dialog.create(params);
			params.url = app.util.appendParamsToUrl(params.url, {format:"ajax"});

			// finally load the dialog
			app.ajax.load({
				target : $cache.container,
				url : params.url,
				callback : function () {
					
					if($cache.container.dialog("isOpen")) {	return;	}
					$cache.container.dialog("open");
				}
			});
			
		},
		// closes the dialog and triggers the "close" event for the dialog
		close : function () {
			if(!$cache.container) {
				return;
			}
			$cache.container.dialog("close");
		},
		// triggers the "apply" event for the dialog
		triggerApply : function () {
			$(this).trigger("dialogApplied");
		},
		// attaches the given callback function upon dialog "apply" event
		onApply : function (callback) {
			if(callback) {
				$(this).bind("dialogApplied", callback);
			}
		},
		// triggers the "delete" event for the dialog
		triggerDelete : function () {
			$(this).trigger("dialogDeleted");
		},
		// attaches the given callback function upon dialog "delete" event
		onDelete : function (callback) {
			if(callback) {
				$(this).bind("dialogDeleted", callback);
			}
		},
		// submits the dialog form with the given action
		submit : function (action) {
			var form = $cache.container.find("form:first");
			// set the action
			$("<input/>").attr({
				name : action,
				type : "hidden"
			}).appendTo(form);

			// serialize the form and get the post url
			var post = form.serialize();
			var url = form.attr("action");

			// post the data and replace current content with response content
			$.ajax({
				type : "POST",
				url : url,
				data : post,
				dataType : "html",
				success : function (data) {
					$cache.container.html(data);
				},
				failure : function (data) {
					window.alert(app.resources.SERVER_ERROR);
				}
			});
		},
		settings : {
			autoOpen : false,
			resizable : false,
			bgiframe : true,
			modal : true,
			height : 'auto',
			width : '800',
			buttons : {},
			title : '',
			position : 'center',
			overlay : {
				opacity : 0.5,
				background : "black"
			},
			close : function (event, ui) {
				$(this).dialog("destroy");
			}
		},
		initErrorDialog : function(content){
			jQuery(".errorDialogContainer").show();
			jQuery(".errorDialogContainer").dialog({
				bgiframe: true,
				autoOpen: false,
				modal: true,
				height: 'auto',
				width: 325,
				resizable: false,
				dialogClass : 'errorDlg',
				title: 'Whoops!'
			});
			jQuery("#errorDialogContainer").html("<span><p class='errMsg'>"+content+"</p></span><div class='note'>Please review your entries <a onclick='app.dialog.closeErrorDialog();'>OK</a></div>");
			jQuery(".ui-dialog-titlebar-close").remove();
			jQuery(".errorDialogContainer").dialog('open');
		},
		closeErrorDialog : function(){
			jQuery(".errorDialogContainer").dialog('close');
		}
	};
}(window.app = window.app || {}, jQuery));

//app.myaccountdlg
(function (app, $) {
	// private

	var $cache = {};
	// end private

	app.myaccountdlg = {
		create : function (params) {
			// options.target can be an id selector or an jquery object
			var target = $(params.target || "#dialog-container");

			// if no element found, create one
			if(target.length === 0) {
				if(target.selector && target.selector.charAt(0) === "#") {
					id = target.selector.substr(1);
				}
				target = $("<div>").attr("id", id).addClass("dialog-content").appendTo("body");
			}

			// create the dialog
			$cache.container=target;
			$cache.container.dialog($.extend(true, {}, app.myaccountdlg.settings, params.options || {}));
			return $cache.container;
		},
		
		// opens a dialog using the given url
		open : function (params) {
			if (!params.url || params.url.length===0) { return; }
						
			$cache.container = app.myaccountdlg.create(params);
			params.url = app.util.appendParamsToUrl(params.url, {format:"ajax"});

			// finally load the dialog
			app.ajax.load({
				target : $cache.container,
				url : params.url,
				callback : function () {
					
					if($cache.container.dialog("isOpen")) {	return;	}
					$cache.container.dialog("open");
				}
			});
			$(".ui-icon-closethick").remove();
		},
		
		// closes the dialog and triggers the "close" event for the dialog
		close : function () {
			if(!$cache.container) {
				return;
			}
			$cache.container.dialog("close");
		},
		// triggers the "apply" event for the dialog
		triggerApply : function () {
			$(this).trigger("dialogApplied");
		},
		// attaches the given callback function upon dialog "apply" event
		onApply : function (callback) {
			if(callback) {
				$(this).bind("dialogApplied", callback);
			}
		},
		// triggers the "delete" event for the dialog
		triggerDelete : function () {
			$(this).trigger("dialogDeleted");
		},
		// attaches the given callback function upon dialog "delete" event
		onDelete : function (callback) {
			if(callback) {
				$(this).bind("dialogDeleted", callback);
			}
		},
		// submits the dialog form with the given action
		submit : function (action) {
			var form = $cache.container.find("form:first");
			// set the action
			$("<input/>").attr({
				name : action,
				type : "hidden"
			}).appendTo(form);

			// serialize the form and get the post url
			var post = form.serialize();
			var url = form.attr("action");

			// post the data and replace current content with response content
			$.ajax({
				type : "POST",
				url : url,
				data : post,
				dataType : "html",
				success : function (data) {
					$cache.container.html(data);
				},
				failure : function (data) {
					window.alert(app.resources.SERVER_ERROR);
				}
			});
		},
		settings : {
			autoOpen : false,
			resizable : false,
			bgiframe : true,
			modal : true,
			height : 'auto',
			width : 'auto',
			buttons : {},
			title : '',
			position : 'center',
			overlay : {
				opacity : 0.5,
				background : "black"
			},
			close : function (event, ui) {
				$(this).dialog("destroy");
			}
		}
	};
}(window.app = window.app || {}, jQuery));

// app.validator
(function (app, $) {

	var naPhone = /^\(?([2-9][0-8][0-9])\)?[\-\. ]?([2-9][0-9]{2})[\-\. ]?([0-9]{4})(\s*x[0-9]+)?$/,
		regex = {
			phone : {
				us : naPhone,
				ca : naPhone
			},
			postal : {
				us : /^\d{5}(-\d{4})?$/,
				ca : /^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$/,
				gb : /^GIR?0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]|[A-HK-Y][0-9]([0-9]|[ABEHMNPRV-Y]))|[0-9][A-HJKS-UW])?[0-9][ABD-HJLNP-UW-Z]{2}$/
			},
			email : /^[\w.%+\-]+@[\w.\-]+\.[\w]{2,6}$/
		},
		settings = {
			// global form validator settings
			errorClass : 'error',
			errorElement : 'span',
			onkeyup : false,
			onfocusout : function (element) {
				if(!this.checkable(element)) {
					this.element(element);
				}
			}
		};

	function validatePhone(value, el) {
		var country = $(el).closest("form").find(".country");
		if(country.length === 0 || country.val().length === 0 || !regex.phone[country.val().toLowerCase()]) {
			return true;
		}

		var rgx = regex.phone[country.val().toLowerCase()];
		var isOptional = this.optional(el);
		var isValid = rgx.test($.trim(value));

		return isOptional || isValid;
	}

	function validateEmail(value, el) {
		var isOptional = this.optional(el);
		var isValid = regex.email.test($.trim(value));
		return isOptional || isValid;
	}

	/**
	 * Add phone validation method to jQuery validation plugin.
	 * Text fields must have 'phone' css class to be validated as phone
	 */
	$.validator.addMethod("phone", validatePhone, app.resources.INVALID_PHONE);

	/**
	 * Add email validation method to jQuery validation plugin.
	 * Text fields must have 'email' css class to be validated as email
	 */
	$.validator.addMethod("email", validateEmail, app.resources.INVALID_EMAIL);
	
	/**
	 * Add gift cert amount validation method to jQuery validation plugin.
	 * Text fields must have 'gift-cert-amont' css class to be validated
	 */
	$.validator.addMethod("gift-cert-amount", function(value, el){
		var isOptional = this.optional(el);
		var isValid = (!isNaN(value)) && (parseFloat(value)>=5) && (parseFloat(value)<=5000);
		return isOptional || isValid;
	}, app.resources.GIFT_CERT_AMOUNT_INVALID);

	/**
	 * Add positive number validation method to jQuery validation plugin.
	 * Text fields must have 'positivenumber' css class to be validated as positivenumber
	 */
	$.validator.addMethod("positivenumber", function (value, element) {
		if($.trim(value).length === 0) { return true; }
		return (!isNaN(value) && Number(value) >= 0);
	}, "");
	// "" should be replaced with error message if needed

	$.validator.messages.required = function ($1, ele, $3) {
		return "";
	};

	app.validator = {
		regex : regex,
		settings : settings,
		init : function () {
			
			$("form:not(.suppress)").each(function () {
				$(this).validate(app.validator.settings);
			});
			
		},
		initForm : function(f) {
			$(f).validate(app.validator.settings);
		}
	};
}(window.app = window.app || {}, jQuery));

// app.ajax
(function (app, $) {

	var currentRequests = [];
	// request cache

	// sub namespace app.ajax.* contains application specific ajax components
	app.ajax = {
		// ajax request to get json response
		// @param - async - boolean - asynchronous or not
		// @param - url - String - uri for the request
		// @param - data - name/value pair data request
		// @param - callback - function - callback function to be called
		getJson : function (options) {
			options.url = app.util.toAbsoluteUrl(options.url);
			// return if no url exists or url matches a current request
			if(!options.url || currentRequests[options.url]) {
				return;
			}
			
			currentRequests[options.url] = true;

			// make the server call
			$.ajax({
				dataType : "json",
				url : options.url,
				async : (typeof options.async==="undefined" || options.async===null) ? true : options.async,
				data : options.data || {}
			})
			// success
			.done(function (response) {
				if(options.callback) {
					options.callback(response);
				}
			})
			// failed
			.fail(function (xhr, textStatus) {
				if(textStatus === "parsererror") {
					window.alert(app.resources.BAD_RESPONSE);
				}
				if(options.callback) {
					options.callback(null);
				}
			})
			// executed on success or fail
			.always(function () {
				// remove current request from hash
				if(currentRequests[options.url]) {
					delete currentRequests[options.url];
				}
			});
		},
		// ajax request to load html response in a given container

		// @param - url - String - uri for the request
		// @param - data - name/value pair data request
		// @param - callback - function - callback function to be called
		// @param - target - Object - Selector or element that will receive content
		load : function (options) {
			options.url = app.util.toAbsoluteUrl(options.url);
			// return if no url exists or url matches a current request
			if(!options.url || currentRequests[options.url]) {
				return;
			}

			currentRequests[options.url] = true;

			// make the server call
			$.ajax({
				dataType : "html",
				url : app.util.appendParamToURL(options.url, "format", "ajax"),
				data : options.data
			})
			.done(function (response) {
				// success
				if(options.target) {
					$(options.target).empty().html(response);
				}
				if(options.callback) {
					options.callback(response);
				}

			})
			.fail(function (xhr, textStatus) {
				// failed
				if(textStatus === "parsererror") {
					window.alert(app.resources.BAD_RESPONSE);
				}
				options.callback(null, textStatus);
			})
			.always(function () {
				app.progress.hide();
				// remove current request from hash
				if(currentRequests[options.url]) {
					delete currentRequests[options.url];
				}
			});
		}
	};
}(window.app = window.app || {}, jQuery));

// app.searchsuggest
(function (app, $) {
	
	var qlen = 0,
		delay = 300,
		fieldDefault = null,
		suggestionsJson = null,
		$searchForm,
		$searchField,
		$searchContainer,
		$resultsContainer;

	
	var $cache = {
			listTotal : -1,
			listCurrent : -1,
			searchContainer : $('.header-search'),
			searchInput : $('#q'),
			inputPlaceholderClosed : 'Search',
			inputPlaceholderOpen : 'Find What Speaks to You',
			searchExpanded : false
	};
	
	function handleArrowKeys(keyCode) {
		switch (keyCode) {
			case 38:
				// keyUp
				$cache.listCurrent = ($cache.listCurrent <= 0) ? ($cache.listTotal - 1) : ($cache.listCurrent - 1);
				break;
			case 40:
				// keyDown
				$cache.listCurrent = ($cache.listCurrent >= $cache.listTotal - 1) ? 0 : $cache.listCurrent + 1;
				break;
			default:
				// reset
				$cache.listCurrent = -1;
				return false;
		}

		$resultsContainer.children().removeClass("selected").eq($cache.listCurrent).addClass("selected");
		$searchField.val($resultsContainer.find(".selected div.suggestionterm").first().text());
		return true;
	}
	
	function expandSearch () {
		$cache
			.searchContainer
				.addClass(
					'header-search-active',
					200,
					'',
					function(){
						$cache.searchExpanded = true;
						$cache.
							searchInput
								.focus()
								.val($cache.inputPlaceholderOpen)
								.setCursorPosition(0);
					}
				)
				.keypress(function(){
					if( $cache.searchInput.val() === $cache.inputPlaceholderOpen ) {
						$cache.searchInput.addClass('active').val("");
					}
				});
		
		$cache
			.searchContainer
			.find('.close-search')
				.click(function(){
					$cache
						.searchContainer
							.removeClass(
								'header-search-active',
								200,
								'',
								function(){
									$cache.searchExpanded = false;
									$cache.searchInput.removeClass('active').val($cache.inputPlaceholderClosed);
								}
							)
				}
			);
		
	}
	
	
	app.searchsuggest = {
			
		// configuration parameters and required object instances
		init : function (container, defaultValue) {
		
			// initialize vars
			$searchContainer = $(container);
			$searchForm = $searchContainer.find("form[name='simpleSearch']");
			$searchField = $searchForm.find("input[name='q']");
			$searchSubmit = $searchForm.find("input[type='submit']");
			fieldDefault = defaultValue;
			
			$("#product-theater .theater .search").click(function(){
				if(!$cache.searchExpanded) {
					expandSearch ();
				}				
				if(!$resultsContainer) {
					// create results container if needed
					$resultsContainer = $("<div/>").attr("id", "suggestions").appendTo($searchContainer).css({
					"top" : $searchContainer[0].offsetHeight,
					"left" : 0,
					"width" : $searchField[0].offsetWidth
					});
				}
			});

			// end private

			// disable browser auto complete
			$searchField.attr("autocomplete", "off");

			// open form when icon clicked
			$searchSubmit.click( function(e){
				if(!$cache.searchExpanded) {
					e.preventDefault();
					expandSearch ();
				}
			});
			
			
			// on focus listener (clear default value)
			$searchField.focus(function () {
				if(!$cache.searchExpanded) {
					expandSearch ();
				}				
				
				if(!$resultsContainer) {
					// create results container if needed
					$resultsContainer = $("<div/>").attr("id", "suggestions").appendTo($searchContainer).css({
						"top" : $searchContainer[0].offsetHeight,
						"left" : 0,
						"width" : $searchField[0].offsetWidth
					});
				}
				
			});
			// on blur listener
			$searchField.blur(function () {
				setTimeout(app.searchsuggest.clearResults, 200);
			});
			
			// on key up listener
			$searchField.keyup(function (e) {

				// get keyCode (window.event is for IE)
				var keyCode = e.keyCode || window.event.keyCode;

				// check and treat up and down arrows
				if(handleArrowKeys(keyCode)) {
					return;
				}
				// check for an ENTER or ESC
				if(keyCode === 13 || keyCode === 27) {
					app.searchsuggest.clearResults();
					$searchForm.submit();
					return;
				}

				var lastVal = $searchField.val();

				// if is text, call with delay
				setTimeout(function () { app.searchsuggest.suggest(lastVal); }, delay);
			});
			
			// on submit we do not submit the form, but change the window location
			// in order to avoid https to http warnings in the browser
			// only if it's not the default value and it's not empty
			$searchForm.submit(function (e) {
				e.preventDefault();
				var searchTerm = $searchField.val();
				if(searchTerm === fieldDefault || searchTerm.length === 0) {
					return false;
				}
				window.location = app.util.appendParamToURL($(this).attr("action"), "q", escape(searchTerm).split("%20").join("-"));
			});
		},
		// trigger suggest action
		suggest : function (lastValue) {
			// get the field value
			var part = $searchField.val();

			// if it's empty clear the resuts box and return
			if(part.length === 0) {
				app.searchsuggest.clearResults();
				return;
			}

			// if part is not equal to the value from the initiated call,
			// or there were no results in the last call and the query length
			// is longer than the last query length, return
			// #TODO: improve this to look at the query value and length
			if((lastValue !== part) || ($cache.listTotal === 0 && part.length > qlen)) {
				return;
			}
			qlen = part.length;

			// build the request url
			var reqUrl = app.util.appendParamToURL(app.urls.searchsuggest, "q", escape(part).split("%20").join("-"));

			// get remote data as JSON
			$.getJSON(reqUrl, function (data) {
				// get the total of results
				var suggestions = data,
					ansLength = suggestions.length,
					listTotal = ansLength;
				
				$cache.listTotal = listTotal;
				
				if(ansLength > 5){ ansLength = 5; }
				
				// if there are results populate the results div
				if(ansLength === 0) {
					app.searchsuggest.clearResults();
					return;
				}
				suggestionsJson = suggestions;
				var html = "";
				var i, len=ansLength;
				//var i, len=5;
				for(i=0; i < len; i++) {
					html+='<div><div class="suggestionterm">'+suggestions[i].suggestion+'</div><span class="hits">'+suggestions[i].hits+'</span></div>';
				}

				// update the results div
				$resultsContainer.html(html).show().on("hover", "div", function () {
					$(this).toggleClass = "selected";
				}).on("click", "div", function () {
					// on click copy suggestion to search field, hide the list and submit the search
					$searchField.val($(this).children(".suggestionterm").text());
					app.searchsuggest.clearResults();
					$searchForm.trigger("submit");
				});
			});
		},
		clearResults : function () {
			if (!$resultsContainer) { return; }
			$resultsContainer.empty().hide();
		}
	};
}(window.app = window.app || {}, jQuery));

// app.searchplaceholder
(function (app, $) {
	
	function initializeEvents() {
		$('#q').focus(function () {
			var input = $(this);
			if (input.val() === input.attr("placeholder")) {
				input.val("");
			}
		})
		.blur(function () {
			var input = $(this);
			if (input.val() === "" || input.val() === input.attr("placeholder")) {
				input.val(input.attr("placeholder"));
			}
		})
		.blur();
	}
	
	app.searchplaceholder = {
		init : function () {
			initializeEvents();
		}
	};
}(window.app = window.app || {}, jQuery));


//app.responsive
(function (app, $) {
	
	$cache = {
		triggerMobileWidth : 640,
		navigation : $('#navigation'),
		body : $('body')
	}
	
	function mobileTooltips(){
		$('a.tooltip').click(function(){
			$(this).toggleClass('active');
		});
	}

	function initPdp() {
		if( ( $cache.body.hasClass('mobile') ) && ( $('#pdpMain').size() !== 0 ) && ( !$('#pdpMain').hasClass('processed') ) ) {
			$('#pdpMain').addClass('processed');
			var mobileTabs = $('.product-tabs').clone();
			mobileTabs.addClass('mobile-tabs');
			$('.product-disclaimer-block').before(mobileTabs);
		}
	}
	
	function initCheckout() {
		if( ( $cache.body.hasClass('mobile') ) && ( $('.item-list-summary').size() !== 0 ) ) {
			
			var orderTable = $('.item-list-summary');
			orderTable.find('td.order-shipping-detail').each(function(){
				$(this).appendTo($(this).parent().parent());
			});
		}
	}
	
	function resetDom () {
		if( $cache.body.hasClass('mobile') ) {
			
			app.zoomViewerEnabled = false;
			app.isMobileUserAgent = true;
			
			initPdp();
			initCheckout();
			
		}
		else {
			
			app.zoomViewerEnabled = true;
			app.isMobileUserAgent = false;
			
			$cache.navigation.find('.active').removeClass('active');
			$cache.navigation.find('.block-menu').hide();
			$cache.navigation.find('#menu-category, #menu-category ul.level-2 li:first').addClass('active');
			$cache.navigation.find('.nav-close').remove();
		}
		
		app.storefront.init();
	}
	
	function initializeEvents() {

		app.isMobileUserAgent = false;
		app.zoomViewerEnabled = true;
	
		mobileTooltips();
		
		// check to see if we need to do anything on load
		if( $cache.body.width() < $cache.triggerMobileWidth ) {
			$cache.body.addClass('mobile');
			$cache.navigation.find('.active').removeClass('active');
			resetDom();
		}
		
		// set up listener for browser resize
		$(window).smartResizeListener(function(){

			// test document width
			if( $('body').width() < $cache.triggerMobileWidth ) {
				$('body').addClass('mobile');
				resetDom();
			}
			else {
				$('body').removeClass('mobile');
				resetDom();
			}
			
		});
		
	}
	
	app.responsive = {
			
		init : function () {
			initializeEvents();
		}
	
	};
	
}(window.app = window.app || {}, jQuery));


// jquery extensions
(function ($) {
	// params
	// toggleClass - required
	// triggerSelector - optional. the selector for the element that triggers the event handler. defaults to the child elements of the list.
	// eventName - optional. defaults to 'click'
	$.fn.toggledList = function (options) {
		if (!options.toggleClass) { return this; }

		var list = this;
		function handleToggle(e) {
			e.preventDefault();
			var classTarget = options.triggerSelector ? $(this).parent() : $(this);
			classTarget.toggleClass(options.toggleClass);
			// execute callback if exists
			if (options.callback) { options.callback(); }
		}

		return list.on(options.eventName || "click", options.triggerSelector || list.children(), handleToggle);
	};

	$.fn.syncHeight = function () {
		function sortHeight(a, b) {
			return $(a).height() - $(b).height();
		}

		var arr = $.makeArray(this);
		arr.sort(sortHeight);
		return this.height($(arr[arr.length-1]).height());
	};
	
	  $.fn.setCursorPosition = function(pos) {
		    if ($(this).get(0).setSelectionRange) {
		      $(this).get(0).setSelectionRange(pos, pos);
		    } else if ($(this).get(0).createTextRange) {
		      var range = $(this).get(0).createTextRange();
		      range.collapse(true);
		      range.moveEnd('character', pos);
		      range.moveStart('character', pos);
		      range.select();
		    }
		  };
		  
	   $.fn.smartResizeListener = function(fn) {
		   
			  var debounce = function (func, threshold, execAsap) {
			      var timeout;
			 
			      return function debounced () {
			          var obj = this, args = arguments;
			          function delayed () {
			              if (!execAsap)
			                  func.apply(obj, args);
			              timeout = null; 
			          };
			 
			          if (timeout)
			              clearTimeout(timeout);
			          else if (execAsap)
			              func.apply(obj, args);
			 
			          timeout = setTimeout(delayed, threshold || 300); 
			      };
			  }
			  
			  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
	   };
		
	   $.fn.smartScrollListener = function(fn) {

		   var debounce = function (func, threshold, execAsap) {
		       var timeout;
		  
		       return function debounced () {
		           var obj = this, args = arguments;
		           function delayed () {
		               if (!execAsap)
		                   func.apply(obj, args);
		               timeout = null; 
		           };
		  
		           if (timeout)
		               clearTimeout(timeout);
		           else if (execAsap)
		               func.apply(obj, args);
		  
		           timeout = setTimeout(delayed, threshold || 300); 
		       };
		   }
		   
		 	return fn ? this.bind('scroll', debounce(fn)) : this.trigger(sr);
		 	
	   };
	  
}(jQuery));

// general extension functions
(function () {
	String.format = function() {
		var s = arguments[0];
		var i,len=arguments.length - 1;
		for (i = 0; i < len; i++) {       
			var reg = new RegExp("\\{" + i + "\\}", "gm");             
			s = s.replace(reg, arguments[i + 1]);
		}
		return s;
	};
})();

// initialize app
jQuery(document).ready(function () {
	if(!app.resources.DISABLE_RESPONSIVE){
		app.responsive.init();
	}
	app.init();
});

//add code to fix Placeholder html5 IE issue fix
/* <![CDATA[ */
$(function() {
	var input = document.createElement("input");
    if(('placeholder' in input)==false) { 
		$('[placeholder]').focus(function() {
			var i = $(this);
			if(i.val() == i.attr('placeholder')) {
				i.val('').removeClass('placeholder');
				if(i.hasClass('password')) {
					i.removeClass('password');
					this.type='password';
				}			
			}
		}).blur(function() {
			var i = $(this);	
			if(i.val() == '' || i.val() == i.attr('placeholder')) {
				if(this.type=='password') {
					i.addClass('password');
					this.type='text';
				}
				i.addClass('placeholder').val(i.attr('placeholder'));
			}
		}).blur().parents('form').submit(function() {
			$(this).find('[placeholder]').each(function() {
				var i = $(this);
				if(i.val() == i.attr('placeholder'))
					i.val('');
			})
		});
	}
});
/* ]]> */
