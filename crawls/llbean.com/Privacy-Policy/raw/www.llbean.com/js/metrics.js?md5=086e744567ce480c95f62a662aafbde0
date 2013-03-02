/*requires s_code.js*/

function passMetricObjectAndSendPageTag ( objRef ) {
     for (key in objRef ){
         s_o_sc[key]=objRef[key];
     }
     sendMetricTag();
}


function sendMetricTag () {
   // for layer calls
   if (typeof ll_o=="object"){
      for (var key in ll_o ) {
        s_o_sc[key] = ll_o[key];
      }
    }
   var s_code = s_o_sc.t(); 
}

function sendMetricTagCheckoutSBTag () {
  s_o_sc.pageName = 'Shopping Bag - Continue CheckOut Button';
  s_o_sc.events = 'scCheckout';
  s_o_sc.prop4+=' Checkout Button';
  s_o_sc.prop7+=' Checkout Button';
  sendMetricTag();

}

if (typeof ll_o!="object") var ll_o=new Object();
ll_o.url=document.URL;
ll_o.ref=document.referrer;
ll_o.path=window.location.pathname;

ll_o.timeoutDur=1900;
ll_o.BVTimeoutDur=3000;

ll_o.sigInd='';
if (typeof sigPage!='undefined') ll_o.sigInd='SIG-';

if (s_account.indexOf('kiosk')>-1) s_o_sc.eVar48='kiosk';

function trackFlashMetrics(label) {
   if (typeof llCgyId!="undefined"){
       label = llCgyId+"-"+label;
   }
   sendEvt('prop1','None',label);
}

function deleteUserSchTermCookie() {
  if (document.cookie.indexOf("LLBUSERSCH")>-1) {
      document.cookie = "LLBUSERSCH="+''+";path=/;domain=.llbean.com;"+";expires=Thu, 01-Jan-1970 00:00:01 GMT";
  }
} 

function storeSearchSession(val){
  document.cookie = "LLBSCH="+val+";path=/;domain=.llbean.com;";
}
function storeClassAndTerm(cls,term){
   storeSearchClass(cls);
   storeSearchTerm(term);
}

function getSearchClass(){
    var ca=new Array();
    var cls='';
    ca=getCookieIntoArry ();
    if (ca[0]!=null){
      cls=ca[0];
    }
    return cls;
}

function storeSearchClass(cls){
    var ca=new Array();
    ca=getCookieIntoArry ();
    ca[0]=cls;
    var c=ca[0];
    // start at 1!
    for (var i=1;i<ca.length ;i++ ){
      c+=":"+ca[i];
    }
    storeSearchSession(c);
}

function storeSearchTerm(newterm) {
   // only writes if term really new
   // returns new-term boolean (1=new)
   newterm=newterm.toLowerCase().replace(/ /g,'+'); 
   var c=gcookie("LLBSCH");
      if (c!=null){
        var ca=getCookieIntoArry ();
        //don't touch first field
        for (var i=1;i<ca.length ;i++ ) {
           if (newterm == ca[i] ){
             return 0;
           }
         }
         c += ":"+newterm;
      } else {
           c =  newterm;
      }
      storeSearchSession(c);
      return 1;
}

function getCookieIntoArry () {
  var ca=new Array();
  if (gcookie("LLBSCH")) {
    ca = gcookie("LLBSCH").split(":");
  }
  return ca;
}

function featSrchGuide(freeText,newfeat){
    //called from a guide presntation page (usu. categoryDisplay or search)
     var pattern="["+freeText+"|"+newfeat+"]";
     storeSearchTerm(pattern);
}
//global functions for metrics

function attrvals() {
   var i=ll_o.url.indexOf("?");
   var end=ll_o.url.length;
   var this_nvp=""; var ap="";
   while (i < ll_o.url.length&&i>0){
      var this_end=end;
      if (ll_o.url.indexOf("&",i)<end&&ll_o.url.indexOf("&",i)>0){this_end=ll_o.url.indexOf("&",i);}
     this_nvp=ll_o.url.substring(i,this_end);
     if (this_nvp.indexOf("attrValue")>-1){
        ap+=this_nvp.substring(this_nvp.indexOf("=")+1)+":";
     }
      i=this_end+1;
   }
   return ap.substring(0,ap.length-1);
}
ll_o.titleTrim = function (s){
   return s.replace(/^\s*|\s*$/g,"");
}


