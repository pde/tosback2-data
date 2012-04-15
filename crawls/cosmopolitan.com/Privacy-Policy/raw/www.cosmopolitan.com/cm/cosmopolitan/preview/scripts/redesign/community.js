// JavaScript Document

function forumUserGreeting() {
if (mag_user && mag_user.logged_in) {
		user = mag_user;
		name = user.first_name || user.user_name;
		displayName = (name.length > 12) ? name.substring(0,12) + '&#133;' : name ;
		document.write ('<span class="black_hdr_welcome">Welcome,&nbsp;</span>');
		document.write ('<div class="purple"><a href="/community/profile/">');
		document.write (displayName);
		document.write ('</a>');
        document.write ('</div>');
        } 
   else {
		document.write("<div class='purple'>");
		document.write("<a href='/registration/'>Join Free</a>");
		document.write("<img src='/cm/cosmopolitan/tmpl_images/community_img/dotted_slash.gif'/>");
		document.write("<a href='/login/'>Sign In</a>");
        document.write("</div>");
	   }
	}


function myProfileLink() {
 if (mag_user.logged_in && location.href.indexOf('profile') == 1) {
	document.write ('<img src="/cm/cosmopolitan/tmpl_images/community_img/dotted_slash.gif"/> <span class="pink_hdr">My Profile</span>');
        }
else if (mag_user.logged_in && location.href.indexOf('profile') < 1) {
    document.write('<img src="/cm/cosmopolitan/tmpl_images/community_img/dotted_slash.gif"/>');
	document.write(' <span class="black_hdr"> <a href="/community/profile/">My Profile</a></span>');
		}
else {
	document.write(" ");
	 }
}
	
$(document).ready(function(){
//Listeners for submit button hover and click
	$(".search_cntr > .search_form > .search_submit > input").hover(function(){
		var src = $(this).attr("src");
		if (src == '/cm/cosmopolitan/tmpl_images/community_img/btn_search.gif')
		{
		src = ('/cm/cosmopolitan/tmpl_images/community_img/btn_searchon.gif');
		}
		$(this).attr("src",src);
	},function(){
		var src = $(this).attr("src");
		if (src == '/cm/cosmopolitan/tmpl_images/community_img/btn_searchon.gif')
		{
		src = ('/cm/cosmopolitan/tmpl_images/community_img/btn_search.gif');
		}
		$(this).attr("src",src);
	})
	
});




