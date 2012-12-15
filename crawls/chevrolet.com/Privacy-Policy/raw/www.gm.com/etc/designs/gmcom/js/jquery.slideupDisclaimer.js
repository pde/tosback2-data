/* Investors-style disclaimer */
/**
 * @author jason.campbell
**/
(function($){

	$.fn.extend({

		slideupDisclaimer: function( options ) {

			var defaults = {
				linkLabel			:			$('div.parbase.disclaimer div.rollOverDetails > p').text(),
				header				:			"",
				content				:			jQuery('div.parbase.disclaimer > .rollOverDetails > .tipText').html(),
				id					:			"terms",
				scroll				:			$('div.rollOverDetails').attr('data-scroll'),
				width				:			300,
				height				:			$('div.rollOverDetails').attr('data-height'),
				speed				:			400

			}
			$.SDGLOBALS={
				showTimer 	: 	0,
				hidetimer 	: 	0,
				animating 	: 	false,
				iTop		:	0,
				offset		:	0,
				initialized	: 	false
			};

			var options =  $.extend( defaults, options );

			return this.each( function(index) {
				$this=$(this);

				// prevent script execution on POSH disclaimers
			if(options.height==="")
				return;

				if(typeof jQuery('div.parbase.disclaimer')=="object")
					$this.createContainer(options);
				else
					return;
			});


		},

		createContainer: function(options){

			$this=$(this);
			//clear content from target container
			jQuery('div.parbase.disclaimer').html("");
			jQuery('div.parbase.disclaimer').append("<div id='disclosureLinks'></div>");
			jQuery('#disclosureLinks').append(
									"<span class='disclosure-link' id='"+options.id+"-link'>"
							+		"<a href='#' onclick='return false;'>" + options.linkLabel + "</a>"
							+		"</span>"
						);
			$this.addContent(options);
		},
		addContent: function(options){

			$this=$(this);
			$id=options.id;

			$header=options.header;
			$content=options.content;

			jQuery('#disclosureLinks').after(
									"<div class='disclosure-container' id='"+$id+"-container'' >"

							+		"<div id='upperRow'>"
							+			"<div class='upperLeft opacity90'></div>"
							+			"<div class='upperRight opacity90'></div>"
							+			"<div class='upperMid opacity90'></div>"
							+		"</div>"
							+		"<div class='midRow'>"
							+		"<div class='midLeft opacity90'>"
							+		"<div class='midRight opacity90'>"
							+		"<div class='midMid opacity90'>"

								+			"<div class='disclosure-bg' id='"+$id+"-bg'>"
								+				"<div id='title'>"+$header+"</div>"
								+				"<div class='disclosure-scroll-box' id='"+$id+"-scroll-box'>"
								+					"<div class='disclosure-content' id='"+$id+"-content''>" + $content + "</div>"
								+				"</div>"
								+			"</div>"

							+		"</div>"
							+		"</div>"
							+		"</div>"
							+		"</div>"

							+		"<div id='lowerRow'>"
							+			"<div class='lowerLeft opacity90'></div>"
							+			"<div class='lowerRight opacity90'></div>"
							+			"<div class='lowerMid opacity90'></div>"
							+		"</div>"

							+		"</div>"
						);

// handle scroll option
			if(options.scroll){
				jQuery('div#'+$id+'-bg').append(
									"<div class='disclosure-scroll-btns' id='"+$id+"-scroll-btns'>"
					+					"<img class='scroll-up'id='"+$id+"-scroll-up' src='/etc/designs/gmcom/images/gInvestors/up_arr.png'>"
					+					"<img class='scroll-down' id='"+$id+"-scroll-down' src='/etc/designs/gmcom/images/gInvestors/down_arr.png'>"
					+				"</div>"
				);
			}

// add closer div for mobile
			if(jQuery('body').hasClass('mobile')){
				jQuery('div#'+$id+'-bg').before(
					"<div id='mobile-closer' style='position:absolute;z-index:99999;height:100%;width:600px;'></div>"
				);
			}

// move disclaimer to footer top
			jQuery('#auxiliaryNavigation').prepend(jQuery('#'+$id+'-container'));

// set disclaimer left margin to equal main shaded container
			jQuery('#'+$id+'-container').css({
				marginLeft	:	$('#content > .shadedContainer').offset().left
			});
			$(window).resize(function(){
				jQuery('#'+$id+'-container').css({
					marginLeft	:	$('#content > .shadedContainer').offset().left
				})
			});

// set width, height options
			jQuery('#'+$id+'-scroll-box, #'+$id+'-scroll-btns').css({
				width		:	options.width
			});
			jQuery('#'+$id+'-bg').css({
				height	:	options.height
			});

// IE is retarded
			$('html.ie7 #'+$id+'-container').css({
				width		:	options.width+10
			})

			$this.initControls(options);
		},

		initControls:	function(options){

			$this=$(this);
			$id=options.id;
			$iTop=$.SDGLOBALS.iTop;
			$offset=$.SDGLOBALS.offset;

// init showTimer
			jQuery('#'+$id+'-link a').bind({
					mouseenter: function(){
						// ie is retarded
						try{
						$.SDGLOBALS.showTimer = setTimeout($this.showDisclaimer(options), 500);
						}
						catch(error){}
					},
					mouseleave: function(){
						clearTimeout($.SDGLOBALS.showTimer);
					}
			});

			jQuery('body').hasClass('mobile')?
				disclaimerCloser='#mobile-closer'
			:
				disclaimerCloser='#'+$id+'-container';

// init hideTimer
			jQuery(disclaimerCloser).live(
						$('body').hasClass('mobile')?"click":"mouseleave", function(){
							clearTimeout($.SDGLOBALS.showTimer);
						//ie is retarded
							try{
							$.SDGLOBALS.hideTimer = setTimeout( $this.hideDisclaimer(options), 500 );
							}
							catch(error){}
						});

			jQuery('#'+$id+'-container').live(
						"mouseenter", function(){
							clearTimeout( $.SDGLOBALS.hideTimer );
						});
		},
// scroller controls
		initScrollers: function(options){

			$this=$(this);
			$id=options.id;
			$iTop=$.SDGLOBALS.iTop;
			$offset=$.SDGLOBALS.offset;

			jQuery('#'+$id+'-scroll-down').click(function(){
					$iTop -= 200;
					if($iTop < $offset) $iTop = $offset;

					jQuery('#'+$id+'-content').animate({
						top: $iTop
					},500);

					if($iTop <= $offset){
						jQuery('#'+$id+'-scroll-down').hide();
					}

					jQuery('#'+$id+'-scroll-up').show();

					return false;
			});

			jQuery('#'+$id+'-scroll-up').click(function(){

					$iTop += 200;
					if($iTop > 0) $iTop = 0;

					jQuery('#'+$id+'-content').animate({
						top: $iTop
					},500);

					if($iTop == 0){
						jQuery('#'+$id+'-scroll-up').hide();
					}

					jQuery('#'+$id+'-scroll-down').show();

					return false;
			});

			$.SDGLOBALS.animating = false;

		},	//	END initControls

		showDisclaimer:	function(options){

			$this=$(this);
			$id=options.id;
			$iTop=$.SDGLOBALS.iTop;
			$offset=$.SDGLOBALS.offset;

			var containerHeight;

			disclaimerInitTop=parseInt($('#'+$id+'-bg').css('height'));
			negTop=disclaimerInitTop-(disclaimerInitTop*2+10);

			jQuery('#'+$id+'-container').css({
				marginTop	:	negTop
			});
			if(!$.SDGLOBALS.animating){

				$.SDGLOBALS.animating = true;

// reset scroll and scroll button states each time it shows
				jQuery('#'+$id+'-content').css({top: 0});
				jQuery('#'+$id+'-scroll-down').show();
				jQuery('#'+$id+'-scroll-up').hide();
				$.SDGLOBALS.iTop=0;
				$.SDGLOBALS.offset=0;

				jQuery('#'+$id+'-container').slideDown(options.speed, function(){

					// get the Disclaimer pop-up height
					options.scroll?
						containerHeight = options.height*.92
					:
						containerHeight = options.height;

					var contentHeight = jQuery('#'+$id+'-content').height();
					var maxHeight = 0;

					contentHeight < containerHeight?
						maxHeight = contentHeight
					:
						maxHeight = containerHeight;

					jQuery('#'+$id+'-scroll-box').animate({height:maxHeight}, 400);
					$offset = containerHeight - jQuery('#'+$id+'-content').height();
					if($offset <= 0) jQuery('#'+$id+'-scroll-btns').slideDown(400).delay(400);
					$.SDGLOBALS.animating=false;

					jQuery('#'+$id+'-scroll-btns').css('zIndex','9999');
				});
					jQuery('#disclosureLinks').css('visibility','hidden');
			}

			if(!$.SDGLOBALS.initialized){
				$this.initScrollers(options);
				$.SDGLOBALS.initialized=true;
			}

		},

		hideDisclaimer:	function(options){

			$this=$(this);
			$id=options.id;

			if(!$.SDGLOBALS.animating){

				$.SDGLOBALS.animating = true;

				jQuery('#'+$id+'-container').slideUp(options.speed*.75, function(){$.SDGLOBALS.animating=false;});
				jQuery('#disclosureLinks').css('visibility','visible');
			}

		}

	});

})(jQuery);

$(document).ready(function(){

		$('body.contentpagetwocolumn').slideupDisclaimer({
			width	:	701
		});
		$('body.contentpage').slideupDisclaimer({
			width	:	701
		});
		$('body.investorsnewsarchivepage').slideupDisclaimer({
			width	:	701
		});

	});
