/*
Title:			Document Ready and Glabal Functions
Copyright:		Copyright 2013, Capital One
Domain:			www.capitalone.com
Author:			Brian Dillon
Description:	JavaScript that runs after the dom finishes loading
Date:			04/19/2013
Version:		1.0

Dependent on:	jquery.js, plugins.js
Dependent for:	xp1.js

*/

var Cof = Cof || {};
var zipOptOutFlag = false;
var inBankFlag = false;
var showLogo = true;
var showCaponeLogo = true;
var showCaponeBankLogo = false;
var	footnoteCount = 0;
Cof.swfobjects = [];

Cof.Logo = function() {
	"use strict";
	
	if (showLogo) {
		if (showCaponeLogo) {
			$('.capitalone-logo img').removeClass('bank-logo').addClass('default-logo');
		} else if(inBankFlag || showCaponeBankLogo) {
			$('.capitalone-logo img').removeClass('default-logo').addClass('bank-logo');
		} else {
			$('.capitalone-logo img').removeClass('bank-logo').addClass('default-logo');
		} 
	}
	if($('html').hasClass('lt-ie7')) { 
		Cof.Logo.imgsrc = $('.capitalone-logo img').attr('src');
		Cof.Logo.imgsrc = Cof.Logo.imgsrc.replace('png','gif').replace('/logo/','/ie/');
		$('.capitalone-logo img').attr('src', Cof.Logo.imgsrc);
	}
};
Cof.Global = function () {
	"use strict";	
	
	// Utility links
	$('#utility-links li:last').addClass('last');
	$('#utility-links li.print a').on("click", function () { window.print(); });
	
	// Add "last" class to last item in "list" component
	$('.list ul').each(function (){
		$(this).find('li:last').addClass('last');
	});
	
	// Tooltips/Clicktips
	Cof.Global.ClicktipTrigger = null;
	Cof.Global.CluetipShow = function(ct) {
		if(ct.hasClass('cluetip-tooltip-rounded')){
			$('.cluetip-close a').focus();
		} else {
			ct.find('.cluetip-title').attr('tabindex', '-1').focus();
		}
		ct.prepend('<a href="#" class="cluetip-finish">Start of Tooltip Dialog</a>');
		$('.cluetip-inner').append('<a href="#" class="cluetip-finish">End of Tooltip Dialog</a>');
		$('.cluetip-finish').on("focus", function () {
			$('.cluetip-finish').remove();
			$(document).trigger('hideCluetip');
			Cof.Global.ClicktipTrigger.focus();
		});
	};
	Cof.Global.CluetipHide = function () {
		$('.cluetip-finish').remove();
		Cof.Global.ClicktipTrigger.focus();
	};
	
	Cof.Global.tooltipRel = '';
	Cof.Global.tooltipLink = '';
	
	$('a.tooltip').cluetip('destroy');
	$('a.tooltip').each(function (){
		Cof.Global.tooltipRel = $(this).attr('rel');
		if(Cof.Global.tooltipRel !== '' && Cof.Global.tooltipRel.indexOf("/www-portal/ShowBinary") == -1) {
			Cof.Global.tooltipLink = '/www-portal/ShowBinary'+ Cof.Global.tooltipRel;
			$(this).attr('rel', Cof.Global.tooltipLink).attr('href', Cof.Global.tooltipLink);
		}
	}).on("click", function () {
		Cof.Global.ClicktipTrigger = $(this);
	}).on("mouseover", function () {
		Cof.Global.ClicktipTrigger = $(this);
	}).cluetip({
		cluetipClass:	'tooltip-rounded', 
		dropShadow:		false, 
		sticky:			true, 
		mouseOutClose:	true,
		width:			300,
		arrows:			true, 
		cursor:			'pointer',
		ajaxCache:		true,
		clickThrough:	false,
		showTitle:		false,
		onShow:			function(ct) { Cof.Global.CluetipShow(ct); },
		onHide:			function () { Cof.Global.CluetipHide(); }
	}).cluetip({
		cluetipClass:	'tooltip-rounded', 
		dropShadow:		false, 
		sticky:			true, 
		mouseOutClose:	true,
		width:			300,
		arrows:			true, 
		cursor:			'pointer',
		ajaxCache:		true,
		activation:		'click',
		clickThrough:	false,
		showTitle:		false,
		onShow:			function(ct) { Cof.Global.CluetipShow(ct); },
		onHide:			function () { Cof.Global.CluetipHide(); }
	});

	$('a.clicktip-trigger').cluetip('destroy');
	$('a.clicktip-trigger').on("click", function () {
		Cof.Global.ClicktipTrigger = $(this);
	}).cluetip({
		cluetipClass:	'clicktip-content',
		closePosition:	'top',
		local:			true,
		arrows:			false,
		cursor:			'pointer',
		sticky:			true,
		activation:		'click',
		dropShadow:		false,
		onShow:			function(ct) { Cof.Global.CluetipShow(ct); },
		onHide:			function () { Cof.Global.CluetipHide(); }
	});
	
	// Modal Overlay
	Cof.Global.ModalTrigger = null;
	
	$('a.modal-overlay').removeAttr("target").each(function() {
		if($(this).hasClass('externalModal')) {
			$(this).attr('data-fancybox-type','iframe');
		} else {
			$(this).attr('data-fancybox-type','ajax');
		}
	});

	//if(Cof.ScreenSize !== "mobile") { 
		$('a.modal-overlay').each(function () {	
			$(this).on("click", function (){
				Cof.Global.ModalTrigger = $(this);
			}).fancybox({
				padding: 0,
				afterShow: function () {
					$('.fancybox-close').focus();
					$('.modal-end, .modal-start').on("focus", function () {
						$('.fancybox-close').focus();
					});
				},
				afterClose:	function () {
					Cof.Global.ModalTrigger.focus();
				}
			});
		});
	//}
	
	// FAQ
	Cof.Global.hashLinkIndex = window.location.href.indexOf('#');
	Cof.Global.queryIndex = window.location.href.indexOf('?');
	if (Cof.Global.queryIndex < Cof.Global.hashLinkIndex) {
		Cof.Global.faqLinkResults = window.location.href.substring((Cof.Global.hashLinkIndex + 1), window.location.href.length)
	} else if (Cof.Global.hashLinkIndex !== -1 && Cof.Global.queryIndex !== -1) {
		Cof.Global.faqLinkResults = window.location.href.substring((Cof.Global.hashLinkIndex + 1), Cof.Global.queryIndex);
	} else if (Cof.Global.hashLinkIndex !== -1) {
		Cof.Global.faqLinkResults = window.location.href.slice(Cof.Global.hashLinkIndex + 1);
	}
	
	if(Cof.Global.faqLinkResults) {
		$('.faq a[name=' + Cof.Global.faqLinkResults + ']').next('dl').find('dd').show();
		Cof.Global.faqLinkResultsElement = $('.faq a[name=' + Cof.Global.faqLinkResults + ']').parent();
		if (Cof.Global.faqLinkResultsElement !== null && Cof.Global.faqLinkResultsElement !== undefined) {
			document.getElementById(Cof.Global.faqLinkResultsElement.attr('id')).scrollIntoView();
		}
	}
	
	$('.faq dt a').on("click", function(e) {
		$(this).parent().next('dd').slideToggle();
		e.preventDefault();
	});
	
	// LOB nav mobile toggle
	if (Cof.ScreenSize === "mobile"){
		$('.lob-root').on('click', 'a', function (e) {
			if (!$(this).hasClass('open')) { 
				$(this).addClass('open').parents('#nav-lob').find('ul').slideDown();
				e.preventDefault();
			}
		});
	}
	
	//Multiple image Banners
	$('.banner-multi').multiBanner();
	
	// Accordion
	$('.accordion').each(function () { 
		$(this).find('h2:first').addClass('open').attr("aria-expanded", "true").next('.accordion-content').show().attr("aria-hidden", "false");
	});
	$('.accordion h2 a').on('click', function(e) {
		if (!$(this).parent().hasClass('open')) {
			$(this).parent().parent().find('h2.open').removeClass('open').attr("aria-expanded", "false").next('.accordion-content').slideUp().attr("aria-hidden", "true");
			$(this).parent().addClass('open').attr("aria-expanded", "true").next('.accordion-content').slideDown().attr("aria-hidden", "false");
		}
		e.preventDefault();
	});
	
	//Tab Navigation
	$('#nav-product .on a').attr('aria-selected', 'true');
	
	// Mobile Login Toggle
	$('.mobile-hp-login.toggle').on("click", function () {
		$(this).hide();
		$('.log-in-badge').slideToggle(function () {
			$(this).addClass('open');
		});
	});
	
	// Opinion Lab
	$('#oo_tab').attr("role", "menu").attr("aria-haspopup", "true");
	$('#oo_tab span').text("Feedback");
	
	// Resize Videos for Responsive
	//$('.video').fitVids();
	
	// Card "Text Only" Landing Pages
	if(document.location.href.indexOf('#nontextOnlyVersion') > 0){
		$(".freeFormText").show();  
		$(".freeFormBanner").hide();
		$("a.freeFormHref").text('Return to non-text version').addClass('freeFormLeft').attr('href', '#nontextOnlyVersion');
	} else {
		$('.freeFormText').hide();
	}
	
	$('a.freeFormHref').on("click", function () {
		$(this).closest('.freeForm').find('.freeFormBanner, .freeFormText').toggle();
		
		Cof.Global.freeFormHrefText = $(this).text();
		if (Cof.Global.freeFormHrefText.indexOf('Text only') > -1) {
			$(this).text('Return to non-text version').addClass('freeFormLeft').attr('href', '#nontextOnlyVersion');
		} else {
			$(this).text('Text only version').removeClass('freeFormLeft').attr('href', '#textOnlyVersion');
		}
	});
	
	$('.stars').stars();
};

