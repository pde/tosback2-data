// TII Ads - Version 1.4.1 - 2013.03.28

function TiiAdConfig(sitename) {
	this.sitename	= sitename;
	this.cmSitename	= sitename;

	this.popups		= true;
	this.useBehaviorTracking	= false;
	
	this.setSitename	= TiiAdConfigSetSitename;
	this.setCmSitename	= TiiAdConfigSetCmSitename;
	this.setPopups		= TiiAdConfigSetPopups;
	this.setBehaviorTracking	= TiiAdConfigSetBehaviorTracking;

	this.useRevSciTracking = false;
	this.setRevSciTracking = TiiAdConfigSetRevSciTracking;

	this.useTacodaTracking = false;
	this.setTacodaTracking = TiiAdConfigSetTacodaTracking;

	this.convertHyphens = false
	this.stripNonAlphaNumeric = false
	this.setConvertHyphens = TiiAdConfigSetConvertHyphens;
	this.setStripNonAlphaNumeric = TiiAdConfigStripNonAlphaNumeric;
}

function _quantgc(n) {
	var c=document.cookie;if(!c)return '';
	var i=c.indexOf(n+"=");if(-1==i)return '';
	var len=i+n.length+1;
	var end=c.indexOf(";", len);
	return c.substring(len,end<0?c.length:end);
}

function TiiAdGetQuantcastSegments() {
	var _qsegs = _quantgc('__qseg').split('|');
	var segLen = _qsegs.length;
	var segArray = new Array(); var segs = new Array();
	segs[0] = "";
	for (var i = 0; i < segLen && i < 10; i++ )
	{
		segArray = _qsegs[i].split("_");
		if (segArray.length>1){segs[i]=segArray[1];}
	}
	return segs;	
}

function TiiAdConfigSetTacodaTracking(value) {
	this.useTacodaTracking = value;
}

function TiiAdConfigSetRevSciTracking(value) {
	this.useRevSciTracking = value;
}

function TiiAdConfigSetConvertHyphens(value) {
	this.convertHyphens = value;
}

function TiiAdConfigStripNonAlphaNumeric(value) {
	this.stripNonAlphaNumeric = value;
}

function TiiAdConfigSetSitename(value) {
	this.sitename = value;
}

function TiiAdConfigSetCmSitename(value) {
	this.cmSitename = value;
}

function TiiAdConfigSetPopups(value) {
	this.popups = value;
}

function TiiAdConfigSetBehaviorTracking(value) {
	this.useBehaviorTracking = value;
}

function TiiAdFactory() {
	// Detect if first argument is a string or an array
	var first = arguments[0];

	if (typeof(first) == "string") {
		this.sitename		= first;
		this.cmSitename		= first;

	} else if (typeof(first) == "object") {
		this.config		= first;
		this.sitename		= first.sitename;
		this.cmSitename		= first.cmSitename;
	}

	if (TiiAd_isSecure()) {
		this.adServer		= "https://ad.doubleclick.net/";
	} else {
		this.adServer		= "http://ad.doubleclick.net/";
	}
	
	this.randomNumber	= TiiAdsGetRandomNumber();
	this.tileCounter	= 1;
	this.params			= new Array();
	this.zone			= "";
	this.dcopt			= false;
	this.behaviorTracked = false;

	if (arguments.length == 2) {
		this.zone = arguments[1];
	}
	
	this.createAd		= TiiAdFactoryCreateAd;
	this.getAd		= TiiAdFactoryGetAd;
	this.getCmAd		= TiiAdFactoryGetCmAd;
	this.getMultiCmAd	= TiiAdFactoryGetMultiCmAd;
	this.getMultiAd		= TiiAdFactoryGetMultiAd;
	this.getTransitionalAd	= TiiAdFactoryGetTransitionalAd;
	this.setArticleId	= TiiAdFactorySetArticleId;
	this.setChannel		= TiiAdFactorySetChannel;
	this.setChannelPage	= TiiAdFactorySetChannelPage;
	this.setContentPage	= TiiAdFactorySetContentPage;
	this.setContentType	= TiiAdFactorySetContentType;
	this.setPackageId	= TiiAdFactorySetPackageId;
	this.setParam		= TiiAdFactorySetParam;
	this.setSubchannel	= TiiAdFactorySetSubchannel;
	this.setZone		= TiiAdFactorySetZone;
	this.trackBehaviour	= TiiAdTrackBehavior;
	
	if (this.config.useBehaviorTracking || this.config.useRevSciTracking) {
		var revSciSegments = TiiAdGetRevSciSegments();
		this.setParam("rsseg", revSciSegments)
	}
	
	var quantSegs = TiiAdGetQuantcastSegments();
	this.setParam("qc", quantSegs);
	
	if (this.config.useTacodaTracking) {
		var tacodaSegments = TiiAdGetTacodaSegments();
		this.setParam("tcseg", tacodaSegments)
	}
}
function TiiAdTrackRevSci() {
	if (typeof(DM_tag) == "function" && typeof(s_time) == "object") {
		rsCategory = s_time.channel + " > " + s_time.prop16 + " > " + s_time.prop11;
		DM_cat(rsCategory);
		DM_addEncToLoc("referrer", document.referrer.split("/")[2]);
		DM_tag();
	}
	TiiAdQuantBlueKaiMindsetImpl();
	TiiAdWriteComScoreTag();
}

