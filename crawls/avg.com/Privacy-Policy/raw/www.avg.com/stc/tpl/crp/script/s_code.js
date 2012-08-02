/* SiteCatalyst code version: H.21.
Copyright 1996-2010 Adobe, Inc. All Rights Reserved
More info available at http://www.omniture.com */
/************************ ADDITIONAL FEATURES ************************
     Plugins
*/

var s=s_gi(s_account)




/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */
s.charSet="UTF-8"
/* Link Tracking Config */
s.trackDownloadLinks=true
s.trackExternalLinks=true
s.trackInlineStats=true
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,xls,bin,swf"
s.linkInternalFilters=getInternalFilters(s_account)
s.linkLeaveQueryString=false
s.linkTrackVars="None"
s.linkTrackEvents="None"

/**************************** AVG SECTION ***************************/
/* Custom AVG functions.                                            */
function getInternalFilters(accountID){
  var returnVar;
  // define available suites
  var accountList=new Array(27);
  accountList[0]=new Array("avgcorporatepublicww","javascript:,scode-tracking.web2011-dev.grisoft.cz,www.grisoft.es,www.avg.es,www.avg.com,free.avg.com,www.avgbrasil.com.br,www.avg.co.uk,www.avg.ie,www.avg.de,www.avg.fr,www.avgfrance.com,www.avg.cz,www.grisoft.cz,www.avg.sk,www.grisoft.sk,www.grisoft.jp,secure.avg.com,static.avg.com,static.avg.co.uk,shop.avg.com,sshop.avg.com,sshop.element5.com,securesuite.co.uk,lloydstsb.com,barclaycard.co.uk,barclays.co.uk,arcot.com,verifiedbyvisa-mastercardsecurecode.com,securecode.com,ashop.avg.com,ideal.ing.nl,paypal.com,securesuite.co.uk,clicksafe.lloydstsb.com,upclick.com");
  accountList[1]=new Array("avgfreepublicww","javascript:,free.avg.com");
  accountList[2]=new Array("avgdev","javascript:,scode-tracking.web2011-dev.grisoft.cz,web2008-dev.grisoft.cz,web2008-dev,web2008-master.grisoft.cz,web2008-master,free2008-dev.grisoft.cz,free2008-dev,free2008-master.grisoft.cz,free2008-master");
  accountList[3]=new Array("avgforumfree","javascript:,www.grisoft.es,www.avg.es,www.avg.com,www.avgbrasil.com.br,www.avg.co.uk,www.avg.ie,www.avg.de,www.avg.fr,www.avgfrance.com,www.avg.cz,www.grisoft.cz,www.avg.sk,www.grisoft.sk,www.grisoft.jp,secure.avg.com,static.avg.com,static.avg.co.uk,shop.avg.com,sshop.avg.com,sshop.element5.com,securesuite.co.uk,lloydstsb.com,barclaycard.co.uk,barclays.co.uk,arcot.com,verifiedbyvisa-mastercardsecurecode.com,securecode.com,ashop.avg.com,ideal.ing.nl,paypal.com,securesuite.co.uk,clicksafe.lloydstsb.com,upclick.com");
  accountList[4]=new Array("avgforumbeta","javascript:,www.grisoft.es,www.avg.es,www.avg.com,www.avgbrasil.com.br,www.avg.co.uk,www.avg.ie,www.avg.de,www.avg.fr,www.avgfrance.com,www.avg.cz,www.grisoft.cz,www.avg.sk,www.grisoft.sk,www.grisoft.jp,secure.avg.com,static.avg.com,static.avg.co.uk,shop.avg.com,sshop.avg.com,sshop.element5.com,securesuite.co.uk,lloydstsb.com,barclaycard.co.uk,barclays.co.uk,arcot.com,verifiedbyvisa-mastercardsecurecode.com,securecode.com,ashop.avg.com,ideal.ing.nl,paypal.com,securesuite.co.uk,clicksafe.lloydstsb.com,upclick.com");
  accountList[5]=new Array("avglinkscanner","javascript:,www.grisoft.es,www.avg.es,www.avg.com,www.avgbrasil.com.br,www.avg.co.uk,www.avg.ie,www.avg.de,www.avg.fr,www.avgfrance.com,www.avg.cz,www.grisoft.cz,www.avg.sk,www.grisoft.sk,www.grisoft.jp,secure.avg.com,static.avg.com,static.avg.co.uk,shop.avg.com,sshop.avg.com,sshop.element5.com,securesuite.co.uk,lloydstsb.com,barclaycard.co.uk,barclays.co.uk,arcot.com,verifiedbyvisa-mastercardsecurecode.com,securecode.com,ashop.avg.com,ideal.ing.nl,paypal.com,securesuite.co.uk,clicksafe.lloydstsb.com,upclick.com");
  accountList[6]=new Array("avgcorporatepartnerbr","javascript:,www.grisoft.es,www.avg.es,www.avg.com,www.avgbrasil.com.br,www.avg.co.uk,www.avg.ie,www.avg.de,www.avg.fr,www.avgfrance.com,www.avg.cz,www.grisoft.cz,www.avg.sk,www.grisoft.sk,www.grisoft.jp,secure.avg.com,static.avg.com,static.avg.co.uk,shop.avg.com,sshop.avg.com,sshop.element5.com,securesuite.co.uk,lloydstsb.com,barclaycard.co.uk,barclays.co.uk,arcot.com,verifiedbyvisa-mastercardsecurecode.com,securecode.com,ashop.avg.com,ideal.ing.nl,paypal.com,securesuite.co.uk,clicksafe.lloydstsb.com,upclick.com,store.avgbrasil.com.br");
  accountList[7]=new Array("avgcorporatepartnercn","javascript:,www.grisoft.es,www.avg.es,www.avg.com,www.avgbrasil.com.br,www.avg.co.uk,www.avg.ie,www.avg.de,www.avg.fr,www.avgfrance.com,www.avg.cz,www.grisoft.cz,www.avg.sk,www.grisoft.sk,www.grisoft.jp,secure.avg.com,static.avg.com,static.avg.co.uk,shop.avg.com,sshop.avg.com,sshop.element5.com,securesuite.co.uk,lloydstsb.com,barclaycard.co.uk,barclays.co.uk,arcot.com,verifiedbyvisa-mastercardsecurecode.com,securecode.com,ashop.avg.com,ideal.ing.nl,paypal.com,securesuite.co.uk,clicksafe.lloydstsb.com,upclick.com");
  accountList[8]=new Array("avgcorporatepartnerjp","javascript:,www.grisoft.es,www.avg.es,www.avg.com,www.avgbrasil.com.br,www.avg.co.uk,www.avg.ie,www.avg.de,www.avg.fr,www.avgfrance.com,www.avg.cz,www.grisoft.cz,www.avg.sk,www.grisoft.sk,www.grisoft.jp,secure.avg.com,static.avg.com,static.avg.co.uk,shop.avg.com,sshop.avg.com,sshop.element5.com,securesuite.co.uk,lloydstsb.com,barclaycard.co.uk,barclays.co.uk,arcot.com,verifiedbyvisa-mastercardsecurecode.com,securecode.com,ashop.avg.com,ideal.ing.nl,paypal.com,securesuite.co.uk,clicksafe.lloydstsb.com,upclick.com");
  accountList[9]=new Array("avgcorporatepartnerkr","javascript:,www.grisoft.es,www.avg.es,www.avg.com,www.avgbrasil.com.br,www.avg.co.uk,www.avg.ie,www.avg.de,www.avg.fr,www.avgfrance.com,www.avg.cz,www.grisoft.cz,www.avg.sk,www.grisoft.sk,www.grisoft.jp,secure.avg.com,static.avg.com,static.avg.co.uk,shop.avg.com,sshop.avg.com,sshop.element5.com,securesuite.co.uk,lloydstsb.com,barclaycard.co.uk,barclays.co.uk,arcot.com,verifiedbyvisa-mastercardsecurecode.com,securecode.com,ashop.avg.com,ideal.ing.nl,paypal.com,securesuite.co.uk,clicksafe.lloydstsb.com,upclick.com");
  accountList[10]=new Array("avgcorporatepartnertw","javascript:,www.grisoft.es,www.avg.es,www.avg.com,www.avgbrasil.com.br,www.avg.co.uk,www.avg.ie,www.avg.de,www.avg.fr,www.avgfrance.com,www.avg.cz,www.grisoft.cz,www.avg.sk,www.grisoft.sk,www.grisoft.jp,secure.avg.com,static.avg.com,static.avg.co.uk,shop.avg.com,sshop.avg.com,sshop.element5.com,securesuite.co.uk,lloydstsb.com,barclaycard.co.uk,barclays.co.uk,arcot.com,verifiedbyvisa-mastercardsecurecode.com,securecode.com,ashop.avg.com,ideal.ing.nl,paypal.com,securesuite.co.uk,clicksafe.lloydstsb.com,upclick.com");
  accountList[11]=new Array("avgcorporatepublicblogs","javascript:,www.grisoft.es,www.avg.es,www.avg.com,www.avgbrasil.com.br,www.avg.co.uk,www.avg.ie,www.avg.de,www.avg.fr,www.avgfrance.com,www.avg.cz,www.grisoft.cz,www.avg.sk,www.grisoft.sk,www.grisoft.jp,secure.avg.com,static.avg.com,static.avg.co.uk,shop.avg.com,sshop.avg.com,sshop.element5.com,securesuite.co.uk,lloydstsb.com,barclaycard.co.uk,barclays.co.uk,arcot.com,verifiedbyvisa-mastercardsecurecode.com,securecode.com,ashop.avg.com,ideal.ing.nl,paypal.com,securesuite.co.uk,clicksafe.lloydstsb.com,upclick.com");
  accountList[12]=new Array("avgcorporatepublicrs","javascript:,www.grisoft.es,www.avg.es,www.avg.com,www.avgbrasil.com.br,www.avg.co.uk,www.avg.ie,www.avg.de,www.avg.fr,www.avgfrance.com,www.avg.cz,www.grisoft.cz,www.avg.sk,www.grisoft.sk,www.grisoft.jp,secure.avg.com,static.avg.com,static.avg.co.uk,shop.avg.com,sshop.avg.com,sshop.element5.com,securesuite.co.uk,lloydstsb.com,barclaycard.co.uk,barclays.co.uk,arcot.com,verifiedbyvisa-mastercardsecurecode.com,securecode.com,ashop.avg.com,ideal.ing.nl,paypal.com,securesuite.co.uk,clicksafe.lloydstsb.com,upclick.com");
  accountList[13]=new Array("avgporatepublicblogs","javascript:,www.grisoft.es,www.avg.es,www.avg.com,www.avgbrasil.com.br,www.avg.co.uk,www.avg.ie,www.avg.de,www.avg.fr,www.avgfrance.com,www.avg.cz,www.grisoft.cz,www.avg.sk,www.grisoft.sk,www.grisoft.jp,secure.avg.com,static.avg.com,static.avg.co.uk,shop.avg.com,sshop.avg.com,sshop.element5.com,securesuite.co.uk,lloydstsb.com,barclaycard.co.uk,barclays.co.uk,arcot.com,verifiedbyvisa-mastercardsecurecode.com,securecode.com,ashop.avg.com,ideal.ing.nl,paypal.com,securesuite.co.uk,clicksafe.lloydstsb.com,upclick.com");
  accountList[14]=new Array("avgagentprogramcz","javascript:,www.grisoft.es,www.avg.es,www.avg.com,www.avgbrasil.com.br,www.avg.co.uk,www.avg.ie,www.avg.de,www.avg.fr,www.avgfrance.com,www.avg.cz,www.grisoft.cz,www.avg.sk,www.grisoft.sk,www.grisoft.jp,secure.avg.com,static.avg.com,static.avg.co.uk,shop.avg.com,sshop.avg.com,sshop.element5.com,securesuite.co.uk,lloydstsb.com,barclaycard.co.uk,barclays.co.uk,arcot.com,verifiedbyvisa-mastercardsecurecode.com,securecode.com,ashop.avg.com,ideal.ing.nl,paypal.com,securesuite.co.uk,clicksafe.lloydstsb.com,upclick.com");
  accountList[15]=new Array("avgthreefortwocz","javascript:,www.grisoft.es,www.avg.es,www.avg.com,www.avgbrasil.com.br,www.avg.co.uk,www.avg.ie,www.avg.de,www.avg.fr,www.avgfrance.com,www.avg.cz,www.grisoft.cz,www.avg.sk,www.grisoft.sk,www.grisoft.jp,secure.avg.com,static.avg.com,static.avg.co.uk,shop.avg.com,sshop.avg.com,sshop.element5.com,securesuite.co.uk,lloydstsb.com,barclaycard.co.uk,barclays.co.uk,arcot.com,verifiedbyvisa-mastercardsecurecode.com,securecode.com,ashop.avg.com,ideal.ing.nl,paypal.com,securesuite.co.uk,clicksafe.lloydstsb.com,upclick.com");
  accountList[16]=new Array("avgcorporatepublicczandsk","javascript:,www.grisoft.es,www.avg.es,www.avg.com,www.avgbrasil.com.br,www.avg.co.uk,www.avg.ie,www.avg.de,www.avg.fr,www.avgfrance.com,www.avg.cz,www.grisoft.cz,www.avg.sk,www.grisoft.sk,www.grisoft.jp,secure.avg.com,static.avg.com,static.avg.co.uk,shop.avg.com,sshop.avg.com,sshop.element5.com,securesuite.co.uk,lloydstsb.com,barclaycard.co.uk,barclays.co.uk,arcot.com,verifiedbyvisa-mastercardsecurecode.com,securecode.com,ashop.avg.com,ideal.ing.nl,paypal.com,securesuite.co.uk,clicksafe.lloydstsb.com,upclick.com");
  accountList[17]=new Array("avgshare","javascript:,www.grisoft.es,www.avg.es,www.avg.com,www.avgbrasil.com.br,www.avg.co.uk,www.avg.ie,www.avg.de,www.avg.fr,www.avgfrance.com,www.avg.cz,www.grisoft.cz,www.avg.sk,www.grisoft.sk,www.grisoft.jp,secure.avg.com,static.avg.com,static.avg.co.uk,shop.avg.com,sshop.avg.com,sshop.element5.com,securesuite.co.uk,lloydstsb.com,barclaycard.co.uk,barclays.co.uk,arcot.com,verifiedbyvisa-mastercardsecurecode.com,securecode.com,ashop.avg.com,ideal.ing.nl,paypal.com,securesuite.co.uk,clicksafe.lloydstsb.com,upclick.com");
  accountList[18]=new Array("avgcorporatepublicisiq","javascript:,www.grisoft.es,www.avg.es,www.avg.com,www.avgbrasil.com.br,www.avg.co.uk,www.avg.ie,www.avg.de,www.avg.fr,www.avgfrance.com,www.avg.cz,www.grisoft.cz,www.avg.sk,www.grisoft.sk,www.grisoft.jp,secure.avg.com,static.avg.com,static.avg.co.uk,shop.avg.com,sshop.avg.com,sshop.element5.com,securesuite.co.uk,lloydstsb.com,barclaycard.co.uk,barclays.co.uk,arcot.com,verifiedbyvisa-mastercardsecurecode.com,securecode.com,ashop.avg.com,ideal.ing.nl,paypal.com,securesuite.co.uk,clicksafe.lloydstsb.com,upclick.com");
  accountList[19]=new Array("avgthreatlabs","javascript:,www.grisoft.es,www.avg.es,www.avg.com,www.avgbrasil.com.br,www.avg.co.uk,www.avg.ie,www.avg.de,www.avg.fr,www.avgfrance.com,www.avg.cz,www.grisoft.cz,www.avg.sk,www.grisoft.sk,www.grisoft.jp,secure.avg.com,static.avg.com,static.avg.co.uk,shop.avg.com,sshop.avg.com,sshop.element5.com,securesuite.co.uk,lloydstsb.com,barclaycard.co.uk,barclays.co.uk,arcot.com,verifiedbyvisa-mastercardsecurecode.com,securecode.com,ashop.avg.com,ideal.ing.nl,paypal.com,securesuite.co.uk,clicksafe.lloydstsb.com,upclick.com");
  accountList[20]=new Array("avgcorporatepartnerdach","javascript:,www.avg-dach.com,www.grisoft.es,www.avg.es,www.avg.com,www.avgbrasil.com.br,www.avg.co.uk,www.avg.ie,www.avg.de,www.avg.fr,www.avgfrance.com,www.avg.cz,www.grisoft.cz,www.avg.sk,www.grisoft.sk,www.grisoft.jp,secure.avg.com,static.avg.com,static.avg.co.uk,shop.avg.com,sshop.avg.com,sshop.element5.com,securesuite.co.uk,lloydstsb.com,barclaycard.co.uk,barclays.co.uk,arcot.com,verifiedbyvisa-mastercardsecurecode.com,securecode.com,ashop.avg.com,ideal.ing.nl,paypal.com,securesuite.co.uk,clicksafe.lloydstsb.com,upclick.com");
  accountList[21]=new Array("avgonlinebackup","javascript:,www.avg-dach.com,www.grisoft.es,www.avg.es,www.avg.com,www.avgbrasil.com.br,www.avg.co.uk,www.avg.ie,www.avg.de,www.avg.fr,www.avgfrance.com,www.avg.cz,www.grisoft.cz,www.avg.sk,www.grisoft.sk,www.grisoft.jp,secure.avg.com,static.avg.com,static.avg.co.uk,shop.avg.com,sshop.avg.com,sshop.element5.com,securesuite.co.uk,lloydstsb.com,barclaycard.co.uk,barclays.co.uk,arcot.com,verifiedbyvisa-mastercardsecurecode.com,securecode.com,ashop.avg.com,ideal.ing.nl,paypal.com,securesuite.co.uk,clicksafe.lloydstsb.com,upclick.com");
  accountList[22]=new Array("avgfreeavgcom","javascript:,avgfree.com,www.avg-dach.com,www.grisoft.es,www.avg.es,www.avg.com,www.avgbrasil.com.br,www.avg.co.uk,www.avg.ie,www.avg.de,www.avg.fr,www.avgfrance.com,www.avg.cz,www.grisoft.cz,www.avg.sk,www.grisoft.sk,www.grisoft.jp,secure.avg.com,static.avg.com,static.avg.co.uk,shop.avg.com,sshop.avg.com,sshop.element5.com,securesuite.co.uk,lloydstsb.com,barclaycard.co.uk,barclays.co.uk,arcot.com,verifiedbyvisa-mastercardsecurecode.com,securecode.com,ashop.avg.com,ideal.ing.nl,paypal.com,securesuite.co.uk,clicksafe.lloydstsb.com,upclick.com");
  accountList[23]=new Array("avgmultimi","javascript:,multimi.com");
  accountList[24]=new Array("avgfreepublicww,avgcorporatepublicww","javascript:,free.avg.com,scode-tracking.web2011-dev.grisoft.cz,www.grisoft.es,www.avg.es,www.avg.com,www.avgbrasil.com.br,www.avg.co.uk,www.avg.ie,www.avg.de,www.avg.fr,www.avgfrance.com,www.avg.cz,www.grisoft.cz,www.avg.sk,www.grisoft.sk,www.grisoft.jp,secure.avg.com,static.avg.com,static.avg.co.uk,shop.avg.com,sshop.avg.com,sshop.element5.com,securesuite.co.uk,lloydstsb.com,barclaycard.co.uk,barclays.co.uk,arcot.com,verifiedbyvisa-mastercardsecurecode.com,securecode.com,ashop.avg.com,ideal.ing.nl,paypal.com,securesuite.co.uk,clicksafe.lloydstsb.com,upclick.com");
  accountList[25]=new Array("avgmobilation","javascript:,avgmobilation.com,www.avgmobilation.com");
  accountList[26]=new Array("avgmobilationdev","javascript:,avgmobilation.com,www.avgmobilation.com");

  
  // get internal filters
  for(i=0;i<accountList.length;i++){
    if(accountList[i][0]==accountID){
      returnVar = accountList[i][1];
      return returnVar;
      break;
    }
  }
}

