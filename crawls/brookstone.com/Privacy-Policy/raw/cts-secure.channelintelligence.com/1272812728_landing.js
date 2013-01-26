// Copyright Channel Intelligence, Inc. 2002-2008
var ci_vid= 12728;
var ci_cookieDomain=".brookstone.com";
var ci_refDomain=".brookstone.com";
var ci_testDomains=new Array("localhost.", "stage.", "dev.");
var ci_imgs=[];

//ci_ITD is used to test if order is from production or test environment.  False = production, True = test order
function ci_ITD(){if(ci_testDomains!=undefined){for(i=0;i<ci_testDomains.length;i++){if(document.location.href.toLowerCase().indexOf(ci_testDomains[i], 0)>=0){return true}}}return false}

function ci_FP(ci_pix_url,protocol){var ci_pic=document.createElement('img');ci_pic.src=(protocol!==undefined ? protocol + '://' : (window.location.protocol.toLowerCase() == 'http:' ? 'http://' : 'https://'))+ci_pix_url;ci_imgs[ci_imgs.length]=ci_pic;}
function ci_FP_FRAME(ci_pix_url, protocol){document.write('<iframe width="0" scrolling="no" height="0" frameborder="0" src="' + (protocol !== undefined ? protocol + '://' : (window.location.protocol.toLowerCase() == 'http:' ? 'http://' : 'https://')) + ci_pix_url + '"></iframe>');}
function ci_RQV(name,dValue){
    var qArg=new RegExp('[\\?&]'+name+'=?([^&#]*)','i').exec(window.document.location);
    if(qArg===null){return dValue===undefined?null:dValue;}else if(qArg.length<2){return '';}else{return qArg[1];}
}
function ci_CC(name,value,daysTillExpire){
	if (daysTillExpire){
		var exDate=new Date();
		exDate.setTime(exDate.getTime()+(daysTillExpire*24*60*60*1000));
		document.cookie=name+'='+value+'; expires='+exDate.toGMTString()+'; domain='+ci_cookieDomain+'; path=/';
	}
}
function CI_GetValue(ci_vName,ci_dValue) {
	if (typeof(window[ci_vName])!=="undefined"){return window[ci_vName];}else{return ci_dValue===undefined?null:ci_dValue;}
}
function ci_UID(value){
	var today=new Date();
	var UID=ci_vid+"-"+value+"-"+Math.floor(Math.random()*9999999999)+today.getFullYear().toString()+today.getMonth().toString()+ today.getDay().toString()+today.getHours().toString()+today.getMinutes().toString()+today.getSeconds().toString()+today.getMilliseconds().toString();
	return UID;
}
function CI_ExternalJS(link){
  	var script  = document.createElement('script');
  	script.src  = link;
  	script.type = 'text/javascript';
  	script.defer = true;
  	document.getElementsByTagName('head').item(0).appendChild(script);
}
function ci_PIX(loc,eid,tid,src,sku,tag){
	var url='';
	//if (loc===1){url='origin.channelintelligence.com/log.asp?';}
	if (loc===2){url='cts-log.channelintelligence.com?';}
	url+='vid='+ci_vid+'&eid='+eid+'&tid='+tid;
	if(src!==null){url+='&src='+src;}
	if(sku!==null){url+='&sku='+sku;}
	if(tag!==null){url+='&tag='+tag;}
	url += "&ref="+escape(document.referrer);
	return ci_FP(url, 'http');
}
	
