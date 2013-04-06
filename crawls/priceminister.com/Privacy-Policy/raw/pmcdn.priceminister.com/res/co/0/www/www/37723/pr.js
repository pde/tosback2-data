function gotoWengo(familyPm, posPm, xitiName) {

  var urlWengo='http://home.edt02.net/emc/banner/mstbc.php?c=';
  var trackWengo = '40060-174436-91631-335-306462';

  if(familyPm != '') {
    switch(familyPm) {
      case 100: 
      case '100': 
          trackWengo='40060-174390-91631-335-306416';
          xitiName += 'Livres';
          break;
      case 200: 
      case '200': 
          trackWengo='40060-174391-91631-335-306417';
          xitiName += 'Musique';
          break;
      case 300: 
      case '300': 
          trackWengo='40060-174392-91631-335-306418';
          xitiName += 'DVDVHS';
          break;
      case 400: 
      case '400': 
          trackWengo='40060-174393-91631-335-306419';
          xitiName += 'JeuxVideo';
          break;
      case 500: 
      case '500': 
          trackWengo='40060-174394-91631-335-306420';
          xitiName += 'TelPDA';
          break;
      case 600: 
      case '600':           
          trackWengo='40060-174395-91631-335-306421';
          xitiName += 'Informatique';
          break;
      case 700: 
      case '700': 
          trackWengo='40060-174399-91631-335-306425';
          xitiName += 'ImageSon';
          break;
      case 900: 
      case '900': 
          trackWengo='40060-174400-91631-335-306426';
          xitiName += 'MaisonElectromenager';
          break;
      case 1000: 
      case '1000': 
          trackWengo='40060-174398-91631-335-306424';
          xitiName += 'Enfant';
          break;
      case 1100: 
      case '1100': 
          trackWengo='40060-174397-91631-335-306423';
          xitiName += 'Mode';
          break;
      case 1400: 
      case '1400': 
          trackWengo='40060-174396-91631-335-306422';
          xitiName += 'SportLoisirs';
          break;
      case 1500: 
      case '1500': 
          trackWengo='40060-174401-91631-335-306427';
          xitiName += 'VinSaveur';
          break;
    }
  }
  else if(posPm != '') {
    switch(posPm) {
      case 1 : 
      case '1' : 
          trackWengo='40060-174436-91631-335-306462';
          break;
      case 2 : 
      case '2' : 
          trackWengo='40060-174439-91631-335-306465';
          break;
      case 3 : 
      case '3' : 
          urlWengo='http://home.edt02.net/emc/membership/mstac.php?c=';
          trackWengo='40060-23140-91631-0-154831';
          break;
      case 4 : 
      case '4' : 
          trackWengo='40060-174445-91631-335-306471';
          break;
    }
  }

  // xiti call
  if(xitiName != null) {
    xt_med('C','5',xitiName,'S');
  }

  // redirection to wengo tracked url
  window.open(urlWengo+trackWengo).focus();
}

/**
 * unespaceEntities
 *
 * @param cdata Data to process
 */
function unescapeEntities(cdata) {
    var buff='';
    for (var pos=0; pos<cdata.length; ) {
        if (cdata.substr(pos,'&#38;#60;'.length) == '&#38;#60;') {
              buff += '&lt;';
              pos += '&#38;#60;'.length;
        } else if (cdata.substr(pos, '&#62;'.length) == '&#62;') {
              buff += '&gt;';
              pos += '&#62;'.length;
        } else if (cdata.substr(pos, '&amp;amp;'.length) == '&amp;amp;') {
              buff += '&amp;';
              pos += '&amp;amp;'.length;
        } else if (cdata.substr(pos, '&amp;#39;'.length) == '&amp;#39;') {
              buff += '&#39;';
              pos += '&amp;#39;'.length;
        } else if (cdata.substr(pos, '&#34;'.length) == '&#34;') {
              buff += '&quot;';
              pos += '&#34;'.length;
        } else if (cdata.substr(pos, '&amp;'.length) == '&amp;') {
            buff += '&';
            pos += '&amp;'.length;
        } else  {
              buff += cdata.substr(pos, 1);
              ++pos;
        }
    }
    return buff;
}


/**
 * Write a popup (promo)
 */
function writePopup(url, width, height, wait, cookie_name, cookie_duration, probability, scrollbars) {
  // Default parameters
  if (arguments.length < 8) scrollbars = 0;
  if (arguments.length < 7) probability = 1; // Should be betwen 0 and 1
  if (arguments.length < 6) cookie_duration = null; // In days
  if (arguments.length < 5) cookie_name = 'popup';
  if (arguments.length < 4) wait = 0;

  // If cookie is present, popup must not be displayed
  if (document.cookie.indexOf(cookie_name) != -1)
  return;

  // If random (between 0 and 1) is over probability, popup must not be displayed
  if (Math.random() >= probability)
  return;

  // Build a cookie to prevent other display
  var c = cookie_name + '=1;Path=/';
  if (cookie_duration != null) {
    var d = new Date();
    d.setTime(d.getTime() + (cookie_duration*24*60*60*1000));
    c = c + ';expires=' + d.toGMTString();
  }
  document.cookie = c; 

  // Open popup
  setTimeout('popPromo(\"' + url + '\", ' + width + ', ' + height + ', \'' + scrollbars + '\')', Math.max(wait, 1));
}



/***********************************
POPUNDER
***********************************/

function ggr(pu_u,pu_m,pu_w,pu_h,pu_c,pu_l,pu_p,pu_hh,pu_n,pu_e,pu_hhh,pu_ta, debug) {
  ggr2(pu_u, pu_m, pu_w, pu_h, pu_c, pu_l, pu_n, pu_p, pu_hhh, pu_e, pu_hh, false, pu_ta, debug);
}

