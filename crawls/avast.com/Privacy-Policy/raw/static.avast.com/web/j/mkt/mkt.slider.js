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

    /*Set the default settings of the slider.

       - sliderWidth    : Value: Any number | Set the width of the to fit the the iframe content.
       - xPosition      : Value: left/right | Set the slider to be on the left or right of the page.
       - yPosition      : Value: top/middle/bottom | Set the slider to be at the Top, Middle or Bottom.
       - yDistance      : Value: Any number | Distance from top or bottom in pixels. This value is overwritten if you use 'yPosition' : 'middle'.
       - defaultState   : Value open/closed | Load page with slider in open or closed position. 
       - enabled        : Value: true/false | Slider is loaded or not loaded into the page
       - regionNames    : Value: region locale : Text | avast.locale global vriable is used to determine the langauge of the page. 
    */
    defaultSettings : {
        sliderWidth     : 85,
        xPosition       : 'left',
        yPosition       : 'top',
        yDistance       : 180,
        defaultState    : 'closed',
        enabled         : true,
        regionNames     : {
                            "en-ww" : "Share",
                            "cs-cz" : "Sdílet",
                            "es-es" : "Compartir",
                            "es-ww" : "Compartir",
                            "es-mx" : "Compartir",
                            "es-us" : "Compartir",
                            "es-ar" : "Compartir",
                            "es-cl" : "Compartir",
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
                            "ar-ww" : "شارك",
                            "ja-jp" : "シェア",
                            "ru-ru" : "Поделиться"
                        }
    },

//-----------------------------------------------------------------------------------------------------------------------------------------//

    //@Method: Create the slider using the parameters from "defaultSettings".
    createSlider : function(){
        //The realWidth is the width of the mktSlider without any width set anywhere else (in css or js - so it excludes the presetWidth). 
        //The only thing set in CSS is the border, and because you use blur it doesn't calculate correctly. So this is a fix.
        var presetWidth = mktSlider.defaultSettings.sliderWidth;
        var realWidth = $(mktSlider.el).outerWidth(true);
        var sliderWidth = presetWidth - realWidth;

        $(this.el).css({'display':'block', 'width': sliderWidth})
                                                                .append( $('<div id="mktSliderInner">' ).show()
                                                                                                        .css('width', sliderWidth - 15)
                                                                                                        .append( $('<div class="socialBox">') ) 
                                                                )
                                                                .append( $('<div class="btnSlide">').show()                                         
                                                                                                    .append( $('<div class="whiteCover">') )
                                                                                                    .append( $('<P class="shareText">')
                                                                                                                                    .html(mktSlider.getRegion())
                                                                                                    )
        );
            //Font size fix for AR
            if( avast.locale === "ar-ww" ){
                $(".shareText").addClass('ar');
            }
    },

//-----------------------------------------------------------------------------------------------------------------------------------------//

    //@Method: Get region from avast.locale global variable and change text in slider button
    //@Return: String
    getRegion : function(){
        var region = mktSlider.defaultSettings.regionNames;
        var notDefined = region['en-ww'];
        var locale = typeof avast.locale !== 'undefined' ? avast.locale : 'foo';

        if( typeof region[locale] !== 'undefined' ) {
            notDefined = region[locale];
        }                                                                                        
        return notDefined;
    },

//-----------------------------------------------------------------------------------------------------------------------------------------//

    //@Method: Set slider position TOP, BOTTOM or MIDDLE. setYPosition(str1, int) gets values from property 'defaultSettings'
    //@Param: String1(yPosition value eg. Top), integer yD(yDistance value eg. 180(in pixels))
    //@Return: mixed
    setYPosition : function(y, yD){
        var setY = {};
        setY[y] = yD;

        function setYval(yVal){
            if( yVal != 'middle' ){
                $(mktSlider.el).css(setY);
            }
            else {
                //Calculate and set the middle position
                $(mktSlider.el).addClass('yPosCenter');
                var a = $(mktSlider.el).css('margin-top', -1 * $(mktSlider.el).height()/2);
            }
        }
        setYval(y);
    },

//-----------------------------------------------------------------------------------------------------------------------------------------//

    //@Method: Set slider position LEFT or RIGHT, TOP, BOTTOM or MIDDLE. sliderPosition(str1, str2, int) gets values from property 'defaultSettings'
    //@Param: string x(xPosition value), string y(yPosition value), integer yD(yDistance value)
    //@Return: mixed
    setXPosition : function(x){
    
        var setX = {};
        setX[x] = 0;        

        //Set X position to left
        if( x === 'left' ){
            $(this.el).addClass('xPosLeft');
        }

        //Set X position to right
        if( x === 'right' ){
            $(this.el).addClass('xPosRight');
        }
    },

