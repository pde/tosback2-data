/* Criteo RTA */

var crtg_nid="1390"; 
var crtg_cookiename="cto_ms"; 
function crtg_getCookie(c_name){
var i,x,y,ARRcookies=document.cookie.split(";");for(i=0;i<ARRcookies.length;i++){x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);x=x.replace(/^\s+|\s+$/g,"");if(x==c_name){return unescape(y);}}return'';} var crtg_content=crtg_getCookie(crtg_cookiename);var crtg_rnd=Math.floor(Math.random()*99999999999);var crtg_url='http://rtax.criteo.com/delivery/rta/rta.js?netId='+escape(crtg_nid);crtg_url+='&cookieName='+escape(crtg_cookiename);crtg_url+='&rnd='+crtg_rnd;crtg_url+='&varName=crtg_content';var crtg_script=document.createElement('script');crtg_script.type='text/javascript';crtg_script.src=crtg_url;crtg_script.async=true;if(document.getElementsByTagName("head").length>0)document.getElementsByTagName("head")[0].appendChild(crtg_script);else if(document.getElementsByTagName("body").length>0)document.getElementsByTagName("body")[0].appendChild(crtg_script);


/* Safecount Node */
document.write(unescape("%3Cscript src='" + (document.location.protocol == "https:" ? "https://" : "http://")+"content.dl-rms.com/rms/23287/nodetag.js' %3E%3C/script%3E"));
