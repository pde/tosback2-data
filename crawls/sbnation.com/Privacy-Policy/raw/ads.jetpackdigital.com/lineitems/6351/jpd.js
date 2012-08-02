if(typeof loadedJp_6351 == "undefined") {
	loadedJp_6351 = true;

if(typeof console == "undefined") {
	console = {log: function() {}};
}

var jpiframe = false;
jp_dma = 1200;

if(0 && window!=window.top && typeof(requestedLineItemXDM) == "undefined") {
		
	// This is an iframe
	jpiframe = true;
	var iframesrc = location.href;
	var hostname = document.referrer.match(/(http.*?\/\/.*?)\//);
	var scrs = window.document.getElementsByTagName("script");
	var scr = "http://ads.jetpackdigital.com/lineitems/6351/jpd.js";
	
		
			var xdm = hostname[1] + "/jpd/jpxdm.html?ifr=" + escape(iframesrc) + "&src=" + escape(scr);
		
		
			
	if(typeof jpli != "undefined")  {
		xdm += "&jpli=" + jpli;
	} else {
		xdm += "&jpli=6351";
	}
	
	var fid = Math.floor(Math.random() * 10000000000);
	xdm += "&fid=" + fid;

	if(window.parent != window.top) {
		location.replace(xdm);

	} else {
			try {		
				var script = document.createElement("script");
				script.type = "text/javascript";
				script.src = scr;
				window.parent.document.body.appendChild(script);
			} catch(e) {
				document.write('<iframe id="jp_xdm" src="' + xdm + '" height="1" width="1" style="position: absolute;top:-999px;"></iframe>');
			}
	}


};


              
if(1 || (typeof jploaded == "undefined" && !jpiframe)) {

if(!jpiframe) {


jpparentpage = location.href;
jploaded = true;

// Possible units to check for conflict
jpclickableskin = false;
jpsuperheader = false;
jpactiveskin = false;
jpactiveskinandoverlay = false;
jpactiveskincombined = false;
jpbannerunit = false;
jpeditorialunit = false;
jpinterstitialoverlay = false;
jpsiteoverlay = false;
jpswapassetunit = false;
jpsidekick = false;
jpinlineunit = false;
jppeelback = false;
jpsupervideo = false;
jpvideowall = false;
jpnull = null;

jp_skin = false;
jp_clickableskin = false;
jp_superheader = false;
jp_bannerunit = false;
jp_activeskin = false;
jp_activeskinandoverlay = false;
jp_activeskincombined = false;
jp_sidekick = false;
jp_editorialunit = false;
jp_interstitialoverlay = false;
jp_inlineunit = false;
jp_siteoverlay = false;
jp_swapassetunit = false;
jp_peelback = false;
jp_videowall = false;
jp_null = null;

jp_customunitfunctions = new Array();
jp_customunitindex = 0;

jp_clickthroughmutex = false;

jp_loadingDma = false;

var jpCurrentTime = new Date();
var jpmonth = jpCurrentTime.getMonth() + 1;
jpmonth = (jpmonth < 10) ? "0" + jpmonth : jpmonth;
var jpday = jpCurrentTime.getDate();
jpday = (jpday < 10) ? "0" + jpday : jpday;
var jpyear = jpCurrentTime.getFullYear(); 
var jpCurrentDay = jpyear + "-" + jpmonth + "-" + jpday;

if(typeof jpord == "undefined") { 
	jpord = Math.floor(Math.random()*100000000000);
};

if(typeof ord == "undefined") {
	ord = jpord;
} else {
	jpord = ord;
};

var jpBodyReadyInterval = null;
var jpBodyAvailable = false;
function jpBodyReady(func) {
	JP(document).ready(function() { func(); });
};

function jpElementReady(elementId,func) {	
	if(JP("#" + elementId).length > 0) {
		func();
	} else {
		setTimeout(function() { jpElementReady(elementId, func); }, 100);
	}
};

function jpLockClickThrough() {
	jp_clickthroughmutex = true;
};

function jpReleaseClickThrough() {
	jp_clickthroughmutex = false;
};

function jpCanClickThrough() {
	if(jpclickableskin && jpsupervideo) {
		return !jp_clickthroughmutex;
	} else {
		return true;
	}
};

function jpGenerateInlineStyles(style_id) {
	var cssstring = JP(style_id).html(); 

	var cssblocks = cssstring.split("}");
	for(i = 0; i < cssblocks.length; i++) {
	  var cssblock = cssblocks[i];
	  
	  if(cssblock == "") {
	  	continue;
	  }
	 
	  var csscom = cssblock.split("{");
	  if(csscom[0] == "") {
	  	continue;
	  }
	  
	  
	  var csselems = csscom[1].split(";");
	  if(!csselems.length) {
	  	csselems = new Array();
	  	csselems[0] = csscom[1];
	  }
	  
	  for(j = 0; j < csselems.length; j++) {
	        if(csselems[j] != "") {
	                var cssitems = csselems[j].split(": ");
	                var cssid = JP.trim(cssitems[0]);
	               
	                var cssvalue = JP.trim(cssitems[1].replace("!important",""));
	             
	             	if(typeof document.styleSheets != "undefined" && document.styleSheets.length && typeof document.styleSheets[0].addRule != "undefined") {
	             		document.styleSheets[0].addRule(csscom[0], cssid + ":" + cssvalue);
	             	} else {
	                	//JP(csscom[0]).css(cssid,cssvalue);
	               }
	        }
	  }
	}
};

function jpUnloadUnits() {

	
	// Unset the loaded variable
	loadedJp_6351 = null;
	delete loadedJp_6351;
	
	if(typeof JP != "undefined") {
		JP("#jp_swap_embed").remove();
		JP("#jp_overlay").remove();
		JP("#jpsidekick").remove();
		JP("#jppeelbackexpanded").remove();
		JP("#jppeelbackpreview").remove();
		JP("#jpintoverlay").remove();
		JP("#jpeditorialunit").remove();
		JP("#jpplatform").remove();
		JP("#jpd_leftwell").remove();
		JP("#jpd_rightwell").remove();
		JP("#jpsuperheader").remove();
	    JP("#supervideoplayerwrapper").remove();
	    JP(".jpinlineunit").each(function() {
	    	JP(this).remove();
	    });
	    
	    JP(document).trigger("jpUnloadUnits");
    }
};


function jpLog(message) {
	
};

function jpPrettyDate(time){
	var date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," "));
		diff = (((new Date()).getTime() - date.getTime()) / 1000);
		day_diff = Math.floor(diff / 86400);
			
	if ( isNaN(day_diff) || day_diff >= 31 ) {
		return;
	}
			
	return day_diff <= 0 && (
			diff < 60 && "just now" ||
			diff < 120 && "1 minute ago" ||
			diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
			diff < 7200 && "1 hour ago" ||
			diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
		day_diff == 1 && "Yesterday" ||
		day_diff < 7 && day_diff + " days ago" ||
		day_diff < 31 && Math.ceil( day_diff / 7 ) + " weeks ago";
};

function jpGetQueryVariable(variable, query) { 
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
}; 


function jpGetParameterByName( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null ) {
    return "";
  } else {
    return results[1];
  }
};

var scriptSource = (function(scripts) {
    var scripts = document.getElementsByTagName('script'),
        script = scripts[scripts.length - 1];

    if (script.getAttribute.length !== undefined) {
        return script.src
    }

    return script.getAttribute('src', -1)
}());

function jpdSetCookie( name, value, expires, path, domain, secure )
{
	// set time, it's in milliseconds
	var today = new Date();
	today.setTime( today.getTime() );
	
	
	if(typeof domain == "undefined") {
		domain = document.domain;
	}
	
	var m = domain.match(new RegExp("(.*?)\.((com|net|org|info|coop|int|co\.uk|org\.uk|ac\.uk|uk|tv|me))$"));
	if(m) {
		var n = m[1].split(".");
		var o = n[n.length-1];
		domain = o + "." + m[2];
	}
	
	/*
	if the expires variable is set, make the correct
	expires time, the current script below will set
	it for x number of days, to make it for hours,
	delete * 24, for minutes, delete * 60 * 24
	*/
	if ( expires )
	{
	expires = expires * 1000 * 60 * 60 * 24;
	}
	var expires_date = new Date( today.getTime() + (expires) );
	
	document.cookie = name + "=" +escape( value ) + ( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) + ( ( path ) ? ";path=" + path : "" ) +( ( domain ) ? ";domain=" + domain : "" ) + ( ( secure ) ? ";secure" : "" );
};

function jpdGetCookie( check_name ) {
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
};

function jpGenerateUserId() {
	var userId = jpdGetCookie("jpduid");
	if(!userId) {
		// Create random number, set the cookie, and return
		var timestamp = new Date().getTime();
		var random = Math.floor(Math.random()*1000000000);
		userId = "l" + timestamp + random;
		jpdSetCookie("jpduid",userId,365);
	}
		
	return userId;
};


function jpLoadScript(scriptSrc, completeFunc) {
	var head = document.getElementsByTagName('head')[0];
  	var script= document.createElement('script');
   	script.type= 'text/javascript';
    
    script.onreadystatechange= function () {
      if (this.readyState == 'complete' || this.readyState == 'loaded') { 
      	script.onreadystatechange = null;
      	completeFunc();
      }
    };

    
    script.onload=completeFunc;

    script.src= scriptSrc;
    head.appendChild(script);
};

function jpGetDatedConfig(config) {
	if(config["dates"]) {
		var currentTime = new Date();
		var month = (currentTime.getMonth() + 1 < 10) ? "0" + (currentTime.getMonth() + 1 ) : currentTime.getMonth() + 1 ;
		var day = (currentTime.getDate() < 10) ? "0" + currentTime.getDate() : currentTime.getDate();
		var year = currentTime.getFullYear();
		var date = month + "/" + day + "/" + year;
		var idate = parseInt(year + "" + month + "" + day);
		
		var od = jpGetParameterByName( "od" );
		if(od) {
			date = od;
			dateparts = date.split("/");
			idate = parseInt(dateparts[2] + "" + dateparts[0] + "" + dateparts[1]);	
		}
				var availDates = new Array();
		for(d in config["dates"]) {
			availDates.push(d);
		}
		availDates.sort();
		
		for(var i = 0; i < availDates.length; i++) {
			var dateparts = availDates[i].split("/");
			var iAvailDate = parseInt(dateparts[2] + "" + dateparts[0] + "" + dateparts[1]);
			if(typeof availableDates != "undefined") {
				if(JP.inArray(availDates[i], availableDates) == -1) {
					availableDates.push(availDates[i]);
				}
			}
			
			var iNextAvailDate = null;
			if(availDates[i+1]) {
				ndateparts = availDates[i+1].split("/");
				iNextAvailDate = parseInt(ndateparts[2] + "" + ndateparts[0] + "" + ndateparts[1]);
			}
			
			if(idate >= iAvailDate && (iNextAvailDate == null || idate < iNextAvailDate)) {
				var date = availDates[i];
				config = config["dates"][date];
			}	
		}
	} 

	return config;
};



// Load jQuery if it isn't loaded already
var dollarFunctionHolder = null;
var jQueryFunctionHolder = null;

function jpLoadJQuery_6351() {		
		if(typeof($) != 'undefined') {
			dollarFunctionHolder = $;
		} 
				
		if(typeof(jQuery) != 'undefined') {
			jQueryFunctionHolder = jQuery;
		}
		
        if((typeof(jQuery) == 'undefined' || ((parseInt(jQuery.fn.jquery.replace(/\./g,"")) < 99)?parseInt(jQuery.fn.jquery.replace(/\./g,""))*10:parseInt(jQuery.fn.jquery.replace(/\./g,""))) < 163) && typeof(JP) == 'undefined'){             
               	if(typeof(loadingJQuery) == 'undefined' || !loadingJQuery) {
               		loadingJQuery = true;
               		jpLoadScript('http://ads.jetpackdigital.com/jquery-1.6.3.min.js',function() {
        				if(typeof(JP) == 'undefined') {
        					JP=jQuery.noConflict(true);
        				}
        			
        				if(dollarFunctionHolder != null) {
        					$ = dollarFunctionHolder;
        				}
        				if(jQueryFunctionHolder != null) {
        					jQuery = jQueryFunctionHolder;
        				}
        				jpRunUnits6351();
        			});
        		} else {
        									var jptimeout = 100;
										
					if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)){
 						var ffversion=new Number(RegExp.$1);
 						if (ffversion<4) {
 							if(jptimeout < 1500) {
 								jptimeout = 1500;
 						}
 						}		
 					}
					
        			setTimeout("jpLoadJQuery_6351()", jptimeout);
        		}
        		
        } else {
        	
			
		    // Set JP to be used everywhere
			if(typeof(JP) == 'undefined') {
			 	JP=jQuery;
			}
			
			if(dollarFunctionHolder != null) {
				$ = dollarFunctionHolder;
			}
			if(jQueryFunctionHolder != null) {
        		jQuery = jQueryFunctionHolder;
        	}
			jpRunUnits6351();   
		}
};

