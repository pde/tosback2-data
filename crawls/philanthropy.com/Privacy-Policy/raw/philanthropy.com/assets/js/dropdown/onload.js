jQuery(document).ready(function($) {

  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent),
      mm_behavior = isMobile ? 'click' : 'hover';
      wrap$ = $('.wrap');
  if ( wrap$.length < 1) {
      wrap$ = $('.page-wrapper');
  }

  $('.jobcenter-page-view .topjobs-slider').hide();
  $('.jobcenter-page-view .topjobs-slider').lemmonSlider({
    infinite: true,
    random: true
  });
  // Positioning foo
  var nav$ = $('ul.nav');
  if ((nav$.length > 0) && (wrap$.length > 0)) {
    var left = wrap$.offset().left;
    // Get the menus from the back end, then set the events for each menu item
    $.getJSON('/megamenu/all.json', function(data) {
      // append menus coming from the back end
      for (var i in data.menu) {
        // find which menu to place and where to put it
        var menu = $(data.menu[i].html).attr('data-menu'),
            li$ = nav$.find('li[data-menu-type='+menu+']');

        li$.append(data.menu[i].html);
      }

      // iterate through each list item in the nav with the attr 'data-menu-type'
      $('ul.nav li[data-menu-type]').each(function() {
        var menu = $(this).attr('data-menu-type'),
            dropdown$ = $('section[data-menu='+menu+']');

            dropdown$.css('left', left);

        if (dropdown$.length > 0) {
          $(this).removeClass('no-megamenu');
          $(this).addDropdown({
            dropdown$: dropdown$,
            hoverClassElement$: $(this).children('a'),
            hoverClass: 'navButtonHover',
            behavior: mm_behavior,
            invisible: true,
            delays: { // this is for hover behavior
              on: 150, // should probably always be zero
              off: 150
            }
          });
        }
      });

      $('section[data-menu] .topjobs-slider').lemmonSlider({
        infinite: true,
        random: true
      });
      $('.jobcenter-page-view .topjobs-slider').show();

      // hide megamenu jobs dropdown in ie only for bug #7620
      if ($.browser.msie) {
        $('section[data-menu] form').find('div.span4').remove();
        $('section[data-menu] form').find('div.span6.margin0').removeClass('span6').addClass('span9');
      }

      // newsletter signup click functionality
      var noBootstrap = typeof($.fn.modal) === 'undefined' ? true : false;
      $('a.newsletter-signup').click(function(e) {
        e.preventDefault();
        $('section.dropdown-menu').invisible();
        $(this).parents('li').removeClass('selected').children('a').removeClass('navButtonHover');
        noBootstrap ?
          openAccountWorkflow($(this).attr('url'), $(this).attr('title'), acmgt_dialog_close, show_close) :
          $('.newsletterSignup #modal-iframe').attr('src',$(this).attr('url'));
      });
    });

    // Add event listener to page resize to keep menu anchored left
    $(window).resize(function() {
      $('.dropdown-menu').css({
        'left': wrap$.offset().left
      });

      if ($('#logout').length === 1) {
        $('#logout').css({
          right: setRight($('#welcome'))
        });
      }
    });
  }

  // .hat#welcome click to .hat#logout popup
  if ($('#welcome').length === 1) {
    var welcomeCss = {
      position: 'absolute',
      top: 4 + $('#welcome').offset().top + $('#welcome').height(),
      right: setRight($('#welcome'))
    };
    $('#welcome').addDropdown({
      dropdown$: $('#logout'),
      behavior: 'click',
      css: welcomeCss
    });
  }
});

// Event listener for logout click popover closing functionality
$(window).click(function(e) {  // is the clicked element inside span#welcome?
  var isWelcome = (function(target$) {
    var welcome = false,
        parentId;
    try {
      parentId = target$.parent().attr('id');
    } catch(e) {
      parentId = '';
    }

    if (parentId && parentId === 'welcome') {
      welcome = true;
    } else if (target$.is('span#welcome')) {
      welcome = true;
    }
    return welcome;
  })($(e.target));

  // check to see if the target is within the logout popup
  var isLogout = (function(target$) {
    // does the target have a specific class, or id of logout
    if ( target$.hasClass('logout-ul') || target$.hasClass('logout-li') || target$.hasClass('logout-a') || (target$.is('div#logout') ) ) {
      return true;
    }
    return false;
  })($(e.target));

  // if logout popover is visible and target is not within logout and not within the welcome trigger
  if ($('div#logout').is(':visible') && !isLogout && !isWelcome) {
    e.preventDefault();
    $('#logout').fadeOut(50);
  }
});

// setRight is a utility function that justifies the logout popover to the right
// of the "Welcome {person}!"
var setRight = function() {
  var hoverRightJustified = $(window).width() - ($('#welcome').offset().left + $('#welcome').outerWidth(true));
  var dropdownOuterDiff = $('#logout').outerWidth(true) - $('#logout').innerWidth();
  return hoverRightJustified - dropdownOuterDiff;
}