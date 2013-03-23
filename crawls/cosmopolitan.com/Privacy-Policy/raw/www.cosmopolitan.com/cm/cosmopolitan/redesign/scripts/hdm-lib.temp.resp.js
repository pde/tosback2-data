//Kill the hdm-lib registration
HDM.registration.init = {};

//Define a new namespace to use for the portion of the responsive site that we'll be suing
var COSHDM = {};


COSHDM.util = {
	key: {
		BACKSPACE: 8, TAB: 9, ENTER: 13, SHIFT: 16, CTRL: 17, ALT: 18, ESCAPE: 27, SPACE: 32, PAGEUP: 33,
		PAGEDOWN: 34, END: 35, HOME: 36, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, INS: 45, DEL: 46
	},
	setCookie: function(name,value,days){
		var expDate = new Date(), cookieValue;
		expDate.setDate(expDate.getDate() + days);
		cookieValue = encodeURIComponent(value) + ( (days == null) ? '' : ';expires=' + expDate.toUTCString() );
		document.cookie = name + '=' + cookieValue;
	},
	setCookieAdvanced : function(name,value,options){
		if (typeof value != 'undefined') { // name and value given, set cookie
			options = options || {};
			if (value === null) {
				value = '';
				options.expires = -1;
			}
			var expires = '';
			if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
				var date;
				if (typeof options.expires == 'number') {
					date = new Date();
					date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
				} else {
					date = options.expires;
				}
				expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
			}
			// CAUTION: Needed to parenthesize options.path and options.domain
			// in the following expressions, otherwise they evaluate to undefined
			// in the packed version for some reason...
			var path = options.path ? '; path=' + (options.path) : '';
			var domain = options.domain ? '; domain=' + (options.domain) : '';
			var secure = options.secure ? '; secure' : '';
			document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
		}
	},
	getCookie: function(name){
		var nameEQ = name + "=",
			ca = document.cookie.split(';');
		for(var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) === ' ') {c = c.substring(1,c.length);}
			if (c.indexOf(nameEQ) === 0) {
				var result = c.substring(nameEQ.length,c.length);
				return result;
			}
		}
		return null;
	},
	eraseCookie: function(name){
		if ( COSHDM.util.getCookie(name) ){
			document.cookie = name + '=' + ';expires=Thu, 01-Jan-1970 00:00:01 GMT';
		}
	},
	getCookieDump: function(){
		var cookies = document.cookie.split(';'), cookieDump = {};
		for (var i = 0; i < cookies.length; i++){
			var thisCookie = cookies[i].split('=');
			cookieDump[thisCookie[0]] = thisCookie[1];
		}
		return cookieDump;
	},
	cacheBust: function(){
		return Math.floor(1 + Math.random() * 100000);
	},
	getParameter: function(key){
		var searchString = window.location.search.substring(1),i, val, params = searchString.split("&");
		for (i=0;i<params.length;i++) {
			val = params[i].split("=");
			if (val[0] == key) {
				return unescape(val[1]);
			}
		}
		return null;
/*		
		var params = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for (var i = 0, len = params.length; i < len; i++){
			var param = params[i].split('=');
			if (param[0] === key){
				return param[1];
			}
		}
		return false;
*/
	},
	setBreadcrumb: function(){
		if (Modernizr.localstorage){
			localStorage.nextURL = window.location.href;
		} else {
			COSHDM.util.setCookie('nextURL',window.location.href);
		}
		return true;
	},
	getBreadcrumb: function(preserve){
		var nextURL = '';
		if (Modernizr.localstorage && !!localStorage.nextURL){
			nextURL = localStorage.nextURL;
			if (!preserve){ delete localStorage.nextURL; }
		} else {
			nextURL = COSHDM.util.getCookie('nextURL') || '/';
		}
		return nextURL;
	},
	storeData: function(key,data){
		if (Modernizr.localstorage){
			localStorage[key] = (typeof data === 'object') ? JSON.stringify(data) : data;
		} else {
			COSHDM.util.setCookie(key,encodeURIComponent(data));
		}
	},
	getData: function(key){
		if (Modernizr.localstorage){
			return localStorage[key];
		} else {
			return COSHDM.util.getCookie(key);
		}
	},
	getJSON : function(key){
		var unparsed = this.getData(key);
		try{
			// seems wierd using a try/catch block to pass code, but I'm pressed for time
			// I'll fix this later
			return JSON.parse(unparsed);
		} catch(e){
			return {}
		}
	},
	eraseData: function(key){
		if (Modernizr.localstorage){
/*			if($.browser.msie && $.browser.version === '8.0') // #CHG0056954 -this should never even happen like this..
				COSHDM.util.eraseCookie(key);
			else*/
				delete localStorage[key];
		} else {
			COSHDM.util.eraseCookie(key);
		}
	},
    processQueue: function (name, queue, params) {
        var queuebuffer = queue.slice(0);
        while (queuebuffer.length > 0) {
            var func = queuebuffer.pop();
            try {
                func(params);
            } catch (e) {
                console.error("[COSHDM.util.processQueue:"+name+"]" + e + "\n\n" + func);
            }
        }
    },
	// really empty.. lets fill this out soon!!
	tmpl : function(str,data){ // COSHDM.util.tmpl()
		// resig's nifty micro templating engine. so sweet.
		/// <summary>
		/// Client side template parser that uses &lt;#= #&gt; and &lt;# code #&gt; expressions.
		/// and # # code blocks for template expansion.
		/// NOTE: chokes on single quotes in the document in some situations
		///       use &amp;rsquo; for literals in text and avoid any single quote
		///       attribute delimiters.
		/// </summary>
		/// <param name="str" type="string">The text of the template to expand</param>
		/// <param name="data" type="var">
		/// Any data that is to be merged. Pass an object and
		/// that object's properties are visible as variables.
		/// </param>
		/// <returns type="string" />
		if (this._tmplCache == null){
			this._tmplCache = {};
		}
		var err = "";
		try {
			var func = this._tmplCache[str];
			if (!func) {
				var strFunc = "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+str.replace(/[\r\t\n]/g," ").replace(/'(?=[^#]*#>)/g,"\t").split("'").join("\\'").split("\t").join("'").replace(/<#=(.+?)#>/g,"',$1,'").split("<#").join("');").split("#>").join("p.push('")+"');}return p.join('');";
//				console.log("((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((")
//				console.log(strFunc);
				func = new Function("obj", strFunc);
				this._tmplCache[str] = func;
			}
			return func(data);
		} catch (e) {
			err = e.message;
			console.error(e);
			console.warn("[TMPLERROR] "+str);
			console.warn("var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+str.replace(/[\r\t\n]/g," ").replace(/'(?=[^#]*#>)/g,"\t").split("'").join("\\'").split("\t").join("'").replace(/<#=(.+?)#>/g,"',$1,'").split("<#").join("');").split("#>").join("p.push('")+"');}return p.join('');");
		}
		return "< # ERROR: " + err.htmlEncode() + " # >";
	},
	buildScriptTag: function(src,callback){
		var script = document.createElement('script'), $head = $('head');
		$head.find('script').filter(function(i){
			return $(this).attr('src') && $(this).attr('src').split('?')[0] == src.split('?')[0];
		}).remove();
		script.src = src;
		script.onload = function(){
			try{
				callback(this);
			} catch(e){}
		};
		script.onreadystatechange = function(){
			if (script.readyState === 'loaded' || script.readyState === 'complete'){
				try{
					callback(this);
				} catch(e){}
			}
		};
		$head.get(0).appendChild(script);
	}
}

