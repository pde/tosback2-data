
/*de.bild.accordion:27524136.4*/



var de = de || {};
de.bild = de.bild || {};


/**
* Provides slide and content loading functionality for accordion module
*/

de.bild.accordion = (function($, SandBox) {

	var moduleList = [],
		settings = {
		    'activeClass': 'active',
		    'ktgAccClassname': 'ktgacc'
		};
	var eventController = null;
	
	function init( $collection ) {
		
        moduleList = SandBox.removeDeletedElements( moduleList );
        eventController = SandBox.getActionEvents('accordion');
				
		$collection.each(function() {
			var module = $(this);			
			if( !SandBox.moduleIsInitialized(module) ) {
			    
			    if( module.hasClass(settings.ktgAccClassname) ) {
                    moduleList.push( new SimpleAccordion(module) );    
			    } else {
			        moduleList.push( new Accordion(module) );
			    }
			    
			}			
		});		
        return true;		
	}
		
	
	
	
	 /**
     * SimpleAccordion Contructor
     * @param $domElem - {jQuery Object} representing the SimpleAccordion
     * */
	function SimpleAccordion( $domElem ){
	    
	    this.$container = $domElem;	    
	    this.$clickables = $domElem.find('h4');	    
	    this.$lastClickedObj = $domElem.find('h4.active');
	    
	    this.setup();
 
	}
	
	
	SimpleAccordion.prototype = {
        
        'setup': function() {
                        
            this.bindUiEvents();
            
            this.handleSpecialCase();
            
            SandBox.setModuleInitialized(this.$container);
            
        },
        
        'bindUiEvents': function() {
                        
            var _this = this;
            
            this.$container.on( eventController.click, 'h4', function(event){
                                             
                event.preventDefault();
                
                var _$this =  $(this);
                
                /* Click on an active Accordion Element */
                if(_$this.hasClass(settings.activeClass)) {
                    
                    _this.$lastClickedObj = _$this;                                    
                    _this.$lastClickedObj.next('section').stop().slideUp('slow');
                    _this.$lastClickedObj.removeClass( settings.activeClass );
                    
                } else {
                                        
                    _this.$lastClickedObj.next('section').stop().slideUp('slow');                
                    _this.$clickables.removeClass( settings.activeClass );                                     
                    
                    _this.$lastClickedObj = _$this;                    
                    _this.$lastClickedObj.next('section').stop().slideDown('slow');
                    _this.$lastClickedObj.addClass( settings.activeClass );
                    
                }
                
            });
            
        },
        
        'handleSpecialCase': function(){
            
            this.$container.find('table').parent('section').css('float','none');
            
        }
        
   }
	
	
	
	
	/**
	 * Accordion Contructor
	 * @param $domElem - {jQuery Object} representing the Accordion
	 * */
	function Accordion ( $domElem ) {
		
		this.$container = $domElem;
		this.$acctoggles = $domElem.find(".acctoggle");
        this.$activeElement = $domElem.find(".acctoggle.active");
		this.setup();
	}
	
	Accordion.prototype = {
		
		'setup': function() {

            if(!this.$activeElement.length) {
                this.$acctoggles.first().find("h4").trigger(eventController.mousedown);
            }
			
			this.bindUiEvents();
			SandBox.setModuleInitialized(this.$container);
			
		},
		
		'bindUiEvents': function() {
		    
			var _this = this;
			
			this.$acctoggles.each(function() {
				var $toggle = $(this);
				_this.bindHeaderEvents($toggle);
				$(this).find("h4").on(eventController.mousedown, function(e) {
					
					e.preventDefault();
					
					// if accordion is open then close it
					if ($toggle.hasClass("active")) {
						_this.close($toggle);
					}
					// if accordion is closed then open it and close currently open accordion
					else {
						$curToggle = _this.$container.find(".acctoggle.active");
                        _this.open($toggle);
						_this.close($curToggle);
						$curToggle.find("h4").show();
						$curToggle.removeClass("showAd");						
					}
				});
			});
			
			
            /* HOTFIX SFTDEV-1672 */
            this.$container.on( eventController.click, 'a', function(event){
            
                if($(this).attr('href') === '#') {
                    event.preventDefault();    
                }
                
            });
			
		},
		
		'open' : function($acctoggle) {
			var url = $acctoggle.attr("data-ajax-href");
			var $accbody = $acctoggle.find(".accbody");
			var _this = this;
			//Load and replace content
			SandBox.get(url,	
				function(response) {
					$acctoggle.addClass("activearrow active");
					$accbody.replaceWith(response);
					$accbody = $acctoggle.find(".accbody");
					$accbody.hide();
					$accbody.slideDown('slow');
					_this.bindHeaderEvents($acctoggle);
					SandBox.initModules($acctoggle);
				});
		},
		
		'close' : function($acctoggle) {
			$acctoggle.removeClass("activearrow");
			$acctoggle.find(".accbody").slideUp('slow', function() {
				$acctoggle.removeClass("active");
				$(this).empty();
				//$(this).show();
				//$(this).data('moduleInitialized', false);
			});
		},
		
		'bindHeaderEvents' : function($acctoggle) {
			var $accbody = $acctoggle.find(".accbody");
			// hide header when ad is shown
			$accbody.on('mediaGallery.showAd', function(){
				$acctoggle.find("h4").hide();
				$acctoggle.addClass("showAd");
			});
			// show header when ad is hidden
			$accbody.on('mediaGallery.hideAd', function(){
				$acctoggle.find("h4").show();
				$acctoggle.removeClass("showAd");
			});
		}
	}

	return {
		
		'init': function( $collection ) {
			return init($collection);
		},
		'getModuleList': function() {
			return moduleList;
		}
		
	}

})(jQuery, de.bild.globalSandBox);

/*de.bild.jalousie:25425052.3*/

var de = de || {};
de.bild = de.bild || {};
de.bild.jalousie = de.bild.jalousie || {};

de.bild.jalousie = (function($, SandBox) {

  var moduleList = [],
    settings = {
      'activeClass' : 'active'
    };
  
  $.subscribe( 'domNodeRemoved', function(){
      moduleList = SandBox.removeDeletedElements( moduleList );
  });
  
  function init( $collection ) {
                
    $collection.each(function() {
      	var module = $(this);			
		if( !SandBox.moduleIsInitialized(module) ) {
        	moduleList.push( new Jalousie( module ) );
      	}     
    });   
        return true;    
  }

  
  
  /**
   * VideoTeaser Contructor
   * @param $domElem - {jQuery Object} representing the VideoTeaser
   * */
  function Jalousie( $domElem ) {
    
    this.$container = $domElem;           
    this.setup();
    
  }
    
  
  Jalousie.prototype = {
    
    'setup': function() {
 
      this.bindUiEvents();
                  
      SandBox.setModuleInitialized(this.$container);
      
    },
        
    
    'bindUiEvents': function() {
            
      var _this = this;

      this.$container.on("mouseenter",".j-item", function(event) {
        _this.eventHandler(event);
      });

      this.$container.on("focus",".hentry > a", function(event) {
        _this.eventHandler(event);
      });

      if("ontouchstart" in window) {
        this.$container.on("touchstart",".hentry > a", function(event) {
          if( !$(this).parents(".j-item").hasClass('active') ) {
            event.preventDefault();
            _this.eventHandler.call(this, event);
          }
        });
      }

    },
    
    
    'eventHandler': function( event , type) {      
      var $el = $(event.target);

      if(event.type === 'focus' || event.type === 'focusin' || event.type === 'touchstart') {
        $el = $(event.target).parents(".j-item");
      }

      $el.siblings(".j-item").removeClass("active");
      $el.addClass("active");
    }
  }

    
  return {
    'init': function( $collection ) {
      return init($collection);
    },
    'getModuleList': function() {
      return moduleList;
    }
    
  }
  
  

})(jQuery, de.bild.globalSandBox);