function setCookie(name, value, expires) {
document.cookie = name + "=" + escape(value) + "; path=/" + ((expires == null) ? "" : "; expires=" + expires.toGMTString());
} 

var exp = new Date();     //set new date object
exp.setTime(exp.getTime() + (1000 * 60 * 60));     //set it 60 minutes 


function setCookie365(cookieName,cookieValue,nDays) {
 var today = new Date();
 var expire = new Date();
 if (nDays==null || nDays==0) nDays=1;
 expire.setTime(today.getTime() + 3600000*24*nDays);
 document.cookie = cookieName+"="+escape(cookieValue)
                 + "; path=/"
                 + "; domain=avg.com"
                 + ";expires="+expire.toGMTString();
}



/* Page Name Plugin Config */
s.siteID=""		// leftmost value in pagename
s.defaultPage=""       		// filename to add when none exists
s.queryVarsList=""	// query parameters to keep
s.pathExcludeDelim="" 		// portion of the path to exclude
s.pathConcatDelim="|"		// page name component separator
s.pathExcludeList=""		// elements to exclude from the path


/* Plugin Config */

s._extraSearchEngines="voila.fr|rdata,kw|Voila>rechercher.aliceadsl.fr|qs|Aliceadsl.fr>toile.com|query,q|Toile du Quebec"
s._channelDomain="Social Media|facebook.com,twitter.com,linkedin.com,orkut.com,friendster.com,livejournal.com,blogspot.com,wordpress.com,friendfeed.com,myspace.com,digg.com,reddit.com,stumbleupon.com,twine.com,yelp.com,mixx.com,delicious.com,tumblr.com,disqus.com,intensedebate.com,plurk.com,slideshare.net,backtype.com,netvibes.com,mister-wong.com,diigo.com,flixster.com,youtube.com,vimeo.com,12seconds.tv,zooomr.com,identi.ca,jaiku.com,flickr.com,imeem.com,dailymotion.com,photobucket.com,fotolog.com,smugmug.com,classmates.com,myyearbook.com,mylife.com,tagged.com,brightkite.com,ning.com,bebo.com,hi5.com,yuku.com,cafemom.com,xanga.com>Free Site|free.avg.com>Forums|forums.avg.com>Blogs|blogs.avg.com>ThreatLabs|avgthreatlabs.com"
s._channelParameter="RSS|rss"
s._channelPattern="Paid Search|ppc,ps>Partners|85,al,wc,mp,sm>Renewal|re>Email|em>Free Site|fs,fr>In-Client|inc,incP,def,fp>Upgrade|upg>Affiliate|aff>Support|sprt>Trials|tr>ThreatLabs|thl>Social Offers|so,scom"

