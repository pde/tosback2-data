jQuery(function(){

// !Extend jQuery to Include Delay Function
jQuery.fn.extend({
    delay: function(time,type){
        time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
        type = type || "fx";
 
        return this.queue( type, function() {
            var elem = this;
            setTimeout(function() {
                jQuery.dequeue( elem, type );
            }, time );
        });
    }
});

// !jQuery Document OnLoad Functions
jQuery('document').ready(function(){
		
		// !Establish Customer Name, Status & Change Header Greeting
		var is_customer = getCookie("custFirstName"), logged_in = getCookie("CSITO");
		if(is_customer){
			jQuery(".rep_customer_name").html(is_customer);
			s.prop10 = "Logged In";
			s.eVar14 = "Logged In";
		}else{
			s.prop10 = "Not Logged In";			
			s.eVar14 = "Not Logged In";			
		}
		
		// Check Idle Timeout Cookie Every 2 Seconds
		window.idle_popup=false;
		var check_timeout = window.setInterval(function(){
		
			if( (getCookie("CSITO")) || (getCookie("CSITO-S")) )
			{
				window.use_secure = jQuery("body").attr("id");
				window.current_time = Math.round(new Date().getTime()/1000.0);
		
				if(window.use_secure == "use_secure"){
					window.expire_time = getCookie("CSITO-S");
				}else{
					window.expire_time = getCookie("CSITO");
				}
				
				if(window.expire_time)
					window.time_interval = window.expire_time - window.current_time;
				else
					window.time_interval = 0;
						
				if(window.expire_time) {
					/* Alert User to Idleness */
					if(window.time_interval<=130){
						if(window.idle_popup==false){
						jQuery("#idle-alert-popup-link").fancybox({'autoDimensions':false,'showCloseButton':false,'height':'220'});
						jQuery("#idle-alert-popup-link").trigger('click');
						window.idle_popup=true;
						}
					}
					
					/* Destroy Session & Log Out */
					if((window.time_interval<=10) && (window.idle_popup==true)){
						window.time_interval = window.expire_time - window.current_time;
						jQuery("#session-timeout-form").submit();
						jQuery.fancybox.close;
					}
				}
			}
		},2000)
		
		// !STARTUP FUNCTIONS
		
		// Show Appropriate Header Information
		if(logged_in){
			jQuery('#login-register').hide();
			jQuery('#account-nav').show();
		}else{
			jQuery('#account-nav').hide();
			jQuery('#login-register').show();
		}
		
		// If Register Form Exists, Perform Registration Functions
		if(jQuery('#register-form-form')){
				jQuery("#continue-shopping-link").attr('href',document.referrer);
				jQuery("#next-steps-popup-link").fancybox({'autoDimensions':true,'showCloseButton':false});
				
				// Based on Customer Location, Make Zip Code Required or Optional
				jQuery("#international").click(function(e){
					
					jQuery("#zip_p").toggle("display");
					
					if(jQuery("#international").is(":checked")){
						jQuery("#register-zip").attr("class","validate[integer,min[5]]");			
					}else{
						jQuery("#register-zip").attr("class","validate[required,integer,min[5]]");			
					}
				});
				
				// !Register Password Live
				jQuery('#register-password').keyup(function(){
					var entered_password = jQuery('#register-password').val();
					var proper_length = false;
					var proper_groups = 0;
					
					/* !Does Match 8 Characters? */
					if(entered_password.length > 7){
						proper_length = true;
					}
					
					/* !Contains an Uppercase Character */
					if ( entered_password.match(/[A-Z]/) ) {
						proper_groups++;
					}
					
					/* !Contains a Lowercase Character */
					if ( entered_password.match(/[a-z]/) ) {
						proper_groups++;
					}
					
					/* !Contains a Number */
					if ( entered_password.match(/\d{1}/) ) {
						proper_groups++;
					}
					
					/* !Contains a Symbol */
					if ( entered_password.match(/([\!\@\#\$\%\^\&\*_\-]+)/) )  {
						proper_groups++;
					}
					
					if(proper_length && proper_groups > 2){
						jQuery('.password-text').css('color','#00573c');
					}else{
						jQuery('.password-text').css('color','#c63c24');
					}
					
				})

				// !Register Submit Function
				jQuery('#register-submit').click(function(e){
					e.preventDefault();
					jQuery("#register-form-notify").html("");
					var checkData = jQuery("#register-form-form").validationEngine('validate');
					var message;
					if(checkData){
					
						var firstname = jQuery("#register-form-form input[name='firstname']").val();
						var lastname = jQuery("#register-form-form input[name='lastname']").val();
						var email = jQuery("#register-form-form input[name='email']").val();
						var confirm_email = jQuery("#register-form-form input[name='confirm_email']").val();
						var password = jQuery("#register-form-form input[name='password']").val();
						var confirm_password = jQuery("#register-form-form input[name='confirm_password']").val();
						var zip_code = jQuery("#register-form-form input[name='zip_code']").val();
						var question_1 = jQuery("#register-form-form select[name='question_1']").val();
						var question_2 = jQuery("#register-form-form select[name='question_2']").val();
						var answer_1 = jQuery("#register-form-form input[name='answer_1']").val();
						var answer_2 = jQuery("#register-form-form input[name='answer_2']").val();
						var from_checkout = jQuery("#register-form-form input[name='from_checkout']").val();
						var join_email = jQuery("#join_email:checked").val();
						var non_us_can = (typeof jQuery("#international:checked").val() === 'undefined')?'':jQuery("#international:checked").val();
						var formData = 'r=registerAccount&firstname='+firstname+'&lastname='+lastname+'&email='+email+'&confirm_email='+confirm_email+'&password='+escape(password)+'&confirm_password='+escape(confirm_password)+'&zip_code='+zip_code+'&question_1='+question_1+'&question_2='+question_2+'&answer_1='+answer_1+'&answer_2='+answer_2+'&join_email='+join_email+'&non_us_can='+non_us_can;
						var loginData = 'r=logInXMLService&email='+email+'&password='+escape(password);
						jQuery.ajax({
							type: "POST",
							url: window.cgi_account_url,
							data: formData,
							datatype:'xml',
							success: function(response){
								// Process XML Response
								jQuery("#register-form-notify").html("");
								var result = jQuery(response).find("result").text();
								
								var errorText = "<span>";
								var text;
								
								
								// If Errors Returned in Response
								if(jQuery(response).find("errors").length){
									jQuery(response).find("error").each(function(){
										text = jQuery(this).attr('text');
										errorText = errorText + "<p>"+text+"</p>";
									});
									
									errorText=errorText+"</span>";
									jQuery("#register-form-notify").css("background","#C63C24");
									jQuery("#register-form-notify").append(errorText);
									jQuery('body,html').animate({scrollTop: 0}, 500);
									
								}else{
								
									// If Registration Successful
									
									// Record in Omniture
									s.events = "Registration Success";
									s.eVar14 = "Logged In";
									
									// AJAX Login
									jQuery.ajax({
										type: "POST",
										url: window.cgi_account_url,
										data: loginData,
										datatype:'xml',
										success: function(response){
											jQuery("#register-form-notify").css("background","#00573C");
											jQuery("#register-form-notify").append("Thanks for registering!");
											
											if(from_checkout==1){
												jQuery('#register-goto-checkout').submit();
											}else{
												jQuery('#next-steps-popup-link').trigger('click');
											}
										}})
								}
								jQuery("#register-form-notify").fadeIn(200);
							}
						});
					}else{
						message = "Please correct the fields below."
					}
					
					return true;
					
				});
		}
		
		// Attach Validation Engine to Customer Forms
		if(jQuery('#login-form-form'))
			jQuery('#login-form-form').validationEngine('attach');
		
		// !Session Renewal Code
		jQuery('#renew-session-link').click(function(){
			var current_time = Math.round(new Date().getTime()/1000.0);
			var secureFlag = getCookie("CSITO-S");
			var date = new Date();
			
			if(secureFlag){
				date.setTime(date.getTime()+(5*60*1000));
				var cookie_value = Math.round(date.getTime()/1000.0);
				setCookie("CSITO-S",cookie_value,0,domain,0,5,"","");
				date.setTime(date.getTime()+(30*60*1000));
				var cookie_value = date/1000;
				setCookie("CSITO",cookie_value,0,domain,0,30,"","");
			}else{
				date.setTime(date.getTime()+(30*60*1000));
				var cookie_value = Math.round(date.getTime()/1000.0);
				setCookie("CSITO",cookie_value,0,domain,0,30,"","");
			}
			
			jQuery.fancybox.close;
		});
		
		if(is_customer){
			jQuery('#greeting').css('display','block');
		}else{
			jQuery('#greeting').css('display','none');
		}
		
		// !Open Modal Box
		jQuery('[rel^=modal]').live('click',function(e){
			e.preventDefault();
			
			var href = jQuery(this).attr('href');
			if(href.indexOf("#")>0){
				var id = href.substr(href.indexOf("#"));
			}else{
				var id = href;
			}
			
			if(id == "#add-address-form")
				resetAddAddressForm();
			
			var content = jQuery(id);
			var c_width = jQuery(id).width();
			var c_height = jQuery(id).height();
			
			//my account home - hide notification box
			jQuery("#edit-email-notify").hide();
			jQuery("#edit-name-notify").hide();
			jQuery("#edit-password-notify").hide();
			jQuery("#edit-address-notify").hide();
			jQuery("#add-address-notify").hide();
			
			jQuery.fancybox({
				'autoSize'	: true,
				'fitToView'			: false,
				'type'				: 'inline',
				'scrolling'			: 'auto',
				'content'			: content
			});
		});
		
		// !Header Forgot Password
		jQuery('#header-forgot-password').click(function(){
			var myaHdrEm = jQuery("#header-login-email").val();
			jQuery("#header-forgot-pass-email").attr("value",myaHdrEm)
			jQuery("#dropdown-forgot-pass-form").submit();
		});
		
		// !Login Form Forgot Password
		jQuery('#login-forgot-password').click(function(){
			jQuery('#login-form-form').validationEngine('detach');
			var myaLogInEm = jQuery("#login-email").val();
			jQuery("#login-forgot-pass-email").attr("value",myaLogInEm)
			jQuery("#login-forgot-pass-form").submit();
		});
		
		// !Hide International
		jQuery('.hide-intl').click(function(){
			jQuery('#add-international-span').hide();
			jQuery('#edit-international-span').hide();
		});
		
		// !Show International
		jQuery('.show-intl').click(function(){
			jQuery('#add-international-span').show();
			jQuery('#edit-international-span').show();
		});
		
		// !Slide-Down Sign-In Dropdown
		jQuery('#login-button').click(
			function(){
				jQuery('#sign-in-dropdown').css('display','block').animate({opacity:'1'},250,function(){jQuery('#sign-in-dropdown')});
			}
		);
		
		// !Keep Dropdown Open During Hover
		jQuery('#sign-in-dropdown').hover(
			function(){
				jQuery('#sign-in-dropdown').css('display','block').animate({opacity:'1'},750,function(){jQuery('#sign-in-dropdown')});
			},
			function(){}
		);
		
		// !Close Sign-In On Close Click
		jQuery('#login-close').click(function(){
			jQuery('#sign-in-dropdown').css('display','none').animate({opacity:'0'},250,function(){jQuery('#sign-in-dropdown')});
		})
		
		// !Goodbye User Function
		jQuery('#goodbye-user').click(function(e){
			e.preventDefault();
			jQuery('#login-register').show();
			jQuery('#account-nav').hide();
			jQuery('#greeting').css('display','none');
			jQuery('img[src="images/content.gif"]').css('display','block');
		});
		
		// !Header Text Click
		jQuery('#header-text').click(function(e){
			jQuery('#my-account-left-nav ul.open').animate({opacity:'0',height:'toggle'},400).css('display','none').removeClass('open');
			jQuery('#my-account-left-nav ul li').removeClass('open');
			jQuery('#my-account-dashboard').siblings().hide();
			jQuery('#my-account-dashboard').show();
		});
		
		// !Hash Navigation
		jQuery(window).hashchange(function(e){
			e.preventDefault()
			if(location.hash!="#registerPopup"){
				var panel_to_show = jQuery(location.hash);
				panel_to_show.siblings('.panel').hide();
				panel_to_show.show();
				panel_to_show.find("div").show();
				jQuery('#my-account-left-nav ul li > a[href="'+location.hash+'"]').parent('li').click();
			}else{
				jQuery("#hidden-register-link").trigger('click');
			}
			return false;
		});
		jQuery(window).hashchange();
});
});


