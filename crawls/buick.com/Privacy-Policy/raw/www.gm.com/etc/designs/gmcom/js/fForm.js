$('document').ready(function(){
	
	//sets all fields to blank
	//$('input[type="text"], textarea').val('');
	$('.state').find('option[value="select"]').attr('selected','selected');
	var defaultText = $('.newStateSelect ul li:first-child').html(),
		maxCharacterCount = 1000;
	$('.target').html(defaultText);
	//$('.chars').html(maxCharacterCount);
	
	//function for Character Countdown number
	$('textarea#details').live('keyup', function() {
		var chars = $('textarea').val().length;
		if( chars > maxCharacterCount ){
			$('textarea').val( $('textarea').val().substr( 0, maxCharacterCount - 1 ));
		} else {
			$('.chars').html(maxCharacterCount - chars);
		}
	});
	
	//places select box into a variable
	var inputs = $('.state');
	//places selected option into a variable
	var selected = inputs.find('option[selected]');
	//gets all option elements
	var option = $('.state option');

	$('.stateSelect').append('<div class="newStateSelect"></div>');
	$('.newStateSelect').append('<a class="target" href="#">' + selected.text() + '<span class="value">' + selected.val() + '</span></a>');
	$('.newStateSelect').append('<ul />');
	option.each(function(){
		$('.newStateSelect ul').append('<li><a href="#">' +
			$(this).text() + '<span class="value">' +
			$(this).val() + '</span></a></li>');
	});
	
	$('.newStateSelect ul li').live('click',function(event){
		var text = $(this).html();
		$('.target').html(text);
		$('.newStateSelect ul').toggle();
		inputs.val($(this).find('span.value').html());
		event.preventDefault();
		$('.stateSelect').css('marginBottom','0px');
	});
	
	$('.target').live('click',function(event){
		$('.newStateSelect ul').toggle();
		event.preventDefault();
		if($('.stateSelect').height() < 50){
			$('.stateSelect').css('marginBottom','0px');
		}else{
			$('.stateSelect').css('marginBottom','-150px');
		}
	}); 

	//button to reset all field values
	$('input[value="reset"]').live('click', function() {
		$('input[type="text"], textarea').val('');
		$('.state').find('option[value="select"]').attr('selected','selected');
		var defaultText = $('.newStateSelect ul li:first-child').html();
		$('.target').html(defaultText);
		$('.chars').html('2500');
		$('.complete').remove();
		$('.errorIndicator').remove();
	});
	
	//send button functions
	$('input[value="send"]').live('click', function() {
		var blankFields = [];
		
		//clears previous error messages (if any)
		$('.complete').remove();
		$('.errorIndicator').remove();
		
		//checks to make sure required fields aren't blank
		if($('textarea[name="message"]').val() == ''){
			$('<span class="errorIndicator />').insertAfter('.message');
			blankFields.push(' Message');
		}
		if($('input[name="firstName"]').val() == '') {
			$('<span class="errorIndicator />').insertAfter('.firstName');
			blankFields.push(' First Name');
		}
		if($('input[name="lastName"]').val() == ''){
			$('<span class="errorIndicator />').insertAfter('.lastName');
			blankFields.push(' Last Name');
		}
		if($('input[name="email"]').val() == ''){
			$('<span class="errorIndicator />').insertAfter('.email');
			blankFields.push(' E-mail');
		}
		if($('.errorIndicator').length > 0) {
			$('<p class="complete">Please complete the following fields:' + blankFields + '</p>').insertBefore('form[name="exampleForm"]');
		}
	});
	
});