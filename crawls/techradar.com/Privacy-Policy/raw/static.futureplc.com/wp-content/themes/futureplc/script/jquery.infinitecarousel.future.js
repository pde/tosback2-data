/*
 * jQuery infinitecarousel plugin CUSTOM VERSION FOR FUTURE PUBLISHING
 * @author admin@catchmyfame.com - http://www.catchmyfame.com
 * @version 1.2.2
 * @date September 16, 2009
 * @category jQuery plugin
 * @copyright (c) 2009 admin@catchmyfame.com (www.catchmyfame.com)
 * @license CC Attribution-Share Alike 3.0 - http://creativecommons.org/licenses/by-sa/3.0/
 */

(function($){
	$.fn.extend({
		infiniteCarousel: function(options)
		{
			var defaults =
			{
				transitionSpeed : 1500,
				displayTime : 6000,
				textholderHeight : .2,
				displayProgressBar : 1,
				displayThumbnails: 1,
				displayThumbnailNumbers: 1,
				displayThumbnailBackground: 1,
				thumbnailWidth: '20px',
				thumbnailHeight: '20px',
				thumbnailFontSize: '.7em'
			};
		var options = $.extend(defaults, options);

    		return this.each(function() {
//    			var randID = Math.round(Math.random()*100000000);
    			var randID = '_futureCarousel';
				var o=options;
				var obj = jQuery(this);
				var curr = 1;

				var numImages = jQuery('img', obj).length; // Number of images
				var imgHeight = jQuery('img:first', obj).height();
				var imgWidth = jQuery('img:first', obj).width();
				var autopilot = 1;

//				jQuery('p', obj).hide(); // Hide any text paragraphs in the carousel
				jQuery(obj).width(imgWidth).height(imgHeight);

				// Build progress bar
				if(o.displayProgressBar)
				{
					jQuery(obj).append('<div id="progress'+randID+'" style="position:absolute;bottom:0;background:#bbb;left:'+jQuery(obj).css('paddingLeft')+'"></div>');
					jQuery('#progress'+randID).width(imgWidth).height(5).css('opacity','.5');
				}

				// Move last image and stick it on the front
				jQuery(obj).css({'overflow':'hidden','position':'relative'});
				jQuery('li:last', obj).prependTo(jQuery('ul', obj));
				jQuery('ul', obj).css('left',-imgWidth+'px');
				jQuery('ul',obj).width(9999);

				jQuery('ul',obj).css({'list-style':'none','margin':'0','padding':'0','position':'relative'});
				jQuery('li',obj).css({'display':'inline','float':'left'});

				// Build textholder div thats as wide as the carousel and 20%-25% of the height
				jQuery(obj).append('<div id="textholder'+randID+'" class="textholder" style="position:absolute;bottom:0px;margin-bottom:'+-imgHeight*o.textholderHeight+'px;left:'+jQuery(obj).css('paddingLeft')+'"></div>');
				var correctTHWidth = parseInt(jQuery('#textholder'+randID).css('paddingTop'));
				var correctTHHeight = parseInt(jQuery('#textholder'+randID).css('paddingRight'));
				jQuery('#textholder'+randID).width(imgWidth-(correctTHWidth * 2)).height((imgHeight*o.textholderHeight)-(correctTHHeight * 2)).css({'backgroundColor':'#FFF','opacity':'1'});
				showtext(jQuery('li:eq(1) div', obj).html());

				// Prev/next button(img)
				html = '<div id="btn_rt'+randID+'"><a href="javascript:void(0);"><img style="border:none;margin-right:2px" src="/wp-content/themes/futureplc/images/carousel/button-r.png" alt="Next" /></a></div>';
				html += '<div id="btn_lt'+randID+'"><a href="javascript:void(0);"><img style="border:none;margin-left:2px" src="/wp-content/themes/futureplc/images/carousel/button-l.png" alt="Previous" /></a></div>';
				jQuery(obj).append(html);

				// Pause/play button(img)
				html = '<a href="javascript:void(0);"><img id="pause_btn'+randID+'" src="/wp-content/themes/futureplc/images/carousel/button-1.png" style="position:absolute;top:3px;right:3px;border:none" alt="Pause" /></a>';
				html += '<a href="javascript:void(0);"><img id="play_btn'+randID+'" src="/wp-content/themes/futureplc/images/carousel/button-1.png" style="position:absolute;top:3px;right:3px;border:none;display:none;" alt="Play" /></a>';
//				jQuery(obj).append(html);
				jQuery('#pause_btn'+randID).css('opacity','.5').hover(function(){jQuery(this).animate({opacity:'1'},250)},function(){jQuery(this).animate({opacity:'.5'},250)});
				jQuery('#pause_btn'+randID).click(function(){
					autopilot = 0;
					jQuery('#progress'+randID).stop().fadeOut();
					clearTimeout(clearInt);
					jQuery('#pause_btn'+randID).fadeOut(250);
					jQuery('#play_btn'+randID).fadeIn(250);
//					showminmax();
				});
				jQuery('#play_btn'+randID).css('opacity','.5').hover(function(){jQuery(this).animate({opacity:'1'},250)},function(){jQuery(this).animate({opacity:'.5'},250)});
				jQuery('#play_btn'+randID).click(function(){
					autopilot = 1;
					anim('next');
					jQuery('#play_btn'+randID).hide();
					clearInt=setInterval(function(){anim('next');},o.displayTime+o.transitionSpeed);
					setTimeout(function(){jQuery('#pause_btn'+randID).show();jQuery('#progress'+randID).fadeIn().width(imgWidth).height(5);},o.transitionSpeed);
				});

				// Left and right arrow image button actions
				jQuery('#btn_rt'+randID).css('opacity','.75').click(function(){
					autopilot = 0;
					jQuery('#progress'+randID).stop().fadeOut();
					anim('next');
					setTimeout(function(){jQuery('#play_btn'+randID).fadeIn(250);},o.transitionSpeed);
					clearTimeout(clearInt);
				}).hover(function(){jQuery(this).animate({opacity:'1'},250)},function(){jQuery(this).animate({opacity:'.75'},250)});
				jQuery('#btn_lt'+randID).css('opacity','.75').click(function(){
					autopilot = 0;
					jQuery('#progress'+randID).stop().fadeOut();
					anim('prev');
					setTimeout(function(){jQuery('#play_btn'+randID).fadeIn(250);},o.transitionSpeed);
					clearTimeout(clearInt);
				}).hover(function(){jQuery(this).animate({opacity:'1'},250)},function(){jQuery(this).animate({opacity:'.75'},250)});

				if(o.displayThumbnails)
				{
					// Build thumbnail viewer and thumbnail divs
					jQuery(obj).after('<div id="thumbs'+randID+'" style="position:relative;overflow:auto;text-align:left;padding-top:5px;"></div>');
					jQuery('#thumbs'+randID).width(imgWidth);
					for(i=0;i<=numImages-1;i++)
					{
						thumb = jQuery('img:eq('+(i+1)+')', obj).attr('src');
						jQuery('#thumbs'+randID).append('<div class="thumb" id="thumb'+randID+'_'+(i+1)+'" style="cursor:pointer;background-image:url('+thumb+');display:inline;float:left;width:'+o.thumbnailWidth+';height:'+o.thumbnailHeight+';line-height:'+o.thumbnailHeight+';padding:0;overflow:hidden;text-align:center;border:2px solid #ccc;margin-right:4px;font-size:'+o.thumbnailFontSize+';font-family:Arial;color:#000;text-shadow:0 0 3px #fff">'+(i+1)+'</div>');
						if(i==0) jQuery('#thumb'+randID+'_1').css({'border-color':'#ff0000'});
					}
					// Next two lines are a special case to handle the first list element which was originally the last
					thumb = jQuery('img:first', obj).attr('src');
					jQuery('#thumb'+randID+'_'+numImages).css({'background-image':'url('+thumb+')'});
					jQuery('#thumbs'+randID+' div.thumb:not(:first)').css({'opacity':'.65'}); // makes all thumbs 65% opaque except the first one
					jQuery('#thumbs'+randID+' div.thumb').hover(function(){jQuery(this).animate({'opacity':.99},150)},function(){if(curr!=this.id.split('_')[1]) jQuery(this).animate({'opacity':.65},250)}); // add hover to thumbs

					// Assign click handler for the thumbnails. Normally the format jQuery('.thumb') would work but since it's outside of our object (obj) it would get called multiple times
					jQuery('#thumbs'+randID+' div').bind('click', thumbclick); // We use bind instead of just plain click so that we can repeatedly remove and reattach the handler

					if(!o.displayThumbnailNumbers) jQuery('#thumbs'+randID+' div').text('');
					if(!o.displayThumbnailBackground) jQuery('#thumbs'+randID+' div').css({'background-image':'none'});
				}
				function thumbclick(event)
				{
					target_num = this.id.split('_'); // we want target_num[1]
					if(curr != target_num[1])
					{
						jQuery('#thumb'+randID+'_'+curr).css({'border-color':'#ccc'});
						jQuery('#progress'+randID).stop().fadeOut();
						clearTimeout(clearInt);
						//alert(event.data.src+' '+this.id+' '+target_num[1]+' '+curr);
						jQuery('#thumbs'+randID+' div').css({'cursor':'default'}).unbind('click'); // Unbind the thumbnail click event until the transition has ended
						autopilot = 0;
						setTimeout(function(){jQuery('#play_btn'+randID).fadeIn(250);},o.transitionSpeed);
					}
					if(target_num[1] > curr)
					{
						diff = target_num[1] - curr;
						anim('next',diff);
					}
					if(target_num[1] < curr)
					{
						diff = curr - target_num[1];
						anim('prev', diff);
					}
				}

				function showtext(t)
				{
					// the text will always be the text of the second list item (if it exists)
					if(t != null)
					{
//						alert(t);
						jQuery('#textholder'+randID).html(t).animate({marginBottom:'0px'},500); // Raise textholder
//						showminmax();
					}
				}
				function showminmax()
				{
						if(!autopilot)
						{
							html = '<img style="position:absolute;top:2px;right:18px;display:none;cursor:pointer" src="/js/infiniteCarousel/images/down.png" title="Minimize" alt="minimize" id="min" /><img style="position:absolute;top:2px;right:18px;display:none;cursor:pointer" src="/js/infiniteCarousel/images/up.png" title="Maximize" alt="maximize" id="max" />';
							html += '<img style="position:absolute;top:2px;right:6px;display:none;cursor:pointer" src="/js/infiniteCarousel/images/close.png" title="Close" alt="close" id="close" />';
							jQuery('#textholder'+randID).append(html);
							jQuery('#min').fadeIn(250).click(function(){jQuery('#textholder'+randID).animate({marginBottom:(-imgHeight*o.textholderHeight)-(correctTHHeight * 2)+24+'px'},500,function(){jQuery("#min,#max").toggle();});});
							jQuery('#max').click(function(){jQuery('#textholder'+randID).animate({marginBottom:'0px'},500,function(){jQuery("#min,#max").toggle();});});
							jQuery('#close').fadeIn(250).click(function(){jQuery('#textholder'+randID).animate({marginBottom:(-imgHeight*o.textholderHeight)-(correctTHHeight * 2)+'px'},500);});
						}
				}
				function borderpatrol(elem)
				{
					jQuery('#thumbs'+randID+' div').css({'border-color':'#ccc'}).animate({opacity: 0.65},500);
					setTimeout(function(){elem.css({'border-color':'#ff0000'}).animate({'opacity': .99},500);},o.transitionSpeed);
				}
				function anim(direction,dist)
				{
					// Fade left/right arrows out when transitioning
					jQuery('#btn_rt'+randID).fadeOut(500);
					jQuery('#btn_lt'+randID).fadeOut(500);

					// animate textholder out of frame
					jQuery('#textholder'+randID).animate({marginBottom:(-imgHeight*o.textholderHeight)-(correctTHHeight * 2)+'px'},500);

					//?? Fade out play/pause?
					jQuery('#pause_btn'+randID).fadeOut(250);
					jQuery('#play_btn'+randID).fadeOut(250);

					if(direction == "next")
					{
						if(curr==numImages) curr=0;
						if(dist>1)
						{
							borderpatrol(jQuery('#thumb'+randID+'_'+(curr+dist)));
							jQuery('li:lt(2)', obj).clone().insertAfter(jQuery('li:last', obj));
							jQuery('ul', obj).animate({left:-imgWidth*(dist+1)},o.transitionSpeed,function(){
								jQuery('li:lt(2)', obj).remove();
								for(j=1;j<=dist-2;j++)
								{
									jQuery('li:first', obj).clone().insertAfter(jQuery('li:last', obj));
									jQuery('li:first', obj).remove();
								}
								jQuery('#btn_rt'+randID).fadeIn(500);
								jQuery('#btn_lt'+randID).fadeIn(500);
								jQuery('#play_btn'+randID).fadeIn(250);
								showtext(jQuery('li:eq(1) div', obj).html());
								jQuery(this).css({'left':-imgWidth});
								curr = curr+dist;
								jQuery('#thumbs'+randID+' div').bind('click', thumbclick).css({'cursor':'pointer'});
							});
						}
						else
						{
							borderpatrol(jQuery('#thumb'+randID+'_'+(curr+1)));
							jQuery('#thumbs'+randID+' div').css({'cursor':'default'}).unbind('click'); // Unbind the thumbnail click event until the transition has ended
							// Copy leftmost (first) li and insert it after the last li
							jQuery('li:first', obj).clone().insertAfter(jQuery('li:last', obj));
							// Update width and left position of ul and animate ul to the left
							jQuery('ul', obj)
								.animate({left:-imgWidth*2},o.transitionSpeed,function(){
									jQuery('li:first', obj).remove();
									jQuery('ul', obj).css('left',-imgWidth+'px');
									jQuery('#btn_rt'+randID).fadeIn(500);
									jQuery('#btn_lt'+randID).fadeIn(500);
									if(autopilot) jQuery('#pause_btn'+randID).fadeIn(250);
									showtext(jQuery('li:eq(1) div', obj).html());
									if(autopilot)
									{
										jQuery('#progress'+randID).width(imgWidth).height(5);
										jQuery('#progress'+randID).animate({'width':0},o.displayTime,function(){
											jQuery('#pause_btn'+randID).fadeOut(50);
											setTimeout(function(){jQuery('#pause_btn'+randID).fadeIn(250)},o.transitionSpeed)
										});
									}
									curr=curr+1;
									jQuery('#thumbs'+randID+' div').bind('click', thumbclick).css({'cursor':'pointer'});
								});
						}
					}
					if(direction == "prev")
					{
						if(dist>1)
						{
							borderpatrol(jQuery('#thumb'+randID+'_'+(curr-dist)));
							jQuery('li:gt('+(numImages-(dist+1))+')', obj).clone().insertBefore(jQuery('li:first', obj));
							jQuery('ul', obj).css({'left':(-imgWidth*(dist+1))}).animate({left:-imgWidth},o.transitionSpeed,function(){
								jQuery('li:gt('+(numImages-1)+')', obj).remove();
								jQuery('#btn_rt'+randID).fadeIn(500);
								jQuery('#btn_lt'+randID).fadeIn(500);
								jQuery('#play_btn'+randID).fadeIn(250);
								showtext(jQuery('li:eq(1) div', obj).html());
								curr = curr - dist;
								jQuery('#thumbs'+randID+' div').bind('click', thumbclick).css({'cursor':'pointer'});
							});
						}
						else
						{
							borderpatrol(jQuery('#thumb'+randID+'_'+(curr-1)));
							jQuery('#thumbs'+randID+' div').css({'cursor':'default'}).unbind('click'); // Unbind the thumbnail click event until the transition has ended
							// Copy rightmost (last) li and insert it after the first li
							jQuery('li:last', obj).clone().insertBefore(jQuery('li:first', obj));
							// Update width and left position of ul and animate ul to the right
							jQuery('ul', obj)
								.css('left',-imgWidth*2+'px')
								.animate({left:-imgWidth},o.transitionSpeed,function(){
									jQuery('li:last', obj).remove();
									jQuery('#btn_rt'+randID).fadeIn(500);
									jQuery('#btn_lt'+randID).fadeIn(500);
									if(autopilot) jQuery('#pause_btn'+randID).fadeIn(250);
									showtext(jQuery('li:eq(1) div', obj).html());
									curr=curr-1;
									if(curr==0) curr=numImages;
									jQuery('#thumbs'+randID+' div').bind('click', thumbclick).css({'cursor':'pointer'});
								});
						}
					}
				}

				var clearInt = setInterval(function(){anim('next');},o.displayTime+o.transitionSpeed);
				jQuery('#progress'+randID).animate({'width':0},o.displayTime+o.transitionSpeed,function(){
					jQuery('#pause_btn'+randID).fadeOut(100);
					setTimeout(function(){jQuery('#pause_btn'+randID).fadeIn(250)},o.transitionSpeed)
				});
  		});
    	}
	});
})(jQuery);