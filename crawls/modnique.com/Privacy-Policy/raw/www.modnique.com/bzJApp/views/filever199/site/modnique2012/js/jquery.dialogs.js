// set global ajax timeout
$.ajaxSetup({
	timeout: 15000
});

//Preloader
function displayOCCLoad(){
    jQuery('#OCCLoaded').hide();
    jQuery('#OCCLoad').fadeIn();
}
function removeOCCLoad(){
    jQuery('#OCCLoad').hide();
    jQuery('#OCCLoaded').fadeIn();
}
//Expiration date from secondsLeft
function displayTime(time){
    var days = Math.floor(time / 86400);
    var hours = Math.floor((time - days*86400) / 3600);
    var minutes = Math.floor((time - days*86400 - hours*3600) / 60);
    var seconds = time - days*86400 - hours*3600 - minutes*60;
    var timestring = '';
    timestring = days + 'D ' + hours + 'H ' + minutes + 'M';

    $(document).ready(function() {
        if($('#countdown').length > 0){
            if($('#chckOutCounter').length > 0){
                countdown('countdown');
            }
        }
    });

    function countdown(element) {
        interval = setInterval(function() {
            var el = document.getElementById(element);
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            if (hours > 0) {
                document.getElementById("chckOutCounter").style.display = 'none';
            }
            if (days > 0) {
                document.getElementById("chckOutCounter").style.display = 'none';
            }
            if (seconds == 0) {
                if (minutes == 0) {
                    el.innerHTML = document.getElementById("chckOutCounter").style.display = 'none';
                    clearInterval(interval);
                    return;
                } else {
                    minutes--;
                    seconds = 60;
                }
            }
            if (minutes >= 10) {
                var minute_text = minutes + (minutes > 1 ? ':' : ':');
            }

            else if (minutes < 10) {
                var minute_text = "0" + minutes + (minutes > 1 ? ':' : ':');
            }
            else if (minutes == 0) {
                var minute_text = '00:';
            }
            var second_text = seconds > 1 ? 'seconds' : 'second';
            el.innerHTML = minute_text + seconds + ' ';
            seconds--;
        }, 1000);
    }
    return timestring;
}

//Formating all dates from json
function dateFormat(date){
	if (date)
	{
	    var date_formated = date;
	    date_formated = date_formated.split('T');
	    date_formated = date_formated[0].split('-');
	    date_formated = date_formated[1] + "/" + date_formated[2] + "/" + date_formated[0];
	
	    return date_formated;
	}
	else
	{
		return "";
	}
}
function displaySubmittedOrderCallback(data){
    jQuery('#error_response').html("<h1>Thank you for your order! Your order number is: <span id='orderId'>" + data.orderId + "</span></h1>");
    jQuery('#error_response').show();

    jQuery('div#OCC .edit').hide();
    jQuery('#submitPayNow').hide();
    jQuery('#close_occ_button').show();

    // build purchasePixel iframe
    jQuery('<iframe />').attr({
        name: 'occ_purchasePixelIframe',
        id:   'occ_purchasePixelIframe',
        scrolling: 'no'
    }).appendTo('div#oneClickCheckout');

    // write purchasePixel to iframe
    var ifrm = document.getElementById('occ_purchasePixelIframe');
    ifrm = (ifrm.contentWindow) ? ifrm.contentWindow : (ifrm.contentDocument.document) ? ifrm.contentDocument.document : ifrm.contentDocument;
    ifrm.document.open();
    ifrm.document.write(data.purchasePixel);
    ifrm.document.close();

    // update status of floating OCC tab
    checkOCC();
}
// jQuery extension to center element in middle of screen
jQuery.fn.center = function (divId) {
    this.css("top", (($(window).height() - this.outerHeight()) / 2) + "px");
    this.css("left", (($(window).width() - $('#'+divId).outerWidth()) / 2) + "px");
    return this;

}

