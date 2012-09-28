/**
 * ratingWrapper.js
 * 
 * A wrapper arround jQuery raty (rating with star)
 * 
 * @since: 06/01/2012
 *
 * @Authors : Hugo Valcourt & Aurelien Degrenand
 * 
 * @requiredLibrairies:
 *          
 *          jQuery 1.4:        http://jquery.com/
 *          Raty 2.4.0:        http://www.wbotelhos.com/raty/
 *          jquery.cookie :    https://github.com/carhartl/jquery-cookie
 *
 * @tested with jQuery Raty 2.4.0
 *
 * For more informations, read README.ratingWrapper.txt
 *
 */

/** Récupère le path **/
var defaultDomainLpcdn          =  'http://static-dev.lpcdn.lapresse.ca/lpweb'; // set default
if(typeof(STATIC_LPCDN_BASE_URL) != '') {
  defaultDomainLpcdn          =  STATIC_LPCDN_BASE_URL; // take the env variable 
}

var defaultPathImg         = '/lib/jquery-raty/img/';
var defaultPath            =  defaultDomainLpcdn + defaultPathImg; 


var ratingWrapper = {
    
    defaultOptions : {
        cancel             : false,                                                           
        cancelHint         : 'Annuler ce vote',                                              
        cancelOff          : 'cancel-off.png',                                               
        cancelOn           : 'cancel-on.png',                                                
        cancelPlace        : 'left',                                                         
        click              : undefined,                                                      
        half               : true,                                                           
        halfShow           : true,                                                          
        hintList           : ['Cote : À éviter', 'Cote : Passable', 'Cote : bon', 'Cote : Très bon', 'Cote : exceptionnel'],
        iconRange          : undefined,                                                      
        mouseover          : undefined,                                                      
        noRatedMsg         : 'Ce film n\'a pas encore été évalué!',                          
        number             : 5,                                                              
        path               : 'img',                                                          
        precision          : false,                                                          
        readOnly           : false,                                                          
        round              : { down: .25, full: .6, up: .76 },  
        scoreName          : 'score',   
        single             : false,    
        size               : 20,  
        space              : true, 
        starHalf           : 'star-half.png',   
        starOff            : 'star-off.png',     
        starOn             : 'star-on.png',   
        start              : 0,                 
        target             : undefined,     
        targetFormat       : '{score}',  
        targetKeep         : false,       
        targetText         : '',             
        targetType         : 'hint',         
        width              : undefined  
    },

    defaultWrapperConfiguration : {    
        cookieName         : 'errorNoCookieName',              
        idWcm              : 0,                  
        idRating           : 0,
        voteCount          : 0
    },
    
    // RATING STATIC
    
    starNoRatingSmallGrisLaPresse : {
          path             : defaultPath+'etoiles-rouge-fond-blanc/',
          readOnly         : true
    },
    
    starNoRatingSmallLaPresse : {
          path             : defaultPath+'etoiles-rouge-fond-gris/',
          readOnly         : true
    },
    
    starNoRatingXSmallLaPresse : {
          path             : defaultPath+'etoiles-rouge-fond-gris/',
          readOnly         : true,
          size             : 20,
          starHalf         : 'star-half-small.png',
          starOff          : 'star-off-small.png',
          starOn           : 'star-on-small.png'
    },
    
    starNoRatingSmallPublic : {
          path             : defaultPath+'etoiles-violet-fond-gris/',
          readOnly         : true
    },
    
    starNoRatingSmallGrisPublic : {
          path             : defaultPath+'etoiles-violet-fond-blanc/',
          readOnly         : true
    },
    
    // IMPORTANT : INFOGRAPHIE ETOILE A FAIRE
    starNoRatingBigLaPresse : {
          path             : defaultPath+'etoiles-rouge-fond-gris/',
          readOnly         : true,
          size             : 30,
          starHalf         : 'star-half-big.png',
          starOff          : 'star-off-big.png',
          starOn           : 'star-on-big.png'
    },
    
    // IMPORTANT : INFOGRAPHIE ETOILE A FAIRE
    starNoRatingBigPublic : {
        path             : defaultPath+'etoiles-blanc-fond-violet/',
        readOnly         : true,
        size             : 30,
        starHalf         : 'star-half-big.png',
        starOff          : 'star-off-big.png',
        starOn           : 'star-on-big.png'
    },
    
    // RATING WITH VOTE / COOKIE
    
    // IMPORTANT : INFOGRAPHIE ETOILE A FAIRE
    starRatingSmallLaPresse : {
          path             : defaultPath+'etoiles-blanc-fond-violet/'
    },
    
    // IMPORTANT : INFOGRAPHIE ETOILE A FAIRE (petite étoiles)
    starRatingSmallPublic : {
          path             : defaultPath+'etoiles-violet-fond-blanc/'
    },
    
    // IMPORTANT : INFOGRAPHIE ETOILE A FAIRE
    starRatingBigLaPresse : {
          path             : defaultPath+'etoiles-blanc-fond-violet/',
          size             : 30,
          starHalf         : 'star-half-big.png',
          starOff          : 'star-off-big.png',
          starOn           : 'star-on-big.png'
    },
    
    starRatingBigPublic : {
          path             : defaultPath+'etoiles-blanc-fond-violet/',
          size             : 30,
          starHalf         : 'star-half-big.png',
          starOff          : 'star-off-big.png',
          starOn           : 'star-on-big.png'
          
    },
    
    
    
    /**
     * init : Initializes the rating
     * @param   int     ratingId   element id to init rating
     * 
     * @return  void
     */
     
     // to do gerer la class
    init : function (ratingSelector) {
        var self      = this;
        var pattId    = /^#/gi;
        var pattClass = /^\./gi;
        //si c'est un id
        if (ratingSelector.match(pattId) != null) {
            self.jRating = $j(ratingSelector);
            self._setOptions();
        }
        //si c'est une classe
        if (ratingSelector.match(pattClass) != null) {
            $j.each($j(ratingSelector), function(i, e){
                self.jRating = $j(e);
                self._setOptions();
            });
        };
        return false;
    },
    
    
    /**
     * _setOptions : Merge user options define into html attribut (ex: option="disabled : true, ...") with default option
     * and call initObject function
     * 
     * @return  void
     */
    _setOptions : function() {
        var self              = this;
        var defaultCookieName = self.defaultWrapperConfiguration.cookieName + self.defaultWrapperConfiguration.idWcm;
		var defaultPath = self.defaultWrapperConfiguration.defaultpathDomain + self.defaultWrapperConfiguration.defaultPathimg;
        var callBack          = '';
        self.options          = {};
        var userOptions           = self.jRating.attr('options');
        
        var cookieFullName = defaultCookieName;
        if( undefined == userOptions){
            userOptions = '';
        }else {
            self.userOptions      = eval('(' + userOptions + ')');
            cookieFullName = defaultCookieName;
            if ( undefined != self.userOptions.cookieName){
                cookieFullName  = self.userOptions.cookieName + self.userOptions.idWcm;
            }
            if (self.userOptions.callBack != undefined) {
                callBack = self.userOptions.callBack;
            };
        }
        
        $j.extend(self.options, self.defaultOptions, self.defaultWrapperConfiguration);    
    
        //Merge user options with default configuration
        if (self.jRating.hasClass('starNoRatingSmallLaPresse')) {
            $j.extend(self.options, self.starNoRatingSmallLaPresse);    
        }
        else if (self.jRating.hasClass('starNoRatingSmallGrisLaPresse')) {
            $j.extend(self.options, self.starNoRatingSmallGrisLaPresse);    
        }
        else if (self.jRating.hasClass('starNoRatingXSmallLaPresse')) {
            $j.extend(self.options, self.starNoRatingXSmallLaPresse);    
        }
        else if (self.jRating.hasClass('starNoRatingSmallPublic')) {
            $j.extend(self.options, self.starNoRatingSmallPublic);    
        }
        else if (self.jRating.hasClass('starNoRatingSmallGrisPublic')) {
            $j.extend(self.options, self.starNoRatingSmallGrisPublic);    
        }
        else if (self.jRating.hasClass('starNoRatingBigLaPresse')) {
                $j.extend(self.options, self.starNoRatingBigLaPresse);
        }
        else if (self.jRating.hasClass('starNoRatingBigPublic')) {
            $j.extend(self.options, self.starNoRatingBigPublic);        
        }
        else if (self.jRating.hasClass('starRatingSmallLaPresse')) {
            $j.extend(self.options, self.starRatingSmallLaPresse);    
        }
        else if (self.jRating.hasClass('starRatingSmallPublic')) {
                $j.extend(self.options, self.starRatingSmallPublic);
        }
        else if (self.jRating.hasClass('starRatingBigLaPresse')) {
            $j.extend(self.options, self.starRatingBigLaPresse);        
        }
        else if (self.jRating.hasClass('starRatingBigPublic')) {
            $j.extend(self.options, self.starRatingBigPublic);        
        }
        $j.extend(self.options, self.userOptions);   
        var cookieConfig = self._setHandler(self.jRating, cookieFullName, self.options.idRating, self.options.voteCount, callBack);

        $j.extend(self.options, cookieConfig);    
                
        self._initObject();
        
    },

    /**
     * _initObject : Initialize object with custom config 
     * 
     * @return  void
     */
    _initObject : function() {
        var self = this;
        self.jRating.raty(self.options);
        self._setWrapperOptions();
    },
    
    /**
     * _setWrapperOptions : set our custom rating options
     * 
     * @return  void
     */
    _setWrapperOptions : function (){
        var self = this;
        
        if(self.options.lockedInput){
            self.jTargetField.attr('readonly', 'readonly');
        };
    },
    
     /**
     * setHandler - The param are used for the closure for the handler
     * 
     * @return  object cookieConfig
     */
    _setHandler : function (jRating, cookieFullName, idRating, voteCount, callBack) {
        var self = this;
        var cookieConfig = {};
        if ( self.options.readOnly == true) {
            return;
        }
        
        // We possibly have an action to take
        if ( undefined != callBack ) {
            cookieConfig.click = function(score, evt) { 
                window[callBack](jRating, cookieFullName, idRating, voteCount, score); 
                };
        }
        return cookieConfig;
    },
    /**
     * Static-like method to post a score
     * @param score Score to send
     * @param idRating int Id of the UserRating to apply the score to
     */
    postScore : function ( score, idRating ){
        $j.post('/rate/ratethis.php?s=4&c=3453&o=MovieEntity&r='+score+'&oi='+idRating);
    },
    /**
     * Static-like method to set a read-only flag on a rating
     * @param object rating to set read-only
     * @param flag boolean true or false
     */
    setReadOnly : function ( object, flag ) {
        if ( undefined != object.raty ) {
            object.raty('readOnly', flag);
        }
    },
    
    /**
     * Static-like method to trigger a click (used in contribution)
     * @param object rating to send the click
     * @param score
     */
    sendClick : function ( object, score ) {
        if ( undefined != object.raty ) {
            object.raty('click', score);
        }
    },
    
    
    setCookie : function ( cookieFullName, score, voteCount){
        if ( undefined != cookieFullName ) {
            var cookieObj = {
                    score: score,
                    voteCount: voteCount
                };
            $j.cookie(cookieFullName, JSON.stringify(cookieObj), {
                expires: 1
            });
        }
        
    }
};
    