s.usePlugins=true
function s_doPlugins(s) {
	/* Add calls to plugins here */
  
  
var kr=document.referrer,kk=s.getQueryParam("q","",kr),ks=s.getQueryParam("esrc","",kr);if(kr.indexOf("www.google.com")&&!kk&&ks=="s"){var ksr=kr.split("q="),kq="q=Google%20Secure%20Search";s.referrer=ksr[0]+kq+ksr[1]};  
  
s.eVar41=s.getVisitNum();   
  
var ref = document.referrer;

if(ref.indexOf('facebook.com/plugins/like.php')>0){
s.referrer='www.avg.com';}

if(ref.indexOf('cmpid=fs_pct_us_thankyou')>0){
s.eVar27 = "fs_pct_us_thankyou";
}

if(ref.indexOf('cmpid=fs_lk_us_thankyou')>0){
s.eVar27 = "fs_lk_us_thankyou";
}

if(s.getQueryParam('ssf','',ref)) {
	s.prop24="Linkscanner";
 
if(ref.indexOf('google')>0){
s.referrer='http://google-LinkScanner.com';}

if(ref.indexOf('yahoo')>0){
s.referrer='http://yahoo-LinkScanner.com';}

if(ref.indexOf('msn')>0){
s.referrer='http://msn-LinkScanner.com';}
} 

if(!s.campaign){
	s.campaign=s.getQueryParam('cmpid,ctype')
}
if(!s.prop17){
  s.prop17=s.getQueryParam('cmpid,ctype')
}
if(s.getQueryParam('intcmp') && s.eVar1!='upg_lic_720' && s.eVar1!='upg_lic_720_in' && s.eVar1!='upg_lic_720_hp' ){
	s.eVar1=s.getQueryParam('intcmp')
}
if(!s.prop18){
  s.prop18=s.getQueryParam('intcmp')
}
if(!s.eVar16){
	s.eVar16=s.getQueryParam('mtv,mvt')
}
if(!s.prop19){
  s.prop19=s.getQueryParam('mtv,mvt')
}
if(!s.eVar26){
  s.eVar26=s.getQueryParam('re')
}
if(!s.prop16){
  s.prop16=s.getQueryParam('re')
}
if(!s.eVar38){
	s.eVar38=s.getQueryParam('cmpcart')
}
if(!s.prop28){
	s.prop28=s.getQueryParam('cmpcart')
}
if(!s.eVar8){
	s.eVar8=s.getQueryParam('lnkid')
}
if(!s.eVar68){
	s.eVar68=s.getQueryParam('clnkid')
}
if(!s.eVar55){
	s.eVar55=s.getQueryParam('pid')
}
if(!s.eVar74){
	s.eVar74=s.getQueryParam('mid')
}
if(!s.eVar53){
	s.eVar53=s.getQueryParam('rid')
}
if(!s.eVar65){
	s.eVar65=s.getQueryParam('inappid')
}
if(!s.eVar30){
	s.eVar30=s.getQueryParam('popup')
}
if(!s.eVar51){
	s.eVar51=s.getQueryParam('app-ai')
}
if(!s.eVar57){
	s.eVar57=s.getQueryParam('app-be')
}
if(!s.eVar63){
	s.eVar63=s.getQueryParam('app-prtype')
}
if(!s.eVar60){
	s.eVar60=s.getQueryParam('app-ver')
}
if(!s.eVar11){
	s.eVar11=s.getQueryParam('lcinfo')
}

s.prop53=s.getAndPersistValue(s.campaign,'s_campaign_per',0);


if(s.pageName){

                                                  /* remove parameters from URL begin */
                       
                                                if (document.location.href.indexOf('?') >= 0 /*&& document.location.href.indexOf('cmpid') && document.location.href.indexOf('intcmp') < 0*/) s.pageName=document.location.href.substring(0,document.location.href.indexOf('?'));
                                                                                                  
                                                if (document.location.href.indexOf('#') >= 0) s.pageName=document.location.href.substring(0,document.location.href.indexOf('#'));                                                 
                       
                                                  /* remove parameters from URL end */                          
                                }
                                
                                
if(s.eVar22){                                              
 
                                                  /* Uninstallation URL's section begin */
                                               
                                                  if(s.eVar22.indexOf('special-uninstallation-feedback-trial')>-1){
                                                                                                                               
                                                                s.events=s.apl(s.events,'event36,event39',',',1); 
                                                                s.prop54 = "trial";                                               
                                                }else if(s.eVar22.indexOf('special-uninstallation-feedback-appf')>-1){
                                                                                                
                                                                s.events=s.apl(s.events,'event36,event38',',',1);
                                                                s.prop54 = "free";  
                                                }else if(s.eVar22.indexOf('special-uninstallation-feedback-app')>-1){
                                                                
                                                                s.events=s.apl(s.events,'event36,event37',',',1);
                                                                s.prop54 = "paid";
                                                }else if(s.eVar22.indexOf('special-uninstallation')>-1){
                                                                
                                                                s.events=s.apl(s.events,'event36,event40',',',1);
                                                                s.prop54 = "other";                                                                
                                                }
                                                
                                                /* Uninstallation URL's section end */
                                              
                                               
                                                /* Thanks you page begin */
                                                 else if(s.eVar22.indexOf('special-olb-free-registration')>-1){                                                               
                                                                s.events=s.apl(s.events,'event45',',',1);                                                                                                                                
                                                }
                                                
                                                /* Thanks you page end */
                                                
                                                /* My account, LiveKive, Family safety traffic begin */
                                                 else if(s.eVar22.indexOf('livekive.avg.com')>-1){                                                               
                                                                s.events=s.apl(s.events,'event59,event62',',',1);                                                                                                                                
                                                }
                                                 else if(s.eVar22.indexOf('myaccount.avg.com')>-1){                                                               
                                                                s.events=s.apl(s.events,'event60,event62',',',1);                                                                                                                                
                                                }
                                                 else if(s.eVar22.indexOf('familysafety.avg.com')>-1){                                                               
                                                                s.events=s.apl(s.events,'event61,event62',',',1);                                                                                                                                
                                                }

                                                
                                                /* My account, LiveKive, Family safety traffic end */
                                                
                                                
                                                /* My account, LiveKive, Family safety registration begin */
                                                
                                                if(s.prop7) {
                                                
                                                 if(s.prop7.indexOf('livekive_trial_thank-you-page')>-1){                                                               
                                                                s.events=s.apl(s.events,'event63,event65',',',1);                                                                                                                                
                                                }
                                                 if(s.prop7.indexOf('livekive_free_thank-you-page')>-1){                                                               
                                                                s.events=s.apl(s.events,'event64,event65',',',1);                                                                                                                                
                                                }
                                                if(s.prop7.indexOf('my-account_thank-you-page')>-1){                                                               
                                                                s.events=s.apl(s.events,'event66,event65',',',1);                                                                                                                                
                                                }
                                                } 
                                                
                                                 /* My account, LiveKive, Family safety registration end */
                                                
                                                
                                                else if(s.eVar22.indexOf('intcmp=rem')>-1){
                                                                s.eVar1='upg_lic_720_in'
                                                }


                                                //s.pageName=s.getPageName();

                }



	/* Channel Manager */

	s.channelManager('cmpid,ctype',':',0);

	/* Removing Direct Load Tracking */
	if(s._channel=="Direct Load") {
	s.channelValue=s.getAndPersistValue(s._channel,'s_channeltrafic_p',0);
	s.channelTrafic= s.channelValue;
	s._referrer=s._referringDomain=s._campaign=s._keywords=s._channel=""}

	/* keyword encoding */
	s._keywords=decodeURI(s._keywords);

	/* separating brands from Organic Search */
        if (s._channel == 'Natural Search: Non-Brand') {
            var marque = new Array('avg','agv');
            var i;
            for (i = 0; i < marque.length; i++) {
                if (s._keywords.indexOf(marque[i], 0) > -1) { s._channel = "Natural Search: Brand"; }
            }
        }

        if (s._channel == 'Paid Non-Search') {
            s._keywords = 'n/a';
        }
        if (s._channel == 'Natural Search: Non-Brand') {
            s._campaign = 'SEO:' + s._partner + ':' + s._keywords;
        }
        if (s._channel == 'Natural Search: Brand') {
            s._campaign = 'Natural Search: Brand:' + s._partner + ':' + s._keywords;
        }

        if (s._channel == 'Referrers') {
            s._campaign = 'ref:' + s._referringDomain;
        }

        if (s._channel == 'Referrers' || s._channel == 'Affiliates' || s._channel == 'Banners' || s._channel == 'Partners' || s._channel == 'Social Media')
            s._partner = s._channel + ":" + s._referringDomain;
        if (s._channel == 'Emailing')
            s._partner = s._channel;

        /* set channel value to s.channelTrafic on every page*/
	if (s._channel) {
        s.channelValue = s.getAndPersistValue(s._channel, 's_channeltrafic_p', 0);
        s.channelTrafic = s.channelValue;
	}

        /*Stacking tracking codes*/
        if (s._campaign == 'n/a') {
            s.stackedTrackingCodes = s.crossVisitParticipation('[' + s._channel + ']', 's_stc', '90', '5', '>', 'purchase');
        }
        else { s.stackedTrackingCodes = s.crossVisitParticipation(s._campaign, 's_stc', '90', '5', '>', 'purchase'); }

        /*Stacking Channels*/
        s.stackedChannels = s.crossVisitParticipation(s._channel, 's_schan', '90', '5', '>', 'purchase');

        /*Stacking Keywords*/
        if (s._keywords) {
            if (s._keywords == 'n/a') { s.stackedKeywords = s.crossVisitParticipation('[' + s._channel + ']', 's_skw', '90', '5', '>', 'purchase'); }
            else { s.stackedKeywords = s.crossVisitParticipation(s._keywords, 's_skw', '90', '5', '>', 'purchase'); }
        }
        /*Stacking Internal campaign*/
        if (s.eVar1) {
            s.stackedInternalCampaign = s.crossVisitParticipation(s.eVar1, 'evar1_chan', '90', '5', '>', 'purchase');
        }        

        /*Stacking eVar10 */
        if (s.eVar10) {
            s.stackedevar10 = s.crossVisitParticipation(s.eVar10, 'evar10_chan', '90', '5', '>', 'purchase');
        }        


	/* variables set up */
        s.prop24 = s.channelTrafic;
        s.campaign = s._campaign;
        s.eVar34 = s._channel;
        s.eVar42 = s._partner;
        s.eVar43 = s._keywords;
        s.eVar44 = s._referringDomain;
        s.eVar45 = s.stackedTrackingCodes;
        s.eVar46 = s.stackedChannels;
        s.eVar47 = s.stackedKeywords;
        s.eVar71 = s.stackedInternalCampaign;
        s.eVar72 = s.stackedevar10;

	if (s._channel == "Natural Search: Non-Brand" || s._channel == "Paid Search" ) {s.eVar48='D=v34+":"+v43+":"+pageName';}
	else {if (s._channel) s.eVar48='D=v34+":"+pageName';}

	/* clickPast */
	s.tempSCCT = s.campaign;
	s.tempSCCT = s.getValOnce(s.tempSCCT,'s_tempSCCT',0);
	s.clickPast(s.tempSCCT,'event15','event16');

	/* Automated download tracking */
	var url=s.linkHandler("download-file-");
	if(url){ 
        	if(url.indexOf('tri')>-1){
			if(url.indexOf('avd')>-1){
				s.prop9=url;
				s.eVar9=url;
				s.events=s.events?s.events+",event9,event10,event12":"event9,event10,event12";
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event9,event10,event12";
			}else if(url.indexOf('fww')>-1){
				s.prop9=url;
				s.eVar9=url;
				s.events=s.events?s.events+",event9,event12":"event9,event12";
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event9,event12";
			}else if(url.indexOf('isp')>-1){
				s.prop9=url;
				s.eVar9=url;
				s.events=s.events?s.events+",event9,event11,event12":"event9,event11,event12";
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event9,event11,event12";
			}else if(url.indexOf('idt')>-1){
				s.prop9=url;
				s.eVar9=url;
				s.events=s.events?s.events+",event9,event12":"event9,event12";
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event9,event12";
			}
       else if(url.indexOf('triavc')>-1){   
				s.prop9=url;
				s.eVar9=url;
				s.events=s.events?s.events+",event9,event10,event12":"event9,event10,event12";
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event9,event10,event12";
			}   
       else if(url.indexOf('triisc')>-1){   
				s.prop9=url;
				s.eVar9=url;
				s.events=s.events?s.events+",event9,event11,event12":"event9,event11,event12";
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event9,event11,event12";
			}
       else if(url.indexOf('triavb')>-1){  
				s.prop9=url;
				s.eVar9=url;
				s.events=s.events?s.events+",event9,event10,event12":"event9,event10,event12";
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event9,event10,event12";
			}      
       else if(url.indexOf('triise')>-1){   
				s.prop9=url;
				s.eVar9=url;
				s.events=s.events?s.events+",event9,event11,event12":"event9,event11,event12";
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event9,event11,event12";
			}
       else if(url.indexOf('trifsc')>-1){  
				s.prop9=url;
				s.eVar9=url;
				s.events=s.events?s.events+",event9,event12":"event9,event12";
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event9,event12";
			}
       else if(url.indexOf('trimsb')>-1){   
				s.prop9=url;
				s.eVar9=url;
				s.events=s.events?s.events+",event9,event12":"event9,event12";
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event9,event12";
			}                                                
       else if(url.indexOf('trialb')>-1){   
				s.prop9=url;
				s.eVar9=url;
				s.events=s.events?s.events+",event9,event12":"event9,event12";
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event9,event12";
			} 
		} else
        		if(url.indexOf('afg')>-1){
				s.prop9=url;
				s.eVar9=url;
				s.events=s.events?s.events+",event9":"event9";
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event9,event13";
			}else if(url.indexOf('avd')>-1){
				s.prop9=url;
				s.eVar9=url;
				s.events=s.events?s.events+",event9,event10":"event9,event10";
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event9,event10";
			}else if(url.indexOf('fww')>-1){
				s.prop9=url;
				s.eVar9=url;
				s.events=s.events?s.events+",event9":"event9";
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event9";
			}else if(url.indexOf('isp')>-1){
				s.prop9=url;
				s.eVar9=url;
				s.events=s.events?s.events+",event9,event11":"event9,event11";
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event9,event11";
			}else if(url.indexOf('lsf')>-1){
				s.prop9=url;
				s.eVar9=url;
				s.events=s.events?s.events+",event9,event14":"event9,event14";
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event9,event14";
			}else if(url.indexOf('afh')>-1){     
				s.prop9=url;
				s.eVar9=url;
				s.events=s.events?s.events+",event9,event10,event13":"event9,event10,event13";
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event9,event10,event13";
			}else if(url.indexOf('abf')>-1){   
				s.prop9=url;
				s.eVar9=url;
				s.events=s.events?s.events+",event9,event10,event13":"event9,event10,event13";
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event9,event10,event13";
			}else if(url.indexOf('smf')>-1){      
				s.prop9=url;
				s.eVar9=url;
				s.events=s.events?s.events+",event9,event14":"event9,event14";
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event9,event14";
			}else if(url.indexOf('alf')>-1){      
				s.prop9=url;
				s.eVar9=url;
				s.events=s.events?s.events+",event9,event14":"event9,event14";
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event9,event14";
			}else if(url.indexOf('avc')>-1){    
				s.prop9=url;
				s.eVar9=url;
				s.events=s.events?s.events+",event9,event10":"event9,event10";
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event9,event10";
			}else if(url.indexOf('avc')>-1){   
				s.prop9=url;
				s.eVar9=url;
				s.events=s.events?s.events+",event9,event11":"event9,event11";
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event9,event11";
			}else if(url.indexOf('pct')>-1){     
				s.prop9=url;
				s.eVar9=url;
				s.events=s.events?s.events+",event9":"event9";
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event9";
			}else if(url.indexOf('avb')>-1){     
				s.prop9=url;
				s.eVar9=url;
				s.events=s.events?s.events+",event9,event10":"event9,event10";
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event9,event10";
			}else if(url.indexOf('ise')>-1){    
				s.prop9=url;
				s.eVar9=url;
				s.events=s.events?s.events+",event9,event10":"event9,event10";
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event9,event10";
			}else if(url.indexOf('fsc')>-1){   
				s.prop9=url;
				s.eVar9=url;
				s.events=s.events?s.events+",event9":"event9";
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event9";
			}else if(url.indexOf('msb')>-1){     
				s.prop9=url;
				s.eVar9=url;
				s.events=s.events?s.events+",event9":"event9";
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event9";
			}else if(url.indexOf('alb')>-1){      
				s.prop9=url;
				s.eVar9=url;
				s.events=s.events?s.events+",event9":"event9";
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event9";
			}          
      else {
				s.prop9=url;
				s.eVar9=url;
				s.events=s.events?s.events+",event9,event10,event13":"event9,event10,event13";
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event9,event10,event13";
			}
		}

    /*
var tempVar
tempVar=s.getQueryParam('ssf')
if(tempVar)  {
  s.prop24="Linkscanner";
  s.referrer='Linkscanner';
              }                           

  */


var tempVar
tempVar=s.getQueryParam('ssf')
if(tempVar)  {  

  var ref = document.referrer;
    
    {
	  
    s.prop24="Linkscanner";
    s.eVar34="Linkscanner";
    s.campaign="Linkscanner";
    
     
    if(ref.indexOf('google.com')>=0){
    s.referrer='http://google-linkscanner.com';}

    else if(ref.indexOf('yahoo')>=0){
    s.referrer='http://yahoo-linkscanner.com';}

    else if(ref.indexOf('msn')>=0){
    s.referrer='http://msn-linkscanner.com';}
                 
    else{
    s.referrer='http://others-linkscanner.com';}    
    
} 
}                           

  
if(s.eVar22){

                                                if(s.eVar22.indexOf('?a=')>-1 && (s.eVar22.indexOf('cmpid')>-1)<1 ) {
                                                                s.campaign = "re-app"
                                                }
                                                else if(s.eVar22.indexOf('?lic=')>-1 && (s.eVar22.indexOf('cmpid')>-1)<1 ) {
                                                                s.campaign = "re-app"
                                                }   
}    


s.prop30=s.getFlash('s_fv');
s.eVar50=s.getFlash('s_fv');
	if(!s.prop30 && !s.eVar50){
		s.detectFlash('s_fv','10');
		s.prop30=s.getFlash('s_fv');
    s.eVar50=s.getFlash('s_fv');
	} 
  
 /* s.eVar53="{$GLBDOC}"; */  
 
if(s.products) {

if(s.products.indexOf('dvd10.')>=0 && s.events.indexOf('purchase')>=0 && (document.cookie.indexOf('add-to-cart_bck-dvd') != -1) ){
s.events=s.apl(s.events,'event47,event48',',',1); 
} 

if(s.products.indexOf('pct.')>=0 && s.events.indexOf('purchase')>=0 && (document.cookie.indexOf('add-to-cart_pct') != -1) ){
s.events=s.apl(s.events,'event46',',',1);

if(!s.events.indexOf('event48')>=0) {
s.events=s.apl(s.events,'event48',',',1); }      
      
       }
       
if(s.products.indexOf('eic.')>=0 && s.events.indexOf('purchase')>=0 && (document.cookie.indexOf('add-to-cart_aei') != -1) ){
s.events=s.apl(s.events,'event18',',',1);

if(!s.events.indexOf('event48')>=0) {
s.events=s.apl(s.events,'event48',',',1); }      
      
       }       
       
     /*
else if(s.products.indexOf('pct.1.0.0.12m')>=0 && s.events.indexOf('purchase')>=0 && (document.cookie.indexOf('add-to-cart_pct') != -1) && s.products.indexOf('dvd10.1.10.0.24m')>=0 && (document.cookie.indexOf('add-to-cart_bck-dvd') != -1) ) {
s.events=s.apl(s.events,'event46,event47,event48',',',1); 

}              */

    /*
if(s.eVar38) {
if(s.eVar38.indexOf('new-cart-design')!= -1){
s.eVar54 = 'add-to-cart_bck-dvd';   
s.events=s.apl(s.events,'event42,event44',',',1);
setCookie('add-to-cart_bck-dvd','add-to-cart_bck-dvd', exp)      
       }} */

}    
 
 
if (document.cookie.indexOf('omnc90') != -1) { 
s.prop40=s.eVar70 = get_cookie ( "omnc90" );  

/* var d = new Date();
var t_mon = d.getMonth();
t_mon++;
s.prop41=s.eVar71 = get_cookie ( "omnc90" ) + '_' + d.getDate() + ':' + t_mon + ':' + d.getFullYear();  
   */
}
 
if(s.eVar22){         
if ((s.eVar22.indexOf('avg.com')>=0) && (s.eVar22.indexOf('free.avg.com')<=0) ) 
{
s.prop42 = "corporate-website";
s.eVar59 = "corporate-website";
s.events=s.apl(s.events,'event77',',',1);
}         
     
if(s.eVar22.indexOf('free.avg.com')>=0) 
{
s.prop42 = "free-website";
s.eVar59 = "free-website";
s.events=s.apl(s.events,'event78',',',1);
}
}                                  

// returning visitors start
   

if(s.eVar1)  
{  

setCookie365('evar1_value',s.eVar1,'2'); 

if(document.cookie.indexOf('product-name')!= -1) {
var rvcookievalue = get_cookie ( "product-name" ); 


if((rvcookievalue != 'trial-is') && (rvcookievalue != 'trial-av') && (rvcookievalue != 'trial-pct') && (rvcookievalue != 'free-av') && (rvcookievalue != 'paid-is') && (rvcookievalue != 'paid-is+pct') && (rvcookievalue != 'paid-av') && (rvcookievalue != 'paid-av+pct') && (rvcookievalue != 'paid-pct'))   {


       
if(s.eVar1.indexOf('ws_internet-security_2211')>=0)               { setCookie365('product-name','ws_internet-security','365');        setCookie365('v_rv1h',s.getVisitNum(),'0.125');  }
if(s.eVar1.indexOf('fs_download-avg-internet-security_93734')>=0) { setCookie365('product-name','fs_internet-security','365');        setCookie365('v_rv1h',s.getVisitNum(),'0.125');  }

if(s.eVar1.indexOf('ws_free-antivirus-download_969')>=0)          { setCookie365('product-name','ws_free-antivirus-download','365');  setCookie365('v_rv1h',s.getVisitNum(),'0.125');  }
if(s.eVar1.indexOf('fs_comparison-grid_224954')>=0)               { setCookie365('product-name','fs_comparison-grid','365');          setCookie365('v_rv1h',s.getVisitNum(),'0.125');  } 

if(s.eVar1.indexOf('ws_anti-virus_2213')>=0)                      { setCookie365('product-name','ws_anti-virus','365');               setCookie365('v_rv1h',s.getVisitNum(),'0.125');  }
if(s.eVar1.indexOf('fs_download-avg-antivirus_226452')>=0)        { setCookie365('product-name','fs_download-avg-antivirus','365');   setCookie365('v_rv1h',s.getVisitNum(),'0.125');  } 

if(s.eVar1.indexOf('ws_pc-tuneup_230805')>=0)                     { setCookie365('product-name','ws_pc-tuneup','365');                setCookie365('v_rv1h',s.getVisitNum(),'0.125');  }
if(s.eVar1.indexOf('fs_download-avg-pctuneup_231036')>=0)         { setCookie365('product-name','fs_download-avg-pctuneup','365');    setCookie365('v_rv1h',s.getVisitNum(),'0.125');  } 

if(s.eVar1.indexOf('ws_premium-security_1455')>=0)                { setCookie365('product-name','ws_premium-security','365');         setCookie365('v_rv1h',s.getVisitNum(),'0.125');  }
  }}

else {

if(s.eVar1.indexOf('ws_internet-security_2211')>=0)               { setCookie365('product-name','ws_internet-security','365');        setCookie365('v_rv1h',s.getVisitNum(),'0.125');  }
if(s.eVar1.indexOf('fs_download-avg-internet-security_93734')>=0) { setCookie365('product-name','fs_internet-security','365');        setCookie365('v_rv1h',s.getVisitNum(),'0.125');  }

if(s.eVar1.indexOf('ws_free-antivirus-download_969')>=0)          { setCookie365('product-name','ws_free-antivirus-download','365');  setCookie365('v_rv1h',s.getVisitNum(),'0.125');  }
if(s.eVar1.indexOf('fs_comparison-grid_224954')>=0)               { setCookie365('product-name','fs_comparison-grid','365');          setCookie365('v_rv1h',s.getVisitNum(),'0.125');  } 

if(s.eVar1.indexOf('ws_anti-virus_2213')>=0)                      { setCookie365('product-name','ws_anti-virus','365');               setCookie365('v_rv1h',s.getVisitNum(),'0.125');  }
if(s.eVar1.indexOf('fs_download-avg-antivirus_226452')>=0)        { setCookie365('product-name','fs_download-avg-antivirus','365');   setCookie365('v_rv1h',s.getVisitNum(),'0.125');  } 

if(s.eVar1.indexOf('ws_pc-tuneup_230805')>=0)                     { setCookie365('product-name','ws_pc-tuneup','365');                setCookie365('v_rv1h',s.getVisitNum(),'0.125');  }
if(s.eVar1.indexOf('fs_download-avg-pctuneup_231036')>=0)         { setCookie365('product-name','fs_download-avg-pctuneup','365');    setCookie365('v_rv1h',s.getVisitNum(),'0.125');  } 

if(s.eVar1.indexOf('ws_premium-security_1455')>=0)                { setCookie365('product-name','ws_premium-security','365');         setCookie365('v_rv1h',s.getVisitNum(),'0.125');  }


}

}



if(s.eVar9)  
{  
        
if(s.events.indexOf('event12')>=0) 
{
if(s.events.indexOf('event11')>=0){ setCookie365('product-name','trial-is','365');     setCookie365('v_rv1h',s.getVisitNum(),'0.125');       }
if(s.events.indexOf('event10')>=0) { setCookie365('product-name','trial-av','365');     setCookie365('v_rv1h',s.getVisitNum(),'0.125');   }
if(s.eVar9.indexOf('pct')>=0) { setCookie365('product-name','trial-pct','365');     setCookie365('v_rv1h',s.getVisitNum(),'0.125');  }
}
  
if(s.events.indexOf('event13')>=0) 
{
if(s.events.indexOf('event10')>=0) { setCookie365('product-name','free-av','365');     setCookie365('v_rv1h',s.getVisitNum(),'0.125'); }
}

if(s.eVar9.indexOf('down_trial_is_avg_3935')>=0)  { 
s.events=s.apl(s.events,'event9,event11,event12',',',1);
 }
 
}


if(s.events) { 
if(s.events.indexOf('purchase')>=0) 
{    


if((document.cookie.indexOf('evar1_value')<= -1))  { s.prop50 = "not-classified_purchase"; }

    else { s.prop50 = get_cookie ( "evar1_value" );  }




if(s.products) 
{
if(s.eVar3.indexOf('-A')<=0) 
{
if((s.products.indexOf('isc')>=0) && (s.products.indexOf('pct')<=0)) { setCookie365('product-name','paid-is','365');     setCookie365('v_rv1h',s.getVisitNum(),'0.125'); }

if((s.products.indexOf('isc')>=0) && (s.products.indexOf('pct')>=0)) { setCookie365('product-name','paid-is+pct','365');     setCookie365('v_rv1h',s.getVisitNum(),'0.125'); }

if((s.products.indexOf('avc')>=0) && (s.products.indexOf('pct')<=0)) { setCookie365('product-name','paid-av','365');     setCookie365('v_rv1h',s.getVisitNum(),'0.125'); }

if((s.products.indexOf('avc')>=0) && (s.products.indexOf('pct')>=0)) { setCookie365('product-name','paid-av+pct','365');     setCookie365('v_rv1h',s.getVisitNum(),'0.125'); }

if((s.products.indexOf('pct')>=0) && (s.products.indexOf('isc')<=0) && (s.products.indexOf('avc')<=0) ) { setCookie365('product-name','paid-pct','365');     setCookie365('v_rv1h',s.getVisitNum(),'0.125'); }

}}
}}   




if(document.cookie.indexOf('product-name')!= -1) {
    if(document.cookie.indexOf('v_rv1h')<= -1) {
    
   /* var previous-visit = get_cookie("visit-number");
    var current-visit = s.getVisitNum();  */

     /*   if(get_cookie("visit-number") < s.getVisitNum())*/ {

s.eVar49 = get_cookie ( "product-name" );  

} } }    

// returning visitors end

s.tnt=s.trackTNT();

}
s.doPlugins=s_doPlugins

