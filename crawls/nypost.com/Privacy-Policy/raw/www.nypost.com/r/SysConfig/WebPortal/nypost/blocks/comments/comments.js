// JavaScript Document
$(document).ready(function(){
  $('.report_abuse').unbind('click').click(function(){
    x = 5;
    y = 25;
    holder = $(this).parent();
    
    num = $(this).attr('id').split('_')[3];
    
    
    uuid = $(this).parent().parent().find('.comment_uuid').attr('value');
    relateduuid = $(this).parent().parent().find('.object_uuid').attr('value');
    
    $.get('/eom/SysConfig/WebPortal/nypost/blocks/comments/report_abuse.jsp',{'id':uuid,'relatedid':relateduuid,'y':y,'x':x,'num':num},function(result){
      $(holder).append(result);
      $('#report_abuse_form_'+num).slideDown(); 
      $('#report_abuse_form_'+num).find('img.close').click(function(){
        $('#report_abuse_form_'+num).slideUp();
        $('.report_abuse').fadeIn();
      });
      $('.report_abuse').hide();
    });
  });
	
});