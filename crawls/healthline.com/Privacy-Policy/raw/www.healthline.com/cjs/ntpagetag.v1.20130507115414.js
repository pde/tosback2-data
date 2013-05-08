/* Unica Page Tagging Script v1.1
 * Copyright 2004-2006 Unica Corporation.  All rights reserved.
 * Visit http://www.unica.com for more information.
 */
var NTPT_IMGSRC = 'http://www.healthline.com/images/spacer.gif';

var NTPT_FLDS = new Object();
NTPT_FLDS.lc = true; // Document location
NTPT_FLDS.rf = true; // Document referrer
NTPT_FLDS.rs = true; // User's screen resolution
NTPT_FLDS.cd = true; // User's color depth
NTPT_FLDS.ln = true; // Browser language
NTPT_FLDS.tz = true; // User's timezone
NTPT_FLDS.jv = true; // Browser's Java support

var NTPT_MAXTAGWAIT = 1.0; // Max delay (secs) on link-tags and submit-tags

// Optional variables:
var NTPT_HTTPSIMGSRC = '';
var NTPT_GLBLEXTRA = '';
var NTPT_GLBLREFTOP = false;

/*** END OF USER-CONFIGURABLE VARIABLES ***/

function O0O00(OOO0O0,O0000O0){return(eval("\x74\x79\x70\x65\x6f\x66\x20"+OOO0O0+"\x20\x21\x3d\x20\x22\x75\x6e\x64\x65\x66\x69\x6e\x65\x64\x22")?eval(OOO0O0):O0000O0);};function O0O0OO(OOOO0O,OOOOO0){return(OOOO0O+(((OOOO0O=='')||((OOOOO0=='')||(OOOOO0.substring((0x56+9193-0x243f),(0xa1a+1132-0xe85))=="\x26")))?'':"\x26")+OOOOO0);};function O0OO0O(){var O000O0=new Date();return(O000O0.getTime()+"\x2e"+Math.floor(Math.random()*(0x12b7+6117-0x26b4)));};function O00O0(OO0000,OO0O0O){O00OO[OO0000]=OO0O0O.toString();};function O0OOOO0(OO0000){O00OO[OO0000]='';};function OOOO00(OO00O){var OO00OO='',O0OO0,O00O0O;O0O000(O0O00("\x4e\x54\x50\x54\x5f\x47\x4c\x42\x4c\x45\x58\x54\x52\x41",''));if(!LnkLck)O0O000(O0O00("\x4e\x54\x50\x54\x5f\x50\x47\x45\x58\x54\x52\x41",''));O0O000(OO00O);for(O0OO0 in O00OO){O00O0O=O00OO[O0OO0];if(typeof(O00O0O)=="\x73\x74\x72\x69\x6e\x67"){if(O00O0O&&(O00O0O!=''))OO00OO=O0O0OO(OO00OO,(O0OO0+"\x3d"+(self.encodeURIComponent?encodeURIComponent(O00O0O):escape(O00O0O))));};}return OO00OO;};function OOO0OO(){var O0OO0;O0O0O0.O00OO=new Array();for(O0OO0 in O00OO)O0O0O0.O00OO[O0OO0]=O00OO[O0OO0];};function OOOO0O0(){var O0OO0;O00OO=new Array();for(O0OO0 in O0O0O0.O00OO)O00OO[O0OO0]=O0O0O0.O00OO[O0OO0];};function OO000O(OO0O00,OOO000,OOOOO){if(OOO00[OO0O00]!=null){var O0O00O=new Function(OOO000);OOO00[OO0O00].onload=O0O00O;OOO00[OO0O00].onerror=O0O00O;OOO00[OO0O00].onabort=O0O00O;}setTimeout(OOO000,(OOOOO*(0x1064+5122-0x207e)));};function O00000(O0O0O,O000OO){if(O0O0O=='')return;O000O=((O000O+(0x23c1+502-0x25b6))%OOO00.length);if(OOO00[O000O]==null)OOO00[O000O]=new Image((0x4ef+5322-0x19b8),(0x1a28+3059-0x261a));OOO00[O000O].src=O0O0O+"\x3f"+O000OO;};function O00OOO(OO00O){var O0O0O;var O000OO;if((OOO00O!='')&&(document.location.protocol=="\x68\x74\x74\x70\x73\x3a"))O0O0O=OOO00O;else O0O0O=O0000OO;O000OO=OOOO00(OO00O);O00000(O0O0O,O000OO);OOOO0O0();};function O0O000(OO00O){var O0OOOO;var OO00O0;if(!OO00O)return;OO00O=OO00O.toString();if(OO00O=='')return;O0OOOO=OO00O.split("\x26");for(OO00O0=(0x7b8+5158-0x1bde);OO00O0<O0OOOO.length;OO00O0++){var O0OOO0=O0OOOO[OO00O0].split("\x3d");if(O0OOO0.length==(0x16dd+451-0x189e))O00O0(O0OOO0[(0x75+2026-0x85f)],(self.decodeURIComponent?decodeURIComponent(O0OOO0[(0xf12+3601-0x1d22)]):unescape(O0OOO0[(0xc6d+5396-0x2180)])));}};function O0OO00(OO00O){O00O0("\x65\x74\x73",O0OO0O());O00OOO(OO00O);return true;};function O000OO0(OO0OO,OO00O,OOOOO){var OO000;if(!OO0OO||!OO0OO.href)return true;if(LnkLck)return false;LnkLck=OO0OO;if(OOOO0.lc)O00O0("\x6c\x63",OO0OO.href);if(OOOO0.rf){if(!O0000O||!top||!top.document)O00O0("\x72\x66",document.location);}O0OO00(OO00O);if(OOOOO)OO000=OOOOO;else OO000=NTPT_MAXTAGWAIT;if(OO000>(0x153a+4174-0x2588)){var OO0OO0;if(OO0OO.click){OO0OO.tmpclck=OO0OO.onclick;OO0OO.onclick=null;OO0OO0="\x69\x66\x20\x28\x20\x4c\x6e\x6b\x4c\x63\x6b\x20\x29\x20\x7b\x20\x4c\x6e\x6b\x4c\x63\x6b\x2e\x63\x6c\x69\x63\x6b\x28\x29\x3b\x20\x4c\x6e\x6b\x4c\x63\x6b\x2e\x6f\x6e\x63\x6c\x69\x63\x6b\x20\x3d\x20\x4c\x6e\x6b\x4c\x63\x6b\x2e\x74\x6d\x70\x63\x6c\x63\x6b\x3b\x20\x4c\x6e\x6b\x4c\x63\x6b\x20\x3d\x20\x6e\x75\x6c\x6c\x3b\x20\x7d";}else OO0OO0="\x69\x66\x20\x28\x20\x4c\x6e\x6b\x4c\x63\x6b\x20\x29\x20\x7b\x20\x77\x69\x6e\x64\x6f\x77\x2e\x6c\x6f\x63\x61\x74\x69\x6f\x6e\x2e\x68\x72\x65\x66\x20\x3d\x20\x22"+OO0OO.href+"\x22\x3b\x20\x4c\x6e\x6b\x4c\x63\x6b\x20\x3d\x20\x6e\x75\x6c\x6c\x3b\x20\x7d";OO000O(O000O,OO0OO0,OO000);return false;}LnkLck=null;return true;};function O00OO0(OO0O0,OO00O,OOOOO){var OO000;if(!OO0O0||!OO0O0.submit)return true;if(FrmLck)return false;FrmLck=OO0O0;O0OO00(OO00O);if(OOOOO)OO000=OOOOO;else OO000=NTPT_MAXTAGWAIT;if(OO000>(0x141d+2785-0x1efe)){OO0O0.tmpsbmt=OO0O0.onsubmit;OO0O0.onsubmit=null;OO000O(O000O,"\x69\x66\x20\x28\x20\x46\x72\x6d\x4c\x63\x6b\x20\x29\x20\x7b\x20\x46\x72\x6d\x4c\x63\x6b\x2e\x73\x75\x62\x6d\x69\x74\x28\x29\x3b\x20\x46\x72\x6d\x4c\x63\x6b\x2e\x6f\x6e\x73\x75\x62\x6d\x69\x74\x20\x3d\x20\x46\x72\x6d\x4c\x63\x6b\x2e\x74\x6d\x70\x73\x62\x6d\x74\x3b\x20\x46\x72\x6d\x4c\x63\x6b\x20\x3d\x20\x6e\x75\x6c\x6c\x3b\x20\x7d",OO000);return false;}FrmLck=null;return true;};var O0000OO=NTPT_IMGSRC;var OOOO0=NTPT_FLDS;var OOO00O=O0O00("\x4e\x54\x50\x54\x5f\x48\x54\x54\x50\x53\x49\x4d\x47\x53\x52\x43",'');var O0000O=O0O00("\x4e\x54\x50\x54\x5f\x50\x47\x52\x45\x46\x54\x4f\x50",O0O00("\x4e\x54\x50\x54\x5f\x47\x4c\x42\x4c\x52\x45\x46\x54\x4f\x50",false));var OOO0O0O=O0O00("\x4e\x54\x50\x54\x5f\x4e\x4f\x49\x4e\x49\x54\x49\x41\x4c\x54\x41\x47",false);var ntptAddPair=O00O0;var ntptDropPair=O0OOOO0;var ntptEventTag=O0OO00;var ntptLinkTag=O000OO0;var ntptSubmitTag=O00OO0;var O00OO=new Array();var O0O0O0=new Object();var OOO00=Array((0x320+1757-0x9f3));var O000O;for(O000O=(0x115b+484-0x133f);O000O<OOO00.length;O000O++)OOO00[O000O]=null;var LnkLck=null;var FrmLck=null;O00O0("\x6a\x73","\x31");O00O0("\x74\x73",O0OO0O());if(OOOO0.lc)O00O0("\x6c\x63",document.location);if(OOOO0.rf){var O00O00;if(O0000O&&top&&top.document)O00O00=top.document.referrer;else O00O00=document.referrer;O00O0("\x72\x66",O00O00);}if(self.screen){if(OOOO0.rs)O00O0("\x72\x73",self.screen.width+"\x78"+self.screen.height);if(OOOO0.cd)O00O0("\x63\x64",self.screen.colorDepth);}if(OOOO0.ln){var O0000;if(navigator.language)O0000=navigator.language;else if(navigator.userLanguage)O0000=navigator.userLanguage;else O0000='';if(O0000.length>(0x304+6119-0x1ae9))O0000=O0000.substring((0x795+6477-0x20e2),(0x8af+6515-0x2220));O0000=O0000.toLowerCase();O00O0("\x6c\x6e",O0000);}if(OOOO0.tz){var OOO0O;var O000O0=new Date();var O0OOO=O000O0.getTimezoneOffset();var OO0OOO;OOO0O="\x47\x4d\x54";if(O0OOO!=(0x135d+799-0x167c)){if(O0OOO>(0x156c+3684-0x23d0))OOO0O+="\x20\x2d";else OOO0O+="\x20\x2b";O0OOO=Math.abs(O0OOO);OO0OOO=Math.floor(O0OOO/(0x229+8633-0x23a6));O0OOO-=OO0OOO*(0x17d3+826-0x1ad1);if(OO0OOO<(0x1cc+6485-0x1b17))OOO0O+="\x30";OOO0O+=OO0OOO+"\x3a";if(O0OOO<(0x1799+782-0x1a9d))OOO0O+="\x30";OOO0O+=O0OOO;}O00O0("\x74\x7a",OOO0O);}if(OOOO0.jv){var OOOOOO;if(navigator.javaEnabled())OOOOOO="\x31";else OOOOOO="\x30";O00O0("\x6a\x76",OOOOOO);}OOO0OO();if(!OOO0O0O)O00OOO('');

// track topnav links with Unica
function hlTopNavEvent(el){
    /* if nodeType is an element and a link, fire event*/
    if(el.nodeType == 1 && (el.tagName.toUpperCase() == "A" || el.parentNode.tagName.toUpperCase() == "A")) {
      ntptEventTag('utm_medium=topnav');
    }
  }
/* provide YAHOO and jQuery Handlers*/
if(window.YAHOO){
  YAHOO.util.Event.on("stddlinkbox", "click", function(e) {
    hlTopNavEvent(YAHOO.util.Event.getTarget(e))
  });
  YAHOO.util.Event.on("hlmenus", "click", function(e) {
    hlTopNavEvent(YAHOO.util.Event.getTarget(e))
  });
}
else if(window.jQuery){
   /* stddlinkbox not part of new design */
  //$("#stddlinkbox").live('click', function(e){hlTopNavEvent(e.target);});
  $("#hlmenus").live('click', function(e){hlTopNavEvent(e.target);});
}