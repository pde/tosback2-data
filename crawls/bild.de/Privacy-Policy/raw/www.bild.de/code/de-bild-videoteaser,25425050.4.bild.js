
/*de.bild.videoTeaser:25425050.4*/




var de = de || {};
de.bild = de.bild || {};

de.bild.videoTeaser = (function($, SandBox) {

	var moduleList = [],
		settings = {
			'activeClass' : 'active',
			'specialClasses': ['t5l', 't5l1', 't5p']
		};
	
    $.subscribe( 'domNodeRemoved', function(){
        moduleList = SandBox.removeDeletedElements( moduleList );
    });	
	
	function init( $collection ) {
						
		$collection.each(function() {
			var module = $(this);			
			if( !SandBox.moduleIsInitialized(module) ) {
				moduleList.push( new VideoTeaser( module ) );
			}			
		});		
        return true;		
	}
	
	
	
	/**
	 * VideoTeaser Contructor
	 * @param $domElem - {jQuery Object} representing the VideoTeaser
	 * */
	function VideoTeaser( $domElem ) {
		
		this.$container = $domElem;		
						
		this.$insertBeforeNode = this.$container.find('a[data-ajax-href]').first();		// TODO
		this.$link = this.$insertBeforeNode;
		this.contentToBeHidden = [this.$insertBeforeNode];
		
		this.specialTeaser = false;
		
		this.$loadedContent = null;
		
		this.setup();
		
	}
		
	
	VideoTeaser.prototype = {
		
		'setup': function() {
			
			/* If special Teaser, then hide the image in teaser + playerIcon and leave the headline */
			if(this.isSpecialTeaser( this.$container) ) {
				this.specialTeaser = true;
				this.contentToBeHidden = [ this.contentToBeHidden[0].find('img').first(), this.contentToBeHidden[0].find('.playerIcon') ];
			}
									
			this.bindUiEvents();
									
			SandBox.setModuleInitialized(this.$container);
			
		},
		
		/** Does the Teaser match any Element in the set of special classes */
		'isSpecialTeaser' : function( $elem ) {
			
			for ( var i = 0; i < settings.specialClasses.length; i++ ) {
				  if ( $elem.hasClass(settings.specialClasses[i]) ) {
				    return true;  
				  }
			}

			return false;
		},
		
		
		
		'bindUiEvents': function() {
						
			var _this = this;
						
			this.$link.on(SandBox.getActionEvents('videoteaser').click, function(event) {
				
				event.preventDefault();
				event.stopPropagation();
				
				_this.getContentForTeaser($(this));
								
				return false;
				
			});			
			
		},
						
		
		'removeInitialContent' : function() {
			
			var _this = this;
			
			$.each(_this.contentToBeHidden, function() {
				$(this).remove();
			});
						
		},
				
				
		/** Hide the relevant content and insert the reponse into the container */
		'replaceContent': function( response ) {
						
			this.$loadedContent = $(response);			
			this.$loadedContent.hide();
			this.$loadedContent.insertBefore( this.$insertBeforeNode );
			this.removeInitialContent();
			this.$loadedContent.show();

			SandBox.initModules( this.$loadedContent );		
			
		},
		
		
		'getContentForTeaser': function( $link ) {
		    
		    var _this = this;
						
			SandBox.get( $link.attr('data-ajax-href'), function(response) { _this.replaceContent(response); } );
			
			
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
