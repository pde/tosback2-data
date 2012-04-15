//window.focus = window.setTimeout("performDomainSubsitution()",1000);
function performDomainSubsitution() {
	var ndomain = document.domain;
	var mydomain = 'www.fedex.com';
	var reg = new RegExp("gtm", "g");
	var excflag = reg.exec(ndomain);
	var alink = document.getElementsByTagName('a');
	var nlink = document.getElementsByTagName('area');
	var devck = new RegExp("unit|base|dev|drt|stress|beta|test","g");
	var devflag = devck.exec(ndomain);
	
	for (var i = 0; i < alink.length; i++) {
		if (alink[i].href.length > 0){
			if ((alink[i].host.substr(0, mydomain.length) == mydomain)&&(!excflag)&&(devflag)){
				alink[i].host = ndomain;
                                var re = new RegExp("www.fedex.com","g");
                                var linkSrc = alink[i].href;
                                linkSrc = linkSrc.replace(re,ndomain);
                                alink[i].href = linkSrc;
			}
		}
	}
	for (var j = 0; j < nlink.length; j++){
		if (nlink[j].href.length > 0){
			if ((nlink[j].host.substr(0, mydomain.length) == mydomain)&&(!excflag)&&(devflag)){
				nlink[j].host = ndomain;
			}
		}
	}
	
	var mydomain2 = 'www.fedexfreight.fedex.com';
	var redirdomain = 'qax.freight.fedex.com';
	var livedomain = 'wwwdrt.idev.fedex.com';
	
	if ((ndomain == livedomain)||(ndomain == "wwwbase.idev.fedex.com")){
		for (var i = 0; i < alink.length; i++) {
			if (alink[i].href.length > 0){
				if ((alink[i].host.substr(0, mydomain2.length) == mydomain2)){
					alink[i].host = redirdomain;
				}
			}
		}
		for (var j = 0; j < nlink.length; j++){
			if (nlink[j].href.length > 0){
				if ((nlink[j].host.substr(0, mydomain2.length) == mydomain2)){
					nlink[j].host = redirdomain;
				}
			}
		}
	}

}

