$('document').ready(function(){
	
	//sets all fields to blank
	
	//$('input[type="text"], textarea').val('');
	//$('.state').find('option[value="select"]').attr('selected','selected');
	//var defaultText = $('.newStateSelect ul li:first-child').html();
	//$('.target').html(defaultText);
	//$('.chars').html('2500');
	
	//function for Character Countdown number
	$('textarea[name="message"]').live('keyup', function() {
		var chars = $('textarea').val().length;
		$('.chars').html(2500 - chars);
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
		if($('.redArrow').length > 0) {
			$('<p class="complete">Please complete the following fields:' + blankFields + '</p>').insertBefore('form[name="exampleForm"]');
		}
	});

	if (!$.browser.opera) {
		// select element styling
		$('select.select').each(function(){
			var title = "SELECT";
			if( $(this).attr('title') != '') {
				title = $(this).attr('title');
			} else if( $('option:selected', this).text() != '') { 
				title = $('option:selected',this).text();
			} else if( $('option:selected', this).val() != '') { 
				title = $('option:selected',this).val();
			}
			$(this)
				.css({'z-index':10,'opacity':0,'-khtml-appearance':'none'})
				.after('<span class="select">' + title + '</span>')
				.change(function(){
					val = $('option:selected',this).text();
						$(this).next().text(val);
					})
		});
 	};

	$('input:text').each( function(){
		var $this = $( this );
		$this.focus( function(){
			if( $this.val() == $this.attr( 'default' )){
				$this.val( '' );
			}
		}); 
		$this.blur( function(){
			if( $this.val() == '' ){
				$this.val( $this.attr( 'default' ) );
			}
		});
	});

	if( $('.tTip').length > 0 ){
		$('.tTip').jTooltip({speed: 150, delay: 300});
	}
	
	
	if ($('body').is('#contactUsForm')) {
		configureContactUsForm();
	}
});

function configureContactUsForm() {
	if ($('.mds-cmp-thank_you').length > 0) {
		$('#general-form').show();
		
		if( typeof( Cufon ) == 'function' && Cufon.replace ){
			Cufon.replace( '#general-form h2', {
				fontFamily: 'gotham-bold'
			});
		}
		return;
	}
	
	if ($('.errorMessage').length > 0) {
		//alert('errors on page');
		$('#general-form').show();
		return;
	}
	
	$('#help-me-find-form').show();

	//contact us send button functiontionality
	$('div.submitButtonContainer div.actionContainer').live('click', function(e){
		e.preventDefault();
		
		if ($('input#unrelated_OtherQuestion').next().hasClass('ui-radio-checked')) {
			// load next form
			$('#help-me-find-form').hide(0, function() {
				$('#general-form').show();
			});
			
			if( typeof( Cufon ) == 'function' && Cufon.replace ){
				Cufon.replace( '#general-form h2', {
					fontFamily: 'gotham-bold'
				});
			}
		}
		else {
			// redirect to selected url.
			
			var selectedLabel = $('label.ui-radio.ui-radio-checked');
			var selectedKey = selectedLabel.attr('for');
			
			if (typeof(selectedKey) == "undefined") { alert("You must select a topic of interest."); return; }
			
			var url = contactUsJSON[selectedKey];
			
			if (typeof(url) == "object") {
				// look for selected option
				
				if (selectedLabel.find('select option')[0]['selected']) { // ignore first option
					alert("You must select a brand");
					return;
				}
				
				var selectedOption = selectedLabel.find('select option:selected').attr('value');
				
				url = contactUsJSON[selectedKey].selects[selectedOption];
				// go to the url
				//alert ("goto url: " + url);
				window.open(url, /http/.test( url ) ? '_blank' : '_top' );
				
			} else if (typeof(url) == "string") {
				// go to the url
				//alert ("goto url: " + url);
				window.open(url, /http/.test( url ) ? '_blank' : '_top' );
			}
			
		}
		
	});
}