function selectTab(tab) {
    $(tab).siblings(".dd1TabOn").removeClass("dd1TabOn");
    $(tab).addClass("dd1TabOn");

    var content = $(".tabContent", $(tab).parent("div").parent("div")).children("div");
    content.hide();

    var me = $(tab);
    var w = elementWidth(me) / 2;
    var siblings = me.parent("div").children(".dd1TabOff");
    var index = siblings.index(tab);

    $(content.get(index)).show();

    var left = 0.0;
    for (var i = 0; i < index; i++) {
        var sibling = siblings.get(i);
        var w2 = width($(sibling));
        left += w2;
    }

    var parent = me.parent("div");
    var caret = $(".horz_line_caret", parent);
    left = (left + w);
    caret.css("margin-left", left + "px");
}
function css(el, prop) { return parseInt($.css(el[0], prop)) || 0; };
function elementWidth(a) { return a[0].offsetWidth; }
function width(a) { return a[0].offsetWidth + css(a, 'marginLeft') + css(a, 'marginRight'); }

(function($) {

    $.fn.rotate = function(timeout, items) {
        if (!items) items = 1;
        var idx = items - 1;
        var t = $(this);

        if (items < t.size()) {
            setInterval(function() {
                t.hide();
                for (lcv = 0; lcv < items; lcv++) {
                    idx++;
                    if (idx > t.length - 1)
                        idx = 0;
                    $(t[idx]).stop().show().fadeOut(1).fadeIn(425);
                }
            }, timeout);
        }
    }

    $.fn.rotate2 = function(timeout, items, id) {
        if (!items) items = 1;
        var idx = items - 1;
        var t = $("#" + id).children(".testimonial");
        if (items < t.size()) {
            setInterval(function() {
                var ts = $("#" + id).children(".testimonial");
                ts.hide();
                for (lcv = 0; lcv < items; lcv++) {
                    idx++;
                    if (idx > ts.length - 1)
                        idx = 0;
                    $(ts[idx]).stop().show().fadeOut(1).fadeIn(425);
                }
            }, timeout);
        }
    }
})(jQuery);


