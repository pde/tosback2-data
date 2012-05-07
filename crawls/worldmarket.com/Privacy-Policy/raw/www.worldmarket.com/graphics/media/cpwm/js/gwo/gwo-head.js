/* hack to fix homepage CMS 
document.observe('dom:loaded', function(e) {
	$("slide3").update('<a href="http://www.worldmarket.com/category/index.jsp?categoryId=12991345&ab=home:wk15:a:3:img:1:teamtime"><img src="http://www.worldmarket.com/cms_widgets/77/13/771326_assets/a3_2.jpg"></a>');

	$("global_marketing_spot").update('<div style="width:906px; margin:10px auto 0px auto; background:#dd4777; height:36px"> <a href="http://www.worldmarket.com/family/index.jsp?categoryId=11668227&amp;ab=gps:wk15:left:outdoorsale"> <img src="/cms_widgets/77/13/771327_assets/gps-1_2.gif" width="383" height="21" alt="" style="margin:8px 14px 0px 20px; float:left" border="0"/></a> <a href="http://www.worldmarket.com/category/index.jsp?categoryId=12850561&amp;ab=gps:wk15:right:mothersday"> <img src="/cms_widgets/77/13/771327_assets/gps-2_2.gif" width="450" height="22" alt="" style="margin:8px 20px 0px 0px; float:right" border="0"/></a></div>');


});
*/

//// Go through experiments and for the first URL match
//// fire the control tag

var _gaq = _gaq || [];

/*
if (location.search.indexOf('camp=')>-1) {
	_gaq.push(['_setCampMediumKey', 'camp']);
} else if (location.search.indexOf('cid=')>-1) {
	_gaq.push(['_setCampMediumKey', 'cid']);
} else if (location.search.indexOf('slcid=')>-1) {
	_gaq.push(['_setCampMediumKey', 'slcid']);
}
*/

if (location.href.indexOf('/checkout/index.jsp?process=thanks')>-1) {
	_gaq.push(['_setDomainName', '.worldmarket.com'])
}


if (location.href.indexOf('/storeLocator/')>-1) {
	storeLocator.ga_updateMap = storeLocator.updateMap;
	storeLocator.updateMap = function () { 
		s = ($('postalCode').value)?"Zip:"+$('postalCode').value:"Address: "+$('address').value+", City:"+$('city').value+", State:"+$('state').value;
		_gaq.push(['_trackEvent', 'UserAction', 'StoreLocator', s]); storeLocator.ga_updateMap(); }
}

/* redefine ess.submitCart to insert GA event tracking */

if (typeof(ess)=="object" && typeof(ess.submitCart)=="function") {
	ess.real_submitCart = ess.submitCart
	ess.submitCart = function (pForm, prodCount, cartAction, isMiniCartActive) {
		try {
			s="";
			for (i=1; i<=parseInt(prodCount); i++) {
				if(parseInt($('qty_'+(i-1)).value)>0) {
					s+= ((s)?"|":"")
					s+= "PID:"+ $('productId_'+(i-1)).value+" "+$('sku_'+(i-1)).innerHTML.replace(/ #/,":")+" qty:"+parseInt($('qty_'+(i-1)).value);
				}
			}
			_gaq.push(['_trackEvent', 'UserAction', 'AddToCart', s]); 
		} catch(e) {
			console.log(e);
		}
		return this.real_submitCart(pForm, prodCount, cartAction, isMiniCartActive);
	}
}







if ( typeof(cpwm_gwo)=='object' && cpwm_gwo.experiments && cpwm_gwo.experiments.length>0 ) { 

//// IF on checkout confirm - trigger conversion call
if (location.href.indexOf('/checkout/index.jsp?process=thanks')>-1) {
	var _gaq = _gaq || [];
	_gaq.push(['_setDomainName', '.worldmarket.com'])
	for (var i=0; i<cpwm_gwo.experiments.length; i++) {
		if (location.search.indexOf('camp=')>-1) {
			_gaq.push(['gwo'+i+'._setCampMediumKey', 'camp']);
		} else if (location.search.indexOf('cid=')>-1) {
			_gaq.push(['gwo'+i+'._setCampMediumKey', 'cid']);
		} else if (location.search.indexOf('slcid=')>-1) {
			_gaq.push(['gwo'+i+'._setCampMediumKey', 'slcid']);
		}

		_gaq.push(['gwo'+i+'._setAccount', cpwm_gwo.experiments[i].acct]);
		_gaq.push(['gwo'+i+'._setDomainName', cpwm_gwo.experiments[i].dmn]); 
		_gaq.push(['gwo'+i+'._trackPageview', '/'+cpwm_gwo.experiments[i].expid+'/goal']);
	}
	(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	})();
} else {

/// IF NOT on conversion page, take first experiment match and run control script
for (var i=0; i<cpwm_gwo.experiments.length; i++) {
// use first match
	if (location.pathname.indexOf(cpwm_gwo.experiments[i].url)==0 && cpwm_gwo.experiments[i].expid) {

		var _udn = cpwm_gwo.experiments[i].dmn;

		(function(){if(!cpwm_gwo.experiments[i].expid) return; 
		window.currentGWOexperiment = cpwm_gwo.experiments[i].expid;
		var k=cpwm_gwo.experiments[i].expid,d=document,l=d.location,c=d.cookie;function f(n){
		if(c){var i=c.indexOf(n+'=');if(i>-1){var j=c.indexOf(';',i);return escape(c.substring(i+n.
		length+1,j<0?c.length:j))}}}var x=f('__utmx'),xx=f('__utmxx'),h=l.hash;
		d.write('<sc'+'ript src="'+
		'http'+(l.protocol=='https:'?'s://ssl':'://www')+'.google-analytics.com'
		+'/siteopt.js?v=1&utmxkey='+k+'&utmx='+(x?x:'')+'&utmxx='+(xx?xx:'')+'&utmxtime='
		+new Date().valueOf()+(h?'&utmxhash='+escape(h.substr(1)):'')+
		'" type="text/javascript" charset="utf-8"></sc'+'ript>')})();
		break;
	}
}


}



}/* if have cpwm_gwo object and experiments array */