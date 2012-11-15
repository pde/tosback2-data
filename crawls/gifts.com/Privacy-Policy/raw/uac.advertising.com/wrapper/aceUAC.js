var ACE_FIF_TYPE = 0;

if (!window.ACE_AR && /#.*?site=[0-9]*?&size=[0-9]{6,8}.*?&calltype=/i.test(location.href + "")) {
 ACE_FIF_TYPE = 1;
 try {
  var nUR = location.href;
  var sp = nUR.split("#");
  var data = sp[1];
  var ACE_AR = new Object;
  if (data) {
   var vars = data.split("&");
   for (var i = 0; i < vars.length; i++) {
    var kv = vars[i], kvs = kv.split("=");
    if (kvs.length == 2 && kvs[0].indexOf("domain") == -1) {
     ACE_AR[kvs[0]] = unescape(kvs[1]);
    }
   }
  }
  ACE_AR.CallType = "J";
 } catch (e) {}
}

var REGIONS = {
 DEFAULT: 0,
 USA: 1,
 EU: 2,
 JAPAN: 3
};

var ACE_AR_Lowercase;

if (window.ACE_AR) {
 ACE_AR_Lowercase = getLowerCaseAR(ACE_AR);
}

var ACE3PopHost = "http://p.ace.advertising.com";

var ACE3Host1 = "http://beta.ace.advertising.com";

var ACE3HostAK = "http://r1.ace";

var ACE3HostAKOptout = "http://r1.ace";

var ACE3Host2;

if (ACE_AR_Lowercase) {
 ACE3Host2 = getHost2(ACE_AR_Lowercase);
}

var ACE3Default = "http://ace";

var ACE3Host1Var = "as=0";

var ACE3Host2Var = "as=1";

var ACE3NewHost = new Array;

var ACE3WinW = 0;

var ACE3WinH = 0;

var ACE3ifV = 0;

var defaultRegionHosts = {};

defaultRegionHosts[REGIONS.JAPAN] = "http://sr-r3.ace";

defaultRegionHosts[REGIONS.USA] = "http://r1.ace";

defaultRegionHosts[REGIONS.EU] = "http://r2.ace";

defaultRegionHosts[REGIONS.DEFAULT] = ACE3Host2 ? ACE3Host2 : ACE3Default;

var alternateRegionHosts = {};

alternateRegionHosts[REGIONS.JAPAN] = "http://r3ns.ace";

alternateRegionHosts[REGIONS.EU] = "http://r2ns.ace";

alternateRegionHosts[REGIONS.DEFAULT] = "http://r1ns.ace";

var balancer = [ {
 percent: 100,
 mapping: defaultRegionHosts
}, {
 percent: 0,
 mapping: alternateRegionHosts
} ];

var ACE3RTBglobalThrottle = 33;

var ACE3AllowExp;

var ACE3AV = parseInt(navigator.appVersion);

var ACE3IE = navigator.appName == "Microsoft Internet Explorer";

var ACE3NS = navigator.appName == "Netscape";

var ACE3dt = new Date;

var ACE3FVer = "0";

function ACE3CkLen(s, d) {
 var t = s.length + d.length;
 if (t > 2076) {
  var x = d.length - (t - 2076) >= 0 ? d.length - (t - 2076) : 0;
  d = d.substring(0, x);
  if (d.substr(d.length - 5).indexOf("%") != -1) {
   d = d.substring(0, d.lastIndexOf("%"));
  }
 }
 return d;
}

