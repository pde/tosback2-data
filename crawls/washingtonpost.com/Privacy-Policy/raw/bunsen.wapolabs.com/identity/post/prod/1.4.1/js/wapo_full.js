TWP_Debug.pagedebug && window.console && console.log && console.log('[' + (new Date()-TWP_Debug.initialTime)/1000 + ']' + 'wapo_full.js - top');

function WapoSite(name, url, visId) {
	this.name = name;
	this.url = url;
	this.visId = visId;
}

function WapoEnv() {
	this.wapolabs_js = 'http://bunsen.wapolabs.com/wapolabs/1.4.2.2/js/wapolabs.nojq.full.js';
	this.waposites_js = 'http://bunsen.wapolabs.com/identity/js/wapo_sites.js';
	this.cdn_identity = 'http://bunsen.wapolabs.com/identity/1.4.1/';
	this.cdn_images_identity = 'http://beaker.wapolabs.com/identity/1.4.1/';
	this.fb_key = 'afcaa5748faa7c83301bb507d5eebb1f';
	this.publicationName = 'Washington Post';
	this.site_base_domain  = 'washingtonpost.com';
	this.site_path = '/';
	this.jskit_div = 'js-kit-comments';
	this.jskit_class = 'js-kit-comments';
	this.jskit_consumer_key = 'prod.washpost.com';
	this.wapo_secure_protocol  = 'https:';
	this.wapo_site_url  = '//id.washingtonpost.com/identity/';
	this.site_url  = '//www.washingtonpost.com/';
	this.wapo_public_protocol  = 'http:';
	this.visitor_session_length  = '30';
	this.customLoginTrigger = false;
	this.set_domain = false;

        this.jskit_commenting_group = 'post_registration';
        this.wapo_reg_url = 'http://www.washingtonpost.com/ac2/wp-dyn?node=profile/create&url=';

	this.param_name_jsonp_callback = 'jsonp_callback';
	this.param_name_nonce = 'wp_id_n';
	this.param_name_email_nonce  = 'wp_em_n';
	this.meta_tag_groups  = 'wapoGroups';
	this.meta_tag_optional_groups  = 'wapoOptionalGroups';
	this.param_name_redirect  = 'next_url';
	this.param_name_previous_url  = 'previous_url';
	this.param_name_no_cancel  = 'wp_no_cancel';
	this.param_name_regis_group_name  = 'reg_group';
	this.param_name_login_id  = 'loginId';
	this.param_name_show_registration  = 'show_registration';
	this.param_name_registration_redirect  = 'wp_regis_redirect';
	this.param_name_login_redirect  = 'wp_login_redirect';
	this.place_holder  = 'ph';
	this.cookie_display  = 'wapo_display';
	this.cookie_avatar  = 'washingtonpost_avatar';
	this.cookie_groups  = 'wapo_groups';
	this.cookie_vis_id  = 'wapo_vis_id';
	this.cookie_login_id  = 'wapo_login_id';
	this.cookie_previous_ip  = 'wapo_saved_ip';
	this.cookie_last_ip = 'wapo_last_ip';
	this.cookie_omniture  = 's_vi';
	this.cookie_previous_omniture  = 'wapo_saved_omnitureid';
	this.cookie_previous_ip  = 'wapo_saved_ip';
	this.cookie_session_id  = 'wapo_sess_id';
	this.cookie_wpni_id = 'wpniuser';

        this.event_name_login = 'wapoLogin';
        this.event_name_new_registration = 'wapoRegister';
        this.event_name_logout = 'wapoLogout';

}


var wapoEnv = new WapoEnv();

/**
 * run before any other wapolabs jquery
 */
//var $wpjQ = typeof $wpjQ && $wpjQ || jQuery;
window['$wpjQ'] = typeof window['$wpjQ'] !== 'undefined' && window['$wpjQ'] || jQuery;

eval($wpjQ('script[src$=wapolabs.nojq.full.js]').html());
// set global variable


//var wapoUtilities,

// create global object
WapoUtil = function(){};


// gets cookie with specified name
// function Get_Cookie( check_name ) {
WapoUtil.prototype.Get_Cookie = function( check_name ) {
	var a_all_cookies, a_temp_cookie, cookie_name, cookie_value, b_cookie_found, cookie_regex, i;

	// first we'll split this cookie up into name/value pairs
	// note: document.cookie only returns name=value, not the other components
	a_all_cookies = document.cookie.split( ';' );
	b_cookie_found = false; // set boolean t/f default false
  cookie_regex = /^(.*?)(=)(.*?)$/;
  

	i = a_all_cookies.length;	
	while(i--){
		// split on first = sign
		a_temp_cookie = a_all_cookies[i].match(cookie_regex);
    // result will be like:
    // [0]   whole cookie string,
    // [1]  cookie name,
    // [2]  equal sign,
    // [3]  cookie value,
    // 
    
    if( typeof(a_temp_cookie) !== 'undefined' && a_temp_cookie !== null) {
		// and trim left/right whitespace while we're at it
		cookie_name = a_temp_cookie[1].replace(/^\s+|\s+$/g, '');

		// if the extracted name matches passed check_name
		if ( cookie_name === check_name ) {
			b_cookie_found = true;
			// we need to handle case where cookie has no value but exists (no = sign, that is):
			if ( a_temp_cookie[2] === '=' ) {
				cookie_value = unescape( a_temp_cookie[3].replace(/^\s+|\s+$/g, '') );
			}
			// note that in cases where cookie is initialized but no value, null is returned
			return cookie_value;
			// break;  /* unreachable break? */
		}
	}	
		a_temp_cookie = null;
		cookie_name = '';
	}
	if ( !b_cookie_found ) {
		return null;
	}
};

//this deletes the cookie when called
// function Delete_Cookie( name, path, domain ) {
WapoUtil.prototype.Delete_Cookie = function( name, path, domain ) {
	if ( this.Get_Cookie( name ) ) {
		document.cookie = name + "=" +
	        ( ( path ) ? ";path=" + path : "") +
	        ( ( domain ) ? ";domain=" + domain : "" ) +
	        ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
	}
};

