// JavaScript Document
// Files comined in this document:
// *** jstree_css.js
// *** supportMain.js
// *** localization.js
// *** mainSupport_PR.js
//  *** Removed curvycorners.js as same function is in global.js (PROD12-1582)
// *** curvycorners.js
// *** localization-model.js
// *** pageview.js
// *** *********************************************************************** *** 

//*** ************************************************************************ ***
//* *** Combined from jstree_css.js *** *
function get_css(rule_name, stylesheet, delete_flag) {
	if (!document.styleSheets) return false;
	rule_name = rule_name.toLowerCase(); stylesheet = stylesheet || 0;
	for (var i = stylesheet; i < document.styleSheets.length; i++) { 
		var styleSheet = document.styleSheets[i]; css_rules = document.styleSheets[i].cssRules || document.styleSheets[i].rules;
		if(!css_rules) continue;
		var j = 0;
		do {
			if(css_rules[j].selectorText.toLowerCase() == rule_name) {
				if(delete_flag == true) {
					if(document.styleSheets[i].removeRule) document.styleSheets[i].removeRule(j);
					if(document.styleSheets[i].deleteRule) document.styleSheets[i].deleteRule(j);
					return true;
				}
				else return css_rules[j];
			}
		}
		while (css_rules[++j]);
	}
	return false;
}
function add_css(rule_name, stylesheet) {
	rule_name = rule_name.toLowerCase(); stylesheet = stylesheet || 0;
	if (!document.styleSheets || get_css(rule_name, stylesheet)) return false;
	(document.styleSheets[stylesheet].addRule) ? document.styleSheets[stylesheet].addRule(rule_name, null, 0) : document.styleSheets[stylesheet].insertRule(rule_name+' { }', 0);
	return get_css(rule_name);
}
function get_sheet_num (href_name) {
	if (!document.styleSheets) return false;
	for (var i = 0; i < document.styleSheets.length; i++) { if(document.styleSheets[i].href && document.styleSheets[i].href.toString().match(href_name)) return i; } 
	return false;
}
function remove_css(rule_name, stylesheet) { return get_css(rule_name, stylesheet, true); }

function add_sheet(url, media) {
	if(document.createStyleSheet) {
		document.createStyleSheet(url);
	}
	else {
		var newSS	= document.createElement('link');
		newSS.rel	= 'stylesheet';
		newSS.type	= 'text/css';
		newSS.media	= media || "all";

		newSS.href	= url;
		// var styles	= "@import url(' " + url + " ');";
		// newSS.href	='data:text/css,'+escape(styles);
		document.getElementsByTagName("head")[0].appendChild(newSS);
	}
}
//*** End jstree_css.js ***
//*** ************************************************************************ ***

//*** ************************************************************************ ***
//* *** Combined from supportMain.js *** *

jQuery(document).ready(function(){
	tertiery();
	popupHandler();
	supportSettings();
	loadOverlayAndHover();
	prepareChatLink();
	hideEmptyTiles();
});


function loadOverlayAndHover() {
	// jTip Theme rollovers -- sticky!
	jQuery('a.jt').cluetip({
		local: false,   // default value, but wasn't working for ajax
	    cluetipClass: 'jtip', 
	    arrows: true, 
	    dropShadow: true,
	    sticky: true,
	    activation: 'click',
	    mouseOutClose: false,
	    closePosition: 'top',
		topOffset: 50, 
		showTitle: false,
		width: 220,
		positionBy: 'auto',
    	closeText: '<img src="/esupport/images/buttons/btn_close_x.gif" alt="close" />'
	});
  
	// default theme static rollovers not sticky
	jQuery('a.jtstat').cluetip({
		local: false,   // default value, but wasn't working for ajax
		cluetipClass: 'default', 
		arrows: true, 
		dropShadow: true,
		topOffset: 50, 
		width: 255,
		positionBy: 'auto',
		showTitle: false
	});
	  
	// default theme static rollover not sticky 153 px
	jQuery('a.jtstatNarrow').cluetip({
		local: false,  // default value, but wasn't working for ajax
		cluetipClass: 'default', 
		arrows: true, 
		dropShadow: true,
		topOffset: 50, 
		width: 153,
		positionBy: 'auto',
		showTitle: false
	});
}


function popupHandler(){
	jQuery(".popup").click(function(){		
		var relDim = jQuery(this).attr('rel');
		var dim = relDim.split("x");
		if(relDim == "" || relDim == null){
			var w = "800";
			var h = "600";
		}
		else{
			var w = dim[0];
			var h = dim[1];
		}		
		window.open(this.href,'Popup','toolbar=0,scrollbars=0,location=0,menubar=0,resizable=1,width='+w+',height='+h+'');
		return false;
	});
}

function tertiery(){
		
	var timeout    = 200;
	var closetimer = 0;
	var subnavitem = 0;
	
	jQuery("a.hasDropdown").each(function(){ 
		var tLink = jQuery(this).width()+31;
		jQuery(this).parent().css({"width":tLink});	
		jQuery(this).parent().next().css({"width":tLink});	
		//jQuery(this).parent().next().css({"border":"1px solid #000"});
	});
		
	function subnav_open(){
		if(jQuery(this).children().next().hasClass("tertiery")){
			subnav_canceltimer();
			subnav_close();
			subnavitem = jQuery(this).children().next().show();
			jQuery(this).addClass("secondaryLeftShadow");
			jQuery(this).children().addClass("secondaryRightShadow");
			jQuery(this).children().children().addClass("whiteBG downArrow")
			
			if(navigator.appName=="Microsoft Internet Explorer" && (navigator.appVersion.indexOf("MSIE 6.")>-1)) {
				if(jQuery(this).children().children().hasClass("supportSettingsWidth") && jQuery("#cv").length > 0) {
					jQuery("#fakeSelect").attr("style","display:inline");
					jQuery("#cv").hide();
				}
				
				if(jQuery(this).children().children().hasClass("internetNavLink") && jQuery("#solutionFinderAnswerIdDropdown").length > 0) {
					jQuery("#fakeSolutionFinderAnswerIdImage").show();
					jQuery("#solutionFinderAnswerIdDropdown").hide();
				}
			}
		}
	}
	
	function subnav_close(){
		if(navigator.appName=="Microsoft Internet Explorer" && (navigator.appVersion.indexOf("MSIE 6.")>-1)) {
			if(jQuery("#cv").length > 0) {
				jQuery("#fakeSelect").attr("style","display:none;");
				jQuery("#cv").show();
			}
	
			if(jQuery("#solutionFinderAnswerIdDropdown").length > 0) {
				jQuery("#fakeSolutionFinderAnswerIdImage").hide();
				jQuery("#solutionFinderAnswerIdDropdown").show();
			}
		}
		
		if(subnavitem) subnavitem.hide();
		jQuery("a.hasDropdown").parent().parent().removeClass("secondaryLeftShadow");
		jQuery("a.hasDropdown").parent().removeClass("secondaryRightShadow");
		jQuery("a.hasDropdown").removeClass("whiteBG downArrow");
		jQuery("p.hasDropdown").parent().parent().removeClass("secondaryLeftShadow");
		jQuery("p.hasDropdown").parent().removeClass("secondaryRightShadow");
		jQuery("p.hasDropdown").removeClass("whiteBG downArrow");
	}
	
	function subnav_timer(){
		closetimer = window.setTimeout(subnav_close, timeout);
	}
	
	function subnav_canceltimer(){
		if(closetimer){
			window.clearTimeout(closetimer);
			closetimer = null;
		}
	}
	
	jQuery('.subnav > li').bind('mouseenter', subnav_open)	
	jQuery('.subnav > li').bind('mouseleave', subnav_timer)	
	
	//document.onclick = subnav_close;
}

function supportSettings() {			
	jQuery('#support_hover').append( jQuery('#support_hover_content').html() );	
}


jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }prepareChatLink
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};

function resetForm(id) {
	jQuery('#'+id).each(function(){
	        this.reset();
	});
}

