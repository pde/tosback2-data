var siteURL;

if (document.location.protocol=="https:") {
	if (document.location.host=="cart2.barnesandnoble.com") {
		siteURL = "https://cart2.barnesandnoble.com";
	} else {
		siteURL = "https://secure.barnesandnoble.com";
	}
} else {
	siteURL = "http://images.barnesandnoble.com";
}

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