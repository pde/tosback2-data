
/*de.bild.galleryCenter:25425034.5*/




var de = de || {};
de.bild = de.bild || {};

de.bild.galleryCenter = (function($, SandBox) {

	var moduleList = [],
		settings = {
			'activeClass' : 'active'
		};
	
	
	var eventController = null;
	
    /*$.subscribe( 'domNodeRemoved', function(){
        moduleList = SandBox.removeDeletedElements( moduleList );
    });*/	
	
	function init( $collection ) {
		        
        eventController = SandBox.getActionEvents('galleryCenter');
				
		$collection.each(function() {
			var module = $(this);			
			if( !SandBox.moduleIsInitialized(module) ) {
				moduleList.push( new GalleryCenter( module ) );
			}			
		});		
        return true;		
	}
	
	
	
	/**
	 * GalleryCenter Contructor
	 * @param $domElem - {jQuery Object} representing the GalleryCenter
	 * */
	function GalleryCenter( $domElem ) {
		
		this.$container = $domElem;
				
		this.$mainStage = this.$container.find('.stage').first();
		
		this.isVideoCenter =  this.$container.hasClass('video');
		
		this.$teaserBlock = this.$container.find('ol');
		this.$teaserElements = this.$teaserBlock.find('li');
		this.$activeElement = this.$teaserBlock.find( 'li.'+settings.activeClass );
		
		this.setup();
		
	}
		
	
	GalleryCenter.prototype = {
		
		'setup': function() {
						
			this.bindUiEvents();
					
			SandBox.setModuleInitialized(this.$container);
			
		},
		
		
		'bindUiEvents': function() {
						
			var _this = this;
						
			this.$teaserElements.on(eventController.fastClick, function(event) {
				
				event.preventDefault();
				
				_this.triggerTeaserElement($(this));
				
			});
			
			
		},
				
		
		'triggerTeaserElement': function( $teaser ) {
						
			this.$activeElement.removeClass( settings.activeClass );
			this.$activeElement = $teaser;
			this.$activeElement.addClass( settings.activeClass );
						
			this.getContentForTeaser( $teaser );
			
			$teaser.focus().blur();
			
		},
		
		
		'replaceContent': function(resp) {
			
			if(this.isVideoCenter) {
				this.$mainStage.find('figure').html(resp);
			} else {
				this.$mainStage.find('figure').replaceWith(resp);
			}			
			
			SandBox.initModules(this.$mainStage);

		},
		
		
		'getContentForTeaser': function( $teaser ) {
			
			var _this = this;
			
			var target = $teaser.find('a');
			
			SandBox.get( target.attr('data-ajax-href'), function(response) { _this.replaceContent(response);} );
			  
			
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
