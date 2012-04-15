btg.config.DoubleClick.enabled = true;
btg.config.DoubleClick.dartSite = "nick.nol";
if(KIDS.get("fccRelatedShow").toLowerCase().indexOf("kca")>-1){
	btg.config.DoubleClick.dartSite = "nick.kca";
}else if((location.pathname.indexOf("/kids-choice-awards")>-1)||(location.pathname.indexOf("/kca-")>-1)||(location.pathname.indexOf("-kcas-")>-1)){
	btg.config.DoubleClick.dartSite = "nick.kca";
}else if(KIDS.get("uri")=="/club/clubhouses/star-lounge.html")
	btg.config.DoubleClick.dartSite = "nick.kca";
btg.config.DoubleClick.positionThreshold = '3';
btg.config.reloadableAds=false;
btg.config.reloadInterval=0;
/*
if(KIDS.get("videoType")=="fullEpisodeItem"){
	btg.config.FreeWheel = {enabled:true,type:"MRM"};
	btg.config.FreeWheel.reloadable=false;
}
*/