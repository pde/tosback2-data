// JavaScript Document www-portal-media C:\prod\www\repo\html\https-staging\assets\js\global
var Cof = Cof || {};
var zipOptOutFlag = false;		
//start cof.js functions
(function() {

    // JavaScript is enabled, so add an id to the html tag
    // to trigger JavaScript specific CSS styles
    // @link http://en.wikipedia.org/wiki/Unobtrusive_JavaScript
    // @link http://en.wikipedia.org/wiki/Progressive_Enhancement
    // @link http://www.learningjquery.com/2008/10/1-awesome-way-to-avoid-the-not-so-excellent-flash-of-amazing-unstyled-content
    jQuery('html').attr('id', 'js-enabled');

	// [drew.liverman | 09.15.10]		
		
	// FAQ slide toggle
	
	// [drew.liverman | 12.11.10] faq slide toggle		

	$(function(){ 
		$('#js-enabled .faq li dl dd').css('display','block').hide();
			// [patrick gavin | 12.28.11] add deep linking support to expand answer based on URL #ID-NAME-HERE
            var hashLinkIndex = window.location.href.indexOf('#');
            if (hashLinkIndex != -1 && location.href.indexOf("?") != -1) {
                var faqLinkResults = window.location.href.substring((hashLinkIndex+1),window.location.href.indexOf('?'));
                if (faqLinkResults) {
                    $('.faq li#'+faqLinkResults+' dl dd').slideToggle();
					var faqLinkResultsElement = document.getElementById(faqLinkResults);
					if (faqLinkResultsElement !=null && faqLinkResultsElement != undefined ) {
					   document.getElementById(faqLinkResults).scrollIntoView();
					}
                }
            } else if (hashLinkIndex != -1) {
                var faqLinkResults = window.location.href.slice(window.location.href.indexOf('#') + 1);
                if(faqLinkResults){$('.faq li#'+faqLinkResults+' dl dd').slideToggle();}                        
			}

			var loaded = $('.faq dl dt').attr('faqloaded');
			
			//make sure FAQ click has only been registered once.
			if (loaded == null) {
				$('.faq dl dt').attr('faqloaded', true);
				// [drew.liverman | 03.08.11] updating jq selector for proper markup		
				$('.faq dl dt').click(function(){
					$(this).next().slideToggle();
				});
			}
	});
		
	// [drew.liverman | 02.04.10]
	if (jQuery.browser.msie) jQuery('a img').parent().css('text-decoration','none');
		
		
    // Adds the class "last" to the last item in the
    // utility links to remove the right border
    jQuery.elReady('#utility-links li:last', function() {
        jQuery(this).addClass('last');
    })

    if (navigator.appVersion.indexOf('MSIE 6.0') != -1) {

        // Fixes png transparency issues in IE6
        jQuery.elReady('img[src$=.png]', function() {
            jQuery(this).ifixpng();
        });

        // Fixes background image cache issues in IE6
        try {
            document.execCommand("BackgroundImageCache", false, true);
        } catch (e) {}
    }
	// Applies the tooltip functionality if the appropriate class have been applied
    jQuery(function() {
        jQuery('.clicktip-trigger').cluetip({
            cluetipClass: 'clicktip-content',
            closePosition: 'top',
            local:  true,
            cursor: 'pointer',
            sticky: true,
            activation: 'click',
            showTitle: false,
            dropShadow: false,
            closeText: 'Close'
        });

        jQuery('.hovertip-trigger').cluetip({
            cluetipClass: 'hovertip-content',
            local: true,
            showTitle: false,
            arrows: true,
            width: 220
        });
		
	/*-----------[ Cluetip Replaced by Brian.Dillon 6.09.10 ]--------------*/
	jQuery('a.tooltip').cluetip({
		cluetipClass: 'rounded', 
		dropShadow: false, 
		sticky: true, 
		mouseOutClose: true,
		width:300,
		arrows: true, 
		cursor: 'pointer',
		ajaxCache: true
  	});
    });

})();

$(document).ready(function(){
	loadOnStartup();
	initModals();
	loadPostScripts();
});

function initModals() {
// improved colorbox function - *demands that modal pages do not breakout of frames
	$('a.modal-overlay').each(function() {	
		$(this).colorbox({
			close: "Close Window <strong>X</strong>",
			maxWidth: "720px",
			maxHeight: "550px",
			opacity: "0.7",
			iframe:$(this).hasClass('externalModal'),
			overlayClose:false,
			innerWidth:"720px",
			innerHeight:"550px",
			mouseOutClose: true,
			onComplete: function() {
				//Invoking the footnote.js document.ready portion
				renumberSingleFootnotes();
			
				//This is a function within this file that was extracted
				//to be invoked when a Modal Window loads
				loadOnStartup();
				
				//This is a function within this file that was extracted
				//to be invoked when a Modal Window loads
				handleToolTips();

				loadPostScripts();
			}
		});
	});
}

//This function is invoked after a Modal Window loads its contents
//(see the onComplete attribute of colorBox (above))
function loadPostScripts() {
	$(document).ready(function() {
		/* add "last" class to list component ul.li */
		$('.list ul').each(function(){
			$(this).find('li:last').addClass('last');
		});
		
		/* Byron 09.17: tables js */
		/* 10.11: tables need thead */
			//table at-a-glance
			$('table.glance tr').each(function() { $(this).find('td, th').first().addClass('first'); });
			$('table.glance').each(function() { 
				$(this).find('tbody tr').first().addClass('credit-level');
				$(this).find('tbody tr:odd').addClass('odd');
				$(this).find('tbody tr:even').addClass('even');
			});
			//table basic & table marketing
			// [patrick gavin | 01.12.12] edit to find most columns in a row and check if tfoot already exists
			var basicColCount = new Array();
			var maxColCount = 0;
			$('table.basic tr').each(function() { $(this).find('td, th').first().addClass('first'); });
			$('table.basic').each(function() { 
                $(this).find('tbody tr:odd').addClass('odd');
                $(this).find('tbody tr:even').addClass('even');
                $(this).find('thead tr').last().addClass('last');
                $(this).find('tbody tr').each(function(){
                                basicColCount.push($(this).find('td').length);
                                if($(this).parent().parent().hasClass('two-col-table')){
									basicColCount.push($(this).find('th').length + $(this).find('td').length);
								}
                });
                $(this).find('thead tr').each(function(){
                                basicColCount.push($(this).find('th').length);
                });
                maxColCount = Math.max.apply(Math, basicColCount);
                if($(this).find('tfoot').length==0){
                	if($(this).find('thead').length==0){
						$(this).find('tbody').after('<tfoot><tr><td colspan="' + maxColCount + '">&nbsp;</td></tr></tfoot>').find('td, th').css('width', 100 / maxColCount + "%");
					} else {
						$(this).find('thead').after('<tfoot><tr><td colspan="' + maxColCount + '">&nbsp;</td></tr></tfoot>').find('td, th').css('width', 100 / maxColCount + "%");
					}                     
                }
			});

			//table rates
			var ratesColCount = 0;
			$('table.rates tr').each(function() { $(this).find('td, th').first().addClass('first'); });
			$('table.rates tbody').each(function() { 
		       $(this).find('tbody tr').last().addClass('last');
		       ratesColCount =  $(this).find('tr:first').length;
		       $(this).find('thead').after('<tfoot><tr><td colspan="' + ratesColCount + '">&nbsp;</td></tr></tfoot>').find('td, th').css('width', 100 / ratesColCount + "%");
			});
	});
	
	// grey out via login link
	primaryNavLogin(false);
}

// force is true if login from hp
function primaryNavLogin(force)
{
	 if(force){
		greyOut();
	}
	else if((window.location.href.indexOf("login=true")  >  - 1) && (document.referrer.indexOf("login=true") == -1)){
		greyOut();
    }
}

function greyOut()
{
	//start fix for IE7 bug
	$('#whiteout').appendTo($('#section-2').parent()).show();
	$('#whiteout').appendTo($('#section-3-bll').parent()).show();
	$('#header').attr('style','z-index:-1 !important');
	//end IE

	$('#whiteout').show();
	$('#section-2').addClass("primaryNavLoginZindex");
	$('#log-in-badge').addClass("primaryNavLoginZindex");
	$('.user-id input:visible').focus();

	$('#whiteout').click(function() {
	   $(this).hide();
		$('#header').removeAttr('style');
		$('#section-2').removeClass("primaryNavLoginZindex");
		$('#log-in-badge').removeClass("primaryNavLoginZindex");
	});

	$('body').keydown(function(w)  {
		if(w.keyCode  == 27)  {
			$('#whiteout').hide();
			$('#header').removeAttr('style');
			$('#section-2').removeClass("primaryNavLoginZindex");
			$('#log-in-badge').removeClass("primaryNavLoginZindex");
			return false;
		}
});
}

