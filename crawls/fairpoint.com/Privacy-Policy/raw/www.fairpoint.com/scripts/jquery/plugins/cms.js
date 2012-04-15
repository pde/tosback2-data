var validator;
/*======================== Equal Height for box-hd ==============*/
(function($){

     // add a new method to JQuery
    $.fn.equalHeight = function() {
       // find the tallest height in the collection
       // that was passed in (.classname)
        tallest = 0;
        this.each(function(){
            thisHeight = $(this).height();
            if( thisHeight > tallest)
                tallest = thisHeight;
        });
 
        // set each items height to use the tallest value found
        this.each(function(){
            $(this).height(tallest);
        });
    }
})(jQuery);

$(function(){
	if(typeof(equalHeight) == 'function') {
		$('.box-hd').equalHeight();
		$('.internet-ftr').equalHeight();
		$('.internet-bdy').equalHeight();
	}
	$('#fp-headerSearch').keyup(function(e){
		if(e.keyCode==13)
			googleMiniSearch('fp-headerSearch',true);
	})
});

/* function for callout start*/
$( init );
function init() {
  var myDiv2Para = $('.callout-con').detach();
  myDiv2Para.prependTo('.reading_goes_here >div');
  if($('#supportPreviewPane .support-image-caption').length >0){
	 var breadcrumb = $('.breadcrumb-jquery').detach();
 	 breadcrumb.prependTo('#supportPreviewPane .support-image-caption');
  }else if($('#previewPane').length >0){
	   var breadcrumb = $('.breadcrumb-jquery').detach();
	   breadcrumb.prependTo('#previewPane').attr('id','land-bredcrumbs');
  }
  
  $('.breadcrumb-jquery').addClass('breadcrumb');
  
}
/* function for callout end*/


