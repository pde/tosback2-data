
/*de.bild.newsticker:25425046.7*/

var de = de || {};
de.bild = de.bild || {};
de.bild.newsTicker = (function($, SandBox) {
 var moduleList = [],
  settings = {
   'activeClass' : 'active'
  };
 
 var eventController = null;
 
    /*$.subscribe( 'domNodeRemoved', function(){
        moduleList = SandBox.removeDeletedElements( moduleList );
    });*/ 
 
 function init( $collection ) {
  
        if(!eventController) {
            eventController = SandBox.getActionEvents('newsticker'); 
        }
    
  $collection.each(function() {
   var module = $(this);   
   if( !SandBox.moduleIsInitialized(module) ) {
    moduleList.push( new NewsTicker( module ) );
   }   
  });  
        return true;  
 }
 
 
 
 
 
 /**
  * NewsTicker Contructor
  * @param $domElem - {jQuery Object} representing the newsticker
  * */
 function NewsTicker( $domElem ) {
  
  this.$container = $domElem;
    
  this.$mainStage = this.$container.find('ul');
  this.$teaserBlock = this.$container.find('ol');
  this.$teaserElements = this.$teaserBlock.find('a');
  this.$activeElement = this.$teaserBlock.find( 'a.'+settings.activeClass );
  this.$scrollBar = this.$container.find('.ntscroll');
  this.$nextButton = this.$container.find('.next');
  this.$prevButton = this.$container.find('.prev');
  
  this.$scrollIcon = this.$scrollBar.find('span');  
  
  this.scrollBarHeight = this.$scrollBar.height();
  this.scrollableHeight = this.scrollBarHeight - this.$scrollIcon.height();  
  this.scrollPos = 0;
  this.teasersCount = this.$teaserElements.length;
  this.teasersHeight = this.$teaserBlock.find('li').height();
  this.teasersInnerFullHeight = this.teasersHeight * this.teasersCount;
  
  this.lastMousePos = 0;
  this.mouseDown = false;
  
  this.setup();
  
 }
  
 
 NewsTicker.prototype = {
  
  'setup': function() {
      
   this.bindUiEvents();   
   
   this.$scrollBar.css('visibility', 'visible');
   
   SandBox.setModuleInitialized(this.$container);
   
   this.applyHotfix();
   
  },
  
  /* loadPixels Hotfix */
  'applyHotfix': function(){
      
      $.each( this.$teaserElements, function(){
         
         var $this = $(this);
         
         $this.data('linkTracking', $this.attr('onclick'));
         $this.prop('onclick', null).removeAttr('onclick');
          
      });
      
  },
  
  
  'bindUiEvents': function() {
      
   var _this = this;
   
      
   /* Next and prev buttons */
   this.$container.on( eventController.click, '.next', function(event) { 
    
    event.preventDefault();
    
    var $nextTeaser = _this.$activeElement.closest('li').next();    
    if($nextTeaser.index() < 0) {
     $nextTeaser = _this.$teaserBlock.find('li').first();
    }    
    _this.triggerTeaserElement( $nextTeaser.find('a'), false );
    
   });
   
   this.$container.on( eventController.click, '.prev', function(event) {    
    
    event.preventDefault();
    
    var $prevTeaser = _this.$activeElement.closest('li').prev();    
    if($prevTeaser.index() < 0) {
     $prevTeaser = _this.$teaserBlock.find('li').last();
    }    
    _this.triggerTeaserElement( $prevTeaser.find('a'), false );
    
   });
   
   
   
   
   
   /* Click on an element in the scrollable Teaser list  */
   this.$teaserElements.on( eventController.fastClick, function(event) {
    
    event.preventDefault();
    
    _this.triggerTeaserElement($(this), true);
    
   });
   
   
   /* Scroller Icon Drag events */
   this.$scrollIcon.on( 'click.newsticker', function(event) {
    
    event.preventDefault();
    event.stopPropagation();
    
   });
   
   
   this.$scrollIcon.on('mousedown.newsticker', function(event) {
   
    event.preventDefault();
    _this.lastMousePos = event.pageY;
    _this.mouseDown = true;
    
    _this.scrollPos = _this.$scrollIcon.position().top;
    
   });   
    
   this.$container.on('mousemove.newsticker', function(event) {
                    
    if(!_this.mouseDown) {
     return false;
    }
              
    if(_this.scrollPos >= 0 && _this.scrollPos <= _this.scrollableHeight) {
     _this.scrollPos -= _this.lastMousePos - event.pageY;
     _this.lastMousePos = event.pageY;
    }
    
    
    if(_this.scrollPos < 0) {
     _this.scrollPos = 0;
    } else if(_this.scrollPos > _this.scrollableHeight) {
      _this.scrollPos = _this.scrollableHeight - 1;
    }
    
    _this.$scrollIcon.css('top', _this.scrollPos+'px');
    
    var distance = _this.scrollPos * ( _this.teasersInnerFullHeight - _this.scrollableHeight  ) /  _this.scrollableHeight;
    
    _this.$teaserBlock.scrollTop( distance ); 
    
   });   
   
   
   this.$container.on('mouseleave.newsticker', function(){
       _this.mouseDown = false;
   });
   
   this.$container.on('mouseup.newsticker', function() {
       
    _this.mouseDown = false;    
   }); 
   
   
   /* Click on the scroll bar  */
   this.$scrollBar.on( 'click.newsticker', function(event) {    
    var clickedY = event.pageY - $(this).offset().top;    
    var distance =  clickedY  * ( _this.teasersInnerFullHeight - _this.scrollableHeight  ) /  _this.scrollableHeight;    
    _this.$teaserBlock.scrollTop( distance );
   });
   
   
   /* Scroll event on teaser list */
   this.$teaserBlock.on('scroll.newsticker', function(event) {
    
    if(_this.mouseDown) {
     return false;
    }
    
    var distance = _this.scrollableHeight * _this.$teaserBlock.scrollTop() / ( _this.teasersInnerFullHeight - _this.scrollableHeight  );    
    _this.$scrollIcon.css('top', distance+'px');
   });
   
   
   
  },
  
  /**
   * @param - isTeaserListChildNode {boolean} false, if only prev or next buttons were clicked. 
   * Required for loadPixels Hotfix and should be removed.
   * 
   * */
  'triggerTeaserElement': function( $teaser, isTeaserListChildNode ) {
            if($teaser.hasClass( settings.activeClass )) {
                return false;
            }
            
   this.$activeElement.removeClass( settings.activeClass );
   this.$activeElement = $teaser;
   this.$activeElement.addClass( settings.activeClass );
   
   this.getContentForTeaser( $teaser, isTeaserListChildNode );
   
   $teaser.focus().blur();
   
  },
  
  'getContentForTeaser': function( $teaser, isTeaserListChildNode ) {
   
   var _this = this;
    
   SandBox.get( $teaser.attr('data-ajax-href'), function(resp) {
    
    _this.$mainStage.find('li').replaceWith(resp);
    
    /* loadPixels Hotfix */
    if(isTeaserListChildNode && $teaser.data('linkTracking')) {
        eval($teaser.data('linkTracking'));
    }
    
   
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