Cof.Header = function () { 
	"use strict";
	
	// Skip Nav accessibility function
	$('#header').on('click', '#skip-nav', function () { $('#main-content').focus(); return false; });
	
	Cof.Header.c1server = window.location.protocol + "//" + window.location.hostname;
	if(window.location.port !== null){
		Cof.Header.c1server = Cof.Header.c1server + ":" + window.location.port;
	}
	
	// Mobile toggle buttons
	$('.header').on('click', '.search-menu', function () {
		$(this).toggleClass('on');
		if($(this).hasClass('on')){
			$(this).attr('aria-pressed', 'true');
		} else {
			$(this).removeAttr('aria-pressed');
		}
		$('form.search').slideToggle('medium', function () {
			($(this).css('display') === 'none') ? $(this).removeAttr('style') : $(this);
		});
	});
	$('.header').on('click', '.nav-menu', function () {
		$(this).toggleClass('on');
		if($(this).hasClass('on')){
			$(this).attr('aria-pressed', 'true');
		} else {
			$(this).removeAttr('aria-pressed');
		}
		$('#nav-primary').slideToggle('medium', function () {
			($(this).css('display') === 'none') ? $(this).removeAttr('style') : $(this);
		});
	});
	
	Cof.Header.Search();
	Cof.Header.GlobalNav();
	Cof.Header.PrimaryNav();
	Cof.Header.Zipcode.init();
};

Cof.Header.Search = function () {
	"use strict";
	
	// Hide label on page load if prefilled
	if ($('#search-term').val() !== '') { $('#search-form label').addClass('off'); }
	
	// Hide/show label during input focus
	$('#search-term').on("focus", function () {
		$(this).parents('#search-form').addClass('search-focus');
		if ($(this).val() === '') {
			$('#search-form label').addClass('off');
		}
	}).on("blur", function (){
		$(this).parents('#search-form').removeClass('search-focus');
		if ($(this).val() === '') {
			$('#search-form label').removeClass('off');
		}
	});

	$('#search-form').on("submit", function (){
		Cof.Header.Search.value = $('#search-term').val();

		if (Cof.Header.Search.value === Cof.Header.Search.searchLabel) {
			$('#search-term').val('');
		}

		if (typeof cg2 !== 'undefined') {
			$(this).append('<input type="hidden" name="cg2" value="' + unescape(cg2) + '" />');
		}

		$(this).append('<input type="hidden" name="refer" value="' + encodeURI(location.href) + '" />');
	});
};

Cof.Header.GlobalNav = function () {
	"use strict";
	
	$('.zip-product-search a, .zip-product-search input').on("focus", function () {
		$(this).parents('.zip-product-search').addClass('zipCodeOver');
	});
	$('.zip-product-search').on("mouseover", function () {
		$(this).addClass('zipCodeOver');
	}).on("mouseout", function () {
		$(this).removeClass('zipCodeOver');
	});
};

Cof.Header.PrimaryNav = function() {
	$.elReady('#nav-primary', function() {
		Cof.Header.PrimaryNav.Render();
	});
};