var bT=document.title;

var llk="krypto";
var llCkSc,llCkSC="";
var llcdata="";

if ( (bT.indexOf(".llbean.com -")>-1)
  && (bT.indexOf(".llbean.com -")<12)) {
    bT=bT.substring(bT.indexOf("-")+1);
}
if (bT.indexOf("L.L.Bean:",0)>-1)  {
   bT=ll_o.titleTrim(bT.substring(bT.indexOf(":",0)+1));
}

function rmK(u){
 var u=ll_o.url;
 var re=/([\&|\?]krypto=[^\?|\&|\n]*)/;
 u=u.replace(re,"");
 return u;
}
ll_o.parm = function ( u,nm ){
  nm = nm.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+nm+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( u );
  if( results == null )
    return null;
  else
    return results[1];
}

function prevPgId(){
   var prevId=-1;
   if (ll_o.ref.indexOf('categoryId')>-1){
      prevId=ll_o.parm(ll_o.ref,'categoryId');
   } else if ( ll_o.ref.match(/llb\/shop\/(\d{2,})/) ) {
      prevId=RegExp.$1;
   }
   return prevId;
}

function pval(parm){
  return ll_o.parm(ll_o.url,parm);

}
// this function gets the cookie, if it exists
function gcookie( name ) {
var start = document.cookie.indexOf( name + "=" );
var len = start + name.length + 1;
if ( ( !start ) &&
( name != document.cookie.substring( 0, name.length ) ) )
{return null;}
if ( start == -1 ) return null;
var end = document.cookie.indexOf( ";", len );
if ( end == -1 ) end = document.cookie.length;
return unescape( document.cookie.substring( len, end ) );
}
// this deletes the cookie when called
function dcookie( name, path, domain ) {
if ( gcookie(name)) document.cookie = name + "=" +
( ( path ) ? ";path=" + path : "") +
( ( domain ) ? ";domain=" + domain : "" ) +
";expires=Thu, 01-Jan-1970 00:00:01 GMT";
}

function ckQS(){
    var u=unescape(ll_o.url);
    var end,w=u.indexOf("qs=");
    if(w<0)return null;
    end=(u.indexOf('&',w+1)>-1?u.indexOf('&',w+1):u.length)
    lls=unescape(ll_o.url).substring(w+3,end);
    if (lls.indexOf("-")>-1&&lls.length>6){
       lls=lls.substring(0,7);
    }else if (lls.length < 7){
       lls="";
    }
    if(isNaN(lls)){
       lls=lls.substring(0,7);
       if(isNaN(lls)){
           lls="";
       }
    }
    return lls;
}
function ck(){
  var re=/LLBEAN=([^\:]*):([^\:]*):[^\:]*:[^\:]*:([^\:]*):/;
  var s=re.exec(document.cookie);
  if(s!=null){
     llCkSC=unescape(s[1]);
     if (llCkSC.indexOf("-")>-1&&llCkSC.length>6){
       llCkSC=llCkSC.substring(0,7);
     }else if (llCkSC.indexOf("_2D")>-1&&llCkSC.length>6){
       llCkSC=llCkSC.substring(0,7);
     }else if (llCkSC.length < 7){
       llCkSC="";
     }
     if(isNaN(llCkSC)){
       llCkSC=llCkSC.substring(0,7);
       if(isNaN(llCkSC)){
           llCkSC="";
       }
     }
     llcdata=unescape(s[3]);
     llCkSc=llCkSC;
     s_o_sc.prop32=s[2];
  }
}
function assignCampaign() {
        //local for assignCampaign
        function doAssign(s,q)  {
             var llbc=gcookie('LLBEAN').split(':') ;
             llbc[0]=s+'-'+q;
             var news = llbc.join(':');
             var d = new Date(); var exp =  d.getTime() + ( 768 * 24 * 60 * 60 * 1000 ); d.setTime(exp); 
             document.cookie = 'LLBEAN='+news+';expires='+d.toGMTString()+';domain=.llbean.com;path=/;'
        }
        var scode='';
        if (ll_o.url.indexOf("qs=")>-1 ) {
           scode=ckQS();
        }  else  if (ll_o.ref.length > 1 && (ll_o.ref.indexOf("https://w"+"ww.llbean.com") < 0 && ll_o.ref.indexOf("http://w"+"ww.llbean.com")<0 )) {

        
           if (location.host=='ww'+'w.llbean.com') {
                var enginesUS= [
                  {i:"google",patt:/(http|https):\/\/.*google.com/,sc:"3010809",parm:"q"}
                 ,{i:"yahoo",patt:/http:\/\/.*search.yahoo/,sc:"3010810",parm:"p"}
                 ,{i:"msn-live",patt:/http:\/\/.*(search|msntv|www).(msn|live|bing)/,sc:"3010811",parm:"q"}
                 ,{i:"aol",patt:/http:\/\/.*search.aol/,sc:"3010812",parm:"query"}
                 ,{i:"ask",patt:/http:\/\/.*ask.com/,sc:"3010813",parm:"q"}
                ];
                for (var i=0;i<enginesUS.length;i++){
                       var reg = new RegExp(enginesUS[i].patt);
                       if (reg.test(ll_o.ref)) {
                          var qry='';
                          if (ll_o.ref.toLowerCase().indexOf(enginesUS[i].parm+"=")>-1) {
                               qry=ll_o.parm(ll_o.ref,enginesUS[i].parm).toLowerCase().replace(/[^a-z|0-9]/g,'_');
                               qry=qry.replace(/_{2,}/g,'_');
                               qry=qry.replace(/_$/g,'');
                               if (qry.length>90) { qry=qry.substr(0,90); }
                          }
                          if (enginesUS[i].i=="msn-live") {
                             if ( ll_o.ref.toLowerCase().indexOf("mkt=en-us")>-1 || ll_o.ref.indexOf("mkt=") < 0 ) {
                                scode=enginesUS[i].sc;
                                doAssign(scode,qry);
                             }
                          } else {
                             scode=enginesUS[i].sc;
                             doAssign(scode,qry);
                          }
                          break;
                       }

                 }
           }
       }
       return scode;
}

