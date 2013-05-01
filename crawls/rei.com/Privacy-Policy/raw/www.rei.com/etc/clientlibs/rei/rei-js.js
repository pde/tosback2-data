$(document).ready(function(){
	$('.bikeBrandsModal').fancybox({
		'height': 400,
		'padding': 10,
		'width': 200,
		'scrolling':'no',
		'autoScale': false,
		'titleShow': false,
		'type': 'iframe'
	});
});
/* $Id: posterprofile.js 2270 2012-04-12 19:27:33Z rray $ */

/**
 * @(#)posterprofile.js
 * 
 * COPYRIGHT (c) 2012 by Recreational Equipment Incorporated. All rights reserved.
 * 
 * @author rray
 */
/* $Id$ */

$(document).ready(function(){
	var volVideoSlide = new Object();
	volVideoSlide.slideCount = 0;
	volVideoSlide.indx = 0;
	volVideoSlide.isSliding = false;
	volVideoSlide.width = $('#vidContainer').width() + 10;
	volVideoSlide.init = function(){addClickListeners(); setSlideCount();};
	
	function setSlideCount(){
		var numLi = 0;
		$('#thumbList li').each(function(){
			numLi++;								 
		});
		volVideoSlide.slideCount = (numLi/4) - 1;
	}
	
	function setIndx(direction){
		if (direction == 'up') {
			if (volVideoSlide.indx < volVideoSlide.slideCount) {
				volVideoSlide.indx++;	
			}
		} else if (direction == 'down') {
			if (volVideoSlide.indx > 0) {
				volVideoSlide.indx--;	
			}
		}
		
		doSlide();
	}
	
	function doSlide(){
		volVideoSlide.isSliding = true;
		var xPos = '-' + (volVideoSlide.width * volVideoSlide.indx) + 'px';
		$('#thumbList').animate({left: xPos}, 500, function() { volVideoSlide.isSliding = false; checkBtns()});
	}
	
	function checkBtns(){
		$('#leftBtn div').removeClass().addClass("btnOn");
		$('#rightBtn div').removeClass().addClass("btnOn");
		
		if (volVideoSlide.indx == 0){
			$('#leftBtn div').removeClass().addClass("btnOff");
		}
		if (volVideoSlide.indx == volVideoSlide.slideCount) {
        	$('#rightBtn div').removeClass().addClass("btnOff");
		}
		if (volVideoSlide.indx > volVideoSlide.slideCount) {
            $('#rightBtn div').removeClass().addClass("btnOff");
		}
	}
	
	function addClickListeners(){
		$('img.videoThumb').click(function(){
										   
		});
		$('#leftBtn').click(function(){
			if(!volVideoSlide.isSliding){
				setIndx('down');	
			}
		});
		$('#rightBtn').click(function(){
			if(!volVideoSlide.isSliding){
				setIndx('up');
			}
		});
	}
	
	volVideoSlide.init();
	
	// ----------------------------------------------------------------
	
	var volPhotoSlide = new Object();
	volPhotoSlide.slideCount = 0;
	volPhotoSlide.indx = 0;
	volPhotoSlide.speed = 5000;
	volPhotoSlide.isPlaying;
	volPhotoSlide.activeBtn;
	volPhotoSlide.prevBtn = '#photo0';
	volPhotoSlide.activeSlide;
	volPhotoSlide.activeCaption;
	volPhotoSlide.prevSlide = '#imageSlide0';
	volPhotoSlide.prevCaption = '#caption0';
	volPhotoSlide.init = function(){addPhotoClickListeners();volSlideCount();playSlides();};
	
	var photoTimer = 0;
	
	function volSlideCount(){
		var numLi = 0;
		$('a.photoBtn').each(function(){
			numLi++;								 
		});
		volPhotoSlide.slideCount = (numLi)-1;
	}
	
	function advanceSlide(){
		if(volPhotoSlide.indx < volPhotoSlide.slideCount){
			volPhotoSlide.indx++	
		} else {
			volPhotoSlide.indx = 0;
		}
		
		volPhotoSlide.activeBtn = '#photo' + volPhotoSlide.indx;
		volPhotoSlide.activeSlide = '#imageSlide' + volPhotoSlide.indx;
		volPhotoSlide.activeCaption = '#caption' + volPhotoSlide.indx;
		
		handleTransition();
		
		volPhotoSlide.prevBtn = volPhotoSlide.activeBtn;
		volPhotoSlide.prevSlide = volPhotoSlide.activeSlide;
		volPhotoSlide.prevCaption = volPhotoSlide.activeCaption;
	}
	
	function handleTransition(){
		$(volPhotoSlide.activeBtn).css('text-decoration','underline');
		$(volPhotoSlide.prevBtn).css('text-decoration','none');
		$(volPhotoSlide.activeSlide).fadeIn('fast');
		$(volPhotoSlide.prevSlide).fadeOut('fast');
		$(volPhotoSlide.prevCaption).css('display', 'none');
		$(volPhotoSlide.activeCaption).css('display','block');
	}
	
	function addPhotoClickListeners(){
		$('a.photoBtn').click(function(){
			pause();
			
			volPhotoSlide.indx = (this.id).substring(this.id.length-1, this.id.length);
			
			volPhotoSlide.activeBtn = '#photo' + volPhotoSlide.indx;
			volPhotoSlide.activeSlide = '#imageSlide' + volPhotoSlide.indx;
			volPhotoSlide.activeCaption = '#caption' + volPhotoSlide.indx;
			
			handleTransition();
			
			volPhotoSlide.prevBtn = volPhotoSlide.activeBtn;
			volPhotoSlide.prevSlide = volPhotoSlide.activeSlide;
			volPhotoSlide.prevCaption = volPhotoSlide.activeCaption;
			
		});
		$('#playPause').click(function(){
			togglePlay();
		});
	}
	
	function togglePlay(){
		if(volPhotoSlide.isPlaying){
			$('#playPause').css('background-image','url(../pix/common/playIcon.gif)');
			volPhotoSlide.isPlaying = false;
			clearInterval(photoTimer);
		} else {
			$('#playPause').css('background-image','url(../pix/common/pauseIcon.gif)');
			volPhotoSlide.isPlaying = true;
			advanceSlide();
			playSlides();
		}	
	}
	
	function pause(){
		$('#playPause').css('background-image','url(../pix/common/playIcon.gif)');
		volPhotoSlide.isPlaying = false;
		clearInterval(photoTimer);
	}
	
	function playSlides(){
		volPhotoSlide.isPlaying = true;
		photoTimer = setInterval(advanceSlide, volPhotoSlide.speed);	
	}
	
	volPhotoSlide.init();
	
	// ------------------------------------------------------------------------
	
	$('a.vidPopA').fancybox({
		'height': 380,
		'padding': 0,
		'width': 592,
		'scrolling':'no',
		'autoScale': false,
		'titlePosition' : 'inside',
		'type': 'iframe'
	});
	
	$('a.vidPopB').fancybox({
		'height': 470,
		'padding': 0,
		'width': 592,
		'scrolling':'no',
		'autoScale': false,
		'titlePosition' : 'inside',
		'type': 'iframe'
	});
	
	$('a.vidPopC').fancybox({
		'height': 430,
		'padding': 0,
		'width': 592,
		'scrolling':'no',
		'autoScale': false,
		'titlePosition' : 'inside',
		'type': 'iframe'
	});
	
});
/* $Id$ */

$(document).ready(function() {
	// Tab Control
	$('.versiona .tabs li').click(function() {
		// Tabs
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		
		//used for authoring experience; check rel tag on li, if not undefined; reload page with current location plus rel attribute 
		if ($(this).attr('rel') !== undefined) {
			window.location = window.location.pathname + $(this).attr('rel');
		}
		
		// Panels
		var target = $(this).attr('target');
		$('.'+target).siblings().removeClass('active');
		$('.'+target).addClass('active');
		
		//Fix product tile heights in column controls within a tab
		fixProductTileHeights();
	});
});
/* $Id: versiona.js 3823 2012-07-03 18:18:05Z rray $ */
// set a cookie for a particular name
function setCookie(name, value) {
   var docLocation = document.URL;
   var docLocationLen = docLocation.length;
   document.cookie = name + "=" + docLocationLen + "~" + escape(document.location) + escape(value) + ";PATH=/" ;
}
function readCookie (CookieName) {
  var lf = "\n";
  var CookieString = document.cookie;
  var CookieSet = CookieString.split (';');
  var SetSize = CookieSet.length;
  var CookiePieces
  var cookieValue = "";
  var x = 0;
  for (x = 0; ((x < SetSize) && (cookieValue == "")); x++) {
    CookiePieces = CookieSet[x].split ('=');
    if (CookiePieces[0].substring (0,1) == ' ') {
      CookiePieces[0] = CookiePieces[0].substring (1, CookiePieces[0].length);
    }
    if (CookiePieces[0] == CookieName) {
     if(CookiePieces[1])
     {
    	 cookieValue = CookiePieces[1];
     }
    }
  }
  return cookieValue;
}

function Get_Cookie( check_name ) {
	// first we'll split this cookie up into name/value pairs
	// note: document.cookie only returns name=value, not the other components
	var a_all_cookies = document.cookie.split( ';' );
	var a_temp_cookie = '';
	var cookie_name = '';
	var cookie_value = '';
	var b_cookie_found = false; // set boolean t/f default f

	for ( i = 0; i < a_all_cookies.length; i++ )
	{
		// now we'll split apart each name=value pair
		a_temp_cookie = a_all_cookies[i].split( '=' );


		// and trim left/right whitespace while we're at it
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

		// if the extracted name matches passed check_name
		if ( cookie_name == check_name )
		{
			b_cookie_found = true;
			// we need to handle case where cookie has no value but exists (no = sign, that is):
			if ( a_temp_cookie.length > 1 )
			{
				cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
			}
			// note that in cases where cookie is initialized but no value, null is returned
			return cookie_value;
			break;
		}
		a_temp_cookie = null;
		cookie_name = '';
	}
	if ( !b_cookie_found )
	{
		return null;
	}
}

function Set_Cookie( name, value, expires)
{
    // set time, it's in milliseconds
    var today = new Date();
    today.setTime( today.getTime() );
    
    /*
    if the expires variable is set, make the correct expires time, the current script below will set it for x number of days, to make it for hours,
    delete * 24, for minutes, delete * 60 * 24
    */
    if ( expires ){
        expires = parseInt(expires) * 1000 * 60 * 60 * 24;
    }
    var expires_date = new Date( today.getTime() + (expires) );
    
    document.cookie = name + "=" + escape( value ) + ";path=/" +( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" );
}

// this deletes the cookie when called
function Delete_Cookie( name, path, domain ) {
    if ( Get_Cookie( name ) ) document.cookie = name + "=" +
    ( ( path ) ? ";path=" + path : "") +
    ( ( domain ) ? ";domain=" + domain : "" ) +
    ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
}

/*HELPER FUNCTIONS*/


/*--------------------------------------------------------------------------------------------------------------
BEGIN: helper functions
----------------------------------------------------------------------------------------------------------------*/
function readArray(theArray) {
	//this function takes param:{theArray} and returns string value
	var returnVal;

	if(theArray.length > 1){
		returnVal = theArray.join(', ');
		return returnVal;
	}
	else{
		return theArray[0];
	}
}
function pushArrCookie(key, val) {
	if (val != '') {
		arrCookie.push(key + val);
	}
}
function getUserQueryData(dataIn) {
	var startIx = dataIn.indexOf(':') + 1;
	var dataOut = dataIn.substring(startIx, dataIn.length);
	if (dataIn.indexOf('state') > - 1) {
		dataOut = dataIn.substring(startIx, startIx + 2);
	}
	return dataOut;
}




//func used to fill form fields with data from cookies: userSearchQuery (Find A Store Click)
function fillFormFields(dCookie, frmFind, clearFlds, fromWhere) {
	debugAlert('enter func fillformFields: ' + fromWhere);
	var userData =[];
	userData = dCookie.split(', ');
	if(clearFlds){
		$('input', '.frmFindAStore').val('');
	}
	
	for (var ix = 0; ix < userData.length; ix++) {
		if (frmFind) {
			if (userData[ix].indexOf('city:') > - 1) {
				$('#cityInput', '.frmFindAStore').val(getUserQueryData(userData[ix]));
			} else if (userData[ix].indexOf('state:') > - 1) {
				$('#stateInput', '.frmFindAStore').val(getUserQueryData(userData[ix]));
			} else if (userData[ix].indexOf('zipCode:') > - 1) {
				$('#zipInput', '.frmFindAStore').val(getUserQueryData(userData[ix]));
			} else {
				if(parseInt(userData[ix]) > 0){
					$('#zipInput', '.frmFindAStore').val(getUserQueryData(userData[ix]));
				}
				else{ alert('foreign data in cookie: ' + userData[ix]); }
			}
		} else {
			if (userData[ix].indexOf('street:') > - 1) {
				$('#txtStreet', '.frmDirections').val(getUserQueryData(userData[ix]));
			} else if (userData[ix].indexOf('city:') > - 1) {
				$('#txtCity', '.frmDirections').val(getUserQueryData(userData[ix]));
			} else if (userData[ix].indexOf('state:') > - 1) {
				$('#txtState', '.frmDirections').val(getUserQueryData(userData[ix]));
			} else if (userData[ix].indexOf('zipCode:') > - 1) {
				$('#txtZip', '.frmDirections').val(getUserQueryData(userData[ix]));
			} else {
				alert('foreign data in cookie: ' + userData[ix]);
			}
		}
	}
}
function startFromReDo() {
	$('.directionsInfo').hide();
	$('.frmDirections').show();
	$('.startOverLink').hide();
	$('.userTravelModeMsg').text('Starting Point:');
}
function resetMap() {
	Delete_Cookie('userSearchQuery', '/');
	Delete_Cookie('lastStartingPoint', '/');
	Delete_Cookie('memberZipCode', '/');
	stateSearch = false;
	var oldLoc = new String(window.location.href);
	var indexOfHash = oldLoc.indexOf('#');
	if (indexOfHash > 0) {
		var newLoc = oldLoc.substring(0, indexOfHash);
		window.location.href = newLoc;
	}
	var indexOfQmark = oldLoc.indexOf('?');
	if (indexOfQmark > 0) {
		var newLoc = oldLoc.substring(0, indexOfQmark);
		window.location.href = newLoc;
	}
}
function switchMaps(isStatic, fromWhere) {
	debugAlert('enter func switchMaps(): ' + fromWhere);
	
	if (! isStatic) {
		$('.staticMap').hide();
		$('.staticMapTitle').hide();
		$('.store_listing').show();
		$('.mapTitle').show();
	} else {// 'view state map' link click
		if(Get_Cookie('useCookies')){//need to check4Cookies first before going into endless while loop
			Set_Cookie('stateMap', 'showIt', 1);
			var check4Cookie = true;
			while(check4Cookie){
				if(Get_Cookie('stateMap')){
					check4Cookie = false;
					var oldLoc = new String(window.location.href);
					var indexOfHash = oldLoc.indexOf('#');
					if (indexOfHash > 0) {
						var newLoc = oldLoc.substring(0, indexOfHash);
						window.location.href = newLoc;
					}
					var indexOfQmark = oldLoc.indexOf('?');
                	if (indexOfQmark > 0) {
                		var newLoc = oldLoc.substring(0, indexOfQmark);
                		window.location.href = newLoc;
                	}
				}
			}
		}
		else{//cookies are disabled or user deleted cookie that was set at docReady
			var oldLoc = new String(window.location.href);
			var indexOfHash = oldLoc.indexOf('#');
			if (indexOfHash > 0) {
				var newLoc = oldLoc.substring(0, indexOfHash);
				window.location.href = newLoc;
			}
			var indexOfQmark = oldLoc.indexOf('?');
            if (indexOfQmark > 0) {
                var newLoc = oldLoc.substring(0, indexOfQmark);
                window.location.href = newLoc;
            }
		}
	}
}


function getStoreInfo(storeNumber) {
	var arrStoreNfo;
	for (var rr = 0; rr < arrStoreInfo.length; rr++) {
		if (arrStoreInfo[rr][14] == storeNumber) {
			arrStoreNfo = arrStoreInfo[rr];
			break;
		}
	}
	return arrStoreNfo;
}
function findStore(storeName) {
	var foundStore = false;
	for (var ix = 0; ix < arrStoreInfo.length; ix++) {
		if (arrStoreInfo[ix][0].toLowerCase() == storeName.toLowerCase()) {
			foundStore = true;
			break;
		}
	}
	if (foundStore) {
		alert('index: ' + ix);
	}
}
function setMarkers(storeNumber, stateCode) {
	for (var ix = 0; ix < arrStoreInfo.length; ix++) {
	
		//clear marker first
		arrMarkers[ix].setMap(null);		
		
		if(storeNumber == '' || storeNumber < 1){
			if(arrStoreInfo[ix][6] == stateCode){
				arrMarkers[ix].setMap(map);
				arrMarkers[ix].visible = 'true';
			}
		}
		else if(!storeNumber){
			arrMarkers[ix].setMap(map);
		}
		else{
			if(arrMarkers[ix].title == storeNumber){
				arrMarkers[ix].setMap(map);
				arrMarkers[ix].visible = 'true';
				map.setCenter(arrMarkers[ix].position);
				switchMaps(false, 'from setMarkers - storeNumber present');			
			}
			
		}
	}
}



/***************************************************************************/
function toRad(deg) {
 	return deg * Math.PI/180;
}
function calculateDistance(start, end){
	if(startPt != ''){
		var R = 6371;
		var startLat = parseFloat(start.lat());
		var startLng = parseFloat(start.lng());
		var endLat = parseFloat(end.lat());
		var endLng = parseFloat(end.lng());
		
		var dLat = toRad(endLat - startLat);
		var dLon = toRad(endLng - startLng);
		var dLat1 = toRad(startLat);
		var dLat2 = toRad(endLat);
		var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(dLat1) * Math.cos(dLat1) *
		Math.sin(dLon/2) * Math.sin(dLon/2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		var d = R * c;
		
		debugAlert('\rreturn val: ' + d + '\r');
		return parseFloat(d);
	}
	else{ return; }
}
function numOrdA(a, b){ return (a-b); }


/***************************************************************************/


function StopTheClock()
{
    debugAlert('seconds past: ' + secs);
    if(timerRunning)
        clearTimeout(timerID);
    timerRunning = false;
}

function StartTheTimer()
{
	debugAlert('starting timer now..');
        self.status = secs;
        secs = secs + 1;
        debugAlert('secs?: ' + secs);
        timerRunning = true;
        timerID = self.setTimeout("StartTheTimer()", delay);
}
/***************************************************************************/



function selectTab(tabsId, ix){
	alert(tabsId);
	//$('#' + tabsId).triggerTab(ix);
}

function trim(str, chars) {
    return ltrim(rtrim(str, chars), chars);
}
 
function ltrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}
 
function rtrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}

function debugAlert(inParam){
	if(navigator.appCodeName.toLowerCase().indexOf('mozilla') > -1 && debugMode){
		if(typeof(console) !== 'undefined' && console != null) {
			console.log(inParam);
		}
	}
	return;
}


/*--------------------------------------------------------------------------------------------------------------
END: helper functions
----------------------------------------------------------------------------------------------------------------*/
/*FUNCS FOR DISPLAYING DIRECTIONS.*/


/*---------------------------------------------------------------------------------------------
this function gets its value from Find A Store Form in left column
---------------------------------------------------------------------------------------------*/
function getFrmDirectionsInfo() {
	var street = '', city = '', state = '', zipCode = '', theForm = null, curStorePoint;
		
	theForm = document.frmDirections;
	street = theForm.txtStreet.value;
	city = theForm.txtCity.value;
	state = theForm.txtState.value;
	zipCode = theForm.txtZip.value;
	
	//-- write cookie lastStartingPoint for 'select new starting point' click()
	if (street != '' || city != '' || state != '' || zipCode != '') {
		arrCookie =[];
		pushArrCookie('street:', street);
		pushArrCookie('city:', city);
		pushArrCookie('state:', state);
		pushArrCookie('zipCode:', zipCode);
		
		Set_Cookie('lastStartingPoint', readArray(arrCookie), 2);
		arrCookie = [];
	}

	
	var arrTemp =[];	
		if (street != '') { arrTemp.push(street); }
		if (city != '') { arrTemp.push(city); }
		if (state != '') { arrTemp.push(state); }
		if (zipCode != '') { arrTemp.push(zipCode); }
	
	return arrTemp;
}


