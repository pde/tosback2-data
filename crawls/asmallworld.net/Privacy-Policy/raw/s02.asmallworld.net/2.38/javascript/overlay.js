var overlay = {

  close : function(validate) {	
    // Show dropdowns
    hideDropdowns(false, true);
    if( this.callback && validate && !this.callback() ) return;
    jQuery("div#overlay-shadow").remove();
    jQuery("iframe#overlay-frame").remove();
    jQuery("div#overlay-window").remove();
    if (this.version == "v4") {
      jQuery("#v4-overlay").remove();			
      if (overlay.jsdropshadow) {
        jQuery("#jsdropshadow").removeShadow();
        jQuery("#jsdropshadow").remove();
      }
    }
    jQuery(window).unbind("scroll");
    jQuery(window).unbind("resize");
    if (this.closeFunc) {
      this.closeFunc();
    }
    this.closed = true;
  },

  show : function (oFrame, oWin, drawMode) {
    jQuery(oFrame).css({ 'display' : 'block' });
    jQuery(oWin).css({ 'display' : 'block' });  
    if (overlay.jsdropshadow) {

      jQuery("#jsdropshadow").css({ 
        'height' : jQuery(oWin).height()-58 + "px", 
        'width' : jQuery(oWin).width()-58 + "px",
        'top' : jQuery(oWin).offset().top + 25 + "px", 
        'left' : jQuery(oWin).offset().left + 26 + "px"
      });

      jQuery("#jsdropshadow").show();
      overlay.showDropShadow(drawMode);

    }		
  },

  completeIntialization : function (targetEl, redrawDropShadow) {

    var element = "#overlay-window";

    var isFF3PC = (window.Core.Client.os != "Mac" && jQuery.browser.mozilla && parseFloat(jQuery.browser.version.substr(0,3)) >= 1.9);
    if ( isFF3PC ) {
      overlay.initialized = false;
      window.scrollTo(0, 0);
    }

    window.setTimeout(function() {
      overlay.centerElement(jQuery(element), jQuery(targetEl), redrawDropShadow);
    }, 250);

    if (overlay.version == "v4") {
      if (jQuery("#overlay-logo").length > 0) jQuery("#overlay-logo").show();
      if (jQuery("#overlay-title").length > 0) jQuery("#overlay-title").show();
      if (jQuery("#overlay-subtitle").length > 0) jQuery("#overlay-subtitle").show();
    }

    jQuery("#overlay-close").show();

  },

  //Centers an absolute positioned element taking into account its width and height
  centerElement : function ( element, targetEl, redrawDropShadow ) {

    if (overlay.jsdropshadow) overlay.toggleDropShadow(false);
    if (typeof(redrawDropShadow) == "undefined") redrawDropShadow = false;

    //gather dimensions used for calculating new top and left of element.
    var viewportDimArray = getViewportDimensions();
    var viewWidth = parseInt(viewportDimArray[0]);
    var viewHeight = parseInt(viewportDimArray[1]);
    var viewTop = parseInt(jQuery(window).scrollTop());
    var targetTop = jQuery(targetEl).offset().top;
    var targetLeft = jQuery(targetEl).offset().left;
    var targetTopOffset = (targetTop > viewHeight) ? (targetTop - viewHeight)/2 : (targetTop / 2);

    var isFF3PC = (window.Core.Client.os != "Mac" && jQuery.browser.mozilla && parseFloat(jQuery.browser.version.substr(0,3)) >= 1.9);

    // Vertical centering logic, if needed
    if ( viewHeight < (element.height() + 40)) {
      // set to top of viewport, if overlay is taller than viewport height
      var calculatedTop = viewTop;
    } else {
      //top = center - 1/2 of element height
      var calculatedTop = Math.floor(viewTop + (viewHeight / 2) - (element.height() / 2) - targetTopOffset );
    }
    

    if (viewHeight > (element.height() + 96) || ( !overlay.initialized && (viewTop > element.height() || isFF3PC) ) ) {
      var calculatedTop = viewTop + 96;
      overlay.initialized = true;
    }

    //left = center - 1/2 of element width
    var calculatedLeft = Math.floor((viewWidth / 2) - (element.width()/ 2) - (targetLeft / 2) );

    element.css({ 'top' : calculatedTop + 'px', 'left' : calculatedLeft + 'px' });

    if (overlay.jsdropshadow) { 
      overlay.delayedFunctionCall( 
        function() {
          if (typeof(element) != "undefined") {
            overlay.toggleDropShadow(true);
            if (redrawDropShadow) overlay.show("#overlay-frame", "#overlay-window", "redraw");
            overlay.positionDropShadow( jQuery(element).offset().top , jQuery(element).offset().left );
          }
        }
      );
    }
  },

  displaySuccessMessage : function(msg) { 
    jQuery(".overlay-content").html('<div id="overlay-success-message">' + msg + '</div>');
    window.setTimeout(function() {
      jQuery("#v4-overlay").fadeTo("slow", 0, function() { overlay.close(); });
    }, 3000);
  },

  displayErrorMessage : function(msg) { 

    var errorHTML = '<div id="overlay-error-message">\
    <p><strong>' + msg + '</strong></p>\
    <p><a href="javascript:void 0" onclick="overlay.close()" class="button-generic">Close</a></p>\
    </div>';

    jQuery(".overlay-content").html(errorHTML);

  },

  delayedFunctionCall : function(func) {

    window.setTimeout( func, 100 );

  },

  removeLoaderAnimation : function() {

    var v4LoaderAnimation = jQuery("#overlay-window #v4-overlay-loader");
    if (v4LoaderAnimation.length > 0) {
      jQuery("#overlay-window #v4-overlay-loader").remove();
    } else {            
      jQuery("#overlay-window #overlay-loader").remove();
    }		

  },

  displayLoaderAnimation : function(hideOverlayContent) {

    if (typeof(hideOverlayContent) == "undefined") hideOverlayContent = true;

    overlay.removeLoaderAnimation();
    if (hideOverlayContent) {
      jQuery("#overlay-window .overlay-content").wrapInner('<div class="hidden"></div>');
    }
    var loaderAnimationId = (overlay.version == 'v4') ? 'v4-overlay-loader' : 'overlay-loader';

	jQuery("#overlay-window .overlay-content").append("<div id='" + loaderAnimationId + "'></div>");
	

  },

  resizeShadow : function() {

    //establish the modal shadow
    viewportDimArray = getViewportDimensions();
    bodyWidth = viewportDimArray[0] - getScrollBarWidth();
    bodyHeight = viewportDimArray[1];

    jQuery("#overlay-shadow").css({ 
      'width' : bodyWidth + "px",
      'height' :  bodyHeight + "px"
    });

    jQuery("#overlay-frame").css({ 
      'width' : bodyWidth + "px",
      'height' : bodyHeight + "px"
    });

  },

  repositionShadow : function () {

    var scrollTop = parseInt(jQuery(window).scrollTop());
    jQuery("#overlay-shadow").css({ 
      'top' :  scrollTop + "px"
    });

    jQuery("#overlay-frame").css({ 
      'top' : scrollTop + "px"
    });

  },

  showDropShadow : function (state) {
    if (state == 'draw') {
      jQuery("#jsdropshadow").dropShadow({
        left: -10,
        top: -10,
        blur: 5,
        padding: 20,
        color: '#000',
        opacity: .5
      });
    } else if (state == 'redraw'){
      jQuery("#jsdropshadow").redrawShadow();
    }
  },

  positionDropShadow : function (elTop, elLeft) {

    jQuery("#jsdropshadow").css({ 
      'top' : elTop + 25 + "px", 
      'left' : elLeft + 26 + "px"
    });

    jQuery('#' + jQuery("#jsdropshadow").shadowId()).css({ 
      'top' : elTop + 11 + "px", 
      'left' : elLeft + 13 + "px"
    });

  },

  toggleDropShadow : function (state) {

    if (state) {
      jQuery("#jsdropshadow").show();
      jQuery('#' + jQuery("#jsdropshadow").shadowId()).show();	
    } else {
      jQuery("#jsdropshadow").hide();
      jQuery('#' + jQuery("#jsdropshadow").shadowId()).hide();
    }
  },

  //Loads modal dialog overlay window into DOM with options as settings.
  //options.shadow = (true|false) - use background shadow
  //options.content = (string) - use content for body of dialog
  //options.url = (href) - use url for asych retrival of content
  //options.width = (number) - used to set width of dialog window
  //options.name = (dialog|balloon) - sets type of dialog to use (rounded borders||balloon tooltip)
  load : function( options ) {

    this.name = options.name;
    this.title = options.title;
    this.subtitle = options.subtitle;
    this.header = options.header;
    this.target = options.target;
    this.width = options.width;
    this.shadow = options.shadow;
    this.url = options.url;
    this.method = options.method;
    this.content = options.content;
    this.initFunc = options.initFunc;
    this.callback = options.callback;
    this.closeFunc = options.closeFunc;
    this.iframe = options.iframe;
    this.theclass = options.theclass;
    this.height = options.height;
    this.version = options.version;		
    this.jsdropshadow = (this.version == 'v4' && jQuery.browser.msie && parseInt(jQuery.browser.version)<=6);
    this.closed = false;
    this.initialized = false;
	this.nologo = options.nologo;

    // Hide dropdowns
    hideDropdowns(true, true);

    //form html that represents the dialog window and modal shadow
	var backgroundHTML = [];

 	backgroundHTML.push("<div id='overlay-shadow' style='background: #fff; opacity: 0.5'></div>"); 
//	backgroundHTML.push("<iframe style='background: #fff !important; opacity: 0.6 !important;' scrolling='0' frameborder='0' id='overlay-frame' class='overlay-frame' src='" + static_server + "/static_pages/empty.html' allowtransparency='true'></iframe>");

	jQuery("body").prepend(backgroundHTML.join(""));		
 
    targetEl = ( this.target ) ? this.target : "body";

    var startHTML = (this.version == 'v4') ? "<div id='v4-overlay'><div id='overlay-window' class=" + this.theclass + "></div></div>" : "<div id='overlay-window'></div>";
    if (this.jsdropshadow) startHTML += "<div id='jsdropshadow'></div>";

    jQuery(targetEl).prepend(startHTML);

    //set width
    if(this.width){
      jQuery("#overlay-window").css({ width : this.width + 'px' });
      if (this.version == 'v4') jQuery("#v4-overlay").css({ width : this.width + 'px' });
    }
    //set height
    if(this.height){
      jQuery("#overlay-window").css({ height : this.height + 'px' });
    }

    //use dialog js to style rounded corners 
    dialog.modify(jQuery("#overlay-window")[0], this.name);

    var defaultContent = [];
	
	defaultContent.push("<a href='javascript:void 0' id='overlay-close' class='f_right'></a>");	
	
	if ((this.version == 'v4') && !(this.title || this.subtitle || this.nologo)) defaultContent.push("<div id='overlay-logo'></div>");
    if (this.title || this.subtitle) {
      var titleContent = '<div id="overlay-title">';
      titleContent += "<h1>" + this.title + "</h1>";
      if (this.subtitle) titleContent += '<div id="overlay-subtitle">' + this.subtitle + "</div>";
      titleContent += "</div>";
      defaultContent.push(titleContent);			
    }

    jQuery("#overlay-window .overlay-content").before(defaultContent.join(""));

    this.displayLoaderAnimation(false);

    this.centerElement(jQuery("#overlay-window"), jQuery(targetEl));       
    this.resizeShadow();
    this.repositionShadow();

    if (this.shadow) {
      jQuery("#overlay-shadow").addClass("bg-shadow");
    }

    jQuery(window).scroll(function(){
      overlay.centerElement(jQuery("#overlay-window"), jQuery(targetEl));       
      overlay.repositionShadow();
    });

    jQuery(window).resize(function(){
      overlay.centerElement(jQuery("#overlay-window"), jQuery(targetEl));
      overlay.resizeShadow();
    });

    //setup shadow events


// jQuery("#overlay-shadow").click(function(){
//	  overlay.close();
//    });

    //setup close button events
    jQuery("#overlay-close").click(function(){
      overlay.close();
    });

    if (this.url) {
      this.centerElement(jQuery("#overlay-window"), jQuery(targetEl));
      this.show("#overlay-frame", "#overlay-window", "draw");
    }

    //Get content from this.url or directly from this.content
    if(!this.content && this.url ){

      if (this.method == "POST") {
        jQuery.post(this.url, function(data){				
          overlay.removeLoaderAnimation();
          jQuery("#overlay-window .overlay-content").append(data);
          completeIntialization(targetEl, true);
        });
      } else {
        if (typeof(this.iframe != "undefined") && this.iframe) {
          overlay.removeLoaderAnimation();
          jQuery("#overlay-window .overlay-content").append('<iframe src="' + this.url + '" width="' + (this.width-40) + '" height="' + this.height + '" scrolling="no" frameborder="0"></iframe>');
          overlay.completeIntialization(targetEl, true);
        } else {
          jQuery.get(this.url, function(data){
            overlay.removeLoaderAnimation();
            jQuery("#overlay-window .overlay-content").append(data);
            overlay.completeIntialization(targetEl, true);
          });
        }
      }
    }else{
      overlay.removeLoaderAnimation();
      jQuery("#overlay-window .overlay-content").append(this.content);
      overlay.completeIntialization(targetEl, false);
      overlay.show("#overlay-frame", "#overlay-window", "draw");
    }

    if ( this.initFunc )  {
      this.initFunc(jQuery("#overlay-window .overlay-content")[0]);
    }  
  }
}


function OpenDialog(dialogtype,gotheader) {

  var Dialog_URL = 'overlay_' + dialogtype + '.html';
  var Got_Header = gotheader; 

  overlay.load({
    name: 'dialog',
    content: false,
    url: Dialog_URL,
    width: 600,
    header: Got_Header,
    version: "v4",
    callback : function(){ return validateForCreator(); }
  });
}



