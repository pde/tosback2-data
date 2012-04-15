var msnV = null;

function msn4dw(mkt, brand, vid, from, playlist, editor)
{
    msnV4(mkt, brand, vid, from, playlist, editor, true);
}

function msn4dest(mkt, brand, vid, from, playlist, editor)
{
    msnV4(mkt, brand, vid, from, playlist, editor, false);
}

function msnV4(mkt, brand, vid, from, playlist, editor, daughterWin)
{
	var obj = window.event ? window.event.srcElement : null;
    
    var rf = document.URL;
    var target = '';
	var winWidth = 1020;
	var winHeight = 750;
	var targetName = '_msnV4dest';
	var page = 'video.aspx';
	var scrollbar = 'yes';

    if((null != obj) &&
       (null != obj.target) &&
       (obj.target.length > 0))
    {
        target = obj.target;
        target = target.replace(/^\s*/, '').replace(/\s*$/, ''); 
    }
	if(daughterWin)
	{
	    winWidth = 800;
	    winHeight = 545;
	    page = 'dw.aspx';
	    scrollbar = 'no';
	    targetName = '_msnV4dw';
	}

	if(!from) {from ='';}
	if(!playlist) {playlist ='';}
	if(!editor) {editor = '';}
	if(!mkt) {mkt = 'en-us';}
	if(!brand) {brand='';}
	if(!vid) {vid='';}
	if(target == '') {target = targetName;}

    var href = "http://video.msn.com/" + page + "?mkt=" + mkt + "&brand=" + brand + "&vid=" + vid + "&playlist=" + playlist + "&editor=" + editor + "&from=" + from + "&rf=" + rf;

    if (navigator.userAgent.indexOf('MSIE') != -1)
    {
        window.open(href, target, "height=" + winHeight + ",width=" + winWidth + ",status=no,toolbar=no,menubar=no,location=no,resizable=yes,scrollbars=" + scrollbar);
    }
    else
    {            
        winWidth = winWidth + 18;
        window.open(href, target, "height=" + winHeight + ",width=" + winWidth + ",status=no,toolbar=no,menubar=no,location=yes,resizable=yes,scrollbars=yes");
    }
    if(null != obj)
    {
        obj.returnValue = false;
        obj.cancelBubble=true;
    }
}

function msnvDwd(pid,guid,mkt,pl,t,idp,fg) {
	msnvDw(pid,guid,mkt,pl,t,idp,fg);
}

function msnvDw(pid,guid,mkt,pl,t,idp,fg) {
	if(mkt=='' || mkt==undefined) {mkt="us";}
	if(!pl) {pl='';}
	if(!t) {t='';}
	if(!fg) {fg='';}
	var vurl = msnvVU(mkt);
	var page = "v.htm";
	var rf = document.URL;
	if(idp != null && idp != undefined && idp.length > 0)
	{
		page = idp + ".htm";
	}
	var w = window.open(vurl + "/v/"+mkt+"/" + page + "?dw=1&f="+pid+"&g="+guid+"&p="+pl+"&t="+t+"&rf="+rf+"&fg="+fg,"msnVDWd","width=818,height=545,status=1,scrollbars=1,resizable=1");
}

function msnvSdw(pid,guid,mkt,pl,fg) {
	if(mkt=='' || mkt==undefined) {mkt="us";}
	if(!pl) {pl='';}
	if(!fg) {fg='';}
	var vurl = msnvVU(mkt);
	var rf = document.URL;
	var w = window.open(vurl + "/v/"+mkt+"/dw.htm?p="+pid+"&g="+guid+"&m="+mkt+"&pl="+pl+"&rf="+rf+"&fg="+fg,"msnVDW","width=818,height=545,status=1");
}

function msnvJs(pid,guid,h,mkt,pl,fg) {
	if(mkt=='' || mkt==undefined) {mkt="us";}
	if(!pl) {pl='';}
	if(!fg) {fg='';}
	var rf = document.URL;
	var req = msnvReq();
	if(req!=0) {
		h.innerHTML = "<iframe frameborder=0 scrolling=no src='http://intl.video.msn.com/v/"+mkt+"/req.aspx?r="+req+"&h="+location.href+"' width=750 height=363>";
		return;
	}
	if(!window["msnVinh"]) {
		var holder = document.createElement("<div id=msnVinh class=msnVa>");
		if(h!=null && (typeof(h)=='object' && h.tagName.toLowerCase()=='div') ) {
			h.appendChild(holder);
		}
		else {
			document.body.appendChild(holder);
		}
		var script = document.createElement("<script language=javascript src='http://intl.video.msn.com/v/"+mkt+"/msnvinp.js' onreadystatechange=\"msnvJsR(this,'"+guid+"','"+pl+"','"+pid+"','"+fg+"','"+rf+"');\">");
		holder.appendChild(script);
	}
	else {
		msnV.Play(guid);
	}
}

