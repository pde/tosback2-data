/*

	$Id: FTTrack2.js.Live,v 1.79 2012-11-28 08:53:30 vachterr Exp $	

	If you release this file to live you need to stale the CDN cache entry for
	http://media.ft.com/j/FTTrack2.js
	http://media.ft.com/j/FTTrack2
	See the documentation here:
	http://epcvs.osb.ft.com/twiki/bin/view/Main/CdnDocumentation

        NOTE: FTTrack2.js.Live differs from FTTrack2.js in the site intelligence section.
	The live file has '|stats|' whereas the non-live file has something else.

*/

/*global AssetType, video, FTBarrier, FTFund, FTPage, FTSection, FTSite, HurdleType, document, sPageName, sPageNumber, secondarySrc, showSubPage, subs, siAutoTracer, FT, FTDocumentTitle */

/*
	M9347 - FT UserTrack Cookie
	Forced dropping of cookies if they are unavailable
*/

if (!document.cookie.match(/FTUserTrack=((\d{1,3}\.){3}\d{1,3})/))
{
	var call='<scr'+'ipt type="text/javascript" src="';
	call+= isSecure(document)?'https:':'http:';
	call+='//track.ft.com/track/';	
	call+=isSecure(document)?'strack.js':'track.js';    	
	call+='"></sc'+'ript>';
	document.write(call);
}

siAutoTracer=false;

/*
	M9176 - Site Intelligence Optimost Issues
	Added function to get rid off unrelevant data and shorten up the encoded URL we send to SI
*/

if (typeof FT === "undefined")
{
	FT = {};
}

FT.getExcludedQueryParamsList = function()
{
	return ['sticky', 'pspUrl', 'location', 'referer', '_i_location', '_i_referer'];
};

FT.excludeParams = function(queryString)
{
	if (typeof queryString === "undefined") { return queryString; }
	if (!FT.getExcludedQueryParamsList) { return queryString; }
	
	var excludedParams = FT.getExcludedQueryParamsList();
	for (var currentExcludedParamKey in excludedParams)
	{
		if (excludedParams.hasOwnProperty(currentExcludedParamKey))
		{
			var currentExcludedParam = excludedParams[currentExcludedParamKey];
			var RE = new RegExp("([&?])" + currentExcludedParam + "=[^&]*");
			queryString = queryString.replace(RE, "");
		}
		
	}
	// if we have removed the first param of a query string and other params are still present
	// then we need to replace the first '&' by a '?'
	if (queryString.indexOf('?') == -1 && queryString.indexOf('&') != -1)
	{
		queryString = queryString.replace('&','?');
	}
	return queryString;
};

FT.excludeQueryParams = function(url)
{
	if (typeof url === "undefined") { return url; }
	
	var qIndex = url.indexOf('?');
	var qs = url.substring(qIndex);
	var path = url.substring(0, qIndex);
	url = path + FT.excludeParams(qs);
	return url;
};