/* function for fp gateway back-ground-image*/
$(function(){
//_debug($('.currentSlide').index());
$('#requestVideo').click(function(e){
	e.preventDefault();
	var vidDiv = $('.video').eq($('.currentSlide').index());
	if(vidDiv.find('[id^="myExperience"]').length) {
		vidDiv.modal();
	} else {
		window.open(vidDiv.find('a').attr('href'));
	}
});
//$('#requestVideo').trigger('click')


$('#body-container-gw').css({
    'background-color': 'transparent',
    'background-image': $("#header-gw").css("background-image"),
    'background-repeat': 'no-repeat',
    'background-scroll': 'scroll',
    'background-position': 'center 0'    
});

$("#header-gw").css("background", '');


  if($('#body-container-gw').length) {
  	$('.bottom-rail').addClass('bottom-rail-two-col').removeClass('bottom-rail');
  	//$('#body-container-gw').find('.bottom-rail')
  }
/* function for fp gateway back-ground-image*/

/* Function for removing on hover image from sub header */
$('.topDropdown>li').each(function(){
    if($(this).children().length == 1) {
        $(this).removeClass('menu');
            $(this).unbind('mouseover').bind('mouseover', function(e){
                e.preventDefault();
                $(this).find('a:first').unbind('mouseover').bind('mouseover', function(ev) {
                    ev.preventDefault();
                    $(this).css({'background-image': 'none'});
                    return false;
});
                return false;
            });
    }
});

/* Site map page adding class clear on the 4th column listing */
$(function(){
    $('.site-map').eq(3).addClass('clear');
})

/* Capsule tab seperater line */
$('.capsule-tab li:eq(1)').css('border-left','none');

/* Function for capsule tab seperater line */
//Removing this line as it cause extra gap between highlight module and "Call us" box on page: /residential/internet/dial_up/
/*if($('.specialTableContainer .selected').length){
$('.call-us-today').css('margin-top','25px');
}*/


/* function for double column liquid */
	$('#doubleColumnLiquid .common-features .brief .left-col-liquid').wrap('<div class="block" />');


//$(function(){
	if($('#DoubleColumnFixed .highlightSpecialPack, #DoubleColumnFixed #slider-2-container, .triple-point.shadow').length) { 
		//alert('remove');
		$('#DoubleColumnFixed .brief').removeClass('briefHeight')
	} else {
		//alert('added');
		$('#DoubleColumnFixed .brief').addClass('briefHeight')
	}

//Residential Calling features brief height adjustments
if(window.location.href.match(/calling_features|internationalLongDistance|understandYourBill/)) {
	$('#DoubleColumnFixed .brief').height(138);
}


//  Function for global  news room event section
		if($('.newsShort-bdy').length){
	var eventNewsroom =	$('.callout.event').parent().detach();
	eventNewsroom.appendTo('#doubleColumnLiquid .newsShort-bdy');
	}


// Function for View map for Residential || Internet || Internet High
	if($('.serviceArea li').length){
		$('.serviceArea li').each(function(c){
			$(this).addClass('map-link'+(c+1)).bind('click',function(){
				_debug('#map_'+(c+1)+'_modal');
				$.modal.close();
				window.setTimeout(function(){$('#map_'+(c+1)+'_modal').modal()}, 10);
			});
		});
	}


//  Function for global  news room event section
	if($('.resource-data').length){
		var resourceLiabrary =	$('.callout.event').parent().detach();
		resourceLiabrary.appendTo('.resource-data');
	}

//  Function for Understand Your Bill Page room event section

	$('.bottomArrow .rightPopup').click(function(){	
		$('.shortPointOpened').removeClass('shortPointOpened');
		$('.rightPopup').removeClass('rightPopupOpened');												
		if( $(this).next('.detailsPopup').is(':visible') )
		{
			$('#billDemos .detailsPopup').hide();
			$('#billDemos .nowShowing').removeClass('nowShowing');
			$('.shortPointOpened').removeClass('shortPointOpened');
		}else
		{
			$('#billDemos .nowShowing').hide().removeClass('nowShowing'); 
			$(this).next('.detailsPopup').show().addClass('nowShowing');
			$(this).addClass('rightPopupOpened');
		}//endif		
	});//end


	$('.impNotices .rightPopup').click(function(){	
		$('.shortPointOpened').removeClass('shortPointOpened');
		$('.rightPopup').removeClass('rightPopupOpened');												
		if( $(this).next('.detailsPopup').is(':visible') )
		{
			$('#billDemos .detailsPopup').hide();
			$('#billDemos .nowShowing').removeClass('nowShowing');
			$('.shortPointOpened').removeClass('shortPointOpened');
		}else
		{
			$('#billDemos .nowShowing').hide().removeClass('nowShowing'); 
			$(this).next('.detailsPopup').show().addClass('nowShowing');
			$(this).addClass('rightPopupOpened');
		}//endif		
	});//end



/*understand your bill*/
$('.rightSide_arrow + p.expand-pop').live('click', function(e){
	e.preventDefault();
	if($('.detailsPopup').css('display','block')) {
		$('.detailsPopup').css('display','none');
		$('.shortPoint').removeClass('shortPointOpened')
	}
	var $me = $(this).next();
	var $holder = $(this).parents('.arrow-holder');
	$(this).parents('.shortPoint').addClass('shortPointOpened')
	//$me.addClass('shortPointOpened');
	$holder.find('.detailsPopup').show().position({
		my: 'right top',
		at: 'right bottom',
		of: $me,
		collision:'none'
	}).css({
		'z-index': 9999
	}).find('a.close').bind('click',function(){
		$(this).parents('.detailsPopup').fadeOut('medium');
		$('.shortPoint').removeClass('shortPointOpened')
		$me.removeClass('shortPointOpened');
	});
});

$('.leftSide_end + p.expand-pop').live('click', function(e){
	e.preventDefault();
	var myPos='left top';
	var atPos='left bottom';
	if($(this).attr('id') == 'identification_575px_6'){
		myPos="left bottom";
		atPos="left top"
	}
	if($('.detailsPopup').css('display','block')) {
		$('.detailsPopup').css('display','none');
		$('.shortPoint').removeClass('shortPointOpened')
	}
	var $me = $(this).prev();
	var $holder = $(this).parents('.arrow-holder');
	$(this).parents('.shortPoint').addClass('shortPointOpened')
	//$me.addClass('shortPointOpened');
	$holder.find('.detailsPopup').show().position({
		my: myPos,
		at: atPos,
		of: $me,
		collision:'none'
	}).css({
		'z-index': 9999
	}).find('a.close').bind('click',function(){
		$(this).parents('.detailsPopup').fadeOut('medium');
		$('.shortPoint').removeClass('shortPointOpened')
		$me.removeClass('shortPointOpened');
	});
});


$('a.expand-pop').live('click', function(e){
	e.preventDefault();
	var $me = $(this);
	var $holder = $(this).parents('.arrow-holder');
	$me.addClass('shortPointOpened');
	$holder.find('.detailsPopup').show().position({
		my: 'center bottom',
		at: 'center top',
		of: $me
	}).css({
		'z-index': 9999
	}).find('a.close').bind('click',function(){
		$(this).parents('.detailsPopup').fadeOut('medium');
		$me.removeClass('shortPointOpened');
	});
});

if($('#doubleColumnLiquid').length && $('table.hboxShadow').length) {
	$('.tableContainer').width($('.left-col-liquid').width());
	$('table.hboxShadow').css({'margin-top': 20});
	
}
// Function for fixing PNG issue using IEPNG 
if($.fn.ifixpng) $('img[src$=".png"]').ifixpng();
// Function for fixing PNG issue using IEPNG 

$('.features-container .rule-b1px:last-child').remove();


//function written for channel line up page.
if($('.list_wrapper').length) {
	 $('.briefHeight').css('height','145');
}

}) //   =========================   End of document.ready


