// SiteCatalyst code version: H.23.4
// See Sharepoint for version notes
var s=s_gi(s_account);

// *** CONFIG SECTION ***
s.charSet="UTF-8";
s.trackDownloadLinks=true;s.trackExternalLinks=true;s.trackInlineStats=true;
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,xls,docx,xlsx";
s.linkInternalFilters="javascript:,vons.com,genuardis.com,dominicks.com,pavilions.com,tomthumb.com,randalls.com,carrsqc.com,safeway.com";
s.linkLeaveQueryString=false;s.linkTrackVars=s.linkTrackEvents="None";s.usePlugins=true;
var hostname=document.location.host.toLowerCase();
var isEcom=/(shop\.safeway\.com)/i.test(hostname);
var loginProcessed=false; isLinkTrack=false;

// Channel Manager Config
s._channelDomain="Facebook|facebook.com>Twitter|twitter.com>YouTube|youtube.com>theubar|theubar.co.uk>KnowYourMobile|knowyourmobile.com";
s._channelParameter="Email|cmpid,om_u>Other|cmpid";
s._channelPattern="Paid Search|search_>Paid Search|kw_>Social Media|sm_>Banner|di_>Email|em_>Email|om_u>Affiliate|af_>Affiliate|cj_";

// Form Analysis Config
// List of form names to track
s.formList="registration,deliveryAddress,frmCheckout,EmailAddressForm,airlinescomment,Delivery,Driver,Order,General Service,Ordering Online,Substitutions,Website Performance,airlinescomment,webcomment,productrequest,clubcardupdate,supplierapplication,rxrefill,rxtransfer,EditClubCardForm,ChangeUIDForm,EmailSubscriptionForm,ChangePwdForm,RegistrationMoreInfoForm,UserRegistrationForm,frmRedirector,Login,PasswordResetForm,LogOffForm,previewForm,SecurityQuestionAnswerForm,RetrievePasswordForm,ContactInfoForm,ChangePwdQAForm";
s.trackFormList=true;s.trackPageName=true;s.useCommerce=true;s.varUsed="eVar12";
// Abandon,Success,Error
s.eventList="event12,event13,event14";

function s_doPlugins(s){
	// Abort further population if 404 page
	if ((typeof (s.pageType)!="undefined") && s.pageType.length > 0) return;
	isLinkTrack=getIsLinkTrack(s);
	
	s.prop19="D=g";
	s.prop4=s.getNewRepeat(90);// 3 months
	s.prop5="Ver. 4.3"; // s_code version
	s.server=trimLc(getServerName());
	
	if(s.channel)s.channel=trimLc(s.channel.replace(/(\s)|_|-/gi,""));
	if(s.prop3)s.prop3=trimLc(s.prop3.replace(/(\s)|_|-/gi,""));// Sub Section
	if(s.eVar3)s.eVar3=trimLc(s.eVar3);// Finding method
	s.eVar15=[s.getTimeParting('d','-8'),s.getTimeParting('h','-8')].join("|");// Set TimeParting Variable
	s.prop11=(isEcom)?"eCommerce":"Content";
	s.events=s.apl(s.events,'event7',',',1);// Conversion Page Views
	s.prop30=(/(m|mobile)\..*\.com/i.test(hostname))?"Mobile Website":"Standard Website";
	if(s.channel&&/signin/i.test(s.channel))s.channel="myaccount";
		
	if(s.pageName)s.pageName=trimLc(s.pageName.replace(/(\s)|_|-/gi,""));
	else s.pageName=trimLc(getPageName(s)).replace(/::/g,"");

	if (isEcom){// eCom specific tracking
		s.hier1=trimLc([s.server,s.channel,s.prop3,s.pageName].join(":").replace(/::::|::/gi,":"));
		s.pageName=s.hier1;

		//capture virtual shelf id in eVar21 
		if (/virtualshelf/i.test(s.hier1)){var hSR=s.hier1.split(":");if (hSR.length<5)s.eVar21= hSR[3];}
	} else{// Content specific tracking
		if (!s.channel)s.channel=trimLc(s.pageName);
		if (/\:/.test(s.pageName))s.hier1=s.pageName;
		else if (s.channel===s.pageName)s.hier1=trimLc([s.server,s.channel,s.prop3].join(":"));
		else if (s.channel===s.prop3)s.hier1=trimLc([s.server,s.prop3,s.pageName].join(":"));
		else if (s.pageName===s.prop3)s.hier1=trimLc([s.server,s.channel,s.pageName,"home"].join(":"));
		else s.hier1=trimLc([s.server,s.channel,s.prop3,s.pageName].join(":"));
		s.pageName=s.hier1;
		
		setJFUValues(s);
	}
	
	// Map eVar from props
	if(s.server&&!s.eVar4)s.eVar4="D=server";
	if(s.pageName&&!s.eVar5)s.eVar5="D=pageName";
	if(s.prop4&&!s.eVar8)s.eVar8="D=c4";
	if(s.prop11&&!s.eVar23)s.eVar23="D=c11";
	if(s.prop30&&!s.eVar52)s.eVar52="D=c30";
		
	setExtCampaign(s);
	setIntCampaign(s);
	setIntSearch(s);
	
	if (s.events){   
		if (/scOpen/i.test(s.events)) s.prop9='start';
		if (/scCheckout/i.test(s.events)){s.prop9='stop';s.prop10='start';}
		if (/purchase/i.test(s.events)) s.prop10='stop';  
		s.prop9=s.getTimeToComplete(s.prop9,'ttbc',0); // Time to Build Cart
		s.prop10=s.getTimeToComplete2(s.prop10,'ttco',0); // Time to Check Out
	}
	
	clearVariables(s);
	getLoginState(s);
	s.setupFormAnalysis();
	pluginsCompleted=true;
}

function clearVariables(s){
	s.pageName=s.pageName.replace(/:/g,": ");
	if(s.eVar41)s.eVar41=s.eVar41.replace(/[&,]/g,"_").replace(/(| )_( |)/g,"_");
	if(s.eVar42)s.eVar42=s.eVar42.replace(/[&,]/g,"_").replace(/(| )_( |)/g,"_");
	if(s.eVar43)s.eVar43=s.eVar43.replace(/[&,]/g,"_").replace(/(| )_( |)/g,"_");
	if(s.eVar45)s.eVar45=s.eVar45.replace(/[&,]/g,"_").replace(/(| )_( |)/g,"_");
	if(s.eVar56)s.eVar56=s.eVar56.replace(/[&,]/g,"_").replace(/(| )_( |)/g,"_");
}

function getIsLinkTrack(s){
	return true; 
	// Need to find an accurate way to detect link track event, e.g. (!s.linkTrackVars||/None/i.test(s.linkTrackVars));
}

