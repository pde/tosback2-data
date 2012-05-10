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
		if(is_customer)
			jQuery(".rep_customer_name").replaceWith(is_customer);

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
		
		if(jQuery('#name-form-form'))
		jQuery('#name-form-form').validationEngine('attach',{relative:true});
		
		if(jQuery('#email-form-form'))
		jQuery('#email-form-form').validationEngine('attach',{relative:true});
		
		if(jQuery('#edit-address-form-form'))
		jQuery('#edit-address-form-form').validationEngine('attach',{relative:true});
		
		if(jQuery('#add-address-form-form'))
		jQuery('#add-address-form-form').validationEngine('attach',{relative:true});
		
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
			
		if(jQuery("body").hasClass("getInfo")){
			// Get Account Info
			jQuery.ajax({
						type: "POST",
						url: window.cgi_account_url,
						data: "r=getAccountInfo",
						datatype:'xml',
						success: function(response){
							var accountList = jQuery(response).find("accountInfo");
							var first_name = jQuery(accountList).find('firstName').text();
							var last_name = jQuery(accountList).find('lastName').text();
							var email_address = jQuery(accountList).find('emailAddress').text();
							jQuery('.account-first-name').empty().append(first_name);
							jQuery('.account-last-name').empty().append(last_name);
							jQuery('.account-email-address').empty().append(email_address);
			}});
	
			// !Get Billing Addresses
			jQuery.ajax({
						type: "POST",
						url: window.cgi_account_url,
						data: "r=getBillingAddresses",
						datatype:'xml',
						success: function(response){
							var addressList = jQuery(response).find("address");
							var dbTotal = '<h5 class="address-category">Billing Addresses</h5>';
							var abTotal = '<h4 id="billing">Billing Addresses</h4>';
							var addressCount = 0;
							for(var i=0,n=addressList.length;i<n;i++){
								var ca = jQuery(addressList[i]);
								block='';
								address_id = ca.attr("addrID");
								address_type = ca.attr("addrType");
								address_subtype = ca.attr("addrSubType");
								address_default = ca.attr("isDefault");
								address_title = ca.find("addressName").text();
								first_name = ca.find("firstName").text();
								last_name = ca.find("lastName").text();
								company_name = ca.find("companyName").text();
								address_one = ca.find("street1").text();
								address_two = ca.find("street2").text();
								address_city = ca.find("city").text();
								address_state = ca.find("state").text();
								address_zip = ca.find("zipCode").text();
								address_country = ca.find("country").text();
								address_phone = ca.find("phone").text();
								address_ext = ca.find("phoneExt").text();
								block = '<div class="block' 
								
								if(address_default==1)
									block = block + ' default-address" data-address-default="1';
								else
									block = block + '" data-address-default="0';
									
								block = block+ '" data-address-id="'+address_id+'" data-address-type="'+address_type+'" data-address-subtype="'+address_subtype+'"><h5 class="address-title">' + address_title + '</h5>';
								
								block = block + '<span class="address-first">' + first_name + '</span> <span class="address-last">'+last_name+'</span><br/>';							
								
								if(company_name)
									block = block + '<span class="address-company">' + company_name + '</span><br/>';
																
								block = block + '<span class="address-one">' + address_one + '</span><br/>';							
	
								if(address_two)
									block = block + '<span class="address-two">' + address_two + '</span><br/>';
								
								block = block + '<span class="address-city">' + address_city + '</span>, <span class="address-state">' + address_state + '</span> <span class="address-zip">' + address_zip + '</span><br>';
								
								if(address_country=="United States")
									block = block;
								else
									block= block + '<span class="address-country">' + address_country + '</span><br>';
									
								if(address_ext)
									block = block + '<span class="address-phone">' + address_phone + '</span> <span class="address-ext">'+address_ext+'</span>';
								else
									block = block + '<span class="address-phone">' + address_phone + '</span>';
									
								block = block+ '<br><a href="#edit-address-form" class="address-edit-link" rel="modal-address" data-target="#edit-address-form">Edit</a>';
	
								if(address_default==0)
									block = block + ' <span class="dim-pipe"></span><a class="address-default-link" style="cursor:pointer;">Make Default</a>'
									
								block = block+' <span class="dim-pipe"></span><a class="address-delete-link" style="cursor:pointer;">Delete</a></div>';
								dbTotal = dbTotal+block;
								abTotal = abTotal+block;
								addressCount++;
								if(addressCount==3){
									dbTotal = dbTotal+"<hr>";
									abTotal = abTotal+"<hr>";
									addressCount=0;
								}		
								
							};
		
							jQuery('.billing-addresses').html(dbTotal);
							jQuery('#address-book-billing').html(abTotal);
							jQuery('.block .address-delete-link').confirm({
								msg:'Delete?',
								wrapper: '<span class="delete-wrapper"></span>',
								buttons: {wrapper:'<a class="delete-option"></a>'}
							});
						}
					});
			
			// Get Shipping Addresses
			jQuery.ajax({
						type: "POST",
						url: window.cgi_account_url,
						data: "r=getShippingAddresses",
						datatype:'xml',
						success: function(response){
							addressList = jQuery(response).find("address");
							dbTotal = '<h5 class="address-category">Shipping Addresses</h5>';
							abTotal = '<h4 id="Shipping">Shipping Addresses</h4>';
							addressCount=0;
							for(var i=0,n=addressList.length;i<n;i++){
								var ca = jQuery(addressList[i]);
								block='';
								address_id = ca.attr("addrID");
								address_type = ca.attr("addrType");
								address_subtype = ca.attr("addrSubType");
								address_default = ca.attr("isDefault");
								address_title = ca.find("addressName").text();
								first_name = ca.find("firstName").text();
								last_name = ca.find("lastName").text();
								company_name = ca.find("companyName").text();
								address_one = ca.find("street1").text();
								address_two = ca.find("street2").text();
								address_city = ca.find("city").text();
								address_state = ca.find("state").text();
								address_zip = ca.find("zipCode").text();
								address_country = ca.find("country").text();
								address_phone = ca.find("phone").text();
								address_ext = ca.find("phoneExt").text();
								block = '<div class="block' 
								
								if(address_default==1)
									block = block + ' default-address" data-address-default="1';
								else
									block = block + '" data-address-default="0';
									
								block = block+ '" data-address-id="'+address_id+'" data-address-type="'+address_type+'" data-address-subtype="'+address_subtype+'"><h5 class="address-title">' + address_title + '</h5>';
								
								block = block + '<span class="address-first">' + first_name + '</span> <span class="address-last">'+last_name+'</span><br/>';							
								
								if(company_name)
									block = block + '<span class="address-company">' + company_name + '</span><br/>';
								
								block = block + '<span class="address-one">' + address_one + '</span><br/>';						
	
								if(address_two)
									block = block + '<span class="address-two">' + address_two + '</span><br/>';
								
								block = block + '<span class="address-city">' + address_city + '</span>, <span class="address-state">' + address_state + '</span> <span class="address-zip">' + address_zip + '</span><br>';
								
								if(address_country=="United States")
									block = block;
								else
									block= block + '<span class="address-country">' + address_country + '</span><br>';
									
								if(address_ext)
																block = block + '<span class="address-phone">' + address_phone + '</span> <span class="address-ext">'+address_ext+'</span>';
								else
									block = block + '<span class="address-phone">' + address_phone + '</span>';
									
								block = block+ '<br><a href="#edit-address-form" class="address-edit-link" rel="modal-address" data-target="#edit-address-form">Edit</a>';
	
								if(address_default==0)
									block = block + ' <span class="dim-pipe"></span><a class="address-default-link" style="cursor:pointer;">Make Default</a>'
									
								block = block+' <span class="dim-pipe"></span><a class="address-delete-link" style="cursor:pointer;">Delete</a></div>';
								
								dbTotal = dbTotal+block;
								abTotal = abTotal+block;
								addressCount++;
								if(addressCount==3){
									dbTotal = dbTotal+"<hr>";
									abTotal = abTotal+"<hr>";
									addressCount=0;
								}		
								
							};
		
							jQuery('.shipping-addresses').html(dbTotal);
							jQuery('#address-book-shipping').html(abTotal);
						}
					});
		}
		
		if(is_customer){
			jQuery('#greeting').css('display','block');
		}else{
			jQuery('#greeting').css('display','none');
		}
		
		// !Slide-down Account Left Nav
		jQuery.each(jQuery('#my-account-left-nav ul li ul'),function(){
			if(jQuery(this).hasClass('open')){
				jQuery(this).animate({opacity:'1'},400)
					.css('display','block');
			}else{
				jQuery(this).animate({opacity:'0',height:'toggle'},400)
					.css('display','block');
			}
		});
		
		// !Open Panel if Top Menu Item Clicked Twice
		if(jQuery('#my-account-left-nav ul li.open').length){
			var openPanel = jQuery(jQuery('#my-account-left-nav ul li.open a').attr('href'));
			openPanel.siblings().hide();
			openPanel.show();
			openPanel.children().show();
		}else{
			jQuery("#my-account-dashboard").siblings().hide();
			jQuery("#my-account-dashboard").show();
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
			var content = jQuery(id);
			var c_width = jQuery(id).width();
			var c_height = jQuery(id).height();
			
			jQuery.fancybox({
				'autoDimensions'	: true,
				'fitToView'			: false,
				'type'				: 'inline',
				'scrolling'			: 'visible',
				'content'			: content				
			});
		});
		
		// !Address Delete Function
		jQuery('a.address-delete-link').live('click',function deleteAddress(){
			var addressID = jQuery(this).parent(".block").attr("data-address-id");
			var addressType = jQuery(this).parent(".block").attr("data-address-type");
			jQuery.ajax({
					type: "POST",
					url: window.cgi_account_url,
					data: "r=deleteAddress&address_id="+addressID+"&address_type="+addressType,
					datatype:'xml',
					success:function(){window.location.reload();}
			});
		});
	
		// !Address Default Function
		jQuery('a.address-default-link').live('click',function defaultAddress(){
			var addressID = jQuery(this).parent(".block").attr("data-address-id");
			var addressType = jQuery(this).parent(".block").attr("data-address-type");
			jQuery.ajax({
					type: "POST",
					url: window.cgi_account_url,
					data: "r=updateDefaultAddress&address_id="+addressID+"&address_type="+addressType,
					datatype:'xml',
					success:function(){window.location.reload();}
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
		
		// !Edit Shipping Addresses
		jQuery('#shipping-address-nav-link').click(function(){
			jQuery('#add-address-shipping').click();
			jQuery('#edit-address-shipping').click();
		});
		
		// !Edit Billing Addresses
		jQuery('#billing-address-nav-link').click(function(){
			jQuery('#add-address-billing').click();
			jQuery('#edit-address-billing').click();
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
		
		// !Edit Address Pre-Population
		jQuery('a.address-edit-link','.saved-addresses').live('click',function(e){
		
			jQuery('input#edit-address-id').val(jQuery(this).parent('.block').attr("data-address-id"));
			
			//Set Proper SubType
			var subType = jQuery(this).parent('.block').attr("data-address-subtype");
			if(subType=="US")
				jQuery('#edit-address-us').click();
			else if(subType=="MILITARY")
				jQuery('#edit-address-mil').click();
			else if(subType=="INTL")
				jQuery('#edit-address-intl').click();

			//Set Proper Type
			var type = jQuery(this).parent('.block').attr("data-address-type");
			if(type=="B")
				jQuery('#edit-address-billing').click();
			else if(type=="S")
				jQuery('#edit-address-shipping').click();
				
			//Set Default
			var isDefault = jQuery(this).parent('.block').attr("data-address-default");
			if(isDefault=="1")
				jQuery('#edit-address-default').click();
			else if(isDefault=="0")
				jQuery('#edit-address-notdefault').click();
				
			jQuery('#edit-address-title').val(jQuery(this).siblings('h5.address-title').html());
			jQuery('#edit-address-first').val(jQuery(this).siblings('span.address-first').html());
			jQuery('#edit-address-last').val(jQuery(this).siblings('span.address-last').html());
			jQuery('#edit-address-company').val(jQuery(this).siblings('span.address-company').html());
			jQuery('#edit-address-one').val(jQuery(this).siblings('span.address-one').html());
			jQuery('#edit-address-two').val(jQuery(this).siblings('span.address-two').html());
			jQuery('#edit-address-city').val(jQuery(this).siblings('span.address-city').html());
			jQuery('#edit-address-zip').val(jQuery(this).siblings('span.address-zip').html());
			jQuery('#edit-address-phone').val(jQuery(this).siblings('span.address-phone').text());
			jQuery('#edit-address-ext').val(jQuery(this).siblings('span.address-ext').text());
			
			if(jQuery(this).siblings('span.address-state').html().length>0)
				jQuery('#edit-address-state').val(jQuery(this).siblings('span.address-state').html());
			else
				jQuery('#edit-address-state')[0].selectedIndex = 0;
			
			if(jQuery(this).siblings('span.address-country').html().length>0)
				jQuery('#edit-address-country').val(jQuery(this).siblings('span.address-country').html());
			else
				jQuery('#edit-address-country').val("United States");
		});
				
		// !Slide-Down Sign-In Dropdown
		jQuery('#login-button').click(
			function(){
				jQuery('#sign-in-dropdown').css('display','block')
					.animate({opacity:'1'},250,function(){jQuery('#sign-in-dropdown')
				});
			}
		);
		
		// !Keep Dropdown Open During Hover
		jQuery('#sign-in-dropdown').hover(
			function(){
				jQuery('#sign-in-dropdown').css('display','block')
					.animate({opacity:'1'},750,function(){jQuery('#sign-in-dropdown')
				});
			},
			function(){
				jQuery('#sign-in-dropdown').delay(8000)
				.css('display','none')
				.animate({opacity:'1'},850,function(){jQuery('#sign-in-dropdown')
				.delay(10000)
				.animate({opacity:'0'},800,function(){jQuery('#sign-in-dropdown').css('display','none');});});
			}
		);
						
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
		
			jQuery('#my-account-left-nav ul.open').animate({opacity:'0',height:'toggle'},400)
				.css('display','none')
				.removeClass('open');
			jQuery('#my-account-left-nav ul li').removeClass('open');
			jQuery('#my-account-dashboard').siblings().hide();
			jQuery('#my-account-dashboard').show();
				
		});
		
		// !Left Nav List Item Click
		jQuery('#my-account-left-nav ul li').click(
			function(e){
				if(!jQuery(this).hasClass('open')){
					e.preventDefault();
					if(jQuery(this).children('ul').hasClass('open')){
						jQuery(this).children('ul.open').animate({opacity:'0',height:'toggle'},400)
							.css('display','none');
						jQuery(this).children('ul').removeClass('open');
						jQuery(this).removeClass('open');
					}else{
						jQuery('#my-account-left-nav ul.open').animate({opacity:'0',height:'toggle'},400)
							.css('display','none')
							.removeClass('open');
						jQuery(this).children('ul').animate({opacity:'1',height:'toggle'},400)
							.css('display','block')
							.addClass('open');
						jQuery(this).addClass('open');
						jQuery(this).siblings('li').removeClass('open');
					}
				}else{
					jQuery(this).children('ul.open').animate({opacity:'0',height:'toggle'},400)
							.css('display','none');
						jQuery(this).children('ul').removeClass('open');
						jQuery(this).removeClass('open');
	
				}
			});
			
		// !Left Nav Link Click	
		jQuery('#my-account-left-nav ul li > a').click(function(e){
	
			if(!jQuery(this).parent().hasClass('open')){
					e.preventDefault();
					if(!jQuery(this).siblings('ul').hasClass('open')){
						jQuery(this).siblings('ul.open').animate({opacity:'0',height:'toggle'},400)
							.css('display','none');
						jQuery(this).siblings('ul').removeClass('open');
						jQuery(this).parent().removeClass('open');
					}else{
						jQuery('#my-account-left-nav ul.open').animate({opacity:'0',height:'toggle'},400)
							.css('display','none')
							.removeClass('open');
						jQuery(this).siblings('ul').animate({opacity:'1',height:'toggle'},400)
							.css('display','block')
							.addClass('open');
						jQuery(this).parent().siblings('li').removeClass('open');
						jQuery(this).parent().addClass('open');
	
					}
				}else{
					e.preventDefault();
					var panel_to_show = jQuery(jQuery(this).attr('href'));
					panel_to_show.siblings('.panel').hide();
					panel_to_show.show();
					panel_to_show.find("div").show();
					jQuery(this).parent('li').addClass('open');
					jQuery(this).parent().siblings('li').removeClass('open');
					jQuery(this).siblings('ul').addClass('open');
					jQuery(this).parent().siblings('li').removeClass('open');
					e.stopImmediatePropagation();
				}
		
		});
		
		// !Left Nav Sub-Menu Click
		jQuery('li.nav-submenu-link','#my-account-left-nav').click(function(e){
			e.preventDefault();
			var panel_to_show = jQuery(jQuery(this).attr('data-target'));
			panel_to_show.parents(".panel").siblings(".panel").hide();
			panel_to_show.parents(".panel").show();
			panel_to_show.show();
			panel_to_show.siblings(".sub-panel").hide();
			panel_to_show.siblings("h4").show();
			return false;
		});
		
		// !Edit Name Form Submission
		jQuery('#name-form-submit').click(function(e){
			e.preventDefault();
			jQuery("#edit-name-notify").fadeOut(200);
			var firstname = jQuery("#edit-firstname").val();
			var lastname = jQuery("#edit-lastname").val();
			var editData = "r=editYourName&firstname="+firstname+"&lastname="+lastname;
			jQuery.ajax({
					type: "POST",
					url: window.cgi_account_url,
					data: editData,
					datatype:'xml',
					success:function(response){
					result = jQuery(response).find("result").text();
					if(result=="Success"){
						setCookie("custFirstName",firstname,10000,".gandermountain.com",0,0,"","");	
						window.location.reload();
					}else{
						if(jQuery(response).find("errors").length){
								var errorText = "<span>";
								jQuery(response).find("error").each(function(){
								text = jQuery(this).attr('text');
								errorText = errorText + "<p>"+text+"</p>";
							});
							
							errorText=errorText+"</span>";
							
							jQuery("#edit-name-notify").html(errorText);
							jQuery("#edit-name-notify").fadeIn(200);
					}}}
			});
		})
		
		// !Edit E-Mail Form Submission
		jQuery('#email-form-submit').click(function(e){
			e.preventDefault();
			jQuery("#edit-email-notify").fadeIn(200);
			var email = jQuery("#edit-email").val();
			var confirm_email = jQuery("#edit-confirm-email").val();
			var editData = "r=editEmailAddress&email="+email+"&confirm_email="+confirm_email;
			jQuery.ajax({
					type: "POST",
					url: window.cgi_account_url,
					data: editData,
					datatype:'xml',
					success:function(response){
						result = jQuery(response).find("result").text();
						if(result=="Success"){
							window.location.reload();
						}else{
							if(jQuery(response).find("errors").length){
								var errorText = "<span>";
								jQuery(response).find("error").each(function(){
								text = jQuery(this).attr('text');
								errorText = errorText + "<p>"+text+"</p>";
							});
							
							errorText=errorText+"</span>";
							
							jQuery("#edit-email-notify").html(errorText);
							jQuery("#edit-email-notify").fadeIn(200);
					}}}
				});
		})
		
		// !Edit Password Form Submission
		jQuery('#password-form-submit').click(function(e){
			e.preventDefault();
			jQuery("#edit-password-notify").fadeOut(200);
			var password = jQuery("#edit-password").val();
			var confirm_password = jQuery("#edit-confirm-password").val();
			var existing_pass = jQuery("#edit-existing-password").val();
			var editData = "r=editPasswd&password="+escape(password)+"&confirm_password="+escape(confirm_password)+"&existing_password="+escape(existing_pass);
			jQuery.ajax({
					type: "POST",
					url: window.cgi_account_url,
					data: editData,
					datatype:'xml',
					success:function(response){
						result = jQuery(response).find("result").text();
						if(result=="Success"){
							window.location.reload();
						}else{
							if(jQuery(response).find("errors").length){
								var errorText = "<span>";
								jQuery(response).find("error").each(function(){
								text = jQuery(this).attr('text');
								errorText = errorText + "<p>"+text+"</p>";
							});
							
							errorText=errorText+"</span>";
							
							jQuery("#edit-password-notify").html(errorText);
							jQuery("#edit-password-notify").fadeIn(200);
					}}}
				});
		})
		
		// !Add Address Form Submission
		jQuery('#add-address-form-submit').click(function(e){
			e.preventDefault();
			jQuery("#add-address-notify").fadeOut(200);
			jQuery("#add-address-notify").html("");
			var address_type = jQuery("input:radio[name=add_address_type]:checked").val();
			var address_subtype = jQuery("input:radio[name=add_address_subtype]:checked").val();
			var address_default = jQuery("input:radio[name=add_address_default]:checked").val();
			var firstname = jQuery("#add-address-first").val();
			var lastname= jQuery("#add-address-last").val();
			var address_label = jQuery("#add-address-title").val();
			var company_name = jQuery("#add-address-company").val();
			var address1 = jQuery("#add-address-one").val();
			var address2 = jQuery("#add-address-two").val();
			var city = jQuery("#add-address-city").val();
			var state = jQuery("#add-address-state").val();
			var zip_code = jQuery("#add-address-zip").val();
			var country = jQuery("#add-address-country").val();
			var phone = jQuery("#add-address-phone").val();
			var extension = jQuery("#add-address-ext").val();
			var addData = "r=addNewAddress&address_type="+address_type+"&address_subtype="+address_subtype+"&address_default="+address_default+"&address_label="+address_label+"&firstname="+firstname+"&lastname="+lastname+"&company_name="+company_name+"&address1="+address1+"&address2="+address2+"&city="+city+"&state="+state+"&country="+country+"&zip_code="+zip_code+"&phone="+phone+"&extension="+extension;
		
			jQuery.ajax({
					type: "POST",
					url: window.cgi_account_url,
					data: addData,
					datatype:'xml',
					success:function(response){
						jQuery("#add-address-notify").html("");
						var result = jQuery(response).find("result").text();
						if(result=="Success")
							window.location.reload();
						else{
							if(jQuery(response).find("errors").length){
								var errorText = "<span>";
								jQuery(response).find("error").each(function(){
								text = jQuery(this).attr('text');
								errorText = errorText + "<p>"+text+"</p>";
							});
							
							errorText=errorText+"</span>";
							
							jQuery("#add-address-notify").html(errorText);
							jQuery("#add-address-notify").fadeIn(200);
							}
							
						}
					}
			});

		})
		
		// !Edit Address Form Submission
		jQuery('#edit-address-form-submit').click(function(e){
			e.preventDefault();
			jQuery("#edit-address-notify").fadeOut(200);
			var address_id = jQuery("#edit-address-id").val();
			var address_type = jQuery("input:radio[name='edit_address_type']:checked").val();
			var address_subtype = jQuery("input:radio[name='edit_address_subtype']:checked").val();
			var address_default = jQuery("input:radio[name='edit_address_default']:checked").val();
			var firstname = jQuery("#edit-address-first").val();
			var lastname= jQuery("#edit-address-last").val();
			var address_label = jQuery("#edit-address-title").val();
			var company_name = jQuery("#edit-address-company").val();
			var address1 = jQuery("#edit-address-one").val();
			var address2 = jQuery("#edit-address-two").val();
			var city = jQuery("#edit-address-city").val();
			var state = jQuery("#edit-address-state").val();
			var zip_code = jQuery("#edit-address-zip").val();
			var country = jQuery("#edit-address-country").val();
			var phone = jQuery("#edit-address-phone").val();
			var extension = jQuery("#edit-address-ext").val();
			var editData = "r=editAddress&address_id="+address_id+"&address_type="+address_type+"&address_subtype="+address_subtype+"&address_default="+address_default+"&address_label="+address_label+"&firstname="+firstname+"&lastname="+lastname+"&company_name="+company_name+"&address1="+address1+"&address2="+address2+"&city="+city+"&state="+state+"&country="+country+"&zip_code="+zip_code+"&phone="+phone+"&extension="+extension;
			jQuery.ajax({
					type: "POST",
					url: window.cgi_account_url,
					data: editData,
					datatype:'xml',
					success:function(response){
					var errorText = "";
						var result = jQuery(response).find("result").text();
						if(result=="Success")
							window.location.reload();
						else{
							if(jQuery(response).find("errors").length){
							jQuery(response).find("error").each(function(){
								text = jQuery(this).attr('text');
								errorText = errorText + "<p>"+text+"</p>";		
							});
							
							errorText=errorText+"</span>";
							jQuery("#edit-address-notify").html(errorText);
							jQuery("#edit-address-notify").fadeIn(200);
							}
						}
					}
			});
		})
		
		// Cross domain email sign up submit
		jQuery('#cd-join-email-form-submit').click(function(e){
			e.preventDefault();
			var joinval=(jQuery("#join_email").attr("checked"))?"Y":"";
			jQuery.ajax({
				type: "POST",
				url: window.cgi_account_url,
				data: "r="+jQuery("#cross-domain-form-rval").val()+"&join_email="+joinval,
				datatype:'xml',
				success:function(response){
				result = jQuery(response).find("result").text();
				//show err
					if(result=="Success"){jQuery.fancybox.close();}else{jQuery.fancybox.close();}
				}
			});
		})
		
		// !US / Military / International Radio Buttons
		
		jQuery('#edit-address-us').click(function(e){
			
			jQuery('label[for="edit-address-city"]').html("City<sup>*</sup>");
			jQuery('label[for="edit-address-state"]').html("State<sup>*</sup>");
			jQuery('#edit-address-zip').addClass("validate[required]");
			jQuery('#edit-address-state').replaceWith('<select tabindex="12" class="validate[required]" id="edit-address-state" name="state">'+jQuery('select#united_states').html()+"</select>");
			jQuery('#edit-address-country').replaceWith('<select tabindex="13" class="validate[required]" id="edit-address-country" name="country">'+jQuery('select#us_can_countries').html()+"</select>");
		
		})
		jQuery('#edit-address-mil').click(function(e){
			
			jQuery('label[for="edit-address-city"]').html("City (APO/FPO)<sup>*</sup>");
			jQuery('label[for="edit-address-state"]').html("State<sup>*</sup>");
			jQuery('#edit-address-zip').addClass("validate[required]");
			jQuery('#edit-address-state').replaceWith('<select tabindex="12" class="validate[required]" id="edit-address-state" name="state">'+jQuery('select#military_states').html()+"</select>");
			jQuery('#edit-address-country').replaceWith('<select tabindex="13" class="validate[required]" id="edit-address-country" name="country">'+jQuery('select#us_can_countries').html()+"</select>");
		
		})
		jQuery('#edit-address-intl').click(function(e){
			
			jQuery('label[for="edit-address-city"]').html("City<sup>*</sup>");
			jQuery('label[for="edit-address-state"]').text("State");
			jQuery('label[for="edit-address-zip"]').text("Zip Code");
			jQuery('#edit-address-zip').removeClass("validate[required]");
			jQuery('#edit-address-state').replaceWith('<input tabindex="12" id="edit-address-state" type="text" placeholder="State or Territory" class="small-input" />');
			jQuery('#edit-address-country').replaceWith('<select tabindex="13" class="validate[required]" id="edit-address-country" name="country">'+jQuery('select#intl_countries').html()+"</select>");
		
		})
		jQuery('#add-address-us').click(function(e){
			
			jQuery('label[for="add-address-city"]').html("City<sup>*</sup>");
			jQuery('label[for="add-address-state"]').html("State<sup>*</sup>");
			jQuery('#add-address-zip').addClass("validate[required]");
			jQuery('#add-address-state').replaceWith('<select tabindex="12" class="validate[required]" id="add-address-state" name="state">'+jQuery('select#united_states').html()+"</select>");
			jQuery('#add-address-country').replaceWith('<select tabindex="13" class="validate[required]" id="add-address-country" name="country">'+jQuery('select#us_can_countries').html()+"</select>");
		
		})
		jQuery('#add-address-mil').click(function(e){
			
			jQuery('label[for="add-address-city"]').html("City (APO/FPO)<sup>*</sup>");
			jQuery('label[for="add-address-state"]').html("State<sup>*</sup>");
			jQuery('#add-address-zip').addClass("validate[required]");
			jQuery('#add-address-state').replaceWith('<select tabindex="12" class="validate[required]" id="add-address-state" name="state">'+jQuery('select#military_states').html()+"</select>");
			jQuery('#add-address-country').replaceWith('<select tabindex="13" class="validate[required]" id="add-address-country" name="country">'+jQuery('select#us_can_countries').html()+"</select>");
		
		})
		jQuery('#add-address-intl').click(function(e){
			
			jQuery('label[for="add-address-city"]').html("City<sup>*</sup>");
			jQuery('label[for="add-address-state"]').text("State");
			jQuery('label[for="add-address-zip"]').text("Zip Code");
			jQuery('#add-address-zip').removeClass("validate[required]");
			jQuery('#add-address-state').replaceWith('<input tabindex="12" id="add-address-state" type="text" placeholder="State or Territory" class="small-input" />');
			jQuery('#add-address-country').replaceWith('<select tabindex="13" class="validate[required]" id="add-address-country" name="country">'+jQuery('select#intl_countries').html()+"</select>");
		
		})

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
	
		// Confirm Address Delete
		jQuery('a.address-delete-link').confirm({
			msg:'Delete?',
			wrapper: '<span class="delete-wrapper"></span>',
			buttons: {wrapper:'<a class="delete-option"></a>'}
		});
	
		jQuery(window).hashchange();
		jQuery('#add-address-us').click();
		jQuery('#add-address-billing').click();
		jQuery('#add-address-default').click();
		
});});

