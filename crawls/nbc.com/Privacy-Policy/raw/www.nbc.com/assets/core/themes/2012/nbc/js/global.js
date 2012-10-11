/* -------------------------------------------------------------------------*/
/* GLOBAL Variables */
var NBC = jqN = jQuery.noConflict(),
    dropdown_global,
    dropdown_global_request = null,
    isTouch = 'ontouchstart' in document.documentElement,
    footer_global,
    loginInterval,
    loginStateChangeInterval,
    tabbed = false,
    isCurrentlyLoggedIn = nbcu.sn.session.isLoggedIn(),
    showId = SITE.id,
    clickedNav;

//needs to happen asap
NBC('.featured-video .video-item a').bind('click', function(e){
	e.preventDefault();
});

loginStateChangeInterval = self.setInterval("detectLoginStateChange()", 3000);

// BEGIN NBCU FRAMEWORK CONFIGURATION
nbcu.config.addParam("nbcuEnvironment", "production");
nbcu.config.addParam("frameworkUrl", "/assets/nbcu");
nbcu.config.addParam("frameworkApiUrl", "/app/api");
nbcu.config.addParam("snasSiteName", "nbc.com");
nbcu.config.addParam("snasSiteDomainName", "my.nbc.com");
nbcu.config.addParam("siteName", "NBC.com");
nbcu.config.addParam("socialNetworkName", "myNBC");
domain = document.domain;

if (domain.substring(0, 6) == "stage.") {
    nbcu.config.addParam("nbcuEnvironment", "stage");
} else if (domain.substring(0, 4) == "dev." || domain.indexOf(".dev.") > 1) {
    nbcu.config.addParam("nbcuEnvironment", "dev");
}
/* -------------------------------------------------------------------------*/
/* MYNBC INTERACTIVE ACTIONS */
function initMyNBC() {
    $loginBox = NBC("header.global .user-info");
    $obj = NBC("header.global .user-info");
    /* update login state */
    if (nbcu.sn.session.isLoggedIn()) {
        $loginBox.addClass("logged-in");
        /* myNBC login text (name/title login) */
        $loginBox.find(".welcome").html("Welcome Back");

        if (nbcu.sn.session.getUsername().length > 12) {
            var short_username  = nbcu.sn.session.getUsername().substring(0,10) + '...';
        } else {
            var short_username  = nbcu.sn.session.getUsername();
        }

        $loginBox.find(".username").html(short_username + ' <a class="logout" onclick="javascript:location.href=\'/assets/esp/social/accounts/logout?redirect=\'+location.href+\'&_=\'+Math.random()*10000000000000000;">Log Out</a><b class="caret"></b>');
    } else {
        $loginBox.find(".welcome").html("Welcome to NBC");
        $loginBox.find(".username").html('Log In or Sign Up <b class="caret"></b>');
    }

    /* login btns */
    $loginBox.find("a").click(function (event) {
        event.stopPropagation();
        clickedNav = null;
        closeDropdown();

        if (nbcu.sn.session.isLoggedIn()) {
            var randNum = Math.floor(Math.random()*999999999);

            NBC.fancybox({
                "type" : "iframe",
                "href" : '/assets/esp/social/Identity/getDashboard?page=1&perPage=10&cb='+randNum,
                "width" : 584,
                "height" : 498,
                "scrolling" : "no",
                "padding" : 0,
                "autoDimensions" : false,
                "centerOnScroll" : true
            });
        } else {
            showLoginPrompt();
        }

        return false;
    });
}
function showLoginPrompt(callback) {
    if (!nbcu.sn.session.isLoggedIn()) {
        NBC.fancybox({
            "type" : "iframe",
            "href" : "/assets/core/themes/2011/nbc/includes/login_overlay.html",
            "width" : 584,
            "height" : 498,
            "scrolling" : "no",
            "padding" : 0,
            "autoDimensions" : false,
            "centerOnScroll" : true
        });

        loginCallback = callback;
        window.clearInterval(loginInterval);
        loginInterval = self.setInterval("detectLogin(loginCallback)", 1000);
    } else {
        callback();
    }
}
function detectLogin(callback) {
    if (nbcu.sn.session.isLoggedIn()) {
        window.clearInterval(loginInterval);
        callback();
    }
}
function detectLoginStateChange() {
    if (isCurrentlyLoggedIn != nbcu.sn.session.isLoggedIn()) {
        isCurrentlyLoggedIn = nbcu.sn.session.isLoggedIn();
        initMyNBC();
    }
}
/* -------------------------------------------------------------------------*/
/* GLOBAL Dropdown */
function loadGlobalDropdown() {
    if (dropdown_global === undefined) {
        NBC('header.global .navbar a').unbind('focus', loadGlobalDropdown);
        NBC('header.global .navbar').unbind('mouseenter', loadGlobalDropdown);
        if (dropdown_global_request) {
            dropdown_global_request.abort();
        }
        dropdown_global_request = NBC.ajax({
            url: '/assets/core/themes/2012/nbc/includes/auto-generated/dropdowns-global.shtml',
            cache: (nbcu.config.getParam("nbcuEnvironment") == "dev") ? false : true
        }).done(function(data) {
            dropdown_global = data;
            NBC('#dropdowns-global').html(dropdown_global);
            NBC('#dropdowns-global .collapsible').hide(0);
            NBC('#dropdowns-global .btn-close').click(function (event) {
                event.stopPropagation();
                clickedNav = null;
                closeDropdown();
                return false;
            });
            loadGlobalDropdownShop();
        });
    }
}
function loadGlobalDropdownShop() {
    var shopHeader = NBC('#dropdown-global-extras .shop'),
        url;

    if (document.domain == "www.nbc.com") {
        url = "/api/shop/products.php?cnt=3&thumbnailimgsize=107&format=json";
    } else {
        url = "/assets/esp/utility/proxy/cache/?uri=http%3A%2F%2Fwww.nbcuniversalstore.com%2Fproducts.php%3Fcnt%3D3%26thumbnailimgsize%3D107%26format%3Djson";
    }

    NBC.ajax({
        url: url,
        contentType : "application/json",
        dataType : "json",
        success : function (data) {
            if (data.products.length > 0) {
                var output = '';

                for (var i in data.products) {
                    var node = data.products[i];

                    output += '<div class="featured row">';
                    output += '<a href="' + node.url + '" target="_blank"><img src="' + node.thumbnailImg + '" width="107" height="107" alt="' + node.name + '" /></a>';
                    output += '<h5>' + node.name + '</h5>';
                    output += '<p>$' + node.salePrice + '<br /><a href="' + node.url + '" target="_blank">Buy &raquo;</a></p>';
                    output += '</div>';

                    if (i == 2) {
                        break;
                    }
                }

                shopHeader.append(output);
            }
        }
    });
}
var upTime = 300,
    downTime = 300,
    openNav = false;
