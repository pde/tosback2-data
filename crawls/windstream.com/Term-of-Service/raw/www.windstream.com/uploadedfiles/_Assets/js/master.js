var expanded = false,
    modalClosed = false,
    win = $(window);

// MODAL FUNCTIONALITY

//add body class for modals
if (self != top) {
    if (typeof Ektron != "undefined") {
        $(".modal .EktronPersonalizationWrapper").hide();
    }
}

function closeModal(modal, closeCallback) {
    if (modal == null)
        modal = $(".modal-container");

    if (closeCallback != null) {
        closeCallback();
        return;
    }

    $(".mask").fadeOut(100);
    modal.hide();
    modalClosed = true;
}

function createModal(href, closeCallback) {
    modalClosed = false;

    // content
    if (href.indexOf("#") == 0) {
        var modal = $(href);

        if ($('body').hasClass('snap-320')) {
            modalLeft = 0;
        }
        else {
            modalLeft = Math.max(win.width() / 2 - modal.width() / 2, 1);
        }

        modal.css({
            'top': win.scrollTop() + 30,
            'left': modalLeft
        }).show();

        $(".mask").fadeTo(200, 0.8);
    }
    // url(iframe)
    else {
        var modal = $("#modal");
        modal.children("iframe").attr("src", "").attr("style", "");

        var loading = $("#loading");
        loading.css({ top: win.height() / 2 - loading.height() / 2,
            left: win.width() / 2 - loading.width() / 2
        }).show();

        var iframe = modal.children("iframe");
        iframe.attr("src", href);
        iframe.load(function () {
            iframe.unbind("load");

            if (iframe.attr("src").length <= 0)
                return;

            loading.hide();
            if (modalClosed)
                return;

            modal.show();

            //the initial read of the contents outerWidth in chrome before it is set is returning incorrectly, did not appear to be timing related, setting and reading resolved the issue
            iframe.width(iframe.contents().outerWidth());
            iframe.width(iframe.contents().outerWidth());
            iframe.height(iframe.contents().outerHeight());
            iframe.height(iframe.contents().outerHeight());

            modal.css({
                'top': win.scrollTop() + 30,
                'left': Math.max(win.width() / 2 - modal.width() / 2, 1)
            });
        });

        $(".mask").fadeTo(200, 0.8);
    }
    $(".mask, .modal-container .close").on("click", function () {
        closeModal(modal, closeCallback);
        $(".mask, .modal-container .close").unbind("click");
    });
}
function initModals() {
    $("a[class*='modal']").click(function (evt) {
        evt.preventDefault();

        createModal($(this).attr("href"));
    });
}
initModals();

// Virtual Agent
$("a[class*='agent']").click(function (evt) {
    evt.preventDefault();
    if (typeof VirtuOz != "undefined") {
        VirtuOz.AgentLoader.loadAgent('VzWindstream');
    }
});


// SEARCH
$("#search").keydown(function (e) {
    if (e.which == 13) {
        e.preventDefault();
        doSiteSearch();
    }
});

var searching = false;
function doSiteSearch() {
    if ($("#search").val() != "Enter A Search Term" && $("#search").val() != "") {
        if (searching)
            return;
        searching = true;
        window.location = baseSearchUrl + $("#search").val();
    }
}

$(".default").keydown(function (e) {
    if (e.which == 13 && ($('.dk_focus').length == 0)) {
        e.preventDefault();
        $("#" + $(this).attr("default")).click();
    }
});

// Banner edit mode fix
$(".banner .dropzone[editmode='true']").each(function () {
    $("html").removeClass("dk_fouc");
    $(this).parent().parent().css("padding-top", "160px");
    $(".banner .mod-005").css("position", "inherit");
    $(".banner-box .mod-001").css("position", "inherit");
});

if (typeof Sys != "undefined" && typeof Sys.WebForms != "undefined" && typeof Sys.WebForms.PageRequestManager != "undefined") {
    Sys.WebForms.PageRequestManager.getInstance().add_endRequest(ajaxRequestComplete);
}

function ajaxRequestComplete() {
    initModals();
    // setup dropdowns
    if ($().dropkick)
        $('.dropkick').dropkick();
    $('.bundlizer-hsi').each(function () { modSlide($(this)); });
    $('.bundlizer-tv').each(function () { modSlide($(this)); });
    /*wireupAdvancedSearch();*/
    supportTabSlide();
    supportMapImage();
};

