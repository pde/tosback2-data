
/*de.bild.accordeon:22758744.1*/

var de = de || {};
de.bild = de.bild || {};
de.bild.accordeon = (function($){
 
     
    var settings = {
        'activeClass': 'active'
    },
    accordeons = [];
    function destroy(){
        for (var i=0,j=accordeons.length;i<j;i++) {
            accordeons[i].destroy();
        }  
        return accordeons;
    };
        
    function init($collection) {     
        if ($collection.length) {
            $collection.each(function() {  
                accordeons.push(new Accordeon(this));      
            });   
        }  
        return true;
    };
 
 function getAccordeon(_className){
  var collection = [];
        for (var i=0,j=accordeons.length;i<j;i++) {
            if (accordeons[i].$accordeon.hasClass(_className)) {
    collection.push(accordeons[i]);
   }
        }  
        return collection;
 };
    
 function Accordeon(elem){
  
  this.$accordeon = $(elem);
  this.setup();
 };
 
 Accordeon.prototype = {
  'setup' : function(){
         var _this = this;
         if (this.$accordeon.hasClass('acctoggle')) {
    this.$accordeon.click(function(e) {
     e.preventDefault();
     var $this = $(this);
     //alle schliessen
     $this.parents('.shorttxtacc, .mediaacc').find('.stcontents, .photoGallery, .videoPlayer').slideUp('slow');
     $this.parents('.shorttxtacc, .mediaacc').find('.acctoggle').removeClass('active');
     //wenn naechster zu, dann oeffnen
     if($this.next().is(':hidden') === true) {
      //active f. button wg. pfeil
      $this.addClass('active');
      //oeffnen
      $this.next().slideDown('slow');
     }
    });
  
         } else {
          this.$hentries = this.$accordeon.find('div.hentry');
          if (this.$hentries.length == 0) {
     return false;
    }
          this.$hentries.mouseover(function(){
     var $this = $(this);
     if (!$this.hasClass('listing')) {
                  _this.$hentries.removeClass(settings.activeClass);
                  $(this).addClass(settings.activeClass);  
     }
          });
 
         }
   return this;
  },
  'destroy' : function(){
   if (this.$hentries !== 'undefined' && this.$hentries !== null) this.$hentries.unbind('mouseover');
   this.$accordeon.unbind('click');
   accordeons = [];
   return this;
  } 
 };
    // oeffentliches Interface
    return {
       'init' : function($collection){
           if (!$collection) return false;
           return init($collection);
       },
       // kills all gallery events
       'destroy' : function(){
           return destroy();
       },
       //returns all accordeons
       'accordeons' : function(){
           return accordeons;
       },
    // get collection of accordeons by className
    get : function(_className){
        if (_className) {
        return getAccordeon(_className);
     }
    }
    };
})(jQuery);
 