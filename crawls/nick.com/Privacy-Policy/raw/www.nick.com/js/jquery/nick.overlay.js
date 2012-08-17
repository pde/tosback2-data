if(typeof NICK == "undefined" || !NICK) var NICK = {};
// Register NICK overlay Namespace
NICK.namespace("overlay");

// Create the overlay template on document ready
$(document).ready(function() { NICK.overlay.create(); });

NICK.overlay.isLoading = false;
NICK.overlay.isOpen = false;
NICK.overlay.isIE6 = false;
NICK.overlay.wrapperClass = "";
NICK.overlay.isOverlayVideoPlayer = false;

NICK.overlay.keepOpen = false;


/**
 * Create the HTML template schema based on clients browser
 */
NICK.overlay.create = function() {
	// Create Overlay Template
	$('<div class="o_popup_content_loader o_popup"><!-- Content Loader --></div>' +
	  '<div class="o_popup">' +
			'<div class="o_popup_box">' +
				'<div class="o_popup_wrapper">' +
					'<div class="o_popup_header">' +
						'<h2 class="o_popup_title"></h2>' +
						'<a class="o_popup_close">Close</a>' +
						'<span class="o_popup_loader">Loading...</span>' +
					'</div>' +
					'<div class="o_popup_content"></div>' +
				'</div>' +
			'</div>' +
		'</div>').appendTo( $("body") );

	$(".o_popup_close").click(NICK.overlay.close);

	var userAgent = navigator.userAgent.toLowerCase();
	var isIE = /msie/.test( userAgent );
	var bVersion = (userAgent.match( /.+(?:rv|it|ra|ie)[\/: ]([0-9]+)/ ) || [0,'0'])[1];

	if ( isIE ) {
		if ( bVersion == 6 ) {
			this.isIE6 = true;

			$(".o_popup").addClass("o_popup_ie6");
			$("<div />").addClass("o_popup_square_borders").prependTo( $(".o_popup_wrapper") );

		} else {
			$(".o_popup").addClass("o_popup_ie7");
			$('<div class="o_popup_vs"></div>' +
			  '<div class="o_popup_hs"></div>' +
			  '<div class="o_popup_tl"></div>' +
			  '<div class="o_popup_tr"></div>' +
			  '<div class="o_popup_br"></div>' +
			  '<div class="o_popup_bl"></div>').prependTo( $(".o_popup_wrapper") );
		}
	} else {
		$(".o_popup").addClass("o_popup_rb");
	}

	// Apply the init to all elements with the 'nick-overlay' class
	$(".nick-overlay").click(function(e) {
		var title = $(this).attr("title");
		var url = $(this).attr("href");
		var wrapperClass = $(this).attr("wrapperClass");
		NICK.overlay.open(title, url, { method: "ajax" ,wrapperClass:wrapperClass});
		return false;
	});
}



NICK.overlay.doLogInOverlay = function(){
	var title = "Please Sign In";
	var url = "/overlay/login.html";
	var wrapperClass = "";
	NICK.overlay.open(title, url, { method: "ajax" ,wrapperClass:wrapperClass});
	
	// Add support for hitting the enter key to submit.
	$(document).bind('overlayLoaded', function () {
		
		$("form.allowEnterKey").bind("keypress", function(e) {
			if (e.keyCode == 13) {
				e.preventDefault();
				$(this).trigger("onsubmit");
			}
		});
		
	});
	
	return false;	
}

/*
 * Replace the close button temporarily with a loading icon
 */
NICK.overlay.loadingToggle = function() {
	if ( this.isLoading == true ) {
		this.isLoading = false;
		$(".o_popup_loader").hide();
		$(".o_popup_close").show();
	} else {
		this.isLoading = true;
		$(".o_popup_loader").show();
		$(".o_popup_close").hide();
	}
}

/**
 * Close overlay
 */
NICK.overlay.close = function() {
	
	if(!NICK.overlay.keepOpen) {
		
		//when a player is in an overlay it doesnt stop playing when the overlay is closed, fix below.
		if (NICK.overlay.isOverlayVideoPlayer) {
			$("#overlay-video-player").empty()
		}		
		
		$(".o_popup_box").fadeOut("fast", function() {	
			$(".o_popup").removeClass(NICK.overlay.wrapperClass).hide(); 
		} );
		$("#nick-overlay-modal").remove();
		$('body').trigger('overlayClose');
		
		if(NICK.videoPlayer){
			NICK.videoPlayer.overlayUnpause();
		}
				
		NICK.utils.showSwfs();
		NICK.overlay.isOpen = false;
	}
	NICK.overlay.keepOpen = false;
}

/**
 * Open overlay
 */
