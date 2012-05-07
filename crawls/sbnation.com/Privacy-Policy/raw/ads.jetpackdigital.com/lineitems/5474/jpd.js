if(typeof loadedJp_5474 == "undefined") {
	loadedJp_5474 = true;


var jpiframe = false;
jp_dma = 1200;

if(0 && window!=window.top && typeof(requestedLineItemXDM) == "undefined") {
		
	// This is an iframe
	jpiframe = true;
	var iframesrc = location.href;
	var hostname = document.referrer.match(/(http.*?\/\/.*?)\//);
	var scrs = window.document.getElementsByTagName("script");
	var scr = "http://ads.jetpackdigital.com/lineitems/5474/jpd.js";
	
		
			var xdm = hostname[1] + "/jpd/jpxdm.html?ifr=" + escape(iframesrc) + "&src=" + escape(scr);
		
		
			
	if(typeof jpli != "undefined")  {
		xdm += "&jpli=" + jpli;
	} else {
		xdm += "&jpli=5474";
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
				document.write('<iframe id="jp_xdm" src="' + xdm + '" height=1 width=1 style="position: absolute;top:-999px;"></iframe>');
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
jpbannerunit = false;
jpeditorialunit = false;
jpinterstitialoverlay = false;
jpsiteoverlay = false;
jpswapassetunit = false;
jpsidekick = false;
jpinlineunit = false;
jppeelback = false;
jpsupervideo = false;
jpnull = null;

jp_skin = false;
jp_clickableskin = false;
jp_superheader = false;
jp_bannerunit = false;
jp_activeskin = false;
jp_sidekick = false;
jp_editorialunit = false;
jp_interstitialoverlay = false;
jp_inlineunit = false;
jp_siteoverlay = false;
jp_swapassetunit = false;
jp_peelback = false;
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
	loadedJp_5474 = null;
	delete loadedJp_5474;
	
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


// Load jQuery if it isn't loaded already
var dollarFunctionHolder = null;
var jQueryFunctionHolder = null;

function jpLoadJQuery_5474() {		
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
        				jpRunUnits5474();
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
					
        			setTimeout("jpLoadJQuery_5474()", jptimeout);
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
			jpRunUnits5474();   
		}
};

function jpRunUnits5474() {
	// Get the video license if it's available

	var loadedLineItems = new Array();
	var requestedLineItems = new Array();
		
		
	 
var animatebody = false;
var siteWidth = "990px";

var superheader_325__5474 = function() {
	this.lineItemId = 5474;
	
	this.runnable = false;
	this.running = false;
	superheaderBodyLoaded = false;

	var headerPoll;
	var bodyLoaded;
	var oldwindowopen;
	
		
				
	

	shStageId = null;
	
	if(typeof ord == "undefined") ord = Math.random()*100000000000; 
	var rawClickThrough = "http://ad.doubleclick.net/clk;255083552;77061621;e".replace("[random]",ord);
	var clickThroughUrl = "http://jptracking.elasticbeanstalk.com/jpc?ord="+ord+"&lid=5474&c=0";	

	var cid = "5474";
	var tp = 'http://jptracking.elasticbeanstalk.com/jpt?ord='+ord+'&lid=5474&c=0';
	
	this.Init = function() {
		JP("#jpsuperheader").html("");
       	JP("#supervideoplayerwrapper").html("");
       	
       	JP(document).bind("jpUnloadUnits",function() {
       		//alert("unloading superheader");
       	});
       	
		if(jpsuperheader) return;
		
			
		jpsuperheader = true;
		this.runnable = true;
		
				
															
										
			};
	
	CheckForBody_5474_0 = function() {
		
					var parentElement = ".network-bar-shadow";
				 
		
		if(JP(parentElement).length > 0) {
        	if(!superheaderBodyLoaded) {
        		        	
        		        			var appendElement = ".network-bar-shadow";
        			var prependElement = "";

					if(!(JP("#jpsuperheader").length > 0)) { 
	        			if(appendElement != "") {
	        				        				JP("<div id='jpsuperheader' style='height: auto; width: " + siteWidth + ";position: relative; margin: 0 auto; overflow: hidden;'><style type='text/css'>#jpsuperheader{width: 990px !important; margin-top: 5px !important;} #network_bar{z-index: 300000000 !important;} </style></div>").insertAfter(appendElement);
	        			} else if (prependElement != "") {
	        				        				JP("<div id='jpsuperheader' style='height: auto; width: " + siteWidth + ";position: relative; margin: 0 auto;overflow: hidden;'><style type='text/css'>#jpsuperheader{width: 990px !important; margin-top: 5px !important;} #network_bar{z-index: 300000000 !important;} </style></div>").insertBefore(prependElement);
	        			} else {
	        				        				JP(parentElement).prepend("<div id='jpsuperheader' style='height: auto; width: " + siteWidth + "; position: relative; margin: 0 auto; overflow: hidden;'><style type='text/css'>#jpsuperheader{width: 990px !important; margin-top: 5px !important;} #network_bar{z-index: 300000000 !important;} </style></div>");
	     				}
     				}
        			        	            	
        		
        		
        		 

        		            	
            	        		
       
            }
            
            this.RunCustomUnitSuperHeader_5474();
            superheaderBodyLoaded = true;
            
        } else {
        	setTimeout(CheckForBody_5474_0,100);			
     	}
     	
     				
		
	};

	this.Run =  function() {
	
		if(!this.runnable) return;
		
       	JP('#jpsuperheader').html("");
       	JP("#supervideoplayerwrapper").html("").remove();
		
				
		this.running = true;
		
				
												
			setTimeout(CheckForBody_5474_0,100);
						
				
				
	};
	overrideStageState = null;
	RunCustomUnitSuperHeader_5474 = function() {
				
				
		
				
stagecollapsed = false; 


var Stage_stage_20d3cacb2703eb690fba4bb2f2e414c4 = function() {
	
	var rawConfig = '{\"title\":\"SBNation - MIO Super Header\",\"width\":\"990px\",\"height\":\"418px\",\"autostate\":\"false\",\"backgroundImage_url\":\"http:\\/\\/ads.jetpackdigital.com\\/sites\\/_uploads\\/13310836281331083628KRAFT_HEADER_BG.jpg\",\"backgroundImage\":\"KRAFT_HEADER_BG\",\"backgroundImage2_url\":\"http:\\/\\/ads.jetpackdigital.com\\/sites\\/_uploads\\/13310836311331083631KRAFT_HEADER_COLLPASED.jpg\",\"backgroundImage2\":\"KRAFT_HEADER_COLLPASED\",\"autoexpandbutton\":\"true\",\"remembercollapsed\":\"true\",\"startcollapsed\":\"true\",\"expandedfrequencyper24\":\"12\",\"collapsedheight\":\"66px\",\"collapsetime\":\"250\",\"normalheight\":\"418px\",\"collapsedbackground\":\"background2\",\"normalbackground\":\"background1\"}';
	var config = eval("(" + rawConfig + ")");
	var element = null;
	
	var id = "stage_20d3cacb2703eb690fba4bb2f2e414c4";
	var stage_id = "stage_20d3cacb2703eb690fba4bb2f2e414c4";
	
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
		jpTrack = function(eventName) {
			if(!trackingEvents[eventName]) {
				var trackingpixel = "http://ads.jetpackdigital.com/tracking_pixel.gif?[random]";
                        	 
        		var trackingsrc =trackingpixel.replace("[random]",ord);
       			var trackingimg = new Image();
       		 	trackingimg.src = tp + "&t=" + eventName + "&u=" + trackingsrc;
				trackingEvents[eventName] = true;
			}
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
				JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").trigger("stageExpandedLarge");
				track("OpenToExpanded");
			}); 
			
			collapsed=false; 
			jpdSetCookie(stage_id + "_c","0",1,"/"); 
			
			
		} else { 
			collapsing = false; 
		}
		

	};
	this.toExpandedHeight = toExpandedHeight;
	
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
				JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").trigger("stageExpandedNormal");
				track("OpenToNormal");
				if(typeof activeAutoExpand == "undefined" || !activeAutoExpand) { 
					jpdSetCookie(stage_id + "_c","0",1,"/"); 
				} else {
					activeAutoExpand = false;
				}
			});

			/*JP(element).removeClass("background1").removeClass("background2").removeClass("background3").removeClass("background4").removeClass("background5").removeClass("background6").removeClass("background7").removeClass("background8");
			if(config.normalbackground) {
				JP(element).addClass(config.normalbackground);
			}  else {
				JP(element).addClass("background1");
			}
			
			JP(element).animate({height: config.normalheight},collapseTime, function() { 
				if(animatebody) { 
					JP("body").css("background-position","center " + config.normalheight);
				}
				JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").trigger("stageExpandedNormal");
				track("OpenToNormal");
			}); 
			
			collapsed=false;
			this.collapsed = false; 
			jpdSetCookie(stage_id + "_c","0",1,"/"); 
			*/
			
			
		} else { 
			collapsing = false; 
		}
		
	};
	this.toNormalHeight = toNormalHeight;
	
	var toCollapsedHeight = function() {
		if(!config.collapsedheight) {
			config.collapsedheight = "40px";
		}
		
		var collapseTime = (config.collapsetime) ? config.collapsetime : 250;
		jpdSetCookie(stage_id + "_c","1",1,"/");collapsing = true; 
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
			JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").trigger("stageCollapsed");
			
			JP(collapsedDiv).show();
			
			track("CloseToCollapsed");
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
        style.id = "style_stage_20d3cacb2703eb690fba4bb2f2e414c4";
		
        if( style.styleSheet )  // IE
                style.styleSheet.cssText = this.stylecss;
        else  // other browsers
                style.appendChild( document.createTextNode(this.stylecss) );

        var head = document.getElementsByTagName('head')[0];
        head.appendChild( style );
    };

	var trigger = function(event) {
		JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").trigger(event);
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
			var showExpanded = jpdGetCookie("stage_20d3cacb2703eb690fba4bb2f2e414c4_e");
			if(!showExpanded) {
				startcollapsed = false;
				var exp = 1/(parseInt(config.expandedfrequencyper24));
				jpdSetCookie("stage_20d3cacb2703eb690fba4bb2f2e414c4_e","1",exp,"/");
			} 
		}
		
		if(typeof overrideStageState == "undefined" || overrideStageState == null) {
			if(0) {
				overrideStageState = "collapsed";
			} else {
				overrideStageState = "normal";
			}
		}	
		
		if(overrideStageState == "collapsed" || startcollapsed || (config.remembercollapsed == "true" && jpdGetCookie("stage_20d3cacb2703eb690fba4bb2f2e414c4_c") == "1")) {
			JP(this.stage).css("height",config.collapsedheight);
			JP(this.stage).attr("class",config.collapsedbackground);
			collapsed = true;
			this.collapsed = true;
			stagecollapsed = true;
			jpdSetCookie("stage_20d3cacb2703eb690fba4bb2f2e414c4_c","1",1,"/");
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

		JP(this.stage).css("overflow","hidden");
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
		JP(collapsedDiv).attr("id",stage_id + "_collapsed"); 
		if(config.collapsedheight && (!config.autoexpandbutton || config.autoexpandbutton == "true")) {
			JP(collapsedDiv).css("height",config.collapsedheight);
				
			JP(collapsedDiv).css("display","none").css("width",config.width).css("cursor","pointer");
			JP(collapsedDiv).css("position","absolute").css("top","0px").css("left","0px").css("z-index","9999999");
			JP(collapsedDiv).click(function() {
				JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").trigger("expandStage");
				JP(this).hide();
				toNormalHeight();
			});
			JP(this.stage).append(JP(collapsedDiv));
			
			if(0 || (config.remembercollapsed == "true" && jpdGetCookie("stage_20d3cacb2703eb690fba4bb2f2e414c4_c") == "1")) {
				JP(collapsedDiv).show();
			}
		}
				
		JP(targetElement).append(this.stage);
		
		//this.stylecss = "";
		
		if(typeof(backgroundImage) != "undefined" && backgroundImage != "") {
			if(!backgroundColor) { backgroundColor = "transparent"; }
			this.stylecss += " #stage_20d3cacb2703eb690fba4bb2f2e414c4.background1 { background: " + backgroundColor + " url(" + backgroundImage + ") no-repeat !important} ";
			JP(this.stage).append("<img src='" + backgroundImage + "' style='position: absolute; top: -9999px;'>");
		} 
		
		if(typeof(backgroundImage2) != "undefined" && backgroundImage2 != "") {
			this.stylecss += " #stage_20d3cacb2703eb690fba4bb2f2e414c4.background2 { background: " + backgroundColor2 + " url(" + backgroundImage2 + ") no-repeat !important} ";
			JP(this.stage).append("<img src='" + backgroundImage2 + "' style='position: absolute; top: -9999px;'>");
		}
		
		if(typeof(backgroundImage3) != "undefined" && backgroundImage3 != "") {
			this.stylecss += " #stage_20d3cacb2703eb690fba4bb2f2e414c4.background3 { background: " + backgroundColor3 + " url(" + backgroundImage3 + ") no-repeat !important} ";
			JP(this.stage).append("<img src='" + backgroundImage3 + "' style='position: absolute; top: -9999px;'>");
		}
		
		if(typeof(backgroundImage4) != "undefined" && backgroundImage4 != "") {
			this.stylecss += " #stage_20d3cacb2703eb690fba4bb2f2e414c4.background4 { background: " + backgroundColor4 + " url(" + backgroundImage4 + ") no-repeat !important} ";
			JP(this.stage).append("<img src='" + backgroundImage4 + "' style='position: absolute; top: -9999px;'>");
		}
		
		if(typeof(backgroundImage5) != "undefined" && backgroundImage5 != "") {
			this.stylecss += " #stage_20d3cacb2703eb690fba4bb2f2e414c4.background5 { background: " + backgroundColor5 + " url(" + backgroundImage5 + ") no-repeat !important} ";
			JP(this.stage).append("<img src='" + backgroundImage5 + "' style='position: absolute; top: -9999px;'>");
		}
		
		if(typeof(backgroundImage6) != "undefined" && backgroundImage6 != "") {
			this.stylecss += " #stage_20d3cacb2703eb690fba4bb2f2e414c4.background6 { background: " + backgroundColor6 + " url(" + backgroundImage6 + ") no-repeat !important} ";
			JP(this.stage).append("<img src='" + backgroundImage6 + "' style='position: absolute; top: -9999px;'>");
		}
		
		if(typeof(backgroundImage7) != "undefined" && backgroundImage7 != "") {
			this.stylecss += " #stage_20d3cacb2703eb690fba4bb2f2e414c4.background7 { background: " + backgroundColor7 + " url(" + backgroundImage7 + ") no-repeat !important} ";
			JP(this.stage).append("<img src='" + backgroundImage7 + "' style='position: absolute; top: -9999px;'>");
		}
		
		if(typeof(backgroundImage8) != "undefined" && backgroundImage8 != "") {
			this.stylecss += " #stage_20d3cacb2703eb690fba4bb2f2e414c4.background8 { background: " + backgroundColor8 + " url(" + backgroundImage8 + ") no-repeat !important} ";
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
				
									JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").bind("clickClose",function(){ 
					toCollapsedHeight();				});
							JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").bind("clickThrough",function(){ 
					window.open(clickThroughUrl,"_blank");				});
							JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").bind("videoCompleted",function(){ 
					jpdTimer = setTimeout(function(){toCollapsedHeight();},7000);				});
							JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").bind("clickMainVideo",function(){ 
									});
							JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").bind("stageLoaded",function(){ 
					jpdTimer = setTimeout(function(){toCollapsedHeight(); track("autoCollapsed");},7000);				});
							JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").bind("clickPlay",function(){ 
					clearTimeout(jpdTimer);				});
							JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").bind("expandStage",function(){ 
					clearTimeout(jpdTimer);				});
							JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").bind("clickReplay",function(){ 
					clearTimeout(jpdTimer);				});
						
		JP(this.stage).bind("click", function(event) {
			//if(event.currentTarget.id == id) {
				if(config.clickevent) {
					JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").trigger(config.clickevent, id);
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
				JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").trigger(config.triggeronload);
			});*/
		}
		
		if(parseInt(config.autocollapsetime) > 0) {
			setTimeout(function() { JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").trigger("clickClose"); }, parseInt(config.autocollapsetime) * 1000);
		}
		
	};
};


