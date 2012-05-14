/*

EXTERNAL LINK INTERCEPT SCRIPT
- Interacts with links to add a modal window when an external link is clicked.
- The below runs onLoad and interacts with the A tags

Created By: Andy Reid
Original Date: October 15, 2010

Modifications;
DATE		NAME		DESC
5/12/2011	Andy Reid	Removed some weird references to usa.gov that were breaking the code
11/15/2011  Trevor Cole Removed style modal and replaced with colorbox modal.
						Added support to intercept mailto links with colorbox modal window if the class of the a tag is "iframe"

*/

jQuery(document).ready(function(){
		
	// Loop over the anchor tags on the page
	jQuery("a").each(function(){ 
		// Get the HREF Destination
		hrefVal = jQuery(this).attr("href");	
	

		// Check that we have an href
		if ( hrefVal != undefined && hrefVal != '' && hrefVal != '#' && hrefVal.length > 4){

			// Strip old intercept urls preemtively
			hrefVal_strp = strip_old_intercepts( get_url_from_handlelink(hrefVal) );
			if (hrefVal != hrefVal_strp) {  jQuery(this).attr("href", hrefVal_strp);  }  
			hrefVal = hrefVal_strp;


			// String old intercept from the html of the element
			hrefHTML = jQuery(this).html();
			hrefHTML_strp = strip_old_intercepts( get_url_from_handlelink(hrefHTML) );
			if (hrefHTML != hrefHTML_strp) {  jQuery(this).html(hrefHTML_strp);  }


			
			// Get the href start value
			startStrVal = hrefVal.substring(0, 4);
			
			// Check if we have a valid URL
			if ( startStrVal == 'http' || hrefVal.indexOf("javascript:HandleLink") != -1  ){
			
		
				// Get the HREF domain
				hrefDomain = get_hostname_from_url(hrefVal);
								
		
				// Check if we are leaving the domain
				if (hrefDomain != window.location.hostname && hrefDomain.indexOf(".gov") < 0 && hrefDomain.indexOf(".mil") < 0 && hrefDomain.indexOf(".si.edu") < 0 && hrefDomain.indexOf(".fed.us") < 0 ){
		
		
					// Remove onClick bindings
					jQuery(this).unbind('click');
					jQuery(this).attr("onClick", ""); 
						
					// Bind a click event to open the alert message
					jQuery(this).click(function() {
			
						var destURL = jQuery(this).attr("href");
						
						// Strip old intercept urls
						destURL = strip_old_intercepts(destURL);
						
						// open exit message
						
						//popExitMsg(get_url_from_handlelink(destURL));
						// User Colorbox instead
						// <p><input type='button' onclick='javascript:removeExitMsg();$.colorbox.close();' value='Cancel'></p>
						jQuery.colorbox({transition:"none", scrolling: false, width:"500", height:"200", html:"<table cellpadding='20'><tr><td valign='middle'><h2>You are exiting the National Park Service website</h2><h3>Thank you for visiting our site.</h3><p>You will now be redirected to:<br /><a id='exitBox-destHref' href='" + destURL + "' target='_parent'>" + destURL + "</a></p><p>We hope your visit was informative and enjoyable.</p></td></tr></table>"});
						jQuery(document).bind('cbox_cleanup', function(){
						    removeExitMsg();
						});
						
						// pause and redirect
						exitMsgTimeout = window.setTimeout(function() {
							/*if ( destURL.indexOf("javascript:HandleLink") != -1 ) {
								eval( destURL.replace("javascript:","") );
							} else {*/
								parent.location = get_url_from_handlelink(destURL);
					    	/*}*/
						    
						}, 7000); // length of pause, in ms
						
						return false;

					});
				}

			}
			
			// check if it is a redirected mailto and add the class iframe if it is
			if (hrefVal.indexOf("/common/utilities/sendmail/sendemail.cfm") !=-1){
				jQuery(this).addClass('colorbox-iframe');
			}				
			
		}
	});
	
	// open any tag with a class of "colorbox-iframe" in a colorbox iframe
	jQuery('a.colorbox-iframe').colorbox({iframe:true, transition:"none", title:"Contact Form", close:"close", width:"800", height:"780", scrolling: false});
	
});


function get_hostname_from_url(url) {
	
	url = get_url_from_handlelink(url);
	return url.match(/:\/\/(.[^/]+)/)[1];	

}

function get_url_from_handlelink(url) {
	
	// the CMS handles new windows with a "handlelink()" function
		
	if ( url.indexOf("javascript:HandleLink") != -1)  {	
		// pull url from cms window link
		x = url.indexOf("CPNEWWIN:");
		y = url.indexOf("'",x);
		url = url.substr(x,(y-x));
		
		url_arr = url.split(",");
		url = url_arr[url_arr.length-1];
		
		url_arr = url.split("@");
		url = url_arr[url_arr.length-1];
		
	}

	return url;	

}


function strip_old_intercepts(url) {
	
	var newUrl = url.replace("http://www.nps.gov/cgi-bin/intercept?","");
	newUrl = newUrl.replace("http://www.nps.gov/cgi-bin/intercept2?","");
	newUrl = newUrl.replace("http://www.nps.gov/cgi-bin/intercept3?","");
	newUrl = newUrl.replace("http://www.nps.gov/cgi-bin/intercept4?","");
	newUrl = newUrl.replace("http://home.nps.gov/applications/redirect/?sUrl=","");
	newUrl = newUrl.replace("http://www.nps.gov/applications/redirect/?sUrl=","");
	newUrl = newUrl.replace("/cgi-bin/intercept?","");
	newUrl = newUrl.replace("/cgi-bin/intercept2?","");
	newUrl = newUrl.replace("/cgi-bin/intercept3?","");
	newUrl = newUrl.replace("/cgi-bin/intercept4?","");
	newUrl = newUrl.replace("/applications/redirect/?sUrl=","");
	newUrl = newUrl.replace("/applications/redirect/?sUrl=","");
		
	return newUrl;
}
/*
function popExitMsg(destURL){                                                                                              

	// show overlay grey screen                                                                                   
 	jQuery('#exitMsg-screen').show().css({ opacity: 0.7, 'width':jQuery(document).width(),'height':jQuery(document).height()});                                                                                                      
 	jQuery('body').css({'overflow':'hidden'});                                                                              

	// show exit message
 	jQuery('#exitMsg-box').show();    
 
 	// center vertically	
    var windowHeight = jQuery(window).height();
    var exitBoxHeight = jQuery('#exitMsg-box').height();
    if(exitBoxHeight < windowHeight) {
        jQuery('#exitMsg-box').css('top', (Math.floor((windowHeight - exitBoxHeight) / 2) + jQuery(window).scrollTop() - 40) );
    }	 	

    // center horizontally
    var windowWidth = jQuery(window).width();
    var exitBoxWidth = jQuery('#exitMsg-box').width();
    if(exitBoxHeight < windowWidth) {
        jQuery('#exitMsg-box').css('left', (Math.floor((windowWidth - exitBoxWidth) / 2) + jQuery(window).scrollLeft()) );
    }
    
    // set destHref
      jQuery('#exitBox-destHref').html(destURL);
      jQuery('#exitBox-destHref').attr("href", destURL);
      		 	                                                                   
 }   */
                                                                                                                   
function removeExitMsg(){
	// clear timeout
	clearTimeout(exitMsgTimeout);
	
	// hide message
	jQuery('#exitMsg-screen').hide();
	jQuery('#exitMsg-box').hide();
}
