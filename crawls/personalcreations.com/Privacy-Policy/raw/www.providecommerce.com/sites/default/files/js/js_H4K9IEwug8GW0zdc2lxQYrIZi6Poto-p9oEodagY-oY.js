//var constants = {container:'', btnLeft:'', btnRight:'', itemClass:'', interval:bool, intervalSpeed:#, slideNumber:#, numberShown:#, speed:#};
//var scroll = new dScroll(constants);
//Notes: speed works as a "duration". The smaller the number, the faster it will animate
function dScroll(constants) {
				var obj, img;
				this.container = jQuery(constants.container);
				this.containerId = constants.container;
				this.frame = this.container.parent();
				// hide frame to reduce content bouncing
				//this.frame.css({'position':'relative', 'opacity':0});
				this.itemClass = constants.itemClass;
				this.slideItems = jQuery(constants.container + ' ' + constants.itemClass);
				this.btnLeft = (constants.btnLeft == '' || constants.btnLeft == undefined) ? false : jQuery(constants.btnLeft);
				this.btnRight = (constants.btnRight == '' || constants.btnRight == undefined) ? false : jQuery(constants.btnRight);
				this.slideNumber = (constants.slideNumber == undefined) ? this.slideNumber = 1 : this.slideNumber = constants.slideNumber;
				this.currSlide = this.slideNumber;
				this.currSpeed = (this.currSlide == 1) ? 1 : this.currSlide/2;
				this.dir = 'right';
				this.numberShown = (constants.numberShown == undefined) ? this.numberShown = this.slideNumber : this.numberShown = constants.numberShown;
				this.speed = (constants.speed == undefined) ? this.speed = 300 : this.speed = constants.speed;
				this.interval = (constants.interval == undefined) ? false : constants.interval;
				this.intervalSpeed = (constants.intervalSpeed == undefined) ? 5000 : constants.intervalSpeed * 10;
				if(this.slideItems.length%this.numberShown != 0) this.addNodes(this.slideNumber - this.slideItems.length%this.numberShown);
				if(this.slideItems.find('img').length) {
								obj = this;
								img = this.slideItems.find('img')[0];
								if(img.complete || img.readyState === 4) {
												obj.initScroll();
								} else {
												jQuery(img).load(function(){
																obj.initScroll();
												});
								}
								// IE fix
								img.src = this.slideItems.find('img')[0].src;
				} else {
								this.initScroll();
				}
}
// initialize scroller
dScroll.prototype.initScroll = function() {
				this.itemWidth = this.slideItems.width();
				this.itemHeight = this.slideItems.height();
				this.totalItemHeight = this.slideItems.outerHeight(true);
				this.totalItemWidth = this.slideItems.outerWidth(true);
				this.totalWidth = this.totalItemWidth * this.slideItems.length;
				this.totalSlide = this.slideNumber * this.totalItemWidth;
				this.container.left = 0;
				this.animate = false;
				this.disabled = false;
				this.createScroll();
}
// add nodes to slideItems when not enough elements for pages
dScroll.prototype.addNodes = function(number) {
				var tempNode;
				for(i=0; i<number; i++) {
								tempNode = this.slideItems[this.slideItems.length-1].cloneNode(false);
								this.container.append(tempNode);
				}
				this.slideItems = jQuery(this.containerId + ' ' + this.itemClass);
}
// Set start position and adjust css for container and frame
dScroll.prototype.createScroll =  function() {
				var frameWidth = this.totalItemWidth * this.numberShown - parseInt(jQuery(this.slideItems[0]).css('margin-right'));
				this.container.css({'width': this.totalWidth + 'px',
								'height': this.totalItemHeight + 'px',
								'position': 'absolute',
								'left': this.container.left + 'px'});
				this.frame.css({'width': frameWidth + 'px',
								'height': this.totalItemHeight + 'px',
								'position':'relative',
								'overflow': 'hidden'});
				this.slideItems.css({'width': this.itemWidth + 'px',
								'height': this.itemHeight + 'px',
								'float': 'left'});
				this.addBtnEvent();	// add arrow events
				if(this.interval && !this.disabled) this.createInterval(); // create slide interval
}
// add click event
dScroll.prototype.addBtnEvent = function() {
				var obj = this;
				var temp;
				if(this.slideItems.length <= this.numberShown) {
								this.disabled = true;
								if(this.btnLeft) this.btnLeft.addClass('disabled-btn');
								if(this.btnRight) this.btnRight.addClass('disabled-btn');
				} else {
								if(this.btnLeft) {
												this.btnLeft.click(function() {
																if(!obj.animate && !obj.disabled) {
																				if(obj.scrollInterval) clearInterval(obj.scrollInterval);
																				obj.animate = true;
																				obj.dir = 'left';
																				obj.shiftElementsLeft(obj.slideNumber);
																				obj.slideLeft();
																}
																return false;
												});
								}
								if(this.btnRight) {
												this.btnRight.click(function() {
																if(!obj.animate && !obj.disabled) {
																				if(obj.scrollInterval) clearInterval(obj.scrollInterval);
																				obj.animate = true;
																				obj.dir = 'right';
																				obj.slideRight();
																}
																return false;
												});
								}
				}
				// reveal frame
				//this.frame.animate({
				//				opacity: 1
				//}, 1500);
}
// Create interval
dScroll.prototype.createInterval =  function() {
				var obj = this;
				this.scrollInterval = setInterval(function() {
								obj.animate = true;
								obj.slideRight();
				}, this.intervalSpeed);
}
// moves the elements on the page in preparation for the slide
dScroll.prototype.shiftElementsLeft = function(shiftNumber) {
				this.container.left = this.container.left - shiftNumber * this.totalItemWidth;
				this.container.css('left', this.container.left + 'px');
				for(i=shiftNumber; i>0; i--) {
								jQuery(this.slideItems[this.slideItems.length - 1]).insertBefore(this.slideItems[0]);
								this.slideItems = jQuery(this.containerId + ' ' + this.itemClass);
				}
}
dScroll.prototype.shiftElementsRight = function(shiftNumber) {
				this.container.left = this.container.left + shiftNumber * this.totalItemWidth;
				this.container.css('left', this.container.left + 'px');
				for(i=shiftNumber; i>0; i--) {
								jQuery(this.slideItems[0]).insertAfter(this.slideItems[this.slideItems.length - 1]);
								this.slideItems = jQuery(this.containerId + ' ' + this.itemClass);
				}
}
// slide elements left
dScroll.prototype.slideLeft = function() {
				var obj = this;
				this.container.left = this.container.left + this.totalSlide;
				this.container.animate({
								left: this.container.left
				}, (this.totalItemWidth * this.currSpeed)/this.speed * 500, function() { obj.animate = false;});
}
// slide elements right
dScroll.prototype.slideRight = function() {
				var obj = this;
				this.container.left = this.container.left - this.totalSlide;
				this.container.animate({
								left: this.container.left
				}, (this.totalItemWidth * this.currSpeed)/this.speed * 500, function() {obj.shiftElementsRight(obj.currSlide); obj.animate = false;});
}
// reset slide number
dScroll.prototype.resetSlide = function() {
				var obj = this;
				if(obj.scrollInterval) clearInterval(obj.scrollInterval);
				this.totalSlide = this.slideNumber * this.totalItemWidth;
				this.currSlide = this.slideNumber;
				this.currSpeed = (this.currSlide == 1) ? 1 : this.currSlide/2;
}
;
(function($){$.fn.jScroll=function(e){var f=$.extend({},$.fn.jScroll.defaults,e);return this.each(function(){var a=$(this);var b=$(window);var c=new location(a);b.scroll(function(){a.stop().animate(c.getMargin(b),f.speed)})});function location(d){this.min=d.offset().top;this.originalMargin=parseInt(d.css("margin-top"),10)||0;this.getMargin=function(a){var b=d.parent().height()-d.outerHeight();var c=this.originalMargin;if(a.scrollTop()>=this.min)c=c+f.top+a.scrollTop()-this.min;if(c>b)c=b;return({"marginTop":c+'px'})}}};$.fn.jScroll.defaults={speed:"slow",top:10}})(jQuery);;
/*******

	***	Anchor Slider by Cedric Dugas   ***
	*** Http://www.position-absolute.com ***
	
	Never have an anchor jumping your content, slide it.

	Don't forget to put an id to your anchor !
	You can use and modify this script for any project you want, but please leave this comment as credit.
	
*****/
		



