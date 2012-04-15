$(document).ready(function(){
	
	$("div#subNav ul li a img[name='tour']").hover(
	function() {
		$(this).attr("src","http://static.eharmony.com/assets/images/mn-tour-over.gif");
	},
	function() {
		$(this).attr("src","http://static.eharmony.com/assets/images/mn-tour-off.gif");
	});
	$("div#subNav ul li a img[name='whyeh']").hover(
	function() {
		$(this).attr("src","http://static.eharmony.com/assets/images/mn-whyeh-over.gif");
	},
	function() {
		$(this).attr("src","http://static.eharmony.com/assets/images/mn-whyeh-off.gif");
	});
	$("div#subNav ul li a img[name='ss']").hover(
	function() {
		$(this).attr("src","http://static.eharmony.com/assets/images/mn-ss-over.gif");
	},
	function() {
		$(this).attr("src","http://static.eharmony.com/assets/images/mn-ss-off.gif");
	});
	$("div#subNav ul li a img[name='signup']").hover(
	function() {
		$(this).attr("src","http://static.eharmony.com/assets/images/mn-signup-over.gif");
	},
	function() {
		$(this).attr("src","http://static.eharmony.com/assets/images/mn-signup-off.gif");
	});
	
	$("body#tour div#subNav ul li a img[name='tour']").unbind();
	$("body#tour div#subNav ul li a img[name='tour']").attr("src","http://static.eharmony.com/assets/images/mn-tour-on.gif");
	$("body#why div#subNav ul li a img[name='whyeh']").unbind();
	$("body#why div#subNav ul li a img[name='whyeh']").attr("src","http://static.eharmony.com/assets/images/mn-whyeh-on.gif");
	$("body#success div#subNav ul li a img[name='ss']").unbind();
	$("body#success div#subNav ul li a img[name='ss']").attr("src","http://static.eharmony.com/assets/images/mn-ss-on.gif");
	$("body#register div#subNav ul li a img[name='signup']").unbind();
	$("body#register div#subNav ul li a img[name='signup']").attr("src","http://static.eharmony.com/assets/images/mn-signup-on.gif");
});
