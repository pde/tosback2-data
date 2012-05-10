var popupShowIds = {};
var popupHideIds = {};


$(document).ready(function() {
    var showTopTenFilter = function(){ return !$(this).parents("#main_right").length; };

    if ( ! ($.browser.msie && $.browser.version < 7.0) ) { //IE6 can't handle this, hide all traces
        $('.box_small_topten').filter(showTopTenFilter).each(function() { //dont show popups on top10s in the right column
            var popupId = getPopupId(this);
            var $popup = $('#'+popupId);
            $popup.css({position:'absolute', display:'none', zIndex:10});
            $popup.hover(function() {showPopup(popupId);}, function() {hidePopup(popupId);}); //Don't disappear when i'm pointing at you
         });
        $('.box_small_topten').filter(showTopTenFilter).hover(
            function() {
                var popupId = getPopupId(this);
                showPopup(popupId);
                placePopup($(this), $('#'+popupId));
            },
            function() {
                var popupId = getPopupId(this);
                hidePopup(popupId);
            }
        );
    }
});

function getGameHandle(container) {
    return container.id.split("Container")[0];
}

function getPopupId(container) {
    var handle = getGameHandle(container);
    return handle+"popup";                             
}

function showPopup(popupId) {
    clearTimeout(popupHideIds[popupId]);
    popupShowIds[popupId] = setTimeout("showPopupNow($('#"+popupId+"'))",250);
}

function showPopupNow(popup) {
    if ($.support.opacity) {
        popup.fadeIn(250);
    } else {
        popup.show();
    }
}


function hidePopup(popupId) {
    clearTimeout(popupShowIds[popupId]);
    popupHideIds[popupId] = setTimeout("hidePopupNow($('#"+popupId+"'))", 250);
}

function hidePopupNow(popup) {
    if ($.support.opacity) {
        popup.fadeOut(250);
    } else {
        popup.hide();
    }
}

function placePopup(parent, popup) {
    var margin = findMargin(parent); 
    var tooLow = isTooLow(parent, popup);
    var parentOffset = $(parent).offset();
    var popupLeft = parentOffset.left + $(parent).outerWidth() - 20;
    var popupTop = parentOffset.top - (tooLow?margin:0) - 23; //TODO Make this less hacky.  This is the height of the top div
    $(popup).css({left:popupLeft,top:popupTop});
    if (tooLow) { //jQuery.toggleClass doesn't seem to work...
        $(popup).find('.body').addClass('low');
    } else {
        $(popup).find('.body').removeClass('low');
    }
}

//How far away from the bottom we need to be to display the blurb in normal position.
//If we are too far down, the blurb will appear in 'elevated' position.
function findMargin(parent) {
    return 2*$(parent).outerHeight() - 4; //Ugly kludge... but without the -4 the arrow gets cut off.
}

//Should ideally also check the popup's dimensions, but those are hard to find when it's hidden.
function isTooLow(parent, popup) {
    var margin = 3*findMargin(parent)/2; 
    var windowHeight = window.innerHeight || document.documentElement.clientHeight; //IE doesn't understand window.innerheight
    windowHeight = (windowHeight>0)?windowHeight:document.body.clientHeight; //IE6 sometimes doesn't understand... well, almost anything.
    var windowScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    var parentHeight = $(parent).outerHeight();
    var parentTop = $(parent).position().top;
    return (parentTop + parentHeight + margin > windowHeight + windowScrollTop);
}
