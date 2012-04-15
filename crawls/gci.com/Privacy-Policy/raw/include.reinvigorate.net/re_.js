
if (typeof reinvigorate == "undefined") var reinvigorate =
{
	host: "track.reinvigorate.net"
	, port: 80
	, wkey: ""
	, img_src: ""
	, wkeys: {}
	, session:
	{
		user_agent: ""
		, url: ""
		, referrer: ""
		, browser: ""
		, browser_version: ""
		, browser_ident: ""
		, platform: ""
		, platform_version: ""
		, unique: false
		, search_engine: ""
		, search_keyword: ""
		, begin: new Date()
	}
	, env:
	{
		duration:
		{
			unique: 86400
			,return_visitor: 86400*365
		}
		, key:
		{
			ret: ""
			, ses: ""
			, ses_index: ""
			, visit_time: ""
		}
	}
	, jobs: []
	, cookie_exists: function(n)
	{
		return document.cookie.indexOf(n + "=") != -1;
	}
	, get_cookie: function(n)
	{
		var b, e, n, t;
		if (document.cookie == "")
			return false;
		with (document.cookie)
		{
			if ((b = indexOf(n + "=")) == -1)
				return false;
			if ((e = substring(b).indexOf(";")) == -1)
				return unescape(substring(b + n.length + 1));
			t = substring(b + n.length + 1);
			return unescape(t.substring(0,t.indexOf(";")));
		}
		return  "";
	}, set_cookie: function(name, value, expires, path, domain, secure)
	{
		var whence = "";
		if (expires)
		{
			var the_date = new Date();
			the_date.setTime(the_date.getTime()+(expires*1000));
			whence = the_date.toGMTString();
		}
	    var cook = name + "=" + escape(value) + (expires ? "; expires=" + whence : "") + (path ? "; path=" + path : "") + (domain ? "; domain=" + domain : "") + (secure ? "secure" : "");
	    document.cookie = cook;
	}
	, add: function(func)
 	{
 		reinvigorate.jobs.push(func);
 	}
	, url_filter: function(url)
	{
		return url.replace(/^https?:\/\/(www\.)?/,"http://");
	}
	, track: function(_wkey)
 	{
		if (typeof reinvigorate.wkeys[_wkey] == "undefined")
			reinvigorate.wkeys[_wkey] = 1;
		else
			return;
	
		var _e;
		
		reinvigorate.wkey = _wkey;

		with (reinvigorate.env.key)
		{
			ret = _wkey + "_r";
			ses = _wkey + "_s";
			ses_index = _wkey + "_i";
			visit_time = _wkey + "_vt";
			
			if (!reinvigorate.cookie_exists(ret))
				reinvigorate.set_cookie(ret,0,reinvigorate.env.duration.return_visitor,"/");
			else if (!reinvigorate.get_cookie(ses))
				reinvigorate.set_cookie(ret,parseInt(reinvigorate.get_cookie(ret)) + 1,reinvigorate.env.duration.return_visitor,"/");

			if (!reinvigorate.get_cookie(ses))
			{
				reinvigorate.set_cookie(ses,reinv_util.sid(),reinvigorate.env.duration.unique,"/");
				reinvigorate.set_cookie(ses_index,1,reinvigorate.env.duration.unique,"/");
				reinvigorate.session.unique = true;
			} else
			{
				reinvigorate.set_cookie(ses_index,parseInt(reinvigorate.get_cookie(ses_index)) + 1,reinvigorate.env.duration.unique,"/");
			}
		}
		
		with (reinvigorate.session)
		{
			user_agent = navigator.userAgent.toLowerCase();
			url = (window.location + "").substring(0,250);
		
			reinv_util.get_browser();
			reinv_util.get_platform();
		
			// find referrer
			try
			{
				if (parent.document.referrer != undefined && unique)
	                referrer = parent.document.referrer + "";
			} catch (_e) {}
			
			try
			{
				if (referrer == "")
					referrer = document.referrer + "";
				
				// Try not to track referrers from the same hostname
				// commented out since this was causing issues
				//if (referrer.indexOf(location.hostname) != -1)
				//	referrer = "";
			} catch (_e) {}
			
			if (referrer == "blockedReferrer")
				referrer = "";
			
			// Don't count hit if the request is from a user viewing heatmaps
			if ((new RegExp(/heatmap(\/[0-9]*)?$/)).exec(referrer))
				return;

			// was the referrer from a search engine?
			if (referrer != "")
			{
				var tlds = ["ac","ad","ae","af","ag","ai","al","am","an","ao","aq","ar","as","at","au","aw","ax","az","ba","bb","bd","be","bf","bg","bh","bi"
				,"bj","bm","bn","bo","br","bs","bt","bv","bw","by","bz","ca","cc","cd","cf","cg","ch","ci","ck","cl","cm","cn","co","cr","cu","cv"
				,"cx","cy","cz","de","dj","dk","dm","do","dz","ec","ee","eg","er","es","et","eu","fi","fj","fk","fm","fo","fr","ga","gb","gd","ge"
				,"gf","gg","gh","gi","gl","gm","gn","gp","gq","gr","gs","gt","gu","gw","gy","hk","hm","hn","hr","ht","hu","id","ie","il","im","in"
				,"io","iq","ir","is","it","je","jm","jo","jp","ke","kg","kh","ki","km","kn","kp","kr","kw","ky","kz","la","lb","lc","li","lk","lr"
				,"ls","lt","lu","lv","ly","ma","mc","md","me","mg","mh","mk","ml","mm","mn","mo","mp","mq","mr","ms","mt","mu","mv","mw","mx","my"
				,"mz","na","nc","ne","nf","ng","ni","nl","no","np","nr","nu","nz","om","pa","pe","pf","pg","ph","pk","pl","pm","pn","pr","ps","pt"
				,"pw","py","qa","re","ro","rs","ru","rw","sa","sb","sc","sd","se","sg","sh","si","sj","sk","sl","sm","sn","so","sr","st","su","sv"
				,"sy","sz","tc","td","tf","tg","th","tj","tk","tl","tm","tn","to","tp","tr","tt","tv","tw","tz","ua","ug","uk","us","uy","uz","va"
				,"vc","ve","vg","vi","vn","vu","wf","ws","ye","yt","za","zm","zw"
				,"aero","asia","biz","cat","com","coop","edu","gov","info","int","jobs","mil","mobi","museum","name","net","org","pro","tel","travel",];

				try
				{
					var matches;
					var exp = new RegExp(/^([a-zA-Z]+:\/\/)([^\/]+)/);
					
					if (matches = exp.exec(referrer))
					{
						var hn = matches[2].toLowerCase().split(".").reverse();
						var x = "";
						while (hn.length > 0)
						{
							x = hn.shift();
							var istld = false;
							for (var tld in tlds)
								if (tlds[tld] == x)
									istld = true;
							
							if (!istld)
								break;
						}
						
						var k = reinv_util.search_engines[x];
						
						var v = "";
						if (typeof k != "undefined")
						{
							var pos = referrer.indexOf("?"+k[1]+"=");
							if (pos == -1)
								pos = referrer.indexOf("&"+k[1]+"=");
								
							if (pos > -1)
							{
								v = referrer.substr(pos+k[1].length+2);
								pos = v.indexOf("&");
								if (pos > -1)
									v = v.substr(0,pos);
								v = decodeURIComponent(v.replace(/\+/g," "));
							}
						}
					}
					
					if (v != "")
					{
						search_engine = k[0];
						search_keyword = v;
					}
				} catch (_e) {}
			}
		}

		// build output map
 		var map = {};

		map["std"] = 1;
		map["wkey"] = reinvigorate.wkey;
		map["ses"] = reinvigorate.get_cookie(reinvigorate.env.key.ses);
		map["ses_index"] = parseInt(reinvigorate.get_cookie(reinvigorate.env.key.ses_index));
		map["cook"] = !!document.cookie;
		map["lt"] = reinv_util.ltime();
		map["url"] = reinvigorate.url_filter(reinvigorate.session.url);
		map["title"] = (document.title && document.title != "") ? document.title : "Untitled";

		if (typeof re_name_tag != "undefined")
			map["nt"] = re_name_tag;
		if (typeof re_context_tag != "undefined")
			map["ct"] = re_context_tag;
		if (typeof re_comment_tag != "undefined")
			map["cmmt"] = re_comment_tag;
		if (typeof re_context_tag != "undefined")
			map["nwusr"] = re_new_user_tag;
		if (typeof re_purchase_tag != "undefined")
			map["prchs"] = re_purchase_tag;
		
		function trim(str)
		{
			return str.replace(/^\s*|\s*$/g,'');
		}
		
		with (reinvigorate.session)
		{
			map["bwr"] = trim(browser);
			map["bwrv"] = trim(browser_version);
			map["os"] = trim(platform);
			map["osv"] = trim(platform_version);
		
			if (unique)
			{
				map["u"] = "1";
				map["ret_index"] = parseInt(reinvigorate.get_cookie(reinvigorate.env.key.ret));
				map["tz"] = (new Date()).getTimezoneOffset()/60;
				map["resw"] = screen.width;
				map["resh"] = screen.height;
			
				if (search_keyword != "")
				{
					map["se"] = search_engine;
					map["kw"] = search_keyword;
				}
			
				if (referrer != ""
					&& reinv_util.server_name(referrer)
					!= reinv_util.server_name(url))
					map["ref"] = referrer;
			} else
			{
				map["vt"] = Math.floor((reinvigorate.session.begin.getTime()-parseInt(reinvigorate.get_cookie(reinvigorate.env.key.visit_time)))/1000);
				if (document.referrer != undefined)
					map["pp"] = reinvigorate.url_filter(document.referrer);
			}
		}
		
		reinvigorate.set_cookie(reinvigorate.env.key.visit_time, reinvigorate.session.begin.getTime(),86400,"/");

		// modules
 		for (var i=0;i<reinvigorate.jobs.length;++i)
 		{
 			var r = reinvigorate.jobs[i]();
			if (typeof r == "object")
			{
	 			for (var k in r)
				{
					try // safety
					{
 						map[k] = r[k];
					} catch (_e) {}
				}
			}
 		}

		map["rnd"] = Math.floor(Math.random()*214748364);

 		var buf = "";
 		for (var k in map)
 			buf += encodeURIComponent(k) + "=" + encodeURIComponent(map[k]) + "&";
 		if (buf.length > 0)
 			buf = buf.substr(0,buf.length-1);

		var proto = document.location.protocol == "https:" ? "https" : "http";
		reinvigorate.img_src = proto + "://" + reinvigorate.host + (reinvigorate.port == 80 ? "" : (":"+reinvigorate.port)) + "/re_/ping?" + buf;
		var img = new Image(1,1);
		img.src = reinvigorate.img_src;
 	}
};


