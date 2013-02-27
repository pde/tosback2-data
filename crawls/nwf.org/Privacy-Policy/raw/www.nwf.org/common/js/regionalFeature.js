(function ($) {
    $.fn.homeFeature = function () {
        //Config variables
        var autoSlide = true;
        var mouseDisable = true;
        var autoSlideDelay = 5000;
        //setup variables
        var position = 0;
        var lastPosition = 0;
        var lastItem = $('#home-featured li:first-child');
        var slideItems;
        var timer;
        init();
        function init() {
            var i = 0;
            slideItems = $('#home-featured li');
            var len_i = slideItems.length;
            for (i; i < len_i; i++) {
                var featuredItem = $(slideItems[i]);
                if (i == 0) {
                    $('.spotlight:eq(' + i + ')').addClass('show');
                }
                else {
                    $('.spotlight:eq(' + i + ')').addClass('hide');
                }
                $(featuredItem).css({ cursor: 'pointer' });
                $('a', featuredItem).removeAttr("href");
                $(featuredItem).attr({ rel: i });
                $(featuredItem).bind('click', gotoItem);
                slideItems[i] = featuredItem;
            }
            // Setup a timer if the slider is set to automatic
            if (autoSlide) {
                setTimer();
                if (mouseDisable) {
                    $('sub-header').mouseover(function () {
                        clearTimer();
                    }).mouseout(function () {
                        setTimer();
                    });
                }
            }
        }
        function gotoItem(e, item) {
            var currentSlide = (item == null ? $(this) : item);
            position = parseInt(currentSlide.attr('rel'));
            if (position != lastPosition) {
                currentSlide.addClass('active');
                lastItem.removeClass('active');
                lastItem = currentSlide;
                $('.spotlight:eq(' + position + ') img:first-child').fadeIn('slow');
                $('.spotlight:eq(' + position + ')').removeClass('hide').addClass('show');
                $('.spotlight:eq(' + lastPosition + ')').removeClass('show').addClass('hide');
                lastPosition = position;
            }
            return false;
        }
        function setTimer() {
            timer = setInterval(timerNext, autoSlideDelay);
        }
        function timerNext() {
            clearTimer();
            setTimer();
            var nextPosition = parseInt(position) + 1;
            if (nextPosition >= slideItems.length) {
                nextPosition = 0;
            }
            var tst = $(('#home-featured li[rel=' + nextPosition + ']'));
            gotoItem(null, tst);
        }
        function clearTimer() {
            clearInterval(timer);
            timer = "";
        }
    };
})(jQuery);