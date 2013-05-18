MpElDs = {
    "es.journeys.com":"es",
	"www.journeys.com":"en",
    "journeys.com":"en"
};
if (!RegExp("MP_LANG=" + MpElDs[location.host]).test(document.cookie)) {
    MpElD = "//es.journeys.com";
    MpL = navigator.browserLanguage;
    if (!MpL) MpL = navigator.language;
    document.write(decodeURIComponent("%3Cscript src='") + MpElD + "/mpel.js?href=" + encodeURIComponent(location.href) + "&ref=" + encodeURIComponent(document.referrer) + "&lang=" + MpL + "' type='text/javascript'" + decodeURIComponent("%3E%3C/script%3E"))
};