function msnvJsR(o,g,p,pid,fg,rf) {
	if(o.readyState=="loaded") {
		msnV = new msnvINP(msnVinh,'msnV',pid);
		msnV.oF = pid;
		msnV.oFG = fg;
		msnV.oRF = rf;
		msnV.Build();
		msnV.Play(g,p);
	}
}

function getFlashVersion()
{
    // NS/Opera version >= 3 check for Flash plugin in plugin array
    var flashVer = -1;
    
    if (navigator.plugins != null && navigator.plugins.length > 0) {
        if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
            var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
            var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;			
            var descArray = flashDescription.split(" ");
            var tempArrayMajor = descArray[2].split(".");
            var versionMajor = tempArrayMajor[0];
            var versionMinor = tempArrayMajor[1];
            if ( descArray[3] != "" ) {
                tempArrayMinor = descArray[3].split("r");
            } else {
                tempArrayMinor = descArray[4].split("r");
            }
            var versionRevision = tempArrayMinor[1] > 0 ? tempArrayMinor[1] : 0;
            var flashVer = versionMajor + "." + versionMinor + "." + versionRevision;
        }
    }
    // MSN/WebTV 2.6 supports Flash 4
    else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) flashVer = 4;
    // WebTV 2.5 supports Flash 3
    else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) flashVer = 3;
    // older WebTV supports Flash 2
    else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 2;
    else if ( (navigator.appVersion.indexOf("MSIE") != -1) && (navigator.appVersion.toLowerCase().indexOf("win") != -1) && (navigator.userAgent.indexOf("Opera") == -1) ) {
        var version;
        var axo;
        var e;

        // NOTE : new ActiveXObject(strFoo) throws an exception if strFoo isn't in the registry

        try {
            // version will be set for 9.X or greater players
            axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.9");
            version = axo.GetVariable("$version");
        } catch (e) {
        }
        
        if (!version)
        {
            try {
                // version will be set for 8.X or greater players
                axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.8");
                version = axo.GetVariable("$version");
            } catch (e) {
            }
        }          
        
        if (!version)
        {
            try {
                // version will be set for 7.X or greater players
                axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
                version = axo.GetVariable("$version");
            } catch (e) {
            }
        }
        
        if (!version)
        {
            try {
                // version will be set for 6.X players only
                axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
                
                // installed player is some revision of 6.0
                // GetVariable("$version") crashes for versions 6.0.22 through 6.0.29,
                // so we have to be careful. 
                
                // default to the first public version
                version = "WIN 6,0,21,0";

                // throws if AllowScripAccess does not exist (introduced in 6.0r47)		
                axo.AllowScriptAccess = "always";

                // safe to call for 6.0r47 or greater
                version = axo.GetVariable("$version");

            } catch (e) {
            }
        }

        if (!version)
        {
            try {
                // version will be set for 4.X or 5.X player
                axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
                version = axo.GetVariable("$version");
            } catch (e) {
            }
        }

        if (!version)
        {
            try {
                // version will be set for 3.X player
                axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
                version = "WIN 3,0,18,0";
            } catch (e) {
            }
        }

        if (!version)
        {
            try {
                // version will be set for 2.X player
                axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                version = "WIN 2,0,0,11";
            } catch (e) {
                version = -1;
            }
        }        	
        flashVer = version;
    }	
    return flashVer;
}

function detectFlashVersion(reqMajorVer, reqMinorVer, reqRevision)
{
    var versionStr = getFlashVersion();
    if (versionStr == -1 ) {
        return false;
    } else if (versionStr != 0) {
        if( (navigator.appVersion.indexOf("MSIE") != -1) && (navigator.appVersion.toLowerCase().indexOf("win") != -1) && (navigator.userAgent.indexOf("Opera") == -1) ) {
            // Given "WIN 2,0,0,11"
            tempArray         = versionStr.split(" "); 	// ["WIN", "2,0,0,11"]
            tempString        = tempArray[1];			// "2,0,0,11"
            versionArray      = tempString.split(",");	// ['2', '0', '0', '11']
        } else {
            versionArray      = versionStr.split(".");
        }
        var versionMajor      = versionArray[0];
        var versionMinor      = versionArray[1];
        var versionRevision   = versionArray[2];

            // is the major.revision >= requested major.revision AND the minor version >= requested minor
        if (versionMajor > parseFloat(reqMajorVer)) {
            return true;
        } else if (versionMajor == parseFloat(reqMajorVer)) {
            if (versionMinor > parseFloat(reqMinorVer))
                return true;
            else if (versionMinor == parseFloat(reqMinorVer)) {
                if (versionRevision >= parseFloat(reqRevision))
                    return true;
            }
        }
        return false;
    }
}

