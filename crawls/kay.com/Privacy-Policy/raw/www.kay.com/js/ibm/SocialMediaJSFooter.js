/**
 * 
 * @fileOverview  This file contains the javascript functions for the Social Media buttons; 
 * Facebook and Twitter with Coremetrics call on the bottomNav.jsp
 * 
 * SocialMediaJSFooter
 */
 function loadFacebookAnalytics() {
	cmCreateElementTag("Facebook Likes", "Facebook Likes", "");
	cmCreateManualLinkClickTag('Facebook Likes','Facebook Likes',' ');
	}

function loadTwitterAnalytics() {
	cmCreateElementTag("Twitter Follow", "Twitter Follow", "");
	cmCreateManualLinkClickTag('Twitter Follow','Twitter Follow',' ');	
}