function jpRunUnits6351() {
	// Get the video license if it's available

	var loadedLineItems = new Array();
	var requestedLineItems = new Array();
		
		
	var animatebody = false;

var hasFlash = swfobject.hasFlashPlayerVersion("8");
var supportsVideoTag = !!document.createElement('video').canPlayType;

var supervideo_325__6351 = function() {
	// Set the lineItemId for this unit
	this.lineItemId = 6351;
	
	this.runnable = false;
	this.running = false;

	var headerPoll;
	var jpBodyLoaded = false;
	var oldwindowopen;
	var video_counter;
	var mainVideoIndex;
	var playlistNames;
	
	var showingTeaser = true;
	
	hiddenVideoImage = false;
	
	shStageId = null;
	supervideoplayerwrapper = null;
	supervideoplayerimage = null;
	supervideoloadingimage = null;
	supervideoplayer = null;
	jpvideoplayer = null;
	
	jpAlreadyExpanded = false;
	jpinlineunit = true;
	
	var parentElement = null;
	
	var supervideoflowplayer = null;
	
	teaserReported = new Array();
	mainReported = new Array();
	
	//var teaserReportedStart = false;
	//var teaserReportedQuarter = false;
	//var teaserReportedHalf = false;
	//var teaserReportedThreeQuarter = false;
	
	activeVideo = "";
	activeVideoIndex = 0;
	reportedVideos = new Array();

	var videoTag = null;
	
	svplaylist = [];
	
	teaserVideoUrl = "http://ads.jetpackdigital.com/sites/_uploads/13433413531343341353RiseAboveConditions_8SEC_1200x667.mp4";
	teaserOverlayUrl = "";
	mainVideoUrl = "http://ads.jetpackdigital.com/sites/_uploads/13433414371343341437RiseAboveConditions_15SEC.mp4";
	videoImageUrl = "http://ads.jetpackdigital.com/tracking_pixel.gif";
	loadingImageUrl = "http://ads.jetpackdigital.com/orders/1099/6318/assets/13410171751341017175NIKE_667_LOADER.png";
	
	var videosStarted = new Array();	
		
	var videowidth = parseInt("1200".replace("px",""));
	var videoheight = parseInt("667".replace("px",""));
	
	var mainvideowidth = 1200;
	var mainvideoheight = 667;
	
	if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i))) {
		
		var getElementTotalWidth = function(elem) {
			var ww = JP(elem).width();
			ww += parseInt(JP(elem).css("padding-left"), 10) + parseInt(JP(elem).css("padding-right"), 10); //Total Padding Width
			ww += parseInt(JP(elem).css("margin-left"), 10) + parseInt(JP(elem).css("margin-right"), 10); //Total Margin Width
			ww += parseInt(JP(elem).css("borderLeftWidth"), 10) + parseInt(JP(elem).css("borderRightWidth"), 10); //Total Border Width
			return ww;
		};
		
		// Find the largest width of all the divs in the body
		var mca = "body";
		var ww = JP(window).width();
		JP("body").children().each(function() {
			var elemWidth = getElementTotalWidth(this);
			if(elemWidth > ww) {
				ww = elemWidth;
			}
		});
			
		if(mainvideowidth > ww) {
			omw = mainvideowidth;
			mainvideowidth = ww;
			mainvideoheight = Math.round((ww/omw) * mainvideoheight);
		}
		
		if(videowidth > ww) {
			ow = videowidth;
			videowidth = ww;
			videoheight = Math.round((ww/ow) * videoheight);
		}
	}

	
	var mainvideotop = "0px";
	
	// Cache
	if(loadingImageUrl && loadingImageUrl != "") {
     	var limage = new Image();
     	limage.src = loadingImageUrl;
    }
	
	freqCap = parseInt(0);
	
	if(typeof ord == "undefined") ord = Math.random()*100000000000; 
	var ordstr = ord + '';
    ordstr = ordstr.substr(0,10);
	var rawClickThrough = "http://ad.doubleclick.net/clk;259257094;83367154;t;pc=[TPAS_ID]".replace("[random]",ordstr);
	var clickThroughUrl = "http://jptracking.elasticbeanstalk.com/jpc?ord="+ord+"&lid=6351&c=0";
	
	
	var scriptSource = (function(scripts) {
	    var scripts = document.getElementsByTagName('script'),
	        script = scripts[scripts.length - 1];
	
	    if (script.getAttribute.length !== undefined) {
	        return script.src
	    }
	
	    return script.getAttribute('src', -1)
}());

	if(scriptSource && scriptSource.match(/jetpackdigital/)) {
		var inlineClickThrough = scriptSource.substr(scriptSource.indexOf("u=") + 2);
		if(inlineClickThrough && scriptSource.indexOf("u=") != -1) {
			clickThroughUrl = 'http://jptracking.elasticbeanstalk.com/jpt?ord='+ordstr+'&lid=6351&c=0&t=inlineClick&u=' + inlineClickThrough;
		}
	}

	var cid = "6351";
	var tp = 'http://jptracking.elasticbeanstalk.com/jpt?ord='+ord+'&lid=6351&c=0';
	
	    	    	    	    		mainclip = "http://ads.jetpackdigital.com/sites/_uploads/13433414371343341437RiseAboveConditions_15SEC.mp4";
    	        	    	    	        	    	    	        	    	    	        	    	    	    	
	
	var reportQuartile = function(clipname, clipindex, reportindex, percentage, checkold) {
		
		var reported = null;
		if(clipname == "teaser") {
			reported = teaserReported;
		} else if(clipname == "main") {
			if(typeof mainReported[clipindex] == "undefined") {
				mainReported[clipindex] = new Array();
			}
			reported = mainReported[clipindex];
			if(clipindex > 0) {
				clipname = clipname + clipindex;
			}
			
			if(typeof ord == "undefined") { 
				ord = Math.floor(Math.random() * 9999999999);
			}
			
				    	
	    		    	
	    		    	
	    		    	
	    	
		}
		
		if(checkold == true) {
			for(i = reportindex-1; i >= 0; i--) {
				if(typeof reported[i] == "undefined") {
					var perc = i * 25;
					reportQuartile(clipname, clipindex, i, perc, false);
				}
			}
		}
		
		
		if(typeof reported[reportindex] == "undefined") {
			
			JP(document).trigger("jpVideo" + percentage, [clipname, clipindex]);
			
			var cb = Math.floor(Math.random() * 10000000000);
			var trackingsrc = "http://ads.jetpackdigital.com/tracking_pixel.gif?" + cb;
    		var trackingimg = new Image();  
    		
    		if(videoTag != null) {
				trackingimg.src = tp + "&t=" + clipname + "video" + percentage + "&cb=" + cb + "&u=" + trackingsrc + "&d=html5";
			} else {
				trackingimg.src = tp + "&t=" + clipname + "video" + percentage + "&cb=" + cb + "&u=" + trackingsrc;
			}
			reported[reportindex] = percentage;
			
		}
	};
	
	function loadHTML5VideoPlayer() {
		// Build the HTML 5 Video Tag
		videoTag = document.createElement("video");
	 JP(videoTag).attr("id","jp_html5supervideoplayer").css("width","100%").css("height","100%").attr("width","100%").attr("height","100%").attr("preload","auto").attr("data-setup","{}");
	 
	 	if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i))) {
	 		JP(videoTag).css("width","110%").css("height","110%").attr("width","110%").attr("height","110%");
	 	}
		
		var foundCodec = false;
		
		if(videoTag.canPlayType('video/mp4; codecs="avc1.42E01E"')) {
			// iPhone
			foundCodec = true;
			supportedCodec = "mp4";
		} else if(videoTag.canPlayType('video/webm; codecs="vp8"')) {
			// WebM
			foundCodec = true;
			supportedCodec = "webm";
		} else if(videoTag.canPlayType('video/ogg; codecs="theora"')) {
			// OGG
			foundCodec = true;
			supportedCodec = "ogg";
		}
		
		if(foundCodec) {
			JP(jpvideoplayer).append(videoTag);
		} else {
			supportsVideoTag = false;
			showVideoImage();
			return false;
		}
		
			
		 
		 	var autoexpand = false;
		 			 	if(stagecollapsed && !autoexpand) {			 		
		 		showVideoImage();
		 	} else {
		 		if(freqCap == 0){
				 // Show the teaser
				 	
					showTeaserVideo();
				
				}
				else{
					
					jpdVideoCookie = jpdGetCookie("jpdVideo");
					
					if(!jpdVideoCookie){
						jpdSetCookie("jpdVideo","1",freqCap/24);
						showTeaserVideo();
														
					}
					else{	
						JP("#" + shStageId).bind("stageLoaded",function() {
							setTimeout(function() { JP(document).trigger("teaserVideoEnded") }, 250);
						});
						showVideoImage();				 				
					}				 	
				}
					 
		 	}
		           
		return true;
	};
	
	function html5TimeUpdate(e) {
		var fullDuration = Math.floor(videoTag.duration);
			
        var quarter = Math.floor(fullDuration/4);
        var half = Math.floor(fullDuration/2);
        var threequarter = quarter + half;
        var full = Math.floor(fullDuration);

   		cuepoint = videoTag.currentTime;
   		
   		
		if (cuepoint >= 0 && cuepoint < quarter) {
			JP(document).trigger("videoStarted");
			
			if(activeVideo == "teaser") {
				JP(document).trigger("teaserVideoStarted");
			} else {
				JP(document).trigger("mainVideo" + (activeVideoIndex+1) + "Started");
			}
			
			reportQuartile(activeVideo, activeVideoIndex, 0, 0, true);
		} else if (cuepoint >= quarter && cuepoint < half) {
			reportQuartile(activeVideo, activeVideoIndex, 1, 25, true);
		} else if(cuepoint >= half && cuepoint < threequarter) {
			reportQuartile(activeVideo, activeVideoIndex, 2, 50, true);
		} else if(cuepoint >= threequarter && cuepoint < full) {
			reportQuartile(activeVideo, activeVideoIndex, 3, 75, true);
		}
	};
	
	function html5Ended() {
		
		if(typeof console != "undefined") {
    				console.log("TRIGGERING html5Ended for " + activeVideo);
    			}
		
		reportQuartile(activeVideo, activeVideoIndex, 4, 100, true);
    	if(activeVideo == "teaser") {
    		JP(document).trigger("teaserVideoEnded");
    		showVideoImage();
    	} else {
    			var vindex = (activeVideoIndex) ? (activeVideoIndex+1) : "";
				
				JP(document).trigger("mainVideo" + vindex + "Ended");
        		if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i))) {
        			JP(supervideoplayerclosebutton).hide();
        									JP(supervideoplayerwrapper).css("z-index","-1");
					
					JP("#supervideoplayerwrapper").css("top","0px");
					stopSuperVideo();
					showVideoImage();
					JP("#stageWrapper").show();
        		} else {
        			showVideoImage();
        		}
    	}
		
	};
	
	function setupHTML5Tracking() {
		// Clear it up
		JP(videoTag).unbind("timeupdate",html5TimeUpdate).unbind("ended",html5Ended);
		JP(videoTag).bind("timeupdate", html5TimeUpdate).bind("ended",html5Ended);
	}
	
	function loadSuperVideoPlayer() {
		
		var vp = document.getElementById("jp_supervideoplayer");
		
		if(typeof(vp) != "undefined") {
									
			var pluginconfig = { controls: null };
							            
                supervideoplayer = $f("jp_supervideoplayer",{src: 'http://ads.jetpackdigital.com/flowplayer/flowplayer.unlimited-3.2.7.swf', wmode: 'transparent', bgcolor: 'none',  border: '0'},{
            
            
                      plugins: pluginconfig,
                      playlist: svplaylist
                                            , play: {
                      		opacity: 0
                      	}
                                       }).controls("jp_supervideocontrolbar",{});
                                
                 JP("#supervideoplayer").trigger("videoPlayerLoaded");
                 
                 if(stagecollapsed) {
                 	JP("#supervideoplayer").css("top","-9999px");
                 }
                 
                  
				 	var autoexpand = false;
				 					 	if(stagecollapsed && !autoexpand) {			 		
				 		showVideoImage();
				 	} else {
				 		if(freqCap == 0){
						 // Show the teaser
													showTeaserVideo();
						  
						 				
						}
						else{
							
							jpdVideoCookie = jpdGetCookie("jpdVideo");
							
							if(!jpdVideoCookie){
								jpdSetCookie("jpdVideo","1",freqCap/24);
																	showTeaserVideo();
						 		 
																
							}
							else{	
								JP("#" + shStageId).bind("stageLoaded",function() {
									setTimeout(function() { JP(document).trigger("teaserVideoEnded") }, 250);
								});
								showVideoImage();				 				
							}				 	
						}
							 
				 	}
				                
          
			
	
		} else {
			setTimeout(loadSuperVideoPlayer,100);
		}
	};

	function createPlaylist() {
		var playlist = new Array();
		playlistNames = new Array();
		
		 
			mainVideoIndex = 1;
				
	
		 
		teaserclip = {
			autoPlay: false,
            autoBuffering: false,             	
            url: teaserVideoUrl,
            onBegin: function() {
        				
	        },
            
            onFinish: function() {          	
            	reportQuartile("teaser", 0, 4, 100, true);
            	JP(document).trigger("teaserVideoEnded");
            	showVideoImage();
            },
            
            onStart: function() {
            	
            	            		$f("jp_supervideoplayer").setVolume(0).mute();
            	            
            	var ctdiv = document.createElement("div");
           		JP(ctdiv).css("position","absolute").css("top","0px").css("left","0px").css("height","100%").css("width","100%").css("z-index","500").css("cursor","pointer").html("<object type='img/gif' style='background-color: transparent'><div style='background: transparent url(http://ads.jetpackdigital.com/tracking_pixel.gif); height: 100%; width: 100%;'></div></object>");
           		JP(ctdiv).click(function(e) { if(jpCanClickThrough()) {
							jpLockClickThrough();				
							e.stopPropagation();
							window.open(clickThroughUrl, "_blank");
						} else {
							jpReleaseClickThrough();
						}				
				});
           		 
                JP("#jp_supervideoplayer").append(ctdiv);

                          
            	var cb = Math.floor(Math.random() * 10000000000);
            
				reportQuartile("teaser", 0, 0, 0, false);

				JP(document).trigger("teaserVideoStarted");
				
				var clip = $f("jp_supervideoplayer").getClip();
				var fullDuration = Math.floor(clip.fullDuration);

            	
            	var quarter = Math.floor(fullDuration/4) * 1000;
                var half = Math.floor(fullDuration/2) * 1000;
                var threequarter = quarter + half;
                var full = (Math.floor(fullDuration)*1000) - 1000;
                
				
				var cuepoints = new Array();
				for(i = 1; i <= fullDuration; i++) {
					cuepoints[i-1] = i*1000;
				}
            
				
				
                         			    				                      				                       				
                clip.onCuepoint(
					cuepoints,
					function(clip2, cuepoint) {
						if (cuepoint >= quarter && cuepoint < half) {	
							reportQuartile("teaser", 0, 1, 25, true);					
						} else if(cuepoint >= half && cuepoint < threequarter) {
							reportQuartile("teaser", 0, 2, 50, true);
						} else if(cuepoint >= threequarter && cuepoint < full) {
							reportQuartile("teaser", 0, 3, 75, true);
						}
					}
				);
            }       		
    	};
    	
    	playlistNames["teaserclip"] = playlist.length;
    	playlist.push(teaserclip);
    	    	
    	    		    		    		    	mainVideoUrl = "http://ads.jetpackdigital.com/sites/_uploads/13433414371343341437RiseAboveConditions_15SEC.mp4";
    	
    	mainclip = {
    		autoPlay: false,
    		autoBuffering: false,
    		url: mainVideoUrl,
    		onBegin: function() {
    			supervideoplayer.setVolume(50);
    			supervideoplayer.unmute();
    			
    			            },
            
           	onFinish: function() {
    			reportQuartile("main", 0, 4, 100, true);
    			setTimeout(function() {
    				JP(document).trigger("mainVideoEnded");
            		showVideoImage();
            	}, 1000);
            },
			            onBeforeBegin: function() {
            	if(typeof videosStarted[1] == "undefined" && loadingImageUrl && loadingImageUrl != "") {
            		JP(supervideoloadingimage).show();
            	}
            },
            
           	onStart: function() {
           		if(loadingImageUrl && loadingImageUrl != "") {
           			JP(supervideoloadingimage).hide();
           			videosStarted[1] = 1;
           		}
           		
           		// Track the 0 event
           		reportQuartile("main", 0, 0, 0, false);

				JP(document).trigger("videoStarted");
				JP(document).trigger("mainVideoStarted");
							
				var clip = $f("jp_supervideoplayer").getClip();
				var fullDuration = Math.floor(clip.fullDuration);

            	
            	var quarter = Math.floor(fullDuration/4) * 1000;
                var half = Math.floor(fullDuration/2) * 1000;
                var threequarter = quarter + half;
                var full = (Math.floor(fullDuration)*1000) - 1000;
                
               			
				var cuepoints = new Array();
				for(i = 1; i <= fullDuration; i++) {
					cuepoints[i-1] = i*1000;
				}
            
				
				
                         			    				                      				                       				
                clip.onCuepoint(
					cuepoints,
					function(clip2, cuepoint) {
					
						
						if (cuepoint >= quarter && cuepoint < half) {
							reportQuartile("main", 0, 1, 25, true);
						} else if(cuepoint >= half && cuepoint < threequarter) {
							reportQuartile("main", 0, 2, 50, true);
						} else if(cuepoint >= threequarter && cuepoint < full) {
							reportQuartile("main", 0, 3, 75, true);
						}
						
					}
				);
            }
    	};
    	
    	playlistNames["mainclip"] = playlist.length;
    	playlist.push(mainclip);
    		    	    		    		    		    	    		    		    		    	    		    		    		    	    		    		    		    	    	
    	return playlist;
    	
    		};
	
	function expandTeaser() {
		if(shStageId) {
			JP("#" + shStageId).trigger("expandStage");
		}
	}
	
	function showTeaserVideo() {
		
		if(hasFlash && $f("jp_supervideoplayer")) {
		
				
					

			JP("#supervideoplayerwrapper").css("top","0px");
			JP("#jp_supervideoplayer").css("top","0px");
			//supervideoflowplayer("jp_supervideoplayer").play(0);
			if($f("jp_supervideoplayer")) {
				$f("jp_supervideoplayer").setVolume(0).mute();
				$f("jp_supervideoplayer").play(0);
			}

						
			//$f().play(0);
				} else if(supportsVideoTag) {
		
			if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i))) {
				showVideoImage();
				JP(document).trigger("teaserVideoEnded");
			} else {
								activeVideo = "teaser";
				activeVideoIndex = 0;
				var html5VideoUrl = teaserVideoUrl.replace("ads.jetpackdigital.com","h5media.jetpackdigital.com");
				if(supportedCodec == "mp4") {
					if((navigator.userAgent.match(/iPhone/i))) {
						JP(videoTag).attr("src",html5VideoUrl.replace(/\.(mp4|m4v|flv|mov)$/,".iphone.mp4"));
					} else {
						JP(videoTag).attr("src",html5VideoUrl.replace(/\.(mp4|m4v|flv|mov)$/,".mp4"));
					}
				} else if(supportedCodec == "webm") {
					JP(videoTag).attr("src",html5VideoUrl.replace(/\.(mp4|m4v|flv|mov)$/,".webm"));
				} else if(suportedCodec == "ogg") {
					JP(videoTag).attr("src",html5VideoUrl.replace(/\.(mp4|m4v|flv|mov)$/,".ogv"));
				}
				
				setupHTML5Tracking();
				document.getElementById(JP(videoTag).attr("id")).play();
			}
		} else {
			showVideoImage();
		}
		
	};
	
	function showMainVideo() {
		if(hasFlash && $f("jp_supervideoplayer")) {
			hideVideoImage();
			showingTeaser = false;
						
			$f("jp_supervideoplayer").seek(0).play(mainVideoIndex).setVolume(75).unmute();
			JP("#jp_supervideoplayer").css("top","0px");
		} else if(supportsVideoTag) {
			activeVideo = "main";
			activeVideoIndex = 0;
			
			var html5VideoUrl = mainVideoUrl.replace("ads.jetpackdigital.com","h5media.jetpackdigital.com");
			if(supportedCodec == "mp4") {
				if((navigator.userAgent.match(/iPhone/i))) {
					JP(videoTag).attr("src",html5VideoUrl.replace(/\.(mp4|m4v|flv|mov)$/,".iphone.mp4"));

				} else {
					JP(videoTag).attr("src",html5VideoUrl.replace(/\.(mp4|m4v|flv|mov)$/,".mp4"));
				}
			} else if(supportedCodec == "webm") {
				JP(videoTag).attr("src",html5VideoUrl.replace(/\.(mp4|m4v|flv|mov)$/,".webm"));
			} else if(suportedCodec == "ogg") {
				JP(videoTag).attr("src",html5VideoUrl.replace(/\.(mp4|m4v|flv|mov)$/,".ogv"));
			}
			
			hideVideoImage();

			
			if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i))) {
           		if(!JP("#stageWrapper").length) {
           			JP(".jpstage").wrapInner("<div id='stageWrapper' style='display: none'></div>");
           		} else {
           			JP("#stageWrapper").hide();
           		}
           		
           		hideVideoImage();
           		JP("#supervideoplayerwrapper").css("z-index","2000000075").css("top","0px");           		
           		JP("#jp_supervideoplayer").css("top","0px");
           		JP(supervideoplayerclosebutton).show();
            } else {
				JP("#jp_supervideoplayer").css("top","0px");
			}
			
			setupHTML5Tracking();
			document.getElementById(JP(videoTag).attr("id")).play();
		} else {
			showVideoImage();
		}
	};
	
	function playVideoByName(name) {
		if(hasFlash && $f("jp_supervideoplayer")) {
			hideVideoImage();
			
			if(name != "teaserclip") {
				showingTeaser = false; 

								videoToNormal();
				            
            }
            
			$f("jp_supervideoplayer").seek(0).play(playlistNames[name]).setVolume(75).unmute();
			JP("#jp_supervideoplayer").css("top","0px");
		} else if(supportsVideoTag) {
			hideVideoImage();
			if(name != "teaserclip") {
				showingTeaser = false; 

								videoToNormal();
								
				activeVideo = "main";
				var index = name.match(/(\d+)$/);
            	if(index == null) {
            		activeVideoIndex = 0;
            	} else {
            		activeVideoIndex = parseInt(index[1])-1;
            	}
            
            	
            } else {
            	activeVideo = "teaser";
            	activeVideoIndex = 0;
            }
            
            
			var html5VideoUrl = (eval(name)).replace("ads.jetpackdigital.com","h5media.jetpackdigital.com");
			if(supportedCodec == "mp4") {
				if((navigator.userAgent.match(/iPhone/i))) {
					JP(videoTag).attr("src",html5VideoUrl.replace(/\.(mp4|m4v|flv|mov)$/,".iphone.mp4"));
				} else {
					JP(videoTag).attr("src",html5VideoUrl.replace(/\.(mp4|m4v|flv|mov)$/,".mp4"));
				}
			} else if(supportedCodec == "webm") {
				JP(videoTag).attr("src",html5VideoUrl.replace(/\.(mp4|m4v|flv|mov)$/,".webm"));
			} else if(suportedCodec == "ogg") {
				JP(videoTag).attr("src",html5VideoUrl.replace(/\.(mp4|m4v|flv|mov)$/,".ogv"));
			}
			
			if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i))) {
           		if(!JP("#stageWrapper").length) {
           			JP(".jpstage").wrapInner("<div id='stageWrapper' style='display: none'></div>");
           		} else {
           			JP("#stageWrapper").hide();
           		}
           		
           		hideVideoImage();
           		JP("#supervideoplayerwrapper").css("z-index","2000000075").css("top","0px");           		
           		JP("#jp_supervideoplayer").css("top","0px");
           		JP(supervideoplayerclosebutton).show();
            } else {
				JP("#jp_supervideoplayer").css("top","0px");
			}
			
			setupHTML5Tracking();
			document.getElementById(JP(videoTag).attr("id")).play();
		} else {
			showVideoImage();
		}
	};
	
	function videoTo100() {
		
		if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i))) { 
			JP("#supervideoplayerwrapper").css("left","0px").css("top","0px").css("width",videowidth + "px").css("height",videoheight + "px");
		
			JP("#jp_supervideoplayer").css("width",videowidth + "px").css("height", videoheight + "px");
			JP(supervideoplayerimage).css("width",videowidth + "px").css("height",videoheight + "px");
		} else {
			JP("#supervideoplayerwrapper").css("left","0px").css("top","0px").css("width",JP(window).width() + "px").css("height",Math.round(videoheight*JP(window).width()/videowidth) + "px");
		
			JP("#jp_supervideoplayer").css("width",JP(window).width() + "px").css("height",Math.round(videoheight*JP(window).width()/videowidth) + "px");
			JP(supervideoplayerimage).css("width",JP(window).width() + "px").css("height",Math.round(videoheight*JP(window).width()/videowidth) + "px");	
		}
	};

	function videoToNormal() {
		if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i))) { 
			JP("#supervideoplayerwrapper").css("left","0px").css("top","0px").css("width",mainvideowidth + "px").css("height",mainvideoheight + "px");
		
			JP("#jp_supervideoplayer").css("width",mainvideowidth + "px").css("height", mainvideoheight + "px");
			JP(supervideoplayerimage).css("width",mainvideowidth + "px").css("height",mainvideoheight + "px");
		} else {
			var left = Math.round((JP(window).width() - mainvideowidth)/2);
			
			JP("#supervideoplayerwrapper").css("left",left + "px").css("top",mainvideotop).css("width",mainvideowidth + "px").css("height",mainvideoheight + "px");
			JP("#jp_supervideoplayer").css("width",mainvideowidth + "px").css("position","relative").css("left","0px").css("height",mainvideoheight + "px");
			JP(supervideoplayerimage).css("width",mainvideowidth + "px").css("position","relative").css("left","0px").css("height",mainvideoheight + "px");
		}
	};
	
	function showVideoImage() {
		try {
			hiddenVideoImage = false;
						JP(supervideoplayerimage).show().css("z-index","1");
			//JP(supervideoplayerwrapper).css("background","transparent url(" + videoImageUrl + ") no-repeat");
			JP("#jp_supervideoplayer").css("top","-9999px");
		} catch(ex) {
			// Image not ready
		}
	};
	
	function hideVideoImage() {
		hiddenVideoImage = true;
		JP(supervideoplayerimage).hide().css("z-index","-1");
		//JP(supervideoplayerwrapper).css("background","none");
		
	};
	

	function stopSuperVideo() {
	
		if(hasFlash && $f("jp_supervideoplayer")) {
			//$f().stop();
			$f("jp_supervideoplayer").stop();
		} else if(supportsVideoTag) {
			document.getElementById(JP(videoTag).attr("id")).pause();
		}
		showVideoImage();
	}
	
	this.Init = function() {
		JP("#jpsuperheader").html("");
       	JP("#supervideoplayerwrapper").html("");
       	

		if(jpsuperheader) return;
		
		// Make sure that the page is correct
			
		jpsupervideo = true;
		jpsuperheader = true;
		this.runnable = true;
		
				
									
							
				
				
				JP(document).click(function(e) {
					e = e || event;
    				var target = e.srcElement || e.target;
    				
    				
    				if(e.isPropagationStopped()) {
    					return;
    				}
        			
    									
					var pos = JP(supervideoplayerwrapper).offset();
					var width = JP(supervideoplayerwrapper).width();
					var height = JP(supervideoplayerwrapper).height();
					
					var left = pos.left;
					var right = pos.left + width;
					var top = pos.top;
					var bottom = pos.top + height;
										
					var posx = 0;
					var posy = 0;
						
					if (e.pageX || e.pageY) {
						posx = e.pageX;
						posy = e.pageY;
					} else if (e.clientX || e.clientY) 	{
						posx = e.clientX;
						posy = e.clientY;
					}
										    			
					if((typeof target != "undefined" && typeof target.id != "undefined") && (target.id.toLowerCase() == 'body' || target.tagName.toLowerCase() == 'body') && posx <= right && posx >= left && posy >= top && posy <= bottom) {	
						if(jpCanClickThrough()) {
							jpLockClickThrough();				
							e.stopPropagation();
							window.open(clickThroughUrl, "_blank");
						} else {
							jpReleaseClickThrough();
						}				
					}
										
				});	

									
										
			},
	
	CheckForBody_6351 = function() {

					parentElement = ".network-bar-shadow";
				
		
		if(JP(parentElement).length > 0) {
        	if(!jpBodyLoaded) {
        		        	
				
				var overflow = "";
				if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i))) {
					overflow = "overflow: hidden;";
				}
			
        		        			JP("<div id='jpsuperheader' style='height: auto; width: 850px; position: relative; margin: 0 auto;" + overflow + "'><style type='text/css'>#jpsuperheader{width: 995px !important; overflow: visible !important; z-index: 2 !important; } #jpsuperheader > .jpstage { overflow: visible !important; } .container { z-index: 3 !important; position: relative !important; } #network_bar{z-index: 300000000 !important;}.footer1, .footer2{width: 995px !important; margin: 0 auto !important;} #newsletter-slide{display: none !important;}</style></div>").insertAfter(".network-bar-shadow");
        		        		
        		
        		 

				
        		            	
            	        		
        		JP(document).bind("showMainVideo",function() {
        			stopSuperVideo();
        			showMainVideo();
        		});
        		
       			JP(document).bind("playVideoByName",function(event, name) {
        			stopSuperVideo();
        			playVideoByName(name);
        		});
            }
            
          
            this.RunCustomUnitSuperVideo_6351();
            jpBodyLoaded = true;
            
        } else {
        	setTimeout("CheckForBody_6351()",100);			
     	}
		
	},



	// Run the clickable skin unit
	this.Run =  function() {
	
		if(!this.runnable) return;
		
		// Make sure there are no other superheaders on the page
       	JP("#jpsuperheader").html("");
       	JP("#supervideoplayerwrapper").html("");
		
				
		this.running = true;
		
				
										
			
			origflowplayer = null;
			
			// Load the video player
			if(1 || typeof flowplayer == "undefined") {
				JP.getScript("http://ads.jetpackdigital.com/flowplayer/flowplayer-3.2.6.min.js", function(){
					//supervideoflowplayer = flowplayer;
					JP.getScript("http://ads.jetpackdigital.com/flowplayer/flowplayer.controls-3.0.2.min.js", function(){
						setTimeout("CheckForBody_6351()",100);
					});
				});			
			} else {
				//supervideoflowplayer = flowplayer;
				JP.getScript("http://ads.jetpackdigital.com/flowplayer/flowplayer.controls-3.0.2.min.js", function(){
					setTimeout("CheckForBody_6351()",100);
				});
			}

			
			
						
									
				
				
	},
	
	RunCustomUnitSuperVideo_6351 = function() {
				
				
stagecollapsed = false; 



var jpLayers_stage_c3c44e1152ae11025ad03ff47b35fc9e = new Array();
			jpLayers_stage_c3c44e1152ae11025ad03ff47b35fc9e.push("default");
	
var jpLayers_stage_c3c44e1152ae11025ad03ff47b35fc9eDepth = new Array();


if(typeof jpVars == "undefined") {
	jpVars = {};
}

if(typeof jpGetAttributes == "undefined") {
	jpGetAttributes = function(config,video) {
		var jpAttributes = new Array();
		if(config.stagestate) {
			var ss = [];
			if(typeof config.stagestate == "string") {
				ss = config.stagestate.split(",");
			} else if(typeof config.stagestate == "object" || typeof config.stagestate == "array") {
				ss = config.stagestate;
			}
	
			for(var i = 0; i < ss.length; i++) {
				if(config[ss[i] + " Height"]) {
					jpAttributes[ss[i] + " Height"] = config[ss[i] + " Height"];
				}
				if(config[ss[i] + " Width"]) {
					jpAttributes[ss[i] + " Width"] = config[ss[i] + " Width"];
				}
				if(config[ss[i] + " Top"]) {
					jpAttributes[ss[i] + " Top"] = config[ss[i] + " Top"];
				}
				if(config[ss[i] + " Left"]) {
					jpAttributes[ss[i] + " Left"] = config[ss[i] + " Left"];
				}
			}
			
			if(!jpAttributes["Normal Height"]) {
				jpAttributes["Normal Height"] = config["height"];
			}
			
			if(!jpAttributes["Normal Width"]) {
				jpAttributes["Normal Width"] = config["width"];
			}
			
			if(!jpAttributes["Normal Top"]) {
				jpAttributes["Normal Top"] = config["top"];
			}
			
			if(!jpAttributes["Normal Left"]) {
				jpAttributes["Normal Left"] = config["left"];
			}
	
		}
		
		return jpAttributes;

	};
};

if(typeof jpGetStageStates == "undefined") {
	jpGetStageStates = function(config,video) {
		stagestate = "jp_all";
		if(config.stagestate) {
			var ss = [];
			if(typeof config.stagestate == "string") {
				ss = config.stagestate.split(",");
			} else if(typeof config.stagestate == "object" || typeof config.stagestate == "array") {
				ss = config.stagestate;
			}
	
			for(var i = 0; i < ss.length; i++) {	
				if(video) {		
					stagestate += " jp_vw" + ss[i].toLowerCase();
				} else {
					stagestate += " jp_" + ss[i].toLowerCase();
				}
			}

		}
		
		return stagestate;
	};
};

var Stage_stage_c3c44e1152ae11025ad03ff47b35fc9e = function() {
	
	var rawConfig = '{\"title\":\"Nike Jordan SuperVideo - Sbnation 2\",\"stagetype\":\"Normal\",\"width\":\"1200px\",\"height\":\"250px\",\"multiplane\":\"false\",\"followcursor\":\"false\",\"autostate\":\"false\",\"backgroundColor\":\"transparent\",\"backgroundImage2_url\":\"http:\\/\\/ads.jetpackdigital.com\\/sites\\/_uploads\\/13412792361341279236NIKE_40PIX_BAR_81.png\",\"backgroundImage2\":\"NIKE_40PIX_BAR_81\",\"backgroundColor2\":\"transparent\",\"backgroundColor3\":\"transparent\",\"autoexpandbutton\":\"false\",\"remembercollapsed\":\"true\",\"startcollapsed\":\"false\",\"collapsedheight\":\"66px\",\"collapsetime\":\"250\",\"normalheight\":\"250px\",\"expandedheight\":\"667px\",\"collapsedbackground\":\"background2\",\"normalbackground\":\"background1\",\"expandedbackground\":\"background3\"}';
	var config = eval("(" + rawConfig + ")");
	var origconfig = null;
	
	origconfig = config;
	config = jpGetDatedConfig(config);
	this.conf = config;
	
	var element = null;
	
	var id = "stage_c3c44e1152ae11025ad03ff47b35fc9e";
	this.id = id;
	var stage_id = "#stage_c3c44e1152ae11025ad03ff47b35fc9e";
		
	var stylecss = "";

	var backgroundImage =  config.backgroundImage_url;
	var backgroundImage2 = config.backgroundImage2_url;
	var backgroundImage3 = config.backgroundImage3_url;
	var backgroundImage4 = config.backgroundImage4_url;
	var backgroundImage5 = config.backgroundImage5_url;
	var backgroundImage6 = config.backgroundImage6_url;
	var backgroundImage7 = config.backgroundImage7_url;
	var backgroundImage8 = config.backgroundImage8_url;
	
	var backgroundColor = (config.backgroundColor) ? config.backgroundColor: "#ffffff";
	var backgroundColor2 = (config.backgroundColor2) ? config.backgroundColor2: "#ffffff";
	var backgroundColor3 = (config.backgroundColor3) ? config.backgroundColor3: "#ffffff";
	var backgroundColor4 = (config.backgroundColor4) ? config.backgroundColor4: "#ffffff";
	var backgroundColor5 = (config.backgroundColor5) ? config.backgroundColor5: "#ffffff";
	var backgroundColor6 = (config.backgroundColor6) ? config.backgroundColor6: "#ffffff";
	var backgroundColor7 = (config.backgroundColor7) ? config.backgroundColor7: "#ffffff";
	var backgroundColor8 = (config.backgroundColor8) ? config.backgroundColor8: "#ffffff";
	
	var currentBackground = null;
	
	var collapsed = false;
	this.collapsed = false;
	var collapsing = false;
	
	var collapsedDiv = null;
	
	var animatebody = (config.animatebody=="false" || !config.animatebody) ? false : true;
	
	var config = config;
	
	this.stylecss = "";

	var jpentrypoint = -1;
	var jplastexitpoint = 0;
	var jpmousedover = false;
	
	if(config.multiplane && config.multiplane == "true") {
		if(config.followcursor && config.followcursor == "true") {
			JP(window).mousemove(function(e) {
				var elem = JP("#" + e.target.id);
				if(e.target.id == "stage_c3c44e1152ae11025ad03ff47b35fc9e" || JP(elem).parent().attr("id") == "stage_c3c44e1152ae11025ad03ff47b35fc9e" || JP("#" + e.target.id).hasClass("jppanel") || JP("#" + JP(elem).parent().attr("id")).hasClass("jppanel")) {	
				jpmousedover = true;
				var scrollTop = e.pageY;
				if(jpentrypoint == -1) {
					jpentrypoint = scrollTop - jplastexitpoint;
					jplastexitpoint = 0;
				}

				scrollTop = scrollTop - jpentrypoint;
				var windowHeight = JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").height();
				var offset = scrollTop/windowHeight;
				for(var i = 0; i < jpLayers_stage_c3c44e1152ae11025ad03ff47b35fc9e.length; i++) {
					if(jpLayers_stage_c3c44e1152ae11025ad03ff47b35fc9e[i] == "default") {
						continue;
					}
					
					JP(".jp_" + jpLayers_stage_c3c44e1152ae11025ad03ff47b35fc9e[i]).each(function() {
						if(!JP(this).attr("toppos")) {
							JP(this).attr("toppos", JP(this).css("top"));
						}
						
						if(!JP(this).attr("leftpos")) {
							JP(this).attr("leftpos", JP(this).css("left"));
						}
						
						var depth = 0;
						if(jpLayers_stage_c3c44e1152ae11025ad03ff47b35fc9eDepth[jpLayers_stage_c3c44e1152ae11025ad03ff47b35fc9e[i]]) {
							depth = jpLayers_stage_c3c44e1152ae11025ad03ff47b35fc9eDepth[jpLayers_stage_c3c44e1152ae11025ad03ff47b35fc9e[i]];
						}
						
						if(depth == 0) {
							return;
						}
						
						if(depth == "static") {
							//var stageOffset = JP(stage_id).offset();
							var parent_id = "#" + JP(this).parent().attr("id");
							var stageOffset = JP(parent_id).offset();
							var toppos = parseInt(JP(this).attr("toppos").replace("px",""));
							var leftpos = parseInt(JP(this).attr("leftpos").replace("px"));
							var newleftposition = stageOffset.left + leftpos;
							var newtopposition = stageOffset.top + toppos;
							JP(this).css("position","fixed").css("left",newleftposition).css("top",newtopposition); 
						} else {				
										
							var parent_id = "#" + JP(this).parent().attr("id");
							var stageOffset = JP(parent_id).offset();
							
							var elemoffset = depth * offset;
							var position = parseInt(JP(this).attr("toppos").replace("px",""));
							var toppos = parseInt(JP(this).attr("toppos").replace("px",""));
							var leftpos = parseInt(JP(this).attr("leftpos").replace("px"));
							var newleftposition = stageOffset.left + leftpos;
							var newtopposition = stageOffset.top + toppos;
							
							var newposition = (stageOffset.top + position) + (scrollTop/windowHeight) * depth;
							
							if(jpLayers_stage_c3c44e1152ae11025ad03ff47b35fc9e[i] == "NewLayer") {
								JP(this).attr("toppos").replace("px","");
							}

							
							JP(this).css("position","fixed").css("top",newposition + "px").css("left",newleftposition);
						}
					});
				}
				} else {
					if(jpentrypoint > -1 && jpmousedover && jplastexitpoint == 0) {
						jplastexitpoint = e.pageY - jpentrypoint;
					}
					jpentrypoint = -1;
				}

			});
		} else {
			JP(window).scroll(function(e) {
				var scrollTop = JP(window).scrollTop();
				var windowHeight = JP(window).height();
				var offset = scrollTop/windowHeight;
				for(var i = 0; i < jpLayers_stage_c3c44e1152ae11025ad03ff47b35fc9e.length; i++) {
					if(jpLayers_stage_c3c44e1152ae11025ad03ff47b35fc9e[i] == "default") {
						continue;
					}
					
					JP(".jp_" + jpLayers_stage_c3c44e1152ae11025ad03ff47b35fc9e[i]).each(function() {
						if(!JP(this).attr("toppos")) {
							JP(this).attr("toppos", JP(this).css("top"));
						}
						
						if(!JP(this).attr("leftpos")) {
							JP(this).attr("leftpos", JP(this).css("left"));
						}
						
						var depth = 0;
						if(jpLayers_stage_c3c44e1152ae11025ad03ff47b35fc9eDepth[jpLayers_stage_c3c44e1152ae11025ad03ff47b35fc9e[i]]) {
							depth = jpLayers_stage_c3c44e1152ae11025ad03ff47b35fc9eDepth[jpLayers_stage_c3c44e1152ae11025ad03ff47b35fc9e[i]];
						}
						
						if(depth == 0) {
							return;
						}
						
						if(depth == "static") {
							var parent_id = "#" + JP(this).parent().attr("id");
							var stageOffset = JP(parent_id).offset();
							//var stageOffset = JP(stage_id).offset();
							var toppos = parseInt(JP(this).attr("toppos").replace("px",""));
							var leftpos = parseInt(JP(this).attr("leftpos").replace("px"));
							var newleftposition = stageOffset.left + leftpos;
							var newtopposition = stageOffset.top + toppos;
							var parentOffset = newleftpos - stageOffset.left;
							JP(this).css("position","fixed").attr("parentoffset",parentOffset).css("left",newleftposition).css("top",newtopposition); 
						} else {				
										
							//var stageOffset = JP(stage_id).offset();
							var parent_id = "#" + JP(this).parent().attr("id");
							var stageOffset = JP(parent_id).offset();
							
							var scrollTop = JP(document).scrollTop();
							var windowHeight = JP(document).height();
							var offset = scrollTop/windowHeight;
							
							//var elemoffset = Math.round(JP(this).height()/depth * offset); 
							var elemoffset = depth * offset;
							var position = parseInt(JP(this).attr("toppos").replace("px",""));
							
							var toppos = parseInt(JP(this).attr("toppos").replace("px",""));
							var leftpos = parseInt(JP(this).attr("leftpos").replace("px"));
							var newleftposition = stageOffset.left + leftpos;
							var newtopposition = stageOffset.top + toppos;
							
							var newposition = (stageOffset.top + position) + (scrollTop/windowHeight) * depth;
							
							if(jpLayers_stage_c3c44e1152ae11025ad03ff47b35fc9e[i] == "NewLayer") {
								JP(this).attr("toppos").replace("px","");
							}
							
							var parentOffset = newleftposition - stageOffset.left;
							
							JP(this).css("position","fixed").attr("parentoffset",parentOffset).css("top",newposition + "px").css("left",newleftposition);
						}
					});
				}
			});
			
			
			
			JP(window).resize(function() {
				for(var i = 0; i < jpLayers_stage_c3c44e1152ae11025ad03ff47b35fc9e.length; i++) {
					if(jpLayers_stage_c3c44e1152ae11025ad03ff47b35fc9e[i] == "default") {
						continue;
					}

					JP(".jp_" + jpLayers_stage_c3c44e1152ae11025ad03ff47b35fc9e[i]).each(function() {
						var parent_id = "#" + JP(this).parent().attr("id");
						var stageOffset = JP(parent_id).offset();
						var left = stageOffset.left + parseInt(JP(this).attr("parentoffset"));
						if(typeof(left)=='number'&&parseInt(left)==left) {
							JP(this).css("left",left + "px");
						}
					});
				}

			});
		}
	}
	
	var trackingEvents = new Array();
	
	var track = function(eventName) {
		//if(!trackingEvents[eventName]) {
			var trackingpixel = "http://ads.jetpackdigital.com/tracking_pixel.gif?[random]";
                        	 
             var cb = Math.floor(Math.random() * 10000000000);
        	var trackingsrc =trackingpixel.replace("[random]",ord);
       		var trackingimg = new Image();
        	if(typeof tp != "undefined") {
        		trackingimg.src = tp + "&t=" + eventName + "&cb=" + cb + "&u=" + trackingsrc;
			}
			trackingEvents[eventName] = true;
		//}
	};
	
	if(typeof jpTrack == "undefined") {
		jpTrack = function(eventName, force) {
			if(!trackingEvents[eventName] || force) {
				var trackingpixel = "http://ads.jetpackdigital.com/tracking_pixel.gif?" + Math.floor(Math.random() * 99999999999);
                        	 
        		var trackingsrc =trackingpixel.replace("[random]");
       			var trackingimg = new Image();
       		 	trackingimg.src = tp + "&t=" + eventName + "&u=" + trackingsrc;
				trackingEvents[eventName] = true;
			}
		}
	};
	
	if(typeof jpOpenLink == "undefined") {
		jpOpenLink = function(eventName, url) {
			window.open(tp + "&t=" + eventName + "&u=" + url, "_blank");
		}
	};


	var toExpandedHeight = function() {
		if(!config.expandedheight) {
			return;
		}
		
		var collapseTime = config.collapsetime;
		
		if(!collapsing) {
			JP(element).trigger("stageOpening"); 
			JP(element).removeClass("background1").removeClass("background2").removeClass("background3").removeClass("background4").removeClass("background5").removeClass("background6").removeClass("background7").removeClass("background8"); 
			if(config.expandedbackground) {
				JP(element).addClass(config.expandedbackground);
			} 
			JP(element).animate({height: config.expandedheight},collapseTime, function() { 
				
				if(animatebody) { 
					JP("body").css("background-position","center " + config.expandedheight);
				}

				JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").trigger("stageExpandedLarge");					
				track("OpenToExpanded");
			}); 
			
						
				JP(".jp_normal").each(function() { JP(this).hide(); });
			    JP(".jp_collapsed").each(function() { JP(this).hide(); });

				JP(".jp_expanded").each(function() {
					if(JP(this).attr("expanded_top")) {
			    		JP(this).css("top",JP(this).attr("expanded_top"));
			    	} 
			    	
			    	if(JP(this).attr("expanded_height")) {
			    		JP(this).css("height",JP(this).attr("expanded_height"));
			    	} 
			    	
			    	if(JP(this).attr("expanded_left")) {
			    		JP(this).css("left",JP(this).attr("expanded_left"));
			    	} 
			    	
			    	if(JP(this).attr("expanded_width")) {
			    		JP(this).css("width",JP(this).attr("expanded_width"));
			    	} 
 
					JP(this).show(); 
				});
			    
			    			    
			    JP(".jp_vwnormal").each(function() { JP(this).css("top","-9999px") });
			    JP(".jp_vwcollapsed").each(function() { JP(this).css("top","-9999px") });

			    JP(".jp_vwexpanded").each(function() { 
			    	JP(this).css("top","0px");
			    	if(JP(this).attr("expanded_top")) {
			    		JP(this).css("top",JP(this).attr("expanded_top"));
			    	} 
			    	
			    	if(JP(this).attr("expanded_height")) {
			    		JP(this).css("height",JP(this).attr("expanded_height"));
			    	} 
			    	
			    	if(JP(this).attr("expanded_left")) {
			    		JP(this).css("left",JP(this).attr("expanded_left"));
			    	} 
			    	
			    	if(JP(this).attr("expanded_width")) {
			    		JP(this).css("width",JP(this).attr("expanded_width"));
			    	} 
			    });
			
			collapsed=false; 
			jpdSetCookie(stage_id.replace("#","") + "_c","0",1,"/"); 
			
			
		} else { 
			collapsing = false; 
		}
		

	};
	this.toExpandedHeight = toExpandedHeight;
	
	var toExpandedWidth = function(w, l, t) {
		if(!w || !l || !t) {
			return;
		}
	
		JP(element).trigger("stageWidthExpanding"); 
		JP(element).removeClass("background1").removeClass("background2").removeClass("background3").removeClass("background4").removeClass("background5").removeClass("background6").removeClass("background7").removeClass("background8"); 
		if(config.expandedbackground) {
			JP(element).addClass(config.expandedbackground);
		} 
		JP(element).animate({width: w, left: l},t, function() { 

			JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").trigger("stageWidthExpanded");					
			track("StageWidthExpanded");
		}); 
		
		    JP(".jp_normal").each(function() { JP(this).hide(); });
		    JP(".jp_collapsed").each(function() { JP(this).hide(); });
			JP(".jp_expanded").each(function() {
				if(JP(this).attr("expanded_top")) {
		    		JP(this).css("top",JP(this).attr("expanded_top"));
		    	} 
		    	
		    	if(JP(this).attr("expanded_height")) {
		    		JP(this).css("height",JP(this).attr("expanded_height"));
		    	} 
		    	
		    	if(JP(this).attr("expanded_left")) {
		    		JP(this).css("left",JP(this).attr("expanded_left"));
		    	} 
		    	
		    	if(JP(this).attr("expanded_width")) {
		    		JP(this).css("width",JP(this).attr("expanded_width"));
		    	} 
				JP(this).show(); 
			});
		    
		   
		    
		    JP(".jp_vwnormal").each(function() { JP(this).css("top","-9999px") });
		    JP(".jp_vwcollapsed").each(function() { JP(this).css("top","-9999px") });
		    JP(".jp_vwexpanded").each(function() { 
		    	JP(this).css("top","0px");
		    	if(JP(this).attr("expanded_top")) {
		    		JP(this).css("top",JP(this).attr("expanded_top"));
		    	} 
		    	
		    	if(JP(this).attr("expanded_height")) {
		    		JP(this).css("height",JP(this).attr("expanded_height"));
		    	} 
		    	
		    	if(JP(this).attr("expanded_left")) {
		    		JP(this).css("left",JP(this).attr("expanded_left"));
		    	} 
		    	
		    	if(JP(this).attr("expanded_width")) {
		    		JP(this).css("width",JP(this).attr("expanded_width"));
		    	} 
		    });
		    
		    

	
	};
	this.toExpandedWidth = toExpandedWidth;

	
	var toNormalHeight = function() {
		if(!config.normalheight) {
			config.normalheight = config.height;
		}
		
		if(!config.normalbackground && !currentBackground) {
			config.normalbackground = "background1";
		} else if(currentBackground != null) {
			config.normalbackground = currentBackground;
		}
		
		var collapseTime = (config.collapsetime) ? config.collapsetime : 250;
		
		if(!collapsing) {
			JP(element).trigger("stageOpening");
			
			if(config.normalbackground) {
				JP(element).removeClass("background1").removeClass("background2").removeClass("background3").removeClass("background4").removeClass("background5").removeClass("background6").removeClass("background7").removeClass("background8");
				JP(element).addClass(config.normalbackground);
			}  
			
			JP(element).animate({height: config.normalheight}, collapseTime, function() {  
				if(animatebody) { 
					JP("body").css("background-position","center " + config.normalheight);
				} 
			
				collapsed = false;  
				this.collapsed = false;  
				collapsing = false; 
			
				JP(element).removeClass("background1").removeClass("background2").removeClass("background3").removeClass("background4").removeClass("background5").removeClass("background6").removeClass("background7").removeClass("background8");
				
				if(config.normalbackground) {
					JP(element).addClass(config.normalbackground);
				} 
			    
			    	
				
				JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").trigger("stageExpandedNormal");
				track("OpenToNormal");
				if(typeof activeAutoExpand == "undefined" || !activeAutoExpand) { 
					jpdSetCookie(stage_id.replace("#","") + "_c","0",1,"/"); 
				} else {
					activeAutoExpand = false;
				}
			});
			
			JP(".jp_expanded").each(function() { JP(this).hide(); });
			JP(".jp_collapsed").each(function() { JP(this).hide(); });
			JP(".jp_normal").each(function() {
				if(JP(this).attr("normal_top")) {
		    		JP(this).css("top",JP(this).attr("normal_top"));
		    	} 
		    	
		    	if(JP(this).attr("normal_height")) {
		    		JP(this).css("height",JP(this).attr("normal_height"));
		    	} 
		    	
		    	if(JP(this).attr("normal_left")) {
		    		JP(this).css("left",JP(this).attr("normal_left"));
		    	} 
		    	
		    	if(JP(this).attr("normal_width")) {
		    		JP(this).css("width",JP(this).attr("normal_width"));
		    	} 

				JP(this).show(); 
			});
		    
		    JP(".jp_vwexpanded").each(function() { JP(this).css("top","-9999px"); });
			JP(".jp_vwcollapsed").each(function() { JP(this).css("top","-9999px") });		    

		    JP(".jp_vwnormal").each(function() { 
		    	JP(this).css("top","0px");
		    	if(JP(this).attr("normal_top")) {
		    		JP(this).css("top",JP(this).attr("normal_top"));
		    	} 
		    	
		    	if(JP(this).attr("normal_height")) {
		    		JP(this).css("height",JP(this).attr("normal_height"));
		    	} 
		    	
		    	if(JP(this).attr("normal_left")) {
		    		JP(this).css("left",JP(this).attr("normal_left"));
		    	} 
		    	
		    	if(JP(this).attr("normal_width")) {
		    		JP(this).css("width",JP(this).attr("normal_width"));
		    	} 
		    });
			
			
		} else { 
			collapsing = false; 
		}
		
	};
	this.toNormalHeight = toNormalHeight;
	
	var toNormalWidth = function(w,l,t) {
		if(!w || !l || !t) {
			return;
		}
		
		if(!config.normalbackground && !currentBackground) {
			config.normalbackground = "background1";
		} else if(currentBackground != null) {
			config.normalbackground = currentBackground;
		}
		
		JP(element).trigger("stageOpening");
		
		if(config.normalbackground) {
			JP(element).removeClass("background1").removeClass("background2").removeClass("background3").removeClass("background4").removeClass("background5").removeClass("background6").removeClass("background7").removeClass("background8");
			JP(element).addClass(config.normalbackground);
		}  
		
		JP(element).animate({width: w, left: l}, t, function() {  
			if(animatebody) { 
				JP("body").css("background-position","center " + config.normalheight);
			} 
		
			collapsed = false;  
			this.collapsed = false;  
			collapsing = false; 
		
			JP(element).removeClass("background1").removeClass("background2").removeClass("background3").removeClass("background4").removeClass("background5").removeClass("background6").removeClass("background7").removeClass("background8");
			
			if(config.normalbackground) {
				JP(element).addClass(config.normalbackground);
			} 
		    
		    	
			
			JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").trigger("stageExpandedNormal");
			track("OpenToNormal");
			if(typeof activeAutoExpand == "undefined" || !activeAutoExpand) { 
				jpdSetCookie(stage_id.replace("#","") + "_c","0",1,"/"); 
			} else {
				activeAutoExpand = false;
			}
		});
		
		JP(".jp_expanded").each(function() { JP(this).hide(); });
		JP(".jp_collapsed").each(function() { JP(this).hide(); });
		JP(".jp_normal").each(function() {
			if(JP(this).attr("normal_top")) {
	    		JP(this).css("top",JP(this).attr("normal_top"));
	    	} 
	    	
	    	if(JP(this).attr("normal_height")) {
	    		JP(this).css("height",JP(this).attr("normal_height"));
	    	} 
	    	
	    	if(JP(this).attr("normal_left")) {
	    		JP(this).css("left",JP(this).attr("normal_left"));
	    	} 
	    	
	    	if(JP(this).attr("normal_width")) {
	    		JP(this).css("width",JP(this).attr("normal_width"));
	    	} 

			JP(this).show(); 
		});
	    
	    JP(".jp_vwexpanded").each(function() { JP(this).css("top","-9999px"); });
		JP(".jp_vwcollapsed").each(function() { JP(this).css("top","-9999px") });		    

	    JP(".jp_vwnormal").each(function() { 
	    	JP(this).css("top","0px");
	    	if(JP(this).attr("normal_top")) {
	    		JP(this).css("top",JP(this).attr("normal_top"));
	    	} 
	    	
	    	if(JP(this).attr("normal_height")) {
	    		JP(this).css("height",JP(this).attr("normal_height"));
	    	} 
	    	
	    	if(JP(this).attr("normal_left")) {
	    		JP(this).css("left",JP(this).attr("normal_left"));
	    	} 
	    	
	    	if(JP(this).attr("normal_width")) {
	    		JP(this).css("width",JP(this).attr("normal_width"));
	    	} 
	    });
		
	};
	this.toNormalWidth = toNormalWidth;
	
	var toCollapsedHeight = function() {
		if(!config.collapsedheight) {
			config.collapsedheight = "40px";
		}
		
		var collapseTime = (config.collapsetime) ? config.collapsetime : 250;
		jpdSetCookie(stage_id.replace("#","") + "_c","1",1,"/");collapsing = true; 
		JP(element).animate({height: config.collapsedheight}, collapseTime, function() {  
			if(animatebody) { 
				JP("body").css("background-position","center " + config.collapsedheight);
			} 
			
			collapsed = true;  
			this.collapsed = true;  
			collapsing = false; 
			
			JP(element).removeClass("background1").removeClass("background2").removeClass("background3").removeClass("background4").removeClass("background5").removeClass("background6").removeClass("background7").removeClass("background8");
			if(config.collapsedbackground) {
				JP(element).addClass(config.collapsedbackground);
			} 
					    
			

			JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").trigger("stageCollapsed");
			
			JP(collapsedDiv).show();
			
			track("CloseToCollapsed");
		});
		
		JP(".jp_expanded").each(function() { JP(this).hide(); });
		JP(".jp_normal").each(function() { JP(this).hide(); });
		JP(".jp_collapsed").each(function() {
			if(JP(this).attr("collapsed_top")) {
	    		JP(this).css("top",JP(this).attr("collapsed_top"));
	    	} 
	    	
	    	if(JP(this).attr("collapsed_height")) {
	    		JP(this).css("height",JP(this).attr("collapsed_height"));
	    	} 
	    	
	    	if(JP(this).attr("collapsed_left")) {
	    		JP(this).css("left",JP(this).attr("expanded_left"));
	    	} 
	    	
	    	if(JP(this).attr("collapsed_width")) {
	    		JP(this).css("width",JP(this).attr("collapsed_width"));
	    	} 

			JP(this).show(); 
		});
	    
	    JP(".jp_vwexpanded").each(function() { JP(this).css("top","-9999px"); });
		JP(".jp_vwnormal").each(function() { JP(this).css("top","-9999px") });		    

	    JP(".jp_vwcollapsed").each(function() { 
	    	JP(this).css("top","0px");
	    	if(JP(this).attr("collapsed_top")) {
	    		JP(this).css("top",JP(this).attr("collapsed_top"));
	    	} 
	    	
	    	if(JP(this).attr("collapsed_height")) {
	    		JP(this).css("height",JP(this).attr("collapsed_height"));
	    	} 
	    	
	    	if(JP(this).attr("collapsed_left")) {
	    		JP(this).css("left",JP(this).attr("collapsed_left"));
	    	} 
	    	
	    	if(JP(this).attr("collapsed_width")) {
	    		JP(this).css("width",JP(this).attr("collapsed_width"));
	    	} 
	    });		

	};
	this.toCollapsedHeight = toCollapsedHeight;
	
	var swapBackgroundImage = function(image_id) {
		var url = config[image_id + "_url"];
		JP(element).css("background","transparent url(" + url + ") no-repeat");
		JP(element).removeClass("background1").removeClass("background2").removeClass("background3").removeClass("background4").removeClass("background5").removeClass("background6").removeClass("background7").removeClass("background8");

	};
	
	this.drawStyleSheet = function() {
        var style = document.createElement( 'style' );
        style.type = 'text/css';
        style.id = "style_stage_c3c44e1152ae11025ad03ff47b35fc9e";
		
        if( style.styleSheet )  // IE
                style.styleSheet.cssText = this.stylecss;
        else  // other browsers
                style.appendChild( document.createTextNode(this.stylecss) );

        var head = document.getElementsByTagName('head')[0];
        head.appendChild( style );
    };

	var trigger = function(event) {
		JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").trigger(event);
	};
	
	this.updateStyleSheet = function(stylecss) {
    	this.stylecss += stylecss;
    };

	this.drawElement = function(targetElement) {
		if(config.includescroller == "true") {
			JP.getScript("http://ads.jetpackdigital.com/jquery.scroller.js",function(){});
		} 
		
		this.stage = document.createElement("div");
		this.stage.id = id;
		JP(this.stage).css("position","relative");
		
		
		
		if(config.normalheight) {
			config.height = config.normalheight;
		}
		
		var startcollapsed = (config.startcollapsed && config.startcollapsed == "true") ? true : false;
		if(config.expandedfrequencyper24 && config.expandedfrequencyper24 > 0) {
			var showExpanded = jpdGetCookie("stage_c3c44e1152ae11025ad03ff47b35fc9e_e");
			if(!showExpanded) {
				startcollapsed = false;
				var exp = 1/(parseInt(config.expandedfrequencyper24));
				jpdSetCookie("stage_c3c44e1152ae11025ad03ff47b35fc9e_e","1",exp,"/");
			} 
		}
		
		if(typeof overrideStageState == "undefined" || overrideStageState == null) {
			if(0) {
				overrideStageState = "collapsed";
			} else {
				overrideStageState = "normal";
			}
		}	
		
		if(overrideStageState == "collapsed" || startcollapsed || (config.remembercollapsed == "true" && jpdGetCookie("stage_c3c44e1152ae11025ad03ff47b35fc9e_c") == "1")) {
			JP(this.stage).css("height",config.collapsedheight);
			JP(this.stage).attr("class",config.collapsedbackground);
			collapsed = true;
			this.collapsed = true;
			stagecollapsed = true;
			jpdSetCookie("stage_c3c44e1152ae11025ad03ff47b35fc9e_c","1",1,"/");
		} else {
			JP(this.stage).css("height",config.height);
			JP(this.stage).attr("class","background1");
			this.collapsed = false;
			collapsed = false;
			stagecollapsed = false;
		}
		
		JP(this.stage).addClass("jpstage");
		
		JP(this.stage).css("width",config.width);
		
		if(backgroundColor) {
			JP(this.stage).css("background-color",backgroundColor);
		}
		
		if(backgroundImage) {
			JP(this.stage).css("background-image","url(" + backgroundImage +")");
		}

		if(config.overflow) {
			JP(this.stage).css("overflow",config.overflow);
		} else {
			JP(this.stage).css("overflow","hidden");
		}
		
		JP(this.stage).css("font-size","10px");
		JP(this.stage).css("z-index","888888");
		
		if(config.margin) {
			JP(this.stage).css("margin",config.margin);
		}
		
		if(config.zIndex) {
			JP(this.stage).css("z-index",config.zIndex);
		}
		
		element = this.stage;
		
		// Add the collapsed element 
		collapsedDiv = document.createElement("div");
		JP(collapsedDiv).attr("id",stage_id.replace("#","") + "_collapsed"); 
		if(config.collapsedheight && (!config.autoexpandbutton || config.autoexpandbutton == "true")) {
			JP(collapsedDiv).css("height",config.collapsedheight);
				
			JP(collapsedDiv).css("display","none").css("width",config.width).css("cursor","pointer");
			JP(collapsedDiv).css("position","absolute").css("top","0px").css("left","0px").css("z-index","9999999");
			JP(collapsedDiv).click(function() {
				JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").trigger("expandStage");
				JP(this).hide();
				toNormalHeight();
			});
			JP(this.stage).append(JP(collapsedDiv));
			
			if(0 || (config.remembercollapsed == "true" && jpdGetCookie("stage_c3c44e1152ae11025ad03ff47b35fc9e_c") == "1")) {
				JP(collapsedDiv).show();
			}
		}
				
		JP(targetElement).append(this.stage);
		
		//this.stylecss = "";
		
		if(typeof(backgroundImage) != "undefined" && backgroundImage != "") {
			if(!backgroundColor) { backgroundColor = "transparent"; }
			this.stylecss += " #stage_c3c44e1152ae11025ad03ff47b35fc9e.background1 { background: " + backgroundColor + " url(" + backgroundImage + ") no-repeat !important} ";
			JP(this.stage).append("<img src='" + backgroundImage + "' style='position: absolute; top: -9999px;'>");
		} 
		
		if(typeof(backgroundImage2) != "undefined" && backgroundImage2 != "") {
			this.stylecss += " #stage_c3c44e1152ae11025ad03ff47b35fc9e.background2 { background: " + backgroundColor2 + " url(" + backgroundImage2 + ") no-repeat !important} ";
			JP(this.stage).append("<img src='" + backgroundImage2 + "' style='position: absolute; top: -9999px;'>");
		}
		
		if(typeof(backgroundImage3) != "undefined" && backgroundImage3 != "") {
			this.stylecss += " #stage_c3c44e1152ae11025ad03ff47b35fc9e.background3 { background: " + backgroundColor3 + " url(" + backgroundImage3 + ") no-repeat !important} ";
			JP(this.stage).append("<img src='" + backgroundImage3 + "' style='position: absolute; top: -9999px;'>");
		}
		
		if(typeof(backgroundImage4) != "undefined" && backgroundImage4 != "") {
			this.stylecss += " #stage_c3c44e1152ae11025ad03ff47b35fc9e.background4 { background: " + backgroundColor4 + " url(" + backgroundImage4 + ") no-repeat !important} ";
			JP(this.stage).append("<img src='" + backgroundImage4 + "' style='position: absolute; top: -9999px;'>");
		}
		
		if(typeof(backgroundImage5) != "undefined" && backgroundImage5 != "") {
			this.stylecss += " #stage_c3c44e1152ae11025ad03ff47b35fc9e.background5 { background: " + backgroundColor5 + " url(" + backgroundImage5 + ") no-repeat !important} ";
			JP(this.stage).append("<img src='" + backgroundImage5 + "' style='position: absolute; top: -9999px;'>");
		}
		
		if(typeof(backgroundImage6) != "undefined" && backgroundImage6 != "") {
			this.stylecss += " #stage_c3c44e1152ae11025ad03ff47b35fc9e.background6 { background: " + backgroundColor6 + " url(" + backgroundImage6 + ") no-repeat !important} ";
			JP(this.stage).append("<img src='" + backgroundImage6 + "' style='position: absolute; top: -9999px;'>");
		}
		
		if(typeof(backgroundImage7) != "undefined" && backgroundImage7 != "") {
			this.stylecss += " #stage_c3c44e1152ae11025ad03ff47b35fc9e.background7 { background: " + backgroundColor7 + " url(" + backgroundImage7 + ") no-repeat !important} ";
			JP(this.stage).append("<img src='" + backgroundImage7 + "' style='position: absolute; top: -9999px;'>");
		}
		
		if(typeof(backgroundImage8) != "undefined" && backgroundImage8 != "") {
			this.stylecss += " #stage_c3c44e1152ae11025ad03ff47b35fc9e.background8 { background: " + backgroundColor8 + " url(" + backgroundImage8 + ") no-repeat !important} ";
			JP(this.stage).append("<img src='" + backgroundImage8 + "' style='position: absolute; top: -9999px;'>");
		}
				
		
		var stage = this.stage;
		
		// Update css, if it exists
				if(config.css) {
					var csselements = config.css.split(";");
					for(var i = 0; i < csselements.length; i++) {
						var comps = csselements[i].match(/(.*?):(.*)/);
						if(comps && comps.length == 2) {
							JP(this.stage).css(comps[1].replace(" ",""),comps[2].replace(" ",""));
						}
					}
				}
				
		if(config.overflow && config.overflow != "undefined") {
			JP(this.stage).css("overflow",config.overflow)
		}
				
									JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").bind("clickClose",function(){ 
					toCollapsedHeight();				});
							JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").bind("clickPlay",function(){ 
					if(jpCollapseTimer) { clearTimeout(jpCollapseTimer); }; toExpandedHeight(); showMainVideo(); 				});
							JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").bind("clickWatch",function(){ 
					if(jpCollapseTimer) { clearTimeout(jpCollapseTimer); }; toExpandedHeight(); showMainVideo(); 				});
							JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").bind("clickCollapse",function(){ 
					toNormalHeight();				});
							JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").bind("clickThrough",function(){ 
					window.open(clickThroughUrl,"_blank");				});
							JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").bind("stageLoaded",function(){ 
					jpCollapseTimer = null; JP(document).bind("teaserVideoEnded",function() { jpCollapseTimer = setTimeout(function() { toCollapsedHeight(); }, 7000); }); 				});
							JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").bind("clickSeeTheFilms",function(){ 
					window.open(clickThroughUrl,"_blank");				});
						
		JP(this.stage).bind("click", function(event) {
			//if(event.currentTarget.id == id) {
				if(config.clickevent) {
					JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").trigger(config.clickevent, id);
				}
			//}
		});
		
		JP(this.stage).bind("collapseStage",function() {
			toCollapsedHeight();
		});
		
		JP(this.stage).bind("normalStage",function() {
			toNormalHeight();
		});
		
		JP(this.stage).bind("expandStage",function() {
			toExpandedHeight();
		});

		
		if(config.triggeronload) {
			JP(this.stage).attr("loadtrigger",config.triggeronload);
			/*JP(this.stage).bind("load", function(event) {
				JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").trigger(config.triggeronload);
			});*/
		}
		
		if(parseInt(config.autocollapsetime) > 0) {
			setTimeout(function() { JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").trigger("clickClose"); }, parseInt(config.autocollapsetime) * 1000);
		}
		
	};
};


