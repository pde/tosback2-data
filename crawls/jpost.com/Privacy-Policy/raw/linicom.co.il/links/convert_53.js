

var Linicom = {
	"_root" : 'http://linicom.co.il',
	"_uid"  : 53,
	"_options" : {"blacklist":["google","Erate","213.8","taboola","outbrain","sekindo","jpost","zedo","adclick"],"convert":"remote","print":false,"regex":null,"skip":0},
	"_wasShown" : false,
	"_showDialog"  : function() {
		var url = Linicom._root + '/external/?u=' + Linicom._uid + '&a=' + encodeURIComponent('linicom://print') ;
		if(typeof(window.showModalDialog) !== 'undefined') {
			window.showModalDialog(url,0,'dialogHeight:550px;dialogWidth:400px; location:no');
		}
		else {
			window.open(url,null,'height=550,width=400,menubar=no,location=no');
		}

	},
	"_onPrintEvent" : function()  {
		if(!Linicom._wasShown) {
			Linicom._showDialog();
		}
		Linicom._wasShown = false;
	},
	"_setLink" : function(a,newlink)
	{
		if(navigator.appName == 'Microsoft Internet Explorer') {
			var old = a.innerHTML ;
			if(old.indexOf('<')==-1) {
				a.href=newlink;
				a.innerHTML = old;
				return
			}
		}
		a.href=newlink;
	},
	"_onLoad" : function() {
		if(Linicom._uid == -1)
			return;
		var convert = 'remote';
		var print = false;
		var regex = null;
		var blacklist = ['www.googleadservices.com'];
		var skip = 0;
		var options = Linicom._options;
		var root = Linicom._root;
		var uid = Linicom._uid;

		if('convert' in options)
			convert = options.convert;
		if('print' in options)
			print = options.print;
		if('regex' in options)
			regex = new RegExp(options.regex);
		if('blacklist' in options)
			blacklist = blacklist.concat(options.blacklist);
		if('skip' in options)
			skip = options.skip;

		if(convert!='none') { // rewrite URLs
			var links = document.getElementsByTagName('a');
			var siteUrl = window.location.protocol + '//' + window.location.host + '/';
			var http_only = new RegExp('^(f|ht)tps?://');
			var count = 0;
			linksloop:
			for(var i=0;i<links.length;i++) {
				var url = links[i].href;
				if(!http_only.test(url))
					continue;
				if(url.indexOf(root) == 0)
					continue;
				if(convert =='remote'&& url.indexOf(siteUrl) == 0)
					continue;
				if(regex != null && regex.test(url))
					continue;
				for(var j=0;j<blacklist.length;j++) {
					if(url.indexOf(blacklist[j])!=-1)
						continue linksloop;
				}
				if(count % (skip + 1) == 0) {
					url = root + '/external/?u=' + uid + '&a=' + encodeURIComponent(url) ;
					Linicom._setLink(links[i],url);
				}
				count ++;			
			}
		}
		if(print==1) {
			window.onbeforeprint = Linicom._onPrintEvent;
		}
	},
	"register" : function()
	{
		if(document.addEventListener) {
			document.addEventListener('DOMContentLoaded', function(){
				document.removeEventListener('DOMContentLoaded',arguments.callee,false);
				Linicom._onLoad();
			},false);
		}
		else if(document.attachEvent) {
			document.attachEvent('onreadystatechange', function(){
				if(document.readyState != 'complete')
					return;
				document.detachEvent('onreadystatechange',arguments.callee);
				Linicom._onLoad();
			});
		}
		else {
			if(typeof window.onload == 'function') {
				var oldfunc = window.onload;
				window.onload=function() {
					oldfunc();
					Linicom._onLoad();
				};
			}
			else {
				window.onload = Linicom._onLoad;
			}
		}	
	},
	"showPrintAdvertisement" : function() {
		Linicom._showDialog();
		Linicom._wasShown = true;
	}
};

Linicom.register();