var reinv_util =
{
	ltime: function()
	{
		var d = new Date();
		var hr = d.getHours()%12;
		return (hr == 0 ? 12 : hr) + ":" + (d.getMinutes().toString().length == 1 ? "0" : "") + d.getMinutes() + " " + (d.getHours() < 12 ? "am" : "pm");
	}
	, sid: function()
	{
		return Math.floor(Math.random()*214748364);
	}
	, get_ua: function(s)
	{
		return reinvigorate.session.user_agent.indexOf(s) + 1;
	}
	, search_engines:
	{
		"google":		["Google","q"]
		,"yahoo":		["Yahoo","p"]
		,"bing":		["Bing","q"]
		,"msn":			["MSN","q"]
		,"aol":			["AOL","q"]
		,"lycos":		["Lycos","query"]
		,"ask":			["Ask","q"]
		,"altavista":	["AltaVista","q"]
		,"search": 		["Search.com","q"]
		,"netscape":	["Netscape","s"]
		,"cnn": 		["CNN","query"]
		,"looksmart":	["LookSmart","qt"]
		,"about": 		["About","terms"]
		,"mamma": 		["Mamma","query"]
		,"alltheweb":	["AlltheWeb","q"]
		,"gigablast":	["Gigablast","q"]
		,"voila":		["Voila","kw"]
		,"virgilio":	["Virgilio","qs"]
		,"live":		["Live","q"]
		,"baidu":		["Baidu","wd"]
		,"seznam": 		["Seznam","w"]
		,"yandex": 		["Yandex","text"]
		,"najdi": 		["Najdi","q"]
	}
	, server_name: function(url)
	{
		var matches;
		var exp = new RegExp(/^([a-zA-Z]+:\/\/)(www\.)?([^\/]*)/);
		if (matches = exp.exec(url))
			return matches[3];

		return "";
	}
	, get_browser: function()
	{
		with (reinvigorate.session)
		{
			// browser
			if (reinv_util.get_ua("konqueror"))
			{
				browser = "Konqueror";
				browser_ident = "konqueror";
			} else if (reinv_util.get_ua("chrome"))
			{
				browser = "Google Chrome";
				browser_ident = "chrome";
			} else if (reinv_util.get_ua("safari"))
			{
				browser = "Safari";
				browser_ident = "safari";
			} else if (reinv_util.get_ua("applewebkit"))
			{
				browser = "Safari";
				browser_ident = "applewebkit";
			}  else if (reinv_util.get_ua("opera"))
			{
				browser = "Opera";
				browser_ident = "opera";
			} else if (reinv_util.get_ua("webtv"))
			{
				browser = "WebTV";
				browser_ident = "webtv";
			} else if (reinv_util.get_ua("firefox"))
			{
				browser = "Firefox";
				browser_ident = "firefox";
			} else if (reinv_util.get_ua("msie"))
			{
				browser = "Internet Explorer";
				browser_ident = "msie";
			} else if (reinv_util.get_ua("omniweb"))
			{	
				browser = "OmniWeb";
				browser_ident = "omniweb";
			} else if (reinv_util.get_ua("netscape"))
			{
				browser = "Netscape";
				browser_ident = "netscape";
			} else
			{
				browser = "Unknown";
			}

			// browser version
			var i, ua, b, cr;
			if (browser_ident == "Netscape Navigator" && document.layers)
			{
				browser_version = 4;
			} else if (!((i = user_agent.indexOf(browser_ident+" ")) >= 0 || (i = user_agent.indexOf(browser_ident+"/")) >= 0))
			{
				browser_version = "";
			} else
			{
				ua = user_agent.substring(i + browser_ident.length + 1);
				if (ua.charAt(0) == "v")
					ua = ua.substring(1);
				b = "";
				for (cnt=0;cnt<ua.length;cnt++)
				{
					cr = ua.charAt(cnt);
					if ((cr >= 0 && cr <= 9) || cr == ".")
						b += cr;
					else
						break;
				}
				browser_version = b;
			}
			
			if (browser_ident == "opera" && browser_version == "")
			{
				var exp = new RegExp(/^opera\/([0-9.]+)/);
				var matches;
				if ((matches = exp.exec(user_agent)) && matches.length == 2)
					browser_version = matches[1];
			}
		}
	}
	, get_platform: function()
	{
		with (reinvigorate.session)
		{
			// platform
			if (reinv_util.get_ua("iphone"))
				platform = "iPhone";
			else if (reinv_util.get_ua("ipad"))
				platform = "iPad";
			else if (reinv_util.get_ua("sunos"))
				platform = "SunOS";
			else if (reinv_util.get_ua("freebsd") || reinv_util.get_ua("openbsd"))
				platform = "BSD";
			else if (reinv_util.get_ua("linux"))
				platform = "Linux";
			else if (reinv_util.get_ua("mac") || reinv_util.get_ua("ppc"))
				platform = "Mac";
			else if (reinv_util.get_ua("x11"))
				platform = "UNIX";
			else if (reinv_util.get_ua("win"))
				platform = "Windows";
			else if (reinv_util.get_ua("nintendo wii"))
				platform = "Nintendo Wii";
			else if (reinv_util.get_ua("playstation 3"))
				platform = "Playstation 3";
			else if (reinv_util.get_ua("playstation portable"))
				platform = "PlayStation Portable";
			else
				platform = "";
			
			// platform version
			var os = platform;
	
			if (os == "Windows")
			{
				if (user_agent.indexOf("win3.11") != -1 || user_agent.indexOf("windows 3.1") != -1)
					platform_version = "3.1";
				else if (user_agent.indexOf("winnt3.51") != -1)
					platform_version = "NT 3.11";
				else if (user_agent.indexOf("winnt4.0") != -1)
					platform_version = "4.0";
				else if (user_agent.indexOf("win95") != -1 || user_agent.indexOf("windows 95") != -1)
					platform_version = "95";
				else if (user_agent.indexOf("win98") != -1 || user_agent.indexOf("windows 98") != -1)
					platform_version = "98";
				else if (user_agent.indexOf("win 9x 4.90") != -1)
					platform_version = "Millennium Edition";
				else if (user_agent.indexOf("nt 5.0") != -1 || user_agent.indexOf("windows 2000") != -1)
					platform_version = "2000";
				else if (user_agent.indexOf("nt 5.1") != -1)
					platform_version = "XP";
				else if (user_agent.indexOf("nt 5.2") != -1)
					platform_version = "Server 2003 / XP Pro (x64 Edition)";
				else if (user_agent.indexOf("nt 6.0") != -1)
					platform_version = "Vista";
				else if (user_agent.indexOf("nt 6.1") != -1)
					platform_version = "7";
				else if (user_agent.indexOf("win32") != -1)
					platform_version = "XP";
				else if (user_agent.indexOf("windows nt") != -1)
					platform_version = "NT";
			} else if (os == "Mac" || os == "iPhone")
			{
				var exp = new RegExp(/os( x)? ([0-9._]+)/);
				var matches;
				if ((matches = exp.exec(user_agent)) && matches.length == 3)
					platform_version = matches[2].replace(/_/g,".");

			} else if (os == "SunOS")
			{
				var exp = new RegExp(/sunos ([0-9.]+)/);
				var matches;
				if ((matches = exp.exec(user_agent)) && matches.length == 2)
					platform_version = matches[1];
			}
		}
	}
};