$(function() {
	
	//Adding some additional validator rules
	
	//Validator rule to check zip code
	$.validator.addMethod("zip", function(value, element) { 
	  return this.optional(element) || /^\d{5}$/.test(value); 
	}, "Please enter valid 5-digit ZIP code");
	
	$.validator.addMethod("areaCode", function(value, element) { 
	  return this.optional(element) || /^\d{3}$/.test(value); 
	}, "Please enter valid 3-digit Area code");
	
	$.validator.addMethod("ph3Digit", function(value, element) { 
	  return this.optional(element) || /^\d{3}$/.test(value); 
	}, "Please enter valid 3-digit number for this part of phone number");
	
	$.validator.addMethod("ph34Digit", function(value, element) { 
	  return this.optional(element) || /^\d{4}$/.test(value); 
	}, "Please enter valid 4-digit number for this part of phone number");
	
	/*function for Donnation form validation start*/
	$('#grant-form #reset').click(function() { 
		validator.resetForm();
	});
	
	validator=$("#grant-form").validate({
		rules: {
		  Cname: "required",
			  phone1: {
			  required: true,
			  digits: true
			},
		 phone2: {
			  required: true,
			  digits: true
			},
		  phone3: {
			  required: true,
			  digits: true
			},
		  Organization:"required",
		  Maddress:"required",
		  city:"required",
		  state:"required",
		  interest: "required",
		  zip: {
			  required: true,
			  digits: true
			}
				
			 },
		 messages: {
		 Cname: "Contact name is a required field.",
		   phone1:{
			 required: "Please enter your Phone Number.",
			 digits: "Please enter a valid Phone Number."
		  },
			   phone2:{
			 required: "Please enter your Phone Number",
			 digits: "Please enter a valid Phone Number."
		  },

		 phone3:{
				 required: "Please enter your Phone Number",
				 digits: "Please enter a valid Phone Number."
			  },
			   
		  Organization:"Organization name is a required field.",
		  Maddress:"Mailing Address is a required field.",
		  city : "City is a required field.",
		state : "State is a required field.",
		interest:"Description is required field.", 
		 zip: {
					 required: "Please enter zip code",
						 digits: "Please enter a valid zip code."
			  }
		
		 },
		 
		groups: {
		Phone: "phone1 phone2 phone3"},
	  errorPlacement: function(error, element) {
		 if (element.attr("name") == "phone1" || element.attr("name") == "phone2" 
					 || element.attr("name") == "phone3" )
		   error.insertAfter("#phone3");
		 else
		   error.insertAfter(element);
	   },
	   

		meta: "validate",
	   submitHandler: function(form) {form.submit() }
			 
		});
	/*$('#btn-donationForm').click(function() { 
	
	});*/
	/*function for Donnation form validation end*/
	
	//Trigger submit on hit of enter
	$('#location-varification-zip input[type="text"], #location-varification-phn input[type="text"]').keypress(function(e) {
		if (e.which == 13) {
			//$(this).closest('form').find('a.new-btn:first').trigger('click');
			$(this).closest('form').trigger('submit');
			return false;
		}
	});
	//Trigger submit on click of virtual submit button (link in-fact)
	$('#loc-submit-zip, #loc-submit-phn').click(function(e){
		$(this).closest('form').trigger('submit');
		return false;
	});
	
	
	//control engraved boxes on tiered product pages
	if(typeof($.fn.eqHeight) === 'function') {
		$('.borderRow').find('td[class^="box_"]').eqHeight();
		$('.footerRow > td').eqHeight();
		$('.headerRow > td').eqHeight();
	}
	var h = parseInt($('.headerRow > .box_1').height());

	if($('.brief .head-i>span:contains("International Plans.")').length){
		$('.specialTableContainer tr:first td.selected table').css({left: 0});
	}
	
	if($('.categoryName1-Bdy, .categoryName2-Bdy, .categoryName3-Bdy').length && typeof($.fn.eqHeight) === 'function') {
		$('.categoryName1-Bdy, .categoryName2-Bdy, .categoryName3-Bdy').eqHeight();
	}
	
	$($('.selected').closest('div')).height($('.selected table').height());
	$('.selected .headerRow > td').each(function(){
		var _h = (h <= 35)? 0 : (h > 45)? 17 : 7;
		$(this).height($(this).parent().height()+7).parent().height($(this).parent().height() + _h);
	});
});