(function($) {
    $.fn.gallery = function(o) {
        o = $.extend({
            btnPrev: null,
            btnNext: null,
            btnPlay: null,
            btnPause: null,
            auto: false,
            speed: 5000,
            animSpeed: 250,
            animEasing: null,
            visible: 3,
            mainImage: null,
            textArea: null,
            maxHeight: 480,
            maxWidth: 620
        }, o || {});

        var currentIndex = 0;
        var slideShowInterval = 0;
        var isPlaying = false;
        var mainDiv = null;
        var ul = null;
        var count = 0;
        var displayIndex = 0;
        var thumbStripUl = null;
        var running = false;
        var liSize;

        return this.each(function() {
            mainDiv = $(this);

            ul = $("ul", mainDiv);

            var running = false, li = $("li", ul), itemLength = li.size(), v = o.visible;
            var curr = currentIndex;
            var div = $(ul.parent().get(0));

            count = itemLength;

            div.css("visiblity", "visible");

            li.css({ overflow: "hidden" });
            ul.css({ margin: "0", padding: "0", position: "relative", "list-style-type": "none", "z-index": "1" });
            div.css({ overflow: "hidden", position: "relative", "z-index": "2", left: "0px" });

            liSize = width(li);
            var ulSize = liSize * itemLength;
            var divSize = liSize * v;

            li.css({ width: li.width(), height: li.height() });
            ul.css("width", ulSize + "px").css("left", -(curr * liSize));

            div.css("width", divSize + "px");

            if (o.btnPrev) {
                $(o.btnPrev, mainDiv).css("cursor", "pointer");
                $(o.btnPrev, mainDiv).click(function() {
                    if (!running) {
                        slideshowStop();
                        return showImg(o, -1);
                    }
                });
            }

            if (o.btnNext) {
                $(o.btnNext, mainDiv).css("cursor", "pointer");
                $(o.btnNext, mainDiv).click(function() {
                    if (!running) {
                        slideshowStop();
                        return showImg(o, 1);
                    }
                });
            }

            if (itemLength > 1) {
                $("img", li).css("cursor", "pointer");

                $("img", li).click(function() {
                    slideshowStop();

                    var rel = $(this).attr("rel");
                    var index = parseInt(rel);

                    if (currentIndex != index)
                        showImgAtIndex(parseInt(rel));
                });

                if (o.mainImage) {
                    $(o.mainImage, mainDiv).each(function() {
                        if (!$(this).is("img")) {
                            $(this).click(function() {
                                slideshowStop();
                            });
                        }
                    });
                }
            }
            showImg(o, 0);

            if (itemLength > 1) {
                if (o.auto)
                    slideshowStart();

                if (o.btnPlay) {
                    $(o.btnPlay, mainDiv).css("cursor", "pointer");
                    $(o.btnPlay, mainDiv).click(function() {
                        slideShowNext();
                        slideshowStart();
                    });
                }
                if (o.btnPause) {
                    $(o.btnPause, mainDiv).css("cursor", "pointer");
                    $(o.btnPause, mainDiv).click(function() {
                        slideshowStop();
                    });
                }
            } else {
                if (o.btnNext)
                    $(o.btnNext, mainDiv).hide();
                if (o.btnPrev)
                    $(o.btnPrev, mainDiv).hide();

                if (o.btnPlay)
                    $(o.btnPlay, mainDiv).hide();
                if (o.btnPause)
                    $(o.btnPause, mainDiv).hide();
            }
        });

        function slideshowStart() {
            displayPause();
            if (!isPlaying) {
                var f = slideShowNext;
                displayPause();
                slideShowInterval = setInterval(function() {
                    f();
                }, 5000);
                isPlaying = true;
            }
        }

        function slideshowStop() {
            displayPlay();
            isPlaying = false;
            if (slideShowInterval) {
                clearInterval(slideShowInterval);
            }
        }

        function slideShowNext() {
            showImg(o, 1);
        }

        function displayPause() {
            if (o.btnPause)
                $(o.btnPause, mainDiv).show();
            if (o.btnPlay)
                $(o.btnPlay, mainDiv).hide();
        }

        function displayPlay() {
            if (o.btnPause)
                $(o.btnPause, mainDiv).hide();
            if (o.btnPlay)
                $(o.btnPlay, mainDiv).show();
        }

        function showImg(o, increment) {
            var index = currentIndex + increment;
            var count = $("li", ul).size();

            if (index >= count)
                index = 0;
            else if (index < 0)
                index = count - 1;

            showImgAtIndex(index);
        }

        function showImgAtIndex(index) {
            var count = $("li", ul).size();

            if (o.mainImage) {
                var count = $(o.mainImage, mainDiv).size();

                $(o.mainImage, mainDiv).each(function() {
                    if ($.browser.msie) {
                        $(this).hide();
                    }
                    else {
                        if ($(this).is("img")) {
                            $(this).hide();
                        }
                        else {
                            $(this).css("visibility", "hidden");
                            $(this).height(0);
                        }
                    }
                });

                var img = $(o.mainImage + ":nth-child(" + (index + 1) + ")", mainDiv);

                if (img) {
                    try {
                        if (img.is("img")) {
                            if (img.get(0).complete) {
                                centerImg(img, o.maxWidth, o.maxHeight);
                                displayImg(img);
                            }
                            else
                                img.load(function() {
                                    centerImg(img, o.maxWidth, o.maxHeight);
                                    displayImg(img);
                                });
                        }
                        else {
                            displayImg(img);
                        }
                    } catch (Error) {
                        centerImg(img, o.maxWidth, o.maxHeight);
                        displayImg(img);
                    }
                }
            }

            centerThumbStrip(index);

            $("img", ul).fadeTo(0, .33);
            $("img[rel='" + index + "']", ul).fadeTo(0, 1);

            if (o.textArea)
                $(o.textArea, mainDiv).text('Showing ' + (index + 1) + ' of ' + count);

            currentIndex = index;
        }

        function displayImg(img) {
            if ($.browser.msie && $.browser.version < 7) {
                img.show();
            } else {
                if (img.is("img"))
                    img.fadeIn(800);
                else {
                    if ($.browser.msie) {
                        img.show();
                    }
                    else {
                        $(this).height(280);
                        img.css("visibility", "visible");
                    }
                }
            }
        }

        function centerThumbStrip(index) {
            if (!running) {
                var half = o.visible / 2;
                if (index > half) {
                    running = true;
                    var left = (liSize * index) - liSize;
                    ul.animate({ left: 0 - left }, o.animSpeed, o.animEasing, function() {
                        running = false;
                    });
                } else {
                    running = true;
                    ul.animate({ left: 0 }, o.animSpeed, o.animEasing, function() {
                        running = false;
                    });
                }
            }
        }
    };

    function centerImg(img, maxWidth, maxHeight) {
        if (img.height() == 0 || img.width() == 0) {
            return;
        }

        if (img.height() > maxHeight) {
            img.css("height", maxHeight + "px");
            img.css("margin-top", "10px");
        }
        else if (img.height() < maxHeight) {
            var margin = (maxHeight - img.height()) / 2.0;
            img.css("margin-top", margin + "px");
            img.css("padding", "0px");
        }

        if (img.width() > maxWidth) {
            img.css("width", maxWidth + "px");
            img.css("margin-left", "3px");
        }

        if (img.width() < maxWidth) {
            var margin = (maxWidth - img.width()) / 2.0;
            img.css("margin-left", margin + "px");
        }
    }
    function css(el, prop) {
        return parseInt($.css(el[0], prop)) || 0;
    }
    function width(el) {
        return el[0].offsetWidth + css(el, 'marginLeft') + css(el, 'marginRight');
    }
    function height(el) {
        return el[0].offsetHeight + css(el, 'marginTop') + css(el, 'marginBottom');
    }
})(jQuery);


