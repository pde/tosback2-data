function load_document_ready_functions()
{ 
  $(".top_user_menu_link").mouseover(function()
  { 
    $(this).css('background-color','#666'); 
    $(this).css('cursor','pointer');
  });

  $(".top_user_menu_link").mouseout(function(){ $(this).css('background-color',''); });

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
} //end function load_document_ready_functions() { 


$(document).click(function (e) {
  $('#top_user_menu').hide('slow');
  $(".user_popup_menu").hide('slow');
});

//async script loading to prevent a script on the cdn from stalling the rest of the page (in case cdn has issues)
$(document).ready(function(){
 $.getScript("http://edge.liveleak.com/80281E/u/u/ll2_j/jquery.prettyLoader.js", function(data, textStatus, jqxhr) {
   $.prettyLoader();
   $(document).ajaxComplete(function() { $.prettyLoader(); });
 });
 $.getScript("http://edge.liveleak.com/80281E/u/u/ll2_j/jquery.prettyPhoto.js", function(data, textStatus, jqxhr) {
    $("a[rel^='prettyPhoto']").prettyPhoto({allow_resize: false});
	$(document).ajaxComplete(function() { $("a[rel^='prettyPhoto']").prettyPhoto({allow_resize: false}); });
 });
 $.getScript("http://edge.liveleak.com/80281E/u/u/ll2_j/jquery.ba-bbq.min.js", function(data, textStatus, jqxhr) {
  ;
 });

 load_document_ready_functions();
});
