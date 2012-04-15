/* SiteCatalyst code version: H.22.1.
Copyright 1996-2010 Adobe, Inc. All Rights Reserved
More info available at http://www.omniture.com */

/* Plugin Config */

s.usePlugins=true
function s_doPlugins(s) {
  /* Add calls to plugins here */

  s.campaign=s.getValOnce(s.getQueryParam('csref,psref,rmref,smref,inref'));
  s.eVar28 =s.getValOnce(s.getQueryParam('pid')); 
}
s.doPlugins=s_doPlugins

/************************** PLUGINS SECTION *************************/


/* You may insert any plugins you wish to use here.                 */

/* DANG-3660
 * Plugin: getValOnce_v1.0
 */
s.getValOnce=new Function("v","c","e",""
+"var s=this,a=new Date,v=v?v:v='',c=c?c:c='s_gvo',e=e?e:0,k=s.c_r(c"
+");if(v){a.setTime(a.getTime()+e*86400000);s.c_w(c,v,e?a:0);}return"
+" v==k?'':v");

/*
 * Plugin: getQueryParam 2.3
 */
s.getQueryParam=new Function("p","d","u",""
+"var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati"
+"on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p"
+".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-"
+"1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i="
+"=p.length?i:i+1)}return v");
s.p_gpv=new Function("k","u",""
+"var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
+"=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+"epa(v)}return ''");


/*
 * Custom code for generating visitors UUID
 */
/* create namespace */
if (typeof audi_ngw_aoa === 'undefined') {
  audi_ngw_aoa = {};
}
if (typeof audi_ngw_aoa.usertracking === 'undefined') {
  audi_ngw_aoa.usertracking = {};
}


audi_ngw_aoa.usertracking.readCookie = function(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

audi_ngw_aoa.usertracking.uniqueID = function() {
  var cookie = audi_ngw_aoa.usertracking.readCookie( "TrackUUID" );
  if( cookie != null ){
    return cookie;
  } else {
    var trackUUID = audi_ngw_aoa.usertracking.guid();
    audi_ngw_aoa.usertracking.createCookie( "TrackUUID", trackUUID, 90 );
    return trackUUID;
  }
}

audi_ngw_aoa.usertracking.S4 = function() {
  return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}
audi_ngw_aoa.usertracking.guid = function() {
  return (audi_ngw_aoa.usertracking.S4()+audi_ngw_aoa.usertracking.S4()
      +"-"+audi_ngw_aoa.usertracking.S4()
      +"-"+audi_ngw_aoa.usertracking.S4()
      +"-"+audi_ngw_aoa.usertracking.S4()
      +"-"+audi_ngw_aoa.usertracking.S4()+audi_ngw_aoa.usertracking.S4()+audi_ngw_aoa.usertracking.S4());
}

audi_ngw_aoa.usertracking.hostFromUrl = function(url) {
  var match = /((https?):\/\/([-\w\.]+)+(:\d+)?)(\/([~\-#\w\/_\.]*)?(\?\S+)?)?/i.exec( url );
  return match == null ? "" : match[1];
}

audi_ngw_aoa.usertracking.createCookie = function(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else var expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}


audi_ngw_aoa.usertracking.eraseCookie = function(name) {
  audi_ngw_aoa.usertracking.createCookie(name,"",-1);
}

s.eVar30 = audi_ngw_aoa.usertracking.uniqueID();


/*
 * Plugin: getTimeParting 2.0 - Set timeparting values based on time zone
 */

s.getTimeParting=new Function("t","z",""
+"var s=this,cy;dc=new Date('1/1/2000');"
+"if(dc.getDay()!=6||dc.getMonth()!=0){return'Data Not Available'}"
+"else{;z=parseFloat(z);var dsts=new Date(s.dstStart);"
+"var dste=new Date(s.dstEnd);fl=dste;cd=new Date();if(cd>dsts&&cd<fl)"
+"{z=z+1}else{z=z};utc=cd.getTime()+(cd.getTimezoneOffset()*60000);"
+"tz=new Date(utc + (3600000*z));thisy=tz.getFullYear();"
+"var days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday',"
+"'Saturday'];if(thisy!=s.currentYear){return'Data Not Available'}else{;"
+"thish=tz.getHours();thismin=tz.getMinutes();thisd=tz.getDay();"
+"var dow=days[thisd];var ap='AM';var dt='Weekday';var mint='00';"
+"if(thismin>30){mint='30'}if(thish>=12){ap='PM';thish=thish-12};"
+"if (thish==0){thish=12};if(thisd==6||thisd==0){dt='Weekend'};"
+"var timestring=thish+':'+mint+ap;if(t=='h'){return timestring}"
+"if(t=='d'){return dow};if(t=='w'){return dt}}};");


/*
 * Plugin: Days since last Visit 1.1.H - capture time from last visit
 */
s.getDaysSinceLastVisit=new Function("c",""
+"var s=this,e=new Date(),es=new Date(),cval,cval_s,cval_ss,ct=e.getT"
+"ime(),day=24*60*60*1000,f1,f2,f3,f4,f5;e.setTime(ct+3*365*day);es.s"
+"etTime(ct+30*60*1000);f0='Cookies Not Supported';f1='First Visit';f"
+"2='More than 30 days';f3='More than 7 days';f4='Less than 7 days';f"
+"5='Less than 1 day';cval=s.c_r(c);if(cval.length==0){s.c_w(c,ct,e);"
+"s.c_w(c+'_s',f1,es);}else{var d=ct-cval;if(d>30*60*1000){if(d>30*da"
+"y){s.c_w(c,ct,e);s.c_w(c+'_s',f2,es);}else if(d<30*day+1 && d>7*day"
+"){s.c_w(c,ct,e);s.c_w(c+'_s',f3,es);}else if(d<7*day+1 && d>day){s."
+"c_w(c,ct,e);s.c_w(c+'_s',f4,es);}else if(d<day+1){s.c_w(c,ct,e);s.c"
+"_w(c+'_s',f5,es);}}else{s.c_w(c,ct,e);cval_ss=s.c_r(c+'_s');s.c_w(c"
+"+'_s',cval_ss,es);}}cval_s=s.c_r(c+'_s');if(cval_s.length==0) retur"
+"n f0;else if(cval_s!=f1&&cval_s!=f2&&cval_s!=f3&&cval_s!=f4&&cval_s"
+"!=f5) return '';else return cval_s;");

/*
 * Plugin: getAndPersistValue 0.3 - get a value on every page
 */
s.getAndPersistValue=new Function("v","c","e",""
+"var s=this,a=new Date;e=e?e:0;a.setTime(a.getTime()+e*86400000);if("
+"v)s.c_w(c,v,e?a:0);return s.c_r(c);");

/*
 * Custom code for setting days since last visit/time parting information
 */
s.prop44=s.getDaysSinceLastVisit('s_lv');
s.eVar33=s.prop44;

audi_ngw_aoa.usertracking.theDate=new Date();
audi_ngw_aoa.usertracking.currentYear=(audi_ngw_aoa.usertracking.theDate.getFullYear());
s.prop45=s.getTimeParting('h','-5',audi_ngw_aoa.usertracking.currentYear); // Set Hour
s.eVar34=s.prop45;
s.prop46=s.getTimeParting('d','-5',audi_ngw_aoa.usertracking.currentYear); // Set Day
s.eVar35=s.prop46;
s.prop47=s.getTimeParting('w','-5',audi_ngw_aoa.usertracking.currentYear); // Set Weekend/Weekday
s.eVar36=s.prop47;