(function($) {
    $.fn.flipper = function(o) {
        o = $.extend({
            targetArea: null,
            pagerArea: null,
            pagerSeparator: ' | ',
            btnPrev: null,
            btnNext: null,
            btnPlay: null,
            btnPause: null,
            auto: false,
            speed: 5000,
            maxHeight: 480,
            maxWidth: 620,
            pagerSelectedClass: null,
            pagerUnSelectedClass: null
        }, o || {});

        var currentIndex = 0;
        var slideShowInterval = 0;
        var isPlaying = false;
        var mainDiv = null;
        var ul = null;
        var count = 0;
        var displayIndex = 0;
        var running = false;

        return this.each(function() {
            mainDiv = $(this);
            this.showContentAtIndex = showContentAtIndex;

            ul = $("ul", mainDiv);

            running = false;
            var li = $("li", ul), itemLength = li.size();
            var curr = currentIndex;

            if (o.btnPrev) {
                $(o.btnPrev, mainDiv).css("cursor", "pointer");
                $(o.btnPrev, mainDiv).click(function() {
                    if (!running) {
                        slideshowStop();
                        return showContent(o, -1);
                    }
                });
            }

            if (o.btnNext) {
                $(o.btnNext, mainDiv).css("cursor", "pointer");
                $(o.btnNext, mainDiv).click(function() {
                    if (!running) {
                        slideshowStop();
                        return showContent(o, 1);
                    }
                });
            }

            if (itemLength > 1 && o.pagerArea) {
                for (var x = 0; x < itemLength; x++) {
                    var fl = $(document.createElement('span'));
                    fl.html(x + 1);
                    fl.click(function() {
                        if (!running) {
                            slideshowStop();
                            return showContentAtIndex($(this).text() - 1);
                        }
                    });
                    if (o.pagerUnSelectedClass)
                        fl.addClass(o.pagerUnSelectedClass);

                    $(o.pagerArea, mainDiv).append(fl);
                    if (x + 1 < itemLength)
                        $(o.pagerArea, mainDiv).append(o.pagerSeparator);
                }
            }

            showContent(o, 0);

            if (itemLength > 1) {
                if (o.auto)
                    slideshowStart();

                if (o.btnPlay) {
                    $(o.btnPlay, mainDiv).css("cursor", "pointer");
                    $(o.btnPlay, mainDiv).click(function() {
                        slideShowNext();
                        slideshowStart();
                    });
                }
                if (o.btnPause) {
                    $(o.btnPause, mainDiv).css("cursor", "pointer");
                    $(o.btnPause, mainDiv).click(function() {
                        slideshowStop();
                    });
                }
            }
            else {
                if (o.btnNext)
                    $(o.btnNext, mainDiv).hide();
                if (o.btnPrev)
                    $(o.btnPrev, mainDiv).hide();

                if (o.btnPlay)
                    $(o.btnPlay, mainDiv).hide();
                if (o.btnPause)
                    $(o.btnPause, mainDiv).hide();
            }
        });

        function slideshowStart() {
            displayPause();
            if (!isPlaying) {
                var f = slideShowNext;
                displayPause();
                slideShowInterval = setInterval(function() {
                    f();
                }, o.speed);
                isPlaying = true;
            }
        }

        function slideshowStop() {
            displayPlay();
            isPlaying = false;
            if (slideShowInterval) {
                clearInterval(slideShowInterval);
            }
        }

        function slideShowNext() {
            showContent(o, 1);
        }

        function displayPause() {
            if (o.btnPause)
                $(o.btnPause, mainDiv).show();
            if (o.btnPlay)
                $(o.btnPlay, mainDiv).hide();
        }

        function displayPlay() {
            if (o.btnPause)
                $(o.btnPause, mainDiv).hide();
            if (o.btnPlay)
                $(o.btnPlay, mainDiv).show();
        }

        function showContent(o, increment) {
            var index = currentIndex + increment;
            var count = $("li", ul).size();

            if (index >= count)
                index = 0;
            else if (index < 0)
                index = count - 1;

            showContentAtIndex(index);
        }

        function showContentAtIndex(index) {
            var count = $("li", ul).size();

            if (o.targetArea) {
                $(o.targetArea, mainDiv).html($($("li", ul).get(index)).html());
            }

            if (o.pagerArea && o.pagerSelectedClass) {
                $(o.pagerArea, mainDiv).children().removeClass(o.pagerSelectedClass);
                var a = $(o.pagerArea, mainDiv).children().get(index);
                $(a).addClass(o.pagerSelectedClass);
            }
            currentIndex = index;
        }
    }
})(jQuery);

