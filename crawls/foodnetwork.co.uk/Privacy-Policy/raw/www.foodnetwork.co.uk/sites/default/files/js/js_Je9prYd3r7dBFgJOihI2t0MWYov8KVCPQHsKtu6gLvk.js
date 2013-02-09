(function ($){
    /* css state management (on .field-type-ooyala container)
      .field_ooyala_image
      .field_ooyala_loading
      .field_ooyala_loaded
      .field_ooyala_<errorCode>
    */
    Drupal.behaviors.field_ooyala_player = {
      attach: function (context, settings) {
        jQuery(".field-type-ooyala")
          .addClass("field_ooyala_image") //css state management
          .click(
        function() {
          //values passed in the HTML
          //for performance and to conform better with our AJAX gallery loading
          var player       = jQuery(this).find(".field_ooyala_player");
          var embedcode    = player.find(".embedcode").text();
          var playerId     = player.find(".playerid").text();
          var playerContainerId = player.find(".playerContainerId").text();
          var ooyala_pcode = player.find(".ooyala_pcode").text();
          var width        = player.find(".width").text();
          var height       = player.find(".height").text();
          
          //construct the Ooyala player.js script location
          //which handles the <object> insertion for us
          if (embedcode && playerContainerId) {
            var ooyala_domain = 'http://player.ooyala.com';
            var player_js     = '/player.js';
            var query_params  = '?callback=receiveOoyalaEvent'
              + '&embedCode='  + embedcode
              + '&playerId='   + playerId //should always be player 
              + '&playerContainerId=' + playerContainerId
              + '&videoPcode=' + ooyala_pcode
              + '&width='      + width
              + '&height='     + height
              + '&wmode=transparent'
              + '&autoplay=1'; 
            var request_uri   = ooyala_domain + player_js + query_params;
            
            //this script loads (cross-domain mode) and executes in to the global scope
            //playerContainerId dictates where the <object> tag is placed
            jQuery.getScript(request_uri);
            
            //css state management
            player.parents(".field-type-ooyala").addClass('field_ooyala_loading').removeClass('field_ooyala_image');
          }
          
          //debug
          //jQuery(this).html(jQuery(this).html() + playerId + ' ' + embedcode + ' ' + ooyala_pcode + ' ' + width + ' ' + height + "<br>");
        });
      }
    };
})(jQuery);

function receiveOoyalaEvent(playerId, eventName, p) {
    var parentContainer = jQuery('#' + playerId).parents(".field-type-ooyala");
    var debugContainer  = parentContainer.find(".field_ooyala_debug");
    var debugString     = '[' + eventName + '] ';
    
    switch(eventName) {
      case 'embedCodeChanged': {
        break;
      }
      case 'playheadTimeChanged': {
        //this happens constantly so ignore it
        debugString = '';
        break;
      }
      case 'stateChanged':
        debugString += '(' + p.state + ') '; 
        switch (p.state) {
          case 'error': {
            //alert(p.errorCode + ':' + p.errorText);
            debugString += p.errorCode + ':' + p.errorText;
            //css state management
            parentContainer.addClass('field_ooyala_' + p.errorCode).removeClass('field_ooyala_loading');
          }
        }
        break;
      case 'apiReady': {
        //css state management
        parentContainer.addClass('field_ooyala_loaded').removeClass('field_ooyala_loading');
        break;
      }
    }

    if (debugString) debugContainer.html(debugContainer.html() + '<li>' + debugString + "</li>\n");
    
    return;
};
/*
* Food Network UK Electronic Programme Guide
* Copyright (c) 2012 Food Network UK
* http://www.foodnetwork.co.uk
*/

