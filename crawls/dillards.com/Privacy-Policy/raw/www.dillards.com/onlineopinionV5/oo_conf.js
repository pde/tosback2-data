/*
OnlineOpinion v5.7
Released: 3/6/2013. Compiled 03/06/2013 01:59:16 PM -0600
Branch: master 8d549bbb6d7ff935b4572cf4e62e305e6cd843d7
Components: Full
The following code is Copyright 1998-2013 Opinionlab, Inc.  All rights reserved. Unauthorized use is prohibited. This product and other products of OpinionLab, Inc. are protected by U.S. Patent No. 6606581, 6421724, 6785717 B1 and other patents pending. http://www.opinionlab
*/

/* Inline configuration */
var oo_feedback = new OOo.Ocode({
  customVariables: {
	  coreID6: OOo.readCookie('CoreID6')
	, timestamp: new Date().getTime()
  }
});

/* [+] Tab Icon configuration */
var oo_tab = new OOo.Ocode({
  tab: {}
, customVariables: {
	  coreID6: OOo.readCookie('CoreID6')
	, timestamp: new Date().getTime()
  }
});

/*
INLINE FEEDBACK LINK EXAMPLE
<a href="javascript:void(0);" onClick="oo_feedback.show()"><img src="/onlineopinionV5/oo_icon.gif" border="0" title="Feedback"> Feedback</a>
*/