var stage = null;




if(jpinlineunit || (typeof forcejpinline != "undefined" && forcejpinline)) {
	var telem = "jpsuperheader";
	if(typeof overrideElem != "undefined") {
		telem = overrideElem;
	}
	stage = new Stage_stage_c3c44e1152ae11025ad03ff47b35fc9e();
	stage.drawElement("#" + telem);
} else {
	/*JP(document).ready(function() {*/
	var telem = "jpsuperheader";
	if(typeof overrideElem != "undefined") {
		telem = overrideElem;
	}
	stage = new Stage_stage_c3c44e1152ae11025ad03ff47b35fc9e();
	jpElementReady(telem,function() {
		stage.drawElement("#" + telem);
		closeJPSuperheader = function() {
			JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").trigger("collapseStage");
		};

		expandJPSuperheader = function() {
			JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").trigger("expandStage");
			stage.toNormalHeight();
		};
	});
}

var JPButton_stage_c3c44e1152ae11025ad03ff47b35fc9e = function(settings, rawHandlers, button_id, stg_id) {
	
	var rawConfig = settings; 
	var config = eval("(" + rawConfig + ")");
	var origconfig = null;
	
	origconfig = config;
	config = jpGetDatedConfig(config);
	
	var stage_id = "#" + stg_id;
	var eventHandlers = eval("(" + rawHandlers + ")");
	var id = button_id;
	var layer = (config.layer) ? "jp_" + config.layer : "jp_default";
	
	var attributes = jpGetAttributes(config,false);
	var stagestate = jpGetStageStates(config,false);
	
	var element = null;
	
	var hoverImage = (config.hoverImage_url) ? config.hoverImage_url : "http://ads.jetpackdigital.com/blank.png";
	var defaultImage = (config.defaultImage_url) ? config.defaultImage_url : "http://ads.jetpackdigital.com/blank.png";
	var selectedImage = (config.selectedImage_url) ? config.selectedImage_url : "http://ads.jetpackdigital.com/blank.png";
	var disabledImage = (config.disabledImage_url) ? config.disabledImage_url : "http://ads.jetpackdigital.com/blank.png";
	
	var selected = false;
	var disabled = false;
	
	var cursor = (config.cursortype) ? config.cursortype : "pointer";
	
	var trackingEvents = new Array();
	
	function executeFunctionByName(functionName, context /*, args */) {
  		var args = Array.prototype.slice.call(arguments).splice(2);
 		var namespaces = functionName.split(".");
  		var func = namespaces.pop();
  		for(var i = 0; i < namespaces.length; i++) {
    		context = context[namespaces[i]];
  		}
  		return context[func](this, args);
	};
	
	var handlers = new Array();
		
	for(var i = 0; i < eventHandlers.length; i++) {
		var handler = eventHandlers[i];
		handlers[handler.event] = handler.handlerCode;
		//eval("this." + handler.event + " = function() {" +  handler.handlerCode + "}");
		JP(stage_id).bind(handler.event,function(event) {
			try {
				eval(handlers[event.type]);
			} catch(ex) {
				if(typeof console != "undefined") {
					console.log("ERROR WITH: " + event.type + " on " + id + " : " + ex.message);
				}
			}
		});
	}		

	var hide = function() {
		JP(element).hide();
	};
	
	var show = function() {
		JP(element).show();
	};
	
	var trigger = function(event) {
		JP(stage_id).trigger(event);
	};
	
	var track = function(eventName) {
		//if(!trackingEvents[eventName]) {
			var trackingpixel = "http://ads.jetpackdigital.com/tracking_pixel.gif?[random]";
            var cb = Math.floor(Math.random() * 10000000000);	 
        	var trackingsrc =trackingpixel.replace("[random]",ord);
       		var trackingimg = new Image();
        	trackingimg.src = tp + "&t=" + eventName + "&cb=" + cb + "&u=" + trackingsrc;
			trackingEvents[eventName] = true;
		//}
	};

	var disableButton = function() {
		JP(element).attr("class",id + "_disabled " + stagestate);
		JP(element).css("cursor","default");
		
		disabled = true;
	};
	
	this.drawElement = function(targetElement) {
		this.module = document.createElement("div");
		JP(this.module).attr("id",id);
		JP(this.module).attr("class",id + "_default " + layer + " " + stagestate);
		
		if(config.addclass) {
			JP(this.module).addClass(config.addclass);
		}
		
		for(var a in attributes) {
			if(typeof attributes[a] == "string") {
        		JP(this.module).attr(a.replace(" ","_"),attributes[a]);
        	}
        }
		
		JP(this.module).css("position","absolute");
		JP(this.module).css("height",config.height);
		JP(this.module).css("width",config.width);
		JP(this.module).css("left",config.left);
		JP(this.module).css("top",config.top);
		JP(this.module).css("font-size","10px");
		
		// Update css, if it exists
				if(config.css) {
					var csselements = config.css.split(";");
					for(var i = 0; i < csselements.length; i++) {
						var comps = csselements[i].split(":");
						JP(this.module).css(comps[0],comps[1]);
					}
				}
		
		
		
		if(config.zIndex) {
			JP(this.module).css("z-index",config.zIndex);
		}
		
		
		// Get the current date
		var date = new Date();
		var year = date.getFullYear();
		var month = ((date.getMonth() + 1) < 10) ? "0" + (date.getMonth() + 1) : date.getMonth(); 
		var day = ((date.getDate() + 1) < 10) ? "0" + (date.getDate() + 1) : date.getDate(); 
		var currentDate = year + "" + month + "" + day;
		//alert(currentDate  + " " + config.enableOnDate);
		
		if(!config.defaultState || config.defaultState != "disabled" || (config.enableOnDate && parseInt(config.enableOnDate) <= parseInt(currentDate))) {
			JP(this.module).css("cursor",cursor);
		} else {
			JP(this.module).attr("class",id + "_disabled " + stagestate);
		}
		
		// Check to see if this button should be selected
		if(parseInt(config.enableOnDate) == parseInt(currentDate)) {
			JP(this.module).attr("class", id + "_selected " + stagestate); 
			selected = true;
			
			JP(stage_id).attr("loadtrigger",config.clickEvent);
		}
		
		//JP(this.module).html("Button");
		
		if(config.paddingtop) {
			JP(this.module).css("padding-top",config.paddingtop);	
		}
		
		if(config.fontfamily) {
			JP(this.module).css("font-family",config.fontfamily);	
		}
		
		if(config.fontcolor) {
			JP(this.module).css("color",config.fontcolor);	
		}
		
		if(config.fontsize) {
			JP(this.module).css("font-size",config.fontsize);	
		}
		
		if(config.backgroundcolor) {
			JP(this.module).css("background-color",config.backgroundcolor);
		}
		
		if(config.overflow) {
			JP(this.module).css("overflow",config.overflow);
		}
		
		if(config.display) {
			if(config.display && config.display == "true") { 
				config.display = "block";
			} else if (config.display && config.display == "false") {
				config.display = "none";
			} else if(!config.display) {
				config.display = "block";
			}
			JP(this.module).css("display",config.display);
		}
		
		if(config.displayoncollapse && jpdGetCookie(stage_id.replace("#","") + "_c") == "1") {
			if(config.displayoncollapse == "true") { 
				config.displayoncollapse = "block";
			} else if(config.displayoncollapse == "false") {
				config.displayoncollapse = "none";
			}
			JP(this.module).css("display",config.displayoncollapse);
		}
		
		element = this.module;
		
		var stylecss = "";
		
		if(typeof(defaultImage) != "undefined" && defaultImage != "") {
			if(!config.defaultState || config.defaultState != "disabled" || (config.enableOnDate && parseInt(config.enableOnDate) <= parseInt(currentDate))) {
				stylecss += "." + id + "_default {background: transparent url(" + defaultImage + ") no-repeat !important;}";
			} else {
				stylecss += "." + id + "_default {  background: transparent url(" + disabledImage + ") no-repeat !important;}";
			}
			
			JP(element).css("background","transparent url(" + defaultImage + ") no-repeat");
			
			// Create an off screen image
			JP(element).append("<img src='" + defaultImage + "' style='position: absolute; top: -9999px;'/>");
		}
		
		if(typeof(hoverImage) != "undefined" && hoverImage != "") { 
			stylecss += "." + id + "_hover {  background: transparent url(" + hoverImage + ") no-repeat !important;}";	
			JP(element).append("<img src='" + hoverImage + "' style='position: absolute; top: -9999px;'/>");
		}
		
		if(typeof(selectedImage) != "undefined" && selectedImage != "") {
		 	stylecss +=  "." + id + "_selected {  background: transparent url(" + selectedImage + ") no-repeat !important;}";
		 	JP(element).append("<img src='" + selectedImage + "' style='position: absolute; top: -9999px;'/>");
		}
		
		if(typeof(disabledImage) != "undefined" && disabledImage != "") {
		 	stylecss +=  "." + id + "_disabled {  background: transparent url(" + disabledImage + ") no-repeat !important;}";
		 	JP(element).append("<img src='" + disabledImage + "' style='position: absolute; top: -9999px;'/>");
		}
		
		if(config.defaultState && config.defaultState == "selected") {
			JP(element).attr("class", id + "_selected " + stagestate); 
			selected = true;
		}
		
		stage.updateStyleSheet(stylecss);
		
		
		
				
		var cacheHoverImageElement = document.createElement("div");
		JP(cacheHoverImageElement).css("position","absolute");
		JP(cacheHoverImageElement).css("left","-9999px");
		JP(cacheHoverImageElement).attr("class",id + "_hover " + stagestate);
		JP(targetElement).append(JP(cacheHoverImageElement));

		
		if(config.hoverImage && (!config.defaultState || config.defaultState != "disabled" || (config.enableOnDate && parseInt(config.enableOnDate) <= parseInt(currentDate)))) {
			JP(this.module).mouseover(function() {
				if(!selected && !disabled) {
					JP(element).attr("class",id + "_hover " + stagestate);
				} 
			});
			
			JP(this.module).mouseout(function() {
				if(!selected && !disabled) {
					JP(element).attr("class",id + "_default " + stagestate);
				}
			});
			//style += "#" + id + "_cache {  background: transparent url(" + hoverImage + ") no-repeat !important;}"; 
			//style += "#" + id + ":hover { background: transparent url(" + hoverImage + ") no-repeat !important;}";
		}
		
		if(jpdGetCookie(stage_id.replace("#","") + "_c") == "1") {
			if(config.displayoncollapse == "false") {
				JP(element).css("display","none");
			} else if(config.displayoncollapse == "true"){
				JP(element).css("display","block");
			} else {
				JP(element).css("display",config.displayoncollapse);
			}
		}
		
		if(config.swfoverlaybutton && config.swfoverlaybutton == "true") {
			var indiv = document.createElement("div");
			JP(indiv).attr("id",id + "_overlay");
			JP(indiv).html("<object id='" + id + "_object' type='img/gif' style='background-color: transparent'><div id='" + id + "_image' style='background: transparent url(http://ads.jetpackdigital.com/tracking_pixel.gif); height: 100%; width: 100%;'></div></object>");
			JP(this.module).append(indiv);
			/*if(!config.defaultState || config.defaultState != "disabled" || (config.enableOnDate && parseInt(config.enableOnDate) <= parseInt(currentDate))) {*/
				JP(indiv).bind("click", function() {
					if(config.clickEvent && !disabled) {
						JP(this.module).trigger("click");
					}
				});
			/*}*/

		}
		
		JP(targetElement).append(this.module);
		
		
		if(!config.defaultState || config.defaultState != "disabled" || (config.enableOnDate && parseInt(config.enableOnDate) <= parseInt(currentDate))) {
			JP(this.module).bind("click", function() {
				if(config.clickEvent && !disabled) {
					JP(stage_id).trigger(config.clickEvent);
				}
				
				if(config.clickthroughurl) {
					window.open(tp + "&t=" + config.title + "_clickthrough&u="+config.clickthroughurl, "_blank");
				}

			});
		}
		
		
		if(config.triggeronload) {
			JP(stage_id).trigger(config.triggeronload);
		}
		
		if(config.mouseOverEvent) {
			JP(this.module).bind("mouseover", function() {
				JP(stage_id).trigger(config.mouseOverEvent);
			});
		}
		
		if(config.mouseOutEvent) {
			JP(this.module).bind("mouseout", function() {
				JP(stage_id).trigger(config.mouseOutEvent);
			});
		}
	};
};

