/*
	Name: National Park Service global javascript
	Date: December 2011
	Version: 0.0.5
	Author: Pim Linders + Matt Baily @threespot.com
*/

var NPS = NPS || {};

NPS.loadPlugins = function(){
	//slide box
	jQuery.fn.slidebox = function() {
	    var slidebox = this;
	    var originalPosition = slidebox.css('right');
	    var open = false;
	    var boxAnimations;
	
	    if (Modernizr.cssanimations) {
	    	boxAnimations = {
	        	open:  function() { slidebox.addClass('open'); },
	        	close: function() { slidebox.removeClass('open'); }
	      	}
	    } else {
			boxAnimations = {
		        open: function() {
		        	slidebox.animate({
		            	'right': '10px'
		          	}, 300);
		        },
		        close: function() {
		        	slidebox.stop(true).animate({
		            	'right': originalPosition
		          	}, 100);
		        }
			}
		}
		jQuery(window).scroll(function() {
			var distanceTop = jQuery('#content-bottom').offset().top - jQuery(window).height() - 80;
			if (jQuery(window).scrollTop() > distanceTop) {
				if (!open) {
					open = true;
					boxAnimations.open();
				}
			} else {
				open = false;
				boxAnimations.close();
			}
		});
		
		slidebox.find('.close').click(function() {
			jQuery(this).parent().parent().remove();
		});  
	}
	
	/** 
	* jQuery split a list into multiple rows or columns
	* usage: 
	*    jQuery(".dropdown ul").splitList(3);
	*    jQuery(".dropdown ul").splitList(3, { wrapClass: "div_class_name" });
	*    jQuery(".dropdown ul").splitList(3, { splitInto: "div_class_name" });
	*/
	jQuery.fn.splitList = function(n, options){
		settings = jQuery.extend({
			wrapClass: false,
			splitInto: 'cols'
		}, options);
		return this.each(function(){
			var intoCols = (settings['splitInto'] == 'cols');
			jQuerylis = jQuery(this).find("> li");		
			jQueryinc = intoCols ? parseInt((jQuerylis.length/n) + (jQuerylis.length % n > 0 )) : n;
			var w = '<div' + (settings['wrapClass'] ? ' class="' + settings['wrapClass'] + '"' : '' ) + '></div>';
			for(var i=0; i<(intoCols ? n : Math.ceil(jQuerylis.length/n)); i++)
				jQuerylis.slice(jQueryinc*i, jQueryinc*(i+1)).wrapAll(w);
		});
	};
	
	//mouse hold down jquery function
	jQuery.fn.mousehold = function(timeout, f) {
		if (timeout && typeof timeout == 'function') {
			f = timeout;
			timeout = 100;
		}
		if (f && typeof f == 'function') {
			var timer = 0;
			var fireStep = 0;
			return this.each(function() {
				jQuery(this).mousedown(function() {
					fireStep = 1;
					var ctr = 0;
					var t = this;
					timer = setInterval(function() {
						ctr++;
						f.call(t, ctr);
						fireStep = 2;
					}, timeout);
				})
				clearMousehold = function() {
					clearInterval(timer);
					if (fireStep == 1) f.call(this, 1);
					fireStep = 0;
				}
				jQuery(this).mouseout(clearMousehold);
				jQuery(this).mouseup(clearMousehold);
			})
		}
	}
} 

NPS.utility = {
	pageSetups: function(value) {
		jQuery('#site-map-container').hide();
		jQuery('#sm-control a').removeClass('expanded');
		//show utilities
		jQuery('#main-content #utils').css('visibility', 'visible');
		//hide search option submit buttons
		jQuery('.search-control input[type=submit]').hide();
		//remove no js class
		jQuery('html').removeClass('no-js').addClass('js');
	},
	
	setMinContentHeight: function() {
		//set min height to content if the sub-nav is larger
		if(jQuery('#sub-nav').length && jQuery('#content').length) {
			if(jQuery('#sub-nav').height() > jQuery('#content').height()){
				if(jQuery('.fact').length){
					var jQueryfact = jQuery('.fact');
					var factHeight = jQueryfact.outerHeight();
					jQuery('#content').addClass('adjusted-for-fact').css({
						'padding-bottom': factHeight + 'px',
						'min-height': jQuery('#sub-nav').height()-(35 + factHeight)
					});
				} 
				else {
					jQuery('#content').css('min-height', jQuery('#sub-nav').height()-35);
				}
			}
		}
	},

	/** 
	* Checks to see if a value is an integer
	*/
    isInt: function(value) {
		if((parseFloat(value) == parseInt(value)) && !isNaN(value)) {
			return true;
		} else {
			return false;
		}
	},
	
	/** 
	* detect versions of IE
	*/
	getIeVersion: function() {
		if(this.ieVersion == undefined){
			var undef,
			v = 3,
			div = document.createElement('div'),
			all = div.getElementsByTagName('i');
			while (
				div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
				all[0]
			);
			if(v > 4) this.ieVersion = v;
			else this.ieVersion = NaN;
		}
		return this.ieVersion;
	},
	
	/**
	* Image preload
	*/
	preload: function(arrayOfImages) {
    	jQuery(arrayOfImages).each(function() {
        	jQuery('<img/>')[0].src = this;
    	});
	},

	/**
	* Global parameters
	*/
	params: {
    	resize : [
      		['h1'],
       		['h2'],
       		['h3'],
       		['h4'],
       		['p'],
       		['a'],
       		['ul'],
       		['dt'],
       		['dd']
    	],
	    preloadChrome : [
	    	['/common/commonspot/templates/images/chrome/bg/results.png'],
	     	['/common/commonspot/templates/images/chrome/bg/results-bottom.png'],
	     	['/common/commonspot/templates/images/chrome/bg/results-top.png'],
	    	['/common/commonspot/templates/images/chrome/bg/nav-dd-edges.png']
		], 
	    saytId : "277" 
	} 
};