function closeDropdown() {
    setInactiveNav();
    NBC('video').attr('controls', 'controls');
    NBC('#dropdowns-global .collapsible, #dropdowns-site .collapsible').slideUp(upTime, 'easeOutExpo', function () {
        NBC(this).removeClass('open');
        NBC(clickedNav).focus();
    });
}
function showDropdown() {
    if(NBC(clickedNav.getAttribute('data-target')).hasClass('open')) {
        openNav = false;
        closeDropdown();
    } else {
        NBC('video').removeAttr('controls');
        var delayTime = 0;
        if (openNav) {
            delayTime = upTime - 100;
        }
        NBC(clickedNav.getAttribute('data-target')).show(0, function () {
            NBC('#' + this.getAttribute('id') + ' .first-row .key-vertical').height(NBC('#' + this.getAttribute('id') + ' .first-row').height());
        }).hide(0).delay(delayTime).slideDown(downTime, 'easeOutExpo', function () {
            NBC(this).addClass('open');
            openNav = true;
            NBC('#' + this.getAttribute('id') + ' a:first').focus();
        });
    }
}
function setActiveNav(value) {
    var isActive = NBC(value).parent().hasClass('active');
    setInactiveNav();
    if(!isActive) {
        NBC('html').bind('click', function () {
            clickedNav = null;
            closeDropdown();
        });

        NBC(value).parent().addClass('active');
    } else {
        NBC('html').unbind('click');
    }
}
function setInactiveNav() {
    NBC('header.global .navbar .dropdown-global-link, header.site .navbar .dropdown-site-link').parent().removeClass('active');
}
/* INIT */
function initGlobalDropdown() {
    if (isTouch) {
        loadGlobalDropdown();
    } else {
        NBC('header.global .navbar a').bind('focus', loadGlobalDropdown);
        NBC('header.global .navbar').bind('mouseenter', loadGlobalDropdown);
    }
    NBC('header.global .navbar .dropdown-global-link').live('click', function(event) {
        if (NBC('#dropdowns-global').css('display') == 'block') {
            event.preventDefault();
            setActiveNav(this);
            loadGlobalDropdown();
            var nav = NBC('header.global .navbar');
            NBC('#dropdowns-global').css('top', nav.offset().top + nav.height());

            clickedNav = this;
            showDropdown();
        }
    });
    NBC('#dropdowns-global').bind('click', function(event){
        event.stopPropagation();
    });
    if (NBC(".spotlight-inner").length > 0) {
        NBC(".spotlight-inner").load('/assets/core/themes/2012/nbc/includes/auto-generated/spotlight.html');
    }
}
/* -------------------------------------------------------------------------*/
/* SITE Dropdown */
var dropdown_site,
    dropdown_site_request = null;
