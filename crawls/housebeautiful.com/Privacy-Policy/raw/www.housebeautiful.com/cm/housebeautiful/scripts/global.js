$(function() {		/* lazy images */
    var b, e, lazyLoad;
    b = $(window);
    e = $('.lazyImage');		
    lazyLoad = function () {
        e = $('.lazyImage');		
		$.each(e, function () { 
            var c = $(this),
                a, d;
            a = c.offset();
            d = c.data();	
            if (!d.loaded && a.top <= b.height() + b.scrollTop()) {
		        a = new Image, a._parent = c, a.onload = function () { // IE8 fix: a._parent refers to the correct parent for the image, so that the image.onload callback knows which element to append the image to
                    this._parent.prepend(this);
                    $(this).fadeIn();
                    $(this).css('display', 'block');
                    this._parent.removeClass('lazyImage')
                }, $.extend(a, d), c.data('loaded', !0), e = $('.lazyImage');
            }
        });
    };
    lazyLoad();
    b.scroll(lazyLoad);
    b.resize(lazyLoad);
    window.lazyLoad = lazyLoad;
});