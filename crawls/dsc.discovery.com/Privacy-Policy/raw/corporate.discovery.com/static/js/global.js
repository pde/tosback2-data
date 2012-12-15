$(document).ready(function(){
    // NAVIGATION
    $('nav#top-nav li.main-nav').mouseover(function(e){
        if ($(this).hasClass('main-nav')){
            $(this).find(".navlevel1").addClass('visible');
        }
    }).mouseleave(function(e){
        if ($(this).hasClass('main-nav')){
            $(".navlevel1").removeClass('visible');
        }
    });
    $('nav#top-nav .navlevel1 ul').children().mouseover(function(e){
        if ($(this).parent().parent().hasClass('navlevel1')){
            $(this).find(".navlevel2").addClass('visible');
        }
    }).mouseleave(function(e){
        if ($(this).parent().parent().hasClass('navlevel1')){
            $(".navlevel2").removeClass('visible');
        }
    });
    
    // LOGOTRAIN MARQUEE
    if ($('#logo-train-div').html()){
        marqueeInit({
            uniqueid: 'logo-train-div',
            inc: 5, //speed - pixel increment for each iteration of this marquee's movement
            mouse: 'cursor driven', //mouseover behavior ('pause' 'cursor driven' or false)
            moveatleast: 2,
            neutral: 150,
            savedirection: true,
            random: false
        });
    }
    
    // CYCLE SLIDESHOWS
    if ($('#vid-list').html()){
        // video list
        $('#vid-list').cycle({
            stop: true,
            fx: 'scrollLeft',
            speed: 400,
            timeout: 0,
            pager: '#vid-nav .gutter',
            pause: true
        });
        // VIDEO PLAYER
        linkInit($('#vid-feature a'))
        linkInit($('#vid-list a'))
    };
    if ($('.bannerette .gutter').html()){
        // bannerette list
        $('.bannerette .gutter').cycle({
            stop: true,
            fx: 'scrollLeft',
            speed: 700,
            timeout: 0,
            pager: '#bannerette-nav .nav-gutter',
            pause: true
        });
    }
    if ($('#aside-images').html()){
        // aside slideshow
        $('#aside-images').cycle({
            fx: 'uncover',
            speed: 500,
            timeout: 4000,
            pause: true
        });
    }

    // CYCLE NAV WIDTHS
    // vid nav
    var vidnavWidth = 0;
    $('#vid-nav a').each(function(e){
        vidnavWidth += $(this).width();
    })
    $('#vid-nav').width(vidnavWidth);
    $('#vid-nav .gutter').width(vidnavWidth);
    // bannerette nav
    var bannerettenavWidth = 0;
    $('#bannerette-nav a').each(function(e){
        bannerettenavWidth += $(this).width();
    })
    $('#bannerette-nav').width(bannerettenavWidth);
    $('#bannerette-nav .nav-gutter').width(bannerettenavWidth);

    
    // SEARCH FORM
    $('#id_search_terms').focusin(function(e){
        $('#form-search label').fadeOut(200);
    })
    // clear input if search term already entered
    var newsSearchInput = $('#id_search_terms').attr('value');
    if (newsSearchInput){
        $('#id_search_terms').attr('value', '');
    }

});