var stage = null;




if(jpinlineunit || (typeof forcejpinline != "undefined" && forcejpinline)) {
	var telem = "jpsuperheader";
	if(typeof overrideElem != "undefined") {
		telem = overrideElem;
	}
	stage = new Stage_stage_20d3cacb2703eb690fba4bb2f2e414c4();
	stage.drawElement("#" + telem);
} else {
	/*JP(document).ready(function() {*/
	var telem = "jpsuperheader";
	if(typeof overrideElem != "undefined") {
		telem = overrideElem;
	}
	stage = new Stage_stage_20d3cacb2703eb690fba4bb2f2e414c4();
	jpElementReady(telem,function() {
		stage.drawElement("#" + telem);
		closeJPSuperheader = function() {
			JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").trigger("collapseStage");
		};

		expandJPSuperheader = function() {
			JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").trigger("expandStage");
			stage.toNormalHeight();
		};
	});
}

var JPButton_stage_20d3cacb2703eb690fba4bb2f2e414c4 = function(settings, rawHandlers, button_id, stg_id) {
	
	var rawConfig = settings; 
	var config = eval("(" + rawConfig + ")");

	var stage_id = stg_id;
	var eventHandlers = eval("(" + rawHandlers + ")");
	var id = button_id;
	var layer = (config.layer) ? "jp_" + config.layer : "jp_default";
	var stagestate = (config.stagestate) ? "jp_" + config.stagestate.toLowerCase() : "jp_all";
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
	}
	
	var handlers = new Array();
		
	for(var i = 0; i < eventHandlers.length; i++) {
		var handler = eventHandlers[i];
		handlers[handler.event] = handler.handlerCode;
		//eval("this." + handler.event + " = function() {" +  handler.handlerCode + "}");
		JP("#" + stage_id).bind(handler.event,function(event) {
			eval(handlers[event.type]);
		});
	}		

	var hide = function() {
		JP(element).hide();
	};
	
	var show = function() {
		JP(element).show();
	};
	
	var trigger = function(event) {
		JP("#" + stage_id).trigger(event);
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
		JP(element).attr("class",id + "_disabled");
		JP(element).css("cursor","default");
		
		disabled = true;
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
			JP(this.module).attr("class",id + "_disabled");
		}
		
		// Check to see if this button should be selected
		if(parseInt(config.enableOnDate) == parseInt(currentDate)) {
			JP(this.module).attr("class", id + "_selected"); 
			selected = true;
			
			JP("#" + stage_id).attr("loadtrigger",config.clickEvent);
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
		
		if(config.displayoncollapse && jpdGetCookie(stage_id + "_c") == "1") {
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
			JP(element).attr("class", id + "_selected"); 
			selected = true;
		}
		
		stage.updateStyleSheet(stylecss);
		
		
		
				
		var cacheHoverImageElement = document.createElement("div");
		JP(cacheHoverImageElement).css("position","absolute");
		JP(cacheHoverImageElement).css("left","-9999px");
		JP(cacheHoverImageElement).attr("class",id + "_hover");
		JP(targetElement).append(JP(cacheHoverImageElement));

		
		if(config.hoverImage && (!config.defaultState || config.defaultState != "disabled" || (config.enableOnDate && parseInt(config.enableOnDate) <= parseInt(currentDate)))) {
			JP(this.module).mouseover(function() {
				if(!selected && !disabled) {
					JP(element).attr("class",id + "_hover");
				} 
			});
			
			JP(this.module).mouseout(function() {
				if(!selected && !disabled) {
					JP(element).attr("class",id + "_default");
				}
			});
			//style += "#" + id + "_cache {  background: transparent url(" + hoverImage + ") no-repeat !important;}"; 
			//style += "#" + id + ":hover { background: transparent url(" + hoverImage + ") no-repeat !important;}";
		}
		
		if(jpdGetCookie(stage_id + "_c") == "1") {
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
					JP("#" + stage_id).trigger(config.clickEvent);
				}
				
				if(config.clickthroughurl) {
					window.open(tp + "&t=" + config.title + "_clickthrough&u="+config.clickthroughurl, "_blank");
				}

			});
		}
		
		
		if(config.triggeronload) {
			JP("#" + stage_id).trigger(config.triggeronload);
		}
		
		if(config.mouseOverEvent) {
			JP(this.module).bind("mouseover", function() {
				JP("#" + stage_id).trigger(config.mouseOverEvent);
			});
		}
		
		if(config.mouseOutEvent) {
			JP(this.module).bind("mouseout", function() {
				JP("#" + stage_id).trigger(config.mouseOutEvent);
			});
		}
	};
};

