if (typeof VSD === "undefined") {
	var VSD = {};
}
/*
 * VSD
 */
VSD.live = function(){
	VSD.Loader.live();
	if($("body").hasClass("checkout")){
		VSD.Selectmenu.live();
	}
	VSD.Forms.live();
	VSD.UI.live();
	VSD.Product.liveAltImage();
	// conditional redirect to checkout2 viewbag
	if(window.location.href.indexOf("commerce/viewBag") != -1 && getExperience("T10").indexOf("E") != -1){
		window.location.href = VSD.swww + VSD.commerce + "/viewbagaction";
	}
	// signout helper
	if( window.location.href.indexOf("logoff.vs") != -1 ) {
		$.ajax({
			type: 'GET',
			url: VSD.commerce+'/signin/logout',
			dataType: "json"
		});
	}
	// faceted fix
	if(window.location.hash == "#filtered" && getCookie('searchcriteria')!='' && $("body").hasClass("collection")){
		window.location.replace( window.location.pathname + getCookie('searchcriteria') );
		var date = new Date();
		date.setTime(date.getTime()+(1*24*60*60*1000));		
		document.cookie = "searchcriteria=; expires="+date.toGMTString()+"; path=/;domain="+cookie_domain+";";
	}	
};
VSD.init = function(){

	cacheDom.init();
	if(!($body.hasClass("vsaa")||$body.hasClass("error-page"))){
		VSD.ABTesting.init();
	}
	if( !($("#sas-collection")[0] && VSD.Client.isIE8()) && !$body.hasClass("checkout") && !$body.hasClass("vsaa") ){
		VSD.Cufon.init();
	}
	VSD.Client.init();
	VSD.Certona.init();
	VSD.SuperSleight.init();
	if (VSD.Client.isTouch())
		VSD.Touch.init();
	VSD.Overlay.init();
	VSD.UI.init();
	VSD.HeaderFooter.init();
	if(!$body.hasClass("checkout")){
		VSD.Forms.init();
	} else {
		VSD.Forms.ieButtons();
	}
	if( $body.hasClass("view-recipient-wishlist") == true && getExperience("T10").indexOf("E") != -1){
		$("#atbform").attr("action", VSD.swww + "/commerce2/addtobag");
	}
	VSD.PopUpWindows.init();
	if (!$body.hasClass('vsaa') && !$body.hasClass('checkout')) {
		VSD.Transition.init();
	}
	VSD.Product.init();
	VSD.Product.ProductZoom.init();
	if(!($body.hasClass("vsaa")||$body.hasClass("error-page"))){
		VSD.ImgReplace.init();
	}
	if($body.hasClass("home")){
		VSD.Home.init();
	}
	if( $body.hasClass("account-login")){
		VSD.Login.init();
	}
	if( $("#vsImage")[0] || $("body").hasClass("opc") || $("body").hasClass("vsb") ){
		VSD.Product.Swatch.init();
	}
	if( $body.hasClass("account-welcome") ){
		VSD.Account.init();
	} else if( window.location.href.indexOf("updateAccount") != -1 || window.location.href.indexOf("registration")){
		i = true; // your account > billing information > initialize i
	}
	// secure page search helper
	if(window.location.href.indexOf("https")!=-1){
		$("#searchform").bind('submit', function(e){
			e.preventDefault();
			if('Search'!=$("#atomz_query").val() && ''!=$("#atomz_query").val()){
				document.location.href="http://search2.victoriassecret.com/?q=" + encodeURIComponent( $("#atomz_query").val() );
			}
			return false;
		});
	}
	if( window.location.href.indexOf("store-locator") != -1 ){
		StoreLocatorHelper();
	}
	// nav helper
	if(window.location.href.indexOf('sessionexpired') != -1){
		$("#nav a").each(function(){
			$(this).attr("href", $(this).attr("href").replace("https://secure", "http://www") );
		});
		$('#footer a, #content a').each(function(){
			$(this).attr('href', this.getAttribute('href').replace(VSD.swww, VSD.www))
		});
		$('#content a').attr('href', VSD.www);
		if (getExperience("T10").indexOf("E") != -1){
			$.ajax({
				type: 'GET',
				url: VSD.commerce+'/signin/sessionExpired',
				dataType: "json"
			});
		}	
	};
	// nav helper
	if(window.location.href.indexOf('error/') != -1 && window.location.href.indexOf('secure') != -1){
		$("#nav a").each(function(){
			$(this).attr("href", $(this).attr("href").replace("https://secure", "http://www") );
		});
		$('#footer a, #content a').each(function(){
			$(this).attr('href', this.getAttribute('href').replace(VSD.swww, VSD.www))
		});
		$('#content a').attr('href', VSD.www);
		$(".logo a").attr("href", VSD.www );
		$("#getEmail a").attr("href", $("#getEmail a").attr("href").replace("https://secure", "http://www") );
	};
	//for grids 12.2011 - link 'continue browsing' to grids search results page   \/\/\/\/\/\/
	//	save search url in cookie, replace 'continue browsing' on ATB w cookie value. clear value on click. 
	if($('#sas-collection').length>0 && $('form[name=SelectionForm]').length>0) {		
		// set cookie manually
		var date = new Date();
		date.setTime(date.getTime()+(1*24*60*60*1000));
		document.cookie = "from_search="+encodeURIComponent(window.location.search)+"; expires="+date.toGMTString()+"; path=/";
	}
	if($('body').hasClass('atb') && getCookie("searchcriteria")!="") {
		$('#atbButtons a[name="continue_browsing"]').attr('href',$('#atbButtons a[name="continue_browsing"]').attr('href') + decodeURIComponent(getCookie("searchcriteria")));		
			var date = new Date();
			date.setTime(date.getTime()+(1*24*60*60*1000));		
			document.cookie = "searchcriteria=; expires="+date.toGMTString()+"; path=/;domain="+cookie_domain+";";
		
	}
	if(window.location.href.indexOf('addToBag.vs')!=-1 && getCookie("searchcriteria")!=""){
		setTimeout(function(){
			$("#CS").attr("href", $('#CS').attr('href').split('?')[0] +'?'+ decodeURIComponent(getCookie("searchcriteria")));
		},500);
	}
	if($('body').hasClass('atb') && $('#atbGrids').length > 0 && getCookie("from_search")!="") {
		$('#atbButtons a[name="continue_browsing"]').attr('href',VSD.www + '/clearance/sas'+ decodeURIComponent(getCookie("from_search")));		
		$('#atbButtons a[name="continue_browsing"]').bind("click",function() {
			var date = new Date();
			date.setTime(date.getTime()+(1*24*60*60*1000));
			document.cookie = "from_search=; expires="+date.toGMTString()+"; path=/";
			});
		}		
	VSD.Video.init();
	
	VSD.CustomerService.init();
};
/*
 * VSD Constants
 */
VSD.www = location.host.indexOf("limited.com") != -1 ? "http://" + location.host : "http://www.victoriassecret.com";
VSD.swww = location.host.indexOf("limited.com") != -1 ? "https://" + location.host : "https://secure.victoriassecret.com";
VSD.commerce = "/commerce2";
VSD.environment = window.location.protocol + "//" + ( window.location.host.indexOf("developer") != -1 ? "vsdint04.limited.com" : window.location.host );
VSD.html = "/themes/base/candice/html/";
VSD.imgUrl = window.location.protocol.indexOf("s") >= 0 ? "https://secure-media.victoriassecret.com" : "http://media.victoriassecret.com";
function gotTime(result) { $(".content-inner","#overlay").append(result); }

/*
 * cacheDom
 */
var $body = $("body");
cacheDom = {
	init: function(){
		$body = $('body');
	}
}
/*
 * VSD.ImgReplace
 */
VSD.ImgReplace = (function(){	
	
	var init = function(){
	var nonTestItem=jQuery(".non-test-item");
	var bannerDataElement=jQuery(".shopping-bag-banner");
	var bannerImgElement="";
	if(bannerDataElement.length>0){	
		if(nonTestItem.length>0){	
			bannerDataElement.html(nonTestItem.html());
		}
		var bannerImgElement=jQuery("#shopBanner",bannerDataElement);			
	}	
	if(location.protocol=="https:"){
		jQuery("#bottomNavDashboard").attr("src",jQuery("#secure_banner_src").val());		
		if(jQuery("#offerFlag").val()=="true"&&bannerImgElement.length>0){					
			bannerImgElement.attr("src",jQuery("#shopping_secure_banner_src").val());		
		}		
			
	}
	else{
		jQuery("#bottomNavDashboard").attr("src",jQuery("#banner_src").val());
		if(jQuery("#offerFlag").val()=="true"&&bannerImgElement.length>0){												
			bannerImgElement.attr("src",jQuery("#shopping_banner_src").val());						
		}		
	}
	};
	var secure = function(url, replaceWWW){
		if(location.protocol == "https:"){
			if(replaceWWW){
				url = url.replace(/http:\/\/www.victoriassecret.com/g, VSD.swww);
			}
			return url.replace(/http:\/\/media.victoriassecret.com/g, VSD.imgUrl);
		} else {
			return url;
		}
	}
	return {
		"init": init,
		"secure": secure
	};
}());
/*
 * VSD.ABTesting
 */
VSD.ABTesting = (function(){
	var backgrounds = {};
	
	var init = function(){
		// handle test feature groups
		jQuery(".test-rollup").each(function(){
			if(this.id){
				var testRollup = jQuery(this);
				var idParts = this.id.split("_");
				var testDimension = idParts[2];
				var testVersion = getExperience(testDimension);
				var testItem = jQuery(".test-item-"+testVersion, testRollup);			
				
				var testFeatureMarkup = VSD.Util.getTestContent(testItem);				
				if(testFeatureMarkup){										
					testRollup.before(testFeatureMarkup);


				}				

			}
		});		
		
		// handle shopping bag banner test feature
		jQuery(".test-rollup-nav").each(function(){
			if(this.id){
				var testRollup = jQuery(this);
				var idParts = this.id.split("_");
				var testDimension = idParts[2];
				var testVersion = getExperience(testDimension);
				var testItem = jQuery(".test-item-"+testVersion, testRollup);			
				
				var testFeatureMarkup = VSD.Util.getTestContent(testItem);				
				if(testFeatureMarkup){										
					if(testFeatureMarkup.indexOf("shopping_banner_src")>-1){
						jQuery(".shopping-bag-banner").html(testFeatureMarkup);
					}
				}				

			}
		});
		jQuery(".pd-test-rollup").each(function(){

			if(this.id){
				var testRollup = jQuery(this);
				var idParts = this.id.split("_");
				var testDimension = idParts[2];

				var testVersion = getExperience(testDimension);

				var testItem = jQuery(".pd-test-item-"+testVersion, testRollup);			
				
				var testFeatureMarkup = VSD.Util.getSASTestContent(testItem);
				if(testFeatureMarkup){											
					testRollup.before(testFeatureMarkup);
					


				}	
					

			}
		});		
	
	
		// handle test features that are background images
		jQuery(".test-bg-rollup").each(function(){
			if(this.id){
				var testBgRollup = jQuery(this);
				var idParts = this.id.split("_");
				var featureId = idParts[1];
				var testDimension = idParts[2];
				
				if(backgrounds[featureId] && testDimension){
					var testVersion = getExperience(testDimension);
				
					// backgrounds[featureId] is an array of objects - one for each test feature
					for(var i=0; i < backgrounds[featureId].length; i+=1){
						var testBgFeature = backgrounds[featureId][i]
						
						if(testBgFeature.TestVersion == testVersion){
							if(testBgFeature.ImagePath){
								testBgRollup.css("background-image", "url(" + testBgFeature.ImagePath + ")");
								if(testBgFeature.Width){
									testBgRollup.width(testBgFeature.Width);	
								}
								if(testBgFeature.Height){
									testBgRollup.height(testBgFeature.Height);	
								}
							}
							break;
						}
					}
				}
			}
		});
	};
	
	var getTestval = function(filterObject){
		// testval is a comma-delimited string of all of the test dimensions being used
		var testval = "";
		jQuery(".test-rollup").each(function(){
			if(this.id){
				var idParts = this.id.split("_");
				var testDimension = idParts[2];
				if(!filterObject || (filterObject && filterObject[testDimension]!=false)){
					if(testval.indexOf(testDimension)==-1){
						testval += testDimension + ",";
					}
				}
			}
		});
		jQuery(".pd-test-rollup").each(function(){
			if(this.id){
				var idParts = this.id.split("_");
				var testDimension = idParts[2];
				if(!filterObject || (filterObject && filterObject[testDimension]!=false)){
					if(testval.indexOf(testDimension)==-1){
						testval += testDimension + ",";
					}
				}
			}
		});
		var bottomBannerDimension=jQuery("#bottom_banner_test_dim");
		if(bottomBannerDimension.length>0 && testval.indexOf(bottomBannerDimension.val())==-1){
			testval += bottomBannerDimension.val() + ",";
		}
		
		if( $("body").hasClass("checkout") ){
			testval += 'T10,';
		}
		
		return testval;
	};
	
	var getBannerTestval = function(filterObject){
		// testval is a comma-delimited string of all of the test dimensions being used
		var testval = "";
		jQuery(".test-rollup-nav").each(function(){			
			if(this.id){
				var idParts = this.id.split("_");
				var testDimension = idParts[2];							
				if(!filterObject || (filterObject && filterObject[testDimension]!=false)){
					if(testval.indexOf(testDimension)==-1){
						testval += testDimension + ",";
					}
				}
			}
		});
		
		return testval;
	};
	
	var getCMTestval = function(){
		// cmtestval is a comma-delimited string of all of the test dimensions being used, except for T1
		return getTestval({"T1": false});
	};
	
	var setCommerceHref = function(selector){
		if(VSD.ABTesting.is("commerce")) {
			$(selector).attr("href", VSD.swww + VSD.commerce + "/viewbagaction");
		}
	};
	
	var setCommerceAction = function(selector){
		if(VSD.ABTesting.is("commerce")){
			$(selector).attr("action", VSD.swww + VSD.commerce + "/addtobag")
		}
	}
	
	var is = function(test){
		if(test == "commerce"){
			return typeof getExperience == "function" ? (getExperience("T10").indexOf("E") != -1 || getExperience("T10").indexOf("G") != -1 || getExperience("T10").indexOf("F") != -1) : false;
		}
		if(test == "offerUncheckedVisible"){
			return typeof getExperience == "function" ? (getExperience("T10").indexOf("E") != -1) : false;
		}
		if(test == "offerCheckedVisible"){
			return typeof getExperience == "function" ? (getExperience("T10").indexOf("F") != -1) : false;
		}
		if(test == "offerCheckedHidden"){
			return typeof getExperience == "function" ? (getExperience("T10").indexOf("G") != -1) : false;
		}
		if(test == "clicktochat"){
			return typeof getExperience == "function" ? getExperience("T9").indexOf("B") != -1 : false;
		}
		// return undefined if test does not exist
		return undefined;
	}
	
	return {
		"backgrounds": backgrounds,
		"init": init,
		"getTestval": getTestval,
		"getBannerTestval": getBannerTestval,
		"getCMTestval": getCMTestval,
		"setCommerceHref": setCommerceHref,
		"setCommerceAction": setCommerceAction,
		"is": is
	};
}());
/*
 * VSD.Account
 */
