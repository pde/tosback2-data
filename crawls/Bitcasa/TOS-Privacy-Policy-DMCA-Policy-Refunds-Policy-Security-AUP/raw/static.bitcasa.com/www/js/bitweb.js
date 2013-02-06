$(function() {
    $(document).ready(function(){
        resizeHomeBanner();

        if (window.location.hash) {
            hashJump();
        }

        $("a[href='#']").bind('click', function() {
            event.preventDefault();
        });

        window.onhashchange = hashJump;
        var path = window.location.pathname;
        setActiveMenuItems(path, false);
        var active_subnav = $(this).children('a').attr('data-subnav');

        $('.legalSection:not(#termsOfService)').hide();

        $('.navbar-fixed-top .nav li').mouseenter(
            function() {
                $('#bitcasa-subnav').show();
                var active_subnav = $(this).children('a').attr('data-subnav');
                path = $(this).children('a').attr('href');
                setActiveMenuItems(path, true);
            });

        $('.navbar-fixed-top').mouseleave(
            function() {
                $('#bitcasa-subnav').hide();
                path = window.location.pathname;
                setActiveMenuItems(path, false);
        });
    });

    var device_platform = platformDetect();
    //var device_platform = 'Android';
    platformDownload(device_platform);

    function setActiveMenuItems(path, highlight_subnav_link) {
        var menu_active = {'/download': '#download-nav-link',
                        '/instructions': '#download-nav-link',
                        '/pricing': '#pricing-nav-link',
                        '/how-it-works': '#learn-nav-link',
                        '/developers': '#learn-nav-link',
                        '/about': '#about-nav-link',
                        '/careers': '#about-nav-link',
                        '/press': '#about-nav-link',
                        '/contact-us': '#contact-nav-link',
                        '/legal': '#contact-nav-link',
                        '/media': '#contact-nav-link',
                        'http://blog.bitcasa.com': '#about-nav-link',
                        'http://support.bitcasa.com': '#contact-nav-link'}


        $('.navbar-fixed-top .nav li.active, #bitcasa-subnav .nav-pills li.active').removeClass('active');
        var active_subnav = $(menu_active[path]).attr('data-subnav');
        var active_subnav_link = null;
        $('#bitcasa-subnav ul').hide();
        if (highlight_subnav_link) {
            active_subnav_link = '#bitcasa-subnav li a[href="'+path+'"]';
            $(active_subnav).show();
        }
        $(menu_active[path]+', '+active_subnav_link).parent().addClass('active');
    }

    function getQueryString() {
    var result = {}, queryString = location.search.substring(1),
        re = /([^&=]+)=([^&]*)/g, m;

    while (m = re.exec(queryString)) {
        result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }

    return result;
    }

    function hashJump() {
        var hash = window.location.hash;
        var target;
        if (hash.indexOf('!') != -1) {
            target = $(hash.replace('!','')+' a');
        }
        else {
            target = $('[href='+hash+'], .'+hash.replace('#',''));
        }
        target.trigger('click');
    }

    /*function resizeCarouselSlides() {
        $('.carouselBackground, .slideForeImage').css('width', '100%');
    }*/

    function platformDetect(){
        var qplatform = getQueryString()["platform"];
        if (qplatform) {
            return qplatform;
        }
        var platformMapping = {'Win32': 'Windows',
                           'Win64': 'Windows',
                           'Linux i686': 'Linux',
                           'Linux x86_64': 'Linux',
                           'MacIntel': 'Mac',
                           'iPhone': 'iOS',
                           'iPad': 'iOS',
                           'iPod': 'iOS',
                           'Linux armv7l': 'Android',
                           'Android': 'Android'}
        return platformMapping[navigator.platform];
    }

    function platformDownload(platform){
        var platformLower = platform.toLowerCase();
        var otherVersions = removeByValue(['Mac', 'Windows', 'Linux', 'Android', 'Windows Store'], platform);
        var otherDesktopVersionHTML = 'Other versions: ';
        var otherMobileVersionHTML = 'Also available for ';
        var otherVersionHTML = 'Other versions: ';
        if ($.inArray(platform, ['Android', 'iOS']) > -1) {
            $('.mobile-show').show();
            $('.email-link').css('display', 'block');
            $('#'+platformLower+'-download-container').show();
            $('.mobile-hide').hide();
            otherVersions = removeByValue(['Android', 'Windows Store'], platform);
        }
        if (platform == 'Windows' || platform == 'Mac') {
            var platformMessage = platform;
            var downloadLink = '/download/' + platformLower;
            var overlayDownloadLink = downloadLink;
        } else if (platform == 'Linux') {
            var platformMessage = platform;
            var downloadLink = '#';
            var overlayDownloadLink = downloadLink;
        } else if (platform == 'Mac') {
            var platformMessage = platform + ' coming soon';
            var downloadLink = '#';
            var overlayDownloadLink = '/download/';
        } else if (platform == 'Android') {
            var platformMessage = platform;
            var downloadLink = '/download/' + platformLower;;
        } else if (platform == 'iOS') {
            var platformMessage = platform + ' coming soon';
            var downloadLink = 'https://itunes.apple.com/us/app/Bitcasa/id588282093?mt=8';
            var overlayDownloadLink = '/download/';
        } else {
            var platformMessage = platform + ' coming soon';
            var downloadLink = '#';
            var overlayDownloadLink = '/download/';
        }

        $('.download-button').attr('href', downloadLink);
        if (window.location.pathname != '/') {
            var titleCasePath = window.location.pathname.substring(1);
            titleCasePath = titleCasePath[0].toUpperCase() + titleCasePath.substring(1).replace(/-/g, ' ');
        } else {
            var titleCasePath = 'Homepage';
        }
        $('.download-button').attr('onClick', "_gaq.push(['_trackEvent', 'Download', '" + platform + "', '" + titleCasePath + "']);");
        if (platform == 'Mac') {
            $('.download-button').text('Download');
            $('.download-button').attr('href', '/download/mac');
            $('.download-button').after('<div style="margin-top: 10px;">Or, <a onclick="_gaq.push([\'_trackEvent\', \'Download\', \'Mac Legacy\', \'Download\']);" href="/download/maclegacy">download the legacy Mac client</a></div>');
        } else if (platform == 'Windows') {
            $('.download-button').after('<div style="margin-top: 10px;">Or, <a onclick="_gaq.push([\'_trackEvent\', \'Download\', \'Win Legacy\', \'' + titleCasePath + '\']);" href="/download/windowslegacy">download the legacy Windows client</a></div>');
        } else if (platform == 'Linux') {
            $('.download-button').text('Linux client under development');
            $('.download-button').after('<div style="margin-top: 10px;">in the meantime, try out out our <a onclick="_gaq.push([\'_trackEvent\', \'Download\', \'Linux\', \'' + titleCasePath + '\']);" href="/download-linux">Linux alpha client</a></div>');
        } else if (platform == 'Android') {
            $('.download-button').attr('id', 'android-download-button');
            $('.download-button').addClass('mobile-download-button');
            $('.download-button').html('<span>Android App on</span>Google Play');
        } else if (platform == 'iOS') {
            $('.download-button').attr('id', 'ios-download-button');
            $('.download-button').addClass('mobile-download-button');
            $('.download-button').html('<span>Available on the</span>App Store');


        } else {
            $('.download-button').text('Download for ' + platformMessage);
        }
        $('#platform-download').attr('class', platformLower + '-download-image');
        //$('.overlayDownload').attr('href', overlayDownloadLink);
        $.each(otherVersions, function(index, value){
            if (value == 'Linux') {
                otherLink = "";
            } else if (value == 'Windows Store') {
                otherLink = '/download/metro';
            } else {
                otherLink = '/download/' + value.toLowerCase();
            }
            var linkText = '<a onclick="_gaq.push([\'_trackEvent\', \'Download\', \'' + value + '\', \'' + titleCasePath + '\']);" class="download otherDownload" href="' + otherLink  + '">' + value + '</a>, ';
            if ($.inArray(value, ['Android', 'Windows Store', 'iOS']) > -1) {
                otherMobileVersionHTML += linkText;
            } else if ($.inArray(value, [ 'Mac', 'Windows']) > -1) {
                otherDesktopVersionHTML += linkText;
            }
            otherVersionHTML += linkText;
        });
        $('.download-otherdesktop-versions').html(otherDesktopVersionHTML.slice(0, otherDesktopVersionHTML.length-2));
        $('.download-othermobile-versions').html(otherMobileVersionHTML.slice(0, otherMobileVersionHTML.length-2));
        $('.download-other-versions').html(otherVersionHTML.slice(0, otherVersionHTML.length-2));
    }

    function removeByValue(array, val){
        return $.grep(array, function(iter){
            return iter != val;
        });
    }

    $(window).resize(function(){
        resizeHomeBanner();
    });

    function resizeHomeBanner() {
        var heightToWidthRatio = .797962649;
        var homePageImageElem = $('#home-page-image');
        var width = parseInt(homePageImageElem.css('width'));
        var calculatedHeight = width * heightToWidthRatio * .9;
        var minHeight = 240;
        var newCalculatedHeight = (calculatedHeight >= minHeight) ? calculatedHeight : minHeight;
        if (width == 280) {
            newCalculatedHeight = calculatedHeight + 40;
        } else if (width > 280 && width < 447) {
            newCalculatedHeight += 30;
        }
        homePageImageElem.css('height', newCalculatedHeight);
    }

    $('#devSignupSubmit').click(function(){
        $('#devSignupForm').submit();
        return false;
    });

    $('#contactSend').click(function(){
        $('#contactForm').submit();
        return false;
    });

    /*$('.jumpLink, .supportCategory').click(function(){
        var a_name = 'a[name="' + $(this).attr('href').substr(1) + '"]';
        hideSupportStuff();
        $('.backToFAQS').show();
        $(a_name).parent().show();
        return false;
    });

    $('.backToFAQS').click(function(){
        hideSupportStuff();
        $('#supportFaqsList').show();
        $('#supportSearchBar').val('').focus();
        return false;
    });*/

    $('.legalTabHolder div').click(function(){
        if (!$(this).hasClass('tabSelected')) {
            var selector = '#' + $(this).attr('class');
            $('#tabHolder div').removeClass('tabSelected');
            $(this).addClass('tabSelected');
            $('.legalSection').hide();
            $(selector).show();
        }
    });

    $('.videoTabHolder div').click(function(){
        if (!$(this).hasClass('tabSelected')) {
            var selector = '.' + $(this).attr('selection');
            $('#tabHolder div').removeClass('tabSelected');
            $(this).addClass('tabSelected');
            $('#videoBody .videoOuter').hide();
            $(selector).show();
        }
    });

    /*function hideSupportStuff(){
        $('.expandedQ, .backToFAQS, #supportCategoriesExpanded li.hide, #supportFaqsList').hide();
        $('li').removeHighlight();
    }

    function triggerSearch() {
        searchBox = $('#supportSearchBar');
        if (!searchBox.val()){
            return false;
        }
        hideSupportStuff();
        $('.backToFAQS').show();
        var specials = new RegExp("[.*+?|()\\[\\]{}\\\\]", "g"); // .*+?|()[]{}\
        var stopWords = new RegExp("\\b(and|or|a|is|the)\\b", "ig");
        searchWords = searchBox.val().replace(stopWords, '').replace(/[ ]{2,}/, ' ');
        searchString = '(' + searchWords.replace(specials, "\\$&").split(' ').join('|') + ')';
        matches = $('#supportCategoriesExpanded li').filter(function(){
            return $(this).text().match(RegExp(searchString, 'ig'));
        })
        $.each(searchWords.split(' '), function(index, value){
            $('#supportLeftColumn').highlight(value);
        });
        matches.show();
    }

    $('#supportSearchSubmit').click(function(){
        triggerSearch();
    });

    $('#supportSearchBar').keyup(function(e){
        if(e.keyCode == 13){
            triggerSearch();
        }
    });*/

    $('.email').click(function(event) {
        $(this).toggleClass('active');
        $('#account-dropdown').toggle();
        $('#accout-subnav').show();
        event.preventDefault();
    });

    $(document).mouseup(function (e) {
        var container = $("a.email");
        if ($.inArray(e.target, container) == -1) {
            container.removeClass('active');
            $('#account-dropdown').hide();
        }
    });
});
