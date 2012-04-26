/*ONLY REDIRECT FUNCTIONS IN THIS FILE*/


var urlValue = String(window.location.href);
var urlValueSplit = urlValue.split('/');

//smart tv 
if(urlValueSplit[4] == 'SmartTV' || urlValueSplit[4] == 'smartTv' || urlValueSplit[4] == 'Smarttv' || urlValueSplit[4] == 'SmartTv' || urlValueSplit[4] == 'smarttV' || urlValueSplit[4] == 'smartTV'){
    setTimeout(function(){window.location = 'http://www.samsung.com/us/smarttv'}, 5);
}

//black friday
if(urlValueSplit[4] == 'blackFriday' || urlValueSplit[4] == 'BlackFriday' || urlValueSplit[4] == 'BLACKFRIDAY' || urlValueSplit[4] == 'Blackfriday' || urlValueSplit[4] == 'blackfridaydeals' || urlValueSplit[4] == 'samsungblackfriday' || urlValueSplit[4] == 'Samsungblackfriday' || urlValueSplit[4] == 'SamsungBlackFriday' || urlValueSplit[4] == 'SamsungBlackfriday'){
    setTimeout(function(){window.location = 'http://www.samsung.com/us/blackfriday'}, 5);
}

//i800 upgrade
if(urlValueSplit[4] == 'i800' && urlValueSplit[5] == 'upgrade'){
    setTimeout(function(){window.location = 'http://www.samsung.com/us/support/SupportOwnersFAQPopup.do?faq_id=FAQ00045124&fm_seq=45727'}, 5);
}

//mv800 camera
if(urlValueSplit[4] == 'mv800' || urlValueSplit[4] == 'Mv800' || urlValueSplit[4] == 'mV800' || urlValueSplit[4] == 'multiview' || urlValueSplit[4] == 'Multiview' || urlValueSplit[4] == 'MultiView'){
setTimeout(function(){window.location = 'http://www.samsung.com/us/MV800'}, 5);
}


//d710 epic4gtouch update
if(urlValueSplit[4] == 'd710_epic4gtouch' && urlValueSplit[5] == 'softwareupdate'){
    setTimeout(function(){window.location = 'http://www.samsung.com/us/support/SupportOwnersFAQPopup.do?faq_id=FAQ00045250&fm_seq=45872'}, 5);
}

// /us/environment redirect
if(urlValueSplit[4] == 'environment'){
    setTimeout(function(){window.location = '/us/aboutsamsung/sustainability/environment/environment.html'}, 5);
}

// /us/cacsolutions redirect
if(urlValueSplit[4] == 'cacsolutions' || urlValueSplit[4] == 'Cacsolutions'){
    setTimeout(function(){window.location = '/us/printersolutions/#premiumsecurity'}, 5);
}

//sprint redirects
if(urlValueSplit[4] == 'trender_m380' && urlValueSplit[5] == 'softwareupdate'){
    setTimeout(function(){window.location = 'http://www.samsung.com/us/support/SupportOwnersFAQPopup.do?faq_id=FAQ00045484&fm_seq=46134'}, 5);
}

if(urlValueSplit[4] == 'boost' && urlValueSplit[5] == 'transform_ultra_m930' &&  urlValueSplit[6] == 'softwareupdate'){
    setTimeout(function(){window.location = 'http://www.samsung.com/us/support/SupportOwnersFAQPopup.do?faq_id=FAQ00045487&fm_seq=46137'}, 5);
}

if(urlValueSplit[4] == 'sprint' && urlValueSplit[5] == 'transform_ultra_m930' &&  urlValueSplit[6] == 'softwareupdate'){
    setTimeout(function(){window.location = 'http://www.samsung.com/us/support/SupportOwnersFAQPopup.do?faq_id=FAQ00045485&fm_seq=46135'}, 5);
}

if(urlValueSplit[4] == 'conquer4g_d600' && urlValueSplit[5] == 'softwareupdate'){
    setTimeout(function(){window.location = 'http://www.samsung.com/us/support/SupportOwnersFAQPopup.do?faq_id=FAQ00045486&fm_seq=46136'}, 5);
}

if(urlValueSplit[4] == 'froyoupgrade2_2' && urlValueSplit[5] == 'captivate'){
    setTimeout(function(){window.location = 'http://www.samsung.com/us/support/SupportOwnersFAQPopup.do?faq_id=FAQ00032810&fm_seq=32978'}, 5);
}

//SMART CAMERA REDIRECTS
if(urlValueSplit[4] == 'smartCamera' || urlValueSplit[4] == 'SmartCamera' || urlValueSplit[4] == 'Smartcamera' || urlValueSplit[4] == 'SMARTCAMERA'){
	    setTimeout(function(){window.location = '/us/smartcamera'}, 1);
}


//MediaHub promos redirects
if(urlValueSplit[4] == 'ExhibitII4GPromo'){
    setTimeout(function(){window.location = '/us/mediahub/promos/ExhibitII4GPromo.html'}, 1);
}

if(urlValueSplit[4] == 'TMOpromo'){
    setTimeout(function(){window.location = '/us/mediahub/promos/TMOpromo.html'}, 1);
}
if(urlValueSplit[4] == 'GS2USCpromo'){
    setTimeout(function(){window.location = '/us/mediahub/promos/GS2USCpromo.html'}, 1);
}
if((urlValueSplit[4] == 'gs2attpromo' && urlValueSplit[5] == 'gs2attpromo.html') || urlValueSplit[4] == 'gs2attpromo'){
    setTimeout(function(){window.location = '/us/mediahub/promos/gs2attpromo.html'}, 1);
}
if(urlValueSplit[4] == 'USCTabPromo'){
    setTimeout(function(){window.location = '/us/mediahub/promos/USCTabPromo.html'}, 1);
}

//star us
if(urlValueSplit[4] == 'starca'){
    setTimeout(function(){window.location = 'http://pages.samsung.com/starus/ca/'}, 1);
}

//Android FAQ
if(urlValueSplit[4] == 'ICSUpdate'){
	setTimeout(function(){window.location = 'http://www.samsung.com/us/support/SupportOwnersFAQPopup.do?faq_id=FAQ00046726&fm_seq=49755'}, 1);
}