COSHDM.menu = {
	_vars : {
		wrapscreen : null,
		jqWrap : null,
		jqMenu : null,
		jqBoth : null,
		jqnavTarget : null,
		jqnavtier1 : null,
		jqMenuHeader : null,
		jqNavOverlay : null,
		body : null,
		domlistonavs : null,
		domScreenTop : null,
		openstate : false,
		stickyState : false,
		stickyScrollThreshold : 0,
		currNavOpen : 0,
		currentScrollY : 0,
		altDropDown: false,
		openTimestamp : 0,
		iPadTouch: false
	},
	open : function(e){
		if ((e.timeStamp -COSHDM.menu._vars.openTimestamp) < 150){
			return false;
		} else {
			COSHDM.menu._vars.openTimestamp = e.timeStamp;
		}
		if (COSHDM.menu._vars.openstate){
			COSHDM.menu.close(e);
			return false;
		} else {
			COSHDM.menu._vars.currentScrollY = window.scrollY;
/*			if (COSHDM.menu._vars.currentScrollY > COSHDM.menu._vars.stickyScrollThreshold.top){
				COSHDM.menu._vars.body.addClass("menustaysticky")
			}*/
//			COSHDM.menu._vars.currentScrollY = window.scrollY;
			COSHDM.menu._vars.jqWrap.addClass("slideTransition");
			setTimeout(function(){
				COSHDM.menu._vars.openstate = true;
//				COSHDM.menu._vars.body.addClass("menulock")
				COSHDM.menu._vars.jqWrap.removeClass("slideTransition");
				COSHDM.menu._vars.jqWrap.addClass("fixedopen");


				COSHDM.menu._vars.stickyState = false;
				COSHDM.menu._vars.jqNavOverlay.removeClass("visible");
				$("#HDM_panelHeader").removeClass("hidden");


			},250)
			setTimeout(function(){
				COSHDM.menu._vars.body.addClass("hidex menuopen").removeClass("menuclosed");
			},250)
//			alert("am I being called??")
			if (window.scrollY >COSHDM.menu._vars.stickyScrollThreshold.top){
//				window.scrollTo(0, COSHDM.menu._vars.stickyScrollThreshold.top);
			}
			COSHDM.menu._vars.jqWrap.bind('click',COSHDM.menu.close).bind('touchstart',COSHDM.menu.close);
			$("[role=menuclose]").bind('click',function(e){COSHDM.menu.close(e)})

		}
	},
	tier2 : function(n,el){
		if(this._vars.altDropDown){
			function setOpen(i,className){
				COSHDM.menu._vars.jqnavTarget.each(function(x){
					if((this.getAttribute("topnavtarget")==i)||(i== -1)){
						$(this).addClass(className)
						$(COSHDM.menu._vars.domlistonavs[x]).addClass(className)
					}
				})
			}
			function setClose(i,className){
				COSHDM.menu._vars.jqnavTarget.each(function(x){
					if((this.getAttribute("topnavtarget")==i)||(i== -1)){
						$(this).removeClass(className)
						$(COSHDM.menu._vars.domlistonavs[x]).removeClass(className)
					}
				})
			}

			if ((this._vars.currNavOpen != n)||(n == -1)){
				//console.log("oh look",n,this._vars.currNavOpen)
				setClose(this._vars.currNavOpen,"open");
				this._vars.currNavOpen = -1;
			}

			if ((this._vars.currNavOpen == n)){
				setClose(this._vars.currNavOpen,"open");
				setOpen(this._vars.currNavOpen,"closing")
				setTimeout(function(){
					setClose(COSHDM.menu._vars.currNavOpen,"closing")
					COSHDM.menu._vars.currNavOpen = 0;
				},250)
				this._vars.jqnavtier1.removeClass("tier2open")
				this._vars.jqMenuHeader.removeClass("subnavopen");

			} else {
				this._vars.jqnavtier1.addClass("tier2open")
				this._vars.jqMenuHeader.addClass("subnavopen");
				setOpen(n,"open");
				this._vars.currNavOpen = n;
			}
		}else{
			function toggle(i, className){
	//			console.log("triggered",i);
				COSHDM.menu._vars.jqnavTarget.each(function(x){
					if((this.getAttribute("topnavtarget")==i)||(i== 0)){
						var dat = $(this);
						var datDOM = $(COSHDM.menu._vars.domlistonavs[x])

						if (dat.hasClass(className)||(i==0)){
							dat.removeClass(className);
							datDOM.removeClass(className);
						} else {
							dat.addClass(className);
							datDOM.addClass(className);
						}
					}
				})
			}
			toggle(n,"open")
		}



	},
	closetier2 : function(e){
//		var tnum = e.target.parentNode.getAttribute("topnavtarget")
//		alert(e.target.getAttribute("topnavclose"))
		function findnavTag(el) {
			// dude this code is crass as hell, fixme.. :-(
			while (el.parentNode) {
				el = el.parentNode;
				if (el.tagName === "BODY"){
					return null;
				}
				var at = el.getAttribute("topnavclose")
				if (el.getAttribute("topnavclose")){
					return at
				}
			}
			return null;
		}

		var navnum = e.target.getAttribute("topnavclose");
		if (!navnum){
			navnum = findnavTag(e.target)
		}

		COSHDM.menu.tier2(navnum);
	},
	close : function(e){
		function findUpTag(el) {
			while (el.parentNode) {
				el = el.parentNode;
				if (el.tagName === "BODY"){
					return null;
				}
				if (el.getAttribute("topnavtarget")){
					return el
				}
			}
			return null;
		}
		if(e){
			var uptag = findUpTag(e.target)
			if (uptag){
				return false;
			}
			var testattribute = e.target? e.target.getAttribute("topnav") : null;
			if (testattribute !== null){
				return false;
			}
		}
		if (COSHDM.menu._vars.openstate){
			COSHDM.menu._vars.openstate = false;
			COSHDM.menu._vars.jqWrap.removeClass("fixedopen");
			setTimeout(function(){
				COSHDM.menu._vars.jqWrap.addClass("slideTransition");
				COSHDM.menu._vars.body.removeClass("menuopen").addClass("menuclosed");
			},180)
			setTimeout(function(){
				COSHDM.menu._vars.body.removeClass("hidex");
				COSHDM.menu.tier2(0);
				COSHDM.menu._vars.jqnavtier1.removeClass("tier2open")
				COSHDM.menu._vars.jqWrap.removeClass("slideTransition");
				COSHDM.menu._vars.jqMenuHeader.removeClass("subnavopen");
			},250);
			COSHDM.menu._vars.jqWrap.unbind('click',COSHDM.menu.close).unbind('touchstart',COSHDM.menu.close);
			$("[role=menuclose]").unbind('click',COSHDM.menu.close)

		} else {
			return false;
		}
	},
	click : function(o){
		if (window.innerWidth >= 960){
			if((!/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) || (COSHDM.menu._vars.iPadTouch)){
				COSHDM.menu._vars.iPadTouch = false;
				window.location.assign(this.getAttribute("deskhref"));
			}else{
				COSHDM.menu._vars.iPadTouch = true;
			}
		} else {
			COSHDM.menu.tier2(this.getAttribute("topnav"),o);
		}
	},
	init : function(){
		// before we do *anything*, clone the nav and place it into the screen-menu element..
		$('[role=screen-menu]').insertBefore('[role=screen-top]')
		// this must be cloned before being occurs
		this._vars.jqNavOverlay = $("[role=screen-menuoverlay]");
		
		var panelHeader = $("#HDM_panelHeader");
		panelHeader.find("span[id] script:contains('document.write')").remove(); // strip out tags that may document.write
		
		var panelHeaderClone = panelHeader.clone(true,true);
		panelHeaderClone.find("#mainheader span[id^='ams_']").remove();
		panelHeaderClone.appendTo(COSHDM.menu._vars.jqNavOverlay);
		
//		$("#HDM_panelHeader").clone().appendTo(COSHDM.menu._vars.jqNavOverlay);
		var roleNavul = $('[role=navigation]>ul.nav').eq(1);
		roleNavul.find("span[id] script:contains('document.write')").remove(); // strip out tags that may document.write
		roleNavul.clone(true,true).appendTo('[role=screen-menu]');
//		$('[role=navigation]>ul.nav').eq(1).clone().appendTo('[role=screen-menu]');
//		$("[role=screen-menu] .tier2").appendTo("[role=screen-menu]");// moving the t2 nav items to 'top level'
		this._vars.wrapscreen = document.querySelector("[role=screen-top]");
		this._vars.jqnavtier1 = $("ul.nav.tier1");
			if(this._vars.jqnavtier1.attr("role")=="menu-dropdown")
			this._vars.altDropDown = true;
		this._vars.jqWrap = $("[role=screen-top]");
		this._vars.jqMenuHeader = $("[role=menu-header]");
		this._vars.jqnavTarget = $("[topnavtarget]");
		this._vars.body = $(document.body);
		this._vars.domScreenTop = this._vars.jqWrap[0];



		var listonavs = document.querySelectorAll("a[topnav]");
		$(listonavs).bind('click',COSHDM.menu.click);
		var listocloset2 = document.querySelectorAll(".tier2 .tier2close")
		$(listocloset2).bind('click',COSHDM.menu.closetier2);


		$("[role=menusubback]").bind('click',function(){COSHDM.menu.tier2(-1);})
//		$("[role=screen-top]").bind('click',function(e){COSHDM.menu.close(e)})
//		$("[role=menuclose]").bind('click',function(e){COSHDM.menu.close(e)})
		COSHDM.menu._vars.domlistonavs = listonavs;
		$("[role=menuopen]").bind('click',function(e){COSHDM.menu.open(e)}).bind('touchstart',function(e){COSHDM.menu.open(e)});

		$(window).scroll(function(){
			var wo = (window.scrollY) ? window.scrollY : document.documentElement.scrollTop;
//			console.log(wo,COSHDM.menu._vars.stickyScrollThreshold.top,COSHDM.menu._vars.stickyState)
			if((wo > COSHDM.menu._vars.stickyScrollThreshold.top) && (!COSHDM.menu._vars.stickyState)){
//				console.warn("SHOW STICKY STATE!")
				COSHDM.menu._vars.stickyState = true;
				COSHDM.menu._vars.jqNavOverlay.addClass("visible");
				$("#HDM_panelHeader").addClass("hidden");
			} else if((wo <= COSHDM.menu._vars.stickyScrollThreshold.top)&&(COSHDM.menu._vars.stickyState)){
//				console.warn("HIDE STICKY STATE!")
				COSHDM.menu._vars.stickyState = false;
				COSHDM.menu._vars.jqNavOverlay.removeClass("visible");
				$("#HDM_panelHeader").removeClass("hidden");
			}
		}).resize(function(){
			COSHDM.menu.fn.getNavScrollThreshold();
		});
		COSHDM.menu.fn.getNavScrollThreshold(); // at least run it once..

	},
	fn : {
		getNavScrollThreshold : function(){
			COSHDM.menu._vars.stickyScrollThreshold = $("[role='screen-top'] [role='navigation']").offset();

			if (!COSHDM.menu._vars.stickyScrollThreshold){
				console.warn("stickynav not found, exit")
				return false;
			}
			COSHDM.menu._vars.stickyScrollThreshold.top = Math.ceil(COSHDM.menu._vars.stickyScrollThreshold.top);
//			console.log("sticky scroll threshold",COSHDM.menu._vars.stickyScrollThreshold )
		}
	}
};



COSHDM.search = {
	_vars : {
		activated : false,
		body : null
	},
	activate : function(){
		COSHDM.search._vars.activated = !COSHDM.search._vars.activated;
		if (COSHDM.search._vars.activated){
			COSHDM.search._vars.body.addClass("searchmode");
			document.querySelector("#windowedsearch").focus();
		} else {
			COSHDM.search._vars.body.removeClass("searchmode");
		}
	},
	close : function(){
		COSHDM.search._vars.activated = false;
		COSHDM.search._vars.body.removeClass("searchmode");
	},
	init : function(){
		COSHDM.search._vars.body = $(document.body)

		$("[role=activatesearch]").bind('click',COSHDM.search.activate);
		$("[role=search-cancel]").bind('click',COSHDM.search.close);
/*		var searchb = document.querySelectorAll("[role=activatesearch]");
		for (var i = 0; i < searchb.length; i++){
			searchb[i].addEventListener('click',COSHDM.search.activate,false);
		}
		var searchc = document.querySelectorAll("[role=search-cancel]");
		for (var i = 0; i < searchc.length; i++){
			searchc[i].addEventListener('click',COSHDM.search.close,false);
		}*/
	}
}


COSHDM.footer = {
	_var : {
		jqnode : null,
		jqnodeTarget : null
	},
	toggle : function(e){
		var xtar = e.target.getAttribute("expand");
		function findUpTag(el) {
			while (el.parentNode) {
				el = el.parentNode;
				ex = el.getAttribute("expand");
				if (ex){
					return ex;
				}
			}
			return null;
		}
		xtar = xtar ? xtar : findUpTag(e.target);
		console.log(xtar)


		var tarlist = COSHDM.footer._var.jqnodeTarget;
		for (var i = 0; i < tarlist.length; i++){
			var itar = tarlist[i];
			if (itar.getAttribute("expandtarget") == xtar){
				var jtar = $(itar);
				if (jtar.hasClass("expanded")){
					jtar.removeClass("expanded")
				} else {
					jtar.addClass("expanded")
				}
			}
		}
	},
	init : function(){
		COSHDM.footer._var.jqnode = $("[expand]");
		COSHDM.footer._var.jqnodeTarget = $("[expandtarget]")
		COSHDM.footer._var.jqnode.bind('click',COSHDM.footer.toggle)
	}
}



/*************************************************************
 *
 * Registration
 *
 *
 ************************************************************/

