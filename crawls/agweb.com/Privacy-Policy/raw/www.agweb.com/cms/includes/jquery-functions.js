var itemTimer;

jQuery(function($) {

// Your code using failsafe $ alias here...
//    	$("div.GalleryContainer").equalHeights(true);
//    	$(".GalleryContainer .galleryItem:nth-child(4)").after("<div class='clear'>&nbsp;</div>");


	$('#machineGallery').after('<ul id="machineNav">').cycle({ 
	    fx:     'turnDown', 
	    speed:  'fast', 
	    timeout: 0, 
	    pager:  '#machineNav', 

	    // callback fn that creates a thumbnail to use as pager anchor 
	    pagerAnchorBuilder: function(idx, slide) { 
		return '<li><a href="#"><img src="' + slide.src + '" width="92" height="69" /></a></li>'; 
	    } 
	});

	$("#treeNav").treeview({
		animated: "fast",
		collapsed: true,
		unique: true,
		persist: "cookie",
		toggle: function() {
			window.console && console.log("%o was toggled", this);
		}
	});

	$(document).pngFix(); 

	$(function() { //on DOM ready
		$("#scroller").simplyScroll({
		    autoMode: 'loop',
		    frameRate: 50
		});
	});
   	
    	$("#tabs").tabs();

	 /*$(".mainNav .mainLink").each(function(i) {
		var sub = $(this).siblings(".sub");
		var rollover = $(this);
		$(this).parents("li").hoverIntent(function(){
			$(this).find('.sub').stopTime("menuDelay").oneTime(500, "menuDelay", function(){
				sub.css({'left':'-1px'}).bgiframe();
				rollover.addClass("active");
			});
		}, function() {
			$(this).find('.sub').stopTime("menuDelay").oneTime(250, "menuDelay", function(){
				sub.css({'left':'-9999em'});
				rollover.removeClass("active");
			});
		});
		
	});*/
	
	$('ul.navBar li').mouseover(function(){
				$(this).find('.sub').stopTime("menuDelay").oneTime(500, "menuDelay", function(){
					$(this).show();
					$(this).parents("li").find('.mainLink').addClass("active");
				});
		});
		
	$('ul.navBar li').mouseout(function(){
			$(this).find('.sub').stopTime("menuDelay").oneTime(250, "menuDelay", function(){
					$(this).hide();
					$(this).parents("li").find('.mainLink').removeClass("active");
				});
	});

	$("ul.navBar").children("li:first").addClass("first"); 

	$("ul.lnav").children("li:last").addClass("lastLi"); 

    
    $(".container").equalHeights();
    $(".enterZip").live("click", function() {
        $(this).parent().siblings(".shipData").toggle();
        return false;
    });

    $("ul.sf-menu").superfish({
        animation: { height: 'show' },
        speed: 300,
        autoArrows: false,
        dropShadows: false
    }).find("ul").bgIframe();

    $(".itemRow").equalHeights(true);
    $(".modCarousel .items").equalHeights(true);
    $(".columnRow").equalHeights(true);

    $(".itemWrapper ul.swatchList li a").live("mouseover", function() {
        $(this).parents(".swatchList").find("a").removeClass("active");
        $(this).addClass("active");
        var newImg = $(this).find(".swatchAlt").html();
        $(this).parents(".itemWrapper").find(".itemImage").attr({ src: newImg });
    });

    $('.altViews li a').live("click", function() {
        //the new image
        var newimg = $(this).attr("href");

        //update active status
        var altViews = $(".altViews li")
        altViews.each(function(i) {
            var children = altViews.eq(i).children("a");
            children.each(function(j) {
            if (newimg.replace('/large/', '').replace('/regular/', '') == children.eq(j).attr("href").replace('/large/', '').replace('/regular/', '')) {
                    children.eq(j).addClass("active");
                } else {
                    children.eq(j).removeClass("active");
                }
            });
        });

        //find the regular image
        $(".productImage img.mainImage").attr({ src: newimg.replace('/large/', '/regular/') });

        //find the large image
        $(".imageViewer .mainImage img").attr({ src: newimg.replace('/regular/', '/large/') });

        return false;
    });

    //Banner slide show
    $("#homeSSW").cycle({
        fx: 'fade',
        speed: 300,
        timeout: 5000,
        pager: '.nav'
    });
    $(".sswControls").css({ 'background-color': '#fff', 'opacity': '0.9' });

    $(".truncate").truncate({
        max_length: 400,
        more: "read more",
        less: "read less"
    });

    // dialog windows 
    $(".uiModal").dialog({
        autoOpen: false,
        width: "720px",
        bgiframe: true,
        modal: true,
        resizable: false,
        live: false,
        buttons: {
            Close: function() {
                $(this).dialog('close');
            }
        }
    });

    $(".uiDialog").dialog({
        autoOpen: false,
        width: "720px",
        bgiframe: true,
        modal: false,
        resizable: false,
        buttons: {
            Close: function() {
                $(this).dialog('close');
            }
        }
    });

    $(".pageTools .recent").live("click", function() {
        $(".recentDialog").dialog("open");
        return false;
    });

    $(".productImage .btnEnlarge").live("click", function() {
        $(".enlargeView").dialog("open");
        return false;
    });
    // END dialog windows 

    $(".tabModule .tabsRow").tabs();
    $(".cartSupport .supportTabs").tabs();

    // carousels 
    $(".modCarousel4 .scrollable").scrollable({
        size: 4,
        items: ".items",
        clickable: false
    });


    $(".modCarousel5 .scrollable").scrollable({
        size: 5,
        items: ".items",
        clickable: false
    });

    $(".scrollable").each(function() {
        var mcHeight = $(".itemWrapper:first", this).height();
        $(this).css({ 'height': mcHeight });
    });
    // END carousels 

    $(".swatchList a").cluetip({
        cluetipClass: 'swatch',
        width: '178px',
        positionBy: 'fixed',
        topOffset: '-122px',
        leftOffset: '-115px',
        local: true,
        dropShadow: false,
        showTitle: false
    });

    // Item Added to Cart Slider
    $("#item-dialog").mouseover(function() { clearTimeout(itemTimer); });
    $("#item-dialog").mouseout(function() { itemTimer = setTimeout(function() { hideItemSlider(); }, 1500); });
    // END Item Added


  $(".tooltip").tooltip({ 
	    // tweak the position 
	    offset: [-20, 200], 
            // use "slide" effect 
    	    effect: 'slide', 
       	    position: 'bottom center',
  	    relative:  	true
  }).dynamic( { 
        // customized configuration on bottom edge 
        bottom: { 
            direction: 'down',  
            bounce: true 
        },
        right: { 
            direction: 'right',  
            bounce: true 
        } 
});
    
    
     $(".tooltipadmin").tooltip({ 
    	    // tweak the position 
    	    offset: [-2,1], 
            position: 'bottom center',
      	    relative:  	true
      }).dynamic( { 
            // customized configuration on bottom edge 
            bottom: { 
                direction:'down',  
                bounce: true
            },
            right: { 
                direction: 'right',  
                bounce: true 
            } 
    });
    
  
    $(".mod_landing_gal li").matchHeights();
    
});
function showItemSlider() {
    clearTimeout(itemTimer);
    $("#item-dialog").slideDown(300);
    itemTimer = setTimeout(function() { hideItemSlider(); }, 5000);
}
function hideItemSlider() {
    $("#item-dialog").slideUp(150);
}



