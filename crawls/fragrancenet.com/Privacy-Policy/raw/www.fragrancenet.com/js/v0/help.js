$(document).ready(function(){$('a[href^=#]:not([href=#])').each(function(){$(this).click(function(){if($(this.hash).length)
$('html,body').animate({scrollTop:$('#'+this.hash.substr(1)).offset().top},1000);return false;});});if($('#trig_shipCalc').length)
createPopUp('.trig_shipCalc','#shipCalc');});