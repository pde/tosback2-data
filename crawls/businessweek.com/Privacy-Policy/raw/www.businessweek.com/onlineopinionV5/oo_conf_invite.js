/* OnlineOpinion v5.2.2 */
/* Released: 5/6/2011 */
/* Components: Full */
/* The following code is Copyright 1998-2011 Opinionlab, Inc.  All rights reserved. Unauthorized use is prohibited. This product and other products of OpinionLab, Inc. are protected by U.S. Patent No. 6606581, 6421724, 6785717 B1 and other patents pending. http://www.opinionlab.com */

/* Run the Invitation instance */
new OOo.Invitation({
/* REQUIRED - Asset identification */
	pathToAssets: '/onlineopinionV5/'
/* OPTIONAL - Configuration */
	, responseRate: 5
	, repromptTime:	7776000
	, promptDelay: 0
	, popupType: 'popunder'
	, companyLogo: '/onlineopinionV5/logo.png'
	, referrerRewrite: {
		searchPattern: /:\/\/[^\/]*/ 
		, replacePattern: '://interstitial.businessweek.com' 
	} 
});

