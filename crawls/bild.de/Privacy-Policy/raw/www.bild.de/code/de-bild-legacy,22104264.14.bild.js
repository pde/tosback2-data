
/*de.bild.legacy:22104264.14*/

/**
* de.bild.legacy =
* all the functions that need to be deleted after work is completed by the software development team
*/
var de = de || {};
de.bild = de.bild || {};
de.bild.legacy = (function($){      
    
 
 /* LIGHTBOX */
    // everything gets a prefix of old because it's OLD
 var old_vidParams = [],
 old_reInitID = false,
 old_bg = 'white',
 old_opacity = 0.5,
 old_fromTop = null,
 old_windowWidth = $(window).width(),
 old_windowHeight = $(window).height(),
 old_contentWidth = null,
 old_contentHeight = null,
 old_theLightBox = null,
 $body;
 
    function old_ShowLightbox(source, type, params, background, focus){
     //Aufgrund des IE/PBE Bugs, wird hier das Standardevent bei A-Tags unterbunden
     if (window.event) {
         var e = window.event;
         e.returnValue = false;
     }
     old_bg = background;
 
     $.ajax({
         'url': source,
         'data': params,
         'type': type 
        }).done(function(html){
                var $html = $(html),
                hasClipPlayer = $html.find('.clipTVplayer').length;                     
                   
                //Wenn eine KTG in einer LB geladen wird, muss diese initialisiert werden
                //(ID Vergabe, Mauseffekte, mehr Button-Positionierung) 
                //Wenn ein Video verbaut ist, wird dieses fuer das Ipad umgewandelt
                if ($html.find('.shorttextContent').length || hasClipPlayer) {
                    old_reInitID = true;
                }
                
                
                $body.bildLightbox({
                    'contentClass' : 'legacyLightbox',
                    'wrapperId'     : 'legacyLightbox',
                    'wrapperClass' : 'legacyLightbox',     
                    'content': html,
                    'showCloseButton' : false,
                    'callback' : function(){
                            var $lightbox = $('#legacyLightbox div.lightbox');
                            // make the old lb behave
                            $lightbox.addClass('layer').css({
                                'top' : 0,
                                'left' : 0
                            });
                            
                            if ($.browser.msie && $.browser.version.substr(0, 1) < 9 || $.browser.webkit) {
                                $('#legacyLightbox').css({
                                    'z-index' : '7000' 
                                }); 
                                
                            }
                            
                            if (old_bg == null || old_bg == '') {
                                // Falls keine Hintergrundfarbe angegeben ist, wird die transparente Lightbox angezeigt inkl. Rahmen um das Element
                                old_opacity = 0;
                            } 
                            
                            $('#bild-overlay').css({ 
                                 'opacity' : old_opacity,
                                 'background-color' : old_bg,
                                 'z-index':6999
                             });
                           
                            // sometimes the close button is already there in the old lightboxes
                            $lightbox.find('.close').click(function(e){
                                e.preventDefault();
                                if ($body.data('bildLightbox')) {
                                    $body.data('bildLightbox').close();
                                }
                                de.bild.legacy.DeactivateLightbox(focus);
                            });
                            
                            if (old_reInitID && de.bild.sfx) {
                             setTimeout(function(){
                             if (de.bild.sfx) de.bild.sfx.init();
                                if (de.bild.video) de.bild.video.replaceFlash();
                             },500);
                                
                                old_reInitID = false;
                            }
                            // re-register videos
       de.bild.video.initVideoIn( $lightbox );
                        }
                    });
                
                //old_InitiateLightbox(html, focus);
            });
    };
 /**
  * Funktion zum Schließen der LB. Zudem wird der Fokus wieder auf das aufrufende Element gelegt
  * @param {Object} focus Element, von dem der LB-Aufruf ausgeht
  */
 function old_DeactivateLightbox(focus){
     //Link, der die Lightbox aufgerufen hat nach dem Schließen fokussieren
     if (focus) {
         focus.focus();
     }
     if ($body.data('bildLightbox')) {
         $body.data('bildLightbox').close();
     }
     
     return false;
 };
 
 /** ALLGEMEINE AJAX-FUNKTION
  * Funktion, um via Ajax Content nachzuladen
  * @param {String} source Quelle eines Snippets
  * @param {String} type GET/POST
  * @param {String} parameter Parameter, welche der source angehängt werden
  * @param {String} destination Ziel (Selector) in die das geladene Snippet ersetzt wird
  */
 function AjaxReplace(source, type, parameter, destination){
  if (source) {
   var $destination = $(destination);
   //Sonderfall für personalisierte Teaserblöcke
   //Wenn in der source _COOKIE_ gefunden wird, wird dieser Teil durch den Inhalt des Cookies "RegionId" ersetzt,
   //wenn das Cookie nicht gesetzt ist, wird null übergeben.
   if (source.indexOf('_COOKIE_') != -1) {
    if ($.cookie(parameter)) {
     source = source.replace('_COOKIE_', $.cookie(parameter));
    } else {
     source = source.replace(',cteContextId=_COOKIE_', '');
    }
   }
   $.ajax({
    url: source,
    type: type,
    data: parameter
   }).done(function(response){
                $destination.replaceWith(response); 
            }).fail(function(){
    $destination.remove(); 
   });  
  }
 };
function GetForm(form){
     var evaluate = jQuery(form + ' :input');
    var fields = jQuery(evaluate);
    var inputs = new Object();
    fields.each(function(index, value){
        var val = jQuery(this).val();
        var key = jQuery(this).attr('name');
    
        //Prüfung, ob es sich um eine Checkbox handelt
        if (jQuery(value).attr("type") == "checkbox") {
            // wenn diese angeklickt wurde, wird sie dem inputs field hinzugefügt, sonst nicht
            if (jQuery(value).attr("checked")) {
                inputs[key] = val;
            }
        }
        // Es handelt sich um keine Checkbox
        else {
            if (key != '' && jQuery(value).attr("type") != "file") {
                inputs[key] = val;
            }
        }
    });
    var evaluate2 = jQuery(form + ' :radio:checked');
    var fields2 = jQuery(evaluate2);
    fields2.each(function(){
        var val2 = null;
        var key2 = jQuery(this).attr('name');
        var ids = jQuery(this).attr('id');
        var ch = ids.split('-');
        if (ch[1] == 'yes') {
            val2 = 'true';
        }
        if (ch[1] == 'no') {
            val2 = 'false';
        }
        if (ch[1] != 'yes' && ch[1] != 'no') {
            val2 = ids;
        }
        inputs[key2] = val2;
    });
    return inputs;
}
 
 // create these objects that the old code expects
 function init(){ 
  if (window.de.bild.community) {
   window.de.bild.community.ShowLightbox = function(source, type, params, background, focus) {
    de.bild.legacy.ShowLightbox(source, type, params, background, focus);
   }
   
   window.de.bild.community.setRegionId = function(type){
    de.bild.legacy.setRegionId(type);
   };
   
            window.de.bild.community.checkRegionId = function(type){
                de.bild.legacy.checkRegionId(type);
            };
   
            window.de.bild.community.AjaxReplace = function(url, type, param, dest){
                de.bild.legacy.AjaxReplace(url, type, param, dest);
            };
            
            
           window.de.bild.community.GetForm = function(form){
                de.bild.legacy.GetForm(form);
            };
            
  }
  
  
  
  
  
 };    
 // initalise
 init();
 $(function(){
  $body = $('body');
 });
    return {
  'init' : function(){
   init();
  },
  
  'DeactivateLightbox' : function(focus){
   old_DeactivateLightbox(focus);
  },
  'ShowLightbox' : function(source, type, params, background, focus){
   old_ShowLightbox(source, type, params, background, focus);
  },
        'AjaxReplace' : function(url, type, param, dest){
            AjaxReplace(url, type, param, dest);
        },
        'GetForm':function(form){
         GetForm(form);
        }  
  
    };
}(jQuery));
    