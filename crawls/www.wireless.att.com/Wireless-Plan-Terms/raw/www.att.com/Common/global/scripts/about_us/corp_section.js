// JavaScript Document
//alert(document.documentMode + ' | ' + document.compatMode);

jQuery(document).ready(function() {

	 /* bargaining blog = bargaining.att.com/corewireline */
if ( document.domain == 'bargaining.att.com' ) {
		if (window.location.href.indexOf("corewireline") != -1) {
			//alert('test');
			jQuery('<div style="border:1px solid #eaeaea;background:#f5f5f5;margin:0 20px 40px 20px;padding:15px 30px 15px 15px;"><p style="font-size:14px;color:#000;"><em>&quot;As one of the largest employers in America, we&#39;re proud of the number of quality middle class careers we&#39;ve provided to our employees, with wages and benefits that are among the best in the country. We have a longstanding cooperative relationship with our unions, and we&#39;re committed to working together to bargain a fair contract that will allow us to provide those careers.&quot;</p><p style="font-size:14px;color:#000;margin-bottom:0;">&mdash; Mark Royse, Executive Vice President &ndash; Labor Relations</em></p></div>').insertAfter('#logoHeaderBA');
	}
		else if (window.location.href.indexOf("mobilitybenefits") != -1){
			jQuery('<div style="border:1px solid #eaeaea;background:#f5f5f5;margin:0 20px 40px 20px;padding:15px 30px 15px 15px;"><p style="font-size:14px;color:#000;">On September 13, AT&amp;T announced that AT&amp;T Mobility reached a tentative agreement with the Communications Workers of America in benefits negotiations covering all CWA bargained-for Mobility employees nationwide &ndash; more than 40,000 employees.</p><p style="font-size:14px;color:#000;">The tentative agreement is focused on benefits, including health care. Wages, pension and work rules for bargained-for Mobility employees are negotiated under separate contracts.</p><p style="font-size:14px;color:#000;">This website is designed to provide additional information to employees about the tentative agreement.</p></div>').insertAfter('#logoHeaderBA');
	} else {
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