$(document).ready(function () {

    //setup hero
    if ($('.mod-001')) {
        heroSlider();
    }

    normalizePlanHeight();
    supportMapImage();
    mobileSupportHeaderHeight();

    //Characters Remaining
    var characters = 100;
    $('.remaining').append("<b>" + characters + "</b> characters remaining");
    $('.directory-info').keyup(function () {
        if ($(this).val().length > characters) {
            $(this).val($(this).val().substr(0, characters));
        }
        var remaining = characters - $(this).val().length;
        $('.remaining').html("<b>" + remaining + "</b> characters remaining");
        if (remaining <= 10) {
            $('.remaining').css("color", "#ff0000");
        } else {
            $('.remaining').css("color", "#7d7d7d");
        }
    });

    // setup dropdowns
    $('.dropkick').dropkick();

    //Characters Remaining
    var characters = 100;
    $('.remaining').append("<b>" + characters + "</b> characters remaining");
    $('.directory-info').keyup(function () {
        if ($(this).val().length > characters) {
            $(this).val($(this).val().substr(0, characters));
        }
        var remaining = characters - $(this).val().length;
        $('.remaining').html("<b>" + remaining + "</b> characters remaining");
        if (remaining <= 10) {
            $('.remaining').css("color", "#ff0000");
        } else {
            $('.remaining').css("color", "#7d7d7d");
        }
    });


    // Character Limit on Electronics Total Box
    $('.product-title').each(function (i) {
        var length = $(this).text().length,
            limit = 20;
        if (length > limit) {
            $(this).text($(this).text().substr(0, limit) + '...');
        }
    });


    // if someone clicks cancel, lets hide the search drop down and return the button to its off state
    $('.search-cancel a').on('click', function () { $('.search-btn, .search-dropdown').removeClass('utility-on'); });


    /* Mod 10 768 switcher */
    $('.snap-768 .mod-010 .container .plus > img').attr('src', '/uploadedimages/_Assets/content/icons/mod-010-plus-768.png');


    $('.snap-320 .item-box p').addClass('clearfix');


    /* ---------- Ajax for Modal ---------- */
    $(".new-existing #state").change(function (e) {
        $.getJSON("/Pages/Ajax/GetCities.aspx",
            { s: $(this).val() },
            function (data) {
                cities = data;
                var city = $(".new-existing #city");
                city.children(":gt(0)").remove();

                var dk = city.prev(".dropkick");
                dk.children(".dk_toggle").children(".dk_label").html("-- Select --");
                var dk_list = dk.children(".dk_options").children(".dk_options_inner");
                dk_list.children("li:gt(0)").remove();
                dk_list.children("li").attr("class", "dk_option_current");

                for (var x = 0; x < data.length; x++) {
                    city.append(new Option(data[x], data[x]));
                    dk_list.append("<li><a data-dk-dropdown-value=\"" + data[x] + "\">" + data[x] + "</a></li>");
                }
            });
    });

    $('.new-existing #myLocationExisting, .new-existing #myLocationExistingCart').live('click', function (e) {

        e.preventDefault();

        var phoneNum = encodeURIComponent($.trim($(this).closest('.box-small').find('input[type=text]').val()));
        var foundErrors = false;
        $(".error").hide();

        if (phoneNum.replace(/\D/g, '').length !== 10) {
            $('.errorPhone').show();
            foundErrors = true;
        }

        var loading = $(this).closest(".new-existing").children(".loading");
        var successCallback = $(this).attr("href");
        function processData(data) {
            if (data.Success === true) {
                eval(successCallback);
                return;
            }
            if (data.Success === false) {
                loading.hide();
                if (data.BusinessError === true) {
                    //phone number tied to existing business account
                    $('.errorResult').show();
                }

                else if (data.UserNotFoundError === true) {
                    //phone number isn't tied to any account
                    $('.errorResult').show();
                }

                else if (data.ConnectionError === true) {
                    //swyft service unreachable
                    $('.errorResult').show();
                }
            }

        } //end processData

        if (foundErrors === false) {
            loading.show();
            $.getJSON('/Pages/Ajax/ConfirmExistingUser.aspx', { p: phoneNum }, processData);
        }

    }); //end click


    $('.new-existing #myLocationNew').live('click', function (e) {

        e.preventDefault();

        var $formBox = $(this).closest('.stretchable');
        var errorList = '<ul class="error">';
        var foundErrors = false;
        $(".error").hide();

        var formNumber = encodeURIComponent($.trim($formBox.find('#number').val()));
        var formStreet = encodeURIComponent($.trim($formBox.find('#street').val()));
        var formType = encodeURIComponent($.trim($formBox.find('#type').val()));
        var formApt = encodeURIComponent($.trim($formBox.find('#apt').val()));
        var formCity = encodeURIComponent($.trim($formBox.find('#city').val()));
        var formState = encodeURIComponent($.trim($formBox.find('#state').val()));
        var formZipcode = encodeURIComponent($.trim($formBox.find('#zipcode').val()));
        var formCounty = encodeURIComponent($.trim($formBox.find('#county').val()));

        var findErrors = (function () {

            if (formNumber.length === 0) {
                errorList += '<li>Please enter your house number</li>';
                foundErrors = true;
            }
            else if (!/\d/g.test(formNumber)) {
                errorList += '<li>Please enter numbers for house number</li>';
                foundErrors = true;
            }
            if (formStreet.length === 0) {
                errorList += '<li>Please enter your street name</li>';
                foundErrors = true;
            }
            if (formType.length === 0) {
                errorList += '<li>Please select your street type</li>';
                foundErrors = true;
            }
            if (formCity.length === 0) {
                errorList += '<li>Please select your city</li>';
                foundErrors = true;
            }
            if (formState.length === 0) {
                errorList += '<li>Please select your state</li>';
                foundErrors = true;
            }
            if (formZipcode.length === 0) {
                errorList += '<li>Please enter your zip code</li>';
                foundErrors = true;
            }
            else if (!/^\d{5}$/g.test(formZipcode)) {
                errorList += '<li>Please enter a valid zip code</li>';
                foundErrors = true;
            }
            if (formCounty.length === 0) {
                errorList += '<li>Please enter your county</li>';
                foundErrors = true;
            }

        })();

        if (foundErrors === true) {

            // we have errors, lets show the user
            errorList += '</ul>';
            $('.stretchable .errors').html(errorList);
            $('.stretchable .errors').show();

        } else {

            var loading = $(this).closest(".new-existing").children(".loading");
            var successCallback = $(this).attr("href");
            function processForm(data) {
                eval(successCallback);
            } //end processForm
            loading.show();
            $.getJSON('/Pages/Ajax/CheckServiceableArea.aspx',
            {
                n: formNumber,
                st: formStreet,
                t: formType,
                a: formApt,
                c: formCity,
                s: formState,
                z: formZipcode,
                ct: formCounty
            }, processForm);

        } //end else statement


    }); //end click

    (function () {
        var $supportMapImg = $('.support-stores .col-left').find('img'),
        mapSrc = $supportMapImg.attr('src');

        if (!mapSrc) {
            return $supportMapImg.hide();
        } else {
            return $supportMapImg.show();
        }
    } ());

    $(function () {
        if (!$('.referee-page')) { return false; }

        var $resBtn = $('#ResidentialButton'),
            $busBtn = $('.ss-businessButton'),
            resBtnSrc = $resBtn.attr('src'),
            busBtnSrc = $busBtn.attr('src'),
            resBtn_off = '/uploadedimages/_Assets/structure/referee/residential-button_off.png',
            busBtn_off = '/uploadedimages/_Assets/structure/referee/business-button_off.png',
            resBtn_on = '/uploadedimages/_Assets/structure/referee/residential-button_over.png',
            busBtn_on = '/uploadedimages/_Assets/structure/referee/business-button_over.png';

        $resBtn.off('hover').on('hover', function () {
            if ($resBtn.attr('src') === resBtn_off) {
                $resBtn.attr('src', resBtn_on);
            } else {
                $resBtn.attr('src', resBtn_off);
            }
        });

        $busBtn.off('hover').on('hover', function () {
            if ($busBtn.attr('src') === busBtn_off) {
                $busBtn.attr('src', busBtn_on);
            } else {
                $busBtn.attr('src', busBtn_off);
            }
        });

    } ());


    $(function () {
        if (!$('.mod-008')) { return; }

        var $mod8, $dollarSize, colSetup, _determineColumns;

        $mod8 = $('.mod-008'),
        $dollarSize = $mod8.find('.dollar.size-3'),
        colSetup = {
            newColWidth: [
                {
                    two: 200,
                    three: 220,
                    four: 200
                }
            ],
            colClasses: [
                {
                    priceBlock: '.price-block',
                    two: '.col-2',
                    three: '.col-3',
                    four: '.col-4'
                }
            ]
        };

        _determineColumns = function () {
            if ($mod8.find(colSetup.colClasses[0].two).length >= 1) {
                return 2;
            } else if ($mod8.find(colSetup.colClasses[0].three).length >= 1) {
                return 3;
            } else if ($mod8.find(colSetup.colClasses[0].four).length >= 1) {
                return 4;
            } else {
                return false;
            }
        };

        if ($dollarSize.length >= 1) {
            return $dollarSize.each(function () {
                var $this = $(this);
                if (_determineColumns() === 2) {
                    return $this.parent(colSetup.colClasses[0].priceBlock).width(colSetup.newColWidth[0].two);
                } else if (_determineColumns() === 3) {
                    return $this.parent(colSetup.colClasses[0].priceBlock).width(colSetup.newColWidth[0].three);
                } else if (_determineColumns() === 4) {
                    return $this.parent(colSetup.colClasses[0].priceBlock).width(colSetup.newColWidth[0].four);
                }
            });
        }
    } ());

});

