HM_DOM = (document.getElementById) ? true : false;
HM_NS4 = (document.layers) ? true : false;
HM_IE = (document.all) ? true : false;
HM_IE4 = HM_IE && !HM_DOM;
HM_Mac = (navigator.appVersion.indexOf("Mac") != -1);
HM_IE4M = HM_IE4 && HM_Mac;
HM_Opera = (navigator.userAgent.indexOf("Opera")!=-1);
HM_Konqueror = (navigator.userAgent.indexOf("Konqueror")!=-1);

HM_IsMenu = !HM_Opera && !HM_IE4M && (HM_DOM || HM_NS4 || HM_IE4 || HM_Konqueror);

if(HM_IsMenu) {

	document.write("<SCR" + "IPT LANGUAGE='JavaScript1.2' SRC='/www/en_US/flyout/privacy/HM_Arrays.js' TYPE='text/javascript'><\/SCR" + "IPT>");
}