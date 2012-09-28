MpElDs={'espanol.cabelas.com':'es','www.cabelas.com':'en','cabelas.custhelp.com':'en','m.cabelas.com':'en','www.prv.cabelas.com':'en','prv.cabelas.com':'en'};
if(!new RegExp('MP_LANG='+MpElDs[location.host]).test(document.cookie)){
    MpElD='//espanol.cabelas.com';
	MpL=navigator.browserLanguage;
	if(!MpL)MpL=navigator.language;
    document.write(unescape("%3Cscript src='"+MpElD+"/mpel.js?href="+escape(location.href)+"&ref="+escape(document.referrer)+"&lang="+MpL+"' type='text/javascript'%3E%3C/script%3E"));
}