var mobileSupportHeaderHeight = function() {

    if (layoutWidth < 480) {

        var $supportBanner = $('.support-banner'),
            $bannerBox = $supportBanner.find('.banner-box'),
            $lead = $bannerBox.find('.lead');

        heights = $lead.map(function() {
            return $(this).height();
        }).get(),

        maxHeight = Math.max.apply(null, heights);

        $bannerBox.height(maxHeight);
    } else {
        return;
    }

};

var supportMapImage = function () {
    var $supportMapImg = $('.support-stores .col-left').find('img'),
        mapSrc = $supportMapImg.attr('src');

    if (!$supportMapImg) return;

    if (!mapSrc) {
        return $supportMapImg.hide();
    } else {
        return $supportMapImg.show();
    }
};

/* My Location 320 modal */
var mobileUtilityLocation = function () {
    if (layoutWidth === 320) {
        $('.utility-location').live('click', function () {
            createModal($(this).find('.edit-container > a').attr("href"));
        });
    }
};


/* Search & Site Placeholder for inputs */
$(function () {

    $(':input').focus(function () {
        if ($(this).hasClass('error')) {
            $(this).removeClass('error').removeAttr('value');
        }
    });

    $('[placeholder]').focus(function () {
        var input = $(this);
        input.select();
        if (input.val() == input.attr('placeholder')) {
            input.val('');
            input.removeClass('placeholder');
        }
    }).blur(function () {
        var input = $(this);
        if (input.val() == '' || input.val() == input.attr('placeholder')) {
            input.addClass('placeholder');
            input.val(input.attr('placeholder'));
        }
    }).blur();
});


/* Dropdown List functionality */
$(function () {
    $('.dropdown-box').hide();

    $('.dropdown-btn span').live('click', function () {
        if ($(this).parent().hasClass('on')) {
            $(this).parent().removeClass('on').children('.dropdown-box').hide();
        }
        else {
            $(this).parent().addClass('on').children('.dropdown-box').show();
        }
    });

    $('.dropdown-btn').live('mouseleave', function () {
        $(this).removeClass('on').children('.dropdown-box').hide();
    });

    $('.dropdown-box li').live('click', function () {
        var value = $(this).html();
        $('.dropdown-btn').removeClass('on');
        $(this).closest('.dropdown-btn').children('span').html(value);
        $('.dropdown-box').hide();
    });

    // z-index focus for forms
    $('.dropdown-btn').focus(function () {
        $(this).parent().find('.dropdown-btn span').click();
    });
});


/* Comparison Modal Drop Down Listener */
$(function () {
    $('.modal-comparison .modal-content .ddl-compare').live("change", function () {
        var panel = '.' + $(this).attr('value');
        $('.on').removeClass('on');
        $(panel).addClass('on');
    });
});


/* Show/hide cart details */
$(function () {
    $('.hide-details').live('click', function () {
        if ($(this).hasClass('show-details')) {
            $(this).next('.item-box').removeClass('hide-box');
            $(this).removeClass('show-details');
            $(this).html('- <span>Hide Details<span>');
        } else {
            $(this).next('.item-box').addClass('hide-box');
            $(this).addClass('show-details');
            $(this).html('+ <span>Show Details</span>');
        }
    });
});


/* Utility drop down functionality */
$(function () {
    $('.search-btn').on("click", function () {
        if ($('.search-btn').hasClass('utility-on')) {
            $('.search-btn,.search-dropdown').removeClass('utility-on');
        }
        else {
            $('.account-list li ul').removeClass('utility-on');
            $('.search-btn,.search-dropdown').addClass('utility-on');
        }
    });

    $('.account-list-header').on("click", function () {
        if ($('.account-list li ul').hasClass('utility-on')) {
            if ($('body').hasClass('snap-320')) {
                $(this).removeClass('on');
            }
            $('.account-list li ul').removeClass('utility-on');
        }
        else {
            if ($('body').hasClass('snap-320')) {
                $(this).addClass('on');
            }
            $('.search-btn,.search-dropdown').removeClass('utility-on');
            $('.account-list li ul').addClass('utility-on');
        }
    });
});


/* Search for Support */
$(function () {
    if ( $('.support-search').length === 1) {
        $('.support-search .search-left .adv-search').hide();
        $('.support-search .search-left .search-adv').live('click', function () {
            $('.support-search .search-left .adv-search').show();
            $('.support-search .search-left .search-adv').hide();
        });
        $('.support-search .search-left .search-basic').live('click', function () {
            $('.support-search .search-left .adv-search').hide();
            $('.support-search .search-left .search-adv').show();
        });
    }
});


/* Advanced Search
$(wireupAdvancedSearch());
function wireupAdvancedSearch() {
    $('.advanced-search-btn').on('click', function (e) {
        if ($(this).hasClass('advanced')) {
            $('.advanced-search').toggle();
            $(this).removeClass('advanced').addClass('basic').html('Basic Search');
        } else {
            $('.advanced-search').toggle();
            $(this).removeClass('basic').addClass('advanced').html('Advanced Search');
        }
        e.preventDefault();
    });
} */

/* MOD-003 IMAGE SWAP CONTROL */
$(function () {
    var items = $('.product-buttons li').click(function () {
        var index = items.index(this);
        $(this).parents('.product-row').find('.switcher > .image-container:visible').addClass('box-hide').hide();
        $('.mod-003').find('.switcher > .image-container').eq(index).show();
        $(this).parents('.product-row').find('ul.product-buttons li.active').removeClass('active');
        $(this).addClass('active');
    });
});


/* Module 1A Landing Page Hero */
var mod1AHeader = function () {
    var $columns = $('.mod-001a .top-container .col');
    var colLength = $columns.length;

    if (colLength == 1) {
        $columns.eq(0).addClass('full');
    }
    else if (colLength == 2) {
        $columns.eq(0).addClass('split'); $columns.eq(1).addClass('right');
    }
    else {
        // if we are in 320 and the middle column contains an image, lets hide it
        if ($('body').hasClass('snap-320') && $('.mod-001a .col').eq(1).has('img')) {
            $columns.eq(1).css('display', 'none');
        }
        $columns.addClass('triple'); $columns.eq(1).addClass('product-img'); $columns.eq(2).addClass('right last'); $columns.eq(0).addClass('first');
    }
};


/* 320 Slide-in Menu */
var mobileSlideMenu = function () {
    if (layoutWidth === 320) {
        $('.utility-nav').click(function () {
            $('.slide-menu').animate({ left: 0 }, 400, 'easeOutQuint');
            $('.slide-menu-background').fadeIn();
        });

        $('.slide-menu .close').click(function () {
            $('.slide-menu').animate({ left: '-385px' }, 200, 'easeOutCubic');
            $('.slide-menu-background').fadeOut();
        });

        $('.slide-menu-background').click(function () {
            if ($('.slide-menu-background').css('display') == 'block') {
                $('.slide-menu .close').click();
            }
        });
    }
};

