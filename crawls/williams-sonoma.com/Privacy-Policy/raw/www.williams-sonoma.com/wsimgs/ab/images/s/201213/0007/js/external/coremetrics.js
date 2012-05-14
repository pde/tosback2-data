/*Copyright 2000-2011,Coremetrics 4.8.5H $Revision:174271 $*/if(!cGB){var cGB=true;if(!cm_ClientID){var cm_ClientID="99999999";}if(!cm_HOST){var cm_HOST="testdata.coremetrics.com/cm?";}if(!cm_ClientTS){var dt=new Date();var cm_ClientTS=dt.getTime();}if(!cm_TrackLink){var cm_TrackLink="A";}if(!cm_DelayHandlerReg){var cm_DelayHandlerReg="";}if(!cm_SkipHandlerReg){var cm_SkipHandlerReg="";}if(!cm_TrackTime){var cm_TrackTime=false;}if(!cm_TrackImpressions){var cm_TrackImpressions="RSCM";}if(!cm_SecureTags||cm_SecureTags==null){var cm_SecureTags="|2|3|";}if(!cm_FirstPartyDetect){var cm_FirstPartyDetect=false;}if(!cm_DownloadExtensions){var cm_DownloadExtensions=null;}if(!cm_UseUTF8){var cm_UseUTF8=true;}if(!cm_FormError){var cm_FormError="";}if(!cm_FormPageID){var cm_FormPageID=false;}if(cm_UseCookie==null){var cm_UseCookie=false;}if(!cm_TimeoutSecs){var cm_TimeoutSecs=15;}if(!cm_UseDOMScriptLoad){var cm_UseDOMScriptLoad=true;}if(!cm_OffsiteImpressionsEnabled){var cm_OffsiteImpressionsEnabled=false;}if(!cm_AvidHost){var cm_AvidHost="data.cmcore.com/cookie-id.js?fn=cmSetAvid";}var cm_AvidLoadTimedOut=false;if(!cm_JSFEnabled){var cm_JSFEnabled=false;}if(!cm_JSFPCookieDomain){var cm_JSFPCookieDomain=null;}if(!cm_JSFTrackClients){var cm_JSFTrackClients=true;}if(!cm_JSFPCookieMigrate){var cm_JSFPCookieMigrate=false;}if(!cm_JSFPForceMigrateCookies){var cm_JSFPForceMigrateCookies=false;}if(!cm_JSFPCookieMigrateVisitorID){var cm_JSFPCookieMigrateVisitorID="cm_mc_uid";}if(!cm_JSFPCookieMigrateSessionID){var cm_JSFPCookieMigrateSessionID="cm_mc_sid";}if(!cm_JSFPMigrationDomainWhitelist){var cm_JSFPMigrationDomainWhitelist=null;}if(!cm_JSFPMigrationDomainBlacklist){var cm_JSFPMigrationDomainBlacklist=null;}if(!cm_JSFPMigrationPathWhitelist){var cm_JSFPMigrationPathWhitelist=null;}if(!cm_JSFPMigrationOtherCookies){var cm_JSFPMigrationOtherCookies=null;}if(!cm_JSFPMigrationOtherCookiesExpireTimes){var cm_JSFPMigrationOtherCookiesExpireTimes={};}if(!cm_JSFMigrationEnabled){var cm_JSFMigrationEnabled=0;}if(!cm_JSFSessionType){var cm_JSFSessionType="I";}if(!cm_JSFSessionTimeout){var cm_JSFSessionTimeout=1800;}if(!cm_JSFCoreCookieName){var cm_JSFCoreCookieName="CoreID6";}if(!cm_JSFSpecCookieNames){var cm_JSFSpecCookieNames=[];}if(!cmUA){var cmUA={};cmUA["MSIE"]=2083;}if(!cmDefaultLimit){var cmDefaultLimit=8197;}if(cGQ==null){var cGQ=true;}if(!cGO){var cGO=1024;}if(!cGR){var cGR=600000;}if(!encodeURIComponent){var encodeURIComponent=null;}var cG8;var cG8Index;var cG6=document;var cGT;var cG7=new _cG7();cG6.cmTagCtl=cG7;var CI=cmStartTagSet;var CJ=cmSendTagSet;var cG1=0;var cG0=["vn1","vn2","st","pi","rs","ec","rf","ul"];var cmLastPageID=null;var cGA=null;var cmMigrationDisabled=0;var cmMigrationFrom1p_CM=1;var cmMigrationFrom1p_SA=2;var cmValidFlag_SessionContinue=1;var cmValidFlag_NewSession=2;var cmValidFlag_NewVisitor=4;var cmValidFlag_SessionReset=32;var cmSACookieName="sauid";var cmCore_JSFParamEnabled="cjen";var cmCore_JSFParamUserID="cjuid";var cmCore_JSFParamSessionID="cjsid";var cmCore_JSFParamValidFlag="cjvf";var cmCore_JSFParamSpecCookiesCount="cjscc";var cmCore_JSFParamSpecCookiesNames="cjscn";var cmCore_JSFParamSpecCookiesValues="cjscv";var cmSpecCookieNames="";var cmSpecCookieValues="";var cmSpecCookiesCount=0;if(!cG4){var cG4=5000;}if(!cG5){var cG5=200;}var cG2={};var cG3={};var cGM=navigator.appVersion;var cGN=navigator.userAgent;var cGS=cGN.indexOf("Opera")>=0;var cGU=cGN.indexOf("Safari")>=0;var cmT2=-1;var cmT3=-1;var cGC="";var cGD="";var cGE="";var cGF="";var cGG="";var cGH="";var cmSubmitFlag=false;var cmFormC1="submitbuttonreset";var cmFormC2="textpasswordtextarea";var cmFormC3="select-oneselect-multiple";var cGI="";var cGJ="";var cGK="";var cGL="";var chost=null;var cci=null;var _cm_CMRules={};var _cm_isNew=true;if(!cm_PartnerDataClientIDs){var cm_PartnerDataClientIDs="";}var cm_Avid;var cmCookieExpDate;var cm_AvidLoadTimer;var cm_IOEnabled=false;var cm_ATEnabled=false;CI();for(var cmSpecCookieIndex=0;cmSpecCookieIndex<cm_JSFSpecCookieNames.length;cmSpecCookieIndex++){var currSpecCookieName=cm_JSFSpecCookieNames[cmSpecCookieIndex];var currSpecCookieValue=cI(cm_JSFSpecCookieNames[cmSpecCookieIndex]);if(currSpecCookieValue==null)continue;if(currSpecCookieValue.length==0)continue;cmSpecCookieNames=cmSpecCookieNames+(cmSpecCookieNames!=""?"|":"")+escape(currSpecCookieName);cmSpecCookieValues=cmSpecCookieValues+(cmSpecCookieValues!=""?"|":"")+escape(currSpecCookieValue);cmSpecCookiesCount++;}var dt=new Date();var cmYearOffset=0;if(dt.getFullYear)cmYearOffset=dt.getFullYear();else{cmYearOffset=dt.getYear();if(cmYearOffset<1900)cmYearOffset+=1900;}dt.setYear(cmYearOffset+15);cmCookieExpDate=dt.toGMTString();if(cm_UseCookie){var pi=cI("cmRS","pi","");if(pi!="")cmLastPageID=pi;chost=cm_HOST;cm_HOST=cI("cmRS","ho",chost);cci=cm_ClientID;cm_ClientID=cI("cmRS","ci",cci);var cT3=cI("cmRS","t3","");if(cT3!=""){cGA=cT3;}var jsfpdata=cI("cmRS","cjen","");if(jsfpdata!=""){cm_JSFEnabled=true;}var cT1=cI("cmRS","t1","");if(cT1!=""&&(!cGA||cm_ClientTS - cGA<cGR)){cmAddShared("st",cT1);var ul=cI("cmRS","ul","");var rf=cI("cmRS","rf","");var cT2=cI("cmRS","t2","");var cT4=cI("cmRS","t4","");if(cm_TrackTime)cN(cT1,cT2,cT3,cT4,true,pi);var hr=cI("cmRS","hr","");if(hr!=""){var ti=cI("cmRS","lti","");if(cm_ClientTS - ti<cGR){var nm=cI("cmRS","ln","");cM(cT1,ti,nm,hr,true,pi,ul,rf);}}var cV6=cI("cmRS","ac","");var cV7=cI("cmRS","fd","");if((cV6!="")||(cV7!="")){var ti=cI("cmRS","fti","");if(cm_ClientTS - ti<cGR){var cV9=cI("cmRS","fn","");var cV0=cI("cmRS","fu","");cL(cT1,ti,cV9,cV6,cV0,cV7,true,pi,ul,rf);}}var cError=unescape(cI("cmRS","uer",""));CH(cT1,cT3,cError,true,pi);}CC("cmRS");}if(!cGS&&(cF(4)||CD(5))){cmAddNewEvent(window,"load",cY);cmAddNewEvent(window,"unload",cZ);if(cm_DelayHandlerReg.indexOf("L")==-1)window.cX("main");if(cm_DelayHandlerReg.indexOf("F")==-1)cU();}CJ(1);var _cmPartnerUtils={};_cmPartnerUtils.AT_TagQueue=[];_cmPartnerUtils.AT_PartnerCallQueue=[];_cmPartnerUtils.AT_RulesSet=false;_cmPartnerUtils.AT_NRFlagNeeded=false;_cmPartnerUtils.AT_NRFlagSet=false;}function cmLoad(){if(cm_OffsiteImpressionsEnabled){cm_Avid=cI("CMAVID");if(cm_Avid==null){_cmPartnerUtils.loadScript(C8(null)+"//"+cm_AvidHost);cm_AvidLoadTimer=setTimeout("cm_AvidLoadTimedOut=true",2000);}}var rules_HOST=cm_Production_HOST;if(cm_ATEnabled){if(!cI("CMDisabled")&&(cI("CMOptout")?cI("CMOptout").toUpperCase()!="OPT_OUT":true)&&(cI("ID")?cI("ID").toUppercase()!="OPT_OUT":true)&&(cI("CMOptout")?cI("CMOptout").toUpperCase()!="ANONYMOUS":true)){if(typeof(_cm_CMRulesLoaded)=="undefined"){var splitCIds=cm_ClientID.split(";");for(var n=0;n<splitCIds.length;n++){splitCIds[n]=splitCIds[n].split("|")[0];if(cm_PartnerDataClientIDs.indexOf(splitCIds[n])!=-1){if(cI("CorePartnerMode")=="TEST")_cmPartnerUtils.loadScript(C8(null)+'//'+rules_HOST+'/at/rules_'+splitCIds[n]+'test.js');else _cmPartnerUtils.loadScript(C8(null)+'//'+rules_HOST+'/at/rules_'+splitCIds[n]+'.js');}}cG6._cm_CMRulesLoaded=1;}}}}var cI=cI;var cE=cE;function cmStartTagSet(){if(cG8)return;cG8=[];cG8[0]=new _cm();cG8Index=1;}function cmAddShared(nm,val){if(cG8)cG8[0][nm]=val;}function cmSendTagSet(){var request;var cG8_tmp=cG8;while((request=C7(arguments[0]))!=null){c9(request,cG8_tmp[0].ci);}cG8=null;}function _cmCQ(pl,host,qs){this.pl=pl;this.hosts=host.split(",");if(qs)this.qs=qs;this.cM5=CR;}function CR(){var a=arguments;var h=a[0]?a[0]:this.hosts[0];return this.pl+"//"+h+(this.qs?this.qs:"");}function _cG7(){this.cM0={};this.uls={};this.rfs={};this.cTI=[];this.cPE=0;this.normalizeURL=c2;this.getPageID=c1;this.getPluginPageID=cmGetPluginPageID;}function cmGetPluginPageID(cVA){splitClientIDs=cm_ClientID.split(";");finalClientID=cVA;for(var n=0;n<splitClientIDs.length;n++){if(splitClientIDs[n]==cVA){finalClientID=cm_ClientID;break;}}return this.getPageID(finalClientID);}function c1(cVA){var pi=cG7.cM0[cVA];return pi?pi:"";}function CS(cVA){var ul=cG7.uls[cVA];if(!ul)ul=window.location.href;return ul?ul:"";}function CT(cVA){var rf=cG7.rfs[cVA];if(!rf)rf=cG6.referrer;return rf?rf:"";}function CP(href){var h=cGT;if(!h)h=cGT=cG7.normalizeURL(window.location.href,false);var a=href.indexOf("#");if(a>=0&&a<=h.length){var ha=h.indexOf("#");if(ha<0)ha=h.length;if(href.substring(0,a)==h.substring(0,ha))return href.substring(a);}return href;}function c2(url,isHref){if(isHref){url=CP(url);var pfx=window.location.protocol+"//"+window.location.host;if(url.indexOf(pfx)==0)url=url.substring(pfx.length);}return cD(url);}function c4(){for(var b in cmUA)if(cGM.indexOf(b)!=-1)return cmUA[b];return cmDefaultLimit;}function C0(n){if(cG7){if(cG7.cTI&&cG7.cTI[n]){cG7.cTI[n].cmLD=true;if(cG7.cTI[n].ci){cmJSFSetValidFlagValue(cmValidFlag_SessionContinue,false,cG7.cTI[n].ci);cmJSFSetSessionCookies(false,cG7.cTI[n].ci);}}cG7.cPE--;if(cG7.onResponse)cG7.onResponse(n);}window.dontExit=false;}function CN(n){if(cG7){cG7.cPE--;var img=null;if(cG7.cTI&&cG7.cTI[n]){img=cG7.cTI[n];img.cmLD=true;}if(cG7.onError&&(!img||!img.cmTO))cG7.onError(3,img);}}function c6(host,n){if(cG3)cG3[host]=true;C0(n);}function CO(n){if(cG7&&cG7.cTI&&cG7.cTI[n]&&!(cG7.cTI[n].cmLD)){var img=cG7.cTI[n];img.cmTO=img.src;if(cG7.onError)cG7.onError(4,img.cmTO);}}function c8(host){if(!cG3||cG3[host])return true;var dt=new Date();if((dt.getTime()-cG2[host])>cG4)return true;return false;}function CV(host,url,cVBH){if(!cVBH)cVBH=cm_ClientID;if((!cG2[host]||c8(host))&&(cm_OffsiteImpressionsEnabled==false||cm_Avid!=null||cm_AvidLoadTimedOut)){var img=new Image();var i=cG1;cG7.cTI[cG1++]=img;if(!cG2[host]){var dt=new Date();cG2[host]=dt.getTime();img.onload=new Function("if(c6)c6('"+host+"',"+i+");");}else{img.onload=new Function("if(C0)C0("+i+");");}img.onerror=new Function("if(CN)CN("+i+");");if(cm_OffsiteImpressionsEnabled&&(cm_Avid!=null)&&(cm_Avid!="none")){url+="&avid="+cm_Avid;}var limit=c4();if(url.length>limit){url=url.substring(0,limit-6)+"&err=O";}if(cG7.onTagSent)cG7.onTagSent(url,i);img.src=url;img.ci=cVBH;setTimeout('if(CO)CO('+i+');',cm_TimeoutSecs * 1000);}else{setTimeout('if(CV)CV("'+host+'","'+url+'","'+cVBH+'");',cG5);}}function c9(img,ci){if(cI("CMDisabled")||(cI("CMOptout")?cI("CMOptout").toUpperCase()=="OPT_OUT":false)||(cI("ID")?cI("ID").toUpperCase()=="OPT_OUT":false))return;for(var h=0;h<img.hosts.length;h++){var url=img.cM5(img.hosts[h]);cG7.cPE++;CV(img.hosts[h],url,ci);}}function cC(){var result=null;if(!this.ul){if(this.tid=="8"||(this.tid=="9"||this.tid=="10")){this.ul=window.location.protocol+"//"+window.location.hostname;}else{this.ul=window.location.href;}}if(cG8){cG8[cG8Index++]=this;}else{var request=this.getImgSrc(arguments[0],1);c9(request,this.ci);result=request;}return result;}function cmLogError(e){}function C4(src,tgt,compact){if(!compact){if(!src.rf){if(!document.referrer)tgt.rf="";else tgt.rf=document.referrer;}else if(src!=tgt)tgt.rf=src.rf;if(!src.ul||src.ul==""||src.ul=="(none)")tgt.ul=window.location.href;else if(src!=tgt)tgt.ul=src.ul;var ul=cG7.normalizeURL(tgt.ul,false);var rf=cG7.normalizeURL(tgt.rf,false);if(ul!=""){tgt.ul=ul;}if(rf!=""){tgt.rf=rf;}}}function C5(tgt,compact){if(cm_FirstPartyDetect&&!compact){if(cI("cmRS")||cI("TestSess")){tgt.ts="Y";}else{CB("TestSess","Y");tgt.ts=cI("TestSess");}tgt.tp=cI("TestPerm");if(tgt.tp!="Y"){dt.setHours(dt.getHours()+5);CB("TestPerm","Y",dt.toGMTString());tgt.tp=cI("TestPerm");}}}function C6(tag,cV3,skipJSFParams){var qs="";if(tag.tid)qs+="tid="+tag.tid;var isPV=(tag.tid==1||(tag.pc&&tag.pc.charAt(0)=='Y'));if(!tag.lp&&isPV)tag.lp=cmLastPageID;for(var cOb in tag){if(cOb=="qs"||cOb=="tid"||cOb=="topline")continue;if(!tag[cOb]||tag[cOb]==""||tag[cOb].constructor==Function)continue;if(cV3&&cV3[cOb]&&cV3[cOb]==tag[cOb])continue;if(qs!="")qs+="&";qs+=cD(cOb)+"="+cE(cD(tag[cOb]));}if(!tag.rs&&tag.ci){if(tag.pi&&isPV)cG7.cM0[tag.ci]=tag.pi;if(tag.ul)cG7.uls[tag.ci]=tag.ul;if(tag.rf)cG7.rfs[tag.ci]=tag.rf;}if(cV3&&cm_SecureTags.indexOf("|"+tag.tid+"|")!=-1)cV3.protocol="https:";if(cm_JSFEnabled&&!skipJSFParams){cmJSFSetSessionCookies(false,tag.ci);qs+=(qs!=""?"&":"")+cmCore_JSFParamEnabled+"=1";var userIdParamValue=cI(cm_JSFCoreCookieName);if(userIdParamValue){userIdParamValue=userIdParamValue.split("&",2)[0];if(userIdParamValue=="anonymous"||(cI("CMOptout")?cI("CMOptout").toUpperCase()=="ANONYMOUS":false)){userIdParamValue="1000000000000003";}}if(cmJSFPUseUAForUnica()){userIdParamValue=cmJSFPUnicaNoUIDValue();}qs+="&"+cmCore_JSFParamUserID+"="+(userIdParamValue!=null?userIdParamValue:"");qs+="&"+cmCore_JSFParamSessionID+"="+cmJSFGetSessionValue(tag.ci);if(cmSpecCookiesCount>0){qs+="&"+cmCore_JSFParamSpecCookiesCount+"="+cmSpecCookiesCount;qs+="&"+cmCore_JSFParamSpecCookiesNames+"="+cmSpecCookieNames;qs+="&"+cmCore_JSFParamSpecCookiesValues+"="+cmSpecCookieValues;}qs+="&"+cmCore_JSFParamValidFlag+"="+cmJSFGetValidFlagValue(tag.ci);}if(cm_PartnerDataClientIDs&&tag.tid){try{var newTag={};for(var key in tag){var val=tag[key];if(typeof(val)!="function"&&typeof(val)!="undefined")newTag[key]=val;}if(cV3){for(var key in cV3){var val=cV3[key];if(typeof(val)!="function"&&typeof(val)!="undefined")newTag[key]=val;}}newTag.calculateTopLineAndReturnSegments=tag.calculateTopLineAndReturnSegments;if(_cmPartnerUtils.AT_RulesSet){if(_cmPartnerUtils.AT_NRFlagNeeded){if(_cmPartnerUtils.AT_NRFlagSet){_cmPartnerUtils.calculateAndSendATData(newTag);}else{_cmPartnerUtils.AT_TagQueue.push(newTag);}}else{_cmPartnerUtils.calculateAndSendATData(newTag);}}else{_cmPartnerUtils.AT_TagQueue.push(newTag);}}catch(e){}}return qs;}function C8(cV3){var cm_pl=location.protocol;if(cV3&&cV3.protocol)cm_pl=cV3.protocol;if(cm_pl!="http:"&&cm_pl!="https:")cm_pl="http:";return cm_pl;}function c0(){var a=arguments;C4(this,this,a[0]);C5(this,a[0]);var cV3={};var qs=C6(this,cV3);var req=new _cmCQ(C8(cV3),cm_HOST,qs);return a[1]?req:req.cM5();}function C7(){var cV3,first,p,a,pl,lim,len,l,i,tq,img;if(!cG8||cG8.length<2)return null;cV3=cG8[0];first=cG8[1];cV3.ci=first.ci;for(i=1;i<cG8.length;i++){if(cV3.ci.indexOf(cG8[i].ci)==-1){cV3.ci+=";"+cG8[i].ci;}if(cm_SecureTags.indexOf("|"+cG8[i].tid+"|")!=-1)cV3.protocol="https:";}for(i=0;i<cG0.length;i++){p=cG0[i];if(!cV3[p])cV3[p]=first[p];}a=arguments;C4(first,cV3,a[0]);C5(cV3,a[0]);pl=C8(cV3);img=new _cmCQ(pl,cm_HOST);img.qs=C6(cV3);lim=c4();len=0;for(var h=0;h<img.hosts.length;h++){l=pl.length+img.hosts[h].length+img.qs.length;if(l>len)len=l;}for(i=1;i<cG8.length;i++){tq=C6(cG8[i],cV3,true);if(i>1&&len+tq.length+1>lim){for(j=1;j<cG8.length-i+1;j++)cG8[j]=cG8[j+i-1];cG8.length=cG8.length-i+1;break;}len+=tq.length+1;img.qs+="&"+tq;}if(i==cG8.length)cG8=null;return img;}function _cm(){var i,a=arguments;this.ci=cm_ClientID;for(i=0;i<a.length;i++)this[a[i]]=a[++i];this.write=cC;this.getImgSrc=c0;this.writeImg=cC;this.st=cm_ClientTS;this.vn1="4.8.5H";if(cF(5.5)||!cF(0)){var ec=(cm_UseUTF8&&encodeURIComponent)||cGU?"utf-8":cG6.charset;if(!ec)ec=cG6.defaultCharset;if(!ec)ec=cG6.characterSet;this.ec=ec;}this.topline=[];}function cD(s){var z="";s=z+(!s?"":s);return s.split("'").join(z).split("\"").join(z).split("\r").join(z).split("\n").join(z);}function cE(s){var i=0,j;while(s.charAt(i)==" "&&i!=s.length)i++;j=s.length-1;while(s.charAt(j)==" "&&j!=0)j--;s=s.substring(i,j+1);if(cm_UseUTF8&&encodeURIComponent)s=encodeURIComponent(s);else{s=preEscape(s);s=escape(s);var regularExpression=new RegExp("%25u00","g");s=s.replace(regularExpression,"%u00");}s=s.split("+").join("%2B");return s;}function preEscape(str){for(var i=160;i<256;i++){var regularExpression=new RegExp(String.fromCharCode(i),"g");str=str.replace(regularExpression,"%u00"+i.toString(16));}return str;}function cF(ver){var i=cGM.indexOf("MSIE");if(i!=-1)return(parseFloat(cGM.substring(i+5))>=ver);return false;}function CD(ver){return(cGN.indexOf("Gecko")!=-1&&parseInt(cGM)>=ver);}function cI(nm,skey,cV5){var dc=cG6.cookie;var cV4=cJ(nm,dc,";");if(!skey||!cV4){if(!cV4&&cV5!=null){return cV5;}return cV4;}cV4=cJ(skey,cV4,"&");if(!cV4&&cV5!=null){return cV5;}return unescape(cV4);}function CL(){var cookies,dc,nv,i,c=0;dc=cG6.cookie;if(dc){cookies=dc.split(";");c=cookies.length;for(i=0;i<cookies.length;i++){nv=cookies[i].split("=");if(nv.length<2||nv[1]==null||nv[1]==""){c--;}}}return c;}function CB(nm,val,expires,domain){var err,len,v,dc=cG6.cookie;err=null;len=val.length+1;if(!cI(nm)){len+=nm.length;}if(len>4096)err=1;else if(dc){if(CL()>=50)err=2;}if(err){if(cG7.onError)cG7.onError(err,name);return false;}v=nm+"="+val+";path=/";if(domain)v+=";domain="+domain;if(expires)v+=";expires="+expires;cG6.cookie=v;return true;}function cmSetSubCookie(nm,skey,value,expires,domain){var currentCookieVal=cI(nm);var newCookieVal;if(!currentCookieVal){newCookieVal=skey+"="+value;}else{var sep='&';var pfx=skey+"=";var begin=currentCookieVal.indexOf(pfx);if(begin>=0){if(begin>0&&currentCookieVal.charAt(begin - 1)!=sep){begin=currentCookieVal.indexOf(sep+pfx);if(begin>=0){begin++;}}}if(begin>=0){var valueOffset=begin+skey.length+1;var end=currentCookieVal.indexOf(sep,valueOffset);if(end<0){end=currentCookieVal.length;}newCookieVal=currentCookieVal.substring(0,valueOffset)+value+currentCookieVal.substring(end);}else{newCookieVal=currentCookieVal+sep+skey+"="+value;}}CB(nm,newCookieVal,expires,domain);}function CC(nm,domain){var v=cI(nm);if(v!=null){var dt=new Date();dt.setYear(1973);var v=nm+"=;path=/;expires="+dt.toGMTString();if(domain)v+=";domain="+domain;cG6.cookie=v;}return v;}function cJ(nm,src,sep){var pfx,s,begin,end,obj=null;pfx=nm+"=";s=sep+' ';begin=src.indexOf(s+pfx);if(begin==-1){s=sep;begin=src.indexOf(s+pfx);}if(begin==-1){begin=src.indexOf(pfx);if(begin!=0){return null;}}else{begin+=s.length;}end=src.indexOf(s,begin);if(end==-1){end=src.length;}return src.substring(begin+pfx.length,end);}function cK(elt,type,handle,fName,f){if(handle){var event=handle.toString();var tempFName=fName.substring(0,fName.indexOf("("));if(event.indexOf(tempFName)==-1){if(cGU&&event.indexOf("function "+"(")==0){if(type=="onload"){fName=event.substring(event.indexOf("{"),event.length)+";"+fName+";";}else{fName=fName+";"+event.substring(event.indexOf("{"),event.length);}}else{elt["_c_"+type]=handle;if(type=="onload"){fName="if(!e)var e=null;var ret=this._c_"+type+"("+(cF(5)?"":"e")+");"+fName+";return ret;"}else{fName="if(!e)var e=null;var tempReturn=this._c_"+type+"("+(cF(5)?"":"e")+");"+fName+";return tempReturn";}}var newfunc=new Function("e",fName);return newfunc;}else{return handle;}}else{return f;}}function CG(e){var e;if(cF(4)){if(window.event){e=window.event.srcElement;}else{return null;}}else if(e){if(CD(5)){e=e.currentTarget;}else{e=e.target;}}return e;}function CU(cm,cVBH,pi,dest,ref){var ul,rf;cm.pi=pi?pi:c1(cVBH);if(cGQ){if(dest||ref){cm.ul=dest?dest:"";cm.rf=ref?ref:"";}else{ul=CS(cVBH);rf=CT(cVBH);if(cm.pi==""||ul.indexOf("cm_")>0||(rf!=""&&rf.indexOf(window.location.protocol+"//"+window.location.host)!=0)){cm.ul=ul;cm.rf=rf;}}}}function cL(t1,t3,fname,cVB,url,field,resent,pi,dest,ref){var cm=new _cm("tid","10");CU(cm,cm.ci,pi,dest,ref);cm.st=t1;cm.ti=t3;cm.fo=fname;cm.ac=cVB;cm.hr=url;cm.fi=field;if(resent)cm.rs="Y";cm.write(1);}function cM(t1,ti,name,href,resent,pi,dest,ref){var cm=new _cm("tid","8");CU(cm,cm.ci,pi,dest,ref);cm.st=t1;cm.ti=ti;cm.nm=name;cm.hr=href;var cm_crIndex=href.indexOf("cm_cr=");var cm_meIndex=href.indexOf("cm_me=");if(cm_crIndex>-1){var tempIndex=href.indexOf("&",cm_crIndex);if(tempIndex==-1){cm.cm_cr=href.substring(cm_crIndex+6);}else{cm.cm_cr=href.substring(cm_crIndex+6,tempIndex);}}if(cm_meIndex>-1){var tempIndex=href.indexOf("&",cm_meIndex);if(tempIndex==-1){cm.cm_me=href.substring(cm_meIndex+6);}else{cm.cm_me=href.substring(cm_meIndex+6,tempIndex);}}if(resent)cm.rs="Y";cm.write(1);}function cN(t1,t2,cx,t4,resent,pi){var cm=new _cm("tid","11");cm.pi=pi?pi:c1(cm.ci);cm.st=t1;cm.lc=t2;cm.lx=t4;cm.cx=cx;if(resent)cm.rs="Y";cm.write(1);}function CM(href){var n,len,a,q;if((n=href.indexOf("?"))==-1)n=href.lastIndexOf("/");if(n!=-1){len=href.indexOf("#",n);if(len==-1)len=href.length;while(n!=-1&&n<len){n=href.indexOf("cm_",n);if(n!=-1){a=href.indexOf("&",n);if(a==-1)a=len;q=href.indexOf("=",n);if(q!=-1&&q<a)this[href.substring(n,q)]=href.substring(q+1,a);n=a;}}}}function CK(href,trackSP,trackRE,trackCR,trackME){var cm,link,sp,re,cr,me;if((trackSP||trackRE||trackCR||trackME)&&href){cm=new _cm("tid","9");link=new CM(CP(href));if(trackSP){sp=cm.cm_sp_o=link.cm_sp_o;if(!sp)sp=cm.cm_sp=link.cm_sp;}if(trackRE){re=cm.cm_re_o=link.cm_re_o;if(!re)re=cm.cm_re=link.cm_re;}if(trackCR){if(href.indexOf("#")==-1){cr=cm.cm_cr=link.cm_cr;}}if(trackME){me=cm.cm_me=link.cm_me;}if(sp||re||cr||me){cm.pi=c1(cm.ci);cm.st=cm_ClientTS;if(typeof cmCheckIgnoreImpression=='function'){if(cmCheckIgnoreImpression(sp,re,cr,me)){cm.write(1);}}else{cm.write(1);}}}}function CH(t1,ti,msg,resent,pi){if(msg!=cGL){var cm=new _cm("tid","12");cm.pi=pi?pi:c1(cm.ci);cm.st=t1;cm.ti=ti;if(resent)cm.rs="Y";cm.er=msg;cm.write(1);cGL=cm_FormError;}}function cmFormBlurRecord(e){if(e.cmFormEleMemValue!=cmFormElementValue(e)&&e.cmFormEleMemValue!=null){cmFormReportInteraction(e);}e.form.cmEleValue=-1;}function cmFormElementOnclickEvent(){try{var q;var cFE=cmFormElementValue(this);if((cmFormC1.indexOf(this.type)>=0)||(this.cmFormEleMemValue!=cFE)){if(this.type=="radio"){for(q=0;q<this.form.elements.length;q++){if(this.form.elements[q].cM2==this.cM2){this.form.elements[q].cmFormEleMemValue=null;}}}this.cmFormEleMemValue=cFE;cmFormReportInteraction(this);}}catch(e){cmLogError(e);}}function cmFormElementOnfocusEvent(){try{this.form.cmEleValue=this.cM2;this.cmFormEleMemValue=cmFormElementValue(this);}catch(e){cmLogError(e);}}function cmFormElementOnblurEvent(){try{cmFormBlurRecord(this);}catch(e){cmLogError(e);}}function cmFormElementOnchangeEvent(){try{cmFormReportInteraction(this);}catch(e){cmLogError(e);}}function cmFormElementValue(e){var x;if(e.type=="checkbox")return e.checked;else if((cmFormC3.indexOf(e.type)>=0)&&e.options){var sel_val="";for(x=0;x<e.options.length;x++){if(e.options[x].selected==true)sel_val=sel_val+e.options[x].index;}return sel_val;}else if(cmFormC2.indexOf(e.type)>=0||e.type=="file"||e.type=="radio"){return e.value;}else{return null;}}function cO(cVC,cVB){var dt,url,x,cFa="";var cF=null;cVB=cVC+":"+cVB;if(cVC!=-1){if(cG6.forms[cVC]){cF=cG6.forms[cVC];var cFa=cF.attributes;url=cF.action?cF.action:cFa.action.nodeValue?cFa.action.nodeValue:cFa.getNamedItem('action').value?cFa.getNamedItem('action').value:"";}}cGD=cG6.cmTagCtl.normalizeFORM(cGD);var pgID=c1(cm_ClientID);if(cm_FormPageID&&pgID!=""){var frmAr=cGD.split(";");cGD="";for(x=0;x<frmAr.length-1;x++){cGD+=pgID.split(":").join("").split(";").join("")+"_"+frmAr[x]+";";}cm_FormPageID=false;}if(cV(url)&&(cVC!="-1"||(cVC=="-1"&&cmSubmitFlag==false))){dt=new Date();cGH=dt.getTime();cGF=cVB;cGE=cG7.normalizeURL(url,true);cL(cm_ClientTS,cGH,cGD,cGF,cGE,cGC,false);cGG=cGC;cGC="";if((cF)&&(typeof cmCustomFormSubmitHandler=='function')){cmCustomFormSubmitHandler(cF,cVB);}}else{cGF="";}}function cmFormOnresetEvent(){var x;try{cO(this.cM1,"R");}catch(e){cmLogError(e);}try{for(x=0;x<cG6.forms[this.cM1].elements.length;x++){cG6.forms[this.cM1].elements[x].cmFormEleMemValue=false;}}catch(e){cmLogError(e);}try{if(this.cQ){return this.cQ();}}catch(e){cmLogError(e);}}function cmFormOnsubmitEvent(e2){try{if(this.cmEleValue>-1){cmFormBlurRecord(this.elements[this.cmEleValue]);}}catch(e){cmLogError(e);}try{if(this.cM1>=0&&this.cmSubmitIndex==false){cmSubmitFlag=true;this.cmSubmitIndex=true;cO(this?this.cM1:-1,"S");CE();}}catch(e){cmLogError(e);}cmJSFPMigrateLink(this,"action");}function cmFormReportInteraction(e){var cmElementName=cG6.cmTagCtl.normalizeFIELDS(e.name?e.name:e.id?e.id:"");var cmTempFieldSeq=cGC+e.form.cM1+":"+e.cM2+":"+cmElementName.split(":").join("|").split(";").join("|")+";";if(cmTempFieldSeq.length<1000){cGC=cmTempFieldSeq;}}function cmFormSubmit(){cmJSFPMigrateLink(this,"action");try{if(this.cmEleValue>-1){cmFormBlurRecord(this.elements[this.cmEleValue]);}}catch(e){cmLogError(e);}try{if(this.cM1>=0&&this.cmSubmitIndex==false){cmSubmitFlag=true;this.cmSubmitIndex=true;cO(this?this.cM1:-1,"S");CE();}}catch(e){cmLogError(e);}try{this.cmSubmit();}catch(e){cmLogError(e);}}cG6.cmTagCtl.normalizeFORM=function(form){return form;};cG6.cmTagCtl.normalizeFIELDS=function(field){return field;};function cU(){if(cm_SkipHandlerReg.indexOf("F")==-1){var i,form,cV9,j,e,rdname,ei;for(i=0;i<cG6.forms.length;i++){form=cG6.forms[i];ei=0;if(!form.cM1&&!form.cmEleValue&&!form.cmSubmitIndex){form.cM1=i;form.cmEleValue=-1;form.cmSubmitIndex=false;form.radiogroup={"key":"value"};try{if(cF(5)&&!cF(8)){var cm_FA=form.attributes;cV9=cm_FA.name?cm_FA.name.nodeValue:cm_FA.id?cm_FA.id.nodeValue:"UNDEFINED";}else if(form.attributes.getNamedItem){cV9=form.attributes.getNamedItem('name').value;}else{cV9=form.name;}}catch(e){cV9="UNDEFINED";cmLogError(e);}cGD+=cV9+":"+i+";";try{if(form.submit!==cmFormSubmit){form.cmSubmit=form.submit;form.submit=cmFormSubmit;}}catch(e){cmLogError(e);}cmAddNewEvent(form,"submit",cmFormOnsubmitEvent);cmAddNewEvent(form,"reset",cmFormOnresetEvent);for(j=0;j<form.elements.length;j++){e=form.elements[j];if(!e.cM1&&!e.cM2&&!e.cmFormEleMemValue){e.cM1=i;e.cM2=ei;e.cmFormEleMemValue=null;ei++;if(e.type=="radio"){rdname=e.name?e.name:e.id?e.id:"";if(rdname!=""){if(form.radiogroup[rdname]){e.cM2=form.radiogroup[rdname];}else{form.radiogroup[rdname]=e.cM2;}}}if(cmFormC1.indexOf(e.type)>=0||e.type=="checkbox"||e.type=="radio"){try{cmAddNewEvent(e,"click",cmFormElementOnclickEvent);}catch(e){cmLogError(e);}}if(cmFormC2.indexOf(e.type)>=0||cmFormC3.indexOf(e.type)>=0){try{cmAddNewEvent(e,"focus",cmFormElementOnfocusEvent);cmAddNewEvent(e,"blur",cmFormElementOnblurEvent);}catch(e){cmLogError(e);}}if(e.type=="file"){try{cmAddNewEvent(e,"change",cmFormElementOnchangeEvent);}catch(e){cmLogError(e);}}}}}}}}function cV(path){if(cm_TrackLink==true||cm_TrackLink=="A")return true;else{if(cm_TrackLink=="E"&&path.indexOf("/")!=0)return true;var de;if((de=cm_DownloadExtensions)!=null){var p=path.lastIndexOf(".");if(p!=-1){var ext=path.substring(p);for(var e=0;e<de.length;e++){if(ext==de[e])return true;}}}return false;}}function cW(e){CI();var e=CG(e);if(e)C9(e);CA(1);CJ(1);CE();}function C9(e){cGI="";cGJ="";cGK="";var type=e.tagName.toUpperCase();if(type=="AREA"){cGJ=e.href?e.href:"";var p=e.parentElement?e.parentElement:e.parentNode;if(p!=null)cGI=p.name?p.name:"";}else{while(type!="A"&&type!="HTML"){if(!e.parentElement){if(e.parentNode){e=e.parentNode;}else{break;}}else{e=e.parentElement;}if(e){type=e.tagName.toUpperCase();}}if(type=="A"){cGJ=e.href?e.href:"";cGI=e.name?e.name:"";}}if(e.getAttribute){var man_cm_re=e.getAttribute("manual_cm_re");if(man_cm_re){cGJ=cGJ.split("#");cGJ[0]=cGJ[0]+((cGJ[0].indexOf("?")>-1)?"&":"?")+"cm_re="+man_cm_re;cGJ=cGJ.join("#");}var man_cm_sp=e.getAttribute("manual_cm_sp");if(man_cm_sp){cGJ=cGJ.split("#");cGJ[0]=cGJ[0]+((cGJ[0].indexOf("?")>-1)?"&":"?")+"cm_sp="+man_cm_sp;cGJ=cGJ.join("#");}}cGJ=cG7.normalizeURL(cGJ,true);if(cV(cGJ)==true){var dt=new Date();cGK=dt.getTime();if(typeof cmCustomLinkClickHandler=='function'){cmCustomLinkClickHandler(e);}cM(cm_ClientTS,cGK,cGI,cGJ,false);}else{cGJ="";}cmJSFPMigrateLink(e,"href");}function cmAddNewEvent(obj,type,fn){if(obj.attachEvent&&(obj['e'+type+fn]===undefined)){obj['e'+type+fn]=fn;obj[type+fn]=function(){obj['e'+type+fn](window.event);};obj.attachEvent('on'+type,obj[type+fn]);}else if(obj.addEventListener){obj.addEventListener(type,fn,false);}}function cX(phase){CI();var i,lnk,imp,trackSP,trackRE,trackCR,trackME;imp=cm_TrackImpressions;trackSP=(imp.indexOf("S")!=-1);trackRE=(imp.indexOf("R")!=-1);trackCR=(imp.indexOf("C")!=-1);trackME=(imp.indexOf("C")!=-1);for(i=0;i<cG6.links.length;i++){lnk=cG6.links[i];if(cm_SkipHandlerReg.indexOf("L")==-1){cmAddNewEvent(lnk,"click",cW);}if(phase=="onload"){var tempLinkHref=lnk.href;if(lnk.getAttribute("manual_cm_re")){tempLinkHref=tempLinkHref.split("#");tempLinkHref[0]=tempLinkHref[0]+((tempLinkHref[0].indexOf("?")>-1)?"&":"?")+"cm_re="+lnk.getAttribute("manual_cm_re");tempLinkHref=tempLinkHref.join("#");}if(lnk.getAttribute("manual_cm_sp")){tempLinkHref=tempLinkHref.split("#");tempLinkHref[0]=tempLinkHref[0]+((tempLinkHref[0].indexOf("?")>-1)?"&":"?")+"cm_sp="+lnk.getAttribute("manual_cm_sp");tempLinkHref=tempLinkHref.join("#");}if(!lnk.cmImpressionSent){CK(tempLinkHref,trackSP,trackRE,trackCR,trackME);lnk.cmImpressionSent=1;}}}CJ(1);}function cY(e){var dt=new Date();cmT2=dt.getTime();CH(cm_ClientTS,cmT2,cm_FormError,false);if(!cGS&&(cF(4)||CD(5))){window.cX("onload");cU();}cGB=null;}function cZ(e){cG3=null;CI();delay=false;for(var x=0;x<document.forms.length;x++){try{if(cG6.forms[x].cmEleValue>-1){cmFormBlurRecord(document.forms[x].elements[document.forms[x].cmEleValue]);}}catch(e){cmLogError(e);}try{if(cGC!=""){delay=true;cO(-1,"U");}}catch(e){cmLogError(e);}}CA(0);CH(cm_ClientTS,cmT3,cm_FormError,false);CJ(1);if(delay){window.dontExit=true;var d1=new Date();var d2=new Date();for(;window.dontExit&&(d2-d1<1000);){d2=new Date();}}CE();if(cm_UseCookie&&cG7.cPE==0){var pi=escape(c1(cm_ClientID));CB("cmRS","t3="+cmT3+"&pi="+pi);}if(cG7.onUnload)cG7.onUnload();if(cF(5)&&!cF(5.5)&&window.parent!=window)cG7.cTI=null;else{if(!cGU){for(var i=0;i<cG7.cTI.length;i++){cG7.cTI[i].onload=null;cG7.cTI[i].onerror=null;}}}}function CA(force){var dt=new Date();var cx=dt.getTime();if(cm_TrackTime&&(cmT3==-1||force==1||(cx-cmT3)>10000)){cN(cm_ClientTS,cmT2,cx,cGA,false);}cmT3=cx;}function CE(){if(cm_UseCookie){var cVF,cVG,pg,cVD,cVE="";cVF=cGA?"&t4="+cGA:"";cVG=(cGJ!="")?"&lti="+cGK+"&ln="+escape(cGI)+"&hr="+escape(cGJ):"";pg={};CU(pg,cm_ClientID);var jsfpdata="";if(cm_JSFEnabled){jsfpdata="&cjen=1";}cVD="&t1="+cm_ClientTS+"&t2="+cmT2+"&t3="+cmT3+cVF+cVG+"&fti="+cGH+"&fn="+escape(cGD)+"&ac="+cGF+"&fd="+escape(cGG)+"&uer="+escape(cm_FormError)+"&fu="+escape(cGE)+"&pi="+escape(pg.pi)+"&ho="+escape(cm_HOST)+"&ci="+escape(cm_ClientID);if(pg.ul&&pg.rf&&pg.ul.length+pg.rf.length<cGO)cVE="&ul="+escape(pg.ul)+"&rf="+escape(pg.rf);if(!CB("cmRS",cVD+cVE+jsfpdata))if(!CB("cmRS",cVD+jsfpdata))CB("cmRS","t3="+cmT3+"&pi="+escape(pg.pi)+jsfpdata);}}function cmSetAvid(id){clearTimeout(cm_AvidLoadTimer);if(id){cm_Avid=id;}else{cm_Avid="none";}CB("CMAVID",cm_Avid);cm_AvidLoadTimedOut=false;}function cmJSFConvertSAtoCM(value){var len=value.length;var lenSA=22;var lenCM=23;if(len<19)return null;if(value.charAt(0)!="U"&&value.charAt(0)!="u")return null;if(len<lenSA){value=value+value.substring(len -(lenSA - len),len);}var result="99";result=result+value.substring(1,lenCM - 1);return result;}function cmJSFSetSessionCookies(reset,cVBHs){if(!cm_JSFEnabled)return;var splitClientIDs=cVBHs.split(";");for(var n=0;n<splitClientIDs.length;n++){cmJSFSetSingleSessionCookie(reset,splitClientIDs[n]);}}function debugReadCookie(name){var nameEQ=name+"=";var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==' ')c=c.substring(1,c.length);if(c.indexOf(nameEQ)==0)return c.substring(nameEQ.length,c.length);}return null;}function cmJSFSetSingleSessionCookie(reset,cVBH,noRecurse){if(!cm_JSFEnabled)return;if(cI("CMDisabled")||(cI("CMOptout")?cI("CMOptout").toUpperCase()=="OPT_OUT":false)||(cI("ID")?cI("ID").toUpperCase()=="OPT_OUT":false))return;var fpCookieVal=cI(cm_JSFCoreCookieName);if(fpCookieVal==null){if(!cmJSFDoMigrateCookies()){fpCookieVal=cmJSFCreateUserId();if(cm_JSFTrackClients){fpCookieVal+="&ci="+cVBH;}CB(cm_JSFCoreCookieName,fpCookieVal,cmCookieExpDate,cm_JSFPCookieDomain);}if(!noRecurse){cmJSFSetSingleSessionCookie(true,cVBH,true);}cmJSFSetValidFlagSingleValue(cmValidFlag_NewSession,false,cVBH);cmJSFSetValidFlagSingleValue(cmValidFlag_NewVisitor,true,cVBH);return;}if(cm_JSFTrackClients){var knownClientIds=cJ("ci",fpCookieVal,"&");knownClientIds=knownClientIds&&unescape(knownClientIds);if(knownClientIds){knownClientIds=knownClientIds.split(",").join("_");}if(knownClientIds&&knownClientIds.indexOf(cVBH)<0){cmSetSubCookie(cm_JSFCoreCookieName,"ci",knownClientIds+"_"+cVBH,cmCookieExpDate,cm_JSFPCookieDomain);knownClientIds=cJ("ci",fpCookieVal,"&");knownClientIds=knownClientIds&&unescape(knownClientIds);if(knownClientIds.indexOf(cVBH)>=0){if(!noRecurse){cmJSFSetSingleSessionCookie(true,cVBH,true);}cmJSFSetValidFlagSingleValue(cmValidFlag_NewSession,false,cVBH);cmJSFSetValidFlagSingleValue(cmValidFlag_NewVisitor,true,cVBH);return;}}}var sessionCookieExists=(cmJSFGetSessionLoginCookieValue(cVBH)!=null);if(!sessionCookieExists){if(cmJSFCombineSessionCookies(cVBH)){sessionCookieExists=(cmJSFGetSessionLoginCookieValue(cVBH)!=null);}}if(!sessionCookieExists&&!reset){if(!noRecurse){cmJSFSetSingleSessionCookie(true,cVBH,true);}cmJSFSetValidFlagSingleValue(cmValidFlag_NewSession,true,cVBH);return;}var dt=new Date();var cmSessionTime=dt.getTime();var cmSessionExpTime=cmSessionTime+cm_JSFSessionTimeout*1000;var isSessionExpired=cmJSFIsSessionExpired(cmJSFGetSessionExpireCookieValue(cVBH));if((reset!=null&&reset==true)||isSessionExpired){var cmTimeoutStr=cmSessionTime.toString();if(cmTimeoutStr.length<10){while(cmTimeoutStr.length<10)cmTimeoutStr="0"+cmTimeoutStr;}else cmTimeoutStr=cmTimeoutStr.substring(0,10);cmJSFSetSessionLoginCookieValue(cVBH,cmTimeoutStr);if(isSessionExpired)cmJSFSetValidFlagSingleValue(cmValidFlag_SessionReset,true,cVBH);else cmJSFSetValidFlagSingleValue(cmValidFlag_NewSession,true,cVBH);if(cm_JSFSessionType=="T")cmJSFSetSessionExpiresCookieValue(cVBH,cmSessionExpTime.toString());}if(cm_JSFSessionType=="I")cmJSFSetSessionExpiresCookieValue(cVBH,cmSessionExpTime.toString());}function cmJSFIsSessionExpired(cookieExpValue){if(cookieExpValue==null)return false;var dt=new Date();if(dt.getTime()>cookieExpValue)return true;else return false;}function cmJSFCreateUserId(){if(cmJSFPUseUAForUnica()){return cmJSFPUnicaNoUIDValue();}var currDate=new Date();var rand1=Math.random();if(rand1==0)rand1=Math.random();var rand2=Math.random();if(rand2==0)rand2=Math.random();var userId=rand1.toString().substring(2,4)+rand2.toString().substring(2,12)+currDate.getTime().toString();var len=userId.length;var lenCM=23;if(len<lenCM){userId=userId+userId.substring(len -(lenCM - len),len);}if(len>lenCM){userId=userId.substring(0,lenCM);}return userId;}function cmJSFSetValidFlagValue(value,append,cVBHs){if(!cm_JSFEnabled)return;var splitClientIDs=cVBHs.split(";");for(var n=0;n<splitClientIDs.length;n++){cmJSFSetValidFlagSingleValue(value,append,splitClientIDs[n]);}}function cmJSFSetValidFlagSingleValue(value,append,cVBH){var validFlag=null;var validFlagValueStr=cmJSFGetSessionValidFlagCookieValue(cVBH);if(validFlagValueStr){var validFlagValue=parseInt(validFlagValueStr);if(!isNaN(validFlagValue))validFlag=validFlagValue;}if(validFlag==null)validFlag=cmValidFlag_SessionContinue;if(append){if(value==cmValidFlag_NewSession)validFlag &=~cmValidFlag_SessionReset;if(value==cmValidFlag_SessionReset)validFlag &=~cmValidFlag_NewSession;validFlag |=value;}else{validFlag=value;}validFlag |=cmValidFlag_SessionContinue;cmJSFSetSessionValidFlagCookieValue(cVBH,validFlag);}function cmJSFCreateCombinedSessionCookieName(cVBH){return cVBH+"_clogin";}function cmJSFCombineSessionCookies(cVBH){var loginValue=cI(cVBH+"_login");var expiresValue=cI(cVBH+"_expires");var validFlagValue=cI(cVBH+"_valid");if(loginValue!=null&&expiresValue!=null & validFlagValue!=null){var combinedCookieStr="l="+loginValue+"&e="+expiresValue+"&v="+validFlagValue;CB(cmJSFCreateCombinedSessionCookieName(cVBH),combinedCookieStr,null,cm_JSFPCookieDomain);CC(cVBH+"_login",cm_JSFPCookieDomain);CC(cVBH+"_expires",cm_JSFPCookieDomain);CC(cVBH+"_valid",cm_JSFPCookieDomain);return true;}return false;}function cmJSFSetSessionLoginCookieValue(cVBH,value){cmSetSubCookie(cmJSFCreateCombinedSessionCookieName(cVBH),"l",value,null,cm_JSFPCookieDomain);}function cmJSFSetSessionExpiresCookieValue(cVBH,value){cmSetSubCookie(cmJSFCreateCombinedSessionCookieName(cVBH),"e",value,null,cm_JSFPCookieDomain);}function cmJSFSetSessionValidFlagCookieValue(cVBH,value){cmSetSubCookie(cmJSFCreateCombinedSessionCookieName(cVBH),"v",value,null,cm_JSFPCookieDomain);}function cmJSFGetSessionLoginCookieValue(cVBH){return cI(cmJSFCreateCombinedSessionCookieName(cVBH),"l");}function cmJSFGetSessionExpireCookieValue(cVBH){return cI(cmJSFCreateCombinedSessionCookieName(cVBH),"e");}function cmJSFGetSessionValidFlagCookieValue(cVBH){return cI(cmJSFCreateCombinedSessionCookieName(cVBH),"v");}function cmJSFGetSessionValue(cVBHs){var value="";var delimiter="";var splitClientIDs=cVBHs.split(";");for(var n=0;n<splitClientIDs.length;n++){var cVBH=splitClientIDs[n];if(cVBH=="")continue;var currValue=cmJSFGetSessionLoginCookieValue(cVBH);value+=delimiter+(currValue!=null?currValue:"");if(delimiter=="")delimiter="|";}return value;}function cmJSFGetValidFlagValue(cVBHs){var value="";var delimiter="";var splitClientIDs=cVBHs.split(";");for(var n=0;n<splitClientIDs.length;n++){var cVBH=splitClientIDs[n];if(cVBH=="")continue;var currValue=cmJSFGetSessionValidFlagCookieValue(cVBH);value+=delimiter+(currValue!=null?currValue:"");if(delimiter=="")delimiter="|";}return value;}function cmJSFDoMigrateCookies(){if(cm_JSFMigrationEnabled==cmMigrationFrom1p_SA){if(cI(cm_JSFCoreCookieName)==null){var cmSACookieValue=cI(cmSACookieName);if(cmSACookieValue){cmSACookieValue=cmJSFConvertSAtoCM(cmSACookieValue);if(cmSACookieValue!=null){CB(cm_JSFCoreCookieName,cmSACookieValue,cmCookieExpDate,cm_JSFPCookieDomain);return true;}}}}return false;}_cm.prototype.addTP=function(){var tp=new cmTP(new cmApp());for(var o in tp){if(tp[o]==null||tp[o]==""||tp[o].toString().indexOf("function ")==0)continue;this[o]=cE(cD(tp[o]));}return this;};function cmApp(){var n=navigator,b=n.appName,c=this;if(b=="Netscape"){c.b="ns"}else if(b=="Microsoft Internet Explorer"){c.b="ie"}else{c.b=b}c.v=parseInt(n.appVersion);}function cmTP(c){var n=navigator,w=window.screen;this.jv=cmJv;if(c.b=="ns"&&c.v>=3)for(var i=0;i<n.plugins.length;i++)eval('this.np'+i+'=n.plugins['+i+'].name');if(c.v>3){if(c.v>=4&&(c.b=="ns"||c.b=="ie")){this.je=(n.javaEnabled()==true)?"y":"n";}if(c.b=="ie"){this.ce=n.cookieEnabled;this.cp=n.cpuClass;}this.sw=w.width;this.sh=w.height;this.pd=w.colorDepth;if(this.pd==0){this.pd=w.pixelDepth;}var fs=w.fontSmoothingEnabled;if(fs){this.fs=fs?"y":"n";}}var tz=new Date();if(tz.getTimezoneOffset()==0){this.tz="0";}else{this.tz=tz.getTimezoneOffset()/60;}}function cmJSFPUseUAForUnica(){var u="undefined";return((typeof(_cmAdapter)!=u)&&((typeof(NTPT_SET_IDCOOKIE)==u)||(NTPT_SET_IDCOOKIE===false)));}function cmJSFPUnicaNoUIDValue(){return "unca_no_id000000000000";}function cmJSFPMigrateCookies(visitorID,sessionIDList,otherCookieList){if(visitorID&&sessionIDList&&cm_JSFEnabled&&cm_JSFPCookieMigrate){var tempVisitor=cI(cm_JSFCoreCookieName);if(!tempVisitor||cm_JSFPForceMigrateCookies){CB(cm_JSFCoreCookieName,visitorID+(cm_JSFTrackClients?"&ci="+cm_ClientID.split(";").join(","):""),cmCookieExpDate,cm_JSFPCookieDomain);var dt=new Date();var cmSessionExpTime=(dt.getTime()+cm_JSFSessionTimeout*1000).toString();var cVAArray=cm_ClientID.split(";");for(var i=0;i<cVAArray.length;++i){if(sessionIDList[cVAArray[i]]!==undefined){cmJSFSetSessionLoginCookieValue(cVAArray[i],sessionIDList[cVAArray[i]]);cmJSFSetSessionExpiresCookieValue(cVAArray[i],cmSessionExpTime);cmJSFSetSessionValidFlagCookieValue(cVAArray[i],"1");}}}}if(cm_JSFPCookieMigrate&&cm_JSFPMigrationOtherCookies!==null){var cookieList=cm_JSFPMigrationOtherCookies.split(",");for(var j=0;j<cookieList.length;++j){if(otherCookieList[cookieList[j]]!==undefined){var tempExpires=cm_JSFPMigrationOtherCookiesExpireTimes[cookieList[j]];if(tempExpires){var dt=new Date();dt.setTime(dt.getTime()+parseInt(tempExpires));dt=dt.toGMTString();}else{var dt=null;}CB(cookieList[j],otherCookieList[cookieList[j]],dt,cm_JSFPCookieDomain);}}}}function cmJSFPMigrateLink(e,type){if(cm_JSFPCookieMigrate){var pageDomain=cm_JSFPCookieDomain;var linkDomainRE=/:\/\/([a-z0-9_\-\.]+)/i;var linkDomain=linkDomainRE.exec(e[type]);if(linkDomain){linkDomain=linkDomain[1];}if(linkDomain&&((linkDomain.indexOf(pageDomain)===-1)&&(e[type].toLowerCase().indexOf("javascript")!==0)&&((cm_JSFPMigrationDomainWhitelist!==null&&cmTextMatchList(linkDomain.toLowerCase(),cm_JSFPMigrationDomainWhitelist.split(",")))||(cm_JSFPMigrationDomainBlacklist!==null&&!(cmTextMatchList(linkDomain.toLowerCase(),cm_JSFPMigrationDomainBlacklist.split(","))))))||(cm_JSFPMigrationPathWhitelist!==null&&cmTextMatchList(e[type].toLowerCase(),cm_JSFPMigrationPathWhitelist.split(",")))){if(cm_JSFEnabled){var tempVisitorID=cI(cm_JSFCoreCookieName);if(tempVisitorID){tempVisitorID=tempVisitorID.split("&",2)[0];}var tempClientIDList=cm_ClientID.split(";");var tempSessionParameters="";for(var i=0;i<tempClientIDList.length;++i){tempSessionParameters+="&"+cm_JSFPCookieMigrateSessionID+"_"+tempClientIDList[i]+"="+cmJSFGetSessionLoginCookieValue(tempClientIDList[i]);}e[type]+=(e[type].indexOf("?")>-1?"&":"?")+cm_JSFPCookieMigrateVisitorID+"="+tempVisitorID+tempSessionParameters;}if(cm_JSFPMigrationOtherCookies!==null){var cookieList=cm_JSFPMigrationOtherCookies.split(",");var otherCookieParameters="";for(var j=0;j<cookieList.length;++j){var tempCookie=cI(cookieList[j]);if(tempCookie){otherCookieParameters+="&cm_mc_"+cookieList[j]+"="+tempCookie;}}otherCookieParameters=(e[type].indexOf("?")>-1?"&":"?")+otherCookieParameters.substring(1);e[type]+=otherCookieParameters;}}}}function cmTextMatchList(input,matchArray){for(var i=0;i<matchArray.length;++i){if(input.indexOf(matchArray[i])>-1){return true;}}return false;}/**** AdTarget additions start here ******//** new funcion attached to _cm **/_cm.prototype.calculateTopLineAndReturnSegments=function cmCalculateTopLineAndReturnSegments(){var segmentsToSend=[];var cmCtCookieVals=_cmPartnerUtils.getContactCookieValues();var newCmCtCookieVals=new Ctck();var referrerURL="";if(document.referrer)referrerURL=document.referrer;var destinationURL="";if(window.location.href)destinationURL=window.location.href;var rulesPresent=false;for(var k in _cm_CMRules){var cmRule=_cm_CMRules[k];if(typeof(cmRule)!="object"||typeof(cmRule.cid)=="undefined")continue;if(!this.topline[cmRule.cid])this.topline[cmRule.cid]={};this.topline[cmRule.cid].pgct=cmCtCookieVals.getPgCt(cmRule.cid);this.topline[cmRule.cid].osshct=cmCtCookieVals.getOsshCt(cmRule.cid);this.topline[cmRule.cid].orders=cmCtCookieVals.getOrders(cmRule.cid);this.topline[cmRule.cid].sales=cmCtCookieVals.getSales(cmRule.cid);this.topline[cmRule.cid].itcartct=cmCtCookieVals.getItCartCt(cmRule.cid);this.topline[cmRule.cid].itpurct=cmCtCookieVals.getItPurCt(cmRule.cid);this.topline[cmRule.cid].pvct=cmCtCookieVals.getPvCt(cmRule.cid);this.topline[cmRule.cid].evpts=cmCtCookieVals.getEvPts(cmRule.cid);this.topline[cmRule.cid].evcomct=cmCtCookieVals.getEvComCt(cmRule.cid);this.topline[cmRule.cid].evinict=cmCtCookieVals.getEvIniCt(cmRule.cid);this.topline[cmRule.cid].elvct=cmCtCookieVals.getElvCt(cmRule.cid);var isFirstPage=true;if(cmCtCookieVals.getFpFlag(cmRule.cid))isFirstPage=false;else __cm_firstPageFlag=true;this.topline[cmRule.cid].startTime=cmCtCookieVals.getStTime(cmRule.cid);if(this.topline[cmRule.cid].startTime==0)this.topline[cmRule.cid].startTime=((new Date()).getTime()/1000)|0;this.topline[cmRule.cid].slen=(((new Date()).getTime()/1000)|0)-this.topline[cmRule.cid].startTime;this.topline[cmRule.cid].n_r="";this.topline[cmRule.cid].mkchnl="";this.topline[cmRule.cid].mkpgm="";this.topline[cmRule.cid].mkv="";this.topline[cmRule.cid].mkc="";this.topline[cmRule.cid].mkp="";this.topline[cmRule.cid].mki="";this.topline[cmRule.cid].cmguid="";this.topline[cmRule.cid].natscheng="";this.topline[cmRule.cid].natschtm="";this.topline[cmRule.cid].refurl="";this.topline[cmRule.cid].refsite="";this.topline[cmRule.cid].enpg="";if(isFirstPage){this.topline[cmRule.cid].mkchnl=(new Crur()).DIRECT_LOAD_CHANNEL;if(this.pn)this.topline[cmRule.cid].enpg=this.pn;this.topline[cmRule.cid].n_r='NEW';if(!_cm_isNew)this.topline[cmRule.cid].n_r='REPEAT';var vcpiArr=_cmPartnerUtils.parseVCPI(destinationURL);if(!vcpiArr)vcpiArr=_cmPartnerUtils.parseVCPI(referrerURL);var refUrlObj=_cmPartnerUtils.parseReferralURL(referrerURL);if(vcpiArr&&vcpiArr.length>0){this.topline[cmRule.cid].mkchnl=refUrlObj.MARKETING_PROGRAMS;this.topline[cmRule.cid].mkpgm=vcpiArr[0];this.topline[cmRule.cid].mkv=vcpiArr[1];this.topline[cmRule.cid].mkc=vcpiArr[2];this.topline[cmRule.cid].mkp=vcpiArr[3];this.topline[cmRule.cid].mki=vcpiArr[4];this.topline[cmRule.cid].cmguid=vcpiArr[5];}else{this.topline[cmRule.cid].mkchnl=refUrlObj.channel;}this.topline[cmRule.cid].refsite=refUrlObj.refName;this.topline[cmRule.cid].natscheng=refUrlObj.natSearchEngine;this.topline[cmRule.cid].natschtm=refUrlObj.natSearchWord;this.topline[cmRule.cid].refurl=referrerURL;}if(typeof(__cm_firstPageFlag)!="undefined"&&__cm_firstPageFlag&&!this.topline[cmRule.cid].enpg&&this.pn){this.topline[cmRule.cid].enpg=this.pn;}this.topline[cmRule.cid].tzloc="";var sampleDate=new Date(2009,0,15);var hourDiff=Math.floor(sampleDate.getTimezoneOffset()/60);if(hourDiff==8){this.topline[cmRule.cid].tzloc="LOS ANGELES";}else if(hourDiff==7){this.topline[cmRule.cid].tzloc="DENVER";}else if(hourDiff==6){this.topline[cmRule.cid].tzloc="CHICAGO";}else if(hourDiff==5){this.topline[cmRule.cid].tzloc="NEW YORK";}if(this.tid!=1){if(this.tid==6||(this.pc&&(this.pc.indexOf('y')==0||this.pc.indexOf('Y')==0))){this.topline[cmRule.cid].pgct++;if(this.se&&this.se.replace(/^\s*/,"").replace(/\s*$/,""))this.topline[cmRule.cid].osshct++;}}if(this.tid=="1"){this.topline[cmRule.cid].pgct++;if(this.se&&this.se.replace(/^\s*/,"").replace(/\s*$/,""))this.topline[cmRule.cid].osshct++;}else if(this.tid=="3"){this.topline[cmRule.cid].orders++;if(this.tr&&parseFloat(this.tr)!=NaN)this.topline[cmRule.cid].sales+=parseFloat(this.tr);}else if(this.tid=="4"){if(this.at&&this.at=='5'&&this.qt&&parseFloat(this.qt)!=NaN)this.topline[cmRule.cid].itcartct+=parseFloat(this.qt);if(this.at&&this.at=='9'&&this.qt&&parseFloat(this.qt)!=NaN)this.topline[cmRule.cid].itpurct+=parseFloat(this.qt);}else if(this.tid=="5"){this.topline[cmRule.cid].pvct++;}else if(this.tid=="14"){if(this.cpt&&parseFloat(this.cpt)!=NaN)this.topline[cmRule.cid].evpts+=parseFloat(this.cpt);if(this.cat&&this.cat=='2')this.topline[cmRule.cid].evcomct++;if(this.cat&&this.cat=='1')this.topline[cmRule.cid].evinict++;}else if(this.tid=="15"){this.topline[cmRule.cid].elvct++;}newCmCtCookieVals.setPgCt(cmRule.cid,this.topline[cmRule.cid].pgct);newCmCtCookieVals.setOsshCt(cmRule.cid,this.topline[cmRule.cid].osshct);newCmCtCookieVals.setOrders(cmRule.cid,this.topline[cmRule.cid].orders);newCmCtCookieVals.setSales(cmRule.cid,this.topline[cmRule.cid].sales);newCmCtCookieVals.setItCartCt(cmRule.cid,this.topline[cmRule.cid].itcartct);newCmCtCookieVals.setItPurCt(cmRule.cid,this.topline[cmRule.cid].itpurct);newCmCtCookieVals.setPvCt(cmRule.cid,this.topline[cmRule.cid].pvct);newCmCtCookieVals.setEvPts(cmRule.cid,this.topline[cmRule.cid].evpts);newCmCtCookieVals.setEvComCt(cmRule.cid,this.topline[cmRule.cid].evcomct);newCmCtCookieVals.setEvIniCt(cmRule.cid,this.topline[cmRule.cid].evinict);newCmCtCookieVals.setElvCt(cmRule.cid,this.topline[cmRule.cid].elvct);newCmCtCookieVals.setFpFlag(cmRule.cid,"1");newCmCtCookieVals.setStTime(cmRule.cid,this.topline[cmRule.cid].startTime);rulesPresent=true;}for(var k in _cm_CMRules){var cmRule=_cm_CMRules[k];if(typeof(cmRule)!="object"||typeof(cmRule.cid)=="undefined")continue;var segmentRulesMetStr=cmCtCookieVals.getSegRulesMet(cmRule.cid);for(var j=0;j<cmRule.segmentRules.length;j++){var segRule=cmRule.segmentRules[j];if(segmentRulesMetStr.indexOf(segRule.id+"_")==0||segmentRulesMetStr.indexOf("_"+segRule.id+"_")!=-1)continue;var functionRetVal=false;try{functionRetVal=segRule.fn(this,this.topline[cmRule.cid])}catch(e){}if(functionRetVal)segmentRulesMetStr+=segRule.id+"_";}newCmCtCookieVals.setSegRulesMet(cmRule.cid,segmentRulesMetStr);var segmentsMetStr=cmCtCookieVals.getSegsMet(cmRule.cid);for(var s=0;s<cmRule.segments.length;s++){var segment=cmRule.segments[s];if(segmentsMetStr.indexOf(segment.id+"_")==0||segmentsMetStr.indexOf("_"+segment.id+"_")!=-1)continue;var allMatched=true;for(var r=0;r<segment.rules.length;r++){var ruleid=segment.rules[r];if(!(segmentRulesMetStr.indexOf(ruleid+"_")==0||segmentRulesMetStr.indexOf("_"+ruleid+"_")!=-1)){allMatched=false;break;}}if(allMatched){if(!segmentsToSend[cmRule.cid])segmentsToSend[cmRule.cid]="";segmentsToSend[cmRule.cid]+=segment.id+"_";segmentsMetStr+=segment.id+"_";}}newCmCtCookieVals.setSegsMet(cmRule.cid,segmentsMetStr);}if(rulesPresent)_cmPartnerUtils.setContactCookieValues(newCmCtCookieVals);return segmentsToSend;};/*** Set of utility functions,all namespaced to _cmPartnerUtils **/_cmPartnerUtils.calculateAndSendATData=function(newTag){var segmentsToSend=newTag.calculateTopLineAndReturnSegments();var partnerReqArray=_cmPartnerUtils.cmGetPartnerRequestArray(newTag,segmentsToSend);for(var i=0;i<partnerReqArray.length;i++)c9(partnerReqArray[i]);};_cmPartnerUtils.loadScript=function(s){if(cm_UseDOMScriptLoad){try{var h=cG6.getElementsByTagName('head').item(0);var js=cG6.createElement('script');js.setAttribute('language','javascript');js.setAttribute('type','text/javascript');js.setAttribute('src',s);h.appendChild(js);}catch(e){}}else{cG6.write('<script language="javascript1.1" src="'+s+'"></script>');}};_cmPartnerUtils.cmGetPartnerRequestArray=function(cmObj,segmentsToSend){var reqArray=[];if(!cmObj.ci)return reqArray;var referrerURL="";if(cmObj.rf)referrerURL=cmObj.rf;else if(document.referrer)referrerURL=document.referrer;var destinationURL="";if(cmObj.ul)destinationURL=cmObj.ul;else if(window.location.href)destinationURL=window.location.href;for(var i in _cm_CMRules){var cmRule=_cm_CMRules[i];if(typeof(cmRule)!="object")continue;if((cmRule.cid+'').indexOf(cmObj.ci)==-1)continue;if(cmRule.version>1001)continue;var shuffledPartnerIndexArr=_cmPartnerUtils.getShuffledIndexArray(cmRule.partners.length-1);for(var j=0;j<shuffledPartnerIndexArr.length;j++){var pi=shuffledPartnerIndexArr[j];var partner=cmRule.partners[pi];if(pi<0||pi>=cmRule.tags.length)continue;var tagList=cmRule.tags[pi];var pTags=[];for(var t=0;t<tagList.length;t++){var tagId=tagList[t];if(tagId=="1"){if(cmObj.tid=="1"||cmObj.tid=="6"||(cmObj.pc&&(cmObj.pc.indexOf('y')==0||cmObj.pc.indexOf('Y')==0))){var pTag=new Cptg(partner.key,referrerURL,destinationURL);pTag.tid="1";_cmPartnerUtils.copyTagParms(cmObj,pTag,[ "pi","pn","cg","pv_a1","pv_a2","pv_a3","pv_a4","pv_a5","pv_a6","pv_a7","pv_a8","pv_a9","pv_a10","pv_a11","pv_a12","pv_a13","pv_a14","pv_a15" ]);pTags.push(pTag);}}else if(tagId=="2"){if(cmObj.tid=="5"){var pTag=new Cptg(partner.key,referrerURL,destinationURL);pTag.tid="2";_cmPartnerUtils.copyTagParms(cmObj,pTag,[ "pr","pm","cg","pr_a1","pr_a2","pr_a3","pr_a4","pr_a5","pr_a6","pr_a7","pr_a8","pr_a9","pr_a10","pr_a11","pr_a12","pr_a13","pr_a14","pr_a15" ]);pTags.push(pTag);}}else if(tagId=="3"){if(cmObj.tid=="4"&&cmObj.at&&cmObj.at=='5'){var pTag=new Cptg(partner.key,referrerURL,destinationURL);pTag.tid="3";_cmPartnerUtils.copyTagParms(cmObj,pTag,[ "pr","pm","cg","qt","bp",["s_a1","pr_a1"],["s_a2","pr_a2"],["s_a3","pr_a3"],["s_a4","pr_a4"],["s_a5","pr_a5"],["s_a6","pr_a6"],["s_a7","pr_a7"],["s_a8","pr_a8"],["s_a9","pr_a9"],["s_a10","pr_a10"],["s_a11","pr_a11"],["s_a12","pr_a12"],["s_a13","pr_a13"],["s_a14","pr_a14"],["s_a15","pr_a15"] ]);pTags.push(pTag);}}else if(tagId=="4"){if(cmObj.tid=="4"&&cmObj.at&&cmObj.at=='9'){var pTag=new Cptg(partner.key,referrerURL,destinationURL);pTag.tid="4";_cmPartnerUtils.copyTagParms(cmObj,pTag,[ "pr","pm","cg","qt","bp",["s_a1","pr_a1"],["s_a2","pr_a2"],["s_a3","pr_a3"],["s_a4","pr_a4"],["s_a5","pr_a5"],["s_a6","pr_a6"],["s_a7","pr_a7"],["s_a8","pr_a8"],["s_a9","pr_a9"],["s_a10","pr_a10"],["s_a11","pr_a11"],["s_a12","pr_a12"],["s_a13","pr_a13"],["s_a14","pr_a14"],["s_a15","pr_a15"] ]);pTag.tr=cmObj.tr;pTag.on=cmObj.on;pTags.push(pTag);}}else if(tagId=="5"){if(cmObj.tid=="3"){var pTag=new Cptg(partner.key,referrerURL,destinationURL);pTag.tid="5";_cmPartnerUtils.copyTagParms(cmObj,pTag,[ "on",["tr","ov"],"ct","sa","zp","o_a1","o_a2","o_a3","o_a4","o_a5","o_a6","o_a7","o_a8","o_a9","o_a10","o_a11","o_a12","o_a13","o_a14","o_a15" ]);pTags.push(pTag);}}else if(tagId=="6"){if(cmObj.topline[cmRule.cid]&&cmObj.topline[cmRule.cid].natscheng){var pTag=new Cptg(partner.key,referrerURL,destinationURL);pTag.tid="6";pTag.en=cmObj.topline[cmRule.cid].natscheng;pTag.se=cmObj.topline[cmRule.cid].natschtm;if(cmObj.topline[cmRule.cid].mkchnl==(new Crur()).MARKETING_PROGRAMS)pTag.st='PAID';else pTag.st='NATURAL';pTags.push(pTag);}else if(cmObj.tid=="1"||cmObj.tid=="6"||(cmObj.pc&&(cmObj.pc.indexOf('y')==0||cmObj.pc.indexOf('Y')==0))){if(cmObj.se&&cmObj.se.replace(/^\s*/,"").replace(/\s*$/,"")){var pTag=new Cptg(partner.key,referrerURL,destinationURL);pTag.tid="6";pTag.en="ONSITE";pTag.se=cmObj.se;pTag.sr=cmObj.sr;pTags.push(pTag);}}}else if(tagId=="7"){if(cmObj.tid=="14"){var pTag=new Cptg(partner.key,referrerURL,destinationURL);pTag.tid="7";_cmPartnerUtils.copyTagParms(cmObj,pTag,[ ["cid","eid"],["ccid","cat"],["cat","at"],"cpt","c_a1","c_a2","c_a3","c_a4","c_a5","c_a6","c_a7","c_a8","c_a9","c_a10","c_a11","c_a12","c_a13","c_a14","c_a15" ]);pTags.push(pTag);}}}if(partner.type=='I'){for(var pti=0;pti<pTags.length;pti++){var req=_cmPartnerUtils.c0_Partner(pTags[pti],partner);reqArray.push(req);}}else if(partner.type=='S'){for(var pti=0;pti<pTags.length;pti++){if(partner.callbackFunctionSet){try{partner._cm_ConnectCallback(pTags[pti]);}catch(e){var errorTag=new Cpse(cmRule.cid+'',destinationURL,pti);var cmErrorMsg=_cmPartnerUtils.c0_CMError(errorTag);reqArray.push(cmErrorMsg);}}else{if(!_cmPartnerUtils.AT_PartnerCallQueue[partner.pid])_cmPartnerUtils.AT_PartnerCallQueue[partner.pid]=[];_cmPartnerUtils.AT_PartnerCallQueue[partner.pid].push(pTags[pti]);}}}}var segmentsToSendList=segmentsToSend[cmRule.cid];if(segmentsToSendList){for(var s=0;s<cmRule.segments.length;s++){var segment=cmRule.segments[s];if(segmentsToSendList.indexOf(segment.id)!=-1){var pTag=new Cptg("",referrerURL,destinationURL);pTag.tid="99";pTag.sid=segment.id;var shuffledIndexArr=_cmPartnerUtils.getShuffledIndexArray(segment.p.length-1);for(var j=0;j<shuffledIndexArr.length;j++){var pi=shuffledIndexArr[j];if(segment.p[pi]<0||segment.p[pi]>=cmRule.partners.length)continue;var partner=cmRule.partners[segment.p[pi]];pTag.ckey=partner.key;if(partner.type=='I'){var req=_cmPartnerUtils.c0_Partner(pTag,partner);reqArray.push(req);}else if(partner.type=='S'){if(partner.callbackFunctionSet){try{partner._cm_ConnectCallback(pTag);}catch(e){var errorTag=new Cpse(cmRule.cid+'',destinationURL,pi);var cmErrorMsg=_cmPartnerUtils.c0_CMError(errorTag);reqArray.push(cmErrorMsg);}}else{if(!_cmPartnerUtils.AT_PartnerCallQueue[partner.pid])_cmPartnerUtils.AT_PartnerCallQueue[partner.pid]=[];_cmPartnerUtils.AT_PartnerCallQueue[partner.pid].push(pTag);}}}}}}}return reqArray;};_cmPartnerUtils.copyTagParms=function(src,dest,parms){for(var i=0;i<parms.length;i++){var t=typeof(parms[i]);if(t=="string"){dest[parms[i]]=src[parms[i]];}else if(t=="object"){dest[parms[i][1]]=src[parms[i][0]];}}};_cmPartnerUtils.c0_Partner=function(cmObj,partner){var qs=_cmPartnerUtils.C6_Partner(cmObj);var req=null;if(C8(null)=='https:'){req=new _cmCQ('https:',partner.surl.indexOf("://")==-1?partner.surl:partner.surl.substring(partner.surl.indexOf("://")+3),qs);}else{req=new _cmCQ('http:',partner.url.indexOf("://")==-1?partner.url:partner.url.substring(partner.url.indexOf("://")+3),qs);}return req;};_cmPartnerUtils.c0_CMError=function(cmObj){var qs=_cmPartnerUtils.C6_Partner(cmObj);var req=null;if(C8(null)=='https:'){req=new _cmCQ('https:',cm_HOST,qs);}else{req=new _cmCQ('http:',cm_HOST,qs);}return req;};_cmPartnerUtils.C6_Partner=function(tag){var qs="";if(tag.tid)qs+="tid="+tag.tid;for(var cOb in tag){if(!tag[cOb]||tag[cOb]==""||tag[cOb].constructor==Function||cOb=="tid")continue;if(qs!="")qs+="&";qs+=cD(cOb)+"="+cE(cD(tag[cOb]));}return qs;};_cmPartnerUtils.setContactRule=function(contactRule){var cid=contactRule.cid;_cm_CMRules[cid]=contactRule;for(var p=0;p<contactRule.partners.length;p++){var partner=contactRule.partners[p];if(partner.type=='S'){partner._cm_ConnectCallback=function empty(){};partner.callbackFunctionSet=false;var scripturl=partner.url;if(C8(null)=='https:')scripturl=partner.surl;scripturl=scripturl.indexOf("://")==-1?scripturl:scripturl.substring(scripturl.indexOf("://")+3);_cmPartnerUtils.loadScript(C8(null)+'//'+scripturl);}}if(!cI("CoreAt")){var cmhost_root=cm_Production_HOST;if(contactRule.usesNewRepeat){if(cm_JSFEnabled){cmSetNRFlag(cI(cm_JSFCoreCookieName));}else{_cmPartnerUtils.AT_NRFlagNeeded=true;_cmPartnerUtils.loadScript(C8(null)+'//'+cmhost_root+'/cookie-id.js?fn=cmSetNRFlag');}}}_cmPartnerUtils.AT_RulesSet=true;if(_cmPartnerUtils.AT_NRFlagNeeded){if(_cmPartnerUtils.AT_NRFlagSet){for(var j=0;j<_cmPartnerUtils.AT_TagQueue.length;j++)_cmPartnerUtils.calculateAndSendATData(_cmPartnerUtils.AT_TagQueue[j]);_cmPartnerUtils.AT_TagQueue=[];}}else{for(var j=0;j<_cmPartnerUtils.AT_TagQueue.length;j++)_cmPartnerUtils.calculateAndSendATData(_cmPartnerUtils.AT_TagQueue[j]);_cmPartnerUtils.AT_TagQueue=[];}};function _cm_registerCallback(partner_id,callback){if(!partner_id)return;if(typeof(callback)!='function')return;for(var k in _cm_CMRules){var cmRule=_cm_CMRules[k];if(typeof(cmRule)!="object"||typeof(cmRule.cid)=="undefined")continue;for(var p=0;p<cmRule.partners.length;p++){var partner=cmRule.partners[p];if(partner.pid==partner_id&&!partner.callbackFunctionSet){partner._cm_ConnectCallback=callback;partner.callbackFunctionSet=true;if(_cmPartnerUtils.AT_PartnerCallQueue[partner.pid]){for(var i=0;i<_cmPartnerUtils.AT_PartnerCallQueue[partner.pid].length;i++){try{partner._cm_ConnectCallback(_cmPartnerUtils.AT_PartnerCallQueue[partner.pid][i]);}catch(e){}}_cmPartnerUtils.AT_PartnerCallQueue[partner.pid]=[];}}}}}function cmSetNRFlag(cookieval){if(cookieval)_cm_isNew=false;_cmPartnerUtils.AT_NRFlagSet=true;if(_cmPartnerUtils.AT_NRFlagNeeded){if(_cmPartnerUtils.AT_RulesSet){for(var j=0;j<_cmPartnerUtils.AT_TagQueue.length;j++)_cmPartnerUtils.calculateAndSendATData(_cmPartnerUtils.AT_TagQueue[j]);_cmPartnerUtils.AT_TagQueue=[];}}}_cmPartnerUtils.getContactCookieValues=function(){var externalizeVersion=1;var cmCtCookieVals=new Ctck();var cV4=cI("CoreAt");if(!cV4){return cmCtCookieVals;}var stringvals=cV4.split("&");var keyvalstring,cid,val,sepindex;for(var i=0;i<stringvals.length;i++){keyvalstring=stringvals[i];sepindex=keyvalstring.indexOf("=");if(sepindex!=-1){var cid=keyvalstring.substring(0,sepindex);var val=null;if(keyvalstring.length>sepindex+1)val=keyvalstring.substring(sepindex+1);if(cid&&val){var splitvals=unescape(val).split(/\|/);if(splitvals&&splitvals.length>0){if(splitvals[0]&&parseInt(splitvals[0])<=externalizeVersion){if(splitvals[1])cmCtCookieVals.setPgCt(cid,splitvals[1]);if(splitvals[2])cmCtCookieVals.setOsshCt(cid,splitvals[2]);if(splitvals[3])cmCtCookieVals.setOrders(cid,splitvals[3]);if(splitvals[4])cmCtCookieVals.setSales(cid,splitvals[4]);if(splitvals[5])cmCtCookieVals.setItCartCt(cid,splitvals[5]);if(splitvals[6])cmCtCookieVals.setItPurCt(cid,splitvals[6]);if(splitvals[7])cmCtCookieVals.setPvCt(cid,splitvals[7]);if(splitvals[8])cmCtCookieVals.setEvPts(cid,splitvals[8]);if(splitvals[9])cmCtCookieVals.setEvComCt(cid,splitvals[9]);if(splitvals[10])cmCtCookieVals.setEvIniCt(cid,splitvals[10]);if(splitvals[11])cmCtCookieVals.setElvCt(cid,splitvals[11]);if(splitvals[12])cmCtCookieVals.setFpFlag(cid,splitvals[12]);if(splitvals[13])cmCtCookieVals.setStTime(cid,splitvals[13]);if(splitvals[14])cmCtCookieVals.setSegRulesMet(cid,splitvals[14]);if(splitvals[15])cmCtCookieVals.setSegsMet(cid,splitvals[15]);}}}}}return cmCtCookieVals;};_cmPartnerUtils.setContactCookieValues=function(cmCtCookieVals){var externalizeVersion=1;var val="";for(var cid in cmCtCookieVals.holder){if(cid.length!=8||typeof(cmCtCookieVals.holder[cid])=="function")continue;val+=cid+"="+externalizeVersion+"|"+cmCtCookieVals.getPgCt(cid)+"|"+cmCtCookieVals.getOsshCt(cid)+"|"+cmCtCookieVals.getOrders(cid)+"|"+cmCtCookieVals.getSales(cid)+"|"+cmCtCookieVals.getItCartCt(cid)+"|"+cmCtCookieVals.getItPurCt(cid)+"|"+cmCtCookieVals.getPvCt(cid)+"|"+cmCtCookieVals.getEvPts(cid)+"|"+cmCtCookieVals.getEvComCt(cid)+"|"+cmCtCookieVals.getEvIniCt(cid)+"|"+cmCtCookieVals.getElvCt(cid)+"|"+cmCtCookieVals.getFpFlag(cid)+"|"+cmCtCookieVals.getStTime(cid)+"|"+cmCtCookieVals.getSegRulesMet(cid)+"|"+cmCtCookieVals.getSegsMet(cid)+"&";}CB("CoreAt",val,"",cm_JSFPCookieDomain);};/* parse and return following properties in refurl * marketingChannel,referringSite,naturalSearchEngine,naturalSearchWord */_cmPartnerUtils.parseReferralURL=function(referralUrl){var result=new Crur();if(!referralUrl)return result;var domainName=this.extractDomainName(referralUrl);if(domainName.getPartsCount()==0)return result;if(domainName.url.search(/^[0-9]+(\.[0-9]+){3}$/)>=0){result.channel=result.REFERRAL_CHANNEL;result.refName=domainName.url;return result;}var searchEngines=[ ['GOOGLE.COM','q'],['YAHOO.COM','SEARCH.YAHOO.COM','p'],['MSN.COM','SEARCH.MSN.COM',['q','MT']],['AOL.COM','SEARCH.AOL.COM',['aps_terms','query','encquery','q']],['AOL.COM',['AOLSEARCH.AOL.COM','AOLSEARCHT.AOL.COM'],'query'],['ASK.COM',['q','ask']],['ASK.COM',['ASKGEEVES.COM','ASKJEEVES.COM','ASKJEEVS.COM'],'ask'],['BING.COM','q'],['LYCOS.COM','HOTBOT.LYCOS.COM','MT'],['LYCOS.COM','query'],['ALTAVISTA.COM','q'],['ALTAVISTA.COM',['PARTNERS.ALTAVISTA.COM','ALTA-VISTA.COM'],'q'],['NETSCAPE.COM','SEARCH.NETSCAPE.COM',['search','query']],['WEBSEARCH.CNN.COM','query'],['LOOKSMART.COM','key'],['ABOUT.COM','terms'],['MAMMA.COM','query='],['ALLTHEWEB.COM',['query','q']],['VOILA.COM','kw'],['VIRGILIO.IT','SEARCH.VIRGILIO.IT','qs'],['LIVE.COM','SEARCH.LIVE.COM','q'],['BAIDU.COM',['word','wd']],['SEARCH.ALICE.IT','qs'],['YANDEX.RU','text'],['CLUB-INTERNET.FR','q'],['SEARCH.SEZNAM.CZ','q'],['SEARCH.SEZNAM.CZ','w'],['SEARCH.COM',['q','what','QUERY','OLDQUERY']],['SEARCH.YAM.COM','k'],['GOOGLE.PCHOME.COM.TW','q']];var matchedSearchList=[];for(var i=domainName.getPartsCount();matchedSearchList.length==0&&i>=2;i--){var dm=domainName.getLast(i);for(var j=0;j<searchEngines.length;j++){var se=searchEngines[j];var sedms=(se.length>2)?se[1]:se[0];sedms=(typeof(sedms)=="string")?[ sedms ]:sedms;for(var k=0;k<sedms.length;k++){if(sedms[k]==dm)matchedSearchList.push(se);}}}if(matchedSearchList.length>0){result.channel=result.NATURAL_SEARCH_CHANNEL;result.natSearchEngine=matchedSearchList[0][0];result.refName=domainName.url;for(var i=0;i<matchedSearchList.length;i++){var se=matchedSearchList[i];var params=(se.length>2)?se[2]:se[1];var params=(typeof(params)=="string")?[ params ]:params;for(var j=0;j<params.length;j++){var re=new RegExp("[&?]"+params[j]+"=([^&]+)");var a=referralUrl.match(re);if(a){var term=_cmPartnerUtils.urlDecode(a[1]);if(term.search(/^[^a-zA-Z0-9]*$/)==-1){result.natSearchWord=term.replace(/\+/g," ");break;}}}}}else{result.channel=result.REFERRAL_CHANNEL;result.refName=domainName.url;}return result;};_cmPartnerUtils.urlDecode=function(s){if(typeof(decodeURIComponent)=='function'){try{return decodeURIComponent(s);}catch(e){}}return unescape(s);};_cmPartnerUtils.extractDomainName=function(url){var a=url.match(/:\/*([^\/\?]+)/);var authority=a?a[1]:"";authority=authority.toUpperCase();a=authority.match(/^(?:WWW\d*\.)?([^:]+)/);if(a)authority=a[1];var lastCharacter=authority.length - 1;var lastDot=authority.lastIndexOf('.');if(lastDot==-1){return new Cspd();}else if(lastDot==lastCharacter){authority=authority.substring(0,lastCharacter);}return new Cspd(authority);};_cmPartnerUtils.parseVCPI=function(url){if(!url)return "";var a=url.match(/[&?]cm_mmc(_o)?=([^&]+)/);if(!a)return "";var mmcval=a[1]?deObfuscate(a[2]):a[2];var splitmmcvals=mmcval.split(/\-_\-|\*/);if(!splitmmcvals||splitmmcvals.length!=4)return "";var index=splitmmcvals[3].indexOf("|-|");if(index!=-1){splitmmcvals[3]=splitmmcvals[3].substring(0,index);}splitmmcvals[0]=_cmPartnerUtils.urlDecode(splitmmcvals[0]).replace(/\+/g," ");splitmmcvals[1]=_cmPartnerUtils.urlDecode(splitmmcvals[1]).replace(/\+/g," ");splitmmcvals[2]=_cmPartnerUtils.urlDecode(splitmmcvals[2]).replace(/\+/g," ");splitmmcvals[3]=_cmPartnerUtils.urlDecode(splitmmcvals[3]).replace(/\+/g," ");var b=url.match(/[&?]cm_guid=([^&]+)/);var guid=(b&&b[1])?_cmPartnerUtils.urlDecode(b[1]):"";return [ splitmmcvals[0]+"*"+splitmmcvals[1]+"*"+splitmmcvals[2]+"*"+splitmmcvals[3],splitmmcvals[0],splitmmcvals[1],splitmmcvals[2],splitmmcvals[3],guid ];};_cmPartnerUtils.deObfuscate=function(encodedStr){if(!encodedStr)return "";var ENCODED="-P2KHd7ZG3s14WRVhqmaJe8rQUz_gpwuTtbXLkFEB56ylfAMc0YOCjvnNSDxIo9i";var DECODED="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_1234567890";var MIN_CHAR_VALUE=45;var MAX_CHAR_VALUE=122;var lookupArray=[];for(var i=0;i<ENCODED.length;i++){var c=ENCODED.charCodeAt(i);lookupArray[c - 45]=DECODED.charAt(i);}var decodedStr="";try{for(var i=0;i<encodedStr.length;i++){var encodedCharacter=encodedStr.charAt(i);var encodedCharacterInt=encodedStr.charCodeAt(i);if(encodedCharacterInt<MIN_CHAR_VALUE||encodedCharacterInt>MAX_CHAR_VALUE){decodedStr+=encodedCharacter;}else{var decodedCharacter=lookupArray[encodedCharacterInt - 45];if(decodedCharacter==null){decodedStr+=encodedCharacter;}else{decodedStr+=decodedCharacter;}}}}catch(e){}return decodedStr;};_cmPartnerUtils.getShuffledIndexArray=function(maxIndex){var indexArr=[];for(var i=0;i<=maxIndex;i++){indexArr.push(i);}for(var i=0;i<indexArr.length;i++){var randIndex=Math.floor(Math.random()*(indexArr.length));var temp=indexArr[i];indexArr[i]=indexArr[randIndex];indexArr[randIndex]=temp;}return indexArr;};_cmPartnerUtils.startsWith=function(field,parameter){return(field.toUpperCase().indexOf(parameter)==0);};_cmPartnerUtils.endsWith=function(field,parameter){return((field.toUpperCase().lastIndexOf(parameter)!=-1)&&(field.toUpperCase().lastIndexOf(parameter)+parameter.length==field.length));};_cmPartnerUtils.contains=function(field,parameter){return(field.toUpperCase().indexOf(parameter)!=-1);};/**** new objects *****/function Ctck(){this.holder={};this.getIntValue=function(cid,key){if(!this.holder[cid])return 0;var i=this.holder[cid][key]?parseInt(this.holder[cid][key]):0;i=(i==NaN)?0:i;return i;};this.getFloatValue=function(cid,key){if(!this.holder[cid])return 0;var i=this.holder[cid][key]?parseFloat(this.holder[cid][key]):0;i=(i==NaN)?0:i;return i;};this.getStringValue=function(cid,key){if(!this.holder[cid])return "";return this.holder[cid][key]?this.holder[cid][key]:"";};this.setFloatValue=function(cid,key,val){if(!this.holder[cid])this.holder[cid]={};if(key&&val&&parseFloat(val)!=NaN){if(typeof(val)=="number")this.holder[cid][key]=val.toFixed(2)+'';else this.holder[cid][key]=val;}};this.setIntValue=function(cid,key,val){if(!this.holder[cid])this.holder[cid]={};if(key&&val&&parseInt(val)!=NaN)this.holder[cid][key]=val+'';};this.setStringValue=function(cid,key,val){if(!this.holder[cid])this.holder[cid]=[];if(key&&val)this.holder[cid][key]=val;};this.getPgCt=function(cid){return this.getIntValue(cid,"pgct");};this.setPgCt=function(cid,val){this.setIntValue(cid,"pgct",val);};this.getOsshCt=function(cid){return this.getIntValue(cid,"osshct");};this.setOsshCt=function(cid,val){this.setIntValue(cid,"osshct",val);};this.getOrders=function(cid){return this.getIntValue(cid,"orders");};this.setOrders=function(cid,val){this.setIntValue(cid,"orders",val);};this.getSales=function(cid){return this.getFloatValue(cid,"sales");};this.setSales=function(cid,val){this.setFloatValue(cid,"sales",val);};this.getItCartCt=function(cid){return this.getFloatValue(cid,"itcartct");};this.setItCartCt=function(cid,val){this.setFloatValue(cid,"itcartct",val);};this.getItPurCt=function(cid){return this.getFloatValue(cid,"itpurct");};this.setItPurCt=function(cid,val){this.setFloatValue(cid,"itpurct",val);};this.getPvCt=function(cid){return this.getIntValue(cid,"pvct");};this.setPvCt=function(cid,val){this.setIntValue(cid,"pvct",val);};this.getEvPts=function(cid){return this.getFloatValue(cid,"evpts");};this.setEvPts=function(cid,val){this.setFloatValue(cid,"evpts",val);};this.getEvIniCt=function(cid){return this.getIntValue(cid,"evinict");};this.setEvIniCt=function(cid,val){this.setIntValue(cid,"evinict",val);};this.getEvComCt=function(cid){return this.getIntValue(cid,"evcomct");};this.setEvComCt=function(cid,val){this.setIntValue(cid,"evcomct",val);};this.getElvCt=function(cid){return this.getIntValue(cid,"elvct");};this.setElvCt=function(cid,val){this.setIntValue(cid,"elvct",val);};this.getFpFlag=function(cid){return this.getIntValue(cid,"fp");};this.setFpFlag=function(cid,val){this.setIntValue(cid,"fp",val);};this.getStTime=function(cid){return this.getIntValue(cid,"st");};this.setStTime=function(cid,val){this.setIntValue(cid,"st",val);};this.getSegRulesMet=function(cid){return this.getStringValue(cid,"segrules");};this.setSegRulesMet=function(cid,val){this.setStringValue(cid,"segrules",val);};this.getSegsMet=function(cid){return this.getStringValue(cid,"segs");};this.setSegsMet=function(cid,val){this.setStringValue(cid,"segs",val);};}function Cpse(cid,ul1,pindex1){this.ci=cid;this.tid='21';this.ul=(ul1)?ul1:"";this.pindex=pindex1;}function Cptg(ckey1,rf1,ul1){this.ckey=(ckey1)?ckey1:"";this.rf=(rf1)?rf1:"";this.ul=(ul1)?ul1:"";}function Crur(){this.DIRECT_LOAD_CHANNEL='DIRECT LOAD';this.REFERRAL_CHANNEL='REFERRING SITES';this.NATURAL_SEARCH_CHANNEL='NATURAL SEARCH';this.MARKETING_PROGRAMS='MARKETING PROGRAMS';this.DIRECT_LOAD_REFERRAL_NAME='DL';this.channel=this.DIRECT_LOAD_CHANNEL;this.refName=this.DIRECT_LOAD_REFERRAL_NAME;this.natSearchEngine="";this.natSearchWord="";}function Cspd(url1){this.url=(url1)?url1:"";this.splitUrl=this.url.split("\.");this.getPartsCount=function(){return this.splitUrl.length;};this.getLast=function(index){var dm="";for(var i=index;i>=1;i--){if(this.splitUrl.length>=i){if(dm)dm+=".";dm+=this.splitUrl[this.splitUrl.length-i]}}return dm;};}

