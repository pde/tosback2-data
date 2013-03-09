jQuery(document).ready(function()
{
    // Omniture tracking clicks in specific areas
	window.omnitureTrackingQueryParam =
	{
		scParams :
		{
			headerNav          : "div#ui-page-header a[href^='/'], div#ui-page-header a[href^='http://www.csmonitor']",
			leftColRelated     : ".podStoryRel a[href^='/'], .podStoryRel a[href^='http://www.csmonitor']",
			bottomRelated      : ".bottom-rel a[href^='/'], .bottom-rel a[href^='http://www.csmonitor']",
			itemRelated        : ".related-list a[href^='/'], .related-list a[href^='http://www.csmonitor']",
			mostViewed         : "#most-viewed a",
			promoLink          : ".promotion-tag a",
			galRelated         : "#image-related-content a[href^='/'], #image-related-content a[href^='http://www.csmonitor']",
			galMoreGal         : "div[data-tooltipid='more-galleries'] a",
			storyList          : "[class*='story-list'] a,[class*='storyList'] a,[class*='sListSec'] a",
			leadStory          : ".storyBlock.lead a",
			topStories         : ".topStories a",
			secBlogs           : ".secBlog a",
			moreTopStories     : ".moreTopStories a",
			secPromo           : ".sectionPromo a",
			editorsPicks       : "#rightColumn #inside-monitor a",
			rcPromo            : "#rightColumn .storyBlock a",
			rcPMAD             : "#rightColumn #gg_container a[href^='/'], #rightColumn #gg_container a[href^='http://www.csmonitor']",
			footerNav          : "#fNav a",
			copyright          : "#copyright a",
			spotlight          : "#spotlights a",
			entryLeadStory     : ".entry .leadStory a", 
			entryNineItem      : ".9item a",
			entryInsideMonitor : ".entry #inside-monitor a", 
			entryCommentary    : ".storyList.commentaryBlock a",
			entryBloglist      : ".column .storyBlock.tight.btm a",
			spotlight          : "#spotlights a",
			dropDownNav        : '#sub-cats_Select option'
		},

		run : function()
		{
			var self = this;
			
			var paramValueBase = '';
			if( typeof s != 'undefined' )
			{
				var id = s.prop4;
				
				// simplefy some ids
				var pattern = /.*;.*;(.*)/;
				if( pattern.exec( id ) )
				{
					id = RegExp.$1;
				}
				
				paramValueBase = id + '-' + s.prop5 + '-'; 
			}
			
			var attributeName = 'href';
			jQuery.each( self.scParams, function( key )
			{
				var links = jQuery( '' + this );
			
				// allow to handle links and drop down links
				if( key == 'dropDownNav' )
				{
					attributeName = 'value';
				}
				else
				{
					attributeName = 'href';
				}
				
				// change the links
				jQuery.each( links, function()
				{
					var newUrl = self.updateQueryStringParameter( jQuery( this ).attr( attributeName ),
							                                      'nav',
							                                      paramValueBase + key );
					jQuery( this ).attr( attributeName, newUrl );
				});
			});
			
			// Custom link event for view-extra inserted in-body links
			jQuery(".body-view-extra a").click(function() { 
				s.linkTrackVars='events';
				s.linkTrackEvents='event14';
				s.events='event14';
				s.tl(this,'o','Global Security');
			});
			
		},
		
		//Function to modify uri adding query parameters
		updateQueryStringParameter : function( uri, key, value )
		{
		  if( uri != undefined )
		  {
		    var re = new RegExp("([?|&])" + key + "=.*?(&|$)", "i");
		    separator = uri.indexOf('?') !== -1 ? "&" : "?";
		    if (uri.match(re)) {
		      return uri.replace(re, '$1' + key + "=" + value + '$2');
		    }
		    else {
		      return uri + separator + key + "=" + value;
		    }
		  }
		}
	};

	omnitureTrackingQueryParam.run();

	jQuery("a[href^='http://link.csmonitor.com/join']").click(function(){
		var s = s_gi(s_account);
		s.linkTrackVars='prop4';
		s.linkTrackEvents='';
		s.tl(this, 'o', 'Newsletter Signup');
	});
});
