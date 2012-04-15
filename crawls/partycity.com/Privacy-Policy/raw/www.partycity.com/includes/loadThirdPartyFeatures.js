/*
(C) Copyright MarketLive. 2006. All rights reserved.
MarketLive is a trademark of MarketLive, Inc.
Warning: This computer program is protected by copyright law and international treaties.
Unauthorized reproduction or distribution of this program, or any portion of it, may result
in severe civil and criminal penalties, and will be prosecuted to the maximum extent
possible under the law.
*/

  /**
   * This is for AddThis social network buttons
   */
   function loadAddThis(){
  		var at=document.createElement('script');
  		at.type='text/javascript';

  		at.async=true;
  		at.src=('https:'==document.location.protocol?'https://':'http://')+'s7.addthis.com/js/250/addthis_widget.js#username=xa-4bdb339973cc4bf0';
  		var s=document.getElementsByTagName('script')[0];
  		s.parentNode.insertBefore(at,s);
  }

/**
*Returns the version of Internet Explorer or a -1
*(indicating the use of another browser).
*/
  function getInternetExplorerVersion()
	{
	  var rv = -1; // Return value assumes failure.
	  if(navigator.appName == 'Microsoft Internet Explorer')
	  {
	    var ua = navigator.userAgent;
	    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
	    if (re.exec(ua) != null)
	      rv = parseFloat( RegExp.$1 );
	  }

	  return rv;
	}
/**
* return true if IE version is less than 9
*/
	function internetExplorerVersionLessThan9()
	{
	  var ver = getInternetExplorerVersion();
	  if ( ver > -1 )
	  {
	    if ( ver <= 8.0 ) 
	      return true;
	    else
	      return false;
	  }
	}