// function Set_Cookie( name, value, expires, path, domain, secure )
WapoUtil.prototype.Set_Cookie = function( name, value, expires, path, domain, secure ) {
	var today, expires_date;
	
	// set time, it's in milliseconds
	today = new Date();
	today.setTime( today.getTime() );

	/*if the expires variable is set, make the correct
	  expires time, the current script below will set
	  it for x number of days, to make it for hours,
	  delete * 24, for minutes, delete * 60 * 24
	 */
	if ( expires ) {
		expires = expires * 1000 * 60 * 60 * 24;
	}
	expires_date = new Date( today.getTime() + (expires) );

	document.cookie = name + "=" + escape( value ) +
		( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
		( ( path ) ? ";path=" + path : "" ) +
		( ( domain ) ? ";domain=" + domain : "" ) +
		( ( secure ) ? ";secure" : "" );
};

// function Get_Request_Parameter ( queryString, parameterName ) {
WapoUtil.prototype.Get_Request_Parameter = function( queryString, parameterName ) {
	var begin, end;

    // Add "=" to the parameter name (i.e. parameterName=value)
    parameterName = parameterName + "=";
    if ( queryString.length > 0 ) {
        // Find the beginning of the string
        begin = queryString.indexOf ( parameterName );
        // If the parameter name is not found, skip it, otherwise return the value
        if ( begin !== -1 ) {
            // Add the length (integer) to the beginning
            begin += parameterName.length;
            // Multiple parameters are separated by the "&" sign
            end = queryString.indexOf ( "&" , begin );
			if ( end === -1 ) {
				end = queryString.length;
			}
			// Return the string
			return unescape ( queryString.substring ( begin, end ) );
		}
		// Return "null" if no parameter has been found
		return "null";
    }
};

// function getParameter ( parameterName ) {
WapoUtil.prototype.getParameter = function( parameterName ) {
	var queryString, begin, end;

    queryString = window.top.location.search.substring(1);
    // Add "=" to the parameter name (i.e. parameterName=value)
    parameterName = parameterName + "=";
    if ( queryString.length > 0 ) {
        // Find the beginning of the string
        begin = queryString.indexOf ( parameterName );
        // If the parameter name is not found, skip it, otherwise return the value
        if ( begin !== -1 ) {
            // Add the length (integer) to the beginning
            begin += parameterName.length;
            // Multiple parameters are separated by the "&" sign
            end = queryString.indexOf ( "&" , begin );
            if ( end === -1 ) {
                end = queryString.length;
            }
            // Return the string
            return unescape ( queryString.substring ( begin, end ) );
        }
        // Return "null" if no parameter has been found
        return "null";
    }
};

// function getBaseDomainName( hostName ) {
WapoUtil.prototype.getBaseDomainName = function( hostName ) {
	var baseDomainName, lastDotIdx, secondDotIdx;

    baseDomainName = hostName;
    lastDotIdx = hostName.lastIndexOf('.');
    if (lastDotIdx > -1) {
      secondDotIdx = hostName.lastIndexOf('.', lastDotIdx - 1);
      if (secondDotIdx > -1) {
        baseDomainName = hostName.substring(secondDotIdx + 1);
      }
    }

    return baseDomainName;
};


// check to see if the client s_vi cookie exists already, and if it doesn't kick off the process to create it
WapoUtil.prototype.checkVisitorId = function( domain ) {
	var cookieExists, wapoIFrame;
	
	cookieExists = wapoUtilities.Get_Cookie('s_vi');
	
	if (cookieExists === null) {
		wapoIFrame = document.createElement( 'iframe' );
		wapoIFrame.height = 1;
		wapoIFrame.width = 1;
		wapoIFrame.style.display= 'none';
		wapoIFrame.src = 'http://www.washingtonpost.com/wp-srv/wapolabs/dw/readomniturecookie.html?' + domain;
		document.getElementById( 'wapo_338542' ).appendChild( wapoIFrame );
	}
}


window.wapoUtilities = typeof window.wapoUtilities !== 'undefined' && window.wapoUtilities || new WapoUtil();

var wapoSites = new Array();
wapoSites[0] = { "name" : "TheRoot", "url" : "http://id.theroot.com/identity/", "visId" : null };
wapoSites[1] = { "name" : "Slate", "url" : "http://id.slate.com/identity/", "visId" : null };
wapoSites[2] = { "name" : "Washopedia", "url" : "http://id.expressnightout.com/identity/", "visId" : null };
wapoSites[3] = { "name" : "Washington Post", "url" : "http://id.washingtonpost.com/identity/", "visId" : null };
wapoSites[4] = { "name" : "Trove", "url" : "http://id.trove.com/identity/", "visId" : null };


// for JSLint
/*
 * Thickbox 3.1 - One Box To Rule Them All.
 * By Cody Lindley (http://www.codylindley.com)
 * Copyright (c) 2007 cody lindley
 * Licensed under the MIT License: http://www.opensource.org/licenses/mit-license.php
*/		  
var tb_pathToImage = wapoEnv.cdn_identity + "images/jquery/loadingAnimation.gif";
var tb_css_loaded = $wpjQ('head').append("<link rel='stylesheet' href='" + wapoEnv.cdn_identity + "css/jquery/thickbox.css' type='text/css' media='screen'/>");


/*!!!!!!!!!!!!!!!!! edit below this line at your own risk !!!!!!!!!!!!!!!!!!!!!!!*/

imgLoader = new Image();// preload image
imgLoader.src = tb_pathToImage;
//on page load call tb_init
$wpjQ(document).ready(function(){
	tb_init('a.thickbox, area.thickbox, input.thickbox');//pass where to apply thickbox
});

//add thickbox to href & area elements that have a class of .thickbox
function tb_init(domChunk, callback){
	$wpjQ(domChunk).click(function(){
	var t = this.title || this.name || null;
	var a = this.href || this.alt;
	var g = this.rel || false;
	tb_show(t,a,g);
	this.blur();
	return false;
	});
	
	if(typeof(callback) != 'undefined')
	{
	  callback();
	}
}

function tb_show(caption, url, imageGroup) {//function called when the user clicks on a thickbox link
	try {
		if (typeof document.body.style.maxHeight === "undefined") {//if IE 6
			$wpjQ("body","html").css({height: "100%", width: "100%"});
			$wpjQ("html").css("overflow","hidden");
			if (document.getElementById("TB_HideSelect") === null) {//iframe to hide select elements in ie6
				$wpjQ("body").append("<iframe id='TB_HideSelect'></iframe><div id='TB_overlay'></div><div id='TB_window'></div>");
				$wpjQ("#TB_overlay").click(tb_remove);
			}
		}else{//all others
			if(document.getElementById("TB_overlay") === null){
				$wpjQ("body").append("<div id='TB_overlay'></div><div id='TB_window'></div>");
				$wpjQ("#TB_overlay").click(tb_remove);
			}
		}
		
		if(tb_detectMacXFF()){
			$wpjQ("#TB_overlay").addClass("TB_overlayMacFFBGHack");//use png overlay so hide flash
		}else{
			$wpjQ("#TB_overlay").addClass("TB_overlayBG");//use background and opacity
		}
		
		if(caption===null){caption="";}
	    $wpjQ("body").addClass('tb-enabled').append("<div id='TB_load'><p style='color:#ddd;'>Loading...</p><img src='"+imgLoader.src+"' /><a href='javascript:void(null)' onclick='tb_remove()'><img src='"+wapoEnv.cdn_images_identity+"images/jquery/close.png'/></a></div>");//add loader to the page
		$wpjQ('#TB_load').show();//show loader
		
		var baseURL;
	   if(url.indexOf("?")!==-1){ //ff there is a query string involved
			baseURL = url.substr(0, url.indexOf("?"));
	   }else{ 
	   		baseURL = url;
	   }
	   
	   var urlString = /\.jpg$wpjQ|\.jpeg$wpjQ|\.png$wpjQ|\.gif$wpjQ|\.bmp$wpjQ/;
	   var urlType = baseURL.toLowerCase().match(urlString);

		if(urlType == '.jpg' || urlType == '.jpeg' || urlType == '.png' || urlType == '.gif' || urlType == '.bmp'){//code to show images
				
			TB_PrevCaption = "";
			TB_PrevURL = "";
			TB_PrevHTML = "";
			TB_NextCaption = "";
			TB_NextURL = "";
			TB_NextHTML = "";
			TB_imageCount = "";
			TB_FoundURL = false;
			if(imageGroup){
				TB_TempArray = $wpjQ("a[@rel="+imageGroup+"]").get();
				for (TB_Counter = 0; ((TB_Counter < TB_TempArray.length) && (TB_NextHTML === "")); TB_Counter++) {
					var urlTypeTemp = TB_TempArray[TB_Counter].href.toLowerCase().match(urlString);
						if (!(TB_TempArray[TB_Counter].href == url)) {						
							if (TB_FoundURL) {
								TB_NextCaption = TB_TempArray[TB_Counter].title;
								TB_NextURL = TB_TempArray[TB_Counter].href;
								TB_NextHTML = "<span id='TB_next'>&nbsp;&nbsp;<a href='#'>Next &gt;</a></span>";
							} else {
								TB_PrevCaption = TB_TempArray[TB_Counter].title;
								TB_PrevURL = TB_TempArray[TB_Counter].href;
								TB_PrevHTML = "<span id='TB_prev'>&nbsp;&nbsp;<a href='#'>&lt; Prev</a></span>";
							}
						} else {
							TB_FoundURL = true;
							TB_imageCount = "Image " + (TB_Counter + 1) +" of "+ (TB_TempArray.length);											
						}
				}
			}

			imgPreloader = new Image();
			imgPreloader.onload = function(){		
			imgPreloader.onload = null;
				
			// Resizing large images - orginal by Christian Montoya edited by me.
			var pagesize = tb_getPageSize();
			var x = pagesize[0] - 150;
			var y = pagesize[1] - 150;
			var imageWidth = imgPreloader.width;
			var imageHeight = imgPreloader.height;
			if (imageWidth > x) {
				imageHeight = imageHeight * (x / imageWidth); 
				imageWidth = x; 
				if (imageHeight > y) { 
					imageWidth = imageWidth * (y / imageHeight); 
					imageHeight = y; 
				}
			} else if (imageHeight > y) { 
				imageWidth = imageWidth * (y / imageHeight); 
				imageHeight = y; 
				if (imageWidth > x) { 
					imageHeight = imageHeight * (x / imageWidth); 
					imageWidth = x;
				}
			}
			// End Resizing
			
			TB_WIDTH = imageWidth + 30;
			TB_HEIGHT = imageHeight + 60;
			$wpjQ("#TB_window").append("<a href='' id='TB_ImageOff' title='Close'><img id='TB_Image' src='"+url+"' width='"+imageWidth+"' height='"+imageHeight+"' alt='"+caption+"'/></a>" + "<div id='TB_caption'>"+caption+"<div id='TB_secondLine'>" + TB_imageCount + TB_PrevHTML + TB_NextHTML + "</div></div><div id='TB_closeWindow'><a href='#' id='TB_closeWindowButton' title='Close'>close</a> or Esc Key</div>"); 		
			
			$wpjQ("#TB_closeWindowButton").click(tb_remove);
			
			if (!(TB_PrevHTML === "")) {
				function goPrev(){
					if($wpjQ(document).unbind("click",goPrev)){$wpjQ(document).unbind("click",goPrev);}
					$wpjQ("#TB_window").remove();
					$wpjQ("body").append("<div id='TB_window'></div>");
					tb_show(TB_PrevCaption, TB_PrevURL, imageGroup);
					return false;	
				}
				$wpjQ("#TB_prev").click(goPrev);
			}
			
			if (!(TB_NextHTML === "")) {		
				function goNext(){
					$wpjQ("#TB_window").remove();
					$wpjQ("body").append("<div id='TB_window'></div>");
					tb_show(TB_NextCaption, TB_NextURL, imageGroup);				
					return false;	
				}
				$wpjQ("#TB_next").click(goNext);
				
			}

			document.onkeydown = function(e){ 	
				if (e == null) { // ie
					keycode = event.keyCode;
				} else { // mozilla
					keycode = e.which;
				}
				if(keycode == 27){ // close
					tb_remove();
				} else if(keycode == 190){ // display previous image
					if(!(TB_NextHTML == "")){
						document.onkeydown = "";
						goNext();
					}
				} else if(keycode == 188){ // display next image
					if(!(TB_PrevHTML == "")){
						document.onkeydown = "";
						goPrev();
					}
				}	
			};
			
			tb_position();
			$wpjQ("#TB_load").remove();
			$wpjQ("#TB_ImageOff").click(tb_remove);
			$wpjQ("#TB_window").css({display:"block"}); //for safari using css instead of show
			};
			
			imgPreloader.src = url;
		}else{//code to show html
			
			var queryString = url.replace(/^[^\?]+\??/,'');
			var params = tb_parseQuery( queryString );

			TB_WIDTH = (params['width']*1) + 30 || 630; //defaults to 630 if no paramaters were added to URL
			TB_HEIGHT = (params['height']*1) + 40 || 440; //defaults to 440 if no paramaters were added to URL
			ajaxContentW = TB_WIDTH - 30;
			ajaxContentH = TB_HEIGHT - 45;
			
			if(url.indexOf('TB_iframe') != -1){// either iframe or ajax window		
					urlNoQuery = url.split('TB_');
					$wpjQ("#TB_iframeContent").remove();
					if(params['modal'] != "true"){//iframe no modal
						$wpjQ("#TB_window").append("<div id='TB_title'><div id='TB_ajaxWindowTitle'>"+caption+"</div><div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton' title='Close'>close</a> or Esc Key</div></div><iframe frameborder='0' hspace='0' src='"+urlNoQuery[0]+"' id='TB_iframeContent' name='TB_iframeContent"+Math.round(Math.random()*1000)+"' onload='tb_showIframe()' style='width:"+(ajaxContentW + 29)+"px;height:"+(ajaxContentH + 17)+"px;' > </iframe>");
					}else{//iframe modal
					$wpjQ("#TB_overlay").unbind();
						$wpjQ("#TB_window").append("<iframe frameborder='0' hspace='0' src='"+urlNoQuery[0]+"' id='TB_iframeContent' name='TB_iframeContent"+Math.round(Math.random()*1000)+"' onload='tb_showIframe()' style='width:"+(ajaxContentW + 29)+"px;height:"+(ajaxContentH + 17)+"px;'> </iframe>");
					}
			}else{// not an iframe, ajax
					if($wpjQ("#TB_window").css("display") != "block"){
						if(params['modal'] != "true"){//ajax no modal
						$wpjQ("#TB_window").append("<div id='TB_title'><div id='TB_ajaxWindowTitle'>"+caption+"</div><div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton'>close</a> or Esc Key</div></div><div id='TB_ajaxContent' style='width:"+ajaxContentW+"px;height:"+ajaxContentH+"px'></div>");
						}else{//ajax modal
						$wpjQ("#TB_overlay").unbind();
						$wpjQ("#TB_window").append("<div id='TB_ajaxContent' class='TB_modal' style='width:"+ajaxContentW+"px;height:"+ajaxContentH+"px;'></div>");	
						}
					}else{//this means the window is already up, we are just loading new content via ajax
						$wpjQ("#TB_ajaxContent")[0].style.width = ajaxContentW +"px";
						$wpjQ("#TB_ajaxContent")[0].style.height = ajaxContentH +"px";
						$wpjQ("#TB_ajaxContent")[0].scrollTop = 0;
						$wpjQ("#TB_ajaxWindowTitle").html(caption);
					}
			}
					
			$wpjQ("#TB_closeWindowButton").click(tb_remove);
			
				if(url.indexOf('TB_inline') != -1){	
					$wpjQ("#TB_ajaxContent").append($wpjQ('#' + params['inlineId']).children());
					$wpjQ("#TB_window").unload(function () {
						$wpjQ('#' + params['inlineId']).append( $wpjQ("#TB_ajaxContent").children() ); // move elements back when you're finished
					});
					tb_position();
					$wpjQ("#TB_load").remove();
					$wpjQ("#TB_window").css({display:"block"}); 
				}else if(url.indexOf('TB_iframe') != -1){
					tb_position();
					if($wpjQ.browser.safari){//safari needs help because it will not fire iframe onload
						$wpjQ("#TB_load").remove();
						$wpjQ("#TB_window").css({display:"block"});
					}
				}else{
					$wpjQ("#TB_ajaxContent").load(url += "&random=" + (new Date().getTime()),function(){//to do a post change this load method
						tb_position();
						$wpjQ("#TB_load").remove();
						tb_init("#TB_ajaxContent a.thickbox");
						$wpjQ("#TB_window").css({display:"block"});
					});
				}
			
		}

		if(!params['modal']){
			document.onkeyup = function(e){ 	
				if (e == null) { // ie
					keycode = event.keyCode;
				} else { // mozilla
					keycode = e.which;
				}
				if(keycode == 27){ // close
					tb_remove();
				}	
			};
		}
		
	} catch(e) {
		//nothing here
	}
	if (typeof(wapoThickBoxShowCallback) !== 'undefined') {
		wapoThickBoxShowCallback();
	}
}

//helper functions below
function tb_showIframe(){
	$wpjQ("#TB_load").remove();
	$wpjQ("#TB_window").css({display:"block"});
}

function tb_remove() {
 	$wpjQ("#TB_imageOff").unbind("click");
	$wpjQ("#TB_closeWindowButton").unbind("click");
	$wpjQ("#TB_window").fadeOut("fast",function(){$wpjQ('#TB_window,#TB_overlay,#TB_HideSelect').trigger("unload").unbind().remove();});
	$wpjQ("#TB_load").remove();
	if (typeof document.body.style.maxHeight == "undefined") {//if IE 6
		$wpjQ("body","html").css({height: "auto", width: "auto"});
		$wpjQ("html").css("overflow","");
	}
	$wpjQ("body").removeClass('tb-enabled');
	document.onkeydown = "";
	document.onkeyup = "";
	return false;
}

function tb_position() {
$wpjQ("#TB_window").css({marginLeft: '-' + parseInt((TB_WIDTH / 2),10) + 'px', width: TB_WIDTH + 'px'});
	if ( !($wpjQ.browser.msie && $wpjQ.browser.version < 7)) { // take away IE6
		$wpjQ("#TB_window").css({marginTop: '-' + parseInt((TB_HEIGHT / 2),10) + 'px'});
	}
}

function tb_parseQuery ( query ) {
   var Params = {};
   if ( ! query ) {return Params;}// return empty object
   var Pairs = query.split(/[;&]/);
   for ( var i = 0; i < Pairs.length; i++ ) {
      var KeyVal = Pairs[i].split('=');
      if ( ! KeyVal || KeyVal.length != 2 ) {continue;}
      var key = unescape( KeyVal[0] );
      var val = unescape( KeyVal[1] );
      val = val.replace(/\+/g, ' ');
      Params[key] = val;
   }
   return Params;
}

function tb_getPageSize(){
	var de = document.documentElement;
	var w = window.innerWidth || self.innerWidth || (de&&de.clientWidth) || document.body.clientWidth;
	var h = window.innerHeight || self.innerHeight || (de&&de.clientHeight) || document.body.clientHeight;
	arrayPageSize = [w,h];
	return arrayPageSize;
}

function tb_detectMacXFF() {
  var userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.indexOf('mac') != -1 && userAgent.indexOf('firefox')!=-1) {
    return true;
  }
}