function TiiAdWriteComScoreTag() {
	adTag = '<scr' + 'ipt type="text/javascript" src="http://b.scorecardresearch.com/beacon.js?c1=2&c2=6035728"></scr' + 'ipt>';
	document.write(adTag);	
}
function TiiRefreshComScoreTag() {
	if (typeof(COMSCORE) == "object") {
		url = (arguments.length == 1 ? arguments[0] : document.location);
		COMSCORE.beacon({
			c1:2,
			c2:6035728,
			c4: url
		});
	}	
}
function TiiAdQuantBlueKaiMindsetImpl() {
	document.write('<scr'+'ipt src="http://pixel.quantserve.com/seg/p-5dyPa639IrgIw.js;fpa='+_quantgc('__qca')+';r='+Math.ceil(new Date().getTime()/600000)+'" type="text/javascript"></scr'+'ipt>');
        // BlueKai Beacon 03.14.2013
        if (bk.enabled) {
            bk.bkFireBeacon();
        }
        //CsBeacon
        if (cs.enabled) {
            cs.csFireBeacon();
        }
}
function TiiAdFactorySetParam(key, value) {
	if (typeof(value) == "object") {
		this.params[key] = value;
	} else {
		if (value.toString() != "") {
			this.params[key] = value;
		}
	}
}
function TiiAdFactoryCreateAd() {
	var width, height, zone, ad;

	if (arguments.length == 2) {
		width = arguments[0];
		height = arguments[1];

	} else {
		// Assume 3 arguments
		width = arguments[0];
		height = arguments[1];
		zone = arguments[2];

	}

	ad = new TiiAd(this, width, height, this.tileCounter);

	if (null != zone) {
		ad.setZone(zone);
	}

	// Copy Factory params to this specific ad
	for (var key in this.params) {
		ad.setParam(key, this.params[key]);	
	}

	ad.setParam("sz", width + "x" + height);

	var paths = window.location.pathname.split("/");
	paths = paths.slice(1, paths.length - 1);
	ad.setParam("path", paths);
	
	ad.setParam("dcove", "d");

	if (TiiAdsIsTestMode()) {
		var testValue = TiiAdsParseQueryString("testads");
		ad.setParam("test", (isNaN(testValue) ? 1 : testValue));
	}

	if (this.config.useBehaviorTracking && this.behaviorTracked == false) {
		this.trackBehaviour();
	}

	this.tileCounter++;

	return ad;
}