NPS.cycle = {
	
	/**
	* Sets height of cycle containers
	*/
	setCycleHeight: function(element) {
    	var height = 0;
    	var childHeight = 0;
    	jQuery.each(jQuery(element).children(), function(index) {
    		//get height, add 25 pixels of padding
    		childHeight = jQuery(this).height() + 25;
    		if(childHeight > height) {
    			height = childHeight;
    		}
    	});
    	jQuery(element).parent().css("height", height);
	},
	
	/**
	* remove fade effect from cycle for IE7, IE8
	*/
	cycleEffect: function() {
		var effect = 'fade';
		if(NPS.utility.getIeVersion() < 9)	effect = 'none';
		return effect;
	},

	/**
	* Enables slider on bap
	*/
	bapSlider: function() {
		var effect = this.cycleEffect();
		if(jQuery('#bap').length) {
			//ensure that the title fits in the provided space
			jQuery.each(jQuery('#bap .title'), function(index) {
				var maxWidth = 640;
				//add resize class
				if(jQuery(this).children('.main').children('h1').width() > maxWidth) {
					jQuery(this).children('.main').children('h1').addClass('resized');
				}
				//resize title until it reaches the max allowed witdth pixels
				while(jQuery(this).children('.main').children('h1').width() > maxWidth) {
					var curSize = jQuery(this).children('.main').children('h1').css('font-size');
					//new pixel size
					var newSize = parseInt(curSize.replace('px','')) + -2 + 'px';
					jQuery(this).children('.main').children('h1').css('font-size', newSize);
				}
			});
			var bapSize = jQuery('#bap .cycle').children().size();
			//enable slider if there are more than 1 images
			if(bapSize > 1) {
				//insert controls
				jQuery('#bap .cycle').after(jQuery('<ul>').addClass('controls'));
				//enable cycle
				jQuery('#bap .cycle').cycle({
					fx: effect,
					autostop: 1,
					activePagerClass: 'active',
				    pager: '#bap .controls',
			    	//create pager
			        pagerAnchorBuilder: function(idx, slide) { 
			           return jQuery('<li>')
			           .attr('class', 'ir')
			           .text('Go to slide ' + ++idx); 
			        },
			        end: function(options) {  
			            jQuery('#bap .cycle').cycle(0).cycle('pause');
			        }
				});
			}
		}
		if(jQuery('#bap-mini').length) {
			var bapSize = jQuery('#bap-mini .cycle').children().size();
			//enable slider if there are more than 1 images
			if(bapSize > 1) {
				//insert controls
				jQuery('#bap-mini .cycle').after(jQuery('<ul>').addClass('controls'));
				//enable cycle
				jQuery('#bap-mini .cycle').cycle({ 
					fx: effect,
					autostop: 1,
					activePagerClass: 'active',
				    pager: '#bap-mini .controls',
			    	//create pager
			        pagerAnchorBuilder: function(idx, slide) { 
		            	return jQuery('<li>')
		            	.attr('class', 'ir')
		            	.text('Go to slide ' + ++idx); 
			        },
			        end: function(options) {  
			            jQuery('#bap-mini .cycle').cycle(0).cycle('pause');
			        }
				});
			}
		}
	},

	/**
	* Enables slider on bap 
	*/
	carousel: function() {
		var self = this;
		if(!(jQuery('.carousel-list ul').length)) return;
    	this.carousel = jQuery('.carousel-list ul'),
    	this.slideCount = jQuery('.carousel-list ul li').length,
    	this.contentsWrap = function() {
        	var classes = jQuery('.carousel-list').attr('class');
			var countIndex = classes.indexOf('carousel-list-');
			var carNum = parseInt(classes.substr(countIndex+14,1));
			jQuery(".carousel-list ul").splitList(carNum, {
		  		'splitInto': 'rows'
			}).children('div').addClass('clearfix row');
			//more than one slide, enable controls
    	},
    	this.addControls = function() {
        	jQuery('<ul id="carousel-controls"><li id="carousel-controls-prev"><a class="ir" href="#">Previous</a></li><li id="carousel-controls-next"><a class="ir" href="#">Next</a></li></ul>').appendTo(jQuery('.carousel-list'));
        	if(jQuery('.carousel-list .row').length > 1){
        		this.carousel.next('#carousel-controls').show();
			}      
    	},
    	this.cycleItems = function() {
			var effect = self.cycleEffect();
			this.carousel.cycle({ 
	    		fx: effect,
	        	speed:  'fast', 
	        	timeout: 0, 
	        	next:   '#carousel-controls-next a', 
				prev:   '#carousel-controls-prev a',
	        	after:  this.cycleAfter,
	        	nowrap: 1
	    	});
    	},
    	this.cycleAfter = function (curr, next, opts){
    		//apply disabled states to controls based on which slide is being displayed 
        	if (opts == undefined) return;
        	var position = opts.currSlide;
       		 //IE7 / IE8 fix for determining currSlide
			if(NPS.utility.getIeVersion() < 9){
	        	jQuery.each(jQuery('.carousel-list ul:first').children(), function(index){
	    		//identify the current slide in the list, if it matches cycles current slid set the index
	        		if(this == next){
	    				position = index;
	    			}
	    		});
			}
        	position == 0 ? jQuery('#carousel-controls-prev').addClass('prev-disabled') : jQuery('#carousel-controls-prev').removeClass('prev-disabled');
        	position+1 == opts.slideCount ? jQuery('#carousel-controls-next').addClass('next-disabled') : jQuery('#carousel-controls-next').removeClass('next-disabled');
       		 //set the cycle height
        	self.setCycleHeight(this);
		},
		this.init = function() {
        	this.contentsWrap();
        	this.addControls();
        	this.cycleItems();
        	this.cycleAfter();
    	};
    	this.init();  
	}
};


