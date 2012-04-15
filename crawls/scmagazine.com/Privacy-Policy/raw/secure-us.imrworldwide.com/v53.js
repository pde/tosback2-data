// Netratings SiteCensus v53.js
// COPYRIGHT 2007 Nielsen//Netratings

function random()
{
    random.seed = (random.seed*random.a + random.c) % random.m;
    return random.seed / random.m;
}
random.m=714025;
random.a=4096;
random.c=150889;
random.seed = (new Date()).getTime()%random.m;

function _rsEH(){}
window.onerror=_rsEH;

var _rsLP=location.protocol.indexOf('https')>-1?'https:':'http:';
var _rsND=_rsLP+_rsDN;
var _rsRD=(new Date()).getTime();
if (typeof(_rsCC)=="undefined") {var _rsCC=1;}
if (typeof(_rsDT)=="undefined") {var _rsDT=0;}
if (typeof(_rsSE)=="undefined") {var _rsSE=0;}
if (typeof(_rsSV)=="undefined") {var _rsSV="";}
if (typeof(_rsSM)=="undefined") {var _rsSM=0;}
if (typeof(_rsSS)=="undefined") {var _rsSS=1;}
if (typeof(_rsUT)=="undefined") {var _rsUT=0;}
if (typeof(_rsMP)=="undefined") {var _rsMP=1;}
if (typeof(_rsIP)=="undefined") {var _rsIP=0;}
if (typeof(_rsCG)=="undefined") {var _rsCG=0;}
if (typeof(_rsTC)=="undefined") {var _rsTC=500;}
if (typeof(_rsSI)=="undefined") {var _rsSI=escape(window.location);}
if (typeof(_rsCL)=="undefined") {var _rsCL=0;}
if (typeof(_rsCU)=="undefined") {var _rsCU=window.location;}
if (typeof(_rsPLfl)=="undefined") {var _rsPLfl=1; }
if (typeof(_rsPLqt)=="undefined") {var _rsPLqt=0; }
if (typeof(_rsPLre)=="undefined") {var _rsPLre=0; }
if (typeof(_rsPLwm)=="undefined") {var _rsPLwm=0; }
if (typeof(_rsPLjj)=="undefined") {var _rsPLjj=0; }
if (typeof(_rsPLac)=="undefined") {var _rsPLac=0; }
if (typeof(_rsC0)=="undefined") {var _rsC0;}
if (typeof(_rsC1)=="undefined") {var _rsC1;}
if (typeof(_rsC2)=="undefined") {var _rsC2;}
if (typeof(_rsC3)=="undefined") {var _rsC3;}
if (typeof(_rsC4)=="undefined") {var _rsC4;}
if (typeof(_rsC5)=="undefined") {var _rsC5;}
if (typeof(_rsC6)=="undefined") {var _rsC6;}
if (typeof(_rsC7)=="undefined") {var _rsC7;}
if (typeof(_rsC8)=="undefined") {var _rsC8;}
if (typeof(_rsC9)=="undefined") {var _rsC9;}

function _rsPause(_rsMillis) {
	var _rsDate = new Date();
	var _rsCurrDate;
	
	do { 
		_rsCurrDate = new Date(); 
	} while(_rsCurrDate - _rsDate < _rsMillis);
} 

function _rsRecordFactory(_rsClickUrl, _rsNewCG) {
	var _rsSrc = _rsND + 'cgi-bin/m?rnd=' + (new Date()).getTime();
	_rsSrc += '&ci=' + _rsCI;
	_rsSrc += '&cg=' + escape(_rsNewCG);
	_rsSrc += '&cc=0';
	_rsSrc += '&si=' + _rsCI + '-ctgw-' + escape(_rsClickUrl);
	_rsSrc += '&rp=' + escape(window.location);
	if(_rsSrc.length > 2048)	{
		_rsSrc = _rsSrc.substring(0, 2048);
	}
	return _rsSrc;
}

