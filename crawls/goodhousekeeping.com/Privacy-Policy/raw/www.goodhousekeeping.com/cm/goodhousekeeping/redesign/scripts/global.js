/* Good Housekeeping - global.js
*	- This script should contain all scripts needed for GH specific interactions.
*	- Make sure to use functions from HDM-Lib when possible to avoid reinventing the wheel.
*******************************/
//copy the following skeleton and wrap your scripts in it
(function(){
	//your script goes here
})();
//GHK object
if (!window.GHK){ GHK = {}; }
//GHK brightcove players
GHK.players = {
	EAG: {
		bgcolor: '#FFFFFF',
		wmode: 'transparent',
		autoplay: 'false',
		playerKey: 'AQ~~,AAAAAPabOcE~,lXG6kSTz6i9y4OLUEU5qtRux8p1L-gOW',
		playerID: '4137675001',
		width: 480,
		height: 360,
		isVid: 'true',
		isUI: 'true',
		dynamicStreaming: 'true'
	}
};
//function that returns product recall xml feeds.. type can be 'fda' or 'cpsc', also takes a callback
GHK.getRecallsXML = function(type,callback){
	var requestURL,
		recallType = type || 'fda',
		recallCallback = callback || function(){};
	if (recallType == 'fda'){ requestURL = '/api_static/rssRecalls.xml'; }
	if (recallType == 'cpsc'){ requestURL = '/cpscpub/prerel/prerelchild.xml'; }
	$.ajax({
		url: requestURL,
		dataType: 'xml',
		success: function(xml){
			recallCallback(xml);
		},
		error: function(e){
			recallCallback('error',e);
		}
	});	
};
//smart tout tracking
$(function(){
	var $links = $('#moduleSmartTout a');
	$links.click(function(){
		if (typeof eventTracking !== 'undefined'){
			eventTracking('event46');
		}
	});
});
//right rail recall module
$(function(){
	var $fdaList, $cpscList;
	//FDA stuff
	$fdaList = $('#fdaRecallList');
	if ( $fdaList.length > 0 ){
		GHK.getRecallsXML('fda',function(){
			if (typeof(arguments[0]) == 'string' && arguments[0] == 'error'){
				$fdaList.html('<li>Error loading FDA Recalls. Please check back later.</li>');
				return;
			}
			
			var xml = arguments[0],
				$items = $(xml).find('item').slice(0,2);

			$fdaList.children().fadeOut('fast').remove();
			$items.each(function(){
				var recallHTML, $item = $(this);
				recallHTML = '<li><a href="' + $item.find('link').text() + '" title="Click to Read More">' + $item.find('title').text() + '</a></li>';
				$fdaList.append(recallHTML);
			});
		});
	}
	//CPSC stuff
	$cpscList = $('#cpscRecallList');
	if ( $cpscList.length > 0 ){
		GHK.getRecallsXML('cpsc',function(){
			if (typeof(arguments[0]) == 'string' && arguments[0] == 'error'){
				$cpscList.html('<li>Error loading CPSC Recalls. Please check back later.</li>');
				return;
			}
			var xml = arguments[0],
				$items = $(xml).find('item').slice(0,2);

			$cpscList.children().fadeOut('fast').remove();
			$items.each(function(){
				var recallHTML, $item = $(this);
				recallHTML = '<li><a href="' + $item.find('link').text() + '" title="Click to Read More">' + $item.find('title').text() + '</a></li>';
				$cpscList.append(recallHTML);
			});
		});
	}
});
//initialize sliding right rail modules
$(function(){
	var $modules = $('#rightRail .module').not('#moduleSocialLinks, .home #moduleGames, #moduleKitchenMagician, #moduleEssentialTools');	//add modules to be excluded in the .not()
	//call our slideModule jQuery plugin.. contained in hdm-lib
	$modules.slideModule();
});
//this is for the newsletter signup input
$(function(){
	var $input = $('#vt_nl_emailfield'),
		placeholderText = $input.val();
	$input.focus(function(){
		if ( $input.val() == placeholderText ){
			$input.val('');
		}
	});
	$input.blur(function(){
		if ( ! $input.val() ){
			$input.val(placeholderText);
		}
	});
});
/**Javascript for module KitchenMagician**/
$('#kitchenMagicianForm select').dropDownSelectBox();
$('#calorie_counter_formwrapper .activity select').dropDownSelectBox();
$('#kitchenMagicianForm a.ghkButton').click(function(){	
	var url = '/search/fast_search_recipes/?search_term=';
	var valid = false;
	$("#kitchenMagicianForm select").each(function(){
		var selected = $(this).find('option:selected').attr('value');
		if (selected != '') {
			var arg = $(this).attr('name');	
			url += '&' + arg + '=' + selected;
			valid = true;
		}
	});
	window.location.href = url;
	return false;
});

