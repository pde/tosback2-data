/**
 * extension of standard views based carousel plugin
 * note that jcarousel.js Drupal module views integration plugin has been patched
 * 1) to AJAX handle multiple views in the .view-footer
 * 2) to AJAX copy the entire LI in to the .jcarousel, rather than re-create the content 
 */
//---------------------------------------------------------------------------------------------------------------
(function ($){
    function FN_Gallery(_jFN_Gallery, _view_name) {
       //all fn gallery views REQUIRE a css class set in the main view of fn-gallery
       var self = this;
      
       //settings (could be set through an admin interface = nice to have)
       this.AJAX_LOAD_AHEAD_PAGES = 2;
       this.BUTTON_APPEAR_SPEED   = 400; //slow = 600, fast = 200
      
       //carousel elements
       //NOTE: the .view-content is contained also within the view footer
       this.jFN_Gallery                   = _jFN_Gallery;
       //following args provided by fn_gallery_views_pre_render()
       this.name                           = this.jFN_Gallery.find(".fn-gallery-view-details .name").html();
       this.vid                            = this.jFN_Gallery.find(".fn-gallery-view-details .vid" ).html();
       this.args                           = this.jFN_Gallery.find(".fn-gallery-view-details .args").html();
       this.args_ids                       = this.jFN_Gallery.find(".fn-gallery-view-details .args_ids").html();
       //DOM elements
       this.jCarouselMain                  = this.jFN_Gallery.find(".jcarousel-skin-default:first .jcarousel-container-horizontal");
       this.jCarouselNavi                  = this.jFN_Gallery.find(".view-footer .jcarousel-skin-default .jcarousel-container-horizontal");
       this.jCarouselNaviItemSelected      = null;
       this.jCarouselNaviPrevItemSelected  = null;
       this.carousel_button_hide_timer     = null;
       this.jContextMenu                   = this.jFN_Gallery.find(".contextual-links-wrapper");
       this.jDrag                          = null;

       //find jQuery carousel global objects
       //Note that the no results view can mean that these are not available
       this.carousel_main         = this.jCarouselMain.find(".jcarousel").data('jcarousel');
       this.carousel_navi         = this.jCarouselNavi.find( ".jcarousel").data('jcarousel');
    
       if (this.carousel_main && this.carousel_navi) {
           //slide sorting
           if (this.jCarouselNavi.sortable) this.jCarouselNavi.find(".jcarousel").sortable({
             axis:'x',
             start: function(e){self.jDrag = jQuery(this);},
             stop:  function(e){self.navi_sort(e); self.jDrag = null;}
           });
        
           //post set some jquery carousel callbacks (not available in settings)
           //preemptive ajax ahead load        
           this.carousel_main.options.itemFirstOutCallback = function(e){self.moved(self.carousel_main, e);};
           this.carousel_navi.options.itemFirstOutCallback = function(e){self.moved(self.carousel_navi, e);};
            
           //add in page counter
           //@TODO: should use themeing here instead
           this.jPageCounter = jQuery('<div class="jcarousel-page-counter"></div>');
           this.jCarouselMain.find(".jcarousel-next-horizontal").after(this.jPageCounter);
            
           //post-attach DOM effect events
           this.jCarouselMain.mouseenter(function(e){self.main_mouseenter(jQuery(this), e);});
           this.jCarouselMain.mouseleave(function(e){self.main_mouseleave(jQuery(this), e);});
           //inter-carousel interaction
           this.jCarouselMain.find(".jcarousel-next-horizontal").click(function(e){self.main_buttonNextCallback(jQuery(this), e);});
           this.jCarouselMain.find(".jcarousel-prev-horizontal").click(function(e){self.main_buttonPrevCallback(jQuery(this), e);});
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
            
           //initialise
           this.navi_show(this.carousel_main.first);
           this.button_hide();
       }
    }
    
    FN_Gallery.carousels = new Object;
    FN_Gallery.attach = function attach() {
        //all fn gallery views REQUIRE a css class set in the main view of fn-gallery
        //note that this runs every time HTML content changes, e.g. AJAX calls
        //once() function marks the HTML element as processed to prevent re-processing
        jQuery(".fn-gallery").once("fn-gallery", function() {
          var view_name    = jQuery(this).attr("class").replace(/.*view-id-([^ ]+).*/, '$1');
          FN_Gallery.carousels[view_name] = new FN_Gallery(jQuery(this), view_name);
        });
    }
    FN_Gallery.prototype.toString = function toString() {return 'FN_Gallery:' + this.vid + ':' + this.name + ':' + this.args;} 
    FN_Gallery.prototype.navi_click = function navi_click(jCarouselItem, e) {
        //scroll main view
        var index         = parseInt(jCarouselItem.attr("jcarouselindex"));
        this.carousel_main.scroll(index, true);
    
        //select current    
        this.navi_select(jCarouselItem);
        e.stopPropagation();
    }
    FN_Gallery.prototype.contextMenu_click = function contextMenu_click(jCommandLI, e) {
        var self = this;
        
        //process ajax context menu links
        if (jCommandLI.attr("class").match(/ajax/)) {
            var jA   = jCommandLI.find("a");
            var url  = jA.attr("href");                  //find in-built link
            var urlp = url.replace(/\?.*/, '');          //remove ?destination
            urlp    += '/' + this.name + '/' + this.args + '/' + this.args_ids; //and add some extra parameters (can't control this with the hook_menu()) 
        
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
            var index             = jCarouselMainItem.attr("jcarouselindex"); 
            var jCarouselNaviItem = this.jCarouselNavi.find(".jcarousel-item-" + index);
            
            //class management
            if (data.removeClass) {jCarouselMainItem.removeClass(data.removeClass); jCarouselNaviItem.removeClass(data.removeClass);}
            if (data.addClass)    {jCarouselMainItem.addClass(data.addClass);       jCarouselNaviItem.addClass(data.addClass);}
            
            //other: be careful with XSS here
            if (data.reload)      this.reload(jCarouselMainItem);
            if (data.navigate)    document.location = document.location.protocol + '//' + document.location.host + data.navigate;
            if (data.overlay)     document.location = document.location.protocol + '//' + document.location.host + document.location.pathname + '#overlay=' + data.overlay;
        }
    } 
    FN_Gallery.prototype.reload = function reload(jCarouselItem) {
        //@TODO: implement
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
        //@TODO: put a nodeid in hook_node_load
        var nid, jArticle = jCarouselItem.find("article:first");
        if (aid = jArticle.attr("id")) nid = aid.replace(/[^0-9]/g, '');
        return nid;
    }
    FN_Gallery.prototype.nodeid_to_item = function nodeid_to_item(nodeid, jCarousel) {
        if (!jCarousel) jCarousel = this.jCarouselNavi;
        return jCarousel.find("article[id=node-" + nodeid + "]").closest(".jcarousel-item");
    }
    FN_Gallery.prototype.scrollToNodeID = function scrollToNodeID(nodeid) {
        var index, jCarouselItem;
        if (jCarouselItem = this.nodeid_to_item(nodeid)) {
            index = jCarouselItem.attr("jcarouselindex");
            this.navi_show(index);
            this.carousel_main.scroll(index, true);
        }
    }
    FN_Gallery.prototype.navi_sort = function navi_sort() {
        var self = this;
        
        //nodeid items
        var nids = [];
        this.jCarouselNavi.find(".jcarousel-item").each(function(){
            if (nid = self.item_to_nodeid(jQuery(this))) {
                nids.push(parseInt(nid));
            }
        });
        
        if (nids.length) {
            jQuery.ajax({
                url: '/fn_gallery/' + this.name + '/' + this.args + '/ajax/resort/' + nids + '/' + this.item_to_nodeid(this.jDrag),
                complete: function(jqXHR, textStatus){self.navi_sort_callback(jqXHR, textStatus);},
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
    FN_Gallery.prototype.navi_mouseenter = function navi_mouseenter(jCarouselItem, e) {
        if (!jCarouselItem.hasClass("selected")) jCarouselItem.find("img").animate({opacity:1.0}, "slow");
        e.stopPropagation();
    }
    FN_Gallery.prototype.navi_mouseleave = function navi_mouseleave(jCarouselItem, e) {
        if (!jCarouselItem.hasClass("selected")) jCarouselItem.find("img").animate({opacity:0.6}, "slow");
        e.stopPropagation();
    }
    FN_Gallery.prototype.navi_select = function navi_select(jCarouselItem, e) {
        //select the navigation slide
        if (this.jCarouselNaviItemSelected) this.jCarouselNaviItemSelected.removeClass("selected").find("img").css('opacity', '');
        jCarouselItem.addClass("selected");
        jCarouselItem.find("img").css('opacity', '');
        this.jCarouselNaviPrevItemSelected = this.jCarouselNaviItemSelected;
        this.jCarouselNaviItemSelected     = jCarouselItem; 
        
        this.jPageCounter.html(jCarouselItem.attr("jcarouselindex") + " / " + this.carousel_main.size()); 
    }
    FN_Gallery.prototype.main_buttonNextCallback = function main_buttonNextCallback(jButtonNext, e) {
        var self = this;
        //defer processing until the carousel has moved
        if (jButtonNext.attr("disabled") != 'true') setTimeout(function(){self.navi_show(self.carousel_main.first);}, 0);
    }
    FN_Gallery.prototype.main_buttonPrevCallback = function main_buttonPrevCallback(jButtonPrev, e) {
        var self = this;
        //defer processing until the carousel has moved
        if (jButtonPrev.attr("disabled") != 'true') setTimeout(function(){self.navi_show(self.carousel_main.first);}, 0);
    }
    FN_Gallery.prototype.main_mouseenter = function main_mouseenter(jMain, e) {
        this.jCarouselMain.find(".jcarousel-next-horizontal").animate({width:'50px'}, this.BUTTON_APPEAR_SPEED);
        this.jCarouselMain.find(".jcarousel-prev-horizontal").animate({width:'50px'}, this.BUTTON_APPEAR_SPEED);
        this.jPageCounter.slideDown("slow");
        if (this.carousel_button_hide_timer) {
            clearTimeout(this.carousel_button_hide_timer);
            this.carousel_button_hide_timer = null;
        }
        e.stopPropagation();
    }
    FN_Gallery.prototype.main_mouseleave = function main_mouseleave(jMain, e) {
        var self = this;
        if (this.carousel_button_hide_timer) clearTimeout(this.carousel_button_hide_timer);
        this.carousel_button_hide_timer = setTimeout(function(){self.button_hide()}, 1000);
        e.stopPropagation();
    }
    FN_Gallery.prototype.button_hide = function button_hide() {
        this.jCarouselMain.find(".jcarousel-next-horizontal").animate({width:'0px'},'slow');
        this.jCarouselMain.find(".jcarousel-prev-horizontal").animate({width:'0px'},'slow');
        this.jPageCounter.slideUp("slow");
        this.carousel_button_hide_timer = null;
    }
    FN_Gallery.prototype.navi_show = function navi_show(index) {
        var scrollTo = index - 2 < 1 ? 1 : index - 2;
        var jCarouselItem = this.jCarouselNavi.find(".jcarousel-item-" + index);
        this.carousel_navi.scroll(scrollTo, true);
        this.navi_select(jCarouselItem);
    }
    FN_Gallery.prototype.moved = function moved(carousel, e) {
        //preemptively ajax call the next page also to prepare the next view
        //need to use the Drupal ajax loader to take advantage of its views knowledge
        carousel.last += carousel.pageSize * this.AJAX_LOAD_AHEAD_PAGES;
        Drupal.jcarousel.ajaxLoadCallback(carousel);
        
        //unload previous slide if it has memory intensive things 
        if (this.jCarouselNaviPrevItemSelected) {
            //find main carousel item
            var index                         = this.jCarouselNaviPrevItemSelected.attr("jcarouselindex");
            var jCarouselMainPrevItemSelected = this.jCarouselMain.find(".jcarousel-item-" + index);

            //see if it has an object
            if (jCarouselMainPrevItemSelected.find("object").length) {
                jCarouselMainPrevItemSelected.empty();
                this.carousel_main.remove(index); 
            }
        }
        
        //video aware modes
        if (this.jCarouselNaviItemSelected.hasClass('fn-gallery-video')) this.jFN_Gallery.addClass('fn-gallery-video');
        else                                                         this.jFN_Gallery.removeClass('fn-gallery-video');
        
        //sorting going over next buttons can screw up the positioning
        if (this.jDrag) this.jCarouselNavi.find(".jcarousel").sortable( "refreshPositions" );

        //external banners and stuff
        if (window.refreshBanners && carousel == this.carousel_main) window.refreshBanners(carousel.last);
    }
    
    //initialise all gallerys
    Drupal.behaviors.fn_gallery = {
      attach: function (context, settings) {
        //javascript added from the module.info file
        //we cannot control weight like this so defer the execution manually
        setTimeout(function(){FN_Gallery.attach();}, 0);
      }
    };
})(jQuery);
;