/*qgtv:27490902.2*/

var de = de || {};
de.bild = de.bild || {};
de.bild.qgtv = de.bild.qgtv || {};
var qgtv = new Object();

de.bild.qgtv.reInitID = false;

//check auf IE 6
if (jQuery.browser.msie && jQuery.browser.version.substr(0,1)<7) {
 de.bild.qgtv.ie6 = true;
}
else{
 de.bild.qgtv.ie6 = false;
}

// Für FlashFix im IE6-8
de.bild.qgtv.vidParams = "";

de.bild.qgtv.ChangeSubformState = function(id){

    if (jQuery('#' + id).attr('checked')) {
        jQuery('.' + id).removeClass('hidden');
    }
    else {
        jQuery('.' + id).addClass('hidden');
    }
}

de.bild.qgtv.GetCookie = function(cookieName){
    wert = '';
    cookies = document.cookie;
    if (cookies) {
        name = '';
        ende = false;
        while (cookieName != name && !ende) {
            j = cookies.search('=');
            k = cookies.search(';');
            if (j < 0) {
                ende = true;
            }
            if (k < 0) {
                ende = true;
                k = cookies.length
            }
            name = cookies.substring(0, j);
            wert = cookies.substring(j + 1, k);
            if (!ende) {
                cookies = cookies.substring(k + 1);
            }
        }
    }
    return wert;
};

de.bild.qgtv.UserHasVoted = function(votingId){
    wert = de.bild.qgtv.GetCookie('QGTV_Votes');
    return wert.search(votingId) >= 0;
};

de.bild.qgtv.SubmitQGTV2 = function(source, formid, action){
  //Aufgrund des IE/PBE Bugs, wird hier das Standardevent bei A-Tags unterbunden
    if (window.event) {
        var e = window.event;
        e.returnValue = false;
    }
    selector = formid + ' form';
    if (jQuery(selector + " input[name='__action']").length > 0) {
        jQuery(selector + " input[name='__action']").val(action);
    }
    else {
        jQuery(selector).append('<input name="__action" type="hidden" value="' + action + '" />');
    }
    parameter = jQuery(selector).serialize();
	de.bild.qgtv.AjaxReplace(source, 'POST', parameter, formid);
};

de.bild.qgtv.SubmitQGTV = function(source, formid, action){
	de.bild.qgtv.SubmitQGTV2(source, '#qgtv' + formid, action);
	
};

/*
 * Duplicated method to call generic bild lightbox
 */
de.bild.qgtv.ShowFormBildLightbox = function(source, formid, delay){
    parameter = jQuery(formid).serialize();
    de.bild.qgtv.ShowBildLightbox(source, 'POST', parameter, delay);
};

/*
 * Duplicated method to call generic bild lightbox (conditional way)
 */
de.bild.qgtv.ShowCaptchaBildLightbox = function(source, formid, delay, switchFunction){
    parameter = jQuery(formid).serialize();
    de.bild.qgtv.ShowBildLightboxCond(source, 'POST', parameter, delay, function(html) {
        var captchaOk = jQuery(html).find('#qgtvCaptchaOk').length != 0;
        if (captchaOk && typeof(switchFunction) === "function")
        {
            switchFunction();
        }
        return !captchaOk;
    });
};

de.bild.qgtv.ShowFormLightbox = function(source, formid, delay){
    parameter = jQuery(formid).serialize();
    de.bild.qgtv.ShowLightbox(source, 'POST', parameter, '', true, delay);
};

de.bild.qgtv.ShowCaptchaLightbox = function(source, formid, delay, switchFunction){
    parameter = jQuery(formid).serialize();
    de.bild.qgtv.ShowLightboxCond(source, 'POST', parameter, '', true, delay, function(html) {
        var captchaOk = jQuery(html).find('#qgtvCaptchaOk').length != 0;
        if (captchaOk && typeof(switchFunction) === "function")
        {
            switchFunction();
        }
        return !captchaOk;
    });
};

de.bild.qgtv.ShowPlayerLightbox = function(source){
    de.bild.qgtv.ShowLightbox(source, 'POST', '', '');
    return false;
};

de.bild.qgtv.AjaxReplace = function(source, type, parameter, destination){
    destination = jQuery(destination);
    jQuery.ajax({
        url: source,
        type: type,
        data: parameter,
        success: function(html){
            destination.replaceWith(html);
            QGTV.initialize();
        
            de.bild.qgtv.zoom.Events();
        },
        error: function(html){
        }
    });
};

/** LIGHTBOX */
/**  @param source -  Das zu ladende Snippet
 *  @param type -  Die Methode - Get/Post
 *  @param params -  Die Parameter, die der Ajax-Aufruf mitnehmen soll
 *  @param background - die Farbe des Hintergrunds in der Lightbox
 */
//Lightbox Variablen
var windowWidth = jQuery(window).width();
var windowHeight = jQuery(window).height();
var fromTop = null;
// Default für den Background der Lightbox, kann in HTML-Farbwerte geändert werden. Per default erstmal leer
if (jQuery('.lightbox').length == 0) {
    var bg = null;
}

