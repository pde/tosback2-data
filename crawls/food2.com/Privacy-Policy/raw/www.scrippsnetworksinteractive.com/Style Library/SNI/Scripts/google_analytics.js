var Begin = new Date();
var Start = Begin.getTime();
//code to attach trackevent code block for document downloads/external links/mailto links
$(document).ready(function () {
    // Creating custom :external selector
    $.expr[':'].external = function (obj) {
        return !obj.href.match(/^javascript/) && (obj.hostname != location.hostname);
    };

    // Add 'external' CSS class to all external links
    $('a:external').addClass('external');
    $('a.external').bind('click mouseup', function () {
        var obcat = this.href.match(/^mailto\:/);
        var targeturl = this.href;
        if (obcat) {
            targeturl = targeturl.replace('mailto:', '');
            var End = new Date(); var Stop = End.getTime(); var timeElapse = Math.round((Stop - Start) / 1000);
            _gaq.push(['_trackEvent', 'External Events', 'Downloads', targeturl, document.location.href, timeElapse, true]);
        } else {
            var targetname = this.text;
            var isDoc = this.href.match(/\.(?:doc|eps|jpg|png|svg|xls|ppt|pdf|xls|zip|txt|vsd|vxd|js|css|rar|exe|wma|mov|avi|wmv|mp3)($|\&|\?)/);
            if (isDoc) {
                var End = new Date(); var Stop = End.getTime(); var timeElapse = Math.round((Stop - Start) / 1000);
                _gaq.push(['_trackEvent', 'External Events', 'Downloads', targetname, timeElapse, true]);
            } else {
                var End = new Date(); var Stop = End.getTime(); var timeElapse = Math.round((Stop - Start) / 1000);
                _gaq.push(['_trackEvent', 'External Events', 'External Links', targeturl, timeElapse, true]);
            }
        }
    });

    $('a').bind('click mouseup', function () {
        var targetname = this.text;
        var isDoc = this.href.match(/\.(?:doc|eps|jpg|png|svg|xls|ppt|pdf|xls|zip|txt|vsd|vxd|js|css|rar|exe|wma|mov|avi|wmv|mp3)($|\&|\?)/);
        if (isDoc) {
            var End = new Date(); var Stop = End.getTime(); var timeElapse = Math.round((Stop - Start) / 1000);
            _gaq.push(['_trackEvent', 'External Events', 'Downloads', targetname, timeElapse, true]);
        }
    });

    // Handle the 'Our People carosel'
    $("#peopleCarousel ul li").hover(function () {
        var text = $('#peopleCarousel ul li.active h3 a').text();

        _gaq.push(['_trackEvent', 'Careers-Our People', 'Person Preview', text]);
    });

    //The title above the picture
    $('#peopleCarousel ul li.active h3 a').bind('click mouseup', function () {
        var text = $('#peopleCarousel ul li.active h3 a').text();

        _gaq.push(['_trackEvent', 'Careers-Our People', 'Click More', text]);
    });

    //Clicking on the picture it's self
    $('#peopleCarousel ul li.active a').bind('click mouseup', function () {
        var text = $('#peopleCarousel ul li.active h3 a').text();

        _gaq.push(['_trackEvent', 'Careers-Our People', 'Click More', text]);
    });

    // handle video events
    $('#playBtn').bind('click mouseup', function () {
        var sourceVideoFile = $('#inPageVideoPlayer source')[0].src;

        if ($(this).hasClass('showPause')) {
            _gaq.push(['_trackEvent', 'Videos', 'Pause', sourceVideoFile]);
        }
        else {
            _gaq.push(['_trackEvent', 'Videos', 'Play', sourceVideoFile]);
        }
    });

    //Handle tabstrip clicks
    $('div.wpz.wpzTabbed ul.tabStrip li a').bind('click mouseup', function () {
        var text = $(this).text();

        _gaq.push(['_trackEvent', 'Intrapage Tabs', 'Tab View', text]);
    });

    //Handle brand expand and collapse
    $('div.expandControl').bind('click mouseup', function () {
        var brandName = $(this).find('span.brandName').text();

        _gaq.push(['_trackEvent', 'Intrapage Tabs', "Expand", brandName]);
    });

    $('div.expandControl.open').bind('click mouseup', function () {
        var brandName = $(this).find('span.brandName').text();

        _gaq.push(['_trackEvent', 'Intrapage Tabs', "Collapse", brandName]);
    });
});

function sendContactUsAnalytics() {
    var result = Page_ClientValidate(null);
    var requestType = $('.natureOfRequest select option:selected').text();

    _gaq.push(['_trackEvent', 'Contact Us', "Request Type", requestType]);

    if (result == true) {
        _gaq.push(['_trackEvent', 'Contact Us', "Submit", requestType]);
    }
    else {
        _gaq.push(['_trackEvent', 'Contact Us', "Validation Error", requestType]);
    }
}