$(function(){
	if($('#doubleColumnLiquid .right-rail-liquid, #bundleIndex-container').length) {hFix();}
	$('#recent_release').ajaxComplete(function() {
		if($('#doubleColumnLiquid .right-rail-liquid').length) {hFix();}
	});
	
	/*if($('#tweetinfo').length) {
		$('#tweetinfo').ajaxComplete(function(){
			_debug('ajax complete');
			adjRightRailHeight();
		});
	} else {
		adjRightRailHeight();
	}*/

	//Removing external-link if pointing to a local hash anchor
	$('a:not([href*="payDQ"])').each(function(){
		var hostName = this.host.split(':').shift();
		
		if(hostName === window.location.host && $(this).attr('href') && !$(this).attr('href').match(/^.*\.(doc|pdf|xls|ppt|docx|xlsx|pptx|gif|jpg|png|zip|wmx|wrf|txt)$/i)) {
			if($(this).parent('li').length && $(this).parent('li').hasClass('external-link')) {
				$(this).parent('li').removeClass('external-link');
			}
			if($(this).hasClass('external-link'))	$(this).removeClass('external-link');
			$(this).removeAttr('target');
		}
	});
	
	//Removing target="_blank" from Education solutions page
	//if(window.location.host.match(/payDQ/)) {
		
	//}
	
	//Add goldplan class in triple play fullHouse
	if($('.planListFullhouse').length) {
    	$('.planTitle:first').addClass('goldPlan');
		$('.planType:contains("Phone")').nextAll('ul.planTxt:eq(0)').addClass('left');
		$('.planType:contains("Phone")').nextAll('ul.planTxt:eq(1)').addClass('right');
	}
	if($('.planTxt').length)	$('.planTxt li:last-child').addClass('last');

	if(window.location.href.match(/community-involvement/)) {
		$('#RAC').width(890).height(615);
    	$('#RAC_FRAME').width(890).height(615);
	}
	
	if($('#frmDonation, #sponsor-request').length) {
		$(document.body).css({'background-color': '#fff'});
	}

});//End of document.ready

function hFix(){
	/*var rrHeight = $('.rightRail').height();
	var bodyContHeight = $('#body-container').height();
	if (bodyContHeight < rrHeight ) {
			bodyContHeight = rrHeight + 125;
			$('#body-container').css('height', bodyContHeight);
		}*/
}

$(function(){
	if(typeof($.fn.datepicker) === 'function') {	$('#txtEventDate, #date').datepicker(); }
	if(window.location.href.match(/enterprise/)) {
		$('#body-SingleColumn > #content').addClass('enterpriseLanding');
	}
});