if(window.location.protocol.toLowerCase() == 'http:'){	
	try {
		var ci_cpncode=ci_RQV('cpncode');
		var ci_srccode=ci_RQV('srccode');
		var ci_src=ci_RQV('ci_src');
		var ci_sku=ci_RQV('ci_sku');
		var ci_tag=ci_RQV('ci_tag');
		var ci_cmcat=ci_RQV('cm_cat');
		var ci_cmven=ci_RQV('cm_ven');
		var ci_cmmmc=ci_RQV('cm_mmc');
		var ci_bkeid=ci_RQV('bkeid');
		var ci_tid=ci_UID(ci_sku);
		var ci_pagetype=CI_GetValue('CI_PageType',null);
		var ci_itemid=CI_GetValue('CI_ItemID',null);
		var ci_catname=CI_GetValue('CI_CatName',null);
		
		if(document.referrer.toLowerCase().indexOf('yahoo')>-1){
			ci_CC('ci_pixmgr','yahoo',7);
		}else if(document.referrer.toLowerCase().indexOf('google')>-1){	
			ci_CC('ci_pixmgr','google',7);
		}else if(document.referrer.toLowerCase().indexOf('msn')>-1){	
			ci_CC('ci_pixmgr','msn',7);
		}else if(ci_cmven!==null) {
			ci_CC('ci_pixmgr',ci_cmven,7);
		}else if(ci_cmven===null&&ci_cmmmc!==null) {
			ci_CC('ci_pixmgr',ci_cmmmc,7);
		}else if(ci_cmven===null&&ci_bkeid!==null) {
			ci_CC('ci_pixmgr',ci_bkeid,7);
		}
		
		//Mercent Pixel
		CI_ExternalJS('http://cdn.mercent.com/js/tracker.js');
		mr_merchantID = "Brookstone"; 
		var MercentLoad;
		if(ci_ITD()===false){
	    		MercentLoad=window.setInterval("if(typeof(mr_Track)=='function'){mr_merchantID='Brookstone'; mr_Track(); window.clearInterval(MercentLoad);}",500);
	    	}
	    	
	   	//Google
	    CI_ExternalJS('https://ssl.google-analytics.com/urchin.js');
		var GoogleLoad;
	    _uacct = "UA-225484-1";
	    if(ci_ITD()===false){
	    GoogleLoad=window.setInterval("if(typeof(urchinTracker)=='function'){_uacct='UA-225484-1'; urchinTracker(); window.clearInterval(GoogleLoad);}",500);
		}
		
		//Tellapart
		try{
		  	if(ci_ITD()===false){
		  	if(ci_pagetype == 'HOME'||ci_pagetype == 'CAT'||ci_pagetype == 'PRODUCT'){
				var __cmbLoaded = false,
					__cmbRunnable = null;
				(function () {
					try {
						var b;
						var actionType = "pv";
						function d() {
							var action = TellApartCrumb.makeCrumbAction("BSHrQRAc8Xxh", actionType);
							//Home Page
							if (ci_pagetype == 'HOME') {
								action.setActionAttr("PageType", "ProductCategory");
								action.setActionAttr("ProductCategoryPath", "HOME");
							}
							if (ci_pagetype == 'CAT') {
								action.setActionAttr("PageType", "ProductCategory");
								action.setActionAttr("ProductCategoryPath", ci_catname);
							}
							if (ci_pagetype == 'PRODUCT') {
								action.setActionAttr("PageType", "Product");
								action.setActionAttr("SKU", ci_itemid);
								action.setActionAttr("ProductCategoryPath", ci_catname);
							}
							action.finalize()
						};
					
					if ("https:" == document.location.protocol) b = "https://sslt.tellapart.com/crumb.js";
					else {
						for (var g = navigator.userAgent, h = 0, e = 0, i = g.length; e < i; e++) h ^= g.charCodeAt(e);
						b = "http://static.tellaparts.com/crumb" + h % 10 + ".js"
					}
					if (actionType === "tx") {
						__cmbRunnable = d;
						document.write("\x3Cscript type='text/java" + "script' src='" + b + "'\x3E\x3C/script\x3E");
						__cmbLoaded = true
					} else {
						var a = document.createElement("script");
						a.src = b;
						a.onload = function () {
							__cmbLoaded = true;
							d()
						};
						a.onreadystatechange = function () {
							if (/loaded|complete/.test(a.readyState)) {
								__cmbLoaded = true;
								d()
							}
						};
						var s = document.getElementsByTagName("script")[0];
						s.parentNode.insertBefore(a, s)
					}
				} catch (j) {}
				})();
				if (__cmbRunnable != null) {
					__cmbRunnable();
					__cmbRunnable = null
				};
			}
			}
		}catch(err){}
		
		if(ci_cmven!==null){ci_tag=ci_cmven;}
		
		if(ci_ITD()===false){
			if(ci_cpncode!==null){
				ci_CC('ci_cpncode',ci_cpncode,14);
				ci_CC('ci_pixmgr',ci_srccode,14);
				ci_CC('ci_tid',"",-1);
			} else if(ci_src!==null && ci_sku!==null) {
				ci_CC('ci_cpncode',"",-1);
				ci_CC('ci_tid',ci_tid,14);
				ci_CC('ci_pixmgr',ci_src,14);
				ci_PIX(2,23,ci_tid,ci_src,ci_sku,null);
			} else if(ci_tag!==null) {
				ci_CC('ci_cpncode',"",-1);
				ci_CC('ci_tid',ci_tid,14);
				ci_PIX(2,7,ci_tid,null,null,ci_tag);
			}
		}
	}    
	catch(err){}
}