var coremetrics = {
    "cmConfigMapping": {"io":"cm_IOEnabled",
                        "ia":"cm_OffsiteImpressionsEnabled",
                        "at":"cm_ATEnabled"},
    "cmUpdateConfig" : function cmUpdateConfig(newConfigMap) {
        for (var i in newConfigMap) {
            if(coremetrics.cmConfigMapping[i]) {
                window[coremetrics.cmConfigMapping[i]] = newConfigMap[i];
            }
        }
    },
    "cmVersion":"e5.0.1",
    "cmLoad":cmLoad
};

var cm_exAttr=new Array();
var cmCheckCMEMFlag = true;
var cmAutoCopyAttributesToExtraFields = false;

var cmJv = "1.0";
if (typeof(isNaN) == "function") { cmJv = "1.1";}
if (typeof(isFinite) == "function") { cmJv = "1.2";}
if (typeof(NaN) == "number") { cmJv = "1.3";}
if (typeof(decodeURI) == "function") { cmJv = "1.5";}
if (typeof(Array.forEach) == "function") { cmJv = "1.6";}
if (typeof(Iterator) == "object") {cmJv = "1.7";}

var cmPricePattern = /[^\-0-9\.]/gi;
var cmSpacePattern = /^\s+|\s+$/gi;
var cmMMCPattern = /cm_(?:mmc|ven|cat|pla|ite)/gi;

