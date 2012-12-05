// Scroll to anchor via Jquery
function goToByScroll(id){
$('html,body').animate({scrollTop: $("#"+id).offset().top},'slow');
}


var urlString = window.location.href;

// Expand / contract text
function readMore(id, ob, hide, text){
$(id).show();
if(hide == 'true'){$(ob).hide();}
if(text != 'false'){
var oldAct = $(ob).attr('onClick');
var oldText = $(ob).find('a').html();
$(ob).find('a').html(text);
$(ob).removeAttr('onClick');
$(ob).bind("click", function(){
$(id).hide();
$(ob).attr("onClick", oldAct);
$(ob).find('a').html(oldText);
$(ob).unbind("click");
});
}
}



//Main Banner Scroll
function heroFade(){
		   $('ul#hero"').innerfade({
                        speed: "slow",
                        timeout: 9000,
                        type: 'sequence',
                        containerheight: 	'auto',
                        slide_timer_on: 	'yes',
                        slide_ui_parent: 	'hero',
                        slide_ui_text:		'null',
                       	slide_nav_id:		'slide_nav',
                       	slide_nav_squares: 'largeBoxHomeFill'
                    	});
                    	$.setOptionsButtonEvent();
}


//External link window function
function externalLink(url){
url = url.replace("?","TVarsT");
url = url.replace(/&/g,"TVarT");
var dloadRed =  url.split("download.truste");
if(dloadRed[1] != "" && dloadRed[1] != null){
}
else{
if (consentCookie[0] !== '0'){
_gaq.push(['_trackEvent', 'Ext Links', 'Click', url]);	
}
}
var extLink = "/window.php?url=" + url;
window.open(extLink);
}


//Nav Functions
$('#navSF li').each(function(index) {
var pos1 = $(this).find('a').css('background-position').split(" ");
$(this).bind('mouseover', function(){
$(this).find('a').css('background-position', pos1[0]+" 0px");
$(this).find('ul').show();
});

$(this).bind('mouseout', function(){
$(this).find('a').css('background-position', pos1[0]+" -37px");
$(this).find('ul').hide();
});
});


	
$(function(){
Shadowbox.init();
set_up();
});
	