/*global document, alert, wapoUtilities, FB, window, console, escape, $, tb_init, tb_remove, formatWaPoSiteDomain */
var wapoVisitor;

function WapoVisitor() {
  this.initProperties();
  for (var i = 0; i < wapoSites.length; i++) {
	  var site = wapoSites[i];
	  if (site.name == wapoEnv.publicationName) {
		  site.visId = "-1";
	  }
  }
};

WapoVisitor.prototype.initProperties = function() {
    this.wapoVisId = "";
    this.wapoLoginId = "";
    this.tbInit = false;
    this.baseDomainName = null;
    this.displayName = "";
    this.picUrl = null;
    this.completedGroups = null;
    this.unconfirmedGroups = null;
	this.windowLocation = window.location.href;
	this.providerUrl = null;
};

WapoVisitor.prototype.updateVisitorLogin = function() {
    var url = wapoEnv.wapo_public_protocol + wapoEnv.wapo_site_url + "public/login/visitor.json?";

    $wpjQ.ajax({
        dataType: 'jsonp',
        jsonp: 'jsonp_callback',
        url: url,
        success: function(html){
          //no-op
        }
    });
};

WapoVisitor.prototype.checkNonce = function() {
  var parms, parmPairs, url;
  parms = window.location.search;
  parms = parms.substring(1);
  parmPairs = parms.split('&');
  url = '';
  for (var i=0;i < parmPairs.length; i++) {	  
    var pieces = parmPairs[i].split("=");
    if (pieces[0] == wapoEnv.param_name_nonce) {
      if (pieces.length > 1) {
        url = wapoEnv.wapo_secure_protocol + wapoEnv.wapo_site_url + "siteRegistration/resetPassword?" + wapoEnv.param_name_nonce + "=" + pieces[1]
            + "&" + wapoEnv.param_name_redirect + "=" + escape(window.location.href)
            + "&" + wapoEnv.param_name_previous_url + "=" + escape(window.location.href);
      }
    }
    else if (pieces[0] == wapoEnv.param_name_email_nonce) {
      if (pieces.length > 1) {
        url = wapoEnv.wapo_secure_protocol + wapoEnv.wapo_site_url + "siteRegistration/confirmEmail?" + wapoEnv.param_name_email_nonce + "=" + pieces[1]
            + "&" + wapoEnv.param_name_redirect + "=" + escape(window.location.href)
            + "&" + wapoEnv.param_name_previous_url + "=" + escape(window.location.href);
      }
    }
    else if (pieces[0] == wapoEnv.param_name_login_redirect) {
    	this.updateVisitorLogin();
    }
  }
  return url;
};

