//Using Query String implementation of ComscoreBeacon after difficulties with the original version
theURL = document.location.href;
var __cs_c1 = 2;
var __cs_c2 = 6759592;
var __cs_c3 = theURL;
var __cs_c4 = "";
var __cs_c5 = "";
var __cs_c6 = "";
var __cs_c15 = "";
var __cs_params = ["c1=", __cs_c1, "&c2=", __cs_c2, "&c3=", __cs_c3, "&c4=", __cs_c4, "&c5=", __cs_c5, "&c6=",
__cs_c6, "&c15=", __cs_c15].join('');
document.write(unescape("%3Cscript src='" + (document.location.protocol == "https:" ? "https://sb" : "http://b") +
".scorecardresearch.com/beacon.js?" + __cs_params +"' %3E%3C/script%3E"));
//alert(__cs_params);

/* ComScore functionality from their JS:
if(typeof COMSCORE=="undefined"){var COMSCORE={}}COMSCORE.beacon=function(d){if(!d){return}var a=1.7,e=document,h=e.location,g=512,c=function(i,j){if(i==null){return""}i=(encodeURIComponent||escape)(i);if(j){i=i.substr(0,j)}return i},f=[(h.protocol=="https:"?"https://sb":"http://b"),".scorecardresearch.com/b?","c1=",c(d.c1),"&c2=",c(d.c2),"&rn=",Math.random(),"&c7=",c(h.href,g),"&c3=",c(d.c3),"&c4=",c(d.c4,g),"&c5=",c(d.c5),"&c6=",c(d.c6),"&c10=",c(d.c10),"&c15=",c(d.c15),"&c16=",c(d.c16),"&c8=",c(e.title),"&c9=",c(e.referrer,g),"&cv=",a,d.r?"&r="+c(d.r,g):""].join("");f=f.length>2080?f.substr(0,2075)+"&ct=1":f;var b=new Image();b.onload=function(){};b.src=f;return f};
*/

/* Original Implementation:
theURL = document.location.href;
document.write(unescape("%3Cscript src='" + (document.location.protocol == "https:" ? "https://sb" : "http://b") + ".scorecardresearch.com/beacon.js' %3E  %3C/script%3E"));
document.write(unescape('%3Cscript%3E theURL = document.location.href;	COMSCORE.beacon({ c1:2, c2:"6759592", c3:theURL, c4:"", c5:"", c6:"", c15:"" }); alert(theURL); %3C/script%3E'));
*/