Cof.Header.PrimaryNav.Render = function () {
	"use strict";

	if( navigator.userAgent.match(/Android/i)		||
		navigator.userAgent.match(/webOS/i)			||
		navigator.userAgent.match(/iPhone/i)		||
		navigator.userAgent.match(/iPad/i)			||
		navigator.userAgent.match(/iPod/i)			||
		navigator.userAgent.match(/BlackBerry/i)	||
		navigator.userAgent.match(/Kindle/i)		||
		navigator.userAgent.match(/Silk/i)			||
		navigator.userAgent.match(/Touch/i)
	){ 
		// Mobile target functions
		$('li.supersubs a').on("click", function () {
			if($(this).parents().hasClass('sfHover')){
				return true;
			} else {
				$('.sfHover').removeClass('sfHover').find('div.row').slideUp('fast');
				$(this).parent().addClass('sfHover').find('div.row').slideDown('medium');
				return false;
			}
		}).on("focus", function () {
			if($(this).parents().hasClass('sfHover')){
				return true;
			} else {
				$('.sfHover').removeClass('sfHover').find('div.row').slideUp('fast');
				$(this).parent().addClass('sfHover').find('div.row').slideDown('medium');
				return false;
			}
		});
		document.addEventListener('touchstart', function(e) {
			Cof.Header.PrimaryNav.touched = jQuery(e.target);
			
			if(!Cof.Header.PrimaryNav.touched.parents().hasClass('sfHover')){
				$('.sfHover').removeClass('sfHover').find('div.row').slideUp('fast');
			}
		}, false);
		$('a, input').on("focus", function () {
			if(!$(this).parents().hasClass('sfHover')){
				$('.sfHover').removeClass('sfHover').find('div.row').slideUp('fast');
			}
			if(!$(this).parents().hasClass('supersubs')){
				$('.acc-expand-supers').hide();
			}
		});
	} else {
		$('li.supersubs').hoverIntent({	
			over: function (){
				if(!$(this).hasClass('sfHover')){
					$('.sfHover').removeClass('sfHover').find('div.row').slideUp('fast');
					$(this).addClass('sfHover').find('div.row').slideDown('medium');
				}
			}, 
			timeout: 500, 
			out: function (){
				$(this).removeClass('sfHover').find('div.row').slideUp('fast');
			}
		});
		$('li.supersubs > a').on("focus", function() {
			$(this).parent().removeClass('sfHover').find('div.row').slideUp('fast');
			$('.acc-expand-supers:visible').hide();
			$(this).parent().find('.acc-expand-supers').show();
		});
		$('.acc-expand-supers a').on("blur", function () {
			$(this).parent().hide();
		}).on("click", function () {
			$(this).parents('li').addClass('sfHover').find('div.row').slideDown('medium').find('a:first').focus();
			$(this).parent().hide();
			return false;
		});
		$('#nav-primary .row a').on("keyup", function(e) {
			Cof.Header.PrimaryNav.keyCode = e.which || e.keyCode;
			if (Cof.Header.PrimaryNav.keyCode === 27) { //ESC
				$(this).parents('.sfHover').find('.acc-expand-supers').show().find('a').focus();
				$(this).parents('.sfHover').removeClass('sfHover').find('div.row').slideUp('fast');
			}
		});

		$('a, input').on("focus", function () {
			if(!$(this).parents().hasClass('sfHover')){
				$('.sfHover').removeClass('sfHover').find('div.row').slideUp('fast');
			}
			if(!$(this).parents().hasClass('supersubs')){
				$('.acc-expand-supers').hide();
			}
			if(!$(this).parents().hasClass('zip-product-search')){
				$('.zip-product-search').removeClass('zipCodeOver');
			}
		});
		$(document).on("click", function(e) {
			$('.acc-expand-supers:visible').hide();
			Cof.Header.PrimaryNav.clicked = $(e.target);
			if(!Cof.Header.PrimaryNav.clicked.parents().hasClass('sfHover')){
				$('.sfHover').removeClass('sfHover').find('div.row').slideUp('fast');
			}
		});
		
		primaryNavLogin(false);
	}
	
	if (Cof.ScreenSize === "mobile") {
		$('#nav-primary-login a').removeAttr('onclick').attr('href', '/login');
	}
};
Cof.Header.Zipcode = (function () {
	"use strict";
	
	// Indicator for when the zip has been successfully accepted and submitted
	var hasSubmitZip = false;
	var modalTrigger = null;
	
	var modalClose = function() {
		if (!hasSubmitZip) {
			Cof.Header.Zipcode.rejectZip();
		}
	};
	
	return {
		direct: false,
		noPromptCookie: 'nozip',
		goToUrl: '',

		init: function () {
			$(function () {
				
				if (!Cof.Header.Zipcode.validZip()											&&	// only run if the ZIP is not valid
					!Cof.Header.Zipcode.validRegion()										&&	// only run if the region is not valid
					(window.location.hostname.indexOf('capitalone.com') !== -1)				&&	// only run if the hostname contains "capitalone.com"
					(document.cookie.indexOf(Cof.Header.Zipcode.noPromptCookie) === -1		||
					$.cookie(Cof.Header.Zipcode.noPromptCookie) !== 'true')					&&	// only run if the noPromptCookie is not set to "true" (or doesn't exist)
					typeof $.fancybox === 'function'										&&	// only run if simple modal is loaded
					window.c1zip !== 1														&&	// only if the c1zip variable is specifically not 1
					zipOptOutFlag === false														// only if they have not opted out
				) {
					$('a.zip-prompt-flag').click(function () {
						modalTrigger = $(this);
						Cof.Header.Zipcode.askForZip(this.href);
						return false; 
					});
				}

				$('#change-zip, #zipcode-overlay-form').submit(function () {
					if($(this).attr('processed') == null) {
						$(this).attr('processed', 'true');
						return Cof.Header.Zipcode.submitZip($(this).attr('id'));
					}
				});
			});

			$.elReady('#zipcode-prompt-input', function () {
				if (this.val() === "") {
					$("#zipcode-prompt-form label").show();
				} else {
					$("#zipcode-prompt-form label").hide();
				}
	
				// Clear input on focus
				this.on("focus", function () {
					$("#zipcode-prompt-form label").hide();
				});
	
				// If field is empty afterward, add text again
				this.on("blur", function () {
					if ($('#zipcode-prompt-input').val() === "") {
						$("#zipcode-prompt-form label").show();
					}
				});
			});
		},

		askForZip: function(linkUrl) {
			if (this.validZip() || window.c1zip === 1) {
				// We're good to move on
				return true;
			}

			this.goToUrl = linkUrl;

			$.fancybox($('#zipcode-overlay-content'), {
				beforeClose	:  modalClose,
				wrapCSS		: "zip-prompt",
				afterShow: function () {
					$('#zipcode-overlay-input').focus();
					$('.modal-end, .modal-start').on("focus", function () {
						$('.fancybox-close').focus();
					});
				},
				afterClose:	function () {
					modalTrigger.focus();
				}
			});

			// Enable escape key closing of dialog
			document.onkeyup = function(e) {
				var keycode = e.which || e.keyCode;
				if (e === null) {  // IE
					keycode = event.keyCode;
				} else { // Mozilla
					keycode = e.which;
				}
				if (keycode === 27) { // Close
					$.fancybox.close();
				}
			};

			return false;
		},

		rejectZip: function () {
			$.cookie(this.noPromptCookie, 'true', {path: '/', domain: '.capitalone.com'});
			window.location.assign(this.goToUrl);
			return false;
		},

		submitZip: function(formId) {
			var oldzip = window.c1zip;
			var inputCurrentHost = null;

			// This if condition is for zipcode-prompt bank redesign
			if(formId === 'zipcode-prompt-form') {
				window.c1zip = $("#zipcode-prompt-input").val();
			} else {
				window.c1zip = $("#" + formId + " input.zipcode-input").val();
			}

			if (!this.validZip()) {
				if (formId === 'zipcode-overlay-form') {
					$('#zipcode-overlay-content p').text('Please enter a valid five-digit ZIP Code.').addClass('error');
				} else if (formId === 'change-zip') {
					$('#change-zip label').text('ZIP code is invalid').addClass('error');
				} else if (formId === 'zipcode-prompt-form') { // This if condition is for form id name having zipcode-prompt-form for bank redesign
					$('#zipcode-prompt-form p').text('Please enter a valid five-digit ZIP Code.').addClass('error');
				}

				window.c1zip = oldzip;
				return false;

			} else if (window.location.hostname.search(/(?:qa|pt-web|qa-web|qamain|dev|local|www|beta-www|driver|bunker|celtics|camber|thunder|spurs|celtics|knicks|hornets|pistons|suns|portal-ite|portal-bau|portal-project|staging-web|portal|((kdc|pdc)staging)).*?\.capitalone\.com/) === -1) {
				inputCurrentHost = document.createElement("input");
				$(inputCurrentHost).attr("type", "hidden").attr("name", "exthost").attr("value", escape(window.location.href));
				$("#" + formId).append(inputCurrentHost);
			} else {
				if (Cof.Header.Zipcode.goToUrl === '') {
					Cof.Header.Zipcode.goToUrl = window.location.href;
				}

				if ($("#" + formId + " input[name=dest]").length === 0) {
					inputCurrentHost = document.createElement("input");
					$(inputCurrentHost).attr("type", "hidden").attr("name", "dest").attr("value", escape(Cof.Header.Zipcode.goToUrl));
					$("#" + formId).append(inputCurrentHost);
				} else {
					if(formId !== 'zipcode-prompt-form'){
						$("#" + formId + " input[name=dest]").attr("value", escape(Cof.Header.Zipcode.goToUrl));
					}
				}

				if (Cof.Header.Zipcode.direct) {
					var inputDirect = document.createElement("input");
					$(inputDirect).attr("type", "hidden").attr("name", "direct").attr("value", "yes");
					$("#" + formId).append(inputDirect);
				}

				// If changing the zip code, set a cookie to re-check for region on designated pages
				if (formId === 'change-zip') {
					$.cookie('setzipcode', 'yes', {path: '/', domain: '.capitalone.com'});
				}
			}

			hasSubmitZip = true;
			
			if (typeof $.fancybox === 'function') {
				$.fancybox.close();
			}

			return true;
		},

		validRegion: function () {
			if (typeof window.validRegion === 'undefined') {
				return false;
			}
			if (window.validRegion !== true) {
				return false;
			}

			return true;
		},

		validZip: function () {
			if($('form').is('#zipcode-overlay-form') && $('form').is('#change-zip')) {
				
				if ($('#zipcode') !== null && $('#zipcode').val().length > 0) {
					window.c1zip = $('#zipcode').val();
				} else if($('#zipcode-overlay-input') !== null && $('#zipcode-overlay-input').val().length > 0) {
					window.c1zip = $('#zipcode-overlay-input').value;
				}
			}
			if(document.getElementById('zipcode')!=null && document.getElementById('zipcode').value.length >0)
	        {
				c1zip = document.getElementById('zipcode').value;
			}	
			else if(document.getElementById('zipcode-overlay-input')!=null && document.getElementById('zipcode-overlay-input').value.length >0)
	        {
				c1zip = document.getElementById('zipcode-overlay-input').value;
			}
			if (typeof window.c1zip === 'undefined') {
				return false;
			}
			if (window.c1zip.constructor !== String) {
				return false;
			}
			if (/\d{5}/.test(window.c1zip) === false) {
				return false;
			}

			var zip = parseInt(window.c1zip, 10);
			// The IRS has the lowest zip code at 00501 (see http://en.wikipedia.org/wiki/ZIP_code)
			if (zip < 501 || zip > 99950) {
				return false;
			}

			return true;
		}
	};
})();