function loadSiteDropdown() {
    if (dropdown_site === undefined) {
        NBC('header.site .subnav a').unbind('focus', loadSiteDropdown);
        NBC('header.site .subnav').unbind('mouseenter', loadSiteDropdown);
        if (dropdown_site_request) {
            dropdown_site_request.abort();
        }
        var url;
        if (SITE.dropdownUrl !== undefined && SITE.dropdownUrl !== "") {
            url = SITE.dropdownUrl;
        } else {
            url = SITE.absoluteUrl + 'partials/dropdowns-site.html';
        }
        dropdown_site_request = NBC.ajax({
            url: url,
            cache: (nbcu.config.getParam("nbcuEnvironment") == "dev") ? false : true
        }).done(function(data) {
            dropdown_site = data;
            NBC('#dropdowns-site').html(dropdown_site);
            NBC('#dropdowns-site .collapsible').hide(0);
            NBC('#dropdowns-site .btn-close').click(function (event) {
                event.stopPropagation();
                clickedNav = null;
                closeDropdown();
                return false;
            });
        });
    }
}
/* INIT */
function initSiteDropdown() {
    if (isTouch) {
        loadSiteDropdown();
    } else {
        NBC('header.site .subnav a').bind('focus', loadSiteDropdown);
        NBC('header.site .subnav').bind('focus mouseenter', loadSiteDropdown);
    }
    NBC('header.site .subnav .dropdown-site-link').live('click', function(event) {
        if (NBC('#dropdowns-site').css('display') == 'block') {
            setActiveNav(this);
            event.preventDefault();
            loadSiteDropdown();
            var nav = NBC('header.site .subnav');
            NBC('#dropdowns-site').css('top', nav.offset().top + nav.height());

            clickedNav = this;
            showDropdown();
        }
    });

    // detaching shop link from the dropdowns
    NBC('a.dropdown-site-link[data-target="#dropdown-site-shop"]').removeClass('dropdown-site-link').attr('target','_blank');

    NBC('#dropdowns-site').bind('click', function(event){
        event.stopPropagation();
    });
}
/* -------------------------------------------------------------------------*/
/* Slider */

var sliderTimeout;