jQuery(document).ready(function($) {
	// set variables
	var topUrl = stripUrlParam(top.location.href, 'dialog');

	
	// set core functions
	function stripUrlParam(url, name){
		url = url.replace("&"+name, "");
		url = url.replace("="+name, "");
		
		return url;
	}
	
	
	// set core objects
	// Overlay data object
		var dialogWrapperObj = $("div#dialogWrapper");
		var dialogWrapperNonFloatingObj = $("div#dialogWrapperNonFloating");
		
		dialogWrapperObj.overlay({ //setting up jquery.tools overlay
			speed: 200,
			mask: {
				color: '#000',
				loadSpeed: 0,
				opacity: 0.9
			},
			onBeforeClose: function(){
				$('.error').hide();
				$('div#dialog_error_message').hide();
			},
			onLoad: function(){
				$('input#ajax_username').focus();
			}
		});

        dialogWrapperNonFloatingObj.overlay({ //setting up jquery.tools overlay
            speed: 200,
            fixed: false,
            mask: {
                color: '#000',
                loadSpeed: 0,
                opacity: 0.3
            },
            onBeforeClose: function(){
                $('.error').hide();
                $('div#dialog_error_message').hide();
            },
            onLoad: function(){
                $('input#ajax_username').focus();
            }
        });
        
	// END Overlay data object
	
	
	// postMessage Dialogs
		// Display Dialog
		function displayDialog(positionFromTop){
			dialogWrapperObj.data('overlay').load();
			dialogWrapperObj.css('top', positionFromTop + '%');
            dialogWrapperObj.css("left", (($(window).width() - dialogWrapperObj.outerWidth()) / 2) + "px");
            
            
        }
		
		
		// Build Dialog
		function buildDialog(divId, title, closeButton, iframeSrc, iframeWidth, iframeHeight){
			var returnURL = document.location.href;
			
			// if this is IE6 or 7 we need to clean up the returnURL just in case there was some lingering postMessage logic from a previous action
			returnURL = returnURL.split('#');
			returnURL = returnURL[0];
			
			returnURL = escape(returnURL);
			iframeSrc+='&returnURL=' + returnURL;
			
			var dialogWrapper = $('div#dialogWrapper');
			dialogWrapper.html('');

            var htmlAppend = ''
            + '<div id="' + divId + '" style="width:' + iframeWidth + 'px; height:' + (iframeHeight) + 'px">'
                //dialog close button
                +' <a class="' + closeButton + ' btnCloseAbs posAbs"></a>'
                //dialog module
                +' <div class="mod dialog man">'
                    +'<b class="top">'
                        +' <b class="tl"></b>'
                        +' <b class="tr"></b>'
                    +'</b>'
                    +' <div class="inner">'
                        //dialog header title
                        +'<div class="hd pvs phm">'+title+'</div>'
                        //module body which will be loaded with frameSrc
                        +'<div id="frame_' + divId + '" class="bd pam">'
                            +'<iframe id="iframe_' + divId + '" src="' + iframeSrc + '" width="' + iframeWidth + '" height="' + (iframeHeight-40) + '" scrolling="no" frameborder="0"><\/iframe>'
                        +'</div>'
                    +'</div>' //close inner
                    +'<b class="bottom">'
                        +'<b class="bl"></b>'
                        +'<b class="br"></b>'
                    +'</b>'
                +'</div>'; // close mod

			dialogWrapper.append(htmlAppend);
		}
		
		// Dialogs
			// USER FUNCTIONALITY
				var OCCtabObj = $('div#OCCtab');
				$('div#toolbar .downarr a').click(function(){
					// check if OCCtab exists
					if(OCCtabObj.length >0 ){
						// check if OCCtab is visible needs to remain a separate conditional
						// IE7 Cannot Animate Borders
						if(ObjBrowserDetect.isIE7()){
							if(OCCtabObj.is(":visible")){
								OCCtabObj.animate({bottom: '-=32px'}, {duration: 200});
								OCCtabObj.css({'border-bottom': '2px solid #b22564'});
							}
						}else{
							if(OCCtabObj.is(":visible")){
								OCCtabObj.animate({bottom: '-=32px'}, {duration: 200});
								OCCtabObj.animate({ 'border-bottom': '2px solid #b22564'}, {duration:300});
							}
						}
					}
				});
			
				// Newsletter Subscription Confirmation Dialog
					function subscriptionCallback(data, status){
						//alert('data: ' + data + ", status: "+ status);
						var divId			=	'subscription_dialog';
						var title			=	'<h2>Newsletter</h2>';
						var closeButton		=	'closeSubscriptionDialog';
						var iframeSrc 		=	securePrefix + "/bzJApp/ViewDialog.action?sid=" + SiteID + "&tid=" + TenantID + "&pageName=subscriptionSuccess&versionID=" + VersionID;
						var iframeWidth 	=	370;
						var iframeHeight	=	150;
						
						buildDialog(divId, title, closeButton, iframeSrc, iframeWidth, iframeHeight);
						
						var positionFromTop	=	20;
						displayDialog(positionFromTop);
						
						if ($("div#newsletterBar").is(":visible")) {
							$('a#hideNewsletterBar').click();
						}
					} 
					// submit subscription
					$('input.ajax_subscription_button').live("click", function(event) {
                        event.preventDefault();
                        //using this validation for more than one form
                        var parentForm = "form#"+$(this).closest('form').attr('id');

                        //form validation
                        $(parentForm).validate({
                            rules: {
                                email: {
                                    required: true,
                                    email: true
                                }
                            },
                            messages: {
                                email: "Enter a valid email."
                            },
                            errorPlacement: function(error, element) {
                                error.addClass("negative");
                                error.appendTo(element.parent());
                            }
                        });

                        //on success validation
                        if($(parentForm).validate().form()){
                            var emailValue = $(parentForm).find('input[name="email"]').first().val();
                            if (emailValue == null || emailValue == "") {
                                // different forms emails
                                var barEmail = $('#newsBarForm input.enterEmail').val();
                                var subscribeEmail = $('#subscribeForm input.enterEmail').val();

                                if(barEmail != "" && barEmail != null){
                                    emailValue = barEmail;
                                }else if(subscribeEmail != "" && subscribeEmail != null){
                                    emailValue = subscribeEmail;
                                }
                            }

                            var urlPath = location.protocol + '//' + window.location.hostname;
                            querystring = urlPath + "/bzJApp/Proxy.action?actionName=XMLSubscribeCustAction&dest=c&sid=" + SiteID + "&tid=" + TenantID + "&params=";
                            param = "sid=" + SiteID + "&tid=" + TenantID + "&email=" + emailValue;
                            param = escape(param);

                            querystring = querystring + param;
                            //alert("querystring = " + querystring);

                            dialogWrapperObj.load(querystring, subscriptionCallback);
                        }
					});
					
					$('input#send_toolbar').live("click", function(event) {
                        event.preventDefault();

                        //form validation
                        $("form#newsBarForm").validate({
                            rules: {
                                email: {
                                    required: true,
                                    email: true
                                }
                            },
                            messages: {
                                email: "Enter a valid email."
                            },
                            errorPlacement: function(error, element) {
                                error.addClass("negative");
                                error.appendTo(element.parent());
                            }
                        });

                        //on success validation
                        if($("form#newsBarForm").validate().form()){
                            var emailValue = $('#newsBarForm input.enterEmail').val();

                            var urlPath = location.protocol + '//' + window.location.hostname;
                            querystring = urlPath + "/bzJApp/Proxy.action?actionName=XMLSubscribeCustAction&dest=c&sid=" + SiteID + "&tid=" + TenantID + "&params=";
                            param = "sid=" + SiteID + "&tid=" + TenantID + "&email=" + emailValue;
                            param = escape(param);

                            querystring = querystring + param;
                            //alert("querystring = " + querystring);

                            dialogWrapperObj.load(querystring, subscriptionCallback);
                        }
					});
					
					// close subscription
					$('.closeSubscriptionDialog').live("click", function(){
						dialogWrapperObj.overlay().close();
					});
					
					
				// END Subscription Confirmation Dialog
			// END USER FUNCTIONALITY
		// END Dialogs
	// END postMessage Dialogs


        //One Click Checkout

        function displayDialogNonFloating(divId, positionFromTop, scrollOffset){
			// set initial top position
			var windowHeight 	= screen.height;
			var activeBottom 	= $('div#OCCtab').offset().top;
			positionFromTop = activeBottom-windowHeight + positionFromTop;
			//positionFromTop = positionFromTop<0?45:positionFromTop+scrollOffset;
			positionFromTop = positionFromTop<0?45:positionFromTop;

			dialogWrapperNonFloatingObj.data('overlay').load();
			dialogWrapperNonFloatingObj.center(divId).css('top', positionFromTop);
		}
});