WapoVisitor.prototype.checkRegistration = function() {
  var url, metaElement, requiredGroups, parts, allFound;
  url = '';
  metaElements = document.getElementsByName(wapoEnv.meta_tag_groups);
  if (metaElements && metaElements.length > 0) {
    if (this.wapoLoginId === null || this.wapoLoginId === '') {
        url= wapoEnv.wapo_public_protocol + wapoEnv.wapo_site_url + "public/login/options?"
            + wapoEnv.param_name_redirect + "=" + escape(window.location.href)
            + "&" + wapoEnv.param_name_previous_url + "=" + escape(window.location.href)
            + "&" + wapoEnv.param_name_no_cancel + "=true";
    }
    else {
      requiredGroups = metaElements[0].content;
      parts = requiredGroups.split("-");
      allFound = true;
      for (i=0; i < parts.length; i++) {
        if (!this.completedGroups ||
            this.completedGroups === null ||
            this.completedGroups.indexOf(parts[i]) === -1) {
          allFound = false;
        }
      }
      if (!allFound) {
        url = wapoEnv.wapo_secure_protocol + wapoEnv.wapo_site_url + "siteRegistration/editProfile?"
          + wapoEnv.param_name_regis_group_name + "=" + requiredGroups
          + "&" + wapoEnv.param_name_no_cancel + "=true";
      }
    }
  }
  return url;
};

WapoVisitor.prototype.checkPopUp = function() {
  var url = '';
  url = this.checkNonce();
  if (url === '') {
    url = this.checkRegistration();
  }
  if (url != '') {
    $wpjQ('<a id="wapoReset" href="' + url
        +'&KeepThis=true&TB_iframe=true&height=464&width='
        + wapoEnv.lightbox_width
        + '&modal=true" class="thickbox">'
        + '</a>').appendTo('#wapolabs_wrapperLoginStatus');

    //re-initialize thick box due to new thickbox widget
    wapoVisitor.tbInit = true;
  }
};

WapoVisitor.prototype.loginFacebook = function(uid) {	
  if (wapoVisitor.wapoLoginId === null) {
    var url = wapoEnv.wapo_public_protocol + wapoEnv.wapo_site_url + "public/login/get_for_facebook"
            +"?format=json&jsonp=&" + wapoEnv.param_name_jsonp_callback + "=?&facebookUid="
            +uid;
    $wpjQ.getJSON(url,
         new Function ("data", 
	"if (data !== null && typeof(data." + wapoEnv.param_name_login_id + ") !== 'undefined' && data." + wapoEnv.param_name_login_id + " !== null && typeof(data." + wapoEnv.param_name_show_registration + ") !== 'undefined' && data." + wapoEnv.param_name_show_registration + " !== null) {" +
            "wapoVisitor.wapoLoginId = data." + wapoEnv.param_name_login_id + ";" +
            "wapoVisitor.updateWaPoLogin(data." + wapoEnv.param_name_show_registration + ", data." + wapoEnv.param_name_login_id + ", 'false', 'false');" +
          "}")
      );
  }
};


WapoVisitor.prototype.getDependentLoginValues = function() {
  var regGroups, displayInfo, parts, tempUrl;
  if (this.wapoLoginId != null) {
    displayInfo = wapoUtilities.Get_Cookie(wapoEnv.cookie_display);
    if (displayInfo && displayInfo != null) {
      parts = displayInfo.split("|");
      if (parts.length > 0) {
        this.displayName = parts[0]
        

        if (this.displayName.substr(0,1) === '"') {
          this.displayName = this.displayName.substring(1);
        }
        this.displayName = this.displayName;
      }
      if (parts.length > 1) {
          tempUrl = parts[1];
          if (tempUrl.substr((tempUrl.length - 1),1) === '"') {
            tempUrl = tempUrl.substring(0, tempUrl.length - 1);
          }
        if (tempUrl != wapoEnv.place_holder) {
          this.picUrl = decodeURIComponent(tempUrl);
        }
      }
      if (parts.length > 2) {
          tempUrl = parts[2];
          if (tempUrl.substr((tempUrl.length - 1),1) === '"') {
            tempUrl = tempUrl.substring(0, tempUrl.length - 1);
          }
          this.providerUrl = decodeURIComponent(tempUrl);
      }
    }
    regGroups = wapoUtilities.Get_Cookie(wapoEnv.cookie_groups);
    if (regGroups && regGroups != null) {
      parts = regGroups.split("|");
      if (parts.length > 0) {
        this.completedGroups = parts[0];
      }
      if (parts.length > 1) {
        this.unconfirmedGroups = parts[1];
      }
    }
  }
};

WapoVisitor.prototype.init = function() {
    this.wapoLoginId = wapoUtilities.Get_Cookie(wapoEnv.cookie_login_id);
    if (this.wapoLoginId !== null && this.wapoLoginId.length > 0) {   
      this.getDependentLoginValues();
    }
    this.baseDomainName = wapoEnv.site_base_domain;

    this.wapoVisId = wapoUtilities.Get_Cookie(wapoEnv.cookie_vis_id);
    
    if(this.wapoVisId !== null) {
        this.updateWaPoVisId(this.wapoVisId);
    }
    else {
        this.initVisId();
    }
    
    
		this.wapoLoginId = wapoUtilities.Get_Cookie(wapoEnv.cookie_login_id);
		if (this.wapoLoginId !== null && this.wapoLoginId.length > 0) {    	
		  this.getDependentLoginValues();
		}
		
		if(!$wpjQ.browser.msie && wapoEnv.set_domain){
		  document.domain = this.baseDomainName;
		}
	    
		$wpjQ(document).trigger('wapoInit');	
		//this.includeSignInRegistration();
		this.checkPopUp();
		this.resetThickbox();
		

};


WapoVisitor.prototype.resetThickbox = function() {
    var tbInitCallback = function(){
	    var wapoReset = $wpjQ('#wapoReset');
		if(wapoReset.length) //test for the existence of the wapoReset anchor tag
		{
			wapoReset.trigger("click");
		}    
    }
    
    if(this.tbInit === true)
    {
		tb_remove();
		tb_init('a.thickbox, area.thickbox, input.thickbox', tbInitCallback);
    	
    	this.tbInit = false;
    }
};

WapoVisitor.prototype.setWapoVisId = function() {
	var foundVisId = "-1";
	var noNullsFound = true;
	for (var i = 0; i < wapoSites.length; i++) {
		var site = wapoSites[i];
		if (site.visId == null) {
			noNullsFound = false;
		}
		else if (site.visId !== "-1") {
			foundVisId = site.visId;
		}
	}

	if (noNullsFound) {
		// we got a response back from all wapo companies
		if (foundVisId !== "-1") {
	        this.wapoVisId = foundVisId;
	        wapoUtilities.Set_Cookie(wapoEnv.cookie_vis_id, wapoVisitor.wapoVisId, (50*365), wapoEnv.site_path, this.baseDomainName, false);
	        this.updateWaPoVisId(this.wapoVisId);
		}
		else {   
		    var url = wapoEnv.wapo_public_protocol + wapoEnv.wapo_site_url + "public/visitor/create?format=json&jsonp=&" + wapoEnv.param_name_jsonp_callback + "=?";
		    $wpjQ.getJSON(url,
		              function( data ) {                 
		                if(data !== null && data.visitors != null && data.visitors.wapoVisitor !== null && data.visitors.wapoVisitor.id !== null) {
		                  wapoVisitor.wapoVisId = data.visitors.wapoVisitor.id;
		                  wapoUtilities.Set_Cookie(wapoEnv.cookie_vis_id, wapoVisitor.wapoVisId, (50*365), wapoEnv.site_path, wapoVisitor.baseDomainName, false);
		                  wapoVisitor.updateWaPoVisId(this.wapoVisId);
		                }
		
		              }
		    );       
	    }
	}
};


WapoVisitor.prototype.updateWaPoVisId = function(visId) {
	var url, omnitureId, data, currentIp, previousIp;
    this.wapoVisId = visId;
   
    currentIp = wapoUtilities.Get_Cookie(wapoEnv.cookie_last_ip);
    previousIp = wapoUtilities.Get_Cookie(wapoEnv.cookie_previous_ip);  

    if (currentIp === null || previousIp === null || currentIp !== previousIp) {
        //add ipaddress instance data 
	url = wapoEnv.wapo_public_protocol + wapoEnv.wapo_site_url + "public/visitor/ip_address.json";
	data = {};
	data[wapoEnv.cookie_previous_ip] = wapoUtilities.Get_Cookie(wapoEnv.cookie_previous_ip);

      $wpjQ.ajax({
          dataType: 'jsonp',
          jsonp: wapoEnv.param_name_jsonp_callback,
          url: url,
          data: data,
          success: function(msg){
            wapoUtilities.Set_Cookie(wapoEnv.cookie_previous_ip, msg.retVal, (50*365), wapoEnv.site_path, wapoEnv.site_base_domain, false);
            wapoVisitor.updateOmnitureId();
          }
     });
    }
    else {
    	this.updateOmnitureId();
    }
    
    this.updateSessionId();

    //send page view events

};

