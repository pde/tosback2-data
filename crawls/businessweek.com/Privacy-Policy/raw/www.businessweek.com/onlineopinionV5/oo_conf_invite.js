/*
OnlineOpinion v5.6.2
Released: 7/26/2012. Compiled 07/26/2012 03:14:59 PM -0500
Branch: master f85964d08a7431113cc4cc29b4bea8abe31650d3
Components: Full
The following code is Copyright 1998-2012 Opinionlab, Inc.  All rights reserved. Unauthorized use is prohibited. This product and other products of OpinionLab, Inc. are protected by U.S. Patent No. 6606581, 6421724, 6785717 B1 and other patents pending. http://www.opinionlab
*/
// Define first replacePattern
var rp = '://invite1.businessweek.com';
// Generate random integer between 0-8
var x = Math.floor(Math.random() * 9);
// Redefine replacePattern for middle 3rd of integer values
if (x > 2 && x < 6) {
  rp = '://invite2.businessweek.com';
}
// Redefine replacePattern for last 3rd of integer values
if (x > 5 && x < 9) {
  rp = '://invite3.businessweek.com';
}
var ref_pattern = new RegExp("http://([a-z]+).businessweek.com");
var prodHost = '/onlineopinionV5/';
if (ref_pattern.test(window.location.href) == true) {
  prodHost = 'http://static.btrd.net' + prodHost;
} 
/* Run the Invitation instance */
new OOo.Invitation({
/* REQUIRED - Asset identification */
	pathToAssets: prodHost // must correctly reference locally hosted HTML assets directory
/* OPTIONAL - Configuration */
	, responseRate: 5
	, repromptTime: 7776000 
	, promptDelay: 3
	, popupType: 'popunder'
//	, companyLogo: '/onlineopinionV5/logo.gif'
	, neverShowAgainButton: false
	, referrerRewrite: {
		  searchPattern: /:\/\/[^\/]*/
		, replacePattern: rp
		  }
});