function ggr2(pu_u, pu_m, pu_w, pu_h, pu_c, pu_l, pu_n, pu_p, pu_hhh, pu_e, pu_hh, pu_ad, pu_ta, debug) {
  var cpu = PM.Cookie.get(pu_c);
  var lastTrackId = PM.Cookie.getParam("pm", "lasttracking");

  // Test condamned popunder
  if(cpu != null) {
    if(cpu < 0) return;
    // cookie update
    cpu = parseInt(cpu) + 1;
  }
  else {
    // init cpu
    cpu = 0;
  }

  var puTestsNeeded = (cpu == 0);

  var arrExclTracks = [];
  var arrInclTracks = [];
  var arrRefNat = ["google","yahoo","search.live.com","search.msn","search.ke.voila.fr","www.altavista.com","search.free.fr","search.lycos.com"];

  
  // Execution of TESTS
  if(puTestsNeeded) {
    /****************************************
     * Blocking tests
     ***************************************/
    
    // New price user
    if(pu_hhh) {
      var cpm = PM.Cookie.get("pm");
      if(cpm != null) {
        // get last track timetamp to test with now date
        lastTrackTs = PM.Cookie.getParam("pm", "trackingts");
        var now_date = new Date();
        // if cookie date and now date are same, so this is a new user
        var diff = Math.abs(lastTrackTs-now_date.getTime());
        // compare the two dates with 10 sec of tolerance
        var sameDate = (diff >= 0 && diff <= 10000);
        if(sameDate == false) {
          if(debug) {
            // mode debug
            PM.Cookie.set("pu_debug", ": L'utilisateur n'est pas un nouvel utilisateur PM!");
          }
          // We condamn popunder display
          PM.Cookie.set(pu_c, -1, pu_l);
          return;
        }
      }
    }

    // Proba test
    if((Math.random() * 100) >= pu_p) {
         if(debug) {
          // mode debug
          PM.Cookie.set("pu_debug", ": Le test de proba a échoué!");

        }
        // We condamn popunder display
        PM.Cookie.set(pu_c, -1, pu_l);
        return;
    }

    // Tracking Exclusion test if necessary
    if(pu_e) {
        var bbExclTracks = false;
        // Test the last tracking id is excluded
        for(var i = 0; i < arrExclTracks.length; ++i) {
          if(arrExclTracks[i] == lastTrackId)
            bbExclTracks = true;
        }
        // test liens sponsos : si 7xxx, pas de popunder
        var matchTrackingLS = new RegExp('^'+PM.Constants.SL.trackingCodeRegExp+'$');
        if (matchTrackingLS .exec(lastTrackId) != null) bbExclTracks = true;
        if(lastTrackId != null && bbExclTracks) {
          if(debug) {
            // mode debug
            PM.Cookie.set("pu_debug", ": Le tracking "+lastTrackId+" est exclu!");
          }
          // We condamn popunder display
          PM.Cookie.set(pu_c, -1, pu_l);
          return;
        }
    }
    
    
    /***********************************************
     * 3 access tests (complementary tests):
     *  - direct acces
     *  - from ref nat
     *  - with tracking

     **********************************************/
     
    // Natural referencement test
    var ref = document.referrer;
    var refNatRequired  = pu_hh;
    var refNatFound = false;
    if(ref != null && !PM.Util.getInterrogationUrlParam("t")) {
      // Get domain name with the url referer
      var matcher = new RegExp("^[\\w]{2,6}:\\/\\/([\\w\\d\\.\\-]+).*$");
      var arrMatches = matcher.exec(ref);
      // 1 domain finded
      if(arrMatches && arrMatches.length == 2) {
        var domainName = arrMatches[1];
        // Test if the referer domain is from natural referencement
        for(var i = 0; i < arrRefNat.length; ++i) {
          if(domainName.indexOf(arrRefNat[i]) != -1) {
            refNatFound = true;
            break;
          }
        }
      }
    }

    // Tracking test if necessary
    if (typeof(pu_ta) == "boolean") {
      pu_ta = pu_ta ? arrInclTracks : null;
    }
    var trackingRequired = (pu_ta != null && pu_ta.length > 0);
    var allTrackingAllowed = (pu_ta != null && pu_ta.length == 1 && pu_ta[0] == 'all');
    var trackingRequiredFound = false;
    if(trackingRequired) {
      if(lastTrackId != null) {
        if(allTrackingAllowed) { 
          trackingRequiredFound = true;
        }
        else {
          for(var i=0; i<pu_ta.length; ++i) {
            if(lastTrackId == pu_ta[i]) {
              trackingRequiredFound = true;
              break;
            }
          }
        }
      }
    }
    
    var displayPU = false;
    var directAccessRequired = pu_ad;
    var trackingExistingInUrl = (lastTrackId != null);
    if(refNatRequired       && refNatFound)                                 { displayPU = true; }
    if(trackingRequired     && trackingRequiredFound)                       { displayPU = true; }
    if(directAccessRequired && !refNatFound     && !trackingExistingInUrl) { displayPU = true; }
    if(!refNatRequired      && !trackingRequired && !directAccessRequired)   { displayPU = true; }
    
    if(!displayPU) {
      if(debug) {
        // mode debug
        PM.Cookie.set("pu_debug",pu_c+"_refNatRequired_"+refNatRequired+"__refNatFound_"+refNatFound+"__trackingRequired_"+trackingRequired+"__trackingRequiredFound_"+trackingRequiredFound+"__directAccessRequired_"+directAccessRequired+"__directAccessFound_"+(!refNatFound && !trackingExistingInUrl));
      }
      // We condamn popunder display
      PM.Cookie.set(pu_c, -1, pu_l);
      return;
    }
  }

  // Test cpu value with ncr
  if(cpu < pu_n) {
    PM.Cookie.set(pu_c, cpu, pu_l);
    return;
  }
  else if(cpu == pu_n) {
    if(debug) {
      // mode debug
      PM.Cookie.set("pu_debug", "Le_nb_de_clicks_requis_a_ete_atteint");
    }
    // We condamn popunder display
    PM.Cookie.set(pu_c, -1, pu_l);
  }

  xt_med('C','0','Ggr2::Before::'+pu_c,'S');

  if(pu_m == "pop") {
    win=window.open('', 'pump', 'toolbar=no,location=no, status=0, menubar=0, scrollbars=yes, location=no, resizable=no, width=' + pu_w + ', height=' + pu_h);
  }
  else {
    win=window.open('', 'pump', 'toolbar=yes,location=yes, status=1, menubar=1, scrollbars=yes, location=yes, resizable=yes, width=' + pu_w + ', height=' + pu_h);
  }
  win.resizeTo(pu_w, pu_h);
  win.document.location.href = pu_u;
  win.blur();

  xt_med('C','0','Ggr2::After::'+pu_c,'S');
}