WapoVisitor.prototype.updateOmnitureId = function() {
    //add omniture cookie value as instance data
    var omnitureId, previousOmnitureId, url;
    omnitureId = wapoUtilities.Get_Cookie(wapoEnv.cookie_omniture);
    previousOmnitureId = wapoUtilities.Get_Cookie(wapoEnv.cookie_previous_omniture);
    if(omnitureId !== null && omnitureId.length > 0 && (previousOmnitureId == null || previousOmnitureId != omnitureId)){
    	url = wapoEnv.wapo_public_protocol + wapoEnv.wapo_site_url + "public/visitor/instance_datum.json?attributeName=omniture_vis_id&attributeValue="+escape(omnitureId);
		$wpjQ.ajax({
	        dataType: 'jsonp',
	        jsonp: wapoEnv.param_name_jsonp_callback,
	        url: url        ,
                success: function(msg){
                  wapoUtilities.Set_Cookie(wapoEnv.cookie_previous_omniture, msg.retVal, (50*365), wapoEnv.site_path, wapoEnv.site_base_domain, false);
                }
	    });
    }
};

WapoVisitor.prototype.updateSessionId = function() {
	var currentSessionId;
	
	currentSessionId = wapoUtilities.Get_Cookie(wapoEnv.cookie_session_id);
	if (typeof(currentSessionId) === 'undefined' || currentSessionId === null) {
		currentSessionId = this.createUUID()
	}
	wapoUtilities.Set_Cookie(wapoEnv.cookie_session_id, currentSessionId, wapoEnv.visitor_session_length/(60 * 24), wapoEnv.site_path, wapoEnv.site_base_domain, false);
};

