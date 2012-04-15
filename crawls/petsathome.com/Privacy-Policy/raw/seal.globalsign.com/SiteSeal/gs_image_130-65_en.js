<!--

ss_ua       = navigator.userAgent.toLowerCase();
ss_opera    = window.opera;
ss_msie     = (!ss_opera) && (ss_ua.indexOf("msie")          != -1);
ss_msie4    = (!ss_opera) && (ss_ua.indexOf("msie 4")        != -1);
ss_ns4      = (!ss_opera) && (ss_ua.indexOf("mozilla/4")     != -1) && (ss_ua.indexOf("compatible") == -1);
ss_ns6      = (!ss_opera) && (ss_ua.indexOf("netscape6/6.0") != -1);

ss_opera6lower = (ss_opera) && parseFloat(ss_ua.substr(ss_ua.indexOf("opera")+6)) < 7;
ss_no_dyna_script = ss_opera6lower;

ss_fqdn     = window.location.host;
ss_size     = "SZ130-65";
ss_type     = "image";
ss_lang     = "en";
ss_ver      = "V0001";
ss_service  = "S001";
ss_protocol = window.location.protocol.substring(0, window.location.protocol.indexOf(":"));

ss_jspUrl    = "//ssif1.globalsign.com/SiteSeal/siteSeal/siteSeal/siteSeal.do?p1=" + ss_fqdn + "&p2=" + ss_size + "&p3=" + ss_type + "&p4=" + ss_lang + "&p5=" + ss_ver + "&p6=" + ss_service + "&p7=" + ss_protocol;

function ss_js_sealTagStr(){
  var str = "<scr" + "ipt type='text/javascript' src='" + ss_jspUrl + "'></scr" + "ipt>";
  return str;
}

function ss_js_seal(){

  if(ss_ns4 || ss_msie4){
    return;
  }

  var siteSeal = document.getElementById('ss_img_wrapper_130-65_image_en');

  siteSeal.setAttribute('id','ss_' + ss_size + '_' + ss_type + '_' + ss_lang + '_' + ss_ver + '_' + ss_service);

  if(ss_no_dyna_script){
    document.write(ss_js_sealTagStr());
  }

  else{
    var scriptTag = document.createElement("script");
    scriptTag.setAttribute("src", ss_jspUrl);
    siteSeal.parentNode.insertBefore(scriptTag, siteSeal);
  }
}

ss_js_seal();

//-->
