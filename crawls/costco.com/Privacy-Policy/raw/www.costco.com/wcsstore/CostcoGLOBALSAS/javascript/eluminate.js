/*Copyright 2000-2010,Coremetrics 4.8.6H $Revision:174271 $*/if(!cGB){var cGB=true;if(!cm_ClientID){var cm_ClientID="99999999";}if(!cm_HOST){var cm_HOST="testdata.coremetrics.com/cm?";}if(!cm_ClientTS){var dt=new Date();var cm_ClientTS=dt.getTime();}if(!cm_TrackLink){var cm_TrackLink="A";}if(!cm_DelayHandlerReg){var cm_DelayHandlerReg="";}if(!cm_SkipHandlerReg){var cm_SkipHandlerReg="";}if(!cm_TrackTime){var cm_TrackTime=false;}if(!cm_TrackImpressions){var cm_TrackImpressions="RSCM";}if(!cm_SecureTags||cm_SecureTags==null){var cm_SecureTags="|2|3|";}if(!cm_FirstPartyDetect){var cm_FirstPartyDetect=false;}if(!cm_DownloadExtensions){var cm_DownloadExtensions=null;}if(!cm_UseUTF8){var cm_UseUTF8=true;}if(!cm_FormError){var cm_FormError="";}if(!cm_FormPageID){var cm_FormPageID=false;}if(cm_UseCookie==null){var cm_UseCookie=false;}if(!cm_TimeoutSecs){var cm_TimeoutSecs=15;}if(!cm_UseDOMScriptLoad){var cm_UseDOMScriptLoad=true;}if(!cm_OffsiteImpressionsEnabled){var cm_OffsiteImpressionsEnabled=false;}if(!cm_AvidHost){var cm_AvidHost="data.cmcore.com/cookie-id.js?fn=cmSetAvid";}var cm_AvidLoadTimedOut=false;if(!cm_JSFEnabled){var cm_JSFEnabled=false;}if(!cm_JSFPCookieDomain){var cm_JSFPCookieDomain=null;}if(!cm_JSFTrackClients){var cm_JSFTrackClients=true;}if(!cm_JSFPCookieMigrate){var cm_JSFPCookieMigrate=false;}if(!cm_JSFPForceMigrateCookies){var cm_JSFPForceMigrateCookies=false;}if(!cm_JSFPCookieMigrateVisitorID){var cm_JSFPCookieMigrateVisitorID="cm_mc_uid";}if(!cm_JSFPCookieMigrateSessionID){var cm_JSFPCookieMigrateSessionID="cm_mc_sid";}if(!cm_JSFPMigrationDomainWhitelist){var cm_JSFPMigrationDomainWhitelist=null;}if(!cm_JSFPMigrationDomainBlacklist){var cm_JSFPMigrationDomainBlacklist=null;}if(!cm_JSFPMigrationPathWhitelist){var cm_JSFPMigrationPathWhitelist=null;}if(!cm_JSFPMigrationOtherCookies){var cm_JSFPMigrationOtherCookies=null;}if(!cm_JSFPMigrationOtherCookiesExpireTimes){var cm_JSFPMigrationOtherCookiesExpireTimes={};}if(!cm_JSFMigrationEnabled){var cm_JSFMigrationEnabled=0;}if(!cm_JSFSessionType){var cm_JSFSessionType="I";}if(!cm_JSFSessionTimeout){var cm_JSFSessionTimeout=1800;}if(!cm_JSFCoreCookieName){var cm_JSFCoreCookieName="CoreID6";}if(!cm_JSFSpecCookieNames){var cm_JSFSpecCookieNames=[];}if(!cmUA){var cmUA={};cmUA["MSIE"]=2083;}if(!cmDefaultLimit){var cmDefaultLimit=8197;}if(cGQ==null){var cGQ=true;}if(!cGO){var cGO=1024;}if(!cGR){var cGR=600000;}if(!encodeURIComponent){var encodeURIComponent=null;}var cG8;var cG8Index;var cG6=document;var cGT;var cG7=new _cG7();cG6.cmTagCtl=cG7;var CI=cmStartTagSet;var CJ=cmSendTagSet;var cG1=0;var cG0=["vn1","vn2","st","pi","rs","ec","rf","ul"];var cmLastPageID=null;var cGA=null;var cmMigrationDisabled=0;var cmMigrationFrom1p_CM=1;var cmMigrationFrom1p_SA=2;var cmValidFlag_SessionContinue=1;var cmValidFlag_NewSession=2;var cmValidFlag_NewVisitor=4;var cmValidFlag_SessionReset=32;var cmSACookieName="sauid";var cmCore_JSFParamEnabled="cjen";var cmCore_JSFParamUserID="cjuid";var cmCore_JSFParamSessionID="cjsid";var cmCore_JSFParamValidFlag="cjvf";var cmCore_JSFParamSpecCookiesCount="cjscc";var cmCore_JSFParamSpecCookiesNames="cjscn";var cmCore_JSFParamSpecCookiesValues="cjscv";var cmSpecCookieNames="";var cmSpecCookieValues="";var cmSpecCookiesCount=0;if(!cG4){var cG4=5000;}if(!cG5){var cG5=200;}var cG2={};var cG3={};var cGM=navigator.appVersion;var cGN=navigator.userAgent;var cGS=cGN.indexOf("Opera")>=0;var cGU=cGN.indexOf("Safari")>=0;var cmT2=-1;var cmT3=-1;var cGC="";var cGD="";var cGE="";var cGF="";var cGG="";var cGH="";var cmSubmitFlag=false;var cmFormC1="submitbuttonreset";var cmFormC2="textpasswordtextarea";var cmFormC3="select-oneselect-multiple";var cGI="";var cGJ="";var cGK="";var cGL="";var chost=null;var cci=null;var _cm_CMRules={};var _cm_isNew=true;if(!cm_PartnerDataClientIDs){var cm_PartnerDataClientIDs="";}var cm_Avid;var cmCookieExpDate;var cm_AvidLoadTimer;var cm_IOEnabled=false;var cm_ATEnabled=false;CI();for(var cmSpecCookieIndex=0;cmSpecCookieIndex<cm_JSFSpecCookieNames.length;cmSpecCookieIndex++){var currSpecCookieName=cm_JSFSpecCookieNames[cmSpecCookieIndex];var currSpecCookieValue=cI(cm_JSFSpecCookieNames[cmSpecCookieIndex]);if(currSpecCookieValue==null)continue;if(currSpecCookieValue.length==0)continue;cmSpecCookieNames=cmSpecCookieNames+(cmSpecCookieNames!=""?"|":"")+escape(currSpecCookieName);cmSpecCookieValues=cmSpecCookieValues+(cmSpecCookieValues!=""?"|":"")+escape(currSpecCookieValue);cmSpecCookiesCount++;}var dt=new Date();var cmYearOffset=0;if(dt.getFullYear)cmYearOffset=dt.getFullYear();else{cmYearOffset=dt.getYear();if(cmYearOffset<1900)cmYearOffset+=1900;}dt.setYear(cmYearOffset+15);cmCookieExpDate=dt.toGMTString();if(cm_UseCookie){var pi=cI("cmRS","pi","");if(pi!="")cmLastPageID=pi;chost=cm_HOST;cm_HOST=cI("cmRS","ho",chost);cci=cm_ClientID;cm_ClientID=cI("cmRS","ci",cci);var cT3=cI("cmRS","t3","");if(cT3!=""){cGA=cT3;}var jsfpdata=cI("cmRS","cjen","");if(jsfpdata!=""){cm_JSFEnabled=true;}var cT1=cI("cmRS","t1","");if(cT1!=""&&(!cGA||cm_ClientTS - cGA<cGR)){cmAddShared("st",cT1);var ul=cI("cmRS","ul","");var rf=cI("cmRS","rf","");var cT2=cI("cmRS","t2","");var cT4=cI("cmRS","t4","");if(cm_TrackTime)cN(cT1,cT2,cT3,cT4,true,pi);var hr=cI("cmRS","hr","");if(hr!=""){var ti=cI("cmRS","lti","");if(cm_ClientTS - ti<cGR){var nm=cI("cmRS","ln","");cM(cT1,ti,nm,hr,true,pi,ul,rf);}}var cV6=cI("cmRS","ac","");var cV7=cI("cmRS","fd","");if((cV6!="")||(cV7!="")){var ti=cI("cmRS","fti","");if(cm_ClientTS - ti<cGR){var cV9=cI("cmRS","fn","");var cV0=cI("cmRS","fu","");cL(cT1,ti,cV9,cV6,cV0,cV7,true,pi,ul,rf);}}var cError=unescape(cI("cmRS","uer",""));CH(cT1,cT3,cError,true,pi);}CC("cmRS");}if(!cGS&&(cF(4)||CD(5))){cmAddNewEvent(window,"load",cY);cmAddNewEvent(window,"unload",cZ);if(cm_DelayHandlerReg.indexOf("L")==-1)window.cX("main");if(cm_DelayHandlerReg.indexOf("F")==-1)cU();}CJ(1);var _cmPartnerUtils={};_cmPartnerUtils.AT_TagQueue=[];_cmPartnerUtils.AT_PartnerCallQueue=[];_cmPartnerUtils.AT_RulesSet=false;_cmPartnerUtils.AT_NRFlagNeeded=false;_cmPartnerUtils.AT_NRFlagSet=false;}function cmLoad(){if(cm_OffsiteImpressionsEnabled){cm_Avid=cI("CMAVID");if(cm_Avid==null){_cmPartnerUtils.loadScript(C8(null)+"//"+cm_AvidHost);cm_AvidLoadTimer=setTimeout("cm_AvidLoadTimedOut=true",2000);}}var rules_HOST=cm_Production_HOST;if(cm_ATEnabled){if(!cI("CMDisabled")&&(cI("CMOptout")?cI("CMOptout").toUpperCase()!="OPT_OUT":true)&&(cI("ID")?cI("ID").toUppercase()!="OPT_OUT":true)&&(cI("CMOptout")?cI("CMOptout").toUpperCase()!="ANONYMOUS":true)){if(typeof(_cm_CMRulesLoaded)=="undefined"){var splitCIds=cm_ClientID.split(";");for(var n=0;n<splitCIds.length;n++){splitCIds[n]=splitCIds[n].split("|")[0];if(cm_PartnerDataClientIDs.indexOf(splitCIds[n])!=-1){if(cI("CorePartnerMode")=="TEST")_cmPartnerUtils.loadScript(C8(null)+'//'+rules_HOST+'/at/rules_'+splitCIds[n]+'test.js');else _cmPartnerUtils.loadScript(C8(null)+'//'+rules_HOST+'/at/rules_'+splitCIds[n]+'.js');}}cG6._cm_CMRulesLoaded=1;}}}}var cI=cI;var cE=cE;function cmStartTagSet(){if(cG8)return;cG8=[];cG8[0]=new _cm();cG8Index=1;}function cmAddShared(nm,val){if(cG8)cG8[0][nm]=val;}function cmSendTagSet(){var request;var cG8_tmp=cG8;while((request=C7(arguments[0]))!=null){c9(request,cG8_tmp[0].ci);}cG8=null;}function _cmCQ(pl,host,qs){this.pl=pl;this.hosts=host.split(",");if(qs)this.qs=qs;this.cM5=CR;}function CR(){var a=arguments;var h=a[0]?a[0]:this.hosts[0];return this.pl+"//"+h+(this.qs?this.qs:"");}function _cG7(){this.cM0={};this.uls={};this.rfs={};this.cTI=[];this.cPE=0;this.normalizeURL=c2;this.getPageID=c1;this.getPluginPageID=cmGetPluginPageID;}function cmGetPluginPageID(cVA){var finalClientID="";splitClientIDs=cm_ClientID.split(";");cVAPortion=cVA.split("|")[0];subIDPortion=cVA.split("|")[1];for(var n=0;n<splitClientIDs.length;n++){if(cVAPortion==splitClientIDs[n].split("|")[0]){if(subIDPortion){subIDPortion=subIDPortion.split(":");for(var m=0;m<subIDPortion.length ;m++){if(splitClientIDs[n].split("|")[1]&&(splitClientIDs[n].split("|")[1].toUpperCase().indexOf(subIDPortion[m].toUpperCase())>-1)){finalClientID=cm_ClientID;break;}}break;}else{finalClientID=cm_ClientID;break;}}}return this.getPageID(finalClientID);}function c1(cVA){var pi=cG7.cM0[cVA];return pi?pi:"";}function CS(cVA){var ul=cG7.uls[cVA];if(!ul)ul=window.location.href;return ul?ul:"";}function CT(cVA){var rf=cG7.rfs[cVA];if(!rf)rf=cG6.referrer;return rf?rf:"";}function CP(href){var h=cGT;if(!h)h=cGT=cG7.normalizeURL(window.location.href,false);var a=href.indexOf("#");if(a>=0&&a<=h.length){var ha=h.indexOf("#");if(ha<0)ha=h.length;if(href.substring(0,a)==h.substring(0,ha))return href.substring(a);}return href;}function c2(url,isHref){if(isHref){url=CP(url);var pfx=window.location.protocol+"//"+window.location.host;if(url.indexOf(pfx)==0)url=url.substring(pfx.length);}return cD(url);}function c4(){for(var b in cmUA)if(cGM.indexOf(b)!=-1)return cmUA[b];return cmDefaultLimit;}function C0(n){if(cG7){if(cG7.cTI&&cG7.cTI[n]){cG7.cTI[n].cmLD=true;if(cG7.cTI[n].ci){cmJSFSetValidFlagValue(cmValidFlag_SessionContinue,false,cG7.cTI[n].ci);cmJSFSetSessionCookies(false,cG7.cTI[n].ci);}}cG7.cPE--;if(cG7.onResponse)cG7.onResponse(n);}window.dontExit=false;}function CN(n){if(cG7){cG7.cPE--;var img=null;if(cG7.cTI&&cG7.cTI[n]){img=cG7.cTI[n];img.cmLD=true;}if(cG7.onError&&(!img||!img.cmTO))cG7.onError(3,img);}}function c6(host,n){if(cG3)cG3[host]=true;C0(n);}function CO(n){if(cG7&&cG7.cTI&&cG7.cTI[n]&&!(cG7.cTI[n].cmLD)){var img=cG7.cTI[n];img.cmTO=img.src;if(cG7.onError)cG7.onError(4,img.cmTO);}}function c8(host){if(!cG3||cG3[host])return true;var dt=new Date();if((dt.getTime()-cG2[host])>cG4)return true;return false;}function CV(host,url,cVBH){if(!cVBH)cVBH=cm_ClientID;if((!cG2[host]||c8(host))&&(cm_OffsiteImpressionsEnabled==false||cm_Avid!=null||cm_AvidLoadTimedOut)){var img=new Image();var i=cG1;cG7.cTI[cG1++]=img;if(!cG2[host]){var dt=new Date();cG2[host]=dt.getTime();img.onload=new Function("if(c6)c6('"+host+"',"+i+");");}else{img.onload=new Function("if(C0)C0("+i+");");}img.onerror=new Function("if(CN)CN("+i+");");if(cm_OffsiteImpressionsEnabled&&(cm_Avid!=null)&&(cm_Avid!="none")){url+="&avid="+cm_Avid;}var limit=c4();if(url.length>limit){url=url.substring(0,limit-6)+"&err=O";}if(cG7.onTagSent)cG7.onTagSent(url,i);img.src=url;img.ci=cVBH;setTimeout('if(CO)CO('+i+');',cm_TimeoutSecs * 1000);}else{setTimeout('if(CV)CV("'+host+'","'+url+'","'+cVBH+'");',cG5);}}function c9(img,ci){if(cI("CMDisabled")||(cI("CMOptout")?cI("CMOptout").toUpperCase()=="OPT_OUT":false)||(cI("ID")?cI("ID").toUpperCase()=="OPT_OUT":false))return;for(var h=0;h<img.hosts.length;h++){var url=img.cM5(img.hosts[h]);cG7.cPE++;CV(img.hosts[h],url,ci);}}function cC(){var result=null;if(!this.ul){if(this.tid=="8"||(this.tid=="9"||this.tid=="10")){this.ul=window.location.protocol+"//"+window.location.hostname;}else{this.ul=window.location.href;}}if(cG8){cG8[cG8Index++]=this;}else{var request=this.getImgSrc(arguments[0],1);c9(request,this.ci);result=request;}return result;}function cmLogError(e){}function C4(src,tgt,compact){if(!compact){if(!src.rf){if(!document.referrer)tgt.rf="";else tgt.rf=document.referrer;}else if(src!=tgt)tgt.rf=src.rf;if(!src.ul||src.ul==""||src.ul=="(none)")tgt.ul=window.location.href;else if(src!=tgt)tgt.ul=src.ul;var ul=cG7.normalizeURL(tgt.ul,false);var rf=cG7.normalizeURL(tgt.rf,false);if(ul!=""){tgt.ul=ul;}if(rf!=""){tgt.rf=rf;}}}function C5(tgt,compact){if(cm_FirstPartyDetect&&!compact){if(cI("cmRS")||cI("TestSess")){tgt.ts="Y";}else{CB("TestSess","Y");tgt.ts=cI("TestSess");}tgt.tp=cI("TestPerm");if(tgt.tp!="Y"){dt.setHours(dt.getHours()+5);CB("TestPerm","Y",dt.toGMTString());tgt.tp=cI("TestPerm");}}}function C6(tag,cV3,skipJSFParams){var qs="";if(tag.tid)qs+="tid="+tag.tid;var isPV=(tag.tid==1||(tag.pc&&tag.pc.charAt(0)=='Y'));if(!tag.lp&&isPV)tag.lp=cmLastPageID;for(var cOb in tag){if(cOb=="qs"||cOb=="tid"||cOb=="topline")continue;if(!tag[cOb]||tag[cOb]==""||tag[cOb].constructor==Function)continue;if(cV3&&cV3[cOb]&&cV3[cOb]==tag[cOb])continue;if(qs!="")qs+="&";qs+=cD(cOb)+"="+cE(cD(tag[cOb]));}if(!tag.rs&&tag.ci){if(tag.pi&&isPV)cG7.cM0[tag.ci]=tag.pi;if(tag.ul)cG7.uls[tag.ci]=tag.ul;if(tag.rf)cG7.rfs[tag.ci]=tag.rf;}if(cV3&&cm_SecureTags.indexOf("|"+tag.tid+"|")!=-1)cV3.protocol="https:";if(cm_JSFEnabled&&!skipJSFParams){cmJSFSetSessionCookies(false,tag.ci);qs+=(qs!=""?"&":"")+cmCore_JSFParamEnabled+"=1";var userIdParamValue=cI(cm_JSFCoreCookieName);if(userIdParamValue){userIdParamValue=userIdParamValue.split("&",2)[0];if(userIdParamValue=="anonymous"||(cI("CMOptout")?cI("CMOptout").toUpperCase()=="ANONYMOUS":false)){userIdParamValue="1000000000000003";}}if(cmJSFPUseUAForUnica()){userIdParamValue=cmJSFPUnicaNoUIDValue();}qs+="&"+cmCore_JSFParamUserID+"="+(userIdParamValue!=null?userIdParamValue:"");qs+="&"+cmCore_JSFParamSessionID+"="+cmJSFGetSessionValue(tag.ci);if(cmSpecCookiesCount>0){qs+="&"+cmCore_JSFParamSpecCookiesCount+"="+cmSpecCookiesCount;qs+="&"+cmCore_JSFParamSpecCookiesNames+"="+cmSpecCookieNames;qs+="&"+cmCore_JSFParamSpecCookiesValues+"="+cmSpecCookieValues;}qs+="&"+cmCore_JSFParamValidFlag+"="+cmJSFGetValidFlagValue(tag.ci);}if(cm_PartnerDataClientIDs&&tag.tid){try{var newTag={};for(var key in tag){var val=tag[key];if(typeof(val)!="function"&&typeof(val)!="undefined")if(key=="ci"){val=val.split(";");for(var n1=0;n1<val.length;n1++){val[n1]=val[n1].split("|")[0];}val=val.join(";");}newTag[key]=val;}if(cV3){for(var key in cV3){var val=cV3[key];if(typeof(val)!="function"&&typeof(val)!="undefined")if(key=="ci"){val=val.split(";");for(var n1=0;n1<val.length;n1++){val[n1]=val[n1].split("|")[0];}val=val.join(";");}newTag[key]=val;}}newTag.calculateTopLineAndReturnSegments=tag.calculateTopLineAndReturnSegments;if(_cmPartnerUtils.AT_RulesSet){if(_cmPartnerUtils.AT_NRFlagNeeded){if(_cmPartnerUtils.AT_NRFlagSet){_cmPartnerUtils.calculateAndSendATData(newTag);}else{_cmPartnerUtils.AT_TagQueue.push(newTag);}}else{_cmPartnerUtils.calculateAndSendATData(newTag);}}else{_cmPartnerUtils.AT_TagQueue.push(newTag);}}catch(e){}}return qs;}function C8(cV3){var cm_pl=location.protocol;if(cV3&&cV3.protocol)cm_pl=cV3.protocol;if(cm_pl!="http:"&&cm_pl!="https:")cm_pl="http:";return cm_pl;}function c0(){var a=arguments;C4(this,this,a[0]);C5(this,a[0]);var cV3={};var qs=C6(this,cV3);var req=new _cmCQ(C8(cV3),cm_HOST,qs);return a[1]?req:req.cM5();}function C7(){var cV3,first,p,a,pl,lim,len,l,i,tq,img;if(!cG8||cG8.length<2)return null;cV3=cG8[0];first=cG8[1];cV3.ci=first.ci;for(i=1;i<cG8.length;i++){if(cV3.ci.indexOf(cG8[i].ci)==-1){cV3.ci+=";"+cG8[i].ci;}if(cm_SecureTags.indexOf("|"+cG8[i].tid+"|")!=-1)cV3.protocol="https:";}for(i=0;i<cG0.length;i++){p=cG0[i];if(!cV3[p])cV3[p]=first[p];}a=arguments;C4(first,cV3,a[0]);C5(cV3,a[0]);pl=C8(cV3);img=new _cmCQ(pl,cm_HOST);img.qs=C6(cV3);lim=c4();len=0;for(var h=0;h<img.hosts.length;h++){l=pl.length+img.hosts[h].length+img.qs.length;if(l>len)len=l;}for(i=1;i<cG8.length;i++){tq=C6(cG8[i],cV3,true);if(i>1&&len+tq.length+1>lim){for(j=1;j<cG8.length-i+1;j++)cG8[j]=cG8[j+i-1];cG8.length=cG8.length-i+1;break;}len+=tq.length+1;img.qs+="&"+tq;}if(i==cG8.length)cG8=null;return img;}function _cm(){var i,a=arguments;this.ci=cm_ClientID;for(i=0;i<a.length;i++)this[a[i]]=a[++i];this.write=cC;this.getImgSrc=c0;this.writeImg=cC;this.st=cm_ClientTS;this.vn1="4.8.6H";if(cF(5.5)||!cF(0)){var ec=(cm_UseUTF8&&encodeURIComponent)||cGU?"utf-8":cG6.charset;if(!ec)ec=cG6.defaultCharset;if(!ec)ec=cG6.characterSet;this.ec=ec;}this.topline=[];}function cD(s){var z="";s=z+(!s?"":s);return s.split("'").join(z).split("\"").join(z).split("\r").join(z).split("\n").join(z);}function cE(s){var i=0,j;while(s.charAt(i)==" "&&i!=s.length)i++;j=s.length-1;while(s.charAt(j)==" "&&j!=0)j--;s=s.substring(i,j+1);if(cm_UseUTF8&&encodeURIComponent)s=encodeURIComponent(s);else{s=preEscape(s);s=escape(s);var regularExpression=new RegExp("%25u00","g");s=s.replace(regularExpression,"%u00");}s=s.split("+").join("%2B");return s;}function preEscape(str){for(var i=160;i<256;i++){var regularExpression=new RegExp(String.fromCharCode(i),"g");str=str.replace(regularExpression,"%u00"+i.toString(16));}return str;}function cF(ver){var i=cGM.indexOf("MSIE");if(i!=-1)return(parseFloat(cGM.substring(i+5))>=ver);return false;}function CD(ver){return(cGN.indexOf("Gecko")!=-1&&parseInt(cGM)>=ver);}function cI(nm,skey,cV5){var dc=cG6.cookie;var cV4=cJ(nm,dc,";");if(!skey||!cV4){if(!cV4&&cV5!=null){return cV5;}return cV4;}cV4=cJ(skey,cV4,"&");if(!cV4&&cV5!=null){return cV5;}return unescape(cV4);}function CL(){var cookies,dc,nv,i,c=0;dc=cG6.cookie;if(dc){cookies=dc.split(";");c=cookies.length;for(i=0;i<cookies.length;i++){nv=cookies[i].split("=");if(nv.length<2||nv[1]==null||nv[1]==""){c--;}}}return c;}function CB(nm,val,expires,domain){var err,len,v,dc=cG6.cookie;err=null;len=val.length+1;if(!cI(nm)){len+=nm.length;}if(len>4096)err=1;else if(dc){if(CL()>=50)err=2;}if(err){if(cG7.onError)cG7.onError(err,name);return false;}v=nm+"="+val+";path=/";if(domain)v+=";domain="+domain;if(expires)v+=";expires="+expires;cG6.cookie=v;return true;}function cmSetSubCookie(nm,skey,value,expires,domain){var currentCookieVal=cI(nm);var newCookieVal;if(!currentCookieVal){newCookieVal=skey+"="+value;}else{var sep='&';var pfx=skey+"=";var begin=currentCookieVal.indexOf(pfx);if(begin>=0){if(begin>0&&currentCookieVal.charAt(begin - 1)!=sep){begin=currentCookieVal.indexOf(sep+pfx);if(begin>=0){begin++;}}}if(begin>=0){var valueOffset=begin+skey.length+1;var end=currentCookieVal.indexOf(sep,valueOffset);if(end<0){end=currentCookieVal.length;}newCookieVal=currentCookieVal.substring(0,valueOffset)+value+currentCookieVal.substring(end);}else{newCookieVal=currentCookieVal+sep+skey+"="+value;}}CB(nm,newCookieVal,expires,domain);}function CC(nm,domain){var v=cI(nm);if(v!=null){var dt=new Date();dt.setYear(1973);var v=nm+"=;path=/;expires="+dt.toGMTString();if(domain)v+=";domain="+domain;cG6.cookie=v;}return v;}function cJ(nm,src,sep){var pfx,s,begin,end,obj=null;pfx=nm+"=";s=sep+' ';begin=src.indexOf(s+pfx);if(begin==-1){s=sep;begin=src.indexOf(s+pfx);}if(begin==-1){begin=src.indexOf(pfx);if(begin!=0){return null;}}else{begin+=s.length;}end=src.indexOf(s,begin);if(end==-1){end=src.length;}return src.substring(begin+pfx.length,end);}function cK(elt,type,handle,fName,f){if(handle){var event=handle.toString();var tempFName=fName.substring(0,fName.indexOf("("));if(event.indexOf(tempFName)==-1){if(cGU&&event.indexOf("function "+"(")==0){if(type=="onload"){fName=event.substring(event.indexOf("{"),event.length)+";"+fName+";";}else{fName=fName+";"+event.substring(event.indexOf("{"),event.length);}}else{elt["_c_"+type]=handle;if(type=="onload"){fName="if(!e)var e=null;var ret=this._c_"+type+"("+(cF(5)?"":"e")+");"+fName+";return ret;"}else{fName="if(!e)var e=null;var tempReturn=this._c_"+type+"("+(cF(5)?"":"e")+");"+fName+";return tempReturn";}}var newfunc=new Function("e",fName);return newfunc;}else{return handle;}}else{return f;}}function CG(e){var e;if(cF(4)){if(window.event){e=window.event.srcElement;}else{return null;}}else if(e){if(CD(5)){e=e.currentTarget;}else{e=e.target;}}return e;}function CU(cm,cVBH,pi,dest,ref){var ul,rf;cm.pi=pi?pi:c1(cVBH);if(cGQ){if(dest||ref){cm.ul=dest?dest:"";cm.rf=ref?ref:"";}else{ul=CS(cVBH);rf=CT(cVBH);if(cm.pi==""||ul.indexOf("cm_")>0||(rf!=""&&rf.indexOf(window.location.protocol+"//"+window.location.host)!=0)){cm.ul=ul;cm.rf=rf;}}}}function cL(t1,t3,fname,cVB,url,field,resent,pi,dest,ref){var cm=new _cm("tid","10");CU(cm,cm.ci,pi,dest,ref);cm.st=t1;cm.ti=t3;cm.fo=fname;cm.ac=cVB;cm.hr=url;cm.fi=field;if(resent)cm.rs="Y";cm.write(1);}function cM(t1,ti,name,href,resent,pi,dest,ref){var cm=new _cm("tid","8");CU(cm,cm.ci,pi,dest,ref);cm.st=t1;cm.ti=ti;cm.nm=name;cm.hr=href;var cm_crIndex=href.indexOf("cm_cr=");var cm_meIndex=href.indexOf("cm_me=");if(cm_crIndex>-1){var tempIndex=href.indexOf("&",cm_crIndex);if(tempIndex==-1){cm.cm_cr=href.substring(cm_crIndex+6);}else{cm.cm_cr=href.substring(cm_crIndex+6,tempIndex);}}if(cm_meIndex>-1){var tempIndex=href.indexOf("&",cm_meIndex);if(tempIndex==-1){cm.cm_me=href.substring(cm_meIndex+6);}else{cm.cm_me=href.substring(cm_meIndex+6,tempIndex);}}if(resent)cm.rs="Y";cm.write(1);}function cN(t1,t2,cx,t4,resent,pi){var cm=new _cm("tid","11");cm.pi=pi?pi:c1(cm.ci);cm.st=t1;cm.lc=t2;cm.lx=t4;cm.cx=cx;if(resent)cm.rs="Y";cm.write(1);}function CM(href){var n,len,a,q;if((n=href.indexOf("?"))==-1)n=href.lastIndexOf("/");if(n!=-1){len=href.indexOf("#",n);if(len==-1)len=href.length;while(n!=-1&&n<len){n=href.indexOf("cm_",n);if(n!=-1){a=href.indexOf("&",n);if(a==-1)a=len;q=href.indexOf("=",n);if(q!=-1&&q<a)this[href.substring(n,q)]=href.substring(q+1,a);n=a;}}}}function CK(href,trackSP,trackRE,trackCR,trackME){var cm,link,sp,re,cr,me;if((trackSP||trackRE||trackCR||trackME)&&href){cm=new _cm("tid","9");link=new CM(CP(href));if(trackSP){sp=cm.cm_sp_o=link.cm_sp_o;if(!sp)sp=cm.cm_sp=link.cm_sp;}if(trackRE){re=cm.cm_re_o=link.cm_re_o;if(!re)re=cm.cm_re=link.cm_re;}if(trackCR){if(href.indexOf("#")==-1){cr=cm.cm_cr=link.cm_cr;}}if(trackME){me=cm.cm_me=link.cm_me;}if(sp||re||cr||me){cm.pi=c1(cm.ci);cm.st=cm_ClientTS;if(typeof cmCheckIgnoreImpression=='function'){if(cmCheckIgnoreImpression(sp,re,cr,me)){cm.write(1);}}else{cm.write(1);}}}}function CH(t1,ti,msg,resent,pi){if(msg!=cGL){var cm=new _cm("tid","12");cm.pi=pi?pi:c1(cm.ci);cm.st=t1;cm.ti=ti;if(resent)cm.rs="Y";cm.er=msg;cm.write(1);cGL=cm_FormError;}}function cmFormBlurRecord(e){if(e.cmFormEleMemValue!=cmFormElementValue(e)&&e.cmFormEleMemValue!=null){cmFormReportInteraction(e);}e.form.cmEleValue=-1;}function cmFormElementOnclickEvent(){try{var q;var cFE=cmFormElementValue(this);if((cmFormC1.indexOf(this.type)>=0)||(this.cmFormEleMemValue!=cFE)){if(this.type=="radio"){for(q=0;q<this.form.elements.length;q++){if(this.form.elements[q].cM2==this.cM2){this.form.elements[q].cmFormEleMemValue=null;}}}this.cmFormEleMemValue=cFE;cmFormReportInteraction(this);}}catch(e){cmLogError(e);}}function cmFormElementOnfocusEvent(){try{this.form.cmEleValue=this.cM2;this.cmFormEleMemValue=cmFormElementValue(this);}catch(e){cmLogError(e);}}function cmFormElementOnblurEvent(){try{cmFormBlurRecord(this);}catch(e){cmLogError(e);}}function cmFormElementOnchangeEvent(){try{cmFormReportInteraction(this);}catch(e){cmLogError(e);}}function cmFormElementValue(e){var x;if(e.type=="checkbox")return e.checked;else if((cmFormC3.indexOf(e.type)>=0)&&e.options){var sel_val="";for(x=0;x<e.options.length;x++){if(e.options[x].selected==true)sel_val=sel_val+e.options[x].index;}return sel_val;}else if(cmFormC2.indexOf(e.type)>=0||e.type=="file"||e.type=="radio"){return e.value;}else{return null;}}function cO(cVC,cVB){var dt,url,x,cFa="";var cF=null;cVB=cVC+":"+cVB;if(cVC!=-1){if(cG6.forms[cVC]){cF=cG6.forms[cVC];var cFa=cF.attributes;url=cF.action?cF.action:cFa.action.nodeValue?cFa.action.nodeValue:cFa.getNamedItem('action').value?cFa.getNamedItem('action').value:"";}}cGD=cG6.cmTagCtl.normalizeFORM(cGD);var pgID=c1(cm_ClientID);if(cm_FormPageID&&pgID!=""){var frmAr=cGD.split(";");cGD="";for(x=0;x<frmAr.length-1;x++){cGD+=pgID.split(":").join("").split(";").join("")+"_"+frmAr[x]+";";}cm_FormPageID=false;}if(cV(url)&&(cVC!="-1"||(cVC=="-1"&&cmSubmitFlag==false))){dt=new Date();cGH=dt.getTime();cGF=cVB;cGE=cG7.normalizeURL(url,true);cL(cm_ClientTS,cGH,cGD,cGF,cGE,cGC,false);cGG=cGC;cGC="";if((cF)&&(typeof cmCustomFormSubmitHandler=='function')){cmCustomFormSubmitHandler(cF,cVB);}}else{cGF="";}}function cmFormOnresetEvent(){var x;try{cO(this.cM1,"R");}catch(e){cmLogError(e);}try{for(x=0;x<cG6.forms[this.cM1].elements.length;x++){cG6.forms[this.cM1].elements[x].cmFormEleMemValue=false;}}catch(e){cmLogError(e);}try{if(this.cQ){return this.cQ();}}catch(e){cmLogError(e);}}function cmFormOnsubmitEvent(e2){try{if(this.cmEleValue>-1){cmFormBlurRecord(this.elements[this.cmEleValue]);}}catch(e){cmLogError(e);}try{if(this.cM1>=0&&this.cmSubmitIndex==false){cmSubmitFlag=true;this.cmSubmitIndex=true;cO(this?this.cM1:-1,"S");CE();}}catch(e){cmLogError(e);}cmJSFPMigrateLink(this,"action");}function cmFormReportInteraction(e){var cmElementName=cG6.cmTagCtl.normalizeFIELDS(e.name?e.name:e.id?e.id:"");var cmTempFieldSeq=cGC+e.form.cM1+":"+e.cM2+":"+cmElementName.split(":").join("|").split(";").join("|")+";";if(cmTempFieldSeq.length<1000){cGC=cmTempFieldSeq;}}function cmFormSubmit(){cmJSFPMigrateLink(this,"action");try{if(this.cmEleValue>-1){cmFormBlurRecord(this.elements[this.cmEleValue]);}}catch(e){cmLogError(e);}try{if(this.cM1>=0&&this.cmSubmitIndex==false){cmSubmitFlag=true;this.cmSubmitIndex=true;cO(this?this.cM1:-1,"S");CE();}}catch(e){cmLogError(e);}try{this.cmSubmit();}catch(e){cmLogError(e);}}cG6.cmTagCtl.normalizeFORM=function(form){return form;};cG6.cmTagCtl.normalizeFIELDS=function(field){return field;};function cU(){if(cm_SkipHandlerReg.indexOf("F")==-1){var i,form,cV9,j,e,rdname,ei;for(i=0;i<cG6.forms.length;i++){form=cG6.forms[i];ei=0;if(!form.cM1&&!form.cmEleValue&&!form.cmSubmitIndex){form.cM1=i;form.cmEleValue=-1;form.cmSubmitIndex=false;form.radiogroup={"key":"value"};try{if(cF(5)&&!cF(8)){var cm_FA=form.attributes;cV9=cm_FA.name?cm_FA.name.nodeValue:cm_FA.id?cm_FA.id.nodeValue:"UNDEFINED";}else if(form.attributes.getNamedItem){cV9=form.attributes.getNamedItem('name').value;}else{cV9=form.name;}}catch(e){cV9="UNDEFINED";cmLogError(e);}cGD+=cV9+":"+i+";";try{if(form.submit!==cmFormSubmit){form.cmSubmit=form.submit;form.submit=cmFormSubmit;}}catch(e){cmLogError(e);}cmAddNewEvent(form,"submit",cmFormOnsubmitEvent);cmAddNewEvent(form,"reset",cmFormOnresetEvent);for(j=0;j<form.elements.length;j++){e=form.elements[j];if(!e.cM1&&!e.cM2&&!e.cmFormEleMemValue){e.cM1=i;e.cM2=ei;e.cmFormEleMemValue=null;ei++;if(e.type=="radio"){rdname=e.name?e.name:e.id?e.id:"";if(rdname!=""){if(form.radiogroup[rdname]){e.cM2=form.radiogroup[rdname];}else{form.radiogroup[rdname]=e.cM2;}}}if(cmFormC1.indexOf(e.type)>=0||e.type=="checkbox"||e.type=="radio"){try{cmAddNewEvent(e,"click",cmFormElementOnclickEvent);}catch(e){cmLogError(e);}}if(cmFormC2.indexOf(e.type)>=0||cmFormC3.indexOf(e.type)>=0){try{cmAddNewEvent(e,"focus",cmFormElementOnfocusEvent);cmAddNewEvent(e,"blur",cmFormElementOnblurEvent);}catch(e){cmLogError(e);}}if(e.type=="file"){try{cmAddNewEvent(e,"change",cmFormElementOnchangeEvent);}catch(e){cmLogError(e);}}}}}}}}function cV(path){if(cm_TrackLink==true||cm_TrackLink=="A")return true;else{if(cm_TrackLink=="E"&&path.indexOf("/")!=0)return true;var de;if((de=cm_DownloadExtensions)!=null){var p=path.lastIndexOf(".");if(p!=-1){var ext=path.substring(p);for(var e=0;e<de.length;e++){if(ext==de[e])return true;}}}return false;}}function cW(e){CI();var e=CG(e);if(e)C9(e);CA(1);CJ(1);CE();}function C9(e){cGI="";cGJ="";cGK="";var type=e.tagName.toUpperCase();if(type=="AREA"){cGJ=e.href?e.href:"";var p=e.parentElement?e.parentElement:e.parentNode;if(p!=null)cGI=p.name?p.name:"";}else{while(type!="A"&&type!="HTML"){if(!e.parentElement){if(e.parentNode){e=e.parentNode;}else{break;}}else{e=e.parentElement;}if(e){type=e.tagName.toUpperCase();}}if(type=="A"){cGJ=e.href?e.href:"";cGI=e.name?e.name:"";}}if(e.getAttribute){var man_cm_re=e.getAttribute("manual_cm_re");if(man_cm_re){cGJ=cGJ.split("#");cGJ[0]=cGJ[0]+((cGJ[0].indexOf("?")>-1)?"&":"?")+"cm_re="+man_cm_re;cGJ=cGJ.join("#");}var man_cm_sp=e.getAttribute("manual_cm_sp");if(man_cm_sp){cGJ=cGJ.split("#");cGJ[0]=cGJ[0]+((cGJ[0].indexOf("?")>-1)?"&":"?")+"cm_sp="+man_cm_sp;cGJ=cGJ.join("#");}}cGJ=cG7.normalizeURL(cGJ,true);if(cV(cGJ)==true){var dt=new Date();cGK=dt.getTime();if(typeof cmCustomLinkClickHandler=='function'){cmCustomLinkClickHandler(e);}cM(cm_ClientTS,cGK,cGI,cGJ,false);}else{cGJ="";}cmJSFPMigrateLink(e,"href");}function cmAddNewEvent(obj,type,fn){if(obj.attachEvent&&(obj['e'+type+fn]===undefined)){obj['e'+type+fn]=fn;obj[type+fn]=function(){obj['e'+type+fn](window.event);};obj.attachEvent('on'+type,obj[type+fn]);}else if(obj.addEventListener){obj.addEventListener(type,fn,false);}}function cX(phase){CI();var i,lnk,imp,trackSP,trackRE,trackCR,trackME;imp=cm_TrackImpressions;trackSP=(imp.indexOf("S")!=-1);trackRE=(imp.indexOf("R")!=-1);trackCR=(imp.indexOf("C")!=-1);trackME=(imp.indexOf("C")!=-1);for(i=0;i<cG6.links.length;i++){lnk=cG6.links[i];if(cm_SkipHandlerReg.indexOf("L")==-1){cmAddNewEvent(lnk,"click",cW);}if(phase=="onload"){var tempLinkHref=lnk.href;if(lnk.getAttribute("manual_cm_re")){tempLinkHref=tempLinkHref.split("#");tempLinkHref[0]=tempLinkHref[0]+((tempLinkHref[0].indexOf("?")>-1)?"&":"?")+"cm_re="+lnk.getAttribute("manual_cm_re");tempLinkHref=tempLinkHref.join("#");}if(lnk.getAttribute("manual_cm_sp")){tempLinkHref=tempLinkHref.split("#");tempLinkHref[0]=tempLinkHref[0]+((tempLinkHref[0].indexOf("?")>-1)?"&":"?")+"cm_sp="+lnk.getAttribute("manual_cm_sp");tempLinkHref=tempLinkHref.join("#");}if(!lnk.cmImpressionSent){CK(tempLinkHref,trackSP,trackRE,trackCR,trackME);lnk.cmImpressionSent=1;}}}CJ(1);}function cY(e){var dt=new Date();cmT2=dt.getTime();CH(cm_ClientTS,cmT2,cm_FormError,false);if(!cGS&&(cF(4)||CD(5))){window.cX("onload");cU();}cGB=null;}function cZ(e){cG3=null;CI();delay=false;for(var x=0;x<document.forms.length;x++){try{if(cG6.forms[x].cmEleValue>-1){cmFormBlurRecord(document.forms[x].elements[document.forms[x].cmEleValue]);}}catch(e){cmLogError(e);}try{if(cGC!=""){delay=true;cO(-1,"U");}}catch(e){cmLogError(e);}}CA(0);CH(cm_ClientTS,cmT3,cm_FormError,false);CJ(1);if(delay){window.dontExit=true;var d1=new Date();var d2=new Date();for(;window.dontExit&&(d2-d1<1000);){d2=new Date();}}CE();if(cm_UseCookie&&cG7.cPE==0){var pi=escape(c1(cm_ClientID));CB("cmRS","t3="+cmT3+"&pi="+pi);}if(cG7.onUnload)cG7.onUnload();if(cF(5)&&!cF(5.5)&&window.parent!=window)cG7.cTI=null;else{if(!cGU){for(var i=0;i<cG7.cTI.length;i++){cG7.cTI[i].onload=null;cG7.cTI[i].onerror=null;}}}}function CA(force){var dt=new Date();var cx=dt.getTime();if(cm_TrackTime&&(cmT3==-1||force==1||(cx-cmT3)>10000)){cN(cm_ClientTS,cmT2,cx,cGA,false);}cmT3=cx;}function CE(){if(cm_UseCookie){var cVF,cVG,pg,cVD,cVE="";cVF=cGA?"&t4="+cGA:"";cVG=(cGJ!="")?"&lti="+cGK+"&ln="+escape(cGI)+"&hr="+escape(cGJ):"";pg={};CU(pg,cm_ClientID);var jsfpdata="";if(cm_JSFEnabled){jsfpdata="&cjen=1";}cVD="&t1="+cm_ClientTS+"&t2="+cmT2+"&t3="+cmT3+cVF+cVG+"&fti="+cGH+"&fn="+escape(cGD)+"&ac="+cGF+"&fd="+escape(cGG)+"&uer="+escape(cm_FormError)+"&fu="+escape(cGE)+"&pi="+escape(pg.pi)+"&ho="+escape(cm_HOST)+"&ci="+escape(cm_ClientID);if(pg.ul&&pg.rf&&pg.ul.length+pg.rf.length<cGO)cVE="&ul="+escape(pg.ul)+"&rf="+escape(pg.rf);if(!CB("cmRS",cVD+cVE+jsfpdata))if(!CB("cmRS",cVD+jsfpdata))CB("cmRS","t3="+cmT3+"&pi="+escape(pg.pi)+jsfpdata);}}function cmSetAvid(id){clearTimeout(cm_AvidLoadTimer);if(id){cm_Avid=id;}else{cm_Avid="none";}CB("CMAVID",cm_Avid);cm_AvidLoadTimedOut=false;}function cmJSFConvertSAtoCM(value){var len=value.length;var lenSA=22;var lenCM=23;if(len<19)return null;if(value.charAt(0)!="U"&&value.charAt(0)!="u")return null;if(len<lenSA){value=value+value.substring(len -(lenSA - len),len);}var result="99";result=result+value.substring(1,lenCM - 1);return result;}function cmJSFSetSessionCookies(reset,cVBHs){if(!cm_JSFEnabled)return;var splitClientIDs=cVBHs.split(";");for(var n=0;n<splitClientIDs.length;n++){cmJSFSetSingleSessionCookie(reset,splitClientIDs[n]);}}function debugReadCookie(name){var nameEQ=name+"=";var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==' ')c=c.substring(1,c.length);if(c.indexOf(nameEQ)==0)return c.substring(nameEQ.length,c.length);}return null;}function cmJSFSetSingleSessionCookie(reset,cVBH,noRecurse){if(!cm_JSFEnabled)return;if(cI("CMDisabled")||(cI("CMOptout")?cI("CMOptout").toUpperCase()=="OPT_OUT":false)||(cI("ID")?cI("ID").toUpperCase()=="OPT_OUT":false))return;var fpCookieVal=cI(cm_JSFCoreCookieName);if(fpCookieVal==null){if(!cmJSFDoMigrateCookies()){fpCookieVal=cmJSFCreateUserId();if(cm_JSFTrackClients){fpCookieVal+="&ci="+cVBH;}CB(cm_JSFCoreCookieName,fpCookieVal,cmCookieExpDate,cm_JSFPCookieDomain);}if(!noRecurse){cmJSFSetSingleSessionCookie(true,cVBH,true);}cmJSFSetValidFlagSingleValue(cmValidFlag_NewSession,false,cVBH);cmJSFSetValidFlagSingleValue(cmValidFlag_NewVisitor,true,cVBH);return;}if(cm_JSFTrackClients){var knownClientIds=cJ("ci",fpCookieVal,"&");knownClientIds=knownClientIds&&unescape(knownClientIds);if(knownClientIds){knownClientIds=knownClientIds.split(",").join("_");}if(knownClientIds&&knownClientIds.indexOf(cVBH)<0){cmSetSubCookie(cm_JSFCoreCookieName,"ci",knownClientIds+"_"+cVBH,cmCookieExpDate,cm_JSFPCookieDomain);knownClientIds=cJ("ci",fpCookieVal,"&");knownClientIds=knownClientIds&&unescape(knownClientIds);if(knownClientIds.indexOf(cVBH)>=0){if(!noRecurse){cmJSFSetSingleSessionCookie(true,cVBH,true);}cmJSFSetValidFlagSingleValue(cmValidFlag_NewSession,false,cVBH);cmJSFSetValidFlagSingleValue(cmValidFlag_NewVisitor,true,cVBH);return;}}}var sessionCookieExists=(cmJSFGetSessionLoginCookieValue(cVBH)!=null);if(!sessionCookieExists){if(cmJSFCombineSessionCookies(cVBH)){sessionCookieExists=(cmJSFGetSessionLoginCookieValue(cVBH)!=null);}}if(!sessionCookieExists&&!reset){if(!noRecurse){cmJSFSetSingleSessionCookie(true,cVBH,true);}cmJSFSetValidFlagSingleValue(cmValidFlag_NewSession,true,cVBH);return;}var dt=new Date();var cmSessionTime=dt.getTime();var cmSessionExpTime=cmSessionTime+cm_JSFSessionTimeout*1000;var isSessionExpired=cmJSFIsSessionExpired(cmJSFGetSessionExpireCookieValue(cVBH));if((reset!=null&&reset==true)||isSessionExpired){var cmTimeoutStr=cmSessionTime.toString();if(cmTimeoutStr.length<10){while(cmTimeoutStr.length<10)cmTimeoutStr="0"+cmTimeoutStr;}else cmTimeoutStr=cmTimeoutStr.substring(0,10);cmJSFSetSessionLoginCookieValue(cVBH,cmTimeoutStr);if(isSessionExpired)cmJSFSetValidFlagSingleValue(cmValidFlag_SessionReset,true,cVBH);else cmJSFSetValidFlagSingleValue(cmValidFlag_NewSession,true,cVBH);if(cm_JSFSessionType=="T")cmJSFSetSessionExpiresCookieValue(cVBH,cmSessionExpTime.toString());}if(cm_JSFSessionType=="I")cmJSFSetSessionExpiresCookieValue(cVBH,cmSessionExpTime.toString());}function cmJSFIsSessionExpired(cookieExpValue){if(cookieExpValue==null)return false;var dt=new Date();if(dt.getTime()>cookieExpValue)return true;else return false;}function cmJSFCreateUserId(){if(cmJSFPUseUAForUnica()){return cmJSFPUnicaNoUIDValue();}var currDate=new Date();var rand1=Math.random();if(rand1==0)rand1=Math.random();var rand2=Math.random();if(rand2==0)rand2=Math.random();var userId=rand1.toString().substring(2,4)+rand2.toString().substring(2,12)+currDate.getTime().toString();var len=userId.length;var lenCM=23;if(len<lenCM){userId=userId+userId.substring(len -(lenCM - len),len);}if(len>lenCM){userId=userId.substring(0,lenCM);}return userId;}function cmJSFSetValidFlagValue(value,append,cVBHs){if(!cm_JSFEnabled)return;var splitClientIDs=cVBHs.split(";");for(var n=0;n<splitClientIDs.length;n++){cmJSFSetValidFlagSingleValue(value,append,splitClientIDs[n]);}}function cmJSFSetValidFlagSingleValue(value,append,cVBH){var validFlag=null;var validFlagValueStr=cmJSFGetSessionValidFlagCookieValue(cVBH);if(validFlagValueStr){var validFlagValue=parseInt(validFlagValueStr);if(!isNaN(validFlagValue))validFlag=validFlagValue;}if(validFlag==null)validFlag=cmValidFlag_SessionContinue;if(append){if(value==cmValidFlag_NewSession)validFlag &=~cmValidFlag_SessionReset;if(value==cmValidFlag_SessionReset)validFlag &=~cmValidFlag_NewSession;validFlag |=value;}else{validFlag=value;}validFlag |=cmValidFlag_SessionContinue;cmJSFSetSessionValidFlagCookieValue(cVBH,validFlag);}function cmJSFCreateCombinedSessionCookieName(cVBH){return cVBH+"_clogin";}function cmJSFCombineSessionCookies(cVBH){var loginValue=cI(cVBH+"_login");var expiresValue=cI(cVBH+"_expires");var validFlagValue=cI(cVBH+"_valid");if(loginValue!=null&&expiresValue!=null & validFlagValue!=null){var combinedCookieStr="l="+loginValue+"&e="+expiresValue+"&v="+validFlagValue;CB(cmJSFCreateCombinedSessionCookieName(cVBH),combinedCookieStr,null,cm_JSFPCookieDomain);CC(cVBH+"_login",cm_JSFPCookieDomain);CC(cVBH+"_expires",cm_JSFPCookieDomain);CC(cVBH+"_valid",cm_JSFPCookieDomain);return true;}return false;}function cmJSFSetSessionLoginCookieValue(cVBH,value){cmSetSubCookie(cmJSFCreateCombinedSessionCookieName(cVBH),"l",value,null,cm_JSFPCookieDomain);}function cmJSFSetSessionExpiresCookieValue(cVBH,value){cmSetSubCookie(cmJSFCreateCombinedSessionCookieName(cVBH),"e",value,null,cm_JSFPCookieDomain);}function cmJSFSetSessionValidFlagCookieValue(cVBH,value){cmSetSubCookie(cmJSFCreateCombinedSessionCookieName(cVBH),"v",value,null,cm_JSFPCookieDomain);}function cmJSFGetSessionLoginCookieValue(cVBH){return cI(cmJSFCreateCombinedSessionCookieName(cVBH),"l");}function cmJSFGetSessionExpireCookieValue(cVBH){return cI(cmJSFCreateCombinedSessionCookieName(cVBH),"e");}function cmJSFGetSessionValidFlagCookieValue(cVBH){return cI(cmJSFCreateCombinedSessionCookieName(cVBH),"v");}function cmJSFGetSessionValue(cVBHs){var value="";var delimiter="";var splitClientIDs=cVBHs.split(";");for(var n=0;n<splitClientIDs.length;n++){var cVBH=splitClientIDs[n];if(cVBH=="")continue;var currValue=cmJSFGetSessionLoginCookieValue(cVBH);value+=delimiter+(currValue!=null?currValue:"");if(delimiter=="")delimiter="|";}return value;}function cmJSFGetValidFlagValue(cVBHs){var value="";var delimiter="";var splitClientIDs=cVBHs.split(";");for(var n=0;n<splitClientIDs.length;n++){var cVBH=splitClientIDs[n];if(cVBH=="")continue;var currValue=cmJSFGetSessionValidFlagCookieValue(cVBH);value+=delimiter+(currValue!=null?currValue:"");if(delimiter=="")delimiter="|";}return value;}function cmJSFDoMigrateCookies(){if(cm_JSFMigrationEnabled==cmMigrationFrom1p_SA){if(cI(cm_JSFCoreCookieName)==null){var cmSACookieValue=cI(cmSACookieName);if(cmSACookieValue){cmSACookieValue=cmJSFConvertSAtoCM(cmSACookieValue);if(cmSACookieValue!=null){CB(cm_JSFCoreCookieName,cmSACookieValue,cmCookieExpDate,cm_JSFPCookieDomain);return true;}}}}return false;}_cm.prototype.addTP=function(){var tp=new cmTP(new cmApp());for(var o in tp){if(tp[o]==null||tp[o]==""||tp[o].toString().indexOf("function ")==0)continue;this[o]=cE(cD(tp[o]));}return this;};function cmApp(){var n=navigator,b=n.appName,c=this;if(b=="Netscape"){c.b="ns"}else if(b=="Microsoft Internet Explorer"){c.b="ie"}else{c.b=b}c.v=parseInt(n.appVersion);}function cmTP(c){var n=navigator,w=window.screen;this.jv=cmJv;if(c.b=="ns"&&c.v>=3)for(var i=0;i<n.plugins.length;i++)eval('this.np'+i+'=n.plugins['+i+'].name');if(c.v>3){if(c.v>=4&&(c.b=="ns"||c.b=="ie")){this.je=(n.javaEnabled()==true)?"y":"n";}if(c.b=="ie"){this.ce=n.cookieEnabled;this.cp=n.cpuClass;}this.sw=w.width;this.sh=w.height;this.pd=w.colorDepth;if(this.pd==0){this.pd=w.pixelDepth;}var fs=w.fontSmoothingEnabled;if(fs){this.fs=fs?"y":"n";}}var tz=new Date();if(tz.getTimezoneOffset()==0){this.tz="0";}else{this.tz=tz.getTimezoneOffset()/60;}}function cmJSFPUseUAForUnica(){var u="undefined";return((typeof(_cmAdapter)!=u)&&((typeof(NTPT_SET_IDCOOKIE)==u)||(NTPT_SET_IDCOOKIE===false)));}function cmJSFPUnicaNoUIDValue(){return "unca_no_id000000000000";}function cmJSFPMigrateCookies(visitorID,sessionIDList,otherCookieList){if(visitorID&&sessionIDList&&cm_JSFEnabled&&cm_JSFPCookieMigrate){var tempVisitor=cI(cm_JSFCoreCookieName);if(!tempVisitor||cm_JSFPForceMigrateCookies){CB(cm_JSFCoreCookieName,visitorID+(cm_JSFTrackClients?"&ci="+cm_ClientID.split(";").join(","):""),cmCookieExpDate,cm_JSFPCookieDomain);var dt=new Date();var cmSessionExpTime=(dt.getTime()+cm_JSFSessionTimeout*1000).toString();var cVAArray=cm_ClientID.split(";");for(var i=0;i<cVAArray.length;++i){if(sessionIDList[cVAArray[i]]!==undefined){cmJSFSetSessionLoginCookieValue(cVAArray[i],sessionIDList[cVAArray[i]]);cmJSFSetSessionExpiresCookieValue(cVAArray[i],cmSessionExpTime);cmJSFSetSessionValidFlagCookieValue(cVAArray[i],"1");}}}}if(cm_JSFPCookieMigrate&&cm_JSFPMigrationOtherCookies!==null){var cookieList=cm_JSFPMigrationOtherCookies.split(",");for(var j=0;j<cookieList.length;++j){if(otherCookieList[cookieList[j]]!==undefined){var tempExpires=cm_JSFPMigrationOtherCookiesExpireTimes[cookieList[j]];if(tempExpires){var dt=new Date();dt.setTime(dt.getTime()+parseInt(tempExpires));dt=dt.toGMTString();}else{var dt=null;}CB(cookieList[j],otherCookieList[cookieList[j]],dt,cm_JSFPCookieDomain);}}}}function cmJSFPMigrateLink(e,type){if(cm_JSFPCookieMigrate){var pageDomain=cm_JSFPCookieDomain;var linkDomainRE=/:\/\/([a-z0-9_\-\.]+)/i;var linkDomain=linkDomainRE.exec(e[type]);if(linkDomain){linkDomain=linkDomain[1];}if(linkDomain&&((linkDomain.indexOf(pageDomain)===-1)&&(e[type].toLowerCase().indexOf("javascript")!==0)&&((cm_JSFPMigrationDomainWhitelist!==null&&cmTextMatchList(linkDomain.toLowerCase(),cm_JSFPMigrationDomainWhitelist.split(",")))||(cm_JSFPMigrationDomainBlacklist!==null&&!(cmTextMatchList(linkDomain.toLowerCase(),cm_JSFPMigrationDomainBlacklist.split(","))))))||(cm_JSFPMigrationPathWhitelist!==null&&cmTextMatchList(e[type].toLowerCase(),cm_JSFPMigrationPathWhitelist.split(",")))){if(cm_JSFEnabled){var tempVisitorID=cI(cm_JSFCoreCookieName);if(tempVisitorID){tempVisitorID=tempVisitorID.split("&",2)[0];}var tempClientIDList=cm_ClientID.split(";");var tempSessionParameters="";for(var i=0;i<tempClientIDList.length;++i){tempSessionParameters+="&"+cm_JSFPCookieMigrateSessionID+"_"+tempClientIDList[i]+"="+cmJSFGetSessionLoginCookieValue(tempClientIDList[i]);}e[type]+=(e[type].indexOf("?")>-1?"&":"?")+cm_JSFPCookieMigrateVisitorID+"="+tempVisitorID+tempSessionParameters;}if(cm_JSFPMigrationOtherCookies!==null){var cookieList=cm_JSFPMigrationOtherCookies.split(",");var otherCookieParameters="";for(var j=0;j<cookieList.length;++j){var tempCookie=cI(cookieList[j]);if(tempCookie){otherCookieParameters+="&cm_mc_"+cookieList[j]+"="+tempCookie;}}otherCookieParameters=(e[type].indexOf("?")>-1?"&":"?")+otherCookieParameters.substring(1);e[type]+=otherCookieParameters;}}}}function cmTextMatchList(input,matchArray){for(var i=0;i<matchArray.length;++i){if(input.indexOf(matchArray[i])>-1){return true;}}return false;}/**** AdTarget additions start here ******//** new funcion attached to _cm **/_cm.prototype.calculateTopLineAndReturnSegments=function cmCalculateTopLineAndReturnSegments(){var segmentsToSend=[];var cmCtCookieVals=_cmPartnerUtils.getContactCookieValues();var newCmCtCookieVals=new Ctck();var referrerURL="";if(document.referrer)referrerURL=document.referrer;var destinationURL="";if(window.location.href)destinationURL=window.location.href;var rulesPresent=false;for(var k in _cm_CMRules){var cmRule=_cm_CMRules[k];if(typeof(cmRule)!="object"||typeof(cmRule.cid)=="undefined")continue;if(!this.topline[cmRule.cid])this.topline[cmRule.cid]={};this.topline[cmRule.cid].pgct=cmCtCookieVals.getPgCt(cmRule.cid);this.topline[cmRule.cid].osshct=cmCtCookieVals.getOsshCt(cmRule.cid);this.topline[cmRule.cid].orders=cmCtCookieVals.getOrders(cmRule.cid);this.topline[cmRule.cid].sales=cmCtCookieVals.getSales(cmRule.cid);this.topline[cmRule.cid].itcartct=cmCtCookieVals.getItCartCt(cmRule.cid);this.topline[cmRule.cid].itpurct=cmCtCookieVals.getItPurCt(cmRule.cid);this.topline[cmRule.cid].pvct=cmCtCookieVals.getPvCt(cmRule.cid);this.topline[cmRule.cid].evpts=cmCtCookieVals.getEvPts(cmRule.cid);this.topline[cmRule.cid].evcomct=cmCtCookieVals.getEvComCt(cmRule.cid);this.topline[cmRule.cid].evinict=cmCtCookieVals.getEvIniCt(cmRule.cid);this.topline[cmRule.cid].elvct=cmCtCookieVals.getElvCt(cmRule.cid);var isFirstPage=true;if(cmCtCookieVals.getFpFlag(cmRule.cid))isFirstPage=false;else __cm_firstPageFlag=true;this.topline[cmRule.cid].startTime=cmCtCookieVals.getStTime(cmRule.cid);if(this.topline[cmRule.cid].startTime==0)this.topline[cmRule.cid].startTime=((new Date()).getTime()/1000)|0;this.topline[cmRule.cid].slen=(((new Date()).getTime()/1000)|0)-this.topline[cmRule.cid].startTime;this.topline[cmRule.cid].n_r="";this.topline[cmRule.cid].mkchnl="";this.topline[cmRule.cid].mkpgm="";this.topline[cmRule.cid].mkv="";this.topline[cmRule.cid].mkc="";this.topline[cmRule.cid].mkp="";this.topline[cmRule.cid].mki="";this.topline[cmRule.cid].cmguid="";this.topline[cmRule.cid].natscheng="";this.topline[cmRule.cid].natschtm="";this.topline[cmRule.cid].refurl="";this.topline[cmRule.cid].refsite="";this.topline[cmRule.cid].enpg="";if(isFirstPage){this.topline[cmRule.cid].mkchnl=(new Crur()).DIRECT_LOAD_CHANNEL;if(this.pn)this.topline[cmRule.cid].enpg=this.pn;this.topline[cmRule.cid].n_r='NEW';if(!_cm_isNew)this.topline[cmRule.cid].n_r='REPEAT';var vcpiArr=_cmPartnerUtils.parseVCPI(destinationURL);if(!vcpiArr)vcpiArr=_cmPartnerUtils.parseVCPI(referrerURL);var refUrlObj=_cmPartnerUtils.parseReferralURL(referrerURL);if(vcpiArr&&vcpiArr.length>0){this.topline[cmRule.cid].mkchnl=refUrlObj.MARKETING_PROGRAMS;this.topline[cmRule.cid].mkpgm=vcpiArr[0];this.topline[cmRule.cid].mkv=vcpiArr[1];this.topline[cmRule.cid].mkc=vcpiArr[2];this.topline[cmRule.cid].mkp=vcpiArr[3];this.topline[cmRule.cid].mki=vcpiArr[4];this.topline[cmRule.cid].cmguid=vcpiArr[5];}else{this.topline[cmRule.cid].mkchnl=refUrlObj.channel;}this.topline[cmRule.cid].refsite=refUrlObj.refName;this.topline[cmRule.cid].natscheng=refUrlObj.natSearchEngine;this.topline[cmRule.cid].natschtm=refUrlObj.natSearchWord;this.topline[cmRule.cid].refurl=referrerURL;}if(typeof(__cm_firstPageFlag)!="undefined"&&__cm_firstPageFlag&&!this.topline[cmRule.cid].enpg&&this.pn){this.topline[cmRule.cid].enpg=this.pn;}this.topline[cmRule.cid].tzloc="";var sampleDate=new Date(2009,0,15);var hourDiff=Math.floor(sampleDate.getTimezoneOffset()/60);if(hourDiff==8){this.topline[cmRule.cid].tzloc="LOS ANGELES";}else if(hourDiff==7){this.topline[cmRule.cid].tzloc="DENVER";}else if(hourDiff==6){this.topline[cmRule.cid].tzloc="CHICAGO";}else if(hourDiff==5){this.topline[cmRule.cid].tzloc="NEW YORK";}if(this.tid!=1){if(this.tid==6||(this.pc&&(this.pc.indexOf('y')==0||this.pc.indexOf('Y')==0))){this.topline[cmRule.cid].pgct++;if(this.se&&this.se.replace(/^\s*/,"").replace(/\s*$/,""))this.topline[cmRule.cid].osshct++;}}if(this.tid=="1"){this.topline[cmRule.cid].pgct++;if(this.se&&this.se.replace(/^\s*/,"").replace(/\s*$/,""))this.topline[cmRule.cid].osshct++;}else if(this.tid=="3"){this.topline[cmRule.cid].orders++;if(this.tr&&parseFloat(this.tr)!=NaN)this.topline[cmRule.cid].sales+=parseFloat(this.tr);}else if(this.tid=="4"){if(this.at&&this.at=='5'&&this.qt&&parseFloat(this.qt)!=NaN)this.topline[cmRule.cid].itcartct+=parseFloat(this.qt);if(this.at&&this.at=='9'&&this.qt&&parseFloat(this.qt)!=NaN)this.topline[cmRule.cid].itpurct+=parseFloat(this.qt);}else if(this.tid=="5"){this.topline[cmRule.cid].pvct++;}else if(this.tid=="14"){if(this.cpt&&parseFloat(this.cpt)!=NaN)this.topline[cmRule.cid].evpts+=parseFloat(this.cpt);if(this.cat&&this.cat=='2')this.topline[cmRule.cid].evcomct++;if(this.cat&&this.cat=='1')this.topline[cmRule.cid].evinict++;}else if(this.tid=="15"){this.topline[cmRule.cid].elvct++;}newCmCtCookieVals.setPgCt(cmRule.cid,this.topline[cmRule.cid].pgct);newCmCtCookieVals.setOsshCt(cmRule.cid,this.topline[cmRule.cid].osshct);newCmCtCookieVals.setOrders(cmRule.cid,this.topline[cmRule.cid].orders);newCmCtCookieVals.setSales(cmRule.cid,this.topline[cmRule.cid].sales);newCmCtCookieVals.setItCartCt(cmRule.cid,this.topline[cmRule.cid].itcartct);newCmCtCookieVals.setItPurCt(cmRule.cid,this.topline[cmRule.cid].itpurct);newCmCtCookieVals.setPvCt(cmRule.cid,this.topline[cmRule.cid].pvct);newCmCtCookieVals.setEvPts(cmRule.cid,this.topline[cmRule.cid].evpts);newCmCtCookieVals.setEvComCt(cmRule.cid,this.topline[cmRule.cid].evcomct);newCmCtCookieVals.setEvIniCt(cmRule.cid,this.topline[cmRule.cid].evinict);newCmCtCookieVals.setElvCt(cmRule.cid,this.topline[cmRule.cid].elvct);newCmCtCookieVals.setFpFlag(cmRule.cid,"1");newCmCtCookieVals.setStTime(cmRule.cid,this.topline[cmRule.cid].startTime);rulesPresent=true;}for(var k in _cm_CMRules){var cmRule=_cm_CMRules[k];if(typeof(cmRule)!="object"||typeof(cmRule.cid)=="undefined")continue;var segmentRulesMetStr=cmCtCookieVals.getSegRulesMet(cmRule.cid);for(var j=0;j<cmRule.segmentRules.length;j++){var segRule=cmRule.segmentRules[j];if(segmentRulesMetStr.indexOf(segRule.id+"_")==0||segmentRulesMetStr.indexOf("_"+segRule.id+"_")!=-1)continue;var functionRetVal=false;try{functionRetVal=segRule.fn(this,this.topline[cmRule.cid])}catch(e){}if(functionRetVal)segmentRulesMetStr+=segRule.id+"_";}newCmCtCookieVals.setSegRulesMet(cmRule.cid,segmentRulesMetStr);var segmentsMetStr=cmCtCookieVals.getSegsMet(cmRule.cid);for(var s=0;s<cmRule.segments.length;s++){var segment=cmRule.segments[s];if(segmentsMetStr.indexOf(segment.id+"_")==0||segmentsMetStr.indexOf("_"+segment.id+"_")!=-1)continue;var allMatched=true;for(var r=0;r<segment.rules.length;r++){var ruleid=segment.rules[r];if(!(segmentRulesMetStr.indexOf(ruleid+"_")==0||segmentRulesMetStr.indexOf("_"+ruleid+"_")!=-1)){allMatched=false;break;}}if(allMatched){if(!segmentsToSend[cmRule.cid])segmentsToSend[cmRule.cid]="";segmentsToSend[cmRule.cid]+=segment.id+"_";segmentsMetStr+=segment.id+"_";}}newCmCtCookieVals.setSegsMet(cmRule.cid,segmentsMetStr);}if(rulesPresent)_cmPartnerUtils.setContactCookieValues(newCmCtCookieVals);return segmentsToSend;};/*** Set of utility functions,all namespaced to _cmPartnerUtils **/_cmPartnerUtils.calculateAndSendATData=function(newTag){var segmentsToSend=newTag.calculateTopLineAndReturnSegments();var partnerReqArray=_cmPartnerUtils.cmGetPartnerRequestArray(newTag,segmentsToSend);for(var i=0;i<partnerReqArray.length;i++)c9(partnerReqArray[i]);};_cmPartnerUtils.loadScript=function(s){if(cm_UseDOMScriptLoad){try{var h=cG6.getElementsByTagName('head').item(0);var js=cG6.createElement('script');js.setAttribute('language','javascript');js.setAttribute('type','text/javascript');js.setAttribute('src',s);h.appendChild(js);}catch(e){}}else{cG6.write('<script language="javascript1.1" src="'+s+'"></script>');}};_cmPartnerUtils.cmGetPartnerRequestArray=function(cmObj,segmentsToSend){var reqArray=[];if(!cmObj.ci)return reqArray;var referrerURL="";if(cmObj.rf)referrerURL=cmObj.rf;else if(document.referrer)referrerURL=document.referrer;var destinationURL="";if(cmObj.ul)destinationURL=cmObj.ul;else if(window.location.href)destinationURL=window.location.href;for(var i in _cm_CMRules){var cmRule=_cm_CMRules[i];if(typeof(cmRule)!="object")continue;if((cmObj.ci+'').indexOf(cmRule.cid+'')==-1)continue;if(cmRule.version>1001)continue;var shuffledPartnerIndexArr=_cmPartnerUtils.getShuffledIndexArray(cmRule.partners.length-1);for(var j=0;j<shuffledPartnerIndexArr.length;j++){var pi=shuffledPartnerIndexArr[j];var partner=cmRule.partners[pi];if(pi<0||pi>=cmRule.tags.length)continue;var tagList=cmRule.tags[pi];var pTags=[];for(var t=0;t<tagList.length;t++){var tagId=tagList[t];if(tagId=="1"){if(cmObj.tid=="1"||cmObj.tid=="6"||(cmObj.pc&&(cmObj.pc.indexOf('y')==0||cmObj.pc.indexOf('Y')==0))){var pTag=new Cptg(partner.key,referrerURL,destinationURL);pTag.tid="1";_cmPartnerUtils.copyTagParms(cmObj,pTag,[ "pi","pn","cg","pv_a1","pv_a2","pv_a3","pv_a4","pv_a5","pv_a6","pv_a7","pv_a8","pv_a9","pv_a10","pv_a11","pv_a12","pv_a13","pv_a14","pv_a15" ]);pTags.push(pTag);}}else if(tagId=="2"){if(cmObj.tid=="5"){var pTag=new Cptg(partner.key,referrerURL,destinationURL);pTag.tid="2";_cmPartnerUtils.copyTagParms(cmObj,pTag,[ "pr","pm","cg","pr_a1","pr_a2","pr_a3","pr_a4","pr_a5","pr_a6","pr_a7","pr_a8","pr_a9","pr_a10","pr_a11","pr_a12","pr_a13","pr_a14","pr_a15" ]);pTags.push(pTag);}}else if(tagId=="3"){if(cmObj.tid=="4"&&cmObj.at&&cmObj.at=='5'){var pTag=new Cptg(partner.key,referrerURL,destinationURL);pTag.tid="3";_cmPartnerUtils.copyTagParms(cmObj,pTag,[ "pr","pm","cg","qt","bp",["s_a1","pr_a1"],["s_a2","pr_a2"],["s_a3","pr_a3"],["s_a4","pr_a4"],["s_a5","pr_a5"],["s_a6","pr_a6"],["s_a7","pr_a7"],["s_a8","pr_a8"],["s_a9","pr_a9"],["s_a10","pr_a10"],["s_a11","pr_a11"],["s_a12","pr_a12"],["s_a13","pr_a13"],["s_a14","pr_a14"],["s_a15","pr_a15"] ]);pTags.push(pTag);}}else if(tagId=="4"){if(cmObj.tid=="4"&&cmObj.at&&cmObj.at=='9'){var pTag=new Cptg(partner.key,referrerURL,destinationURL);pTag.tid="4";_cmPartnerUtils.copyTagParms(cmObj,pTag,[ "pr","pm","cg","qt","bp",["s_a1","pr_a1"],["s_a2","pr_a2"],["s_a3","pr_a3"],["s_a4","pr_a4"],["s_a5","pr_a5"],["s_a6","pr_a6"],["s_a7","pr_a7"],["s_a8","pr_a8"],["s_a9","pr_a9"],["s_a10","pr_a10"],["s_a11","pr_a11"],["s_a12","pr_a12"],["s_a13","pr_a13"],["s_a14","pr_a14"],["s_a15","pr_a15"] ]);pTag.tr=cmObj.tr;pTag.on=cmObj.on;pTags.push(pTag);}}else if(tagId=="5"){if(cmObj.tid=="3"){var pTag=new Cptg(partner.key,referrerURL,destinationURL);pTag.tid="5";_cmPartnerUtils.copyTagParms(cmObj,pTag,[ "on",["tr","ov"],"ct","sa","zp","o_a1","o_a2","o_a3","o_a4","o_a5","o_a6","o_a7","o_a8","o_a9","o_a10","o_a11","o_a12","o_a13","o_a14","o_a15" ]);pTags.push(pTag);}}else if(tagId=="6"){if(cmObj.topline[cmRule.cid]&&cmObj.topline[cmRule.cid].natscheng){var pTag=new Cptg(partner.key,referrerURL,destinationURL);pTag.tid="6";pTag.en=cmObj.topline[cmRule.cid].natscheng;pTag.se=cmObj.topline[cmRule.cid].natschtm;if(cmObj.topline[cmRule.cid].mkchnl==(new Crur()).MARKETING_PROGRAMS)pTag.st='PAID';else pTag.st='NATURAL';pTags.push(pTag);}else if(cmObj.tid=="1"||cmObj.tid=="6"||(cmObj.pc&&(cmObj.pc.indexOf('y')==0||cmObj.pc.indexOf('Y')==0))){if(cmObj.se&&cmObj.se.replace(/^\s*/,"").replace(/\s*$/,"")){var pTag=new Cptg(partner.key,referrerURL,destinationURL);pTag.tid="6";pTag.en="ONSITE";pTag.se=cmObj.se;pTag.sr=cmObj.sr;pTags.push(pTag);}}}else if(tagId=="7"){if(cmObj.tid=="14"){var pTag=new Cptg(partner.key,referrerURL,destinationURL);pTag.tid="7";_cmPartnerUtils.copyTagParms(cmObj,pTag,[ ["cid","eid"],["ccid","cat"],["cat","at"],"cpt","c_a1","c_a2","c_a3","c_a4","c_a5","c_a6","c_a7","c_a8","c_a9","c_a10","c_a11","c_a12","c_a13","c_a14","c_a15" ]);pTags.push(pTag);}}}if(partner.type=='I'){for(var pti=0;pti<pTags.length;pti++){var req=_cmPartnerUtils.c0_Partner(pTags[pti],partner);reqArray.push(req);}}else if(partner.type=='S'){for(var pti=0;pti<pTags.length;pti++){if(partner.callbackFunctionSet){try{partner._cm_ConnectCallback(pTags[pti]);}catch(e){var errorTag=new Cpse(cmRule.cid+'',destinationURL,pti);var cmErrorMsg=_cmPartnerUtils.c0_CMError(errorTag);reqArray.push(cmErrorMsg);}}else{if(!_cmPartnerUtils.AT_PartnerCallQueue[partner.pid])_cmPartnerUtils.AT_PartnerCallQueue[partner.pid]=[];_cmPartnerUtils.AT_PartnerCallQueue[partner.pid].push(pTags[pti]);}}}}var segmentsToSendList=segmentsToSend[cmRule.cid];if(segmentsToSendList){for(var s=0;s<cmRule.segments.length;s++){var segment=cmRule.segments[s];if(segmentsToSendList.indexOf(segment.id)!=-1){var pTag=new Cptg("",referrerURL,destinationURL);pTag.tid="99";pTag.sid=segment.id;var shuffledIndexArr=_cmPartnerUtils.getShuffledIndexArray(segment.p.length-1);for(var j=0;j<shuffledIndexArr.length;j++){var pi=shuffledIndexArr[j];if(segment.p[pi]<0||segment.p[pi]>=cmRule.partners.length)continue;var partner=cmRule.partners[segment.p[pi]];pTag.ckey=partner.key;if(partner.type=='I'){var req=_cmPartnerUtils.c0_Partner(pTag,partner);reqArray.push(req);}else if(partner.type=='S'){if(partner.callbackFunctionSet){try{partner._cm_ConnectCallback(pTag);}catch(e){var errorTag=new Cpse(cmRule.cid+'',destinationURL,pi);var cmErrorMsg=_cmPartnerUtils.c0_CMError(errorTag);reqArray.push(cmErrorMsg);}}else{if(!_cmPartnerUtils.AT_PartnerCallQueue[partner.pid])_cmPartnerUtils.AT_PartnerCallQueue[partner.pid]=[];_cmPartnerUtils.AT_PartnerCallQueue[partner.pid].push(pTag);}}}}}}}return reqArray;};_cmPartnerUtils.copyTagParms=function(src,dest,parms){for(var i=0;i<parms.length;i++){var t=typeof(parms[i]);if(t=="string"){dest[parms[i]]=src[parms[i]];}else if(t=="object"){dest[parms[i][1]]=src[parms[i][0]];}}};_cmPartnerUtils.c0_Partner=function(cmObj,partner){var qs=_cmPartnerUtils.C6_Partner(cmObj);var req=null;if(C8(null)=='https:'){req=new _cmCQ('https:',partner.surl.indexOf("://")==-1?partner.surl:partner.surl.substring(partner.surl.indexOf("://")+3),qs);}else{req=new _cmCQ('http:',partner.url.indexOf("://")==-1?partner.url:partner.url.substring(partner.url.indexOf("://")+3),qs);}return req;};_cmPartnerUtils.c0_CMError=function(cmObj){var qs=_cmPartnerUtils.C6_Partner(cmObj);var req=null;if(C8(null)=='https:'){req=new _cmCQ('https:',cm_HOST,qs);}else{req=new _cmCQ('http:',cm_HOST,qs);}return req;};_cmPartnerUtils.C6_Partner=function(tag){var qs="";if(tag.tid)qs+="tid="+tag.tid;for(var cOb in tag){if(!tag[cOb]||tag[cOb]==""||tag[cOb].constructor==Function||cOb=="tid")continue;if(qs!="")qs+="&";qs+=cD(cOb)+"="+cE(cD(tag[cOb]));}return qs;};_cmPartnerUtils.setContactRule=function(contactRule){var cid=contactRule.cid;_cm_CMRules[cid]=contactRule;for(var p=0;p<contactRule.partners.length;p++){var partner=contactRule.partners[p];if(partner.type=='S'){partner._cm_ConnectCallback=function empty(){};partner.callbackFunctionSet=false;var scripturl=partner.url;if(C8(null)=='https:')scripturl=partner.surl;scripturl=scripturl.indexOf("://")==-1?scripturl:scripturl.substring(scripturl.indexOf("://")+3);_cmPartnerUtils.loadScript(C8(null)+'//'+scripturl);}}if(!cI("CoreAt")){var cmhost_root=cm_Production_HOST;if(contactRule.usesNewRepeat){if(cm_JSFEnabled){cmSetNRFlag(cI(cm_JSFCoreCookieName));}else{_cmPartnerUtils.AT_NRFlagNeeded=true;_cmPartnerUtils.loadScript(C8(null)+'//'+cmhost_root+'/cookie-id.js?fn=cmSetNRFlag');}}}_cmPartnerUtils.AT_RulesSet=true;if(_cmPartnerUtils.AT_NRFlagNeeded){if(_cmPartnerUtils.AT_NRFlagSet){for(var j=0;j<_cmPartnerUtils.AT_TagQueue.length;j++)_cmPartnerUtils.calculateAndSendATData(_cmPartnerUtils.AT_TagQueue[j]);_cmPartnerUtils.AT_TagQueue=[];}}else{for(var j=0;j<_cmPartnerUtils.AT_TagQueue.length;j++)_cmPartnerUtils.calculateAndSendATData(_cmPartnerUtils.AT_TagQueue[j]);_cmPartnerUtils.AT_TagQueue=[];}};function _cm_registerCallback(partner_id,callback){if(!partner_id)return;if(typeof(callback)!='function')return;for(var k in _cm_CMRules){var cmRule=_cm_CMRules[k];if(typeof(cmRule)!="object"||typeof(cmRule.cid)=="undefined")continue;for(var p=0;p<cmRule.partners.length;p++){var partner=cmRule.partners[p];if(partner.pid==partner_id&&!partner.callbackFunctionSet){partner._cm_ConnectCallback=callback;partner.callbackFunctionSet=true;if(_cmPartnerUtils.AT_PartnerCallQueue[partner.pid]){for(var i=0;i<_cmPartnerUtils.AT_PartnerCallQueue[partner.pid].length;i++){try{partner._cm_ConnectCallback(_cmPartnerUtils.AT_PartnerCallQueue[partner.pid][i]);}catch(e){}}_cmPartnerUtils.AT_PartnerCallQueue[partner.pid]=[];}}}}}function cmSetNRFlag(cookieval){if(cookieval)_cm_isNew=false;_cmPartnerUtils.AT_NRFlagSet=true;if(_cmPartnerUtils.AT_NRFlagNeeded){if(_cmPartnerUtils.AT_RulesSet){for(var j=0;j<_cmPartnerUtils.AT_TagQueue.length;j++)_cmPartnerUtils.calculateAndSendATData(_cmPartnerUtils.AT_TagQueue[j]);_cmPartnerUtils.AT_TagQueue=[];}}}_cmPartnerUtils.getContactCookieValues=function(){var externalizeVersion=1;var cmCtCookieVals=new Ctck();var cV4=cI("CoreAt");if(!cV4){return cmCtCookieVals;}var stringvals=cV4.split("&");var keyvalstring,cid,val,sepindex;for(var i=0;i<stringvals.length;i++){keyvalstring=stringvals[i];sepindex=keyvalstring.indexOf("=");if(sepindex!=-1){var cid=keyvalstring.substring(0,sepindex);var val=null;if(keyvalstring.length>sepindex+1)val=keyvalstring.substring(sepindex+1);if(cid&&val){var splitvals=unescape(val).split(/\|/);if(splitvals&&splitvals.length>0){if(splitvals[0]&&parseInt(splitvals[0])<=externalizeVersion){if(splitvals[1])cmCtCookieVals.setPgCt(cid,splitvals[1]);if(splitvals[2])cmCtCookieVals.setOsshCt(cid,splitvals[2]);if(splitvals[3])cmCtCookieVals.setOrders(cid,splitvals[3]);if(splitvals[4])cmCtCookieVals.setSales(cid,splitvals[4]);if(splitvals[5])cmCtCookieVals.setItCartCt(cid,splitvals[5]);if(splitvals[6])cmCtCookieVals.setItPurCt(cid,splitvals[6]);if(splitvals[7])cmCtCookieVals.setPvCt(cid,splitvals[7]);if(splitvals[8])cmCtCookieVals.setEvPts(cid,splitvals[8]);if(splitvals[9])cmCtCookieVals.setEvComCt(cid,splitvals[9]);if(splitvals[10])cmCtCookieVals.setEvIniCt(cid,splitvals[10]);if(splitvals[11])cmCtCookieVals.setElvCt(cid,splitvals[11]);if(splitvals[12])cmCtCookieVals.setFpFlag(cid,splitvals[12]);if(splitvals[13])cmCtCookieVals.setStTime(cid,splitvals[13]);if(splitvals[14])cmCtCookieVals.setSegRulesMet(cid,splitvals[14]);if(splitvals[15])cmCtCookieVals.setSegsMet(cid,splitvals[15]);}}}}}return cmCtCookieVals;};_cmPartnerUtils.setContactCookieValues=function(cmCtCookieVals){var externalizeVersion=1;var val="";for(var cid in cmCtCookieVals.holder){if(cid.length!=8||typeof(cmCtCookieVals.holder[cid])=="function")continue;val+=cid+"="+externalizeVersion+"|"+cmCtCookieVals.getPgCt(cid)+"|"+cmCtCookieVals.getOsshCt(cid)+"|"+cmCtCookieVals.getOrders(cid)+"|"+cmCtCookieVals.getSales(cid)+"|"+cmCtCookieVals.getItCartCt(cid)+"|"+cmCtCookieVals.getItPurCt(cid)+"|"+cmCtCookieVals.getPvCt(cid)+"|"+cmCtCookieVals.getEvPts(cid)+"|"+cmCtCookieVals.getEvComCt(cid)+"|"+cmCtCookieVals.getEvIniCt(cid)+"|"+cmCtCookieVals.getElvCt(cid)+"|"+cmCtCookieVals.getFpFlag(cid)+"|"+cmCtCookieVals.getStTime(cid)+"|"+cmCtCookieVals.getSegRulesMet(cid)+"|"+cmCtCookieVals.getSegsMet(cid)+"&";}CB("CoreAt",val,"",cm_JSFPCookieDomain);};/* parse and return following properties in refurl * marketingChannel,referringSite,naturalSearchEngine,naturalSearchWord */_cmPartnerUtils.parseReferralURL=function(referralUrl){var result=new Crur();if(!referralUrl)return result;var domainName=this.extractDomainName(referralUrl);if(domainName.getPartsCount()==0)return result;if(domainName.url.search(/^[0-9]+(\.[0-9]+){3}$/)>=0){result.channel=result.REFERRAL_CHANNEL;result.refName=domainName.url;return result;}var searchEngines=[ ['GOOGLE.COM','q'],['YAHOO.COM','SEARCH.YAHOO.COM','p'],['MSN.COM','SEARCH.MSN.COM',['q','MT']],['AOL.COM','SEARCH.AOL.COM',['aps_terms','query','encquery','q']],['AOL.COM',['AOLSEARCH.AOL.COM','AOLSEARCHT.AOL.COM'],'query'],['ASK.COM',['q','ask']],['ASK.COM',['ASKGEEVES.COM','ASKJEEVES.COM','ASKJEEVS.COM'],'ask'],['BING.COM','q'],['LYCOS.COM','HOTBOT.LYCOS.COM','MT'],['LYCOS.COM','query'],['ALTAVISTA.COM','q'],['ALTAVISTA.COM',['PARTNERS.ALTAVISTA.COM','ALTA-VISTA.COM'],'q'],['NETSCAPE.COM','SEARCH.NETSCAPE.COM',['search','query']],['WEBSEARCH.CNN.COM','query'],['LOOKSMART.COM','key'],['ABOUT.COM','terms'],['MAMMA.COM','query='],['ALLTHEWEB.COM',['query','q']],['VOILA.COM','kw'],['VIRGILIO.IT','SEARCH.VIRGILIO.IT','qs'],['LIVE.COM','SEARCH.LIVE.COM','q'],['BAIDU.COM',['word','wd']],['SEARCH.ALICE.IT','qs'],['YANDEX.RU','text'],['CLUB-INTERNET.FR','q'],['SEARCH.SEZNAM.CZ','q'],['SEARCH.SEZNAM.CZ','w'],['SEARCH.COM',['q','what','QUERY','OLDQUERY']],['SEARCH.YAM.COM','k'],['GOOGLE.PCHOME.COM.TW','q']];var matchedSearchList=[];for(var i=domainName.getPartsCount();matchedSearchList.length==0&&i>=2;i--){var dm=domainName.getLast(i);for(var j=0;j<searchEngines.length;j++){var se=searchEngines[j];var sedms=(se.length>2)?se[1]:se[0];sedms=(typeof(sedms)=="string")?[ sedms ]:sedms;for(var k=0;k<sedms.length;k++){if(sedms[k]==dm)matchedSearchList.push(se);}}}if(matchedSearchList.length>0){result.channel=result.NATURAL_SEARCH_CHANNEL;result.natSearchEngine=matchedSearchList[0][0];result.refName=domainName.url;for(var i=0;i<matchedSearchList.length;i++){var se=matchedSearchList[i];var params=(se.length>2)?se[2]:se[1];var params=(typeof(params)=="string")?[ params ]:params;for(var j=0;j<params.length;j++){var re=new RegExp("[&?]"+params[j]+"=([^&]+)");var a=referralUrl.match(re);if(a){var term=_cmPartnerUtils.urlDecode(a[1]);if(term.search(/^[^a-zA-Z0-9]*$/)==-1){result.natSearchWord=term.replace(/\+/g," ");break;}}}}}else{result.channel=result.REFERRAL_CHANNEL;result.refName=domainName.url;}return result;};_cmPartnerUtils.urlDecode=function(s){if(typeof(decodeURIComponent)=='function'){try{return decodeURIComponent(s);}catch(e){}}return unescape(s);};_cmPartnerUtils.extractDomainName=function(url){var a=url.match(/:\/*([^\/\?]+)/);var authority=a?a[1]:"";authority=authority.toUpperCase();a=authority.match(/^(?:WWW\d*\.)?([^:]+)/);if(a)authority=a[1];var lastCharacter=authority.length - 1;var lastDot=authority.lastIndexOf('.');if(lastDot==-1){return new Cspd();}else if(lastDot==lastCharacter){authority=authority.substring(0,lastCharacter);}return new Cspd(authority);};_cmPartnerUtils.parseVCPI=function(url){if(!url)return "";var a=url.match(/[&?]cm_mmc(_o)?=([^&]+)/);if(!a)return "";var mmcval=a[1]?deObfuscate(a[2]):a[2];var splitmmcvals=mmcval.split(/\-_\-|\*/);if(!splitmmcvals||splitmmcvals.length!=4)return "";var index=splitmmcvals[3].indexOf("|-|");if(index!=-1){splitmmcvals[3]=splitmmcvals[3].substring(0,index);}splitmmcvals[0]=_cmPartnerUtils.urlDecode(splitmmcvals[0]).replace(/\+/g," ");splitmmcvals[1]=_cmPartnerUtils.urlDecode(splitmmcvals[1]).replace(/\+/g," ");splitmmcvals[2]=_cmPartnerUtils.urlDecode(splitmmcvals[2]).replace(/\+/g," ");splitmmcvals[3]=_cmPartnerUtils.urlDecode(splitmmcvals[3]).replace(/\+/g," ");var b=url.match(/[&?]cm_guid=([^&]+)/);var guid=(b&&b[1])?_cmPartnerUtils.urlDecode(b[1]):"";return [ splitmmcvals[0]+"*"+splitmmcvals[1]+"*"+splitmmcvals[2]+"*"+splitmmcvals[3],splitmmcvals[0],splitmmcvals[1],splitmmcvals[2],splitmmcvals[3],guid ];};_cmPartnerUtils.deObfuscate=function(encodedStr){if(!encodedStr)return "";var ENCODED="-P2KHd7ZG3s14WRVhqmaJe8rQUz_gpwuTtbXLkFEB56ylfAMc0YOCjvnNSDxIo9i";var DECODED="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_1234567890";var MIN_CHAR_VALUE=45;var MAX_CHAR_VALUE=122;var lookupArray=[];for(var i=0;i<ENCODED.length;i++){var c=ENCODED.charCodeAt(i);lookupArray[c - 45]=DECODED.charAt(i);}var decodedStr="";try{for(var i=0;i<encodedStr.length;i++){var encodedCharacter=encodedStr.charAt(i);var encodedCharacterInt=encodedStr.charCodeAt(i);if(encodedCharacterInt<MIN_CHAR_VALUE||encodedCharacterInt>MAX_CHAR_VALUE){decodedStr+=encodedCharacter;}else{var decodedCharacter=lookupArray[encodedCharacterInt - 45];if(decodedCharacter==null){decodedStr+=encodedCharacter;}else{decodedStr+=decodedCharacter;}}}}catch(e){}return decodedStr;};_cmPartnerUtils.getShuffledIndexArray=function(maxIndex){var indexArr=[];for(var i=0;i<=maxIndex;i++){indexArr.push(i);}for(var i=0;i<indexArr.length;i++){var randIndex=Math.floor(Math.random()*(indexArr.length));var temp=indexArr[i];indexArr[i]=indexArr[randIndex];indexArr[randIndex]=temp;}return indexArr;};_cmPartnerUtils.startsWith=function(field,parameter){return(field.toUpperCase().indexOf(parameter)==0);};_cmPartnerUtils.endsWith=function(field,parameter){return((field.toUpperCase().lastIndexOf(parameter)!=-1)&&(field.toUpperCase().lastIndexOf(parameter)+parameter.length==field.length));};_cmPartnerUtils.contains=function(field,parameter){return(field.toUpperCase().indexOf(parameter)!=-1);};/**** new objects *****/function Ctck(){this.holder={};this.getIntValue=function(cid,key){if(!this.holder[cid])return 0;var i=this.holder[cid][key]?parseInt(this.holder[cid][key]):0;i=(i==NaN)?0:i;return i;};this.getFloatValue=function(cid,key){if(!this.holder[cid])return 0;var i=this.holder[cid][key]?parseFloat(this.holder[cid][key]):0;i=(i==NaN)?0:i;return i;};this.getStringValue=function(cid,key){if(!this.holder[cid])return "";return this.holder[cid][key]?this.holder[cid][key]:"";};this.setFloatValue=function(cid,key,val){if(!this.holder[cid])this.holder[cid]={};if(key&&val&&parseFloat(val)!=NaN){if(typeof(val)=="number")this.holder[cid][key]=val.toFixed(2)+'';else this.holder[cid][key]=val;}};this.setIntValue=function(cid,key,val){if(!this.holder[cid])this.holder[cid]={};if(key&&val&&parseInt(val)!=NaN)this.holder[cid][key]=val+'';};this.setStringValue=function(cid,key,val){if(!this.holder[cid])this.holder[cid]=[];if(key&&val)this.holder[cid][key]=val;};this.getPgCt=function(cid){return this.getIntValue(cid,"pgct");};this.setPgCt=function(cid,val){this.setIntValue(cid,"pgct",val);};this.getOsshCt=function(cid){return this.getIntValue(cid,"osshct");};this.setOsshCt=function(cid,val){this.setIntValue(cid,"osshct",val);};this.getOrders=function(cid){return this.getIntValue(cid,"orders");};this.setOrders=function(cid,val){this.setIntValue(cid,"orders",val);};this.getSales=function(cid){return this.getFloatValue(cid,"sales");};this.setSales=function(cid,val){this.setFloatValue(cid,"sales",val);};this.getItCartCt=function(cid){return this.getFloatValue(cid,"itcartct");};this.setItCartCt=function(cid,val){this.setFloatValue(cid,"itcartct",val);};this.getItPurCt=function(cid){return this.getFloatValue(cid,"itpurct");};this.setItPurCt=function(cid,val){this.setFloatValue(cid,"itpurct",val);};this.getPvCt=function(cid){return this.getIntValue(cid,"pvct");};this.setPvCt=function(cid,val){this.setIntValue(cid,"pvct",val);};this.getEvPts=function(cid){return this.getFloatValue(cid,"evpts");};this.setEvPts=function(cid,val){this.setFloatValue(cid,"evpts",val);};this.getEvIniCt=function(cid){return this.getIntValue(cid,"evinict");};this.setEvIniCt=function(cid,val){this.setIntValue(cid,"evinict",val);};this.getEvComCt=function(cid){return this.getIntValue(cid,"evcomct");};this.setEvComCt=function(cid,val){this.setIntValue(cid,"evcomct",val);};this.getElvCt=function(cid){return this.getIntValue(cid,"elvct");};this.setElvCt=function(cid,val){this.setIntValue(cid,"elvct",val);};this.getFpFlag=function(cid){return this.getIntValue(cid,"fp");};this.setFpFlag=function(cid,val){this.setIntValue(cid,"fp",val);};this.getStTime=function(cid){return this.getIntValue(cid,"st");};this.setStTime=function(cid,val){this.setIntValue(cid,"st",val);};this.getSegRulesMet=function(cid){return this.getStringValue(cid,"segrules");};this.setSegRulesMet=function(cid,val){this.setStringValue(cid,"segrules",val);};this.getSegsMet=function(cid){return this.getStringValue(cid,"segs");};this.setSegsMet=function(cid,val){this.setStringValue(cid,"segs",val);};}function Cpse(cid,ul1,pindex1){this.ci=cid;this.tid='21';this.ul=(ul1)?ul1:"";this.pindex=pindex1;}function Cptg(ckey1,rf1,ul1){this.ckey=(ckey1)?ckey1:"";this.rf=(rf1)?rf1:"";this.ul=(ul1)?ul1:"";}function Crur(){this.DIRECT_LOAD_CHANNEL='DIRECT LOAD';this.REFERRAL_CHANNEL='REFERRING SITES';this.NATURAL_SEARCH_CHANNEL='NATURAL SEARCH';this.MARKETING_PROGRAMS='MARKETING PROGRAMS';this.DIRECT_LOAD_REFERRAL_NAME='DL';this.channel=this.DIRECT_LOAD_CHANNEL;this.refName=this.DIRECT_LOAD_REFERRAL_NAME;this.natSearchEngine="";this.natSearchWord="";}function Cspd(url1){this.url=(url1)?url1:"";this.splitUrl=this.url.split("\.");this.getPartsCount=function(){return this.splitUrl.length;};this.getLast=function(index){var dm="";for(var i=index;i>=1;i--){if(this.splitUrl.length>=i){if(dm)dm+=".";dm+=this.splitUrl[this.splitUrl.length-i]}}return dm;};}