WapoVisitor.prototype.createUUID = function() {
    // http://www.ietf.org/rfc/rfc4122.txt
    var s = [];
    var hexDigits = "0123456789ABCDEF";
    for (var i = 0; i < 32; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[12] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[16] = hexDigits.substr((s[16] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01

    var uuid = s.join("");
    return uuid;
}

WapoVisitor.prototype.initVisId = function() {

	if (wapoSites.length > 1) {
		for (var i = 0;i < wapoSites.length; i++) {
			var site = wapoSites[i];
			if (site.name !== wapoEnv.publicationName) {
			    $wpjQ.ajax(
			    	      {
			    	        url: site.url + "public/visitor.json",
			    	        data: { "lang" : "en-us",
			    	                "tags" : "sunset"
			    	        },
			    	        dataType: 'jsonp',
			    	        callbackParameter: wapoEnv.param_name_jsonp_callback,
			    	        jsonp: wapoEnv.param_name_jsonp_callback,
			    	        timeout: (5*1000),
			    	        success: new Function("data", "status",
			    	          "if(data != null && data.visitors != null && data.visitors.wapoVisitor != null && data.visitors.wapoVisitor.id != null)" +
			    	          "{" +
			    	            "wapoSites[" + i + "].visId = data.visitors.wapoVisitor.id+'';" +
			    	          "}" +
			    	          "else" +
			    	          "{" +
			    	        	  "wapoSites[" + i + "].visId = '-1';" +
			    	          "} " +
			    	          "wapoVisitor.setWapoVisId();"
			    	        ),
			    	        error: new Function("XHR", "textStatus", "errorThrown", "wapoSites[" + i + "].visId = '-1'; wapoVisitor.setWapoVisId();" )
			    	      }
			    	    );
			}
		}
	}
	else {
		this.setWapoVisId();
	}
			
};

WapoVisitor.prototype.incrementalRegistration = function(registrationGroup, link) {
  var newUrl;
  if (this.completedGroups != null && this.completedGroups.indexOf(registrationGroup) === -1) {
    newUrl = wapoEnv.wapo_secure_protocol + wapoEnv.wapo_site_url + "siteRegistration/editProfile?"
      + "reg_group=" + registrationGroup
      + "&" + wapoEnv.param_name_previous_url + "=" + escape(window.location.href)
      + "&" + wapoEnv.param_name_redirect + "=" + escape(link.href);
    link.href = newUrl;
  }
};

/* Creates a JSON object with various URLs associated with identity
*/
WapoVisitor.prototype.identityUser = function(){
  return {
	urls: {
		login: wapoEnv.wapo_public_protocol + wapoEnv.wapo_site_url + 'public/login/options?'
				+ wapoEnv.param_name_redirect + '=' + this.windowLocation
				+ '&' + wapoEnv.param_name_previous_url + '=' + this.windowLocation,
		logout:  wapoEnv.wapo_secure_protocol + wapoEnv.wapo_site_url + 'public/login/logout?redirect=' + wapoVisitor.windowLocation,
		profilePic: wapoVisitor.picUrl || '',
		editProfile: wapoEnv.wapo_secure_protocol + wapoEnv.wapo_site_url + 'siteRegistration/editProfile?'
				+ wapoEnv.param_name_redirect + '=' + this.windowLocation
				+ '&' + wapoEnv.param_name_previous_url + '=' + this.windowLocation
	  },
	user: {
		loggedin: !(this.wapoLoginId === null || this.wapoLoginId === '')
	}
  }
}



WapoVisitor.prototype.includeSignInRegistration = function() {
	var url;
        var registrationGroups = getOptionalRegistrationGroups();

	if(this.wapoLoginId === null || this.wapoLoginId === '') {
		$wpjQ('#wapoLogout').remove();
		$wpjQ('#wapoEditProfile').remove();
		$wpjQ('#helloPic').remove();
		$wpjQ('#helloLogin').remove();

		// replace the default contents of #wapolabs_wrapperLoginStatus with the following "login/register" link 

		$wpjQ('#wapolabs_wrapperLoginStatus').html(
			'<a id="wapoLogin" class="thickbox" href="' + wapoEnv.wapo_public_protocol + wapoEnv.wapo_site_url + 'public/login/options?'
			+ wapoEnv.param_name_redirect + '=' + this.windowLocation
			+ '&' + wapoEnv.param_name_previous_url + '=' + this.windowLocation
		        + registrationGroups
			+ '&KeepThis=true&TB_iframe=true&height=464&width='
                        + wapoEnv.lightbox_width
                        + '&modal=true" rel="nofollow" title="Login or Register">'
			+ '<span class="lnk_login">Log in</span><span class="lnk_div">/</span><span class="lnk_reg">Register</span></a>'
		);
	} else {
		if (this.displayName === null || this.displayName === '') {
			this.getDependentLoginValues();
		}

		$wpjQ('#wapoLogout').remove();
		$wpjQ('#wapoEditProfile').remove();
		$wpjQ('#helloLogin').remove();
		$wpjQ('#helloPic').remove();
		$wpjQ('#wapoRegistration').remove();
		$wpjQ('#wapoLogin').remove();

		// replace the default contents of #wapolabs_wrapperLoginStatus with the following "hello username" span... 
		$wpjQ('#wapolabs_wrapperLoginStatus').html(
			'<span id="helloLogin"><span class="txt_greeting">Hello </span>'
			+ '<span class="txt_username">' + this.displayName + '</span>'
			+ '</span>'
		);

		// then append the following img tag... 
		if (!this.picUrl || this.picUrl === "") {
			$wpjQ('<img id="helloPic" src="" style="display:none;" alt="User Profile Picture" />').appendTo('#wapolabs_wrapperLoginStatus');
		} else {
			$wpjQ('<img id="helloPic" width="40" height="40" src="'
			+ wapoVisitor.picUrl
			+ '" style="display:inline;" alt="User Profile Picture" />').appendTo('#wapolabs_wrapperLoginStatus');
		}

		// then append the following provider img tag... 
		if (!this.providerUrl || this.providerUrl === "") {
			$wpjQ('<img id="providerPic" src="" style="display:none;" alt="Provider Brand" />').appendTo('#wapolabs_wrapperLoginStatus');
		} else {
			$wpjQ('<img id="providerPic" src="'
			+ wapoVisitor.providerUrl
			+ '" style="display:inline;" alt="Provider Brand" />').appendTo('#wapolabs_wrapperLoginStatus');
		}

		// then append the edit profile link... 
		if (this.completedGroups != null || this.unconfirmedGroups != null) {
			$wpjQ('<span class="lnk_div"> | </span>'
			+ '<a id="wapoEditProfile" href="' + wapoEnv.wapo_secure_protocol + wapoEnv.wapo_site_url + 'siteRegistration/editProfile?'
			+ wapoEnv.param_name_redirect + '=' + this.windowLocation
            + '&' + wapoEnv.param_name_previous_url + '=' + this.windowLocation
			+ registrationGroups
			+ '&KeepThis=true&TB_iframe=true&height=464&width='
                        + wapoEnv.lightbox_width
                        + '&modal=true" class="thickbox" rel="nofollow" title="Edit Profile">'
			+ '<span class="lnk_edit">Edit Profile</span>'
			+ '</a>').appendTo('#wapolabs_wrapperLoginStatus');
		}

		// then append the logout link 
		$wpjQ('<span class="lnk_div"> | </span>'
		+ '<a id="wapoLogout" href="' + wapoEnv.wapo_secure_protocol + wapoEnv.wapo_site_url + 'public/login/logout?redirect=' + wapoVisitor.windowLocation + '" rel="nofollow" title="Logout" onclick="wapoVisitor.wapoLogout(); wapoVisitor.resetThickbox(); return false;">'
		+ '<span class="lnk_logout">Log out</span>'
		+ '</a>').appendTo('#wapolabs_wrapperLoginStatus');
		
		url = wapoEnv.wapo_public_protocol + wapoEnv.wapo_site_url + "public/login/get/"
		+ this.wapoLoginId
		+ "?format=json&jsonp=&" + wapoEnv.param_name_jsonp_callback + "=?";
	}

	wapoVisitor.tbInit = true;
	return true;
};

WapoVisitor.prototype.updateWaPoLogin = function(showRegistration, loginId, noCancel, callCloseCallback, loginEvent) {
    this.wapoLoginId = loginId;
    this.getDependentLoginValues();
    if(typeof(noCancel) === 'undefined')
    {
        noCancel = 'false';
    }
    if(typeof(callCloseCallback) === 'undefined')
    {
        callCloseCallback = 'true';
    }
    if(typeof(loginEvent) !== 'undefined') {
        $wpjQ(document).trigger(loginEvent);
    }

    if(showRegistration === "true") {
        var registrationGroups = getOptionalRegistrationGroups();
        document.getElementById('TB_iframeContent').src = wapoEnv.wapo_secure_protocol + wapoEnv.wapo_site_url + 'siteRegistration?'+wapoEnv.param_name_no_cancel+'='+noCancel +registrationGroups;
    }
    else {
        $wpjQ(document).trigger('wapoRefreshDisplay');
		//this.includeSignInRegistration();
        this.updateVisitorLogin();
        this.resetThickbox();
	if (typeof(wapoThickBoxCloseCallback) !== 'undefined' &&
            callCloseCallback === 'true') {
	  wapoThickBoxCloseCallback();
	}
    }
		    
};


WapoVisitor.prototype.wapoLogout = function() {

  var url = wapoEnv.wapo_public_protocol + wapoEnv.wapo_site_url + "public/login/logout"
            +"?format=json&"+wapoEnv.param_name_login_id+"="+escape(this.wapoLoginId)+"&jsonp=&" + wapoEnv.param_name_jsonp_callback + "=?";
  $wpjQ.ajax({
    dataType: 'jsonp',
    jsonp: wapoEnv.param_name_jsonp_callback,
    url: url,
    timeout: (2*1000),
    success: 
        function(data){
          if (data !== null && data.providerName !== null) {
            if (data.providerName === "Facebook" && typeof(FB) !== 'undefined') {
              wapoVisitor.endLogout();
              FB.logout();
            }
            else {
               wapoVisitor.endLogout();
            }
          }
        },
    error:
       function(XHR, textStatus, errorThrown){
          wapoVisitor.endLogout();
       }
  });
};

WapoVisitor.prototype.endLogout = function()
{
  wapoUtilities.Delete_Cookie(wapoEnv.cookie_login_id, wapoEnv.site_path, wapoEnv.site_base_domain);
  wapoUtilities.Delete_Cookie(wapoEnv.cookie_groups, wapoEnv.site_path, wapoEnv.site_base_domain);
  wapoUtilities.Delete_Cookie(wapoEnv.cookie_display, wapoEnv.site_path, wapoEnv.site_base_domain);
  this.initProperties();
  $wpjQ(document).trigger(wapoEnv.event_name_logout);
  //wapoVisitor.includeSignInRegistration();
  this.resetThickbox();

  //callback for site specific functionality post logout
  if(typeof(wapoLogoutCallback) !== 'undefined'){
     wapoLogoutCallback();
  }
}

function wapoInit(windowLocation) {
    wapoVisitor = new WapoVisitor();
    wapoVisitor.windowLocation = windowLocation;
	
	//add a login event to the document
	if(!wapoEnv.customLoginTrigger){
		$wpjQ(document).bind('wapoLogin.default', function(){
		//no special processing at this time
		});
	}
	$wpjQ(document).bind('wapoInit.default', function(){
	    $wpjQ(document).trigger('wapoRefreshDisplay');
	});
	$wpjQ(document).bind('wapoLogout.default', function(){
	    $wpjQ(document).trigger('wapoRefreshDisplay');
	});
	$wpjQ(document).bind('wapoRegister.default', function(){
		//no special processing at this time
	});
	$wpjQ(document).bind('wapoRefreshDisplay.default', function(){
		wapoVisitor.includeSignInRegistration();
	});
	
    wapoVisitor.init();
	
	return wapoVisitor;
}

function getOptionalRegistrationGroups() {
    var metaElements = $wpjQ('[name='+wapoEnv.meta_tag_optional_groups+']');
    var registrationGroups = "";
    if(metaElements && metaElements.length > 0)
    {
	registrationGroups = "&"+ wapoEnv.param_name_regis_group_name 
                              + "=" +metaElements[0].content;
    }

    return registrationGroups;
}

var wapoVisitor = wapoInit(window.location.href);

var wapoIdentity;

function wapoIdentityInit() {

  function WapoIdentity() {
      var wpni_username = null;
      var wapo_username = null;
      var echo_username = null;
      var echo_user = null;
  };

    //once we have the usernames from The Post, Identity and Echo
    //try to reconcile them to make sure all are in the same state
  WapoIdentity.prototype.reconcileUsernames = function() {
      if(typeof(this.wpni_username) !== 'undefined' && this.wpni_username !== null &&
         typeof(this.wapo_username) !== 'undefined' && this.wapo_username !== null &&
         typeof(this.echo_username) !== 'undefined' && this.echo_username !== null)
      {
          //if wpni_username == "" && wapo_username !== "" then logout the wapo user 
          //i.e. a user is not logged into The Post but a user is still logged into Identity
          if(this.wpni_username === "" && this.wapo_username !== "")
          {
              this.logout();
              this.logoutCallback();
          }
          //if wpni_username !== "" && wapo_username == "" then login the wapo user and login the echo user
          else if(this.wpni_username !== "" && this.wapo_username == "")
          {
              this.identityLogin(this.wpni_username);
          }
          else if(this.wpni_username !== this.wapo_username && 
                  this.wpni_username === "")
          {   
              this.logout();
              this.logoutCallback();
              Backplane.resetCookieChannel();
              if(typeof(this.echo_user) !== 'undefined' && typeof(this.echo_user.accounts) !== 'undefined')
              {
                  this.echo_user.accounts = [];
              }
          }
          //if wpni_username !== wapo_username then logout the wapo user and login again
          else if(this.wpni_username !== this.wapo_username)
          {   
              this.logout();
              this.logoutCallback();
              Backplane.resetCookieChannel();
              if(typeof(this.echo_user) !== 'undefined' && typeof(this.echo_user.accounts) !== 'undefined')
              {
                  this.echo_user.accounts = [];
              }
              this.identityLogin(this.wpni_username);
          }
          else if(this.wpni_username !== this.echo_username &&
                  this.wpni_username === "")
          {
              this.callLogoutPortableContact();
              Backplane.resetCookieChannel();
          }
          //if wpni_username !== echo_username then logout the echo user and login again
          else if(this.wpni_username !== this.echo_username)
          {
              this.callLogoutPortableContact();
              Backplane.resetCookieChannel();
              if(typeof(this.echo_user) !== 'undefined' && typeof(this.echo_user.accounts) !== 'undefined')
              {
                  this.echo_user.accounts = [];
              }
              this.callLoginPortableContact();
          }
          //all users seem to reconcile with the logged in wpni user, so call the login callback 
          else if(this.wpni_username !== "")
          {
              this.loginCallback();
              this.echoLoginCallback();
          }
          //all users seem to reconcile with the logged out wpni user, so call the logout callback 
          else 
          {
              this.logoutCallback();
          }
      }
  };

  WapoIdentity.prototype.init = function() {
    var wpni_login_id, wapo_login_id;
  		

    if(!$wpjQ.browser.msie && wapoEnv.set_domain){
      document.domain = wapoEnv.site_base_domain;
    }

    //get the wpniuser, wapo login identifier and jskit username 
    //then reconcile
    this.updateWpniUsername();
    this.updateWapoUsername();    
    this.updateEchoUsername();
    
  };

    //gets the post username from a cookie
    WapoIdentity.prototype.updateWpniUsername = function() {
        var wpni_login_id = wapoUtilities.Get_Cookie(wapoEnv.cookie_wpni_id);
        if(wpni_login_id !== null)
        {
            this.wpni_username = wpni_login_id;
        }
        else
        {
            this.wpni_username = "";
        }
        this.reconcileUsernames();
    };
   
    //gets the identifier for the wapo identity user through an ajax call
    WapoIdentity.prototype.updateWapoUsername = function() {
      var wapo_login_id = wapoUtilities.Get_Cookie(wapoEnv.cookie_login_id);

      if(typeof(wapo_login_id) !== 'undefined' && wapo_login_id !== null)
      {
      	var wapoDisplay = wapoUtilities.Get_Cookie(wapoEnv.cookie_display);
      	if (typeof(wapoDisplay) != 'undefined' && wapoDisplay !== null) {
      		var parts = wapoDisplay.split("|");
      		if (parts.length > 0) {
        		wapoIdentity.wapo_username = parts[0]
        		if (wapoIdentity.wapo_username.substr(0,1) === '"') {
          			wapoIdentity.wapo_username = wapoIdentity.wapo_username.substring(1);
        		}
      		}
      	}
		
		if (typeof(wapoIdentity.wapo_username) === 'undefined' || wapoIdentity.wapo_username === null || wapoIdentity.wapo_username === "") {
          	var url = wapoEnv.wapo_secure_protocol + wapoEnv.wapo_site_url + "public/login/identifier.json";

         	var ajaxOptions = {type: 'GET',
	                    url: url,
	                    dataType: 'jsonp',
	                    cache: false,
	                    jsonp: wapoEnv.param_name_jsonp_callback,
	                    success: function(data){
			             if(typeof(data.login.identifier) !== 'undefined' &&
                                        data.login.identifier !== null){
                                         wapoIdentity.wapo_username = data.login.identifier;
                                     }
                                     else
                                     {
                                         wapoIdentity.wapo_username = "";
				     				 }
                                     wapoIdentity.reconcileUsernames();
                                  },
	                    error: function(){ 
                                     wapoIdentity.wapo_username = "";
                                     wapoIdentity.reconcileUsernames();
	                           }
                           }
         	$wpjQ.ajax(ajaxOptions);
         }
      }  
      else
      {
         wapoIdentity.wapo_username = "";
         wapoIdentity.reconcileUsernames();
      }                
    };

    //gets the username for the echo user by looking at the Echo.User javascript object
    WapoIdentity.prototype.updateEchoUsername = function() {
      this.echo_user = new Echo.User({"appkey": wapoEnv.jskit_consumer_key});
      this.echo_user.init(function(){ 
                             wapoIdentity.echo_user.accounts = wapoIdentity.echo_user.getActiveAccounts();
                             wapoIdentity.setEchoUsername();
                          }); 
    };

    //gets the username for the echo user by looking at the Echo.User javascript object
    WapoIdentity.prototype.setEchoUsername = function() {
        if(typeof(this.echo_user) !== 'undefined' && typeof(this.echo_user.accounts) !== 'undefined' && this.echo_user.accounts.length > 0)
        {
            this.echo_username = this.echo_user.accounts[0].username;
            this.reconcileUsernames();
        }
        else
        {
            this.echo_username = "";
            this.reconcileUsernames();
        }
    };

   //logs in the Post user into identity 
   WapoIdentity.prototype.identityLogin = function(wpni_login_id) {
        var url = wapoEnv.wapo_public_protocol + wapoEnv.wapo_site_url + "public/login/thepost?format=json&jsonp=&" + wapoEnv.param_name_login_id + "=" + wpni_login_id + "&" + wapoEnv.param_name_jsonp_callback + "=?";
        $wpjQ.getJSON(url, 
                      function(data){  
		         if (data !== null && 
                             typeof data[wapoEnv.param_name_login_id] !== 'undefined' && 
                             data[wapoEnv.param_name_login_id] !== null && 
                             data[wapoEnv.param_name_login_id] !== "-1") {
		            wapoUtilities.Set_Cookie(wapoEnv.cookie_login_id, 
                                                     data[wapoEnv.param_name_login_id], 
                                                     (50*365), 
                                                     wapoEnv.site_path, 
                                                     wapoEnv.site_base_domain, 
                                                     false);
          
                            if (typeof data[wapoEnv.cookie_display] !== 'undefined' && 
                                data[wapoEnv.cookie_display] !== null) {
                                wapoUtilities.Set_Cookie(wapoEnv.cookie_display, data[wapoEnv.cookie_display], (50*365), wapoEnv.site_path, wapoEnv.site_base_domain, false);
      							var parts = data[wapoEnv.cookie_display].split("|");
      							if (parts.length > 0) {
        							wapoIdentity.wapo_username = parts[0]
        							if (wapoIdentity.wapo_username.substr(0,1) === '"') {
          								wapoIdentity.wapo_username = wapoIdentity.wapo_username.substring(1);
        							}
      							}
                            }
		      
                            if (typeof data[wapoEnv.cookie_avatar] !== 'undefined' && 
                                data[wapoEnv.cookie_avatar] !== null) {
                                wapoUtilities.Set_Cookie(wapoEnv.cookie_avatar, 
                                                         data[wapoEnv.cookie_avatar], 
                                                         (50*365), 
                                                         wapoEnv.site_path, 
                                                         wapoEnv.site_base_domain, 
                                                         false)
		            		}
                            wapoVisitor.updateVisitorLogin();
                            wapoIdentity.loginCallback();
			 }
			 else
             {
             	var displayInfo = wapoUtilities.Get_Cookie(wapoEnv.cookie_display);
             	if (displayInfo !== null && typeof displayInfo !== 'undefined' && displayInfo.indexOf(wapoIdentity.wpni_username) === 0) {
             		//do nothing - some other thread has already logged this user in
             	}
             	else {
             		//log the user out because a wapo login could not be returned for some reason
             		wapoIdentity.logout();
			    	wapoIdentity.logoutCallback();
             	}
             }
        });
   };

  
  WapoIdentity.prototype.login = function(anchor) {
    var newLocation = wapoEnv.wapo_reg_url + escape(window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search);
	window.location = newLocation + "&target=" + anchor;
  };

  //deletes all wapo identity cookies for a logged in user
  WapoIdentity.prototype.logout = function() {
    wapoUtilities.Delete_Cookie(wapoEnv.cookie_login_id, wapoEnv.site_path, wapoEnv.site_base_domain);
    wapoUtilities.Delete_Cookie(wapoEnv.cookie_display, wapoEnv.site_path, wapoEnv.site_base_domain);
    wapoUtilities.Delete_Cookie(wapoEnv.cookie_avatar, wapoEnv.site_path, wapoEnv.site_base_domain);
  };

    //after a user is logged into identity we:
    //-log them into Echo
    //-make sure that we don't allow for anonymous posting
    //-post any formerly anonymous comments if they exist
    //-create link for changing the avatar
  WapoIdentity.prototype.loginCallback = function() {
      //send backplane identity/login call to JSKit
      if(typeof(this.echo_user) === 'undefined' || typeof(this.echo_user.accounts) === 'undefined' || this.echo_user.accounts.length === 0)
      {
         this.callLoginPortableContact();
      }
      else {
      	//do any actions deferred before login sequence
      	this.deferredActions();
      }


      //setup change profile pic link
      var profilePicDiv = $wpjQ("#wapo_change_avatar");
      if(profilePicDiv !== null)
      {
         var channelName = Backplane.getChannelName();
	  profilePicDiv.html('<a id="wapoChangeAvatarLink" href="http:'+wapoEnv.wapo_site_url+'siteRegistration/changeProfilePic?jskit_channel='+channelName+'&previous_url='+encodeURIComponent(window.location)+'">Edit Avatar</a>');
      }
  };

  //logs the wapo user into Echo
  WapoIdentity.prototype.callLoginPortableContact = function() {
         var channelName = Backplane.getChannelName();
         var ajaxOptions = {
		   	     type: 'GET',
			     url: 'http:' + wapoEnv.wapo_site_url + 'public/visitor/login_portable_contact.json?jskit_channel='+channelName,
			     dataType: 'jsonp',
			     cache: false,
			     jsonp: wapoEnv.param_name_jsonp_callback,
			     success: function(data){
				 	if(data !== null && 
				    	typeof data['response'] !== 'undefined' && 
				    	data['response'] !== null) {
				    
				    	if (data['response'].indexOf("invalid") !== -1) {
                    		wapoIdentity.echoLogoutCallback();
                    	}
                    	else if (data['response'].indexOf("result=success") !== -1) {
                    		wapoIdentity.echoLoginCallback();
      						//do any actions deferred before login sequence
      						wapoIdentity.deferredActions();
                    	}
                 	}
			     },
			     error: function(){
			     }
	   }

	   //call <site>//identity/public/visitor/login_portable_contact
	   $wpjQ.ajax(ajaxOptions);

           //tell Backplane to start polling because identity/login message should come through
           Backplane.expectMessagesWithin(10);
  };

    //after a user logs out of Identity we:
    //-log them out of Echo
    //-allow for anonymous postings by binding to the Submit.onPostInit event
    //-remove the link for changing the avatar
  WapoIdentity.prototype.logoutCallback = function() {
      //logout the user from jskit
      this.callLogoutPortableContact();

      //bind to comment submission event
      Echo.Broadcast.subscribe('Submit.onPostInit', 
                               function(target, targetURL, data, postData){ 
                                   wapoIdentity.storeComment(target, targetURL, data, postData);                                       
                               }); 

      //bind to comment submission event
      Echo.Broadcast.subscribe('Stream.Item.onControlClick', 
        function(eventName, data){ 
          wapoIdentity.storeAction(data.name, data.item.data.object.id);
        }
      ); 
                               
      //remove change profile pic link
      var profilePicLink = $wpjQ("#wapoChangeAvatarLink");
      if(profilePicLink !== null)
      {
	  profilePicLink.remove();
      }

  };

    //logs the wapo user out of Echo, we don't have the wapi_login_id cookie 
    //so we have to determine the logged in user via the Echo.User javascript object
  WapoIdentity.prototype.callLogoutPortableContact = function() {
      var openId = null;
      if(typeof(this.echo_user) !== 'undefined' && typeof(this.echo_user.accounts) !== 'undefined' && this.echo_user.accounts.length > 0)
      {
        for(var i=0; i<this.echo_user.accounts.length; i++)
        {
            var account = this.echo_user.accounts[i];
            if(typeof(account) !== 'undefined')
            {
              openId = account.identityUrl;
              //escape url special characters
              openId = openId.replace(/\%20/g, "%2B");//openId = encodeURIComponent(openId);
	    }
        }
      }
      if(openId !== null)
      {
     	  //send backplane identity/logout call to JSKit
	  	var channelName = Backplane.getChannelName();
	  	var ajaxOptions = {
			       type: 'GET',
	               url: 'http:' + wapoEnv.wapo_site_url + 'public/visitor/logout_portable_contact.json?jskit_channel='+channelName+'&jskit_login='+openId,
			       dataType: 'jsonp',
			       cache: false,
			       jsonp: wapoEnv.param_name_jsonp_callback,
                   success: function(data){
                            	if(data !== null && 
				    				typeof data['response'] !== 'undefined' && 
				    				data['response'] !== null) {
				    
				    				if (data['response'].indexOf("result=success") !== -1) {
										//console.log("logout succeeded");
                    				}
                    				else if (data['response'].indexOf("invalid") !== -1) {
                    					//console.log("logout failed");
                    				}
                 				}

                                wapoIdentity.echoLogoutCallback();
                            },
                   error: function(){
                                   wapoIdentity.echoLogoutCallback();
                          }
          }

	   //call <site>//identity/public/visitor/logout_portable_contact
	   $wpjQ.ajax(ajaxOptions);

           //tell Backplane to start polling because identity/logout message should come through
           Backplane.expectMessagesWithin(10);
      }
      else
      {
          this.echoLogoutCallback();
      }

  };

  //triggers an event and calls a pre-defined function indicating that a user should be logged into Echo
  WapoIdentity.prototype.echoLoginCallback = function() {
     //send login jquery custom event
     $wpjQ(window).trigger('echoLoginStateChange', ['login']);
     if(typeof(Echo.LoginStateChange) === 'function')
     {
         Echo.LoginStateChange('login');
     }

  };

  //triggers an event and calls a pre-defined function indicating that a user should be logged out of Echo
    WapoIdentity.prototype.echoLogoutCallback = function() {
     //send login jquery custom event
     $wpjQ(window).trigger('echoLoginStateChange', ['logout']);
     if(typeof(Echo.LoginStateChange) === 'function')
     {
         Echo.LoginStateChange('logout');
     }
  };

  WapoIdentity.prototype.deferredActions = function() {
    Echo.Broadcast.unsubscribe('Submit.onPostInit');
    this.postComment();
    Echo.Broadcast.unsubscribe('Stream.Item.onControlClick');
    this.postAction();
  };
  
  //stores information about an anonymous comment to be later posted after a user logs in
  WapoIdentity.prototype.storeComment = function(target, targetUrl, data, postData) {
     //save parameters into cookies to be retrieved after a user logs in
     //redirect user to login/registration screen with redirect url set to current page
      var redirectUrl = window.location;
      redirectUrl = encodeURIComponent(redirectUrl);
      var markers = $wpjQ('input.echo-submit-markers').get(0).value;
      var tags = $wpjQ('input.echo-submit-tags').get(0).value;
      wapoUtilities.Set_Cookie('wapo_jskit_comment', targetUrl.postData.content, 1, wapoEnv.site_path, wapoEnv.site_base_domain, false);
      wapoUtilities.Set_Cookie('wapo_jskit_targetUrl', targetUrl.postData.target, 1, wapoEnv.site_path, wapoEnv.site_base_domain, false);
      wapoUtilities.Set_Cookie('wapo_jskit_redirectUrl', redirectUrl, 1, wapoEnv.site_path, wapoEnv.site_base_domain, false);
      wapoUtilities.Set_Cookie('wapo_jskit_loginUrl', wapoEnv.wapo_reg_url, 1, wapoEnv.site_path, wapoEnv.site_base_domain, false);
      wapoUtilities.Set_Cookie('wapo_jskit_markers', markers, 1, wapoEnv.site_path, wapoEnv.site_base_domain, false);
      wapoUtilities.Set_Cookie('wapo_jskit_tags', tags, 1, wapoEnv.site_path, wapoEnv.site_base_domain, false);
  };

  //posts an anonymous comment using ajax after a user logs in
  WapoIdentity.prototype.postComment = function() {
     //check if there is any comment to post && if user is logged in
     //post comment to JSKit
     //delete comment cookies
     var comment = wapoUtilities.Get_Cookie('wapo_jskit_comment');
     var targetUrl = wapoUtilities.Get_Cookie('wapo_jskit_targetUrl');
     if(comment !== null && targetUrl !== null)
     {
	      var markers = encodeURIComponent(wapoUtilities.Get_Cookie('wapo_jskit_markers'));
    	  var tags = encodeURIComponent(wapoUtilities.Get_Cookie('wapo_jskit_tags'));
          comment = encodeURIComponent(comment);
          targetUrl = encodeURIComponent(targetUrl);
          var ajaxOptions = {
            type: 'GET',
            url: 'http:' + wapoEnv.wapo_site_url + 'public/visitor/submit_comment.json?jskit_comment='+comment+'&jskit_targeturl='+targetUrl+'&jskit_markers='+markers+'&jskit_tags='+tags + "&" + wapoEnv.param_name_jsonp_callback + "=?",
            dataType: 'jsonp',
            cache: false,
            jsonp: wapoEnv.param_name_jsonp_callback
          }

	   //call <site>//identity/public/visitor/logout_portable_contact
	   $wpjQ.ajax(ajaxOptions);       

           wapoUtilities.Delete_Cookie('wapo_jskit_comment', wapoEnv.site_path, wapoEnv.site_base_domain);
           wapoUtilities.Delete_Cookie('wapo_jskit_targetUrl', wapoEnv.site_path, wapoEnv.site_base_domain);
           wapoUtilities.Delete_Cookie('wapo_jskit_redirectUrl', wapoEnv.site_path, wapoEnv.site_base_domain);
           wapoUtilities.Delete_Cookie('wapo_jskit_loginUrl', wapoEnv.site_path, wapoEnv.site_base_domain);
           wapoUtilities.Delete_Cookie('wapo_jskit_markers', wapoEnv.site_path, wapoEnv.site_base_domain);
           wapoUtilities.Delete_Cookie('wapo_jskit_tags', wapoEnv.site_path, wapoEnv.site_base_domain);
     }
  };

  //stores information about an anonymous comment action to be later posted after a user logs in
  WapoIdentity.prototype.storeAction = function(action, objectId) {
     //save parameters into cookies to be retrieved after a user logs in
     //redirect user to login/registration screen with redirect url set to current page
      var redirectUrl = window.location;
      redirectUrl = encodeURIComponent(redirectUrl);
      wapoUtilities.Set_Cookie('wapo_jskit_action', action, 1, wapoEnv.site_path, wapoEnv.site_base_domain, false);
      wapoUtilities.Set_Cookie('wapo_jskit_object_id', objectId, 1, wapoEnv.site_path, wapoEnv.site_base_domain, false);
      wapoUtilities.Set_Cookie('wapo_jskit_redirectUrl', redirectUrl, 1, wapoEnv.site_path, wapoEnv.site_base_domain, false);
      wapoUtilities.Set_Cookie('wapo_jskit_loginUrl', wapoEnv.wapo_reg_url, 1, wapoEnv.site_path, wapoEnv.site_base_domain, false);
  };

  //posts an anonymous comment action using ajax after a user logs in
  WapoIdentity.prototype.postAction = function() {
     //check if there is any comment to post && if user is logged in
     //post comment to JSKit
     //delete comment cookies
     var action = wapoUtilities.Get_Cookie('wapo_jskit_action');
     var objectId = wapoUtilities.Get_Cookie('wapo_jskit_object_id');
     if(action !== null && objectId !== null)
     {
        action = encodeURIComponent(action);
        objectId = encodeURIComponent(objectId);
        var ajaxOptions = {
            type: 'GET',
            url: 'http:' + wapoEnv.wapo_site_url + 'public/visitor/submit_item_metadata.json?verb='+action+'&objectid='+objectId + "&" + wapoEnv.param_name_jsonp_callback + "=?",
            dataType: 'jsonp',
            cache: false,
            jsonp: wapoEnv.param_name_jsonp_callback
       }

	   //call <site>//identity/public/visitor/logout_portable_contact
	   $wpjQ.ajax(ajaxOptions);       

        wapoUtilities.Delete_Cookie('wapo_jskit_action', wapoEnv.site_path, wapoEnv.site_base_domain);
        wapoUtilities.Delete_Cookie('wapo_jskit_object_id', wapoEnv.site_path, wapoEnv.site_base_domain);
        wapoUtilities.Delete_Cookie('wapo_jskit_redirectUrl', wapoEnv.site_path, wapoEnv.site_base_domain);
        wapoUtilities.Delete_Cookie('wapo_jskit_loginUrl', wapoEnv.site_path, wapoEnv.site_base_domain);
     }
  };

  WapoIdentity.prototype.isPostIdMissing = function() {
  	var isMissing = false;
    if(typeof(this.wpni_username) !== 'undefined' && this.wpni_username !== null && this.wpni_username !== "" &&
       typeof(this.wapo_username) !== 'undefined' && this.wapo_username !== null && this.wapo_username === "") {
        isMissing = true;
    }
  	return isMissing;
  }

  WapoIdentity.prototype.isFacebookConnected = function() {
 	var isFacebookConnected = false;
  	if (!wapoIdentity.isPostIdMissing()) {
  		var avatarUrl = wapoUtilities.Get_Cookie(wapoEnv.cookie_avatar);
  		isFacebookConnected = typeof(avatarUrl) !== 'undefined' && avatarUrl !== null && avatarUrl.indexOf("facebook") !== -1;
  	}
  	return isFacebookConnected;
  }
  
  wapoIdentity = new WapoIdentity();
  wapoIdentity.init();
  
};
  
  function wapoLoginCallback() {
      wapoIdentity.loginCallback();
  };
  
  function wapoLogoutCallback() {
      wapoIdentity.logoutCallback();
  };
  
TWP_Debug.pagedebug && window.console && console.log && console.log('[' + (new Date()-TWP_Debug.initialTime)/1000 + ']' + 'wapo_full.js - bottom');