// This function modifies all flash elements to include the "wmode=transparent" //
$(document).ready(function() {

	// FF //

	$("embed").attr("wmode", "transparent");
	
	// IE //

	/*window.fix_wmode2transparent_swf = function () {

		// For Internet Explorer
		jQuery("object").each(function (i) {

			var algo = jQuery(this).context.attributes;

			var str_tag = '<OBJECT ';

			for (var i=0; i < algo.length; i++) {
				str_tag += algo[i].name + '="' + algo[i].value + '" '
			}

			str_tag += '>';

			var flag = false;

			jQuery(this).children().each(function (elem) {
				if (jQuery(this).attr("NAME") == "wmode") {
					flag=true;
					str_tag += '<PARAM NAME="' + jQuery(this).attr("NAME") + '" VALUE="transparent">';
				} else {
					str_tag += '<PARAM NAME="' + jQuery(this).attr("NAME") + '" VALUE="' + jQuery(this).attr("VALUE") + '">'
				}
			});

			if(!flag) str_tag += '<PARAM NAME="wmode" VALUE="transparent">';

			str_tag += '</OBJECT>';

			jQuery(str_tag).insertAfter(this);

			jQuery(this).remove();

		});
	}

	if ($.browser.msie) window.fix_wmode2transparent_swf();*/

});