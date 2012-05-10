if(typeof KIDS == "undefined" || !KIDS) var KIDS = {};

KIDS.namespace("ads.refresh");

KIDS.ads.refresh.minSponsor = 1;
KIDS.ads.refresh.maxSponsor = 2;
KIDS.ads.refresh.randSponsor = Math.floor(Math.random()*(KIDS.ads.refresh.maxSponsor-KIDS.ads.refresh.minSponsor+1)+KIDS.ads.refresh.minSponsor);

KIDS.ads.refresh.Male = [{"age":"6","rugrat":"Dil"},{"age":"7","rugrat":"Tommy"},{"age":"8","rugrat":"Phil"},{"age":"9","rugrat":"Chuckie"},{"age":"10","rugrat":"Stu"},{"age":"11","rugrat":"Chas"},{"age":"12","rugrat":"Lou"},{"age":"13","rugrat":"Boris"},{"age":"14","rugrat":"Bill"},{"age":"15","rugrat":"George"},{"age":"16","rugrat":"Jack"},{"age":"17","rugrat":"Jimmy"},{"age":"18","rugrat":"Ron"},{"age":"25","rugrat":"Bryan"},{"age":"35","rugrat":"Ed"},{"age":"45","rugrat":"Dan"},{"age":"55","rugrat":"Damon"},{"age":"65","rugrat":"Irving"}];
KIDS.ads.refresh.Female = [{"age":"6","rugrat":"Lil"},{"age":"7","rugrat":"Susie"},{"age":"8","rugrat":"Kimi"},{"age":"9","rugrat":"Angelica"},{"age":"10","rugrat":"Didi"},{"age":"11","rugrat":"Kira"},{"age":"12","rugrat":"Betty"},{"age":"13","rugrat":"Minka"},{"age":"14","rugrat":"Hilary"},{"age":"15","rugrat":"Barbara"},{"age":"16","rugrat":"Jackie"},{"age":"17","rugrat":"Rosalyn"},{"age":"18","rugrat":"Nancy"},{"age":"25","rugrat":"Aly"},{"age":"35","rugrat":"Kelly"},{"age":"45","rugrat":"Amy"},{"age":"55","rugrat":"Susan"},{"age":"65","rugrat":"Ruth"}];

