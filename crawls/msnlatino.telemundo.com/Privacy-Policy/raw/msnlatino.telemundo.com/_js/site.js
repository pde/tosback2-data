// Temporarily added to prevent console.log errors in IE
if (typeof console == 'undefined') { window.console = function(){}; console.log = function(a){}; }
// site specific javascript
if(!$.browser.safari)
{
	$(document).ready(function(){
		behavior_binder();
	});
}
else
{
	$(window).load(function(){
		behavior_binder();
	});
}
/*
Binds behaviors
** can be re-run whenever there are DOM changes
*/
function behavior_binder(){


	if($.browser.safari)
	{
		var ignoreMe = document.body.offsetWidth;
	}
	if(window.create_dl!==undefined && typeof(window.create_dl)==='function'){
		create_dl();
	}
	if(window.initialize_header!==undefined && typeof(window.initialize_header)==='function'){
		initialize_header();
	}

	
/* ADD FIRST/LAST TO LI
		adds a class 'first' to the first LI, and a 'last' to the last LI and 'first last' to a single LI
	*/
	$('ul').each(function(i){
		$(this).children('li:not(.hidden):first').addClass('first');
		$(this).children('li:not(.hidden):last').addClass('last');
	});
	
/* Mouseover for Dropdown menu */
	$('#listing_dropdown').mouseout(function(event){
   	hideSmallCelebSSuggestionsOnMouseOut(this,event,"");
 	});

	
// END ADD FIRST/LAST TO LI
	
/* SITE BUTTON */
	$(".site_btn").wrapInner('<span class="site_btn_mid"></span>');
	$(".site_btn").prepend('<span class="site_btn_left"></span>');
	$(".site_btn").append('<span class="site_btn_right"></span>');
	$(".site_btn_alt").wrapInner('<span class="site_btn_alt_mid"></span>');
	$(".site_btn_alt").prepend('<span class="site_btn_alt_left"></span>');
	$(".site_btn_alt").append('<span class="site_btn_alt_right"></span>');
/* MEDIA THUMBNAIL ICONS */
	// To add media icons to the thumbnails in a module, 
	// add the module id to the thumb_icons array
	var thumb_icons = ["#more",
			"#lo_mejor_de_la_semana", 
			"#mod_video_highlights",
			"#mod_browse_photos",
			"#mod_featured_photos"];
	for ( var x=0;x<thumb_icons.length;x++){
		$(thumb_icons[x]+" .media_article").append('<span class="media_article_icon"></span>');
		$(thumb_icons[x]+" .media_photo").append('<span class="media_photo_icon"></span>');
		$(thumb_icons[x]+" .media_video").append('<span class="media_video_icon"></span>');
	}
	
/* DROP TABS */
	$(".drop_tab li a").wrapInner('<span class="drop_tab_mid"></span>');
	$(".drop_tab li a").prepend('<span class="drop_tab_left"></span>');
	$(".drop_tab li a").append('<span class="drop_tab_right"></span>');
	
	//converts all module_head h3's to DIN font
	$('.module_header h3:not(.t14 h3, .t12 .activate_cufon, .c10 .activate_cufon, .c11 .activate_cufon, .t13 .activate_cufon, .st1 .activate_cufon, .st2 .activate_cufon, .st3 .activate_cufon, .c12 .module_header h3, .t14 .module_header h3)').drawFont();
	$('.module_head h3:not(.t14 h3, .t12 .activate_cufon, .c10 .activate_cufon, .c11 .activate_cufon, .t13 .activate_cufon, .st1 .activate_cufon, .st2 .activate_cufon, .st3 .activate_cufon, .c12 .module_head h3, .t14 .module_head h3)').drawFont();
	$('.module_head_links h3 a').drawFont();
	$('#tv_listings .listings_title').drawFont();
	$('#commenting').snasCommenting({action_function:function(){DARTad.refreshAds();}});
	$('ul.rating_stars').snasRate();
	$('#survey_of_the_day .module_content').snasPoll({action_function:function(){DARTad.refreshAds();}});
	$('#encuesta_del_dia .module_content').snasPoll({action_function:function(){DARTad.refreshAds();}});
	$('#login_user, #login_password').one("focus", function(e){
											$(this).attr('value', '');
											});


/* SEND TO A FRIEND */
	$('.share_btn, .send_to_friend').click(function(){ sn_show_sendToFriend(); return false; });

}


/* Adding New TV Grid Code */
function hideSmallCelebSuggestion(){
	document.getElementById("listing_dropdown").style.display = 'none';
}

function hideSmallCelebSSuggestionsOnMouseOut(element, event, JavaScript_code){
	var current_mouse_target = null;
	if (event.toElement) {
		current_mouse_target = event.toElement;
	} else if (event.relatedTarget) {
		current_mouse_target = event.relatedTarget;
	}
	if (!is_child_of(element, current_mouse_target) && element != current_mouse_target) {
		setTimeout("hideSmallCelebSuggestion()", 250);
	}
}

function is_child_of(parent, child){
	if (child != null) {
		while (child.parentNode) {
			if ((child = child.parentNode) == parent) {
				return true;
			}
		}
	}
	return false;
}