NPS.newContent = {

	/**
	* Creates a list element that contains a print
	* link - inserts it into the download-print-share
	* list. Attaches a click event to the anchor that
	* calls the window.print method. Does this if
	* the page is not home.
	*/ 
	addPrintLink: function() {
		jQuery('.addthis_toolbox').before(jQuery('<li>').addClass('print').append(jQuery('<a>').attr('href','javascript:;').text('print')));
		jQuery('.print a').click(function() {
   			window.print();
   			return false;
		});
	},
	
	/**
	* popup window for webcam
	*/
	webcamLink: function() {
		
		 jQuery('.webcam-link').click(function(e) {
			e.preventDefault();
			newwindow=window.open(jQuery(this).attr('href'),'','height=800,width=960,scrollbars=yes');
			if (window.focus) {newwindow.focus()}
		 });
		
	},
	
	
	/**
	* Simple function that adds the double right
	* brackets to the links with the .more class
	* A condition uses the getIeVersion object to test
	* and only run function if ie6 and ie7 return
	* true.
	*/
	moreLinks: function () {
	     if(NPS.utility.getIeVersion() < 8) {
	          jQuery('.more').each(function() {
	               var jQuerythis = jQuery(this);
	               jQuerythis.html(jQuerythis.text() + '&nbsp;&raquo;');
	          });
	          jQuery('.back').each(function() {
	               var jQuerythis = jQuery(this);
	               jQuerythis.html('&laquo;&nbsp;' + jQuerythis.text());
	          });
	     }    
	},

	/**
	* Twitter
	*/
	getTweets: function (username, tweetNum, container) {
		if (container && container.length){
			container.append(jQuery('<span>').addClass("loading"));
			jQuery.getJSON('http://twitter.com/statuses/user_timeline.json?screen_name=' + username + '&count=' + tweetNum + '&callback=?', function(data) {
				//result returned
		        var tweet = data[0].text;
		        //process links and reply
		        tweet = tweet.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, function(url) {
		            return '<a href="' + url + '">'+url+'</a>';
		        }).replace(/B@([_a-z0-9]+)/ig, function(reply) {
		            return  reply.charAt(0)+'<a href="http://twitter.com/' + reply.substring(1) + '">' + reply.substring(1) + '</a>';

		        });
		        container.empty().append(jQuery('<p>').append(tweet));
			});
		}	
	}
};


