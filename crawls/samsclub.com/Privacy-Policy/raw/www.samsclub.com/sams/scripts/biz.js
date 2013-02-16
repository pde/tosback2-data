(function($){
/* Global Nav Holiday Text */
$('#sub-nav > .holder > .nav > li > a').filter(':contains("Valentine\'s Day")').css('color','#c9000d');
/* Defect fix for the Jewelry Category flyout issue Starts*/
	$(".nav").children().each(function (index) {
	// Get count of columns inside of the dropdowns in order to set the width of the dropdown menu.
	var y = $(this).children("a").siblings().children("li").children(".dropDown_new").children(".col").size();
	var posL = $(this).position().left;
	// Also determines the placement of the dropdowns depending on the number of columns 
	if (y == 3) {
		$(this).children("a").siblings().children("li").children(".dropDown_new").css("width","530px");
	}
	if (y == 2) {
		$(this).children("a").siblings().children("li").children(".dropDown_new").css("width","400px");
	}
	if (y == 1) {
		$(this).children("a").siblings().children("li").children(".dropDown_new").css("width","190px");
	}
	if (posL == 0) {
		if (y == 3) {
			$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","0px");
		}
		if (y == 2) {
			$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","0px");
		}
		if (y == 1) {
			$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","0px");
		}
     } 
	if (posL >= 2 && posL < 100) {
		if (y == 3) {
			$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-60px");
		}
		if (y == 2) {
			$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-50px");
		}
		if (y == 1) {
			$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","0px");
		}
    } 
	if (posL >= 100 && posL < 200) {
		if (y == 3) {
			$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-100px");
		}
		if (y == 2) {
			$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-100px");
		}
		if (y == 1) {
			$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-50px");
		}
    } 
	if (posL >= 200 && posL < 300) {
		if (y == 3) {
			$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-180px");
		}
		if (y == 2) {
			$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-150px");
		}
		if (y == 1) {
			$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-50px");
		}        
    }
	if (posL >= 300 && posL < 400) {
		if (y == 3) {
			$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-260px");
		}
		if (y == 2) {
			$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-150px");
		}
		if (y == 1) {
			$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-50px");
		}
	}
	if (posL >= 400 && posL < 500) {
		if (y == 3) {
			$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-340px");
		}
		if (y == 2) {
			$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-250px");
		}
		if (y == 1) {
			$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-50px");
		}
	}
	if (posL >= 500 && posL < 600) {
		if (y == 3) {
			$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-440px");
		}
		if (y == 2) {
			$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-300px");
		}
		if (y == 1) {
			$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-50px");
		}
      }
});

/* Defect fix for the Jewelry Category flyout issue  Ends*/

/* Run of Site Banners: Valentine's Day */
try{
  var categories=['1240.cp','1628.cp','1900101.cp','1900103.cp','1261.cp'];
  var url=location.href;

  url=url.match(/\/(\d+\.cp)/i)[1];

  if ($.inArray(url,categories)>-1){
    $('#productMainContent').find('.twoCol-product-seasonalPromo').eq(0).prepend('<div style="width:530px;height:100px;margin-bottom:10px;margin-top:20px;"><a href="http://www.samsclub.com/sams/pagedetails/content.jsp?pageName=valentinesDay&cid=INT_CC68"><img src="http://s7d2.scene7.com/is/image/samsclub/Valentines_530x100?wid=530&fmt=jpg&qlt=90" width="530" height="100"></a></div>');
  }
}catch(e){}

/* Category and Product Page: Michelin Promise Plan Bug */
$('.fourThinB .michelinPromisePlan').each(function(){
  $('<a href="http://s7d2.scene7.com/is/content/samsclub/michelin_promise_planpdf" target="_blank" style="position:relative;top:5px;"><img src="http://s7d2.scene7.com/is/image/samsclub/icon-MichelinPromisePlan?wid=50&op_sharpen=1"></a>').appendTo($(this).closest('.fourThinB').find('.imgCol'));
  $(this).remove();
});

$('.buffer .michelinPromisePlan').each(function(){
   $('<a href="http://s7d2.scene7.com/is/content/samsclub/michelin_promise_planpdf" target="_blank" style="position:relative;top:5px;"><img src="http://s7d2.scene7.com/is/image/samsclub/icon-MichelinPromisePlan?wid=140&op_sharpen=1"></a>').appendTo($(this).closest('.buffer'));
   $(this).remove();
});

/* Energy Star Logo */
$('.estarlogo').append('<a href="http://www.samsclub.com/sams/pagedetails/content.jsp?pageName=energyStar"></a>')
$('.estarlogo').bind('click', function() {
  window.location = 'http://www.samsclub.com/sams/pagedetails/content.jsp?pageName=energyStar';
});

})(jQuery);

/* Homepage Slideshow */
var curSlide;
var nexSlide;
var maxSlide;
var play;

function adSlides() {
  var slides = '<div id="slideshow_control_0" style="margin-left: 0 !important; background-position: -15px 0;"></div>';
  var slideControls = $('#slideshow_controls');
  for (var i = 1; i < maxSlide; i++) {
    slides += '<div id="slideshow_control_' + String(i) + '"></div>';
  }

  slideControls.prepend(slides + '<span style="display: block; clear:both;"></span>');
  slideControls.css('width',String((maxSlide*20)+(maxSlide-1)*5));
  
  slideControls.delegate('div', 'click', function () {
    var a = $(this).attr('id');
    upSlides(Number(a.charAt(a.length - 1)));
  });

  $('#slideshow').one('mouseover', function () {
    clearInterval(play);
  });
}
function upSlides(i) {
  if(curSlide == i) return;
  $('#slideshow_control_' + String(curSlide)).css('background-position', '0px 0px');
  $('#slideshow_control_' + String(i)).css('background-position', '-15px 0px');
  $('#slide_' + String(curSlide)).fadeOut('fast');
  curSlide = i;
  $('#slide_' + String(curSlide)).fadeIn('fast');
}
function playSlideshow() {
  if (++nexSlide >= maxSlide) nexSlide = 0;
  upSlides(nexSlide);
}
if(location.href.indexOf('homepage.jsp') != -1){
  maxSlide = $('#slide_holder').children('div').length;

  adSlides();
  curSlide = nexSlide = 0;
  play = setInterval("playSlideshow()", 5500);
}