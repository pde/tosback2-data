//Start Page Code
//Office Depot >> Global >> Global Code

var optimost={A:{},C:{},D:document,L:document.location,M:[],Q:{},T:new Date(),U:'',V:'2.7',Enabled:true,ST:"script",SA:
{"type":"text/javascript"},I:function(){var s=this.L.search;var c=this.D.cookie;if(s.length>3){for(var a=s.substring(1)
.split("&"),i=0,l=a.length;i<l;i++){var p=a[i].indexOf("=");if(p>0)this.Q[a[i].substring(0,p)]=unescape(a[i].substring(
p+1));}}if(c.length>3){for(var a=c.split(";"),i=0,b=a.length;i<b;i++){var v=a[i].split("=");while(v[0].substring(0,
1)==" ")v[0]=v[0].substring(1,v[0].length);if(v.length==2)this.C[v[0]]=unescape(v[1]);}}},B:function(){var n;this.A={
};var _o=this;this.A.D_ts=Math.round(_o.T.getTime()/1000);this.A.D_tzo=_o.T.getTimezoneOffset();this.A.D_loc=_o.L.protocol+
"//"+_o.L.hostname+_o.L.pathname;this.A.D_ckl=_o.D.cookie.length;this.A.D_ref=_o.D.referrer;if(typeof optrial=="object")
for(n in optrial)this.A[n]=optrial[n];for(n in this.Q)this.A[n]=this.Q[n];for(n in this.C)if(n.substring(0,2)=="op")this.A[n]=
this.C[n];},S:function(){var q='';for(var n in this.A)if(this.A[n]!=null && this.A[n]!="")q+=(q.length>0?"&":(this.U.indexOf(
"?")>0?"&":"?"))+n+"="+escape(this.A[n]);return this.U+q;},SC:function(n,v,e,d){var de=new Date();de.setTime(
de.getTime()+e * 1000);this.D.cookie=n+"="+escape(v)+((e==null)?"":("; expires="+de.toGMTString()))+"; path=/"+((d==
null)?"":(";domain="+d));},SLD:function(){var sld=this.D.domain;var dp=sld.split(".");var l=dp.length;if(l<2)sld=null;
else if(!isNaN(dp[l-1])&&!isNaN(dp[l-2]))sld=null;else sld="."+dp[l-2]+"."+dp[l-1];return sld;},
R:function(r,c,d,
e){if(this.Enabled){var b=true;if(r<1000){b=(Math.floor(Math.random()*1000)<r);if(c!=null){if(this.C[c]!=null)b=(this.C[c]!=
"mvt-no");else this.SC(c,b?"mvt-yes":"mvt-no",e,d);}}if(b){var t='<'+this.ST+' src="'+this.S()+'"';for(n in this.SA)
t+=(" "+n+'="'+this.SA[n]+'"');t+='><\/'+this.ST+'>';this.D.write(t);}}},
XH:function(u){
	if(typeof(u)!="object")return;
	var s=this.D.createElement(this.ST);
	for(var n in this.SA){
		if(!this.isIE6)s.setAttribute(n,this.SA[n]);
		else s[n]=this.SA[n];
	}
	for(var n in u){
		if(!this.isIE6)s.setAttribute(n,u[n]);
		else s[n]=u[n];
	}
	var h=this.D.getElementsByTagName("head");
	if(h[0])h[0].insertBefore(s,h[0].childNodes[h[0].childNodes.length-1]);
	else this.D.body.insertBefore(s,this.D.body.childNodes[D.body.childNodes.length-1]);
},
addModule:function(s,f){this.M[s]=f;},
displayModule:function(s){if(typeof this.M[s]=="function")this.M[s]();},hasModules:function(){var cnt=0;for(
var n in this.M)cnt++;return cnt;},isIE6:navigator.userAgent.toLowerCase().indexOf("msie 6")!=-1?true:false};
optimost.I();