/*
  The contents in this function are extracted into a separate function
  as, a Modal Window that shows internal content has been modified to not
  use an iframe. This function will be invoked in the loadPostScripts 
  method which inturn (the loadPostScripts method) gets invoked when a
  Modal Window loads (see onComplete attribute of colorBox)
*/
function loadOnStartup() {
	//BEGIN - This section is from cof.js (function invoked above).
	//		  The below code has been extracted into a separate (this) method 
	//		  so that it can be invoked when a Modal Window loads, as well.
	
	//Image Left Bullet Fix
	$('div.calloutOuter.imageLeft').each(function(){

		/*var theImage = $(this).find('img');*/
		var theImage = $(this).find('img').filter(':first');

		

		if(theImage != null && theImage != undefined && theImage != ''){
			
			var theSrc = $(theImage).attr('src');
			
			$(theImage).attr('src', '' + theSrc + '').load(function() {
				var imgWidth = theImage.innerWidth();	
				var ul = theImage.parentsUntil('.calloutOuter').find('ul');
				$(ul).find('li').css('margin-left', imgWidth + 'px');
			});	
		}
	});

	//Compare Table Band-Aid
	
	$('table.compare tbody tr th').each(function(){ 

		if($(this).html() == 'Intro APR on Transferred Balances'){
			$(this).parent().remove(); 
		} 

	});
	
	
	// [drew.liverman | sb mktg/compare table band-aid, revisited 12.11.10]
		
	$('table.compare tbody tr').removeClass('even odd');
	$('table.compare tbody tr:odd').addClass('odd');
	$('table.compare tbody tr:even').addClass('even');
	$('table.compare tbody tr:first').removeClass('even').addClass('odd first');
	
	/*
	$('table.compare tbody tr').each(function(){ 

		$(this).removeClass('even').removeClass('odd');

		$(this + ':odd').addClass('odd');
		$(this + ':even').addClass('even');

	});
	*/
	
	$('table.compare tbody tr.first th h6').html('A Great Credit Card for Business Owners Who');
	
	$('#lpButton').click(function(event) { 
		event.preventDefault(); 
	});

/**
//	Apply Aria landmark roles	
// 	QC ID: 8203: 
//	TGM: note this is likely temporary until validators are updated
**/
	$(function() {

	    // Branding Header --> role="banner"
	    $("#header").attr("role", "banner");

	    // Main Content --> role="main"
	    $("#page-content").attr("role", "main");

	    // Site Search --> role="search"
	    $("#search, #c1-search-form").attr("role", "search");

	    // Global Footer --> role="contentinfo"
	    $("#footer").attr("role", "contentinfo");

	    // Navigation (added some other nav items, check with James S. *should we add quicklinks??)
	    $("#nav-primary, #nav-product, #nav-lob").attr("role", "navigation");

	    // this is for you Lam:
	    $(".component").attr("role", "complementary");

	});
	
	//END -   The above section is from cof.js (function invoked in this file).
	//		  The above code has been extracted into a separate (this) method 
	//		  so that it can be invoked when a Modal Window loads, as well.
}

/*
  The contents in this function are extracted into a separate function
  as, a Modal Window that shows internal content has been modified to not
  use an iframe. This function will be invoked in the loadPostScripts 
  method which inturn (the loadPostScripts method) gets invoked when a
  Modal Window loads (see onComplete attribute of colorBox)
*/
function handleToolTips() {
	$('a.tooltip').each(function(){
		var htmlLink=$(this).attr('rel');
		if(htmlLink != '') {
			var repoURL = '/www-portal/ShowBinary'+ htmlLink;
			$(this).attr('rel', repoURL);
			$(this).attr('href', repoURL);
		}
	});
}
//end cof.js functions

//start header.js functions

    
Cof.Header = function() {

    var c1server = window.location.protocol + "//" + window.location.hostname;

	if(window.location.port != null){
	 c1server = c1server + ":" + window.location.port;
	}
    jQuery.preloadImages(c1server + '/assets/img/global/bg/trans-border.png');
    jQuery.preloadImages(c1server + '/assets/img/global/bg/nav-global_grad.gif');
    jQuery.preloadImages(c1server + '/assets/img/global/icon/sprite/account-access.png');
    jQuery.preloadImages(c1server + '/assets/img/global/bg/nav-primary_hl.gif');
    jQuery.preloadImages(c1server + '/assets/img/global/bg/nav-primary_btm.gif');
    jQuery.preloadImages(c1server + '/assets/img/global/bg/modal_bg.png');
    jQuery.preloadImages(c1server + '/assets/img/global/btn/tb_x.gif');

    jQuery.elReady('#header #nav-global', function() {
        // zip code rolldown
        jQuery('#header #nav-global li.zip-product-search').mouseover(function() {
            jQuery('ul#nav-global li.zip-product-search').addClass('zipCodeOver');
        });
        jQuery('#header #nav-global li.zip-product-search').mouseout(function() {
            jQuery('#header #nav-global li.zip-product-search').removeClass('zipCodeOver');
        });

        jQuery('#header #nav-global input[name=zip]').focus(function() {
            jQuery('#header #nav-global li.zip-product-search').addClass('zipCodeFocus');
        });
        jQuery('#header #nav-global input[name=zip]').blur(function() {
            jQuery('#header #nav-global li.zip-product-search').removeClass('zipCodeFocus');
        });

        // find-a-branch rolldown
        /*jQuery('#header #nav-global li.find-branch').mouseover(function() {
            jQuery('#header #nav-global li.find-branch').addClass('bankZipCodeOver');
        });
        jQuery('#header #nav-global li.find-branch').mouseout(function() {
            jQuery('#header #nav-global li.find-branch').removeClass('bankZipCodeOver');
        });*/

        jQuery('#header #nav-global input#bank-zipcode').focus(function() {
            jQuery('#header #nav-global li.find-branch').addClass('bankZipCodeFocus');
        });
        jQuery('#header #nav-global input#bank-zipcode').blur(function() {
            jQuery('#header #nav-global li.find-branch').removeClass('bankZipCodeFocus');
        });

        // account access rolldown
        jQuery('#header #nav-global li.account').mouseover(function() {
            jQuery('#header #nav-global li.account').addClass('accessAccountOver');
        });
        jQuery('#header #nav-global li.account').mouseout(function() {
            jQuery('#header #nav-global li.account').removeClass('accessAccountOver');
        });
    });

    Cof.Header.Search();
    Cof.Header.Zipcode.init();
    Cof.Header.PrimaryNav();
    Cof.Header.GlobalNav();

};

Cof.Header.Search = function() {

    jQuery.elReady('#search-field', function() {

        var searchLabel = this.val();

        this.focus(function(){
            jQuery(this).addClass('js-focus');

            if (this.value == searchLabel) {
                jQuery(this).val('');
            };
        });

        this.blur(function(){
            jQuery(this).removeClass('js-focus');

            if (this.value == '') {
                jQuery(this).val(searchLabel);
            };
        });

        jQuery('#c1-search-form').submit(function(){
            var value = jQuery('#search-field').val();

            if (value == searchLabel) {
                jQuery('#search-field').val('');
            }

            if (typeof cg2 != 'undefined') {
                jQuery(this).append('<input type="hidden" name="cg2" value="' + unescape(cg2) + '" />');
            }

            jQuery(this).append('<input type="hidden" name="refer" value="' + encodeURI(location.href) + '" />');
        });
    });
};

Cof.Header.GlobalNav = function() {
    var findBranchLabel = 'Zip or City, State';

    jQuery.elReady('#bank-zipcode', function() {

        if (typeof(c1zip) != 'undefined' && c1zip.length == 5) {
            jQuery(this).val(c1zip);
        } else {
            jQuery(this).val(findBranchLabel);
        }

        this.focus(function() {
            if (this.value == findBranchLabel) {
                this.value = '';
            }
        });

        this.blur(function() {
            if (this.value == '') {
                this.value = findBranchLabel;
            }
        });

    });
};

Cof.Header.PrimaryNav = function() {

    jQuery.elReady('#nav-primary', function() {
		Cof.Header.PrimaryNav.Render();
        
    });
};

Cof.Header.PrimaryNav.Render = function() {
	var navEntries = jQuery("#nav-primary > li");

        jQuery('ul.nav-primary-menu').supersubs({
            minWidth   : 12,   // minimum width of sub-menus in em units
            maxWidth   : 31,   // maximum width of sub-menus in em units
            extraWidth : 1     // extra width can ensure lines don't sometimes turn over
                               // due to slight rounding differences and font-family
        }).superfish({
            animation : {
                opacity : 'show',
                height  : 'show'
            },
            autoArrows : false,
            speed      : 'fast',
            delay      : 750
		}).find('ul').bgIframe({opacity:false}).find('iframe.bgiframe').each(function() {
            // Fixes the conflict with the primary nav menu and the form select dropdown in IE6
            var iframeDocument = this.contentWindow.document;
            var interval = setInterval(function() {
                if (typeof iframeDocument != 'undefined') {
                    iframeDocument.body.style.backgroundColor = '#1b4876';
                    clearInterval(interval);
                }
            }, 100);
		});

        // "hack" for the "For Business" primary nav item regionalization
        navEntries.children("a[href^='/smallbusiness']").add(navEntries.children("a[href^='/bank/business']")).click(function() {
            // add a cookie so we know that "For Business" was clicked
            jQuery.cookie("forbusiness", "true", {path : '/', domain: '.capitalone.com'});
        });
}


