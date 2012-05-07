
/*cookie logic for iPad interstitial promo*/
if(navigator.userAgent.indexOf('iPad') != -1 ){
    if( Cookie.getCookie("mob_promo")){
    var vidCook= Cookie.getCookie("mob_promo");
    tokens = vidCook.split("-");
    var pgv = tokens[1];
    var cookDays='';    
		if(pgv < 3){
			if(Cookie.getCookie("mob_sess")==null){
				pgv = ++tokens[1];
				var date = new Date();
				date.setTime(date.getTime() + (30 * 60 * 1000));
				var domain= ".reference.com"
				if (window.location.host.indexOf('thesaurus')!=-1){
					domain=".thesaurus.com";
				}
				Cookie.setCookie("mob_sess", 1, date, "/", domain);
			}
			cookieData = tokens[0] + "-"+pgv;
			if(tokens[0]=='1'){cookDays=1;}
			var exp = new Date();
			exp.setFullYear(exp.getFullYear()+cookDays);
			exp.setMonth(exp.getMonth());
			exp.setDate(exp.getDate()+30);
			exp.setHours(0);
			exp.setMinutes(0);
			<!--expiry date session-->
			var domain= ".reference.com"
			if (window.location.host.indexOf('thesaurus')!=-1){
				domain=".thesaurus.com";
			}
			Cookie.setCookie("mob_promo", cookieData, exp, "/", domain);
		}
	}
}