de.bild.qgtv.ShowBildLightbox = function(source, type, params, delay){
     //Aufgrund des IE/PBE Bugs, wird hier das Standardevent bei A-Tags unterbunden
    if (window.event) {
        var e = window.event;
        e.returnValue = false;
    }
    jQuery.ajax({
        url: source,
        data: params,
        type: type,
        success: function(html){
        	
            //Flash Elemente fuer den IE fixen
            if (jQuery.browser.msie && jQuery.browser.version.substr(0,1) <= 8 && jQuery(html).find("object").length != 0)
            {
                var temp = jQuery(html).find("object");
                de.bild.qgtv.vidParams = "<object width='"+temp.attr("width")+"' height='"+temp.attr("height")+"' id='"+temp.attr("id")+"' data='"+temp.attr("data")+"' class='"+temp.attr("class")+"' type='"+temp.attr("type")+"' >";
  
                jQuery(html).find("object param").each(function(index, value)
                {
                    var obj = new Object();
                    obj.name = jQuery(value).attr("name");
                    obj.value = jQuery(value).attr("value");
                    de.bild.qgtv.vidParams += "<param name='" + obj.name + "' value='" + obj.value + "'>";
                });
  
                de.bild.qgtv.vidParams += "</object>";
            }
            //Flash fix Ende
          
			var _params = {
				wrapperClass : 'lightbox',
				overlayColor : "#000",
				content : html
			};
			
		    setTimeout(function() {
		    		//close any old lightboxes before opening new
		    		jQuery("body").closeBildLightbox();
					jQuery("body").bildLightbox(_params);          
    			}, delay);
        }
    });
};
de.bild.qgtv.ShowBildLightboxCond = function(source, type, params, delay, condition){
     //Aufgrund des IE/PBE Bugs, wird hier das Standardevent bei A-Tags unterbunden
    if (window.event) {
        var e = window.event;
        e.returnValue = false;
    }
    jQuery.ajax({
        url: source,
        data: params,
        type: type,
        success: function(html){

            if (condition(html))
            {
                //Flash Elemente fuer den IE fixen
                if (jQuery.browser.msie && jQuery.browser.version.substr(0,1) <= 8 && jQuery(html).find("object").length != 0)
                {
                    var temp = jQuery(html).find("object");
                    de.bild.qgtv.vidParams = "<object width='"+temp.attr("width")+"' height='"+temp.attr("height")+"' id='"+temp.attr("id")+"' data='"+temp.attr("data")+"' class='"+temp.attr("class")+"' type='"+temp.attr("type")+"' >";

                    jQuery(html).find("object param").each(function(index, value)
                    {
                        var obj = new Object();
                        obj.name = jQuery(value).attr("name");
                        obj.value = jQuery(value).attr("value");
                        de.bild.qgtv.vidParams += "<param name='" + obj.name + "' value='" + obj.value + "'>";
                    });

                    de.bild.qgtv.vidParams += "</object>";
                }
                //Flash fix Ende
				var _params = {
					wrapperClass : 'lightbox',
					overlayColor : "#000",
					content : html
				};
	            setTimeout(function(){
	            		//close any old lightboxes before opening new
	            		jQuery("body").closeBildLightbox();
						jQuery("body").bildLightbox(_params);  
				    }, delay);
			}
        }
    });
};

de.bild.qgtv.ShowLightbox = function(source, type, params, background, draggable, delay){
     //Aufgrund des IE/PBE Bugs, wird hier das Standardevent bei A-Tags unterbunden
    if (window.event) {
        var e = window.event;
        e.returnValue = false;
    }
    bg = background;
    jQuery.ajax({
        url: source,
        data: params,
        type: type,
        beforeSend: function(){
            de.bild.qgtv.loaderIcon('.lightbox')
        },
        complete: function(){
            jQuery('#loaderIcon').remove()
        },
        success: function(html){
            //Flash Elemente fuer den IE fixen
            if (jQuery.browser.msie && jQuery.browser.version.substr(0,1) <= 8 && jQuery(html).find("object").length != 0)
            {
                var temp = jQuery(html).find("object");
                de.bild.qgtv.vidParams = "<object width='"+temp.attr("width")+"' height='"+temp.attr("height")+"' id='"+temp.attr("id")+"' data='"+temp.attr("data")+"' class='"+temp.attr("class")+"' type='"+temp.attr("type")+"' >";
  
                jQuery(html).find("object param").each(function(index, value)
                {
                    var obj = new Object();
                    obj.name = jQuery(value).attr("name");
                    obj.value = jQuery(value).attr("value");
                    de.bild.qgtv.vidParams += "<param name='" + obj.name + "' value='" + obj.value + "'>";
                });
  
                de.bild.qgtv.vidParams += "</object>";
            }
            //Flash fix Ende
          
            de.bild.qgtv.InitiateLightbox(html, draggable, delay);
        }
    });
};

de.bild.qgtv.ShowLightboxCond = function(source, type, params, background, draggable, delay, condition){
     //Aufgrund des IE/PBE Bugs, wird hier das Standardevent bei A-Tags unterbunden
    if (window.event) {
        var e = window.event;
        e.returnValue = false;
    }
    bg = background;
    jQuery.ajax({
        url: source,
        data: params,
        type: type,
        beforeSend: function(){
            de.bild.qgtv.loaderIcon('.lightbox')
        },
        complete: function(){
            jQuery('#loaderIcon').remove()
        },
        success: function(html){

            if (condition(html))
            {
                //Flash Elemente fuer den IE fixen
                if (jQuery.browser.msie && jQuery.browser.version.substr(0,1) <= 8 && jQuery(html).find("object").length != 0)
                {
                    var temp = jQuery(html).find("object");
                    de.bild.qgtv.vidParams = "<object width='"+temp.attr("width")+"' height='"+temp.attr("height")+"' id='"+temp.attr("id")+"' data='"+temp.attr("data")+"' class='"+temp.attr("class")+"' type='"+temp.attr("type")+"' >";

                    jQuery(html).find("object param").each(function(index, value)
                    {
                        var obj = new Object();
                        obj.name = jQuery(value).attr("name");
                        obj.value = jQuery(value).attr("value");
                        de.bild.qgtv.vidParams += "<param name='" + obj.name + "' value='" + obj.value + "'>";
                    });

                    de.bild.qgtv.vidParams += "</object>";
                }
                //Flash fix Ende

                de.bild.qgtv.InitiateLightbox(html, draggable, delay);
            }
        }
    });
};
de.bild.qgtv.InitiateLightbox = function(html, draggable, delay){
    jQuery('.lightbox').remove();
 //Um die LB wird ein Wrapper gelegt, die LB wird auf display none gesetzt und der Wrapper wird wieder entfernt.
 //Das dient dazu, um das Springen der LB zu verhindern
 html="<div id='tempLB' style='display:none'>"+html+"</div>";
    jQuery('body').append(html);
    jQuery('.lightbox').hide();
 html = jQuery("#tempLB").html();
 jQuery("#tempLB").remove();
 jQuery('body').append(html);
    
//IE Flash Fix
if (jQuery.browser.msie && jQuery.browser.version.substr(0,1) <= 8)
{
    jQuery(".lightbox").find("object").parent().html(de.bild.qgtv.vidParams);
}

 //Wenn ein Video verbaut ist, wird dieses fuer das Ipad umgewandelt
     jQuery(".lightbox").find(".clipTVplayer, .videoGallery").each(function(){
        de.bild.qgtv.reInitID = true;
    });
    if (delay == null) {
        delay = 0;
    }
    if (draggable == 1) {
         jQuery(".lightbox").draggable({ handle: '.header' });
    }

    setTimeout(function(){
        de.bild.qgtv.ActivateLightbox();
    }, delay);
};