/************************** PLUGINS SECTION *************************/

/* You may insert any plugins you wish to use here.                 */

function dwn_trial_is(obj, server, docid)
{  
var s=s_gi('avgcorporatepublicww'); 
s.linkTrackVars='prop9,eVar9,events'; 
s.linkTrackEvents='event9,event11,event12,event94'; 
s.eVar9='down_trial_is_'+server+'_'+docid; 
s.prop9='down_trial_is_'+server+'_'+docid; 
s.events='event9,event11,event12,event94'; 
s.tl(this,'o','download_trial'); 
}

function dwn_trial_pct(obj, server, docid)
{  
var s=s_gi('avgcorporatepublicww'); 
s.linkTrackVars='prop9,eVar9,events'; 
s.linkTrackEvents='event9,event12,event73,event95'; 
s.eVar9='down_trial_pct_'+server+'_'+docid;  
s.prop9='down_trial_pct_'+server+'_'+docid;  
s.events='event9,event12,event73,event95'; 
s.tl(this,'o','download_trial');
}

function dwn_trial_av(obj, server, docid)
{  
var s=s_gi('avgcorporatepublicww'); 
s.linkTrackVars='prop9,eVar9,events'; 
s.linkTrackEvents='event9,event10,event12,event93'; 
s.eVar9='down_trial_av_'+server+'_'+docid;  
s.prop9='down_trial_av_'+server+'_'+docid;  
s.events='event9,event10,event12,event93'; 
s.tl(this,'o','download_trial');
}