function prepareChatLink() {
	jQuery('a.chat').live('click', function () {
		var c_cltcookie=jQuery.cookie("attPersistantLocalization");
	if(c_cltcookie!=null && c_cltcookie!='' )
	{
		var serviceCode = jQuery('input#additionalSupportServiceCodeForChat').val();
		var regionCode = jQuery('input#additionalSupportRegionFolderCode').val();
		var pageName = jQuery('input#pageNameForChat').val();
		if( serviceCode != '820' && serviceCode != '821' ){
			var url = 'https://pattta.att.motive.com/netagent/questionnaire_c2c_dsl_sw.aspx'; 
			/*DLS start*/
				if (serviceCode == '801' && regionCode.indexOf('72') == 0 && (pageName == 'main' || pageName == 'welcome' || pageName == 'search' || pageName == 'wifi' || pageName == 'email')) {
					url = 'https://pattta.att.motive.com/netagent/questionnaire_c2c_dsl_sw.aspx?ChatRefId=65';
				}
				else if (serviceCode == '801' && regionCode.indexOf('71') == 0 && (pageName == 'main' || pageName == 'welcome' || pageName == 'search' || pageName == 'wifi' || pageName == 'email')) {
					url = 'https://pattta.att.motive.com/netagent/questionnaire_c2c_dsl_se.aspx?ChatRefId=64';
				}
				else if (serviceCode == '801' && pageName == 'article' && regionCode.indexOf('72') == 0) {
					url = 'https://pattta.att.motive.com/netagent/questionnaire_c2c_dsl_sw.aspx?ChatRefId=62';
				}
				else if (serviceCode == '801' && pageName == 'article' && regionCode.indexOf('71') == 0) {
					url = 'https://pattta.att.motive.com/netagent/questionnaire_c2c_dsl_se.aspx?ChatRefId=61';
				}
			/*DLS end*/
			/*u-verse start*/
				else if ((serviceCode == '803' || serviceCode == '812' || serviceCode == '813' || serviceCode == '814') && pageName == 'article' && (regionCode.indexOf('71') == 0 || regionCode.indexOf('72') == 0)) {
					url = 'https://pattta.att.motive.com/netagent/questionnaire_uverse.aspx?ChatRefId=63';
				}
				else if (serviceCode == '803' && (pageName == 'main' || pageName == 'search') && (regionCode.indexOf('71') == 0 || regionCode.indexOf('72') == 0)) {
					url = 'https://pattta.att.motive.com/netagent/questionnaire_uverse.aspx?ChatRefId=66';
				}
				else if (serviceCode == '812' && (pageName == 'main' || pageName == 'welcome' || pageName == 'search' || pageName == 'wifi' || pageName == 'email') && (regionCode.indexOf('71') == 0 || regionCode.indexOf('72') == 0)) {
					url = 'https://pattta.att.motive.com/netagent/questionnaire_uverse.aspx?ChatRefId=66';
				}
				else if (serviceCode == '813' && (pageName == 'main' || pageName == 'welcome' || pageName == 'search') && (regionCode.indexOf('71') == 0 || regionCode.indexOf('72') == 0)) {
					url = 'https://pattta.att.motive.com/netagent/questionnaire_uverse.aspx?ChatRefId=66';
				}
				else if (serviceCode == '814' && (pageName == 'main' || pageName == 'welcome' || pageName == 'search') && (regionCode.indexOf('71') == 0 || regionCode.indexOf('72') == 0)) {
					url = 'https://pattta.att.motive.com/netagent/questionnaire_uverse.aspx?ChatRefId=66';
				}
			/*u-verse-end*/
			/*Fix for IE - PROD12-2830*/
			if (jQuery.browser.msie) {
			    jQuery('a.chat').attr("href","javascript:void(0);");
			  }
			var popup_options = 'menubar=no,toolbar=no,scrollbars=no,resizable=no,width=472,height=350';
			var newWin = window.open(url, "attchat", popup_options);
			try{
				if (!jQuery.browser.msie) {
						newWin.focus();
				}
			}catch(e){}
			return false;
		}
		
		return true;
		}	
	else
	{		
			jQuery.nyroModalManual({
			autosizeable: false,
			url: '/esupport/akamai-header/localizationModelOverlay.jsp?invokeFrom=chat',
			modal:false,
			width: 650,
			height: 350
			});				
		return false;
	}
	});
}

function hideEmptyTiles() {
	jQuery('div.empty-tile').parent().hide();
}



// *** New Kiosk Functions ***
function ShowKiosk(contentId){
	jQuery.get('/esupport/sharedSegments/kioskContentItem.jsp?contentItemId='+contentId, function (data) {
		jQuery('#kioskID').css({"overflow":"hidden","width":"468px","position":"relative"}).html('<div id="kioskSubID" style="left:468px;" ></div>');
		  jQuery('#kioskSubID').html(data).css({"position":"relative", "display":"block", "float":"left"}).animate({left: "0px"}, "slow" );
	});
}

function ShowFeaturesKiosk(contentId){
	var isDSelected = isDeviceSelected();
	if(isDSelected==false){
		var currentURL=document.URL;
		var returnUrl;
		if(currentURL.indexOf('?')!=-1){
			returnUrl=currentURL+'&contentItemidParam='+contentId;
		}else
		{
			returnUrl=currentURL+'?contentItemidParam='+contentId;
		}
		openDeviceModel(returnUrl);
	}else{
		jQuery.get('/esupport/sharedSegments/kioskContentItem.jsp?contentItemId='+contentId, function (data) {
			jQuery('#kioskID').css({"overflow":"hidden","width":"468px","position":"relative"}).html('<div id="kioskSubID" style="left:468px;" ></div>');
			  jQuery('#kioskSubID').html(data).css({"position":"relative", "display":"block", "float":"left"}).animate({left: "0px"}, "slow" );
		});
	}
}

jQuery(document).ready(function() {
	jQuery("#kioskBg-anchor1").live("mouseover", function(){ 
		jQuery("#kioskTile-1 .kioskBg").addClass("kiosk-hover");
		jQuery("#kioskTile-1 .arrwLink").attr("src", "/media/att/2012/support/kiosk/img_arw_slider_lf_on.png"); 
	}).live("mouseout", function(){ 
		jQuery("#kioskTile-1 .kioskBg").removeClass("kiosk-hover"); 
		jQuery("#kioskTile-1 .arrwLink").attr("src", "/media/att/2012/support/kiosk/img_arw_slider_lf_off.png"); 
	});		
	
	jQuery("#kioskBg-anchor2").live("mouseover", function(){ 
		jQuery("#kioskTile-2 .kioskBg").addClass("kiosk-hover");
		jQuery("#kioskTile-2 .arrwLink").attr("src", "/media/att/2012/support/kiosk/img_arw_slider_lf_on.png"); 
	}).live("mouseout", function(){ 
		jQuery("#kioskTile-2 .kioskBg").removeClass("kiosk-hover"); 
		jQuery("#kioskTile-2 .arrwLink").attr("src", "/media/att/2012/support/kiosk/img_arw_slider_lf_off.png"); 
	});		
	
	jQuery("#kioskBg-anchor3").live("mouseover", function(){ 
		jQuery("#kioskTile-3 .kioskBg").addClass("kiosk-hover");
		jQuery("#kioskTile-3 .arrwLink").attr("src", "/media/att/2012/support/kiosk/img_arw_slider_lf_on.png"); 
	}).live("mouseout", function(){ 
		jQuery("#kioskTile-3 .kioskBg").removeClass("kiosk-hover"); 
		jQuery("#kioskTile-3 .arrwLink").attr("src", "/media/att/2012/support/kiosk/img_arw_slider_lf_off.png"); 
	});		
		
	jQuery("#kioskBg-2-anchor-lft").live("mouseover", function(){ 
		jQuery("#kioskTile-1 .kioskBg-2").addClass("kiosk-hover-2");
		jQuery("#kioskTile-1 .arrwLink").attr("src", "/media/att/2012/support/kiosk/img_arw_slider_lf_on.png"); 
	}).live("mouseout", function(){ 
		jQuery("#kioskTile-1 .kioskBg-2").removeClass("kiosk-hover-2"); 
		jQuery("#kioskTile-1 .arrwLink").attr("src", "/media/att/2012/support/kiosk/img_arw_slider_lf_off.png"); 
	});
	
	jQuery("#kioskBg-2-anchor-rt").live("mouseover", function(){ 
		jQuery("#kioskTile-2 .kioskBg-2").addClass("kiosk-hover-2");
		jQuery("#kioskTile-2 .arrwLink").attr("src", "/media/att/2012/support/kiosk/img_arw_slider_lf_on.png"); 
	}).live("mouseout", function(){ 
		jQuery("#kioskTile-2 .kioskBg-2").removeClass("kiosk-hover-2"); 
		jQuery("#kioskTile-2 .arrwLink").attr("src", "/media/att/2012/support/kiosk/img_arw_slider_lf_off.png"); 
	});
	
	jQuery("#kioskBg-full-anchor").live("mouseover", function(){ 
		jQuery(".kioskBg-3").addClass("kiosk-hover-3");
		jQuery(".arrwLink-Back").attr("src", "/media/att/2012/support/kiosk/img_arw_slider_rt_on.png"); 
	}).live("mouseout", function(){ jQuery(".kioskBg-3").removeClass("kiosk-hover-3"); 
		jQuery(".arrwLink-Back").attr("src", "/media/att/2012/support/kiosk/img_arw_slider_rt_off.png"); 
	});
});	