de.bild.qgtv.ActivateLightbox = function(){
    if (bg == null | bg == '') {
        // Falls keine Hintergrundfarbe angegeben ist, wird die transparente Lightbox angezeigt inkl. Rahmen um das Element
        opacity = 0;
         bg = "black";
    }
 jQuery('.lightbox').addClass('layer');
    fromTop = jQuery(document).scrollTop();
    var documentHeight = jQuery(document).height();
    var layerHeight = null;
    //globale Variablen setzen
    de.bild.qgtv.calculateScreen();
    if (documentHeight < windowHeight) {
        layerHeight = windowHeight;
    }
    else {
        layerHeight = !de.bild.qgtv.ie6 ?documentHeight : windowHeight;
    }
    jQuery('#layer').remove();
 if (!de.bild.qgtv.ie6) {
  jQuery('#outerWrapper').prepend('<div id="layer" ' +
  'style="' +
  'left: 0;' +
  'width:' + windowWidth + 'px;' +
  'height:' + layerHeight + 'px;' +
  'z-index:4999;' +
  'position: fixed;' +
  'opacity: 0.' + opacity + ';' +
  'filter: Alpha(opacity=' + opacity + '0);' +
  'background:' + bg +';"></div>');
  jQuery('.lightbox').attr('style', 'position:fixed;');
 }
 else {
 jQuery('#outerWrapper').prepend('<div id="layer" ' +
    'style="' +
    'top:' + fromTop + 'px;' +
    'left:0;' +
    'width:' + windowWidth + 'px;' +
    'height:' + layerHeight + 'px;' +
    'z-index:4999;' +
    'position:absolute;' +
 'opacity: 0.' + opacity + ';' +
    'filter:Alpha(opacity=' + opacity + '0);' +
 'background:' + bg + ';"></div>');
    jQuery('body').css('overflow', 'hidden');
    jQuery('html').css('overflow', 'hidden');
    window.scrollTo(0, fromTop);
    jQuery('.lightbox').attr('style', 'position:absolute;');
 }

    var headerSize = jQuery('.lightbox > .innerBox > .section').width();
    jQuery('.innerBox > .section > .header').css('width', headerSize);
    //Lightbox an Browserfenster anpassen
    de.bild.qgtv.resizeLightbox();
    // esc-Taste gedrückt? Dann schließe die Lightbox
    jQuery('.close').click(function(e){

e.preventDefault();
        de.bild.qgtv.DeactivateLightbox();
    });
    jQuery(document).keyup(function(e){
        if (e.keyCode == 27) {
            de.bild.qgtv.DeactivateLightbox();
        }
    });
    jQuery(window).resize(function(){
        de.bild.qgtv.resizeLightbox();
    });

    jQuery(window).scroll(function(){

     if(!jQuery(".lightbox").hasClass("ui-draggable")){
        de.bild.qgtv.resizeLightbox();

      }
    });
  if (de.bild.qgtv.reInitID) {
        de.bild.video.replaceFlash();
        de.bild.qgtv.reInitID = false;
    }
    jQuery('.section').resize(function(){
        //de.bild.qgtv.resizeLightbox();
    });

// re-register videos
	de.bild.video.initVideoIn( jQuery('.lightbox') );

};

// richtet die Lightbox und das sie umgebende Layer im aktuellen Fenster mittig aus
de.bild.qgtv.contentWidth = null;
de.bild.qgtv.contentHeight = null;
de.bild.qgtv.theLightBox = null;
de.bild.qgtv.resizeLightbox = function(){

    var lightbox = jQuery(".lightbox");
    de.bild.qgtv.calculateScreen();

 //Workaround für verzögert ladene Flash Elemente
    var tmpVObject = jQuery(".lightbox .videoGallery object");
 if (tmpVObject.length > 0)
    {
        var tmpHeight = tmpVObject.attr("height");
        // kleiner Videoplayer
        if (tmpHeight == 282)
        {
            de.bild.qgtv.contentHeight = 419;
        }
        // großer Videoplayer
        else if (tmpHeight == 395)
        {
            de.bild.qgtv.contentHeight = 659;
        }
        // Audioplayer (Object-Größe: 134)
        else
        {
            de.bild.qgtv.contentHeight = 207;
        }
    }
    else
    {
        de.bild.qgtv.contentHeight = lightbox.height();
    }
    de.bild.qgtv.contentWidth =  lightbox.width();
  
 if(!de.bild.qgtv.ie6){
  var contentLeft = (windowWidth < de.bild.qgtv.contentWidth) ? 0 : ((windowWidth - de.bild.qgtv.contentWidth) / 2);
     var contentTop = (windowHeight <= de.bild.qgtv.contentHeight) ? 0 : ((windowHeight - de.bild.qgtv.contentHeight) / 2);
  lightbox.css({top: contentTop + 'px',left:contentLeft + 'px'});
 }
 else{
  var contentLeft = (windowWidth <= de.bild.qgtv.contentWidth) ? 0 : ((windowWidth - de.bild.qgtv.contentWidth) / 2);
     var contentTop = (windowHeight <= de.bild.qgtv.contentHeight) ? fromTop : ((windowHeight - de.bild.qgtv.contentHeight) / 2)+ fromTop;
  lightbox.css({top: contentTop + 'px',left:contentLeft + 'px'});
 }
 jQuery("#layer").css({width: windowWidth, height: windowHeight});
};

de.bild.qgtv.calculateScreen = function(){
    windowWidth = jQuery(window).width();
    windowHeight = jQuery(window).height();
};

de.bild.qgtv.DeactivateLightbox = function(){

jQuery('.lightbox').remove();
 jQuery('#layer').remove();

if (de.bild.qgtv.ie6) {
  jQuery('body').css('overflow', 'auto');
  jQuery('html').css('overflow', 'auto');
  window.scrollTo(0, fromTop);
 }

/*
 
 fadeOut hat gar nicht funktioniert..23/01/12

    jQuery('.lightbox').fadeOut(speed, function(){
        jQuery('.lightbox').remove();
    });
    jQuery('#layer').fadeOut(speed, function(){
        jQuery('#layer').remove();

if (de.bild.qgtv.ie6) {
  jQuery('body').css('overflow', 'auto');
  jQuery('html').css('overflow', 'auto');
  window.scrollTo(0, fromTop);
 }
    });

*/
    jQuery(window).unbind('resize');
    bg = null;

    if (window.event) {
        var e = window.event;
        e.returnValue = false;
    }
};

/** Laderädchen-Spaß */
de.bild.qgtv.loaderIcon = function(element){
    //setTimeout(function(){
    var h = jQuery(element).height();
    jQuery(element).html('<div id="loaderIcon" class="loading cform" style="height:' + h + 'px;" ></div>');//}
    //,requestTimeout)
};

/** Funktion zur Aninmation des DSM Ergebnisses. Zählt das aktuelle Ergebnis um 1 hoch
 *
 * @param id Die Id des Votings, nicht nötig, wenn nur ein Voting auf der Seite verbaut ist.
 * @param timeout die Zeit, die vergeht, bevor die Animation gestartet wird
 */
