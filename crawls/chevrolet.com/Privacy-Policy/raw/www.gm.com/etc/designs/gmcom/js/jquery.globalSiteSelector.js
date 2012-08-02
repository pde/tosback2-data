/* All GM Sites GLobal Sites region selector
 *  
 * Jason Campbell (jason.campbell@mrmworldwide.com)  
*/
(function($){
	$.fn.extend({

		//  baseURI at bottom of continent_branding.jsp
		
		globalSiteSelector: function(options) {
			var defaults = {
				baseURI:'',
				region:'',
				country:'',
				targetName:'Continent'
			}
			var options =  $.extend(defaults, options);
			
			var $this = $( this );
	//	alert(options.baseURI);

			var regionQuery='?region='+options.region;
			var countryQuery='&country='+options.country;
						
			var query=regionQuery+countryQuery;
			
			$.getJSON(options.baseURI+query,function(json){
				$this.select( json, options.region, options.targetName );
			});

		},
		select : function( json, region, targ ){
			
			// used for markup id and class substitutions
			var targID=targ;
			var targClass=targ.toLowerCase();

			for(var i=0;i<json.length;i++){
				if( i == 0 ){
					if(targClass=='continent')$( 'ul#ContinentList.global-sites-menu-block-continent' ).empty();
					if(targClass=='country')$( 'ul#CountryList.global-sites-menu-block-country' ).empty();
					if(targClass=='country'||targClass=='site')$( 'ul#SiteList' ).empty();
				}
					
					// site section markup differs from region and country
				if(targClass=='site')
					$( 'ul#SiteList' ).append( '<li><a href="' + json[i].url + '" target="_blank" >' + json[i].displayName + '</a></li>' );
				else
					$( 'ul#'+targID+'List.global-sites-menu-block-'+targClass ).append( '<li id="'+json[i].cqNodeName+'">' + json[i].displayName + '</li>' );
				
				targClass=='continent'?regionKey=json[i].cqNodeName:regionKey=region;
				targClass=='country'?countryKey=json[i].cqNodeName:countryKey='';
				$('#'+json[i].cqNodeName).data('keys',{region:regionKey,country:countryKey});	
				
			};
			if( navigator.platform == 'iPad' ){
				$( 'div#'+targID+'Mask' ).css({ overflow : 'scroll' });
			} else {
				$( 'div#'+targID+'Mask' ).jScrollPane({ verticalDragMinHeight: 27, verticalDragMaxHeight: 27, verticalGutter: 10 });
			}
			$( 'ul#'+targID+'List.global-sites-menu-block-'+targClass+' li' ).mouseenter( function(){
				if( !$( this ).hasClass( 'global-sites-menu-item-active' )){
					$( this ).addClass( 'global-sites-menu-item-active' ).mouseleave( function(){
						$( this ).removeClass( 'global-sites-menu-item-active' ).unbind( 'mouseleave' );
					});
					
				}
			}).click( function(e){
				$( this ).unbind( 'mouseleave' ).siblings().each( function(){
					$( this ).removeClass( 'global-sites-menu-item-active' );
				});
				
				try{
					var regionKey=$( this ).data('keys').region;
					var countryKey=$( this ).data('keys').country;
					var nextTarg=$('#choose-a-'+targID).next().attr('id').split('-')[2];
				}
				catch(err){/*kill error on new tab close*/}

				$( 'div.globalSitesProgressive' ).globalSiteSelector({ region:regionKey , country:countryKey , targetName:nextTarg, baseURI:jsonContinentBrandingPath});
			});
		}
		
	});
	
})(jQuery);