var mobileLogo = function () {
    var $mainNav = $('.welcome-nav-bar').length ? $('.welcome-nav-bar') : $('.main-nav-bar');

    if (layoutWidth === 320 && $('.main-nav-bar').length) {
        var utilOffset = $('.utility-bar').offset(),
            utilOffsetL = utilOffset.left,
            newOffset = (utilOffsetL + 82);

        if ( detectAndroidPhone() && detectAndroidPhone() ){
            return setTimeout(function() {
                $mainNav.offset({ left: newOffset });
            }, 500);
        } else {
            return $mainNav.offset({ left: newOffset });
        }

    } else {
        return $mainNav.css('left', 0);
    }
};


/* Module 18 - Horizontal Content List */
var modSlide = function ($mod) {

    var $arrowLeft = $mod.find('.arrow-left img');
    var $arrowRight = $mod.find('.arrow-right img');
    var $slideTracking = $mod.find('.slide-tracking');
    var slideWidth = $mod.find('.slide').eq(0).width(); // assume slides have a set, constant width
    var totalSlides = $mod.find('.slide').length; // store total slide count
    var slidePosition = 1; // default slide position
    var currentTrackPosition = parseInt($mod.find('.slide-tracking').css('left'), 10);
    var endSlidePosition = 3; // we are only showing 3 slides at any given time
    var transitionSpeed = 400;
    var transitAnimation = 'easeInOutQuart';

    var numberOfSlides = 3;

    var arrowLeftInactive = '/uploadedimages/_Assets/content/pages/electronics/slideimages/arrow-inactive-left.png';
    var arrowLeftActive = '/uploadedimages/_Assets/content/pages/electronics/slideimages/arrow-active-left.png';
    var arrowRightInactive = '/uploadedimages/_Assets/content/pages/electronics/slideimages/arrow-inactive-right.png';
    var arrowRightActive = '/uploadedimages/_Assets/content/pages/electronics/slideimages/arrow-active-right.png';

    // for 768 we are going to only show 2 slides
    if (layoutWidth === 768) {
        endSlidePosition = 2;
        numberOfSlides = 2;
    }

    function slideInit() {
        if (layoutWidth === 768) {
            if (totalSlides > 2 && (endSlidePosition < totalSlides)) {
                $arrowRight.attr('src', arrowRightActive);
            }
        } else {
            if (totalSlides > 3 && (endSlidePosition < totalSlides)) {
                $arrowRight.attr('src', arrowRightActive);
            }
        }
        if (slidePosition == 1) {
            $arrowLeft.attr('src', arrowLeftInactive);
        }
    }

    function moveTrackRight() {

        if (endSlidePosition >= totalSlides) { // we are on the last slide and need to turn arrow inactive and disable right scroll
            $arrowRight.attr('src', arrowRightInactive);
        } else {
            if (!$slideTracking.is(':animated')) { // only move if slide-tracker isn't currently moving
                $arrowRight.attr('src', arrowRightActive);
                $slideTracking.animate({ left: currentTrackPosition -= slideWidth }, transitionSpeed, transitAnimation);

                slidePosition++;
                endSlidePosition++;

                if (endSlidePosition >= totalSlides) {
                    // if we are now at the end, disable right arrow
                    $arrowRight.attr('src', arrowRightInactive);
                }

                if (slidePosition > 1) {
                    // since we just moved right, we need to see if there are any slides to the left not shown, if there are, active left arrow
                    $arrowLeft.attr('src', arrowLeftActive);
                }
            }
        }
    }

    function moveTrackLeft() {

        if (slidePosition == 1) { // we are back at the beginning, turn arrow inactive and disable left
            $arrowLeft.attr('src', arrowLeftInactive);
        } else {
            if (!$slideTracking.is(':animated')) {
                $arrowLeft.attr('src', arrowLeftActive);
                $slideTracking.animate({ left: currentTrackPosition += slideWidth }, transitionSpeed, transitAnimation);
                slidePosition--;
                endSlidePosition--;

                if (slidePosition == 1) {
                    // if we are back at the start, inactive left arrow
                    $arrowLeft.attr('src', arrowLeftInactive);
                }

                if (endSlidePosition < totalSlides) {
                    // then we also need to check right side and re-activate right arrow
                    $arrowRight.attr('src', arrowRightActive);
                }
            }
        }
    }

    function moveTrackToIndex(movementToIndex) {

        var movementAmount = movementToIndex - slidePosition;
        slidePosition = movementToIndex;
        endSlidePosition = slidePosition + numberOfSlides - 1;

        $arrowLeft.attr('src', arrowLeftActive);
        $arrowRight.attr('src', arrowRightActive);

        if (endSlidePosition >= totalSlides) {
            $arrowRight.attr('src', arrowRightInactive);
        }

        if (slidePosition <= 1) {
            $arrowLeft.attr('src', arrowLeftInactive);
        }

        if (endSlidePosition > totalSlides) {
            movementAmount = movementAmount - 1;
            endSlidePosition = totalSlides;
            slidePosition = totalSlides - numberOfSlides + 1;
        }

        if (slidePosition <= 0) {
            movementAmount = movementAmount + 1;
            slidePosition = 1;
            endSlidePosition = slidePosition + numberOfSlides - 1;
        }

        $slideTracking.animate({ left: currentTrackPosition = currentTrackPosition - (slideWidth * movementAmount) }, transitionSpeed, transitAnimation);
    }

    //Center on selected item
    var checkedRadio = $mod.find('input[type=radio]:checked');

    var target = null;
    var index = 0;

    if (checkedRadio.length == 1) {
        target = checkedRadio[0].id;
    }

    if (target != null) {
        var $bundlizerButtons = $mod.find('input[type=radio]');
        for (var j = 0; j < $bundlizerButtons.length; j++) {

            if (target == $bundlizerButtons[j].id) {
                moveTrackToIndex(j);
                break;
            }
        }
    }

    // arrow click events
    $arrowRight.live('click', function () { moveTrackRight(); });
    $arrowLeft.live('click', function () { moveTrackLeft(); });

    slideInit();

};