var coremetrics = { 
	"cmConfigMapping": {"io":"cm_IOEnabled",
						"ia":"cm_OffsiteImpressionsEnabled",
						"at":"cm_ATEnabled"},
	"cmUpdateConfig" : function cmUpdateConfig(newConfigMap) {
		for (var i in newConfigMap) {
			window[coremetrics.cmConfigMapping[i]] = newConfigMap[i];
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
	   IORequest.access_method			= 'json remote';
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

	document.write('<script language="javascript1.2" src="//libs.coremetrics.com/configs/' + cm_ClientID.split(";")[0].split("|")[0] + '.js"></script>');
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
// eventID			: required. Conversion event ID
// actionType		: required. 1=conversion initiation, 2=conversion completion
// categoryID		: optional. Category for the event
// points			: optional. Point value to assign to conversion.
// attibutes		: optional. Explore attributes
function cmCreateConversionEventTag(eventID, actionType, categoryID, points,attributes, extraFields) {
	cmMakeTag(["tid","14","cid",eventID,"cat",actionType,"ccid",categoryID,"cpt",points,"cmAttributes",attributes,"cmExtraFields",extraFields]);
}


// Creates a Tech Props tag.
// pageID		: required. Page ID to set on this Pageview tag
function cmCreateTechPropsTag(pageID, categoryID, attributes, extraFields) {
	cmMakeTag(["tid","6","pi",pageID,"cg",categoryID,"pc","Y","cmAttributes",attributes,"cmExtraFields",extraFields]);
}


// Creates a Pageview tag with the given Page ID
//
// pageID	: required. Page ID to set on this Pageview tag
// categoryID	: optional. Category ID to set on this Pageview tag
// searchString	: optional. Internal search string entered by user to reach this page.
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
// productID	: required. Product ID to set on this Productview tag
// productName	: required. Product Name to set on this Productview tag
// categoryID	: optional. Category ID to set on this Productview tag 
// searchString	: optional. Internal search string entered by user to reach this Product Detail page. Only usable if pc="Y".
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
// productID	: required. Product ID to set on this Shop tag
// quantity	: required. Quantity to set on this Shop tag
// productPrice	: required. Price of one unit of this product
// categoryID	: optional. Category to set on this Shop tag
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
// productID	: required. Product ID to set on this Shop tag
// productName	: required. Product Name to set on this Shop tag
// quantity	: required. Quantity to set on this Shop tag
// productPrice	: required. Price of one unit of this product
// customerID	: required. ID of customer making the purchase
// orderID	: required. ID of order this lineitem belongs to
// orderTotal	: required. Total price of order this lineitem belongs to
// categoryID	: optional. Category to set on this Shop tag
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
// orderID			: required. Order ID of this order
// orderTotal		: required. Total of this order (minus tax and shipping)
// orderShipping	: required. Shipping charge for this order
// customerID		: required. Customer ID that placed this order
// customerCity		: optional. City of Customer that placed this order
// customerState	: optional. State of Customer that placed this order
// customerZIP		: optional. Zipcode of Customer that placed this order
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
// customerID		: required for Registration. ID of Customer to register.
// customerEmail	: required for Newsletters. Optional for Registration.
// customerCity		: optional. City of Customer that placed this order
// customerState	: optional. State of Customer that placed this order
// customerZIP		: optional. Zipcode of Customer that placed this order
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

// $Id: io_v4_master.txt 181561 2011-10-28 18:08:34Z kmitchell $
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
if(_4===undefined){
IORequest.log(IORequest.log_error,"cmRecRequest: Required zone id undefined.");
}
if(_5===undefined){
_5="";
}
if(_6===undefined){
_6="";
}
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
if(IORequest.request_crc!==undefined){
IORequest.timeout_product[IORequest.offer_id+IORequest.request_crc]=1;
}
if(_15){
_io_request.action_callback("config_timeout");
IORequest.i_zone=0;
setTimeout("IORequest.config_download_failure(\"javascript timeout\");",0);
}else{
_io_request.display_status("JavaScript timeout downloading product ("+_io_request.stop_watch.elapsed_time+"ms)","blue");
IORequest.log(IORequest.log_warn,"JavaScript timeout downloading product",_io_request.stop_watch.elapsed_time+" ms");
if(IORequest.request_crc!==undefined){
if((_io_config.file_not_found_pc!==undefined)&&(_io_config.file_not_found_pc>Math.floor(Math.random()*100))){
var id=IORequest.offer_type+IORequest.offer_id+"|"+IORequest.request_crc+"|"+(IORequest.offer_type=="P"?IORequest.plain_text_product_id:(IORequest.offer_type=="S"?IORequest.plain_text_search_id:IORequest.plain_text_cat_id));
cmCreatePageElementTag(id,_io_config.file_not_found_id);
IORequest.log(IORequest.log_trace,"page element tag for file not found",id);
}
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
if(_18.target_id=="_RVP_"||_18.target_id=="_RVL_"||_18.target_id=="_RVC_"||_18.target_id=="_LCP_"||_18.target_id=="_RPP_"||_18.target_id=="_MPC_"){
var rc=_io_state.cm_get_product_from_cookie(_18.target_id);
if((rc===0)||(_18.target_id=="_RVL_"&&rc.length==0)){
IORequest.current_step++;
this.display_status("No "+_18.target_id+" available. Continuing to next step.","green");
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
if(_io_config.zpfcid!="N"){
_20=_20+", []";
}
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
IORequest.offer_type=this.offer_type;
IORequest.offer_id=this.offer_id;
if(this.io_zone.rec_plan.rec_steps[IORequest.current_step].target_id=="_RVL_"){
var _22=((window.location.protocol=="https:"&&IORequest.access_method=="json remote")?IORequest.image_url_prefix["json remote https"]:IORequest.image_url_prefix[IORequest.access_method]);
var _23=IORequest.find_cookie(IORequest.pqa_cookie);
if(_23!==undefined&&(_23.indexOf("E")>-1)){
_22=_22.replace("recs.coremetrics.com","recsprodqa.coremetrics.com");
}
var _24="";
for(var _25=0;_25<_21.length;_25++){
_24=_24+_21[_25]+"|";
}
IORequest.request_crc=undefined;
this.url=_22+"?cm_cid="+this.get_client_id()+"&cm_offerid="+this.offer_id+"&cm_offertype="+this.offer_type+"&cm_targetid="+_24;
this.display_status("retrieving recently viewed product attributes: "+_24+" url: "+this.url,"green");
IORequest.log(IORequest.log_trace,"retrieving recently viewed product attributes: "+_21+" - url",this.url);
}else{
if(((this.offer_type=="C")&&IORequest.encrypt_cats)||((this.offer_type=="E")&&IORequest.encrypt_cats)||(this.offer_type=="S")||((this.offer_type=="P")&&IORequest.encrypt_prds)){
this.prod_id_crc=_21;
}else{
this.prod_id_crc=IORequest.hex32(IORequest.crc32_str(_21));
}
IORequest.request_crc=this.prod_id_crc;
this.group=this.prod_id_crc.substr(0,2);
var _26=((window.location.protocol=="https:"&&IORequest.access_method=="json remote")?IORequest.url_prefix["json remote https"]:IORequest.url_prefix[IORequest.access_method]);
var _27=IORequest.find_cookie(IORequest.url_cookie);
if(_27!==undefined&&(_27.indexOf("old")>-1)){
_26=((window.location.protocol=="https:"&&IORequest.access_method=="json remote")?IORequest.url_prefix_old["json remote https"]:IORequest.url_prefix_old[IORequest.access_method]);
}else{
var _23=IORequest.find_cookie(IORequest.pqa_cookie);
if(_23!==undefined&&(_23.indexOf("A")>-1)){
_26=_26+"prodqa/";
}
}
var _28="?V="+this.cgi_version;
if(_io_config.vcgi=="N"){
_28="";
}
this.url=_26+this.get_client_id()+"/"+_b+"/"+this.offer_type+this.offer_id+"/"+this.offer_type+this.group+"/"+this.prod_id_crc+".js"+_28;
this.display_status("retrieving IO file product ID: "+_21+" url: "+this.url,"green");
IORequest.log(IORequest.log_trace,"retrieving IO file product "+_21+" - url",this.url);
}
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
var _29=(this.io_zone.rec_plan.rec_steps[IORequest.current_step].target_id=="_SS_"?IOConfig.sfto:IORequest.timeout[this.i_timeout]);
this.h_timer=setTimeout("_io_request.javascript_timeout(0)",_29);
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
var _2a=((window.location.protocol=="https:"&&IORequest.access_method=="json remote")?IORequest.url_prefix["json remote https"]:IORequest.url_prefix[IORequest.access_method]);
var _2b=IORequest.find_cookie(IORequest.url_cookie);
if(_2b!==undefined&&(_2b.indexOf("old")>-1)){
_2a=((window.location.protocol=="https:"&&IORequest.access_method=="json remote")?IORequest.url_prefix_old["json remote https"]:IORequest.url_prefix_old[IORequest.access_method]);
}else{
var _2c=IORequest.find_cookie(IORequest.pqa_cookie);
if(_2c!==undefined&&(_2c.indexOf("A")>-1)){
_2a=_2a+"prodqa/";
}
}
this.url=_2a+this.get_client_id()+"/"+_a+"?ts="+(((new Date().getTime())/600000)|0);
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
this.cm_io_rec=function(_2d){
this.stop_watch.stop();
if(this.h_timer!==undefined){
clearTimeout(this.h_timer);
this.h_timer=undefined;
}
if(this.io_zone.zpf!==undefined){
if(_2d!==undefined){
var _2e=_2d.pd[0][0];
var _2f=_2d.hd[6];
var _30=_2d.hd[2];
var _31=_2d.hd[3];
var _32=_2d.hd[5];
if(_32==0){
this.display_status("Downloaded product file contains no recommendations.  Continuing to next step.","blue");
IORequest.log(IORequest.log_warn,"Downloaded product file contains no recommendations.  Continuing to next step.");
this.download_product();
}else{
if(_30=="S"){
_2e=IORequest.raw_search_term.replace(/"/g,"\\\"");
}
if((IORequest.request_crc!==undefined)&&(_2f!==undefined)&&(_2f.length==8)&&(IORequest.timeout_product[_31+_2f])){
IORequest.log(IORequest.log_trace,"Product download attempt following timeout for same file.  Requested file CRC",IORequest.request_crc);
IORequest.timeout_product[_31+_2f]=0;
return;
}
this.display_status("Successful download of IO Recommendations for product: "+_2e+" <font color=\"black\">("+this.stop_watch.elapsed_time+" ms)</font>.","green");
IORequest.log(IORequest.log_trace,"successful retrieval of IO Recommendations for product "+_2e,this.stop_watch.elapsed_time+" ms");
IORequest.log(IORequest.log_iuo,"requested version: "+this.cgi_version+" returned version",_2d.hd[9]);
IORequest.log(IORequest.log_product_file,"product file",_2d);
var _33=[];
var _34=[];
var _35=[];
var _36=[];
if(_30=="P"){
if((IOConfig.category_structure=="E")&&(_2d.pd[0][2])){
_io_state.cm_ted_io({i_offer:"epr_category",cg:_2d.pd[0][2].toString().toUpperCase()});
}
if((+IOConfig.brand_personalization[0])!=-1){
var _37=(+IOConfig.brand_personalization[0])+3;
_io_state.cm_ted_io({i_offer:"brand",brn:_2d.pd[0][_37]});
}
}
var _38=[];
var mpc=_io_state.cm_get_product_from_cookie("_MPC_");
for(var _39=1;_39<_2d.pd.length;_39++){
_38[_39-1]=[];
_38[_39-1][0]=_39;
if((IORequest.optional_parm=="R")&&(_30!="P")){
_38[_39-1][1]=Math.floor(Math.random()*1000);
}else{
var _3a=(IORequest.encrypt_cats?IORequest.hex32(IORequest.crc32_str(_2d.pd[_39][2])):_2d.pd[_39][2]);
_38[_39-1][1]=_2d.pd[_39][1]*((_3a==mpc)?_io_config.cp:1);
}
}
_38.sort(function(a,b){
return (b[1]-a[1]);
});
if((IOConfig.brand_personalization[1]!=-1)){
var mpb=_io_state.cm_get_product_from_cookie("_MPB_");
if(mpb!==0){
for(var _3b=1;_3b<_2d.pd.length;_3b++){
_38[_3b-1]=[];
_38[_3b-1][0]=_3b;
var _3c=_2d.pd[_3b][(+IOConfig.brand_personalization[0])+3];
var _3d=IORequest.hex32(IORequest.crc32_str(_3c));
_38[_3b-1][1]=_2d.pd[_3b][1]*((_3d==mpb)?(+IOConfig.brand_personalization[1]):1);
}
_38.sort(function(a,b){
return (b[1]-a[1]);
});
}
}
l_attribute_array=_2d.pd[0].length;
for(var _3e=3;_3e<l_attribute_array;_3e++){
var _3f=((_2d.ap!==undefined&&_2d.ap[_3e-3]!==undefined)?_2d.ap[_3e-3]:"");
_36.push((_2d.pd[0][_3e]===undefined)?undefined:_3f+_2d.pd[0][_3e].replace(/"/g,"\\\""));
}
var _40=[];
var _41=[];
if(this.io_zone.filter_cp){
var acp=_io_state.cm_get_product_from_cookie("_ACP_");
for(var _42=0;_42<acp.length;_42++){
if(IORequest.encrypt_prds){
_40[acp[_42]]=1;
}else{
_41[acp[_42]]=1;
}
}
}
if(this.io_zone.filter_pp){
var app=_io_state.cm_get_product_from_cookie("_APP_");
for(var _43=0;_43<app.length;_43++){
if(IORequest.encrypt_prds){
_40[app[_43]]=1;
}else{
_41[app[_43]]=1;
}
}
}
for(var _44=0;_44<_io_config.bad_list.length;_44++){
_40[_io_config.bad_list[_44]]=1;
}
_41[IORequest.plain_text_product_id]=1;
IORequest.reason=[];
var _45=(_io_config.required_attrs.length);
for(var ii=0;((_33.length<this.io_zone.n_recs)&&(ii<_38.length));ii++){
var _46=_38[ii][0];
var _47=_2d.pd[_46][0];
var _48=IORequest.hex32(IORequest.crc32_str(_47));
IORequest.reason[_47]=6;
var _49=_47.replace(/"/g,"\\\"");
var _4a=_2d.pd[_46][2];
var _4b=true;
if((IORequest.filtered_out_products[_47]===undefined)&&(_41[_47]===undefined)&&(_40[_48]===undefined)&&(IOState.h_productview_product[_47]===undefined)){
var _4c=[];
for(var _4d=3;((_4d<_2d.pd[_46].length)&&(_4b===true));_4d++){
if((_45>(_4d-3))&&(_io_config.required_attrs[_4d-3])&&!(_2d.pd[_46][_4d])){
_4b=false;
}else{
var _4e=((!IORequest.is_undefined(_2d.ap)&&_2d.ap[_4d-3]!==undefined)?_2d.ap[_4d-3]:"");
_4c.push((_2d.pd[_46][_4d]===undefined)?undefined:_4e+_2d.pd[_46][_4d].replace(/"/g,"\\\""));
}
}
if(_4b){
_33.push(_49);
_34.push(_4a);
if(IORequest.conflict_resolution===true){
IORequest.filtered_out_products[_47]=1;
}
_35.push("[\""+_4c.join("\",\"")+"\"]");
}else{
IORequest.log(IORequest.log_trace,_49+" required attribute not present","not sent to zpf");
IORequest.reason[_47]=1;
}
}else{
if((_41[_47]!==undefined)||(_40[_48]!==undefined)){
IORequest.log(IORequest.log_trace,_49+" is recently carted or purchased, is in bad product list, or is the specified product on cmRecRequest","not sent to zpf");
IORequest.reason[_47]=2;
}else{
if(IORequest.filtered_out_products[_47]!==undefined){
IORequest.log(IORequest.log_trace,_49+" appears in previous zone","not sent to zpf");
IORequest.reason[_47]=3;
}else{
if(IOState.h_productview_product[_47]!==undefined){
IORequest.log(IORequest.log_trace,_49+" appears in the recommendation list but is also a product for which a product view tag was issued for this page","not sent to zpf");
IORequest.reason[_47]=5;
}
}
}
}
}
this.display_product_table(_2d,_33);
this.display_product_images(_2d,_33);
var _4f=[];
_4f._SP_="Recommendations";
_4f._SC_="Top Selling Items";
_4f._NR_="No Recommendations";
_4f._RVP_="Recommendations based on an item you've recently viewed";
_4f._RVL_="Recently viewed items";
_4f._RPP_="Recommendations based on an item you've recently purchased";
_4f._LCP_="Recommendations based on an item you've recently carted";
_4f._RVC_="Recommendations from a category you've recently viewed";
_4f._MPC_="Top selling items from a category of your interest";
_4f._SS_="Recommendations based on search terms";
_4f._DPF_="Default Recommendations";
var _50=[];
var _51=_33.length?true:false;
var _52=_51?this.io_zone.rec_plan.rec_steps[IORequest.current_step].target_id:"_NR_";
if(!_51){
IORequest.log(IORequest.log_trace,"No recommendations made it through the filters","changing target symbolic from "+this.io_zone.rec_plan.rec_steps[IORequest.current_step].target_id+" to _NR_.");
}
var _53=this.io_zone.rec_plan.rec_steps[IORequest.current_step].heading||_4f[_52];
_50.push(_51?"[\""+_33.join("\",\"")+"\"]":"[]");
_50.push("\""+this.io_zone.name+"\"");
_50.push("\""+_52+"\"");
_50.push("\""+_2e+"\"");
_50.push("\""+_2d.pd[0][2]+"\"");
_50.push("["+_35.join()+"]");
_50.push("[\""+_36.join("\",\"")+"\"]");
_50.push("\""+_53+"\"");
_50.push("\""+(this.io_zone.ab_test_id||"")+"\"");
if(_io_config.zpfcid!="N"){
_50.push(_51?"[\""+_34.join("\",\"")+"\"]":"[]");
}
var _54=this.io_zone.zpf+"("+_50.join()+")";
if(this.io_zone.zpf!==undefined){
IORequest.log(IORequest.log_trace,"Calling zone population function",_54);
setTimeout(_54,0);
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
this.cm_io_cfg=function(_55,_56){
this.stop_watch.stop();
clearTimeout(_io_request.h_timer);
_io_request.h_timer=undefined;
if(_io_config===undefined){
if(_55!==undefined){
this.action_callback(_56?"server_cfg":"default_cfg");
IORequest.log(IORequest.log_trace,"successful retrieval of config file",this.stop_watch.elapsed_time+" ms");
IORequest.log(IORequest.log_config_file,"config file",_55);
if(_55.zp!==undefined){
_io_config=new IOConfig(_55);
this.action_callback("config_return");
}else{
setTimeout("IORequest.config_download_failure(\"corrupt config file\");",0);
}
if(_56){
IORequest.i_zone=0;
setTimeout("IORequest.config_downloaded(\"successful config download\");",0);
}
_io_state.cm_build_all_recent_arrays();
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
var _57;
var _58;
n=val&65535;
_57=n.toString(16).toUpperCase();
while(_57.length<4){
_57="0"+_57;
}
n=(val>>>16)&65535;
_58=n.toString(16).toUpperCase();
while(_58.length<4){
_58="0"+_58;
}
return _58+_57;
};
IORequest.cookie_info=function(_59,_5a){
var c=document.cookie;
var l=c.length;
var n=c.split(";").length;
IORequest.log(IORequest.log_trace,"cookie_length: "+l+" number of cookies",IORequest.cookie_count(_59));
IORequest.log(IORequest.log_trace,"cookie",c);
alert("n: "+n+" l: "+l+" cookie: "+c);
if(_5a){
var _5b=_5a-l-3-_59.length;
var _5c="";
for(var i=0;i<_5b;i++){
_5c+=""+i%10;
}
IORequest.set_and_check_cookie(_59,_5c);
IORequest.cookie_info(_59);
}
};
IORequest.cookie_count=function(_5d){
var c=document.cookie;
var n=0;
if(c){
n=c.split(";").length;
}
return n;
};
IORequest.find_cookie=function(_5e){
var _5f=document.cookie.split("; ");
var _60=_5e.length;
for(var _61=0;_61<_5f.length;_61++){
if((_5e+"=")==_5f[_61].substring(0,_60+1)){
return (_5f[_61].substring(_60+1));
}
}
return (undefined);
};
IORequest.rm_cookie=function(_62){
document.cookie=_62+"=;path=/;expires="+new Date(1998,0).toGMTString()+";;";
};
IORequest.set_and_check_cookie=function(_63,_64,_65,_66){
document.cookie=_63+"="+_64+";path=/"+(_65?"":";expires="+new Date(2020,0).toGMTString())+(_66?";domain="+_66:"");
_64=IORequest.find_cookie(_63);
if(_64===undefined){
if(!_65){
IORequest.perm_cookie_not_supported=true;
}
}
return (_64);
};
IORequest.build_array_from_cookie=function(_67){
var _68=IORequest.find_state_cookie();
return ((_68===undefined)?undefined:(_68.split(IORequest.cookie_separator))[_67]);
};
IORequest.find_state_cookie=function(){
if(IORequest.vanity_suffix===undefined){
if(cm_JSFPCookieDomain===null||cm_JSFPCookieDomain===undefined){
var _69=document.domain;
if(_69){
var re=/[^.]+\.[^.]+$/;
IORequest.vanity_suffix="."+_69.match(re);
}
}else{
IORequest.vanity_suffix=cm_JSFPCookieDomain;
}
}
var _6a=IORequest.find_cookie(IORequest.state_cookie);
if(_6a===undefined){
var _6b=((IORequest.ie_version()!==null)&&(IORequest.ie_version()<7))?20:30;
if(IORequest.cookie_count()>=_6b){
_6a=undefined;
}else{
var rn=Math.floor(Math.random()*100);
_6a=[rn,IOConfig.version,IOConfig.brand_personalization[0],IOConfig.brand_personalization[1],IOConfig.category_structure,IORequest.a_max_elements[0],IORequest.a_max_elements[1],IORequest.a_max_elements[2],IORequest.a_max_elements[3],IORequest.a_max_elements[4],IORequest.a_max_elements[5],IORequest.a_max_elements[6]].join("~")+IORequest.cookie_separator+IORequest.cookie_separator+IORequest.cookie_separator+IORequest.cookie_array_separator+IORequest.cookie_array_separator+IORequest.cookie_array_separator+IORequest.cookie_array_separator+IORequest.cookie_array_separator+IORequest.cookie_array_separator;
var _6c=_6a;
_6a=IORequest.set_and_check_cookie(IORequest.state_cookie,_6c,false,IORequest.vanity_suffix);
}
}
return (_6a);
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
IORequest.pqa_cookie="CoreM_State_pqa";
IORequest.url_cookie="CoreM_State_url";
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
IORequest.log=function(bit,_6d,_6e){
if(IORequest.find_cookie(IORequest.no_log_cookie)===undefined){
if(_6e!==undefined){
_6d=_6d+": "+_6e;
}
if(bit==IORequest.log_product_file||bit==IORequest.log_config_file){
console.group();
console.dir(_6e);
console.groupEnd();
}else{
if(bit==IORequest.log_warn){
console.warn(_6d);
}else{
if(bit==IORequest.log_error){
console.error(_6d);
}else{
if(IORequest.log_mask&bit){
console.log(_6d);
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
IORequest.url_prefix["json remote"]="http://iocdn.coremetrics.com/";
IORequest.url_prefix["json remote https"]="https://iocdn.coremetrics.com/";
IORequest.url_prefix_old=[];
IORequest.url_prefix_old["json remote"]="http://coremetric.vo.llnwd.net/o33/";
IORequest.url_prefix_old["json remote https"]="https://coremetric.hs.llnwd.net/o33/";
IORequest.image_url_prefix=[];
IORequest.image_url_prefix["json remote"]="http://recs.coremetrics.com/iorequest/prodrecs";
IORequest.image_url_prefix["json remote https"]="https://recs.coremetrics.com/iorequest/prodrecs";
IORequest.rec_request=function(_6f,_70,_71,_72,_73){
IORequest.plain_text_product_id=_70;
IORequest.plain_text_cat_id=_71;
IORequest.log(IORequest.log_trace,"cmRecRequest",_6f+","+_70+","+_71+(_72?","+_72:",")+(_73?","+_73:""));
IORequest.rec_stack.push([_6f,(_70==""?"":(IORequest.encrypt_prds?IORequest.hex32(IORequest.crc32_str(_70)):_70)),(_71==""?"":(IORequest.encrypt_cats?IORequest.hex32(IORequest.crc32_str(_71)):_71)),_72,_73]);
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
IORequest.config_downloaded=function(_74){
IORequest.stack_manager(_74);
};
IORequest.config_download_failure=function(_75){
_io_config=new IOConfig(IORequest.default_json);
for(var _76=0;_76<IORequest.rec_stack.length;_76++){
_io_config.add_zone(IORequest.rec_stack[_76][0]);
}
IORequest.stack_manager(_75);
};
IORequest.encode_search_term=function(_77){
_77=_77.toString().toUpperCase();
if(IOConfig.stpr){
for(var _78=0;_78<IOConfig.stpr.length;_78++){
var _79=IOConfig.stpr[_78];
_79=_79.toString().toUpperCase();
if(_77.substring(0,_79.length)==_79){
_77=_77.substr(_79.length);
}
}
}
_77=_77.replace(/[$'&`~@:\[\]\\!%^*()={}\| <>"]/g,"");
return (_77);
};
IORequest.stack_manager=function(_7a){
if(IORequest.rec_stack.length){
var _7b=IORequest.rec_stack.shift();
IORequest.i_zone++;
IORequest.i_msg=0;
IORequest.zone_id=_7b[0];
IORequest.product_id=_7b[1];
IORequest.category_id=_7b[2];
IORequest.optional_parm=(_7b.length>3?_7b[3]:"");
IORequest.raw_search_term=(_7b.length>4?_7b[4]:"");
if(IORequest.raw_search_term){
var _7c=IORequest.encode_search_term(IORequest.raw_search_term);
IORequest.plain_text_search_id=_7c;
IOConfig.crc_specified_search=IORequest.hex32(IORequest.crc32_str(_7c));
_7b[4]=IOConfig.crc_specified_search;
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
_io_request.display_status("stack_manager called - "+_7a+" - parms: "+_7b.join(", "),"green");
IORequest.log(IORequest.log_trace,"stack_manager called - "+_7a+" - parms",_7b.join(", "));
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
IORequest.inspect_json=function(obj,_7d,_7e){
var str="",_7f,msg;
if(_7e===null||_7e===undefined){
_7e=0;
}
if(_7d===null||_7d===undefined){
_7d=1;
}
if(_7d<1){
return "<font color=\"red\">Error: Levels number must be > 0</font>";
}
if(obj===null||obj===undefined){
return "<font color=\"red\">Error: Object <b>NULL</b></font>";
}
str+="<ul>";
var _80;
for(_80 in obj){
if(true){
try{
_7f=typeof (obj[_80]);
str+="<li>("+_7f+") "+_80+((obj[_80]===null)?(": <b>null</b>"):(":  <font color=\"red\">"+obj[_80]+"</font>"))+"</li>";
if((_7f=="object")&&(obj[_80]!==null)&&(_7e+1<_7d)){
str+=IORequest.inspect_json(obj[_80],_7d,_7e+1);
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
str+="<li><font color=\"red\">(Error) "+_80+": "+msg+"</font></li>";
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
function IOConfig(_81){
var _82=false;
this.io=_81;
if(((IORequest.ie_version()!==null)&&(IORequest.ie_version()<7))){
if(this.io.cie6b!==undefined){
for(var ii=0;ii<IORequest.a_max_elements.length;ii++){
if(this.io.cie6b[ii]!=IORequest.a_max_elements[ii]){
IORequest.a_max_elements[ii]=this.io.cie6b[ii];
_82=true;
}
}
}
}else{
if(this.io.cdfltb!==undefined){
for(var _83=0;_83<IORequest.a_max_elements.length;_83++){
if(this.io.cdfltb[_83]!=IORequest.a_max_elements[_83]){
IORequest.a_max_elements[_83]=this.io.cdfltb[_83];
_82=true;
}
}
}
}
if(this.io.cs===undefined){
if(IOConfig.category_structure==-1){
IOConfig.category_structure="S";
}
}else{
var _84=(this.io.cs!=="EPR");
var _85=(IOConfig.category_structure!=="E");
if(_84!==_85){
_82=true;
IOConfig.category_structure=(this.io.cs=="EPR"?"E":"S");
}
}
if(this.io.cv!==undefined){
if(IOConfig.version!==this.io.cv){
_82=true;
IOConfig.version=this.io.cv;
}
}
if(this.io.bp!==undefined){
if(IOConfig.brand_personalization[0]!=this.io.bp[0]){
IOConfig.brand_personalization[0]=this.io.bp[0];
_82=true;
}
if(IOConfig.brand_personalization[1]!=this.io.bp[1]){
IOConfig.brand_personalization[1]=this.io.bp[1];
_82=true;
}
}
if(_82&&(IORequest.ab_group_number!==undefined)){
var cfg=[IORequest.ab_group_number,IOConfig.version,IOConfig.brand_personalization[0],IOConfig.brand_personalization[1],IOConfig.category_structure,IORequest.a_max_elements[0],IORequest.a_max_elements[1],IORequest.a_max_elements[2],IORequest.a_max_elements[3],IORequest.a_max_elements[4],IORequest.a_max_elements[5],IORequest.a_max_elements[6]];
_io_state.cm_write_cookies(cfg);
_82=0;
}
IOConfig.stpr=this.io.stpr||[];
IOConfig.sfto=this.io.sfto||1500;
this.fcpl=this.io.fcpl===undefined?"N":this.io.fcpl.toString().toUpperCase();
this.vcgi=this.io.vcgi===undefined?"Y":this.io.vcgi.toString().toUpperCase();
this.zpfcid=this.io.zpfcid===undefined?"Y":this.io.zpfcid.toString().toUpperCase();
this.required_attrs=this.io.ra||[];
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
for(var _86=0;_86<this.n_zones;_86++){
this.zones[this.io.zp[_86].id]=new IOZone(this.io.zp[_86],this.rec_plan,this.io.rp,this.io.oa);
}
this.add_zone=function(_87){
var _88={"id":_87,"rp":[["001",0,99,3]]};
this.zones[_87]=new IOZone(_88,this.rec_plan,this.io.rp,this.io.oa);
};
};
function IOZone(_89,_8a,_8b,_8c){
var _8d=undefined;
this.name=_89.id;
var _8e=this.name+"_zp";
if((window[_8e]!==undefined)&&(typeof window[_8e]=="function")){
this.zpf=_8e;
}else{
if((window.io_rec_zp!==undefined)&&(typeof window.io_rec_zp=="function")){
this.zpf="io_rec_zp";
}else{
this.zpf=undefined;
}
}
this.filter_pp=(((_89.fp!==undefined)&&(_89.fp===0))?0:1);
this.filter_cp=(((_89.fc!==undefined)&&(_89.fc===0))?0:1);
if(_89.rp.length==1){
if(_8a[_89.rp[0][0]]===undefined){
_8a[_89.rp[0][0]]=new IORecPlan(_89.rp[0][0],_8b,_8c);
}
this.rec_plan=_8a[_89.rp[0][0]];
this.n_recs=_89.rp[0][3];
this.ab_test_id="no ab test";
}else{
var rn=IORequest.ab_group_number;
this.rn=(rn===undefined)?0:rn;
for(var _8f=0;((_8f<_89.rp.length)&&(this.rec_plan===undefined));_8f++){
if(this.rn>=_89.rp[_8f][1]&&this.rn<=_89.rp[_8f][2]){
if(_8a[_89.rp[_8f][0]]===undefined){
_8a[_89.rp[_8f][0]]=new IORecPlan(_89.rp[_8f][0],_8b,_8c);
}
this.rec_plan=_8a[_89.rp[_8f][0]];
this.n_recs=_89.rp[_8f][3];
this.ab_test_id=((_89.rp[_8f][4]!==undefined)?_89.rp[_8f][4]:"no ab test");
}
}
}
};
function IORecStep(_90,_91){
this.offer_id=_90[0];
this.target_id=_90[1];
this.offer_type=this.offer_id?_91[this.offer_id][1]:"N";
this.offer_version=this.offer_id?_91[this.offer_id][0]:0;
this.heading=(_90[3]!==undefined)?_90[3]:"";
this.to_string=function(){
return ("offer_id: "+this.offer_id+" target_id: "+this.target_id+" offer_type: "+this.offer_type+" offer_version: "+this.offer_version);
};
};
function IORecPlan(_92,_93,_94){
this.rec_steps=[];
this.id=_92;
for(var _95=0;_95<_93[_92].length;_95++){
this.rec_steps.push(new IORecStep(_93[_92][_95],_94));
}
};
IOState.h_productview_product=[];
IOState.productview_product="";
IOState.productview_category="";
function IOState(){
var _96=document;
var _97="undefined";
var _98=(IORequest.production?"~":"~");
var _99=":";
var _9a=[];
var _9b=[];
var _9c=[];
var _9d=[];
var _9e=[];
var _9f=[];
var _a0=[];
var _a1=[];
var _a2=[];
var _a3=-1;
var _a4=["p_viewed","p_carted","p_purchased","c_viewed","c_n_views","b_viewed","b_n_views"];
var _a5=["pv","pc","pp","cv","cn","bv","bn"];
var _a6=_a4;
var _a7=false;
var _a8=[];
if(IORequest.basket_pages!==undefined){
for(var _a9=0;_a9<IORequest.basket_pages.length;_a9++){
_a8[IORequest.basket_pages[_a9]]=1;
}
}
this.cm_get_product_from_cookie=function(_aa){
if(_9a.length!==0||(this.cm_build_all_recent_arrays()===true)){
if(_aa=="_RVP_"){
return (IORequest.recently_viewed_product);
}
if(_aa=="_RVL_"){
return (_9e);
}
if(_aa=="_RVC_"){
return (IORequest.recently_viewed_category);
}
if(_aa=="_LCP_"){
return (_9f[0]||0);
}
if(_aa=="_RPP_"){
return (_a0[0]||0);
}
if(_aa=="_MPC_"){
var _ab=0;
for(var _ac=1;_ac<_a1.length;_ac++){
if(parseInt(_9c[_a1[_ac]].n_viewed,10)>parseInt(_9c[_a1[_ab]].n_viewed,10)){
_ab=_ac;
}
}
return (_a1[_ab]||0);
}
if(_aa=="_MPB_"){
var _ad=0;
for(var _ae=1;_ae<_a2.length;_ae++){
if(parseInt(_9d[_a2[_ae]].n_viewed,10)>parseInt(_9d[_a2[_ad]].n_viewed,10)){
_ad=_ae;
}
}
return (_a2[_ad]||0);
}
if(_aa=="_DFTP_"){
return (IORequest.default_prd);
}
if(_aa=="_DFTC_"){
return (IORequest.default_cat);
}
if(_aa=="_APP_"){
return (_a0);
}
if(_aa=="_ACP_"){
return (_9f);
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
cm_id_array_from_index_array=function(_af,_b0,_b1,_b2,_b3,_b4){
var _b5=[];
_b5.max_length=_b0;
if(_af){
var _b6=_af.split("~");
if(_b6.length==1){
_b6=_af.split(",");
}
for(var ii=0;ii<_b6.length;ii++){
var _b7=_b1[_b6[ii]];
_b5.push(_b7);
if(_b3!==undefined){
var _b8=_b3.split("~");
if(_b8.length==1){
_b8=_b3.split(",");
}
if((!(_b2===undefined))&&(_b8.length>0)){
_b2[_b7][_b4]=_b8[ii];
}
}
}
if(_b5.length>_b5.max_length){
_b5.length=_b5.max_length;
}
}
return _b5;
};
cm_create_integer_array_from_id_array=function(_b9,p_h,_ba){
var _bb=[];
for(var ii=0;ii<_b9.length;ii++){
var id=_b9[ii];
if(p_h[id].index==-1){
p_h[id].index=p_h.max_index++;
}
_bb.push(p_h[id][_ba]);
}
return _bb;
};
cm_create_id_array_from_hash=function(p_h){
var _bc=[];
for(var id in p_h){
if(typeof id!="function"){
_bc[p_h[id].index]=id;
}
}
return _bc;
};
cm_add_action=function(_bd,p_h,_be,_bf,_c0){
var _c1;
var _c2=_bd;
if(_be){
_c2=IORequest.hex32(IORequest.crc32_str(_bd));
IORequest.log(IORequest.log_trace,"encryption of "+_bd,_c2);
}
if(_c2!==undefined){
_c1=[_c2];
_c1.max_length=_bf.max_length;
if(p_h[_c2]===undefined){
cm_initialize_id(p_h,_c2);
}
if(_c0!==undefined){
p_h[_c2][_c0]++;
}
for(var ii=0;ii<_bf.length;ii++){
if(_bf[ii]!=_c2){
_c1.push(_bf[ii]);
}
}
if(_c1.length>_c1.max_length){
_c1.length=_c1.max_length;
}
}else{
_c1=_bf;
}
return (_c1);
};
cm_remove_element_from_array=function(p_a,_c3,_c4){
var _c5=[];
if(_c4){
_c3=IORequest.hex32(IORequest.crc32_str(_c3));
}
for(var ii=0;ii<p_a.length;ii++){
if(!(_c3==p_a[ii])){
_c5.push(p_a[ii]);
}
}
return _c5;
};
this.cm_write_cookies=function(_c6){
var _c7=[cm_create_integer_array_from_id_array(_9e,_9b,"index").join("~"),cm_create_integer_array_from_id_array(_9f,_9b,"index").join("~"),cm_create_integer_array_from_id_array(_a0,_9b,"index").join("~"),cm_create_integer_array_from_id_array(_a1,_9c,"index").join("~"),cm_create_integer_array_from_id_array(_a1,_9c,"n_viewed").join("~"),cm_create_integer_array_from_id_array(_a2,_9d,"index").join("~"),cm_create_integer_array_from_id_array(_a2,_9d,"n_viewed").join("~")];
if(_a7){
for(var jj=0;jj<_a6.length;jj++){
_c7[jj]=_a6[jj]+_99+_c7[jj];
}
}
var cfg=_c6.join("~");
var prd=cm_create_id_array_from_hash(_9b).join(_98);
var cat=cm_create_id_array_from_hash(_9c).join(_98);
var brn=cm_create_id_array_from_hash(_9d).join(_98);
var cnt=_c7.join(IORequest.cookie_array_separator);
var _c8=[cfg,prd,cat,brn,cnt].join(IORequest.cookie_separator);
var rc=IORequest.set_and_check_cookie(IORequest.state_cookie,_c8,false,IORequest.vanity_suffix);
IORequest.log(IORequest.log_cookie_write,"write "+IORequest.state_cookie,IORequest.is_undefined(rc)?"permanent cookies disabled":_c8);
return (rc);
};
this.cm_build_all_recent_arrays=function(){
var _c9=[];
var _ca=[];
var _cb=[];
var _cc=IORequest.find_state_cookie(IORequest.state_cookie);
if(_cc!==undefined){
var _cd=(_cc===undefined)?4:(_cc.split(IORequest.cookie_separator).length-1);
_9a=IORequest.build_array_from_cookie(0).split(",");
if(_9a.length>0){
IORequest.ab_group_number=_9a[0];
if(IORequest.ab_group_number.length>3){
_9a=IORequest.build_array_from_cookie(0).split("~");
IORequest.ab_group_number=_9a[0];
}
if(_9a.length>1){
IOConfig.version=_9a[1];
IOConfig.brand_personalization[0]=_9a[2];
IOConfig.brand_personalization[1]=_9a[3];
IOConfig.category_structure=_9a[4];
IORequest.a_max_elements[0]=_9a[5];
IORequest.a_max_elements[1]=_9a[6];
IORequest.a_max_elements[2]=_9a[7];
IORequest.a_max_elements[3]=_9a[8];
IORequest.a_max_elements[4]=_9a[9];
IORequest.a_max_elements[5]=_9a[10];
IORequest.a_max_elements[6]=_9a[11];
}
}
_c9=IORequest.build_array_from_cookie(1).split(_98);
_9b=cm_build_hash_from_array(_c9);
_ca=IORequest.build_array_from_cookie(2).split(_98);
_9c=cm_build_hash_from_array(_ca);
if(_cd>3){
_cb=IORequest.build_array_from_cookie(3).split(_98);
_9d=cm_build_hash_from_array(_cb);
}
var _ce=IORequest.build_array_from_cookie(_cd).split(IORequest.cookie_array_separator);
if(_a7&&(g_b_a_arrays[0].substring(0,2)==_a6[0].substring(0,2))){
for(var ii=0;ii<_ce.length;ii++){
_ce[ii]=_ce[ii].substring(_a6[ii].length+1);
}
}
_9e=cm_id_array_from_index_array(_ce[0],IORequest.a_max_elements[0],_c9);
_9f=cm_id_array_from_index_array(_ce[1],IORequest.a_max_elements[1],_c9);
_a0=cm_id_array_from_index_array(_ce[2],IORequest.a_max_elements[2],_c9);
_a1=cm_id_array_from_index_array(_ce[3],IORequest.a_max_elements[3],_ca,_9c,_ce[4],"n_viewed");
if(_cd>3){
_a2=cm_id_array_from_index_array(_ce[5],IORequest.a_max_elements[5],_cb,_9d,_ce[6],"n_viewed");
}
if(IORequest.recently_viewed_product===undefined){
IORequest.recently_viewed_product=(_9e.length===0?0:_9e[0]);
}
if(IORequest.recently_viewed_category===undefined){
IORequest.recently_viewed_category=(_a1.length===0?0:_a1[0]);
}
if(_9a.length==1){
IORequest.rm_cookie(IORequest.state_cookie);
var cfg=[IORequest.ab_group_number,IOConfig.version,IOConfig.brand_personalization[0],IOConfig.brand_personalization[1],IOConfig.category_structure,IORequest.a_max_elements[0],IORequest.a_max_elements[1],IORequest.a_max_elements[2],IORequest.a_max_elements[3],IORequest.a_max_elements[4],IORequest.a_max_elements[5],IORequest.a_max_elements[6]];
this.cm_write_cookies(cfg);
}
return (true);
}else{
return (false);
}
};
cm_build_html_table_from_array=function(_cf,_d0,p_h,_d1){
var _d2=(_d1?2:1);
var _d3=_d0.length;
var _d4="";
var _d5=(_d2==1?"<TD COLSPAN=2>":"<TD>");
if(_d3>0&&(_d0[0]!==undefined)){
_d4="<TR><TH ROWSPAN="+_d3+">"+_cf+"</TH>"+_d5+(_d2==2?p_h[_d0[0]][_d1]+"</TD><TD>":"")+_d0[0]+"</TD></TR>";
for(var ii=1;ii<_d3;ii++){
_d4+="<TR>"+_d5+(_d2==2?p_h[_d0[ii]][_d1]+"</TD><TD>":"")+_d0[ii]+"</TD></TR>";
}
}else{
_d4="<TR><TH ROWSPAN=1>"+_cf+"</TH>"+"<TD COLSPAN=2>"+"No "+_cf+"</TD></TR>";
}
return (_d4);
};
cm_get_products_in_cart=function(){
if(this.cm_build_all_recent_arrays()===true){
return (_9f);
}else{
return ([]);
}
};
this.cm_format_cookie_arrays=function(_d6){
return ("<H3>Obsolete</H3>");
};
this.cm_ted_io=function(_d7){
var _d8=false;
if(this.cm_build_all_recent_arrays()===true){
if(_d7.i_offer!==undefined){
if(_d7.i_offer=="epr_category"){
if(_io_config.fcpl=="Y"){
_d7.cg=_d7.cg.replace(/>.*$/,"");
_d7.cg=_d7.cg.replace(/\s+$/,"");
}
if(_d7.cg!==undefined){
if(_d7.cg.length<=IORequest.max_cat_length){
IORequest.log(IORequest.log_trace,"Adding EPR Category to cookie.  Category",_d7.cg);
_a1=cm_add_action(_d7.cg,_9c,IORequest.encrypt_cats,_a1,"n_viewed");
_d8=true;
}else{
IORequest.log(IORequest.log_warn,"EPR Category not added to cookie.  Category length is greater than the maximum of "+IORequest.max_cat_length+". Category",_d7.cg);
}
}
}
if(_d7.i_offer=="brand"){
IORequest.log(IORequest.log_trace,"adding "+_d7.brn,"g_a_brn_viewed array");
_a2=cm_add_action(_d7.brn,_9d,1,_a2,"n_viewed");
_d8=true;
}
}else{
if(_d7.tid==1||_d7.tid==6||_d7.tid==5){
IORequest.log(IORequest.log_cookie_write,"initial "+IORequest.state_cookie,IORequest.find_state_cookie());
}
if(5==_d7.tid){
var _d9=""+_d7.pr.toString().toUpperCase();
var _da=""+_d7.cg.toString().toUpperCase();
if(_d9!==undefined){
if(_d9.length<=IORequest.max_prd_length){
IORequest.log(IORequest.log_trace,"Adding product from product view to cookie.  Product",_d9);
_9e=cm_add_action(_d9,_9b,IORequest.encrypt_prds,_9e);
_d8=true;
}else{
IORequest.log(IORequest.log_warn,"Product from product view not added to cookie.  Product length is greater than the maximum of "+IORequest.max_prd_length+". Product",_d9);
}
}
if((_da!==undefined)&&(IOConfig.category_structure=="S")){
if(_da.length<=IORequest.max_cat_length){
IORequest.log(IORequest.log_trace,"Adding Site Category from product view to cookie.  Category",_da);
_a1=cm_add_action(_da,_9c,IORequest.encrypt_cats,_a1,"n_viewed");
_d8=true;
}else{
IORequest.log(IORequest.log_warn,"Site Category from product view not added to cookie.  Category length is greater than the maximum of "+IORequest.max_cat_length+". Category",_da);
}
}
IOState.b_product_view=true;
IOState.h_productview_product[_d9]=1;
IOState.productview_product=_d9;
IOState.productview_category=_da;
}
if((_d7.pr!==undefined)&&(4==_d7.tid)&&(5==_d7.at)){
if(_d7.pr.length<=IORequest.max_prd_length){
IORequest.log(IORequest.log_trace,"Adding product from cart contents to cookie.  Product",_d7.pr);
_9f=cm_add_action(_d7.pr.toString().toUpperCase(),_9b,IORequest.encrypt_prds,_9f);
_d8=true;
}else{
IORequest.log(IORequest.log_warn,"Product from cart contents not added to cookie.  Product length is greater than the maximum of "+IORequest.max_prd_length+". Product",_d7.pr);
}
}
if((_d7.pr!==undefined)&&(4==_d7.tid)&&(9==_d7.at)){
if(_d7.pr.length<=IORequest.max_prd_length){
IORequest.log(IORequest.log_trace,"Adding product from purchase to cookie.  Product",_d7.pr);
_a0=cm_add_action(_d7.pr.toString().toUpperCase(),_9b,IORequest.encrypt_prds,_a0);
_d8=true;
}else{
IORequest.log(IORequest.log_warn,"Product from purchase not added to cookie.  Product length is greater than the maximum of "+IORequest.max_prd_length+". Product",_d7.pr);
}
}
}
if(_d8){
this.cm_write_cookies(_9a);
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

cmExecuteTagQueue();