// *** New Kiosk Functions ***

function openVirtuOzChat(chatName){
	var clt_cookie = jQuery.cookie("attPersistantLocalization");
	if(clt_cookie =null && clt_cookie ==''){
		//commented for JIRA ticket ECAR1105-82
		//VirtuOzVars.ui.zip= '';
		//VirtuOzVars.ui.st= '';
	}
	VirtuOz.AgentLoader.loadAgent(chatName);
}
function ShowMoreFeatures(){
	location.replace('/esupport/main.jsp?ct=9003621&pv=2'); 
}

function checkLabelLenth(label){
	if(label.length>60){
		return label.substring(0,56)+"...";
	}
	return label;
}

function ChangeService()
{
	var cvCode = document.getElementById("cvCode").value;
	location.href="main.jsp?cv="+cvCode;
}
showTips = function(id) {

	jQuery('#'+id).fadeIn('slow');
}

hideTips = function(id) {
	jQuery('#'+id).fadeOut('slow');
}
//* *** End supportMain.js *** *
//*** ************************************************************************ ***



//*** ************************************************************************ ***
//* *** Combined from localization.js *** *

//<![CDATA[
//To get attPersistantLocalization cookie
function getTopCookie(name) {
	var dc = document.cookie;
    var cname = name + "=";
    var clen = dc.length;
    var cbegin = 0;
    while (cbegin < clen) {
	    var vbegin = cbegin + cname.length;
		if (dc.substring(cbegin, vbegin) == cname) {
	        var vend = dc.indexOf (";", vbegin);
            if (vend == -1) vend = clen;
	            return unescape(dc.substring(vbegin, vend));
            }
            cbegin = dc.indexOf(" ", cbegin) + 1;
            if (cbegin== 0) break;
        }
        return null;
}
function cleanup() {
	document.searchForm.query.value="";
}
//]]>
//* *** End localization.js *** *
//*** ************************************************************************ ***




//*** ************************************************************************ ***
//* *** Combined from mainSupport_PR.js *** *
searchFormOptions = function() {
	
			jQuery('#searchOptions').bind('click', function (event) {
                  	jQuery('#search_options_container').slideToggle('slow', function() {
    					// Animation complete.
 				 	});
            });
			
			
			setSearchTerm = function(term) {
  				var whatSearched = term;	
				//alert(whatSearched);			
				jQuery('#selectedSearch').val(whatSearched);
				
				switch(whatSearched) {
					case 'internet':
						jQuery("div#search_options_container ul#searchList li a#internet").addClass("setSearchText");
						jQuery("#uverse").removeClass("setSearchText");
						jQuery("#digital").removeClass("setSearchText");
						jQuery("#phone").removeClass("setSearchText");
						break;
					case 'uverse':
						jQuery("#uverse").addClass("setSearchText");
						jQuery("#internet").removeClass("setSearchText");
						jQuery("#digital").removeClass("setSearchText");
						jQuery("#phone").removeClass("setSearchText");
						break;
					case 'digital':
						jQuery("#digital").addClass("setSearchText");
						jQuery("#internet").removeClass("setSearchText");
						jQuery("#uverse").removeClass("setSearchText");
						jQuery("#phone").removeClass("setSearchText");
						break;
					default:
						jQuery("#phone").addClass("setSearchText");
						jQuery("#internet").removeClass("setSearchText");
						jQuery("#uverse").removeClass("setSearchText");
						jQuery("#digital").removeClass("setSearchText");
						break;
				}
				
				jQuery("#search_options_container").hide("slow");
			};
			
			jQuery('#askInput').focus(function() {
				var searchValue = jQuery('#askInput').val();
  				if (searchValue=='Find support articles') {
					jQuery('#askInput').val("");
				}
			});
			
			jQuery('#askInput').blur(function() {
				var searchValue = jQuery('#askInput').val();
  				if (searchValue=='') {
					jQuery('#askInput').val("Find support articles");
				}
			});
}

initializeBreadcrumbs = function() {
	showTips = function() {
		jQuery('.tips-container').fadeIn('slow');
	}
	hideTips = function() {
		jQuery('.tips-container').fadeOut('slow');
	}
}

initializeInterstitialWide = function() {
	jQuery('#settings').bind('click', function (event) {
		jQuery('#settings').addClass('active outline');
		jQuery('#services').removeClass('active ');
		
		jQuery('#settingsContentDiv').show();
		jQuery('#serviceContentDiv').hide();
		jQuery('#requiredFieldsDiv').show();
	});
	
	jQuery('#services').bind('click', function (event) {
		jQuery('#services').addClass('active outline');
		jQuery('#settings').removeClass('active ');
		
		jQuery('#serviceContentDiv').show();
		jQuery('#settingsContentDiv').hide();
		jQuery('#requiredFieldsDiv').show();
	});	
}

/** BEGIN: eSupport Landing Page Functions **/

jQuery(function($){
	if($('.moreSupportLink').length != 0) $.fn.hoverSlider();
});


/* BEGIN FUNCTIONS */
(function($){
	$.fn.hoverSlider = function(){
		$('.moreSupportLink').each(function(){
			$(this).hoverIntent({over:hoverSlideOVER, timeout:300, out:hoverSlideOUT});
		});		
		$('.moreSupportLink li a').each(function(){
			$(this).focus(function(){
				$(this).next().slideToggle(400);
				$('a:first', $(this).next()).focus();
			});
		});
		$('.supportLinkContainer a').each(function(){
			$(this).focus(function(){
				$('.moreSupportLink li > div').slideUp(400);
			});
		});
		$(document).keydown(function(event){
			if(event.keyCode == "27"){
				jQuery(".moreSupportLink li > div").slideUp(400);
			}
		});
	};
			
})(jQuery);

/* Need for HOVERSLIDE */
function hoverSlideOVER(){
	jQuery("#" + jQuery(this).attr('rel')).slideDown(400);
}
function hoverSlideOUT(){
	jQuery("#" + jQuery(this).attr('rel')).slideUp(400);
}


/* HOVER SLIDE */
function hoverSlide(){
	jQuery(".moreSupportLink").each(function(){
		jQuery(this).mouseenter(function(){
			jQuery(".moreSupportLink li > div").slideUp(400);
			jQuery("#" + jQuery(this).attr('rel')).slideDown(400);
		});
		jQuery(this).mouseleave(function(){
			jQuery(".moreSupportLink li > div").slideUp(400);
		});
	});
	jQuery(".moreSupportLink li a").each(function(){
		jQuery(this).focus(function(){
			jQuery(this).parent().parent().mouseenter();
		});			
	});
}

/** END: eSupport Landing Page Functions **/
//* *** End mainSupport_PR.js *** *
//*** ************************************************************************ ***



//*** ************************************************************************ ***
//* *** curvycorners.js *** *
	//  *** Removed curvycorners.js as same function is in global.js (PROD12-1582) ***
