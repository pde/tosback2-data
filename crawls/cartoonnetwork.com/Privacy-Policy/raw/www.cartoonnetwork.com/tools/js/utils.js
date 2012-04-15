//redirect for mobile browsers
//	var sWidth = screen.width;
//	var sHeight = screen.height;
//	if (sWidth<=480) {
//	document.location.href="http://cartoonnetwork.mobi";
//	}

// property detail tab functions //
function vidOn() {
	document.getElementById('vids').className = "vidsOn"
	document.getElementById('info').className = "infoOff"
	document.getElementById('tv').className = "tvOff"
  //document.getElementById('vids').style.visibility = "visible"
  //document.getElementById('vids').style.height = "auto"
  //document.getElementById('info').style.display = "none"
  //document.getElementById('tv').style.display = "none"
  document.getElementById('midwrap').className = "midtall"
  document.getElementById('videoTab').className = "tabOn"
  document.getElementById('infoTab').className = "tabOff"
  document.getElementById('tvTab').className = "tabOff"
  flashVideoCommunication.onResumeVideo();
}

function vidOff() {
  document.getElementById('vids').style.visibility = "hidden"
  document.getElementById('vids').style.height = "1px"
  flashVideoCommunication.onPauseVideo();
}


function infoOn() {
	document.getElementById('vids').className = "vidsOff"
	document.getElementById('info').className = "infoOn"
	document.getElementById('tv').className = "tvOff"
  //document.getElementById('info').style.display = "block"
  //document.getElementById('vids').style.visibility = "hidden"
  //document.getElementById('vids').style.height = "1px"
  //document.getElementById('tv').style.display = "none"
  document.getElementById('midwrap').className = "midshort"
  document.getElementById('infoTab').className = "tabOn"
  document.getElementById('tvTab').className = "tabOff"
  document.getElementById('videoTab').className = "tabOff"
  flashVideoCommunication.onPauseVideo();
}


function tvOn() {
	document.getElementById('vids').className = "vidsOff"
	document.getElementById('info').className = "infoOff"
	document.getElementById('tv').className = "tvOn"
  //document.getElementById('tv').style.display = "block"
  //document.getElementById('vids').style.visibility = "hidden"
  //document.getElementById('vids').style.height = "1px"
  //document.getElementById('info').style.display = "none"
  document.getElementById('midwrap').className = "midshort"
  document.getElementById('tvTab').className = "tabOn"
  document.getElementById('infoTab').className = "tabOff"
  document.getElementById('videoTab').className = "tabOff"
  flashVideoCommunication.onPauseVideo();
}

function weekOn() {
  document.getElementById('weekTab').className = "tabOn"
  document.getElementById('monthTab').className = "tabOff"
  document.getElementById('yearTab').className = "tabOff"
  document.getElementById('allTimeTab').className = "tabOff"
  dsShell.setInternalDataSet(dsTopScoresThisWeek, true);
  document.getElementById('scores').className = "makeScroll";
  Scroller.reset('scores');
}
function monthOn() {
  document.getElementById('weekTab').className = "tabOff"
  document.getElementById('monthTab').className = "tabOn"
  document.getElementById('yearTab').className = "tabOff"
  document.getElementById('allTimeTab').className = "tabOff"
  dsShell.setInternalDataSet(dsTopScoresThisMonth, true);
  document.getElementById('scores').className = "makeScroll";
  Scroller.reset('scores');
}
function yearOn() {
  document.getElementById('weekTab').className = "tabOff"
  document.getElementById('monthTab').className = "tabOff"
  document.getElementById('yearTab').className = "tabOn"
  document.getElementById('allTimeTab').className = "tabOff"
  dsShell.setInternalDataSet(dsTopScoresThisYear, true);
  document.getElementById('scores').className = "makeScroll";
  Scroller.reset('scores');
}
function allTimeOn() {
  document.getElementById('weekTab').className = "tabOff"
  document.getElementById('monthTab').className = "tabOff"
  document.getElementById('yearTab').className = "tabOff"
  document.getElementById('allTimeTab').className = "tabOn"
  dsShell.setInternalDataSet(dsTopScoresAllTime, true);
  document.getElementById('scores').className = "makeScroll";
  Scroller.reset('scores');
}

// game share //
function gameShareOpen() {
	document.getElementById('shareBox').style.display = "block"	
}
function gameShareClose() {
	document.getElementById('shareBox').style.display = "none"	
}


// download module functions //
function icons() {
  document.getElementById('icnScroll').style.visibility = "visible"
  document.getElementById('wpScroll').style.visibility = "hidden"
}
function wallpapers() {
  document.getElementById('icnScroll').style.visibility = "hidden"
  document.getElementById('wpScroll').style.visibility = "visible"
}
function iconsWide() {
  document.getElementById('icnWide').style.display = "block"
  document.getElementById('wpWide').style.visibility = "hidden"
  document.getElementById('m_icons').style.display = "block"
  document.getElementById('m_papers').style.display = "none"
  document.getElementById('icnWide').className = "makeScroll";
  Scroller.reset('icnWide');
}
function wallpapersWide() {
  document.getElementById('icnWide').style.display = "none"
  document.getElementById('wpWide').style.visibility = "visible"
  document.getElementById('m_papers').style.display = "block"
  document.getElementById('m_icons').style.display = "none"
  document.getElementById('wpWide').className = "makeScroll";
  Scroller.reset('wpWide');
}

