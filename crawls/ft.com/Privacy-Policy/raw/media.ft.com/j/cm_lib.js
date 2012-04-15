
var CM_SITE_NAME="ft";var CM_SERVER="engine.cmmeglobal.com";var CM_REQUEST_HTML_PATH="/h/cm_request.html";var CM_ENABLE_FIREBUG_LOGGING=false;var CM_RESPONSE_CHECK_PERIOD_MS=10;var CM_RESPONSE_TIMEOUT_MS=3500;var CM_EVENT_DELIM="|";var CM_INCLUDE_PROFILE_ID=false;var CM_INCLUDE_PROFILE_COOKIE=true;var CM_PROFILE_COOKIE_NAME="AYSC";var CM_PROFILE_ID_REGEX=CM_PROFILE_COOKIE_NAME+"=([^;]*)";var CM_QS_SITE_NAME_PARAM="sitenm";var CM_QS_CAPSULE_NAME_PARAM="capnm";var CM_QS_MATCHING_AREA_ID_PARAM="maid";var CM_QS_MATCHING_AREA_URL="murl";var CM_QS_TIME_PARAM="t";var CM_QS_TIME_ZONE_PARAM="tzo";var CM_QS_PAGE_VIEW_ID_PARAM="pgid";var CM_QS_IMPRESSION_ID="impid";var CM_QS_NAVIGATOR_PLUGINS="nplg";var CM_QS_WINDOW_HISTORY_LENGTH="hstl";var CM_QS_WINDOW_SCREEN_HEIGHT="scrh";var CM_QS_WINDOW_SCREEN_WIDTH="scrw";var CM_QS_WINDOW_PIXEL_DEPTH="scrd";var CM_QS_EXTERNAL_PARAMETERS="ep";var CM_QS_REFERRER="ref";var CM_QS_PAGE="pg";var CM_QS_ERROR="err";var CM_QS_PROFILE_ID="pfid";var CM_QS_PROFILE_ID_ERR="pfiderr";var CM_MAX_URL=1024;var CM_URI_CLICK_LOG_PATH="/v1/click";var CM_URI_REQUEST_LOG_PATH="/v1/request";var CM_URI_PAGE_VIEW_PATH="/v1/page-view";var CM_URI_VISITOR_EVENT_V1_PATH="/v1/visitor-event";var CM_URI_LOG_URL_REQUEST="/v1/log-url-request";var CM_URI_REWARD_EVENT_V1_PATH="/v1/secure-click-reward";var CM_COOKIE_NAME_CAPSULE_CLICK="click";var CM_AREA_NAME_WILDCARD="*";function cm_log(a){if(CM_ENABLE_FIREBUG_LOGGING){console.log(a);}}
function cm_trim(a){if(!a){return"";}
if(a.length<=CM_MAX_URL){return a;}
return a.substr(0,CM_MAX_URL);}
function cm_format_reward(b){var a=b.replace(/^\s+/,"");if(isNaN(a.charAt(0))){return a.substring(1,a.length);}
return a;}
function cm_generate_page_view_id(){var c=[],e="0123456789ABCDEF";var b=0;var a=0;for(;b<36;b++){c[b]=Math.floor(Math.random()*16);}
c[14]=4;c[19]=(c[19]&3)|8;for(;a<36;a++){c[a]=e.charAt(c[a]);}
c[8]=c[13]=c[18]=c[23]="-";var d=c.join("");return d;}
function cm_encode(a){return encodeURIComponent(a);}
function cm_is_ssl(){var a=(document.location.protocol==="https");return a;}
function cm_defined(a){return typeof(a)!=="undefined";}
function cm_read_cookie(b){var e=b+"=";var a=document.cookie.split(";");var d=0;for(;d<a.length;d++){var f=a[d];while(f.charAt(0)===" "){f=f.substring(1,f.length);}
if(f.indexOf(e)===0){return f.substring(e.length,f.length);}}
return null;}
function cm_get_window_location(){var a=window.location.hostname;if(cm_defined(window.location.port)&window.location.port!==""){a=a+":"+window.location.port;}
return a;}
function cm_set_cookie(c,d,e){var a;if(e){var b=new Date();b.setTime(b.getTime()+(e*1000));a="; expires="+b.toGMTString();}else{a="";}
document.cookie=c+"="+d+a+"; path=/";}
function cm_delete_cookie(a){cm_set_cookie(a,"",-1);}
var CM_PAGE_VIEW_ID=cm_generate_page_view_id();function cm_build_profile_id_query_string(){var a=document.cookie.match(CM_PROFILE_ID_REGEX);if(a===null){return CM_QS_PROFILE_ID_ERR+"=cookie";}else{if(a[1]===null||a[1].length===0){return CM_QS_PROFILE_ID_ERR+"=regex";}else{return CM_QS_PROFILE_ID+"="+a[1];}}}
function cm_make_page_viewid_qs(){if(!CM_PAGE_VIEW_ID){CM_PAGE_VIEW_ID=generatePageViewId();}
return CM_QS_PAGE_VIEW_ID_PARAM+"="+CM_PAGE_VIEW_ID;}
function cm_make_time_qs(){var a=new Date();return CM_QS_TIME_PARAM+"="+a.getTime()+"&"+CM_QS_TIME_ZONE_PARAM+"="+a.getTimezoneOffset();}
function cm_common_qs_params(){return CM_QS_SITE_NAME_PARAM+"="+cm_encode(CM_SITE_NAME)+"&"+cm_make_time_qs()+"&"+cm_make_page_viewid_qs();}
function cm_make_production_mode_global_qs_params(){var a="";if(cm_defined(navigator.plugins)){a=a+"&"+CM_QS_NAVIGATOR_PLUGINS+"="+navigator.plugins.length;}
if(cm_defined(window.history)){a=a+"&"+CM_QS_WINDOW_HISTORY_LENGTH+"="+window.history.length;}
if(cm_defined(window.screen.height)){a=a+"&"+CM_QS_WINDOW_SCREEN_HEIGHT+"="+window.screen.height;}
if(cm_defined(window.screen.width)){a=a+"&"+CM_QS_WINDOW_SCREEN_WIDTH+"="+window.screen.width;}
if(cm_defined(window.screen.pixelDepth)){a=a+"&"+CM_QS_WINDOW_PIXEL_DEPTH+"="+window.screen.pixelDepth;}
if(cm_is_ssl()){a=a+"&"+CM_QS_PAGE+"="+cm_encode(cm_trim(document.location.href));}
if(cm_defined(document.referrer)&&document.referrer){a=a+"&"+CM_QS_REFERRER+"="+cm_encode(document.referrer);}
if(CM_INCLUDE_PROFILE_ID){visitorProfileParam=cm_build_profile_id_query_string();a=a+"&"+visitorProfileParam;}
return a;}
function cm_build_matching_area_identifiers_qs(c){var a=cm_common_qs_params();var b=0;for(;b<c.length;b++){a=a+"&=[&"+CM_QS_MATCHING_AREA_ID_PARAM+"="+cm_encode(c[b])+"&=]";}
a=a+"&"+CM_QS_MATCHING_AREA_URL+"="+cm_encode(document.URL);a=a+cm_make_production_mode_global_qs_params();return a;}
function cm_new_xmlhttprequest(){var a=false;if(window.XMLHttpRequest&&!(window.ActiveXObject)){try{a=new XMLHttpRequest();}catch(d){a=false;}}else{if(window.ActiveXObject){try{a=new ActiveXObject("Msxml2.XMLHTTP");}catch(c){try{a=new ActiveXObject("Microsoft.XMLHTTP");}catch(b){a=false;}}}}
return a;}
function cm_ajax_log_request(a){req=cm_new_xmlhttprequest();if(req){req.open("GET",a,false);req.send("");return true;}else{return false;}}
function cm_ie_friendly_delay(){var a=0;var c=new Date().getTime();var b=c+150;while(new Date().getTime()<b){var d=document.getElementById(new Date().getTime());if(d!==null){a=a+1;}}
return a>0;}
function cm_image_log_click(a){cm_log("cm_image_log_click url="+a);var b=new Image();b.src=a;cm_ie_friendly_delay();return true;}
function cm_is_safari(){var a=navigator.userAgent.toLowerCase();if(a.indexOf("safari/")!==-1&&a.indexOf("chrome")===-1){return true;}else{return false;}}
function cm_is_chrome(){var a=navigator.userAgent.toLowerCase();return a.indexOf("chrome")!==-1;}
function cm_log_click(f,d,e){var a=cm_common_qs_params();a=a+"&"+CM_QS_CAPSULE_NAME_PARAM+"="+cm_encode(f);a=a+"&"+CM_QS_IMPRESSION_ID+"="+cm_encode(d);var c=CM_URI_CLICK_LOG_PATH;if(e){a=a+"&erw="+e;c=CM_URI_REWARD_EVENT_V1_PATH;}
var b=document.location.protocol+"//"+CM_SERVER+c+"?"+a;if(cm_is_safari()||cm_is_chrome()){cm_ajax_log_request(b);}else{cm_image_log_click(b);}
return true;}
function cm_log_click_check(){var a=cm_read_cookie(CM_COOKIE_NAME_CAPSULE_CLICK);if(a!==null){var b=new Image();b.src=document.location.protocol+"//"+CM_SERVER+CM_URI_CLICK_LOG_PATH+"?"+a;cm_delete_cookie(CM_COOKIE_NAME_CAPSULE_CLICK);}}
function cm_get_ie_ver(){var c=-1;if(navigator.appName==="Microsoft Internet Explorer"){var a=navigator.userAgent;var b=new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");if(b.exec(a)!==null){c=parseFloat(RegExp.$1);}}
return c;}
function MatchingEngine(){this.areas=[];}
MatchingEngine.prototype.setRequestPath=function(a){if(arguments.length===0){return;}
var b=arguments[0];if(b.charAt(b.length-1)==="/"){b=b.substring(0,b.length-1);}
CM_REQUEST_HTML_PATH=b+CM_REQUEST_HTML_PATH;};MatchingEngine.prototype.setup=function(f,g){if(cm_get_ie_ver()===5){return;}
var c=0;this.areaNames=f.split(",");this.serverTimeout=false;this.timestamp=new Date().getTime();for(;c<this.areaNames.length;c++){var e={};var d=this.areaNames[c];e.name=d;e.content=null;e.displayed=false;this.areas[d]=e;}
var a=cm_build_matching_area_identifiers_qs(this.areaNames);var b=document.location.protocol+"//"+cm_get_window_location()+CM_REQUEST_HTML_PATH+"?"+a;if(!cm_defined(g)){g=this._encodeClientParams();}
if(g!==null&&g.length>0){b=b+"&"+CM_QS_EXTERNAL_PARAMETERS+"="+cm_encode(g);}
var h='<iframe id="cm_server_request" style="display:none" src="'+b+'"></iframe>';document.write(h);setTimeout("MatchingEngine._responseChecker()",CM_RESPONSE_CHECK_PERIOD_MS);};MatchingEngine.prototype.logEvent=function(d){var c=1;if(arguments.length===0){return;}
d=arguments[0];var b=d;for(;c<arguments.length;c++){b=b+CM_EVENT_DELIM+arguments[c];}
var a="event="+cm_encode(b)+"&"+cm_common_qs_params()+cm_make_production_mode_global_qs_params();var e=new Image();e.src=document.location.protocol+"//"+CM_SERVER+CM_URI_VISITOR_EVENT_V1_PATH+"?"+a;};MatchingEngine.prototype.logPageView=function(){var a=cm_common_qs_params()+cm_make_production_mode_global_qs_params();var b=new Image();b.src=document.location.protocol+"//"+CM_SERVER+CM_URI_PAGE_VIEW_PATH+"?"+a;};MatchingEngine.prototype.logConversion=function(){var b=cm_read_cookie("cm_impid");var d=cm_read_cookie("cm_capsulename");var a=1;cm_log_click(d,b);if(arguments.length===0){return;}
var c=arguments[0];for(;a<arguments.length;a++){c=c+CM_EVENT_DELIM+arguments[a]+"="+document.getElementById(arguments[a]).innerHTML;}
MatchingEngine.logEvent(c);};MatchingEngine.prototype.logReward=function(){var a=cm_read_cookie("cm_impid");var c=cm_read_cookie("cm_capsulename");var b=cm_format_reward(document.getElementById("reward").innerHTML);cm_log_click(c,a,b);return true;};MatchingEngine.prototype.display=function(a){this._displayInternal(a,true);};MatchingEngine.prototype._displayInternal=function(d,c){if(cm_get_ie_ver()===5){this._displayAreaDefault(d);return;}
var b=this.areas[d];if(cm_defined(b)){if(c){document.write('<span id="'+d+'">');}
if(b.content!==null){cm_log("display:responseReceived = true "+d);if(c){document.write(b.content);b.displayed=true;}else{var a=document.getElementById(d);if(a!==null){MatchingEngine._replaceWithScripts(a,b.content);b.displayed=true;}}}
if(c){document.write("</span>");}}};MatchingEngine.prototype._displayAll=function(){var b=true;var a=0;for(;a<this.areaNames.length;a++){var d=this.areas[this.areaNames[a]];cm_log("area "+d);if(!d.displayed){if(d.content!==null){var c=document.getElementById(d.name);cm_log(d.name+" = "+c);if(c!==null){MatchingEngine._replaceWithScripts(c,d.content);d.displayed=true;}else{d.displayed=false;b=false;}}else{d.displayed=false;b=false;}}else{cm_log("capsule.displayed capsule="+d.name);}}
return b;};MatchingEngine.prototype._replaceWithScripts=function(b,g){if(g.toLowerCase().indexOf("<script")>=0){b.innerHTML="&nbsp;"+g;}else{b.innerHTML=g;}
var a=b.getElementsByTagName("script");if(a&&a.length>0){var h=a.length;var f=h-1;var e=[];for(;f>=0;f--){var c=a[f];e[f]=a[f].text;c.parentNode.removeChild(c);}
for(f=0;f<h;f++){var d=document.createElement("script");d.setAttribute("type","text/javascript");d.setAttribute("language","JavaScript");d.text=e[f];b.appendChild(d);}}};MatchingEngine.prototype._responseChecker=function(){if(this.serverTimeout){return;}
var b=this._displayAll();var a=new Date().getTime()-this.timestamp;var c=a>=CM_RESPONSE_TIMEOUT_MS;cm_log("elapsed "+a);if(!b&&!c){setTimeout("MatchingEngine._responseChecker()",CM_RESPONSE_CHECK_PERIOD_MS);}else{if(!b&&c){cm_log("timeout allDisplayed="+b);this._handleTimeout();}}};MatchingEngine.prototype._handleTimeout=function(){var a=0;cm_log("timeout");this.serverTimeout=true;for(;a<this.areaNames.length;a++){var b=this.areaNames[a];this.areas[b].displayed=this._displayAreaDefault(b);}};MatchingEngine.prototype._displayAreaDefault=function(c){var a=document.getElementById(c+"_default");if(a!==null){var b=document.getElementById(c);if(b!==null){b.innerHTML=a.innerHTML;return true;}}
return false;};MatchingEngine.prototype._callback=function(c,b){cm_log("_callback areaName="+c);var a=this.areas[c];if(cm_defined(a)){a.content=b;this._displayInternal(c,false);}};MatchingEngine.prototype._callback_display_default=function(b){var a=0;cm_log("_callback_display_default areaName="+b);if(b!==CM_AREA_NAME_WILDCARD){this._displayAreaDefault(b);}else{for(;a<this.areaNames.length;a++){this._displayAreaDefault(this.areaNames[a]);}}};MatchingEngine.prototype._encodeClientParams=function(){var d=cm_read_cookie(CM_PROFILE_COOKIE_NAME);var g="";if(d!==null){var b=d.split("_");var c=0;for(;c<b.length;c++){var e=b[c];if(e.length>2){var a=e.substr(0,2);var f=decodeURIComponent(e.substr(2,e.length-2));if(g.length>0){g=g+"&";}
g=g+a+"="+f;}}}
return g;};var MatchingEngine=new MatchingEngine();