var module = null;

if(jpinlineunit) {
	module = new JPButton_stage_c3c44e1152ae11025ad03ff47b35fc9e('{\"title\":\"play\",\"parent\":\"stage\",\"layer\":\"default\",\"width\":\"257px\",\"height\":\"55px\",\"top\":\"157px\",\"left\":\"375px\",\"display\":\"block\",\"displayoncollapse\":\"none\",\"zIndex\":\"200000000\",\"stagestate\":\"Normal\",\"defaultImage_url\":\"http:\\/\\/ads.jetpackdigital.com\\/sites\\/_uploads\\/1341017650NIKE_250_CTA.png\",\"defaultImage\":\"NIKE_250_CTA\",\"hoverImage_url\":\"http:\\/\\/ads.jetpackdigital.com\\/sites\\/_uploads\\/1341017650NIKE_250_CTA_RO.png\",\"hoverImage\":\"NIKE_250_CTA_RO\",\"clickEvent\":\"clickPlay\"}', '[{\"event\":\"clickPlay\",\"handlerCode\":\"hide(); track(\\\"clickedPlay\\\");\"},{\"event\":\"clickClose\",\"handlerCode\":\"hide();\"},{\"event\":\"clickWatch\",\"handlerCode\":\"hide();\"},{\"event\":\"clickCollapse\",\"handlerCode\":\"show();\"},{\"event\":\"stageCollapsed\",\"handlerCode\":\"hide();\"},{\"event\":\"stageExpandedNormal\",\"handlerCode\":\"show();\"},{\"event\":\"stageExpandedLarge\",\"handlerCode\":\"hide();\"},{\"event\":\"expandStage\",\"handlerCode\":\"show();\"}]','Button_ButtonModule_4_stage_c3c44e1152ae11025ad03ff47b35fc9e', 'stage_c3c44e1152ae11025ad03ff47b35fc9e');
	module.drawElement("#stage_c3c44e1152ae11025ad03ff47b35fc9e");
} else {
	jpElementReady("stage_c3c44e1152ae11025ad03ff47b35fc9e",function() { 
		module = new JPButton_stage_c3c44e1152ae11025ad03ff47b35fc9e('{\"title\":\"play\",\"parent\":\"stage\",\"layer\":\"default\",\"width\":\"257px\",\"height\":\"55px\",\"top\":\"157px\",\"left\":\"375px\",\"display\":\"block\",\"displayoncollapse\":\"none\",\"zIndex\":\"200000000\",\"stagestate\":\"Normal\",\"defaultImage_url\":\"http:\\/\\/ads.jetpackdigital.com\\/sites\\/_uploads\\/1341017650NIKE_250_CTA.png\",\"defaultImage\":\"NIKE_250_CTA\",\"hoverImage_url\":\"http:\\/\\/ads.jetpackdigital.com\\/sites\\/_uploads\\/1341017650NIKE_250_CTA_RO.png\",\"hoverImage\":\"NIKE_250_CTA_RO\",\"clickEvent\":\"clickPlay\"}', '[{\"event\":\"clickPlay\",\"handlerCode\":\"hide(); track(\\\"clickedPlay\\\");\"},{\"event\":\"clickClose\",\"handlerCode\":\"hide();\"},{\"event\":\"clickWatch\",\"handlerCode\":\"hide();\"},{\"event\":\"clickCollapse\",\"handlerCode\":\"show();\"},{\"event\":\"stageCollapsed\",\"handlerCode\":\"hide();\"},{\"event\":\"stageExpandedNormal\",\"handlerCode\":\"show();\"},{\"event\":\"stageExpandedLarge\",\"handlerCode\":\"hide();\"},{\"event\":\"expandStage\",\"handlerCode\":\"show();\"}]', 'Button_ButtonModule_4_stage_c3c44e1152ae11025ad03ff47b35fc9e', 'stage_c3c44e1152ae11025ad03ff47b35fc9e');
		module.drawElement("#stage_c3c44e1152ae11025ad03ff47b35fc9e");  
	});
};