Cof.Header.Zipcode = (function() {

    // Indicator for when the zip has been successfully accepted and submitted
    var hasSubmitZip = false;

    var modalOpen = function(dialog) {
        dialog.overlay.show();
        dialog.container.show();
        dialog.data.show();
    }

    var modalClose = function(dialog) {
        if (!hasSubmitZip) {
            Cof.Header.Zipcode.rejectZip();
        }

        dialog.data.hide();
        dialog.container.hide();
        dialog.overlay.hide();
        dialog.iframe && dialog.iframe.hide();
    }

    return {
        direct:         false,
        noPromptCookie: 'nozip',
        goToUrl:        '',

        init: function() {
            jQuery(document).ready(function() {

                if (!Cof.Header.Zipcode.validZip()                                          && // only run if the ZIP is not valid
                    !Cof.Header.Zipcode.validRegion()                                       && // only run if the region is not valid
                    window.location.hostname.indexOf('capitalone.com') != -1                && // only run if the hostname contains "capitalone.com"
                    (document.cookie.indexOf(Cof.Header.Zipcode.noPromptCookie) == -1 ||
                     jQuery.cookie(Cof.Header.Zipcode.noPromptCookie) != 'true')            && // only run if the noPromptCookie is not set to "true" (or doesn't exist)
                    typeof jQuery.modal == 'function'                                       && // only run if simple modal is loaded
                    window.c1zip!==1                                                        && // only if the c1zip variable is specifically not 1
					zipOptOutFlag == false                                                     // only if they have not opted out
                ) {
                    jQuery('a').click(function() {
						if( $(this).hasClass('zip-prompt-flag') ) {
							Cof.Header.Zipcode.askForZip(this.href);
							return false;
						} 
                    });
                }

                jQuery('form[name=change-zip], form[name=zipcode-overlay-form]').submit(function() {
	               if($(this).attr('processed') == null) {
        	               $(this).attr('processed', 'true');
                    		return Cof.Header.Zipcode.submitZip(jQuery(this).attr('id'));
			}
                });
            });

            jQuery.elReady('#zipcode-prompt-input', function() {

                if (this.val() == "") {
                    jQuery("#zipcode-prompt-form label").css('display','block');
                } else {
                    jQuery("#zipcode-prompt-form label").css('display','none');
                }

                // clear input on focus
                this.focus(function() {
                    jQuery("#zipcode-prompt-form label").css('display','none');
                });

                // if field is empty afterward, add text again
                this.blur(function() {
                    if (jQuery('#zipcode-prompt-input').val() == "") {
                        jQuery("#zipcode-prompt-form label").css('display','block');
                    }
                });
            });
        },

        askForZip: function(linkUrl) {
            if (this.validZip() || window.c1zip == 1) {
                // we're good to move on
                return true;
            }

            this.goToUrl = linkUrl;

            jQuery.modal(jQuery('#zipcode-overlay-content'), {
                onOpen      :  modalOpen,
                onClose     :  modalClose,
                overlayId   : 'zipcode-overlay',
                containerId : 'zipcode-overlay-container',
                closeClass  : 'close'
            });

            jQuery('#zipcode-overlay-input').focus();

            // enable escape key closing of dialog
            document.onkeyup = function(e) {
                if (e == null) {  // ie
                    keycode = event.keyCode;
                } else { // mozilla
                    keycode = e.which;
                }
                if (keycode == 27) { // close
                    jQuery.modal.close();
                }
            };

            // return false to avoid going to the next url
            return false;
        },

        rejectZip: function() {
            jQuery.cookie(this.noPromptCookie, 'true', {path: '/', domain: '.capitalone.com'});
            window.location.assign(this.goToUrl);
            return false;
        },

        submitZip: function(formId) {

            var oldzip = window.c1zip;
            var inputCurrentHost = null;

            //this if condition is for zipcode-prompt bank redesign
            if(formId == 'zipcode-prompt-form') {
                window.c1zip = jQuery("#zipcode-prompt-input").val();
            } else {
                window.c1zip = jQuery("#" + formId + " input.zipcode-input").val();
            }

            if (!this.validZip()) {
                if (formId == 'zipcode-overlay-form') {
                    jQuery('#zipcode-overlay-content p').text('Please enter a valid five-digit ZIP Code.').addClass('error');
                } else if (formId == 'change-zip') {
                    jQuery('#change-zip label').text('ZIP code is invalid').addClass('error');
                } else if (formId == 'zipcode-prompt-form') { // this if condition is for form id name having zipcode-prompt-form for bank redesign
                    jQuery('#zipcode-prompt-form p').text('Please enter a valid five-digit ZIP Code.').addClass('error');
                }

                window.c1zip = oldzip;
                return false;

            } else if (window.location.hostname.search(/(?:qa|pt-web|qa-web|qamain|dev|local|www|beta-www|driver|bunker|celtics|camber|thunder|spurs|celtics|knicks|hornets|pistons|suns|portal-ite|portal-bau|portal-project|staging-web|portal|((kdc|pdc)staging)).*?\.capitalone\.com/) == -1) {
                inputCurrentHost = document.createElement("input");
                jQuery(inputCurrentHost).attr("type", "hidden").attr("name", "exthost").attr("value", escape(window.location.href));
                jQuery("#" + formId).append(inputCurrentHost);
            } else {
                if (Cof.Header.Zipcode.goToUrl == '') {
                    Cof.Header.Zipcode.goToUrl = window.location.href;
                }

                if (jQuery("#" + formId + " input[name=dest]").length == 0) {
                    inputCurrentHost = document.createElement("input");
                    jQuery(inputCurrentHost).attr("type", "hidden").attr("name", "dest").attr("value", escape(Cof.Header.Zipcode.goToUrl));
                    jQuery("#" + formId).append(inputCurrentHost);
                } else {
					if(formId == 'zipcode-prompt-form'){
												
					}
					else{
                    	jQuery("#" + formId + " input[name=dest]").attr("value", escape(Cof.Header.Zipcode.goToUrl));
					}
                }

                if (Cof.Header.Zipcode.direct) {
                    inputDirect = document.createElement("input");
                    jQuery(inputDirect).attr("type", "hidden").attr("name", "direct").attr("value", "yes");
                    jQuery("#" + formId).append(inputDirect);
                }

                // if changing the zip code, set a cookie to re-check for region on designated pages
                if (formId == 'change-zip') {
                    jQuery.cookie('setzipcode', 'yes', {path: '/', domain: '.capitalone.com'});
                }
            }

            hasSubmitZip = true;

            if (typeof jQuery.modal == 'function') {
                jQuery.modal.close();
            }

            return true;
        },

        validRegion: function() {
            if (typeof window.validRegion == 'undefined')
                return false;
            if (window.validRegion !== true)
                return false;

            return true;
        },

        validZip: function() {
			if(document.getElementById('zipcode')!=null && document.getElementById('zipcode').value.length >0)
	        {
				c1zip = document.getElementById('zipcode').value;
			}	
			else if(document.getElementById('zipcode-overlay-input')!=null && document.getElementById('zipcode-overlay-input').value.length >0)
	        {
				c1zip = document.getElementById('zipcode-overlay-input').value;
			}
            if (typeof window.c1zip == 'undefined')
                return false;
            if (window.c1zip.constructor != String)
                return false;
            if (/\d{5}/.test(window.c1zip) == false)
                return false;

            var zip = parseInt(window.c1zip, 10);
            // the IRS has the lowest zip code at 00501 (see http://en.wikipedia.org/wiki/ZIP_code)
            if (zip < 501 || zip > 99950)
                return false;

            return true;
        }
    }
})();

//end header.js functions

//start cof.js document ready fns
$(document).ready(function() {
				$('.freeFormText').hide();
			
				$('a.freeFormHref').click(function() {
					$(this).closest('.freeForm').find('.freeFormBanner, .freeFormText').toggle();
					
					var text = $(this).text();
					if (text.indexOf('Text only') > -1) {
						$(this).text('Return to non-text version');
						$(this).parent().css('text-align','left');
						$('a.freeFormHref').attr('href', '#nontextOnlyVersion');
					} else {
						$(this).text('Text only version');
						$(this).parent().css('text-align','right');
						$('a.freeFormHref').attr('href', '#textOnlyVersion');
					}
				});
				
				if(document.location.href.indexOf('#nontextOnlyVersion') > 0){
					$(".freeFormText").show();  
					$(".freeFormBanner").hide();
					$("a.freeFormHref").text("Return to non-text version");
					$("a.freeFormHref").parent().css('text-align','left');
					$('a.freeFormHref').attr('href', '#nontextOnlyVersion');
					}

				// Added for Default Badge Dropdown functions
				// ACTIVATE SELECTY DROPDOWN
					$('fieldset.selecty').click(function(){
						if ( $('.selecty-kids').is(':visible') ) {
							$('.selecty-kids').slideUp(100);
						}
						else {
							$('.selecty-kids').slideDown(100).css('backgroundColor','#fff');
							$('.subnav').css('left','230px');
							$('.subnav-holder').hide();
						}
					});
				
				
				// HOVER EFFECTS FOR SELECTY DROPDOWN
					$('.selecty-kids li a').hover(function(){
						$('.selecty-kids li a').blur();
					});	
				
				
				// CLICK OUTSIDE OF SELECTY-KIDS HIDES SELECTY-KIDS 
					$('html').click(function() {
						if ( $('.selecty-kids').is(':visible') ) {
							$('.selecty-kids').slideUp(100);
							$('.user-id input:visible').focus();
						}	
					});

					$('.selecty-kids, .selecty, .tip').click(function(event){
						event.stopPropagation();
					});	
			});
			
/* Added for swipe Gesture for Carousel*/
(function($){$.fn.touchwipe=function(settings){var config={min_move_x:20,min_move_y:20,wipeLeft:function(){},wipeRight:function(){},wipeUp:function(){},wipeDown:function(){},preventDefaultEvents:true};if(settings)$.extend(config,settings);this.each(function(){var startX;var startY;var isMoving=false;function cancelTouch(){this.removeEventListener('touchmove',onTouchMove);startX=null;isMoving=false}function onTouchMove(e){if(config.preventDefaultEvents){e.preventDefault()}if(isMoving){var x=e.touches[0].pageX;var y=e.touches[0].pageY;var dx=startX-x;var dy=startY-y;if(Math.abs(dx)>=config.min_move_x){cancelTouch();if(dx>0){config.wipeLeft()}else{config.wipeRight()}}else if(Math.abs(dy)>=config.min_move_y){cancelTouch();if(dy>0){config.wipeDown()}else{config.wipeUp()}}}}function onTouchStart(e){if(e.touches.length==1){startX=e.touches[0].pageX;startY=e.touches[0].pageY;isMoving=true;this.addEventListener('touchmove',onTouchMove,false)}}if('ontouchstart'in document.documentElement){this.addEventListener('touchstart',onTouchStart,false)}});return this}})(jQuery);
//end cof.js document ready fnc

//start util.js functions
function validateCustomerAge() {
	var dob = prompt("Enter the applicant's date of birth: (MM-DD-YYYY)", "");
	while (!isValidDob(dob)) {
	    alert("You must enter the date of birth in the following format: MM-DD-YYYY");
		dob = prompt("Enter the applicant's date of birth: (MM-DD-YYYY)", dob);
	}
	if (dob != null) {
		dob = dob.replace('-', '\/').replace('-', '\/');
		//check to see if the user is 21 years or older
		var enteredDob = new Date(dob);
		var today = new Date();
		if (enteredDob > today) {
			alert("You have entered an invalid date of birth");
			return false;
		} else if ((today - enteredDob)/(1000*60*60*24*365) < 21) {
			alert("Consumers under the age of 21 cannot apply in the Bank branches due to Card Act requirements. If an under 21 applicant comes into your branch to apply for a credit card, please advise them to return any direct mail offer they received from Capital One by mail or have them visit Capital One's website (www.capitalone.com) to apply. You should not apply on Capital One's website on behalf of the applicant.");
			return false;
		} else if (enteredDob != 'Invalid Date') {
			return true;
		}
	}
	return false;
}
 
function isValidDob(dob) {
	if (dob == null) {
		return true;
	}
	if (!(/^(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])-(\d{4})$/.test(dob))) {
		return false;
	}

	var values = dob.split("/");
	var month = values[0];
	var day = values[1];
	var year = values[2];
	//validate february date (if the month is 02)
	if (month == 2) {
		if (day == 29) {
			if (year % 4 != 0 || year % 100 == 0 && year % 400 != 0) {
				return false;
			}
		} else if (day > 28) {
			return false;
		}
	} else if (month == 4 || month == 6 || month  == 9 || month == 11) {
		if (day > 30) {
			return false;
		}
	}
	else {
		if (day > 31) {
			return false;
		}
	}
	return true;
}
//end util.js functions
//start header-footer.js merge
var xmlHttpReq;
var zipCodeValue=null;
var regionValue=null;
var protocol= window.location.protocol + "//";


