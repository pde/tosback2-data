MpElDs = {
    "corporativo.walmart.com":"es",
	"noticias.walmart.com":"es",
    "fundacion.walmart.com":"es",
	"accionistas.walmart.com":"es",
    "corporate.walmart.com":"en",
	"news.walmart.com":"en",
    "foundation.walmart.com":"en",
	"stock.walmart.com":"en"
	
};
if (!RegExp("MP_LANG=" + MpElDs[location.host]).test(document.cookie)) {
	
	if (location.host.toString().indexOf('corporate.walmart.com') != -1 || location.host.toString().indexOf('corporativo.walmart.com') != -1) {
       MpElD = "//corporativo.walmart.com";
    }
		if (location.host.toString().indexOf('news.walmart.com') != -1 || location.host.toString().indexOf('noticias.walmart.com') != -1) {
       MpElD = "//noticias.walmart.com";
    } 
		if (location.host.toString().indexOf('stock.walmart.com') != -1 || location.host.toString().indexOf('accionistas.walmart.com') != -1) {
       MpElD = "//accionistas.walmart.com";
    } 
		if (location.host.toString().indexOf('foundation.walmart.com') != -1 || location.host.toString().indexOf('fundacion.walmart.com') != -1) {
       MpElD = "//fundacion.walmart.com";
    } 

    MpL = navigator.browserLanguage;
    if (!MpL) MpL = navigator.language;
    document.write(decodeURIComponent("%3Cscript src='") + MpElD + "/mpel.js?href=" + encodeURIComponent(location.href) + "&ref=" + encodeURIComponent(document.referrer) + "&lang=" + MpL + "' type='text/javascript'" + decodeURIComponent("%3E%3C/script%3E"))
};