;
(function($) {
	$(document).ready(function() {
	
		/*
		 * Menu Sytesm Modification
		 *
		 * @Main Menu
		 */
		$('#block-menu-block-1 ul.menu li a').each(function(){
			var title = $(this).attr('title').toLowerCase();
			while (title != (title = title.replace(' & ', '-')));
			while (title != (title = title.replace(' ', '-')));
			$(this).parent()
				.addClass('menu-'+title)
				.prepend('<span>/</span>');
		});
		
		/*
		 * Menu Sytesm Modification
		 *
		 * @Footer Menu
		 */
		$('#block-menu-block-2 ul.menu li a').each(function(){
			var title = $(this).attr('title').toLowerCase();
			while (title != (title = title.replace(' & ', '-')));
			while (title != (title = title.replace(' ', '-')));
			$(this).parent()
				.addClass('menu-'+title)
				.prepend('<span>/</span>');
		});
		
		/*
		 * Menu Sytesm Modification
		 *
		 * @Our Brands Menu
		 */
		$('#block-menu-block-5 ul.menu li a').each(function(){
			var href = $(this).text().toLowerCase();
			while (href != (href = href.replace(' ', '-')));
			while (href != (href = href.replace('.', '')));
			$(this).attr('href','#'+href).addClass('anchorLink');
		});
	
	
		/*
		 * Isotope
		 *
		 * @Initiate
		 */
		var mozillaFrontCheck = true; 
		if($('body').hasClass('front') && $.browser.mozilla){
			mozillaFrontCheck = false;
		}
		if($.browser.msie){
			mozillaFrontCheck = false;
		}
		if($('#isotope-container').length){ 
			var $container = $('#isotope-container');
			$container.isotope({
				itemSelector: '.isotope-element',
				masonry: {
					columnWidth: 40,
					cornerStampSelector: '.corner-stamp'
				},
				transformsEnabled: mozillaFrontCheck
			});
			
			
			
			/*
			 * Isotope Modifications
			 *
			 * @Collapse/Expand One at a Time
			 */
			function collapseAllIsotopes(node){
				$('.isotope-element').each(function(){
					if($(this) != $(node)){
						$(this).find('.close').click();
					}
				})
			}
			
	  
			/*
			 * Isotope Modifications
			 *
			 * @Slideshows Expansion
			 */
			$container.delegate('.slide_show .expand', 'click', function(){
				
				// Grab the Isotope Element
				var node = $(this).closest('.isotope-element');
				// Close all others
				collapseAllIsotopes(node);
				
				// Hide the Expand Panel
				$(this).fadeOut('200');
				// Resize the elements for slideshow
				$(node).find('.node').css({height:590, width:630});
				$(node).addClass('grid-8x8').css('z-index','1000');
				// ReLayout Isotope for expanded slideshow
				$container.isotope('reLayout');
				
				// Animate Slideshow
				$(node).find('.slideshow').show().animate({height:590, opacity:1, width:630}, 250, function(){
					// Initiate Slideshow
					var showConstants = {container:'#'+$(node).find('.node').attr('id')+' .slideshow-slides', btnLeft:'#'+$(node).find('.node').attr('id')+' .controls-previous', btnRight:'#'+$(node).find('.node').attr('id')+' .controls-next', itemClass:'.slide', interval:500, slideNumber:1, numberShown:1, speed:1000}
					var showScroll = new dScroll(showConstants);
					
					// Close Slideshow
					$(node).find('.slideshow .close').click(200, function(){
						// Isotope Elements back to normal size
						if($(node).hasClass('grid-6x4')){
							$(node).find('.node').css({height:290, width:470});
							$(node).find('.slideshow').hide().css({height:290, opacity:0, width:470});
						} else if($(node).hasClass('grid-4x4')){
							$(node).find('.node').css({height:290, width:310});
							$(node).find('.slideshow').hide().css({height:290, opacity:0, width:310});
						}
						$(node).removeClass('grid-8x8').css('z-index','2');
						$(node).find('.expand').fadeIn();
						// ReLayout Isotope for collpased slideshow
						$container.isotope('reLayout');
						// Kill existing slideshow
						showScroll.resetSlide();
						delete showConstants;
						delete showScroll;
					});
				});
			});
			
	
			/*
			 * Isotope Modifications
			 *
			 * @Video Expansion
			 */
			$container.delegate('.video_node .expand', 'click', function(){
				
				// Grab the Isotope Element
				var node = $(this).closest('.isotope-element');
				// Close all others
				collapseAllIsotopes(node);
				
				// Hide the Expand Panel
				$(this).fadeOut('200');
				// Resize the elements for slideshow
				$(node).find('.node').css({height:590, width:630});
				$(node).addClass('grid-8x8').css('z-index','1000');
				// ReLayout Isotope for expanded slideshow
				$container.isotope('reLayout');
				
				// Animate Video
				$(node).find('.video').show().animate({height:590, opacity:1, width:630}, 250, function(){
					var $videoSrc = $(node).find('.video-container iframe').attr('src');
						$(node).find('.video-container iframe').attr('src','');
						$(node).find('.video-container iframe').attr('src', $videoSrc + '&autoplay=1');
								
					// Close Video
					$(node).find('.video .close').click(200, function(){
						var $videoSrc = $(node).find('.video-container iframe').attr('src');
						$videoSrc = $videoSrc.replace('&autoplay=1','&autoplay=0');
						$(node).find('.video-container iframe').attr('src','');
						$(node).find('.video-container iframe').attr('src', $videoSrc);
					
						// Isotope Elements back to normal size
						if($(node).hasClass('grid-6x4')){
							$(node).find('.node').css({height:290, width:470});
							$(node).find('.slideshow').hide().css({height:290, opacity:0, width:470});
						} else if($(node).hasClass('grid-4x4')){
							$(node).find('.node').css({height:290, width:310});
							$(node).find('.video').hide().css({height:290, opacity:0, width:310});
						}
						$(node).removeClass('grid-8x8').css('z-index','2');
						$(node).find('.expand').fadeIn();
						// ReLayout Isotope for collpased slideshow
						$container.isotope('reLayout');
					});
				});
			});
			
			
			/*
			 * Isotope Modifications
			 *
			 * @Our People Expansion
			 */
			$container.delegate( '.people .expand', 'click', function(){
				
				// Grab the Isotope Element
				var node = $(this).closest('.isotope-element');
				// Close all others
				collapseAllIsotopes(node);
				
				// Hide the Expand Panel
				$(this).fadeOut('200', function(){
					// Resize the elements for slideshow
					var $infoHeight = 130 + $(node).find('.bio').height();
					if( $infoHeight < 440 ){
						$infoHeight = 400;
					} else if( $infoHeight < 590 ){
						$infoHeight = 590;
					} else if( $infoHeight < 740 ){
						$infoHeight = 740;
					} else if( $infoHeight < 890 ){
						$infoHeight = 890;
					} else if( $infoHeight < 1040 ){
						$infoHeight = 1040;
					} else if( $infoHeight < 1190 ){
						$infoHeight = 1190;
					}
					$(node).css({height:$infoHeight, width:470});
					$container.isotope('reLayout');
					$(node).find('.bio').height($infoHeight - 150).delay(200).slideDown(300, function(){
						$(node).find('.close').click(function(){
							$(node).find('.bio').slideUp(200, function(){
								$(node).css({height:290, width:150});
								$container.isotope('reLayout');
								$(node).find('.expand').fadeIn().delay(150);
							});
						});
					});
				});
			});
			
			/*
			 * Isotope Modifications
			 *
			 * @Departments Expansion
			 */
			$container.delegate( '.department .preview-info', 'click', function(){

				// Grab the Isotope Element
				var node = $(this).closest('.isotope-element');
				// Close all others
				collapseAllIsotopes(node);
				
				$(node).find('.preview-info').addClass('orange');
				var $infoHeight = 125 + $(node).find('.full-info').outerHeight();
				if( $infoHeight < 440 ){
					$infoHeight = 400;
				} else if( $infoHeight < 590 ){
					$infoHeight = 590;
				} else if( $infoHeight < 740 ){
					$infoHeight = 740;
				} else if( $infoHeight < 890 ){
					$infoHeight = 890;
				} else if( $infoHeight < 1040 ){
					$infoHeight = 1040;
				} else if( $infoHeight < 1190 ){
					$infoHeight = 1190;
				}
				$(node).css({height:$infoHeight, width:470});
				$container.isotope('reLayout');
				$(node).find('.full-info').height($infoHeight - 150).delay(200).slideDown(300, function(){
					$(node).find('.close').click(function(){
						$(node).find('.full-info').slideUp(200, function(){
							$(node).css({height:140, width:150});
							$(node).find('.preview-info').removeClass('orange');
							$container.isotope('reLayout');
						});
					});
				});
			});
			
			/*
			 * Isotope Expansions
			 *
			 * @Quotes Color
			 */
		
				
		} // end isotope
		
		/*
		 * Isotope Modification
		 *
		 * @Job Form Styling
		 */ 
		$('.form-item-location select').each(function(){
			var title = $(this).attr('title');
			if( $('option:selected', this).val() != ''  ) title = $('option:selected',this).text();
			$(this)
				.css({'z-index':10000,'opacity':0,'-khtml-appearance':'none'})
				.after('<div class="select"><span>' + title + '</span></div>')
				.change(function(){
					val = $('option:selected',this).text();
					$('.form-item-location div.select span').text(val);
				});
		});
		
		$('.form-item-category select').each(function(){
			var title = $(this).attr('title');
			if( $('option:selected', this).val() != ''  ) title = $('option:selected',this).text();
			$(this)
				.css({'z-index':10,'opacity':0,'-khtml-appearance':'none'})
				.after('<div class="select"><span>' + title + '</span></div>')
				.change(function(){
					val = $('option:selected',this).text();
					$('.form-item-category div.select span').text(val);
				});
		}); 
		
		$('.form-item-department select').each(function(){
			var title = $(this).attr('title');
			if( $('option:selected', this).val() != ''  ) title = $('option:selected',this).text();
			$(this)
				.css({'z-index':10000,'opacity':0,'-khtml-appearance':'none'})
				.after('<div class="select"><span>' + title + '</span></div>')
				.change(function(){
					val = $('option:selected',this).text();
					$('.form-item-department div.select span').text(val);
				});
		});
		
		/*
		 * Our Story Modification
		 *
		 * @Jump Menu
		 */
		 
		$("#block-views-about-us-our-story-jump-menu").jScroll(); 
		$('#block-views-about-us-our-story-jump-menu a').each(function(){
			var year = '#year'+$(this).text();
			$(this).attr('href',year).addClass('anchorLink');
			$(this).click(function(){
				$('#block-views-about-us-our-story-jump-menu a').removeClass('active');
				$(this).addClass('active');
			});
		});
		/*
		$('#block-views-about-us-our-story h3').each(function(){
			$(this).prepend('<a name="year'+$(this).text()+'" id="year'+$(this).text()+'" />');
			if(!$(this).is(':first-child')){
				$(this).css('margin-top','50px');
			}
		})
		*/
		
	    $("#edit-department").change(function() {
		 	if($("#edit-department").val() == 5){
			  window.location.href = '/about-us/giving-back';
		    }else{
			  $(".contact_content").show().load("/contact/"+$("#edit-department").val());
		    }
		});
		
		
		
		/*
		 * Anchor Links
		 *
		 * @Sliding Functionality
		 */
		 
		jQuery.fn.anchorAnimate = function(settings) {
		 	settings = jQuery.extend({
				speed : 1100
			}, settings);	
			return this.each(function(){
				var caller = this
				jQuery(caller).click(function (event) {	
					event.preventDefault()
					var locationHref = window.location.href
					var elementClick = jQuery(caller).attr("href")
					
					var destination = jQuery(elementClick).offset().top;
					jQuery("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination}, settings.speed, function() {
						window.location.hash = elementClick
					});
				  	return false;
				})
			})
		} 
		$("a.anchorLink").anchorAnimate();
		
		/*
		 * Mini Timeline
		 */
				
	$("#block-provide-blocks-timeline-block .imageLg, #block-provide-blocks-timeline-block .imageSm").hover(function(){ 
		$('#block-provide-blocks-timeline-block').closest('.isotope-item').css('z-index','1000');
		$(this).find(".tl_text").fadeIn('200'); },
	function(){
		$('#block-provide-blocks-timeline-block').closest('.isotope-item').css('z-index','2');
		$(this).find(".tl_text").fadeOut('200');
  	}); 

 });
})(jQuery);

;