(function ($) {
	
/*

Moved to back end

// Find current time
function currentTime(func) {
  	var dt = new Date();
  	var hr = dt.getHours();
  	goToHour(hr,func);
}

// Convert minutes to pixels
function minutesToPixels(m) {
	// 1 min = 6px, half hour date stamp = 180px, + 89px to centre  
  	var res = (m*6)+89;
  	return res;
}

// Set current time marker
function setTimeLine() {
  	var dt = new Date();
  	var hr = dt.getHours();
  	var min = dt.getMinutes();
  	var pos =  minutesToPixels((hr*60)+min);
  	var attr = {"left":pos+"px"};
  	$(".timeline").css(attr);
}

// Obscure time stamp if in the past
function setTimeOverlay() {
  	var dt = new Date();
  	var hr = dt.getHours();
  	var min = dt.getMinutes();
  	var pos =  minutesToPixels((hr*60)+min);
  	var attr = {"width":pos+"px"};
  	$(".time-overlay").css(attr);
}

// Go to current hour
function goToHour(hr,func) {
  	var dt = new Date();
	var min = dt.getMinutes();
	var pos =  minutesToPixels((hr*60)+min);
	var width = $(window).width()/2;
  	var centre = (pos - width);
  	var attr = {"scrollLeft":centre+"px"};
  	$(".super-content").animate(attr,0,func);
}*/	

// Go to current time
function goToNow() {
	var timeline = parseInt($(".timeline").css("left"), 10);
	var offset = $(window).width()/2;
	var pos = (timeline - offset);
  	var attr = {"scrollLeft":pos+"px"};
  	$(".super-content").animate(attr,0);
}

Drupal.behaviors.fn_epg = {
  attach: function (context, settings) {
      $(".view-epg").once(function() {
          fn_epg_init();
          addPopupEvents();
      });
  }
};
  
function fn_epg_init() {
	$("body").removeClass("no-js").addClass("js");
	goToNow();

	// borrowed from jQuery easing plugin
	// http://gsgd.co.uk/sandbox/jquery.easing.php
	$.easing.elasout = function(x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	};
	
	// Prevent refresh on navigation
	$("ul.fn_epg_toggle").click(function(e){
		e.preventDefault();
		var link = e.target;
		link.blur();
	});
	
	// Horizontal scroll navigation  
	var $paneTarget = $(".super-content");
	
	// Move 90 mins at a time
	$("li.earlier a").click(function(e){
		e.preventDefault();				
		$paneTarget.stop().scrollTo( {top:"=0",left:"-=540"}, 300);
		$("a.fn_epg_pager_now").removeClass("active");
	});
	
	$("li.later a").click(function(e){
		e.preventDefault();				
		$paneTarget.stop().scrollTo( {top:"=0", left:"+=540"}, 300);
		$("a.fn_epg_pager_now").removeClass("active");
	});
	
	if($("body.page-watchnowhtml").length == 1){
		
	// "On now" button
	if($(".fn_epg_pager_now").parent().prev().hasClass("pager-current")) {
  		$(".fn_epg_pager_now").click(function(e){
  			e.preventDefault();
			e.stopImmediatePropagation();
			goToNow();
    	});
	}
	
 	// Enable drag/swipe 
  	$(".super-content").kinetic({
  		y: false
  	});
  	
  	// Change cursor to drag
  	$(".super-content").mousedown(function() {
  		$(this).css("cursor","move");
		$("a.fn_epg_pager_now").removeClass("active");
      }).mouseup(function(){
      	$(this).css("cursor","default");
     });
  
  	// Enable mousewheel scroll
  	/*
	$(".super-content").mousewheel(function(e, delta) {
      	this.scrollLeft -= (delta * 100);
  		e.preventDefault();
     });
	 */
  	
  	// Toggle shows and recipies
  	$("a.recipes").click(function(e){
  		e.preventDefault();
  		$(this).addClass("active")
  		$("a.shows").removeClass("active");
      	$("li.fn_epg_recipes").show();
  		$("li.fn_epg_show").hide();
    });
  	
  	$("a.shows").click(function(e){
  		e.preventDefault();
  		$(this).addClass("active")
  		$("a.recipes").removeClass("active");
      	$("li.fn_epg_recipes").hide();
  		$("li.fn_epg_show").show();
    });
	
	// Highlight "Today", "Yesterday" and "Tomorrow" on days overlay
	$(".fn_epg_day_type:contains('today')").parent().addClass("today");
	$(".fn_epg_day_type:contains('yesterday')").parent().addClass("yesterday");
	$(".fn_epg_day_type:contains('tomorrow')").parent().addClass("tomorrow");
	
  	// Hide feedback plugin
  	$(window).bind("load", function() {
     	$("#uvTab").removeAttr("style");
  	});
  }	
};
})(jQuery);;
/**
 * extension of standard views based Drupal JCarousel module which, in turn, uses the JQuery jCarousel plugin
 * ONLY works on views that have been given an "extra" class of fn-gallery (see Drupal.behavior below)
 *   such views should attach an identical view to their footers EXCEPT for the "CSS class" which should be overridden and set to none
 *
 * jcarousel.js Drupal module views integration plugin has been patched:
 *   patch 1) to AJAX handle multiple views in the .attachment-after
 *   patch 2) to AJAX copy the entire LI in to the .jcarousel, rather than re-create the content
 *   @TODO: move these patches in to the fn_general patch folder
 * 
 * This module combines:
 *   o) interaction between 2 carousels (main and navi)
 *   o) static initial page load of nodes into 2 jcarousels
 *   o) AJAX preimptive node loading into 2 jcarousels
 *   o) complex inter communication and events between 2 jcarousels 
 *   o) post static and AJAX node load processing for control of display
 */
