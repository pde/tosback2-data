
var SL_modal={};SL_modal.display_modal=function(modal_content,ajax)
{if($('#modal_window').length<1)
{$('body').append('<div id="mask"></div><div id="modal_window"><div id="modal" class="clearfix"><div id="modal_content"></div><div id="modal_close"></div></div></div>');}
ajax=(typeof ajax=='undefined')?false:ajax;var maskHeight=$(document).height();var maskWidth=$(window).width();var winH=$(window).height();var winW=$(window).width();$('#mask').css({'width':maskWidth,'height':maskHeight,'background-position':'center '+(winH/2+$(window).scrollTop())+'px'});$('#mask').fadeTo("normal",0.5);$('#mask').fadeIn("normal");if(ajax)
{$('#modal_content').load(modal_content,function(){$('#modal_window').css('top',(winH/2-$('#modal_window').outerHeight()/2)+$(window).scrollTop());$('#modal_window').css('left',winW/2-$('#modal_window').outerWidth()/2);$('#modal_window').fadeTo("normal",1);$('#modal_window').fadeIn("normal");});}
else
{$('#modal_content').html(modal_content);$('#modal_window').css('top',(winH/2-$('#modal_window').outerHeight()/2)+$(window).scrollTop());$('#modal_window').css('left',winW/2-$('#modal_window').outerWidth()/2);$('#modal_window').fadeTo("normal",1);$('#modal_window').fadeIn("normal");}
$('#mask, #modal_close').click(function(){$(this).unbind('click');$('#modal_window').hide();$('#mask').fadeOut();$('#modal_content').html('');});};