/*------------------------------------------------------------------------------------------
func used when user clicks on [Get Directions] Link in Store Results Listing
--------------------------------------------------------------------------------------------*/
function getDirections(storeName, storeNumber) {
	debugAlert('enter func getDirections: ' +storeName);
	var storeInfo = getStoreInfo(storeNumber);
	
	var storeDetails = "<span class=\"p2\">" + storeInfo[0] + "</span>" + "<br/>" + storeInfo[4] + "<br/>" +
	storeInfo[5] + ', ' + storeInfo[6] + ' ' + storeInfo[7] + "<br/>" + storeInfo[9];
	curStoreAddress = storeInfo[4] + " " + storeInfo[5] + ', ' + storeInfo[6] + ' ' + storeInfo[7];
	curStorePoint = new google.maps.LatLng(storeInfo[2], storeInfo[3]);
	
	$('.storeInfo_print', '.printHead').html(storeDetails);
	$('.storeDetails', '.storeInfo').html(storeDetails);
	$('.storeName', '.storeInfo').html(storeInfo[0] + ' ');
	$('.storeInfo_NAME', '.frmDirections').val(storeInfo[0]);
	$('.storeLat', '.frmDirections').val(storeInfo[2]);
	$('.storeLng', '.frmDirections').val(storeInfo[3]);	
	
	document.getElementById('storePage').href = storeInfo[8];
	$('.hdrBar', '.leftSideBar').html(storeName);
	
	$('.userTravelModeMsg').html('Get Directions:');
	$('.findDiv').hide();
	$('.directionsDiv').show();
	$('.frmDirections', '.directionsDiv').show();
	$('.directionsInfo', '.directionsDiv').hide();
	$('.stepDirections', '.directionsDiv').html('');	
	
	if (Get_Cookie('lastStartingPoint')) {
		fillFormFields(Get_Cookie('lastStartingPoint'), false, false, 'from getDirections :: if(lastStartingPoint');
	} 
}


/*--------------------------------------------------------------------------------------------
func used when user clicks on [Get Directions] button in Store Details (Get Directions FORM)
----------------------------------------------------------------------------------------------*/
function calcRoute(travelMode) {
	debugAlert('enter func calcRoute: ' + curStoreAddress);
	var dirStep, mapRoute, stepDirectionsHdr, stepDirectionsFtr;
	var start = readArray(getFrmDirectionsInfo());
	var end = curStorePoint;
	var userTravelMode, travelModeDesc, streetRoute = false;
	var frmDirections_ddlTravelMode = document.frmDirections.travelMode; 
	var ddlTravelModeType = document.getElementById('travelModeType');
	
	frmDirections_ddlTravelMode.selectedIndex = travelMode;
	ddlTravelModeType.selectedIndex = travelMode;
	
	switch (document.frmDirections.travelMode.value) {
		case "Driving":
			userTravelMode = google.maps.DirectionsTravelMode.DRIVING;
			travelModeDesc = "Driving Directions: ";
			break;
		
		case "Walking":
			userTravelMode = google.maps.DirectionsTravelMode.WALKING;
			travelModeDesc = "Walking Directions: ";
			streetRoute = true;
			break;
		
		case "Bicycling":
			userTravelMode = google.maps.DirectionsTravelMode.BICYCLING;
			travelModeDesc = "Bicycling Directions:";
			streetRoute = true;
			break;
	}
	
	var request = {
		origin: start, destination: end, travelMode: userTravelMode, avoidHighways: streetRoute, region: region
	};
	
	directionsService.route(request, function (result, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			$('.travelModeType').show();
			directionsDisplay.setMap(map);
			directionsDisplay.setDirections(result);
			
			$('.startOverLink').show();
			mapRoute = result.routes[0].legs[0];
			stepDirectionsHdr = "<tr style=\"background-color:#eee;\">" +
			"<td style=\"padding:4px 0 0 5px;vertical-align:middle;width:20px;border:1px solid #999;border-right:0px;\"><img src=\"http://maps.gstatic.com/intl/en_us/mapfiles/icon_greenA.png\"></td>" +
			"<td colspan=\"2\" style=\"width:255px;vertical-align:middle;border:1px solid #999;border-left:0px;\">" + start + "</td></tr>";
			$('.stepDirections', '.directionsDiv').html(stepDirectionsHdr);
			$('.userTravelModeMsg').text(travelModeDesc + "(" + mapRoute.distance.text + ")");
			
			for (var ii = 0; ii < mapRoute.steps.length; ii++) {
				//-- output step directions
				if (ii == 0) {
					dirStep = "<tr class=\"tblStepDir\"><td class=\"p2\" style=\"padding-top:7px;\">" + (ii + 1) + ".</td><td class=\"dirStep\">" + mapRoute.steps[ii].instructions +
					"</td><td class=\"dirStepDistance\">" + mapRoute.steps[ii].distance.text + "</td></tr>";
				} else {
					dirStep = "<tr class=\"tblStepDir\"><td class=\"p2\">" + (ii + 1) + ".</td><td class=\"dirStep\">" + mapRoute.steps[ii].instructions +
					"</td><td class=\"dirStepDistance\">" + mapRoute.steps[ii].distance.text + "</td></tr>";
				}
				$('.stepDirections', '.directionsDiv').append(dirStep);
				$('.frmDirections', '.directionsDiv').hide();
				$('.directionsInfo', '.directionsDiv').show();
			}
			
			stepDirectionsFtr = getStoreInfo(document.frmDirections.storeInfo_NAME.value);
			stepDirectionsFtr = "<tr style=\"background-color:#eee;\">" +
			"<td style=\"padding:4px 0 0 5px;vertical-align:middle;width:20px;border:1px solid #999;border-right:0px;\"><img src=\"http://maps.gstatic.com/intl/en_us/mapfiles/icon_greenB.png\"></td>" +
			"<td colspan=\"2\" style=\"width:255px;vertical-align:middle;border:1px solid #999;border-left:0px;\">" + stepDirectionsFtr[4] + "</td></tr>";
			
			$('.stepDirections', '.directionsDiv').append(stepDirectionsFtr);
			
			/*http://code.google.com/apis/maps/documentation/v3/services.html#Steps*/
			/*http://www.experts-exchange.com/Programming/Languages/Scripting/JavaScript/Q_23996682.html*/
		} else if (status = google.maps.DirectionsStatus.NOT_FOUND) {
			alert('LOCATION NOT FOUND: Please enter a new starting point.');
		} else {
			alert("status: " + status);
		}
	});
	
	return false;
}


function roundNumber(num, dec) {
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}







/*search functions*/


/*----------------------------------------------------------------------------------------------------------------------------
BEGIN: these funcs are used to update the leftSideBar Store Listing as the map is zoomed/panned
------------------------------------------------------------------------------------------------------------------------------*/	
	
	searchState = function (dState, fromWhere) {
		debugAlert('enter func searchState: ' + fromWhere);		
		var bounds = map.getBounds();
		var isValidState = false;
		directionsDisplay.setMap(null);
		setMarkers('', dState);
		$('input', '.frmFindAStore').val('');
		$('#stateInput', '.frmFindAStore').val(dState);
		stateSearch = true;
		//$.get("/etc/clientlibs/rei/rei-storelocator/source/reiStores_v3.xml", {
		$.get("/cemservices/stores.xml", {
		},
		function (reiStores) {
			$(reiStores).find("stateCodeZoomLevels").each(function () {
				debugAlert('dState: ' + dState);	
				var stateNode = $(this).find(dState);
				var stateNodeCenter = stateNode.text();
				if (stateNode.attr('zoom')) {
					debugAlert('zoom attribute: true');
					if (stateNodeCenter == '') {
						for (var ii = 0; ii < arrStoreInfo.length; ii++) {
							if (arrStoreInfo[ii][6] == dState) {
								map.setCenter(new google.maps.LatLng(arrStoreInfo[ii][2], arrStoreInfo[ii][3]));
								map.setZoom(parseInt(stateNode.attr('zoom')));
								switchMaps(false, 'from searchState()');
								isValidState = true;
								break;
							}
						}
					} else {
						geoCodeAddress(trim(stateNode.text()), true, stateNode.attr('zoom'));
					}
				} else {
					debugAlert('zoom attribute: false');
					for (var ii = 0; ii < arrStoreInfo.length; ii++) {
						if (arrStoreInfo[ii][6] == dState) {
							map.setCenter(new google.maps.LatLng(arrStoreInfo[ii][2], arrStoreInfo[ii][3]));
							map.setZoom(parseInt(stateNode.attr('zoom')));
							switchMaps(false, 'from searchState()');
							isValidState = true;
							break;
						}
					}
					if(!isValidState){
						alert('No stores found in that U.S. State.');
					}
				}
			});
		});
		searchStoresFlag = false;
		setTimeout( function(){ searchStores('from searchState()'); }, 1200);
	};


	searchStores = function (fromWhere) {
		debugAlert('enter func searchStores: ' + fromWhere);		
		var arrStoreList =[], arrStoreNames =[];
		
		isFirstStore = true;
		if (! hideList) {
			$('.store_listing').show();
		}
		var bounds = map.getBounds();
		
		if(!stateSearch){
			var dStart, dEnd;
			for (var ii = 0; ii < arrStoreInfo.length; ii++) {
				if (bounds.contains(new google.maps.LatLng(arrStoreInfo[ii][2], arrStoreInfo[ii][3])) && arrMarkers[ii].map != null) {
					if (! document.getElementById('store_' + arrStoreInfo[ii][14])) {
						dStart = startPt;
						dEnd = new google.maps.LatLng(arrStoreInfo[ii][2], arrStoreInfo[ii][3]);
						arrStoreInfo[ii][18] = roundNumber(calculateDistance(dStart, dEnd), 1);
						arrStoreList.push(arrStoreInfo[ii]);
						arrStoreNames.push(arrStoreInfo[ii][0]);
					}
				}
			}
		}
		else{
			for (var ii = 0; ii < arrStoreInfo.length; ii++) {
				if (bounds.contains(new google.maps.LatLng(arrStoreInfo[ii][2], arrStoreInfo[ii][3])) && arrMarkers[ii].map != null) {
					if (! document.getElementById('store_' + arrStoreInfo[ii][14])) {
						arrStoreList.push(arrStoreInfo[ii]);
						arrStoreNames.push(arrStoreInfo[ii][0]);
					}
				}
			}
		}		
		
		if (resetZoom) {
			resetZoom = false;
			map.setZoom(8);
		}
		sortStoreList(arrStoreList, arrStoreNames, stateSearch);
	};
	
	function sortStoreList(storeInfo, storeNames) {
		debugAlert('enter func: sortStoreList()\t\tisStateSearch?: ' + stateSearch);
		debugAlert('storeNames: ' + storeNames);
		var arrLen = storeInfo.length;
		
		storeNames = storeNames.sort();
		
		if(!stateSearch){
			//build distance array, sort that one
			var arrDists = [], distSort = 0;
			for(var adIX = 0; adIX < storeInfo.length; adIX++){
				arrDists.push( storeInfo[adIX][18] );
			}		
			arrDists.sort(numOrdA);			
			
			for (var xx = 0; xx < arrLen; xx++) {		
				for (var yy = 0; yy < storeInfo.length; yy++) {				
					if (arrDists[xx] == storeInfo[yy][18]) {
						updateStoreListing(storeInfo[yy], false);
						storeInfo.splice(yy, 1);
						distSort += 1;
						break;
					}
				}
			}
		}
		else{
			var alphabeticalSort = 0;
			for (var xx = 0; xx < arrLen; xx++) {
				for (var yy = 0; yy < storeInfo.length; yy++) {
					if (storeNames[xx] == storeInfo[yy][0]) {
						updateStoreListing(storeInfo[yy], true);
						storeInfo.splice(yy, 1);
						alphabeticalSort += 1;
						break;
					}
				}
			}
		}
	}
	
	function updateStoreListing(storeInfo) {
		storeResultsFound = true;
		var storeWrapper = document.createElement('div');
			storeWrapper.id = 'store_' + storeInfo[14];
			storeWrapper.className = 'reiStore';
			
	
		if (isFirstStore) {
			isFirstStore = false;
			storeWrapper.className = 'reiStore noTopMarg';
		}
		
		var storeLink = document.createElement('a');
			storeLink.href = storeInfo[8];
			storeLink.className = 'storeLink';
			storeLink.innerHTML = storeInfo[0].toString();
		
		var storeAddress = document.createElement('div');
			storeAddress.innerHTML = storeInfo[4] + '<br/>' + storeInfo[5] + ', ' + storeInfo[6] + ' ' + storeInfo[7];
		
		var storePhone = document.createElement('div');
			storePhone.innerHTML = storeInfo[9];		
		
		var directionsLink = document.createElement('a');
			directionsLink.id = 'dirLink_' + storeInfo[14];
			directionsLink.style.marginRight = '10px'; 
			directionsLink.href = '#mapTop';
			if(!stateSearch){
				directionsLink.innerHTML = 'Get Directions&nbsp;&nbsp;(' + storeInfo[18] + ' mi.)';
			}
			else{
				directionsLink.innerHTML = 'Get Directions';
			}
			$(directionsLink).click(function (e) {
				getDirections(storeInfo[0], storeInfo[14]);
			});
			
			/*directionsLink.addEventListener('click', function () {
				getDirections('' + storeInfo[0] + '');
			}, false);*/
		
		storeWrapper.appendChild(storeLink);
		storeWrapper.appendChild(storeAddress);
		storeWrapper.appendChild(storePhone);
		storeWrapper.appendChild(directionsLink);
		
		//check specialty shop availability
		if(storeInfo[15] == 'true'){		
			var shopIcon = document.createElement('img');
				shopIcon.title = 'Bike Shop';
				shopIcon.alt = '';
				shopIcon.className = 'shopIcon';
				shopIcon.src = '/etc/static/rei-wcm/pix/common/bike_Icon.gif';
				storeWrapper.appendChild(shopIcon);
		}		
		if(storeInfo[16] == 'true'){
			var shopIcon = document.createElement('img');
				shopIcon.title = 'Ski Shop';
				shopIcon.alt = '';
				shopIcon.className = 'shopIcon';
				shopIcon.src = '/etc/static/rei-wcm/pix/common/ski_Icon.gif';
				storeWrapper.appendChild(shopIcon);
		}		
		
		//check rentals availability		
		if(storeInfo[17]){
			var rentalsIcon = document.createElement('img');
				rentalsIcon.title = storeInfo[17];
				rentalsIcon.alt = '';
				rentalsIcon.className = 'shopIcon';
				rentalsIcon.src = '/etc/static/rei-wcm/pix/common/rentals_icon.gif';
				storeWrapper.appendChild(rentalsIcon);
		}
		

		var storeListing = document.getElementById('store_listing');
			storeListing.appendChild(storeWrapper);
	}


/*------------------------------------------------------------------------------------------
this function takes frmFindAStore fldVals >> cookie
--------------------------------------------------------------------------------------------*/
function getFrmFindInfo(formLoad, fromWhere){
	debugAlert('enter func getFrmFindInfo: ' + fromWhere);
	
	var street = '', city = '', state = '', zipCode = '', theForm = null;
	theForm = document.frmFindAStore;
	city = theForm.cityInput.value;
	state = document.frmFindAStore.stateInput.value.toUpperCase();
	zipCode = document.frmFindAStore.zipInput.value;
	
	if (city != '' || state != '' || zipCode != '') {	
		//-- build string to GeoCode the address
		userSearchQuery ='';
			if (city != '') { userSearchQuery += city + ','; }
			if (state != '') {
				if(city != ''){ userSearchQuery += ','; }
				userSearchQuery += state;
			}
			if (zipCode != '') {
				if(city!='' || state!=''){ userSearchQuery += ','; }
				userSearchQuery += zipCode; 
			}
			
		resetZoom = true;
		
		if (city == '' && zipCode == '' && state != '') {
			stateSearch = true;
		} else {
			stateSearch = false;
		}
		
		if(formLoad){
			debugAlert('sending userSearchQuery bck to frmLoad: ' + userSearchQuery);
			return userSearchQuery;
		}
		else{
			//-- build cookie from form field values
			arrCookie =[];
			pushArrCookie('city:', city);
			pushArrCookie('state:', state);
			pushArrCookie('zipCode:', zipCode);
			
			if(Get_Cookie('userSearchQuery')){
				if(arrCookie != Get_Cookie('userSearchQuery')){
					$('.store_listing').html('');					
				}
			}
			Set_Cookie('userSearchQuery', readArray(arrCookie), 2);
			arrCookie = null;
		}
		
		if (stateSearch) {
			resetZoom = false;
			searchState(state, 'from getFrmFindInfo');
		}
		else{//full user query here
			geoCodeAddress(userSearchQuery, true, 8, true);
			setMarkers();
			stateSearch = false;
			searchStores('getFrmFindInfo - full user query');
		}

	}
}
var arrStoreInfo =[];
var arrCookie =[];
var arrMarkers =[];
var searchStores, curStoreAddress = '', geoCoder, hideList = false, storeResultsFound = false;
var directionDisplay, map, isFirstStore = true;
var directionsService = (typeof(google) != 'undefined' ? new google.maps.DirectionsService() : null);
var resetZoom = false;
var searchStoresFlag = true;
var useLastSearchQuery = false;
var linkedStore = '';
var hashStateCode = '', hashZipCode = '';
var stateSearch = false;
var possibleStoreRentals = new Array('Mountaineering Gear', 'Camping Stoves', 'Tents', 'Backpacks', 'Sleeping Bags/Pads', 'Paddling Gear', 'Alpine Skiing', 'Snowboarding', 'Nordic Skiing', 'Snowshoes');

/*	DEBUG VARS	*/
var debugMode = false;
var secs = 0;
var timerID = null;
var timerRunning = false;
var delay = 1000;
var doOnce = true;

/*
	0	'Mountaineering Gear', 
	1	'Camping Stoves', 
	2	'Tents', 
	3	'Backpacks', 
	4	'Sleeping Bags/Pads', 
	5	'Paddling Gear', 
	6	'Alpine Skiing', 
	7	'Snowboarding', 
	8	'Nordic Skiing', 
	9	'Snowshoes'
*/

var startPt = '';



/*	FOR SOME REASON THE REGION CODE DOES NOT WORK AS EXPECTED
	http://code.google.com/apis/maps/documentation/v3/services.html#Geocoding	*/
var region = "US";