de.bild.qgtv.count = function(timeout, id){

    if (timeout == null) {
        timeout = 500;
    }
    setTimeout(function(){
        //Für den Fall, dass Votings IDs bekommen, muss diese Zeile auskommentiert, bzw bearbeitet werden
        if (id != null) {
            if (id.charAt(0) != "#") {
                id = "#" + id;
            }
            id = jQuery(id).children(".imgOuter").children(".imgInner").children(".votes");
        
        }
        else {
            id = jQuery(".votes");
        }
        //in diese Variable wird der aktuelle Votingstand geschrieben
        var votes = "";
        //Diese Variable dient zur Überprüfung, ob sich die Anzahl der Stellen nach dem Abstimmen verändert hat
        var votes_overflow = "";
        //Variable, die angibt, ob sich die Anzahl der Stellen verändert hat
        var overflow = "";
        //Array, dass die neuen (roten) Zahlen sammelt, um sie danach hochzufahren
        var slideUp = new Array();
        //Array, dass die alten Zahlen sammelt und sie herunterzufahren.
        var slideDown = new Array();
        //Offset für die
        var left = 0;
        //Variable, die die neue Einerstelle angibt. Dies ist wichtig, wenn beim Hinzukommen einer neuen Stelle keine Null am Ende steht. z.B: 9+2
        var overflow_number = "0";
        //in diesem String werden die führenden Nullen einer Zahl gespeichert
        var leading_zero = "";
        //gibt an, ob man sich noch am Anfang der Zahl befindet
        var leading = 1;
    
        //Anhand der Klassennamen wird hier der alte Ergebnisstand ermittelt. Dafür werden alle <span> Attribute des DSM Ergebnisses durchgegangen
        //und jeweils das letzte Zeichen der Klasse ausgelesen und zu einer Zahl zusammengefügt
        id.children('span').each(function(index, value){
            var span = jQuery(value).attr('class');
            //nummerischer Wert des <span>-Tags, welcher aus der Klasse ausgelesen wird
            span = span.charAt(span.length - 1);
        
            //Handling von Zahlen, die eine führende Null besitzenz.B: 003
            if (leading && span == "0") {
                leading_zero += "0";
            }
            else {
                leading = 0;
            }
            //jede einzelne Ziffer wird in einen String geschrieben
            votes += (span);
            //um später zu prüfen, ob eine neue Stelle hinzukommt, gibt es eine Prüfvariable
            votes_overflow += (span);
        });
    
        //Votingergebnis hochzählen
        votes++;
        votes = votes.toString();
        // Führende Nulle vorne ranhängen. Ausnahme bietet der Fall, dass man von 0 auf 1 zählt, da es dabei keinen Übertrag gibt aber trotzdem eine führende
        // 0 verschwindet
        if (votes != "1") {
            votes = leading_zero + votes;
        }
        votes_overflow = votes_overflow.toString();
    
    
        //Überprüfung, ob durch die Addition eine Stelle hinzukommt. z.B: 9+1=10
        if (votes.length != votes_overflow.length) {
            overflow = 1;
            overflow_number = votes.charAt(votes.length - 1);
            if (leading_zero.length != 0) {
                //votes und span üm je eine leading-zero kürzen, da es einen Übertrag gibt
                id.children('span').eq(1).remove();
                votes = votes.substr(1, votes.length - 1);
            }
        
        
        }
    
        var top = parseInt(jQuery(".votes > span").css("height"));
    
        //Vergleich, welche Zahl sich geändert hat und hinzufügen eines Überblendungs-Span-Tags
        id.children('span').each(function(index, value){
            var span = jQuery(value).attr('class');
            var oldelem = id.children('span').eq(index);
            left = index * parseInt(oldelem.css("width"));
        
        
            span = span.charAt(span.length - 1);
            if (span != votes.charAt(index)) {
                id.children('span').eq(-1).after('<span class="digit-r' + votes.charAt(index) + '" style="display:none; position:absolute; top:' + top + '; opacity:0"></span>');
                id.children('span').eq(-1).css("left", left);
            
                //die neuen und die alten Zahlen werden in Arrays geschrieben
                slideDown.push(oldelem);
                slideUp.push(id.children('span').eq(-1));
            }
        });
    
        //Wenn eine neue Stelle hinzukommt, wird am Ende der Zahl der Übertrag hinzugefügt und gleich animiert
        if (overflow) {
            var new_one = id.children('span').eq(-1).after('<span class="digit-r' + overflow_number + '"></span>');
            new_one = id.children('span').eq(-1).after('<span class="digit-r' + overflow_number + '" style="position:absolute; top:' + top + ';"></span>');
        
            id.children('span').eq(-1).css("left", left + parseInt(jQuery(".votes > span").css("width"))).animate({
                top: "-5px",
                opacity: "1",
                height: top
            }, 100, "swing").animate({
                top: "3px",
                opacity: "1",
                height: top
            }, 100, "swing").animate({
                top: "0px",
                opacity: "1",
                height: top
            }, 100, "swing", function(){
                id.children('span').eq(-1).remove();
            });
        }
    
        //Überlagern der sich geänderten Zahlen. Die neue(n) Zahl(en) schieben sich vor die alten. Im Hintergrund ändern die alten Zahlen
        // ihre Klassen auf die neue Zahl und die für die Anmimation verwendeten Zahlen werden entfernt
        jQuery(slideUp).each(function(index, value){
            var classname = value.attr("class");
            slideDown[index].animate({
                height: "1px"
            }, 500, "swing", function(){
                slideDown[index].css("height", "");
                slideDown[index].attr("class", classname);
                slideDown[index].removeAttr('style');
                value.remove();
            });
            //Hochfahren der roten Zahlen
            value.animate({
                top: "-5px",
                opacity: "1",
                height: top
            }, 100, "swing").animate({
                top: "3px",
                opacity: "1",
                height: top
            }, 100, "swing").animate({
                top: "0px",
                opacity: "1",
                height: top
            }, 100, "swing");
        });
    }, timeout);
};



/*--------------------------------------------------------------------
 * jQuery plugin: customInput()
 * by Maggie Wachs and Scott Jehl, http://www.filamentgroup.com
 * Copyright (c) 2009 Filament Group
 * Dual licensed under the MIT (filamentgroup.com/examples/mit-license.txt) and GPL (filamentgroup.com/examples/gpl-license.txt) licenses.
 * Article: http://www.filamentgroup.com/lab/accessible_custom_designed_checkbox_radio_button_inputs_styled_css_jquery/
 * Usage example below (see comment "Run the script...").
 --------------------------------------------------------------------*/
//-----DAS HAUPTOBJEKT----------------------------------------------------------------------
var QGTV = new Object();

/*
 * Init function for Hot-Or-Not voting buttons. 
 * Binds event handler to buttons to update checkbox and trigger form submit.
 */
QGTV.initHonButtons = function() {
	
	// select all clickable buttons
	var $honButtonRows = jQuery("div.qgtv div.qgtv-hon-buttons");
	$honButtonRows.each(function() {
		var $buttonRow = jQuery(this);
		// iterate over all button pairs
		var $currentPair = $buttonRow.find("div.qgtv-hon-button.active");
		$currentPair.each(function() {
			$this = jQuery(this);
			// input form element (hidden under visible checkbox graphic)
			var $input = $this.find("input[type=checkbox],input[type=radio]").eq(0);
			if (!$input.length) {
				return false;
			}		
			// make sure regular check box event is not executed (initialised in initCustomInput)
			$input.unbind("updateState");
			// visible checkbox graphic
	        var $label = jQuery('label[for=' + $input.attr('id') + ']').eq(0);
			if (!$label.length) {
				return false;
			}
			var $form = $this.closest("form");
	
			// bind click handler to button
			$this.click(function(e) {
				
				// unbind click event from Hot-or-not buttons so that user can submit only once
				$currentPair.unbind("click");
				// update visible checkbox graphic 
	            $label.addClass('checked checkedHover');
				// identify current form
				
				// submit form with half a second delay, so that use can see the ticked checkbox (rather than submitting the form instantly)
				window.setTimeout(function() {
					 if ($form.length) {
					 	// makeing sure user has not ticked more than one checkbox
					 	jQuery("div.qgtv div.qgtv-hon-button.active input[type=checkbox]").attr("checked", false);
					 	// checking current checkbox
			            $input.attr("checked", true);
			            //submitting form
			            $form.submit();
					 }
				 }, 500);
			});
		})
	});
}

