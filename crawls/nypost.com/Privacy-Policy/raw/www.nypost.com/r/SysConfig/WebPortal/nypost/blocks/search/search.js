$(document).ready(function(){
  $('.search_input').click(function(){
    $(this).addClass('active');
  }).blur(function(){
    if(this.value == ""){
      $(this).removeClass('active');
    }
  });
  if($('.search_input').val() != '') { $('.search_input').addClass('active'); }
});