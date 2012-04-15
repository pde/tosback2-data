$("li.gl_fly_out_hover").mouseover(showMenu);
$("li.gl_fly_out_hover").mouseout(hideMenu);
$('.gl_fly_out').each(function(){
	$(this).children('.gl-dd-right').children('.nav_menu_content').children('ul').css('height', $(this).height()+"px");
});
function showMenu() {
	$(this).children('.gl_fly_out').css('display', 'block');
}
function hideMenu() {
	$(this).children('.gl_fly_out').css('display', 'none');
}
