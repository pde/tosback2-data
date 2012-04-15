function load_document_ready_functions() { 

  $(".top_user_menu_link").mouseover(function()
  { 
    $(this).css('background-color','#666'); 
    $(this).css('cursor','pointer');
  });

  $(".top_user_menu_link").mouseout(function()
  {
    $(this).css('background-color','');
  });

  $(".top_user_menu_link").click(function(e)
  {
     if(!$("#top_user_menu").is(':visible'))e.stopPropagation();
     $('#top_user_menu').show('slow');
  });

  $(".user_popup_menu_link").click(function(e)
  {
     if(!$(this).parent().find(".user_popup_menu").is(':visible'))e.stopPropagation();
     $(this).parent().find(".user_popup_menu").show('slow');
  });

  $.prettyLoader();

  $("a[rel^='prettyPhoto']").prettyPhoto({allow_resize: false});

} //end function load_document_ready_functions() { 

$(document).click(function (e) {
  $('#top_user_menu').hide('slow');
  $(".user_popup_menu").hide('slow');
});

$(document).ready(function(){
 load_document_ready_functions();
});

$(document).ajaxComplete(function() {
  load_document_ready_functions();
});