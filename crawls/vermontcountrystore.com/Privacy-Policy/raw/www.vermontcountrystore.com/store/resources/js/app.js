/**
 * app.js
 * @depend plugins.js
 *
 */

var Util = {
	browser : {
		isIE6 : (function () {
			if ($.browser.msie){
				return ($.browser.version.substr(0,1) == '6');
			}
			return false;
		})()
	},
	isNumeric : function (input) {
		return (input - 0) == input && input.length > 0;
	},
	validateString : function (input) {
		return input != null && input != '';
	},
	validateEmail : function(input) {
		var reg = '.+@.+\\.[a-z]+';
		return reg.test(input);
	},
	validateSelection : function(input) {
		var i,
			max;
		for (i = 0, max =input.length; i<max; i++){
			if (input[i].checked == true){
				return true;
			}
		}
		return false;
	},
	validateState : function (input) {
		return Util.validateString(input) && input != "delim";
	},
	modal: {
			init : function (settings, modalUrl) {
				var config = {
						autoOpen	: false,
						width	   : 366,
						closeText   : '',
						title	   : 'This page requires additional attention: ',
						dialogClass : 'error-modal',
						create	  : function (event) {
							var $this = $(event.target);
							$this.delegate('.close', 'click', function () {
								$this.dialog('close');
								return false;
							});
						}
					},
					$modal = $('<div />', {
						className: 'modal-wrap'
					});

				$.extend(config, settings);

				function initializeModal() {
					$modal.dialog(config);
				}
				if (modalUrl){
					$modal.load(modalUrl, initializeModal);
				} else {
					initializeModal();
				}
				return $modal;

			},
			errorModal : function(message){
				var modalUrl = window.Util.root + '/views/common/modal/error_modal.jsp',
					config = {
						autoOpen : false,
						width : 366,
						closeText : '',
						title : 'This page requires additional attention: ',
						dialogClass : 'error-modal',
						create : function (event) {
							var $this = $(event.target);
							$this.delegate('.close', 'click', function () {
								$this.dialog('close');
								return false;
							});
						}
					},
					$modal = $('<div />', {
						className: 'modal-wrap'
					});
					$modal.load(modalUrl, function() {
						$modal.dialog(config);
						Util.modal.populateMessageList($modal, message);
						if($modal.dialog('isOpen') != true){
							$modal.dialog('open');
						}
					});
				return $modal;
			},
			successModal : function(message, successUrl) {
				 var modalUrl = window.Util.root +'/views/common/modal/success_modal.jsp',
					config = {
						autoOpen : false,
						width : 366,
						closeText : '',
						title : 'Success!  ',
						dialogClass : 'success2-modal',
						modal : true,
						create : function (event) {
							var $this = $(event.target);
							$this.delegate('.close', 'click', function () {
								$this.dialog('close');
								if (successUrl){window.location = successUrl;}
								return false;
							});
						}
					 },
					 $modal = $('<div />', {
						 className: 'modal-wrap'
					 });
				 $modal.load(modalUrl, function() {
					$modal.dialog(config);
					Util.modal.populateMessageList($modal, message);
					if($modal.dialog('isOpen') != true){
						$modal.dialog('open');
					}
				});
			 return $modal;
			},
			populateMessageList : function($modal, message){
				var $errorList = $modal.find('.message-list');
				$errorList.empty();
				$.each(message, function(index, value){
					var $item = $('<li></li>');
					$item.text(value);
					$errorList.append($item);
					
				});
				$modal.dialog('option', 'height', 'auto' );
			}
		}
};