/* rei:request_information/rei:curent_url */
$(document).ready(function () {
	if(!$("#storeLocatorMap").is('*')){
		return;
	}
	Set_Cookie('useCookies', 'yes', 1);
	
	Delete_Cookie('userSearchQuery', '/');
	
	var infowindow, userLatLng;
	
	linkedStore = document.location.href;
	linkedStore = linkedStore.substring(linkedStore.lastIndexOf('/')+1, linkedStore.length);

	$(".frmFindAStore").keydown(function (event) {
		if (event.keyCode == "13") { getFrmFindInfo(false, 'keydown event'); }
	});
	
	$(".frmDirections").keydown(function (event){
		if (event.keyCode == "13") { calcRoute(document.frmDirections.travelMode.selectedIndex); }
	});
	
	function initialize() {      
			      
		var showMarkers  = true;
		var callSetMarkers = false;
		
		directionsDisplay = new google.maps.DirectionsRenderer();
		geoCoder = new google.maps.Geocoder();
		
		//need to get starting userLatLng
		if(document.location.hash){
			var hashVal = document.location.hash;

			if(!isNaN(hashVal.substring(1,6))){//--	#{zipCode}: from storeFinder in footer or url
				hashZipCode = hashVal.substring(1, 6);
				fillFormFields(hashZipCode, true, true, 'init :: hash check - zipCode');
				userLatLng = hashZipCode;
				switchMaps(false, 'init :: hash check - zipCode');
			}
			else{//--	#{stateCode}: ie WA, CA, AZ
				userLatLng = 'Seattle,WA,98101';
				hideList = true;
				
				if(isNaN(hashVal) && hashVal.substring(1, 3).length == 2){//stateSearch
					stateSearch = true;
					hashStateCode = hashVal.substring(1, hashVal.length).toUpperCase();
					userLatLng = hashStateCode;
				}
			}
		}
		/*else if (Get_Cookie('userSearchQuery') && Get_Cookie('userSearchQuery') != 'undefined' && !Get_Cookie('stateMap')) {
			fillFormFields(Get_Cookie('userSearchQuery'), true, false, 'init :: use savedQuery');
			 var savedQuery = userLatLng = getFrmFindInfo(true, 'init :: use savedQuery');
		}*/
		else if (Get_Cookie('memberZipCode') && !Get_Cookie('stateMap')) {
			fillFormFields(Get_Cookie('memberZipCode'), true, false, 'init :: use memberZipCode');						
			userLatLng = getUserQueryData(Get_Cookie('memberZipCode'));			
			switchMaps(false, 'init :: use memberZipCode');
		}
		else if(parseInt(linkedStore) > 0){
			hideList = true;
			userLatLng = 'Seattle,WA,98101';
			showMarkers = false;
		}
		else {
			//arbitrarily set map to seattle and add all markers
			hideList = true;
			userLatLng = 'Seattle,WA,98101';
		}
		
		if (geoCoder) {
			geoCoder.geocode({ 'address': userLatLng, 'region': region
			},
			function (results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					userLatLng = startPt = results[0].geometry.location;
					
					//need to run an address through the geoCoder upon first load to make sure that the service is available.
					var userOptions = {
						zoom: 9,
						center: userLatLng,
						mapTypeId: google.maps.MapTypeId.ROADMAP
					}
					
					map = new google.maps.Map(document.getElementById("mapCanvas"), userOptions);
					directionsDisplay.setMap(map);
					
					//-- grab the xml from reiStores, create an array and store the vars for each child node of item in it
					//$.get("/etc/clientlibs/rei/rei-storelocator/source/reiStores_v3.xml", {
					$.get("/cemservices/stores.xml", {
					},
					function (reiStores) {
						$(reiStores).find("item").each(function (xx) {
							var arrStore =[];
							arrStore[0] = $(this).find('title').text();
							arrStore[1] = $(this).find('description').text();
							
							arrStore[2] = $(this).find('lat').text();
							arrStore[3] = $(this).find('lng').text();
							
							arrStore[4] = $(this).find('street').text();
							arrStore[5] = $(this).find('city').text();
							arrStore[6] = $(this).find('state').text();
							arrStore[7] = $(this).find('zip').text();
							arrStore[8] = $(this).find('link').text();
							arrStore[9] = $(this).find('phone').text();
							arrStore[10] = $(this).find('stateRadius').text();
							arrStore[11] = $(this).find('weekdays').text();
							arrStore[12] = $(this).find('saturday').text();
							arrStore[13] = $(this).find('sunday').text();
							arrStore[14] = arrStore[8].substring(8, arrStore[8].length);	//store number
							arrStore[15] = 'false';	//bike shop
							arrStore[16] = 'false';	//ski shop
							arrStore[17] = false;	//rentals append string
							arrStore[18] = '';		//this is a holder cell for distance sorting
							
							var storeSvcs = $(this).find('services').text().toLowerCase();
							if (storeSvcs.indexOf('bike') > - 1) {
								arrStore[15] = 'true';
							}
							if (storeSvcs.indexOf('ski') > - 1) {
								arrStore[16] = 'true';
							}
														
							var storeIcon = {
								satellite: {
									icon: '/etc/static/rei-wcm/pix/common/rei_icon.png'
								},
								flagship: {
									icon: 'http://google-maps-icons.googlecode.com/files/bigcity.png'
								}
							};
							
							//-- Make the Marker
							latlng = new google.maps.LatLng(arrStore[2], arrStore[3]);
							var newIcon = storeIcon[$(this).find('icon').attr('type')] || {};
							
							//-- if storePageLink sent the request
							if(parseInt(linkedStore)>0){
								/*if( parseInt(arrStore[8].substring(arrStore[8].lastIndexOf('/')+1, arrStore[8].length)) == parseInt(linkedStore) ){*/
								if( parseInt(arrStore[14]) == parseInt(linkedStore) ){
									linkedStore = arrStore[14];
									callSetMarkers = true;
								}
							}
							
							var marker = new google.maps.Marker({
								position: latlng,
								map: map,
								icon: newIcon.icon,
								title: arrStore[0],
								visible: showMarkers
							});
							
							//-- check store rental info and save it to storeRentals >> arrStore[17]							
							var storeRentalsXml = [], storeRentals = '', rentalFlag = false;
							
							$(this).find('rentals').each( function(xx){
								storeRentalsXml.push($(this).text());
							});
							
							for(var cnt=0; cnt<possibleStoreRentals.length; cnt++){
							
								for(var ix=0; ix<storeRentalsXml.length; ix++){
								
									if(possibleStoreRentals[cnt] == storeRentalsXml[ix]){
										rentalFlag = true;
										storeRentals += possibleStoreRentals[cnt];
										
										if( (cnt > -1) && (cnt < possibleStoreRentals.length-1) ){
											storeRentals += ', ';
										}
									}
								}
							}
							if(rentalFlag){	arrStore[17] = 'Store Rentals: ' + storeRentals; }
							
							//add Markers to array
							arrMarkers[xx] = marker;
							//-- now add storeArr to array
							arrStoreInfo[xx] = arrStore;														
							arrStoreInfo['s' + arrStore[14]] =  arrStore;
							var storeId = getSLQueryString()['storeId'];
							if(storeId == arrStore[14]){
								try{
									geoCodeAddress(arrStore[1], true,13,false)
								}
								catch(err){									
								}
							}
							
							var contentString = '<div class="infoWrapper">' + 
								'<div class="infoContent">' + 
								'<div class="infoDiv"><strong>' +
								'<a href="' + arrStore[8] + '">' + arrStore[0] + '</a>' + '</strong> <br/>' +
								arrStore[4] + '<br/>' + arrStore[5] + ', ' + arrStore[6] + ' ' + arrStore[7] + '<br/>' + arrStore[9] +
								'<br/><a href="#mapTop" onClick="getDirections(\'' + arrStore[0] + '\', \'' + arrStore[14] + '\');">Get Directions</a><br/><br/>' +
								'<a href="/stores/' + arrStore[14] + '">More About this REI Store</a><br/><br/></div>' +
								'<a class="storeImgLink" href="' + arrStore[8] + '">' +
								'<img src="/pix/stores/storePictures/email/' + arrStore[14] + '.jpg" height="127" width="127" border="0" />' +
								'</a>'
								'</div></div>';
							

							google.maps.event.addListener(marker, 'click', function () {
								if (infowindow) infowindow.close();
								infowindow = new google.maps.InfoWindow({
									content: contentString
								});
								infowindow.open(map, marker);
							});
							
							
						});
						//end find	
						
					
						//storeLink was clicked so handle that
						if(callSetMarkers){
							setMarkers(linkedStore, 'init :: if(callSetMarkers)');
						}
						
						//checking to see if stateCode is in hash
						if(hashStateCode != '' && hashStateCode != 'MAPTOP'){
							searchState(hashStateCode, 'init :: hashStateCode');
						}
					});
					//end get

					//ADD EVENT LISTENERS NOW THAT THE MAP OBJECT IS AVAILABLE
					google.maps.event.addListener(map, 'bounds_changed', function () {
						$('.store_listing').html('');
						storeResultsFound = false;
						/*if(stateSearch){//handles form load with savedQuery instances
							searchState(savedQuery, 'event listener for bounds_changed');
						}
						else*/ if (searchStoresFlag) {
							searchStores('searchStoresFlag in event listener for bounds_changed');
						} else {
							searchStoresFlag = true;
						}
					});
						
					/*http://911-need-code-help.blogspot.com/2009/03/zoom-to-fit-all-markers-polylines-or.html*/
					$('area').click(function (e) {
						var dInfo = e.target.href;
						var toSplit = dInfo.substring(dInfo.lastIndexOf('/'), dInfo.length);
						var state = toSplit.split('#');
						dInfo = state[1];
						searchState(dInfo, 'stateMap click handler');
					});
					$('#btnFindAStore').click(function(e){
						getFrmFindInfo(false, 'click');
					});				
					
					
					//delete cookie for viewing state map, it will get re-set when user clicks on viewStateMap link
					if(Get_Cookie('stateMap')){
						Delete_Cookie('stateMap', '/'); 
					}
					
					/*if(savedQuery){
						geoCodeAddress(savedQuery, true);
					}*/
					
					

				} else {
					var errMsg = "Geocode was not successful for the following reason: " + status;
					window.location.href = '/content/rei/en_us/site/store-locator.html';
				}
			});
		} else {
			alert('GeoCoder service not available at this time. \n Please. refresh your browser and try again.');
		}
		

	}
	//end init
	
	google.setOnLoadCallback(initialize);
	
});
//end document.ready

function getReqParam(name){
	if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
		return decodeURIComponent(name[1]);
}


function geoCodeStoreNumber(storeNumber){
	$.get("/cemservices/stores.xml", {}, function(reiStores){
		
	});
}

/*------------------------------------------------------------------------------------------
this function maps an address from param:theAddress
--------------------------------------------------------------------------------------------*/
function geoCodeAddress(theAddress, centerMap, zoomLevel, userSearch) {
	debugAlert('enter func geoCodeAddress: ' + theAddress);
	if (geoCoder) {
		
		//TO DO: this is not the proper fix, find the set or get of cookie:userSearchQuery 
		if(theAddress.lastIndexOf(',') == theAddress.length-1){
			//theAddress = theAddress.substring(theAddress, theAddress.lastIndexOf(','));
		}
		
		geoCoder.geocode({ 'address': theAddress
		},
		function (results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
			
				//this is for distanceCalcs in mapsV3_searchFuncs > updateStoreListing()
				startPt = results[0].geometry.location;
				
				if (centerMap) {
					if (zoomLevel) {
						map.setCenter(results[0].geometry.location);
						map.setZoom(parseInt(zoomLevel));
					} else {
						map.setCenter(results[0].geometry.location);
					}
					return;
				} else {
					return results[0].geometry.location;
				}
			} else {
				var errMsg = "Geocode was not successful for the following reason: " + status;
				alert(errMsg);
			}
		});
		switchMaps(false, 'geoCodeAddress');
	} else {
		alert('GeoCoder service not available at this time. \n Please. refresh your browser and try again.');
	}
}


function getSLQueryString() {
	  var result = {}, queryString = location.search.substring(1),
	      re = /([^&=]+)=([^&]*)/g, m;

	  while (m = re.exec(queryString)) {
	    result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
	  }

	  return result;
}

$(window).load(function () {
	if(!$("#storeLocatorMap").is('*')){
		return;
	}
	$('.mapDirections', '.frmDirections').click(function () {
		calcRoute(document.frmDirections.travelMode.selectedIndex);
	});
	
	var z = getReqParam('z');
	if (z && z.match(/^\d{5}$/)) {
		$('#zipInput').val(z);
		
		// Wait for GeoCoder to become available
		var waitForGeocoder = setInterval(function() {
			if (geoCoder) {
				getFrmFindInfo(false, 'click');
				clearInterval(waitForGeocoder);
			}
		}, 500);
	}
	
	
});
/* $Id: ticker.js 1918 2012-03-30 17:55:27Z jowilso $ */

$(document).ready(function() {
	$('.tickerContainer').each(function() {
		$(this).ticker();
	});
});
/* $Id: featuredstore.js 2270 2012-04-12 19:27:33Z rray $ */

/**
 * COPYRIGHT (c) 2012 by Recreational Equipment Incorporated. All rights 
 * reserved.
 * 
 * @author rray
 */
$( document ).ready( function() {

    $( "#gridViewLink" ).click( function( e ) {
        $( "#photoListView" ).hide();
        $( "#photoGridView" ).show();
        var listItem = $('#photoListView .tabs li.active'); 
        var listItemLI = $( "#photoGridView .tabs li");
        var listItemIndex = $('#photoListView .tabs li').index(listItem);
        listItemLI.removeClass("active");
        listItemLI.eq(listItemIndex).attr("class","active");
        e.stopPropagation();
        return false;
    } );

    $( "#listViewLink" ).click( function( e ) {
        $( "#photoGridView" ).hide();
        $( "#photoListView" ).show();
        var listItem = $('#photoGridView .tabs li.active'); 
        var listItemLI = $( "#photoListView .tabs li");
        var listItemIndex = $('#photoGridView .tabs li').index(listItem);
        listItemLI.removeClass("active");
        listItemLI.eq(listItemIndex).attr("class","active");
        e.stopPropagation();
        return false;
    } );

} );
$( document ).ready( function() {

    var hash = window.location.hash;
    if ( hash.charAt( 0 ) == '#' ) hash = hash.substring( 1 );
    $.userprofile.showSection( hash );
    $.userprofile.setUpSectionLinks();

    $( "#seeAllCommentsLink" ).click( $.userprofile.showAllComments );

} );

$.userprofile = {};

$.userprofile.checkForUserId = function() {
	var includesUserId=location.href.search(/userprofile.html\/\d+/);
	var isUserProfilePage=location.href.search(/userprofile.html/);
	if(isUserProfilePage > 0 && includesUserId < 0){
		var REI_SESSION_ID = Get_Cookie("REI_SESSION_ID");
		if (REI_SESSION_ID) {
			var userId = REI_SESSION_ID.split(',')[0];
			location.href = location.href+"/"+userId;
		}
	}
};$.userprofile.checkForUserId();

$.userprofile.showAllComments = function() {
    $( "#comments_short" ).css( "display", "none" );
    $( "#comments_long" ).css( "display", "block" );

    var handle = $( "#userProfile_recentActivity_link" );
    handle.wrap( '<a href="#"></a>' );
}

$.userprofile.showSection = function( hash ) {
    if ( hash == "photos" ) {
        $.userprofile.activateProfileSection( "userProfile_photos" );
    } else if ( hash == "reviews" ) {
        $.userprofile.activateProfileSection( "userProfile_productReviews" );
    } else if ( hash == "activity" ) {
        $.userprofile.activateProfileSection( "userProfile_recentActivity" );
    } else {
        $.userprofile.activateProfileSection( "userProfile_profileDetails" );
    }
}

$.userprofile.activateProfileSection = function( tabId ) {
    $( "#userProfile_photos" ).css( "display", "none" );
    $( "#userProfile_productReviews" ).css( "display", "none" );
    $( "#userProfile_recentActivity" ).css( "display", "none" );
    $( "#userProfile_profileDetails" ).css( "display", "none" );
    if ( tabId == "userProfile_recentActivity" ) {
        $( "#comments_long" ).css( "display", "none" );
        $( "#comments_short" ).css( "display", "block" );
    }
    $( "#" + tabId ).css( "display", "block" );
    var current = $.userprofile.currentTab;
    if ( current !== undefined ) {
        var handle = $( "#" + current + "_link" );
        if ( !$( handle ).parent().is( "a" ) ) {
            $( handle ).wrap( '<a href="#"></a>' );
        }
    }
    var handle = $( "#" + tabId + "_link" );
    if ( $( handle ).parent().is( "a" ) ) {
        handle.unwrap();
    }
    $.userprofile.currentTab = tabId;
}

$.userprofile.setUpSectionLinks = function() {
    $( "#userProfile_photos_link" ).click( function() {
        $.userprofile.activateProfileSection( "userProfile_photos" )
    } );
    $( "#userProfile_productReviews_link" ).click( function() {
        $.userprofile.activateProfileSection( "userProfile_productReviews" )
    } );
    $( "#userProfile_recentActivity_link" ).click( function() {
        $.userprofile.activateProfileSection( "userProfile_recentActivity" )
    } );
    $( "#userProfile_profileDetails_link" ).click( function() {
        $.userprofile.activateProfileSection( "userProfile_profileDetails" )
    } );
}

$.userprofile.paginatePopularList = function( pageSize ) {
    if ( pageSize === undefined || pageSize == null || pageSize == "" ) {
        pageSize = 15;
    }

    $( '#popularListView' ).pajinate( {
        items_per_page: pageSize,
        item_container_id: '.popularListContent',
        num_page_links_to_display: 4,
        nav_panel_id: '.pagination',
        nav_label_prev : '',
        nav_label_next : ''
    } );
}

$.userprofile.paginateNewestList = function( pageSize ) {
    if ( pageSize === undefined || pageSize == null || pageSize == "" ) {
        pageSize = 15;
    }

    $( '#newestListView' ).pajinate( {
        items_per_page: pageSize,
        item_container_id: '.newestListContent',
        num_page_links_to_display: 4,
        nav_panel_id: '.pagination',
        nav_label_prev : '',
        nav_label_next : ''
    } );
}

$.userprofile.paginatePopularGrid = function( pageSize ) {
    if ( pageSize === undefined || pageSize == null || pageSize == "" ) {
        pageSize = 15;
    }

    $( '#popularGridView' ).pajinate( {
        items_per_page: pageSize,
        item_container_id: '.popularGridContent',
        num_page_links_to_display: 4,
        nav_panel_id: '.pagination',
        nav_label_prev : '',
        nav_label_next : ''
    } );
}

$.userprofile.paginateNewestGrid = function( pageSize ) {
    if ( pageSize === undefined || pageSize == null || pageSize == "" ) {
        pageSize = 15;
    }

    $( '#newestGridView' ).pajinate( {
        items_per_page: pageSize,
        item_container_id: '.newestGridContent',
        num_page_links_to_display: 4,
        nav_panel_id: '.pagination',
        nav_label_prev : '',
        nav_label_next : ''
    } );
}
/* $Id: sharethis.js 1918 2012-03-30 17:55:27Z jowilso $ */
/* $Id$ */
/* $Id: questionsummary.js 1918 2012-03-30 17:55:27Z jowilso $ */
/* $Id$ */

$(document).ready(function() {
	
	// Activate Ask a Question Button
	$('#questionprompt-button').click(function(event) {
		event.preventDefault();
		// Decide which interface to display
		if (loggedIn) {
			$('#questionprompt-form-section').toggle();
		} else {
			$('#questionprompt-login-section').toggle();
		}
	});
	
});
/* $Id$ */

/**
 * @(#)questionform.js
 * 
 * COPYRIGHT (c) 2012 by Recreational Equipment Incorporated. All rights reserved.
 * 
 * @author rray
 * 
 * TODO - client-side form validation
 */
$(document).ready(function() {
	
	if (loggedIn) {
		var REI_SESSION_ID = Get_Cookie("REI_SESSION_ID");
		if (REI_SESSION_ID) {
			var userId = REI_SESSION_ID.split(',')[0];
			var userScreenName = Get_Cookie('REI_USERNAME');
			var userProfileHref = '/share/userprofile.html/' + userId;
			var userImgSrc = '/socialprofile.socialprofileimage.medium.jpg/' + userId;
            $('#questionform-user-img-link').attr( 'href', userProfileHref );
            $('#questionform-user-name-link').attr( 'href', userProfileHref );
			$('#questionform-user-name-link').text(userScreenName);
			$('#questionform-user-img').attr('src', userImgSrc);
			$('#questionform-user-img').attr('title', userScreenName);
			$('#questionform-user-img').attr('alt', userScreenName);
		}
	}
	
	$('#questionform-form').bind('submit', function(e) {
        e.preventDefault(); // <-- important
        $(this).ajaxSubmit({
            'dataType': 'json',
            'iframe': true,
            'type': 'POST',
            'success': function(responseObj, statusText, xhr, elem) {
                if ( responseObj.response == 'success' ) {

                    $( "#questionprompt-form-section" ).slideUp( 400, function() {

                        $( "#questionform-errormessage" ).hide();

                        $(  "#questionform-form input, " +
                            "#questionform-form textarea, " +
                            "#questionform-form select" ).val( "" );

                        var _newCommentLink = $( "#newCommentLink" );
                        _newCommentLink.attr( "href", responseObj.targetURL );
                        _newCommentLink.text(
                            window.location.protocol + "//" +
                            window.location.hostname +
                            responseObj.targetURL );

                        var _fantomLink = $( "<a href='#questionSuccessPopup'></a>" );
                        _fantomLink.fancybox( {
                            type: "inline",
                            titleShow: false
                        } ).trigger( 'click' );

                    } );

                } else {
                    if (responseObj.errorCode == 'missing_category') {
                        $('#questionform-errormessage').text($('#questionform-missing-category-error-msg').attr('value'));
                    } else if (responseObj.errorCode == 'missing_question') {
                        $('#questionform-errormessage').text($('#questionform-missing-question-error-msg').attr('value'));
                    } else if (responseObj.errorCode == 'question_too_long') {
                        $('#questionform-errormessage').text($('#questionform-question-too-long-error-msg').attr('value'));
                    } else if (responseObj.errorCode == 'general_error') {
                        $('#questionform-errormessage').text($('#questionform-general-error-msg').attr('value'));
                    }
                    $('#questionform-errormessage').show();
                }
            },
            'error': function() {
                $('#questionform-errormessage').text($('#questionform-general-error-msg').attr('value'));
                $('#questionform-errormessage').show();
            }
        });
    });

    $( "#questionSubmitPopupClose" ).click( function() {
        $.fancybox.close();
    } );
	
	// Activate Add Photo Button
	$('#questionform-add-photo-button').click(function(event) {
		event.preventDefault();
		$('.uploadPhoto').toggle();
	});
	
});
/* $Id$ */

