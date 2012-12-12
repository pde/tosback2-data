/*
OnlineOpinion v5.5.4
Released: 4/2/2012. Compiled 04/02/2012 09:57:40 AM -0500
Branch: master e81c7dd47ea0ad08f7d09a681a97ee25a9c321cf
Components: Full
The following code is Copyright 1998-2012 Opinionlab, Inc.  All rights reserved. Unauthorized use is prohibited. This product and other products of OpinionLab, Inc. are protected by U.S. Patent No. 6606581, 6421724, 6785717 B1 and other patents pending. http://www.opinionlab
*/

/* [+] Floating Icon configuration */
  var oo_floating = new OOo.Ocode({
	  floating: {}	
	, customVariables: {
		  loginID: typeof userBehavior !== 'undefined' ? userBehavior.cid : ''
		, sessionID: typeof userBehavior !== 'undefined' ? userBehavior.currentSessionID : ''
		, ppNum: typeof userBehavior !== 'undefined' ? userBehavior.pid : ''
	  }
  });