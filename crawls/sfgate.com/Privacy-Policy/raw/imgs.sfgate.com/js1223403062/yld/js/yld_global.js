// /templates/types/widgets/pages/cssjs/yld_global_js.tmpl
// /js/ads/yld/yld_global.js

if (typeof yld_mgr == 'undefined') { yld_mgr = new Object(); }
yld_mgr.pub_id = "22658131511";
yld_mgr.site_name = "SFGate";
yld_mgr.request_type = "ac";
yld_mgr.container_type = "js";
yld_mgr.content_lang="en-US";

function sfgate_IsTsp() {
   var ref = document.referrer;
   var refRE = /^http:\/\/[a-z.]*sfgate\.com(\/|\/index.s?html)?$/;
   if ( ! ref.match(refRE) ) {
      return false;
   }
   var qs = window.location.search.substring(1, window.location.search.length);
   if (qs.length > 1) {
      var qarray = qs.split("&");
      var re = /^tsp=/;
      for(var i=0; i < qarray.length; i++) {
         if (qarray[i].match(re)) {
            return true;
         }
      }
   }
   return false;
}

function sfgate_yldslotok(pos) {
   if (typeof yld_mgr.slots != 'undefined') {
      if (typeof yld_mgr.slots[pos] != 'undefined'
         && typeof yld_mgr.slots[pos]['ad_size_list'] != 'undefined'
         && yld_mgr.slots[pos]['ad_size_list']
         && typeof yld_mgr.slots[pos]['ad_delivery_mode'] != 'undefined'
         && yld_mgr.slots[pos]['ad_delivery_mode']
         && typeof yld_mgr.slots[pos]['ad_format_list'] != 'undefined'
         && yld_mgr.slots[pos]['ad_format_list']) {
         return true;
      } else {
         return false;
      }
   } else {
      return false;
   }
}

// end /js/ads/yld/yld_global.js

// end /templates/types/widgets/pages/cssjs/yld_global_js.tmpl

