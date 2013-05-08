// fixes $ / mrm.$ jQuery conflict call between site and gmds app
var mrm = mrm || {}; mrm.$ = mrm.$ || jQuery;

// override if console unavailable.
if (typeof console == "undefined") {
	window.console = {
		log: function () {}
	};
}

function locationWrapper( url ){
	if ( $.browser.msie ) {
		var referLink = document.createElement('a');
		referLink.href = url;
		referLink.setAttribute("target", "_blank");
		document.body.appendChild(referLink);
		referLink.click();
	} else {
		//window.location = url;
		window.open(url);
	}
}


function addBodyClass(){
   navigator.userAgent.indexOf('Android')>-1?$('body').addClass('android mobile'):navigator.platform=='iPad'?$('body').addClass('ipad mobile'):navigator.platform=='iPhone'?$('body').addClass('iphone mobile'):donothing=true;

	if($('body').hasClass('iphone') || $('body').hasClass('ipad')){
		var uaVerString=navigator.userAgent.split('OS')[1];
		var os=parseInt(uaVerString.substring(0,4));

		if(os<5){
			$('body, html').addClass('ver4');
		}
		else{
			$('body').addClass('ver5');
		}
	}
	if(window.location.href.indexOf('/investors')>-1)
		$('body').addClass('investors-page');

	if(window.location.href.indexOf('/faqs')>-1)
		$('body').addClass('faq-page');
			
	if($('body').hasClass('mobile')){
		if(window.orientation==0 || window.orientation==180)
			$('html').addClass('portrait');
		else
			$('html').addClass('landscape');
			

	}
	
	// class for video gallery styles
	if ( $('div.flexVideoGallery').length > 0 ) { $('body').addClass('videoPage'); }
	
	// class for contact submit confirm
	if(window.location.href.indexOf('contactUsForm.extapp.html')>-1)
		$('body').addClass('submitted');
}

function getLocationFromUrl(targArray){
	isLoc=false;
	for(i in targArray){
		if(window.location.href.indexOf(targArray[i])>-1){
			isLoc=true;
			break;
		}
	}
	return isLoc;
}


var lastOrient,orientInterval,loc;


function orient() {
	var widthSize = $(window).width();
	if (widthSize < 1024 && widthSize > 768 ) {
	$("html").addClass("landscape").removeClass("portrait");
	orientation = 'landscape';
	 
	return false;
	}
	else if (widthSize<768) {
	$("html").addClass("portrait").removeClass("landscape");
	orientation = 'portrait';
	 
	return false;
	}
}
 
 // add body class for contentpagetwocolumn alternate layout (diversity, foundation, etc.)
function findMenuBox(){
	if($('div.menu_box').length)
 		$('body').addClass('menuboxpage');

}




$(document).ready( function(){

 if($('body').hasClass('contentpagetwocolumn'))
 	findMenuBox();
	
	// resolve dropdown offsecreen
	// if($('#primaryNavigation').innerWidth()<1274)
	// 	$('#primaryNavigation ul li ul').css({left:0, right:'auto'});


 //if($('body').hasClass('tabpage'))
	$('meta[name="viewport"]').replaceWith('<meta name="viewport" content="width=content-width, initial-scale=0.92 maximum-scale=1.0 minimum-scale=0.92" />');


	addBodyClass();
	lastOrient=window.orientation;
	

//add vignette to ipad and desktop non-flash brand pages
	if($('body').hasClass('ipad') && $('body').hasClass('brandpage')){
		$('body').append('<div id="vignette" ><img src="/etc/designs/gmcom/images/vignette.png"></div>');
	}
	
if(!($('html').hasClass('mac') && $('html').hasClass('safari'))){
	$( 'div#primaryNavigation > ul' ).fill({
		elements : 'li',
		fill     : 'li#blackFill'
	});
}

	$( 'li#vehicles, li#vision, li#company' ).primaryNavigationSlideDown();

	$( 'li#GMLogo' ).click( function(){
		location.href = "/content/gmcom/home.html";
	});

	$( 'li#contactUs, li#allGMSites' ).each( function(){
		if( typeof( Cufon ) == 'function' && Cufon.replace ){
			Cufon.replace( $( this ).children( 'h2' ).children( 'a' ), { fontFamily: 'gotham-bold', hover: true });
		}
	});


	// header search field
	//$('li#search div.clearfix').append('<span class="searchprompt">Search</span>');
	var searchprompt=$('li#search span.searchprompt'),
	 	searchaction=$('li#search a#searchAction'),
	 	searchform=$('li#search form[name="google"]'),
	 	searchinput=$('li#search input'),
	 	formaction=searchform.attr('action');

	 searchform.removeAttr('action');


	searchinput.bind({
	 	keydown : function(e){

	 		searchprompt.text("");

			if($(this).val()==="" && e.which===32) // prevent initial white space
				return false;

			if(e.which===13) // prevent page reload on empty val submit
				return false;

		},
		focus:function(e){

	 		searchprompt.text("");

			if($(this).val()==="" && e.which===32) // prevent initial white space
				return false;

			if(e.which===13) // prevent page reload on empty val submit
				return false;

		},
		keyup : function(e){

			if(e.which===13){
				searchFormSubmit();
				searchUI($(this));
				return false;
			}
			else
				searchUI($(this));

		},
		blur : function(){

			searchUI($(this));

		},
		change : function(){

			searchUI($(this));

		}

	 }).val('');

	 searchprompt.click(function(){searchinput.focus();});
	 
	 searchaction.click(function(){

			searchFormSubmit();
			return false;

	 });

	 function searchUI(input){

 		if(input.val()===""){
	 		searchprompt.text("Search");
	 		searchaction.removeClass('on');
	 	}
	 	else
	 		searchaction.addClass('on');

	 }

	 function searchFormSubmit(){

	 	if(searchinput.val()==="")
	 		return false;
	 	else{
	 		searchform.attr('action', formaction);
	 		searchform.submit();
	 	}

	 	return false;

}



	$('div#auxiliaryNavigation ul.right li').eq(7).addClass("last");
	
	orient();
	
	/* Call orientation function on orientation change */
	$(window).bind( 'resize', function(e){
		orient();
	});
	/****************/ 



	
});

 
