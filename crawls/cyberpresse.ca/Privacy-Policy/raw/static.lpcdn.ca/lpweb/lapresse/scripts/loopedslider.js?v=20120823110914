/*
 * 	loopedSlider 0.5.7 - jQuery plugin
 *	written by Nathan Searles	
 *	http://nathansearles.com/loopedslider/
 *
 *	Copyright (c) 2010 Nathan Searles (http://nathansearles.com/)
 *	Dual licensed under the MIT (MIT-LICENSE.txt)
 *	and GPL (GPL-LICENSE.txt) licenses.
 *
 *	Built for jQuery library
 *	http://jquery.com
 *	Compatible with jQuery 1.3.2+
 *
 */

/*
 *	markup example for $("#loopedSlider").loopedSlider();
 *
 *	<div id="loopedSlider">	
 *		<div class="container">
 *			<div class="slides">
 *				<div><img src="01.jpg"></div>
 *				<div><img src="02.jpg"></div>
 *				<div><img src="03.jpg"></div>
 *				<div><img src="04.jpg"></div>
 *			</div>
 *		</div>
 *		<a href="#" class="previous">previous</a>
 *		<a href="#" class="next">next</a>	
 *	</div>
 *
*/

if(typeof jQuery != 'undefined') {
	jQuery(function($) {
		$.fn.extend({
			loopedSlider: function(options) {
				var settings = $.extend({}, $.fn.loopedSlider.defaults, options);
			
				return this.each(
					function() {
					if($.fn.jquery < '1.3.2') {return;}
					var $t = $(this);
					var o = $.metadata ? $.extend({}, settings, $t.metadata()) : settings;
					
					var distance = 0;
					var times = 1;
					var slides = $(o.slides,$t).children().length;
					var width = $(o.slides,$t).children().outerWidth();
					var position = 0;
					var active = false;
					var number = 0;
					var interval = 0;
					var restart = 0;
					var pagination = $("."+o.pagination+" li a",$t);
					
					if(o.addPagination && !$(pagination).length){
						
						var buttons = slides;
						
						$('.rightNav',$t).prepend($("<ul class="+o.pagination+">"));
						$(o.slides,$t).children().each(function(){
							if (number<buttons) {
								$("."+o.pagination,$t).append("<li><a rel="+(number+1)+" href=\"#\" >"+(number+1)+"</a><span class='arrow'>&nbsp;</span></li>");
								number = number+1;
								
							} else {
								
								number = 0;
								return false;
							}
							$("."+o.pagination+" li a:eq(0)",$t).parent().addClass("active");
						});
						pagination = $("."+o.pagination+" li a",$t);
					} else {
							
							$(pagination,$t).each(function(){
							number=number+1;
							$(this).attr("rel",number);
							$(pagination.eq(0),$t).parent().addClass("active");
							
						});
					}
					
					if (slides ===1) {
					
						$(o.slides,$t).children().css({position:"absolute",left:position,display:"block"});
								$(pagination.eq(0),$t).attr("href","javascript:void(0)");
									$('.nav.next.big').hide();
									$('.offRightBig').show();
									$(o.slides,$t).children('li').find('p').hide();
									$(o.slides,$t).children('li').find('img').hide();
									$(o.slides,$t).parent().addClass('loading_img');
									
									$(o.slides,$t).find('li:first img').each(function(index) {
										var altUrl = $(this).prev().attr("href");
						
							$(this).load(function ()  
							{
								var nbOfItemIn0 = $(o.slides,$t).find('li:first div').length -1 ;
								
								
								if ( (parseInt(nbOfItemIn0)) == parseInt(index))
									{
										
										
										$(o.slides,$t).find('li').eq(0).addClass('loadedCompleted');
										$(o.slides,$t).find('li').eq(0).find('img').fadeIn();
										$(o.slides,$t).find('li').eq(0).find('p').fadeIn();
										
										
									}
								
								
									
					
							}).error(function () {
							 // ANIS - MISE EN COMMENTAIRE - CA PROVOQUE UNE ALERTE SUR PROD.
                             //alert('Il y a eu une erreur lors du chargement');
							}).attr('src',altUrl).parents('.' + o.slides).parent().removeClass('loading_img');
							
					});
					$('<span id="nbLi">0</span><span id="liOn">1</span>').insertAfter($(o.slides,$t));
					nbItems = ($(o.slides +" li",$t).length);
					$('#nbLi',$t).html(nbItems);
					


						
						return;
					}
					
					

					$(o.slides,$t).css({width:(slides*width)});

					$(o.slides,$t).children().each(function(){
						$(this).css({position:"absolute",left:position,display:"block"});
						position=position+width;
					});
					
					// doit etre en commentaire			
					//$(o.slides,$t).children(":eq("+(slides-1)+")").css({position:"absolute",left:-width});

					// Si vous vous voulez revenir au debut Doit etre en commentaire
					/*
					if (slides>3) {
						$(o.slides,$t).children(":eq("+(slides-1)+")").css({position:"absolute",left:-width});
					}
					*/	
					
					if(o.autoHeight){autoHeight(times);}
					
					
					//Preload Initial 
					
					$(o.slides,$t).children('li').find('p').hide();
					$(o.slides,$t).parent().addClass('loading_img');
					$(o.slides,$t).children('li').eq(0).find('img').hide();
					$(o.slides,$t).find('li:first img').each(function(index) {
						
						
						var altUrl = $(this).prev().attr("href");
						
							$(this).load(function ()  
							{
								var nbOfItemIn0 = $(o.slides,$t).find('li:first div').length -1 ;
								
								
								if ( (parseInt(nbOfItemIn0)) == parseInt(index))
									{
										
										
										$(o.slides,$t).find('li').eq(0).addClass('loadedCompleted');
										$(o.slides,$t).find('li').eq(0).find('img').fadeIn();
										$(o.slides,$t).find('li').eq(0).find('p').fadeIn();
										
										
									}
								
								
									
					
							}).error(function () {
							 //alert('Il y a eu une erreur lors du chargement');
							}).attr('src',altUrl).parents('.' + o.slides).parent().removeClass('loading_img');
							
					});
					
					$('<span id="nbLi">0</span><span id="liOn">1</span>').insertAfter($(o.slides,$t));
					nbItems = ($(o.slides +" li",$t).length);
					$('#nbLi',$t).html(nbItems);
					
					$(".next",$t).click(function(){
						if(active===false) {
							animate("next",true);
							
							if(o.autoStart){
								if (o.restart) {autoStart();}
								else {clearInterval(sliderIntervalID);}
								
							}
							if ($("." + o.pagination + " li:last",$t).is('.active') && ($("." + o.pagination + " li").length == 2))
								{
									$('.offLeftBig',$t).hide();
									$('.nav.previous.big',$t).show();
									$('.offRightBig',$t).show();
									$('.nav.next.big',$t).hide();
								} 
							else if ($("." + o.pagination + " li:last",$t).is('.active') && ($("." + o.pagination + " li").length > 2))
								{
									$('.offRightBig',$t).show();
									$('.nav.next.big',$t).hide();
									$('.offLeftBig',$t).hide();
									$('.nav.previous.big',$t).show();
								} 
								
							else if ($("." + o.pagination + " li:first",$t).is('.active') && ($("." + o.pagination + " li").length == 2))
								{
									$('.offLeftBig',$t).show();
									$('.nav.previous.big',$t).hide();
									$('.offRightBig',$t).hide();
									$('.nav.next.big',$t).show();
								}
							else if ($("." + o.pagination + " li:first",$t).is('.active') && ($("." + o.pagination + " li").length > 2))
								{
									$('.nav.previous.big',$t).hide();
									$('.offRightBig',$t).hide();
									$('.nav.next.big',$t).show();
									$('.offLeftBig',$t).show();
								}
							else if (($("." + o.pagination + " li:first",$t).not('.active')) &&  ($("." + o.pagination + " li:last",$t).not('.active')))
								{
									$('.offLeftBig',$t).hide();
									$('.offRightBig',$t).hide();
									$('.nav.next.big',$t).show();
									$('.nav.previous.big',$t).show();
								}
						} return false;
					});

					$(".previous",$t).click(function(){
						if(active===false) {	
							animate("prev",true);
							
							if(o.autoStart){
								if (o.restart) {autoStart();}
								else {clearInterval(sliderIntervalID);}
							}
							if ($("." + o.pagination + " li:last",$t).is('.active') && ($("." + o.pagination + " li").length == 2))
							{
								$('.offLeftBig',$t).hide();
								$('.nav.previous.big',$t).show();
								$('.offRightBig',$t).show();
								$('.nav.next.big',$t).hide();
							} 
							else if ($("." + o.pagination + " li:last",$t).is('.active') && ($("." + o.pagination + " li").length > 2))
							{
								$('.offRightBig',$t).show();
								$('.nav.next.big',$t).hide();
								$('.offLeftBig',$t).hide();
								$('.nav.previous.big',$t).show();
							} 
							else if ($("." + o.pagination + " li:first",$t).is('.active') && ($("." + o.pagination + " li").length == 2))
							{
								$('.offLeftBig',$t).show();
								$('.nav.previous.big',$t).hide();
								$('.offRightBig',$t).hide();
								$('.nav.next.big',$t).show();
							}
							else if ($("." + o.pagination + " li:first",$t).is('.active') && ($("." + o.pagination + " li").length > 2))
							{
								$('.nav.previous.big',$t).hide();
								$('.offRightBig',$t).hide();
								$('.nav.next.big',$t).show();
								$('.offLeftBig',$t).show();
							}
							else if (($("." + o.pagination + " li:first",$t).not('.active')) &&  ($("." + o.pagination + " li:last",$t).not('.active')))
							{
								$('.offLeftBig',$t).hide();
								$('.offRightBig',$t).hide();
								$('.nav.next.big',$t).show();
								$('.nav.previous.big',$t).show();
							}
						} return false;
					});

				
					/* changement du slide par une animation fade-in lorsque qu'on clique sur l'image
					if (o.containerClick) {
						$(o.container,$t).click(function(){
							if(active===false) {
								animate("next",true);
								if(o.autoStart){
									if (o.restart) {autoStart();}
									else {clearInterval(sliderIntervalID);}
								}
							} return false;
						});
					}
					*/
					$(pagination,$t).click(function(){
						if ($(this).parent().hasClass("active")) {return false;}
						
						else {
							times = $(this).attr("rel");
							
							var posNavBefore = $(pagination,$t).parent('.active').index() + 1;
							var posNavNow = $(this).parent().index() + 1;
							var posNavNowIndex = $(this).parent().index();
							
							$(pagination,$t).parent().siblings().removeClass("active");
							
							$(this).parent().addClass("active");
							
							if ( posNavBefore >  posNavNow )
							{ 
								animate("prev",times); 
							}
							else { 
							
							animate("next",times);
							
							}
							
							if(o.autoStart){
								if (o.restart) {autoStart();}
								else {clearInterval(sliderIntervalID);}
							}
								
								$('#liOn',$t).html(posNavNow);
								var $liChildren = $(o.slides,$t).find('li:eq('+ posNavNowIndex + ')');
								$liChildren.not('.loadedCompleted').each( function() 
												{
													$(this).find('p').hide();
													$(this).parent().parent().addClass('loading_img');
													$(this).find('img').hide();
														$(this).find('img').each(function(index){
															var altUrl = $(this).prev().attr("href");
																$(this).load(function ()  
																	{
																		var nbOfItemIn0 = $liChildren.children('div').length -1 ;
																			if ( (parseInt(nbOfItemIn0)) == parseInt(index))
																				{
																					$liChildren.addClass('loadedCompleted');
																					$liChildren.find('img').fadeIn();
																					$liChildren.find('p').fadeIn();
																					$(o.slides,$t).parent().removeClass('loading_img');
																				}
																	}).error(function () {
																		//alert('Il y a eu une erreur lors du chargement');
																	}).attr('src',altUrl);
							
														});	
								
											});
						
								}
						
							if ($("." + o.pagination + " li:last",$t).is('.active') && ($("." + o.pagination + " li").length == 2))
							{
								$('.offLeftBig',$t).hide();
								$('.nav.previous.big',$t).show();
								$('.offRightBig',$t).show();
								$('.nav.next.big',$t).hide();
							} 
							else if ($("." + o.pagination + " li:last",$t).is('.active') && ($("." + o.pagination + " li").length > 2))
							{
								$('.offRightBig',$t).show();
								$('.nav.next.big',$t).hide();
								$('.offLeftBig',$t).hide();
								$('.nav.previous.big',$t).show();
							} 
							else if ($("." + o.pagination + " li:first",$t).is('.active') && ($("." + o.pagination + " li").length == 2))
							{
								$('.offLeftBig',$t).show();
								$('.nav.previous.big',$t).hide();
								$('.offRightBig',$t).hide();
								$('.nav.next.big',$t).show();
							}
							else if ($("." + o.pagination + " li:first",$t).is('.active') && ($("." + o.pagination + " li").length > 2))
							{
								$('.nav.previous.big',$t).hide();
								$('.offRightBig',$t).hide();
								$('.nav.next.big',$t).show();
								$('.offLeftBig',$t).show();
							}
							else if (($("." + o.pagination + " li:first",$t).not('.active')) &&  ($("." + o.pagination + " li:last",$t).not('.active')))
							{
								$('.offLeftBig',$t).hide();
								$('.offRightBig',$t).hide();
								$('.nav.next.big',$t).show();
								$('.nav.previous.big',$t).show();
							}
						 return false;
					});
					
					/* **
					Si auto start est positive
					qui est le nombre de mili seconde entre chaque transtion qui est appeler plutot entre chaque slider
					et qui active doit etre a false qui veut qu'une autre  animation est en progres et qui n'a pas terminer
					**  */
					if (o.autoStart) {
						sliderIntervalID = setInterval(function(){
							if(active===false) {animate("next",true);}
						},o.autoStart);
						function autoStart() {
							
							if (o.restart) {
							
							clearInterval(sliderIntervalID);
							clearInterval(interval);
							clearTimeout(restart);
								/* ********** 
								|_|-	Lorsqu'il le restart est mis a true
									qui veut dire le slider recommence au debut Evidemment mais ce qui particulier est
								le setTimeout qui attend un nombre de miliseconde =(o.restart) et rendu que le le nombre
								 de miliseconde est passer le 1er parametre dans setTimout qui est une fonctions est appeler
								 qui a  une fonction setInterval donc qui a une fonction comme premier parametre est appeler
								 a chaque miliseconde= o.autoStart
								 
								*********** */
								restart = setTimeout(function() {
									interval = setInterval(	function(){
										animate("next",true);
									},o.autoStart);
								},o.restart);
								
							} else {
								sliderIntervalID = setInterval(function(){  
									if(active===false) {animate("next",true);}
								},o.autoStart);
							}
						};
						/* **Lorsque la fonnctionnalite est active
						on clear tout interval et timeout pour laisser le slider dessus sur le mouse enter
						et sur le mouseleave l'aniation reprend
						
						** */
						if (o.hoverPause) {
							$(o.slides,$t).mouseenter(function(){
								clearInterval(sliderIntervalID);
								clearInterval(interval);
								clearTimeout(restart);
							});
							$(o.slides,$t).mouseleave(function(){
								sliderIntervalID = setInterval(function(){
									if(active===false) {animate("next",true);}
								},o.autoStart);
							});
						}
					}
					
					
					
					function current(times) {
						// doit etre en commentaire
						if(times===slides+1){times = 1;}
						if(times===0){times = slides;}
						$(pagination,$t).parent().siblings().removeClass("active");
						
						$(pagination+"[rel='" + (times) + "']",$t).parent().addClass("active");
						
						
					};

					function autoHeight(times) {
						if(times===slides+1){times=1;}
						if(times===0){times=slides;}	
						var getHeight = $(o.slides,$t).children(":eq("+(times-1)+")",$t).outerHeight();
						$(o.container,$t).animate({height: getHeight},o.autoHeight);					
					};		

					function animate(dir,clicked){	
						active = true;	
						switch(dir){
							case "next":
								
								if ((clicked === true) || (clicked === false))
								{
								
								times = parseInt(times) + 1;
								
								}
								
								distance = (-(times*width-width));
								// ajoute dans la pagination lequelle est celui qui est courrament cliquer
								// juste avant l'animation
								current(times);
								if(o.autoHeight){autoHeight(times);}
								
								if(slides<3){
									/* **
									Le cas pour 2 ou 1 slide
									si on est sur le 2, le premier item va etre a droite plutot a gauche( normalement le dernier item est a gauche du slider qui est visible)
									
									** */
									if (times===3){$(o.slides,$t).children(":eq(0)").css({left:(slides*width)});}
									if (times===2){$(o.slides,$t).children(":eq("+(slides-1)+")").css({position:"absolute",left:width});}
								}
								
								$(o.slides,$t).animate({left: distance}, o.slidespeed,function(){
									if (times===slides+1) {
										times = 1;
										$(o.slides,$t).css({left:0},function(){$(o.slides,$t).animate({left:distance})});							
										$(o.slides,$t).children(":eq(0)").css({left:0});
										$(o.slides,$t).children(":eq("+(slides-1)+")").css({ position:"absolute",left:-width});				
									}
									//devrait etre en commentaire les deux if
									//if (times===slides) $(o.slides,$t).children(":eq(0)").css({left:(slides*width)});
									//if (times===slides-1) $(o.slides,$t).children(":eq("+(slides-1)+")").css({left:(slides*width-width)});
									//devrait etre en bas du case
									active = false;
										
										
										if ((clicked === true) || (clicked === false) ) {
											
											var place = parseInt($('#liOn',$t).html()) + 1 ;
											$('#liOn',$t).html(place);
											var $positionsLi = $('#liOn',$t).html();
											var $liChildren = $(o.slides,$t).find('li').eq(parseInt($positionsLi)-1);
										
											$liChildren.not('.loadedCompleted').each( function() 
												{
													
													
													$(this).parent().parent().addClass('loading_img');
													$(this).find('img').hide();
														$(this).find('img').each(function(index){
															var altUrl = $(this).prev().attr("href");
																$(this).load(function ()  
																	{
																		var nbOfItemIn0 = $liChildren.children('div').length -1 ;
																			if ( (parseInt(nbOfItemIn0)) == parseInt(index))
																				{
																					$liChildren.addClass('loadedCompleted');
																					$liChildren.find('img').fadeIn('slow');
																					$liChildren.find('p').fadeIn('slow');
																					$(o.slides,$t).parent().removeClass('loading_img');
																				}
																	}).error(function () {
																		//alert('Il y a eu une erreur lors du chargement');
																	}).attr('src',altUrl);
							
														});	
								
											});
									
										} 
									
									
								});					
								break; 
							case "prev":
								
								if ( (clicked === true) || (clicked === false)) {  times = (parseInt(times) - 1) ;  }
								
								distance = (-(times*width-width));
								current(times);
								if(o.autoHeight){autoHeight(times);}
								if (slides<3){
									if(times===0){$(o.slides,$t).children(":eq("+(slides-1)+")").css({position:"absolute",left:(-width)});}
									if(times===1){$(o.slides,$t).children(":eq(0)").css({position:"absolute",left:0});}
								}
								$(o.slides,$t).animate({left: distance}, o.slidespeed,function(){
									if (times===0) {
										times = slides;
										$(o.slides,$t).children(":eq("+(slides-1)+")").css({position:"absolute",left:(slides*width-width)});
										$(o.slides,$t).css({left: -(slides*width-width)});
										$(o.slides,$t).children(":eq(0)").css({left:(slides*width)});
									}
									if (times===2 ) $(o.slides,$t).children(":eq(0)").css({position:"absolute",left:0});
									//doit etre en commentaire
									//if (times===1) $(o.slides,$t).children(":eq("+ (slides-1) +")").css({position:"absolute",left:-width});
									active = false;
									
									//MY CODE
										if ((clicked === true) || (clicked === false) ) {
										var place = parseInt($('#liOn',$t).html()) - 1 ;
										$('#liOn',$t).html(place);
										var $positionsLi = $('#liOn',$t).html();
										var $liChildren = $(o.slides,$t).find('li').eq(parseInt($positionsLi)-1);
										
											$liChildren.not('.loadedCompleted').each( function() 
												{
													
													$(this).find('p').hide();
													$(this).parent().parent().addClass('loading_img');
													$(this).find('img').hide();
														$(this).find('img').each(function(index){
															var altUrl = $(this).prev().attr("href");
																$(this).load(function ()  
																	{
																		var nbOfItemIn0 = $liChildren.children('div').length -1 ;
																			if ( (parseInt(nbOfItemIn0)) == parseInt(index))
																				{
																					$liChildren.addClass('loadedCompleted');
																					$liChildren.find('img').fadeIn();
																					$liChildren.find('p').fadeIn();
																					$(o.slides,$t).parent().removeClass('loading_img');
																				}
																	}).error(function () {
																		//alert('Il y a eu une erreur lors du chargement');
																	}).attr('src',altUrl);
							
														});	
								
											});
									
										} 
								
									
								});
								break;
							
							case "fade":
								
								times = [times]*1;
								distance = (-(times*width-width));
								current(times);
								if(o.autoHeight){autoHeight(times);}
								$(o.slides,$t).children().fadeOut(o.fadespeed, function(){
									$(o.slides,$t).css({left: distance});
									$(o.slides,$t).children(":eq("+(slides-1)+")").css({left:slides*width-width});
									$(o.slides,$t).children(":eq(0)").css({left:0});
									if(times===slides){$(o.slides,$t).children(":eq(0)").css({left:(slides*width)});}
									if(times===1){$(o.slides,$t).children(":eq("+(slides-1)+")").css({ position:"absolute",left:-width});}
									$(o.slides,$t).children().fadeIn(o.fadespeed, function() {
										//removing filter from IE
										if(jQuery.browser.msie) {
											$(this).get(0).style.removeAttribute('filter');
										}
										
										//
										
									});
									active = false;
									
								});
								break;
								
							default:
								break;
							}					
						};
						
					
					}
				);
			}
		});
		$.fn.loopedSlider.defaults = {
			container: ".container", //Class/id of main container. You can use "#container" for an id.
			slides: ".slides", //Class/id of slide container. You can use "#slides" for an id.
			pagination: "pagination", //Class name of parent ul for numbered links. Don't add a "." here.
			containerClick: true, //Click slider to goto next slide? true/false
			autoStart: 0, //Set to positive number for true. This number will be the time between transitions.si il est a auto periode entre les transitions
			restart: 0, //Set to positive number for true. Sets time until autoStart is restarted.
			hoverPause: false, //Set to true to pause on hover, if autoStart is also true
			slidespeed: 300, //Speed of slide animation, 1000 = 1second.
			fadespeed: 200, //Speed of fade animation, 1000 = 1second.
			autoHeight: 0, //Set to positive number for true. This number will be the speed of the animation.
			addPagination: false //Add pagination links based on content? true/false
		};
	});
}