/**
 * Funktion dient dazu, den Countdown unterhalb einer DSM-Umfrage zu animieren
 * @param ms Datum in ms, an dem der Countdown abläuft
 * @param elem Die ID des countdown Elements
 */
de.bild.qgtv.timer = function(ms, elem){
    jQuery(document).ready(function(){
    	
        if (ms == null || ms < 0) {
            ms = 0;
        }
    
        if (elem != null) {
            if (elem.charAt(0) != "#") {
                elem = "#" + elem;
            }
        }
        
        var $countdown = jQuery(elem);
        if ($countdown.length == 0) {
        	return;
        }
        
        //Margin-Left der Spans
        var date1 = new Date();
        // Ablaufdatum erzeugen
        var date2 = new Date(ms);
    
        //Differenz zwischen der aktuellen Zeit und der Countdownzeit
        var diff = date2.getTime() - date1.getTime();
    
        if (diff > 0) {
            //ganzzahlige Stunden, Minuten und Sekunden ausrechnen
            var hours = (diff - (diff % (1000 * 60 * 60))) / (1000 * 60 * 60);
            diff -= hours * (1000 * 60 * 60);
            var minutes = (diff - (diff % (1000 * 60))) / (1000 * 60);
            diff -= minutes * (1000 * 60);
            var seconds = (diff - (diff % (1000))) / (1000);
            diff -= seconds * (1000);
            hours += "";
            minutes += "";
            seconds += "";
        }
        else {
            hours = "00";
            minutes = "00";
            seconds = "00";
        }
    
        //H,M,S zweistellig machen
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
    
    
        /*
         * Stunden
         */
        var $digit1 = $countdown.find("span:nth-child(1)");
        var digit1 = $digit1.attr("class").charAt($digit1.attr("class").length - 1);
        var $digit2 = $countdown.find("span:nth-child(2)");
        var digit2 = $digit2.attr("class").charAt($digit2.attr("class").length - 1);
        
        if (digit1 != hours.charAt(0)) {
        	$digit1.attr("class", "digit-" + hours.charAt(0)); 
        
        }
        if (digit2 != hours.charAt(1)) {
        	$digit2.attr("class", "digit-" + hours.charAt(1)); 
        }
    
		/*
		 * Minuten
		 */       
		var $digit3 = $countdown.find("span:nth-child(4)");
        var digit3 = $digit3.attr("class").charAt($digit3.attr("class").length - 1);
        var $digit4 = $countdown.find("span:nth-child(5)");
        var digit4 = $digit4.attr("class").charAt($digit4.attr("class").length - 1); 
        
        if (digit3 != minutes.charAt(0)) {
        	$digit3.attr("class", "digit-" + minutes.charAt(0)); 
        }
        if (digit4 != minutes.charAt(1)) {
        	$digit4.attr("class", "digit-" + minutes.charAt(1));
        }
    
        /*
         * Sekunden
         */
		var $digit5 = $countdown.find("span:nth-child(7)");
        var digit5 = $digit5.attr("class").charAt($digit5.attr("class").length - 1);
        var $digit6 = $countdown.find("span:nth-child(8)");
        var digit6 = $digit6.attr("class").charAt($digit6.attr("class").length - 1); 
                    
        if (digit5 != seconds.charAt(0)) {
            $digit5.attr("class", "digit-" + seconds.charAt(0));
        }
        if (digit6 != seconds.charAt(1)) {
        	$digit6.attr("class", "digit-" + seconds.charAt(1));
        }
        //Funktion jede Sekunde wieder aufrufen, um eine heruntertickende Uhr zu simulieren
        setTimeout(function(){
            de.bild.qgtv.timer(ms, elem);
        }, 1000);
    });
};

/*--------------------------------------------------------------------
 * jQuery plugin: customInput()
 * by Maggie Wachs and Scott Jehl, http://www.filamentgroup.com
 * Copyright (c) 2009 Filament Group
 * Dual licensed under the MIT (filamentgroup.com/examples/mit-license.txt) and GPL (filamentgroup.com/examples/gpl-license.txt) licenses.
 * Article: http://www.filamentgroup.com/lab/accessible_custom_designed_checkbox_radio_button_inputs_styled_css_jquery/
 * Usage example below (see comment "Run the script...").
 --------------------------------------------------------------------*/
//-----DAS HAUPTOBJEKT----------------------------------------------------------------------
var QGTV = new Object();

/*
 * Init function for Hot-Or-Not voting buttons. 
 * Binds event handler to buttons to update checkbox and trigger form submit.
 */
QGTV.initHonButtons = function() {
	
	// select all clickable buttons
	var $honButtonRows = jQuery("div.qgtv div.qgtv-hon-buttons");
	$honButtonRows.each(function() {
		var $buttonRow = jQuery(this);
		// iterate over all button pairs
		var $currentPair = $buttonRow.find("div.qgtv-hon-button.active");
		$currentPair.each(function() {
			$this = jQuery(this);
			// input form element (hidden under visible checkbox graphic)
			var $input = $this.find("input[type=checkbox],input[type=radio]").eq(0);
			if (!$input.length) {
				return false;
			}		
			// make sure regular check box event is not executed (initialised in initCustomInput)
			$input.unbind("updateState");
			// visible checkbox graphic
	        var $label = jQuery('label[for=' + $input.attr('id') + ']').eq(0);
			if (!$label.length) {
				return false;
			}
			var $form = $this.closest("form");
	
			// bind click handler to button
			$this.click(function(e) {
				
				// unbind click event from Hot-or-not buttons so that user can submit only once
				$currentPair.unbind("click");
				// update visible checkbox graphic 
	            $label.addClass('checked checkedHover');
				// identify current form
				
				// submit form with half a second delay, so that use can see the ticked checkbox (rather than submitting the form instantly)
				window.setTimeout(function() {
					 if ($form.length) {
					 	// makeing sure user has not ticked more than one checkbox
					 	jQuery("div.qgtv div.qgtv-hon-button.active input[type=checkbox]").attr("checked", false);
					 	// checking current checkbox
			            $input.attr("checked", true);
			            //submitting form
			            $form.submit();
					 }
				 }, 500);
			});
		})
	});
}
QGTV.initCustomInput = function(){

    jQuery('.qgtv input').each(function(i){
        if (jQuery(this).is('[type=checkbox],[type=radio]')) {
            var input = jQuery(this);
            
            // make sure checkboxes and radioboxes are not initialized twice
            if (input.parent().hasClass("custom-checkbox") || input.parent().hasClass("custom-radio")) {
            	return true;
            }
        
            // get the associated label using the input's id
            var label = jQuery('label[for=' + input.attr('id') + ']');
        
            //get type, for classname suffix
            var inputType = (input.is('[type=checkbox]')) ? 'checkbox' : 'radio';
        
            // wrap the input + label in a div
            jQuery('<div class="custom-' + inputType + '"></div>').insertBefore(input).append(input, label);
        
            // find all inputs in this set using the shared name attribute
            var allInputs = jQuery('input[name=' + input.attr('name') + ']');
        
            // necessary for browsers that don't support the :hover pseudo class on labels
            label.hover(function(){
                jQuery(this).addClass('hover');
                if (inputType == 'checkbox' && input.is(':checked')) {
                    jQuery(this).addClass('checkedHover');
                }
            }, function(){
                jQuery(this).removeClass('hover checkedHover');
            });
            //bind custom event, trigger it, bind click,focus,blur events
            input.bind('updateState', function(e){
            	
                if (input.is(':checked')) {
                    if (input.is(':radio')) {
                        allInputs.each(function(){
                            jQuery('label[for=' + jQuery(this).attr('id') + ']').removeClass('checked');
                        });
                    };
                    label.addClass('checked checkedHover');
                }
                else {
                    label.removeClass('focus checked checkedHover checkedFocus');
                }
            
            }).trigger('updateState').click(function(){
                jQuery(this).trigger('updateState');
            }).focus(function(){
                label.addClass('focus');
                if (inputType == 'checkbox' && input.is(':checked')) {
                    jQuery(this).addClass('checkedFocus');
                }
            }).blur(function(){
                label.removeClass('focus checkedFocus');
            });
        }
    });
};