function getXmlHttpRequestObject()
{
		if (window.XMLHttpRequest) 
		{
			return new XMLHttpRequest(); //Not IE	
		} 
		else if(window.ActiveXObject) 
		{		
			return new ActiveXObject("Microsoft.XMLHTTP"); //IE	
		}
		else
	    {		
			alert("Your browser doesn't support the XmlHttpRequest object.  Better upgrade to Firefox.");
		}
}

function getZipCode()
{
    url =  "/SubmitZipCode";
	xmlHttpReq = getXmlHttpRequestObject();

	if (xmlHttpReq!=null)
  	{
	  	xmlHttpReq.onreadystatechange = state_Change;
		xmlHttpReq.open('POST', url, true);
		xmlHttpReq.send(null);
  	}
	else
  	{
  		alert("Your browser does not support XMLHTTP.");
  	}
  				
}
function state_Change()
{
	var patternNorth=null;
	var patternSouth=null;

if (xmlHttpReq.readyState==4)
  {// 4 = "loaded"
  if (xmlHttpReq.status==200)
    {// 200 = "OK"


    data = xmlHttpReq.responseText;

    if (data != null & data != '')
    {

      var index = data.indexOf('|');
      var length =  data.length;


      zipCodeValue = data.substring(0, index);
      regionValue = data.substring(index+1,length);
      		if(regionValue != null && regionValue!=''){
	   			
	   		 patternNorth = regionValue.toLowerCase().match(/north/); 
	   	     patternSouth = regionValue.toLowerCase().match(/south/);
	   		} 
	   	    	   	    
	   		if(patternNorth == 'north' || patternSouth =='south')
	   	  	{
	   	  		
	   	  		$('#header div.cap-one-logo-sprite img').removeClass('logo-cap-one-default').addClass('logo-cap-one-bank');
	   	  	}
	   	  	else
	   	  	{
	   	  			
	   	  	    $('#header div.cap-one-logo-sprite img').removeClass('logo-cap-one-bank').addClass('logo-cap-one-default');
	   	  	}
      if (zipCodeValue != null && zipCodeValue != '')
      {
        var legendForZIP = document.getElementById('zipLegend');
        if (legendForZIP)
        {
         legendForZIP.innerHTML = 'View products for ZIP:'+ zipCodeValue;
         window.c1zip = zipCodeValue;
        }
      }
    }
    }
  else
    {
    alert("Problem retrieving data:" + xmlHttpReq.statusText);
    }
  }
}
function showHeader(lobName,domainName){

	   getZipCode();
	   if(lobName=='Corporate')
	   	{
		  document.write("<div id='header'><a class='skip-link' id='skip-link' href='#page-body'>Skip to content</a><div class='cap-one-logo-sprite'><a href='"+protocol+""+domainName+"/' title='Back to Capital One&reg; home'><img class='logo-cap-one-default' src='/assets/img/global/logo/sprite/header.gif' title='Capital One&reg; logo with a link to the home page' alt='Capital One&reg; logo' height='187' width='150'/></a></div><form id='c1-search-form' class='search' name='c1-search-form' method='get' accept-charset='charset=UTF-8' action='"+protocol+""+domainName+"/search/'><div id='search'><label for='search-field'>Ask your question here.</label><input type='text' class='search-field' id='search-field' name='qt' size='20' maxlength='100' value='' /><input type='submit' class='search-btn' id='search-btn' alt='Search tool &mdash; Enter a term or question here' title='Site search tool' value='Search' /></div></form><ul id='nav-global'><li class='find-branch first'><form method='get' action='http://maps.capitalone.com/locator/BranchSearch.action'><fieldset><legend align='left'>Find a bank branch/ATM</legend><div class='branch-atm-locator'><input type='hidden' name='search' value='' /><input type='hidden' name='_sourcePage' value='index.jsp' /> <input type='hidden' name='searchType' value='branchSearch' /><div><input name='search value' size='5' id='bank-zipcode' class='bank-zipcode-input' type='text' value='' />&nbsp;<input class='submit' type='image' src='/assets/img/global/btn/info_body_go.gif' title='Field to enter your ZIP code to find a branch or ATM nearest you. Link to advanced search.' alt='ZIP code branch finder tool &mdash; enter your ZIP code' /></div><a href='"+protocol+""+domainName+"/redirect.php?Log=1&amp;linkid=WWW_Z_BANK_A1CDDB1CC5C1CC4D1CCF_BKPSNL_H2_01_T_BPFIND&amp;dest=http://maps.capitalone.com'>Advanced Search</a></div></fieldset></form></li><li class='zip-product-search'><form method='post' action='/SubmitZipCode' id='change-zip' name='change-zip' ><fieldset>");
		  //cookie = GetCookie('caponesn');
		  if(zipCodeValue !=null && zipCodeValue != ''){
		  	document.write("<legend id='zipLegend' class='alt-message'>View products for ZIP:"+zipCodeValue+"</legend>");  
	      }else{
	      	document.write("<legend id='zipLegend' class='alt-message'>Enter your five-digit ZIP Code</legend>");
	      }
	      document.write("<div class='zip'><label for='zipcode'>View products and features in your area</label><input type='text' size='5' maxlength='5' name='zip' id='zipcode' class='zipcode-input' />&nbsp;<input type='image'  src='/assets/img/global/btn/info_body_go.gif' title='Link to view products for this ZIP code' alt='Link to view products for this ZIP code' /></div></fieldset></form></li><li class='account'><span><span>Access your account</span></span><ul class='account-access'><li class='first'><a href='"+protocol+""+domainName+"/redirect.php?linkid=WWW_Z_CARD_Z_BCOM_H2_01_G_OASL&Log=1&dest=https://servicing.capitalone.com/c1/login.aspx'>Credit Cards</a></li><li><a href='"+protocol+""+domainName+"/redirect.php?linkid=WWW_Z_BANK_Z_BCOM_H2_02_G_OLB&Log=1&dest=https://onlinebanking.capitalone.com'>Banking</a></li><li><a href='"+protocol+""+domainName+"/redirect.php?linkid=WWW_Z_SAVG_Z_BCOM_H2_03_G_SPL&Log=1&dest=https://onlinebanking.capitalone.com'>Direct Banking</a></li><li><a href='"+protocol+""+domainName+"/redirect.php?linkid=WWW_Z_AUTO_Z_BCOM_H2_04_G_MYA&Log=1&dest=https://onlinebanking.capitalone.com/capitalone/Login.aspx?ori=coafPartner'>Auto Loans</a></li><li><a href='"+protocol+""+domainName+"/rewards/service-login.php?linkid=WWW_Z_CARD_Z_BCOM_H2_05_G_RWSLG'>Redeem Rewards</a></li><li><a href='https://top.capitalonebank.com/cashplus/'>Treasury Optimizer</a></li><li class='last'><a href='"+protocol+""+domainName+"/login.php?linkid=WWW_Z_Z_Z_BCOM_H2_06_G_MYA'>Other Accounts</a></li></ul></li></ul><ul id='nav-primary' class='nav-primary-menu'><li><a href='"+protocol+""+domainName+"/creditcards/?linkid=WWW_Z_CARD_A1B75B1BA1C1BB8D1B65_OBTF_H1_01_T_CB1'>Credit Cards</a><ul class='first'><li class='first'><a href='"+protocol+""+domainName+"/creditcards/products/most-popular/?linkid=WWW_Z_CARD_A1B75B1BA1C1BB8D1B65_OBTF_H1_02_T_CCPMP'>View Popular Credit Cards</a></li><li><a href='"+protocol+""+domainName+"/creditcards/products/compare/?linkid=WWW_Z_CARD_A1B75B1BA1C1BB8D1B65_OBTF_H1_03_T_CCPCP'>Compare All Credit Cards</a></li><li><a href='"+protocol+""+domainName+"/redirect.php?Log=1&amp;linkid=WWW_Z_CARD_A1B75B1BA1C1BB8D1B65_OBTF_H1_04_T_EXP&amp;dest=https://cardfinder.capitalone.com/CapOne/findMyOffer.do?ex=R&amp;pr=&amp;id=&amp;tg=4'>See if You're Pre-Qualified</a></li><li><a href='"+protocol+""+domainName+"/redirect.php?Log=1&amp;linkid=WWW_Z_CARD_A1B75B1BA1C1BB8D1B65_OBTF_H1_05_T_GMC&amp;dest=https://getmycard.capitalone.com/cof.jsp?logtype=GMC'>Respond to a Mail Offer</a></li><li class='last'><a href='"+protocol+""+domainName+"/smallbusiness/cards/?linkid=WWW_Z_SBUS_A1B75B1BA1C1BB8D1B65_OBTF_H1_06_T_SBCD'>Small Business Credit Cards</a></li></ul></li><li><a rel='zipcode' href='"+protocol+""+domainName+"/banking/personal/?linkid=WWW_Z_BANK_A1B75B1BA1C1BB8D1B65_OBTF_H1_07_T_BKPSNL'>Banking</a><ul class='sub-business'><li class='first regional'><a rel='zipcode' href='"+protocol+""+domainName+"/banking/personal/?linkid=WWW_Z_BANK_A1B75B1BA1C1BB8D1B65_OBTF_H1_08_T_BKPSNL'>Personal Banking</a></li><li class='regional'><a class='submenu-items' rel='zipcode' href='"+protocol+""+domainName+"/checking-accounts/?linkid=WWW_Z_BANK_A1B75B1BA1C1BB8D1B65_OBTF_H1_09_T_CKACTHOME'>Checking Accounts</a></li><li class='regional'><a class='submenu-items' rel='zipcode' href='"+protocol+""+domainName+"/savings-accounts/?linkid=WWW_Z_BANK_A1B75B1BA1C1BB8D1B65_OBTF_H1_10_T_SVACTHOME'>Savings Accounts</a></li><li class='regional'><a class='submenu-items' rel='zipcode' href='"+protocol+""+domainName+"/savings-accounts/money-market/?linkid=WWW_Z_BANK_A1B75B1BA1C1BB8D1B65_OBTF_H1_11_T_SVACTMM'>Money Market Accounts</a></li><li class='regional'><a class='submenu-items' href='"+protocol+""+domainName+"/certificates-deposit/?linkid=WWW_Z_BANK_A1B75B1BA1C1BB8D1B65_OBTF_H1_12_T_CDHOME'>Certificates of Deposit</a></li><li class='regional'><a class='submenu-items' href='"+protocol+""+domainName+"/bank/services/investments/?linkid=WWW_Z_BANK_A1B75B1BA1C1BB8D1B65_OBTF_H1_13_T_BINV'>Investments</a></li><li class='regional'><a class='submenu-items' href='"+protocol+""+domainName+"/bank/services/private/?linkid=WWW_Z_BANK_A1B75B1BA1C1BB8D1B65_OBTF_H1_14_T_BSPC'>Private Client Group</a></li><li class='regional'><a href='"+protocol+""+domainName+"/bank/smallbusiness/?linkid=WWW_Z_BANK_A1B75B1BA1C1BB8D1B65_OBTF_H1_15_T_BSB'>Small Business Banking</a></li><li class='last regional'><a href='"+protocol+""+domainName+"/bank/commercial/?linkid=WWW_Z_BANK_A1B75B1BA1C1BB8D1B65_OBTF_H1_16_T_BCOM'>Commercial Banking (Over $10 MM in Revenue)</a></li></ul></li><li><a rel='zipcode' href='"+protocol+""+domainName+"/loans/index_regional.php?linkid=WWW_Z_PERS_A1B75B1BA1C1BB8D1B65_OBTF_H1_17_T_LNHPR'>Loans</a><ul><li class='first'><a href='"+protocol+""+domainName+"/autoloans/?linkid=WWW_Z_AUTO_A1B75B1BA1C1BB8D1B65_OBTF_H1_18_T_AC1'>Auto Loans</a></li><li><a href='"+protocol+""+domainName+"/bank/homeloandsandmortgages/?linkid=WWW_Z_MORT_A1B75B1BA1C1BB8D1B65_OBTF_H1_19_T_BHL'>Home Loans</a></li><li class='last'><a href='"+protocol+""+domainName+"/bank/loansandloc/?linkid=WWW_Z_PERS_A1B75B1BA1C1BB8D1B65_OBTF_H1_20_T_BLL'>Personal Loans</a></li></ul></li><li><a href='"+protocol+""+domainName+"/bank/business/?linkid=WWW_Z_SBUS_A1B75B1BA1C1BB8D1B65_OBTF_H1_21_T_SB1'>For Business</a><ul class='sub-business'><li class='first regional'><a href='"+protocol+""+domainName+"/bank/smallbusiness/?linkid=WWW_Z_SBUS_A1B75B1BA1C1BB8D1B65_OBTF_H1_22_T_SB1'>Small Business</a></li><li class='regional'><a class='submenu-items' href='"+protocol+""+domainName+"/smallbusiness/cards/?linkid=WWW_Z_SBUS_A1B75B1BA1C1BB8D1B65_OBTF_H1_23_T_SBCD'>Business Credit Cards</a></li><li class='regional'><a class='submenu-items' href='"+protocol+""+domainName+"/bank/smallbusiness/banking.php?linkid=WWW_Z_SBUS_A1B75B1BA1C1BB8D1B65_OBTF_H1_24_T_SBPROV'>Banking Checking and Savings</a></li><li class='regional'><a class='submenu-items' href='"+protocol+""+domainName+"/bank/smallbusiness/loansandloc/?linkid=WWW_Z_SBUS_A1B75B1BA1C1BB8D1B65_OBTF_H1_25_T_Z'>Business Loans &amp; Lines of Credit</a></li><li class='regional'><a class='submenu-items' href='"+protocol+""+domainName+"/bank/smallbusiness/merchantservices/?linkid=WWW_Z_SBUS_A1B75B1BA1C1BB8D1B65_OBTF_H1_26_T_Z'>Merchant Services</a></li><li class='regional'><a class='submenu-items' href='"+protocol+""+domainName+"/bank/smallbusiness/cashmanagement/?linkid=WWW_Z_SBUS_A1B75B1BA1C1BB8D1B65_OBTF_H1_27_T_Z'>Treasury Management</a></li><li class='last regional'><a href='"+protocol+""+domainName+"/bank/commercial/?linkid=WWW_Z_SBUS_A1B75B1BA1C1BB8D1B65_OBTF_H1_28_T_BCOM'>Commercial Banking (Over $10 MM in Revenue)</a></li></ul></li><li><a href='"+protocol+""+domainName+"/contactus/?linkid=WWW_Z_CUST_A1B75B1BA1C1BB8D1B65_OBTF_H1_29_T_CU1'>Customer Service</a><ul><li class='first'><a href='"+protocol+""+domainName+"/contactus/?linkid=WWW_Z_CUST_A1B75B1BA1C1BB8D1B65_OBTF_H1_30_T_CU1'>Contact Us</a></li><li><a href='"+protocol+""+domainName+"/contactus/faq.php?linkid=WWW_Z_CUST_A1B75B1BA1C1BB8D1B65_OBTF_H1_31_T_FAQ'>Frequently Asked Questions</a></li><li><a href='"+protocol+""+domainName+"/redirect.php?Log=1&amp;linkid=WWW_Z_CUST_A1B75B1BA1C1BB8D1B65_OBTF_H1_32_T_BPFIND&amp;dest=http://maps.capitalone.com/locator/'>Find a Branch / ATM</a></li><li><a href='"+protocol+""+domainName+"/contactus/olbsupport.php?linkid=WWW_Z_CUST_A1B75B1BA1C1BB8D1B65_OBTF_H1_33_T_CUOLB'>Online Banking Support</a></li><li class='last'><a href='"+protocol+""+domainName+"/sitemap/?linkid=WWW_Z_CUST_A1B75B1BA1C1BB8D1B65_OBTF_H1_34_T_STMP'>Site Map</a></li></ul></li></ul></div>"+
	      "<div id='zipcode-overlay-content'><h6>Please enter your five-digit ZIP Code</h6>"+
	      "<p>We ask for your ZIP Code as product offerings and features may differ among geographic locations. "+
	      "You may change your ZIP Code at any time.</p>"+
	      "<form method='post' id='zipcode-overlay-form' name='zipcode-overlay-form' action='/SubmitZipCode'>"+
		      "<label for='zipcode-overlay-input'>ZIP Code:</label>"+
		      "<input name='zip' id='zipcode-overlay-input' class='zipcode-input' type='text' size='6' maxlength='5' />"+
		      "<input class='zipcode-continue'  name='Continue' type='image' src='/assets/img/global/btn/action_body_continue.png' alt='Continue'/>"+
	      "</form></div>");
		}
		else
		{
		  document.write("<div id='header'><a class='skip-link' href='#page-body'>Skip to content</a><div class='cap-one-logo-sprite'><a href='"+protocol+""+domainName+"/' title='Back to Capital One&reg; home'><img class='logo-cap-one-default' src='/assets/img/global/logo/sprite/header.gif' title='Capital One&reg; Bank logo with a link to the home page' alt='Capital One&reg; Bank logo' height='187' width='150'/></a></div><form id='c1-search-form' class='search' name='c1-search-form' method='get' accept-charset='charset=UTF-8' action='"+protocol+""+domainName+"/search/'><div id='search'><label for='search-field'>Ask your question here.</label><input type='text' class='search-field' id='search-field' name='qt' size='20' maxlength='100' value='' /><input type='submit' class='search-btn' id='search-btn' alt='Search tool &mdash; Enter a term or question here' title='Site search tool' value='Search' /></div></form><ul id='nav-global'><li class='find-branch first'><form method='get' action='http://maps.capitalone.com/locator/BranchSearch.action'><fieldset><legend align='left'>Find a bank branch/ATM</legend><div class='branch-atm-locator'><input type='hidden' name='searchType' value='branchSearch' /><input name='search value' size='5' maxlength='5' id='bank-zipcode' class='bank-zipcode-input' type='text' value='' />&nbsp;<input class='submit' type='image' src='/assets/img/global/btn/info_body_go.gif' title='Field to enter your ZIP code to find a branch or ATM nearest you. Link to advanced search.' alt='ZIP code branch finder tool &mdash; enter your ZIP code' /><a href='"+protocol+""+domainName+"/redirect.php?Log=1&amp;linkid=WWW_Z_BANK_A1CDDB1CC5C1CC4D1CCF_BKPSNL_H2_01_T_BPFIND&amp;dest=http://maps.capitalone.com'>Advanced Search</a></div></fieldset></form></li><li class='zip-product-search'><form method='post' action='/SubmitZipCode' id='change-zip' name='change-zip' ><fieldset>");
		  //cookie = GetCookie('caponesn');
		  if(zipCodeValue !=null && zipCodeValue != ''){
		  	document.write("<legend id='zipLegend' class='alt-message'>View products for ZIP:"+zipCodeValue+"</legend>");  
	      }else{
	      	document.write("<legend id='zipLegend' class='alt-message'>Enter your five-digit ZIP Code</legend>");
	      }
	      document.write("<div class='zip'><label for='zipcode'>View products and features in your area</label><input type='text' size='5' maxlength='5' name='zip' id='zipcode' class='zipcode-input' />&nbsp;<input type='image'  src='/assets/img/global/btn/info_body_go.gif' title='Link to view products for this ZIP code' alt='Link to view products for this ZIP code' /></div></fieldset></form></li><li class='account'><span><span>Access your account</span></span><ul class='account-access'><li class='first'><a href='"+protocol+""+domainName+"/redirect.php?linkid=WWW_Z_CARD_Z_BCOM_H2_01_G_OASL&Log=1&dest=https://servicing.capitalone.com/c1/login.aspx'>Credit Cards</a></li><li><a href='"+protocol+""+domainName+"/redirect.php?linkid=WWW_Z_BANK_Z_BCOM_H2_02_G_OLB&Log=1&dest=https://onlinebanking.capitalone.com'>Banking</a></li><li><a href='"+protocol+""+domainName+"/redirect.php?linkid=WWW_Z_SAVG_Z_BCOM_H2_03_G_SPL&Log=1&dest=https://onlinebanking.capitalone.com'>Direct Banking</a></li><li><a href='"+protocol+""+domainName+"/redirect.php?linkid=WWW_Z_AUTO_Z_BCOM_H2_04_G_MYA&Log=1&dest=https://onlinebanking.capitalone.com/capitalone/Login.aspx?ori=coafPartner'>Auto Loans</a></li><li><a href='"+protocol+""+domainName+"/rewards/service-login.php?linkid=WWW_Z_CARD_Z_BCOM_H2_05_G_RWSLG'>Redeem Rewards</a></li></li><li><a href='#'>Treasury Optimizer</a></li><li class='last'><a href='"+protocol+""+domainName+"/login.php?linkid=WWW_Z_Z_Z_BCOM_H2_06_G_MYA'>Other Accounts</a></li></ul></li></ul><ul id='nav-primary' class='nav-primary-menu'><li><a href='"+protocol+""+domainName+"/creditcards/?linkid=WWW_Z_CARD_A1B75B1BA1C1BB8D1B65_OBTF_H1_01_T_CB1'>Credit Cards</a><ul class='first'><li class='first'><a href='"+protocol+""+domainName+"/creditcards/products/most-popular/?linkid=WWW_Z_CARD_A1B75B1BA1C1BB8D1B65_OBTF_H1_02_T_CCPMP'>View Popular Credit Cards</a></li><li><a href='"+protocol+""+domainName+"/creditcards/products/compare/?linkid=WWW_Z_CARD_A1B75B1BA1C1BB8D1B65_OBTF_H1_03_T_CCPCP'>Compare All Credit Cards</a></li><li><a href='"+protocol+""+domainName+"/redirect.php?Log=1&amp;linkid=WWW_Z_CARD_A1B75B1BA1C1BB8D1B65_OBTF_H1_04_T_EXP&amp;dest=https://cardfinder.capitalone.com/CapOne/findMyOffer.do?ex=R&amp;pr=&amp;id=&amp;tg=4'>See if You're Pre-Qualified</a></li><li><a href='"+protocol+""+domainName+"/redirect.php?Log=1&amp;linkid=WWW_Z_CARD_A1B75B1BA1C1BB8D1B65_OBTF_H1_05_T_GMC&amp;dest=https://getmycard.capitalone.com/cof.jsp?logtype=GMC'>Respond to a Mail Offer</a></li><li class='last'><a href='"+protocol+""+domainName+"/smallbusiness/cards/?linkid=WWW_Z_SBUS_A1B75B1BA1C1BB8D1B65_OBTF_H1_06_T_SBCD'>Small Business Credit Cards</a></li></ul></li><li><a rel='zipcode' href='"+protocol+""+domainName+"/banking/personal/?linkid=WWW_Z_BANK_A1B75B1BA1C1BB8D1B65_OBTF_H1_07_T_BKPSNL'>Banking</a><ul class='sub-business'><li class='first regional'><a rel='zipcode' href='"+protocol+""+domainName+"/banking/personal/?linkid=WWW_Z_BANK_A1B75B1BA1C1BB8D1B65_OBTF_H1_08_T_BKPSNL'>Personal Banking</a></li><li class='regional'><a class='submenu-items' rel='zipcode' href='"+protocol+""+domainName+"/checking-accounts/?linkid=WWW_Z_BANK_A1B75B1BA1C1BB8D1B65_OBTF_H1_09_T_CKACTHOME'>Checking Accounts</a></li><li class='regional'><a class='submenu-items' rel='zipcode' href='"+protocol+""+domainName+"/savings-accounts/?linkid=WWW_Z_BANK_A1B75B1BA1C1BB8D1B65_OBTF_H1_10_T_SVACTHOME'>Savings Accounts</a></li><li class='regional'><a class='submenu-items' rel='zipcode' href='"+protocol+""+domainName+"/savings-accounts/money-market/?linkid=WWW_Z_BANK_A1B75B1BA1C1BB8D1B65_OBTF_H1_11_T_SVACTMM'>Money Market Accounts</a></li><li class='regional'><a class='submenu-items' href='"+protocol+""+domainName+"/certificates-deposit/?linkid=WWW_Z_BANK_A1B75B1BA1C1BB8D1B65_OBTF_H1_12_T_CDHOME'>Certificates of Deposit</a></li><li class='regional'><a class='submenu-items' href='"+protocol+""+domainName+"/bank/services/investments/?linkid=WWW_Z_BANK_A1B75B1BA1C1BB8D1B65_OBTF_H1_13_T_BINV'>Investments</a></li><li class='regional'><a class='submenu-items' href='"+protocol+""+domainName+"/bank/services/private/?linkid=WWW_Z_BANK_A1B75B1BA1C1BB8D1B65_OBTF_H1_14_T_BSPC'>Private Client Group</a></li><li class='regional'><a href='"+protocol+""+domainName+"/bank/smallbusiness/?linkid=WWW_Z_BANK_A1B75B1BA1C1BB8D1B65_OBTF_H1_15_T_BSB'>Small Business Banking</a></li><li class='last regional'><a href='"+protocol+""+domainName+"/bank/commercial/?linkid=WWW_Z_BANK_A1B75B1BA1C1BB8D1B65_OBTF_H1_16_T_BCOM'>Commercial Banking (Over $10 MM in Revenue)</a></li></ul></li><li><a rel='zipcode' href='"+protocol+""+domainName+"/loans/index_regional.php?linkid=WWW_Z_PERS_A1B75B1BA1C1BB8D1B65_OBTF_H1_17_T_LNHPR'>Loans</a><ul><li class='first'><a href='"+protocol+""+domainName+"/autoloans/?linkid=WWW_Z_AUTO_A1B75B1BA1C1BB8D1B65_OBTF_H1_18_T_AC1'>Auto Loans</a></li><li><a href='"+protocol+""+domainName+"/bank/homeloandsandmortgages/?linkid=WWW_Z_MORT_A1B75B1BA1C1BB8D1B65_OBTF_H1_19_T_BHL'>Home Loans</a></li><li class='last'><a href='"+protocol+""+domainName+"/bank/loansandloc/?linkid=WWW_Z_PERS_A1B75B1BA1C1BB8D1B65_OBTF_H1_20_T_BLL'>Personal Loans</a></li></ul></li><li><a href='"+protocol+""+domainName+"/bank/business/?linkid=WWW_Z_SBUS_A1B75B1BA1C1BB8D1B65_OBTF_H1_21_T_SB1'>For Business</a><ul class='sub-business'><li class='first regional'><a href='"+protocol+""+domainName+"/bank/smallbusiness/?linkid=WWW_Z_SBUS_A1B75B1BA1C1BB8D1B65_OBTF_H1_22_T_SB1'>Small Business</a></li><li class='regional'><a class='submenu-items' href='"+protocol+""+domainName+"/smallbusiness/cards/?linkid=WWW_Z_SBUS_A1B75B1BA1C1BB8D1B65_OBTF_H1_23_T_SBCD'>Business Credit Cards</a></li><li class='regional'><a class='submenu-items' href='"+protocol+""+domainName+"/bank/smallbusiness/banking.php?linkid=WWW_Z_SBUS_A1B75B1BA1C1BB8D1B65_OBTF_H1_24_T_SBPROV'>Banking Checking and Savings</a></li><li class='regional'><a class='submenu-items' href='"+protocol+""+domainName+"/bank/smallbusiness/loansandloc/?linkid=WWW_Z_SBUS_A1B75B1BA1C1BB8D1B65_OBTF_H1_25_T_Z'>Business Loans &amp; Lines of Credit</a></li><li class='regional'><a class='submenu-items' href='"+protocol+""+domainName+"/bank/smallbusiness/merchantservices/?linkid=WWW_Z_SBUS_A1B75B1BA1C1BB8D1B65_OBTF_H1_26_T_Z'>Merchant Services</a></li><li class='regional'><a class='submenu-items' href='"+protocol+""+domainName+"/bank/smallbusiness/cashmanagement/?linkid=WWW_Z_SBUS_A1B75B1BA1C1BB8D1B65_OBTF_H1_27_T_Z'>Treasury Management</a></li><li class='last regional'><a href='"+protocol+""+domainName+"/bank/commercial/?linkid=WWW_Z_SBUS_A1B75B1BA1C1BB8D1B65_OBTF_H1_28_T_BCOM'>Commercial Banking (Over $10 MM in Revenue)</a></li></ul></li><li><a href='"+protocol+""+domainName+"/contactus/?linkid=WWW_Z_CUST_A1B75B1BA1C1BB8D1B65_OBTF_H1_29_T_CU1'>Customer Service</a><ul><li class='first'><a href='"+protocol+""+domainName+"/contactus/?linkid=WWW_Z_CUST_A1B75B1BA1C1BB8D1B65_OBTF_H1_30_T_CU1'>Contact Us</a></li><li><a href='"+protocol+""+domainName+"/contactus/faq.php?linkid=WWW_Z_CUST_A1B75B1BA1C1BB8D1B65_OBTF_H1_31_T_FAQ'>Frequently Asked Questions</a></li><li><a href='"+protocol+""+domainName+"/redirect.php?Log=1&amp;linkid=WWW_Z_CUST_A1B75B1BA1C1BB8D1B65_OBTF_H1_32_T_BPFIND&amp;dest=http://maps.capitalone.com/locator/'>Find a Branch / ATM</a></li><li><a href='"+protocol+""+domainName+"/contactus/olbsupport.php?linkid=WWW_Z_CUST_A1B75B1BA1C1BB8D1B65_OBTF_H1_33_T_CUOLB'>Online Banking Support</a></li><li class='last'><a href='"+protocol+""+domainName+"/sitemap/?linkid=WWW_Z_CUST_A1B75B1BA1C1BB8D1B65_OBTF_H1_34_T_STMP'>Site Map</a></li></ul></li></ul></div>"+
	      "<div id='zipcode-overlay-content'><h6>Please enter your five-digit ZIP Code</h6>"+
	      "<p>We ask for your ZIP Code as product offerings and features may differ among geographic locations. "+
	      "You may change your ZIP Code at any time.</p>"+
	      "<form method='post' id='zipcode-overlay-form' name='zipcode-overlay-form' action='/SubmitZipCode'>"+
		      "<label for='zipcode-overlay-input'>ZIP Code:</label>"+
		      "<input name='zip' id='zipcode-overlay-input' class='zipcode-input' type='text' size='6' maxlength='5' />"+
		      "<input class='zipcode-continue'  name='Continue' type='image' src='/assets/img/global/btn/action_body_continue.png' alt='Continue'/>"+
	      "</form></div>");

		}	      
      //<![CDATA[
          jQuery('#search-field').val(jQuery('#search label').remove().text());
          jQuery('#search-btn').val('');
      //]]>
}

