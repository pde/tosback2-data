
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
// To prevent both surveys running at the same time visiting
// 2009-10-22 created by Sean Chang
//
////////////////////////////////////////////////////////////////////////////////////



//var iPerSrc = '\<script type="text/javascript" defer="defer" src="http://group12.iperceptions.com/Invitations/Javascripts/wv355redirect.js"\>\</script\>';
var iPerSrc = '\<script language="javascript" type="text/javascript" defer="defer" src="http://ipinvite.iperceptions.com/Invitations/Javascripts/ip_Layer_Invitation_SamsungGlobal_dev.aspx"\>\</script\>';
var foreSeeSrc = '\<script type="text/javascript" src="/us/foresee/foresee-trigger.js"\>\</script\>';

var siteUrl = document.URL;
var splitUrl2 = siteUrl.split("/");
	
var foreSeeFlag = checkForeSeeValue("foresee");

var hostName = window.location.host;


if(typeof(iFlag) != 'undefined' && iFlag == true && splitUrl2.length < 6 && window.location.host == 'www.samsung.com'){
	document.write(iPerSrc);
}
else if(foreSeeFlag == null || foreSeeFlag == "accepted" || foreSeeFlag != "na"){
	document.write(foreSeeSrc);
}
if(checkForeSeeAcceptance("fsr.s") == "1"){
  if(checkForeSeeValue("omniture") != "true"){
	try {
		ss_link_click_track_2('','event36','','','foresee survey','o','foresee click');
		setCookieForSurvey("omniture", "true");
		} catch(er){}
	}
}else {
	setCookieForSurvey("omniture", "");
}