reinvigorate.add(function()
{
	re_heatmap_click_cnt=0;
	var heatmap_click_event = function(e)
	{
		if(!e)
			e = window.event;
		var w = document.clientWidth !== undefined ? document.clientWidth : window.innerWidth;
		var h = document.clientHeight !== undefined ? document.clientHeight : window.innerHeight;
		var scrollx = window.pageXOffset === undefined ? document.scrollLeft : window.pageXOffset;
		var scrolly = window.pageYOffset === undefined ? document.scrollTop : window.pageYOffset;
		if(e.clientX > w || e.clientX < 0 || e.clientY > h || e.clientY < 0 || e.clientX == "NaN" || scrollx == "NaN" || w == "NaN" || h == "Nan")
			return;
		var node = false;
		if (e.target)
			node = e.target;
		else if (e.srcElement)
			node = e.srcElement;
		var ele_code = "";
		while (node)
		{
			ele_code += node.tagName;
			if (typeof node.src != "undefined")
				ele_code += node.src;
			if (typeof node.name != "undefined")
				ele_code += node.name;
			if (typeof node.href != "undefined")
				ele_code += node.href;
			node = node.parentNode;
			if (typeof node.tagName == "undefined")
				break;
		}
		
		var params = 'heatmap=1&wkey=' + encodeURIComponent(reinvigorate.wkey) + '&x=' + (e.clientX + scrollx) + '&y=' + (e.clientY + scrolly) + '&w=' + w + '&h=' + h + '&url=' + encodeURIComponent(reinvigorate.url_filter(reinvigorate.session.url)) + '&title=' + encodeURIComponent((document.title && document.title != '') ? document.title : 'Untitled') + "&elecode=" + encodeURIComponent(ele_code);
		if (((e.clientX + scrollx)+(e.clientY + scrolly))*w*h == 0)
			return;
		var img = new Image(1,1);
		var proto = document.location.protocol == "https:" ? "https" : "http";
		img.src = proto + '://' + reinvigorate.host + (reinvigorate.port == 80 ? '' : (':'+reinvigorate.port)) + '/re_/ping?' + params;
	}
	if (document.addEventListener)
		document.addEventListener('mouseup', heatmap_click_event, false);
	else if (document.attachEvent)
		document.attachEvent('onmouseup', heatmap_click_event);
	return {};
});

