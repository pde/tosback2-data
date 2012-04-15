$(document).ready(function(){
  // set "house icon"
  $('#logo').hover(
    function(){ $('.home_icon').fadeIn('fast'); },
    function(){ $('.home_icon').fadeOut('fast'); }
  );
  // set "last updated"
  $.get("/r/SysConfig/WebPortal/nypost/blocks/masthead/last_updated.htm",{},function(result){
    $('#site_updated').hide().fadeIn('slow').html(result);
  });
});