ll_o.srcCd=assignCampaign();

ck(); //process cookie
if (ll_o.ref.indexOf(llk)>-1){
  s_o_sc.referrer=rmK(ll_o.ref);
}
if (ll_o.url.indexOf(llk)>-1){
  s_o_sc.pageURL=rmK(ll_o.url);
}

//global vars
if(!llp30)var llp30="";
if(!llJSP)var llJSP="";
if(!llOID)var llOID="";
if(!llEvent)var llEvent="";
if(!llProducts)var llProducts="";
if(!metricPath)var metricPath="";
if(!llCgyId)var llCgyId="";
if(!llAlpha)var llAlpha="";
if(!llDisplay)var llDisplay="";
if(!llKeyword)var llKeyword="";
if(!llQSTerm)var llQSTerm="";
if(!llFinderTerm)var llFinderTerm="";
if(!llCatId)var llCatId="";
if(!llCatDesc)var llCatDesc="";
if(!llFlashPath)var llFlashPath="";
if(!llLoginStatus)var llLoginStatus="";
if(!llPYOrecipts)var llPYOrecipts="";
if(!llprodName)var llprodName="";
if(!lledds)var lledds="";
if(!flexMssgType)var flexMssgType="";

if (!llsprop28)var llsprop28=""; 

// split cookie(llbpz)
if (!llev21)var llev21="";
if (!llev22)var llev22="";
if (!llev23)var llev23="";
function oapSeg () {
    if(document.cookie.indexOf("LLBPZ")>0){
    var reg=['Guest','Reg'];
    var oap=['nonOAP','OAP','NewOAP'];
    var arry=gcookie('LLBPZ').split('|');
    llev21=oap[parseInt(arry[1])]+":"+reg[parseInt(arry[0])];
    llev22=parseInt(arry[2]);
    llev23=llev21+"."+llev22;
    }
}
oapSeg();

function sendEvt(sendVars,sendEvt,linkNm) {
  s_o_sc.linkTrackVars=sendVars;
  s_o_sc.linkTrackEvents=sendEvt;
  s_o_sc.tl(true,'o',linkNm);   
}

function oapOfferVarAssembly(p) {
   var r=''
   , a =  unescape(gcookie("LLBCC")).split("|");
   if (a[0]!="null"){
      if ( a.length < 5 ){   // cookie bug workaround
		  a[4] = "n/a"
      }
      r =  p +":"+oapProcess(a[0])+":"+oapRegSts() +":"+oapOfferChoice(a[3]) +":"+oapICAvail()+ ":"+ oapAppType(a[4]); 
   }
   return  r; 
}