function _rsEvent(_rsClickUrl) {
	var _rsNewCG = _rsEvent.arguments.length > 1 ? _rsEvent.arguments[1] : _rsCG;
	(new Image(1,1)).src = _rsRecordFactory(_rsClickUrl, _rsNewCG);
}

function _rsLinkTrack(_rsClickUrl) {

        var _rsNewCG = _rsLinkTrack.arguments.length > 1 ? _rsLinkTrack.arguments[1] : _rsCG;
        var _rsClickImg = new Image(1,1);
        _rsClickImg.src = _rsRecordFactory(_rsClickUrl, _rsNewCG);
        _rsPause(_rsTC);
}

var _rsClickDst;
function _rsClick(_rsClickUrl) {
        var _rsNewCG = _rsClick.arguments.length > 1 ? _rsClick.arguments[1] : _rsCG;
        var _rsClickImg = new Image(1,1);
        _rsClickImg.src = _rsRecordFactory(_rsClickUrl, _rsNewCG);
        _rsClickDst = _rsClickUrl;
        setTimeout("window.location = _rsClickDst", _rsTC);
}

function _rsVerInfo(str, ct) {
	var p = 0;
        var sp = 0;
	for(var i=0;i<ct&&p>=0;i++) { sp=p+1; p = str.indexOf('.', sp); }
	if(p>0) {
                var v = str.substring(sp, p).match(/\d+$/);
                return v ? v : 0;
	} else {
		return 0;
	}
}

function _rsPluginDetect() {
        var _rsPlugins = [];
	var _rsMT = navigator.mimeTypes; // -1 indicates unknown
	if(_rsMT && _rsMT.length > 0) {
		var k;
		if(_rsPLfl==1) {
		        _rsPlugins['FL']=-1;
			k = 'application/x-shockwave-flash';
			if(_rsMT[k] && _rsMT[k].enabledPlugin) {
				_rsPlugins['FL'] = _rsVerInfo(_rsMT[k].enabledPlugin.description, 1);
			}
		}
		if(_rsPLqt==1) {
			_rsPlugins['QT']=-1;
			k = 'video/quicktime';
			if(_rsMT[k] && _rsMT[k].enabledPlugin) {
				_rsPlugins['QT'] = _rsVerInfo(_rsMT[k].enabledPlugin.name, 1);
			}
		}
		if(_rsPLre==1) {
			_rsPlugins['RE']=-1;
			k = 'audio/x-pn-realaudio-plugin';
			if(_rsMT[k] && _rsMT[k].enabledPlugin) {
				_rsPlugins['RE'] = 0;
			}
		}
		if(_rsPLwm==1) {
			_rsPlugins['QT']=-1;
			var rt = true;
			if(window.GeckoActiveXObject) {
				try {
					var p = new GeckoActiveXObject("WMPlayer.OCX.7");
					_rsPlugins['WM'] = _rsVerInfo(p.versionInfo, 1);
					rt = false;
				} catch(e) {}
			} 
			if(rt) {
				k = 'application/x-mplayer2';
				if(_rsMT[k] && _rsMT[k].enabledPlugin) {
					_rsPlugins['WM'] = 0;
				}
			}
			
		}
		if(_rsPLjj==1) {
			_rsPlugins['JJ']=-1;
			k = 'application/x-java-applet';
			if(_rsMT[k] && _rsMT[k].enabledPlugin) {
				var v = _rsVerInfo(_rsMT[k].enabledPlugin.description, 2);
				_rsPlugins['JJ'] = (v == 0 ? v : '1.'+v);
			}
		}
		if(_rsPLac==1) {
			_rsPlugins['AC']=-1;
			k = 'application/pdf';
			if(_rsMT[k] && _rsMT[k].enabledPlugin) {
				_rsPlugins['AC'] = 0;
			}
		}
	} else if(window.ActiveXObject) {
		var _rsP;

		if(_rsPLfl==1) {
			_rsPlugins['FL']=-1;
			for(var i=14;i>0;i--) {
				try {
					_rsP = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.'+i);
					if(_rsP != null) { _rsPlugins['FL'] = i; break; }
				} catch(e) {}
			}
		}
		if(_rsPLqt==1) {
			_rsPlugins['QT']=-1;
			try {
				_rsP = new ActiveXObject('QuickTimeCheckObject.QuickTimeCheck.1');
				if(_rsP != null) { _rsPlugins['QT'] = parseInt(_rsP.QuickTimeVersion.toString(16).substring(0,1)); }
			} catch(e) {}
		}
		if(_rsPLre==1) {
			_rsPlugins['RE']=-1;
			try {
				_rsP = new ActiveXObject('rmocx.RealPlayer G2 Control.1');
				if(_rsP != null) { _rsPlugins['RE'] = 0; }
			} catch(e) {}
		}
		if(_rsPLwm==1) {
			_rsPlugins['WM']=-1;
			try {
				_rsP = new ActiveXObject('WMPlayer.OCX.7');
				if(_rsP != null) { _rsPlugins['WM'] = _rsVerInfo(_rsP.versionInfo, 1); }
			} catch(e) {}
		}
		if(_rsPLjj==1) {
			_rsPlugins['JJ']=-1;
			try {
				_rsP = new ActiveXObject('JavaPlugin');
				if(_rsP != null) { _rsPlugins['JJ'] = 0; }
			} catch(e) {}
		}
		if(_rsPLac==1) {
			_rsPlugins['AC']=-1;
			var rt = true;
			try {
				_rsP = new ActiveXObject('AcroPDF.PDF.1');
				if(_rsP != null) { _rsPlugins['AC'] = _rsVerInfo(_rsP.GetVersions(), 1); rt = false; }
			} catch(e) {}
			if(rt) {
				for(var i=6;i>2;i--) {
					try {
						_rsP = new ActiveXObject('PDF.PdfCtrl.'+i);
						if(_rsP != null) { _rsPlugins['AC'] = i; break; }
					} catch(e) {}
				}
			}
		}
	}
	return _rsPlugins;
}

