(function()
{
var undef="undefined";

if (typeof(sr_adserver)==undef)
	sr_adserver=(location.protocol.indexOf('https')>-1 ? "https://" : "http://")+"beacon.afy11.net/ad?";

srValidateBeacon();
srSendBeacon();


function srValidateBeacon()
{
	// sraction.js
	if (typeof(sr_actioncode)==undef)
		sr_actioncode  = 0;
	if (typeof(sr_actionvalue)==undef)
		sr_actionvalue  = 0;
		
	sr_actioncode=parseInt(sr_actioncode);
	sr_actionvalue=parseInt(sr_actionvalue);
	
	if (sr_actionvalue+""=="NaN")
		sr_actioncode=0;
	if (sr_actionvalue+""=="NaN")
		sr_actioncode=0;
	
}

function srSendBeacon()
{
	var _encodeURIComponent = (typeof(encodeURIComponent)==undef ? encodeURIComponent2 : encodeURIComponent);
	var randomNumber = Math.round(Math.random() * 100000000);
	var source = sr_adserver +
		'&mode=4'+
		'&ac='+sr_actioncode+
		'&av='+sr_actionvalue+
		'&enc=1'+
		'&rand='+randomNumber;
		if (typeof(sr_actions)!=undef)
			source+='&kd='+_encodeURIComponent(sr_actions);
//		document.write('<img src="'+source+'" height="0" width="0" >');
		document.write('<scr'+'ipt src="'+source+'"></scr'+'ipt>');
}

})()