VSD.Account = (function() {
	var init = function() {
		if(VSD.ABTesting.is("commerce")) {
			var nickname = "", bagLink, bagHref;

			$("a", ".shopping-bag").attr("href", VSD.swww + VSD.commerce + "/viewbagaction");
			
			// wrapped with each to happen only once
			// your account
			bagLink = $(".account.container .ui-callout:first");
			bagLink.attr("href", VSD.swww + VSD.commerce + "/viewbagaction");

			// set NAVBAR cookie
			$.getJSON(
				VSD.commerce + "/bagsummary",
				function(data, textStatus, xhr) {
					if(textStatus == "success") {
						var NavbarCookie = getVSCookie("NAVBAR");
						NavbarCookie = NavbarCookie.replace(/"/g,"");
						if(NavbarCookie != "") {
							if(NavbarCookie.lastIndexOf(",") != -1) {
								var item_count = NavbarCookie.substring(NavbarCookie.lastIndexOf(",") + 1, NavbarCookie.length);
							} if(!isNaN(item_count)) {
								nickname = NavbarCookie.substring(0, NavbarCookie.lastIndexOf(","));
							} else {
								nickname = NavbarCookie;
							}
						} else {
							nickname = NavbarCookie;
						}
						if (data.bagcount == "0"){	
							$('.shopping-bag em').html('');
						}
						else if (data.bagcount == "1"){
							$('.shopping-bag em').html(data.bagcount + ' Item');
						}
						else{
							$('.shopping-bag em').html(data.bagcount + ' Items');
						}
						setVSCookie('NAVBAR',nickname+","+data.bagcount);
					}
				}
			);
		}
	};
	var submitRegistration = function(){
		var newloc='/commerce/main/acctMenu.jsf?namespace=main&origin=myMain.jsp&event=link.yourAccount';
			$.ajax({
				type:"POST",
				data: $("#addressForm").serialize(),
				url: "/commerce/saveRegistrationInfo.vs?namespace=registration&origin=registration.jsp&event=save",
				complete: function(XMLHttpRequest, textStatus)
				{
				if(!XMLHttpRequest || XMLHttpRequest.getAllResponseHeaders().indexOf("newlocation") != -1) {
					newloc=XMLHttpRequest.getResponseHeader("newlocation");						
				}
					// re-submit the form if the account wasn't create -
					// to show errors
				if(!XMLHttpRequest || XMLHttpRequest.getAllResponseHeaders().indexOf("accountCreated") == -1){					
						document.forms["addressForm"].submit();
					}
					// sign in to commerce 
					else {
					$.ajax({
						type: 'POST',
						dataType: "json",
						url: VSD.commerce+'/signin/signin',
						data: {
							"loginModel.userName": $("#username").val(),
							"loginModel.password": $("#password").val()
						},
						error:function(jqXHR, textStatus, errorThrown){
						window.location.href = newloc;
						},
						success: function(data, textStatus, XMLHttpRequest){
						window.location.href = newloc;
						}
					});
					}
				}
			});
	};
	return {
		"init":init,
		"submitRegistration": submitRegistration
	}
}());
/*
 * VSD.Certona
 */
VSD.Certona = (function(){
	
	var init = function(){
		$(".sfr-h2", "#recommendations").addClass("large")
		VSD.Cufon.replaceAll("#recommendations");
	};
	
	return {
		"init": init
	};
}());
/*
 * VSD.Client
 */
VSD.Client = (function(){

	var init = function(){};
	var isFF = function(){
		return jQuery.browser.mozilla;
	};
	var isWebkit = function(){
		return jQuery.browser.webkit;
	};
	var isIE = function(){
		return jQuery.browser.msie;
	};
	var isIE6 = function(){
		return (jQuery.browser.msie && parseFloat(jQuery.browser.version) < 7);
	};
	var isIE7 = function(){
		return (jQuery.browser.msie && parseFloat(jQuery.browser.version) < 8);
	};
	var isIE8 = function(){
		return (jQuery.browser.msie && parseFloat(jQuery.browser.version) < 9);
	};
	var isIE9 = function(){
		return (jQuery.browser.msie && parseFloat(jQuery.browser.version) < 10);
	};
	var isTouch = function () {
		return VSD.Client.isIPhone() || VSD.Client.isIPad() || VSD.Client.isIPod() || VSD.Client.isAndroid(); 
	};
	var isIPod = function(){ 
		return navigator.userAgent.match(/iPod/i) !== null; 
	};	
	var isIPad = function(){ 
		return navigator.userAgent.match(/iPad/i) !== null; 
	};	
	var isIPhone = function(){ 
		return navigator.userAgent.match(/iPhone/i) !== null; 
	};
	var isIOS = function(){ 
		return VSD.Client.isIPhone() || VSD.Client.isIPad() || VSD.Client.isIPod(); 
	};
	var isOpera = function(){
		return $.browser.opera;
	};
	var iOSVersion = function() {
		var match = navigator.userAgent.match(/OS (\d+)_/i);
		if (match && match[1]) { 
			return match[1]; 
		}
	};
	var isAndroid = function(){ 
		return navigator.userAgent.match(/Android/i) !== null; 
	};
	var androidVersion = function() {
		var match = navigator.userAgent.match(/Android (\d+)\./i);
		if (match && match[1]) { 
			return match[1]; 
		}
	};
	var isBlackBerry = function(){ 
		return navigator.userAgent.match(/BlackBerry/i) !== null; 
	};
	var isSmallScreen = function() {
		if (screen.width < 481 || (window.devicePixelRatio > 1 && screen.width < 961)) {
			return true;
		} else {
			return false;
		}
	};
	var isFlash = function() {
		return(swfobject.hasFlashPlayerVersion("9.0"));
	};
	var isHTML5 = function () {
		return ((VSD.Client.isIE9() && !VSD.Client.isIE8()) || VSD.Client.isTouch() || VSD.Client.isWebkit() || VSD.Client.isFF() || VSD.Client.isOpera());
	};
	var isHTML5Video = function () {
		if (isSmallScreen() || (!isFlash() && !isIE8() && !isFF())) {
			return true;
		} else {
			return false;
		}
	};
	return {
		"init": init,
		"isFF": isFF,
		"isWebkit": isWebkit,
		"isIE": isIE,
		"isIE6": isIE6,
		"isIE7": isIE7,
		"isIE8": isIE8,
		"isIE9": isIE9,
		"isTouch": isTouch,
		"isIPod": isIPod,
		"isIPad": isIPad,
		"isIPhone": isIPhone,
		"isIOS": isIOS,
		"isOpera": isOpera,
		"iOSVersion": iOSVersion,
		"isAndroid": isAndroid,
		"androidVersion": androidVersion,
		"isBlackBerry":isBlackBerry,
		"isFlash": isFlash,
		"isHTML5": isHTML5,
		"isHTML5Video": isHTML5Video,
		"isSmallScreen": isSmallScreen
	};
}());
/*
 * VSD.Cufon
 */
VSD.Cufon = (function(){
	var config = {
		"xx-large": {"fontFamily": "Helvetica Neue LT Std Light"},
		"x-large": {"fontFamily": "Helvetica Neue LT Std Light"},
		"large": {"fontFamily": "Helvetica Neue LT Std Light"},
		"medium": {"fontFamily": "Helvetica Neue LT Std"},
		"small": {"fontFamily": "Helvetica Neue LT Std"},
		"x-small": {"fontFamily": "Helvetica LT Std"}
	};
	
	var pinkTextShadow = "1px 1px rgba(201,53,103, 1)"; 
	var blackTextShadow = "1px 1px rgba(0,0,0, 1)";
	var redTextShadow = "1px 1px rgba(108,12,23, 1)";
	
	var init = function(){
		if(VSD.Client.isIE7() && (!$body || $body.hasClass("opc"))) { return true }
		replaceNav();
		if(jQuery("#wrapper").length > 0){
			replaceAll("#wrapper");
		} else if(jQuery("#bodycontainer").length > 0){
			replaceAll("#bodycontainer");
		} else {
			replaceAll("#content");
		}
		replaceAll(null, {"small": {"textShadow": pinkTextShadow}}, ".btn-40:not(.btn-40-b)");
		replaceAll(null, {"x-small": {"textShadow": pinkTextShadow}}, ".btn-26:not(.btn-26-b)");
		doCufonNow();
	};
	
	var replaceNav = function(){
		var navTextShadow = pinkTextShadow;
		var nav = jQuery("#nav");
		var backgroundImage = nav.css("background-image");
		if(backgroundImage && (backgroundImage.indexOf("/black/") > 0)){
			navTextShadow = blackTextShadow;
		}
		else if(backgroundImage && (backgroundImage.indexOf("/red/") > 0)){
			navTextShadow = redTextShadow;
		}
		if(nav.css('visibility','hidden')){
			nav.css('visibility','visible');
		}
		replaceAll( "#nav", {"small": {"textShadow": navTextShadow}} ); 
        doCufonNow();
	};		
	 
	var replaceAll = function(prefix, configExtension, sibling){
		if(!configExtension){
			configExtension = {}
		}		
		var newConfig = jQuery.extend(true, {}, config, configExtension);

		for(className in newConfig){
			var selector = "." + className;
			if(prefix){
				selector = prefix + " " + selector;
			}
			if(sibling){
				selector += sibling;
			}
			//hover state for shadow text only for consistant mouseover cursor behavior
			if (newConfig[className]['textShadow']) {
				newConfig[className]['hover'] = {'textShadow':newConfig[className]['textShadow']};
			}
			Cufon.replace($(selector).addClass('cufon-replaced'), newConfig[className]);
		}
	};

	var replace = function(object){
		if (typeof object == "string") {
			object = $(object);
		}
		for (className in config) {
			if(object.hasClass(className) && !object.hasClass("cufon-replaced")){
				Cufon.replace(object.addClass('cufon-replaced'), config[className]);
			}
		}
	};
	
	var initOn = function(context){
		if(VSD.Client.isIE7() && (!$body || $body.hasClass("opc"))) { return true }
		replaceAll(context);
		replaceAll(context, {"small": {"textShadow": pinkTextShadow}}, ".btn-40:not(.btn-40-b)");
		replaceAll(context, {"x-small": {"textShadow": pinkTextShadow}}, ".btn-26:not(.btn-26-b)");
		doCufonNow();
	};
	
	var doCufonNow = function(){
		if( $body && !$body.hasClass("specialallnavs") && !$body.hasClass("specialtopbottom") && VSD.Client.isIE8() ){
		Cufon.now();
		}
	};
	
	return {
		"init": init,
		"replace": replace,
		"replaceAll": replaceAll,
		"initOn": initOn,
		"replaceNav": replaceNav
	};
	
}());
/*
 * VSD.CustomerService
 */
var spac_0;
VSD.CustomerService = (function(){
	var launchUrlBase = window.location.href.indexOf('victoriassecret.com') != -1 ? "http://victoriassecret.custhelp.com/app/chat/chat_launch" : "http://victoriassecrettst.custhelp.com/app/chat/chat_launch";
	var waitSeconds = 0;
	var init = function(){
		// coremetrics not click2chat
		if(!VSD.ABTesting.is('clicktochat')){
			if(window.location.href.indexOf('/orderStatus.vs')>0 || window.location.href.indexOf('/orderSummary.vs')>0 ){
				metricsPageViewDelegate("ORDERSTATUS: SUMMARY|T9A",null,"CUSTOMER SERVICES");
			} else if(window.location.href.indexOf('/acctMenu')>0 || window.location.href.indexOf('/commerce/logon.vs?event=login.event')>0){
				metricsPageViewDelegate("Your Account:Account Menu|T9A",null,"YOUR ACCOUNT");
			} else if(window.location.href.indexOf('/CustomerService/QuickHelp')>0) {
				metricsPageViewDelegate("CUSTOMER SERVICES: QUICK HELP|T9A",null,"CUSTOMER SERVICES");
			} else if(window.location.href.indexOf('/contact')>0) {
				metricsPageViewDelegate("CUSTOMER SERVICES: CONTACT US|T9A",null,"CUSTOMER SERVICES");
			}
		}
		// don't offer help 
		if( typeof getCookie != "function" ||
			getCookie("noChat") ||
			window.location.href.indexOf("espanol") >= 0 ||
			window.location.href.indexOf("mobile") >= 0 ||
			!VSD.ABTesting.is ( "clicktochat" ) ||
			(window.location.href.indexOf('/orderStatus.vs') == -1 &&
				window.location.href.indexOf('/orderSummary.vs') == -1 &&
				window.location.href.indexOf('/acctMenu') == -1 &&
				window.location.href.indexOf('/commerce/logon.vs?event=login.event') == -1 &&
				window.location.href.indexOf('/contact') == -1 &&
				window.location.href.indexOf('/CustomerService/QuickHelp') == -1
				)
		) { return true }
		// set wait time
		// coremetrics w/ cookie
		if(window.location.href.indexOf('/orderStatus.vs')>0 || window.location.href.indexOf('/orderSummary.vs')>0 ){
			metricsPageViewDelegate("ORDERSTATUS: SUMMARY|T9B",null,"CUSTOMER SERVICES");
			waitSeconds = 30;
		} else if(window.location.href.indexOf('/acctMenu')>0 || window.location.href.indexOf('/commerce/logon.vs?event=login.event')>0){
			metricsPageViewDelegate("Your Account:Account Menu|T9B",null,"YOUR ACCOUNT");
			waitSeconds = 20;
		} else if(window.location.href.indexOf('/CustomerService/QuickHelp')>0) {
			metricsPageViewDelegate("CUSTOMER SERVICES: QUICK HELP|T9B",null,"CUSTOMER SERVICES");
		} else if(window.location.href.indexOf('/contact')>0) {
			metricsPageViewDelegate("CUSTOMER SERVICES: CONTACT US|T9B",null,"CUSTOMER SERVICES");
		}
		
		getClick2Chat();
	}
	// get click2chat code
	var getClick2Chat = function(){
		$.getScript('//victoriassecret.widget.custhelp.com/euf/rightnow/RightNow.Client.js', function(){
			// make a div for the rightnow response
			if( !$("#myDiv")[0] ){
				$("body").append('<div id="myDiv"></div>');
			};
			
			// set right now cookie.. and init widget
			RightNow.Client.Controller.addComponent({
					chat_login_page: "/app/chat/chat_launch",
					min_agents_avail: 1,
					seconds: 0,
					instance_id: "spac_0",
					div_id: "myDiv",
					module: "ProactiveChat",
					type: 2
				},
				"//victoriassecret.widget.custhelp.com/ci/ws/get"
			);
			
			// wait till the widget is ready
			waitForWidget();
		});
	};
	// step one, do you want help
	var offerChat = function(){
		window.open('/themes/base/candice/html/customerService/assistanceOffer.html', '', 'width=365,height=500,resizable=no,scrollbars=no,menubar=no,toolbar=no,left=100,top=100');
		setCookie();
		VSD.Metrics.pageView("HOW CAN WE ASSIST YOU(LIVE HELP)",null,"LIVE HELP");
	};
	var setCookie = function(){
		if($("#donotshow").is(":checked")){
			var date = new Date();
			// 1 day
			date.setTime(date.getTime()+(1*24*60*60*1000));
			document.cookie = "noChat=Y; expires="+date.toGMTString()+"; path=/";
		
		} else {
			document.cookie = "noChat=Y; path=/";
		}
	};
	// callback, made available to rightnow object
	var handleAvailabilityResponse = function(result){
		if(result.availableAgentSessions >= spac_0.attrs.min_agents_avail){
			offerChat();
		}
	};
	// wait until the widget is ready to offer chat
	var waitForWidget = function(){
		// when spac_0 "widget" is ready
		if(spac_0) {
			setTimeout(function(){
			spac_0.chatAvailability(VSD.CustomerService.handleAvailabilityResponse, null);
			}, waitSeconds * 1000);
		}
		// check it again
		else {
			setTimeout(waitForWidget, 1000);
		}
	};
	var popupInit = function(){
		$("#donotshow").change(setCookie);
	};
	var getStarted = function(){
		window.location = launchUrlBase;
	};
	return {
		"handleAvailabilityResponse": handleAvailabilityResponse,
		"init": init,
		"popupInit": popupInit,
		"getStarted": getStarted,
		"getClick2Chat": getClick2Chat
	}
}());
 /*
 * VSD.Forms
 */
VSD.Forms = (function(context){
	var live = function(){
		$(".ui-cazip").live("change",function(e){
			$(this).val( $(this).val().replace(/[^a-zA-Z 0-9]/g, '') );			
		});

		$("input.text").live({
			focus: function(e){
				var self = $(this);
				var view = self.is("select") ? self.next(".ui-select") : self;
				view.addClass("input active");
				if (self.val() == self.data("defaultValue")){
					self.val('');
				}
			},
			blur: function() {
				var self = $(this);
				self.removeClass("active");
				if (self.val() == "" || self.val() == self.data("defaultValue")){
					self.val(self.data("defaultValue"));
					self.removeClass("input");
				} else {
					self.addClass("input");
				}
			}
		});
		
		$('input.ui-maskedinput').live({
			keydown: function(e){
				var maskedinput=$(this), oldname;
				// first time only
				if(!maskedinput.data("masked")) {
					oldname=maskedinput.attr("name");
					$("<input style='display:none;' class='input ui-textinput "+maskedinput.attr("class").replace('ui-maskedinput','ui-masked')+"' type='password' name='"+oldname+"' id='"+maskedinput.attr("id")+"'>").insertAfter(maskedinput);
					maskedinput.attr("name", oldname+"-masked");
					maskedinput.data("masked", $('input[name='+oldname+']'));
				}
				// everytime
				maskedinput.hide();
				maskedinput.data("masked").data("maskedinput", maskedinput)
					.addClass('input')
					.show().focus();
			}
		});
		$('input.ui-masked').live({
			blur: function(e){
				var masked = $(this);
				if (masked.val() == "" || masked.val() == masked.data("maskedinput").data("defaultValue")){
					masked.data("maskedinput").val(masked.data("maskedinput").data("defaultValue"));
					masked.data("maskedinput").removeClass("input").removeClass("active")
					masked.hide().data("maskedinput").show();
				}
			}
		});
		
		$("select.ui-select").live({
			change: function(){
				var self = $(this);
				var view = self.next(".ui-select");
				if (self.val() == "" || self.val() == self.data("defaultValue")){
					self.val(self.data("defaultValue"));
					view.removeClass("input");
				} else {
					view.addClass("input");
				}
			}
		});

		if(window.location.href.indexOf("store-locator") != -1){
			return true;
		}
		
		//radio events
		$("input.pre-rendered:radio").live('change',radioBtnChangeHandler);
		$("a.ui-radio.pre-rendered").live(VSD.UI.CLICK,radioBtnClickHandler);
		
		//checkbox events
		$("input.pre-rendered:checkbox").live('change',checkboxBtnChangeHandler);
		$("a.ui-checkbox.pre-rendered").live(VSD.UI.CLICK,checkboxBtnClickHandler);
	}

	// address form tabbing
	var setSelectFocus = function(e, back, forward){
		// prev
		if (e.shiftKey && e.keyCode === 9 && back != null) {
	    	e.preventDefault();
	    	$(e.target).trigger("blur");
	        $(back).data("button").trigger("focus");
	    }
		// next
	    else if (e.keyCode === 9 && !e.shiftKey && forward != null){
	    	e.preventDefault();
	    	$(e.target).trigger("blur");
	    	$(forward).data("button").trigger("focus");
	    }
	}	
	
	// CHECKBOXES
	var checkboxBtnClickHandler = function(e) {
		//if spacebar trigger click or other click
		if(e.keyCode == 32 || !e.keyCode) {
			//set the value of the hidden input
			$checkbox = $(this).prev('input.ui-checkbox:checkbox');
			if ($checkbox.is(':checked')) {
				$checkbox.attr('checked', false).trigger('change');
			} else {
				$checkbox.attr('checked', true).trigger('change');
			}
		}
	}
	var checkboxBtnChangeHandler = function(e) {
		$(this).next('a.ui-checkbox').toggleClass("checked");
	}
	var checkBoxRewrite = function(context){
		$("input.ui-checkbox:checkbox",context).each(function(){
			$checkbox = $(this);
			// go to the next item if this elment has already has a rewrite
			if($checkbox.next().is("a.ui-checkbox"))
				return true;
			if ($checkbox.is(':checked')) {
				var checked = ' checked ';
				var aria_checked = ' aria-checked="true" ';
			} else {
				var checked = '';
				var aria_checked = ' aria-checked="false" ';
			}
			if ($checkbox.attr('tabindex')){
				tabindex = $checkbox.attr('tabindex');
			} else {
				tabindex = 0;
			}
			//id
			if ($checkbox.attr('id')){
				var id = ' id="' + $checkbox.attr('id') + '-button" ';
			} else {
				var id = '';
			}
			//name
			if ($checkbox.attr('name')){
				var name = ' name="' + $checkbox.attr('name') + '-button" ';
			} else {
				var name = '';
			}
			$checkbox
			.hide()
			.after('<a href="javascript:void(0);" aria-role="checkbox" ' + id + name + aria_checked + ' class="'+ checked +' '+ $checkbox.attr('class') +'" tabindex="'+ tabindex + '"></a>');
			if(!$body.hasClass("checkout")){
				$checkbox
				.bind('change',checkboxBtnChangeHandler)
				.next()
				.bind(VSD.UI.CLICK,checkboxBtnClickHandler)
				;
			}
		});
	};
	// RADIO
	var radioBtnClickHandler = function(e){
		//if spacebar trigger click or other click
		if(e.keyCode == 32 || !e.keyCode) {
			//set the value of the hidden input
			$(this).prev().attr('checked', true).trigger('change');
		}
	};
	var radioBtnChangeHandler = function(e){
		$("input[name=" + $(this).attr('name') + "]:radio").next('a.ui-radio.checked').removeClass("checked").attr('aria-checked',false);
		$(this).next('a.ui-radio').addClass("checked").attr('aria-checked',true);
	};
	var radioButtonRewrite = function(context){		
		$("input.ui-radio:radio",context).each(function(){
			$radio = $(this);
			// go to the next item if this elment has already has a rewrite
			if($radio.next().is("a.ui-radio"))
				return true;
			//see if the radio is checked by default
			if ($radio.is(':checked')) {
				var aria_checked = 'aria-checked="true"';
				var checked = ' checked ';
			} else {
				var aria_checked = 'aria-checked="false"';
				var checked = '';
			}
			// tabindex
			if ($radio.attr('tabindex')){
				var tabindex = $radio.attr('tabindex');
			} else {
				var tabindex = 0;
			}
			//id
			if ($radio.attr('id')){
				var id = ' id="' + $radio.attr('id') + '-button" ';
			} else {
				var id = '';
			}
			//name
			if ($radio.attr('name')){
				var name = ' name="' + $radio.attr('name') + '-button" ';
			} else {
				var name = '';
			}
			//replace radio button and bind events
			$radio
			.hide()
			.after('<a href="javascript:void(0);" tabindex="' + tabindex + '" aria-role="radio"' + id + name + 'class="' + $radio.attr('class')  + checked + '" ' + aria_checked + '></a>');
			if(!$body.hasClass("checkout")){
				$radio
				.bind('change',radioBtnChangeHandler)
				.next()
				.bind(VSD.UI.CLICK,radioBtnClickHandler)
				;
			}
		});
	};
	var init = function(context){
	
		// rewrite checkboxes and radio buttons
		checkBoxRewrite(context);
		radioButtonRewrite(context);
	
		// do not bind below for checkout
		if($body.hasClass("checkout")) return true;
		
		ieButtons();
				
		// initialize inputs
		$("input:text:not(.ui-textinput), input:password:not(.ui-textinput)", context).addClass("text");
		$("input.text, select.ui-select", context).each(function(){
			var self = $(this);
			if(self.hasClass("ui-phone")) {
				VSD.Forms.formatInput();
				// $(".ui-phone").numbers();
				// $(".ui-phone").mask("(999) 999-9999");
			}
			if(self.hasClass("ui-uszip")) {
				$(".ui-uszip").numbers().usZip();						
			}
			if(self.hasClass("ui-cazip")) {
				//$(".ui-cazip").mask("a9a 9a9",{placeholder:" "});
				$(".ui-cazip").bind('change',function() {		
					self.val(self.val().replace(/[^a-zA-Z 0-9]/g, ''));			
				});
				$(".ui-cazip").caZip();
				
			}
			var view = self.is("select") ? self.next(".ui-select") : self;
			var blur = self.is("select") ? "change" : "blur";
			// split defaultValue|instruction
			var input = self.attr("title").split("|");
			// set defaultValue
			self.data("defaultValue", input[0]);
			var dflt=self.data("defaultValue");
			if(self.hasClass('ui-phone')) {
				dflt=dflt.replace('Example (123) 555-6789','');		
				}
			// set instruction
			if(input.length>1){
				self.data("instruction", input[1]);
			}
			
			// initialize
			self.removeAttr("title");			
			
			if(self.val() == "" || self.val() == dflt){
				view.removeClass("active");
				self.val(self.data("defaultValue"));
			} else {
				view.addClass("input");
			}
			
			// bind functionality
			self.focus(function() {
				view.addClass("input active");
				if (self.val() == self.data("defaultValue")){
					self.val('');
				}
			});
			self.bind(blur, function() {
				view.removeClass("active");
				if (self.val() == "" || self.val() == dflt){
					self.val(self.data("defaultValue"));
					view.removeClass("input");
				} else {
					view.addClass("input");
				}
			});
		});

		// add onsubmit to clearance dropdown form (on sale and clearance landing pages)
		jQuery("#clearanceCollections", context).submit(function(){
			var selectedPath = this.elements["collectionPages"].value;
			if(selectedPath){
				if(selectedPath.indexOf("/") == 0){
					selectedPath = selectedPath.substr(1);
				}
				var newURL = window.location.protocol + "//" + window.location.host + "/" + selectedPath;  
				window.location.href=newURL;
			}			
			return false;
		});
		
		// add onsubmit for SAS forms on home and category pages
		jQuery("form.sas-home, form.sas-category", context).submit(function(){
			var sasFormElement = this;
			var sasForm = jQuery(this);
			var formError = true;
			
			// get intermediateUrl
			var intermediateUrl = "";
			var formHeader = jQuery("a.sas-form-hdr", sasForm);
			if(formHeader.length > 0){
				intermediateUrl = formHeader.attr("href");
			}

			// validate clearance forms
			if(sasForm.hasClass("sas-clearance")){
				var clearanceParams = ["Bras_SizeCode", "Panties_SizeCode", "Collection_BrandNameAssoc"];
				
				// check for: (bra size OR panty size) AND collection
				var brasVal = sasFormElement[clearanceParams[0]].value;
				var pantiesVal = sasFormElement[clearanceParams[1]].value;
				var collectionVal = sasFormElement[clearanceParams[2]].value;
				
				if((brasVal!="default" || pantiesVal!="default") && collectionVal!="default"){
					formError = false;
				}
				
				// add form key/value pairs to intermediateUrl for clearance	
				for(var i=0; i< clearanceParams.length; i+=1){
					var kvPair = clearanceParams[i] + "=" + sasFormElement[clearanceParams[i]].value;
					clearanceParams[i] = kvPair;
				}
				if(intermediateUrl.indexOf("?")!=-1){
					intermediateUrl += "&";
				}
				else {
					intermediateUrl += "?";
				}
				intermediateUrl += clearanceParams.join("&");
			}
			else{
				// simple validation for sale forms - just check for a non-default value
				jQuery("select", sasForm).each(function(){
					if(this.value != "default"){
						formError = false;
					}
				});
			}
			
			// if there was an error go to the intermediateUrl; otherwise, submit the form
			if(formError){
				document.location.href = intermediateUrl;
				return false;
			}
			else{
				return true;
			}
		});
	};
	var ieButtons = function(){
		// add button fixes for ie6/ie7
		if(VSD.Client.isIE7()){
			$('button',context).each(function(i){
				$(this).bind('mouseover focus',function() {
					$btn = $(this);
					$btn.addClass("hover");
					if ($btn.hasClass('btn-40')) {
						$btn.css("backgroundPosition","0 -45px");
					} else if ($btn.hasClass('btn-26')) {
						$btn.css("backgroundPosition","0 -31px");
					} else if ($btn.hasClass('btn-18')) {
						$btn.css("backgroundPosition","0 -23px");
					}
				}).bind('mouseout blur',function(e) {
					$btn = $(this);
					$btn.removeClass("hover");
					if ($btn.hasClass('btn-40') || $btn.hasClass('btn-26') || $btn.hasClass('btn-18')) {
						$btn.css("backgroundPosition","0 0");
					}
				}).bind('mousedown',function(e) {
					$btn = $(this);
					$btn.addClass("down");
					if ($btn.hasClass('btn-40') || $btn.hasClass('btn-26') || $btn.hasClass('btn-18')) {
						$btn.css("backgroundPosition","0 100%");
					}
				}).bind('mouseup',function(e) {
					$btn = $(this);
					$btn.removeClass("down");
					if ($btn.hasClass('btn-40') || $btn.hasClass('btn-26') || $btn.hasClass('btn-18')) {
						$btn.css("backgroundPosition","0 0");
					}
				});
			});
		}
	};
	var clean = function(context){
		if(context){
			$("input", context).each(function(i, el){
				if($(this).val() == $(this).data("defaultValue")){
					$(this).val("");
				}
			});
		}
	};
	

	var formatInput = function( context ){
		context = context || "body";
		$(".ui-phone", context).numbers().usPhone();
		$(".ui-uszip", context).numbers().usZip();
		$(".ui-cazip", context).caZip();
		//$(".ui-uszip", context).numbers();
		/// $(".ui-cazip", context).caZip();
	};
	
	var addressValidator = function(context){
		return {
			test: function(){
				VSD.Forms.clean(context);
				var pass = true;
				// po + addr 
				// error
				if( $('[name="pobox"]', context).exists() ){
					if($('[name="pobox"]', context).val() && $('[name="streetAddr1"]', context).val()){
						$("form", context).errorhandling("add", {
							element: $('[name="pobox"]', context),
							view: $('[name="pobox"]', context)
						});
						$("form", context).errorhandling("add", {
							element: $('[name="streetAddr1"]', context),
							view: $('[name="streetAddr1"]', context)
						});
						VSD.Forms.highlevelError({
							form: context + " form",
							message: "Please do not enter both a street address and a PO Box."
						});
						pass =  false;
					} else if($('[name="pobox"]', context).val() && !$('[name="streetAddr1"]', context).val()){
						// po error + no street
						// success
						// check if pobox is NOT numeric
						if( !Errorhandling.required.numeric.regex.test( $('[name="pobox"]', context).val() ) ){
							$("form", context).errorhandling("add", {
								element: $('[name="pobox"]', context),
								view: $('[name="pobox"]', context)
							});
							VSD.Forms.highlevelError({
								form: context + " form",
								message: "Please do not enter any letters in the PO Box."
							});
							pass =  false;
						} else {
							// 
							$("form", context).errorhandling("noErrors");
							$("form", context).errorhandling("removeBySelector", '[name="streetAddr1"]');
							$('[name="streetAddr1"]', context).removeClass("required-value");
							$('[name="pobox"]', context).removeClass("requirement-error");
							pass = true;
						}
					} else if(!$('[name="pobox"]', context).val()){
						// no street + no po 
						// success
						$('[name="streetAddr1"]', context).addClass("required-value");
						pass = true;
					}
				}
				// check firstName input for special characters
				if( $('[name="firstName"]').val().length > 0 && !Errorhandling.required.nameFirstLast.regex.test( $("[name='firstName']", context).val() ) ){
					$("form", context).errorhandling("add", {
						element: $('[name="firstName"]', context),
						view: $('[name="firstName"]', context),
						type: "nameFirstLast"
					});	
					
					VSD.Forms.highlevelError({
						form: context + " form",
						message: "Please remove any special characters other than # - / in the highlighted fields below.  First and Last Name may contain the following special characters ' or - but cannot contain numbers."
					});
					
					pass = false;
				}
				// first name is not valid
				if( $("[name='firstName']", context).val().length > 0 && !Errorhandling.required.nameInput.regex.test( $("[name='firstName']", context).val() ) ){
					$("form", context).errorhandling("add", {
						element: $('[name="firstName"]', context),
						view: $('[name="firstName"]', context),
						type: "nameInput"
					});	

					if( $("[name='firstName']", context).val().indexOf(" and") > -1 || $("[name='firstName']", context).val().indexOf("and ") > -1 || $("[name='firstName']", context).val().indexOf("+") > -1 )
					{
						VSD.Forms.highlevelError({
							form: context + " form",
							message: "Please enter only one name in the highlighted fields below."
						});
						
					} else {
						VSD.Forms.highlevelError({
							form: context + " form",
							message: "Please remove any salutations or titles in the highlighted fields below."
						});
					}
					pass = false;
				}
				// check firstName input for special characters
				if( $('[name="middleName"]').val().length > 0 && !Errorhandling.required.alpha.regex.test( $("[name='middleName']", context).val() ) ){
					$("form", context).errorhandling("add", {
						element: $('[name="middleName"]', context),
						view: $('[name="middleName"]', context),
						type: "nameInput"
					});	
					
					VSD.Forms.highlevelError({
						form: context + " form",
						message: "Please remove any special characters other than # - / in the highlighted fields below.  First and Last Name may contain the following special characters ' or - but cannot contain numbers."
					});
					
					pass = false;
				}
				// last name is not valid
				if( $("[name='lastName']", context).val().length > 0 && !Errorhandling.required.nameInput.regex.test( $("[name='lastName']", context).val() ) ){
					$("form", context).errorhandling("add", {
						element: $('[name="lastName"]', context),
						view: $('[name="lastName"]', context),
						type: "nameInput"
					});
					if( $("[name='lastName']", context).val().indexOf(" and") > -1 || $("[name='lastName']", context).val().indexOf("and ") > -1 || $("[name='lastName']", context).val().indexOf("+") > -1 )
					{
						VSD.Forms.highlevelError({
							form: context + " form",
							message: "Please enter only one name in the highlighted fields below."
						});
						
					} else {
						VSD.Forms.highlevelError({
							form: context + " form",
							message: "Please remove any salutations or titles in the highlighted fields below."
						});
					}
					pass = false;
				}
				// check lastName input for special characters
				if( $('[name="lastName"]').val().length > 0 && !Errorhandling.required.nameFirstLast.regex.test( $("[name='lastName']", context).val() ) ){
					$("form", context).errorhandling("add", {
						element: $('[name="lastName"]', context),
						view: $('[name="lastName"]', context),
						type: "nameFirstLast"
					});	
					
					VSD.Forms.highlevelError({
						form: context + " form",
						message: "Please remove any special characters other than # - / in the highlighted fields below.  First and Last Name may contain the following special characters ' or - but cannot contain numbers."
					});
					pass = false;
				}
				// confirm email exists
				if( $('[name="confirmEmailAddress"]', context).exists() ) {
					// confirm match
					if($('[name="confirmEmailAddress"]', context).val().toLowerCase() != $('[name="emailAddr"]', context).val().toLowerCase()
								&& (Errorhandling.required.email.regex.test( $("[name='emailAddr']", context).val()) && Errorhandling.required.email.regex.test( $("[name='confirmEmailAddress']", context).val()))){
						$("form", context).errorhandling("add", {
							element: $('[name="confirmEmailAddress"]', context),
							view: $('[name="confirmEmailAddress"]', context)
						});
						VSD.Forms.highlevelError({
							form: context + " form",
							message: "Please enter the same address in both email fields."
						});
						pass = false;
					}
				}
				// check Address input field for special characters
				if( $("[name='streetAddr1']").val().length > 0 && !Errorhandling.required.inputField.regex.test( $("[name='streetAddr1']", context).val() ) ){
					$("form", context).errorhandling("add", {
						element: $('[name="streetAddr1"]', context),
						view: $('[name="streetAddr1"]', context),
						type: "inputField"
					});	
					
					VSD.Forms.highlevelError({
						form: context + " form",
						message: "Please remove any special characters other than # - / in the highlighted fields below.  First and Last Name may contain the following special characters ' or - but cannot contain numbers."
					});
					pass = false;
				}
				// check Address input field for special characters
				if( $("[name='streetAddr2']").val().length > 0 && !Errorhandling.required.inputField.regex.test( $("[name='streetAddr2']", context).val() ) ){
					$("form", context).errorhandling("add", {
						element: $('[name="streetAddr2"]', context),
						view: $('[name="streetAddr2"]', context),
						type: "inputField"
					});	
					
					VSD.Forms.highlevelError({
						form: context + " form",
						message: "Please remove any special characters other than # - / in the highlighted fields below.  First and Last Name may contain the following special characters ' or - but cannot contain numbers."
					});
					pass = false;
				}
				// check Address input field for special characters
				if( $("[name='streetAddr3']")[0] && $("[name='streetAddr3']").val().length > 0 && !Errorhandling.required.inputField.regex.test( $("[name='streetAddr3']", context).val() ) ){
					$("form", context).errorhandling("add", {
						element: $('[name="streetAddr3"]', context),
						view: $('[name="streetAddr3"]', context),
						type: "inputField"
					});	
					
					VSD.Forms.highlevelError({
						form: context + " form",
						message: "Please remove any special characters other than # - / in the highlighted fields below.  First and Last Name may contain the following special characters ' or - but cannot contain numbers."
					});
					pass = false;
				}
				// check City input field for special characters
				if( $("[name='intlSt']")[0] && $("[name='intlSt']").val().length > 0 && !Errorhandling.required.city.regex.test( $("[name='intlSt']", context).val() ) ){
					$("form", context).errorhandling("add", {
						element: $('[name="intlSt"]', context),
						view: $('[name="intlSt"]', context),
						type: "inputField"
					});	
					
					VSD.Forms.highlevelError({
						form: context + " form",
						message: "Please remove any special characters other than # - / in the highlighted fields below.  First and Last Name may contain the following special characters ' or - but cannot contain numbers."
					});
					pass = false;
				}
				// check City input field for special characters
				if( $("[name='city']").val().length > 0 && !Errorhandling.required.city.regex.test( $("[name='city']", context).val() ) ){
					$("form", context).errorhandling("add", {
						element: $('[name="city"]', context),
						view: $('[name="city"]', context),
						type: "inputField"
					});	
					
					VSD.Forms.highlevelError({
						form: context + " form",
						message: "Please remove any special characters other than # - / in the highlighted fields below.  First and Last Name may contain the following special characters ' or - but cannot contain numbers."
					});
					pass = false;
				}
				// hide cog loader to allow submit
				if(pass == false)
				{
					VSD.Loader.hide( $(".ui-loader", context) );
					
					// make sure scrollbar shows in overlay if it's needed
					if( context == VSD.Overlay.id )
					{
						VSD.UI.scrollbar( VSD.Overlay.content );
					}
				}
				
				// success
				return pass;
			}
		};
	};


	var errorhandling = function(options){
		$(options.form).errorhandling(options);
	};
	
	var validate = function(selector){
		$(selector).errorhandling("validate");
	};

	var highlevelError = function(options){
		$(options.form).errorhandling("error", options.message ? options.message : null);
	};
	
	var errorhandlingOff = function(formSelector){
		$(formSelector).errorhandling("off");
	};
	
	var errorhandlingAdd = function(formSelector, requirement){
		$(formSelector).errorhandling("add", requirement);
	};
	
	var highlevelMarkup = function(msg){
		return '<div class="ui-alert"><p>'+(msg||'')+'</p></div>';
	};

	var lowlevelMarkup = function(msg){
		return '<p class="ui-notice">'+(msg||'')+'</p>';
	};
	
	var appliedMarkup = function(msg){
		return '<p class="ui-accepted">'+(msg||'')+'</p>';
	};
	
	var clearErrors = function(context)
	{
		$(".ui-alert, .ui-notice", context || "body" ).remove();
	}
		
	var formToObject = function(context, namespace, keepDefault){
		namespace = namespace || '';
		var formObject = new Object();
		$(":input", context).each(function(i, input){
			$i = $(input);
			if($i.attr("type") == "radio") {
				if($i.is(":checked")){
					formObject[namespace + $i.attr("name")] = $i.val();
				}
				return true;
			}
			if($i.attr("type") == "checkbox") {
				if($i.is(":checked")){
					formObject[namespace + $i.attr("name")] = $i.val();
				} else {
					formObject[namespace + $i.attr("name")] = "";
				}
				return true;
			}
			if(!keepDefault && $i.val() == $i.data("defaultValue")){
				formObject[namespace + $i.attr("name")] = "";
			} else {
				formObject[namespace + $i.attr("name")] = $i.val();
			}
		});
		return formObject;
	};
	
	//retain common form values
	var formCommonValues = new Array();
	var retainCommon = function(selector){
		formCommonValues = new Array();
		$("input,select", selector).each(function () {
			if( $(this).val() != $(this).data("defaultValue") ){
				formCommonValues[$(this).attr('name')]=$(this).val();
			}
		});
	}
	var restoreCommon = function(selector,not)	{
		var notarr = not.split(',');	
		$("input,select", selector).each(function () {
			if(formCommonValues[$(this).attr('name')] && formCommonValues[$(this).attr('name')]!=$(this).attr('title').replace('|','') && formCommonValues[$(this).attr('name')]!=undefined && !notarr[$(this).attr('name')]) {				
				if($(this).is('select')) {
					$(this).find('option[value="'+formCommonValues[$(this).attr('name')]+'"]').attr('selected','selected');
					$(this).trigger("change");
				}
				else {
					$(this).val(formCommonValues[$(this).attr('name')]);
					$(this).trigger("blur");
				}
			}
		});
	}
		
	return {
		"init": init,
		"clean": clean,
		"errorhandling": errorhandling,
		"validate": validate,
		"highlevelError": highlevelError,
		"errorhandlingOff": errorhandlingOff,
		"errorhandlingAdd": errorhandlingAdd,
		"formToObject": formToObject,
		"highlevelMarkup": highlevelMarkup,
		"lowlevelMarkup": lowlevelMarkup,
		"clearErrors": clearErrors,
		"appliedMarkup": appliedMarkup,
		"formatInput": formatInput,
		"retainCommon":retainCommon,
		"restoreCommon":restoreCommon,
		"live": live,
		"setSelectFocus": setSelectFocus,
		"addressValidator": addressValidator,
		"ieButtons": ieButtons
	};
}());
/*
 * VSD.HeaderFooter
 */
VSD.HeaderFooter = (function(){
	var navHighlightPath;
	var leftNavHighlightPath;
	
	var emailDefaultText = "Sign Up For Email";
	var searchDefaultText = "Search";
	
	// JSON DOM objects
	var headerJsonDom = null;
	var footerJsonDom = null;
	
	var jsonHeaderId = null;
	var jsonFooterId = null;
	
	var nickname = "";
	
	var headerFooterDataUrl = "/ss/Satellite?pagename=LBI/Nav/vsdJSONNav&navContext=external";
	
	var init = function(){
		
		var vsNav = jQuery("#nav");
		var vsNavLI = jQuery('ul li',vsNav);
		var vsNavLIA = jQuery("a",vsNavLI);
		var vsNavLINot = jQuery("ul li:not(.selected)",vsNav);
		
		// handle nav images
		vsNav.find("a.img").each(function(){
			var aElement = jQuery(this);
			var navImageJsonDom = aElement.data("navImage");
			var imgMarkup = VSD.Util.JsonDom.getMarkup(navImageJsonDom);
			if(imgMarkup){
				aElement.html(imgMarkup);
			}
		});
		
		// highlight the selected nav element
		if(navHighlightPath){
			vsNav.find("." + navHighlightPath).addClass("selected");
		}
		
		// add hover events to nav li's to compensate for IE's lack of the li:hover pseudoclass
		vsNavLINot.bind('mouseover touchstart focus', function(){
			//ipad needs this
			$(".hover",vsNav).removeClass('hover').css({"filter": "", "background-image": ""});
			$(this).addClass("hover").supersleight({"shim": VSD.SuperSleight.shim});
		});
		
		vsNavLINot.bind('mouseout blur', function(){
			$(this).removeClass("hover").css({"filter": "", "background-image": ""});
			vsNav.find(".selected").supersleight({"shim": VSD.SuperSleight.shim});
		});
	
		//support for tabs
		vsNavLIA.bind('focus', function(){
			$(this).parent().addClass("hover").supersleight({"shim": VSD.SuperSleight.shim});
		});
		vsNavLIA.bind('blur', function(){
			$(this).parent().removeClass("hover").css({"filter": "", "background-image": ""});
		});
		
		// fix nav PNGs
		if(typeof jQuery.fn.supersleight === "function") { 
			vsNav.supersleight({"shim": VSD.SuperSleight.shim});
		}
		
		// update utilities links and shopping bag; make visible when done
		updateUtilitiesLinks();
		updateShoppingBag();
		jQuery(".utilities, .shopping-bag").css("visibility", "visible");
		
		// highlight the selected left nav element
		highlightLeftNav();
		
		// initialize search form field
		jQuery("#searchform input").focus(function() {
			var self = $(this);
			if (self.val() == searchDefaultText){
				self.addClass("active");
				self.val('');
			}
		}).blur(function() {
			var self = $(this);
			if (self.val() == ""){
				self.removeClass("active");
				self.val(searchDefaultText);
			}
		});
		
		// initialize email form field
		jQuery("#emailForm input").live('focus', function() {
			var self = $(this);
			if (self.val() == emailDefaultText){
				self.addClass("active");
				self.val('');
			}
		}).live('blur', function() {
			var self = $(this);
			if (self.val() == ""){
				self.removeClass("active");
				self.val(emailDefaultText);
			}
		});
		
		// add onsubmit to email form
		jQuery("#emailForm").live('submit', function(){
			var self = jQuery(this);
			var emailVal = jQuery("input[name='email']", self).val();
			if(emailVal == emailDefaultText){
				emailVal = "";
			}
			
			setVSCookie('SignUpForEmail',emailVal,'');
			
			if (location.protocol == "https:") {
				document.location = VSD.swww + "/CustomerService/SignUp/SignUpForEmail/";
			} else {
				document.location = VSD.www + "/CustomerService/SignUp/SignUpForEmail/";
			}

			return false;
		});
		
		// emailLink triggers onclick for email form
		jQuery("#emailLink").bind(VSD.UI.CLICK,function(){
			jQuery("#emailForm").trigger("submit");
			return false;
		});
	};
	
	var highlightLeftNav = function(){
		if(leftNavHighlightPath){
			var selectedNode = jQuery("#"+leftNavHighlightPath, jQuery("ul#leftnav"));
			if(selectedNode.length > 0){
				selectedNode.addClass("selected").addClass("selected-item");				 
				
				var parentUL = selectedNode.closest("ul");
				if(parentUL.length > 0){
					var collectionlevel1=1;                     
					while(!parentUL.hasClass("level-0")){
						var headerToHighlight = parentUL.siblings("h3");
						if(headerToHighlight.hasClass("vs-expand-left")){	
							collectionlevel1=0;
							headerToHighlight.removeClass("vs-expand-left");
							headerToHighlight.addClass("vs-expand-hide-left");
							if(parentUL.hasClass("hide")){
								parentUL.removeClass("hide");
							}
						}
						if(!headerToHighlight.hasClass("level-0-head")){
							headerToHighlight.addClass("selected");
							$("h3.selected").find('a').css('color','#F35C93');
						}
						parentUL = parentUL.parent().closest("ul");
					}
					parentnode=selectedNode.parents("h3");
					if(parentnode.hasClass("vs-expand-left")){
						var parentNode1=parentnode.siblings("UL");
						if(parentNode1.hasClass("hide")){
							parentNode1.removeClass("hide");
						}
					}
				}
			}
		}
	}
	
	var updateUtilitiesLinks = function() {
		if(typeof getVSCookie !== "undefined") {
			var NavbarCookie = getVSCookie("NAVBAR", true);
			NavbarCookie = NavbarCookie.replace(/"/g,"");
			if(NavbarCookie != ""){
				
				if(NavbarCookie.lastIndexOf(",") != -1){
					var item_count = decodeURIComponent(NavbarCookie.lastIndexOf(",") + 1, NavbarCookie.length);
				}
				if(!isNaN(item_count)){
					nickname = decodeURIComponent(NavbarCookie.substring(0, NavbarCookie.lastIndexOf(",")));
				} 
				else{
					nickname = decodeURIComponent(NavbarCookie);
				}
			}
			else{
				nickname = decodeURIComponent(NavbarCookie);
			}
		}
		if(nickname != ""){
			// signed in state
			var nicknameElement = jQuery("#nickname");
			nicknameElement.html(nickname);
			while (nicknameElement.width() > 80){
				nickname = nickname.substr(0, nickname.length - 1);
				nicknameElement.html(nickname+'&hellip;');
			}
			
			jQuery("#signIn, #getEmail").hide();
			jQuery("#account").addClass("first");
		}
		else{
			// signed out state
			jQuery("#welcome, #signOut").hide();
			jQuery("#signIn").addClass("first");
		}
		
		// language toggle
		if(location.hostname.split('.')[0] == ('espanol' || 'espanol2')){
			jQuery("#spanish").hide();
		}
		else{
			jQuery("#english").hide();
		}
	};
	
	var updateShoppingBag = function() {
		if(VSD.ABTesting.is("commerce")){
			commerce2ShoppingBag();
			return false;
		}
		if(typeof CheckoutCookie !== "undefined") {
			var checkoutCookie1 = new CheckoutCookie();
			var itemcount = checkoutCookie1.get("mini_bag_count");
			itemcount == undefined || null ? itemcount = "0" : itemcount = itemcount.match(/[0-9]+/);
			if (itemcount == "0"){	
				$('.shopping-bag em').html('');
			}
			else if (itemcount == "1"){
				$('.shopping-bag em').html(itemcount + ' Item');
			}
			else{
				$('.shopping-bag em').html(itemcount + ' Items');
			}
		}
	};
	var commerce2ShoppingBag = function() {
		if (typeof getVSCookie !== "undefined") {
			var NavbarCookie = getVSCookie("NAVBAR");
			NavbarCookie = NavbarCookie.replace(/"/g,"");
			if(NavbarCookie != ""){
				if(NavbarCookie.lastIndexOf(",") != -1){
					var itemcount = NavbarCookie.substring(NavbarCookie.lastIndexOf(",") + 1, NavbarCookie.length);
				}
			}
			if (itemcount == "0" || typeof itemcount == "undefined"){	
				$('.shopping-bag em').html('');
			}
			else if (itemcount == "1"){
				$('.shopping-bag em').html(itemcount + ' Item');
			}
			else{
				$('.shopping-bag em').html(itemcount + ' Items');
			}
			// needs conditions
			$(".shopping-bag a").attr("href", VSD.swww + VSD.commerce + "/viewbagaction");
			
		}
	};	
	var setNavHighlightPath = function(path){
		navHighlightPath = path;
	};
	
	var setLeftNavHighlightPath = function(path){
		leftNavHighlightPath = path;
	};
	
	// getHeader and getFooter should be rewritten - moving them here as a first step to clean up static error pages
	var getHeader = function(containerId){
		if(containerId && document.getElementById(containerId)){
			var strURL = getHeaderFooterHostname() + "/ss/Satellite?pagename=LBI/Nav/vsdStaticTopNav";
		    
			var xmlHttpReq = false;
		    var self = this;
		    // Mozilla/Safari
		    if (window.XMLHttpRequest) {
		        self.xmlHttpReq = new XMLHttpRequest();
		    }
		    // IE
		    else if (window.ActiveXObject) {
		        self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
		    }
		    self.xmlHttpReq.open('POST', strURL, true);
		    self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		    self.xmlHttpReq.onreadystatechange = function() {
		        if (self.xmlHttpReq.readyState == 4) {
		        	var test = self.xmlHttpReq.responseText;
		        	document.getElementById(containerId).innerHTML = test;
		        	VSD.init();
		        }
		    }
		    self.xmlHttpReq.send(null);
		}
	};
	
	var getFooter = function(containerId){
		if(containerId && document.getElementById(containerId)){
			var strURL = getHeaderFooterHostname() + "/ss/Satellite?pagename=LBI/Nav/vsdBottomNav";
		    
		    var xmlHttpReq1 = false;
		    var self = this;
		    if (window.XMLHttpRequest) {
		        self.xmlHttpReq1 = new XMLHttpRequest();
		    }
		    else if (window.ActiveXObject) {
		    	self.xmlHttpReq1 = new ActiveXObject("Microsoft.XMLHTTP");
		    }
		    self.xmlHttpReq1.open('POST', strURL, true);
		    self.xmlHttpReq1.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		    self.xmlHttpReq1.onreadystatechange = function() {
	            if (self.xmlHttpReq1.readyState == 4) {
	            	var test = self.xmlHttpReq1.responseText;
	    		document.getElementById(containerId).innerHTML = test;
	            }
	        }
		    self.xmlHttpReq1.send(null);
		}
	};
	
	var getHeaderFooterHostname = function(){
		var hostname = appserver;
		if (location.host.indexOf("limited.com") != -1){
			 if (location.protocol == "https:"){
				 hostname = VSD.swww;
		    }
		    else{
		    	hostname = VSD.www;
		    }
		} 
		
		return hostname;
	};
	
	// client-side header/footer
	var getHeaderFooter = function(headerId, footerId){
		jsonHeaderId = headerId;
		jsonFooterId = footerId;
		
		var path = getHeaderFooterHostname() + headerFooterDataUrl; 
		jQuery.getScript(path);
	};
	
	var getHeaderFooterOnComplete = function(resultObj){
		if(resultObj.headerMarkup){
			addHeaderFooterMarkup(jsonHeaderId, resultObj.headerMarkup );
		}
		if(resultObj.footerMarkup){
			addHeaderFooterMarkup(jsonFooterId, resultObj.footerMarkup);
		}
		VSD.ABTesting.init();
		VSD.ImgReplace.init();
	};
	
	var addHeaderFooterMarkup = function(containerId, markupString){
		var decodedMarkupString = $("<div/>").html( VSD.ImgReplace.secure(markupString, true) ).text();
		jQuery("#"+containerId).empty().append(decodedMarkupString);
	};
	
	var onHeaderComplete = function(){};
	
	var onFooterComplete = function(){
		VSD.init();
	};
	
	return {
		"init": init,
		"setNavHighlightPath": setNavHighlightPath,
		"setLeftNavHighlightPath": setLeftNavHighlightPath,
		"getHeader": getHeader,
		"getFooter": getFooter,
		"getHeaderFooter": getHeaderFooter,
		"getHeaderFooterHostname": getHeaderFooterHostname,
		"getHeaderFooterOnComplete": getHeaderFooterOnComplete,
		"onHeaderComplete": onHeaderComplete,
		"onFooterComplete": onFooterComplete,
		"updateShoppingBag":updateShoppingBag,
		"nickname": nickname
	}
}());

/*
 * VSD.Home
 */
VSD.Home = (function(){
	var mainFeatures = [];
	
	var init = function(){
		// handle main feature background image
		var mainFeatureContainer = jQuery(".main-feature");
		
		var testDimension;
		if(jQuery(".test-rollup", mainFeatureContainer).length > 0){
			var rollup = jQuery(".test-rollup", mainFeatureContainer);
			var mainFeatureConfig = rollup.attr("id").split("_");
			testDimension = mainFeatureConfig[2];
		}
		
		var activeFeature;
		if(testDimension == undefined){
			activeFeature = mainFeatures[0];
		}
		else {
			var testVersion = getExperience(testDimension);
			for(var i=0; i < mainFeatures.length; i+=1){
				var f = mainFeatures[i];
				if(f.TestVersion == testVersion){
					activeFeature = f;
					break;
				}
			}
		}
		
		if(activeFeature && activeFeature.ImageFileName){
			// set background image on #wrapInner
			jQuery("#wrapInner").css("background-image", "url("+activeFeature.ImageFileName+")");
		}
		
		jQuery(".main-feature-sas").supersleight({"shim": VSD.SuperSleight.shim});
	};

	return {
		"init": init,
		"mainFeatures": mainFeatures
	};
}());
/*
 * VSD.Login
 */
VSD.Login = (function(){
	var doubleLogin = true;
	var init = function(){
		
		VSD.Forms.errorhandling({
			form: "#logonForm",
			requirements: [
				{ element: "#username", minLength: 2 },
				{ element: "#password" }
			],
			onsuccess: function(){
				
				// opc signin
				if(VSD.ABTesting.is("commerce"))
				{
					if(doubleLogin)
					{
						doubleLogin = false;
						$.ajax({
							type: 'POST',
							dataType: "json",
							url: VSD.commerce+'/signin/signin',
							data: {
								"loginModel.userName": $("#username").val(),
								"loginModel.password": $("#password").val()
							},
							error:function(jqXHR, textStatus, errorThrown){
								document.forms["logonForm"].submit();
							},
							success: function(data, textStatus, XMLHttpRequest){
								document.forms["logonForm"].submit();
							}
						});
					}
				}
				// signin
				else
				{
					document.forms["logonForm"].submit();
				}
			},
			highlevelErrorMessage: "We do not recognize your sign-in information below. Please try again.",
			tooltipError: false,
			highlevelErrorList: false
		});
	};
	var wishlistLogin = function(){
		if(VSD.ABTesting.is("commerce"))
		{
			$.ajax({
				type: 'POST',
				dataType: "json",
				url: VSD.commerce+'/signin/signin',
				data: {
					"loginModel.userName": $("#username").val(),
					"loginModel.password": $("#password").val()
				},
				error:function(jqXHR, textStatus, errorThrown){
					document.getElementById('loginform:button_signin').click();
				},
				success: function(data, textStatus, XMLHttpRequest){
					document.getElementById('loginform:button_signin').click();
				}
			});
		}
		// current state
		else
		{
			document.getElementById('loginform:button_signin').click();
		}
	}
	return {
		"init":init,
		"wishlistLogin": wishlistLogin
	};
}());
/*
 * VSD.jQuery
 */
VSD.JQuery = (function(){
	var init = function(){
		// Store a reference to the original remove method.
		var originalRemoveMethod = jQuery.event.special.change;
		var changeFilters;
		var rnamespaces = /\.(.*)$/,
		rformElems = /^(?:textarea|input|select)$/i,
		rperiod = /\./g,
		rspace = / /g,
		rescape = /[^\w\s.|`]/g,
		
		fcleanup = function( nm ) {
			return nm.replace(rescape, "\\$&");
		};
		
		focusCounts = { focusin: 0, focusout: 0 };
		
		testChange = function testChange( e ) {
			var elem = e.target, data, val;

			if ( !rformElems.test( elem.nodeName ) || elem.readOnly ) {
				return;
			}

			data = jQuery.data( elem, "_change_data" );
			val = getVal(elem);

			// the current data will be also retrieved by beforeactivate
			if ( e.type !== "focusout" || elem.type !== "radio" ) {
				jQuery.data( elem, "_change_data", val );
			}
			
			if ( data === undefined || val === data ) {
				return;
			}

			if ( data != null || val ) {
				e.type = "change";
				e.liveFired = undefined;
				return jQuery.event.trigger( e, arguments[1], elem );
			}
		};
		jQuery.event.special.change = {
			filters: {
				focusout: jQuery.testChange, 
	
				beforedeactivate: jQuery.testChange,
	
				click: function( e ) {
					try {
					var elem = e.target, type = elem.type;
	
					if ( type === "radio" || type === "checkbox" || elem.nodeName.toLowerCase() === "select" ) {
						return testChange.call( this, e );
					}
					}catch(e)
					{
						alert(e);
					}
				},
	
				// Change has to be called before submit
				// Keydown will be called before keypress, which is used in submit-event delegation
				keydown: function( e ) {
					var elem = e.target, type = elem.type;
	
					if ( (e.keyCode === 13 && elem.nodeName.toLowerCase() !== "textarea") ||
						(e.keyCode === 32 && (type === "checkbox" || type === "radio")) ||
						type === "select-multiple" ) {
						return testChange.call( this, e );
					}
				},
	
				// Beforeactivate happens also before the previous element is blurred
				// with this event you can't trigger a change event, but you can store
				// information
				beforeactivate: function( e ) {
					var elem = e.target;
					jQuery.data( elem, "_change_data", getVal(elem) );
				}
			},
	
			setup: function( data, namespaces ) {
				if ( this.type === "file" ) {
					return false;
				}
	
				for ( var type in changeFilters ) {
					jQuery.event.add( this, type + ".specialChange", changeFilters[type] );
				}
	
				return rformElems.test( this.nodeName );
			},
	
			teardown: function( namespaces ) {
				jQuery.event.remove( this, ".specialChange" );
	
				return rformElems.test( this.nodeName );
			}
		};
	};
	return {
		"init": init
	}
}());
/*
 * VSD.Touch
 */
VSD.Touch = (function(){
	//iOS and Andriod
	var init = function(){
		$(document).bind('touchstart touchmove touchend touchcancel gesturestart gesturechange gestureend orientationchange',function(event){});		
	};
	return {
		"init": init
	};
}());
/*
 * VSD.Overlay
 */
VSD.Overlay = (function(){
	
	var runInit = true;

	var id = "#overlay";
	var content =  id + " .content-inner";
	var footer = ".footerbar-on"
	
	var init = function(){
		if(runInit){
			$body.prepend('<div id="overlay" class="overlay ui-shadow"></div>');
		}
		runInit = false;
	};
	
	var callback = function(){
		VSD.UI.initSelectmenus(VSD.Overlay.id);
		setTimeout(function(){
			hideLoader();
			VSD.Cufon.initOn(VSD.Overlay.id);
		}, 500);
		VSD.UI.tooltip(VSD.Overlay.id);
		VSD.Forms.init(VSD.Overlay.id);
		VSD.UI.table(VSD.Overlay.content);
		contentHeight();
		VSD.UI.scrollbar(VSD.Overlay.content);
	};
	
	var hideLoader = function(){
		$(VSD.Overlay.id).removeClass("overlay-loading");
	};
	
	var close = function(){
		$(VSD.Overlay.id).overlay("close");
	};
	
	var lock = function(){
		$(VSD.Overlay.id).overlay("lock");
	};
	
	var open = function(options){
		$(VSD.Overlay.id).overlay($.extend({}, {callback: VSD.Overlay.callback}, options)).addClass("overlay-loading");
	};
	
	var contentHeight = function(){
		$(VSD.Overlay.id).overlay("contentHeight");
	};

	var setContent = function(m){
		$(VSD.Overlay.content).overlay(m);
	};


	return {
		"init": init,
		"setContent": setContent,
		"id": id,
		"content": content,
		"contentHeight": contentHeight,
		"footer": footer,
		"lock": lock,
		"open": open,
		"close": close,
		"callback": callback,
		"hideLoader": hideLoader
	}
}());
/*
 * Metrics
 */
VSD.Metrics = (function(){
	//cm switch to turn off all cm tags from firing
	var enabled = true;
	var cmShopCounter = 0;
	var cmShopProducts = new Array();
	var cmShopIds = new Array();
	var cmShopCats = new Array();
	var cmShopQtys = new Array();
	var cmShopBOQtys = new Array();
	var cmShopPrices = new Array();
	var cmShopSKUs = new Array();
	var cmShopOrderIds = new Array();
	var cmShopCustomerIds = new Array();
	var cmShopOrderPrices = new Array();
	//
	//
	// documentation for Metrics 
	// 5/10/2011
	//
	//
	//
	//
	//
	// pageID:			Unique String: value for a page
	//						- panel, overlay, page, pop up window
	//						- Shopping Cart: view bag (view bag)
	//						- Shopping Cart: Add to Bag
	//						- Shopping Cart: Checkout
	//						- Shopping Cart: Discontinued
	//
	//						For products, we differentiate categoryID page views
	//						with pageID
	//						Product: item name (item number)
	//						Collection: Nav node (seo url) 
	//						Jump Page: Clothing - (landing)
	//			
	//					
	//
	// categoryID:		String: CMS driven/custom page driven category
	//						- Shopping Cart - (add to bag)
	//						- Checkout - (view shopping bag -> thank you)
	//						- Main Pages - (home)
	//						
	//						Jump Page is another way of saying Landing
	//						- Clothing Landing Page - (landing)
	//						- Nav Node Name(SEO URL) - (collection)
	//						- Nav Node Name(SEO URL) - (product)
	//						- Gifts - (gift card landing)
	//						- GC (Gift Card) - (gift card collection)
	//					
	// searchString:	User Input
	//						- keyword that brought the user to the search landing page 
	//						- (search landing page only)
	//
	//
	// searchResults:	string: number of results return from the search
	//						- "keyword search pages"
	//						- only for foresee
	// attributes:		String:
	//						up to 50 -_- delimited custom parameters
	//
	// extraFields:		String:
	//						up to 15 -_- delimited custom parameters
	//
	var pageView = function(pageID, searchString, categoryID, searchResults, attributes, extraFields){
		if(!enabled)
			return false;
		cmCreatePageviewTag(cmStripIllegals(pageID + getCMTestStringPage(VSD.ABTesting.getTestval())), cmStripIllegals(searchString), cmStripIllegals(categoryID), searchResults,  attributes, extraFields);
	};
	// 
	// bagItemView
	//
	// ATB, View Bag (VSB), Checkout OPC
	// 
	// productID:			item number (123456)
	//
	// productName:			Item Name (item number) 
	//							ex: "low rise bottom (123456)"
	//
	// productQuantity:		string: Number 
	//							ex: 1
	//
	// productPrice:		string: Number
	//							ex: 49.95
	//
	// categoryID:			refer to above
	//
	// *attributes:			refer to above
	//		
	// 
	//
	// *extraFields:			string: 1/0 boolean
	//							ex: -_-1 (backordered)
	//		
	//		
	//
	var bagItemView = function(context){
		if(!enabled)
			return false;
		// iterate through all items in the shopmodel
		$(context.available).each(function(){
			if(this.lineItem.dealTotal > 0){
				VSD.Metrics.bagItemDealPriceEvent(this.shortDescription, this.buyMoreCount, "Deal Pricing", 0);
			}
			cmCreateShopAction5Tag(this.lineItem.itmNbr, this.shortDescription + ' ('+ this.lineItem.itmNbr +')', this.oredrQty, this.adjUnitPrice, cmStripIllegals(decodeURIComponent(this.coreMetric)), this.lineItem.bkOrdQty);
			cmShopCounter++;
			// trigger image request
			cmDisplayShop5s();
		});
		$(context.backOrdered).each(function(){
			// throw customTag for discontinued
			cmCreateShopAction5Tag(this.lineItem.itmNbr, this.shortDescription + ' ('+ this.lineItem.itmNbr +')', this.oredrQty, this.adjUnitPrice, cmStripIllegals(decodeURIComponent(this.coreMetric)), this.lineItem.bkOrdQty);
			cmShopCounter++;
			// trigger image request
			cmDisplayShop5s();
		});
	};
	var bagItemViewMarkup = function(context){
		if(!enabled)
			return false;
		// iterate through all items in the shopmodel markup
		$(context).each(function(){
			// throw customTag for discontinued
			if($(this).hasClass("atb-itemDiscontinued")){
				VSD.Metrics.customTag(4, $(".extraFields", this).text());
				return true;
			}
			if ($(this).find('.itmNbr').text()){
				var itemNumber = $(this).find('.itmNbr').text();
			} else {
				var itemNumber = $(this).find('.itemNumber').text();
			}
			if($(this).find('.buyMoreCount')[0]){
				VSD.Metrics.bagItemDealPriceEvent($(this).find('.shortDescription').text(),	$(this).find('.buyMoreCount').text(), "Deal Pricing", 0);
			}
			cmCreateShopAction5Tag(itemNumber, $(this).find('.shortDescription').text() + ' ('+ itemNumber +')', $(this).find('.quantity').text(), $(this).find('.adjUnitPrice').text(), cmStripIllegals(decodeURIComponent($(this).find('.coreMetric').text())), $(this).find('.bkOrdQty').text());
			cmShopCounter++;
			// trigger image request
			cmDisplayShop5s();
		});
	};
	var bagItemView9 = function(context,customer,order){
		if(!enabled)
			return false;
		//get the count of back ordered items
		var backorderCount = 0;
		context.each(function(i){
			if(parseFloat($(this).find(".itemStock").text())) {
				backorderCount++;
			}
		});
		// iterate through all items in the bag
		var cmShopCounter = 0;
		context.each(function(i){
			if (parseFloat($(this).find(".itemStock").text())) {
				cmCreateShopAction9Tag($(this).find(".itemNumber").text(),$(this).find(".shortDescription").text(),$(this).find(".quantity").text(),$(this).find(".adjUnitPrice").text(),customer.emailAddr,$('#orderInfo .orderNumber').text(),order.orderTotal.merchandiseSubTotal, cmStripIllegals(decodeURIComponent($(this).find('.coreMetric').text())),backorderCount);
			} else {
				cmCreateShopAction9Tag($(this).find(".itemNumber").text(),$(this).find(".shortDescription").text(),$(this).find(".quantity").text(),$(this).find(".adjUnitPrice").text(),customer.emailAddr,$('#orderInfo .orderNumber').text(),order.orderTotal.merchandiseSubTotal, cmStripIllegals(decodeURIComponent($(this).find('.coreMetric').text())));
			}
			cmShopCounter++;
			// trigger image request
			cmDisplayShop9s();
		});
	};
	var bagView = function(){
		if(!enabled)
			return false;
		var i;
		for(i=0; i<cmShopCounter;i++){
			var cm = new _cm("tid", "4", "vn2", "e3.1");
			cm.at = "5";
			cm.pr = cmShopIds[i]; 
			cm.pm = cmShopProducts[i];
			cm.cg = cmShopCats[i];
			cm.qt = cmShopQtys[i] ;
			cm.bp = cmShopPrices[i];
			cm.sx2 = cmShopBOQtys[i];
			cm.pc = "N";
			cm.writeImg();
		}
		cmShopCounter=0;
	};
	// 
	// cmCreateManualLinkClickTag
	//
	// ATB, View Bag (VSB), Checkout OPC
	// 
	// href:			item number (123456)
	//
	// name:			Item Name (item number) 
	//							ex: "low rise bottom (123456)"
	//
	var click = function(href, name, pageID){
		if(!enabled)
			return false;
		cmCreateManualLinkClickTag(href, name, pageID);
	};
	// 
	// lineNumber		string 
	// 
	// extraFields		
	// 				0	productID
	//				1	productName
	//				2	productQuantity
	//				3
	//				4
	//				5	categoryID
	//				6
	//				7	activityType
	//				8	pageID
	//				9	ctlgCode
	// 
	var customTag = function(lineNumber, extraFields) {
		if(!enabled)
			return false;
		var temp = extraFields.split("-_-");
		temp[1] = cmStripIllegals(temp[1]); // productName
		temp[5] = cmStripIllegals(temp[5]); // categoryID
		temp[9] = cmStripIllegals(temp[9]); // ctlgCode
		temp.join("-_-");
		cmCreateCustomTag(lineNumber, extraFields);
	};
	//
	// actionType: 	Number 1 or 2
	//					ex: 1 start
	//					ex: 2 finish
	// 
	// eventCategory:		
	// 
	// points:		Number up to 50,000
	//					- give an event more points ("weight" / "sorting" for reports)
	// 
	// attributes:	above
	// 
	// extraFields:	up to 5 extraFields
	//
	var event = function(eventID, actionType, eventCategory, points, attributes, extraFields){
		if(!enabled)
			return false;
		cmCreateConversionEventTag(eventID, actionType, eventCategory, points, attributes, extraFields);
	};

	// 
	// depricate -- use customTag
	// 
	// actionType: 
	//				
	// 
	var bagItemDealPriceEvent = function(productName, dealPricingMet, eventName, points, attributes){
		if(!enabled)
			return false;
		event(productName, dealPricingMet, eventName, points, attributes);
	};
	
	// 
	// Registration: user data
	// 
	// 	attributes: 		up to 50 "extra fields"
	//						11 - 15 can be defined as criteria in the segmentation workbench
	//						
	// 
	// 
	var registration = function(customerID, customerEmail, customerCity, customerState, customerZIP, customerCountry, attributes) {
		if(!enabled)
			return false;
		cmCreateRegistrationTag(customerID, customerEmail, customerCity, customerState, customerZIP, customerCountry, attributes);
	};
	var newsletter = function (customerEmail,newsletterName,subscriptionFlag, customerCity, customerState, customerZIP, gender) {
		if(!enabled)
			return false;
		cmCreateNewsletterTag(customerEmail,newsletterName,subscriptionFlag, customerCity, customerState, customerZIP, gender);
	}
	// 
	// 
	// 
	// 
	// 
	// 
	// extraFields:
	//					0 orderCoupon
	//					1 orderTax
	//					2 shippingDescription
	//					3 customerCountry 
	// 
	var order = function(orderID, orderTotal, orderShipping, customerID, customerCity, customerState, customerZIP, extraField1, extraField2, extraField3, country){
		if(!enabled)
			return false;
		cmCreateOrderTag(orderID, orderTotal, orderShipping, customerID, customerCity, customerState, customerZIP, extraField1, extraField2, extraField3, country)
	};
	var cmStripIllegals = function(s){
		if (typeof(s)=="undefined" || !s){return null;}
		var amparray = s.split(/&[^;]*;/);
	    	s = amparray.join("");    
	 	var retStr="";
		var bad="\t\r\n\"'$&*^,%™©®";
	    	for (var i=0;i<s.length;i++){
	       	   var c=s.charAt(i);
		   if (bad.indexOf(c)<0)
			retStr+=c;
	    }
	    return retStr;    
	};
	return {
		"pageView": pageView,
		"bagItemView": bagItemView,
		"bagItemViewMarkup": bagItemViewMarkup,
		"bagItemView9":bagItemView9,
		"bagView": bagView,
		"event": event,
		"customTag": customTag,
		"order": order,
		"newsletter": newsletter,
		"registration": registration,
		"click": click,
		"bagItemDealPriceEvent": bagItemDealPriceEvent
	}
}());
/*
 * VSD.Model
 */
VSD.Model = (function(){
	var get = function($element){
		
		// new model
		var model;
		
		// if a data-model does not have a class "name", it's an array [value]
		// if a data-model does have a class "name" it's an object name:value
		if($(".data-model:first>span", $element).attr("class") ==  "")
			model = [];
		else
			model = {};
		
		// for each $element>data-model>span
		$.each( $(".data-model:first", $element).children("span"), function(i, el){
			
			// cache span as property
			$prop = $(el);
			
			// if $element>data-model>span>span, 
			// then property is an object
			if( $prop.children("span").size() > 0){
				// set property name to a new object
				model[$.trim($prop.attr("class"))] = get( $prop );
			}else if($prop.attr("class") == ""){
				// push value into array
				model.push($.trim($prop.text()));
			}else{
				// set property name and value
				model[$.trim($prop.attr("class"))] = _varHelper( $.trim( $prop.text() ) );
			}
		});
		
		// return model object
		return model;
	};
	var _varHelper = function(value){
		if(value == "true" || value == "false"){
			return value == "true";
		} else if(value == "null") {
			return null
		}
		return value;
	};
	return {
		"get": get
	}
}());
/*
 * VSD.Loader
 */
VSD.Loader = (function(){
	var live = function(){
		// cogloader
		$('button.ui-loader',$body).live(VSD.UI.CLICK, function(){ 
			show( $(this) ); 
		});
		$('.ui-textloader',$body).live(VSD.UI.CLICK, function(){ 
			showTextloader( $(this) );
		});
	};
	var show = function( $el, type, offset ){
		if( $el.hasClass("loading") ) { return true };
		// check for optional type
		if(type){
			switch(type)
			{
				case "item" : showRemoveItemLoader($el, offset); break;
				case "cog" : showCogloader($el, offset); break;
				case "text" : showTextloader($el, offset); break;
				default: // do nothing
			}
		}
		// show loader based on it's class
		else {
			if($el.is(".item")){
				showRemoveItemLoader($el, offset)
			}
			if($el.is(".ui-loader")){
				showCogloader($el, offset);
			}
			if($el.is(".ui-textloader")){
				showTextloader($el, offset);
			}
		}
	};
	var hide = function( $el, type ){
		// check for optional type
		if(type){
			switch(type)
			{
				case "removeItem" : hideRemoveItemLoader($el)
				case "textLoader" : hideTextloader($el);
				break;
				default: // do nothing
			}
		}
		// show loader based on it's class
		else {
			if($el.is(".item")){
				hideRemoveItemLoader($el)
			}
			if($el.is(".ui-loader")){
				hideCogloader($el);
			}
			if($el.is(".ui-textloader")){
				hideTextloader($el);
			}
		}
	};
	var showRemoveItemLoader = function( $el, offset ){
		offset = $.extend({top:0,left:0,height:0,width:0}, offset);
		$el.addClass("loading").css({"position":"relative"});
		$el.append('<div class="ui-remove-item-loader"><span></span><em></em></div>');
		// padding support
		if ($el.hasClass("bagitem-last")) {
			$(".ui-remove-item-loader").css({
				"top": $el.innerHeight() - $el.height() + offset.top,
				"left": $el.innerWidth() - $el.width() + offset.left
			});
			$(".ui-remove-item-loader span",$el).css({
				"width": $el.width() + offset.width,
				"height": $el.height() - offset.top
			});
		} else {
			$(".ui-remove-item-loader").css({
				"top": $el.innerHeight() - $el.height() + offset.top,
				"left": $el.innerWidth() - $el.width() + offset.left
			});
			$(".ui-remove-item-loader span",$el).css({
				"width": $el.width() + offset.width,
				"height": $el.height() + offset.height
			});
		}
		$(".ui-remove-item-loader em",$el).css({
			"left": ($el.width()) / 2 - 13,
			"top": ($el.height()) / 2 - 13
		});
	};
	var hideRemoveItemLoader = function ( $el ) {
		$(".ui-remove-item-loader em", $el).remove();
		$el.removeClass("loading").css({"position":""});
	};
	/** 
	* place textloader in DOM when ui-textloader
	* @memberOf VSD.UI
	*/
	var showTextloader = function( $el ){
		var loader = $('<span class="ui-textloader spinner ui-layer"></span>');
		var leftMod = 5;
		var topMod = 5;
		$el.append('<span class="ui-textloader spinner ui-layer"></span>')
			.css("position", "relative")
			.addClass("loading")
				.find(".spinner")
				.css({
					left:$el.outerWidth() + leftMod,
					top:$el.outerHeight()/2 - topMod
				});
	};
	/** 
	* remove textloader from DOM
	* @memberOf VSD.UI
	*/
	var hideTextloader = function($el){
		$(".spinner", $el).remove();
		$el.removeClass("loading").css({"position":""});
	}
	/** 
	* place cogloader image on a <button>
	* @memberOf VSD.UI
	*/
	var showCogloader = function($el){
		var right,top;
		if (VSD.Client.isOpera() || VSD.Client.isIE7() || VSD.Client.isWebkit() || (VSD.Client.isIE9() && !VSD.Client.isIE8())) {
			right = 10;
			top = 11;
		} else if (VSD.Client.isFF()) {
			right = 32;
			top = -3;
		} else {
			right = 10;
			top = -1;
		}
		$el.attr("disabled","disabled")
			.attr("autocomplete","off")
			.addClass("btn-cog-loading")
			.append('<em style="right:' + right + 'px;top:' + top + 'px;" class="btn-cog"></em>');
	};
	/** 
	* remove cogloader image from a <button>
	* @memberOf VSD.UI
	*/
	var hideCogloader = function($el){
		setTimeout(function(){
			$($el).removeAttr("disabled")
				.removeClass("btn-cog-loading")
				.find("em")
					.remove();
		},300);
	};
	return {
		"show": show,
		"hide": hide,
		"live": live
	}
}());
/*
 * VSD.Page
 */
VSD.Page = (function(){
	var page = new Array();
	var init = function(pageObject){
		$("body").page(pageObject);
	};
	return {
		"init": init
	}
}());
/*
 * VSD.Panel
 */
VSD.Panel = (function(){
	var init = function(selector){
		VSD.UI.initSelectmenus(selector);
		VSD.Cufon.initOn(selector);
		VSD.UI.tooltip(selector);
		VSD.Forms.init(selector);
	};
	var focus = function(){
		// focus on the first input
		$(":input", ".panel-open:visible").each(function(){
			// do not set focus on hidden input
			// do not set focus on non selects that are hidden
			if( $(this).is("input:hidden") || ($(this).is("select") == false && $(this).is(":visible") == false) ){
				return true;
			}
			// select
			else {
				if($(this).is("select") && !VSD.Client.isIOS()){
					$(this).data("button").trigger("focus");
				}
				else {
					$(this).trigger("focus");
				}
				return false;
			}
		});
	};
	return {
		"init": init,
		"focus": focus
	}
}());
/*
 * VSD.PopUpWindows
 */
VSD.PopUpWindows = (function(){
	var init = function(){
		$.fn.popUp = function (settings) {
			$(this).bind('click touchstart keyup', function (event) {
				event.preventDefault();
				if (event.type != 'keyup' || event.keyCode == 13) {
					vsPopUp($(this).attr('href'),$(this).attr('rel'),settings);
				}
			});

		};
	};

	return {
		"init": init
	};
}());

/*
 * VSD.Product
 */
VSD.Product = (function(){
	var mainDesc,mainDescTxt = "",loaderImage,loaderInterval,loaderSpinnerInterval,mailTitle;
	
	var init = function(){
		// add rollover image borders for .alt-images-wrap
		jQuery("span.thumb", "#altImages").each(function(){
			initAltImage(jQuery(this));
		});
		
		// select first image
		jQuery(".item-first","#altImages").find("a").addClass("selected");
		
		// set mailto link
		jQuery("#mailtolink").each(function(){
			setMailToHref(jQuery(this))
		});
	};
	
	var setMailToHref = function(link){
		mailTitle = link.attr("title");
		mailTitle = mailTitle.replace("&trade;","(TM)");
		mailTitle = mailTitle.replace("&#153;","(TM)");
		mailTitle = mailTitle.replace("&copy;","(C)");
		mailTitle = mailTitle.replace("&#211;","(C)");
		mailTitle = mailTitle.replace("&reg;","(R)");
		mailTitle = mailTitle.replace("&#174;","(R)");
		mailTitle = mailTitle.replace("&#39;","'");
		mailTitle = mailTitle.replace("&#38;","and");
		link.attr("title",'');
		var mailtolink = "mailto:?subject="+mailTitle+"&body=I found this on VictoriasSecret.com and thought you might like it too:%0d";
		var href = escape(window.location.href);
		if(typeof producteditflag!=="undefined" && producteditflag!=null && producteditflag=="true"){
			href="http://"+escape(window.location.hostname)+producteditHref;
			href=escape(href);              
		}
		link.attr("href",mailtolink + href);
	};
	
	var liveAltImage = function() {
		$("a.alt-item-wrap", "#altImages").live(VSD.UI.CLICK, function (e) {
			if(!$(this).hasClass("selected")){
				var altView = $(this).find('img').attr("src").replace("tmbsm","prodpri2");
				e.preventDefault();
				replaceImage("vsImage",altView,true,true);
				$(this).trigger('select');				
			}
			return false;
		}).live('mouseover focus touchstart', function(){
				jQuery('a.alt-item-wrap.hover').removeClass("hover");
				$(this).addClass("hover");
				var img = $(this).find('img');
				var title = img.attr("title");
				var imgWidth = img.width();
				var imgHeight = img.height();
				var hoverWidth = imgWidth-6;
				var hoverHeight = imgHeight-6;
				$(this).find('span.thumb').width(hoverWidth).height(hoverHeight);
				mainDesc.html(title);
				$(this).bind("mouseout",function () {$(this).trigger('blur');$(this).unbind("mouseout");});
		}).live('blur', function(){
				$(this).removeClass("hover");
				if(!$(this).hasClass("selected")) {
					var img = $(this).find('img');
				var title = img.attr("title");
					var imgWidth = img.width();
					var imgHeight = img.height();
					var hoverWidth = imgWidth-6;
					var hoverHeight = imgHeight-6;
					$(this).find('span.thumb').width(imgWidth).height(imgHeight);
						}
						mainDesc.html(mainDescTxt);
		}).live('select', function(){
			if(!$(this).hasClass("selected")){
				var img = $(this).find('img');
				var title = img.attr("title");
				var imgWidth = img.width();
				var imgHeight = img.height();
				var hoverWidth = imgWidth-6;
				var hoverHeight = imgHeight-6;
							mainDesc.html(title);
							mainDescTxt = title;
							jQuery(".selected","#altImages").removeClass("selected").trigger('mouseout');
				$(this).find('span.thumb').width(hoverWidth).height(hoverHeight);
				$(this).addClass("selected");
						}
				});
	};
	
	
	var initAltImage = function(span){
	
		var img = span.find("img");
		span.wrap('<a href="' + img.attr("src").replace("tmbsm","prodpri2") + '" class="alt-item-wrap" name="altImage" tabindex="0" />');
		var a = span.parent();
		
		// set the mainDesc
		mainDesc = jQuery("span","#mainViewDescription");
		
	};
	
	var replaceImage = function(oldImageId,newImageUrl,showLoader, showZoom){
		
		var origImg = $("#"+oldImageId),offset,width,height,loaderBgLeft;
		
		if(showLoader && !VSD.Client.isIE6()) {
		
			// get position to place absolutely on the page
			offset = origImg.offset();
			width = origImg.width();
			height = origImg.height();
			loaderBgLeft = 0;
			
			// make loader
			if(typeof loaderImage==="undefined"){
				loaderImage = jQuery('<div id="loaderImage" class="image-loader-container" />');
				$body.append(loaderImage);
			}
			
			// move and show
			loaderImage.css({
				top: (offset.top + height/2) - 21,
				left: (offset.left + width/2) - 21
			});
			
			// wait 1 second to show the loader
			loaderInterval = setInterval(function(){
				// only run this once
				clearInterval(loaderInterval);
				// show loader
				loaderImage.show();
				// "spin" = move the background
				loaderSpinnerInterval = setInterval(function(){
					loaderBgLeft-=48;
					if(loaderBgLeft<=12*-48){ loaderBgLeft=0 }
					loaderImage.css("background-position",loaderBgLeft+"px 0");
				},60);
				
			},1000); 
		}
		
		var img = new Image();
		
		$(img)
		.load(function () {
			// hide loader
			clearInterval(loaderInterval);
			clearInterval(loaderSpinnerInterval);
			if(typeof loaderImage!=="undefined"){
				loaderImage.hide();
			}
			// fade new image into the dom
			var newImage = $(this);
			newImage.hide();
			origImg.after(newImage);
			newImage.fadeIn("fast",function(){
				$("#"+oldImageId).remove();
				newImage.attr("id",oldImageId);
			}).unbind('load');
			// stops bubbling in ie
			return false;
		})
		.error(function () {
			// notify the user that the image could not be loaded
		})
		.attr('src', newImageUrl);
		
		if(typeof showZoom === "undefined"){
			showZoom = false;
		}	
	
		if(showZoom) {	
			VSD.Product.ProductZoom.changeImage({				
					largeImgSrc: newImageUrl.replace("prodpri2", "prodzoom"), 
					enabled: showZoom, 
					type: "click"
			});	
		}
	};

	var updateOptions = function(keys,values,selectname){
		$('select[name="'+selectname+'"]').find('option:eq(1)')
			.remove()
	    	.end();
	
		var key = keys.split(":");
		var val = values.split(":");
		
		$.each(key,function(i,keyValue){
			if(keyValue!=""&&keyValue!=null&&keyValue.length>0)
				$('select[name="'+selectname+'"]').append('<option value="'+keyValue+'">'+val[i]+'</option>');
		});
	};
	
	return {
		"init": init,
		"liveAltImage": liveAltImage,
		"replaceImage":replaceImage,
		"updateOptions": updateOptions
	};
}());
/*
 * VSD.Session
 */
VSD.Session =(function(){
	var init = function(){
		
	}
	var keepalive = function(){
		var NavbarCookie = getVSCookie("NAVBAR");
		NavbarCookie = NavbarCookie.replace(/"/g,"");
		if (NavbarCookie.indexOf('%2C') != -1) { NavbarCookie = NavbarCookie.replace("%2C",",") };
		if(NavbarCookie!="" && NavbarCookie.split(",")[0].length>0 && window.location.host.indexOf('developer') == -1){
			$.ajax({
				type: 'GET',
				url: '/commerce/keepalive'
			});
		}
	};
	return {
		"init": init,
		"keepalive": keepalive
	}
}());
/*
 * VSD.ProductZoom
 */
VSD.Product.ProductZoom = (function(){
	var init = function(){
			
	};
	
	var changeImage = function(options){
		/*
		$("#zoom-lens-container").remove();
		
		$(function() {										
			$("#mainView").anythingZoomer({        									
				largeImgSrc: options.largeImgSrc,
				width: (options.width == null ? Enum_ZoomDefaults.width : options.width),
				height: (options.height == null ? Enum_ZoomDefaults.height : options.height),
				enabled: (options.enabled == null ? Enum_ZoomDefaults.enabled : options.enabled),
				type: (options.type == null ? Enum_ZoomDefaults.type : options.type),
				speedX:(options.speedX == null ? Enum_ZoomDefaults.speedX : options.speedX),
				speedY:(options.speedY == null ? Enum_ZoomDefaults.speedY : options.speedY)
			});													
		});
		*/
	};
	
	return {
		"init": init,		
		"changeImage": changeImage
	};
	
}());
/*
 * VSD.Product.Swatch
 */
VSD.Product.Swatch = (function(){
	
	var dispSwatch = false;
	var mainSwatchActive = false;
	var mainSwatchContainer = "swatchContainer0";		
	var swatchBoxHeight = 0;
	
	var showSwatch = function(index){
		dispSwatch=true;
		// $('#DivShim').show();
		$('#SwatchBox').show();
		$('#SwatchBox').show();
	};
	
	var init = function(){
		// init swatch box
		if($("#SwatchBox").hasClass("SwatchBox") == false){
			makeSwatchBox();
		}
		
		// init hover over borders
		$(".swatch").hover(function () {
			$(this).children(":first").css("display","block");
		},
		function () {
			$(this).children(":first").css("display","none");
		});
		
	};
	
	var makeSwatchBox = function(){
		var swatchBox = $('<div class="SwatchBox" id="SwatchBox" />');
		var swatchBoxHTML ='<div class="SwatchBoxImg" id="SwatchBoxImg" />'  + 
						   '<div class="SwatchBoxText" id="SwatchBoxText">' +
						   		'<div class="SwatchBoxColorDesc" id="SwatchBoxColorDesc" />' + 
						   '</div>';
		
		// var swatchIFrame = $('<iframe class="DivShim" id="DivShim" src="javascript:false;" scrolling="no" frameborder="0" style="position:absolute; top:0px; left:0px; display:none;"></iframe>');		
		swatchBox.append(swatchBoxHTML).appendTo($body); //.after(swatchIFrame);
		if(VSD.Client.isIE()){			
			VSD.UI.ieShadow("#SwatchBox");				
		}	
	};
	
	var move = function(index, swatchDiv, colorDesc, img, isSaico){
		if(swatchDiv.parentNode.id === mainSwatchContainer){
			mainSwatchActive = true;
		}
		moveSwatchWide(index, swatchDiv, colorDesc, img, isSaico);
	};
	
	var doHideSwatch = function(){
		if(!dispSwatch){
			// $('#DivShim').hide();			
			$('#SwatchBox').hide().removeClass("SwatchBox-on");
		}
	};
	
	var hide = function(index,swatchDiv){
		dispSwatch=false;
		mainSwatchActive = false;
		setTimeout(function(){doHideSwatch();},300);
	};		
	
	var moveSwatchWide = function(index, swatchDiv, colorDesc, img, isSaico){
		
		var arrColorDesc 			= colorDesc.split("-");
		var imgTag           		= $('<img src="' + VSD.imgUrl + '/qa/product/swatchlg/' + img + '.jpg" alt="' + arrColorDesc[1] + '" />');
		var swatchContainer 		= $('#swatchContainer' + index);		
		var swatchBox  				= $('#SwatchBox');
		
		showSwatch(index);
		
		colorDescHTML = '<span>' + arrColorDesc[1] + '</span> (' + arrColorDesc[0] + ')';
		
		// Show HTML			
		$('#SwatchBoxImg').html(imgTag);
		$('#SwatchBoxColorDesc').html(colorDescHTML);
				
		// position swatchbox
		var swatchObj = $(swatchDiv);
	    var swatchContainerPos = swatchContainer.offset();
	    
	    var swatchPos = swatchObj.offset();	    
	    var leftPos = swatchPos.left;
	    var swatchBoxHeight = $('#SwatchBox').outerHeight();
	    
	    var topPos = swatchContainerPos.top - swatchBoxHeight - 10;
	    
	    swatchBox.addClass("SwatchBox-on")
	    	.css({"left": leftPos, 
			   "top": topPos, 
			   "position": "absolute", 
			   "z-index": "9999" 
		});
	    
	    if(VSD.Client.isIE()){			
			VSD.UI.ieShadow("#SwatchBox");				
		}	
		
	    /*
		$('#DivShim').css({
			"left": leftPos, 
			"top": topPos, 
			"position": "absolute"
		});
		*/
	};
	
	return {
		"init": init,
		"hide": hide,
		"move": move
	};
}());
/*
 * Selectmenu
 */
VSD.Selectmenu = (function(){
	var SELECT = ".ui-select.pre-rendered";
	var BUTTON = ".ui-selectmenu.pre-rendered";
	var MENU = ".ui-selectmenu-menu.pre-rendered";
	var MENU_ITEM = ".ui-selectmenu-menu.pre-rendered p";
	var MENU_OPTION = ".ui-selectmenu-menu.pre-rendered a";
	var MENU_MAXHEIGHT = 275;
	var ACTIVE_CLASS = "ui-state-hover"
	var live = function(){
		
		// button
		$(BUTTON).live({
			mousedown: function(e){
				e.preventDefault();
				VSD.Selectmenu.toggleMenu( $(this) );
			},
			focus: function(e){
				//e.preventDefault();
				VSD.Selectmenu.buttononfocus( $(this) );
			},
			blur: function(e){
				e.preventDefault();
				VSD.Selectmenu.buttononblur( $(this) );
			},
			keydown: function(e){
				return VSD.Selectmenu.buttononkeypress( $(this), e );
			},
			mouseover: function(e) {
					buttonhover($(this));
					$(this).bind("mouseout", function(e) {
						$(this).trigger('blur');
						$(this).unbind("mouseout");
					});
			}
			
		});
		
		// menu
		$(MENU_OPTION).live("click", function(e){
			e.preventDefault();
			// overloaded optiononchoose to close the menu
			VSD.Selectmenu.optiononchoose( $(this), true );
		});
		
		$(MENU_OPTION).live("keypress", function(e){
			e.preventDefault();
		//	return VSD.Selectmenu.optiononkeypress( $(this), e );
		});
		
		
		$(MENU_ITEM).live({
			mouseover: function(e){
				e.preventDefault();
				VSD.Selectmenu.optiononfocus( $(this) );
				$(this).bind("mouseout", function(e){
				e.preventDefault();
				VSD.Selectmenu.optiononblur( $(this) );
					$(this).unbind("mouseout");
				});
			},
			keydown: function(e){
				return VSD.Selectmenu.optiononkeypress( $(this), e );
			}
		});
	};
	var initButton = function($button, menuToBody)
	{ 
		// public properties of a button, select, and menu
		$button.data("ready", true);
		$menu = $("#"+$button.attr("aria-owns"));
		
		// set menu
		if( menuToBody ){
			$button.data("menu", $menu.clone(true).appendTo('body') );
			$menu.remove();
		} else {
			$button.data("menu", $menu );
		}
		$button.data("select", $("#"+$button.attr("aria-labelledby")));
		$button.data("select").data("menu", $button.data("menu"));
		$button.data("select").data("button", $button);
		$button.data("menu").data("select", $button.data("select"));
		$button.data("menu").data("button", $button);
		$button.data("selected", $(":selected", $button.data("select")));
		// public method of button
		$button.data("toggleMenu", function(e){
			// if click is not a child of button and not button and not a child of menu && menu is open
			// close it
			if( $(e.target).parents( "#"+$button.attr("id") ).length == 0 
				&& !$(e.target).is( "#"+$button.attr("id") )
				&& $(e.target).parents("#"+$button.data("menu").attr("id")).length == 0
				&& $button.data("menu").data("open"))
			{
				VSD.Selectmenu.toggleMenu( $button );
			}
		});
	}
	var setMenuWidth = function($button){
		// set width
		if( $button.innerWidth()>$button.data("menu").innerWidth() )
			$button.data("menu").width( $button.innerWidth() );
		// add scrollbar
		if( $("p", $button.data("menu")).size() > 11 )
			$button.data("menu").height(MENU_MAXHEIGHT);
	};
	var touchSelect = function($select){
		$select.next(".ui-select").remove();
		$select.next(".ui-selectmenu-menu").remove();
		$select.show();
	};
	var toggleMenu = function($button)
	{
		if( !$button.data("ready") ){ VSD.Selectmenu.initButton( $button );	}
		
		setMenuWidth($button);
		
		if( $button.data("menu").data("open") ){
			$button.data("menu").css("visibility", "hidden").hide();
			$button.data("menu").data("open", false);
			$("html").die("click", $button.data("toggleMenu"));
			VSD.Selectmenu.buttononblur( $button );
			$button.focus();
		}else{
			$button.data("menu").data("open", true);
			// TODO: window resize-live window resize to position
			$button.data("menu").css({
				"top": $button.offset().top + $button.outerHeight() -1,
				"left": $button.offset().left,
				"visibility": "visible"
			}).show();
			$("html").live("click", $button.data("toggleMenu"));
			
			var currentIndex = $('#'+$button.attr('id').replace('Button','Menu')+' .selected-value').index();
			if(currentIndex==-1) {currentIndex=0;}
			var currentOption = $('#'+$button.attr('id').replace('Button','Menu')+' p a').eq(currentIndex);					
			
			VSD.Selectmenu.optiononfocus( currentOption.parent('p') );
			$(currentOption).focus();
		}
		return $button;
	};
	var typeAhead = function($button, code)
	{	
		var self = $button;		
		var firstOption=0;
		var firstIndex=0,lastIndex=0;
		//define self._prevChar if needed
		if(!self.data("_prevChar")){ self.data("_prevChar",''); self.data("_prevCharIndex",0); }
		var C = String.fromCharCode(code);
		c = C.toLowerCase();
		var focusFound = false;
		function focusOpt(elem, ind){
			focusFound = true;
			VSD.Selectmenu.optiononfocus($(elem).parent('p'));
			VSD.Selectmenu.optiononchoose($(elem),false);
			scrollIfNeeded($(elem),$button);
			self.data("_prevCharIndex", ind);
		};
		var Options = $($button.data("menu")).find('p a').filter(function () {
			var ta_regex= '^'+C;var ta_regex2= '^'+c;
			return ($(this).text().match(ta_regex) || $(this).text().match(ta_regex2));			
		});
		var numOptions = Options.length;
		
		firstOption = Options[0];
		var lastOption = Options[Options.length-1];
		firstIndex = $(firstOption).attr('tabindex');
		lastIndex = $(lastOption).attr('tabindex');	
		var veryLastIndex= $($button.data("menu")).find('p a:last').attr('tabindex');		
				
		$($button.data("menu")).find('p a').each(function(i){
			if (i > lastIndex && !focusFound && C==self.data("_prevChar") && firstIndex!=0) {	
				focusOpt(firstOption,firstIndex);
				self.data("_prevCharIndex", firstIndex);				
			}	
			if(!focusFound){
				var thisText = $(this).text();
				if( thisText.indexOf(C) == 0 || thisText.indexOf(c) == 0){				
						if(self.data("_prevChar") == C){
							if(self.data("_prevCharIndex") < i){ 
								focusOpt(this,i);						
								}														
						}						
						else{focusOpt(this,i); }
				}
			}
		});	
		
		if(self.data("_prevCharIndex")==veryLastIndex && !focusFound && C==self.data("_prevChar") && firstIndex!=0) {focusOpt(firstOption,firstIndex);}
		self.data("_prevChar",C);		
	};
	var buttonhover = function($button){
		$button.addClass("ui-state-hover");
	};
	var buttononfocus = function($button){
		if( !$button.data("ready") ){ VSD.Selectmenu.initButton( $button );	}
		$button.addClass("ui-state-hover");
		setMenuWidth($button);
	};			
	var buttononblur = function($button){
		if( !$button.data("ready") ){ VSD.Selectmenu.initButton( $button );	}
		$button.removeClass("ui-state-hover");
		setMenuWidth($button);
	};
	
	var optiononkeypress = function($option, event){
		var ret = true;
		switch (event.keyCode) {
			case $.ui.keyCode.UP:
			case $.ui.keyCode.LEFT:
				ret = false;
				optionnextOption($option.parents(MENU).data("button"),-1);								
				break;
			case $.ui.keyCode.DOWN:
			case $.ui.keyCode.RIGHT:
				ret = false;
				optionnextOption($option.parents(MENU).data("button"),1);				
				break;	
			case $.ui.keyCode.HOME:
				ret = false;
				event.preventDefault();
				optionfirstOption($($option.parents(MENU).data("button")));
				break;	
			case $.ui.keyCode.PAGE_UP:
				ret = false;
				event.preventDefault();
				// self._scrollPage('up');
				break;	
			case $.ui.keyCode.PAGE_DOWN:
				ret = false;
				event.preventDefault();
				// self._scrollPage('down');
				break;
			case $.ui.keyCode.END:
				ret = false;
				optionlastOption($option.parents(MENU).data("button"));
				break;			
			case $.ui.keyCode.ENTER:
			case $.ui.keyCode.SPACE:
				ret = true;
				event.preventDefault();
				optiononchoose( $option.parent('.listContainer').children('.ui-state-hover').children('a'), true );											
				break;		
			case $.ui.keyCode.TAB:
				ret = true;
				toggleMenu($option.parents(MENU).data("button"));
				break;	
			case $.ui.keyCode.ESCAPE:
				ret = false;
				toggleMenu($option.parents(MENU).data("button"));
				break;	
			default:
				ret = false;
				typeAhead($($option.parents(MENU).data("button")),event.keyCode);
				break;
		}
		return ret;
		
	};
	
	var buttononkeypress = function($button, event){
		var ret = true;
		
		switch (event.keyCode) {
			case $.ui.keyCode.ENTER:
				ret = true;
				break;
			case $.ui.keyCode.SPACE:
				ret = false;
				toggleMenu($button);
				break;
			case $.ui.keyCode.UP:
			case $.ui.keyCode.LEFT:
				ret = false;			
				optionnextOption ( $button, -1 );
				break;
			case $.ui.keyCode.DOWN:
			case $.ui.keyCode.RIGHT:
				ret = false;
				optionnextOption ( $button, 1 );
				break;
			case $.ui.keyCode.TAB:
				ret = true;
				break;
			default:
				ret = false;
				typeAhead($button,event.keyCode);
				break;
		}
		return ret;
	};
	
	var optionnextOption = function($button, direction){		
		var nextOption="";		
		var currentFocus = $('#'+$button.attr('id').replace('Button','Menu')+' .ui-state-hover').index();						
		if(currentFocus==-1) {currentFocus = $('#'+$button.attr('id').replace('Button','Menu')+' .selected-value').index();	}				
		if(currentFocus==-1) {nextOption = $('#'+$button.attr('id').replace('Button','Menu')+' p a:first');	}
		else {nextOption = $('#'+$button.attr('id').replace('Button','Menu')+' p a').eq(currentFocus+direction);}		
		if(nextOption.length>0 && !(currentFocus==0 && direction<0)) {			
			optiononfocus(nextOption.parent('p'));optiononchoose(nextOption);
			scrollIfNeeded(nextOption,$button);				
		}
		
	};
	
	var scrollIfNeeded = function ($option,$button) {
		var nextOptionTop=$($option).position().top;
		var menuHeight=$($button.data("menu")).height();
		var optionHeight=$($option).outerHeight();
		var currentScrollTop=$($button.data("menu")).scrollTop();
		if(nextOptionTop>=menuHeight && nextOptionTop<=(menuHeight+optionHeight) ) {
			$($button.data("menu")).scrollTop(currentScrollTop+optionHeight);
			return true;
		}
		else if(nextOptionTop>=menuHeight && nextOptionTop>(menuHeight+optionHeight)) {
			$($button.data("menu")).scrollTop(nextOptionTop-menuHeight+optionHeight);
			return true;
		}
		else if (nextOptionTop<0 && nextOptionTop>=(-optionHeight)) {
			$($button.data("menu")).scrollTop(currentScrollTop-optionHeight);
			return true;
		}	
		else if (nextOptionTop<0 && nextOptionTop<(-optionHeight)) {
			$($button.data("menu")).scrollTop(currentScrollTop+nextOptionTop);
			return true;
		}
		return false;
	}
	
	var optionfirstOption = function($button){		
		var nextOption = $('#'+$button.attr('id').replace('Button','Menu')+' p a:first');	
		if(nextOption.length>0) {optiononfocus(nextOption.parent('p'));optiononchoose(nextOption.parent('p'));}	
	};
	
	var optionlastOption = function($button){		
		var nextOption = $('#'+$button.attr('id').replace('Button','Menu')+' p a:last');	
		if(nextOption.length>0) {optiononfocus(nextOption.parent('p'));optiononchoose(nextOption.parent('p'));}	
	};
	
	var optiononchoose = function($option, toggle){
		if(toggle) { toggleMenu( $option.parents(MENU).data("button") ); }
		
		$option.parents(MENU).data("button")
			.find(".ui-selectmenu-status")
			.html( $option.html() );
		
		$("#"+$option.parents(MENU).attr("aria-owns")+" option").not('.ui-selectmenu-value')
			.eq($option.attr("tabindex"))
			.attr("selected", "selected");
		
		$($option.parents(MENU)).find('.ui-selectmenu-value').removeClass('selected-value');
		$($option.parents(MENU)).find('.ui-selectmenu-value').eq($option.attr("tabindex")).addClass("selected-value");
		$("#"+$option.parents(MENU).attr("aria-owns")).trigger('change');
	};
	var optiononfocus = function($option){
		$(".ui-state-hover", $option.parents(MENU)
			.data("focused", true))
			.removeClass("ui-state-hover");
		$option.addClass(ACTIVE_CLASS);
	};
	var optiononblur = function($option){
		$option.removeClass(ACTIVE_CLASS);
		$($option.parents(MENU)).data("focused", false);
		setTimeout(function(){
			if($($option.parents(MENU)).data("focused") == false){
				$("p", $option.parents(MENU))
					.eq($(":selected", $option.parents(MENU).data("select")).index())
					.addClass(ACTIVE_CLASS);
			}
		},10);
	};
	var menuonblur = function($menu){
		$(":selected", $menu.data("select")).addClass(ACTIVE_CLASS);
	};
	var getButtonClass = function(){
		return BUTTON;
	};
	var destroy = function($select){
		$select.data("menu").remove();
		$select.data("button").remove();
	};
	var destroyAll = function(context){
		if($(SELECT, context)[0] && !VSD.Client.isIOS()){
			$(SELECT, context).data("menu").remove();
		}
	};
	var refresh = function($select){
		if($select[0] && $select.data("menu")){
			$select.data("menu").each(function(){
				optiononchoose( $("p", this).eq( $(":selected", $select).index() ).find("a") );
			});
		}
	};
	var reset = function($select){
		if(!VSD.Client.isIOS()){
			optiononchoose( $( "a:first", $select.data("menu") ) );
		} else {
			$("option:first-child", $select).attr("selected", "selected");
		}
	};
	return {
		"live": live,
		"initButton": initButton,
		"toggleMenu": toggleMenu,
		"buttononfocus": buttononfocus,
		"buttononblur": buttononblur,
		"buttononkeypress": buttononkeypress,
		"optiononchoose": optiononchoose,
		"optiononfocus": optiononfocus,
		"optiononblur": optiononblur,
		"optiononkeypress": optiononkeypress,
		"menuonblur": menuonblur,
		"getButtonClass": getButtonClass,
		"destroy": destroy,
		"destroyAll": destroyAll,
		"touchSelect": touchSelect,
		"refresh": refresh,
		"reset": reset
	}
}());
/*
 * VSD.SuperSleight
 */
VSD.SuperSleight = (function(){
	if (location.protocol == "https:") {
		var shim = VSD.swww + "/themes/base/candice/graphics/x.gif";
	} else {
		var shim = VSD.www + "/themes/base/candice/graphics/x.gif";
	}

	var init = function(selector) {
		if (selector) jQuery(selector).supersleight({"shim": VSD.SuperSleight.shim});
	};
	
	var undo = function(jqElement){
		jqElement.removeClass("hover").css({"filter": "", "background-image": ""});
	};
	
	return {
		"init": init,
		"undo": undo,
		"shim": shim
	};
}());

/*
 * VSD.Transition (class for handling transition to candice)
 */
VSD.Transition = (function(){
	
	var init = function(){
		jQuery("div.row-l").addClass("grp");
		
		// checkout page
		if(jQuery(".page-sequence").length > 0){
		
			jQuery("body > div[align='center']").attr("style", " ");
			jQuery("body > div[align='center'] > div").attr("style", " ");
			jQuery("body > div[align='center'] > div > div[id='header']").attr("id", "").attr("style", " ");
			
			jQuery("#entire").attr("style", " ");
			jQuery("#entire > div").attr("style", " ");
			jQuery("#entire > div > #headercontainer").attr("style", " ");
		}
		
		$body.css({
			"width": "auto",
			"height": "auto"
		});
		

		if(document.getElementById("headercontainer")){
			jQuery("#headercontainer").css({
				"width": "auto"
			});
		}
		
		if(document.getElementById("header")){
			jQuery("#header").css({
				"width": "auto"
			});
			
			if(jQuery("#header").parent("div[align='center']").length > 0){
				jQuery("#header").parent("div[align='center']").css({
					"margin-left": "0",
					"margin-right": "0"
				});
			}
			
			if(jQuery("#header").parent("div[id='wrapper']").length > 0){
				jQuery("#header").parent("div[id='wrapper']").css({
					"width": "auto"
				});
				
				if(jQuery("div.row-l").length > 0){
					jQuery("div.row-l").css({
						"width": "948px",
						"margin": "20px auto 0 auto"
					});
					
					
				}
			}
		}
		
		if(document.getElementById("bodycontainer")){
			jQuery("#bodycontainer").css({
				"float": "none",
				"margin": "0 auto"
			});
			
			if(jQuery("#bodycontainer").parent("div").length > 0){
				if(jQuery("#bodycontainer").parent("div").css('width') == "947px"){
					jQuery("#bodycontainer").parent("div").css({
						"width": "100%"
					});
				}
			}
			
			if(jQuery("#bodycontainer").parent("div").parent("div").length > 0){
				jQuery("#bodycontainer").parent("div").parent("div").css({
					"margin": "0"
				});
			}
			
			jQuery("#bodycontainer table tbody tr td div.headings").css({"padding-top": "40px"});
			jQuery("div.leftNavContainer h1.category-header").css({"margin-bottom": "20px"});
		}
		
		
		
		if(document.getElementById("footercontainer")){
			jQuery("#footercontainer").css({
				"width": "auto"
			});
		
			if(document.getElementById("footer")){
				jQuery("#footer").css({
					"float": "none",
					"width": "auto",
					"text-align": "left"
				});	
			}
		}
	};
	
	return {
		"init": init
	};
}());
/** 
* UI
* @memberOf VSD
* @namespace
* @returns {Method} init
* @returns {Method} initImages
* @returns {Method} initSelectmenus
* @returns {Method} initSelectmenuById
* @returns {Method} selectmenu
* @returns {Method} newoptions
* @returns {Method} destroySelectmenus
* @returns {String} imagebase
* @returns {int} hovertimeout
* @returns {Method} HOVERON
* @returns {Method} HOVEROUT
* @returns {Method} CLICK
* @returns {Method} table
* @returns {Method} tooltip
* @returns {Method} scrollbar
* @returns {Method} scrollbarOff
* @returns {Method} removeScrollbarHack
* @returns {Method} ieShadow
*/
VSD.UI = (function(){
	/**
	* define VSD hoverover events
	* @type string
	*/
	var HOVERON = "mouseover touchstart keyup focus";
	/**
	* define VSD hoverout events
	* @type string
	*/
	var HOVEROUT = "mouseout touchend keyup blur";
	/**
	* define VSD click events
	* @type string
	*/
	var CLICK = "touchstart click";
	/**
	* define loading text - not used in checkout2?
	* @type string
	*/
	var LOADING = "loading";
	/**
	* Use to insure selectmenus not processed twice
	* @type boolean
	*/
	var uiInit = false;
	/**
	* set up selectmenu defaults
	* @type object
	*/
	var defaultSelectmenuOptions = {
		/* "maxHeight":300, */
		"menuWidth": "auto",
		"style": "dropdown",
		"transferClasses": true
	};
	/**
	* set selectmenu default width
	* @type int
	*/
	var selectMenuMaxHeight = 300;
	/**
	* set selectmenu default handle width
	* @type int
	*/
	var selectMenuHandleWidth = 26;
	/**
	* not used
	* @type int
	*/
	var imageRolloverBorderWidth = 5;
	var live = function(){
		$(window).bind('resize', positionScrollbarHack);
	}
	/** 
	* Initialize UI
	* @memberOf VSD.UI
	* @example
	* add swap value functionality for text input
	* initialize selectmenus
	* initialize images
	* initialize table
	* initialize tooltip
	* initialize cogloader
	*/
	var init = function(){
		
		//temporary way to prevent UI from initializing twice on page. 		
		//if($('#uiAlreadyInitialized').length>0) {return false;}
	//	$('body').append('<div id="uiAlreadyInitialized"></div>');
		
		// add swap value functionality for text input
		swapValue = [];
		jQuery(".swap-value","form").each(function(i){
			swapValue[i] = $(this).val();
			$(this).addClass("vsd-grey");
			$(this).focus(function(){
				if ($(this).val() == swapValue[i]) {
					$(this).val("");
				}
				$(this).addClass("focus");
				$(this).removeClass("vsd-grey");
			}).blur(function(){
				if ($.trim($(this).val()) == "") {
					$(this).val(swapValue[i])
						.addClass("vsd-grey");
				}
				$(this).removeClass("focus");
			});
		});
		
		// initialize selectmenus
		if(!uiInit){
			initSelectmenus();
		}	
		
		// initialize images
		initImages($body);
		
		uiInit = true;
		
		// initialize table
		table($body);
		
		// initialize tooltip
		tooltip($body);
		
	};	
	/** 
	* Make tables display correctly in ie6/7
	* @memberOf VSD.UI
	* @example
	* add tr borders for ie6/7
	* remove tr border on last tr for ie8
	*/
	var table = function(context) {
		//ie 6+7 does not support background images on tr tags so we add a new tr after each row with the line
		if (VSD.Client.isIE7()) {
			var colspan = 0, tagname;
			$("table.ui-table",context).each(function(i){
				$(this).find("thead tr,tbody tr:not(:last)").each(function(ii){
					//build the tr colspan number of cells and adjust padding
					$(this).find('td,th').each(function(iii){
						tagname = $(this).get(0).tagName;
						colspan = colspan + $(this).attr('colspan');
						//remove one pixel of padding off the bottom to keep the height the same
						$(this).css("paddingBottom",(parseInt($(this).css("paddingBottom"))-1 + 'px'));
					});
					//add the tr line
					$(this).after('<tr><' + tagname + ' colspan="' + colspan + '" class="iefix"></' + tagname + '></tr>');
					colspan = 0;
				});
			});
		//ie 8 does not support the last child so this remove the line from the last row
		} else if (VSD.Client.isIE8()) {
			$("table.ui-table",context).each(function(i){
				$(this).find("tbody tr:last").css('backgroundImage','none');
			});
		}
	}
	/** 
	* Display drop shadow for ie6/7/8
	* @memberOf VSD.UI
	*/
	var ieShadow = function(selector){
		var m = '', h = 1, w = 1;
		$e = $(selector);
		$(".shdw-wrap", $e).remove();
		h = $e.innerHeight() - 20;
		w = $e.innerWidth() - 20;
		m = '<div class="shdw-wrap" style="display: none">'
			+ '<div class="side n" style="width:'+ w +'px"></div>'
			+ '<div class="side s" style="width:'+ w +'px"></div>'
			+ '<div class="side w" style="height:'+ h +'px"></div>'
			+ '<div class="side e" style="height:'+ h +'px"></div>'
			+ '<div class="corner nw"></div>'
			+ '<div class="corner ne"></div>'
			+ '<div class="corner sw"></div>'
			+ '<div class="corner se"></div>'
		+ '</div>';
		$e.prepend(m);
		if(VSD.Client.isIE6())
			DD_belatedPNG.fix('.corner, .side');
		$(".shdw-wrap", $e).show();
	};
	/** 
	* Initialize tooltips
	* @memberOf VSD.UI
	* @example
	* functions differently for tablet and computers
	*/
	var tooltip = function(context){
		//select which side of element tooltip is displayed based on its position on the page
		$tooltips = $(".ui-tooltip", context);

		if($tooltips.closest('div').children('.tooltip-content')){
			$tooltips.live({
		        click:
		           function(){
						$(this).closest('div').children('.tooltip-content').css('visibility','visible').show();
		  			},
		        mouseover:
		           function(){
						$(this).not('.click-to-close').closest('div').children('.tooltip-content').css('visibility','visible').show();
						
		  			},
		        mouseleave:
		           function(){
						$(this).closest('div').children('.tooltip-content').show();
			
						if($(this).hasClass('click-to-close')){
							$('.click-to-close-button',context).bind("click", function(e){
								$(this).closest('.tooltip-content').css('visibility','hidden').hide();    
								return false;															
							});
						}                                                      
						else{                                                  
							// close tooltip                                   
							$(this).closest('div').children('.tooltip-content').hide();								
						}
		           }
		      });	
		}		
		
		var windowWidth = $('#content:first').width();
		var showPosition,tooltipId;
		$tooltips.each(function(i){			
			//add a class based of id for handle
			if ($(this).attr('id')) {
				tooltipId = 'tooltip-' + $(this).attr('id');
			} else {
				tooltipId = 'tooltip-'+Math.round(Math.random()*10000);
			}
			// IOS device
			if(VSD.Client.isIOS()){
				var triggerpos="";				
				
				// trigger tooltip
				$(this).bind("touchend", function(event){ 
						triggerpos=$(this).offset();
						$(this).addClass('touch');
						$('body').append('<div class="tooltip-ios ui-shadow' + tooltipId + '" id="'+tooltipId+'">' + $(this).attr("title") + '</div>')
						$(this).find('a.info-icon,a.ui-info').addClass('hover');	
					
						if($(this).find('.info-icon')[0]) {var iconpos = $(this).find('.info-icon').offset();}
						else {var iconpos=$(this).offset();}
						var new_offset=(iconpos.left-$(this).offset().left+6)/2;	
						
						var toppos=(triggerpos.top-$('#'+tooltipId).height()-30);
						var leftpos=(triggerpos.left+new_offset);
						$('#'+tooltipId).css({"top":toppos+"px","left":leftpos+"px"});						
						// hide active tooltip
					if($(this).is(':visible')){
						$(document).bind("touchstart", function(event){
							$('body').find('#'+tooltipId).remove();
							$(this).removeClass('touch')
								.find('a.info-icon,a.ui-info')
								.removeClass('hover');
						});	
					}
				});
			}
			// not IOS device
			else{
			
					showPosition = 'top center';
							
					if($(this).find('.info-icon')[0]) {var iconpos = $(this).find('.info-icon').offset();}
					else {var iconpos=$(this).offset();}
				var new_offset=(iconpos.left-$(this).offset().left+6)/2;			
				$(this).tooltip({
					tipClass: 'tooltip ui-shadow ' + tooltipId,
					position: showPosition,
					delay: 0,
					width: 250,
					onShow:function() {	
						if(true) {
							if(VSD.Client.isIE()){
								VSD.UI.ieShadow(this.getTip());							
							}	
						}
						if(this.getTip().offset().left<0) {					
							this.getTip().css({"left":"10px"});
						}
						else if(this.getTip().offset().left+250>$(window).width() - 10) {
							var reoffset=(this.getTip().offset().left - (this.getTip().offset().left+250-$(window).width()+20));
							this.getTip().css({"left":reoffset+"px"});
						}
						$tooltips.eq(i).find('a.info-icon,a.ui-info').addClass('hover');
					},
					onHide:function() {
						$tooltips.eq(i).find('a.info-icon,a.ui-info').removeClass('hover');
					},
					onBlur:function() {
						$tooltips.eq(i).find('a.info-icon,a.ui-info').removeClass('hover');
					},
					offset: [-10, new_offset]
				});
			} // end else IOS device			
			
		});
	};
	/** 
	* Initialize scrollbar
	* @memberOf VSD.UI
	*/
	var offset_top, offset_bot, border_top, border_bot,iemodifier, left_mod;
	var scrollbar = function(selector, options){

		var $s = $(selector);
		var sbWidth = 25;
		var ovWidth = $(VSD.Overlay.id).width();
		var defaults = {
				maintainPosition: false,
				topCapHeight: -1,
				bottomCapHeight: -1
				}
		
		// get a snapshot of the selectors css
		var bCss = {
			"width": $s.width() - sbWidth,
			"height": $s.height() - 2
		}
				
			$('.bagitem-price', $s).css({'margin-right':'0px'});
		
		// extend defaults
		if(options)
			defaults = $.extend({}, defaults, options);
		
		// apply scrollbar
		$s.jScrollPane(defaults);
		
		// fix growing
		if(typeof $s.data('defaultWidth') != "undefined"){
			$s.width( $s.data('defaultWidth') );
		}
		
		// TODO change to live
		// click event hash tags
		var url = "", name = "";
		$('a[href*="#"]', selector).each(function(){
			url = $(this).attr("href");
			name = url.substring(url.indexOf("#")+1, url.length);
			if(name.length == 0 || !$('[name="' + name +'"]', $s)[0])
				return true;
			$(this).bind("click", function(e){
				e.preventDefault();
				
				scrollto(selector, $('[name="' + name +'"]', $s).position().top);
			});
		});

		/*
		 * Begin Scrollbar adjustments
		 */
		iemodifier=0;
		if(VSD.Client.isIE6()) {iemodifier=-13;}
		//else if(VSD.Client.isIE7()) {iemodifier=3;}

		/*
		 * Adjustment Overlay
		 */
		if($s.is(VSD.Overlay.content)){
			// adjust width for scrollbar
			if($("#overlay .jScrollPaneScrollable")[0] && !$(VSD.Overlay.content).hasClass("scrollable"))
			{
				$( ".jScrollPaneScrollable", VSD.Overlay.id ).width( ovWidth + sbWidth  );
				$( VSD.Overlay.id ).width( ovWidth + sbWidth );
				$s.width( $(VSD.Overlay.id).width() - 25 ).addClass("scrollable").addClass("touchscroll");
				//fixes shadow issue with scrollpane
				if(VSD.Client.isIE8()){
					$('.n',VSD.Overlay.id).width( ovWidth + sbWidth - 20);
					$('.s',VSD.Overlay.id).width( ovWidth + sbWidth - 20);
				}
			}
			else if( !$("#overlay .jScrollPaneScrollable")[0] && $(VSD.Overlay.content).hasClass("scrollable"))
			{
				$s.data('defaultWidth', ovWidth - sbWidth)
				$( ".jScrollPaneScrollable", VSD.Overlay.id ).width( ovWidth - sbWidth );
				$( VSD.Overlay.id ).width( ovWidth - sbWidth );
				$s.width( $(VSD.Overlay.id).width() ).removeClass("scrollable").addClass("touchscroll");
			}

			// help the view
			if( VSD.Client.isIE6() )
			{
				$('#overlay .content .jScrollPaneContainer .content-inner').css({"margin":"0px","padding":"0px"});
				$('#overlay .content .jScrollPaneContainer').css({"margin":"0px","padding":"0px"});
				$('#overlay .title-bar').css({"margin":"0px","padding":"0px"});
				$('#overlay .titlebar-content').css({"margin":"0px","padding":"29px 65px 20px 20px"});
				iemodifier=-10;
			}
			// other than ie6 help the view some more
			else {
				// remove hacks
				$('#overlay .arrowbordertophack').remove();
				$('#overlay .arrowborderbothack').remove();
				if($("#overlay .jScrollPaneScrollable")[0]){
					// make hacks
					offset_top=$(".jScrollPaneScrollable").children('.jScrollArrowUp').position();
					offset_bot=$(".jScrollPaneScrollable").children('.jScrollArrowDown').position();
					border_top= "<div class='arrowbordertophack arrowscrollbarhack' style='top:"+(offset_top.top+iemodifier+$(".titlebar-on").innerHeight())+"px;left:"+offset_top.left+"px;'></div>";
					border_bot="<div class='arrowborderbothack arrowscrollbarhack' style='top:"+(offset_bot.top+iemodifier+$(".jScrollPaneScrollable").children('.jScrollArrowUp').innerHeight()+$(".titlebar-on").innerHeight()-1)+"px;left:"+offset_bot.left+"px;'></div>";
					$('#overlay').append(border_top);
					$('#overlay').append(border_bot);
				}
			}
		}
		/*
		 * Adjustment Other Scrollable elements
		 */
		if($(".jScrollPaneScrollable").length) {
			// olps scrollable text
			if($s.parents(VSD.Overlay.id).hasClass("overlay-olps-form"))
			{
				var newdefaults = {
						maintainPosition: false,
						topCapHeight: 0,
						bottomCapHeight: 0,
						wheelSpeed: 16,
						dragMinHeight: 16
						}	
				$s.jScrollPane(newdefaults);					
			}
			// viewbag
			if ($s.parents("#viewbag").length) 
			{
				if(VSD.Client.isIE6()) {
					if($(".jScrollPaneScrollable").parent().parent('#viewbag')) {
						$("#viewbag .viewbag-items").css({
							'padding':'0px',
							'margin':'0px',
							'padding-top':'20px',
							'margin-left': '-20px'
						});
						$(".jScrollPaneScrollable").css({
							"width":"451px",
							"padding-top":"0px",
							"margin-top":"0px",
							"padding-bottom":"0px",
							"margin-bottom":"0px"
						});
						$("#viewbag .panel-title").css('border-right','1px solid #e5e5e5');
						$("#viewbag .panel-footer").css('border-right','1px solid #e5e5e5');
					}
 				}
				else if(VSD.Client.isIE7()){
					iemodifier=0;
				}
				border_top="<div class='arrowbordertophack arrowscrollbarhack panelscroll'></div>";
				border_bot="<div class='arrowborderbothack arrowscrollbarhack panelscroll'></div>";
				$('body').append(border_top).append(border_bot);
				// position with empty
				positionScrollbarHack();
				if(!VSD.Client.isIE6()) {					
		 			$("#viewbag").css('border','none');
		 			$("#viewbag .viewbag-items").css('border-left','1px solid #e5e5e5');
		 			$("#viewbag .viewbag-items").css('padding-bottom','30px');						
		 			$("#viewbag .panel-title").css('border','1px solid #e5e5e5');
		 			$("#viewbag .panel-footer").css('border','1px solid #e5e5e5');	 					 					 				
				}
			}
			// End scrollbar adjustments
		}
	};
	var positionScrollbarHack = function(e){
		if(!$(".jScrollPaneScrollable")[0])
			return true;
		left_mod=0;
		if(e == null){
			left_mod = -1;
		}
		offset_top=$(".jScrollPaneScrollable").children('.jScrollArrowUp').offset();
		offset_bot=$(".jScrollPaneScrollable").children('.jScrollArrowDown').offset();
		$(".arrowbordertophack.panelscroll").css({
			top:(offset_top.top+iemodifier-1),
			left:(offset_top.left+left_mod)
		});
		$(".arrowborderbothack.panelscroll").css({
			top:(offset_bot.top+iemodifier+$(".jScrollPaneScrollable").children('.jScrollArrowUp').innerHeight()-2),
			left:(offset_bot.left+left_mod)
		});
	};
	/*
	 * Prevent anchor click scrolling page
	 */
	$('#overlay a[href*="#"]').live('click', function(e) {
		e.preventDefault();
		return false;
	});
	/** 
	* remove scroll bar
	* @memberOf VSD.UI
	*/
	var scrollbarOff = function(selector){
		$('#overlay .arrowbordertophack').remove();$('#overlay .arrowborderbothack').remove();
		$s = $(selector);
		$s.height("auto").width("auto");		
		$s.parent().height( $s.outerHeight() );		
		if(!(VSD.Client.isIE() && $(".bagitem", "#viewbag").length < 3) && ($s.parent().parent().hasClass('viewbag') || $s.parent().parent().parent().hasClass('viewbag')) ) {		
		
			if(VSD.Client.isIE()) { setTimeout('VSD.UI.scrollbar( $s );',600);}
			else { VSD.UI.scrollbar( $s );}
		}
	}
	/** 
	* remove scroll bar hack
	* @memberOf VSD.UI
	*/
	var removeScrollbarHack = function () {
		$('.arrowbordertophack').remove();$('.arrowborderbothack').remove();		
	}
	/** 
	* scroll to window position
	* @memberOf VSD.UI
	*/
	var scrollto = function(selector, yPos){
		$(selector)[0].scrollTo(yPos);
	}
	/** 
	* Initialize images, set up boarders/image rotation
	* @memberOf VSD.UI
	*/
	var initImages = function(context){
		context = (context) ? context : $body;
		
		// add rollover image borders for .items
		// depricated for live
//		jQuery("a.item-wrap", context).each(function(){
//			initImageBorder(jQuery(this));
//		});
		liveImageBorders();
		
		// initialize rotating images
		if(typeof jQuery.fn.imgFlipper === "function"){ 
			jQuery(".thumb-flip", context).imgFlipper();
		}
		
		// fix IE issue with clickable cue images (this should really be fixed with new CSS - MR)
		if(VSD.Client.isIE6() || VSD.Client.isIE7()){
			jQuery("span.thumb", context).click(function(){
				// landing
				if(jQuery(this).parent().hasClass("item-wrap")){
					document.location = jQuery(this).parent("a.item-wrap").attr("href");
				}
				// product 
				// viewbag
				if(jQuery(this).parent().hasClass("alt-item-wrap") || jQuery(this).parent().hasClass("viewbag-item-wrap")){
					jQuery(this).parent().trigger('click');
				}
			});
		}
	};
	var liveImageBorders = function(){
		$("a.item-wrap").live('mouseenter focus click', function(){
			var a = $(this);
			var span = a.find("span.thumb");
			var img = span.find("img").last();
			if(img.width() > 0 && img.height() > 0){
				a.addClass("hover");
				span.width(img.width()-(imageRolloverBorderWidth*2)).height(img.height()-(imageRolloverBorderWidth*2));
			}
		});
		
		$("a.item-wrap").live('mouseleave blur', function(){
			var a = $(this);
			var span = a.find("span.thumb");
			var img = span.find("img").last();
			if(img.width() > 0 && img.height() > 0){	
				a.removeClass("hover");
				span.width(img.width()).height(img.height());
			}
		});
		
		// ie 7 asynchronous content click fix
		if(VSD.Client.isIE7()){
			$('.collection .item-wrap').live('click', function(){
				window.location.href=$(this).attr("href");
			});
		};
	}
	/** 
	* Initialize image boarders
	* @memberOf VSD.UI
	*/
	var initImageBorder = function(a){
		var span = a.find("span.thumb");
		var img = span.find("img").last();
		
		if(img.length > 0){

			a.bind('mouseenter focus click', function(){
				if(img.width() > 0 && img.height() > 0){
					a.addClass("hover");
					span.width(img.width()-(imageRolloverBorderWidth*2)).height(img.height()-(imageRolloverBorderWidth*2));
				}
			});
			
			a.bind('mouseleave blur', function(){
				if(img.width() > 0 && img.height() > 0){	
					a.removeClass("hover");
					span.width(img.width()).height(img.height());
				}
			});

		}		
	};
	/** 
	* Initialize selectmenus
	* @memberOf VSD.UI
	*/
	var initSelectmenus = function(context){
		//touch devices do not get the ui selectmenu
		if(VSD.Client.isTouch()) {
			jQuery("select.ui-select", context).each(function(){
				
				var selectObj = jQuery(this);
				// TODO handle with CSS
				if(selectObj.hasClass('pre-rendered')) {
					VSD.Selectmenu.touchSelect( selectObj );
				}
				// handle widget options
				var opts = (selectObj.data("selectmenuOptions")) ? selectObj.data("selectmenuOptions") : {};
				var newOpts = jQuery.extend({}, opts, defaultSelectmenuOptions);
				jQuery.extend(opts, defaultSelectmenuOptions);
				if (newOpts["width"]) { 
					selectObj.css({width: newOpts["width"],visibility:"visible","display":"inline-block"});
				}
				if($('head')[0]){
					$('head').append('<style type="text/css">body select.ui-select{visibility:visible;display:inline-block}</style>');
				}
			});
			return true;
		}

		// init FTL Selectmenus
		if($body.hasClass("checkout")){
			$(".ui-selectmenu.pre-rendered").each(function(){
				VSD.Selectmenu.initButton( $(this), $(this).parents(VSD.Overlay.id)[0] );
			});
		};		

		jQuery("select.ui-select", context).each(function(){		
			var selectObj = jQuery(this);
			if(selectObj.hasClass('pre-rendered')) {return true;}
			selectObj.attr("id", selectObj.attr("id").replace(".",""));
			initSelectmenu(this);
			//initSelectmenuById(jQuery(this).attr("id"));
		});

		// tweak selectmenus
		jQuery("a.ui-selectmenu", context).each(function(){
			var widget = jQuery(this);
			
			// supersleight the fade png
			jQuery("span.ui-selectmenu-screen", widget).supersleight({"shim": VSD.SuperSleight.shim});
			
			// the padding for the dropdown arrow prevents the status from being properly clipped with overflow:hidden;
			if(VSD.Client.isIE6()){
				jQuery("span.ui-selectmenu-status", widget).width(widget.width()-16);
			}
			
			// make sure the menu width is not less than the button width
			var widgetId = widget.attr("id");	
			var menuId = widgetId.replace("-button", "-menu");
			var menu = jQuery(document.getElementById(menuId));	// some menuIds have periods in them - messes up the selector engine
			
			$(".ui-selectmenu-menu").each(function(i, el){
				var e = $(el);
				if(menuId == e.attr("id")){
					menu = e;
				};
			});
			
			var menuWidth = menu.width();
			var widgetWidth = widget.width();
			
			if(menuWidth < widgetWidth){
				menu.width(widgetWidth);
			}
			if(menu.height() > selectMenuMaxHeight){
				menu.height(selectMenuMaxHeight);
				
				var scrollbarWidth = jQuery.getScrollbarWidth();
				if((menuWidth + scrollbarWidth) > widgetWidth){
					menu.width(menuWidth + scrollbarWidth); // adjust for scrollbars	
				}
			}
		});
	};
	/** 
	* Initialize single selectmenu
	* @memberOf VSD.UI
	*/
	var initSelectmenu = function(self){
		var selectObj = jQuery(self);
		if(selectObj.hasClass('pre-rendered')) {return true;}
		// make sure all <option> elements have the right class
		jQuery("option", selectObj).addClass("ui-selectmenu-value");
		
		// handle widget options
		var opts = (selectObj.data("selectmenuOptions")) ? selectObj.data("selectmenuOptions") : {};
		var newOpts = jQuery.extend({}, opts, defaultSelectmenuOptions);
		
		if(newOpts["width"]){
			newOpts["width"] -= selectMenuHandleWidth;
		}
		selectObj.vsdselectmenu(newOpts);
	};
	/** 
	* Initialize single selectmenu by id
	* @memberOf VSD.UI
	*/
	var initSelectmenuById = function(id){
		var selectObj = jQuery("#"+id);
		if(selectObj.hasClass('pre-rendered')) {return true;}
		var opts = (selectObj.data("selectmenuOptions")) ? selectObj.data("selectmenuOptions") : {};
		jQuery.extend(opts, defaultSelectmenuOptions);
		if(opts["width"]){opts["width"]-=26};
		selectObj.vsdselectmenu(opts);
	};
	/** 
	* @memberOf VSD.UI
	*/
	var selectmenu = function(id, opts){
		var selectObj = jQuery("#"+id);
		var temp = jQuery.extend({}, defaultSelectmenuOptions);
		opts = (opts) ? jQuery.extend(temp, opts) : (selectObj.data("selectmenuOptions")) ? selectObj.data("selectmenuOptions") : jQuery.extend(opts, defaultSelectmenuOptions);
		if(opts["width"]){
			opts["width"]-=26;
		};

		selectObj.vsdselectmenu(opts);
	};
	/** 
	* @memberOf VSD.UI
	*/
	var destroySelectmenus = function(context){
		if(!VSD.Client.isTouch()){
			jQuery("select.ui-select", context).vsdselectmenu("destroy");
			VSD.Selectmenu.destroyAll( context );
		}
	};
	/** 
	* @memberOf VSD.UI
	*/
	var newoptions = function(id,selectOptions){
		jQuery("#"+id).vsdselectmenu("destroy").html(selectOptions);
		initSelectmenuById(id);
	}	
	return {
		"init": init,
		"initImages": initImages,
		"initSelectmenu": initSelectmenu,
		"initSelectmenus": initSelectmenus,
		"initSelectmenuById": initSelectmenuById,
		"selectmenu": selectmenu,
		"newoptions": newoptions,
		"destroySelectmenus": destroySelectmenus,
		"imagebase": "/themes/base/candice/graphics",
		"hovertimeout": 1000,
		"HOVERON": HOVERON,
		"HOVEROUT": HOVEROUT,
		"CLICK": CLICK,
		"table":table,
		"tooltip": tooltip,
		"scrollbar": scrollbar,
		"scrollbarOff": scrollbarOff,
		"removeScrollbarHack": removeScrollbarHack,
		"ieShadow": ieShadow,
		"live": live
	};
}());

/*
 * VSD.Util
 */
VSD.Util = (function(){
	
	var getCommentNodeContent = function(element){
		var commentNodeContent;
		
		// get first comment node child of the element
		if(element && element.childNodes){
			for(var i=0; i < element.childNodes.length; i+=1){
				if(element.childNodes[i].nodeType == 8){
					var nodeValue = element.childNodes[i].nodeValue;
					if(nodeValue.length > 0){
						commentNodeContent = nodeValue;
					}
					break;
				}
			}
		}
		
		return commentNodeContent;
	};
	
	var getTestContent = function(context){
		var content;
		var testContentElements = jQuery("textarea.test-content", context);
		if(testContentElements.length > 0){
			content = "";
			testContentElements.each(function(){
				content += jQuery.trim(this.value);
			});	
		}

		return content;
	};

	
	var getSASTestContent = function(context){
		var content;	
		
		var testContentElements = jQuery("div.test-content	", context);		
		if(testContentElements.length > 0){
			content = "";
			testContentElements.each(function(){				
				content += jQuery.trim(testContentElements.html());
			});	
		}

		return content;
	};

	var formatCurrency = function(num){
		return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
	}
	
	var formatDate = function(strDate, strFormat){
		return dateFormat(strDate, strFormat)
	}
	
	var stringCompare = function(str1,str2){
		if(str1.length > 0 && str2.length > 0 && str1.replace(/ /g,'') == str2.replace(/ /g,''))
			return true;
		return false;
	};
	
	var getTipLeft = function() {
		
	}
	
	return {
		"getCommentNodeContent": getCommentNodeContent,
		"getTestContent": getTestContent,
		"getSASTestContent":getSASTestContent,
		"formatCurrency": formatCurrency,
		"formatDate": formatDate,
		"stringCompare": stringCompare
	};
}());

/*
 * VSD.Util.JsonDom
 */
VSD.Util.JsonDom = (function(){
	var getMarkup = function(jsonDomElement){
		var mkp = "";
		if(jsonDomElement){
			if(jsonDomElement.nodeName){
				// create tag
				mkp = "<" + jsonDomElement.nodeName;
				
				//handle attributes
				for(var attr in jsonDomElement.attributes){
					var attrValue = jsonDomElement.attributes[attr];
					if(jsonDomElement.nodeName == "script" && attr == "src" && attrValue.indexOf("/") == 0){
						attrValue = VSD.HeaderFooter.getHeaderFooterHostname() + attrValue;
					}
					if(jsonDomElement.nodeName == "img" && attr == "src" && location.protocol == "https:"){
						if(attrValue.indexOf("http://media.victoriassecret.com") > 0){
							attrValue = attrValue.replace("http://media.victoriassecret.com", "https://secure-media.victoriassecret.com");	
						}
						else {
							// handle cases when media host is not set up
							attrValue = attrValue.replace("http://", "https://");
						}
					}
					mkp += " " + attr + "=\"" + attrValue + "\"";
				}
				mkp += ">";
				
				// handle childNodes
				if(jsonDomElement.childNodes && jsonDomElement.childNodes.length > 0){
					for(var i=0; i < jsonDomElement.childNodes.length; i+=1){
						mkp += getMarkup(jsonDomElement.childNodes[i]);
					}
				}
				
				// close tag
				mkp += "</" + jsonDomElement.nodeName + ">";
			}
			else {
				if(jsonDomElement.nodeType == "comment"){
					mkp += "<!-- " + jsonDomElement.textContent + " -->";
				}
				
				if(jsonDomElement.nodeType == "text"){
					mkp += jsonDomElement.textContent;
				}
			}
		}
		
		return mkp;
		
	};
	
	return {
		"getMarkup": getMarkup
	};
}());

/*
 * VSD.Video
 */
VSD.Video = (function(){
	var videos = [];
	var activeVideo = {};

	var init = function(){
		if(typeof getVSCookie != "function"){return true}
		setActiveVideo();
		if(!getVSCookie('videoWatched')) {
		open();
		}
		setVSCookie('videoWatched', 1);
	};
	
	var setActiveVideo = function(){
		if(videos.length > 0){
			var videoTestDimension = videos[0].TestDimension;
			if(!videoTestDimension){
				activeVideo = videos[0];
			}
			else{
				var videoTestVersion = getExperience(videoTestDimension);
				for(var i=0; i < videos.length; i+=1){
					var v = videos[i];
					if(v.TestVersion == videoTestVersion){
						activeVideo = v;
						break;
					}
				}
			}
		}
	};
	
	var open = function(){
		if(activeVideo.swf){
			var requiredFlashVersion = "9.45";
			if (swfobject.hasFlashPlayerVersion(requiredFlashVersion)){
				
				if(activeVideo.context == "home"){
					// add underlay
					jQuery("#contentOuter").addClass("underlay");
					
					// add target markup
					jQuery("#content").append("<div id=\"videoContainer\"><div id=\"videoContainerInner\"><div id=\"videoTarget\"></div></div></div>");
					
					// fix pngs
					jQuery("#contentOuter").supersleight({"shim": VSD.SuperSleight.shim});
				}

				var params = {
					allowfullscreen: "true",
					wmode: "transparent",
					allowScriptAccess:"always"
				};
				
				var flashvars = activeVideo.flashvars;
				flashvars.debugging = "0";
				
				var attributes = {
					id: "vsdVideo",
					name: "vsdVideo"
				};
				
				swfobject.embedSWF(activeVideo.swf, "videoTarget", "966", "544", requiredFlashVersion, null, flashvars, params, attributes);
			}
		}
	};
	
	var close = function(){
		if(activeVideo.context == "home"){
			jQuery("#videoContainer").remove();
			var contentOuter = jQuery("#contentOuter");
			contentOuter.removeClass("underlay");
			VSD.SuperSleight.undo(contentOuter);
		}
	};
	
	var replay = function(){
		open();
	};
	
	var onPlaybackComplete = function(){
		close();
	};
	
	return {
		"videos": videos,
		"init": init,
		"open": open,
		"close": close,
		"replay": replay,
		"onPlaybackComplete": onPlaybackComplete
	};
	
}());

VSD.live();
jQuery(function() {
	VSD.init();
});

// declaring some variables to prevent js errors
var categPaths = "";
showWelcomeMessage = function(){};
highlightTopNav = function(){};
subnav = {};
// until we can update storelocator
StoreLocatorHelper = function(){
	
	$("#footer area").each(function(){
		if($(this).attr('href').indexOf('vsPopUp') != -1){
			var tmp = [], str = $(this).attr('href');
			tmp[0] = str.substr(0,str.lastIndexOf(')'));
			tmp[1] = "'',true);";
			$(this).attr('href',tmp.join());
		}
	});
	
	$("#footer a").each(function(){
		if(typeof $(this).attr('onclick') == "function"){
			if(VSD.Client.isIE()){
				this.onclick = function() {}; // for IE
			} else {
				this.setAttribute('onclick',''); // for FF
			}
		
			$(this).click(function(e){
				e.preventDefault();
				vsPopUp($(this).attr('href'),"windowSm","",true);
			});		
		}
	});
	
	vsPopUp = function(file, style, jqsettings, overwrite) {
		var relative = file.indexOf('.com') == -1;
		var crossDomain = relative ? 0 : document.location.hostname != file.split("/",3)[2];
		if (overwrite) {
			VSD.Overlay.open({
				title: true,
				titleText: "",
				overlayAddClass: "overlay-popup " + style,
				modal: true,
				closeButton: true,
				content: function() {
					if (!relative) file = (document.location.protocol == 'https:' ? VSD.swww : VSD.www) + file.split(".com",2)[1];
					$.get(file, function(data) {
						if (data.length > 0) {
							data = document.location.protocol == 'https:' ? data.replace(/http/g, 'https') : data;
							var filtered = document.createElement('div');
							filtered.innerHTML = data;
							filtered = filtered.getElementsByTagName('div')[0];
							$('#overlay .content-inner').html(filtered).find('div:first').addClass('popup-content');
						}
						// flex size
						if ( $('#overlay .content-inner #altview-container img').length === 1 ) {
							$("#overlay .content-inner #altview-container img").load(function() {
								$(VSD.Overlay.id).addClass('flex-size');
								var overlayHeight = $('#overlay').height();
								VSD.Overlay.center(overlayHeight);
							});	
						}
						// image swap
						if ($("#overlay #ImgSwapMain").length > 0) {
							$('#overlay .item > a, #overlay .alt-image-bottom').imgSwap({
								'layout': 'bottom'
							});
							$('#overlay .item > a, #overlay .alt-image-right').imgSwap({
								'layout': 'right',
								'tooltip': true
							});
						}
						// tabs
						else if($("#overlay .tab_container").length > 0) {/* from size-tabs.js */
							$(".tab_content").hide();
							
							$("ul.tab li").click(function(e) {
								e.preventDefault();
								var tabWrapper = $(this).parents('.tab-wrapper');
								tabWrapper.find('li').removeClass("active");
								$(this).addClass("active");
								$(".tab_content", tabWrapper).hide();
								var activeTab = $(this).find("a").attr("href");
								// split href for IE7
								var hashArray = activeTab.split('#');
								var hashIndex = hashArray.length;
								hashIndex--;
								activeTab = hashArray[hashIndex];
								$('#' + activeTab).show();
								setTimeout(function() {
									VSD.UI.scrollbar(VSD.Overlay.content, {maintainPosition: true});
								}, 100);
								return false;
							});
						}
						// hide is done to fix weird height snapping issue
						$('#overlay .title-bar h1').hide();
						$('#overlay .title-bar h1').html( $('#overlay .content-inner h1').html() );
						$('#overlay .content-inner h1').remove();
						VSD.Cufon.initOn( '#overlay .title-bar' );
						$('#overlay .title-bar h1').show();
						VSD.Overlay.callback();
						setTimeout(function() {
							VSD.UI.scrollbar(VSD.Overlay.content);
							$("ul.tab").each(function() {
								
								$(this).children("li:first").addClass("active");
							});
							
							$("ul.tab li").each(function() {
								if($(this).hasClass('active')) {
									var activeTab = $(this).find("a").attr("href"); 
									// split href for IE7
									var hashArray = activeTab.split('#');
									var hashIndex = hashArray.length;
									hashIndex--;
									activeTab = hashArray[hashIndex];
									$('#' + activeTab).show();
									VSD.UI.scrollbar(VSD.Overlay.content);
								}
							});

						}, 500);
					});
			},
				callback: function() {}
			});
		}
		else {
			var styles = {
				windowSm: { height:500, width:380, createnew:0, status:1 },
				windowMed: { height:500, width:489, createnew:0, status:1 },
				windowLrg: { height:500, width:600, createnew:0, status:1 },
				windowXlrg: { height:768, width:768, createnew:0, status:1, scrollbars:0 },
				windowAltView: { height:640, width:460, createnew:0, status:1, scrollbars:0 },
				windowAllStyles: { height:520, width:490, createnew:0, status:1 },
				windowCenter: { height:300, width:400, createnew:0, center:1 },
				windowNotNew: { height:300, width:400, center:1, createnew:0 },
				windowSASCls: { height:542, width:500, createNew:0, scrollbars:0 },
				facebook: { height:542, width:500, createNew:0, scrollbars:0 },
				twitter: { height:542, width:800, createNew:0, scrollbars:0 },
				storeLocator: { height:768, width:768,	createnew:0	}
			};
			var index=1;
			var settings, parameters, mysettings, b, a;
			// for overrideing the default settings
			mysettings = style.split(",");
			settings = { height:500, width:380, toolbar:0, scrollbars:1, status:0, resizable:1,	left:20, top:20, center:0, createnew:1, location:0, menubar:0, emailTitle:"", emailContent:"", twitterContent:"" };
			settings = jQuery.extend(settings, jqsettings);
			//set up the URL
			if (style == 'facebook') {
				settings.file = 'http://www.facebook.com/sharer.php?u=' + file;
			} else if (style == 'twitter') {
				settings.file ="http://twitter.com/home?status=" + settings.twitterContent;
			} else if (style == 'email') {
				window.location = "mailto:?subject=" + settings.emailTitle + "&body=" + settings.emailContent;
				return true;
			} else {
				settings.file = file;
			}
			// if mysettings length is 1 and not a value pair then assume it is a style declaration
			// and see if the style settings exists
			if (mysettings.length == 1 && mysettings[0].split(":").length == 1) {
				a = mysettings[0];
				if (typeof (styles[a]) != "undefined")	{
					settings = jQuery.extend(settings, styles[a]);
				}
			}
			else {
				for (var i=0; i < mysettings.length; i++) {
					b = mysettings[i].split(":");
					if ((typeof (settings[b[0]]) != 'undefined') && b.length == 2) {
						settings[b[0]] = b[1];
					}
				}
			}
			// center window
			if (settings.center == 1)	{
				settings.top = (screen.height-(settings.height + 110))/2;
				settings.left = (screen.width-settings.width)/2;
			}
			// do not change
			parameters = "location=" + settings.location + ",menubar=" + settings.menubar + ",height=" + settings.height + ",width=" + settings.width + ",toolbar=" + settings.toolbar + ",scrollbars=" + settings.scrollbars  + ",status=" + settings.status + ",resizable=" + settings.resizable + ",left=" + settings.left  + ",screenX=" + settings.left + ",top=" + settings.top  + ",screenY=" + settings.top;
			var name = settings.createnew ? "PopUpWindow" + index : "PopUpWindow";
			var opened = window.open(settings.file, name, parameters);
			opened.resizeTo(settings.width + 8, settings.height + 80);
			opened.focus();
			index = index + 1;
		}
	}
	
	VSD.Overlay = (function(){
		
		var runInit = true;

		var id = "#overlay";
		var content =  id + " .content-inner";
		var footer = ".footerbar-on"
		
		var init = function(){
			if(runInit){
				$body.prepend('<div id="overlay" class="overlay ui-shadow"></div>');
			}
			runInit = false;
		};
		
		var callback = function(){
			VSD.UI.initSelectmenus(VSD.Overlay.id);
			if(VSD.Client.isIE8()) {
				//timing issue in ie8 which make cufon text not show up
				setTimeout("VSD.Cufon.initOn(VSD.Overlay.id)",500);
			} else {
				VSD.Cufon.initOn(VSD.Overlay.id);
			}
			VSD.UI.tooltip(VSD.Overlay.id);
			VSD.Forms.init(VSD.Overlay.id);
			VSD.UI.scrollbar(VSD.Overlay.content);
		};
		
		var close = function(){
			$(VSD.Overlay.id).overlay("close");
		};
		
		var lock = function(){
			$(VSD.Overlay.id).overlay("lock");
		};
		
		var open = function(options){
			$(VSD.Overlay.id).overlay($.extend({}, {callback: VSD.Overlay.callback}, options));
		};


		var setContent = function(m){
			$(VSD.Overlay.content).overlay(m);
		};


		return {
			"init": init,
			"setContent": setContent,
			"id": id,
			"content": content,
			"footer": footer,
			"lock": lock,
			"open": open,
			"close": close,
			"callback": callback
		}
	}());
}