sas_tmstp=Math.round(Math.random()*10000000000);sas_masterflag=1;
sas_skyexcluded = 0;

function SmartAdServer(sas_pageid,sas_formatid,sas_target) {
	if (SmartAdServer.efid && SmartAdServer.efid.indexOf('#'+ sas_formatid +'#')>=0) return;
	if (sas_masterflag==1) {sas_masterflag=0;sas_master='M';} else {sas_master='S';};
	document.write('<scr'+'ipt src="http://ww251.smartadserver.com/call/pubj/' + sas_pageid + '/' + sas_formatid + '/' + sas_master + '/' + sas_tmstp + '/' + escape(sas_target) + '?"></scr'+'ipt>');
	
	if (sas_skyexcluded == 0 && SmartAdServer.efid && SmartAdServer.efid.indexOf('#3650#')>=0) {
		sas_skyexcluded = 1;
		var img = new Image();
		img.src='http://ww251.smartadserver.com/track/excludeformat.asp?3650;' + sas_tmstp;
	}
}

function SmartAdServer_iframe(sas_pageid,sas_formatid,sas_target,sas_w,sas_h) {
    if (sas_masterflag==1) {sas_masterflag=0;sas_master='M';} else {sas_master='S';};
    document.write('<iframe src="http://ww251.smartadserver.com/call/pubif/' + sas_pageid + '/' + sas_formatid + '/'+sas_master + '/' + sas_tmstp + '/' + escape(sas_target) + '?" width=' + sas_w + ' height=' + sas_h + ' marginwidth=0 marginheight=0 hspace=0 vspace=0 frameborder=0 scrolling=no>');
    document.write('</iframe>');
}