/**
 * @(#)postedquestion.js
 * 
 * COPYRIGHT (c) 2012 by Recreational Equipment Incorporated. All rights reserved.
 * 
 * @author rray
 * 
 * TODO - client-side form validation
 */
$(document).ready(function() {
	
	if (loggedIn) {
		var REI_SESSION_ID = Get_Cookie("REI_SESSION_ID");
		if (REI_SESSION_ID) {
			var userId = REI_SESSION_ID.split(',')[0];
			var userScreenName = Get_Cookie('REI_USERNAME');
			var userProfileHref = '/share/userprofile.html/' + userId;
			var userImgSrc = '/socialprofile.socialprofileimage.medium.jpg/' + userId;
			$('#postedquestion-user-name-link').text(userScreenName);
			$('#postedquestion-user-img').attr('src', userImgSrc);
			$('#postedquestion-user-img').attr('title', userScreenName);
			$('#postedquestion-user-img').attr('alt', userScreenName);
		}
	}
	
	// Activate Submit button
	$('#postedquestion-submit').click(function(event) {
		event.preventDefault();
		$('#postedquestion-form').submit();
	});
	
	// Activate Add Photo Button
	$('#postedquestion-add-photo-button').click(function(event) {
		event.preventDefault();
		$('.uploadPhoto').toggle();
	});
	
	$('#postedquestion-form').submit(function() {
		// submit the form 
	    $(this).ajaxSubmit({
	    	'dataType': 'json',
	    	'success': function(responseObj, statusText, xhr, elem) {
	    		if (responseObj.response == 'success') {
	    			window.location.href = window.location.href;
	    		} else {
	    			if (responseObj.errorCode== 'general_error') {
	    				$('#postedquestion-errormessage').text($('#postedquestion-general-error-msg').attr('value'));
	    			} else if (responseObj.errorCode== 'missing_answer') {
	    				$('#postedquestion-errormessage').text($('#postedquestion-no-answer-error-msg').attr('value'));
	    			}
			    	$('#postedquestion-errormessage').show();
	    		}
	    	},
		    'error': function() {
		    	$('#postedquestion-errormessage').text($('#postedquestion-general-error-msg').attr('value'));
		    	$('#postedquestion-errormessage').show();
	    	}
	    }); 
	    // return false to prevent normal browser submit and page navigation 
	    return false;
	});
	
	// Activate Answer It Button
	$('#postedquestion-answer-it-button').click(function(event) {
		event.preventDefault();
		// Decide which interface to display
		if (loggedIn) {
			$('#postedquestion-form-section').toggle();
		} else {
			$('#postedquestion-login-section').toggle();
			
		}
	});
	
	// Activate Add Video Button
//	$('#postedquestion-add-video-button').click(function(event) {
//		event.preventDefault();
//		$('.uploadVideo').toggle();
//	});
	
});
/* $Id$ */
$(document).ready(function() {
	// Tab Control
	$('.listing .tabs li').click(function() {
		// Tabs
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		
		// Panels
		var target = $(this).attr('target');
		$('.'+target).siblings().removeClass('active');
		$('.'+target).addClass('active');
	});
});
/* $Id: helpratings.js 1918 2012-03-30 17:55:27Z jowilso $ */

$( document ).ready( function() {

    if ( $.helpfulRating === undefined ) {
    	$.helpfulRating = {};
    }

    $.helpfulRating.processResults = function( data , percentHelpfulId) {

        if ( typeof( data ) == "string" ) data = $.parseJSON( data );

        if ( data['response'] != 'true' ) return;

        var hasUserVoted = ( data[ "user_vote" ] == "true" );
        var thumbsUpCount = parseInt( data[ "total_up" ] );
        var thumbsDownCount = parseInt( data[ "total_down" ] );
        var totalVoteCount = parseInt( thumbsDownCount + thumbsUpCount );

        var percentThumbsUp = thumbsUpCount / totalVoteCount;
        percentThumbsUp = percentThumbsUp.toFixed( 2 );
        percentThumbsUp *= 100;

        if ( !isNaN( percentThumbsUp ) ) {
            $( '#' + percentHelpfulId ).text( percentThumbsUp + '%' );
        }
        var notVotedId = percentHelpfulId.replace( 'percentHelpful', 'rating_notVoted' );
        var alreadyVotedId = percentHelpfulId.replace( 'percentHelpful', 'rating_alreadyVoted' );
        if ( hasUserVoted ) {
            $( '#' + alreadyVotedId ).css( "display", "block" );
            $( '#' + notVotedId ).css( "display", "none" );
        } else {
            $( '#' + alreadyVotedId ).css( "display", "none" );
            $( '#' + notVotedId ).css( "display", "inline" );
        }
    }
    
    $('.helpfulratings-helpfulButton').each(function (i, elem) {
    	var buttonId = $(elem).attr('id');
    	var getURLId = buttonId.replace('helpfulButton', 'getURL');
    	var percentHelpfulId = buttonId.replace('helpfulButton', 'percentHelpful');
    	var getURL = $('#' + getURLId).val();
    	$.ajax( {
            url: getURL,
            type: "GET",
            data: {
            	
            },
            success: function( data ) {
                $.helpfulRating.processResults(data, percentHelpfulId);
            }
        } );
    });

    $( ".helpfulratings-helpfulButton" ).click( function(event) {
    	event.preventDefault();
    	var buttonId = $(this).attr('id');
    	var postURLId = buttonId.replace('helpfulButton', 'postURL');
    	var percentHelpfulId = buttonId.replace('helpfulButton', 'percentHelpful');
    	var postURL = $('#' + postURLId).val();
        $.ajax( {
            url: postURL,
            type: "POST",
            data: {
                rating: 100
            },
            success: function( data ) {
                $.helpfulRating.processResults( data, percentHelpfulId );
            }
        } );
    } );

    $( ".helpfulratings-noHelpButton" ).click( function(event) {
    	event.preventDefault();
    	var buttonId = $(this).attr('id');
    	var postURLId = buttonId.replace('noHelpButton', 'postURL');
    	var percentHelpfulId = buttonId.replace('noHelpButton', 'percentHelpful');
    	var postURL = $('#' + postURLId).val();
        $.ajax( {
            url: postURL,
            type: "POST",
            data: {
                rating: 50
            },
            success: function( data ) {
                $.helpfulRating.processResults( data, percentHelpfulId );
            }
        } );
    } );
} );
/* $Id$ */
/* $Id$ */

// Yes, that's right, this file does nothing and can safely be removed. 
// It's init() function was conflicting with helpShared.js.

//$(document).ready(function(){
//	helpAccordion.init();
//	var openByDefault = $('#qacategoryaccordion-openByDefault').attr('value');
//	if (openByDefault) {
//		helpAccordion.openAllSections();
//	}
//});
/* $Id: answeritem.js 2270 2012-04-12 19:27:33Z rray $ */

$(document).ready(function() {
	// Decide which interface to display
	if (loggedIn) {
		$('.rating-box-question-authenticated').show();	
	} else {
		$('.rating-box-question-unauthenticated').show();
	}
	
	// Activate Reply Button
	$('.answeritem-replybutton').click(function(event) {
		event.preventDefault();
		var buttonId = $(this).attr('id');
		if (buttonId) {
			var formId = buttonId.replace('replybutton', 'replyform');
			$('#' + formId).toggle();
		}
	});
	
	// Activate Submit button
	$('.replyform-submitbutton').click(function(event) {
		event.preventDefault();
		var buttonId = $(this).attr('id');
		if (buttonId) {
			var formId = buttonId.replace('-submitbutton', '');
			var errorMsgElemId = formId + '-errormessage';
			// submit the form 
			$('#' + formId).ajaxSubmit({
		    	'dataType': 'json',
		    	'success': function(responseObj, statusText, xhr, elem) {
		    		if (responseObj.response == 'success') {
		    			// Reload page
		    			window.location.href = window.location.href;
		    		} else {
		    			// Display error message
		    			if (responseObj.errorCode == 'general_error') {
		    				$('#' + errorMsgElemId).text($('#postedquestion-general-error-msg').attr('value'));
		    			} else if (responseObj.errorCode== 'missing_answer') {
		    				// TODO
		    				$('#' + errorMsgElemId).text($('#postedquestion-no-answer-error-msg').attr('value'));
		    			}
				    	$('#' + errorMsgElemId).show();
		    		}
		    	},
			    'error': function() {
			    	// Display error message
			    	$('#' + errorMsgElemId).text($('#postedquestion-general-error-msg').attr('value'));
			    	$('#' + errorMsgElemId).show();
		    	}
		    }); 
		}
	});
	
});
/* $Id: answerform.js 2270 2012-04-12 19:27:33Z rray $ */
/* $Id$ */

$(document).ready(function() {
	// Tab Control
	$('.answerdetail .tabs li').click(function() {
		// Tabs
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		
		// Panels
		var target = $(this).attr('target');
		$('.'+target).siblings().removeClass('active');
		$('.'+target).addClass('active');
	});
});
/* $Id: posterprofile.js 2270 2012-04-12 19:27:33Z rray $ */

/**
 * @(#)posterprofile.js
 * 
 * COPYRIGHT (c) 2012 by Recreational Equipment Incorporated. All rights reserved.
 * 
 * @author rray
 */
$(document).ready(function(){
	$('#rei-galleryShowMe').click(function(){
		if(document.getElementById('popular').checked) {
			$("#rei-galleryHomeLink-popular").show();
			$("#rei-galleryHomeLink-newest").hide();
		}else if(document.getElementById('newest').checked) {
			$("#rei-galleryHomeLink-popular").hide();
			$("#rei-galleryHomeLink-newest").show();
		}
	});
});
/* $Id: sharewizard.js 2270 2012-04-12 19:27:33Z rray $ */

/**
 * @(#)sharewizard.js
 * 
 * COPYRIGHT (c) 2012 by Recreational Equipment Incorporated. All rights reserved.
 * 
 * @author rray
 */
$(document).ready(function() {
	
	// Initialize modal
	$('#sharewizard-share-button').fancybox({
		'height': 600,
		'padding': 0,
		'width': 810,
		'scrolling':'no',
		'autoScale': false,
		'titleShow': false,
		'type': 'iframe',
		'href': $('#sharewizard-modal-href').attr('value'),
		'modal': true,
        'onClosed': function() {
            var _newPhotoLink = $( "#newPhotoLink" );
            if ( _newPhotoLink.attr( "href" ) != "" ) {
                setTimeout( function() {
                    var _fantomLink = $( "<a href='#photoSuccessPopup'></a>" );
                    _fantomLink.fancybox( {
                        type: "inline",
                        titleShow: false
                    } ).trigger( 'click' );
                }, 300);
            }
        }
	});

    $( "#photoSubmitPopupClose" ).click( function() {
        $.fancybox.close();
    } );
	
	// Decide which interface to display
	if (loggedIn) {
		$('#sharewizard-authenticated').show();		
	} else {
		$('#sharewizard-unauthenticated').show();
	}

});
/* $Id: photolocation.js 2270 2012-04-12 19:27:33Z rray $ */

