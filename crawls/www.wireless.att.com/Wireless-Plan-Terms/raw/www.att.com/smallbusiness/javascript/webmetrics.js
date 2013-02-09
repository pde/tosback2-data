
WebMetrics = {
	DCS: {
		dcsuri: window.location.pathname,
		dcsref: document.referrer
	},
	
	DCSext: {
		wtNoHit: "1",
		wtSuccessFlag: "1"
	},
	
	init: function() {
		var wtSuccessFlag = WebMetrics.getMetaTagValue("wtSuccessFlag");
		if(wtSuccessFlag != "")
			WebMetrics.DCSext.wtSuccessFlag = wtSuccessFlag;
		
		$('a').each(function(){
			var href = $(this).attr('href');
			var wtPN = WebMetrics.getMetaTagValue('DCSext.wtPN');
			if(href!=undefined)
			if(href.indexOf("wtPN") != -1 && wtPN != ""){
				wtPN =escape(wtPN);
				$(this).attr('href', href.replace(/wtPN/g,wtPN));
			}
		});
		
		$('a.externalLink',$('div#trayContent')).click(function(){
    		if(window.WebMetrics){
    			var pageName = WebMetrics.getMetaTagValue('DCSext.wtPN');
    			dcsMultiTrack('DCSext.wtLinkLoc' , pageName+'_TerNav',
						'DCSext.wtLinkName' ,pageName + "_" + $(this).attr('rel'),
						'DCSext.svl' ,'1');
			}
    	});
		
		$('a',$('.SocialMedia')).click(function(){
    		if(window.WebMetrics){
    			var pageName = WebMetrics.getMetaTagValue('DCSext.wtPN');
    			dcsMultiTrack('DCSext.wtLinkLoc' , pageName+'_SocialMedia',
						'DCSext.wtLinkName' ,pageName + "_" + $(this).attr('rel'),
						'DCSext.svl' ,'2');
			}
    	});
		
		$('a.externalLink',$('.linkFarmContainer')).click(function(){
    		if(window.WebMetrics){
    			var pageName = WebMetrics.getMetaTagValue('DCSext.wtPN');
    			dcsMultiTrack('DCSext.wtLinkLoc' , pageName+'_GlobalLinks',
						'DCSext.wtLinkName' ,pageName + "_" + $(this).attr('rel'),
						'DCSext.svl' ,'2');
			}
    	});
	},
	
	dispatchReport: function(wtEvent) {
		var wtArgs = "'DCSext.wtEvent', '"+wtEvent+"', ";
		
		for(DCSname in WebMetrics.DCS) {
			if(WebMetrics.DCS[DCSname] != undefined && WebMetrics.DCS[DCSname] != "" ) {
				wtArgs  = wtArgs  + "'DCS." + DCSname + "', '" + this.DCS[DCSname] + "', "
			}
		}
		
		for(DCSname in WebMetrics.DCSext) {
			if(WebMetrics.DCSext[DCSname] != undefined && WebMetrics.DCSext[DCSname] != "" ) {
				wtArgs  = wtArgs  + "'DCSext." + DCSname + "', '" + this.DCSext[DCSname] + "', "
			}
		}
		
		execute = "dcsMultiTrack(" + wtArgs.substr(0,wtArgs.length-2) + ")";
		
		jQuery.globalEval(execute);
		
	},
	
	//REQUEST PROCESSED PAGE NAME
	getMetaTagValue: function(pName) {
		var rv="";
		var mName="";
		$("meta").each(function(){
			mName = $(this).attr('name');
			if(mName == pName) {
				rv = $(this).attr("content");
			}
		});
		
		return rv.replace(/ /g,'');
	},
	
	//REQUEST UNPROCESSED PAGE NAME
	getPageName: function() {
		var rv="";
		var mName="";
		$("meta").each(function(){
			mName = $(this).attr('name');
			if(mName == 'DCSext.wtPN') {
				rv = $(this).attr("content");
			}
		});
		return rv;
	}
}

$(document).ready(function(){
	WebMetrics.init();
});
