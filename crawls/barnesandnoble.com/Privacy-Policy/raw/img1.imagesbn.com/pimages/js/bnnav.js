var bnNav = {
    setCsXSLTCookie:function(yesOrNo){
        this.setCookie("csxslt",yesOrNo);
    },
    checkIfSupported: function(){
       XslParams.paramsCollection["transform"] = "y";
       var result = XmlUtil.xslTransform("/include/xxl/navbar/navTest.xml","/include/xxl/navbar/navTest.xsl");
       if (result && result=="Pass")
            this.setCsXSLTCookie("yes");
       /*if (result.firstChild) {
            if (result.firstChild.nodeValue=="Pass")
                this.setCsXSLTCookie("yes"); 
       }
       else if (result=="Pass") {
            this.setCsXSLTCookie("yes");
       }*/
    },
    render: function(xmlUrl,xslUrl){
        var nav = XmlUtil.xslTransform(xmlUrl,xslUrl,"navContainer");     
        if (nav==null)
            this.setCsXSLTCookie("no");
        /*    
        if (document.getElementById("promo") && document.getElementById("promo").textContent) {
            document.getElementById("promo").innerHTML = document.getElementById("promo").textContent;    
        }
        */
    },
    getCookie: function(Name) {
        var search = Name + "="   
        if (document.cookie.length > 0) { // if there are any cookies 
             offset = document.cookie.indexOf(search)       
             if (offset != -1) { // if cookie exists          
             offset += search.length          
             // set index of beginning of value 
             end = document.cookie.indexOf(";", offset)          
             // set index of end of cookie value         
             if (end == -1)             
 	            end = document.cookie.length         
	            return unescape(document.cookie.substring(offset, end))      
	            }    
            }
    },
    setCookie: function(c_name,value,days) {
        if(days){
            (time = new Date()).setTime(new Date().getTime()+days*24*60*60*1000);
            var exp = '; expires='+time.toGMTString();
        }else{
            var exp='';
        }
        document.cookie=c_name+"="+value+exp+"; domain=barnesandnoble.com;path=/";
    },
    buildPromo: function(PID, isMember, sourceID) {
		elm = document.getElementById('hb-members');
		if (!elm) return;
		
//		var cdsPage = "http://www.barnesandnoble.com/promo/cds_bannerpromo.asp?PID=";
//		if (isMember)
//		    cdsPage = "http://www.barnesandnoble.com/promo/cds_bannerpromo_mbr.asp?PID=";			
		var cdsPage = "http://"+BN.Environment.Host.getMappedDomain("WEB")+"/promo/cds_bannerpromo.asp?PID=";
		if (isMember)
		    cdsPage = "http://"+BN.Environment.Host.getMappedDomain("WEB")+"/promo/cds_bannerpromo_mbr.asp?PID=";	
		
		elm.removeAttribute("style");
		
		elm.innerHTML = "";
		var promoIframe = document.createElement("iframe");
		promoIframe.setAttribute("id","promoIframe");
		if (sourceID=="") {
			promoIframe.src = cdsPage + PID;
        } else {
			promoIframe.src = cdsPage + PID + "&xx=" + sourceID;
        }	
		promoIframe.scrolling = "no";
        promoIframe.setAttribute("frameBorder", 0);
        elm.appendChild(promoIframe);
     }
}

// ************************************************************************************************
// The following code is for the iframed CDS promo on Search Results and Product Pages
// ************************************************************************************************

var jsIframe_js = true;

function makeIframeWithPID (pid, host, url, qs, width, height, kw, kwZone) {
	var iSrc;
	var iHost;
	var iURL;
	var iQS;
	var iWidth;
	var iHeight;
	var iKw;
	var sKwZone;
	
	if (!host) {
		iHost = "www.barnesandnoble.com";
	} else {
		iHost = host;	
	}
	if (!url) {
		iURL = "newsletters/kmp_iframe_cds2.asp";
	} else {
		iURL = url;	
	}
	if (!qs) {
		iQS = "";
	} else {
		iQS = "&"+qs;	
	}
	if (!width) {
		iWidth = "192";
	} else {
		iWidth = width;	
	}
	if (!height) {
		iHeight = "183";
	} else {
		iHeight = height;	
	}
	
	if (!kw) {
		iKw = "";
	} else {
		iKw = "&kw="+kw;	
	}

	if (!kwZone) {
		sKwZone = "";
	} else {
		sKwZone = "&kwzone="+kwZone;	
	}	
	
	if (!pid) {
		alert("A PID is required to create the js iframe!");
		return(true);
	} else if (!IsNumeric(pid)) {
		alert("The PID must be numeric to create the js iframe!");
		return(true);	
	} else {
		document.write("<iframe src=\"http://" + iHost + "/" + iURL + "?pid=" + pid + iQS + iKw + sKwZone + "\" width=\"" + iWidth + "\" height=\"" + iHeight + "\" frameborder=\"0\" marginheight=\"0\" marginwidth=\"0\" scrolling=\"no\"\/><\/iframe>");
		return(true);
	}			
}