NPS.text = {
	
	/**
	* resizes the container to width of the child image
	*/
	resizeToImage: function () {
		if(jQuery('.resize-to-image img').length) {
			jQuery.each(jQuery('.resize-to-image'), function(index, val){
				jQuerythis = jQuery(this);
				jQuery(this).children('img').load(function() {
					jQuerythis.width(jQuerythis.children('img').width());
				});
			});
		}
		
	},
	
	/**
	* update text controls
	*/
	textSizes: function () {
		var self = this;
		jQuery('#utils .text-sizes a').click(function() {
			var activeSize = jQuery('#utils .text-sizes .active').parent().attr('class');
			var size = jQuery(this).parent().attr('class');
			jQuery('#utils .text-sizes a').removeClass('active');
			jQuery(this).addClass('active');
			self.textResize(activeSize, size);
			if(jQuery('.carousel-list').length) NPS.cycle.setCycleHeight('.carousel-list .row');
		});
	},
	
	/**
	* Resize text by - or + 2 pixels
	*/
	 textResize: function(activeSize, size) {
		var value = 0;
		//large text
		if(activeSize == 'large') {
			//if its the same size
			if(size == 'large')	return;
			//one size down
			else if(size == 'medium') value = -2;
			//two sizes down
			else if(size == 'small') value = -4;
		}
		//medium text
		else if(activeSize == 'medium') {
			//if its the same size
			if(size == 'medium') return;
			//one size up
			else if(size == 'large') value = 2;
			//one sizes down
			else if(size == 'small') value = -2;
		}
		//small text
		else if(activeSize == 'small') {
			//if its the same size
			if(size == 'small')	return;
			//one size up
			else if(size == 'medium') value = 2;
			//two sizes up
			else if(size == 'large') value = 4;
		}
		//loop through each resize element
		jQuery.each(NPS.utility.params.resize, function(index, val) { 
			//loop through each html element
			jQuery(val.toString()).each(function() {
				//ignore resizing on bap
				if(jQuery(this).parents('.bap').length == 0 && jQuery(this).parents('#alert').length == 0) {
					curSize = jQuery(this).css('font-size');
					//new pixel size
					newSize = parseInt(curSize.replace('px','')) + value + 'px';
					jQuery(this).css('font-size', newSize);
				}
			});
		});
	}
};
	

NPS.forms = {

	/**
	* Add placeholder support for older browsers
	*/
	placeholder: function() {
		jQuery('[placeholder]').focus(function() {
			var input = jQuery(this);
			if (input.val() == input.attr('placeholder')) {
				input.val('');
				input.removeClass('placeholder');
			}
		}).blur(function() {
			var input = jQuery(this);
			if (input.val() == '' || input.val() == input.attr('placeholder')) {
				input.addClass('placeholder');
				input.val(input.attr('placeholder'));
			}
		}).blur().parents('form').submit(function() {
			jQuery(this).find('[placeholder]').each(function() {
				var input = jQuery(this);
				if (input.val() == input.attr('placeholder')) {
					input.val('');
				}
			});
		});	
	},
	
	/**
	* Submit drop down on click
	*/
	searchDropdown: function() {
		//submit on find a park drop down
		jQuery("#park-query").change(function() {
	        if (!!jQuery(this).val()) window.location = jQuery(this).val();
			// now change the submit button action as well
			jQuery("#find_park_form").attr("action", jQuery(this).val());
	    });
		//submit on find a subject drop down
		jQuery("#subject-query").change(function() {
	        if (!!jQuery(this).val()) window.location = jQuery(this).val();
	    });
	},
	
	/**
	* submit sort by
	*/
	sortBySubmit: function() {
		if(jQuery('.sort-by #sort-by-select').length) {
			jQuery('.sort-by #sort-by-select').change(function(){
				jQuery('.sort-by').submit();
			});
		}
	},
	
	/**
	* Live search
	*/
	 liveSearch: function(){
		jQuery('#global-search input').keyup(function() {
			var searchVal = jQuery('#global-search input').val();
			//get url
			var url = document.location.href;
			//split url
			var urlparts = url.split('/');
			//get the park
			var park = urlparts[3];
			var siteLimit = '';
			//ensure that the park is 4 letters long
			if(park.length == 4){
				var siteLimit = 'nps.gov/' + park;
			}
			
			var subsites = window.location.pathname.split('/');
			var searchTextGuidance = 'this park';
				
			if (subsites[1] == 'subjects') {
			  searchTextGuidance = 'this subject';
			}
			else if (subsites[1] == 'teachers') {
			  searchTextGuidance = 'teachers';
			}

			//update search for results
			jQuery('#result1').empty().html(jQuery('<a>').attr('href','/search/index.htm?query=' + searchVal + '&sitelimit=' + siteLimit).text(searchVal + ' ' + searchTextGuidance));
			jQuery('#result2').empty().html(jQuery('<a>').attr('href','/search/index.htm?query=' + searchVal).text(searchVal + ' in NPS.gov'));
			//show search result
			jQuery('#search-results-container').show();
			//make ajax request to get suggestions
			jQuery.ajax({
				dataType: 'jsonp',
				url: 'http://search.usa.gov/sayt?aid=' + NPS.utility.params.saytId,
				data:{
					q: searchVal
				},
				success: function(suggestions) {
					//if there are suggestions
					if(suggestions.length != 0){
						var i = 0;
						//generate suggestions html
						var html = jQuery('<ul>');
						//var html = '<p>Suggestions</p><ul>';
						jQuery.each(suggestions, function(index, suggestion) {
							if(i < 3){
								//debug here
								html.append(jQuery('<li>').append(jQuery('<a>').attr('href', '/search/index.htm?query=' + suggestion).text(suggestion)));
							}
							i++;
						});
						html = jQuery('<p>').text('Suggestions').append(html);
						//empty and populate suggestions
						jQuery('#search-results #suggestions').empty().html(html);
					}
				},
				error: function() {
					jQuery('#search-results #suggestions').empty();
				}
			});
		});
	}

	/**
	* registration form validation
	*/
	/* Commented out 2/27/12 by Lisa Backer, Fig Leaf Software.  Awaiting instructions on how to properly remove this from the global.js file.
	regForm: function(){
		if(jQuery('#registration').length) {
			//phone validation
			jQuery.validator.addMethod("phone", function(phone_number, element) {
			    phone_number = phone_number.replace(/\s+/g, ""); 
				return this.optional(element) || phone_number.length > 9 &&
					phone_number.match(/^(1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}jQuery/);
			}, "Please specify a valid phone number");
			jQuery("#registration").validate({
				rules: {
					"reg-full-name": "required",
					"reg-school-name": "required",
					"reg-email-address": {
						required: true,
						email: true
					},
					"reg-phone": {
						required: true,
						phone: true
					},
					"reg-student-number": {
						required: true,
						digits: true
					}
				},
				errorPlacement: function(error, element) {
					jQuery('#reg-errors').show();
				}
			});
		}
	}
	*/
};


