//Plugin model from: http://www.learningjquery.com/2007/10/a-plugin-development-pattern
//
// change defaults with this syntax
// $.fn.emailSubmitForm.defaults.option = 'value';
//
// or
//
// $('#element').emailSubmitForm({ option:'value'});

(function($) {
	// plugin definition
	$.fn.emailSubmitForm = function(options) {
		//$('body').append('<div id="trackDebug" style="position:fixed;font-size:10px; left:0; bottom:0; width:300px; background:#ccc;"></div>');
		// build main options before element iteration
		var opts = $.extend({}, $.fn.emailSubmitForm.defaults, options);
		// iterate and reformat each matched element
		return this.each(function() {
			$this = $(this);
			// build element specific options
			var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
			// call variables with this syntax  - o.option
			var division = o.division;
			var input = '.' + o.input.replace(/\./, '');
			var submit = '.' + o.submit.replace(/\./, '');
			var $thisSubmit = $this.children(submit+':first');
			var $thisInput = $this.children(input+':first');
			var emailURL = o.url.replace(/%%DIVISION%%/i, division);
			var emailOK = false;
			$this.addClass('out');
			$(this).addClass('highlight');
			


			function errorCheck(email, changeVal, debugMsg) {

				if(!$.fn.emailSubmitForm.checkEmail(email)) {
					if(email != o.success && email != o.original && email != o.error){
											
						$this.addClass('error');
					
						$thisInput.addClass('error').attr('email', email);
					
						if(changeVal){
							$thisInput.val(o.error);
							debug('print: '+ o.error, o.debug);
						} 
					}
					
					emailOK = false;
					debug(debugMsg + ' :: ' + email + ' :: '+ emailOK, o.debug);

				} else {
					
					$this.removeClass('error');
					$thisInput.removeClass('error').attr('email', email);
					
					if(changeVal && email === (o.success && o.original && o.error)){
						$thisInput.val('');
						debug('print: empty string', o.debug);
					}
					
					emailOK = true;
					debug(debugMsg + ' :: ' + email + ' :: '+ emailOK, o.debug);
				}

			
									
				return emailOK;								
				
			}
			function submitEmail(email) {
				
				var thisEmailURL = emailURL.replace(/%%EMAILADDRESS%%/i, email);
				var iframe = '<iframe style="width:1px; height:1px; position:absolute; left:0; bottom:0; overflow:hidden;" src="'+thisEmailURL+'"  border="0" width="1" height="1" />';
				
				$('body').append(iframe);
				debug(email + ' submitted', o.debug);

				$this.removeClass('error').addClass('completed');
				$thisInput.attr('email', '').val(o.success).blur();
				debug('print: '+o.success, o.debug);
			};	
			
			var resetForm = null;
			
			
			$thisSubmit.click(function(){
				var emailAddress = $thisInput.val();			
				errorCheck(emailAddress, true, 'Submit clicked')
				if(emailOK && emailAddress != (o.success && o.error && o.original)) {
					submitEmail(emailAddress);
				} 
				return false;
			});
			
			$thisInput.val(o.original).focus(function(){
				$this.removeClass('out');
				if($(this).val() != (o.success && o.error && o.original)) {
					$(this).val($(this).attr('email'));
					debug('Enter field with email: '+$(this).attr('email'), o.debug);
				} else {
					$(this).val('');
					debug('Entered without email.', o.debug);
				}
				clearTimeout(resetForm);
			}).blur(function(){
				var ctrlVal = $(this).val();
				
				errorCheck(ctrlVal, true, 'Exit field.');
								
				resetForm = setTimeout(function(){
					$thisInput.val(o.original);
					debug(o.timeout/1000 +' Seconds have passed, reset form.', o.debug);
				}, o.timeout);		
				
				$this.addClass('out');
				$(this).removeClass('highlight');
				
			}).bind('keypress', function(e){
				var code = (e.keyCode ? e.keyCode : e.which);
				var ctrlVal = $(this).val();
				errorCheck(ctrlVal, false, 'keypress');
				
				if(code == 13){
					errorCheck(ctrlVal, true, 'Enter key.')
					if(emailOK && ctrlVal != (o.success && o.error && o.original)){
						submitEmail(ctrlVal);
					} else {
						$(this).blur()
					}
					return false;
				}
				
			});
			
			
			
		});
	
	};
	// private function example (debug function)
	function debug(msg, debug) {
		if (window.console && window.console.log && debug) {
			window.console.log(msg);
		} 
	};


	
	
	// public function example
	//$.fn.emailSubmitForm.format = function(txt) {
	//
	// public function example called
	//markup = $.fn.emailSubmitForm.format();
	//
	$.fn.emailSubmitForm.checkEmail = function(email_val) {
		var filter=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		return filter.test(email_val);
		//return email_val;
	}
	
	// plugin defaults
	$.fn.emailSubmitForm.defaults = {
  	  original: 'Email Address',
  	   timeout: 30000,
  	   success: 'Thanks for signing up!',
   	     error: 'Invalid Email',
		 input: 'emailInput',
		submit: 'emailSubmit',
      division: 'Shoes.com',
		   url: 'http://brownshoe.p0.com/realtimepost.jsp?email=%%EMAILADDRESS%%&division=%%DIVISION%%&source=email_signup&welcome=1&remove=0',
  	     debug: false
	};

})(jQuery);