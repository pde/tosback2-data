var isiPad = navigator.userAgent.match(/iPad/i) != null;
var isiAndroid = navigator.userAgent.toLowerCase().match(/android/i) != null;
var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormat.masks = {
	"default":      "ddd mmm dd yyyy HH:MM:ss",
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};



/*
 * All java script logic for the application.
 *
 * The code relies on the jQuery JS library to
 * be also loaded.
 */

if(Array.prototype.indexOf == undefined){
    Array.prototype.indexOf =  function(o){
        for (var i = 0, len = this.length; i < len; i++){
            if(this[i] == o) return i;
        }
        return -1;
    }
}

var app = (function(jQuery){

	if (!jQuery) {
		alert(app.resources["MISSING_LIB"]);
		return null;
	}
	
	// Global dw private data goes here	

	// dw scope public
	return {
		URLs			: {}, // holds dw specific urls, check htmlhead.isml for some examples
		resources		: {},  // resource strings used in js
		constants		: {}, // platform constants, initialized in htmlhead.isml
		containerId		: "content",
		ProductCache	: null,  // app.Product object ref to the current/main product
		clearDivHtml	: "<div class=\"clear\"><!-- W3C Clearing --></div>",
		currencyCodes	: {}, // holds currency code/symbol for the site
		date            : {},
		
		stripAkamai : function( akamaizedUrl){
			
			var strippedAkamaiUrl = akamaizedUrl;
			try {
				if( strippedAkamaiUrl.indexOf("/on/")>-1 ) {				
					strippedAkamaiUrl = strippedAkamaiUrl.substring(strippedAkamaiUrl.indexOf("/on/"), strippedAkamaiUrl.length);
				}	
			}
			catch (e) {
				strippedAkamaiUrl = akamaizedUrl;
			}
			return strippedAkamaiUrl;
		},
		showVideoPopup : function (url, img){
			var DialogID="ProductVideoDialog";
			var DialogTitle = " ";
			var DialogWidth="973px";
			var DialogHeight="534px";
			 
			if (jQuery("#" + DialogID).length == 0) {
				jQuery("<div/>").attr("id", DialogID).appendTo(document.body);
			}
			if(!DialogTitle) DialogTitle = app.resources[tittle];
			app.createDialog({id: DialogID, options: {
				width: DialogWidth,
				height: DialogHeight,
				title: DialogTitle,
				close: function(event, ui) {
				 jQuery('#ProductVideoDialog').html('');
		    }

			}});
			jQuery("#"+DialogID).dialog('open').empty().html(app.showProgress("productloader"));
			var UUU = app.URLs.productVideoPopup + '?pid=' + url+'&imagepath='+img;
			jQuery("#"+DialogID).load(UUU);
		},
		// default dialog box settings
		dialogSettings: {
				bgiframe: true, // this is required mainly for IE6 where drop downs bleed into dialogs!!! it depends on 
				autoOpen: false,
				buttons: {},
				modal: true,
				overlay: {
		    		opacity: 0.5,
		     		background: "black"
				},
		    	height: 530,
		    	width: 800,
		    	title: '',
		    	// show: "slow", This is causing dialog to break in jquery 1.3.2 rel, show: "slide" works but not desired
		    	hide: "normal",
		    	resizable: false
		},

		// default tooltip settings
		tooltipSettings: {
				delay: 0,
				showURL: false,
				extraClass: "tooltipshadow tooltipshadow02",
				top: 15,
				left: 5
		},

		// global form validator settings
		validatorSettings: {
			errorClass : 'errormessage',
			errorElement: 'span',
			
		    onfocusout: function(element) {
				if ( !this.checkable(element) ) {
					this.element(element);
				}				
			},
		
			highlight: function(element, errorClass){
				jQuery(element).addClass('error').removeClass('done');
				var idOrName = this.idOrName(element);
				jQuery("span.errordone").filter("[for='" + idOrName + "']").remove();
				var errorAlerts = jQuery("span.erroralert").filter("[for='" + idOrName + "']");
				if (!errorAlerts.length){
					this.showLabel(element, "");
					var errorAlert = jQuery("<span class='erroralert'>&nbsp;</span>")
					.attr({"for":  idOrName})
					errorAlert.insertAfter(element);
					
				}
				
			},
			
			unhighlight: function(element, errorClass){
				var idOrName = this.idOrName(element);
				jQuery(element).removeClass('error');
				jQuery("span.erroralert").filter("[for='" + idOrName + "']").remove();
				if (jQuery(element).hasClass('email')){
					jQuery(element).addClass('done');
					var errorDones = jQuery("span.errordone").filter("[for='" + idOrName + "']");
					if (!errorDones.length){
						this.showLabel(element, "");
						var errorDone = jQuery("<span class='errordone'>&nbsp;</span>")
						.attr({"for":  idOrName})
						errorDone.insertAfter(element);
						
					}
				}
			}
		},

		searchbutton: {
			searchclose:  function(){
				jQuery('.#iconnav #searchli #searchpop').fadeOut('slow');
			},
			searchhover: function(){
				app.searchbutton.op = 'close';
				jQuery('#iconnav #searchli a').mouseenter(function(){
					if(app.searchbutton.op != 'open'){
						app.searchbutton.timer = null;
						app.searchbutton.op = 'open';
						jQuery('#iconnav #searchli #searchpop').fadeIn('slow');
						app.minicart.close(0);
					}
					return false;
				});
				jQuery('#iconnav #searchli').mouseleave(function(){
					
					app.searchbutton.timer = setTimeout( 'app.searchbutton.searchclose()', 1 );
					app.searchbutton.op = 'close';
					return false;
				});
				jQuery('#iconnav #searchli a').click(function(){
					return false;
				});
			}
		},

		// app initializations called from jQuery(document).ready at the end of the file
		init: function() {
			//loads menu
			jQuery("ul.level1").superfish(); 
		 
			if(isiAndroid){
				jQuery('.sf-with-ul').click(function(){
					return false;
				})
				jQuery('.sf-with-ul').dblclick(function(){
					jQuery(this).click();
					return true;
				})
				
			}
			app.searchbutton.searchhover()
			//load icon rollover
			
			// NEW text hover rollovers for better SEO results - (added 3-12-12)
			jQuery('.hovertext').mouseenter(function(){
	 
				jQuery( '.hovertextdiv' , this).fadeIn('slow');
											   
			}).mouseleave(function(){
		 
				jQuery( '.hovertextdiv' , this).fadeOut('slow');
		
		});

			if(!isiPad){
					jQuery("a img").hoverIntent(
					function() {
						if(!jQuery(this).parent().hasClass('imageInfoLink'))jQuery(this).animate({opacity: 0.5},450);
				    },
				    function() {
				    	if(!jQuery(this).parent().hasClass('imageInfoLink'))jQuery(this).animate({opacity: 1},450);
				    });
				
			}
				jQuery('#livechatheader a').hover(function(){
	          		 
	          		app.minicart.close();
	          		app.searchbutton.searchclose();
	          
	          	});
	          	jQuery('#livechatheader a.popChat').click(function(){
	          		
	          		window.open(jQuery(this).attr('href'), "Chat","location=1,status=1,scrollbars=1, width=420,height=450");
	          		return false;
	          	});

			// register initializations here
			
			// quick view dialog div
			jQuery("<div/>").attr("id", "QuickViewDialog").html(" ").appendTo(document.body);

			// micicart object initialization
			this.minicart.init();
			
			// execute unobtrusive js code
			this.execUjs();
			
			// renders horizontal/vertical carousels for product slots
			jQuery('#horicarousel').jcarousel({
	        	scroll: 1,
				itemVisibleInCallback: app.captureCarouselRecommendations
		    });

		    jQuery('#vertcarousel').jcarousel({
		        scroll: 1,
				vertical: true,
				itemVisibleInCallback: app.captureCarouselRecommendations
		    });	
		},
		
		debug: function (message) {
            if (window.console != undefined) {
                console.debug(message);
            }
        },
		
		error: function (message) {
		    if (window.console != undefined) {
		        console.error(message);
		    }
		},
	
		// sub namespace app.ajax.* contains application specific ajax components
		ajax: {
			Success: "success",
			currentRequests: {}, // request cache

			// ajax request to get json response
			// @param - reqName - String - name of the request
			// @param - async - boolean - asynchronous or not
			// @param - url - String - uri for the request
			// @param - data - name/value pair data request
			// @param - callback - function - callback function to be called
			getJson: function(options) {
				var thisAjax = this;

				// do not bother if the request is already in progress
				// and let go null reqName
				if (!options.reqName || !this.currentRequests[options.reqName]) {
					this.currentRequests[options.reqName] = true;
					if(options.async == "undefined") options.async = true;
					// make the server call
					jQuery.ajax({
						contentType: "application/json; charset=utf-8",
						dataType: "json",
						url		: options.url,
						cache	: true,
						async	: options.async,
						data	: options.data,

						success: function(response, textStatus) {
							thisAjax.currentRequests[options.reqName] = false;

							if (!response.Success) {
								// handle failure
							}

							options.callback(response, textStatus);
						},

						error: function(request, textStatus, error) {
							if (textStatus === "parsererror") {								
								alert(app.resources["BAD_RESPONSE"]);
							}
							//alert(textStatus)
							options.callback({Success: false, data:{}});
						}
					});
				}
			},

			// ajax request to load html response in a given container
			// @param - reqName - String - name of the request
			// @param - url - String - uri for the request
			// @param - data - name/value pair data request
			// @param - callback - function - callback function to be called
			// @param - selector - string - id of the container div/span (#mycontainer) - it must start with '#'
			load: function(options) {

				var thisAjax = this;

				// do not bother if the request is already in progress
				// and let go null reqname
				if (!options.reqName || !this.currentRequests[options.reqName]) {
					this.currentRequests[options.reqName] = true;
					// make the server call
					jQuery.ajax({
						dataType: "html",
						url		: options.url,
						cache	: true,
						data	: options.data,

						success: function(response, textStatus) {
							thisAjax.currentRequests[options.reqName] = false;
							
							if (options.selector) {
								jQuery(options.selector).html(response);
							}

							(options.callback != undefined ? options.callback(response, textStatus): null)
						},

						error: function(request, textStatus, error) {
							if (textStatus === "parsererror") {								
								alert(app.resources["BAD_RESPONSE"]);
							}

							options.callback(null, textStatus);
						}
					});
				}
			}
		},

		// loads a product into a given container div
		// params
		// 		containerId - id of the container div, if empty then global app.containerId is used
		//		source - source string e.g. search, cart etc.
		//		label - label for the add to cart button, default is Add to Cart
		//		url - url to get the product
		//		id - id of the product to get, is optional only used when url is empty
		getProduct: function(options) { // id, source, start
			var cId 		= options.containerId || app.containerId;
			var source 		= options.source || "";
			var a2cBtnLabel = options.label || null;

			// show small loading image
			jQuery("#"+cId).html(app.showProgress("productloader"));

			var productUrl = options.url ? options.url : app.util.appendParamToURL(app.URLs.getProductUrl, "pid", options.id);
						
			productUrl = app.util.appendParamToURL(productUrl, "source", source);

			app.ajax.load({selector: "#"+cId, url: productUrl, callback: function(responseText, textStatus){
				// update the Add to cart button label if one provided
				if(a2cBtnLabel != null){
					var qButton = jQuery("#"+cId+" .addtocartbutton:last");
					qButton.html("<span>" + a2cBtnLabel + "</span>");
				}
				
				jQuery('#facebook').html('<iframe src="http://www.facebook.com/plugins/like.php?href='+productUrl.replace('&source=quickview','')+'&amp;send=false&amp;layout=button_count&amp;width=80&amp;show_faces=true&amp;action=like&amp;colorscheme=light&amp;font=verdana&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:80px; height:21px;" allowTransparency="true"></iframe>')
				
			}});
			
		},

		// sub name space app.minicart.* provides functionality around the mini cart
		minicart: {
			url   : '',  // during page loading, the Demandware URL is stored here
			timer : null, // timer for automatic close of cart item view

			// initializations
			init: function() {
				// reset all the existing event bindings
				app.minicart.reset();
				
				app.minicart.op = 'close';
				jQuery('#minicart .minicarttotal a').mouseenter(function(){
					if(app.minicart.op != 'open'){
						app.minicart.timer = null;
						app.minicart.op = 'open';
						jQuery('#minicart .minicartcontent').fadeIn('slow');
						
					}
					return false;
				});
				jQuery('#minicart').mouseleave(function(){
					
					app.minicart.timer = setTimeout( 'app.minicart.close(0)', 1 );
					app.minicart.op = 'close';
					return false;
				});
				 
			 
		/*
		
				// bind hover event to the cart total link at the top right corner
				jQuery(".minicarttotal").hover(function(e){(app.minicart.isShow() ? '': app.minicart.slide());
	 
				});
			
				jQuery('.minicartcontent')
				.mouseenter(function(e) {
					clearTimeout(app.minicart.timer);
					app.minicart.timer = null;
				});
				jQuery('.minicartcontent').mouseleave(function(e) {
					clearTimeout(app.minicart.timer);
					app.minicart.timer = null;
					// after a time out automatically close it
					app.minicart.timer = setTimeout( 'app.minicart.close()', 30 );
				});
					
				// register close button event
				jQuery('.minicartcontent .minicartclose').click(function() {
					// reset all the events bindings
					app.minicart.reset();
					app.minicart.close(0);
				});*/
			},
			
			// returns a boolean if a minicart is visible/shown or hidden
			isShow: function() {
				return jQuery('.minicartcontent').css('display') == 'none' ? false : true;
				  
			},
			
			// reset minicart
			reset: function() {
				jQuery(".minicarttotal").unbind("hover");
				jQuery('.minicartcontent').unbind("mouseenter").unbind("mouseleave");
				jQuery('.minicartcontent .minicartclose').unbind("click");
			},

			// shows the given content in the mini cart
			show: function(html) {
				jQuery('#minicart').html(html);
			 
				// bind all the events
				app.minicart.init();
				
				if(app.minicart.suppressSlideDown && app.minicart.suppressSlideDown()) {
					// do nothing
					// the hook 'MiniCart.suppressSlideDown()' should have done the refresh
				}
				else {
					app.minicart.slide();
				}
			},
			
			// slide down and show the contents of the mini cart
			slide: function() {
				if(app.minicart.suppressSlideDown && app.minicart.suppressSlideDown() || isProductPage) {
					return;
				}
				jQuery('html, body').animate( { scrollTop: 0 }, 'slow' );	
				// show the item
				//old slide down jQuery('.minicartcontent').slideDown('slow');//show("slide", { direction: "up" }, 1000);
				jQuery('.minicartcontent').fadeIn('slow'); 

				clearTimeout(app.minicart.timer);
				app.minicart.timer = null;
					
				// after a time out automatically close it
				app.minicart.timer = setTimeout( 'app.minicart.close()', 6000 );
			},

			// adds a product to the mini cart
			// @params
			// progressImageSrc - source/url of the image to show when the item is being added to the cart
			// postdata - form data containing the product information to be added to mini-cart
			// callback - call back function/handler
			add: function(progressImageSrc, postdata, callback)
			{	
				// get the data of the form as serialized string
				var postdata = postdata;
				
				//handling for giftcard form values
				if(jQuery('#giftcard-form form').length > 0) {
					var postString = "";
					
					jQuery.each(postdata, function(key, elem) {
					    postString += key + "=" + elem + "&";
					});
					
					postdata = postString + jQuery('#giftcard-form form').serialize();		
					
					//clear fields
					jQuery('#giftcard-form form input, #giftcard-form form textarea').each(function(i, item) {
						$(item)[0].value = "";
					});
				}

				// get button reference
				var addButtons = [];

				// the button to update
				var addButton = null;
				
				// it is an array of buttons, but we need only one all
				// other combinations are strange so far
				if (addButtons.length == 1)	{
					addButton = addButtons[0];
				}

				var previousImageSrc = null;

				// show progress indicator
				if (addButton != null) {
					previousImageSrc = addButton.src;
					addButton.src = progressImageSrc;
				}

				// handles successful add to cart
				var handlerFunc = function(req)	{
					// hide progress indicator
					if (addButton != null) {
						addButton.src = previousImageSrc;
					}

					// replace the content
					jQuery('#minicart').html(req);

					// bind all the events
					app.minicart.init();
					
					if(app.minicart.suppressSlideDown && app.minicart.suppressSlideDown()) {
						// do nothing
						// the hook 'MiniCart.suppressSlideDown()' should have done the refresh
					}
					else {
						app.minicart.slide();

						if (callback) callback();
					}
				}

				// handles add to cart error
				var errFunc = function(req) {
					// hide progress indicator
					if (addButton != null) {
						addButton.src = previousImageSrc;
					}				
				}

				// closes a previous mini cart
				app.minicart.close();

				// add the product
				jQuery.ajax({
								type	: "POST",
								url		: app.minicart.url,
								cache	: true,
								data	: postdata,
								success	: handlerFunc,
								error	: errFunc
							});
			},

			// closes the mini cart with given delay
			close: function(delay) {
				if ( app.minicart.timer != null || delay == 0) {
					clearTimeout( app.minicart.timer );
					app.minicart.timer = null;					
					jQuery('.minicartcontent').fadeOut(); // hide with "slide" causes to fire mouse enter/leave events sometimes infinitely thus changed it to fadeOut
				}
			},

			// hook which can be replaced by individual pages/page types (e.g. cart)
			suppressSlideDown: function() {
				
				return false;
			}
		},

		// close quick view dialog if open and refresh the page
		refreshCart: function() {
			app.quickView.close();

			// refresh without posting
			location.href = location.href;
		},

		// Product quick view object
		quickView: {
			
			// bind browser events
			// options
			// buttonSelector - css selector for the quickview button
			// imageSelector - css selector for product image
			// buttonLinkSelector - css selector for quickview button link (a tag)
			// productNameLinkSelector - css selector for product name link (a tag)
			bindEvents: function(options) {
				if(isiPad) return;
				// hide quickview buttons
				jQuery(options.buttonSelector).hide();
				
				// hovering
				jQuery(options.imageSelector).hover(
					function(e) {
						jQuery(this).children(options.buttonSelector).show();
						return false;
					},
					function(e) {
						jQuery(this).children(options.buttonSelector).hide();
						return false;
					}
				);

				// click binding for quick view
				jQuery(options.buttonLinkSelector).click(function(e) {
					app.quickView.show({url: this.href, source: "quickview"});
					return false;
				});

				/*
				To make bookmarking and browser back-button work correctly the browser URL needs 
				to change. To force that change we do a full-page load (not AJAX) when going from 
				search result page to product detail page.
				The implementation supports loading the product detail content with AJAX: just 
				uncomment this code block to bind the event handler.
				
				// click binding for name link
				if(options.productNameLinkSelector) {
					jQuery(options.productNameLinkSelector).click(function(e) {
						app.getProduct({url: this.href, source: "search"});
						return false;
					});
				}
				*/
				isQuickView = true;
			},

			// show quick view dialog and send request to the server to get the product
			// options.source - source of the dialog i.e. search/cart
			// options.url - product url
			show: function(options) {
				app.createDialog({id: 'QuickViewDialog', options: {
			    	height: 530,
			    	width: 850,
			    	dialogClass: 'quickview',
			    	title: '',
			    	resizable: false
				}});
				isQuickView = true;
			    jQuery('#QuickViewDialog').dialog('open');
			    
			   
			    app.getProduct({containerId: "QuickViewDialog", source: options.source, url: options.url, label: options.label});
			},
			// close the quick view dialog
			close: function() {
				jQuery('#QuickViewDialog').dialog('close');
			}
		},

		// helper method to create a dialog with the given options
		// options - dialog box options along with id of the container
		createDialog: function(options) {
			jQuery('#'+options.id).dialog(jQuery.extend({}, app.dialogSettings, options.options));
		},

		// shows tooltip popup
		// options
		// id - id of the container
		// options - tooltip popup options
		tooltip: function(options) {
			if (options.id.charAt(0) !== '#') {
				options.id = "#"+options.id;
			}
			jQuery(options.id).tooltip(jQuery.extend({}, app.tooltipSettings, options.options));
		},
		
		/**
		 * Unobtrusively build tooltips on the page.
		 * it looks for a tooltip class anchor which contains a div with tooltip-body class as the body container.
		 */
		tooltipDefault: function () {	 
			 jQuery(document).ready(function() {
				jQuery(".tooltip").tooltip(jQuery.extend({}, app.tooltipSettings, {	
						bodyHandler: function() {
							return jQuery(this).children(".tooltip-body").html();
						}
					}
				));
			 });			
		},

		// renders a progress indicator on the page; this function can be used
		// to indicate an ongoing progress to the user; the optional parameter "className"
		// can be used to attach an additional CSS class to the container
		showProgress : function(className) {
			var clazz = "loading";
			if (className) clazz += " " + className;
			return jQuery("<div class=\"" + clazz + "\"/>").append(jQuery("<img/>").attr("src", app.URLs.loadingSmallImg));
		},

		// validation plugin intialization
		validator: function() {
			// override default required field message
			jQuery.validator.messages.required = function($1, ele, $3) {
				return "";
			};
			
			/**
			 * Add phone validation method to jQuery validation plugin.
			 * Text fields must have 'phone' css class to be validated as phone
			 * phoneUS is copied from http://docs.jquery.com/Plugins/Validation/CustomMethods/phoneUS
			 */
			jQuery.validator.addMethod("phone", function(phone_number, element) {
				phone_number2 = phone_number.replace(/[\(\)\.\-\s,]/g, "");
				return phone_number2.search(/^[\d-+() ]*$/) != -1;
			}, app.resources["INVALID_PHONE"]);

			jQuery.validator.addMethod("zipvalidate", function(zip, element) {
				return zip == '' || zip.search(/(^W\d\w?$)|(^[a-zA-Z]{1,2}\d{1,2}[a-zA-Z ]{0,2}\d[a-zA-Z]{2}$)/i) != -1;
			}, app.resources["INVALID_ZIP"]);

			/**
			 * Add positive number validation method to jQuery validation plugin.
			 * Text fields must have 'positivenumber' css class to be validated as positivenumber
			 * it validates a number and throws error if it is below 0 or if it is not a number.
			 */
			jQuery.validator.addMethod("positivenumber", function(value, element) {
				if (value == '') return true;				
				return /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(value) && Number(value) >= 0;
			}, ""); // "" should be replaced with error message if needed
			
			// register form validator for form elements
			// except for those which are marked "suppress"
			jQuery.each(jQuery("form:not(.suppress)"), function() {
				jQuery(this).validate(app.validatorSettings);
			});
		},

		/**
		 * grab anything inside a hidden dom element and append it to its immediate previous sibling
		 * as data attribute i.e. jQuery().data("data", hiddenStr)
		 * if the hidden data specifies json in the class then this routine would attempt to 
		 * convert the hidden data into json object before adding it as data attribute.
		 * after adding the data, the hidden span/element is removed from the DOM.
		 */
		hiddenData : function() {
			jQuery.each(jQuery(".hidden"), function() {
				var hiddenStr = jQuery(this).html();
				
				if (hiddenStr === "") {
					return;
				}
				
				// see if its a json string
				if (jQuery(this).hasClass("json")) {
					// try to parse it as a json
					try {
						hiddenStr = window["eval"]("(" + hiddenStr + ")");
					}
					catch(e) {}				
				}
				
				jQuery(this).prev().data("data", hiddenStr);
				
				jQuery(this).remove();
			});
		},
		
		/**
		 * Process country drop downs and attach a change listener so that phone field 
		 * can be validated properly based on the currently selected country.
		 */
		addCountryListener: function() {
			var countryHandler = function(e) {
				var selectedCountry = this.options[this.selectedIndex].value;
				// for each field of type phone in the current form, set its country as a data attribute
				// to be used while doing phone field validatiaon see app.validator addMethod.
				jQuery(this).parents("form:first").find("input.phone").each(function() {
					var data = jQuery(this).data("data");
					var currentData = (data && typeof data == 'object') ? data : {};
					currentData.country = selectedCountry;
					jQuery(this).data("data", currentData);
				});						
			}
			jQuery("select.country").change(countryHandler).each(countryHandler);
		},
		
		/**
		 * Unobtrusive js api calls go here.
		 */
		 execUjs: function() {
			// process hidden data in the html markup and cnnvert it into data object(s)
			this.hiddenData();
			
			// initialize form validator plugin
			this.validator();
			
			// process country form fields and attach listeners
			this.addCountryListener();
			
			// process tooltips on the page
			this.tooltipDefault();
		},
		
		// capture recommendation of each product when it becomes visible in the carousel
		captureCarouselRecommendations : function(c, li, index, state) {
			jQuery(li).find(".captureproductid").each(function() {
				dw.ac.capture({id:this.innerHTML, type:dw.ac.EV_PRD_RECOMMENDATION});
			});
		},
		
		changeZipValidator : function(countryElement) {
			var selectedCountry = jQuery(countryElement).val();
			var zipElement = jQuery(".zip input"); 
			if (selectedCountry == 'GB'){
				zipElement.addClass('zipvalidate');
			} else {
				zipElement.removeClass('zipvalidate');
			}
			//Commented out to prevent it from highlighting in red when its not an error
			//zipElement.focus();
			countryElement.focus();		
		},	

		// sub namespace app.producttile.* contains utility functions for product tiles
		producttile : {
			// initializes all product tiles contained in the current page
			initAll: function() {
				// bind quick view button toggling and click
				var quickViewOptions = {
					buttonSelector: "div.producttile div.quickviewbutton",
					imageSelector: "div.producttile div.image",
					buttonLinkSelector: "div.producttile div.quickviewbutton a"
				};
				app.quickView.bindEvents(quickViewOptions);
				
				// prepare swatch palettes and thumbnails
				jQuery("div.producttile div.swatches div.invisible").hide();
				jQuery("div.producttile div.swatches a.swatch img.hiddenthumbnail").hide();
				
				// show the palette
				jQuery("div.producttile div.swatches > a").click(function(e) {
					var cont = jQuery(this).parent().find("div.palette");
					cont.show().focus();
					return false;
				});
				
				// hide the palette
				jQuery("div.producttile div.swatches div.invisible").mouseout(function(e) {
					// fix for event bubbling (http://www.quirksmode.org/js/events_mouse.html)
					if(!e) var e = window.event;
					var tg = (window.event) ? e.srcElement : e.target;
					if(tg.nodeName != 'DIV') return;
					var reltg = (e.relatedTarget) ? e.relatedTarget : e.toElement;
					while(reltg != tg && reltg.nodeName != 'BODY')
						reltg = reltg.parentNode
					if (reltg == tg) return;
					
					// mouseout took place when mouse actually left layer
					// handle event now
					jQuery(this).hide();
					return false;
				});
				
				// thumb nail toggling
				jQuery("div.producttile div.swatches div.palette a.swatch").bind("mouseover mouseout", function(e) {
					var swatch = jQuery(this);
					app.producttile.toggleVariationThumbnail(swatch);
				});
				
				// color swatch selection
				jQuery("div.producttile div.swatches div.palette a.swatch").click(function(e) {
					var swatch = jQuery(this);
					app.producttile.selectVariation(swatch);
					// omit following the swatch link
					return false;
				});
			},

			// selects a certain variation in a product tile, replaces the current image with
			// the correct variation image, changes the link to the detail
			// page and the quick view
			selectVariation : function(swatch) {
				// get the new and the original image
				var currentImg = jQuery(swatch.parents().parent()[3]).find(".productimage img");
				var newImg = swatch.children("img.hiddenthumbnail");
				if(!currentImg || !newImg) return;
				
				// get the anchors
				var nameAnchor = swatch.parents(".producttile").find(".name a");
				var quickViewAnchor = swatch.parents(".producttile").find(".quickviewbutton a");
				var imageAnchor = swatch.parents(".producttile").find(".productimage a");
				
				// change the link url to the detail page and quick view
				var newUrl = swatch.attr("href");
				nameAnchor.attr("href", newUrl);
				quickViewAnchor.attr("href", newUrl);
				imageAnchor.attr("href", newUrl);
				
				// remove all current markers
				jQuery(swatch.parents().parent()[0]).find("a.swatch").removeClass("selected");
				
				// mark swatch as selected
				swatch.addClass("selected");
				// we just remove the markers at the images; the actual elements
				// are correct, since they were already swapped by mouse over
				currentImg.removeClass("temp original");
				newImg.removeClass("temp original");
			},

			// shows the thumb nail of a product; this function is used to
			// temporally display a new image and restore the original one
			toggleVariationThumbnail : function(swatch) {
				// get the new and the original image
				 
				var currentImg = jQuery(swatch.parents().parent()[3]).find(".productimage img");
				var newImg = swatch.children("img.hiddenthumbnail");
				if(!newImg || !currentImg) return;
				
				var selectedSwatch = jQuery(swatch.parents().parent()[0]).find("a.selected");
				var selectedImg = selectedSwatch.children("img.hiddenthumbnail");

				// we do nothing in case the swatch is already selected
				if(swatch.hasClass("selected")) return;
				
				if(currentImg.hasClass("temp")) {
					// current image is just a temp image, restore original
					var newCopy = selectedImg.clone().show().removeClass("original hiddenthumbnail");
					currentImg.replaceWith(newCopy[0]);
					 
				} else {
					// we create a copy of the swatch image, replace
					// the current and mark it with classes
					var newCopy = newImg.clone().show().addClass("temp").removeClass("hiddenthumbnail");
					currentImg.replaceWith(newCopy[0]);
					 
				}
			}
		},

		// sub namespace app.util.* contains utility functions
		util : {
			// disables browser auto completion for the given element
			disableAutoComplete : function(elemId) {
				jQuery("#"+elemId).attr("autocomplete", "off");
			},
			submitForm : function( formId, actionName ,actionDescription )
			{
				var myForm = document.getElementById( formId );
				var elem = document.createElement("INPUT");
				elem.type = 'hidden';
				elem.name = actionName;
				var att = document.createAttribute("name");
				att.nodeValue = actionName;
				elem.setAttributeNode(att);
				elem.setAttribute("value","x");
	
				myForm.appendChild( elem );
	
				myForm.submit();
				return false;
			},
			traverseObj : function(obj, path) {
		   	    var arr = path.split('.'),
	   	        len = arr.length,
	   	        i = 0,
	   	        ret;
		   	    for ( ; i<len; i+=1 ) {
		   	        ret = !i
		   	            ? obj[arr[i]]
		   	            : ret[arr[i]];
		   	    }
		   	    return ret;
			},
			validateMyZip :  function(s) {
				 // Check for correct zip code
			     reZip = new RegExp(/(^\d{5}$)|(^\d{5}-\d{4}$)/);
			     if (!reZip.test(s)) { 
			          return app.resources["INVALID_ZIP"];
			     }

			return true;
			},
			getCookie : function(name) {
			    var nameEQ = name + "=";
			    var ca = document.cookie.split(';');
			    for(var i=0;i < ca.length;i++) {
			        var c = ca[i];
			        while (c.charAt(0)==' ') c = c.substring(1,c.length);
			        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
			    }
			    return null;
			},
			// trims a prefix from a given string, this can be used to trim
			// a certain prefix from DOM element IDs for further processing on the ID
			trimPrefix : function(str, prefix) {
				return str.substring(prefix.length);
			},

			// appends the parameter with the given name and
			// value to the given url and returns the changed url
			appendParamToURL : function(url, name, value) {
				var c = "?";
				if(url.indexOf(c) != -1) {
					c = "&";
				}
				return url + c + name + "=" + encodeURIComponent(value);
			},

			// dynamically loads a CSS file
			loadCSSFile : function(url) {
				var elem = document.createElement("link");
				elem.setAttribute("rel", "stylesheet");
				elem.setAttribute("type", "text/css");
				elem.setAttribute("href", url);

				if(typeof elem != "undefined") {
					document.getElementsByTagName("head")[0].appendChild(elem);
					app.util.loadedCSSFiles.push(url);
				}
			},

			// array to keep track of the dynamically loaded CSS files
			loadedCSSFiles : [],

			// removes all dynamically loaded CSS files
			clearDynamicCSS : function() {
				for(var i=0; i<app.util.loadedCSSFiles.length; i++) {
					app.util.unloadCSSFile(app.util.loadedCSSFiles[i]);
				}
			},

			// dynamically unloads a CSS file
			unloadCSSFile : function(url) {
				var candidates = document.getElementsByTagName("link");
				for(var i=candidates.length; i>=0; i--) {
					if(candidates[i] && candidates[i].getAttribute("href") != null && candidates[i].getAttribute("href").indexOf(url) != -1) {
						candidates[i].parentNode.removeChild(candidates[i]);
					}
				}
			},

			// checks if cookies are enabled
			cookiesEnabled : function() {
				// first we'll split this cookie up into name/value pairs
				// note: document.cookie only returns name=value, not the other components
				var all_cookies = document.cookie.split( ';' );
				var temp_cookie = '';
				var cookie_name = '';
				var cookie_value = '';
				var cookie_found = false; // set boolean t/f default f

				for ( i = 0; i < all_cookies.length; i++ )
				{
					// now we'll split apart each name=value pair
					temp_cookie = all_cookies[i].split( '=' );

					// and trim left/right whitespace while we're at it
					cookie_name = temp_cookie[0].replace(/^\s+|\s+$/g, '');

					// if the extracted name matches the session cookie name 
					if ( cookie_name == 'sid' )
					{
						// we need to handle case where cookie has no value but exists (no = sign, that is):
						if ( temp_cookie.length > 1 )
						{
							cookie_value = unescape( temp_cookie[1].replace(/^\s+|\s+$/g, '') );
						}

						if (cookie_value.length > 0)
						{
							cookie_found = true;
							break;
						}
					}
					temp_cookie = null;
					cookie_name = '';
				}
				return cookie_found;
			},
			
			/**
			 * IE 6 multiple button submit issue work around.
			 * when a form has multiple buttons of submit type, then IE 6 submits all of them
			 * whenever form is submitted. e.g. Remove on cart page would remove the wrong item
			 * (always first item in the cart) because IE 6 submits all form data which includes all 
			 * remove links!!!
			 * the workaorund is to disable all buttons except the one which is being clicked.
			 * it should only be called for IE 6 (check out htmlhead.isml for usage)
			 */
			ie6ButtonFix: function() {
				jQuery('button').click(function(){
		        	// disable all buttons
		        	jQuery(this.form).find('button').attr("disabled", true);
		        	// enable the one being clicked
		            jQuery(this).attr("disabled", false);
			    });
			}
		},

		// sub namespace app.dialog.* provides convenient functions to handle dialogs
		// note, that this code relies on single dialog modals (multi dialog, e.g. modal in modal is not supported)
		dialog : {
			
			// opens a dialog using the given url
			open : function(url, title, params) {
				if (!params){
					params = {};
				}
				
				// create the dialog container if not present already
				if(jQuery("#dialogcontainer").length == 0) {
					jQuery(document.body).append("<div id=\"dialogcontainer\"></div>");
				}
				jQuery("#dialogcontainer").hide();

				// set a default title
				title = title || "";

				// finally load the dialog, set the dialog title
				app.ajax.load({
					selector: "#dialogcontainer",
					url: url,
					callback: function(response, textStatus) {
					    if(params.show == undefined || params.show){
					    	 
					    	app.dialog.checkOpen({height:params.height, width:params.width});
					    }
						
						app.dialog.setTitle(title);
						var _topMin = 30;
						var _currScrollTop = parseInt(jQuery(window).scrollTop());
						var _currWinHeight = parseInt(jQuery(window).height());
						var _lightboxWrapper = jQuery("#dialogcontainer").parent();
						var _lightboxWrapperH = parseInt(_lightboxWrapper.outerHeight(true));
						var _newTop = parseInt( _currScrollTop + _currWinHeight/2 - _lightboxWrapperH/2 );
						var bodyH = jQuery('body').eq(0).height();
						_lightboxWrapper.addClass(params.xclass);
						if(_newTop<_topMin){
							_lightboxWrapper.css({'top': _topMin });
						}else{
							if(_newTop>=bodyH-_lightboxWrapperH-_topMin){
								if(bodyH-_lightboxWrapperH-_topMin<=_topMin) _lightboxWrapper.css({'top': _topMin });
								else _lightboxWrapper.css({'top': bodyH-_lightboxWrapperH-_topMin });
							}else{
								_lightboxWrapper.css({'top': _newTop });
							}
						}
						if(params.success) params.success(response, textStatus);
					}
				});
			},

			// initializes the dialog with common dialog actions, like closing upon canceling
			// use this function in the dialog rendering template to re-bind common actions
			// upon dialog reload
			init : function() {
				jQuery(document).ready(function() {
					// binds the action to all buttons defining an action through the "name" attribute
					jQuery("#dialogcontainer button").each(function() {
						jQuery(this).click(function() {
							var action = jQuery(this).attr("name");
							if(action) {
								app.dialog.submit(action);
							}
							return false;
						});
					});

					// cancel button binding
					jQuery("#dialogCancelBtn").click(function() {
						app.dialog.close();
						return false;
					});
					
				});
			},

			// sets the title of the dialog
			setTitle : function(title) {
				jQuery("#dialogcontainer").dialog("option", "title", title);
			},

			// checks, if the dialog is in the state "open" and sets the state if not presently set
			// this function is implicitly called by app.dialog.open(url, title) in order to initialize
			// the dialog properly; use this function to recover the "open" state of a dialog
			checkOpen : function(args) {
				if(args == undefined) args = {};
				 
				var height = args.height != undefined ? args.height : 560;
				var width = args.width != undefined ? args.width : 560;
				
				if(!jQuery("#dialogcontainer").dialog("isOpen"))
				{
					jQuery("#dialogcontainer").dialog({
						bgiframe: true,
						autoOpen: false,
						modal: true,
						overlay: {
				    		opacity: 0.5,
				     		background: "black"
						},
				    	height: height,
				    	width: width,
				    	resizable: false
					});
					jQuery("#dialogcontainer").dialog("open");
				}
				jQuery("#dialogcontainer").show();
			},

			// closes the dialog and triggers the "close" event for the dialog
			close : function() {
				jQuery("#dialogcontainer").dialog("close");
				jQuery(document.body).trigger("dialogClosed");
			},

			// attaches the given callback function upon dialog "close" event
			onClose : function(callback) {
				if(callback != undefined) {
					jQuery(document.body).bind("dialogClosed", callback);
				}
			},

			// triggers the "apply" event for the dialog
			triggerApply : function() {
				jQuery(document.body).trigger("dialogApplied");
			},

			// attaches the given callback function upon dialog "apply" event
			onApply : function(callback) {
				if(callback != undefined) {
					jQuery(document.body).bind("dialogApplied", callback);
				}
			},

			// triggers the "delete" event for the dialog
			triggerDelete : function() {
				jQuery(document.body).trigger("dialogDeleted");
			},

			// attaches the given callback function upon dialog "delete" event
			onDelete : function(callback) {
				if(callback != undefined) {
					jQuery(document.body).bind("dialogDeleted", callback);
				}
			},
			

			// submits the dialog form with the given action
			submit : function(action) {
				// set the action
				jQuery("#dialogcontainer form").append("<input name=\"" + action + "\" type=\"hidden\" />");

				// serialize the form and get the post url
				var post = jQuery("#dialogcontainer form").serialize();
				var url = jQuery("#dialogcontainer form").attr("action");

				// post the data and replace current content with response content
		  		jQuery.ajax({
				   type: "POST",
				   url: url,
				   data: post,
				   dataType: "html",
				   success: function(data){
		  				jQuery("#dialogcontainer").empty().html(data);
				   },
				   failure: function(data) {
					   alert(app.resources["SERVER_ERROR"]);
				   }
				});
			}
		}
	}
})(jQuery);

// application initialization on dom ready
jQuery(document).ready(function(){
	app.init();
	
});