var module = null;

if(jpinlineunit) {
	module = new JPButton_stage_c3c44e1152ae11025ad03ff47b35fc9e('{\"title\":\"close\",\"parent\":\"stage\",\"layer\":\"default\",\"width\":\"129px\",\"height\":\"42px\",\"top\":\"11px\",\"left\":\"964px\",\"display\":\"block\",\"displayoncollapse\":\"none\",\"zIndex\":\"200000000\",\"stagestate\":\"Normal\",\"defaultImage_url\":\"http:\\/\\/ads.jetpackdigital.com\\/sites\\/_uploads\\/1341017650NIKE_250_CLOSE.png\",\"defaultImage\":\"NIKE_250_CLOSE\",\"clickEvent\":\"clickClose\"}', '[{\"event\":\"clickPlay\",\"handlerCode\":\"hide();\"},{\"event\":\"clickClose\",\"handlerCode\":\"hide(); stopSuperVideo();\"},{\"event\":\"clickWatch\",\"handlerCode\":\"hide();\"},{\"event\":\"clickCollapse\",\"handlerCode\":\"show();\"},{\"event\":\"stageCollapsed\",\"handlerCode\":\"hide();\"},{\"event\":\"expandStage\",\"handlerCode\":\"show();\"}]','Button_ButtonModule_8_stage_c3c44e1152ae11025ad03ff47b35fc9e', 'stage_c3c44e1152ae11025ad03ff47b35fc9e');
	module.drawElement("#stage_c3c44e1152ae11025ad03ff47b35fc9e");
} else {
	jpElementReady("stage_c3c44e1152ae11025ad03ff47b35fc9e",function() { 
		module = new JPButton_stage_c3c44e1152ae11025ad03ff47b35fc9e('{\"title\":\"close\",\"parent\":\"stage\",\"layer\":\"default\",\"width\":\"129px\",\"height\":\"42px\",\"top\":\"11px\",\"left\":\"964px\",\"display\":\"block\",\"displayoncollapse\":\"none\",\"zIndex\":\"200000000\",\"stagestate\":\"Normal\",\"defaultImage_url\":\"http:\\/\\/ads.jetpackdigital.com\\/sites\\/_uploads\\/1341017650NIKE_250_CLOSE.png\",\"defaultImage\":\"NIKE_250_CLOSE\",\"clickEvent\":\"clickClose\"}', '[{\"event\":\"clickPlay\",\"handlerCode\":\"hide();\"},{\"event\":\"clickClose\",\"handlerCode\":\"hide(); stopSuperVideo();\"},{\"event\":\"clickWatch\",\"handlerCode\":\"hide();\"},{\"event\":\"clickCollapse\",\"handlerCode\":\"show();\"},{\"event\":\"stageCollapsed\",\"handlerCode\":\"hide();\"},{\"event\":\"expandStage\",\"handlerCode\":\"show();\"}]', 'Button_ButtonModule_8_stage_c3c44e1152ae11025ad03ff47b35fc9e', 'stage_c3c44e1152ae11025ad03ff47b35fc9e');
		module.drawElement("#stage_c3c44e1152ae11025ad03ff47b35fc9e");  
	});
};