function showIcons() {
	showPlayWindow({visible: true});
}
function showPapers() {
	showPaperWindow({visible: true});	
}

function changePage(newLoc)
 {
   nextPage = newLoc.options[newLoc.selectedIndex].value
		
   if (nextPage != "")
   {
      document.location.href = nextPage
   }
 }
 
 


// converts forum title to upper case //
function forumTitle()
{
	var content = document.getElementById('forum_title').innerHTML;
	document.getElementById('forum_title').innerHTML = content.toUpperCase();
}



// toggle class //
function changeClass(elem, className1,className2) {
	elem.className = (elem.className == className1)?className2:className1;
}



// hide copy button if FF or Safari //
<!--
//UserAgent variables
var ns=0;
var ie=0;
var mac=0;

var browserPlat = navigator.platform;
var browserType = navigator.appName;
var browserVers = navigator.appVersion;
var browserAgent = navigator.userAgent;
var finalBrowser = null;

//BROWSER DETECTION
if (browserPlat.indexOf('Mac') != -1) {
	mac=1;
}
		
if (browserType == 'Netscape'){
 ns=1;
} else {
if (browserType == 'Microsoft Internet Explorer'){
 ie=1;
	}
}

if ((mac == 1) && (ns == 1)) {
	finalBrowser = 'macNS';
} else {
		if ((mac == 1) && (ie == 1)) {
		finalBrowser = 'macIE';
	} else {
			if ((mac == 0) && (ns == 1)) {
			finalBrowser = 'winNS';
		} else {
				finalBrowser = 'winIE';
		}
	}
}

  	function hideCopyLink() {
		if ((mac||ns) == 1) {
			if((mac) == 1){
					document.getElementById('copyLinkButton').style.display = "none"
			}else{
				document.getElementById('copyLinkButton').style.display = "none"
			}
		} else {
			document.getElementById('copyLinkButton').style.display = "block"
		}
	}



// ===== hover card/tool tip parsing =====
	// ===== return rounded stars for Ben10GC =====
			function roundRating (region, lookupFunc) {
				if (parseFloat(lookupFunc("{statistic/rating}")) != "NaN") {
					tempNum = parseFloat(lookupFunc("{statistic/rating}"));
				} else {
					tempNum = 0;
				}
				roundedBase = Math.round(tempNum);
				if ((tempNum > (roundedBase + .4)) && (tempNum < (roundedBase + .6))){
					tempNum = roundedBase + "5";
				} else {
					tempNum = roundedBase;
				}
				return tempNum;
			}

	// ===== return rounded stars for BGC =====
			function roundRatingBB (region, lookupFunc) {
			
				tempNum = parseFloat(lookupFunc("{@rating}"));
				roundedBase = Math.round(tempNum);
				if ((tempNum > (roundedBase + .4)) && (tempNum < (roundedBase + .6))){
					tempNum = roundedBase + "5";
				} else {
					tempNum = roundedBase;
				}
				return tempNum;
			}

	// ===== return read-only stars =====
			function getStars (region, lookupFunc) {
				var starString = "";
				var starLimit = 0;
				tempNum = parseFloat(lookupFunc("{@rating}"));
				if (isNaN(tempNum)) {
					tempNum = 0;
				}
				roundedBase = Math.floor(tempNum);
				if (roundedBase <= 5) {
					starLimit = roundedBase;
				} else {
					starLimit = 5;
				}
				for (i = 1; i <= starLimit; i++) {
					starString += '<div class="ratingFullHover"><img src="http://i.cdn.turner.com/toon/tools/img/pixel.gif" width="17" height="17" alt="" border="0"></div>';
				}
				extraStar = true;
				if ((tempNum > (roundedBase + .4)) && (tempNum < (roundedBase + .6))){
					starString += '<div class="ratingHalfHover"><img src="http://i.cdn.turner.com/toon/tools/img/pixel.gif" width="17" height="17" alt="" border="0"></div>';
					extraStar = false;
				}
				emptyNum = 5 - roundedBase;
				emptyLimit = Math.round(5 - tempNum);
				for (i = 1; i <= emptyLimit; i++) {
					starString += '<span class="ratingStars"><img src="http://i.cdn.turner.com/toon/tools/img/pixel.gif" width="17" height="17" alt="" border="0"></span>';
					if (extraStar == false) {
						i += 1;
					}
				}
				return starString;
			}

			function getVideoStars (region, lookupFunc) {
				var starString = "";
				var starLimit = 0;
				tempNum = parseFloat(lookupFunc("{@ranking}"));
				if ((typeof tempNum != "number") || (tempNum == "") || (isNaN(tempNum))) {
					tempNum = 0;
				}
				roundedBase = Math.floor(tempNum);
				if (roundedBase <= 5) {
					starLimit = roundedBase;
				} else {
					starLimit = 5;
				}
				for (i = 1; i <= starLimit; i++) {
					starString += '<div class="ratingFullHover"><img src="http://i.cdn.turner.com/toon/tools/img/pixel.gif" width="17" height="17" alt="" border="0"></div>';
				}
				extraStar = true;
				if ((tempNum > (roundedBase + .4)) && (tempNum < (roundedBase + .6))){
					starString += '<div class="ratingHalfHover"><img src="http://i.cdn.turner.com/toon/tools/img/pixel.gif" width="17" height="17" alt="" border="0"></div>';
					extraStar = false;
				}
//				if (document.rateForm) {
//					document.rateForm.rating_initial.value = tempNum;
//				}
				return starString;
			}
	// ===== parse times played =====
			function getTimesPlayed (region, lookupFunc) {
				timesPlayed = parseInt(lookupFunc("{@timesplayed_now}"));
				return timesPlayed;
			}
			
	// ===== parse video views =====
			
			function getTimesViewed (region, lookupFunc) {
				timesViewed = parseInt(lookupFunc("{@numberOfViews}"));
				return timesViewed;
			}
			
			
