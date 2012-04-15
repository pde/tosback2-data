//==============================================================================
// Title:       Global Header JavaScript
// Purpose:     Javascript code to be included at top of all web pages.
//------------------------------------------------------------------------------
// Revision Authors:
// * TTM: Thomas Mroczkowski
//
// Notes:
// * This file is archived to /common_scripts/Tacoda.old/
// * tacoda header voided 01.31.07, original content backed at /common_scripts/Tacoda.old/Tacoda_AMS_DDCHeader.v4.js
// * WebTrends code removed, 12.15.2009, part of BW i49.2 release
//==============================================================================

var script = document.createElement('script');
script.src = 'http://www.businessweek.com/common_scripts/jquery-1.5.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);






//==============================================================================
// Revenue Science 
//------------------------------------------------------------------------------
// * (see also Tacoda_footer.js) install with channel map 06.19.07
//==============================================================================

/*REVENUE SCIENCE AD TAG CODE*/
var rsi_segs = [];
var segs_beg=document.cookie.indexOf('rsi_segs=');
if(segs_beg>=0){
	segs_beg=document.cookie.indexOf('=',segs_beg)+1;
	if(segs_beg>0){
		var segs_end=document.cookie.indexOf(';',segs_beg);
		if(segs_end==-1){
			segs_end=document.cookie.length;
		}
		rsi_segs=document.cookie.substring(segs_beg,segs_end).split('|');
	}
}
var segLen=20;
var segQS="",segArr=new Array();
if (rsi_segs.length<segLen){
	segLen=rsi_segs.length;
}
for (var i=0;i<segLen;i++){
    segArr=rsi_segs[i].split("_");
    if (segArr.length>1){
		segQS+=("rsi"+"="+segArr[1]+";");
	}
}
/*END REVENUE SCIENCE AD TAG CODE*/

document.write('<scr'+'ipt type="text/javascript" src="http://js.revsci.net/gateway/gw.js?csid=F07607"><\/scr'+'ipt>');
document.write('<scr'+'ipt type="text/javascript" src="http://static.btrd.net/js/bw_comscore.js"><\/scr'+'ipt>');
document.write('<link href="http://static.btrd.net/css/interstitial.css" rel="stylesheet" type="text/css" media="screen"  />');
document.write('<scr' + 'ipt type="text/javascript" src="http://static.btrd.net/js/master.js"></scr' + 'ipt>');
document.write('<scr' + 'ipt type="text/javascript" src="http://static.btrd.net/js/interstitial.js"></scr' + 'ipt>');




   