if(optimost.Q["opr"] == "xr")
{
	optimost.debug=true;
	optimost.R=function(r,c,d,e){if(this.Enabled){var b=true;if(r<1000){b=(Math.floor(Math.random()*1000)<r);if(c!=null){if(this.C[c]!=null)b=(this.C[c]!=
	"mvt-no");else this.SC(c,b?"mvt-yes":"mvt-no",e,d);}}if(b){	var u={"src":this.S()};this.XH(u);}}};
}
else if(optimost.Q["opr"] == "r")
{
	optimost.debug=true;
}
//End Page Code
/*
var optimost={A:{},C:{},D:document,L:document.location,M:[],Q:{},T:new Date(),U:'',V:'2.7',Enabled:true,ST:"script",SA:
{"type":"text/javascript"},I:function(){var s=this.L.search;var c=this.D.cookie;if(s.length>3){for(var a=s.substring(1)
.split("&"),i=0,l=a.length;i<l;i++){var p=a[i].indexOf("=");if(p>0)this.Q[a[i].substring(0,p)]=unescape(a[i].substring(
p+1));}}if(c.length>3){for(var a=c.split(";"),i=0,b=a.length;i<b;i++){var v=a[i].split("=");while(v[0].substring(0,
1)==" ")v[0]=v[0].substring(1,v[0].length);if(v.length==2)this.C[v[0]]=unescape(v[1]);}}},B:function(){var n;this.A={
};var _o=this;this.A.D_ts=Math.round(_o.T.getTime()/1000);this.A.D_tzo=_o.T.getTimezoneOffset();this.A.D_loc=_o.L.protocol+
"//"+_o.L.hostname+_o.L.pathname;this.A.D_ckl=_o.D.cookie.length;this.A.D_ref=_o.D.referrer;if(typeof optrial=="object")
for(n in optrial)this.A[n]=optrial[n];for(n in this.Q)this.A[n]=this.Q[n];for(n in this.C)if(n.substring(0,2)=="op")this.A[n]=
this.C[n];},S:function(){var q='';for(var n in this.A)if(this.A[n]!=null && this.A[n]!="")q+=(q.length>0?"&":(this.U.indexOf(
"?")>0?"&":"?"))+n+"="+escape(this.A[n]);return this.U+q;},SC:function(n,v,e,d){var de=new Date();de.setTime(
de.getTime()+e * 1000);this.D.cookie=n+"="+escape(v)+((e==null)?"":("; expires="+de.toGMTString()))+"; path=/"+((d==
null)?"":(";domain="+d));},SLD:function(){var sld=this.D.domain;var dp=sld.split(".");var l=dp.length;if(l<2)sld=null;
else if(!isNaN(dp[l-1])&&!isNaN(dp[l-2]))sld=null;else sld="."+dp[l-2]+"."+dp[l-1];return sld;},R:function(r,c,d,
e){if(this.Enabled){var b=true;if(r<1000){b=(Math.floor(Math.random()*1000)<r);if(c!=null){if(this.C[c]!=null)b=(this.C[c]!=
"mvt-no");else this.SC(c,b?"mvt-yes":"mvt-no",e,d);}}if(b){var t='<'+this.ST+' src="'+this.S()+'"';for(n in this.SA)
t+=(" "+n+'="'+this.SA[n]+'"');t+='><\/'+this.ST+'>';this.D.write(t);}}},addModule:function(s,f){this.M[s]=f;
},displayModule:function(s){if(typeof this.M[s]=="function")this.M[s]();},hasModules:function(){return count(this.M)>0;
}};optimost.I();
*/

if(optimost.Q["opglobalqa"] || optimost.C["opglobalqa"])
{
	opRun = true;
	
	var opGlobalVal = optimost.Q["opglobalqa"] || optimost.C["opglobalqa"];
	if(opGlobalVal == "set")
	{
		optimost.SC("opglobalqa", "true", null, optimost.SLD());
	}
}


var optSelector = {};
optSelector.path = "http://es.optimost.com/";
if((document.location && document.location.protocol && document.location.protocol.toLowerCase().indexOf("https") > -1) || optimost.Q["opsecure"])optSelector.path = "https://by.essl.optimost.com/";
if(location.hostname.indexOf(".officedepot.com")!=-1 || location.hostname.indexOf(".uschecomrnd.net")!=-1 || location.hostname.indexOf(".odcorp.net")!=-1){
	optSelector.url_live = "es/1587/c/2/u/live.js";optSelector.url_qa = "es/1587/c/2/u/staging.js"; optSelector.url = optSelector.url_live;
} else {
	optSelector.url_live = "es/639/c/1/u/OfficeDepot_live.js";optSelector.url_qa = "es/639/c/1/u/OfficeDepot_Stage.js"; optSelector.url = optSelector.url_live;
}
if (typeof(optimost)=='object') {optSelector.qc = optimost.Q["opglobalqa"] || optimost.C["opglobalqa"] || "none";if(optSelector.qc.toLowerCase() == "true"){optSelector.url = optSelector.url_qa;}else if(optSelector.qc.toLowerCase() == "live"){optSelector.url = optSelector.url_live;}}
if(optSelector.url.toLowerCase().indexOf("http") == -1)optSelector.url = optSelector.path + optSelector.url 
//optimost.XH({"src":optSelector.url});
document.write("<script type='text/javascript' src='" + optSelector.url + "'><\/script>");