function cmLoadIOConfig() {
    if (typeof(IORequest) == "function") {
       IORequest.client_id           = cm_ClientID.split(";")[0].split("|")[0];
       IORequest.encrypt_cats        = true;
       IORequest.encrypt_prds        = true;
       IORequest.conflict_resolution = true;
       IORequest.max_prd_length      = 25;
       IORequest.max_cat_length      = 25;
       IORequest.timeout             = [8000, 4000];
       IORequest.use_site_category   = false;
       if ((IORequest.ie_version() !== null) && (IORequest.ie_version() < 7.0)) {
          IORequest.a_max_elements = [3,3,5,3,3,3,3];
       }
       else {
          IORequest.a_max_elements = [3,3,5,3,3,7,7];
       }
       IORequest.required_attributes  = [0,0,0,0,0];
       IORequest.access_method          = 'json remote';
       IORequest.default_product_file = undefined;
    }
}

function cmSetClientID(clientID,firstPartyCM,dataCollectionDomain,cookieDomain,autoLoad) {
    cm_PartnerDataClientIDs = cm_ClientID = clientID;
    if (typeof(IORequest) == "function"){
        IORequest.client_id = cm_ClientID.split(";")[0].split("|")[0];
    }

    if(firstPartyCM===true) {
        cm_JSFEnabled = true;
    }

    if(dataCollectionDomain) {
        cm_HOST = cm_Production_HOST = dataCollectionDomain;
        if ((dataCollectionDomain === "test.coremetrics.com") || (dataCollectionDomain === "testdata.coremetrics.com")) {
            cm_Production_HOST = "data.coremetrics.com";
        }
        cm_HOST += "/cm?";
    }

    if (cookieDomain) {
        cm_JSFPCookieDomain=cookieDomain;
    }

    document.write('<script language="javascript1.2" src="//libs.coremetrics.com/configs/' + cm_ClientID.split(";",1) + '.js"></script>');
}