function getPageName(s){
	var pN=window.location.pathname.replace(/^[/]|(\.html)|(\.htm)/g,"").replace(/\//g,":");
	if (s.channel==s.prop3)return [s.server,s.channel,(pN||"home")].join(":");
	else return [s.server,s.channel,s.prop3,(pN||"home")].join(":");
}

function getLoginState(s){
	var lgnSt="",src="[event]";
	if (/event18/i.test(s.events)) lgnSt="Logged in (JFU)";
	else if (/LOGOUT/i.test(sc_getCookie('SWY_PROFILE_STATE'))){lgnSt="Logged out (JFU)";src="[swy_cookie]";}
	if (/event10/i.test(s.events)) lgnSt="Logged in (eCom)";
	else if (/event11/i.test(s.events)){lgnSt="Logged out (eCom)"};
	
	if(!lgnSt){	
		var prevSt=s.getAndPersistValue(null,'s_lgnSt',0);
		var longSt=s.getAndPersistValue(null,'s_longSt',30);
		
		if(prevSt){lgnSt=prevSt;src='[session]';}
		else {if (longSt)lgnSt=prevSt;src='[30 day cookie]';}
		if(!lgnSt||/not/i.test(lgnSt)){lgnSt="Not logged in";src="[default]";}
	}
	
	s.eVar16=[s.getAndPersistValue(s.getAndPersistValue(lgnSt,'s_lgnSt',0),'s_longSt',30),src].join(" ");
	var lastActivity=s.getAndPersistValue(null,'s_la',90);s.getAndPersistValue(new Date(),'s_la',90);
	if(!lastActivity)s.eVar17='Just arrived';
	else s.eVar17=new Date(lastActivity).toRelativeTime();
	s.prop23='D=v16+" > "+v17';
	//s.prop23=[s.eVar16,s.eVar17].join(" > ");
	if(isLinkTrack){
		s.linkTrackVars=s.apl(s.linkTrackVars,'eVar16',',',1);
		s.linkTrackVars=s.apl(s.linkTrackVars,'eVar17',',',1);
		s.linkTrackVars=s.apl(s.linkTrackVars,'prop23',',',1);
		s.linkTrackVars=s.apl(s.linkTrackVars,'eVar46',',',1);
		s.linkTrackVars=s.apl(s.linkTrackVars,'prop50',',',1);
	}
}

function setIntCmpnClick(intId) {
	s.linkTrackVars='prop20,eVar2,events';
	s.events=s.linkTrackEvents='event59';
	s.eVar2=s.prop20=[s.pageName,intId].join(": ");
	s.tl(true,'o','Internal Campaign'); 
	s.linkTrackVars=s.linkTrackEvents='None';
}

function setExtCampaign(s){ 
	s.campaign=s.getValOnce(s.getQueryParam('om_u,cmpid',':','f'),'s_campaign',0); 
	if(s.campaign.length>0)s.eVar3="external campaign";
	s.eVar22=s.getValOnce(s.getQueryParam('cmpid',':','f'),'s_evar22',0);
	if (s.c_r('s_eVar22'))s.prop7=(s.eVar22)?[s.eVar22,s.pageName].join(":"):s.pageName;// Campaign pathing 

	// Plugin: channelManager v2.2
	s.channelManager('cmpid,om_u',':','s_cm','0');
	if(s._channel=="Natural Search"){
		s._channel="Organic";		
        s.prop40=s._campaign=trimLc([s._channel,s._partner,trim(s._keywords)].join(": "));
    }else if(s._channel=="Referrers"){
		s._channel="Other Referrers";		
		s.prop40=s._campaign=trimLc([s._channel,s._referringDomain].join(": "));
	}

	s.eVar36=s._channel; //Channel Manager Channel
	//s.eVar38=s._campaign; //Channel Manager Campaign
	if(!s.prop40&&s.eVar36)s.prop40=trimLc(s.eVar36);
	if(s.campaign)s.prop40=trimLc([s.prop40,"cid-"+s.campaign].join(": "));
	s.eVar38=s.prop40;
	
	// Cross Visit Participation
	s.eVar18=s.crossVisitParticipation(s.eVar38,'s_evar38cvp','90','5','>','purchase'); //campaign
	s.eVar37=s.crossVisitParticipation(s.eVar36,'s_evar36cvp','90','5','>','purchase'); //channel
}

function setIntCampaign(s){
	if (!s.eVar2)s.eVar2=s.getValOnce(s.getQueryParam('icmpid','','f'),'s_evar2',0);
	if (s.eVar2.length>0)s.eVar3="internal campaign";
	if (s.c_r('s_evar2'))s.prop8=(s.eVar2)?[s.eVar2,s.pageName].join(":"):s.pageName;// Campaign pathing
}

function setIntSearch(s){
	if (!s.prop1) return;// abort if no searh term
	s.eVar3="internal search";
	s.events=s.apl(s.events,'event1',',',1);// capture all search attempts
	s.eVar1=s.prop1=[s.prop11,trimLc(s.prop1.replace(/[^\w| ]+/gi,''))].join(': ');
	if (s.prop2 && /zero|0/i.test(s.prop2)) s.events=s.apl(s.events,'event8',',',1);// Null search
}

function getServerName(){
	try{
		// Different process for eCom - shop.safeway.com
		if (isEcom){
			var bId=trim(sc_getCookie('brandid'));
			if(IsBlank(bId))bId='1';
			
			switch (bId){
				case "1":return "safeway";case "2":return "vons";case "3":return "genuardis";
				default:return "safeway";
			}
		} else{
			var vH=hostname.match(/(safeway|vons|genuardis|pavilions|dominicks|tomthumb|randalls|carrsqc)\.com/i);
			if(vH)return trimLc(vH[1]);
			else trimLc(["other",hostname].join(": "));
		}
	} catch (Err){
		return ["Error",Err].join(": ");
	}
}

function ignoreTestUsers(){
	var ignoreIDs={"300-369-1002548440":1,"300-368-1000169705":1,"300-368-1000669155":1,"300-368-1000669164":1};
	var loginID=s.getAndPersistValue(null,'s_eVar27',7);	
	if(ignoreIDs[loginID]==1) throw("Ignore TestUser");
}

function setJFUValues(s){
	// Remove eVar27 from CI pages
	if(!/(event18)/.test(s.events) && s.eVar27) s.eVar27='';
	else if(s.eVar27&&!/^ *[0-9\-]+ *$/i.test(s.eVar27)){ // Validate Login ID
		setPageError(s,'JFU validation','invalid login id (eVar27) ['+s.eVar27+']');
		s.eVar27="";
	}
	
	if (!isEcom){
		setJFULogin(s);
		ignoreTestUsers();
		
		// prop18 | eVar50	JFU Program
		// eVar46 JFU Card Number
		s.eVar34=trim(sc_getCookie('swyConsumerDirectoryPro')); // Session ID
		s.prop34="D=v34";
		
		if(isLinkTrack){
			s.linkTrackVars=s.apl(s.linkTrackVars,'prop34',',',1);
			s.linkTrackVars=s.apl(s.linkTrackVars,'eVar34',',',1);
		}
		
		if(!s.prop18&&!s.eVar50){
			if(/(just4u)|(justforu)/i.test(hostname)){
				if(/eoffers\.aspx/i.test(document.location.pathname)) s.prop18="Coupon Center";
				if(/psoffers\.aspx/i.test(document.location.pathname)) s.prop18="Personalized Deals";
				if(/storeprices\.aspx/i.test(document.location.pathname)) s.prop18="Club Specials";
				try{if(ci_regObj) s.eVar46=ci_regObj.ccnum;}catch(err){}
			}else if(/(deal|ad)match/i.test(hostname)){
				s.prop18="Deal Match";
			}
			
			// Use page name s alternative
			if(!s.prop18){
				if(/couponctr/i.test(s.pageName)) s.prop18="Coupon Center";
				if(/personaldeal/i.test(s.pageName)) s.prop18="Personalized Deals";
				if(/clubspecial/i.test(s.pageName)) s.prop18="Club Specials";
				if(/(deal|ad)match/i.test(s.pageName)) s.prop18="Deal Match";
			}
		}
		
		s.eVar50="D=c18";
		
		if(s.products){
			var _pI=s.products.split(",");	
			s.products=_pI.slice(0, 5).join(",");
		}
	}
}
// Trims a string
function Trim(str){return (str)?str.replace(/^\s+|\s+$/g,""):"";}
// Trim lowercase
function TrimLc(str){return (str)?Trim(str).toLowerCase():"";}

function setJFULogin(s){
	if (loginProcessed) return;
	try{	
		var hostParts=hostname.split('.');
		var prntDomain=trimLc((hostParts.length>2)?'.'+hostParts.slice(hostParts.length-2).join('.'):hostname); 
		var loginEvent=sc_getCookie('SWY_OMNITURE_LOGIN_EVENT');
		var instrParam=s.getAndPersistValue(s.getQueryParam('Instore'),'s_qsInstore',7);
		var signinLoc='Home';
		if(instrParam&&instrParam.match(/y/i))signinLoc='Store';
		else if(!IsBlank(loginEvent)&&loginEvent.match(/Store/i))signinLoc='Store';
		s.eVar30=signinLoc; // Home or Store
		
		if(!IsBlank(loginEvent)&&loginEvent.match(/_(Home|Store)_/i)) {
			var lgnParts = loginEvent.split("_");
			// Abort if key value does not seem correct
			if (lgnParts.length!=4)throw("loginEvent cookie invalid ["+loginEvent+"]");
			s.eVar27=trimLc(lgnParts[0].replace(/[^0-9\-]/gi,"")); // This is the WSC unique member id, passed to CI
			//s.eVar28=lgnParts[1]; // JFU Visit Time (populated by VISTA)
			s.eVar9=lgnParts[3]; // ZipCode
			
			if(!/^ *[0-9\-]+ *$/i.test(s.eVar27)){
				var errMsg="login id ["+s.eVar27+"] is invalid - loginEvent ["+loginEvent+"]";
				s.eVar27="";
				throw(errMsg);
			}else{
				s.events=s.apl(s.events,'event18',',',1);
				s.getAndPersistValue(s.eVar27,'s_eVar27',7); // Persist Login ID
				sc_log('Log JFU id: ' + loginEvent);
				
				if(isLinkTrack){
					s.linkTrackVars=s.apl(s.linkTrackVars,'events',',',1);
					s.linkTrackEvents=s.events;
					s.linkTrackVars=s.apl(s.linkTrackVars,'eVar9',',',1);
					s.linkTrackVars=s.apl(s.linkTrackVars,'eVar27',',',1);
					s.linkTrackVars=s.apl(s.linkTrackVars,'eVar30',',',1);
				}
			}
			
			sc_setCookie('SWY_OMNITURE_LOGIN_EVENT', signinLoc+'_Retrieved', 0, prntDomain);
			loginProcessed=true;
		}
	} catch (Err){
		sc_setCookie('SWY_OMNITURE_LOGIN_EVENT', 'error', 0, prntDomain);
		setPageError(s,"JFU SC Error",Err);
		s.pageName=(s.pageName||trimLc(getServerName()))+': signin';
		loginProcessed=true;
	}
}

function sc_logGlobalErr(msg,url,line){
	if (/(script error)|(TestUser)/i.test(msg)&&line=="0"&&!url) return true;
	
	try{
		var pEv=s.events;
		var errDesc = [msg,'ln ['+line+']','url ['+url+']'].join(": ");
		var sl=s_gi(s_account);
		sl.linkTrackVars="pageName,prop17,eVar33,events";
		sl.events=sl.linkTrackEvents="event33";
		setPageError(sl,"Global JS",errDesc);
		sl.tl(true,'o',sl.pageName+': global error');		
		sl.prop17=sl.eVar33='';
		sl.events=pEv;
		sl.linkTrackVars=sl.linkTrackEvents="None";
	} catch (Err){
		sc_log (["Global JS failover Error",Err].join(": "));
	}
}

function setPageError(s,errSrc,errDesc){
	s.eVar33=[errSrc,errDesc].join(": ").toLowerCase();
	s.prop17="D=v33";
	s.events=s.apl(s.events,'event33',',',1);
	s.pageName=(s.pageName||trimLc(getServerName()))+': error';
	sc_log ([errSrc,errDesc].join(": "));
	
	if(isLinkTrack){
		s.linkTrackVars=s.apl(s.linkTrackVars,'events',',',1);
		s.linkTrackEvents=s.events;
		s.linkTrackVars=s.apl(s.linkTrackVars,'eVar33',',',1);
		s.linkTrackVars=s.apl(s.linkTrackVars,'prop17',',',1);
	}
}

function sc_setCookie(c_name,value,expiredays,domainname) {
	var exdate=new Date();
	if(expiredays==0)exdate.setMinutes(exdate.getMinutes()+30); 
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie=[c_name,"=",escape(value),";domain=",domainname,";path=/;"].join('');
}

function sc_getCookie(cName) {
	var cVal=null;
	if (document.cookie.length>0) {
		var exExp=new RegExp("(?:^|;)\\s*"+cName+"=(.*?)(?:$|;)");
		var match=document.cookie.match(exExp);
		if (match!=null)cVal=unescape(match[1]);
	}return (cVal||'');
} 

setCookieSwyOmniture=sc_setCookie;

// PLUGINS SECTION
s.doPlugins=s_doPlugins;
// Variable exist / blank
function IsBlank(o, DoEval) {try{var testVal = (DoEval)? eval(o): o;if (testVal === undefined) return true;else if (testVal.length == 0) return true;return false;} catch (Err) {return true;}}
// Trims a string
function trim(str){return str.replace(/^\s+|\s+$/g,"");}
// Trim lowercase
function trimLc(str){return trim(str).toLowerCase();}
// Replaces all instances of a search term
function replaceAll(str,srchTrm,replWith,ignrCase){return str.replace(eval(["/",srchTrm,"/g",((ignrCase) ? "i" : "")].join()),replWith);}
// Debug log
function sc_log(msg) {if (typeof console==="object" && typeof console.log==="function")console.log(msg);}
// Plugin Utility: Replace v1.0
s.repl=new Function("x","o","n",""
+"var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+"substring(i+o.length);i=x.indexOf(o,i+l)}return x");
// Time difference in words
Date.prototype.toRelativeTime=function(now_threshold) {
	var delta = new Date()-this;
	now_threshold=parseInt(now_threshold,10);
	if (isNaN(now_threshold))now_threshold=0;
	if (delta<=now_threshold)return 'A moment ago';
	var units=null;
	var conversions={millisecond:1,second:1000,minute:60,hour:60,day:24,month:30,year:12};
	for (var key in conversions) {
		if (delta<conversions[key]) break;
		else {units = key;delta = delta/conversions[key];}
	}
	delta=Math.floor(delta);if (delta!==1)units+="s";
	return [delta,units,"ago"].join(" ");
}
Date.fromString = function(str) {return new Date(Date.parse(str));}

// Plugin Definitions
// ver. 1.0: get a value once per session or number of days
s.getValOnce=new Function("v","c","e","var s=this,a=new Date,v=v?v:v='',c=c?c:c='s_gvo',e=e?e:0,k=s.c_r(c);if(v){a.setTime(a.getTime()+e*86400000);s.c_w(c,v,e?a:0);}return v==k?'':v");
// ver. 0.3 - get a value on every page
s.getAndPersistValue=new Function("v","c","e","var s=this,a=new Date;e=e?e:0;a.setTime(a.getTime()+e*86400000);if(v)s.c_w(c,v,e?a:0);return s.c_r(c);");
// ver. 1.2 - Returns whether user is new or repeat
s.getNewRepeat=new Function("d","cn","var s=this,e=new Date(),cval,sval,ct=e.getTime();d=d?d:30;cn=cn?cn:'s_nr';e.setTime(ct+d*24*60*60*1000);cval=s.c_r(cn);if(cval.length==0){s.c_w(cn,ct+'-New',e);return'New';}sval=s.split(cval,'-');if(ct-sval[0]<30*60*1000&&sval[1]=='New'){s.c_w(cn,ct+'-New',e);return'New';}else{s.c_w(cn,ct+'-Repeat',e);return'Repeat';}");
//crossVisitParticipation v1.7 - stacks values from specified variable in cookie and returns value
s.crossVisitParticipation=new Function("v","cn","ex","ct","dl","ev","dv",""
+"var s=this,ce;if(typeof(dv)==='undefined')dv=0;if(s.events&&ev){var"
+" ay=s.split(ev,',');var ea=s.split(s.events,',');for(var u=0;u<ay.l"
+"ength;u++){for(var x=0;x<ea.length;x++){if(ay[u]==ea[x]){ce=1;}}}}i"
+"f(!v||v==''){if(ce){s.c_w(cn,'');return'';}else return'';}v=escape("
+"v);var arry=new Array(),a=new Array(),c=s.c_r(cn),g=0,h=new Array()"
+";if(c&&c!=''){arry=s.split(c,'],[');for(q=0;q<arry.length;q++){z=ar"
+"ry[q];z=s.repl(z,'[','');z=s.repl(z,']','');z=s.repl(z,\"'\",'');arry"
+"[q]=s.split(z,',')}}var e=new Date();e.setFullYear(e.getFullYear()+"
+"5);if(dv==0&&arry.length>0&&arry[arry.length-1][0]==v)arry[arry.len"
+"gth-1]=[v,new Date().getTime()];else arry[arry.length]=[v,new Date("
+").getTime()];var start=arry.length-ct<0?0:arry.length-ct;var td=new"
+" Date();for(var x=start;x<arry.length;x++){var diff=Math.round((td."
+"getTime()-arry[x][1])/86400000);if(diff<ex){h[g]=unescape(arry[x][0"
+"]);a[g]=[arry[x][0],arry[x][1]];g++;}}var data=s.join(a,{delim:',',"
+"front:'[',back:']',wrap:\"'\"});s.c_w(cn,data,e);var r=s.join(h,{deli"
+"m:dl});if(ce)s.c_w(cn,'');return r;");
// ver. 2.0
s.getTimeParting=new Function("t","z","y","l","var s=this,d,A,U,X,Z,W,B,C,D,Y;d=new Date();A=d.getFullYear();Y=U=String(A);if(s.dstStart&&s.dstEnd){B=s.dstStart;C=s.dstEnd}else{;U=U.substring(2,4);X='090801|101407|111306|121104|131003|140902|150801|161306|171205|181104|191003';X=s.split(X,'|');for(W=0;W<=10;W++){Z=X[W].substring(0,2);if(U==Z){B=X[W].substring(2,4);C=X[W].substring(4,6)}}if(!B||!C){B='08';C='01'}B='03/'+B+'/'+A;C='11/'+C+'/'+A;}D=new Date('1/1/2000');if(D.getDay()!=6||D.getMonth()!=0){return'Data Not Available'}else{z=z?z:'0';z=parseFloat(z);B=new Date(B);C=new Date(C);W=new Date();if(W>B&&W<C&&l!='0'){z=z+1}W=W.getTime()+(W.getTimezoneOffset()*60000);W=new Date(W+(3600000*z));X=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];B=W.getHours();C=W.getMinutes();D=W.getDay();Z=X[D];U='AM';A='Weekday';X='00';if(C>30){X='30'}if(B>=12){U='PM';B=B-12};if(B==0){B=12};if(D==6||D==0){A='Weekend'}W=B+':'+X+U;if(y&&y!=Y){return'Data Not Available'}else{if(t){if(t=='h'){return W}if(t=='d'){return Z}if(t=='w'){return A}}else{return Z+','+W}}}");
// ver. 2.3
s.getQueryParam=new Function("p","d","u","var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.location);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p.length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i==p.length?i:i+1)}return v");
s.p_gpv=new Function("k","u","var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf=new Function("t","k","if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'True':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s.epa(v)}return ''");
// ver. 2.1 (Success,Error,Abandonment)
s.setupFormAnalysis=new Function("var s=this;if(!s.fa){s.fa=new Object;var f=s.fa;f.ol=s.wd.onload;s.wd.onload=s.faol;f.uc=s.useCommerce;f.vu=s.varUsed;f.vl=f.uc?s.eventList:'';f.tfl=s.trackFormList;f.fl=s.formList;f.va=new Array('','','','')}");s.sendFormEvent=new Function("t","pn","fn","en","var s=this,f=s.fa;t=t=='s'?t:'e';f.va[0]=pn;f.va[1]=fn;f.va[3]=t=='s'?'Success':en;s.fasl(t);f.va[1]='';f.va[3]='';");
s.faol=new Function("e","var s=s_c_il[" + s._in +"],f=s.fa,r=true,fo,fn,i,en,t,tf;if(!e)e=s.wd.event;f.os=new Array;if(f.ol)r=f.ol(e);if(s.d.forms&&s.d.forms.length>0){for(i=s.d.forms.length-1;i>=0;i--){fo=s.d.forms[i];fn=fo.name;tf=f.tfl&&s.pt(f.fl,',','ee',fn)||!f.tfl&&!s.pt(f.fl,',','ee',fn);if(tf){f.os[fn]=fo.onsubmit;fo.onsubmit=s.faos;f.va[1]=fn;f.va[3]='No Data Entered';for(en=0;en<fo.elements.length;en++){el=fo.elements[en];t=el.type;if(t&&t.toUpperCase){t=t.toUpperCase();var md=el.onmousedown,kd=el.onkeydown,omd=md?md.toString():'',okd=kd?kd.toString():'';if(omd.indexOf('.fam(')<0&&okd.indexOf('.fam(')<0){el.s_famd=md;el.s_fakd=kd;el.onmousedown=s.fam;el.onkeydown=s.fam}}}}}f.ul=s.wd.onunload;s.wd.onunload=s.fasl;}return r;");
// FvR - replaced s.tl(faLink,'o','Form Analysis') with if(!/No Data Entered/i.test(a[3]))s.tl(faLink,'o','Form Analysis')
s.faos=new Function("e","var s=s_c_il[" + s._in +"],f=s.fa,su;if(!e)e=s.wd.event;if(f.vu){s[f.vu]='';f.va[1]='';f.va[3]='';}su=f.os[this.name];return su?su(e):true;");s.fasl=new Function("e","var s=s_c_il[" + s._in +"],f=s.fa,a=f.va,l=s.wd.location,ip=s.trackPageName,p=s.pageName;if(a[1]!=''&&a[3]!=''){a[0]=!p&&ip?l.host+l.pathname:a[0]?a[0]:p;if(!f.uc&&a[3]!='No Data Entered'){if(e=='e')a[2]='Error';else if(e=='s')a[2]='Success';else a[2]='Abandon'}else a[2]='';var tp=ip?a[0]+':':'',t3=e!='s'?':('+a[3]+')':'',ym=!f.uc&&a[3]!='No Data Entered'?tp+a[1]+':'+a[2]+t3:tp+a[1]+t3,ltv=s.linkTrackVars,lte=s.linkTrackEvents,up=s.usePlugins;if(f.uc){s.linkTrackVars=ltv=='None'?f.vu+',events':ltv+',events,'+f.vu;s.linkTrackEvents=lte=='None'?f.vl:lte+','+f.vl;f.cnt=-1;if(e=='e')s.events=s.pt(f.vl,',','fage',2);else if(e=='s')s.events=s.pt(f.vl,',','fage',1);else s.events=s.pt(f.vl,',','fage',0)}else{s.linkTrackVars=ltv=='None'?f.vu:ltv+','+f.vu}s[f.vu]=ym;s.usePlugins=false;var faLink=new Object();faLink.href='#';if(!/No Data Entered/i.test(a[3]))s.tl(faLink,'o','Form Analysis');s[f.vu]='';s.usePlugins=up}return f.ul&&e!='e'&&e!='s'?f.ul(e):true;");
s.fam=new Function("e","var s=s_c_il[" + s._in +"],f=s.fa;if(!e) e=s.wd.event;var o=s.trackLastChanged,et=e.type.toUpperCase(),t=this.type.toUpperCase(),fn=this.form.name,en=this.name,sc=false;if(document.layers){kp=e.which;b=e.which}else{kp=e.keyCode;b=e.button}et=et=='MOUSEDOWN'?1:et=='KEYDOWN'?2:et;if(f.ce!=en||f.cf!=fn){if(et==1&&b!=2&&'BUTTONSUBMITRESETIMAGERADIOCHECKBOXSELECT-ONEFILE'.indexOf(t)>-1){f.va[1]=fn;f.va[3]=en;sc=true}else if(et==1&&b==2&&'TEXTAREAPASSWORDFILE'.indexOf(t)>-1){f.va[1]=fn;f.va[3]=en;sc=true}else if(et==2&&kp!=9&&kp!=13){f.va[1]=fn;f.va[3]=en;sc=true}if(sc){nface=en;nfacf=fn}}if(et==1&&this.s_famd)return this.s_famd(e);if(et==2&&this.s_fakd)return this.s_fakd(e);");s.ee=new Function("e","n","return n&&n.toLowerCase?e.toLowerCase()==n.toLowerCase():false;");
s.fage=new Function("e","a","var s=this,f=s.fa,x=f.cnt;x=x?x+1:1;f.cnt=x;return x==a?e:'';");
// ver. 0.4 - return the time from start to stop
s.getTimeToComplete=new Function("v","cn","e","var s=this,d=new Date,x=d,k;if(!s.ttcr){e=e?e:0;if(v=='start'||v=='stop')s.ttcr=1;x.setTime(x.getTime()+e*86400000);if(v=='start'){s.c_w(cn,d.getTime(),e?x:0);return '';}if(v=='stop'){k=s.c_r(cn);if(!s.c_w(cn,'',d)||!k)return '';v=(d.getTime()-k)/1000;var td=86400,th=3600,tm=60,r=5,u,un;if(v>td){u=td;un='days';}else if(v>th){u=th;un='hours';}else if(v>tm){r=2;u=tm;un='minutes';}else{r=.2;u=1;un='seconds';}v=v*r/u;return (Math.round(v)/r)+' '+un;}}return '';");
//temporary fix to get the prop10 report to populate while Omniture supplies us with updated plugin (Loryn Sep 2010)
s.getTimeToComplete2 = new Function("v", "cn", "e", "var s=this,d=new Date,x=d,k;if(!s.ttcr2){e=e?e:0;if(v=='start'||v=='stop')s.ttcr2=1;x.setTime(x.getTime()+e*86400000);if(v=='start'){s.c_w(cn,d.getTime(),e?x:0);return '';}if(v=='stop'){k=s.c_r(cn);if(!s.c_w(cn,'',d)||!k)return '';v=(d.getTime()-k)/1000;var td=86400,th=3600,tm=60,r=5,u,un;if(v>td){u=td;un='days';}else if(v>th){u=th;un='hours';}else if(v>tm){r=2;u=tm;un='minutes';}else{r=.2;u=1;un='seconds';}v=v*r/u;return (Math.round(v)/r)+' '+un;}}return '';");
// ver. 2.2 - Tracking External Traffic
s.channelManager=new Function("a","b","c","V","var s=this,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,W,X,Y;g=s.referrer?s.referrer:document.referrer;g=g.toLowerCase();if(!g){h='1'}i=g.indexOf('?')>-1?g.indexOf('?'):g.length;j=g.substring(0,i);k=s.linkInternalFilters.toLowerCase();k=s.split(k,',');l=k.length;for(m=0;m<l;m++){n=j.indexOf(k[m])==-1?'':g;if(n)o=n}if(!o&&!h){p=g;q=g.indexOf('//')>-1?g.indexOf('//')+2:0;r=g.indexOf('/',q)>-1?g.indexOf('/',q):i;t=g.substring(q,r);t=t.toLowerCase();u=t;P='Referrers';v=s.seList+'>'+s._extraSearchEngines;if(V=='1'){j=s.repl(j,'oogle','%');j=s.repl(j,'ahoo','^');g=s.repl(g,'as_q','*');}A=s.split(v,'>');B=A.length;for(C=0;C<B;C++){D=A[C];D=s.split(D,'|');E=s.split(D[0],',');F=E.length;for(G=0;G<F;G++){H=j.indexOf(E[G]);if(H>-1){I=s.split(D[1],',');J=I.length;for(K=0;K<J;K++){L=s.getQueryParam(I[K],'',g);if(L){L=L.toLowerCase();M=L;if(D[2]){u=D[2];N=D[2]}else{N=t}if(V=='1'){N=s.repl(N,'#',' - ');g=s.repl(g,'*','as_q');N=s.repl(N,'^','ahoo');N=s.repl(N,'%','oogle');}}}}}}}O=s.getQueryParam(a,b);if(O){u=O;if(M){P='Paid Search'}else{P='Paid Non-Search';}}if(!O&&M){u=N;P='Natural Search'}f=s._channelDomain;if(f){k=s.split(f,'>');l=k.length;for(m=0;m<l;m++){Q=s.split(k[m],'|');R=s.split(Q[1],',');S=R.length;for(T=0;T<S;T++){W=j.indexOf(R[T]);if(W>-1)P=Q[0]}}}d=s._channelParameter;if(d){k=s.split(d,'>');l=k.length;for(m=0;m<l;m++){Q=s.split(k[m],'|');R=s.split(Q[1],',');S=R.length;for(T=0;T<S;T++){U=s.getQueryParam(R[T]);if(U)P=Q[0]}}}e=s._channelPattern;if(e){k=s.split(e,'>');l=k.length;for(m=0;m<l;m++){Q=s.split(k[m],'|');R=s.split(Q[1],',');S=R.length;for(T=0;T<S;T++){X=O.indexOf(R[T]);if(X==0)P=Q[0]}}}if(h=='1'&&!O){u=P=t=p='Direct Load'}T=M+u+t;U=c?'c':'c_m';if(c!='0'){T=s.getValOnce(T,U,0);}if(T)M=M?M:'n/a';s._referrer=T&&p?p:'';s._referringDomain=T&&t?t:'';s._partner=T&&N?N:'';s._campaignID=T&&O?O:'';s._campaign=T&&u?u:'';s._keywords=T&&M?M:'';s._channel=T&&P?P:'';");
// Top 130
s.seList="altavista.co|q,r|AltaVista>aol.co.uk,search.aol.co.uk|query|AOL - United Kingdom>search.aol.com,search.aol.ca|query,q|AOL.com Search>ask.com,ask.co.uk|ask,q|Ask Jeeves>www.baidu.com|wd|Baidu>daum.net,search.daum.net|q|Daum>google.co,googlesyndication.com|q,as_q|Google>google.com.ar|q,as_q|Google - Argentina>google.com.au|q,as_q|Google - Australia>google.at|q,as_q|Google - Austria>google.com.bh|q,as_q|Google - Bahrain>google.com.bd|q,as_q|Google - Bangladesh>google.be|q,as_q|Google - Belgium>google.com.bo|q,as_q|Google - Bolivia>google.ba|q,as_q|Google - Bosnia-Hercegovina>google.com.br|q,as_q|Google - Brasil>google.bg|q,as_q|Google - Bulgaria>google.ca|q,as_q|Google - Canada>google.cl|q,as_q|Google - Chile>google.cn|q,as_q|Google - China>google.com.co|q,as_q|Google - Colombia>google.co.cr|q,as_q|Google - Costa Rica>google.hr|q,as_q|Google - Croatia>google.cz|q,as_q|Google - Czech Republic>google.dk|q,as_q|Google - Denmark>google.com.do|q,as_q|Google - Dominican Republic>google.com.ec|q,as_q|Google - Ecuador>google.com.eg|q,as_q|Google - Egypt>google.com.sv|q,as_q|Google - El Salvador>google.ee|q,as_q|Google - Estonia>google.fi|q,as_q|Google - Finland>google.fr|q,as_q|Google - France>google.de|q,as_q|Google - Germany>google.gr|q,as_q|Google - Greece>google.com.gt|q,as_q|Google - Guatemala>google.hn|q,as_q|Google - Honduras>google.com.hk|q,as_q|Google - Hong Kong>google.hu|q,as_q|Google - Hungary>google.co.in|q,as_q|Google - India>google.co.id|q,as_q|Google - Indonesia>google.ie|q,as_q|Google - Ireland>google.is|q,as_q|Google - Island>google.co.il|q,as_q|Google - Israel>google.it|q,as_q|Google - Italy>google.com.jm|q,as_q|Google - Jamaica>google.co.jp|q,as_q|Google - Japan>google.jo|q,as_q|Google - Jordan>google.co.ke|q,as_q|Google - Kenya>google.co.kr|q,as_q|Google - Korea>google.lv|q,as_q|Google - Latvia>google.lt|q,as_q|Google - Lithuania>google.com.my|q,as_q|Google - Malaysia>google.com.mt|q,as_q|Google - Malta>google.mu|q,as_q|Google - Mauritius>google.com.mx|q,as_q|Google - Mexico>google.co.ma|q,as_q|Google - Morocco>google.nl|q,as_q|Google - Netherlands>google.co.nz|q,as_q|Google - New Zealand>google.com.ni|q,as_q|Google - Nicaragua>google.com.ng|q,as_q|Google - Nigeria>google.no|q,as_q|Google - Norway>google.com.pk|q,as_q|Google - Pakistan>google.com.py|q,as_q|Google - Paraguay>google.com.pe|q,as_q|Google - Peru>google.com.ph|q,as_q|Google - Philippines>google.pl|q,as_q|Google - Poland>google.pt|q,as_q|Google - Portugal>google.com.pr|q,as_q|Google - Puerto Rico>google.com.qa|q,as_q|Google - Qatar>google.ro|q,as_q|Google - Romania>google.ru|q,as_q|Google - Russia>google.st|q,as_q|Google - Sao Tome and Principe>google.com.sa|q,as_q|Google - Saudi Arabia>google.com.sg|q,as_q|Google - Singapore>google.sk|q,as_q|Google - Slovakia>google.si|q,as_q|Google - Slovenia>google.co.za|q,as_q|Google - South Africa>google.es|q,as_q|Google - Spain>google.lk|q,as_q|Google - Sri Lanka>google.se|q,as_q|Google - Sweden>google.ch|q,as_q|Google - Switzerland>google.com.tw|q,as_q|Google - Taiwan>google.co.th|q,as_q|Google - Thailand>google.bs|q,as_q|Google - The Bahamas>google.tt|q,as_q|Google - Trinidad and Tobago>google.com.tr|q,as_q|Google - Turkey>google.com.ua|q,as_q|Google - Ukraine>google.ae|q,as_q|Google - United Arab Emirates>google.co.uk|q,as_q|Google - United Kingdom>google.com.uy|q,as_q|Google - Uruguay>google.co.ve|q,as_q|Google - Venezuela>google.com.vn|q,as_q|Google - Viet Nam>google.co.vi|q,as_q|Google - Virgin Islands>icqit.com|q|icq>bing.com|q|Microsoft Bing>myway.com|searchfor|MyWay.com>naver.com,search.naver.com|query|Naver>netscape.com|query,search|Netscape Search>reference.com|q|Reference.com>seznam|w|Seznam.cz>abcsok.no|q|Startsiden>tiscali.it|key|Tiscali>virgilio.it|qs|Virgilio>yahoo.com,search.yahoo.com|p|Yahoo!>ar.yahoo.com,ar.search.yahoo.com|p|Yahoo! - Argentina>au.yahoo.com,au.search.yahoo.com|p|Yahoo! - Australia>ca.yahoo.com,ca.search.yahoo.com|p|Yahoo! - Canada>fr.yahoo.com,fr.search.yahoo.com|p|Yahoo! - France>de.yahoo.com,de.search.yahoo.com|p|Yahoo! - Germany>hk.yahoo.com,hk.search.yahoo.com|p|Yahoo! - Hong Kong>in.yahoo.com,in.search.yahoo.com|p|Yahoo! - India>yahoo.co.jp,search.yahoo.co.jp|p,va|Yahoo! - Japan>kr.yahoo.com,kr.search.yahoo.com|p|Yahoo! - Korea>mx.yahoo.com,mx.search.yahoo.com|p|Yahoo! - Mexico>ph.yahoo.com,ph.search.yahoo.com|p|Yahoo! - Philippines>sg.yahoo.com,sg.search.yahoo.com|p|Yahoo! - Singapore>es.yahoo.com,es.search.yahoo.com|p|Yahoo! - Spain>telemundo.yahoo.com,espanol.search.yahoo.com|p|Yahoo! - Spanish (US : Telemundo)>tw.yahoo.com,tw.search.yahoo.com|p|Yahoo! - Taiwan>uk.yahoo.com,uk.search.yahoo.com|p|Yahoo! - UK and Ireland>yandex|text|Yandex.ru>search.cnn.com|query|CNN Web Search>search.earthlink.net|q|Earthlink Search>search.comcast.net|q|Comcast Search>search.rr.com|qs|RoadRunner Search>optimum.net|q|Optimum Search";
// Shared plugin functions
// ver. 1.0 - s.join(v,p)| v - Array | p - formatting parameters (front,back,delim,wrap)
s.join=new Function("v","p","var s=this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back:'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0;x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);else str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");
// ver. v1.5 - split a string (JS 1.0 compatible)
s.split=new Function("l","d","var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x++]=l.substring(0,i);l=l.substring(i+d.length);}return a");
function Set_Year(){var now=new Date();var year=now.getYear();if (year < 1900) year=year + 1900;return year;}
// ver. 1.1 - store unique event value
s.apl=new Function("L","v","d","u","var s=this,m=0;if(!L)L='';if(u){var i,n,a=s.split(L,d);for(i=0;i<a.length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCase()));}}if(!m)L=L?L+d+v:v;return L");
// ver 0.3 - read combined cookies
if (!s.__ccucr){s.c_rr=s.c_r;s.__ccucr=true;s.c_r=new Function("k","var s=this,d=new Date,v=s.c_rr(k),c=s.c_rr('s_pers'),i,m,e;if(v)return v;k=s.ape(k);i=c.indexOf(' '+k+'=');c=i<0?s.c_rr('s_sess'):c;i=c.indexOf(' '+k+'=');m=i<0?i:c.indexOf('|',i);e=i<0?i:c.indexOf(';',i);m=m>0?m:e;v=i<0?'':s.epa(c.substring(i+2+k.length,m<0?c.length:m));if(m>0&&m!=e)if(parseInt(c.substring(m+1,e<0?c.length:e))<d.getTime()){d.setTime(d.getTime()-60000);s.c_w(s.epa(k),'',d);v='';}return v;");}
// ver 0.3 - write combined cookies
if (!s.__ccucw){s.c_wr=s.c_w;s.__ccucw=true;s.c_w=new Function("k","v","e","this.new2=true;var s=this,d=new Date,ht=0,pn='s_pers',sn='s_sess',pc=0,sc=0,pv,sv,c,i,t;d.setTime(d.getTime()-60000);if(s.c_rr(k)) s.c_wr(k,'',d);k=s.ape(k);pv=s.c_rr(pn);i=pv.indexOf(' '+k+'=');if(i>-1){pv=pv.substring(0,i)+pv.substring(pv.indexOf(';',i)+1);pc=1;}sv=s.c_rr(sn);i=sv.indexOf(' '+k+'=');if(i>-1){sv=sv.substring(0,i)+sv.substring(sv.indexOf(';',i)+1);sc=1;}d=new Date;if(e){if(e.getTime()>d.getTime()){pv+=' '+k+'='+s.ape(v)+'|'+e.getTime()+';';pc=1;}}else{sv+=' '+k+'='+s.ape(v)+';';sc=1;}if(sc) s.c_wr(sn,sv,0);if(pc){t=pv;while(t&&t.indexOf(';')!=-1){var t1=parseInt(t.substring(t.indexOf('|')+1,t.indexOf(';')));t=t.substring(t.indexOf(';')+1);ht=ht<t1?t1:ht;}d.setTime(ht);s.c_wr(pn,pv,d);}return v==s.c_r(s.epa(k));");}

// WARNING: Don't change below
s.visitorNamespace='safeway';
s.trackingServer="stat.safeway.com";s.visitorMigrationServerSecure=s.trackingServerSecure="stats.safeway.com";
s.visitorMigrationKey="4B830FB6";s.visitorMigrationServer="2o7.net";s.dc=112;

// *** DO NOT ALTER ANYTHING BELOW THIS LINE ***
var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s.version='H.23.4';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(m,\"\\n\",\"\\\\n\"),\""
+"\\\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return y};s.fl=function(x,l){retur"
+"n x?(''+x).substring(0,l):x};s.co=function(o){if(!o)return o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.indexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for(var p=0;p"
+"<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;return 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',i,c=s.charSet,n,l,e,y='';c=c?c.toU"
+"pperCase():'';if(x){x=''+x;if(s.em==3)x=encodeURIComponent(x);else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h"
+".substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else x=escape(''+x);x=s.rep(x,'+','%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('"
+"%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x)"
+"{var s=this;if(x){x=s.rep(''+x,'+',' ');return s.em==3?decodeURIComponent(x):unescape(x)}return x};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substri"
+"ng(0,y);r=s[f](t,a);if(r)return r;z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a"
+"=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var"
+" s=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.si=function(){var s=this,i,k,v,c=s_gi+'var s=s_gi(\"'+s.oun+'\");s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=unde"
+"fined){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}c+=\"s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';"
+"s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?pa"
+"rseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.a"
+"pe(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd"
+"(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie"
+"=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s."
+"_in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if("
+"x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return "
+"r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfs"
+"oe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=thi"
+"s,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet"
+"('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r.t,r.u)}};s.flushBufferedRequests=fun"
+"ction(){};s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Obje"
+"ct,l,imn='s_i_'+(un),im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p"
+"=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/'+s.version+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(rs,2047)}if(s."
+"d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window."
+"s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im.s_l=0;im.onload"
+"=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;if(s.debugTrackin"
+"g){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;for(dln=0;dln<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im.src=rs;if((!ta||ta=='_self'||ta=='_top'||(s.wd.name&&ta==s.wd.na"
+"me))&&rs.indexOf('&pe=')>=0){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg=function(v){va"
+"r s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s=this;if(s.pg)s"
+".pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,l=0,q,a,b='',c='',t;if(x&&x.length>255){y=''+x;i=y.indexOf('?');if(i>0){q=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCase();j=0;if(h.su"
+"bstring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='https://')j+=8;i=h.indexOf(\"/\",j);if(i>0){h=h.substring(j,i);p=y.substring(i);y=y.substring(0,i);if(h.indexOf('google')>=0)l=',q,ie,start,s"
+"earch_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l=',p,ei,';if(l&&q){a=s.sp(q,'&');if(a&&a.length>1){for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',"
+"')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'+c;else c=''}i=253-(q.length-c.length)-y.length;x=y+(i>0?p.substring(0,i):'')+'?'+q}}}}return x};s.s2q=function(k,v,vf,vfp,f){var s=this,qs"
+"='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextData\")k=\"c\";if(v){for(sk in v) {if((!f||sk.substring(0,f.length)==f)&&v[sk]&&(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',')>=0)){nfm=0;if(nf"
+"l)for(nfn=0;nfn<nfl.length;nfn++)if(sk.substring(0,nfl[nfn].length)==nfl[nfn])nfm=1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk];if(f)sk=sk.substring(f.length);if(sk.length>0){nke=sk.indexOf('.');if(n"
+"ke>0){nk=sk.substring(0,nke);nf=(f?f:'')+nk+'.';if(!nfl)nfl=new Array;nfl[nfl.length]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(typeof(sv)=='boolean'){if(sv)sv='true';else sv='false'}if(sv){if(vfp=='ret"
+"rieveLightData'&&f.indexOf('.contextData.')<0){sp=sk.substring(0,4);ss=sk.substring(4);if(sk=='transactionID')sk='xact';else if(sk=='channel')sk='ch';else if(sk=='campaign')sk='v0';else if(s.num(ss"
+")){if(sp=='prop')sk='c'+ss;else if(sp=='eVar')sk='v'+ss;else if(sp=='list')sk='l'+ss;else if(sp=='hier'){sk='h'+ss;sv=sv.substring(0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}}if(qs!='')qs+='&.'+k"
+"}return qs};s.hav=function(){var s=this,qs='',l,fv='',fe='',mn,i,e;if(s.lightProfileID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv=','+fv+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType){fv=s.linkTrac"
+"kVars;fe=s.linkTrackEvents;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;if(fe){fe=','+f"
+"e+',';if(fv)fv+=',events,'}if (s.events2)e=(e?',':'')+s.events2}for(i=0;i<l.length;i++){var k=l[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&e){v=e;e=''}if("
+"v&&(!fv||fv.indexOf(k)>=0)&&k!='linkName'&&k!='linkType'){if(k=='timestamp')q='ts';else if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='pageURL'){q='g';v=s.fl(v,255)}"
+"else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigrationServerSecure)v=''}else i"
+"f(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em==2||s.em==3)v='UTF-8'}else i"
+"f(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode')q='cc';else if(k=='channel"
+"')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j';else if(k=='javaEnabled')q"
+"='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp';else if(k=='plugins')q='p';"
+"else if(k=='events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='events2')v='';else if(k=='contextData'){qs+=s.s2q('c',s[k],fv,k,0);v=''}else if(k=='lightProfileID')q='mtp';else if(k=='ligh"
+"tStoreForSeconds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncrementBy'){q='mti';if(!s.lightProfileID)v=''}else if(k=='retrieveLightProfiles')q='mtsr';else if(k=='deleteLightProfiles')q"
+"='mtsd';else if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2q('mts',s[k],fv,k,0);v=''}else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else "
+"if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('"
+"?');h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;"
+"return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&l"
+"ft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.substring(0,1)!='#'&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new Func"
+"tion('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=s.co(this);s.t();s.lnk=0;if(b)return this[b](e);return true');s.bc=new Function('e','var s=s_c_il['+s._in+'],f,tcf;if(s.d&&s.d.all&&"
+"s.d.all.cppXYctnr)return;s.eo=e.srcElement?e.srcElement:e.target;tcf=new Function(\"s\",\"var e;try{if(s.eo&&(s.eo.tagName||s.eo.parentElement||s.eo.parentNode))s.t()}catch(e){}\");tcf(s);s.eo=0');"
+"s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o."
+"protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot="
+"function(o){var t=o.tagName;if(o.tagUrn||(o.scopeName&&o.scopeName.toUpperCase()!='HTML'))return '';t=t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE')t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.ty"
+"pe&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t="
+"='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' ','');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o"
+".value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=function(t"
+",un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')>=0){if(u!=s.un&&s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return"
+" q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t"
+".indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this;s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='"
+"s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))s.sqq[s."
+"squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wd"
+"l=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\""
+"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)"
+"s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener)s.b.addEventListener('click',s.bc,false);else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=function(x){var s=this,v=s.visitorSampling,g=s.vis"
+"itorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}return 1};"
+"s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.substring(0,i),x=t.substring(i+1);if(s.pt(x,',','dy"
+"asmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.location.host;if"
+"(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};s.sa=function(un){var s=this;s.un=un;if(!s.oun"
+")s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m"
+"_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_i','_e','_d','_dl','s',"
+"'n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._i"
+"n]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]="
+"new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}"
+"m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x"
+");u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else i"
+"f(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadMod"
+"ule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))"
+"&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o"
+".l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f"
+"2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.o"
+"nreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;"
+"o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.voa=function(vo,r){var s=this,l=s.va_g,i,k,v,x;for(i=0;i<l.length;i++){"
+"k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"||k==\"retrieveLightData\")&&s[k])for(x in s[k])if(!v[x])v[x]=s[k][x];s[k]=v}}};s.vob=function(vo){var s=this,l=s.va_g,i,k;for(i=0;i<l.leng"
+"th;i++){k=l[i];vo[k]=s[k];if(!vo[k])vo['!'+k]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime"
+"()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if("
+"!vo)vo=new Object;s.vob(vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s.track=s.t=function(vo){var s=this,trk=1,tm=new Date,sed=Math&"
+"&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.ge"
+"tHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',vb=new Object;s.gl(s.vl_g);s.uns();s.m_ll();if(!s.td){var tl=tf"
+"s.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s"
+".isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if"
+"(i&&i.next)j='1.7'}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerH"
+"eight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElement.offsetWidth;bh=s.d.documentElement.offsetHeight;if(!s.ismac&"
+"&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}return hp');hp=tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b."
+"addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;p"
+"n++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.vob(vb)"
+";s.voa(vo)}if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer"
+"=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk;if(!o)return '';var p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.paren"
+"tElement?o.parentElement:o.parentNode;if(!o)return '';t=s.ot(o);n=s.oid(o);x=o.s_oidt}oc=o.onclick?''+o.onclick:'';if((oc.indexOf(\"s_gs(\")>=0&&oc.indexOf(\".s_oc(\")<0)||oc.indexOf(\".tl(\")>=0)r"
+"eturn ''}if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l))q+='&pe=lnk_'+(t=='d'||"
+"t=='e'?s.ape(t):'o')+(h?'&pev1='+s.ape(h):'')+(l?'&pev2='+s.ape(l):'');else trk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(s.gg('objectID')){n=s.gg('objectID');x=1"
+";i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}if(!trk&&!qs)return '';s.sampled=s.vs(sed);if(trk){if(s"
+".sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,ta);qs='';s.m_m('t');if(s.p_r)s.p_r();s.referrer=s.lightProfileID=s.retrieveLightProfiles=s.deleteLightProfiles=''}s.sq(qs"
+");}else{s.dl(vo);}if(vo)s.voa(vb,1);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';return code};"
+"s.trackLink=s.tl=function(o,t,n,vo){var s=this;s.lnk=s.co(o);s.linkType=t;s.linkName=n;s.t(vo)};s.trackLight=function(p,ss,i,vo){var s=this;s.lightProfileID=p;s.lightStoreForSeconds=ss;s.lightIncre"
+"mentBy=i;s.t(vo)};s.jsLoaded=function(){var s=this,x;if(s.lmq)for(i=0;i<s.lmq.length;i++){x=s.lmq[i];s.loadModule(x.n,x.u,x.d)}if(s.onLoad)s.onLoad(s);if(s.tq)for(i=0;i<s.tq.length;i++)s.t(s.tq[i])"
+"};s.wd=window;s.ssl=(s.wd.location.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navi"
+"gator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='"
+"Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substrin"
+"g(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(St"
+"ring.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.sa(un);s.vl_l='dynamicVariablePrefix,visitorID,vmk,visitorMigrationKey,visitorMigrationServer,vis"
+"itorMigrationServerSecure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,currencyCode';s.va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='charSet,visitorNamespace,co"
+"okieDomainPeriods,cookieLifetime,contextData,lightProfileID,lightStoreForSeconds,lightIncrementBy';s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,z"
+"ip,events,events2,products,linkName,linkType,contextData,lightProfileID,lightStoreForSeconds,lightIncrementBy,retrieveLightProfiles,deleteLightProfiles,retrieveLightData';var n;for(n=1;n<=75;n++){s"
+".vl_t+=',prop'+n+',eVar'+n;s.vl_m+=',prop'+n+',eVar'+n}for(n=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<=3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,color"
+"Depth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerS"
+"ecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,"
+"trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,lightTrackVars,_1_referrer,un';"
+"s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);s.contextData=new Object;s.retrieveLightData=new Object;if(!ss)s.wds();if(pg){s.wd.s_co=function(o){s_gi(\"_\",1,1).co(o)};s.wd.s_gs=function(un){s_gi(u"
+"n,1,1).t()};s.wd.s_dc=function(un){s_gi(un,1).t()}}",
w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,x,s;if(un){un=un.toLowerCase();if(l)for(i=0;i<l.length;i++){s=l[i];x=s._c;if((!x||x=='s_c'||x=='s_l')&&(s.oun==un||(s.fs&&s.sa&&s.fs(s.oun,un)))){if(s.sa)s.sa(un);if(x=='s_c')return s}else s=0}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
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
c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a<5||v.indexOf('Opera')>=0||u.indexOf('Opera')>=0)c=s_ft(c);if(!s){s=new Object;if(!w.s_c_in){w.s_c_il=new Array;w.s_c_in=0}s._il=w.s_c_il;s._in=w.s_c_in;s._il[s._in]=s;w.s_c_in++;}s._c='s_c';(new Function("s","un","pg","ss",c))(s,un,pg,ss);return s}

// Detect JFU login details
onerror=sc_logGlobalErr;