//function browserdetect(){var A=navigator.userAgent.toLowerCase();this.isIE=A.indexOf("msie")>-1;this.ieVer=this.isIE?/msie\s(\d\.\d)/.exec(A)[1]:0;this.isMoz=A.indexOf("firefox")!=-1;this.isSafari=A.indexOf("safari")!=-1;this.quirksMode=this.isIE&&(!document.compatMode||document.compatMode.indexOf("BackCompat")>-1);this.isOp="opera" in window;this.isWebKit=A.indexOf("webkit")!=-1;if(this.isIE){this.get_style=function(D,F){if(!(F in D.currentStyle)){return""}var C=/^([\d.]+)(\w*)/.exec(D.currentStyle[F]);if(!C){return D.currentStyle[F]}if(C[1]==0){return"0"}if(C[2]&&C[2]!=="px"){var B=D.style.left;var E=D.runtimeStyle.left;D.runtimeStyle.left=D.currentStyle.left;D.style.left=C[1]+C[2];C[0]=D.style.pixelLeft;D.style.left=B;D.runtimeStyle.left=E}return C[0]}}else{this.get_style=function(B,C){C=C.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase();return document.defaultView.getComputedStyle(B,"").getPropertyValue(C)}}}var curvyBrowser=new browserdetect;if(curvyBrowser.isIE){try{document.execCommand("BackgroundImageCache",false,true)}catch(e){}}function curvyCnrSpec(A){this.selectorText=A;this.tlR=this.trR=this.blR=this.brR=0;this.tlu=this.tru=this.blu=this.bru="";this.antiAlias=true}curvyCnrSpec.prototype.setcorner=function(B,C,A,D){if(!B){this.tlR=this.trR=this.blR=this.brR=parseInt(A);this.tlu=this.tru=this.blu=this.bru=D}else{propname=B.charAt(0)+C.charAt(0);this[propname+"R"]=parseInt(A);this[propname+"u"]=D}};curvyCnrSpec.prototype.get=function(D){if(/^(t|b)(l|r)(R|u)$/.test(D)){return this[D]}if(/^(t|b)(l|r)Ru$/.test(D)){var C=D.charAt(0)+D.charAt(1);return this[C+"R"]+this[C+"u"]}if(/^(t|b)Ru?$/.test(D)){var B=D.charAt(0);B+=this[B+"lR"]>this[B+"rR"]?"l":"r";var A=this[B+"R"];if(D.length===3&&D.charAt(2)==="u"){A+=this[B="u"]}return A}throw new Error("Don't recognize property "+D)};curvyCnrSpec.prototype.radiusdiff=function(A){if(A!=="t"&&A!=="b"){throw new Error("Param must be 't' or 'b'")}return Math.abs(this[A+"lR"]-this[A+"rR"])};curvyCnrSpec.prototype.setfrom=function(A){this.tlu=this.tru=this.blu=this.bru="px";if("tl" in A){this.tlR=A.tl.radius}if("tr" in A){this.trR=A.tr.radius}if("bl" in A){this.blR=A.bl.radius}if("br" in A){this.brR=A.br.radius}if("antiAlias" in A){this.antiAlias=A.antiAlias}};curvyCnrSpec.prototype.cloneOn=function(G){var E=["tl","tr","bl","br"];var H=0;var C,A;for(C in E){if(!isNaN(C)){A=this[E[C]+"u"];if(A!==""&&A!=="px"){H=new curvyCnrSpec;break}}}if(!H){H=this}else{var B,D,F=curvyBrowser.get_style(G,"left");for(C in E){if(!isNaN(C)){B=E[C];A=this[B+"u"];D=this[B+"R"];if(A!=="px"){var F=G.style.left;G.style.left=D+A;D=G.style.pixelLeft;G.style.left=F}H[B+"R"]=D;H[B+"u"]="px"}}G.style.left=F}return H};curvyCnrSpec.prototype.radiusSum=function(A){if(A!=="t"&&A!=="b"){throw new Error("Param must be 't' or 'b'")}return this[A+"lR"]+this[A+"rR"]};curvyCnrSpec.prototype.radiusCount=function(A){var B=0;if(this[A+"lR"]){++B}if(this[A+"rR"]){++B}return B};curvyCnrSpec.prototype.cornerNames=function(){var A=[];if(this.tlR){A.push("tl")}if(this.trR){A.push("tr")}if(this.blR){A.push("bl")}if(this.brR){A.push("br")}return A};function operasheet(C){var A=document.styleSheets.item(C).ownerNode.text;A=A.replace(/\/\*(\n|\r|.)*?\*\//g,"");var D=new RegExp("^s*([\\w.#][-\\w.#, ]+)[\\n\\s]*\\{([^}]+border-((top|bottom)-(left|right)-)?radius[^}]*)\\}","mg");var G;this.rules=[];while((G=D.exec(A))!==null){var F=new RegExp("(..)border-((top|bottom)-(left|right)-)?radius:\\s*([\\d.]+)(in|em|px|ex|pt)","g");var E,B=new curvyCnrSpec(G[1]);while((E=F.exec(G[2]))!==null){if(E[1]!=="z-"){B.setcorner(E[3],E[4],E[5],E[6])}}this.rules.push(B)}}operasheet.contains_border_radius=function(A){return/border-((top|bottom)-(left|right)-)?radius/.test(document.styleSheets.item(A).ownerNode.text)};function curvyCorners(){var G,D,E,B,J;if(typeof arguments[0]!=="object"){throw curvyCorners.newError("First parameter of curvyCorners() must be an object.")}if(arguments[0] instanceof curvyCnrSpec){B=arguments[0];if(!B.selectorText&&typeof arguments[1]==="string"){B.selectorText=arguments[1]}}else{if(typeof arguments[1]!=="object"&&typeof arguments[1]!=="string"){throw curvyCorners.newError("Second parameter of curvyCorners() must be an object or a class name.")}D=arguments[1];if(typeof D!=="string"){D=""}if(D!==""&&D.charAt(0)!=="."&&"autoPad" in arguments[0]){D="."+D}B=new curvyCnrSpec(D);B.setfrom(arguments[0])}if(B.selectorText){J=0;var I=B.selectorText.replace(/\s+$/,"").split(/,\s*/);E=new Array;function A(M){var L=M.split("#");return(L.length===2?"#":"")+L.pop()}for(G=0;G<I.length;++G){var K=A(I[G]);var H=K.split(" ");switch(K.charAt(0)){case"#":D=H.length===1?K:H[0];D=document.getElementById(D.substr(1));if(D===null){curvyCorners.alert("No object with ID "+K+" exists yet.\nCall curvyCorners(settings, obj) when it is created.")}else{if(H.length===1){E.push(D)}else{E=E.concat(curvyCorners.getElementsByClass(H[1],D))}}break;default:if(H.length===1){E=E.concat(curvyCorners.getElementsByClass(K))}else{var C=curvyCorners.getElementsByClass(H[0]);for(D=0;D<C.length;++D){E=E.concat(curvyCorners.getElementsByClass(H[1],C))}}}}}else{J=1;E=arguments}for(G=J,D=E.length;G<D;++G){if(E[G]&&(!("IEborderRadius" in E[G].style)||E[G].style.IEborderRadius!="set")){if(E[G].className&&E[G].className.indexOf("curvyRedraw")!==-1){if(typeof curvyCorners.redrawList==="undefined"){curvyCorners.redrawList=new Array}curvyCorners.redrawList.push({node:E[G],spec:B,copy:E[G].cloneNode(false)})}E[G].style.IEborderRadius="set";var F=new curvyObject(B,E[G]);F.applyCorners()}}}curvyCorners.prototype.applyCornersToAll=function(){curvyCorners.alert("This function is now redundant. Just call curvyCorners(). See documentation.")};curvyCorners.redraw=function(){if(!curvyBrowser.isOp&&!curvyBrowser.isIE){return}if(!curvyCorners.redrawList){throw curvyCorners.newError("curvyCorners.redraw() has nothing to redraw.")}var E=curvyCorners.bock_redraw;curvyCorners.block_redraw=true;for(var A in curvyCorners.redrawList){if(isNaN(A)){continue}var D=curvyCorners.redrawList[A];if(!D.node.clientWidth){continue}var B=D.copy.cloneNode(false);for(var C=D.node.firstChild;C!=null;C=C.nextSibling){if(C.className==="autoPadDiv"){break}}if(!C){curvyCorners.alert("Couldn't find autoPad DIV");break}D.node.parentNode.replaceChild(B,D.node);while(C.firstChild){B.appendChild(C.removeChild(C.firstChild))}D=new curvyObject(D.spec,D.node=B);D.applyCorners()}curvyCorners.block_redraw=E};curvyCorners.adjust=function(obj,prop,newval){if(curvyBrowser.isOp||curvyBrowser.isIE){if(!curvyCorners.redrawList){throw curvyCorners.newError("curvyCorners.adjust() has nothing to adjust.")}var i,j=curvyCorners.redrawList.length;for(i=0;i<j;++i){if(curvyCorners.redrawList[i].node===obj){break}}if(i===j){throw curvyCorners.newError("Object not redrawable")}obj=curvyCorners.redrawList[i].copy}if(prop.indexOf(".")===-1){obj[prop]=newval}else{eval("obj."+prop+"='"+newval+"'")}};curvyCorners.handleWinResize=function(){if(!curvyCorners.block_redraw){curvyCorners.redraw()}};curvyCorners.setWinResize=function(A){curvyCorners.block_redraw=!A};curvyCorners.newError=function(A){return new Error("curvyCorners Error:\n"+A)};curvyCorners.alert=function(A){if(typeof curvyCornersVerbose==="undefined"||curvyCornersVerbose){alert(A)}};function curvyObject(){var U;this.box=arguments[1];this.settings=arguments[0];this.topContainer=this.bottomContainer=this.shell=U=null;var K=this.box.clientWidth;if(!K&&curvyBrowser.isIE){this.box.style.zoom=1;K=this.box.clientWidth}if(!K){if(!this.box.parentNode){throw this.newError("box has no parent!")}for(U=this.box;;U=U.parentNode){if(!U||U.tagName==="BODY"){this.applyCorners=function(){};curvyCorners.alert(this.errmsg("zero-width box with no accountable parent","warning"));return}if(U.style.display==="none"){break}}U.style.display="block";K=this.box.clientWidth}if(arguments[0] instanceof curvyCnrSpec){this.spec=arguments[0].cloneOn(this.box)}else{this.spec=new curvyCnrSpec("");this.spec.setfrom(this.settings)}var b=curvyBrowser.get_style(this.box,"borderTopWidth");var J=curvyBrowser.get_style(this.box,"borderBottomWidth");var D=curvyBrowser.get_style(this.box,"borderLeftWidth");var B=curvyBrowser.get_style(this.box,"borderRightWidth");var I=curvyBrowser.get_style(this.box,"borderTopColor");var G=curvyBrowser.get_style(this.box,"borderBottomColor");var A=curvyBrowser.get_style(this.box,"borderLeftColor");var E=curvyBrowser.get_style(this.box,"backgroundColor");var C=curvyBrowser.get_style(this.box,"backgroundImage");var Y=curvyBrowser.get_style(this.box,"backgroundRepeat");if(this.box.currentStyle&&this.box.currentStyle.backgroundPositionX){var R=curvyBrowser.get_style(this.box,"backgroundPositionX");var P=curvyBrowser.get_style(this.box,"backgroundPositionY")}else{var R=curvyBrowser.get_style(this.box,"backgroundPosition");R=R.split(" ");var P=R[1];R=R[0]}var O=curvyBrowser.get_style(this.box,"position");var Z=curvyBrowser.get_style(this.box,"paddingTop");var c=curvyBrowser.get_style(this.box,"paddingBottom");var Q=curvyBrowser.get_style(this.box,"paddingLeft");var a=curvyBrowser.get_style(this.box,"paddingRight");var S=curvyBrowser.get_style(this.box,"border");filter=curvyBrowser.ieVer>7?curvyBrowser.get_style(this.box,"filter"):null;var H=this.spec.get("tR");var M=this.spec.get("bR");var W=function(f){if(typeof f==="number"){return f}if(typeof f!=="string"){throw new Error("unexpected styleToNPx type "+typeof f)}var d=/^[-\d.]([a-z]+)$/.exec(f);if(d&&d[1]!="px"){throw new Error("Unexpected unit "+d[1])}if(isNaN(f=parseInt(f))){f=0}return f};var T=function(d){return d<=0?"0":d+"px"};try{this.borderWidth=W(b);this.borderWidthB=W(J);this.borderWidthL=W(D);this.borderWidthR=W(B);this.boxColour=curvyObject.format_colour(E);this.topPadding=W(Z);this.bottomPadding=W(c);this.leftPadding=W(Q);this.rightPadding=W(a);this.boxWidth=K;this.boxHeight=this.box.clientHeight;this.borderColour=curvyObject.format_colour(I);this.borderColourB=curvyObject.format_colour(G);this.borderColourL=curvyObject.format_colour(A);this.borderString=this.borderWidth+"px solid "+this.borderColour;this.borderStringB=this.borderWidthB+"px solid "+this.borderColourB;this.backgroundImage=((C!="none")?C:"");this.backgroundRepeat=Y}catch(X){throw this.newError("getMessage" in X?X.getMessage():X.message)}var F=this.boxHeight;var V=K;if(curvyBrowser.isOp){R=W(R);P=W(P);if(R){var N=V+this.borderWidthL+this.borderWidthR;if(R>N){R=N}R=(N/R*100)+"%"}if(P){var N=F+this.borderWidth+this.borderWidthB;if(P>N){P=N}P=(N/P*100)+"%"}}if(curvyBrowser.quirksMode){}else{this.boxWidth-=this.leftPadding+this.rightPadding;this.boxHeight-=this.topPadding+this.bottomPadding}this.contentContainer=document.createElement("div");if(filter){this.contentContainer.style.filter=filter}while(this.box.firstChild){this.contentContainer.appendChild(this.box.removeChild(this.box.firstChild))}if(O!="absolute"){this.box.style.position="relative"}this.box.style.padding="0";this.box.style.border=this.box.style.backgroundImage="none";this.box.style.backgroundColor="transparent";this.box.style.width=(V+this.borderWidthL+this.borderWidthR)+"px";this.box.style.height=(F+this.borderWidth+this.borderWidthB)+"px";var L=document.createElement("div");L.className="noprint";L.style.position="absolute";if(filter){L.style.filter=filter}if(curvyBrowser.quirksMode){L.style.width=(V+this.borderWidthL+this.borderWidthR)+"px"}else{L.style.width=V+"px"}L.style.height=T(F+this.borderWidth+this.borderWidthB-H-M);L.style.padding="0";L.style.top=H+"px";L.style.left="0";if(this.borderWidthL){L.style.borderLeft=this.borderWidthL+"px solid "+this.borderColourL}if(this.borderWidth&&!H){L.style.borderTop=this.borderWidth+"px solid "+this.borderColour}if(this.borderWidthR){L.style.borderRight=this.borderWidthR+"px solid "+this.borderColourL}if(this.borderWidthB&&!M){L.style.borderBottom=this.borderWidthB+"px solid "+this.borderColourB}L.style.backgroundColor=E;L.style.backgroundImage=this.backgroundImage;L.style.backgroundRepeat=this.backgroundRepeat;this.shell=this.box.appendChild(L);K=curvyBrowser.get_style(this.shell,"width");if(K===""||K==="auto"||K.indexOf("%")!==-1){throw this.newError("Shell width is "+K)}this.boxWidth=(K!=""&&K!="auto"&&K.indexOf("%")==-1)?parseInt(K):this.shell.clientWidth;this.applyCorners=function(){if(this.backgroundObject){var w=function(AO,i,t){if(AO===0){return 0}var k;if(AO==="right"||AO==="bottom"){return t-i}if(AO==="center"){return(t-i)/2}if(AO.indexOf("%")>0){return(t-i)*100/parseInt(AO)}return W(AO)};this.backgroundPosX=w(R,this.backgroundObject.width,V);this.backgroundPosY=w(P,this.backgroundObject.height,F)}else{if(this.backgroundImage){this.backgroundPosX=W(R);this.backgroundPosY=W(P)}}if(H){v=document.createElement("div");v.className="noprint";v.style.width=this.boxWidth+"px";v.style.fontSize="1px";v.style.overflow="hidden";v.style.position="absolute";v.style.paddingLeft=this.borderWidth+"px";v.style.paddingRight=this.borderWidth+"px";v.style.height=H+"px";v.style.top=-H+"px";v.style.left=-this.borderWidthL+"px";this.topContainer=this.shell.appendChild(v)}if(M){var v=document.createElement("div");v.className="noprint";v.style.width=this.boxWidth+"px";v.style.fontSize="1px";v.style.overflow="hidden";v.style.position="absolute";v.style.paddingLeft=this.borderWidthB+"px";v.style.paddingRight=this.borderWidthB+"px";v.style.height=M+"px";v.style.bottom=-M+"px";v.style.left=-this.borderWidthL+"px";this.bottomContainer=this.shell.appendChild(v)}var AG=this.spec.cornerNames();for(var AK in AG){if(!isNaN(AK)){var AC=AG[AK];var AD=this.spec[AC+"R"];var AE,AH,j,AF;if(AC=="tr"||AC=="tl"){AE=this.borderWidth;AH=this.borderColour;AF=this.borderWidth}else{AE=this.borderWidthB;AH=this.borderColourB;AF=this.borderWidthB}j=AD-AF;var u=document.createElement("div");u.className="noprint";u.style.height=this.spec.get(AC+"Ru");u.style.width=this.spec.get(AC+"Ru");u.style.position="absolute";u.style.fontSize="1px";u.style.overflow="hidden";var r,q,p;var n=filter?parseInt(/alpha\(opacity.(\d+)\)/.exec(filter)[1]):100;for(r=0;r<AD;++r){var m=(r+1>=j)?-1:Math.floor(Math.sqrt(Math.pow(j,2)-Math.pow(r+1,2)))-1;if(j!=AD){var h=(r>=j)?-1:Math.ceil(Math.sqrt(Math.pow(j,2)-Math.pow(r,2)));var f=(r+1>=AD)?-1:Math.floor(Math.sqrt(Math.pow(AD,2)-Math.pow((r+1),2)))-1}var d=(r>=AD)?-1:Math.ceil(Math.sqrt(Math.pow(AD,2)-Math.pow(r,2)));if(m>-1){this.drawPixel(r,0,this.boxColour,n,(m+1),u,true,AD)}if(j!=AD){if(this.spec.antiAlias){for(q=m+1;q<h;++q){if(this.backgroundImage!=""){var g=curvyObject.pixelFraction(r,q,j)*100;this.drawPixel(r,q,AH,n,1,u,g>=30,AD)}else{if(this.boxColour!=="transparent"){var AB=curvyObject.BlendColour(this.boxColour,AH,curvyObject.pixelFraction(r,q,j));this.drawPixel(r,q,AB,n,1,u,false,AD)}else{this.drawPixel(r,q,AH,n>>1,1,u,false,AD)}}}if(f>=h){if(h==-1){h=0}this.drawPixel(r,h,AH,n,(f-h+1),u,false,0)}p=AH;q=f}else{if(f>m){this.drawPixel(r,(m+1),AH,n,(f-m),u,false,0)}}}else{p=this.boxColour;q=m}if(this.spec.antiAlias){while(++q<d){this.drawPixel(r,q,p,(curvyObject.pixelFraction(r,q,AD)*n),1,u,AF<=0,AD)}}}for(var y=0,AJ=u.childNodes.length;y<AJ;++y){var s=u.childNodes[y];var AI=parseInt(s.style.top);var AM=parseInt(s.style.left);var AN=parseInt(s.style.height);if(AC=="tl"||AC=="bl"){s.style.left=(AD-AM-1)+"px"}if(AC=="tr"||AC=="tl"){s.style.top=(AD-AN-AI)+"px"}s.style.backgroundRepeat=this.backgroundRepeat;if(this.backgroundImage){switch(AC){case"tr":s.style.backgroundPosition=(this.backgroundPosX-this.borderWidthL+AD-V-AM)+"px "+(this.backgroundPosY+AN+AI+this.borderWidth-AD)+"px";break;case"tl":s.style.backgroundPosition=(this.backgroundPosX-AD+AM+this.borderWidthL)+"px "+(this.backgroundPosY-AD+AN+AI+this.borderWidth)+"px";break;case"bl":s.style.backgroundPosition=(this.backgroundPosX-AD+AM+1+this.borderWidthL)+"px "+(this.backgroundPosY-F-this.borderWidth+(curvyBrowser.quirksMode?AI:-AI)+AD)+"px";break;case"br":if(curvyBrowser.quirksMode){s.style.backgroundPosition=(this.backgroundPosX+this.borderWidthL-V+AD-AM)+"px "+(this.backgroundPosY-F-this.borderWidth+AI+AD)+"px"}else{s.style.backgroundPosition=(this.backgroundPosX-this.borderWidthL-V+AD-AM)+"px "+(this.backgroundPosY-F-this.borderWidth+AD-AI)+"px"}}}}switch(AC){case"tl":u.style.top=u.style.left="0";this.topContainer.appendChild(u);break;case"tr":u.style.top=u.style.right="0";this.topContainer.appendChild(u);break;case"bl":u.style.bottom=u.style.left="0";this.bottomContainer.appendChild(u);break;case"br":u.style.bottom=u.style.right="0";this.bottomContainer.appendChild(u)}}}var x={t:this.spec.radiusdiff("t"),b:this.spec.radiusdiff("b")};for(z in x){if(typeof z==="function"){continue}if(!this.spec.get(z+"R")){continue}if(x[z]){if(this.backgroundImage&&this.spec.radiusSum(z)!==x[z]){curvyCorners.alert(this.errmsg("Not supported: unequal non-zero top/bottom radii with background image"))}var AL=(this.spec[z+"lR"]<this.spec[z+"rR"])?z+"l":z+"r";var l=document.createElement("div");l.className="noprint";l.style.height=x[z]+"px";l.style.width=this.spec.get(AL+"Ru");l.style.position="absolute";l.style.fontSize="1px";l.style.overflow="hidden";l.style.backgroundColor=this.boxColour;switch(AL){case"tl":l.style.bottom=l.style.left="0";l.style.borderLeft=this.borderString;this.topContainer.appendChild(l);break;case"tr":l.style.bottom=l.style.right="0";l.style.borderRight=this.borderString;this.topContainer.appendChild(l);break;case"bl":l.style.top=l.style.left="0";l.style.borderLeft=this.borderStringB;this.bottomContainer.appendChild(l);break;case"br":l.style.top=l.style.right="0";l.style.borderRight=this.borderStringB;this.bottomContainer.appendChild(l)}}var o=document.createElement("div");o.className="noprint";if(filter){o.style.filter=filter}o.style.position="relative";o.style.fontSize="1px";o.style.overflow="hidden";o.style.width=this.fillerWidth(z);o.style.backgroundColor=this.boxColour;o.style.backgroundImage=this.backgroundImage;o.style.backgroundRepeat=this.backgroundRepeat;switch(z){case"t":if(this.topContainer){if(curvyBrowser.quirksMode){o.style.height=100+H+"px"}else{o.style.height=100+H-this.borderWidth+"px"}o.style.marginLeft=this.spec.tlR?(this.spec.tlR-this.borderWidthL)+"px":"0";o.style.borderTop=this.borderString;if(this.backgroundImage){var AA=this.spec.tlR?(this.backgroundPosX-(H-this.borderWidthL))+"px ":"0 ";o.style.backgroundPosition=AA+this.backgroundPosY+"px";this.shell.style.backgroundPosition=this.backgroundPosX+"px "+(this.backgroundPosY-H+this.borderWidthL)+"px"}this.topContainer.appendChild(o)}break;case"b":if(this.bottomContainer){if(curvyBrowser.quirksMode){o.style.height=M+"px"}else{o.style.height=M-this.borderWidthB+"px"}o.style.marginLeft=this.spec.blR?(this.spec.blR-this.borderWidthL)+"px":"0";o.style.borderBottom=this.borderStringB;if(this.backgroundImage){var AA=this.spec.blR?(this.backgroundPosX+this.borderWidthL-M)+"px ":this.backgroundPosX+"px ";o.style.backgroundPosition=AA+(this.backgroundPosY-F-this.borderWidth+M)+"px"}this.bottomContainer.appendChild(o)}}}this.contentContainer.style.position="absolute";this.contentContainer.className="autoPadDiv";this.contentContainer.style.left=this.borderWidthL+"px";this.contentContainer.style.paddingTop=this.topPadding+"px";this.contentContainer.style.top=this.borderWidth+"px";this.contentContainer.style.paddingLeft=this.leftPadding+"px";this.contentContainer.style.paddingRight=this.rightPadding+"px";z=V;if(!curvyBrowser.quirksMode){z-=this.leftPadding+this.rightPadding}this.contentContainer.style.width=z+"px";this.contentContainer.style.textAlign=curvyBrowser.get_style(this.box,"textAlign");this.box.style.textAlign="left";this.box.appendChild(this.contentContainer);if(U){U.style.display="none"}};if(this.backgroundImage){R=this.backgroundCheck(R);P=this.backgroundCheck(P);if(this.backgroundObject){this.backgroundObject.holdingElement=this;this.dispatch=this.applyCorners;this.applyCorners=function(){if(this.backgroundObject.complete){this.dispatch()}else{this.backgroundObject.onload=new Function("curvyObject.dispatch(this.holdingElement);")}}}}}curvyObject.prototype.backgroundCheck=function(B){if(B==="top"||B==="left"||parseInt(B)===0){return 0}if(!(/^[-\d.]+px$/.test(B))&&!this.backgroundObject){this.backgroundObject=new Image;var A=function(D){var C=/url\("?([^'"]+)"?\)/.exec(D);return(C?C[1]:D)};this.backgroundObject.src=A(this.backgroundImage)}return B};curvyObject.dispatch=function(A){if("dispatch" in A){A.dispatch()}else{throw A.newError("No dispatch function")}};curvyObject.prototype.drawPixel=function(J,G,A,F,H,I,C,E){var B=document.createElement("div");B.className="noprint";B.style.height=H+"px";B.style.width="1px";B.style.position="absolute";B.style.fontSize="1px";B.style.overflow="hidden";var D=this.spec.get("tR");B.style.backgroundColor=A;if(C&&this.backgroundImage!=""){B.style.backgroundImage=this.backgroundImage;B.style.backgroundPosition="-"+(this.boxWidth-(E-J)+this.borderWidth)+"px -"+((this.boxHeight+D+G)-this.borderWidth)+"px"}if(F!=100){curvyObject.setOpacity(B,F)}B.style.top=G+"px";B.style.left=J+"px";I.appendChild(B)};curvyObject.prototype.fillerWidth=function(A){var B=curvyBrowser.quirksMode?0:this.spec.radiusCount(A)*this.borderWidthL;return(this.boxWidth-this.spec.radiusSum(A)+B)+"px"};curvyObject.prototype.errmsg=function(C,D){var B="\ntag: "+this.box.tagName;if(this.box.id){B+="\nid: "+this.box.id}if(this.box.className){B+="\nclass: "+this.box.className}var A;if((A=this.box.parentNode)===null){B+="\n(box has no parent)"}else{B+="\nParent tag: "+A.tagName;if(A.id){B+="\nParent ID: "+A.id}if(A.className){B+="\nParent class: "+A.className}}if(D===undefined){D="warning"}return"curvyObject "+D+":\n"+C+B};curvyObject.prototype.newError=function(A){return new Error(this.errmsg(A,"exception"))};curvyObject.IntToHex=function(B){var A=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];return A[B>>>4]+""+A[B&15]};curvyObject.BlendColour=function(L,J,G){if(L==="transparent"||J==="transparent"){throw this.newError("Cannot blend with transparent")}if(L.charAt(0)!=="#"){L=curvyObject.format_colour(L)}if(J.charAt(0)!=="#"){J=curvyObject.format_colour(J)}var D=parseInt(L.substr(1,2),16);var K=parseInt(L.substr(3,2),16);var F=parseInt(L.substr(5,2),16);var C=parseInt(J.substr(1,2),16);var I=parseInt(J.substr(3,2),16);var E=parseInt(J.substr(5,2),16);if(G>1||G<0){G=1}var H=Math.round((D*G)+(C*(1-G)));if(H>255){H=255}if(H<0){H=0}var B=Math.round((K*G)+(I*(1-G)));if(B>255){B=255}if(B<0){B=0}var A=Math.round((F*G)+(E*(1-G)));if(A>255){A=255}if(A<0){A=0}return"#"+curvyObject.IntToHex(H)+curvyObject.IntToHex(B)+curvyObject.IntToHex(A)};curvyObject.pixelFraction=function(H,G,A){var J;var E=A*A;var B=new Array(2);var F=new Array(2);var I=0;var C="";var D=Math.sqrt(E-Math.pow(H,2));if(D>=G&&D<(G+1)){C="Left";B[I]=0;F[I]=D-G;++I}D=Math.sqrt(E-Math.pow(G+1,2));if(D>=H&&D<(H+1)){C+="Top";B[I]=D-H;F[I]=1;++I}D=Math.sqrt(E-Math.pow(H+1,2));if(D>=G&&D<(G+1)){C+="Right";B[I]=1;F[I]=D-G;++I}D=Math.sqrt(E-Math.pow(G,2));if(D>=H&&D<(H+1)){C+="Bottom";B[I]=D-H;F[I]=0}switch(C){case"LeftRight":J=Math.min(F[0],F[1])+((Math.max(F[0],F[1])-Math.min(F[0],F[1]))/2);break;case"TopRight":J=1-(((1-B[0])*(1-F[1]))/2);break;case"TopBottom":J=Math.min(B[0],B[1])+((Math.max(B[0],B[1])-Math.min(B[0],B[1]))/2);break;case"LeftBottom":J=F[0]*B[1]/2;break;default:J=1}return J};curvyObject.rgb2Array=function(A){var B=A.substring(4,A.indexOf(")"));return B.split(", ")};curvyObject.rgb2Hex=function(B){try{var C=curvyObject.rgb2Array(B);var G=parseInt(C[0]);var E=parseInt(C[1]);var A=parseInt(C[2]);var D="#"+curvyObject.IntToHex(G)+curvyObject.IntToHex(E)+curvyObject.IntToHex(A)}catch(F){var H="getMessage" in F?F.getMessage():F.message;throw new Error("Error ("+H+") converting RGB value to Hex in rgb2Hex")}return D};curvyObject.setOpacity=function(F,C){C=(C==100)?99.999:C;if(curvyBrowser.isSafari&&F.tagName!="IFRAME"){var B=curvyObject.rgb2Array(F.style.backgroundColor);var E=parseInt(B[0]);var D=parseInt(B[1]);var A=parseInt(B[2]);F.style.backgroundColor="rgba("+E+", "+D+", "+A+", "+C/100+")"}else{if(typeof F.style.opacity!=="undefined"){F.style.opacity=C/100}else{if(typeof F.style.MozOpacity!=="undefined"){F.style.MozOpacity=C/100}else{if(typeof F.style.filter!="undefined"){F.style.filter="alpha(opacity="+C+")"}else{if(typeof F.style.KHTMLOpacity!="undefined"){F.style.KHTMLOpacity=C/100}}}}}};function addEvent(D,C,B,A){if(D.addEventListener){D.addEventListener(C,B,A);return true}if(D.attachEvent){return D.attachEvent("on"+C,B)}D["on"+C]=B;return false}curvyObject.getComputedColour=function(E){var F=document.createElement("DIV");f.className="noprint";F.style.backgroundColor=E;document.body.appendChild(F);if(window.getComputedStyle){var D=document.defaultView.getComputedStyle(F,null).getPropertyValue("background-color");F.parentNode.removeChild(F);if(D.substr(0,3)==="rgb"){D=curvyObject.rgb2Hex(D)}return D}else{var A=document.body.createTextRange();A.moveToElementText(F);A.execCommand("ForeColor",false,E);var B=A.queryCommandValue("ForeColor");var C="rgb("+(B&255)+", "+((B&65280)>>8)+", "+((B&16711680)>>16)+")";F.parentNode.removeChild(F);A=null;return curvyObject.rgb2Hex(C)}};curvyObject.format_colour=function(A){if(A!=""&&A!="transparent"){if(A.substr(0,3)==="rgb"){A=curvyObject.rgb2Hex(A)}else{if(A.charAt(0)!=="#"){A=curvyObject.getComputedColour(A)}else{if(A.length===4){A="#"+A.charAt(1)+A.charAt(1)+A.charAt(2)+A.charAt(2)+A.charAt(3)+A.charAt(3)}}}}return A};curvyCorners.getElementsByClass=function(H,F){var E=new Array;if(F===undefined){F=document}H=H.split(".");var A="*";if(H.length===1){A=H[0];H=false}else{if(H[0]){A=H[0]}H=H[1]}var D,C,B;if(A.charAt(0)==="#"){C=document.getElementById(A.substr(1));if(C){E.push(C)}}else{C=F.getElementsByTagName(A);B=C.length;if(H){var G=new RegExp("(^|\\s)"+H+"(\\s|$)");for(D=0;D<B;++D){if(G.test(C[D].className)){E.push(C[D])}}}else{for(D=0;D<B;++D){E.push(C[D])}}}return E};if(curvyBrowser.isMoz||curvyBrowser.isWebKit){var curvyCornersNoAutoScan=true}else{curvyCorners.scanStyles=function(){function B(F){var G=/^[\d.]+(\w+)$/.exec(F);return G[1]}var E,D,C;if(curvyBrowser.isIE){function A(L){var J=L.style;if(curvyBrowser.ieVer>6){var H=J["-webkit-border-radius"]||0;var K=J["-webkit-border-top-right-radius"]||0;var F=J["-webkit-border-top-left-radius"]||0;var G=J["-webkit-border-bottom-right-radius"]||0;var M=J["-webkit-border-bottom-left-radius"]||0}else{var H=J["webkit-border-radius"]||0;var K=J["webkit-border-top-right-radius"]||0;var F=J["webkit-border-top-left-radius"]||0;var G=J["webkit-border-bottom-right-radius"]||0;var M=J["webkit-border-bottom-left-radius"]||0}if(H||F||K||G||M){var I=new curvyCnrSpec(L.selectorText);if(H){I.setcorner(null,null,parseInt(H),B(H))}else{if(K){I.setcorner("t","r",parseInt(K),B(K))}if(F){I.setcorner("t","l",parseInt(F),B(F))}if(M){I.setcorner("b","l",parseInt(M),B(M))}if(G){I.setcorner("b","r",parseInt(G),B(G))}}curvyCorners(I)}}for(E=0;E<document.styleSheets.length;++E){if(document.styleSheets[E].imports){for(D=0;D<document.styleSheets[E].imports.length;++D){for(C=0;C<document.styleSheets[E].imports[D].rules.length;++C){A(document.styleSheets[E].imports[D].rules[C])}}}for(D=0;D<document.styleSheets[E].rules.length;++D){A(document.styleSheets[E].rules[D])}}}else{if(curvyBrowser.isOp){for(E=0;E<document.styleSheets.length;++E){if(operasheet.contains_border_radius(E)){C=new operasheet(E);for(D in C.rules){if(!isNaN(D)){curvyCorners(C.rules[D])}}}}}else{curvyCorners.alert("Scanstyles does nothing in Webkit/Firefox")}}};curvyCorners.init=function(){if(arguments.callee.done){return}arguments.callee.done=true;if(curvyBrowser.isWebKit&&curvyCorners.init.timer){clearInterval(curvyCorners.init.timer);curvyCorners.init.timer=null}curvyCorners.scanStyles()}}if(typeof curvyCornersNoAutoScan==="undefined"||curvyCornersNoAutoScan===false){if(curvyBrowser.isOp){document.addEventListener("DOMContentLoaded",curvyCorners.init,false)}else{addEvent(window,"load",curvyCorners.init,false)}};
//*** End curvycorners.js ***


