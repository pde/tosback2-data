

/* MENUS */
jQuery(window).load(function(){
		 $("form.jqtransform").jqTransform();
		$('form').jqTransform({imgPath:'images/forms/'});
		
    jQuery(".megamenu").megamenu({ 'show_method':'fadeIn', 'hide_method': 'fadeOut' });
// 'show_method' can take 'fadeIn', 'slideDown' and 'simple' as values only. Default: 'slideDown'
// 'hide_method' can take 'fadeOut', 'slideUp' and 'simple' as values only. Default: 'slideUp'
});

	$(document).ready(function(){
		$(".more_info").hide();
					jQuery(".more").click(function () {
						$(this).next(".more_info").slideToggle("slow");
								$(this).parent() .children(".more").hide();
					});	

					$(".less").click(function () {
												$(".less").parent(".more_info").slideUp("slow");
							$(".more").show();
					});																								
		});

	
