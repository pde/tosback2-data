
/*de.bild.articleGallery:27524122.1*/




var de = de || {};
de.bild = de.bild || {};

de.bild.articleGallery = (function($, SandBox) {

	var moduleList = [];
    var settings = {
			'activeClass' : 'active',
			'animationDuration': 250
		};

	var eventController = null;
    
    $.subscribe( 'domNodeRemoved', function(){
        moduleList = SandBox.removeDeletedElements( moduleList );
    });
    
    function init( $collection ) {
        
        if(!eventController) {
            eventController = SandBox.getActionEvents('articleGallery'); 
        } 
                
        $collection.each(function() {
            
            var module = $(this);
            
            if( !SandBox.moduleIsInitialized(module) ) {
                moduleList.push( new ArticleGallery( module ) );
            }
                        
        });     
        return true;        
    }
	
	
	
	
	/**
	 * articleGallery Contructor
	 * @param $domElem - {jQuery Object} representing the articleGallery
	 * */
	function ArticleGallery( $domElem, options ) {
				
		this.$container = $domElem;
		
		this.$nextButton = $domElem.find('.next');
		this.$prevButton = $domElem.find('.prev');
		this.$stage =  $domElem.find('.slideWrapper');
		this.$listContainer =  this.$stage.find('ul');
		this.$footer = $domElem.find('.slidePag');
				
		this.totalSlideCount = $domElem.attr('data-elem-count');
		
		this.setup();
		
	}
		
	
	ArticleGallery.prototype = {
	    
		
		'setup': function() {
		    
		    var _this = this;	    
									
			this.bindUiEvents();			
			
			$(window).load(function(){
			    _this.$stage.css( 'height', _this.$stage.height() );
			});
												
			SandBox.setModuleInitialized(this.$container);
			
		},
		
		
		
		'bindUiEvents': function() {
		    
		    var _this = this;
            
            this.$nextButton.on( eventController.click, function(event){
                
                event.preventDefault();
                
                _this.getElement( _this.$listContainer.attr('data-next-url') );
                
            });
            
            this.$prevButton.on( eventController.click, function(event){
                
                event.preventDefault();
                
                _this.getElement( _this.$listContainer.attr('data-prev-url') );
                
            });
            
			
		},
		
		'replaceContent': function( newcontent ) {            
                                    
            var _this = this;
            
            this.$listContainer.fadeOut( settings.animationDuration, function(){
                        
                _this.$stage.html( newcontent );
                
                 _this.$listContainer = _this.$stage.find('ul');
                 _this.$listContainer.fadeIn( settings.animationDuration );
                 
                 _this.$footer.html( _this.$listContainer.attr('data-elem-index') + ' von ' + _this.totalSlideCount );
                
            });
           
            
        },
		
		
	   'getElement': function( url ) {            
                                    
            var _this = this;
            
             $.ajax({
                 url: url,
                 dataType: 'html'
             })
            .done(function(response) {
                _this.replaceContent(response);
            })    
            .fail(function(){
                console.error('ArticleGallery: AJAX Request failed.');
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
