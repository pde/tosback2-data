// initialization variables
window.flowplayer = new Object();
window.bufferingStopped = false;
window.playlistId = false;
window.changeStillframe = false;

flowplayer.fireEvent = function(objectID, event, obj1) {
	switch(event) {
		case "onFinish":
      // do nothing      
			break;
		case "onBeforeBegin":
			if (obj1 != "0" && typeof playlistId != 'undefined') {
				playlistNowPlaying(parseInt(obj1));
			}
			break;					
	}
}

jQuery(document).ready(function() {
  if ($('object[name="embedded_fc_video_playlist"]')) {
    window.playlistId = $('object[name="embedded_fc_video_playlist"]').attr("id");
  }
  if (playlistId == 'embedded_fctv_playlist') {
    buildPlaylist(3,false);
  }
  if (playlistId == 'fc_video_river_playlist') {
    parsePlaylist();
    buildPlaylist(3,true);
  }
  if (changeStillframe == true) {
    var id = $('object[name="fc_video_embedded_player"]').attr("id");
    registerStillframeEvents(id);
  }
});

// load the playlist into the player
function buildPlaylist(size, vertical) {
	scrollableConfig = new Object();
	scrollableConfig.size = size;
	scrollableConfig.vertical = vertical;
	scrollableConfig.hoverClass = 'hover';
	scrollableConfig.api = true;
	window.scrollableApi = $('div.scrollable').scrollable(scrollableConfig);
	playlistToggleActive(1);
	playlistRegisterEvents();	
	$('.fc-video-meta').each(function(i) {
	  index = i+1;
		addthis.button(".fc-video_addthis_" + index);
	});
}

// call the playlist item on the player. Many oddities to this process.
function playlistPlay(id) {
	document.getElementById(playlistId).fp_play(id);
	playlistToggleActive(id);
}

// Toggle classes, to show the proper info for the video
function playlistToggleActive(id) {
  if (playlistId == 'fc_video_river_playlist') {
		var embedValue = '<object width="512" height="313" id="embedded_player_' + playlist[id].vid + '" type="application/x-shockwave-flash" data="http://video.fastcompany.com/plugins/player.swf?v=' + playlist[id].vid + '"><param name="movie" value="http://video.fastcompany.com/plugins/player.swf?v=' + playlist[id].vid + '"/><param name="allowfullscreen" value="TRUE"/><param name="allowscriptaccess" value="always"/><param name="base" value="http://video.fastcompany.com"/><\/object>';
		window.playlistCurrentLink = playlist[id].link;
		window.playlistCurrentTitle = playlist[id].title;
		var downloadValue = 'http://video.fastcompany.com/videos/' + playlist[id].vid + '/formats/podcast_default/file.mp4';
		var commentValue = playlist[id].link + '#comments';
		$('.fc-video-player-list-item-embed-input > input').attr("value", embedValue);
		$('.fc-video-player-list-item-comment > a').attr("href", commentValue);
		$('.fc-video-player-list-item-download > a').attr("href", downloadValue);
    $('li[playlistindex=' + id + ']').find('.fc-video-title-play').css({'background-position' : '0'});		
  }

	$('.fc-video-title-button').removeClass("active");
	$('.fc-video-title-pointer').hide();
	var isHover = $('li[playlistindex=' + id + ']').hasClass("hover");
	if( isHover == true ) {
		$('li[playlistindex=' + id + ']').children('.fc-video-title-pointer').show().css('background-position', '-23px');
		}
		else {
		$('li[playlistindex=' + id + ']').children('.fc-video-title-pointer').show().css('background-position', '-0px');
		}
	$('li[playlistindex=' + id + ']').addClass("active");
	$('.fc-video-meta').removeClass("active").hide();
	$('div[playlistindex=' + id + ']').addClass("active").show();
}

// playlist interaction events
function playlistRegisterEvents() {
	$('.fc-video-title-button').hover(
		function() {
			$("li.active").find('.fc-video-title-pointer').hide().css('background-position', '-99999');
			$(this).find('.fc-video-title-pointer').show().css("background-position","-23px");
			$(this).find('.fc-video-title-play').css({'background-position' : '0'});
			var id = parseInt($(this).attr("playlistindex"));
			$(".fc-video-meta").hide();
			$('div[playlistindex=' + id + ']').addClass("hover").show();
			$('div.fc-video-playlist-meta-wrap').addClass('active');
		},
		function() {
			$('div.fc-video-playlist-meta-wrap').removeClass('active');
			$(this).find('.fc-video-title-pointer').hide().css('background-position', '-99999px');
			$('.active').find('.fc-video-title-pointer').show().css('background-position', '0px');
			$(this).find('.fc-video-title-play').css({'background-position' : '-999999'});
			var id = parseInt($(this).attr("playlistindex"));
			$(".fc-video-meta").removeClass("hover").hide();
			$(".active").removeClass("hover").show();
		}
	);
	$(".fc-video-title-button").click(
		function() {
			id = parseInt($(this).attr("playlistindex"));
			playlistPlay(id);
			}
	);
}

function playlistNowPlaying(id) {
	playlistToggleActive(id);
	if (scrollableApi) {
		scrollableApi.seekTo(id - 1);	
	}
}

function playlistObj(vid,link,title) {
	this.vid=vid;
	this.link=link;
	this.title=title;
}

function parsePlaylist() {
	window.playlist = new Array();
	playlist[0] = '';
	$.each($('ul.fc-video-playlist-list li'), function(i,item){
			var index = parseInt($(this).attr("playlistindex"));
			var title = $(this).attr("title");
			var link = $(this).attr("href");
			var vid = $(this).attr("vid");
			playlist[index] = new playlistObj(vid, link, title);
	});
}

function registerStillframeEvents(id) {
	$('#stillframe-edit-form').submit( function() {
			$('#edit-stillframe-input').removeAttr("disabled");
			return true;
	});

  $("a#edit-stillframe").click( function() {
			var time = document.getElementById(id).fp_getTime();
			time = time.toFixed(1);
			document.getElementById(id).fp_pause();
			$('#edit-stillframe-input').val(time);
			return false;
	});
}