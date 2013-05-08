/*
OnlineOpinion v5.7
Released: 3/6/2013. Compiled 03/06/2013 01:59:16 PM -0600
Branch: master 8d549bbb6d7ff935b4572cf4e62e305e6cd843d7
Components: Full
The following code is Copyright 1998-2013 Opinionlab, Inc.  All rights reserved. Unauthorized use is prohibited. This product and other products of OpinionLab, Inc. are protected by U.S. Patent No. 6606581, 6421724, 6785717 B1 and other patents pending. http://www.opinionlab
*/

var respRate = (document.domain == 'www.dillards.com' || document.domain == 'dillards.com') ? 10 : 100;

if (OOo.Browser.isMobile === false){
  /* Run the Invitation instance */
  new OOo.Invitation({
  /* REQUIRED - Asset identification */
  	pathToAssets: '/onlineopinionV5/' // must correctly reference locally hosted HTML assets directory
  /* OPTIONAL - Configuration */
  	, responseRate: respRate // percent of users served. Adjust to 10 after testing
  	, repromptTime: 5184000 // 60 days
  	, promptDelay: 3 // seconds
  	, popupType: 'popunder'
  //	, companyLogo: '/onlineopinionV5/logo.gif' // to display on the invitation prompt
  	, neverShowAgainButton: true
  	, referrerRewrite: {
  		  searchPattern: /:\/\/[^\/]*/
  		, replacePattern: '://invite-general.dillards.com'
		  }
  	, customVariables: {
  		  coreID6: OOo.readCookie('CoreID6')
  		, timestamp: new Date().getTime()
		  }
		, friendlyDomains: ['http://www.dillards.com','https://www.dillards.com','http://iqa.dillards.com','https://iqa.dillards.com']
  });
  
  /* Target anchor, image, input & button tags to prevent premature trigger of invite survey on protocol switch */
  function callback(e) {
    var e = window.e || e;
    var target = e.target || e.srcElement; // IE Compat

    if (target.nodeName == 'A' || target.nodeName == 'IMG' || target.nodeName == 'INPUT' || target.nodeName == 'BUTTON') {
      OOo.Invitation.notifyFriendlyLocationChange();
    } else {
      return;
    }
  }

  /* Append callback() function to the document click event */
  if (document.addEventListener) {
    document.addEventListener('click', callback, false);
  } else {
    document.attachEvent('onclick', callback);
  }
}

/*
Add the following script blocks to the document HEAD of the appropriate site section

Search Abandonment - www.dillards.com/SearchResultList
---------------------
<script type="text/javascript" charset="utf-8">
OOoDynamicRewrite = {
  weight: 2
, replacePattern: http://search-abandonment.dillards.com
}
</script>

Category Abandonment - www.dillards.com/shop, www.dillards.com/content
---------------------
<script type="text/javascript" charset="utf-8">
OOoDynamicRewrite = {
  weight: 3
, replacePattern: http://category-abandonment.dillards.com
}
</script>

Product Abandonment - www.dillards.com/product
---------------------
<script type="text/javascript" charset="utf-8">
OOoDynamicRewrite = {
  weight: 4
, replacePattern: http://product-abandonment.dillards.com
}
</script>

Checkout Abandonment - www.dillards.com/webapp/wcs/stores/servlet/OrderItemDisplay
---------------------
<script type="text/javascript" charset="utf-8">
OOoDynamicRewrite = {
  weight: 5
, replacePattern: http://checkout-abandonment.dillards.com
}
</script>

Checkout Confirmation/Completion Page Only
---------------------
<script type="text/javascript" charset="utf-8">
OOoDynamicRewrite = {
  weight: 6
, replacePattern: http://invite-general.dillards.com
}
</script>
*/