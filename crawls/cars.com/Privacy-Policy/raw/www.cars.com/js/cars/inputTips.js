if((window.jQuery || window.$)){
  $('input.addTip').each(function(){
  if($(this).val() == '' || $(this).val() == $(this).attr('rel')){  this.value = $(this).attr('rel'); $(this).addClass('inputTip'); }else{$(this).removeClass('blankTip');}
  $(this).focus(function(){ if(this.value == $(this).attr('rel')) { this.value = ''; $(this).removeClass('inputTip'); }else{  $(this).select();  }  });
  $(this).blur(function(){  if(this.value == ''  || $(this).val() == $(this).attr('rel')) {  this.value = $(this).attr('rel');  $(this).addClass('inputTip');  }else{$(this).removeClass('blankTip'); }  });
  });
  $("input.addTip").parent('form').submit(function(sub){ 
	if($(this).children('input.addTip').is('.inputTip:not(.blankTip)')){   sub.preventDefault();   }
  }); //don't submit if default text
}