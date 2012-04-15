//Veranda Global JS

//Most Popular Tout
function mptabs(swapmp) {
	if (swapmp == 'mod_tab_mag') {
	$("#mod_tab_mag").show();
	$("#mod_tab_rss").hide().addClass("active");
	$("#tab_mag").removeClass("non_active").addClass("active");
	$("#tab_rss").removeClass("active").addClass("non_active");
	
	}
	
	else if (swapmp == 'mod_tab_rss') {
	$("#mod_tab_mag").hide();
	$("#mod_tab_rss").show();
	$("#tab_rss").removeClass("non_active").addClass("active");
	$("#tab_mag").removeClass("active").addClass("non_active");
	
	}
}

/* sets up sliding right rail */
function initSlideRail(){
        $('.moduleHeader').click(function(){
                var module = $(this).parent('.module'),
                        isopen = $(module).hasClass('open'),
                        _body = $(this).next('.moduleBody');
                if(isopen){
                        $(module).removeClass('open')
                                .addClass('closed');
                        $(_body).slideUp();
                }else{
                        $(module).removeClass('closed')
                                .addClass('open');
                        $(_body).slideDown();
                }
        });
}


//Viral Tools Share Menu
function share_show() {
$("#share_dd").show();
}
function share_hid() {
$("#share_dd").hide();
}

$(document).ready(function(){
	/* prevent exec script in search box */
	$("form[action='/search/'] a")
	.attr("href","#")
	.click(function(e){
		e.preventDefault();
		$(this).parents("form").submit();    
	});

	$("form[action='/search/']").submit(function(){
		$input = $("input[name=q]",this);
		//get unsafe search string 
		var s = $input.val();
		//replace
		s = s.replace(/</g,'&lt;').replace(/>/g,'&gt;');
		//set safe search string 
		$input.val(s);
	});

});