/**
 * Tools for promotions (3WRégie)
 *
 * @base PM
 */
PM.Promos = {}

PM.Promos.adFormat = {
  BANNER_CUSTOM_SHOP: 13898,
  BANNER: 7005, 
  SQUARE_300: 6788,
  SQUARE_2_300: 6792,
  SQUARE_3_300: 6873,
  SQUARE_4_300: 6875,
  BUTTON_1_300: 7010,
  BUTTON_2_300: 7011,
  BUTTON_1_120: 7006,
  BUTTON_2_120: 7007,
  BUTTON_3_120: 7008,
  BUTTON_4_120: 7009,
  DELIVERY: 8628,
  DELIVERY_BOTTOM: 12452,
  BUTTON_1_223: 8622,
  BUTTON_2_223: 8623,
  BUTTON_3_223: 8624,
  BUTTON_4_223: 8625,
  BUTTON_5_223: 14135,
  BUTTON_6_223: 14136,
  BODY: 6737,
  MEGABANNER_HP: 8620,
  MEGABANNER_MIDDLE: 8621,
  MVNO: 8626,
  TG: 8627,
  TAB: 8618,
  EVENT: 8700,
  SYNERGY_1: 8745,
  SYNERGY_2: 8746,
  BUTTON_GEOLOC_1: 10053,
  BUTTON_GEOLOC_2: 10054,
  OVERLAY: 6793,
  INTERSTITIEL: 10150,
  HEADER1: 11089,
  HEADER2: 11090,
  HEADER3: 11091,
  HEADER_EVENT: 11243,
  BACKGROUND: 6738
}

/**
 * Promotion channels
 *
 * @base PM.Promos
 */
PM.Promos.PromoChannels = {}

/**
 * Get promotion channel
 *
 * @param family the current familly
 * @param format format of the promotion
 * @param xiti   xiti label
 *
 * @base PM.Promos
 */
PM.Promos.getPromoChannel = function(family, format, categories) {
  var value = '';
  if (categories!=null && categories.indexOf('accessoires-auto') != -1) {
    family = 'auto_acc';
  }
  var values = PM.Promos.PromoChannels[family];

  if (values) {
    if (format) {
        value = values[format];
    } else {
        value = values[0];
    }
  }

  return value;
}

timers = {};

sas_tmstp=Math.round(Math.random()*10000000000);
sas_masterflag=1;
PM.Promos.generate = function(pageid, formatid, placeholder) {
  if (typeof(placeholder) != "undefined" && !$(placeholder)) return;
  var secure = (PM.Context.get('https') == true) ? "s" : "";

  timers[formatid] = new PM.Debug.Timer('Promo[' + pageid + '/' + formatid + ']', 3000);
  timers[formatid].start();

  if (sas_masterflag==1) {sas_masterflag=0;sas_master='M';} else {sas_master='S';};
  document.write('<scr'+'ipt id="SmartScr' + formatid + '" src="http' + secure + '://ww381.smartadserver.com/call/pubj/15937/' + pageid + '/' + formatid + '/' + sas_master + '/' + sas_tmstp + '/' + escape(PM.Context.getFormattedCriterias()) + '?"></scr'+'ipt>');
}

PM.Promos.move = function(formatid, placeholder, options) {
  if (typeof(placeholder) != "undefined" && placeholder != null && !$(placeholder)) return;
  try {
    var scr = document.getElementById("SmartScr" + formatid);
    scr.parentNode.removeChild(scr);
    var secureDiv = $(placeholder + "Bottom");
    hasContent = PM.jq("div,a,iframe,p,span,object,embed", $(placeholder + "Bottom")).length > 0; // si Smart a retourné quelque chose
    if (typeof(PM.Spot) != "undefined" && typeof(PM.Spot.SmartServer) != "undefined") PM.Spot.SmartServer.log(placeholder, hasContent, formatid);
    if (hasContent) {
      PM.Dom.removeChildren($(placeholder));
      $(placeholder).appendChild(secureDiv);
      var className = PM.Util.getOption(options, "className", null);
      if (className != null) {
        PM.Dom.Class.add($(placeholder), className);
      }
      var style = PM.Util.getOption(options, "style", null);
      if (style != null) {
        PM.jq($(placeholder)).css(style);
      }
    }
    timers[formatid].stop();
  } catch(e) {
    PM.Debug.log(e);
  }
}

PM.Promos.getPageId = function(page) {
  var pageId = "";

  try {
    pageId = eval("PM.Promos.pagesId." + page);
  } catch(e) {
    PM.Debug.log(e);
  }

  return pageId;
}

PM.Promos.add = function(pageId, formatId, target, options) {
  if (typeof(target) != "undefined" && target != null && !$(target)) return;
  if (typeof(PM.Promos.pages) == "undefined") PM.Promos.pages = {};
  if (typeof(PM.Promos.pages[pageId]) == "undefined") PM.Promos.pages[pageId] = {};
  
  var targetName = PM.Util.getOption(options, "name", target);
  PM.Promos.pages[pageId]["f" + formatId] = {"target": target, "options": options, "name": targetName};
}

