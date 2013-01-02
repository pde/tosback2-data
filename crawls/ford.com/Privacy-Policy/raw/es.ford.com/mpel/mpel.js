MpElDs={'es.ford.com':'es','www.ford.com':'en','www.warriorsinpink.ford.com':'en','warriorsinpink.ford.com':'en','www.support.ford.com':'en','support.ford.com':'en'};
if(!new RegExp('MP_LANG='+MpElDs[location.host]).test(document.cookie)){
    MpElD='//es.ford.com';
	MpL=navigator.browserLanguage;
	if(!MpL)MpL=navigator.language;
    document.write(unescape("%3Cscript src='"+MpElD+"/mpel.js?href="+escape(location.href)+"&ref="+escape(document.referrer)+"&lang="+MpL+"' type='text/javascript'%3E%3C/script%3E"));
}