NICK.overlay.open = function(title, url, options) {
	var defaults = {
		title: null,
		modal: true,
		method: "ajax",
		width: 500,
		height: 'auto',
		borderless: false,
		padding:40
	};
	/* if event mode is on, and user is requesting either login or registrations, 
	 * change the url to the no login screen.
	 */
	try{
		if(NICK.login.getLoginStatus() == "off"){
			if(url == "/overlay/registration.html" || url == "/overlay/login.html"){
				title = ""
				url = "/overlay/no-login.html"
			}
		}
	  }catch(err){
		NICK.utils.doLog("Nick.login does not exist");
	  }
	
	
	var options = $.extend(defaults, options);
		options._url = url;
		
	if ( options.borderless == true ) {
		$(".o_popup").addClass("o_popup_borderless");
	} else {
		$(".o_popup").removeClass("o_popup_borderless");
	}

	if ( options.wrapperClass != null) {
		NICK.overlay.wrapperClass = options.wrapperClass;
		$(".o_popup").addClass(options.wrapperClass);
	}
	
	NICK.overlay.isOpen = true;

	// Hide flash objects
	NICK.utils.hideSwfs();
	
	// Pause video
	if(NICK.videoPlayer){
		NICK.videoPlayer.overlayPause();
	}
	// Set overlay title
	$(".o_popup_title").text(title || options.title);

	// Disable and fade out contents if a modal
	if ( options.modal == true ) {
		$("#nick-overlay-modal").remove();
		$("body").append($("<div />")
			.attr("id", "nick-overlay-modal")
			.css({opacity: 0.6, height: $(document).height()})
		);
	}

	// Open a loading overlay
	$(".o_popup_content").html("Loading");
	$(".o_popup_box").css("width", 250).show();
	$(".o_popup").show().addClass("o_popup_loading")

	// Dynamically place the overlay 50px from current top in IE6 since 'static' doesnt work
	//if ( this.isIE6 ) {
		$(".o_popup").css("top", $(window).scrollTop() + 140);	
	//}

	// Load content based on given method
	switch( options.method ) {
		case "ajax":
			$(".o_popup_content_loader").load(url, function() {
				var w = $(this).width() + options.padding;
				var h = 0;
				var html = $(this).html();
				
				// if content empty avoid breaking the overlay
				if(html.length > 0){ 
					$(this).empty();
					NICK.overlay.loaded(options, html, w, h);
				}else{
					NICK.utils.doLog("URL:" + url + " returned empty");
				}
				
			});
			break;
		case "flash":
			NICK.overlay.loaded(options, '<div id="o_popup_flash"></div>', options.width, options.height);
			break;
		case "confirm":
			NICK.overlay.loaded(options, '<div class="o_popup_confirm clearfix">' + options.content + '</div>', options.width, options.height);
			break;
		case "html":
			NICK.overlay.loaded(options, '<div class="clearfix" style="width: ' + (options.width - options.padding) + 'px;">' + options.content + '</div>', options.width, options.height);
			break;
		case "iframe":
			var html = '<iframe class="o_popup_iframe" src="' + url + '" width="' + options.width + '" height="' + options.height + '" frameborder="0"></iframe>';
			NICK.overlay.loaded(options, html, (options.width + options.padding), options.height);
			break;
	}
}

/*
 * Final settings once overlay data has been initialized
 */
NICK.overlay.loaded = function(options, html, w, h) {
	$(".o_popup").removeClass("o_popup_loading");
		// HACK FOR THE BIG HELP OVERLAYS
     if ($("#bighelp-home").length) {
     	w = (html.substring(21,26) == "login") ? 348:524;
     	cssRewrite = (w==348) ? "background:#333!important;":"";
     	$('.o_popup_content').css('cssText',cssRewrite);
     }
	$(".o_popup_box").css("width", w);
	if ( h > 0 ) { $(".o_popup_box").css("height", h); }

	if ( options.method == "iframe" ) {
		$(".o_popup_content").addClass("o_popup_content_iframe");
	}

	$(".o_popup_content").html(html);

	if ( options.method == "flash" ) {
		doRegisterSwf( "o_popup_flash", options._url, "o_popup_flash", '9.0.124.0',w+'px',h+'px',options.flashOptions,'false','false','/dynamo/javascript/swfobject/expressinstall.swf','/common/detect/get_flash.jhtml',{wmode:"transparent",salign:"TL",allowScriptAccess:"sameDomain",swliveconnect:"false"},{});
	}

	if ( options.method == "confirm" ) {
		NICK.overlay._createConfirmEvents();
	}
	// fixes transparent background issues on IE  
	if (options.invisibleBackground) {
		$('iframe.o_popup_iframe').attr('allowTransparency','true').addClass("o_popup_iframe_transparent");
	}

	$(document).trigger("overlayLoaded");
}

/* Needs re-write */
NICK.overlay._cbContinue = null;
NICK.overlay._cbCancel   = null;
NICK.overlay.confirm = function( message, cbContinue, cbCancel ) {
	NICK.overlay._cbContinue = cbContinue;
	NICK.overlay._cbCancel   = cbCancel;

	var html  = '<p>' + message + '</p>';
		html += '<ul class="confirm-options">';
		html += '<li><a href="javascript:void(0);" class="icon icon-continue confirm-continue">Continue</a></li>';
		html += '<li><a href="javascript:void(0);" class="icon icon-cancel confirm-cancel">Cancel</a></li>';
		html += '</ul>';

	NICK.overlay.open("Confirm", null, {method: "confirm", content: html, width: 400});
}

NICK.overlay.openCloset = function(){
	this.open('Avatar Editor', 'http://www.nick-d.mtvi.com/nicktropolis/game/modules_as3/closetPanelPN.swf', { method: 'flash', width: 500, height: 500 })
}

NICK.overlay._createConfirmEvents = function() {
	$(".o_popup .confirm-continue").click(function() {
		NICK.overlay.close();

		if ( NICK.overlay._cbContinue != null )
			NICK.overlay._cbContinue();
	});

	$(".o_popup .confirm-cancel").click(function() {
		NICK.overlay.close();

		if ( NICK.overlay._cbCancel != null )
			NICK.overlay._cbCancel();
	});
}

NICK.overlay.message = function( message, closeAfter ) {
	var html = '<p>' + message + '</p>';
	NICK.overlay.open("Confirm", null, {method: "confirm", content: html, width: 400 });
}

NICK.overlay.customHTML = function( title, html, width  ) {
	NICK.overlay.open( title, null, { method: "html", content: html, width: width });
}