function cmSetupCookieMigration(JSFPmigration, forceVisitorOverwrite, domainWhitelist, domainBlacklist, pathWhitelist, otherCookies, otherCookiesExpireTimes) {
    if(JSFPmigration) { cm_JSFPCookieMigrate = JSFPmigration; }
    if(forceVisitorOverwrite) { cm_JSFPForceMigrateCookies = forceVisitorOverwrite; }
    if(domainWhitelist) { cm_JSFPMigrationDomainWhitelist = domainWhitelist; }
    if(domainBlacklist) { cm_JSFPMigrationDomainBlacklist = domainBlacklist; }
    if(pathWhitelist) { cm_JSFPMigrationPathWhitelist = pathWhitelist; }
    if(otherCookies) { cm_JSFPMigrationOtherCookies = otherCookies; }
    if(otherCookiesExpireTimes) { cm_JSFPMigrationOtherCookiesExpireTimes = otherCookiesExpireTimes; }

    if (cm_JSFPCookieMigrate) {
        var tempClientIDList = cm_ClientID.split(";");
        var tempSessionID = {};
        for (var i = 0; i < tempClientIDList.length; ++i) {
            var tempValue = cmExtractParameter(cm_JSFPCookieMigrateSessionID + "_" + tempClientIDList[i], window.location.href);
                if (tempValue) {
                    tempSessionID[tempClientIDList[i]] = tempValue;
                }
        }
        var otherCookies = {};
        if (cm_JSFPMigrationOtherCookies) {
            var tempOtherCookieList = cm_JSFPMigrationOtherCookies.split(",");
            for (var j = 0; j < tempOtherCookieList.length; ++j ) {
                var tempValue = cmExtractParameter("cm_mc_" + tempOtherCookieList[j], window.location.href);
                if (tempValue) {
                    otherCookies[tempOtherCookieList[j]] = tempValue;
                }
            }
        }
        cmJSFPMigrateCookies(cmExtractParameter(cm_JSFPCookieMigrateVisitorID, window.location.href), tempSessionID, otherCookies);
    }
}

var cmNormalizeBlackList, cmNormalizeWhiteList = null;

function cmSetupNormalization(blacklist, whitelist, altFunction) {
    if (blacklist) {
        cmNormalizeBlackList = blacklist;
    }
    if (whitelist) {
        cmNormalizeWhiteList = whitelist;
    }
    if (altFunction) {
        if (document.cmTagCtl != null) {
            document.cmTagCtl.normalizeURL = altFunction;
        }
    }
}

function cmSetupOther(configObject) {
    for (var x in configObject) {
        window[x] = configObject[x];
    }
}

// Set the currency code value to be used by shop5, shop9, and order tags
function cmSetCurrencyCode(currencyCode) {
    cm_currencyCode = currencyCode;
}

function cmSetFirstPartyIDs(permID, sessionID) {
    cm_JSFPCookieMigrate = true;
    cm_JSFPForceMigrateCookies = true;
    var tempClientIDList = cm_ClientID.split(";");
    var tempSessionID = {};
    for (var i = 0; i < tempClientIDList.length; ++i) {
        tempSessionID[tempClientIDList[i]] = sessionID;
    }

    cmJSFPMigrateCookies(permID, tempSessionID, null);
}
// TAG GENERATING FUNCTIONS


function cmCreateManualImpressionTag(pageID, trackSP, trackRE, trackCR, trackME) {
        if (!pageID) {
            pageID = c1(cm_ClientID);
        }
        cmMakeTag(["tid","9","pi",pageID,"cm_sp",trackSP,"cm_re",trackRE,"cm_cr",trackCR,"cm_me",trackME,"st",cm_ClientTS]);
}

function cmCreateManualLinkClickTag(href,name,pageID) {
    if (window.cmCreateLinkTag == null && window.cM !== null) {
        var cmCreateLinkTag = cM;
    }
    if (cmCreateLinkTag != null) {
        var dt = new Date();
        cmLnkT3 = dt.getTime();
        href=cG7.normalizeURL(href,true);
        cmCreateLinkTag(cm_ClientTS, cmLnkT3, name, href, false, pageID);
    }
}

// manual PageviewTag for off site page tagging.  Allows client to supply URL and Referring URL
function cmCreateManualPageviewTag(pageID, categoryID,DestinationURL,ReferringURL, attributes, searchString, searchResults, extraFields) {
    cmMakeTag(["tid","1","pi",pageID,"cg",categoryID,"ul",DestinationURL,"rf",ReferringURL,"se",searchString,"sr",searchResults,"cmAttributes",attributes,"cmExtraFields",extraFields]);
}

function cmCreateElementTag(elementID, elementCategory, attributes) {
    cmMakeTag(["tid","15","eid",elementID,"ecat",elementCategory,"cmAttributes",attributes]);
}

// included for backwards compatibility
function cmCreatePageElementTag(elementID, elementCategory, pageID, pageCategoryID, elementLocation, attributes) {
    cmCreateElementTag(elementID,elementCategory,attributes);
}

// included for backwards compatibility
var cmCreateProductElementTag = cmCreatePageElementTag;

// Creates a Conversion Event tag
//
// eventID          : required. Conversion event ID
// actionType       : required. 1=conversion initiation, 2=conversion completion
// categoryID       : optional. Category for the event
// points           : optional. Point value to assign to conversion.
// attibutes        : optional. Explore attributes
function cmCreateConversionEventTag(eventID, actionType, categoryID, points,attributes, extraFields) {
    cmMakeTag(["tid","14","cid",eventID,"cat",actionType,"ccid",categoryID,"cpt",points,"cmAttributes",attributes,"cmExtraFields",extraFields]);
}


// Creates a Tech Props tag.
// pageID       : required. Page ID to set on this Pageview tag
function cmCreateTechPropsTag(pageID, categoryID, attributes, extraFields) {
    cmMakeTag(["tid","6","pi",pageID,"cg",categoryID,"pc","Y","cmAttributes",attributes,"cmExtraFields",extraFields]);
}


// Creates a Pageview tag with the given Page ID
//
// pageID   : required. Page ID to set on this Pageview tag
// categoryID   : optional. Category ID to set on this Pageview tag
// searchString : optional. Internal search string entered by user to reach this page.
// searchResults : optional.  Total numeric search results count.
function cmCreatePageviewTag(pageID, categoryID, searchString, searchResults, attributes, extraFields) {
    cmMakeTag(["tid","1","pi",pageID,"cg",categoryID,"se",searchString,"sr",searchResults,"cmAttributes",attributes,"cmExtraFields",extraFields]);
}