var module = null;

if(jpinlineunit) {
	module = new JPButton_stage_c3c44e1152ae11025ad03ff47b35fc9e('{\"title\":\"watch\",\"parent\":\"stage\",\"layer\":\"default\",\"width\":\"141px\",\"height\":\"40px\",\"top\":\"16px\",\"left\":\"561px\",\"display\":\"none\",\"displayoncollapse\":\"block\",\"zIndex\":\"2000000000\",\"stagestate\":\"Collapsed\",\"clickEvent\":\"clickWatch\"}', '[{\"event\":\"stageCollapsed\",\"handlerCode\":\"show();\"},{\"event\":\"expandStage\",\"handlerCode\":\"hide();\"},{\"event\":\"clickWatch\",\"handlerCode\":\"hide(); track(\\\"clickedWatch\\\");\"},{\"event\":\"clickClose\",\"handlerCode\":\"show();\"},{\"event\":\"clickPlay\",\"handlerCode\":\"hide();\"},{\"event\":\"clickCollapse\",\"handlerCode\":\"hide();\"}]','Button_ButtonModule_12_stage_c3c44e1152ae11025ad03ff47b35fc9e', 'stage_c3c44e1152ae11025ad03ff47b35fc9e');
	module.drawElement("#stage_c3c44e1152ae11025ad03ff47b35fc9e");
} else {
	jpElementReady("stage_c3c44e1152ae11025ad03ff47b35fc9e",function() { 
		module = new JPButton_stage_c3c44e1152ae11025ad03ff47b35fc9e('{\"title\":\"watch\",\"parent\":\"stage\",\"layer\":\"default\",\"width\":\"141px\",\"height\":\"40px\",\"top\":\"16px\",\"left\":\"561px\",\"display\":\"none\",\"displayoncollapse\":\"block\",\"zIndex\":\"2000000000\",\"stagestate\":\"Collapsed\",\"clickEvent\":\"clickWatch\"}', '[{\"event\":\"stageCollapsed\",\"handlerCode\":\"show();\"},{\"event\":\"expandStage\",\"handlerCode\":\"hide();\"},{\"event\":\"clickWatch\",\"handlerCode\":\"hide(); track(\\\"clickedWatch\\\");\"},{\"event\":\"clickClose\",\"handlerCode\":\"show();\"},{\"event\":\"clickPlay\",\"handlerCode\":\"hide();\"},{\"event\":\"clickCollapse\",\"handlerCode\":\"hide();\"}]', 'Button_ButtonModule_12_stage_c3c44e1152ae11025ad03ff47b35fc9e', 'stage_c3c44e1152ae11025ad03ff47b35fc9e');
		module.drawElement("#stage_c3c44e1152ae11025ad03ff47b35fc9e");  
	});
};

var module = null;

if(jpinlineunit) {
	module = new JPButton_stage_c3c44e1152ae11025ad03ff47b35fc9e('{\"title\":\"collapse\",\"parent\":\"stage\",\"layer\":\"default\",\"width\":\"129px\",\"height\":\"42px\",\"top\":\"12px\",\"left\":\"964px\",\"display\":\"none\",\"displayoncollapse\":\"none\",\"zIndex\":\"200000000\",\"stagestate\":\"Normal\",\"defaultImage_url\":\"http:\\/\\/ads.jetpackdigital.com\\/sites\\/_uploads\\/1341017650NIKE_250_CLOSE.png\",\"defaultImage\":\"NIKE_250_CLOSE\",\"clickEvent\":\"clickCollapse\"}', '[{\"event\":\"clickPlay\",\"handlerCode\":\"show();\"},{\"event\":\"clickClose\",\"handlerCode\":\"hide();\"},{\"event\":\"clickWatch\",\"handlerCode\":\"show();\"},{\"event\":\"clickCollapse\",\"handlerCode\":\"hide(); stopSuperVideo(); showVideoImage();\"},{\"event\":\"stageCollapsed\",\"handlerCode\":\"hide();\"},{\"event\":\"stageExpandedNormal\",\"handlerCode\":\"hide();\"},{\"event\":\"stageExpandedLarge\",\"handlerCode\":\"show();\"},{\"event\":\"expandStage\",\"handlerCode\":\"hide();\"}]','Button_ButtonModule_16_stage_c3c44e1152ae11025ad03ff47b35fc9e', 'stage_c3c44e1152ae11025ad03ff47b35fc9e');
	module.drawElement("#stage_c3c44e1152ae11025ad03ff47b35fc9e");
} else {
	jpElementReady("stage_c3c44e1152ae11025ad03ff47b35fc9e",function() { 
		module = new JPButton_stage_c3c44e1152ae11025ad03ff47b35fc9e('{\"title\":\"collapse\",\"parent\":\"stage\",\"layer\":\"default\",\"width\":\"129px\",\"height\":\"42px\",\"top\":\"12px\",\"left\":\"964px\",\"display\":\"none\",\"displayoncollapse\":\"none\",\"zIndex\":\"200000000\",\"stagestate\":\"Normal\",\"defaultImage_url\":\"http:\\/\\/ads.jetpackdigital.com\\/sites\\/_uploads\\/1341017650NIKE_250_CLOSE.png\",\"defaultImage\":\"NIKE_250_CLOSE\",\"clickEvent\":\"clickCollapse\"}', '[{\"event\":\"clickPlay\",\"handlerCode\":\"show();\"},{\"event\":\"clickClose\",\"handlerCode\":\"hide();\"},{\"event\":\"clickWatch\",\"handlerCode\":\"show();\"},{\"event\":\"clickCollapse\",\"handlerCode\":\"hide(); stopSuperVideo(); showVideoImage();\"},{\"event\":\"stageCollapsed\",\"handlerCode\":\"hide();\"},{\"event\":\"stageExpandedNormal\",\"handlerCode\":\"hide();\"},{\"event\":\"stageExpandedLarge\",\"handlerCode\":\"show();\"},{\"event\":\"expandStage\",\"handlerCode\":\"hide();\"}]', 'Button_ButtonModule_16_stage_c3c44e1152ae11025ad03ff47b35fc9e', 'stage_c3c44e1152ae11025ad03ff47b35fc9e');
		module.drawElement("#stage_c3c44e1152ae11025ad03ff47b35fc9e");  
	});
};

var module = null;

if(jpinlineunit) {
	module = new JPButton_stage_c3c44e1152ae11025ad03ff47b35fc9e('{\"title\":\"ButtonModule_20\",\"parent\":\"stage\",\"layer\":\"default\",\"width\":\"1200px\",\"height\":\"250px\",\"top\":\"-1px\",\"left\":\"-1px\",\"zIndex\":\"10000\",\"stagestate\":\"All\",\"clickEvent\":\"clickThrough\"}', '[{\"event\":\"clickPlay\",\"handlerCode\":\"JP(element).css(\\\"height\\\",\\\"667px\\\").css(\\\"width\\\",\\\"1020px\\\").css(\\\"z-index\\\",\\\"10000000\\\");\"},{\"event\":\"clickWatch\",\"handlerCode\":\"JP(element).css(\\\"height\\\",\\\"667px\\\").css(\\\"width\\\",\\\"1020px\\\").css(\\\"z-index\\\",\\\"10000000\\\");\"},{\"event\":\"clickClose\",\"handlerCode\":\"JP(element).css(\\\"height\\\",\\\"66px\\\").css(\\\"width\\\",\\\"1024px\\\").css(\\\"z-index\\\",\\\"10000000\\\");\"},{\"event\":\"clickCollapse\",\"handlerCode\":\"JP(element).css(\\\"height\\\",\\\"250px\\\").css(\\\"width\\\",\\\"1020px\\\").css(\\\"z-index\\\",\\\"10000\\\");\"},{\"event\":\"stageCollapsed\",\"handlerCode\":\"JP(element).css(\\\"height\\\",\\\"66px\\\").css(\\\"width\\\",\\\"1020px\\\").css(\\\"z-index\\\",\\\"10000\\\");\"},{\"event\":\"stageLoaded\",\"handlerCode\":\"if(stagecollapsed){JP(element).css(\\\"height\\\",\\\"66px\\\").css(\\\"width\\\",\\\"1020px\\\").css(\\\"z-index\\\",\\\"10000000\\\");}\"},{\"event\":\"stageExpandedLarge\",\"handlerCode\":\"JP(element).css(\\\"height\\\",\\\"667px\\\").css(\\\"width\\\",\\\"1020px\\\").css(\\\"z-index\\\",\\\"10000000\\\");\"},{\"event\":\"stageExpandedNormal\",\"handlerCode\":\"JP(element).css(\\\"height\\\",\\\"250px\\\").css(\\\"width\\\",\\\"1020px\\\").css(\\\"z-index\\\",\\\"100000\\\");\"}]','Button_ButtonModule_20_stage_c3c44e1152ae11025ad03ff47b35fc9e', 'stage_c3c44e1152ae11025ad03ff47b35fc9e');
	module.drawElement("#stage_c3c44e1152ae11025ad03ff47b35fc9e");
} else {
	jpElementReady("stage_c3c44e1152ae11025ad03ff47b35fc9e",function() { 
		module = new JPButton_stage_c3c44e1152ae11025ad03ff47b35fc9e('{\"title\":\"ButtonModule_20\",\"parent\":\"stage\",\"layer\":\"default\",\"width\":\"1200px\",\"height\":\"250px\",\"top\":\"-1px\",\"left\":\"-1px\",\"zIndex\":\"10000\",\"stagestate\":\"All\",\"clickEvent\":\"clickThrough\"}', '[{\"event\":\"clickPlay\",\"handlerCode\":\"JP(element).css(\\\"height\\\",\\\"667px\\\").css(\\\"width\\\",\\\"1020px\\\").css(\\\"z-index\\\",\\\"10000000\\\");\"},{\"event\":\"clickWatch\",\"handlerCode\":\"JP(element).css(\\\"height\\\",\\\"667px\\\").css(\\\"width\\\",\\\"1020px\\\").css(\\\"z-index\\\",\\\"10000000\\\");\"},{\"event\":\"clickClose\",\"handlerCode\":\"JP(element).css(\\\"height\\\",\\\"66px\\\").css(\\\"width\\\",\\\"1024px\\\").css(\\\"z-index\\\",\\\"10000000\\\");\"},{\"event\":\"clickCollapse\",\"handlerCode\":\"JP(element).css(\\\"height\\\",\\\"250px\\\").css(\\\"width\\\",\\\"1020px\\\").css(\\\"z-index\\\",\\\"10000\\\");\"},{\"event\":\"stageCollapsed\",\"handlerCode\":\"JP(element).css(\\\"height\\\",\\\"66px\\\").css(\\\"width\\\",\\\"1020px\\\").css(\\\"z-index\\\",\\\"10000\\\");\"},{\"event\":\"stageLoaded\",\"handlerCode\":\"if(stagecollapsed){JP(element).css(\\\"height\\\",\\\"66px\\\").css(\\\"width\\\",\\\"1020px\\\").css(\\\"z-index\\\",\\\"10000000\\\");}\"},{\"event\":\"stageExpandedLarge\",\"handlerCode\":\"JP(element).css(\\\"height\\\",\\\"667px\\\").css(\\\"width\\\",\\\"1020px\\\").css(\\\"z-index\\\",\\\"10000000\\\");\"},{\"event\":\"stageExpandedNormal\",\"handlerCode\":\"JP(element).css(\\\"height\\\",\\\"250px\\\").css(\\\"width\\\",\\\"1020px\\\").css(\\\"z-index\\\",\\\"100000\\\");\"}]', 'Button_ButtonModule_20_stage_c3c44e1152ae11025ad03ff47b35fc9e', 'stage_c3c44e1152ae11025ad03ff47b35fc9e');
		module.drawElement("#stage_c3c44e1152ae11025ad03ff47b35fc9e");  
	});
};

var module = null;

if(jpinlineunit) {
	module = new JPButton_stage_c3c44e1152ae11025ad03ff47b35fc9e('{\"title\":\"replay\",\"parent\":\"stage\",\"layer\":\"default\",\"width\":\"133px\",\"height\":\"30px\",\"top\":\"361px\",\"left\":\"481px\",\"display\":\"none\",\"displayoncollapse\":\"none\",\"zIndex\":\"200000000\",\"stagestate\":\"All\",\"defaultImage_url\":\"http:\\/\\/ads.jetpackdigital.com\\/sites\\/_uploads\\/1341017651NIKE_667_REPLAY.png\",\"defaultImage\":\"NIKE_667_REPLAY\",\"hoverImage_url\":\"http:\\/\\/ads.jetpackdigital.com\\/sites\\/_uploads\\/1341017652NIKE_667_REPLAY_RO.png\",\"hoverImage\":\"NIKE_667_REPLAY_RO\",\"clickEvent\":\"clickReplay\"}', '[{\"event\":\"clickReplay\",\"handlerCode\":\"showMainVideo(); hide();\"},{\"event\":\"clickCollapse\",\"handlerCode\":\"hide();\"},{\"event\":\"stageLoaded\",\"handlerCode\":\"JP(document).bind(\\\"mainVideoEnded\\\",function() { show(); });\"},{\"event\":\"clickWatch\",\"handlerCode\":\"hide();\"},{\"event\":\"clickPlay\",\"handlerCode\":\"hide();\"}]','Button_ButtonModule_24_stage_c3c44e1152ae11025ad03ff47b35fc9e', 'stage_c3c44e1152ae11025ad03ff47b35fc9e');
	module.drawElement("#stage_c3c44e1152ae11025ad03ff47b35fc9e");
} else {
	jpElementReady("stage_c3c44e1152ae11025ad03ff47b35fc9e",function() { 
		module = new JPButton_stage_c3c44e1152ae11025ad03ff47b35fc9e('{\"title\":\"replay\",\"parent\":\"stage\",\"layer\":\"default\",\"width\":\"133px\",\"height\":\"30px\",\"top\":\"361px\",\"left\":\"481px\",\"display\":\"none\",\"displayoncollapse\":\"none\",\"zIndex\":\"200000000\",\"stagestate\":\"All\",\"defaultImage_url\":\"http:\\/\\/ads.jetpackdigital.com\\/sites\\/_uploads\\/1341017651NIKE_667_REPLAY.png\",\"defaultImage\":\"NIKE_667_REPLAY\",\"hoverImage_url\":\"http:\\/\\/ads.jetpackdigital.com\\/sites\\/_uploads\\/1341017652NIKE_667_REPLAY_RO.png\",\"hoverImage\":\"NIKE_667_REPLAY_RO\",\"clickEvent\":\"clickReplay\"}', '[{\"event\":\"clickReplay\",\"handlerCode\":\"showMainVideo(); hide();\"},{\"event\":\"clickCollapse\",\"handlerCode\":\"hide();\"},{\"event\":\"stageLoaded\",\"handlerCode\":\"JP(document).bind(\\\"mainVideoEnded\\\",function() { show(); });\"},{\"event\":\"clickWatch\",\"handlerCode\":\"hide();\"},{\"event\":\"clickPlay\",\"handlerCode\":\"hide();\"}]', 'Button_ButtonModule_24_stage_c3c44e1152ae11025ad03ff47b35fc9e', 'stage_c3c44e1152ae11025ad03ff47b35fc9e');
		module.drawElement("#stage_c3c44e1152ae11025ad03ff47b35fc9e");  
	});
};

var module = null;