function TiiAdFactoryGetAd() {
	var width, height, zone, ad;
	
	if (arguments.length == 2) {
		width = arguments[0];
		height = arguments[1];

		ad = this.createAd(width, height);	
	
	} else {
		width = arguments[0];
		height = arguments[1];
		zone = arguments[2];
	
		ad = this.createAd(width, height, zone);
	}

	if (this.dcopt == false) {
		ad.setParam("dcopt", "ist");
		this.dcopt = true;
	}

	return ad;
}

function TiiAdFactoryGetCmAd(width, height, position, type) {
	ad = this.createAd(width, height);
	ad.setParam("cmpos", position);
	ad.setParam("cmtyp", type);
	ad.sitename = this.cmSitename;

	return ad;
}

function TiiAdFactoryGetMultiCmAd(sizes, position, type) {
	var width = sizes[0].split("x")[0];
	var height = sizes[0].split("x")[1];
	var ad = this.getCmAd(width, height, position, type);
	var sizeValue = sizes.join(",");
	ad.setParam("sz", sizeValue);

	return ad;	
}

function TiiAdFactoryGetTransitionalAd() {
	ad = this.getAd(0,0);
	return ad;
}

function TiiAdFactoryGetMultiAd(sizes) {
	var width = sizes[0].split("x")[0];
	var height = sizes[0].split("x")[1];
	var ad = this.getAd(width, height);
	var sizeValue = sizes.join(",");
	ad.setParam("sz", sizeValue);
	
	return ad;
}

function TiiAdFactorySetArticleId(articleId) {
	this.setParam("aid", articleId);
}

function TiiAdFactorySetChannel(channel) {
	this.setParam("ch", channel);
}

function TiiAdFactorySetPackageId(packageId) {
	this.setParam("pid", packageId);
}

function TiiAdFactorySetSubchannel(subchannel) {
	this.setParam("sch", subchannel);
}

function TiiAdFactorySetContentPage() {
	this.setParam("ptype", "content");
}

function TiiAdFactorySetChannelPage() {
	this.setParam("ptype", "channel");
}

function TiiAdFactorySetContentType(ctype) {
	this.setParam("ctype", ctype);
}

function TiiAdFactorySetZone(zone) {
	this.zone = zone;
}

function TiiAd(factory, width, height, tileNumber) {
	this.tileNumber		= tileNumber;
	this.width		= width;
	this.height		= height;
	this.params		= new Array();

	// Methods
	this.setParam		= TiiAdFactorySetParam;
	this.setMagicNumber	= TiiAdSetMagicNumber;
	this.setPosition	= TiiAdSetPosition;
	this.setZone		= TiiAdSetZone;
	this.write			= TiiAdWrite;

	// Private Methods
	this._formatParams	= TiiAd_formatParams;
	this._getAdParams	= TiiAd_getAdParams;
	this._getAdTag		= TiiAd_getAdTag;
	this._getAdUrl		= TiiAd_getAdUrl;
	this._getImageUrl	= TiiAd_getImageUrl;
	this._getClickUrl	= TiiAd_getClickUrl;
	this._getDebugHtml	= TiiAd_getDebugHtml;
	this._getSecureAdTag	= TiiAd_getSecureAdTag;
	this._cleanValue = TiiAd_cleanValue;
	
	// Copy factory settings
	this.randomNumber	= factory.randomNumber;
	this.adServer		= factory.adServer;
	this.tileNumber		= factory.tileCounter;
	this.zone		= factory.zone;
	this.sitename		= factory.sitename;
	this.config		= factory.config;
}

function TiiAdSetMagicNumber(mn) {
	this.setParam("mn", mn);
}

function TiiAdSetPosition(pos) {
	this.setParam("pos", pos);
}

function TiiAdSetZone(zone) {
	this.zone = zone;
}

function TiiAdWrite() {
	if (TiiAdsIsDebugMode()) {
		document.write(this._getDebugHtml() + "<br/>");
	}
	
	document.write(this._getAdTag());
}

function TiiAd_cleanValue(value) {
	if (typeof(value) == "string") {
		if (this.config.convertHyphens) {
			value = value.replace(/-/ig, "_");
		}
		
		if (this.config.stripNonAlphaNumeric) {
			value = value.replace(/[^\w\s]/ig, "");
		}
	}
	return value;
}

