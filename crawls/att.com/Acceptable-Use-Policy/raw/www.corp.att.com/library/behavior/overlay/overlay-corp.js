
$(function() {
	$("a[rel]").overlay({
		// custom top position
		oneInstance: false,
		left : "center",
		top  : "center",
		//effect: 'apple',
		fixed : false,
		mask: {
			color: '#000000',	
			loadSpeed: 200,
			opacity: 0.85
		},
		closeOnClick: false,
		closeOnEsc:   true,
		// when overlay is opened, load our player
		onBeforeLoad : function() {
			var id = this.getTrigger().attr("id");
			$('#mediaContainer').css('width','600px');
			var wrap = this.getOverlay().find(".contentWrap");
			// load the page specified in the trigger
			var href = this.getTrigger().attr("href");
			var mediaId = this.getTrigger().attr("mediaid");
			var mediaTitle = this.getTrigger().attr("mediatitle");
			var showMedia = href.match('.mp3')?"showAudio":"showVideo";
			var fullURL = "/library/include/overlay/ne_media_player.jsp?mediaid=" + mediaId + "&file=" + 
							href + "&overlay=true&mediatitle=" + escape(mediaTitle) + "&" + showMedia + "=true";
			// grab wrapper element inside content
			wrap.load(fullURL);
			var IEBrowser = (navigator.appName == 'Microsoft Internet Explorer');
			var maxLength = 65;
			var overflow = (mediaTitle.length > 2*maxLength);
			if (mediaTitle.length > maxLength) {
				var mediaTitle1 = mediaTitle.substring(0, maxLength + 1);
				var mediaTitleSpace = mediaTitle1.lastIndexOf(' ');
				mediaTitle = mediaTitle1.substring(0, mediaTitleSpace) + '<br>' + 
							 mediaTitle.substring(mediaTitleSpace + 1, 2*maxLength);
				if (overflow)	{ mediaTitle += '...'; }
				$('.overlayTitle').css('width', '500px');
				$('#mediaContainer').css('height','35px');
				if (IEBrowser) {
					$('#containerTitle').css('margin-bottom', '6px');
				} else {
					$('#containerTitle').css('margin-bottom', '18px');
				}
			} else if (IEBrowser) {
				$('#containerTitle').css('margin-bottom','0px');
			} 
			$('#containerTitle').empty();
			var titleHeading = "<div class='overlayTitle'><b>" + mediaTitle + "</b></div>" + 
								"<a href='javascript:void(0);' class='overlayClose' onClick=\"javascript:$('#" + id + "').overlay().close();\">" + 
								"<b>Close</b>&nbsp;&nbsp;<span class='overlayButton'><strong>X</strong></span></a>&nbsp;";
			$('#containerTitle').append(titleHeading);
			if (href.match('.mp3')) {
				$('#mediaContainer').css('margin-top','-25.5px');
			} else {
				$('#mediaContainer').css('margin-top','-193px');
			}
		},
		onLoad: function() {
		},				

		// when overlay is closed, unload our player
		onClose: function() {
			if (jwplayer('jwPlayer') != null) {
				jwplayer('jwPlayer').remove();
			}
			$('#containerTitle').empty();
			$('#containerTitle').css('margin-bottom', '4px');
			$('#mediaContent').empty();
			$('#mediaContainer').css('height','22px');
		}
	});
});

