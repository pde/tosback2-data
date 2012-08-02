
/**************************************
FROM wapo_identity.js
**************************************/

function WapoSite(name, url, visId) {
	this.name = name;
	this.url = url;
	this.visId = visId;
}


function WapoEnv() {
	this.wapolabs_js = '//d2pe20ur0h0p8p.cloudfront.net/wapolabs/1.7.1/js/wapolabs.nojq.full.js';
	this.waposites_js = '//d2pe20ur0h0p8p.cloudfront.net/identity/js/wapo_sites.js';
	this.cdn_identity = '//d2pe20ur0h0p8p.cloudfront.net/identity/1.5.2/';
	this.cdn_images_identity = '//d2pe20ur0h0p8p.cloudfront.net/identity/1.5.2/';
	this.fb_key = '41245586762';
//	this.fb_xd_receiver = '/sites/all/modules/wapolabs_identity/xd_receiver.htm';
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
        this.init_xfbml = false;

        this.jskit_commenting_group = 'commenting';
        this.wapo_reg_url = 'https://ssl.washingtonpost.com/actmgmt/registration/login/commenting?destination=';
        this.commenting_edit_profile_url = 'https://ssl.washingtonpost.com/actmgmt/registration/group/commenting?destination=';

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
        this.event_name_fb_async_init = 'wapoFbAsyncInit';

}

// function Set_Unescaped_Cookie( name, value, expires, path, domain, secure ) specifically for the post for non-escaped cookies
//this method can be deleted with the autoLoginPostUser call
WapoEnv.prototype.Set_Unescaped_Cookie = function( name, value, expires, path, domain, secure ) {
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

  document.cookie = name + "=" + value  +
                    ( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
                    ( ( path ) ? ";path=" + path : "" ) +
                    ( ( domain ) ? ";domain=" + domain : "" ) +
                    ( ( secure ) ? ";secure" : "" );
}; 

var wapoEnv = new WapoEnv();


// silly? a little.
window.$wpjQ = typeof window.$wpjQ !== 'undefined' && window.$wpjQ || jQuery;
$wpjQ(document).trigger('wapo_env_init');

    if(typeof wapoEvent !== 'undefined' && typeof wapoEvent.eventHost !== 'undefined')
    {
      	wapoEvent.eventHost = "event.washingtonpost.com";
    }


/**************************************
FROM  identity.js
**************************************/
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
        this.reconcileVisId();
        this.updateWaPoVisId(this.wapoVisId);
    }
    else {
        this.initVisId();
    }
    
    
		this.wapoLoginId = wapoUtilities.Get_Cookie(wapoEnv.cookie_login_id);
		if (this.wapoLoginId !== null && this.wapoLoginId.length > 0) {    	
		  this.getDependentLoginValues();
		}
		
		if(!$wpjQ.browser.msie){
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
		  //since sites can have different visId values due to a bug,
		  //choose the largest one that we find
		  if (foundVisId == null || foundVisId < site.visId){
			foundVisId = site.visId;
		  }
		}
	}

	if (noNullsFound) {
		// we got a response back from all wapo companies
		if (foundVisId !== "-1") {
	        this.wapoVisId = foundVisId;
	        wapoUtilities.Set_Cookie(wapoEnv.cookie_vis_id, wapoVisitor.wapoVisId, (50*365), wapoEnv.site_path, this.baseDomainName, false);

  	         //trigger event for when a visitor cookie is created for a user
                 $wpjQ(document).trigger("wapo_visitor_create");
                 
	        this.updateWaPoVisId(this.wapoVisId);
		}
		else {   
		    var url = wapoEnv.wapo_public_protocol + wapoEnv.wapo_site_url + "public/visitor/create?format=json&jsonp=&" + wapoEnv.param_name_jsonp_callback + "=?";
		    $wpjQ.getJSON(url,
		              function( data ) {                 
		                if(data !== null && data.visitors != null && data.visitors.wapoVisitor !== null && data.visitors.wapoVisitor.id !== null) {
		                  wapoVisitor.wapoVisId = data.visitors.wapoVisitor.id;
		                  wapoUtilities.Set_Cookie(wapoEnv.cookie_vis_id, wapoVisitor.wapoVisId, (50*365), wapoEnv.site_path, wapoVisitor.baseDomainName, false);
  	                          //trigger event for when a visitor cookie is created for a user
                                  $wpjQ(document).trigger("wapo_visitor_create");

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
          }
     });
    }
    
    //add omniture cookie value as instance data
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
    this.updateSessionId();

    //send page view events

};


WapoVisitor.prototype.reconcileVisId = function() {

   currentVisId = wapoUtilities.Get_Cookie(wapoEnv.cookie_vis_id);
   
   //if we have a currentVisId, check to see if we have a larger visId from another site
   //if so, reset our visId cookie
   if (currentVisId && wapoSites.length > 1) {
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
			    	          "wapoVisitor.processReconcileVisId();"
			    	        ),
			    	        error: new Function("XHR", "textStatus", "errorThrown", "wapoSites[" + i + "].visId = '-1'; wapoVisitor.processReconcileVisId();" )
			    	      }
			    	    );
			}
		}
   }
};