function oapICAvail () {
   var x='na';
   if ( typeof isICAvl!="undefined" ){
      x=(isICAvl=='true'?'1':'0');
   }
   return x;
}
function oapProcess(app){
 switch (app) {
	case 'CO':
	  appType='Checkout';	  
	  break;
	case 'CL':
	  appType='Coupon Lookup';
	  break;
	case 'FI':
	  appType='Full App';
	  break;
	case 'FE':
	  appType='Full App';
	  break;
	default:
	  appType='na';
	  break;
  }
  return appType;
}
function oapRegSts(){
  var x='Unreg';
  if(gcookie("LLBLS")!=null ){ // 1 or 0
	  if (gcookie("LLBLS")) {
		  x="Reg";
	  }
  }
  return x;
}
function oapAppType(x) {
  if (typeof x!="undefined"){
  x=x.replace(/FAICS/,"FAIC Holdout");
	s_o_sc.eVar38=x;
  }
  return x;
}
function oapOfferChoice(x){
	var y='na';
	if (x==1){  // 1=apply, 0=..., na
	   y='Apply'
	}else if (x==0){
	   y='No';
	}
	return y;
}


if(typeof FSR!="undefined"){
   FSR.CPPS.set ( "visitorID" , llcdata );    //  Foresee - llcdata is a global var from metrics code referencing our visitorId
   FSR.CPPS.set ( "bagFlag" , 0 );            //  Foresee neeeds parms set for placeholding on these 2 events
   FSR.CPPS.set ( "orderThanks" , 0 );        
}

if (ll_o.url.indexOf("trkid")>-1){
    s_o_sc.eVar13=pval("trkid") ;
}

if (ll_o.url.indexOf('qei=')>-1){
   s_o_sc.prop10 = pval('qei');
}


// Add for user Login Tracking
function hasLoginCookie() {
    var loginCookie = gcookie("LLBLS");
    if (loginCookie){
       if (ll_o.url.indexOf("qlogin=true")>-1){
          if (llEvent == ''){
             llEvent+="event15";
          } else {
             llEvent+=",event15";
          }
       }
       return "true";
    } else {
       return "false";
    }
}

function atbEvents(){
  llEvent="scAdd";
  if (document.cookie.indexOf("llct")<0){
    document.cookie="llct=1;path=/;domain=.llbean.com;";
    llEvent+=",scOpen";
   }
   return llEvent;
}

// get the memberId
function getMemberId(){
        var cNm = "WC_USERACTIVITY_";
        var start = document.cookie.indexOf(cNm);
        var len = (document.cookie.indexOf("=",start) + 1);
        if ((!start)&&(cNm!=document.cookie.substring(0,cNm.length))){
                return "";
        }
        if (start==-1){return "";}
        var end = document.cookie.indexOf(";",len);
        if(end==-1){end = document.cookie.length;}
        var llmemberId = unescape(document.cookie.substring(len,end));
        llmemberId = llmemberId.substring(0,llmemberId.indexOf(","));
        return llmemberId;
}


s_o_sc.eVar41="D=c1";
s_o_sc.eVar42=s_o_sc.prop10;
s_o_sc.eVar43=getMemberId();

//personalization 
s_o_sc.eVar49=gcookie("LLBVAT");
if(s_o_sc.eVar49==null){
      s_o_sc.eVar49='';
}else{
      var vatArray = s_o_sc.eVar49.split(":");
      s_o_sc.eVar32 = (vatArray[2]=="true") ? "Yes" : "No";
      s_o_sc.eVar33 = (vatArray[3]=="true") ? "Yes" : "No";
      s_o_sc.eVar34 = vatArray[10];  //nbr cpns

      switch (vatArray[4])
      {
            case '1': 
                  s_o_sc.eVar31 = "One Year";
                  break;
            case '2': 
                  s_o_sc.eVar31 = "Lapsed";
                  break;
            case '3': 
                  s_o_sc.eVar31 = "Prospect";
                  break;
            case '5': 
                  s_o_sc.eVar31 = "Unknown First";
                  s_o_sc.eVar32 = s_o_sc.eVar33 = "Unknown";
                  break;
            case '99': 
                  s_o_sc.eVar31 = "Unknown Return";
                  s_o_sc.eVar32 = s_o_sc.eVar33 = "Unknown";
                  break;
            default:
      }
}

