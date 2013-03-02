/******************************************************************************
  Author & Copyright: Brian J Clifton
  Url: http://www.advanced-web-metrics.com

  This script is NOT free to use

  Hack for Google Analytics auto-tracking of 
   external links - tracked as /outbound/url-of-external-site
   file downloads - tracked as /downloads/filename
   mailto:        - tracked as /mailto/email-address-clicked

   PLUS: Event trigger so that single page visits of >30 seconds are not treated as bounces

  VERSION:
  v1.20, 26-June-2011

  USAGE:
  For use with ga.js(async) only. You need to do 3 straightforward things for this to work:
  1. Install this script in your website root directory and reference it in your GATC
      - as decribed at http://www.advanced-web-metrics.com/blog/auto-tracking-file-downloads-outbound-links/
  2. Replace the domain listed on line 57 (shown as YOUR-DOMAIN.COM) to your website domain
     - only use your main domain. Do not include a subdomain e.g. www., shop., secure., - unless you specifically
       wish to restrict the operation of this script to a subdomain only
  3. Scroll down and modify the function addLinkerEvents to meet your requirements.
     NOTE: Only change the values of a, b, c, and bounceTime:
     function init(){ addLinkerEvents(a,b,c,bounceTime,localDomains));} ;
  
     where:
     a = 1 or 0, use Event Tracking for external links (1), or use virtual Pageview tracking (0)
     b = 1 or 0, use Event Tracking for file downloads (1), or use virtual Pageview tracking (0)
     c = 1 or 0, use Event Tracking for mailto links (1), or use virtual Pageview tracking (0)
     bounceTime = 30 seconds or 0. Uses Event Tracking for single page visits >30 secs, or do not modify (0)
		This is tracked as a "dummy" event with category=Non-bounced, action=30 secs i.e. this not intended for analysis 
		Any other value will be treated as 30 seconds.

  DISCLAIMER:
  All scripts presented have been tested and validated by the author and are
  believed to be correct as of the date of publication or posting. The Google
  Analytics software on which they depend is subject to change, however; and
  therefore no warranty is expressed or implied that they will work as
  described in the future. Always check the most current Google Analytics
  documentation.

  UPDATES:
  v 1.20
  - added case checking so that e.g. *.PDF and *.pdf files are tracked

  v 1.10
  - fixed 'timeout' undefined error that was stopping the bounce rate modifier working correctly
  - added a catch for bookmarked links to be ignored - previously logged as 'undefined' 
******************************************************************************/
/**
 * Thanks to Nick Mikailovski (Google) for initial discussions and Tomas Remotigue for additional development.
 * trackEvents - true uses event tracking, false uses virtual page views 
 */

var _0x57df=["\x67\x6F\x6F\x67\x6C\x65\x2D\x61\x6E\x61\x6C\x79\x74\x69\x63\x73\x2E\x63\x6F\x6D","businessinsider.com","\x6F\x6E\x6C\x6F\x61\x64","\x2E\x64\x6F\x63","\x2E\x78\x6C\x73","\x2E\x70\x70\x74","\x2E\x65\x78\x65","\x2E\x7A\x69\x70","\x2E\x74\x78\x74","\x2E\x70\x64\x66","\x20\x73\x65\x63\x73","\x5F\x67\x61\x71\x2E\x70\x75\x73\x68\x28\x5B\x27\x5F\x74\x72\x61\x63\x6B\x45\x76\x65\x6E\x74\x27\x2C\x20\x27\x4E\x6F\x6E\x2D\x62\x6F\x75\x6E\x63\x65\x64\x27\x2C\x20\x6E\x65\x77\x74\x69\x6D\x65\x6F\x75\x74\x5D\x29\x3B","\x61","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x54\x61\x67\x4E\x61\x6D\x65","\x6C\x65\x6E\x67\x74\x68","\x6E\x61\x6D\x65","\x67\x65\x74\x41\x74\x74\x72\x69\x62\x75\x74\x65","\x6F\x6E\x63\x6C\x69\x63\x6B","\x75\x72\x63\x68\x69\x6E\x54\x72\x61\x63\x6B\x65\x72","\x69\x6E\x64\x65\x78\x4F\x66","\x5F\x74\x72\x61\x63\x6B\x50\x61\x67\x65\x76\x69\x65\x77","\x6D\x61\x69\x6C\x74\x6F\x3A","\x74\x6F\x4C\x6F\x77\x65\x72\x43\x61\x73\x65","\x68\x72\x65\x66","\x3A","\x73\x70\x6C\x69\x74","\x6D\x61\x69\x6C\x74\x6F","\x73\x65\x74\x41\x74\x74\x72\x69\x62\x75\x74\x65","\x2F\x2F","\x6F\x75\x74\x62\x6F\x75\x6E\x64","\x64\x6F\x6D\x61\x69\x6E","\x2F","\x64\x6F\x77\x6E\x6C\x6F\x61\x64\x73","\x3B","","\x5F\x67\x61\x71\x2E\x70\x75\x73\x68\x28\x5B","\x27\x5F\x74\x72\x61\x63\x6B\x45\x76\x65\x6E\x74\x27\x2C\x27","\x27\x2C\x27\x43\x6C\x69\x63\x6B\x27\x2C\x27","\x27","\x27\x5F\x74\x72\x61\x63\x6B\x50\x61\x67\x65\x76\x69\x65\x77\x27\x2C\x27\x2F","\x5D\x29\x3B\x20"];var localDomains=[_0x57df[0],_0x57df[1]];

