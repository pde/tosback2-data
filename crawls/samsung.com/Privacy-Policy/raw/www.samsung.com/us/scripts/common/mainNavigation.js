//simple hide and show flyout function

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