//-----------------------------------------------------------------------------------------------------------------------------------------//
    //@Method: sliderAppear(). Animates the slider from outside the visible window area into the page, from the sides
    //@Param: 
    //@Return: 
    sliderAppear : function(defaultState, xPosition, sliderWidth){
        var dS = defaultState;
        var xP = xPosition;
        var sW = sliderWidth;
        var btnWidth= $('.btnSlide').outerWidth(true);

        // //create object to use for css and animation object - p.s. because cannot use 'var' inside object literal
        var xPosVal = {};

        /*------------\*
             LEFT
        \*-----------*/
        //Slide in from Left: defaultState === 'closed' and xPosition === 'left'
        if( dS === 'closed' && xP === 'left' ){
            xPosVal[xP] = -1 * sW - btnWidth;

            $(this.el).css(xPosVal);
            //animate from side after 5 seconds
            $(this.el).delay(5000).animate({
                                left: (xPosVal[xP] = -1 * sW)
                                }, 1000);  
        }
        else if( dS === 'open' && xP === 'left' ){
            xPosVal[xP] = -1 * sW - btnWidth;
            $(this.el).css(xPosVal);
            //animate from side after 5 seconds
            $(mktSlider.el).delay(5000).animate({
                        left: (xPosVal[xP] = 0)
                        }, 1000);
        }  

        /*------------\*
             RIGHT
        \*-----------*/   
        if( dS === 'closed' && xP === 'right' ){
            xPosVal[xP] = -1 * sW - btnWidth;

            $(this.el).css(xPosVal);
            //animate from side after 5 seconds
            $(this.el).delay(5000).animate({
                                right: (xPosVal[xP] = -1 * sW)
                                }, 1000);  
        }  
        else if( dS === 'open' && xP === 'right' ){
            xPosVal[xP] = -1 * sW - btnWidth;
            $(this.el).css(xPosVal);
            //animate from side after 5 seconds
            $(mktSlider.el).delay(5000).animate({
                        right: (xPosVal[xP] = 0)
                        }, 1000);
        }   
    },

//-----------------------------------------------------------------------------------------------------------------------------------------//

    clickSlider : function(defaultState, xPosition, sliderWidth){
        var dS = defaultState;
        var xP = xPosition;
        var sW = sliderWidth;
        var btn = $('.btnSlide');

        var xPosVal = {};

        /*------------\*
             CLOSED
        \*-----------*/
        if( dS === 'closed' ){            
            btn.toggle(function(){
                    //mktSlider.openCloseTrack(1);
                    xPosVal[xP] = 0;
                    $(mktSlider.el).animate(xPosVal);
                },
                function(){
                    //mktSlider.openCloseTrack(0);
                    xPosVal[xP] = -1 * sW;
                    $(mktSlider.el).animate(xPosVal); 
                });
        }

        /*------------\*
             OPEN
        \*-----------*/
        if( dS === 'open' ){
            btn.toggle(function(){
                    mktSlider.openCloseTrack(1);
                    xPosVal[xP] = -1 * sW;
                    $(mktSlider.el).animate(xPosVal);
                },
                function(){
                    mktSlider.openCloseTrack(0);
                    xPosVal[xP] = 0;
                    $(mktSlider.el).animate(xPosVal); 
                });
        }

    },

//-----------------------------------------------------------------------------------------------------------------------------------------//

    //Load social icons into the slider
    //@Method: social()
    //@Return: Mixed
     social : function(){
        function loadSocial(){          
            //Resize social box holder for IE7 as google plus icon is not saupported
            if($.browser.msie && parseInt($.browser.version, 10) == 7) {
                $('.socialBox').addClass('ie7');
                //Remove click button from IE7
                $('.btnSlide').delay(500).fadeOut();
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
                
                var addthis_config = {
                    "data_track_clickback": true,
                    "data_track_addressbar":true
                };
                (function(d, t, callback) {
                     var g = d.createElement(t),
                         s = d.getElementsByTagName(t)[0];
                     g.src = '//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5134965b07da2231';
                     s.parentNode.insertBefore(g, s);
             }(document, 'script'));
         }

         //Load social icons after the slider has been clicked and when closed by default
         if(mktSlider.defaultSettings.defaultState === 'closed'){
             $('.btnSlide').one("click", function(){
                setTimeout(function() {
                    loadSocial();
                }, 500);  
             });
         }
         //Load social icons immidately if slider position is open by default
         else if(mktSlider.defaultSettings.defaultState === 'open'){
            if($.browser.msie && parseInt($.browser.version, 10) == 7) {
                $('.btnSlide').hide();
                setTimeout(function() {
                    loadSocial();
                }, 6000);              
            } 
            else{
                loadSocial();
            }                  
         }
     },

//-----------------------------------------------------------------------------------------------------------------------------------------//
    
    /**
    * @Method: Catches zoom event and disables slider if screen size is smaller than 1200px
    */
    detectZoom : function(){
        window.onresize = function() {
            //console.log( $(window).outerWidth() );
            if ( $(window).outerWidth() <= 1200) {
                $("#mktSlider").hide();             
            }  
            else {
                $("#mktSlider").show();
            } 
        }
    },
  
//-----------------------------------------------------------------------------------------------------------------------------------------//

    /**
    * @Method: Will handle load event and setup correct behaviour
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

//-----------------------------------------------------------------------------------------------------------------------------------------//

    //@Method: Initialize All Methods in object 'mktSlider'
    init : function(){
        if(mktSlider.defaultSettings.enabled === true){               
            var conf = mktSlider.defaultSettings;
                mktSlider.createSlider();
                mktSlider.social();
                mktSlider.setYPosition(conf.yPosition, conf.yDistance);
                mktSlider.setXPosition(conf.xPosition);
                mktSlider.sliderAppear(conf.defaultState, conf.xPosition, conf.sliderWidth);
                mktSlider.clickSlider(conf.defaultState, conf.xPosition, conf.sliderWidth);
                mktSlider.detectZoom();
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

//-----------------------------------------------------------------------------------------------------------------------------------------//

//Extend as jQuery Plugin
    $.fn.mktCallSlider = function( options ){
        var conf        = mktSlider.defaultSettings;
        if( typeof options !== 'undefined' ){
            $.extend(true, conf, options);
        }
        if( $(window).outerWidth() >= 1200 && conf.defaultState === 'closed' ) {
             mktSlider.init(); 
        }                 
        else if( $(window).outerWidth() >= 1300 && conf.defaultState === 'open' ) {
            mktSlider.init(); 
        } 
    };