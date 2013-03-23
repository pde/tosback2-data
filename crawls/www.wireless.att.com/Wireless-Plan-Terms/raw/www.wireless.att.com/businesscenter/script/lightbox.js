var lightboxId = "";
var lightboxinuse = "false";
$(document).ready(function() {
	fixlightboxdivs();	
});
function supports_video() {
  return !!document.createElement('video').canPlayType;
}
function supports_ogg_theora_video() {
  if (!supports_video()) { return false; }
  var v = document.createElement("video");
  return v.canPlayType('video/ogg; codecs="theora, vorbis"');
}
function supports_h264_baseline_video() {
  if (!supports_video()) { return false; }
  var v = document.createElement("video");
  return v.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
}
function supports_webm_video() {
  if (!supports_video()) { return false; }
  var v = document.createElement("video");
  return v.canPlayType('video/webm; codecs="vp8, vorbis"');
}	
function fixlightboxdivs(){
	if(!((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/iPod/i)))){
		$("div.lightboxWrapper").each(function() {	
			var clone =  $('div#'+$(this).attr('id')+'-embed video embed').clone(true);
			if(clone.length){
				$('div#'+$(this).attr('id')+'-embed').html(clone);
			}
		});
	}	
	$("div.lightboxWrappers").each(function() {
		$('body').prepend($(this).html());		
	});
	$("div.lightboxWrappers div.lightboxDiv embed").remove();	
	$("div.lightboxWrappers").empty();
	$("div.lightboxWrappers").remove();	
	
}
function disablelightbox(){
	lightboxinuse = "false";
	var clone = $('div#'+lightboxId+'-embed').clone(true);
	$('div#'+lightboxId+'-embed').empty();
	$('div#'+lightboxId+'-embed').remove();
	$('div#'+lightboxId).hide();
	$('div#'+lightboxId+'-wrapper').html(clone);
	$('div#lightboxBkgrnd').remove();
	lightboxId = "";	
}
function lightboxit(lightboxThisId){
	lightboxinuse = "true";
	lightboxId = lightboxThisId;
	var wtPN = "UNKNOWN lightbox";
	if(($("#"+lightboxId+"-wrapper .wtPN").length >0) && $("#"+lightboxId+"-wrapper .wtPN").text().length >0){
		wtPN = $("#"+lightboxId+"-wrapper .wtPN").text();		
	} 
	var dcsURI = wtPN;
	dcsURI = dcsURI.replace(/^\s+|\s+$/g, '') ;
	dcsURI = dcsURI.replace(/[^\w+-]+/g,'-');
	dcsURI = dcsURI.replace(/\s/g,'');	
	dcsURI = dcsURI.toLowerCase();

	dcsMultiTrack('DCS.dcsuri','/virtual_business_center/'+dcsURI, 'DCS.dcsref',window.location.href, 
					'DCSext.wtPN','B2B Business Center - ' + wtPN+' Pg');
					
	var html ="<div id='lightboxBkgrnd' onclick='disablelightbox();'></div>";
	$('body').append(html);
	
	var height = $('body').height();
	var width = $('body').width();
	var overlayTop = 0;
	var position = "fixed";
	var scroll = 0;

	if($('div#'+lightboxId).height()>$('body').height()) {
		position = "absolute";
		if($('div#'+lightboxId).height() < $(window).height()) {
			height = $(window).height();
		} else {
			height = $('div#'+lightboxId).height();
		}
	} else {
		if($('body').height() < $(window).height()) {
			height = $(window).height();
		} else {
			height = $('body').height();
		}			
	}
	if($('div#'+lightboxId).width()>$('body').width()) {
		position = "absolute";
		if($('div#'+lightboxId).width() < $(window).width()) {
			width = $(window).width();
		} else {
			width = $('div#'+lightboxId).width();
		}			
	} else {
		if($('body').width() < $(window).width()) {
			width = $(window).width();
		} else {
			width = $('body').width();
		}			
	}	
	
	if($(window).height() < $('div#'+lightboxId).height()){
		position = "absolute";
		scroll = $(window).scrollTop();
	} 
	$('div#lightboxBkgrnd').css({
		'width': width,  
		'height' : height,
		'top' : overlayTop

	});		
	$('div#lightboxBkgrnd').show();
	if(!supports_h264_baseline_video() && $('div#'+lightboxId+'-embed embed').length ){
		var clone = $('div#'+lightboxId+'-embed embed').clone(true);
		$('div#'+lightboxId+'-embed').html(clone);
	} 
	$('div#'+lightboxId).show();
	var toppx = ($(window).height()/2 - ($('div#'+lightboxId).height() / 2)) > 0 ? scroll + $(window).height()/2 - ($('div#'+lightboxId).height() / 2) : scroll;
	$('div#'+lightboxId).css({
		'left' : ($(window).width()/2 - ($('div#'+lightboxId).width() / 2)) > 0 ? $(window).width()/2 - ($('div#'+lightboxId).width() / 2) : 0,  
		'top' : toppx + 'px', 
		'position' : position
	});	
}
$(window).resize(function() {
	if (lightboxinuse == "false" ){return false;}
	var height = $('body').height();
	var width = $('body').width();
	var overlayTop = 0;
	var position = "fixed";
	var scroll = 0;

	if($('div#'+lightboxId).height()>$('body').height()) {
		position = "absolute";
		if($('div#'+lightboxId).height() < $(window).height()) {
			height = $(window).height();
		} else {
			height = $('div#'+lightboxId).height();
		}
	} else {
		if($('body').height() < $(window).height()) {
			height = $(window).height();
		} else {
			height = $('body').height();
		}			
	}

	if($('div#'+lightboxId).width()>$('body').width()) {
		position = "absolute";
		if($('div#'+lightboxId).width() < $(window).width()) {
			width = $(window).width();
		} else {
			width = $('div#'+lightboxId).width();
		}			
	} else {
		if($('body').width() < $(window).width()) {
			width = $(window).width();
		} else {
			width = $('body').width();
		}			
	}

	if($(window).height() < $('div#'+lightboxId).height()){
		position = "absolute";
		scroll = $(window).scrollTop();
	}
	var toppx = ($(window).height()/2 - ($('div#'+lightboxId).height() / 2)) > 0 ? scroll + $(window).height()/2 - ($('div#'+lightboxId).height() / 2) : scroll;

	$('div#lightboxBkgrnd').css({
		'width': width, 
		'height' : height, 
		'top' : overlayTop

	});	
	$('div#'+lightboxId).css({
		'left' : ($(window).width()/2 - ($('div#'+lightboxId).width() / 2)) > 0 ? $(window).width()/2 - ($('div#'+lightboxId).width() / 2) : 0, 
		'top' : toppx + 'px', 
		'position' : position
	});
});