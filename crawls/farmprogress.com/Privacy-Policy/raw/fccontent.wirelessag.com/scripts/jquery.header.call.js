$(function() {
  // VAR's 
  var $last_item = $('.ie article header .storyAuthor ul li:last-child, #sidebar #stayUpdatedBox ul li:nth-child(2n+1), .vrg .precip-total:last-child'),
      $odd_item = $('.ie .vrg .precip-total:nth-child(2n)'),
      $homeFeature = $('#homeFeature');

  /* IE classes  */
  $last_item.addClass('last');
  $odd_item.addClass('odd');
  // toggle values
  var $toggleval = $(".toggleVal");
  $toggleval.toggleVal();

  // login menu dropdowns
  $("#siteSearch").find(".searchField").focus(function(){
    $("#siteSearch").addClass("focused");
  }).blur(function(){
    $("#siteSearch").removeClass("focused");
    // if user entered text - keep input full size
    if ( $('.searchField.tv-changed').length > 0 ) {
      $("#siteSearch").addClass("focused");
    }
  });
  // search form submit - new templates
  $('#mSgImg').click(function() {
    // doesnt work when var's outside of fn... ?
    var $search_query = $('.searchField').val(),
        $search_form = $('#googleFpSearch'),
        $hidden_form_input = $('#googleFpSearch input[name="q"]');
    // change hidden input value
    $hidden_form_input.attr('value', $search_query);
    // submit form 
    $search_form.submit();
  });
  // submit form upon hitting ENTER
  $('#siteSearch .searchField').keypress(function(e){
    if((e.keyCode ? e.keyCode : e.which) == 13){
      // doesnt work when var's outside of fn... ?
      var $search_query = $('.searchField').val(),
          $search_form = $('#googleFpSearch'),
          $hidden_form_input = $('#googleFpSearch input[name="q"]');
      // change hidden input value
      $hidden_form_input.attr('value', $search_query);
      // submit form 
      $search_form.submit();
      return false;
    }
  });

  /* FF + SHOW search fix - remove when old search is removed */
  $('.legacy-search').click(function() {
    // this legacy button click does not work for FF + FP Show sites
    var search_action = $('#googleFpSearch').attr('action'),
        search_query = $('.hdrSearchTb').val();
    // cheap way to perform search
    window.location.href = search_action + search_query;
  });
  // submit form upon hitting ENTER
  $('.hdrSearchTb').keypress(function(e){
    if((e.keyCode ? e.keyCode : e.which) == 13){

      var search_action = $('#googleFpSearch').attr('action'),
          search_query = $('.hdrSearchTb').val()
      // cheap way to perform search
      window.location.href = search_action + search_query;
      return false;
    }
  });
  /* END - FF + SHOW search fix - remove when old search is removed */
  // user account popup menus
  $(".popup-link").click(function(e) {
      e.preventDefault();
    $(this).next().toggle();
      $(this).addClass("menu-open");
  });
  $(".menu-popup").mouseup(function() {
      return false;
  });
  // menu dropdown for login
  $(document).mouseup(function(e) {
      if($(e.target).parent("a.popup-link").length==0) {
        $(".popup-link").removeClass("menu-open");
        $(".menu-popup").hide();
      }
  });
  // login form
  $('#forgotPasswordLink').click(function() {
    $('#memberLogin').slideUp(300);
    $('#forgotPassword').slideDown(600);
  });     
  $('.email-address').keypress(function(e){
      if((e.keyCode ? e.keyCode : e.which) == 13){
          $(".login-password").focus();
          return false;
      }
  });
  $('.login-password').keypress(function(e){
      if((e.keyCode ? e.keyCode : e.which) == 13){
       $(".login-button").click();
       return false;
      }
  });
  $('.email-address-forgot').keypress(function(e){
      if((e.keyCode ? e.keyCode : e.which) == 13){
          $(".send-password").click();
          return false;
      }    
  });
  $('#sendPasswordCancel').click(function() {
    $('#forgotPassword').slideUp(300);
    $('#memberLogin').slideDown(600);
  });
  $('.change-location').keypress(function(e){
      if((e.keyCode ? e.keyCode : e.which) == 13){
          $(location).attr('href',$(".location-button").attr("href"));
          return false;
      }    
  });  
  // mobile app links
  function urlParamter(name) {
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)",
        regex = new RegExp( regexS ),
        results = regex.exec( window.location.href );
    if( results == null )
      return "";
    else
      return results[1];
  }  
  var app_id   =  urlParamter('app'),
      nav_tabs =  $('.nav-tabs'),
      tab_content =  $('.tab-content'),
      nav_tab_content = $('.nav-tabs, .tab-content');

  switch (app_id) {  
  case "fp":  
    nav_tab_content.find('.active').removeClass('active');
    nav_tabs.find('a[href="#farm-progress"]').parent().addClass('active');
    tab_content.find('#farm-progress').addClass('active');  
    break;  
  case "bp":  
    nav_tab_content.find('.active').removeClass('active');
    nav_tabs.find('a[href="#beef-producer"]').parent().addClass('active');
    tab_content.find('#beef-producer').addClass('active');  
    break;  
  case "gdd":  
    nav_tab_content.find('.active').removeClass('active');
    nav_tabs.find('a[href="#growing-degree-days"]').parent().addClass('active');
    tab_content.find('#growing-degree-days').addClass('active'); 
    break;  
  case "ff":  
    nav_tab_content.find('.active').removeClass('active');
    nav_tabs.find('a[href="#farm-futures"]').parent().addClass('active');
    tab_content.find('#farm-futures').addClass('active'); 
    break;   
  }

  // form modal 
  $('.eCDiv').appendTo('#eStoryC, #eAuthorC');
  // scroller Mall 
  $(".scroller ul").simplyScroll({
    orientation:  'vertical',
    frameRate:    24,
    speed:        1
  });

  /* Bootstrap JS */
  $('.ttip').tooltip({     
    animation: true
  });
  $('section.module h4, aside h3, #homeWeather h3').tooltip({      
    placement: 'right',
    selector: "a[rel=tooltip]"    
  });
  $('#promoImageSlide').carousel({
    interval: 7500
  });
  $('#trialImageSlide').carousel({
    interval: 3500
  })
  $('.more-info').popover({
    placement: 'bottom',
    delay: { show: 300, hide: 100 }
  });

  // REMOVE for production 
  $('#storyBody p span, #storyBody p').removeAttr('style');
  // weather slider 

  // market select box - http://www.bulgaria-web-developers.com/projects/javascript/selectbox/
  $(".custom-select").selectbox({
    effect: 'fade'
  });

  /* MARKET CHART TIME PERIODS */
  var focus_chart_period;
  // market graph data change click
  $('.chart-period').bind('click', function(){
    focus_chart_period = $(this).attr('id');
    fetchTickerData();
  });
  // get file from server
  function fetchTickerData(){
    $.get(focus_chart_period + '-data.html', updateGraph);
  }
  // assign zing chart function/data
  function updateGraph(data){
    var options = '{"data": ' + data + '}';
    zingchart.exec('focus_chart', 'setdata', options);
  }



  // window loaded function
  $(window).load(function() {

    var featureTimer = $.timer(function() {
          var $activeFeatureItem = $('#featureNav').find('.active'), 
              $lastFeatureItem = $('#featureNav li:last'), 
              $firstFeatureItem = $('#featureNav li:first');   
              // END var's 
          if ( $lastFeatureItem.hasClass('active')){
            $firstFeatureItem.find('a').click();  // check if we need to start over
          } else {
            $activeFeatureItem.next().find('a').click(); // primary behavior - go to next link
          }
    });
    function featurePause() {
      featureTimer.stop();
    }
    function featurePlay() {
      featureTimer.play().reset();
    }
    $homeFeature.find('#featureLinks, #featureNav').hover( function() {
        featurePause();
      }, function() {
        // dont restart slideshow if manually paused
        if( $('.playSlide').hasClass('hidden') ){
          featurePlay();
        }
      }
    );
    // change classes to hide/show buttons
    $homeFeature.find('.pauseSlide').click( function() {
        featurePause();
        $('.pauseSlide').addClass('hidden').next().removeClass('hidden');
    });
    $homeFeature.find('.playSlide').click( function() {
        featurePlay();
        $('.playSlide').addClass('hidden').prev().removeClass('hidden');
    });
    // call the timer 
    featureTimer.set({ time : 10000, autostart : true });
    // set the header search bar value
    $("#siteSearch .gsc-input").val('e.g. Corn, USDA');

  });
  /* END window load */
/* END ready */
});