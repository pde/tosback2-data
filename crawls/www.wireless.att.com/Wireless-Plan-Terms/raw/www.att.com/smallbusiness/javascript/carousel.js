(function($){
	$.carousel = {
		options: {	
			start: 1, // where should the carousel start?
			display: 1, // how many blocks do you want to move at 1 time?
			axis: 'x', // vertical or horizontal scroller? ( x || y ).
			controls: true, // show left and right navigation buttons.
			animation: true, // false is instant, true is animate.
			duration: 1000, // how fast must the animation move in ms?
			callback: null, // function that executes after every move.
			homePage: false // showing different left/right buttons for home page
		}
	};
	
	$.fn.carousel = function(options) {
		var options = $.extend({}, $.carousel.options, options);
		this.each(function(){ $(this).data('carousel', new Carousel($(this), options)); });
		return this;
	};
	$.fn.carousel_start = function(){ $(this).data('carousel').start(); };
	$.fn.carousel_stop = function(){ $(this).data('carousel').stop(); };
	$.fn.carousel_move = function(iNum){ $(this).data('carousel').move(iNum-1,true); };
	
	function Carousel(root, options){
		var oSelf = this;
		var oViewport = $('.viewport:first', root);
		var oContent = $('.overview:first', root);
		var oPages = oContent.children();
		var oBtnNext = $('.next:first', root);
		var oBtnPrev = $('.prev:first', root);
		var iPageSize, iSteps, iCurrent, oTimer, bPause, bForward = true, bAxis = options.axis == 'x';
		
		function initialize(){
			iPageSize = bAxis ? $(oPages[0]).outerWidth(true) : $(oPages[0]).outerHeight(true);
			var iLeftover = Math.ceil(((bAxis ? oViewport.outerWidth() : oViewport.outerHeight()) / (iPageSize * options.display)) -1);
			iSteps = Math.max(1, Math.ceil(oPages.length / options.display) - iLeftover);
			iCurrent = Math.min(iSteps, Math.max(1, options.start)) -2;
			oContent.css(bAxis ? 'width' : 'height', (iPageSize * oPages.length));
			oSelf.move(1);
			setEvents();
			return oSelf;
		};
		function setEvents(){
			if(options.controls && oBtnPrev.length > 0 && oBtnNext.length > 0){
				oBtnPrev.click(function(){
					if($('.prev').attr('href')!= undefined){
						oSelf.move(-1);
					}
					return false;
				});
				oBtnNext.click(function(){
					if($('.next').attr('href')!= undefined){
						oSelf.move( 1); 
					}
					return false;
				});
			}
			if(! options.controls){oBtnNext.addClass('disable');oBtnPrev.addClass('disable');}
		};
		function setButtons(){
			if(options.controls && !options.homePage){
				if(!(iCurrent > 0)){
					oBtnPrev.removeAttr('href');
					oBtnPrev.find('img').attr('src','/smallbusiness/images/arrows/carousel_tab_inactive_left.gif');
				}
				else{
					oBtnPrev.attr('href','#');
					oBtnPrev.find('img').attr('src','/smallbusiness/images/arrows/carousel_tab_active_left.gif');
				}
				if(!(iCurrent +1 < iSteps)){
					oBtnNext.removeAttr('href');
					oBtnNext.find('img').attr('src','/smallbusiness/images/arrows/carousel_tab_inactive_right.gif');
				}
				else{
					oBtnNext.attr('href','#');
					oBtnNext.find('img').attr('src','/smallbusiness/images/arrows/carousel_tab_active_right.gif');
				}
			}
			else if ( options.controls && options.homePage){
						if(!(iCurrent > 0)){
							oBtnPrev.removeAttr('href');
							oBtnPrev.find('img').attr('src','/smallbusiness/images/arrows/carousal_disabled_leftarrow.png');
						}
						else{
							oBtnPrev.attr('href','#');
							oBtnPrev.find('img').attr('src','/smallbusiness/images/arrows/carousal_leftarrow_img.png');
						}
						if(!(iCurrent +1 < iSteps)){
							oBtnNext.removeAttr('href');
							oBtnNext.find('img').attr('src','/smallbusiness/images/arrows/carousal_disabled_rightarrow.png');
						}
						else{
							oBtnNext.attr('href','#');
							oBtnNext.find('img').attr('src','/smallbusiness/images/arrows/carousal_rightarrow_img.png');
						}
			}
				
		};
		
		this.stop = function(){ clearTimeout(oTimer); bPause = true; };
		this.start = function(){ bPause = false; setTimer(); };
		this.move = function(iDirection, bPublic){
				iCurrent = bPublic ? iDirection : iCurrent += iDirection;
				if(iCurrent > -1 && iCurrent < iSteps){
					var oPosition = {};
					oPosition[bAxis ? 'left' : 'top'] = -(iCurrent * (iPageSize * options.display));	
					oContent.animate(oPosition,{
						queue: false,
						duration: options.animation ? options.duration : 0,
						complete: function(){
							if(typeof options.callback == 'function')
							options.callback.call(this, oPages[iCurrent], iCurrent);
						}
					});
					setButtons();				
				}
		};
		return initialize();
	};
})(jQuery);