Cof.Tables = function () {
	"use strict";
	
	// Rates tables
	Cof.Tables.ratesColCount = 0;
	$('table.rates tr').each(function () { $(this).find('td, th').first().addClass('first'); });
	$('table.rates').each(function () { 
		$(this).find('tbody tr').last().addClass('last');
		Cof.Tables.ratesColCount = $(this).find('thead th, thead td').length;
		//$(this).find('thead').after('<tfoot><tr><td colspan="' + Cof.Tables.ratesColCount + '">&nbsp;</td></tr></tfoot>').find('td, th').css('width', 100 / Cof.Tables.ratesColCount + "%");
	});
	
	// At-a-glance table
	$('table.glance tr').each(function () { $(this).find('td, th').first().addClass('first'); });
	$('table.glance').each(function () {
		$(this).find('tbody tr').first().addClass('credit-level');
		$(this).find('tbody tr:odd').addClass('odd');
		$(this).find('tbody tr:even').addClass('even');
	});
	
	// Basic & Marketing tables
	Cof.Tables.basicColCount = [];
	Cof.Tables.maxColCount = 0;
	$('table.basic tr').each(function () { $(this).find('td, th').first().addClass('first'); });
	$('table.basic').each(function () {
		$(this).find('tbody tr:odd').addClass('odd');
		$(this).find('tbody tr:even').addClass('even');
		$(this).find('thead tr').last().addClass('last');
		$(this).find('tbody tr').each(function (){
			Cof.Tables.basicColCount.push($(this).find('td').length);
			if($(this).parent().parent().hasClass('two-col-table')){
				Cof.Tables.basicColCount.push($(this).find('th').length + $(this).find('td').length);
			}
		});
		$(this).find('thead tr').each(function () { Cof.Tables.basicColCount.push($(this).find('th').length); });
		Cof.Tables.maxColCount = Math.max.apply(Math, Cof.Tables.basicColCount);
		if($(this).find('tfoot').length === 0){
			if($(this).find('thead').length === 0){
				$(this).find('tbody').after('<tfoot><tr><td colspan="' + Cof.Tables.maxColCount + '">&nbsp;</td></tr></tfoot>').find('td, th').css('width', 100 / Cof.Tables.maxColCount + "%");
			} else {
				$(this).find('thead').after('<tfoot><tr><td colspan="' + Cof.Tables.maxColCount + '">&nbsp;</td></tr></tfoot>').find('td, th').css('width', 100 / Cof.Tables.maxColCount + "%");
			}
		}
	}); 

	// Browse tables
	$('table.browse-table tr').each(function() { 
		$(this).find('td, th').first().addClass('first');
		$(this).find('td, th').last().addClass('last');
	});
	
	// Detailed Compare tables
	$('table.detailed-compare').wrap('<div class="detailed-compare-wrapper">');
	$('table.detailed-compare tr').each(function () { $(this).find('td, th').first().addClass('first'); });
	$('table.detailed-compare').each(function () {
		$(this).find('tbody tr:odd').addClass('even');
		$(this).find('tbody tr:even').addClass('odd');
		$(this).find('tbody tr').first().addClass('first');
		$(this).find('tbody tr').last().addClass('last');
		$(this).find('thead tr').last().addClass('last');
	});
	
	function setTableClass() {
		var visibleColumns = $('.detailed-compare thead tr.last th:visible, .detailed-compare thead tr.last td:visible').length;
		switch(visibleColumns) {
			case 5:
				$('.detailed-compare').addClass('compare-four');
				break;
			case 4:
				$('.detailed-compare').removeClass('compare-two').addClass('compare-three');
				break;
			case 3:
				$('.detailed-compare').removeClass('compare-three').addClass('compare-two');
				break;
			case 2:
				$('.detailed-compare').removeClass('compare-two').addClass('compare-one');
				$('.remove').hide();
				$('.return').show();
				break;
			default:
		}
	}
	
	setTableClass();
	
	$('.remove').on("click", function() { 
		var hotIndex = $(this).parent().index() + 1;
		$('.detailed-compare tr td:nth-child(' + hotIndex + '),.detailed-compare tr th:nth-child(' + hotIndex + ')').hide();
		$('td.calloutappsubmit').show();
		setTableClass();
	});
	
	if($('table').hasClass('browse-table')) {
		Cof.Browse();
	}
};