NPS.gallery = {

	/**
	* tool tip
	*/
	tooltip: function() {	
		if(jQuery('.tooltip').length) {
			xOffset = 10;
			yOffset = 20;	
			jQuery('.tooltip img').hover(function(e) {
				//set empty title attribute for IE7
				if(NPS.utility.getIeVersion() < 8){
					jQuery(this).attr('title','');
				}
				jQuery('#tooltip').remove();
				var text = jQuery(this).attr('alt');
				if(text != undefined && text != '') {
					jQuery('body').append('<p id="tooltip">'+ jQuery(this).attr('alt') +'</p>');
					jQuery('#tooltip')
						.css('top',(e.pageY - xOffset) + 'px')
						.css('left',(e.pageX + yOffset) + 'px')
						.show();	
				}
		    },
			function() {
				this.title = this.t;		
				jQuery('#tooltip').remove();
		    });	
			jQuery('.tooltip img').mousemove(function(e) {
				jQuery('#tooltip')
					.css('top',(e.pageY - xOffset) + 'px')
					.css('left',(e.pageX + yOffset) + 'px');
			});
		}
		if(jQuery('.gallery-content-tooltip').length) {
			jQuery('.gallery-content-tooltip img').mouseenter(function(e) {
				//set empty title attribute for IE7
				if(NPS.utility.getIeVersion() < 8){
					jQuery(this).attr('title','');
				}
				jQuery('.gallery-tooltip').hide();
				var tooltip = jQuery(this).parents('.image').children('.gallery-tooltip');
				if(tooltip.length && !tooltip.is(':visible')){
					tooltip.show();
				}
				else{
					var text = jQuery(this).attr('alt');
					if(text != undefined && text != '') {
						jQuery(this).parents('.image').append(jQuery('<div>').addClass('gallery-tooltip').append(jQuery('<div>').addClass('gallery-tooltip-arrow')).append(jQuery('<p>').text(text))).show();
					}
				}
		  	});
		  	jQuery('.gallery-content-tooltip img').mouseout(function(e) {
		  		jQuery(this).parents('.image').children('.gallery-tooltip').hide();
		  	});
		}	
	},
	
	/**
	* photo gallery setup
	*/
	photoGallery: function() {
		if(jQuery('.gallery-views').length) {
			var buildControl = jQuery('<div id="gallery-controls"><ul class="view-controls"><li class="active"><a href="#" class="list-view">List View</a></li><li><a href="#" class="grid-view">Grid View</a></li></ul></div>');
			jQuery('#.gallery-views #gallery-top').append(buildControl);
			NPS.gallery.galleryControls();
		}
		jQuery('#photo-gallery .description h3 a').click(function(e) {
			e.preventDefault();
			//simulate lightbox click
			jQuery(this).parent().parent().prev().children('a').click();
		});
	},
	
	/**
	* switch between grid and list view
	*/
	galleryControls: function() {
		jQuery('.list-view, .grid-view').click(function(e){
			e.preventDefault();
			var jQuerythis = jQuery(this);
			if(!jQuerythis.parent().hasClass('active')){
				jQuerythis.parent().addClass('active');
				jQuerythis.parent().prev().removeClass('active');
				jQuerythis.parent().next().removeClass('active');
				if(jQuery('#gallery-content').hasClass('list')){
					jQuery('#gallery-content').removeClass('list').addClass('grid');
				}
				else if(jQuery('#gallery-content').hasClass('grid')){
					jQuery('#gallery-content').removeClass('grid').addClass('list');
				}
			}
		});
	}
};


