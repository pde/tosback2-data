/**
 * @file
 * Provides helper functions to Fast Company.
 */

/**
 * Copyright 2009 Crisp Wireless Inc.
 */
function mobileRedirect(mobileURL) {

    // removed ipod/iphone, we want this traffic

    var mobiles = [];
    mobiles[0] = "smartphone";
    mobiles[1] = "playstation";
    mobiles[2] = "wap";
    mobiles[3] = "windows ce";
    mobiles[4] = "wm5 pie";
    mobiles[5] = "iemobile";
    mobiles[6] = "series60";
    mobiles[7] = "symbian";
    mobiles[8] = "series60";
    mobiles[9] = "series70";
    mobiles[10] = "hiptop";
    mobiles[11] = "series80";
    mobiles[12] = "series90";
    mobiles[13] = "blackberry";
    mobiles[14] = "android";
    mobiles[15] = "midp";
    mobiles[16] = "wml";
    mobiles[17] = "brew";
    mobiles[18] = "palm";
    mobiles[19] = "xiino";
    mobiles[20] = "blazer";
    mobiles[21] = "pda";
    mobiles[22] = "nitro";
    mobiles[23] = "netfront";
    mobiles[24] = "sonyericsson";
    mobiles[25] = "ericsson";
    mobiles[26] = "sec-sgh";
    mobiles[27] = "docomo";
    mobiles[28] = "kddi";
    mobiles[29] = "vodafone";
    mobiles[30] = "opera mini";
    mobiles[31] = "motorola";
    mobiles[32] = "nokia";
    
    var uagent = navigator.userAgent.toLowerCase();
    for(i=0; i<mobiles.length; i++) {
	if(uagent.search(mobiles[i]) > -1) {
	    window.location = mobileURL;
	    break;
	}
    }
}


// only do this for the root
if ( window.location.href.match(/http:\/\/.*?\/$/) ){
  mobileRedirect("http://m.fastcompany.com");
}