if(jpinlineunit) {
	module = new JPButton_stage_c3c44e1152ae11025ad03ff47b35fc9e('{\"title\":\"ButtonModule_48\",\"parent\":\"stage\",\"layer\":\"default\",\"width\":\"231px\",\"height\":\"40px\",\"top\":\"319px\",\"left\":\"390px\",\"display\":\"none\",\"displayoncollapse\":\"none\",\"zIndex\":\"200000000\",\"stagestate\":\"All\",\"defaultImage_url\":\"http:\\/\\/ads.jetpackdigital.com\\/sites\\/_uploads\\/1341017652NIKE_667_SEETHEFILMS.png\",\"defaultImage\":\"NIKE_667_SEETHEFILMS\",\"hoverImage_url\":\"http:\\/\\/ads.jetpackdigital.com\\/sites\\/_uploads\\/1341017652NIKE_667_SEETHEFILMS_RO.png\",\"hoverImage\":\"NIKE_667_SEETHEFILMS_RO\",\"clickEvent\":\"clickSeeTheFilms\"}', '[{\"event\":\"clickReplay\",\"handlerCode\":\"hide();\"},{\"event\":\"clickCollapse\",\"handlerCode\":\"hide();\"},{\"event\":\"stageLoaded\",\"handlerCode\":\"JP(document).bind(\\\"mainVideoEnded\\\",function() { show(); });\"},{\"event\":\"clickPlay\",\"handlerCode\":\"hide();\"},{\"event\":\"clickWatch\",\"handlerCode\":\"hide();\"}]','Button_ButtonModule_48_stage_c3c44e1152ae11025ad03ff47b35fc9e', 'stage_c3c44e1152ae11025ad03ff47b35fc9e');
	module.drawElement("#stage_c3c44e1152ae11025ad03ff47b35fc9e");
} else {
	jpElementReady("stage_c3c44e1152ae11025ad03ff47b35fc9e",function() { 
		module = new JPButton_stage_c3c44e1152ae11025ad03ff47b35fc9e('{\"title\":\"ButtonModule_48\",\"parent\":\"stage\",\"layer\":\"default\",\"width\":\"231px\",\"height\":\"40px\",\"top\":\"319px\",\"left\":\"390px\",\"display\":\"none\",\"displayoncollapse\":\"none\",\"zIndex\":\"200000000\",\"stagestate\":\"All\",\"defaultImage_url\":\"http:\\/\\/ads.jetpackdigital.com\\/sites\\/_uploads\\/1341017652NIKE_667_SEETHEFILMS.png\",\"defaultImage\":\"NIKE_667_SEETHEFILMS\",\"hoverImage_url\":\"http:\\/\\/ads.jetpackdigital.com\\/sites\\/_uploads\\/1341017652NIKE_667_SEETHEFILMS_RO.png\",\"hoverImage\":\"NIKE_667_SEETHEFILMS_RO\",\"clickEvent\":\"clickSeeTheFilms\"}', '[{\"event\":\"clickReplay\",\"handlerCode\":\"hide();\"},{\"event\":\"clickCollapse\",\"handlerCode\":\"hide();\"},{\"event\":\"stageLoaded\",\"handlerCode\":\"JP(document).bind(\\\"mainVideoEnded\\\",function() { show(); });\"},{\"event\":\"clickPlay\",\"handlerCode\":\"hide();\"},{\"event\":\"clickWatch\",\"handlerCode\":\"hide();\"}]', 'Button_ButtonModule_48_stage_c3c44e1152ae11025ad03ff47b35fc9e', 'stage_c3c44e1152ae11025ad03ff47b35fc9e');
		module.drawElement("#stage_c3c44e1152ae11025ad03ff47b35fc9e");  
	});
};
var Image_ImageModule_36_stage_c3c44e1152ae11025ad03ff47b35fc9e = function() {
	
	var rawConfig = '{\"title\":\"ImageModule_36\",\"parent\":\"stage\",\"layer\":\"default\",\"width\":\"559px\",\"height\":\"155px\",\"top\":\"0px\",\"left\":\"-1px\",\"display\":\"block\",\"displayoncollapse\":\"none\",\"stagestate\":\"Normal\",\"defaultImage_url\":\"http:\\/\\/ads.jetpackdigital.com\\/sites\\/_uploads\\/1341017650NIKE_250_TITLE.png\",\"defaultImage\":\"NIKE_250_TITLE\"}';
	var config = eval("(" + rawConfig + ")");
	
	var origconfig = null;
	
	origconfig = config;
	config = jpGetDatedConfig(config);
	
	var id = "image_ImageModule_36_stage_c3c44e1152ae11025ad03ff47b35fc9e";
	var layer = (config.layer) ? "jp_" + config.layer : "jp_default";
	var element = null;
	
	var attributes = jpGetAttributes(config,false);
	var stagestate = jpGetStageStates(config,false);
	
	var defaultImage = config.defaultImage_url;
	
	var stage_id = "#stage_c3c44e1152ae11025ad03ff47b35fc9e";
	
	var trackingEvents = new Array();
	
	var hide = function() {
		JP(element).hide();
	};
	
	var show = function() {
			JP(element).show();
	};
	
	var updateImage = function(image_id) {
		var url = config[image_id + "_url"];
		JP(element).css("backgroundImage","url(" + url + ")");
		JP(element).css("backgroundRepeat","no-repeat");
	};
	

	var getImage = function(image_id) {
		return config[image_id + "_url"];
	};

	this.drawElement = function(targetElement) {
		this.module = document.createElement("div");
		JP(this.module).attr("id",id);
		
		JP(this.module).attr("class",id + "_default " + layer + " " + stagestate);
		
		JP(this.module).css("position","absolute");
		JP(this.module).css("height",config.height);
		JP(this.module).css("width",config.width);
		JP(this.module).css("left",config.left);
		JP(this.module).css("top",config.top);
		JP(this.module).css("font-size","10px");
		
		if(config.addclass) {
			JP(this.module).addClass(config.addclass);
		}
		
		for(var a in attributes) {
        	if(typeof attributes[a] == "string") {
				JP(this.module).attr(a.replace(" ","_"),attributes[a]);
			}

        }		
		// Update css, if it exists
				if(config.css) {
					var csselements = config.css.split(";");
					for(var i = 0; i < csselements.length; i++) {
						var comps = csselements[i].split(":");
						JP(this.module).css(comps[0],comps[1]);
					}
				}
		
		
		
		if(config.zIndex) {
			JP(this.module).css("z-index",config.zIndex);
		}

				
		if(config.paddingtop) {
			JP(this.module).css("padding-top",config.paddingtop);	
		}
		
		if(config.fontfamily) {
			JP(this.module).css("font-family",config.fontfamily);	
		}
		
		if(config.fontcolor) {
			JP(this.module).css("color",config.fontcolor);	
		}
		
		if(config.fontsize) {
			JP(this.module).css("font-size",config.fontsize);	
		}
		
		if(config.display) {
			if(config.display && config.display == "true") { 
				config.display = "block";
			} else if (config.display && config.display == "false") {
				config.display = "none";
			} else if(!config.display) {
				config.display = "block";
			}
			JP(this.module).css("display",config.display);
		}

		
		element = this.module;
		
		var stylecss = "";
		
		if(typeof(defaultImage) != "undefined" && defaultImage != "") {
			stylecss += "." + id + "_default {background: transparent url(" + defaultImage + ") no-repeat;}";
			JP(element).css("background","transparent url(" + defaultImage + ") no-repeat");
			JP(this.module).append("<img src='" + defaultImage + "' style='position: absolute; top: -9999px;'/>");
		} 
		
		stage.updateStyleSheet(stylecss);
				
				
		/*if(jpdGetCookie("stage_c3c44e1152ae11025ad03ff47b35fc9e_c") == "1") {
			if(config.displayoncollapse == "false") {
				JP(element).css("display","none");
			} else if(config.displayoncollapse == "true"){
				JP(element).css("display","block");
			}
		}*/
		
		if(jpdGetCookie("stage_c3c44e1152ae11025ad03ff47b35fc9e_c") == "1") {
			if(config.displayoncollapse == "true") { 
				config.displayoncollapse = "block";
			} else if(config.displayoncollapse == "false") {
				config.displayoncollapse = "none";
			}
			JP(this.module).css("display",config.displayoncollapse);
		}
		
		
		JP(targetElement).append(this.module);
		
		
		JP(this.module).bind("click", function() {
			if(config.clickEvent) {
				JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").trigger(config.clickEvent, id);
			}
		});
		

		
									JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").bind("clickPlay",function(){ 
					hide();				});
							JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").bind("clickWatch",function(){ 
					hide();				});
							JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").bind("clickClose",function(){ 
					hide();				});
							JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").bind("clickCollapse",function(){ 
					show();				});
							JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").bind("stageCollapsed",function(){ 
					hide();				});
							JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").bind("expandStage",function(){ 
					show();				});
							
		if(config.mouseOverEvent) {
			JP(this.module).bind("mouseover", function() {
				JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").trigger(config.mouseOverEvent);
			});
		}
		
		if(config.mouseOutEvent) {
			JP(this.module).bind("mouseout", function() {
				JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").trigger(config.mouseOutEvent);
			});
		}
		
		for(var key in config) {
			if(key.match(/_url$/)) {
				var path = config[key];
				JP(this.module).append("<img src='" + path + "' style='position: absolute; top: -9999px;'/>");
			}
		}

		
	};
};


var module = null;

if(jpinlineunit) {
	module = new Image_ImageModule_36_stage_c3c44e1152ae11025ad03ff47b35fc9e();
	module.drawElement("#stage_c3c44e1152ae11025ad03ff47b35fc9e");
} else {
	jpElementReady("stage_c3c44e1152ae11025ad03ff47b35fc9e",function() { 
		module = new Image_ImageModule_36_stage_c3c44e1152ae11025ad03ff47b35fc9e();
		module.drawElement("#stage_c3c44e1152ae11025ad03ff47b35fc9e");
	});
};
var Image_ImageModule_40_stage_c3c44e1152ae11025ad03ff47b35fc9e = function() {
	
	var rawConfig = '{\"title\":\"ImageModule_40\",\"parent\":\"stage\",\"layer\":\"default\",\"width\":\"495px\",\"height\":\"405px\",\"top\":\"-27px\",\"left\":\"541px\",\"display\":\"none\",\"displayoncollapse\":\"none\",\"stagestate\":\"Normal\",\"defaultImage_url\":\"http:\\/\\/ads.jetpackdigital.com\\/sites\\/_uploads\\/13412523861341252386NIKE_250_HOOP_REV.png\",\"defaultImage\":\"NIKE_250_HOOP_REV\"}';
	var config = eval("(" + rawConfig + ")");
	
	var origconfig = null;
	
	origconfig = config;
	config = jpGetDatedConfig(config);
	
	var id = "image_ImageModule_40_stage_c3c44e1152ae11025ad03ff47b35fc9e";
	var layer = (config.layer) ? "jp_" + config.layer : "jp_default";
	var element = null;
	
	var attributes = jpGetAttributes(config,false);
	var stagestate = jpGetStageStates(config,false);
	
	var defaultImage = config.defaultImage_url;
	
	var stage_id = "#stage_c3c44e1152ae11025ad03ff47b35fc9e";
	
	var trackingEvents = new Array();
	
	var hide = function() {
		JP(element).hide();
	};
	
	var show = function() {
			JP(element).show();
	};
	
	var updateImage = function(image_id) {
		var url = config[image_id + "_url"];
		JP(element).css("backgroundImage","url(" + url + ")");
		JP(element).css("backgroundRepeat","no-repeat");
	};
	

	var getImage = function(image_id) {
		return config[image_id + "_url"];
	};

	this.drawElement = function(targetElement) {
		this.module = document.createElement("div");
		JP(this.module).attr("id",id);
		
		JP(this.module).attr("class",id + "_default " + layer + " " + stagestate);
		
		JP(this.module).css("position","absolute");
		JP(this.module).css("height",config.height);
		JP(this.module).css("width",config.width);
		JP(this.module).css("left",config.left);
		JP(this.module).css("top",config.top);
		JP(this.module).css("font-size","10px");
		
		if(config.addclass) {
			JP(this.module).addClass(config.addclass);
		}
		
		for(var a in attributes) {
        	if(typeof attributes[a] == "string") {
				JP(this.module).attr(a.replace(" ","_"),attributes[a]);
			}

        }		
		// Update css, if it exists
				if(config.css) {
					var csselements = config.css.split(";");
					for(var i = 0; i < csselements.length; i++) {
						var comps = csselements[i].split(":");
						JP(this.module).css(comps[0],comps[1]);
					}
				}
		
		
		
		if(config.zIndex) {
			JP(this.module).css("z-index",config.zIndex);
		}

				
		if(config.paddingtop) {
			JP(this.module).css("padding-top",config.paddingtop);	
		}
		
		if(config.fontfamily) {
			JP(this.module).css("font-family",config.fontfamily);	
		}
		
		if(config.fontcolor) {
			JP(this.module).css("color",config.fontcolor);	
		}
		
		if(config.fontsize) {
			JP(this.module).css("font-size",config.fontsize);	
		}
		
		if(config.display) {
			if(config.display && config.display == "true") { 
				config.display = "block";
			} else if (config.display && config.display == "false") {
				config.display = "none";
			} else if(!config.display) {
				config.display = "block";
			}
			JP(this.module).css("display",config.display);
		}

		
		element = this.module;
		
		var stylecss = "";
		
		if(typeof(defaultImage) != "undefined" && defaultImage != "") {
			stylecss += "." + id + "_default {background: transparent url(" + defaultImage + ") no-repeat;}";
			JP(element).css("background","transparent url(" + defaultImage + ") no-repeat");
			JP(this.module).append("<img src='" + defaultImage + "' style='position: absolute; top: -9999px;'/>");
		} 
		
		stage.updateStyleSheet(stylecss);
				
				
		/*if(jpdGetCookie("stage_c3c44e1152ae11025ad03ff47b35fc9e_c") == "1") {
			if(config.displayoncollapse == "false") {
				JP(element).css("display","none");
			} else if(config.displayoncollapse == "true"){
				JP(element).css("display","block");
			}
		}*/
		
		if(jpdGetCookie("stage_c3c44e1152ae11025ad03ff47b35fc9e_c") == "1") {
			if(config.displayoncollapse == "true") { 
				config.displayoncollapse = "block";
			} else if(config.displayoncollapse == "false") {
				config.displayoncollapse = "none";
			}
			JP(this.module).css("display",config.displayoncollapse);
		}
		
		
		JP(targetElement).append(this.module);
		
		
		JP(this.module).bind("click", function() {
			if(config.clickEvent) {
				JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").trigger(config.clickEvent, id);
			}
		});
		

		
									JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").bind("clickPlay",function(){ 
					hide();				});
							JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").bind("clickClose",function(){ 
					hide();				});
							JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").bind("clickWatch",function(){ 
					hide();				});
							JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").bind("clickCollapse",function(){ 
					show();				});
							JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").bind("stageCollapsed",function(){ 
					hide();				});
							JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").bind("stageExpandedNormal",function(){ 
					show();				});
							JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").bind("stageExpandedLarge",function(){ 
					hide();				});
							JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").bind("expandStage",function(){ 
					hide();				});
							JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").bind("stageLoaded",function(){ 
					JP(document).bind("teaserVideoEnded",function() { show(); });				});
							
		if(config.mouseOverEvent) {
			JP(this.module).bind("mouseover", function() {
				JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").trigger(config.mouseOverEvent);
			});
		}
		
		if(config.mouseOutEvent) {
			JP(this.module).bind("mouseout", function() {
				JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").trigger(config.mouseOutEvent);
			});
		}
		
		for(var key in config) {
			if(key.match(/_url$/)) {
				var path = config[key];
				JP(this.module).append("<img src='" + path + "' style='position: absolute; top: -9999px;'/>");
			}
		}

		
	};
};


var module = null;

if(jpinlineunit) {
	module = new Image_ImageModule_40_stage_c3c44e1152ae11025ad03ff47b35fc9e();
	module.drawElement("#stage_c3c44e1152ae11025ad03ff47b35fc9e");
} else {
	jpElementReady("stage_c3c44e1152ae11025ad03ff47b35fc9e",function() { 
		module = new Image_ImageModule_40_stage_c3c44e1152ae11025ad03ff47b35fc9e();
		module.drawElement("#stage_c3c44e1152ae11025ad03ff47b35fc9e");
	});
};
var Image_ImageModule_44_stage_c3c44e1152ae11025ad03ff47b35fc9e = function() {
	
	var rawConfig = '{\"title\":\"ImageModule_44\",\"parent\":\"stage\",\"layer\":\"default\",\"width\":\"100px\",\"height\":\"100px\",\"top\":\"15px\",\"left\":\"-200px\",\"stagestate\":\"All\",\"image1_url\":\"http:\\/\\/ads.jetpackdigital.com\\/sites\\/_uploads\\/1341017651NIKE_667_STATIC.jpg\",\"image1\":\"NIKE_667_STATIC\"}';
	var config = eval("(" + rawConfig + ")");
	
	var origconfig = null;
	
	origconfig = config;
	config = jpGetDatedConfig(config);
	
	var id = "image_ImageModule_44_stage_c3c44e1152ae11025ad03ff47b35fc9e";
	var layer = (config.layer) ? "jp_" + config.layer : "jp_default";
	var element = null;
	
	var attributes = jpGetAttributes(config,false);
	var stagestate = jpGetStageStates(config,false);
	
	var defaultImage = config.defaultImage_url;
	
	var stage_id = "#stage_c3c44e1152ae11025ad03ff47b35fc9e";
	
	var trackingEvents = new Array();
	
	var hide = function() {
		JP(element).hide();
	};
	
	var show = function() {
			JP(element).show();
	};
	
	var updateImage = function(image_id) {
		var url = config[image_id + "_url"];
		JP(element).css("backgroundImage","url(" + url + ")");
		JP(element).css("backgroundRepeat","no-repeat");
	};
	

	var getImage = function(image_id) {
		return config[image_id + "_url"];
	};

	this.drawElement = function(targetElement) {
		this.module = document.createElement("div");
		JP(this.module).attr("id",id);
		
		JP(this.module).attr("class",id + "_default " + layer + " " + stagestate);
		
		JP(this.module).css("position","absolute");
		JP(this.module).css("height",config.height);
		JP(this.module).css("width",config.width);
		JP(this.module).css("left",config.left);
		JP(this.module).css("top",config.top);
		JP(this.module).css("font-size","10px");
		
		if(config.addclass) {
			JP(this.module).addClass(config.addclass);
		}
		
		for(var a in attributes) {
        	if(typeof attributes[a] == "string") {
				JP(this.module).attr(a.replace(" ","_"),attributes[a]);
			}

        }		
		// Update css, if it exists
				if(config.css) {
					var csselements = config.css.split(";");
					for(var i = 0; i < csselements.length; i++) {
						var comps = csselements[i].split(":");
						JP(this.module).css(comps[0],comps[1]);
					}
				}
		
		
		
		if(config.zIndex) {
			JP(this.module).css("z-index",config.zIndex);
		}

				
		if(config.paddingtop) {
			JP(this.module).css("padding-top",config.paddingtop);	
		}
		
		if(config.fontfamily) {
			JP(this.module).css("font-family",config.fontfamily);	
		}
		
		if(config.fontcolor) {
			JP(this.module).css("color",config.fontcolor);	
		}
		
		if(config.fontsize) {
			JP(this.module).css("font-size",config.fontsize);	
		}
		
		if(config.display) {
			if(config.display && config.display == "true") { 
				config.display = "block";
			} else if (config.display && config.display == "false") {
				config.display = "none";
			} else if(!config.display) {
				config.display = "block";
			}
			JP(this.module).css("display",config.display);
		}

		
		element = this.module;
		
		var stylecss = "";
		
		if(typeof(defaultImage) != "undefined" && defaultImage != "") {
			stylecss += "." + id + "_default {background: transparent url(" + defaultImage + ") no-repeat;}";
			JP(element).css("background","transparent url(" + defaultImage + ") no-repeat");
			JP(this.module).append("<img src='" + defaultImage + "' style='position: absolute; top: -9999px;'/>");
		} 
		
		stage.updateStyleSheet(stylecss);
				
				
		/*if(jpdGetCookie("stage_c3c44e1152ae11025ad03ff47b35fc9e_c") == "1") {
			if(config.displayoncollapse == "false") {
				JP(element).css("display","none");
			} else if(config.displayoncollapse == "true"){
				JP(element).css("display","block");
			}
		}*/
		
		if(jpdGetCookie("stage_c3c44e1152ae11025ad03ff47b35fc9e_c") == "1") {
			if(config.displayoncollapse == "true") { 
				config.displayoncollapse = "block";
			} else if(config.displayoncollapse == "false") {
				config.displayoncollapse = "none";
			}
			JP(this.module).css("display",config.displayoncollapse);
		}
		
		
		JP(targetElement).append(this.module);
		
		
		JP(this.module).bind("click", function() {
			if(config.clickEvent) {
				JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").trigger(config.clickEvent, id);
			}
		});
		

		
									JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").bind("stageLoaded",function(){ 
					JP(document).bind("mainVideoEnded",function() { JP("#jp_supervideoplayerimage").attr("src",getImage("image1")).show(); }); JP(document).bind("teaserVideoEnded",function() { JP("#jp_supervideoplayerimage").attr("src","http://ads.jetpackdigital.com/tracking_pixel.gif");});				});
							JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").bind("stageExpandedNormal",function(){ 
					JP("#jp_supervideoplayerimage").attr("src","http://ads.jetpackdigital.com/tracking_pixel.gif");				});
							JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").bind("clickClose",function(){ 
					JP("#jp_supervideoplayerimage").attr("src","http://ads.jetpackdigital.com/tracking_pixel.gif");				});
							JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").bind("clickCollapse",function(){ 
					JP("#jp_supervideoplayerimage").attr("src","http://ads.jetpackdigital.com/tracking_pixel.gif");				});
							JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").bind("stageCollapsed",function(){ 
					JP("#jp_supervideoplayerimage").attr("src","http://ads.jetpackdigital.com/tracking_pixel.gif");				});
							
		if(config.mouseOverEvent) {
			JP(this.module).bind("mouseover", function() {
				JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").trigger(config.mouseOverEvent);
			});
		}
		
		if(config.mouseOutEvent) {
			JP(this.module).bind("mouseout", function() {
				JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").trigger(config.mouseOutEvent);
			});
		}
		
		for(var key in config) {
			if(key.match(/_url$/)) {
				var path = config[key];
				JP(this.module).append("<img src='" + path + "' style='position: absolute; top: -9999px;'/>");
			}
		}

		
	};
};


var module = null;