function showHeaderPopUp(lobName,domainNameJS)
{

	if(lobName=='Corporate')
	   	{
		  document.write("<div id='header'><a id='skip-link' class='skip-link' href='#page-body' title='Skip to content'>Skip to content</a><div class='cap-one-logo-sprite'><a href='"+protocol+""+domainNameJS+"/' title='Back to Capital One&reg; home'><img class='logo-cap-one-default' src='/assets/img/global/logo/sprite/header.gif' title='Capital One&reg; logo with a link to the home page' alt='Capital One&reg; logo' height='187' width='150'/></a></div><div id='popup-close' align='right'><a href='#' onclick='javascript:window.close();'><img src='/assets/img/global/btn/btn_close_window.gif' alt='Close window'/></a></div></div>");
		}
	else
	{
		document.write("<div id='header'><a id='skip-link' class='skip-link' href='#page-body' title='Skip to content'>Skip to content</a><div class='cap-one-logo-sprite'><a href='"+protocol+""+domainNameJS+"/' title='Back to Capital One&reg; home'><img class='logo-cap-one-default' src='/assets/img/global/logo/sprite/header.gif' title='Capital One&reg; logo with a link to the home page' alt='Capital One&reg; logo' height='187' width='150'/></a></div><div id='popup-close' align='right'><a href='#' onclick='javascript:window.close();'><img src='/assets/img/global/btn/btn_close_window.gif' alt='Close window'/></a></div></div>");	
	}	

}

