function activateObject(ObjIdi, ClsIdi, CodeBasei, Wdthi, Hti, MovieSrci, Flashi, Qualityi, BgColi, Aligni, WModei)
{
	if (ObjIdi != "") {
		document.write('<OBJECT ID=' + ObjIdi + ' classid=' + ClsIdi);
	}
	else {
		document.write('<OBJECT classid=' + ClsIdi);
	}
		document.write(' CODEBASE=' + CodeBasei);
	if (Aligni != "") {
		document.write(' WIDTH='+ Wdthi + ' HEIGHT=' + Hti + ' ALIGN=' + Aligni +'>');
	}
	else {
		document.write(' WIDTH='+ Wdthi + ' HEIGHT=' + Hti + '>');
	}
		document.write('<PARAM NAME=movie VALUE=' + MovieSrci + '>');
	if (Flashi != "") {
		document.write('<PARAM NAME=FlashVars VALUE=' + Flashi + '>');
	}
	if (WModei == "true") {
		document.write('<PARAM NAME=wmode VALUE=transparent>');
	}
	document.write('<PARAM NAME=quality VALUE=' + Qualityi + '>');
	document.write('<PARAM NAME=menu VALUE="false">');
	document.write('<PARAM NAME=bgcolor VALUE=' + BgColi + '>');
	document.write('<PARAM NAME=autoStart VALUE="-1">');
	document.write('<PARAM NAME=base VALUE=".">');
	document.write('<EMBED SRC=' + MovieSrci + ' QUALITY=' + Qualityi);
	if (WModei == "true") {
		document.write('WMODE=transparent');
	}
	document.write('  BGCOLOR=' + BgColi + ' BASE="." WIDTH=' + Wdthi + ' HEIGHT=' + Hti + ' MENU="false"');
	if (ObjIdi != "") {
		document.write(' NAME=' + ObjIdi);
	}
	if (Aligni != "") {
		document.write(' ALIGN=' + Aligni);
	}
	if (Flashi != "") {
		document.write('FLASHVARS=' + Flashi);
	}
	document.write('TYPE="application/x-shockwave-flash"');
	document.write('PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer">');
	//document.write('<PARAM NAME="autoStart" VALUE="-1"></object>');
	document.write('</EMBED>');
	document.write('</OBJECT>');
}

