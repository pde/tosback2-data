// define global variables used in the functions
var player, videoPlayer, adModule, menuModule, videoCompletedId;
var nextVideo = 0, all_new_this_week_videos = new Array();

// event listener for player load
function onPlayerLoaded(id) {
  // get a reference to the overall player object
  player = brightcove.getExperience(id);
}

// event listener for the player being ready
function onPlayerReady(event) {
  // get references to the video player
  videoPlayer = player.getModule(APIModules.VIDEO_PLAYER);

  var currentVideo = videoPlayer.getCurrentVideo();
  setVideoTitle(currentVideo);

  videoPlayer.addEventListener(brightcove.api.events.MediaEvent.BEGIN, onMediaBegin);
  videoPlayer.addEventListener(brightcove.api.events.MediaEvent.CHANGE, onMediaChange);
  videoPlayer.addEventListener(brightcove.api.events.MediaEvent.COMPLETE, onMediaComplete);

  // get references to the ad module
  adModule = player.getModule(APIModules.ADVERTISING);
  adModule.addEventListener("adStart", onAdStart);
  adModule.addEventListener("adComplete", onAdComplete);
  
  // get references to the menu module
  menuModule = player.getModule(APIModules.MENU);
  menuModule.addEventListener(BCMenuEvent.MENU_PAGE_OPEN, onMenuPageOpen);
  menuModule.addEventListener(BCMenuEvent.MENU_PAGE_CLOSE, onMenuPageClose);
}

//callback function for Media Begin Event
function onMediaBegin(event) {
  adModule.showSponsorMessage(false);
}

//callback function for Media Complete Event
function onMediaComplete(event) {
  videoCompletedId = event.media.referenceId;
  loadNextVideo();
}

// function to load video
function loadNextVideo() {
  nextVideo++;
  if (nextVideo==all_new_this_week_videos.length) {
    nextVideo=0;
  }
  videoPlayer.loadVideo(all_new_this_week_videos[nextVideo]);  
}

// callback function for MENU_PAGE_OPEN event
function onMenuPageOpen(event) {
  if (event.args.page == "Embed") {
    videoPlayer.pause();
  }  
}

// callback function for MENU_PAGE_CLOSE event
function onMenuPageClose(event) {
  if (!videoPlayer.isPlaying()) {
    videoPlayer.play();
  }
}

// callback function for adStart event
function onAdStart(event) {
  setTimeout(showSponsor, 2000);
}

// function to show sponsor message when ad starts
function showSponsor(){
  adModule.showSponsorMessage(true);
}

// callback function for adComplete event
function onAdComplete(event) {
  adModule.showSponsorMessage(false);
}

function onPlayerError(event) {
  //  console.log("info: " + event.info);
}

// callback function for mediaEvent.CHANGE event
function onMediaChange(evt) {
  setVideoTitle(evt.media);
}

// function to set the current video title
function setVideoTitle(currentVideo) {
  $("#mediatitle").html(currentVideo.displayName);
}

$(document).ready(function() {
  var i = 0;
  $('#new-this-week ul li').each(function(index) {
    var id = $(this).attr("id");
	if (id) {
	  all_new_this_week_videos[i] = id;
	  i++;
	};
  });
});
