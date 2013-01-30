var dynamicParams = {
	xparams : {
		supern : [],
		drock : [],
		urock : [],
		sbc : [],
		ras : []
	},
	offsites : ['supern','drock','urock','sbc', 'ras'],
	patterns : {
		supern : ["/gen/general","/swot/ldCatalog.do","/apps/supern", "app=supern"],
		drock : ["/dsl", "app=drock"],
		urock : ["/u-verse/channel-lineup","/u-verse/shop/","app=urock"],
		sbc : ["/loc/controller","/swot/qualifyingController.do"],
		ras : ["/storeappointment","qras.test.att.com","app=qras"]
	},
	xcall : function xcall(href,site,winTgt) {
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
		
		for (qparam in dynamicParams.xparams[siteName])  { 
				if (typeof dynamicParams.xparams[siteName][qparam] != 'function' &&  typeof dynamicParams.xparams[siteName][qparam] != 'object') 
				{ 
					newHref += seperator + qparam + '=' + dynamicParams.xparams[siteName][qparam];
					seperator = "&"; 
				} 
			}	
		if (siteName == 'ras') winTgt = '_blank';
		if (h[1]) newHref += "#"+h[1];
		if (!!winTgt && winTgt != '') {
			window.open(newHref,winTgt);
		} else {
			window.location.assign(newHref);
		}
		return false;
	},
	xwrap : function xwrap(e) {
		tgt = e.currentTarget;
		if (tgt.href) {
			for (site in dynamicParams.offsites) {
				for (idx in dynamicParams.patterns[dynamicParams.offsites[site]]) {
					if (tgt.href.indexOf(dynamicParams.patterns[dynamicParams.offsites[site]][idx]) >= 0)  {
						winTgt = '';
						if (!!tgt.target && tgt.target != '') winTgt = tgt.target;
						dynamicParams.xcall(tgt.href,site,winTgt);
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
function setDynamicParams(profileData) {

	testProfile(profileData);

	var json = jQuery.parseJSON(profileData);
	var allCookies = document.cookie.split(';');
	var addressId = json.addressId;
	var addressCookieValue='';
	var addressCookieName=" CAAddressId=";
	for(var i=0;i < allCookies.length;i++) {
		var cookie = allCookies[i];
		if(cookie.indexOf(addressCookieName) == 0 && cookie.indexOf('|')  != -1 ) {
			addressCookieValue=cookie.substring(addressCookieName.length+'address_id='.length, cookie.indexOf('|'));
		}
		
	}

	if (typeof addressId == "undefined") {
		addressId = addressCookieValue;
	} 
	if (json.homePhoneNumber) {
	dynamicParams.set('drock','work_phone_num', json.homePhoneNumber); 
	}	else { 
	dynamicParams.set('supern','address_id', addressId);
	} 
	dynamicParams.set('drock','address_id', addressId); 
	dynamicParams.set('urock','address_id', addressId);
	dynamicParams.set('sbc','address_id', addressId);
	dynamicParams.set('urock','ref_from', "shop");
	if (!! json.uZip) dynamicParams.set('urock','zip', json.uZip);
	if (!! json.RASzipCode) dynamicParams.set('ras','zipcode', json.RASzipCode);
	if (!! json.RASname) dynamicParams.set('ras','name', json.RASname);
	if (!! json.RASemail) dynamicParams.set('ras','email', json.RASemail);
	if (!! json.RASCTN) dynamicParams.set('ras','ctn', json.RASCTN);
	dynamicParams.set('ras','appid', 'MKTG');
	dynamicParams.set('ras','page', window.location.pathname);
} 

function getATGProfile() {
	jQuery.ajax({ url: window.location.pathname.replace('.html','/_jcr_content.atgprofile.xhr.json'), cache: false, dataType: 'text', success: function(data){
		setDynamicParams(data);
	}});
}

jQuery(document).ready(function () {
	jQuery(document).delegate('a','click',dynamicParams.xwrap);
	if (typeof atgProfileDataReady == 'undefined') {
		getATGProfile();
	} else {
		jQuery.when(atgProfileDataReady)
		.done(function(data) { setDynamicParams(data); })
		.fail(function() { getATGProfile(); });
	}
});