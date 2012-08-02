/* plugin: jquery.globalSiteSelector.js
 *  
 * Jason Campbell (jason.campbell@mrmworldwide.com)  
*/

$(document).ready( function(){
	if($('div.globalSitesProgressive').length>0)
	$( 'div.globalSitesProgressive' ).globalSiteSelector({'baseURI':jsonContinentBrandingPath});
});