
/* ***********************************************
AUTHOR: Jeremy Bueler (http://jbueler.com)
EMAIL: jbueler@gmail.com
COMPANY: Adidas, Roundhouse Agency
DATE: 3/22/2012

DESCRIPTION: JQUERY PLUGIN - Takes a collection of elements and will find a specific customizable child element and make the parent element clickable to the child elements href attribute.

EXAMPLE:
	
	HTML:
		<p><a class="findme" href="http://google.com">GO TO GOOGLE</a> Some Other <span>Copy</span></p>
		<p><a href="http://google.com">GO TO GOOGLE</a> Some Other <span>Copy</span></p>
		<p class="override"><a class="findme" href="http://google.com">GO TO GOOGLE</a> Some Other <span>Copy</span></p>
		<p id="noclick"><a class="findme" href="http://google.com">GO TO GOOGLE</a> Some Other <span>Copy</span></p>

	OPTIONS:
		child_selector : A jQuery selector to find the children element inside the current hero container defaults to "a.primary"
		onClick : An optional function that will replace the default functionality of the click event. Default is false.

	JS: 
	$('p').clickableHero({
		child_selector : 'a.findme'
	});
	
	Result:
	the first, third and fourth <p> would be clickable and have the clickable class added to it. The <p> would then be clickable and would go to the url of the a.findme element.


	Additional Methods:
		removeClick: removes the click event from the parent element for only the passed into the removeClick method 
			Example: 
				$('p#noclick').clickableHero('removeClick');
			
			Result:
			The first and third <p> would remain clickable and the fourth <p> would have the click event removed. 
			
		overrideClick: will replace the click event with another function if it is passed in
			Example:
				$('p.override').clickableHero('overrideClick',function(){
					alert('clicked');
				})
			
			Result:
			When the <p class="override"> is clicked it will run the function that is passed in, instead of the previously assigned click functionality

********************************************************************************************** */

(function( $ ) {
	var methods = {
	     init : function( options ) {			 
	       return this.each(function(index,element){
			   
	   		 	var settings = $.extend( {
	   		 		'child_selector': 'a.primary',
						'onClick': false
	   		 	}, options);
				
				var $this = $(this);				
				$this.addClass('clickable');
				var link = $this.find(settings.child_selector);								
				$this.bind('click.clickableHero',function(event){
					// tagPageElement('HERO:CLICK',link.attr('manual_cm_sp'));
					
					if (settings.onClick) {
						settings.onClick(event);						
					}else{
						window.location.href = link.attr('href');						
						cmCreateManualLinkClickTag(link.attr('href')+'?cm_sp='+link.attr('manual_cm_sp')+'Click',link.attr('manual_cm_sp'));
					}					
					
				},true);
			});
		},
		removeClick : function() {
			return this.each(function(index,element){
					var $this = $(this);
					$this.removeClass('clickable');
					$this.unbind('click.clickableHero');					
			});
		},
		overrideClick: function(method){			
			return this.each(function(index,element){
					var $this = $(this);
					$this.unbind('click.clickableHero');					
					$this.bind('click.clickableHero',method);
			});
		}
	}
		
	$.fn.clickableHero = function( method ) {    
		if ( methods[method] ) {
		  return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
						
		  return methods.init.apply( this, arguments );
		} else {
		  $.error( 'Method ' +  method + ' does not exist' );
		}
	};
	
})( jQuery );
