// Copyright Channel Intelligence, Inc. 2002-2008
var ci_vid= 21252397;
var ci_cookieDomain=".saksfifthavenue.com";
var ci_refDomain=".saksfifthavenue.com";
var ci_imgs=[];

function ci_FP(ci_pix_url,protocol){var ci_pic=document.createElement('img');ci_pic.src=(protocol!==undefined ? protocol + '://' : (window.location.protocol.toLowerCase() == 'http:' ? 'http://' : 'https://'))+ci_pix_url;ci_imgs[ci_imgs.length]=ci_pic;}
function ci_FP_SCRIPT(ci_pix_url, protocol){document.write('<script type="text/javascript" src="' + (protocol !== undefined ? protocol + '://' : (window.location.protocol.toLowerCase() == 'http:' ? 'http://' : 'https://')) + ci_pix_url + '"></script>');}
function ci_RQV(name,dValue){
    var qArg=new RegExp('[\\?&]'+name+'=?([^&#]*)','i').exec(window.document.location);
    if(qArg===null){return dValue===undefined?null:dValue;}else if(qArg.length<2){return '';}else{return qArg[1];}
}
function CI_ExternalJS(link){
  var script  = document.createElement('script');
  script.src  = link;
  script.type = 'text/javascript';
  script.defer = true;
  document.getElementsByTagName('head').item(0).appendChild(script);
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
		if (loc===2){url=window.location.protocol.toLowerCase()=='http:'?'cts-log.channelintelligence.com?':'ttwbs.channelintelligence.com?';}
		if (loc===3){url='rdr.tag.channelintelligence.com/log.aspx?';}
		url+='vid='+ci_vid+'&eid='+eid+'&tid='+tid;
		if(src!==null){url+='&src='+src;}
		if(sku!==null){url+='&sku='+sku;}
		if(tag!==null){url+='&tag='+tag;}
		url += "&ref="+escape(document.referrer);
		return ci_FP(url);
	}catch(err){CI_LogError(err, 'landing_ci_PIX_function');}
}
try {
	var ci_cpncode=ci_RQV('cpncode');
	var ci_srccode=ci_RQV('srccode');
	var ci_src=ci_RQV('ci_src');
	var ci_sku=ci_RQV('ci_sku');
	var ci_tag=ci_RQV('ci_tag');
	var ci_tid=ci_RQV('ci_tid', '');
	var ci_itemid = null;
	var ci_prd_id=ci_RQV('PRODUCT%3C%3Eprd_id');
	
	//Teracent
	try{
		if(ci_prd_id!==null&&ci_prd_id!==''){
			ci_FP('tlcint.teracent.net/tase/int?adv=319&fmt=redir&sec=0&pid=prod&prodID='+ci_prd_id);
		}
	}catch(err){CI_LogError(err, 'landing_Teracent');}
	
	if(ci_tid===''){
		ci_tid=ci_UID(ci_sku);
	}
	
	if (location.href.toLowerCase().indexOf('productdetail.jsp') > -1) {
		ci_itemid=ci_RQV('PRODUCT%3C%3Eprd_id');
	}
		
	var ci_catid=ci_RQV('SECSLOT',null);
	
	if(ci_tag===null&&ci_src===null&&ci_cpncode===null){
		var ci_ref=ci_RQV('site_refer');
		if(ci_ref!==null&&document.referrer.toLowerCase().indexOf(ci_refDomain)===-1){
			ci_tag=ci_ref;
			ci_CC('ci_pixmgr',ci_tag,14);
		}
	}
	
	try{	
		if(ci_itemid!==null||ci_catid!==null){
			//ci_FP('ads.youknowbest.com/default.ashx?vid=' + ci_vid+(ci_itemid===null?'':'&sku='+ci_itemid)+(ci_catid===null?'':'&cat='+ci_catid));
		}
	}catch(err){CI_LogError(err, 'landing_PerformanceMkting');}
	
	//Criteo
	try{
		if(location.href.toLowerCase().indexOf('productdetail.jsp')>-1 && ci_itemid!==null) {
			var cto_params = [];
			//CONFIGURE THE FOLLOWING VARIABLES 
			cto_params["i"] = ci_itemid; 
			//DO NOT MODIFY AFTER THIS LINE
			var cto_conf = 't1=sendEvent&c=2&p=3917';
			var cto_conf_event = 'v=2&wi=7715584&pt1=2';
			var CRITEO = function(){var b ={Load:function(d){var c = window.onload;window.onload = function(){if(c){c()}d()}}};function a(e){ if(document.createElement){var c = document.createElement((typeof(cto_container)!= 'undefined' && cto_container == 'img')? 'img' : 'iframe');if(c){c.width='1px';c.height='1px';c.style.display='none';c.src = e;var d = document.getElementById('cto_mg_div'); if(d!=null&&d.appendChild){d.appendChild(c)}}}}return{Load:function(c){document.write("<div id='cto_mg_div' style='display:none;'></div>");c+='&'+cto_conf;var f='';if(typeof(cto_conf_event)!='undefined')f=cto_conf_event; if(typeof(cto_container)!='undefined'){if(cto_container=='img')c+='&resptype=gif';}if(typeof(cto_params)!='undefined'){for(var key in cto_params){ if(key!='kw'&&(typeof(cto_params[key])=='string'))f+='&'+key+'='+encodeURIComponent(cto_params[key]);} if(cto_params['kw']!=undefined)c+='&kw='+encodeURIComponent(cto_params['kw']);}c+='&p1='+encodeURIComponent(f); c+='&cb='+Math.floor(Math.random()*99999999999);try{c+='&ref='+encodeURIComponent(document.referrer);}catch(e){}try{ c+='&sc_r='+encodeURIComponent(screen.width+'x'+screen.height);}catch(e){}try{c+='&sc_d='+encodeURIComponent(screen.colorDepth);}catch (e){}b.Load(function(){ a(c.substring(0,2000))})}}}();CRITEO.Load(document.location.protocol+'//dis.us.criteo.com/dis/dis.aspx?');
		}
	}catch(err){CI_LogError(err, 'landing_Criteo');}

	if(ci_cpncode!==null){
		ci_CC('ci_cpncode',ci_cpncode,30);
		ci_CC('ci_pixmgr',ci_srccode,14);
		ci_CC('ci_tid',"",-1);
	} else if(ci_src!==null && ci_sku!==null) {
		ci_CC('ci_cpncode',"",-1);
		ci_CC('ci_tid',ci_tid,30);
		ci_CC('ci_pixmgr',ci_src,14);
		ci_PIX(2,23,ci_tid,ci_src,ci_sku,null);
	} else if(ci_tag!==null) {
		ci_CC('ci_cpncode',"",-1);
		ci_CC('ci_tid',ci_tid,30);
		ci_PIX(2,7,ci_tid,null,ci_itemid,ci_tag);
	} else if(document.referrer.toLowerCase().indexOf(ci_refDomain)===-1){
	    ci_PIX(2,13,null,null,ci_itemid,null);
	}
	ci_PIX(2,49,null,null,ci_itemid,'landing');
}catch(err1){CI_LogError(err1, 'landing');}