function dwn_free_av(obj, server, docid)
{  
var s=s_gi('avgcorporatepublicww'); 
s.linkTrackVars='prop9,eVar9,events'; 
s.linkTrackEvents='event9,event10,event13,event99'; 
s.eVar9='down_free_av_'+server+'_'+docid;  
s.prop9='down_free_av_'+server+'_'+docid; 
s.events='event9,event10,event13,event99'; 
s.tl(this,'o','download_free');
}

function dwn_free_lsnr(obj, server, docid)
{  
var s=s_gi('avgcorporatepublicww'); 
s.linkTrackVars='prop9,eVar9,events'; 
s.linkTrackEvents='event9,event14'; 
s.eVar9='down_free_ls_'+server+'_'+docid;   
s.prop9='down_free_ls_'+server+'_'+docid;   
s.events='event9,event14'; 
s.tl(this,'o','download_linkscanner');
}

function dwn_ra(obj, server, docid)
{  
var s=s_gi('avgcorporatepublicww'); 
s.linkTrackVars='prop9,eVar9,events'; 
s.linkTrackEvents='event9,event74'; 
s.eVar9='down_free_ra_'+server+'_'+docid;  
s.prop9='down_free_ra_'+server+'_'+docid;  
s.events='event9,event74'; 
s.tl(this,'o','download_ra');
}

