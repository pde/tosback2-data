//var $j = jQuery.noConflict();

/* Opens a popup at the specified position */
function initializePopup(popupId, isModal, relativeId, position) {
	if(!isModal){isModal = false;}
	if(!position || !relativeId){$('#'+popupId).dialog({modal : isModal}); return;}
	
	var tempPosition = $('#'+relativeId).position();
	var width = relativeId.outerWidth();
	var height = relativeId.outerHeight();
	
	var xCoord = 0;
	var yCoord = 0;
	switch(position) {
		case "right" : 
			xCoord = tempPosition.left + width + 10;
			yCoord = tempPosition.top - 10;
			$('#'+popupId).dialog({ position : [xCoord, yCoord], modal : isModal });
			break;
		case 'plp-header' : 
			break;
		default : 
			$('#'+popupId).dialog({modal : isModal});
			break;	
	}
}

$(document).ready(function(){
	/* Mega Menu Sizing  */
	$('.megamenu .submenu-content').each(function(){
		$(this).width($(this).children('ul').length * 166 + 11 - 7);
		if($(this).children('.submenu-list-right').children('li').length <= 0){
			$(this).css('background','#ffffff').width($(this).width()-159);
		}
	});

    $('.util-nav>.left').click(function(){
        $('.util-nav>.left').toggleClass('hidden');
    });
	
    //Placeholder code for showing visual elements
    $('.footer-link .expand, .footer-link .expandSectionHeader').click(function(){
    	$(this).closest('.footer-links').toggleClass('active'); 
    	return false;
    });
    $('.tool-search').parent().hover(function(){
        $(this).children('.autocomplete').addClass('active');
    }, function(){
        $(this).children('.autocomplete').removeClass('active');
    });
    //Not using the :hover qualifier in css because it only applies to anchors in IE7. Sigh.
    $('.modal .link').focus(function(){
        $('.modal').removeClass('active');
        $(this).parent().addClass('active');
    });
    $('.modal .modal-content a, .modal .minitools a').focus(function(){
        //console.log(this);
        //console.log($(this).closest('.modal'));
        $('.modal').removeClass('active');
        $(this).closest('.modal').addClass('active');
    });
    $('.modal').hover(function(){
        $(this).addClass('active');
    }, function(){
        $(this).removeClass('active');
    });

    var index = 0;
    $('.megamenu .menu').hover(function(){
        $(this).addClass('active');
        megamenu_position(this, $(this).children('.submenu'));
    }, function(){
        $(this).removeClass('active');
        megamenu_revert($(this).children('.submenu'));
    });

    /* Scripts for cycling the modal dialogs */
    $('.modal-content, .minitools').css('display','none');
    $('.modal-content:first-child').css('display','').addClass('vis').next('.minitools').css('display','');

    $('.accordion a').click(function(){
        $(this).parent().toggleClass('active');
        if ($(this).parent().hasClass('active')){
        	if ($(this).attr('id')=='paymentOptions'){
        		$(this).html('Hide Payment Options');
        	}
        }else{
        	if($(this).attr('id')=='paymentOptions'){
        		$(this).html('Additional Payment Options');
        	}
        }
        return false;
    });
    $('.pip-tabset-container .tabset .tab').mouseenter(function(){
        $('.pip-tabset-container .tabset .tab, .pip-tabset-container .tab-content-container .tab-content').removeClass('active');
        $(this).addClass('active');
        $('.pip-tabset-container .tab-content[id='+$(this).attr("name")+']').addClass('active');
    });
    $('.cs-tabset-container .tabset .tab').mouseenter(function(){
        $('.cs-tabset-container .tabset .tab, .cs-tabset-container .tab-content-container .tab-content').removeClass('active');
        $(this).addClass('active');
        $('.cs-tabset-container .tab-content[id='+$(this).attr("name")+']').addClass('active');
    });
   
    //$('.sl-tabset-container .tabset .tab').mouseenter(function(){
    // Used delegate to make it work with dojo refresh area.
    $("body").delegate('.sl-tabset-container .tabset .tab', "mouseenter", function(){	
        $('.sl-tabset-container .tabset .tab, .sl-tabset-container .tab-content-container .tab-content').removeClass('active');
        $(this).addClass('active');
        $('.sl-tabset-container .tab-content[id='+this.title+']').addClass('active');
    });
    
    $('.expand-all').click(function(){
        $(this).parent().parent().find('.accordion').addClass('active');
        return false;
    });
    $('.collapse-all').click(function () {
        $(this).parent().parent().find('.accordion').removeClass('active');
        return false;
    });
    $('.media-img-small').click(function(){$(this).toggleClass('active');});

    $(function () {$('.scrollable').jScrollPane(); });
    
    $('.tab-content#tab1 .section-header .expand-button').click(function(){
    	//$(this).parent().siblings().removeClass('expand');
    	$(this).parent().toggleClass('expand');
        $(this).parent().next().toggleClass('expand');
    });
 
    $('.plp-header-content .expand-button').click(function(){
        togglePLPBanner();
    });
    
    $('.plp-expand').bind('click', function(){
    	if (! $('.plp-header-content .expand-button').parent().hasClass('expand')) {
    		togglePLPBanner();
    	}
    	
    	$('.section-content.expand').removeClass('expand');
    	$('#plp-content-'+$(this).attr('id')).addClass('expand');
    	$('.plp-expand.active-plp-section').removeClass('active-plp-section');
    	$(this).addClass('active-plp-section');
    	if (jwplayer().getState()=="PLAYING")
    		jwplayer().pause();
    }); 
    
    checkPLPBannerState();
});