/*

   SiteTracker 5.1.13
   Copyright (C) 2008 Site Intelligence Ltd.

*/
/*
        NOTE: FTTrack2.js.Live differs from FTTrack2.js in the site intelligence section.
	The live file has '|stats|' whereas the non-live file has something else.

	The Site Intelligence section below has been built from the code in site-intelligence-new.js
	(rather than site-intelligence.js which is the original SI code)
*/
	eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('7 1T;m(C["1D"]==1T){C.1D=I}7 1a="/1U";7 14="3m.3n.2q";7 15="3o";7 1p="3p";7 1q="1U:2r";7 1f="3q";7 1E="/";7 1V=3r;7 1F=2s;7 1W=M 2t(".2u.3s",".2q");7 1X=O;7 1Y="2v";7 1Z="3t";7 20="";7 21=1a+"/3u.3v";7 3w="5.1.13";7 22="N";7 1G=A;7 1H="t"+(M 1g()).1r()+"h"+C.23.B;7 L="";7 1s="";7 E="";7 P="";7 17="";7 1h=0;7 1b=M 2t(1);7 1t=v.2w;7 1i=v.1u;7 24="1U:3x";7 J="";7 2x=3y;7 3z=O;7 26=0;7 V=A;o 27(a){7 b=A;7 c=a.1c;7 d=a.1j("3A");m(d&&d!="3B"){m(d=="3C"){b="2y"}F{m(d=="3D"){b="3E"}F{m(d=="3F"){z o(){C.2z(c)}}F{b=2y.3G[d];m(!b){z o(){C.2z(c,d)}}}}}}m(b==A){z o(){D.1c=c}}F{z o(){b.D.1c=c}}};o 2A(a){m(!a){z""}7 b="3H+/";7 c="";W(7 i=0;i<a.B;i+=3){7 d=a.B-i;7 e=0;e=(a.28(i)<<16)&3I;e|=(d>1)?(a.28(i+1)<<8)&3J:0;e|=(d>2)?a.28(i+2)&3K:0;c+=b.1v((e&3L)>>18);c+=b.1v((e&3M)>>12);c+=(d>1)?b.1v((e&3N)>>6):"2B";c+=(d>2)?b.1v((e&3O)):"2B"}z c};o 1I(a){7 b="";W(7 i=0;i<a.B;i++){7 c;3P(a.1v(i)){Q"r":1t=2C.2D(1t);c=1t;R;Q"p":1i=2C.2D(1i);c=1i;R;Q"d":c=1k.3Q+"x"+1k.3R+"x"+1k.2E+"."+1J.2F();m(1J.2G){c+="."+1J.2G.B}R;Q"c":c=1G;R;Q"u":c=C.23.B+"."+(3S.3T()*2s)+"."+(M 1g()).1r();R;Q"t":c=1H;R;Q"f":c=E;R;Q"q":c=P;R;Q"g":c=2H();R;Q"w":c=22;R;Q"y":c=J;R}b+=2A(c)+"*"}z b};o 2H(){7 a="";a+="2u="+C.1k.2E;a+="&3U="+C.1k.3V+"x"+C.1k.3W;29=M 1g();m(A!=29){a+="&3X="+2I(29)}m(1J.2F()){a+="&2J=1"}F{a+="&2J=0"}a+=2K();m(v.2a){7 b=v.2a.1j(24);m(b){a+="&2v="+b}}m(L&&L.B>0){a+="&3Y="+L}m(1s.B>0){a+="&3Z="+1s}z a};o 2K(){7 a="";m(C.2L){a+="&1d:40"}m(C.2M){a+="&1d:41"}m(C.2N){a+="&1d:x-42"}m(C.2O){a+="&1d:43"}m(C.2P){a+="&1d:44"}z a};o 45(){C.2M=I};o 46(){C.2L=I};o 47(){C.2N=I};o 48(){C.2O=I};o 49(){C.2P=I};o 4a(a){v.2a.1K(24,a)};o 2I(a){7 b="";b+=a.4b()+"";b+="-";b+=1l(a.4c()+1);b+="-";b+=1l(a.4d());b+="T";b+=1l(a.4e());b+=":";b+=1l(a.4f());b+=":";b+=1l(a.4g());z b};o 1l(n){m(n<1){z"4h"}z(n>9?"":"0")+n};o 2b(){7 a=A;7 b;7 c;7 d;7 e=v.D.X;m(e!=A){7 f;W(f=0;(f<1W.B)&&(a==A);f++){7 g=e.2c(1W[f]);m(g>0){7 h=e.2c(".",g-1);m(h>=0){a=e.10(h)}F{a="."+e}}}}z a};o 4i(a){G{J="1w";m(/2d/.2e(2f(a))){L=a}F{L=a.1j(1q)}2Q();z I}H(e){z K(e)}};o 2Q(){1m(2g)};o 2R(){1m(1x)};o 2S(){1m(1n)};o 4j(){1m(4k)};o 2T(a,b){m(!b){b=27(a)}1m(1x,b,1F)};o 1m(a,b,c){1s=1H;E="1o://"+v.D.X+1a+"/2r";P="";m(b){m(c){a("1L","1M",b,c)}F{a("1L","1M",b)}}F{a("1L","1M")}L="";1s="";E=""};o 4l(a){G{J="1w";m(/2d/.2e(2f(a))){L=a}F{L=a.1j(1q)}2S()}H(e){K(e)}};o 4m(a,b){G{J="1w";m(/2d/.2e(2f(a))){L=a}F{L=a.1j(1q)}2T(a,b);z O}H(e){z K(e)}};o 4n(a){G{L=a.1j(1q);J="1w";2R();J="1d";E=a.1c;m(E.19("://")==-1){m(E.10(0,1)!="/"){7 b=v.D.2U.2c("/");7 c=v.D.2U.10(0,b+1);E=c+E}m(E.10(0,2)!="//"){E="//"+v.D.X+E}E=v.D.1y+E}7 d=27(a);1x("1L","1M",d,1F);z O}H(e){z K(e)}};o 2V(a){E="1o://"+v.D.X+1a+"/4o";P=a;J="1N";1n("1z","1A")};o 4p(a,b){G{m(17!=""){17+="&"}17+=1e(a)+"="+1e(b);m(17.B>=4q){2W()}}H(e){K(e)}};o 2W(){m(17!=""){2V(17);17=""}};o 1O(a,b,c){7 d=M 1g;d.2X(d.1r()+c);7 e=2b();7 f=a+"="+b+((1E)?"; 2Y="+1E:"")+((e)?"; 2Z="+e:"");v.1P=f+"; 30="+d.31();m(Z(a)!=b){v.1P=f}};o Z(a){z 1B(a,v.1P,";")};o 1B(a,b,c){7 d=a+"=";7 e=A;7 f=b.19(d);m((f!=-1)&&(a.B>0)){7 g=b.19(c,f);m(g==-1){g=b.B}e=b.10(f+d.B,g)}z e};o 32(a,b,c){7 d=M 1g();d.2X(d.1r()-1);m(!b){b=1E}m(!c){c=2b()}7 e=a+"=A"+((b)?"; 2Y="+b:"")+((c)?"; 2Z="+c:"");v.1P=e+"; 30="+d.31()};o 33(){7 a=1B(1f,v.1u,"&");m(a!=A){1O(15,a,1V);m(1X){7 b=1B(1Z,v.1u,"&");m(b!=A){1t=34(b)}b=1B(1Y,v.1u,"&");m(b!=A){1i=34(b)}}}F{a=Z(15);m(a==A){a=1I("u");22="Y";1O(15,a,1V);m(1X){a=Z(15);m(a!=A){7 c=20;m(20.19("?")==-1){c+="?"}F{c+="&"}c+=1Y+"="+1e(v.1u)+"&"+1Z+"="+1e(v.2w);1D=O;v.D=c}}}}a=Z(15);z a};o 4r(a){7 b=Z(15);m(b!=A){a.1c=a.1c+((a.1c.19("?")>0)?"&":"?")+1f+"="+b}z I};o 4s(a){7 b=Z(15);m(b!=A){m(a.4t.4u()=="4v"){G{G{7 c=v.35("<36 S=\\""+1f+"\\" 11=\\"37\\" 1Q=\\""+b+"\\" />")}H(e){7 c=v.35("36");c.1K("S",1f);c.1K("11","37");c.1K("1Q",b)}a.4w(c)}H(4x){}}F{a.2h=a.2h+((a.2h.19("?")>0)?"&":"?")+1f+"="+b}}z I};o 1R(a,b,c){7 d;m(1G==A){d=14+21+"?f="+b+"&d="+1I(b)}F{d=14+21+"?f="+a+"&d="+1I(a)}J="";c(d)};o 1n(c,d){7 e=o(a){7 b=M 2i();b.2j=a;1b[1b.B]=b};1R(c,d,e)};o 1x(h,i,j,k){7 l=o(b){7 c=M 2i();m(j){V=j;m(k){7 d=o(){m(V){7 a=V;V=A;a()}};d.4y=o(){z"7 38 = V; V = A; 38();"};7 f=C.4z(d,k)}}7 g=o(){m(c.4A&&--26==0&&V){m(f){C.4B(f)}7 a=V;V=A;a()}};G{c.39?c.39("4C",g,O):c.4D("4E",g)}H(e){}++26;c.2j=b;1b[1b.B]=c};1R(h,i,l)};o 2g(c,d){m(1h<25){7 e=o(a){m(1h>0){m(Z(1p+(1h-1))==A){1h=0}}7 b=1p+1h++;1O(b,a,4F)};1R(c,d,e)}};o 4G(a,b){z 3a(A,a,b)};o 4H(a,b,c){G{E="1o://"+v.D.X+1a+"/1S";J="1N";m(!c){c=o(){a.2k()}}7 s=o(){1x("1z","1A",c,1F)};2l(a,s,b);z O}H(e){z K(e)}};o 3a(a,b,c){G{E="1o://"+v.D.X+(a==A?1a+"/1S":a);J="1N";2l(b,o(){2g("1z","1A")},c);z I}H(e){z K(e)}};o 4I(a,b){G{m(a.U&&(a.U.B>0)){a.3b=[];W(7 i=0;i<a.U.B;i++){7 c=a.U[i];m(c.S){7 d=(b==A);m(b!=A){W(7 j=0;!d&&(j<b.B);j++){m(c.S==b[j]){d=I}}}m(d){7 f=c.3c;c.3c=o(){m(f){f()}3d(a,1C)}}}}}}H(e){K(e)}};o 3d(a,b){m(b.S&&((b.11=="3e"||b.11=="3f")?(b.2m!=b.4J):(b.1Q!=b.4K))){7 c=a.3b;W(7 i=0;i<c.B;i++){m(b.S==c[i]){z}}7 d="4L:"+b.S;7 e=1e(d)+"=Y";E="1o://"+v.D.X+1a+"/4M";P=e;J="1N";1n("1z","1A");c[c.B]=b.S}};o 2l(a,b,c){P="";m(a.U&&(a.U.B>0)){7 d=O;W(7 i=0;i<a.U.B;i++){7 e=a.U[i];m(e.S){7 f=(c==A);m(c!=A){W(7 j=0;!f&&(j<c.B);j++){m(e.S==c[j]){f=I}}}m(f&&(e.11=="3e")){f=e.2m}m(e.11=="4N"){f=O}m(e.11=="2k"){f=(e==a.2n)}m(f){7 g=1e(e.S)+"="+((e.11=="3f")?((e.2m)?"I":"O"):1e(e.1Q));m(P.B+g.B>2x){b();P="";d=O}m(d){P+="&"}P+=g;d=I}}}b()}};o 4O(a,b){G{2o(a,b,A)}H(e){K(e)}};o 4P(a,b){G{2o(a,b,"1w")}H(e){K(e)}};o 2o(a,b,c){m(a.10(0,1)=="/"){a=v.D.1y+"//"+v.D.X+a}E=a;P=b;J=c;1n("1z","1A")};o 3g(a){G{m(a!=1T){m(a.19("://")==-1){m(a.10(0,1)!="/"){a="/"+a}a=v.D.1y+"//"+v.D.X+a}1i=a.19("?")==-1?a+C.D.3h:a+"&"+C.D.3h.10(1)}J="1d";1n("4Q","4R")}H(e){K(e)}};o 4S(){G{7 b=o(){1C.1S.2n=1C};W(7 i=0;i<v.3i.B;i++){7 c=v.3i[i];W(7 j=0;j<c.U.B;j++){m(c.U[j].11=="2k"){7 d=c.U[j];7 f=d.2p;m(f){(o(){7 a=f;d.2p=o(){1C.1S.2n=1C;a()}})()}F{d.2p=b}}}}}H(e){K(e)}};o 3j(){G{m(14==A){14=v.D.1y+"//"+v.D.X+":"+v.D.3k}F{m(14.10(0,4)!="1o"){14=v.D.1y+"//"+14+":"+v.D.3k}}1G=33();3l()}H(e){K(e)}};o 3l(){7 i=0;7 a=1p+i++;7 b=Z(a);4T(b){7 c=M 2i();c.2j=b;1b[1b.B]=c;32(a);a=1p+i++;b=Z(a)}};o 4U(){1H="t"+(M 1g()).1r()+"h"+C.23.B};o K(e){z I};3j();m(C.1D){3g()}',62,305,'|||||||var|||||||||||||||if||function|||||||document||||return|null|length|window|location|siTracerPath|else|try|catch|true|siTagType|SiInternalError|siClickedLinkID|new||false|siTracerQuery|case|break|name||elements|siSyncFinishedAction|for|hostname||SiGetCookie|substring|type|||siTaggingServer|siCookieName||siSendParams||indexOf|siBaseDirectory|siImageSet|href|page|escape|siCookieQPName|Date|siTracerCookieIdx|siRequest|getAttribute|screen|leadingZero|SiInternalDoLinkTrack|SiSendTracer|http|siTracerCookieName|siLinkAttribute|getTime|siRefClickID|siReferrer|URL|charAt|trace|SiSyncTracer|protocol|fqcty|fqdty|SiExtractPart|this|siAutoTracer|siCookiePath|siTracerTimeout|siCookieValue|siExtClickID|SiEncodeDetails|navigator|setAttribute|fctgy|fdtgy|extra|SiSetCookie|cookie|value|SiProcessTracer|form|undefined|si|siCookieTimeout|siDomainList|siCentralCookie|siCentralReqName|siCentralRefName|siCentralURL|siTrackerUrl|siIsCookieNew|history|siPageIDAttrName||siSyncTracersOutstanding|SiInternalGetLinkClickingClosure|charCodeAt|today|body|SiGetDomain|lastIndexOf|string|test|typeof|SiDeferTracer|action|Image|src|submit|SiInternalBuildAndSendFormTracerQuery|checked|siActivatedSubmit|SiInternalTrackTracer|onclick|com|link|1000|Array|co|req|referrer|siFormQueryLimit|top|open|SiEncodeString|_|FT|excludeQueryParams|colorDepth|javaEnabled|plugins|SiCollateTagData|SiFormatDate|jv|SiCollatePageRules|siIsFrameset|siIsMenu|siIsExtraFrame|siIsRedirection|siIsPopup|SiInternalTrackLink|SiInternalTrackLinkImmediate|SiInternalTrackLinkPassiveSend|SiInternalTrackLinkViaSynchronousSend|pathname|SiTrackData|SiSendTrackParams|setTime|path|domain|expires|toGMTString|SiDeleteCookie|SiBuildCookie|unescape|createElement|input|hidden|exec|addEventListener|SiTrackForm|siFilledFields|onblur|SiInternalActiveTrackElement|radio|checkbox|SiTrackPage|search|forms|SiInitPage|port|SiSendDeferredTracers|stats|ft|FTUserTrack|SITRACER|simigvis|315360000000|uk|refer|track|gif|siTrackerVersion|pageID|1200|siSentPageTag|target|_self|_top|_parent|parent|_new|frames|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|16711680|65280|255|16515072|258048|4032|63|switch|availWidth|availHeight|Math|random|sr|width|height|lt|rl|rcid|fset|menu|frame|redir|popup|SiIsMenu|SiIsFrameset|SiIsExtraFrame|SiIsRedirection|SiIsPopup|SiSetPageID|getFullYear|getMonth|getDate|getHours|getMinutes|getSeconds|00|SiTrackLink|SiInternalTrackLinkWait|SiSendTracerWithWait|SiTrackEvent|SiTrackExternalLink|SiTrackLinkToUntagged|data|SiAddTrackParam|512|SiMigrateCookie|SiMigrateCookieForm|method|toUpperCase|GET|appendChild|andIgnore|toString|setTimeout|complete|clearTimeout|load|attachEvent|onreadystatechange|1800000|SiTrackFormData|SiTrackExternalFormData|SiActiveTrackForm|defaultChecked|defaultValue|siform|formfield|file|SiTrackTracer|SiSendAdditionalTracer|pcrtgy|pdrtgy|SiRegisterForms|while|SiNewPageContext'.split('|'),0,{}))

