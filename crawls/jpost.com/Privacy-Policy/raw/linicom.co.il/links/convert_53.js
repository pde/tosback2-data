
if(typeof Linicom === 'undefined') {
    Linicom = {
	"_root" : 'http://linicom.co.il',
	"_uid"  : 53,
	"_options" : {"blacklist":["google","Erate","213.8","taboola","outbrain","sekindo","jpost","zedo","adclick"],"convert":"remote","print":false,"regex":null,"skip":0},
	"_wasShown" : false,
	"_ready" : false,
	"_showDialog"  : function() {
		if(!('print' in Linicom._options) || Linicom._options.print==false)
			return;
		var url = Linicom._root + '/external/?u=' + Linicom._uid + '&a=' + encodeURIComponent('linicom://print') ;
		if(typeof(window.showModalDialog) !== 'undefined') {
			window.showModalDialog(url,0,'dialogHeight:550px;dialogWidth:400px; location:no');
		}
		else {
			window.open(url,null,'height=550,width=400,menubar=no,location=no');
		}

	},
	"_queryRegex" : (function(){
		var sub_delims="['!,;=\\$\\(\\)\\*\\+&]";
		var gen_delims="[\\:\\/\\?\\#\\[\\]\\@]";
		var reserverd="(" + gen_delims + "|" + sub_delims + ")";
		var unreserved="[a-zA-Z_0-9\\-\\.~]";
		var pct_encoded="%[0-9a-fA-F][0-9a-fA-F]";
		var pchar="(" + unreserved + "|" + pct_encoded + "|" + sub_delims + "|:|\\@)";
		var query="(" + pchar + "|/|\\?)*";
		var fragment="(" + pchar + "|/|\\?)*";
		var segment="(" + pchar + ")*";
		var segment_nz="(" + pchar + ")+";
		var segment_nz_nc="(" + unreserved + "|" + pct_encoded + "|" + sub_delims + "|" + "\\@)+";
		var path_rootless = "(" + segment_nz + "(/" + segment + ")*)";
		var path_noscheme = "(" + segment_nz_nc + "(/"+ segment +")*)";
		var path_absolute = "/("+ segment_nz + "(/"+ segment +")*)?";
		var path_abempty  = "(/" + segment+")*";
		var path="(" + path_abempty + "|" + path_absolute + "|" + path_noscheme + "|" + path_rootless +")?";
		var reg_name = "(" + unreserved + "|" + pct_encoded + "|" + sub_delims + ")*";
		var dec_octet = "([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])";
		var ipv4addr = "(" + dec_octet + "\\." + dec_octet + "\\." + dec_octet + "\\." + dec_octet +")";
		var port = "([0-9]*)";
		var host = "(" + ipv4addr + "|" + reg_name + ")";
		var userinfo= "(" + unreserved + "|" + pct_encoded + "|" + sub_delims +"|\\:)*";
		var authority = "((" + userinfo +"\\@)?" + host + "(\\:"+port+")?)";
		var relative_part = "(//" + authority + path_abempty 
						+"|"+path_absolute
						+"|"+path_noscheme
						+")?";
		var relative_ref = "(" + relative_part + "(\\?" + query + ")?(#" + fragment +")?)";


		var hier_part = "(//" + authority + path_abempty 
						+"|"+path_absolute
						+"|"+path_rootless
						+")?";
		var uri = "^((f|ht)tps?:" +  hier_part + "(\\?" + query + ")?(#" + fragment +")?)$";
		return new RegExp(uri);
	})(),
	"_onPrintEvent" : function()  {
		if(!Linicom._wasShown) {
			Linicom._showDialog();
		}
		Linicom._wasShown = false;
	},
	"_trueSetLink" : function(a,newlink)
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
	"_setLink" : function(a,newlink)
	{
		Linicom._trueSetLink(a,newlink);
		if(Linicom.ynethack) {
			a.onclick=function() {
				Linicom._trueSetLink(a,newlink);
				return true;
			};
		}
	},
	"_onLoad" : function() {
		if(Linicom._ready)
			return;
		Linicom._ready = true;
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
		Linicom.ynethack=false;
		for(var i=0;i<blacklist.length;i++) {
			if(blacklist[i]==='ynethack') {
				Linicom.ynethack = true;
				break;
			}
		}

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
				if(!Linicom._queryRegex.test(url))
					continue;
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
		if(typeof Linicom.convertWords !== 'undefined') {
			Linicom.convertWords.handle();
		}
	},
	"_addReadyEventListener" : function(obj,event)
	{
		if(obj.addEventListener) {
			obj.addEventListener(event, function(){
				obj.removeEventListener(event,arguments.callee,false);
				Linicom._onLoad();
			},false);
		}
		else if(obj.attachEvent) {
			obj.attachEvent(event, function(){
				if(document.readyState != 'complete')
					return;
				obj.detachEvent(event,arguments.callee);
				Linicom._onLoad();
			});
		}
		else {
			var callback = function() {
				if(document.readyState != 'complete')  {
					setTimeout(callback,100);
					return;
				}
				Linicom._onLoad();
			};
			callback();
		}
	},
	"register" : function()
	{
		if(document.readyState === 'complete' || document.readyState === 'loaded') {
			Linicom._onLoad();
		}
		else if(document.addEventListener) {
			Linicom._addReadyEventListener(document,'DOMContentLoaded');
			Linicom._addReadyEventListener(window,'load');
		}
		else {
			Linicom._addReadyEventListener(document,'onreadystatechange');
			Linicom._addReadyEventListener(window,'load');
		}
	},
	"showPrintAdvertisement" : function() {
		Linicom._showDialog();
		Linicom._wasShown = true;
	}
    };
    
    
    
    Linicom.register();
}