// Creates a Pageview tag with the default value for Page ID.
function cmCreateDefaultPageviewTag(categoryID) {
    cmCreatePageviewTag(cmGetDefaultPageID(), categoryID);
}

// Creates a Productview Tag
// Also creates a Pageview Tag by setting pc="Y"
// Format of Page ID is "PRODUCT: <Product Name> (<Product ID>)"
//
// productID    : required. Product ID to set on this Productview tag
// productName  : required. Product Name to set on this Productview tag
// categoryID   : optional. Category ID to set on this Productview tag
// searchString : optional. Internal search string entered by user to reach this Product Detail page. Only usable if pc="Y".
// searchResults : optional.  Total numeric search results count. Only usable if pc="Y".
function cmCreateProductviewTag(productID, productName, categoryID, attributes, cm_vc) {
    cmMakeTag(["tid","5","pi",c1(cm_ClientID) ? c1(cm_ClientID) : "Product: " + productName + " (" + productID + ")","pr",productID,"pm",productName,"cg",categoryID,"pc","N","cm_vc",cm_vc?cm_vc:cmExtractParameter("cm_vc",document.location.href),"cmAttributes",attributes]);
}

// Variables and Arrays to support Lineitem Aggregation
var __sArray = [];
var __sRefArray = [];
var __sSkuArray = [];
var __sRefSkuArray = [];
var __skuString = "";

// Internal shop aggregation function.  Do not call this function directly
function cmAddShop(__v) {
    var __v2 = __v.concat();

    var tempArrayIndex = __sRefArray[__v[1] + "|" + __v[9]+ "|" + __v[11] + "|" + __v[13]];
    if (typeof(tempArrayIndex) !== "undefined") {
        var tempArrayPosition = __sArray[tempArrayIndex];
        if (tempArrayPosition) {
            var __oQ = tempArrayPosition[5];
            var __oP = tempArrayPosition[7];
            var tempNewQuantity = __v[5];
            __v[5] = parseInt(__oQ) + parseInt(__v[5]);
            __v[7] = (((__v[7]*tempNewQuantity)+(__oP*__oQ))/__v[5]);
            __sArray[tempArrayIndex] = __v;
        }
    }
    else {
        __sRefArray[__v[1] + "|" + __v[9]+ "|" + __v[11] + "|" + __v[13]] = __sArray.length;
        __sArray[__sArray.length] = __v;
    }

    var tempArrayIndex2 = __sRefSkuArray[__v2[1]];
    if (typeof(tempArrayIndex2) !== "undefined") {
        var tempArrayPosition2 = __sSkuArray[tempArrayIndex2];
        if (tempArrayPosition2) {
            var __oQ = tempArrayPosition2[5];
            var __oP = tempArrayPosition2[7];
            var tempNewQuantity = __v2[5];
            __v2[5] = parseInt(__oQ) + parseInt(__v2[5]);
            __v2[7] = (((__v2[7]*tempNewQuantity)+(__oP*__oQ))/__v2[5]);
            __sSkuArray[tempArrayIndex2] = __v2;
        }
    }
    else {
        __sRefSkuArray[__v2[1]] = __sSkuArray.length;
        __sSkuArray[__sSkuArray.length] = __v2;
    }
}

function cmDisplayShops() {
    var i;
    for (i = 0; i < __sArray.length; ++i) {
        cmMakeTag(__sArray[i]);
    }
    __sArray = [];
    __sRefArray = [];
    __skuString = cmCalcSKUString();
}

//include for legacy purposes
var cmDisplayShop5s = cmDisplayShop9s = cmDisplayShops;

// needed to calculate OSK string for Order tag
function cmCalcSKUString() {
    var skuString = "";
    for(var i = 0;i < __sSkuArray.length; i++) {
        var temp = __sSkuArray[i];
        skuString += "|" + temp[1] + "|" + temp[7] + "|" + temp[5] + "|";
    }
    __sSkuArray = [];
    __sRefSkuArray = [];
    return skuString;
}


// Creates a Shop tag with Action 5 (Shopping Cart)
//
// productID    : required. Product ID to set on this Shop tag
// quantity : required. Quantity to set on this Shop tag
// productPrice : required. Price of one unit of this product
// categoryID   : optional. Category to set on this Shop tag
function cmCreateShopAction5Tag(productID, productName, productQuantity, productPrice, categoryID, attributes, extraFields) {
    if ((typeof(cm_currencyCode) == "undefined") || (!cm_currencyCode)) {
        cm_currencyCode = "";
    }
    productPrice = productPrice.toString().replace(cmPricePattern, "");
    productID = productID.toString().replace(cmSpacePattern, "");
    var hashValue = "" + (attributes ? attributes + "|||" : "") + (extraFields ? "extra" + extraFields : "");
    cmAddShop(["pr",productID,"pm",productName,"qt",productQuantity,"bp",productPrice,"cg",categoryID,"cmAttributes",attributes,"cmExtraFields",extraFields,"ha1",cm_hex_sha1(hashValue),"cc",cm_currencyCode,"at","5","tid","4","pc","N"]);
}

// Creates a Shop tag with Action 9 (Order Receipt / Confirmed)
//
// productID    : required. Product ID to set on this Shop tag
// productName  : required. Product Name to set on this Shop tag
// quantity : required. Quantity to set on this Shop tag
// productPrice : required. Price of one unit of this product
// customerID   : required. ID of customer making the purchase
// orderID  : required. ID of order this lineitem belongs to
// orderTotal   : required. Total price of order this lineitem belongs to
// categoryID   : optional. Category to set on this Shop tag
function cmCreateShopAction9Tag(productID, productName, productQuantity, productPrice, customerID, orderID, orderTotal, categoryID, attributes, extraFields) {
    if ((typeof(cm_currencyCode) == "undefined") || (!cm_currencyCode)) {
        cm_currencyCode = "";
    }
    productPrice = productPrice.toString().replace(cmPricePattern, "");
    orderTotal = orderTotal.toString().replace(cmPricePattern, "");
    productID = productID.toString().replace(cmSpacePattern, "");
    var hashValue = "" + (attributes ? attributes + "|||" : "") + (extraFields ? "extra" + extraFields : "");
    cmAddShop(["pr",productID,"pm",productName,"qt",productQuantity,"bp",productPrice,"cg",categoryID,"cmAttributes",attributes,"cmExtraFields",extraFields,"ha1",cm_hex_sha1(hashValue),"cd",customerID,"on",orderID,"tr",orderTotal,"cc",cm_currencyCode,"at","9","tid","4","pc","N"]);
}

// Creates an Order tag
//
// orderID          : required. Order ID of this order
// orderTotal       : required. Total of this order (minus tax and shipping)
// orderShipping    : required. Shipping charge for this order
// customerID       : required. Customer ID that placed this order
// customerCity     : optional. City of Customer that placed this order
// customerState    : optional. State of Customer that placed this order
// customerZIP      : optional. Zipcode of Customer that placed this order
function cmCreateOrderTag(orderID,orderTotal,orderShipping,customerID,customerCity,customerState,customerZIP,attributes,extraFields) {
    if ((typeof(cm_currencyCode) == "undefined") || (!cm_currencyCode)) {
        cm_currencyCode = "";
    }
    orderShipping = orderShipping.toString().replace(cmPricePattern, "");
    orderTotal = orderTotal.toString().replace(cmPricePattern, "");
    cmMakeTag(["tid","3","osk",cmCalcSKUString(),"on",orderID,"tr",orderTotal,"sg",orderShipping,"cd",customerID,"ct",customerCity,"sa",customerState,"zp",customerZIP,"cc",cm_currencyCode,"cmAttributes",attributes,"cmExtraFields",extraFields]);
}

// Creates a Registration tag and/or a Newsletter tag
//
// customerID       : required for Registration. ID of Customer to register.
// customerEmail    : required for Newsletters. Optional for Registration.
// customerCity     : optional. City of Customer that placed this order
// customerState    : optional. State of Customer that placed this order
// customerZIP      : optional. Zipcode of Customer that placed this order
function cmCreateRegistrationTag(customerID, customerEmail, customerCity, customerState, customerZIP, customerCountry, attributes) {
    cmMakeTag(["tid","2","cd",customerID,"em",customerEmail,"ct",customerCity,"sa",customerState,"zp",customerZIP,"cy",customerCountry,"cmAttributes",attributes]);
}

// DEPRECATED - Creates an error tag
function cmCreateErrorTag(pageID, categoryID) {
    cmMakeTag(["tid","404","pi",pageID,"cg",categoryID,"pc","Y"]);
}

// creates a custom tag
function cmCreateCustomTag(lineNumber, extraFields) {
    cmMakeTag(["tid","7","li",lineNumber,"cmExtraFields",extraFields]);
}

// Internal tag function, DO NOT CALL DIRECTLY
function cmMakeTag(__v) {
    var cm = new _cm("vn2", "e4.0");
    var i;
    for (i = 0; i < __v.length; i += 2) {
        var _n = __v[i];
        var _v = __v[i + 1];
        cm[_n] = _v;
    }

    // add a random number for cache-busting
    var datestamp = new Date();
    var stamp = (Math.floor(Math.random() * 11111111)) + datestamp.valueOf();
    cm.rnd = stamp;

    // if this is a TechProps tag, call addTP
    if (cm.tid == "6") {
        cm.addTP();
        //UPDATE: use cmSetCookie function instead
        document.cookie = "cmTPSet=Y; path=/";
    }

    // if this is the first pageview in the session, convert it to a TechProps tag
    if (cm.tid == "1") {
        if (cI("cmTPSet") != 'Y') {
            cm.tid = "6";
            cm.pc = "Y";
            cm.addTP();
            //UPDATE: use cmSetCookie function instead
            document.cookie = "cmTPSet=Y; path=/";
        }
    }

    // for backwards compatibility with clients using cmCustom libraries and the old cm_exAttr variable.
    if (cm.cm_exAttr) {
        cm.cmAttributes = cm.cm_exAttr.join("-_-");
        cm.cm_exAttr = null;
    }

    // process attribute and extrafield strings into correct tag parameters
    var cmAttributesMap = {"1": "pv_a","2":"rg","3":"o_a","4":"s_a","5":"pr_a","6":"pv_a","14":"c_a","15":"e_a"};
    var cmExtraFieldsMap = {"1": "pv","2":"rg","3":"or","4":"sx","5":"pr","6":"pv","7":"ps","14":"cx"};
    if (cm.cmAttributes) {
        var tempArray = cm.cmAttributes.split("-_-");
        var name = cmAttributesMap[cm.tid];
        for (i=0;i<tempArray.length;++i){
            cm[name + (i + 1)] = tempArray[i];
        }
        cm.cmAttributes = null;
    }
    if (cm.cmExtraFields) {
        var tempArray = cm.cmExtraFields.split("-_-");
        var name = cmExtraFieldsMap[cm.tid];
        for (i=0;i<tempArray.length;++i){
            cm[name + (i + 1)] = tempArray[i];
        }
        cm.cmExtraFields = null;
    }

    if (cmAutoCopyAttributesToExtraFields) {
        if ((cm.tid != '2') && (cm.tid != '15')) {
            for (var i = 1; i <= 15; ++i) {
                if (!(cm[cmExtraFieldsMap[cm.tid] + "" + i])) {
                    cm[cmExtraFieldsMap[cm.tid] + "" + i] = cm[cmAttributesMap[cm.tid] + "" + i];
                }
            }
        }
    }

    // make sure we have a pageID value for pageview or tags that count as pageview
    if ((cm.pi == null) && ((cm.pc == "Y") || (cm.tid == "1"))) {
        cm.pi = cmGetDefaultPageID();
    }

    // try to get referrer from parent frameset
    try{
        if (parent.cm_ref != null) {
            cm.rf = parent.cm_ref;
            if (cm.pc == "Y") {
                parent.cm_ref = document.URL;
            }
        }

        // if parent had mmc variables and this is the first pageview, add mmc to this url
        if(parent.cm_set_mmc) {
            cm.ul = document.location.href +
                    ((document.location.href.indexOf("?") < 0) ? "?" : "&") +
                    parent.cm_mmc_params;
            if (cm.pc == "Y") {
                parent.cm_ref = cm.ul;
                parent.cm_set_mmc = false;
            }
        }
    }
    catch(err){
        // most likely failed due to browser security restrictions, so do nothing
    }

    // Set the destination and referring URL parameters if not already set
    if (cm.ul == null) {
        cm.ul = cG7.normalizeURL(window.location.href, false);
    }
    if (cm.rf == null) {
        cm.rf = cG7.normalizeURL(document.referrer, false);
    }

    // convert MMC parameters to lowercase
    cm.ul = cm.ul.replace(cmMMCPattern,function(p){return p.toLowerCase();});
    cm.rf = cm.rf.replace(cmMMCPattern,function(p){return p.toLowerCase();});

    //check for manual_cm_mmc parameter and attach to URL if mmc parameter not already in URL
    if ((this.manual_cm_mmc) && (cm.ul.indexOf("cm_mmc") == -1) && (cm.ul.indexOf("cm_ven") == -1)) {
        cm.ul = cm.ul + ((cm.ul.indexOf("&") == -1) ? ((cm.ul.indexOf("?") == -1) ? "?" : "&") : "&") + "cm_mmc=" + this.manual_cm_mmc;
    }

    // check for cm_em or cm_lm parameter and add registration tag to tagset if necessary
    if (cmCheckCMEMFlag){
        cmStartTagSet();
    }
    cm.writeImg();
    if (cmCheckCMEMFlag) {
        cmCheckCMEMFlag = false;
        cmCheckCMEM();
        cmSendTagSet();
    }

    // call IO function if IO enabled
    if (typeof cm_ted_io == 'function') {
        if(cm_IOEnabled) {
            cm_ted_io(cm);
        }
    }
}

// HELPER FUNCTIONS -----------------------------------------------------------


// Creates an acceptable default Page ID value to use for Pageview tags.
// The default Page ID is based on the URL, and consists of the path and
// filename (without the protocol, domain and query string).
//
// example:
// returns "x/y/MyPage.asp" for the URL http://www.mysite.com/x/y/MyPage.asp
function cmGetDefaultPageID() {
    var pageName = window.location.pathname;

    // eliminates everything after "?" (for Opera browswers)
    var tempIndex1 = pageName.indexOf("?");
    if (tempIndex1 != -1) {
        pageName = pageName.substr(0, tempIndex1);
    }
    // eliminates everything after "#" (for Opera browswers)
    var tempIndex2 = pageName.indexOf("#");
    if (tempIndex2 != -1) {
        pageName = pageName.substr(0, tempIndex2);
    }
    // eliminates everything after ";"
    var tempIndex3 = pageName.indexOf(";");
    if (tempIndex3 != -1) {
        pageName = pageName.substr(0, tempIndex3);
    }

    var slashPos = pageName.lastIndexOf("/");
    if (slashPos == pageName.length - 1) {
        pageName = pageName + "default";
    }

    while (pageName.indexOf("/") == 0) {
        pageName = pageName.substr(1,pageName.length);
    }

    return(pageName);
}

// returns the index of paramter within inString or -1 if not found
function cmIndexOfParameter (parameter, inString) {
    return inString.indexOf(parameter);
}

// expects inString to be a correctly formatted URI, returns value of parameter or null if parameter is not present
function cmExtractParameter (parameter, inString) {
    if (cmIndexOfParameter(parameter, inString) == -1) {
        return null;
    }
    var s = inString;
    var begin = s.indexOf(parameter);
    var end = s.indexOf("&", begin);
    if (end == -1) {
        end = s.length;
    }
    var middle = s.indexOf("=", begin);
    return s.substring(middle + 1, end).split("#",1).join("");
}

// expects inString to be a correctly formatted URI, returns URI with parameter name and value removed
function cmRemoveParameter (parameter, inString) {
    if (cmIndexOfParameter(parameter, inString) == -1) {
        return inString;
    }
    var s = inString;
    var begin = s.indexOf(parameter);
    var start = (begin - 1);
    var end = s.indexOf("&", begin);
    if (end == -1) {
        end = s.length;
    }
    if (s.substring(start, begin) == "?") {    // retain leading "?"
        start = (start + 1);
        end = (end + 1);
    }
    return s.substring(0, start) + s.substring(end, s.length);
}

// returns meta tag value or null if not present
function cmGetMetaTag(mn){
  //UPDATE: store meta tags in array and lookup in Array just in case this function gets called more than once
  var m = document.getElementsBytagName('meta');
  for(var i in m){
   if(m[i].name == mn){
     return m[i].content;
   }
  }
  return null;
}

// checks for cm_em or cm_lm parameter and creates registration tag if present
function cmCheckCMEM() {
    if (cmIndexOfParameter("cm_em",document.location.href) != -1){
        var emailAddress = cmExtractParameter("cm_em",document.location.href);
        if (emailAddress.indexOf(":")>-1){
            emailAddress=emailAddress.substring(emailAddress.indexOf(":")+1);
        }
        cmCreateRegistrationTag(emailAddress,emailAddress);
    }
    if (cmIndexOfParameter("cm_lm",document.location.href) != -1){
        var emailAddress = cmExtractParameter("cm_lm",document.location.href);
        if (emailAddress.indexOf(":")>-1){
            emailAddress=emailAddress.substring(emailAddress.indexOf(":")+1);
        }
        cmCreateRegistrationTag(emailAddress,emailAddress);
    }
}

if (defaultNormalize == null) { var defaultNormalize = null; }

function myNormalizeURL(url, isHref) {
    var newURL = url;
    if (!newURL) { newURL = "";}

    var cmTempNormalizeBlackList = cmNormalizeBlackList;
    var cmTempNormalizeWhiteList = cmNormalizeWhiteList;

    if (cmTempNormalizeBlackList) {
        if (isHref) {
            cmTempNormalizeBlackList = cmTempNormalizeBlackList.split("-_-")[0].split(",");
        }
        else {
            if (cmTempNormalizeBlackList.split("-_-")[1]) {
                cmTempNormalizeBlackList = cmTempNormalizeBlackList.split("-_-")[1].split(",");
            }
            else {
                cmTempNormalizeBlackList = null;
            }
        }
    }

    if (cmTempNormalizeWhiteList) {
        if (isHref) {
            cmTempNormalizeWhiteList = cmTempNormalizeWhiteList.split("-_-")[0].split(",");
        }
        else {
            if (cmTempNormalizeWhiteList.split("-_-")[1]) {
                cmTempNormalizeWhiteList = cmTempNormalizeWhiteList.split("-_-")[1].split(",");
            }
            else {
                cmTempNormalizeWhiteList = null;
            }
        }
    }

    var paramString, params;
    var paramIndex = newURL.indexOf("?");
    var keepParams = new Array();

    if ((paramIndex > 0) && (cmTempNormalizeBlackList || cmTempNormalizeWhiteList)) {
        paramString = newURL.substring(paramIndex+1);
        newURL = newURL.substring(0, paramIndex);
        params = paramString.split("&");

        if (cmTempNormalizeBlackList) {
            for(var i=0; i<params.length; i++) {
                goodParam = true;
                for(var j=0; j<cmTempNormalizeBlackList.length; j++) {
                    if (params[i].toLowerCase().indexOf(cmTempNormalizeBlackList[j].toLowerCase() + "=") == 0) {
                        goodParam = false;
                    }
                }
                if(goodParam == true) {
                    keepParams[keepParams.length] = params[i];
                }
            }
        }

        if (cmTempNormalizeWhiteList) {
            for(var i=0; i<params.length; i++) {
                goodParam = false;
                for(var j=0; j<cmTempNormalizeWhiteList.length; j++) {
                    if (params[i].toLowerCase().indexOf(cmTempNormalizeWhiteList[j].toLowerCase() + "=") == 0) {
                        goodParam = true;
                    }
                }
                if(goodParam == true) {
                    keepParams[keepParams.length] = params[i];
                }
            }
        }

        newURL += "?" + keepParams.join("&");
    }

    if (defaultNormalize != null) {
        newURL = defaultNormalize(newURL, isHref);
    }

    return newURL;
}

// install normalization
if (document.cmTagCtl != null) {
    var func = "" + document.cmTagCtl.normalizeURL;
    if (func.indexOf('myNormalizeURL') == -1) {
        defaultNormalize = document.cmTagCtl.normalizeURL;
        document.cmTagCtl.normalizeURL = myNormalizeURL;
    }
}

// hash function to support shop aggregation with attributes
function cm_hex_sha1(s)    { if(s) {return cm_rstr2hex(cm_rstr_sha1(cm_str2rstr_utf8(s))); } else { return null; }}

// internal support functions for hashing, do not call directly
function cm_rstr_sha1(s)
{
  return cm_binb2rstr(cm_binb_sha1(cm_rstr2binb(s), s.length * 8));
}

function cm_rstr2hex(input)
{
  var hex_tab = 0 ? "0123456789ABCDEF" : "0123456789abcdef";
  var output = "";
  var x;
  for(var i = 0; i < input.length; i++)
  {
    x = input.charCodeAt(i);
    output += hex_tab.charAt((x >>> 4) & 0x0F)
           +  hex_tab.charAt( x        & 0x0F);
  }
  return output;
}

function cm_str2rstr_utf8(input)
{
  var output = "";
  var i = -1;
  var x, y;

  while(++i < input.length)
  {
    // Decode utf-16 surrogate pairs
    x = input.charCodeAt(i);
    y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
    if(0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF)
    {
      x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
      i++;
    }

    // Encode output as utf-8
    if(x <= 0x7F)
      output += String.fromCharCode(x);
    else if(x <= 0x7FF)
      output += String.fromCharCode(0xC0 | ((x >>> 6 ) & 0x1F),
                                    0x80 | ( x         & 0x3F));
    else if(x <= 0xFFFF)
      output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
                                    0x80 | ((x >>> 6 ) & 0x3F),
                                    0x80 | ( x         & 0x3F));
    else if(x <= 0x1FFFFF)
      output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
                                    0x80 | ((x >>> 12) & 0x3F),
                                    0x80 | ((x >>> 6 ) & 0x3F),
                                    0x80 | ( x         & 0x3F));
  }
  return output;
}

function cm_rstr2binb(input)
{
  var output = Array(input.length >> 2);
  for(var i = 0; i < output.length; i++)
    output[i] = 0;
  for(var i = 0; i < input.length * 8; i += 8)
    output[i>>5] |= (input.charCodeAt(i / 8) & 0xFF) << (24 - i % 32);
  return output;
}

function cm_binb2rstr(input)
{
  var output = "";
  for(var i = 0; i < input.length * 32; i += 8)
    output += String.fromCharCode((input[i>>5] >>> (24 - i % 32)) & 0xFF);
  return output;
}

function cm_binb_sha1(x, len)
{
  // append padding
  x[len >> 5] |= 0x80 << (24 - len % 32);
  x[((len + 64 >> 9) << 4) + 15] = len;

  var w = Array(80);
  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;
  var e = -1009589776;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    var olde = e;

    for(var j = 0; j < 80; j++)
    {
      if(j < 16) w[j] = x[i + j];
      else w[j] = cm_bit_rol(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1);
      var t = cm_safe_add(cm_safe_add(cm_bit_rol(a, 5), cm_sha1_ft(j, b, c, d)),
                       cm_safe_add(cm_safe_add(e, w[j]), cm_sha1_kt(j)));
      e = d;
      d = c;
      c = cm_bit_rol(b, 30);
      b = a;
      a = t;
    }

    a = cm_safe_add(a, olda);
    b = cm_safe_add(b, oldb);
    c = cm_safe_add(c, oldc);
    d = cm_safe_add(d, oldd);
    e = cm_safe_add(e, olde);
  }
  return Array(a, b, c, d, e);

}

function cm_sha1_ft(t, b, c, d)
{
  if(t < 20) return (b & c) | ((~b) & d);
  if(t < 40) return b ^ c ^ d;
  if(t < 60) return (b & c) | (b & d) | (c & d);
  return b ^ c ^ d;
}

function cm_sha1_kt(t)
{
  return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
         (t < 60) ? -1894007588 : -899497514;
}

function cm_safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

function cm_bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

