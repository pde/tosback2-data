//GLOBAL JAVASCRIPT INCLUDE FILE FOR ALL SPONSORSHIP SITES


//This is the global popDisclaimer function for ad served elements
var mLinkDest = "", popDisclaimer;
function sendToClientSide(){window.open(mLinkDest);popDisclaimer.window.focus();}
function deliverPopDisclaimer(mLink){
	mLinkDest = mLink;
	popDisclaimer=window.open("","popdisclaimer","toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=370,height=250,top=100,left=150,screenX=180,screenY=100");
	popDisclaimer.document.write ('<html><head><title>Disney.com - Disclaimer</title>');
	popDisclaimer.document.write ('<SCR'+'IPT TYPE="text/javascript" LANGUAGE="JavaScript">');
	popDisclaimer.document.write ('closeTimer = setT'+'imeout("window.close()",18000);');
	popDisclaimer.document.write ('</scr'+'ipt>');
	popDisclaimer.document.write ('</head><body bgcolor="#FFFFFF" text="#0065CE" link="#0065CE" vlink="#0065CE" alink="#0065CE" leftmargin=0 topmargin=0 marginwidth=0 marginheight=0>');
	popDisclaimer.document.write ('<table width="370" height="100%" border="0" cellspacing="0" cellpadding="0"><tr><td><img src="http://disney.go.com/sponsors/images/disclaimer_top.gif" width="370" height="27" alt="" border="0"></td></tr><tr><td><table width="330" border="0" cellspacing="0" cellpadding="0" align="center"><tr><td><br><FONT FACE="Verdana,sans-serif" SIZE="2" COLOR="#0065CE"><b>The web site you are about to link to is not controlled by Disney Online and different terms of use and privacy policy will apply. By proceeding you agree and understand that Disney Online is not responsible for the site you are about to access.<br><br>');
	popDisclaimer.document.write ('If your page does not load within a few seconds, please <a href="'+mLink+'" target="_blank">click here</a> to open it.</b></FONT><br><br></td></tr></table>');
	popDisclaimer.document.write ('</td></tr><tr bgcolor="#0000CC"><td align="center" height="20"><a href="javascript:window.close();"><FONT FACE="Verdana,sans-serif" SIZE="1" COLOR="#FFFF00"><b>Close this window</b></font></a></td></tr></table>');
	popDisclaimer.document.write ('</body></html>');
	popDisclaimer.document.close();
	sendTimer = setTimeout("sendToClientSide()",1500);
}
function deliverPopSpanishDisclaimer(mLink){
	mLinkDest = mLink;
	popDisclaimer=window.open("","popdisclaimer","toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=370,height=250,top=100,left=150,screenX=180,screenY=100");
	popDisclaimer.document.write ('<html><head><title>Disney.com - Descargo de responsabilidad</title>');
	popDisclaimer.document.write ('<SCR'+'IPT TYPE="text/javascript" LANGUAGE="JavaScript">');
	popDisclaimer.document.write ('closeTimer = setT'+'imeout("window.close()",18000);');
	popDisclaimer.document.write ('</scr'+'ipt>');
	popDisclaimer.document.write ('</head><body bgcolor="#FFFFFF" text="#0065CE" link="#0065CE" vlink="#0065CE" alink="#0065CE" leftmargin=0 topmargin=0 marginwidth=0 marginheight=0>');
	popDisclaimer.document.write ('<table width="370" height="100%" border="0" cellspacing="0" cellpadding="0"><tr><td><img src="http://disney.go.com/sponsors/images/disclaimer_top.gif" width="370" height="27" alt="" border="0"></td></tr><tr><td><table width="330" border="0" cellspacing="0" cellpadding="0" align="center"><tr><td><br><FONT FACE="Verdana,sans-serif" SIZE="2" COLOR="#0065CE"><b>El sitio web que vas a visitar no está controlado por Disney Online, por lo que en él aplican distintos términos de uso y políticas de privacidad. Al proceder, aceptas y entiendes que Disney Online no es responsable del sitio que estás por visitar.<br><br>');
	popDisclaimer.document.write ('Si la página no carga luego de unos segundos, haz <a href="'+mLink+'" target="_blank">click aquí</a> para visitarla.</b></FONT><br><br></td></tr></table>');
	popDisclaimer.document.write ('</td></tr><tr bgcolor="#0000CC"><td align="center" height="20"><a href="javascript:window.close();"><FONT FACE="Verdana,sans-serif" SIZE="1" COLOR="#FFFF00"><b>Cerrar esta ventana</b></font></a></td></tr></table>');
	popDisclaimer.document.write ('</body></html>');
	popDisclaimer.document.close();
	sendTimer = setTimeout("sendToClientSide()",1500);
}
function deliverDisclaimer(mLink){
	mLinkDest = mLink;
	brDisclaimer=window.open("","brdisclaimer");
	brDisclaimer.document.write ('<html><head><title>Disney.com - Disclaimer</title>');
	brDisclaimer.document.write ('<SCR'+'IPT TYPE="text/javascript" LANGUAGE="JavaScript">');
	brDisclaimer.document.write ('fun'+'ction sendToClientSide(){location.replace("'+mLink+'");}');
	brDisclaimer.document.write ('timer = setT'+'imeout("sendToClientSide()",10000);');
	brDisclaimer.document.write ('</scr'+'ipt>');
	brDisclaimer.document.write ('</head><body bgcolor="#FFFFFF" text="#0065CE" link="#0065CE" vlink="#0065CE" alink="#0065CE" leftmargin=0 topmargin=0 marginwidth=0 marginheight=0>');
	brDisclaimer.document.write ('<table width="370" border="0" cellspacing="0" cellpadding="0"><tr><td><img src="http://disney.go.com/sponsors/images/disclaimer_top.gif" width="370" height="27" alt="" border="0"></td></tr><tr><td><table width="330" border="0" cellspacing="0" cellpadding="0" align="center"><tr><td><br><FONT FACE="Verdana,sans-serif" SIZE="2" COLOR="#0065CE"><b>The web site you are about to link to is not controlled by Disney Online and different terms of use and privacy policy will apply. By proceeding you agree and understand that Disney Online is not responsible for the site you are about to access.<br><br>');
	brDisclaimer.document.write ('If your page does not load within a few seconds, please <a href="'+mLink+'" target="_blank">click here</a> to open it.</b></FONT><br><br></td></tr></table>');
	brDisclaimer.document.write ('</td></tr><tr bgcolor="#0000CC"><td align="center" height="20"><a href="javascript:window.close();"><FONT FACE="Verdana,sans-serif" SIZE="1" COLOR="#FFFF00"><b>Close this window</b></font></a></td></tr></table>');
	brDisclaimer.document.write ('</body></html>');
	brDisclaimer.document.close();
}