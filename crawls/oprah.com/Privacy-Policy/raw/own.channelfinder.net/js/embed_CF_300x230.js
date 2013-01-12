
var cf_agt=navigator.userAgent.toLowerCase();
var is_major = parseInt(navigator.appVersion);
var is_ie     = ((cf_agt.indexOf("msie") != -1) && (cf_agt.indexOf("opera") == -1));
var is_ie6    = (is_ie && (is_major == 4) && (cf_agt.indexOf("msie 6.")!=-1) );

var fromBanner = "F";
var hu = window.location.search.substring(1);
var gy = hu.split("&");
for (i=0;i<gy.length;i++) {
    ft = gy[i].split("=");
    if (ft[0] == "SiteID") {
        fromBanner = "T"
    }
}

var str='';
str+='<style type="text\/css">';
str+='#kpiMasterWidget {';
str+='	float:left;';
str+='	display:inline;';
str+='	position: relative;	';
str+='	margin:0px 0px 0px 0px;';
str+='  z-index: 19;';
//str+='  border:2px solid white;';
str+='}';
str+='#kpiRightWidget {';
str+='	float:left;';
str+='	display:inline;';
str+='	position: relative;	';
str+='	margin:0px 0px 0px 0px;';
str+='  z-index: 20;';
//str+='  border:2px solid red;';
str+='  text-align: center;';
str+='}';
str+='<\/style>';
//str+='<div id="kpiMasterWidget">';
str+='<div id="kpiRightWidget">';
str+='<\/div>';
//str+='<\/div>';
str+='<script type="text\/javascript">';
str+='var so = new SWFObject("http:\/\/own.channelfinder.net\/swf\/CF_OWN_300x230.swf", "channelfinder", "100%", "100%", "8", "#FFFFFF");';
str+='	so.addParam("quality", "high");';
str+='	so.addParam("wmode", "transparent");';
str+='	so.addParam("allowscriptaccess","always");';
str+='	so.addParam("salign", VALUE="B");';
str+='	so.addParam("scale", VALUE="noscale");';
//str+='  so.addParam("bgcolor","#1c1c1c");';
str+='	so.addVariable("siteID","' + fromBanner + '");';
str+='	so.write("kpiRightWidget");';
str+='		this.f=document.getElementById("kpiRightWidget"); ';
str+='		this.f.style.height= "230px"; ';
if(!is_ie6){
	// Fix for IE6 that requires width not be set
	str+='	this.f.style.width= "300px"; ';
}
str+='<\/script>';
document.write(str);
