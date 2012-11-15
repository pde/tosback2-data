// JavaScript Document


 
	
	$(function() {
$('#chooseState').lightBox();
});

function showLanguageDrop(sel) {
	value = sel.options[sel.selectedIndex].value;
	dropLang = '#' + value; 
	$('#lang-drop option').removeClass('lightboxon');
	$(dropLang).addClass('lightboxon');
	$("#chooseLang").trigger('click');
}

browser = navigator.userAgent;
checkMac = browser.indexOf('Macintosh');
if(checkMac !='-1'){checkMacFF = browser.indexOf('Firefox')}
checkOpera = browser.indexOf('Opera'); 
 
$(document).ready(function() {

 
	
/*TERTIARY GLOBAL MENUS*************************************** */	
 
		//TERTIARY INTERNET
		$('#tlink-internet ').mouseenter(function() {
			$('.secondary-menu a').css('background','none').css('border','none');
			 	$('.tertiary-menu').hide();
				$('#tmenu-internet').show();
		}); 
		 
		$('#tlink-internet a').hover(function() { 
				$('#tmenu-internet').show();
		}); 
		
		//TERTIARY ADVANCED TV
		$('#tlink-advancedtv ').mouseenter(function() {
			$('.secondary-menu a').css('background','none').css('border','none');
			 	$('.tertiary-menu').hide();
				$('#tmenu-advancedtv').show();
		}); 
		 
		$('#tlink-advancedtv a').hover(function() { 
				$('#tmenu-advancedtv').show();
		});  
		
		//TERTIARY HOME PHONE
		$('#tlink-homephone ').mouseenter(function() {
			$('.secondary-menu a').css('background','none').css('border','none');
			 	$('.tertiary-menu').hide();
				$('#tmenu-homephone').show();
		}); 
		 
		$('#tlink-homephone a').hover(function() { 
				$('#tmenu-homephone').show();
		}); 
		
		//TERTIARY U-VERSE
		$('#tlink-uverse ').mouseenter(function() {
			$('.secondary-menu a').css('background','none').css('border','none');
			 	$('.tertiary-menu').hide();
				$('#tmenu-uverse').show();
		}); 
		 
		$('#tlink-uverse a').hover(function() { 
				$('#tmenu-uverse').show();
		}); 
		
		
 
		 
		$('.secondary-menu ul').mouseleave(function() { 
				$('.tertiary-menu').hide();
			$('.secondary-menu a').css('background','none').css('border','none');
		}); 
		$('a.nosub').hover(function() { 
				$('.tertiary-menu').hide();
			$('.secondary-menu a').css('background','none').css('border','none');
		}); 
		$('.tertiary-menu ').mouseleave(function() {
			 	$('.tertiary-menu').hide(); 
			$('.secondary-menu a').css('background','none').css('border','none');
		});  
	 

	
	 $('.tertiary-menu').hide();
	 
	 
	 
	 
 /*HOME PAGE ANIMATED BANNER CONTROLS *********************************************************** */  	 
	 
$('#comprar #banner-pause').click(function() { 
	$('#comprar #banner').cycle('pause');
	$('#banner-pause').css('display','none');
	$('#banner-play').css('display','block');
});	 
$('#comprar #banner-play').click(function() {  
	$('#comprar #banner').cycle('resume');
	$('#banner-pause').css('display','block');
	$('#banner-play').css('display','none');
}); 	 
	 
 /*NEWSROOM LANDING PAGE ANIMATED BANNER CONTROLS *********************************************************** */  	 
	 
$('#newsroom #banner-pause').click(function() { 
	$('#newsroom #banner').cycle('pause');
	$('#banner-pause').css('display','none');
	$('#banner-play').css('display','block');
});	 
$('#newsroom #banner-play').click(function() {  
	$('#newsroom #banner').cycle('resume');
	$('#banner-pause').css('display','block');
	$('#banner-play').css('display','none');
}); 

 /*ABOUT US LANDING PAGE ANIMATED BANNER CONTROLS *********************************************************** */  	 
	 
$('#about-us #banner-pause').click(function() { 
	$('#about-us #banner').cycle('pause');
	$('#banner-pause').css('display','none');
	$('#banner-play').css('display','block');
});	 
$('#about-us #banner-play').click(function() {  
	$('#about-us #banner').cycle('resume');
	$('#banner-pause').css('display','block');
	$('#banner-play').css('display','none');
});    
   
 /*SOCIAL MEDIA ANIMATED BOX *********************************************************** */  
   


   $('#social-media-anilink').toggle(
   
   function() {
	$('#social-media-anibox').css('display','block');   	
 $('#social-media-anibox').animate({ 
    top: '32px'
  }, 1000, function() { 
  }); 
 $('#social-media-btn').fadeOut('slow');  
}, 
function() {  	
  $('#social-media-anibox').animate({ 
    top: '-160px'
  }, 1000, function() { 
  }); 
  $('#social-media-btn').fadeIn('slow');  
}); 
   
 

// ******************   HEADER-DRIVEN OPEN/CLOSE FUNCTIONALITY ******************************************
						   
		$('div.help-btn').toggle(
      function () {
				$(this).next().slideDown('slow');	 
				$(this).css('background-image','url(/mlcomm/_images/content/icn_minus_blue.jpg)');	
      },
      function () {
				$(this).next().slideUp('slow');	
				$(this).css('background-image','url(/mlcomm/_images/content/icn_plus_blue.jpg)');	 
      }
    );
		$('.help-content').hide();
		
		
	$('div#openAll').click(function() {
					$('div.help-content').slideDown('slow');
					$('.help-btn').css('background-image','url("/mlcomm/_images/content/icn_minus_blue.jpg")');
		
		})
						   
		$('div#closeAll').click(function() {
					$('div.help-content').slideUp('slow');
					$('.help-btn').css('background-image','url("/mlcomm/_images/content/icn_plus_blue.jpg")');
		
		})





// *****************MENU-DRIVEN SHOW HIDE FUNCTIONALITY ******************************************


						currentTab=location.href;
						trimTab = currentTab.indexOf('tab=');
						if(trimTab != '-1') {
						currentTab = currentTab.substr(trimTab+4); 
						checkAnc = currentTab.indexOf('#')
						if(checkAnc != "-1"){currentTab = currentTab.substring(0,checkAnc); } 
				 
						
						if(currentTab == '0') {tab = '0'}
						if(currentTab.length == 1) {currentTab = '0' + currentTab;}
						$('.menu-box').hide();
						currentItem = '#item' + currentTab;  
						currentTab='#mbox' + currentTab; 
						$('.menu-item').removeClass('active');
						if($('#left-content').is('.hs-internet')) {
					    if(region == 'bellsouth') {currentItem = '#bellsouth-menu ' + currentItem}
						} 
						$(currentItem).addClass('active'); 
						$(currentTab).show(); 
						}
						else {
						$('#archive-menu ul li:first-child').addClass('active');
						$('#news-box div:first-child').show();
						}
 
						$('.menu-item').click(function() {
									$('.menu-box').hide();
									$('.menu-item').removeClass('active');
									var current= $(this).attr('id'); 
									current=current.substr(4);
									current='#mbox' + current; 
									$(this).addClass('active');
									$(current).show(); 
						});
						 

   
 });







