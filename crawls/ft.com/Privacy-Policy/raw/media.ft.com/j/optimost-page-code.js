
var optrial;var opSecureDomain="https://by.essl.optimost.com";var opNormalDomain="http://es.optimost.com";var optimost={A:{},C:{},D:document,L:document.location,M:[],Q:{},T:new Date(),U:'',V:'2.7',Enabled:true,ST:"script",SA:{"type":"text/javascript"},I:function(){var s=this.L.search;var c=this.D.cookie;if(s.length>3){for(var a=s.substring(1).split("&"),i=0,l=a.length;i<l;i++){var p=a[i].indexOf("=");if(p>0)this.Q[a[i].substring(0,p)]=unescape(a[i].substring(p+1));}}if(c.length>3){for(var a=c.split(";"),i=0,b=a.length;i<b;i++){var v=a[i].split("=");while(v[0].substring(0,1)==" ")v[0]=v[0].substring(1,v[0].length);if(v.length==2)this.C[v[0]]=unescape(v[1]);}}},B:function(){var n;this.A={};var _o=this;this.A.D_ts=Math.round(_o.T.getTime()/1000);this.A.D_tzo=_o.T.getTimezoneOffset();this.A.D_loc=_o.L.protocol+"//"+_o.L.hostname+_o.L.pathname;this.A.D_ckl=_o.D.cookie.length;this.A.D_ref=_o.D.referrer;if(typeof optrial=="object")
for(n in optrial)this.A[n]=optrial[n];for(n in this.Q)this.A[n]=this.Q[n];for(n in this.C)if(n.substring(0,2)=="op")this.A[n]=this.C[n];},S:function(){var q='';for(var n in this.A)if(this.A[n]!=null&&this.A[n]!="")q+=(q.length>0?"&":(this.U.indexOf("?")>0?"&":"?"))+n+"="+escape(this.A[n]);return this.U+q;},SC:function(n,v,e,d){var de=new Date();de.setTime(de.getTime()+e*1000);this.D.cookie=n+"="+escape(v)+((e==null)?"":("; expires="+de.toGMTString()))+"; path=/"+((d==null)?"":(";domain="+d));},SLD:function(){var sld=this.D.domain;var dp=sld.split(".");var l=dp.length;if(l<2)sld=null;else if(!isNaN(dp[l-1])&&!isNaN(dp[l-2]))sld=null;else sld="."+dp[l-2]+"."+dp[l-1];return sld;},R:function(r,c,d,e,bDoNotUseWrite)
{if(this.Enabled)
{var b=true;if(r<1000)
{b=(Math.floor(Math.random()*1000)<r);if(c!==null)
{if(this.C[c]!==null)
{b=(this.C[c]!=="mvt-no");}
else
{this.SC(c,b?"mvt-yes":"mvt-no",e,d);}}}
if(b)
{var n;if(bDoNotUseWrite)
{var newScript=this.D.createElement(this.ST);for(n in this.SA)
{if(true)
{newScript[n]=this.SA[n];}}
newScript.src=this.S();var rHead=this.D.getElementsByTagName('head')[0];if(rHead)
{rHead.appendChild(newScript);}}
else
{var t='<'+this.ST+' src="'+this.S()+'"';for(n in this.SA)
{if(true)
{t+=(" "+n+'="'+this.SA[n]+'"');}}
t+='><\/'+this.ST+'>';this.D.write(t);}}}},addModule:function(s,f){this.M[s]=f;},displayModule:function(s){if(typeof this.M[s]=="function")this.M[s]();},hasModules:function(){return count(this.M)>0;}};optimost.I();function invoke_optimost_counter(url)
{var _o=(typeof opcounter==="object")?opcounter:{};_o.D=document;_o.L=_o.D.location;_o.T=new Date();_o.Q={};_o.C={};_o.U=url;_o.D_ts=Math.round(_o.T.getTime()/1000);_o.D_tzo=_o.T.getTimezoneOffset();_o.D_loc=_o.L.protocol+"//"+_o.L.hostname+_o.L.pathname;_o.D_ckl=_o.D.cookie.length;_o.D_ref=_o.D.referrer;_o.I=function()
{var a;var b;var i;var l;var s=_o.L.search;var c=_o.D.cookie;if(s.length>3)
{for(a=s.substring(1).split("&"),i=0,l=a.length;i<l;i++)
{var p=a[i].indexOf("=");if(p>0)
{_o.Q[a[i].substring(0,p)]=unescape(a[i].substring(p+1));}}}
if(c.length>3)
{for(a=c.split(";"),i=0,b=a.length;i<b;i++)
{var v=a[i].split("=");while(v[0].substring(0,1)===" ")
{v[0]=v[0].substring(1,v[0].length);}
if(v.length===2)
{_o.C[v[0]]=unescape(v[1]);}}}};_o.S=function()
{var o={};var n;for(n in _o)
{if(typeof _o[n]==='string')
{o[n]=_o[n];}}
o.D=o.L=o.T=o.Q=o.C=o.U=null;var q='';for(n in o)
{if(o[n]!==null&&o[n]!=="")
{q+=(q.length>0?"&":(_o.U.indexOf("?")>0?"&":"?"))+n+"="+escape(o[n]);}}
return _o.U+q;};_o.I();var n;for(n in _o.Q)
{if(n.substring(0,2)==="op")
{_o[n]=_o.Q[n];}}
for(n in _o.C)
{if(n.substring(0,2)==="op")
{_o[n]=_o.C[n];}}
_o.D.write('<'+'script type="text/javascript" src="'+_o.S()+'"><\/script>');}
if(typeof FT==="undefined"){FT={};}
FT.Optimise={active:true,debug:false,timeoutTime:2000,intervalTime:100,isActive:function(){return FT.Optimise.active;},init:function(){var name="FTQA";var cookieValue=null;if(document.cookie&&document.cookie!==''){var cookies=document.cookie.split(';');for(var idx=0;idx<cookies.length;idx++){var cookie=(cookies[idx]||"").replace(/^\s+|\s+$/g,"");if(cookie.substring(0,name.length+1)===(name+'=')){cookieValue=decodeURIComponent(cookie.substring(name.length+1));FT.Optimise.debug=/debug/.test(cookieValue);var match=/\btimeout=(\d+)\b/.exec(cookieValue);if(match){FT.Optimise.timeoutTime=match[1];}
match=/\binterval=(\d+)\b/.exec(cookieValue);if(match){FT.Optimise.intervalTime=match[1];}
break;}}}},log:function(msg){if(FT.Optimise.debug){if(window.console&&window.console.log){console.log(msg);}else if(window.opera){opera.postError(msg);}}}};FT.Optimise.init();