COSHDM.registration = {
	_vars : {
		mag_user : {},
		hearst_user : {},
		fbAppID : null,
		fbResponse : null,
		fbUser : null, // need to fix this..
		_event_queue : {
			loggedin : [],
			loggedout : [],
			renderLoginLinks : []
		},
		loginstate : -1, // -1 == undefined..
		processAttempt : 0,
		jqRegContent : null,
		jqRegOverlay : null
	},
	count : {
		callstomag_user : 0
	},
	ha :{
		mode : false,
		check : function(){

		}
	},
	init : function(){// lives in here because I don't know where mike may call this elsewhere. In any case, this is more legacy than anything..
		// make sure this code isn't run twice..
		try{
			if (!this._vars.initialized){
				this._vars.initialized = true;
			} else {
				throw("[COSHDM.registration.init] initialization already invoked: aborting")
			}
		} catch(error){
			return;
		}

		var fbAppID = $("meta[property='fb:app_id']").attr("content");
		this._vars.fbAppID = fbAppID;

		if ( !Modernizr.localstorage || !!COSHDM.util.getData('hdm_linkProcess') || !!COSHDM.util.getData('hdm_forceMagUserUpdate') || (document.location.pathname == "/login/")){
			forceMagUserUpdate = true;
		}
		this._vars.jqRegOverlay = $("[role='screen-regoverlay']");
		this._vars.jqRegContent = $("[registration='content']");
		$("[registration='close']").click(function(){COSHDM.registration.ui.loginOverlay.close()})

		this.boot.start(fbAppID);
	},
	process : function(){
		// now that we have all 3 states, lets begin!
		COSHDM.registration._vars.processAttempt++;
		if (COSHDM.registration._vars.processAttempt > 4){
			console.error("[COSHDM.registration.process] loop detected! Aborting. Setting default")
			if (!COSHDM.registration._vars.mag_user){
				COSHDM.registration._vars.mag_user = { logged_in: false,tempstatus: true };
			}
			console.warn("mag_user",window.mag_user,COSHDM.registration._vars.mag_user)
			console.warn("hearst_user",window.hearst_user,COSHDM.registration._vars.hearst_user)
			COSHDM.registration._vars.hearst_user = COSHDM.registration._vars.mag_user;

			COSHDM.registration._Maguser.set(COSHDM.registration._vars.mag_user);
			COSHDM.registration._Hearstuser.com.parentSet(COSHDM.registration._vars.hearst_user);

			//COSHDM.util.processQueue("queue.loggedin",COSHDM.registration._vars._event_queue.loggedout);
			COSHDM.registration.ui.renderLoginLinks();

			return false;
		}
		if (COSHDM.registration._vars.processAttempt == 1){
			$("[action='/registration/login'],[action='/registration/logout']").submit(function(){
				COSHDM.util.storeData('hdm_forceMagUserUpdate',true);
				return true;
			});
		}

		var fbLoggedin = COSHDM.registration._vars.fbResponse ? (COSHDM.registration._vars.fbResponse["status"] == "connected" ? true : false) : false
		var mLoggedin = COSHDM.registration._vars.mag_user["logged_in"] ? !!COSHDM.registration._vars.mag_user["logged_in"] : false;// !!COSHDM.registration._vars.mag_user["logged_in"]
		var hLoggedin = COSHDM.registration._vars.hearst_user["logged_in"] ? !! COSHDM.registration._vars.hearst_user["logged_in"] : false;// !!COSHDM.registration._vars.hearst_user["logged_in"]


		if (!mLoggedin && hLoggedin){
//			console.log("*** autologin",COSHDM.registration._vars.mag_user,COSHDM.registration._vars.hearst_user)
			var tdomain = "."+document.domain.replace(new RegExp(/^www\./i),"");
			tdomain = tdomain.replace(".pp","").replace(".alphapreview","").replace(".betapreview","");// sanitizing for alpha/betapreview

			console.log("my hearst_user object..",COSHDM.registration._vars.hearst_user)
			COSHDM.util.setCookieAdvanced('fSpaceSSOUserId',COSHDM.registration._vars.hearst_user.user_name,{"path" : "/","domain" : tdomain});
			COSHDM.util.setCookieAdvanced('fSpaceSSOUserEmail',COSHDM.registration._vars.hearst_user.email,{"path" : "/","domain" : tdomain});
			COSHDM.util.setCookieAdvanced('fSpaceSSOUserCheck',COSHDM.registration._vars.hearst_user.encString,{"path" : "/","domain" : tdomain});
			COSHDM.util.setCookieAdvanced('fSpaceSSOExpires',COSHDM.registration._vars.hearst_user.expires,{"path" : "/","domain" : tdomain});

			setTimeout(function(){ // adding timeout... because I don't really trust the browser to save the cookie settings fast enough..
				COSHDM.registration._Maguser.generate({logged_in: false,tempstatus: true,cookieScan : "online"},COSHDM.registration.process)
			},100)

			console.log("run autologin..","1["+COSHDM.registration._vars.mag_user["logged_in"]+"]"+hLoggedin)
			return false;
		} else if (mLoggedin && !hLoggedin){
			// lets make sure this is correct..?
			COSHDM.registration._Hearstuser.gethearstuser(function(_hearst_user){
				setTimeout(function(){
					if (window.hearst_user["logged_in"] == false){
						COSHDM.registration._Maguser.generate({logged_in: true,tempstatus: true,cookieScan : "offline"},COSHDM.registration.process)
					} else {
						COSHDM.registration.process();
					}
				},100)
			});
			return false;
			// hearst_user is NOT logged in, lets force invoke a logout..
		}
		// states should be in sync before we fire...
//		console.log("registration.process: event.fire is next[mLoggedin:"+mLoggedin+"][hLoggedin:"+hLoggedin+"]")
		COSHDM.registration.event.fire();

		if (fbLoggedin && mLoggedin && hLoggedin && COSHDM.util.getData('hdm_linkProcess')){
			COSHDM.registration.action.linkFB(function(){
				var $modalAnchor = $('<div id="hdmModalAnchor" />').appendTo('body').hide();
				$modalAnchor.overlay({
					target: '#accountsLinked',
					load: true
				});
				$('#accountsLinked').find('a.continue').click(function(){
					$modalAnchor.data('overlay').close();
				});
				$('#accountsLinked').find('[fblink=closetoProfile]').click(function(){
					$modalAnchor.data('overlay').close();
					COSHDM.registration.ui.profile.get()
				});
				COSHDM.registration._Fbuser.getfbUser(COSHDM.registration.ui.renderLoginLinks);// make sure to render loginlinks after fbUser is got
				COSHDM.util.eraseData('hdm_linkProcess');
			});
			return false;
		}

		COSHDM.registration.ui.renderLoginLinks();
		COSHDM.registration.ui.loginOverlay.onload();
	},
	ui : {
		submitButton : {
			processLock : false,
			lock: function(){
				COSHDM.registration.ui.submitButton.processLock = true;
				$('[type="submit"]', COSHDM.registration._vars.jqRegOverlay).each(function(i){
					// this is where we have to cache a copy of the text in as an attribute.. for each element
					var t = $(this);
					var uibackuptext = t.attr("uibackuptext");
					t.attr("uibackuptext",uibackuptext ? uibackuptext : t.text()).text('Processing...').css('cursor','wait');
				})
			},
			unlock: function(){
				COSHDM.registration.ui.submitButton.processLock = false;
				$('[type="submit"]', COSHDM.registration._vars.jqRegOverlay).each(function(i){
					// this is where we have to cache a copy of the text in as an attribute.. for each element
					var t = $(this);
					var text = t.attr("uibackuptext");
					t.text(text).css('cursor','');
				})
			}
		},

		renderLoginLinks : function(){
			this.changed = false;

			//define our various states of logged in-ness
			if (this.fbLoggedIn != COSHDM.registration._Fbuser.isLoggedIn()){
				this.fbLoggedIn = COSHDM.registration._Fbuser.isLoggedIn();
				this.changed = true;
			}
			if (this.fbConnected !=  COSHDM.registration._Fbuser.isConnected()){
				this.fbConnected =  COSHDM.registration._Fbuser.isConnected();
				this.changed = true;
			}
			if (this.fbLinked !=  COSHDM.registration._Fbuser.isLinked()){
				this.fbLinked =  COSHDM.registration._Fbuser.isLinked();
				this.changed = true;
			}
			if (this.hdmLoggedIn != COSHDM.registration._vars.mag_user.logged_in){
				this.hdmLoggedIn = COSHDM.registration._vars.mag_user.logged_in;
				this.changed = true;
			}
			if (!this.changed){
				// nothing changed, do nothing. bounce the f out
				return false;
			} else {
				// okay! time to re-render our login links
				var $newRegLink;
				var $linkContainer;// = $('#hdmLoginLinks').fadeOut().empty();
				var $editProfileLink;
				var $signinLink;
				var $signoutLink;

				$linkContainer = $('[registration="loginlinks"]');
				$linkContainer.hide().empty(); //fade the link container out

				//fb link needs to say different stuff based on logged in ness
				var fbLinkText = (this.hdmLoggedIn) ? 'Connect with Facebook' : 'Sign In with Facebook';
				var $fbLink = $('<li class="facebookSignIn"><a id="iconFB" href="#">' + fbLinkText + '</a></li>');
				$fbLink.click(COSHDM.registration.action.openFBLogin);

				if (this.hdmLoggedIn){
					//logged in.. we'll need a signout link
					$signoutLink = $('<li><a href="#">Sign out</a></li>'); //the sign out link
					$signoutLink.click(COSHDM.registration.action.logout);
					// lets figure out fb
					if (this.fbConnected){
						if (this.fbLinked){
							if ( COSHDM.registration._vars.fbUser != null ){
								$fbLink = $('<li><img src="https://graph.facebook.com/' + COSHDM.registration._vars.fbUser.id + '/picture" width="15" height="15" /> Hi <a class="trackSender" href="#">' + COSHDM.registration._vars.fbUser.first_name + '</a></li>');
								$fbLink.click(COSHDM.registration.action.openProfile);
							} else {
								$fbLink = $('<li>Hi <a href="#">' + mag_user.first_name + '</a></li>'); //new fb link with profile link
							}

						} else {
							$editProfileLink = $('<li>Hi <a>' + mag_user.first_name + '</a></li>'); //append the hdm edit profile link
							$editProfileLink.click(COSHDM.registration.action.openProfile);
							$linkContainer.append($editProfileLink); //append the edit profile link
							$fbLink = $('<li class="facebookSignIn"><a id="iconFB" href="#">' + fbLinkText + '</a></li>');
							$fbLink.click(function(){
								COSHDM.registration.action.linkFB(COSHDM.registration.ui.renderLoginLinks);
								return false;
							});
						}
					} else {
						//if no fb, leave the fb link as-is
						$editProfileLink = $('<li>Hi <a href="#">' + mag_user.first_name + '</a></li>'); //append the hdm edit profile link
						$editProfileLink.click(COSHDM.registration.action.openProfile);
						$linkContainer.append($editProfileLink); //append the edit profile link
					}
					$linkContainer.append($fbLink); //append the facebook link
					$linkContainer.append($signoutLink); //append the signout link
				} else {
					//not logged into hdm.. not much else matters
					$newRegLink = $('<li class="joinFree"><a href="#">Join Free</a></li>'); //new reg link
					$newRegLink.click(COSHDM.registration.action.openSignup);
					$signinLink = $('<li><a href="#">Sign In</a></li>'); //sign in link
					$signinLink.click(COSHDM.registration.action.openLogin);
					$linkContainer.append($newRegLink); //append the join free
					$linkContainer.append($fbLink); //append the facebook link
					$linkContainer.append($signinLink); //append the sign in link
				}
				$linkContainer.fadeIn(); //fade the container back in
				COSHDM.util.processQueue("event.renderLoginLinks",COSHDM.registration._vars._event_queue.renderLoginLinks);
			}
		},
		loginOverlay : {
			show : function(callback){
				COSHDM.registration._vars.jqRegOverlay.addClass("loading")
				COSHDM.registration._vars.jqRegContent.empty();
				if (typeof callback == "function") callback();
			},
			load : function(callback,data){
				COSHDM.registration._vars.jqRegOverlay.addClass("show");
				$(document.body).addClass("showRegistration")
				COSHDM.registration._vars.jqRegOverlay.removeClass("loading")
				FB.XFBML.parse(document.querySelector('.facebook'));
				FB.XFBML.parse(document.getElementById('registrationOverlay'));
				if (typeof callback == "function") callback();
				try{
					FB.XFBML.parse(document.getElementById('registrationOverlay'));
				} catch(e){
					// FB does not exist.. just bailing out
					console.warn("[COSHDM.registration.ui] FB.XFBML not found")
				}
			},
			close : function(){
				// lets also remove some cleanup data from initiateHDMSignin..
				COSHDM.util.eraseData('hdm_linkProcess');
				COSHDM.util.eraseData('hdm_wasFBLinked');

				COSHDM.registration._vars.jqRegOverlay.removeClass("show");
				setTimeout(function(){
					COSHDM.registration._vars.jqRegContent.empty();
				},500);
				$(document.body).removeClass("showRegistration")
			},
			onload : function(){
				switch (document.location.hash){
					case "#HDMaction=login" :
						COSHDM.registration.ui.login.get();
						break;
					case "#HDMaction=registration" :
						COSHDM.registration.ui.signup.get();
						break;
					case "#HDMaction=editProfile" :
						COSHDM.registration.ui.profile.get();
						break;
					case "#HDMaction=passwordReset" :
						COSHDM.registration.ui.forgetPassword.get();
						break;
						
				}
			}
		},
		login : {
			get : function(){
				COSHDM.registration.ui.loginOverlay.show(function(){
					// welcome back message
					if (COSHDM.registration._vars.mag_user.logged_in){
						COSHDM.registration._vars.jqRegContent.load("/login?cachebust="+Date.now()+" #loginConfirmation",COSHDM.registration.ui.login.load)
					} else {
						COSHDM.registration._vars.jqRegContent.load("/login?cachebust="+Date.now()+" #login",COSHDM.registration.ui.login.load)
					}
					// also do a check for offline status..
//					$.get("/login?cachebust="+Date.now(),COSHDM.registration.ui.login.load);
				})
			},
			load : function(data){
				COSHDM.registration.ui.loginOverlay.load(function(){
					$("[href='/registration/forgotPassword.html']").removeAttr("href").click(function(){COSHDM.registration.ui.forgetPassword.get(); return false;});
					$("#hdmLoginForm").submit(COSHDM.registration.ui.login.submit);
					$('#hdmLoginForm [href="\/login\/"]').click(function(){
						COSHDM.registration.ui.login.get();
						return false;
					});
					$('#hdmLoginForm [href="\/registration\/"]').click(function(){
						COSHDM.registration.ui.signup.get();
						return false;
					})
				},data);
			},
			submit : function(e){	
				COSHDM.registration._vars.jqRegOverlay.addClass("loading")
				var ser = $(this).serialize();
				
				
				COSHDM.util.buildScriptTag("/registration/login?next_url=/registration/get_mag_user.js&"+ser,function(script){
//					console.error(window["mag_user"]);
					script.parentNode.removeChild(script);
					// my god this is ghetto.. :-(
					if (window["mag_user"]["logged_in"] == 1){
						COSHDM.registration._vars.hearst_user = window["mag_user"];
						COSHDM.registration._vars.mag_user = window["mag_user"];
						COSHDM.registration._Hearstuser.com.parentSet(window["mag_user"]);
						COSHDM.registration._Maguser.set(window["mag_user"]);
						COSHDM.registration.process();// use process instead of rednerLoginLinks
						
						COSHDM.registration._vars.jqRegContent.load("/login?cachebust="+Date.now()+" #loginConfirmation",COSHDM.registration.ui.login.load)
					} else {
						if (JSON.stringify(window.hearst_user) == '{"initial_login":1}'){
							// ok see this little beaut here? This is the result of the servers' static file
							window.hearst_user = { initial_login: 1, logged_in: false,tempstatus: true,cookieScan : "offline"};
						}
						COSHDM.registration._vars.hearst_user = window.hearst_user;
						COSHDM.registration._vars.mag_user = window.hearst_user;
						COSHDM.registration._Hearstuser.com.parentSet(window.hearst_user);
						COSHDM.registration._Maguser.set(window.hearst_user);
						COSHDM.registration.process();// use process instead of rednerLoginLinks
// okay, so this process totally doesn't work..
//						COSHDM.registration._vars.jqRegContent.load("/registration/login?next_url=/login?cachebust="+Date.now()+"&"+ser+" #login",COSHDM.registration.ui.login.load)
/* see this here? it's a bad budget hack.. just so I can get login working on iphone */
						COSHDM.registration._vars.jqRegContent.load("/login?ur_login_failed=Login%20Failed #login",COSHDM.registration.ui.login.load)
					}
				});
				
				return false;
				var url = "/registration/login";
				// see this stuff? This is a botched call, gonna keep it around because DAYAM
				$.ajax({
					type : "POST",
					url : url,
					data : ser+"&next_url=/login",
					beforeSend: function() {
					// show indicator
					},
					complete: function(e,textStatus) {
						// okay, if I'm here, I can trust that login 'worked'.. lets proceed once more..
						if (textStatus == "error"){
							if (navigator.appName == "Microsoft Internet Explorer"){// ie can blow me
								// we make sure to keep a reset flag in mag_user to ensure a forced load next around, toss in a tempstatus:true flag in json mag_user
								window["mag_user"] = { logged_in: false,tempstatus: true }; //set the temp mag_user to the stored mag_user, or a logged_out version of it
								COSHDM.registration._Maguser.set(window.mag_user,function(){
//									alert("enable ie to simply use the form to submit.. but lets set next_url to be document.location.href");
									$("#hdmLoginForm").unbind("submit").attr("action","/registration/login").attr("onsubmit","return true;").append("<input type='hidden' name='next_url' value="+document.location.href+">").submit();
								});
								return false;
							}
							var url = "/registration/login?"+ser+"&next_url=http://"+COSHDM.registration._Hearstuser.previewHost()+"services.hearstmags.com/registration/get_hearst_user.js?cachebust="+Date.now();
							COSHDM.util.buildScriptTag(url,function(script){
								if (JSON.stringify(window.hearst_user) == '{"initial_login":1}'){
									// ok see this little beaut here? This is the result of the servers' static file
									window.hearst_user = { initial_login: 1, logged_in: false,tempstatus: true,cookieScan : "offline"};
								}
								COSHDM.registration._vars.hearst_user = window.hearst_user;
								COSHDM.registration._vars.mag_user = window.hearst_user;
								COSHDM.registration._Hearstuser.com.parentSet(window.hearst_user);
								COSHDM.registration._Maguser.set(window.hearst_user);

								COSHDM.registration.process()//COSHDM.registration.ui.renderLoginLinks(); // process used instead of renderLoginLinks because process doe some behind the scenes stuff

								script.parentNode.removeChild(script);
								COSHDM.registration.ui.login.get();
								COSHDM.registration._vars.jqRegOverlay.removeClass("loading")
//								window.setTimeout(function(){COSHDM.registration.ui.login.close()},2000)
							});
						} else if (textStatus == "success"){
							var data = e.responseText;
							var rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
							// lifted straight from jQuery.fn.load
							COSHDM.registration._vars.jqRegContent.html(jQuery("<div>").append(data.replace(rscript,"")).find("#login"));
							COSHDM.registration.ui.login.load(data);
						}
					},
					success : function(data){}
				})
				return false; // make sure this is here..
			},
			close : function(){COSHDM.registration.ui.loginOverlay.close();}
		},
		signup : {
			get : function(){
				COSHDM.registration.ui.loginOverlay.show(function(){
					COSHDM.registration._vars.jqRegContent.load("/registration/ #registration",COSHDM.registration.ui.signup.load) //$.get("/registration/",COSHDM.registration.ui.signup.load);
				})
			},
			load : function(data){
				COSHDM.registration.ui.loginOverlay.load(function(){
					COSHDM.registration.ui.profile.dohousekeeping();
					$("#hdmRegistrationForm").submit(COSHDM.registration.ui.signup.submit);
					$('#hdmRegistrationForm [href="\/login\/"]').click(function(){
						COSHDM.registration.ui.login.get();
						return false;
					});
				},data);
			},
			submit : function(e){
				COSHDM.registration._vars.jqRegOverlay.addClass("loading")
				var ser = $(this).serialize();
				var url = "/registration/save_registration";
//				console.warn("YO WHERE AM I",e,ser,url)
				$.ajax({
					url : url,
					data : ser+"&next_url=/registration/",
					beforeSend: function() {
					// show indicator
//						COSHDM.registration._vars.jqRegContent.html("loading..");
					},
					complete : function(e,textStatus){
						if (textStatus == "error"){
							var url = "/registration/login?"+ser+"&next_url=http://"+COSHDM.registration._Hearstuser.previewHost()+"services.hearstmags.com/registration/get_hearst_user.js?cachebust="+Date.now();
							COSHDM.util.buildScriptTag(url,function(script){
								if (JSON.stringify(window.hearst_user) == '{"initial_login":1}'){
									// ok see this little beaut here? This is the result of the servers' static file
									window.hearst_user = { initial_login: 1, logged_in: false,tempstatus: true,cookieScan : "offline"};
								}
								COSHDM.registration._vars.hearst_user = window.hearst_user;
								COSHDM.registration._vars.mag_user = window.hearst_user;
								COSHDM.registration._Hearstuser.com.parentSet(window.hearst_user);
								COSHDM.registration._Maguser.set(window.hearst_user);
								COSHDM.registration.process();// use process instead of rednerLoginLinks
//								COSHDM.registration.ui.renderLoginLinks();
								script.parentNode.removeChild(script);
								COSHDM.registration.ui.signup.confirm();
							});


						} else  if (textStatus == "success"){
							var data = e.responseText;
							var rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
							// lifted straight from jQuery.fn.load
							COSHDM.registration._vars.jqRegContent.html(jQuery("<div>").append(data.replace(rscript,"")).find("#registration"));
							COSHDM.registration.ui.signup.load(data);
							var listoparams = ser.split("&");
							for (var i = 0; i < listoparams.length; i++){
								var param = listoparams[i].split("=");
//								console.log("dumping",param[0],unescape(param[1]))
								$("[name="+param[0]+"]").val(unescape(param[1]));
							}

						}
						console.log("*****, complete..",e,textStatus);
						location.hash = "";
						location.hash = "#registerationOverlay";
					},
					success : function(data){}
				});
				return false;
			},
			confirm : function(){
				COSHDM.registration._vars.jqRegContent.load("/registration/confirmation.html #save_success",function(){
					COSHDM.registration.ui.renderLoginLinks();
				});
				

			},
			close : function(){COSHDM.registration.ui.loginOverlay.close();}
		},
		forgetPassword : {
			get : function(){
				COSHDM.registration.ui.loginOverlay.show(function(){
					COSHDM.registration._vars.jqRegContent.load("/registration/forgotPassword.html #forgotPassword",COSHDM.registration.ui.forgetPassword.load)
				})
			},
			load : function(data){
				COSHDM.registration.ui.loginOverlay.load(function(){
					$("#hdmForgotPassword").submit(COSHDM.registration.ui.forgetPassword.request);
					$('#hdmForgotPassword [href="\/login\/"]').click(function(){
						COSHDM.registration.ui.login.get();
						return false;
					})
				},data);
			},
			request : function(e){
				if (COSHDM.registration.ui.submitButton.processLock == true){
					return false;
				} // in order to prevent second request				
				
				COSHDM.registration._vars.jqRegOverlay.addClass("loading")
				var ser = $(this).serialize();
				var url = "/registration/resetPassword";
				var email = $("#hdmForgotPassword [name='email']").val();
				if (email == ""){
					COSHDM.registration.ui.forgetPassword.confirm(0);
					return false;
				}
				COSHDM.registration.ui.submitButton.lock();
				// lets first check if email exists..
				function mycallback(exists){
					if (exists){
						$.ajax({
							type : "POST",
							url : url,
							data : ser,
							beforeSend: function() {
							// show indicator
							},
							complete: function(e,textStatus) {
								// okay, if I'm here, I can trust that login 'worked'.. lets proceed once more..
								if (textStatus == "error"){
								} else if (textStatus == "success"){
								}
								COSHDM.registration.ui.forgetPassword.confirm(2);
								COSHDM.registration.ui.submitButton.unlock();
								console.log("ajax done!",e,textStatus);
							},
							success : function(data){
								COSHDM.registration.ui.forgetPassword.confirm(1);
							}
						});
					} else {
						COSHDM.registration.ui.forgetPassword.confirm(1);
						COSHDM.registration.ui.submitButton.unlock();
					}
				}
				COSHDM.registration._Fbuser.checkEmailExists(email,mycallback);
				
				return false;
			},
			confirm : function(state){
				COSHDM.registration._vars.jqRegOverlay.removeClass("loading");
				if (state == 0){ // email is missing, lets show error
					$("#forgotPassword .error").show().html("Please enter email address")
				}
				if (state == 1){ // email dose not exist, lets show error
					$("#forgotPassword .error").show().html("Your email address was not found in our records")
				}
				if (state == 2){
					$("#forgotPasswordInit,#forgotPassword .error, #hdmForgotPassword button, #hdmForgotPassword p label").hide();
					$("#forgotPasswordConfirm").show();
					$('#hdmLoginForm [href="\/login\/"]').click(function(){
						COSHDM.registration.ui.login.get();
						return false;
					})
				}
			},
			close : function(){COSHDM.registration.ui.loginOverlay.close();}
		},
		profile : {
			get : function(){
				COSHDM.registration.ui.loginOverlay.show(function(){
					var profileUrl = "/registration/editProfile.html?cachebust=" + Date.now() + " #editProfile";
					COSHDM.registration._vars.jqRegContent.load(profileUrl,COSHDM.registration.ui.profile.load);
				})
			},
			load : function(data){
				COSHDM.registration.ui.loginOverlay.load(function(){
					COSHDM.registration.ui.profile.dohousekeeping();
					$("#hdmEditProfileForm").submit(COSHDM.registration.ui.profile.submit);
				},data);
				
				if (typeof mag_user.facebook_id !== 'undefined'){
					$(".fbLinkButton").toggleClass('inactive');
				}
				else{
					$(".fbUnLinkButton").toggleClass('inactive');
				}
			},
			dohousekeeping : function(){
				//render 100 years back and set the users year if found
				//this should only run on pages with the dob_year select box on them
				$('select[name=dob_year]').each(function(){
					var currentYear = (new Date()).getFullYear(),
						startYear = currentYear - 100,
						$select = $(this), selectedYear = $select.attr('data-selectedyear'),
						$option = $('<option />'), $optionClone;

					for (var i = currentYear; i >= startYear; i--){
						$optionClone = $option.clone();
						$optionClone.val(i);
						$optionClone.text(i);
						if (!!selectedYear && selectedYear == i){
							$optionClone.attr('selected','selected');
						}
						$select.append($optionClone);
					}
				});
				//set the user's month if found
				$('select[name=dob_month]').each(function(){
					var $select = $(this), selectedMonth = $select.attr('data-selectedmonth'),
						$options = $select.find('option'), $selectedOption;
					if (!!selectedMonth){
						$selectedOption = $options.filter('[value='+ selectedMonth + ']');
						$select.get(0).selectedIndex = $options.index($selectedOption);
					}
				});
				//set the user's dob day if found
				$('select[name=dob_day]').each(function(){
					var $select = $(this), selectedDay = $select.attr('data-selectedday'),
						$options = $select.find('option'), $selectedOption;
					if (!!selectedDay){
						$selectedOption = $options.filter('[value=' + selectedDay + ']');
						$select.get(0).selectedIndex = $options.index($selectedOption);
					}
				});
				//we need to do some basic validation on the login and reg forms and set the cookie so we get an updated mag_user on next load
				$('#hdmLoginForm, #hdmEditProfileForm, #hdmRegistrationForm, #hdmConnectLogin, #quizLogin').submit(function(){
					var $this     = $(this)
						, $required = $this.find('[required]')
						, $error    = $this.find('.formError')
						, valid     = true;
					//validation
					switch ( this.id ){
						case 'hdmLoginForm':
							$required.each(function(i, val){
								if ( !val.value ){
									valid = false;
									$(val).addClass('error');
								} else {
									$(val).removeClass('error');
								}
							});
							if ( !valid ){
								$error.text('Please fill in all required fields.');
								$error.fadeIn( 200 );
							} else {
								$error.fadeOut( 200 );
							}
						default:
							break;
					}
					if ( valid ){ COSHDM.util.storeData('hdm_forceMagUserUpdate',true); }
					return valid;
				});
				// lets bind the link and unlink buttons for facebook..
				
				
				var showLinked = function(islinked){
					console.log("SHOWLINKED",islinked);
					if (islinked){
						$(".fbLinkButton").hide().addClass('inactive');
						$(".fbUnLinkButton").show().removeClass('inactive');
					} else {
						$(".fbUnLinkButton").hide().addClass('inactive');
						$(".fbLinkButton").show().removeClass('inactive');
					}
				}
				
				$(".fbUnLinkButton").click(function(){
					COSHDM.registration.action.unlinkFB(function(){
						showLinked(false)
					});
				})
				$(".fbLinkButton").click(function(){
					FB.getLoginStatus(function(response){
						if (response.status != "connected"){
							FB.login(function(response){
								COSHDM.registration._Fbuser.processLogin(response);
								if (response.status != "connected"){
									showLinked(false);
								} else {
									showLinked(true);
								}
							},{scope:'email'});
						} else {
							COSHDM.registration.action.linkFB(function(){
								showLinked(true);
							});
						}
					})
				})
				if (COSHDM.registration._vars.mag_user["facebook_id"]){
						showLinked(true);
				} else {
						showLinked(false);
				}
			},	
			submit : function(e){
				COSHDM.registration._vars.jqRegOverlay.addClass("loading")
				var ser = $(this).serialize();
				var url = "/registration/saveProfile";
				$.ajax({
					type : "POST",
					url : url,
					data : ser,
					beforeSend: function() {
					// show indicator
					},
					complete: function(e,textStatus) {
						// okay, if I'm here, I can trust that login 'worked'.. lets proceed once more..
						if (textStatus == "error"){
							COSHDM.registration._vars.jqRegContent.load("/registration/confirmation.html #profile_success")
						} else if (textStatus == "success"){
						}
						console.log("ajax done!",e,textStatus)
					},
					success : function(data){
						COSHDM.registration._vars.jqRegContent.html(data);
						COSHDM.registration.ui.profile.load(data);
						location.hash = "#registerationOverlay";
					}
				});
				return false;
			},
			close : function(){COSHDM.registration.ui.loginOverlay.close();}
		}

	},
	action : {
		logout : function(){
			// before we do anything, lets think about this for a sec.. how should we invoke a soft logout event...
			COSHDM.registration._Hearstuser.com.parentSet({},function(){
				COSHDM.registration._Maguser.generate({logged_in: true,tempstatus: true,cookieScan : "offline"},function(){
					if (window.location.href.match('/registration/')){
						// any locations to /registration get an autologout
						window.location.href = '/';
					} else {
						COSHDM.registration.ui.renderLoginLinks();
						COSHDM.registration.event.fire()
					}
				});
			});
		},
		linkFB : function(callback){
			//links fb accounts
			if (typeof callback !== 'function'){
				callback = function(){};
			}
			//don't need to pass params.. it reads acocunt info from the session cookies
			$.ajax({
				url: '/registration/FbLink',
				dataType: 'json',
				success: function(data){ //we should get back a valid mag_user with facebook_id set
					COSHDM.registration._Maguser.set(data); // also has callback.. (window.mag_user,callback);
					COSHDM.util.storeData('hdm_wasFBLinked',true); //store the "wasLinked" value for future checks
					callback(data); //execute the callback
				}
			});
		},
		unlinkFB : function(callback){
			if (typeof callback !== 'function'){
				callback = function(){};
			}
			//hit FbLink with delete=1.. will read account info from the session cookie
			$.ajax({
				url: '/registration/FbLink',
				data: { 'delete': 1 },
				dataType: 'json',
				success: function(data){
					//this doesn't return a mag_user, so we have to delete facebook_id on our own
					var magUser = COSHDM.registration._vars.mag_user; //get a pointer to mag_user
//					console.log("MAGUSER UNLINKED::",window.mag_user,COSHDM.registration._vars.mag_user,data)
					delete magUser.facebook_id; //delete the facebook_id
					COSHDM.util.eraseData('hdm_wasFBLinked'); //erase the "wasLinked" value so future checks know we're not linked anymore
					COSHDM.registration._Maguser.set(data); //update mag_user with the new object minus the facebook_id
					callback(); //execute the callback.. don't really need to pass mag_user back for anything
				}
			});
		},
		openFBLogin : function(){
			FB.login(function(response){
				// no need to bind a callback, the event handler does it for us now..
				if (COSHDM.registration._vars.fbResponse.status == "connected"){
					// ok user is logged in, lets process it..
					COSHDM.registration._Fbuser.processLogin(response);
				} else {
					// otherwise, we let the auth.statuschance event handler do the rest..
				}
			},{scope:'email'});

		},
		openLogin : function(){
			// if there are any other screens open, close em..
			COSHDM.registration.ui.login.get()
		},
		openSignup : function(){
			// check if user exists..
			if (COSHDM.registration._vars.hearst_user.logged_in == 1){
				// user is logged in, we're not supposed to run this..
				console.error("signup - user is logged in, will not load")
			} else {
				COSHDM.registration.ui.signup.get();
			}
		},
		openProfile : function(){
			// check if user exists..
			if (COSHDM.registration._vars.hearst_user.logged_in == 1){
				// user is logged in, lets open it up..
				COSHDM.registration.ui.profile.get();
			} else {
				console.error("editProfile - user is not logged in, will not load")
			}

		},
		forgotPassword : function(){
			// check if user exists..
			if (COSHDM.registration._vars.hearst_user.logged_in == 1){
				// user is logged in, we're not supposed to run this..
				console.error("forgotPassword - user is logged in, will not load")
			} else {
				alert("call for forgot password!")
			}
		}
	},
	_Maguser : {
		init : function(callback){
			function fastScanCookies(c){
				var c = c + "=",
					d = document.cookie.split(";"),
					b;
				for (b = 0; b < d.length; b++) {
					for (var a = d[b];
					" " === a.charAt(0);) a = a.substring(1, a.length);
					if (0 === a.indexOf(c)) return !0
				}
				return !1
			};
			if (fastScanCookies("password")&&fastScanCookies("cgi-session-id")&&fastScanCookies("fSpaceSSOUserCheck")){
//				console.log("[COSHDM.registration._Maguser.init] cookiescan determines user is ONLINE")
				var _mag_user = COSHDM.util.getJSON("mag_user");
				if (_mag_user["logged_in"] != 1){
					// cookie data does not match storage data! grabbing a fresh copy..
					COSHDM.registration._Maguser.generate(_mag_user,callback);
				} else {
					COSHDM.registration._Maguser.set(_mag_user,callback)
				}
			} else {
//				console.log("[COSHDM.registration._Maguser.init] cookiescan determines user is OFFLINE")
				this.set({ logged_in: false,tempstatus: true,cookieScan : "offline"});// setting mag_user offline no exceptions
				// this is where we also need to check if hearst_user is available...
				if (typeof callback == "function"){callback();};
			}
		},
		generate : function(_mag_user,callback){
			console.error("generate calledback",_mag_user)
			// okay, lets check if _mag_user is whack..
			function isEmpty(a){for(var b in a)if(a.hasOwnProperty(b))return!1;return!0}; // simple check to see if obj is empty
			if (isEmpty(_mag_user)){// meaning nothing was found.. lets build out an offline object and store it
				window["mag_user"] = { logged_in: false,tempstatus: true }; //set the temp mag_user to the stored mag_user, or a logged_out version of it
				COSHDM.registration._Maguser.set(window.mag_user,callback);
			} else if ((_mag_user.cookieScan == "offline") && (_mag_user.logged_in)){
//				console.warn("[_Maguser.generate] expensive logout call made to get_mag_user.js")
				var url = "/registration/logout?next_url=/registration/get_mag_user.js?cachebust="+Date.now();
				COSHDM.util.buildScriptTag(url,function(){
					COSHDM.registration._Maguser.set(window.mag_user,callback);
				});
			} else {// object is just incorrect.. lets re-get_mag_user.js it!
				COSHDM.registration.count.callstomag_user++; // just counting..
//				console.warn("[_Maguser.generate] expensive call made to get_mag_user.js")
				var url;
				if (!_mag_user.logged_in && (_mag_user.cookieScan == "online")){
					url = "/registration/login?next_url=/registration/get_mag_user.js?cachebust="+Date.now();
				} else {
					url = "/registration/get_mag_user.js?cachebust="+Date.now();
				}
				COSHDM.util.buildScriptTag(url,function(){
//					console.log("is empty",isEmpty(window["mag_user"]),window["mag_user"],callback)
					if (isEmpty(window["mag_user"])){// meaning nothing was found.. lets build out an offline object and store it
//						console.log("mag_user is empty",window["mag_user"]);
//						console.log("hearst_user",window["hearst_user"])
						window["mag_user"] = { logged_in: false,tempstatus: true }; //set the temp mag_user to the stored mag_user, or a logged_out version of it
					}
//					console.warn("YOOO CHECK ME")
//					console.log(window.mag_user)
					COSHDM.registration._Maguser.set(window.mag_user,callback);
				});
			}
		},
		set : function(_mag_user,callback){
			COSHDM.util.storeData("mag_user",_mag_user);// storing it in the browser
			COSHDM.registration._vars.mag_user = _mag_user; // grabbing a local reference for fast access
			window["mag_user"] = _mag_user;
			if (typeof callback == "function"){callback();};
		}
	},
	_Hearstuser : {
		bootCallback : null,
		previewHost : function(){
			if (window.location.host.match('alphapreview')){
				return "alphapreview.";
			} else if (window.location.host.match('betapreview')){
				return "betapreview.";
			} else {
				return "";
			}
		},
		init : function(callback){
			if (document.body == null){
				// LOL SO GHETTO, but I'm pressed for time
				/* okay so this needs an explanation
				 * sometimes this is invoked before the page finishes loading
				 * largely depends on _where_ in the html this is being called from
				 * some sites have this script in the header
				 * most of them in the footer
				 * if in the header, it usually just barfed
				 * but at least with this we can 'try again'
				 */
				setTimeout(function(){
					COSHDM.registration._Hearstuser.init(callback);
				},50)
				return false
			}
			try{
				/******************************************
				 * Why in a try catch block?
				 * Because fudge IE 7/8. Fudge its problems. Fudge the king.
				 *
				 *
				 */
				this.bootCallback = callback;

				COSHDM.registration._Hearstuser.tunnel.address = "http://"+COSHDM.registration._Hearstuser.previewHost()+"services.hearstmags.com/cm/shared/hdm-lib_hearstuser_proxy.min.html"; // this is the address used for the proxy;
				COSHDM.registration._Hearstuser.tunnel.address = "http://"+COSHDM.registration._Hearstuser.previewHost()+"services.hearstmags.com/cm/shared/hdm-lib_hearstuser_proxy.html"; // this is the address used for the proxy;
				//alert(new RegExp("^https?://[^/]+/").exec(COSHDM.registration._Hearstuser.tunnel.address)[0]);
				COSHDM.registration._Hearstuser.tunnel.origin = "http://"+COSHDM.registration._Hearstuser.previewHost()+"services.hearstmags.com"; // I wanna like, use a regexp but later on

				// build out iframe, begin tunneling info and get hearst_user via localstorage/cookie/jsfile
				window.addEventListener("message",COSHDM.registration._Hearstuser.tunnel.receive,false)
				COSHDM.registration._Hearstuser.tunnel.iframe = document.createElement('iframe')

				COSHDM.registration._Hearstuser.tunnel.iframe.style.position = "fixed";
				COSHDM.registration._Hearstuser.tunnel.iframe.style.top = "-50px";
				COSHDM.registration._Hearstuser.tunnel.iframe.style.left = "-50000px";
				COSHDM.registration._Hearstuser.tunnel.iframe.style.height = "1px";
				COSHDM.registration._Hearstuser.tunnel.iframe.style.width = "1px";
				COSHDM.registration._Hearstuser.tunnel.iframe.style.border = "none";
				COSHDM.registration._Hearstuser.tunnel.iframe.style.zIndex = "-1";
				COSHDM.registration._Hearstuser.tunnel.iframe.style['float'] = "left"; // closure compiler disallows certain keywords, so we gotta quote them
				COSHDM.registration._Hearstuser.tunnel.iframe.style.opacity = "0";


				document.body.appendChild(COSHDM.registration._Hearstuser.tunnel.iframe);
				COSHDM.registration._Hearstuser.tunnel.iframe.onload = function(){
					COSHDM.registration._Hearstuser.com.init(false);
				}
				COSHDM.registration._Hearstuser.tunnel.iframe.src = COSHDM.registration._Hearstuser.tunnel.address;


			} catch(e){
				// my plan for this is to fall back and treat this like mag_user..
				function fastScanCookies(c){
				var c = c + "=",
					d = document.cookie.split(";"),
					b;
				for (b = 0; b < d.length; b++) {
					for (var a = d[b];
					" " === a.charAt(0);) a = a.substring(1, a.length);
					if (0 === a.indexOf(c)) return !0
				}
				return !1
			};
				if (fastScanCookies("password")&&fastScanCookies("cgi-session-id")&&fastScanCookies("fSpaceSSOUserCheck")){
//					console.log("[COSHDM.registration._Hearstuser.init] cookiescan determines user is ONLINE")
					var _hearst_user = COSHDM.util.getJSON("mag_user");
					if (_hearst_user["logged_in"] != 1){
						// cookie data does not match storage data! grabbing a fresh copy..
						COSHDM.registration._Maguser.generate(_hearst_user,function(){
							window["hearst_user"] = window["mag_user"];
							COSHDM.registration._vars.hearst_user = window["mag_user"];
							if (typeof callback == "function"){callback();};
						});
					} else {
						window["hearst_user"] = _hearst_user;
						COSHDM.registration._vars.hearst_user = _hearst_user;
						if (typeof callback == "function"){callback();};
					}
				} else {
//					console.log("[COSHDM.registration._Hearstuser.init] cookiescan determines user is OFFLINE")
					COSHDM.registration._Maguser.set({ logged_in: false,tempstatus: true,cookieScan : "offline"});// setting mag_user offline no exceptions
					COSHDM.registration._vars.hearst_user = COSHDM.registration._vars.mag_user;
					window["hearst_user"] = COSHDM.registration._vars.mag_user;
					// this is where we also need to check if hearst_user is available...
					if (typeof callback == "function"){callback();};
				}

				// lets override that logout button..
				COSHDM.registration.action.logout = function(){
					COSHDM.registration._Maguser.generate({logged_in: true,tempstatus: true,cookieScan : "offline"},function(){
						COSHDM.registration._vars.hearst_user = COSHDM.registration._vars.mag_user;
						window["hearst_user"] = COSHDM.registration._vars.mag_user;
						if (window.location.href.match('/registration/')){
							// any locations to /registration get an autologout
							window.location.href = '/';
						} else {
							COSHDM.registration.ui.renderLoginLinks();
							COSHDM.registration.event.fire()
						}
					});
				}


			}
		},
		synchronize : function(){
			// console.log("[COSHDM.registration._Hearstuser.synchronize] begin syncprocess, sending syn")
			this.com.init(true);
		},
		attemptLogin : function(callback){
			var l = document.location;
			var url = l.protocol+"//"+l.host+"/registration/login?next_url=http://"+COSHDM.registration._Hearstuser.previewHost()+"services.hearstmags.com/registration/get_hearst_user.js"
			if (navigator.appName == "Microsoft Internet Explorer"){
				window.location = "/registration/login?next_url="+document.location.href;
			} else {
				COSHDM.util.buildScriptTag(url,function(){
//					console.warn("[_Hearstuser] expensive login requested hearst_user",window.hearst_user);
					COSHDM.registration._vars.hearst_user = window.hearst_user;
					COSHDM.registration._Hearstuser.com.parentSet(window.hearst_user);
					if (typeof callback == "function"){callback();};
				});
			}
		},
		gethearstuser : function(callback){
			var url = "http://"+COSHDM.registration._Hearstuser.previewHost()+"services.hearstmags.com/registration/get_hearst_user.js?cachebust="+Date.now();
			COSHDM.util.buildScriptTag(url,function(){
				if (JSON.stringify(window.hearst_user) == '{"initial_login":1}'){
					// ok see this little beaut here? This is the result of the servers' static file
					window.hearst_user = { initial_login: 1, logged_in: false,tempstatus: true,cookieScan : "offline"};
				}
				COSHDM.registration._vars.hearst_user = window.hearst_user;
				COSHDM.registration._Hearstuser.com.parentSet(window.hearst_user);
				if (typeof callback == "function"){callback(window.hearst_user);};
			});

		},
		com : {
			init : function(forced){
				var forceUpdate = forced || !!COSHDM.util.getData('hdm_forceMagUserUpdate');
				COSHDM.util.eraseData('hdm_forceMagUserUpdate');
				COSHDM.registration._Hearstuser.tunnel.send({
					command : "initialize",
					force : forceUpdate
				});
			},
			parentSet : function(_hearst_user,callback){
				// time for ghetto check for empty obj
				function isEmpty(a){for(var b in a)if(a.hasOwnProperty(b))return!1;return!0}; // simple check to see if obj is empty
				if (isEmpty(_hearst_user)){// meaning nothing was found.. lets build out an offline object and store it
					_hearst_user = { logged_in: false,tempstatus: true,cookieScan : "offline"};
				}
				window["hearst_user"] = _hearst_user;
				COSHDM.registration._vars.hearst_user = _hearst_user;
				COSHDM.registration._Hearstuser.tunnel.send({
					command : "parentSet",
					hearst_user : _hearst_user
				});
				if (typeof callback == "function"){callback();};
			},
			tearDown : function(){
				// tear this entry down
				COSHDM.registration._Hearstuser.tunnel.send({
					command : "delete"
				});
			}
		},
		tunnel : {
			iframe : null,
			address : null, // this is the address used for the proxy
			origin : null, // damn, I'm feeling lazy so here we go
			send : function(message){
				if (typeof message == "object"){
					message = JSON.stringify(message);
				}
				COSHDM.registration._Hearstuser.tunnel.iframe.contentWindow.postMessage(message,COSHDM.registration._Hearstuser.tunnel.origin)
			},
			receive : function(e){
				//console.warn("[COSHDM.registration._Hearstuser.tunnel.receive] received!",msg)
				if ((e.origin == COSHDM.registration._Hearstuser.tunnel.origin) && (e.source == COSHDM.registration._Hearstuser.tunnel.iframe.contentWindow)){
					//console.error("COSHDM.registration.hearst_user.messageReceived! LOOKS LEGIT",e,e.data)
					var msg = JSON.parse(e.data);
					if (msg.command == "save"){
						//console.log("Lets save hearst_user",(msg.hearst_user == COSHDM.registration._vars.mag_user))
						COSHDM.registration._vars.hearst_user = msg.hearst_user;
						COSHDM.registration.boot._vars.hearst_isReady = true;
					} else if (msg.command == "parentget"){
						COSHDM.registration._Hearstuser.gethearstuser(function(){
							COSHDM.registration.boot._vars.hearst_isReady = true;
						})
					} else if (msg.command == "ack"){
//						console.log("ack received!");
					} else {
//						console.error("[COSHDM.registration._Hearstuser.tunnel.receive] unrecognized command",msg)
					}
				}
			}
		}
	},
	_Fbuser : {
		init : function(callback){
			COSHDM.util.buildScriptTag('//connect.facebook.net/en_US/all.js',function(){
				//init the facebook api..
				FB.init({
					appId: COSHDM.registration._vars.fbAppID, //pass in the Site object's app id
					status: true, //we want status
					cookie: true, //we want fb to set cookies
					xfbml: true, //we want to parse xfbml
					channelUrl : document.location.protocol+"//"+document.location.host+"/cm/shared/channel.html" //this helps with issues in IE where we're getting hits from ?xd_fragment= or whatever it is
				});
				FB.getLoginStatus(function(response){
					COSHDM.registration._vars.fbResponse = response;
					if (response.status == "connected"){
						COSHDM.registration._Fbuser.getfbUser(callback); // make sure not to execute it, but to pass it along..
					} else {
						FB.Event.subscribe('auth.statusChange',function(response){
							COSHDM.registration._vars.fbResponse = response;
							COSHDM.registration._Fbuser.processLogin(response);
						})
						// lets bind a status change event
						if (typeof callback == "function"){callback();};
					}
				});

				$(document).ready(function(){
					//set up the link/unlink button on the profile form
					// eek, kinda messy but whatever works..
					$('fieldset#facebookConnect').each(function linkUnlink(){
						// mike is a big fan of self... and I don't feel like refactoring all this.. so I'll just be lazy
						var self = COSHDM.registration._Fbuser

						var $this = $(this), $status = $('#editProfileFBStatus'),
							$button = $this.find('.linkButton'),
							statusText = '', buttonText = '';
						//set the appropriate button based on whether we're linked or not
						if ( self.isLinked() ){
							$status.addClass('linked').text('linked');
							$button.addClass('linked').text('unlink');
						} else {
							$status.addClass('unlinked').text('unlinked');
							$button.addClass('unlinked').text('link');
						}
						$button.click(function(){
							//when the button is clicked, check for existing link
							if ( self.isLinked() ){
								//if we're linked, unlink and switch the button
								COSHDM.registration.action.unlinkFB(function(){
									COSHDM.registration.ui.renderLoginLinks();
									$status.removeClass('linked').addClass('unlinked').text('unlinked');
									$button.removeClass('linked').addClass('unlinked').text('link');
								});
							} else {
								//if we're not linked, link and switch the button
								COSHDM.registration.action.linkFB(function(){
									COSHDM.registration.ui.renderLoginLinks();
									$status.removeClass('unlinked').addClass('linked').text('linked');
									$button.removeClass('unlinked').addClass('linked').text('unlink');
								});
							}
							return false;
						});
					});
				})
			});

		},
		getfbUser : function(callback){
			FB.api('/me',function(response){
				COSHDM.registration._vars.fbUser = response;
				if (typeof callback == "function"){callback();};
			});
		},
		queryFBLinkisEmpty : function(callback){
			if (typeof callback !== 'function'){callback = function(){};}
			$.ajax({
				url: '/registration/FbLink',
				dataType: 'json',
				success: function(data){
					function isEmpty(a){for(var b in a)if(a.hasOwnProperty(b))return!1;return!0}; // simple check to see if obj is empty
					callback(isEmpty(data));
				}
			});

		},
		checkEmailExists : function(emailToCheck,callback){
			if (typeof callback !== 'function'){callback = function(){};}
			$.ajax({
				url: '/registration/email_exist',
				data: { email: emailToCheck },
				success: function(response){
					var exists = (response !== 'Does not exist');
					callback(exists);
				}
			});
		},
		createLinkedAccount: function(email,callback){ //creates a linked account given the email address associated with the user's facebook account
			if (typeof callback !== 'function'){
				callback = function(){};
			}
			//hit FbLink with the email address.. we should get a valid mag_user back
			$.ajax({
				url: '/registration/FbLink',
				data: { email: email },
				dataType: 'json',
				success: function(data){
					COSHDM.registration._Maguser.set(data); //update the mag_users
					COSHDM.util.storeData('hdm_wasFBLinked',true); //store the "wasLinked" value for future checks
					COSHDM.registration._Hearstuser.attemptLogin(function(){
						COSHDM.registration.ui.renderLoginLinks();
						COSHDM.registration.event.fire();
					});
				}
			});
		},
		isLoggedIn : function(){
			return (COSHDM.registration._vars.fbResponse) ? COSHDM.registration._vars.fbResponse.status !== "unknown" : false;
		},
		isConnected : function(){
			return (COSHDM.registration._vars.fbResponse) ? COSHDM.registration._vars.fbResponse.status === "connected" : false;
		},
		isLinked : function(){
			return !!COSHDM.registration._vars.mag_user.facebook_id;
		},
		initiateHDMSignin : function(){
			var proceedWithLink = COSHDM.util.getData('hdm_linkProcess');
			var wasLinked = COSHDM.util.getData('hdm_wasFBLinked'),
			$exists, $thanks, $accountsLinked, modalAPI, $modalAnchor = $('<div id="hdmModalAnchor" />').appendTo('body').hide();
			COSHDM.registration._Fbuser.getfbUser(function(){
				// once we have the info...
				var info = COSHDM.registration._vars.fbUser; //set a local pointer to it
				COSHDM.registration._Fbuser.checkEmailExists(COSHDM.registration._vars.fbUser.email,function(exists){
					if (exists){//if it exists, pop the existing account modal
						COSHDM.util.storeData('hdm_linkProcess',true);
						if ( proceedWithLink ){
							$accountsLinked = $('#accountsLinked');
							$(document.body).addClass("showFbLink");

							COSHDM.registration.action.linkFB(function(){
								$modalAnchor.overlay({
									target: '#accountsLinked',
									load: true
								});
								modalAPI = $modalAnchor.data('overlay');
								$accountsLinked.find('a.continue,[fblink=close]').click(function(){
									modalAPI.close();
									$(document.body).removeClass("showFbLink");
								});
								COSHDM.registration.ui.renderLoginLinks();
								COSHDM.util.eraseData('hdm_linkProcess');
							});
							return;
						}
						$exists = $('#connectEmailExists');
						$exists.find('.hdmFacebookPic').html('<img src="https://graph.facebook.com/' + info.id + '/picture" width="50" height="50" />');
						$exists.find('.welcome').text('Welcome, ' + info.first_name);
						$exists.find('input[name=user_name]').val(info.email);
						$exists.find('form').submit(function(){
							var $error = $(this).find('.loginError');
							if ( ! $(this).find('[name=user_name]').val() || !$(this).find('[name=password]').val() ){
								$error.text('Please fill out your username and password');
								return false;
							} else {
								COSHDM.util.storeData('hdm_linkProcess',true);
								return true;
							}
						});
						$modalAnchor.overlay({
							target: '#connectEmailExists',
							load: true,
							closeOnEsc: false,
							closeOnClick: false
						});
						modalAPI = $modalAnchor.data('overlay');
						$exists.find('.cancelLink,[fblink=close]').click(function(){
							modalAPI.close();
							$(document.body).removeClass("showFbLink");
							COSHDM.util.eraseData('hdm_linkProcess');
						});
						$exists.find('[fblink=forgotpassword]').click(function(){
							modalAPI.close();
							$(document.body).removeClass("showFbLink");
							COSHDM.registration.ui.forgetPassword.get();
						})
						$("#hdmConnectLogin").append("<input type='hidden' name='next_url' value='"+(( window.location.href.match('/registration/') ) ? '/' : window.location.href)+"'>");

					} else {//if the email doesn't exist in the db, lets create an HDM account
						COSHDM.registration._Fbuser.createLinkedAccount(info.email,function(){
							COSHDM.registration.ui.renderLoginLinks();
							$(document.body).addClass("showFbLink")
							$thanks = $('#thanksForJoining');
							$modalAnchor.overlay({
								target: '#thanksForJoining',
								load: true,
								closeOnClick: false
							});
							modalAPI = $modalAnchor.data('overlay');
							$thanks.find('a.continue,[fblink=close]').click(function(){
								modalAPI.close();
								$(document.body).removeClass("showFbLink");
							});
						});

					}
				});
			});
		},
		processLoginTimestamp : Date.now(),
		processLogin : function(response){//
			if ((Date.now()-this.processLoginTimestamp)<200){
//				console.error("[processLogin] revoking calls made too soon")
				return false;
			}//console.log("[processLogin] timeStamp:",this.processLoginTimestamp,Date.now()-this.processLoginTimestamp)
			this.processLoginTimestamp = Date.now();

			var oldResponse = COSHDM.registration._vars.fbResponse;
			var newResponse = response;
			//console.log("(( FB.login ))",oldResponse,newResponse)
			function fastScanCookies(c){
					var c = c + "=",
						d = document.cookie.split(";"),
						b;
					for (b = 0; b < d.length; b++) {
						for (var a = d[b];
						" " === a.charAt(0);) a = a.substring(1, a.length);
						if (0 === a.indexOf(c)) return !0
					}
					return !1
				};
			if ((newResponse.status == "connected") && fastScanCookies("password")&&fastScanCookies("cgi-session-id")&&fastScanCookies("fSpaceSSOUserCheck")){
				
				// user is logged in, and connecting...
				COSHDM.registration.action.linkFB(function(newmag_user){
//					console.log("linked mag_user",newmag_user,COSHDM.registration._vars.mag_user,window["mag_user"])
					COSHDM.registration._Hearstuser.attemptLogin(function(){
						COSHDM.registration.ui.renderLoginLinks();
						COSHDM.registration.event.fire();
						// also popup thank you event
						$(document.body).addClass("showFbLink");
						var $linked = $('#accountsLinked'), modalAPI,
							$modalAnchor = $('<div id="modalAnchor" />').appendTo('body').hide();
								$modalAnchor.overlay({
								target: '#accountsLinked',
								load: true,
								closeOnClick: false
							});
							modalAPI = $modalAnchor.data('overlay');
//							$linked.click(function(){
//								modalAPI.close();
//							});
						$('#accountsLinked').find('a.continue').click(function(){
							$modalAnchor.data('overlay').close();
							$(document.body).removeClass("showFbLink");
						});
						$('#accountsLinked').find('[fblink=closetoProfile], [fblink=close]').click(function(){
							$modalAnchor.data('overlay').close();
							$(document.body).removeClass("showFbLink");
							COSHDM.registration.ui.profile.get();
						});
					});
				});
			} else if (newResponse.status == "connected"){
				// but NOT logged in... that's when we take action
				COSHDM.registration._Fbuser.queryFBLinkisEmpty(function(FBLinkisEmpty){
					// if FBLink returns empty, that means we begin the initiate signin process
					if (FBLinkisEmpty){
//						console.log("initiateHDMSignin")
						COSHDM.registration._Fbuser.initiateHDMSignin();
					} else {
						// otherwise we are logged in, set cookies and be on our way.
						// rebooting the registration process...
//						console.log("[processLogin] attemptLogin");
						COSHDM.registration._Hearstuser.attemptLogin(COSHDM.registration.process);
					};
				})
			}
		}
	},
	boot : {
		_vars : {
			started : false,
			intervalID : null,
			mag_isReady : false, // boot._vars.mag_isReady = true
			hearst_isReady : false,
			fb_isReady : false,
			counter : 0,
			loopstartdate : 0
		},
		start : function(fbAppID){
			// build code here to get mag_user
			COSHDM.registration._Maguser.init(function(){COSHDM.registration.boot._vars.mag_isReady = true});

			// build code here to get hearst_user
			COSHDM.registration._Hearstuser.init(function(){COSHDM.registration.boot._vars.hearst_isReady = true});

			// build code here to get fb user
			if (fbAppID){
				COSHDM.registration._vars.fbAppID = fbAppID;
				COSHDM.registration._Fbuser.init(function(){COSHDM.registration.boot._vars.fb_isReady = true});
			} else {
				COSHDM.registration.boot._vars.fb_isReady = true
			}
			// begin loop..
			COSHDM.registration.boot._vars.loopstartdate = Date.now();
			this._vars.intervalID = window.setInterval(COSHDM.registration.boot.scan,250);
		},
		scan : function(){
			// wanna know why I have to do this?
			// it's because 2 of the calls have to be made async
			// fb needs to initialize via facebook's own fancypants code
			// worse is that hearst_user is needed via an iframe, used to tunnel messages
			// 4x a second isn't so bad tho..
			if (COSHDM.registration.boot._vars.mag_isReady && COSHDM.registration.boot._vars.hearst_isReady && COSHDM.registration.boot._vars.fb_isReady){
				window.clearInterval(COSHDM.registration.boot._vars.intervalID);
				COSHDM.registration.process();
			}
			if ((COSHDM.registration.boot._vars.loopstartdate+5000) < Date.now()){
				window.clearInterval(COSHDM.registration.boot._vars.intervalID);
				COSHDM.registration.process();
			}
			COSHDM.registration.boot._vars.counter++;
			if (COSHDM.registration.boot._vars.counter++ > 40){
			}
		}
	},
	event : {
		_vars : {
			fireInterval : null
		},
		renderLoginLinks : function(func){
			/************************************
			 * Event hooks to enable callbacks on renderLoginLInks
			 * 
			 * COSHDM.registration.event.renderLoginLinks(function(){alert("hello world!")});
			 ************************************/
			if (typeof func == "function"){
				COSHDM.registration._vars._event_queue.renderLoginLinks.push(func);
			} else {
				console.log("[event.renderLoginLinks] invalid function callback:"+(typeof func),func)
			}
		},
		loggedin : function(func){
			if (typeof func == "function"){
				COSHDM.registration._vars._event_queue.loggedin.push(func);
			} else {
				console.log("[event.loggedin] invalid function callback:"+(typeof func),func)
			}
		},
		loggedout : function(func){
			if (typeof func == "function"){
				COSHDM.registration._vars._event_queue.loggedout.push(func);
			} else {
				console.log("[event.loggedin] invalid function callback:"+(typeof func),func)
			}
		},
		sure : {
			loggedin : function(){
				if (COSHDM.registration._vars._event_queue.loggedin.length > 0){
					window.clearInterval(COSHDM.registration.event._vars.fireInterval);
					COSHDM.util.processQueue("queue.loggedin",COSHDM.registration._vars._event_queue.loggedin);
				}
			},
			loggedout : function(){
				if (COSHDM.registration._vars._event_queue.loggedout.length > 0){
					window.clearInterval(COSHDM.registration.event._vars.fireInterval);
					COSHDM.util.processQueue("queue.loggedin",COSHDM.registration._vars._event_queue.loggedout);
				}
			}
		},
		fire : function(){
			var mLoggedin = !!COSHDM.registration._vars.mag_user["logged_in"]
			var hLoggedin = !!COSHDM.registration._vars.hearst_user["logged_in"]
			if (mLoggedin && hLoggedin){//console.error("[event.fire] user is logged IN!")
				COSHDM.registration.event._vars.fireInterval = setInterval(COSHDM.registration.event.sure.loggedin,250);
			} else if (!mLoggedin && !hLoggedin){//console.error("[event.fire] user is logged OUT!")
				COSHDM.registration.event._vars.fireInterval = setInterval(COSHDM.registration.event.sure.loggedout,250);
			} else {
				console.error("[COSHDM.registration.event] login state out of sync",mLoggedin,hLoggedin)
			}
		}
	}
};