Cof.Browse = function () {
	"use strict";
	
	// Reset
	$('table.browse-table div.compareCheckbox input:checkbox').removeAttr('checked').removeAttr('disabled').next('label').removeClass('disabled-label');
	$('#compareInfoTip').remove();
	
	//Fix for credit levels
	$('table.browse-table tbody tr').each(function() {
		$(this).find('.extra-credit').remove();
		var creditLevelTxt = $(this).find('td.credit-level .linkSelectCreditLevel').text();
		$(this).find('td.first b').after("<span class=\"extra-credit\">For those with <strong>" + creditLevelTxt + "</strong></span>");
	});
	
	// Variables
	Cof.Browse.prodCount = $('.compare-checkbox:checked').length;
	
	Cof.Browse.compareButtonEnabled = '<a class="compare-submit" href="#" id="cmp_button_bottom"><img src="/assets/rwd/img/btn/info-body-compare.gif" align="absmiddle" alt="Compare Button" /></a>';
	Cof.Browse.compareButtonDisabled = '<img src="/assets/rwd/img/btn/disabled-body-compare.gif" align="absmiddle" alt="Compare Button (disabled)" />';

	Cof.Browse.jq_infoTip = $('body').append('<div id="compareInfoTip" class="none"></div>').find("#compareInfoTip").eq(0);
	Cof.Browse.jq_infoTip.append('<div class="compareState nothingSelected">Check the box next to each product you want to compare.</div>');
	Cof.Browse.jq_infoTip.append('<div class="compareState oneSelected">You can compare up to 3 products. <br/>(Please select at least one more to compare.)</div>');
	Cof.Browse.jq_infoTip.append('<div class="compareState multiSelected">When you\'re ready, click the <span class="buttonName">Compare</span> button. <br/>(<span class="numChecked">'+ Cof.Browse.prodCount +'</span> currently checked, maximum of 3.)</div>');
	Cof.Browse.jq_infoTip.append('<div class="compareState maxSelected">You\'ve selected the maximum of 3 cards.</div>');

	// Functions
	Cof.Browse.setCompareQuery = function() {
		Cof.Browse.setCompareBtnState();
		Cof.Browse.setLabels();
		if (Cof.Browse.prodCount > 1) {
			Cof.Browse.selectedProducts = $('.compare-checkbox:checked').map(function(){
				return $(this).attr('id');
			}).get().join("~");

			var compareTargetPage = typeof(compareTargetPage) == 'undefined' ? '/compare' : compareTargetPage;
			compareTargetPage = $('#browseHref').attr('href');
			Cof.Browse.targetPage = compareTargetPage +'&pid=' + Cof.Browse.selectedProducts + '&fbtoc=true';				
			$('.compare-submit').attr('href', Cof.Browse.targetPage);
			$('.compareNowLink').attr('href', Cof.Browse.targetPage);
		}
	}
	Cof.Browse.setTooltipState = function() {
		if (Cof.Browse.prodCount === 0) {
			$('div.compareState').removeClass('compareStateOn');
			$('div.compareState:eq(0)').show().addClass('compareStateOn');
			$('div.compareState:not(:eq(0))').hide();
		} else if (Cof.Browse.prodCount === 1) {
			$('div.compareState').removeClass('compareStateOn');
			$('div.compareState:eq(1)').show().addClass('compareStateOn');
			$('div.compareState:not(:eq(1))').hide();
		} else if (Cof.Browse.prodCount === 3) {
			$('div.compareState').removeClass('compareStateOn');
			$('div.compareState:eq(3)').show().addClass('compareStateOn');
			$('div.compareState:not(:eq(3))').hide();
		} else {
			$('div.compareState').removeClass('compareStateOn');
			$('div.compareState:eq(2)').show().addClass('compareStateOn');
			$('div.compareState:not(:eq(2))').hide();
			$('div.multiSelected span.numChecked').html(Cof.Browse.prodCount);
		}
	}
	Cof.Browse.setCompareCheckboxState = function() {
		if (Cof.Browse.prodCount > 2) {
			$('.compare-checkbox:not(:checked)').attr('disabled','disabled').next().addClass('disabled');
		} else {
			$('.compare-checkbox').removeAttr('disabled').next().removeClass('disabled');
		}
	}
	Cof.Browse.setCompareBtnState = function() { 
		switch(Cof.Browse.prodCount) {
			case 3:
				$('.compare-btn').html(Cof.Browse.compareButtonEnabled);
				break;
			case 2:
				$('.compare-btn').html(Cof.Browse.compareButtonEnabled); 
				break;
			case 1:
				$('.compare-btn').html(Cof.Browse.compareButtonDisabled);  
				break;
			default:
		}
	}
	Cof.Browse.setLabels = function() {
		$('.compare-checkbox').next('label').text('Compare');
		if (Cof.Browse.prodCount > 1) {
			$('.compare-checkbox:checked').next('label').html('<a class="compareNowLink" href="#">Compare Now</a>');   
		}
	}
     
	// Init
	Cof.Browse.setCompareQuery();
	Cof.Browse.setTooltipState();
	Cof.Browse.setCompareCheckboxState();
	
	if (typeof cardFilter !== 'undefined') {
		Cof.Browse.Filter();
	}
	
	// Events
	$('.compare-checkbox').on("change", function(){
		Cof.Browse.prodCount = $('.compare-checkbox:checked').length;
		Cof.Browse.setCompareQuery();
		Cof.Browse.setTooltipState();
		Cof.Browse.setCompareCheckboxState();
	});
	$('div.cb-compare').attr('data-id', '#compareInfoTip').cluetip({
		cluetipClass:	'tooltip-rounded', 
		attribute:		'data-id', 
		dropShadow:		false, 
		local:			true, 
		sticky:			false, 
		mouseOutClose:	true, 
		width:			300, 
		arrows:			false, 
		cursor:			'pointer', 
		showTitle:		false, 
		tracking:		true
	});
};