$(document).bind("kca_categories_loaded", function() { 
	KIDS.ads.refresh.placeKCAAds(); 
	KIDS.reporting.kcaVoteInit();
	KIDS.reporting.omnifunctions.sendReportingCall();
});
/*
KIDS.ads.refresh.adRendered = function(adId){
	try{
		if(KIDS.get("videoType")=="fullEpisodeItem"){			
			var adDivId = $("#fwph_"+adId.substring(2)).parent().attr("id");			
			if(adDivId.indexOf("728x90")<0){
				$("#"+adDivId).removeClass("hiddenSlug");
			}else{
				$("#"+adDivId).siblings(".hiddenSlug").attr("class","slug");
			}
		}
	}catch(e){KIDS.utils.doLog("KIDS.ads.refresh.adRendered failed:"+e);}
}
//btg.Events.adLoaded.subscribe(KIDS.ads.refresh.adRendered);//this is function hooked into Freewheel competitive separation ad refresh so the slugs can be hidden before ads are rendered
btg.Events.adLoaded.subscribe(KIDS.ads.refresh.adRendered);
*/

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
			var rugrat= KIDS.ads.refresh.getRugratValue();
			
			for(var i=0;i<KIDS.ads.adArray.length;i++){	
				if(sz==KIDS.ads.adArray[i].getSize()){
					var adObj = KIDS.ads.adArray[i];
					var kVals = ""+adObj.getKeyValues();	
					var zone = "_hp";
					var contentType = "adi";
					if(sz.indexOf("-")>0) sz = sz.substring(0,sz.indexOf("-"));
					var actualSize = adObj.getActualSize();
					kVals = (kVals.lastIndexOf(";")==(kVals.length-1)) ? kVals : kVals+";";
					if(KIDS.reporting.qs.testmode) kVals += "testmode=" + KIDS.reporting.qs.testmode+";";
					if(KIDS.ads.refresh.maxSponsor>1) kVals+="cat="+KIDS.ads.refresh.randSponsor+";";					
					if(rugrat!=null)kVals+=rugrat;
					if(dosStatus == NICK.kca.dos.SHOW_STATUS_ORANGE)
						kVals+="kcavalue=orangecarpet;";
					else if(dosStatus==NICK.kca.dos.SHOW_STATUS_LIVE)
						kVals+="kcavalue=liveshow;";
					
					kVals+="demo=D;";
					zone=zone.replace(/[- ]/gi,"_");
					kVals=kVals.replace(/[- ]/gi,"_");
					
					if(actualSize.length>0){
						var adurl = btg.Controller.getAdUrl(
							{
								size:sz,	
								contentType:"adi",
								realSize: actualSize,
								keyValues:kVals,		
								sections:zone,
								isReloadable:adObj.isRefreshable()
							}
						);
					}else{
						var adurl = btg.Controller.getAdUrl(
							{
								size:sz,	
								contentType:"adi",
								keyValues:kVals,		
								sections:zone,
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
				var rugrat= KIDS.ads.refresh.getRugratValue();
				
				for(var i=0;i<KIDS.ads.adArray.length;i++){	
					if(sz==KIDS.ads.adArray[i].getSize()){
						flag=true;
						var adObj = KIDS.ads.adArray[i];
						var kVals = ""+adObj.getKeyValues();	
						var zone = location.pathname;
						var contentType = adObj.getContentType();
						if(sz.indexOf("-")>0) sz = sz.substring(0,sz.indexOf("-"));
						var actualSize = adObj.getActualSize();
					
						if(KIDS.get("videoType").length>0){
							zone = zone.replace("/clip/","/"+KIDS.get("videoType")+"/");
						}
						if(zone.indexOf(".html")<0){
							if(zone.charAt(zone.length-1)!="/") zone+="/";
							if(zone.indexOf("vote")>-1){
								if(zone.charAt(zone.length-1)=="/"){
									var kcaCurrentCat = NICK.kca.getCurrentUserCategory();
									if(kcaCurrentCat!=null){		
										var tmp = zone.split("/vote/");
										if(tmp[1].length==0){
											zone+=kcaCurrentCat.url+"/";	
											kVals+="kcacategory="+kcaCurrentCat.url+";";
										}else{ 
											kVals+="kcacategory="+tmp[1].substring(0,tmp[1].length-1)+";";
										}
									}
								}
								zone+="index.html";
							}else if(NICK.club != null){
								if(NICK.club.pageOwner!=null && NICK.club.pageOwner.length>0){
									if(location.pathname.indexOf(NICK.club.pageOwner)>-1){
										var clubSection=NICK.club.utils.getSection();
										zone = "/club/profiles/"+clubSection+".html";
									}else zone+="index.html";
								}else zone+="index.html";
							}else zone+="index.html";
							var arr = zone.split("/");
							if(arr.length==2){
								if(arr[1]=="index.html")zone = "/_hp";
							}else if(arr.length==3){
								if(arr[2]=="index.html")zone = "/"+arr[1]+"/_mn";
							}
						}else if(KIDS.get("isGotw")=="true"){
							zone = "/games/game-of-the-week-games/play";
						}
						kVals = (kVals.lastIndexOf(";")==(kVals.length-1)) ? kVals : kVals+";";
						if(KIDS.reporting.qs.testmode) kVals += "testmode=" + KIDS.reporting.qs.testmode+";";
						if(KIDS.ads.refresh.maxSponsor>1) kVals+="cat="+KIDS.ads.refresh.randSponsor+";";					
						if(rugrat!=null)kVals+=rugrat;
						if(KIDS.get("fccRelatedShow")) kVals+='!category='+KIDS.get("fccRelatedShow")+';show='+KIDS.get("fccRelatedShow")+';';
						if(KIDS.get("type")=="game" && KIDS.get("isDetailPage")=="true") kVals+='ga='+KIDS.get("urlAlias")+';';
						if(KIDS.get("isGotw")=="true") kVals+='gotw=true;';
						if(KIDS.get("primaryType"))kVals+= 'gametype='+KIDS.get("primaryType").toLowerCase()+";";
						kVals+="demo=D;";
						zone=zone.replace(/[- ]/gi,"_");
						kVals=kVals.replace(/[- ]/gi,"_");
						
						var rate = "";
						if(adObj.isRefreshable()){
							rate=parseInt(adObj.getRefreshRate());
							if(isNaN(rate)||rate<0.5)rate=0.5;
							rate*=60000;
						}
	
						if(kcaVoteMode){
							var adurl = btg.Controller.getAdUrl(
								{
									size:sz,	
									contentType:"adi",
									keyValues:kVals,		
									sections:zone,
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
									keyValues:kVals,		
									sections:zone,
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
					if(rugrat!=null)kval+=rugrat;
					btg.Controller.placeAd(
						{
						       size:"2000x300",
						       contentType:"adj",
						       keyValues:kval,
						       sections:location.pathname
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
KIDS.ads.refresh.getRugratValue = function(){
	try{
		function getValue(arr){
			var rval = null;
			var age = new Number(NICK.utils.getCookie("age").split(" ")[0]);
			for(var i=0;i<arr.length;i++){
				if(arr[i].age>age){
					if(i>0) rval="rugrat="+arr[i-1].rugrat+";";
					break;
				}
			}
			return(rval);
		}
		var retval = null;
		switch(NICK.utils.getCookie("gender")){
			case "Male":
				retval = getValue(KIDS.ads.refresh.Male);
				break;
			case "Female":
				retval = getValue(KIDS.ads.refresh.Female);
		}
		return(retval);
	}catch(e){KIDS.utils.doLog("KIDS.ads.refresh.getRugratValues failed:"+e.toString());return("");}
}
KIDS.ads.refresh.displayPreloader = function(){
	try{
		$("#ad-2000x300Div").css("display","none");
	 	$("#cciFrame").css("display","block");
	}catch(e){KIDS.utils.doLog("KIDS.ads.refresh.displayPreloader failed:"+e.toString());return("");}
}