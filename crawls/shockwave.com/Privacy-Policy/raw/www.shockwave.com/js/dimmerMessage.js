$(document).ready(function() {	//triggers grayed out screen, adds message for user	//accepts custom width if need be	// preload images for the shadowBox   //$.preloadImages("/i/common/shadowBox/shtl.png","/i/common/shadowBox/shtm.png","/i/common/shadowBox/shtr.png","/i/common/shadowBox/shbl.png","/i/common/shadowBox/shbm.png","/i/common/shadowBox/shbr.png","/i/common/shadowBox/shml.png","/i/common/shadowBox/shmr.png");		var messageTransfer = "";	var messageTransferID = null;	/**	 * Show modal dialog with fog screen	 * @param id Existing id of contents to display in the message	 * @param customWidth	 * @param destURL Url for button	 * @param gameKeyword For Game Screenshots	 * @param pinMessage Boolean Option to make the dialog scroll with the page	 */	showMessage = function( id, customWidth, destURL, gameKeyword, pinMessage ){		var iFrameLayer = null;		// if there's already a message shown, destroy it's content but reuse the framework		if ( messageTransferID != null ) {			$(messageTransferID).html(messageTransfer);			$("#dimmerMessage").remove();		// Otherwise create the dimmer framework		} else {			iframeLayer = "<iframe id=\"iframeLayer\" style=\"z-index:99;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0;filter: alpha(opacity=0);\" src=\"javascript:''\"></iframe>";			$('<div id="dimmer"></div>').appendTo(document.body);		}		messageTransferID = id;		// get the message HTML that need to show		messageTransfer = $(id).html();		// empty that HTML so we don't end up with two IDs		$(id).empty();				// insert the layers, the dimmer itself and the dimmer message with inserted text		var btnClose = '<a class="dimmerBtnClose clearLink" href="#">Close</a>';		/* betty Crocker sponsorship 009/06/2011 */		var bettyCrockNSI = $('.clearfix').hasClass('bc_scratcherPop');		$('<div id="dimmerMessage"><table class="shadowBox"><tr><td class="shtl"></td><td class="shtm"></td><td class="shtr"></td></tr><tr><td class="shml"></td><td class="shmm">' + btnClose + messageTransfer + '</td><td class="shmr"></td></tr><tr><td class="shbl"></td><td class="shbm"></td><td class="shbr"></td></tr></table></div>').appendTo(document.body);		if (bettyCrockNSI){			$('.podTitle').html('<a href=\'http://www.boxtops4education.com/\' target=\'_blank\'><img src=\'/i/sponsors/bettyCrocker/3_logos_green.png \' class=\'sw_bcScratcherNSI\' alt=\'Betty Crocker Fruit Snacks | Shockwave.com Sign-In\' />').css({ 'height' : '228px' , 'margin-bottom' : '0px' , 'background' : 'url(/i/sponsors/bettyCrocker/chalkboard_nsi.png \)' , 'background-repeat' : 'no-repeat' });		}		$('.dimmerBtnClose').click( function() {			if(bettyCrockNSI){				window.location = 'fruitsnacks.jsp';			}			hideMessage();			return false;		});		hideFlashObjects();		var ieScrollTop = 0;		if ( typeof document.body.style.maxHeight === "undefined" ) { // if IE 6			ieScrollTop = document.documentElement.scrollTop;			if ( iFrameLayer != null ) {				$(iframeLayer).appendTo(document.body);			}		}		 		// Determine and set negative marginLeft to pull it back to center		if (customWidth) {			var messageWidth = customWidth;			$("#dimmerMessage").width(customWidth+"px");		} else {			var messageWidth = $("#dimmerMessage").width();		}		var messageLftMarg = ( messageWidth / 2 ) - messageWidth;		$("#dimmerMessage").css("marginLeft",messageLftMarg);		 		// Determine and set negative marginTop to pull it back to center		var messageHeight = $("#dimmerMessage").height();		var messageTopMarg = ( messageHeight / 2 ) - messageHeight + ieScrollTop;		$("#dimmerMessage").css("marginTop",messageTopMarg);						if ($.browser.opera) { // have to do this wonky show/hide for opera because the flash layer peeks through otherwise			$("#flashItem").css("visibility","hidden");			$("#dimmer, #dimmerMessage").show();			$("#flashItem").css("visibility","visible");		} else {			// fade in, then fade in message, fixes issue with IE			$("#dimmer").fadeIn("fast",function(){				$("#dimmerMessage").fadeIn("fast",function(){					if (destURL) {						$("#dimmerMessage").find(".btnOnlinePlain").attr("href",destURL);					}					// for screenshots					if (gameKeyword) {						$("#screenShotsWrapper .carousel-container li").each(function (i) {							imgURL = "url(/content/screenshots/"+gameKeyword+"_billboard_"+(i+1)+".jpg)";							$(this).css("background",imgURL);						});					}				}); 			}); 		}		// check for pinMessage argument and change style to let the message scroll		if (pinMessage){			var dimmerHeight = $("#dimmerMessage").height();			var windowHeight = $(window).height();			var distanceToTop =  $("html").scrollTop()			var topPos = dimmerHeight > windowHeight ? distanceToTop + 10 : distanceToTop + ( windowHeight/2 - dimmerHeight/2 );			$('#dimmerMessage').css('position', 'absolute').css('margin-top',0).css('top',topPos);		}	};	// hides the dimmer and the message	// Option callback for averting timing conflicts fade in/out	hideMessage = function(doNotFade){		if ($.browser.msie) { // if IE			$("#dimmer, #dimmerMessage").remove();			$("#iframeLayer").remove();		} else {			if(typeof doNotFade != 'undefined' && doNotFade == true) {				$("#dimmer, #dimmerMessage").remove();			}else{				$("#dimmer, #dimmerMessage").fadeOut("fast",function(){					$("#dimmer, #dimmerMessage").remove();				});			}		}		showFlashObjects();		$(messageTransferID).html(messageTransfer);		messageTransferID = null;	};});	/**	 * Load content into the #dynamicContent div if it doesn't exist then call showMessage	 * @param messageURL Url to ajax load into the overlay window	 * @param id Existing id of contents to display in the message	 * @param alwaysLoad boolean if true always reload the contents of id before showing the message	 * @param customWidth	 * @param destURL Url for button	 * @param gameKeyword For Game Screenshots	 * @param pinMessage Boolean Option to make the dialog scroll with the page	 * @param callbackFunction function to call on success of showMessage	 */showAjaxMessage = function( messageURL, id, alwaysLoad, customWidth, destURL, gameKeyword, pinMessage, callbackFunction ){	if ( $(id).length == 0 || alwaysLoad ){		$(id).remove();		$.post(messageURL, function(data) {			$('#dynamicContent').append(data);			showMessage( id, customWidth, destURL, gameKeyword, pinMessage );			if( typeof callbackFunction != "undefined" ){				callbackFunction();			}		});	} else {		showMessage( id, customWidth, destURL, gameKeyword, pinMessage );		if( typeof callbackFunction != "undefined" ){			callbackFunction();		}	}};