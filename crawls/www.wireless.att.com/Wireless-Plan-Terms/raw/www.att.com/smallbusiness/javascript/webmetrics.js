
WebMetrics = {
	DCS: {
		dcsuri: window.location.pathname,
		dcsref: document.referrer
	},
	
	DCSext: {
		
	},
	
	init: function() {
		$('a').each(function(){
			var href = $(this).attr('href');
			var wtPN = WebMetrics.getMetaTagValue('DCSext.wtPN');
			if(href!=undefined)
			if(href.indexOf("wtPN") != -1 && wtPN != ""){
				wtPN =escape(wtPN);
				$(this).attr('href', href.replace(/wtPN/g,wtPN));
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
		
		var timeoutInterval = setTimeout(function() {
			jQuery.globalEval(execute);
			clearTimeout(timeoutInterval)
		},500);
		
	},
	
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
