/*!
 * Tiny Carousel 1.9
 * http://www.baijs.nl/tinycarousel
 *
 * Copyright 2010, Maarten Baijs
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/gpl-2.0.php
 *
 * Date: 01 / 06 / 2011
 * Depends on library: jQuery
 */
 
(function($){
	$.tiny = $.tiny || { };
	
	$.tiny.carousel = {
		options: {	
			start: 1, // where should the carousel start?
			display: 1, // how many blocks do you want to move at 1 time?
			axis: 'x', // vertical or horizontal scroller? ( x || y ).
			controls: true, // show left and right navigation buttons.
			pager: false, // is there a page number navigation present?
			interval: false, // move to another block on intervals.
			intervaltime: 3000, // interval time in milliseconds.
			rewind: false, // If interval is true and rewind is true it will play in reverse if the last slide is reached.
			animation: true, // false is instant, true is animate.
			duration: 1000, // how fast must the animation move in ms?
			callback: null // function that executes after every move.
		}
	};
	
	$.fn.tinycarousel = function(options) {
	$(this).disp_pgn();
		var options = $.extend({}, $.tiny.carousel.options, options);
		this.each(function(){ $(this).data('tcl', new Carousel($(this), options)); });
		return this;
	};
	$.fn.tinycarousel_start = function(){ $(this).data('tcl').start(); };
	$.fn.tinycarousel_stop = function(){ $(this).data('tcl').stop(); };
	$.fn.tinycarousel_move = function(iNum){ $(this).data('tcl').move(iNum-1,true); };
	
	//rl837c: Added below function to dynamically add the red dot (pagination) in carousel  
	$.fn.disp_pgn = function(){
		var totalArticles =  $(this).find('.overview').children('li').length;
		//alert(totalArticles);
		var str='';
		for(i=1; i<=totalArticles;i++)
		{	
			str = str +'<li><a href="#" class="pagenum" rel="'+(i-1)+'">' + i +'</a></li>';
		}
		$(this).find('.pageNav ul.pager li').css('width',8);
		var ulWidth=18*totalArticles;
		$(this).find('.pageNav ul.pager').css('width',ulWidth);
		$(this).find('.pageNav').css('width',ulWidth+44);
		$(this).find('.pageNav ul.pager').html(str);
	};

	
	
	function Carousel(root, options){
		var oSelf = this;
		var oViewport = $('.viewport:first', root);
		var oContent = $('.overview:first', root);
		var oPages = oContent.children('li');			//rl837c:Added li selector as to work only for li items.
		var oBtnNext = $('.next:first', root);
		var oBtnPrev = $('.prev:first', root);
		var oPager = $('.pager:first', root);
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
				oBtnPrev.click(function(){oSelf.move(-1); return false;});
				oBtnNext.click(function(){oSelf.move( 1); return false;});
			}
			if(options.interval){ root.hover(oSelf.stop,oSelf.start); }
			if(options.pager && oPager.length > 0){ $('a',oPager).click(setPager); }
		};
		function setButtons(){
			if(options.controls){
				oBtnPrev.toggleClass('disable', !(iCurrent > 0));
				oBtnNext.toggleClass('disable', !(iCurrent +1 < iSteps));
			}
			if(options.pager){
				var oNumbers = $('.pagenum', oPager);
				oNumbers.removeClass('active');
				$(oNumbers[iCurrent]).addClass('active');
			}			
		};
		function setPager(oEvent){
			if($(this).hasClass('pagenum')){ oSelf.move(parseInt(this.rel), true); }
			return false;
		};
		function setTimer(){
			if(options.interval && !bPause){
				clearTimeout(oTimer);
				oTimer = setTimeout(function(){
					iCurrent = iCurrent +1 == iSteps ? -1 : iCurrent;
					bForward = iCurrent +1 == iSteps ? false : iCurrent == 0 ? true : bForward;
					oSelf.move(bForward ? 1 : -1);
				}, options.intervaltime);
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
				setTimer();
			}
		};
		return initialize();
	};
})(jQuery);