function SearchView(anchor) {
    var location = $(anchor).attr("href");
    location = location + "?sr=1";
    for (var s in _quickSearch_Values) {
        location += "&" + s + "=" + _quickSearch_Values[s];
    }
    document.location = location;
    return false;
}

function CompareDiv(div, lid, maxIds) {
    var cbox = $("input[type='checkbox']", $(div)).get(0);

    if (cbox) {
        cbox.checked = !cbox.checked;

        var ret = _Compare(cbox.checked, lid, maxIds);

        if (!ret)
            cbox.checked = false;
    }
}

function _Compare(isChecked, lid, maxIds) {
    try {
        var compareIds = new String();
        var cookieData = document.cookie.split(";");
        compareIds = getCompareData(cookieData);
        if (isChecked) //add to the cookie
        {
            if (compareIds == null || compareIds.indexOf("=") < 0) {
                compareIds = "CompareIds=" + lid;
            }
            else {
                var tmpIds = compareIds.split("=")[1].split(",");
                if (tmpIds.length >= maxIds) {
                    alert("You can only compare a maximum of " + maxIds + " Ads");
                    return false;
                }
                //Only add the value if it doesn't exist
                if (compareIds.indexOf(lid) < 0) {
                    if (compareIds.indexOf("=") == compareIds.length - 1) {
                        compareIds += lid;
                    }
                    else {
                        compareIds += "," + lid;
                    }
                }
            }
        }
        else //remove from cookie
        {
            if (compareIds != null) {
                var tmpIds = compareIds.split("=")[1].split(",");
                var newComparIds = new String();
                newComparIds = "CompareIds=";
                for (i = 0; i < tmpIds.length; i++) {
                    if (tmpIds[i] != lid) {
                        if (i > 0) {
                            newComparIds += ",";
                        }
                        newComparIds += tmpIds[i];
                    }
                }
                compareIds = newComparIds;
            }
        }
        if (compareIds != null) {
            if (compareIds.indexOf("path") < 0) {
                compareIds += ";path=/";
            }
            document.cookie = compareIds;
        }
    }
    catch (e) { }
    return true;
}
function getCompareData(cookieData) {
    for (i = 0; i < cookieData.length; i++) {
        if (cookieData[i].indexOf("CompareIds") >= 0) {
            return cookieData[i];
        }
    }
    return;
}
function removeCompare(lid) {
    var compareIds = new String();
    var cookieData = document.cookie.split(";");

    compareIds = getCompareData(cookieData);
    if (compareIds != null) {
        var tmpIds = compareIds.split("=")[1].split(",");
        var newComparIds = new String();
        newComparIds = "CompareIds=";
        for (i = 0; i < tmpIds.length; i++) {
            if (tmpIds[i] != lid) {
                if (i > 0) {
                    newComparIds += ",";
                }
                newComparIds += tmpIds[i];
            }
        }
        compareIds = newComparIds;
        if (compareIds != null) {
            if (compareIds.indexOf("path") < 0) {
                compareIds += ";path=/";
            }
            document.cookie = compareIds;
        }
    }
    document.location = document.location;
}

function isEnterKeyEvent(e) {
    var key;
    var event;

    if (window.event) {
        event = window.event;
        key = window.event.keyCode;     //IE
    }
    else {
        key = e.which;     //firefox
        event = e;
    }
    return key == 13;
}