/**********************************************************
 *
 * HDM smartImages
 *
 * Handles the lazy loading scripts, along with choosing the appropriate cut sizes
 * based on dom attributes. The attribute syntax looks something like this:
 *
 * hdmimgcut_[width]x[height]="path/to/file.jpg"
 *
 * make sure we have hdmimg="smart" attribute in the dom node as well. Classnames
 * smartload and noimg will change dynamically and only have a visual impact, mostly
 * for fancy fadin effects and stuff
 *
 * <img class="smartload noimg" hdmimg="smart" src="placeholder16x9.gif" hdmimgcut_1280x768="reallylargefile.jpg" hdmimgcut_960x576="largefile.jpg" hdmimgcut_640x384="mediumfile.jpg" hdmimgcut_320x192="smallfile.jpg" hdmimgcut_160x96="thumbfile.jpg" >
 *
 * attributes:
 *		hdmimg
 *			- smart - standard attribute name
 *			- unique - there is only one image being used here, so replace common images
 *
 *
 **********************************************************/
COSHDM.smartImages = {
	_vars : {
		devicePixelRatio : 1, // lets default this to one..
		imglist : [],
		windowHeight : null,
		jqwindowobj : null/*,
		loadQueue : []*/
	},
	fn : {
		checksize : function(){
		},
		loadByimg : function(imgObj){
			var imglist = COSHDM.smartImages._vars.imglist;
			var foundsmartimg = null;
			for (var i = 0; i < imglist.length; i++){
				if (imglist[i].img = imgObj){
					foundsmartimg = imglist[i];
					break;
				}
			}
//			console.log("DURD ER FURD ERT?",foundsmartimg,foundsmartimg.img)
			if (foundsmartimg != null){
				COSHDM.smartImages.fn.loadIt(foundsmartimg);
			}

		},
		loadIt: function(smartimg,force){
			// ok even before all that, lets' find out if this element is attached to the dom..
			var elementInDocument = function(e) {
				while (e = e.parentNode) {
					if (e == document) {return true;}
				}
				return false;
			}
			if (!elementInDocument(smartimg.img)){
//				console.warn("[COSHDM.smargImages.fb.loadInt] imagen not in dom",smartimg);
				return false;
			}
			// before we do antyhing, lets check smartimg and see if the idealURL is already being used as the src
			if ((smartimg.img.src == smartimg.selectedCut[0]) && (!force)){
//				console.warn("***** same url found",smartimg.img.src,smartimg.selectedCut);
				return false;
			}
			if ((smartimg.top == -1)&&(!force)){
				return false;
			}
			// lets see if it is hidden..
			if ((window.getComputedStyle(smartimg.img,null).getPropertyValue("display") == "none")&&(!force)){
				return false;
			}
			if (smartimg.img.src == smartimg.selectedCut[0]){
				return false; // if the same img is attempted to being loaded, lets pass..
			}
			var newimg = new Image();
//			alert("load it"); return false;
			function loadme(){
				smartimg.jqobj.removeClass("noimg");
				smartimg.img.src = this.src;
				smartimg.jqobj.addClass("loaded");
			}
			newimg.addEventListener('load',loadme,false);
			newimg.src = smartimg.selectedCut[0];
		},
		lazyLoadit : function(){
		},
		selectImageSrc : function(index){
			// let's get the img object..
			myimg = COSHDM.smartImages._vars.imglist[index];

		},
		register : function(imgObj,imgType,nosave){
			var jqsmart = $(imgObj)
			// lets find all the cuts...
			var cuts = [];
			var attributes = imgObj.attributes;
			for (var i = 0; i < attributes.length; i++){
				var name = attributes[i].nodeName.toLowerCase();
				if (/hdmimgcut_\d+x\d+$/.test(name)){
					var dimensions = name.split("hdmimgcut_")[1].split("x");
					cuts.push([attributes[i].nodeValue,parseInt(dimensions[0]),parseInt(dimensions[1])]);
					// array format: [hdmimgcut_1280x768,1280,768]
					// or [name, width, height]
				}

			}

			if (cuts.length == 0){
				console.warn("[COSHDM.smartImages.fn.register] no image cuts found",imgObj);
				return false;
			}
			cuts.sort(function(a,b){return b[1]-a[1]});// sort it by width value - I love these slick functions, always so fancy
			var smartimg = {
				height : jqsmart.height(),
				width : jqsmart.width(), // needed when image is resized and need to check to see if the url we need is good enough
				top : -1,
				loaded : false,
				cuts : cuts,
				selectedCut : [],
				imgType : imgType,
				jqobj : jqsmart,
				img : imgObj // may not need these..
			}
/*			jqsmart.load(function(){
//				smartimg.top = smartimg.jqobj.offset().top;
				console.log("smartimg test "+smartimg.jqobj.offset().top,smartimg,this)
			});*/
			// keep in mind that if there are redundant image
			var found = false;
			if (imgType == "unique"){
				var imglist = COSHDM.smartImages._vars.imglist;
				for (var i = 0; i < imglist.length; i++){
					var testimg = imglist[i];
					if (testimg.img.src == smartimg.img.src){
						// reference has already been found, lets replace it..
						COSHDM.smartImages._vars.imglist[i] = smartimg;
						found = true;
						break;
					}
				}
			} else {
			// okay, so we will also need to make sure any redundant files pointing to the same src file will
			// not be referenced twice..
				var imglist = COSHDM.smartImages._vars.imglist;
				for (var i = 0; i < imglist.length; i++){
					var testimg = imglist[i];
					if (testimg.img == smartimg.img){
						// reference has already been found, lets replace it..
//						console.error("[COSHDM.smartImages.fn.register] duplicate img ref found, ignoring..",smartimg)
						found = true;
						break;
					}
				}
			}

			console.warn("regme",imgType)

			if (!found && (imgType != "carousel") && (imgType != "flipbook")){
				COSHDM.smartImages._vars.imglist.push(smartimg);
				return smartimg;
			} else if ((imgType == "carousel")||(imgType == "flipbook")){
				// we do not store carousel images in the smartImage bank, carousels have their own management
				// same thing with flipbook..
				return smartimg;
			} else if (nosave){
				console.warn("not saving this smartimg in the registry, simply just pass the obj back")
				return smartimg;
			} else {
				return smartimg;
			}
		},
		findIdealImageSrc : function(smartimg){
			smartimg.loaded = false;
			var currentwidth = smartimg.width*COSHDM.smartImages._vars.devicePixelRatio;

			var cuts = smartimg.cuts;
			var chosencut;
			for (var i = 0; i < cuts.length; i++){
				var mywidth = cuts[i][1];
				if (mywidth > currentwidth){// this sucker works because it's sorted.. remember?
					chosencut = cuts[i];
				}
			}
			if (!chosencut){
				chosencut = cuts[0];
			}
			if (smartimg.selectedCut.length < 1){
				smartimg.selectedCut = chosencut;
			} else 	if (chosencut[1] > smartimg.selectedCut[1]){
//				console.log("chosen cut changed!",chosencut[1],smartimg.selectedCut[1]);
				smartimg.selectedCut  = chosencut
			} else if (!chosencut){
				smartimg.selectedCut = cuts[0];
			}
//			console.log("selected cut found",smartimg.selectedCut)
			/*
				in addition to this, we need to be able to detect things like retina display.. also, I kinda wanna do a load comparison to see if it is worth checking the load times
				that way I can figure out if I need to load up a smaller image next time around... you know what, tat's really complicated, lol
				yeah scratch that. I'll do that later, right now I"m just pressed for time.
			*/
			return smartimg;// after it is all found and set to idealURL, pass the var back..
		}
	},
	event : {
		repositionCheck : function(e){
			// do we need to grab the window for anything? oh yeah, to determine the bottom..
			COSHDM.smartImages._vars.windowHeight = COSHDM.smartImages._vars.jqwindowobj.height();
			for(var i = 0; i < COSHDM.smartImages._vars.imglist.length; i++){
				var smartimg = COSHDM.smartImages._vars.imglist[i];
				var ttop = smartimg.jqobj.offset().top;
				if (smartimg.top != ttop){
					COSHDM.smartImages._vars.imglist[i].top = ttop;
					// hopefully this isn't too taxing...
				}
				var twidth = smartimg.jqobj.width()
				if (smartimg.width != twidth){
					// find the ideal image width
					COSHDM.smartImages._vars.imglist[i].width = twidth;
					if (COSHDM.smartImages._vars.imglist[i].imgType == "carousel"){// ok thing about the carousels, they will have to manage their own images.. hrm how the frig
						continue; // bail out for carousels
					}

					COSHDM.smartImages.fn.loadIt(COSHDM.smartImages.fn.findIdealImageSrc(COSHDM.smartImages._vars.imglist[i]));
				}
			}
		},
		scrollCheck : function(e){
			/*			// initially used to throttle down the scrollCheck event.. but prolly not necessary
			var timegate = true;
			if (e && (e.timeStamp > (COSHDM.smartImages._vars.scrollTimestamp+100))){
				console.log("DO EEET")
				timegate = false;
				COSHDM.smartImages._vars.scrollTimestamp = e.timeStamp;
			}
			if (timegate){
				return;
			}*/
			var scrollValue = COSHDM.smartImages._vars.jqwindowobj.scrollTop();
			for(var i = 0; i < COSHDM.smartImages._vars.imglist.length; i++){
				if (COSHDM.smartImages._vars.imglist[i].loaded){
					continue;
				}
				if (COSHDM.smartImages._vars.imglist[i].imgType == "carousel"){
					// ok thing about the carousels, they will have to manage their own images.. hrm how the frig
					continue;
				}
				var smartimg = COSHDM.smartImages._vars.imglist[i];
				smartimg.top = smartimg.jqobj.offset().top; // man.. I really didn't want to call this like this..
				if ((smartimg.top-(COSHDM.smartImages._vars.windowHeight*2)) < scrollValue){
					if (!smartimg.loaded){
						COSHDM.smartImages._vars.imglist[i].loaded = true;
						COSHDM.smartImages.fn.loadIt(smartimg);
//						console.warn("load it!",smartimg,smartimg.top,COSHDM.smartImages._vars.windowHeight,scrollValue,smartimg.jqobj.offset().top)
					}
				}
			}
		}
	},
	init : function(){
		COSHDM.smartImages._vars.devicePixelRatio = window["devicePixelRatio"] ? window["devicePixelRatio"] : 1;
		COSHDM.smartImages._vars.jqwindowobj = $(window);
		/*
		 scan the loaded page, look for all images
		 register all lazyloading images
		 load up initial set, then bind events to resize and scroll
		*/

		var unculledimages = $("img.smartload");
		unculledimages.each(function(index){
			var attr = this.getAttribute("hdmimg")
			if ((attr) && (attr != "carousel")){
				COSHDM.smartImages.fn.register(this,attr);
			}
		})
		// let's test this out..
		COSHDM.smartImages._vars.jqwindowobj.resize(COSHDM.smartImages.event.repositionCheck);
		COSHDM.smartImages._vars.windowHeight = COSHDM.smartImages._vars.jqwindowobj.height();
		for(var i = 0; i < COSHDM.smartImages._vars.imglist.length; i++){
				// write code here to generate idealURL
				COSHDM.smartImages.fn.findIdealImageSrc(COSHDM.smartImages._vars.imglist[i])
		}
		// bind scroll event
		$(document).scroll(COSHDM.smartImages.event.scrollCheck);
		// let's initiate reposition event
	}
}





$(document).ready(function() {
	COSHDM.menu.init();
	COSHDM.footer.init();
	COSHDM.search.init();
	COSHDM.smartImages.init();
	COSHDM.registration.init();
});
	