Cof.Browse.Filter = function() {
	"use strict";
	
	// Variables
	//Cof.Browse.Filter.buttonEnabled = false;
	Cof.Browse.Filter.showNumber = $(".browse-table tbody tr:visible").length;
	Cof.Browse.Filter.totalProds = $(".browse-table tbody tr").length;
	Cof.Browse.Filter.showOption = " ";
	Cof.Browse.Filter.showPop = " ";
	Cof.Browse.Filter.spCard = " cards";
	
	// Functions
	Cof.Browse.Filter.showAll = function() {
		$(".browse-table tbody tr").removeAttr('style');
	}
	Cof.Browse.Filter.enableAll = function() {
		$(".browse-filter input:disabled").removeAttr("disabled").next().removeClass("disabled");
	}
	Cof.Browse.Filter.showCheckedBoxes = function() {
		$(".card-type input:checked").each(function() {
			Cof.Browse.Filter.inputVal = $(this).val();
			$('.browse-table tbody tr:visible').each(function() {				
				if(!$(this).hasClass(Cof.Browse.Filter.inputVal)) {
					$(this).hide();
				}
			});
		});
	}
	Cof.Browse.Filter.showCheckedRadios = function() {
		$(".card-levels input:checked").each(function() {
			Cof.Browse.Filter.inputVal = $(this).val();
			$(".browse-table tbody tr:visible").each(function() {
				if(!$(this).hasClass(Cof.Browse.Filter.inputVal)) {
					$(this).hide();
				}
			});
		});
	}
	Cof.Browse.Filter.disableUnavailableCheckboxes = function() {
		$(".card-type input").each(function(){
			Cof.Browse.Filter.availableCount = 0;
			Cof.Browse.Filter.inputVal = $(this).val();
			$('.browse-table tbody tr').each(function(){
				if($(this).css('display') !== 'none'){
					if($(this).hasClass(Cof.Browse.Filter.inputVal)) { Cof.Browse.Filter.availableCount++; }
				}
			});
			if (Cof.Browse.Filter.availableCount === 0) {
				$(this).attr("disabled","disabled").next().addClass("disabled");
			} else {
				$(this).removeAttr("disabled").next().removeClass("disabled");
			}
		});
	}		
	Cof.Browse.Filter.disableUnavailableRadios = function() {
		Cof.Browse.Filter.excellent = 0, Cof.Browse.Filter.average = 0, Cof.Browse.Filter.rebuilding = 0;
		$(".browse-table tbody tr").each(function() {
			if($(this).css('display') != 'none') {
				if($(this).hasClass('excellent')) {
					Cof.Browse.Filter.excellent++;
				} else if ($(this).hasClass('average')) {
					Cof.Browse.Filter.average++;
				} else if ($(this).hasClass('rebuilding')) {
					Cof.Browse.Filter.rebuilding++;
				}
			}
		});
		if(Cof.Browse.Filter.excellent === 0) {
			$('#rb-excellent').attr("disabled", "disabled").next().addClass("disabled");
		}
		if(Cof.Browse.Filter.average === 0) {
			$('#rb-average').attr("disabled", "disabled").next().addClass("disabled");
		}
		if(Cof.Browse.Filter.rebuilding === 0) {
			$('#rb-rebuilding').attr("disabled", "disabled").next().addClass("disabled");
		}
	}
	Cof.Browse.Filter.showCards = function() {
		Cof.Browse.Filter.showNumber = 0;
		$(".browse-table tbody tr").each(function() {
			if($(this).css('display') !== 'none') {
				Cof.Browse.Filter.showNumber++;	
			}
		});
		if (Cof.Browse.Filter.showNumber > 1) { 
			Cof.Browse.Filter.spCard = " Cards "; 
		} else { 
			Cof.Browse.Filter.spCard = " Card ";
		}
		if (Cof.Browse.Filter.showNumber > 5) {
			$('#backToTop').show();
		} else {
			$('#backToTop').hide();
		}
	}
	Cof.Browse.Filter.getStatus = function() {
		// Determine credit level, assign text to be displayed in the filters summary
		if ($("#rb-excellent").attr("checked") !== "checked" && $("#rb-average").attr("checked") !== "checked" && $("#rb-rebuilding").attr("checked") !== "checked") {
			Cof.Browse.Filter.showLevel = " for All Credit Levels";
		} else if ($("#rb-excellent").attr("checked") === "checked"){
			Cof.Browse.Filter.showLevel = " for people with <em>Excellent Credit</em>";
		} else if ($("#rb-average").attr("checked") === "checked"){
			Cof.Browse.Filter.showLevel = " for people with <em>Average Credit</em>";
		} else if ($("#rb-rebuilding").attr("checked") === "checked"){
			Cof.Browse.Filter.showLevel = " for people <em>Rebuilding Credit</em>";
		}

		// Determine card option, assign text to be displayed in the filters summary
		if ($("#cb-rewards").attr("checked") !== "checked" && $("#cb-rate").attr("checked") !== "checked" && $("#cb-secured").attr("checked") !== "checked") {
			Cof.Browse.Filter.showOption = "";
		} else if ($("#cb-rewards").attr("checked") === "checked"){
			Cof.Browse.Filter.showOption = " Rewards";
		} else if ($("#cb-rate").attr("checked") === "checked"){
			Cof.Browse.Filter.showOption = " Competitive Rate";
		} else if ($("#cb-secured").attr("checked") === "checked"){
			Cof.Browse.Filter.showOption = " Secured";
		}

		// Determine popular or student, assign text to be displayed in the filters summary
		if ($("#cb-popular").attr("checked") !== "checked" && $("#cb-student").attr("checked") !== "checked") {
			Cof.Browse.Filter.showPop = "";
		} else if ($("#cb-popular").attr("checked") === "checked") {
			Cof.Browse.Filter.showPop = " Popular";
		} else if ($("#cb-student").attr("checked") === "checked") {
			Cof.Browse.Filter.showPop = " Student";
		}
		
		Cof.Browse.Filter.nowShowing = "Showing <em>" + Cof.Browse.Filter.showNumber + Cof.Browse.Filter.showPop + Cof.Browse.Filter.showOption + "</em>" + Cof.Browse.Filter.spCard + " " + Cof.Browse.Filter.showLevel;
		$("#results-status").html(Cof.Browse.Filter.nowShowing);
		
		if (Cof.Browse.Filter.showNumber === Cof.Browse.Filter.totalProds){
			$('#reset-filters').hide();
		} else {
			$('#reset-filters').show();
		}
	}
	Cof.Browse.Filter.zebra = function() {
		$(".browse-table tbody tr").removeClass("row-odd");
		Cof.Browse.Filter.rowCount = 0;
		$(".browse-table tbody tr").each(function(){
			if($(this).css('display') !== 'none') {
				Cof.Browse.Filter.rowCount++;
				if (Cof.Browse.Filter.rowCount % 2 === 0) {
					$(this).addClass("row-odd").css('outline','1px solid white');
				}
			}
		});
	}
	Cof.Browse.Filter.fadeOut = function() {
		//$('*').css('filter','inherit').css('opacity','inherit');
		/*if ($.browser.msie && parseInt($.browser.version)<7) {
			$('.browse-table').stop(1,0).fadeOut(200).delay(100);
		} else {
			$('.browse-table tbody').stop(1,0).fadeOut(200).delay(100);
		}*/
	}
	Cof.Browse.Filter.fadeIn = function() {
		/*if ($.browser.msie && parseInt($.browser.version)<7) {
			$('.browse-table').fadeIn(1000);
		} else {
			$('.browse-table tbody').fadeIn(1000);
		}*/
	}

/*					$(this).addClass("row-odd");
				}
			}
		});
	}
	Cof.Browse.Filter.fadeOut = function() {
		if ($.browser.msie && parseInt($.browser.version)<7) {
			$('.browse-table').toggle("fast");
		} else {
			$('.browse-table tbody').toggle("fast");
		}
	}
	Cof.Browse.Filter.fadeIn = function() {
		if ($.browser.msie && parseInt($.browser.version)<7) {
			$('.browse-table').toggle("medium");
		} else {
			$('.browse-table tbody').toggle("medium");
		}
	}
*/
	
	function getQueryVariable(variable) {
		var query = window.location.search.substring(1);  
		var vars = query.split("&");  
		for (var i=0;i<vars.length;i++) {    
			var pair = vars[i].split("=");    
			if (pair[0] == variable) {      
				return pair[1];    
			}  
		}
	}
	
	// Init
	$('#numOfCards').text(Cof.Browse.Filter.totalProds);
	Cof.Browse.Filter.showAll();
	Cof.Browse.Filter.enableAll();
	
	//look at query string for pre-selected inputs
	Cof.Browse.Filter.cardFilter = typeof(cardFilter) == 'undefined' ? '' : cardFilter;
	$('.card-type input').each(function(){
		if ($(this).val() === getQueryVariable('select') || $(this).val() === Cof.Browse.Filter.cardFilter){
			$(this).attr('checked','checked');	
		}
	});
	$('.card-levels input').each(function(){
  		if ($(this).val() === getQueryVariable('level') || $(this).val() === Cof.Browse.Filter.cardFilter){
			$(this).attr('checked','checked');	
		}
   	});
	
	Cof.Browse.Filter.showCheckedBoxes();
	Cof.Browse.Filter.disableUnavailableRadios();
	Cof.Browse.Filter.showCheckedRadios();
	Cof.Browse.Filter.disableUnavailableCheckboxes();
	Cof.Browse.Filter.showCards();
	Cof.Browse.Filter.getStatus();
	Cof.Browse.Filter.zebra();
	Cof.Browse.Filter.getStatus();
	
	
	// Events
	$('.browse-table tbody tr').mouseover(function() {
		$(this).addClass('hover');
	}).mouseout(function() {
		$(this).removeClass('hover');
	});
	$(".card-type input").on("click", function() {
		Cof.Browse.Filter.fadeOut();
		Cof.Browse.Filter.showAll();
		Cof.Browse.Filter.enableAll();
		Cof.Browse.Filter.showCheckedBoxes();
		Cof.Browse.Filter.disableUnavailableRadios();
		Cof.Browse.Filter.showCheckedRadios();
		Cof.Browse.Filter.disableUnavailableCheckboxes();
		Cof.Browse.Filter.showCards();
		Cof.Browse.Filter.getStatus();
		Cof.Browse.Filter.zebra();
		Cof.Browse.Filter.fadeIn();
	});
	$(".card-levels input").on("click", function() {
		Cof.Browse.Filter.fadeOut();
		Cof.Browse.Filter.showAll();
		Cof.Browse.Filter.showCheckedRadios();
		Cof.Browse.Filter.showCheckedBoxes();
		Cof.Browse.Filter.disableUnavailableCheckboxes();
		Cof.Browse.Filter.showCards();
		Cof.Browse.Filter.getStatus();
		Cof.Browse.Filter.zebra();
		Cof.Browse.Filter.fadeIn();
	});
	$("#reset-filters").on("click", function() {
		$(this).hide();
		Cof.Browse.Filter.fadeOut();
		Cof.Browse.Filter.showAll();
		Cof.Browse.Filter.enableAll();
		$(".browse-filter input:checked").removeAttr("checked");
		$(".browse-filter label").removeClass("disabled");
		$(".compare-link").parent().find('input').removeAttr("checked");
		$("#rb-all").attr("checked","checked");
		Cof.Browse.Filter.disableUnavailableCheckboxes();
		Cof.Browse.Filter.showCards();
		Cof.Browse.Filter.getStatus();
		Cof.Browse.Filter.zebra();
		Cof.Browse.Filter.fadeIn();
	});
};

