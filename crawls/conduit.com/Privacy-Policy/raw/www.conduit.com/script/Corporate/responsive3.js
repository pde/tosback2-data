(function(){

/* Add classes for all pages but the home page */
var urlArray = window.location.pathname.split('/');
var pageClasses = location.pathname.split('.')[0].replace(/[./]/g, ' page-').toLowerCase().replace(/page-$/, 'page-home');

if (urlArray[1].toLowerCase() != 'home') {
    $('body').addClass('responsive-page').addClass(pageClasses);
}


/* Make sure .page is always at the correct height */
var pages = $('.page');
var containers = $('.page .productImageContainer');

function resize(){
    var viewportWidth = $(window).width();
    var viewportHeight = $(window).height();
    var percent = containers.css('font-family').slice(1) / 100; // 'h25' -> 0.25
    var offset = 30;
    if(viewportHeight === 356 || viewportHeight == 208) offset += 65; // fix for iPhones 3-4, consider their falsy viewport height report

    if (viewportWidth < 731 || viewportWidth < 1024 && viewportHeight < 500) {
        pages.attr('style', 'height:' + (viewportHeight + offset + 'px !important'));
        containers.css({
            'padding-bottom':0,
            'height':viewportHeight * percent
        });
    } else {
        pages.removeAttr('style');
        containers.removeAttr('style');
    }
}

if($('.page-home').length) {
    $(window).on('resize orientationChange webkitOrientationChange', resize);
    resize();
}

$('.container.divFloatContainer').addClass('wideScreen');

/* Hack to fix scrolling at 1024px width */
/*($(window).on('scroll', function(){
    if($(this).width() !== 1024) return;
    if( $(this).scrollTop() > 0 ) {
        $('.rightSideContainer').css('paddingTop', '0px');
    } else {
        $('.rightSideContainer').css('paddingTop', '30px');
    }
});*/

/*
    Custom Dropdown
    Article: http://cssglobe.com/custom-styling-of-the-select-elements/
    POC: http://jsfiddle.net/Ronny/zZa7d/
*/

$('#dropdownContainer select').each(function(){
    var title = $(this).attr('title');
    if( $('option:selected', this).val() != ''  ) title = $('option:selected',this).text();
    $(this)
        .css({'z-index':10,'opacity':0,'-khtml-appearance':'none'})
        .after('<span class="select">' + title + '</span>')
        .change(function(){
            val = $('option:selected',this).text();
            $(this).next().text(val);
            var link = document.createElement('a');
            link.href = this.value;
            location = link.href;
        })
});

/* change markup on homepage */
if($('.page-home').length) {
    $('.leftSide .mainBodyMask .page .productImageContainer .mask').remove();

    $(".leftNav [scrollToPage], [scrollToPage] .downArrow").off();
    $(".leftNav [scrollToPage], [scrollToPage] .downArrow").on('click', function(e){
        e.preventDefault();
        var height = $(window).height();
        var offset = 60;
        if(height < 780) offset = 20;
        if(height < 470) offset = 13;

        var scrollToElement = $(this).attr('scrolltopage') ? $(this) : $(this).parent();
        var pageNumber = scrollToElement.attr("scrollToPage");
        var headerHeight = $('.header').css('position') == 'fixed' ? $('.header').height() : 0;
        $('html, body').animate({
            scrollTop: pageNumber > 0 ? $('.page').eq(pageNumber).find('.logo').offset().top - offset - headerHeight : 0
        }, 1500, "easeInOutExpo");
    });
}

/* Remove empty text nodes from pagination */
if($('.PagerNumberArea').length) {
    $('.PagerNumberArea > span')
        .contents()
        .filter(function() {
            return this.nodeType === 3; //Node.TEXT_NODE
        }).remove();
}

/* In Locations, open maps in a new tab instead of inner popup */
if($('.page-locations').length) {
    $('.content').on('click', '[action="openPopup"]', function(){
        if($(window).width() < 599) {
            var popupMarkup = $(this).attr('popupcontent');
            var target = popupMarkup.split("src='")[1].split("'")[0];
            window.open(target);
        }
    });
}

/* Debugging helpers */
if(/[?&]m=\d/.test(location.search)) {
    $('<div id="windowInfo">').appendTo('body');

    function print(){
        $('#windowInfo').html( "Screen: " + screen.width + ' x ' + screen.height + "<br> Window: " + $(window).width() + ' x ' + $(window).height());
    }
    print();
    $(window).on("resize scroll orientationChange webkitOrientationChange", print);
}


})();