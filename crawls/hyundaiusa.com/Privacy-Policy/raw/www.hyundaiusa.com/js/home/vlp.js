// JavaScript Document
$(document).ready(function() { 


//========================== PERFORMANCE SECTION - THIS IS FOR CIRCLES CALL OUTS =============================//
    
      $('#show_1').show();	
	  $('.default span').css({backgroundPosition: 'right bottom', color:'#fff'});
	  $('.default').find('a').css({backgroundPosition: '0 bottom'});
	 
	  $('.circle').click(function(){
	  $('.desc_hide').css({"visibility":"hidden"});
	  $(this).prev('.desc_hide').css({"visibility":"visible"});	

		 return false;
	 });
	 
	 $('.buttons li').bind('click',function(){
		 var obj = $(this).attr('name');
		 $('.vehicle_area').hide();
		 $('#'+obj).show();
		$('.desc_hide').css({"visibility":"hidden"});

		 $('.button_row li a span').css('color','');
	     $('.interactive_menu span').removeAttr('style');
		 $('.button_row li a').removeAttr('style');
		 
		 $(this).find('span').css('color','white');
		 $(this).find('a:hover span').css({backgroundPosition: 'right bottom'});
		 $(this).find('a').css({backgroundPosition: '0 bottom'});
       
		 return false;
 });
	
	
		 //==============================================
	 //this is the circle swatches on the VLPs
	 //============================================== 
	

	  
	 $('.swatch_circle_border').bind('click',function(){
		$('.swatch_circle_border').removeClass('swatch_circle_border_thick');
		$(this).addClass('swatch_circle_border_thick');  
	 });
	 

	//==============================================
	 //showing the first circle's color name as default
	 //==============================================  
	 		   
		   var name_default = $('#color_group .color_box:eq(0)').attr('name');// get the first circle's name
		   $('#color_group .color_box:eq(0)').find('div').addClass('swatch_circle_border_thick');		  
		   $('#color_name').text(name_default);// place it inside #color_name
           var $colw= $('#color_name').width();// get the width of the color name container 
		   var color_name = $colw/2; <!-- get the half point of the color name container-->
		   $('#color_name').css( {left: -color_name+8}); // center the color name box to the first circle as default
	
	
			
             var touchy = (/iphone|ipod|ipad|android/i).test(navigator.userAgent);

			 if(touchy) {
				 $('#color_name').css('background-position', '101% 0%');
				 $('#color_name').css( {left: -4})
				 if($('.color_box').length > 0) {
					 var $first_color_box = $($('.color_box')[0]);
				 }
			 }

	//==============================================
	 //setting element's opacity
	 //==============================================  
	 
	 $('.sections_bk').css({ opacity: 0.7 });
	 $('.main_page_nav .tools').css({ opacity: 0.5});
	 $('.ribbon').css({ opacity: 0.7});
	  
	 //===========================================================================================
	 //this will make the VLP content's right nav chase and match the height of the left content
	 //===========================================================================================

	  var $h= $('.vlp_bottom_cont').height();
	  var $hvlp= $h-1600;
	  // console.log($hvlp);
	 $('.lower').css('height',$hvlp);
	
	 //==============================================
	 //this is for the VLP first block image swap
	 //==============================================
 
	  $('.thumb_wrap a').bind('click',function(){
		  var x= $(this).attr('id');
		 $('#block_gallery').attr('src','/images/home/breakthrough/'+x+'.png'); 
		 return false;   
	  });

	 //============================================================================================
	 //this is for the color name and car color swap - THIS WILL BE ACTIVITED AFTER THE SUPER BOWL
	 //=============================================================================================

	 $('.color_box').bind('click',function(){

		 var y = $(this).attr('name');
		 var cn = $('#color_name');
		 var color2 = $('#car_color').attr('src');

		 var is_first_color = false;
		 if(touchy) {
			 
			
			 var first_color_name = $first_color_box.attr('name');
			 if(first_color_name == y) {
				 is_first_color = true;
				 cn.css('background-position', '101% 0%');
				 if(!cn.hasClass('color_name_bk_al'))
					 cn.addClass('color_name_bk_al')
			 } else {
				 cn.css('background-position', '50% 0%');
			 }
		 }
		 
		 
		 $('.color_box').removeClass('on');
		 $(this).addClass('on');
		 $(cn).css('display','block'); 
		 $(cn).text(y);

		// $('#car_color2').css('background-image', 'url("images/shimmering White.png")');  
		// $('#car_color').fadeTo('fast', 1.0, function() { 
		 $('#car_color').attr('src','images/'+y+'.png')
            // $('#car_color2').css('background', 'url("images/shimmering White.png")');
		  // .animate({         
				// opacity: 1.0 //this will animate the color name box to the center position of the button clicked        
				// }, 500);         
		// });

	 
		  
		  var q= $(this); //button clicked
		  var w= q.position(); //get the position of the button clicked
		  var x= w.left; // get the left position of the button clicked
			 //var a = x+100;
			 //console.log(x);			

	      var $colw= $('#color_name').width();// get the width of the color name container
	      var color_name = $colw/2; <!-- get the half point of the color name container-->
	  	 
		   if(touchy && is_first_color)
				color_name = 8;
		   $('#color_name').animate({         
				 left: x-color_name+8 //this will animate the color name box to the center position of the button clicked        
				 }, 458); 
		 
		 return false;   
	  });
	  
	 //=================================
	 //this is for the accordion
	 //================================= 
	 
	  $('.tabs_cont').first().show();// default accordion content showing
	  $('.tabs').first().hide();// default accordion header showing
	  
	  $('.tabs').bind('click',function(){ 
		$('.tabs').show();
		$('.tabs_cont').slideUp();
		$(this).hide();
		$(this).next('.tabs_cont').slideDown();
	  });
	  
          //==========================  MAKING ENTIRE DIV CLICKABLE =============================
		  $(".tabs_cont").click(function(){      
				var target = $(this).find('a').attr('target');
				var href = $(this).find('a').attr("href");
				if (target == '_blank') {
					window.open(href);
				} else {
					window.location.href = href;
				}
				return false;  
           });
		
	 //==================================================================================================
	 // this is for the video 
	 //================================================================================================== 	
		
	
		$('#video_trigger').bind('click',function(){ 
		  	 $('#video_container').animate({          
		       height: '370px'       
			   }, 500 );
			 $('#video_container').load('video.html #video');    
		     $('.close_video').show(); 
			 return false;
	  	});
		
		$('.close_video').bind('click',function(){       
		   $('#video_container').animate({          
		       height: '1px'       
			   }, 500 );
		   $('#video_container').empty(); 
		   $(this).hide(); 
		   return false; 			
	    });
		
	//==========================  NEW THINKING VIDEO =============================	
	
		
//		$('.new_thinking_pix_shell,.new_thinking_pix_shell_l').bind('click',function(){ 
//			 var my_vid= $(this).attr('id');
//			 var my_cont=$('.video_container_thinking');
//			 $('.close_video_thinking').hide();
//			 $(my_cont).hide();
//			 $(my_cont).empty(); 
//			 $(this).find('.video_container_thinking').show();
//			 $(this).find('.video_container_thinking').load("thinking_video.html #" + my_vid);
//			 $(this).find('.close_video_thinking').show();
//			 return false;
//	  	});	

		
//		$('.close_video_thinking').bind('click',function(){       
//		   $(this).next('.video_container_thinking').hide();
//		   $(this).next('.video_container_thinking').empty(); 
//		   $(this).hide(); 
//		   return false; 			
//	    	});			
		
		
//		$('.trim_list').bind('click',function(){       
//		   $('.trim_list').removeClass('trim_list_active');
//		   $('.trim_list_default').removeClass('trim_list_default').addClass('trim_list a');
//		   $(this).addClass('trim_list_active');
//		   return false; 			
//	    	});
		
		
		//==========================  BIG NEW THINKING VIDEO =============================	
		
//		$('.new_thinking_vid_arrow_big').bind('click',function(){ 
//			 $('.video_container_thinking_big').show().load("thinking_video.html #big_video");
//			// $('.close_video_thinking').slideDown();
//			 return false;
//	  	});	

	  
	  //==========================  MAKING ENTIRE DIV CLICKABLE =============================	
	  
	   $(".copy_container").click(function(){      
          var target = $(this).find('a').attr('target');
				var href = $(this).find('a').attr("href");
				if (target == '_blank') {
					window.open(href);
				} else {
					window.location.href = href;
				}
				return false;      
        });

	 //==========================  LEGAL DISCLAIMERS =============================	 
	  
	   $('.dis_claimer_shell').bind('click',function(){
		   $('.dis_claimer_pop_cont').slideDown();
		   return false; 
	   });
	   
	   $('.dis_claimer_pop_top').bind('click',function(){
		   $('.dis_claimer_pop_cont').slideUp();
		   return false; 
	   });
	   
	   $('.legal_trig').bind('click',function(){
		   $('.dis_claimer_pop_cont_a').slideUp();
		   $(this).next('.dis_claimer_pop_cont_a').slideDown();
		   return false; 
	   });
	   
	   	$('.disclaimer_pop_top').bind('click',function(){
		   $('.dis_claimer_pop_cont_a').slideUp();
		   return false; 
	   });	
	   
	   
	   
	  //==========================  HOME PAGE ZIP CODE BOX =============================		   
		  var defaultText = 'ZIP Code';     
		  var controlObject = $('#summer_zip');     
		  controlObject.val(defaultText);      
		  controlObject.focusin(function (e) {        
		   var controlSelected = $(e.target);         
		   if (controlSelected.val() == defaultText) {             
		   controlSelected.val('');         
		   }     
		   }).focusout(function (e) {         
		   var controlSelected = $(e.target);         
		   if (controlSelected.val() == '') {             
		   controlSelected.val(defaultText);         
		   }     
		   }); 
	   
	   
$('.new_thinking_vid_arrow_big, .new_thinking_main_image').bind('click',function(){ 
	 $('.video_container_thinking_big').show().load("thinking_video.html #big_video");
	// $('.close_video_thinking').slideDown();
	 return false;
});

  //========================== TOOL TIP ============================= //
    	   

		   $('.legal_new_top').bind('click',function(){
		   $('.legal_pop').slideUp();
              });
	   
	   $('.legal_trigger').bind('click',function(){
              var trig_name = $(this).attr('id');
			  var b = $('.'+trig_name);
			  var h = $(b).height();
			  trig_pos = $(this).position();
			  $('.legal_box').hide();
             $(b).css({top:trig_pos.top-h,left:trig_pos.left-112}).show();
			  $('.legal_pop').hide();
			 $('.legal_pop').slideDown();

	      return false; 
	          });
			  
			  
//========================== OVERLAY =============================// 			  
			  

    
	 
	 $('.jd_overlay').bind('click',function(){
		 $('#cover_all').show();
		 var winW = $(window).width()/2 - $('.jd_ratings').width()/2;
		 $('.jd_ratings, .jd_ratings_dup').css({left: winW-40}).show();
		 $('html, body').animate({scrollTop:0}, 250); 
		 return false;
	 });
	 
	 
	 $('.jd_overlay').bind('click',function(){
		 $('#cover_all').show();
		 var winW = $(window).width()/2 - $('.jd_ratings_amci').width()/2;
		 $('.jd_ratings_amci').css({left: winW-40}).show();
		 $('html, body').animate({scrollTop:0}, 250); 
		 return false;
	 });	 
	 
	 $('.jd_ratings_blue_close').bind('click',function(){
		 $('#cover_all, .jd_ratings, .jd_ratings_dup, .jd_ratings_amci').hide();
		 return false;
	 });
	 
	 $('.jd_ratings_head_tiny').bind('click',function(){
		 $('.jd_ratings_blue').show();
		 $('.jd_ratings_blue_close').hide();
		 return false;
	 });	
	 	 	 
	 $('.jd_ratings_blue_close2,.jd_ratings_amci').bind('click',function(){
		 $('.jd_ratings_blue').hide();
		 $('.jd_ratings_blue_close').show();
		 return false; 
	 });
	 
	
	 
	  $(window).resize(function() {
         var winW = $(window).width()/2 - $('.jd_ratings').width()/2;
		 $('.jd_ratings, .jd_ratings_dup').css({left: winW-40});
		 });
		 
		 
	  $(window).resize(function() {
         var winW = $(window).width()/2 - $('.jd_ratings_amci').width()/2;
		 $('.jd_ratings_amci').css({left: winW-40});
		 });
	 

//========================== THIS WILL MAKE THE AZERA JD POWER POP UP FIT ON 1024X768 =============================// 	
	
	
	 if ((screen.width<=1024) && (screen.height<=768)) { 
	// alert('Screen size: 1024x768 or smaller'); 
	 $(".jd_ratings").css({
	      margin:'4px auto 0',
	      padding:'10px 22px'
	 });
	 
	 
	 $(".jd_ratings_disclaim").css('margin','0px');
	 $(".jd_ratings_head_tiny").css('margin','10px 0'); 
	 $(".jd_ratings_blue_close").css('left','750px');
	 
	 $(".jd_ratings_blue").css({
	     left:'38px',
		 top:'90px'
	 });

	 $(".jd_ratings_blue_close2").css('left','680px');
	 } else  { 
	// alert('Screen size: less than 1024x768, 800x600 maybe?'); 
	// $("link[rel=stylesheet]:not(:first)").attr({href : "detect800.css"}); 
	 } 
	 
	
//========================== THIS WILL MAKE VLP CARS ALIGN WITH SHADOW ON 1024 x 768 =============================// 	
	
//	 if ((screen.width<=1024) && (screen.height<=768)) { 
//		 var xMove = 140;
//		 var obj = $(".image_boxx");    
//		 var currentPosition = obj.position().left;     
//		 obj.css({left: currentPosition - xMove});  
//         $('.vlp_main ').css('width',1008);
//	     $('.main_cont ').css('margin','20px 0 30px 40px');
//		 $('#color_group ').css('margin','0 0 6px 56px');
//	 	 } else  { 
//	// alert('Screen size: less than 1024x768, 800x600 maybe?'); 
//	// $("link[rel=stylesheet]:not(:first)").attr({href : "detect800.css"}); 
//	    }
		
		
	
	
	
	
	 $('.jd_overlay').bind('click',function(){
		 $('#cover_all, .jd_ratings').show();
		  $('html, body').animate({scrollTop:0}, 250); 
		 return false;
	 });
	 
	 $('.jd_ratings_blue_close').bind('click',function(){
		 $('#cover_all, .jd_ratings').hide();
		 return false;
	 });
	 
	 $('.jd_ratings_head_tiny').bind('click',function(){
		 $('.jd_ratings_blue').show();
		 $('.jd_ratings_blue_close').hide();
		 return false;
	 });	
	 	 	 
	 $('.jd_ratings_blue_close2').bind('click',function(){
		 $('.jd_ratings_blue').hide();
		 $('.jd_ratings_blue_close').show();
		 return false;
	 });

	 
	 	   
});//jquery ============