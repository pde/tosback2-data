//COMMON GLOBAL FUNCTIONS

//DEFINE COMMON WIDGETS PLUGIN
(function( $ ){
	
	$.fn.commonWidgetsJs = function( options ) {  
	
		/*If we want to add options later, do so here
		'location'         : 'top',
		'background-color' : 'blue'
		*/
		
		var settings = {
		};
		
		return this.each(function() {  
			  
			//If options exist, let's merge them with our default settings
			if ( options ) { 
				$.extend( settings, options );
			}
		
		
			//Define common widgets plugin target
			var $e = $(this);
		
			
			//Initiate jQuery UI Tabs for widgets
			$e.find('.widget-tabs').tabs({
				fx:{opacity: 'toggle'},
				show: function(event, ui) {
					$(this).addClass('widget-tabs-revealed');
				}
			});
			$e.find('.widget-tabs-large').tabs({
				fx:{opacity: 'toggle'},
				show: function(event, ui) {
					$(this).addClass('widget-tabs-large-revealed');
				}
			}).tabs('rotate', 5000, true);
			$e.find('.widget-tabs-large .widget-tabs-nav a').bind('click', function() {     
				$(this).closest('.widget-tabs-large').tabs('rotate',0,false);
			});
			
			
			//Special tabs specificially called for the Popular on POLITICO widget
			$e.find('.widget-subtabs').tabs({
				fx:{opacity: 'toggle'}
			});
			$e.find('.widget-subtabs .widget-subtabs-nav li a').click(function(){
				$(this).closest('.widget-subtabs-nav').toggleClass('widget-subtabs-nav-revealed');
			});
			
			
			//Apply bio images as background image to img element (in order to faux crop them into squares)
			$e.find('.widget-tabs-large .widget-tabs-nav img').each(function() {
				var thumbSrc = $(this).attr('src');
				$(this).css('background', 'transparent url(' + thumbSrc + ') no-repeat center center').attr('src', '/design/widgets/x.gif');
			});
			
			
			//Initiate Coda Slider for galleries
			$e.find('.widget-content .coda-slider').codaSlider({
				dynamicTabs: false,
				crossLinking: false
			});
			
			
			//Opens Colorbox lightbox on any link with class "lightbox". If rel of "cartoon-gallery" is on link, then permalink used for title.
			$e.find(".widget-content a.lightbox").colorbox({
				title: function(){
					if ( $(this).is('a[rel="cartoon-gallery"]') ){
						var permalink = $(this).attr('data-permalink');
						if ( permalink ){
							return '<a href="' + permalink + '">Permalink &raquo;</a>';
						}
					}
				}
			});
		
		});
	};
	$.fn.commonWidgetsLoadDivViaXml = function( sUrl ) {  
				$.ajax({type:"GET", url:sUrl, cache: false,success: function(xml){
							var rootNode = $(xml).find('inc');
							var rootNodeID = rootNode.attr("divid");  
							var rootNodeText = rootNode.text();   
							var tempIDName="##"+rootNodeID;
							$(tempIDName).html('');
							$(tempIDName).html(rootNodeText).commonWidgetsJs();
							}
					});//ajax	
	};
	
})( jQuery );






$(document).ready(function()						   
{
	//REMOVE HIDDEN JS-CONTROLLED ITEMS
	$('.js').removeClass('js');
	
	//IE6 DROPDOWNS AND KEYBOARD CONTROLS
	$('#primaryNav > li').hover(
		function() {$(this).addClass('active');}, 
		function() {$(this).removeClass('active');}
	);	
	$('#primaryNav li ul li a').focus(function() {
	  $(this).parent().parent().addClass("active");
	  $(this).parent().parent().parent().addClass("active");
	});
	$('#primaryNav li ul li a').blur(function() {								  	
	  $(this).parent().parent().removeClass("active");
	  $(this).parent().removeClass("active");
	  $(this).parent().parent().parent().removeClass("active");
	});
	$('#primaryNav li a').blur(function() {								  	
	  $(this).parent().removeClass("active");
	});
	
	//Put labels in form fields
	$("label.infield").inFieldLabels(); 
	$("input").attr("autocomplete","off");
	
	
	//SEARCH BAR
	$('.site-search .search-toggle').click(function(){
		$(this).parent().toggleClass('advanced-search-enabled');
		$(this).toggleClass('search-collapse');
	});
	
	
});