NPS.lightbox = {

	lightboxTitle: function(title, currentArray, currentIndex, currentOpts) {
		var index = (currentIndex + 1);
		var html = jQuery('<div>').addClass('clearfix');
		var disablePrev = '', disableNext = '';
		if (currentArray.length > 1) {
			if(index == 1) {
				disablePrev = 'disable';
			}
    		if(index == currentArray.length) {
    			disableNext = 'disable'
    		}
    		//create next and previous buttons
    		html.append(jQuery('<span>').attr('id','fancybox-prev').append(jQuery('<a>').addClass(disablePrev).attr('href','javascript:jQuery.fancybox.prev();').text('Previous')))
    		.append(jQuery('<span>').attr('id','fancybox-next').append(jQuery('<a>').addClass(disableNext).attr('href','javascript:jQuery.fancybox.next();').text('Previous')))
    	}
  		var altText = jQuery(currentArray[currentIndex]).children().attr('alt');
  		var linkText = jQuery(currentArray[currentIndex]).text();
  		if(altText != undefined && altText != '') {
  			title = altText;
  		}
  		else if(linkText != undefined && linkText != '') {
  			title = linkText;
  		}
    	html.append(jQuery('<div>').attr('id','fancybox-description').append(jQuery('<p>').text(title)));
		return html;
	},

	/**
	* lightbox gallery
	*/
	lightbox: function() {
		if(jQuery('a[data-rel="gallery1"]').length) {
			jQuery('a[data-rel="gallery1"]').fancybox({
				'titlePosition': 'inside',
				'titleFormat': NPS.lightbox.lightboxTitle
			});
		}
		//photo gallery
		if(jQuery('#photo-gallery #gallery-content .image').length) {
			jQuery('#photo-gallery #gallery-content .image a').fancybox({
				'titlePosition': 'inside',
				'titleFormat': NPS.lightbox.lightboxTitle
			});
		}
		//slideshow
		if(jQuery('#gallery-listing .slideshow').length) {
			jQuery('#gallery-listing .view-slideshow').click(function() {
				//remove relationship groupings
				jQuery('#photo-galleries .slideshow li a').attr('rel','');
				//add relationship grouping to this slideshow group
				jQuery(this).parent().next().children('li').children('a').attr('rel','gallery-slideshow');
				jQuery('a[rel="gallery-slideshow"]').fancybox({
					'titlePosition': 'inside',
					'titleFormat': NPS.lightbox.lightboxTitle
				});
				//simulate click to start lightbox
				jQuery(this).parent().next().children('li:first').children('a').click();
			});
		}
	},
	
	eventDetails: function(){
		if(jQuery('.results .show-event').length) {
			jQuery('.results .show-event').click(function(event) {
				jQuerythis = jQuery(this);
				if(!jQuerythis.hasClass('is-fancy')){
					//stop event
					event.preventDefault();
					//add is-fancy class to link
					jQuerythis.addClass('is-fancy');
					//add print link
					jQuery(this).parents('.wrapper').next().children().append(
						jQuery('<a>').attr('href','#').addClass('print-event ir').text('Print')
					);
					//get event details content + add width/height, hide title, no transition, cleanup on close 
					jQuerythis.fancybox({
						'content': jQuery(this).parents('.wrapper').next().children().css('width','475'),
						'titleShow': false,
						'transitionIn': 'none',
						'transitionOut': 'none',
						'onComplete': function(){
							//add print style sheet
							jQuery('<link rel="stylesheet" media="print" id="print-event" href="../global/css/event-details-print.css"/>').appendTo('head');
							//add print click event
							jQuery('#fancybox-content .print-event').click(function(e) {
								e.preventDefault();
								window.print();
								return false;
							});
						},
						'onCleanup': function(){
							//remove print style sheet
							jQuery('#print-event').remove();
						}
					});
					//continue event
					jQuerythis.trigger(event)
				}				
			});
			jQuery('.results .show-event-trigger').click(function(event) {
				event.preventDefault();
				jQuerythis = jQuery(this);
				jQuerythis.parent('h3').siblings('.wrapper').find('.show-event').click();
			});
		}
	},

	/**
	* iframe for rate button
	*/
	rateBtn: function () {
		var height = 805;
		//ie 7 height
		if(NPS.utility.getIeVersion() < 8) {
			height = 855;
		}
		if(jQuery('.rate-btn').length) {
			jQuery('.rate-btn').fancybox({
				'width': 598,
				'height': height,
				'autoScale': false,
				'type': 'iframe'
			});
		}
	}
};


