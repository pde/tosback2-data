// GLOBAL FUNCTIONS FOR MARKETING SITE, PLEASE MINIFY ALL JAVASCRIPT AND JQUERY BEFORE ADDING TO THIS FILE
// ALSO, MAKE SURE TO SIGN ALL ADDITIONS WITH YOUR INITIALS SO WE KNOW WHO ADDED WHAT UPDATES

// build jQuery UI buttons SC
$(".btn").button();

// ACTIVE STATE DETECTION NR
$(function(){if(window.location.href.indexOf("/online-backup")>-1){$(".sol-ind").addClass("active-text")}if(window.location.href.indexOf("/partners")>-1){$(".part-ind").addClass("active-text")}if(window.location.href.indexOf("/online-backup/free-trial")>-1){$(".trial-ind").addClass("active-text");$(".sol-ind").removeClass("active-text")}if(window.location.href.indexOf("/online-backup/pricing-plans")>-1){$(".price-ind").addClass("active-text");$(".sol-ind").removeClass("active-text")}})

//ADD NAME VALUE FUNCTION
function addNameValues(){var nameAttr=$(".sidenav > a").attr("name");var nameText=$(this).text().toString();function addText(){$(".sidenav > a").each(function(){$(this).attr("name",nameText)})}if(nameAttr===undefined||nameAttr===null)addText()}$(document).ready(function(){addNameValues()});
// TP PARAMETER DETECTION AND INSERTION METHOD NR
function addTParam(){function getCookie(acqsource){var i,x,y,ARRcookies=document.cookie.split(";");for(i=0;i<ARRcookies.length;i++){x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);x=x.replace(/^\s+|\s+$/g,"");if(x==acqsource)return unescape(y)}}if(typeof optimizely!="undefined"){var experimentId=0;var variationId=0;var variationIdx=-1;var activeExpts=optimizely.activeExperiments;var values;var variation;for(var i=0;i<activeExpts.length;i++){var newArray=
[];experimentId=activeExpts[i];if(optimizely.variationIdsMap.hasOwnProperty(experimentId)){variationId=optimizely.variationIdsMap[experimentId];newArray=newArray.concat(variationId)}if(newArray.length>=2)variation=newArray.join("-");else if(newArray.length<2)variation=newArray.toString();values=experimentId+"-"+variation;var contents=getCookie("acqsource");if(values&&values.length>0&&contents!==undefined&&contents.indexOf(values)===-1){contents+="&tp="+values;document.cookie="acqsource="+contents+
"; domain=carbonite.com; path=/"}else if(values&&values.length>0&&contents===undefined)document.cookie="acqsource="+values+"; domain=carbonite.com; path=/"}}}$(document).ready(function(){addTParam()});

// COREMETRICS PAGE UDO, PASSES VARIABLES TO TEALIUM FOR TRACKING NR
var categoryId="CARBONITE HOME PAGE NEW";var pageUrl=window.location.href.toLowerCase();
if(pageUrl.indexOf("online-backup/business")>=0)categoryId="SMB MARKETING NEW";else if(pageUrl.indexOf("online-backup/free-trial-business")>=0)categoryId="SMB FREE TRIAL NEW";else if(pageUrl.indexOf("online-backup/free-trial")>=0)categoryId="CON FREE TRIAL NEW";else if(pageUrl.indexOf("install/download")>=0)categoryId="DOWNLOAD TRIAL NEW";else if(pageUrl.indexOf("online-backup/pricing-plans")>=0)categoryId="COMPARE PLANS NEW";else if(pageUrl.indexOf("online-backup")>=0)categoryId="HOME MARKETING NEW";
else if(pageUrl.indexOf("sitemap")>=0)categoryId="SITE MAP NEW";else if(pageUrl.indexOf("case-studies")>=0)categoryId="CASE STUDIES NEW";else if(pageUrl.indexOf("products")>=0)categoryId="HELP ME CHOOSE NEW";else if(pageUrl.indexOf("error")>=0)categoryId="ERROR NEW";else if(pageUrl.indexOf("about")>=0||pageUrl.indexOf("terms-of-use")>=0||pageUrl.indexOf("help")>=0)categoryId="ABOUT CARBONITE NEW";else if(pageUrl.indexOf("partners")>=0)categoryId="PARTNERS NEW";else if(pageUrl.indexOf("blog")>=0)categoryId=
"BLOG NEW";var pageid=window.location.pathname.toUpperCase();var userid=null;if(pageUrl.indexOf("install/download")>=0)userid=getParameterByName(uid);else userid=null;function getParameterByName(name){name=name.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var regexS="[\\?&]"+name+"=([^&#]*)";var regex=new RegExp(regexS);var results=regex.exec(window.location.search);if(results===null)return null;else return decodeURIComponent(results[1].replace(/\+/g," "))}
function utag_data(){page_id="",category="",user_id=null,campaign_id=null};$(document).ready(function() {utag_data.page_id = pageid;utag_data.category = categoryId;utag_data.serverdatetime = _serverDateTime;});

//OS ERROR SCRIPT NR - THIS NEEDS REFACTORING UPON LAUNCH
$(function(){if(navigator.appVersion.indexOf("Mac")!=-1){$(".os-disable").mouseover(function(){$(".os-error").show()});$(".os-disable").mouseout(function(){$(".os-error").hide()});$(".os-disable1").mouseover(function(){$(".os-error-plus").show()});$(".os-disable1").mouseout(function(){$(".os-error-plus").hide()});$(".os-disable2").mouseover(function(){$(".os-error-prem").show()});$(".os-disable2").mouseout(function(){$(".os-error-prem").hide()});$(".os-disable3").mouseover(function(){$(".os-error-plus-tab").show()});
$(".os-disable3").mouseout(function(){$(".os-error-plus-tab").hide()});$(".os-disable4").mouseover(function(){$(".os-error-prem-tab").show()});$(".os-disable4").mouseout(function(){$(".os-error-prem-tab").hide()})}});