Cof.Footer = function () {
	"use strict";
	
	$('li.footersubs').hoverIntent({	
		over: function () {
			if(!$(this).hasClass('sfHover')){
				$('.sfHover').removeClass('sfHover').find('ul').hide();
				$(this).addClass('sfHover').find('ul').show();
			}
		}, 
		timeout: 500, 
		out: function (){
			$(this).removeClass('sfHover').find('ul').hide();
		}
	});
	
	$('li.footersubs > a').on("keyup", function(e) {
		Cof.Footer.keyCode = e.which || e.keyCode;
		if (Cof.Footer.keyCode === 9) {
			$(this).parent().removeClass('sfHover').find('ul').hide();
			$('.expand-footersubs:visible').hide();
			$(this).parent().find('.expand-footersubs').show();
			//$(this).parent().addClass('sfHover').find('ul').show();
		}
	}).on("focus", function() {
		if(!$(this).parent().hasClass('sfHover')){
			$('li.footersubs ul').hide();	
		}
	});
	
	$('.expand-footersubs a').on("blur", function () {
		$(this).parent().hide();
	}).on("click", function () {
		$(this).parent().hide();
		$(this).parents('li').addClass('sfHover').find('ul').show().find('a:first').focus();
		return false;
	});
	
	$('a, input').on("focus", function () {
		if(!$(this).parents().hasClass('sfHover')){
			$('li.footersubs ul').hide();
		}
		if(!$(this).parents().hasClass('footersubs')){
			$('.expand-footersubs:visible').hide();
		}
	});
	
	$(document).on("click", function(e) {
		Cof.Footer.clicked = $(e.target);
		if(!Cof.Footer.clicked.parents().hasClass('sfHover')){
			$('.sfHover').removeClass('sfHover').find('ul').hide();
		}
	});
};

Cof.Flash = function() {
	"use strict";
	
	Cof.Flash.resizeW = 0;
	Cof.Flash.queryMobile = "screen and (max-width: 47.99em)"; // general mobile
	Cof.Flash.queryTablet = "screen and (min-width: 48em) and (max-width: 59.99em)";
	Cof.Flash.queryDesktop = "screen and (min-width: 60em)";
	
	Cof.Flash.adaptFlash = function(ob, width, height) {
		Cof.Flash.adaptFlash.random_tail=Math.floor(Math.random() * 9000000000000000) + 1000000000000000;
		swfobject.embedSWF(ob.src+"?oz=" + Cof.Flash.adaptFlash.random_tail, ob.atts.id, width, height, "9", "/media/interactive/expressInstall.swf", ob.flashvars, ob.params, ob.attributes);
	}
	
	Cof.Flash.setupFlash = function() {
		// Get new dimensions, fire adaptFlash
		for (var i = 0; i < Cof.swfobjects.length; i++) {
			Cof.Flash.setupFlash.thisEl = $("#" + Cof.swfobjects[i].atts.id);
			Cof.Flash.setupFlash.thisAR = (Cof.swfobjects[i].dims.width/Cof.swfobjects[i].dims.height).toFixed(2);
			Cof.Flash.setupFlash.newWidth = Cof.Flash.setupFlash.thisEl.parent().width();
			Cof.Flash.setupFlash.newHeight = (Cof.Flash.setupFlash.newWidth/Cof.Flash.setupFlash.thisAR).toFixed(1);
			Cof.Flash.adaptFlash(Cof.swfobjects[i], Cof.Flash.setupFlash.newWidth, Cof.Flash.setupFlash.newHeight);
		};
	}

	
	Cof.Flash.mobileResize = function(){
		$(window).resize(function() {
			Cof.Flash.mobileResize.checkSize = function() {
				Cof.Flash.mobileResize.checkSize.w = $(window).width();
				Cof.Flash.mobileResize.checkSize.rszSpeed = 500;
				if (Cof.Flash.mobileResize.checkSize.w !== Cof.Flash.resizeW) {
					Cof.Flash.mobileResize.checkSize.rszSpeed = 100;
					Cof.Flash.setupFlash();
				} else {
					Cof.Flash.mobileResize.checkSize.rszSpeed = 500;
				}
				Cof.Flash.resizeW = Cof.Flash.mobileResize.checkSize.w;
				setTimeout(Cof.Flash.mobileResize.checkSize, Cof.Flash.mobileResize.checkSize.rszSpeed);
			}
			Cof.Flash.mobileResize.checkSize();
		});
	}
	
	
	Cof.Flash.setupFlash();
	
	enquire.register(Cof.Flash.queryMobile, {
		match : function() {
			Cof.Flash.setupFlash();
			Cof.Flash.mobileResize();
		}
	}).register(Cof.Flash.queryTablet, {
		match : function() {
			Cof.Flash.setupFlash();
		}
	}).register(Cof.Flash.queryDesktop, {
		match : function() {
			Cof.Flash.setupFlash();
		}
	}).listen();
};

Cof.Footnotes = function () {
	"use strict";
	
	Cof.Footnotes.seen = {};
	Cof.Footnotes.footnoteCount = 0;
	// Calculate the footnote count by iterating over all unique footnote anchors.
	$('div a[href^="#footnote"]').each(function () {
		var href=$(this).attr('href');
		if (Cof.Footnotes.seen[href]) {
			return true;
		} else {
			Cof.Footnotes.seen[href] = true;
			Cof.Footnotes.footnoteCount++;
		}
	});
	// Update the footnote anchor/text with symbol(*) for single footnotes (dynamic)
	if (Cof.Footnotes.footnoteCount === 1) {
		$('.footnote').text('*');
		$('#footnotes sup[id^="footnoteSup"]').text('*');
	}
};

Cof.Init = function() {
	"use strict";
	
	// Remove 'no-js' class when JS is available
	$('html').removeClass('no-js');
	
	Cof.ScreenSize = "desktop";
	if (window.matchMedia("(min-width: 48em)").matches) {
		Cof.ScreenSize = "tablet";
	} else if (window.matchMedia("(max-width: 48em)").matches) {
		Cof.ScreenSize = "mobile";
	}
	
	Cof.Logo();
	Cof.Header();
	Cof.Global();
	Cof.Tables();
	Cof.Footnotes();
	//Cof.Footer();
	renumberSingleFootnotes();
	
	if(Cof.swfobjects.length > 0) {
		Cof.Flash();
	}
	if (typeof activated === 'undefined' || !activated) {
		if (window.activateCarousel) {
			activateCarousel();
		}
	}
	
	//Temporary
	$('.log-in-badge .log-in-badge').removeClass('log-in-badge');
	
	/*if($('form').is('#account-log-in')) {
		Cof.Login();
	}*/
};

// Runs on Document Ready ----------------------------------------------------------------------------------------------------------------- //
$(function(){
	if (typeof xp1EnabledPage !== 'undefined') {
		if (!xp1EnabledPage) {
			Cof.Init();
		}
	} else {
		Cof.Init();
	}
});

// Additional Functions ------------------------------------------------------------------------------------------------------------------- //
function validateCustomerAge() {
	"use strict";
	
	var dob = prompt("Enter the applicant's date of birth: (MM-DD-YYYY)", "");
	while (!isValidDob(dob)) {
		alert("You must enter the date of birth in the following format: MM-DD-YYYY");
		dob = prompt("Enter the applicant's date of birth: (MM-DD-YYYY)", dob);
	}
	if (dob !== null) {
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
		} else if (enteredDob !== 'Invalid Date') {
			return true;
		}
	}
	return false;
}
 
