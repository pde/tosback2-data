function getBackgroundPosition(element) {
    var sBgPosition = element.css('backgroundPosition');

    if (!sBgPosition) {
        sBgPosition = element.css('backgroundPositionX') + " " + element.css('backgroundPositionY');
    }

    var aBgPosition = sBgPosition.split(' '),
        oBgPosition = {
            x: aBgPosition[0],
            y: aBgPosition[1]
        };
    return oBgPosition;
}

function strToObj(str, propertyDelimiter, valueDelimiter) {
    var parts = str.split(propertyDelimiter),
        part = [],
        obj = {};

    for (var i = 0; i < parts.length; i++) {
        part = parts[i].split(valueDelimiter);
        obj[part[0]] = part[1];
    }

    return obj;
}

$(function () {
    $.easing.def = "easeOutQuint";

    window.jWindow = $(window);

    var jSearchBtn = $('#search-btn'),
        jSearchCloseBtn = $('#search-close'),
        jSearch = $('#search'),
        jResultsData = $('#results-data'),
        jSearchForm = $('#search-form'),
        jGoBtn = jSearchForm.find('#ctl00_rnsearch_Button1'),
        jSearchField = jSearchForm.find('input[type=text]');


    jSearchField.bind({
        focus: function () {
            if (this.value == this.defaultValue) this.value = '';
        },
        blur: function () {
            if (this.value == '') this.value = this.defaultValue;
        },
        keydown: function (e) {
            if (e.keyCode == 13) {
                jGoBtn.trigger('click');
                e.preventDefault();
            }
        }
    });

    // show search results
    jSearchBtn.bind('click', function (e) {
        jSearchForm.show();
        jSearch.animate({ height: '110px' }, 500);
        jSearchBtn.slideUp('fast');
        jSearchCloseBtn.slideDown('fast');
    });

    // hide search results
    jSearch.delegate('#search-close', 'click', function () {
        jSearch.animate({ height: '0px' }, 500);
        jSearch.find('.section').empty();
        jSearchBtn.slideDown('fast');
        jSearchCloseBtn.slideUp('fast');
    });

    var jPrimaryNav = $('#nav'),
        jPrimaryItems = jPrimaryNav.find('ul>li'),
        jShim = $('#shim'),
        jLastActive = null,
        jProductLogosDest = $('#productLogoDest'),
        jProductLogos = null,
        bCancelHide = false;

    jPrimaryItems.each(function () {
        var jPrimaryItem = $(this),
            jMenu = jPrimaryItem.find('ul'),
            jItems = jPrimaryItem.find('li'),
            nItemCount = jItems.size(),
            nItemWidth = jPrimaryItem.find('a').width();

        // if this item has children
        if (nItemCount > 0) {
            // determine how many nav columns (ULs) there will be
            var nColumnCount = Math.ceil(nItemCount / 4),
            // wrap columns in a div
                jMenuContainer = $('<div class="menu"></div>')
                    .appendTo(jPrimaryItem)
            // used to center these items.  now they're left aligned
            //.css({width: nColumnCount * 122 + 'px', left: (nItemWidth/2) - ( (122*nColumnCount) /2) + 'px'})
                    .css({ width: nColumnCount * 140 + 'px', left: '17px' }) // align with button left margin and establish width
                    .attr('itemWidth', nItemWidth),
                aLists = [];

            // establish the ULs for each group of items
            for (var i = 0; i < nColumnCount; i++) {
                aLists.push($('<ul class="menu-group-' + i + '"></ul>').appendTo(jMenuContainer).css('left', 122 * i + 'px'));
            }

            // move list item groups into their respective ULs
            jItems.each(function (index) {
                var nULIndex = Math.floor(index / 4),
                    jThis = $(this),
                    jLogo = null,
                    sLogoId = jThis.find('a').text().replace(' ', '');

                aLists[nULIndex].append(jThis);
                jLogo = $('<img src="/images/rn/product-logos/' + sLogoId + '.png" id="' + sLogoId + '">').appendTo(jProductLogosDest);
                jThis.hover(
                    function () {
                        jProductLogos.stop(true, true).animate({ opacity: 0 }, 10, function () {
                            jLastActive = jLogo.animate({ opacity: 1 }, 1000);
                        });
                    },
                    function () {
                        jLastActive.css('opacity', 0);
                    }
                );
            });

            // all images have been added to the dom - establish a quick-ref for them
            jProductLogos = jProductLogosDest.find('img');

            // remove original, empty UL
            jMenu.remove();

            // bind hover events
            jPrimaryItem.hover(
                function (e) {
                    jMenuContainer.stop(true, true).fadeIn();
                    jShim.stop().animate({ 'height': '260px' }, 500).addClass('expanded');
                    jProductLogosDest.css('height', '121px');
                    jPrimaryNav.addClass('expanded');
                },
                function () {
                    jProductLogos.css('opacity', 0);
                    jMenuContainer.stop(true, true).fadeOut('fast');
                    jShim.stop().animate({ 'height': '0px' }, 250, function () {
                        jProductLogos.css('opacity', 0);
                        //console.log('hiding on shim hover');
                        jProductLogosDest.css('height', 0);
                    }).removeClass('expanded');
                    jPrimaryNav.removeClass('expanded');
                }
            );

        }

    });


    // hook up cta links
    $('.cta').each(function () {

        // scope in an .each so that local vars are only calculated once
        var jItem = $(this),
            nStaticWidth = jItem.width(),
            nExpandedWidth = nStaticWidth + 21,

        // nBgPositionTop = getBackgroundPosition(jItem).x, //carry over top position and only alter left position
        // actually, isn't this always 100%?
            sBgPosition = jItem.outerWidth(true) + 'px 50%';

        // establish background-position on the item and bind hover events
        jItem.css({ 'backgroundPosition': sBgPosition, 'backgroundImage': 'url(/images/rn/bg_blue_arrow.gif)' }).hover(
            function () {
                jItem.stop().animate({ width: nExpandedWidth }, 250);
            },
            function () {
                jItem.stop().animate({ width: nStaticWidth }, 250);
            }
        );
    });



    // slideshows in right channel

    $('.slideshow').each(function () {
        var jSlideshow = $(this),
            jZoom = jSlideshow.find('.zoom a'),
            jNav = jSlideshow.find('.nav'),
            jSlides = jSlideshow.find('.slides li'),
            nTotalSlides = jSlides.size() - 1,
        // position the first slide in view
            jCurrentSlide = jSlides.eq(0).css('left', '0px'),
            nCurrent = 0,
            jNextSlide = null;

        // give each slide an index attribute in order to identify current state within the slideshow
        jSlides.each(function (index) {
            $(this).attr('index', index).find('a.group').colorbox({ rel: 'group', transition: 'none' });
        });

        jZoom.attr('href', jCurrentSlide.find('a').attr('href'));

        jNav.bind('click', function (e) {
            jCurrentSlide.find('.caption').fadeOut();
            nCurrent = new Number(jCurrentSlide.attr('index'));
            var nNext = (nCurrent >= nTotalSlides) ? 0 : nCurrent + 1,  // default to next
                sStartCoord = '-311px';

            // if prev, adjust nNext
            if (this.className.indexOf('prev') != -1) {
                nNext = (nCurrent == 0) ? nTotalSlides : nCurrent - 1;
                sStartCoord = '311px';
            }

            jNextSlide = jSlides.eq(nNext);

            jNextSlide.css({ 'z-index': 2, left: sStartCoord }).stop().animate({ 'left': 0 }, 300, function () {
                jCurrentSlide.css({ 'left': '311px' });
                jNextSlide.css('zIndex', 1).find('.caption').fadeIn(); ;

                jCurrentSlide = jNextSlide;
                jZoom.attr('href', jCurrentSlide.find('a').attr('href'));
            });

            e.preventDefault();
        });

        jZoom.bind('click', function (e) {
            jZoom.colorbox({ rel: 'group', transition: "none", transition: 'fade' });
            e.preventDefault();
        });
    });


    // expand/contract contact regions on contact page
    var jContactRegions = $('#contact-regions');

    if (jContactRegions.size() > 0) {
        jContactRegions.children('li').each(function () {
            var jThis = $(this),
                jPanel = jThis.find('.hidden');
            jThis.bind('click', function (e) {
                jPanel.slideToggle('slow');
                e.preventDefault();
            });
        });
    }


    // expand clickable region on products to the entire table cell region
    var jProductsServices = $('#products-services');

    if (jProductsServices.size() > 0) {
        jProductsServices.find('.box').each(function () {
            var jThis = $(this),
                jAnchor = jThis.find('a.learn-more'),
                sHref = jAnchor.attr('href');
            jThis.bind('click', function () {
                window.location = sHref;
            });
        })
    }


    // track outbound links
    $('.track').bind('click', function (e) {
        e.preventDefault();
        var jThis = $(this),
            sHref = jThis.attr('href'),
            sTarget = jThis.attr('target');

        recordOutboundLink(sHref, 'outbound links', sTarget);
    });


});

