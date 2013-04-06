$(document).ready(function() {
	// ----- back to top button
	$(".backtotopbutton").click(function(){
		$("html, body").animate({ scrollTop: 0 }, "slow");
		return false;
	})
	// ------ validate search form
	$("form[action='/search/']").submit(function(){
		$input = $("input[name=q]",this);
		var str = $.trim($input.val());
		if(str==null || str==''|| str=='search cosmo...'){
			alert("Please enter a valid search term");
			return false;
		}
	});
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

	// CHG0058817 Detect og:image tag which include domain?, if not, add more cosmopolitan domain.
	if($("meta[property='og\\:image']")){
		var imgUrl = $("meta[property='og\\:image']").attr('content');
		
		//check url include document.domain
		// indexOf returns the position of the string in the other string. If not found, it will return -1:
		if( imgUrl.indexOf('http://') == -1 && imgUrl.indexOf('https://') == -1)
		{
			var newImgUrl = 'http://www.cosmopolitan.com' + imgUrl;
			$("meta[property='og\\:image']").attr('content', newImgUrl);
		}

	}
});



