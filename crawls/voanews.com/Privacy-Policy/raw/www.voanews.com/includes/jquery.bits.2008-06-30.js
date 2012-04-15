/*
 America.gov Site JavaScript: Misc Functions
 
 America.gov Web Site
 United States Department of State
 Last Edited: Jan 2008 by Darren W Krape (krapedw@state.gov)
 */
// Returns the number only pixel of a given item
var num = function(el, prop){
    return parseInt($.css(el.jquery ? el[0] : el, prop)) || 0;
};

// Returns the outerHeight of a given item
var outerHeight = function(element){
    outerWidthResult = element.height() + num(element, 'borderTopWidth') + num(element, 'borderBottomWidth') + num(element, 'paddingTop') + num(element, 'paddingBottom') + num(element, ',marginTop') + num(element, 'marginBottom');
    return outerWidthResult;
}

// Returns the outerWidth of a given item
var outerWidth = function(element){
    outerWidthResult = element.width() + num(element, 'borderLeftWidth') + num(element, 'borderRightWidth') + num(element, 'paddingLeft') + num(element, 'paddingRight') + num(element, ',marginLeft') + num(element, 'marginRight');
    return outerWidthResult;
}

//Swaps out gallery media elements (such as a photo gallery or timeline component)
$.fn.galleryToggle = function(){

    if (!$("#video").attr("id")) {
    
        var elementId = (location.hash).substring(1);
        
        if (elementId) {
            var playerURL = "http://photos.america.gov/galleries/amgov" + elementId;
            $.fn.galleryToggle.swap(playerURL, elementId);
        }
        else 
            if (!(elementId) && ($(".player").attr("class"))) {
                var playerURL = $(".collection-box li:eq(0) a.gallerylink").attr("href");
                var elementId = playerURL.split('amgov')[1];
                $.fn.galleryToggle.swap(playerURL, elementId);
            }
        
        this.each(function(){
            $(this).find(".collection-box li, .box-body li").click(function(){
                var playerURL = $(this).find("a.gallerylink").attr("href");
                var elementId = playerURL.split('amgov')[1];
                $.fn.galleryToggle.swap(playerURL, elementId);
                return false;
            });
        });
    }
};

$.fn.galleryToggle.swap = function(playerURL, elementId){
    $(".player").html('<iframe src="' + playerURL + '" frameborder=0 width=616 height=418 scrolling=no></iframe>');
    parent.location.hash = elementId;
    $.fn.galleryToggle.activeHighlight(playerURL);
};

$.fn.galleryToggle.activeHighlight = function(playerURL){
    $(".collection-box").find("li").removeClass("active");
    
    var matchContent = $("a[href=" + playerURL + "]:eq(1)").text();
    var tabName = $(".collection-box ul:contains('" + matchContent + "')").attr("title");
    
    if (matchContent && tabName) {
        $(".collection-nav").find("li").removeClass();
        $(".collection-box").find(".elements").hide();
        
        $(".collection-box ul:contains('" + matchContent + "')").show();
        $(".collection-box li:contains('" + matchContent + "')").addClass("active");
        $(".collection-nav li:contains('" + tabName + "')").addClass("active");
    }
};
