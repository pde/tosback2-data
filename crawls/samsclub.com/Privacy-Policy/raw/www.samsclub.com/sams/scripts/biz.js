(function($){
/* Global Nav Holiday Text */
$('#sub-nav > .holder > .nav > li').last().prev().children('a').css('color','#c9000d');

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

/* OutdoorLiving Run-of-site banner */
try{
var categories=['1877.cp','930195.cp','930197.cp','930199.cp','1881.cp','1883.cp','1885.cp','1857.cp','1858.cp','1860.cp','1889.cp','1897.cp','1900.cp','1862.cp','1871.cp','1872.cp','110101.cp','1551.cp','110103.cp','1863.cp','1887.cp','1864.cp','1868.cp','1865.cp','5160101.cp','2780107.cp','1424.cp','1552.cp','1067.cp','1066.cp','1433.cp','5170101.cp','1373.cp','5170103.cp','1514.cp','430221.cp','5170105.cp','1499.cp'];
var url=location.href;

url=url.match(/\/(\d+\.cp)/i)[1];

if($.inArray(url,categories)>-1){
$(document).ready(function(){
$('#productMainContent').children('.twoCol-product').eq(0).prepend('<div style="width:530px;height:100px;margin-bottom:10px;"><a href="http://samsclub.com/sams/pagedetails/content.jsp?pageName=outdoorLiving&cid=INT_CC10"><img src="http://s7d2.scene7.com/is/image/samsclub/outdoor_living_runofsite?wid=530&fmt=jpg&qlt=90" width="530" height="100"></a></div>');
});
}
}catch(e){}
/* End OutdoorLiving Run-of-site banner */

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