PM.Promos.oneCall = function() {
  var pageIdCount = 0;
  var maxFormatsForPageCount = 0;
  
  for (pageId in PM.Promos.pages) { // choix des promos à récupérer
    var page = PM.Promos.pages[pageId];
    var formatsForPageCount = 0;
    for (formats in page) formatsForPageCount ++;
    if (formatsForPageCount > maxFormatsForPageCount) {
      maxFormatsForPageCount = formatsForPageCount;
      PM.Promos.formats = page;
      PM.Promos.pageId = pageId;
    }
    pageIdCount++;
  }
  
  if (pageIdCount > 1) PM.Debug.log("Warning : more than 1 pageId for AdServer OneCall (total : " + pageIdCount + "). Choosing pageId " + PM.Promos.pageId + " (more formats for this page).");
  
  // gestion du one call
  var formatIds = "";
  for (key in PM.Promos.formats) {
    formatIds += key.slice(1) + ",";
  }
  if (formatIds == "") return;
  formatIds = formatIds.slice(0,formatIds.length-1);
  
  var secure = (PM.Context.get('https') == true) ? "s" : "";
  document.write('<scr'+'ipt src="http' + secure + '://ww381.smartadserver.com/call2/pubjall/15937/' + PM.Promos.pageId + '/' + formatIds + '/' + sas_tmstp + '/' + escape(PM.Context.getFormattedCriterias()) + '?"></scr'+'ipt>');
}

PM.Promos.handleOneCallResults = function() {
  if (typeof(sas_manager) == "undefined") return;

    // on parcourt l'ensemble des pubs retournées par la fonction OneCall pour les afficher
    var formats = sas_manager.formats

    // Parcourt de tous les formats
    for (key in PM.Promos.formats) {
      // on cherche le format dans Smart
      var smartAd = formats[key];
      if (smartAd) { // si une pub a été trouvée dans la réponse Smart

        var targetName = PM.Promos.formats[key].name;
        try { 
          var scriptUrl = smartAd.scriptURL.call();

          var placeholder = PM.Promos.formats[key].target;
          if(scriptUrl.substr(1,6) == "iframe") {
            PM.Dom.removeChildren($(placeholder));
            $(placeholder).innerHTML = scriptUrl;
            PM.Promos.applyOptions(placeholder, PM.Promos.formats[key].options);

            if (typeof(PM.Spot) != "undefined" && typeof(PM.Spot.SmartServer) != "undefined") PM.Spot.SmartServer.log(targetName, true, key.slice(1));
            delete PM.Promos.formats[key];
          } else { // c'est un script, on l'écrit
            document.write(scriptUrl);
          }
        } catch(e) {
          PM.Debug.log("AdServer Error - handleOneCallResults function :", PM.Debug.Type.INFO);
          PM.Debug.log(e);
	  if (typeof(PM.Spot) != "undefined" && typeof(PM.Spot.SmartServer) != "undefined") PM.Spot.SmartServer.log(targetName  + " KO", false, key.slice(1));
	  delete PM.Promos.formats[key];
        }

      } else { // la pub n'a pas été trouvée
        if (typeof(PM.Spot) != "undefined" && typeof(PM.Spot.SmartServer) != "undefined") PM.Spot.SmartServer.log(PM.Promos.formats[key].name, false, key.slice(1));
        delete PM.Promos.formats[key];
      }
    }

}


PM.Promos.isAd = function(obj) {
  return obj && (obj.tagName == "DIV" || obj.tagName == "A" || obj.tagName == "OBJECT" || obj.tagName == "TABLE")
}

PM.Promos.findAdNumber = function(num) {
  var i = -1;
  var currentChild = PM.Dom.firstChild($("SmartAllResults"));
  while(i < num) {
    if (i > -1) currentChild = PM.Dom.nextObject(currentChild);
    while(currentChild && !PM.Promos.isAd(currentChild)) {
      currentChild = PM.Dom.nextObject(currentChild);
    }
    i++;
  }
  return currentChild;
}

PM.Promos.moveAll = function() {
    
    var count = 0;
    for (key in PM.Promos.formats) { // premier parcourt pour remplir la map
      PM.Promos.formats[key].content = PM.Promos.findAdNumber(count);
      count++;
    }

    for (key in PM.Promos.formats) { // second parcourt pour afficher les promos
      try {
        var adContent = PM.Promos.formats[key].content;
        var options = PM.Promos.formats[key].options;
        var specificMoveFct = PM.Util.getOption(options, "move", null);
        var placeholder = PM.Promos.formats[key].target;

        if (specificMoveFct != null) { // fonction de déplacement spécifique
          specificMoveFct.call();
        } else {
          $(placeholder).appendChild(adContent);
        }

        PM.Promos.applyOptions(placeholder, options);

        if (typeof(PM.Spot) != "undefined" && typeof(PM.Spot.SmartServer) != "undefined") PM.Spot.SmartServer.log(PM.Promos.formats[key].name, true, key.slice(1));
        delete PM.Promos.formats[key];
      } catch(e) {
        PM.Debug.log("AdServer Error - moveAll function :", PM.Debug.Type.INFO);
        PM.Debug.log(e);
      }
    }

}

PM.Promos.applyOptions = function(placeholder, options) {
  placeholder = $(placeholder);
  var className = PM.Util.getOption(options, "className", null);
  if (className != null) {
    PM.Dom.Class.add(placeholder, className);
  }
  var style = PM.Util.getOption(options, "style", null);
  if (style != null) {
    PM.jq(placeholder).css(style);
  }
}



/**
 * Promotion page Id (3Wrégie)
 *
 * @base PM.Promos
 */