var module = null;

if(jpinlineunit) {
	module = new JPButton_stage_20d3cacb2703eb690fba4bb2f2e414c4('{\"title\":\"close button\",\"parent\":\"stage\",\"stagestate\":\"Normal\",\"layer\":\"default\",\"width\":\"99px\",\"height\":\"33px\",\"top\":\"-1px\",\"left\":\"881px\",\"display\":\"block\",\"displayoncollapse\":\"none\",\"zIndex\":\"200000000\",\"clickEvent\":\"clickClose\"}', '[{\"event\":\"stageCollapsed\",\"handlerCode\":\"hide();\"},{\"event\":\"expandStage\",\"handlerCode\":\"show();\"},{\"event\":\"clickClose\",\"handlerCode\":\"hide();\"}]','Button_ButtonModule_2_stage_20d3cacb2703eb690fba4bb2f2e414c4', 'stage_20d3cacb2703eb690fba4bb2f2e414c4');
	module.drawElement("#stage_20d3cacb2703eb690fba4bb2f2e414c4");
} else {
	jpElementReady("stage_20d3cacb2703eb690fba4bb2f2e414c4",function() { 
		module = new JPButton_stage_20d3cacb2703eb690fba4bb2f2e414c4('{\"title\":\"close button\",\"parent\":\"stage\",\"stagestate\":\"Normal\",\"layer\":\"default\",\"width\":\"99px\",\"height\":\"33px\",\"top\":\"-1px\",\"left\":\"881px\",\"display\":\"block\",\"displayoncollapse\":\"none\",\"zIndex\":\"200000000\",\"clickEvent\":\"clickClose\"}', '[{\"event\":\"stageCollapsed\",\"handlerCode\":\"hide();\"},{\"event\":\"expandStage\",\"handlerCode\":\"show();\"},{\"event\":\"clickClose\",\"handlerCode\":\"hide();\"}]', 'Button_ButtonModule_2_stage_20d3cacb2703eb690fba4bb2f2e414c4', 'stage_20d3cacb2703eb690fba4bb2f2e414c4');
		module.drawElement("#stage_20d3cacb2703eb690fba4bb2f2e414c4");  
	});
};

var module = null;

if(jpinlineunit) {
	module = new JPButton_stage_20d3cacb2703eb690fba4bb2f2e414c4('{\"title\":\"clickthrough button\",\"parent\":\"stage\",\"stagestate\":\"All\",\"layer\":\"default\",\"width\":\"990px\",\"height\":\"418px\",\"top\":\"0px\",\"left\":\"0px\",\"zIndex\":\"10000\",\"clickEvent\":\"clickThrough\"}', '[{\"event\":\"clickClose\",\"handlerCode\":\"JP(element).css(\\\"width\\\",\\\"660px\\\").css(\\\"z-index\\\",\\\"10000000\\\");\"},{\"event\":\"stageCollapsed\",\"handlerCode\":\"JP(element).css(\\\"width\\\",\\\"660px\\\").css(\\\"z-index\\\",\\\"10000000\\\");\"},{\"event\":\"expandStage\",\"handlerCode\":\"JP(element).css(\\\"width\\\",\\\"990px\\\").css(\\\"z-index\\\",\\\"10000\\\");\"},{\"event\":\"stageLoaded\",\"handlerCode\":\"if(stagecollapsed){JP(element).css(\\\"width\\\",\\\"660px\\\").css(\\\"z-index\\\",\\\"10000000\\\");}\"}]','Button_ButtonModule_6_stage_20d3cacb2703eb690fba4bb2f2e414c4', 'stage_20d3cacb2703eb690fba4bb2f2e414c4');
	module.drawElement("#stage_20d3cacb2703eb690fba4bb2f2e414c4");
} else {
	jpElementReady("stage_20d3cacb2703eb690fba4bb2f2e414c4",function() { 
		module = new JPButton_stage_20d3cacb2703eb690fba4bb2f2e414c4('{\"title\":\"clickthrough button\",\"parent\":\"stage\",\"stagestate\":\"All\",\"layer\":\"default\",\"width\":\"990px\",\"height\":\"418px\",\"top\":\"0px\",\"left\":\"0px\",\"zIndex\":\"10000\",\"clickEvent\":\"clickThrough\"}', '[{\"event\":\"clickClose\",\"handlerCode\":\"JP(element).css(\\\"width\\\",\\\"660px\\\").css(\\\"z-index\\\",\\\"10000000\\\");\"},{\"event\":\"stageCollapsed\",\"handlerCode\":\"JP(element).css(\\\"width\\\",\\\"660px\\\").css(\\\"z-index\\\",\\\"10000000\\\");\"},{\"event\":\"expandStage\",\"handlerCode\":\"JP(element).css(\\\"width\\\",\\\"990px\\\").css(\\\"z-index\\\",\\\"10000\\\");\"},{\"event\":\"stageLoaded\",\"handlerCode\":\"if(stagecollapsed){JP(element).css(\\\"width\\\",\\\"660px\\\").css(\\\"z-index\\\",\\\"10000000\\\");}\"}]', 'Button_ButtonModule_6_stage_20d3cacb2703eb690fba4bb2f2e414c4', 'stage_20d3cacb2703eb690fba4bb2f2e414c4');
		module.drawElement("#stage_20d3cacb2703eb690fba4bb2f2e414c4");  
	});
};

var module = null;