function isValidDob(dob) {
	"use strict";
	
	if (dob === null) {
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
	if (month === 2) {
		if (day === 29) {
			if (year % 4 !== 0 || year % 100 === 0 && year % 400 !== 0) {
				return false;
			}
		} else if (day > 28) {
			return false;
		}
	} else if (month === 4 || month === 6 || month  === 9 || month === 11) {
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

// Visual Sciences Tagging
function getXmlHttpRequestObject() {
	if (window.XMLHttpRequest) {
		return new XMLHttpRequest(); // Not IE	
	} else if(window.ActiveXObject) {		
		return new ActiveXObject("Microsoft.XMLHTTP"); // IE	
	} else {		
		alert("Your current browser doesn't support the XmlHttpRequest object.  Please use a modern web browser.");
	}
}

function ajaxCall(url) {
	var xmlHttpReq = getXmlHttpRequestObject();
	xmlHttpReq.onreadystatechange = function () {
		if (xmlHttpReq.readyState === 4) { }
	};
	
	var date = new Date();
	url += "&r=" + date.getTime();
	xmlHttpReq.open('GET', url, true);
	xmlHttpReq.send(null);
}

function VSPageTagging() {
	var VsPageInfo = new VsPage();
	var Pg_Tag_url = getPageTaggingParameters(VsPageInfo);
	Pg_Tag_url = "/assets/img/vs_img.gif" + Pg_Tag_url;
	ajaxCall(Pg_Tag_url);
}

// Populates the parameters to be passed for Page Tagging and returns in the form of a url.
function getPageTaggingParameters(VsPageInfo){
	var Pg_Tag_url = "?log=" + VsPageInfo.log + 
		"&System=" + VsPageInfo.system +
		"&LOB=" + VsPageInfo.lobId +
		"&TestCell=" + VsPageInfo.testCell +
		"&Segment=" + VsPageInfo.segment +
		"&Experience=" + VsPageInfo.experience +
		"&PageName=" + VsPageInfo.pageViewName +
		"&PageType=" + VsPageInfo.pageType +
		"&Layout=" + VsPageInfo.layout +
		"&EventType=page";
	
	return Pg_Tag_url;
}

// Populates the parameters to be passed for Page Tagging and returns in the form of a url.
function getComponentTaggingParameters(VsPageInfo){

	// Retrieving the Page Context.	 
	var page = bea.wlp.disc.context.Page.findByLabel(VsPageInfo.pageLabel);
	
	// Retriving the LOB name from the Page Context.
	var lob = VsPageInfo.lobId;
	
	// Retriving the Portlets Information from Page Context
	var placables = page.getPlaceables();
	
	// Retriving the page's Layout Information.	
	var temp = VsPageInfo.portlet;
	var index = temp.indexOf('_');
	var portletLocation = temp.substring(0, index);
	var portletTitle = temp.substring(index + 1);
	
	var Cmpt_Tag_url = "?log=1" +
		"&LOB=" + lob +
		"&TestCell=" + VsPageInfo.testCell +
		"&PageName=" + VsPageInfo.pageViewName +
		"&Segment=" + VsPageInfo.segment +
		"&PortletLocation=" + portletLocation +
		"&ComponentName=" + portletTitle +
		"&EventType=component";
	
	if (VsPageInfo.strategy !== 'null' && VsPageInfo.strategy !== '') {
		Cmpt_Tag_url = Cmpt_Tag_url + "&ComponentStrategy=" + VsPageInfo.strategy;
	}
	
	if (VsPageInfo.cmptTestCell !== 'null' && VsPageInfo.cmptTestCell !== '') {
		Cmpt_Tag_url = Cmpt_Tag_url + "&ComponentTestCell=" + VsPageInfo.cmptTestCell;
	}
	
	return Cmpt_Tag_url;
}

// Retrieves the link Tagging parameters from request 
function getLinkTaggingParameters(VsLinkInfo){
	var link_Tag_url;
	if (VsLinkInfo.lobId !== 'null' && VsLinkInfo.lobId !== '') {
		link_Tag_url = "&LOB=" + VsLinkInfo.lobId +
			"&Segment=" + VsLinkInfo.Segment +
			"&TestCell=" + VsLinkInfo.TestCell +
			"&PageName=" + VsLinkInfo.PageName +
			"&EventType=" + VsLinkInfo.EventType +
			"&ComponentType=" + VsLinkInfo.ComponentType +
			"&ContentElement=" + VsLinkInfo.ContentElement +
			"&TargetPageName=" + VsLinkInfo.TargetPageName;
		
		if (VsLinkInfo.PortletLocation !== 'null' && VsLinkInfo.PortletLocation !== '') {
			link_Tag_url = link_Tag_url + "&PortletLocation=" + VsLinkInfo.PortletLocation;
		}
		if (VsLinkInfo.ComponentName !== 'null' && VsLinkInfo.ComponentName !== '') {
			link_Tag_url = link_Tag_url + "&ComponentName=" + VsLinkInfo.ComponentName;
		}
		if (VsLinkInfo.ComponentStrategy !== 'null' && VsLinkInfo.ComponentStrategy !== '') {
			link_Tag_url = link_Tag_url + "&ComponentStrategy=" + VsLinkInfo.ComponentStrategy;
		}
		if (VsLinkInfo.ComponentTestCell !== 'null' && VsLinkInfo.ComponentTestCell !== '') {
			link_Tag_url = link_Tag_url + "&ComponentTestCell=" + VsLinkInfo.ComponentTestCell;
		}
		if (VsLinkInfo.TargetLOB !== 'null' && VsLinkInfo.TargetLOB !== '') {
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
			} else { }
		}
	};
	xmlHttpReq.open('GET', Pg_Tag_url, true);
	xmlHttpReq.send(null);
}

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

// force is true if login from hp
function primaryNavLogin(force) {
	if(force){
		greyOut();
	} else if((window.location.href.indexOf("login=true")  >  - 1) && (document.referrer.indexOf("login=true") == -1)){
		greyOut();
	}
}

function greyOut() {
	//start fix for IE7 bug
	$('#whiteout').appendTo($('#log-in-badge').parent()).show();
	$('#whiteout').appendTo($('#section-3-bll').parent()).show();
	$('.header').attr('style','z-index:-1 !important');
	//end IE

	$('#whiteout').show();
	$('#section-2').addClass("primaryNavLoginZindex");
	$('#log-in-badge').addClass("primaryNavLoginZindex");
	$('.user-id input:visible').focus();
	$('#oo_tab').addClass('tab-whiteout');

	$('#whiteout').click(function() {
		$(this).hide();
		$('.header').removeAttr('style');
		$('#section-2').removeClass("primaryNavLoginZindex");
		$('#log-in-badge').removeClass("primaryNavLoginZindex");
		$('#oo_tab').removeClass('tab-whiteout');
	});

	$('body').keydown(function(w) {
		if(w.keyCode  == 27) {
			$('#whiteout').hide();
			$('.header').removeAttr('style');
			$('#section-2').removeClass("primaryNavLoginZindex");
			$('#log-in-badge').removeClass("primaryNavLoginZindex");
			$('#oo_tab').removeClass('tab-whiteout');
			return false;
		}
	});
}
function capitalOne360PopUp(url){	
	if(url.indexOf("http://") != -1 || url.indexOf("https://") != -1 ) {
		window.open(url)
	} else {
		//Incorrect url pattern or property file fail to load www.capitalone360.bank.redirect.url
		var port = document.location.port;
		if (port != null) {
			window.open("http://"+window.location.hostname+":" + port +"/misc/error/404.html")
		} else {
			window.open("http://"+window.location.hostname+"/misc/error/404.html")
		}
	}
}
$.fn.stars = function() {
	return $(this).each(function() {
		var val = parseFloat($(this).text());
		// Make sure that the value is in 0 - 5 range, multiply to get width
		var size = Math.max(0, (Math.min(5, val))) * 16;
		// Create stars holder
		var $spanText = Math.round(val*10)/10 + " stars out of 5";
		var $span = $('<span />').width(size).text($spanText);
		// Replace the numerical value with stars
		$(this).html($span);
	});
}
