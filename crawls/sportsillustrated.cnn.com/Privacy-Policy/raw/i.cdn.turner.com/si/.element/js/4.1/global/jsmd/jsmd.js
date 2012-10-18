var _w=window;// Shorthand notation for window reference
var _jsmd_default={
	version: "si.192.904.20121005",
	release: "0",
	dictionary: {
		init: {
			/* ADBP Standards */

			"business.name":					"si",									//pageName
			"business.lob":						"sports",								//hier1
			"business.brand":					"sports illustrated",					//hier1
			"business.friendly_name":			"si",									//prop30,eVar30,hier1
			"page.clean_url":					"raw:gADBPURL|",						//prop26
			"page.domain":						"raw:gADBPURL|domain",					//server,eVar29
			"page.url_section[0]":				"raw:gADBPURL|path,1",					//prop41,eVar44 - first directory
			"page.url_section[1]":				"raw:gADBPURL|path,2",					//prop42,eVar45 - second directory
			"page.transaction_id":				(_w.cnnad_transactionID?_w.cnnad_transactionID+"":""),	//prop46,eVar46 - Transaction ID
			"page.section[0]":					"gJObj|cnn_metadata,section[0]",		//channel,eVar27
			"page.section[1]":					"gJObj|cnn_metadata,section[1]",		//prop28,eVar28
			"page.template_type":				"gJObj|cnn_metadata,template_type",		//prop32,eVar32
			"page.content_type":				"gJObj|cnn_metadata,content_type",		//prop33,eVar33
			"page.name":						"raw:gADBPPageName|",					//pageName,eVar26
			"promo.internal.id":				"gQuery|iid",							//eVar43
			"promo.internal.implied":			"",										//eVar48
			"promo.external.id":				"gQuery|xid,sr",						//campaign
			"search.internal.keyword":			"",										//prop39,eVar39
			"search.internal.number_results":	"",										//prop27
			"page.type":						"errorPage",							//prop29,eVar41
			"video.players":					[],										//video player array object
			nielsen: {
				"video-census": {
					clientid: "us-100120",
					vcid: "c03",
					prod: "vc",
					sfcode: "us"
				}
			}

			,
			/* ADBP Recommended Standards */

			"ignore":							""										// This can be removed once other recommended standards are defined.  Simply copy & replace

			,
			/* Business-Specific Standards */

			"business.si.column":					"gJObj|cnn_metadata,column",		//prop,eVar1,8,9
			"business.si.ex_ref":					"gSIRefDom|",						//prop2
			"business.si.flash_ver":				"gSIFlashVer|",						//prop3
			"business.si.survey":					"",									//prop4,eVar4
			"business.si.vid_franchise":			"",									//prop5,eVar5
			"business.si.player_loc":				"gSIVidPlayerLoc|",					//prop6,eVar6
			"business.si.audio":					"gJObj|cnn_metadata,audio",			//prop7,eVar7
			"business.si.hplink":					"gQuery|sct",						//prop10,eVar10
			"business.si.vid_category":				"",									//prop11,eVar11
			"business.si.social_type":				"",									//prop24,eVar24
			"business.si.gallery_info":				""									//prop25,eVar25

			,
			/* Pre-Metadata Collection Routines */
			preinit: function() {


			},
			/* Post-Metadata Translation Routines */
			postinit: function() {

				/* reformat template type and content type to match ADBP standard */
				var tt=this.get("m:page.template_type"),ct=this.get("m:page.content_type");
				if (tt!=null) {
					tt=tt.replace(/adbp./,"");
					if (tt.match("other:") || tt.match("adbp:")) {
						this.set("m:page.template_type",tt);
					} else {
						this.set("m:page.template_type","adbp:" + tt);
					};
				}
				if (ct!=null) {
					ct=ct.replace(/adbp./,"");
					this.set("m:page.content_type","adbp:"+ct);
					this.plugin.gADBPContentType(ct);
				}

				/* set default value for prop41,eVar44 */
				if (this.get("page.url_section[0]") == "") {
					this.set("page.url_section[0]","home");
				}

				/* set default value for prop28/eVar28 */
				if (this.get("m:page.section[1]") == "") {
					this.set("page.section[1]","other");
				}

				/* Name spacing for SI and Vault section/subsection */
				var ch = (this.get("m:page.section[0]") ? this.get("m:page.section[0]") : "");
				var sch = (this.get("m:page.section[1]") ? this.get("m:page.section[1]") : "");
				var siHost = window.location.host;
				if (((siHost.indexOf("sportsillustrated") > -1) || (siHost.indexOf("sipreview") > -1)) && !(window.location.pathname.indexOf("/vault/") > -1)) {
					if (ch != null && ch != "") {
						this.set("page.section[0]","si:" + ch);
					}
					if (sch != null && sch != "") {
						this.set("page.section[1]","si:" + ch + ":" + sch);
					}
				} else if ((siHost.indexOf("vaultp1refcomp1") > -1) || (window.location.pathname.indexOf("/vault/") > -1)) {
					if (ch != null && ch != "") {
						this.set("page.section[0]","vault:" + ch);
					}
					if (sch != null && sch != "") {
						this.set("page.section[1]","vault:" + ch + ":" + sch);
					}
				}

				/* Vault Search */
				if ((window.location.pathname.indexOf("vault") > -1) && (window.location.href.indexOf("searchType") > -1)) {
					this.set("m:search.internal.keyword",_jsmd.plugin.gJObj("cnn_metadata","search.term"));
					if (_jsmd.plugin.gJObj("cnn_metadata","search.results") <= 0) {
						this.set("m:search.internal.number_results","zero");
					} else {
						this.set("m:search.internal.number_results",_jsmd.plugin.gJObj("cnn_metadata","search.results"));	//prop27
					}
					this.push("page.events","search.internal.page");	//event27
				}

				/* remove dot from column name */
				var cn = (this.get("business.si.column.name") ? this.get("business.si.column.name") : "");
				if (window.location.pathname.indexOf("/writers/") > -1) {
					this.set("business.si.column.name",cn.replace("."," "));	//prop8,eVar8
				}

				/* facebook fantasy games */
				if (window.location.pathname.indexOf("fb/fantasy/nflcommish2011") > -1) {
					this.set("business.si.game.name","commissioner");						//prop12,eVar12
					this.set("business.si.game.league",_jsmd.plugin.gQuery("leagueid"));	//prop13,eVar13
					this.set("business.si.game.team",_jsmd.plugin.gQuery("teamid"));		//prop14,eVar14

					var curPageName = this.get("m:page.name");
					var curPage = _jsmd.plugin.gQuery("page");
					var initPage = _jsmd.plugin.gQuery("ntr");
					if (initPage) {
						this.set("m:page.name",curPageName + "/?page=" + initPage);		//pageName,eVar26
						this.push("page.events","app.init");	//event15
					} else if (curPage) {
						this.set("m:page.name",curPageName + "/?page=" + curPage);		//pageName,eVar26
					}
				}

				/* football challenge */
				if ((window.location.hostname.indexOf("sifantasy.secondthought.com") > -1) || (window.location.hostname.indexOf("st-sifantasy.staging.catalyticgroup.com") > -1)) {
					this.set("business.si.game.name",_jsmd.plugin.gADBPURL("path",1));	//prop12,eVar12
				}

				/* video pagename hash tag fix */
				if (window.location.href.indexOf("video/#") > -1) {
					var index = window.location.href.indexOf("video/#") + 7;
					this.set("m:page.name","SI:v:sportsillustrated:video/[" + window.location.href.substr(index) + "]");	//pageName,eVar26
				}

			}
		}
	},
	map: {

		"si_main": {
			vendors: [
				{
					name:							"Adobe SiteCatalyst H-code",
					account:						"si",
					settings:						["si"],
					variablemap:					["si","adbp"],
					eventmap:						["si","adbp"],
					dynamic_actions: {
						"video": {
							variablemap:			["si","adbp-video"],
							eventmap:				["si","adbp-video"]
						}
					},
					prevendor: function() { },
					postvendor: function() { }
				},
				{
					name:							"Nielsen Hybrid Light Code",
					account:						"standard_nielsen",
					dynamic_actions: {
						"video":					{ ignore: true },
						"gallery-click":			{ ignore: true },
						"social-click":				{ ignore: true },
						"livefyre-click":			{ ignore: true }
					}

				}
			],
			/** Variable: VendorSettingsObject
			*/
			standard_nielsen: {
				account: function() {
					return ("us-204044h");
				}
			},
			si: {
				account: function() {
					var accountName;
					var host = _w.location.hostname;
					/* football challenge */
					if (host.indexOf("sifantasy.secondthought.com") > -1) {
						brand = "aolturnersibrand";
						accountName = "sidsioffsite";
					}
					if ((host.indexOf("sipreview") > -1) || (host.indexOf("vaultp1refcomp1") > -1) || (host.indexOf("webp1refcache1") > -1)) {
							if (_w.location.pathname.indexOf("vault") > -1) {
								accountName = "sidsivaultdev";
							} else {
								accountName = "sidsidev";
							}
					} else {
						if (_w.location.pathname.indexOf("vault") > -1) {
							accountName = "sidsivault";
						} else if (_w.location.pathname.indexOf("ffgame") > -1) {
							accountName = "sidsioffsite";
						} else {
							accountName = "sidsi";
						}
					}
					return accountName;
				},
				settings: {
					"trackDownloadLinks":				true,
					"trackExternalLinks":				true,
					"trackInlineStats":					true,
					"linkDownloadFileTypes":			"exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,xls",
					"linkInternalFilters":				"javascript:,sportsillustrated,.si.com,turner.com,twackle.com,apps.facebook.com,sifantasy.secondthought.com,st-sifantasy.staging.catalyticgroup.com,sportstechinc.com,amazonaws.com",
					"linkLeaveQueryString":				false,
					"trackingServer":					"metrics.cnn.com",
					"trackingServerSecure":				"smetrics.cnn.com",
					"visitorNamespace":					"turnersports",
					"charSet":							"ISO8859-1",
					"currencyCode":						"USD"
				},
				filters: {
					"mlbtab-click":		{ include: ["game.name"] },
					"gallery-click":	{ include: ["business.si.gallery_info","page.template_type","page.content_type"] },
					"social-click":		{ include: ["business.si.social_type"] }
				},
				variablemap: {
					"business.si.column.writer":		["prop1","eVar1"],
					"business.si.ex_ref":				["prop2"],
					"business.si.flash_ver":			["prop3"],
					"business.si.survey":				["prop4","eVar4"],
					"business.si.audio":				["prop7","eVar7"],
					"business.si.column.name":			["prop8","eVar8"],
					"business.si.column.title":			["prop9","eVar9"],
					"business.si.hplink":				["prop10","eVar10"],
					"business.si.vid_category":			["prop11","eVar11"],
					"business.si.game.name":			["prop12","eVar12"],
					"business.si.game.league":			["prop13","eVar13"],
					"business.si.game.team":			["prop14","eVar14"],
					"business.si.game.action":			["prop15","eVar15"],
					"business.si.social_type":			["prop24","eVar24"],
					"business.si.gallery_info":			["prop25","eVar25"],
					"m:page.type":						["pageType"]
				},
				eventmap: {
					"app.init":							["event15"],
					"social.interaction":				["event24"],
					"social.comment_submit":			["event25"]
				},
				premap: function() { },
				postmap: function() {
					/* clear cached linkTrackVars value */
					this.v.linkTrackVars = "";

					/* pageType - 404 Error Pages */
					if (!document.title.match("404")) {
						this.v.pageType = "";
					} else {
						this.v.pageType = "errorPage";
					}

					/* Enable and Disable necessary video variables */
					if (this.config.map.isDynamic != null && this.config.map.isDynamic.indexOf("preroll") > -1) {
						this.v.eVar5 = this.v.prop5; this.v.prop5 = "";
						this.v.eVar6 = this.v.prop6; this.v.prop6 = "";
						this.v.eVar7 = this.v.prop7; this.v.prop7 = "";
						this.v.eVar41 = this.v.prop29; this.v.prop29 = "";
						this.v.prop2 = this.v.prop3 = this.v.prop10 = this.v.prop26 = this.v.prop28 = this.v.prop29 = this.v.prop32 = this.v.prop33 = this.v.prop35 = this.v.prop40 = this.v.prop41 = this.v.prop42 = "";
						this.v.eVar10 = this.v.eVar26 = this.v.eVar27 = this.v.eVar28 = this.v.eVar32 = this.v.eVar33 = this.v.eVar40 = this.v.eVar44 = this.v.eVar45 = this.v.eVar46 = "";
					} else if (this.config.map.isDynamic != null && (this.config.map.isDynamic.indexOf("autostart") > -1 || this.config.map.isDynamic.indexOf("start") > -1)) {
						this.v.prop2 = this.v.prop3 = this.v.eVar26 = this.v.eVar28 = this.v.eVar40 = this.v.eVar44 = this.v.eVar45 = this.v.eVar46 = "";
					} else if (this.config.map.isDynamic != null && (this.config.map.isDynamic.indexOf("fifty_percent") > -1 || this.config.map.isDynamic.indexOf("complete") > -1)) {
						this.v.eVar5 = this.v.prop5; this.v.prop5 = "";
						this.v.eVar6 = this.v.prop6; this.v.prop6 = "";
						this.v.eVar7 = this.v.prop7; this.v.prop7 = "";
						this.v.eVar41 = this.v.prop29; this.v.prop29 = "";
						this.v.eVar33 = this.v.prop33; this.v.prop33 = "";
						this.v.prop2 = this.v.prop3 = "";
						this.v.eVar46 = "";
					}

					/* football challenge */
					if (this.config.map.isDynamic != null) {
						if ((window.location.hostname.indexOf("sifantasy.secondthought.com") > -1) || (window.location.hostname.indexOf("st-sifantasy.staging.catalyticgroup.com") > -1)) {
							this.v.hier1 = "";
						}
					}

					/* Vegas click tracking - Variable correction for module clicks */
					if (this.config.map.isDynamic != null && this.config.map.isDynamic.indexOf("gallery-click") > -1) {
						this.v.linkTrackVars = "prop25,prop32,prop33,eVar25,eVar32,eVar33";
					};
					if (this.config.map.isDynamic != null && this.config.map.isDynamic.indexOf("social-click") > -1) {
						this.v.linkTrackVars = "prop24,eVar24";
					};

					/* livefyre click tracking */
					if (this.config.map.isDynamic != null && this.config.map.isDynamic.indexOf("livefyre-click") > -1) {
						this.v.eVar26 = this.v.pageName;
						this.v.pageName = "";
						this.v.events = "event24,event25";
					};
				}
			},
			adbp: {
				filters: {
					"mlbtab-click":		{ include: ["nothing"] },
					"livefyre-click":	{ include: ["page.name","code.version"] }
				},
				settings: {
					"trackInlineStats":				true,
					"linkLeaveQueryString":			false
				},
				variablemap: {
					"m:page.name":					["pageName","eVar26"],
					"m:page.section[0]":			["channel","eVar27"],
					"m:page.domain":				["server","eVar29"],
					"m:page.clean_url":				["prop26"],
					"m:search.internal.number_results":	["prop27"],
					"m:page.section[1]":			["prop28","eVar28"],
					"m:video.title":				["prop29","eVar41"],
					"m:business.friendly_name":		["prop30","eVar30"],
					"m:page.template_type":			["prop32","eVar32"],
					"m:page.content_type":			["prop33","eVar33"],
					"m:user.authenticated":			["prop34","eVar34"],
					"m:code.version":				["prop35"],
					"m:user.segment":				["prop36","eVar36"],
					"m:search.internal.keyword":	["prop39","eVar39"],
					"m:page.url_section[0]":		["prop41","eVar44"],
					"m:page.url_section[1]":		["prop42","eVar45"],
					"m:video.id":					["eVar42"],
					"m:promo.internal.id":			["eVar43"],
					"m:page.transaction_id":		["prop46","eVar46"],
					"m:promo.internal.implied":		["eVar48"],				//Campaign Stacking (SEO Driven)
					"m:promo.external.id":			["campaign"],			//Marketing/External Campaigns
					"m:video.products":				["products"],
					"m:business.lob|m:business.brand|m:business.friendly_name|m:page.domain|m:page.section[0]|m:page.section[1]":	["hier1"],
					"delimiter":					"|"
				},
				eventmap: {
					"m:page.name":					["event26"],
					"page.view":					["event26"],
					"search.internal.page":			["event27"],
					"registration.complete":		["event28"],
					"promo.internal.id":			["event31"],
					"video.start":					["event32"],
					"video.complete":				["event33"],
					"video.autostart":				["event34"],
					"ad.start.preroll":				["event35"],
					"video.timespent":				["event36"],
					"user.login":					["event37"],
					"blog.read":					["event38"],
					"article.read":					["event39"],
					"video.preroll":				["event35"],
					"m:video.duration_watched":		["event36"]
				},
				premap: function() { },
				postmap: function() { }
			},
			"adbp-video": {
				filters: {
					"video-preroll":				{ include: ["business.si.vid_franchise","business.si.player_loc","business.si.audio","page.domain","video.title","video.id","business.friendly_name","video.preroll"] },
					"video-progress":				{ include: ["video.duration_watched"] },
					"video-complete":				{ include: ["business.si.vid_franchise","business.si.player_loc","business.si.audio","video.title","video.id","business.friendly_name","page.content_type","page.domain","page.section[0]","page.template_type","video.duration_watched","video.complete"] },
					"video-fifty_percent":			{ include: ["business.si.vid_franchise","business.si.player_loc","business.si.audio","video.title","video.id","business.friendly_name","page.content_type","page.domain","page.section[0]","page.template_type","video.duration_watched","video.fifty_percent"] }
				},
				variablemap: {
					"business.si.vid_franchise":	["prop5","eVar5"],
					"business.si.player_loc":		["prop6","eVar6"],
					"business.si.audio":			["prop7","eVar7"],
					"m:page.section[0]":			["eVar27"],
					"m:page.section[1]":			["eVar28"],
					"m:page.domain":				["eVar29"],
					"m:video.title":				["prop29","eVar41"],
					"m:video.id":					["eVar42"],
					"m:business.friendly_name":		["eVar30"],
					"m:page.template_type":			["eVar32"],
					"m:page.content_type":			["prop33","eVar33"],
					"m:code.version":				["prop35"],
					"m:promo.internal.id":			["eVar43"],
					"m:promo.internal.implied":		["eVar48"],			//Campaign Stacking (SEO Driven)
					"m:promo.external.id":			["campaign"],		//Marketing/External Campaigns
					"delimiter":					"|"
				},
				eventmap: {
					"video.fifty_percent":			["event1"],
					"video.start":					["event32"],
					"video.complete":				["event33"],
					"video.autostart":				["event34"],
					"video.preroll":				["event35"],
					"m:video.duration_watched":		["event36"]
				},
				premap: function() { },
				postmap: function() {
				}
			}
		}

	},
	plugins: {

		/* prop2 - Referral Domain */
		gSIRefDom:function() {
			if (window.location.href.indexOf("eref") > -1) {
				var ref = document.referrer;
				var exp = (ref.split(":").length > 2 ? /http:\/\/(\w+\.\w+\.\w+\:\d+)\// : /http:\/\/(\w+\.\w+\.\w+)\//);
				var result = exp.exec(ref);
			}
			return result[1] + " - " + _jsmd.plugin.gQuery("eref");
		},
		/* prop3 - flash version */
		gSIFlashVer:function() {
			var flashVerObj;
			var flashVer;
			if (swfobject != null) {
				flashVerObj = swfobject.getFlashPlayerVersion();
				flashVer = flashVerObj.major +"."+ flashVerObj.minor +"."+ flashVerObj.release;
			}
			return flashVer;
		},
		/* prop6, eVar6 - video player location*/
		gSIVidPlayerLoc:function() {
			var path = window.location.pathname.substring(1);
			var path_array = path.split("/");
			var yearPattern = /\d+/;
			var swimsuitYear;
			var swimRes;
			var vidPlayerLoc;
			if (path_array[0].match("swimsuit")) {
				swimsuitYear = yearPattern.exec(path_array[0]);
				swimRes = swimsuitYear+"_swimsuit";
			}
			switch(path_array[0]) {
				case "video":
					vidPlayerLoc = "video";
					break;
				case "behindthemic":
					vidPlayerLoc = "behind the mic";
					break;
				case swimRes:
				case "vault":
				case "swimsuit":
					vidPlayerLoc = "swimsuit";
					break;
				case "basketball":
					vidPlayerLoc = "seth davis";
					break;
				case "":
					vidPlayerLoc = "home";
					break;
				default:
					vidPlayerLoc = path_array[0];
					break;
			};
			return vidPlayerLoc;
		},
		/* Video player collection code */
		gSIVideoCollection:function() {
			return {
				/* add: function (i,t) {
					var vplayer = _jsmd.plugin.md.get("video.players");
					vplayer.push(new objVplayer(i,t));
					function objVplayer (videoId,videoTitle) {
						this.videoId = videoId;
						this.videoTitle = videoTitle;
						this.hasScrubbed = false;
						this.isAuto = false;
						this.isHalf = false;
						this.isBuffering = false;
						this.isPaused = false;
					}
				}, */
				get: function (i,p) {
					var vplayer = _jsmd.plugin.md.get("video.players");
					for(var j=vplayer.length-1; j>=0; j--) {
						if (vplayer[j].containerId == i) {
							return vplayer[j][p];
						}
					}
				},
				set: function (i,p,v) {
					var vplayer = _jsmd.plugin.md.get("video.players");
					for(var j=vplayer.length-1; j>=0; j--) {
						if (vplayer[j].containerId == i) {
							vplayer[j][p] = v;
							break;
						}
					}
				},
				toggle: function (i,p) {
					var vplayer = _jsmd.plugin.md.get("video.players");
					for(var j=vplayer.length-1; j>=0; j--) {
						if (vplayer[j].containerId == i) {
							var v = vplayer[j][p];
							vplayer[j][p] = !v;
							break;
						}
					}
				},
				start: function (i,t) {
					var vplayer = _jsmd.plugin.md.get("video.players");
					vplayer.push(new objVplayer(i,t));
					function objVplayer (cid,videoTitle) {
						this.containerId = cid;
						this.videoTitle = videoTitle;
						this.vidStarted = false;
						this.hasScrubbed = false;
						this.isAuto = false;
						this.isPaused = false;
						this.isBuffering = false;
						this.pastHalf = false;
						this.startTime = new Date().getTime();
						this.timeSpent = 0;		//used in pause action to calculate time spent
					}
				},
				/*
				-- pause and buffering senario --
				buffer un-buffer pause     un-pause
				pause  un-pause  buffer    un-buffer
				buffer pause     un-pause  un-buffer
				buffer pause     un-buffer un-pause
				pause  buffer    un-buffer un-pause
				pause  buffer    un-pause  un-buffer
				*/
				pause: function (i) {
					var vplayer = _jsmd.plugin.md.get("video.players");
					for(var j=vplayer.length-1; j>=0; j--) {
						if (vplayer[j].containerId == i) {
							var p = vplayer[j].isPaused;
							var b = vplayer[j].isBuffering;
							if (!b) {	//not buffering
								if (p) {	//pause -> unpause
									vplayer[j].startTime = new Date().getTime();
								} else {	//unpause -> pause
									var playedTime = new Date().getTime() - vplayer[j].startTime + vplayer[j].timeSpent;	//calculate time spent
									vplayer[j].timeSpent = playedTime;
								}
							}
							vplayer[j].isPaused = !p;
							break;
						}
					}
				},
				buffer: function (i) {
					var vplayer = _jsmd.plugin.md.get("video.players");
					for(var j=vplayer.length-1; j>=0; j--) {
						if (vplayer[j].containerId == i) {
							var p = vplayer[j].isPaused;
							var b = vplayer[j].isBuffering;
							if (!p) {	//not paused
								if (b) {	//buffer -> unbuffer
									vplayer[j].startTime = new Date().getTime();
								} else {	//unbuffer -> buffer
									var playedTime = new Date().getTime() - vplayer[j].startTime + vplayer[j].timeSpent;	//calculate time spent
									vplayer[j].timeSpent = playedTime;
								}
							}
							vplayer[j].isBuffering = !b;
							break;
						}
					}
				},
				progress: function (i) {
					var vplayer = _jsmd.plugin.md.get("video.players");
					for(var j=vplayer.length-1; j>=0; j--) {
						if (vplayer[j].containerId == i) {
							var playedTime = ( new Date().getTime() - vplayer[j].startTime ) / 1000;
							vplayer[j].startTime = new Date().getTime();
							return Math.round(playedTime);
						}
					}
				},
				complete: function (i) {
					var vplayer = _jsmd.plugin.md.get("video.players");
					for(var j=vplayer.length-1; j>=0; j--) {
						if (vplayer[j].containerId == i) {
							var playedTime = ( new Date().getTime() - vplayer[j].startTime + vplayer[j].timeSpent ) / 1000;
							return Math.round(playedTime);
						}
					}
				}
			}
		}

		,
/**
 *Description: The plugins object contains helper methods, these methods have been broken up in the core library into an ABDP specific methods file (�plugins_adbp.js�) and Global methods file (�plugins_global.js�) � All the methods in both files belong to the same plugins object and are compiled together in the build process.
 *
 */

		gADBPCampaignStacking:function(the_cookie,param_ref,expiration,max_storage) {
			var s=this.vendor.Adobe.plugins();
			var p1,p2,p3,p4,p5,p6,p7;
			p1 = this.get(param_ref);
			p2 = the_cookie;
			p3 = expiration||30;
			p4 = max_storage||5;
			p5 = "|";
			return (s.campstack.call(s,p1,p2,p3,p4,p5));
		},
		/*
		gADBPTimePart:function(val) {
			var s=this.vendor.Adobe.plugins();
			var currDate = new Date(); // date object
			var dp_year = currDate.getFullYear();	//4 digit year
			currDate.setFullYear(dp_year,2,1);		//set to March 1st of current year
			if (currDate.getDay() == 0) {
				currDate.setDate(currDate.getDate() + 7);
			} else {
				currDate.setDate(currDate.getDate() + (7 - currDate.getDay() + 7));
			}
			var dp_date = currDate.getDate();
			s.dstStart = "3/" + dp_date + "/" + dp_year;
			currDate.setFullYear(dp_year,10,1);		 //set to November 1st of current year
			if (currDate.getDay() > 0) {
				currDate.setDate(currDate.getDate() + (7 - currDate.getDay()));
			}
			dp_date = currDate.getDate();
			s.dstEnd = "11/" + dp_date + "/" + dp_year;
			s.currentYear = dp_year;
			var hourOfDayIn12 = s.getTimeParting("h","-5");
			var ampm = hourOfDayIn12.substring(hourOfDayIn12.length - 2,hourOfDayIn12.length);	//find AM/PM
			var hourOfDayIn24 = hourOfDayIn12.replace(ampm,"");	//remove AM/PM
			var hourOfDayIn12_array = hourOfDayIn24.split(":");
			var hourIn24 = parseInt(hourOfDayIn12_array[0],10) + 12;
			if (ampm == "PM") {
				if (hourIn24 == 24) hourIn24 = 12;
			} else {
				hourIn24 = hourIn24 - 12;
				if (hourIn24 == 12) hourIn24 = "00";
			}
			hourOfDayIn24 = hourIn24 + ":" + hourOfDayIn12_array[1];
			var c=hourOfDayIn24+"|"+s.getTimeParting("d","-5")+"|"+s.getTimeParting("w","-5");
			if (val && val == "h") {
				return hourOfDayIn24;
			} else {
				return (!val?c:s.getTimeParting(val,"-5"));
			}
		},
		*/
		gADBPTranslateTemplateType: function(templateTypeCode,lookupType) {
			var adbpprefix="adbp:",rval=["o","other"];
			var lookup={
					b:"blog",
					g:"game",
					it:"interactive",
					c:"content",
					"in":"index",
					err:"error",
					e:"ecom",
					s:"signup",
					v:"video",
					sf:"section front",
					o:"other"
				},
				lookupRev={
					"blog":"b",
					"game":"g",
					"interactive":"it",
					"content":"c",
					"index":"in",
					"error":"err",
					"ecom":"e",
					"signup":"s",
					"video":"v",
					"section front":"sf",
					"other":"o"
				};
			if(lookup[templateTypeCode]!=null) {rval=[templateTypeCode,lookup[templateTypeCode]];}
			if(lookupRev[templateTypeCode]!=null){rval=[lookupRev[templateTypeCode],templateTypeCode];}
			rval[1]=adbpprefix+rval[1];
			if(lookupType=="short") {rval=rval[0];}
			if(lookupType=="long") {rval=rval[1];}
			return rval;
		},
		gADBPTemplateType: function(defaultString,patterns,matchStrings,bsRules,bsMatchStringIndex) {
			var apre="adbp:",bpre="other:",i=bsMatchStringIndex,rval,adbptype="o";i=(!i?0:i);
			var mpt=matchStrings[i],md=patterns,bs=bsRules,t,t2,check;
			mpt=(!mpt?"":mpt.toLowerCase());t2=(!bs?null:bs[mpt]);
			if(t2!=null) {
				adbptype=t2[0];
				rval=(adbptype==="o"&&t2.length<2?mpt:t2[1]);
			} else {
				if(md!=null) {
					for(m in md) {
						t=chkMatch(matchStrings[md[m][0]],md[m],m);
						if(t) {adbptype=t; break;}
					}
				}
			}
			function chkMatch(checkStr,reArray,val) {
				var i,rval=false,re;
				for(i=reArray.length-1;i>0;i--) {
					re=reArray[i];
					rval=rval||(re.exec(checkStr)!=null?true:false);
				}
				return (!rval?null:val);
			}
			t2=adbptype.split(":");
			if(t2.length==2) { rval=t2[1]; adbptype=t2[0];}
			var x=this.gADBPTranslateTemplateType(adbptype,"long");
			return {full:(adbptype==="o"&&t2[1]?bpre+rval:x),small:adbptype};
		},
		gADBPURL:function(type,lvl){
			var hostname = _w.location.hostname.toLowerCase();
			var pathname = _w.location.pathname.toLowerCase();
			pathname=pathname.replace(/([^\/]+\.[^\/]+$)/,"");
			/* pathname = pathname.replace("index.html","");
			pathname = pathname.replace("index.htm",""); */
			var rval;
			switch(type) {
				case "domain":
					hostname = hostname.replace("www.","");
					if (lvl == parseFloat(lvl)) {
						var domain_array = hostname.split(".");
						var currentPointer = domain_array.length - lvl;
						var currentDomainLevel = (currentPointer >= 0 ? domain_array[currentPointer] : "");
						rval=currentDomainLevel;
					} else {
						rval=hostname;
					}
					break;
				case "path":
					var pathname2 = pathname.substring(1);
					var path_array = pathname2.split("/");
					if (lvl == parseFloat(lvl) && lvl >= 1) {
						var currentPathname = (path_array.length >= lvl ? path_array[lvl-1] : "");
						rval=currentPathname;
					} else {
						rval=pathname;
					}
					break;
				default:
					rval=hostname + pathname;
			}
			return rval;
		},

		gADBPContentType:function(defaultVal){
			var tt=this.md.get("page.template_type"),
			ct=this.md.get("page.content_type"),
			l={
				"adbp:blog":	["blog.read","adbp:blog read"],
				"adbp:content":	["article.read","adbp:article read"],
				"adbp:game":	["game.play","adbp:game played"]
			}[tt],
			m={
				"adbp:article read": "article.read"
			}[ct];
			if(m!=null) {
				this.md.push("page.events",m);return ct;
			}
			if(!l) { return defaultVal;}
			this.md.push("page.events",l[0]);return l[1];
		},
		/**
		 *@function gADBPPageName
		 *Description: Gets and returns the ADBP standard page name.
		 * @requires page.template_type to be set before gADBPPageName function is call.
		 * @param {String} pathname: url string path.
		 * @param {String} delimiter: sets the delimiter in the page name string. If not set delimiter = :
		 * @return {String}
		 * @see #gADBPURL
		 */
		gADBPPageName: function(pathname,delimiter) {
			var s_pageName = "";
			if (!delimiter) delimiter = ":";
			var ttbefore = this.md.get("page.template_type");
			if (ttbefore) { //default to "other" if template type is not defined
				ttbefore = ttbefore.replace(/adbp./,"");
				var templateTypeSmall = _jsmd.plugin.gADBPTranslateTemplateType(ttbefore,"short");
			} else {
				var templateTypeSmall = "o";
			}
			var buc_p32 = this.md.get("business.name") + delimiter + templateTypeSmall;
			var thirdLevelDomain = _jsmd.plugin.gADBPURL("domain",3);
			var fullDomain = _jsmd.plugin.gADBPURL("domain");
			var lastTwoDomain = /(\.\w+\.\w+)$/.exec(fullDomain);
			if (lastTwoDomain) thirdLevelDomain = fullDomain.replace(lastTwoDomain[0],"");
			if (!pathname) {
				var p = _w.location.pathname.toLowerCase();
				var a = p.split('/');
				var l = a.length;
				var r = /^index./;
				pathname = (r.test(a[(l-1)])) ? p.replace(/([^\/]+\.[^\/]+$)/,"") : p;
				r = /([^\/]+\.[^\/]+$)/;
				if (!r.test(pathname)){
					l = pathname.length;
					if(pathname.charAt(l-1) !== "/"){pathname = pathname+"/";}
				}
			}
			var pageNameLen,r_len;
			if (thirdLevelDomain == "") {
				pageNameLen = buc_p32.length + 1 + pathname.length;
				if (pageNameLen <= 100) {
					s_pageName = buc_p32 + delimiter + pathname;
				} else {
					r_len = pageNameLen - 100;
					s_pageName = buc_p32 + delimiter + pathname.substring(r_len);
				}
			} else {
				pageNameLen = buc_p32.length + 1 + thirdLevelDomain.length + 1 + pathname.length;
				if (pageNameLen <= 100) {
					s_pageName = buc_p32 + delimiter + thirdLevelDomain + delimiter + pathname;
				} else {
					if (thirdLevelDomain.length <= 5) {
						r_len = pageNameLen - 100;
						s_pageName = buc_p32 + delimiter + thirdLevelDomain + delimiter + pathname.substring(r_len);
					} else {
						thirdLevelDomain = thirdLevelDomain.substring(0,5);
						pageNameLen = buc_p32.length + 1 + thirdLevelDomain.length + 1 + pathname.length;
						if (pageNameLen <= 100) {
							s_pageName = buc_p32 + delimiter + thirdLevelDomain + delimiter + pathname;
						} else {
							r_len = pageNameLen - 100;
							s_pageName = buc_p32 + delimiter + thirdLevelDomain + delimiter + pathname.substring(r_len);
						}
					}
				}
			}
			return s_pageName;
		},
		gADBPRepeatVisitorByPeriod:function(period,domain) {
			var e=new Date(),now=new Date(),cp="rvis"+period,t=parseInt(this.cookie.get(cp),10),vnum=(t!=NaN&&t>0?t+1:1),
			sesonly=this.cookie.get("s"+cp);
			e.setHours(0);e.setMinutes(0);
			if(period==="w") {e.setDate(now.getDate()+7-now.getDay());}
			else if(period==="y") {e.setYear(now.getYear()+1); e.setMonth(0); e.setDate(1);}
			else { // Assume month
				e.setMonth(now.getMonth()+1);e.setDate(1);
			}
			if(sesonly.length==0) {
				this.cookie.set(cp,vnum,e,null,domain);
				sesonly=(vnum>1?"repeat":"new")+":"+vnum;
				this.cookie.set("s"+cp,sesonly,null,null,domain);
			}
			return sesonly;
		},
		gADBPReferralType:function(secDefURLs,refTypeMatchPat,urlTypeMatchPat,href){
			var match_pattern = /http:\/\/([^\/]+)/;
			var matches = match_pattern.exec(refTypeMatchPat);
			var matches2 = match_pattern.exec(urlTypeMatchPat);

			href=href||window.location.href;
			if(href.indexOf("m:")==0 || href.indexOf("mb:")==0) {href=this.md.get(href);}

			var section_definition;

			for (var i = 0; i < secDefURLs.length; i++) {
				var reg_result = secDefURLs[i][1].exec(refTypeMatchPat);

				if(reg_result!=null){
					section_definition = secDefURLs[i][0];
					break;
				}
			}
			if (!(matches && matches2 && matches[1] === matches2[1])) {
				return [section_definition,(matches != null?matches[1]:""),href];
			}
			return "";
		},
		gADBPVideoTimeSpent:function(event) {	//calculate video time spent in sec
			if (event && event == "start") {
				_w.video_start_time = new Date().getTime();	//sets video start times
				_w.video_progress = new Date().getTime();	//sets video progress start times
			} else if (event && event == "progress") {
				if (_w.video_progress > 0) {
					var timeSpent = ( new Date().getTime() - _w.video_progress ) / 1000;
					_w.video_progress = new Date().getTime();		//set new start time
					return Math.round(timeSpent);
				}
			} else if (event && event == "pause") {
				if (_w.video_start_time > 0) {
					if (_w.video_pause[0] == 0) {  //paused
						var playedTime = new Date().getTime() - _w.video_start_time + _w.video_pause[1];
						_w.video_pause = [1,playedTime];
					} else {  //restarted
						_w.video_pause[0] = 0;
						_w.video_start_time = new Date().getTime();
					}
				}
			} else if (event && event == "complete") {
				if (_w.video_start_time > 0) {
					var timeSpent = ( new Date().getTime() - _w.video_start_time + _w.video_pause[1] ) / 1000;
					_w.video_start_time = 0;	//reset value
					_w.video_pause = [0,0];		//reset value
					_w.video_progress = 0;		//reset value
					return Math.round(timeSpent);
				}
			} else {
				return false;
			}
		},

	/**
	 *@function gADBPVisitorSegments
	 *Description: shows whether or not visitors are a new or repeat visitor for the lifetime of the experience, gives user lifetime visits number, current calender month visits number and past 30 days visits.
	 	Has 4 different return values:
		 - if param "30day" is passed into the function:
		1. 30Day : [<new | repeat>, <visit number>]
		-return example 30Day: new, 1
		Note: this is a rolling 30 day count, showing the users visits for the past 30 days - not 30 days from last visit.

		 - if param "month" is passed into the function:
		2. calendar_month : [<new | repeat>, <visit number>]
		- return example calendar_month: new, 1

		 - if param "liftime" is passed into the function:
		3. lifetime: [<new | repeat>, <visit number>]
		-return example lifetime: new, 1

		 - if no param is passed into the function
		4. All : { $30Day:  [<new | repeat>, <visit number>],  calendar_month : [<new | repeat>, <visit number>],  lifetime : [<new | repeat>, <visit number>] }
		- return example: new,1|new,1|new,1
		- note here how you can also use the return of arrays so that $30Day[0] = new, calendar_month[1] = 1
	 * @return {String}
	 * @see #cookie
	 * @see Function.prototype.bind
	 */
	gADBPVisitorSegments:function(_rParam) {
		/** tt = current time */
		var tt = new Date().getTime();
		/** uc = user cookie: may return back null/undefined */
		var uc = this.cookie.get('tnr:usrvtstg01');
		/** sa = array from cookie values */
		var sa = (uc)?uc.split('|'):'';
		/** lt = first index in array exp: {Date} 1296090865842 */
		var lt = (uc)?sa[0]:0;
		/** ltV= gets the last day visited */
		var ltV = (uc)?Math.round((tt-(sa[35]*1))/86400000):null;
		/** vsDCnt = gets the visited day count/ 24hrs */
		var vsDCnt = (uc)?(Math.round((tt-lt)/86400000))+1:1;
		/** sc = get session cookie */
		var sc = this.cookie.get('tnr:sesctmp01');
		var lts = (sc)?(sc)*1:null;
		/** thtyMinCk = checks if the user has returned in less then 30 min */
		var is30Min = ((tt - lts)>=1800000)?true:false;
		/** rnstg = return string value */
		var rnstg = null;
		/** isThtyD = thirty day check boolean */
		var isThtyD = (vsDCnt>30 || sa[32] == 't')?true:false;
		/** sPath = Set the path to track the users visit per page*/
		var sPath = (window.location)?window.location.pathname:'/';
		/** crntMnth = the users current month */
		var crntMnth = new Date().getMonth();
		/** rParam = return string param : values = '30Day' || 'lifetime' || 'month' */
		var rParam = _rParam, ks = false;
		var thirtyDSum, lifTimeSum, calMnthSum;
		var isIE7 = false, pagMtch = "";

		if((navigator.appVersion.indexOf("MSIE 7.")!=-1)){
			pagMtch = sPath.match(/([^\/]+\.[^\/]+$)/);
			sPath = sPath.replace(/([^\/]+\.[^\/]+$)/,"");
			isIE7 = true;
		}

		/** keeps a 30 day rolling value */
		thtyDRestChk = function(){
			if (isThtyD){
				var mv = ltV;//((vsDCnt*1) === 30)?0:(vsDCnt - 30);//2
				var ln = 34;
				var c = sa[30]*1;
				if (ltV > 30) {
					ks = true;
					sNewCookie();
				} else {
					for (var j = 1; j < ln; j++) {
						if (j < 31 && ltV == 1){
							sa[j] = sa[j+1];
						}else if ((mv+j) < 31 ){
							sa[j] = sa[j+mv];
						}
					}
					for(var e=30; e>(30-ltV); e--) {
						if (e < 30){
							sa[e] = 0;
						}
					}
					sa[32] = 't';
				}
				sa[30] = 0;
			}
		}.bind(this)

		/** sets the value of the user visits cookie for all return visitors */
		sUsrVistCookieVal = function(){
			if (!ks){
			sa[31] = (sa[31]*1) + 1; // set lifetime visits
			sa[33] = (sa[34] != crntMnth)?1:(sa[33]*1)+1; //set the month visit sum
			sa[34] = crntMnth; // set value for current month
			sa[35] = tt; // set value for current month

			var av = (sa[32] === 't' && ltV<30)?30:(vsDCnt<=30)?vsDCnt:((vsDCnt-30) < 30)?((vsDCnt - 30)+1):1;

			sa[av] = (sa[av]*1) + 1;
			var ln = sa.length;
			var ns = '';
			for (var i = 0; i < ln; i++) {
				ns += (i < 35)?sa[i]+'|':sa[i];
			}
			if(!isIE7){
				this.cookie.set('tnr:usrvtstg01', ns, 2000, sPath);
			} else if (sa[36] == pagMtch){
				ns = ns+"|"+pagMtch;
				this.cookie.set('tnr:usrvtstg01', ns, 2000, sPath);
			}

			}
		}.bind(this)

		/** sets the return value */
		sRtnObj = function () {
			var r;
				var lng = sa.length;
				thirtyDSum = 0;
				lifTimeSum = sa[31];
				calMnthSum = sa[33];

				for (var x = 1; x < lng; x++) {
					var cnm = sa[x];
					if (cnm != 0 && x < 31) {
						thirtyDSum += (cnm*1);
					}
				}
				r = gRtArr();
			return r;
		}.bind(this)

		/** sets the return value */
		gRtArr = function () {
			var _r;
			if (thirtyDSum == null) thirtyDSum = '1';
			if (lifTimeSum == null) lifTimeSum = '1';
			if (calMnthSum == null) calMnthSum = '1';
			if(rParam === '30day' || rParam === '30Day'){
				_r = [gNoR(thirtyDSum),thirtyDSum+''];
			} else if(rParam === 'liftime'){
				_r = [gNoR(lifTimeSum),lifTimeSum+''];
			} else if(rParam === 'month'){
				_r = [gNoR(calMnthSum),calMnthSum+''];
			} else {
				_r = {
					'$30Day':[gNoR(thirtyDSum),thirtyDSum+''],
					'calendar_month':[gNoR(calMnthSum),calMnthSum+''],
					'liftime':[gNoR(lifTimeSum),lifTimeSum+'']
				};
			}

			return _r;
		}.bind(this)

		/* gets the new or repeat value */
		gNoR = function (_v) { if (_v <= '1') {return 'new'} else {return 'repeat'} }

		/** sets new cookie for first time visit */
		sNewCookie = function()  {
			var vStng = tt +'|1|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|1|f|1|'+crntMnth+'|'+tt;

			if(isIE7){ vStng = vStng+"|"+pagMtch}
			this.cookie.set('tnr:usrvtstg01', vStng, 2000, sPath);
			this.cookie.set('tnr:sesctmp01' , tt, null, sPath);
		}.bind(this)


		if (uc && sc && is30Min && !isIE7){
			thtyDRestChk();
			sUsrVistCookieVal();
		} else if (!uc) {
			sNewCookie();
			rnstg = gRtArr();
			return rnstg;
		} else if(isIE7 && sa[36] == pagMtch){
				thtyDRestChk();
				sUsrVistCookieVal();
		}
		this.cookie.set('tnr:sesctmp01' , tt, null, sPath);
		rnstg = sRtnObj();

		return rnstg;
	}

		,

gCookie:function(param,flag){ var r=this.cookie.get(param); if(flag==='c'||flag===1) this.cookie.set(param,"-",-1000); return unescape(r);},
gDOM:function(domstring){return eval(domstring);},
gJObj:function(objectRef,attribute) {
	objectRef=(typeof objectRef=="string"?window[objectRef]:objectRef);
	var rval=(objectRef!=null&&attribute!=null&&attribute.indexOf(".")==-1&&attribute.indexOf("[")==-1?objectRef[attribute]:objectRef);
	if(rval===objectRef) {
		var attribs=attribute.split("."),len=attribs.length,reArray=/([^\[]+)\[(\d+)\]/,t,t2,rval=objectRef;
		for(i=0;i<len;i++) {
			t=attribs[i];
			if((t2=reArray.exec(t))!=null) {
				rval=rval[t2[1]][parseInt(t2[2])];
			} else rval=rval[t];
		}
	}
	return rval;
},
gMeta:function(tag){
	var a=tag,b=this.metatags;if(b==null){var c=document.getElementsByTagName("meta"),i=c.length;b={};while(i--){if(c[i].name.length>0)b[c[i].name]=(c[i].content?c[i].content:"");} this.metatags=b;} return(b[a]==null?"":b[a]);},
gQueryOnce:function() {
	var i,param="";
	for(i=arguments.length-1;i>=0;i--) { param+=arguments[i]+",";}
	return (!this[param]?this[param]=this.gQuery.call(this,param):null);
},
gQuery:function() {
	var s=this.vendor.Adobe.plugins();
	var i,param="";
	for(i=arguments.length-1;i>=0;i--) { param+=arguments[i]+",";}
	var r=(!s.getQueryParam?null:s.getQueryParam.call(s,param));
	return (r!=null&r.length>0?r:null);
},
/**
 * @function gQeurySpecial
 * Description: returns the value for a given query string param regardless of the delimiter starting the query string or between values . Pass in the query sting param you want to return and a delimiter if a character ignored by encodeURI() function is expected to separates query values.
 * @param {String} _v : query string value you want to lookup and return.
 * @param {String} _d : delimiter if a special character is expected to separates query values. Must be a character ignored by encodeURI() function.
 * @return {String} qeury value
 */
gQeurySpecial: function (_v, _d){
	var q = _w.location.href;
	var s = '';
	var d = _d;
	var v = (_v.indexOf('=')!= -1)?_v+'':_v+'=';
	var l = v.length;

	if (q.indexOf(v) != -1) {
		var n = q.indexOf(v);
		s = q.substr(n+l);
		n = s.indexOf(d);
		n = (n != -1)?n:s.indexOf('&');
		s = (n != -1)?s.substr(0,n): s;
		return s;
	}
},
vendor: {
	Adobe: {
		plugins: function(s) {
			if (!s) {
				s=this.tmp;
				if(!s) { s=s_gi("ignore");}
			}
			if(!s._jsmd_plugins_done) {
				/*
				 * Plugin: getQueryParam 2.3
				 */
				s.getQueryParam=new Function("p","d","u",""
				+"var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati"
				+"on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p"
				+".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-"
				+"1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i="
				+"=p.length?i:i+1)}return v");
				s.p_gpv=new Function("k","u",""
				+"var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
				+"=s.pt(q,'&','p_gvf',k)}return v");
				s.p_gvf=new Function("t","k",""
				+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
				+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
				+"epa(v)}return ''");

				/*
				 * Plugin: getTimeParting 2.0 - Set timeparting values based on time zone
				 */
				s.getTimeParting=new Function("t","z",""
				+"var s=this,cy;dc=new Date('1/1/2000');"
				+"if(dc.getDay()!=6||dc.getMonth()!=0){return'Data Not Available'}"
				+"else{;z=parseFloat(z);var dsts=new Date(s.dstStart);"
				+"var dste=new Date(s.dstEnd);fl=dste;cd=new Date();if(cd>dsts&&cd<fl)"
				+"{z=z+1}else{z=z};utc=cd.getTime()+(cd.getTimezoneOffset()*60000);"
				+"tz=new Date(utc + (3600000*z));thisy=tz.getFullYear();"
				+"var days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday',"
				+"'Saturday'];if(thisy!=s.currentYear){return'Data Not Available'}else{;"
				+"thish=tz.getHours();thismin=tz.getMinutes();thisd=tz.getDay();"
				+"var dow=days[thisd];var ap='AM';var dt='Weekday';var mint='00';"
				+"if(thismin>30){mint='30'}if(thish>=12){ap='PM';thish=thish-12};"
				+"if (thish==0){thish=12};if(thisd==6||thisd==0){dt='Weekend'};"
				+"var timestring=thish+':'+mint+ap;if(t=='h'){return timestring}"
				+"if(t=='d'){return dow};if(t=='w'){return dt}}};");

				/*
				 * Campaign Stacking Plugin
				 */
				s.campstack=new Function("v","cn","ex","ct","dl","ev","dv",""
				+"var s=this,ce;if(typeof(dv)==='undefined')dv=0;if(s.events&&ev){var"
				+" ay=s.split(ev,',');var ea=s.split(s.events,',');for(var u=0;u<ay.l"
				+"ength;u++){for(var x=0;x<ea.length;x++){if(ay[u]==ea[x]){ce=1;}}}}i"
				+"f(!v||v==''){if(ce){s.c_w(cn,'');return'';}else return'';}v=escape("
				+"v);var arry=new Array(),a=new Array(),c=s.c_r(cn),g=0,h=new Array()"
				+";if(c&&c!='')arry=eval(c);var e=new Date();e.setFullYear(e.getFullY"
				+"ear()+5);if(dv==0&&arry.length>0&&arry[arry.length-1][0]==v)arry[ar"
				+"ry.length-1]=[v,new Date().getTime()];else arry[arry.length]=[v,new"
				+" Date().getTime()];var start=arry.length-ct<0?0:arry.length-ct;var "
				+"td=new Date();for(var x=start;x<arry.length;x++){var diff=Math.roun"
				+"d((td.getTime()-arry[x][1])/86400000);if(diff<ex){h[g]=unescape(arr"
				+"y[x][0]);a[g]=[arry[x][0],arry[x][1]];g++;}}var data=s.join(a,{deli"
				+"m:',',front:'[',back:']',wrap:\"'\"});s.c_w(cn,data,e);var r=s.join"
				+"(h,{delim:dl});if(ce)s.c_w(cn,'');return r;");
				s._jsmd_plugins_done=true;
			}
		return this.tmp=s;
		}
	}
},
tCase: function(arg) {
	var rval=arg,i;
	switch(typeof(arg)) {
		case "string": rval=arg.toLowerCase(); break;
		case "object":
			for(i in arg) {
				if(typeof(arg[i])=="string") arg[i]=arg[i].toLowerCase();
			}
	}
	return rval;		// Case transformation function
},
tTrim: function(arg,addlRegexs) {
	if(!(arg!=null&&arg.length>0)||typeof(arg)==="object") {return arg;}
	var a=addlRegexs,rval=arg;
	if(!addlRegexs) {
		a=[[/\s+/g," "],/^\s+/,/\s+$/];
	}
	var i=a.length,rstr="",r;
	while(i--) {
		rstr="";
		r=a[i];
		if(typeof(r.exec)==="undefined"){
			r=a[i][0];
			rstr=a[i][1];
		}
		rval=rval.replace(r,rstr);
	}
	return rval;
	},
tSub: function(arg,delimiter,i) { var r=""; try{r=arg.split(delimiter)[i];}catch(err) {}; return r;
},
tAll: "tCase|tTrim",	// The "tAll" transform is a special transform and will be applied to all functions automatically
/**
 *Description: gets and sets client-side cookies.
 */
cookie: {
	/**
	 *@function get
	 *Description: Gets a cookie from local users computer
	 *@param k = key / name {String} of cookie
	 *@return {String} cookie value string
	 */
	get: function(k){var c=' '+document.cookie,s=c.indexOf(' '+k+'='),e=s<0?s:c.indexOf(';',s),v=s<0?'':c.substring(s+2+k.length,e<0?c.length:e);return unescape(v);},
	/**
	 *@function set
	 *Description: Sets a cookie on local users computer
	 *@param k = key / name {String}
	 *@param v = value {String}
	 *@param e = expires {Number, Date Object}
	 *@param p = path {String}
	 *@param d = domain {String}
	 */
	set: function(k,v,e,p,d){var exp=(typeof(e)=="object"?e:new Date((new Date().getTime())+(!e?0:e)*86400000));document.cookie=k+"="+escape(v)+(e!=null?"; expires="+exp.toGMTString():"")+"; path="+(!p?"/":p)+"; "+(d!=null?" domain="+d:"");}
}


	},
	dynamic: {

	/* All dynamic Actions defined here */
	actions: {
		"dynamic-link": function(data,map) {
			this.set("action","link");
			this.set("link",{name:data.link_name,type:"o"});
			this.send();
		},
		"dynamic-page": function(data) {this.send();},
		"flash-link": "alias:dynamic-link",
		"flash-page": "alias:dynamic-page",
		"video-common": function(data,map) {
			var v = data.video||{};
			if (v.headline != null && v.category != null) {
				/* MLB Highlights need to be detected separately from the rest of MLB videos */
				if (v.headline.indexOf("MLB Highlights") > -1) {
					this.set("business.si.vid_franchise","mlb highlights");	//prop5,eVar5
				/* Inside Report needs specific coding for its franchise variable because the category can be different with each video */
				} else if (v.subcategory == "inside_report") {
					this.set("business.si.vid_franchise","inside report");	//prop5,eVar5
				/* Behind The Mic needs specific coding for its franchise variable because the category can be different with each video */
				} else if (v.subcategory == "allstate") {
					this.set("business.si.vid_franchise","behind the mic");	//prop5,eVar5
				} else {
					this.set("business.si.vid_franchise",v.category);		//prop5,eVar5
				}
			}
			/* Code specific for setting the Audio ID variable on Podcast video pages */
			if (v.headline != null && (window.location.pathname.indexOf("si-podcasts") > -1)) {
				this.set("business.si.audio",v.headline);	//prop7,eVar7
			}
			if (_jsmd.plugin.gJObj("cnn_metadata","template_type") == null) {
				this.set("page.template_type","adbp:video");	//prop32,eVar32
			}
			this.set("page.content_type","adbp:video start");	//prop33,eVar33
			this.set("video.title",v.headline);					//prop29,eVar41
			this.set("video.id",v.id);							//eVar42
			this.set("business.si.vid_category",v.category);	//prop11,eVar11
			var t=this.get("mb:video.player");
			this.set("mb:video.player",v.video_player_name||t);
		},
		/*
		"video-preroll": function(data, map) {
			var v=data.video||{};
			this.set("action","link");
			this.set("link",{name: "video-preroll: "+ v.title, type: "o"});
			this.push("page.events","video.preroll");
			if (!v.source.match("NBA")) {
				this.send();
				sendComscoreVideoMetrixBeacon(v.id,2); // Ad-related comscore call
			};
		},
		*/
		"video-start": function(data, map) {
			var v = data.video||{};
			var cid = data.instance||"";
			/* add new video player object */
			var vc = (video_collection_created == false ? new _jsmd.plugin.gSIVideoCollection() : _jsmd.plugin.gSIVideoCollection());
			this.set("action","link");
			if (vc.get(cid,"isAuto") == true) {
				this.push("page.events","video.autostart");	//event34
				this.set("link",{name: "video-autostart: "+ v.headline, type: "o"});
			} else {
				this.set("link",{name: "video-start: "+ v.headline, type: "o"});
			}
			this.push("page.events","video.start");	//event32
			vc.start(cid,v.headline);	//create new item in video collection array object
			/* NBA sourced videos don't get tracked */
			if (!v.source.match("NBA") && !v.source.match("nba")) {
				this.send();
				sendComscoreVideoMetrixBeacon(v.id,1); // Content-related comscore call
				sendNielsenVideoCensusBeacon(this.get("m:nielsen"),"start",v.id);
			}
			vc.set(cid,"vidStarted",true);
			vc.set(cid,"isAuto",true);
			video_collection_created = true;
		},
		"video-autofix": function(data, map) {	//called when the video is autostart to set the flag
			var cid = data.instance||"";
			var v = (data.video == null ? "" : data.video);
			var vc = _jsmd.plugin.gSIVideoCollection();
			vc.set(cid,"isAuto",v);
		},
		"video-fifty_percent": function(data,map) {
			var v = data.video||{};
			var cid = data.instance||"";
			var vc = _jsmd.plugin.gSIVideoCollection();
			if (vc.get(cid,"pastHalf") == false && vc.get(cid,"hasScrubbed") == false) {
				var timeSpent = vc.progress(cid);
				this.set("video.duration_watched",timeSpent+"");	//event36
				this.set("action","link");
				this.set("link",{name: "video-fifty_percent: " + v.headline, type: "o"});
				this.push("page.events","video.fifty_percent");		//event1
				/* NBA sourced videos don't get tracked */
				if (!v.source.match("NBA") && !v.source.match("nba")) {
					/* validate timeSpent value */
					var duration = parseFloat(v.trt)||"";
					if (duration == "" || duration == null) {
					}else{
						try {
							if ((timeSpent > duration * 2) || (timeSpent < 0)) {
								timeSpent = duration * 2;
							};
						} catch(e) { timeSpent = 0; };
						this.send();
					};
				};
				vc.set(cid,"pastHalf",true);
			};
		},
		"video-pause": function(data, map) {
			var v = data.video||{};
			var cid = data.instance||"";
			var vc = _jsmd.plugin.gSIVideoCollection();
			if (vc.get(cid,"vidStarted") == true) {
				vc.pause(cid);	//calculate time spent and set flag
			};
		},
		"video-buffer": function(data, map) {
			var v = data.video||{};
			var cid = data.instance||"";
			var vc = _jsmd.plugin.gSIVideoCollection();
			if (vc.get(cid,"vidStarted") == true) {
				vc.buffer(cid);	//calculate time spent and set flag
			};
		},
		"video-scrub": function(data, map) {
			var v = data.video||{};
			var cid = data.instance||"";
			var vc = _jsmd.plugin.gSIVideoCollection();
			if (vc.get(cid,"vidStarted") == true) {
				vc.set(cid,"hasScrubbed",true);	//set flag
			};
		},
		"video-complete": function(data, map) {
			var v = data.video||{};
			var cid = data.instance||"";
			var vc = _jsmd.plugin.gSIVideoCollection();
			var timeSpent = vc.complete(cid);
			this.set("video.duration_watched",timeSpent+"");	//event36
			this.set("action","link");
			this.set("link",{name: "video-complete: "+ v.headline, type: "o"});
			this.push("page.events","video.complete");			//event33
			/* NBA sourced videos don't get tracked */
			if (!v.source.match("NBA") && !v.source.match("nba")) {
				/* validate timeSpent value */
				var duration = parseFloat(v.trt)||"";
				if (duration == "" || duration == null) {
				}else{
					try {
						if ((timeSpent > duration * 2) || (timeSpent < 0)) {
							timeSpent = duration * 2;
						};
					} catch(e) { timeSpent = 0; };
					this.send();
				};
				sendNielsenVideoCensusBeacon(this.get("m:nielsen"),"complete",v.id,timeSpent);
			};
			this.set(cid,"vidStarted",false);
			this.set(cid,"hasScrubbed",false);
			this.set(cid,"isPaused",false);
			this.set(cid,"isBuffering",false);
			this.set(cid,"pastHalf",false);
		},
		"video-stop": "alias:video-complete",
		"football-challenge": function(data) {
			this.set("business.si.game.action",data.action);	//prop15,eVar15
			this.set("page.name","");
			this.set("action","link");
			this.set("link",{name: "football-challenge", type: "o"});
			this.send();
		},
		"search-results": function(data) {	//page call
			if (this.plugin.gJObj(data,"search.results") <= 0) {
				this.set("search.internal.number_results","zero");	//prop27
			} else {
				this.set("search.internal.number_results",this.plugin.gJObj(data,"search.results").toString());	//prop27
			}
			this.set("search.internal.keyword",this.plugin.gJObj(data,"search.term"));		//prop39,eVar39
			this.set("page.content_type","adbp:" + this.plugin.gJObj(data,"content_type"));	//prop33,eVar33
			this.set("page.section[0]",this.plugin.gJObj(data,"section[0]"));				//channel,eVar27
			this.set("page.template_type",this.plugin.gJObj(data,"template_type"));			//prop32,eVar32
			this.set("page.name",this.plugin.gADBPPageName());								//pageName,eVar26
			this.push("page.events","search.internal.page");								//event27
			this.send();
		},
		"mlbtab-click": function(data) {
			this.set("business.si.game.name",data.tab_name);	//prop12,eVar12
			this.set("action","link");
			this.set("link",{name: "mlbtab-click: " + data.tab_name, type: "o"});
			this.send();
		},
		"livefyre-click": function(data) {
			this.push("page.events","social.interaction");		//event24
			this.push("page.events","social.comment_submit");	//event25
			if (data.action) {
				this.set("business.si.social_type",data.action);	//prop24,eVar24
			} else {
				this.set("business.si.social_type","social: livefyre comment");	//prop24,eVar24
			}
			this.set("action","link");
			this.set("link",{name: "livefyre-click", type: "o"});
			this.send();
		},
		"gallery-click": function(data) {
			var gi = data.gallery_info;
			this.set("action","link");
			this.set("link",{name: "gallery-click: " + gi, type: "o"});
			this.set("business.si.gallery_info",gi);				//prop25,eVar25
			this.set("page.template_type","other:photo gallery");	//prop32,eVar32
			this.set("page.content_type","adbp:none");				//prop33,eVar33
			this.set("page.name","");
			this.send();
		},
		"social-click": function(data) {
			var st = data.social_type;
			this.set("action","link");
			this.set("link",{name: "social-click: " + st, type: "o"});
			this.set("business.si.social_type",st);		//prop24,eVar24
			this.set("page.name","");
			this.send();
		}
	}

	}
};

var _jsmd = function() {
	var _w=window;
	/**
		Version identifier of the JSMD Module - use YYYYMMDD[letter] to identify specific iteration.
	*/
	var prvVersion=_jsmd_default.version||"ADBP-VANILLA";
	var prvRelease=_jsmd_default.release||"ERR",ver=prvVersion+":"+prvRelease;
	if(_jsmd_default.dictionary!=null) {_jsmd_default.dictionary.init["code.version"]=ver;}
	var prvDefaultMetadataDictionaryTemplate=_jsmd_default.dictionary|| {
		init: {
			"business.name":					"turner",					//prop30,eVar30
			"business.lob":						"general",		//hier1
			"business.brand":					"turner",					//hier1
			"page.clean_url":					"raw:gADBPURL|",		//prop26
			"page.domain":						"raw:gADBPURL|domain",	//server,eVar29
			"page.name":						"raw:gADBPPageName|",	//pageName,eVar26
			"page.section[0]":					"raw:gADBPURL|path,1",
			"page.section[1]":					"raw:gADBPURL|path,2",
			"time.hour":						"raw:gADBPTimePart|h",	//prop40,eVar40
			"time.dow":							"gADBPTimePart|d",		//prop40,eVar40
			"time.weekpart":					"gADBPTimePart|w",		//prop40,eVar40
			"page.full_url":					_w.location.href,
			"page.template_type":				"adbp:error",
			"code.version":						prvVersion+":"+prvRelease	//prop35 - do not alter
		}
	};
	var prvDefaultVendorMapTemplate=_jsmd_default.map || {
		"turner": {
			vendors: [
				{
					name:			"Adobe SiteCatalyst H-code",
					account:		"adbp",
					settings:		"adbp",
					variablemap:	"adbp",
					eventmap:		"adbp"
				}
			],
			adbp: {
				account: function() {
					return "turnererrors";
				},
				settings: {
					"trackInlineStats":			true,
					"linkLeaveQueryString":		false
				},
				variablemap: {
					"m:page.name":						["pageName","eVar26"],
					"m:page.section[0]":				["channel","eVar27"],
					"m:page.domain":					["server","eVar29"],
					"m:page.clean_url":					["prop26"],
					"m:search.internal.number_results":	["prop27"],
					"m:page.section[1]":				["prop28","eVar28"],
					"m:video.title":					["prop29","eVar41"],
					"m:business.name":					["prop30","eVar30"],
					"m:page.franchise":					["prop31","eVar31"],
					"m:page.template_type":				["prop32","eVar32"],
					"m:page.content_type":				["prop33","eVar33"],
					"m:user.authenticated":				["prop34","eVar34"],
					"m:user.segment":					["prop36","eVar36"],
					"m:time":							["prop40","eVar40"],
					"m:video.id":						["eVar42"],
					"m:promo.internal.id":				["eVar43"],
					"m:promo.internal.implied":			["eVar48"],				//Campaign Stacking (SEO Driven)
					"m:promo.external.id":				["campaign"],			//Marketing/External Campaigns
					"m:code.version":					["prop35"],
					"m:business.lob|m:business.brand|m:business.friendly_name|m:page.domain|m:page.section[0]|m:page.section[1]":	["hier1"],
					"delimiter":						"|"
				},
				eventmap: {
					"m:page.name":				["event26"],
					"page.view":				["event26"],
					"search.internal.keyword":	["event27"],
					"registration.complete":	["event28"],
					"product.view":				["prodView"],
					"product.multiview":		["prodView"],
					"cart.add":					["scAdd"],
					"cart.new":					["scOpen"],
					"checkout.start":			["scCheckout"],
					"checkout.name_address":	["event13"],
					"checkout.validate":		["event14"],
					"purchase.complete":		["purchase"],
					"checkout.validate":		["event14"],
					"promo.internal.id":		["event31"],
					"video.start":				["event32"],
					"video.complete":			["event33"],
					"video.autostart":			["event34"],
					"ad.start.preroll":			["event35"],
					"user.login":				["event37"],
					"blog.read":				["event38"],
					"article.read":				["event39"]
				}
			}
		}
	};
	var prvDefaultVendorSpecificTemplate;	// Leave null to use the default version

	/**
		Metadata Utilities Container (public Plugins & Data transformation routines)

		This object contains all metadata collection and transformation plugins in use by the centralization framework.  This module variable is publically accessible and can be accessed direclty / modified by using the folloiwng syntax:

		<pre>
			<objectname or "this">.plugin.<pluginFunctionName>(<plugin parameters>);
		</pre>

		Plugins can also be define in the top-level namespace of the metadata dictionary template on a per-instance basis.  This is done automatically if the template contains the "plugin" variable / member.

		By convention, all


		Some of the current plugins defined by default include:
		<ul>
		<li><strong>gCookie: </strong> </li>
		<li><strong>gADBPTimePart: </strong> </li>
		<li><strong>gDOM: </strong> </li>
		<li><strong>gMeta: </strong> </li>
		<li><strong>gQuery: </strong> </li>
		<li><strong>tCase: </strong> </li>
		<li><strong>tSub: </strong> </li>
		<li><strong>tTrim: </strong> </li>
		<li><strong>tXlate: </strong> </li>
		</ul>

	*/
	var pubDefaultMetadataUtilities=_jsmd_default.plugins;
	/**
		The default metadata dictionary template used to instantiate the metadata dictionay.  This object will be used as the default template for any metadata dictionary values if no other defaults are found.

		This object contains an "init" container, which holds all default dictionary initialization values.  The values include:
		<ul>
		<li><strong>Individual dictionary key / value pairs</strong> that will be created during the initialization process. </li>
		<li><strong>"preinit" and "postinit"</strong> functions, which allow for metadata customization and run before & after the initialization process, respecitvely.</li>
		</ul>
		Dictionary Key/Value pairs use the following syntax:
		<pre>
		init: {
			"page.name":			window.location.pathname,
			"time.hour":			"gTimePart|h",
			"test.gCookie":			"gCookie|testcookie",
			"test.gDOM":			"gDOM|document.getElementsByTagName('html')[0].lang;",
			"test.gMeta":			"gMeta|matt",
			"test.gQuery":			"gQuery|testqs",
			"test.page.section[1]":	_w.location.protocol,
		}
		</pre>

		Note that:
		<ul>
		<li><strong>Left-handed values</strong> represent metadata dictionary keys, and corresponding dictionary containers are dynamically created
		<li><strong>Right-handed values</strong> can be any combination form of plugins or JavaScript literal values.
		</ul>

		Function values for pre-init & post-init take the following form:
		<pre>
		init: {
			postinit: function() {
				this.set("page.name","prefix:"+this.get("page.name")); // Clean up & modify metadata once it's been collected
			},
			preinit: function() {
				_w.someglobal="xyz"; // Format & clean up data prior to metadata instantiation
			}
		}
		</pre>

		Other default containers will be used if defined, in this order:
		<ul>
		<li><b>Specific "init" Parameters:</b> if an object is provided to the "init" function during instantiation, that object will be used as a metadata dictionary template.</li>
		<li><b>Global variable _jsmdDefaultDictionary:</b> If defined and if it contains a valid "init" member, this Global variable will be used.</li>
		<li><b>prvDefaultMetadataDictionaryTemplate:</b> The object falls back to execute the default metadata dictionary object if no other objects are defined.</li>
		</ul>
	*/
	/**
		The default vendor mapping template object, used by the metadata dictionary object as part of the vendor/beacon instantiation process.  This object defines all the necessary relationships between vendor-neutral metadata and vendor-specific beacons or tags.

		Each template can contain one or more uniquely named lables that contain individual map configurations.  For example,

		<pre>
		var prvDefaultVendorMapTemplate={
			"config 1": { // map configuration object definitions },
			"config 2": { // map configuration object definitions }
		}
		</pre>
		Each vendor configuration block in the mapping file will be executed sequentially during the "map" stage of execution--which is to say that they will be evaluated, vendor-specific objects will be instantiated, and the objects will be configured using the settings / variable / event mappings. The inner map configuration object definitions consist of two objects: an array of "vendors" that are associated with the configuration, and one or more configuration "objects" the give detailed mapping & integration details.

		<pre>
		var prvDefaultVendorMapTemplate={
			"config 1": {
				vendors: [
					{ name: "Adobe H22 Code",	// Label used to fetch the vendor-specific code library
					account: "basic",			// Configuration block that will be used for account assignment
					settings: ["basic"],		// One of multiple blocks that will be executed to configure the vendor object
					variablemap: ["basic"],		// One or more blocks that define vendor-specific variables mappings.
					eventmap: ["basic"],		// One or more blocks that define the vendor-specific event mappings & definitions.
					prevendor: function(){},	// Function that's executed PRIOR to instantiating the vendor mapping section
					postvendor: function(){}	// Function that's executed POST vendor-mapping instantiation
					}
				],
				basic: {
					account: function()	{ // Returns account settings for vendor tag },
					settings:			{ // Vendor-specific settings },
					variablemap:		{ // Vendor-specific variable settings added to the vendor tag },
					eventmap:			{ // Vendor-specific event mapping added to the vendor tag} ,
					premap: function()	{ // Function executed just prior to executing account function mapping },
					postmap: function()	{ // Function executed just after the post maping process completes }
				}
			}
		}
		</pre>
		Steps of Execution:
		<ul>
		<li>All vendor objects in the "vendors" array are processed:</li>
		<ul>
		<li>The prevendor function is executed, if it's defined</li>
		<li>The premap function is executed in the block associated with the account logic, if it's defined</li>
		<li>The account code is executed to provide any account-specific information to the vendor object. </li>
		<li>The settings, variablemap, and eventmap containers are processed and loaded into the vendor object</li>
		<li>The postmap function is executed from the block associated with the account logic, if it's defined</li>
		<li>The postvendor function is executed, if it's defined</li>
		</ul>
		</ul>
	*/
	prvDefaultVendorSpecificTemplate=_jsmd_default.vendor||{
		"Nielsen Hybrid Light Code": {
			delimiter: ":",
			initialize: function(accountf,vendorAction) {
				var a=accountf,o,va=this.get("action"),vc=this.config.vendor;
				if(typeof(accountf)=="function") {a=accountf.call(this)||"IGNORE";}
				vc.action.push([NielsenHybridTag,"push_nielsen",[a]]);
				return o;

			},
			destroy: function(vendorObject) {
			}
		  },
		"Adobe SiteCatalyst H-code": {
			delimiter: ":",
			initialize: function(accountf,vendorAction) {
	 			var a=accountf,o,va=this.get("action"),vc=this.config.vendor;
				if(typeof(accountf)=="function") {a=accountf.call(this)||"IGNORE";}
				o=s_gi(a);
				delete o.pageName;
				if(va==="link") {
					var lnk=this.get("link");
					var t=lnk.type,n=lnk.name;
					t=(t==="download"?"d":(t==="exit"?"e":"o"));
					n=(!n?"defaultlink:"+t+":"+_w.location.pathname:n);
					vc.action.push([o,"tl",[true,t,n]]);
				} else {
					events="event26"; // Default ADBP page view standard event
					vc.action.push([o,"t",[]]);
				}
				o.doPlugins=function() {

				};
				/* if(this.get("page.type")=="err") {// 404 ERROR LOGIC - disabled per ADBP standards
					o.pageName = "";
					o.pageType="errorPage";
				} */
				o.products=null;
				return o;
			},
			destroy: function(vendorObject) {
				var unsetList=vendorObject._jsmd.unset_list;
				for(i=unsetList.length-1;i>=0;i--) { vendorObject[unsetList[i]]="";} // Necessary to remove all previously defined values at the end of the call
				vendorObject.events="";
				vendorObject.products="";
			},
			setEvent: function(obj,key,value) {
				if(!value||!key) return;
				var e=(obj.events&&obj.events.length>0?obj.events.split(","):[]),etest=e.join(","); // Use a null event list if not already defined
				var k=(typeof(key)=="object"?key:[key]);
				for(i=k.length-1;i>=0;i--) {
					if(etest.indexOf(k[i])==-1) {e.push(k[i]); etest+=","+k[i];
						var v1=parseFloat(value);
						if(v1!=null&&typeof(v1)=="number"&&v1>0) {
							obj.products=";;;;"+k[i]+"="+value;
						}
					}
				}
				obj.events=e.join(",");
			},
			setProducts: function(obj,productmd) {
				var MAXPRODUCTS=10;
				if(!productmd||(!productmd.list)) return;
				var lst=productmd.list,dim=productmd.dimensions,p=[],tmp,tl,missprod="Missing Product",i;
				if(obj.products!=null) {
					p=obj.products.split(",");
				}
				m=obj["client:merchandising_map"],re=/[\;\\,\|]+/g,rchar="-";
				for(var i=0;i<lst.length&&i<MAXPRODUCTS;i++) {
					tl=lst[i];
					tmp=[(!tl.category?"":tl.category.replace(re,rchar)),(!tl.id?missprod:tl.id.replace(re,rchar))];
					if(tl.quantity!=null&&tl.total_price!=null) {
						tmp[2]=tl.quantity;
						tmp[3]=tl.total_price;
					}
					if(dim!=null&&m!=null) {
						tmp2=[];
						for(var j=m.length-1;j>=0;j--) {
							var subkey=m[j][0],subval=m[j][1];
							for(var k=dim.length-1;j>=0;j--) {
								var lookup=dim[k][subkey];
								if(lookup!=null) {
									tmp2[k]=subval + "=" + lookup.replace(re,rchar);
								}
							}
						}
						tmp[5]=tmp2.join("|");
					}
					p.push(tmp.join(";"));
				}
				for(i=p.length-1;i>=0;i--) {
					if(p[i].length<7) {
						p.splice(i,1);
					}
				}
				obj.products=p.join(",");
			},
			setVariable: function(obj,key,value,unsetList) {
				if(!value||value.length==0) { return;}
				function inLookupDynamicShorthand(key) {
					var shorthand=key.split("eVar").join("v").split("prop").join("c").split("channel").join("ch");
					if(shorthand==="pageName") return "pageName";
					return (shorthand!==key?shorthand:null);
				}
				if(typeof(key)=="string") {obj[key]=value;}
				else {
					var l=key.length,i,k,shorthand=inLookupDynamicShorthand(key[0]);
					for(i=0;i<l;i++) {
						k=key[i];
						if(value!=null) {
							if(i>0&&shorthand!=null) {obj[k]="D="+shorthand;}
							else {obj[k]=value; if("pageName".indexOf(k)==-1){unsetList.push(k);}}
						}
					}
				}
			}
		}
	};
	function CAnalyticsObject(initObj,mapObj,vendorObj) {
		var me=this;
		me.version=prvVersion;
		me.mdata={};
		me.config={};
		me.config.init=initObj.init||prvDefaultMetadataDictionaryTemplate.init;
		me.config.map=mapObj||prvDefaultVendorMapTemplate;
		me.config.vendor=vendorObj||prvDefaultVendorSpecificTemplate;
		me.plugin=initObj.plugin||pubDefaultMetadataUtilities;
		me.init();
	}
	CAnalyticsObject.prototype.init=function(){
		var i=this.config.init,j,p=this.plugin;
		if(p) {
			if(p.tAll) {
				j=p.tAll.split("|");p.tF=[];var k,t,l=j.length;
				for(k=0;k<l;k++) {t=j[k];if(p[t]){p.tF.push(p[t]);}}
			}
		}
		if(i!=null) {
			if(typeof(i.preinit)=="function") i.preinit.call(this);
			if(i!=null) {
				for(j in i) { this.set(j,i[j]); }
			}
			if(typeof(i.postinit)=="function") i.postinit.call(this);
		}
	 };
	CAnalyticsObject.prototype.get=function(n){
		var rval=[],prefix=n.split(":")[0],bname=null,t=n, reUnsafe,i,tarray=(n.indexOf("|")!=-1?n.split("|"):[n]);//,re=/[^\w\.\[\]\{\}\:\-\(\)]+/g;
		for(i=0;i<tarray.length;i++) {
			n=tarray[i];
			try {
				switch(prefix) {
					case "js": t=n.replace("js:",""); break;
					case "mb": t=n.replace("mb:","this.mdata.business."+this.mdata.business["name"]+"."); break;
					default: t="this.mdata."+n.replace(prefix+":",""); break; // Primary for JS literals
				}
				rval.push(eval((!reUnsafe?t:t.replace(reUnsafe,""))));
			} catch(err) {}
		}
		return (rval.length>0?(rval.length==1?rval[0]:rval):null);
	};
	CAnalyticsObject.prototype.getnn=function(n){var a=this.get(n); return (!a?"":a);};
	CAnalyticsObject.prototype.set=function(n,v) { return (n==="preinit"||n==="postinit"?null:prvSetCommonFunction.call(this,n,v,"set")); };
	CAnalyticsObject.prototype.push=function(n,v) { return (n==="preinit"||n==="postinit"?null:prvSetCommonFunction.call(this,n,v,"push"));};
	CAnalyticsObject.prototype.load=function(v) {if(_jsmd_default.dynamic!=null&&typeof(_jsmd_default.dynamic.load)=="function"){
													_jsmd_default.dynamic.load.call(this,v);}
												else {this.mdata=v;} };
	CAnalyticsObject.prototype.trackMetrics=function(action,data,map) {
		var defaultDynamicNS=(!_jsmd_default.dynamic?{}:_jsmd_default.dynamic.actions);
			var act=defaultDynamicNS[action];
			var t=action.split("-"),c=(t.length>0?t[0]:null),common=defaultDynamicNS[c+"-common"];
			if(typeof(act)=="string"&&act.indexOf("alias:")==0) {act=defaultDynamicNS[act.split("alias:")[1]];}
			this.config.map.isDynamic=action;
			try {
				if(typeof(common)=="function") {
					common.call(this,data,map);
				}
				act.call(this,data,map);
			} catch(e) {}
			this.config.map.isDynamic=false;
	};
	CAnalyticsObject.prototype.map=function(mapObj) {
		if(mapObj) {mapObj.dirty=1; this.config.map=mapObj;}
		var me=this,v1,v2,b1,m=this.config.map; // Used for inner-function references to the object
		if(m.dirty!=0) {
			this.config.vendor.action=[];
			for(v1 in m) {
				v2=m[v1];
				if(v2.vendors&&typeof(v2.vendors.forEach)=="function") {
					v2.vendors.forEach(inDoVendorInitialize);
				}
			}
			m.dirty=0;
		};
		function inDoVendorInitialize(map) {
			var vendorLogic=me.config.vendor,n=map.name;
			if(!vendorLogic[n]){return;}
			var vendorInstantiate=vendorLogic[n].initialize,pre=map.prevendor,post=map.postvendor,acctKeys=map.account,emapKeys=map.eventmap,
				cmapKeys=map.settings,vmapKeys=map.variablemap,delimiter=v2.delimiter,dynamicFunctionCall=me.config.map.isDynamic;
			if(dynamicFunctionCall!=null&&map.dynamic_actions!=null) {
				var z,y,al=map.dynamic_actions,al2;
				for(z in al) {
					if(dynamicFunctionCall.indexOf(z)!=-1) {
						al2=al[z];
						cmapKeys=al2.settings||cmapKeys;
						vmapKeys=al2.variablemap||vmapKeys;
						emapKeys=al2.eventmap||emapKeys;
						acctKeys=al2.account||acctKeys;
						pre=al2.prevendor||pre;
						post=al2.postvendor||post;
						if(al2.ignore!=null) {return;}
					}
				}
			}
			if(!acctKeys&&!v2[acctKeys]) return; // Avoid null account error
			var accts=v2[acctKeys].account,premap=v2[acctKeys].premap,postmap=v2[acctKeys].postmap;
			if(typeof(pre)=="function") {pre.call(me,map);} // Do pre-Vendor ETL & Logic if defined.
			if(typeof(vendorInstantiate)=="function" && typeof(accts)=="function") {
				vObj=vendorInstantiate.call(me,accts);
				me.v=vObj;
				var i,t,mapBlock;
				if(premap&&premap.call) { premap.call(me);}
				if(cmapKeys!=null) {
				for(i=0;i<cmapKeys.length;i++) {mapBlock=v2[cmapKeys[i]]; if(mapBlock&&mapBlock.settings){inDoMap.call(me,"settings",mapBlock.settings);}}
				}
				if(vmapKeys!=null) {
				for(i=0;i<vmapKeys.length;i++) {mapBlock=v2[vmapKeys[i]]; if(mapBlock&&mapBlock.variablemap){inDoMap.call(me,"variables",mapBlock.variablemap);}}
				}
				if(emapKeys!=null) {
				for(i=0;i<emapKeys.length;i++) {mapBlock=v2[emapKeys[i]]; if(mapBlock&&mapBlock.eventmap){inDoMap.call(me,"events",mapBlock.eventmap);}}
				}
				if(typeof(vendorLogic[n].setProducts)=="function") {vendorLogic[n].setProducts.call(me,vObj,me.mdata.product);}
				if(postmap&&postmap.call) { postmap.call(me);} // Do post-map ETL & Logic if defined
			}
			if(post&&post.call) { post.call(me,map);} // Do postvendor if defined
			delete me.v;
			function inDoMap(mapType,mapObj) {
				var me=this,i,vl=vendorLogic[n], // Shortcut to vendor logic array
					setv=vl.setVariable,  // reference to the vendor-specific setVariable function, if it exists
					sete=vl.setEvent,		// reference to the vendor-specific setEvent function, if it exists
					setc=vl.setConfig,		// Reference to the vendor-specific setConfig function, if it exists
					v=vObj,								// Shortcut to the vendor Object itsets
					inclusion=null,exclusion=null,					// Used during dynamic function calls to filter / exclude mappings
					doFilteredSettings=false,								// No filtering on settings by default
					delim=mapObj.delimiter||delimiter||vl.delimiter;	// Default delimiter - we use either the mapObject-defined delimiter, or the previously defined delimiter, or the vendor-specific delimiter, whichever is defined first
				if(dynamicFunctionCall!=null&&typeof(dynamicFunctionCall)=="string") {
					var tl1=mapBlock["filters"],tl2;
					if((tl2=(tl1!=null&&tl1[dynamicFunctionCall]!=null?tl1[dynamicFunctionCall]:null))!=null) {
											inclusion=tl2["include"];
											exclusion=tl2["exclude"];
											doFilteredSettings=tl2["do-settings"];
					}
				}
				if(!v._jsmd) {
					v._jsmd={unset_list:[]};  // Setup an array to hold all variables that have been set.  This is used to "clear" variables once the object is destroyed
					if(vl.destroy!=null) {v._jsmd.destroy=vl.destroy;} // Shortcut to vendor object destructor, if defined
				}
				var set=function(f,lookupType){									// Inner setter function that calls the vendor-specific set functions
					var i,m=mapObj,res,dof=(typeof(lookupType)=="function"),skip,matchi,matche,i2;			// m is the map Object defined in the earlier scope.  It will be iterated through entirely.  dof is the do-function check flag, to determine if we should call the function or just set the value.
					var doFilterSettingsCheck=(f!==setc||(f===setc&&doFilteredSettings==true))&&(inclusion!=null||exclusion!=null);
					for(i in m){
						skip=false;
						if(doFilterSettingsCheck){
							matche=false; matchi=false;
							if(typeof(inclusion)=="object") {
								for(i2=inclusion.length;i2>=0;i2--) {matchi=matchi||(i.indexOf(inclusion[i2])!=-1?true:false);}
							} else {
								matchi=(inclusion!=null&&i.indexOf(inclusion)!=-1?true:false);
							}
							if(typeof(exclusion)=="object") {
								for(i2=exclusion.length;i2>=0;i2--) {matche=matche||(i.indexOf(exclusion[i2])!=-1?true:false);}
							} else {
								matche=(exclusion!=null&&i.indexOf(exclusion)!=-1?true:false);
							}
							skip=(matchi==false)||(matche==true);
						}
						if(!skip&&(res=(dof?lookupType(i):i))!=null&&typeof(m[i])!="function"){	// Lookup the actual metadata value that we iterate through (if it's an actual metadata value - if it's an actual value, just use it without the lookup)
							f.call(me,v,m[i],res,v._jsmd.unset_list);}								// Once we have the metadata value (or literal value), call the vendor-specific logic to set the value at a vendor level
					}
				};
				sete=(!sete?setv:sete); setc=(!setc?function(vo,k,v){return setv(vo,v,k);}:setc);delim=(!delim?":":delim);  // Default setter logic.  Basically used in the event that we don't have vendor-specific setters defined
				if(mapType==="settings" && typeof(setc)=="function") {			// Do actions for the "settings" map block
					set(setc,true);												// Iterate through each setting & set it in teh vendor-specific object
				}
				if(mapType==="variables" && typeof(setv)=="function") {			// Do actions for the "variables" map block
					set(setv,inLookupValue);									// Iterate through each variable definition and set it in the vendor-specific logic
				}
				if(mapType==="events" && typeof(sete)=="function") {			// Do actions for the "events" map block.
					set(sete,inLookupEventValue);								// Iterate thorugh each variable definition and set it using the vendor-specific logic
				};
				function inLookupEventValue(v) {
					var e=me.mdata.page.events,getChk=me.get(v),rval=null;
					if((e!=null&&e.contains(v))) {rval=v;}
					if(getChk!=null) {rval=getChk;}
					return rval;												 // Return the actual event value if it's defined.
				}
				function inLookupValue(v) {
					var rval=v,i,t;												// Setup values - rval is the return value, everthing else is temporary or iterator variabes
					rval=me.get(v);												// Get the value being looked up from the metadata getter function
					if(rval!=null&&typeof(rval)=="object") {					// See if it's an object
						if(!rval.join) {										// If it's an object, see if it supports join
							t=[];for (i in rval) {t.push(rval[i]);}				// If not, then proxy our own join function
							rval=t;
						}
						rval=rval.join(delim);									// Use join with whatever the default delimiter is to serialze the value
					}
					return rval;												// Return the looked-up metadata dictionary value
				};
			}
		};
	};
	CAnalyticsObject.prototype.send=function(mapObj) {
		this.map(mapObj);
		var action=this.config.vendor.action,l=action.length,args,f,vo;
		while(l--){
			vo=action[l][0];f=action[l][1];args=action[l][2];
			if(vo && vo[f].apply) {
				try {
					vo[f].apply(vo,args); // Send the vendor-specific analytics beacon or function
					if(vo._jsmd.destroy!=null) {vo._jsmd.destroy(vo); vo._jsmd=null;} // If a destructor function exists, do it and clear the setter list
				} catch(err){}
			}
		}
	};

	function prvSetCommonFunction(n,v,type) {
		var me=this,israw=(typeof(v)=="string"&&v.indexOf("raw:")==0?true:false);
		if(n.indexOf("raw:")==0) {n=n.substr(4); israw=true;}
		me.config.map.dirty=1;
		function inDefaultTransforms(v) {
			var plug=me.plugin,defF=plug.tF,rval=v;
			if(typeof(defF)=="object"){rval=defF.dosequential(plug,rval);}
			if(typeof(defF)=="function"){rval=defF.call(plug,rval);}
			return rval;
		}
		function inTranslatePluginValues(v) {
			var rval=null,plug=me.plugin,pA=v.split("|"),t=pA[0].split("raw:"),israw=(t.length>1?true:false),f;
			pA[0]=(!israw?pA[0]:t[1]);
			if(pA[1]&&pA[1].indexOf(",")!=-1) {t=pA.pop(); pA=pA.concat(t.split(","));}
			try {
				f=pA.splice(0,1)[0];
				if(typeof(plug[f])=="function") {
					plug.md=me;
					rval=plug[f].apply(plug,pA);
				}
			} catch(err) {}
			return rval;
		}
		n=(n.indexOf("m:")==0||n.indexOf("v:")==0?n.substr(2):n);
		if(n.indexOf("mb:")==0) {n="business."+this.get("business.name")+"."+n.substr(2);}
		var narray=n.split("."),nlast,i,vfinal,last=me.mdata,t1,z,are=/([^\[]+)\[(\d+)\]/;
		if(typeof(v)=="object") { vfinal=v;}
		if(typeof(v)=="function") { vfinal=v.call(me);}
		if(typeof(v)=="string") { vfinal=(v!=null&&v.indexOf!=null&&("gt".indexOf(v.substr(0,1))!=-1||v.indexOf("raw:")==0)&&v.indexOf("|")!=-1?inTranslatePluginValues(v):v) ;}
		vfinal=(!israw?inDefaultTransforms(vfinal):vfinal);
		type=(!type?"set":type);
		nlast=narray[narray.length-1];
		last=me.mdata; z=narray.length-1;
		for(i=0;i<z;i++) {
			t1=narray[i];a=are.exec(t1);
			if(a) {
				var a1=a[1],a2=a[2];
				if(!last[a1]) {last[a1]=[];}
				t1=a2; last=last[a1];
			}
			if(!last[t1]) {last[t1]={};}
			last=last[t1];
		}
		a=are.exec(nlast);
		if(!a) {
			if(type==="set") last[nlast]=vfinal;
			else {
				if(!(last[nlast]!=null&&typeof(last[nlast].push)=="function")) {last[nlast]=[];}
				last[nlast].push(vfinal);
			}
		} else {
			if(!last[a[1]]) last[a[1]]=[];
			last[a[1]][a[2]]=vfinal;
			return vfinal;
		}
		return last[nlast];
	};


	/* Modify Array objects to allow for iterative execution of values */
	Array.prototype.dosequential=function(o,val) {
		var rval=val,l=this.length;
		for (i=0;i<l;i++) {if(typeof(this[i])=="function"){rval=this[i].call(o,rval);}}
		return rval;
	};
	Array.prototype.forEach=Array.prototype.forEach||function(f,tObj){
		var l=this.length,i;if(typeof f=="function"){for(i=0;i<l;i++){if(i in this){f.call(tObj,this[i],i,this);}}};
	};
	Array.prototype.contains=Array.prototype.contains||function(obj){ var i=this.length; while(i--){if(this[i]===obj){return true;} } return false;};

	/**
	 *@function .bind
	 *Description: Binds the scope of any function call to the scope of the calling class, object or function. Once you use the .bind tag the scope can not be changed; if scope needs to change when function is called use .call() or .apply()
		Example:
			firstObject = {
				name: "First Object"
			}

			secondObject = {
				name: "Second Object",

			innerCall: function(value) {
				console.log(value + ", is in scope of" + this.name);
			}.bind(outerObject) // - bound to "outerObject" scope
			}

			innerObject.innerCall("This call");

			output:

			note: the output this.name is "First Object" not "Second Object".
	 *@param scope = the object that you want to keep in scope of.
	 */
	Function.prototype.bind = function(scope) {
	  var _function = this;

	  return function() {
	    return _function.apply(scope, arguments);
	  }
	}

	/* Last object available */
	var prvLastObject=null;
	function prvReturnLastObject(){return prvLastObject;}
	/* Public Module Functions */
	function publicInitialize(initObject, mapObject,vendorObject) {
		var io=_w._jsmdDefaultMetadataDictionaryTemplate||prvDefaultMetadataDictionaryTemplate,
			mo=_w._jsmdDefaultVendorMapTemplate||prvDefaultVendorMapTemplate,
			vo=_w._jsmdDefaultVendorSpecificTemplate||prvDefaultVendorSpecificTemplate;
		io=(!initObject?io:initObject);
		mo=(!mapObject?mo:mapObject);
		vo=(!vendorObject?vo:vendorObject);
		prvLastObject=new CAnalyticsObject(io,mo,vo);
		return prvLastObject;
	}
	/**
		@namespace Provides JavaScript object serialization support if not already defined.
	*/
	_w.JSON=_w.JSON||{
		/**
			@memberOf window.JSON
			@function
			Returns a string that is the serialized version of the JavaScript object passed as a parameter
			@param {Object} a reference to the object that will be serialized.
			@returns {String} A JSON compliant string representing the original object parameter.  Note that function type children within the object will not be serialized.
		*/
	stringify:function(a){var c=typeof a;if(c!="object"||a===null){if(c=="string")a='"'+a+'"';return String(a);}else{var d,b,f=[],e=a&&a.constructor==Array;for(d in a){b=a[d];c=typeof b;if(c=="string")b='"'+b+'"';else if(c=="object"&&b!==null)b=JSON.stringify(b);f.push((e?"":'"'+d+'":')+String(b));}return(e?"[":"{")+String(f)+(e?"]":"}");}},
		/**
			@memberOf window.JSON
			@function
			Creates a JavaScript object from a JSON string definition.
			@param {String} a A JSON-compliant string representing a valid JavaScript object.
			@returns {Object} A valid JavaScript object created from the JSON string passed in as a parameter.  Note that functions may be serialized using this method.
		*/
	parse:function(a){var p=null; if(a==="")a='""';try {eval("p="+a+";");} catch(err){};return p;}};
	function doImageBeaconGeneral(url,parameters) {
		for(p in parameters) {
			url = url.split("${"+p+"}").join(escape(parameters[p]));
		}
		url=url.split("${random}").join(_jsmd.getRandom());
		var isSSL=(window.location.protocol.toLowerCase().indexOf('https')!=-1);
		try {
			var beaconImage = new Image();
			beaconImage.src=(isSSL?url.split("http:").join("https:"):url);
		} catch (e){}
	}
	function _doOrAddLoad(f) {
		function _addLoadEvent(func) {
			if (window.addEventListener) // W3C standard
			{
			  window.addEventListener('load', func, false);
			}
			else if (window.attachEvent) // MS Browsers
			{
			  window.attachEvent('onload', func);
			}
			else {
				if(typeof(window.onload)=="function") {
				var old = window.onload;
				   window.onload = function()
				   {
				       old();
				       func();
				   };
				} else {
					window.onload=func;
				}
			}
		}
		if(document && document.getElementById
		             && document.getElementsByTagName
		             && document.body
		             && document.head) {
			try {f();} catch(e){}
		} else {
			_addLoadEvent(f);
		}
	}
	return {
		init:publicInitialize,
		JSMD:CAnalyticsObject,
		plugin:pubDefaultMetadataUtilities,
		last:prvReturnLastObject,
		getRandom:function(){return Math.floor(Math.random()*9999999999999999);},
		doImageBeacon:doImageBeaconGeneral,
		addOnLoad:_doOrAddLoad
	};
}();
function trackMetrics(action,data,mapObj,loaderFunction) {
	var realaction=action,realdata=data,realmap=mapObj,realload=loaderFunction;
	if(typeof(action)=="object") {
		if(action.type!=null) {realaction=action.type;}
		if(action.action!=null) {realaction=action.action;}
		if(action.data!=null) {realdata=action.data;}
		if(action.map!=null) {realmap=action.map;}
		if(action.load!=null) {realmap=action.load;}
	}
	if(typeof(realdata)=="object") {
		if(realdata.data!=null) {realdata=realdata.data;}
		if(realdata.map!=null) {realmap=realdata.map;}
		if(realdata.load!=null) {realload=realdata.load;}
	}
	if(typeof(realmap)=="object") {
		if(realmap.map!=null) {realmap=realmap.map;}
		if(realmap.load!=null) {realload=realmap.load;}
	}
	var defaultDynamicNS=_jsmd_default.dynamic;
	if(defaultDynamicNS!=null && typeof(defaultDynamicNS.load)=="function") {realload=defaultDynamicNS.load;}
	if(typeof(realload)=="function") {realload.call(this,realdata);}
	var tmpObj=_jsmd.init();
	tmpObj.trackMetrics(realaction,realdata,realmap);
};

/* CUSTOM LOGIC / EVENTS / FUNCTIONS */
/* declare global variable to store video start time */
if (!video_start_time) var video_start_time = 0;	//video start time - resets for every video progress call
if (!video_pause) var video_pause = [0,0];			//["flag","play time"]
if (!video_collection_created) var video_collection_created = false;	//flag used for checking the existence of the video collection object in video calls

/* video callback function */
function sendVideoEvent(data, event, id){
    try {
		var currVidObj = (typeof data != "string" ? data : _w.JSON.parse(data));
		trackMetrics({
			type: event,
			data: {
				instance: id,
				video: currVidObj
			}
		});
    } catch(e){}
}

function sendComscoreVideoMetrixBeacon(videoId,contentFlag) {
	_jsmd.doImageBeacon("http://b.scorecardresearch.com/p?c1=${c1}&c2=${c2}&c3=${c3}&c4=${c4}&c5=${c5}&rn=${random}", {
			c1:'1', 		// Video metrix tag identifier
			c2:'8586808', 	// Turner Specific Tag
			c3:'00004', 	// Report-suite numeric identifier for comparisons to Omniture
			c4:'8586811',	// SI Specific Tag
			c5:(contentFlag==1?'020000':'010000')
		}
	);
}
function sendNielsenVideoCensusBeacon(config,state,videoId,videoTitle,duration) {
	var url="http://secure-${sfcode}.imrworldwide.com/cgi-bin/m?ci=${clientid}&c6=${prod},${vcid}&cc=1&tl=${state}-${videoId}&rnd=${random}&cg=${videoTitle}",
		nVC=(!config?null:config["video-census"]);
	if(!nVC) {return;}
	switch(state) {
		case "start":
			nVC.state="dav0";
			nVC.videoId=videoId;
			nVC.videoTitle=videoTitle;
			_jsmd.doImageBeacon(url,nVC);
			break;
		case "complete":
			nVC.state="dav2";
			nVC.videoId=videoId;
			nVC.videoTitle=videoTitle;
			_jsmd.doImageBeacon(url,nVC);
			break;
	}
}

/* TRANSPORT / RAW FILES ONLY BELOW THIS LINE */
function trackComscoreVideoMetrixBeacon(config,videoId,contentFlag) {
	var configVals =(!config?null:config["video-metrix"]);
	if(!configVals) {return;}
	_jsmd.doImageBeacon("http://b.scorecardresearch.com/p?c1=${c1}&c2=${c2}&c3=${c3}&c4=${c4}&c5=${c5}&rn=${random}", {
			c1:configVals.c1,	// Video metrix tag identifier
			c2:configVals.c2, 	// Turner Specific Tag
			c3:configVals.c3, 	// Report-suite numeric identifier for comparisons to Omniture
			c4:configVals.c4,	// NCAA Specific Tag
			c5:(contentFlag==1?'020000':'010000')
		}
	);
}
/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s._c='s_c';s.wd=window;if(!s.wd.s_c_in){s.wd.s_c_il=new Array;s.wd.s_c_in=0;}s._il=s.wd.s_c_il;s._in=s.wd.s_c_in;s._il[s._in]=s;s.wd.s_c_in++;s"
+".an=s_an;s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return y};s.fl=function(x,l){return x?(''+x).substring(0,l):x};s.co=func"
+"tion(o){if(!o)return o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.indexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for(var p=0;p<x.length;p++)if(('0123456789').indexO"
+"f(x.substring(p,p+1))<0)return 0;return 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3)"
+"return encodeURIComponent(x);else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%"
+"16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}return y}else{x=s.rep(escape(''+x),'+','%2B');if(c&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if"
+"(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}}return x};s.epa=function(x){var s=this;if(x){x=''+x;return s.em==3?de"
+"codeURIComponent(x):unescape(s.rep(x,'+',' '))}return x};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z+=y+d.l"
+"ength;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.f"
+"sf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.si=function(){var s=this,i,k,v,c="
+"s_gi+'var s=s_gi(\"'+s.oun+'\");s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=undefined){if(typeof(v)=='string')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}"
+"c+=\"s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var"
+" s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('"
+".',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s."
+"epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NON"
+"E'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()"
+"+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i]."
+"o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv"
+">=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,"
+"'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s"
+".t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs="
+"p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,"
+"l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,0,r.t,r.u)}};s.br=function(id,rs){var s=this;if(s.disableBufferedRequests||!s.c_w('s_br',rs))s.brl=rs};s.flushBufferedReques"
+"ts=function(){this.fbr(0)};s.fbr=function(id){var s=this,br=s.c_r('s_br');if(!br)br=s.brl;if(br){if(!s.disableBufferedRequests)s.c_w('s_br','');s.mr(0,0,br)}s.brl=0};s.mr=function(sess,q,rs,id,ta,u"
+"){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+(un),im,b,e;if(!rs){if"
+"(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s"
+".ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/H.22.1/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(rs,2047);if(id){s.br(id,rs);return}}if(s.d.images&&s.apv>=3"
+"&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+']."
+"mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im.s_l=0;im.onload=new Function('e',"
+"'this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;im.src=rs;if((!ta||ta=='_self'||ta="
+"='_top'||(s.wd.name&&ta==s.wd.name))&&rs.indexOf('&pe=')>=0){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0"
+" alt=\"\">'};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl="
+"function(v){var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,l,a,b='',c='',t;if(x){y=''+x;i=y.indexOf('?');if(i>0){a=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCase()"
+";i=0;if(h.substring(0,7)=='http://')i+=7;else if(h.substring(0,8)=='https://')i+=8;h=h.substring(i);i=h.indexOf(\"/\");if(i>0){h=h.substring(0,i);if(h.indexOf('google')>=0){a=s.sp(a,'&');if(a.lengt"
+"h>1){l=',q,ie,start,search_key,word,kw,cd,';for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c){y+='?'+b+'&'"
+"+c;if(''+x!=y)x=y}}}}}}return x};s.hav=function(){var s=this,qs='',fv=s.linkTrackVars,fe=s.linkTrackEvents,mn,i;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].tr"
+"ackVars;fe=s[mn].trackEvents}}fv=fv?fv+','+s.vl_l+','+s.vl_l2:'';for(i=0;i<s.va_t.length;i++){var k=s.va_t[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(v&&k!='linkName'&&k!='l"
+"inkType'){if(s.pe||s.lnk||s.eo){if(fv&&(','+fv+',').indexOf(','+k+',')<0)v='';if(k=='events'&&fe)v=s.fs(v,fe)}if(v){if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='pa"
+"geURL'){q='g';v=s.fl(v,255)}else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigra"
+"tionServerSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em="
+"=2||s.em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode"
+"')q='cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j"
+"';else if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp'"
+";else if(k=='plugins')q='p';else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+q+'='+(k.substring(0,3)"
+"!='pev'?s.ape(v):v)}}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('?');h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t"
+")return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExt"
+"ernalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.substring(0,1)"
+"!='#'&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=s.co(this);s.t"
+"();s.lnk=0;if(b)return this[b](e);return true');s.bc=new Function('e','var s=s_c_il['+s._in+'],f,tcf;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;s.eo=e.srcElement?e.srcElement:e.target;tcf=new Functi"
+"on(\"s\",\"var e;try{if(s.eo&&(s.eo.tagName||s.eo.parentElement||s.eo.parentNode))s.t()}catch(e){}\");tcf(s);s.eo=0');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.inde"
+"xOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'"
+"')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagName;t=t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE'"
+")t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p"
+"=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' '"
+",'');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100"
+");o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')>=0){if(u!=s.un&&"
+"s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,'"
+",','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this;s.squ[u"
+"n]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Ob"
+"ject.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq"
+"[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o"
+".onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s.apv>3&&(!s.isie|"
+"|!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener)s.b.addEventListener('click',s.bc,false);else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=func"
+"tion(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e)"
+")return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.subst"
+"ring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowe"
+"rCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};"
+"s.sa=function(un){var s=this;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_"
+"l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Ar"
+"ray('_c','_in','_il','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.le"
+"ngth;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0"
+";if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf("
+"\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl."
+"length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexO"
+"f('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadMo"
+"dule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else "
+"g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],"
+"o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!"
+"o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javas"
+"cript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,"
+"f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.vo1=function(t,a){if(a[t]"
+"||a['!'+t])this[t]=a[t]};s.vo2=function(t,a){if(!a[t]){a[t]=this[t];if(!a[t])a['!'+t]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.d"
+"ll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.d"
+"l=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.pt(s.vl_g,',','vo2',vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s.t=fun"
+"ction(vo,id){var s=this,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate("
+")+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',vb=new Objec"
+"t;s.gl(s.vl_g);s.uns();s.m_ll();if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1'"
+";if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try"
+"{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next)j='1.7'}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){c="
+"screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElement.offsetWid"
+"th;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}return hp');hp="
+"tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30){ps=s.f"
+"l(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.connectionType=c"
+"t;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.pt(s.vl_g,',','vo2',vb);s.pt(s.vl_g,',','vo1',vo)}if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);var l=s.wd.location,r=tfs.document.referrer"
+";if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk;if(!o)return '';var p=s.pageName,w=1,t=s.ot(o)"
+",n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(!o)return '';t=s.ot(o);n=s.oid(o);x=o.s_oidt}oc=o.onclick?''+o.onclick:''"
+";if((oc.indexOf(\"s_gs(\")>=0&&oc.indexOf(\".s_oc(\")<0)||oc.indexOf(\".tl(\")>=0)return ''}if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName"
+";t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l))q+='&pe=lnk_'+(t=='d'||t=='e'?s.ape(t):'o')+(h?'&pev1='+s.ape(h):'')+(l?'&pev2='+s.ape(l):'');else trk=0;if(s.trackInlineStats){if(!p){p="
+"s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot="
+"'+s.ape(t)+(i?'&oi='+i:'')}}if(!trk&&!qs)return '';s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,id,ta);qs='';s.m_m('t');if(s.p_r)s.p_r("
+");s.referrer=''}s.sq(qs);}else{s.dl(vo);}if(vo)s.pt(s.vl_g,',','vo1',vb);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_link"
+"Name=s.wd.s_linkType='';if(!id&&!s.tc){s.tc=1;s.flushBufferedRequests()}return code};s.tl=function(o,t,n,vo){var s=this;s.lnk=s.co(o);s.linkType=t;s.linkName=n;s.t(vo)};if(pg){s.wd.s_co=function(o)"
+"{var s=s_gi(\"_\",1,1);return s.co(o)};s.wd.s_gs=function(un){var s=s_gi(un,1,1);return s.t()};s.wd.s_dc=function(un){var s=s_gi(un,1);return s.t()}}s.ssl=(s.wd.location.protocol.toLowerCase().inde"
+"xOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var ap"
+"n=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isope"
+"ra=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv="
+"parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=="
+"'%U0100'?1:0))}s.sa(un);s.vl_l='dynamicVariablePrefix,visitorID,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServerSecure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLi"
+"fetime,pageName,pageURL,referrer,currencyCode';s.va_l=s.sp(s.vl_l,',');s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,products,linkName,"
+"linkType';for(var n=1;n<76;n++)s.vl_t+=',prop'+n+',eVar'+n+',hier'+n+',list'+n;s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browse"
+"rHeight,connectionType,homepage,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests"
+",mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadF"
+"ileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,_1_referrer';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);if(!ss)s.wds()",
w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,s;if(un){un=un.toLowerCase();if(l)for(i=0;i<l.length;i++){s=l[i];if(!s._c||s._c=='s_c'){if(s.oun==un)return s;else if(s.fs&&s.sa&&s.fs(s.oun,un)){s.sa(un);return s}}}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
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
c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a>=5&&v.indexOf('Opera')<0&&u.indexOf('Opera')<0){w.s_c=new Function("un","pg","ss","var s=this;"+c);return new s_c(un,pg,ss)}else s=new Function("un","pg","ss","var s=new Object;"+s_ft(c)+";return s");return s(un,pg,ss)}
function trackNielsenVideoCensusBeacon(config,state,videoId,videoTitle,duration) {
	var url="http://secure-${sfcode}.imrworldwide.com/cgi-bin/m?ci=${clientid}&c6=${prod},${vcid}&cc=1&tl=${state}-${videoId}&rnd=${random}&cg=${videoTitle}",
		nVC=(!config?null:config["video-census"]);
	if(!nVC) {return;}
	switch(state) {
		case "start":
			nVC.state="dav0";
			break;
		case "complete":
			nVC.state="dav2";
			break;
	}
	nVC.videoId=videoId;
	nVC.videoTitle=videoTitle;
	_jsmd.doImageBeacon(url,nVC);
}
/*  Nielsen Online SiteCensus V6.0 */

var NielsenHybridTag=function(){
	function doNielsen(a) {
	    var d = new Image(1, 1);
	    d.onerror = d.onload = function () {
	      d.onerror = d.onload = null;
	    };
	    d.src = ["//secure-us.imrworldwide.com/cgi-bin/m?ci=", escape(a), "&cg=0&cc=1&si=", escape(window.location.href), "&rp=", escape(document.referrer), "&ts=compact&rnd=", (new Date()).getTime()].join('');
  }
  return { push_nielsen:doNielsen };
}();

/* END Nielsen Online SiteCensus V6.0 */