function dwn_free_ss(obj, server, docid)
{  
var s=s_gi('avgcorporatepublicww'); 
s.linkTrackVars='prop9,eVar9,events'; 
s.linkTrackEvents='event9,event19'; 
s.eVar9='down_free_ss_'+server+'_'+docid;  
s.prop9='down_free_ss_'+server+'_'+docid;  
s.events='event9,event19'; 
s.tl(this,'o','download_ss');
}

function dwn_free_lsnr_mac(obj, server, docid)
{  
var s=s_gi('avgcorporatepublicww'); 
s.linkTrackVars='prop9,eVar9,events'; 
s.linkTrackEvents='event9,event14'; 
s.eVar9='down_free_ls-mac_'+server+'_'+docid;   
s.prop9='down_free_ls-mac_'+server+'_'+docid;   
s.events='event9,event14'; 
s.tl(this,'o','download_linkscanner');
}

function dwn_trial_dupdt(obj, server, docid)
{  
var s=s_gi('avgcorporatepublicww'); 
s.linkTrackVars='prop9,eVar9,events'; 
s.linkTrackEvents='event9,event12'; 
s.eVar9='dwn_trial_dupdt_'+server+'_'+docid;  
s.prop9='dwn_trial_dupdt_'+server+'_'+docid;  
s.events='event9,event12'; 
s.tl(this,'o','download_trial');
}


function get_cookie ( cookie_name ){var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );if ( results )return ( unescape ( results[2] ) ); else return null;}     


/************************ Test&Target Plugin Start *************************/
/*
* TNT Integration Plugin v1.0
* v - Name of the javascript variable that is used. Defaults to s_tnt
(optional)
* p - Name of the url parameter. Defaults to s_tnt (optional)
* b - Blank Global variable after plugin runs. Defaults to true (Optional)
*/
s.trackTNT = function(v, p, b)
{
var s=this, n="s_tnt", p=(p)?p:n, v=(v)?v:n, r="",pm=false, b=(b)?b:true;
if(s.getQueryParam)
pm = s.getQueryParam(p); //grab the parameter
if(pm)
r += (pm + ","); // append the parameter
if(s.wd[v] != undefined)
r += s.wd[v]; // get the global variable
if(b)
s.wd[v] = ""; // Blank out the global variable for ajax requests
return r;
}
/*********************** Test&Target Plugin End *************************/

/*
 * Plugin: getVisitNum - version 3.0
 */
s.getVisitNum=new Function("tp","c","c2",""
+"var s=this,e=new Date,cval,cvisit,ct=e.getTime(),d;if(!tp){tp='m';}"
+"if(tp=='m'||tp=='w'||tp=='d'){eo=s.endof(tp),y=eo.getTime();e.setTi"
+"me(y);}else {d=tp*86400000;e.setTime(ct+d);}if(!c){c='s_vnum';}if(!"
+"c2){c2='s_invisit';}cval=s.c_r(c);if(cval){var i=cval.indexOf('&vn="
+"'),str=cval.substring(i+4,cval.length),k;}cvisit=s.c_r(c2);if(cvisi"
+"t){if(str){e.setTime(ct+1800000);s.c_w(c2,'true',e);return str;}els"
+"e {return 'unknown visit number';}}else {if(str){str++;k=cval.substri"
+"ng(0,i);e.setTime(k);s.c_w(c,k+'&vn='+str,e);e.setTime(ct+1800000);"
+"s.c_w(c2,'true',e);return str;}else {s.c_w(c,e.getTime()+'&vn=1',e)"
+";e.setTime(ct+1800000);s.c_w(c2,'true',e);return 1;}}");
s.dimo=new Function("m","y",""
+"var d=new Date(y,m+1,0);return d.getDate();");
s.endof=new Function("x",""
+"var t=new Date;t.setHours(0);t.setMinutes(0);t.setSeconds(0);if(x=="
+"'m'){d=s.dimo(t.getMonth(),t.getFullYear())-t.getDate()+1;}else if("
+"x=='w'){d=7-t.getDay();}else {d=1;}t.setDate(t.getDate()+d);return "
+"t;");

/*
* Plugin Utility: apl v1.1
*/
s.apl=new Function("L","v","d","u",""
+"var s=this,m=0;if(!L)L='';if(u){var i,n,a=s.split(L,d);for(i=0;i<a."
+"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+"e()));}}if(!m)L=L?L+d+v:v;return L");


/*
 * Plugin: getPageName v2.1 - parse URL and return
 */
s.getPageName=new Function("u",""
+"var s=this,v=u?u:''+s.wd.location,x=v.indexOf(':'),y=v.indexOf('/',"
+"x+4),z=v.indexOf('?'),c=s.pathConcatDelim,e=s.pathExcludeDelim,g=s."
+"queryVarsList,d=s.siteID,n=d?d:'',q=z<0?'':v.substring(z+1),p=v.sub"
+"string(y+1,q?z:v.length);z=p.indexOf('#');p=z<0?p:s.fl(p,z);x=e?p.i"
+"ndexOf(e):-1;p=x<0?p:s.fl(p,x);p+=!p||p.charAt(p.length-1)=='/'?s.d"
+"efaultPage:'';y=c?c:'/';while(p){x=p.indexOf('/');x=x<0?p.length:x;"
+"z=s.fl(p,x);if(!s.pt(s.pathExcludeList,',','p_c',z))n+=n?y+z:z;p=p."
+"substring(x+1)}y=c?c:'?';while(g){x=g.indexOf(',');x=x<0?g.length:x"
+";z=s.fl(g,x);z=s.pt(q,'&','p_c',z);if(z){n+=n?y+z:z;y=c?c:'&'}g=g.s"
+"ubstring(x+1)}return n");

/*
 * Plugin: getValOnce_v1.0
 */
s.getValOnce=new Function("v","c","e",""
+"var s=this,a=new Date,v=v?v:v='',c=c?c:c='s_gvo',e=e?e:0,k=s.c_r(c"
+");if(v){a.setTime(a.getTime()+e*86400000);s.c_w(c,v,e?a:0);}return"
+" v==k?'':v");

/*
 * Utility Function: p_c
 */
s.p_c=new Function("v","c",""
+"var x=v.indexOf('=');return c.toLowerCase()==v.substring(0,x<0?v.le"
+"ngth:x).toLowerCase()?v:0");

/*
 * Utility Function: split v1.5 (JS 1.0 compatible)
 */
s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

/*
 * Plugin Utility: Replace v1.0
 */
s.repl=new Function("x","o","n",""
+"var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+"substring(i+o.length);i=x.indexOf(o,i+l)}return x");


/*
* Plugin: getQueryParam 2.3 - return query string parameter(s)
* Omniture Consulting 18/06/2009: Amended to avoid using s.epa method
*/
s.getQueryParam = new Function("p", "d", "u", ""
+ "var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati"
+ "on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p"
+ ".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-"
+ "1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i="
+ "=p.length?i:i+1)}return v");
s.p_gpv = new Function("k", "u", ""
+ "var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
+ "=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf = new Function("t", "k", ""
+ "if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+ "rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase()){v=s.rep(v,'+',' '); return v;}"
+ "}return ''");