//POPULATE SEARCH BY DATE CONTENT
$(document).ready(function() {
	 jQuery("<option value='all' selected='selected'>Any Date</option>").appendTo("#date");
	 var day = new Date();var NumDays=1;day.setDate(day.getDate()+NumDays);
	 for (var i=7; i > 0;i--){
			  OldDay=day.setDate(day.getDate()-1);
			  var curr_date = day.getDate();var curr_month = day.getMonth();curr_month++;var curr_year = day.getFullYear();
			  jQuery("<option value='"+i+"'>"+curr_month+"/"+curr_date+"/"+curr_year+"</option>").appendTo("#date");
	 };
});




//Simple Show/Hide Toggle
$(document).ready(function()
{
	
	$('html').scrollTop($('html').scrollTop()-1);
	
	 //hide the all of the element
	$(".toggled-content").hide();
	
	jQuery.fn.standardShowHide = function() {
		$(this).slideToggle(200);
		//$(this).animate({opacity:"100%"});
	};
	
	//toggle the componenet 
	$(".toggle-switch").click(function()
	{
		$(this).next(".toggled-content").standardShowHide();
	});
	
	//Whiteboard Toggles
	$(".whiteboard").each(function(){
		if ($(this).children().children('.toggled-content').length){
			$(this).find('.whiteboard-options').prepend("<span class='toggle-whiteboard'>Continue Reading</span>");
			$(this).find('.toggle-whiteboard').live("click",function(){
				$(this).parent().prev('.toggled-content').standardShowHide();
				var t = $(this).text();
				if (t == "Continue Reading") {
					t="Hide"; 
					$(this).text(t).addClass("toggle-whiteboard-alt");
				}
				else {
					t = "Continue Reading";
					$(this).text(t).removeClass("toggle-whiteboard-alt");
				}
			});
			
		};
	});
	
	
	
	//Show/Hide Story Comments
	$(".show-comments").toggle(
		function () {
		  $(this).find('span').text("Hide"); 
      	},
		function () {
			$(this).find('span').text("Show");
		}
	);


});




//SIMPLE CLOSE BOX FOREVER
$(document).ready(function()
{
	//New Caption
	$('.hide-caption').live('click',function(){
		$(this).parent('.caption.').fadeOut(200);
		$(this).parent().parent().append("<button type='button' class='show-caption' title='Show Caption'>Show Caption</div>");
	});
	$('.show-caption').live('click',function(){
		$(this).prev('.caption.').fadeIn(200);
		$(this).remove();
	});
	
	//Old Caption
	$(".close-button").click(function(){$(this).parent(".close-this").fadeOut(600);});
});


//Autopopulates forms based off Title attribute
$(function(){
  $('.populate').each(function(){
    $(this).val( $(this).attr('title') ).focus(function(){
      $(this).val('');
    });
    //$(this).val( $(this).attr('title') ).blur(function(){
    //  $(this).val( $(this).attr('title') );
    //});
    $('label[for='+$(this).attr('id')+']').addClass('hidden');
  });
});