function IsNumeric(sText) {
	var ValidChars = "0123456789";
	var IsNumber=true;
	var Char;
	for (i = 0; i < sText.length && IsNumber == true; i++) { 
		Char = sText.charAt(i); 
		if (ValidChars.indexOf(Char) == -1) {
			IsNumber = false;
		}
	}
	return IsNumber;
}

jQuery(function() {

	var safeFn = function(fn) {
		var extra = (fn.name)? " - from: " + fn.name : "";		
		return function() {
			try {
				return fn.apply(window, arguments);
			}
			catch(e) {
				// alert("Fatal Error: " + e.message); // only for debugging
				if (console && typeof console !== "undefined" && typeof console.log === "function") {
					console.log("Error: " + e.message + extra);
				}
				throw e;
			}
		};
	};
	
	var WebServiceLogger = function(logDomain, typeVal) {
		var logServiceUrl = "http://" + logDomain + "/include/inc_tracker.asp?type=" + typeVal + "&";

		this.logInvalidUrl = function(sourceUrl, invalidUrl, textUrl) {
			var now = new Date().getTime(); // to refresh the URL (avoid caching from the browser)
			var logStr = "URL=" + encodeURIComponent(invalidUrl) + 
						"&TXT=" + encodeURIComponent(textUrl) +
						"&TS=" + now;
			var imgObj = new Image();
			// alert("Logging.... " + logServiceUrl + logStr);			
			imgObj.src = logServiceUrl + logStr;
		};
	};
	
	var B2BMaskCommand = (function(doc) {
		var webLogger = new WebServiceLogger("www.barnesandnoble.com", "1");

		return	{
			'name'			: "B2B Mask",
			'description'	: "Restrict links from leaving the B2B site (i.e. non-B2b pages)",
			'isApplicable'	: safeFn(function isApplicable() {
				var is = /btob[^\/]+barnesandnoble\.com/.test(document.location);
				return is;
			}),
			'match' : safeFn(function match(link) {
				var href = link.attr('href');
				href = (href)? href : ''; // normalize

				var btobp = href.match(/[^\/]+\/\/btob[^\/]+barnesandnoble\.com/);
				var emptyp = href === '';				
				var jsp = href.match(/^javascript:/);
				var dhtmlp = emptyp || jsp;
				var vendorp = ! dhtmlp && (null === href.match(/[^\/]+\/\/[^\/]*barnesandnoble\.com/));
				
				var edelivery = href.match(/[^\/]+\/\/edelivery[^\/]+barnesandnoble\.com/); 
				var publicdocs = href.match(/images.barnesandnoble.com/); // allow access to resources such as *.doc, *.pdf from imagehost.

				var invalidLink = (!(btobp || dhtmlp || vendorp || edelivery) && !publicdocs);
				return invalidLink;
			}),
			'onblock' : safeFn(function onblock(link) {	// Q: 'action' or 'onblock'???
				var href = link.attr('href');
				
				// Log error
				var invalidLink = href;
				var invalidLinkText = link.text();
				webLogger.logInvalidUrl(document.location, invalidLink, invalidLinkText);
				
				// Overlay notification
				var notify = new $.Overlay({block: 0, useHeading: 1, heading: 'Not Available'});
				var seeInside = href.match(/BookViewer/);
				var msg = seeInside? "This feature is not available through this microsite. " : "This product is not available for purchase through this microsite. ";
				notify.set.content("<p style='padding:0.5em'>" + msg + "Please close this window to continue shopping.</p>");
				notify.set.width("300px");
				notify.open();
				$('.overlayClose').click(function(){notify.close();notify.remove();});
			})
		};
	})();
	
	var WLCommunityCommand = (function() {
		var domain = "www.barnesandnoble.com";
		var type = "1";
		try {
			// domain = "; // !?
			// type = "2"; // !?
		}
		catch (e2) {}
		var webLogger = new WebServiceLogger(domain, type);
		
		return {
			'name'			: "WL External Window Opener",
			'description'	: "For outside links, open them in a new window",
			'isApplicable'	: safeFn(function isApplicable() {
				var is = /([^\/]*(que|hp)[^\/]*)\.(bn|barnesandnoble)\.com/.test(location);
				return is;
			}),
			'match' : safeFn(function match(link) {
				var href = link.attr('href');
				href = (href)? href : ''; // normalize

				// We could make it faster but less clear to maintain
				var bnstudioHome	= /http:\/\/.+barnesandnoble.com\/bn-studio\/$/.test(href);
				var bnreviewHome	= /http:\/\/.+barnesandnoble.com\/bn-review\/$/.test(href);
				var bnreview		= /http:\/\/bnreview\.(bn|barnesandnoble)\.com/.test(href);
				var media			= /http:\/\/media\.(bn|barnesandnoble)\.com/.test(href);
				var bookclubs		= /http:\/\/bookclubs\.(bn|barnesandnoble)\.com/.test(href);
				var plasticlogic 	= /http:\/\/.+plasticlogic.com/.test(href);
				var bnwww			= /http:\/\/www\.(bn|barnesandnoble)\.com/.test(href);
				var hpvideogames	= /http:\/\/hpvideogames/i.test(href);

				// Normalize the links				
				if (bnreviewHome) {
					link.attr('href', "http://bnreview.barnesandnoble.com");
				}
				if (bnstudioHome) {
					link.attr('href', "http://www.barnesandnoble.com/bn-studio/");
				}
				
				var isExternal = bnstudioHome || bnreviewHome || bnreview || media || bookclubs || plasticlogic || bnwww || hpvideogames;
				return isExternal;				
			}),			
			'onblock' : safeFn(function onblock(link) {
				var href = link.attr('href');
				var hpVideoGamesRegExp = /^http:\/\/hpvideogames/i;
				
				// Log error
				var invalidLink = href;
				var invalidLinkText = link.text();
				webLogger.logInvalidUrl(document.location, invalidLink, invalidLinkText);
				
				if (hpVideoGamesRegExp.test(href)) {
					href =  href.replace(hpVideoGamesRegExp, 'http://videogames');
					// Overlay notification
					var notify = new $.Overlay({block: 0, useHeading: 1, heading: 'Not Available'});
					notify.set.content("<div class=\"item-unavailable-message\"><p>This product is not currently available from this site, please shop with our partner for this product: </p><p class=\"item\"><a target=\"_blank\" href=\"" + href + "\">Click here to shop at partner site</a>.</p><p>Please close this window to continue</p></div>");
					notify.set.width("300px");
					notify.open();
					$('.overlayClose').click(function(){notify.close();notify.remove();return false;});
				} else {
					window.open(href);
				}
				
			})
		};
	})();
	
	var linkBlockers = [B2BMaskCommand, WLCommunityCommand];
	
	for (var i = 0; i < linkBlockers.length; i++) {	
		(function(idx) {
			var linkBlocker = linkBlockers[idx];
			
			if (linkBlocker.isApplicable()) {
				$('a').each(function() {
					var link = $(this);
					// var href = link.attr('href');
					// console.log("###### " + href);
					
					if (linkBlocker.match(link)) {
						if (typeof console == 'object' && console.firebug) {
							console.log('Found relevant link: %o', this);
						}
						link.attr({onclick: ''});
						link.click(function() {
							linkBlocker.onblock(link);
							return false;
						});
					}
				});
			}	
		})(i);
	}	
	return false;	
});