/*                                                                  
* Plugin: clickPast - version 1.0
*/
s.clickPast=new Function("scp","ct_ev","cp_ev","cpc",""
+"var s=this,scp,ct_ev,cp_ev,cpc,ev,tct;if(s.p_fo(ct_ev)==1){if(!cpc)"
+"{cpc='s_cpc';}ev=s.events?s.events+',':'';if(scp){s.events=ev+ct_ev"
+";s.c_w(cpc,1,0);}else{if(s.c_r(cpc)>=1){s.events=ev+cp_ev;s.c_w(cpc"
+",0,0);}}}");
s.p_fo=new Function("n",""
+"var s=this;if(!s.__fo){s.__fo=new Object;}if(!s.__fo[n]){s.__fo[n]="
+"new Object;return 1;}else {return 0;}");

/*
 * channelManager v2.2 - Tracking External Traffic
 */
s.channelManager=new Function("a","b","c","V",""
+"var s=this,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,t,u,v,w,x,y,z,A,B,C,D,E,F,"
+"G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,W,X,Y;g=s.referrer?s.referrer:documen"
+"t.referrer;g=g.toLowerCase();if(!g){h='1'}i=g.indexOf('?')>-1?g.ind"
+"exOf('?'):g.length;j=g.substring(0,i);k=s.linkInternalFilters.toLow"
+"erCase();k=s.split(k,',');l=k.length;for(m=0;m<l;m++){n=j.indexOf(k"
+"[m])==-1?'':g;if(n)o=n}if(!o&&!h){p=g;q=g.indexOf('//')>-1?g.indexO"
+"f('//')+2:0;r=g.indexOf('/',q)>-1?g.indexOf('/',q):i;t=g.substring("
+"q,r);t=t.toLowerCase();u=t;P='Referrers';v=s.seList+'>'+s._extraSea"
+"rchEngines;if(V=='1'){j=s.repl(j,'oogle','%');j=s.repl(j,'ahoo','^'"
+");g=s.repl(g,'as_q','*');}A=s.split(v,'>');B=A.length;for(C=0;C<B;C"
+"++){D=A[C];D=s.split(D,'|');E=s.split(D[0],',');F=E.length;for(G=0;"
+"G<F;G++){H=j.indexOf(E[G]);if(H>-1){I=s.split(D[1],',');J=I.length;"
+"for(K=0;K<J;K++){L=s.getQueryParam(I[K],'',g);if(L){L=L.toLowerCase"
+"();M=L;if(D[2]){u=D[2];N=D[2]}else{N=t}if(V=='1'){N=s.repl(N,'#',' "
+"- ');g=s.repl(g,'*','as_q');N=s.repl(N,'^','ahoo');N=s.repl(N,'%','"
+"oogle');}}}}}}}O=s.getQueryParam(a,b);if(O){u=O;if(M){P='Paid Searc"
+"h'}else{P='Paid Non-Search';}}if(!O&&M){u=N;P='Natural Search: Non-Brand'}f=s."
+"_channelDomain;if(f){k=s.split(f,'>');l=k.length;for(m=0;m<l;m++){Q"
+"=s.split(k[m],'|');R=s.split(Q[1],',');S=R.length;for(T=0;T<S;T++){"
+"W=j.indexOf(R[T]);if(W>-1)P=Q[0]}}}d=s._channelParameter;if(d){k=s."
+"split(d,'>');l=k.length;for(m=0;m<l;m++){Q=s.split(k[m],'|');R=s.sp"
+"lit(Q[1],',');S=R.length;for(T=0;T<S;T++){U=s.getQueryParam(R[T]);i"
+"f(U)P=Q[0]}}}e=s._channelPattern;if(e){k=s.split(e,'>');l=k.length;"
+"for(m=0;m<l;m++){Q=s.split(k[m],'|');R=s.split(Q[1],',');S=R.length"
+";for(T=0;T<S;T++){X=O.indexOf(R[T]);if(X==0)P=Q[0]}}}if(h=='1'&&!O)"
+"{u=P=t=p='Direct Load'}T=M+u+t;U=c?'c':'c_m';if(c!='0'){T=s.getValO"
+"nce(T,U,0);}if(T)M=M?M:'n/a';s._referrer=T&&p?p:'';s._referringDoma"
+"in=T&&t?t:'';s._partner=T&&N?N:'';s._campaignID=T&&O?O:'';s._campai"
+"gn=T&&u?u:'';s._keywords=T&&M?M:'';s._channel=T&&P?P:'';");
/* Top 130 - Grouped */
s.seList="altavista.co,altavista.de|q,r|AltaVista>.aol.,suche.aolsvc"
+".de|q,query|AOL>ask.jp,ask.co|q,ask|Ask>www.baidu.com|wd|Baidu>daum"
+".net,search.daum.net|q|Daum>google.,googlesyndication.com|q,as_q|Go"
+"ogle>icqit.com|q|icq>bing.com|q|Microsoft Bing>myway.com|searchfor|"
+"MyWay.com>naver.com,search.naver.com|query|Naver>netscape.com|query"
+",search|Netscape Search>reference.com|q|Reference.com>seznam|w|Sezn"
+"am.cz>abcsok.no|q|Startsiden>tiscali.it,www.tiscali.co.uk|key,query"
+"|Tiscali>virgilio.it|qs|Virgilio>yahoo.com,yahoo.co.jp|p,va|Yahoo!>"
+"yandex|text|Yandex.ru>search.cnn.com|query|CNN Web Search>search.ea"
+"rthlink.net|q|Earthlink Search>search.comcast.net|q|Comcast Search>"
+"search.rr.com|qs|RoadRunner Search>optimum.net|q|Optimum Search";

/*
 * s.join: 1.0 - s.join(v,p)
 *
 *  v - Array (may also be array of array)
 *  p - formatting parameters (front, back, delim, wrap)
 *
 */

s.join = new Function("v","p",""
+"var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"
+":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"
+";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el"
+"se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");


/*
 *	Plug-in: crossVisitParticipation v1.5 - stacks values from
 *	specified variable in cookie and returns value
 */

s.crossVisitParticipation=new Function("v","cn","ex","ct","dl","ev","dv",""
+"var s=this,ce;if(typeof(dv)==='undefined')dv=0;if(s.events&&ev){var"
+" ay=s.split(ev,',');var ea=s.split(s.events,',');for(var u=0;u<ay.l"
+"ength;u++){for(var x=0;x<ea.length;x++){if(ay[u]==ea[x]){ce=1;}}}}i"
+"f(!v||v=='')return '';v=escape(v);var arry=new Array(),a=new Array("
+"),c=s.c_r(cn),g=0,h=new Array();if(c&&c!='')arry=eval(c);var e=new "
+"Date();e.setFullYear(e.getFullYear()+5);if(dv==0 && arry.length>0 &"
+"& arry[arry.length-1][0]==v)arry[arry.length-1]=[v, new Date().getT"
+"ime()];else arry[arry.length]=[v, new Date().getTime()];var start=a"
+"rry.length-ct<0?0:arry.length-ct;var td=new Date();for(var x=start;"
+"x<arry.length;x++){var diff=Math.round((td.getTime()-arry[x][1])/86"
+"400000);if(diff<ex){h[g]=unescape(arry[x][0]);a[g]=[arry[x][0],arry"
+"[x][1]];g++;}}var data=s.join(a,{delim:',',front:'[',back:']',wrap:"
+"\"'\"});s.c_w(cn,data,e);var r=s.join(h,{delim:dl});if(ce) s.c_w(cn"
+",'');return r;");

/*
 * Plugin: getAndPersistValue 0.3 - get a value on every page
 */
s.getAndPersistValue=new Function("v","c","e",""
+"var s=this,a=new Date;e=e?e:0;a.setTime(a.getTime()+e*86400000);if("
+"v)s.c_w(c,v,e?a:0);return s.c_r(c);");

/*
 * Plugin: linkHandler 0.5 - identify and report custom links
 */
s.linkHandler=new Function("p","t",""
+"var s=this,h=s.p_gh(),i,l;t=t?t:'o';if(!h||(s.linkType&&(h||s.linkN"
+"ame)))return '';i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h."
+"substring(0,i);l=s.pt(p,'|','p_gn',h.toLowerCase());if(l){s.linkNam"
+"e=l=='[['?'':l;s.linkType=t;return h;}return '';");
s.p_gn=new Function("t","h",""
+"var i=t?t.indexOf('~'):-1,n,x;if(t&&h){n=i<0?'':t.substring(0,i);x="
+"t.substring(i+1);if(h.indexOf(x.toLowerCase())>-1)return n?n:'[[';}"
+"return 0;");

/*
 * Utility Function: p_gh
 */
s.p_gh=new Function(""
+"var s=this;if(!s.eo&&!s.lnk)return '';var o=s.eo?s.eo:s.lnk,y=s.ot("
+"o),n=s.oid(o),x=o.s_oidt;if(s.eo&&o==s.eo){while(o&&!n&&y!='BODY'){"
+"o=o.parentElement?o.parentElement:o.parentNode;if(!o)return '';y=s."
+"ot(o);n=s.oid(o);x=o.s_oidt}}return o.href?o.href:'';");

 /*
 * Plugin: Flash Detection 0.6 - Detect Flash version number
 */
s.detectFlash=new Function("cn","mfv","vr",""
+"var s=this,fv=-1,dwi=0,r,w,mt=s.n.mimeTypes,fk=s.c_r(cn),k=s.c_w('s"
+"_cc','true',0)?'Y':'N';if(k=='Y'&&!fk){if(s.pl&&s.pl.length){if(s.p"
+"l['Shockwave Flash 2.0'])fv=2;x=s.pl['Shockwave Flash'];if(x){fv=0;"
+"z=x.description;if(z)fv=z.substring(16,z.indexOf('.'));}}else if(mt"
+"&&mt.length){x=mt['application/x-shockwave-flash'];if(x&&x.enabledP"
+"lugin)fv=0;}if(fv<=0)dwi=1;w=s.u.indexOf('Win')!=-1?1:0;if(dwi&&s.i"
+"sie&&w&&execScript){result=false;for(var i=mfv;i>=3&&result!=true;i"
+"--){execScript('on error resume next: result = IsObject(CreateObjec"
+"t(\"ShockwaveFlash.ShockwaveFlash.'+i+'\"))','VBScript');fv=i;}}r=f"
+"v==-1?'flash not detected':fv==0?'flash enabled (no version)':'flas"
+"h '+fv;s.c_w(cn,r,0);return 'true';}else return '';");
s.getFlash=new Function("cn",""
+"var s=this;if(cn&&s.c_r(cn))return s.c_r(cn);");
s.returnFlash=new Function("cn","vr","to",""
+"setTimeout(\"var cn,vr,to,s_dfv=s_gi(s_account);s_dfv.linkTrackVars"
+"=vr,s_dfv.vr=s.getFlash();s_dfv.tl(this,'o','Flash Version Detectio"
+"n')\",to);");

