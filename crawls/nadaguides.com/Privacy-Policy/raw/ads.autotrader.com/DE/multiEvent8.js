function multi8(swf,fbclickurl,fbimg,width,height,target1,clicktag,flashclickurl,flashclickurl2,flashclickurl3,clicktag2,clicktag3,flashclickurl4,clicktag4,sMode) {
	var swf_click = flashclickurl;
	var dcswf_click = escape(swf_click);
	var swf_click2 = flashclickurl2;
	var dcswf_click2 = escape(swf_click2);
	var swf_click3 = flashclickurl3;
	var dcswf_click3 = escape(swf_click3);
	if(clicktag4) {
		var swf_click4 = flashclickurl4;
		var dcswf_click4 = escape(swf_click4);
	}
	var plugin = (navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"]) ? navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin : 0;
	
	if (plugin && parseInt(plugin.description.substring(plugin.description.indexOf(".")-2)) >= 8)
	{
		ShockMode = 1;
	} 
	else if (navigator.userAgent && navigator.userAgent.indexOf("MSIE")>=0 && (navigator.userAgent.indexOf("Windows 95")>=0 || navigator.userAgent.indexOf("Windows 98")>=0 || navigator.userAgent.indexOf("Windows NT")>=0)) {
		if(clicktag4) {
			ShockMode=sMode;
		} else {
			ShockMode=flashclickurl4;
		}
	}
	if ( ShockMode ) {
		document.write('<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"');
		document.write(' codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0"');
		document.write(' ID=flashad WIDTH='+width+' HEIGHT='+height+'>');
		document.write(' <PARAM NAME=movie VALUE="'+swf+'"> ');
		if(clicktag4) {
			document.write(' <PARAM NAME=FlashVars VALUE="'+clicktag+'='+dcswf_click+'&'+clicktag2+'='+dcswf_click2+'&'+clicktag3+'='+dcswf_click3+'&'+clicktag4+'='+dcswf_click4+'">')
		} else {
			document.write(' <PARAM NAME=FlashVars VALUE="'+clicktag+'='+dcswf_click+'&'+clicktag2+'='+dcswf_click2+'&'+clicktag3+'='+dcswf_click3+'">')
		}
		document.write(' <PARAM NAME=allowScriptAccess VALUE=always> ');
		document.write(' <PARAM NAME=quality VALUE=autohigh> ');
		document.write(' <PARAM NAME=wmode VALUE=opaque> ');
		document.write(' <EMBED SRC="'+swf+'" QUALITY=autohigh allowScriptAccess=always wmode=opaque');
		if(clicktag4) {
			document.write(' FlashVars="'+clicktag+'='+dcswf_click+'&'+clicktag2+'='+dcswf_click2+'&'+clicktag3+'='+dcswf_click3+'&'+clicktag4+'='+dcswf_click4+'"');
		} else {
			document.write(' FlashVars="'+clicktag+'='+dcswf_click+'&'+clicktag2+'='+dcswf_click2+'&'+clicktag3+'='+dcswf_click3+'"');
		}
		document.write(' NAME=flashad swLiveConnect=TRUE WIDTH='+width+' HEIGHT='+height+'');
		document.write(' TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash">');
		document.write('</EMBED>');
		document.write('</OBJECT>');
	} else if (!(navigator.appName && navigator.appName.indexOf("Netscape")>=0 && navigator.appVersion.indexOf("2.")>=0)){
		document.write('<A HREF='+fbclickurl+' target=target1><IMG SRC='+fbimg+' WIDTH='+width+' HEIGHT='+height+' BORDER=0></A>');
	}		
}