function msnvReq() {
	var ok=0;
	var ua=navigator.userAgent.toLowerCase();
	if(ua.indexOf("mediacenter") > -1 || ( ua.indexOf("stb") > -1 && ua.indexOf(" istb ")==-1) ) {
		var rf = document.referrer;
		var qtype=(location.search&&location.search.indexOf("?")>=0)?"&":"?";
		var sloc=(location.search)?location.search:"";
		pLoc = "http://g.msn.com/0VD0/36/61";
		location.replace(pLoc+sloc+qtype+"rf="+rf);
		return 16;
	}
	if(ua.indexOf("mac")>-1) {ok = 32;}
	else if(navigator.appName=="Netscape") {ok = 8;}
	else {
		ok += (parseFloat(ua.slice(ua.indexOf("msie")+5))>5.9)?0:1;
		var o = new msnvTC("var w=new ActiveXObject('WMPlayer.OCX');return w.versionInfo;","return 0;");
		ok += (parseInt(o.tc())>=9)?0:2;
		if(!detectFlashVersion(6, 0, 0))
		{
			ok += 4;
		}
		//o = new msnvTC("var w=new ActiveXObject('ShockwaveFlash.ShockwaveFlash.6');return 0;","return 4;");
		//ok += o.tc();
	}
	return ok;
}

function msnvTC(t,c){
	this.tc=new Function("try{"+t+"}catch(e){"+c+"}");
}

function oMvsLink(gPV,sGuid,bDck,sMenu,sSubM,sURL,sPL,bRP,bStatic,sList){
		bDck=(bDck==1||bDck==true)?0:Math.min((bDck*1)+1,2);
		if (gPV.indexOf("/")<1){gPV+="/64";}
	if((gPV!="40/98")&&(gPV!="50/98")&&(gPV!="51/98")) {
			var mkt="";
			switch (gPV){
				case "39/83":
					mkt="en-au";
					break;
				case "43/119":
				mkt="es-us";
				break;
				case "37/81":
				mkt="en-ca";
				break;
				case "38/82":
				mkt="fr-ca";
					break;
			}
			msnvDw(gPV,sGuid+((sPL)?(","+sPL):""),mkt,(sList)?escape(sList):"");
			return;
	}
	var sLink="http://g.msn.com/0VD0/"+gPV+"?t="+bDck;
	if (arguments.length>1){
		sLink+=(sList)?"&p="+escape(sList):"";
		sLink+=((sMenu)?("&m="+sMenu+"&mi="+sSubM):"");
		sPL=sGuid+((sPL)?","+sPL:"");
		sLink+=((!bRP)?"&i=":"&r=")+sPL;
	}
	if (bDck){
		var ovp=window.open(sLink,"ovp","width=818,height=545,status=1");
		if (sURL){location.href=sURL;}
	}
	else{
		location.href=sLink;
	}
}

function msnvVU(mkt)
{
	var vurl = "http://video.msn.com";
	if(mkt != null && mkt != undefined && mkt.length > 0)
	{
		switch(mkt.toLowerCase())
		{
			case "es-us":
				vurl = "http://video.msn.com";
				break;
			case "ja-jp":
				vurl = "http://jp.video.msn.com";
				break;
			case "en-ca":
				vurl = "http://video.msn.com";
				break;
			case "fr-ca":
				vurl = "http://video.msn.com";
				break;
			case "en-au":
				vurl = "http://video.msn.com";
				break;
			case "en-gb":
				vurl = "http://video.msn.com";
				break;
			case "en-ap":
				vurl = "http://video.ap.org";
				break;
			case "us":
				vurl = "http://video.msn.com";
				break;
			case "fr-fr":
				vurl = "http://video.msn.com";
				break;
			case "es-es":
				vurl = "http://video.msn.com";
				break;
			case "nl-nl":
				vurl = "http://video.msn.com";
				break;
			case "de-de":
				vurl = "http://video.msn.com";
				break;
			case "it-it":
				vurl = "http://video.msn.com";
				break;
			case "sv-se" :
				vurl = "http://video.msn.com";
				break;
			case "nb-no" :
				vurl = "http://video.no.msn.com";
				break;
			case "da-dk" :
				vurl = "http://video.msn.com";
				break;
			case "nl-be" :
				vurl = "http://video.be.msn.com";
				break;
			case "zh-cn" :
				vurl = "http://video.cn.msn.com";
				break;
			case "zh-tw" :
				vurl = "http://video.tw.msn.com";
				break;
			case "ko-kr" :
				vurl = "http://video.kr.msn.com";
				break;	
			case "pt-br" :
				vurl = "http://video.msn.com";
				break;
			case "es-mx" :
				vurl = "http://video.msn.com";
				break;
			case "ru-ru" :
				vurl = "http://video.ru.msn.com";
				break;	
			case "en-in" :
				vurl = "http://video.in.msn.com";
				break;
			case "en-sg" :
				vurl = "http://video.msn.com";
				break;
			case "fr-be" :
				vurl = "http://video.fr.be.msn.com";
				break;		
			default:
				vurl = "http://video.msn.com";
				break;
		}
	}
	return vurl;
}