function log_region()
{
	var map = {};
	if (reinvigorate.session.unique)
	{
		map["tz"] = ((new Date()).getTimezoneOffset()/60)+"";
		if (navigator.language)
			map["lang"] = navigator.language.toLowerCase();
	}
	return map;
}
reinvigorate.add(log_region);










///// Legacy  ////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////



var _re_script_v = 1.5;

var re_host = "stats.reinvigorate.net";

var re_u_expires = 86400;
var re_r_expires = 86400*365;


var re_unique = 0;

var re_ua = navigator.userAgent.toLowerCase();

var re_browser_ident = "";

if (typeof(re_name_tag) == "undefined")
	var re_name_tag = "";
if (typeof(re_context_tag) == "undefined")
	var re_context_tag = "";
if (typeof(re_comment_tag) == "undefined")
	var re_comment_tag = "";
if (typeof(re_new_user_tag) == "undefined")
	var re_new_user_tag = "";
if (typeof(re_purchase_tag) == "undefined")
	var re_purchase_tag = "";

function re_ua_get(s)
{
	return re_ua.indexOf(s) + 1;
}

function re_cookie_exists(n)
{
	return ((document.cookie.indexOf(n + "=") == -1) ? false : true);
}

function re_get_cookie(n)
{
	var b, e, n, t;
	
	if (document.cookie == "")
		return false;

	with (document.cookie)
	{
		if ((b = indexOf(n + "=")) == -1)
			return false;
		if ((e = substring(b).indexOf(";")) == -1)
			return unescape(substring(b + n.length + 1));
		t = substring(b + n.length + 1);
		return unescape(t.substring(0,t.indexOf(";")));
	}
	
	return  "";
}