// RESIZE THE FONT
$(document).ready(function()
{						   
  var incCount = 0;
	var $resizeTarget = null;
	$resizeTarget = $('.resize > *:not(.story-embed, .hidden)');
	
	$(".reset-font").click(function(){
		incCount=0;
		$resizeTarget.removeAttr("class").addClass('text0');
		setFontCookie(incCount,0);
		$(this).removeClass('reset-font-enabled');				
	});
	// Increase Font Size
	$(".increase-font").live('click', function(){
		if (incCount < 2) {
			incCount++;	
			$resizeTarget.removeAttr("class").addClass('text'+incCount);
			setFontCookie(incCount,7);
			$(".reset-font").addClass('reset-font-enabled');
		return false;
		};
	});
	// Decrease Font Size
	$(".decrease-font").live('click',function(){
		if (incCount > -2) {
			incCount--;	
			$resizeTarget.removeAttr("class").addClass('text'+incCount);
			setFontCookie(incCount,7);
			$(".reset-font").addClass('reset-font-enabled');
		return false;
		};
	});
	
	// Reset Font Size
	var fontCookie = getFontCookie();
	if(fontCookie != ''){
		$resizeTarget.removeAttr("class").addClass('text'+fontCookie);
		$(".reset-font").addClass('reset-font-enabled');
	}
	function setFontCookie(value,expiredays){
		var exdate=new Date();
		exdate.setDate(exdate.getDate()+expiredays);
		document.cookie="StoryFontSize=" +escape(value)+
		((expiredays==null) ? "" : ";expires="+exdate.toUTCString());
	}
	function getFontCookie(){
		var c_name = 'StoryFontSize';
		if (document.cookie.length>0){
			c_start=document.cookie.indexOf(c_name + "=");
			if (c_start!=-1){
				c_start=c_start + c_name.length+1;
				c_end=document.cookie.indexOf(";",c_start);
				if (c_end==-1) c_end=document.cookie.length;
				return unescape(document.cookie.substring(c_start,c_end));
			}
		}
		return "";
	}
});



//EMAIL VALIDATION
function validateEmail(){
	
	var email = $(".validate").val();
			
		if(email != 0)
		{
			if(isValidEmailAddress(email))
			{
				$(".validate").next(".valid-email").removeClass('not-valid');
				$(".validate").next(".valid-email").addClass('is-valid');
				$(".validate").next(".valid-email").text("Email address accepted!");
				return true;
				
			} else {
				$(".validate").next(".valid-email").removeClass('is-valid');	
				$(".validate").next(".valid-email").addClass('not-valid');
				$(".validate").next(".valid-email").text("Please use valid email");
				return false;
			}
		} else {
			$(".validate").next(".valid-email").removeClass('not-valid');
			$(".validate").next(".valid-email").removeClass('is-valid');
			$(".validate").next(".valid-email").text(" ");
			return false;
		}	   
};
function isValidEmailAddress(emailAddress) {
 		var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
 		return pattern.test(emailAddress);
	};

function tipsheet_checkEmail(divIdToCheck){
	var isEmail_re= /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
	var s=document.getElementById(divIdToCheck).value;
	if ((document.getElementById(divIdToCheck).value==null)||(document.getElementById(divIdToCheck).value=="")){alert("Please enter a valid email!");}else if (String(s).search(isEmail_re) == -1){alert("Please enter a valid email!");return false;}
};

//APPLY INPUT LABELS AS INPUT VALUES
$(document).ready(function(){						   
	//Show and hide input value, after applying label text as input value
	$('.input-combo-entry label').each(function() {
		var stolen = $(this).text();
		$(this).siblings('input').attr('value', stolen);
	});
	$('.input-combo-entry input').focus(function() { 
		if (this.value == this.defaultValue){ 
			this.value = ''; 
		} 
		if(this.value != this.defaultValue){ 
			this.select(); 
		} 
	}); 
	$('.input-combo-entry input').blur(function() { 
		if (this.value == ''){ 
			this.value = this.defaultValue; 
		}
	});
});



//LAUNCH COMMON WIDGETS PLUGIN
$(document).ready(function(){
	$(document).commonWidgetsJs();
});



//Reporter Alerts
$(document).ready(function(){
	var formToggle = $('.p-reporter-alert').find('.btn');
	var closeBTN = $('.p-reporter-alert').find('.close');
	formToggle.click(function(){
		var theForm = $(this).next('.form-container');
		theForm.toggleClass('enabled');
	});
	closeBTN.click(function(){
		$(this).parent().removeClass('enabled');
	});
	
});