function rsCi()
{
	var _rsUA=navigator.appName+" "+navigator.appVersion;
	var _rsRUA=navigator.userAgent;
	var _rsWS=window.screen;
	var _rsBV=navigator.appVersion.substring(0, 1);
	var _rsNN=(_rsUA.indexOf('Netscape'));
	var _rsMC=(_rsUA.indexOf('Mac'));
	var _rsIE=(_rsUA.indexOf('MSIE'));
	var _rsOP=(_rsRUA.indexOf('Opera'));
	var _rsIEV=(parseInt(_rsUA.substr(_rsIE+5)));
	var _rsRP=escape(document.referrer);
	var _rsSR;
	var _rsCD;
	var _rsLG;
	var _rsJE;
	var _rsCK;
	var _rsTZ;
	var _rsCT;
	var _rsHP;
	var _rsTL;
	var _rsSW;
	var _rsSH;
	var _rsFL;
	var _rsQT;
	var _rsRE;
	var _rsWM;
	var _rsJJ;
	var _rsAC;
	if (_rsMP==0) {return;}
        _rsJE=(navigator.javaEnabled()==true)?"y":"n";
        if (_rsDT==1) {
		_rsTL=escape(document.title);
	}
	if((_rsIE>0)||((_rsNN!=-1)&&(_rsBV >=5))) {
		_rsCK=(navigator.cookieEnabled==true)?"y":"n";
	}
	if((_rsIE>=0)&&(_rsIEV>=5)&&(_rsMC==-1)&&(_rsOP==-1)) {
		document.body.addBehavior("#default#clientCaps");
		_rsCT=document.body.connectionType;
		document.body.addBehavior("#default#homePage");
		_rsHP=(document.body.isHomePage(location.href))?"y":"n";
	}
	var _rsD = new Date();
	_rsTZ = _rsD.getTimezoneOffset()/-60;
	if((typeof(_rsWS)!="undefined")&&(_rsWS!=null)) {
		_rsSW=_rsWS.width;
		_rsSH=_rsWS.height;
		_rsCD=_rsWS.colorDepth;
		_rsSR=_rsSW+'x'+_rsSH;
		if((_rsNN!=-1)&&(_rsBV >=4)) {
			_rsCD=_rsWS.pixelDepth;
		}
	}
	if((_rsNN!=-1)&&(_rsBV >=4)||(_rsOP>=0)) {
		_rsLG=navigator.language;
	}
	if((_rsIE!=-1)&&(_rsBV >=4)&&(_rsOP==-1)) {
		_rsLG=navigator.userLanguage;
	}
	var _rsPlugins = _rsPluginDetect();
	var _rsPR="";
	_rsPR='<img src="';
	_rsPR=_rsPR+_rsND+'cgi-bin/m?rnd='+(new Date()).getTime();
	_rsPR=_rsPR+'&ci='+_rsCI;
	_rsPR=_rsPR+'&cg='+escape(_rsCG);
	_rsPR=_rsPR+'&cc='+_rsCC;
	if (_rsSR!=null) {_rsPR=_rsPR+'&sr='+_rsSR;}
	if (_rsCD!=null) {_rsPR=_rsPR+'&cd='+_rsCD;}
	if (_rsLG!=null) {_rsPR=_rsPR+'&lg='+_rsLG;}
	if (_rsJE!=null) {_rsPR=_rsPR+'&je='+_rsJE;}
	if (_rsCK!=null) {_rsPR=_rsPR+'&ck='+_rsCK;}
	if (_rsTZ!=null) {_rsPR=_rsPR+'&tz='+_rsTZ;}
	if (_rsCT!=null) {_rsPR=_rsPR+'&ct='+_rsCT;}
	if (_rsHP!=null) {_rsPR=_rsPR+'&hp='+_rsHP;}
	if (_rsTL!=null) {_rsPR=_rsPR+'&tl='+_rsTL;}
	if (_rsUT==1) {
	   if (_rsC0!=null) {_rsPR=_rsPR+'&c0='+escape(_rsC0);}
	   if (_rsC1!=null) {_rsPR=_rsPR+'&c1='+escape(_rsC1);}
	   if (_rsC2!=null) {_rsPR=_rsPR+'&c2='+escape(_rsC2);}
	   if (_rsC3!=null) {_rsPR=_rsPR+'&c3='+escape(_rsC3);}
	   if (_rsC4!=null) {_rsPR=_rsPR+'&c4='+escape(_rsC4);}
	   if (_rsC5!=null) {_rsPR=_rsPR+'&c5='+escape(_rsC5);}
	   if (_rsC6!=null) {_rsPR=_rsPR+'&c6='+escape(_rsC6);}
	   if (_rsC7!=null) {_rsPR=_rsPR+'&c7='+escape(_rsC7);}
	   if (_rsC8!=null) {_rsPR=_rsPR+'&c8='+escape(_rsC8);}
	   if (_rsC9!=null) {_rsPR=_rsPR+'&c9='+escape(_rsC9);}
	}
	if (_rsPlugins['FL']!=null) {_rsPR=_rsPR+'&fl='+_rsPlugins['FL'];}
	if (_rsPlugins['QT']!=null) {_rsPR=_rsPR+'&qt='+_rsPlugins['QT'];}
	if (_rsPlugins['RE']!=null) {_rsPR=_rsPR+'&re='+_rsPlugins['RE'];}
	if (_rsPlugins['WM']!=null) {_rsPR=_rsPR+'&wm='+_rsPlugins['WM'];}
	if (_rsPlugins['JJ']!=null) {_rsPR=_rsPR+'&jj='+_rsPlugins['JJ'];}
	if (_rsPlugins['AC']!=null) {_rsPR=_rsPR+'&ac='+_rsPlugins['AC'];}
	_rsPR=_rsPR+'&si='+_rsSI;
	_rsPR=_rsPR+'&rp='+_rsRP;
	if (_rsIP==1) {_rsPR=_rsPR+'" style="visibility:hidden;position:absolute;left:0px;top:0px;z-index:-1';}
	_rsPR=_rsPR+'" width="1" height="1" alt=""/>';
	document.write(_rsPR);
}

