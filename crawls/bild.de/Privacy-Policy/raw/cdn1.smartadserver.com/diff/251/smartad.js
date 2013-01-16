var bild_smart_test=1; // var fuer bild.de
var adakey = ''; // important... has to be outside if clause... for AdTag call

//if (window.location.toString().toLowerCase().indexOf(".bild.de") == -1 ){
   // Adprobe
   var wlCus = "13115,13118,13116,13123,13122";
   var wlOrd = new Date().getTime();
   try { document.write('<scr' + 'ipt src="http://req.connect.wunderloop.net/AP/1627/6657/13115/js?cus=' + wlCus + '&ord=' + wlOrd + '"></scr'+'ipt>');}
   catch(err) { }
   // Gateway
   document.write('<scr'+'ipt src="http://js.revsci.net/gateway/gw.js?csid=F12351&auto=t"></scr'+'ipt>');
//}

// SAS ASMI GENERIC FUNCTION
sas_tmstp=Math.round(Math.random()*10000000000);
sas_masterflag=1;
sas_skyexcluded = 0;


function SmartAdServer(sas_pageid,sas_formatid,sas_target) {
   // Ad Audience
   //if (window.location.toString().toLowerCase().indexOf(".bild.de") == -1 ){
      if (sas_formatid == 3648 && wl13115camp >0) {
         adakey = ';ada3648sb';
      }
      //if (sas_formatid == 3648 && wl13121camp >0) {
      //  adakey = ';ada3648wp';
      //}
      if (sas_formatid == 3650 && wl13118camp >0) {
         adakey = ';ada3650sk';
      }
      if (sas_formatid == 4459 && wl13116camp >0) {
         adakey = ';ada4459mr';
      }
/* geändert skarl - mit dieser Logik immer banderole wenn bra recommandation...
      if (sas_formatid == 3651 && wl13123camp >0) {
         adakey = ';ada3651rm';
      }
      if (sas_formatid == 3651 && wl13122camp >0) {
         adakey = ';ada3651bra';
      }
*/
      if (sas_formatid == 3651 && wl13123camp > 0 && wl13122camp > 0) {
         adakey = ';ada3651rm;ada3651bra';
      } else if (sas_formatid == 3651 && wl13123camp  > 0){
         adakey = ';ada3651rm';
      } else if (sas_formatid == 3651 && wl13122camp  > 0){
         adakey = ';ada3651bra';
      } else {
         //
      }
   //}
   if (SmartAdServer.efid && SmartAdServer.efid.indexOf('#'+ sas_formatid +'#')>=0) return;
   if (sas_masterflag==1) {sas_masterflag=0;sas_master='M';} else {sas_master='S';};
   document.write('<scr'+'ipt src="http://ww251.smartadserver.com/call/pubj/' + sas_pageid + '/' + sas_formatid + '/' + sas_master + '/' + sas_tmstp + '/' + escape(sas_target) + escape(adakey) + '?"></scr'+'ipt>');
	
   if (sas_skyexcluded == 0 && SmartAdServer.efid && SmartAdServer.efid.indexOf('#3650#')>=0) {
      sas_skyexcluded = 1;
      var img = new Image();
      img.src='http://ww251.smartadserver.com/track/excludeformat.asp?3650;' + sas_tmstp;
   }
}

function SmartAdServer_iframe(sas_pageid,sas_formatid,sas_target,sas_w,sas_h) {
   if (sas_masterflag==1) {sas_masterflag=0;sas_master='M';} else {sas_master='S';};
    document.write('<iframe src="http://ww251.smartadserver.com/call/pubif/' + sas_pageid + '/' + sas_formatid + '/' + sas_master + '/' + sas_tmstp + '/' + escape(sas_target) + escape(adakey) +'?" width=' + sas_w + ' height=' + sas_h + ' marginwidth=0 marginheight=0 hspace=0 vspace=0 frameborder=0 scrolling=no>');
    document.write('</iframe>');
}

/* burt script in Absprache mit CoBi */
if (window.location.toString().toLowerCase().indexOf("computerbild.de") != -1){  
   document.write('<scr'+'ipt src="http://measure.richmetrics.com/rfm/computerbild-nl/rich-computerbild-nl.js"></scr'+'ipt>');
}