function TiiAd_formatParams() {
	var adParams = "";
	for (var key in this.params) {
		var value = this.params[key];
		
		if (typeof(value) == "function") {
			continue;
		}

		if (typeof(value) == "string" || typeof(value) == "number") {
			adParams += ";" + key + "=" + escape(this._cleanValue(value)).toLowerCase();
		} else {
			for (var i = 0; i < value.length; i++) {
				if (value[i] != "") {
					adParams += ";" + key + "=" + escape(this._cleanValue(value[i])).toLowerCase();
				}
			}
		}
	}
	
	return adParams;
}

function TiiAd_getAdParams() {
	var adParams	= this._formatParams();
	var tileParam	= ";tile=" + this.tileNumber;

	var secureParam = "";
	if (TiiAd_isSecure()) {
		secureParam = ";sec=1";
	}

	var puParam = "";
	if (!this.config.popups) {
		puParam = ";pu=0";
	}

	var ordParam	= ";ord=" + this.randomNumber;
	var rhost	= document.referrer.split("/")[2];
	var rhostParam	= "";
	if (typeof(rhost) != "undefined") rhostParam	= ";rhost=" + rhost;
	var pageParam	= ";pgurl=1";
	
	return this.sitename + "/" + this.zone.toLowerCase() + adParams + pageParam + rhostParam + tileParam + puParam + secureParam + ordParam + "?";
}

function TiiAd_getAdTag() {
	var adTag;
	adTag = '<scr' + 'ipt type="text/javascript" src="' + this._getAdUrl() + '"></scr' + 'ipt>';
	
	return adTag;
}

function TiiAd_getSecureAdTag() {
	return '<a href="' + this._getClickUrl() + '" target="_blank"><img src="' + this._getImageUrl() + '" width="' + this.width + '" height="' + this.height + '" border="0" /></a>';
}

function TiiAd_getAdUrl() {
	return this.adServer + (this.params['pfadx'] ? "pfadx" : "adj") + "/" + this._getAdParams();
}

function TiiAd_getImageUrl() {
	return this.adServer + "ad/" + this._getAdParams();
}

function TiiAd_getClickUrl() {
	return this.adServer + "jump/" + this._getAdParams();
}

function TiiAd_getDebugHtml() {
	var output = '<input style="font-family: courier new; font-size: small; width:' + this.width + 'px; margin: 0; padding: 0" value="' + this._getAdUrl() + '"/>';

	return output;
}

// Support Functions
function TiiAdsParseQueryString(sParam) {
	var sQueryString = window.location.search;

	
	
	if (!sQueryString) {
        	
		return;
    	
	} else {
		
		sQueryString = decodeURI(sQueryString.substring(1));
	
	}

	
	
	var aPairs = sQueryString.split("&");
	var aParams = new Array();
	var aKeyValue = new Array();
	
	for (var i = 0; i < aPairs.length; i++) {
		aKeyValue = aPairs[i].split("=");
		if (aKeyValue.length>1){aParams[aKeyValue[0]]=aKeyValue[1];}
	
	}
	return aParams[sParam];
}

function TiiAdsIsDebugMode() {
	return window.location.search.indexOf("debugads") >= 0;
}
function TiiAdsIsTestMode() {
	return window.location.search.indexOf("testads") >= 0;
}
function TiiAdsGetRandomNumber() {
	return Math.ceil(1+1E12*Math.random());
}
function TiiAd_isSecure() {
	return (document.location.protocol == "https:");
}
function TiiAdsSetCookie(sName, sValue, sExpires, sPath, sDomain, bSecure)
{
 	var sCookieText =	escape(sName) + '=' + escape(sValue);
	sCookieText +=		(sExpires ? '; EXPIRES=' + sExpires.toGMTString() : '');
	sCookieText +=		(sPath ? '; PATH=' + sPath : '');
	sCookieText +=		(sDomain ? '; DOMAIN=' + sDomain : '');
	sCookieText +=		(bSecure ? '; SECURE' : '');
	
	document.cookie = sCookieText;
}

