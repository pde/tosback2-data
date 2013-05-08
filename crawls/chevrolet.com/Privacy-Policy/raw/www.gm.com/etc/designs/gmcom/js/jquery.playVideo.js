/* popout video player */
/**
 * @author jason.campbell
**/
(function($){

	$.fn.extend({

		playVideo: function( options ) {

			var defaults = {
				playerId		:		'playVideoPlayer'
			}

			var options =  $.extend( defaults, options );

			$.playerById="#"+options.playerId;


			return this.each( function(index) {
				var $this=$(this);

				$this.data('data',{
					videoID		:		$this.attr("data_ID"),
					caption		:		$this.attr("data_caption")
				}).removeAttr("data_ID").removeAttr("data_caption");

				$this.click(function(){

				// if video button clicked while player extant, remove
					if($.find(''+$.playerById+'').length){
						$($.playerById).remove();
					}

					$(this).drawPopout(options);

						// fire tracking for video promo tile and masthead video
					if ($this.attr('rel')=="#promotilevideo")
						fireMetrics('videopromotile', { 'image_name' : $this.children(':first').attr('alt')});
					else if($this.hasClass('playVideo'))
						fireMetrics('playvideo');

				});

			});


		},
		drawPopout:	function(options){

			var $this=this;

			var $player=options.playerId;
			var $caption=$this.data("data").caption;


			var markup='<div id="'+$player+'" class="modalPopOutContentGallery videogallery_video_gallery_crx" >'
			+	'<div class="shadedContainer videoWraper">'
			+	'		<div class="upperRow">'
			+	'			<div class="upperLeft opacity70"></div>'
			+	'			<div class="upperRight opacity70"></div>'
			+	'			<div class="upperMid opacity70"></div>'
			+	'		</div>'
			+	'		<div class="midRow">'
			+	'			<div class="midLeft opacity70">'
			+	'				<div class="line"></div>'
			+	'				<div class="midRight opacity70">'
			+	'					<div class="line right"></div>'
			+	'					<div class="midMid opacity70">'

			+	'						<div class="wrapActionContainer">'
			+	'							<div class="actionContainer">'
			+	'								<p id="close-btn">'
			+	'									<span class="genBtn">Close</span>'
			+	'								</p>'
			+	'							</div>'
			+	'						</div>'

			+'						<div class=videoTitle><h2> </h2></div>'
			+'						<div id="playVideoContent">'
			+'						</div>'
			+'						<div class=videoCaptionWrap>'
			+'							<p class=videoCaption>'+$caption+'</p>'
			+'						</div>'
			+'						<div class="clearfix"></div>'
			+'					</div>'
			+'				</div>'
			+'			</div>'
			+'		</div>'
			+'		<div class="lowerRow">'
			+'			<div class="lowerLeft opacity70"></div>'
			+'			<div class="lowerRight opacity70"></div>'
			+'			<div class="lowerMid opacity70">'
			+'							<div id="addThis_container" class="gotham-medium-dynamic-gallery">'
			+'								<a href="#" id="addThis_custom_link">Add This</a>'
			+'								<div class="addthis_toolbox popOut">'
			+'									<a class="addthis_button_facebook"><span></span></a>'
			+'									<a class="addthis_button_twitter"><span></span></a>'
			+'									<a class="addthis_button_blogger"><span></span></a><br />'
			+'									<a class="addthis_button_google"><span></span></a>'
			+'									<a class="addthis_button_myspace"><span></span></a>'
			+'									<a class="addthis_button_tumblr"><span></span></a>'
			+'								</div>'
			+'							</div>'
			+'			</div>'
			+'		</div>'
			+'	</div>'
			+'</div>';

			$('body').append(markup);
			
			addthis.toolbox(".addthis_toolbox");

			$(''+$.playerById+' .actionContainer p#close-btn').click(function(){
				$($.playerById).remove();
				fireMetrics( 'video_close_button' );
			});

			$this.addThisForPoput();
			$this.stylePlayer();
			$this.insertVideo();

		},	//END drawPopout

		addThisForPoput:	function(){



			var addThisTimer;

		// move toolbox to non-obscured position
//			$(''+$.playerById+' .addthis_toolbox').addClass('popOut');
//			$(''+$.playerById+' .lowerMid').append($(''+$.playerById+'  #addThis_container'));

			$(''+$.playerById+' #addThis_custom_link').bind({
				mouseenter: function(){$('.addthis_toolbox.popOut').show();},
				mouseleave: function(){addThisTimer=setTimeout(function(){$('.addthis_toolbox.popOut').hide();}, 200);}
			});

			$(''+$.playerById+' .addthis_toolbox.popOut').bind({
				mouseenter: function(){clearTimeout(addThisTimer);},
				mouseleave: function(){$('.addthis_toolbox.popOut').hide();}
			});

		// addThis styles
			$(''+$.playerById+' #addThis_container').css({
				position			:	'absolute',
				top						:	-51,
				left					: 522,
				left					: 502,
				zIndex				:	99999
			});

			$(''+$.playerById+' .addthis_toolbox.popOut').css({
				position			:	'absolute',
				marginTop			:	-20,
				zIndex				:	99999
			}).hide();

			$('html.ie '+$.playerById+' .addthis_toolbox.popOut').css({
				marginTop			:	10
			});

			$('body.ipad '+$.playerById+'  #addThis_container').css({
				top						:	-62,
				left					: 460
			});

		},	//END addThisForPopout

		stylePlayer:	function(){



		//	position the popOut container
			$($.playerById).css({
					left				: '50%',
					marginLeft	: '-307px',
					position		: 'fixed',
					width				: 615,
					zIndex			: 99999
				});

			$(''+$.playerById+'  .line').css({
					height			:	427
				});
			//595
			$(''+$.playerById+'  .shadedContainer').css({
						width			:	607
				});

			$(''+$.playerById+' #playVideoContent').css({
					height			:	366
			});

		// ipad styles
			$('body.ipad '+$.playerById+'  .shadedContainer').css({
					width			:	554
			});
			$('body.ipad '+$.playerById+'  #playVideoContent').css({
					height		:	344
			});
			$('body.ipad '+$.playerById+'  .midMid').css({
					paddingTop		:	0
			});

		},

		insertVideo:	function(){

			var $this=this;
			//$videoId=$this.data("data").videoID;

			$this.doBrightcove()?
				$this.appendBrightcovePlayer()
			:
				$this.appendCustomPlayer();

		},

		doBrightcove:	function(){

			var altPlat=false;
			var mobilePlat=['ipad','iphone','android','phone'];

			for(i in mobilePlat){
				if($('body').hasClass(mobilePlat[i])){
					altPlat=true;
					break;
				}
			}

			switch(true){
				case $('html').hasClass('ie7'):
				case $('html').hasClass('ie8'):
					altPlat=true;
					break;
				default:
					break;
			}

			if(altPlat)
				return true;
			else
				return false;

		},

		videoPostLoad:	function(){

			var $this=this;



			$(''+$.playerById+'  object#bcplayer').css({
				height			: 327,
				left				: 0,
				marginLeft	: -7,
				marginTop	: -6
			});

		// ie styles
			$('html.ie7 '+$.playerById+' #playVideoContent').css({
					paddingTop	: 35,
					height			:	305
			});
			$('html.ie8 '+$.playerById+' #playVideoContent').css({
					paddingTop	: 35,
					height			:	310
			});
			$('html.ie9 '+$.playerById+' object#bcplayer').css({					
					height			:	386
			});

			// if Brightcove native mobile player, give it a sec.
			if($(''+$.playerById+' #playVideoContent').find('iframe')){
				setTimeout(function(){
					$(''+$.playerById+'  iframe').css({
							marginLeft		:	-28
					});
				},1000);
			}


		// center player vertically after player markup injected
		var popOutTop=($(window).height()/2)-($($.playerById).height()/2);
			$($.playerById).css({
					top					:	popOutTop
			});
		},

		appendBrightcovePlayer:	function(){

			var $this=this;
			var $videoID=$this.data("data").videoID;


			$.ajax({
				 type: "GET",
				 url: 'http://admin.brightcove.com/js/BrightcoveExperiences_all.js',
				 cache: true,
				 success: function() {

						 var videoplayer =	'<object id="bcplayer" class="BrightcoveExperience">'
												 +				'<param name="bgcolor" value="#000000" />'
												 +				'<param name="width" value="596" />'
												 +				'<param name="height" value="300" />'
												 +				'<param name="wmode" value="transparent" />'
												 +				'<param name="playerID" value="bcplayer" />'
												 +				'<param name="playerKey" value="AQ~~,AAAAAFwZDTE~,MqPnSyI7c8Levp1d7Tr3Xeg9M_vlBR6r" />'
												 +				'<param name="isVid" value="true" />'
												 +				'<param name="isUI" value="true" />'
												 +				'<param name="name" value="bcplayer" />'
												 +				'<param name="id" value="bcplayer" />'
												 +				'<param name="dynamicStreaming" value="true" />'
												 +				'<param name="autoStart" value="true" />'
												 +				'<param name="@videoPlayer" value="'+$videoID+'" />'
												 +			'</object>';

						 $('#playVideoContent').html(videoplayer);
						 brightcove.createExperiences();


				 },
			 dataType: "script",
			 cache: true});//end ajax

			$this.videoPostLoad();
		},

		appendCustomPlayer:	function(){

			var $this=this;
			var $videoID=$this.data("data").videoID;


			var videoplayer =	'<object id="bcplayer"  width="600" height="380"  classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,47,0">'																				
				 +				'<param name="movie" value="/etc/designs/gmcom/flash/bcplayer/bcplayer.swf" />'
				 +				'<param name="bgcolor" value="#FFFFFF" />'
				 +				'<param name="base" value="http://admin.brightcove.com" />'
				 +				'<param name="seamlesstabbing" value="false" />'
				 +				'<param name="allowFullScreen" value="true" />'
				 +				'<param name="swLiveConnect" value="true" />'
				 +				'<param name="allowScriptAccess" value="always" />'
				 +				'<param name="flashvars" value="video_id='+$videoID+'" />'
				 +				'<embed src="/etc/designs/gmcom/flash/bcplayer/bcplayer.swf" bgcolor="#FFFFFF" flashVars="video_id='+$videoID+'" base="http://admin.brightcove.com" name="bcplayer" width="600" height="380" seamlesstabbing="false" type="application/x-shockwave-flash" allowFullScreen="true" allowScriptAccess="always" swLiveConnect="true" pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash">'
				 +				'</embed>'
				 +			'</object>';

				$('#playVideoContent').html(videoplayer);
				$('#playVideoContent').css('height', 'auto');
				//$('#playVideoContent').css('height', '450px');

			$this.videoPostLoad();
		}
	});
})(jQuery);

	$(document).ready(function(){
		$('a.button.playVideo').playVideo({});
		$('#videoPromoTileLarge a').playVideo({});
		$('#videoPromoTileMedium a').playVideo({});
	});