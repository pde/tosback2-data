function setCookie(c_name,value,exdays) {
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name) {
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++) {
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		if (x==c_name) {
			return unescape(y);
		}
	}
}

function closeapppop(src) {
	$('#mobilebanner').hide();
	setCookie(src,false,7);
	pageTracker._trackEvent(src,'Close','Customer Contine to Website',1);	
}

function visitMobile(src) {
	pageTracker._trackEvent(src,'VisitMobile','Customer Click Visit Mobile Link',1);			
	window.open("http://m.cheapoair.com/flights");
}

function downloadApp(src) {
	if (src=='iPhone') {
		pageTracker._trackEvent(src,'Download','Customer Click Download',1);	
		location.href="http://itunes.apple.com/us/app/cheapoair-flight-search/id436858222?mt=8&ls=1";
	}
	else if (src=='Android') {  
		pageTracker._trackEvent(src,'Download','Customer Click Download',1);
		location.href="market://details?id=com.fp.cheapoair";
	}
	else if (src=='IEMobile') {  
		pageTracker._trackEvent(src,'Download','Customer Click Download',1);
		location.href="zune://navigate/?appID=fef6dcfb-7b44-48c6-bb8a-bd9f23aeabab";
	}
	
	
}

$(document).ready(function() {
var reswidth = $(document).width()
var resheight = $(document).height()
$('#mobilebanner').css('width',reswidth);
$('#mobilebanner').css('height',resheight);

	if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
		var iphone=getCookie("iPhone");
		if (iphone==null || iphone=="") {
			var iPhoneHtml = '<div style="position:absolute; width:100%; height:100%; font-family: Arial, Helvetica, sans-serif; text-align:center; font-size:1.2em; overflow:hidden;">';
			iPhoneHtml += '<div style="font-size:5em; color:#076ba7; display:inline; font-weight:bold;">CheapOair<br />Mobile</div><br />';
			iPhoneHtml += '<div style="margin-left:auto; margin-right:auto; margin-top:5px; margin-bottom:15px; height:10px; width:600px; background-color:#076ba7;">&nbsp;</div>';
			iPhoneHtml += '<div style="font-size:2.5em; display:inline; font-weight:bold;">Download Our App For Free</div><br />';
			iPhoneHtml += '<a href="javascript:downloadApp(\'iPhone\');" style="border:none;"><div style="margin-left:auto; margin-right:auto; margin-top:20px; margin-bottom:70px; height:262px; width:800px;"><img src="http://www.cheapoair.com/travel/images/iphonez.png" width="800px" height="262px" alt="" /></div></a>';
			iPhoneHtml += '<br />';
			iPhoneHtml += '<a href="javascript:visitMobile(\'iPhone\');" style="margin-bottom:5em; font-weight:bold; font-size:3.2em;">Visit Our Mobile Site &raquo;</a><br />';
			iPhoneHtml += '<br/>';
			iPhoneHtml += '<br/>';
			iPhoneHtml += '<br/>';
			iPhoneHtml += '<a href="javascript:closeapppop(\'iPhone\');" style="font-weight:bold; font-size:3.2em;">Continue to the main site &raquo;</a>';
			iPhoneHtml += '<br/>';
			iPhoneHtml += '</div>';			
			
			$('#mobilebanner').html(iPhoneHtml);
			$('#mobilebanner').show();
			pageTracker._trackEvent('iPhone','ShowPopup','Popup Open to Customer',1);
		}
	}
	else if((navigator.userAgent.match(/Android/))) {
		var android=getCookie("Android");
		if (android==null || android=="") {
			var androidHtml = '<div style="position:absolute; width:100%; height:100%; font-family: Arial, Helvetica, sans-serif; text-align:center; font-size:1.2em; overflow:hidden;">';
			androidHtml += '<div style="font-size:4em; color:#076ba7; line-height:1.1em; display:inline; font-weight:bold;">CheapOair Mobile</div><br />';
			androidHtml += '<div style="margin-left:auto; margin-right:auto; margin-top:5px; height:10px; width:600px; background-color:#076ba7;">&nbsp;</div>';
			androidHtml += '<br />';
			androidHtml += '<a href="javascript:visitMobile(\'Android\');" style="font-weight:bold; font-size:1.2em;">Visit Our Mobile Site &raquo;</a><br />';
			androidHtml += '<br/>';
			androidHtml += '<a href="javascript:closeapppop(\'Android\');" style="font-weight:bold; font-size:1.2em;">Continue to the main site &raquo;</a>';
			androidHtml += '<div style="margin-left:auto; margin-right:auto; margin-top:20px; height:262px; width:800px;"><a href="javascript:downloadApp(\'Android\');"><img src="http://www.cheapoair.com/travel/images/Android.gif" width="800px" height="262px" border="0" alt="" /></a></div><div style="font-size:1.2em; font-weight:bold;">Download Our App For Free</div>';
			androidHtml += '</div>';	
			
			$('#mobilebanner').html(androidHtml);
			$('#mobilebanner').show(); 
			pageTracker._trackEvent('Android','ShowPopup','Popup Open to Customer',1);	
		}
	}
	else if((navigator.userAgent.match(/IEMobile/))) {
		var IEMobile=getCookie("IEMobile");
		if (IEMobile==null || IEMobile=="") {
			var IEMobileHtml = '<div style="width:100%; height:100%; font-family: Arial, Helvetica, sans-serif; text-align:center; font-size:1.2em; overflow:hidden;">';
			IEMobileHtml += '<div style="font-size:5em; color:#076ba7; display:inline; font-weight:bold;">CheapOair<br />Mobile</div><br />';
			IEMobileHtml += '<div style="margin-left:auto; margin-right:auto; margin-top:5px; margin-bottom:15px; height:10px; width:600px; background-color:#076ba7;">&nbsp;</div>';
			IEMobileHtml += '<div style="font-size:2.5em; display:inline; font-weight:bold;">Download Our App For Free</div><br />';
			IEMobileHtml += '<div style="margin-left:auto; margin-right:auto; margin-top:20px; margin-bottom:70px; height:262px; width:800px;"><a href="javascript:downloadApp(\'IEMobile\');"><img src="http://www.cheapoair.com/travel/images/IEMobile.png" width="800px" height="262px" border="0" alt="" /></a></div>';
			IEMobileHtml += '<br />';
			IEMobileHtml += '<a href="javascript:visitMobile(\'IEMobile\');" style="margin-bottom:5em; font-weight:bold; font-size:3.2em;">Visit Our Mobile Site &raquo;</a><br />';
			IEMobileHtml += '<br/>';
			IEMobileHtml += '<br/>';
			IEMobileHtml += '<br/>';
			IEMobileHtml += '<a href="javascript:closeapppop(\'IEMobile\');" style="font-weight:bold; font-size:3.2em;">Continue to the main site &raquo;</a>';
			IEMobileHtml += '<br/>';
			IEMobileHtml += '</div>';			
			
			$('#mobilebanner').html(IEMobileHtml);
			$('#mobilebanner').show();
			pageTracker._trackEvent('IEMobile','ShowPopup','Popup Open to Customer',1);
		}
	}
	else if((navigator.userAgent.match(/SymbianOS/))  || (navigator.userAgent.match(/BlackBerry/)) || (navigator.userAgent.match(/Nokia/)) || (navigator.userAgent.match(/webOS/)) || (navigator.userAgent.match(/MeeGo/)) || (navigator.userAgent.match(/Dolfin/))) {
		var Mobileweb=getCookie("Mobileweb");
		if (Mobileweb==null || Mobileweb=="") {
			var MobilewebHtml = '<div style="width:100%; height:100%; font-family: Arial, Helvetica, sans-serif; text-align:center; font-size:1.2em; overflow:hidden;">';
			MobilewebHtml += '<div style="font-size:5em; color:#076ba7; display:inline; font-weight:bold;">CheapOair<br />Mobile</div><br />';
			MobilewebHtml += '<div style="margin-left:auto; margin-right:auto; margin-top:5px; margin-bottom:15px; height:10px; width:600px; background-color:#076ba7;">&nbsp;</div>';
			MobilewebHtml += '<br />';
			MobilewebHtml += '<br/>';
			MobilewebHtml += '<br/>';
			MobilewebHtml += '<br/>';
			MobilewebHtml += '<a href="javascript:visitMobile(\'Mobileweb\');" style="margin-bottom:5em; font-weight:bold; font-size:3.2em;">Visit Our Mobile Site &raquo;</a><br />';
			MobilewebHtml += '<br/>';
			MobilewebHtml += '<br/>';
			MobilewebHtml += '<br/>';
			MobilewebHtml += '<br/>';
			MobilewebHtml += '<a href="javascript:closeapppop(\'Mobileweb\');" style="font-weight:bold; font-size:3.2em;">Continue to the main site &raquo;</a>';
			MobilewebHtml += '<br/>';
			MobilewebHtml += '</div>';			
			
			$('#mobilebanner').html(MobilewebHtml);
			$('#mobilebanner').show();
			pageTracker._trackEvent('Mobileweb','ShowPopup','Popup Open to Customer',1);
		}
	}
});