/* End Javascript for module KitchenMagician**/
/**Javascript for module EssentialTools**/
$(document).ready(function(){
	$("#catalog").multiselect({
		noneSelectedText: 'Catalog', 
		selectedText: 'Catalog',
		header: false
	});
	
   
	$("#stain").multiselect({
		noneSelectedText: 'Stain',
		selectedText: 'Stain',
		header: false
	});
});

/* prevent exec script in search box */
$(document).ready(function(){
            
            $("form[action='/search/'] a")
            .attr("href","#")
            .click(function(e){
                        e.preventDefault();
                        $(this).parents("form").submit();    
            });

            $("form[action='/search/']").submit(function(){
                        $input = $("input[name=q]",this);
                        //get unsafe search string 
                        var s = $input.val();
                        //replace
                        s = s.replace(/</g,'&lt;').replace(/>/g,'&gt;');
                        //set safe search string 
                        $input.val(s);
            });

});

/**End Javascript for module EssentialTools**/
// For Homepage Good to Know Articles
$(document).ready(function(){
	if ($("#goodRight").height() > 351) {
		$("#goodRight").css({"overflow" : "hidden", "height" : "351px"});
	}
});
// Using for all carousel.
(function(){
	if($('#carousel').length) {				
		// get number channel in div carousel
		var arrayChannel=$('#listChannel ul li');
		
		// number page of channel
		var channelPage = (arrayChannel.length)/4;
		if(channelPage > Math.round(channelPage)){
			channelPage = Math.round(channelPage + 1);
		}
		else 
			channelPage = Math.round(channelPage);
		
		// set width for ul
		var ulWidth = channelPage * 560;
		$('#listChannel ul').width(ulWidth);
		
		
			//set number dot
			for(var i=0; i<channelPage; i++){
				$('.dotPage ul').append('<li id="' + i + '" class="dot">&bull;</li>');
			}		
		
			// set attribute for dots
			var arrayDot = $('.dot');
			for(var i=0;i<arrayDot.length;i++){
				var id='#'+i;
				if(i==0){
					$(id).css({'color':'#ED0677','float':'left','cursor':'pointer'});
				}
				else
					$(id).css({'color':'#999999','float':'left','padding-left':'3px','cursor':'pointer'});
			}
		
		if(channelPage == 1){
			$('#btnPrev').unbind("click");
			$('#btnNext').unbind("click");
			$('.dotPage ul li').unbind("click");
		}
		
		var speed = 400;
		var maxMargin=0;
		var marginCount=0;
		var minMargin = -ulWidth;
		var tempDot = 0;
		
		$('#btnNext').click(function(){
			if(marginCount+(-560) > minMargin){
				marginCount = marginCount + (-560);
				$('#listChannel ul').animate({marginLeft:marginCount}, speed);		
				changeDot();
			}
			showArrow();
			return false;
		});
		
		$('#btnPrev').click(function(){
			if(marginCount-(-560) <= maxMargin){
				marginCount = marginCount - (-560);
				$('#listChannel ul').animate({marginLeft:marginCount}, speed);				
				changeDot();
			}
			showArrow();
			return false;
		});
		
		function showArrow(){
			if(marginCount-(-560) <= 0 && marginCount+(-560) > minMargin){
				$('#btnPrev').css("visibility","visible");
				$('#btnNext').css("visibility","visible");
			}
			if(marginCount == maxMargin){
				$('#btnPrev').css("visibility","hidden");
				$('#btnNext').css("visibility","visible");
			}
			if(marginCount - minMargin == 560){
				$('#btnPrev').css("visibility","visible");
				$('#btnNext').css("visibility","hidden");
			}
			if(arrayChannel.length <= 4) {
				$('#btnPrev').css("visibility","hidden");
				$('#btnNext').css("visibility","hidden");
			}
		}
		
		function changeDot(){
			// set previous dot back to default color
			var id = '#' + tempDot;
			$(id).css({'color':'#999999'});
			
			// get id new dot
			var idDot = -marginCount/560;
			tempDot = idDot;
			
			// set color current dot to current color
			id = '#' + tempDot;
			$(id).css({'color':'#FF0066'});
		}
		
		$('.dotPage ul li').click(function(){
			var id = '#' + tempDot;
			$(id).css({'color':'#999999'});
			
			var idDot = this.id;
			tempDot = idDot;
			
			// set color current dot to current color
			id = '#' + tempDot;
			$(id).css({'color':'#FF0066'});
			
			marginCount = idDot*(-560);
			$('#listChannel ul').animate({marginLeft:marginCount}, speed);
			
			showArrow();
			
		});
		
		showArrow();
		return false;
	}
})();