function checkPLPBannerState() {
	var state = getCookie("last_banner_state");
	var category = getCookie("lastPLPBannerCategory");
	var currentCategory = $('#categoryIdElement').val();
	
	//console.log("State: " + state + " Category: " + category + " currentCategory: " + currentCategory);
	if (currentCategory == category) {
		if (state == "0") {
			collapsePLPBanner();
		}
	}
}

function togglePLPBanner() {
	if ($('.plp-banner-container').hasClass('collapsed')) {
		//console.log("Expanding banner...");
		expandPLPBanner();
	}
	else {
		//console.log("Collapsing banner...");
		collapsePLPBanner();
	}
}

function expandPLPBanner() {
	$('#collapse-expand-text').text('COLLAPSE');
	$('.plp-banner-container').removeClass('collapsed');
	$('.plp-header-content .expand-button').parent().addClass('expand');
	
	var expDt = new Date();
	var categoryId = $('#categoryIdElement').val();
	expDt.setDate(expDt.getDate()+1);
	document.cookie="last_banner_state=1;path=/";
	document.cookie="lastPLPBannerCategory="+categoryId+";path=/";
	//console.log("Setting last_banner_state to 1, lastPLPBannerCategory to " + categoryId);
}

function collapsePLPBanner() {
	$('#collapse-expand-text').text('EXPAND');
	$('.plp-header-content .expand-button').parent().removeClass('expand');
	$('.plp-banner-container').addClass('collapsed');
	
	var expDt = new Date();
	var categoryId = $('#categoryIdElement').val();
	expDt.setDate(expDt.getDate()+1);
	document.cookie="last_banner_state=0;path=/";
	document.cookie="lastPLPBannerCategory="+categoryId+";path=/";
	//console.log("Setting last_banner_state to 0, lastPLPBannerCategory to " + categoryId);
}

function megamenu_position(parent, element) {

	$(element).css('display','block'); //needed for IE7
    var elementCount = $(element).parent().prevAll().length;
    if(elementCount <= 2) {
    	$(element).css('left', '0');
        $(element).css('right','auto');
    } else if(elementCount >= 5) {
    	$(element).css('left', 'auto');
    	$(element).css('right', 0);
    } else {
    	$(element).css('left', 'auto');
        $(element).css('right',0 - $(element).width()/2);
    }

}
function megamenu_revert(element) {
    $(element).css('left','');
    $(element).css('right','');
}

(function ($) {
    $.fn.extend({
        customStyle:function (options) {
            if (!$.browser.msie || ($.browser.msie && $.browser.version > 6)) {
                return this.each(function () {
                    var currentSelected = $(this).find(':selected');
                    $(this).after('<span class="customStyleSelectBox"><span class="customStyleSelectBoxInner">' + currentSelected.text() + '</span></span>').css({position:'absolute', opacity:0, fontSize:$(this).next().css('font-size')});
                    var selectBoxSpan = $(this).next();
                    var selectBoxWidth = parseInt($(this).width()) - parseInt(selectBoxSpan.css('padding-left')) - parseInt(selectBoxSpan.css('padding-right'));
                    var selectBoxSpanInner = selectBoxSpan.find(':first-child');
                    selectBoxSpan.css({display:'inline-block'});
                    selectBoxSpanInner.css({width:selectBoxWidth, display:'inline-block'});
                    var selectBoxHeight = parseInt(selectBoxSpan.height()) + parseInt(selectBoxSpan.css('padding-top')) + parseInt(selectBoxSpan.css('padding-bottom'));
                    $(this).height(selectBoxHeight).change(function () {
                        // selectBoxSpanInner.text($(this).val()).parent().addClass('changed');   This was not ideal
                        selectBoxSpanInner.text($(this).find(':selected').text()).parent().addClass('changed');
                        // Thanks to Juarez Filho & PaddyMurphy
                    });
                });
            }
        }
    });
})(jQuery);

function changeVideo(vFile) {
	jwplayer().load({file:vFile});
	jwplayer().play();
}