// $Id: coremetrics.js 191566 2012-03-29 19:36:36Z pvegiraju $
var _io_request=new IORequest();
var _io_config=undefined;
var _io_zone=undefined;
var _io_state=new IOState();
if(typeof console==="undefined"||typeof console.log==="undefined"||typeof console.group==="undefined"){
var console={log:function(){
},warn:function(){
},error:function(){
},dir:function(){
},group:function(){
},groupEnd:function(){
},debug:function(){
},info:function(){
},assert:function(){
},count:function(){
},dirxml:function(){
},profile:function(){
},profileEnd:function(){
},time:function(){
},timeEnd:function(){
},trace:function(){
}};
}
function cm_ted_io(_1){
_io_state.cm_ted_io(_1);
};
function _cm_io_rec(_2){
if(_io_request!==undefined){
_io_request.cm_io_rec(_2);
}
};
function _cm_io_cfg(_3){
if(_io_request!==undefined){
_io_request.cm_io_cfg(_3,1);
}
};
function cmRecRequest(_4,_5,_6,_7,_8){
IORequest.rec_request(_4,_5.toString().toUpperCase(),_6.toString().toUpperCase(),_7,_8);
};
function cmDisplayRecs(){
IORequest.display_recs();
};
function IORequest(_9){
var _a="io_config.js";
var _b="V4";
this.h_timer=undefined;
this.h_script=undefined;
this.xmlHttp=undefined;
this.i_timeout=0;
this.request_type="";
this.action_callback=function(_c){
return;
};
this.display_status=function(_d,_e){
return;
};
this.display_product_table=function(_f){
return;
};
this.display_product_images=function(_10){
return;
};
this.display_config=function(_11){
return;
};
this.cm_alert=function(_12){
if(!IORequest.production){
alert(_12);
}
};
IOStopWatch=function(){
this.start=function(){
this.elapsed_time=0;
this.t_start=new Date().getTime();
};
this.stop=function(){
this.elapsed_time=new Date().getTime()-this.t_start;
return (this.elapsed_time);
};
};
this.stop_watch=new IOStopWatch("stop_watch");
this.ajax_timeout=function(_13){
if(_io_request.xmlHttp!==undefined){
try{
if(_io_request.xmlHttp.abort!==undefined){
if(typeof _io_request.xmlHttp.abort=="function"){
_io_request.xmlHttp.abort();
}
}
}
catch(e){
_io_request.display_status("IE - no abort property of the xmlHttp request object");
}
}
IORequest.b_timeout=true;
if(_13){
_io_request.action_callback("config_timeout");
IORequest.i_zone=0;
setTimeout("IORequest.config_download_failure(\"ajax timeout\");",0);
}else{
_io_request.display_status("Ajax timeout downloading product ("+_io_request.stop_watch.elapsed_time+"ms)","red");
IORequest.log(IORequest.log_warn,"Ajax timeout downloading product",_io_request.stop_watch.elapsed_time+" ms");
_io_request.download_product();
}
};
function _14(){
if(window.XMLHttpRequest){
return new XMLHttpRequest();
}else{
if(window.ActiveXObject){
}else{
return null;
}
}
};
this.javascript_timeout=function(_15){
if(IORequest.h_script!==undefined){
var h=document.getElementsByTagName("head").item(0);
if(h){
h.removeChild(IORequest.h_script);
IORequest.h_script=undefined;
}
}
_io_request.stop_watch.stop();
IORequest.timeout_product[IORequest.offer_id+IORequest.request_crc]=1;
if(_15){
_io_request.action_callback("config_timeout");
IORequest.i_zone=0;
setTimeout("IORequest.config_download_failure(\"javascript timeout\");",0);
}else{
_io_request.display_status("JavaScript timeout downloading product ("+_io_request.stop_watch.elapsed_time+"ms)","blue");
IORequest.log(IORequest.log_warn,"JavaScript timeout downloading product",_io_request.stop_watch.elapsed_time+" ms");
if((_io_config.file_not_found_pc!==undefined)&&(_io_config.file_not_found_pc>Math.floor(Math.random()*100))){
var id=IORequest.offer_type+IORequest.offer_id+"|"+IORequest.request_crc+"|"+(IORequest.offer_type=="P"?IORequest.plain_text_product_id:(IORequest.offer_type=="S"?IORequest.plain_text_search_id:IORequest.plain_text_cat_id));
cmCreatePageElementTag(id,_io_config.file_not_found_id);
IORequest.log(IORequest.log_trace,"page element tag for file not found",id);
}
_io_request.download_product();
}
};
this.stateChanged=function(){
if(_io_request.xmlHttp.readyState==4){
clearTimeout(_io_request.h_timer);
_io_request.h_timer=undefined;
if(_io_request.xmlHttp.status==200){
var txt=_io_request.xmlHttp.responseText;
eval(txt);
}else{
if(_io_request.xmlHttp.status==404){
_io_request.display_status("Ajax - Requested File not found on server - "+_io_request.xmlHttp.status+". Next step in recommendation plan attempted","blue");
IORequest.log(IORequest.log_warn,"Ajax - Requested File not found on server - "+_io_request.xmlHttp.status,"next step in recommendation plan attempted");
IORequest.b_404=true;
if(_io_request.request_type=="config"){
setTimeout("IORequest.config_download_failure(\"ajax 404\");",0);
}else{
if(_io_request.request_type=="product"){
_io_request.download_product();
}
}
}else{
_io_request.display_status("Ajax - Unexpected status from stateChanged: "+_io_request.xmlHttp.status+".","red");
IORequest.log(IORequest.log_error,"Ajax - Unexpected status from stateChanged",_io_request.xmlHttp.status);
IORequest.b_404=true;
if(_io_request.request_type=="config"){
setTimeout("IORequest.config_download_failure(\"ajax 404\");",0);
}else{
if(_io_request.request_type=="product"){
_io_request.download_product();
}
}
}
}
}else{
}
};
this.get_target_from_plan=function(_16,_17){
if(IORequest.current_step>=_16.rec_steps.length){
return ("_SE_");
}
var _18=_16.rec_steps[IORequest.current_step];
IORequest.log(IORequest.log_trace,"step: "+IORequest.current_step+" offer_id: "+_18.offer_id+" type: "+_18.offer_type+" target",_18.target_id);
if(_18.target_id=="_NR_"){
return ("_NR_");
}
if(_18.target_id=="_DPF_"){
return ("_DPF_");
}
if(_17&&_18.offer_type=="P"){
IORequest.current_step++;
this.display_status("Looking for Category - found Product: "+_18.target_id+".  Continuing to next step.","green");
IORequest.log(IORequest.log_trace,"Looking for Category - found Product: "+_18.target_id+".  Continuing to next step.");
return (this.get_target_from_plan(_16,1));
}
if(_18.target_id=="_SP_"){
if(IORequest.product_id==""){
IORequest.current_step++;
this.display_status("No product id specified. Continuing to next step.","blue");
IORequest.log(IORequest.log_warn,"No product id specified.  Continuing to next step.");
return (this.get_target_from_plan(_16));
}else{
return (IORequest.product_id);
}
}
if(_18.target_id=="_SC_"){
if(IORequest.category_id==""){
IORequest.current_step++;
this.display_status("No category id specified. Continuing to next step.","blue");
IORequest.log(IORequest.log_warn,"No category id specified.  Continuing to next step.");
return (this.get_target_from_plan(_16));
}else{
return (IORequest.category_id);
}
}
if(_18.target_id=="_SS_"){
if(IOConfig.crc_specified_search==""){
IORequest.current_step++;
this.display_status("No search term specified. Continuing to next step.","blue");
IORequest.log(IORequest.log_warn,"No search term specified.  Continuing to next step.");
return (this.get_target_from_plan(_16));
}else{
return (IOConfig.crc_specified_search);
}
}
if(_18.target_id=="_RVP_"||_18.target_id=="_RVC_"||_18.target_id=="_LCP_"||_18.target_id=="_RPP_"||_18.target_id=="_MPC_"){
var rc=_io_state.cm_get_product_from_cookie(_18.target_id);
if(rc===0){
IORequest.current_step++;
this.display_status("No "+_18.target_id+"available. Continuing to next step.","green");
IORequest.log(IORequest.log_trace,"No "+_18.target_id+" available.  Continuing to next step.");
return (this.get_target_from_plan(_16));
}else{
return (rc);
}
}
this.display_status("unrecognized target id: "+_18.target_id+".","red");
IORequest.log(IORequest.log_error,"unrecognized target id",_18.target_id);
return ("_NR_");
};
this.issue_page_element_tag=function(_19){
if(IORequest.perm_cookie_not_supported===false){
var _1a=IORequest.find_cookie(IORequest.ses_cookie);
if(_1a===undefined){
var _1b=new Date().getTime().toString();
_1a=IORequest.set_and_check_cookie(IORequest.ses_cookie,"S"+_1b+"|",true);
if(!_1a){
return;
}
}
if(_1a.indexOf("|"+_19[0]+"|")==-1){
IORequest.log(IORequest.log_trace,"issued page element tag "+_19[1],_19[0]);
IORequest.log(IORequest.log_trace,"session cookie",_1a);
IORequest.set_and_check_cookie(IORequest.ses_cookie,_1a+_19[0]+"|",true);
cmCreatePageElementTag(_19[1],_19[0]);
}
}
};
this.get_client_id=function(){
var _1c;
if(IORequest.client_id_override!==undefined){
_1c=IORequest.client_id_override;
}else{
if(cm_ClientID!==undefined){
var _1d=cm_ClientID.split(";");
if(_1d[0]!==undefined){
_1c=_1d[0];
}
}else{
_1c=IORequest.client_id;
}
if(IORequest.find_cookie(IORequest.test_cookie)===undefined){
if(_1c.substr(0,1)=="6"){
IORequest.log(IORequest.log_trace,"Retrieving data from client 9"+_1c.substr(1,_1c.length-1)+" instead of test client "+_1c);
_1c="9"+_1c.substr(1,_1c.length-1);
}
}
}
return _1c;
};
this.download_product=function(){
IORequest.current_step++;
this.io_zone=_io_config.zones[IORequest.zone_id];
var _1e="''";
if(this.io_zone.ab_test_id!="no ab test"){
this.issue_page_element_tag(this.io_zone.ab_test_id.split(":"));
_1e="'"+this.io_zone.ab_test_id+"'";
}
IORequest.log(IORequest.log_trace,"ab test id",this.io_zone.ab_test_id);
if(!this.io_zone.rec_plan){
this.cm_alert("rec_plan not defined - zone_id: "+IORequest.zone_id);
}
var rc=this.get_target_from_plan(this.io_zone.rec_plan,IORequest.b_timeout||IORequest.b_404);
this.action_callback("recommendation_plan");
if(rc=="_DPF_"&&(IORequest.default_product_file!==undefined)){
_io_request.cm_io_rec(IORequest.default_product_file);
return (0);
}
if(rc=="_SE_"||rc=="_NR_"||rc=="_DPF_"){
var _1f="";
if(rc=="_SE_"){
this.display_status("steps exhausted. Calling zone population function "+this.io_zone.zpf+" without recommendations.","blue");
IORequest.log(IORequest.log_warn,"steps exhausted - calling zone population function without recommendations",this.io_zone.zpf);
_1f="Steps exhausted.  No recommendations found";
}else{
this.display_status("calling zone population function "+this.io_zone.zpf+" without recommendations (_NR_)","blue");
IORequest.log(IORequest.log_warn,"calling zone population function without recommendations",this.io_zone.zpf);
_1f="No recommendations found";
}
if(this.io_zone.zpf!==undefined){
var _20="[],'"+this.io_zone.name+"','_NR_','','',[],[],'"+_1f+"',"+_1e;
var zpf=this.io_zone.zpf+"("+_20+")";
IORequest.log(IORequest.log_trace,"Calling zone population function",zpf);
setTimeout(zpf,0);
}else{
this.display_status("Zone population function "+this.io_zone.name+"_zp is not defined.","red");
IORequest.log(IORequest.log_error,"Zone population function ",this.io_zone.name+"_zp is not defined");
}
setTimeout("IORequest.stack_manager(\"rc: "+rc+"\");",0);
return (0);
}
var _21=rc;
this.offer_id=this.io_zone.rec_plan.rec_steps[IORequest.current_step].offer_id;
this.cgi_version=this.io_zone.rec_plan.rec_steps[IORequest.current_step].offer_version;
this.offer_type=this.io_zone.rec_plan.rec_steps[IORequest.current_step].offer_type;
if(((this.offer_type=="C")&&IORequest.encrypt_cats)||((this.offer_type=="E")&&IORequest.encrypt_cats)||(this.offer_type=="S")||((this.offer_type=="P")&&IORequest.encrypt_prds)){
this.prod_id_crc=_21;
}else{
this.prod_id_crc=IORequest.hex32(IORequest.crc32_str(_21));
}
IORequest.request_crc=this.prod_id_crc;
IORequest.offer_type=this.offer_type;
IORequest.offer_id=this.offer_id;
this.group=this.prod_id_crc.substr(0,2);
var _22=((window.location.protocol=="https:"&&IORequest.access_method=="json remote")?IORequest.url_prefix["json remote https"]:IORequest.url_prefix[IORequest.access_method]);
var _23="?V="+this.cgi_version;
if(_io_config.vcgi=="N"){
_23="";
}
this.url=_22+this.get_client_id()+"/"+_b+"/"+this.offer_type+this.offer_id+"/"+this.offer_type+this.group+"/"+this.prod_id_crc+".js"+_23;
this.display_status("retrieving IO file product ID: "+_21+" url: "+this.url,"green");
IORequest.log(IORequest.log_trace,"retrieving IO file product "+_21+" - url",this.url);
this.action_callback("product_request");
if((IORequest.access_method=="ajax local")||(IORequest.access_method=="ajax remote")){
this.xmlHttp=_14();
if(this.xmlHttp===null){
this.cm_alert("Your browser really does not support Ajax!");
return;
}
this.h_timer=setTimeout("_io_request.ajax_timeout(0)",IORequest.timeout[this.i_timeout]);
this.i_timeout=1;
this.request_type="product";
this.xmlHttp.onreadystatechange=this.stateChanged;
this.stop_watch.start();
try{
this.xmlHttp.open("GET",this.url,true);
}
catch(e){
clearTimeout(this.h_timer);
this.display_status("Ajax Error: Cross Domain request attempted.  Ajax not supported.  Try json x-domain.","red");
IORequest.rec_request_abort();
}
try{
this.xmlHttp.send(null);
}
catch(e1){
clearTimeout(this.h_timer);
this.display_status("Ajax Error: Host not found.  Ajax not supported.  Try json x-domain.","red");
IORequest.rec_request_abort();
}
}else{
var _24=(this.io_zone.rec_plan.rec_steps[IORequest.current_step].target_id=="_SS_"?IOConfig.sfto:IORequest.timeout[this.i_timeout]);
this.h_timer=setTimeout("_io_request.javascript_timeout(0)",_24);
this.i_timeout=1;
this.stop_watch.start();
try{
var h=document.getElementsByTagName("head").item(0);
IORequest.h_script=document.createElement("script");
IORequest.h_script.setAttribute("language","javascript");
IORequest.h_script.setAttribute("type","text/javascript");
IORequest.h_script.setAttribute("charset","UTF-8");
IORequest.h_script.setAttribute("src",this.url);
h.appendChild(IORequest.h_script);
}
catch(e2){
IORequest.rec_request_abort();
}
}
};
this.download_config=function(){
var _25=((window.location.protocol=="https:"&&IORequest.access_method=="json remote")?IORequest.url_prefix["json remote https"]:IORequest.url_prefix[IORequest.access_method]);
this.url=_25+this.get_client_id()+"/"+_a+"?ts="+(((new Date().getTime())/600000)|0);
this.display_status("retrieving IO Config file: "+_a+" url: "+this.url,"green");
IORequest.log(IORequest.log_trace,"retrieving IO config file "+_a,this.url);
this.action_callback("config_request");
if((IORequest.access_method=="ajax local")||(IORequest.access_method=="ajax remote")){
this.xmlHttp=_14();
if(this.xmlHttp===null){
this.cm_alert("Your browser really does not support Ajax!");
return;
}
this.h_timer=setTimeout("_io_request.ajax_timeout(1)",IORequest.timeout[this.i_timeout]);
this.i_timeout=1;
this.request_type="config";
this.xmlHttp.onreadystatechange=this.stateChanged;
this.stop_watch.start();
try{
this.xmlHttp.open("GET",this.url,true);
}
catch(e){
clearTimeout(this.h_timer);
this.display_status("Ajax Error: Cross Domain request attempted.  Ajax not supported.  Try json x-domain.","red");
IORequest.rec_request_abort();
}
try{
this.xmlHttp.send(null);
}
catch(e1){
clearTimeout(this.h_timer);
this.display_status("Ajax Error: Host not found.  Ajax not supported.  Try json x-domain.","red");
IORequest.rec_request_abort();
}
}else{
this.h_timer=setTimeout("_io_request.javascript_timeout(1)",IORequest.timeout[this.i_timeout]);
this.i_timeout=1;
this.stop_watch.start();
try{
var h=document.getElementsByTagName("head").item(0);
var js=document.createElement("script");
js.setAttribute("language","javascript");
js.setAttribute("type","text/javascript");
js.setAttribute("src",this.url);
h.appendChild(js);
}
catch(e2){
IORequest.rec_request_abort();
}
}
};
this.cm_io_rec=function(_26){
this.stop_watch.stop();
if(this.h_timer!==undefined){
clearTimeout(this.h_timer);
this.h_timer=undefined;
}
if(this.io_zone.zpf!==undefined){
if(_26!==undefined){
var _27=_26.pd[0][0];
var _28=_26.hd[6];
var _29=_26.hd[2];
var _2a=_26.hd[3];
var _2b=_26.hd[5];
if(_2b==0){
this.display_status("Downloaded product file contains no recommendations.  Continuing to next step.","blue");
IORequest.log(IORequest.log_warn,"Downloaded product file contains no recommendations.  Continuing to next step.");
this.download_product();
}else{
if(_29=="S"){
_27=IORequest.raw_search_term.replace(/"/g,"\\\"");
}
if((_28!==undefined)&&(_28.length==8)&&(IORequest.timeout_product[_2a+_28])){
IORequest.log(IORequest.log_trace,"Product download attempt following timeout for same file.  Requested file CRC",IORequest.request_crc);
IORequest.timeout_product[_2a+_28]=0;
return;
}
this.display_status("Successful download of IO Recommendations for product: "+_27+" <font color=\"black\">("+this.stop_watch.elapsed_time+" ms)</font>.","green");
IORequest.log(IORequest.log_trace,"successful retrieval of IO Recommendations for product "+_27,this.stop_watch.elapsed_time+" ms");
IORequest.log(IORequest.log_iuo,"requested version: "+this.cgi_version+" returned version",_26.hd[9]);
IORequest.log(IORequest.log_product_file,"product file",_26);
var _2c=[];
var _2d=[];
var _2e=[];
if(_29=="P"){
if((IOConfig.category_structure=="E")&&(_26.pd[0][2])){
_io_state.cm_ted_io({i_offer:"epr_category",cg:_26.pd[0][2].toString().toUpperCase()});
}
if((+IOConfig.brand_personalization[0])!=-1){
var _2f=(+IOConfig.brand_personalization[0])+3;
_io_state.cm_ted_io({i_offer:"brand",brn:_26.pd[0][_2f]});
}
}
var _30=[];
var mpc=_io_state.cm_get_product_from_cookie("_MPC_");
for(var _31=1;_31<_26.pd.length;_31++){
_30[_31-1]=[];
_30[_31-1][0]=_31;
if((IORequest.optional_parm=="R")&&(_29!="P")){
_30[_31-1][1]=Math.floor(Math.random()*1000);
}else{
var _32=(IORequest.encrypt_cats?IORequest.hex32(IORequest.crc32_str(_26.pd[_31][2])):_26.pd[_31][2]);
_30[_31-1][1]=_26.pd[_31][1]*((_32==mpc)?_io_config.cp:1);
}
}
_30.sort(function(a,b){
return (b[1]-a[1]);
});
if((IOConfig.brand_personalization[1]!=-1)){
var mpb=_io_state.cm_get_product_from_cookie("_MPB_");
if(mpb!==0){
for(var _33=1;_33<_26.pd.length;_33++){
_30[_33-1]=[];
_30[_33-1][0]=_33;
var _34=_26.pd[_33][(+IOConfig.brand_personalization[0])+3];
var _35=IORequest.hex32(IORequest.crc32_str(_34));
_30[_33-1][1]=_26.pd[_33][1]*((_35==mpb)?(+IOConfig.brand_personalization[1]):1);
}
_30.sort(function(a,b){
return (b[1]-a[1]);
});
}
}
l_attribute_array=_26.pd[0].length;
for(var _36=3;_36<l_attribute_array;_36++){
var _37=((_26.ap!==undefined&&_26.ap[_36-3]!==undefined)?_26.ap[_36-3]:"");
_2e.push((_26.pd[0][_36]===undefined)?undefined:_37+_26.pd[0][_36].replace(/"/g,"\\\""));
}
var _38=[];
var _39=[];
if(this.io_zone.filter_cp){
var acp=_io_state.cm_get_product_from_cookie("_ACP_");
for(var _3a=0;_3a<acp.length;_3a++){
if(IORequest.encrypt_prds){
_38[acp[_3a]]=1;
}else{
_39[acp[_3a]]=1;
}
}
}
if(this.io_zone.filter_pp){
var app=_io_state.cm_get_product_from_cookie("_APP_");
for(var _3b=0;_3b<app.length;_3b++){
if(IORequest.encrypt_prds){
_38[app[_3b]]=1;
}else{
_39[app[_3b]]=1;
}
}
}
for(var _3c=0;_3c<_io_config.bad_list.length;_3c++){
_38[_io_config.bad_list[_3c]]=1;
}
IORequest.reason=[];
var _3d=(IORequest.is_undefined(_26.ra)?0:_26.ra.length);
for(var ii=0;((_2c.length<this.io_zone.n_recs)&&(ii<_30.length));ii++){
var _3e=_30[ii][0];
var _3f=_26.pd[_3e][0];
var _40=IORequest.hex32(IORequest.crc32_str(_3f));
IORequest.reason[_3f]=6;
var _41=_3f.replace(/"/g,"\\\"");
var _42=true;
if((IORequest.filtered_out_products[_3f]===undefined)&&(_39[_3f]===undefined)&&(_38[_40]===undefined)&&(IOState.h_productview_product[_3f]===undefined)){
var _43=[];
for(var _44=3;((_44<_26.pd[_3e].length)&&(_42===true));_44++){
if((_3d>(_44-3))&&(_26.ra[_44-3])&&!(_26.pd[_3e][_44])){
_42=false;
}else{
var _45=((!IORequest.is_undefined(_26.ap)&&_26.ap[_44-3]!==undefined)?_26.ap[_44-3]:"");
_43.push((_26.pd[_3e][_44]===undefined)?undefined:_45+_26.pd[_3e][_44].replace(/"/g,"\\\""));
}
}
if(_42){
_2c.push(_41);
if(IORequest.conflict_resolution===true){
IORequest.filtered_out_products[_3f]=1;
}
_2d.push("[\""+_43.join("\",\"")+"\"]");
}else{
IORequest.log(IORequest.log_trace,_41+" required attribute not present","not sent to zpf");
IORequest.reason[_3f]=1;
}
}else{
if((_39[_3f]!==undefined)||(_38[_40]!==undefined)){
IORequest.log(IORequest.log_trace,_41+" recently carted, purchased, or in bad product list","not sent to zpf");
IORequest.reason[_3f]=2;
}else{
if(IORequest.filtered_out_products[_3f]!==undefined){
IORequest.log(IORequest.log_trace,_41+" appears in previous zone","not sent to zpf");
IORequest.reason[_3f]=3;
}else{
if(IOState.h_productview_product[_3f]!==undefined){
IORequest.log(IORequest.log_trace,_41+" appears in the recommendation list but is also a product for which a product view tag was issued for this page","not sent to zpf");
IORequest.reason[_3f]=5;
}
}
}
}
}
this.display_product_table(_26,_2c);
this.display_product_images(_26,_2c);
var _46=[];
_46._SP_="Recommendations from a product you recently viewed";
_46._SC_="Recommendations from a category you recently viewed";
_46._NR_="No Recs";
_46._RVP_="Recommendations from a product you recently viewed";
_46._LCP_="Recommendations from a product you recently added to your cart";
_46._RPP_="Recommendations from a Product you recently purchased";
_46._RVC_="Recommendations from a category you recently viewed";
_46._MPC_="Recommendations from your favorite category";
_46._DPF_="Recommendations from your favorite retail store";
var _47=[];
var _48=_2c.length?true:false;
var _49=_48?this.io_zone.rec_plan.rec_steps[IORequest.current_step].target_id:"_NR_";
if(!_48){
IORequest.log(IORequest.log_trace,"No recommendations made it through the filters","changing target symbolic from "+this.io_zone.rec_plan.rec_steps[IORequest.current_step].target_id+" to _NR_.");
}
var _4a=this.io_zone.rec_plan.rec_steps[IORequest.current_step].heading||_46[_49];
_47.push(_48?"[\""+_2c.join("\",\"")+"\"]":"[]");
_47.push("\""+this.io_zone.name+"\"");
_47.push("\""+_49+"\"");
_47.push("\""+_27+"\"");
_47.push("\""+_26.pd[0][2]+"\"");
_47.push("["+_2d.join()+"]");
_47.push("[\""+_2e.join("\",\"")+"\"]");
_47.push("\""+_4a+"\"");
_47.push("\""+(this.io_zone.ab_test_id||"")+"\"");
var _4b=this.io_zone.zpf+"("+_47.join()+")";
if(this.io_zone.zpf!==undefined){
IORequest.log(IORequest.log_trace,"Calling zone population function",_4b);
setTimeout(_4b,0);
}
setTimeout("IORequest.stack_manager(\"successful product retrieval\");",0);
}
}else{
setTimeout("IORequest.stack_manager(\"successful product retrieval\");",0);
}
}else{
this.display_status("Zone population function "+this.io_zone.name+"_zp is not defined.","red");
IORequest.log(IORequest.log_error,"Zone population function ",this.io_zone.name+"_zp is not defined");
}
};
this.cm_io_cfg=function(_4c,_4d){
this.stop_watch.stop();
clearTimeout(_io_request.h_timer);
_io_request.h_timer=undefined;
if(_io_config===undefined){
if(_4c!==undefined){
this.action_callback(_4d?"server_cfg":"default_cfg");
IORequest.log(IORequest.log_trace,"successful retrieval of config file",this.stop_watch.elapsed_time+" ms");
IORequest.log(IORequest.log_config_file,"config file",_4c);
if(_4c.zp!==undefined){
_io_config=new IOConfig(_4c);
this.action_callback("config_return");
}else{
setTimeout("IORequest.config_download_failure(\"corrupt config file\");",0);
}
if(_4d){
IORequest.i_zone=0;
setTimeout("IORequest.config_downloaded(\"successful config download\");",0);
}
}
}else{
IORequest.log(IORequest.log_warn,"config request where _io_config already defined","aborting request");
}
};
};
IORequest.crc32_tab=[0,1996959894,3993919788,2567524794,124634137,1886057615,3915621685,2657392035,249268274,2044508324,3772115230,2547177864,162941995,2125561021,3887607047,2428444049,498536548,1789927666,4089016648,2227061214,450548861,1843258603,4107580753,2211677639,325883990,1684777152,4251122042,2321926636,335633487,1661365465,4195302755,2366115317,997073096,1281953886,3579855332,2724688242,1006888145,1258607687,3524101629,2768942443,901097722,1119000684,3686517206,2898065728,853044451,1172266101,3705015759,2882616665,651767980,1373503546,3369554304,3218104598,565507253,1454621731,3485111705,3099436303,671266974,1594198024,3322730930,2970347812,795835527,1483230225,3244367275,3060149565,1994146192,31158534,2563907772,4023717930,1907459465,112637215,2680153253,3904427059,2013776290,251722036,2517215374,3775830040,2137656763,141376813,2439277719,3865271297,1802195444,476864866,2238001368,4066508878,1812370925,453092731,2181625025,4111451223,1706088902,314042704,2344532202,4240017532,1658658271,366619977,2362670323,4224994405,1303535960,984961486,2747007092,3569037538,1256170817,1037604311,2765210733,3554079995,1131014506,879679996,2909243462,3663771856,1141124467,855842277,2852801631,3708648649,1342533948,654459306,3188396048,3373015174,1466479909,544179635,3110523913,3462522015,1591671054,702138776,2966460450,3352799412,1504918807,783551873,3082640443,3233442989,3988292384,2596254646,62317068,1957810842,3939845945,2647816111,81470997,1943803523,3814918930,2489596804,225274430,2053790376,3826175755,2466906013,167816743,2097651377,4027552580,2265490386,503444072,1762050814,4150417245,2154129355,426522225,1852507879,4275313526,2312317920,282753626,1742555852,4189708143,2394877945,397917763,1622183637,3604390888,2714866558,953729732,1340076626,3518719985,2797360999,1068828381,1219638859,3624741850,2936675148,906185462,1090812512,3747672003,2825379669,829329135,1181335161,3412177804,3160834842,628085408,1382605366,3423369109,3138078467,570562233,1426400815,3317316542,2998733608,733239954,1555261956,3268935591,3050360625,752459403,1541320221,2607071920,3965973030,1969922972,40735498,2617837225,3943577151,1913087877,83908371,2512341634,3803740692,2075208622,213261112,2463272603,3855990285,2094854071,198958881,2262029012,4057260610,1759359992,534414190,2176718541,4139329115,1873836001,414664567,2282248934,4279200368,1711684554,285281116,2405801727,4167216745,1634467795,376229701,2685067896,3608007406,1308918612,956543938,2808555105,3495958263,1231636301,1047427035,2932959818,3654703836,1088359270,936918000,2847714899,3736837829,1202900863,817233897,3183342108,3401237130,1404277552,615818150,3134207493,3453421203,1423857449,601450431,3009837614,3294710456,1567103746,711928724,3020668471,3272380065,1510334235,755167117];
IORequest.crc32_add=function(crc,c){
return IORequest.crc32_tab[(crc^c)&255]^((crc>>8)&16777215);
};
IORequest.crc32_str=function(str){
var n;
var len=str.length;
var crc;
crc=4294967295;
for(n=0;n<len;n++){
crc=IORequest.crc32_add(crc,str.charCodeAt(n));
}
return crc^4294967295;
};
IORequest.hex32=function(val){
var n;
var _4e;
var _4f;
n=val&65535;
_4e=n.toString(16).toUpperCase();
while(_4e.length<4){
_4e="0"+_4e;
}
n=(val>>>16)&65535;
_4f=n.toString(16).toUpperCase();
while(_4f.length<4){
_4f="0"+_4f;
}
return _4f+_4e;
};
IORequest.cookie_info=function(_50,_51){
var c=document.cookie;
var l=c.length;
var n=c.split(";").length;
IORequest.log(IORequest.log_trace,"cookie_length: "+l+" number of cookies",IORequest.cookie_count(_50));
IORequest.log(IORequest.log_trace,"cookie",c);
alert("n: "+n+" l: "+l+" cookie: "+c);
if(_51){
var _52=_51-l-3-_50.length;
var _53="";
for(var i=0;i<_52;i++){
_53+=""+i%10;
}
IORequest.set_and_check_cookie(_50,_53);
IORequest.cookie_info(_50);
}
};
IORequest.cookie_count=function(_54){
var c=document.cookie;
var n=0;
if(c){
n=c.split(";").length;
}
return n;
};
IORequest.find_cookie=function(_55){
var _56=document.cookie.split("; ");
var _57=_55.length;
for(var _58=0;_58<_56.length;_58++){
if((_55+"=")==_56[_58].substring(0,_57+1)){
return (_56[_58].substring(_57+1));
}
}
return (undefined);
};
IORequest.rm_cookie=function(_59){
document.cookie=_59+"=;path=/;expires="+new Date(1998,0).toGMTString()+";;";
};
IORequest.set_and_check_cookie=function(_5a,_5b,_5c,_5d){
document.cookie=_5a+"="+_5b+";path=/"+(_5c?"":";expires="+new Date(2020,0).toGMTString())+(_5d?";domain="+_5d:"");
_5b=IORequest.find_cookie(_5a);
if(_5b===undefined){
if(!_5c){
IORequest.perm_cookie_not_supported=true;
}
}
return (_5b);
};
IORequest.build_array_from_cookie=function(_5e){
var _5f=IORequest.find_state_cookie();
return ((_5f===undefined)?undefined:(_5f.split(IORequest.cookie_separator))[_5e]);
};
IORequest.find_state_cookie=function(){
if(IORequest.vanity_suffix===undefined){
if(cm_JSFPCookieDomain===null||cm_JSFPCookieDomain===undefined){
var _60=document.domain;
if(_60){
var re=/[^.]+\.[^.]+$/;
IORequest.vanity_suffix="."+_60.match(re);
}
}else{
IORequest.vanity_suffix=cm_JSFPCookieDomain;
}
}
var _61=IORequest.find_cookie(IORequest.state_cookie);
if(_61===undefined){
var _62=((IORequest.ie_version()!==null)&&(IORequest.ie_version()<7))?20:30;
if(IORequest.cookie_count()>=_62){
_61=undefined;
}else{
var rn=Math.floor(Math.random()*100);
_61=[rn,IOConfig.version,IOConfig.brand_personalization[0],IOConfig.brand_personalization[1],IOConfig.category_structure,IORequest.a_max_elements[0],IORequest.a_max_elements[1],IORequest.a_max_elements[2],IORequest.a_max_elements[3],IORequest.a_max_elements[4],IORequest.a_max_elements[5],IORequest.a_max_elements[6]].join("~")+IORequest.cookie_separator+IORequest.cookie_separator+IORequest.cookie_separator+IORequest.cookie_array_separator+IORequest.cookie_array_separator+IORequest.cookie_array_separator+IORequest.cookie_array_separator+IORequest.cookie_array_separator+IORequest.cookie_array_separator;
var _63=_61;
_61=IORequest.set_and_check_cookie(IORequest.state_cookie,_63,false,IORequest.vanity_suffix);
}
}
return (_61);
};
IORequest.default_json={"zp":[{"id":"Default_Zone","rp":[["001",0,99,3]]}],"rp":{"001":[["101","_DPF_","0","You might be interested in"]]},"oa":{"101":["4","P"]}};
IORequest.i_zone=1;
IORequest.i_msg=0;
IORequest.rec_stack=[];
IORequest.filtered_out_products=[];
IORequest.b_timeout=false;
IORequest.b_404=false;
IORequest.zone_id=0;
IORequest.product_id=0;
IORequest.category_id=0;
IORequest.raw_search_term="";
IORequest.current_step=-1;
IORequest.timeout_product=[];
IORequest.cookie_separator="~|~";
IORequest.cookie_array_separator="|";
IORequest.ses_cookie="CoreM_Ses";
IORequest.state_cookie="CoreM_State";
IORequest.test_cookie="CoreM_State_Test";
IORequest.no_log_cookie="CoreM_State_No_Log";
IORequest.recently_viewed_product=undefined;
IORequest.recently_viewed_category=undefined;
IORequest.perm_cookie_not_supported=false;
IORequest.access_method="json local";
IORequest.ab_group_number=undefined;
IORequest.log_cookie_write=2<<1;
IORequest.log_config_file=2<<2;
IORequest.log_product_file=2<<3;
IORequest.log_trace=2<<4;
IORequest.log_warn=2<<5;
IORequest.log_error=2<<6;
IORequest.log_iuo=2<<7;
IORequest.production=false;
IORequest.log_mask=IORequest.production?IORequest.log_error:(2<<16)-1;
IORequest.log_mask=IORequest.log_mask&~IORequest.log_iuo;
IORequest.log=function(bit,_64,_65){
if(IORequest.find_cookie(IORequest.no_log_cookie)===undefined){
if(_65!==undefined){
_64=_64+": "+_65;
}
if(bit==IORequest.log_product_file||bit==IORequest.log_config_file){
console.group();
console.dir(_65);
console.groupEnd();
}else{
if(bit==IORequest.log_warn){
console.warn(_64);
}else{
if(bit==IORequest.log_error){
console.error(_64);
}else{
if(IORequest.log_mask&bit){
console.log(_64);
}
}
}
}
}
};
IORequest.ie_version=function(){
return (/MSIE (\d+\.\d+);/.test(navigator.userAgent)?RegExp.$1:null);
};
IORequest.url_prefix=[];
IORequest.url_prefix["ajax local"]="";
IORequest.url_prefix["ajax remote"]="/limelight/";
IORequest.url_prefix["json local"]="";
IORequest.url_prefix["json remote"]="http://coremetric.vo.llnwd.net/o33/";
IORequest.url_prefix["json remote https"]="https://coremetric.hs.llnwd.net/o33/";
IORequest.rec_request=function(_66,_67,_68,_69,_6a){
IORequest.plain_text_product_id=_67;
IORequest.plain_text_cat_id=_68;
IORequest.log(IORequest.log_trace,"cmRecRequest",_66+","+_67+","+_68+(_69?","+_69:"")+(_6a?","+_6a:""));
IORequest.rec_stack.push([_66,(_67==""?"":(IORequest.encrypt_prds?IORequest.hex32(IORequest.crc32_str(_67)):_67)),(_68==""?"":(IORequest.encrypt_cats?IORequest.hex32(IORequest.crc32_str(_68)):_68)),_69,_6a]);
};
IORequest.rec_request_abort=function(){
IORequest.rec_stack=[];
IORequest.filtered_out_products=[];
IORequest.log(IORequest.log_trace,"Aborted request","communication exception");
};
IORequest.display_recs=function(){
IORequest.i_msg=0;
IORequest.i_zone=1;
IORequest.filtered_out_products=[];
_io_state.cm_build_all_recent_arrays();
_io_config=undefined;
if(IORequest.chris_dot_html_config){
_io_config=new IOConfig(IORequest.chris_dot_html_config);
IORequest.log(IORequest.log_config_file,"config file",IORequest.chris_dot_html_config);
IORequest.i_zone=0;
IORequest.stack_manager("chris.html");
}else{
_io_request.download_config();
}
};
IORequest.config_downloaded=function(_6b){
IORequest.stack_manager(_6b);
};
IORequest.config_download_failure=function(_6c){
_io_config=new IOConfig(IORequest.default_json);
for(var _6d=0;_6d<IORequest.rec_stack.length;_6d++){
_io_config.add_zone(IORequest.rec_stack[_6d][0]);
}
IORequest.stack_manager(_6c);
};
IORequest.encode_search_term=function(_6e){
_6e=_6e.toString().toUpperCase();
if(IOConfig.stpr){
for(var _6f=0;_6f<IOConfig.stpr.length;_6f++){
var _70=IOConfig.stpr[_6f];
_70=_70.toString().toUpperCase();
if(_6e.substring(0,_70.length)==_70){
_6e=_6e.substr(_70.length);
}
}
}
_6e=_6e.replace(/[$'&`~@:\[\]\\!%^*()={}\| <>"]/g,"");
return (_6e);
};
IORequest.stack_manager=function(_71){
if(IORequest.rec_stack.length){
var _72=IORequest.rec_stack.shift();
IORequest.i_zone++;
IORequest.i_msg=0;
IORequest.zone_id=_72[0];
IORequest.product_id=_72[1];
IORequest.category_id=_72[2];
IORequest.optional_parm=(_72.length>3?_72[3]:"");
IORequest.raw_search_term=(_72.length>4?_72[4]:"");
if(IORequest.raw_search_term){
var _73=IORequest.encode_search_term(IORequest.raw_search_term);
IORequest.plain_text_search_id=_73;
IOConfig.crc_specified_search=IORequest.hex32(IORequest.crc32_str(_73));
_72[4]=IOConfig.crc_specified_search;
}else{
IOConfig.crc_specified_search="";
}
IORequest.current_step=-1;
IORequest.b_timeout=false;
IORequest.b_404=false;
if(_io_config.zones[IORequest.zone_id]===undefined){
IORequest.log(IORequest.log_error,"cmRecRequest: zone "+IORequest.zone_id+" is not defined in the configuration file","no action taken");
IORequest.stack_manager("zone: "+IORequest.zone_id+" is not defined in the configuration file");
}else{
_io_request.display_status("stack_manager called - "+_71+" - parms: "+_72.join(", "),"green");
IORequest.log(IORequest.log_trace,"stack_manager called - "+_71+" - parms",_72.join(", "));
_io_request.download_product();
}
}else{
if(IORequest.i_zone==3){
IORequest.i_zone=2;
}
_io_request.display_status("All cmRecRequests completed","green");
IORequest.log(IORequest.log_trace,"All cmRecRequests completed for zone",IORequest.zone_id);
IORequest.i_zone=1;
IORequest.i_msg=0;
}
};
IORequest.is_undefined=function(x){
var y;
return (x===y);
};
IORequest.inspect_json=function(obj,_74,_75){
var str="",_76,msg;
if(_75===null||_75===undefined){
_75=0;
}
if(_74===null||_74===undefined){
_74=1;
}
if(_74<1){
return "<font color=\"red\">Error: Levels number must be > 0</font>";
}
if(obj===null||obj===undefined){
return "<font color=\"red\">Error: Object <b>NULL</b></font>";
}
str+="<ul>";
var _77;
for(_77 in obj){
if(true){
try{
_76=typeof (obj[_77]);
str+="<li>("+_76+") "+_77+((obj[_77]===null)?(": <b>null</b>"):(":  <font color=\"red\">"+obj[_77]+"</font>"))+"</li>";
if((_76=="object")&&(obj[_77]!==null)&&(_75+1<_74)){
str+=IORequest.inspect_json(obj[_77],_74,_75+1);
}
}
catch(err){
if(typeof (err)=="string"){
msg=err;
}else{
if(err.message){
msg=err.message;
}else{
if(err.description){
msg=err.description;
}else{
msg="Unknown";
}
}
}
str+="<li><font color=\"red\">(Error) "+_77+": "+msg+"</font></li>";
}
}
}
str+="</ul>";
return str;
};
IOConfig.version=-1;
IOConfig.brand_personalization=[-1,-1];
IOConfig.category_structure=-1;
IOConfig.stpr=[];
IOConfig.crc_specified_search="";
function IOConfig(_78){
var _79=false;
this.io=_78;
if(((IORequest.ie_version()!==null)&&(IORequest.ie_version()<7))){
if(this.io.cie6b!==undefined){
for(var ii=0;ii<IORequest.a_max_elements.length;ii++){
if(this.io.cie6b[ii]!=IORequest.a_max_elements[ii]){
IORequest.a_max_elements[ii]=this.io.cie6b[ii];
_79=true;
}
}
}
}else{
if(this.io.cdfltb!==undefined){
for(var _7a=0;_7a<IORequest.a_max_elements.length;_7a++){
if(this.io.cdfltb[_7a]!=IORequest.a_max_elements[_7a]){
IORequest.a_max_elements[_7a]=this.io.cdfltb[_7a];
_79=true;
}
}
}
}
if(this.io.cs===undefined){
if(IOConfig.category_structure==-1){
IOConfig.category_structure="S";
}
}else{
var _7b=(this.io.cs!=="EPR");
var _7c=(IOConfig.category_structure!=="E");
if(_7b!==_7c){
_79=true;
IOConfig.category_structure=(this.io.cs=="EPR"?"E":"S");
}
}
if(this.io.cv!==undefined){
if(IOConfig.version!==this.io.cv){
_79=true;
IOConfig.version=this.io.cv;
}
}
if(this.io.bp!==undefined){
if(IOConfig.brand_personalization[0]!=this.io.bp[0]){
IOConfig.brand_personalization[0]=this.io.bp[0];
_79=true;
}
if(IOConfig.brand_personalization[1]!=this.io.bp[1]){
IOConfig.brand_personalization[1]=this.io.bp[1];
_79=true;
}
}
if(_79&&(IORequest.ab_group_number!==undefined)){
var cfg=[IORequest.ab_group_number,IOConfig.version,IOConfig.brand_personalization[0],IOConfig.brand_personalization[1],IOConfig.category_structure,IORequest.a_max_elements[0],IORequest.a_max_elements[1],IORequest.a_max_elements[2],IORequest.a_max_elements[3],IORequest.a_max_elements[4],IORequest.a_max_elements[5],IORequest.a_max_elements[6]];
_io_state.cm_write_cookies(cfg);
_79=0;
}
IOConfig.stpr=this.io.stpr||[];
IOConfig.sfto=this.io.sfto||1500;
this.fcpl=this.io.fcpl===undefined?"N":this.io.fcpl.toString().toUpperCase();
this.vcgi=this.io.vcgi===undefined?"Y":this.io.vcgi.toString().toUpperCase();
this.cp=this.io.cp||1.1;
if(this.io.pfto!==undefined){
IORequest.timeout[1]=this.io.pfto;
}
if(this.io.fnf!==undefined){
this.file_not_found_id=this.io.fnf[0];
this.file_not_found_pc=this.io.fnf[1];
}
this.bad_list=this.io.bl||[];
this.ps=this.io.ps===undefined?1:this.io.ps;
this.zones=[];
this.n_zones=this.io.zp.length;
this.rec_plan=[];
for(var _7d=0;_7d<this.n_zones;_7d++){
this.zones[this.io.zp[_7d].id]=new IOZone(this.io.zp[_7d],this.rec_plan,this.io.rp,this.io.oa);
}
this.add_zone=function(_7e){
var _7f={"id":_7e,"rp":[["001",0,99,3]]};
this.zones[_7e]=new IOZone(_7f,this.rec_plan,this.io.rp,this.io.oa);
};
};
function IOZone(_80,_81,_82,_83){
var _84=undefined;
this.name=_80.id;
var _85=this.name+"_zp";
if((window[_85]!==undefined)&&(typeof window[_85]=="function")){
this.zpf=_85;
}else{
if((window.io_rec_zp!==undefined)&&(typeof window.io_rec_zp=="function")){
this.zpf="io_rec_zp";
}else{
this.zpf=undefined;
}
}
this.filter_pp=(((_80.fp!==undefined)&&(_80.fp===0))?0:1);
this.filter_cp=(((_80.fc!==undefined)&&(_80.fc===0))?0:1);
if(_80.rp.length==1){
if(_81[_80.rp[0][0]]===undefined){
_81[_80.rp[0][0]]=new IORecPlan(_80.rp[0][0],_82,_83);
}
this.rec_plan=_81[_80.rp[0][0]];
this.n_recs=_80.rp[0][3];
this.ab_test_id="no ab test";
}else{
var rn=IORequest.ab_group_number;
this.rn=(rn===undefined)?0:rn;
for(var _86=0;((_86<_80.rp.length)&&(this.rec_plan===undefined));_86++){
if(this.rn>=_80.rp[_86][1]&&this.rn<=_80.rp[_86][2]){
if(_81[_80.rp[_86][0]]===undefined){
_81[_80.rp[_86][0]]=new IORecPlan(_80.rp[_86][0],_82,_83);
}
this.rec_plan=_81[_80.rp[_86][0]];
this.n_recs=_80.rp[_86][3];
this.ab_test_id=((_80.rp[_86][4]!==undefined)?_80.rp[_86][4]:"no ab test");
}
}
}
};
function IORecStep(_87,_88){
this.offer_id=_87[0];
this.target_id=_87[1];
this.offer_type=this.offer_id?_88[this.offer_id][1]:"N";
this.offer_version=this.offer_id?_88[this.offer_id][0]:0;
this.heading=(_87[3]!==undefined)?_87[3]:"";
this.to_string=function(){
return ("offer_id: "+this.offer_id+" target_id: "+this.target_id+" offer_type: "+this.offer_type+" offer_version: "+this.offer_version);
};
};
function IORecPlan(_89,_8a,_8b){
this.rec_steps=[];
this.id=_89;
for(var _8c=0;_8c<_8a[_89].length;_8c++){
this.rec_steps.push(new IORecStep(_8a[_89][_8c],_8b));
}
};
IOState.h_productview_product=[];
IOState.productview_product="";
IOState.productview_category="";
function IOState(){
var _8d=document;
var _8e="undefined";
var _8f=(IORequest.production?"~":"~");
var _90=":";
var _91=[];
var _92=[];
var _93=[];
var _94=[];
var _95=[];
var _96=[];
var _97=[];
var _98=[];
var _99=[];
var _9a=-1;
var _9b=["p_viewed","p_carted","p_purchased","c_viewed","c_n_views","b_viewed","b_n_views"];
var _9c=["pv","pc","pp","cv","cn","bv","bn"];
var _9d=_9b;
var _9e=false;
var _9f=[];
if(IORequest.basket_pages!==undefined){
for(var _a0=0;_a0<IORequest.basket_pages.length;_a0++){
_9f[IORequest.basket_pages[_a0]]=1;
}
}
this.cm_get_product_from_cookie=function(_a1){
if(_91.length!==0||(this.cm_build_all_recent_arrays()===true)){
if(_a1=="_RVP_"){
return (IORequest.recently_viewed_product);
}
if(_a1=="_RVC_"){
return (IORequest.recently_viewed_category);
}
if(_a1=="_LCP_"){
return (_96[0]||0);
}
if(_a1=="_RPP_"){
return (_97[0]||0);
}
if(_a1=="_MPC_"){
var _a2=0;
for(var _a3=1;_a3<_98.length;_a3++){
if(parseInt(_93[_98[_a3]].n_viewed,10)>parseInt(_93[_98[_a2]].n_viewed,10)){
_a2=_a3;
}
}
return (_98[_a2]||0);
}
if(_a1=="_MPB_"){
var _a4=0;
for(var _a5=1;_a5<_99.length;_a5++){
if(parseInt(_94[_99[_a5]].n_viewed,10)>parseInt(_94[_99[_a4]].n_viewed,10)){
_a4=_a5;
}
}
return (_99[_a4]||0);
}
if(_a1=="_DFTP_"){
return (IORequest.default_prd);
}
if(_a1=="_DFTC_"){
return (IORequest.default_cat);
}
if(_a1=="_APP_"){
return (_97);
}
if(_a1=="_ACP_"){
return (_96);
}
}
return (0);
};
cm_initialize_id=function(p_h,id){
p_h[id]=[];
p_h[id].index=-1;
p_h[id].n_bought=0;
p_h[id].n_viewed=0;
p_h[id].n_carted=0;
};
cm_build_hash_from_array=function(p_a){
var h=[];
h.max_index=0;
for(var ii=0;ii<p_a.length;ii++){
cm_initialize_id(h,p_a[ii]);
}
return h;
};
cm_id_array_from_index_array=function(_a6,_a7,_a8,_a9,_aa,_ab){
var _ac=[];
_ac.max_length=_a7;
if(_a6){
var _ad=_a6.split("~");
if(_ad.length==1){
_ad=_a6.split(",");
}
for(var ii=0;ii<_ad.length;ii++){
var _ae=_a8[_ad[ii]];
_ac.push(_ae);
if(_aa!==undefined){
var _af=_aa.split("~");
if(_af.length==1){
_af=_aa.split(",");
}
if((!(_a9===undefined))&&(_af.length>0)){
_a9[_ae][_ab]=_af[ii];
}
}
}
if(_ac.length>_ac.max_length){
_ac.length=_ac.max_length;
}
}
return _ac;
};
cm_create_integer_array_from_id_array=function(_b0,p_h,_b1){
var _b2=[];
for(var ii=0;ii<_b0.length;ii++){
var id=_b0[ii];
if(p_h[id].index==-1){
p_h[id].index=p_h.max_index++;
}
_b2.push(p_h[id][_b1]);
}
return _b2;
};
cm_create_id_array_from_hash=function(p_h){
var _b3=[];
for(var id in p_h){
if(typeof id!="function"){
_b3[p_h[id].index]=id;
}
}
return _b3;
};
cm_add_action=function(_b4,p_h,_b5,_b6,_b7){
var _b8;
var _b9=_b4;
if(_b5){
_b9=IORequest.hex32(IORequest.crc32_str(_b4));
IORequest.log(IORequest.log_trace,"encryption of "+_b4,_b9);
}
if(_b9!==undefined){
_b8=[_b9];
_b8.max_length=_b6.max_length;
if(p_h[_b9]===undefined){
cm_initialize_id(p_h,_b9);
}
if(_b7!==undefined){
p_h[_b9][_b7]++;
}
for(var ii=0;ii<_b6.length;ii++){
if(_b6[ii]!=_b9){
_b8.push(_b6[ii]);
}
}
if(_b8.length>_b8.max_length){
_b8.length=_b8.max_length;
}
}else{
_b8=_b6;
}
return (_b8);
};
cm_remove_element_from_array=function(p_a,_ba,_bb){
var _bc=[];
if(_bb){
_ba=IORequest.hex32(IORequest.crc32_str(_ba));
}
for(var ii=0;ii<p_a.length;ii++){
if(!(_ba==p_a[ii])){
_bc.push(p_a[ii]);
}
}
return _bc;
};
this.cm_write_cookies=function(_bd){
var _be=[cm_create_integer_array_from_id_array(_95,_92,"index").join("~"),cm_create_integer_array_from_id_array(_96,_92,"index").join("~"),cm_create_integer_array_from_id_array(_97,_92,"index").join("~"),cm_create_integer_array_from_id_array(_98,_93,"index").join("~"),cm_create_integer_array_from_id_array(_98,_93,"n_viewed").join("~"),cm_create_integer_array_from_id_array(_99,_94,"index").join("~"),cm_create_integer_array_from_id_array(_99,_94,"n_viewed").join("~")];
if(_9e){
for(var jj=0;jj<_9d.length;jj++){
_be[jj]=_9d[jj]+_90+_be[jj];
}
}
var cfg=_bd.join("~");
var prd=cm_create_id_array_from_hash(_92).join(_8f);
var cat=cm_create_id_array_from_hash(_93).join(_8f);
var brn=cm_create_id_array_from_hash(_94).join(_8f);
var cnt=_be.join(IORequest.cookie_array_separator);
var _bf=[cfg,prd,cat,brn,cnt].join(IORequest.cookie_separator);
var rc=IORequest.set_and_check_cookie(IORequest.state_cookie,_bf,false,IORequest.vanity_suffix);
IORequest.log(IORequest.log_cookie_write,"write "+IORequest.state_cookie,IORequest.is_undefined(rc)?"permanent cookies disabled":_bf);
return (rc);
};
this.cm_build_all_recent_arrays=function(){
var _c0=[];
var _c1=[];
var _c2=[];
var _c3=IORequest.find_state_cookie(IORequest.state_cookie);
if(_c3!==undefined){
var _c4=(_c3===undefined)?4:(_c3.split(IORequest.cookie_separator).length-1);
_91=IORequest.build_array_from_cookie(0).split(",");
if(_91.length>0){
IORequest.ab_group_number=_91[0];
if(IORequest.ab_group_number.length>3){
_91=IORequest.build_array_from_cookie(0).split("~");
IORequest.ab_group_number=_91[0];
}
if(_91.length>1){
IOConfig.version=_91[1];
IOConfig.brand_personalization[0]=_91[2];
IOConfig.brand_personalization[1]=_91[3];
IOConfig.category_structure=_91[4];
IORequest.a_max_elements[0]=_91[5];
IORequest.a_max_elements[1]=_91[6];
IORequest.a_max_elements[2]=_91[7];
IORequest.a_max_elements[3]=_91[8];
IORequest.a_max_elements[4]=_91[9];
IORequest.a_max_elements[5]=_91[10];
IORequest.a_max_elements[6]=_91[11];
}
}
_c0=IORequest.build_array_from_cookie(1).split(_8f);
_92=cm_build_hash_from_array(_c0);
_c1=IORequest.build_array_from_cookie(2).split(_8f);
_93=cm_build_hash_from_array(_c1);
if(_c4>3){
_c2=IORequest.build_array_from_cookie(3).split(_8f);
_94=cm_build_hash_from_array(_c2);
}
var _c5=IORequest.build_array_from_cookie(_c4).split(IORequest.cookie_array_separator);
if(_9e&&(g_b_a_arrays[0].substring(0,2)==_9d[0].substring(0,2))){
for(var ii=0;ii<_c5.length;ii++){
_c5[ii]=_c5[ii].substring(_9d[ii].length+1);
}
}
_95=cm_id_array_from_index_array(_c5[0],IORequest.a_max_elements[0],_c0);
_96=cm_id_array_from_index_array(_c5[1],IORequest.a_max_elements[1],_c0);
_97=cm_id_array_from_index_array(_c5[2],IORequest.a_max_elements[2],_c0);
_98=cm_id_array_from_index_array(_c5[3],IORequest.a_max_elements[3],_c1,_93,_c5[4],"n_viewed");
if(_c4>3){
_99=cm_id_array_from_index_array(_c5[5],IORequest.a_max_elements[5],_c2,_94,_c5[6],"n_viewed");
}
if(IORequest.recently_viewed_product===undefined){
IORequest.recently_viewed_product=(_95.length===0?0:_95[0]);
}
if(IORequest.recently_viewed_category===undefined){
IORequest.recently_viewed_category=(_98.length===0?0:_98[0]);
}
if(_91.length==1){
IORequest.rm_cookie(IORequest.state_cookie);
var cfg=[IORequest.ab_group_number,IOConfig.version,IOConfig.brand_personalization[0],IOConfig.brand_personalization[1],IOConfig.category_structure,IORequest.a_max_elements[0],IORequest.a_max_elements[1],IORequest.a_max_elements[2],IORequest.a_max_elements[3],IORequest.a_max_elements[4],IORequest.a_max_elements[5],IORequest.a_max_elements[6]];
this.cm_write_cookies(cfg);
}
return (true);
}else{
return (false);
}
};
cm_build_html_table_from_array=function(_c6,_c7,p_h,_c8){
var _c9=(_c8?2:1);
var _ca=_c7.length;
var _cb="";
var _cc=(_c9==1?"<TD COLSPAN=2>":"<TD>");
if(_ca>0&&(_c7[0]!==undefined)){
_cb="<TR><TH ROWSPAN="+_ca+">"+_c6+"</TH>"+_cc+(_c9==2?p_h[_c7[0]][_c8]+"</TD><TD>":"")+_c7[0]+"</TD></TR>";
for(var ii=1;ii<_ca;ii++){
_cb+="<TR>"+_cc+(_c9==2?p_h[_c7[ii]][_c8]+"</TD><TD>":"")+_c7[ii]+"</TD></TR>";
}
}else{
_cb="<TR><TH ROWSPAN=1>"+_c6+"</TH>"+"<TD COLSPAN=2>"+"No "+_c6+"</TD></TR>";
}
return (_cb);
};
cm_get_products_in_cart=function(){
if(this.cm_build_all_recent_arrays()===true){
return (_96);
}else{
return ([]);
}
};
this.cm_format_cookie_arrays=function(_cd){
return ("<H3>Obsolete</H3>");
};
this.cm_ted_io=function(_ce){
var _cf=false;
if(this.cm_build_all_recent_arrays()===true){
if(_ce.i_offer!==undefined){
if(_ce.i_offer=="epr_category"){
if(_io_config.fcpl=="Y"){
_ce.cg=_ce.cg.replace(/>.*$/,"");
_ce.cg=_ce.cg.replace(/\s+$/,"");
}
if(_ce.cg!==undefined){
if(_ce.cg.length<=IORequest.max_cat_length){
IORequest.log(IORequest.log_trace,"Adding EPR Category to cookie.  Category",_ce.cg);
_98=cm_add_action(_ce.cg,_93,IORequest.encrypt_cats,_98,"n_viewed");
_cf=true;
}else{
IORequest.log(IORequest.log_warn,"EPR Category not added to cookie.  Category length is greater than the maximum of "+IORequest.max_cat_length+". Category",_ce.cg);
}
}
}
if(_ce.i_offer=="brand"){
IORequest.log(IORequest.log_trace,"adding "+_ce.brn,"g_a_brn_viewed array");
_99=cm_add_action(_ce.brn,_94,1,_99,"n_viewed");
_cf=true;
}
}else{
if(_ce.tid==1||_ce.tid==6||_ce.tid==5){
IORequest.log(IORequest.log_cookie_write,"initial "+IORequest.state_cookie,IORequest.find_state_cookie());
}
if(5==_ce.tid){
var _d0=""+_ce.pr.toString().toUpperCase();
var _d1=""+_ce.cg.toString().toUpperCase();
if(_d0!==undefined){
if(_d0.length<=IORequest.max_prd_length){
IORequest.log(IORequest.log_trace,"Adding product from product view to cookie.  Product",_d0);
_95=cm_add_action(_d0,_92,IORequest.encrypt_prds,_95);
_cf=true;
}else{
IORequest.log(IORequest.log_warn,"Product from product view not added to cookie.  Product length is greater than the maximum of "+IORequest.max_prd_length+". Product",_d0);
}
}
if((_d1!==undefined)&&(IOConfig.category_structure=="S")){
if(_d1.length<=IORequest.max_cat_length){
IORequest.log(IORequest.log_trace,"Adding Site Category from product view to cookie.  Category",_d1);
_98=cm_add_action(_d1,_93,IORequest.encrypt_cats,_98,"n_viewed");
_cf=true;
}else{
IORequest.log(IORequest.log_warn,"Site Category from product view not added to cookie.  Category length is greater than the maximum of "+IORequest.max_cat_length+". Category",_d1);
}
}
IOState.b_product_view=true;
IOState.h_productview_product[_d0]=1;
IOState.productview_product=_d0;
IOState.productview_category=_d1;
}
if((_ce.pr!==undefined)&&(4==_ce.tid)&&(5==_ce.at)){
if(_ce.pr.length<=IORequest.max_prd_length){
IORequest.log(IORequest.log_trace,"Adding product from cart contents to cookie.  Product",_ce.pr);
_96=cm_add_action(_ce.pr.toString().toUpperCase(),_92,IORequest.encrypt_prds,_96);
_cf=true;
}else{
IORequest.log(IORequest.log_warn,"Product from cart contents not added to cookie.  Product length is greater than the maximum of "+IORequest.max_prd_length+". Product",_ce.pr);
}
}
if((_ce.pr!==undefined)&&(4==_ce.tid)&&(9==_ce.at)){
if(_ce.pr.length<=IORequest.max_prd_length){
IORequest.log(IORequest.log_trace,"Adding product from purchase to cookie.  Product",_ce.pr);
_97=cm_add_action(_ce.pr.toString().toUpperCase(),_92,IORequest.encrypt_prds,_97);
_cf=true;
}else{
IORequest.log(IORequest.log_warn,"Product from purchase not added to cookie.  Product length is greater than the maximum of "+IORequest.max_prd_length+". Product",_ce.pr);
}
}
}
if(_cf){
this.cm_write_cookies(_91);
}
}
};
};

cmLoadIOConfig();

// asyncronous tag queue
function cmExecuteTagQueue() {
    var i = window.cmTagQueue;
    if (i) {
        var f = (i.constructor == Array);
        if (!f) { return };
        for (var x = 0; x < i.length; ++x) {
            window[i[x][0]].apply(window,i[x].slice(1));
        }
    }
    return true;
}

cmExecuteTagQueue();var cmCategoryId=null;
function cmExternalClick(_1){
cmCreateManualPageviewTag("External: "+_1,null,_1,document.location.href);
return true;
};
function cmCreateManualPageviewTag(_2,_3,_4,_5,_6,_7,_8,_9){
cmMakeTag(["tid","1","pi",_2,"cg",_3,"ul",_4,"rf",_5,"se",_6,"sr",_8,"cmAttributes",_7,"cmExtraFields",_9]);
};
function cmCreatePageViewTag(_a,_b,_c,_d,_e,_f,_10,_11,_12){
var a=getCategoryOverride();
var _13=a.cm_src;
if((_13!=null)&&(_10!="INTERNATIONAL")){
_10=_13;
}
if(_d){
_d="CS";
}
if(_e){
_e="Registry";
}
cmMakeTag(["tid","1","pi",_a,"cg",_10,"se",_b,"sr",_c,"pv2",_d,"pv4",_e,"cmAttributes",_11,"cmExtraFields",_12]);
if(_b){
cmMakeTag(["tid","7","li","1","ps1",_b,"ps2",_c]);
}
};
function cmCreateCategoryTag(_14,_15,_16,_17,_18){
var _19="CATEGORY: "+_14+" ("+_15+")";
if(_16){
if((_16!="")&&(_16!="1")){
_19=_19+" PG "+_16;
}
}
if(_15.indexOf("I:")===0){
_19="INTL:"+_19;
}
if(_17){
_17="Registry";
}
cmMakeTag(["tid","1","pi",_19,"cg",_15,"pv4",_17,"cmAttributes",_18]);
};
function cmCreateProductName(_1a,_1b,_1c,_1d,_1e){
var _1f="PRODUCT:";
if(!(typeof _1d==="undefined")&&_1d=="Y"){
if(!(_1a.indexOf("G:")===0)&&!(_1a.indexOf("R:")===0)&&!(_1a.indexOf("E:G:")===0)&&!(_1a.indexOf("E:R:")===0)&&!(_1a.indexOf("E:M:")===0)&&!(_1a.indexOf("M:")===0)){
_1f="INTL:PRODUCT:";
}
}
if(!(typeof quickLook_flag==="undefined")&&quickLook_flag=="Y"){
_1f=_1f+"QB:";
}
return _1f+" "+_1b+" ("+_1c+")";
};
function cmCreateProductTag(_20,_21,_22,_23,_24,_25,_26,_27,_28,_29,_2a,_2b,_2c){
var a=getCategoryOverride();
var _2d=new Array;
var _2e="";
if(_2a){
_2d=_2a.split("-_-");
if(_2d.length==3&&a.product_attr!=null){
_2e=_2a+"-_-"+a.product_attr;
_2a=_2e;
}
}else{
if(a.product_attr!=null){
_2e="null-_-null-_-null-_-"+a.product_attr;
_2a=_2e;
}
}
var _2f=_20;
var _30=a.cm_src;
if(_30!=null){
if(_30.charAt(1)==":"){
_20=_30;
}else{
_20=getViewsetFromCategory(_2f)+":"+_30;
}
}
var _31="PRODUCT:";
if(!(typeof _25==="undefined")&&_25=="Y"){
if(!(_20.indexOf("G:")===0)&&!(_20.indexOf("R:")===0)&&!(_20.indexOf("E:G:")===0)&&!(_20.indexOf("E:R:")===0)&&!(_20.indexOf("E:M:")===0)&&!(_20.indexOf("M:")===0)){
_31="INTL:PRODUCT:";
_20="I:"+_20;
}
}
if(!(typeof _2c==="undefined")&&_2c=="Y"){
_31=_31+"QB:";
}
if(cmCategoryId==null){
cmCategoryId=_20;
}
if(_23){
_23="Y";
}else{
_23="N";
}
if(_24){
_24="Registry";
}
cmMakeTag(["tid","5","pi",_31+" "+_21+" ("+_22+")","pr",_22,"pm",_21,"cg",_20,"pc",_23,"pv4",_24,"cm_vc",_2b?_2b:cmExtractParameter("cm_vc",document.location.href),"cmAttributes",_2a]);
if(_26||_27){
cmMakeTag(["tid","7","li","10300","ps1",_22,"ps2",_21,"ps3",_20,"ps4",_26,"ps5",_27,"ps6",_28,"ps7",_29]);
}
};
function cmCreateShopAction5Tag(_32,_33,_34,sku,_35,_36,_37,_38,_39,_3a){
if((typeof (cm_currencyCode)=="undefined")||(!cm_currencyCode)){
cm_currencyCode="";
}
_34=_34.toString().replace(cmPricePattern,"");
_32=_32.toString().replace(cmSpacePattern,"");
var _3b=""+(_39?_39+"|||":"")+(_3a?"extra"+_3a:"");
cmAddShop(["pr",_32,"pm",_36,"qt",_33,"bp",_34,"cg",_35,"sx4",_37,"sx5",_38,"sx11","|"+sku+"|"+_34+"|"+_33+"|","cmAttributes",_39,"cmExtraFields",_3a,"ha1",cm_hex_sha1(_3b),"cc",cm_currencyCode,"at","5","tid","4","pc","N"]);
};
function cmCreateShopAction9Tag(_3c,_3d,_3e,sku,_3f,_40,_41,_42,_43,_44,_45,_46,_47,_48,_49){
if((typeof (cm_currencyCode)=="undefined")||(!cm_currencyCode)){
cm_currencyCode="";
}
_3e=_3e.toString().replace(cmPricePattern,"");
_41=_41.toString().replace(cmPricePattern,"");
_3c=_3c.toString().replace(cmSpacePattern,"");
var _4a=""+(_48?_48+"|||":"")+(_49?"extra"+_49:"");
cmAddShop(["pr",_3c,"pm",_45,"qt",_3d,"bp",_3e,"cg",_44,"sx4",_42,"sx5",_43,"sx11","|"+sku+"|"+_3e+"|"+_3d+"|","sx7",_46,"sx8",_47,"cmAttributes",_48,"cmExtraFields",_49,"ha1",cm_hex_sha1(_4a),"cd",_40,"on",_3f,"tr",_41,"cc",cm_currencyCode,"at","9","tid","4","pc","N"]);
};
function cmCreateOrderTag(_4b,_4c,_4d,_4e,_4f,_50,_51,_52,_53,_54,_55,_56){
if((typeof (cm_currencyCode)=="undefined")||(!cm_currencyCode)){
cm_currencyCode="";
}
_4e=_4e.toString().replace(cmPricePattern,"");
_4d=_4d.toString().replace(cmPricePattern,"");
if(_53){
_53="Y";
}else{
_53="N";
}
if(_54){
_54="Registry";
}
_4c=custIDcheck(_4c);
cmMakeTag(["tid","3","osk",cmCalcSKUString(),"on",_4b,"tr",_4d,"sg",_4e,"cd",_4c,"ct",_50,"sa",_51,"zp",_52,"or1",_53,"or2",_54,"cc",cm_currencyCode,"cmAttributes",_55,"cmExtraFields",_56]);
};
function cmCreateRegistrationTag(_57,_58,_59,_5a,_5b,_5c,_5d,_5e,_5f,_60,age,_61,_62,_63,_64,_65){
pcFlag="Y";
if(!_57){
pcFlag="N";
}
if(_5f){
_5f="Y";
}
if(_5b){
_5b="Y";
}else{
_5b="N";
}
if(!_64){
_64="-_-"+_5f+"-_--_--_--_--_--_--_--_--_-"+"-_-"+_61+"-_-"+_62;
}
cmMakeTag(["tid","2","cd",_58,"em",_59,"ct",_5c,"sa",_5d,"zp",_5e,"cg",_60,"ag",age,"pi",_57,"pc",pcFlag,"rg2",_5f,"rg12",_61,"rg13",_62,"nl",_5a,"sd",_5b,"cy",_65,"cmAttributes",_64]);
};
function cmCreateErrorTag(_66){
cmMakeTag(["tid","404","li","100","ps1",document.URL,"ps2",ParseRef(document.URL),"ps3",_66]);
};
function cmMovieTime(_67,_68,_69,_6a){
var _6b=new Date();
var _6c=(Math.floor(Math.random()*11111111))+_6b.valueOf();
cmCreateCustomTag("500",_67,_68,_6b.getTime(),_69,_6a,_6c);
};
function cmCreateBazaarViewTag(_6d,_6e,_6f){
cmMakeTag(["tid","7","li","10301","ps1",_6d,"ps2",_6e,"ps3",_6f]);
};
function cmCreateCustomTag(_70,ps1,ps2,ps3,ps4,ps5,ps6,ps7,ps8,ps9,_71,_72,_73,_74,_75,_76){
cmMakeTag(["tid","7","li",_70,"ps1",ps1,"ps2",ps2,"ps3",ps3,"ps4",ps4,"ps5",ps5,"ps6",ps6,"ps7",ps7,"ps8",ps8,"ps9",ps9,"ps10",_71,"ps11",_72,"ps12",_73,"ps13",_74,"ps14",_75,"ps15",_76]);
};
function cmRegistrationExtraFieldMapping(cm,_77,_78){
var _79=_77+1;
if(_77==0){
cm["e_a"+_79]=_78;
}else{
if(_77==2){
cm["e_a"+_79]=_78;
}else{
if(_77==3){
cm["e_a"+_79]=_78;
}else{
if(_77==4){
cm["e_a"+_79]=_78;
}else{
if(_77==5){
var _7a=_78.split("Â¦");
var j;
for(j=0;j<_7a.length;++j){
cm["e_a"+(_79+j)]=_7a[j];
}
}
}
}
}
}
};
function cmMakeTag(_7b){
var cm=new _cm("vn2","e4.0");
var i;
for(i=0;i<_7b.length;i+=2){
var _7c=_7b[i];
var _7d=_7b[i+1];
cm[_7c]=_7d;
}
var _7e=new Date();
var _7f=(Math.floor(Math.random()*11111111))+_7e.valueOf();
cm.rnd=_7f;
if(cm.tid=="6"){
cm.addTP();
document.cookie="cmTPSet=Y; path=/";
}
if(cm.tid=="1"){
if(cI("cmTPSet")!="Y"){
cm.tid="6";
cm.pc="Y";
cm.addTP();
document.cookie="cmTPSet=Y; path=/";
}
}
if(cm.cm_exAttr){
cm.cmAttributes=cm.cm_exAttr.join("-_-");
cm.cm_exAttr=null;
}
var _80={"1":"pv_a","2":"rg","3":"o_a","4":"s_a","5":"pr_a","6":"pv_a","14":"c_a","15":"e_a"};
var _81={"1":"pv","2":"rg","3":"or","4":"sx","5":"pr","6":"pv","7":"ps","14":"cx"};
if(cm.cmAttributes){
var _82=cm.cmAttributes.split("-_-");
var _83=_80[cm.tid];
for(i=0;i<_82.length;++i){
cm[_83+(i+1)]=_82[i];
if(cm.tid=="2"){
cmRegistrationExtraFieldMapping(cm,i,_82[i]);
}
}
cm.cmAttributes=null;
}
if(cm.cmExtraFields){
var _82=cm.cmExtraFields.split("-_-");
var _83=_81[cm.tid];
for(i=0;i<_82.length;++i){
cm[_83+(i+1)]=_82[i];
}
cm.cmExtraFields=null;
}
if(cmAutoCopyAttributesToExtraFields){
if((cm.tid!="2")&&(cm.tid!="15")){
for(var i=1;i<=15;++i){
if(!(cm[_81[cm.tid]+""+i])){
cm[_81[cm.tid]+""+i]=cm[_80[cm.tid]+""+i];
}
}
}
}
if((cm.pi==null)&&((cm.pc=="Y")||(cm.tid=="1"))){
cm.pi=cmGetDefaultPageID();
}
if(cm.tid=="4"){
var _84=100;
var _85=cm.sx11.length;
if(_85>_84){
var _86=cm.sx11;
cm.sx11=_86.substring(0,_84);
if(_85<=2*_84){
cm.sx12=_86.substring(_84,_85);
}else{
cm.sx12=_86.substring(_84,2*_84);
if(_85<=3*_84){
cm.sx13=_86.substring(2*_84,_85);
}else{
cm.sx13=_86.substring(2*_84,3*_84);
if(_85<=4*_84){
cm.sx14=_86.substring(3*_84,_85);
}else{
cm.sx14=_86.substring(3*_84,4*_84);
cm.sx15=_86.substring(4*_84,_85);
}
}
}
}
}
try{
if(parent.cm_ref!=null){
cm.rf=parent.cm_ref;
if(cm.pc=="Y"){
parent.cm_ref=document.URL;
}
}
if(parent.cm_set_mmc){
cm.ul=document.location.href+((document.location.href.indexOf("?")<0)?"?":"&")+parent.cm_mmc_params;
if(cm.pc=="Y"){
parent.cm_ref=cm.ul;
parent.cm_set_mmc=false;
}
}
}
catch(err){
}
if(cm.ul==null){
cm.ul=cG7.normalizeURL(window.location.href,false);
}
cm.rf=ParseRef(document.referrer);
if((this.manual_cm_mmc)&&(cm.ul.indexOf("cm_mmc")==-1)&&(cm.ul.indexOf("cm_ven")==-1)){
cm.ul=cm.ul+((cm.ul.indexOf("&")==-1)?((cm.ul.indexOf("?")==-1)?"?":"&"):"&")+"cm_mmc="+this.manual_cm_mmc;
}
cm.ul=cmConvertMMC(cm.ul);
cm.ul=cm.ul.replace(cmMMCPattern,function(p){
return p.toLowerCase();
});
if(cmCheckCMEMFlag){
cmStartTagSet();
}
cm.writeImg();
if(cmCheckCMEMFlag){
cmCheckCMEMFlag=false;
cmCheckCMEM();
cmSendTagSet();
}
if(typeof cm_ted_io=="function"){
if(cm_IOEnabled){
cm_ted_io(cm);
}
}
};
function cmGetDefaultPageID(){
var _87=window.location.pathname;
var _88=_87.indexOf("?");
if(_88!=-1){
_87=_87.substr(0,_88);
}
var _89=_87.indexOf("#");
if(_89!=-1){
_87=_87.substr(0,_89);
}
var _8a=_87.indexOf(";");
if(_8a!=-1){
_87=_87.substr(0,_8a);
}
var _8b=_87.lastIndexOf("/");
if(_8b==_87.length-1){
_87=_87+"index.cfm";
}
while(_87.indexOf("/")==0){
_87=_87.substr(1,_87.length);
}
return (_87);
};
function cmCheckCMEM(){
var _8c=false;
if(cmIndexOfParameter("cm_em",document.location.href)!=-1){
var _8d=cmExtractParameter("cm_em",document.location.href);
if(_8d.indexOf(":")>-1){
_8d=_8d.substring(_8d.indexOf(":")+1);
}
cmCreateRegistrationTag(null,_8d,_8d);
cmTriggerConversion(_8d);
_8c=true;
}
if(cmIndexOfParameter("cm_lm",document.location.href)!=-1){
var _8d=cmExtractParameter("cm_lm",document.location.href);
if(_8d.indexOf(":")>-1){
_8d=_8d.substring(_8d.indexOf(":")+1);
}
cmCreateRegistrationTag(null,_8d,_8d);
cmTriggerConversion(_8d);
_8c=true;
}
if(!_8c){
var _8e=cI("core_email_sent_flag");
if(_8e!="Y"){
var _8d=cI("core_email");
if(_8d){
cmCreateRegistrationTag(null,_8d,_8d);
cmTriggerConversion(_8d);
CC("core_email",window.location.hostname);
CB("core_email_sent_flag","Y");
}
}
}
};
function cmTriggerConversion(_8f){
var _90="-_--_--_--_--_-"+_8f+"-_-"+_8f+"-_-"+"EMAIL";
var _91=_8f+"-_-"+_8f+"-_-"+"EMAIL";
cmCreateConversionEventTag("Email Open With Subsequent Direct Load","2","Registration Event","0",_90,_91);
};
function ParseRef(url){
var _92;
if(url.toLowerCase().indexOf("cm_ref=")>=0){
var _93=url.toLowerCase().indexOf("cm_ref=")+7;
var _94=url.indexOf("&",_93);
if(_94<0){
_94=url.length;
}
_92=unescape(url.substring(_93,_94));
}
if(!_92&&document.referrer){
return document.referrer;
}
return _92;
};
function custIDcheck(_95){
var _96;
_96=cI("cmCustID");
_96=unescape(_96);
var _97=new Date();
_97.setFullYear(_97.getFullYear()+50);
if(_95!=null&&_95!=""){
if(_96!=_95){
document.cookie="cmCustID="+escape(_95)+"; expires="+_97.toGMTString()+";path=/;";
}
_96=_95;
}else{
_96=(Math.round(Math.random()*1000000000000))+(_97.getTime()%1000);
document.cookie="cmCustID="+_96+"; expires="+_97.toGMTString()+";path=/;";
}
return _96;
};
function getUrlParameters(_98){
var _99=new Object();
var _9a=_98.indexOf("?");
if(_9a<0){
return _99;
}
var _9b=_98.indexOf("#");
if(_9b<0){
_9b=_98.length;
}
var _9c=_98.substring(_9a+1).split("&");
for(var i=0;i<_9c.length;++i){
_9c[i]=_9c[i].split("=");
_99[decodeURIComponent(_9c[i][0])]=decodeURIComponent(_9c[i][1]);
}
return _99;
};
function getViewsetFromCategory(_9d){
var _9e=_9d.indexOf(":");
if(_9e<0){
return "E";
}
return _9d.substring(0,_9e);
};
function getCategoryOverride(){
var _9f=getUrlParameters(""+location.href);
var _a0="";
if(typeof _9f.cm_src=="string"&&_9f.cm_src.length>0&&_9f.cm_src!="None"){
var _a1=_9f.cm_src;
var pos=_9f.cm_src.indexOf("||");
if(pos>=0){
_a1=_9f.cm_src.substring(0,pos);
_a0=_9f.cm_src.substring(pos+2);
}
return {cm_src:_a1,product_attr:_a0};
}
return {cm_src:null,product_attr:null};
};
function writeCmSrc(){
document.write("<input type=\"hidden\" name=\"u_cmsrc\" value=\""+cmCategoryId+"\">");
};
function cmConvertMMC(url){
var _a2=url;
if(this.cm_sdxmmc){
var _a3=url.toLowerCase();
if(cm_sdxmmc&&(_a3.indexOf("cm_ven")==-1)&&(_a3.indexOf("cm_mmc")==-1)){
if(_a3.indexOf("?")>0){
_a3=_a3+"&"+cm_sdxmmc;
}else{
_a3=_a3+"?"+cm_sdxmmc;
}
}
_a2=_a3;
}
if(this.gs_mmc_ven){
mmc_string=(window.location.href.indexOf("?")==-1?"?":"&")+"cm_ven="+this.gs_mmc_ven;
if(this.gs_mmc_cat){
mmc_string+="&cm_cat="+this.gs_mmc_cat;
}
if(this.gs_mmc_pla){
mmc_string+="&cm_pla="+this.gs_mmc_pla;
}
if(this.gs_mmc_ite){
mmc_string+="&cm_ite="+this.gs_mmc_ite;
}
_a2=window.location.href+mmc_string;
}
return _a2;
};
if(defaultNormalize==null){
var defaultNormalize=null;
}
function myNormalizeURL(url,_a4){
var _a5=url;
if(_a4){
if(url.indexOf("http://")==0||url.indexOf("https://")==0){
_a5=_a5.substring(_a5.indexOf("://")+3);
_a5=_a5.substring(_a5.indexOf("/"));
}
var _a6=["cm_src=","cmsrc=","flash=","bnrid="];
var _a7;
var _a8=_a5.indexOf("?");
var _a9;
var _aa=new Array();
var _ab;
if(_a8>0){
_a7=_a5.substring(_a8+1);
_a5=_a5.substring(0,_a8);
_a9=_a7.split("&");
for(var i=0;i<_a9.length;i++){
_ab=true;
for(var j=0;j<_a6.length;j++){
if(_a9[i].indexOf(_a6[j])==0){
_ab=false;
}
}
if(_ab==true){
_aa[_aa.length]=_a9[i];
}
}
_a5+="?"+_aa.join("&");
}
}
if(defaultNormalize!=null){
_a5=defaultNormalize(_a5,_a4);
}
return _a5;
};
if(document.cmTagCtl!=null){
var func=""+document.cmTagCtl.normalizeURL;
if(func.indexOf("myNormalizeURL")==-1){
defaultNormalize=document.cmTagCtl.normalizeURL;
document.cmTagCtl.normalizeURL=myNormalizeURL;
}
}
var cm_tempCookie=cI("CoreID6");
if(!cm_tempCookie){
document.write("<script src='"+C8(null)+"//pnhh4a6.williams-sonoma.com/cookie-id.js?fn=cmMigrateCoreCookie' language='javascript1.1' type='text/javascript'></script>");
}
function cmMigrateCoreCookie(_ac){
if(_ac&&_ac.length>-1){
CB("CoreID6",_ac,cmCookieExpDate,"williams-sonoma.com");
}
};
