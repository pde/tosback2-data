var CookieUtil={defaultValues:{"vm":"g"},createCookie:function(name,value,days){if(days){var date=new Date();date.setTime(date.getTime()+(days*24*60*60*1000));var expires="; expires="+date.toGMTString();}
else var expires="";document.cookie=name+"="+value+expires+"; path=/";},readCookie:function(name){var nameEQ=name+"=";var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==' ')c=c.substring(1,c.length);if(c.indexOf(nameEQ)==0)return c.substring(nameEQ.length,c.length);}
return null;},eraseCookie:function(name){CookieUtil.createCookie(name,"",-1);},getPreferences:function(){var prefs={}
var value=CookieUtil.readCookie("brainyPrefs");if(value){var parts=value.split('_');for(var i=0;i<parts.length;i++){var part=parts[i];if(part!="bqHasPrefs"){var nameValue=part.split("E");prefs[nameValue[0]]=nameValue[1];}}}
return prefs;},setPreference:function(name,value){var prefs=CookieUtil.getPreferences();prefs[name]=value;if(CookieUtil.defaultValues[name]==value||value==""){delete prefs[name];}
CookieUtil.savePreferencesToCookie(prefs);},savePreferencesToCookie:function(prefs){var cookieValue="bqHasPrefs";for(var key in prefs){cookieValue=cookieValue+"_"+ key+"E"+ prefs[key];}
if(cookieValue=="bqHasPrefs"){CookieUtil.eraseCookie("brainyPrefs");}
else{CookieUtil.createCookie("brainyPrefs",cookieValue,365);}}};