// ---------------------------------------------------------------------------------

var BN_Analytics = (function() {
	var optimostEnabled = false;
	var googleAnalyticsEnabled = true;
	
	var pageName = "generic";
	
	return {
		'getPageName'				: function() { return pageName; },
		'isGoogleAnalyticsEnabled'	: function() { return googleAnalyticsEnabled; },
		'isOptimostEnabled'			: function() { return optimostEnabled && window.BN.Environment.Store.isBN(); },
		'setGoogleAnalyticsEnabled'	: function(e) { googleAnalyticsEnabled = e; },
		'setOptimostEnabled'		: function(e) { optimostEnabled = e; },
		'setPageName'				: function(n) { pageName = n; }
	};
})();


var BN_Analytics_GA = (function() {
	var isEnabled = function() {
		return BN_Analytics.isGoogleAnalyticsEnabled();
	};
	
	// page view
	// transaction piece...
	
	var init = function() {
		if (isEnabled()) {
			jQuery(function() {
				jQuery("a.ga_track").click(function() {
					pageTracker._link(this.href);
					return false;
				});
			});
		}
	};
	
	return {
		init : init		
	};
})();


var BN_Analytics_Optimost = {
	optimostSelectorCalled : false,
	isEnabled : function() {
		// Enable If Optimost is enabled and the page name is defined
		var enabled = BN_Analytics.isOptimostEnabled() && (BN_Analytics.getPageName() != "");
		return enabled;
	},
	
	/*
	 *	Optimost Page Code (Global Code/small library, inserted at every page)
	 */
	optimostPageCode : function() {
	
		if (BN_Analytics.isOptimostEnabled()) { // regardless of the page name (since it's usually not defined before this call unfortunately)
		
			optimost={A:{},C:{},D:document,L:document.location,M:[],Q:{},T:new Date(),U:'',V:'2.7',Enabled:true,ST:"script",SA:
			{"type":"text/javascript"},I:function(){var s=this.L.search;var c=this.D.cookie;if(s.length>3){for(var a=s.substring(1)
			.split("&"),i=0,l=a.length;i<l;i++){var p=a[i].indexOf("=");if(p>0)this.Q[a[i].substring(0,p)]=unescape(a[i].substring(
			p+1));}}if(c.length>3){for(var a=c.split(";"),i=0,b=a.length;i<b;i++){var v=a[i].split("=");while(v[0].substring(0,
			1)==" ")v[0]=v[0].substring(1,v[0].length);if(v.length==2)this.C[v[0]]=unescape(v[1]);}}},B:function(){var n;this.A={
			};var _o=this;this.A.D_ts=Math.round(_o.T.getTime()/1000);this.A.D_tzo=_o.T.getTimezoneOffset();this.A.D_loc=_o.L.protocol+
			"//"+_o.L.hostname+_o.L.pathname;this.A.D_ckl=_o.D.cookie.length;this.A.D_ref=_o.D.referrer;if(typeof optrial=="object")
			for(n in optrial)this.A[n]=optrial[n];for(n in this.Q)this.A[n]=this.Q[n];for(n in this.C)if(n.substring(0,2)=="op")this.A[n]=
			this.C[n];},S:function(){var q='';for(var n in this.A)if(this.A[n]!=null && this.A[n]!="")q+=(q.length>0?"&":(this.U.indexOf(
			"?")>0?"&":"?"))+n+"="+escape(this.A[n]);return this.U+q;},SC:function(n,v,e,d){var de=new Date();de.setTime(
			de.getTime()+e * 1000);this.D.cookie=n+"="+escape(v)+((e==null)?"":("; expires="+de.toGMTString()))+"; path=/"+((d==
			null)?"":(";domain="+d));},SLD:function(){var sld=this.D.domain;var dp=sld.split(".");var l=dp.length;if(l<2)sld=null;
			else if(!isNaN(dp[l-1])&&!isNaN(dp[l-2]))sld=null;else sld="."+dp[l-2]+"."+dp[l-1];return sld;},R:function(r,c,d,
			e){if(this.Enabled){var b=true;if(r<1000){b=(Math.floor(Math.random()*1000)<r);if(c!=null){if(this.C[c]!=null)b=(this.C[c]!=
			"mvt-no");else this.SC(c,b?"mvt-yes":"mvt-no",e,d);}}if(b){var t='<'+this.ST+' src="'+this.S()+'"';for(n in this.SA)
			t+=(" "+n+'="'+this.SA[n]+'"');t+='><\/'+this.ST+'>';this.D.write(t);}}},addModule:function(s,f){this.M[s]=f;
			},displayModule:function(s){if(typeof this.M[s]=="function")this.M[s]();},hasModules:function(){return count(this.M)>0;
			}};optimost.I();
		}
	},	
	/*
	 *	Optimost Selector Code (within the head if possible, or as close to the top of the <body> and way before the test HTML area)
	 */
	optimostSelector : function optimostSelector() {
		if (BN_Analytics_Optimost.isEnabled()) {
			if (!this.optimostSelectorCalled) {
				//alert("optimostSelector: " + BN_Analytics.getPageName() );
				var optPath = "http://es.optimost.com/";
				if(window.location && window.location.protocol && window.location.protocol.toLowerCase().indexOf("https") > -1)optPath = "https://by.essl.optimost.com/";
				document.write('<script type="text/javascript" src="' + optPath + 'es/591/c/3/u/Optimost_Selector.js' +'"><\/script>');
			}
			this.optimostSelectorCalled = true;
		}
	},

	/*
	 *	Generic Optimost Selector Code: (to enable Optimost testing on the nav bar itself throughout the site)
	 *		This Optimost Selector is for generic pages (pages that didn't get a chance to have a page name)
	 *		(i.e. The rest of the BN pages: such as community, locker, etc...)
	 */
	genericOptimostSelector : function() {
		if (BN_Analytics.getPageName() === 'generic') {
			BN_Analytics_Optimost.optimostSelector();
		}
	},
	
	/*
	 *	Optimost Module Code (bottom of every page, though above Google Analytics)
	 */
	optimostModule : function() {
		if (BN_Analytics_Optimost.isEnabled())
		{
			//alert("optimostModule: " + BN_Analytics.getPageName() );
			if (typeof(optimost) == "object" && typeof(opModulesArray) != "undefined")
			{
				for(var i=0;i<opModulesArray.length;i++)
				{
					optimost.displayModule(opModulesArray[i]);
				}
			}			
		}
	}
};

var optimost = {}; // Global variable used by Optimost

BN_Analytics_Optimost.optimostPageCode();

BN_Analytics_GA.init();

