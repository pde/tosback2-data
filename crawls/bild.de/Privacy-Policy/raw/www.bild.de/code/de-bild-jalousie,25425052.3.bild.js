
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
