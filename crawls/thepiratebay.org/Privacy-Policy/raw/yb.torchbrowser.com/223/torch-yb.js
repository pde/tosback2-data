(function(){
	// randVal for AB testing.
	var numberOfOptions = 2;
	var randVal = Math.floor(Math.random()*numberOfOptions) + 1;
	
	// Get browser language.
	var language = window.navigator.userLanguage || window.navigator.language;
	
	//---------------------------------------------------------------------------------------------------------------
	
	// AB(C.) Testing
	if (randVal == 1)
	{
		var // CONFIG A
			APPID = 223,
			SYSID = 448,
			LP_SITE = 'http://lp.torchbrowser.com/?sysid='+ SYSID +'&appid=' + APPID,
			BAR_COOKIE_NAME = 'sleep_notification_bar',
			SLEEP_DURATION = 365,
			SLEEP_DURATION_UPGRADE = 1,
			BACKGROUND_COLOR = '#fff1a8',
			TEXT_COLOR = '#000000',
			FONT_TYPE = 'Arial, Helvetica, sans-serif',
			LINK_COLOR = '#06F',
			LINK_CLOSE_COLOR = '#CCCCCC',
			TXT = 'You are using %BROWSERNAME%, which doesn\'t support direct Torrent downloads.',
			TXT_CLICK="Upgrade your browser!",
			TXT_CLOSE="X",
			//If we insert text into the BUTTON_TEXT parameter the link will include a button. Otherwise it will be a link.
			TXT_BUTTON="Upgrade to Torch",
			TXT_CLICKABLE=1,
			TXT_FONT_SIZE="13px";	
	}
	else if (randVal == 2)
	{
		var // CONFIG B
			APPID = 223,
			SYSID = 448,
			LP_SITE = 'http://lp.torchbrowser.com/?sysid='+ SYSID +'&appid=' + APPID,
			BAR_COOKIE_NAME = 'sleep_notification_bar',
			SLEEP_DURATION = 365,
			SLEEP_DURATION_UPGRADE = 1,
			BACKGROUND_COLOR = '#fff1a8',
			TEXT_COLOR = '#000000',
			FONT_TYPE = 'Arial, Helvetica, sans-serif',
			LINK_COLOR = '#06F',
			LINK_CLOSE_COLOR = '#CCCCCC',
			TXT = 'You are using %BROWSERNAME%, which doesn\'t support direct Torrent downloads.',
			TXT_CLICK="Upgrade your browser!",
			TXT_CLOSE="X",
			//If we insert text into the BUTTON_TEXT parameter the link will include a button. Otherwise it will be a link.
			TXT_BUTTON="Upgrade to Torch",
			TXT_CLICKABLE=1,
			TXT_FONT_SIZE="13px";
	}

	//---------------------------------------------------------------------------------------------------------------
	// Translations, override AB testing
	if (language.toLowerCase().indexOf('ko') != -1)
	{
		var // CONFIG KO
			APPID = 223,
			SYSID = 448,
			LP_SITE = 'http://lp.torchbrowser.com/?sysid='+ SYSID +'&appid=' + APPID,
			BAR_COOKIE_NAME = 'sleep_notification_bar',
			SLEEP_DURATION = 365,
			SLEEP_DURATION_UPGRADE = 1,
			BACKGROUND_COLOR = '#fff1a8',
			TEXT_COLOR = '#000000',
			FONT_TYPE = 'Arial, Helvetica, sans-serif',
			LINK_COLOR = '#06F',
			LINK_CLOSE_COLOR = '#CCCCCC',
			TXT = '직접 토렌트 다운로드를 지원하지 않는 %BROWSERNAME%, 을(를) 사용합니다.',
			TXT_CLICK="Upgrade your browser!",
			TXT_CLOSE="X",
			//If we insert text into the BUTTON_TEXT parameter the link will include a button. Otherwise it will be a link.
			TXT_BUTTON="업그레이드",
			TXT_CLICKABLE=1,
			TXT_FONT_SIZE="13px";			
	}
	if (language.toLowerCase().indexOf('ar') != -1)
	{
		var // CONFIG AR
			APPID = 223,
			SYSID = 448,
			LP_SITE = 'http://lp.torchbrowser.com/?sysid='+ SYSID +'&appid=' + APPID,
			BAR_COOKIE_NAME = 'sleep_notification_bar',
			SLEEP_DURATION = 365,
			SLEEP_DURATION_UPGRADE = 1,
			BACKGROUND_COLOR = '#fff1a8',
			TEXT_COLOR = '#000000',
			FONT_TYPE = 'Arial, Helvetica, sans-serif',
			LINK_COLOR = '#06F',
			LINK_CLOSE_COLOR = '#CCCCCC',
			TXT = 'أنت تستخدم %BROWSERNAME% الذي لا يعتمد تنزيلات تورنت مباشرة.',
			TXT_CLICK="Upgrade your browser!",
			TXT_CLOSE="X",
			//If we insert text into the BUTTON_TEXT parameter the link will include a button. Otherwise it will be a link.
			TXT_BUTTON="الترقية",
			TXT_CLICKABLE=1,
			TXT_FONT_SIZE="13px";			
	}
	if (language.toLowerCase().indexOf('fr') != -1)
	{
		var // CONFIG FR
			APPID = 223,
			SYSID = 448,
			LP_SITE = 'http://lp.torchbrowser.com/?sysid='+ SYSID +'&appid=' + APPID,
			BAR_COOKIE_NAME = 'sleep_notification_bar',
			SLEEP_DURATION = 365,
			SLEEP_DURATION_UPGRADE = 1,
			BACKGROUND_COLOR = '#fff1a8',
			TEXT_COLOR = '#000000',
			FONT_TYPE = 'Arial, Helvetica, sans-serif',
			LINK_COLOR = '#06F',
			LINK_CLOSE_COLOR = '#CCCCCC',
			TXT = 'Vous utilisez %BROWSERNAME% qui ne prend pas en charge les téléchargements directs de fichiers Torrent.',
			TXT_CLICK="Upgrade your browser!",
			TXT_CLOSE="X",
			//If we insert text into the BUTTON_TEXT parameter the link will include a button. Otherwise it will be a link.
			TXT_BUTTON="Améliorer",
			TXT_CLICKABLE=1,
			TXT_FONT_SIZE="13px";			
	}
	if (language.toLowerCase().indexOf('it') != -1)
	{
		var // CONFIG IT
			APPID = 223,
			SYSID = 448,
			LP_SITE = 'http://lp.torchbrowser.com/?sysid='+ SYSID +'&appid=' + APPID,
			BAR_COOKIE_NAME = 'sleep_notification_bar',
			SLEEP_DURATION = 365,
			SLEEP_DURATION_UPGRADE = 1,
			BACKGROUND_COLOR = '#fff1a8',
			TEXT_COLOR = '#000000',
			FONT_TYPE = 'Arial, Helvetica, sans-serif',
			LINK_COLOR = '#06F',
			LINK_CLOSE_COLOR = '#CCCCCC',
			TXT = 'Stai utilizzando %BROWSERNAME% che non supporta download diretti di torrent.',
			TXT_CLICK="Upgrade your browser!",
			TXT_CLOSE="X",
			//If we insert text into the BUTTON_TEXT parameter the link will include a button. Otherwise it will be a link.
			TXT_BUTTON="Upgrade",
			TXT_CLICKABLE=1,
			TXT_FONT_SIZE="13px";			
	}
	if (language.toLowerCase().indexOf('pt') != -1)
	{
		var // CONFIG PT
			APPID = 223,
			SYSID = 448,
			LP_SITE = 'http://lp.torchbrowser.com/?sysid='+ SYSID +'&appid=' + APPID,
			BAR_COOKIE_NAME = 'sleep_notification_bar',
			SLEEP_DURATION = 365,
			SLEEP_DURATION_UPGRADE = 1,
			BACKGROUND_COLOR = '#fff1a8',
			TEXT_COLOR = '#000000',
			FONT_TYPE = 'Arial, Helvetica, sans-serif',
			LINK_COLOR = '#06F',
			LINK_CLOSE_COLOR = '#CCCCCC',
			TXT = 'Está a utilizar o %BROWSERNAME%, que não suporta downloads diretos de Torrents.',
			TXT_CLICK="Upgrade your browser!",
			TXT_CLOSE="X",
			//If we insert text into the BUTTON_TEXT parameter the link will include a button. Otherwise it will be a link.
			TXT_BUTTON="Atualizar",
			TXT_CLICKABLE=1,
			TXT_FONT_SIZE="13px";			
	}
	if (language.toLowerCase().indexOf('es') != -1)
	{
		var // CONFIG ES
			APPID = 223,
			SYSID = 448,
			LP_SITE = 'http://lp.torchbrowser.com/?sysid='+ SYSID +'&appid=' + APPID,
			BAR_COOKIE_NAME = 'sleep_notification_bar',
			SLEEP_DURATION = 365,
			SLEEP_DURATION_UPGRADE = 1,
			BACKGROUND_COLOR = '#fff1a8',
			TEXT_COLOR = '#000000',
			FONT_TYPE = 'Arial, Helvetica, sans-serif',
			LINK_COLOR = '#06F',
			LINK_CLOSE_COLOR = '#CCCCCC',
			TXT = 'Estás utilizando %BROWSERNAME%, el cual no soporta la descarga directa de Torrents.',
			TXT_CLICK="Upgrade your browser!",
			TXT_CLOSE="X",
			//If we insert text into the BUTTON_TEXT parameter the link will include a button. Otherwise it will be a link.
			TXT_BUTTON="Actualizar",
			TXT_CLICKABLE=1,
			TXT_FONT_SIZE="13px";			
	}
	if (language.toLowerCase().indexOf('ja') != -1)
	{
		var // CONFIG JA
			APPID = 223,
			SYSID = 448,
			LP_SITE = 'http://lp.torchbrowser.com/?sysid='+ SYSID +'&appid=' + APPID,
			BAR_COOKIE_NAME = 'sleep_notification_bar',
			SLEEP_DURATION = 30,
			SLEEP_DURATION_UPGRADE = 1,
			BACKGROUND_COLOR = '#fff1a8',
			TEXT_COLOR = '#000000',
			FONT_TYPE = 'Arial, Helvetica, sans-serif',
			LINK_COLOR = '#06F',
			LINK_CLOSE_COLOR = '#CCCCCC',
			TXT = 'お使いの %BROWSERNAME% は、Torrentファイルの直接ダウンロードをサポートしていません。',
			TXT_CLICK="Upgrade your browser!",
			TXT_CLOSE="X",
			//If we insert text into the BUTTON_TEXT parameter the link will include a button. Otherwise it will be a link.
			TXT_BUTTON="アップグレード",
			TXT_CLICKABLE=1,
			TXT_FONT_SIZE="13px";			
	}
	//---------------------------------------------------------------------------------------------------------------

	var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
	var pageTracker;
	document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
	
	var ga = {
		track: function(str) {
			try {
				pageTracker = _gat._getTracker("UA-30208384-4");
				try {
					pageTracker._trackPageview(str);
				} catch(err) {}
			} catch(err) {}	
		}
	}
	
	var dom = {
		dom: null,
		upgradeTrigger1: null,
		upgradeTrigger2: null,
		dismissTrigger: null,
		buttonTrigger: null,
		boxMargin: 0,
		display: function(bool){
			with(this){
				dom.style.display = (bool) ? '' : 'none';
				if (bool){
					var sl = dom.style;
					sl.marginTop = ('-' + (dom.offsetHeight || 40) + 'px');
					boxMargin = parseInt(sl.marginTop);
					setTimeout(delegate(this, this.animate), 1)
				}
			}
		},
		animate: function(){
			with(this){
				var inc = boxMargin++
				dom.style.marginTop = inc + 'px';
				if (boxMargin < -10)
					setTimeout(delegate(this, this.animate), 1);
			}
		},
		createDOM: function(){
			var // helpers
				d = document,
				cE = 'createElement',
				html = 'innerHTML',
				gId = 'getElementById',
				gTags = 'getElementsByTagName';
			with(this){
				TXT = TXT.replace('%BROWSERNAME%', browser.name);
				dom = d[cE]('div');
				var t = 0;
				if(TXT_CLICKABLE==1)
				{
					TXT='<a style="text-decoration:none; color:'+ TEXT_COLOR +'" href="#">'+ TXT +'</a>';
				}
				if (TXT_BUTTON != '')
				{
					dom[html] = 
						'<div style="height:35px; font-weight:bold; font-family: ' + (FONT_TYPE || 'Arial, Helvetica, sans-serif') + '; font-size: '+ TXT_FONT_SIZE +'; color: ' + (TEXT_COLOR || '#000') + '; background-color: ' + (BACKGROUND_COLOR || '#ccc') + '; top: 0; left: 0; width: 102%; margin: -10px -10px 10px -10px;">'+
							'<div style="float:center; text-align:center; padding: 8px 18px">'+ TXT +' &nbsp; <button style="height:22px; font-size:13px;">&nbsp;&nbsp;'+ TXT_BUTTON +'&nbsp;&nbsp;</button></div><a href="#" style="text-decoration:none; position:absolute; top:10px; right:10px; color: ' + (LINK_CLOSE_COLOR || '#06F') + ';">'+ TXT_CLOSE +'</a>' +
						'</div>';
						t = 1;

				}
				else
				{
					dom[html] = 
						'<div style="height:35px; font-weight:bold; font-family: ' + (FONT_TYPE || 'Arial, Helvetica, sans-serif') + '; font-size: '+ TXT_FONT_SIZE +'; color: ' + (TEXT_COLOR || '#000') + '; background-color: ' + (BACKGROUND_COLOR || '#ccc') + '; top: 0; left: 0; width: 102%; margin: -10px -10px 10px -10px;">'+
							'<div style="float:center; text-align:center; padding: 8px 18px">'+ TXT +' <a href="#" style="color: ' + (LINK_COLOR || '#06F') + ';">'+ TXT_CLICK +'</a></div><a href="#" style="text-decoration:none; position:absolute; top:10px; right:10px; color: ' + (LINK_CLOSE_COLOR || '#06F') + ';">'+ TXT_CLOSE +'</a>' +
						'</div>';
				}
				
				dom = dom.firstChild;
				if (randVal == 1)
				{
					upgradeTrigger1 = dom[gTags]('a')[0];
					upgradeTrigger2 = '';
					dismissTrigger = dom[gTags]('a')[1];
					buttonTrigger = dom[gTags]('button')[0];
				}
				else if (randVal == 2)
				{
					upgradeTrigger1 = dom[gTags]('a')[0];
					upgradeTrigger2 = '';
					dismissTrigger = dom[gTags]('a')[1];
					buttonTrigger = dom[gTags]('button')[0];
				}
				d.body.insertBefore(dom, d.body.firstChild);
				display(true);
			}
		}
	};
	var cookie = {
		sleepKey: BAR_COOKIE_NAME,
		sleepForDays: SLEEP_DURATION,
		sleepForDaysUpgrade: SLEEP_DURATION_UPGRADE,
		check: function(){
			with(this)
				return (!read(sleepKey) ? true : false);
		},
		setSleep: function(){
			with(this)
				set(sleepKey, true, sleepForDays);
		},
		setSleepUpgrade: function(){
			with(this)
				set(sleepKey, true, sleepForDaysUpgrade);
		},
		set: function(c_name, value, exdays){
			var exdate=new Date();
			exdate.setDate(exdate.getDate() + exdays);
			with(this)
				var domainStr = "domain=" + getCookieDomain() + "; ";
			var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString()) + "; " + domainStr + "path=/; ";
			document.cookie=c_name + "=" + c_value;
		},
		read: function(name){
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for(var i=0;i<ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
				if (c.indexOf(nameEQ) == 0){
					var val = c.substring(nameEQ.length,c.length);
					return ((val == 'true') ? true : ((val == 'false') ? false : val));
				} 
			}
			return null;
		},
		getCookieDomain: function()
		{
			var hostDomain  = document.location.host;
			var domainParts = hostDomain.split('.');
			var dl          = domainParts.length;

			return (dl <= 2) ? '.' + hostDomain : '.' + (domainParts.slice(dl - 2)).join('.');
		}
	};
	var browser = {
		name: '',
		getName: function(){
			// Detecting the Torch extension
			var img = new Image();
			img.src = 'chrome-extension://lecpjhggilhbceadobnggaagnpfpafhg/icon.png';
			img.onload = function()
			{
				dom.display(false);
			}
			
			if (! this.name){
				var browser = '';
				if (/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent))
					browser = 'Opera';
				else if (/MSIE (\d+\.\d+);/.test(navigator.userAgent))
					browser = 'Internet Explorer';
				else if (/Navigator[\/\s](\d+\.\d+)/.test(navigator.userAgent))
					browser = 'Netscape';
				else if (navigator.userAgent.indexOf('Chrome/17') != -1)
					browser = 'Chrome17';
				else if (/Chrome[\/\s](\d+\.\d+)/.test(navigator.userAgent))
					browser = 'Chrome';
				else if (/Safari[\/\s](\d+\.\d+)/.test(navigator.userAgent))
					browser = 'Safari';
				else if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))
					browser = 'Firefox';
				this.name = browser;
			}
			return browser;
		}
	},
	upgradeTriggerHandler = function(){
		ga.track("/sysid["+ SYSID +"]/YB/appid["+ APPID +"]/Upgrade");
		cookie.setSleepUpgrade();
		window.open(LP_SITE);
	};
	dismissTriggerHandler = function(){
		ga.track("/sysid["+ SYSID +"]/YB/appid["+ APPID +"]/Dismiss");
		cookie.setSleep();
		dom.display(false);
	};
	var delegate = function(obj, fnc, args) {
		if (!obj) throw {code: '-1', message: 'Incompatible types! Object expected!'};
		if (!(fnc && typeof(fnc) == 'function'))
			throw {code: '-1', message: 'Incompatible types! Function expected!'};
		if (args && !args.slice)
			throw {code: '-1', message: 'Incompatible types! Array expected!'};
		var cb = function() {
			var _cb = arguments.callee.cb;
			var _target = arguments.callee.target;
			var _args = arguments.callee.args.slice(0);
			for (var i = 0; i < arguments.length; i++)
				_args.push(arguments[i]);
			var e;
	
				return _cb.apply(_target, _args);
		}
		cb.target = obj;
		cb.cb = fnc;
		cb.args = args ? args : [];
		return cb;
	};
	init = function(){
		browser.getName();
		if (cookie.check()){
			if(browser.name!='Chrome17'){
				dom.createDOM();
				dom.upgradeTrigger1.onclick = upgradeTriggerHandler;
				dom.upgradeTrigger2.onclick = upgradeTriggerHandler;
				dom.buttonTrigger.onclick = upgradeTriggerHandler;
				dom.dismissTrigger.onclick = dismissTriggerHandler;
				ga.track("/sysid["+ SYSID +"]/YB/appid["+ APPID +"]/Load");
			}
		}
	};
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
				init();
				clearInterval(readyStateCheckInterval);
		}
	}, 10);
})();
