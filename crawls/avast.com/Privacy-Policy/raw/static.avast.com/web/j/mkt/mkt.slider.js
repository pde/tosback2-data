/*
 name: jquery.mkt.slider
 version: 1.1
 author: Richard Barry
 Date: 30 October 2012
 Written for AVAST Software a.s.
 Update: 18 March 2013
 */

var mktSlider = {

    el : "#mktSlider",

    //By default: If no HTML exists within id="#mktSliderContent" it will be created automatically and the social icons will be displayed
    //Set the default settings of the slider.
    defaultSettings : {
        sliderWidth     : 85,       //slider width needed because of loading Iframe content
        xPosition       : 'left',  //left | right
        xPreWidth       : 0,        //Don't change: Default setting used by social slider. It is overwritten when you use content in the slider instead
        yPosition       : 'top',    //top | bottom | center
        yDistance       : 180,      //distance from top or bottom in pixels. (This value is overwritten if you use 'yPosition' : 'center')
        defaultState    : 'closed', //open | closed
        enabled         : true,      //Enable or Disable
        regionNames     : {
                            "en-ww" : "Share",
                            "cs-cz" : "Sdílet",
                            "es-es" : "Compartir",
                            "es-ww" : "Compartir",
                            "es-mx" : "Compartir",
                            "es-us" : "Compartir",
                            "de-de" : "Teilen",
                            "de-ch" : "Teilen",
                            "fr-fr" : "Partager",
                            "fr-be" : "Partager",
                            "fr-ca" : "Partager",
                            "fr-ch" : "Partager",
                            "it-it" : "Condividi",
                            "nl-nl" : "Delen",
                            "nl-be" : "Delen",
                            "pt-br" : "Compartilhar",
                            "pt-pt" : "Partilhar",
                            "pl-pl" : "Udostępnij",
                            "tr-tr" : "Paylaş",
                            "zh-cn" : "分享",
                            "ar-ww" : "حصة",
                            "ja-jp" : "シェア",
														"ru-ru" : "Поделиться"
                        }
    },

    //@method: Create the slider using the parameters from "defaultSettings".
    //  - These settings can be customized in the head section of your document, using the 'defaultSettings' property
    createSlider : function(){
        //The realWidth is the width of the mktSlider without any width set anywhere else (in css or js - so it excludes the presetWidth). 
        //The only thing set in CSS is the border, and because you use blur it doesn't calculate correctly. So this is a fix.
        var presetWidth = mktSlider.defaultSettings.sliderWidth;
        var realWidth = $(mktSlider.el).outerWidth(true);
        var sliderWidth = presetWidth - realWidth;

        $(this.el).css({'display':'block', 'width': sliderWidth})
            .append( $('<div id="mktSliderInner">' ).css('width', sliderWidth - 15).show() )
            .append( $('<div class="btnSlide">').show()                                         
                                              .append( $('<div class="whiteCover">') )
                                              .append( $('<P class="shareText">').html(function(){
                                                                                        var region = mktSlider.defaultSettings.regionNames;
                                                                                        var notDefined = region['en-ww'];
                                                                                        //avast.locale = "jp-ja"
                                                                                        var locale = typeof avast.locale !== 'undefined' ? avast.locale : 'foo';
                                                                                        if( typeof region[locale] !== 'undefined' ) {
                                                                                            notDefined = region[locale];
                                                                                        }                                                                                        
                                                                                        return notDefined;
                                                                                    })
                                               )                                 
            );
            //Font size fix for AR
            if( avast.locale === "ar-ww" ){
                $(".shareText").addClass('ar');
            }
    },

    //@Method: Set slider position LEFT or RIGHT, TOP, BOTTOM or CENTER. sliderPosition(str1, str2, int) gets values from property 'defaultSettings'
    //@Param: string x(xPosition value), string y(yPosition value), integer yD(yDistance value)
    //@return: mixed
    sliderPosition : function(x, y, yD){

        var setX = {};
        setX[x] = 0;

        var setY = {};
        setY[y] = yD;

        function setYval(yVal){
            if( yVal != 'center' ){
                $(mktSlider.el).css(setY);
            }
            else {
                //Set center position
                $(mktSlider.el).addClass('yPosCenter');
                var a = $(mktSlider.el).css('margin-top', -1 * $(mktSlider.el).height()/2);
            }
        }
        setYval(y);

        //Set X position to left
        //NOTE: Functionality should be extended to place slider on right - Previous functionality from v1.0 removed
        if( x === 'left' ){
            $(this.el).addClass('xPosLeft');
        }
    },

    //@method: sliderState(str1, str2, int). Checks the 'sliderState', 'open' or 'closed' and performs the correct behaviour from there when clicked
    //@Param: string defaultState, string xPosition, integer sliderWidth
    //@return: mixed
    sliderState : function(defaultState, xPosition, sliderWidth){
        var dS      = defaultState;
        var sW      = sliderWidth;
        var xP      = xPosition;
        var btn     = $('.btnSlide');
        var btnWidth= $('.btnSlide').outerWidth(true);

        //create object to use for css and animation object - p.s. because cannot use 'var' inside object literal
        var xPosVal = {};

        //slide in OR slide out, depending on 'defaultState'
        if( dS === 'closed' ){
            xPosVal[xP] = -1 * sW - btnWidth;

            $(mktSlider.el).css(xPosVal);
            //animate from side after 5 seconds
            $(mktSlider.el).delay(5000).animate({
                                left: (xPosVal[xP] = -1 * sW)
                                }, 1000);           

            btn.toggle(function(){
                    mktSlider.openCloseTrack(1);
                    xPosVal[xP] = 0;
                    $(mktSlider.el).animate(xPosVal);
                    if($.browser.msie && parseInt($.browser.version, 10) == 7) {
                        $('.btnSlide').delay(500).fadeOut();
                    }
                },
                function(){
                    mktSlider.openCloseTrack(0);
                    xPosVal[xP] = -1 * sW;
                    $(mktSlider.el).animate(xPosVal);
                    if($.browser.msie && parseInt($.browser.version, 10) == 7) {
                        $('.btnSlide').delay(500).fadeOut();
                    }  
                });
        }
        else if( dS === 'open' ){
            xPosVal[xP] = 0;
            $(mktSlider.el).css(xPosVal);

            btn.toggle(function(){
                    mktSlider.openCloseTrack(0);
                    xPosVal[xP] = -1 * sW;
                    $(mktSlider.el).animate(xPosVal);
                },
                function(){
                    mktSlider.openCloseTrack(1);
                    xPosVal[xP] = 0;
                    $(mktSlider.el).animate(xPosVal);
                });
        }
    },

    //Load social icons into the slider
    //@method: social()
    //@return: Mixed
     social : function(){

         $('#mktSliderInner')
             .append(
             $('<div>').addClass('socialBox').addClass('socialPreloader'));

         function loadSocial(){
             $('.socialBox').removeClass('socialPreloader');

             //Resize social box holder for IE7 as google plus icon is not saupported
             if($.browser.msie && parseInt($.browser.version, 10) == 7) {
                $('.socialBox').addClass('ie7');
             } 

             $('.socialBox')
                 .append(
                    $('<div>')
                        .addClass('addthis_toolbox addthis_floating_style addthis_counter_style')
                        //.css({'left':'50px', 'top':'50px'})
                        //FB
                        .append(
                            $('<a>')
                                .addClass('addthis_button_facebook_like')
                                .attr('fb:like:layout','box_count')
                                .attr('fb:like:locale','en_US')
                        )
                        //Twitter
                        .append(
                            $('<a>')
                                .addClass('addthis_button_tweet')
                                .attr('tw:count','vertical')
                        )
                        //G+
                        .append(
                            $('<a>')
                                .addClass('addthis_button_google_plusone')
                                .attr('g:plusone:size','tall')
                        )
                        .append(
                            $('<a>')
                                .addClass('addthis_counter')                               
                        )
                 );
                
                var addthis_config = {"data_track_addressbar":true};
                (function(d, t, callback) {
                     var g = d.createElement(t),
                         s = d.getElementsByTagName(t)[0];
                     g.src = '//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5134965b07da2231';
                     s.parentNode.insertBefore(g, s);
             }(document, 'script'));
         }

         if(mktSlider.defaultSettings.defaultState === 'closed'){
             $('.btnSlide').one("click", function(){
                    loadSocial();                    
             });
         }
         else if(mktSlider.defaultSettings.defaultState === 'open'){
             //$('.socialBox').one("mouseover", function(){
                 loadSocial();
             //});
         }
     },

    /**
    * Method will handle load event and setup correct behaviour
    * @param ev int - action type (0 - close, 1 - open)
    * @param evar int - type desctiption
    */
    openCloseTrack : function( ev, evar ){
        if( typeof(s) !== "undefined" && typeof(ev) !== "undefined" ){

            //event types list
            var evList = {
                0 : 'event13',      //Social Box Closed
                1 : 'event14'       //Social Box Opened
            };

            //list of description for event types
            var evarList = {
                0 : 'New User'      //for new users
            };

            //s.trackExternalLinks=false;  //turn off auto exit link tracking
            s.linkTrackVars = "events,eVar43";                  // Sets tracking variables
            s.linkTrackEvents = s.events = evList[ev];
            if( typeof(evar) !== "undefined" ){
                s.evar43 = evarList[evar];
            }
            s.tl(true,'o','D=pageName');
            s.linkTrackEvents = s.events = null;
        }
    },

    /**
    * Method will handle click event and execute statistics
    * @param thisEl [object] - current tag/tags
    * UPDATE: CONNOT BE USED YET, TRYING TO SOLVE PROBLEM WITH ADDTHIS TIMER!
    */
//     socialBtnTrack : function( thisEl ){
//         if( typeof(s) !== "undefined" && typeof(ev) !== "undefined" && typeof(_gaq) !== "undefined" ){

//             var socialBtn = '';

// console.log( $(thisEl).attr('class') );

//             return;

//             s.linkTrackVars = 'eVar2,eVar4,eVar6,eVar7,eVar10,eVar43,events';
//             s.linkTrackEvents = 'event22';
//             s.events = 'event22';
//             s.eVar43 = socialBtn;
//             s.tl(this,'o','Social Box Sharing');

//             _gaq.push(['_trackEvent','Share', socialBtn, 'URL!!!!!!!!!!!!!!!!REPLACE WITH GLOBAL VARIABLE FOR URL']);
//         }
//     },



    //@method: Initialize All Methods in object 'mktSlider'
    init : function(){
        if(mktSlider.defaultSettings.enabled === true){               
                mktSlider.createSlider();
                mktSlider.social();
                mktSlider.sliderPosition(mktSlider.defaultSettings.xPosition, mktSlider.defaultSettings.yPosition, mktSlider.defaultSettings.yDistance);
                mktSlider.sliderState(mktSlider.defaultSettings.defaultState, mktSlider.defaultSettings.xPosition, mktSlider.defaultSettings.sliderWidth);
        }
    },

    //@Method: Used to overwrite the default options set inside defaultSettings
    setOptions : function( options ){
        var conf = mktSlider.defaultSettings;
        if( typeof options !== 'undefined' ){
            $.extend(true, conf, options);
        }        
    }

};//end mktSlider


//Extend as jQuery Plugin
    $.fn.mktCallSlider = function( options ){
        var conf        = mktSlider.defaultSettings;
        if( typeof options !== 'undefined' ){
            $.extend(true, conf, options);
        }
         if ( $(window).outerWidth() >= 1200) {
             mktSlider.init();             
        }                 
    };