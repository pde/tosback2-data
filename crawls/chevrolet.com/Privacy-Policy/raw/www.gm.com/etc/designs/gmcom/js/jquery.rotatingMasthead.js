/* rotating masthead */
/**
 * @author jason.campbell
**/
(function($){
	$.fn.extend({

		rotatingMasthead: function( options ) {

			var defaults = {
				loader							:	false,
				speed								:	$('html').hasClass('safari')?200:400,
				delay								:	4000,
				autoscroll						:	$(this).attr('autoscroll'),
				useBackgroundDimensions		:	false,
				frameWidth						:	980,
				frameHeight						:	387
			};

			var options =  $.extend( defaults, options );


			$.MHGLOBALS={
				frameLength					:	0,
				autoRotateInterval		:	"",
				animating					:	false,
				currentLeft					:	parseInt($(this).children(':first').css('left')),
				visibleFrame				:	0,
				delay							:	options.delay,
				speed							:	options.speed,
				freezeFrame					:	false,
				initAutoRotate				:	false


			};


			return this.each( function(index) {
				var $this=$(this);


				//Cufon headers
				$this.cufonHeaders();




					// frames (li) count
				$.MHGLOBALS.frameLength=$this.find('li').length;
				$('ul.mh_items').css({
					width		:		options.frameWidth*$.MHGLOBALS.frameLength
				});

					// set data attribute on each frame li for scrubber pagination
				$this.children(':first').find('li').each(function(index){

					$(this).data('index', index);

				});



				// set initial frame target if supplied
				var uri=window.location.href;
				var frameHash=uri.split('#')[1];

				if(frameHash)
					$this.children('ul.mh_items').setFrameHash(options,frameHash);

				filmstrip=$this.find('ul.mh_items');
				filmstrip.appendButtonSet(options);

				$this.setContainerBorder(options);


				// this hack is for an apparent rendering bug
				var scrolltop=false;
				if($('body').hasClass('ipad')){
					$('html, body').scrollTop(2000);
					scrolltop=true;
				}

				$(window).load(function(){
				
					
					//activate animation pause conditions
					filmstrip.pauseRotation(options);
					
					//activate animation
					if(options.autoscroll==="true")
						filmstrip.autoRotate(options, null, null);
						

					if(scrolltop)
						$('html, body').delay(800).animate({scrollTop:0},
																		{duration: 200,
						                                    complete: function(){
						                                    	// if cufon fails in ipad, retry once
						                                    	if($('div#rotatingMasthead h1').children('cufon').length===0)
						                                    		$this.cufonHeaders();
						                                    }
						                                 });
					

				});

					
			});
		},
		cufonHeaders: function(){

			if( typeof( Cufon ) == 'function' && typeof Cufon.replace=="function"){
				Cufon.replace('div#rotatingMasthead h1', {
								fontFamily: 'gotham-light',
								hover: false
				});
				Cufon.replace('div#rotatingMasthead h2', {
								fontFamily: 'gotham-light',
								hover: false
				});
			}

				// change heading margin upon cufon load
				$('html.ie h1 .cufon').closest('h1').css({marginTop:0,marginBottom:10});
				
		},
		setFrameHash:	function(options, targFrame){
			// set initial frame to anchor hash if set in URI

			var $this=$(this);

			$this.find('li.mh_item').each(function(){

				// append top frames (li) to filmstrip (ul) until target frame
				if( $(this).data('index') < targFrame )
					$(this).appendTo($this);

			});

			// set currently visible frame index
			$.MHGLOBALS.visibleFrame=$this.children(':first').data('index');
		},
		autoRotate:	function(options){
			// autoscrolling initializer

			var $this=$(this);
			$.MHGLOBALS.autoRotateInterval=setInterval(
				function(){
					$this.rotate(options);
				},$.MHGLOBALS.delay);

		},
		rotate:	function(options, slideLeft, targetIndex){
			// filmstrip (ul) rotation animation


			var $this=$(this);
			var $speed=$.MHGLOBALS.speed;

				// filmstrip left value to animate to
			if(slideLeft){
					// left paddle or scrubber button < visible frame clicked: shift filmstrip back one frame width and move bottom frame to top
					$this.css({left:$.MHGLOBALS.currentLeft-options.frameWidth});
					$this.children(":last").prependTo($(this));
			}
			else	// subtract one frame width from animate target left
					$.MHGLOBALS.currentLeft-=options.frameWidth;


			$this.animate(
			{
					left:$.MHGLOBALS.currentLeft
			},
			{
				easing:	"easeInOutQuad",
				duration: $speed,
				step:	function(){
					$.MHGLOBALS.animating=true;
				},
				complete: function(){

						// reset speed if altered
					$.MHGLOBALS.speed=options.speed;

					$.MHGLOBALS.animating=false;
					$.MHGLOBALS.currentLeft=0;


						// right paddle / scrubber button click: move first frame li to end of filmstrip ul
					$(this).moveTopFrame(options, slideLeft);

					// multi-slide scrubber button clicked
					if(typeof targetIndex==="number")
						$(this).frameSeek(options,targetIndex);
					else if (targetIndex==='halt'){
						options.autoscroll="false";
						$.MHGLOBALS.freezeFrame=true;
					}

					if($.MHGLOBALS.initAutoRotate && options.autoscroll==='true'){

						$.MHGLOBALS.initAutoRotate=false;
						$.MHGLOBALS.delay=options.delay;
						$this.clearQueue().autoRotate(options);

					}


				}
			}
			);


		},
		pauseRotation:	function(options){
			// activate pause and resume controllers for component mouseover

			var $this=$(this),ipadPause=false;

				// for iPad convert filmstrip mouse events to "click"
				if(navigator.platform=="iPad"){

					$this.bind('click',function(){

						ipadPause==false?
							$this.trigger('mouseenter')
						:
							$this.trigger('mouseleave');

						 return;

					});

				}

				$this.bind({

						mouseover:function(){

							$.MHGLOBALS.initAutoRotate=false;
							$(this).clearQueue();
							clearInterval($.MHGLOBALS.autoRotateInterval);
							$.MHGLOBALS.currentLeft=0;

							ipadPause=true;

						},
						mouseleave:function(){

							var $mouseTarg=$(this);

							setTimeout(function(){
									// if mouse out of filmstrip ul onto button-set, don't continue
									// else, proceed to rotate:
								if($.MHGLOBALS.freezeFrame)
									return;

								if(!$.MHGLOBALS.animating && options.autoscroll=="true"){

									$.MHGLOBALS.initAutoRotate=false;
									$this.autoRotate(options);
									
								}

							},10);

							ipadPause=false;
						}

					});

		},
		moveTopFrame:	function(options, slideLeft){
			// append current first frame (li) to filmstrip (ul)
			// if animating, re-reference

			var $this=$(this);

			if(!$.MHGLOBALS.animating){

				if(!slideLeft) // if right paddle or scrubber button
					$this.children(":first").appendTo($(this));

				$this.css({left:$.MHGLOBALS.currentLeft});

				//	set visibleFrame index
				$.MHGLOBALS.visibleFrame=$this.children(":first").data('index');

					// set frame-indicating button state
				$this.setButtonState();

			}
			else	// recurse until not animating
				$this.moveTopFrame(options, slideLeft);

		},
		setButtonState:	function(){

			// sets the visible frame-indicating button state
			var $this=$(this);

			var scrubberButtons=$('div#button-set ul li img')
			var liveButton=$('div#button-set ul li img#img_'+$.MHGLOBALS.visibleFrame);

			scrubberButtons.removeClass('live');
			liveButton.addClass('live');
		},
		frameSeek:	function(options, index){
			// goto indexed frame upon scrubber button click

			if($.MHGLOBALS.animating)
				return;

			var $this=$(this);
			var filmstrip=$this;

			$visibleFrame=$.MHGLOBALS.visibleFrame;

			$.MHGLOBALS.delay=0;

				// pause rotation
			$this.trigger('mouseenter');

			isNaN(index)? 		// paddle button clicked
				singleSlide(index)
			:									// slide button clicked
				multiSlide(index);

				var targetFrame, targetIndex, slideLeft, recurse=false;


				// scrubber button multi-frame behavior
			function multiSlide(index){

					// get frame to slide to
				$this.find('li.mh_item').each(function(){

					if($(this).data('index')==index){

						targetFrame=$(this);
						targetIndex=$(this).data('index');

					}

				});

				$.MHGLOBALS.speed=options.speed*.10;

				targetIndex<$visibleFrame? //continue seek left
					slideLeft=true
				:targetIndex>$visibleFrame? //continue seek right
					slideLeft=false
				:
				 $.MHGLOBALS.speed=options.speed; // seek complete: reset speed to default

				 if(targetIndex!==$visibleFrame){

					$.MHGLOBALS.delay=0;
					$this.rotate(options, slideLeft, targetIndex);

				 }
				 else{

						// frame seek complete: turn off autoscrollfire tracking
					options.autoscroll="false";

					var trackingBlurb=targetFrame.children(':first').children('img').attr('alt');
					fireMetrics('mastHead_image', {'image_name': trackingBlurb});

				 }

			}

				// paddle button single-frame behavior
			function singleSlide(index){

				var $visibleFrame=$.MHGLOBALS.visibleFrame;

					// rotate left and fire tracking
				if(index=="paddle-left"){
						filmstrip.rotate(options, true, 'halt'); //animate left ++
						fireMetrics('leftArrow');
				}
				else{	// rotate right and fire tracking
						filmstrip.rotate(options, false, 'halt'); //animate left --
						fireMetrics('rightArrow');
				}

			}

		},
		setContainerBorder:	function(options){
			// use css3 border radius or image border

			var $this=$(this);

			// ie is retarded, webkit is bent - use border images
			if($('html').hasClass('ie8') || $('html').hasClass('ie7') || $('html').hasClass('webkit')){

				$this.find('div.ieborder.middle').css({
					width	:	options.frameWidth-10
				});
				$this.find('div.ieborder.center').css({
					height:		options.frameHeight-10
				});

			}
			else{// use css3 border radius

				$this.css({
					border			:	'1px  #666 solid',
					borderRadius				: 6
				});
				$this.find('div.ieborder').remove();

			}

		},
		appendButtonSet:	function(options){
			// create, append, activate pagination paddles, and scrubber buttons

			var $this=$(this);

			$frameWidth=options.frameWidth;
			$frameHeight=options.frameHeight;
			$buttonSetLength=$.MHGLOBALS.frameLength;

			// create and append buttons container to rotatingMasthead container
			// clone and append rotatingMasthead ul to button-set


			$this.parent().append('<div id="button-set">'
						+			'<div class="paddle"><img id="paddle-left" src="/etc/designs/gmcom/images/mh_scrub_arrow.png" /></div>'
						+			'<ul></ul>'
						+			'<div class="paddle"><img id="paddle-right"  src="/etc/designs/gmcom/images/mh_scrub_arrow.png" /></div>'
						+			'</div>');

			for(var i=0;i<$buttonSetLength;i++){
				$("div#button-set ul").append("<li><img id='img_"+i+"' src='/etc/designs/gmcom/images/mh_scrub_dot.png' /></li)");
			};

			// on button-set mouseenter, prevent rotation upon filmstrip mouseleave
			$('div#button-set').bind({
				mouseenter:	function(){
					$.MHGLOBALS.freezeFrame=true;
				},
				mouseleave:	function(){
					$.MHGLOBALS.freezeFrame=false;
				}
			});

			$('div#button-set ul li img').each(function(index){
				// initialize trigger and add data object for scrubber buttons

				$(this).bind({

					click	:	function(){
						// scrubber button multi-frame behavior
						$this.frameSeek(options, $(this).data('index'));
					}

				}).data('index', index);
			});

				// initialize paddle button single-frame behavior
			$('div#button-set div.paddle img').each(function(index){
				var mousedownTimer;


				if(navigator.platform=='iPad'){


					$(this).bind('click', function(){

						var button=$(this);

						$this.frameSeek(options, button.attr('id'));
					});
				}
				else{
					

					var leaveto=parseInt($(this).css('marginTop'));
					$(this).bind({

						mousedown:	function(){
							var button=$(this);

							// preempively clear interval incase something prevents mouseup trigger (like, right-click during mousedown)
							clearInterval(mousedownTimer);

							// repeat until mouse up or down
							if($('html').hasClass('ie7') || $('html').hasClass('ie8'))
								$this.frameSeek(options, button.attr('id'));
							else{
								mousedownTimer=setInterval(function(){
									$this.frameSeek(options, button.attr('id'));
								},.5);
							}

						},
						mouseup:	function(){

							clearInterval(mousedownTimer);
							delete mousedownTimer;

						},
						mouseenter:	function(){
							var button=$(this);
							var enterto=parseInt($(this).css('marginTop'))-$(this).height()/4;

							button.css({marginTop:enterto});
						},
						mouseleave:	function(){
							var button=$(this);
							button.css({marginTop:leaveto});
						}
					});
				}
			});


					// initial setting of scrubber button states

				var buttonSetWidth=20*($buttonSetLength+2);
				var buttonSetMargin=-buttonSetWidth/2;

				$('div#button-set').css({
					marginLeft			:		buttonSetMargin
				});

				$('div#button-set ul').css({
					width			:		buttonSetWidth
				});

				 $this.setButtonState();


		}

	});
})(jQuery);

$(document).ready(function(){
	$('#rotatingMasthead').rotatingMasthead({});
});
