// File Name: iv_nv_footer
// Purpose: call out to iv_setBusinessProps for omniture tracking on New vertical
// Version: Feb 11, 2010

//This is required for all ivillage channel.
if (window.location.href.toLowerCase().indexOf("astrology.com") >= 0) {
	document.write('<scr'+'ipt  language="javascript" type="text/javascript" src="http://a820.g.akamai.net/f/820/822/1d/i.ivillage.com/ivillage/newdesign/js/iv_nv_s_code.js"></scr'+'ipt>');
	document.write('<scr'+'ipt language="javascript" type="text/javascript" src="http://gc.astrology.com/gc/sitewide/javascript/astro_omniture.js"></scr'+'ipt>');
}

//Call made to the omniture_header.js file to define s_iv.props 8, 9, 10, 11, 12, 14 & s_iv.pageName
if (typeof(news_code_isLoaded) == 'undefined') { news_code_isLoaded = false; }
if (typeof(iv_slideshow_omni) == 'undefined') { iv_slideshow_omni = false; }

if(!iv_slideshow_omni) {
			if (isAstrologyPage) {
			setTimeout("iv_setBusinessProps()", 2000);
		} 
		else  {
			if (news_code_isLoaded) { 
				iv_setBusinessProps();		
			}
		}	
}				

function sendAnalyticsEvent(str) {
	if (s_account == "nbcuglobal") { s_account = "nbcuivsites";}
	var s_iv=s_gi(s_account);
	s_iv.eVar13 = (typeof(str) != 'undefined' && str != '') ? str : s_iv.pageName;
	s_iv.tl(this,'o','Flash Click');
}
function sendLinkEvent(str, linkname) {
        ns=s_account;
        if (str!="" && str!=null) ns+=","+str;
        s_linkType="o"; s_link=true;
        s_linkName=lnkname;
        void(s_gs(ns));
}
//<!-- End SiteCatalyst code version: H.19.4. --> 

//<!-- Start Quantcast tag -->
document.write('<scr'+'ipt LANGUAGE="javascript" type="text/javascript" >_qoptions = {qacct:"p-9eJ8k4iSzux46",labels:"iVillage"};</scr'+'ipt>');
document.write('<scr'+'ipt language="javascript" type="text/javascript" src="http://edge.quantserve.com/quant.js"></scr'+'ipt>');
document.write('<noscript>'+'<a href="http://www.quantcast.com/p-9eJ8k4iSzux46" target="_blank"><img src="http://pixel.quantserve.com/pixel/p-9eJ8k4iSzux46.gif?labels=iVillage" style="display: none;" border="0" height="1" width="1" alt="Quantcast"/></a>'
+'</noscript>');
//<!-- End Quantcast tag -->

//There are some references to _gat (03/31/2009)
var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));