// ===== /hover card/tool tip parsing =====

// ===== global nav =====
	// ===== show/hide nav panels =====
	var activeGNavPanel = undefined;
	function openNavPanel (targetPanel) {
		if (activeGNavPanel == targetPanel) {
			slideup(targetPanel);
			activeGNavPanel = undefined;
		} else if (activeGNavPanel == undefined) {
			slidedown(targetPanel);
			activeGNavPanel = targetPanel;
		} else {
			slideup(activeGNavPanel);
			slidedown(targetPanel);
			activeGNavPanel = targetPanel;
		}
		toggleAllShows(targetPanel);
	}
	// ===== show/hide nav panels =====
	
	// ===== image rollover =====
	function rollImg (targetID, targetURL) {
		if (document.images) {
			document.getElementById(targetID).src = targetURL;
		}
	}
	// ===== /image rollover =====
	
	// ===== toggle all shows button =====
	var activeBtn = "";
	var asBtnState = "open";
	function toggleAllShows (targetPanel) {
		if (targetPanel == "gNavAllShowsDisplay") {
			if (asBtnState == "open") {
				document.getElementById('allShowsBtn').className = "allShowsBtnOpen";
				asBtnState = "close";
				activePanel = "";
			} else {
				document.getElementById('allShowsBtn').className = "allShowsBtnClosed";
				asBtnState = "open";
				activePanel = targetPanel;
			}
		} else {
			document.getElementById('allShowsBtn').className = "allShowsBtnClosed";
			if (asBtnState == "open") {
				asBtnState = "close";
				activePanel = "";
			} else {
				asBtnState = "open";
				activePanel = targetPanel;
			}
		}
	}
	// ===== /toggle all shows button =====
	// ===== iniate Search =====
	function searchToon() {
		if ((document.gnSearchForm.keywords.value != "") && (document.gnSearchForm.keywords.value != "SEARCH")) {
			searchQuery = "http://www.cartoonnetwork.com/search/index.html?keywords=" + escape(document.gnSearchForm.keywords.value);
			location.href = searchQuery;
		}
	}
	// ===== /iniate Search =====
	
// ===== /global nav =====

// ===== determine video link context =====
			var wsRegEx = /\s+/	// any white space
			function getVideoLinkContext (region, lookupFunc) {
				var linkFromXML = lookupFunc("{@ctxPageURL}");  // get the value from the XML attribute
				if ((linkFromXML == "") || (linkFromXML == undefined) || (linkFromXML == wsRegEx)) {  // if the value is empty, undefined, or whitespace
					linkFromXML = "/video/dlink/index.html";	// default it
				}
				return linkFromXML;
			}
// ===== /determine video link context =====


//-->

// A space control functions //
/*
			var overlayOn;

			function controlASpace()
			{
				
				var wPlayer = document.getElementById("takeover-background");
				
				//alert('CONTROL ASPACE ' + wPlayer.visible + ' : ' + getFlashMovie("cnhome_fo"));
				
				if ( wPlayer.visible == true  )

					{
						getFlashMovie("cnhome_fo").ASpaceControl('stop');
					} else
					{
						getFlashMovie("cnhome_fo").ASpaceControl('start');
					}	
			}
			
			function getFlashMovie(movieName) {
	   			 if (window.document[movieName]){
	      		  return window.document[movieName];
	   			 }
	    			if (navigator.appName.indexOf("Microsoft Internet")==-1){
	      		  if (document.embeds && document.embeds[movieName])
	         		   return document.embeds[movieName];
	   			 }
	   			 else{
	      		  return document.getElementById(movieName);
	   			 }
			}
*/
