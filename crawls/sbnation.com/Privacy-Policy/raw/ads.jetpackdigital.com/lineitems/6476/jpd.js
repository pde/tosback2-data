if(typeof loadedJp_6476 == "undefined") {
	loadedJp_6476 = true;

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
	var scr = "http://ads.jetpackdigital.com/lineitems/6476/jpd.js";
	
		
			var xdm = hostname[1] + "/jpd/jpxdm.html?ifr=" + escape(iframesrc) + "&src=" + escape(scr);
		
		
			
	if(typeof jpli != "undefined")  {
		xdm += "&jpli=" + jpli;
	} else {
		xdm += "&jpli=6476";
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
	loadedJp_6476 = null;
	delete loadedJp_6476;
	
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

function jpLoadJQuery_6476() {		
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
        				jpRunUnits6476();
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
					
        			setTimeout("jpLoadJQuery_6476()", jptimeout);
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
			jpRunUnits6476();   
		}
};

function jpRunUnits6476() {
	// Get the video license if it's available

	var loadedLineItems = new Array();
	var requestedLineItems = new Array();
		
		
	 
var animatebody = false;
var siteWidth = "990px";

var superheader_325__6476 = function() {
	this.lineItemId = 6476;
	
	this.runnable = false;
	this.running = false;
	superheaderBodyLoaded = false;

	var headerPoll;
	var bodyLoaded;
	var oldwindowopen;
	
		
				
	

	shStageId = null;
	
	if(typeof ord == "undefined") ord = Math.random()*100000000000; 
	var rawClickThrough = "http://ad.doubleclick.net/clk;259176030;83269242;i?http://www.buffalowildwings.com/moreexcuses?utm_source=SBNation&utm_medium=Takeover&utm_content=MoreExcuses&utm_campaign=MoreExcuses2012".replace("[random]",ord);
	var clickThroughUrl = "http://jptracking.elasticbeanstalk.com/jpc?ord="+ord+"&lid=6476&c=0";	

	var cid = "6476";
	var tp = 'http://jptracking.elasticbeanstalk.com/jpt?ord='+ord+'&lid=6476&c=0';
	
	this.Init = function() {
		//JP("#jpsuperheader").html("");
       	//JP("#supervideoplayerwrapper").html("");
       	
       	JP(document).bind("jpUnloadUnits",function() {
       		//alert("unloading superheader");
       	});
       	
		if(jpsuperheader) return;
		
			
		jpsuperheader = true;
		this.runnable = true;
		
				
															
										
			};
	
	CheckForBody_6476_0 = function() {
		
					var parentElement = ".network-bar-shadow";
				 
		
		if(JP(parentElement).length > 0) {
        	if(!superheaderBodyLoaded) {
        		        	
        		        			var appendElement = ".network-bar-shadow";
        			var prependElement = "";

					if(!(JP("#jpsuperheader").length > 0)) { 
	        			if(appendElement != "") {
	        				        				JP("<div id='jpsuperheader' style='height: auto; width: " + siteWidth + ";position: relative; margin: 0 auto; overflow: hidden;'><style type='text/css'>#jpsuperheader{width: 990px !important; margin-top: 5px !important;} #network_bar{z-index: 300000000 !important;}</style></div>").insertAfter(appendElement);
	        			} else if (prependElement != "") {
	        				        				JP("<div id='jpsuperheader' style='height: auto; width: " + siteWidth + ";position: relative; margin: 0 auto;overflow: hidden;'><style type='text/css'>#jpsuperheader{width: 990px !important; margin-top: 5px !important;} #network_bar{z-index: 300000000 !important;}</style></div>").insertBefore(prependElement);
	        			} else {
	        				        				JP(parentElement).prepend("<div id='jpsuperheader' style='height: auto; width: " + siteWidth + "; position: relative; margin: 0 auto; overflow: hidden;'><style type='text/css'>#jpsuperheader{width: 990px !important; margin-top: 5px !important;} #network_bar{z-index: 300000000 !important;}</style></div>");
	     				}
     				}
        			        	            	
        		
        		
        		 

        		            	
            	        		
       
            }
            
            this.RunCustomUnitSuperHeader_6476();
            superheaderBodyLoaded = true;
            
        } else {
        	setTimeout(CheckForBody_6476_0,100);			
     	}

		
	};

	this.Run =  function() {
	
		if(!this.runnable) return;
		
       	//JP('#jpsuperheader').html("");
       	//JP("#supervideoplayerwrapper").html("").remove();
		
				
		this.running = true;
		
				
												
			setTimeout(CheckForBody_6476_0,100);
						
				
				
	};
	overrideStageState = null;
	RunCustomUnitSuperHeader_6476 = function() {
		try {
	
				
				
		
				
stagecollapsed = false; 



var jpLayers_stage_1fea1ae675b2ccb2649676d63665a842 = new Array();
			jpLayers_stage_1fea1ae675b2ccb2649676d63665a842.push("default");
	
var jpLayers_stage_1fea1ae675b2ccb2649676d63665a842Depth = new Array();


if(typeof jpVars == "undefined") {
	jpVars = {};
}

var Stage_stage_1fea1ae675b2ccb2649676d63665a842 = function() {
	
	var rawConfig = '{\"title\":\"SB Nation- Buffalo Wild Wings\",\"stagetype\":\"Normal\",\"width\":\"990px\",\"height\":\"418px\",\"multiplane\":\"false\",\"followcursor\":\"false\",\"autostate\":\"false\",\"backgroundImage_url\":\"http:\\/\\/ads.jetpackdigital.com\\/sites\\/_uploads\\/13420451461342045146SBNATION_BWW_HEADER_REV3.jpg\",\"backgroundImage\":\"SBNATION_BWW_HEADER_REV3\",\"backgroundImage2_url\":\"http:\\/\\/ads.jetpackdigital.com\\/sites\\/_uploads\\/13425404041342540404WWW_COLLPASED_REV.jpg\",\"backgroundImage2\":\"WWW_COLLPASED_REV\",\"autoexpandbutton\":\"true\",\"remembercollapsed\":\"true\",\"startcollapsed\":\"true\",\"expandedfrequencyper24\":\"12\",\"collapsedheight\":\"66px\",\"collapsetime\":\"250\",\"normalheight\":\"418px\",\"collapsedbackground\":\"background2\",\"normalbackground\":\"background1\"}';
	var config = eval("(" + rawConfig + ")");
	var origconfig = null;
	
	origconfig = config;
	config = jpGetDatedConfig(config);
	this.conf = config;
	
	var element = null;
	
	var id = "stage_1fea1ae675b2ccb2649676d63665a842";
	this.id = id;
	var stage_id = "#stage_1fea1ae675b2ccb2649676d63665a842";
		
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
				if(e.target.id == "stage_1fea1ae675b2ccb2649676d63665a842" || JP(elem).parent().attr("id") == "stage_1fea1ae675b2ccb2649676d63665a842" || JP("#" + e.target.id).hasClass("jppanel") || JP("#" + JP(elem).parent().attr("id")).hasClass("jppanel")) {	
				jpmousedover = true;
				var scrollTop = e.pageY;
				if(jpentrypoint == -1) {
					jpentrypoint = scrollTop - jplastexitpoint;
					jplastexitpoint = 0;
				}

				scrollTop = scrollTop - jpentrypoint;
				var windowHeight = JP("#stage_1fea1ae675b2ccb2649676d63665a842").height();
				var offset = scrollTop/windowHeight;
				for(var i = 0; i < jpLayers_stage_1fea1ae675b2ccb2649676d63665a842.length; i++) {
					if(jpLayers_stage_1fea1ae675b2ccb2649676d63665a842[i] == "default") {
						continue;
					}
					
					JP(".jp_" + jpLayers_stage_1fea1ae675b2ccb2649676d63665a842[i]).each(function() {
						if(!JP(this).attr("toppos")) {
							JP(this).attr("toppos", JP(this).css("top"));
						}
						
						if(!JP(this).attr("leftpos")) {
							JP(this).attr("leftpos", JP(this).css("left"));
						}
						
						var depth = 0;
						if(jpLayers_stage_1fea1ae675b2ccb2649676d63665a842Depth[jpLayers_stage_1fea1ae675b2ccb2649676d63665a842[i]]) {
							depth = jpLayers_stage_1fea1ae675b2ccb2649676d63665a842Depth[jpLayers_stage_1fea1ae675b2ccb2649676d63665a842[i]];
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
							
							if(jpLayers_stage_1fea1ae675b2ccb2649676d63665a842[i] == "NewLayer") {
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
				for(var i = 0; i < jpLayers_stage_1fea1ae675b2ccb2649676d63665a842.length; i++) {
					if(jpLayers_stage_1fea1ae675b2ccb2649676d63665a842[i] == "default") {
						continue;
					}
					
					JP(".jp_" + jpLayers_stage_1fea1ae675b2ccb2649676d63665a842[i]).each(function() {
						if(!JP(this).attr("toppos")) {
							JP(this).attr("toppos", JP(this).css("top"));
						}
						
						if(!JP(this).attr("leftpos")) {
							JP(this).attr("leftpos", JP(this).css("left"));
						}
						
						var depth = 0;
						if(jpLayers_stage_1fea1ae675b2ccb2649676d63665a842Depth[jpLayers_stage_1fea1ae675b2ccb2649676d63665a842[i]]) {
							depth = jpLayers_stage_1fea1ae675b2ccb2649676d63665a842Depth[jpLayers_stage_1fea1ae675b2ccb2649676d63665a842[i]];
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
							JP(this).css("position","fixed").css("left",newleftposition).css("top",newtopposition); 
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
							
							if(jpLayers_stage_1fea1ae675b2ccb2649676d63665a842[i] == "NewLayer") {
								JP(this).attr("toppos").replace("px","");
							}

							
							JP(this).css("position","fixed").css("top",newposition + "px").css("left",newleftposition);
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
				JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("stageExpandedLarge");
				track("OpenToExpanded");
			}); 
			
			collapsed=false; 
			jpdSetCookie(stage_id.replace("#","") + "_c","0",1,"/"); 
			
			
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
				JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("stageExpandedNormal");
				track("OpenToNormal");
				if(typeof activeAutoExpand == "undefined" || !activeAutoExpand) { 
					jpdSetCookie(stage_id.replace("#","") + "_c","0",1,"/"); 
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
				JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("stageExpandedNormal");
				track("OpenToNormal");
			}); 
			
			collapsed=false;
			this.collapsed = false; 
			jpdSetCookie(stage_id.replace("#","") + "_c","0",1,"/"); 
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
			JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("stageCollapsed");
			
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
        style.id = "style_stage_1fea1ae675b2ccb2649676d63665a842";
		
        if( style.styleSheet )  // IE
                style.styleSheet.cssText = this.stylecss;
        else  // other browsers
                style.appendChild( document.createTextNode(this.stylecss) );

        var head = document.getElementsByTagName('head')[0];
        head.appendChild( style );
    };

	var trigger = function(event) {
		JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger(event);
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
			var showExpanded = jpdGetCookie("stage_1fea1ae675b2ccb2649676d63665a842_e");
			if(!showExpanded) {
				startcollapsed = false;
				var exp = 1/(parseInt(config.expandedfrequencyper24));
				jpdSetCookie("stage_1fea1ae675b2ccb2649676d63665a842_e","1",exp,"/");
			} 
		}
		
		if(typeof overrideStageState == "undefined" || overrideStageState == null) {
			if(0) {
				overrideStageState = "collapsed";
			} else {
				overrideStageState = "normal";
			}
		}	
		
		if(overrideStageState == "collapsed" || startcollapsed || (config.remembercollapsed == "true" && jpdGetCookie("stage_1fea1ae675b2ccb2649676d63665a842_c") == "1")) {
			JP(this.stage).css("height",config.collapsedheight);
			JP(this.stage).attr("class",config.collapsedbackground);
			collapsed = true;
			this.collapsed = true;
			stagecollapsed = true;
			jpdSetCookie("stage_1fea1ae675b2ccb2649676d63665a842_c","1",1,"/");
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
		JP(collapsedDiv).attr("id",stage_id.replace("#","") + "_collapsed"); 
		if(config.collapsedheight && (!config.autoexpandbutton || config.autoexpandbutton == "true")) {
			JP(collapsedDiv).css("height",config.collapsedheight);
				
			JP(collapsedDiv).css("display","none").css("width",config.width).css("cursor","pointer");
			JP(collapsedDiv).css("position","absolute").css("top","0px").css("left","0px").css("z-index","9999999");
			JP(collapsedDiv).click(function() {
				JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("expandStage");
				JP(this).hide();
				toNormalHeight();
			});
			JP(this.stage).append(JP(collapsedDiv));
			
			if(0 || (config.remembercollapsed == "true" && jpdGetCookie("stage_1fea1ae675b2ccb2649676d63665a842_c") == "1")) {
				JP(collapsedDiv).show();
			}
		}
				
		JP(targetElement).append(this.stage);
		
		//this.stylecss = "";
		
		if(typeof(backgroundImage) != "undefined" && backgroundImage != "") {
			if(!backgroundColor) { backgroundColor = "transparent"; }
			this.stylecss += " #stage_1fea1ae675b2ccb2649676d63665a842.background1 { background: " + backgroundColor + " url(" + backgroundImage + ") no-repeat !important} ";
			JP(this.stage).append("<img src='" + backgroundImage + "' style='position: absolute; top: -9999px;'>");
		} 
		
		if(typeof(backgroundImage2) != "undefined" && backgroundImage2 != "") {
			this.stylecss += " #stage_1fea1ae675b2ccb2649676d63665a842.background2 { background: " + backgroundColor2 + " url(" + backgroundImage2 + ") no-repeat !important} ";
			JP(this.stage).append("<img src='" + backgroundImage2 + "' style='position: absolute; top: -9999px;'>");
		}
		
		if(typeof(backgroundImage3) != "undefined" && backgroundImage3 != "") {
			this.stylecss += " #stage_1fea1ae675b2ccb2649676d63665a842.background3 { background: " + backgroundColor3 + " url(" + backgroundImage3 + ") no-repeat !important} ";
			JP(this.stage).append("<img src='" + backgroundImage3 + "' style='position: absolute; top: -9999px;'>");
		}
		
		if(typeof(backgroundImage4) != "undefined" && backgroundImage4 != "") {
			this.stylecss += " #stage_1fea1ae675b2ccb2649676d63665a842.background4 { background: " + backgroundColor4 + " url(" + backgroundImage4 + ") no-repeat !important} ";
			JP(this.stage).append("<img src='" + backgroundImage4 + "' style='position: absolute; top: -9999px;'>");
		}
		
		if(typeof(backgroundImage5) != "undefined" && backgroundImage5 != "") {
			this.stylecss += " #stage_1fea1ae675b2ccb2649676d63665a842.background5 { background: " + backgroundColor5 + " url(" + backgroundImage5 + ") no-repeat !important} ";
			JP(this.stage).append("<img src='" + backgroundImage5 + "' style='position: absolute; top: -9999px;'>");
		}
		
		if(typeof(backgroundImage6) != "undefined" && backgroundImage6 != "") {
			this.stylecss += " #stage_1fea1ae675b2ccb2649676d63665a842.background6 { background: " + backgroundColor6 + " url(" + backgroundImage6 + ") no-repeat !important} ";
			JP(this.stage).append("<img src='" + backgroundImage6 + "' style='position: absolute; top: -9999px;'>");
		}
		
		if(typeof(backgroundImage7) != "undefined" && backgroundImage7 != "") {
			this.stylecss += " #stage_1fea1ae675b2ccb2649676d63665a842.background7 { background: " + backgroundColor7 + " url(" + backgroundImage7 + ") no-repeat !important} ";
			JP(this.stage).append("<img src='" + backgroundImage7 + "' style='position: absolute; top: -9999px;'>");
		}
		
		if(typeof(backgroundImage8) != "undefined" && backgroundImage8 != "") {
			this.stylecss += " #stage_1fea1ae675b2ccb2649676d63665a842.background8 { background: " + backgroundColor8 + " url(" + backgroundImage8 + ") no-repeat !important} ";
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
				
									JP("#stage_1fea1ae675b2ccb2649676d63665a842").bind("clickClose",function(){ 
					toCollapsedHeight(); clearTimeout(jpdTimer);				});
							JP("#stage_1fea1ae675b2ccb2649676d63665a842").bind("clickThrough",function(){ 
					window.open(clickThroughUrl,"_blank");				});
							JP("#stage_1fea1ae675b2ccb2649676d63665a842").bind("videoCompleted",function(){ 
					jpdTimer = setTimeout(function(){toCollapsedHeight();},7000);				});
							JP("#stage_1fea1ae675b2ccb2649676d63665a842").bind("clickMainVideo",function(){ 
									});
							JP("#stage_1fea1ae675b2ccb2649676d63665a842").bind("stageLoaded",function(){ 
					if(!stagecollapsed){jpdTimer = setTimeout(function(){toCollapsedHeight(); track("autoCollapsed");},7000);}else{jpdTimer = 0;}				});
							JP("#stage_1fea1ae675b2ccb2649676d63665a842").bind("clickPlay",function(){ 
					clearTimeout(jpdTimer);				});
							JP("#stage_1fea1ae675b2ccb2649676d63665a842").bind("expandStage",function(){ 
					clearTimeout(jpdTimer);				});
							JP("#stage_1fea1ae675b2ccb2649676d63665a842").bind("clickReplay",function(){ 
					clearTimeout(jpdTimer);				});
							JP("#stage_1fea1ae675b2ccb2649676d63665a842").bind("clickWatch",function(){ 
					toNormalHeight();				});
							JP("#stage_1fea1ae675b2ccb2649676d63665a842").bind("clickDownload",function(){ 
					window.open(clickThroughUrl,"_blank");				});
						
		JP(this.stage).bind("click", function(event) {
			//if(event.currentTarget.id == id) {
				if(config.clickevent) {
					JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger(config.clickevent, id);
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
				JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger(config.triggeronload);
			});*/
		}
		
		if(parseInt(config.autocollapsetime) > 0) {
			setTimeout(function() { JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("clickClose"); }, parseInt(config.autocollapsetime) * 1000);
		}
		
	};
};


var stage = null;




if(jpinlineunit || (typeof forcejpinline != "undefined" && forcejpinline)) {
	var telem = "jpsuperheader";
	if(typeof overrideElem != "undefined") {
		telem = overrideElem;
	}
	stage = new Stage_stage_1fea1ae675b2ccb2649676d63665a842();
	stage.drawElement("#" + telem);
} else {
	/*JP(document).ready(function() {*/
	var telem = "jpsuperheader";
	if(typeof overrideElem != "undefined") {
		telem = overrideElem;
	}
	stage = new Stage_stage_1fea1ae675b2ccb2649676d63665a842();
	jpElementReady(telem,function() {
		stage.drawElement("#" + telem);
		closeJPSuperheader = function() {
			JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("collapseStage");
		};

		expandJPSuperheader = function() {
			JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("expandStage");
			stage.toNormalHeight();
		};
	});
}

var JPButton_stage_1fea1ae675b2ccb2649676d63665a842 = function(settings, rawHandlers, button_id, stg_id) {
	
	var rawConfig = settings; 
	var config = eval("(" + rawConfig + ")");
	var origconfig = null;
	
	origconfig = config;
	config = jpGetDatedConfig(config);
	
	var stage_id = "#" + stg_id;
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
		JP(element).attr("class",id + "_disabled");
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
	module = new JPButton_stage_1fea1ae675b2ccb2649676d63665a842('{\"title\":\"close button\",\"parent\":\"stage\",\"layer\":\"default\",\"width\":\"28px\",\"height\":\"28px\",\"top\":\"29px\",\"left\":\"957px\",\"display\":\"block\",\"displayoncollapse\":\"none\",\"zIndex\":\"200000000\",\"stagestate\":\"Normal\",\"clickEvent\":\"clickClose\"}', '[{\"event\":\"stageCollapsed\",\"handlerCode\":\"hide();\"},{\"event\":\"expandStage\",\"handlerCode\":\"show();\"},{\"event\":\"clickClose\",\"handlerCode\":\"hide();\"},{\"event\":\"clickWatch\",\"handlerCode\":\"show();\"}]','Button_ButtonModule_2_stage_1fea1ae675b2ccb2649676d63665a842', 'stage_1fea1ae675b2ccb2649676d63665a842');
	module.drawElement("#stage_1fea1ae675b2ccb2649676d63665a842");
} else {
	jpElementReady("stage_1fea1ae675b2ccb2649676d63665a842",function() { 
		module = new JPButton_stage_1fea1ae675b2ccb2649676d63665a842('{\"title\":\"close button\",\"parent\":\"stage\",\"layer\":\"default\",\"width\":\"28px\",\"height\":\"28px\",\"top\":\"29px\",\"left\":\"957px\",\"display\":\"block\",\"displayoncollapse\":\"none\",\"zIndex\":\"200000000\",\"stagestate\":\"Normal\",\"clickEvent\":\"clickClose\"}', '[{\"event\":\"stageCollapsed\",\"handlerCode\":\"hide();\"},{\"event\":\"expandStage\",\"handlerCode\":\"show();\"},{\"event\":\"clickClose\",\"handlerCode\":\"hide();\"},{\"event\":\"clickWatch\",\"handlerCode\":\"show();\"}]', 'Button_ButtonModule_2_stage_1fea1ae675b2ccb2649676d63665a842', 'stage_1fea1ae675b2ccb2649676d63665a842');
		module.drawElement("#stage_1fea1ae675b2ccb2649676d63665a842");  
	});
};

var module = null;

if(jpinlineunit) {
	module = new JPButton_stage_1fea1ae675b2ccb2649676d63665a842('{\"title\":\"clickthrough button\",\"parent\":\"stage\",\"layer\":\"default\",\"width\":\"990px\",\"height\":\"418px\",\"top\":\"0px\",\"left\":\"0px\",\"zIndex\":\"10000\",\"stagestate\":\"All\",\"clickEvent\":\"clickThrough\"}', '[{\"event\":\"clickClose\",\"handlerCode\":\"JP(element).css(\\\"width\\\",\\\"777px\\\").css(\\\"height\\\",\\\"66px\\\").css(\\\"z-index\\\",\\\"100000000\\\");\"},{\"event\":\"stageCollapsed\",\"handlerCode\":\"JP(element).css(\\\"width\\\",\\\"777px\\\").css(\\\"height\\\",\\\"66px\\\").css(\\\"z-index\\\",\\\"100000000\\\");\"},{\"event\":\"expandStage\",\"handlerCode\":\"JP(element).css(\\\"width\\\",\\\"990px\\\").css(\\\"height\\\",\\\"418px\\\").css(\\\"z-index\\\",\\\"10000\\\");\"},{\"event\":\"stageLoaded\",\"handlerCode\":\"if(stagecollapsed){JP(element).css(\\\"width\\\",\\\"777px\\\").css(\\\"height\\\",\\\"66px\\\").css(\\\"z-index\\\",\\\"100000000\\\");}\"}]','Button_ButtonModule_6_stage_1fea1ae675b2ccb2649676d63665a842', 'stage_1fea1ae675b2ccb2649676d63665a842');
	module.drawElement("#stage_1fea1ae675b2ccb2649676d63665a842");
} else {
	jpElementReady("stage_1fea1ae675b2ccb2649676d63665a842",function() { 
		module = new JPButton_stage_1fea1ae675b2ccb2649676d63665a842('{\"title\":\"clickthrough button\",\"parent\":\"stage\",\"layer\":\"default\",\"width\":\"990px\",\"height\":\"418px\",\"top\":\"0px\",\"left\":\"0px\",\"zIndex\":\"10000\",\"stagestate\":\"All\",\"clickEvent\":\"clickThrough\"}', '[{\"event\":\"clickClose\",\"handlerCode\":\"JP(element).css(\\\"width\\\",\\\"777px\\\").css(\\\"height\\\",\\\"66px\\\").css(\\\"z-index\\\",\\\"100000000\\\");\"},{\"event\":\"stageCollapsed\",\"handlerCode\":\"JP(element).css(\\\"width\\\",\\\"777px\\\").css(\\\"height\\\",\\\"66px\\\").css(\\\"z-index\\\",\\\"100000000\\\");\"},{\"event\":\"expandStage\",\"handlerCode\":\"JP(element).css(\\\"width\\\",\\\"990px\\\").css(\\\"height\\\",\\\"418px\\\").css(\\\"z-index\\\",\\\"10000\\\");\"},{\"event\":\"stageLoaded\",\"handlerCode\":\"if(stagecollapsed){JP(element).css(\\\"width\\\",\\\"777px\\\").css(\\\"height\\\",\\\"66px\\\").css(\\\"z-index\\\",\\\"100000000\\\");}\"}]', 'Button_ButtonModule_6_stage_1fea1ae675b2ccb2649676d63665a842', 'stage_1fea1ae675b2ccb2649676d63665a842');
		module.drawElement("#stage_1fea1ae675b2ccb2649676d63665a842");  
	});
};

var module = null;

if(jpinlineunit) {
	module = new JPButton_stage_1fea1ae675b2ccb2649676d63665a842('{\"title\":\"play image button\",\"parent\":\"stage\",\"layer\":\"default\",\"width\":\"549px\",\"height\":\"300px\",\"top\":\"80px\",\"left\":\"410px\",\"display\":\"block\",\"displayoncollapse\":\"none\",\"zIndex\":\"300000000\",\"stagestate\":\"Normal\",\"defaultImage_url\":\"http:\\/\\/ads.jetpackdigital.com\\/sites\\/_uploads\\/13420442081342044208SBNATION_BWW_THUMB.jpg\",\"defaultImage\":\"SBNATION_BWW_THUMB\",\"clickEvent\":\"clickPlay\"}', '[{\"event\":\"clickClose\",\"handlerCode\":\"hide();\"},{\"event\":\"stageCollapsed\",\"handlerCode\":\"hide();\"},{\"event\":\"expandStage\",\"handlerCode\":\"hide();\"},{\"event\":\"clickPlay\",\"handlerCode\":\"hide();\"},{\"event\":\"videoCompleted\",\"handlerCode\":\"show();\"},{\"event\":\"clickWatch\",\"handlerCode\":\"hide();\"}]','Button_ButtonModule_14_stage_1fea1ae675b2ccb2649676d63665a842', 'stage_1fea1ae675b2ccb2649676d63665a842');
	module.drawElement("#stage_1fea1ae675b2ccb2649676d63665a842");
} else {
	jpElementReady("stage_1fea1ae675b2ccb2649676d63665a842",function() { 
		module = new JPButton_stage_1fea1ae675b2ccb2649676d63665a842('{\"title\":\"play image button\",\"parent\":\"stage\",\"layer\":\"default\",\"width\":\"549px\",\"height\":\"300px\",\"top\":\"80px\",\"left\":\"410px\",\"display\":\"block\",\"displayoncollapse\":\"none\",\"zIndex\":\"300000000\",\"stagestate\":\"Normal\",\"defaultImage_url\":\"http:\\/\\/ads.jetpackdigital.com\\/sites\\/_uploads\\/13420442081342044208SBNATION_BWW_THUMB.jpg\",\"defaultImage\":\"SBNATION_BWW_THUMB\",\"clickEvent\":\"clickPlay\"}', '[{\"event\":\"clickClose\",\"handlerCode\":\"hide();\"},{\"event\":\"stageCollapsed\",\"handlerCode\":\"hide();\"},{\"event\":\"expandStage\",\"handlerCode\":\"hide();\"},{\"event\":\"clickPlay\",\"handlerCode\":\"hide();\"},{\"event\":\"videoCompleted\",\"handlerCode\":\"show();\"},{\"event\":\"clickWatch\",\"handlerCode\":\"hide();\"}]', 'Button_ButtonModule_14_stage_1fea1ae675b2ccb2649676d63665a842', 'stage_1fea1ae675b2ccb2649676d63665a842');
		module.drawElement("#stage_1fea1ae675b2ccb2649676d63665a842");  
	});
};
var hasFlash = swfobject.hasFlashPlayerVersion("8");
var supportsVideoTag = !!document.createElement('video').canPlayType;

var VideoPlayer_VideoPlayerModule_10_stage_1fea1ae675b2ccb2649676d63665a842 = function() {
	
	var rawConfig = '{\"title\":\"VideoPlayerModule_10\",\"parent\":\"stage\",\"layer\":\"default\",\"width\":\"550px\",\"height\":\"300px\",\"top\":\"-9999px\",\"left\":\"410px\",\"display\":\"block\",\"displayoncollapse\":\"none\",\"zIndex\":\"200000000\",\"stagestate\":\"Normal\",\"autoplayvideo\":\"false\",\"startmuted\":\"false\",\"autohidecontrols\":\"false\",\"usebuiltin\":\"true\",\"progresscolor\":\"#d87f25\",\"trackcolor\":\"#d0a77e\",\"largeplaybutton_url\":\"http:\\/\\/ads.jetpackdigital.com\\/sites\\/_uploads\\/13419541351341954135tracking_pixel.gif\",\"largeplaybutton\":\"tracking_pixel\",\"largeplaybuttonheight\":\"1px\",\"largeplaybuttonwidth\":\"1px\",\"video1_url\":\"http:\\/\\/ads.jetpackdigital.com\\/sites\\/_uploads\\/13420442581342044258SBNATION_BUFFWINGS_VID.mp4\",\"video1\":\"SBNATION_BUFFWINGS_VID\"}';
	var config = eval("(" + rawConfig + ")");
	var origconfig = null;
	
	origconfig = config;
	config = jpGetDatedConfig(config);
	
	var id = "videoplayer_VideoPlayerModule_10";
	var layer = (config.layer) ? "jp_" + config.layer : "jp_default";
	var element = null;
	var stage_id = "#stage_1fea1ae675b2ccb2649676d63665a842";
	var parent_id = "#stage_1fea1ae675b2ccb2649676d63665a842";
	
	var targElement = null;
	
	var selected = false;
	var mover = false;
	var mout = true;
	var autoplay = (config.autoplayvideo && config.autoplayvideo == "true") ? true : false;
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
	
	var usingHtml5 = false;
	
	var playedPreroll = false;
	var playingPreroll = false;
	var hasPreroll = false;
	
	var activeVideo = "";
	var activeVideoIndex = 0;
	var savedVideoIndex = 0;
	var reportedVideos = new Array();
	
	var vplayer = null;
	var videoplayer = null;
	var controlbar = null;
	var replaybutton = null;
	var clickforsound = null;
	var videoPlaying = false;
	
	var repeattracking = (config.repeattracking && config.repeattracking == "true") ? true : false; 
	
	// Create a random ord tracker for video plays
	var jpord = (typeof jpord == 'undefined') ? Math.floor(Math.random()*10000000000000000) : jpord;
	
	jpplayingvideo = false;
	
	var playlist = new Array();
	var prerolls = new Array();
	
	var cuepoint = null;
	var fullDuration = null;
	
	// Get the preroll videos
	for(var a in config) {
		if(index = a.match(/^prerollvideo(\d+)$/)) {
			var clip = createVideoClip(a);
			prerolls.push(clip);
			reportedVideos["prerollvideo" + index[1]] = new Array();
			reportedVideos["prerollvideo" + index[1]]["reportedZero"] = false;
			reportedVideos["prerollvideo" + index[1]]["reportedQuarter"] = false;
			reportedVideos["prerollvideo" + index[1]]["reportedHalf"] = false;
			reportedVideos["prerollvideo" + index[1]]["reportedThreeQuarter"] = false;
			reportedVideos["prerollvideo" + index[1]]["reportedFull"] = false;
		}
	}
	
	if(prerolls.length > 0) {
		var randomidx = Math.floor(Math.random()*prerolls.length);
		playlist.push(prerolls[randomidx]);
		hasPreroll = true;
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
		JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger(event);
	};
	
	function finishedPreroll() {
		if(!playedPreroll) {
			playedPreroll = true;
			playingPreroll = false;
			play(0);
		}	
	};
	
	var jpVideoTrackingEvents = new Array();
	
	var jpTrackVideo = function(eventName) {
    	if(repeattracking || !jpVideoTrackingEvents[eventName]) {
        	var trackingpixel = "http://ads.jetpackdigital.com/tracking_pixel.gif?[random]";
			var cb = Math.floor(Math.random() * 10000000000);
           	var trackingsrc =trackingpixel.replace("[random]",cb);
           	var trackingimg = new Image();
            trackingimg.src = tp + "&t=" + eventName + "&cb=" + cb + "&u=" + trackingsrc;
            jpVideoTrackingEvents[eventName] = true;
            
            // Trigger event
            if(eventName.match(/pr_videoplay25/) || eventName.match(/pr_videoplay_ws_25/)) {
            	trackExternalPixel("25");
            	JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("prVideoPlayed25");
            } else if(eventName.match(/pr_videoplay50/) || eventName.match(/pr_videoplay_ws_50/)) {
            	trackExternalPixel("50");
            	JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("prVideoPlayed50");
            } else if(eventName.match(/pr_videoplay75/) || eventName.match(/pr_videoplay_ws_75/)) {
            	trackExternalPixel("75");
            	JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("prVideoPlayed75");
            } else if(eventName.match(/pr_videoplay100/) || eventName.match(/pr_videoplay_ws_100/)) {
            	trackExternalPixel("100");
            	JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("prVideoPlayed100");
             } else if(eventName.match(/pr_videoplay/) || eventName.match(/pr_videoplay_ws/)) {
            	trackExternalPixel("0");
            	JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("prVideoPlayed0");
            }
    	}
    };
    
    function trackExternalPixel(quartile) {
    	if(quartile == "0" && config.startedtp) {
    		var img = new Image();
    		img.src = config.startedtp.replace("[random]",ord);
    	} else if(quartile == "25" && config.perc25tp) {
    		var img = new Image();
    		img.src = config.perc25tp.replace("[random]",ord);
    	} else if(quartile == "50" && config.perc50tp) {
    		var img = new Image();
    		img.src = config.perc50tp.replace("[random]",ord);
    	} else if(quartile == "75" && config.perc75tp) {
    		var img = new Image();
    		img.src = config.perc75tp.replace("[random]",ord);
    	} else if(quartile == "100" && config.completedtp) { 
    		var img = new Image();
    		img.src = config.completedtp.replace("[random]",ord);   	
    	}
    }
	
	function play(pli) {
		if(videoTag != null) {
			vplayer.play(pli);
			//videoTag.currentTime = 0;
			//playHTML5VideoClip(pli);
		} else {
			if(!videoplayerloaded) {
				videoqueueindex = pli;
			} else {
				if(hasPreroll && !playedPreroll && !pli) {
					playingPreroll = true;
					JP(controlbar).hide();
					JP("#stage_1fea1ae675b2ccb2649676d63665a842").bind("videoCompleted",finishedPreroll);
				} else {
					if(pli) {
						if(hasPreroll) {
							pli = pli + 1;
						}
					} else {
						if(hasPreroll) {
							pli = 1; 
						} else {
							pli = 0;
						}
					}
					if(!config.hidecontrolbar || config.hidecontrolbar == "false") {
						JP(controlbar).show();
					}
					JP("#stage_1fea1ae675b2ccb2649676d63665a842").unbind("videoCompleted",finishedPreroll);
				}
				
				jpplayingvideo = true;
				JP(videoplayerwrapper).show();
				JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("videoPlayed");
				if(typeof console != "undefined") {
					console.log("ATTEMPTING TO PLAY : " + pli);
				}
				vplayer.play(pli).seek(0);
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
        		JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("videoBeforeStart");
        		
        	},
        	        	        	
        	onBeforeFinish: function() {
      
        		var pr = "";
        		if(playingPreroll) {
        			pr = "pr_";
        		}
        		
        		var jpfilename = config[videokey + "_url"].substring(config[videokey + "_url"].lastIndexOf('/')+1).replace(/^\d*/,"").replace(/\.flv$/,"");
				var playerstatus = vplayer.getStatus();
        		if(playerstatus.muted) {
        			jpTrackVideo(pr + "videoplay100_" + jpfilename);
        		} else {
        			jpTrackVideo(pr + "videoplay_ws_100_" + jpfilename);
        		}
        		
        		//if(!reportedVideos[videokey]["reportedFull"]) {
        		//	var cb = Math.floor(Math.random() * 10000000000);
            	//	var trackingsrc = "http://ads.jetpackdigital.com/tracking_pixel.gif?" + ord;
               	// 	var trackingimg = new Image();
               	// 	var jpfilename = config[videokey + "_url"].substring(config[videokey + "_url"].lastIndexOf('/')+1).replace(/^\d*/,"").replace(/\.flv$/,"");
				//	trackingimg.src = tp + "&t=" + pr + "videoplay100_" + jpfilename + "&cb=" + cb + "&u=" + trackingsrc;
        		//}
                				
        		stop();
        		
        		if(hasPreroll && playingPreroll) {
        			if(!playedPreroll) {
						playedPreroll = true;
						playingPreroll = false;
						
						// Wait 2 seconds
						setTimeout(function() { play(0) }, 2000);
					}
        		} else {
        			JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("videoCompleted");
        		}
        		JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("videoCompleted_" + videokey);
        		
        		
        	},
        	
        	onMute: function() {
        		JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("videoMuted");
        	},
        	
        	onUnmute: function() {
        		JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("videoUnmuted");
				
        	},
        	
        	onStart: function() {
            	var cb = Math.floor(Math.random() * 10000000000);
            	
        		if(startmuted) {
        			this.mute();
        		} else {
        			this.unmute();
        		}
        		
        		var pr = "";
        		if(playingPreroll) {
        			pr = "pr_";
        		}
        	   	
        	   	//config.prerolltracking1 = "http://ads.jetpackdigital.com/tracking_pixel.gif?[random]";
        	    //var trackingsrc = "http://ads.jetpackdigital.com/tracking_pixel.gif";
        		//var trackingimg = new Image();
        		var jpfilename = config[videokey + "_url"].substring(config[videokey + "_url"].lastIndexOf('/')+1).replace(/^\d*/,"").replace(/\.flv$/,"");
        		
        		if(typeof tp != "undefined") {
        			//trackingimg.src = tp + "&t=" + pr + "videoplay_" + jpfilename + "&cb=" + cb + "&u=" + trackingsrc;
        			if(muted) {
				      //  jpTrackVideo(pr + "videoplay_" + jpfilename);
				    } else {
				       // jpTrackVideo(pr + "videoplay_ws_" + jpfilename);
				    }
        		}
        		
        		JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("videoStarted");
        		JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("videoStarted_" + videokey);
        		
				
				var clip = $f("jp_videoplayer_stage_1fea1ae675b2ccb2649676d63665a842").getClip();
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
						var pr = "";
		        		if(playingPreroll) {
		        			pr = "pr_";
		        		}
		        		
		        		var playerstatus = vplayer.getStatus();
        				muted = playerstatus.muted;
		        							
						if(typeof config.noquartile == "undefined" || config.noquartile != "true") {
						
							if(cuepoint > 0 && cuepoint < quarter) {
								if(muted) {
				        			jpTrackVideo(pr + "videoplay_" + jpfilename);
				        		} else {
				        			jpTrackVideo(pr + "videoplay_ws_" + jpfilename);
				        		}
							} else if (cuepoint >= quarter && cuepoint < half) {
								if(muted) {
				        			jpTrackVideo(pr + "videoplay25_" + jpfilename);
				        		} else {
				        			jpTrackVideo(pr + "videoplay_ws_25_" + jpfilename);
				        		}	
							
							
								//reportedQuarter = true;
								//var trackingsrc = "http://ads.jetpackdigital.com/tracking_pixel.gif?" + ord;
                				//var trackingimg = new Image();
								//trackingimg.src = tp + "&t=" + pr + "videoplay25_" + jpfilename + "&cb=" + cb + "&u=" + trackingsrc;
							} else if(cuepoint >= half && cuepoint < threequarter) {
								if(muted) {
				        			jpTrackVideo(pr + "videoplay50_" + jpfilename);
				        		} else {
				        			jpTrackVideo(pr + "videoplay_ws_50_" + jpfilename);
				        		}
								//reportedHalf = true;
								//var trackingsrc = "http://ads.jetpackdigital.com/tracking_pixel.gif?" + ord;
                				//var trackingimg = new Image();
                				//trackingimg.src = tp + "&t=" + pr + "videoplay50_" + jpfilename + "&cb=" + cb + "&u=" + trackingsrc;
							} else if(cuepoint >= threequarter && cuepoint < full) {
								if(muted) {
				        			jpTrackVideo(pr + "videoplay75_" + jpfilename);
				        		} else {
				        			jpTrackVideo(pr + "videoplay_ws_75_" + jpfilename);
				        		}
							
								//reportedThreeQuarter = true;
								//var trackingsrc = "http://ads.jetpackdigital.com/tracking_pixel.gif?" + ord;
                				//var trackingimg = new Image();
								//trackingimg.src = tp + "&t=" + pr + "videoplay75_" + jpfilename + "&cb=" + cb + "&u=" + trackingsrc;
							}
						}
					}
				);
            },       	
        	
        	onResume: function() {
        		
        		JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("videoStarted");
        	},
        	
        	onPause: function() {
        		JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("videoPaused");
        	},
        	
        	url: config[videokey + "_url"]
		};

		return videoclip;
	};
	
	function html5TimeUpdate(e) {
		fullDuration = Math.floor(videoTag.duration);
			
        var quarter = Math.floor(fullDuration/4);
        var half = Math.floor(fullDuration/2);
        var threequarter = quarter + half;
        var full = Math.floor(fullDuration);

   		cuepoint = videoTag.currentTime;
   		
   		JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("videoTimeUpdate");
   		
   		var jpfilename = config[activeVideoIndex + "_url"].substring(config[activeVideoIndex + "_url"].lastIndexOf('/')+1).replace(/^\d*/,"").replace(/\.flv$/,"");
   		var cb = Math.floor(Math.random() * 10000000000);
   		
   		var pr = "";
   		if(playingPreroll) {
   			pr = "pr_";
   		}
   		   		
   		if(typeof config.noquartile == "undefined" || config.noquartile != "true") {
			if (cuepoint >= 0 && cuepoint < quarter) {	
				if(videoTag.muted || videoTag.volume == 0) {
		        	jpTrackVideo(pr + "videoplay_" + jpfilename);
		        } else {
		        	jpTrackVideo(pr + "videoplay_ws_" + jpfilename);
		        }
				//reportedVideos[activeVideoIndex]["reportedZero"] = true;
				//var trackingsrc = "http://ads.jetpackdigital.com/tracking_pixel.gif?" + ord;
				//var trackingimg = new Image();
				//trackingimg.src = tp + "&t=" + pr + "videoplay_" + jpfilename + "&cb=" + cb + "&u=" + trackingsrc + "&d=html5";
			} else if (cuepoint >= quarter && cuepoint < half) {
				if(videoTag.muted || videoTag.volume == 0) {
		        	jpTrackVideo(pr + "videoplay25_" + jpfilename);
		        } else {
		        	jpTrackVideo(pr + "videoplay25_ws_" + jpfilename);
		        }
				//reportedVideos[activeVideoIndex]["reportedQuarter"] = true;
				//var trackingsrc = "http://ads.jetpackdigital.com/tracking_pixel.gif?" + ord;
				//var trackingimg = new Image();
				//trackingimg.src = tp + "&t=" + pr + "videoplay25_" + jpfilename + "&cb=" + cb + "&u=" + trackingsrc + "&d=html5";
			} else if(cuepoint >= half && cuepoint < threequarter) {
				if(videoTag.muted || videoTag.volume == 0) {
		        	jpTrackVideo(pr + "videoplay50_" + jpfilename);
		        } else {
		        	jpTrackVideo(pr + "videoplay50_ws_" + jpfilename);
		        }
				//reportedVideos[activeVideoIndex]["reportedHalf"] = true;
				//var trackingsrc = "http://ads.jetpackdigital.com/tracking_pixel.gif?" + ord;
				//var trackingimg = new Image();
				//trackingimg.src = tp + "&t=" + pr + "videoplay50_" + jpfilename + "&cb=" + cb + "&u=" + trackingsrc + "&d=html5";
			} else if(cuepoint >= threequarter && cuepoint < full) {
				if(videoTag.muted || videoTag.volume == 0) {
		        	jpTrackVideo(pr + "videoplay75_" + jpfilename);
		        } else {
		        	jpTrackVideo(pr + "videoplay75_ws_" + jpfilename);
		        }
				//reportedVideos[activeVideoIndex]["reportedThreeQuarter"] = true;
				//var trackingsrc = "http://ads.jetpackdigital.com/tracking_pixel.gif?" + ord;
				//var trackingimg = new Image();
				//trackingimg.src = tp + "&t=" + pr + "videoplay75_" + jpfilename + "&cb=" + cb + "&u=" + trackingsrc + "&d=html5";
			}
		}
	};
	
	function html5Ended() {
		
		var pr = "";
   		if(playingPreroll) {
   			pr = "pr_";
   		}
   		
   		var jpfilename = config[activeVideoIndex + "_url"].substring(config[activeVideoIndex + "_url"].lastIndexOf('/')+1).replace(/^\d*/,"").replace(/\.flv$/,"");

   		if(videoTag.muted || videoTag.volume == 0) {
        	jpTrackVideo(pr + "videoplay100_" + jpfilename);
        } else {
        	jpTrackVideo(pr + "videoplay100_ws_" + jpfilename);
        }

		//if(!reportedVideos[activeVideoIndex]["reportedFull"]) {
        //	var cb = Math.floor(Math.random() * 10000000000);
        //    var trackingsrc = "http://ads.jetpackdigital.com/tracking_pixel.gif?" + ord;
        //    var trackingimg = new Image();
        //    var jpfilename = config[activeVideoIndex + "_url"].substring(config[activeVideoIndex + "_url"].lastIndexOf('/')+1).replace(/^\d*/,"").replace(/\.flv$/,"");
		//	trackingimg.src = tp + "&t=" + pr + "videoplay100_" + jpfilename + "&cb=" + cb + "&u=" + trackingsrc  + "&d=html5";
		//	reportedVideos[activeVideoIndex]["reportedFull"] = true;
		//}
		
   		JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("videoCompleted");
    	JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("videoCompleted_" + activeVideoIndex);
	};
	
	function setupHTML5Tracking() {
		// Clear it up
		JP(videoTag).unbind("timeupdate",html5TimeUpdate);
		JP(videoTag).unbind("ended",html5Ended);
		JP(videoTag).bind("timeupdate", html5TimeUpdate);
		JP(videoTag).bind("ended",html5Ended);
	};
	
	function finishedHTML5Preroll() {
		if(!playedPreroll) {
			playedPreroll = true;
			playingPreroll = false;
			playHTML5VideoClip(0);
		}
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
		
		if(playingPreroll) {
			html5VideoUrl = config["prerollvideo1_url"].replace("ads.jetpackdigital.com","h5media.jetpackdigital.com");
		} else {		
			if(config["prerollvideo1_url"] && !playedPreroll) {
				html5VideoUrl = config["prerollvideo1_url"].replace("ads.jetpackdigital.com","h5media.jetpackdigital.com");
				savedVideoIndex = activeVideoIndex;
				activeVideoIndex = "prerollvideo1";
				playingPreroll = true;
				JP(controlbar).hide();
				JP("#stage_1fea1ae675b2ccb2649676d63665a842").bind("videoCompleted",finishedHTML5Preroll);
			} else {
				if(!config.hidecontrolbar || config.hidecontrolbar == "false") {
					JP(controlbar).show();
				}
				playingPreroll = false;
				JP("#stage_1fea1ae675b2ccb2649676d63665a842").unbind("videoCompleted",finishedHTML5Preroll);
			}
		}
		
		
	   	
	   	if(supportedCodec == "mp4") {
			if((navigator.userAgent.match(/iPhone/i))) {
				JP(videoTag).attr("src",html5VideoUrl.replace(/\.(mp4|m4v|flv|mov|f4v)$/,".iphone.mp4"));
			} else {
				JP(videoTag).attr("src",html5VideoUrl.replace(/\.(mp4|m4v|flv|mov|f4v)$/,".mp4"));
			}
		} else if(supportedCodec == "webm") {
			JP(videoTag).attr("src",html5VideoUrl.replace(/\.(mp4|m4v|flv|mov|f4v)$/,".webm"));
		} else if(suportedCodec == "ogg") {
			JP(videoTag).attr("src",html5VideoUrl.replace(/\.(mp4|m4v|flv|mov|f4v)$/,".ogv"));
		}

	   	setupHTML5Tracking();
	   	
	   	JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("videoPlayed");
	   	videoTag.play();
	};

	
	function loadHTML5VideoPlayer() {
		// Build the HTML 5 Video Tag
		videoTag = document.createElement("video");
		
		vplayer = {
			play: function(index) { if(playingPreroll) { videoTag.currentTime = 0; videoTag.volume = .5; videoTag.play(); } else { if(index) { playHTML5VideoClip(index); } else { playHTML5VideoClip(0); } JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("videoPlayed"); } return vplayer; },
			resume: function() { videoTag.play(); JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("videoPlayed"); return vplayer;},
			unload: function() { videoTag.pause(); return vplayer; },
			stop: function() { videoTag.pause(); JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("videoPaused"); return vplayer; },
			unmute: function() { videoTag.volume = .5; JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("videoUnmuted"); return vplayer; },
			mute: function() { videoTag.volume = 0; JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("videoMuted"); return vplayer; },
			setVolume: function(vol) { videoTag.volume = vol/100; return vplayer; }
		};
		
	 	JP(videoTag).attr("id","jp_videoplayer_stage_1fea1ae675b2ccb2649676d63665a842").css("width","100%").css("height","100%").attr("width","100%").attr("height","100%").attr("preload","auto").attr("data-setup","{}").attr("poster",staticImage);
	 	
	 	if(!config.usebuiltin || config.usebuiltin == "false") {
	 		JP(videoTag).attr("controls","controls");
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
			JP(videoplayer).append(videoTag);
		} else {
			supportsVideoTag = false;
			return false;
		}
		
		if(config.autoplayvideo == "true") {
	   		JP(videoTag).attr("autoplay","true");
	   		JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("videoPlayed");
	   	}
	   	
	   	if(startmuted) {
        	vplayer.mute();
        } else {
        	vplayer.unmute();
        }
	 
	   		   	
	   	var html5VideoUrl = config["video1_url"].replace("ads.jetpackdigital.com","h5media.jetpackdigital.com");
	   	activeVideoIndex = "video1";
		
		if(config["prerollvideo1_url"] && !playedPreroll) {
			html5VideoUrl = config["prerollvideo1_url"].replace("ads.jetpackdigital.com","h5media.jetpackdigital.com");
			playingPreroll = true;
			savedVideoIndex = activeVideoIndex;
			activeVideoIndex = "prerollvideo1";
			JP(controlbar).hide();
			JP("#stage_1fea1ae675b2ccb2649676d63665a842").bind("videoCompleted",finishedHTML5Preroll);
		} else {
			playingPreroll = false;
			if(!config.hidecontrolbar || config.hidecontrolbar == "false") {
				JP(controlbar).show();
			}
			JP("#stage_1fea1ae675b2ccb2649676d63665a842").unbind("videoCompleted",finishedHTML5Preroll);
		}


	   	if(supportedCodec == "mp4") {
			if((navigator.userAgent.match(/iPhone/i))) {
				JP(videoTag).attr("src",html5VideoUrl.replace(/\.(mp4|m4v|flv|mov|f4v)$/,".iphone.mp4"));
			} else {
				JP(videoTag).attr("src",html5VideoUrl.replace(/\.(mp4|m4v|flv|mov|f4v)$/,".mp4"));
			}
		} else if(supportedCodec == "webm") {
			JP(videoTag).attr("src",html5VideoUrl.replace(/\.(mp4|m4v|flv|mov|f4v)$/,".webm"));
		} else if(suportedCodec == "ogg") {
			JP(videoTag).attr("src",html5VideoUrl.replace(/\.(mp4|m4v|flv|mov|f4v)$/,".ogv"));
		}
	   	
	   	usingHtml5 = true;
	   	
	   	setupHTML5Tracking();
		
		JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("videoPlayerLoaded");
		
		return true;
	};

	
	function loadVideoPlayer() {
		var vp = document.getElementById("jp_videoplayer_stage_1fea1ae675b2ccb2649676d63665a842");
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
            	vplayer = jpflowplayer("jp_videoplayer_stage_1fea1ae675b2ccb2649676d63665a842",{src: 'http://ads.jetpackdigital.com/flowplayer/flowplayer.unlimited-3.2.7.swf', wmode: 'transparent', bgcolor: 'none', border: '0'},{
                	canvas: { backgroundImage: 'url(' + staticImage + ')'},
                	plugins: pluginconfig,
                	playlist: playlist,
                	onLoad: function() {
                		JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("videoPlayerLoaded");
                	},
                	onMute: function() {
                       	JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("videoMuted");
                    },
                        	
                    onUnmute: function() {                        	
                       	JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("videoUnmuted");
                    },
                    onStart: function() {
                    	JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("videoPlayed");
                    },
                    onResume: function() {
                    	JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("videoPlayed");
                    },
                    onFinished: function() {
                      	JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("videoFinished");
                    },
                    onPause: function() {
                    	JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("videoPaused");
                    },
                	border: '0',
                	play: {
                		url: largePlayButton,
                    	width: config.largeplaybuttonwidth,
                    	height: config.largeplaybuttonheight
               		}
                }).controls("jp_controlbar_stage_1fea1ae675b2ccb2649676d63665a842",{});
                
                videoplayerloaded = true;
                JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("videoPlayerLoaded");

				if(videoqueueindex != null) {
					play(videoqueueindex);
					videoqueueindex = null;
				}
				
            } else {
            	jpflowplayer = flowplayer;
                vplayer = jpflowplayer("jp_videoplayer_stage_1fea1ae675b2ccb2649676d63665a842",{src: 'http://ads.jetpackdigital.com/flowplayer/flowplayer.unlimited-3.2.7.swf', wmode: 'transparent', bgcolor: 'none',  border: '0'},{
                     canvas: { backgroundImage: 'url(' + staticImage + ')'},
                      plugins: pluginconfig,
                      playlist: playlist,
                      onLoad: function() {
                		JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("videoPlayerLoaded");
                	  },
                	  onMute: function() {
                       	JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("videoMuted");
                      },
                        	
                      onUnmute: function() {                        	
                       	 JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("videoUnmuted");
                      },
                      onStart: function() {
                      	JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("videoPlayed");
                      },
                      onResume: function() {
                      	JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("videoPlayed");
                      },
                      onFinished: function() {
                      	JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("videoFinished");
                      },
                      onPause: function() {
                      	JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("videoPaused");
                      }
                 }).controls("jp_controlbar_stage_1fea1ae675b2ccb2649676d63665a842",{});
                 
                 videoplayerloaded = true;
                 JP("#stage_1fea1ae675b2ccb2649676d63665a842").trigger("videoPlayerLoaded");
                 
                 if(videoqueueindex != null) {
					play(videoqueueindex);
					videoqueueindex = null;
				}
           }

			
			if(!config.usebuiltin || config.usebuiltin == "false") {
				if(config.controlbarposition == "absolute") {
						JP(controlbar).css("position","absolute");
						JP(controlbar).css("top",config.controlbartop);
						JP(controlbar).css("left",config.controlbarleft);
						JP(targElement).append(JP(controlbar));
				} else {
						JP(controlbar).css("position","relative");
						JP(videoplayerwrapper).append(JP(controlbar));
				}
			}
			
			
			
			if(config.autohidecontrols == "true") {
				JP(controlbar).hide();
				
				JP("#jp_videoplayer_stage_1fea1ae675b2ccb2649676d63665a842").mouseover(function() {
					JP(stage).trigger("showVideoControls");
				});
				
				JP("#jp_videoplayer_stage_1fea1ae675b2ccb2649676d63665a842").mouseout(function() {
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
				vplayer.setVolume(0);
				vplayer.mute();
			}
			
			if(autoplay || config.autoplayvideo == "true" || hasPreroll) {
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
		
		var stylecss = "";
		if(!config.usebuiltin || config.usebuiltin == "false") {
			stylecss = "div.jp_controlbar_stage_1fea1ae675b2ccb2649676d63665a842 {position:relative; background: transparent url(" + controlBackgroundImage + ") no-repeat; height: " + controlHeight + "; width: " + controlWidth + ";} div.jp_controlbar_stage_1fea1ae675b2ccb2649676d63665a842 .play { position:absolute; top: " + playPauseTop + "; left: " + playPauseLeft + "; width: 14px; height: 14px; display:block; background:url(" + playImage + ") no-repeat; cursor:pointer; } div.jp_controlbar_stage_1fea1ae675b2ccb2649676d63665a842 div.play:hover { background:url(" + playImageHover + ") no-repeat; } div.jp_controlbar_stage_1fea1ae675b2ccb2649676d63665a842 .pause { position:absolute; width: 14px; height: 14px; top: " + playPauseTop + "; left: " + playPauseLeft + "; display:block; background:url(" + pauseImage + ") no-repeat; cursor:pointer; } div.jp_controlbar_stage_1fea1ae675b2ccb2649676d63665a842 div.pause:hover { background: transparent url(" + pauseImageHover + ") no-repeat; } div.jp_controlbar_stage_1fea1ae675b2ccb2649676d63665a842 div.track { border: none !important; left:" + trackLeft + "; top: " + trackTop + "; position:absolute; cursor:pointer; width: " + trackWidth + "; border-left:1px solid #999; height:" + bufferheight + "; } div.jp_controlbar_stage_1fea1ae675b2ccb2649676d63665a842 div.playhead { background:  transparent url(" + scrubberImage + ") no-repeat !important; position:relative; cursor:pointer; width: " + scrubberImageWidth + "; height: " + scrubberImageHeight + "; margin-left: " + scrubberImageMarginLeft + " !important; margin-top: " + scrubberImageMarginTop + " !important; } div.jp_controlbar_stage_1fea1ae675b2ccb2649676d63665a842 div.progress { background: transparent url(" + progressImage + ") repeat-x; position:absolute; height:" + bufferheight + "; } div.jp_controlbar_stage_1fea1ae675b2ccb2649676d63665a842 div.buffer { position:absolute; background: transparent url(" + bufferImage + ") no-repeat; width: "  + bufferwidth + "; height:" + bufferheight + "; } div.jp_controlbar_stage_1fea1ae675b2ccb2649676d63665a842 div.time { display: none; } div.jp_controlbar_stage_1fea1ae675b2ccb2649676d63665a842 .mute { position:absolute; left: " + muteLeft + "; width:19px; height:14px; top: " + muteTop + "; text-align:center; cursor:pointer; background:transparent url(" + muteImageOn + ") no-repeat; } div.jp_controlbar_stage_1fea1ae675b2ccb2649676d63665a842 .unmute {position:absolute; left:" + muteLeft + "; width:19px; height:10px; top: " + muteTop + "; text-align:center; cursor:pointer; background:transparent url(" + muteImageOff + ") no-repeat; }";
		}
					
		stage.updateStyleSheet(stylecss);

	};

	this.drawElement = function(targetElement) {
				// Set the target element
				var test = document.getElementById("jp_videoplayerwrapper_stage_1fea1ae675b2ccb2649676d63665a842");
				if(test) return;
				
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
				JP(videoplayerwrapper).attr("id","jp_videoplayerwrapper_stage_1fea1ae675b2ccb2649676d63665a842");
			
				if(config.addclass) {
                        JP(videoplayerwrapper).addClass(config.addclass);
                }
                
                if(config.usevideoclickthrough && config.usevideoclickthrough == "true") {
                	var videoclickthrough = document.createElement("div");
                	JP(videoclickthrough).css("width",config.width).css("height",config.height).css("z-index","2500000").css("position","absolute").css("top","0px").css("left","0px").css("cursor","pointer");
					JP(videoclickthrough).html("<object id='jpclick_object' type='img/gif' style='background-color: transparent'><div id='jpclick_image' style='background: transparent url(http://ads.jetpackdigital.com/tracking_pixel.gif); height: 100%; width: 100%;'></div></object>");
					//JP(videoclickthrough).append(indiv);

                	JP(videoclickthrough).click(function() {
                		
                		if(playingPreroll && config.prerollclickthrough) {
                			videourl = tp + "&t=prerollClickThrough&u=" + config.prerollclickthrough.replace("[random]",ord);
                		} else {
                			videourl = (config.videocturl) ? tp + "&t=videoClickThrough&u=" + config.videocturl : clickThroughUrl;
                			stop();
                		}
                		window.open(videourl,"_blank");
                		
                	});
                	JP(videoplayerwrapper).append(videoclickthrough);
                	
                }
			
				videoplayer = document.createElement("div");
		
				JP(videoplayer).css("position","relative");
				JP(videoplayer).css("background-color","transparent");
				JP(videoplayer).attr("id","jp_videoplayer_stage_1fea1ae675b2ccb2649676d63665a842");
				JP(videoplayer).css("z-index","2000002");
				
				
				JP(videoplayer).css("height",config.height);
				JP(videoplayer).css("width",config.width);
				
				JP(videoplayerwrapper).append(JP(videoplayer));
				JP(targetElement).append(JP(videoplayerwrapper));
			
				controlbar = document.createElement("div");
				JP(controlbar).attr("class","jp_controlbar_stage_1fea1ae675b2ccb2649676d63665a842 jp_controlbar");
				JP(controlbar).attr("id","jp_controlbar_stage_1fea1ae675b2ccb2649676d63665a842");
				JP(controlbar).css("z-index","3000003");
				JP(controlbar).css("background-color","transparent");
				
				if(config.hidecontrolbar == "true") {
					JP(controlbar).css("display","none");
				}
				
				if(config.usebuiltin && config.usebuiltin == "true") {
					JP(videoplayerwrapper).append(controlbar);
					
					var vwidth = JP(videoplayerwrapper).width();
var vheight = JP(videoplayerwrapper).height();

var zoomvalue =  vwidth / 640;
var cheight = Math.round(zoomvalue * 41, 0);
var cwidth = Math.round(zoomvalue * 559, 0); 

var ctop = vheight - 10 - cheight;
var cleft = (vwidth - cwidth)/2;

var controlwidth = Math.round(zoomvalue * 25,0);
var controlheight = Math.round(zoomvalue * 25,0);

var rewindleft = Math.round(zoomvalue * 17, 0);
var rewindtop = Math.round(zoomvalue * 7, 0);

var playleft = Math.round(zoomvalue * 68, 0);
var playtop = Math.round(zoomvalue * 7, 0);

var muteleft = Math.round(zoomvalue * 519, 0);
var mutetop = Math.round(zoomvalue * 7, 0);
					
var trackwidth = Math.round(zoomvalue * 383,0);
var trackheight = Math.round(zoomvalue * 17, 0);
var trackleft = Math.round(zoomvalue * 120, 0);
var tracktop = Math.round(zoomvalue * 10, 0);

var phwidth = Math.round(zoomvalue * 33, 0);
var phheight = Math.round(zoomvalue * 33, 0);
var phleft = Math.round(zoomvalue * -6, 0);
var phtop = Math.round(zoomvalue * -6, 0);

var progressheight = Math.round(zoomvalue * 18, 0);

					
JP(controlbar).css("width",cwidth + "px").css("height", cheight + "px").css("left",cleft + "px").css("top",ctop + "px").css("position","absolute");

if(!(navigator.userAgent.match(/iPhone/i)) && !(navigator.userAgent.match(/iPad/i))) {
	JP(controlbar).css("opacity",".3");
	JP(controlbar).mouseover(function() { JP(controlbar).css("opacity","1");});
	JP(controlbar).mouseout(function() { JP(controlbar).css("opacity",".3");});
}
					
JP(controlbar).html('<img src="http://ads.jetpackdigital.com/lib/vcontrols/bar.png" style="height: 100%; width: 100%; position: absolute; top: 0; left: 0;"><a class="rewind" id="jprewind" style="cursor: pointer; height: ' + controlheight + 'px !important; width: ' + controlwidth + 'px !important; position: absolute; top: ' + rewindtop + 'px; left: ' + rewindleft + 'px;"><img id="jprewindimage" src="http://ads.jetpackdigital.com/lib/vcontrols/rewind.png" border="0" style="height: 100%; width: 100%;"><img id="jprewindimage_ro" src="http://ads.jetpackdigital.com/lib/vcontrols/rewind_ro.png" border="0" style="height: 100%; width: 100%; display:none;"></a><a class="play" id="jpplay" style="cursor: pointer; height: ' + controlheight + 'px !important; width: ' + controlwidth + 'px !important; position: absolute; top: ' + playtop + 'px; left: ' + playleft + 'px;"><img id="jpplayimage" src="http://ads.jetpackdigital.com/lib/vcontrols/play.png" style="height: 100%; width: 100%;" border="0"><img id="jpplayimage_ro" src="http://ads.jetpackdigital.com/lib/vcontrols/play_ro.png" style="height: 100%; width: 100%; display:none;" border="0"><img id="jppauseimage" src="http://ads.jetpackdigital.com/lib/vcontrols/pause.png" style="height: 100%; width: 100%;display:none;" border="0"><img id="jppauseimage_ro" src="http://ads.jetpackdigital.com/lib/vcontrols/pause_ro.png" style="height: 100%; width: 100%;display:none;" border="0"></a><div class="track" style="cursor: pointer; width: ' + trackwidth + 'px; height: ' + trackheight + 'px; position: absolute; top: ' + tracktop + 'px; left: ' + trackleft + 'px;"><div class="buffer"></div><div class="progress" style="width: 1px; height: ' + progressheight + 'px; position: absolute; top: 0; left: 0; "><img src="http://ads.jetpackdigital.com/lib/vcontrols/progress.jpg" style="height: 100%; width: 100%;" border="0"></div><div class="playhead" style="height: ' + phheight + 'px !important; width: ' + phwidth + 'px !important; position: absolute; top: ' + phtop + 'px; left: ' + phleft + 'px;"><img src="http://ads.jetpackdigital.com/lib/vcontrols/head.png" style="height: 100%; width: 100%;" border="0"></div></div><div class="time" style="display: none;"></div><a class="mute" style="cursor: pointer; height: ' + controlheight + 'px !important; width: ' + controlwidth + 'px !important; position: absolute; top: ' + mutetop + 'px; left: ' + muteleft + 'px;"><img id="jpmuteimage" src="http://ads.jetpackdigital.com/lib/vcontrols/audio.png" style="height: 100%; width: 100%;" border="0"><img id="jpunmuteimage" src="http://ads.jetpackdigital.com/lib/vcontrols/mute.png" style="height: 100%; width: 100%;display:none;" border="0"></a>');


JP("#jp_controlbar_<?=$this->parentId?> #jpplayimage").mouseover(function() { JP("#jpplayimage").hide();JP("#jpplayimage_ro").show();});
JP("#jp_controlbar_<?=$this->parentId?> #jpplayimage_ro").mouseout(function() { if(!videoPlaying) { JP("#jpplayimage").show();JP("#jpplayimage_ro").hide();}});
JP("#jp_controlbar_<?=$this->parentId?> #jppauseimage").mouseover(function() { JP("#jppauseimage").hide();JP("#jppauseimage_ro").show();});
JP("#jp_controlbar_<?=$this->parentId?> #jppauseimage_ro").mouseout(function() { if(videoPlaying) { JP("#jppauseimage").show();JP("#jppauseimage_ro").hide(); }});
JP("#jp_controlbar_<?=$this->parentId?> #jprewindimage").mouseover(function() { JP("#jprewindimage").hide();JP("#jprewindimage_ro").show();});
JP("#jp_controlbar_<?=$this->parentId?> #jprewindimage_ro").mouseout(function() { JP("#jprewindimage").show();JP("#jprewindimage_ro").hide(); });
												
// Add replay button to the stage
replaybutton = document.createElement("div");
var rbwidth = Math.round(zoomvalue * 179, 0);
var rbheight = Math.round(zoomvalue * 42, 0);
var rbleft = Math.round((vwidth - rbwidth)/2,0);
var rbtop = Math.round((vheight - rbheight)/2,0);
JP(replaybutton).css("display","none").css("cursor","pointer").css("height",rbheight + "px").css("width", rbwidth +"px").css("top",rbtop + "px").css("left",rbleft + "px").css("position","absolute").css("z-index","2100000000").html("<img id='jpr' src='http://ads.jetpackdigital.com/lib/vcontrols/replay.png' border='0' style='height: 100%; width: 100%;'><img id='jpr_ro' src='http://ads.jetpackdigital.com/lib/vcontrols/replay_ro.png' border='0' style='height: 100%; width: 100%; display: none;'>");

JP(replaybutton).click(function() { JP(replaybutton).hide(); jpTrack("clicked replay"); startmuted=false; vplayer.unmute().setVolume(80); play();});
JP(replaybutton).mouseover(function() { JP("#jpr_ro").show(); JP("#jpr").hide(); });
JP(replaybutton).mouseout(function() { JP("#jpr_ro").hide(); JP("#jpr").show(); });
JP(stage_id).bind("videoCompleted",function() { if(!playingPreroll) { JP(replaybutton).show(); } });
JP(videoplayerwrapper).append(replaybutton);

if(((config.manualautoplay && config.manualautoplay == "true") || autoplay) && startmuted) {
	clickforsound = document.createElement("div");
	var cswidth = Math.round(zoomvalue * 640, 0);
	var csheight = Math.round(zoomvalue * 50, 0);
	var csleft = 0;
	var cstop = Math.round((vheight - csheight)/2,0);
	JP(clickforsound).attr("id","jpcfs_div").css("cursor","pointer").css("height",csheight + "px").css("width", cswidth +"px").css("top",cstop + "px").css("left",csleft + "px").css("position","absolute").css("z-index","2100000000").html("<img id='jpcfs' src='http://ads.jetpackdigital.com/lib/vcontrols/clickforsound.png' border='0' style='height: 100%; width: 100%;'><img id='jpcfs_ro' src='http://ads.jetpackdigital.com/lib/vcontrols/clickforsound_ro.png' border='0' style='height: 100%; width: 100%; display: none;'>");
	
	JP(videoplayerwrapper).append(clickforsound);

	JP(clickforsound).mouseover(function() { JP("#jpcfs").hide(); JP("#jpcfs_ro").show(); });
	JP(clickforsound).mouseout(function() { JP("#jpcfs").show(); JP("#jpcfs_ro").hide(); });
	JP(clickforsound).click(function() { JP(clickforsound).hide(); startmuted=false; vplayer.unmute().setVolume(80); play(); });
	JP(stage_id).bind("videoCompleted",function() { if(!playingPreroll) { JP(clickforsound).hide();} });
	JP(stage_id).bind("videoUnmuted", function() { JP(clickforsound).hide();});
}
					
					JP("#jp_controlbar_stage_1fea1ae675b2ccb2649676d63665a842 .progress").css("border-radius","3px").css("-moz-border-radius","3px");
					if(config.progresscolor) {
						JP("#jp_controlbar_stage_1fea1ae675b2ccb2649676d63665a842 .progress").empty().css("border-radius","3px").css("-moz-border-radius","3px").css("background-color",config.progresscolor);
					}
					
					if(config.trackcolor) {
						JP("#jp_controlbar_stage_1fea1ae675b2ccb2649676d63665a842 .track").css("border-radius","3px").css("-moz-border-radius","3px").css("background-color",config.trackcolor);
					}
										
					JP("#stage_1fea1ae675b2ccb2649676d63665a842").bind("videoPlayed",function() { JP("#jpplayimage").hide(); JP("#jpplayimage_ro").hide(); JP("#jppauseimage").show(); JP(replaybutton).hide(); videoPlaying = true;});
					JP("#stage_1fea1ae675b2ccb2649676d63665a842").bind("videoPaused",function() { JP("#jppauseimage").hide(); JP("#jppauseimage_ro").hide(); JP("#jpplayimage").show(); videoPlaying = false; });
					JP("#stage_1fea1ae675b2ccb2649676d63665a842").bind("videoMuted",function() { JP("#jpmuteimage").hide(); JP("#jpunmuteimage").show();});
					JP("#stage_1fea1ae675b2ccb2649676d63665a842").bind("videoUnmuted",function() { JP("#jpunmuteimage").hide(); JP("#jpmuteimage").show(); });
					JP("#stage_1fea1ae675b2ccb2649676d63665a842").bind("videoCompleted",function() { JP("#jppauseimage").hide(); JP("#jpplayimage").show(); });
					
					if(config.hidebuffer == "true") {
						JP(".track").hide();
					}		
									
					// Hide the large play button
					config.largeplaybutton_url = "http://ads.jetpackdigital.com/tracking_pixel.gif";
					config.largeplaybuttonwidth = "1px";
					config.largeplaybuttonheight = "1px";
					
					JP("#jp_controlbar_stage_1fea1ae675b2ccb2649676d63665a842 .rewind").click(function() { startmuted=false; vplayer.unmute().setVolume(80); play(); });

					/* HTML5 Controllers */
					JP("#jp_controlbar_stage_1fea1ae675b2ccb2649676d63665a842 #jpplayimage_ro, #jp_controlbar_stage_1fea1ae675b2ccb2649676d63665a842 #jpplayimage").click(function() { if(usingHtml5) { vplayer.resume(); JP(this).removeClass("play"); JP(this).addClass("pause"); }});
					JP("#jp_controlbar_stage_1fea1ae675b2ccb2649676d63665a842 #jppauseimage_ro, #jp_controlbar_stage_1fea1ae675b2ccb2649676d63665a842 #jppauseimage").click(function() { if(usingHtml5) { vplayer.stop(); JP(this).removeClass("pause"); JP(this).addClass("play"); }});
					JP("#jp_controlbar_stage_1fea1ae675b2ccb2649676d63665a842 #jpmuteimage").click(function() { if(usingHtml5) { vplayer.mute(); JP(this).removeClass("mute"); JP(this).addClass("unmute"); }});
					JP("#jp_controlbar_stage_1fea1ae675b2ccb2649676d63665a842 #jpunmuteimage").click(function() { if(usingHtml5) { vplayer.unmute(); JP(this).removeClass("unmute"); JP(this).addClass("mute"); }});
					
					JP("#stage_1fea1ae675b2ccb2649676d63665a842").bind("videoTimeUpdate",function() { if(usingHtml5) { var phleftnew = Math.round(trackwidth * (cuepoint/fullDuration), 0) + phleft - Math.round(phwidth * (cuepoint/fullDuration),0) ; JP("#jp_controlbar_stage_1fea1ae675b2ccb2649676d63665a842 .playhead").css("left",phleftnew + "px"); JP("#jp_controlbar_stage_1fea1ae675b2ccb2649676d63665a842 .progress").css("width", Math.round(phleftnew + (phwidth/2),0)  + "px");}});
					
				} else {
				
									
					JP(controlbar).html('<a class="play"></a><div class="track"><div class="buffer"></div><div class="progress"></div><div class="playhead"></div></div><div class="time"></div><a class="mute"></a>');
					JP(controlbar).css("position","absolute");
					//JP(controlbar).css("top","-9999px");
					JP("body").append(controlbar);
					
					if(config.hidebuffer == "true") {
						JP(".track").hide();
					}
					
					if(config.playImageHeight) {
						JP("#jp_controlbar_stage_1fea1ae675b2ccb2649676d63665a842 .play").css("height",config.playImageHeight);
					}
					
					if(config.muteImageHeight) {
						JP("#jp_controlbar_stage_1fea1ae675b2ccb2649676d63665a842 .mute").css("height",config.muteImageHeight);
					}
					
					if(config.controlBarMarginLeft) {
						JP("#jp_controlbar_stage_1fea1ae675b2ccb2649676d63665a842").css("margin-left",config.controlBarMarginLeft);
					}
					
					if(config.controlBarMarginTop) {
						JP("#jp_controlbar_stage_1fea1ae675b2ccb2649676d63665a842").css("margin-top",config.controlBarMarginTop);
					}
					
					if(config.bufferMarginTop) {
						JP("#jp_controlbar_stage_1fea1ae675b2ccb2649676d63665a842 .buffer").css("margin-top",config.bufferMarginTop);
						JP("#jp_controlbar_stage_1fea1ae675b2ccb2649676d63665a842 .progress").css("margin-top",config.bufferMarginTop);
						JP("#jp_controlbar_stage_1fea1ae675b2ccb2649676d63665a842 .playhead").css("margin-top",config.bufferMarginTop);
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
				
				if(jpdGetCookie("stage_1fea1ae675b2ccb2649676d63665a842_c") == "1") {
					JP(videoplayerwrapper).css("top","-9999px");
					//JP(videoplayerwrapper).css("display","none");
				}
	   	
	   				
		
			
									JP("#stage_1fea1ae675b2ccb2649676d63665a842").bind("clickClose",function(){ 
					JP(videoplayerwrapper).css("top","-9999px"); vplayer.stop(); 				});
							JP("#stage_1fea1ae675b2ccb2649676d63665a842").bind("stageCollapsed",function(){ 
					JP(videoplayerwrapper).css("top","-9999px"); vplayer.stop(); 				});
							JP("#stage_1fea1ae675b2ccb2649676d63665a842").bind("expandStage",function(){ 
					JP(videoplayerwrapper).css("top","80px");startmuted=false; vplayer.unmute().setVolume(80).play(0);				});
							JP("#stage_1fea1ae675b2ccb2649676d63665a842").bind("clickPlay",function(){ 
					JP(videoplayerwrapper).css("top","80px");startmuted=false; vplayer.unmute().setVolume(50).play(0);				});
							JP("#stage_1fea1ae675b2ccb2649676d63665a842").bind("clickMainVideo",function(){ 
					JP(videoplayerwrapper).css("top","30px");startmuted=false; vplayer.unmute().setVolume(50).play(0); JP(".jp_controlbar").css("top","356px");				});
							JP("#stage_1fea1ae675b2ccb2649676d63665a842").bind("clickReplay",function(){ 
					JP(videoplayerwrapper).css("top","52px");startmuted=false; vplayer.unmute().setVolume(80).play(0); JP(".jp_controlbar").css("top","309px");				});
							JP("#stage_1fea1ae675b2ccb2649676d63665a842").bind("clickWatch",function(){ 
					JP(videoplayerwrapper).css("top","89px");startmuted=false; vplayer.unmute().setVolume(80).play(0); JP(".jp_controlbar").css("top","195px");				});
							
		if(!supportsVideoTag || (hasFlash && config.forcehtml5 != "true")) {
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


module_VideoPlayerModule_10_stage_1fea1ae675b2ccb2649676d63665a842 = null;

if(jpinlineunit) {
	module_VideoPlayerModule_10_stage_1fea1ae675b2ccb2649676d63665a842 = new VideoPlayer_VideoPlayerModule_10_stage_1fea1ae675b2ccb2649676d63665a842();
	module_VideoPlayerModule_10_stage_1fea1ae675b2ccb2649676d63665a842.updateStyleSheet();
	if(typeof flowplayer == "undefined") {
		JP.getScript("http://ads.jetpackdigital.com/flowplayer/flowplayer-3.2.4.min.js", function(){
			
				JP.getScript("http://ads.jetpackdigital.com/flowplayer/flowplayer.controls-3.0.2.min.js", function(){

					module_VideoPlayerModule_10_stage_1fea1ae675b2ccb2649676d63665a842.drawElement("#stage_1fea1ae675b2ccb2649676d63665a842");
				});
			});
	} else {
		JP.getScript("http://ads.jetpackdigital.com/flowplayer/flowplayer.controls-3.0.2.min.js", function(){
			//module_VideoPlayerModule_10_stage_1fea1ae675b2ccb2649676d63665a842 = new VideoPlayer_VideoPlayerModule_10_stage_1fea1ae675b2ccb2649676d63665a842();
			module_VideoPlayerModule_10_stage_1fea1ae675b2ccb2649676d63665a842.drawElement("#stage_1fea1ae675b2ccb2649676d63665a842");
		});
		
	}
} else {
	/*JP(document).ready(function() {*/
	jpElementReady("stage_1fea1ae675b2ccb2649676d63665a842",function() { 
		
		module_VideoPlayerModule_10_stage_1fea1ae675b2ccb2649676d63665a842 = new VideoPlayer_VideoPlayerModule_10_stage_1fea1ae675b2ccb2649676d63665a842();
		module_VideoPlayerModule_10_stage_1fea1ae675b2ccb2649676d63665a842.updateStyleSheet();
		if(1 || typeof flowplayer == 'undefined') {
			JP.getScript("http://ads.jetpackdigital.com/flowplayer/flowplayer-3.2.4.min.js", function(){
			
				JP.getScript("http://ads.jetpackdigital.com/flowplayer/flowplayer.controls-3.0.2.min.js", function(){				
					
					module_VideoPlayerModule_10_stage_1fea1ae675b2ccb2649676d63665a842.drawElement("#stage_1fea1ae675b2ccb2649676d63665a842");
				});
			});
		} else {
			
			JP.getScript("http://ads.jetpackdigital.com/flowplayer/flowplayer.controls-3.0.2.min.js", function(){
				//module_VideoPlayerModule_10_stage_1fea1ae675b2ccb2649676d63665a842 = new VideoPlayer_VideoPlayerModule_10_stage_1fea1ae675b2ccb2649676d63665a842();
				module_VideoPlayerModule_10_stage_1fea1ae675b2ccb2649676d63665a842.drawElement("#stage_1fea1ae675b2ccb2649676d63665a842");
			});
		}
	});
};
stage.updateStyleSheet("");

/* CUSTOM JS */



/* END CUSTOM JS */



			if(jpinlineunit) { 
				stage.drawStyleSheet(); 
				if(JP('#stage_1fea1ae675b2ccb2649676d63665a842').attr('loadtrigger')) {
					JP('#stage_1fea1ae675b2ccb2649676d63665a842').trigger(JP('#stage_1fea1ae675b2ccb2649676d63665a842').attr('loadtrigger'));
				};
			
				JP('#stage_1fea1ae675b2ccb2649676d63665a842').trigger('stageLoaded');
				JP(document).trigger('stageLoaded');
			/*} else { JP(document).ready(function() {*/
			} else { jpElementReady('stage_1fea1ae675b2ccb2649676d63665a842',function() { 
				stage.drawStyleSheet(); 
				if(JP('#stage_1fea1ae675b2ccb2649676d63665a842').attr('loadtrigger')) {
					JP('#stage_1fea1ae675b2ccb2649676d63665a842').trigger(JP('#stage_1fea1ae675b2ccb2649676d63665a842').attr('loadtrigger'));
				};
			
				JP('#stage_1fea1ae675b2ccb2649676d63665a842').trigger('stageLoaded');
				JP(document).trigger('stageLoaded');
			});};
				
					shStageId = "stage_1fea1ae675b2ccb2649676d63665a842";
				
		

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
		
				
				
		} catch(ex) {
			if(typeof console != "undefined") {
				console.log("SUPERHEADER ERROR: " + ex.message);
			}
		}
		
					
	};
	
		
	this.ReportDelivery = function() {

		if(!this.running) return;
		
				
		
		if(typeof ord == 'undefined') ord=Math.floor(Math.random()*1000000000);
		var local_ord = Math.floor(Math.random()*1000000000);
		
		var img = new Image();
		img.src = 'http://jptracking.elasticbeanstalk.com/jpt?ord='+ord+'&lid=6476&c=0&jp=' + local_ord;
		/*
		var imgdiv = document.createElement("div");
		JP(imgdiv).css("height","1px");
		JP(imgdiv).css("position","absolute").css("top","-9999px");
		var img = document.createElement("img");
		
		JP(img).attr("src",'http://jptracking.elasticbeanstalk.com/jpt?ord='+ord+'&lid=6476&c=0');
		JP(imgdiv).append(img);
		JP(document.body).append(JP(imgdiv));
		*/
			};
	
	this.ShowTracking = function() {
			};
};

 customunit_6476_0 = new superheader_325__6476(); customunit_6476_0.Init(); customunit_6476_0.Run(); customunit_6476_0.ReportDelivery();};

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
				setTimeout("jpLoadJQuery_6476()",jptimeout);	
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
 				
 				
				setTimeout("jpLoadJQuery_6476()",jptimeout);
		}
};

};

};
