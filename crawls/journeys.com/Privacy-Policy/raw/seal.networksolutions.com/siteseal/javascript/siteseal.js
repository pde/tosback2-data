function SiteSeal(img,type){
if(window.location.protocol.toLowerCase()=="https:"){var mode="https:";} else {var mode="http:";}
var host=location.host;
var baseURL=mode+"//seals.networksolutions.com/siteseal_seek/siteseal?v_shortname="+type+"&v_querytype=W&v_search="+host+"&x=5&y=5";
document.write('<a href="#" onClick=\'window.open("'+baseURL+'","'+type+'","width=450,height=500,toolbar=no,location=no,directories=no,\
status=no,menubar=no,scrollbars=no,copyhistory=no,resizable=no");return false;\'>\
<img src="'+img+'" style="border:none;" oncontextmenu="alert(\'This SiteSeal is protected\');return false;"></a>');}
