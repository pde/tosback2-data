/**
    @fileOverview This file contains functionality related to tGuard login
**/
var $ = jQuery;

jQuery(document).ready(function(){

	ATT.namespace("tlogin"); 
	
    ATT.tlogin.modalPaths = (window.location.pathname.match(/\/es\//)) ? {customerModalURL: "/shop/es/wireless/modals/shopmodals/jcr:content/mainpar/customertype.xhr.html?isLoginPage=true"} : {customerModalURL: "/shop/wireless/modals/shopmodals/jcr:content/mainpar/customertype_0.xhr.html?isLoginPage=true"};

    ATT.tlogin.LoginManager = ( new function () {   
        /**
         * Displays the customer intent modal. 
         * @function         
         */
        this.showCustomerModal = function () {
            jQuery.colorbox({
                href: ATT.tlogin.modalPaths.customerModalURL,
                overlayClose: false,
                escKey : false,
                iframe: false, scrolling: false, width: 705, height: 315, onComplete: modalUtils.init });
        }
        
       
        /** Check colam_ctn cookie for Remember Me flag  **/
        function findToken(cookie, key) {
            var tokenArr = cookie.split(";");
            for ( i = 0; i < tokenArr.length; i++ ) {
                if ( tokenArr[i].indexOf(key) > -1) {
                    var token = tokenArr[i].split("=");
                    return token;
                }   
            }
            return null;
        }

        this.cookieCheck = function () {
            var cookie = decodeURIComponent(ATT.util.getCookie("colam_ctn"));
            if ( cookie !== null && cookie !== "" ) {
                var rme = findToken(cookie, "rme");
                var uid = findToken(cookie, "uid");
				if ( rme !== null) {
					if ( rme[1] === 'Y' ) {
						var rme_uid = uid[1];
						$('#userid').val(rme_uid);
						$(".userInputNote").hide();	
						$('input#remMe').parent().attr('class', 'checked');
						$('input#remMe').val('Y');
					}
				}
            }
        }        
    
		/** Prepare to set Remember Me flag to Profile	**/
		$("input#remMe").click(function(){
			$(this).is(':checked')? $(this).val("Y"):$(this).val("N");		
		});  	
		
		 
		this.init = function () {
			/** User ID Bubble  **/  
			var container = jQuery("#userid-bubble-container");
			jQuery("#userid, .userInputNote").poshytip({
				content: container.html(),
				className: 'tip-white',
				alignTo: 'target',
				alignX: 'right',
				alignY: 'center',
				offsetX: 8,
				offsetY: -58,
				showOn: 'hover',
				allowTipHover: true,
				bgImageFrameSize: 6,
				backgroundGradient: '//www.att.com/images/global/tooltip/tip-white/backgroundwhite.gif',
				fade: false,
				slide: false
			});
			
			/** Placeholder Text Labels  **/  
			
			// Fixing overlapping by delaying due to the way Chrome loads saved value
			setTimeout(function(){ 
				//if ($('input:-webkit-autofill')) {
				   if ($("#userid").val() !== '' ) {
						$(".userInputNote").hide();
					}
					if ($("#password").val() !== '' ) {
						$(".passInputNote").hide();
					}
			   //} Chrome specific
			}
			, 500);
			
			$("#userid").focus(function(){
				$(".userInputNote").hide();
			})
			
			$("#password").focus(function(){
				$(".passInputNote").hide();
			})
				
			$(".userInputNote").click(function(){
				$(this).hide();
				$("#userid").focus();
			})
			
			$(".passInputNote").click(function(){
				$(this).hide();
				$("#password").focus();
			})
			
			$("#userid").blur(function(){
				if ( $(this).val() == '' && $(this).parents("div").prev('div.formErrorMessage').text() == '' ) { 
					$(".userInputNote").show();	
				}
			})

			$("#password").blur(function(){
				if ( $(this).val() == '' && $(this).parents("div").prev('div.formErrorMessage').text() == ''  ) { 
					$(".passInputNote").show();	
				}
			})
								
			/** CAP Lock  **/  
			function capsLock (e) {
				var s = String.fromCharCode ( e.which )
				if ( s.toUpperCase() === s && s.toLowerCase() !== s && !e.shiftKey ) {
					$('.capsLock').show();
				}else {
					$('.capsLock').hide();
				}
			}
			if ( $('.capsLock') != 0 ) {
				$('.capsLock').hide();
				$('#password').keypress(capsLock);
			}
		}	
		
            
        /**  jQuery validation plugin */
        this.validation = function () {
			var validationRules = {
				userid: {
					required: true,
					email: {
						depends: function(element) {
							return (jQuery("#userid").val().indexOf("@") > -1)
						}
					}
				},
				password: {
					required: true,
					minlength: 4
				}
			};
						
			function highlightError(element, errorClass){
				jQuery(element).closest("div").addClass(errorClass);
				jQuery(element).closest("div").prev("div").addClass(errorClass);
			}
			function unhighlightError(element, errorClass){
				jQuery(element).closest("div").removeClass(errorClass);
				jQuery(element).closest("div").prev("div").removeClass(errorClass);
			}
			function errorMessageHandler(messages, element){
				messages.appendTo(element.parents("div").prev('div.formErrorMessage'));
				element.next("div[class$=InputNote]").hide();
			}
			function invalidformHandler(form, validator){
			}
			function validformHandler(form){
				function cleanCTN(origStr){
					var tempStr = origStr.replace(/\(|\)|\.|\-|\s/g,''); 
					if ( tempStr !== '' && tempStr.length > 0) {
						if ( isNaN(tempStr)) {
							return origStr;
						} else {
							return tempStr;
						}
				}				
				}
				function removeSpecialChars(strTemp) { 
					return strTemp.replace(/[^0-9a-zA-Z_\.\-\@]/g,''); 
				}
				
				var userInput = jQuery("#userid").val();
				if ( userInput.length > 0 ) { 
					if ( userInput.match(/[0-9]/g).length == 10 ) {
						var cleanStr = cleanCTN(userInput);
						jQuery("#userid").val(removeSpecialChars(cleanStr));
					} else {
						jQuery("#userid").val(removeSpecialChars(userInput));
					}
				}
							
				var origURL = jQuery("#targetURL").val();
				var rmeflag = jQuery("#remMe").val();
				var rmeURL = origURL + '&rme=' + rmeflag;
				jQuery("#targetURL").val(rmeURL);
				// expire unneeded cookies
				var expireCookiesArr = $(form).data('expireCookiesList').split('|');
				for (var cookieIdx in expireCookiesArr) expireCookie(expireCookiesArr[cookieIdx]);
				form.submit();
			}
			
			jQuery("#tguardLoginForm").validate({
				rules: validationRules,
				messages: ATT.login.errorMessages,
				highlight: highlightError,
				unhighlight: unhighlightError,
				errorPlacement: errorMessageHandler,
				invalidHandler: invalidformHandler,
				submitHandler: validformHandler
				 
			});		
		
		}  

    })  
});




/** Method to expire a passed in cookie **/
 function expireCookie(name)                
	{
		var host = window.location.hostname;
		document.cookie = name +'=;expires=Thu, 01-Jan-1970 00:00:01 GMT;path=/;domain=.att.com';
		document.cookie = name +'=;expires=Thu, 01-Jan-1970 00:00:01 GMT;path=/;domain=www.att.com';
		document.cookie = name +'=;expires=Thu, 01-Jan-1970 00:00:01 GMT;path=/;domain=.www.att.com';
		document.cookie = name +'=;expires=Thu, 01-Jan-1970 00:00:01 GMT;path=/;domain='+window.location.hostname;
		document.cookie = name +'=;expires=Thu, 01-Jan-1970 00:00:01 GMT;path=/';
	}