(function (window, document, undefined) {

	(function ($) {
		/**
		 * VCS is a module that namespaces the main prototype objects used in the project.
		 * @module VCS
		 * @author Stephen Tudor
		 */
		VCS = {
			// Garber-Irish method of DOM-ready execution
			// viget.com/inspire/extending-paul-irishs-comprehensive-dom-ready-execution/
				openLiveHelp : function() {
					var a = 'https://service.liveperson.net/hc/88287119/?cmd=file&file=visitorWantsToChat&site=88287119&imageUrl=http://service.liveperson.net/hcp/Gallery/ChatButton-Gallery/English/General/1a&referrer='+window.location.href;
					window.open(a,'liveHelp','height=320,width=472')
				},
				megaMenu : function () {
					var menuItems = $('#primary-nav').children(),
						over = function () {
							var submenu = $(this).find('.sub');
							//submenu.children('.nav-item').removeClass('hover');
							if(Util.browser.isIE6){
								submenu.show();
								submenu.children('.nav-item').addClass('hover');
							} else {
								submenu.stop(true, true).fadeToggle(200, function (){
									submenu.children('.nav-item').addClass('hover');
								});
								
								/* REVISED MEGAMENU LOGIC */
								$('.sub-inner ul:last-child').addClass("last");

									var li_x = submenu.parent().position().left;
									var subwidth = 0;
									subwidth = submenu.width();
									/* check if parent (LI) x-position is > half */
									if( li_x >= 475 ){								
										/* THEN check if submenu is too big */										
										if( subwidth >= (950 - li_x)) {
											//make sub.right=0 to stab submenu to right side
											$('div.sub').css('right','0');
											$('div.sub').css('left','auto');
										} else {
											// force sub.right=0 and sub.left=auto
											$('div.sub').css('right','auto');
											$('div.sub').css('left','auto');
										}
									} else { /* check if parent (LI) x-position is < half */
									// IF width < 950-parent.x THEN sub.left=auto
										if( subwidth < (950 - li_x)) {
											$('div.sub').css('left','auto');
											$('div.sub').css('right','auto');
										} else {
											//IF NOT THEN sub.left=0 and sub.right=auto
											$('div.sub').css('right','auto');
											$('div.sub').css('left','0');
										} 
									}
								
							}
							
							//Find sub and fade it in
						},
						out = function () {
							var submenu = $(this).find('.sub');
							if(Util.browser.isIE6){
								submenu.hide();
								submenu.children('.nav-item').removeClass('hover');
							} else {
								submenu.stop(true, true).fadeToggle(200, function (){
									submenu.children('.nav-item').removeClass('hover');
								});
							}
							
						},
						//Set custom configuration
						config = {
							sensitivity : 2,	// number = sensitivity threshold (must be 1 or higher)
							interval : 100,	// number = milliseconds for onMouseOver polling interval WAS 100 then 200
							over : over,	// function = onMouseOver callback (REQUIRED)
							timeout : 100,	// number = milliseconds delay before onMouseOut
							out : out	// function = onMouseOut callback (REQUIRED)
						};

					// Trigger Hover intent
					menuItems.hoverIntent(config);
					
					if(Util.browser.isIE6){
						menuItems.find('.sub').bgiframe();
					}
				},
				submitSearchRequestFrmHead : function(){
				    var questionField = document.getElementById("question_frmHd");
				     if (questionField.value == "" || questionField.value =="Item # or keyword") {
				         questionField.focus();
				         return false; //to stop submit
				      } else {
				          document.getElementById("qfh_ft_frmHd").value = "SRCH:"+ questionField.value;
				          document.getElementById("searchSubmit_frmHd1").value = "Search";
				         return true;  
				      }
				    },
				doPageAction : function(action, start){ /* pagination controls on category */
					if (action == 'previous') {
						document.frmSbctgySrt["prdStart"].value = start;
					} 
					else if (action == 'viewall') {
						document.frmSbctgySrt["viewAll"].value = "true";
					}
					else if (action == 'next') {
						document.frmSbctgySrt["prdStart"].value = start;
					} 
				document.frmSbctgySrt.submit();    
				},
			
				applyTabs: function() {
					var tabset = $('#product-tabs'),
						config = {
							header	  : '.accordion-header',
							collapsible : true,
							autoHeight  : false
						},
						accordionClass = 'accordion-off';

					// jQueryUI Tabs initialization
					tabset.tabs();

					// jQueryUI Accordion initialization
					tabset.find('.' + accordionClass)
						.removeClass(accordionClass)
						.accordion(config);
				},
				initAddedModal : function() { /* Init function for Item added modal */
					var prodId = $('body').attr('data-productid'),
						modalUrl = window.Util.root + '/views/product/modal/item_added_modal.jsp?productId='+prodId ,
						settings = {
							title	   : 'An item has been added to your bag : ',
							autoOpen	: true,
							width	   : 415,
							dialogClass : 'success-modal'
						};
					Util.modal.init(settings, modalUrl);
				},
				initPromoModal: function() { /* Init function for Item added modal */
					var modalUrl = window.Util.root + '/views/checkout/cart/cart_promo_modal.jsp',
						settings = {
							title : 'Your Promotion Code Has Been Accepted: ',
							autoOpen : true,
							width : 415,
							dialogClass : 'success-modal'
						};

					Util.modal.init(settings, modalUrl);
				},
				initModal : function() { /* For links that open modals */
					$('body').delegate('.modal-link', 'click', function(){
						var $this = $(this),
							config = {
								autoOpen	: true,
								title	   : '',
								width	   : 550,
								dialogClass : 'modal-content'
							},
							settings = {},
							modalUrl = '';
						if($this.data('modal') == undefined){
							settings = $this.data('settings');
							modalUrl = $this.attr('href');
							if (settings != undefined){
								$.extend(config, settings);
							}
							$this.data('modal', Util.modal.init(config, modalUrl));
						} else if($this.data('modal').dialog('isOpen') != true){
							$this.data('modal').dialog('open');
						}
						return false;
					});
				},
				
				initPopup : function(trigger, popup){
					var $trigger = $(trigger),
						$popup = $(popup);
					$trigger.delegate('a', 'click', function(){
						$popup.show();
						return false;
					});
					$popup.delegate('.close', 'click', function(event){
						$popup.hide();
						return false;
					});
					if(Util.browser.isIE6){
						$popup.bgiframe(); // redundant? UI dialog has a reference to bgiframe already
					}
				},
				displaySearchListInReverse : function(){ // depreciated
					  //get the list
						var root=document.getElementById('searchListID');
						//get child node length
						var length = root.childNodes.length;
						for(var i=length-1;i>=0;i--){
						  //node type 1 = element
							if (root.childNodes[i].nodeType==1) {
							  root.appendChild(root.childNodes[i]);
							}
						};
				},
				initAccordian : function(){
					$( '.facet-accordion-header' ).click( function() {
						var $header = jQuery( this );
						var $content = $header.next();
						
						$content.toggle();
						
						if( $content.is( ':visible' ) ) {
							$header.removeClass( 'facet-accordion-closed' );
						} else {
							$header.addClass( 'facet-accordion-closed' );
						}
						
						return false;
					});
				},
				initErrorModal : function(container) {
					var messages=[];
					$(container).each(function() {messages.push($(this).text()); });
					if (messages.length > 0) {
						Util.modal.errorModal(messages);
					}
				},

			common : {
				init : function () {
					if($('.modal-link').length > 0){
						VCS.initModal();
					}
					// should move to product, except for the action on postal.jsp
//					if($('.facet-accordion-header').length > 0){
//						VCS.initAccordian();
//					}
				}
			},

			account : {
				init : Util.empty,
				landing : Util.empty,
				address : Util.empty,
				profile : Util.empty,
				payment : Util.empty,
				notify : Util.empty
			},

			checkout : {
				init : function(){
					VCS.initPopup('#Security', '#Security_Popup');
					VCS.initPopup('.shipping-info-trigger', '#shipping-info');
				},
				cart	 : function(){
					// does this even work?
					(function promotionAppliedCheck() {
						//var addedItem = $('.added-item');
						//if(addedItem.length > 0){
						//	VCS.initAddedModal();
						//}						
						var promotionApplied = $('.promo-added');
						if(promotionApplied.length > 0){
							var modal = VCS.initPromoModal();
						}
					})();
					
					VCS.initErrorModal('div.form-error-list');//TODO: unify error block container names
					
				},
				signIn : function(){
					$('#forgot-password').click(function(){
						document.getElementById("forgotPwdEmailAddress").value = document.getElementById("login-id").value;
						document.getElementById("forgotPasswordForm").submit();
					});
					VCS.initErrorModal('#errorblock li');//TODO: unify error block container names
				},
				billing : function(){
					$('#state').change(function(e){
						var selCountryCode = $(this).find('option:selected').parent('optgroup').data('countrycode'),
							$selCountryOption = $('#country').find('option[value="'+selCountryCode+'"]');
						if($selCountryOption.length > 0){
							$selCountryOption.attr('selected','selected');
						}
					});
					VCS.initErrorModal('div.account-error li');//TODO: unify error block container names
					
				},
				shipping : function(){
					function useBilling(formFields){
						for (fieldName in formFields) {
							if (window.billingAddress[fieldName] != undefined){
								formFields[fieldName].value = window.billingAddress[fieldName];
							}
							if(formFields[fieldName].tagName.toLowerCase() == 'select'){
								formFields[fieldName].disabled = true;
							}else{
								formFields[fieldName].readOnly = true;
							}
						}
						$('#shipping-address-form').addClass('useBilling');
					}

					function dontUseBilling(formFields){
						for (fieldName in formFields) {
							formFields[fieldName].value='';
							if(formFields[fieldName].tagName.toLowerCase() == 'select'){
								formFields[fieldName].disabled = false;
							}else{
								formFields[fieldName].readOnly = false;
							}
						}
					}

					(function initBillingAddress() {
						var $trigger = $('#use-billing'),
							checked = $trigger.attr('checked');
							$form = $('#shipping-address-form');
							formFields = {'firstName':document.getElementById("first-name"),
									'lastName': document.getElementById("last-name"),
									'company' : document.getElementById("company"),
									'address1' : document.getElementById("address-line-1"),
									'address2' : document.getElementById("address-line-2"),
									'city' : document.getElementById("city"),
									'state' : document.getElementById("state"),
									'zipCode' : document.getElementById("zip-code"),
									'phoneNumber1' : document.getElementById("phone-number-1"),
									'phoneNumber2' : document.getElementById("phone-number-2"),
									'phoneNumber3' : document.getElementById("phone-number-3"),
									'email' : document.getElementById("email")
							};
						if(checked){
							$form.addClass('useBilling');
						}
						$trigger.bind('click', function(e){
							if($trigger.attr('checked')){
								useBilling(formFields);
							} else {
								dontUseBilling(formFields);
							}
						});
					})(); 
					VCS.initErrorModal('div.account-error li');//TODO: unify error block container names
				},
				shippingMethods : function(){
					VCS.initErrorModal('div.shipping-methods-error li');//TODO: unify error block container name
				},
				payment  : function(){
					VCS.initErrorModal('div.account-error li');//TODO: unify error block container names
				},
				review   : function(){},
				confirm  : function(){},
                receipt  : function(){
                
                    if ($('#showRegDialog').length > 0){
                        registerDialog();
                    };
                    
                    function registerDialog() {
                    
                        var config = {
                            autoOpen    : false,
                            width       : 490,
                            closeText   : '',
                            title       : 'Would you like to be a Registered Member? ',
                            dialogClass : 'register-modal',
                            create      : function (event) {
                                        var $this = $(event.target);
                                        $this.delegate('.closeBox', 'click', function () {
                                        $this.dialog('close');
                                        return false;
                                        })
                                      }   
                        };
                              
                        var url = window.Util.root +'/views/checkout/registerationPopUp.jsp';
        
                        var modal = $('<div />', {
                            className: 'modal-wrap'
                        });
                    
                        modal.load(url, function() {
                            modal.dialog(config);
        
                            if(modal.dialog('isOpen') != true){
                            
                                modal.dialog('open');
                                
                                if($('#error_box_modal').html() != null)
                                {
                                  $('#error_box_checkOut').html($('#error_box_modal').html());
                                  $('#error_box_checkOut').removeClass('div_off');
                                }
                            }
                        });  
                    }
                
                    (function validateRegForm() {
                    
                        $('body').delegate('#registrationForm', 'submit', function(){
                        
                            var errorMsg = [];
                              
                            if(!Util.validateEmail($('#email').val())) {
                                errorMsg.push('Please enter a valid email address');
                            }
                            
                            var password = $('#password').val();
                            var confirmPassword = $('#confirmPassword').val();
                            
                            if(password == ' ' || confirmPassword == ' '){
                            
                              errorMsg.push('Password and Confirm Password do not match, please try again.');
                            }else if(password != confirmPassword)
                            { 
                                errorMsg.push('Password and Confirm Password do not match, please try again.');
                            }
                        
                            if(errorMsg.length == 0)
                            {
                                return true;
                            }else
                            {
                                var item= '<ul class="error-list">';
                                for(var i=0;i<errorMsg.length;i++){
                                    item += '<li>' + errorMsg[i] + '</li>';
                                }
                                item += '</ul>';
                                $('#error_box_checkOut').html(item);
                                $('#error_box_checkOut').removeClass('div_off');
                                return false;
                            }
                            
    
                        });
                    })();
                }
			},
			

			home : {
				init : function() {
					// div only included in order status.jsp
					VCS.initErrorModal('div.orderstatus_error');
				}
			},
			staticContent : {
				init : function () {
					VCS.initErrorModal('div.orderstatus_error');
					(function successMessageCheck(){
						var successFlag = $('#productSuggSuccess'); // update this
						function showSuccessMessage() {
							var message = [];
							message[0] = "Thank you for suggesting a product.";
							Util.modal.successModal(message);
						}
						if(successFlag.length > 0){
							showSuccessMessage();
						}
					})();
					(function errorMessageCheck(){
						var errorFlag = $('#productSuggError');
						function showErrorMessage(){
							var message = [];
							message[0] = 'An Error Occurred while trying to send your product suggestion.';  
							message[1] = 'Please try again or contact customer service.';
							Util.modal.errorModal(message);
						}
						if(errorFlag.length > 0){
							showErrorMessage();
						}
					})();
				}
			},
			testimonials : {
				init : function() {
					(function validateForm(){
						$('body').delegate('#testimonialForm', 'submit', function(){
							var message = [];
							if(!Util.validateString(document.forms["testimonialForm"]["custTestFirstName"].value)) {
							  message.push('Please enter a First Name');
							}
							if(!Util.validateString(document.forms["testimonialForm"]["custTestCity"].value)) {
								message.push('Please enter a City');
							}
							if(!Util.validateState(document.forms["testimonialForm"]["custTestState"].value)) {
							   message.push('Please select a State');
							}
							if(!Util.validateString(document.forms["testimonialForm"]["custTestReviewTitle"].value)) {
							   message.push('Please enter a Review Title');
							}
							if(!Util.validateString(document.forms["testimonialForm"]["custTestFullReview"].value)) {
							   message.push('Please enter a Review');
							}
							if(!Util.validateEmail(document.forms["testimonialForm"]["custTestEmail"].value)) {
								 message.push('Please enter a valid email address');
							}
							if(message.length > 0) {
							  Util.modal.errorModal(message);
							  return false;
							}else{
							  return true;
							}
						});
					})();
					(function successMessageCheck(){
						var successFlag = $('#customerTestimonialSuccess');
						function showSuccessMessage() {
							var message = [];
							message[0] = "Thank you for submiting your Testimonial.";
							var ProdId = document.forms["testimonialForm"]["CustProductId"].value,
								successUrl = window.Util.root +"/product/detail.jsp?productId="+ProdId;
							Util.modal.successModal(message, successUrl);
						}
						if(successFlag.length > 0){
							showSuccessMessage();
						}
					})();
					(function errorMessageCheck(){
						var errorFlag = $('#customerTestimonialError');
						function showErrorMessage(){
							var message = [];
							message[0] = 'An Error Occurred while trying to send your Testimonial.';
							message[1] = 'Please try again or contact customer service.';
							Util.modal.successModal(message);
						}
						if(errorFlag.length > 0){
							showErrorMessage();
						}
					})();
				}
			},
			product : {
				init   : function(){},
				detail : function () {
					// Product Detail tabs
					VCS.applyTabs()
					var addedItem = $('.added-item');
					if(addedItem.length > 0){
						VCS.initAddedModal();
					}
				} /* END detail */
				
			}, /* END product */
			placeHolder : function() {
				// Invoke the Placeholder plugin
				$('input, textarea').placeholder();
			} /* END placeHolder */			
		
		}; /* END VCS */


		/**
		 * Exec is a module responsible for executing the appropriate
		 * methods based on data-controller & data-action attributes.
		 * @module Exec
		 * @author Stephen Tudor
		 */
		Exec = {
			// Garber-Irish method of DOM-ready execution
			// viget.com/inspire/extending-paul-irishs-comprehensive-dom-ready-execution/

			fire: function (controller, action, args) {
				var ns = VCS,
					action = (action === undefined) ? 'init' : action;

				if (controller !== '' && ns[controller] && typeof ns[controller][action] === 'function') {
					log('Exec.fire is calling: VCS.' + controller + '.' + action);
					ns[controller][action](args);
				}
			},

			init: function () {
				var body = document.body,
					controller = body.getAttribute('data-controller'),
					action = body.getAttribute('data-action'),
					context   = document.body.getAttribute('data-context') || '/',
					Util      = window.Util || {};
					
			    // Cache context root for later
			    Util.root = context;
				Exec.fire('common');
				Exec.fire(controller);
				Exec.fire(controller, action);
				$(document).trigger('cleanup');
			}
		};


		/**
		 * This is what makes it all happen
		 * @method bootstrap
		 * @author Stephen Tudor
		 */
		function bootstrap() {
			Exec.init();
		}

		$(document).ready(bootstrap);

	})(window.jQuery);

})(window, document);