if(jpinlineunit) {
	module = new JPButton_stage_20d3cacb2703eb690fba4bb2f2e414c4('{\"title\":\"play image button\",\"parent\":\"stage\",\"stagestate\":\"Normal\",\"layer\":\"default\",\"width\":\"601px\",\"height\":\"325px\",\"top\":\"52px\",\"left\":\"343px\",\"display\":\"block\",\"displayoncollapse\":\"none\",\"zIndex\":\"300000000\",\"defaultImage_url\":\"http:\\/\\/ads.jetpackdigital.com\\/sites\\/_uploads\\/13310836371331083637KRAFT_HEADER_THUMB.jpg\",\"defaultImage\":\"KRAFT_HEADER_THUMB\",\"clickEvent\":\"clickPlay\"}', '[{\"event\":\"clickClose\",\"handlerCode\":\"hide();\"},{\"event\":\"stageCollapsed\",\"handlerCode\":\"hide();\"},{\"event\":\"expandStage\",\"handlerCode\":\"hide();\"},{\"event\":\"clickPlay\",\"handlerCode\":\"hide();\"},{\"event\":\"videoCompleted\",\"handlerCode\":\"show();\"}]','Button_ButtonModule_14_stage_20d3cacb2703eb690fba4bb2f2e414c4', 'stage_20d3cacb2703eb690fba4bb2f2e414c4');
	module.drawElement("#stage_20d3cacb2703eb690fba4bb2f2e414c4");
} else {
	jpElementReady("stage_20d3cacb2703eb690fba4bb2f2e414c4",function() { 
		module = new JPButton_stage_20d3cacb2703eb690fba4bb2f2e414c4('{\"title\":\"play image button\",\"parent\":\"stage\",\"stagestate\":\"Normal\",\"layer\":\"default\",\"width\":\"601px\",\"height\":\"325px\",\"top\":\"52px\",\"left\":\"343px\",\"display\":\"block\",\"displayoncollapse\":\"none\",\"zIndex\":\"300000000\",\"defaultImage_url\":\"http:\\/\\/ads.jetpackdigital.com\\/sites\\/_uploads\\/13310836371331083637KRAFT_HEADER_THUMB.jpg\",\"defaultImage\":\"KRAFT_HEADER_THUMB\",\"clickEvent\":\"clickPlay\"}', '[{\"event\":\"clickClose\",\"handlerCode\":\"hide();\"},{\"event\":\"stageCollapsed\",\"handlerCode\":\"hide();\"},{\"event\":\"expandStage\",\"handlerCode\":\"hide();\"},{\"event\":\"clickPlay\",\"handlerCode\":\"hide();\"},{\"event\":\"videoCompleted\",\"handlerCode\":\"show();\"}]', 'Button_ButtonModule_14_stage_20d3cacb2703eb690fba4bb2f2e414c4', 'stage_20d3cacb2703eb690fba4bb2f2e414c4');
		module.drawElement("#stage_20d3cacb2703eb690fba4bb2f2e414c4");  
	});
};

var module = null;

if(jpinlineunit) {
	module = new JPButton_stage_20d3cacb2703eb690fba4bb2f2e414c4('{\"title\":\"facebook\",\"parent\":\"stage\",\"stagestate\":\"All\",\"layer\":\"default\",\"width\":\"34px\",\"height\":\"35px\",\"top\":\"315px\",\"left\":\"181px\",\"display\":\"block\",\"displayoncollapse\":\"none\",\"zIndex\":\"200000000\",\"clickEvent\":\"clickThrough\"}', '[{\"event\":\"clickClose\",\"handlerCode\":\"hide();\"},{\"event\":\"stageCollapsed\",\"handlerCode\":\"hide();\"},{\"event\":\"expandStage\",\"handlerCode\":\"show();\"}]','Button_ButtonModule_24_stage_20d3cacb2703eb690fba4bb2f2e414c4', 'stage_20d3cacb2703eb690fba4bb2f2e414c4');
	module.drawElement("#stage_20d3cacb2703eb690fba4bb2f2e414c4");
} else {
	jpElementReady("stage_20d3cacb2703eb690fba4bb2f2e414c4",function() { 
		module = new JPButton_stage_20d3cacb2703eb690fba4bb2f2e414c4('{\"title\":\"facebook\",\"parent\":\"stage\",\"stagestate\":\"All\",\"layer\":\"default\",\"width\":\"34px\",\"height\":\"35px\",\"top\":\"315px\",\"left\":\"181px\",\"display\":\"block\",\"displayoncollapse\":\"none\",\"zIndex\":\"200000000\",\"clickEvent\":\"clickThrough\"}', '[{\"event\":\"clickClose\",\"handlerCode\":\"hide();\"},{\"event\":\"stageCollapsed\",\"handlerCode\":\"hide();\"},{\"event\":\"expandStage\",\"handlerCode\":\"show();\"}]', 'Button_ButtonModule_24_stage_20d3cacb2703eb690fba4bb2f2e414c4', 'stage_20d3cacb2703eb690fba4bb2f2e414c4');
		module.drawElement("#stage_20d3cacb2703eb690fba4bb2f2e414c4");  
	});
};
var hasFlash = swfobject.hasFlashPlayerVersion("8");
var supportsVideoTag = !!document.createElement('video').canPlayType;

