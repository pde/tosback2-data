/**
 * Barneys JavaScript Application
 * 
 * @module BNY
 */
window.BNY = window.BNY || {};

(function() {

	'use strict';

	var self = this,
		$ = jQuery;

	self.global = function() {

		var initialized = false;
		// Private methods
		var methods = {

			favorites: function() {
	
				// make an ajax call to add the item to your favorites
				var addItem = function(e) {
					e.preventDefault();
					
					// if the page is loading something, prevent the item from being added
					if (app.search && app.search.result.loading === true) {
						return;
					}

					if (!app.isUserLoggedIn && !app.rememberMeAvailable) {
						// stash the id of the element that was clicked in a cookie.
						cookieUtility.setCookie('add-on-reload', $(this).attr('id'), 1000);
						
						BNY.utilities.makeUserLogin();
						// exit with out adding the item
						return;
					}

					

					// the add/remove links
					var addLink = $(this),
						url = addLink.attr('href'),
						removeLink = addLink.next('a.remove-item-favorites'),
						listForm = $('.lists-form form');
					
					// add the list ID to the  url
					url = app.util.appendParamToURL(url, 'list', app.myListID)
					
					$.ajax({
						type: 'POST',
						url: url,
						success: function(data) {
							if (data.itemID) {

								if (data.refresh === 'true') {
									// reload the page
									window.location.reload();
								} else {

									// else, update the metadata and the buttons
									BNY.global.updateFavoritesMetadata();

									var removeHref = app.URLs.removeFromFavorites + '?id=' + data.itemID;
									// show the remove link
									removeLink.attr('href', removeHref).show();
									// store the ID of the favorited item on the remove link
									removeLink.attr('data-favorite-id', data.itemID);
									// hide the add link
									addLink.hide();
									listForm.attr('data-PID', data.itemID);
									
								}
							}
						},
						dataType: 'json'
					});
				};

				// make an ajax call to remove the item from your favorites
				var removeItem = function(e) {

					e.preventDefault();

					var removeLink = $(this),
						url = removeLink.attr('href'),
						addLink = removeLink.prev('a.add-item-favorites');

					$.ajax({
						type: 'POST',
						url: url,
						success: function(data) {

							if (data.success === 'true') {

								if (data.refresh === 'true') {
									// reload the page
									window.location.reload();
								} else {
									removeLink.attr('href', '').hide();
									// remove the ID of the favorited item
									removeLink.attr('data-favorite-id', '');

									addLink.show();
									BNY.global.updateFavoritesMetadata();
									
									removeLink.siblings('.favorites-dropdown').find('input:checkbox').each(function() {
										$(this).attr('checked', false);
									});
								}

							} else if (data.success === 'false') {
								// error
								alert('An error has occurred.');
							}
						},
						dataType: 'json'
					});
				};

				var addCategory = function(e) {
					e.preventDefault();
					
					// if the page is loading something, prevent the item from being added
					if (app.search && app.search.result.loading === true) {
						return;
					}

					// reset the not logged in  cookie
					cookieUtility.setCookie('add-on-reload', '');

					if (!app.isUserLoggedIn && !app.rememberMeAvailable) {
						// stash the id of the element that was clicked in a cookie.
						cookieUtility.setCookie('add-on-reload', $(this).attr('id'), 1000);
						
						// make the user login
						BNY.utilities.makeUserLogin();
						
						// exit with out adding the item
						return;
						
						
						
					}

					var url = $(this).attr('href');
					
					
					// add the list ID to the  url
					url = app.util.appendParamToURL(url, 'list', app.myListID);
					var refinements = $(this).attr('data-refinements').split('?')[1];
					

					// if we are using friendly URLs, get the cgid from the url
					if (url.indexOf("cgid") < 0){
						// get the cgid of the category by splitting the URL in the appropriate chunks.
						var cgidArr = $(this).attr('data-refinements').split("default")[0];
						var cgidArr1 = cgidArr.split("/");
						var cgid = cgidArr1[cgidArr1.length-1].split(",")[0];
						
						// add the cgid
						refinements = refinements+ "&cgid="+cgid;
					} 

					$.ajax({
						type: 'POST',
						url: url,
						data: refinements,
						success: function(data) {

							if (data.itemID) {

								if (data.refresh === 'true') {
									// reload the page
									window.location.reload();
								} else {
									var removeLink = app.URLs.removeFromFavorites + '?id=' + data.itemID;
									$('#favorites div.add-to-favorites').hide();
									$('#favorites div.added-to-favorites').show().find('a#remove-category').attr('href', removeLink);
									BNY.global.updateFavoritesMetadata();
								}
							}
						},
						dataType: 'json'
					});
				};

				var addDesigner = function(e) {
					e.preventDefault();
					// if the page is loading something, prevent the item from being added
					if (app.search && app.search.result.loading === true) {
						return;
					}

					// reset the cookie
					cookieUtility.setCookie('add-on-reload', '');

					if (!app.isUserLoggedIn && !app.rememberMeAvailable) {
						// stash the id of the element that was clicked in a cookie.
						cookieUtility.setCookie('add-on-reload', $(this).attr('id'), 1000);

						// make the user login
						BNY.utilities.makeUserLogin();
						
						// exit with out adding the item, it will be added on page reload
						return;
						
					}

					
					var url = $(this).attr('href');
					// add the list ID to the  url
					url = app.util.appendParamToURL(url, 'list', app.myListID);
					$.ajax({
						type: 'GET',
						url: url,
						success: function(data) {
							if (data.itemID) {
								if (data.refresh === 'true') {
									// reload the page
									window.location.reload();
								} else {
									var removeLink = app.URLs.removeFromFavorites + '?id=' + data.itemID;
									$('#favorites div.add-to-favorites').hide();
									$('#favorites div.added-to-favorites').show().find('a#remove-category').attr('href', removeLink);
									BNY.global.updateFavoritesMetadata();
								}
							}
						},
						dataType: 'json'
					});
				}

				var removeCategory = function(e) {
					e.preventDefault();

					var url = $(this).attr('href');

					$.ajax({
						type: 'GET',
						url: url,
						success: function(data) {
							if (data.success === 'true') {
								if (data.refresh === 'true') {
									// reload the page
									window.location.reload();
								} else {
									$('#favorites div.add-to-favorites').show();
									$('#favorites div.added-to-favorites').hide().find('a#remove-category').attr('href', '');
									BNY.global.updateFavoritesMetadata();
								}
							} else if (data.success === 'false') {
								// error
								alert("We're sorry. An error has occured removing this category");
							}
						},
						dataType: 'json'
					});
				};

				// is user logged in
				
				
				
				// bind a click event to all products favorites button
				$(document).on('click', 'a#add-category', addCategory);
				$(document).on('click', 'a#add-designer, a#add-designer-to-empty-list', addDesigner);

				$(document).on('click', 'a#remove-category, a.remove-category', removeCategory);

				$(document).on('click', 'a.remove-item-favorites', removeItem);
				$(document).on('click', 'a.add-item-favorites, a#add-product-to-empty-list', addItem);

			},




			startTicker: function() {

				var ticker = $('div#ticker'),
					tickerItems = ticker.find('div.ticker-item');

				var goTicker = function() {

					var tickerItem = $('#ticker div.ticker-item:first'),
						tickerColor = tickerItem.data('color');

					tickerItem.fadeIn('fast');

					ticker.css({
		        		'background': tickerColor
		        	});
					if(tickerItems.length > 1) {
						setTimeout(function() {
				        	tickerItem.detach().appendTo('#ticker .content').fadeOut('slow', function() {
				        		goTicker();
				           });
				        }, 10000);
					}
				};

				goTicker();
			},

			minicart: {

				extendMiniCart: function() {

					if (app.minicart) {

						app.minicart.addScrollbars = function(hideMinicart) {

							var miniCartContent = $('#minicart .minicartcontent'),
								checkoutMiniCart = $('#minicart .checkoutminicart'),
								numOfItems = checkoutMiniCart.children('div.summaryproduct').length;

							if (numOfItems > 4) {
								miniCartContent.show();
								checkoutMiniCart.css({'height': '304px'}).jScrollPane({
									verticalGutter: 16});
								
								if(hideMinicart){
									miniCartContent.hide();
								}
							}
						}
						
						var hideMinicart = true;
						app.minicart.addScrollbars(hideMinicart);

						$('.addtocartbutton').click(function(e) {
							var hideMinicart = false
							app.minicart.addScrollbars(hideMinicart);
						});

						// slide down and show the contents of the mini cart
						app.minicart.slide = function() {

							if (app.minicart.suppressSlideDown && app.minicart.suppressSlideDown()) {
								return;
							}

							if ($('#pt_checkout').length) {
								return;
							}

							// show the item
							jQuery('.minicartcontent').show();

							clearTimeout(app.minicart.timer);
							app.minicart.timer = null;

							// after a time out automatically close it
							app.minicart.timer = setTimeout('app.minicart.close()', 4000);
						};

						// closes the mini cart with given delay
						app.minicart.close = function(delay) {

							if (app.minicart.timer !== null || delay === 0) {
								clearTimeout(app.minicart.timer);
								app.minicart.timer = null;
								$('.minicartcontent').hide(); // hide with "slide" causes to fire mouse enter/leave events sometimes infinitely thus changed it to fadeOut
								
								// removed the fixed class if it has it
								if(jQuery('.minicartcontent').hasClass("fixed")){
									jQuery('.minicartcontent').removeClass("fixed").css({"right":"0px"});
								}
							}
						};
					}
				}
			},

			initDialogs: function() {
				$('body').on('click', 'a.lightbox', function(e) {

					e.preventDefault();

					var dialogID	= 'dialogcontainer',
						dialogDOM	= '#' + dialogID,
						$this		= $(this),
						options		= BNY.utilities.getGlobalDialogOptions(),
						dialogElem	= $(dialogDOM),
						href		= $this.attr('href'),
						context		= $this.data('dialog-context'),
						width		= $this.data('dialog-width'),
						height		= $this.data('dialog-height'),
						title		= $this.data('dialog-title') || 'Barneys',
						dialogClass = $this.data('dialog-class') || '',
						position	= $this.data('dialog-position') || options.position,
						callback	= $this.data('dialog-callback');

					if (position && !(position instanceof Array)) {
						position = position.split(',');
					}

					if (!isNaN(position[0])) {
						position[0] = parseInt(position[0], 10);
					}

					if (!isNaN(position[1])) {
						position[1] = parseInt(position[1], 10);
					}
					
					//debugger;
					
					
					
					if(dialogElem.length > 0) {
						dialogElem.empty();
					}
					else {
						var dialogHTML = '<div id="'+dialogID+'" ></div>';
						$('body').append(dialogHTML);
					}
					
					
					
					app.createDialog({
						id: dialogID,
						options: {
							'width':	width,
							'height':	height,
							'position':	position,
							'title':	title,
							'modal':	true,
							'dialogClass': dialogClass
						}
					});

					app.dialog.open(href, title, context, callback, $this);

				});
				
			},

			login: {

				loggedIn: {

					// a click event handler to toggle the view on/off of the account navigation in the header
					toggleLinks: function() {

						$('#user-account .login span').click(function(e) {
							e.preventDefault();
							$('#account-nav-wrapper').toggleClass('active');
						});

					}

				}
			},
			
			lazyLoadImages: function () {

				// http://www.appelsiini.net/projects/lazyload
				$("img.lazy").lazyload();
				
				// fix known webkit bug by calling plugin after window.load
				
				if (BNY.utilities.isWebKit) {
					$(window).load(function() {
						$("img.lazy").lazyload();
					});
				}

			},
			
			equalizeChildHeights: function(elements) {
				
				elements.load(function() {
					$('.productlisting').equalizeChildHeights({
						only_visible_children: true,
						childElement: '.productimage'
					});
				});
				
			}

		};

		return {

			initialize: function() {

				if (initialized) {
					return;
				}

				// call the original DW JavaScript scripts
				app.init();

				// initaliaze any dialogs on the page
				methods.initDialogs();

				// click behavior for links in header
				methods.login.loggedIn.toggleLinks();

				// extend mini-cart
				methods.minicart.extendMiniCart();

				// start ticker
				methods.startTicker();

				//favorites
				methods.favorites();
				
				methods.lazyLoadImages();

				initialized = true;
			},
			
			equalizeChildHeights: function(elements) {
				return methods.equalizeChildHeights(elements);
			},
			
			lazyLoadImages: function() {
				return methods.lazyLoadImages();
			},
			
			sendToFriendCallback: function (link) {
				
				if (!(link)) {
					return false;
				}

				var shareURL	= link.data('dialog-href'),
					message		= link.data('dialog-email-message'),
					linkText	= link.data('dialog-link-text'),
					subject		= link.data('dialog-email-subject');

			    $('[name=dwfrm_sendtofriend_message]').val(message);
			    $('[name=dwfrm_sendtofriend_subject]').val(subject);
		    	$('[name=dwfrm_sendtofriend_messagelink]').val(shareURL);
			    $('[name=dwfrm_sendtofriend_messagelinktext]').val(linkText);
			    
			    BNY.utilities.clearDefaults();

			},

			updateFavoritesMetadata: function() {

				$.ajax({
					type: 'GET',
					url: app.URLs.getFavoritesMetadata,
					success: function(data) {
						app.myItems = data;
					},
					dataType: 'json'
				});

			},

			checkFavoritesCookie: function() {

				if (cookieUtility.checkCookie('add-on-reload')) {

					var cookie = cookieUtility.getCookie('add-on-reload'),
						addToFavorites = $('#' + cookie);

					// trigger a click on the add to favorites link
					addToFavorites.trigger('click');

					// reset the cookie
					cookieUtility.setCookie('add-on-reload', '', 1000);

				}
			},

			checkFavoritesListForItems: function (skipRemovingItems) {
				//There is a bug with the product details page/quick look that will prevent quicklook from knowing what products have been favorited
				//thus showing the 'favorite item' button in a 'add to favorites' state vs 'remove from favorites' state. 
				//Since this functionality is called from multiple places, skipRemovingItems will short circuit it. 
				//Please speak to Simon Fong is this turns into any issue.
				skipRemovingItems = typeof skipRemovingItems !== 'undefined' ? skipRemovingItems : false;
				// hide the remove favorites icon on each product;
				$('.producttile a.remove-item-favorites').hide();
	
				// if the user is not logged in, go back. There's nothing to change
				if (!app.isUserLoggedIn && !app.rememberMeAvailable) {
					return;
				}
			
				var products = $('.producttile');
				
				products.each(function(index, product) {

					var product = $(product);
					
					if (product.attr('id')) {
	
						var pid = product.attr('id').split('~')[1],
							addProduct = product.find('a.add-item-favorites'),
							removeProduct = product.find('a.remove-item-favorites');
	
						addProduct.show();
						removeProduct.hide();
	
						$.each(app.myItems, function(k, v) {
	
							if (v.type === 'product') {
								
								if (pid === v.pid) {
									
									var removeLink = app.URLs.removeFromFavorites + '?id=' + k;
									removeProduct.attr('data-favorite-id', k);
									removeProduct.css('display', 'block').attr('href', removeLink);
									
									addProduct.hide();
									
								} else {
									// reset the favorite ID
									if (!skipRemovingItems)
										removeProduct.attr('data-favorite-id', '');
								}
							}
	
						}); // end $.each(app.myItems)

					} // end if product.attr('id') exisits

				});
			},

			checkFavoritesList: function(url) {
				// if the user is not logged in, go back. There's nothing to change
				if (!app.isUserLoggedIn && !app.rememberMeAvailable) {
					return;
				}
				
				url = url.replace('#', '');
				
			    // if we are using friendly URLs, get the cgid from the url and append it as a paramter
				if (url.indexOf("cgid") < 0){
					// get the cgid of the category by splitting the URL in the appropriate chunks.
					var cgidArr = url.split("default")[0];
					var cgidArr1 = cgidArr.split("/");
					var cgid = cgidArr1[cgidArr1.length-1].split(",")[0];
					
					// add the cgid
					url = url + "&cgid="+cgid;
				}

				var urlArr = url.split('&'),
					pattv = /prefv(\d+)/,
					pattc = /cgid/,
					refinedBy = [],
					category = '',
					addToFavorites = $('#favorites div.add-to-favorites'),
					addedToFavorites = $('#favorites div.added-to-favorites');

				$.each(urlArr, function() {
				    if (this.match(pattv)) {

				        var refinement = this.split('=')[1],
				        	refineName = decodeURI(refinement);

				        refineName = refineName.replace(/%2b/ig, '+');
						refineName = refineName.replace(/%26/ig, '&');
						refineName = refineName.replace(/%2C/ig, ',');
						refineName = refineName.replace(/%2F/ig, '/');
				        refinedBy.push(refineName);
				    }

				    if (this.match(pattc)) {
						category = this.split('=')[1];
				    }

				});

				// reset the add to favorites button.
				addToFavorites.show();
				addedToFavorites.hide();

				// check each item on the list
				$.each(app.myItems, function(k, v) {
				    if (v.type === 'category') {
						if (v.cgid === category) {
							var savedRefinementValues = [],
								savedRefinements = v.refinements;

							$.each(savedRefinements, function() {
					            savedRefinementValues.push(this[1]);
					        });

					       refinedBy.sort();
					       savedRefinementValues.sort();

					        if (refinedBy.compare(savedRefinementValues)) {
					        	var removeLink = app.URLs.removeFromFavorites + '?id=' + k;

								addToFavorites.hide();
								addedToFavorites.show();
								addedToFavorites.find('a#remove-category').attr('href', removeLink);
					        }
				    	}

				    } else if (v.type === 'designer') {

				    	if (v.cgid === category) {

				    		var designerID = [];
				    		designerID.push(v.id);

				    		if (refinedBy.compare(designerID)) {
					        	var removeLink = app.URLs.removeFromFavorites + '?id=' + k;
					        	addToFavorites.hide();

					        	addedToFavorites.show();
					        	addedToFavorites.find('a#remove-category').attr('href', removeLink);
					        }
				    	}
				    }

				});
			}
		};
	}();

}).call(BNY);

$(document).ready(function() {
	BNY.global.initialize();
});

if (!Array.prototype.compare) {
	Array.prototype.compare = function(testArr) {
	    if (this.length != testArr.length) return false;
	    for (var i = 0; i < testArr.length; i++) {
	        if (this[i].compare) {
	            if (!this[i].compare(testArr[i])) return false;
	        }
	        if (this[i] !== testArr[i]) return false;
	    }
	    return true;
	};
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};