function _rsCLSendIt(_rsSrc, _rsDest, _rsTargetType, _rsClickName, _rsClickValue) {
	var _rsCLData = _rsND+'cgi-bin/m?rnd='+(new Date()).getTime();
	_rsCLData  = _rsCLData+'&ci='+_rsCI;
	_rsCLData  = _rsCLData+'&cg='+escape(_rsCG);
	_rsCLData  = _rsCLData+'&cc=0';
	_rsCLData = _rsCLData+'&si='+_rsCI+'-ctpo-'+escape(_rsDest);
	_rsCLData = _rsCLData+'&rp='+escape(_rsSrc);
	_rsCLData = _rsCLData+'&tt='+escape(_rsTargetType);
	_rsCLData = _rsCLData+'&cn='+escape(_rsClickName);
	_rsCLData = _rsCLData+'&cv='+escape(_rsClickValue);
	if(_rsCLData.length > 2048)	{
		_rsCLData = _rsCLData.substring(0, 2048);
	}
	var _rsPx = new Image(1,1);
	_rsPx.src = _rsCLData;
	_rsPause(_rsTC);
}
function _rsCLSendALink(_rsALink) {
	var _rsName = _rsALink.innerHTML.toLowerCase().indexOf('img') > -1 ? 'image' : 'text';
	_rsCLSendIt(_rsCU, _rsALink.href, _rsALink.tagName.toLowerCase(), _rsName, _rsALink.innerHTML);
}
function _rsCLSendForm(_rsInput) {
	if(_rsInput.form == undefined || _rsInput.form.action == undefined) {
		return;
	}

        if (_rsInput.type == 'image') {
                var _rsValue = _rsInput.src;
        }
        else if (_rsInput.tagName == 'BUTTON') {
                var _rsValue = _rsInput.innerHTML.replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ');
                if (_rsValue == "") _rsValue = _rsInput.value;
        }
        else {
            var _rsValue = _rsInput.value;
        }

	_rsCLSendIt(_rsCU, _rsInput.form.action, _rsInput.form.tagName.toLowerCase(), _rsInput.type.toLowerCase(), _rsValue);
}
function _rsCLCatchIt(e) {
	var _rsCurr = e ? e.target : window.event.srcElement;
	if ((_rsCurr.tagName == 'INPUT' || _rsCurr.tagName == 'BUTTON')
		&& (_rsCurr.type == 'image' || _rsCurr.type == 'submit' || _rsCurr.type == 'button')) {
		_rsCLSendForm(_rsCurr);
	}
	else
	{
		do {
			if ((_rsCurr.tagName == 'A') && (_rsCurr.href.length > 0)) {
				_rsCLSendALink(_rsCurr);
				break;
			}
			_rsCurr = _rsCurr.parentNode;
		} while (_rsCurr != null && _rsCurr.tagName != 'BODY')
	}
}

function _rsCLRegisterIt() {
	if(!document.getElementById) {
		return;
	}
	var _rsOld = document.body.onclick;
	if(_rsOld) {
		document.body.onclick = function (e) {
			_rsCLCatchIt(e);
			_rsOld(e);
		}
	}
	else {
		document.body.onclick = _rsCLCatchIt;
	}
}

// main
if((_rsSE)&&(random() <= _rsSM)) {
        var _rsIM='<scr'+'ipt language="JavaScript" type="text/javascript" src="'+_rsND+'cgi-bin/j?ci='+_rsCI+'&ss='+_rsSS+'&cc='+_rsCC+'&rd='+_rsRD+'&se='+_rsSE+'&sv='+_rsSV+'"><\/scr'+'ipt>';
    document.write(_rsIM);
}
else {
    rsCi();
}
if(_rsCL==1) {
	_rsCLRegisterIt();
}
