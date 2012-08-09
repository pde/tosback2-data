var siteURL;
if (document.location.protocol=="https:") {
	siteURL = "https://simg1.imagesbn.com";	 
} else {
	siteURL = "http://img1.imagesbn.com";
};
 
var signin_yui;
signin_yui = document.createElement("script");
signin_yui.type = "text/javascript";
signin_yui.src = document.location.protocol+"//img3.imagesbn.com/resources?type=JS&r=|y|yui/yui-min.js&r=bn-yui-config";
document.getElementsByTagName("head")[0].appendChild(signin_yui);

/*
var signin_css;
signin_css = document.createElement("link");
signin_css.type = "text/css";
signin_css.href = siteURL + "/presources/global/css/legacy/signin.css";
signin_css.rel = "stylesheet";
document.getElementsByTagName("head")[0].appendChild(signin_css);

var signin_iframe;
signin_iframe = document.createElement("script");
signin_iframe.type = "text/javascript";
signin_iframe.src = siteURL + "/presources/global/js/legacy/iframe.js";
document.getElementsByTagName("head")[0].appendChild(signin_iframe);
*/

var signin_widget;
signin_widget = document.createElement("script");
signin_widget.type = "text/javascript";
signin_widget.src = siteURL + "/presources/global/js/legacy/signin_widget.js";
document.getElementsByTagName("head")[0].appendChild(signin_widget);

var signin_md5;
signin_md5 = document.createElement("script");
signin_md5.type = "text/javascript";
signin_md5.src = siteURL + "/pace/js/group/extern/md5.js";
document.getElementsByTagName("head")[0].appendChild(signin_md5);