(function ($){
    //--------------------------------------- init -----------------------------------------------------
    function FN_Gallery(_jFN_Gallery, _view_name) {
       //all fn gallery views REQUIRE a css class set in the main view of fn-gallery
       var self = this;
      
       //settings (could be set through an admin interface = nice to have)
       this.AJAX_LOAD_AHEAD_PAGES = 2;
       this.BUTTON_APPEAR_SPEED   = 400; //slow = 600, fast = 200
      
       //carousel elements
       //NOTE: the .view-content is contained also within the view footer
       this.jFN_Gallery                    = _jFN_Gallery;
       //following args provided by fn_gallery_views_pre_render()
       this.name                           = this.jFN_Gallery.find(".fn-gallery-view-details .name").html();
       this.vid                            = this.jFN_Gallery.find(".fn-gallery-view-details .vid" ).html();
       this.args                           = this.jFN_Gallery.find(".fn-gallery-view-details .args").html();
       this.args_ids                       = this.jFN_Gallery.find(".fn-gallery-view-details .args_ids").html();
       //DOM elements
       this.jCarouselMain                  = this.jFN_Gallery.find(".jcarousel-skin-default:first .jcarousel-container-horizontal");
       this.jCarouselNavi                  = this.jFN_Gallery.find(".attachment-after .jcarousel-skin-default .jcarousel-container-horizontal");
       this.selected_index                 = null;
       this.carousel_button_hide_timer     = null;
       this.jContextMenu                   = this.jFN_Gallery.find(".contextual-links-wrapper"); //standard Drupal contextual menu using MENU_CONTEXT_INLINE from fn_gallery.module
       this.jDrag                          = null;

       //find jQuery carousel global objects
       //Note that the no results view can mean that these are not available
       this.carousel_main         = this.jCarouselMain.find(".jcarousel").data('jcarousel');
       this.carousel_navi         = this.jCarouselNavi.find(".jcarousel").data('jcarousel');
    
       if (this.carousel_main && this.carousel_navi) {
           //slide sorting
           //note that fn_gallery.module will not include the sorting files if the correct permissions are not available
           //and that the PHP sorting function will not run without correct permissions
           //@TODO: move to actual knowledge of permission rather than sorting capability because it might be included by something else   
           if (this.jCarouselNavi.sortable) this.jCarouselNavi.find(".jcarousel").sortable({
             axis:'x',
             start: function(e){self.jDrag = jQuery(this);},
             stop:  function(e){self.navi_sort(e); self.jDrag = null;}
           });
        
           //add in page counter
           //@TODO: should use themeing here instead
           this.jPageCounter = jQuery('<div class="jcarousel-page-counter"></div>');
           this.jCarouselMain.find(".jcarousel-next-horizontal").after(this.jPageCounter);
            
           //post-attach DOM effect events
           this.jCarouselMain.mouseenter(function(e){self.main_mouseenter(jQuery(this), e);});
           this.jCarouselMain.mouseleave(function(e){self.main_mouseleave(jQuery(this), e);});
           //inter-carousel interaction
           this.jCarouselMain.find(".jcarousel-next-horizontal").click(function(e){if ($(this).attr("disabled") != 'true') self.main_buttonCallback(jQuery(this), e);});
           this.jCarouselMain.find(".jcarousel-prev-horizontal").click(function(e){if ($(this).attr("disabled") != 'true') self.main_buttonCallback(jQuery(this), e);});
           //navigation carousel current selection: make a live one because of the dynamic data
           this.jCarouselNavi.find(".jcarousel-item").live("click",      function(e){self.navi_click(jQuery(this), e);});
           //dragging auto-scroll
           this.jCarouselNavi.find(".jcarousel-next-horizontal").mouseenter(function(e){self.navi_next_mouseenter(jQuery(this), e);});
           this.jCarouselNavi.find(".jcarousel-prev-horizontal").mouseenter(function(e){self.navi_prev_mouseenter(jQuery(this), e);});
           //effects
           this.jCarouselNavi.find(".jcarousel-item").live("mouseenter", function(e){self.navi_mouseenter(jQuery(this), e);})
                                                     .live("mouseleave", function(e){self.navi_mouseleave(jQuery(this), e);});
           //exert some control over context menu links
           this.jContextMenu.find("a").live("click", function(e){self.contextMenu_click(jQuery(this).parent("li"), e);});
            
           //post set some jquery carousel callbacks (not available in settings)
           //preemptive ajax ahead load responses
           //note that these ONLY fire when items come in or leave the view
           //NOT on initial static load
           this.carousel_main.options.itemFirstOutCallback = function(e){self.item_first_out(self.carousel_main, e);};
           this.carousel_navi.options.itemFirstOutCallback = function(e){self.item_first_out(self.carousel_navi, e);};
            
           //initialise
           this.select(this.carousel_main.first ? this.carousel_main.first : 1);
           if (!FN_Gallery.persistent_interface_mode) self.button_hide();
       }
    }
    window.FN_Gallery = FN_Gallery; //provide external access to this private class
    
    //Drupal initialise all gallerys
    Drupal.behaviors.fn_gallery = {
      attach: function (context, settings) {
        //javascript added from the module.info file
        //we cannot control weight like this so defer the execution manually
        setTimeout(function(){FN_Gallery.attach();}, 0);
      }
    };
    FN_Gallery.persistent_interface_mode = false;
    FN_Gallery.carousels   = new Object;
    FN_Gallery.get_view_id = function get_view_id(jView) {
      //we index all fn_gallery views in a global object for HTML -> object lookup 
      return jView.attr("class").replace(/.*view-id-([^ ]+).*/, '$1')
    }
    FN_Gallery.attach = function attach() {
        //all fn gallery views REQUIRE a css class set in the main view of fn-gallery
        //note that this runs every time HTML content changes, e.g. AJAX calls
        //once() function marks the HTML element as processed to prevent re-processing
        jQuery(".fn-gallery:not(.fn-gallery-processed)").once("fn-gallery", function() {
          var view_name = FN_Gallery.get_view_id(jQuery(this));
          //lets run with it even if we couldnt get the view name
          FN_Gallery.carousels[view_name] = new FN_Gallery(jQuery(this), view_name);
        });
        
        //this is our new item callback that runs on initial static load and AJAX loads for all slides in the gallery
        //includes existing items that are re-loaded
        //because jCarousel doesnt provide ajaxLoad callbacks
        //but does Drupal.attachBehaviors(...) to new items content
        jQuery(".jcarousel-item:not(.jcarousel-item-processed)").once("jcarousel-item", function() {
          var view_name = FN_Gallery.get_view_id(jQuery(this).parents(".fn-gallery"));
          var fnGallery = FN_Gallery.carousels[view_name];
          //if we cant locate our object then do nothing
          if (view_name && fnGallery) fnGallery.jcarousel_item_behavior(jQuery(this)); 
        });
    }
    FN_Gallery.prototype.toString = function toString() {return 'FN_Gallery:' + this.vid + ':' + this.name + ':' + this.args;}

    //--------------------------------------- direct event methods with inter-carousel processing -----------------------------------------------------
    FN_Gallery.prototype.jcarousel_item_behavior = function jcarousel_item_behavior(jCarouselItem) {
        //this runs for EVERY new loaded slide, initial static and ajax, navi and main, not just the current one
        //NOTE: the loading slide may be the currently selected one because the navi item clicked on wasnt present in the main carousel
        //the entire LI has been re-written, loosing any previous classes
        //so this is where we set them up 
        if (this.item_is_in_nav(jCarouselItem)) this.post_navi_jcarousel_item_load(jCarouselItem);
        else                                    this.post_main_jcarousel_item_load(jCarouselItem);
    }
    FN_Gallery.prototype.navi_click = function navi_click(jCarouselItem, e) {
        var index = this.item_to_index(jCarouselItem);
        this.select(index);
        e.stopPropagation();
    }
    FN_Gallery.prototype.main_buttonCallback = function main_buttonCallback(jButtonNext, e) {
        //the jcarousel gallery will handle the scrolling
        //and set carousel_main.first
        //we simply respond after and select the new slide properly in both carousels by index
        var self = this;
        //defer processing until the carousel has moved
        setTimeout(function(){self.select(self.carousel_main.first);}, 0);
    }

    //--------------------------------------- pure display event methods (do not call any other processing) -----------------------------------------------------
    FN_Gallery.prototype.navi_mouseenter = function navi_mouseenter(jCarouselItem, e) {
        if (!jCarouselItem.hasClass("selected")) jCarouselItem.find("img").animate({opacity:1.0}, "slow");
        e.stopPropagation();
    }
    FN_Gallery.prototype.navi_mouseleave = function navi_mouseleave(jCarouselItem, e) {
        if (!jCarouselItem.hasClass("selected")) jCarouselItem.find("img").animate({opacity:0.6}, "slow");
        e.stopPropagation();
    }
    FN_Gallery.prototype.main_mouseleave = function main_mouseleave(jMain, e) {
        var self = this;
        if (this.carousel_button_hide_timer) clearTimeout(this.carousel_button_hide_timer);
        if (!FN_Gallery.persistent_interface_mode) this.carousel_button_hide_timer = setTimeout(function(){self.button_hide()}, 1000);
        e.stopPropagation();
    }
    FN_Gallery.prototype.button_hide = function button_hide() {
        this.jCarouselMain.find(".jcarousel-next-horizontal").animate({width:'0px'},'slow');
        this.jCarouselMain.find(".jcarousel-prev-horizontal").animate({width:'0px'},'slow');
        this.jPageCounter.slideUp("slow");
        this.carousel_button_hide_timer = null;
    }
    FN_Gallery.prototype.main_mouseenter = function main_mouseenter(jMain, e) {
        if (!FN_Gallery.persistent_interface_mode) {  
          this.jCarouselMain.find(".jcarousel-next-horizontal").animate({width:'50px'}, this.BUTTON_APPEAR_SPEED);
          this.jCarouselMain.find(".jcarousel-prev-horizontal").animate({width:'50px'}, this.BUTTON_APPEAR_SPEED);
          if (this.carousel_button_hide_timer) {
              clearTimeout(this.carousel_button_hide_timer);
              this.carousel_button_hide_timer = null;
          }
        }
        this.jPageCounter.slideDown("slow");
        e.stopPropagation();
    }

    //--------------------------------------- inter-carousel synchronisation -----------------------------------------------------
    FN_Gallery.prototype.select = function select(index) {
        //all selection must come directly to this function
        //which will ensure that the 2 carousels are scrolled to the correct position
        //and highlight the correct slide
        //post-AJAX-load functions will also do this in the case that the selected slides are not already loaded in both carousels
        
        //immediately unload previous slide if it has memory intensive things 
        if (this.selected_index) {
            //find main carousel item
            var jCarouselMainPrevItemSelected = this.index_to_item(this.jCarouselMain, this.selected_index);
  
            //see if it has an object
            if (jCarouselMainPrevItemSelected.find("object").length) {
                this.destroy_slide(this.carousel_main, jCarouselMainPrevItemSelected);
            }
        }
          
        this.selected_index = index; 
  
        //get the carousels to scroll to the new selection (if there)
        this.main_show(this.selected_index);
        this.navi_show(this.selected_index);
        
        //change CSS on selected slides (if there)
        this.main_highlight(this.selected_item_in_main());
        this.navi_highlight(this.selected_item_in_navi());
    }
    FN_Gallery.prototype.main_show = function main_show(index) {
        //scroll main carousel
        this.carousel_main.scroll(index, true);
    }
    FN_Gallery.prototype.navi_show = function navi_show(index) {
        //scroll navi carousel
        //to the centre, if possible
        var scrollTo = index - 2 < 1 ? 1 : index - 2;
        this.carousel_navi.scroll(scrollTo, true);
    }
    FN_Gallery.prototype.post_main_jcarousel_item_load = function post_main_jcarousel_item_load(jCarouselItem) {
        //new main jcarousel-item loaded
        //this may be an AJAX loaded situation so we need to check the status of this slide
        if (this.item_to_index(jCarouselItem) == this.selected_index) this.main_highlight(jCarouselItem);
    }
    FN_Gallery.prototype.post_navi_jcarousel_item_load = function post_navi_jcarousel_item_load(jCarouselItem) {
        //new navi jcarousel-item loaded
        //this may be an AJAX loaded situation so we need to check the status of this slide
        if (this.item_to_index(jCarouselItem) == this.selected_index) this.navi_highlight(jCarouselItem);
    }
    FN_Gallery.prototype.item_first_out = function item_first_out(carousel, e) {
        //BOTH carousels trigger this event
        //This fires on itemIn and itemOut events, NOT on load
        //THIS happens BEFORE:
        //  preemptive ajax loading
        //  loading of associated slides in other associated carousels (that may need selecting)
        //use this.jcarousel_item_behavior() to respond to newly arriving slides (via behaviors)
        
        //preemptively ajax call the next page also to prepare the next view
        //need to use the Drupal ajax loader to take advantage of its views knowledge
        carousel.last += carousel.pageSize * this.AJAX_LOAD_AHEAD_PAGES;
        Drupal.jcarousel.ajaxLoadCallback(carousel);
        
        //select the main slide if we have it already
        //the this.jcarousel_item_behavior() will handle new ajax loaded selected slides
        //if (jCarouselMainItem = this.selected_item_in_main()) this.main_highlight(jCarouselMainItem);

        //sorting going over next buttons can screw up the positioning
        if (this.jDrag) this.jCarouselNavi.find(".jcarousel").sortable( "refreshPositions" );

        //external banners and stuff
        if (window.refreshBanners && carousel == this.carousel_main) {
          window.refreshBanners(carousel.last);
        }
        if (window.omPGClickEvent && carousel == this.carousel_main) {
          var t = this.item_to_nodeid(this.index_to_item(this.jCarouselNavi, this.selected_index));  //holds the nid of the slide on display
          omPGClickEvent(t);
        }
    }

    //--------------------------------------- CSS and display updates -----------------------------------------------------
    FN_Gallery.prototype.main_highlight = function main_highlight(jCarouselItem, e) {
        //this newly loaded slide is the selected one
        //remove previous selections
        this.jCarouselMain.find(".jcarousel-item.selected").removeClass("selected");

        //select the new one
        jCarouselItem.addClass("selected");

        //video aware modes
        if (jCarouselItem.hasClass('fn-gallery-video')) this.jFN_Gallery.addClass(   'fn-gallery-video');
        else                                            this.jFN_Gallery.removeClass('fn-gallery-video');
    }
    FN_Gallery.prototype.navi_highlight = function navi_highlight(jCarouselItem, e) {
        //this newly loaded slide is the selected one
        //remove previous selections
        this.jCarouselNavi.find(".jcarousel-item.selected").removeClass("selected").find("img").css('opacity', '');
        
        //select the new one
        jCarouselItem.addClass("selected");
        jCarouselItem.find("img").css('opacity', '');

        //update the page counter
        this.jPageCounter.html(this.item_to_index(jCarouselItem) + " / " + this.carousel_main.size()); 
    }
    
    //--------------------------------------- administration control including sorting and editing -----------------------------------------------------
    FN_Gallery.prototype.contextMenu_click = function contextMenu_click(jCommandLI, e) {
        var self = this;
        
        //process ajax context menu links
        if (jCommandLI.attr("class").match(/ajax/)) {
            var jA   = jCommandLI.find("a");
            var url  = jA.attr("href");                  //find in-built link
            var urlp = url.replace(/\?.*/, '');          //remove ?destination
            urlp    += '/' + this.name + '/' + this.args;// + '/' + this.args_ids; //and add some extra parameters (can't control this with the hook_menu()) 
        
            //stop link navigation and execute it in ajax instead
            e.preventDefault();
						
            jQuery.ajax({
                url:urlp,
                dataType:'json',
                success:function(data, status, jqXHR){self.contextMenu_click_callback(jCommandLI, data, status, jqXHR);},
                error:function(){alert('oops, didn\'t quite manage that task. please call support');}
            });
        }
    }
    FN_Gallery.prototype.contextMenu_click_callback = function contextMenu_click_callback(jCommandLI, data, status, jqXHR) {
        if (data.message) alert(data.message);
        else {
            var jCarouselMainItem = jCommandLI.closest(".jcarousel-item");
            var index             = this.item_to_index(jCarouselMainItem); 
            var jCarouselNaviItem = this.index_to_item(this.jCarouselNavi, index);
            
            //class management
            if (data.removeClass) {jCarouselMainItem.removeClass(data.removeClass); jCarouselNaviItem.removeClass(data.removeClass);}
            if (data.addClass)    {jCarouselMainItem.addClass(data.addClass);       jCarouselNaviItem.addClass(data.addClass);}
            
            //other: be careful with XSS here
            if (data.reload)      this.reload(jCarouselMainItem);8
            if (data.navigate)    document.location = document.location.protocol + '//' + document.location.host + data.navigate;
            if (data.overlay)     document.location = document.location.protocol + '//' + document.location.host + document.location.pathname + '#overlay=' + data.overlay;
        }
    } 
    FN_Gallery.prototype.navi_sort = function navi_sort() {
        var self = this;
        
        //nodeid items
        var nids = [];
        this.jCarouselNavi.find(".jcarousel-item").each(function(){
            if (nid = self.item_to_nodeid(jQuery(this))) nids.push(parseInt(nid));
        });
        
        if (nids.length) {
            jQuery.ajax({
                url: '/fn_gallery/' + this.name + '/' + this.args + '/ajax/resort/' + nids + '/' + this.item_to_nodeid(this.jDrag),
                complete: function(jqXHR, textStatus){self.navi_sort_callback(jqXHR, textStatus);}
            });
        } else alert('can not sort these node types cause the node id is not found by the somewhat subjective FN_Gallery.prototype.item_to_nodeid()');
    }
    FN_Gallery.prototype.navi_sort_callback = function navi_sort_callback(jqXHR, textStatus) {
        var self = this;
        this.jCarouselNavi.animate({opacity:'0.5'}, {complete:function(){
            self.jCarouselNavi.animate({opacity:'1.0'}, 'slow');
        }}, 'slow');
        ;
    }
    FN_Gallery.prototype.navi_next_mouseenter = function navi_next_mouseenter(jCarouselItem, e) {
        if (this.jDrag) this.carousel_navi.next();
    }
    FN_Gallery.prototype.navi_prev_mouseenter = function navi_prev_mouseenter(jCarouselItem, e) {
        if (this.jDrag) this.carousel_navi.prev();
    }
    
    //--------------------------------------- utility and information functions -----------------------------------------------------
    FN_Gallery.prototype.selected_item_in_navi = function selected_item_in_navi() {
        return this.index_to_item(this.jCarouselNavi, this.selected_index);
    }
    FN_Gallery.prototype.selected_item_in_main = function selected_item_in_main() {
        return this.index_to_item(this.jCarouselMain, this.selected_index);
    }
    FN_Gallery.prototype.destroy_slide = function destroy_slide(carousel, jCarouselItem) {
      var index = this.item_to_index(jCarouselItem);
      jCarouselItem
        .addClass('jcarousel-item-placeholder')
        .addClass('jcarousel-item-placeholder-horizontal')
        .empty();
      //carousel.remove(index); //dont think this is necessary: in fact it causes COMPLETE removal of LI
    }
    FN_Gallery.prototype.item_is_in_nav = function item_is_in_nav(jCarouselItem) {
      return jCarouselItem.parents(".attachment-after").length == 1;
    }
    FN_Gallery.prototype.index_to_item = function index_to_item(jCarousel, index) {
      return jCarousel.find(".jcarousel-item-" + index);
    }
    FN_Gallery.prototype.item_to_index = function item_to_index(jCarouselItem) {
      return parseInt(jCarouselItem.attr("jcarouselindex"));
    }
    FN_Gallery.prototype.reload = function reload(jCarouselItem) {
        //@TODO: implement (this doesnt work yet, but isnt used)
        //leave the user to decide when to refresh the carousel
        var nodeid = this.item_to_nodeid(jCarouselItem);
        this.carousel_main.reset();
        this.carousel_main.reload();
        this.carousel_navi.reset();
        this.carousel_navi.reload();
        //this.scrollToNodeID(nodeid);
    }
    FN_Gallery.prototype.item_to_nodeid = function item_to_nodeid(jCarouselItem) {
        //assuming node output style here
        //@TODO: put a nodeid in hook_node_load()
        var nid, jArticle = jCarouselItem.find("div:first");
        if (aid = jArticle.attr("id")) nid = aid.replace(/[^0-9]/g, '');
        return nid;
    }
    FN_Gallery.prototype.nodeid_to_item = function nodeid_to_item(nodeid, jCarousel) {
        if (!jCarousel) jCarousel = this.jCarouselNavi;
        return jCarousel.find("div[id=node-" + nodeid + "]").closest(".jcarousel-item");
    }
    FN_Gallery.prototype.scrollToNodeID = function scrollToNodeID(nodeid) {
        var index, jCarouselItem;
        if (jCarouselItem = this.nodeid_to_item(nodeid)) {
            index = this.item_to_index(jCarouselItem);
            this.navi_show(index);
            this.carousel_main.scroll(index, true);
        }
    }
})(jQuery);
;