function re_set_cookie(name, value, expires, path, domain, secure)
{
	var whence = "";
	if (expires)
	{
		var the_date = new Date();
		the_date.setTime(the_date.getTime()+(expires*1000));
		whence = the_date.toGMTString();
	}
	
    var cook = name + "=" + escape(value) + (expires ? "; expires=" + whence : "") + (path ? "; path=" + path : "") + (domain ? "; domain=" + domain : "") + (secure ? "secure" : "");
    document.cookie = cook;
}


function re_add_event(obj, evnt, func)
{
	var oldobj = obj[evnt];
	if (typeof oldfrm != 'function')
	{
		obj[evnt] = func;
	} else
	{
		obj[evnt] = function()
		{
			oldfrm();
			func();
		}
	}
}

function re_make_comment(name, email, url, comment)
{
	if (name == "")
		name = "Anonymous";
	
	var context = url;
	if (context == "")
		url = "mailto:" + email;
	
	if (name != "Anonymous")
	{
		re_set_cookie("_reun",name,86400*365,"/");
		
		if (context != "")
			re_set_cookie("_rectx",context,86400*365,"/");
	}
	
	comment = comment.substr(0,155);
	
	re_set_cookie("_recmt",comment,60*60*2,"/");
}

function re_auto_tag(usernames, contexts)
{
	var nametag="";
	for (var i=0;i<usernames.length;++i)
	{
		if (re_cookie_exists(usernames[i]) && re_get_cookie(usernames[i]) != "")
		{
			nametag = re_get_cookie(usernames[i]);
			break;
		}
	}

	var context="";
	for (var i=0;i<contexts.length;++i)
	{
		if (re_cookie_exists(contexts[i]) && re_get_cookie(contexts[i]) != "")
		{
			context = re_get_cookie(contexts[i]);
			break;
		}
	}
	
	
	//
	//re_name_tag = "n/a";
	//re_context_tag = "n/a";
	//re_comment_tag = "n/a";
	//

	if (nametag != "" && re_name_tag == "")
		re_name_tag = nametag;
	
	if (context != "" && re_context_tag == "")
		re_context_tag = context;

	
	if (re_cookie_exists("_recmt") && re_get_cookie("_recmt") != "")
	{
		re_comment_tag = re_get_cookie("_recmt");
		re_set_cookie("_recmt","",0,"/");
	}
	
	//alert(re_name_tag + "\n" + re_context_tag + "\n" + re_comment_tag);
}