PM.Promos.pagesId = {
  books: {nav: 115432, fp: 115434, home: 115431, slideshow: 115436},
  music: {nav: 115482, fp: 115481, home: 115438, slideshow: 115439},
  games: {nav: 115448, fp: 115449, home: 115447, slideshow: 115450},
  video: {nav: 115443, fp: 115444, home: 115442, slideshow: 115445},
  baby: {nav: 115486, fp: 115487, home: 115485, slideshow: 115488},
  hifi: {nav: 115462, fp: 115463, home: 115461, slideshow: 115464},
  computer: {nav: 115458, fp: 115480, home: 115457, slideshow: 115459},
  sport: {nav: 115472, fp: 115473, home: 115471, slideshow: 115474},
  white: {nav: 115467, fp: 115468, home: 115466, slideshow: 115469},
  clothing: {nav: 115477, fp: 115478, home: 115476, slideshow: 115479},
  electronics: {nav: 115453, fp: 115454, home: 115452, slideshow: 115455},
  wine: {nav: 115495, fp: 115496, home: 115494, slideshow: 115497},
  sell_assist: 115593,
  sell: 115592,
  review: 115596,
  shop: 115590,
  help: 115594,
  homepage: 115440,
  my_account: 115595,
  my_account_hp: 139372,
  search: 115589,
  all_products: 115591,
  event: 140429,
  header: 140423,
  checkout_success: 139373,
  selling_process: 142341,
  pricetv: 159842
}

var seller_ministite_url_alias = "op/astuces_vendeur";
gotoSellerMinisite = function(xiti_tag) {

  var popup = false;
  var url_default = "/";
  var url            = "/info/no/" + seller_ministite_url_alias;
  var url_popup  = "/info/co/" + seller_ministite_url_alias;
  var anchor = "";

  switch(xiti_tag) {
    case 'MonCompte::PasVendeur::MiniSiteVendeur':
      popup = true;
      anchor = "hp_pas_vendeur";
      break;
    case 'MonCompte::DejaVendeur::MiniSiteVendeur':
      break;
    case 'Inventaire::MiniSiteVendeur':
      popup = true;
      break;
    case 'ToutesMesVentes::MiniSiteVendeur':
      anchor = "hp_deja_vendeur";
      break;
    case 'MonCompte::DetailVente::MiniSiteVendeur':
      popup = true;
      anchor = "reussir_premiere_vente";
      break;
    case 'Vendre::DejaVendeurBlocDroite::MiniSiteVendeur':
      popup = true;
      break;
    case 'Vendre::NouveauVendeurEtape2::MiniSiteVendeur':
      break;
    case 'Assistance::TrucsAstuces::MiniSiteVendeur':
      break;
    case 'VendezLeVotre::MiniSiteVendeur':
      popup = true;
      anchor = "creer_annonce_ideale";
      break;
    case '[PageConcernée]::BlocMiseEnVenteRapide::MiniSiteVendeur':
      popup = true;
      break;
    case 'ConfirmationCreationAnnonce::MiniSiteVendeur':
      popup = true;
      anchor = "cinq_conseils";
      break;
    case 'Assistance::AideALaVente::MiniSiteVendeur':
      popup = true;
      break;
    case 'ConfirmationAchat::PoursuivreNavigation::OperationCoupDouble':
      break;
    default:
      url = url_default;
      break;
  }
  
  xt_med('C','5',xiti_tag,'N');
  
  if (anchor != "") anchor = "#page="+anchor;

  if(popup == true) {
    var popup_param = (anchor != "")? "&popup=true": "#popup=true";
    win=window.open(url_popup + anchor + popup_param, '', 'width=965,height=525,toolbar=no,location=no, status=0, menubar=0, scrollbars=yes, location=no, resizable=no');
  }
  else {
    window.location = url + anchor;
  }
}

/************************
 ************************
 * AdServer Content
 ************************
************************/

// Set adServer context
PM.adServer = {};


// Ad array to store all the add to define in the page
PM.adServer.ad = [];

// Array to store all the google tag refreshable 
PM.adServer.loadedAdUnits = [];

// Set the tag array
PM.adServer.tag = {};

PM.adServer.isPmchRakutenAdsDisplay = false;

// Set the placement array
PM.adServer.tag.placement = {
	BANDEAU_PREMIUM:{
		name:"bandeau_premium", 
		size:[728, 90],
		isBooked:true
	},
	HABILLAGE:{
		name:"habillage", 
		size:[1, 1],
                isBooked:false
	},
	GEOLOC:{
		name:"geoloc", 
		size:[300, 250],
		isBooked:true
	},
	HEADER1:{
		name:"header1_PM", 
		size:[200, 100]
	},
	HEADER2:{
		name:"header2_PM", 
		size:[200, 100]
	},
	BL_BANDEAU:{
		name:"bl_bandeau_PM", 
		size:[400, 90],
		isBooked:true
	},
	BL_BANDEAU_BAS:{
		name:"bl_bandeau_bas_PM", 
		size:[400, 90],
		isBooked:true
	},
	BOUTON_BAS_1:{
		name:"bouton_bas1_PM", 
		size:[[223, 90], [467, 90]],
		isBooked:true
	},
	BOUTON_BAS_2:{
		name:"bouton_bas2_PM", 
		size:[223, 90],
		isBooked:true
	},
	BOUTON_BAS_3:{
		name:"bouton_bas3_PM", 
		size:[[223, 90], [467, 90]],
		isBooked:true
	},
	BOUTON_BAS_4:{
		name:"bouton_bas4_PM", 
		size:[223, 90],
                isBooked:false
	},
	BOUTON_GAUCHE_1:{
		name:"bouton_gauche1_PM", 
		size:[223, 90],
                isBooked:true
	},
	BOUTON_GAUCHE_2:{
		name:"bouton_gauche2_PM", 
		size:[223, 90],
		isBooked:true
	},
	BOUTON_GAUCHE_3:{
		name:"bouton_gauche3_PM", 
		size:[223, 90],
		isBooked:true
	},
	INTERSTITIEL:{
		name:"interstitiel", 
		size:[1, 1],
                isBooked:false
	},
	MEGABANNER_HP:{
		name:"megabanner_HP_PM", 
		size:[458, 241],
                booked:true
	},
	MEGABANNER_MIDDLE:{
		name:"megabanner_middle_PM", 
		size:[980, 90],
                isBooked:false
	},
	MVNO:{
		name:"MVNO_PM", 
		size:[458, 32],
               isBooked:false
	},
	ONGLET:{
		name:"onglet", 
		size:[251, 39],
		isBooked:true
	},
	PAVE:{
		name:"pave", 
		size:[[300, 250], [300, 600]],
		isBooked:true
	},
	PAVE1:{
		name:"pave1", 
		size:[[300, 250], [300, 600]],
                isBooked:false
	},
	PAVE2:{
		name:"pave2", 
		size:[[300, 250], [300, 600]],
                isBooked:false
	},
        PAVE_300_250:{
		name:"pave", 
		size:[300, 250],
                isBooked:false
	},
        PAVE_300_600:{
		name:"pave", 
		size:[300, 600],
                isBooked:false
	},
	VENTE_FLASH:{
		name:"vente_flash_PM", 
		size:[720, 190],
		isBooked:false
	},
	BODY:{
		name:"body", 
		size:[680, 125],
                isBooked:false
	},
	CONTENU_EVENEMENT:{
		name:"contenu_evenement", 
		size:[1, 1],
                isBooked:false
	},
	GIGABANNER:{
		name:"gigabanner", 
		size:[996, 48],
                isBooked:true
	},
	PMAD_CATEGORY:{
		name:"dfp-pmad-category", 
		size:[[1,1], [458,190]],
                isBooked:true
	},
	PMAD_KEYWORD:{
		name:"dfp-pmad-keyword", 
		size:[[1,1], [458,190]],
                isBooked:false
	}
};
/************************
 ************************
 * DFP Content
 ************************
************************/

