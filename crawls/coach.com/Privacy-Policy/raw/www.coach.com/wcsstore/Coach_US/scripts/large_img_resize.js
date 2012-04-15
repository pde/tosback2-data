/*
       Date: 6/24/2008
	   Description: Provides functionality for image resize on HomePage under jQuery
*/ 


<!--//
$(window).resize( updateSize );
$(document).ready( lgi_initialization );
function lgi_initialization(){
	updateSize();
}

var imageMapStorage = new Array();
function updateSize(){
	var needsImageResize = $('#interiorLargeObject').get(0);
	if (typeof(needsImageResize) != 'undefined') {
		var mediaWidth = 2420; // 2.2 
		var mediaHeight = 1100; // 1
		var h = $(window).height();
		var w = $(window).width();
		var objWidth= $('#interiorLargeObject').width();
		var objHeight = $('#interiorLargeObject').height();
		
		$('#interiorLargeObject').css('width', 1+'px');
		$('#interiorLargeObject').css('height', 1+'px');
		$('#interiorLargeObject').css('width', '');
		
		// reset viewport
		if( $.browser.msie) window.scrollTo(0,0);
		
		var minWidth = 1012;
		var minHeight = 460;
		var originalWidth = mediaWidth;
		var originalHeight = mediaHeight;
		var containerWidth = w;
		var containerHeight = h;
		
		// calc min
		if (w < minWidth) containerWidth = minWidth; 
		if (h < minHeight) containerHeight = minHeight;
		
		// calc object size
		objWidth = objHeight * minWidth/minHeight;
	
		if(containerWidth <= minWidth) $('#interiorLargeObject').css('width', minWidth+'px');
		else $('#interiorLargeObject').css('width', '100%');
		
		
		var heightMultiplier = $('#interiorLargeObject').width() / originalWidth;
		$('#interiorLargeObject').css('height', (originalHeight*heightMultiplier)+'px');
		
		objHeight = $('#interiorLargeObject').height();	
		
		if (objHeight < containerHeight) {
			objHeight = containerHeight;
			objWidth = objHeight * minWidth/minHeight;
			$('#interiorLargeObject').css('width', objWidth+'px');
			$('#interiorLargeObject').css('height', objHeight+'px');
		}
	}
	
	// SCALE THE IMAGE MAP
	
	$($("#interiorLargeObject").attr('usemap')).children().each( function () {
		updateMap($(this), objWidth/mediaWidth, $("#interiorLargeObject").attr('usemap'));
	});
}

function updateMap(mapArea, scale, mapname){
	var mapId = mapArea.attr('id');
	var coords = mapArea.attr('coords');
	if(imageMapStorage[mapname+mapId]) coords = imageMapStorage[mapname+mapId];
	else imageMapStorage[mapname+mapId] = coords;
	
	if (coords == undefined) return;
	var working = coords.split(",");
	for(var i=0; i < working.length; ++i){
		working[i] = Math.round(Number(working[i])*scale).toString();
	}
	var updatedCoords = working.join(",");
	mapArea.attr('coords', updatedCoords);
}

//-->