function showFooter(domainName,getLob,getYearValue,getBusinessNameValue){

   document.write("<div id='footer' class='row alpha omega'><div class='column grid-2 first'><div class='genericA'><h6>CapitalOne.com</h6><ul><li><a title='Capital One Home' href='"+protocol+""+domainName+"'>Capital One Home</a></li><li><a href='"+protocol+""+domainName+"/creditcards/' title='Credit Cards'>Credit Cards</a></li><li><a rel='zipcode' href='"+protocol+""+domainName+"/banking' title='Banking'>Banking</a></li><li><a href='"+protocol+""+domainName+"/loans/' title='Banking'>Loans</a></li><li><a href='/smallbusiness/' title='Small Business'>Small Business</a></li><li><a href='"+protocol+""+domainName+"/bank/commercial/' title='Commercial Banking'>Commercial Banking</a></li><li><a href='"+protocol+""+domainName+"/sitemap/' title='Site Map'>Site Map</a></li></ul></div><div class='genericB'></div></div><div class='column grid-3'><div class='genericA'><h6>Corporate Information</h6><ul><li><a href='/about/' title='About Capital One'>About Capital One</a></li><li><a href='"+protocol+""+domainName+"/contactus/?linkid=WWW_Z_Z_Z_GBLFO_FO_02_T_CU1' target='_blank' title='Contact Us'>Contact Us</a></li><li><a href='"+protocol+""+domainName+"/careers/?linkid=WWW_Z_Z_Z_GBLFO_FO_03_T_CAR1' target='_blank' title='Careers'>Careers</a></li><li><a href='"+protocol+""+domainName+"/redirect.php?Log=1&linkid=WWW_Z_Z_Z_GBLFO_FO_04_T_A17&dest="+protocol+"phx.corporate-ir.net/phoenix.zhtml?c=70667&p=irol-irhome' target='_blank' title='Investors'>Investors</a></li><li><a href='"+protocol+""+domainName+"/redirect.php?Log=1&linkid=WWW_Z_Z_Z_GBLFO_FO_05_T_PHXIR&dest="+protocol+"phx.corporate-ir.net/phoenix.zhtml?c=70667&p=irol-news' target='_blank' title='Press'>Press</a></li><li><a href='"+protocol+""+domainName+"/financialeducation/?linkid=WWW_Z_Z_Z_GBLFO_FO_06_T_FIN' title='Financial Education'>Financial Education</a></li></ul></div><div class='genericB'></div></div><div class='column grid-2'><div class='genericA'><h6>Locations</h6><ul><li><a href='"+protocol+""+domainName+"/redirect.php?Log=1&amp;linkid=WWW_Z_CUST_A1B75B1BA1C1BB8D1B65_OBTF_H1_32_T_BPFIND&amp;dest="+protocol+"maps.capitalone.com/locator/' target='_blank' title='Find a Branch or ATM'>Find a Branch/ATM</a></li></ul><h6>Worldwide</h6><ul><li><a href='"+protocol+""+domainName+"/redirect.php?Log=1&linkid=WWW_Z_Z_Z_GBLFO_FO_06_T_ISCAN&dest="+protocol+"www.capitalone.ca' target='_blank'>Canada</a></li><li><a href='"+protocol+""+domainName+"/redirect.php?Log=1&linkid=WWW_Z_Z_Z_GBLFO_FO_07_T_ISUK&dest="+protocol+"www.capitalone.co.uk' target='_blank'>UK</a></li></ul></div><div class='genericB'></div></div><div class='column grid-2'><div class='genericA'><h6>Legal</h6><ul><li><a href='"+protocol+""+domainName+"/legal/privacy.php?linkid=WWW_Z_Z_Z_GBLFO_F1_01_T_FO1' target='_blank'>Privacy</a></li><li><a href='"+protocol+""+domainName+"/legal/security.php?linkid=WWW_Z_Z_Z_GBLFO_F1_02_T_FO4' target='_blank'>Security</a></li><li><a href='"+protocol+""+domainName+"/legal/terms.php?linkid=WWW_Z_Z_Z_GBLFO_F1_03_T_FO5' target='_blank'>Terms &amp; Conditions</a></li></ul></div><div class='genericB'><img id='logo-fdic' src='/assets/img/global/logo/fdic.png' title='FDIC logo' alt='Capital One Bank is FDIC insured' width='97' height='12' /><div><img id='logo-ehl' src='/assets/img/global/logo/ehl.png' title='Equal Housing Lender logo' alt='Capital One is an Equal Housing Lender' width='26' height='27' border='0' /><span>Equal Housing Lender</span></div></div></div>"+
   "<div class='genericA' id='footerInfo'><p>This site provides information about and access to financial services offered by the Capital One family of companies, including Capital One Bank (USA), N.A. and Capital One, N.A., Members FDIC.<br />&copy;"+getYearValue+" "+getBusinessNameValue+"</p><p>Capital One is a federally registered service mark. All rights reserved.Blank Check&reg; is a registered trademark of Capital One Services, Inc.Capital One does not provide, endorse, nor guarantee and is not liable for third party products, services, educational tools, or other information available through this site.<br/><a href='"+protocol+""+domainName+"/capitaloneplace/disclosures.php?linkid=WWW_Z_Z_Z_GBLFO_FO_08_T_DIS1' target='_blank'>Read additional disclosures</a>.</p></div><div class='genericB'></div></div>");

}
function showFooterPopUp(domainName,getLob,getYearValue,getBusinessNameValue){

	document.write("<div id='footer' class='row alpha omega'>&copy;"+getYearValue+" "+getBusinessNameValue+". The trademarks used herein are owned by "+getBusinessNameValue+".All rights reserved</p><br><p align='center'><a href='#' onclick='javascript:window.close();' id='popup-close-btm'>Close window</a></p>");
}