$(function() {
	/**
	 * Hide node input form on preview
	 */
	 if ($("div.preview").html()) {
	 	$('form#node-form').hide();
	 	
	 	editbutton = document.createElement('input');
	 	$(editbutton).attr({ value: "Edit", type: "submit", id: "preview-edit" });
	 	createbutton = document.createElement('input');
	 	$(createbutton).attr({ value: "Create", type: "submit", id: "preview-submit" });
	 	
		$(editbutton).click(function () {
			// Need to wrap this in its own div
			$("div.help").hide();
			$("div#preview-wrapper").hide();
			$("form#node-form").show();

      		return false;
	 	});
	 	
	 	$(createbutton).click(function (){
	 		$("form#node-form #edit-submit").click();
	 	});
	 	
	 	$(".preview-buttons").append(createbutton,editbutton);
	 }
	 
	 /**
	  * Make Professional History input form dynamic
	  */
	  if ($('form.profile_professional_history')) {
	  	$('#edit-field-other-job-title-0-value').parent().hide();

	    if ( $('#edit-field-job-title-key').val() == 'Other (please specify)') {
	      $('#edit-field-other-job-title-0-value').parent().show();
	    }
	    
	    $('#edit-field-job-title-key').change(function() {
	      if ($('#edit-field-job-title-key').val() != 'Other (please specify)') {
	        $('#edit-field-other-job-title-0-value').parent().slideUp();
	      }
	      else {
	        $('#edit-field-other-job-title-0-value').parent().slideDown();
	      }
	    });	
	  }

	 /**
	  * Make registration profesion input form dynamic
	  */
	  if ($('form.user_profile')) {
			$('#edit-field-other-job-title-0-value').parent().show();
	    if ($('#edit-field-profession-key').length > 0 && 
				$('#edit-field-profession-key').val() != 'Other (please specify)') {
	      $('#edit-field-other-job-title-0-value').parent().hide();
	    }
	    $('#edit-field-profession-key').change(function() {
	      if ($('#edit-field-profession-key').val() != 'Other (please specify)') {
	        $('#edit-field-other-job-title-0-value').parent().slideUp();
	      }
	      else {
	        $('#edit-field-other-job-title-0-value').parent().slideDown();
	      }
	    });
	  }

	 /**
	  * Disable links inside of a node preview
	  */
	  $("div.preview a").click(function() {return false;} ).attr("title", "Link disabled during preview.");
		
     /**
      * Full Profile Layer - used on themes\user\default.tpl.php
      */
      if ($("#show-profile-link").html()){
      	$("#long-bio").hide();
        $("#show-profile-link").click( function() {
          $("#short-bio").slideUp('normal', function() {
          	$("#long-bio").slideDown('slow');
          }); 
          return false; 
        });
        $(".hide-profile-link").click( function() { 
          $("#long-bio").slideUp('slow', function() {
            $("#short-bio").slideDown();
          });
          return false; 
        });
      }
		
	$('a.getanswersnow').removeAttr('href');
	$('div#fastanswerquestion-form').hide();
	$('div.fastanswerquestionblock-form').hide();
	$('a.getanswersnow').click(function () {
		$('div#fastanswerquestion-form', $(this).parent()).slideDown();
		$(this).hide();
		return false;
	});
	
  /**
   * Functionality for help links.
   */
  $("a.qmark-icon").click(function() {
    if ($("div.help-popup").is("div")) {
      $("div.help-popup").remove();
      return false;
    }
    $(this).after("<div class='help-popup'/>");
    $.get($(this).attr("href"), function(data) {
      $("div.help-popup").html(data).append("<a class='close-popup' href='#'>Close</a>");
      $("a.close-popup").click(function() {
	      $("div.help-popup").remove();
	      return false;
      });
	  $("a.close-popup-ok").click(function() {
	      $("div.help-popup").remove();
	      return false;
      });
    })
    return false;
  });

  /**
   * Functionality for removing feeds from my/home
   */
  $("a.remove-feed").click(function() {
    $.post($(this).attr("href"));
    $(this).parent("div.home_feed").fadeOut('normal', function() {
      $(this).parent("div.home_feed").remove(); 
    });
    return false;
  });

	/**
	 * Hide/show full description layer
	 */
	$("a.group-description").click(function() {
      $("div.short-description").slideUp('slow', function() {
        $("div#group-full-description").slideDown('slow');
      });
      return false;
	});
	$("div#group-full-description > a.close").click(function() {
      $("div#group-full-description").slideUp('slow', function() {
        $("div.short-description").slideDown('slow');
      });
      return false;
	});
	
	
	/**
	 * Custom mouse-over effect for the magazine tools links
	 */
	$('div.magazine-links a').eq(0).addClass('selected');
	$('div.magazine-links').mouseover(function() {
	  $('div.magazine-links a').eq(0).removeClass('selected');
	});
	$('div.magazine-links').mouseout(function() {
	  $('div.magazine-links a').eq(0).addClass('selected');
	});
	
});


	/**
	 * This checks the current chekbox and if is selected selects current year in 
	 * the year date, disabled and add a text next to it that says 'to current'.
	 *
	 * Receive the names of the fields:
	 * 	-ckFldName: The name of the current check box field.
	 *	-dtFldName: The name of the year select field.
	 */
	function do_check_current_date(ckFldName, dtFldName, dtMonthFldName){
		// TODO: Change the name of the field and create a hidden field to send the data, 
		// because when disabled a field it doesn't sends the data to the server.
		
		// Set the default field names in case of those are undefined.
		if(typeof ckFldName == 'undefined'){
			ckFldName = 'edit-field-current-school-keys';
		}
		if(typeof dtFldName == 'undefined'){
			dtFldName = 'edit-field-date-end-0-value-year';
		}
		
		// Check if the current field is checked.
	 	var isCurrent = $('#'+ckFldName).attr('checked');
	    if(isCurrent == true){
	    	// Deselect all options and select the current year.
	        var options = $("select[@id="+dtFldName+"] > option");
	        if(options && options.length > 0){
	            var currYear = (new Date()).getFullYear();
	            for(var i=0; i<options.length; i++){
	                if(options[i].value == currYear){
	         			        options[i].selected = true;
	             	} else {
	                 			options[i].selected = false;
	                }
	    		}
	        }
	        // Disable the year select and add the text
	        $("select[@id="+dtFldName+"]").attr('disabled',true).parent().append('<span id="end_date_extra_text">to Present</span>');

			if(! (typeof dtMonthFldName == "undefined")){
		    	// Deselect all options and select the current month.
		        var options = $("select[@id="+dtMonthFldName+"] > option");
	    	    if(options && options.length > 0){
	        	    var currMonth = (new Date()).getMonth()+1;
	            	for(var i=0; i<options.length; i++){
	                	if(options[i].value == currMonth){
		         			        options[i].selected = true;
		             	} else {
	    	             			options[i].selected = false;
	        	        }
	    			}
		        }
		        // Disable the month select and add the text
	    	    $("select[@id="+dtMonthFldName+"]").attr('disabled',true);//.parent().append('<span id="end_date_extra_text">to Present</span>');
	    	}
	 	}
	    else{
	    	// Enable the year select.
	        $("#"+dtFldName).attr('disabled',false);
	        $("#"+dtMonthFldName).attr('disabled',false);
	        // Remove the text added before.
	        $("#end_date_extra_text").remove();
	 	}
	}
