if(typeof KIDS == "undefined" || !KIDS) var KIDS = {};

KIDS.namespace("ads.refresh");

$(document).bind("kca_categories_loaded", function() { 
	KIDS.ads.refresh.placeKCAAds(); 
	KIDS.reporting.kcaVoteInit();
	KIDS.reporting.omnifunctions.sendReportingCall();
});

KIDS.ads.refresh.KCAOrangeCarpetOn = function(){
	try{
		KIDS.ads.refresh.placeKCADosAds(NICK.kca.dos.SHOW_STATUS_ORANGE);
		$("#kca-dos-tray-ad").show();
	}catch(e){KIDS.utils.doLog(e);}
}
KIDS.ads.refresh.KCALiveShowOn = function(){
	try{
		KIDS.ads.refresh.placeKCADosAds(NICK.kca.dos.SHOW_STATUS_LIVE);
		$("#kca-dos-tray-ad").show();
	}catch(e){KIDS.utils.doLog(e);}
}
KIDS.ads.refresh.KCALiveShowOff = function(){
	try{
		KIDS.ads.refresh.placeKCADosAds(NICK.kca.dos.EVENT_DOS_OFF);
		$("#kca-dos-tray-ad").hide();
	}catch(e){KIDS.utils.doLog(e);}
}
KIDS.ads.refresh.placeKCADosAds = function(dosStatus){
	try{
		$("*[id*='ad-']").each(function(){
			var adDivId = $(this).attr("id");
			var sz = adDivId.substring(adDivId.indexOf("-")+1,adDivId.indexOf("D"));
			
			for(var i=0;i<KIDS.ads.adArray.length;i++){	
				if(sz==KIDS.ads.adArray[i].getSize()){
					var adObj = KIDS.ads.adArray[i];
					var aokvs = adObj.getKeyValues();
					
					var pattern = new RegExp("(.*)site=(\\w+;)(.*)","gi")
					var result = pattern.exec(aokvs);
					if(result&&result.length==4){
						var site = result[2];
						var tmp = result[1]+result[3];
						var pat = new RegExp("(.*)!category="+site+"(.*)","gi")
						var res=pat.exec(tmp);
						if(res&&res.length==3)aokvs = res[1]+res[2];
					}		
					if(aokvs.indexOf("pos=")>-1){
						aokvs = aokvs.substring(0,aokvs.indexOf("pos="))+aokvs.substring(aokvs.indexOf("pos=")+8);
					}
					var kvs = KIDS.ads.pageLevelAdConfig.keyValues+aokvs;	
					var contentType = "adi";
					if(sz.indexOf("-")>0) sz = sz.substring(0,sz.indexOf("-"));
					var actualSize = adObj.getActualSize();
					if(dosStatus == NICK.kca.dos.SHOW_STATUS_ORANGE)
						kvs+="kcavalue=orangecarpet;";
					else if(dosStatus==NICK.kca.dos.SHOW_STATUS_LIVE)
						kvs+="kcavalue=liveshow;";
					
					var secs = KIDS.ads.pageLevelAdConfig.zone
										
					if(actualSize.length>0){
						var adurl = btg.Controller.getAdUrl(
							{
								size:sz,	
								contentType:"adi",
								realSize: actualSize,
								keyValues:kvs,		
								sections:secs,
								isReloadable:adObj.isRefreshable()
							}
						);
					}else{
						var adurl = btg.Controller.getAdUrl(
							{
								size:sz,	
								contentType:"adi",
								keyValues:kvs,		
								sections:secs,
								isReloadable:adObj.isRefreshable()
							}
						);
					}
					var width=(actualSize.length>0)?actualSize.substring(0,actualSize.indexOf("x")):sz.substring(0,sz.indexOf("x"));
					var height=(actualSize.length>0)?actualSize.substring(actualSize.indexOf("x")+1):sz.substring(sz.indexOf("x")+1);
					if(adDivId.indexOf("728")>-1){
						if(dosStatus == NICK.kca.dos.EVENT_DOS_OFF){
							$("#"+adDivId).html("<iframe scrolling=\"no\" height=\""+height+"\" frameborder=\"0\" width=\""+width+"\" src=\""
									+adurl+"\" marginwidth=\"0\" marginheight=\"0\"  allowtransparency=\"true\"></iframe>");
							$("#top-advertisement").show();
						}else{
							$("#kca-dos-tray-ad").html("<table align=\"center\" id=\"adOPA\"><tr><td width=\"14\" class=\"slug\"/><td><iframe scrolling=\"no\" height=\"90\" frameborder=\"0\" width=\"965\" src=\""
									+adurl+"\" marginwidth=\"0\" marginheight=\"0\"  allowtransparency=\"true\"></iframe></td></tr></table>");
							$("#kca-dos-tray-ad").show();
						}
					}else
						$("#"+adDivId).html("<iframe scrolling=\"no\" height=\""+height+"\" frameborder=\"0\" width=\""+width+
							"\" src=\""+adurl+"\" marginwidth=\"0\" marginheight=\"0\"  allowtransparency=\"true\"></iframe>");
					
				}
			}
		});
	}catch(e){KIDS.utils.doLog(e);}
}
KIDS.ads.refresh.placeKCAAds = function(){
	try{
		var adHolders = $(".kcaVote");
		for(var i=0;i<adHolders.length;i++)
			KIDS.ads.refresh.placeAd(adHolders[i].id,true);
	}catch(e){KIDS.utils.doLog(e);}
}
KIDS.ads.refresh.placeAd = function(adDivId,kcaVoteMode, sponsorOveride){
	try{	
		if(KIDS.get("adfree")!="true" || sponsorOveride == "true"){
				var sz = adDivId.substring(adDivId.indexOf("-")+1,adDivId.indexOf("D"));
				var flag = false;
				
				for(var i=0;i<KIDS.ads.adArray.length;i++){	
					if(sz==KIDS.ads.adArray[i].getSize()){
						flag=true;
						var adObj = KIDS.ads.adArray[i];
						var aokvs = adObj.getKeyValues();
						
						var pattern = new RegExp("(.*)site=(\\w+;)(.*)","gi")
						var result = pattern.exec(aokvs);
			
						if(result&&result.length==4){
							var site = result[2];
							aokvs = result[1]+result[3];
							var pat = new RegExp("(.*)!category="+site+"(.*)","gi")
							var res=pat.exec(aokvs);
							if(res&&res.length==3){aokvs = res[1]+res[2];}
						}	
						if(aokvs.indexOf("pos=")>-1){
							aokvs = aokvs.substring(0,aokvs.indexOf("pos="))+aokvs.substring(aokvs.indexOf("pos=")+8);
						}
						var kvs = KIDS.ads.pageLevelAdConfig.keyValues+aokvs;	
						var contentType = adObj.getContentType();
						if(sz.indexOf("-")>0) sz = sz.substring(0,sz.indexOf("-"));
						var actualSize = adObj.getActualSize();					
						
						var rate = "";
						if(adObj.isRefreshable()){
							rate=parseInt(adObj.getRefreshRate());
							if(isNaN(rate)||rate<0.5)rate=0.5;
							rate*=60000;
						}
						var secs = KIDS.ads.pageLevelAdConfig.zone;
												
						if(kcaVoteMode){
							var adurl = btg.Controller.getAdUrl(
								{
									size:sz,	
									contentType:"adi",
									keyValues:kvs,		
									sections:secs,
									isReloadable:adObj.isRefreshable()
								}
							);
							
							var width=sz.substring(0,sz.indexOf("x"));
							var height=sz.substring(sz.indexOf("x")+1);
							$("#"+adDivId).html("<iframe scrolling=\"no\" height=\""+height+"\" frameborder=\"0\" width=\""+width+
									"\" src=\""+adurl+"\" marginwidth=\"0\" marginheight=\"0\"  allowtransparency=\"true\"></iframe>");
						}else{
							btg.Controller.placeAd(
								{
									size:sz,	
									contentType:contentType,
									realSize:actualSize,
									keyValues:kvs,		
									sections:secs,
									isReloadable:adObj.isRefreshable(),
									reloadInterval:rate
								}
							);
						}
					}
				}	
				if(!flag){
					if($("#"+adDivId).length>0){	
						if($("#"+adDivId).parents("#top-advertisement").length>0){$("#top-advertisement").attr("class","hiddenClass");} 
						else if($("#"+adDivId).parents("li[class='item-preview masked-item clearfix']").length==1)
							$("#"+adDivId).parents("li[class='item-preview masked-item clearfix']").first().attr("class","hiddenClass");
						else $("#"+adDivId).attr("class","hiddenClass");
					}
				}
			if(adDivId.indexOf("2000x300")>-1){
				if(KIDS.get("urlAlias")!="cartoon-creator"){
					var kval = "demo=D;";
					if(KIDS.ads.pageLevelAdConfig.rugrat!=null)kval+=KIDS.ads.pageLevelAdConfig.rugrat;
					btg.Controller.placeAd(
						{
						       size:"2000x300",
						       contentType:"adj",
						       keyValues:kval
						}
					);
					$("#"+adDivId).attr("style","display:block;");
				}else{
					var t=setTimeout("KIDS.ads.refresh.displayPreloader()",5000);
				}
			}
		}
	}catch(e){KIDS.utils.doLog("KIDS.ads.refresh.placeAd failed:"+e);}
}
KIDS.ads.refresh.displayPreloader = function(){
	try{
		$("#ad-2000x300Div").css("display","none");
	 	$("#cciFrame").css("display","block");
	}catch(e){KIDS.utils.doLog("KIDS.ads.refresh.displayPreloader failed:"+e.toString());return("");}
}