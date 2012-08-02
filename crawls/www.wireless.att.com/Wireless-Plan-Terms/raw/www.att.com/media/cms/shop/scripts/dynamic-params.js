var dynamicParams = {
	xparams : {
		supern : [],
		drock : [],
		urock : [],
		sbc : []
	},
	offsites : ['supern','drock','urock','sbc'],
	patterns : {
		supern : ["/gen/general","/swot/ldCatalog.do","/apps/supern", "app=supern"],
		drock : ["/dsl", "app=drock"],
		urock : ["/u-verse/channel-lineup","/u-verse/shop/","app=urock"],
		sbc : ["/loc/controller","/swot/qualifyingController.do"]
	},
	xcall : function xcall(href,site) {
		if (site == null) {
			for (site in dynamicParams.offsites) {
				for (idx in dynamicParams.patterns[dynamicParams.offsites[site]]) {
					if (href.indexOf(dynamicParams.patterns[dynamicParams.offsites[site]][idx]) >= 0)  {
						siteName = dynamicParams.offsites[site];
					}
				}
			}
		} else {
			siteName = (dynamicParams.offsites[site]) ? dynamicParams.offsites[site] : site;
		}
		h = href.split('#');
		newHref = h[0];
		seperator = (newHref.match(/\?/)) ? "&" : "?";
		
		/*
		for (qparam in dynamicParams.xparams[siteName]) { 
				newHref += seperator + qparam + '=' + dynamicParams.xparams[siteName][qparam]; seperator = "&";				
		}
		*/
		
		for (qparam in dynamicParams.xparams[siteName])  { 
				if (typeof dynamicParams.xparams[siteName][qparam] != 'function' &&  typeof dynamicParams.xparams[siteName][qparam] != 'object') 
				{ 
					newHref += seperator + qparam + '=' + dynamicParams.xparams[siteName][qparam];
					seperator = "&"; 
				} 
			}	
		
		if (h[1]) newHref += "#"+h[1];
		window.location.assign(newHref);
		return false;
	},
	xwrap : function xwrap(e) {
		tgt = e.currentTarget;
		if (tgt.href) {
			for (site in dynamicParams.offsites) {
				for (idx in dynamicParams.patterns[dynamicParams.offsites[site]]) {
					if (tgt.href.indexOf(dynamicParams.patterns[dynamicParams.offsites[site]][idx]) >= 0)  {
						dynamicParams.xcall(tgt.href,site);
						return false;
					}
				}
			}
		} 
		return true;
	},
	set : function set(site,key,value) {
		dynamicParams.xparams[site][key] = value;
	}
}
jQuery(document).ready(function() {
	jQuery(document).delegate('a','click',dynamicParams.xwrap);
});