if(jpinlineunit) {
	module = new Image_ImageModule_44_stage_c3c44e1152ae11025ad03ff47b35fc9e();
	module.drawElement("#stage_c3c44e1152ae11025ad03ff47b35fc9e");
} else {
	jpElementReady("stage_c3c44e1152ae11025ad03ff47b35fc9e",function() { 
		module = new Image_ImageModule_44_stage_c3c44e1152ae11025ad03ff47b35fc9e();
		module.drawElement("#stage_c3c44e1152ae11025ad03ff47b35fc9e");
	});
};
var Image_ImageModule_55_stage_c3c44e1152ae11025ad03ff47b35fc9e = function() {
	
	var rawConfig = '{\"title\":\"ImageModule_55\",\"parent\":\"stage\",\"layer\":\"default\",\"width\":\"242px\",\"height\":\"81px\",\"top\":\"0px\",\"left\":\"730px\",\"display\":\"none\",\"displayoncollapse\":\"true\",\"stagestate\":\"Collapsed\",\"defaultImage_url\":\"http:\\/\\/ads.jetpackdigital.com\\/sites\\/_uploads\\/13412792401341279240NIKE_40PIX_BAR_HOOP_81.png\",\"defaultImage\":\"NIKE_40PIX_BAR_HOOP_81\"}';
	var config = eval("(" + rawConfig + ")");
	
	var origconfig = null;
	
	origconfig = config;
	config = jpGetDatedConfig(config);
	
	var id = "image_ImageModule_55_stage_c3c44e1152ae11025ad03ff47b35fc9e";
	var layer = (config.layer) ? "jp_" + config.layer : "jp_default";
	var element = null;
	
	var attributes = jpGetAttributes(config,false);
	var stagestate = jpGetStageStates(config,false);
	
	var defaultImage = config.defaultImage_url;
	
	var stage_id = "#stage_c3c44e1152ae11025ad03ff47b35fc9e";
	
	var trackingEvents = new Array();
	
	var hide = function() {
		JP(element).hide();
	};
	
	var show = function() {
			JP(element).show();
	};
	
	var updateImage = function(image_id) {
		var url = config[image_id + "_url"];
		JP(element).css("backgroundImage","url(" + url + ")");
		JP(element).css("backgroundRepeat","no-repeat");
	};
	

	var getImage = function(image_id) {
		return config[image_id + "_url"];
	};

	this.drawElement = function(targetElement) {
		this.module = document.createElement("div");
		JP(this.module).attr("id",id);
		
		JP(this.module).attr("class",id + "_default " + layer + " " + stagestate);
		
		JP(this.module).css("position","absolute");
		JP(this.module).css("height",config.height);
		JP(this.module).css("width",config.width);
		JP(this.module).css("left",config.left);
		JP(this.module).css("top",config.top);
		JP(this.module).css("font-size","10px");
		
		if(config.addclass) {
			JP(this.module).addClass(config.addclass);
		}
		
		for(var a in attributes) {
        	if(typeof attributes[a] == "string") {
				JP(this.module).attr(a.replace(" ","_"),attributes[a]);
			}

        }		
		// Update css, if it exists
				if(config.css) {
					var csselements = config.css.split(";");
					for(var i = 0; i < csselements.length; i++) {
						var comps = csselements[i].split(":");
						JP(this.module).css(comps[0],comps[1]);
					}
				}
		
		
		
		if(config.zIndex) {
			JP(this.module).css("z-index",config.zIndex);
		}

				
		if(config.paddingtop) {
			JP(this.module).css("padding-top",config.paddingtop);	
		}
		
		if(config.fontfamily) {
			JP(this.module).css("font-family",config.fontfamily);	
		}
		
		if(config.fontcolor) {
			JP(this.module).css("color",config.fontcolor);	
		}
		
		if(config.fontsize) {
			JP(this.module).css("font-size",config.fontsize);	
		}
		
		if(config.display) {
			if(config.display && config.display == "true") { 
				config.display = "block";
			} else if (config.display && config.display == "false") {
				config.display = "none";
			} else if(!config.display) {
				config.display = "block";
			}
			JP(this.module).css("display",config.display);
		}

		
		element = this.module;
		
		var stylecss = "";
		
		if(typeof(defaultImage) != "undefined" && defaultImage != "") {
			stylecss += "." + id + "_default {background: transparent url(" + defaultImage + ") no-repeat;}";
			JP(element).css("background","transparent url(" + defaultImage + ") no-repeat");
			JP(this.module).append("<img src='" + defaultImage + "' style='position: absolute; top: -9999px;'/>");
		} 
		
		stage.updateStyleSheet(stylecss);
				
				
		/*if(jpdGetCookie("stage_c3c44e1152ae11025ad03ff47b35fc9e_c") == "1") {
			if(config.displayoncollapse == "false") {
				JP(element).css("display","none");
			} else if(config.displayoncollapse == "true"){
				JP(element).css("display","block");
			}
		}*/
		
		if(jpdGetCookie("stage_c3c44e1152ae11025ad03ff47b35fc9e_c") == "1") {
			if(config.displayoncollapse == "true") { 
				config.displayoncollapse = "block";
			} else if(config.displayoncollapse == "false") {
				config.displayoncollapse = "none";
			}
			JP(this.module).css("display",config.displayoncollapse);
		}
		
		
		JP(targetElement).append(this.module);
		
		
		JP(this.module).bind("click", function() {
			if(config.clickEvent) {
				JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").trigger(config.clickEvent, id);
			}
		});
		

		
									JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").bind("clickPlay",function(){ 
					hide();				});
							JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").bind("clickWatch",function(){ 
					hide();				});
							JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").bind("stageCollapsed",function(){ 
					show();				});
							
		if(config.mouseOverEvent) {
			JP(this.module).bind("mouseover", function() {
				JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").trigger(config.mouseOverEvent);
			});
		}
		
		if(config.mouseOutEvent) {
			JP(this.module).bind("mouseout", function() {
				JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").trigger(config.mouseOutEvent);
			});
		}
		
		for(var key in config) {
			if(key.match(/_url$/)) {
				var path = config[key];
				JP(this.module).append("<img src='" + path + "' style='position: absolute; top: -9999px;'/>");
			}
		}

		
	};
};


var module = null;

if(jpinlineunit) {
	module = new Image_ImageModule_55_stage_c3c44e1152ae11025ad03ff47b35fc9e();
	module.drawElement("#stage_c3c44e1152ae11025ad03ff47b35fc9e");
} else {
	jpElementReady("stage_c3c44e1152ae11025ad03ff47b35fc9e",function() { 
		module = new Image_ImageModule_55_stage_c3c44e1152ae11025ad03ff47b35fc9e();
		module.drawElement("#stage_c3c44e1152ae11025ad03ff47b35fc9e");
	});
};
var Image_ImageModule_59_stage_c3c44e1152ae11025ad03ff47b35fc9e = function() {
	
	var rawConfig = '{\"title\":\"ImageModule_59\",\"parent\":\"stage\",\"layer\":\"default\",\"width\":\"35px\",\"height\":\"33px\",\"top\":\"588px\",\"left\":\"1043px\",\"display\":\"none\",\"displayoncollapse\":\"none\",\"stagestate\":\"Expanded\",\"defaultImage_url\":\"http:\\/\\/ads.jetpackdigital.com\\/sites\\/_uploads\\/1341017652NIKE_667_WATERMARK.png\",\"defaultImage\":\"NIKE_667_WATERMARK\"}';
	var config = eval("(" + rawConfig + ")");
	
	var origconfig = null;
	
	origconfig = config;
	config = jpGetDatedConfig(config);
	
	var id = "image_ImageModule_59_stage_c3c44e1152ae11025ad03ff47b35fc9e";
	var layer = (config.layer) ? "jp_" + config.layer : "jp_default";
	var element = null;
	
	var attributes = jpGetAttributes(config,false);
	var stagestate = jpGetStageStates(config,false);
	
	var defaultImage = config.defaultImage_url;
	
	var stage_id = "#stage_c3c44e1152ae11025ad03ff47b35fc9e";
	
	var trackingEvents = new Array();
	
	var hide = function() {
		JP(element).hide();
	};
	
	var show = function() {
			JP(element).show();
	};
	
	var updateImage = function(image_id) {
		var url = config[image_id + "_url"];
		JP(element).css("backgroundImage","url(" + url + ")");
		JP(element).css("backgroundRepeat","no-repeat");
	};
	

	var getImage = function(image_id) {
		return config[image_id + "_url"];
	};

	this.drawElement = function(targetElement) {
		this.module = document.createElement("div");
		JP(this.module).attr("id",id);
		
		JP(this.module).attr("class",id + "_default " + layer + " " + stagestate);
		
		JP(this.module).css("position","absolute");
		JP(this.module).css("height",config.height);
		JP(this.module).css("width",config.width);
		JP(this.module).css("left",config.left);
		JP(this.module).css("top",config.top);
		JP(this.module).css("font-size","10px");
		
		if(config.addclass) {
			JP(this.module).addClass(config.addclass);
		}
		
		for(var a in attributes) {
        	if(typeof attributes[a] == "string") {
				JP(this.module).attr(a.replace(" ","_"),attributes[a]);
			}

        }		
		// Update css, if it exists
				if(config.css) {
					var csselements = config.css.split(";");
					for(var i = 0; i < csselements.length; i++) {
						var comps = csselements[i].split(":");
						JP(this.module).css(comps[0],comps[1]);
					}
				}
		
		
		
		if(config.zIndex) {
			JP(this.module).css("z-index",config.zIndex);
		}

				
		if(config.paddingtop) {
			JP(this.module).css("padding-top",config.paddingtop);	
		}
		
		if(config.fontfamily) {
			JP(this.module).css("font-family",config.fontfamily);	
		}
		
		if(config.fontcolor) {
			JP(this.module).css("color",config.fontcolor);	
		}
		
		if(config.fontsize) {
			JP(this.module).css("font-size",config.fontsize);	
		}
		
		if(config.display) {
			if(config.display && config.display == "true") { 
				config.display = "block";
			} else if (config.display && config.display == "false") {
				config.display = "none";
			} else if(!config.display) {
				config.display = "block";
			}
			JP(this.module).css("display",config.display);
		}

		
		element = this.module;
		
		var stylecss = "";
		
		if(typeof(defaultImage) != "undefined" && defaultImage != "") {
			stylecss += "." + id + "_default {background: transparent url(" + defaultImage + ") no-repeat;}";
			JP(element).css("background","transparent url(" + defaultImage + ") no-repeat");
			JP(this.module).append("<img src='" + defaultImage + "' style='position: absolute; top: -9999px;'/>");
		} 
		
		stage.updateStyleSheet(stylecss);
				
				
		/*if(jpdGetCookie("stage_c3c44e1152ae11025ad03ff47b35fc9e_c") == "1") {
			if(config.displayoncollapse == "false") {
				JP(element).css("display","none");
			} else if(config.displayoncollapse == "true"){
				JP(element).css("display","block");
			}
		}*/
		
		if(jpdGetCookie("stage_c3c44e1152ae11025ad03ff47b35fc9e_c") == "1") {
			if(config.displayoncollapse == "true") { 
				config.displayoncollapse = "block";
			} else if(config.displayoncollapse == "false") {
				config.displayoncollapse = "none";
			}
			JP(this.module).css("display",config.displayoncollapse);
		}
		
		
		JP(targetElement).append(this.module);
		
		
		JP(this.module).bind("click", function() {
			if(config.clickEvent) {
				JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").trigger(config.clickEvent, id);
			}
		});
		

		
									JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").bind("clickPlay",function(){ 
					show();				});
							JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").bind("clickClose",function(){ 
					show();				});
							JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").bind("stageLoaded",function(){ 
					JP(document).bind("mainVideoEnded",function() { hide(); });				});
							JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").bind("clickReplay",function(){ 
					show();				});
							
		if(config.mouseOverEvent) {
			JP(this.module).bind("mouseover", function() {
				JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").trigger(config.mouseOverEvent);
			});
		}
		
		if(config.mouseOutEvent) {
			JP(this.module).bind("mouseout", function() {
				JP("#stage_c3c44e1152ae11025ad03ff47b35fc9e").trigger(config.mouseOutEvent);
			});
		}
		
		for(var key in config) {
			if(key.match(/_url$/)) {
				var path = config[key];
				JP(this.module).append("<img src='" + path + "' style='position: absolute; top: -9999px;'/>");
			}
		}

		
	};
};


var module = null;

if(jpinlineunit) {
	module = new Image_ImageModule_59_stage_c3c44e1152ae11025ad03ff47b35fc9e();
	module.drawElement("#stage_c3c44e1152ae11025ad03ff47b35fc9e");
} else {
	jpElementReady("stage_c3c44e1152ae11025ad03ff47b35fc9e",function() { 
		module = new Image_ImageModule_59_stage_c3c44e1152ae11025ad03ff47b35fc9e();
		module.drawElement("#stage_c3c44e1152ae11025ad03ff47b35fc9e");
	});
};
stage.updateStyleSheet("");

/* CUSTOM JS */



/* END CUSTOM JS */



			if(jpinlineunit) { 
				stage.drawStyleSheet(); 
				if(JP('#stage_c3c44e1152ae11025ad03ff47b35fc9e').attr('loadtrigger')) {
					JP('#stage_c3c44e1152ae11025ad03ff47b35fc9e').trigger(JP('#stage_c3c44e1152ae11025ad03ff47b35fc9e').attr('loadtrigger'));
				};
			
				JP('#stage_c3c44e1152ae11025ad03ff47b35fc9e').trigger('stageLoaded');
				JP(document).trigger('stageLoaded');
			/*} else { JP(document).ready(function() {*/
			} else { jpElementReady('stage_c3c44e1152ae11025ad03ff47b35fc9e',function() { 
				stage.drawStyleSheet(); 
				if(JP('#stage_c3c44e1152ae11025ad03ff47b35fc9e').attr('loadtrigger')) {
					JP('#stage_c3c44e1152ae11025ad03ff47b35fc9e').trigger(JP('#stage_c3c44e1152ae11025ad03ff47b35fc9e').attr('loadtrigger'));
				};
			
				JP('#stage_c3c44e1152ae11025ad03ff47b35fc9e').trigger('stageLoaded');
				JP(document).trigger('stageLoaded');
			});};
		
				
					shStageId = "stage_c3c44e1152ae11025ad03ff47b35fc9e";
				
						
				supervideoplayerwrapper = document.createElement("div");
				
				var videowidth = parseInt("1200".replace("px",""));
				var videoheight = parseInt("667".replace("px",""));
				
				if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i))) {
					var ww = JP("body").width(); //JP(window).width();
					
					if(videowidth > ww) {
						ow = videowidth;
						videowidth = ww;
						videoheight = Math.round((ww/omw) * videoheight);
					}
					
					supervideoplayerclosebutton = document.createElement("div");
					JP(supervideoplayerclosebutton).css("height","50px").css("width","50px").css("background","transparent url(http://ads.jetpackdigital.com/lib/close-button.png) no-repeat").css("position","absolute").css("top","20px").css("left",(JP(window).width()*2 - 60) + "px").hide().css("z-index","2000000095").css("zoom","50%");
					JP(supervideoplayerclosebutton).bind("click",function() {
						var vindex = (activeVideoIndex) ? (activeVideoIndex+1) : "";
						JP(document).trigger("mainVideo" + vindex + "Ended");
						
						JP(this).hide();
													JP(supervideoplayerwrapper).css("z-index","-1");
						
						JP("#supervideoplayerwrapper").css("top","0px");
						stopSuperVideo();
						showVideoImage();
						JP("#stageWrapper").show();
						
					});
					JP("body").append(supervideoplayerclosebutton);
				}
				
				JP(supervideoplayerwrapper).addClass("jp_supervideoplayerwrapper");
				JP(supervideoplayerwrapper).css("height",videoheight + "px").css("cursor","pointer");
				JP(supervideoplayerwrapper).css("width",videowidth + "px");
				JP(supervideoplayerwrapper).css("top","0px").css("overflow","hidden");
				
				
				
				supervideoplayerimage = document.createElement("img");
				JP(supervideoplayerimage).hide().attr("id","jp_supervideoplayerimage").attr("src",videoImageUrl).attr("border","0").css("height",videoheight + "px").css("width",videowidth + "px");
				
								
				JP(supervideoplayerwrapper).append(supervideoplayerimage);
				
				if(loadingImageUrl && loadingImageUrl != "") { 
					supervideoloadingimage = document.createElement("div");
					JP(supervideoloadingimage).hide().css("background","transparent url(" + loadingImageUrl + ") no-repeat").attr("border","0").css("height",mainvideoheight + "px").css("width",mainvideowidth + "px").css("z-index","2000000000").css("position","absolute").css("top","0px").css("left","0px").css("overflow","hidden").attr("id","jploadingimage");
					
					var jpLoadingImage = document.createElement("img");
					JP(jpLoadingImage).attr("src","http://ads.jetpackdigital.com/lib/ajax-loader.gif").attr("border","0").css("height","19px").css("width","220px").css("position","absolute").css("top","347px").css("left","485px");
					JP(supervideoloadingimage).append(jpLoadingImage);
					
					JP(supervideoplayerwrapper).append(supervideoloadingimage);
				}
				
				var left = Math.round((JP(window).width() - videowidth)/2);
				JP(supervideoplayerwrapper).css("left",left + "px");
								
				JP(window).resize(function() {
																		if(!showingTeaser) {
								videoToNormal();
								var left = Math.round((JP(window).width() - mainvideowidth)/2);
								JP(supervideoplayerwrapper).css("left",left + "px");
							} else {
								var left = Math.round((JP(window).width() - videowidth)/2);
							JP(supervideoplayerwrapper).css("left",left + "px");
							}
															});
				
				JP(supervideoplayerwrapper).css("position","absolute");
				
									JP(supervideoplayerwrapper).css("z-index","-1");
								JP(supervideoplayerwrapper).attr("id","supervideoplayerwrapper");
				
				JP(supervideoplayerwrapper).click(function() {
					window.open(clickThroughUrl, "_blank");
				});
			
				jpvideoplayer = document.createElement("div");
		
				JP(jpvideoplayer).css("position","relative");
				JP(jpvideoplayer).css("background-color","transparent");
				JP(jpvideoplayer).attr("id","jp_supervideoplayer");
				JP(jpvideoplayer).css("z-index","2000002");
				
				
				JP(jpvideoplayer).css("height",videoheight + "px");
				JP(jpvideoplayer).css("width",videowidth + "px");
				
				JP(supervideoplayerwrapper).append(JP(jpvideoplayer));
				
				if(teaserOverlayUrl && teaserOverlayUrl != "") {
					var teaserOverlay = document.createElement("div");
					JP(teaserOverlay).css("position","absolute").css("top","0px").css("left","0px");
					JP(teaserOverlay).css("background","transparent url(" + teaserOverlayUrl + ") no-repeat");
					JP(teaserOverlay).attr("id","jp_teaseroverlay");
					JP(teaserOverlay).css("z-index","3000002");
				
				
					JP(teaserOverlay).css("height",videoheight + "px");
					JP(teaserOverlay).css("width",videowidth + "px");
					
					JP(supervideoplayerwrapper).append(teaserOverlay);
				}
				
				
				JP("body").append(supervideoplayerwrapper);
				
									videoToNormal();
				
				var forceHTML5 = false;
				
				if(hasFlash && !forceHTML5) {
					// Create the playlist
					svplaylist = createPlaylist();
				
					setTimeout(loadSuperVideoPlayer, 100);
				} else if(supportsVideoTag) {
					// Setup HTML5 Video Player;
					if(!loadHTML5VideoPlayer() && forceHTML5) {
						setTimeout(loadSuperVideoPlayer, 100);
					}
				} else {
					showVideoImage();
				}
				
			
	},
	
		
	this.ReportDelivery = function() {
		if(!this.running) return;
		
				
		
		if(typeof ord == 'undefined') ord=Math.random()*1000000000;
		var imgdiv = document.createElement("div");
		JP(imgdiv).css("height","1px");
		JP(imgdiv).css("position","absolute").css("top","-9999px");
		var img = document.createElement("img");
		
		JP(img).attr("src",'http://jptracking.elasticbeanstalk.com/jpt?ord='+ord+'&lid=6351&c=0');
		JP(imgdiv).append(img);
		JP(document.body).prepend(JP(imgdiv));
		
			},
	
	this.ShowTracking = function() {
			}
};
 customunit_6351_0 = new supervideo_325__6351(); customunit_6351_0.Init(); customunit_6351_0.Run(); customunit_6351_0.ReportDelivery();};

	/* NO BANNER */
	

		if(typeof loadingswfobject == "undefined") {
			loadingswfobject = true;
			

			jpLoadScript("http://ads.jetpackdigital.com/swfobject.js",function() { 
				
				
									var jptimeout = 100;
							
				if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)){
 					var ffversion=new Number(RegExp.$1);
 					if (ffversion<4) {
 						if(jptimeout < 1500) {
 							jptimeout = 1500;
 						}
 					}			
 				}
				setTimeout("jpLoadJQuery_6351()",jptimeout);	
			});
		} else {
									var jptimeout = 100;
							
				
				if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)){
 					var ffversion=new Number(RegExp.$1);
 					if (ffversion<4) {
 						if(jptimeout < 1500) {
 							jptimeout = 1500;
 						}
 					}		
 				}
 				
 				
				setTimeout("jpLoadJQuery_6351()",jptimeout);
		}
};

};

};