function slideContentChange(args) {
    if (args.currentSlideNumber === 0) {
        NBC('header.site .logo').fadeOut(240);
    } else {
        if (SITE.id != "10211") {
            NBC('header.site .logo').fadeIn(300);
        }
    }
    NBC(args.sliderObject).parent().parent().find('.slider-buttons .button').removeClass('selected');
    NBC(args.sliderObject).parent().parent().find('.slider-buttons .button:eq(' + args.currentSlideNumber + ')').addClass('selected');
}
function slideContentLoaded(args) {
    if (args.currentSlideNumber === 0) {
        NBC('header.site .logo').fadeOut(300);
    } else {
        NBC('header.site .logo').fadeIn(300);
    }
    NBC(args.sliderObject).parent().parent().find('.slider-buttons .button').removeClass('selected');
    NBC(args.sliderObject).parent().parent().find('.slider-buttons .button:eq(' + args.currentSlideNumber + ')').addClass('selected');
}
function showSiteSliderButtons() {
    clearTimeout(sliderTimeout);
    NBC('header.site .slider-buttons .button .button-image').stop(true, true);
    NBC('header.site .slider-buttons .button .button-image').animate({top: "0px"}, 600, 'easeOutExpo');
}
function timeSiteSliderButtons() {
    clearTimeout(sliderTimeout);
    NBC('header.site .slider-buttons .button .button-image').stop(true, true);
    sliderTimeout = setTimeout(hideSiteSliderButtons, 1000);
}
function hideSiteSliderButtons() {
    clearTimeout(sliderTimeout);
    NBC('header.site .slider-buttons .button .button-image').stop(true, true);
    NBC('header.site .slider-buttons .button .button-image').animate({top: "90px"}, 900, 'easeOutExpo');
}
/* INIT */
function initSlider() {
    var slider = NBC('.slider-container .slider');
    if (slider.length > 0){
        var autoSlide = false,
            numSlides = NBC('.slider-container .slider .slide').length;
        if (numSlides > 1) {
            autoSlide = true;
        }
        NBC('header.site .logo').hide(0);
        slider.iosSlider({
            snapToChildren: true,
            autoSlide: autoSlide,
            autoSlideTimer: 7500,
            autoSlideToggleSelector: NBC('.slider-container .video-item a'),
            infiniteSlider: autoSlide,
            //desktopClickDrag: true,
            navSlideSelector: NBC('.slider-buttons .button'),
            // navPrevSelector: NBC('.slider-container .icons-arrow-slider-left'),
            // navNextSelector: NBC('.slider-container .icons-arrow-slider-right'),
            responsiveSlideContainer: false,
            responsiveSlides: false,
            onSlideChange: slideContentChange,
            onSliderLoaded: slideContentLoaded
        });
        if (numSlides <= 1) {
            NBC('header.site .slider-buttons').hide(0);
            slider.iosSlider('lock');
        } else {
            NBC('header.site .slider-buttons').hover(showSiteSliderButtons, timeSiteSliderButtons);
            NBC('.slider-container .icons-arrow-slider-left, .slider-container .icons-arrow-slider-right').hide();
            sliderTimeout = setTimeout(hideSiteSliderButtons, 3000);
        }
    }
}
/* -------------------------------------------------------------------------*/
/* Footer */
function checkScroll() {
    var elTop = NBC('footer.global').offset().top - NBC(window).scrollTop();
    if (elTop - 150 < NBC(window).height()) {
        NBC(window).unbind('scroll', checkScroll);
        loadGlobalFooter();
    }
}
function loadGlobalFooter() {
    if (footer_global === undefined) {
        NBC.ajax({
            url: '/assets/core/themes/2012/nbc/includes/auto-generated/footer-global.shtml'
        }).done(function(data) {
            footer_global = data;
            NBC('footer.global').html(footer_global);
            loadGlobalFooterTrending();
            loadGlobalFooterShop();
        });
    }
}
function loadGlobalFooterShop() {
    var shopFooter = NBC('footer.global #shop-footer'),
        url;

    if (document.domain == "www.nbc.com") {
        url = "/api/shop/products.php?cnt=3&thumbnailimgsize=77&format=json" + ((SITE.id != '69') ? "&keywords=" + SITE.id : "");
    } else {
        url = "/assets/esp/utility/proxy/cache/?uri=http%3A%2F%2Fwww.nbcuniversalstore.com%2Fproducts.php%3Fcnt%3D3%26thumbnailimgsize%3D77%26format%3Djson" + ((SITE.id != '69') ? "%26keywords%3D" + SITE.id : "");
    }

    NBC.ajax({
        url: url,
        contentType : "application/json",
        dataType : "json",
        error: function (xhr, ajaxOptions, thrownError) {
            shopFooter.hide(0);
        },
        success : function (data) {
            if (data.products.length > 0) {
                var output = '';

                for (var i in data.products) {
                    var node = data.products[i];
                    output += '<li class="shop">';
                    output += '<a href="' + node.url + '" target="_blank"><img src="' + node.thumbnailImg + '" target="_blank" width="77" height="77" alt="' + node.name + '" /></a>';
                    output += '<p>' + node.name + ' <a href="' + node.url + '" target="_blank">Buy&nbsp;&raquo;</a></p>';
                    output += '</li>';

                    if (i == 2) {
                        break;
                    }
                }

                shopFooter.append(output);
            } else {
                shopFooter.hide(0);
            }
        }
    });
}
function loadGlobalFooterTrending() {
    var trendingFooter = NBC('footer.global #trending-footer'),
        isSite = false,
        showId = SITE.id,
        url = "/useractivity/rest/listTopVideos?timePeriod=HOURLY&fromRow=0&toRow=";

	// Don't filter for global sites
    if (showId == "69") {
        showId = null;
    }

    if(showId) {
        isSite = true;
        url += '6&campaignName=site-' + showId;
    } else {
        url += '20';
    }

    NBC.ajax({
        url: url,
        contentType : "application/json",
        dataType : "json",
        error: function (xhr, ajaxOptions, thrownError) {
                NBC('#trending-footer').hide();
                NBC('#trending-footer').parent().css('padding-top', '2px');
        },
        success : function (data) {
            var ids = [],
                len = 0,
                maxDescLength = 20;
            if (data && data.topViewedVideo.length > 0) {
                for (var i in data.topViewedVideo) {
                    var node = data.topViewedVideo[i],
                        copy = node.videoDescription,
                        output = '';
                    if (typeof(copy) != "undefined" && copy.length>maxDescLength) {
                        copy = unescape(copy.slice(0,maxDescLength) + "&#8230;");
                    }
                    if (isSite) {
                        output += '<li>';
                        output += '<a href="/app/video/redirect_by_video_id.php?videoId=' + node.videoID + '" class="trending-footer-link">' + node.videoTitle + '</a>';
                        output += '</li>';
                        trendingFooter.append(output);
                    } else {
                        var id = node.campaignName.split('-')[1];
                        if(NBC.inArray(id, ids) == -1 && node.campaignTitle !== undefined) {
                            output += '<li>';
                            output += '<a href="/app/video/redirect_by_video_id.php?videoId=' + node.videoID + '" class="trending-footer-link">' + node.campaignTitle + ': ' + node.videoTitle + '</a>';
                            output += '</li>';
                            trendingFooter.append(output);

                            ids.push(id);
                            len++;
                        }
                        if(len >= 6) {
                            break;
                        }
                    }
                }
            } else {
                NBC('#trending-footer').hide();
                NBC('#trending-footer').parent().css('padding-top', '2px');
            }
        }
    });
}
/* INIT */
function initFooter() {
    if (isTouch) {
        loadGlobalFooter();
    } else {
        NBC(window).bind('scroll', checkScroll);
        checkScroll();
    }
}
/* -------------------------------------------------------------------------*/
/* Tiles */
var containerWidth = 0,
    columnWidth = 310,
    gutterWidth = 10,
    numColumns = 0,
    tiles = [],
    totalHeight = [0, 0, 0];