NPS.starRating = {

	/**
	* enable star ratings
	*/
	starRatings: function () {
		if(jQuery('.ratings-wrapper').length) {
			jQuery.each(jQuery(".ratings-wrapper"), function() {
				jQuery(this).stars({
			    	inputType: "select",
			    	captionEl: jQuery(this).next('.stars-cap'),
			    	disabled: true
				});
			});

			//ensure the review breakdown is hidden
			jQuery('.ratings-box .review-breakdown').hide();
			//show breakdown
			jQuery('.ratings-box .ratings-wrapper div').mouseenter(function() {
				jQuery('.ratings-box .review-breakdown').show();
			});
			//hide breakdown
			jQuery('.ratings-box .ratings-wrapper div').mouseout(function() {
				jQuery('.ratings-box .review-breakdown').hide();
			});
			//Add a close for touch devices
			jQuery('.review-breakdown .hover-close').click(function() {
				jQuery(this).parent().hide();
			});
		}
	}
};

NPS.display = {

	/**
	* Wraps the dt and dd pair in each dl with a class of wrapper with a div
	*/
	wrapdldt: function() {
		 jQuery('.wrapped dt').each(function() {
		 	//get current dt
		 	var jQuerycurElement = jQuery(this);
		 	//add dt to selection list
	        var jQueryselection = jQuery(this);
	        //add next children
	        while(jQuerycurElement.next().is('dd')) {
	        	jQuerycurElement = jQuerycurElement.next();
	        	jQueryselection.push(jQuerycurElement[0]);
	        }
	        //wrap all elements in a dl wrapper
	        jQueryselection.wrapAll('<div class="dl-wrapper">');
	    });
	},

	/**
	* Setting up results show / hide functionality
	*/
	showHide: function() {
		jQuery('.show-hide a').click(function() {
			if(jQuery(this).hasClass('read-more')) {
				jQuery(this).removeClass('read-more').addClass('read-less').text('Read Less');	
				jQuery(this).parent().next().show();
			}
			else{
				jQuery(this).removeClass('read-less').addClass('read-more').text('Read More');
				jQuery(this).parent().next().hide();
			}
		});
	},

	/**
	* Setting up tabs functionality - relies on jQuery ui
	*/
	tabsSetup: function() {
		if(jQuery('.list-nav li').length) {
			jQuery(".list-nav li:not(:first-child)").hide();
			jQuery(".list-nav li:first-child").addClass("active");
			jQuery(".list-nav li a").click(function(){
				var jQuerythis = jQuery(this);
				var jQuerylist = jQuery(this).parent().parent();
				if(jQuerythis.parent().siblings(':visible').length==0) {
					jQuerythis.parent().siblings().show();

				}
				else {
					jQuerythis.parent().siblings().removeClass("active")
					.end().addClass("active");
			        var move = jQuery(this).parent().detach();
			        move.prependTo(jQuerylist);
			        move = null;
			        jQuerythis.parent().siblings().hide();

				}
			});
		}
		if(jQuery('.content-viewer').length) {
			jQuery( ".content-viewer" ).tabs();
		}
		if(jQuery('.tabbed').length) {
			jQuery('.tabbed').tabs(); 
		}
	},

	/**
	* Show and hide global alert message
	*/
	alert: function() {
		if ((jQuery('#content-alert').length) && (jQuery('.alert-toggle').length)){
			jQuery('#content-alert').hide();
			jQuery('.alert-toggle').click(function(){
				if(jQuery('#content-alert').is(':visible')) {
					jQuery('#content-alert').hide();
					jQuery('#alert-toggle').html('Show Alerts &raquo;');
				}
				else{
					jQuery('#content-alert').show();
					jQuery('#alert-toggle').html('Hide Alerts &raquo;');
				}
			});
		}
	},

	/**
	* Show and hide transcript controls
	*/
	transcriptControls: function() {
		if(jQuery('.transcript-control').length) {
			jQuery(".transcript-control a").click(function() {
				var transcript = jQuery(this).parent().next('.transcript');
				var jQueryfact = jQuery('.adjusted-for-fact .fact');
				if(transcript.is(':visible')) {
					if (NPS.utility.getIeVersion()==7) { jQueryfact.hide(); }
					transcript.hide();
					jQuery(this).parent().removeClass('close').addClass('open');
					if (NPS.utility.getIeVersion()==7) { jQueryfact.show(); }

				}
				else {
					if (NPS.utility.getIeVersion()==7) { jQueryfact.hide(); }
					transcript.show();
					jQuery(this).parent().removeClass('open').addClass('close')
					if (NPS.utility.getIeVersion()==7) { jQueryfact.show(); }

				}
			});
		}
	},

	/**
	* hide and show full field trips
	*/
	resultAlert: function() {
		if(jQuery('#micro-filter-check').length) {
			jQuery('#micro-filter-check').change(function() {
				if(jQuery('#micro-filter-check').is(':checked')) {
					jQuery("#display-list-view li").has(".alert-box").show();

				}
				else{
					jQuery("#display-list-view li").has(".alert-box").hide();

				}
			});
		}
	},

	/**
	* Show and hide the footer
	*/
	footerControls: function() {
		if((jQuery('#site-map-container').length) || (jQuery('.site-map-container').length)) {
			jQuery('#sm-control').click(function() {
				jQuery('#site-map-container').toggle();
				if(jQuery('#sm-control a').hasClass('expanded')) {
					jQuery('#sm-control a').removeClass('expanded');

				}
				else {
					jQuery('#sm-control a').addClass('expanded');

				}
			});
		}
	},

	/**
	* Monitor click events, blur divs if shown
	*/
	searchBlur: function() {
		//click off search results
		jQuery(document).click(function(e) {
			//if the parent of the click is inside the search result container and the search result if visible
			if(jQuery(e.target).parents("#search-results-container").attr('id') != "search-results-container" && jQuery('#search-results-container').is(':visible')){
				jQuery('#search-results-container').hide();
			}
		});
	},
	
	/**
	* click functionality for tiles
	*/
	tiles: function() {
		//add classes for IE7/8
		if(jQuery('.tiles').length) {
			jQuery('.tiles li:nth-child(even)').addClass('even');
			jQuery('.tiles li:last-child').addClass('last-child');
			//close and open tile
			jQuery('.tiles li').click(function(){
				if(jQuery(this).hasClass('show-info')){
					jQuery(this).removeClass('show-info');
					jQuery(this).children('.description').addClass('visuallyhidden');
				}
				else{
					jQuery('.tiles li').removeClass('show-info');
					jQuery('.tiles .description').addClass('visuallyhidden');
					jQuery(this).children('.description').removeClass('visuallyhidden');
					jQuery(this).addClass('show-info');
				}
			});
		}
	},

	/**
	* Add show-hide buttons to reviews
	*/
	reviewShow: function(){
		if(jQuery('.content .review-body').length) {
			jQuery('.review-body').hide();
			jQuery('.review-body').before('<div class="show-hide"><a class="read-more" href="javascript:;">Read More</a></div>');
			this.showHide();
		}
	}

};

