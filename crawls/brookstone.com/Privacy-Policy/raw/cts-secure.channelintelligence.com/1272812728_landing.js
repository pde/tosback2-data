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
	
// Criteo
function loadCriteo(){var ci_pagetype=CI_GetValue('CI_PageType',null);var ci_itemid=CI_GetValue('CI_ItemID',null);
if(ci_pagetype=='HOME'){try{var cto_conf='t1=sendEvent&c=2&p=3215';var cto_conf_event='v=2&wi=7714124&pt1=0&pt2=1';var CRITEO=function(){var b={Load:function(d){var c=window.onload;window.onload=function(){if(c){c()}d()}}};function a(e){if(document.createElement){var c=document.createElement((typeof(cto_container)!='undefined'&&cto_container=='img')?'img':'iframe');if(c){c.width='1px';c.height='1px';c.style.display='none';c.src=e;var d=document.getElementsByTagName('body');if(!d||d.length==0)return;d=d[0];if(d!=null&&d.appendChild){d.appendChild(c)}}}}return{Load:function(c){c+='&'+cto_conf;var f='';if(typeof(cto_conf_event)!='undefined')f=cto_conf_event;if(typeof(cto_container)!='undefined'){if(cto_container=='img')c+='&resptype=gif'}if(typeof(cto_params)!='undefined'){for(var key in cto_params){if(key!='kw'&&(typeof(cto_params[key])=='string'))f+='&'+key+'='+encodeURIComponent(cto_params[key])}if(cto_params['kw']!=undefined)c+='&kw='+encodeURIComponent(cto_params['kw'])}c+='&p1='+encodeURIComponent(f);c+='&cb='+Math.floor(Math.random()*99999999999);try{c+='&ref='+encodeURIComponent(document.referrer)}catch(err){}try{c+='&sc_r='+encodeURIComponent(screen.width+'x'+screen.height)}catch(err){}try{c+='&sc_d='+encodeURIComponent(screen.colorDepth)}catch(err){}a(c.substring(0,2000))}}}();CRITEO.Load(document.location.protocol+'//dis.us.criteo.com/dis/dis.aspx?')}catch(err){}}
if(ci_pagetype=='PRODUCT'&&ci_itemid!==null&&ci_itemid!==''){try{var cto_params=[];cto_params["i"]=ci_itemid;var cto_conf='t1=sendEvent&c=2&p=3215';var cto_conf_event='v=2&wi=7714124&pt1=2';var CRITEO=function(){var b={Load:function(d){var c=window.onload;window.onload=function(){if(c){c()}d()}}};function a(e){if(document.createElement){var c=document.createElement((typeof(cto_container)!='undefined'&&cto_container=='img')?'img':'iframe');if(c){c.width='1px';c.height='1px';c.style.display='none';c.src=e;var d=document.getElementsByTagName('body');if(!d||d.length==0)return;d=d[0];if(d!=null&&d.appendChild){d.appendChild(c)}}}}return{Load:function(c){c+='&'+cto_conf;var f='';if(typeof(cto_conf_event)!='undefined')f=cto_conf_event;if(typeof(cto_container)!='undefined'){if(cto_container=='img')c+='&resptype=gif'}if(typeof(cto_params)!='undefined'){for(var key in cto_params){if(key!='kw'&&(typeof(cto_params[key])=='string'))f+='&'+key+'='+encodeURIComponent(cto_params[key])}if(cto_params['kw']!=undefined)c+='&kw='+encodeURIComponent(cto_params['kw'])}c+='&p1='+encodeURIComponent(f);c+='&cb='+Math.floor(Math.random()*99999999999);try{c+='&ref='+encodeURIComponent(document.referrer)}catch(e){}try{c+='&sc_r='+encodeURIComponent(screen.width+'x'+screen.height)}catch(e){}try{c+='&sc_d='+encodeURIComponent(screen.colorDepth)}catch(e){}a(c.substring(0,2000))}}}();CRITEO.Load(document.location.protocol+'//dis.us.criteo.com/dis/dis.aspx?')}catch(err){}}
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
		
		//Criteo Home Page
		document.write("<div id='cto_mg_div' style='display:none;'></div>"); 
		window.setTimeout( "loadCriteo();", 1000 );

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
try {
	//Monetate
	if(ci_ITD()===false){
	     var monetateT = new Date().getTime();
	    (function() {
		    var p = document.location.protocol;
		    if (p == "http:" || p == "https:") {
			    var m = document.createElement('script'); m.type = 'text/javascript'; m.src = (p == "https:" ? "https://s" : "http://") + "b.monetate.net/js/1/a-ffc9d1d5/p/brookstone.com/" + Math.floor(monetateT / 3600000) + "/g";
			    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(m, s);
		    }
	    })();
	}
}catch(err){}