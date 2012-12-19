$(function() {
    $(document).ready(function(){
        resizeHomeBanner();
        if (window.location.hash) {
            hashJump();
        }
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
    platformDownload(device_platform);

    function setActiveMenuItems(path, highlight_subnav_link) {
        var menu_active = {'/download': '#download-nav-link',
                        '/instructions': '#download-nav-link',
                        '/how-it-works': '#learn-nav-link',
                        '/pricing': '#learn-nav-link',
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
        var platformMapping = {'Win32': 'Windows',
                           'Win64': 'Windows',
                           'Linux i686': 'Linux',
                           'Linux x86_64': 'Linux',
                           'MacIntel': 'Mac',
                           'iPhone': 'iOS',
                           'iPad': 'iOS',
                           'iPod': 'iOS',
                           'Android': 'Android'}
        return platformMapping[navigator.platform];
    }

    function platformDownload(platform){
        var otherVersions = removeByValue(['Mac', 'Windows', 'Linux'], platform);
        if (platform == 'Windows' || platform == 'Mac') {
            var platformMessage = platform;
            var platformLower = platform.toLowerCase();
            var downloadLink = '/download/' + platformLower;
            var overlayDownloadLink = downloadLink;
        } else if (platform == 'Linux') {
            var platformMessage = platform;
            var platformLower = platform.toLowerCase();
            var downloadLink = '/download-' + platformLower;
            var overlayDownloadLink = downloadLink;
        } else if (platform == 'Mac') {
            var platformMessage = platform + ' coming soon';
            var platformLower = platform.toLowerCase();
            var downloadLink = '#';
            var overlayDownloadLink = '/download/';
        } else {
            var platformMessage = platform + ' coming soon';
            var downloadLink = '#';
            var overlayDownloadLink = '/download/';
        }

        $('.download-button').attr('href', downloadLink);
        if (platform == 'Mac') {
            $('.download-button').text('New Mac Coming Soon');
            $('.download-button').after('<div style="margin-top: 10px;">In the meantime, <a href="/download/mac">download the legacy Mac client</a></div>');
        } else if (platform == 'Windows') {
            $('.download-button').after('<div style="margin-top: 10px;">Or, <a href="/download/windowslegacy">download the legacy Windows client</a></div>');
        } else {
            $('.download-button').text('Download for ' + platformMessage);
        }
        $('#platform-download').attr('class', platformLower + '-download-image');
        //$('.overlayDownload').attr('href', overlayDownloadLink);
        var otherVersionHTML = 'Other versions: ';
        $.each(otherVersions, function(index, value){
            if (value == 'Linux') {
                otherLink = '/download-' + value.toLowerCase();
            } else {
                otherLink = '/download/' + value.toLowerCase();
            }
            otherVersionHTML += '<a class="download otherDownload" href="' + otherLink  + '">' + value + '</a>';
            if (index != otherVersions.length - 1) {
                otherVersionHTML += ', ';
            }
        });
        $('#download-other-versions').html(otherVersionHTML);
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
        var footerHeight = $('#footer').height();
        var availHeight = $(document).height() - footerHeight;
        var availWidth = $(document).width();
        if (!availHeight) {
            availHeight = window.outerHeight;
            availWidth = window.outerWidth;
        }

        var originalImageHeight = 888;
        var originalImageWidth = 1785;
        var heightRatio = availHeight / originalImageHeight;
        var widthRatio = availWidth / originalImageWidth;

        var adjustedHeight = originalImageHeight * heightRatio;
        var adjustedWidth = originalImageWidth * heightRatio;

        if (adjustedWidth < availWidth) {
            adjustedHeight = originalImageHeight * widthRatio;
            adjustedWidth = originalImageWidth * widthRatio;
        }
        $('#home-body').css({'background-size': adjustedWidth+'px '+ adjustedHeight+ 'px'});
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
});