// Set dfp context
PM.adServer.dfp = {};

/**
 * Display DFP div
 * @placement the placement to display
 * @isBooked (optional) this value overrides the placement one
**/
PM.adServer.dfp.displayDiv = function(placement, isBooked) {
        var style;
        if (isBooked || (typeof isBooked == 'undefined' && placement.isBooked)) {
                if (typeof placement.size[1] === 'number' && placement.size[1] % 1 == 0) {
                   style = 'style="height:'+placement.size[1]+'px"';
                } 
                else {
                   style = '';
                }
        }
        else {
                style = ' style="display:none"';
        }

	var divString="<div id='" + placement.name  + "'" + style + ">";
	divString += "<script type='text/javascript'>";
	divString += "googletag.cmd.push(function() { googletag.display('" + placement.name  + "'); })";
	divString += "\</script\>";
	divString += "</div>";
	document.write(divString);
}

/**
 * Method used to set the customCriteria from the contextJs
 * Only the value set as "criteria" in the contextJs are setted
 * Param : the googleSlot created by googletag.defineSlot for the good adUnit
 * Return : the googleSlot with all the criteria setted
**/
PM.adServer.dfp.setCustomCriteriaFromContextJs = function(googleSlot, emplacement) {
	googleSlot = googleSlot.setTargeting("oe", 'iso-8859-1');
	googleSlot = googleSlot.setTargeting("emplacement", emplacement);	
	for (key in PM.Context.data) {
		var elt = PM.Context.data[key];
		// check if it's a criteria
		if (typeof(elt.criteria) != "undefined") {
			googleSlot = googleSlot.setTargeting(key, elt.value.toString());		  
		}
	}
        /* set criteo targeting */
        if (typeof crtg_content != 'undefined' && crtg_content.length != 0) {
	   var separatorLabel = '&';
	   var separatorKeyword = '=';
	   var crtg_split = crtg_content.split(separatorLabel);
	   for (var i=1;i<crtg_split.length;i++)
	   {
	      googleSlot.setTargeting("" + (crtg_split[i-1].split(separatorKeyword))[0] + "", "" + (crtg_split[i-1].split(separatorKeyword))[1] + "");
	   }
        } 

        /* END set criteo targeting */
	return googleSlot;
};

PM.adServer.dfp.defineUnitsInLine = function(pagesAndPlacements) {
	var googleUnit = {};
    googletag.cmd.push(function() {
	for(var i=0;i<pagesAndPlacements.length;i++) {
		googleUnit = googletag.defineUnit('/5263174/PriceMinister_FR/' + pagesAndPlacements[i].page + pagesAndPlacements[i].placement.name , pagesAndPlacements[i].placement.size, pagesAndPlacements[i].page + pagesAndPlacements[i].placement.name).addService(googletag.pubads());
		PM.adServer.dfp.setCustomCriteriaFromContextJs(googleUnit, pagesAndPlacements[i].placement.name);              
                PM.adServer.loadedAdUnits[pagesAndPlacements[i].page + pagesAndPlacements[i].placement.name] = googleUnit;             
	}
	for(var i=0;i<pagesAndPlacements.length;i++) {
		googletag.display(pagesAndPlacements[i].page + pagesAndPlacements[i].placement.name);
	}
    });
}

/**
 * Permet le rechargement des publicités
**/
PM.adServer.refreshPlacement = function (placementIds) {
  for(var googleTab in PM.adServer.loadedAdUnits) {
    if($j.inArray(googleTab , placementIds) != -1) {
      googletag.pubads().refresh([PM.adServer.loadedAdUnits[googleTab]]);
    }
  }
}


/**
 * Adds a xiti tracking (autoPromoId) when clicking on the elt ID in the iFrame specified by iframeId
**/
PM.adServer.dfp.autopromo = function(autoPromoId, iframeId, elt) {
	PM.adServer.dfp.addEvent(iframeId, elt, "click", PM.Statistics.autopromoClick.bindObj(null, autoPromoId));
	return PM.Statistics.autopromoView(autoPromoId);
}

