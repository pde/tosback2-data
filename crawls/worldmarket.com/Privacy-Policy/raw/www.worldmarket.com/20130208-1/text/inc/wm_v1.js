/// ** add messaging when on eGift Cert page and coming back from personalization ** ////

jQuery(function() {
	if (location.pathname=="/product/gift-certificate.do" && location.search.indexOf('fromPage=personalization')>0) {
		setTimeout(function () {showGlobalBasket();}, 1000);
	}
});

///** pinterest image for content itmes **///



jQuery( function () {
			
	var o = jQuery('.imageforpin');
	if (o.size()==0) return;
	var img = document.location.protocol+"//"+document.location.hostname+o.attr('src');
	var desc = jQuery('div.hero-header h1').html().trim() + " | Cost Plus World Market";
	var url = document.location.href.replace(/(\?|#).*/, '');
	var button = jQuery('li.cpwm_pinit a');
	var pinteresturl = "http://pinterest.com/pin/create/button/?url="+escape(url)+"&media="+escape(img)+"&description="+escape(desc)

		button.click(function () {
			_gaq.push(['_trackSocial', 'pinterest', 'pin it', 'pinned']); 
			w=window.open(pinteresturl, 'signin', 'height=300,width=665');
			return false;
		});


	var pinterest = document.createElement('script');
		pinterest.type= 'text/javascript';
		pinterest.src= 'http://assets.pinterest.com/js/pinit.js';
	document.getElementsByTagName('head')[0].appendChild(pinterest);
});



// create openDialog if not exists


var openDialogInfo = openDialogInfo  || function (contentDiv,title){
			
			jQuery('#dialogContent').html(jQuery('#' + contentDiv).html());
			jQuery('#dialogContainer .popHeader').html(title);
			
			var dialogBox = jQuery('#dialogContainer > .modalDialogBox');
			
			dialogBox.css('left',(jQuery(window).width()-dialogBox.outerWidth())/ 2 + 'px');
			dialogBox.css('top',(jQuery(window).height()-dialogBox.outerHeight())/ 2 + 'px');
			
			jQuery.blockUI({message:"",overlayCSS:{backgroundColor:'#fff',cursor:'default'},css:{border:'0px',padding:'10px',boxShadow:'0 0 10px #999'}});
			
			jQuery('#dialogContainer').dialog({
			  autoOpen: false,
			  closeOnEscape:true,
			  modal:false,
			  width:'500',
			  height:'400',
			  dialogClass:'modalDialogBox',
			  beforeClose: function(event,ui){jQuery.unblockUI();}
			});		
			jQuery('#dialogContainer').dialog('open');
			jQuery('#dialogContainer .popContainer').css('height','315px');
		}


jQuery(function() {
	jQuery('.subscribePopup').insertAfter(jQuery('.wrapper'));
	jQuery('.emailSignup').html('Get the latest scoop! Deals, steals &amp; more!<br>');
	jQuery('#emailSignField2').appendTo(jQuery('.emailSignup'));
	var inputEmail = jQuery('input[name="subscribeFooter"]');
	var default_value = jQuery('#subscribeFooter').val();
    	inputEmail.focus(function() {
        	if(inputEmail.val() == default_value) inputEmail.val("");
    	}).blur(function(){
        	if(inputEmail.val().length == 0) inputEmail.val(default_value);
    	});


	var showPop = function() {
		jQuery('#iframe-s').attr("src", "http://worldmarketcorp.us/emailsignup_pop/?email="+inputEmail.val());
		jQuery('.subscribePopup').delay(500).fadeIn();
		if (jQuery('#subscribeFooter').val() == 'Enter Email') {
			jQuery('.subscribePopupForm p:first').html('Please enter your email address and zip code')
		}
		else {
			var emailValue = jQuery('#subscribeFooter').val();
			jQuery('#email-s').val(emailValue);
			jQuery('.subscribePopupForm p:first').html('Please confirm email address, and add zip code.')
		}
	}

	jQuery('form#emailSignField2').submit(function(){
		showPop();
               return false;	
	});
	jQuery('div.emailSignUpBtn, .utility li a[href="/category/email-signup.do"]').click(function(){
		showPop();
               return false;	
	});

	
	jQuery('.subscribePopupForm .close, .success-result-shopnow').click(function(){
		jQuery('.subscribePopup').hide();
	});
});



jQuery(document).keyup(function(e) {
  	if (e.keyCode == 27) {
		jQuery('.subscribePopup').hide();
	}   // esc
});


function cpwm_checkoutStepVisible(nameOfStep) {
	window.optimizely = window.optimizely || [];
	window.optimizely.push(["activate"]);
}

// override ml funciton processQVE 
// 
// modified version
	// fix var deinition error
	// handle case where multiple div#productCode exist (example URL: /content/victorian-isles-catalog.do)
	// add callback


function processQVE(classId, callback){
	var customQVEArray = new Array(); // was not set as a local var an caused problems with multiple instantiations
	
	// Preparing the list of div with thumbnail data
	jQuery(classId).each(function(){
		var obj = jQuery(this);
		if (obj.find("div.thumbcontainer").size()>0) {
			return;
		};
		
		var showPQV = (obj.attr('qv')=="false")?false:true;
		var showRating = (obj.attr('rating')=="false")?false:true;
		var showBadge = (obj.attr('badging')=="false")?false:true;
		var itemCode = obj.attr('id');
		if(itemCode != ''){
			customQVEArray.push(new CustomQVEObj(showPQV,showRating,showBadge,itemCode));
		}
		else{
			window.console.log('Div with class getThumb should have id as categoryItem code');
		}
	});
	
	if(customQVEArray.length > 0){
	
		var data = JSON.stringify(customQVEArray);
		
		// Sending the Ajax call to get the data of content thumbnails of entrire page at once
		jQuery.ajax({
			type: "GET",
			url: "/wmcustomthumbnail.do?mobile=false&",
			data: {"data":data},
			async: true,
			success: function(responseHTML){

				// Iterating the list of empty content thumnbnail objects
				while(customQVEArray.length > 0){
					var customQVEObject = customQVEArray.pop();
					console.log("processing "+"div#" + customQVEObject.itemCode)
// because we can have the same thumb 2 or more times on page
//					var container = jQuery("div#" + customQVEObject.itemCode);
					var container = jQuery('div[id='+customQVEObject.itemCode+']')

					// Puting the HTML of content thumbnails from response 
					container.html(jQuery(responseHTML).find("div#" + customQVEObject.itemCode).html());
					
					var thumbs = jQuery('div[id='+customQVEObject.itemCode+']' + " .qveThumbnail");

					if(container.html().trim().length > 0){

						if(customQVEObject.showPQV){
							thumbs.unbind("mouseenter").bind("mouseenter", function(){
								var obj = jQuery(this);
								jQuery.fn.qve("attachButton", this, obj.attr("dialogTitle"), obj.attr("catPK"), obj.attr("buttonOn"), obj.attr("buttonOff"), obj.attr("url"), obj.attr("windowWidth"), obj.attr("windowHeight"),(obj.attr("showInCenter")!=null));
							});
							thumbs.unbind("mouseleave").bind("mouseleave", function(){
								jQuery.fn.qve("detachButton", this);
							});
						}						
					}else{
						console.log("no content for "+customQVEObject.itemCode)
						container.css('display','none');
					}
				}

//					if(!container.hasClass('getThumb')){
						container.addClass('getThumb');
//					}	

				// now remove any price sections where we show $0.00 - these are families (or some other issue)
				jQuery("div.thumbPrices:contains('$0.00')").remove()



				switchToMobile();
				if (typeof(callback)==="function") {
					callback();
				}
			},
			error: function(e){
			}
		});
	
	}
}
/// end override ML function


jQuery(function() {
//// this is for content pages to load featured product thumbs later (instead of ML approach right away)
//// this is so main page loads first and we avoid blocking image requests

	/// define fctn here to be used in while loop below
	var getThumbs = function (bl) {

		//we just set timeout everytime we are called
		var delay = 5000;
		setTimeout(function () {
				// the processQVE function needs a STRING
				console.log("kicking off featuder QVEs: "+"#"+"batch-"+ bl)
				processQVE("#"+"batch-"+ bl+" div.fp-thumb");
			// use initial delay, plus one half second for each additional batch
			}, delay+bl*500);
	}

	// kick off featuder loading - delay until (hopefully after thumbs/pluses
	jQuery("div.featuder-products div.products").each(function() { // for each such section
	// ok this is messy: until the fix is in to use AJAX POST (currently GET)
	// we need to batch the featuder products so the URL remains short
		var container = jQuery(this); // 
		var thumbs = container.find('div.fp-thumb'); // thumbs to retrieve
		var b = 20; // batchsize - could change this
		var batches = []; // collection of batches of thumbs we will process
		while (thumbs.size()>0) { // as long as we have thumbs to process
			// cut off the first "b" thumbs and make a batch
			batches.push(thumbs.splice(0,b)); 
			var bl = batches.length;
			// now for each batch, create a div, and stick the batched thumbs in here.
			jQuery('<div/>', {id: "batch-"+ bl}).appendTo(container).append(batches[bl-1]);
			// now call getThumb for every batch
			getThumbs(bl);
		}
	});

});


/* need to put this into a CPWM namespace object */
/* get URL query arg values */
function getQueryArgs(s) {p={}; window.location.search.replace(/([^?=&]+)(=([^=&]+))?/g, function (m,key,hasVal,val){p[key] = p[key] ? p[key] : []; p[key].push(val) });return s?p[s]: p;}
/* check for console (IE) from twitter */
if (!window.console) {
    (function() {
      var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml","group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];
      window.console = {};
      for (var i = 0; i < names.length; ++i) {window.console[names[i]] = function() {};}
    }());
}
/* make a timestamp */
	var D= new Date();
	var ts = D.getTime();
	var lts = D.getFullYear();
	var uts = D.getUTCFullYear();
	var dp=["Month","Date","Hours","Minutes","Seconds"];
	while (dp.length) {
		var dpp = dp.shift();
		var monthoffset = ((dpp=="Month")?1:0);
		/* sad way of zero padding */	
		lts += ("0"+(monthoffset+eval('D.get'+dpp+'()'))).replace(/^.*(.{2}$)/,"$1");
		uts += ("0"+(monthoffset+eval('D.getUTC'+dpp+'()'))).replace(/^.*(.{2}$)/,"$1");
	}

function usi_no_creative() {/* dummy*/}

// Optimizely SiteCatalyst Integration 
window.optimizely = window.optimizely || []; window.optimizely.push("sc_activate") 

window.optimizely = window.optimizely || [];
if (location.pathname=="/checkout/thankyou.do" || location.pathname=="/checkout/accountsetup.do" && typeof ml_order==="object") {
	window.optimizely.push(['trackEvent', "Transaction", 100*parseFloat(ml_order.total)]);
}
jQuery("form[name='addToBasketForm']").submit(function () {
	window.optimizely.push(['trackEvent', "Add_to_Cart"]);
});


function inspirations_init_isotope () {
	// we're being called on DOMloaded

	// cache the lookups
	var $container = jQuery('#inspiration');
	var imgs = jQuery('#inspiration .block img');

	// only if I find the container, tile images, and if isotope is loaded
	if ($container.length>0 && imgs.length>0 && jQuery.fn && jQuery.fn.isotope) {

		var $filterlinks = jQuery('#filters a');
		var tiles = jQuery('#inspiration .block');
		var lastImg = jQuery(imgs[imgs.length-1]);
		var start = new Date().getTime();
		

		var hashvalue = "";

		tiles.each(function (i,o) {
			if (i>0) jQuery(o).css({minHeight: "280px"})
			if (i<19) jQuery(o).addClass('top20Cat');
		});

		var checkHash = function () {
			var h ="*";
			if (m=location.hash.match(/#(entertain|trends|tips|video|look)/)) {
	       	       h = "."+m[1]+"Cat";
			} else {
				if (location.hash !== "#all") h = ".top20Cat";
			}
			if (h===hashvalue) return; // nothing to do - end here
			hashvalue = h;
			runFilter(hashvalue);
		}


		var runFilter = function (selector) {
			$container.isotope({filter: selector});
			jQuery('#inspiration ul#filters li a').css("fontWeight", "normal");
			jQuery('#inspiration ul#filters li a:[data-filter="'+selector+'"]').css("fontWeight", "bold");
			hashvalue=selector;
			location.hash = selector.replace(/\*/,'all').replace(/\.(.*)Cat/,"$1");
		}


		// create a function that can call itself without littering global namespace
		var checkImgLoaded = function () {

			if(lastImg.readyState === 4 || lastImg.attr('complete') || start+2000<new Date().getTime()) {
				// call the hash in case we're supposed to start with a subset
				$container.css("visibility", "visible");
				checkHash();
				// call the checker function that will hash every 1 sec 
				setInterval(function () {checkHash()}, 1000);
			} else {
				setTimeout(checkImgLoaded, 500);
			}
		}
		
		// define the tiles
		$container.isotope({
			itemSelector : '.block'		
		});

		// hide them all
              $container.isotope({filter: "-"}); 

		
		// set filter onlick handlers
		$filterlinks.click(function () {
			var selector = jQuery(this).attr('data-filter');
			runFilter(selector);
			return false;
		});

		tiles.mouseover(function(){ jQuery(this).addClass("hover") }); 
		tiles.mouseout(function(){ jQuery(this).removeClass("hover") })

		$filterlinks.each(
			function () {
				this.href="#"+jQuery(this).attr("data-filter").replace(/\.(.*)Cat/, "$1");
			}
		);

		// call the checker function that will call itself every 1/4 sec until we're loaded
		checkImgLoaded();

	}
}



jQuery(function() {

	jQuery('.contentslot').each(function(){
    	var item_width = jQuery(this).find('.cmsslot').width();
	var item_height = jQuery(this).find('.cmsslot').height();
		jQuery(this).find('.hoverslot')
			.css( "left", item_width/2 - jQuery(this).find('.hoverslot').width()/2)
			.css( "top", item_height/2 - jQuery(this).find('.hoverslot').height()/2);

		/*jQuery(this).find('a').hover(
			function () {
				jQuery(this).find('.hoverslot').css('opacity', 1).stop().fadeIn('fast');
			},
			function () {
				jQuery(this).find('.hoverslot').stop().fadeOut('fast');
			}
		*/
		jQuery(this).find('.hoverstatic')
			.css( "left", item_width/2 - jQuery(this).find('.hoverstatic').width()/2)
			.css( "top", item_height/2 - jQuery(this).find('.hoverstatic').height()/2);
		jQuery('.cmsslot').addClass('mlfsimg');
	});
	/*Pinterest button for content pages*/
	jQuery('.hero-header .social ul').append(jQuery('.pinterest-button li'));
	jQuery('.pinterest-button').remove();
	

	

});




/*jshint eqnull:true */
/*!
 * jQuery Cookie Plugin v1.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
(function( $, d ){  
	var pluses = /\+/g;
	function raw(s) {
		return s;
	}
	function decoded(s) {
		return decodeURIComponent(s.replace(pluses, ' '));
	}

	$.cookie = function(key, value, options) {

		// key and at least value given, set cookie...
		if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value == null)) {
			options = $.extend({}, $.cookie.defaults, options);

			if (value == null) {
				options.expires = -1;
			}
			if (typeof options.expires === 'number') {
				var days = options.expires, t = new Date();
				t.setDate(t.getDate() + days);
				options.expires = t;
			}
			value = String(value);

			var cookie = [
				encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join('');
			return (document.cookie = cookie);
		}

		// key and possibly options given, get cookie...
		options = value || $.cookie.defaults || {};
		var decode = options.raw ? raw : decoded;
		var cookies = document.cookie.split('; ');
		for (var i = 0, parts; (parts = cookies[i] && cookies[i].split('=')); i++) {
			if (decode(parts.shift()) === key) {
				return decode(parts.join('='));
			}
		}
		return null;
	};

	$.cookie.defaults = {};

})(jQuery,document); 

(function( $ ){

  $.fn.swEcatVm = function(customOptions) {
		var options = $.extend({}, $.fn.swEcatVm.defaultOptions, customOptions);

		var animated = false;
		$(this).find('ul li:first').show();
		$(options.slidePrev).hide();
		var current = $(this).find('ul li:first');
                var imagesCount = $(this).find('ul li').length;
		var imagesBlock = $(this);
                var prevFlag = 0;

		// -------------- Rotating to the right -----------------------

		$(options.slideNext).click(function(){
			if(animated) return false;
			animated = true;
			$(this).blur();

			current.fadeOut();
  			if(current.index() == imagesCount-1)
       				imagesBlock.find('ul li:first').fadeIn("normal", function() { animated = false; current = imagesBlock.find('ul li:first'); prevFlag = 1; } );
 			else
			{
				$(options.slidePrev).show();
       				current.next().fadeIn("normal", function() { animated = false; current = current.next(); } );
			}
  			return false;
		});

		// -------------- Rotating to the left -----------------------

		$(options.slidePrev).click(function(){
			if(animated) return false;
			animated = true;
			$(this).blur();
			
			current.fadeOut();
  			if(current.index() == 0)
       				imagesBlock.find('ul li:last').fadeIn("normal", function() { animated = false; current = imagesBlock.find('ul li:last'); } );
 			else
			{
				if(current.prev().index() == 0 && prevFlag == 0)
					$(options.slidePrev).hide();
       				current.prev().fadeIn("normal", function() { animated = false; current = current.prev(); } );
			}
  			return false;
		});
  };

  $.fn.swEcatVm.defaultOptions = {}
})( jQuery, document );



(function( $ ){

  $.fn.swSliderVm = function(customOptions) {
	var options = $.extend({}, $.fn.swSliderVm.defaultOptions, customOptions);
	var is_clicked = 1;
	if($(options.sliderImages).children('li').length > 1)
	{
		// -------------- установка точек переключения ------------
		if(options.showDots)
		{
			$(options.sliderImages).find('li').each(function(){
				$(options.sliderDots).append('<li><a href="#"></a></li>');
			});
			$(options.sliderDots).find('li:first a').addClass('active');
		}

		// -------------- задание id всем картинкам слайдера --------------

		var imagesCounter = 1;
		$(options.sliderImages).find('li').each(function(){
			$(this).attr('id', 'swSliderImage-'+imagesCounter++);
		});

		// --------------- инициализация данных	------------------
		
		var curImage = 1;
		var animated = false;
		var imageWidth = $(options.sliderImages).find('li').width();
		var imagesCount = $(options.sliderImages).find('li').length;

		// -------------- прокрутка вправо -----------------------

		$(options.slideNext).click(function(event, is_dot){
		if (typeof doSlide != "undefined" && is_clicked == 1) clearInterval(doSlide); else is_clicked = 1;
			if (animated) return false;
			animated = true;
			$(this).blur();
			curImage = $(options.sliderImages).find('li:first').next().attr('id').substring(14);
			changePoint();
			$(options.sliderImages).animate({"margin-left": "-=" + imageWidth}, options.animateDuration, options.sliderEffect, function (){ 
				$(options.sliderImages).find('li:first').appendTo($(options.sliderImages));
				$(options.sliderImages).css("margin-left", "0px");
				animated = false; 
				if(is_dot !== undefined)
				{
					moveImages();
				}
			});
			return false;
		});
		
		// --------------- прокрутка влево --------------------------------

		$(options.slidePrev).click(function(event, is_dot){
			if (typeof doSlide != "undefined" && is_clicked == 1) clearInterval(doSlide);
			if (animated) return false;
			animated = true;
			$(this).blur();
			if($('#swSliderImage-'+curImage).prev('li').length == 0)
			{
				$(options.sliderImages).find('li:last').prependTo($(options.sliderImages));
				$(options.sliderImages).css("margin-left", "-" + imageWidth + "px");
			}
			curImage = $(options.sliderImages).find('li:first').attr('id').substring(14);
			changePoint();
			$(options.sliderImages).animate({"margin-left": "+=" + imageWidth}, options.animateDuration, options.sliderEffect, function (){ 
				animated = false; 
				if(is_dot !== undefined)
				{
					moveImages();
				}
			});
			return false;
		});

		// -------------- изменение активной точки -----------------------
		
		var changePoint = function()
		{
			$(options.sliderDots).find('a').removeClass('active');
			var activePoint = $(options.sliderDots).find('li:eq('+(curImage-1)+')').find('a').addClass('active');
		}

		// ------------- переключение изображений по точкам -------------------

		$(options.sliderDots).find('li a').click(function(){
			$(this).blur();
			var curDotIndex = $(options.sliderDots).find('li a.active').parent().index();
			var selDotIndex = $(this).parent().index();
			if(selDotIndex > curDotIndex)
			{
				$('#swSliderImage-'+(selDotIndex+1)).insertAfter($(options.sliderImages).find('li:first'));
				$(options.slideNext).trigger('click', 1);
			}
			if(selDotIndex < curDotIndex)
			{
				$('#swSliderImage-'+(selDotIndex+1)).insertBefore($(options.sliderImages).find('li:first'));
				$(options.sliderImages).css("margin-left", "-" + imageWidth + "px");
				$(options.slidePrev).trigger('click', 1);
			}		
			return false;
		});

		var moveImages = function()
		{
			var counter = curImage;		
			while(counter <= imagesCount) $('#swSliderImage-'+counter++).appendTo($(options.sliderImages));
			var counter = 1;
			while(counter < curImage) $('#swSliderImage-'+counter++).appendTo($(options.sliderImages));
		}

		// -------------- автоматическая прокрутка слайда -----------------

		if(options.autoplay != "off")
		{
			var doSlideCounter = 0;
			var doSlide = setInterval(function(){
				is_clicked = 0;
				$(options.slideNext).trigger('click');
				if(options.autoplay == "once")
				{
					doSlideCounter++;
					if(doSlideCounter == $(options.sliderImages).find('li').length) clearInterval(doSlide);
				}
			}, options.autoplayDelay);
		}
	}
	else
	{
		$(options.slideNext).hide();
		$(options.slidePrev).hide();
	}
  };

  $.fn.swSliderVm.defaultOptions = {
        'sliderEffect': 'linear',
	'showDots': true,
	'animateDuration': 500,
        'autoplay': 'on',
        'autoplayDelay': 2000
  }
})(jQuery,document);


(function( $ ){

  $.fn.getThumbDelayed = function () {

	return this.each(function() {
	
		var obj = $(this);
		var showPQV = obj.attr('qv') == ''?false:true;
		var showRating = obj.attr('rating') == ''?false:true;
		var showBadge = obj.attr('badging') == ''?false:true;
		var itemCode = obj.attr('id');
console.log("/wmcustomthumbnail.do?itemCode=" + itemCode + "&showBadge=" + showBadge + "&showPQV="+ showPQV + "&showRating=" +showRating)

		if(itemCode != ''){
		obj.load("/wmcustomthumbnail.do?itemCode=" + itemCode + "&showBadge=" + showBadge + "&showPQV="+ showPQV + "&showRating=" +showRating,function(){
			var container = $(this);
			if(container.html().length > 0){
				$("div#" + itemCode + " .qveThumbnail").unbind("mouseenter").bind("mouseenter", function(){
					var obj = $(this);
					$.fn.qve("attachButton", this, obj.attr("dialogTitle"), obj.attr("catPK"), obj.attr("buttonOn"), obj.attr("buttonOff"), obj.attr("url"), obj.attr("windowWidth"), obj.attr("windowHeight"),(obj.attr("showInCenter")!=null));
				});
				$("div#" + itemCode + " .qveThumbnail").unbind("mouseleave").bind("mouseleave", function(){
					$.fn.qve("detachButton", this);
				});

				var pr = $("div#" + itemCode + " .thumbInfo .thumbPrices").html();
				if ( pr && (pr.trim()==="$0.00" || pr.trim()==="$0.00 - $0.00") ) {
					$("div#" + itemCode + " .thumbInfo .thumbPrices").remove(); // just hide the zeros - these are families or wine 
				}
				container.addClass('getThumb').show();
			}
		});
		}
		else{
		window.console.log('Div with class getThumb should have id as categoryItem code');
		}
	    });
	}

})(jQuery); 


jQuery(function () {

	jQuery("div.getThumbDelayed").each(function(i,o){
		var delay = (i==0) ? 5000 : 5000+i*300;
		setTimeout(function () {jQuery(o).getThumbDelayed();}, delay);
	});

});