$(function(){
	$.expr[":"].econtains = function(obj, index, meta, stack){
		return (obj.textContent || obj.innerText || $(obj).text() || "").toLowerCase() == meta[3].toLowerCase();
	}
	
	//code to adjust breifHeight for plan page
	if($('.planDisplay').length){
	  $('.briefHeight').css('height','138');
	}
	
	//code to adjust breifHeight for calling features page
	if($('.callingSpecifications').length){
	  $('.briefHeight').css('height','138');
	}
	
	if($('.sort a').length){
		$('.sort a').click(function(){
			$('.sort a').removeClass('active');
			$(this).addClass('active');
	
		});
    }
	try{
		if(typeof(jQuery().autotab_magic) === 'function' && typeof(jQuery().autotab_filter) === 'function') {
			if($('#txtPh1, #txtPh2, #txtPh3').length) {
				$('#txtPh1, #txtPh2, #txtPh3').autotab_magic().autotab_filter('numeric').change(function(){
					if($(this).val().length == parseInt($(this).attr('maxlength')))
						$(this).trigger('blur');
				});
			}
			if($('#phone1, #phone2, #phone3').length) {
				$('#phone1, #phone2, #phone3').autotab_filter('numeric').change(function(){
					if($(this).val().length == parseInt($(this).attr('maxlength')))
						$(this).trigger('blur');
				});
			}
			if($('#altphone1, #altphone2, #altphone3')) {
				$('#altphone1, #altphone2, #altphone3').autotab_filter('numeric').change(function(){
					if($(this).val().length == parseInt($(this).attr('maxlength')))
						$(this).trigger('blur');
				});
			}
		} 
	} catch(err){}
	
	//Activate current sub-menu
	$('.menu-item:econtains("'+$.trim($('.breadcrumb').children(':eq(2)').text())+'")').css({color: '#231F20'});
})

function adjRightRailHeight() {
	if($('#double-column-landing').length) {
		var rrHeight = $('#double-column-landing .rightRail').height();
		var ContHeight = $('#doubleColumnLiquid #content').height();
		if (ContHeight < rrHeight ) {
				$('#double-column-landing #content').css('height', rrHeight);
			}
	}
}

$(window).load(function(){
	
	
	/*if(typeof($.fn.eqHeight) === 'function') {
		var disHeight = window.location.href.match(/enterprise\/support/) || false;
		if($('#doubleColumnLiquid #content').length) {
			$('#doubleColumnLiquid #content, .rightRail').eqHeight();
		} else {
			if(!disHeight) {
				//$('#doubleColumnLiquid #body-container, .right-rail-liquid').eqHeight();
				//$('#doubleColumnLiquid #body-container').height($('.right-rail-liquid').height()+$('.block:first').height());
			}
		}
		//$('#double-column-landing #content, .rightRail').eqHeight();
		
		if($.browser.msie && parseInt($.browser.version) === 7) {
			if(window.location.href.match(/community-involvement/)) {
				$('#body-container, .right-rail-liquid').css({height: 'auto'});
			}
			if(window.location.href.match(/fp_contact_us/)) {
				$('#body-container > .common-features').addClass('clear');
			}
		}
	}*/
});


function limitChars(txtObj, limit)
{
	var text = $(txtObj).val();	
	var textlength = text.length;
	if(textlength > limit)
	{
		$(txtObj).val(text.substr(0,limit));
		return false;
	}
	else
	{
		return true;
	}
}

$(function(){
	if($('.planTitle').length && typeof($.fn.eqHeight) === 'function')	$('.planTitle').eqHeight();
	
 	$('textarea[name="message"], textarea[name="txtAreaSummary"]').keyup(function(){
 		limitChars(this, 1500);
 	})
	if(($.browser.mozilla && (parseInt($.browser.version) === 5) || parseInt($.browser.version) === 6) || $.browser.webkit) {
		if($('#coverage-mapLoc').length) {
			$('#coverage-mapLoc').css({
				height: 750,
				overflow: 'auto'
			});
		}
	}
});