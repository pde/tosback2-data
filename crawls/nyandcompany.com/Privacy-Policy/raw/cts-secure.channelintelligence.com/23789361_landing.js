// Copyright Channel Intelligence, Inc. 2002-2008
var ci_vid= 23789361;
var ci_cookieDomain=".nyandcompany.com";
var ci_refDomain=".nyandcompany.com";
var ci_imgs=[];
var _nxjeid='';
var _nxjetag='';
var _nxjcsid='';

function ci_FP(ci_pix_url,protocol){var ci_pic=document.createElement('img');ci_pic.src=(protocol!==undefined ? protocol + '://' : (window.location.protocol.toLowerCase() == 'http:' ? 'http://' : 'https://'))+ci_pix_url;ci_imgs[ci_imgs.length]=ci_pic;}
function ci_FP_SCRIPT(ci_pix_url, protocol){document.write('<script type="text/javascript" src="' + (protocol !== undefined ? protocol + '://' : (window.location.protocol.toLowerCase() == 'http:' ? 'http://' : 'https://')) + ci_pix_url + '"></script>');}
function ci_FP_FRAME(ci_pix_url){document.write('<iframe width="0" scrolling="no" height="0" frameborder="0" src="' + ci_pix_url + '"></iframe>');}

function ci_RQV(name,dValue){
    var qArg=new RegExp('[\\?&]'+name+'=?([^&#]*)','i').exec(window.document.location);
    if(qArg===null){return dValue===undefined?null:dValue;}else if(qArg.length<2){return '';}else{return qArg[1];}
}
function CI_GetValue(ci_vName,ci_dValue) {
	if (typeof(window[ci_vName])!=="undefined"){return window[ci_vName];}else{return ci_dValue===undefined?null:ci_dValue;}
}
function CI_LogError(err, customIdentifier) {
	try {
		var oI=new Image();oI.src='https://secure.channelintelligence.com/links/support/js.error.asp?nVID='+ci_vid+'&sCustomerIdentifier='+customIdentifier+'&sMessage='+encodeURIComponent(err.message)+'&sName='+encodeURIComponent(err.name)+'&nNumber='+(err.number&0xFFFF).toString();
	}catch (err1) {}
}
function ci_CC(name,value,daysTillExpire){
	if (daysTillExpire){
		var exDate=new Date();
		exDate.setTime(exDate.getTime()+(daysTillExpire*24*60*60*1000));
		document.cookie=name+'='+value+'; expires='+exDate.toGMTString()+'; domain='+ci_cookieDomain+'; path=/';
	}
}
function ci_UID(value){
	var today=new Date();
	var UID=ci_vid+"-"+value+"-"+Math.floor(Math.random()*9999999999)+today.getFullYear().toString()+today.getMonth().toString()+ today.getDay().toString()+today.getHours().toString()+today.getMinutes().toString()+today.getSeconds().toString()+today.getMilliseconds().toString();
	return UID;
}
function ci_PIX(loc,eid,tid,src,sku,tag){
	try{
		var url='';
		//if (loc===1){url='origin.channelintelligence.com/log.asp?';}
		if (loc===2){url='cts-log.channelintelligence.com?';}
		url+='vid='+ci_vid+'&eid='+eid+'&tid='+tid;
		if(src!==null){url+='&src='+src;}
		if(sku!==null){url+='&sku='+sku;}
		if(tag!==null){url+='&tag='+tag;}
		url += "&ref="+escape(document.referrer);
		return ci_FP(url, 'http');
	}catch(err){}
}
function ci_PIX(loc,eid,tid,src,sku,tag,cat){
	var url='';
	if (loc===2){url=window.location.protocol.toLowerCase()=='http:'?'cts-log.channelintelligence.com?':'ttwbs.channelintelligence.com?';}
	if (loc===3){url='rdr.tag.channelintelligence.com/log.aspx?';}
	url+='vid='+ci_vid+'&eid='+eid+'&tid='+tid;
	if(src!==null){url+='&src='+src;}
	if(sku!==null){url+='&sku='+sku;}
	if(tag!==null){url+='&tag='+tag;}
	if(cat!==null){url+='&cat='+cat;}
	url += "&ref="+escape(document.referrer);
	return ci_FP(url);
}
try {
	var ci_currentURL=location.href.toLowerCase();	
	if(ci_currentURL.indexOf('cart.jsp')===-1) {
		// Landing Page
		var ci_cpncode=ci_RQV('cpncode');
		var ci_srccode=ci_RQV('srccode');
		var ci_src=ci_RQV('ci_src');
		var ci_sku=ci_RQV('ci_sku');
		var ci_tag=ci_RQV('ci_tag');
		var ci_tid=ci_RQV('ci_tid', '');
		var ci_catid=ci_RQV('ci_catid');
		var ci_lastsku=ci_RQV('productId');
		var ci_itemid=ci_RQV('productId');
		if(ci_tid===''){
			ci_tid=ci_UID(ci_sku);
		}

		// Performance Marketing
		try{
			if(document.referrer.toLowerCase().indexOf(ci_refDomain)===-1){
				ci_FP_SCRIPT('segment-pixel.invitemedia.com/pixel?code=VID_23789361_S&clientID=4403&key=segment&returnType=js'); 
				ci_FP('r.turn.com/r/beacon?b2=tubXdVHZcl9falsRLWgScyJEHhAFyEJKdsGIEFuwFwk-63RfRNJWay6y8v222YEkbYeQldOjUrb3l9-6iYCweA&cid=');
			}
			//Petites
			if(location.href.toLowerCase().indexOf('cat580006')===-1){
				ci_FP_SCRIPT('segment-pixel.invitemedia.com/pixel?code=VID_23789361_P&clientID=4403&key=segment&returnType=js'); 
				ci_FP('r.turn.com/r/beacon?b2=oNBanBd_8Y-WvkHdtYtGuGd1vuNbJuiE6gtq-oxId9w-63RfRNJWay6y8v222YEkuUNr86qVb8_UFZoKVp2ssg&cid=');
			}
			//Talls
			if(location.href.toLowerCase().indexOf('cat880004')===-1){
				ci_FP_SCRIPT('segment-pixel.invitemedia.com/pixel?code=VID_23789361_T&clientID=4403&key=segment&returnType=js'); 
				ci_FP('r.turn.com/r/beacon?b2=tVccIfNnQ_QniY2qy1InPpoomPUnih_-S28HL-ri_5k-63RfRNJWay6y8v222YEkPUp4mqRmM23EDTqW3VE0yA&cid=');
			}
			if((ci_lastsku!==null)&&window.location.protocol.toLowerCase() == 'http:'){
				ci_FP_FRAME(
					'http://pixels.youknowbest.com/cfc.html?vid=' + ci_vid
					+(ci_lastsku===null||typeof(ci_lastsku)=='undefined'?'':'&lastsku='+ci_lastsku)
				);
			}
		}catch(err){CI_LogError(err, 'landing_PerformanceMkting');}

		// NextJump
		var ci_nxjcsid=ci_RQV('u1');
		if(ci_nxjcsid!==null){ci_CC('ci_u1',ci_nxjcsid,30);}

		// CI Tracking
		if(ci_cpncode!==null){
			ci_CC('ci_cpncode',ci_cpncode,30);
			ci_CC('ci_src',ci_srccode,30);
			ci_CC('ci_tid',"",-1);
		} else if(ci_src!==null && ci_sku!==null) {
			ci_CC('ci_cpncode',"",-1);
			ci_CC('ci_tid',ci_tid,30);
			ci_CC('ci_src',ci_src,30);
			ci_PIX(2,23,ci_tid,ci_src,ci_sku,null,ci_catid);
		} else if(ci_tag!==null) {
			ci_CC('ci_cpncode',"",-1);
			ci_CC('ci_tid',ci_tid,30);
			ci_PIX(2,7,ci_tid,null,ci_itemid,ci_tag,ci_catid);
		} else if(document.referrer.toLowerCase().indexOf(ci_refDomain)===-1){
			ci_PIX(2,13,null,null,ci_itemid,null,ci_catid);
		}
		ci_PIX(2,49,null,null,ci_itemid,'landing',ci_catid);
	} else {
		// Cart Page
		// Performance Marketing
		try{
			ci_PIX(2,49,null,null,ci_itemid,'cart',ci_catid);
			ci_FP_SCRIPT('segment-pixel.invitemedia.com/pixel?code=VID_23789361_AC&clientID=4403&key=segment&returnType=js', 'https');
			ci_FP('r.turn.com/r/beacon?b2=oac3ulwJs6bDwro94Udv19rGqqkOAcB-O8OJ2QAM7_8-63RfRNJWay6y8v222YEkKDaZyN9y9Tf11xgoAc2uFw&cid=', 'https');
		}catch(err){CI_LogError(err, 'cart_PerformanceMkting');}
	}
}catch(err1){CI_LogError(err1, 'landing');}