/* this code was inspired by http://javascript-array.com/scripts/jquery_simple_drop_down_menu */
 
var ddm = null;
var closetimer = null;
var timeout = 500;
 
function ddm_open(){
  ddm_canceltimer();
  new_ddm = $(this).find('.dropmenu_wrap');
  if(ddm != null && (ddm['context'] != new_ddm['context'])){
    ddm_close();
  }
  ddm = new_ddm;
  
  // make sure all ads are z-indexed smally
  $('.ad.wrap').css({'z-index' : '1'});
  $('.ad.wrap.lb').css({'z-index' : '30'});  /*for expanded lb*/
  
  if($.browser.msie && $.browser.version.substring(0,1)=="6"){
    if($(this).parent().parent().attr('id') == 'hat'){
      ddm.css('top',$(this).position().top + $(this).height()-5);
    }else if($(this).parent().parent().attr('id') == 'fat_header_subnav_wrap' || $(this).parent().parent().attr('id') == 'main_gallery'){
      ddm.css('left',0).css('top',$(this).position().top + $(this).height());
    }else if($(this).parent().attr('id') == 'rollover_in_rollover'){
      ddm.css('left','-130px').css('bottom','330px');
    }else{      
      ddm.css('left',$(this).position().left).css('top',$(this).position().top + $(this).height());
    }
  }
  ddm.slideDown('fast');
}
 
function ddm_close(){
  $('.dropmenu_wrap').slideUp('fast', function(){
    // make sure all ads are z-indexed smally
    //$('.ad.wrap').css({'z-index' : '20'});  
    $('.ad.wrap.lb').css({'z-index' : '30'});//for expanded  lb
  });
}
 
function ddm_timer(){
  closetimer = window.setTimeout(ddm_close, timeout);
}
function ddm_canceltimer(){
  if(closetimer){
    window.clearTimeout(closetimer);
    closetimer = null;
  }
}
 
$(document).ready(function(){
  $('.dropmenu_wrap').parent('li').hover(ddm_open,ddm_timer);  
});
 
document.onclick = ddm_close;