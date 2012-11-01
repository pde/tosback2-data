// Copyright Channel Intelligence, Inc. 2002-2008
if(window.location.protocol.toLowerCase() == 'http:'||window.location.href.toLowerCase().indexOf('process=myaccount')>-1){
	var ci_vid= 16481822;
	var ci_cookieDomain=".zales.com";
	var ci_refDomain=".zales.com";
	var ci_imgs=[];
	var hs_aOE="";
	var hs_ES="";
	var h_w="";

	function ci_FP(ci_pix_url,protocol){var ci_pic=new Image(1,1);ci_pic.src=(protocol!==undefined ? protocol + '://' : (window.location.protocol.toLowerCase() == 'http:' ? 'http://' : 'https://'))+ci_pix_url;ci_imgs[ci_imgs.length]=ci_pic;}
	function ci_FP_SCRIPT(ci_pix_url, protocol){document.write('<script type="text/javascript" src="' + (protocol !== undefined ? protocol + '://' : (window.location.protocol.toLowerCase() == 'http:' ? 'http://' : 'https://')) + ci_pix_url + '"></script>');}
	function ci_FP_FRAME(ci_pix_url, protocol){document.write('<iframe width="0" scrolling="no" height="0" frameborder="0" src="' + (protocol !== undefined ? protocol + '://' : (window.location.protocol.toLowerCase() == 'http:' ? 'http://' : 'https://')) + ci_pix_url + '"></iframe>');}

	function CI_LogError(err, customIdentifier) {
		try {
			var oI=new Image();oI.src='https://secure.channelintelligence.com/links/support/js.error.asp?nVID='+ci_vid+'&sCustomerIdentifier='+customIdentifier+'&sMessage='+encodeURIComponent(err.message)+'&sName='+encodeURIComponent(err.name)+'&nNumber='+(err.number&0xFFFF).toString();
		}catch (err1) {}
	}
	function ci_RQV(name,dValue){
	    var qArg=new RegExp('[\\?&]'+name+'=?([^&#]*)','i').exec(window.location);
	    if(qArg===null){return dValue===undefined?null:dValue;}else if(qArg.length<2){return '';}else{return qArg[1];}
	}
	function ci_CC(name,value,daysTillExpire){
		if (daysTillExpire){
			var exDate=new Date();
			exDate.setTime(exDate.getTime()+(daysTillExpire*24*60*60*1000));
			document.cookie=name+'='+value+'; expires='+exDate.toGMTString()+'; domain='+ci_cookieDomain+'; path=/';
		}
	}
	function CI_ExternalJS(link){
		try{
		  	var script  = document.createElement('script');
		  	script.src  = link;
		  	script.type = 'text/javascript';
		  	script.defer = true;
		  	document.getElementsByTagName('head').item(0).appendChild(script);	
		}catch(err){}
	}
	function ci_UID(value){
		var today=new Date();
		var UID=ci_vid+"-"+value+"-"+Math.floor(Math.random()*9999999999)+today.getFullYear().toString()+today.getMonth().toString()+ today.getDay().toString()+today.getHours().toString()+today.getMinutes().toString()+today.getSeconds().toString()+today.getMilliseconds().toString();
		return UID;
	}
	function CI_GetValue(ci_vName,ci_dValue) {
		if (typeof(window[ci_vName])!=="undefined"){return window[ci_vName];}else{return ci_dValue===undefined?null:ci_dValue;}
	}
	function ci_PIX(loc,eid,tid,src,sku,tag,cat){
		var url='';
		if (loc===1){url='ttwbs.channelintelligence.com?';}
		if (loc===2){url='cts-log.channelintelligence.com?';}
		url+='vid='+ci_vid+'&eid='+eid+'&tid='+tid;
		if(src!==null){url+='&src='+src;}
		if(sku!==null){url+='&sku='+sku;}
		if(tag!==null){url+='&tag='+tag;}
		if(cat!==null){url+='&cat='+cat;}
		url += "&ref="+escape(document.referrer);
		if (loc===1){return ci_FP(url);}
		if (loc===2){return ci_FP(url, 'http');}
	}
	try {
		var ci_cpncode=ci_RQV('cpncode');
		var ci_srccode=ci_RQV('srccode');
		var ci_src=ci_RQV('ci_src');
		var ci_sku=ci_RQV('ci_sku');
		var ci_tag=ci_RQV('ci_tag');
		var ci_tid=ci_RQV('ci_tid', '');
		var ci_customeremail=CI_GetValue('CI_CustomerEmail',null);
		var ci_itemid=CI_GetValue('CI_ItemID',null);
		var ci_catid=CI_GetValue('CI_CatID',null);
		var ci_pagetype=CI_GetValue('CI_PageType',null);
		
		if(ci_tid===''){
			ci_tid=ci_UID(ci_sku);
		}
		
		try{
			//Fire new Invite pixel on all pages
			ci_FP_SCRIPT('segment-pixel.invitemedia.com/pixel?code=VID_16481822_SN&clientID=1344&key=segment&returnType=js');
			
			if(ci_pagetype=='home'){
				ci_FP_SCRIPT('segment-pixel.invitemedia.com/pixel?code=VID_16481822_HOME&clientID=1344&key=segment&returnType=js');
				ci_FP('r.turn.com/r/beacon?b2=Gb-YJy0BD3vIgXWzGOUtTVPOdGXKomfA1R33Fv3gaAP0JyeSbBHm2m2_ttLI-29KkMT54kXJZjSigSwtwBfhQA&cid=');
			}
			if(ci_pagetype=='category'){
				ci_FP_SCRIPT('segment-pixel.invitemedia.com/pixel?code=VID_16481822_CAT&clientID=1344&key=segment&returnType=js');
			}
			if(ci_pagetype=='family'){
				ci_FP_SCRIPT('segment-pixel.invitemedia.com/pixel?code=VID_16481822_FAM&clientID=1344&key=segment&returnType=js');
			}
			if(ci_pagetype=='product'){
				ci_FP_SCRIPT('segment-pixel.invitemedia.com/pixel?code=VID_16481822_PROPAGE&clientID=1344&key=segment&returnType=js');
			}
			
			if(document.referrer.toLowerCase().indexOf(ci_refDomain)===-1){
				ci_FP_SCRIPT('segment-pixel.invitemedia.com/pixel?code=VID_16481822_S&partnerID=42&key=segment&returnType=js');
				ci_FP('r.turn.com/r/beacon?b2=nouNiY0pbYfifhiT3yozTeQa0gSaQP9EejzlAtF087BYFvdW8HkZimkwenJImnJpS8hulgtsK7ff3jKv7KAFJg&cid=');
			}
			if(ci_itemid||ci_catid){
				ci_FP_FRAME(
				'pixels.youknowbest.com/cfc.html?vid=' + ci_vid
				+ (ci_itemid ? '&lastsku=' + ci_itemid : '')
				+ (ci_catid ? '&lastcat=' + ci_catid : '')
               			);

			}
		}catch(err){CI_LogError(err, 'landing_PerfMkting');}
		
		// Doubleclick Spotlight
		try{
			var axel = Math.random()+"";
			var a = axel * 10000000000000;
			ci_FP('ad.doubleclick.net/activity;src=2448552;type=landi922;cat=landi187;ord='+ a + '?');
		}catch(err){CI_LogError(err, 'landing_DoubleClick');}
		
		//SpecificMedia-Vera Wang
		try{
			if(ci_catid=='12134615'){
				ci_FP('bp.specificclick.net?pixid=99069676');
			}
		}catch(err){CI_LogError(err, 'landing_VeraWang');}
		
		//SpecificMedia-Jessica Simpson
		try{
			if(ci_catid=='12134603'){
				ci_FP('bp.specificclick.net?pixid=99069675');
			}
		}catch(err){CI_LogError(err, 'landing_JessicaSimpson');}
		
		//Yahoo
		try{
			ci_FP('idcs.interclick.com/Segment.aspx?sid=8d1a234c-1208-4ddb-9f08-c900b0eeebb6');
		}catch(err){CI_LogError(err, 'landing_Yahoo');}
		
		
		try{
			if(ci_cpncode!==null){
				try{
					ci_CC('ci_cpncode',ci_cpncode,-1);
					ci_CC('ci_src',ci_srccode,-1);
					ci_CC('ci_tid',"",-1);
				}catch(err){CI_LogError(err, 'landing_CI_1');}
			} else if(ci_src!==null && ci_sku!==null) {
				try{
					ci_CC('ci_cpncode',"",-1);
					ci_CC('ci_tid',ci_tid,1);
					ci_CC('ci_src',ci_src,1);
					ci_PIX(2,23,ci_tid,ci_src,ci_sku,null,ci_catid);
				}catch(err){CI_LogError(err, 'landing_CI_2');}
			} else if(ci_tag!==null) {
				try{
					ci_CC('ci_cpncode',"",-1);
					ci_CC('ci_tid',ci_tid,-1);
					ci_PIX(2,7,ci_tid,null,ci_itemid,ci_tag,ci_catid);
				}catch(err){CI_LogError(err, 'landing_CI_3');}
			} else if(document.referrer.toLowerCase().indexOf(ci_refDomain)===-1){
			    try{
			    	ci_PIX(2,13,null,null,ci_itemid,null,ci_catid);
				}catch(err){CI_LogError(err, 'landing_CI_4');}
			}
			try{
				ci_PIX(1,49,null,null,ci_itemid,'landing',ci_catid);
			}catch(err){CI_LogError(err, 'landing_CI_5');}
		}catch(err){CI_LogError(err, 'landing_CI');}
		
		// Collective Media: Zales Friendly Homepage Audience HD Pixel
		try{
			if(ci_pagetype !== null) {
				if(ci_pagetype==='home') {
					ci_FP("b.collective-media.net/seg/cm/ai_zlshp");
				}
			}
		}catch(err){CI_LogError(err, 'landing_CMHomepage');}
		
		// Collective Media: Boom Pixel
		try{
			ci_FP("ad.doubleclick.net/activity;src=1379696;dcnet=4155;boom=32164;sz=1x1;ord=1?");
		}catch(err){CI_LogError(err, 'landing_CMBoom');}
		
		//Tiny Toes
		try{
			if(location.href.toLowerCase().indexOf('categoryid=11970687')>-1){
				ci_FP("bp.specificclick.net?pixid=99069672");
			}
		}catch(err){CI_LogError(err, 'landing_TinyToes');}
		//CheetahMail
		try{
			ci_FP("wvw.zales.com/spacer.gif?event=6~~28~zales");
			hs_ES='28~zales';
			h_w=window;
			
			if(ci_customeremail!==''&&ci_customeremail!==null&&ci_customeremail!==undefined){ci_CC('ci_customeremail',ci_customeremail,30);}
			
			if(ci_itemid!==''&&ci_itemid!==null){hs_aOE+="1012~"+ci_itemid+"~";}	
			if(ci_catid!==''&&ci_catid!==null){hs_aOE+="1113~"+ci_catid+"~";}
			if(window.location.href.toLowerCase().indexOf('process=myaccount')>-1){
				if(ci_customeremail!==''&&ci_customeremail!==null){hs_aOE+="1003~"+ci_customeremail+"~";}	
			}
			CI_ExternalJS("https://cts-secure.channelintelligence.com/sc_zales.js");
		}catch(err){CI_LogError(err, 'landing_Cheetah');}
					 		
 		//Zales Corp Retargeting Pixel
 		try{
 			ci_FP("bp.specificclick.net?pixid=99027498");
 		}catch(err){CI_LogError(err, 'landing_ZalesRet');}
 		
 		//Teracent
 		try{
		 	ci_FP("tlcint.teracent.net/tase/int?adv=300&fmt=redir&sec=1&pid=prod&prodID="+ci_itemid);
 		}catch(err){CI_LogError(err, 'landing_Teracent');}
		
		//Google
 		try{
			ci_FP("www.googleadservices.com/pagead/conversion/1007914368/?label=uegnCKi_mgIQgJvO4AM&amp;guid=ON&amp;script=0");
		}catch(err){CI_LogError(err, 'landing_Google');}
	}catch(err1){CI_LogError(err1, 'landing');}
}