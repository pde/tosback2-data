jQuery(document).ready(function()
{
    // Omniture tracking clicks in specific areas
	var scParams =
	{
		headerNav          : "div#ui-page-header a[href^='/'], div#ui-page-header a[href^='http://www.csmonitor']",
		leftColRelated     : ".podStoryRel a[href^='/'], .podStoryRel a[href^='http://www.csmonitor']",
		bottomRelated      : ".bottom-rel a[href^='/'], .bottom-rel a[href^='http://www.csmonitor']",
		mostViewed         : "#most-viewed a",
		entryLeadStory     : "#address-027d50b76d96986082ff07be31193b50-8cb25acc3fe667311d0c480b497e0c14 a", 
		entryNineItem      : "#address-027d50b76d96986082ff07be31193b50-54db8c7c8ab36a70e818c0fc6305ba93 a",
		entryInsideMonitor : ".entry #inside-monitor a", 
		editorsPicks       : "#rightColumn #inside-monitor a",
		promoLink          : ".promotion-tag a",
		footerNav          : "#fNav a",
		copyright          : "#copyright a",
		spotlight          : "#spotlights a"
	};
	
	var paramValueBase = '';
	if( typeof s != 'undefined' )
	{
		paramValueBase = s.prop4 + '-' + s.prop5 + '-'; 
	}
	
	jQuery.each( scParams, function( key )
	{
		var links = jQuery( '' + this );
		
		jQuery.each( links, function()
		{
			var newUrl = updateQueryStringParameter( jQuery( this ).attr( 'href' ), 'nav', paramValueBase + key );
			jQuery( this ).attr( 'href', newUrl );
		});
	});
});

//Function to modify uri adding query parameters
function updateQueryStringParameter(uri, key, value)
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