//end header-footer.js merge

//start utilitynav.js merge
// Adds the class "last" to the last item in the
// utility links to remove the right border
$(document).ready(function(){
        $('#utility-links li:last').addClass('last');
});
$.elReady("ul#utility-links li.print a",function(){
        $(this).click(function(){window.print();});
});

// end utilitynav.js

//start open-account.js merge
$('#btn_continue').click(function()
{
  if ($('#promo').attr('value').length == 9)
  {
    var itc = $.cookie('itc');
    if (itc.length == 25)
    {
      $.cookie('tmp_offer',itc.substr(23,2), { path: '/', domain: 'capitalone.com' }); 
      $.cookie('itc', itc.substr(0,16) + $('#promo').attr('value').toUpperCase(), { expires: 60, path: '/' ,domain: 'capitalone.com' });
    }

  }
});

//end open-account-js merge

//start global.js merge
// Opens a pop-up when the function is called.
function openPopUp(url, navStatus, name, height, width){
    //Opens the popup window.
    var newwindow;
    newwindow = window.open(url, name, 'height=' + height + ',width=' + width + ',scrollbars=' + navStatus + ',toolbar=' + navStatus + ',menubar=' + navStatus + ',status=yes');
}

function getXmlHttpRequestObject(){
    if (window.XMLHttpRequest) {
        return new XMLHttpRequest(); //Not IE	
    }
    else 
        if (window.ActiveXObject) {
            return new ActiveXObject("Microsoft.XMLHTTP"); //IE	
        }
        else {
            alert("Your browser doesn't support the XmlHttpRequest object.  Better upgrade to Firefox.");
        }
}

// Makes ajax call
function ajaxCall(url){

    var xmlHttpReq = getXmlHttpRequestObject();
    xmlHttpReq.onreadystatechange = function(){
        if (xmlHttpReq.readyState == 4) {
        }
    };
    var d = new Date();
    url += "&r=" + d.getTime();
    xmlHttpReq.open('GET', url, true);
    xmlHttpReq.send(null);
}

// Page level tagging. It fires ajax calls to jave request footprint. 
function VSPageTagging(){
    var VsPageInfo = new VsPage();
    Pg_Tag_url = getPageTaggingParameters(VsPageInfo);
    Pg_Tag_url = "/assets/img/visualscience/vs_img.gif" + Pg_Tag_url;
    ajaxCall(Pg_Tag_url);
}