/* Module 2 Vertical Content Changer */
$(function () {
    $('.mod-002 .slide:first-child').show();
    $('.mod-002 .arrow-up img').hide();

    var slideNav = $('.mod-002 .slide-nav li').click(function () {
        var slideIndex = slideNav.index(this);
        $('.mod-002 .active').removeClass('active');
        $('.mod-002 .slide-nav li').eq(slideIndex).addClass('active');
        $(this).parents('.slide-container').find('.slides-cont .slide:visible').fadeOut('fast', function () {
            $(this).parents('.slide-container').find('.slides-cont .slide').eq(slideIndex).fadeIn('slow');
        });
    });

    var listcount = $('.mod-002 .slide-nav li').size(); var cli = 1; var count = 4;

    if (listcount <= 4) $('.mod-002 .arrow-down').hide();

    function doArrowUp() {
        if (count > 5) { $('.mod-002 .arrow-up img').show(); } else { $('.mod-002 .arrow-up img').hide(); }
        if (cli > 1) { $('.mod-002 .arrow-up img').show(); } else { $('.mod-002 .arrow-up img').hide(); }
    }

    function doArrowDown() { if (count >= listcount) { $('.mod-002 .arrow-down').hide(); } else { $('.mod-002 .arrow-down').show(); } }

    function updateCurrentTabUp() {
        var currentActiveItem = $('.mod-002 li.active').index();
        if (count - currentActiveItem === 0) {
            var newActiveItem = (currentActiveItem - 1);
            $('.mod-002 .slide-nav li.active').removeClass('active');
            $('.mod-002 .slide-nav li').eq(newActiveItem).addClass('active');
            $('.mod-002 .slide-container').find('.slides-cont .slide:visible').fadeOut('fast', function () {
                $('.mod-002 .slide-container').find('.slides-cont .slide').eq(newActiveItem).fadeIn('slow');
            });
        }
    }

    function updateCurrentTabDown() {
        var currentActiveItem = $('.mod-002 li.active').index();
        if (count - currentActiveItem === 5) {
            var newActiveItem = (currentActiveItem + 1);
            $('.mod-002 .slide-nav li.active').removeClass('active');
            $('.mod-002 .slide-nav li').eq(newActiveItem).addClass('active');

            $('.mod-002 .slide-container').find('.slides-cont .slide:visible').fadeOut('fast', function () {
                $('.mod-002 .slide-container').find('.slides-cont .slide').eq(newActiveItem).fadeIn('slow');
            });
        }
    }

    $('.mod-002 .arrow-down').click(function () {
        if (cli < listcount) { $('.mod-002 .slide-nav li:nth-child(' + cli + ')').one().slideToggle('fast'); cli++; count++; }
        doArrowUp(); doArrowDown(); updateCurrentTabDown();
    });

    $('.mod-002 .arrow-up').click(function () {
        if (cli > 1) { cli--; count--; $('.mod-002 .slide-nav li:nth-child(' + cli + ')').one().slideToggle('fast'); }
        doArrowUp(); doArrowDown(); updateCurrentTabUp();
    });
});


/* Subnav Menues */
$(function () {
    var hasCurrentState = false;
    $('.main-nav > ul > li').hover(function (index) {
        hasCurrentState = false; // reset to false inside function to it doesn't carry over to other nav items
        if ($(this).find('a').hasClass('current')) {
            hasCurrentState = true;
            $(this).find('a').removeClass('current');
        }

        $(this).find('a').addClass('hovered');
        $('ul.sub-nav').removeClass('sub-current');

        if ($(this).has('ul.sub-nav')) {

            if ($('body').hasClass('snap-1024')) {
                if ($(this).index() === 4) { $(this).find('ul.sub-nav').css('left', '-187px'); }
                else if ($(this).index() === 3) { $(this).find('ul.sub-nav').css('left', '-180px'); }
                else if ($(this).index() === 2) { $(this).find('ul.sub-nav').css('left', '-260px'); }
            }
            else if ($('body').hasClass('snap-768')) {
                if ($(this).index() === 4) { $(this).find('ul.sub-nav').css('left', '-230px'); }
                else if ($(this).index() === 3) { $(this).find('ul.sub-nav').css('left', '-200px'); }
                else if ($(this).index() === 2) { $(this).find('ul.sub-nav').css('left', '-300px'); }
            }
            else if ($('body').hasClass('snap-1600')) {
                if ($(this).index() === 4) { $(this).find('ul.sub-nav').css('left', '-135px'); }
                else if ($(this).index() === 3) { $(this).find('ul.sub-nav').css('left', '-125px'); }
                else if ($(this).index() === 2) { $(this).find('ul.sub-nav').css('left', '-210px'); }
            }

            $(this).find('ul.sub-nav li a span:last').css({ 'border-right': 0, 'padding-right': 0 });
            $(this).find('ul.sub-nav li a span:first').css('padding-left', '10px');
            $(this).find('ul.sub-nav').addClass('sub-current');
        }
    },
    function () {
        if (hasCurrentState === true) {
            $(this).find('a').addClass('current');
        }
        $(this).find('a').removeClass('hovered');
        $(this).find('ul.sub-nav').removeClass('sub-current');

    });
});


/* 320 Support Left Nav Clsoe Box */
var supportTabWizard = function () {
    if ($('body').hasClass('snap-320')) {

        var addPlus = '<span>[&plus;]</span>';
        $('.snap-320 .nav-group').hide();
        $('.left-col-box h2').removeClass('on');

        if ($('.left-col-box h2 span').length === 0) {
            $('.left-col-box h2').prepend(addPlus);
        }
        else {
            $('.left-col-box h2 span').show();
        }

        $('.left-col-box h2').on('click', function () {
            if ($(this).hasClass('on')) {
                $('.snap-320 .nav-group').hide();
                $('.left-col-box h2 span').html('[&plus;]');
                $(this).css('margin-bottom', '0px').removeClass('on');

            }
            else {
                $('.snap-320 .nav-group').show();
                $('.left-col-box h2 span').html('[&ndash;]');
                $(this).css('margin-bottom', '10px').addClass('on');
            }
        });

    } else {
        $('.nav-group').show();
        $('.left-col-box h2 span').html('[&plus;]').hide();
        $('.left.col-box h2').css('marginBottom', '10px').removeClass('on');
    }
};


/* Module 9 - Set height of all divs then set each one's height to max */
var mod9Height = function ($mod) {

    if (layoutWidth > 480) {

        var $modCol = $mod.find('.col-4');

        heights = $modCol.map(function () {
            return $(this).height();
        }).get(),

        maxHeight = Math.max.apply(null, heights);

        $modCol.each(function () {
            $(this).height(maxHeight);
        });
    }
    else {
        $('.snap-320 .mod-009 .col-4').css('height', 'auto');
    }
};

/* Module 8 2-6 item Layout Changer */
$(function () {
    $('.mod-008 .more-plans').click(function (e) {
        e.preventDefault();

        var height = 475;
        var lineBreakTopMargin = -507;

        var $column = $('.mod-008 .column');

        if (!$('body').hasClass('snap-320')) {
            $column.css('height', height + 'px');

            // We only want to append the mod-break once (and we are coming through here twice).
            if ($('.mod-008 .mod-content .mod-break').length === 0) {
                $('.mod-008 .mod-content').append("<div class='mod-break clearfix' style='margin-top: " + lineBreakTopMargin + "px;'></div>");
            }
        }
        $column.removeClass('col-4');
        $column.addClass('col-3');
        $column.eq(0).fadeIn('250').css('backgroundColor', '#f5f5f5');
        $column.eq(5).fadeIn('250').css('backgroundColor', '#f5f5f5');
        $column.eq(4).removeClass('last');
        $column.eq(2).addClass('last');
        $column.eq(5).addClass('last');

        $('.mod-008 .more-plans').addClass('hide');
    });

    $('.mod-008-list').hide();

    $('.included').click(function (e) {
        e.preventDefault();
        $(this).next().toggle();

        if ($('.snap-768 .column.col-4').css('height') === '575px') {
            $('.snap-768 .column.col-4').css('height', 'auto');
        } else {
            $('.snap-768 .column.col-4').css('height', '575px');
        }
    });

    $(".mod-008 .swap").click(function (e) {
        e.preventDefault();

        $(this).closest(".mod-008").toggleClass("hide").siblings(".mod-008").toggleClass("hide").each(function () {
            //normalizePlanHeight(true);
        });

        normalizePlanHeight();
    });
});