(function($) {
	$.fn.carousel = function(options) {
		options = $.extend($.fn.carousel.defaults, options);
		
		return this.each(function() {
			if($(this).length) {
				// get number channel in div carousel
				var itemList = $('#listChannel ul li');
				itemList.css('padding-left', options.itemSpacing + 'px');
				
				// number page of carouse
				var page = (itemList.length)/options.items;
				page = (page > Math.round(page)) ? Math.round(page + 1) : Math.round(page);

				var liWidth = options.itemWidth + 2;
				itemList.width(liWidth);
				
				var frameWidth = options.items * liWidth + (options.items - 1) * options.itemSpacing;
				$('#listChannel').width(frameWidth + 1);
				
				// set width for ul
				var ul = $('#listChannel ul');
				var ulWidth = page * frameWidth;
				ul.width(ulWidth);
				
				var maxMargin=0;
				var marginCount=0;
				var minMargin = -ulWidth;
				var tempDot = 0;
				var addMargin = -options.itemSpacing;

				ul.css('margin-left', addMargin + 'px');
				$('#btnNext').click(function(){
					if(marginCount+(-frameWidth) > minMargin){
						addMargin = addMargin + (-options.itemSpacing) + 1;
						marginCount = marginCount + (-frameWidth);
						ul.animate({marginLeft: marginCount + addMargin}, options.speed);
					}
					showArrow();
					return false;
				});
				
				$('#btnPrev').click(function(){
					if(marginCount-(-frameWidth) <= maxMargin){
						addMargin = addMargin - (-options.itemSpacing) - 1;
						marginCount = marginCount - (-frameWidth);
						ul.animate({marginLeft: marginCount + addMargin}, options.speed);
					}
					showArrow();
					return false;
				});
				
				function showArrow(){
					if(marginCount-(-frameWidth) <= 0 && marginCount+(-frameWidth) > minMargin){
						$('#btnPrev').css("visibility","visible");
						$('#btnNext').css("visibility","visible");
					}
					if(marginCount == maxMargin){
						$('#btnPrev').css("visibility","hidden");
						$('#btnNext').css("visibility","visible");
					}
					if(marginCount - minMargin == frameWidth){
						$('#btnPrev').css("visibility","visible");
						$('#btnNext').css("visibility","hidden");
					}
					if(itemList.length <= options.items) {
						$('#btnPrev').css("visibility","hidden");
						$('#btnNext').css("visibility","hidden");
					}
				}
				
				showArrow();
			}
		});
	}
	
	$.fn.carousel.defaults = {
		items: 6,
		itemWidth: 120,
		itemSpacing: 25,
		speed: 800
	};
})(jQuery);
$(function() {		/* lazy images */
    var b, e, lazyLoad;
    b = $(window);
    e = $('.lazyImage');		
    lazyLoad = function () {
        e = $('.lazyImage');		
		$.each(e, function () {
            var c = $(this),
                a, d;
            a = c.offset();
            d = c.data();			
            if (!d.loaded && a.top <= b.height() + b.scrollTop()) {
                a = new Image, a._parent = c, a.onload = function () {					
                    this._parent.prepend(this);
                    $(this).fadeIn('slow');
                    $(this).css('display', 'block');
                    this._parent.removeClass('lazyImage')
                }, $.extend(a, d), c.data('loaded', !0), e = $('.lazyImage');
            }
        });
    };
    lazyLoad();
    b.scroll(lazyLoad);
    b.resize(lazyLoad);
    window.lazyLoad = lazyLoad;
});