/* if(typeof(_vis_opt_settings_loaded) == "boolean" && typeof(_vis_opt_top_initialize) == "function"){

var _combination = _vis_opt_readCookie('_vis_opt_exp_'+_vis_opt_experiment_id+'_combi'); {   
 
if(typeof(_vis_opt_comb_name[_combination]) != "undefined"){
s.eVar55= _vis_opt_experiment_id + ':' + _vis_opt_comb_name[_combination]
    } }

}  */


/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
s.visitorNamespace="avgtechnologies"
s.trackingServer="avgtechnologies.112.2o7.net"

/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s._c='s_c';s.wd=window;if(!s.wd.s_c_in){s.wd.s_c_il=new Array;s.wd.s_c_in=0;}s._il=s.wd.s_c_il;s._in=s.wd.s_c_in;s._il[s._in]=s;s.wd.s_c_in++;s"
+".an=s_an;s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return y};s.fl=function(x,l){return x?(''+x).substring(0,l):x};s.co=func"
+"tion(o){if(!o)return o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.indexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for(var p=0;p<x.length;p++)if(('0123456789').indexO"
+"f(x.substring(p,p+1))<0)return 0;return 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3)"
+"return encodeURIComponent(x);else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%"
+"16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}return y}else{x=s.rep(escape(''+x),'+','%2B');if(c&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if"
+"(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}}return x};s.epa=function(x){var s=this;if(x){x=''+x;return s.em==3?de"
+"codeURIComponent(x):unescape(s.rep(x,'+',' '))}return x};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z+=y+d.l"
+"ength;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.f"
+"sf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.si=function(){var s=this,i,k,v,c="
+"s_gi+'var s=s_gi(\"'+s.oun+'\");s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=undefined){if(typeof(v)=='string')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}"
+"c+=\"s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var"
+" s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('"
+".',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s."
+"epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NON"
+"E'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()"
+"+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i]."
+"o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv"
+">=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,"
+"'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s"
+".t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs="
+"p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,"
+"l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,0,r.t,r.u)}};s.br=function(id,rs){var s=this;if(s.disableBufferedRequests||!s.c_w('s_br',rs))s.brl=rs};s.flushBufferedReques"
+"ts=function(){this.fbr(0)};s.fbr=function(id){var s=this,br=s.c_r('s_br');if(!br)br=s.brl;if(br){if(!s.disableBufferedRequests)s.c_w('s_br','');s.mr(0,0,br)}s.brl=0};s.mr=function(sess,q,rs,id,ta,u"
+"){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+(un),im,b,e;if(!rs){if"
+"(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s"
+".ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/H.22.1/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(rs,2047);if(id){s.br(id,rs);return}}if(s.d.images&&s.apv>=3"
+"&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+']."
+"mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im.s_l=0;im.onload=new Function('e',"
+"'this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;im.src=rs;if((!ta||ta=='_self'||ta="
+"='_top'||(s.wd.name&&ta==s.wd.name))&&rs.indexOf('&pe=')>=0){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0"
+" alt=\"\">'};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl="
+"function(v){var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,l,a,b='',c='',t;if(x){y=''+x;i=y.indexOf('?');if(i>0){a=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCase()"
+";i=0;if(h.substring(0,7)=='http://')i+=7;else if(h.substring(0,8)=='https://')i+=8;h=h.substring(i);i=h.indexOf(\"/\");if(i>0){h=h.substring(0,i);if(h.indexOf('google')>=0){a=s.sp(a,'&');if(a.lengt"
+"h>1){l=',q,ie,start,search_key,word,kw,cd,';for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c){y+='?'+b+'&'"
+"+c;if(''+x!=y)x=y}}}}}}return x};s.hav=function(){var s=this,qs='',fv=s.linkTrackVars,fe=s.linkTrackEvents,mn,i;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].tr"
+"ackVars;fe=s[mn].trackEvents}}fv=fv?fv+','+s.vl_l+','+s.vl_l2:'';for(i=0;i<s.va_t.length;i++){var k=s.va_t[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(v&&k!='linkName'&&k!='l"
+"inkType'){if(s.pe||s.lnk||s.eo){if(fv&&(','+fv+',').indexOf(','+k+',')<0)v='';if(k=='events'&&fe)v=s.fs(v,fe)}if(v){if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='pa"
+"geURL'){q='g';v=s.fl(v,255)}else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigra"
+"tionServerSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em="
+"=2||s.em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode"
+"')q='cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j"
+"';else if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp'"
+";else if(k=='plugins')q='p';else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+q+'='+(k.substring(0,3)"
+"!='pev'?s.ape(v):v)}}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('?');h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t"
+")return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExt"
+"ernalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.substring(0,1)"
+"!='#'&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=s.co(this);s.t"
+"();s.lnk=0;if(b)return this[b](e);return true');s.bc=new Function('e','var s=s_c_il['+s._in+'],f,tcf;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;s.eo=e.srcElement?e.srcElement:e.target;tcf=new Functi"
+"on(\"s\",\"var e;try{if(s.eo&&(s.eo.tagName||s.eo.parentElement||s.eo.parentNode))s.t()}catch(e){}\");tcf(s);s.eo=0');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.inde"
+"xOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'"
+"')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagName;t=t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE'"
+")t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p"
+"=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' '"
+",'');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100"
+");o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')>=0){if(u!=s.un&&"
+"s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,'"
+",','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this;s.squ[u"
+"n]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Ob"
+"ject.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq"
+"[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o"
+".onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s.apv>3&&(!s.isie|"
+"|!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener)s.b.addEventListener('click',s.bc,false);else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=func"
+"tion(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e)"
+")return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.subst"
+"ring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowe"
+"rCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};"
+"s.sa=function(un){var s=this;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_"
+"l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Ar"
+"ray('_c','_in','_il','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.le"
+"ngth;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0"
+";if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf("
+"\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl."
+"length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexO"
+"f('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadMo"
+"dule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else "
+"g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],"
+"o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!"
+"o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javas"
+"cript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,"
+"f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.vo1=function(t,a){if(a[t]"
+"||a['!'+t])this[t]=a[t]};s.vo2=function(t,a){if(!a[t]){a[t]=this[t];if(!a[t])a['!'+t]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.d"
+"ll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.d"
+"l=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.pt(s.vl_g,',','vo2',vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s.t=fun"
+"ction(vo,id){var s=this,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate("
+")+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',vb=new Objec"
+"t;s.gl(s.vl_g);s.uns();s.m_ll();if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1'"
+";if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try"
+"{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next)j='1.7'}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){c="
+"screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElement.offsetWid"
+"th;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}return hp');hp="
+"tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30){ps=s.f"
+"l(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.connectionType=c"
+"t;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.pt(s.vl_g,',','vo2',vb);s.pt(s.vl_g,',','vo1',vo)}if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);var l=s.wd.location,r=tfs.document.referrer"
+";if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk;if(!o)return '';var p=s.pageName,w=1,t=s.ot(o)"
+",n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(!o)return '';t=s.ot(o);n=s.oid(o);x=o.s_oidt}oc=o.onclick?''+o.onclick:''"
+";if((oc.indexOf(\"s_gs(\")>=0&&oc.indexOf(\".s_oc(\")<0)||oc.indexOf(\".tl(\")>=0)return ''}if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName"
+";t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l))q+='&pe=lnk_'+(t=='d'||t=='e'?s.ape(t):'o')+(h?'&pev1='+s.ape(h):'')+(l?'&pev2='+s.ape(l):'');else trk=0;if(s.trackInlineStats){if(!p){p="
+"s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot="
+"'+s.ape(t)+(i?'&oi='+i:'')}}if(!trk&&!qs)return '';s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,id,ta);qs='';s.m_m('t');if(s.p_r)s.p_r("
+");s.referrer=''}s.sq(qs);}else{s.dl(vo);}if(vo)s.pt(s.vl_g,',','vo1',vb);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_link"
+"Name=s.wd.s_linkType='';if(!id&&!s.tc){s.tc=1;s.flushBufferedRequests()}return code};s.tl=function(o,t,n,vo){var s=this;s.lnk=s.co(o);s.linkType=t;s.linkName=n;s.t(vo)};if(pg){s.wd.s_co=function(o)"
+"{var s=s_gi(\"_\",1,1);return s.co(o)};s.wd.s_gs=function(un){var s=s_gi(un,1,1);return s.t()};s.wd.s_dc=function(un){var s=s_gi(un,1);return s.t()}}s.ssl=(s.wd.location.protocol.toLowerCase().inde"
+"xOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var ap"
+"n=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isope"
+"ra=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv="
+"parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=="
+"'%U0100'?1:0))}s.sa(un);s.vl_l='dynamicVariablePrefix,visitorID,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServerSecure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLi"
+"fetime,pageName,pageURL,referrer,currencyCode';s.va_l=s.sp(s.vl_l,',');s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,products,linkName,"
+"linkType';for(var n=1;n<76;n++)s.vl_t+=',prop'+n+',eVar'+n+',hier'+n+',list'+n;s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browse"
+"rHeight,connectionType,homepage,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests"
+",mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadF"
+"ileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,_1_referrer';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);if(!ss)s.wds()",
w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,s;if(un){un=un.toLowerCase();if(l)for(i=0;i<l.length;i++){s=l[i];if(!s._c||s._c=='s_c'){if(s.oun==un)return s;else if(s.fs&&s.sa&&s.fs(s.oun,un)){s.sa(un);return s}}}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
w.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
+"ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
w.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
w.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");
w.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
+"=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
+"x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
w.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
w.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
+"a");
w.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
+"f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
+"'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a>=5&&v.indexOf('Opera')<0&&u.indexOf('Opera')<0){w.s_c=new Function("un","pg","ss","var s=this;"+c);return new s_c(un,pg,ss)}else s=new Function("un","pg","ss","var s=new Object;"+s_ft(c)+";return s");return s(un,pg,ss)}