/**
 * cf PM.adServer.dfp.autopromo
**/
PM.adServer.dfp.addEvent = function(iframeId, obj, evType, fn, preventDefault){
	PM.Debug.store(["Ajout d'un énement", arguments], PM.Debug.Type.INFO); // log de l'ajout d'énement

	tempObj = window.frames[iframeId].document.getElementById(obj);

	if (!tempObj) {
		PM.Debug.log(["[Erreur] : Ajout d'énement sur un objet n'existant pas (" + obj + ")", arguments], PM.Debug.Type.DEBUG);
		return false; // l'objet n'existe pas
    	}

	if (tempObj.addEventListener){
   		if (evType != "mouseleave") { // "PM Image Ajax" DFP script goes here
        		if (preventDefault) tempObj.addEventListener(evType, function(e) { PM.Util.preventDefault(e); }, false);
        		tempObj.addEventListener(evType, fn, false);
     		 } else {
        		tempObj.addEventListener("mouseout", function(evt) {
          			if (!PM.Dom.withinElement(evt.relatedTarget, this.obj)) {
           				 fn.call(null, evt);
          			}
  	      		}.bindObj({obj: tempObj}), false);
		}
		return true; 
	} else if (tempObj.attachEvent){
      		if (preventDefault) tempObj.attachEvent("on"+evType, function(e) { PM.Util.preventDefault(e); })
      		var r = tempObj.attachEvent("on"+evType, fn);
      		return r; 
    	} else { 
     		return false; 
    	}	

}

/**
** Method for Carousel
**/

var loadedSlideInCarouselBresilien = [];						
var loadedSlideInCarouselPmch = [];

var loadSlideForCarousel = function(carousel_iframe){
	switch (carousel_iframe.carouselType)
	{
		case "PMCH":
			loadSlideForCarouselPmch(carousel_iframe);
		break;
		case "bresilien":
			loadSlideForCarouselBresilien(carousel_iframe);
		break;
		default:
		break;
	}				
}			

function loadSlideForCarouselBresilien(carousel_iframe){				
	$j("#wrap").find("li").each(function(index, element){
		if ($j(element).attr("jcarouselindex") == carousel_iframe.carouselPosition) {
			// replace the link
			$j(element).find("a").attr("href", $j(element).find("a").attr("href").replace("LINK", carousel_iframe.imageClickUrl ));
			// replace the image
			$j(element).find("img").attr("src", carousel_iframe.image);
		}
	});				
}

function loadSlideForCarouselPmch(carousel_iframe){
	// Set the link
	$j("#slide"+carousel_iframe.carouselPosition).attr("href", $j("#slide"+carousel_iframe.carouselPosition).attr("href").replace("LINK", carousel_iframe.imageClickUrl));
	// Set the image
	$j("#slide"+carousel_iframe.carouselPosition).find("img").attr("src", carousel_iframe.image);			
};

var callSlideForCarouselPmch = function(number) {					
// get c_url var define in the oneCall tag
var emplacement = c_url;
if (emplacement == "") {
emplacement = "homepage";
}
if (!loadedSlideInCarouselPmch[number]) {				
	googletag.cmd.push(function() { 				
		var googleUnit= googletag.defineUnit('/5263174/PriceMinister_FR/carrousel/carrousel_PMCH', [685, 190], 'carousel_pmch_slot_'+number).addService(googletag.pubads()).setTargeting("carousel_position", number);
		PM.adServer.dfp.setCustomCriteriaFromContextJs(googleUnit, emplacement);
		googletag.display('carousel_pmch_slot_'+number); 				
		loadedSlideInCarouselPmch[number] = true;
	});
}
}	

var callSlideForCarouselBresilien = function(firstSlide, lastSlide) {			
// get c_url var define in the oneCall tag
var emplacement = c_url;
if (emplacement  == "") {
emplacement = "homepage";
}
	googletag.cmd.push(function() {					
		for (number = firstSlide; number <= lastSlide; number++) {					
			if (!loadedSlideInCarouselBresilien[number]) {							
					var googleUnit = googletag.defineUnit('/5263174/PriceMinister_FR/carrousel/carrousel_bresilien', [200, 100], 'carousel_bresilien_slot_'+number).addService(googletag.pubads()).setTargeting("carousel_position", number);
                                        PM.adServer.dfp.setCustomCriteriaFromContextJs(googleUnit, emplacement);		
					googletag.display('carousel_bresilien_slot_'+number); 
					loadedSlideInCarouselBresilien[number] = true;								
			}
		}						
	});
};	

var loadRakutenAdsImage = function(){
    if ($j("#rakuten-ads-image-jahia-to-replace").length) {
        var node = $j("#rakuten-ads-image-jahia-to-replace");
        var html = rakutenAdsImageJahiaHtmlToDisplay;
    }
    else {
        var node = $j("#rakuten-ads-image-to-replace");
        var html = rakutenAdsImageHtmlToDisplay;
    }

    html = html .replace(/offerRootUrl/g, adDataTable['link']);
    html = html .replace(/imageUrl/g, adDataTable['image_url']);
    $j(node).replaceWith(html);    
    displayPushProduitPmch();
};

var loadRakutenAdsProduct = function(){    
    if (typeof(adDataTable) != 'undefined') {	
	if ($j(".RAds").length) {
       	    var node = $j(".RAds");
            var html = rakutenAdsProductJahiaHtmlToDisplay;
	    if (adDataTable['product_condition'] == 'Neuf') {
		html = html.replace(/advtypeClass/g, "NewPricePMC2");								
	    }
	    else {
	        html = html.replace(/advtypeClass/g, "NewPricePMC2-R");								
            }

	}
	else {
	    var node = $j("#rakuten-ads-produit-to-replace");
            var html = rakutenAdsProductHtmlToDisplay;
	    if (adDataTable['product_condition'] == 'Neuf') {
		html = html.replace(/advtypeClass/g, "advtype_new");								
	    }
	    else {
		html = html.replace(/advtypeClass/g, "advtype_used");								
	    }
	}        
	html = html.replace(/offerRootUrl/g, adDataTable['link']);
	html = html.replace(/productTitle/g, adDataTable['title']);
	html = html.replace(/productCaption/g, adDataTable['caption']);
	html = html.replace(/imageUrl/g, adDataTable['image_url']);
	html = html.replace(/advertCondition/g, adDataTable['product_condition']);
	html = html.replace(/sellerNickname/g, adDataTable['login']);
	html = html.replace(/shopUrl/g, adDataTable['shop_url']);	
	html = html.replace(/advertPrice/g, adDataTable['price']);
	html = html.replace(/rsp/g, adDataTable['rsp']);
	html = html.replace(/TxtSuperPoints/g, "TxtSuperPoints");
	
       $j(node).html(html);
	if ($j(".RAds").length) {
	    $j(".BlocContentPMC2_2").find(".BlocProductPMC2_4").last().remove();
            PM.adServer.isPmchRakutenAdsDisplay = true;
	}
    }
    displayPushProduitPmch();
};