//Populates the parameters to be passed for Page Tagging and returns in the form of a url.
function getPageTaggingParameters(VsPageInfo){

    Pg_Tag_url = "?log=" + VsPageInfo.log +
    "&System=" +
    VsPageInfo.system +
    "&LOB=" +
    VsPageInfo.lobId +
    "&TestCell=" +
    VsPageInfo.testCell +
    "&Segment=" +
    VsPageInfo.segment +
    "&Experience=" +
    VsPageInfo.experience +
    "&PageName=" +
    VsPageInfo.pageViewName +
    "&PageType=" +
    VsPageInfo.pageType +
    "&Layout=" +
    VsPageInfo.layout +
    "&EventType=page";
    
    return Pg_Tag_url;
}

function popup(url, navStatus, size){
    //Opens the popup window.
    var height = 400;
    var width = 450;
    if (size == "BIG") {
        height = 600;
        width = 450;
    }
    
    if (url.indexOf('?' != -1)) {
        url = url.replace("?", "?popUp=true&");
    }
    else {
        url = url + "?popUp=true";
    }
    
    var newwindow = window.open(url, '', 'height=' + height + ',width=' + width +
    ',scrollbars=yes' +
    ',toolbar=' +
    navStatus +
    ', menubar=' +
    navStatus +
    ',status=no');
}

//Populates the parameters to be passed for Page Tagging and returns in the form of a url.
function getComponentTaggingParameters(VsPageInfo){

    //Retrieving the Page Context. 	
    var page = bea.wlp.disc.context.Page.findByLabel(VsPageInfo.pageLabel);
    
    //Retriving the LOB name from the Page Context.
    var lob = VsPageInfo.lobId;
    
    //Retriving the Portlets Information from Page Context
    var placables = page.getPlaceables();
    
    //Retriving the page's Layout Information.	
    
    var temp = VsPageInfo.portlet;
    var index = temp.indexOf('_');
    
    var portletLocation = temp.substring(0, index);
    var portletTitle = temp.substring(index + 1);
    
    Cmpt_Tag_url = "?log=1" +
    "&LOB=" +
    lob +
    "&TestCell=" +
    VsPageInfo.testCell +
    "&PageName=" +
    VsPageInfo.pageViewName +
    "&Segment=" +
    VsPageInfo.segment +
    "&PortletLocation=" +
    portletLocation +
    "&ComponentName=" +
    portletTitle +
    "&EventType=component";
    
    if (VsPageInfo.strategy != 'null' && VsPageInfo.strategy != '') {
        Cmpt_Tag_url = Cmpt_Tag_url + "&ComponentStrategy=" + VsPageInfo.strategy;
    }
    
    if (VsPageInfo.cmptTestCell != 'null' && VsPageInfo.cmptTestCell != '') {
        Cmpt_Tag_url = Cmpt_Tag_url + "&ComponentTestCell=" + VsPageInfo.cmptTestCell;
    }
    return Cmpt_Tag_url;
}

//Retrieves the link Tagging parameters from request 
function getLinkTaggingParameters(VsLinkInfo){
    var link_Tag_url;
    if (VsLinkInfo.lobId != 'null' && VsLinkInfo.lobId != '') {
    
        link_Tag_url = "&LOB=" + VsLinkInfo.lobId +
        "&Segment=" +
        VsLinkInfo.Segment +
        "&TestCell=" +
        VsLinkInfo.TestCell +
        "&PageName=" +
        VsLinkInfo.PageName +
        "&EventType=" +
        VsLinkInfo.EventType +
        "&ComponentType=" +
        VsLinkInfo.ComponentType +
        "&ContentElement=" +
        VsLinkInfo.ContentElement +
        "&TargetPageName=" +
        VsLinkInfo.TargetPageName;
        
        if (VsLinkInfo.PortletLocation != 'null' && VsLinkInfo.PortletLocation != '') {
            link_Tag_url = link_Tag_url + "&PortletLocation=" + VsLinkInfo.PortletLocation;
        }
        if (VsLinkInfo.ComponentName != 'null' && VsLinkInfo.ComponentName != '') {
            link_Tag_url = link_Tag_url + "&ComponentName=" + VsLinkInfo.ComponentName;
        }
        if (VsLinkInfo.ComponentStrategy != 'null' && VsLinkInfo.ComponentStrategy != '') {
            link_Tag_url = link_Tag_url + "&ComponentStrategy=" + VsLinkInfo.ComponentStrategy;
        }
        if (VsLinkInfo.ComponentTestCell != 'null' && VsLinkInfo.ComponentTestCell != '') {
            link_Tag_url = link_Tag_url + "&ComponentTestCell=" + VsLinkInfo.ComponentTestCell;
        }
        if (VsLinkInfo.TargetLOB != 'null' && VsLinkInfo.TargetLOB != '') {
            link_Tag_url = link_Tag_url + "&TargetLOB=" + VsLinkInfo.TargetLOB;
        }
    }
    return link_Tag_url;
}


//function to be called for tagging modal windows.
function modalTagging(){
    //Retrieving pageLabel,pageId,pageType from request.
    var Pg_Tag_url = null;
    var pgLbel = "${requestScope.pageDef_Label}";
    var pageId = "${requestScope.pageid}";
    var pageType = "${requestScope.pageType}";
    
    //Making a call to the tagging javascript to tag the parameters for the pop-up window.	
    Pg_Tag_url = getPageTaggingParameters(pgLbel, pageId, pageType);
    Pg_Tag_url = "${pageContext.request.contextPath}" + Pg_Tag_url;
    
    //Making ajax call to hit the webserver.
    var xmlHttpReq = new bea.wlp.disc.io.XMLHttpRequest();
    xmlHttpReq.onreadystatechange = function(){
        if (xmlHttpReq.readyState == 4) {
            if (xmlHttpReq.status == 200) {
                var data = eval('(' + xmlHttpReq.responseText.toString() + ')');
            }
            else {
            }
        }
    };
    xmlHttpReq.open('GET', Pg_Tag_url, true);
    xmlHttpReq.send(null);
}
//end global.js merge

//start footnotes.js merge
var	footnoteCount=0;

$(document).ready(function() {
	renumberSingleFootnotes();
});

//For Single Manual/Dynamic footnotes replace number with symbol (*)
function renumberSingleFootnotes() {
	var seen = {};
	// Calculate the footnote count by iterating over all unique footnote anchors.
	$('div a[href^="#footnote"]').each(function() {
		var href=$(this).attr('href');
		if (seen[href])
			return true;
		else {
			seen[href] = true;
			footnoteCount++;
		}
	});
	// Update the footnote anchor/text with symbol(*) for single footnotes (dynamic)
	if (footnoteCount==1) {
		$('.footnote').text('*');
		$('#footnotes p[id^="footnote"] sup[id^="footnoteSup"]').text('*');
	}
}
// This function removes existing footnotes in the zone contents passed
function removeExistingFootnotes(content){
	var seen = {};
	$(content).find('.footnote').each(function(){
		var href = $(this).attr('href');
		var footnoteId = $(this).text();
		if (seen[footnoteId]) {
			return true;
		}
		else {
			// remove the footnote p if the anchor is not used elsewhere.
			if ( $('div a[href="' + href + '"]').length==1 ) {
				$(href).parent(".footnote_content_wrapper").remove();
				seen[footnoteId] = true;
			}
		}
	});
}
// This function adds footnotes in the footnote zone based the div passed(if footnote anchors are found).
// It also renumbers the footnote anchors based on the footnoteCount.
function addNewFootnotes(div) {
	var seen = {};
	var seenID ={};
	// Add new footnotes if count is set
	if (footnoteCount > 0) {
		//Iterate over all footnote anchors ("footnote" is the css class)
		$(div + ' .footnote').each(function(){
			var pId = $(this).attr('href');
			var footnoteId = $(this).text();
			//Continue to next footnote anchor if its already been added
			if (seen[footnoteId]) {
				$(this).attr('href', '#footnote'+seenID[footnoteId]);
				$(this).html('<sup>' +seenID[footnoteId]+ '</sup>');		
				return true;
			}
			else {
				seen[footnoteId] = true;
				footnoteCount++;
				seenID[footnoteId] = footnoteCount;
				
				$(this).attr('href', '#footnote'+footnoteCount);
				$(this).html('<sup>' + footnoteCount + '</sup>');
				var hiddenText = eval("footnoteText" + footnoteId);
				var footnoteP = '<div class="footnote_content_wrapper"><p id="footnote' + footnoteCount + '">' + 
				'<span class="fn-dis"><sup id="footnoteSup' + footnoteCount + '">' + footnoteCount 
				+ '</sup></span>' + hiddenText + '</p></div>';
				$.trim(footnoteP);
				$('#footnotes').append(footnoteP);
			}
		});
	}
	// Remove the footnotes that are not used on the page
	$('#footnotes .footnote_content_wrapper p[id^="footnote"]').each(function() {
		var href = $(this).attr("id");
		if ( ($('div a[href="#' + href  + '"]').length==0) && ( href != "footnote") ) {
			$(this).parent(".footnote_content_wrapper").remove();
		}
	});
	// For Single footnotes(X+1 replaced) replace number with symbol (*)
	renumberSingleFootnotes();
}
//end footnotes.js merge

//start searchresult.js
function submitFeedback(dataString, feedbackFormId) {
	$('#'+feedbackFormId).html("Thanks for letting us know how we did. Your feedback is important to us.");
    $.ajax({
    	type: "POST",
        url: "/services/search/feedback",
        data: dataString
	});
	return false;
}

function clickResult(linkid) {
	var urlString = '/services/search/click?linkid='+ linkid;
	$.ajax({
		type: "PUT",
		url: urlString
	});
	$('#'+linkid).next().click();
}
//end searchresult.js

//start header.js document ready fns

jQuery(document).ready(function() {
	// Run Header
	Cof.Header();
});
//end header.js document ready fns

//Pop up for BankRegionalization home.capitalone.360 URL invoked from bank-capitalone360.xml.
function capitalOne360PopUp(url){	
	if(url.indexOf("http://") !=-1 || url.indexOf("https://") !=-1 ) {
		window.open(url)
	 } 
	 else {
		 //Incorrect url pattern or property file fail to load www.capitalone360.bank.redirect.url
		var port = document.location.port;
		if(port !=null) {
               window.open("http://"+window.location.hostname+":" + port +"/misc/error/404.html")
		} else {
		      window.open("http://"+window.location.hostname+"/misc/error/404.html")
		   }
	  }
}