function ACE3CkPlg() {
 var n = navigator;
 var ua = n.userAgent.toLowerCase();
 if (ACE3IE && ua.indexOf("win") != -1) {
  try {
   try {
    var axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
    try {
     axo.AllowScriptAccess = "always";
    } catch (e) {
     ACE3FVer = 6;
    }
   } catch (e) {}
   ACE3FVer = (new ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version").replace(/\D+/g, ",").match(/^,?(.+),?$/)[1].split(",").shift();
  } catch (e) {
   ACE3FVer = 0;
  }
 } else {
  var p = n.plugins;
  if (p) {
   var l = p.length;
   if (l > 1) {
    var m = n.mimeTypes;
    var fl = m["application/x-shockwave-flash"];
    if (m && fl && fl.enabledPlugin && fl.suffixes.indexOf("swf") != -1) {
     var ds;
     var f = "Flash ";
     var fS;
     for (var i = 0; i < l; i++) {
      ds = p[i].description;
      fS = ds.indexOf(f);
      if (fS != -1) {
       var v = ds.substring(fS + 6, fS + 7);
       if (v >= 6) {
        ACE3FVer = v;
       } else {
        v = ds.substring(fS + 6, fS + 8);
        if (v >= 10) {
         ACE3FVer = v;
        }
       }
      }
     }
    }
   }
  }
 }
}

var adsComPopVar = "";

var adComPopFo = "1";

var adComDelayValue = "";

function ACE3_AdRequest(obj) {
 var w = window;
 var site = "";
 if (obj.site) {
  site = obj.site;
 } else {
  site = "100";
 }
 if (obj.exchmap != "0") {
  if (w.addEventListener) {
   w.addEventListener("load", function(event) {
    ACErtbCheck(site);
   }, false);
  } else if (w.attachEvent) {
   w.attachEvent("onload", function() {
    ACErtbCheck(site);
   });
  }
 }
 var nmVal = {
  media: "mnum",
  leadback: "betr",
  context: "ctxt",
  ip: "dmip",
  mid: "xsmemid",
  z: "zpcd",
  mn: "mn",
  zid: "zid"
 };
 var ur = "";
 var ifV = 0;
 var dr;
 var dr1 = "";
 var ht = "";
 var ct;
 var dw;
 var dynclick = "";
 var rclk = "";
 try {
  ur = escape(top.location.href);
  if (ur == "undefined") {
   ur = escape(document.referrer);
   ifV = 2;
  } else {
   if (top.location.href != location.href) {
    ifV = 1;
   }
  }
 } catch (e) {
  ur = escape(document.referrer);
  ifV = 2;
 }
 ACE3ifV = ifV;
 if (window.ACE_DREF) {
  dr1 = window.ACE_DREF;
 } else if (obj.anonymous != "1") {
  dr1 = ur;
 }
 dr = "/dref=" + escape(dr1.replace(/\//g, "%2F"));
 if (dr.indexOf(dr.length) == "%" || dr.indexOf(dr.length - 1) == "%") {
  dr = dr.substr(0, dr.lastIndexOf("%"));
 }
 if (obj.dynclick) {
  dynclick = escape(escape(obj.dynclick).replace(/\//g, "%2F"));
 }
 if (obj.rclk) {
  rclk = escape(escape(obj.rclk).replace(/\//g, "%2F"));
 }
 if (obj.allowexp >= 0) {
  ACE3AllowExp = obj.allowexp;
 }
 if (window.ACE_KeyParms) {
  window.ACE_KeyParm = ACE_KeyParms[site];
 }
 if (window.ACE_KeyParm) {
  for (var i = 0; i < ACE_KeyParm.length; i = i + 2) {
   if (ur.toUpperCase().match(ACE_KeyParm[i].toUpperCase()) != null) {
    site = ACE_KeyParm[i + 1];
    break;
   }
  }
 }
 var ot = "";
 var op = navigator.userAgent.indexOf("Opera") != -1;
 var old = 1;
 var adv = ".advertising.com";
 var alt = "Click to learn more...";
 var gl = "";
 var bnum;
 var szs = "";
 var parm = "";
 var se = -1;
 try {
  se = location.href.indexOf("https://");
 } catch (e) {}
 if ((ACE3NS || ACE3IE) && ACE3AV >= 4 && !op && !(ACE3NS && ACE3AV == 4)) {
  old = 0;
 }
 for (var n in nmVal) {
  if (obj[n] && typeof obj[n] != "function") {
   if (nmVal[n] == "mn") {
    ot += "/xsxdata=1:" + obj[n];
   } else {
    ot += "/" + nmVal[n] + "=" + obj[n];
   }
  }
 }
 if (obj.ud) {
  var zip = obj.ud.split("&");
  var zipV;
  for (var i = 0; i < zip.length; i++) {
   if (zip[i].toString().indexOf("zp=") != -1) {
    zipV = zip[i].split("=");
    zipV = zipV[1];
    ot += "/zpcd=" + zipV;
    break;
   }
  }
 }
 if (window.ACE_LOGIGNORED == 1) {
  ot += "/logignored=1";
 }
 if (obj.alttext) {
  alt = obj.alttext;
 }
 if (window.ACE_HOST && se < 0) {
  ht = window.ACE_HOST;
  gl = 1;
 }
 if (window.ACE_SHOST && se > -1) {
  ht = window.ACE_SHOST;
  gl = 1;
 }
 if (site == "712441") {
  ht = "http://ags.beta" + adv;
  gl = 1;
  obj.calltype = "IFRAME";
 }
 var pt = obj.poptype;
 var pu = obj.poponunload;
 if (gl != 1) {
  if (pt || pu) {
   ht = ACE3PopHost;
   gl = 1;
  }
  if (se > -1) {
   ht = "https://secure.ace" + adv;
   gl = 1;
  }
  if (obj.host) {
   var v = obj.host;
   ht = v.indexOf("http") == -1 ? "http://" + v : v;
   gl = 1;
  }
 }
 if (gl != 1) {
  if (obj.Class == 0) {
   ht = "http://cs.ace" + adv;
   ot += "/agv=1";
   gl = 1;
  } else if (obj.Class == 2) {
   ht = "http://cte.ace.beta" + adv;
   ot += "/cte=1";
   gl = 1;
  } else if (obj.Class == 3) {
   ht = "http://cte.ace" + adv;
   ot += "/cte=1";
   gl = 1;
  } else if (obj.Class == 4) {
   ht = "http://beta.cs.ace" + adv;
   ot += "/agv=1";
   gl = 1;
  }
 }
 if (gl != 1) {
  var rand = Math.floor(Math.random() * 100) + 1;
  if (window.ACE3NewHost && ACE3NewHost[site] != null) {
   if (rand <= ACE3NewHost[site]) {
    if (window.ACE3Host1Var) parm = "/" + ACE3Host1Var;
    ht = ACE3Host1;
   } else {
    if (window.ACE3Host2Var) parm = "/" + ACE3Host2Var;
    ht = ACE3Host2;
   }
  } else {
   var randTotal = 0;
   for (var percentobj in balancer) {
    if (balancer.hasOwnProperty(percentobj)) {
     if (rand <= balancer[percentobj].percent + randTotal) {
      ht = getValueByRegion(balancer[percentobj].mapping, obj) + adv;
      break;
     } else {
      randTotal += balancer[percentobj].percent;
     }
    }
   }
  }
 }
 if (!ht) {
  ht = ACE3Default + adv;
 }
 if (obj.bnum) {
  bnum = obj.bnum;
 } else {
  bnum = new Number(Math.floor(99999999 * Math.random()) + 1);
 }
 if (!ACE_FIF_TYPE) {
  if (!obj.calltype) {
   ct = "J";
  } else {
   ct = obj.calltype.toString().toUpperCase();
  }
  if (obj.region == "3" && ifV == 0 && !obj.calltype && ACE3IE) {
   ct = "IF";
  }
 } else {
  ct = "J";
 }
 if (ct == "IFRAME" || ct == "IF") {
  ifV = 2;
 }
 if (obj.size) {
  var sz = obj.size;
  var str = sz.toString();
  var w = str.substr(0, 3);
  var h = str.substr(3, 6);
  if (str.length == 7) {
   w = str.substr(0, 3);
   h = str.substr(3, 7);
  }
  if (str.length > 7) {
   w = str.substr(0, str.length / 2);
   h = str.substr(str.length / 2, str.length);
  }
 } else if (obj.width && obj.height) {
  var w = obj.width.toString();
  var h = obj.height.toString(), sz;
  if (w.length == 2) {
   w = "0" + w;
  }
  if (h.length == 2) {
   h = "0" + h;
  }
  if (w.length == 1) {
   w = "00" + w;
  }
  if (h.length == 1) {
   h = "00" + h;
  }
  sz = w + h;
 } else {
  var sz = "468060";
  var w = 468;
  var h = 60;
  obj.media = "316574";
 }
 if (!obj.media) {
  szs = "/size=" + sz;
 }
 if (obj.adtype) {
  var at = obj.adtype.toString().toUpperCase();
  if (at == "I" || obj.at == "IMAGE") {
   ot += "/rich=0";
  }
 }
 var hl = history.length;
 if (hl > 50) {
  hl = 50;
 }
 var sr = "";
 var sr1 = "";
 if (screen.width) {
  sr = "/scres=";
  var sw = screen.width;
  var sh = screen.height;
  if (sw == 640 && sh == 480) {
   sr += "2";
  } else if (sw == 800 && sh == 600) {
   sr += "3";
  } else if (sw == "1024" && sh == "768") {
   sr += "4";
  } else if (sw > 1024 && sh > 768) {
   sr += "5";
  } else {
   sr += "1";
  }
  sr1 = "/swh=" + screen.width + "x" + screen.height;
 } else {
  sr = "/scres=1";
 }
 var pNo = "1";
 var pf = obj.popfreq;
 if (pf) {
  var i = pf.indexOf(",");
  var n = pf.substring(0, i);
  var hr = pf.substring(i + 1, pf.length);
  n = parseInt(n);
  var cn = "AdComPop" + obj.site;
  var ck = ACE3getCk(cn);
  if (hr == 0) {
   if (!ck || ck == "") {
    ck = 0;
   }
   if (ck < n) {
    ACE3setCk(cn, parseFloat(ck) + 1);
   } else {
    pNo = "";
   }
  } else {
   if (!ck || ck == "") {
    var ED = new Date;
    ED.setTime(ED.getTime() + hr * 36e5);
    ACE3setCk(cn, "1|" + ED.toGMTString(), ED.toGMTString());
   } else {
    var ck1 = ck.split("|");
    if (ck1[0] < n) {
     ACE3setCk(cn, parseFloat(ck1[0]) + 1 + "|" + ck1[1], ck1[1]);
    } else {
     pNo = "";
    }
   }
  }
 }
 if (window.ACE3Tile) {
  ACE3Tile++;
 } else {
  ACE3Tile = 1;
 }
 var hd = new Date;
 var hr = hd.getHours();
 var day = hd.getDay();
 var ex = "";
 var opV = 1;
 var bu = "";
 var s1;
 if (obj.extra) {
  ex = obj.extra;
  ex = ex.charAt(0) == "/" ? ex : "/" + ex;
 }
 ot += "/wkhr=" + (day * 24 + hr) + "/hr=" + hr + "/hl=" + hl + sr + sr1 + "/tile=" + ACE3Tile + "/f=" + ifV + parm;
 if (obj.region == 2) {
  ot += "/r=2";
 } else if (obj.region == 3) {
  ot += "/r=3";
 } else {
  ot += "/r=1";
 }
 if (obj.dontopenwindow == "true") {
  opV = 0;
 }
 if (navigator.userAgent.indexOf("AOL") != -1) {
  ot += "/a=1";
 }
 if (obj.isaol == "true") {
  ot += "/optn=" + (opV + 16);
 } else {
  ot += "/optn=" + opV;
 }
 if (pt) {
  pt = pt.toUpperCase();
 }
 if (pt == "POPOVER") {
  adComPopFo = "0";
 }
 if (obj.burl == "true") {
  bu = "/burl";
 }
 if (pt || pu) {
  var s = ht;
  if (pt != "POPHTML") {
   s += "/pop";
  }
  s += "/site=" + site;
  if (obj.size || obj.width && obj.height) {
   s += szs;
  }
  s += "/u=2/bnum=" + bnum + "/tags=42" + ot;
 } else {
  var s = ht + bu + "/site=" + site + szs + "/u=2/bnum=" + bnum + ot;
 }
 if (dynclick != "") {
  s += "/dynclick=" + dynclick;
 }
 if (rclk != "") {
  s += "/rclk=" + rclk;
 }
 if (s.indexOf("/aolexp=") >= 0) {
  if (s.indexOf("/aolexp=0") >= 0) {
   ACE3AllowExp = 0;
  } else if (s.indexOf("/aolexp=1") >= 0) {
   ACE3AllowExp = 1;
  }
  s = s.replace(/\/aolexp=[01]/g, "");
 }
 if (!old && ct != "IMAGE" && ct != "I") {
  if (parseInt(ACE3FVer) == 0) {
   ACE3CkPlg();
  }
  s += "/fv=" + ACE3FVer;
  ACEgetSize();
  var ACERenameIF = 0;
  if (s.indexOf("/aolexp=") >= 0) {
   if (s.indexOf("/aolexp=0") >= 0) {
    ACE3AllowExp = 0;
   } else if (s.indexOf("/aolexp=1") >= 0) {
    ACE3AllowExp = 1;
   }
   s = s.replace(/\/aolexp=[01]/g, "");
  }
  s += "/aolexp=0";
  if (ct != "IFRAME" && ct != "IF") {
   if (ct == "J") {
    if (ifV == 1) {
     if (parent != top) {
      if (ACE_FIF_TYPE) {
       for (var i = 0; i < top.frames.length; i++) {
        try {
         if (top.frames[i] == parent) {
          ACEgetSize(top.frames[i]);
          if (parseInt(ACE3WinW) <= parseInt(obj.size.substr(0, 3)) && parseInt(ACE3WinH) <= parseInt(obj.size.substr(3))) {
           top.frames[i].location.replace(this.location);
           return;
          }
         }
        } catch (e) {}
       }
       s = s.replace(/\/f=[0-9]/, "/f=3");
      }
     } else {
      if (ACE_FIF_TYPE) {
       inDapIF = "true";
      }
     }
    }
    s1 = s + ex;
    dr = ACE3CkLen(s1, dr);
    dw = "<SCRIPT TYPE='text/javascript' SRC='" + s1 + dr + "'></SCRIPT>";
   } else if (ct == "F") {
    var data = "";
    if (window.ACE_AR) {
     for (var p in ACE_AR) {
      data += p + "=" + escape(ACE_AR[p]) + "&";
     }
    }
    data = data.substring(0, data.length - 1);
    if (ifV == 0) {
     var dom = "";
     if (document.domain != location.hostname) {
      dom = "&domain=" + document.domain;
     }
     if (ACE_FIF) {
      dw = "<IFRAME SRC='" + ACE_FIF + "#" + data + "&" + dr + dom + "' WIDTH=" + w + " HEIGHT=" + h + " SCROLLING=NO FRAMEBORDER=0 MARGINHEIGHT=0 MARGINWIDTH=0></IFRAME>";
     } else {
      s1 = s + ex;
      dr = ACE3CkLen(s1, dr);
      dw = "<SCRIPT TYPE='text/javascript' SRC='" + s1 + dr + "'></SCRIPT>";
     }
    } else if (ifV == 1 && top == parent) {
     inDapIF = "true";
     s1 = s + ex;
     dr = ACE3CkLen(s1, dr);
     dw = "<SCRIPT TYPE='text/javascript' SRC='" + s1 + dr + "'></SCRIPT>";
    } else {
     if (ACE_FIF && parseInt(ACE3WinW) <= parseInt(obj.size.substr(0, 3)) && parseInt(ACE3WinH) <= parseInt(obj.size.substr(3))) {
      ACERenameIF = 1;
     }
     s1 = s + ex;
     dr = ACE3CkLen(s1, dr);
     dw = "<SCRIPT TYPE='text/javascript' SRC='" + s1 + dr + "'></SCRIPT>";
    }
   } else {
    s1 = s + ex;
    dr = ACE3CkLen(s1, dr);
    dw = "<SCRIPT TYPE='text/javascript' SRC='" + s1 + dr + "'></SCRIPT>";
   }
  } else {
   s1 = s + "/tags=1" + ex;
   dr = ACE3CkLen(s1, dr);
   dw = "<IFRAME SRC='" + s1 + dr + "' WIDTH=" + w + " HEIGHT=" + h + " SCROLLING=NO FRAMEBORDER=0 MARGINHEIGHT=0 MARGINWIDTH=0></IFRAME>";
  }
 } else {
  var s1 = s + "/bins=1";
  if (s.indexOf("rich=0") == -1) {
   s1 += "/rich=0";
  }
  s1 += ex;
  dr = ACE3CkLen(s1, dr);
  dw = "<A HREF='" + ht + "/click/site=" + site + "/bnum=" + bnum + "' TARGET='_blank'><IMG SRC='" + s1 + dr + "' WIDTH=" + w + " HEIGHT=" + h + " BORDER=0 ALT='" + alt + "'></A>";
 }
 if ((pt || pu) && (old || se > -1)) {
  pNo = 0;
 }
 if (pt && !(pt == "POPOVER" || pt == "POPUNDER" || pt == "POPHTML")) {
  pNo = 0;
 }
 if (pNo) {
  if (pu) {
   adsComPopVar = 1;
  }
  if (obj.popdelay) {
   adComDelayValue = obj.popdelay;
  }
  if ((isNaN(parseInt(ACE3AllowExp)) || ACE3AllowExp > 1 || ACE3AllowExp < 0) && ifV == 0 || ACE3AllowExp == 1) {
   dw = dw.replace(/aolexp=[01]/, "aolexp=1");
  }
  if (ACERenameIF) {
   ACERenameIF = 0;
   try {
    location.replace(ACE_FIF + "#" + data + "&" + dr);
   } catch (e) {
    document.write(dw);
   }
  } else {
   document.write(dw);
  }
 }
 window.ACE_KeyParm = "";
 window.ACE_KeyParms = "";
 window.ACE_FreqSiteMap = "";
 ACE_AR = "";
}

function ACErtbCheck(site) {
 if (document.location.protocol != "https:" && !document.getElementById("ACE3RTBPingFile") && Math.floor(Math.random() * 100) + 1 <= ACE3RTBglobalThrottle) {
  var rtbPing = document.createElement("iframe");
  rtbPing.id = "ACE3RTBPingFile";
  rtbPing.name = "ACE3RTBPingFile";
  rtbPing.src = "http://cmap.uac.ace.advertising.com/um.ashx?site=" + site;
  rtbPing.width = 0;
  rtbPing.height = 0;
  rtbPing.style.width = "0px";
  rtbPing.style.height = "0px";
  rtbPing.style.display = "none";
  document.body.appendChild(rtbPing);
 }
}

function ACEgetSize(thisWindow) {
 ACE3WinW = 0;
 ACE3WinH = 0;
 if (typeof thisWindow == "undefined") {
  thisWindow = window;
 }
 try {
  if (typeof window.innerWidth != "undefined") {
   ACE3WinW = thisWindow.innerWidth;
   ACE3WinH = thisWindow.innerHeight;
  } else if (typeof thisWindow.document.documentElement != "undefined" && typeof thisWindow.document.documentElement.clientWidth != "undefined" && thisWindow.document.documentElement.clientWidth != 0) {
   ACE3WinW = thisWindow.document.documentElement.clientWidth;
   ACE3WinH = thisWindow.document.documentElement.clientHeight;
  } else {
   ACE3WinW = thisWindow.document.getElementsByTagName("body")[0].clientWidth;
   ACE3WinH = thisWindow.document.getElementsByTagName("body")[0].clientHeight;
  }
 } catch (e) {}
 ACE3WinW = "" + ACE3WinW;
 ACE3WinH = "" + ACE3WinH;
 if (ACE3WinW < 100) {
  if (ACE3WinW < 10) {
   ACE3WinW = "0" + ACE3WinW;
  }
  ACE3WinW = "0" + ACE3WinW;
 }
 if (ACE3WinH < 100) {
  if (ACE3WinH < 10) {
   ACE3WinH = "0" + ACE3WinH;
  }
  ACE3WinH = "0" + ACE3WinH;
 }
}

function ACE3setCk(nm, v, dt) {
 document.cookie = nm + "=" + escape(v) + (dt == null ? "" : "; expires=" + dt) + "; path=/;";
}

function ACE3getCk(nm) {
 var b = document.cookie.indexOf(nm + "=");
 if (b != -1) {
  var l = b + nm.length + 1, e = document.cookie.indexOf(";", l);
  if (e == -1) {
   e = document.cookie.length;
  }
  return unescape(document.cookie.substring(l, e));
 } else {
  return "";
 }
}

function AcePop(m, w, h, f) {
 var win, p = 1;
 if (!f) {
  f = adComPopFo;
 }
 if (adComDelayValue) {
  adsComPopVar = m + "|" + w + "|" + h + "|" + f;
  var t = setTimeout("AcePop()", adComDelayValue * 1e3);
  adComDelayValue = "";
  p = 0;
 } else {
  if (!m && window.adsComPopVar) {
   var n = adsComPopVar.split("|");
   win = window.open(n[0], "win", "width=" + n[1] + ",height=" + n[2] + ",status=0,location=0");
   f = n[3];
  } else if (m && window.adsComPopVar) {
   adsComPopVar = m + "|" + w + "|" + h + "|" + f;
   p = 0;
  } else if (m) {
   win = window.open(m, "win", "width=" + w + ",height=" + h + ",status=0,location=0");
  }
  if (p) {
   if (f != "0") {
    window.focus();
    win.blur();
   } else {
    win.focus();
    window.blur();
   }
  }
 }
}

function CheckBoolean(input) {
 return input && (input.toLowerCase() == "true" || input.toLowerCase() == "1");
}

function getValueByRegion(mapping, regionObj) {
 var hr;
 if (regionObj.region) {
  hr = mapping[regionObj.region];
 }
 if (!hr) {
  hr = mapping[REGIONS.DEFAULT];
 }
 return hr;
}

function getHost2(obj) {
 return CheckBoolean(obj.akoptout) ? ACE3HostAKOptout : ACE3HostAK;
}

function getLowerCaseAR(aceArObj) {
 var obj;
 if (aceArObj) {
  obj = new Object;
  for (var p in aceArObj) {
   var lcn = p.toLowerCase();
   if (lcn != "class") {
    obj[lcn] = aceArObj[p];
   } else {
    obj["Class"] = aceArObj[p];
   }
  }
 }
 return obj;
}

if (ACE_AR_Lowercase) {
 ACE3_AdRequest(ACE_AR_Lowercase);
};
