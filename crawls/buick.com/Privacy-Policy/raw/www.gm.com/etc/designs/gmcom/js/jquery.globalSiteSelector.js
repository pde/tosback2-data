(function($){
	$.fn.extend({
		//pass the options variable to the function
		globalSiteSelector: function(options) {
			//Set the default values, use comma to separate the settings, example:
			var defaults = {
				siteData : 'GlobalSitesPickerData'
			}
			var options =  $.extend(defaults, options);
			return this.each(function() {
				var $this = $( this );
					$this.siteData = eval( options.siteData );
				$this.continents( options );
			});
		},

		continents : function( options ){
			var $this = this;
			for( n in $this.siteData.CONTINENTS ){
				if( n == 0 ){
					$( 'ul#ContinentList.global-sites-menu-block-continent' ).empty();
					$( 'ul#CountryList.global-sites-menu-block-country' ).empty();
					$( 'ul#SiteList' ).empty();
				}
				$( 'ul#ContinentList.global-sites-menu-block-continent' ).append( '<li>' + $this.siteData.CONTINENTS[n][0] + '</li>' );
			};
			if( navigator.platform == 'iPad' ){
				$( 'div#ContinentMask' ).css({ overflow : 'scroll' });
			} else {
				$( 'div#ContinentMask' ).jScrollPane({ verticalDragMinHeight: 27, verticalDragMaxHeight: 27, verticalGutter: 10 });
			}
			$( 'ul#ContinentList.global-sites-menu-block-continent li' ).mouseenter( function(){
				if( !$( this ).hasClass( 'global-sites-menu-item-active' )){
					$( this ).addClass( 'global-sites-menu-item-active' ).mouseleave( function(){
						$( this ).removeClass( 'global-sites-menu-item-active' ).unbind( 'mouseleave' );
					});
					
				}
			}).click( function(){
				$( this ).unbind( 'mouseleave' ).siblings().each( function(){
					$( this ).removeClass( 'global-sites-menu-item-active' );
				});
				$this.country( options, $( this ).text());
			});
		},

		country : function( options, key ){
			var $this = this;
			for( n in $this.siteData[key] ){
				if( n == 0 ){
					$( 'ul#CountryList.global-sites-menu-block-country' ).empty();
					$( 'ul#SiteList' ).empty();
				}
				$( 'ul#CountryList.global-sites-menu-block-country' ).append( '<li>' + $this.siteData[key][n][0] + '</li>' );
			};
			if( navigator.platform == 'iPad' ){
				$( 'div#CountryMask' ).css({ overflow : 'scroll' });
			} else {
				$( 'div#CountryMask' ).jScrollPane({ verticalDragMinHeight: 27, verticalDragMaxHeight: 27, verticalGutter: 10 });
			}
			$( 'ul#CountryList.global-sites-menu-block-country li' ).mouseenter( function(){
				if( !$( this ).hasClass( 'global-sites-menu-item-active' )){
					$( this ).addClass( 'global-sites-menu-item-active' ).mouseleave( function(){
						$( this ).removeClass( 'global-sites-menu-item-active' ).unbind( 'mouseleave' );
					});
					
				}
			}).click( function(){
				$( this ).unbind( 'mouseleave' ).siblings().each( function(){
					$( this ).removeClass( 'global-sites-menu-item-active' );
				});
				$this.site( options, $( this ).text());
			});
		},

		site : function( options, key ){
			var $this = this;
			for( n in $this.siteData[key] ){
				if( n == 0 ) $( 'ul#SiteList' ).empty();
				$( 'ul#SiteList' ).append( '<li><a href="' + $this.siteData[key][n][1] + '" target="_blank" >' + $this.siteData[key][n][0] + '</a></li>' );
			};
			if( navigator.platform == 'iPad' ){
				$( 'div#SiteMask' ).css({ overflow : 'scroll' });
			} else {
				$( 'div#SiteMask' ).jScrollPane({ verticalDragMinHeight: 27, verticalDragMaxHeight: 27, verticalGutter: 10 });
			}
			$( 'ul#SiteList li' ).mouseenter( function(){
				if( !$( this ).hasClass( 'global-sites-menu-item-active' )){
					$( this ).addClass( 'global-sites-menu-item-active' ).mouseleave( function(){
						$( this ).removeClass( 'global-sites-menu-item-active' ).unbind( 'mouseleave' );
					});
					
				}
			});
		}
	});
})(jQuery);