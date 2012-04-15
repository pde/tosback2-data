var url = new String(location.href);
var tl=new String("");
var translated=false;
if (url.indexOf("translate") >= 0) {
	translated=true;
	var url = window.location.toString();
	url.match(/\?(.+)$/); 
	var params = RegExp.$1; 
	var params = params.split("&"); 
	for(var i=0;i<params.length;i++) {
		var tmp = params[i].split("="); 
		if(tmp[0]=="u") url=unescape(tmp[1]);
		if(tmp[0]=="tl") tl=unescape(tmp[1]);
	}  
	window.setTimeout("sl.value='"+tl+"'", 200);
}

function translatePage(ddl) {
	
	if (ddl.options[ddl.options.selectedIndex].value != '') {
		if (ddl.options[ddl.options.selectedIndex].value == 'en') {
			var re=/[?&]definitions=no/g;
			url=url.replace(re,"");
			window.parent.location=url;
		} else {
			url=url+(url.match("[?]")?"&":"?")+"definitions=no";
			window.location = 'http://translate.google.com/translate?u=' + escape(url) + '&hl=en&ie=UTF-8&sl=en&tl=' + ddl.options[ddl.options.selectedIndex].value;
		}
	}
}
	document.write ('<style>#googleTranslate { float:right; } #googleTranslate select { font-size: 12px;  width: 140px; }</style>');
	document.write ('<div id="googleTranslate"><select name="sl" onchange="translatePage(this)"><option value="">- Select Language -</option><option  value="ar">Arabic</option><option  value="bg">Bulgarian</option><option  value="ca">Catalan</option><option  value="zh-CN">Chinese (Simplified)</option><option  value="zh-TW">Chinese (Traditional)</option><option  value="hr">Croatian</option><option  value="cs">Czech</option><option  value="da">Danish</option><option  value="nl">Dutch</option>'+(translated?'<option value="en">English</option>':'')+'<option  value="tl">Filipino</option><option  value="fi">Finnish</option><option  value="fr">French</option><option  value="de">German</option><option  value="el">Greek</option><option  value="iw">Hebrew</option><option  value="hi">Hindi</option><option  value="id">Indonesian</option><option  value="it">Italian</option><option  value="ja">Japanese</option><option  value="ko">Korean</option><option  value="lv">Latvian</option><option  value="lt">Lithuanian</option><option  value="no">Norwegian</option><option  value="pl">Polish</option><option  value="pt">Portuguese</option><option  value="ro">Romanian</option><option  value="ru">Russian</option><option  value="sr">Serbian</option><option  value="sk">Slovak</option><option  value="sl">Slovenian</option><option  value="es">Spanish</option><option  value="sv">Swedish</option><option  value="uk">Ukrainian</option><option  value="vi">Vietnamese</option></select></div>');