function arrangeTiles() {
    containerWidth = NBC('.thumbnails.tiled').width();
    totalHeight = [0, 0, 0];
    numColumns = Math.floor(containerWidth / columnWidth);
    for (var i = 0; i < numColumns; i++) {
        tiles.push(gutterWidth);
    }
    NBC('.thumbnails.tiled .thumbnail').each(function (index) {
        var i = index % numColumns;
        var leftPos = 0;
        var topPos = totalHeight[i];
        if (i > 0) {
            leftPos = (i * (columnWidth + gutterWidth));
        }
        NBC(this).css({'left': leftPos + 'px', 'top': topPos + 'px'});
        totalHeight[i] += NBC(this).outerHeight() + (gutterWidth * 2);
        NBC('.thumbnails.tiled').css('height', Array.max(totalHeight) + 'px');
    });
}
Array.min = function(array) {
    return Math.min.apply(Math, array);
};
Array.max = function(array) {
    return Math.max.apply(Math, array);
};
/* INIT */
function initTiles() {
    if (NBC('.thumbnails.tiled').length > 0) {
        arrangeTiles();

        NBC('.btn.load-more').click(function (event) {
            event.stopPropagation();
            return false;
        });
    }
}
var newFeatured,
    featuredPageTotal,
    featuredPage = 2;