jQuery(document).ready(function(){
	//page set up actions
	NPS.utility.pageSetups();
	//preload images
	if(jQuery('#search-results-container').length)
		NPS.utility.preload(NPS.utility.params.preloadChrome);
	
	NPS.loadPlugins();
	
	NPS.text.resizeToImage();
	
	NPS.display.wrapdldt();
	NPS.display.searchBlur();
	NPS.display.reviewShow();
	NPS.display.transcriptControls();
	NPS.display.footerControls();
	NPS.display.resultAlert();
	NPS.display.tabsSetup();
	NPS.display.alert();
	NPS.display.tiles();

	NPS.text.textSizes();

	NPS.newContent.webcamLink();
	NPS.newContent.moreLinks();
	NPS.newContent.getTweets("CivilWarReportr", 1, jQuery('#tweet'));
	NPS.newContent.addPrintLink();
	
	NPS.forms.searchDropdown();
	NPS.forms.liveSearch();
	NPS.forms.placeholder();
	NPS.forms.sortBySubmit();
	/* Commented out 2/27/12 by Lisa Backer, Fig Leaf Software.  Awaiting instructions on how to properly remove this from the global.js file.
	NPS.forms.regForm();
	*/
	
	NPS.cycle.bapSlider();
	NPS.cycle.carousel();

	NPS.lightbox.lightbox();
	NPS.lightbox.rateBtn();
	NPS.lightbox.eventDetails();
	
	NPS.gallery.tooltip();
	NPS.gallery.photoGallery();

	NPS.starRating.starRatings();
	
	if(jQuery('#slidebox').length) {
		jQuery('#slidebox').slidebox();
	}
	//if(jQuery('.urb-browser').length) {
		//preload urb images
	//	NPS.utility.preload(NPS.utility.params.preloadUrb);
		//initiate resource broswer
	//	NPS.urb = resourceBrowser.init();
	// }

	//uncomment below to provide browser back button functionality to the back button class
	//jQuery('#back .back-button').click(function(){window.history.back(1);});
});

jQuery(window).load(function(){
	//need to wait to window has loaded so Webkit gets height correct for certain functions
	NPS.utility.setMinContentHeight();
});