/*-------------------------------------------------------------------------------------------
 * QGTV-Frageboxen (QGTV-Aufmacher.html)
 * Erweiterung des oberen JQuery-Scripts
 * Checkbox-Funktionalität auch auf p-Tags
 * Radiobutton-Funktionalität auch auf p-Tags
 -------------------------------------------------------------------------------------------*/
//-----FUNKTIONEN---------------------------------------------------------------------------

//-----FUNKTION:OnClick auf Listenfeld
QGTV.checklistClick = function(){

    //"this" ist das aktuelle <p>-Tag aus dem HTML
    //das zum <p>-Tag gehörende Input-Objekt
    this.inp = this.parentNode.getElementsByTagName('input')[0];
    //wenn Radiobuttons
    if (this.inp.type == "radio") {
        //deaktiviere zuerst alle RadioLabels
        this.radios = this.parentNode.parentNode.getElementsByTagName('label');
    
        for (var i = 0; i < this.radios.length; i++) {
            this.radios[i].className = "";
        }
    
        //diesen Radiobox-Label auf "markiert"
        this.classe = 'checked focus';
    
        //diese Radiobox checked
        this.inp.checked = true;
    
    }
    //wenn Checkbox
    else {
        //wenn diese Checkbox markiert
        if (this.inp.checked) {
            //Checkbox-Label auf "nicht markiert"
            this.classe = 'hover';
        
            //Checkbox unchecked
            this.inp.checked = false;
        }
    
        //wenn Checkbox nicht markiert
        else {
            //Checkbox-Label auf "markiert"
            this.classe = 'checkedHover';
        
            //Checkbox checked
            this.inp.checked = true;
        }
    }
    //Checkbox-Labels-Funktion aendern
    QGTV.checkboxClasse(this);
};

//-----FUNKTION:Mausover auf Listenfeld
QGTV.checklistOver = function(){

    //"this" ist das aktuelle <p>-Tag aus dem HTML
    //das zum <p>-Tag gehörende Input-Objekt
    this.inp = this.parentNode.getElementsByTagName('input')[0];
    //wenn Check/Radiobox markiert
    if (this.inp.checked) {
        //wenn Radiobuttons
        if (this.inp.type == "radio") {
            //Radio-Label auf markiert
            this.classe = "checked focus";
        }
        else {
            //Checkbox-Label auf "markiert und hover"
            this.classe = "checkedHover";
        }
    }
    //wenn Check/Radiobox nicht markiert
    else {
        //Check/Radiobox-Label auf "hover"
        this.classe = "hover";
    }
    //Checkbox-Labels-Funktion aendern
    QGTV.checkboxClasse(this);
};

//-----FUNKTION:Mausout auf Listen feld
QGTV.checklistOut = function(){

    //"this" ist das aktuelle <p>-Tag aus dem HTML
    //das zum <p>-Tag gehörende Input-Objekt
    this.inp = this.parentNode.getElementsByTagName('input')[0];
    //wenn Check/Radiobox markiert
    if (this.inp.checked) {
        //wenn Radiobuttons
        if (this.inp.type == "radio") {
            //Radio-Label auf markiert
            this.classe = "checked focus";
        }
        else {
            //Checkbox-Label auf "markiert"
            this.classe = "checked";
        }
    }
    //wenn Check/Radiobox nicht markiert
    else {
        //Check/Radiobox-Label auf "unbenutzt"
        this.classe = "";
    }
    //Checkbox-Labels-Funktion aendern
    QGTV.checkboxClasse(this);
};

//-----FUNKTION:Checkbox-Label aendern
QGTV.checkboxClasse = function(obj){
    //"obj" ist das aktuelle <p>-Tag aus dem HTML
    //das zum <p>-Tag gehörende Label-Objekt bekommt neuen Klassennamen
    obj.parentNode.getElementsByTagName('label')[0].className = obj.classe;
};

//-----EVENTS:Maus- und Focus-Effekte-------------------------------------------------------

QGTV.initEffects = function(){
    //alle ul-Tags der Seite werden durcsucht
    QGTV.checklist = document.getElementsByTagName('ul');
    for (var i = 0; i < QGTV.checklist.length; i++) {
        //wenn eine QGTV-Fragebox
        if (QGTV.checklist[i].className.match(/qgtv\-list/)) {
    
            //alle einzelnen Listenelement dieser Fragebox
            QGTV.checkLis = QGTV.checklist[i].getElementsByTagName('li');
        
            //wenn eine QGTV-Fragebox mit Checkbox
            if (QGTV.checklist[i].getElementsByTagName('input').length > 0) {
        
                for (var j = 0; j < QGTV.checkLis.length; j++) {
            
                    with (QGTV.checkLis[j].getElementsByTagName('p')[0]) {
                
                        //Onclick-Funktionsaufruf
                        onclick = QGTV.checklistClick;
                    
                        //OnMouseover-Funktionsaufruf
                        onmouseover = QGTV.checklistOver;
                    
                        //OnMouseout-Funktionsaufruf
                        onmouseout = QGTV.checklistOut;
                    
                    }
                }
                //wenn eine QGTV-Fragebox ohne Checkbox
            }
            else {
                //den CSS-Cursor ueberschreiben
                for (var j = 0; j < QGTV.checkLis.length; j++) {
                    with (QGTV.checkLis[j].getElementsByTagName('p')[0]) {
                        style.cursor = "default";
                    }
                }
            }
        }
    }
};

QGTV.initialize = function(){
    QGTV.initCustomInput();
    QGTV.initEffects();
};
//-----ENDE QGTV-Frageboxen

/*qgtv-zoom:26255142.1*/

/*
* Bildvergroesserung auf Lupen in den QGTV-Elementen, inklusive Verschiebung etc.
* unabhängig von anderen Scripten
* nur auf Bilder, NICHT auf Videos
* Grafikpfade (SHADOW und CLOSE, siehe unten ) müssen im CMS mit Verweisen belegt werden
* HTML: reagiert auf class=magnify im HTML
* HTML: im vor diesem Element liegenden A-Tag muss im href der Pfad zum Grossbild eingetragen werden
*/

var de = de || {};
de.bild = de.bild || {};
de.bild.qgtv = de.bild.qgtv || {};
de.bild.qgtv.zoom = de.bild.qgtv.zoom || {};