function init(){addLinkerEvents(1,1,1,30,localDomains);} ;
// set the above line according to the instructions above. ONLY EDIT THE FIRST 4 VALUES. Do not edit the text "localDomains". This must remain the same
// In the above example, all links are tracked as an Event (1,1,1,30,...) and single page visits >30 secs will not be treated as a bounced visitor
// Example 2: track file downloads and outbound links as virtual pageviews but do not modify the bounce rate: use (0,0,1,0,...).

window[_0x57df[2]]=init;
var newtimeout;function addLinkerEvents(_0x6130x5,_0x6130x6,_0x6130x7,_0x6130x8,_0x6130x9){var _0x6130xa=[_0x57df[3],_0x57df[4],_0x57df[5],_0x57df[6],_0x57df[7],_0x57df[8],_0x57df[9]];if(_0x6130x8!=30&&_0x6130x8!=0){_0x6130x8=30;} ;if(_0x6130x8!=0){milliTimeout=_0x6130x8*1000;newtimeout=_0x6130x8+_0x57df[10];setTimeout(_0x57df[11],milliTimeout);} ;var _0x6130xb=document[_0x57df[13]](_0x57df[12]);for(var _0x6130xc=0;_0x6130xc<_0x6130xb[_0x57df[14]];_0x6130xc++){var _0x6130xd=_0x6130xb[_0x6130xc][_0x57df[16]](_0x57df[15]);if(_0x6130xd!=null){continue ;} ;var _0x6130xe=_0x6130xb[_0x6130xc][_0x57df[16]](_0x57df[17]);if(_0x6130xe!=null){_0x6130xe=String(_0x6130xe);if(_0x6130xe[_0x57df[19]](_0x57df[18])>-1||_0x6130xe[_0x57df[19]](_0x57df[20])>-1){continue ;} ;} ;if(_0x6130xb[_0x6130xc][_0x57df[23]][_0x57df[22]]()[_0x57df[19]](_0x57df[21])!=-1){var _0x6130xf=_0x6130xb[_0x6130xc][_0x57df[23]][_0x57df[25]](_0x57df[24]);_0x6130xb[_0x6130xc][_0x57df[27]](_0x57df[17],getAsync(_0x6130x7,_0x57df[26],_0x6130xf[1],_0x6130xe));} else {var _0x6130x10=true;for(var _0x6130x11=0;_0x6130x11<_0x6130x9[_0x57df[14]];_0x6130x11++){if(_0x6130xb[_0x6130xc][_0x57df[23]][_0x57df[22]]()[_0x57df[19]](_0x6130x9[_0x6130x11][_0x57df[22]]())!=-1){_0x6130x10=false;} ;} ;if(_0x6130x10){var _0x6130xf=_0x6130xb[_0x6130xc][_0x57df[23]][_0x57df[25]](_0x57df[28]);_0x6130xb[_0x6130xc][_0x57df[27]](_0x57df[17],getAsync(_0x6130x5,_0x57df[29],_0x6130xf[1],_0x6130xe));} else {for(var _0x6130x12=0;_0x6130x12<_0x6130xa[_0x57df[14]];_0x6130x12++){if(_0x6130xb[_0x6130xc][_0x57df[23]][_0x57df[22]]()[_0x57df[19]](_0x6130xa[_0x6130x12][_0x57df[22]]())!=-1){var _0x6130xf=_0x6130xb[_0x6130xc][_0x57df[23]][_0x57df[25]](document[_0x57df[30]]+_0x57df[31]);_0x6130xb[_0x6130xc][_0x57df[27]](_0x57df[17],getAsync(_0x6130x6,_0x57df[32],_0x6130xf[1],_0x6130xe));break ;} ;} ;} ;} ;} ;} ;function getAsync(_0x6130x14,_0x6130x15,_0x6130x16,_0x6130x17){var _0x6130x18=(_0x6130x17!=null)?_0x6130x17+_0x57df[33]:_0x57df[34];var _0x6130x19=_0x57df[35];var _0x6130x1a=_0x57df[34];if(_0x6130x14){_0x6130x1a=_0x57df[36]+_0x6130x15+_0x57df[37]+_0x6130x16+_0x57df[38];} else {_0x6130x1a=_0x57df[39]+_0x6130x15+_0x57df[31]+_0x6130x16+_0x57df[38];} ;var _0x6130x1b=_0x57df[40];return _0x6130x19+_0x6130x1a+_0x6130x1b+_0x6130x18;} ;