var normalizePlanHeight = function (refire) {

    if ($('.mod-008').length === 0) return false;
    if ($('body').hasClass('snap-320')) return false;

    if (refire === true) {
        $('.resolution-big h2').each(function () {
            $(this).css('height', 'auto');
        });

        $('.column .details').each(function () {
            $(this).css('height', 'auto');
        });

        $('ul.mod-008-list').each(function () {
            $(this).css('height', 'auto');
        });
    }

    var $mod8 = $('.mod-008:visible');

    $mod8.each(function () {
        var column = $(this).find('.column');
        column.each(function () {
            // H2 Headers
            var h2 = $(column).find('.resolution-big h2');
            var headerHt = h2.map(function () {
                return $(this).height();
            }).get(),
            headerMaxHt = Math.max.apply(null, headerHt);
            h2.each(function () {
                $(this).height(headerMaxHt);
            });

            // Details
            var details = column.find('.details');
            var detailsHt = details.map(function () {
                return $(this).height();
            }).get(),
            detailsMaxHt = Math.max.apply(null, detailsHt);
            details.each(function () {
                $(this).height(detailsMaxHt);
            });

            // Price block
            var priceblock = column.find('.center-content');
            var priceHt = priceblock.map(function () {
                return $(this).height();
            }).get(),
            priceMaxHt = Math.max.apply(null, priceHt);
            priceblock.each(function () {
                $(this).height(priceMaxHt);
            });

            // UL
            var list = column.find('ul.mod-008-list');
            var listHt = list.map(function () {
                return $(this).height();
            }).get(),
            listMaxHt = Math.max.apply(null, listHt);
            list.each(function () {
                $(this).height(listMaxHt);
            });

        });
    });
};


/* Electronics page - max column height to max height */
var electronicsHeight = function ($mod) {
    if (layoutWidth > 480) {
        var $modCol = $mod.find('div');
        $modCol.each(function () {
            $(this).css('height', 'auto');
        });

        var heights = $mod.map(function () {
            return $(this).height();
        }).get(),
        maxHeight = Math.max.apply(null, heights);

        $modCol.each(function () {
            $(this).height(maxHeight - 25);
        });
    }
    else {
        $('.snap-320 .module-product-grid').find('.product-row > div').css('height', 'auto');
    }
};


/* Header Mod5 Bar Check for 320 */
var promoBar320 = function () {
    if ($(".snap-320 .banner .mod-005").length !== 0) {
        $('.snap-320 .page-wrapper').css('top', '159px');
    }
    else if ($('.snap-320 .electronics-banner').length !== 0) {
        $('.snap-320 .page-wrapper').css('top', '159px');
    }
    else if ($('.snap-320 .support-banner').length !== 0) {
        $('.snap-320 .page-wrapper').css('top', '159px');
    }
    else {
        $('.snap-320 .page-wrapper').css('top', '68px');
    }

    if ($('body').hasClass('snap-768') || $('body').hasClass('snap-1024') || $('body').hasClass('snap-1600')) {
        $('.page-wrapper').css('top', 'auto');
    }

    if ($('body').hasClass('snap-320')) {
        if ($('.page-wrapper').hasClass('cart-content')) {
            $('.page-wrapper').css('top', '67px');
        }
    }
    else {
        if ($('.page-wrapper').hasClass('cart-content')) {
            $('.page-wrapper').css('top', '130px');
        }
    }
};


/* 320 Support Tab Slide  */
var supportTabSlide = function () {

    if ( $('.tab-navigation').length === 0 || !$('.tabbed-content .nav-arrow-left').is(':visible') || layoutWidth !== 320 || layoutWidth !== 768 ) {
        return false;
    }

    var $tabNavList = $('.tab-navigation ul'),
        totalTabNav = $('.tab-navigation ul li').length,
        tabNavCurrPos = 1,
        tabNavULWidth = 0,
        tabMoveBy = '0px',
        tabCalc = 0,
        moveCount = 0;

    $tabNavList.css('left', '0');

    if (layoutWidth == 768) {
        tabNavULWidth = (totalTabNav * 190);
        tabMoveBy = '190px';
        tabCalc = 2;
    }
    else {
        tabNavULWidth = (totalTabNav * 155);
        tabMoveBy = '155px';
        tabCalc = 1;
    }

    $tabNavList.css('width', tabNavULWidth);

    moveTabsRight = function () {
        if (!$tabNavList.is(':animated')) {
            $tabNavList.animate({ left: '-=' + tabMoveBy }, 500, 'easeOutQuint',
                function () {
                    tabNavCurrPos += 1;
                    moveCount++;
                    if (moveCount > 1 || moveCount > 0) {
                        $('.tabbed-content .nav-arrow-left').removeClass('light');
                    } else {
                        $('.tabbed-content .nav-arrow-left').addClass('light');
                    }

                    if ((tabNavCurrPos + tabCalc) == totalTabNav) {
                        $('.tabbed-content .nav-arrow-right').addClass('light');
                    } else {
                        $('.tabbed-content .nav-arrow-right').removeClass('light');
                    }
                });
        }
    };

    moveTabsLeft = function () {
        if (!$tabNavList.is(':animated')) {
            $tabNavList.animate({ left: '+=' + tabMoveBy }, 500, 'easeOutQuint',
                function () {
                    tabNavCurrPos -= 1;
                    moveCount--;
                    if (moveCount == 0) {
                        $('.tabbed-content .nav-arrow-left').addClass('light');
                    } else {
                        $('.tabbed-content .nav-arrow-left').removeClass('light');
                    }

                    if ((tabNavCurrPos + tabCalc) != totalTabNav) {
                        $('.tabbed-content .nav-arrow-right').removeClass('light');
                    } else {
                        $('.tabbed-content .nav-arrow-right').addClass('light');
                    }
                });
        }
    };


    $tabNavList.find('li').each(function (index) {
        if ($('body').hasClass('snap-320') || $('body').hasClass('snap-768')) {
            if ($(this).hasClass('on') && index > tabCalc) {
                var i = 0,
                pushClock = setInterval(function () {
                    moveTabsRight();
                    i++;
                    if (i == index - tabCalc) clearInterval(pushClock);
                }, 510);
            }
        }
    });


    // on first load, set left arrow to inactive
    $('.tabbed-content .nav-arrow-left').addClass('light');

    $('.tabbed-content .nav-arrow-right').off('click');
    $('.tabbed-content .nav-arrow-right').on('click', function (e) {
        if ((tabNavCurrPos + tabCalc) === totalTabNav) {
            e.preventDefault();
        } else {
            moveTabsRight();
        }
    });

    $('.tabbed-content .nav-arrow-left').off('click');
    $('.tabbed-content .nav-arrow-left').on('click', function (e) {
        if (tabNavCurrPos === 1) {
            e.preventDefault();
        } else {
            moveTabsLeft();
        }

    });
};

/* About Page Left Column */
$(function () {
    $('.nav-col .nav-group a.has-sub-menu').click(function (e) {
        e.preventDefault();
        if ($(this).hasClass('open')) {
            $(this).removeClass('open').addClass('closed');
            $(this).parent('li').find('ul.sub-menu').slideUp();
        } else {
            $(this).removeClass('closed').addClass('open');
            $(this).parent('li').find('ul.sub-menu').slideDown();
        }
    });
});