//************end of site-tracking ****************

/*

	Object to store the parameters for tracking FT stuff.
	Can be used to generate querystring parameters, or meta tags (either from the head as document.writes, or from the body as document.createElements)

*/

function TrackParams() {
	var hashTable = [];

	this.add = function(key,val) {
		if(key && val) {
			hashTable[key] = val;			
		}
	};

	/*************************

	Build without the starting "?" or ending "&" in case we are making a querystring from more than one TrackParam e.g. "name1=va1&name2=val2&name3=val3"

	**************************/
	this.buildQueryString = function() {
		var qs = "";
		var key="";
		for (key in hashTable) {
			if(typeof hashTable[key]!="function") {
				qs += escape(key) + "=" + escape(hashTable[key]) + "&";
			}
		}
		return qs.substring(0,qs.length-1); // trim off the last &
	};
}

function isSecure(doc){
	return (doc.location.protocol=='https:');
}

/*
 * Pass in the Prod Ids of the users products as they appear in  erights.
 */
function findSubType(prods) {
	
	var ANONYMOUS = 1;
	var REGISTERED = 2;
	var SUBSCRIBER = 3;
	var REGISTERED_NA = 4;//NA is not activated
	var SUBSCRIBER_NA = 5;
	var PAYG = 6;
	
	if(prods.length == 0) {
		return REGISTERED_NA;
	}

	if (prods && prods.length > 1) {
		var result = prods.split("|");
		var hasNewspaper = false;
		var hasP0 = false;
		var hasP1 = false;
		var hasP2 = false;
		var hasP1NA = false;
		var hasP2NA = false;
		var hasP3NA = false;
		var hasPAYG = false;
		
		for (var idx = 0; idx < result.length; idx++) {
			switch(result[idx].toString()){			
				case "72"://P0
				  hasP0 = true;
				  break;
				case "73"://P1
				  hasP1 = true;
				  break;							
				case "75"://P1NA
				  hasP1NA = true;
				  break;
				case "74"://P2
				  hasP2 = true;
				  break;
				case "76"://P2NA
				  hasP2NA = true;
				  break;
				case "77"://P3NA
				  hasP3NA = true;
				  break;
				case "35786"://P4
				  hasPAYG = true;
				  break;
				default:
			}
		}
		if (hasPAYG) {
			return PAYG;
		} else if(hasP1 || hasP2) {
			return SUBSCRIBER;
		} else if(hasP0) {
			return REGISTERED;
		} else if(hasP1NA || hasP2NA || hasP3NA) {
			return SUBSCRIBER_NA;
		} else {
			return ANONYMOUS;
		}
	} else {
		return ANONYMOUS;
	}
}

