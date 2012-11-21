$(function(){

  //FUNCTIONS

  $(function() {
    if ($('.scrollable-testimonial').length) initScrollPage();
    if ($('.items-reel').length) initReelSlider();
  });

  $(".header a[title]").tooltip({
    offset: [15, 0],
    bottom: true
  }).dynamic({ bottom: { direction: 'down' } });


  // HERO SLIDER

  $('.thumbs li a').click(function(e) {
    e.preventDefault();
    $(this).parent().siblings().removeClass("current");
    $(this).parent().addClass("current");

    var x = $(this).parent();
    $('img.slides').hide().each(function() {
      if ($(this).hasClass(x.attr('rel'))) {
        $(this).fadeIn("fast");
      }
    });
  });

  $(".inner ul.navi a, .slider li.slide1 span").hover(
    function() {
      $(".slider li.slide1 span").css("opacity", "1");
    },
    function() {
      $(".slider li.slide1 span").css("opacity", "0");
    }
  );

  $("a.page-curl").fancybox({
    'hideOnContentClick' : true,
    'transitionIn' : 'elastic',
    'transitionOut' : 'elastic',
    'overlayColor' : '#000',
    'overlayOpacity' : 0.8
  });

    $("a.iframeContact").fancybox({
    'hideOnContentClick' : true,
    'transitionIn' : 'elastic',
    'transitionOut' : 'elastic',
    'overlayColor' : '#000',
    'overlayOpacity' : 0.8,
    // 'wdith' : 600,
    'height' : 400,
    'autoDimensions' : true
  });


  // STRUCTURE

  width = $("body").width();
  padding = (width - 990) / 2;
  $(".l-popLeft").css("margin-right", padding + "px"); 
  $(".l-popRight").css("margin-left", padding + "px");

  $(window).resize(function() {
    width = $("body").width();
    padding = (width - 990) / 2;
    $(".l-popLeft").css("margin-right", padding + "px"); 
    $(".l-popRight").css("margin-left", padding + "px"); 
  });

  height = $(".jobs.jobs-detail .col-main").height();
  $(".jobs.jobs-detail .col-sidebar.newyork, .jobs.jobs-detail .col-sidebar.boston").css("height", height - 260 + "px");
  $(".jobs.jobs-detail .col-sidebar.israel, .jobs.jobs-detail .col-sidebar.uk").css("height", height - 380 + "px");
  $(".jobs.jobs-detail .col-sidebar.sanfrancisco, .jobs.jobs-detail .col-sidebar.singapore").css("height", height - 330 + "px");
  $(".jobs.jobs-detail .col-sidebar.sydney, .jobs.jobs-detail .col-sidebar.chicago, .jobs.jobs-detail .col-sidebar.madrid, .jobs.jobs-detail .col-sidebar.paris").css("height", height - 260 + "px");

  height = $(".blog-main-page .blog-left").height();
  mHeight = height - 260;
  $(".blog-main-page .blog-sidebar").css("height", mHeight + "px");

  height = $(".content-discovery .col-main-wrap").height();
  mHeight = height - 200;
  $(".content-discovery .blog-sidebar").css("height", mHeight + "px");


  // FORMS

  $.fn.cleardefault = function() {
    return this.focus(function() {
      if( this.value == this.defaultValue ) {
        this.value = "";
      }
    }).blur(function() {
      if( !this.value.length ) {
        this.value = this.defaultValue;
      }
    });
  };

  $(".clearit input, .clearit textarea").cleardefault();




  // HELP TERTIARY NAV & FAQ

  $("ul.help-nav li.top").hover(
    function() {
      if(!$(this).prev().hasClass("current")) {
        $(this).prev().children('a').addClass("no-border");
      } else {
        $(this).prev().addClass("no-border");
      }
    }, 
    function() {
      if(!$(this).prev().hasClass("current")) {
        $(this).prev().children('a').removeClass("no-border");
      } else {
        $(this).prev().removeClass("no-border");
      }
    }
  );

  // $("ul.help-nav li.top").click(function(e){
  //   e.preventDefault();
  //   $(this).addClass("current");
  //   $(this).siblings().children('a').removeClass("no-border-clicked");
  //   $(this).prev().children('a').addClass("no-border-clicked");
  //   $(this).siblings().children('ul').slideUp();
  //   $(this).siblings().removeClass("current");
  //   $(this).children("ul").slideDown();
  // });

  $("ul.faq > li > a").click(function(e) {
    e.preventDefault();
    $(this).next().toggle("fast");
    $(this).parent().toggleClass("rotated");
    $(this).parent().toggleClass("current");
  });


  // AMPLIFY DROPDOWN
   $(".dropdown h2").click(function(e) {
    e.preventDefault();
    $(this).next().toggle("fast");
    $(this).parent().toggleClass("rotated");
    $(this).parent().toggleClass("current");
  });


  // MAPS

  $('.locations li a').click(function(e) {
    e.preventDefault();
    $(this).parent().siblings().removeClass("current");
    $(this).parent().addClass("current");

    var x = $(this).parent();
    $('img.locations-map').hide().each(function() {
      if ($(this).hasClass(x.attr('rel'))) {
        $(this).show();
      }
    });
  });


  // BLOG

  $('.post:first').addClass('first');  
  //$('.post:last').addClass('last');  
  $('.blog-author:first').addClass('first');

  $('.blog-author').each(function(){

    var $this = $(this),
        $span = $this.find('span.avatar-arrow');

    $this.find('.blog-avatar > a , .number-of-posts > a').on('click', function(e){
      e.preventDefault();
      $span.toggleClass('open');
      $this.find('.number-of-posts').toggleClass('open');
      $this.find('.author-posts').toggle('slide');
    });

  });


  // SCROLLABLES

  $.easing.custom = function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
    return c/2*((t-=2)*t*t*t*t + 2) + b;
  }

  function initScrollPage() {
    jQuery(".scrollable-testimonial").scrollable({ 
      easing: 'custom', 
      speed: 500,
      next: ".next-testimonial", 
      prev: ".prev-testimonial"
    });
    var scrollable = jQuery(".scrollable-testimonial").data("scrollable");
    var size = 6;
    scrollable.onSeek(function(event, index) {
      if (this.getIndex() >= this.getSize() - size) {
        jQuery("a.next").addClass("disabled");
      }
    });

    scrollable.onBeforeSeek(function(event, index) {
      if (this.getIndex() >= this.getSize() - size) {
        if (index > this.getIndex()) {
          return false;
        }
      }
    });
  }

  $(".scrollable").scrollable();

  $('.scrollable-testimonial a').click(function(e) {
    e.preventDefault();
    $(this).parent().siblings().children().removeClass("current");
    $(this).addClass("current");

    var x = $(this);
    $('.testimonial-text').hide().each(function() {
      if ($(this).hasClass(x.attr('rel'))) {
        $(this).fadeIn("fast");
      }
    });
  });


  // REEL FADER

  // function initReelSlider() {
  //   $(".items-reel").cycle({
  //     fx: 'fade',
  //     prev: '.prev-reel',
  //     next: '.next-reel'
  //   }).cycle("pause");
  // }


  // TEAM BIOS

  $('.bio-list a').click(function(e) {
    e.preventDefault();

    var x = $(this);
    $('.bio-div').hide().each(function() {
      if ($(this).hasClass(x.attr('rel'))) {
        $(this).show();
      }
    });
  });



















});