// Behavior Targeting

function TiiAdTrackBehavior() {
	if (typeof(DM_tag) == "function" && typeof(s_time) == "object") {
		rsCategory = s_time.channel + " > " + s_time.prop16 + " > " + s_time.prop11;
		DM_cat(rsCategory);
		DM_tag();		
		this.behaviorTracked = true;
	}
}

function TiiAdGetTacodaSegments() {
	
	var tcd_segs = [];
	var segs_beg = document.cookie.indexOf('AxData=');
	if (segs_beg >= 0) {
		segs_beg = document.cookie.indexOf('=',segs_beg)+1;

		if (segs_beg > 0){
			var segs_end = document.cookie.indexOf(';',segs_beg);
			if (segs_end == -1) segs_end=document.cookie.length;
			tcd_segs=document.cookie.substring(segs_beg,segs_end);
                        if(tcd_segs.length <=0 ) {
                                var retVal = new Array(); // Will return empty value if there is no cookie
                                return retVal;
                        }

			//tcd_segs = "1#50977|51051|55210"; @value for testing purpose 

			tcd_segs = tcd_segs.split("#");
			if(tcd_segs[1].indexOf("|") > 0) {
				tcd_segs = tcd_segs[1].split("|");	
			} else {
				tcd_segs = tcd_segs[1];	
				return tcd_segs;
			}
			var segLen = "", segArr = new Array()
			segLen = tcd_segs.length;
			var segs = new Array();
			for (var i = 0; i < segLen; i++){
    				segs[i] = tcd_segs[i];
    			}
			return segs;
		} 
	} 
	
	var retVal = new Array(); // Will return empty value if there is no cookie
	return retVal;
}

function TiiAdGetRevSciSegments() {
	var rsi_segs = [];
	var segs_beg = document.cookie.indexOf('rsi_segs=');
	if (segs_beg >= 0) {
		segs_beg = document.cookie.indexOf('=',segs_beg)+1;
		if (segs_beg > 0){
			var segs_end = document.cookie.indexOf(';',segs_beg);
			if (segs_end == -1) segs_end=document.cookie.length;
			rsi_segs=document.cookie.substring(segs_beg,segs_end).split('|');
		}
	}

	var segLen = 10
	var segQS = "", segArr = new Array()
	
	if (rsi_segs.length < segLen){
		segLen = rsi_segs.length
	}

	var segs = new Array();
	for (var i = 0; i < segLen; i++){
		segArr = rsi_segs[i].split("_")
		if (segArr.length > 1) {
    		segs[i] = segArr[1];
    		segQS += ("rsi" + "=" + segArr[1] + ";")
    	}
	}
	
	return segs;
}

function TiiAdsGetVideoTestParam() {
	if (TiiAdsIsTestMode()) {
		return ";test=1"
	}
	return ""
}

// Redirect Functions

