// JavaScript Document
// Last Update  [kd] 03/14/2013  to prod.  Eric Patton Update for bargaining//

// This file resides at www.att.com/Common/global/scripts/about_us/corp_section.js //

//alert(document.documentMode + ' | ' + document.compatMode);

jQuery(document).ready(function() {

	 /* bargaining blog = bargaining.att.com/corewireline */
if (document.domain == 'bargaining.att.com' ) {
		if (window.location.href.indexOf("corewireline") != -1) {
			//alert('test');
			jQuery('<div style="top:-77px; *top:-88px; position:relative; margin-bottom:-55px; font: 15px/36px Verdana,Geneva,sans-serif; background:#fff; height:50px;"><h3><a href="http://bargaining.att.com/corewireline"><img src="/design/wireline/image/att.png" alt="At&T Logo" height="46px" width="46px" /><span class="headingTitleBA" >AT&amp;T 2012-2013 Wireline Bargaining</span></a></h3></div><div><p><a onclick="_gaq.push([\'_trackEvent\', \'PDF\', \'Download\', \'Highlights West\']);" target="_blank" title="Tentative Agreement Highlights West" href="http://www.att.com/Common/about_us/files/pdf/bargain/highlights_west.pdf"><img src="http://www.att.com/Common/about_us/images/core_bargaining/westtah.jpg" alt="Download West Tentative Agreement Highlights"></a></p></div>').insertAfter('#logoHeaderBA');
		}
		else if (window.location.href.indexOf("mobilitybenefits") != -1){
			jQuery('<div style="border:1px solid #eaeaea;background:#f5f5f5;margin:0 20px 40px 20px;padding:15px 30px 15px 15px;"><p style="font-size:14px;color:#000;">On September 13, AT&amp;T announced that AT&amp;T Mobility reached a tentative agreement with the Communications Workers of America in benefits negotiations covering all CWA bargained-for Mobility employees nationwide &ndash; more than 40,000 employees.</p><p style="font-size:14px;color:#000;">The tentative agreement is focused on benefits, including health care. Wages, pension and work rules for bargained-for Mobility employees are negotiated under separate contracts.</p><p style="font-size:14px;color:#000;">This website is designed to provide additional information to employees about the tentative agreement.</p></div>').insertAfter('#logoHeaderBA');
		}
		else if (window.location.href.indexOf("mobilityorange") != -1){
			jQuery('<div style="border:1px solid #eaeaea;margin:40px 0 40px 20px"><a onclick="_gaq.push([\'_trackEvent\', \'PDF\', \'Download\', \'Highlights Orange\']);" target="_blank" href="http://www.att.com/Common/about_us/files/pdf/bargain/highlights_orange.pdf" title="Click here to view the Highlights Document"><img src="http://www.att.com/Common/about_us/images/core_bargaining/orangeha.jpg" title="Read the Tentative Agreement Highlights" alt="Read the Tentative Agreement Highlights" /></a></div>').insertAfter('#logoHeaderBA');
		}
		else {
		//no message;
		}
}
else if (document.domain == 'preview.att.net' ) {
		if (window.location.href.indexOf("corewireline") != -1) {
			jQuery('<div style="top:-77px; position:relative; margin-bottom:-55px; font: 15px/36px Verdana,Geneva,sans-serif; background:#fff; height:50px;"><h3><a href="http://bargaining.att.com/corewireline"><img src="/design/wireline/image/att.png" alt="At&T Logo" height="46px" width="46px" /><span class="headingTitleBA" >AT&amp;T 2012-2013 Wireline Bargaining</span></a></h3></div><div><p><a onclick="_gaq.push([\'_trackEvent\', \'PDF\', \'Download\', \'Highlights West\']);" target="_blank" title="Tentative Agreement Highlights West" href="http://www.att.com/Common/about_us/files/pdf/bargain/highlights_west.pdf"><img src="http://www.att.com/Common/about_us/images/core_bargaining/westtah.jpg" alt="Download West Tentative Agreement Highlights"></a></p></div>').insertAfter('#logoHeaderBA');
		}
		else if (window.location.href.indexOf("mobilitybenefits") != -1){
			jQuery('<div style="border:1px solid #eaeaea;background:#f5f5f5;margin:0 20px 40px 20px;padding:15px 30px 15px 15px;"><p style="font-size:14px;color:#000;">On September 13, AT&amp;T announced that AT&amp;T Mobility reached a tentative agreement with the Communications Workers of America in benefits negotiations covering all CWA bargained-for Mobility employees nationwide &ndash; more than 40,000 employees.</p><p style="font-size:14px;color:#000;">The tentative agreement is focused on benefits, including health care. Wages, pension and work rules for bargained-for Mobility employees are negotiated under separate contracts.</p><p style="font-size:14px;color:#000;">This website is designed to provide additional information to employees about the tentative agreement.</p></div>').insertAfter('#logoHeaderBA');
		}
		else if (window.location.href.indexOf("mobilityorange") != -1){
			jQuery('<div style="border:1px solid #eaeaea;margin:40px 0 40px 20px"><a onclick="_gaq.push([\'_trackEvent\', \'PDF\', \'Download\', \'Highlights Orange\']);" target="_blank" href="http://www.att.com/Common/about_us/files/pdf/bargain/highlights_orange.pdf" title="Click here to view the Highlights Document"><img src="http://www.att.com/Common/about_us/images/core_bargaining/orangeha.jpg" title="Read the Tentative Agreement Highlights" alt="Read the Tentative Agreement Highlights" /></a></div>').insertAfter('#logoHeaderBA');
		}
		else {
		//no message;
		}
}


	if (pid == '5000') { /* SOCIAL MEDIA */
		jQuery('#PrimaryNav li a#pn-compinfo').parent('li').addClass('selected');	
		jQuery('#PrimaryNav li a#au_media_resources_link').parent('li').addClass('selected');	
	}


/*if ( pid == '2631' || pid == '22591' || pid == '22592' || pid == '22593' || pid == '11547' || pid == '22594' || pid == '22595' ) { // ASPIRE 
		jQuery('#PrimaryNav #about_us_secondary_nav li').removeClass('selected');
		jQuery('#PrimaryNav li a#au_aspire_link').parent('li').addClass('selected');	
	}*/
	
	
	if ( jQuery('#main-menu-cs div.menuContent').length != '0' ) {
	//	jQuery("div.menuContent").hide(); 
	}
		
	/* =SITE MAP */
	
	if (pid == "17564" ) {
		var script = document.createElement('script');
		script.src = '/Common/global/scripts/about_us/sitemap.js';
		script.type = 'text/javascript';
		jQuery('head')[0].appendChild(script);
	}
			
	/* OLD News Releases */
	if ( pid == "4800" ) {
		jQuery('#content-container').addClass('archive-newsrelease');
	
		/* add Search link */
		var checkSearchresults = location.href;
		checkSearchresults = checkSearchresults.indexOf('searchresults')
		//alert(checkSearchresults);
		if ( checkSearchresults == '-1' ) {
			/* do nothing */
		} else {
			jQuery('p.OrangeHeader:contains("Archived News Releases")').after('<p><a href="/gen/press-room?pid=9880" title="Search news release archives">Search news release archives</a></p>');
			document.title="Corporate News and Press Release Archive | AT&T";
				jQuery("meta[name=description]").attr("content","Read AT&T news including corporate news, network advancements and wireless news. Visit the AT&T newsroom for the latest technology news.");
			jQuery("meta[name=keywords]").attr("content","at&t news, att news, att network news, at&t wirelss news, at&t newsroom, At&t in the news");
		}
	
	}
	
	/* Regulatory Doc */
	if (pid == '320') {
		jQuery(document).ready(function() {
			jQuery('ul.section-links').hide();
			
			 jQuery('h6').click(function () {
			  var mySection = jQuery(this).attr('id');
			  var mySectionLinks = 'ul#' + mySection + '-links';
			  //alert(mySectionLinks);
			  jQuery(this).addClass('open');
			  jQuery(mySectionLinks).show('slow');
		   });
		   
		});
	}

});