var displayPushProduitPmch = function() {
    if ($j(".BlocContentPMC2_2").length) {
        $j(".BlocContentPMC2_2").show();
    }
};

// Display the PMCH push produit, if we dont have a Rakuten-Ads
setTimeout(displayPushProduitPmch, 5000);
PM.adServer.tag.pages = {
 	home:"home/home_",
	wine:{
		lp:"art_collection/lp_art_collection/lp_art_collection_",
		fp:"art_collection/fp_art_collection/fp_art_collection_",
		da:"art_collection/da_art_collection/da_art_collection_",
		home:"art_collection/home_art_collection/home_art_collection_",
		di:"art_collection/di_art_collection/di_art_collection_"
	},
	video:{
		lp:"dvd_blueray/lp_dvd_blueray/lp_dvd_blueray_",
		fp:"dvd_blueray/fp_dvd_blueray/fp_dvd_blueray_",
		da:"dvd_blueray/da_dvd_blueray/da_dvd_blueray_",
		home:"dvd_blueray/home_dvd_blueray/home_dvd_blueray_",
		di:"dvd_blueray/di_dvd_blueray/di_dvd_blueray_"
	},
	baby:{
		lp:"enfant/lp_enfant/lp_enfant_",
		fp:"enfant/fp_enfant/fp_enfant_",
		da:"enfant/da_enfant/da_enfant_",
		home:"enfant/home_enfant/home_enfant_",
		di:"enfant/di_enfant/di_enfant_"
	},
	hifi:{
		lp:"image_son/lp_image_son/lp_image_son_",
		fp:"image_son/fp_image_son/fp_image_son_",
		da:"image_son/da_image_son/da_image_son_",
		home:"image_son/home_image_son/home_image_son_",
		di:"image_son/di_image_son/di_image_son_"
	},
	computer:{
		lp:"informatique/lp_informatique/lp_informatique_",
		fp:"informatique/fp_informatique/fp_informatique_",
		da:"informatique/da_informatique/da_informatique_",
		home:"informatique/home_informatique/home_informatique_",
		di:"informatique/di_informatique/di_informatique_"
	},
	games:{
		lp:"jeux_video/lp_jeux_video/lp_jeux_video_",
		fp:"jeux_video/fp_jeux_video/fp_jeux_video_",
		da:"jeux_video/da_jeux_video/da_jeux_video_",
		home:"jeux_video/home_jeux_video/home_jeux_video_",
		di:"jeux_video/di_jeux_video/di_jeux_video_"
	},
	books:{
		lp:"livre/lp_livre/lp_livre_",
		fp:"livre/fp_livre/fp_livre_",
		da:"livre/da_livre/da_livre_",
		home:"livre/home_livre/home_livre_",
		di:"livre/di_livre/di_livre_"
	},
	white:{
		lp:"maison_electromenager/lp_maison_electromenager/lp_maison_electromenager_",
		fp:"maison_electromenager/fp_maison_electromenager/fp_maison_electromenager_",
		da:"maison_electromenager/da_maison_electromenager/da_maison_electromenager_",
		home:"maison_electromenager/home_maison_electromenager/home_maison_electromenager_",
		di:"maison_electromenager/di_maison_electromenager/di_maison_electromenager_"
	},
	clothing:{
		lp:"mode/lp_mode/lp_mode_",
		fp:"mode/fp_mode/fp_mode_",
		da:"mode/da_mode/da_mode_",
		home:"mode/home_mode/home_mode_",
		di:"mode/di_mode/di_mode_"
	},
	music:{
		lp:"musique/lp_musique/lp_musique_",
		fp:"musique/fp_musique/fp_musique_",
		da:"musique/da_musique/da_musique_",
		home:"musique/home_musique/home_musique_",
		di:"musique/di_musique/di_musique_"
	},
	sport:{
		lp:"sport_loisirs/lp_sport_loisirs/lp_sport_loisirs_",
		fp:"sport_loisirs/fp_sport_loisirs/fp_sport_loisirs_",
		da:"sport_loisirs/da_sport_loisirs/da_sport_loisirs_",
		home:"sport_loisirs/home_sport_loisirs/home_sport_loisirs_",
		di:"sport_loisirs/di_sport_loisirs/di_sport_loisirs_"
	},
	electronics:{
		lp:"tel_pda/lp_tel_pda/lp_tel_pda_",
		fp:"tel_pda/fp_tel_pda/fp_tel_pda_",
		da:"tel_pda/da_tel_pda/da_tel_pda_",
		home:"tel_pda/home_tel_pda/home_tel_pda_",
		di:"tel_pda/di_tel_pda/di_tel_pda_"
	},
	boutique:"boutique/boutique_",
	confirmation_paiement:"confirmation_paiement/confirmation_paiement_",
	evenement:"evenement/evenement_",
	faq_aide:"faq_aide/faq_aide_",
	mon_compte:{
		bon_livraison:"mon_compte/mon_compte_bon_livraison/mon_compte_bon_livraison_",
		hp:"mon_compte/mon_compte_hp/mon_compte_hp_",
		mes_paiements:"mon_compte/mon_compte_mes_paiements/mon_compte_mes_paiements_",
                toutes_les_pages:"mon_compte/mon_compte_toutes_les_pages/mon_compte_toutes_les_pages_"
	},
	search:"search/search_",
	vente:{
		hp:"vente/vente_hp/vente_hp_",
		tunel_mev:"vente/vente_tunel_mev/vente_tunel_mev_"
	},
	toutes_les_pages:"toutes_les_pages/toutes_les_pages_"
};