/* Electronics Header Switcher */
$(function () {
    $('.electronics-nav li').on('click', function () {
        var goTo = $(this).find('a').attr('data');
        $('.electronics-nav a.current').removeClass('current');
        $(this).find('a').addClass('current');
        $('.callout.on').removeClass('on');
        $('.content-' + goTo).addClass('on');
        return false;
    });
});


/* Support Header Switcher */
$(function () {

    function setSupportHeaderCookie(val) {
        var oldVal = $.cookie('support-selected-tab');
        $.removeCookie('support-selected-tab', { path: '/' });
        return $.cookie('support-selected-tab', val, { path: '/' });
    }

    function setInitialSupportHeader() {
        if ( !$.cookie('support-selected-tab') ) {
            return $.cookie('support-selected-tab', 1, { path: '/' });
        }
    }

    setInitialSupportHeader();

    $('.support-nav li').live('click', function () {
        var goTo = $(this).find('a').attr('data');
        var slideString = goTo.split('-');

        $('.support-nav li a.current').removeClass('current');
        $(this).find('a').addClass('current');
        $('.lead.on').removeClass('on');
        $('.support-slide-' + slideString[2] + '').addClass('on');

        setSupportHeaderCookie( $(this).index() + 1 );

        return false;
    });


    // Check cookie for saved header state
    if ( $.cookie('support-selected-tab') ) {

        var $supportNavLI = $('.support-nav li');

        switch ( $.cookie('support-selected-tab') ) {
            case '1':
                $supportNavLI.eq(0).click();
                setSupportHeaderCookie(1);
                break;

            case '2':
                $supportNavLI.eq(1).click();
                setSupportHeaderCookie(2);
                break;

            case '3':
                $supportNavLI.eq(2).click();
                setSupportHeaderCookie(3);
                break;

            case '4':
                $supportNavLI.eq(3).click();
                setSupportHeaderCookie(4);
                break;

            case '5':
                $supportNavLI.eq(4).click();
                setSupportHeaderCookie(5);
                break;

            default:
                break;
        }
    }
});


//HERO FUNCTIONALITY

function heroSlider() {

    var
    $slides = $('.mod-001 .slide'),
    $slideTracker = $('.mod-001 .slide-container'),
    totalSlides = $slides.length,
    slideWidth = $slides.eq(0).width(),
    slidePosition = 1,
    heroRotate = '',
    heroRotateSpeed = 9000,
    slideCount = (100 / (totalSlides - 1)),
    documentWidth = $(window).width(),
    killTimer = false;

    if ($slideTracker.length <= 0)
        return;

    switch (layoutWidth) {
        case 1600: slideWidth = 1450; break;
        case 1024: slideWidth = 950; break;
        case 768: slideWidth = 750; break;
        case 320: slideWidth = 480; break;
        default: slideWidth = 950; break;
    }

    slideAlign = ((documentWidth / 2) - (slideWidth / 2)),
    slideMarginRight = parseInt($slides.css('marginRight'), 10),
    slideMarginLeft = parseInt($slides.css('marginLeft'), 10),
    slideTotalMargin = slideMarginRight + slideAlign,
    slideTotalWidth = (slideWidth + slideTotalMargin),
    resetToLastSlide = '-' + ((totalSlides * slideTotalWidth) - slideTotalWidth);

    var resizeTimer = false;
    $(window).resize(function () {
        if (resizeTimer !== false) {
            clearTimeout(resizeTimer);
        }
        resizeTimer = setTimeout(resizeHero, 700);
    });

    resizeHero = function () {

        function diff(a, b) {
            return Math.abs(a - b);
        }

        switch (layoutWidth) {
            case 1600: slideWidth = 1450; break;
            case 1024: slideWidth = 950; break;
            case 768: slideWidth = 750; break;
            case 320: slideWidth = 480; break;
            default: slideWidth = 950; break;
        }

        oldDocumentWidth = documentWidth,
        documentWidth = $(window).width(),
        widthDifference = diff(oldDocumentWidth, documentWidth),
        slideMarginRight = parseInt($slides.css('marginRight'), 10),
        slideMarginLeft = parseInt($slides.css('marginLeft'), 10),
        slideAlign = ((documentWidth / 2) - (slideWidth / 2)),
        slideTotalMargin = slideMarginRight + slideAlign,
        slideTotalWidth = (slideWidth + slideTotalMargin),
        resetToLastSlide = '-' + ((totalSlides * slideTotalWidth) - slideTotalWidth);

        if (layoutWidth === 1600) {
            slideTotalMargin = 1850 + slideAlign,
            resetToLastSlide = '-' + ((totalSlides * slideTotalWidth) - slideTotalWidth);
            slideTotalWidth = slideTotalMargin;
        }

        if (layoutWidth === 320) {
            slideAlign = 0;
        }

        $slides.css('marginLeft', slideAlign);
        $('.mod-001 .arrow-left').css('left', slideAlign + 'px');
        $('.mod-001 .arrow-right').css('right', slideAlign + 'px');

        if ($slides.length > 1) {
            pushSlides('0');
            bgMover('resetFront');
            slidePosition = 1;
            pushProgressbar();
            $('.slide-control').progressbar({ value: 1 });
        }
    };


    $(function () {
        // setup init we need
        if (layoutWidth !== 320) {
            $slides.css('marginLeft', slideAlign);
        }
        else {
            $slides.css('marginLeft', 0);
            slideTotalWidth = 480;
        }
        $('.mod-001 .arrow-left').css('left', slideAlign + 'px');
        $('.mod-001 .arrow-right').css('right', slideAlign + 'px');

        function addTicks(count) {
            $('.slide-control-container .slide-control').addClass(count);
        }

        switch (totalSlides) {
            case 2: addTicks('two'); break;
            case 3: addTicks('three'); break;
            case 4: addTicks('four'); break;
            case 5: addTicks('five'); break;
        }

        $slides.each(function (index) {
            var bgAttribute = $(this).attr('background');
            $('.bgcolors').append('<div class="bg ' + bgAttribute + '"></div>');
        });
        $('.mod-001 .bgcolors .bg').hide();
        $('.mod-001 .bgcolors .bg').first().fadeIn();
    });


    rotateHero = function () {
        heroRotate = setInterval(function () {
            moveLeft();
            var currentTimeStamp = new Date();
        }, heroRotateSpeed);
    },


    clearHeroInterval = function () {
        if (heroRotate != "undefined") {
            clearInterval(heroRotate);
        }
    };


    function bgMover(action) {
        var $backgrounds = $('.mod-001 .bgcolors .bg');
        $backgrounds.eq(slidePosition - 1).fadeOut('slow');
        switch (action) {
            case 'next': $backgrounds.eq(slidePosition).fadeIn(500); break;
            case 'previous': $backgrounds.eq(slidePosition - 2).fadeIn(500); break;
            case 'resetFront': $backgrounds.eq(0).fadeIn(); break;
            case 'resetBack': $backgrounds.eq(totalSlides - 1).fadeIn(); break;
        }
    }


    function pushSlides(newPosition) {
        $slideTracker.animate({
            left: newPosition
        }, {
            duration: 700,
            specialEasing: { left: 'easeInOutQuart' }
        });
    }


    moveLeft = function () {
        if ($slides.length <= 1)
            return;
        if (!$slideTracker.is(':animated')) {
            var currentLeft = parseInt($slideTracker.offset().left, 10),
            movePosition = (currentLeft - slideTotalWidth);

            if (layoutWidth === 320) {
                var mobileOffset = $('.mod-001').find('.slide-wrapper').offset();
                if ( mobileOffset.left > 0 ) {
                    movePosition = (currentLeft - 480 - mobileOffset.left);
                } else {
                    movePosition = (currentLeft - 480);
                }

            }

            if (slidePosition === totalSlides) {
                $slides.fadeOut('fast');
                pushSlides('0');
                bgMover('resetFront');
                $slides.eq(0).fadeIn('slow');
                slidePosition = 1;
                $slides.fadeIn('slow');
            }
            else {
                pushSlides(movePosition);
                bgMover('next');
                slidePosition++;
            }
            pushProgressbar();
        }
    },

    moveRight = function () {
        if ($slides.length <= 1)
            return;
        if (!$slideTracker.is(':animated')) {
            var
            currentLeft = parseInt($slideTracker.offset().left, 10),
            movePosition = (currentLeft + slideTotalWidth);

            if (layoutWidth === 320) {
                var mobileOffset = $('.mod-001').find('.slide-wrapper').offset();
                if ( mobileOffset.left > 0 ) {
                    movePosition = 0;
                } else {
                    movePosition = (currentLeft + 480);
                }
            }

            if (slidePosition === 1) {

                if (layoutWidth === 320) {
                    var mobileOffset = $('.mod-001').find('.slide-wrapper').offset();
                    if ( mobileOffset.left > 0 ){
                        resetToLastSlide = '-' + ((totalSlides * 480) - 480 + mobileOffset.left);
                    } else {
                        resetToLastSlide = '-' + ((totalSlides * 480) - 480);
                    }
                }

                $slides.fadeOut('fast');
                pushSlides(resetToLastSlide);
                bgMover('resetBack');
                $slides.eq(totalSlides - 1).fadeIn('slow');
                slidePosition = totalSlides;
                $slides.fadeIn('slow');
            }
            else {
                pushSlides(movePosition);
                bgMover('previous');
                slidePosition--;
            }
            pushProgressbar();
        }
    };


    // Setup slide
    $(function () {
        $('.slide-control').slider({
            animate: 300, value: 1, min: 1, max: totalSlides, step: 1,
            start: function (event, ui) { start = ui.value; },
            stop: function (event, ui) {
                if (ui.value > start) {
                    moveLeft();
                    clearHeroInterval();
                }
                else {
                    moveRight();
                    clearHeroInterval();
                }
                $('.slide-control').progressbar({ value: ((ui.value - 1) * slideCount) });
                clearHeroInterval();
                killTimer = true;
                trackClick("Body:Carousel:slider" + ui.value);
            }
        });
        $('.slide-control').progressbar({ value: 1 });
    });


    function pushProgressbar() {
        slideMoveTo = ((slidePosition - 1) * slideCount);
        $('.slide-control').slider({
            'value': parseInt(slidePosition, 10),
            'animate': 300
        }, 'easeInOutQuart');
        $('.slide-control .ui-progressbar-value').stop(true).animate({ width: slideMoveTo + '%' }, 100, 'easeInOutQuart');
    }


    $('.mod-001 .arrow-left').click(function () {
        moveRight();
        clearHeroInterval();
        killTimer = true;
        trackClick("Body:Carousel:left arrow");
    });

    $('.mod-001 .arrow-right').click(function () {
        moveLeft();
        clearHeroInterval();
        killTimer = true;
        trackClick("Body:Carousel:right arrow");
    });

    if (totalSlides > 1) {
        $('.snap-320 .mod-001 .slide').swipe({
            swipeLeft: function () {
                moveLeft();
                killTimer = true;
                clearHeroInterval();
            },
            swipeRight: function () {
                moveRight();
                killTimer = true;
                clearHeroInterval();
            }
        });
    }

    $('.slide-container').hover(
        function () {
            clearHeroInterval();
        },
        function () {
            if (killTimer === false) {
                rotateHero();
            } else {
                clearHeroInterval();
                return false;
            }
        }
    );

    rotateHero();
} //end heroSlider