function re_mt_platform() // Movable Type
{
	re_add_event(window, "onload", function()
		{
			var btn = document.getElementById("comment-post");
			var f = document.forms["comments_form"];

			if (!btn && typeof f != "undefined")
				return;

			re_add_event(btn, "onclick", function()
				{
					re_make_comment(f["comment-author"].value, f["comment-email"].value, f["comment-url"].value, f["comment-text"].value);
				});
		} );
		
	re_auto_tag(new Array("_reun","mtcmtauth"), new Array("_rectx","mtcmthome","mtcmtmail"));
}

function re_tt_platform() // Text Pattern
{
	re_add_event(window, "onload", function()
		{
			var f = document.getElementById("txpCommentInputForm");
			if (typeof f["submit"] == "undefined")
				return;
			
			var msg = "";
			var a = f.getElementsByTagName("textarea");
			
			for (i=0;i<a.length;++i)
				if (a[i].className.match(/txpCommentInputMessage/))
					msg = a[i].value;
			
			re_add_event(f["submit"], "onclick", function() { re_make_comment(f.name.value, f.email.value, f.web.value, msg); });
		} );
		
		re_auto_tag(new Array("_reun"), new Array("_rectx"));
}

function re_ee_platform() // Expression Engine
{
	re_add_event(window, "onload", function()
		{
			var f = document.getElementById("comment_form");
			if (f && f["submit"])
				re_add_event(f["submit"], "onclick", function() { re_make_comment(f.name.value, f.email.value, f.url.value, f.comment.value); });
		} );

	re_auto_tag(new Array("_reun"), new Array("_rectx"));
}

function re_wp_platform()
{
	
	re_add_event(window, "onload", function()
		{
			var f = document.getElementById("commentform");
			if (f && f["submit"])
				re_add_event(f["submit"], "onclick", function() { re_make_comment(f.author.value, f.email.value, f.url.value, f.comment.value); });
		} );

	re_auto_tag(new Array("_reun"), new Array("_rectx"));
}

function re_discover_platform()
{
	if (typeof(re_disc_plat_ran) != "undefined")
		return;

	re_disc_plat_ran = true;


	var metas = document.getElementsByName("generator");
	for (var i=0;i<metas.length;++i)
	{
		if ((metas[i].content + "").match(/movable type/i) || (metas[i].content + "").match(/typepad/i)) // Movable Type / Typepad
		{
			re_mt_platform();
			return;
		}
	}
	
	// Textpattern
	if (document.getElementById("txpCommentInputForm"))
	{
		re_tt_platform();
		return;
	}

	
	// Expression Engine
	if (re_cookie_exists("exp_tracker"))
	{
		re_ee_platform();
		return;
	}
	
	// Wordress comments page
	var wp_tag = document.getElementById("commentform");
	if (wp_tag && wp_tag.action.match(/wp-comments-post/i))
	{
		re_wp_platform();
		return;
	}
	
	// Let name tags and comments work for unidentifable pages
	if (re_cookie_exists("_reun"))
		re_auto_tag(new Array("_reun"), new Array("_rectx"));

}









function re_os()
{
	if(re_ua_get("sunos"))
		return "SunOS";
	else if (re_ua_get("freebsd") || re_ua_get("openbsd"))
		return "BSD";
	else if (re_ua_get("linux"))
		return "Linux";
	else if (re_ua_get("mac") || re_ua_get("ppc"))
		return "Mac";
	else if (re_ua_get("x11"))
		return "UNIX";
	else if (re_ua_get("win"))
		return "Windows";
	else if (re_ua_get("nintendo wii"))
		return "Nintendo Wii";
	else if (re_ua_get("playstation 3"))
		return "Playstation 3";
	else if (re_ua_get("playstation portable"))
		return "PlayStation Portable";
	return "";
}


