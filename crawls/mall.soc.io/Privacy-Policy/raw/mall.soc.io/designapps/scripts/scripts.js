 $(document).ready(function() {
	 
	 //Tode AAS-1275
	 $("#search_image").click(function(){
		 $("#searchForm").submit();
	 });
	 
	    $("#regular_user_primary").click(function() {
	    	var oldpassset = $("#passwordold").attr("value");
	    	/* AAS-1576 "Required field!" validation should be removed from them
	    	if(oldpassset.length > 0){
	    		$("#passwordold").addClass("required");
	    		$("#Password").addClass("required");
	    		$("#Confirm").addClass("required");
	    	} */
			$(".error_msg").slideUp('fast');
			var hasError = false;
			var isFirstField = true;
			$(":input.required").each(function(index) {
				var itemValue=$(this).attr("value");
				itemValue = jQuery.trim(itemValue);
				var itemId = $(this).attr("id");
				if (itemId != 'birthdate') {
					if(itemValue.length == 0) {
						 $(this).parent().parent().find(".error_msg").text($("#err_mgs_required").text());
						 $(this).parent().parent().find(".error_msg").fadeIn('slow');
						 $(this).parent().addClass("input_error");			
						 hasError = true;
						 if (isFirstField == true) {
				               	scrollToRequired($("#form_regular_user_primary"));
				               	isFirstField = false;
				          }
					}else{
						$(this).parent().removeClass("input_error");
						if(itemId == 'email'){
					        var emailaddressVal = $("#email").val();
					        if(emailaddressVal.length != 0 && isValidEmail(emailaddressVal) == false) {
					        	$("#email").parent().parent().find(".error_msg").text("Enter valid email address");
					            $("#email").parent().parent().find(".error_msg").fadeIn('slow');
					            $("#email").parent().addClass("input_error");
					            $("#email").val("");
					            hasError = true;
					            
					            if (isFirstField == true) {
					               	scrollToRequired($("#email"));
					               	isFirstField = false;
					           	}
					           
					        }
						}    
					}
				}
			});
			
			if(oldpassset.length > 0){
		        var pass1 =  $("#Password").val();
		        var pass2 =  $("#Confirm").val();
		        if(pass1.length < 6 || pass1.length > 30){
		        	$("#Password").parent().parent().find(".error_msg").text("Your password should be minimum 6 and maximum 30 characters long.");
					$("#Password").parent().parent().find(".error_msg").fadeIn('slow');
					$("#Password").parent().addClass("input_error");
					hasError = true;
					 if (isFirstField == true) {
			               	scrollToRequired($("#form_regular_user_primary"));
			               	isFirstField = false;
			          }
		        } else {
		            $("#Password").parent().removeClass("input_error");
		        }
		        if(pass2.length < 6 || pass2.length > 30){
		        	$("#Confirm").parent().parent().find(".error_msg").text("Your password should be minimum 6 and maximum 30 characters long.");
					$("#Confirm").parent().parent().find(".error_msg").fadeIn('slow');
					$("#Confirm").parent().addClass("input_error");
					hasError = true;
					 if (isFirstField == true) {
		               	scrollToRequired($("#form_regular_user_primary"));
		               	isFirstField = false;
			         }
		        }else{
		        	$("#Confirm").parent().removeClass("input_error");
		        	if (pass2 == null || pass2 != pass1) {
		        		$("#Confirm").parent().parent().find(".error_msg").text("Please insert the same password.");
						$("#Confirm").parent().parent().find(".error_msg").fadeIn('slow');
						$("#Confirm").parent().addClass("input_error"); 
						hasError = true;
						 if (isFirstField == true) {
				               	scrollToRequired($("#form_regular_user_primary"));
				               	isFirstField = false;
				          }
		        	}
		        }
		        		        
			}
			
			var username = $("#username").attr("value");
	    	if(username.length > 50){
	    		 $("#username").parent().parent().find(".error_msg").text("Name cannot be longer than 50 characters.");
				 $("#username").parent().parent().find(".error_msg").fadeIn('slow');
				 $("#username").parent().addClass("input_error");			
				 hasError = true;
				 if (isFirstField == true) {
		               	scrollToRequired($("#form_regular_user_primary"));
		               	isFirstField = false;
		          }
			}else{
				$("#username").parent().removeClass("input_error");
			}
	    	
	    	var upgradeToDeveloper = $("#upgrade_to_developer").is(':checked');
	    	if (upgradeToDeveloper) {
		    	var agreeOfTerms = $("#agree_to_terms").is(':checked');		
		        if (!agreeOfTerms){
		        	$("#agree_to_terms").parent().parent().find(".error_msg").text($("#err_mgs_required").text());
		            $("#agree_to_terms").parent().parent().find(".error_msg").fadeIn('slow');
		            hasError = true;
		            
		            if (isFirstField == true) {
		               	scrollToRequired($("#form_regular_user_primary"));
		               	isFirstField = false;
		            }			           	
		        }
	    	}
	    			
		    if(hasError == true) { 
	        	$(this).val('Update');
	        	return false; 
	        }
			
		    $("#form_regular_user_primary").submit();
		});
	    
	    $("#regular_user_details").click(function() {
	    	
			$(".error_msg").slideUp('fast');
			var hasError = false;
			var isFirstField = true;
			var phone_value = $("#phone").attr("value");
			$('input[name$="phone"]').parent().removeClass("input_error");
			
			var phoneReg = new RegExp();
			phoneReg.compile(/^(\+{1})([1-9]{1,2})?([-\s\.])?((\(\d{1,4}\))|\d{1,4})(([-\s\.])?[0-9]{1,12}){1,4}(\s*(ext|x)\s*\.?:?\s*([0-9]+))?$/);
			//alert(phoneReg.test(phone_value));
			
		    if(phone_value != "" && !phoneReg.test(phone_value)){
				hasError = true;
				$('input[name$="phone"]').parent().parent().find(".error_msg").text("Please enter a valid phone number.");
				$('input[name$="phone"]').parent().parent().find(".error_msg").fadeIn('slow');
				$('input[name$="phone"]').parent().addClass("input_error");
				if (isFirstField == true) {
	               	scrollToRequired($("#form_regular_user_details"));
	               	isFirstField = false;
	           	}
			}
			
			var inputBirhdate = $("#birthdate").datepicker('getDate');
			$("#birthdate").parent().removeClass("input_error");
	        if (checkDateFormat($("#birthdate").attr("value")) == false) {
                $("#birthdate").parent().parent().find(".error_msg").text("Invalid date format");
                $("#birthdate").parent().parent().find(".error_msg").fadeIn('slow');
                $("#birthdate").parent().addClass("input_error");   
                hasError = true;
                if (isFirstField == true) {
	               	scrollToRequired($("#form_regular_user_details"));
	               	isFirstField = false;
	           	}
            }else if (isOldEnough(inputBirhdate, 13) == false) {
	        	  $("#birthdate").parent().parent().find(".error_msg").text("You have to be 13 or older");
				  $("#birthdate").parent().parent().find(".error_msg").fadeIn('slow');
				  $("#birthdate").parent().addClass("input_error");
				  hasError = true;
				  if (isFirstField == true) {
					    scrollToRequired($("#form_regular_user_details"));
		               	isFirstField = false;
		          }
			}
	        
	        var country=$("#country option:selected").val();
	        if(country == '') {
	        	$("#country").parent().parent().find(".error_msg").text('Please select country.');
	            $("#country").parent().parent().find(".error_msg").fadeIn('slow');
	            $("#country").parent().addClass("input_error");
	            hasError = true;
	            if (isFirstField == true) {
	            	scrollToRequired($("#form_regular_user_details"));
	               	isFirstField = false;
	           	}
	        } else {
	            $("#country").parent().removeClass("input_error");
	        }
	        
	        if (country == 'US' || country == 'CA') {
	        	 var state=$("#state option:selected").val();
	        	 if(state == '' || state=='-1') {
	             	$("#state").parent().parent().find(".error_msg").text('Please select state.');
	                $("#state").parent().parent().find(".error_msg").fadeIn('slow');
	                $("#state").parent().addClass("input_error");
	                hasError = true;
	                if (isFirstField == true) {
	                	scrollToRequired($("#form_regular_user_details"));
		               	isFirstField = false;
		           	}
	             } else {
	                $("#state").parent().removeClass("input_error");
	             }	 
	        }
	        
	        
	        var alfaReg = new RegExp();
	        alfaReg.compile("^[a-zA-Z ]+$");
	        var city = $("#city").val();
	        $("#city").parent().removeClass("input_error");
	        if (city != "" && !alfaReg.test(city)) {
	              $("#city").parent().parent().find(".error_msg").text("City should contain only letters");
	              $("#city").parent().parent().find(".error_msg").fadeIn('slow');
	              $("#city").parent().addClass("input_error");   
	              hasError = true;
	              if (isFirstField == true) {
	                scrollToRequired($("#city"));
	                isFirstField = false;
	              }  
	        }
			
	        var zipcodeEl = $("#zipcode");
	        var zipcode = zipcodeEl.val();
	        var zipcodeReg = new RegExp();
	        zipcodeReg.compile("[0-9]");
	        zipcodeEl.parent().removeClass("input_error");
	        if(zipcode != '' && !zipcodeReg.test(zipcode)){
	        	  zipcodeEl.parent().parent().find(".error_msg").text("Zipcode should contain only numbers");
	        	  zipcodeEl.parent().parent().find(".error_msg").fadeIn('slow');
	        	  zipcodeEl.parent().addClass("input_error");   
	              hasError = true;
	              if (isFirstField == true) {
	                scrollToRequired(zipcodeEl);
	                isFirstField = false;
	              }  
	        }
	        
			

	    	var fullname = $("#fullname").attr("value");
	    	if(fullname.length > 50){
	    		 $("#fullname").parent().parent().find(".error_msg").text("Full name cannot be longer than 50 characters.");
				 $("#fullname").parent().parent().find(".error_msg").fadeIn('slow');
				 $("#fullname").parent().addClass("input_error");			
				 hasError = true;
				 if (isFirstField == true) {
		               	scrollToRequired($("#fullname"));
		               	isFirstField = false;
		          }
			}else{
				$("#fullname").parent().removeClass("input_error");
			}
	    	
	    	
	        String.prototype.startsWith = function(str){
	            return (this.indexOf(str) === 0);
	        }

	        $(":input.url").each(function(index) {
	            var value=$(this).attr("value");
	            $(this).parent().removeClass("input_error");
	            if(value != '') {
	                if (!value.startsWith("http://") && !value.startsWith("https://")) {
	                    $(this).parent().parent().find(".error_msg").text("The URL should start with http:// or https://");
	                    $(this).parent().parent().find(".error_msg").fadeIn('slow');
	                    $(this).parent().addClass("input_error");               
	                    hasError = true;
	                    if (isFirstField == true) {
	                		scrollToRequired($(this));
	                		isFirstField = false;
	                	}     
	                }
	            }
	        });
	    	
	    	
		    if(hasError == true) { 
	        	$(this).val('Update');
	        	return false; 
	        }
			
		    $("#form_regular_user_details").submit();
		});

	// inputs focus
		$(".input_styled, select").focus(function(){
			//$(this).parent().addClass("input_active");
			if (!($(this).parent().hasClass("input_small_holder"))){
				$(this).parent().addClass("input_active");
			}
		});
		$(".input_styled , select").blur(function(){
			//$(this).parent().removeClass("input_active");
			if (!($(this).parent().hasClass("input_small_holder"))){
				$(this).parent().removeClass("input_active");
			}
		});
		
	// medium input focus
	    $(".input_styled_medium").focus(function(){
	        $(this).parent().addClass("input_medium_holder_active");
	    });
	    $(".input_styled_medium").blur(function(){
	        $(this).parent().removeClass("input_medium_holder_active");
	    });
	    
		// small input focus
		$(".input_styled_small").focus(function(){
			$(this).parent().addClass("input_small_holder_active");
		});
		$(".input_styled_small").blur(function(){
			$(this).parent().removeClass("input_small_holder_active");
		});
		// small input focus
		$(".input_small_holder").focus(function(){
			$(this).parent().addClass("input_small_holder_active");
		});
		$(".input_small_holder").blur(function(){
			$(this).parent().removeClass("input_small_holder_active");
		});
		
		//small select focus
		$(".input_small_default > select").focus(function(){
	        $(this).parent().addClass("input_small_holder_active");
	    });
	    $(".input_small_default > select").blur(function(){
	        $(this).parent().removeClass("input_small_holder_active");
	    });
		
		//small select focus
		$(".input_small_holder > select").focus(function(){
	        $(this).parent().addClass("input_small_holder_active");
	    });
	    $(".input_small_holder > select").blur(function(){
	        $(this).parent().removeClass("input_small_holder_active");
	    });
		
	// textarea focus
	     $("textarea").focus(function(){
	    	 var id = $(this).attr('id');
			if(id != "bodyreview"){
				$(this).parent().addClass("textarea_holder_active");
			}	    	 
	        // $(this).parent().addClass("textarea_holder_active");
	     });
	     $("textarea").blur(function(){
	    	 if(id != "bodyreview"){
	    		 $(this).parent().removeClass("textarea_holder_active");
	    	 }
	    	 
	         //$(this).parent().removeClass("textarea_holder_active");
	     }); 
		
		// New slider
		if($("#carousel1").length > 0){
			$("#carousel1").CloudCarousel({		
						buttonLeft: $('#but1'),
						buttonRight: $('#but2'),
						xPos: 640,
						yPos: 60,
						xRadius: 400,
						yRadius: -45,
						minScale: 0.50,
						FPS: 30,
						speed: 0.1,
						reflHeight: 0,
						mouseWheel: false
			});
		}
		

		// preload images in slider	
		
		
		var imageTotal = $('#carousel1 a img').length;
	    var imageCount = 0;       

	    $('#carousel1 a img').load(function(){

			if(++imageCount == imageTotal){
				// show slider
				
				$('#carousel1 a img').fadeIn("slow");
				// hide loader
				
				$('#carousel1 .ajax_loader').hide();
				// show left-right buttons
				$(".carouselLeft").show();
				$(".carouselRight").show();
				return false;
			}
			return false;
		});
	
	// expand_extras
	$('.expand_extras').click(function(){
		if ($(this).hasClass("expand_extras_opened")){
			$(".app_extras").hide();
			$(this).removeClass("expand_extras_opened");
		}else{
			$(".app_extras").show();
			$(this).addClass("expand_extras_opened");
		}								 
	});
	
	 $('a.star_info').click(function() {
		 var value = this.id.substring(4);
		 var id = this.getAttribute('app');
		 $.post('/services/vote/app/'+id, { v: value }, function(data) {
			 var cnt = data.ratting;
			 var votecnt = data.voteCount;
			 
			 for(var i=1; i<=10; i++) {
				  i<=cnt ? $('#vts'+i).addClass('star_info_on') : $('#vts'+i).removeClass('star_info_on');
				  var e = document.getElementById('vote'+i);
				  if(e!=null) {
					  e.setAttribute('vote', value);  
				  }
			 }
			 document.getElementById('vtCount').innerHTML = '('+votecnt+')';
		 });
	 });

	 $('a.star_info').hover(
		  function () {
			  var cnt = this.id.substring(4);
			  for(var i=1; i<=10; i++) {
				  i<=cnt ? $('#vote'+i).addClass('star_info_on') : $('#vote'+i).removeClass('star_info_on');
			  }
		  },
		  function() {
			  var vote = this.getAttribute('vote');
			  for(var i=1; i<=10; i++) {
				  i<=vote ? $('#vote'+i).addClass('star_info_on') : $('#vote'+i).removeClass('star_info_on');
			  }
		  }
	 );

	 
	 $(".iframe").fancybox({
			'transitionIn'	:	'none',
			'transitionOut'	:	'none',
			'speedIn'		:	300, 
			'speedOut'		:	200, 
			'overlayShow'	:	false,
			'width'			:	580,
			'height'		:	500,
			'padding'		: 	0,
			'margin'		:	0
			
		});
		
	$('.iframe').click(function() {
			$('#fancybox-outer').attr("id", "new_modal");
	});
	
	$('.app_photo').click(function() {
		$('#new_modal').attr("id", "fancybox-outer");
	});
	$('.open_video').click(function() {
		$('#new_modal').attr("id", "fancybox-outer");
	});
	 
	// video popup player
	$("a.open_video").click(function() {
		$.fancybox({
				'padding'		: 0,
				'autoScale'		: false,
				'transitionIn'	: 'none',
				'transitionOut'	: 'none',
				'speedIn'		: 300,
				'speedOut'		: 300,
				'title'			: this.title,
				'width'			: 680,
				'height'		: 495,
				'centerOnScroll': true,
				'href'			: this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
				'type'			: 'swf',
				'swf'			: {
				'wmode'		: 'transparent',
				'allowfullscreen'	: 'true'
				}
			});
			$("#fancybox-loading").remove();
		return false;
	});
	
	
	// image popup slider
	if($(".info_app_slider").length > 0){
		$(".info_app_slider .app_photo").fancybox({
			'transitionIn'	:	'none',
			'transitionOut'	:	'none',
			'speedIn'		:	300, 
			'speedOut'		:	200, 
			'overlayShow'	:	false
		});
	}
	
	// related slider
	if($(".category_slider").length > 0){
		var slider = $(".category_slider_content");
		var app_items = $(slider).children().size();
		var item_width = $(slider).children().css("width");
		item_width = item_width.split("px");
		item_width = item_width[0];
		var item_margins = 20;
		item_width = parseInt(item_width) + parseInt(item_margins);
		var slider_width = app_items*item_width;
		per_page = 4;
		
		$(slider).css("width", slider_width);
		
		$(".category_slider_control_left").click(function(){
			margin = $(slider).css("margin-left");
			margin = margin.split("px");
			margin = margin[0];
			move = parseInt(margin)+parseInt(item_width);
		
			if (margin<0 && !$(slider).is(":animated")){
				$(slider).animate({
					marginLeft: move+"px"
				}, 300);

			}
		});
		
		$(".category_slider_control_right").click(function(){
			margin = $(slider).css("margin-left");
			margin = margin.split("px");
			margin = margin[0];
			move = parseInt(margin)-parseInt(item_width);
			end = (parseInt(app_items)- per_page)*item_width*-1;

			if (margin>parseInt(end) && !$(slider).is(":animated")){
				$(slider).animate({
					marginLeft: move+"px"
				}, 300);

			}
		});
	}
	
	// app photos slider
	if($(".app_photos_slider").length > 0){
		var slider = $(".app_photos_slider_content");
		var app_items = $(slider).children().size();
		var item_width = $(slider).children().css("width");
		item_width = item_width.split("px");
		item_width = item_width[0];
		var item_margins = 6;
		item_width = parseInt(item_width) + parseInt(item_margins);
		var slider_width = app_items*item_width;
		per_page = 2;
		
		$(slider).css("width", slider_width);
		
		/* Tode, AAS-1154 */
		var controlMargin = $(slider).css("margin-left");
		controlMargin = controlMargin.split("px");
		controlMargin = controlMargin[0];
		var controlEnd = (parseInt(app_items)- per_page)*item_width*-1;
		
		if(controlMargin >= 0 ){
			$(".info_app_slider_control_left").addClass("info_app_slider_control_left_hidden");
		}else{
			$(".info_app_slider_control_left").removeClass("info_app_slider_control_left_hidden");
		}
		
		if(controlMargin <= parseInt(controlEnd)){
			$(".info_app_slider_control_right").addClass("info_app_slider_control_right_hidden");
		}else{
			$(".info_app_slider_control_right").removeClass("info_app_slider_control_right_hidden");
		}
		
		$(".info_app_slider_control_left").click(function(){
			margin = $(slider).css("margin-left");
			margin = margin.split("px");
			margin = margin[0];
			move = parseInt(margin)+parseInt(item_width);
		
			if (margin<0 && !$(slider).is(":animated")){
				$(slider).animate({
					marginLeft: move+"px"
				}, 300, function() {
				    var controlMargin = $(slider).css("margin-left");
					controlMargin = controlMargin.split("px");
					controlMargin = controlMargin[0];
					var controlEnd = (parseInt(app_items)- per_page)*item_width*-1;

					if(controlMargin >= 0 ){
						$(".info_app_slider_control_left").addClass("info_app_slider_control_left_hidden");
					}else{
						$(".info_app_slider_control_left").removeClass("info_app_slider_control_left_hidden");
					}
					
					if(controlMargin <= parseInt(controlEnd)){
						$(".info_app_slider_control_right").addClass("info_app_slider_control_right_hidden");
					}else{
						$(".info_app_slider_control_right").removeClass("info_app_slider_control_right_hidden");
					}
				  });
			}
		});
		
		$(".info_app_slider_control_right").click(function(){
			margin = $(slider).css("margin-left");
			margin = margin.split("px");
			margin = margin[0];
			move = parseInt(margin)-parseInt(item_width);
			end = (parseInt(app_items)- per_page)*item_width*-1;

			if (margin>parseInt(end) && !$(slider).is(":animated")){
				$(slider).animate({
					marginLeft: move+"px"
				}, 300, function() {
				    
				    var controlMargin = $(slider).css("margin-left");
					controlMargin = controlMargin.split("px");
					controlMargin = controlMargin[0];
					var controlEnd = (parseInt(app_items)- per_page)*item_width*-1;
					
					if(controlMargin >= 0 ){
						$(".info_app_slider_control_left").addClass("info_app_slider_control_left_hidden");
					}else{
						$(".info_app_slider_control_left").removeClass("info_app_slider_control_left_hidden");
					}
					
					if(controlMargin <= parseInt(controlEnd)){
						$(".info_app_slider_control_right").addClass("info_app_slider_control_right_hidden");
					}else{
						$(".info_app_slider_control_right").removeClass("info_app_slider_control_right_hidden");
					}
				  });
				

			}
		});
	}
	
	// expand comments
	$(".expand_comments").click(function(){
		if ($(".info_app_comments").css("overflow")=="hidden"){
			$(".info_app_comments").css("overflow","auto");
		}else{
			$(".info_app_comments").css("overflow","hidden");
		}
	});
	
	// expand/contact sidebar menu
	$('.ac_show_cat').click(function(){
		if ($(this).hasClass("ac_show_cat_opened")){
			$(".categories_list", $(this).closest(".categorie_box")).slideUp();
			$(this).removeClass("ac_show_cat_opened");
		}else{
			$(".categories_list", $(this).closest(".categorie_box")).slideDown();
			$(this).addClass("ac_show_cat_opened");
		}								 
	});
	
	// expand/contact sidebar  SUB menu
	$('.cat_submenu').click(function(){
		if ($(this).hasClass("cat_submenu_opened")){
			$(this).css("color","#838383");
			$(this).next().slideUp();
			$(this).removeClass("cat_submenu_opened");
		}else{
			// close other
			$('.cat_submenu').next().slideUp();
			$('.cat_submenu').removeClass("cat_submenu_opened");
			$('.cat_submenu').css("color","#838383");
			$('.categories_list a.current').removeClass("current");
			// open this
			$(this).css("color","#74c9de");
			$(this).next().slideDown();
			$(this).addClass("cat_submenu_opened");
		}								 
	});
	
	// six pack slider
	$(".slider_buttons a").click(function(){
		var ind = $(this).index();
		var front_slider = $(this).parent().parent().prev();
		//$(".six_pack", front_slider).css("display","none");
		//$(".six_pack").eq(ind).css("display","block");
		var container_width = 6*$(".six_pack").width()+"px";
		$(".six_pack_container").width(container_width);
		var move = ind*$(".six_pack").width()*-1;
		
		//$(".six_pack_container").css("margin-left", move);
		$('.six_pack_container', front_slider).animate({
			marginLeft: move+"px"
		  }, 500, "swing" , function() {
			// Animation complete.
		  });
		  

		
		$("a", $(this).parent()).removeClass("btn_control_on");
		$(this).addClass("btn_control_on");
	});
	
		var behaviour_4 = new ImageFlow();
			behaviour_4.init({ ImageFlowID: 'myImageFlow' });
		 
		 //$("#myImageFlow img").wrap('<div class="banner_container" />');

	
	//Acordion
    $(".accordion_header").click(function(){
        if($(this).hasClass("accordion_header_opened")){
            $(this).next().slideUp('normal');
            $(this).removeClass("accordion_header_opened");
            $(".btn_accordion", $(this)).removeClass("btn_accordion_open");
        }else{
            $(".accordion_content").slideUp('normal');
            $(".accordion_header").removeClass("accordion_header_opened");
            $(this).next().slideDown('normal');
            $(this).addClass("accordion_header_opened");
            $(".btn_accordion").removeClass("btn_accordion_open");
            $(".btn_accordion", $(this)).addClass("btn_accordion_open");
        }
    });
    
    $(".accordion_sub_header").click(function(){
        if($(this).hasClass("accordion_sub_header_opened")){
            $(this).next().slideUp('fast');
            $(this).removeClass("accordion_sub_header_opened");
            $(".btn_accordion", $(this)).removeClass("btn_accordion_open");
        }else{
            $(".accordion_sub_content").slideUp('fast');
            $(".accordion_sub_header").removeClass("accordion_sub_header_opened");
            $(this).next().slideDown('fast');
            $(this).addClass("accordion_sub_header_opened");
            $(".btn_accordion").removeClass("btn_accordion_open");
            $(".btn_accordion", $(this)).addClass("btn_accordion_open");
        }
    });

    // Books Download Button
    /*
    $("#books .button, .info_app_buy_btn").click(function() {
        var book_format = $(this).next();
        $(this).slideUp(function() {
            book_format.slideDown();
        });
    });*/

    // Alert choosen book format
    $(".book_format").change(function() {
    	var id = $(this).attr("name");
    	var format = $(this).val();
    	if (format != "format") { 
	    	window.open("/books/!download?id=" + id + "&format=" + format);
    	}
    });
	
    
	// Tooltip, Tode, AAS-768
	$(".tooltip").tooltip({ 
		 showURL: false 
		,track: true 
		,fade: 200
		,delay:200
		,showBody: " - "
		
	});	
	

	/* Tode AAS-1154 */
	if($(".info_app_slider_content").size() < 3){
		$(".info_app_slider_control_left").addClass("info_app_slider_control_left_hidden");
		$(".info_app_slider_control_right").addClass("info_app_slider_control_right_hidden");
	}
	
	 $("#contentItemReviewUpdateBtn").click(function() {
			$(".error_msg").slideUp('fast');
			
			$(this).val('Please wait');
	     var hasError = false;
	  	
	  	var isFirstField = true;
	  	
	  	
	  	var title = $("#title").val();
	  	if(title.length == 0){
	  		$("#title").parent().parent().find(".error_msg").text($("#err_mgs_required").text());
	             $("#title").parent().parent().find(".error_msg").fadeIn('slow');
	             if (isFirstField == true) {
			            scrollToRequired($("#title"));
			            isFirstField = false;
			        }
	                 hasError = true;
	  	}
	  	
	  	var disabled = $("#review_disabled").val();
	  	if(disabled == 'false') { 		
		     	
		     	var shortDesc = $("#shortDesc").val();
		     	if(shortDesc.length == 0){
		     		$("#shortDesc").parent().parent().find(".error_msg").text($("#err_mgs_required").text());
		                $("#shortDesc").parent().parent().find(".error_msg").fadeIn('slow');
		                if (isFirstField == true) {
				            scrollToRequired($("#shortDesc"));
				            isFirstField = false;
				        }
		                    hasError = true;
		     	}
		     	
		     	
		     	 if (!$("input[name='plausible']:checked").val()) {
		             	$("#plausible").parent().parent().find(".error_msg").text($("#err_mgs_required").text());
		                $("#plausible").parent().parent().find(".error_msg").fadeIn('slow');
		                if (isFirstField == true) {
				            scrollToRequired($("#plausible"));
				            isFirstField = false;
				        }
		                    hasError = true;
		         }     
		     	
		     	
		     	
		     	var features = $("#features option:selected").val();
				if(features == '0') {
					$("#features").parent().parent().find(".error_msg").text($("#err_mgs_required").text());
		                $("#features").parent().parent().find(".error_msg").fadeIn('slow');
		                if (isFirstField == true) {
				            scrollToRequired($("#features"));
				            isFirstField = false;
				        }
		                    hasError = true;
				}
				
				var usability = $("#usability option:selected").val();
				if(usability == '0') {
					$("#usability").parent().parent().find(".error_msg").text($("#err_mgs_required").text());
		                $("#usability").parent().parent().find(".error_msg").fadeIn('slow');
		                if (isFirstField == true) {
				            scrollToRequired($("#usability"));
				            isFirstField = false;
				        }
		                    hasError = true;
				}
				
				var price = $("#price option:selected").val();
				if(price == '0') {
					$("#price").parent().parent().find(".error_msg").text($("#err_mgs_required").text());
		                $("#price").parent().parent().find(".error_msg").fadeIn('slow');
		                if (isFirstField == true) {
				            scrollToRequired($("#price"));
				            isFirstField = false;
				        }
		                    hasError = true;
				}
				
		     	var appeal = $("#appeal option:selected").val();
				if(appeal == '0') {
					$("#appeal").parent().parent().find(".error_msg").text($("#err_mgs_required").text());
		                $("#appeal").parent().parent().find(".error_msg").fadeIn('slow');
		                if (isFirstField == true) {
				            scrollToRequired($("#appeal"));
				            isFirstField = false;
				        }
		                    hasError = true;
				}
			
			}
			     
	     if(hasError == true) { 
	     	$(this).val('Update');
	     	
	     	return false; 
	     }
			
	     $("#contentItemReviewUpdateBtn").submit();
		});
	
 });
 
 

 function voteComment(id,value) {
	 $.post('/services/vote/comment/'+id, { v: value }, function(data) {
		 var el = document.getElementById('vt'+id);
		 el.innerHTML = data.ratting;
		 el.style.color = data.ratting<0 ? 'red' : 'green';
	 });
 }


 function submitComment() {
 	var el = document.getElementById('comment_text');
 	if(el.value.length>4000) {
 		var elp = document.getElementById('comment_title');
 		elp.style.color = 'red';
 		elp.innerHTML = "Comment text must not contain more that 4000 characters.";
 		return;
 	}
 	
 	if(el.value.length<3) {
 		var elp = document.getElementById('comment_title');
 		elp.style.color = 'red';
 		elp.innerHTML = "You need to enter some text before you submit the comment.";
 		return;
 	}
 	
 	document.forms['send_comment'].submit();
 }
 
 function submitReply() {
	 	var el = document.getElementById('reply_txt');
	 	if(el.value.length>4000) {
	 		var elp = document.getElementById('error_msg');
	 		elp.style.color = 'red';
	 		elp.innerHTML = "Comment text must not contain more that 4000 characters.";
	 		return;
	 	}
	 	
	 	if(el.value.length<3) {
	 		var elp = document.getElementById('error_msg');
	 		elp.style.color = 'red';
	 		elp.innerHTML = "You need to enter some text before you submit the comment.";
	 		return;
	 	}
	 	
	 	document.forms['send_reply'].submit();
	 }
 
 function is18YearsOld(inputDate) {
		var tempDate = new Date();
		tempDate.setFullYear(tempDate.getFullYear() - 18);
		
		if (tempDate < inputDate) {
			return false;
		}
		
		return true;
	}

 /* Tode, AAS-1086 */
 function isOldEnough(inputDate, years){
 	var tempDate = new Date();
 	tempDate.setFullYear(tempDate.getFullYear() - years);
 	
 	if (tempDate < inputDate) {
 		return false;
 	}
 	
 	return true;
 }
 
 function checkDateFormat(inputDate) {
    var validformat=/^\d{2}\/\d{2}\/\d{4}$/; 
	var isValid=true;
	if (!validformat.test(inputDate)) {
	   isValid = false;
	} else{ 
		var monthfield=inputDate.split("/")[0];
		var dayfield=inputDate.split("/")[1];
		var yearfield=inputDate.split("/")[2];
		var dayobj = new Date(yearfield, monthfield-1, dayfield);
		if ((dayobj.getMonth()+1!=monthfield)||(dayobj.getDate()!=dayfield)||(dayobj.getFullYear()!=yearfield)) {
		  isValid = false;
		} 
	}	
	
	return isValid;
 }
 
 function popup() {
	 	$(".wrapper").fadeOut("slow");
	 	$(".footer").fadeOut("slow");
		// fade takeover
		$(".popup_blackout").delay(1000).fadeIn("slow");
		$(".popup_takeover").delay(1000).fadeIn("slow");

		// center takeover
		var slika_w = $(".popup_takeover").width();
		var window_w = $(window).width();
		var slika_left = (window_w/2)-(slika_w/2);
		$(".popup_takeover").css("left",slika_left);
		
		var slika_h = $(".popup_takeover").height();
		var window_h = $(window).height();
		var slika_top = (window_h/2)-(slika_h/2);
		$(".popup_takeover").css("top",slika_top);

		
		// close takeover
		$(".popup_close_takeover").click(function(){
			$(".popup_blackout").fadeOut("slow");
			$(".popup_takeover").fadeOut("slow");
			$(".wrapper").fadeIn("slow");
			$(".footer").fadeIn("slow");
		});
 }

 /* Tode, AAS-1306 */
 function rateApp(rate, id){
 	var form = "#rateAppForm_"+id;
 	var newRate = "#rateValue_"+id;
 	$(newRate).val(rate);
 	$(form).submit();
 }
 
 /* Tode, AAS-1680 */
 function rateBook(rate, id){
		var form = "#rateBookForm_"+id;
		var newRate = "#rateValue_"+id;
		$(newRate).val(rate);
		$(form).submit();
	}
 
 /* Tode, AAS-1352 */
 function refreshPage(seconds){
	 setTimeout("reloadPage()",seconds*1000); 
 }
 function reloadPage(){
	 location.reload();
 }
 
 function scrollToRequired(object){
	    $('html, body').animate({ scrollTop: object.offset().top -55}, 700);
	}

 /*Tode, AAS-1574 */
 function refreshCaptcha() {
		var f = document.getElementById('captcha');
		f.src = f.src;
	}
 
 function isValidEmail(email) {
		var emailReg = new RegExp();
	    emailReg.compile("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$");
	    
	    if (emailReg.test(email)) {
	    	return true;
	    } 
		return false;
} 
 
 function showMyReviewOptions() {
		var myReviews = $("input[name='my_reviews']:checked").val();
	    if (myReviews == 'yes'){
	    		$("#publishOptions").css('display', '');
	   	} else { 
	    		$("#publishOptions").css('display', 'none');
	    }
}
 
 function submitFastPay() {

	    var submit = document.getElementById('submitted').value;
	    if (submit == 'false') {
	        document.forms['fastPay'].submit();
	        document.getElementById('submitted').value = 'true';
	    } else {
	        return false;
	    }
} 