//ensure no items in hero detail are cut off
$(".details li").each(function () {
    var details = $(this).parent().parent();
    var li = $(this);
    if (li.position().top + li.height() > details.position().top + details.height())
        li.hide();
});

(function ($) {
    $.fn.swipe = function (options) {
        var defaults = {
            threshold: {
                x: 30,
                y: 10
            },
            swipeLeft: function () { },
            swipeRight: function () { }
        };
        var options = $.extend(defaults, options);
        if (!this) return false;
        return this.each(function () {
            var me = $(this);
            var originalCoord = {
                x: 0,
                y: 0
            };
            var finalCoord = {
                x: 0,
                y: 0
            };

            function touchStart(event) {
                originalCoord.x = event.targetTouches[0].pageX;
            }


            function touchMove(event) {
                event.preventDefault();
                finalCoord.x = event.targetTouches[0].pageX;
            }


            function touchEnd(event) {
                changeX = originalCoord.x - finalCoord.x;
                if (changeX > defaults.threshold.x) {
                    defaults.swipeLeft();
                }
                if (changeX < (defaults.threshold.x * -1)) {
                    defaults.swipeRight();
                }
            }

            function touchStart(event) {
                originalCoord.x = event.targetTouches[0].pageX;
                finalCoord.x = originalCoord.x;
            }

            this.addEventListener("touchstart", touchStart, false);
            this.addEventListener("touchmove", touchMove, false);
            this.addEventListener("touchend", touchEnd, false);
        });
    };
})(jQuery);


/* IE7 Banner Fix since IE7 needs absolute elements to have hard heights */
$(function () {
    if ($('html').hasClass('ie7')) {


        var bannerHeight = $('.banner-box > div').outerHeight(true) + 20;
        $('.banner-box').css('height', bannerHeight);
        $('.banner').css('height', bannerHeight);


        $('.banner div').each(function (index, element) {

            if ($('body').hasClass('snap-768')) {
                bannerHeight = 560;
            }
            else if ($('body').hasClass('snap-1024') || $('body').hasClass('snap-1600')) {
                bannerHeight = 619;
            }
            if ($(element).hasClass('content-hero-banner')) {
                $('.banner').css('height', bannerHeight);
            }

            if ($(element).hasClass('support-banner')) {
                $('.banner').css('height', 405);
                $('.banner-box').css('height', 215);
            }

            if ($(element).hasClass('electronics-banner')) {
                $('.banner').css('height', 405);
                $('.banner-box').css('height', 220);
            }
			
			if ($(element).hasClass('welcome-banner')) {
                $('.banner').css('height', 405);
                $('.banner-box').css('height', 215);
            }
        });

    }
});
