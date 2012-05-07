//simple hide and show flyout function
if ($().jquery == '1.3.2'){
		
			$(document).ready(function(){
	// Add listener for hover. 
		$("#flyout-trigger").hover(function() {
			// Show panel but only if it's not already animated
			$(this).find("#product-flyout").filter(':not(:animated)').slideDown('fast');
		}, 
		function() {
		// Hide panel.
			$(this).find("#product-flyout").slideUp('fast'); 
		});
	});

	}else{
	
	$(document).ready(function(){
		var $flyoutTrigger = $("#flyout-trigger");
		var $flyout = $("#product-flyout");
		//var animationFlag = false;
		$flyoutTrigger.live('mouseenter',function() {
				$flyout.slideDown('fast');
			}).live('mouseleave',function(){
				$flyout.slideUp('fast');
			});
	});
}

//mcgowan - clears/restores default textbox values
function clearDefaultText(elTextBox, defaultValue) {
	if ((elTextBox.value && elTextBox.value == defaultValue) 
		|| (elTextBox.value && elTextBox.value == 'Please Enter the valid Word')
		|| (elTextBox.value && elTextBox.value == 'Please enter the search term')) {
		$(elTextBox).removeClass('unable');
		elTextBox.value='';
	}
}
function restoreDefaultText(elTextBox, defaultValue){
	if (elTextBox.value == '' || elTextBox.value == 'Please Enter the valid Word' || elTextBox.value == 'Please enter the search term') {
		$(elTextBox).removeClass('unable');
  		elTextBox.value= defaultValue;
	}
}