//*** ************************************************************************ ***
//* *** Combined from localization-model.js *** *
function validateZip(_id){
	var zip=document.getElementById(_id).value;
	var idReg2 = "[0-9][0-9][0-9][0-9][0-9]"; 
	zip = trim(zip);
/*
	if (zip.length == 0) {
		errMsg="Your ZIP code is required to provide information on services available in your area. Please enter your 5-digit ZIP code.";
		return showError(errMsg);
	}
	else if (zip.length < 5) {
		errMsg="The ZIP code you entered is incomplete. Please re-enter your 5-digit ZIP code.";
		return showError(errMsg);
	} else if (!zip.match(idReg2)) {
		errMsg="The ZIP code you entered contains non-numeric characters. Please re-enter your 5-digit ZIP code.";
		return showError(errMsg);
	}
	else if ( !zip.match(idReg2) || zip.length < 5 || Number(zip)=="0" ) {
		errMsg="Please enter a valid ZIP code (5 digits)";
		return showError(errMsg);
	}
*/	
	if (zip.length == 0 || zip.length < 5 || !zip.match(idReg2) || Number(zip)=="0" ) {
		errMsg="Please verify that the ZIP Code you entered is a 5-digit number.";		
		return showError(errMsg,zip);
	}
	else{
		return true;
	}
}
function LTrim(value) {
	var re = /\s*((\S+\s*)*)/;
	return value.replace(re, "$1");
}
function RTrim(value) {
	var re = /((\s*\S+)*)\s*/;
	return value.replace(re, "$1");
}
function trim(value) {
	return LTrim(RTrim(value));
} 
function setWTParams(_zipCode,_status,_statusMsg){
	if(_zipCode=='')
		_zipCode=jQuery("#zipCode").val();
	dcsMultiTrack('DCSext.wtZipCode',_zipCode,'DCSext.wtEvent','Zip_Code_Submit', 'DCSext.wtSuccessFlag' ,_status,'DCSext.wtStatusMsg',_statusMsg,'DCSext.wtPN' ,'ZipCode Entry Modal Pg');
}
function setWTDefaultParams(winURL,reqURI){
	dcsMultiTrack('DCS.dcssip','www.att.com','DCS.dcsuri',reqURI,'DCS.dcsref',winURL,'DCSext.wtPN' ,'ZipCode Entry Modal Pg');
}
function showError(msg){
jQuery("label#zipLabel").addClass("acctTypeTextError");
//jQuery(window).resize();
jQuery("#zipCode").css("border", "1px solid red");
jQuery("#clientErrDiv").html(msg);
jQuery("#nyroModalWrapper").height(370);
jQuery("#nyroModalContent").height(370);
jQuery("div.full").show();
var zip=jQuery("#zipCode").val();
jQuery("#zipCode").val('');
setWTParams(zip,0,'UNSUCCESSFUL');
return false;
}
function getFocus(status){	
	if(jQuery("#serverErrDiv").attr("statusCode")=="true")	
	{	
		jQuery("label#zipLabel").removeClass("acctTypeTextError");
		jQuery(this).css("border", "1px solid #ccc");
		jQuery("div.full").hide();
		jQuery(window).resize(); 
	}
}
function isNumberKey(evt)
{try{
   var charCode = (evt.which) ? evt.which : event.keyCode
   if (charCode > 31 && (charCode < 48 || charCode > 57))
      return false;
   if(charCode==13)
	{
	try{		
		jQuery('#continue-button').click();
		return false;
	}catch(e){jQuery("#clientErrDiv").html('Error caught while calling submit'+e.message);}
   }
   else 
	return true;
}catch(e){ jQuery("#clientErrDiv").html('Error caught in numberKey'+e.message);};
}