function re_os_version()
{
	var os = re_os();
	
	if (os == "Windows")
	{
		if (re_ua.indexOf("win3.11") != -1 || re_ua.indexOf("windows 3.1") != -1)
			return "3.1";
		if (re_ua.indexOf("winnt3.51") != -1)
			return "NT 3.11";
		if (re_ua.indexOf("winnt4.0") != -1)
			return "4.0";
		if (re_ua.indexOf("win95") != -1 || re_ua.indexOf("windows 95") != -1)
			return "95";
		if (re_ua.indexOf("win98") != -1 || re_ua.indexOf("windows 98") != -1)
			return "98";
		if (re_ua.indexOf("win 9x 4.90") != -1)
			return "Millennium Edition";
		if (re_ua.indexOf("nt 5.0") != -1 || re_ua.indexOf("windows 2000") != -1)
			return "2000";
		if (re_ua.indexOf("nt 5.1") != -1)
			return "XP";
		if (re_ua.indexOf("nt 5.2") != -1)
			return "Server 2003 / XP Pro (x64 Edition)";
		if (re_ua.indexOf("nt 6.0") != -1)
			return "Vista";
		if (re_ua.indexOf("win32") != -1)
			return "XP";
		if (re_ua.indexOf("windows nt") != -1)
			return "NT";
			
	}
	
	if (os == "Mac")
	{
		if (re_ua.indexOf("os x") != -1 && re_ua.indexOf("intel") != -1)
			return "OS X (Intel)";
		if (re_ua.indexOf("os x") != -1 && re_ua.indexOf("ppc") != -1)
			return "OS X (PowerPC)";
		if (re_ua.indexOf("mac") != -1)
			return "MacOS";
	}
	
	if (os == "SunOS")
	{
		var exp = new RegExp(/sunos ([0-9.]+)/);
		var matches;
		if ((matches = exp.exec(re_ua)) && matches.length == 2)
			return matches[1];
	}
	
	return "";
}

function re_get_browser_version()
{
	var i, ua, b, cr;

	if (re_browser_ident == "Netscape Navigator" && document.layers)
		return 4;
	if (!((i = re_ua.indexOf(re_browser_ident+" ")) >= 0 || (i = re_ua.indexOf(re_browser_ident+"/")) >= 0))
		return "";
	ua = re_ua.substring(i + re_browser_ident.length + 1);
	if (ua.charAt(0) == "v")
		ua = ua.substring(1);
	b = "";
	for (cnt=0;cnt<ua.length;cnt++)
	{
		cr = ua.charAt(cnt);
		if ((cr >= 0 && cr <= 9) || cr == ".")
			b += cr;
		else
			break;
	}
	return b;
}

function re_get_clr()
{
	var a = re_ua.split(".net clr ");
	var exp = new RegExp(/^([0-9.]+).*$/);
	var matches;
	
	var dotnet_v = new Array();
	for (var cnt=0;cnt<a.length;++cnt)
	{
		if ((matches = exp.exec(a[cnt])) && matches.length == 2)
			dotnet_v.push(matches[1]);
	}
	
	if (dotnet_v.length > 0)
	{
		var big = dotnet_v[0];
		for (var cnt=0;cnt<dotnet_v.length;++cnt)
		{
			if (dotnet_v[cnt] > big)
				big = dotnet_v[cnt];
		}

		return big;
	}

	return "";
}

function re_get_browser()
{
	var re_browser = "";

	if (re_ua_get("konqueror"))
	{
		re_browser = "Konqueror";
		re_browser_ident = "konqueror";
	} else if (re_ua_get("safari"))
	{
		re_browser = "Safari";
		re_browser_ident = "safari";
	}  else if (re_ua_get("opera"))
	{
		re_browser = "Opera";
		re_browser_ident = "opera";
	} else if (re_ua_get("webtv"))
	{
		re_browser = "WebTV";
		re_browser_ident = "webtv";
	} else if (re_ua_get("firefox"))
	{
		re_browser = "FireFox";
		re_browser_ident = "firefox";
	} else if (re_ua_get("msie"))
	{
		re_browser = "Internet Explorer";
		re_browser_ident = "msie";
	} else if (re_ua_get("omniweb"))
	{	
		re_browser = "OmniWeb";
		re_browser_ident = "omniweb";
	} else if (re_ua_get("netscape"))
	{
		re_browser = "Netscape";
		re_browser_ident = "netscape";
	} else if (!re_ua_get("compatible"))
	{
		re_browser = "Netscape Navigator";
		re_browser_ident = "Netscape Navigator";
	}
	
	return re_browser;
}

function primary_domain_name(url)
{
	var pos;
	if ((pos = url.indexOf(":\/\/")) >= 0)
		url = url.substr(pos);
	var domain = url.match(/(www\.)?([^\/:]+)/);
	if (!domain)
		return "";
	domain = domain[2];
	var top_levels = new Array("aero","biz","cat","com","coop","edu","gov","info","int","jobs","mil","mobi","museum","name","net","org","travel");
	var name_list = domain.split(".");
	while (true)
	{
		var num_levels = name_list.length;
		var level = name_list[name_list.length-1];
		for (var cnt=0;cnt<top_levels.length;++cnt)
		{
			if (top_levels[cnt] == level && name_list.length > 1)
			{
				name_list.pop();
				break;
			}
		}		
		if (name_list.length > 1 && name_list[name_list.length-1].length == 2)
			name_list.pop();
		if (num_levels == name_list.length)
			break;
	}
	return name_list.pop();
}