ll_o.vpc=gcookie('LLBVPC');
if(ll_o.vpc!=null){
    ll_o.vpcArray=new Array();
    if (ll_o.vpc.indexOf("|")>-1){
       ll_o.vpcArray=ll_o.vpc.split("|");
    }else{
        ll_o.vpcArray[0]= ll_o.vpc;
    }
    s_o_sc.eVar50='';
    for (var i=0;i<ll_o.vpcArray.length ;i++ ){
        var x='';
        //cluster format: pc1:0:PCD:1320055200000:4090:PCD23456
        if ( ll_o.vpcArray[i].toString().match(/([^\:]*):([^\:]*):([^\:]*):[^\:]*:([^\:]*):[^\:]*/ ) ) {
           x = RegExp.$1 + ':' + RegExp.$2 + ':' + RegExp.$3 + ':' + RegExp.$4;
        }
        s_o_sc.eVar50 += x + "-";
    }
    s_o_sc.eVar50 = s_o_sc.eVar50.replace(/[-|\|]$/,'');
}

s_o_sc.prop24="D=DNT";


// Google Product Ad Pixel Inclusion - 10.29.10 Tony Elmquist
// Cookie setter with date rather than year function

function Set_Cookie( name, value, expires, path, domain, secure ){
// set time, it's in milliseconds
var today = new Date();
today.setTime( today.getTime() );

/*
if the expires variable is set, make the correct
expires time, the current script below will set
it for x number of days, to make it for hours,
delete * 24, for minutes, delete * 60 * 24
*/
if ( expires ){
  expires = expires * 1000 * 60 * 60 * 24;
}
var expires_date = new Date( today.getTime() + (expires) );

document.cookie = name + "=" +escape( value ) +
( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
( ( path ) ? ";path=" + path : "" ) +
( ( domain ) ? ";domain=" + domain : "" ) +
( ( secure ) ? ";secure" : "" );
}

// check parameters for Google qs value
google_sc_param = pval('qs');

// set cookies
if (google_sc_param != null){
    google_sc_param.toLowerCase();	

     if ((google_sc_param.indexOf('3023924') != -1) || (google_sc_param.indexOf('3016887') != -1))  {
        Set_Cookie('googleProductAd', 'true',1,'/','llbean.com')
      } else if (google_sc_param.indexOf("googleca") != -1)  {
        Set_Cookie('googleAdCanada', 'true',30,'/','llbean.com')
      } else if (google_sc_param.indexOf("google") != -1)   {
        Set_Cookie('googleAd', 'true',30,'/','llbean.com')
      }

}

function isDefaultVAT(){
 var vat=gcookie("LLBVAT");
 if(vat!=null){
   if(vat.match(/:false:false:5:9999:99:false:[^\:]*:0:0:0/) ){
      vat=true;
   }else{
      vat=false;
   }

 }
 return vat; //null,t or f
}

if(document.cookie.indexOf("LLBBDL")>-1){
  var x=gcookie("LLBBDL");
  s_o_sc.eVar16="BDL ";
  s_o_sc.eVar16+=(x==1?"Bundles":(x==2?"Control":"Hide"));
}

if(document.cookie.indexOf("LLBCPN")>-1){
  var x=gcookie("LLBCPN");
  s_o_sc.eVar29=(x=='0:0'?"False":"True" );
}

// gan campaign 2012

var llg_ab={};
llg_ab.pgmCk=gcookie("llbg2012"); //may return null or current val
llg_ab.timestamp=gcookie("LLBEAN").split(/:/)[2];
//google labels mapping
llg_ab.rmkt="NmwjCKmBzAIQ-dGR9wM";
llg_ab.oap= "eeLgCLGAzAIQ-dGR9wM";
llg_ab.nonoap= "u1D2CKGCzAIQ-dGR9wM";


var google_conversion_id = 1055156473;
var google_conversion_language = "en";
var google_conversion_format = "3";
var google_conversion_color = "ffffff";
var google_conversion_label = '';
var google_conversion_value = 0;

llg_ab.writeTag=function(lbl){
   google_conversion_label = llg_ab[lbl];
   //document.writeln("<script type='text/javascript' src='"+ location.protocol +"//www.googleadservices.com/pagead/conversion.js'></script>");
   var conversionjs = document.createElement('script');
   conversionjs.setAttribute('src', '//www.googleadservices.com/pagead/conversion.js');
   var head = document.getElementsByTagName('head')[0];
   head.appendChild(conversionjs);
   if ( typeof util.hideGoogleAdd === 'function' ) {
      util.hideGoogleAdd();
   }
}

llg_ab.handleSegCookie = function(pgm,seg){
   var ckexp=new Date("December 31, 2012 23:30:00").toUTCString();
   //update the campaign cookie
   var val=llg_ab.timestamp+":"+pgm;
   if(arguments.length==2)val+=":"+seg;
   document.cookie = "llbg2012="+val+";path=/;domain=.llbean.com;"+";expires="+ckexp;
}

if (llJSP != "homepage" && llJSP!="orderthanks" && document.cookie.toString().toLowerCase().indexOf('kiosk')<0 ){
        if( llg_ab.pgmCk!=null && llg_ab.pgmCk.indexOf( llg_ab.timestamp )>-1 ) {
            // do nothing, not time to update
        } else {
             var dflt=isDefaultVAT();      // null, true or false
             llg_ab.remktSeg=-1;
             llg_ab.segCutoff=90;   // out of 100 possible random values

             //either null, or, time to update
             if (dflt==true) {
                   //new VAT - give to rmkt
                   llg_ab.rn = Math.floor(Math.random()*100);  // 0-99
                   llg_ab.remktSeg = (llg_ab.rn < llg_ab.segCutoff? 0 : 1 );  //if randNum less than cutoff (negative), put into control seg (0)

                   if ( llg_ab.pgmCk!=null){
                      // grab already assigned AB seg
                      llg_ab.remktSeg=llg_ab.pgmCk.split(/:/)[2];
                   }
                   if (window.location.hostname.indexOf('ecwcss'+'01.llbean.com')>-1 && parm('rmktseg')!=null){
                      llg_ab.remktSeg=parm('rmktseg');
                   }

                   if(llg_ab.remktSeg==0) llg_ab.writeTag('rmkt'); //0='show',1='hide'
                   llg_ab.handleSegCookie("rmkt",llg_ab.remktSeg);
                   s_o_sc.eVar20 = (llg_ab.remktSeg==0?'GAN: Rmkt Ctl':'GAN: Rmkt Holdout');


             } else {
                 if (dflt == null){
                 // VAT n/a - wait for page 2
                 }else{
                 //we know whether or not they have OAP
                    if(gcookie("LLBVAT").split(":")[2] == "false" 
                    && ( llg_ab.pgmCk!=null && llg_ab.pgmCk.indexOf("rmktseg")<0 ) //only let remkt migrate to OAP == true; no migrate to nonOAP  
                       ){
                        llg_ab.handleSegCookie("nonoap");
                        llg_ab.writeTag('nonoap');
                        s_o_sc.eVar20 = 'GAN: NonOAP';
                     } else {
                        llg_ab.handleSegCookie("oap");
                        llg_ab.writeTag('oap');
                        s_o_sc.eVar20 = 'GAN: OAP';
                     }
                 }
            }
        }

}


s_o_sc.eVar30="D=User-Agent";

function sendMetricsTagLoginLayer () {

   s_o_sc.pageName='Log In (LoginLayer)';
   s_o_sc.prop4='LogInLayer';
   s_o_sc.prop7='LogInLayer';
   s_o_sc.events='';

   sendMetricTag();

}

function setBuyBuddyPixel() {
//Potential flag to turn the js off
	var currentSC = gcookie('LLBEAN').split(':')[0];

  var sourceCode = currentSC.toLowerCase(),
  lowerBuyBuddySourceCode = buyBuddySourceCode.toLowerCase();

	if ( buyBuddyPixelActive == 1 && sourceCode.indexOf(lowerBuyBuddySourceCode) != -1) {
		buddyImageSrc = "//track.brighteroption.com/b?p=sx2vsj&l=0&sb_v=";
		buddyImageSrc += netBalance.replace('.','');
		buddyImg = document.createElement("img");
		buddyImg.onload = function() { return; };
		buddyImg.src =buddyImageSrc;
		buddyImg.setAttribute('style' ,'left: -9999px; top: -9999px; position:absolute;');
	}
}