var VideoPlayer_VideoPlayerModule_10_stage_20d3cacb2703eb690fba4bb2f2e414c4 = function() {
	
	var rawConfig = '{\"title\":\"VideoPlayerModule_10\",\"parent\":\"stage\",\"stagestate\":\"Normal\",\"layer\":\"default\",\"width\":\"601px\",\"height\":\"325px\",\"top\":\"52px\",\"left\":\"343px\",\"display\":\"block\",\"displayoncollapse\":\"none\",\"zIndex\":\"200000000\",\"autoplayvideo\":\"false\",\"bindplayvideo\":\"undefined\",\"startmuted\":\"false\",\"autohidecontrols\":\"false\",\"videoPlayerWidth\":\"601px\",\"videoPlayerHeight\":\"325px\",\"paddingLeft\":\"undefined\",\"largeplaybutton_url\":\"http:\\/\\/ads.jetpackdigital.com\\/sites\\/_uploads\\/131586688413158668841_1.jpg\",\"largeplaybutton\":\"1_1\",\"largeplaybuttonheight\":\"1px\",\"largeplaybuttonwidth\":\"1px\",\"controlbarposition\":\"absolute\",\"controlbartop\":\"-9999px\",\"controlbarleft\":\"435px\",\"bufferMarginTop\":\"5px\",\"bufferHeight\":\"9px\",\"playImage_url\":\"http:\\/\\/ads.jetpackdigital.com\\/sites\\/_uploads\\/13170729521317072952SBNATION_POWERADE_PLAY_REV.png\",\"playImage\":\"SBNATION_POWERADE_PLAY_REV\",\"playImageHeight\":\"13px\",\"playpauseleft\":\"11px\",\"playpausetop\":\"10px\",\"pauseImage_url\":\"http:\\/\\/ads.jetpackdigital.com\\/sites\\/_uploads\\/13170729491317072949SBNATION_POWERADE_PAUSE_REV.png\",\"pauseImage\":\"SBNATION_POWERADE_PAUSE_REV\",\"pauseImageHeight\":\"13px\",\"progressImage_url\":\"http:\\/\\/ads.jetpackdigital.com\\/sites\\/_uploads\\/13170729391317072939SBNATION_POWERADE_PROGRESS_REV.jpg\",\"progressImage\":\"SBNATION_POWERADE_PROGRESS_REV\",\"muteImageOn_url\":\"http:\\/\\/ads.jetpackdigital.com\\/sites\\/_uploads\\/13170729601317072960SBNATION_POWERADE_AUDIO_REV.png\",\"muteImageOn\":\"SBNATION_POWERADE_AUDIO_REV\",\"muteImageOff_url\":\"http:\\/\\/ads.jetpackdigital.com\\/sites\\/_uploads\\/13170729561317072956SBNATION_POWERADE_NOAUDIO_REV.png\",\"muteImageOff\":\"SBNATION_POWERADE_NOAUDIO_REV\",\"muteImageHeight\":\"13px\",\"muteleft\":\"409px\",\"mutetop\":\"9px\",\"video1_url\":\"http:\\/\\/ads.jetpackdigital.com\\/sites\\/_uploads\\/13310836811331083681MiOENERGY_VID.flv\",\"video1\":\"MiOENERGY_VID\",\"controlwidth\":\"436px\",\"controlheight\":\"42px\",\"trackwidth\":\"384px\",\"trackleft\":\"30px\",\"tracktop\":\"10px\",\"controlbackground_url\":\"http:\\/\\/ads.jetpackdigital.com\\/sites\\/_uploads\\/13170835131317083513PLAYER_BAR1.png\",\"controlbackground\":\"PLAYER_BAR1\",\"hidecontrolbar\":\"false\",\"bufferwidth\":\"420px\"}';
	var config = eval("(" + rawConfig + ")");

	
	var id = "videoplayer_VideoPlayerModule_10";
	var layer = (config.layer) ? "jp_" + config.layer : "jp_default";
	var element = null;
	var stage_id = "#stage_20d3cacb2703eb690fba4bb2f2e414c4";
	var parent_id = "#stage_20d3cacb2703eb690fba4bb2f2e414c4";
	
	var targElement = null;
	
	var selected = false;
	var mover = false;
	var mout = true;
	var autoplay = (config.autoplay) ? config.autoplay : false;
	var muted = false;
	var startmuted = (config.startmuted && config.startmuted == "true") ? true : false;
	if(startmuted) { 
		muted = true;
	}
	
	var baseHost = "http://ads.jetpackdigital.com/sites";
	var playImage = (config.playImage_url) ? config.playImage_url : "http://ads.jetpackdigital.com/tracking_pixel.gif";
	var playImageHover = (config.playImageHover_url) ? config.playImageHover_url : "http://ads.jetpackdigital.com/tracking_pixel.gif";
	var pauseImage = (config.pauseImage_url) ? config.pauseImage_url : "http://ads.jetpackdigital.com/tracking_pixel.gif";
	var pauseImageHover = (config.pauseImageHover_url) ? config.pauseImageHover_url : "http://ads.jetpackdigital.com/tracking_pixel.gif";
	var playPauseLeft = (config.playpauseleft) ? config.playpauseleft : 0;
	var playPauseTop = (config.playpausetop) ? config.playpausetop : 0;
	var largePlayButton = (config.largeplaybutton_url) ? config.largeplaybutton_url : "http://ads.jetpackdigital.com/tracking_pixel.gif";
	var muteImageOn = (config.muteImageOn_url) ? config.muteImageOn_url : "http://ads.jetpackdigital.com/tracking_pixel.gif"; // With strike through
	var muteImageOff = (config.muteImageOff_url) ? config.muteImageOff_url : "http://ads.jetpackdigital.com/tracking_pixel.gif"; // No strike through
	var muteLeft = (config.muteleft) ? config.muteleft : "272px";
	var muteTop = (config.mutetop) ? config.mutetop : "6px";
	var scrubberImage = (config.scrubberImage_url) ? config.scrubberImage_url : "http://ads.jetpackdigital.com/tracking_pixel.gif";
	var scrubberImageWidth = (config.scrubberimagewidth) ? config.scrubberimagewidth : 0;
	var scrubberImageHeight = (config.scrubberimageheight) ? config.scrubberimageheight: 0;
	var scrubberImageMarginTop = (config.scrubberimagemargintop) ? config.scrubberimagemargintop: 0;
	var scrubberImageMarginLeft = (config.scrubberimagemarginleft) ? config.scrubberimagemarginleft: 0;
	var bufferImage = (config.bufferImage_url) ? config.bufferImage_url : "http://ads.jetpackdigital.com/tracking_pixel.gif";
	var controlHeight = (config.controlheight) ? config.controlheight : 0;
	var controlWidth = (config.controlwidth) ? config.controlwidth : 0; 
	var controlBackgroundImage = (config.controlbackground_url) ? config.controlbackground_url : "http://ads.jetpackdigital.com/tracking_pixel.gif";
	var trackLeft = (config.trackleft) ? config.trackleft : 0;
	var trackTop = (config.tracktop) ? config.tracktop : 0;
	var trackWidth = (config.trackwidth) ? config.trackwidth : 0;
	var progressImage = (config.progressImage_url) ? config.progressImage_url : "http://ads.jetpackdigital.com/tracking_pixel.gif";
	var staticImage = (config.image1_url) ? config.image1_url : "http://ads.jetpackdigital.com/tracking_pixel.gif";
	
	var videoplayerwrapper = null;
	
	var videoTag = null;
	var videoplayerloaded = false;
	var videoqueueindex = null;
	
	var activeVideo = "";
	var activeVideoIndex = 0;
	var reportedVideos = new Array();
	
	var vplayer = null;
	var videoplayer = null;
	var controlbar = null;
	
	// Create a random ord tracker for video plays
	var jpord = (typeof jpord == 'undefined') ? Math.floor(Math.random()*10000000000000000) : jpord;
	
	jpplayingvideo = false;
	
	var playlist = new Array();
	var prerolls = new Array();
	
	// Get the preroll videos
	for(var a in config) {
		if(index = a.match(/^prerollvideo(\d+)$/)) {
			var clip = createVideoClip(a);
			prerolls.push(clip);
		}
	}
	
	if(prerolls.length > 0) {
		var randomidx = Math.floor(Math.random()*prerolls.length);
		playlist.push(prerolls[randomidx]);
	}
	
	/*for(var a in config) {
		if(index = a.match(/^video(\d+)$/)) {
			var clip = createVideoClip(a);
			playlist.push(clip);
		}
	}*/
	
	for(var a in config) {
		if(index = a.match(/^video(\d+)$/)) {
			var clip = createVideoClip(a);
			playlist.push(clip);
			reportedVideos["video" + index[1]] = new Array();
			reportedVideos["video" + index[1]]["reportedZero"] = false;
			reportedVideos["video" + index[1]]["reportedQuarter"] = false;
			reportedVideos["video" + index[1]]["reportedHalf"] = false;
			reportedVideos["video" + index[1]]["reportedThreeQuarter"] = false;
			reportedVideos["video" + index[1]]["reportedFull"] = false;
		}
	}
     	
     	
	
	var trigger = function(event) {
		JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").trigger(event);
	};
		
	function play(pli) {
		if(videoTag != null) {
			playHTML5VideoClip(pli);
		} else {
			if(!videoplayerloaded) {
				videoqueueindex = pli;
			} else {
				jpplayingvideo = true;
				JP(videoplayerwrapper).show();
				vplayer.play(pli);
			}
		}
	};
	
	function stop() {
		if(videoTag != null) {
			videoTag.pause();
		} else {
			$f().stopBuffering();
			$f().stop();
		}
	};
	
	function createVideoClip(videokey) {
		var videoclip = {
			autoPlay: false,
        	autoBuffering: false,
        	
        	onBeforeStart: function() {
        		JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").trigger("videoBeforeStart");
        	},
        	        	
        	onBeforeFinish: function() {
   

        	},
        	
        	onFinish: function() {
        		JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").trigger("videoCompleted");
        		JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").trigger("videoCompleted_" + videokey);
        		
        		var cb = Math.floor(Math.random() * 10000000000);
            	var trackingsrc = "http://ads.jetpackdigital.com/tracking_pixel.gif?" + ord;
                var trackingimg = new Image();
                var jpfilename = config[videokey + "_url"].substring(config[videokey + "_url"].lastIndexOf('/')+1).replace(/^\d*/,"").replace(/\.flv$/,"");
				trackingimg.src = tp + "&t=videoplay100_" + jpfilename + "&cb=" + cb + "&u=" + trackingsrc;
        	},
        	
        	onMute: function() {
        		JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").trigger("videoMuted");
        	},
        	
        	onUnmute: function() {
        		JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").trigger("videoUnmuted");
				
        	},
        	
        	onStart: function() {
            	var cb = Math.floor(Math.random() * 10000000000);
            	
            	
        		if(startmuted) {
        			this.mute();
        		} else {
        			this.unmute();
        		}
        	   	
        	   	config.prerolltracking1 = "http://ads.jetpackdigital.com/tracking_pixel.gif?[random]";
        	    var trackingsrc = "http://ads.jetpackdigital.com/tracking_pixel.gif";
        		var trackingimg = new Image();
        		var jpfilename = config[videokey + "_url"].substring(config[videokey + "_url"].lastIndexOf('/')+1).replace(/^\d*/,"").replace(/\.flv$/,"");
        		
        		if(typeof tp != "undefined") {
        			trackingimg.src = tp + "&t=videoplay_" + jpfilename + "&cb=" + cb + "&u=" + trackingsrc;
        		}
        		
        		JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").trigger("videoStarted");
        		JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").trigger("videoStarted_" + videokey);
        		
				
				var clip = $f("jp_videoplayer_stage_20d3cacb2703eb690fba4bb2f2e414c4").getClip();
				var fullDuration = Math.floor(clip.fullDuration);
				

            	var reportedZero = false;
            	var quarter = Math.floor(fullDuration/4) * 1000;
            	var reportedQuarter = false;
                var half = Math.floor(fullDuration/2) * 1000;
                var reportedHalf = false;
                var threequarter = quarter + half;
                var reportedThreeQuarter = false;
                var full = (Math.floor(fullDuration)*1000) - 1000;
                var reportedFull = false;
                
				
				var cuepoints = new Array();
				for(i = 1; i <= fullDuration; i++) {
					cuepoints[i-1] = i*1000;
				}
            
				
				
                         			    				                      				                       				
                clip.onCuepoint(
					cuepoints,
					function(clip2, cuepoint) {
												
						if(typeof config.noquartile == "undefined" || config.noquartile != "true") {
						
							if (!reportedQuarter && cuepoint >= quarter && cuepoint < half) {
									
							
							
								reportedQuarter = true;
								var trackingsrc = "http://ads.jetpackdigital.com/tracking_pixel.gif?" + ord;
                				var trackingimg = new Image();
								trackingimg.src = tp + "&t=videoplay25_" + jpfilename + "&cb=" + cb + "&u=" + trackingsrc;
							} else if(!reportedHalf && cuepoint >= half && cuepoint < threequarter) {
									
								reportedHalf = true;
								var trackingsrc = "http://ads.jetpackdigital.com/tracking_pixel.gif?" + ord;
                				var trackingimg = new Image();
                				trackingimg.src = tp + "&t=videoplay50_" + jpfilename + "&cb=" + cb + "&u=" + trackingsrc;
							} else if(!reportedThreeQuarter && cuepoint >= threequarter && cuepoint < full) {
							
							
								reportedThreeQuarter = true;
								var trackingsrc = "http://ads.jetpackdigital.com/tracking_pixel.gif?" + ord;
                				var trackingimg = new Image();
								trackingimg.src = tp + "&t=videoplay75_" + jpfilename + "&cb=" + cb + "&u=" + trackingsrc;
							}
						}
					}
				);
            },       	
        	
        	onResume: function() {
        		
        		JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").trigger("videoStarted");
        	},
        	
        	onPause: function() {
        		JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").trigger("videoPaused");
        	},
        	
        	url: config[videokey + "_url"]
		};

		return videoclip;
	};
	
	function html5TimeUpdate(e) {
		var fullDuration = Math.floor(videoTag.duration);
			
        var quarter = Math.floor(fullDuration/4);
        var half = Math.floor(fullDuration/2);
        var threequarter = quarter + half;
        var full = Math.floor(fullDuration);

   		cuepoint = videoTag.currentTime;
   		
   		var jpfilename = config[activeVideoIndex + "_url"].substring(config[activeVideoIndex + "_url"].lastIndexOf('/')+1).replace(/^\d*/,"").replace(/\.flv$/,"");
   		var cb = Math.floor(Math.random() * 10000000000);
   		
   		if(typeof config.noquartile == "undefined" || config.noquartile != "true") {
			if (!reportedVideos[activeVideoIndex]["reportedZero"] && cuepoint >= 0 && cuepoint < quarter) {	
				reportedVideos[activeVideoIndex]["reportedZero"] = true;
				var trackingsrc = "http://ads.jetpackdigital.com/tracking_pixel.gif?" + ord;
				var trackingimg = new Image();
				trackingimg.src = tp + "&t=videoplay0_" + jpfilename + "&cb=" + cb + "&u=" + trackingsrc + "&d=html5";
			} else if (!reportedVideos[activeVideoIndex]["reportedQuarter"] && cuepoint >= quarter && cuepoint < half) {
				
				reportedVideos[activeVideoIndex]["reportedQuarter"] = true;
				var trackingsrc = "http://ads.jetpackdigital.com/tracking_pixel.gif?" + ord;
				var trackingimg = new Image();
				trackingimg.src = tp + "&t=videoplay25_" + jpfilename + "&cb=" + cb + "&u=" + trackingsrc + "&d=html5";
			} else if(!reportedVideos[activeVideoIndex]["reportedHalf"] && cuepoint >= half && cuepoint < threequarter) {
				
				reportedVideos[activeVideoIndex]["reportedHalf"] = true;
				var trackingsrc = "http://ads.jetpackdigital.com/tracking_pixel.gif?" + ord;
				var trackingimg = new Image();
				trackingimg.src = tp + "&t=videoplay50_" + jpfilename + "&cb=" + cb + "&u=" + trackingsrc + "&d=html5";
			} else if(!reportedVideos[activeVideoIndex]["reportedThreeQuarter"] && cuepoint >= threequarter && cuepoint < full) {
				
				reportedVideos[activeVideoIndex]["reportedThreeQuarter"] = true;
				var trackingsrc = "http://ads.jetpackdigital.com/tracking_pixel.gif?" + ord;
				var trackingimg = new Image();
				trackingimg.src = tp + "&t=videoplay75_" + jpfilename + "&cb=" + cb + "&u=" + trackingsrc + "&d=html5";
			}
		}
	};
	
	function html5Ended() {
		
   		JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").trigger("videoCompleted");
    	JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").trigger("videoCompleted_" + activeVideoIndex);
    		

		if(!reportedVideos[activeVideoIndex]["reportedFull"]) {
        	var cb = Math.floor(Math.random() * 10000000000);
            var trackingsrc = "http://ads.jetpackdigital.com/tracking_pixel.gif?" + ord;
            var trackingimg = new Image();
            var jpfilename = config[activeVideoIndex + "_url"].substring(config[activeVideoIndex + "_url"].lastIndexOf('/')+1).replace(/^\d*/,"").replace(/\.flv$/,"");
			trackingimg.src = tp + "&t=videoplay100_" + jpfilename + "&cb=" + cb + "&u=" + trackingsrc  + "&d=html5";
			reportedVideos[activeVideoIndex]["reportedFull"] = true;
		}

	};
	
	function setupHTML5Tracking() {
		// Clear it up
		JP(videoTag).unbind("timeupdate",html5TimeUpdate).unbind("ended",html5Ended);
		JP(videoTag).bind("timeupdate", html5TimeUpdate).bind("ended",html5Ended);
	};
	
	function playHTML5VideoClip(index) {
		videoTag.pause();
		
		var i = parseInt(index) + 1; 
		
		if(!config["video" + i + "_url"]) {
			// No such video;
			return;
		}
		
		var html5VideoUrl = config["video" + i + "_url"].replace("ads.jetpackdigital.com","h5media.jetpackdigital.com");
	   	
	   	activeVideoIndex = "video" + i;
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
	   	
	   	videoTag.play();
	};

	
	function loadHTML5VideoPlayer() {
		// Build the HTML 5 Video Tag
		videoTag = document.createElement("video");
		
		vplayer = {
			play: function(index) { if(index) { playHTML5VideoClip(index); } else { playHTML5VideoClip(0); } return vplayer; },
			unload: function() { videoTag.pause(); return vplayer; },
			stop: function() { videoTag.pause(); return vplayer; },
			unmute: function() { videoTag.volume = .5; return vplayer; },
			mute: function() { videoTag.volume = 0; return vplayer; },
			setVolume: function(vol) { videoTag.volume = vol/100; return vplayer; }
		};
		
	 	JP(videoTag).attr("id","jp_videoplayer_stage_20d3cacb2703eb690fba4bb2f2e414c4").css("width","100%").css("height","100%").attr("width","100%").attr("height","100%").attr("preload","auto").attr("data-setup","{}").attr("controls","controls").attr("poster",staticImage);

	 	
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
			JP(videoplayer).append(videoTag);
		} else {
			supportsVideoTag = false;
			return false;
		}
		
		if(config.autoplayvideo == "true") {
	   		JP(videoTag).attr("autoplay","true");
	   	}
	   	
	   	if(startmuted) {
        	vplayer.mute();
        } else {
        	vplayer.unmute();
        }
	 
	   		   	
	   	var html5VideoUrl = config["video1_url"].replace("ads.jetpackdigital.com","h5media.jetpackdigital.com");
	   	activeVideoIndex = "video1";
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
		
		JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").trigger("videoPlayerLoaded");
		
		return true;
	};

	
	function loadVideoPlayer() {
		var vp = document.getElementById("jp_videoplayer_stage_20d3cacb2703eb690fba4bb2f2e414c4");
		if(typeof(vp) != "undefined") {
			
			var pluginconfig = { controls: null };
			if(config.usevisiblemeasures && config.usevisiblemeasures == "true" && config.visiblemeasureskey) {
				pluginconfig.vmcapi = {
					url: "http://cdn.visiblemeasures.com/swf/as3/v4.9.5/FlowPlayerPlugin.swf",
					vmcKey: config.visiblemeasureskey 
				} 
			}
					
			if(config.largeplaybutton_url) {
				jpflowplayer = flowplayer;
            	vplayer = jpflowplayer("jp_videoplayer_stage_20d3cacb2703eb690fba4bb2f2e414c4",{src: 'http://ads.jetpackdigital.com/flowplayer/flowplayer.unlimited-3.2.7.swf', wmode: 'transparent', bgcolor: 'none', border: '0'},{
                	canvas: { backgroundImage: 'url(' + staticImage + ')'},
                	plugins: pluginconfig,
                	playlist: playlist,
                	onLoad: function() {
                		JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").trigger("videoPlayerLoaded");
                	},
                	onMute: function() {
                       	JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").trigger("videoMuted");
                    },
                        	
                    onUnmute: function() {                        	
                       	JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").trigger("videoUnmuted");
                    },
                	border: '0',
                	play: {
                		url: largePlayButton,
                    	width: config.largeplaybuttonwidth,
                    	height: config.largeplaybuttonheight
               		}
                }).controls("jp_controlbar_stage_20d3cacb2703eb690fba4bb2f2e414c4",{});
                
                videoplayerloaded = true;
                JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").trigger("videoPlayerLoaded");

				if(videoqueueindex != null) {
					play(videoqueueindex);
					videoqueueindex = null;
				}
				
            } else {
            	jpflowplayer = flowplayer;
                vplayer = jpflowplayer("jp_videoplayer_stage_20d3cacb2703eb690fba4bb2f2e414c4",{src: 'http://ads.jetpackdigital.com/flowplayer/flowplayer.unlimited-3.2.7.swf', wmode: 'transparent', bgcolor: 'none',  border: '0'},{
                     canvas: { backgroundImage: 'url(' + staticImage + ')'},
                      plugins: pluginconfig,
                      playlist: playlist,
                      onLoad: function() {
                		JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").trigger("videoPlayerLoaded");
                	  },
                	  onMute: function() {
                       	JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").trigger("videoMuted");
                      },
                        	
                      onUnmute: function() {                        	
                       	 JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").trigger("videoUnmuted");
                      }
                 }).controls("jp_controlbar_stage_20d3cacb2703eb690fba4bb2f2e414c4",{});
                 
                 videoplayerloaded = true;
                 JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").trigger("videoPlayerLoaded");
                 
                 if(videoqueueindex != null) {
					play(videoqueueindex);
					videoqueueindex = null;
				}
           }

			
			if(config.controlbarposition == "absolute") {
					JP(controlbar).css("position","absolute");
					JP(controlbar).css("top",config.controlbartop);
					JP(controlbar).css("left",config.controlbarleft);
					JP(targElement).append(JP(controlbar));
			} else {
					JP(controlbar).css("position","relative");
					JP(videoplayerwrapper).append(JP(controlbar));
			}
			
			
			
			if(config.autohidecontrols == "true") {
				JP(controlbar).hide();
				
				JP("#jp_videoplayer_stage_20d3cacb2703eb690fba4bb2f2e414c4").mouseover(function() {
					JP(stage).trigger("showVideoControls");
				});
				
				JP("#jp_videoplayer_stage_20d3cacb2703eb690fba4bb2f2e414c4").mouseout(function() {
					JP(stage).trigger("closeVideoControls");
				});
				
				JP(stage).bind("closeVideoControls",function() {
					mover = false;
					setTimeout(function() { if(!mover) {JP(controlbar).hide();} }, 3000);
				});
				
				JP(stage).bind("showVideoControls",function() {
					mover = true;
					JP(controlbar).show(); 
				});
			}
			
			if(startmuted) {
				vplayer.mute();
			}
			
			if(autoplay || config.autoplayvideo == "true") {
				play(0);
			}
			
	
		} else {
			setTimeout(loadVideoPlayer,100);
		}
	};
	
	this.updateStyleSheet = function() {
		var bufferwidth = "246px";
		var muteleft = "272px";
		if(config.bufferwidth) {
			bufferwidth = config.bufferwidth;
			var bufferwidthnum = bufferwidth.match(/^\d+/);
			var muteleftnum = parseInt(bufferwidthnum) + 26;
			muteleft = muteleftnum + "px";
		}

		var bufferheight = "10px";	
		if(config.bufferHeight) {
			bufferheight = config.bufferHeight;
		};

		var stylecss = "div.jp_controlbar_stage_20d3cacb2703eb690fba4bb2f2e414c4 {position:relative; background: transparent url(" + controlBackgroundImage + ") no-repeat; height: " + controlHeight + "; width: " + controlWidth + ";} div.jp_controlbar_stage_20d3cacb2703eb690fba4bb2f2e414c4 .play { position:absolute; top: " + playPauseTop + "; left: " + playPauseLeft + "; width: 14px; height: 14px; display:block; background:url(" + playImage + ") no-repeat; cursor:pointer; } div.jp_controlbar_stage_20d3cacb2703eb690fba4bb2f2e414c4 div.play:hover { background:url(" + playImageHover + ") no-repeat; } div.jp_controlbar_stage_20d3cacb2703eb690fba4bb2f2e414c4 .pause { position:absolute; width: 14px; height: 14px; top: " + playPauseTop + "; left: " + playPauseLeft + "; display:block; background:url(" + pauseImage + ") no-repeat; cursor:pointer; } div.jp_controlbar_stage_20d3cacb2703eb690fba4bb2f2e414c4 div.pause:hover { background: transparent url(" + pauseImageHover + ") no-repeat; } div.jp_controlbar_stage_20d3cacb2703eb690fba4bb2f2e414c4 div.track { border: none !important; left:" + trackLeft + "; top: " + trackTop + "; position:absolute; cursor:pointer; width: " + trackWidth + "; border-left:1px solid #999; height:" + bufferheight + "; } div.jp_controlbar_stage_20d3cacb2703eb690fba4bb2f2e414c4 div.playhead { background:  transparent url(" + scrubberImage + ") no-repeat !important; position:relative; cursor:pointer; width: " + scrubberImageWidth + "; height: " + scrubberImageHeight + "; margin-left: " + scrubberImageMarginLeft + " !important; margin-top: " + scrubberImageMarginTop + " !important; } div.jp_controlbar_stage_20d3cacb2703eb690fba4bb2f2e414c4 div.progress { background: transparent url(" + progressImage + ") repeat-x; position:absolute; height:" + bufferheight + "; } div.jp_controlbar_stage_20d3cacb2703eb690fba4bb2f2e414c4 div.buffer { position:absolute; background: transparent url(" + bufferImage + ") no-repeat; width: "  + bufferwidth + "; height:" + bufferheight + "; } div.jp_controlbar_stage_20d3cacb2703eb690fba4bb2f2e414c4 div.time { display: none; } div.jp_controlbar_stage_20d3cacb2703eb690fba4bb2f2e414c4 .mute { position:absolute; left: " + muteLeft + "; width:19px; height:14px; top: " + muteTop + "; text-align:center; cursor:pointer; background:transparent url(" + muteImageOn + ") no-repeat; } div.jp_controlbar_stage_20d3cacb2703eb690fba4bb2f2e414c4 .unmute {position:absolute; left:" + muteLeft + "; width:19px; height:10px; top: " + muteTop + "; text-align:center; cursor:pointer; background:transparent url(" + muteImageOff + ") no-repeat; }";
					
		stage.updateStyleSheet(stylecss);

	};

	this.drawElement = function(targetElement) {
				// Set the target element
				targElement = targetElement;
						
				videoplayerwrapper = document.createElement("div");
				
				JP(videoplayerwrapper).attr("class",layer);
				JP(videoplayerwrapper).addClass("jp_videoplayerwrapper");
				JP(videoplayerwrapper).css("height",config.height);
				JP(videoplayerwrapper).css("width",config.width);
				JP(videoplayerwrapper).css("top",config.top);
				JP(videoplayerwrapper).css("left",config.left);
				JP(videoplayerwrapper).css("position","absolute");
				JP(videoplayerwrapper).css("color","#ffffff");
				JP(videoplayerwrapper).css("margin-left","-1px");
				/*JP(videoplayerwrapper).css("padding-left",config.paddingLeft);
				JP(videoplayerwrapper).css("padding-top",config.paddingTop);
				JP(videoplayerwrapper).css("padding-right",config.paddingRight);*/
				JP(videoplayerwrapper).css("background-color",config.containerBackgroundColor);
				JP(videoplayerwrapper).css("z-index","1000001");
				JP(videoplayerwrapper).attr("id","jp_videoplayerwrapper_stage_20d3cacb2703eb690fba4bb2f2e414c4");
			
				videoplayer = document.createElement("div");
		
				JP(videoplayer).css("position","relative");
				JP(videoplayer).css("background-color","transparent");
				JP(videoplayer).attr("id","jp_videoplayer_stage_20d3cacb2703eb690fba4bb2f2e414c4");
				JP(videoplayer).css("z-index","2000002");
				
				
				JP(videoplayer).css("height",config.height);
				JP(videoplayer).css("width",config.width);
				
				JP(videoplayerwrapper).append(JP(videoplayer));
				JP(targetElement).append(JP(videoplayerwrapper));
			
				controlbar = document.createElement("div");
				JP(controlbar).attr("class","jp_controlbar_stage_20d3cacb2703eb690fba4bb2f2e414c4 jp_controlbar");
				JP(controlbar).attr("id","jp_controlbar_stage_20d3cacb2703eb690fba4bb2f2e414c4");
				JP(controlbar).css("z-index","3000003");
				JP(controlbar).css("background-color","transparent");
				
				if(config.hidecontrolbar == "true") {
					JP(controlbar).css("display","none");
				}
				
								
				JP(controlbar).html('<a class="play"></a><div class="track"><div class="buffer"></div><div class="progress"></div><div class="playhead"></div></div><div class="time"></div><a class="mute"></a>');
				JP(controlbar).css("position","absolute");
				JP(controlbar).css("top","-9999px");
				JP("body").append(controlbar);
				
				if(config.hidebuffer == "true") {
					JP(".track").hide();
				}

				
				
				
				// Update css, if it exists
				if(config.css) {
					var csselements = config.css.split(";");
					for(var i = 0; i < csselements.length; i++) {
						var comps = csselements[i].split(":");
						JP(this.module).css(comps[0],comps[1]);
					}
				}
				
				if(config.playImageHeight) {
					JP("#jp_controlbar_stage_20d3cacb2703eb690fba4bb2f2e414c4 .play").css("height",config.playImageHeight);
				}
				
				if(config.muteImageHeight) {
					JP("#jp_controlbar_stage_20d3cacb2703eb690fba4bb2f2e414c4 .mute").css("height",config.muteImageHeight);
				}
				
				if(config.controlBarMarginLeft) {
					JP("#jp_controlbar_stage_20d3cacb2703eb690fba4bb2f2e414c4").css("margin-left",config.controlBarMarginLeft);
				}
				
				if(config.controlBarMarginTop) {
					JP("#jp_controlbar_stage_20d3cacb2703eb690fba4bb2f2e414c4").css("margin-top",config.controlBarMarginTop);
				}
				
				if(config.bufferMarginTop) {
					JP("#jp_controlbar_stage_20d3cacb2703eb690fba4bb2f2e414c4 .buffer").css("margin-top",config.bufferMarginTop);
					JP("#jp_controlbar_stage_20d3cacb2703eb690fba4bb2f2e414c4 .progress").css("margin-top",config.bufferMarginTop);
					JP("#jp_controlbar_stage_20d3cacb2703eb690fba4bb2f2e414c4 .playhead").css("margin-top",config.bufferMarginTop);
				}
				
				
				if(jpdGetCookie("stage_20d3cacb2703eb690fba4bb2f2e414c4_c") == "1") {
					JP(videoplayerwrapper).css("top","-9999px");
					//JP(videoplayerwrapper).css("display","none");
				}
	   	
	   				
		
			
									JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").bind("clickClose",function(){ 
					vplayer.unload(); JP(videoplayerwrapper).css("top","-9999px"); vplayer.stop(); 				});
							JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").bind("stageCollapsed",function(){ 
					vplayer.unload(); JP(videoplayerwrapper).css("top","-9999px"); vplayer.stop(); 				});
							JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").bind("expandStage",function(){ 
					JP(videoplayerwrapper).css("top","52px");startmuted=false; vplayer.unmute().setVolume(50).play(0); JP(".jp_controlbar").css("top","336px");				});
							JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").bind("clickPlay",function(){ 
					JP(videoplayerwrapper).css("top","52px");startmuted=false; vplayer.unmute().setVolume(50).play(0); JP(".jp_controlbar").css("top","336px");				});
							JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").bind("clickMainVideo",function(){ 
					JP(videoplayerwrapper).css("top","30px");startmuted=false; vplayer.unmute().setVolume(50).play(0); JP(".jp_controlbar").css("top","356px");				});
							JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").bind("videoMuted",function(){ 
					pmuted = true;				});
							JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").bind("videoUnmuted",function(){ 
					pmuted = false;				});
							JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").bind("videoCollapsed",function(){ 
					vplayer.unload(); vplayer.stop();				});
							JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").bind("videoPlayerLoaded",function(){ 
					JP("a.play").css("width","23px"); JP("a.pause").css("width","23px");				});
							JP("#stage_20d3cacb2703eb690fba4bb2f2e414c4").bind("clickReplay",function(){ 
					JP(videoplayerwrapper).css("top","52px");startmuted=false; vplayer.unmute().setVolume(80).play(0); JP(".jp_controlbar").css("top","309px");				});
							
		if(hasFlash && config.forcehtml5 != "true") {
			setTimeout(loadVideoPlayer, 100);
		} else if(supportsVideoTag) {
			// Setup HTML5 Video Player;
			if(!loadHTML5VideoPlayer() && config.forcehtml5 == "true") {
				// FailOver to Flash
				setTimeout(loadVideoPlayer, 100);
			}
		}			
	}; 
};


