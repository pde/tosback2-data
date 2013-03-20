$(document).ready(function() {
	// ----- back to top button
	$(".backtotopbutton").click(function(){
		$("html, body").animate({ scrollTop: 0 }, "slow");
		return false;
	})
	
	// ----- search box
	$("#HDM_site #aux_search").click(function(){
		if ($(this).val()=="search cosmo...") {
			$(this).val("");
		}
	})
	$("#HDM_site #aux_search").blur(function(){
		if ($(this).val()=="") {
			$(this).val("search cosmo...");
		}
	})
	// ----- stickymenu search box
	$(".stickymenu #aux_search").click(function(){
		if ($(this).val()=="search cosmo...") {
			$(this).val("");
		}
	})
	$(".stickymenu #aux_search").blur(function(){
		if ($(this).val()=="") {
			$(this).val("search cosmo...");
		}
	})

	$(document).scroll(function(){
		$(".tyntShIh").removeClass("tyntIhHover");		
	})
	
	// ----- to fix the "join free" and "sign in" loginArea links
	// ----- they should have old functionality of hdm-lib.js, but hdm-lib.resp.js is affecting them
	$("#loginArea").hover(function() {
		$("#loginArea .joinFree a").attr("href","/registration/");
		$("#loginArea .joinFree + li + li a").attr("href","/login/");
	});
});



