
function show_popup1(){document.getElementById('privacy_popup1').style.visibility='visible';}
function hide_popup1(){document.getElementById('privacy_popup1').style.visibility='hidden';}
function privacyPageReadCookie(name){var nameEQ=name+"=";var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==' ')c=c.substring(1,c.length);if(c.indexOf(nameEQ)==0)return c.substring(nameEQ.length,c.length);}
return null;}
function privacyPageShowDetails(){var page_display=document.getElementById("lrn_benefits").style.display;var HTMLtext=document.getElementById("page_benefits").innerHTML;if((page_display=="none")||(page_display=="")){document.getElementById("lrn_benefits").style.display="block";HTMLtext=HTMLtext.replace("+ ","- ");document.getElementById("page_benefits").innerHTML=HTMLtext;}
else{document.getElementById("lrn_benefits").style.display="none";HTMLtext=HTMLtext.replace("- ","+ ");document.getElementById("page_benefits").innerHTML=HTMLtext;}
return false;}
function getCLCombination(hpAllowedDefaults){var url=window.location.href;var tmp="";var ret="";for(var i=0;i<hpAllowedDefaults.length;i++){tmp="/"+hpAllowedDefaults[i][0]+"/";if(url.indexOf(tmp)!=-1){ret=hpAllowedDefaults[i][0];ccllDefaults=hpAllowedDefaults[i][1];break;}}
return ret;}
function setConfig(config){if(config.charAt(1)=='1'){document.forms.privacyPageCookieForm.fptY.checked=true;document.forms.privacyPageCookieForm.fptN.checked=false;}
else{document.forms.privacyPageCookieForm.fptY.checked=false;document.forms.privacyPageCookieForm.fptN.checked=true;}
if(config.charAt(2)=='1'){document.forms.privacyPageCookieForm.fpfY.checked=true;document.forms.privacyPageCookieForm.fpfN.checked=false;}
else{document.forms.privacyPageCookieForm.fpfY.checked=false;document.forms.privacyPageCookieForm.fpfN.checked=true;}
if(config.charAt(3)=='1'){document.forms.privacyPageCookieForm.tpcY.checked=true;document.forms.privacyPageCookieForm.tpcN.checked=false;}
else{document.forms.privacyPageCookieForm.tpcY.checked=false;document.forms.privacyPageCookieForm.tpcN.checked=true;}}
hpAllowedDefaults=[["uk/en","1111"],["dk/da","1111"],["fr/fr","1110"],["de/de","1111"],["it/it","1110"],["nl/nl","1110"],["es/es","1110"],["at/de","1110"],["be/fr","1111"],["be/nl","1111"],["bg/bg","1111"],["cy/el","1110"],["cz/cs","1111"],["ee/et","1111"],["fi/fi","1111"],["hu/hu","1111"],["lv/lv","1110"],["lt/lt","1110"],["ie/en","1111"],["ro/ro","1111"],["sk/sk","1111"],["se/sv","1110"]];var cccll="";var ccllDefaults="";ccll=getCLCombination(hpAllowedDefaults);if(ccll!=""&&document.forms.privacyPageCookieForm!=undefined){var privacy_answ=privacyPageReadCookie('hpeuck_answ');if(privacy_answ!=null){var privacy_pref=privacyPageReadCookie('hpeuck_prefs');if(privacy_pref!=null){setConfig(privacy_pref);}
else{setConfig(ccllDefaults);}}
else{setConfig(ccllDefaults);}}

/*
Date: 11/22/2012 9:18:51 AM
All images published
*/