module_VideoPlayerModule_10_stage_20d3cacb2703eb690fba4bb2f2e414c4 = null;

if(jpinlineunit) {
	module_VideoPlayerModule_10_stage_20d3cacb2703eb690fba4bb2f2e414c4 = new VideoPlayer_VideoPlayerModule_10_stage_20d3cacb2703eb690fba4bb2f2e414c4();
	module_VideoPlayerModule_10_stage_20d3cacb2703eb690fba4bb2f2e414c4.updateStyleSheet();
	if(typeof flowplayer == "undefined") {
		JP.getScript("http://ads.jetpackdigital.com/flowplayer/flowplayer-3.2.4.min.js", function(){
			
				JP.getScript("http://ads.jetpackdigital.com/flowplayer/flowplayer.controls-3.0.2.min.js", function(){

					module_VideoPlayerModule_10_stage_20d3cacb2703eb690fba4bb2f2e414c4.drawElement("#stage_20d3cacb2703eb690fba4bb2f2e414c4");
				});
			});
	} else {
		JP.getScript("http://ads.jetpackdigital.com/flowplayer/flowplayer.controls-3.0.2.min.js", function(){
			//module_VideoPlayerModule_10_stage_20d3cacb2703eb690fba4bb2f2e414c4 = new VideoPlayer_VideoPlayerModule_10_stage_20d3cacb2703eb690fba4bb2f2e414c4();
			module_VideoPlayerModule_10_stage_20d3cacb2703eb690fba4bb2f2e414c4.drawElement("#stage_20d3cacb2703eb690fba4bb2f2e414c4");
		});
		
	}
} else {
	/*JP(document).ready(function() {*/
	jpElementReady("stage_20d3cacb2703eb690fba4bb2f2e414c4",function() { 
		
		module_VideoPlayerModule_10_stage_20d3cacb2703eb690fba4bb2f2e414c4 = new VideoPlayer_VideoPlayerModule_10_stage_20d3cacb2703eb690fba4bb2f2e414c4();
		module_VideoPlayerModule_10_stage_20d3cacb2703eb690fba4bb2f2e414c4.updateStyleSheet();
		if(typeof flowplayer == 'undefined') {
			JP.getScript("http://ads.jetpackdigital.com/flowplayer/flowplayer-3.2.4.min.js", function(){
			
				JP.getScript("http://ads.jetpackdigital.com/flowplayer/flowplayer.controls-3.0.2.min.js", function(){				
					
					module_VideoPlayerModule_10_stage_20d3cacb2703eb690fba4bb2f2e414c4.drawElement("#stage_20d3cacb2703eb690fba4bb2f2e414c4");
				});
			});
		} else {
			
			JP.getScript("http://ads.jetpackdigital.com/flowplayer/flowplayer.controls-3.0.2.min.js", function(){
				//module_VideoPlayerModule_10_stage_20d3cacb2703eb690fba4bb2f2e414c4 = new VideoPlayer_VideoPlayerModule_10_stage_20d3cacb2703eb690fba4bb2f2e414c4();
				module_VideoPlayerModule_10_stage_20d3cacb2703eb690fba4bb2f2e414c4.drawElement("#stage_20d3cacb2703eb690fba4bb2f2e414c4");
			});
		}
	});
};


			if(jpinlineunit) { 
				stage.drawStyleSheet(); 
				if(JP('#stage_20d3cacb2703eb690fba4bb2f2e414c4').attr('loadtrigger')) {
					JP('#stage_20d3cacb2703eb690fba4bb2f2e414c4').trigger(JP('#stage_20d3cacb2703eb690fba4bb2f2e414c4').attr('loadtrigger'));
				};
			
				JP('#stage_20d3cacb2703eb690fba4bb2f2e414c4').trigger('stageLoaded');
				JP(document).trigger('stageLoaded');
			/*} else { JP(document).ready(function() {*/
			} else { jpElementReady('stage_20d3cacb2703eb690fba4bb2f2e414c4',function() { 
				stage.drawStyleSheet(); 
				if(JP('#stage_20d3cacb2703eb690fba4bb2f2e414c4').attr('loadtrigger')) {
					JP('#stage_20d3cacb2703eb690fba4bb2f2e414c4').trigger(JP('#stage_20d3cacb2703eb690fba4bb2f2e414c4').attr('loadtrigger'));
				};
			
				JP('#stage_20d3cacb2703eb690fba4bb2f2e414c4').trigger('stageLoaded');
				JP(document).trigger('stageLoaded');
			});};
				
					shStageId = "stage_20d3cacb2703eb690fba4bb2f2e414c4";
				
		

		if(typeof autoexpand != "undefined" && autoexpand){
								
		}

		if(0){
			
				var stageWidth = JP("#" + shStageId).width();
				var siteWidthNumber = parseInt(siteWidth.replace("px",""));
				if(stageWidth > siteWidthNumber) {
					var diff = -1 * Math.floor((stageWidth - siteWidthNumber)/2);
					JP("#" + shStageId).css("margin-left",diff + "px");
				} else {
					JP("#" + shStageId).css("margin","0 auto");
				}
			
		}
		
				
			};
	
		
	this.ReportDelivery = function() {
		if(!this.running) return;
		
				
		
		if(typeof ord == 'undefined') ord=Math.random()*1000000000;
		
		var img = new Image();
		img.src = 'http://jptracking.elasticbeanstalk.com/jpt?ord='+ord+'&lid=5474&c=0';
		/*
		var imgdiv = document.createElement("div");
		JP(imgdiv).css("height","1px");
		JP(imgdiv).css("position","absolute").css("top","-9999px");
		var img = document.createElement("img");
		
		JP(img).attr("src",'http://jptracking.elasticbeanstalk.com/jpt?ord='+ord+'&lid=5474&c=0');
		JP(imgdiv).append(img);
		JP(document.body).append(JP(imgdiv));
		*/
			};
	
	this.ShowTracking = function() {
			};
};

 customunit_5474_0 = new superheader_325__5474(); customunit_5474_0.Init(); customunit_5474_0.Run(); customunit_5474_0.ReportDelivery();};

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
				setTimeout("jpLoadJQuery_5474()",jptimeout);	
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
 				
 				
				setTimeout("jpLoadJQuery_5474()",jptimeout);
		}
};

};

};
