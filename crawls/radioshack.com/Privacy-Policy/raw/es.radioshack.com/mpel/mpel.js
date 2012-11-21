MpElDs = {
    "m-es.radioshack.com":"es",
	"es.radioshack.com":"es",
	"radioshack.com":"en",
	"www.radioshack.com":"en",
	"m.radioshack.com":"en",
	"rsk-uat01.uat.gsipartners.com":"en",
	"rsk.tst01.gspt.net":"en"
};
if (!RegExp("MP_LANG=" + MpElDs[location.host]).test(document.cookie)) {
    MpElD = "//es.radioshack.com";
    MpL = navigator.browserLanguage;
    if (!MpL) MpL = navigator.language;
    document.write(decodeURIComponent("%3Cscript src='") + MpElD + "/mpel.js?href=" + encodeURIComponent(location.href) + "&ref=" + encodeURIComponent(document.referrer) + "&lang=" + MpL + "' type='text/javascript'" + decodeURIComponent("%3E%3C/script%3E"))
};