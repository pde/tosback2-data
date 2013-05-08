(function ($) {
    $.fn.slider = function (settings) {
        // Config Array
        var config = {
            id: 0,
            direction: "hor",
            holder: null,
            btnNextStr: "",
            btnPrevStr: "",
            numItems: 1,
            moveVal: 0,
            moveItem: "",
            numItemsVisible: 1,
            btnDisabledStr: "-dis",
            imagesFolder: "/common/images/",
            swapFeature: false,
            swapHolder: null,
            swapHolderItemClass: "",
            itemClass: "",
            autoRotate: false,
            autoRotateSpeed: 8000
        }

        // Variables to determine the position of the slider
        var currentItem = 0;
        var pos = 0;
        var prevPos = [];

        // Update the config array with the settings passed in the function
        if (settings) { $.extend(config, settings); }

        // Variables to hold the previous and next buttons
        var btnNext = $("." + config.btnNextStr + ":eq(" + config.id + ")");
        var btnPrev = $("." + config.btnPrevStr + ":eq(" + config.id + ")");

        // Removed the href link from the buttons and set the previous button to disabled
        btnPrev.removeAttr('href').css({ backgroundImage: "url(" + config.imagesFolder + config.btnPrevStr + config.btnDisabledStr + ".gif)", cursor: "default" });
        btnNext.removeAttr('href').css({ cursor: "pointer" });

        // If the number of items is less than or equal to the number of items visible - disable the next button
        if (config.numItems <= config.numItemsVisible) {
            btnNext.css({ backgroundImage: "url(" + config.imagesFolder + config.btnNextStr + config.btnDisabledStr + ".gif)" }).css({ cursor: "default" });
        }

        // This is to prevent a flicker while the page is loading
        // The buttons are set to invisible in the CSS
        btnNext.css({ display: 'block' });
        btnPrev.css({ display: 'block' });

        //  ========== FUNCTIONS ==========  \\

        // Next Button Click Function
        btnNext.click(function () {
            stopAutoRotate();
            btnNextClick();
        });

        function btnNextClick() {
            if (currentItem < config.numItems - config.numItemsVisible) {
                if (config.moveVal == 0) {
                    var nextItem = $(config.moveItem, config.holder);
                    if (currentItem >= 1) {
                        prevPos[currentItem] = prevPos[currentItem - 1] - $(nextItem[currentItem - 1]).outerHeight(true);
                    }
                    else {
                        prevPos[currentItem] = 0;
                    }
                    pos -= $(nextItem[currentItem + config.numItemsVisible]).outerHeight(true);
                }
                else {
                    pos -= config.moveVal;
                }
                if (config.direction == "hor") {
                    $(config.holder).animate({ left: pos + "px" }, 350);
                }
                else if (config.direction == "vert") {
                    $(config.holder).animate({ top: pos + "px" }, 350);
                }
                currentItem++;
                if (currentItem == config.numItems - config.numItemsVisible) {
                    btnNext.css({ backgroundImage: "url(" + config.imagesFolder + config.btnNextStr + config.btnDisabledStr + ".gif)" }).css({ cursor: "default" });
                }
                else {
                    btnNext.css({ backgroundImage: "url(" + config.imagesFolder + config.btnNextStr + ".gif)" }).css({ cursor: "pointer" });
                }
                btnPrev.css({ backgroundImage: "url(" + config.imagesFolder + config.btnPrevStr + ".gif)" }).css({ cursor: "pointer" });
            }
        }

        // Previous Button Click Function
        btnPrev.click(function () {
            stopAutoRotate();
            btnPrevClick();
        });

        function btnPrevClick() {
            if (currentItem > 0) {
                if (config.moveVal == 0) {
                    pos = prevPos[currentItem - 1];
                }
                else {
                    pos += config.moveVal;
                }
                if (config.direction == "hor") {
                    $(config.holder).animate({ left: pos + "px" }, 350);
                }
                else if (config.direction == "vert") {
                    $(config.holder).animate({ top: pos + "px" }, 350);
                }
                currentItem--;
                if (currentItem == 0) {
                    btnPrev.css({ backgroundImage: "url(" + config.imagesFolder + config.btnPrevStr + config.btnDisabledStr + ".gif)" }).css({ cursor: "default" });
                }
                else {
                    btnPrev.css({ backgroundImage: "url(" + config.imagesFolder + config.btnPrevStr + ".gif)" }).css({ cursor: "pointer" });
                }
                btnNext.css({ backgroundImage: "url(" + config.imagesFolder + config.btnNextStr + ".gif)" }).css({ cursor: "pointer" });
            }
        }

        // Content Swap Function
        if (config.swapFeature) {
            var currentPosition = 0;
            var position = 0;
            var lastItem = $(config.itemClass + ":first-child");
            var itemWidth = $(config.swapHolderItemClass + ":first-child").outerWidth(true);
            var itemHeight = $(config.swapHolderItemClass + ":first-child").outerHeight(true);
            var i = 0;
            var len_i = $(config.itemClass).length;
            for (i; i < len_i; i++) {
                var featuredItem = $(config.itemClass)[i];
                $('a', featuredItem).removeAttr("href").addClass('nolink');
                $(featuredItem).css({ cursor: 'pointer' });
                $(featuredItem).attr({ rel: i });
                $(featuredItem).mouseover(function () {
                    $(this).addClass('hover');
                }).mouseout(function () {
                    $(this).removeClass('hover');
                }).click(function () {
                    stopAutoRotate();
                    doSwap(this);
                    return false;
                });
            }
        }

        // Swap image
        function doSwap(item) {
            if ($(item).attr('rel') != position) {
                $(item).addClass('selected');
                lastItem.removeClass('selected');
                lastItem = $(item);
                if (config.direction == "hor") {
                    var imageSlidePos = $(item).attr('rel') * itemWidth;
                }
                else if (config.direction == "vert") {
                    var imageSlidePos = $(item).attr('rel') * itemHeight;
                }
                position = $(item).attr('rel');
                var time = position - currentPosition;
                if (time < 0) { time *= -1; }
                if (config.direction == "hor") {
                    $(config.swapHolder).animate({ left: '-' + imageSlidePos }, 350 * time);
                }
                else if (config.direction == "vert") {
                    $(config.swapHolder).animate({ top: '-' + imageSlidePos }, 350 * time);
                }
                currentPosition = position;
            }
        }

        // Set up an auto-rotate timer for slider controls
        var timer;
        if (config.autoRotate == true) {
            var i = 0;
            var max_i = $(config.itemClass).length - 1;
            if (max_i > 0) {
                timer = setInterval(nextSlide, config.autoRotateSpeed);
            }
        }

        // Select the next slide thumbnail and advance the thumbnail strip
        function nextSlide() {
            if (i == max_i) {
                // go back to the start
                i = 0;
                currentItem = 0;
                pos = 0;
                if (config.direction == "hor") {
                    $(config.holder).animate({ left: "0px" }, 350);
                }
                else if (config.direction == "vert") {
                    $(config.holder).animate({ top: "0px" }, 350);
                }
                btnNext.css({ backgroundImage: "url(" + config.imagesFolder + config.btnNextStr + ".gif)" }).css({ cursor: "pointer" });
                btnPrev.css({ backgroundImage: "url(" + config.imagesFolder + config.btnPrevStr + config.btnDisabledStr + ".gif)" }).css({ cursor: "default" });
            } else {
                i++;
                if (i > config.numItemsVisible - 1) {
                    btnNextClick();
                }
            }
            doSwap($(config.itemClass)[i]);
        }

        // Stop auto-rotation
        function stopAutoRotate() {
            if (timer) {
                clearInterval(timer);
                timer = '';
            }
        }
    };
})(jQuery);