/* SET UP TRACKING ARRAYS */

var tp = new TrackParams();	// tracking parameters
var tpRef = new TrackParams();	// referrer information
var tpTrans = new TrackParams();	// transaction information
var tpTitle = new TrackParams(); // title information
var siParams = new TrackParams(); //Site Intelligence params

function doTrack2() {

	//Default sub type which is Not Logged In.  It will be replaced with a sub type if the user is logged in.
	var subtype = 1;
	// Parameters from page		
	var ftReferrer = document.referrer;
	if (ftReferrer){
		ftReferrer = ftReferrer.replace(/\/cms\/s\/[0-2]\//,"/cms/s/");		
	}

	// AYSC Cookie parameters
	var thisAYSC = document.cookie.match(/AYSC=([^;]*)/) ? RegExp.$1 : "";
	var ipCountry = thisAYSC.match(/_14([^_]*)/) ? RegExp.$1 : null;
	var regArea = thisAYSC.match(/_17([^_]*)/) ? RegExp.$1 : null;
	var metroArea = thisAYSC.match(/_18([^_]*)/) ? RegExp.$1 : null;

	// FT_P Cookie parameters
	var thisFTP = document.cookie.match(/FT_P=([^;]*)/) ? RegExp.$1 : "";
	if(thisFTP) {
		var prods = thisFTP.match(/prod=([^_]*)/) ? RegExp.$1 : null;
		subtype = findSubType(prods);
	}	

	// FTMD Cookie parameters
	var thisFTMD = document.cookie.match(/FTMD=([^;]*)/) ? RegExp.$1 : "";
	var ftmdParams = thisFTMD.match(/([^;]*)/) ? RegExp.$1 : null;	
	// FTUserTrack Cookie parameter
	var ipPC = document.cookie.match(/FTUserTrack=((\d{1,3}\.){3}\d{1,3})/) ? RegExp.$1 : "undefined";

	// USERID cookie parameter
	var pid = document.cookie.match(/USERID=([^:]*)/) ? RegExp.$1 : "undefined";
	var logged_in = (pid === "undefined") ? "0" : "1";

	// GET ARTICLE ID

	// last slash removal if it's the last character in the url

	var use = document.URL;
	var lastSlash=use.lastIndexOf("/");	
	if (use.charAt(lastSlash+1)==='')
	{
		use=use.substring(0,use.length-1);	
	}
	// Make sure the story has /s/ in the url

	if (typeof AssetType!="undefined" && AssetType=="story") {
		var hasS = use.match(/\/cms\/s/) ? RegExp.$1 : null;
		if (!hasS)
		{
			use=use.replace(/\/cms\//,"/cms/s/");
		}
	}

	// Extract the article id for a parameter and put everything else into a querystring

	var articleId = use.match(/[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}/);

	if (articleId)
	{
		articleId=articleId.toString();
	}

	if (articleId)
	{		
		var remainder= use.substring(use.search(articleId)+articleId.length,use.length);		
		use=use.replace(remainder,'')+'.html?'+(remainder.substring(1,remainder.length)).replace(',','&');
		use=use.substring(0,use.length-5);
	}	
	// Cookie checking stuff
	var dc = document.cookie;
	var re = new RegExp("TRK_REF=" + window.location.href);	
	// Fire off the request that drops the FTUserTrack cookie
	var call='<scr'+'ipt type="text/javascript" src="';
	call+= isSecure(document)?'https:':'http:';
	call+='//track.ft.com/track/';	
	call+=isSecure(document)?'strack.js':'track.js';    	
	call+='"></sc'+'ript>';
	if(thisFTMD==="" || ftmdParams!='qv'){
		document.write(call);
	}
	// If the URL is the new (Mockingbird) style URL we want the subs status of the article

	var pageUrl = window.location.pathname;

	if (pageUrl.match(/\/cms\/s\/([0-2])\//)) {			
		var handlingCode = RegExp.$1;	   			
	}

	// SITE INTELLIGENCE
	siParams.add("AssetType",typeof AssetType!="undefined"?AssetType:null);
	siParams.add("sub", handlingCode?handlingCode:"undefined");
	siParams.add("WT.ipCountry_s",ipCountry?ipCountry:"undefined");
	siParams.add("WT.pid_s",pid);
	siParams.add("WT.si_n",typeof sPageName!="undefined"?sPageName:null);
	siParams.add("WT.si_x",typeof sPageNumber!="undefined"?sPageNumber:null);
	//If found, FTDocumentTitle is passed instead of the document.title for working around the problem with Site Intelligence Report after Tynt changing the URL of the article
	siParams.add("WT.ti",typeof FTDocumentTitle!="undefined"?FTDocumentTitle:document.title);
	siParams.add("WT.uuid",articleId?articleId:"undefined");
	siParams.add("FTSection",typeof FTSection!="undefined"?FTSection:"undefined");	
	siParams.add("FTPage", typeof FTPage!="undefined"?FTPage:"undefined");
	siParams.add("segid",location.search.match(/segid=([^&]*)/)?RegExp.$1:null);
	siParams.add("FTBarrier",typeof FTBarrier!="undefined"?FTBarrier:null);
	siParams.add("subType",subtype);
	if(re.test(dc)) {
		siParams.add("ad_refresh","yes");

        // Set a flag to indicate this page load was due to an ad refresh
        FT.bIsAdRefresh = true;
	}

	siParams.add("WT.metroArea_s",metroArea?metroArea:"undefined");
	siParams.add("WT.regArea_s",regArea?regArea:"undefined");
	siParams.add("HurdleType",typeof HurdleType!="undefined"?HurdleType:null);
	siParams.add("video",typeof video!="undefined"?video:null);
        siParams.add("channel","desktop");

	var qs="?"+siParams.buildQueryString();		

	// Make the Site Intelligence tracking call - check on the ? before the qs - check if tehre is a ? in the url and if there is then put a & otherwise put a ? there - shouldn't be a / at all
	var siCall='<scr'+'ipt type="text/javascript">SiTrackPage("'+pageUrl+qs+'");<\/sc'+'ript>';
	document.write(siCall);
	document.cookie = "TRK_REF=null";		
}

/* NOW START THE SHOW RUNNING */

doTrack2();

function doTrackRefresh() {
	document.cookie = "TRK_REF=" + window.location.href;
	setTimeout("window.location.reload(false)",2000);
}

/*
 M9724 - Online Add subscription level to audience science calls on classic site
 logic to decode cookie value from AYSC cookie and resolve it to subscription level 
*/
var subsLevelReplaceLookup = {
	'edt': /^edit$/,
	'int': /^Ftemp$/,
	'cor': /^[PL]0[PL][12][A-Za-z][A-Za-z]/,
	'lv1': /^[PL]1[A-Za-z][A-Za-z]/,
	'lv2': /^[PL]2[A-Za-z][A-Za-z]/,
	'reg': /^[PL]0[A-Za-z][A-Za-z]/
};
 var getdecodedSubsLevel = function (keyValue){
	if(keyValue != null){
		for (subLevel in subsLevelReplaceLookup){
			var pattern = subsLevelReplaceLookup[subLevel]
			if(keyValue.match(pattern)){
			   return subLevel;
			}
		}
	}
     return "anon";
}

 /*new Revenue Science data capture
 *  modified by rbeltran 2008/12/10 03:00:26
 *   added position, responsibility,industry, counrty & comp. size
 *
 */
if(typeof DM_addEncToLoc != "undefined")
	{
		// AYSC Cookie parameters
		var rsiAYSC = document.cookie.match(/AYSC=([^;]*)/) ? RegExp.$1 : "";
		var rsiPos = rsiAYSC.match(/_07([^_]*)/) ? RegExp.$1 : null;
		var rsiResp = rsiAYSC.match(/_06([^_]*)/) ? RegExp.$1 : null;	
		var rsiInd = rsiAYSC.match(/_05([^_]*)/) ? RegExp.$1 : null;
		var rsiCoun = rsiAYSC.match(/_14([^_]*)/) ? RegExp.$1 : null;
		var rsiCompSize = rsiAYSC.match(/_19([^_]*)/) ? RegExp.$1 : null;
		var rsiSubscriptionLevel = rsiAYSC.match(/_22([^_]*)/) ? RegExp.$1 : null;

		//variable info
		var temppos = typeof rsiPos!="undefined"?rsiPos:"undefined";
		var tempresp = typeof rsiResp!="undefined"?rsiResp:"undefined";
		var tempind = typeof rsiInd!="undefined"?rsiInd:"undefined";
		var tempcountry = typeof rsiCoun!="undefined"?rsiCoun:"undefined";
		var tempcompsize = typeof rsiCompSize!="undefined"?rsiCompSize:"undefined";
		var tempsubscriptionLevel = typeof rsiSubscriptionLevel!="undefined"?getdecodedSubsLevel(rsiSubscriptionLevel):"anon";
		
		var rsi_call = "<scr"+"ipt type=\"text\/javascript\">";
		var tempsec = typeof FTSection!="undefined"?FTSection:"undefined";
		var temppage = typeof FTPage!="undefined"?FTPage:"undefined";

		rsi_call += " DM_addEncToLoc(\"FTSectionCode\", \""+tempsec+"\"); DM_addEncToLoc(\"FTPageCode\", \""+temppage+"\"); ";
		rsi_call += " DM_addEncToLoc(\"FTP\", \""+temppos+"\"); DM_addEncToLoc(\"FTR\", \""+tempresp+"\"); ";
		rsi_call += " DM_addEncToLoc(\"FTI\", \""+tempind+"\"); DM_addEncToLoc(\"FTC\", \""+tempcountry+"\"); ";
		rsi_call += " DM_addEncToLoc(\"FTCS\", \""+tempcompsize+"\"); ";
		rsi_call += " DM_addEncToLoc(\"SubsLevel\", \""+tempsubscriptionLevel+"\"); ";

		if ( FT && FT.env && FT.env.dfp_site && FT.env.dfp_zone )
		{
			rsi_call += " DM_addEncToLoc('dfp_site', FT.env.dfp_site); ";
			rsi_call += " DM_addEncToLoc('dfp_zone', FT.env.dfp_zone); ";
		}

		rsi_call += "DM_tag();";
		rsi_call += "</scr"+"ipt>";
		document.write(rsi_call);
	}

/**
 *  Concurrency Web Service interface
 *
 *  @author Burcu Oztaskent and Brent S.A. Cowgill
 *  $Id: FTTrack2.js.Live,v 1.79 2012-11-28 08:53:30 vachterr Exp $
 */

/*global FT, _dumpThis, RegExp, document, alert, window, jQuery, clearInterval, setInterval*/
/*members $1, Conker, addStyle, addStyledHTML, appendChild,
    applyConcurrencyLogic, bDebug, bForcePopup, bShowDebug, bUseTimer, body,
    checkConcurrency, clientHeight, clientWidth, cookie, createConkerDiv,
    createElement, createTextNode, css, cssText, debug, deleteCookies, deny,
    documentElement, domain, eRightsId, eSessionId, eUserId, get,
    getCookies, getElementById, getElementsByTagName, getJSON,
    getPopupPosition, getViewportSize, height, hidePopup, id, injectMessage,
    innerHTML, innerHeight, innerWidth, instance, isEmpty, isHelpDesk,
    isRegistered, jQuery, join, left, length, match, monitorResize,
    noConflict, offsetLeft, outerWidth, path, position, positionOverlay,
    positionPopup, push, ready, receiveConkerResponse, replace, resetFlags,
    resize, resizeOverlay, right, setAttribute, style, styleSheet, timerId,
    top, trackId, urlConker, urlPopup, viewportSize, visibility, width,
    windowResize
*/

if (typeof FT === "undefined")
{
   FT = {};
}

FT.Conker = function (jQuery, urlConker, urlPopup)
{
   // Store object properties given or use defaults
   urlConker = urlConker || 'http://conker.ft.com/conker/service/pageView?callback=?';
   urlPopup  = urlPopup  || '/FTCOM/HTML/conker-popup.html';
   this.urlConker = urlConker;
   this.urlPopup  = urlPopup;
   this.jQuery    = jQuery;
   this.bDebug    = false;
   this.bShowDebug  = false;
   this.bForcePopup = false;
   this.bUseTimer   = true;

   // Attach methods to object
   this.resetFlags       = FT.Conker.resetFlags;
   this.checkConcurrency = FT.Conker.checkConcurrency;
   this.getCookies       = FT.Conker.getCookies;
   this.deleteCookies    = FT.Conker.deleteCookies;
   this.isEmpty          = FT.Conker.isEmpty;
   this.getViewportSize  = FT.Conker.getViewportSize;
   this.injectMessage    = FT.Conker.injectMessage;
   this.createConkerDiv  = FT.Conker.createConkerDiv;
   this.positionPopup    = FT.Conker.positionPopup;
   this.positionOverlay  = FT.Conker.positionOverlay;
   this.monitorResize    = FT.Conker.monitorResize;
   this.getPopupPosition = FT.Conker.getPopupPosition;
   this.addStyledHTML    = FT.Conker.addStyledHTML;
   this.addStyle         = FT.Conker.addStyle;
   this.debug            = FT.Conker.debug;

   // Initialize other object properties
   this.resetFlags();
   FT.Conker.instance = this;
   return this;
};

FT.Conker.resetFlags = function ()
{
   this.eRightsId    = undefined;
   this.trackId      = undefined;
   this.eSessionId   = undefined;
   this.isRegistered = undefined;
   this.isHelpDesk   = undefined;
};

FT.Conker.isEmpty = function (value)
{
   return (typeof value === 'undefined' || value === null);
};

FT.Conker.checkConcurrency = function (eRightsId, eSessionId, trackId, rcCallBack)
{
   // Ensure we have a proper closure on the object
   var self = this;
   var AjaxParams = {
      'eUserId':    eRightsId,
      'trackId':    trackId
   };

   if (!this.isEmpty(eSessionId))
   {
      AjaxParams.eSessionId = eSessionId;
   }
   else
   {
      AjaxParams.eSessionId = '';
   }

   this.debug('checkConcurrency(' + this.urlConker + ', ' + _dumpThis(AjaxParams, 'AjaxParams') + ')');
   this.jQuery.getJSON(this.urlConker, AjaxParams,
      function (data) {
         rcCallBack(data, self);
      }
   );
};

FT.Conker.getCookies = function ()
{
   var bSuccess = true;
   this.debug('getCookies()');

   // Reset values in case this is a second call and we don't find any cookies
   this.resetFlags();

   // Get FTUserTrack cookie
   this.trackId = this.jQuery.cookie('FTUserTrack');
   if (this.isEmpty(this.trackId))
   {
      bSuccess = false;
   }
   else
   {
      // Get FT_U cookie, eRightsID(EID), isHelpDesk and isRegistered(RI) flag
      var cookieFTU = this.jQuery.cookie('FT_U');
      if (!this.isEmpty(cookieFTU))
      {
         // 'FT_U': '_EID=3700402_PID=4003700402_TIME=%5BThu%2C+30-Oct-2008+11%3A43%3A33+GMT%5D_SKEY=RKnyNvAEBvte%2B13zcWg5Rw%3D%3D_RI=1_'
         cookieFTU.match(/_EID=([^_]*)_/);
         this.eRightsId = RegExp.$1;

         cookieFTU.match(/_RI=([^_]*)_/);
         this.isRegistered = RegExp.$1 === '1' ? true : false;

         // Get FTSession cookie
         this.eSessionId = this.jQuery.cookie('FTSession');
         if (this.isEmpty(this.eSessionId))
         {
            bSuccess = false;
         }
      }
      else
      {
         // 3700402:3864143664764403771:FNAME=:LNAME=:EMAIL=burcu@kaplan.com
         var cookieRemember = this.jQuery.cookie('FT_Remember');
         if (!this.isEmpty(cookieRemember))
         {
            cookieRemember.match(/^(\d+):/);
            this.eRightsId = RegExp.$1;
            this.isRegistered = false;
         }
         else
         {
            bSuccess = false;
         }
      }
   }

   // Handle FT HelpDesk staff logging into someone's account
   var cookieHelpDesk = this.jQuery.cookie('FT_HelpDesk');
   this.isHelpDesk = !this.isEmpty(cookieHelpDesk);

   this.debug('getCookies() return ' + bSuccess);
   return bSuccess;
};

FT.Conker.deleteCookies = function ()
{
   var options = {path: '/', domain: '.ft.com'};
   this.jQuery.cookie('FT_U', null, options);
   this.jQuery.cookie('FT_User', null, options);
   this.jQuery.cookie('FTSession', null, options);
   this.jQuery.cookie('FT_Remember', null, options);

   // Reset values in case this is a second call and we don't find any cookies
   this.resetFlags();
};

// Add style-sheet text to the page or <style> tags themself
// stylesheet = 'body {color: red;}' for example
// stylesheet = '<style>body {color: red;}</style>' for example
FT.Conker.addStyle = function (rDocument, stylesheet)
{
   // IE/Firefox safe way to add a javascript tag to the document head dynamically
   // strip out the <style> tags first
   stylesheet = stylesheet.replace(/<\/?style[^>]*?>/gi, ' ');

   var rStyle = rDocument.createElement('style');
   rStyle.setAttribute("type", "text/css");
   if (rStyle.styleSheet) //IE
   {
      rStyle.styleSheet.cssText = stylesheet;
   }
   else // the world
   {
      var rText = rDocument.createTextNode(stylesheet);
      rStyle.appendChild(rText);
   }
   var rHead = rDocument.getElementsByTagName('head')[0];
   rHead.appendChild(rStyle);
   return rStyle;
};

// Add HTML inside the element provided. The HTML may also contain <style> tags.
// The <style> tags are added to the <HEAD> first before adding the HTML <body> to
// the element provided
FT.Conker.addStyledHTML = function (rDocument, rElement, styledHTML)
{
   // Extract a list of all style tags in HTML
   styledHTML = styledHTML.replace(/[\r\n]+/g, ' ');
   var Styles = styledHTML.match(/<style[^>]*?>(.*?)<\/style[^>]*?>/gi);
   // Strip out all style tags from HTML leaving it plain
   var html   = styledHTML.replace(/<style[^>]*?>.*?<\/style[^>]*?>/gi, ' ');
   html = html.replace(/^.*<body[^>]*>/, '');
   html = html.replace(/<\/body>.*$/, '');

   if (Styles)
   {
      for (var idx = 0; idx < Styles.length; ++idx)
      {
         FT.Conker.addStyle(rDocument, Styles[idx]);
      }
   }
   rElement.innerHTML = html;
   return rElement;
};

FT.Conker.getPopupPosition = function (rDocument, width, why)
{
   // Assume a default position which should work fairly well
   var bFound = false;
   var rPos = {
      'top':  '110px',
      'left': '650px'
   };

   // Find potential targets to line up on by id
   // Alphaville:  ftapage   http://ftalphaville.ft.com/
   // Blogs: ft_header  http://blogs.ft.com/brusselsblog/
   // MergerMarket, World: page-header   http://www.ft.com/world
   var DivIds = ['#ftapage', '#ft_header', '#page-header', '#header'];
   var rDiv;
   var idx;
   var targetName = 'none';
   for (idx = 0; !bFound && idx < DivIds.length; ++idx)
   {
      rDiv = this.jQuery(DivIds[idx]);
      if (rDiv.length)
      {
         targetName = DivIds[idx];
         bFound = true;
      }
   }

   // If we've found our target, position to top right corner of it.
   if (bFound)
   {
      // On Falcon pages are centered in the window so we have to locate
      // an appropriate Div to find the left offset of the page in the window.
      var leftOffset = 0;
      var rOffsetDiv = this.jQuery('#header-wrapper');
      if (rOffsetDiv.length)
      {
         leftOffset = rOffsetDiv[0].offsetLeft;
      }
      this.debug("(" + why + ") Left Offset: " + leftOffset);

      rPos.top  = rDiv.position().top + 'px';
      rPos.left = (leftOffset + rDiv.position().left + rDiv.outerWidth() - width) + 'px';
      this.debug("(" + why + ") Div Pos: " + targetName + " (" + rDiv.position().left + ", " + rDiv.position().top + ") r: " + rDiv.position().right + " w: " + rDiv.outerWidth() + " pw: " + width);
   }
   this.debug("(" + why + ") Target Name: " + targetName + " (" + rPos.left + ", " + rPos.top + ")");
   return rPos;
};

FT.Conker.injectMessage = function (rDocument, idDiv)
{
   // Get a copy of this pointer at the current context to be used in the callback function
   var self = this;
   this.debug('injectMessage(' + this.urlPopup + ')');

   this.jQuery.get(
      this.urlPopup,
      function (data) {
         // Find the div with given id in the document
         var rDiv = self.createConkerDiv(rDocument, idDiv);
         // rDiv.innerHTML = data;
         var rInjectDiv = rDocument.getElementById('#header-wrapper');
         if (!rInjectDiv)
         {
            rInjectDiv = rDiv;
         }
         self.addStyledHTML(rDocument, rInjectDiv, data);

         self.monitorResize(rDocument);

         FT.Conker.resizeOverlay(self, rDocument, '#popconker', '#popconker-overlay', 'inject');
      }
   );
};

FT.Conker.createConkerDiv = function (rDocument, idDiv)
{
   // Find the div with given id in the document
   var rDiv = rDocument.getElementById(idDiv);
   // If no such div exists then create one and add to the document
   if (!rDiv)
   {
      rDiv = rDocument.createElement('div');
      rDiv.id = idDiv;
      rDocument.body.appendChild(rDiv);
   }
   return rDiv;
};

FT.Conker.positionOverlay = function (rDocument, idOverlay, why)
{
   // Adjust the size of the overlay div
   // Get the size of the document that the message will be injected to
   var docWidth = this.jQuery(rDocument).width();
   var docHeight = this.jQuery(rDocument).height();
   this.debug("(" + why + ") Overlay Div Pos: [" + idOverlay + "] (" + docWidth + ", " + docHeight + ")");

   // Find the div with given id in the document
   var rOverlay = this.jQuery(idOverlay);
   if (rOverlay.length)
   {
      // Work out positioning of overlay div from the full size of the document
      rOverlay.css('width', docWidth + 'px');
      rOverlay.css('height', docHeight + 'px');
   }
};

FT.Conker.positionPopup = function (rDocument, idPopup, why)
{
   // Adjust the position of the popup message
   var rPopup = this.jQuery(idPopup);
   if (rPopup.length)
   {
      // Get the width of the popup message
      var popupWidth = rPopup.outerWidth();

      // Work out positioning of the pop-up message. Different pages on FT.com have
      // different id's so we have to do some trickery.
      var rPosition = this.getPopupPosition(rDocument, popupWidth, why);
      rPopup.css('top', rPosition.top);
      rPopup.css('left', rPosition.left);
   }
};

FT.Conker.getViewportSize = function (rWindow, rDocument)
{
   rWindow = rWindow || window;
   rDocument = rDocument || document;

   // See http://www.howtocreate.co.uk/tutorials/javascript/browserwindow
   var size = [0, 0];
   if (typeof rWindow.innerWidth !== 'undefined')
   {
      // most browsers, but importantly, not Internet Explorer
      size = [ rWindow.innerWidth, rWindow.innerHeight ];
   }
   else if (typeof rDocument.documentElement !== 'undefined' &&
      typeof rDocument.documentElement.clientWidth !== 'undefined' &&
      rDocument.documentElement.clientWidth !== 0)
   {
      // most DOM browsers, including Internet Explorer 6+ in 'standards compliant mode'
      size = [ rDocument.documentElement.clientWidth, rDocument.documentElement.clientHeight ];
   }
   else
   {
      // many browsers, including Internet Explorer
      var rBody = rDocument.body || rDocument.getElementsByTagName('body')[0];
      size = [ rBody.clientWidth,
               rBody.clientHeight ];
   }

   return size;
};

FT.Conker.windowResize = function (rConker, rDocument, idPopup, idOverlay)
{
   // IE fires off window resize events not just when window size changes
   // but when document body is modified!!! so we look to see if the viewport
   // has changed before we do anything.
   var currentSize = rConker.getViewportSize(window, rDocument);
   if (!rConker.bDebug || (currentSize[0] !== rConker.viewportSize[0] || currentSize[1] !== rConker.viewportSize[1]))
   {
      rConker.viewportSize = currentSize;
      FT.Conker.resizeOverlay(rConker, rDocument, idPopup, idOverlay, 'window');
   }
};

FT.Conker.resizeOverlay = function (rConker, rDocument, idPopup, idOverlay, label)
{
   rConker.positionOverlay(rDocument, idOverlay, label);
   rConker.positionPopup(rDocument, idPopup, label);
};

FT.Conker.monitorResize = function (rDocument, rWindow)
{
   var self = this;
   rWindow = rWindow || window;
   var idPopup = '#popconker';
   var idOverlay = "#popconker-overlay";
   var WatchDivs = ['#page-header-ad', '#top-ad', '#ad-placeholder-banlb', '#leaderboard', '#ad-placeholder-nessubs'];

   // Attach a window resize handler, taking care of IE resize bug
   // http://blog.stchur.com/2006/08/20/beating-the-ie-resize-bug/
   // http://blog.stchur.com/2006/09/06/the-ie-resize-bug-revisited/
   var label = 'window';
   self.debug('Add resize handler to: ' + label);
   self.viewportSize = self.getViewportSize(rWindow, rDocument);

   this.jQuery(rWindow).resize(function ()
      {
         FT.Conker.windowResize(self, rDocument, idPopup, idOverlay);
      }
   );

   // Attach events to all possible div's that could be resized.
   for (var idx = 0; idx < WatchDivs.length; ++idx)
   {
      (function () // important!! don't ask
      {
         var div_id = WatchDivs[idx];
         var rDiv = self.jQuery(div_id);
         if (rDiv.length)
         {
            var label = div_id;
            self.debug('Add resize handler to: ' + label);
            rDiv.resize(function ()
               {
                  FT.Conker.resizeOverlay(self, rDocument, idPopup, idOverlay, label);
               }
            );
         }
      }
      )();
   }

   if (this.bUseTimer)
   {
      label = 'timer';
      this.debug('Add interval event to reposition popup');
      this.timerId = setInterval(
         function ()
         {
            FT.Conker.resizeOverlay(self, rDocument, idPopup, idOverlay, label);
         }, 5000);
      this.debug('Add interval event to reposition popup: ' + this.timerId);
   }
};

FT.Conker.debug = function (message)
{
   if (this.bDebug)
   {
      var rOutputNode = document.getElementById('conker_debug_log');
      if (!rOutputNode)
      {
         rOutputNode    = document.createElement('div');
         rOutputNode.id = 'conker_debug_log';
         if (!this.bShowDebug)
         {
            rOutputNode.style.visibility = 'hidden';
         }
         document.body.appendChild(rOutputNode);
      }
      var rNewNode       = document.createElement('p');
      rNewNode.innerHTML = message;
      rOutputNode.appendChild(rNewNode);
   }
};

//=========================================================================
// Non-member functions
//=========================================================================

FT.Conker.applyConcurrencyLogic = function (jQuery, rcCallback, urlConker, urlPopup, bForcePopup, bUseTimer, bDebug, bShowDebug)
{
   var rConker = new FT.Conker(jQuery, urlConker, urlPopup);
   rConker.bForcePopup = false;
   rConker.bUseTimer   = bUseTimer ? true : false;
   rConker.bDebug      = bDebug?     true : false;
   rConker.bShowDebug  = bShowDebug? true : false;

   if (bForcePopup)
   {
      // Developers only, force the popup ignoring the cookies
      rConker.debug('Forcing popup to show');
      rConker.bForcePopup = true;
      rConker.getCookies();
      if (rConker.isEmpty(rConker.eRightsId))
      {
         rConker.eRightsId  = '1';
      }
      if (rConker.isEmpty(rConker.eSessionId))
      {
         rConker.eSessionId = '1';
      }
      if (rConker.isEmpty(rConker.trackId))
      {
         rConker.trackId  = '127.0.0.1.123456789012345678';
      }
      rConker.debug('rConker: ' + _dumpThis(rConker, 'rConker'));
   }
   else if (rConker.getCookies())
   {
      if (!rConker.isRegistered && !rConker.isHelpDesk)
      {
         bForcePopup = true;
      }
   }
   if (bForcePopup)
   {
      rConker.checkConcurrency(rConker.eRightsId, rConker.eSessionId, rConker.trackId, rcCallback);
   }
};

FT.Conker.hidePopup = function (rDocument, id)
{
   // Cancel the interval timer we created
   var bForcePopup = false;
   if (typeof FT.Conker.instance !== 'undefined')
   {
      FT.Conker.instance.debug('Clearing timer interval: ' + FT.Conker.instance.timerId);
      if (FT.Conker.instance.timerId)
      {
         clearInterval(FT.Conker.instance.timerId);
      }
      bForcePopup = FT.Conker.instance.bForcePopup;
   }

   if (bForcePopup)
   {
      rDocument.getElementById(id).style.visibility = 'hidden';
   }
};

FT.Conker.receiveConkerResponse = function (data, rConker)
{
   rConker.debug('receiveConkerResponse()');
   if (data.deny)
   {
      rConker.debug('receiveConkerResponse() denied');
      if (!this.bForcePopup)
      {
         rConker.deleteCookies();
      }
      rConker.injectMessage(document, 'conker-div');
   }
};

if (typeof _dumpThis === 'undefined')
{
   // if dump.js not loaded, define a stub function.
   _dumpThis = function (thing)
   {
      return thing;
   };
}


/* Embedded into the FTTrack2.js only: */
if (typeof jQuery !== 'undefined' && typeof jQuery.cookie !== 'undefined')
{
   jQuery.noConflict();
   jQuery(document).ready(function ()
      {
         var bConkerKillSwitch = false;
         if (!bConkerKillSwitch && typeof FT !== 'undefined' && typeof FT.Conker !== 'undefined' && typeof FT.Conker.applyConcurrencyLogic !== 'undefined') {
            if (!FT.bIsAdRefresh) {
               FT.Conker.applyConcurrencyLogic(
                  jQuery, FT.Conker.receiveConkerResponse,
                  undefined, // web service url
                  undefined, // popup html url
                  false, // force popup
                  false, // use timer
                  false, // debug
                  false  // show debug in browser
               );
            }
         }
      }
   );
}
/* Concurrency Web Service interface ends */

/* Embedded for Tynt usage and used for classic article pages: */
FT.Tynt = {
 	initTynt:function() {
			var Tynt=Tynt||[];

			var ftNotice = "High quality global journalism requires investment. Please share this article with others using the link below, do not cut &amp; paste the article. See our <a href='http://www.ft.com/servicestools/help/terms'>Ts&amp;Cs</a> and <a href='http://www.ft.com/servicestools/help/copyright'>Copyright Policy</a> for more detail. Email <a href='mailto:ftsales.support@ft.com'>ftsales.support@ft.com</a> to buy additional rights. ";
			var tmpElement = document.createElement("DIV");
			tmpElement.innerHTML=ftNotice;
			FT.Tynt.plainTextFtNotice=tmpElement.textContent||tmpElement.innerText;

			Tynt.push('cqolxGrS4r34rIadbiUt4I');
			Tynt.i= {"cc":"0",
			"aw":"31",
			"b":true,
			"ap":ftNotice,
			"t":true};
			return Tynt;
 		},
 	doTynt:function() {
 		if(typeof Tynt != "undefined" && document.location.protocol=='http:'){	
			var s=document.createElement('script');
			s.async="async";
			s.type="text/javascript";
			s.src	='http://tcr.tynt.com/ti.js'; 
			var h=document.getElementsByTagName('script')[0];
			h.parentNode.insertBefore(s,h);
 		}
		
		/* IP827 report on the user doing the copy */
		if (window.addEventListener) {
			navigator.userAgent.match("Firefox/2") || document.body.addEventListener("copy", function() {trackCopying();}, false);
		} else {         
			document.body.attachEvent("oncopy", function() {trackCopying();});
		}
 	},
	getPlainTextFtNotice:function() {
		return FT.Tynt.plainTextFtNotice;
	}
};

function trackCopying() {
    var txt = '';
    if (window.getSelection) {
        txt = window.getSelection().toString();
    } else if (document.getSelection) {
        txt = document.getSelection().toString();
    } else if (document.selection) {
        txt = document.selection.createRange().text;
    }

	var firstLine = txt.split(/\r\n|\r|\n/)[0];
	if (firstLine.indexOf(FT.Tynt.getPlainTextFtNotice())==0){
		txt=txt.replace(firstLine,"");
	}

    if (txt != ''){
    	var count = txt.replace(/\s+/g,'').length;
 		SiSendAdditionalTracer("/si/tynt_start","copied="+count);
    }	
}