WapoVisitor.prototype.processReconcileVisId = function() {
    var foundVisId = "-1";
	var noNullsFound = true;
	for (var i = 0; i < wapoSites.length; i++) {
		var site = wapoSites[i];
		if (site.visId == null) {
			noNullsFound = false;
		}
		else if (site.visId !== "-1") {
		  //since sites can have different visId values due to a bug,
		  //choose the largest one that we find
		  if (foundVisId == null || foundVisId < site.visId)
			foundVisId = site.visId;
		}
	}
	
	if (noNullsFound) {
		// we got a response back from all wapo companies
		if (foundVisId !== "-1") {
	        this.wapoVisId = foundVisId;
	        //we only need to set the cookie if the value is different than the original value
	        currentVisIdCookieVal = wapoUtilities.Get_Cookie(wapoEnv.cookie_vis_id);
	        if (currentVisIdCookieVal !== null && currentVisIdCookieVal !== foundVisId)
	        {
	          wapoUtilities.Set_Cookie(wapoEnv.cookie_vis_id, wapoVisitor.wapoVisId, (50*365), wapoEnv.site_path, this.baseDomainName, false);

  	          //trigger event for when a visitor cookie is created for a user
              $wpjQ(document).trigger("wapo_visitor_create");
            }     
		}
		else {   
		    var url = wapoEnv.wapo_public_protocol + wapoEnv.wapo_site_url + "public/visitor/create?format=json&jsonp=&" + wapoEnv.param_name_jsonp_callback + "=?";
		    $wpjQ.getJSON(url,
		              function( data ) {                 
		                if(data !== null && data.visitors != null && data.visitors.wapoVisitor !== null && data.visitors.wapoVisitor.id !== null) {
		                  wapoVisitor.wapoVisId = data.visitors.wapoVisitor.id;
		                  wapoUtilities.Set_Cookie(wapoEnv.cookie_vis_id, wapoVisitor.wapoVisId, (50*365), wapoEnv.site_path, wapoVisitor.baseDomainName, false);
  	                          //trigger event for when a visitor cookie is created for a user
                                  $wpjQ(document).trigger("wapo_visitor_create");

		                  wapoVisitor.updateWaPoVisId(this.wapoVisId);
		                }
		
		              }
		    );       
	        }

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
			$wpjQ('<img id="helloPic" style="display:none;" alt="User Profile Picture" />').appendTo('#wapolabs_wrapperLoginStatus');
		} else {
			$wpjQ('<img id="helloPic" width="40" height="40" src="'
			+ wapoVisitor.picUrl
			+ '" style="display:inline;" alt="User Profile Picture" />').appendTo('#wapolabs_wrapperLoginStatus');
		}

		// then append the following provider img tag... 
		if (!this.providerUrl || this.providerUrl === "") {
			$wpjQ('<img id="providerPic" style="display:none;" alt="Provider Brand" />').appendTo('#wapolabs_wrapperLoginStatus');
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
        $wpjq(document).trigger(loginEvent);
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



// gets cookie with specified name
// function Get_Cookie( check_name ) {
WapoEnv.prototype.Get_Unescaped_Cookie = function( check_name ) {
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
				cookie_value = a_temp_cookie[3].replace(/^\s+|\s+$/g, '') ;
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


/**************************************
FROM wapo_identity.js, initializing autoLoginPostUser
**************************************/



			    //if user has wpniuser & wpnisecure but no wapo_login_id
			    //try to auto login user
			    var wpniuser = wapoUtilities.Get_Cookie('wpniuser');
			    var wpnisecure = wapoUtilities.Get_Cookie('wpnisecure');
			    var wapo_display = wapoEnv.Get_Unescaped_Cookie('wapo_display');
			    var wapo_login_id = wapoUtilities.Get_Cookie(wapoEnv.cookie_login_id);
			    var fbuid = wapoUtilities.Get_Cookie('fbuid');
			    var at = wapoUtilities.Get_Cookie('at');
			    var wpatc = wapoUtilities.Get_Cookie('WPATC');
			    if((wapo_login_id === null || (wapo_display !== null && wapo_display.indexOf('%7C') > -1) || wpatc == null) && wpniuser !== null && wpnisecure !== null && (fbuid === null || (fbuid !== null && at !== null)))
			    {
			    var autoLoginUrl = wapoEnv.wapo_public_protocol + wapoEnv.wapo_site_url + "postLogin/autoLoginPostUser.json";
				$wpjQ.ajax({
				    url: autoLoginUrl,
				    dataType: 'jsonp',
				    cache: false,
				    jsonp: wapoEnv.param_name_jsonp_callback,
				    success: function(data){
					if(data.constructor == Array)
					{
					    $wpjQ.each(data, function(index, cookieData){
						wapoEnv.Set_Unescaped_Cookie(cookieData['name'], cookieData['value'], cookieData['maxage']/(60 * 60 * 24), wapoEnv.site_path, wapoEnv.site_base_domain, false);
					    });
					    wapoVisitor.getDependentLoginValues();
					}
				    }
				});
			    }