$(document).ready(function() {
	if (document.getElementById("photoMap")) {
		var lat = $("#photolocation-latitude").attr('value');
		var lng = $("#photolocation-longitude").attr('value');
		var myOptions = {
		  center: new google.maps.LatLng(lat, lng),
		  zoom: 8,
		  mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var map = new google.maps.Map(document.getElementById("photoMap"), myOptions);
		var marker = new google.maps.Marker({
			map: map,
			position: map.getCenter()
		}); 
	}
});
/* $Id: photogallery.js 2270 2012-04-12 19:27:33Z rray $ */
$(document).ready(function() {
	$('#chooseTheme').change(function() {
		var newLoc = $(this).val();
		if (newLoc) {
			window.location = $(this).val();
		}
		return false;
	});
	
	// Tab Control
	$('.photogallery .tabs li').click(function() {
		// Tabs
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		
		// Panels
		var target = $(this).attr('target');
		$('.'+target).siblings().removeClass('active');
		$('.'+target).addClass('active');
	});
});
/* $Id$ */
/**
 * @(#)flag.js
 *
 * COPYRIGHT (c) 2012 by Recreational Equipment Incorporated. All rights reserved.
 *
 * @author Sachita Chetan
 * @author Scott Flesher
 */
$( document ).ready( function () {

    $( ".flagAsInappropriate" ).each( function() {
        $( this ).click( function ( e ) {
            var resourcePath = $( this ).data( "resourcePath" );
            var formSubmitLink = $( "#flag_submit a" );
            formSubmitLink.data( "resourcePath", resourcePath );
            var originalLinkId = $( this ).attr( "id" );
            formSubmitLink.data( "originalLinkId", originalLinkId );
            $( this ).fancybox( {
                'height': 300,
                'width': 300,
                'onClosed': function() {
                    $( "#flagPopupForm" ).clearForm();
                }
            } );
            if ( $( this ).data( "click" ) == undefined ) {
                $( this ).data( "click", "clicked" );
                $( this ).click();
            }
            e.stopPropagation();
            return false;
        } );
    } );

    $( "#flag_submit a" ).click( function( e ) {
        $( "#flagResourcePath" ).val( $( this ).data( "resourcePath" ) );
        var formData = $( "#flagPopupForm" ).serialize();
        var originalLinkId = $( this ).data( "originalLinkId" );
        $.ajax( {
            url: "/bin/social/flag.json",
            type: "POST",
            data: formData,
            success: function( data ) {
                $( "#" + originalLinkId ).replaceWith( "<span>Content flagged</span>" );
                $.fancybox.close();
            }
        } );
        e.stopPropagation();
        return false;
    } );

} );
/* $Id$ */
/* $Id$ */

function blogSearchTrackPageClick(blogPageNumber) {

CQ_Analytics.record({event: 'blogPageClicked', 
     values: {
        'blogSearchKeyword': '<%= xssAPI.encodeForJSString(query) %>',
        'blogSearchResults': '<%= blogSearchResults %>',
        'blogPageNumber': blogPageNumber},
    componentPath: '<%=resource.getResourceType()%>'
    });
    return false;
}
/* $Id$ */

function reiRatingProcessResults( data, isLoggedIn ) {
    try {
        var response = data;
        if ( typeof( data ) == "string" ) {
            try {
                response = $.parseJSON( data );
            } catch ( e ) {
                console.log( "Unable to parse ratings JSON response." );
            }
        }

        var hasUserVoted = response[ "user_vote" ];
        hasUserVoted = ( hasUserVoted == "true" );
        var thumbsUpCount = response[ "total_up" ];
        var thumbsDownCount = response[ "total_down" ];

        if ( thumbsUpCount != null && typeof thumbsUpCount != "undefined" ) {
            $( ".commentsUp" ).html( "(" + thumbsUpCount + ")" );
        }
        if ( thumbsDownCount != null && typeof thumbsDownCount != "undefined" ) {
            $( ".commentsDown" ).html( "(" + thumbsDownCount + ")" );
        }

        if ( isLoggedIn ) {
            if ( hasUserVoted ) {
                $( "#rating_alreadyVoted" ).css( "display", "block" );
                $( "#rating_notVoted" ).css( "display", "none" );
            } else {
                $( "#rating_alreadyVoted" ).css( "display", "none" );
                $( "#rating_notVoted" ).css( "display", "inline" );
            }
        }
    } catch ( e ) {
        console.log( "Unable to process ratings result." );
    }
}

$( document ).ready( function() {

    if ( $.reishare == null || typeof $.reishare == "undefined" ) return;
    var isLoggedIn = $.reishare( "loggedIn" );

    if ( $.blogRating == null || typeof $.blogRating == "undefined" ) {
        $.blogRating = {};
    }

    if ( $.blogRating && $.blogRating.getUrl ) {
        $.ajax( {
            url: $.blogRating.getUrl,
            type: "GET",
            success: function( data ) {
                reiRatingProcessResults( data, isLoggedIn );
            }
        } );
    }

    if ( !isLoggedIn ) {
        $( "#rating_alreadyVoted" ).css( "display", "none" );
        $( "#rating_notVoted" ).css( "display", "none" );
    }

    if ( isLoggedIn ) {
        $( "#rating_thumbsUp a" ).click( function( e ) {
            e.preventDefault();
            var postUrl = $( this ).data( "postUrl" );
            if ( ! postUrl ) return;
            $.ajax( {
                url: postUrl,
                type: "POST",
                data: { rating: 100 },
                success: function( data ) {
                    reiRatingProcessResults( data, isLoggedIn );
                }
            } );
        } );

        $( "#rating_thumbsDown a" ).click( function( e ) {
            e.preventDefault();
            var postUrl = $( this ).data( "postUrl" );
            if ( ! postUrl ) return;
            $.ajax( {
                url: postUrl,
                type: "POST",
                data: { rating: 50 },
                success: function( data ) {
                    reiRatingProcessResults( data, isLoggedIn );
                }
            } );
        } );
    }

} );

/* $Id$ */
$( document ).ready( function() {

    if ( /commentSortOrder=oldest/.exec( location.href ) ) {
        $('#commentSortOrder').val('oldest');
    } else {
        $('#commentSortOrder').val('newest');
    }

    $( "#comments a.btnWriteComment" ).toggle( function( e ) {
        e.preventDefault();
        var commentSection = $( "#rei-commentForm" );
        var formOrPrompt = $( commentSection ).children( ".rei-postcommentform, .rei-loginprompt" );
        $( formOrPrompt ).show();
        return false;
    }, function( e ) {
        e.preventDefault();
        var commentSection = $( "#rei-commentForm" );
        var formOrPrompt = $( commentSection ).children( ".rei-postcommentform, .rei-loginprompt" );
        $( formOrPrompt ).hide();
        return false;
    } );
} );
 
 $('#commentSortOrder').change(function(e) {
	if ($('#commentSortOrder').val() == 'newest') {
		
		var href2 = location.href.replace(/commentSortOrder=.*\&/, '');
		if (/&/.exec(href2))
			href2= href2.replace(/\&/, '?');
		
		location.href=href2;
    }
	else{
		var href1 = location.href.replace(/#.*/, '');
		var afterPound ="";
		if (/#/.exec(location.href))
			afterPound =location.href.replace(/.*#/, '#');
		if (/\?/.exec(location.href)) {
			location.href = href1.replace(/\?/, '?commentSortOrder=oldest&') + afterPound;
		}
		else {
				location.href = href1 + '?commentSortOrder=oldest&' + afterPound;
		}
	}
	
	e.stopPropagation();
 });

 function toggleReplyForm( buttonId, formId ) {
     var form = document.getElementById( formId );
     var button = document.getElementById( buttonId );
     if ( $( form ).is(":visible") ) {
         $( form ).hide();
         $( button ).text( "Reply" );
     } else {
         form.style.display = "block";
         $( form ).find( ".rei-postcommentform" ).show();
         $( button ).text( "Cancel" );
     }
 }

$( function() {
    $( "form.comment input.addComment" ).click( function( e ) {
        e.preventDefault();

        var clickFunction = arguments.callee;

        var _this = $( this );
        var _form = _this.closest( "form" );
        var _formContainer = _form.closest( ".commentFormContainer" );
        var _commentNav = _formContainer.closest( ".commentWidgets" );
        var _window = $( window );

        var id = _formContainer.data( "commentContainer" );
        if ( id == null || ( typeof id == "undefined" ) ) return false;
        var _container = $( "#" + id );
        if ( _container == null || ( typeof _container == "undefined" ) ) return false;

        var action = _form.attr( "action" );
        var data = _form.serialize();

        $.ajax( {
            url: action,
            type: "POST",
            data: data,
            success: function( result ) {
                $( _form ).closest( ".rei-postcommentform" ).slideUp( 'fast', function() {

                    // Clear form
                    _form.find( "textarea" ).val( "" );
                    $( _commentNav ).find( ".commentReplyLink" ).text( "Reply" );

                    // Build new comment div.
                    var newId = new Date().getTime();
                    var newDiv = $( '<div id="' + newId + '"></div>' );
                    _container.append( newDiv );
                    var _newDiv = $( "#" + newId );

                    // Scroll to new comment position.
                    var currentOffset = _window.scrollTop();
                    var windowHeight = _window.height();
                    var commentOffset = _newDiv.offset();
                    var newOffset;
                    if ( commentOffset != null ) {
                        newOffset = commentOffset.top - ( windowHeight / 2 );
                    } else {
                        newOffset = currentOffset;
                    }
                    var distance = Math.abs( currentOffset - newOffset );
                    var duration = distance * 0.7;
                    if ( duration > 1500 ) duration = 1500;
                    $( 'html' ).animate( { scrollTop: newOffset }, duration, 'swing', function() {

                        _newDiv.hide();
                        _newDiv.append( result );

                        // Set up comment div now that it's in place.
                        _container.find( ".rei-notLoggedIn" ).remove();
                        _container.find( ".rei-loggedIn" ).each( function() {
                            var contents = $( this ).contents();
                            $( this ).replaceWith( contents );
                        } );
                        _container
                            .find( "form.comment input.addComment" )
                            .unbind( "click" )
                            .click( clickFunction );

                        _newDiv.fadeIn( 'slow' );
                    } );
                } );
            },
            error: function( result, status, error ) {

                $( _form ).closest( ".rei-postcommentform" ).slideUp( 'fast', function() {

                    $( _commentNav ).find( ".commentReplyLink" ).text( "Reply" );

                    console.log( "Unable to post comment." );
                    console.log( "Status text: " + status );
                    console.log( "Error message: " + error );

                    // Show error message
                    var _fantomLink = $( "<a href='#commentErrorPopup'></a>" );
                    _fantomLink.fancybox( {
                        type: "inline",
                        titleShow: false
                    } ).trigger( 'click' );
                } );
            }
        } );
        return false;
    } );

    $( "#commentErrorPopupClose" ).click( function() {
        $.fancybox.close();
    } );
} );
$( document ).ready( function() {
    if ( $.popuptemplate === undefined ) return;

    try {
        var width = parseInt( $.popuptemplate.width );
        var height = parseInt( $.popuptemplate.height );
    } catch ( e ) {
        return;
    }

    if (
        width === undefined || height === undefined ||
        width <= 0 || height <= 0 ) {
        return;
    }

    window.resizeTo( width, height );
} );
/* $Id$ */

$(document).ready(function() {
	$('.videos').fancybox({
	'height': 330,
	'padding': 0,
	'width': 570,
	'scrolling':'no',
	'autoScale': false,
	'titlePosition' : 'inside',
	'type': 'iframe'
	});
});

/* $Id:  $ */
/* $Id: popupgameteaser.js 1958 2012-04-02 21:29:19Z rray $ */
$(document).ready(function(){
	$("#Lookup").validate();
});
var REIFunctions = (typeof REIFunctions != "undefined"?REIFunctions:{});
REIFunctions.setActiveTab = function(el){
	// Tabs
	$(el).siblings().removeClass('active');
	$(el).addClass('active');
	
	// Panels
	var target = $(el).attr('target');
	$('.'+target).siblings().removeClass('active');
	$('.'+target).addClass('active');
}

$(document).ready(function() {
	$('a[href*=".html#"]').each(function(index){
		$(this).bind('click', function(){
			try{
				var hash = '#' + $(this).attr('href').split('#')[1];
				REIFunctions.setActiveTab(hash);
			}
			catch(e){				
			}
		});
	});
	//end activate correct tab
	
	if(window.location.hash){
		REIFunctions.setActiveTab(window.location.hash)
	}
	
	$('#EACategories.tabs li').click(function() {
		REIFunctions.setActiveTab(this);
	});
	
	$('.seeAll').click(function() {
		var $table = $(this).parent("div").find("table");
		var seeAllText = $('div.active .seeAll').text();
		var currTabText = $('li.active').text();
		if (seeAllText.indexOf('All') > -1) {
	    	$table.find("tr[id = 'hidden']").removeClass("hide");
			$('div.active .seeAll').text('See First 10 ' + currTabText + ' Articles');
		} else {
	    	$table.find("tr[id = 'hidden']").addClass("hide");
			$('div.active .seeAll').text('See All ' + currTabText + ' Articles');
		}
		$table.find("tr:visible")
	    .filter(':even')
	    .removeClass('even').addClass('odd')
	    .end().filter(':odd')
	    .removeClass('odd').addClass('even');
		return false;
	});
	
	$(function() {
        $("div.sortableEACategories").each(function() {
            var $table = $(this).find("table");
            $table.tablesorter({widthFixed: true, widgets: ['zebra']});
            $table.find("th#initialSort").trigger('click');
        });

	});
});
$(document).ready(function(){
	$('.authorBio').fancybox({
		'height': 235,
		'padding': 10,
		'width': 540,
		'scrolling':'no',
		'autoScale': false,
		'titleShow': false,
		'type': 'iframe'
	});
});
/* $Id$ */

$(document).ready(function() {
	$('.tickerContainer').each(function() {
		$(this).ticker();
	});
});
$( document ).ready( function() {
    $( '.reiDifference-popupLauncher' ).fancybox( {
        'height': 615,
        'padding': 10,
        'width': 690,
        'scrolling':'no',
        'autoScale': false,
        'titleShow': false,
        'type': 'iframe'
    } );
} );
$( document ).ready( function() {
    $( "#container a.popupLink" ).click( function() {

        var href = $( this ).attr( "href" );

        try {
            var width = parseInt( $( this ).attr( "popup_width" ) );
            var height = parseInt( $( this ).attr( "popup_height" ) );
            var addScroll = $( this ).attr( "popup_scroll" ) == 1 ? true : false;
        } catch ( e ) {
            var width = 700;
            var height = 460;
        }
        if ( width === undefined || isNaN( width ) || width <= 0 ) width = 700;
        if ( height === undefined || isNaN( height )|| height <= 0 ) height = 460;
        var scroll = addScroll ? 'auto' : 'no';

        var name = "REI";
        var options = "width=" + width + ",height=" + height + ",titlebar=no,resizable=1,scrollbars=" + scroll;

        window.open( href, name, options );
        return false;
    } );

    $( "#container a.fancybox" ).each( function() {

        try {
            var width = parseInt( $( this ).attr( "popup_width" ) );
            var height = parseInt( $( this ).attr( "popup_height" ) );
            var addScroll = $( this ).attr( "popup_scroll" ) == 1 ? true : false;
        } catch ( e ) {
            var width = 700;
            var height = 460;
        }
        if ( width === undefined || isNaN( width ) || width <= 0 ) width = 700;
        if ( height === undefined || isNaN( height )|| height <= 0 ) height = 460;
        var scroll = addScroll ? 'auto' : 'no';

        $( this ).fancybox( {
            'height': height,
            'width': width,
            'padding': 25,
            'type': 'iframe',
            'titleShow': false,
            'scrolling': scroll
        } );
    } );
} );
/* $Id: basicmarquee.js 1918 2012-03-30 17:55:27Z jowilso $ */

$(document).ready(function() {
	$('.marqueeImage').each(function(index) {
		//Initiate slideshow if more than one image
		var componentId = $(this).attr('id');		
		var imgCount = $(this).find('.slides').length;	//get the total count of images
		if (imgCount > 1) {	
			var displaySpeedMs = 3000;
			var customDisplaySpeedS = $('#' + componentId + '-displaySpeedS').attr('value');
			if (customDisplaySpeedS) {
				displaySpeedMs = customDisplaySpeedS * 1000;
			}
			//initialize the slide show	
			initMarqueeImageSlideShow(componentId, imgCount, displaySpeedMs);
			//display pagination
			$('#' + componentId + '-thumbs').show();
		}
	});
});
rei.hover = {
		showHoverText: function($src){
			$('.js-hover',$src).removeClass('is-hidden').css({left:$src.offset().left});
		},
		hideHoverText: function($src){
			$('.js-hover',$src).addClass('is-hidden');
		}
};
/* $Id: posterprofile.js 2270 2012-04-12 19:27:33Z rray $ */

/**
 * @(#)posterprofile.js
 * 
 * COPYRIGHT (c) 2012 by Recreational Equipment Incorporated. All rights reserved.
 * 
 * @author rray
 */
/* $Id$ */

$(document).ready(function() {
	$('.marqueeImage').each(function(index) {
		//Initiate slideshow if more than one image
		var componentId = $(this).attr('id');		
		var imgCount = $(this).find('.slides').length;	//get the total count of images
		if (imgCount > 1) {	
			var displaySpeedMs = 3000;
			var customDisplaySpeedS = $('#' + componentId + '-displaySpeedS').attr('value');
			if (customDisplaySpeedS) {
				displaySpeedMs = customDisplaySpeedS * 1000;
			}
			//initialize the slide show	
			initMarqueeImageSlideShow(componentId, imgCount, displaySpeedMs);
			//display pagination
			$('#' + componentId + '-thumbs').show();
		}
	});
});
/* $Id: posterprofile.js 2270 2012-04-12 19:27:33Z rray $ */

/**
 * @(#)posterprofile.js
 * 
 * COPYRIGHT (c) 2012 by Recreational Equipment Incorporated. All rights reserved.
 * 
 * @author rray
 */
/* $Id$ */

$(document).ready(function(){
	helpAccordion.init();
	var openByDefault = $('#accordion-openByDefault').attr('value');
	if (openByDefault) {
		helpAccordion.openAllSections();
	}
});
jQuery('#wlSearch').click(function(){
		$("#wlSearch").validate({
				rules: {
					firstName: {
						required: true,
						minlength: 2
					},
					lastName: {
						required: true,
						minlength: 2
					}
				},
				messages: {
					firstName: {
						required: "This field is required.",
							minlength: "Please enter at least 2 characters."
					},
					lastName: {
						required: "This field is required.",
							minlength: "Please enter at least 2 characters."
					}
				},
					 submitHandler: function(form) {
					    form.submit();
					}
		});
	});
function chkMandatory(objControl,strMessage,setFocusOnError){
var lbSetFocus    = new Boolean(true);
 var strVal        = objControl.value;
var strType        = objControl.type;

if (typeof(setFocusOnError) == 'boolean')
    lbSetFocus    = setFocusOnError;

if (strType=='select-multiple' || strType=='select-one')
{
    if (objControl.options.selectedIndex<=0)
    {
        alert(strMessage);
        if (lbSetFocus)
            objControl.focus();
        return false;
    }
}
else if (objControl.type=='radio' || objControl.type=='checkbox')
{
    if (objControl.checked == false)
    {
        alert(strMessage);
        if (lbSetFocus)
            objControl.focus();
        return false;
    }
}
else if (objControl.length > 1 && objControl[0].type=='radio')
{
    var rvalue = 0;
    for(var i=0; i<objControl.length; i++)
    {
        if (objControl[i].checked == true)
        {
             rvalue = 1;
            break
        }
    }
    if (rvalue == 0)
    {
        alert(strMessage);
        if (lbSetFocus)
            objControl[0].focus();
        return false;
    }
}
else
{
    var outStr = "";

    for (var n = 1 ; n <= strVal.length ; n++) 
    {
        if (strVal.substring(n-1,n) == " ") 
        { 
            outStr+=""; 
        }
        else 
        { 
            outStr+=strVal.substring(n-1,n); 
        }
    }

    if (outStr == "")
    {
        objControl.value=outStr;
        alert(strMessage);
        if (lbSetFocus)
            objControl.focus();
        return false;
    }
}
return true;
}

        
function ValidateForm1()
{    
var zip = document.frmPickLoc.txtZipCode;

       if (zip.value.length == 0) {
   
	if(!chkMandatory(document.frmPickLoc.selStateID,"Please select a state")) {
		return false;	
	} else {	
	 return true;		 
	 }
       } else {
    
       return ValidateForm2();
       }
	
}

	
function LinkSubmit()
{
	if(document.frmPickLoc.onsubmit())
	{
		document.frmPickLoc.submit();
	}
}

function ValidateForm2()
{	
	var zip = document.frmPickLoc.txtZipCode;
	
	if (zip.value.length > 0) {			
		if (zip.value.length < 5 || zip.value.length > 7) {
			alert('ZIP or Postal Code must be between 5 and 7 characters.');
			zip.focus();
			return false;
		}
		if (zip.value.length == 5) {
			// US ZIP
			if (! _CF_checkinteger(zip.value)) {
				alert('5-digit (US) ZIP codes must be numeric.');
				return false;
			}
		}
		else {
			// Canadian Postal Code
			if (zip.value.length == 6) {
				zip.value = zip.value.substr(0,3) + ' ' + zip.value.substr(3);
			}
			var regExpPattern = /[A-Za-z]{1,1}[0-9]{1,1}[A-Za-z]{1,1} [0-9]{1,1}[A-Za-z]{1,1}[0-9]{1,1}/;
			if (! regExpPattern.test(zip.value)) {
				alert('US ZIP Codes must contain 5 digits.\\nCanadian Postal Codes must be in the form A9A 9A9, where A is a letter and 9 is a number.');
				return false;
			}
		}
	}
	
	return true;
}

	function _CF_checknumber(object_value) {
	if (object_value.length == 0)
		return true;

	var start_format = " .+-0123456789";
	var number_format = " .0123456789";
	var check_char;
	var decimal = false;
	var trailing_blank = false;
	var digits = false;

	check_char = start_format.indexOf(object_value.charAt(0));

	if (check_char == 1)
		decimal = true;
	else if (check_char < 1)
		return false;

	for (var i = 1; i < object_value.length; i++)
	{
		check_char = number_format.indexOf(object_value.charAt(i));
		if (check_char < 0)
			return false;
		else if (check_char == 1)
		{
			if (decimal)
				return false;
			else
				decimal = true;
		}
		else if (check_char == 0)
		{
			if (decimal || digits)	
				trailing_blank = true;
		}
		else if (trailing_blank)
			return false;
		else
			digits = true;
	}	

	return true;
}	
function _CF_checkinteger(object_value) {
	if (object_value.length == 0)
		return true;

	var decimal_format = ".";
	var check_char = object_value.indexOf(decimal_format);

	if (check_char == -1)
		return _CF_checknumber(object_value);
	else
		return false;
}

//  collections grid UI script
jQuery(document).ready(function($) {
	// use function to keep $thumbs variable enclosed
	function initCollections(){
	// store all thumbs, so you don't have to select it each time it's called
	var $thumbs = $('.thumb', '.mainWrap');
	// on mouse enter, if the thumb is not the active thumb, add hover class
	$thumbs.mouseenter(function(){
	if (!$(this).hasClass('active')){
	$(this).addClass('hover');
	} });
	// remove hover class when mouse leaves thumb
	$thumbs.mouseleave(function(){
	$(this).removeClass('hover');
	});
	// click event for handling fading panels and converting thumb to active state
	$thumbs.click(function(e){
	// prevent browser from jumping to div called out in thumb href
	e.preventDefault();
	var $this = $(this), // store the clicked thumb
	$tar = $($this.attr('href')), // use thumb href to find panel div you want to fade in
	$prev = $('.main_prod:visible'); // find the visible panel and store it. so you can fade it out
	$thumbs.removeClass('active'); // remove active state from previous button clicked
	$this.addClass('active'); // add active class to button clicked
	$prev.fadeOut('fast'); // fade out previous panel div
	$tar.fadeIn('fast'); // fade in new panel div
	}); }
	// start collection
	initCollections();
});
//  collections grid UI script
jQuery(document).ready(function($) {
	
});
$(document).ready(function() {
	$('.sizechart').fancybox({
	'padding': 0,
	'scrolling':'auto',
	'autoScale': false,
	'titlePosition' : 'inside',
	'type': 'iframe'
	});
});
/* $Id: shippingtimelinetable.js 1918 2012-03-30 17:55:27Z jowilso $ */

$( document ).ready( function() {
    $( "#rspuSelector" ).change( function() {
        var selection = $( this ).find( "option:selected" );

        var earliest = $( selection ).attr( "earliestDate" );
        var latest = $( selection ).attr( "latestDate" );

        var isEmpty = $.isEmptyObject( earliest ) && $.isEmptyObject( latest );

        var dateDisplay = $( "#rspuSelectorDatesDisplay" );

        if ( isEmpty ) {
            dateDisplay.slideUp( "fast" );
            return;
        }

        $( "#rspuDisplay1" ).text( earliest );
        $( "#rspuDisplay2" ).text( latest );

        var areDatesVisible = $( dateDisplay ).is( ":visible" );
        if ( !areDatesVisible ) dateDisplay.slideDown( "fast" );
    } );
} );


function scrollToPoint( pixelPt ){
	document.location.href = '#freeShipWithRSPU';
}
/*
 * jQuery UI Datepicker
 *
 * Copyright (c) 2006, 2007, 2008 Marc Grabanski
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 * 
 * http://docs.jquery.com/UI/Datepicker
 *
 * Depends:
 *	ui.core.js
 *
 * Marc Grabanski (m@marcgrabanski.com) and Keith Wood (kbwood@virginbroadband.com.au).
 */
   
(function($) { // hide the namespace

var PROP_NAME = 'datepicker';

/* Date picker manager.
   Use the singleton instance of this class, $.datepicker, to interact with the date picker.
   Settings for (groups of) date pickers are maintained in an instance object,
   allowing multiple different settings on the same page. */

function Datepicker() {
	this.debug = false; // Change this to true to start debugging
	this._curInst = null; // The current instance in use
	this._disabledInputs = []; // List of date picker inputs that have been disabled
	this._datepickerShowing = false; // True if the popup picker is showing , false if not
	this._inDialog = false; // True if showing within a "dialog", false if not
	this._mainDivId = 'ui-datepicker-div'; // The ID of the main datepicker division
	this._appendClass = 'ui-datepicker-append'; // The name of the append marker class
	this._triggerClass = 'ui-datepicker-trigger'; // The name of the trigger marker class
	this._dialogClass = 'ui-datepicker-dialog'; // The name of the dialog marker class
	this._promptClass = 'ui-datepicker-prompt'; // The name of the dialog prompt marker class
	this._unselectableClass = 'ui-datepicker-unselectable'; // The name of the unselectable cell marker class
	this._currentClass = 'ui-datepicker-current-day'; // The name of the current day marker class
	this.regional = []; // Available regional settings, indexed by language code
	this.regional[''] = { // Default regional settings
		clearText: 'Clear', // Display text for clear link
		clearStatus: 'Erase the current date', // Status text for clear link
		closeText: 'Close', // Display text for close link
		closeStatus: 'Close without change', // Status text for close link
		prevText: '&#x3c;&#x3c;&#x00A0;Prev', // Display text for previous month link
		prevStatus: 'Show the previous month', // Status text for previous month link
		nextText: 'Next&#x00A0;&#x3e;&#x3e;', // Display text for next month link
		nextStatus: 'Show the next month', // Status text for next month link
		currentText: 'Today', // Display text for current month link
		currentStatus: 'Show the current month', // Status text for current month link
		monthNames: ['January','February','March','April','May','June',
			'July','August','September','October','November','December'], // Names of months for drop-down and formatting
		monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // For formatting
		monthStatus: 'Show a different month', // Status text for selecting a month
		yearStatus: 'Show a different year', // Status text for selecting a year
		weekHeader: 'Wk', // Header for the week of the year column
		weekStatus: 'Week of the year', // Status text for the week of the year column
		dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], // For formatting
		dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], // For formatting
		dayNamesMin: ['Su','Mo','Tu','We','Th','Fr','Sa'], // Column headings for days starting at Sunday
		dayStatus: 'Set DD as first week day', // Status text for the day of the week selection
		dateStatus: 'Select DD, M d', // Status text for the date selection
		dateFormat: 'mm/dd/yy', // See format options on parseDate
		firstDay: 0, // The first day of the week, Sun = 0, Mon = 1, ...
		initStatus: 'Select a date', // Initial Status text on opening
		isRTL: false // True if right-to-left language, false if left-to-right
	};
	this._defaults = { // Global defaults for all the date picker instances
		showOn: 'focus', // 'focus' for popup on focus,
			// 'button' for trigger button, or 'both' for either
		showAnim: 'show', // Name of jQuery animation for popup
		showOptions: {}, // Options for enhanced animations
		defaultDate: null, // Used when field is blank: actual date,
			// +/-number for offset from today, null for today
		appendText: '', // Display text following the input box, e.g. showing the format
		buttonText: '...', // Text for trigger button
		buttonImage: '', // URL for trigger button image
		buttonImageOnly: false, // True if the image appears alone, false if it appears on a button
		closeAtTop: true, // True to have the clear/close at the top,
			// false to have them at the bottom
		mandatory: false, // True to hide the Clear link, false to include it
		hideIfNoPrevNext: false, // True to hide next/previous month links
			// if not applicable, false to just disable them
		navigationAsDateFormat: false, // True if date formatting applied to prev/today/next links
		gotoCurrent: false, // True if today link goes back to current selection instead
		changeMonth: true, // True if month can be selected directly, false if only prev/next
		changeYear: true, // True if year can be selected directly, false if only prev/next
		yearRange: '-1:+10', // Range of years to display in drop-down,
			// either relative to current year (-nn:+nn) or absolute (nnnn:nnnn)
		changeFirstDay: true, // True to click on day name to change, false to remain as set
		highlightWeek: false, // True to highlight the selected week
		showOtherMonths: true, // True to show dates in other months, false to leave blank
		showWeeks: false, // True to show week of the year, false to omit
		calculateWeek: this.iso8601Week, // How to calculate the week of the year,
			// takes a Date and returns the number of the week for it
		shortYearCutoff: '+10', // Short year values < this are in the current century,
			// > this are in the previous century, 
			// string value starting with '+' for current year + value
		showStatus: true, // True to show status bar at bottom, false to not show it
		statusForDate: this.dateStatus, // Function to provide status text for a date -
			// takes date and instance as parameters, returns display text
		minDate: 0, // The earliest selectable date, or null for no limit
		maxDate: null, // The latest selectable date, or null for no limit
		duration: 'normal', // Duration of display/closure
		beforeShowDay: null, // Function that takes a date and returns an array with
			// [0] = true if selectable, false if not, [1] = custom CSS class name(s) or '', 
			// [2] = cell title (optional), e.g. $.datepicker.noWeekends
		beforeShow: null, // Function that takes an input field and
			// returns a set of custom settings for the date picker
		onSelect: null, // Define a callback function when a date is selected
		onChangeMonthYear: null, // Define a callback function when the month or year is changed
		onClose: null, // Define a callback function when the datepicker is closed
		numberOfMonths: 2, // Number of months to show at a time
		stepMonths: 1, // Number of months to step back/forward
		rangeSelect: false, // Allows for selecting a date range on one date picker
		rangeSeparator: ' - ', // Text between two dates in a range
		altField: '', // Selector for an alternate field to store selected dates into
		altFormat: '' // The date format to use for the alternate field
	};
	$.extend(this._defaults, this.regional['']);
	this.dpDiv = $('<div id="' + this._mainDivId + '" style="display: none;"></div>');
}

$.extend(Datepicker.prototype, {
	/* Class name added to elements to indicate already configured with a date picker. */
	markerClassName: 'hasDatepicker',

	/* Debug logging (if enabled). */
	log: function () {
		if (this.debug)
			console.log.apply('', arguments);
	},
	
	/* Override the default settings for all instances of the date picker. 
	   @param  settings  object - the new settings to use as defaults (anonymous object)
	   @return the manager object */
	setDefaults: function(settings) {
		extendRemove(this._defaults, settings || {});
		return this;
	},

	/* Attach the date picker to a jQuery selection.
	   @param  target    element - the target input field or division or span
	   @param  settings  object - the new settings to use for this date picker instance (anonymous) */
	_attachDatepicker: function(target, settings) {
		// check for settings on the control itself - in namespace 'date:'
		var inlineSettings = null;
		for (attrName in this._defaults) {
			var attrValue = target.getAttribute('date:' + attrName);
			if (attrValue) {
				inlineSettings = inlineSettings || {};
				try {
					inlineSettings[attrName] = eval(attrValue);
				} catch (err) {
					inlineSettings[attrName] = attrValue;
				}
			}
		}
		var nodeName = target.nodeName.toLowerCase();
		var inline = (nodeName == 'div' || nodeName == 'span');
		if (!target.id)
			target.id = 'dp' + new Date().getTime();
		var inst = this._newInst($(target), inline);
		inst.settings = $.extend({}, settings || {}, inlineSettings || {}); 
		if (nodeName == 'input') {
			this._connectDatepicker(target, inst);
		} else if (inline) {
			this._inlineDatepicker(target, inst);
		}
	},

	/* Create a new instance object. */
	_newInst: function(target, inline) {
		return {id: target[0].id, input: target, // associated target
			selectedDay: 0, selectedMonth: 0, selectedYear: 0, // current selection
			drawMonth: 0, drawYear: 0, // month being drawn
			inline: inline, // is datepicker inline or not
			dpDiv: (!inline ? this.dpDiv : // presentation div
			$('<div class="ui-datepicker-inline"></div>'))};
	},

	/* Attach the date picker to an input field. */
	_connectDatepicker: function(target, inst) {
		var input = $(target);
		if (input.hasClass(this.markerClassName))
			return;
		var appendText = this._get(inst, 'appendText');
		var isRTL = this._get(inst, 'isRTL');
		if (appendText)
			input[isRTL ? 'before' : 'after']('<span class="' + this._appendClass + '">' + appendText + '</span>');
		var showOn = this._get(inst, 'showOn');
		if (showOn == 'focus' || showOn == 'both') // pop-up date picker when in the marked field
			input.focus(this._showDatepicker);
		if (showOn == 'button' || showOn == 'both') { // pop-up date picker when button clicked
			var buttonText = this._get(inst, 'buttonText');
			var buttonImage = this._get(inst, 'buttonImage');
			var trigger = $(this._get(inst, 'buttonImageOnly') ? 
				$('<img/>').addClass(this._triggerClass).
					attr({ src: buttonImage, alt: buttonText, title: buttonText }) :
				$('<button type="button"></button>').addClass(this._triggerClass).
					html(buttonImage == '' ? buttonText : $('<img/>').attr(
					{ src:buttonImage, alt:buttonText, title:buttonText })));
			input[isRTL ? 'before' : 'after'](trigger);
			trigger.click(function() {
				if ($.datepicker._datepickerShowing && $.datepicker._lastInput == target)
					$.datepicker._hideDatepicker();
				else
					$.datepicker._showDatepicker(target);
				return false;
			});
		}
		input.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).
			bind("setData.datepicker", function(event, key, value) {
				inst.settings[key] = value;
			}).bind("getData.datepicker", function(event, key) {
				return this._get(inst, key);
			});
		$.data(target, PROP_NAME, inst);
	},

	/* Attach an inline date picker to a div. */
	_inlineDatepicker: function(target, inst) {
		var input = $(target);
		if (input.hasClass(this.markerClassName))
			return;
		input.addClass(this.markerClassName).append(inst.dpDiv).
			bind("setData.datepicker", function(event, key, value){
				inst.settings[key] = value;
			}).bind("getData.datepicker", function(event, key){
				return this._get(inst, key);
			});
		$.data(target, PROP_NAME, inst);
		this._setDate(inst, this._getDefaultDate(inst));
		this._updateDatepicker(inst);
	},

	/* Tidy up after displaying the date picker. */
	_inlineShow: function(inst) {
		var numMonths = this._getNumberOfMonths(inst); // fix width for dynamic number of date pickers
		inst.dpDiv.width(numMonths[1] * $('.ui-datepicker', inst.dpDiv[0]).width());
	}, 

	/* Pop-up the date picker in a "dialog" box.
	   @param  input     element - ignored
	   @param  dateText  string - the initial date to display (in the current format)
	   @param  onSelect  function - the function(dateText) to call when a date is selected
	   @param  settings  object - update the dialog date picker instance's settings (anonymous object)
	   @param  pos       int[2] - coordinates for the dialog's position within the screen or
	                     event - with x/y coordinates or
	                     leave empty for default (screen centre)
	   @return the manager object */
	_dialogDatepicker: function(input, dateText, onSelect, settings, pos) {
		var inst = this._dialogInst; // internal instance
		if (!inst) {
			var id = 'dp' + new Date().getTime();
			this._dialogInput = $('<input type="text" id="' + id +
				'" size="1" style="position: absolute; top: -100px;"/>');
			this._dialogInput.keydown(this._doKeyDown);
			$('body').append(this._dialogInput);
			inst = this._dialogInst = this._newInst(this._dialogInput, false);
			inst.settings = {};
			$.data(this._dialogInput[0], PROP_NAME, inst);
		}
		extendRemove(inst.settings, settings || {});
		this._dialogInput.val(dateText);

		this._pos = (pos ? (pos.length ? pos : [pos.pageX, pos.pageY]) : null);
		if (!this._pos) {
			var browserWidth = window.innerWidth || document.documentElement.clientWidth ||	document.body.clientWidth;
			var browserHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
			var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
			var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
			this._pos = // should use actual width/height below
				[(browserWidth / 2) - 100 + scrollX, (browserHeight / 2) - 150 + scrollY];
		}

		// move input on screen for focus, but hidden behind dialog
		this._dialogInput.css('left', this._pos[0] + 'px').css('top', this._pos[1] + 'px');
		inst.settings.onSelect = onSelect;
		this._inDialog = true;
		this.dpDiv.addClass(this._dialogClass);
		this._showDatepicker(this._dialogInput[0]);
		if ($.blockUI)
			$.blockUI(this.dpDiv);
		$.data(this._dialogInput[0], PROP_NAME, inst);
		return this;
	},

	/* Detach a datepicker from its control.
	   @param  target    element - the target input field or division or span */
	_destroyDatepicker: function(target) {
		var nodeName = target.nodeName.toLowerCase();
		var $target = $(target);
		$.removeData(target, PROP_NAME);
		if (nodeName == 'input') {
			$target.siblings('.' + this._appendClass).remove().end().
				siblings('.' + this._triggerClass).remove().end().
				removeClass(this.markerClassName).
				unbind('focus', this._showDatepicker).
				unbind('keydown', this._doKeyDown).
				unbind('keypress', this._doKeyPress);
		} else if (nodeName == 'div' || nodeName == 'span')
			$target.removeClass(this.markerClassName).empty();
	},

	/* Enable the date picker to a jQuery selection.
	   @param  target    element - the target input field or division or span */
	_enableDatepicker: function(target) {
		target.disabled = false;
		$(target).siblings('button.' + this._triggerClass).each(function() { this.disabled = false; }).end().
			siblings('img.' + this._triggerClass).css({opacity: '1.0', cursor: ''});
		this._disabledInputs = $.map(this._disabledInputs,
			function(value) { return (value == target ? null : value); }); // delete entry
	},

	/* Disable the date picker to a jQuery selection.
	   @param  target    element - the target input field or division or span */
	_disableDatepicker: function(target) {
		target.disabled = true;
		$(target).siblings('button.' + this._triggerClass).each(function() { this.disabled = true; }).end().
			siblings('img.' + this._triggerClass).css({opacity: '0.5', cursor: 'default'});
		this._disabledInputs = $.map(this._disabledInputs,
			function(value) { return (value == target ? null : value); }); // delete entry
		this._disabledInputs[this._disabledInputs.length] = target;
	},

	/* Is the first field in a jQuery collection disabled as a datepicker?
	   @param  target    element - the target input field or division or span
	   @return boolean - true if disabled, false if enabled */
	_isDisabledDatepicker: function(target) {
		if (!target)
			return false;
		for (var i = 0; i < this._disabledInputs.length; i++) {
			if (this._disabledInputs[i] == target)
				return true;
		}
		return false;
	},

	/* Update the settings for a date picker attached to an input field or division.
	   @param  target  element - the target input field or division or span
	   @param  name    object - the new settings to update or
	                   string - the name of the setting to change or
	   @param  value   any - the new value for the setting (omit if above is an object) */
	_changeDatepicker: function(target, name, value) {
		var settings = name || {};
		if (typeof name == 'string') {
			settings = {};
			settings[name] = value;
		}
		if (inst = $.data(target, PROP_NAME)) {
			extendRemove(inst.settings, settings);
			this._updateDatepicker(inst);
		}
	},

	/* Set the dates for a jQuery selection.
	   @param  target   element - the target input field or division or span
	   @param  date     Date - the new date
	   @param  endDate  Date - the new end date for a range (optional) */
	_setDateDatepicker: function(target, date, endDate) {
		var inst = $.data(target, PROP_NAME);
		if (inst) {
			this._setDate(inst, date, endDate);
			this._updateDatepicker(inst);
		}
	},
	
	

	/* Set the Minimum dates for a jQuery selection.    [ john@johnbarry.us, 11/2009 ]
	   @param  target   element - the target input field or division or span
	   @param  minDate  Date - the new min date for a range (optional) */
	_setMinDateDatepicker: function(target, minDate) {
	    
        	        var inst = $.data(target, PROP_NAME);
	        if (inst) {
	            inst.settings.minDate = minDate;
	            this._updateDatepicker(inst);
	        }
	},

	/* Get the date(s) for the first entry in a jQuery selection.
	   @param  target  element - the target input field or division or span
	   @return Date - the current date or
	           Date[2] - the current dates for a range */
	_getDateDatepicker: function(target) {
		var inst = $.data(target, PROP_NAME);
		if (inst)
			this._setDateFromField(inst); 
		return (inst ? this._getDate(inst) : null);
	},

	/* Handle keystrokes. */
	_doKeyDown: function(e) {
		var inst = $.data(e.target, PROP_NAME);
		var handled = true;
		if ($.datepicker._datepickerShowing)
			switch (e.keyCode) {
				case 9:  $.datepicker._hideDatepicker(null, '');
						break; // hide on tab out
				case 13: $.datepicker._selectDay(e.target, inst.selectedMonth, inst.selectedYear,
							$('td.ui-datepicker-days-cell-over', inst.dpDiv)[0]);
						return false; // don't submit the form
						break; // select the value on enter
				case 27: $.datepicker._hideDatepicker(null, $.datepicker._get(inst, 'duration'));
						break; // hide on escape
				case 33: $.datepicker._adjustDate(e.target, (e.ctrlKey ? -1 :
							-$.datepicker._get(inst, 'stepMonths')), (e.ctrlKey ? 'Y' : 'M'));
						break; // previous month/year on page up/+ ctrl
				case 34: $.datepicker._adjustDate(e.target, (e.ctrlKey ? +1 :
							+$.datepicker._get(inst, 'stepMonths')), (e.ctrlKey ? 'Y' : 'M'));
						break; // next month/year on page down/+ ctrl
				case 35: if (e.ctrlKey) $.datepicker._clearDate(e.target);
						break; // clear on ctrl+end
				case 36: if (e.ctrlKey) $.datepicker._gotoToday(e.target);
						break; // current on ctrl+home
				case 37: if (e.ctrlKey) $.datepicker._adjustDate(e.target, -1, 'D');
						break; // -1 day on ctrl+left
				case 38: if (e.ctrlKey) $.datepicker._adjustDate(e.target, -7, 'D');
						break; // -1 week on ctrl+up
				case 39: if (e.ctrlKey) $.datepicker._adjustDate(e.target, +1, 'D');
						break; // +1 day on ctrl+right
				case 40: if (e.ctrlKey) $.datepicker._adjustDate(e.target, +7, 'D');
						break; // +1 week on ctrl+down
				default: handled = false;
			}
		else if (e.keyCode == 36 && e.ctrlKey) // display the date picker on ctrl+home
			$.datepicker._showDatepicker(this);
		else
			handled = false;
		if (handled) {
			e.preventDefault();
			e.stopPropagation();
		}
	},

	/* Filter entered characters - based on date format. */
	_doKeyPress: function(e) {
		var inst = $.data(e.target, PROP_NAME);
		var chars = $.datepicker._possibleChars($.datepicker._get(inst, 'dateFormat'));
		var chr = String.fromCharCode(e.charCode == undefined ? e.keyCode : e.charCode);
		return e.ctrlKey || (chr < ' ' || !chars || chars.indexOf(chr) > -1);
	},

	/* Pop-up the date picker for a given input field.
	   @param  input  element - the input field attached to the date picker or
	                  event - if triggered by focus */
	_showDatepicker: function(input) {
		input = input.target || input;
		if (input.nodeName.toLowerCase() != 'input') // find from button/image trigger
			input = $('input', input.parentNode)[0];
		if ($.datepicker._isDisabledDatepicker(input) || $.datepicker._lastInput == input) // already here
			return;
		var inst = $.data(input, PROP_NAME);
		var beforeShow = $.datepicker._get(inst, 'beforeShow');
		extendRemove(inst.settings, (beforeShow ? beforeShow.apply(input, [input, inst]) : {}));
		$.datepicker._hideDatepicker(null, '');
		$.datepicker._lastInput = input;
		$.datepicker._setDateFromField(inst);
		if ($.datepicker._inDialog) // hide cursor
			input.value = '';
		if (!$.datepicker._pos) { // position below input
			$.datepicker._pos = $.datepicker._findPos(input);
			$.datepicker._pos[1] += input.offsetHeight; // add the height
		}
		var isFixed = false;
		$(input).parents().each(function() {
			isFixed |= $(this).css('position') == 'fixed';
			return !isFixed;
		});
		if (isFixed && $.browser.opera) { // correction for Opera when fixed and scrolled
			$.datepicker._pos[0] -= document.documentElement.scrollLeft;
			$.datepicker._pos[1] -= document.documentElement.scrollTop;
		}
		var offset = {left: $.datepicker._pos[0], top: $.datepicker._pos[1]};
		$.datepicker._pos = null;
		inst.rangeStart = null;
		// determine sizing offscreen
		inst.dpDiv.css({position: 'absolute', display: 'block', top: '-1000px'});
		$.datepicker._updateDatepicker(inst);
		// fix width for dynamic number of date pickers
		inst.dpDiv.width($.datepicker._getNumberOfMonths(inst)[1] *
			(1 + $('.ui-datepicker', inst.dpDiv[0])[0].offsetWidth));
		// and adjust position before showing
		offset = $.datepicker._checkOffset(inst, offset, isFixed);
		inst.dpDiv.css({position: ($.datepicker._inDialog && $.blockUI ?
			'static' : (isFixed ? 'fixed' : 'absolute')), display: 'none',
			left: offset.left + 'px', top: offset.top + 'px'});
		if (!inst.inline) {
			var showAnim = $.datepicker._get(inst, 'showAnim') || 'show';
			var duration = $.datepicker._get(inst, 'duration');
			var postProcess = function() {
				$.datepicker._datepickerShowing = true;
				if ($.browser.msie && parseInt($.browser.version) < 7) // fix IE < 7 select problems
					$('iframe.ui-datepicker-cover').css({width: inst.dpDiv.width() + 4,
						height: inst.dpDiv.height() + 4});
			};
			if ($.effects && $.effects[showAnim])
				inst.dpDiv.show(showAnim, $.datepicker._get(inst, 'showOptions'), duration, postProcess);
			else
				inst.dpDiv[showAnim](duration, postProcess);
			if (duration == '')
				postProcess();
			if (inst.input[0].type != 'hidden')
				inst.input[0].focus();
			$.datepicker._curInst = inst;
		}
	},

	/* Generate the date picker content. */
	_updateDatepicker: function(inst) {
		var dims = {width: inst.dpDiv.width() + 4,
			height: inst.dpDiv.height() + 4};
		inst.dpDiv.empty().append(this._generateDatepicker(inst)).
			find('iframe.ui-datepicker-cover').
			css({width: dims.width, height: dims.height});
		var numMonths = this._getNumberOfMonths(inst);
		inst.dpDiv[(numMonths[0] != 1 || numMonths[1] != 1 ? 'add' : 'remove') +
			'Class']('ui-datepicker-multi');
		inst.dpDiv[(this._get(inst, 'isRTL') ? 'add' : 'remove') +
			'Class']('ui-datepicker-rtl');
		if (inst.input && inst.input[0].type != 'hidden')
			$(inst.input[0]).focus();
	},

	/* Check positioning to remain on screen. */
	_checkOffset: function(inst, offset, isFixed) {
		var pos = inst.input ? this._findPos(inst.input[0]) : null;
		var browserWidth = window.innerWidth || document.documentElement.clientWidth;
		var browserHeight = window.innerHeight || document.documentElement.clientHeight;
		var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
		var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
		// reposition date picker horizontally if outside the browser window
		if (this._get(inst, 'isRTL') || (offset.left + inst.dpDiv.width() - scrollX) > browserWidth)
			offset.left = Math.max((isFixed ? 0 : scrollX),
				pos[0] + (inst.input ? inst.input.width() : 0) - (isFixed ? scrollX : 0) - inst.dpDiv.width() -
				(isFixed && $.browser.opera ? document.documentElement.scrollLeft : 0));
		else
			offset.left -= (isFixed ? scrollX : 0);
		// reposition date picker vertically if outside the browser window
		if ((offset.top + inst.dpDiv.height() - scrollY) > browserHeight)
			offset.top = Math.max((isFixed ? 0 : scrollY),
				pos[1] - (isFixed ? scrollY : 0) - (this._inDialog ? 0 : inst.dpDiv.height()) -
				(isFixed && $.browser.opera ? document.documentElement.scrollTop : 0));
		else
			offset.top -= (isFixed ? scrollY : 0);
		return offset;
	},
	
	/* Find an object's position on the screen. */
	_findPos: function(obj) {
        while (obj && (obj.type == 'hidden' || obj.nodeType != 1)) {
            obj = obj.nextSibling;
        }
        var position = $(obj).offset();
	    return [position.left, position.top];
	},

	/* Hide the date picker from view.
	   @param  input  element - the input field attached to the date picker
	   @param  duration  string - the duration over which to close the date picker */
	_hideDatepicker: function(input, duration) {

		var inst = this._curInst;
		if (!inst)
			return;
		var rangeSelect = this._get(inst, 'rangeSelect');
		if (rangeSelect && this._stayOpen)
			this._selectDate('#' + inst.id, this._formatDate(inst,
				inst.currentDay, inst.currentMonth, inst.currentYear));
		this._stayOpen = false;
		if (this._datepickerShowing) {
			duration = (duration != null ? duration : this._get(inst, 'duration'));
			var showAnim = this._get(inst, 'showAnim');
			var postProcess = function() {
				$.datepicker._tidyDialog(inst);
			};
			if (duration != '' && $.effects && $.effects[showAnim])
				inst.dpDiv.hide(showAnim, $.datepicker._get(inst, 'showOptions'),
					duration, postProcess);
			else
				inst.dpDiv[(duration == '' ? 'hide' : (showAnim == 'slideDown' ? 'slideUp' :
					(showAnim == 'fadeIn' ? 'fadeOut' : 'hide')))](duration, postProcess);
			if (duration == '')
				this._tidyDialog(inst);
			var onClose = this._get(inst, 'onClose');
			if (onClose)
				onClose.apply((inst.input ? inst.input[0] : null),
					[this._getDate(inst), inst]);  // trigger custom callback
			this._datepickerShowing = false;
			this._lastInput = null;
			inst.settings.prompt = null;
			if (this._inDialog) {
				this._dialogInput.css({ position: 'absolute', left: '0', top: '-100px' });
				if ($.blockUI) {
					$.unblockUI();
					$('body').append(this.dpDiv);
				}
			}
			this._inDialog = false;
		}
		this._curInst = null;
	},

	/* Tidy up after a dialog display. */
	_tidyDialog: function(inst) {
		inst.dpDiv.removeClass(this._dialogClass).unbind('.ui-datepicker');
		$('.' + this._promptClass, inst.dpDiv).remove();
	},

	/* Close date picker if clicked elsewhere. */
	_checkExternalClick: function(event) {
		if (!$.datepicker._curInst)
			return;
		var $target = $(event.target);
		if (($target.parents('#' + $.datepicker._mainDivId).length == 0) &&
				!$target.hasClass($.datepicker.markerClassName) &&
				!$target.hasClass($.datepicker._triggerClass) &&
				$.datepicker._datepickerShowing && !($.datepicker._inDialog && $.blockUI))
			$.datepicker._hideDatepicker(null, '');
	},

	/* Adjust one of the date sub-fields. */
	_adjustDate: function(id, offset, period) {
		var target = $(id);
		var inst = $.data(target[0], PROP_NAME);
		this._adjustInstDate(inst, offset, period);
		this._updateDatepicker(inst);
	},

	/* Action for current link. */
	_gotoToday: function(id) {
		var target = $(id);
		var inst = $.data(target[0], PROP_NAME);
		if (this._get(inst, 'gotoCurrent') && inst.currentDay) {
			inst.selectedDay = inst.currentDay;
			inst.drawMonth = inst.selectedMonth = inst.currentMonth;
			inst.drawYear = inst.selectedYear = inst.currentYear;
		}
		else {
		var date = new Date();
		inst.selectedDay = date.getDate();
		inst.drawMonth = inst.selectedMonth = date.getMonth();
		inst.drawYear = inst.selectedYear = date.getFullYear();
		}
		this._adjustDate(target);
		this._notifyChange(inst);
	},

	/* Action for selecting a new month/year. */
	_selectMonthYear: function(id, select, period) {
		var target = $(id);
		var inst = $.data(target[0], PROP_NAME);
		inst._selectingMonthYear = false;
		inst[period == 'M' ? 'drawMonth' : 'drawYear'] =
			select.options[select.selectedIndex].value - 0;
		this._adjustDate(target);
		this._notifyChange(inst);
	},

	/* Restore input focus after not changing month/year. */
	_clickMonthYear: function(id) {
		var target = $(id);
		var inst = $.data(target[0], PROP_NAME);
		if (inst.input && inst._selectingMonthYear && !$.browser.msie)
			inst.input[0].focus();
		inst._selectingMonthYear = !inst._selectingMonthYear;
	},

	/* Action for changing the first week day. */
	_changeFirstDay: function(id, day) {
		var target = $(id);
		var inst = $.data(target[0], PROP_NAME);
		inst.settings.firstDay = day;
		this._updateDatepicker(inst);
	},

	/* Action for selecting a day. */
	_selectDay: function(id, month, year, td) {
		if ($(td).hasClass(this._unselectableClass))
			return;
		var target = $(id);
		var inst = $.data(target[0], PROP_NAME);
		var rangeSelect = this._get(inst, 'rangeSelect');
		if (rangeSelect) {
			this._stayOpen = !this._stayOpen;
			if (this._stayOpen) {
				$('.ui-datepicker td').removeClass(this._currentClass);
				$(td).addClass(this._currentClass);
			} 
		}
		inst.selectedDay = inst.currentDay = $('a', td).html();
		inst.selectedMonth = inst.currentMonth = month;
		inst.selectedYear = inst.currentYear = year;
		if (this._stayOpen) {
			inst.endDay = inst.endMonth = inst.endYear = null;
		}
		else if (rangeSelect) {
			inst.endDay = inst.currentDay;
			inst.endMonth = inst.currentMonth;
			inst.endYear = inst.currentYear;
		}
		this._selectDate(id, this._formatDate(inst,
			inst.currentDay, inst.currentMonth, inst.currentYear));
		if (this._stayOpen) {
			inst.rangeStart = new Date(inst.currentYear, inst.currentMonth, inst.currentDay);
			this._updateDatepicker(inst);
		}
		else if (rangeSelect) {
			inst.selectedDay = inst.currentDay = inst.rangeStart.getDate();
			inst.selectedMonth = inst.currentMonth = inst.rangeStart.getMonth();
			inst.selectedYear = inst.currentYear = inst.rangeStart.getFullYear();
			inst.rangeStart = null;
			if (inst.inline)
				this._updateDatepicker(inst);
		}
	},

	/* Erase the input field and hide the date picker. */
	_clearDate: function(id) {
		var target = $(id);
		var inst = $.data(target[0], PROP_NAME);
		if (this._get(inst, 'mandatory'))
			return;
		this._stayOpen = false;
		inst.endDay = inst.endMonth = inst.endYear = inst.rangeStart = null;
		this._selectDate(target, '');
	},

	/* Update the input field with the selected date. */
	_selectDate: function(id, dateStr) {
		var target = $(id);
		var inst = $.data(target[0], PROP_NAME);
		dateStr = (dateStr != null ? dateStr : this._formatDate(inst));
		if (this._get(inst, 'rangeSelect') && dateStr)
			dateStr = (inst.rangeStart ? this._formatDate(inst, inst.rangeStart) :
				dateStr) + this._get(inst, 'rangeSeparator') + dateStr;
		if (inst.input)
			inst.input.val(dateStr);
		this._updateAlternate(inst);
		var onSelect = this._get(inst, 'onSelect');
		if (onSelect)
			onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);  // trigger custom callback
		else if (inst.input)
			inst.input.trigger('change'); // fire the change event
		if (inst.inline)
			this._updateDatepicker(inst);
		else if (!this._stayOpen) {
			this._hideDatepicker(null, this._get(inst, 'duration'));
			this._lastInput = inst.input[0];
			if (typeof(inst.input[0]) != 'object')
				inst.input[0].focus(); // restore focus
			this._lastInput = null;
		}
	},
	
	/* Update any alternate field to synchronise with the main field. */
	_updateAlternate: function(inst) {
		var altField = this._get(inst, 'altField');
		if (altField) { // update alternate field too
			var altFormat = this._get(inst, 'altFormat');
			var date = this._getDate(inst);
			dateStr = (isArray(date) ? (!date[0] && !date[1] ? '' :
				this.formatDate(altFormat, date[0], this._getFormatConfig(inst)) +
				this._get(inst, 'rangeSeparator') + this.formatDate(
				altFormat, date[1] || date[0], this._getFormatConfig(inst))) :
				this.formatDate(altFormat, date, this._getFormatConfig(inst)));
			$(altField).each(function() { $(this).val(dateStr); });
		}
	},

	/* Set as beforeShowDay function to prevent selection of weekends.
	   @param  date  Date - the date to customise
	   @return [boolean, string] - is this date selectable?, what is its CSS class? */
	noWeekends: function(date) {
		var day = date.getDay();
		return [(day > 0 && day < 6), ''];
	},
	
	/* Set as calculateWeek to determine the week of the year based on the ISO 8601 definition.
	   @param  date  Date - the date to get the week for
	   @return  number - the number of the week within the year that contains this date */
	iso8601Week: function(date) {
		var checkDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), (date.getTimezoneOffset() / -60));
		var firstMon = new Date(checkDate.getFullYear(), 1 - 1, 4); // First week always contains 4 Jan
		var firstDay = firstMon.getDay() || 7; // Day of week: Mon = 1, ..., Sun = 7
		firstMon.setDate(firstMon.getDate() + 1 - firstDay); // Preceding Monday
		if (firstDay < 4 && checkDate < firstMon) { // Adjust first three days in year if necessary
			checkDate.setDate(checkDate.getDate() - 3); // Generate for previous year
			return $.datepicker.iso8601Week(checkDate);
		} else if (checkDate > new Date(checkDate.getFullYear(), 12 - 1, 28)) { // Check last three days in year
			firstDay = new Date(checkDate.getFullYear() + 1, 1 - 1, 4).getDay() || 7;
			if (firstDay > 4 && (checkDate.getDay() || 7) < firstDay - 3) { // Adjust if necessary
				checkDate.setDate(checkDate.getDate() + 3); // Generate for next year
				return $.datepicker.iso8601Week(checkDate);
			}
		}
		return Math.floor(((checkDate - firstMon) / 86400000) / 7) + 1; // Weeks to given date
	},
	
	/* Provide status text for a particular date.
	   @param  date  the date to get the status for
	   @param  inst  the current datepicker instance
	   @return  the status display text for this date */
	dateStatus: function(date, inst) {
		return $.datepicker.formatDate($.datepicker._get(inst, 'dateStatus'),
			date, $.datepicker._getFormatConfig(inst));
	},

	/* Parse a string value into a date object.
	   See formatDate below for the possible formats.

	   @param  format    string - the expected format of the date
	   @param  value     string - the date in the above format
	   @param  settings  Object - attributes include:
	                     shortYearCutoff  number - the cutoff year for determining the century (optional)
	                     dayNamesShort    string[7] - abbreviated names of the days from Sunday (optional)
	                     dayNames         string[7] - names of the days from Sunday (optional)
	                     monthNamesShort  string[12] - abbreviated names of the months (optional)
	                     monthNames       string[12] - names of the months (optional)
	   @return  Date - the extracted date value or null if value is blank */
	parseDate: function (format, value, settings) {
		if (format == null || value == null)
			throw 'Invalid arguments';
		value = (typeof value == 'object' ? value.toString() : value + '');
		if (value == '')
			return null;
		var shortYearCutoff = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff;
		var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
		var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
		var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
		var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
		var year = -1;
		var month = -1;
		var day = -1;
		var literal = false;
		// Check whether a format character is doubled
		var lookAhead = function(match) {
			var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
			if (matches)
				iFormat++;
			return matches;	
		};
		// Extract a number from the string value
		var getNumber = function(match) {
			lookAhead(match);
			var origSize = (match == '@' ? 14 : (match == 'y' ? 4 : 2));
			var size = origSize;
			var num = 0;
			while (size > 0 && iValue < value.length &&
					value.charAt(iValue) >= '0' && value.charAt(iValue) <= '9') {
				num = num * 10 + (value.charAt(iValue++) - 0);
				size--;
			}
			if (size == origSize)
				throw 'Missing number at position ' + iValue;
			return num;
		};
		// Extract a name from the string value and convert to an index
		var getName = function(match, shortNames, longNames) {
			var names = (lookAhead(match) ? longNames : shortNames);
			var size = 0;
			for (var j = 0; j < names.length; j++)
				size = Math.max(size, names[j].length);
			var name = '';
			var iInit = iValue;
			while (size > 0 && iValue < value.length) {
				name += value.charAt(iValue++);
				for (var i = 0; i < names.length; i++)
					if (name == names[i])
						return i + 1;
				size--;
			}
			throw 'Unknown name at position ' + iInit;
		};
		// Confirm that a literal character matches the string value
		var checkLiteral = function() {
			if (value.charAt(iValue) != format.charAt(iFormat))
				throw 'Unexpected literal at position ' + iValue;
			iValue++;
		};
		var iValue = 0;
		for (var iFormat = 0; iFormat < format.length; iFormat++) {
			if (literal)
				if (format.charAt(iFormat) == "'" && !lookAhead("'"))
					literal = false;
				else
					checkLiteral();
			else
				switch (format.charAt(iFormat)) {
					case 'd':
						day = getNumber('d');
						break;
					case 'D': 
						getName('D', dayNamesShort, dayNames);
						break;
					case 'm': 
						month = getNumber('m');
						break;
					case 'M':
						month = getName('M', monthNamesShort, monthNames); 
						break;
					case 'y':
						year = getNumber('y');
						break;
					case '@':
						var date = new Date(getNumber('@'));
						year = date.getFullYear();
						month = date.getMonth() + 1;
						day = date.getDate();
						break;
					case "'":
						if (lookAhead("'"))
							checkLiteral();
						else
							literal = true;
						break;
					default:
						checkLiteral();
				}
		}
		if (year < 100)
			year += new Date().getFullYear() - new Date().getFullYear() % 100 +
				(year <= shortYearCutoff ? 0 : -100);
		var date = new Date(year, month - 1, day);
		if (date.getFullYear() != year || date.getMonth() + 1 != month || date.getDate() != day)
			throw 'Invalid date'; // E.g. 31/02/*
		return date;
	},

	/* Standard date formats. */
	ATOM: 'yy-mm-dd', // RFC 3339 (ISO 8601)
	COOKIE: 'D, dd M yy',
	ISO_8601: 'yy-mm-dd',
	RFC_822: 'D, d M y',
	RFC_850: 'DD, dd-M-y',
	RFC_1036: 'D, d M y',
	RFC_1123: 'D, d M yy',
	RFC_2822: 'D, d M yy',
	RSS: 'D, d M y', // RFC 822
	TIMESTAMP: '@',
	W3C: 'yy-mm-dd', // ISO 8601

	/* Format a date object into a string value.
	   The format can be combinations of the following:
	   d  - day of month (no leading zero)
	   dd - day of month (two digit)
	   D  - day name short
	   DD - day name long
	   m  - month of year (no leading zero)
	   mm - month of year (two digit)
	   M  - month name short
	   MM - month name long
	   y  - year (two digit)
	   yy - year (four digit)
	   @ - Unix timestamp (ms since 01/01/1970)
	   '...' - literal text
	   '' - single quote

	   @param  format    string - the desired format of the date
	   @param  date      Date - the date value to format
	   @param  settings  Object - attributes include:
	                     dayNamesShort    string[7] - abbreviated names of the days from Sunday (optional)
	                     dayNames         string[7] - names of the days from Sunday (optional)
	                     monthNamesShort  string[12] - abbreviated names of the months (optional)
	                     monthNames       string[12] - names of the months (optional)
	   @return  string - the date in the above format */
	formatDate: function (format, date, settings) {
		if (!date)
			return '';
		var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
		var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
		var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
		var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
		// Check whether a format character is doubled
		var lookAhead = function(match) {
			var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
			if (matches)
				iFormat++;
			return matches;	
		};
		// Format a number, with leading zero if necessary
		var formatNumber = function(match, value) {
			return (lookAhead(match) && value < 10 ? '0' : '') + value;
		};
		// Format a name, short or long as requested
		var formatName = function(match, value, shortNames, longNames) {
			return (lookAhead(match) ? longNames[value] : shortNames[value]);
		};
		var output = '';
		var literal = false;
		if (date)
			for (var iFormat = 0; iFormat < format.length; iFormat++) {
				if (literal)
					if (format.charAt(iFormat) == "'" && !lookAhead("'"))
						literal = false;
					else
						output += format.charAt(iFormat);
				else
					switch (format.charAt(iFormat)) {
						case 'd':
							output += formatNumber('d', date.getDate()); 
							break;
						case 'D': 
							output += formatName('D', date.getDay(), dayNamesShort, dayNames);
							break;
						case 'm': 
							output += formatNumber('m', date.getMonth() + 1); 
							break;
						case 'M':
							output += formatName('M', date.getMonth(), monthNamesShort, monthNames); 
							break;
						case 'y':
							output += (lookAhead('y') ? date.getFullYear() : 
								(date.getYear() % 100 < 10 ? '0' : '') + date.getYear() % 100);
							break;
						case '@':
							output += date.getTime(); 
							break;
						case "'":
							if (lookAhead("'"))
								output += "'";
							else
								literal = true;
							break;
						default:
							output += format.charAt(iFormat);
					}
			}
		return output;
	},

	/* Extract all possible characters from the date format. */
	_possibleChars: function (format) {
		var chars = '';
		var literal = false;
		for (var iFormat = 0; iFormat < format.length; iFormat++)
			if (literal)
				if (format.charAt(iFormat) == "'" && !lookAhead("'"))
					literal = false;
				else
					chars += format.charAt(iFormat);
			else
				switch (format.charAt(iFormat)) {
					case 'd': case 'm': case 'y': case '@':
						chars += '0123456789'; 
						break;
					case 'D': case 'M':
						return null; // Accept anything
					case "'":
						if (lookAhead("'"))
							chars += "'";
						else
							literal = true;
						break;
					default:
						chars += format.charAt(iFormat);
				}
		return chars;
	},

	/* Get a setting value, defaulting if necessary. */
	_get: function(inst, name) {
		return inst.settings[name] !== undefined ?
			inst.settings[name] : this._defaults[name];
	},

	/* Parse existing date and initialise date picker. */
	_setDateFromField: function(inst) {
		var dateFormat = this._get(inst, 'dateFormat');
		var dates = inst.input ? inst.input.val().split(this._get(inst, 'rangeSeparator')) : null; 
		inst.endDay = inst.endMonth = inst.endYear = null;
		var date = defaultDate = this._getDefaultDate(inst);
		if (dates.length > 0) {
			var settings = this._getFormatConfig(inst);
			if (dates.length > 1) {
				date = this.parseDate(dateFormat, dates[1], settings) || defaultDate;
				inst.endDay = date.getDate();
				inst.endMonth = date.getMonth();
				inst.endYear = date.getFullYear();
			}
			try {
				date = this.parseDate(dateFormat, dates[0], settings) || defaultDate;
			} catch (e) {
				this.log(e);
				date = defaultDate;
			}
		}
		inst.selectedDay = date.getDate();
		inst.drawMonth = inst.selectedMonth = date.getMonth();
		inst.drawYear = inst.selectedYear = date.getFullYear();
		inst.currentDay = (dates[0] ? date.getDate() : 0);
		inst.currentMonth = (dates[0] ? date.getMonth() : 0);
		inst.currentYear = (dates[0] ? date.getFullYear() : 0);
		this._adjustInstDate(inst);
	},
	
	/* Retrieve the default date shown on opening. */
	_getDefaultDate: function(inst) {
		var date = this._determineDate(this._get(inst, 'defaultDate'), new Date());
		var minDate = this._getMinMaxDate(inst, 'min', true);
		var maxDate = this._getMinMaxDate(inst, 'max');
		date = (minDate && date < minDate ? minDate : date);
		date = (maxDate && date > maxDate ? maxDate : date);
		return date;
	},

	/* A date may be specified as an exact value or a relative one. */
	_determineDate: function(date, defaultDate) {
		var offsetNumeric = function(offset) {
			var date = new Date();
			date.setUTCDate(date.getUTCDate() + offset);
			return date;
		};
		var offsetString = function(offset, getDaysInMonth) {
			var date = new Date();
			var year = date.getFullYear();
			var month = date.getMonth();
			var day = date.getDate();
			var pattern = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g;
			var matches = pattern.exec(offset);
			while (matches) {
				switch (matches[2] || 'd') {
					case 'd' : case 'D' :
						day += (matches[1] - 0); break;
					case 'w' : case 'W' :
						day += (matches[1] * 7); break;
					case 'm' : case 'M' :
						month += (matches[1] - 0); 
						day = Math.min(day, getDaysInMonth(year, month));
						break;
					case 'y': case 'Y' :
						year += (matches[1] - 0);
						day = Math.min(day, getDaysInMonth(year, month));
						break;
				}
				matches = pattern.exec(offset);
			}
			return new Date(year, month, day);
		};
		return (date == null ? defaultDate :
			(typeof date == 'string' ? offsetString(date, this._getDaysInMonth) :
			(typeof date == 'number' ? offsetNumeric(date) : date)));
	},

	/* Set the date(s) directly. */
	_setDate: function(inst, date, endDate) {
		var clear = !(date);
		date = this._determineDate(date, new Date());
		inst.selectedDay = inst.currentDay = date.getDate();
		inst.drawMonth = inst.selectedMonth = inst.currentMonth = date.getMonth();
		inst.drawYear = inst.selectedYear = inst.currentYear = date.getFullYear();
		if (this._get(inst, 'rangeSelect')) {
			if (endDate) {
				endDate = this._determineDate(endDate, null);
				inst.endDay = endDate.getDate();
				inst.endMonth = endDate.getMonth();
				inst.endYear = endDate.getFullYear();
			} else {
				inst.endDay = inst.currentDay;
				inst.endMonth = inst.currentMonth;
				inst.endYear = inst.currentYear;
			}
		}
		this._adjustInstDate(inst);
		if (inst.input)
			inst.input.val(clear ? '' : this._formatDate(inst) +
				(!this._get(inst, 'rangeSelect') ? '' : this._get(inst, 'rangeSeparator') +
				this._formatDate(inst, inst.endDay, inst.endMonth, inst.endYear)));
	},

	/* Retrieve the date(s) directly. */
	_getDate: function(inst) {
		var startDate = (!inst.currentYear || (inst.input && inst.input.val() == '') ? null :
			new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
		if (this._get(inst, 'rangeSelect')) {
			return [inst.rangeStart || startDate, (!inst.endYear ? null :
				new Date(inst.endYear, inst.endMonth, inst.endDay))];
		} else
			return startDate;
	},

	/* Generate the HTML for the current state of the date picker. */
	_generateDatepicker: function(inst) {
		var today = new Date();
		today = new Date(today.getFullYear(), today.getMonth(), today.getDate()); // clear time
		var showStatus = this._get(inst, 'showStatus');
		var isRTL = this._get(inst, 'isRTL');
		// build the date picker HTML
		var clear = (this._get(inst, 'mandatory') ? '' :
			'<div class="ui-datepicker-clear"><a onclick="jQuery.datepicker._clearDate(\'#' + inst.id + '\');"' +
			(showStatus ? this._addStatus(inst, this._get(inst, 'clearStatus') || '&#xa0;') : '') + '>' +
			this._get(inst, 'clearText') + '</a></div>');
		var controls = '<div class="ui-datepicker-control">' + (isRTL ? '' : clear) +
			'<div class="ui-datepicker-close"><a onclick="jQuery.datepicker._hideDatepicker();"' +
			(showStatus ? this._addStatus(inst, this._get(inst, 'closeStatus') || '&#xa0;') : '') + '>' +
			this._get(inst, 'closeText') + '</a></div>' + (isRTL ? clear : '')  + '</div>';
		var prompt = this._get(inst, 'prompt');
		var closeAtTop = this._get(inst, 'closeAtTop');
		var hideIfNoPrevNext = this._get(inst, 'hideIfNoPrevNext');
		var navigationAsDateFormat = this._get(inst, 'navigationAsDateFormat');
		var numMonths = this._getNumberOfMonths(inst);
		var stepMonths = this._get(inst, 'stepMonths');
		var isMultiMonth = (numMonths[0] != 1 || numMonths[1] != 1);
		var currentDate = (!inst.currentDay ? new Date(9999, 9, 9) :
			new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
		var minDate = this._getMinMaxDate(inst, 'min', true);
		var maxDate = this._getMinMaxDate(inst, 'max');
		var drawMonth = inst.drawMonth;
		var drawYear = inst.drawYear;
		if (maxDate) {
			var maxDraw = new Date(maxDate.getFullYear(),
				maxDate.getMonth() - numMonths[1] + 1, maxDate.getDate());
			maxDraw = (minDate && maxDraw < minDate ? minDate : maxDraw);
			while (new Date(drawYear, drawMonth, 1) > maxDraw) {
				drawMonth--;
				if (drawMonth < 0) {
					drawMonth = 11;
					drawYear--;
				}
			}
		}
		// controls and links
		var prevText = this._get(inst, 'prevText');
		prevText = (!navigationAsDateFormat ? prevText : this.formatDate(
			prevText, new Date(drawYear, drawMonth - stepMonths, 1), this._getFormatConfig(inst)));
		var prev = '<div class="ui-datepicker-prev">' + (this._canAdjustMonth(inst, -1, drawYear, drawMonth) ? 
			'<a onclick="jQuery.datepicker._adjustDate(\'#' + inst.id + '\', -' + stepMonths + ', \'M\');"' +
			(showStatus ? this._addStatus(inst, this._get(inst, 'prevStatus') || '&#xa0;') : '') + '>' + prevText + '</a>' :
			(hideIfNoPrevNext ? '' : '<label>' + prevText + '</label>')) + '</div>';
		var nextText = this._get(inst, 'nextText');
		nextText = (!navigationAsDateFormat ? nextText : this.formatDate(
			nextText, new Date(drawYear, drawMonth + stepMonths, 1), this._getFormatConfig(inst)));
		var next = '<div class="ui-datepicker-next">' + (this._canAdjustMonth(inst, +1, drawYear, drawMonth) ?
			'<a onclick="jQuery.datepicker._adjustDate(\'#' + inst.id + '\', +' + stepMonths + ', \'M\');"' +
			(showStatus ? this._addStatus(inst, this._get(inst, 'nextStatus') || '&#xa0;') : '') + '>' + nextText + '</a>' :
			(hideIfNoPrevNext ? '' : '<label>' + nextText + '</label>')) + '</div>';
		var currentText = this._get(inst, 'currentText');
		currentText = (!navigationAsDateFormat ? currentText: this.formatDate(
			currentText, today, this._getFormatConfig(inst)));
		var html = (prompt ? '<div class="' + this._promptClass + '">' + prompt + '</div>' : '') +
			(closeAtTop && !inst.inline ? controls : '') +
			'<div class="ui-datepicker-links">' + (isRTL ? next : prev) +
			(this._isInRange(inst, (this._get(inst, 'gotoCurrent') && inst.currentDay ?
			currentDate : today)) ? '<div class="ui-datepicker-current">' +
			'<a onclick="jQuery.datepicker._gotoToday(\'#' + inst.id + '\');"' +
			(showStatus ? this._addStatus(inst, this._get(inst, 'currentStatus') || '&#xa0;') : '') + '>' +
			currentText + '</a></div>' : '') + (isRTL ? prev : next) + '</div>';
		var firstDay = this._get(inst, 'firstDay');
		var changeFirstDay = this._get(inst, 'changeFirstDay');
		var dayNames = this._get(inst, 'dayNames');
		var dayNamesShort = this._get(inst, 'dayNamesShort');
		var dayNamesMin = this._get(inst, 'dayNamesMin');
		var monthNames = this._get(inst, 'monthNames');
		var beforeShowDay = this._get(inst, 'beforeShowDay');
		var highlightWeek = this._get(inst, 'highlightWeek');
		var showOtherMonths = this._get(inst, 'showOtherMonths');
		var showWeeks = this._get(inst, 'showWeeks');
		var calculateWeek = this._get(inst, 'calculateWeek') || this.iso8601Week;
		var status = (showStatus ? this._get(inst, 'dayStatus') || '&#xa0;' : '');
		var dateStatus = this._get(inst, 'statusForDate') || this.dateStatus;
		var endDate = inst.endDay ? new Date(inst.endYear, inst.endMonth, inst.endDay) : currentDate;
		for (var row = 0; row < numMonths[0]; row++)
			for (var col = 0; col < numMonths[1]; col++) {
				var selectedDate = new Date(drawYear, drawMonth, inst.selectedDay);
				html += '<div class="ui-datepicker-one-month' + (col == 0 ? ' ui-datepicker-new-row' : '') + '">' +
					this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate,
					selectedDate, row > 0 || col > 0, showStatus, monthNames) + // draw month headers
					'<table class="ui-datepicker" cellpadding="0" cellspacing="0"><thead>' + 
					'<tr class="ui-datepicker-title-row">' +
					(showWeeks ? '<td>' + this._get(inst, 'weekHeader') + '</td>' : '');
				for (var dow = 0; dow < 7; dow++) { // days of the week
					var day = (dow + firstDay) % 7;
					var dayStatus = (status.indexOf('DD') > -1 ? status.replace(/DD/, dayNames[day]) :
						status.replace(/D/, dayNamesShort[day]));
					html += '<td' + ((dow + firstDay + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end-cell"' : '') + '>' +
						(!changeFirstDay ? '<span' :
						'<a onclick="jQuery.datepicker._changeFirstDay(\'#' + inst.id + '\', ' + day + ');"') + 
						(showStatus ? this._addStatus(inst, dayStatus) : '') + ' title="' + dayNames[day] + '">' +
						dayNamesMin[day] + (changeFirstDay ? '</a>' : '</span>') + '</td>';
				}
				html += '</tr></thead><tbody>';
				var daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
				if (drawYear == inst.selectedYear && drawMonth == inst.selectedMonth)
					inst.selectedDay = Math.min(inst.selectedDay, daysInMonth);
				var leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
				var printDate = new Date(drawYear, drawMonth, 1 - leadDays);
				var numRows = (isMultiMonth ? 6 : Math.ceil((leadDays + daysInMonth) / 7)); // calculate the number of rows to generate
				for (var dRow = 0; dRow < numRows; dRow++) { // create date picker rows
					html += '<tr class="ui-datepicker-days-row">' +
						(showWeeks ? '<td class="ui-datepicker-week-col">' + calculateWeek(printDate) + '</td>' : '');
					for (var dow = 0; dow < 7; dow++) { // create date picker days
						var daySettings = (beforeShowDay ?
							beforeShowDay.apply((inst.input ? inst.input[0] : null), [printDate]) : [true, '']);
						var otherMonth = (printDate.getMonth() != drawMonth);
						var unselectable = otherMonth || !daySettings[0] ||
							(minDate && printDate < minDate) || (maxDate && printDate > maxDate);
						html += '<td class="ui-datepicker-days-cell' +
							((dow + firstDay + 6) % 7 >= 5 ? ' ui-datepicker-week-end-cell' : '') + // highlight weekends
							(otherMonth ? ' ui-datepicker-otherMonth' : '') + // highlight days from other months
							(printDate.getTime() == selectedDate.getTime() && drawMonth == inst.selectedMonth ?
							' ui-datepicker-days-cell-over' : '') + // highlight selected day
							(unselectable ? ' ' + this._unselectableClass : '') +  // highlight unselectable days
							(otherMonth && !showOtherMonths ? '' : ' ' + daySettings[1] + // highlight custom dates
							(printDate.getTime() >= currentDate.getTime() && printDate.getTime() <= endDate.getTime() ?  // in current range
							' ' + this._currentClass : '') + // highlight selected day
							(printDate.getTime() == today.getTime() ? ' ui-datepicker-today' : '')) + '"' + // highlight today (if different)
							((!otherMonth || showOtherMonths) && daySettings[2] ? ' title="' + daySettings[2] + '"' : '') + // cell title
							(unselectable ? (highlightWeek ? ' onmouseover="jQuery(this).parent().addClass(\'ui-datepicker-week-over\');"' + // highlight selection week
							' onmouseout="jQuery(this).parent().removeClass(\'ui-datepicker-week-over\');"' : '') : // unhighlight selection week
							' onmouseover="jQuery(this).addClass(\'ui-datepicker-days-cell-over\')' + // highlight selection
							(highlightWeek ? '.parent().addClass(\'ui-datepicker-week-over\')' : '') + ';' + // highlight selection week
							(!showStatus || (otherMonth && !showOtherMonths) ? '' : 'jQuery(\'#ui-datepicker-status-' +
							inst.id + '\').html(\'' + (dateStatus.apply((inst.input ? inst.input[0] : null),
							[printDate, inst]) || '&#xa0;') +'\');') + '"' +
							' onmouseout="jQuery(this).removeClass(\'ui-datepicker-days-cell-over\')' + // unhighlight selection
							(highlightWeek ? '.parent().removeClass(\'ui-datepicker-week-over\')' : '') + ';' + // unhighlight selection week
							(!showStatus || (otherMonth && !showOtherMonths) ? '' : 'jQuery(\'#ui-datepicker-status-' +
							inst.id + '\').html(\'&#xa0;\');') + '" onclick="jQuery.datepicker._selectDay(\'#' +
							inst.id + '\',' + drawMonth + ',' + drawYear + ', this);"') + '>' + // actions
							(otherMonth ? (showOtherMonths ? printDate.getDate() : '&#xa0;') : // display for other months
							(unselectable ? printDate.getDate() : '<a>' + printDate.getDate() + '</a>')) + '</td>'; // display for this month
						               printDate.setDate(printDate.getDate() + 1);   // fix for double date in Novembers [ john@johnbarry.us, 11/2009 ] 
					}
					html += '</tr>';
				}
				drawMonth++;
				if (drawMonth > 11) {
					drawMonth = 0;
					drawYear++;
				}
				html += '</tbody></table></div>';
			}
		html += (showStatus ? '<div style="clear: both;"></div><div id="ui-datepicker-status-' + inst.id + 
			'" class="ui-datepicker-status">' + (this._get(inst, 'initStatus') || '&#xa0;') + '</div>' : '') +
			(!closeAtTop && !inst.inline ? controls : '') +
			'<div style="clear: both;"></div>' + 
			($.browser.msie && parseInt($.browser.version) < 7 && !inst.inline ? 
			'<iframe src="javascript:false;" class="ui-datepicker-cover"></iframe>' : '');
		return html;
	},
	
	/* Generate the month and year header. */
	_generateMonthYearHeader: function(inst, drawMonth, drawYear, minDate, maxDate,
			selectedDate, secondary, showStatus, monthNames) {
		minDate = (inst.rangeStart && minDate && selectedDate < minDate ? selectedDate : minDate);
		var html = '<div class="ui-datepicker-header">';
		html += monthNames[drawMonth] + '&#xa0;';
		html += drawYear;
		html += '</div>'; // Close datepicker_header
		return html;
	},

	/* Provide code to set and clear the status panel. */
	_addStatus: function(inst, text) {
		return ' onmouseover="jQuery(\'#ui-datepicker-status-' + inst.id + '\').html(\'' + text + '\');" ' +
			'onmouseout="jQuery(\'#ui-datepicker-status-' + inst.id + '\').html(\'&#xa0;\');"';
	},

	/* Adjust one of the date sub-fields. */
	_adjustInstDate: function(inst, offset, period) {
		var year = inst.drawYear + (period == 'Y' ? offset : 0);
		var month = inst.drawMonth + (period == 'M' ? offset : 0);
		var day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) +
			(period == 'D' ? offset : 0);
		var date = new Date(year, month, day);
		// ensure it is within the bounds set
		var minDate = this._getMinMaxDate(inst, 'min', true);
		var maxDate = this._getMinMaxDate(inst, 'max');
		date = (minDate && date < minDate ? minDate : date);
		date = (maxDate && date > maxDate ? maxDate : date);
		inst.selectedDay = date.getDate();
		inst.drawMonth = inst.selectedMonth = date.getMonth();
		inst.drawYear = inst.selectedYear = date.getFullYear();
		if (period == 'M' || period == 'Y')
			this._notifyChange(inst);
	},

	/* Notify change of month/year. */
	_notifyChange: function(inst) {
		var onChange = this._get(inst, 'onChangeMonthYear');
		if (onChange)
			onChange.apply((inst.input ? inst.input[0] : null),
				[new Date(inst.selectedYear, inst.selectedMonth, 1), inst]);
	},
	
	/* Determine the number of months to show. */
	_getNumberOfMonths: function(inst) {
		var numMonths = this._get(inst, 'numberOfMonths');
		return (numMonths == null ? [1, 1] : (typeof numMonths == 'number' ? [1, numMonths] : numMonths));
	},

	/* Determine the current maximum date - ensure no time components are set - may be overridden for a range. */
	_getMinMaxDate: function(inst, minMax, checkRange) {
		var date = this._determineDate(this._get(inst, minMax + 'Date'), null);
		if (date) {
			date.setHours(0);
			date.setMinutes(0);
			date.setSeconds(0);
			date.setMilliseconds(0);
		}
		return (!checkRange || !inst.rangeStart ? date :
			(!date || inst.rangeStart > date ? inst.rangeStart : date));
	},

	/* Find the number of days in a given month. */
	_getDaysInMonth: function(year, month) {
		return 32 - new Date(year, month, 32).getDate();
	},

	/* Find the day of the week of the first of a month. */
	_getFirstDayOfMonth: function(year, month) {
		return new Date(year, month, 1).getDay();
	},

	/* Determines if we should allow a "next/prev" month display change. */
	_canAdjustMonth: function(inst, offset, curYear, curMonth) {
		var numMonths = this._getNumberOfMonths(inst);
		var date = new Date(curYear, curMonth + (offset < 0 ? offset : numMonths[1]), 1);
		if (offset < 0)
			date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()));
		return this._isInRange(inst, date);
	},

	/* Is the given date in the accepted range? */
	_isInRange: function(inst, date) {
		// during range selection, use minimum of selected date and range start
		var newMinDate = (!inst.rangeStart ? null :
			new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay));
		newMinDate = (newMinDate && inst.rangeStart < newMinDate ? inst.rangeStart : newMinDate);
		var minDate = newMinDate || this._getMinMaxDate(inst, 'min');
		var maxDate = this._getMinMaxDate(inst, 'max');
		return ((!minDate || date >= minDate) && (!maxDate || date <= maxDate));
	},
	
	/* Provide the configuration settings for formatting/parsing. */
	_getFormatConfig: function(inst) {
		var shortYearCutoff = this._get(inst, 'shortYearCutoff');
		shortYearCutoff = (typeof shortYearCutoff != 'string' ? shortYearCutoff :
			new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
		return {shortYearCutoff: shortYearCutoff,
			dayNamesShort: this._get(inst, 'dayNamesShort'), dayNames: this._get(inst, 'dayNames'),
			monthNamesShort: this._get(inst, 'monthNamesShort'), monthNames: this._get(inst, 'monthNames')};
	},

	/* Format the given date for display. */
	_formatDate: function(inst, day, month, year) {
		if (!day) {
			inst.currentDay = inst.selectedDay;
			inst.currentMonth = inst.selectedMonth;
			inst.currentYear = inst.selectedYear;
		}
		var date = (day ? (typeof day == 'object' ? day : new Date(year, month, day)) :
			new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
		return this.formatDate(this._get(inst, 'dateFormat'), date, this._getFormatConfig(inst));
	}
});

/* jQuery extend now ignores nulls! */
function extendRemove(target, props) {
	$.extend(target, props);
	for (var name in props)
		if (props[name] == null || props[name] == undefined)
			target[name] = props[name];
	return target;
};

/* Determine whether an object is an array. */
function isArray(a) {
	return (a && (($.browser.safari && typeof a == 'object' && a.length) ||
		(a.constructor && a.constructor.toString().match(/\Array\(\)/))));
};

/* Invoke the datepicker functionality.
   @param  options  string - a command, optionally followed by additional parameters or
                    Object - settings for attaching new datepicker functionality
   @return  jQuery object */
$.fn.datepicker = function(options){
	var otherArgs = Array.prototype.slice.call(arguments, 1);
	if (typeof options == 'string' && (options == 'isDisabled' || options == 'getDate'))
		return $.datepicker['_' + options + 'Datepicker'].
			apply($.datepicker, [this[0]].concat(otherArgs));
	return this.each(function() {
		typeof options == 'string' ?
			$.datepicker['_' + options + 'Datepicker'].
				apply($.datepicker, [this].concat(otherArgs)) :
			$.datepicker._attachDatepicker(this, options);
	});
};

$.datepicker = new Datepicker(); // singleton instance
	
/* Initialise the date picker. */
$(document).ready(function() {
	$(document.body).append($.datepicker.dpDiv).
		mousedown($.datepicker._checkExternalClick);
});

})(jQuery);