function re_sid()
{
	var re_d = new Date();
	var chars = "qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM";
	var buffer = "";
	for (var i=0;i<5;++i)
		buffer += chars.charAt(Math.floor(Math.random()*chars.length));
	buffer += "-" + Math.floor(Math.random()*214748364) + "" + re_d.getSeconds();
	return buffer;
}

function re_localtime()
{
	var d = new Date();
	var hr = d.getHours()%12;
	return (hr == 0 ? 12 : hr) + ":" + (d.getMinutes().toString().length == 1 ? "0" : "") + d.getMinutes() + " " + (d.getHours() < 12 ? "am" : "pm");
}


function re_(re_id)
{
	re_discover_platform();

	var screen_res = 0;
	var inner_screen_res = 0;
	
	if (screen)
		screen_res = screen.width | screen.height << 16;
		
	if (window.innerWidth)
		inner_screen_res = window.innerWidth | window.innerHeight << 16;
	else if (document.body)
		inner_screen_res = document.body.clientWidth | document.body.clientHeight << 16;

	if (!re_cookie_exists("re_ret"))
		re_set_cookie("re_ret",0,re_r_expires,"/");
	else if (!re_get_cookie("re_ses"))
		re_set_cookie("re_ret",parseInt(re_get_cookie("re_ret")) + 1,re_r_expires,"/");

	if (!re_get_cookie("re_ses"))
	{
		re_set_cookie("re_ses",re_sid(),re_u_expires,"/");
		re_set_cookie("re_ses_indx",1,re_u_expires,"/");
		re_unique = 1;
	} else
	{
		re_set_cookie("re_ses_indx",parseInt(re_get_cookie("re_ses_indx")) + 1,re_u_expires,"/");
	}

	
	var re_ref = "";
	var re_parent_ref = "";

	try
	{
		if (parent.document.referrer != undefined)
		                re_parent_ref = parent.document.referrer + "";
	} catch (_E)
	{
	}
	
	if (re_parent_ref != "" && re_unique)
		re_ref = re_parent_ref + "";
	else
		re_ref = document.referrer + "";
	
	var tz = (new Date()).getTimezoneOffset()/60;

	var ary = {};
	ary["id"] = re_id;
	ary["sv"] = _re_script_v;
	ary["ses"] = re_get_cookie("re_ses");
	ary["ses_index"] = parseInt(re_get_cookie("re_ses_indx"));

	re_url = (window.location + "").substring(0,250);
	
	if (re_unique)
	{
		ary["u"] = 1;
		ary["ret_index"] = parseInt(re_get_cookie("re_ret"));
		ary["tz"] = tz;
		ary["bwr"] = re_get_browser();
		ary["bwrv"] = re_get_browser_version();
		ary["os"] = re_os();
		ary["osv"] = re_os_version();
		ary["ref"] = re_ref;
		ary["dotnet"] = re_get_clr();
		ary["res"] = screen_res;
		ary["user_agent"] = navigator.userAgent;
		ary["pdn"] = primary_domain_name(re_url);
		ary["rpdn"] = primary_domain_name(re_ref);
		
		var heartbeat = setTimeout(function ()
		{
			var js = document.createElement("script");
			js.src = src = "http://stats.reinvigorate.net/heartbeat?"+parseInt(Math.random()*10000000);
			document.getElementsByTagName('head')[0].appendChild(js);
		}, 600000);
	}

	ary["cook"] = !!document.cookie;	
	ary["lt"] = re_localtime();
	ary["url"] = re_url;
	ary["title"] = (document.title) ? document.title : "Untitled";
	ary["ires"] = inner_screen_res;
	
	if (re_name_tag != "")
	{
		ary["nt"] = re_name_tag;
		
		if (re_context_tag != "")
			ary["ct"] = re_context_tag;
	}
	
	if (re_comment_tag != "")
		ary["cmmt"] = re_comment_tag;
	
	if (re_new_user_tag != "")
		ary["nwusr"] = re_new_user_tag;

	if (re_purchase_tag != "")
		ary["prchs"] = re_purchase_tag;
		
	ary["rnd"] = Math.floor(Math.random()*2147483647);

	var qry_str = "";
	for (k in ary)
		qry_str += escape(k) + "=" + escape(ary[k]) + "&";

	qry_str = qry_str.substring(0,qry_str.length-1);

	var _re_rpcimg = new Image(1,1);
        _re_rpcimg.src = "http://" + re_host + "/ping?" + qry_str;
}