function appendFeatured(content) {
    var bottom = NBC('.thumbnails.tiled').offset().top + NBC('.thumbnails.tiled').height();
    NBC('.thumbnails.tiled').append(content);
    arrangeTiles();

    NBC('body,html').animate({scrollTop: bottom}, 500);
}

function loadMoreFeatured(page) {
    NBC.ajax({
        url: '/app/esp/publishing/modules/getExclusivesPinterestStyle/containerId/' + FEATURED.containerId + '/page/' + page + '/perPage/9.html'
    }).done(function(data) {
        newFeatured = data;
        appendFeatured(newFeatured);
    });
}
function initFeatured() {
    if (NBC('section.latest.section-home').length > 0) {
        featuredPageTotal = Math.ceil(FEATURED.totalItems / 9);
        NBC('.btn.load-more').bind('click', function(event) {
            loadMoreFeatured(featuredPage);
            if (featuredPage >= featuredPageTotal) {
                NBC('.btn.load-more').unbind('click');
                NBC('.load-more-row').hide(0);
            } else {
                featuredPage++;
            }
        });
    }
}
/* -------------------------------------------------------------------------*/
/* Compatibility */
function initCompatibility() {
    NBC(document).bind('keydown', function(event) {
        if (event.which == 9 || event.which == 13) { // Tab Key
            tabbed = true;
        }
    });
    NBC('a,input,button,select,textarea').live('focus', function(event) {
        if (tabbed) {
            NBC(this).addClass('focused');
        }
        tabbed = false;
    });
    NBC('a,input,button,select,textarea').live('blur', function(event) {
        NBC(this).removeClass('focused');
    });
}
function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {
    createCookie(name,"",-1);
}
/* -------------------------------------------------------------------------*/
/* Transitional Fixes */
function initTransitional() {
    var el;
    if (NBC('body.section-home').length > 0) {
        el = NBC('body.section-home');
    } else {
        el = NBC('body.sub-page');
    }
    if(el.css('background-repeat') === 'no-repeat' && NBC('#nbc-container').length > 0 && NBC('#site').css('background-image') == 'none') {
        NBC('#site').css('background', el.css('background'));
        if(el.css('background-image') !== "") {
            NBC('#site').css('background-image', el.css('background-image'));
        }
        NBC('#site').css('background-color', el.css('background-color'));
        NBC('#site').css('background-position', '50% -180px');
        NBC('#site').css('background-repeat', el.css('background-repeat'));

        el.css('background', 'none');
        el.css('background-image', 'none');
    }
}
/* -------------------------------------------------------------------------*/
/* Show homepage videos */
function initShowsMainVideo() {
	var $vidWrap = NBC('.featured-video, .slider-container'), $slider, inSlider = false;
    var $featuredVideo = $vidWrap.find(".video-item");

    if(!$featuredVideo.length) { return false; }

    if($vidWrap.is('.slider-container')){
    	inSlider = true;
		$slider = $vidWrap.find('.slider');

    	$vidWrap.find('a[data-content-id]').bind('click',function(){
    		$slider.iosSlider('lock');
    	});
    }

    NBC.ajax({
        dataType : 'script',
        cache: true,
        url : "/assets/core/plugins/video/jquery.video.js",
        error:function(a,b,c){ if(typeof console != 'undefined' && console.log){ console.log('initShowsMainVideo', c); } },
        complete: function(){
            setTimeout(function(){
                $featuredVideo.video({sustainLoader:inSlider , clipComplete:function($this){
                	if($vidWrap.is('.slider-container')){

                		$slider.iosSlider('unlock');

                		$this.find('.sliderToggle').click();
                		$this.find('object').remove();
                		$this.find('a[data-content-id]').css({display:'block'});
                	}
                }});
            }, 350);
        }
    });
}

function initAutoComplete() {
    ezAutocompleteSearchUrl = "/search?";
    myAC = queryExpansion_init("#search-global", "#search-auto", "/autocomplete/?callbackName=myAC&q=");
}
/* -------------------------------------------------------------------------*/
/* INIT */
initShowsMainVideo();
initMyNBC();
initTransitional();
initGlobalDropdown();
initSiteDropdown();
initSlider();
initTiles();
initFeatured();
//initShowsMainVideo();
initFooter();
initCompatibility();
initAutoComplete();