/*Grafikpfade fuer Bildvergroesserung (aus Konfig-Datei)*/
de.bild.qgtv.zoom.SHADOW="img/bg/shadow-lightbox.png";
de.bild.qgtv.zoom.CLOSEGIF="img/bg/btn-schliessen.gif";



/*Texte fuer Bildvergroesserung*/
de.bild.qgtv.zoom.BV1="Doppelklick zum  Schlie&szlig;en";
de.bild.qgtv.zoom.BV2="Schlie&szlig;en";

/*Fading-Sperre*/
de.bild.qgtv.zoom.block=0;


de.bild.qgtv.zoom.ziz=20000;
de.bild.qgtv.zoom.xo=0;
de.bild.qgtv.zoom.yo=0;
de.bild.qgtv.zoom.aktid=null;

/*------------------------------------------------------------------------------Zoom-Init----------*/
/*fuer jede Bildvergroeßerung wird ein entsprechender Div-Bereich angelegt*/
de.bild.qgtv.zoom.Init = function(e){
	var zielId=this.id.replace(/start/,"ziel");
	if(!document.getElementById(zielId)){
		var zdiv=document.createElement('div');
		zdiv.id=zielId;
		zdiv.className="imgElPopup";
		document.getElementsByTagName('body')[0].appendChild(zdiv);
	}
	var ziel=document.getElementById(zielId);	
	this.tmphref=this.tmphref?this.tmphref:this.href;
	this.href="javascript:void(0);";
	de.bild.qgtv.zoom.ziz++;

	var http=(window.ActiveXObject)?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest();
	if (http.overrideMimeType){http.overrideMimeType('text/html');}
	http.onreadystatechange=function(){
		if(http.readyState=="complete"||http.readyState==4){
			ziel.innerHTML=http.responseText;
			ziel.getElementsByTagName('img')[1].style.height="326px";
			if(ziel.getElementsByTagName('img')[1].offsetWidth>434){
				ziel.getElementsByTagName('img')[1].style.width="434px";
				ziel.getElementsByTagName('img')[1].style.height="";
			}
		}
	}
	http.open("GET",this.tmphref,true);
	http.send(null);

	ziel.onmousedown=de.bild.qgtv.zoom.Zieh;
	document.onmousemove=de.bild.qgtv.zoom.Maus;
	ziel.onmouseup=function(){de.bild.qgtv.zoom.aktid=null};

	with(ziel.style){
		if(window.event){
			top=event.clientY+((window.pageYOffset)?window.pageYOffset:document.documentElement.scrollTop)-event.offsetY-52+"px";
		}else{
			top=e.pageY-e.layerY-52+"px";
		}
		zIndex=de.bild.qgtv.zoom.ziz;
		cursor="move";
		display="block";
		opacity=0;
		filter="Alpha(opacity=0)";
	}

	ziel.opa=0;
	de.bild.qgtv.FadeUp(zielId);
};


/*-----------------------------------------------------------------------------Aufblenden----------*/
de.bild.qgtv.FadeUp=function(was){
	var obj=document.getElementById(was);
	
	if(obj){
	obj.style.background="none";
	de.bild.qgtv.zoom.block=1;
	obj.opa+=20;
	obj.style.opacity=obj.opa/100;
	obj.style.filter="Alpha(opacity="+obj.opa+")";
	obj.style.left="2px";
	if(obj.opa<100){
		if(obj.getElementsByTagName('img')[1]&&obj.getElementsByTagName('img')[1].offsetWidth>434){
			obj.getElementsByTagName('img')[1].style.width="434px";
			obj.getElementsByTagName('img')[1].style.height="";
		}
		setTimeout("de.bild.qgtv.FadeUp('"+was+"')",50)
	}else{
		obj.style.background="transparent url("+de.bild.qgtv.zoom.SHADOW+")";
		obj.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+de.bild.qgtv.zoom.SHADOW+"')";
		obj.opa=100;
		de.bild.qgtv.zoom.block=0;
	}
}};

/*------------------------------------------------------------------------------Abblenden----------*/
de.bild.qgtv.FadeDown=function(was){
	if(de.bild.qgtv.zoom.block==0){
		var obj=document.getElementById(was);
		obj.style.background="none";
		obj.opa-=20;
		obj.style.opacity=obj.opa/100;
		obj.style.filter="Alpha(opacity="+obj.opa+")";
		if(obj.opa>0){
			setTimeout("de.bild.qgtv.FadeDown('"+was+"')",50)
		}else{
			obj.opa=0;
			obj.style.display="none";
		}
	}
};

/*---------------------------------------------------------------------------------Ziehen----------*/
de.bild.qgtv.zoom.Zieh=function(e){
	if(de.bild.qgtv.zoom.aktid==null){
	de.bild.qgtv.zoom.aktid=this;
	this.tx=parseInt(this.style.left);
	this.ty=parseInt(this.style.top);
	de.bild.qgtv.zoom.ziz++;
	this.style.zIndex=de.bild.qgtv.zoom.ziz;
	de.bild.qgtv.zoom.xo=((window.event)?event.clientX+((window.pageXOffset)?window.pageXOffset:document.documentElement.scrollLeft):e.pageX)-this.tx;
	de.bild.qgtv.zoom.yo=((window.event)?event.clientY+((window.pageYOffset)?window.pageYOffset:document.documentElement.scrollTop):e.pageY)-this.ty;
	return false;
}};

/*--------------------------------------------------------------------------Mauserkennung----------*/
de.bild.qgtv.zoom.Maus=function(e){
	var mausX=(window.event)?event.clientX+((window.pageXOffset)?window.pageXOffset:document.documentElement.scrollLeft):e.pageX;
	var mausY=(window.event)?event.clientY+((window.pageYOffset)?window.pageYOffset:document.documentElement.scrollTop):e.pageY;
	if(de.bild.qgtv.zoom.aktid!=null){
		de.bild.qgtv.zoom.aktid.style.left=mausX-de.bild.qgtv.zoom.xo+'px'; 
		de.bild.qgtv.zoom.aktid.style.top=mausY-de.bild.qgtv.zoom.yo+'px';
	}
	return false;
};

/*-----------------------------------------------------------------Schaltflaechen belegen----------*/
de.bild.qgtv.zoom.Events = function(){

    /*alle Span-Tags der Seite*/
    var spans=document.getElementsByTagName('span');

    for(var i=0;i<spans.length;i++){
        /*wenn im Klassennamen "magnify"*/
        if(spans[i].className.match(/magnify/)){
			/*nur wenn Teaser ein Bild ist, kein Video*/
			if(spans[i].parentNode.getElementsByTagName('img')[0]&&spans[i].parentNode.getElementsByTagName('img')[0].className=="photo"){
				/*Initialisiere Zoomobjekte
				de.bild.qgtv.zoom.init(i);*/
				/*Gibt der jeweiligen "Vergroeßern"-Flaeche eine ID*/
				spans[i].parentNode.id="qgtvstartzoom"+i;

				/*onclick auf die Lupe-Icons*/
				spans[i].parentNode.onclick=de.bild.qgtv.zoom.Init;
			}
		}
    }
};

/*---------------------------------------------------------------------Start der Funktion----------*/
de.bild.qgtv.zoom.Events();
/*BTOArtikel:27231458.6*/