function tiiAdSetType() {}
function tiiAdSetTarget() {}
function tiiHtmlAdWH(mn, width, height) {
	adFactory.getAd(width, height).write();
}

 /* 
 // BlueKai Implementation 03.14.2013
 */
 
    var TIICONSTANTS = {
        'bk_allow_deny_mode': 'allow',
        'bk_enabled_root_domains': 'people.com,ew.com,peoplestylewatch.com,celebritybabies.com,peopleenespanol.com,essence.com,ew.com,popwatch.ew.com,instyle.com,thisoldhouse.com,cookinglight.com,coastalliving.com,myhomeideas.com,realsimple.com,southernliving.com,sunset.com,time.com,timeforkids.com,sportsillustrated.cnn.com,sikids.com,fannation.com,golf.com,life.com',
        'bk_disabled_root_domains': 'foodandwine.com,travelandleisure.com,departures.com,executivetravelmagazine.com,allyou.com,health.com,myrecipes.com',
        'bk_id': '13731',
        'bk_pixel_limit': '6',
        'bk_keys': 'aid, ch, ctype, path, oid, ptype, sch, rhost',
        'cs_allow_deny_mode': 'allow',
        'cs_c2_id': '15798428',
        'cs_test_mode': '',
        'cs_enabled_root_domains': 'people.com,ew.com,peoplestylewatch.com,celebritybabies.com,peopleenespanol.com,essence.com,ew.com,popwatch.ew.com,instyle.com,health.com,thisoldhouse.com,allyou.com,cookinglight.com,coastalliving.com,myhomeideas.com,myrecipes.com,realsimple.com,southernliving.com,sunset.com,time.com,timeforkids.com,sportsillustrated.cnn.com,sikids.com,fannation.com,golf.com,life.com',
        'cs_disabled_root_domains': 'foodandwine.com,travelandleisure.com,departures.com,executivetravelmagazine.com'
     };
    function TiiBkBeacon() {
        this.zone = "";
        this.bkFireBeacon = TiiBkFireBeacon;
        this.enabled = 0;
    }
    function TiiBkFireBeacon() {

        if (document.referrer == "") {
            bk_addPageCtx("ref","n");
        } else {
	    bk_addPageCtx("ref", document.referrer.toString().substring(0,250));
	}
        for (var key in tgxDao.params) {
                    if (TIICONSTANTS.bk_keys.indexOf(key) >= 0) {bk_addPageCtx('"'+key+'"','"' + tgxDao.params[key] + '"');}
        }
        if (typeof(s_time) != 'undefined') {
            bk_addPageCtx("channel", (typeof(s_time.channel)!='undefined')?s_time.channel:'');
            bk_addPageCtx("p16", (typeof(s_time.prop16)!='undefined')?s_time.prop16:'');
            bk_addPageCtx("p11", (typeof(s_time.prop11)!='undefined')?s_time.prop11:'');
            bk_addPageCtx("e23", (typeof(s_time.eVar23)!='undefined')?s_time.eVar23:'');
            bk_addPageCtx("p12", (typeof(s_time.prop12)!='undefined')?s_time.prop12:'');
            bk_addPageCtx("p15", (typeof(s_time.prop15)!='undefined')?s_time.prop15:'');
            bk_addPageCtx("p20", (typeof(s_time.prop20)!='undefined')?s_time.prop20:'');
            bk_addPageCtx("p5", (typeof(s_time.prop5)!='undefined')?s_time.prop5:'');
            bk_addPageCtx("p7", (typeof(s_time.prop7)!='undefined')?s_time.prop7:'');
            bk_addPageCtx("e30", (typeof(s_time.eVar30)!='undefined')?s_time.eVar30:'');
            bk_addPageCtx("e31", (typeof(s_time.eVar31)!='undefined')?s_time.eVar31:'');
            bk_addPageCtx("e32", (typeof(s_time.eVar32)!='undefined')?s_time.eVar32:'');
            bk_addPageCtx("e33", (typeof(s_time.eVar33)!='undefined')?s_time.eVar33:'');
            bk_addPageCtx("e34", (typeof(s_time.eVar34)!='undefined')?s_time.eVar34:'');
            bk_addPageCtx("e38", (typeof(s_time.eVar38)!='undefined')?s_time.eVar38:'');
        }
        bk_ignore_meta = true;
        bk_doJSTag(TIICONSTANTS.bk_id,TIICONSTANTS.bk_pixel_limit);
        
    }
    function TiiCsBeacon() {
        
        this.zone = "";
        this.csFireBeacon = TiiCsFireBeacon;
        this.enabled = 0;
        
    }
    
    //Begin comScore Inline Tag 1.1111.15
    function udmx_(a){
        var b="comScore=",c=document,d=c.cookie,e="",f="indexOf",g="substring",h="length",i=2048,j,k="&ns_",l="&",m,n,o,p,q=window,r=q.encodeURIComponent||escape;if(d[f](b)+1)for(o=0,n=d.split(";"),p=n[h];o<p;o++)m=n[o][f](b),m+1&&(e=l+unescape(n[o][g](m+b[h])));a+=k+"_t="+ +(new Date)+k+"c="+(c.characterSet||c.defaultCharset||"")+"&c8="+r(c.title)+e+"&c7="+r(c.URL)+"&c9="+r(c.referrer),a[h]>i&&a[f](l)>0&&(j=a[g](0,i-8).lastIndexOf(l),a=(a[g](0,j)+k+"cut="+r(a[g](j+1)))[g](0,i)),c.images?(m=new Image,q.ns_p||(ns_p=m),m.src=a):c.write("<","p","><",'img src="',a,'" height="1" width="1" alt="*"',"><","/p",">")
    }
    
    function TiiCsFireBeacon() {

        udmx_('http'+(document.location.href.charAt(4)=='s'?'s://sb':'://b')+ TIICONSTANTS.cs_test_mode + '.scorecardresearch.com/b?c1=2&c2=' + TIICONSTANTS.cs_c2_id  + '&comscorekw='+'&category='+tgxDao.zone);
     
    }
    
    function _Tii_init() {
        var domain = tgxUtil.getRootDomain();
        if (TIICONSTANTS.bk_allow_deny_mode == "allow") {
            if (TIICONSTANTS.bk_enabled_root_domains.indexOf(domain) >= 0) {
                document.writeln('<iframe name="__bkframe" height="0" width="0" frameborder="0" style="display:none" src="javascript:void(0)"></iframe>');
                document.writeln('<scr'+'ipt type="text/javascript" src="'+window.location.protocol+'//tags.bkrtx.com/js/bk-coretag.js"></scr'+'ipt>');     
                bk.enabled = 1;
            }   
        } else if (TIICONSTANTS.bk_allow_deny == "deny") {
            if (TIICONSTANTS.bk_disabled_root_domains.indexOf(domain) == -1) {
                document.writeln('<iframe name="__bkframe" height="0" width="0" frameborder="0" style="display:none" src="javascript:void(0)"></iframe>');
                document.writeln('<scr'+'ipt type="text/javascript" src="'+window.location.protocol+'//tags.bkrtx.com/js/bk-coretag.js"></scr'+'ipt>');     
                bk.enabled = 1;
            }  
        }
        if (TIICONSTANTS.cs_allow_deny_mode == "allow") {
            if (TIICONSTANTS.cs_enabled_root_domains.indexOf(domain) >= 0) {
                document.write('<scri'+'pt type="text/javascript" language="JavaScript1.3" src="'+window.location.protocol+'//b' + TIICONSTANTS.cs_test_mode + '.scorecardresearch.com/c2/' + TIICONSTANTS.cs_c2_id  + '/cs.js"></scr'+'ipt>');
                cs.enabled = 1;
            }   
        } else if (TIICONSTANTS.cs_allow_deny == "deny") {
            if (TIICONSTANTS.cs_disabled_root_domains.indexOf(domain) == -1) {
                document.write('<scri'+'pt type="text/javascript" language="JavaScript1.3" src="'+window.location.protocol+'//b' + TIICONSTANTS.cs_test_mode + '.scorecardresearch.com/c2/' + TIICONSTANTS.cs_c2_id  + '/cs.js"></scr'+'ipt>');
                cs.enabled = 1;
            }  
        }
    }
    function TgxUtil() {
        this.getRootDomain = TgxUtilGetRootDomain;
    }   
    function TgxUtilGetRootDomain() {

        var arr = window.location.hostname.split('.');  
        if (typeof(arr[1]) == "undefined") {
            return(window.location.hostname);
        }else if (arr.length == 1) {
            return(window.location.hostname);
        }else {
            return(arr[arr.length-2]+'.'+arr[arr.length-1]);
        }
    }
    function TgxData() {
        this.params = new Array();
    }  
    var bk = new TiiBkBeacon();
    var cs = new TiiCsBeacon();
    var tgxDao = new TgxData();
    var tgxUtil = new TgxUtil();
    _Tii_init();