//*** ************************************************************************ ***
//* *** End localization-model.js *** *


//*** ************************************************************************ ***
//* *** Combined from pageview.js *** *

function showPageView(pv_number) {
    jQuery('div.pv').hide();
    jQuery('div.pv'+pv_number).show();
}

function initPageViewLinks() {
	jQuery('a.showPageView').click(function() {
	    var href = jQuery(this).attr('href');
	    showPageView(href);
	    return false;
	});
}

jQuery(document).ready(function() {
	initPageViewLinks();
});

function getDcsParameters(destinationURI){
	
	var dcs_array = new Array(); 
	
	var dcsarry1 = destinationURI.split('/');	
	var dcsarry2 = destinationURI.split('?');	
	dcs_array[0]='';
	dcs_array[1]='';
	dcs_array[2]='';
	dcs_array[3]='';
	dcs_array[4]='';
	var URL = window.location.href;
	if(null!=destinationURI.match('http') || null!=destinationURI.match('https') || null!=destinationURI.match('//')){			
		dcs_array[0] = dcsarry1[2];	
		var indx =destinationURI.indexOf('/', 8);
		var dcsuritemp = destinationURI.substr(indx);
		var indx1 =destinationURI.indexOf('?');
		
				if(indx1 != -1){
					dcs_array[3] = destinationURI.substring(indx,indx1);		
					
				}else{
					dcs_array[3]= dcsuritemp;
				}				
	}else{
		dcs_array[0] = 'www.att.com';	
		var indx1 =destinationURI.indexOf('?');
		if(indx1 != -1){
			//var urlarry = destinationURI.split('?');
			dcs_array[3]= destinationURI.substring(0,indx1);
		}else{
			dcs_array[3]= destinationURI;
		}		
	}
	if(null!=dcsarry2[1]){
		dcs_array[1] = dcsarry2[1];
	}
	
	if(null!=destinationURI.match('cv=')){
		var inx = destinationURI.indexOf('cv=');
		var dcscvtemp = destinationURI.substr(inx);
		
		if(null!=dcscvtemp.match('&')){
			var cvcodearry = dcscvtemp.split('&');
			dcs_array[2] = cvcodearry[0];
		}else{
			dcs_array[2] = dcscvtemp;
		}
	}
	if(null!=URL.match('email.jsp')){
		dcs_array[4] = 'esupport_email_Pg';
	}else{
		dcs_array[4] = 'eSupportMain_Pg';
	}
	return dcs_array;
	
}
function knowledgeReporting(destinationURI, pageName, linkName) {  

    var dcs_array = getDcsParameters(destinationURI);  

     dcsMultiTrack('DCS.dcsref',window.location.href, 'DCS.dcssip',dcs_array[0], 'DCS.dcsuri',dcs_array[3],  'DCS.dcsqry',dcs_array[1],  'DCSext.wtUrlExt',dcs_array[2],  

      'DCSext.wtPN',pageName, 'DCSext.wtLinkName',linkName, 'DCSext.wtLinkLoc','Body', 'DCSext.wtStatusMsg','SUCCESS', 'DCSext.wtSuccessFlag','1', 'DCSext.wtSupMethod','ES', 'DCSext.wtNoHit','1');  

}  

//*** ************************************************************************ ***
//* *** End pageview.js *** *