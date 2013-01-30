
/*de.bild.accordion:27524136.2*/



var de = de || {};
de.bild = de.bild || {};


/**
* Provides slide and content loading functionality for accordion module
*/

de.bild.accordion = (function($, SandBox) {

	var moduleList = [],
		settings = {
		    'activeClass': 'active',
		    'ktgAccClassname': 'ktgacc'
		};
	var eventController = null;
	
	function init( $collection ) {
		
        moduleList = SandBox.removeDeletedElements( moduleList );
        eventController = SandBox.getActionEvents('accordion');
				
		$collection.each(function() {
			var module = $(this);			
			if( !SandBox.moduleIsInitialized(module) ) {
			    
			    if( module.hasClass(settings.ktgAccClassname) ) {
                    moduleList.push( new SimpleAccordion(module) );    
			    } else {
			        moduleList.push( new Accordion(module) );
			    }
			    
			}			
		});		
        return true;		
	}
		
	
	
	
	 /**
     * SimpleAccordion Contructor
     * @param $domElem - {jQuery Object} representing the SimpleAccordion
     * */
	function SimpleAccordion( $domElem ){
	    
	    this.$container = $domElem;	    
	    this.$clickables = $domElem.find('h4');	    
	    this.$lastClickedObj = $domElem.find('h4.active');
	    
	    this.setup();
	    	    
	}
	
	
	SimpleAccordion.prototype = {
        
        'setup': function() {
                        
            this.bindUiEvents();
            
            this.handleSpecialCase();
            
            SandBox.setModuleInitialized(this.$container);
            
        },
        
        'bindUiEvents': function() {
                        
            var _this = this;
            
            this.$container.on( eventController.click, 'h4', function(event){
                                             
                event.preventDefault();
                
                var _$this =  $(this);
                
                /* Click on an active Accordion Element */
                if(_$this.hasClass(settings.activeClass)) {
                    
                    _this.$lastClickedObj = _$this;                                    
                    _this.$lastClickedObj.next('section').stop().slideUp('slow');
                    _this.$lastClickedObj.removeClass( settings.activeClass );
                    
                } else {
                                        
                    _this.$lastClickedObj.next('section').stop().slideUp('slow');                
                    _this.$clickables.removeClass( settings.activeClass );                                     
                    
                    _this.$lastClickedObj = _$this;                    
                    _this.$lastClickedObj.next('section').stop().slideDown('slow');
                    _this.$lastClickedObj.addClass( settings.activeClass );
                    
                }
                
            });
            
        },
        
        'handleSpecialCase': function(){
            
            this.$container.find('table').parent('section').css('float','none');
            
        }
        
   }
	
	
	
	
	/**
	 * Accordion Contructor
	 * @param $domElem - {jQuery Object} representing the Accordion
	 * */
	function Accordion ( $domElem ) {
		
		this.$container = $domElem;
		this.$acctoggles = $domElem.find(".acctoggle");
		this.setup();
	}
	
	Accordion.prototype = {
		
		'setup': function() {
		    			
			this.bindUiEvents();
			SandBox.setModuleInitialized(this.$container);
			
		},
		
		'bindUiEvents': function() {
			var _this = this;
			this.$acctoggles.each(function() {
				var $toggle = $(this);
				_this.bindHeaderEvents($toggle);
				$(this).find("h4").on(eventController.mousedown, function(e) {
					
					e.preventDefault();
					
					// if accordion is open then close it
					if ($toggle.hasClass("active")) {
						_this.close($toggle);
					}
					// if accordion is closed then open it and close currently open accordion
					else {
						$curToggle = _this.$container.find(".acctoggle.active");
                        _this.open($toggle);
						_this.close($curToggle);
						$curToggle.find("h4").show();
						$curToggle.removeClass("showAd");						
					}
				});
			});

 /* HOTFIX */
           this.$container.on( eventController.click, 'a', function(event){
                
                if($(this).attr('href') === '#') {
                    event.preventDefault();    
                }
                
            });


		},
		
		'open' : function($acctoggle) {
			var url = $acctoggle.attr("data-ajax-href");
			var $accbody = $acctoggle.find(".accbody");
			var _this = this;
			//Load and replace content
			SandBox.get(url,	
				function(response) {
					$acctoggle.addClass("activearrow active");
					$accbody.replaceWith(response);
					$accbody = $acctoggle.find(".accbody");
					$accbody.hide();
					$accbody.slideDown('slow');
					_this.bindHeaderEvents($acctoggle);
					SandBox.initModules($acctoggle);
				});
		},
		
		'close' : function($acctoggle) {
			$acctoggle.removeClass("activearrow");
			$acctoggle.find(".accbody").slideUp('slow', function() {
				$acctoggle.removeClass("active");
				$(this).empty();
				//$(this).show();
				//$(this).data('moduleInitialized', false);
			});
		},
		
		'bindHeaderEvents' : function($acctoggle) {
			var $accbody = $acctoggle.find(".accbody");
			// hide header when ad is shown
			$accbody.on('mediaGallery.showAd', function(){
				$acctoggle.find("h4").hide();
				$acctoggle.addClass("showAd");
			});
			// show header when ad is hidden
			$accbody.on('mediaGallery.hideAd', function(){
				$acctoggle.find("h4").show();
				$acctoggle.removeClass("showAd");
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