// build future dialogs into this object and migrate existing dialogs into it
var 
	displayDialog,
	hostPrefix = window.location.protocol + '//' + window.location.hostname;

var 
	displayDialog;
	
jQuery(document).ready(function($) {
	
	// DIALOG OBJECT
		function objFramelessDialog(){
			// Pre-Define Parameters
				var htmlAppend, pos;
			// END: Pre-Define Parameters
			
			
			// Construct Additional Parameters
				this.setParameters = function(settings){
					this.closeButton		= 'closeDialog';
					this.divId				= settings['divId'];
					this.position           = settings['position'];
                    this.title				= settings['title'];
					this.frameSrc			= settings['frameSrc'];
					this.frameWidth			= settings['frameWidth'];
					this.frameHeight		= settings['frameHeight'];
					this.dialogWrapper		= $('div#' + settings['wrapper']);
					this.positionFromTop	= settings['positionFromTop'];
					this.msg				= settings.hasOwnProperty('msg')?settings['msg']:'';
					
					this.loadFrameSrc		= this.frameSrc!=''?true:false;
					
					// empty the dialogWrapper
					this.dialogWrapper.html('');
				}
			// END: Construct Additional Parameters

			// Build Dialogs
				// normal dialog
					this.buildFramelessDialog = function(){
						
						htmlAppend = ''
						+ '<div id="' + this.divId + '" style="width:' + this.frameWidth + 'px; height:' + (this.frameHeight) + 'px">';
						
						//if(this.wrapper == 'dialogWrapper' || this.divId == 'survey'){
							htmlAppend+= ''
                                //dialog close button
                                +' <a class="' + this.closeButton + ' btnCloseAbs posAbs"></a>'
                                //dialog module
                                +' <div class="mod dialog man">'
                                    +'<b class="top">'
                                        +' <b class="tl"></b>'
                                        +' <b class="tr"></b>'
                                    +'</b>'
                                    +' <div class="inner">';
						//}
						htmlAppend+= ''
                                        //dialog header title
                                        +'<div class="hd pvs phm">'+this.title+'</div>'
                                        //module body which will be loaded with frameSrc
                                        +'<div id="frame_' + this.divId + '" class="bd pam">' + this.msg + '</div>'
                                    +'</div>' //close inner
                                    +'<b class="bottom">'
                                        +'<b class="bl"></b>'
                                        +'<b class="br"></b>'
                                    +'</b>'
                                +'</div>'; // close mod
						this.dialogWrapper.append(htmlAppend);
						
						// load external content into div
						if(this.loadFrameSrc)
							$("div#frame_"+this.divId).load(this.frameSrc);
					}
				// END: normal dialog
			// END: Build Dialogs
			
			
			// Display Dialogs
				// normal dialog
				this.displayDialog = function(){
					this.dialogWrapper.data('overlay').load();

					// reposition dialog
					if(this.positionFromTop == 'center'){
						if(this.position == "absolute")
							this.dialogWrapper.center(this.divId);
						else {
							this.dialogWrapper.css("top", (($(window).height() - this.dialogWrapper.outerHeight()) / 2) + "px");
							this.dialogWrapper.css("left", (($(window).width() - this.dialogWrapper.outerWidth()) / 2) + "px");
						}

                    }else{
						this.dialogWrapper.center(this.divId).css('top', this.positionFromTop + '%');
					}

                    //set position of the dialog
                    switch(this.position){
                        case "absolute":
                            this.dialogWrapper.css("position","absolute");
                            break;
                        default:
                            this.dialogWrapper.css("position","fixed");
                    }
				}
				// END: normal dialog
			// END: Display Dialogs

// Generic Message Dialog using Frameless Dialog Engine
		// setup so you can pass a message into a dialog, without hitting the server and loading content into a wrapper
			this.displayGenericDialogMsg = function(title, msg, width, height){
				var settings = {
					divId:				'generic_message_dialog',
					title:				'<h2>' + title + '</h2>',
					frameSrc:			'',
					frameWidth:			width,
					frameHeight:		height,
					wrapper:			'dialogWrapper',
					positionFromTop:	'center',
					msg:				'<div>' + msg + '</div>'
				};
				
				// Dialog Object
				this.setParameters(settings);
				this.buildFramelessDialog();
				this.displayDialog();
			}
	
			// sample
			//displayGenericDialogMsg('My Title', 'My Message', 685, 150);
		// END: Generic Message Dialog
	}
	displayDialog = new objFramelessDialog();
// END: DIALOG OBJECT

	// Close Dialog Button
		$('.closeDialog').live("click", function(event){
			event.preventDefault();
			
			if($("div#dialogWrapper")){
				$("div#dialogWrapper").overlay().close();
			}
		});
	// END: Close Dialog Button


	// OCC Dialog Methods
		function displayOCCData(data){
			var occ_signupforfreeshipObj = $('#occ_signupforfreeship');
			var occ_freeshippingObj = $('#occ_freeshipping');
			if( data.meetsShippingPromoOrderMinimum && data.cartHasAuctionItems == false){
				if(data.customerNotifyFlag == 1){
					if(data.billTo.country == "US"){
						if(data.meetsShippingPromoOrderMinimum){
							occ_signupforfreeshipObj.hide();
							occ_freeshippingObj.text('Congratulations, your shipping is free!').show();
						}else{
							occ_freeshippingObj.hide();
							occ_signupforfreeshipObj.text('Signup for free shipping!').show();
						}
					}else{
						if(data.meetsShippingPromoOrderMinimum){
							occ_signupforfreeshipObj.hide();
							occ_freeshippingObj.text('Congratulations, your shipping is $4.99!').show();
						}else{
							occ_freeshippingObj.hide();
							occ_signupforfreeshipObj.text('Signup for $4.99 shipping!').show();
						}
					}
				}else{
					if(data.billTo.country == "US"){
						occ_freeshippingObj.hide();
						occ_signupforfreeshipObj.text('Signup for free shipping!').show();
					}else{
						occ_freeshippingObj.hide();
						occ_signupforfreeshipObj.text('Signup for $4.99 shipping!').show();
					}
				}
			}else {
				occ_signupforfreeshipObj.hide();
			}
	
			$("#orderId").text("Order Id: "+data.orderId);
	
			var hostPrefix = window.location.protocol + '//' + window.location.hostname;
	
			// build shopping cart content
			var occOrderItems = data.availableCustomerItems;
			var appendHTML = "";
			var storeCredit = data.storeCredit;
			for( var i in occOrderItems ) {
				var orderItem = occOrderItems[i];
				var brand = orderItem.productDAO.prodBrand;
				var title = orderItem.title;
				var thumb = orderItem.thumbnail;
				var color = orderItem.colorName;
				var size = orderItem.size;
				var estimatedDeliveryFrom = dateFormat(orderItem.customerItemDAO.estimatedDeliveryFrom);
				var estimatedDeliveryTo = dateFormat(orderItem.customerItemDAO.estimatedDeliveryTo);
				var expireDate = displayTime(orderItem.secondsLeft);
				var orderDate = dateFormat(orderItem.customerItemDAO.dateCreated);
	
				var productUrl = hostPrefix+"/bzJApp/SalesEventItemDisplay.action?itemid="+orderItem.axItemID +
					"&sid="+SiteID+
					"&tid="+TenantID+
					"&versionID=" + VersionID +
					"&selectedExternalColorId="+orderItem.color+
					"&saleEventId="+orderItem.customerItemDAO.salesEventId;
	
				//show if color or size exists in orderItem
				var colorHtml = "";
				var sizeHtml = "";
				if(color.length != 0 ){
					colorHtml =  "<p id='"+color+"'>Color: " + color + "</p>";
				}
				if(size != null ){
					 sizeHtml = "<p id='"+size+"'>Size: " + size + "</p>";
				}
	
				appendHTML+= ""
				+"<tr>"
					+"<td>"
						+ "<img class='oneClickCheckout_itemthumb' src='"+thumb+"' alt='' />"
					+"</td>"
					+"<td class='size1of2 txtL'>"
						+"<p class='itemTitle'><strong>"+brand+"</strong></p>"
						+"<p><a href='"+productUrl+"'>"+title+"</a></p>"
						+colorHtml
						+sizeHtml
						+"<p><strong>Reservation Expires in: "+expireDate+"</strong></p>"
						+"<p>Order Date: "+orderDate+"</p>"
						+"<p>Estimated Delivery to US Address: "+estimatedDeliveryFrom+" ~ "+estimatedDeliveryTo+"</p>"
						+"<p><strong>Return this item 30 days after shipping for cash back or store credit.</strong></p>"
					+"</td>"
					+"<td>"
						+"<p><strong>"+orderItem.customerItemDAO.quantity+"</strong></p>"
					+"</td>"
					+"<td>"
						+"<p><strong>$"+new NumberFormat(orderItem.customerItemDAO.amount).toCurrency()+"</strong></p>"
					+"</td>"
				+"</tr>";
			}
			// display shopping cart content
			$("#occTable").html(appendHTML);
	
			// billing info
			var billState = "";
			if(data.billTo.state != null){
				billState = data.billTo.state;
			}
			$("p#occBillingName").text(data.billTo.firstName + " " + data.billTo.lastName);
			$("p#occBillingAddress1").text(data.billTo.address1);
			$("p#occBillingAddress2").text(data.billTo.address2);
			$("p#occBillingCity").text(data.billTo.city + ", " + billState + " " + data.billTo.zipCode);
			$("p#occBillingCountry").text(data.billTo.country);
	
			// shipping info
			var shipState = "";
			if(data.billTo.state != null){
				shipState = data.billTo.state;
			}
			$("p#occShippingName").text(data.shipTo.firstName + " " + data.shipTo.lastName);
			$("p#occShippingAddress1").text(data.shipTo.address1);
			$("p#occShippingAddress2").text(data.shipTo.address2);
			$("p#occShippingCity").text(data.shipTo.city + ", " + shipState + " " + data.shipTo.zipCode);
			$("p#occShippingCountry").text(data.shipTo.country);
	
	
			// shipping calculations
			var shippingTotal = data.shipping - data.shippingDiscount;
			if(shippingTotal > 0){
				$("#occShippingTotal").text('$' + new NumberFormat(shippingTotal).toCurrency());
			}else{
				$("#occShippingTotal").text('Free Shipping');
			}
	
			// order summary
			$("#occSubTotal").text('$' + new NumberFormat(data.subTotal + data.tax + shippingTotal).toCurrency());
	
			//$("#occAuctionFeeTotal").text('$' + new NumberFormat(data.auctionFee).toCurrency());
			$("#occMerchandise").text('$' + new NumberFormat(data.subTotal).toCurrency());
			$("#occTaxTotal").text('$' + new NumberFormat(data.tax).toCurrency());
			$("#occCreditTotal").text('$' + new NumberFormat(data.storeCredit).toCurrency());
			$("#occFinalTotal").text('$' + new NumberFormat(data.total).toCurrency());
	
			// cc info
			$("#occCreditCard").text(data.defaultCreditCard.creditCardNumberMasked);
	
			// shipping method
			$("#occShippingMethodDescription").text(data.selectedShippingMethodDescription);
	
			// pixel
			//$("#purchasePixel").text(data.purchasePixel);
	
			// make content visible
			$('#frame_occ_dialog').css('visibility', 'visible');
	
			// remove preloader
			removeOCCLoad();
		}
		
		function resendPopulateOCCDialog(currentAttempt){
			if(occPopulateAttempts <= occMaxPopulateAttempts){
				// resend populate dialog request
				populateOCCDialog();
				
				// wait another 5 seconds and test if we should resend request again
				occResendTimer = setTimeout(function(){
					// check if the current attempt still equals the populate attempt which gets auto incremented when the populateOCCDialog function starts
					if(currentAttempt == occPopulateAttempts){
						occPopulateAttempts++;
						resendPopulateOCCDialog(occPopulateAttempts);
					}
				},5000);
			}else{
				alert("There was an error gathering your information.  Please try again.");
			}
		}
		
		function populateOCCDialog(){
			occPopulateAttempts++;
			
			// make JSON call to get data
			querystring = securePrefix + "/bzJApp/ShowOneClickCOFormJson.action?";
			param = "sid=" + SiteID + "&tid=" + TenantID;
			querystring = querystring + param;
			
			//alert(querystring);
			var request = jQuery.ajax({
				type: "GET",
				url:querystring  + "&cb=" + Math.random() + "&callback=?",
				cache: false,
				jsonp:true,
				crossDomain:true,
				dataType:'jsonp',
				success: function(data){
					//console.log(data);
					// display data
					displayOCCData(data);
					occPopulateAttempts = 0;
				},
				error: function(data){
					if(occPopulateAttempts <= occMaxPopulateAttempts){		// these variables are set before this function is called
						populateOCCDialog();
					}else{
						alert("There was an error gathering your information.  Please try again.");
					}
				}
			});
		}
	
		// set necessary variables to manage error handling failsafes
		var 
			occPopulateAttempts = 0, 
			occMaxPopulateAttempts = 4,
			occResendTimer;
		
		$('a#OCCLink, a#expiring_occcheckout').click(function(event) {
			if (usePersistentLoginCookie =='Y' && !getModniqueCookie(checkoutCookieName))
			{
				event.preventDefault();
				$('a#usernav_login').trigger('click');
			}
			else
			{
				event.preventDefault();
				$('.closeDialog ').click();
		
				// construct object settings from parameters
				var settings = {
					divId:				'OCCDialog',
					position:                'fixed',
					title:				'<h2 id="OCCheader">Modnique Express Checkout <span class="contrast"></span></h2>',
					frameSrc:			hostPrefix + "/bzJApp/ShowOneClickCOForm.action?sid=" + SiteID + "&tid=" + TenantID + "&versionID=" + VersionID,
					frameWidth:			790,
					frameHeight:		650,
					wrapper:			'dialogWrapper',
					positionFromTop:	5
				};
	
				// Dialog Object
				displayDialog.setParameters(settings);
				displayDialog.buildFramelessDialog();
				displayDialog.displayDialog();
				
				// Populate the One Click Checkout dialog
					// reset attempts back to 0;
					occPopulateAttempts = 0;
					
					// clear old timeout just in case user is repeatedly trying to open the OCC Dialog
					clearTimeout(occResendTimer);
			
					// default populate OCC dialog function
					populateOCCDialog();
					
					// make sure the populateOCCDialog is triggered and that the js stacking order didn't get inturrupted.
					// resend populateOCCDialog request to prevent the dialog from locking up.
					occResendTimer = setTimeout(function(){
						if(occPopulateAttempts == 0){
							occPopulateAttempts++;
							resendPopulateOCCDialog(occPopulateAttempts);
						}
					},10000);
				// END: Populate the One Click Checkout dialog
			}
		});
	// END: OCC Dialog Methods


	// View Refund Lines
		$('a.refundType').click(function(event) {
			event.preventDefault();
			
			// construct object settings from parameters
			var refundNum = $(this).attr("rel");
			var settings = {
				divId:				'showRefundLines_dialog',
				title:				'<h2>Refund for: ' + refundNum + '</h2>',
				frameSrc:			hostPrefix + "/bzJApp/ViewRefundLines.action?sid=" + SiteID + "&tid=" + TenantID + "&versionID=" + VersionID + "&refundNum=" + refundNum,
				frameWidth:			500,
				frameHeight:		335,
				wrapper:			'dialogWrapper',
				positionFromTop:	25
			};
			
			// Dialog Object
			displayDialog.setParameters(settings);
			displayDialog.buildFramelessDialog();
			displayDialog.displayDialog();
		});
	// END: View Refund Lines

	// Login Dialog
		function prepareLoginDialog(dialogFrameSrc, returnUrl){
			// check if dialogWraper is built and dynamically build it, if it's not available
			if( $('div#dialogWrapper').length <= 0){
				$('<div />').attr({
					id: 'dialogWrapper'
				}).appendTo('body');
			}
			
			// construct object settings from parameters
			var settings = {
				divId:				'showLogin_dialog',
				title:				"<h2>Log in to continue shopping on Modnique</h2>",
				frameSrc:			dialogFrameSrc,
				frameWidth:			650,
				wrapper:			'dialogWrapper',
				positionFromTop:	25
			};
			
			// Dialog Object
			displayDialog.setParameters(settings);
			displayDialog.buildFramelessDialog();
			displayDialog.displayDialog();
			
			// set returnUrl element in form
			$('<input />').attr({
				type: 'hidden',
				id: 'ajax_dialogReturnUrl',
				name: 'ajax_dialogReturnUrl'
			}).appendTo('#showLogin_dialog');
			
			$('input#ajax_dialogReturnUrl').val(returnUrl);
			
			// dynamically adjust css
			$('div#showLogin_dialog').css({
				'border':'none'	
			});
		}
		
		// dynamically generated open_login_button
		$('a#open_login_button').live('click', function(event) {
			
			var returnUrl = document.location.href;
			var dialogFrameSrc = hostPrefix + '/bzJApp/ViewDialog.action?sid=' + SiteID + '&tid=' + TenantID + '&pageName=login&versionID=' + VersionID + '&returnURL=' + escape(returnUrl);
			
			prepareLoginDialog(dialogFrameSrc, returnUrl);
		});
		
		// login from top nav utilites
		$('a#usernav_login').live('click', function(event, retUrl) {
			event.preventDefault();
			
			var returnUrl = (retUrl==''||retUrl==null?document.location.href:retUrl).replace('showLogin=true','');
			var dialogFrameSrc = hostPrefix + '/bzJApp/ViewDialog.action?sid=' + SiteID + '&tid=' + TenantID + '&pageName=login&versionID=' + VersionID + '&returnURL=' + escape(returnUrl) + "&loginFromTopNav=Y&hostPrefix="+window.location.protocol + '//' + window.location.hostname;

			prepareLoginDialog(dialogFrameSrc, returnUrl);
		});
		
		// login from invite a friend utility
		$('a#nav_invite_login').click(function(event) {
			event.preventDefault();

			var param = "&invite=true";
			var returnUrl = requestURI + param;
			var dialogFrameSrc = hostPrefix + '/bzJApp/ViewDialog.action?sid=' + SiteID + '&tid=' + TenantID + '&pageName=login&versionID=' + VersionID + '&returnURL=' + escape(returnUrl);

			prepareLoginDialog(dialogFrameSrc, returnUrl);
		});
		
		// login from signup dialog
		$('a#loginLinkTop').live('click', function(event){
			event.preventDefault();
			
			$('a#usernav_login').click();
		});
		
		$('.makeOffer').click(function(event) {
			event.preventDefault();

			var returnUrl = document.location.href;
			var dialogFrameSrc = hostPrefix + '/bzJApp/ViewDialog.action?sid=' + SiteID + '&tid=' + TenantID + '&pageName=login&versionID=' + VersionID + '&returnURL=' + escape(returnUrl);

			prepareLoginDialog(dialogFrameSrc, returnUrl);
		});

		// login from addToBag button on product page
		if (!isCustomerLoggedIn()){
			$('a.bag_button, input.bag_botton').click(function (event){
				event.preventDefault();
				
				// empty dialog
				$("div#login_dialog").html('');
				
				// create returnUrl
					if( objSizeAndColorOptions.trim(objSizeAndColorOptions.selectedSize) == "" ){
						selectedSize = defaultSize;
					}
					if( objSizeAndColorOptions.trim(objSizeAndColorOptions.selectedColor) == "" ){
						externalColorId = defaultExternalColorId;
					}else{
						externalColorId = itemAvailabilityChecker.getColorIdByColorName(objSizeAndColorOptions.trim(objSizeAndColorOptions.selectedColor));
					}
					quantity = "1";
					if( $('input#quantity').length > 0 ){
						quantity = $('input#quantity').val();
					}
		
					objSizeAndColorOptions.fillSizeAndColor();
					var parentURLPrefix = modAddToCartLink;
		
					//  TRYING TO CONNECT TO SECURE ^^^^ from modAddToCartLink
					var returnUrl = parentURLPrefix + '?sid=' + SiteID + '&versionID=' + VersionID + '&salesEventItemId=' + salesEventItemId + '&salesEventId=' + salesEventId + '&productId=' + eventProductId + '&size=' + objSizeAndColorOptions.selectedSize + '&externalColorId=' +externalColorId + '&quantity=' + quantity;
				// END: create returnUrl
				
				var dialogFrameSrc = hostPrefix + '/bzJApp/ViewDialog.action?sid=' + SiteID + '&tid=' + TenantID + '&versionID=' + VersionID + '&pageName=login' + '&returnURL='+encodeURIComponent(returnUrl) + "&loginFromAddToBag=Y&hostPrefix="+window.location.protocol + '//' + window.location.hostname;
				
				prepareLoginDialog(dialogFrameSrc, returnUrl);
			});
		} 
		// login from addToBag button on event page
			$('a.bag_button_new, input.bag_button_new').click(function (event){
				// empty dialog
				$("div#login_dialog").html('');
				
				var returnUrl = products.returnUrl;

				var dialogFrameSrc = hostPrefix + '/bzJApp/ViewDialog.action?sid=' + SiteID + '&tid=' + TenantID + '&versionID=' + VersionID + '&pageName=login' + '&returnURL='+encodeURIComponent(returnUrl) + "&loginFromAddToBag=Y&hostPrefix="+window.location.protocol + '//' + window.location.hostname;
				
				prepareLoginDialog(dialogFrameSrc, returnUrl);
			});

		// Open forgot password page
			$('a.forgotPasswordLink').live("click", function(event) {
				event.preventDefault();
				
				top.parent.location.replace("/bzJApp/ViewRememberPasswordForm.action?sid=300&tid=100&versionID=" + VersionID);
			});
		// Open forgot password page
	// END: Login Dialog

    function showSignUpDialog(returnUrl) {
        var dialogFrameSrc = hostPrefix + "/bzJApp/ViewDialog.action?sid=" + SiteID + "&tid=" + TenantID + "&pageName=signup&versionID=" + VersionID + "&returnURL='" + encodeURIComponent(returnUrl);
        // construct object settings from parameters
        var settings = {
            divId:'showSignup_dialog',
            title:"<h2>Two easy ways to join</h2>",
            frameSrc:dialogFrameSrc,
            frameWidth:650,
            wrapper:'dialogWrapper',
            positionFromTop:15
        };
        // Dialog Object
        displayDialog.setParameters(settings);
        displayDialog.buildFramelessDialog();
        displayDialog.displayDialog();
        // set returnUrl element in form
        $('<input>').attr({
            type:'hidden',
            id:'ajax_dialogReturnUrl',
            name:'ajax_dialogReturnUrl'
        }).appendTo('#showSignup_dialog');
        $('#ajax_dialogReturnUrl').val(returnUrl);
        // dynamically adjust css
        $('input#showSignup_dialog').css({
            'background':'none',
            'border':'none'
        });
    }

    // Open signup page
		$('a.signupLink').live("click", function(event) {
			event.preventDefault();

            var returnUrl = 'bzJApp/ViewThankYouAction.action?sid=' + SiteID + '&tid=' + TenantID + '&versionID=' + VersionID;
            var promoCookie = jQuery.cookie('promo');
            if (promoCookie != '') returnUrl = returnUrl + '&emailValid=true&promoid=' + promoCookie;
            showSignUpDialog(returnUrl);
        });
		
		var lp = getSpecificUrlValue('lp')=='show'?getSpecificUrlValue('lp'):'';
		if(lp == 'show' && (getModniqueCookie("customer") == null || getModniqueCookie("customer").length < 14)){
			$('a.signupLink').trigger('click');
		}
		
	// END: Open signup page

    //Open signup from login
    $('a#signupLinkTop').live('click', function(event){
        event.preventDefault();

        showSignUpDialog($('#ajax_dialogReturnUrl').val());
    });
    //END Open signup from login

	// Open vertical signup page
		var rp = getSpecificUrlValue('rp');
		if(rp == "show"  && !(getModniqueCookie("cookie") && getModniqueCookie("cookie")!="" && getModniqueCookie("cookie")!='""')){
			//signupDialog();
			var returnUrl = 'bzJApp/ViewThankYouAction.action?sid=' + SiteID + '&tid=' + TenantID + '&versionID=' + VersionID;
			var promoCookie = jQuery.cookie('promo');
			if (promoCookie != '') returnUrl = returnUrl + '&emailValid=true&promoid=' + promoCookie;
			var dialogFrameSrc = hostPrefix + "/bzJApp/ViewDialog.action?sid=" + SiteID + "&tid=" + TenantID + "&pageName=signup_iframe_vertical&returnURL='"+encodeURIComponent(returnUrl);
		
			// construct object settings from parameters
			var settings = {
				divId:				'showSignupVertical_dialog',
				title:				"",
				frameSrc:			dialogFrameSrc,
				frameWidth:			478,
				frameHeight:		559,
				wrapper:			'dialogWrapper',
				positionFromTop:	8
			};
			
			// Dialog Object
			displayDialog.setParameters(settings);
			displayDialog.buildFramelessDialog();
			displayDialog.displayDialog();
			
			// set returnUrl element in form
			$('<input>').attr({
				type: 'hidden',
				id: 'ajax_dialogReturnUrl',
				name: 'ajax_dialogReturnUrl'
			}).appendTo('#showSignupVertical_dialog');
			
			$('#ajax_dialogReturnUrl').val(returnUrl);
			
			// dynamically adjust css
			$('input#showSignup_dialog').css({
				'background':'none',
				'border':'none'
			});
			$('div#dialogWrapper').width(448);
		}
	// END: Open vertical signup page

	
	// Surveys
		$('div#dialogSurveyLink').live('click', function(event, touchPointSurvey, salesId) {
			event.preventDefault();
			
			// construct parameters
			var dialog = "survey";
			var title			=	"<h2>Tell Us How We're Doing</h2>";
			var closeButton		=	'closeSurvey';
			if(displayTouchPointSurvey == 'Y'){
				var frameSrc 		=	hostPrefix + "/bzJApp/ShowSurvey.action?sid=" + SiteID + "&tid=" + TenantID + "&versionID=" + VersionID + "&touchPoint=" + touchPointSurvey;
				var frameWidth 	=	580;
					if(touchPointSurvey == 'checkout'){
						var frameHeight	=	1050;
						frameSrc+= "&salesId=" + orderConfirmationNum;
					}else if(touchPointSurvey == 'fulfillment'){		
						var frameHeight	=	835;
						frameSrc += "&salesId=" + salesId;
					}else if(touchPointSurvey == 'customerservice'){	var frameHeight	=	940;
					}else if(touchPointSurvey == 'survey'){				var frameHeight	=	2010;
					}
				var wrapper = 'dialogWrapper';
				var positionFromTop		=	5;
			}else{
				var frameSrc 		=	hostPrefix + "/bzJApp/ViewDialog.action?sid=" + SiteID + "&tid=" + TenantID + "&versionID=" + VersionID + "&pageName=" + dialog;
					frameSrc+=salesEmail?'&email=' + salesEmail:'';
				var frameWidth 	    =	800;
				var frameHeight 	=	1100;
                var positionFromTop	=	45;
			}	
			
			if(displayTouchPointSurvey == 'Y'){
				// construct object settings from parameters
				var settings = {
					divId:				'survey',
					position:			'absolute',
					title:				title,
					frameSrc:			frameSrc,
					frameWidth:			frameWidth,
					frameHeight:		frameHeight,
					wrapper:			wrapper,
					positionFromTop:	positionFromTop
				};
				
				// Dialog Object
				displayDialog.setParameters(settings);
				displayDialog.buildFramelessDialog();
				displayDialog.displayDialog(touchPointSurvey);
			}else{
				// construct object settings from parameters
				var settings = {
					divId:				'survey',
					position:			'absolute',
					title:				title,
					frameSrc:			frameSrc,
					frameWidth:			720,
					frameHeight:		340,
					wrapper:			wrapper,
					positionFromTop:	positionFromTop
				};
				
				// Dialog Object
				displayDialog.setParameters(settings);
				displayDialog.buildFramelessDialog();
				displayDialog.displayDialog(touchPointSurvey);
			}
		});
		
		// setup dialog elements -- needs to be below the object and event listener
		if(displayTouchPointSurvey == 'Y'){
			// create DOM element
			$('<div />').attr({
				id: 'dialogSurveyLink'
			}).appendTo('body');						
		
			var nps = getSpecificUrlValue('nps')!=false?getSpecificUrlValue('nps'):'';
			var salesId = getSpecificUrlValue('salesId');
			if(nps != ''){
				$('div#dialogSurveyLink').trigger('click', [nps, salesId]);
			}
		}
	// END: Surveys
	
});

