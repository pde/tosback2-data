var _w=window;// Shorthand notation for window reference
var _jsmd_default={
	version: "cartoon.213.2661.20130225",
	release: "0",
	dictionary: {
		init: {
			/* ADBP Standards */

			"business.name":					"ctn",					//pageName
			"business.lob":						"ayakm",				//hier1
			"business.brand":					"cartoon network",		//hier1
			"business.friendly_name":			"cartoon network",		//prop30,eVar30,hier1
			"page.clean_url":					"raw:gADBPURL|",		//prop26
			"page.template_type":				"gJObj|cnt_metadata,page_template_type",	//prop32,eVar32
			"page.content_type":				"raw:gADBPContentType|adbp:none",			//prop33,eVar33
			"page.domain":						"raw:gADBPURL|domain",	//server,eVar29
			"page.franchise":					"raw:gJObj|cnt_metadata,franchise_partner",	//prop31,eVar31
			"page.name":						"raw:gADBPPageName|",	//pageName,eVar26
			"page.site_section":				"raw:gADBPURL|hier",	//prop41,eVar44,prop42,eVar45 - url hierarchy
			"page.transaction_id":				(_w.cnnad_transactionID?_w.cnnad_transactionID+"":""),	//prop46,eVar46 - Transaction ID
			"promo.internal.id":				"gQuery|iid",			//eVar43
			"promo.internal.implied":			"",						//eVar48
			"promo.external.id":				"gQueryOnce|s_cid,ffmcd,sr",	//campaign
			"search.internal.keyword":			"gQuery|keywords",		//prop39,eVar39
			"search.internal.number_results":	"",						//prop27
			"user.authenticated":				"gCNTAuth|",			//prop34,eVar34
			"video.id":							"",						//eVar42
			"video.products":					"",						//products
			"video.title":						"",						//prop29,eVar41
			"video.players":					[],						//video player array object
			nielsen: {
				"video-census": {
					clientid: "us-100120",
					vcid: "b02",
					prod: "vc",
					sfcode: "us"
				}
			},
			/* TVE Definitions */
			"tve.brand":					"cartoonnetwork",//prop1,eVar1
			"tve.syndication_channel":	    "tve",//prop4,eVar4
			"tve.player_location":			"onsite",//prop11,eVar11
			"tve.video.progress":	"0",
			"tve.page.full_url":			window.location.href,//prop21
			"tve.dev_string":				"gTVEDevString|",//used in rsid
			"tve.promo.external.id":		"gQueryOnce|o_cid"//campaign


			,
			/* ADBP Recommended Standards */

			"ignore":							""						// This can be removed once other recommended standards are defined.  Simply copy & replace

			,
			/* Business-Specific Standards */

			"business.cnt.globalnav":			"gQuery|atclk_gn",		//prop1,eVar1 - use query string
			"business.cnt.pagename":			"raw:gCNTPageName|",	//prop2,eVar2 - use the current code for prop2, use s.pageName
			"business.cnt.game.ingame_title":	"",						//prop3,eVar3 - set with custom tracking from game specific calls
			"business.cnt.game.detail":			"",						//prop4,eVar4 - passed from custom tracking
			"business.cnt.promo":				"gCNTPromo|",			//prop5,eVar5 - set on custom tracking
			"business.cnt.game.tko":			"",						//prop6,eVar6 - passed from custom tracking
			"business.cnt.game.creator":		"",						//prop7,eVar7 - passed from custom tracking
			"business.cnt.event_interaction":	"",						//prop8,eVar8 - passed from custom tracking
			"business.cnt.formula.track_title":	"",						//prop9,eVar9 - set with custom tracking from the formula cartoon game
			"business.cnt.game.mixit":			"",						//prop10,eVar10 - passed from custom tracking
			"business.cnt.super_franchise":		"gJObj|cnt_metadata,super_franchise",	//prop11,eVar11
			"business.cnt.video.type":			"",						//prop12,eVar12 - passed from custom tracking
			"business.cnt.video.segment":		"",						//prop13,eVar13 - passed from custom tracking
			"business.cnt.attribution":			"gQueryOnce|atclk_hp,atclk_gp",			//prop14,eVar14 - use query string
			"business.cnt.game.user_type":		"",						//prop15,eVar15 - set with custom tracking from game specific calls
			"business.cnt.achievement":			"",						//prop16,eVar16
			"business.cnt.logreg":				"",						//prop17,eVar17
			"business.cnt.promo_button":		"",						//prop18,eVar18 - promo button click
			"business.cnt.hp_perc_view":		"",						//prop19,eVar19
			"business.cnt.hp_prev_page":		"",						//prop20,eVar20
			"business.cnt.game.title":			"gJObj|cnt_metadata,game_title",		//prop21,eVar21 - passed from custom tracking
			"business.cnt.game.type":			"gJObj|cnt_metadata,game_type",			//prop22,eVar22 - passed from custom tracking
			"business.cnt.page.section[0]": 	"gJObj|cnt_metadata,page_channel",		//channel,eVar27
			"business.cnt.page.section[1]": 	"gJObj|cnt_metadata,page_subchannel"	//prop28,eVar28

			,
			/* Pre-Metadata Collection Routines */
			preinit: function() {


			},
			/* Post-Metadata Translation Routines */
			postinit: function() {

				/* business.cnt.hp_perc_view: prop19,eVar19 - percentage of the previous page that the user viewed */
				/* business.cnt.hp_prev_page: prop20,eVar20 - captures the value on the next page view */
				/* capture the previous page name and assign value to cookie "cnprevpage_pn" */
				var s = this.plugin.vendor.Adobe.plugins();
				var pName = this.get("page.name");
				var prevP = s.getPreviousValue(pName,"cnprevpage_pn");
				if (prevP){
					this.set("business.cnt.hp_prev_page",prevP);	//prop20,eVar20
					this.set("business.cnt.hp_perc_view",s.getPercentPageViewed());	//prop19,eVar19
				}

				/* search.internal.keyword - prop39,eVar39 */
				/* search.internal.number_results - prop27 */
				/* suppress default search term */
				var searchTerm = this.get("search.internal.keyword");
				if (searchTerm && searchTerm == "%20SEARCH") {
					this.set("search.internal.keyword","");			//prop39,eVar39
					this.set("search.internal.number_results","");	//prop27
				}

				/* business.cnt.game.fflaunch - event5 */
				if (_w.location.pathname == "/play/intro.php") this.push("page.events","business.cnt.game.fflaunch");

				/* business.cnt.game.ffintro - event7 */
				if (_w.location.pathname == "/splashpage.php") this.push("page.events","business.cnt.game.ffintro");

			}
		}
	},
	map: {

		"cnt_main": {
			vendors: [
				{
					name:			"Adobe SiteCatalyst H-code",
					account:		"cnt",
					settings:		["cnt"],
					variablemap:	["cnt","adbp"],
					eventmap:		["cnt","adbp"],
					dynamic_actions: {
						"cnt-search": {
							variablemap:	["cnt","adbp"],
							eventmap:		["cnt","adbp"]
						},
						"cnt-allshow": {
							variablemap:	["cnt","adbp-game"],
							eventmap:		["cnt","adbp-game"]
						},
						"cnt-aspace": {
							variablemap:	["cnt","adbp-game"],
							eventmap:		["cnt","adbp-game"]
						},
						"cnt-game": {
							variablemap:	["cnt","adbp-game"],
							eventmap:		["cnt","adbp-game"]
						},
						"cnt-game-achievements": {
							variablemap:	["cnt","adbp"],
							eventmap:		["cnt","adbp"]
						},
						"video": {
							variablemap:	["cnt","adbp-video"],
							eventmap:		["cnt","adbp-video"]
						},
						"tve": 				{
							variablemap:	["tve"],
							eventmap:		["tve"]
						 },
						"cnt-social": 				{
							variablemap:	["cnt","adbp"],
							eventmap:		["cnt","adbp"]
						 }

					},
					prevendor:		function() { },
					postvendor:		function() { }
				},
				{
					name: 			"Nielsen Hybrid Light Code",
					account:		"standard_nielsen",
					dynamic_actions: {
						"cnt-search":		{ ignore: false },
						"cnt-allshow":		{ ignore: true },
						"cnt-aspace":		{ ignore: true },
						"cnt-game":			{ ignore: true },
						"cnt-game-achievements":	{ ignore: false },
						"video":			{ ignore: true },
						"cnt-interaction":	{ ignore: true },
						"kalydo-plugin":	{ ignore: true },
						"formula-cartoon":	{ ignore: true },
						"ingame-progress":	{ ignore: true },
						"cnt-login":		{ ignore: true },
						"cnt-gnav":			{ ignore: true },
						"promo-link":		{ ignore: true }
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
			cnt: {
				filters: {
					"cnt-social":						{ include: ["cnt.achievement"] },
					"flash-link":						{ include: ["video.","content_type","link."] },
					"video-preroll":					{ include: ["business.cnt.super_franchise","video.type","video.segment","page.section"] },
					"video-start":						{ include: ["business.cnt.super_franchise","video.type","video.segment","page.section","video.episode_start"] },
					"video-autostart":					{ include: ["business.cnt.super_franchise","video.type","video.segment","page.section","video.episode_start"] },
					"video-complete":					{ include: ["business.cnt.super_franchise","video.type","video.segment","page.section"] },
					"mixit-video-start":				{ include: ["business.cnt.super_franchise","video.type","video.segment","page.section","video.episode_start"] },
					"mixit-video-complete":				{ include: ["business.cnt.super_franchise","video.type","video.segment","page.section"] },
					"promo-link":						{ include: ["business.cnt.promo","business.cnt.promo_button"] }
				},
				account: function() {
					var hostName = _w.location.hostname, path = _w.location.pathname;
					var reportID = {
						/*
						"staging.cartoonnetwork.com":				"carnetnmtest",
						"redesign.cartoonnetwork.com":				"carnetnmtest",
						"gcstage.cartoonnetwork.com":				"carnetnmtest",
						"bgcstage.cartoonnetwork.com":				"carnetnmtest",
						"swgcstage.cartoonnetwork.com":				"carnetnmtest",
						"nbakidsp1dev1.turner.com":					"carnetnmtest",
						*/
						"www.cartoonnetwork.com":					"carnetnmprod",
						"cartoonnetwork.com":						"carnetnmprod",
						"blog.cartoonnetwork.com":					"carnetnmprod",
						"fusionfall.cartoonnetwork.com":			"carnetnmprod",
						"gamecreator.cartoonnetwork.com":			"carnetnmprod",		//redirect
						"ben10gamecreator.cartoonnetwork.com":		"carnetnmprod",
						"batmangamecreator.cartoonnetwork.com":		"carnetnmprod",
						"starwarsgamecreator.cartoonnetwork.com":	"carnetnmprod",
						"theclonewars.cartoonnetwork.com":			"carnetnmprod",		//redirect
						"mixit.cartoonnetwork.com":					"carnetnmprod",
						"forums.cartoonnetwork.com":				"carnetnmprod",		//redirect
						"totaldramacontest.cartoonnetwork.com":		"carnetnmprod",		//dead
						"nbahooptroop.com":							"carnetnmprod",
						"www.nbahooptroop.com":						"carnetnmprod"
					} [hostName];
					if(!reportID) reportID = "carnetnmtest";
					if (hostName.indexOf("www.cartoonnetwork.com") != -1) {
						if (path.indexOf("fb_gamecreator") != -1) {
							reportID = "carnetnmsocial";
						}
					}
					return reportID;
				},
				settings: {
					"trackDownloadLinks":				true,
					"trackExternalLinks":				true,
					"trackInlineStats":					true,
					"linkDownloadFileTypes":			"exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,xls,m4r",
					"linkInternalFilters":				"javascript:,cartoon,nbahooptroop",
					"linkLeaveQueryString":				false,
					"trackingServer":					"stats.cartoonnetwork.com",
					"trackingServerSecure":				"sstats.cartoonnetwork.com",
					"visitorNamespace":					"cartoonnetworknewmedia",
					"charSet":							"ISO8859-1",
					"currencyCode":						"USD"
				},
				variablemap: {
					"business.cnt.globalnav":			["prop1","eVar1"],
					"business.cnt.pagename":			["prop2","eVar2"],
					"business.cnt.game.ingame_title":	["prop3","eVar3"],
					"business.cnt.game.detail":			["prop4","eVar4"],
					"business.cnt.promo":				["prop5","eVar5"],
					"business.cnt.game.tko":			["prop6","eVar6"],
					"business.cnt.game.creator":		["prop7","eVar7"],
					"business.cnt.event_interaction":	["prop8","eVar8"],
					"business.cnt.formula.track_title":	["prop9","eVar9"],
					"business.cnt.game.mixit":			["prop10","eVar10"],
					"business.cnt.super_franchise":		["prop11","eVar11"],
					"business.cnt.video.type":			["prop12","eVar12"],
					"business.cnt.video.segment":		["prop13","eVar13"],
					"business.cnt.attribution":			["prop14","eVar14"],
					"business.cnt.game.user_type":		["prop15","eVar15"],
					"business.cnt.achievement":			["prop16","eVar16"],
					"business.cnt.logreg":				["prop17","eVar17"],
					"business.cnt.promo_button":		["prop18","eVar18"],
					"business.cnt.hp_perc_view":		["prop19","eVar19"],
					"business.cnt.hp_prev_page":		["prop20","eVar20"],
					"business.cnt.game.title":			["prop21","eVar21"],
					"business.cnt.game.type":			["prop22","eVar22"],
					"business.cnt.page.section[0]":		["channel","eVar27"],
					"business.cnt.page.section[1]":		["prop28","eVar28"],
					"video.products":					["products"],
					"business.lob|business.brand|business.friendly_name|page.domain|business.cnt.page.section[0]|business.cnt.page.section[1]":	["hier1"],
					"delimiter":						"|"
				},
				eventmap: {
					"business.cnt.game.unity_installed":["event1"],		//unity Player Installed
					"business.cnt.game.play":			["event2"],		//game play
					"business.cnt.game.replay":			["event3"],		//game replay - ??
					"video.episode_start":				["event4"],		//episode video start, on first segment of episode only
					"business.cnt.game.fflaunch":		["event5"],		//fusionfall game launch
					"business.cnt.game.unity_not_installed":	["event6"],	//unity player not installed
					"business.cnt.game.ffintro":		["event7"],		//fusionfall intro movie, only on splash page
					"business.cnt.game.unity_download":	["event8"],		//unity player download
					"business.cnt.kalydo.install": 		["event9"],		//installation of Kalydo completed
					"business.cnt.game.download_start":	["event10"],	//game download started
					"business.cnt.game.download_complete":		["event11"], //game download completed
					"business.cnt.game.session_start":	["event12"],	//game session start
					"business.cnt.game.race_play":		["event13"],	//race started
					"business.cnt.game.time_spent":		["event14"],	//time spent for game session
					"business.cnt.game.init":		["event15"],	//game init
					"business.cnt.game.start":		["event16"],	//game start
					"business.cnt.epic.game.time_spent":["event17"],	//time spent for epic game session
					"business.cnt.promo_button":		["event18"]		//for promo pages
				},
				premap: function() { },
				postmap: function() {
					/* restrict kalydo plugin to send only events */
					if(this.config.map.isDynamic != null && this.config.map.isDynamic.indexOf("kalydo-plugin") > -1){
						this.v.linkTrackVars = "events,prop35,prop46,eVar46,prop47,eVar47";
					}
					/* modify variables for in-game tracking */
					if(this.config.map.isDynamic != null && this.config.map.isDynamic.indexOf("formula-cartoon") > -1){
						var linkname = this.mdata.link.name;
						if(linkname.indexOf("general game start") > -1){
							this.v.eVar3 = this.v.prop3; this.v.prop3 = "";
							this.v.linkTrackVars = "events,eVar3,prop35,prop46,eVar46,prop47,eVar47";
						} else if(linkname.indexOf("formula download start") > -1){
							this.v.eVar3 = this.v.prop3; this.v.prop3 = "";
							this.v.linkTrackVars = "events,eVar3,prop35,prop46,eVar46,prop47,eVar47";
						} else if(linkname.indexOf("formula download complete") > -1){
							this.v.eVar3 = this.v.prop3; this.v.prop3 = "";
							this.v.linkTrackVars = "events,eVar3,prop35,prop46,eVar46,prop47,eVar47";
						} else if(linkname.indexOf("formula start avatar creation") > -1){
							this.v.linkTrackVars = "events,prop3,prop15,eVar3,eVar15,prop35,prop46,eVar46,prop47,eVar47";
						} else if(linkname.indexOf("formula race start new") > -1){
							this.v.eVar3 = this.v.prop3; this.v.prop3 = "";
							this.v.eVar15 = this.v.prop15; this.v.prop15 = "";
							this.v.linkTrackVars = "events,prop9,eVar3,eVar9,eVar15,prop35,prop46,eVar46,prop47,eVar47";
						} else if(linkname.indexOf("formula race start repeat") > -1){
							this.v.linkTrackVars = "events,prop3,prop9,prop15,eVar3,eVar9,eVar15,prop35,prop46,eVar46,prop47,eVar47";
						}
					}
				    /* modify time spent for in-game tracking */
				    var igt = (this.get("business.cnt.game.ingame_title") != "" ? this.get("business.cnt.game.ingame_title") : "");
				    var gts = (this.get("business.cnt.game.time_spent") != "" ? this.get("business.cnt.game.time_spent") : "");
				    if(this.config.map.isDynamic != null && this.config.map.isDynamic.indexOf("ingame-progress") > -1){
					   if (_w.location.href.indexOf("formula-cartoon") != -1)
						{
					      this.v.products = ";"+igt+";;;event14="+gts;
						this.v.eVar3 = this.v.prop3; this.v.prop3 = "";
						this.v.eVar15 = this.v.prop15; this.v.prop15 = "";
						this.v.linkTrackVars = "events,products,eVar3,eVar15,prop35,prop46,eVar46,prop47,eVar47";
						}
						else if(_w.location.href.indexOf("dragons") != -1 ||_w.location.href.indexOf("ben10gamecreator") != -1 || _w.location.href.indexOf("exonaut") != -1 || _w.location.href.indexOf("splashback") != -1)
						{
				   		 var igt = (this.get("business.cnt.game.title") != "" ? this.get("business.cnt.game.title") : "");
				    		 var gts = (this.get("business.cnt.epic.game.time_spent") != "" ? this.get("business.cnt.epic.game.time_spent") : "");
						 this.v.products = ";"+igt+";;;event17="+gts;
						 this.v.linkTrackVars = "events,products,prop21,eVar21,prop35";
						}

				    }

					/* disable download tracking to force triggering dynamic action instead */
					if (_w.location.hostname.indexOf("fusionfall") != -1 && _w.location.pathname.indexOf("/play/main.php") != -1) {
						this.v.trackDownloadLinks = false;
						this.v.linkDownloadFileTypes = "";
					}

					/* for error page, set pageType */
					var pageTemplateType = this.get("page.template_type");
					if (pageTemplateType && pageTemplateType == "adbp:error") this.v.pageType = "errorPage";

					if ((this.config.map.isDynamic != null) && (typeof(this.config.map.isDynamic) === "string") && (this.config.map.isDynamic.indexOf("tve-") == -1)) {
						/* remove props from custom tracking */
						var d = this.config.map.isDynamic;
						if (d.indexOf("cnt-") != -1 && d.indexOf("cnt-search") == -1 && d.indexOf("cnt-game-achievements") == -1) {
							if(d.indexOf("interaction") > -1){
								this.v.linkTrackVars = "prop8,eVar8,eVar26";
							} else if(d.indexOf("gnav") > -1){
								this.v.linkTrackVars = "prop1,eVar1";
							} else if(d.indexOf("login") > -1){
								this.v.pageName = this.v.server = this.v.channel = this.v.hier1 = "";
								this.v.prop2 = this.v.prop19 = this.v.prop20 = this.v.prop26 = this.v.prop28 = this.v.prop30 = this.v.prop32 = this.v.prop33 = this.v.prop34 = this.v.prop35 = this.v.prop41 = this.v.prop42 = this.v.prop46 = "";
								this.v.eVar2 = this.v.eVar19 = this.v.eVar20 = this.v.eVar26 = this.v.eVar27 = this.v.eVar28 = this.v.eVar29 = this.v.eVar30 = this.v.eVar32 = this.v.eVar33 = this.v.eVar34 = this.v.eVar44 = this.v.eVar45 = this.v.eVar46 = "";
								var linkname = this.mdata.link.name;
								if(linkname.indexOf("cnt-login: registration") > -1){
									this.v.events = "event28";
								}else if(linkname.indexOf("cnt-login: login") > -1){
									this.v.events = "event37";
								}
								this.v.linkTrackVars = "events,prop17,eVar17";
							} else {
								this.v.eVar27 = this.v.channel; this.v.channel = "";
								this.v.eVar28 = this.v.prop28; this.v.prop28 = "";
								this.v.hier1 = "";
								this.v.eVar2 = this.v.prop2; this.v.prop2 = "";
								if (d.indexOf("social") != -1) { /* Added 12/05/2011 */
									this.v.eVar16 = "";
								}else{
									this.v.eVar16 = this.v.prop16; this.v.prop16 = "";
								}
								this.v.prop19 = "";
								this.v.prop20 = "";
							};
						}
						if (d.indexOf("mixit-page") != -1 || d.indexOf("mixit-flash") != -1) {
							this.v.eVar27 = this.v.channel; this.v.channel = "";
							this.v.eVar28 = this.v.prop28; this.v.prop28 = "";
							this.v.hier1 = "";
							this.v.eVar2 = this.v.prop2; this.v.prop2 = "";
							this.v.eVar16 = this.v.prop16; this.v.prop16 = "";
							this.v.prop19 = "";
							this.v.prop20 = "";
							this.v.prop30 = "";this.v.eVar30 = this.v.prop30;
							this.v.prop32 = "";this.v.eVar32 = this.v.prop32;
							this.v.prop33 = "";this.v.eVar33 = this.v.prop33;
							this.v.prop34 = "";this.v.eVar34 = this.v.prop34;
							this.v.prop41 = "";this.v.eVar41 = this.v.prop41;
							this.v.prop42 = "";this.v.eVar42 = this.v.prop42;
							this.v.prop46 = "";this.v.eVar46 = this.v.prop46;
							this.v.events = "";
						}
						/* remove props from video tracking */

						if (d.indexOf("video-") != -1 || d.indexOf("mixit-video") != -1) {
							this.v.eVar27 = this.v.channel; this.v.channel = "";
							this.v.eVar28 = this.v.prop28; this.v.prop28 = "";
							this.v.hier1 = "";
							this.v.eVar19 = ""; this.v.prop19 = "";
							this.v.eVar20 = ""; this.v.prop20 = "";
							if (d.indexOf("complete") != -1 || d.indexOf("mixit-video-complete") != -1) {
								this.v.eVar11 = this.v.prop11; this.v.prop11 = "";
								this.v.eVar12 = this.v.prop12; this.v.prop12 = "";
								this.v.eVar13 = this.v.prop13; this.v.prop13 = "";
								this.v.eVar41 = this.v.prop29; this.v.prop29 = "";
								this.v.eVar33 = this.v.prop33; this.v.prop33 = "";
							} else if (d.indexOf("preroll") != -1) {
								this.v.eVar11 = this.v.prop11; this.v.prop11 = "";
								this.v.eVar12 = this.v.prop12; this.v.prop12 = "";
								this.v.eVar13 = this.v.prop13; this.v.prop13 = "";
								this.v.eVar41 = this.v.prop29; this.v.prop29 = "";
								this.v.eVar31 = this.v.prop31; this.v.prop31 = "";
								this.v.eVar33 = this.v.prop33; this.v.prop33 = "";
							}
						}
						/* remove promo prop from promo custom link tracking */
						if (d.indexOf("promo-link") != -1) {
							this.v.eVar5 = this.v.prop5; this.v.prop5 = "";
						}
					} else {
						/* prop19/eVar19 - user "zero" instead of "0" */
						if (this.v.prop19 == 0) this.v.prop19 = "zero";
						/* prop20/eVar20 - set "entry page" on entry pages */
						if (!this.v.prop20) this.v.prop20 = "entry page";
					}

					/* only send prop2 on redirect pages */
					if (_w.location.pathname.indexOf("/redirects/") != -1) {
						this.v.prop19 = ""; this.v.prop20 = ""; this.v.prop26 = ""; this.v.prop28 = "";
						this.v.prop30 = ""; this.v.prop32 = ""; this.v.prop33 = ""; this.v.prop34 = "";
						this.v.prop41 = ""; this.v.prop42 = ""; this.v.channel = ""; this.v.events = "";
						this.v.hier1 = ""; this.v.pageName = ""; this.v.eVar29 = "";
					}
					if (_w.location.pathname.indexOf("/fb/index.html") != -1) {
						this.v.prop19 = ""; this.v.prop20 = ""; this.v.prop26 = ""; this.v.prop28 = "";
						this.v.prop30 = ""; this.v.prop32 = ""; this.v.prop33 = ""; this.v.prop34 = "";
						this.v.prop41 = ""; this.v.prop42 = ""; this.v.channel = ""; this.v.events = "";
						this.v.hier1 = ""; this.v.pageName = ""; this.v.eVar29 = "";
					}

					/* Dynamic Omniture variable set or overrides */
					var i,p=this.v.products;
					var sc = this.get("business.vendor.sitecatalyst");
					if(sc!="" && sc!=null) {
						var unl = this.v._jsmd.unset_list;
						for(i in sc) {
							var vl = ''+i;
							if(vl!=='events'&&vl!=='products') {
								if(vl.toLowerCase().indexOf('prop') != -1 || vl.indexOf('eVar') != -1 ){
									this.v[i] = sc[i]; // Iterate through and add set specific variable values
									try { unl.push(([i]+'')); }catch(e){} // added props or eVar to unset_list for deletion
								}
							} else if (vl.toLowerCase()==='events'||vl.toLowerCase()==='products'){
								var scv = sc[i];
								if(vl.toLowerCase()==='events') {
									var evt = this.v.events;
									this.v.events=(evt!=null&&evt.length>0?evt+","+scv:scv);
								}
								if(vl.toLowerCase()==='products') {
								}
							}
						}

						try{
						if(sc.linkTrackVars) {
					 			var stg = sc.linkTrackVars+"";
			            		stg = stg.replace(/evar/gi, "eVar");
			            		stg = stg.replace(/pagename/gi, "pageName");
			            		this.v.linkTrackVars = stg;
						}

						if(sc.linkTrackEvents) {
								this.v.linkTrackEvents = sc.linkTrackEvents
						}

						if(sc.account){
			            		this.v.fun = this.v.oun = this.v.un = sc.account;
			            }

						if(sc.channel){ this.v.channel = sc.channel; }
						if(sc.pageName){ this.v.pageName = sc.pageName; }

						}catch(e){}
					}

					/* add code version prop35 for all calls */
					this.v.prop35 = _jsmd_default.version + ":" + _jsmd_default.release;

					/* add transaction ID prop46,eVar46 for all calls */
					if (_w.cnnad_transactionID) {
						this.v.prop46 = _w.cnnad_transactionID;
						this.v.eVar46 = "D=c46";
					}

					/* add GUID prop47,eVar47 for all calls */
					var guid = _jsmd.plugin.gCookie("ug");
					if (guid) {
						this.v.prop47 = guid;
						this.v.eVar47 = "D=c47";
					}

				}
			},
			adbp: {
				filters: {
					"cnt-social":						{ include: ["nothing"] },
					"kalydo-plugin":					{ include: ["nothing"] },
					"formula-cartoon":					{ include: ["nothing"] },
					"ingame-progress":					{ include: ["nothing"] },
					"flash-link":						{ include: ["video.","content_type","link."] },
					"promo-link":						{ include: ["nothing"] }
				},
				settings: {
					"trackInlineStats":					true,
					"linkLeaveQueryString":				false
				},
				variablemap: {
					"page.name":						["pageName","eVar26"],
					"page.domain":						["server","eVar29"],
					"page.clean_url":					["prop26"],
					"search.internal.number_results":	["prop27"],
					"video.title":						["prop29","eVar41"],
					"business.friendly_name":			["prop30","eVar30"],
					"page.franchise":					["prop31","eVar31"],
					"page.template_type":				["prop32","eVar32"],
					"page.content_type":				["prop33","eVar33"],
					"user.authenticated":				["prop34","eVar34"],
					"code.version":						["prop35"],
					"user.segment":						["prop36","eVar36"],
					"search.internal.keyword":			["prop39","eVar39"],
					"page.site_section[0]":				["prop41","eVar44"],
					"page.site_section[1]":				["prop42","eVar45"],
					"video.id":							["eVar42"],
					"promo.internal.id":				["eVar43"],
					"page.transaction_id":				["prop46","eVar46"],
					"promo.internal.implied":			["eVar48"],				//Campaign Stacking (SEO Driven)
					"promo.external.id":				["campaign"],			//Marketing/External Campaigns
					"video.products":					["products"]
				},
				eventmap: {
					"page.name":						["event26"],
					"page.view":						["event26"],
					"search.internal.keyword":			["event27"],
					"registration.complete":			["event28"],
					"promo.internal.id":				["event31"],
					"video.start":						["event32"],
					"video.complete":					["event33"],
					"video.autostart":					["event34"],
					"video.preroll":					["event35"],
					"video.duration_watched":			["event36"],
					"user.login":						["event37"],
					"blog.read":						["event38"],
					"article.read":						["event39"]
				},
				premap: function() { },
				postmap: function() {

				}
			},
			"tve":{
				filters: {
					"tve-C3_video-start": 	{ include: ["tve.page.name","tve.video.c3.","tve.products","tve.full_episode_length","tve.video_title","tve.brand","tve.host_location","tve.content_id","tve.publication_date","tve.days_since_publication","tve.mode","tve.franchise","tve.user_id","tve.player_location", "tve.syndication_channel"] },
					"tve-C4_video-start": 	{ include: ["tve.page.name","tve.video.c4.","tve.products","tve.full_episode_length","tve.video_title","tve.brand","tve.host_location","tve.content_id","tve.publication_date","tve.days_since_publication","tve.mode","tve.franchise","tve.user_id","tve.player_location", "tve.syndication_channel"] },
					"tve-C4_video-complete": 			{ include: ["tve.page.name","tve.video.c4.","tve.products","tve.video.c4.video_complete"] },
					"tve-C3_video-complete": 			{ include: ["tve.page.name","tve.video.c3.","tve.products","tve.video.c3.video_complete"] },
					"tve-C4_video-progress": 			{ include: ["tve.page.name","tve.products","tve.video.c4.video_progress"] },
					"tve-C3_video-progress": 			{ include: ["tve.page.name","tve.products","tve.video.c3.video_progress"] },
					"tve-C3A_video-start": 	{ include: ["tve.page.name","tve.video.c3a.video_start","tve.video.c3.marker","tve.products","tve.full_episode_length","tve.video_title","tve.brand","tve.host_location","tve.content_id","tve.publication_date","tve.days_since_publication","tve.mode","tve.franchise","tve.user_id","tve.player_location", "tve.syndication_channel"] },
					"tve-C3A_video-progress": 			{ include: ["tve.page.name","tve.products","tve.video.c3a.video_progress"] },
					"tve-C3A_video-complete": 			{ include: ["tve.page.name","tve.products","tve.video.c3a.video_complete"] }
				},
				variablemap: {
					"tve.page.name":				["pageName","eVar18"],
					"tve.brand":					["prop1","eVar1"],
					"tve.host_location":			["prop2","eVar2"],
					"tve.syndication_channel":	    ["prop4","eVar4"],
					"tve.content_id":				["prop5","eVar5"],
					"tve.publication_date":	    	["prop6","eVar6"],
					"tve.days_since_publication":	["prop7","eVar7"],
					"tve.mode":						["prop8","eVar8"],
					"tve.franchise":				["prop9","eVar9"],
					"tve.full_episode_length":		["prop10","eVar10"],
					"tve.player_location":			["prop11","eVar11"],
					"tve.video_title":				["prop12"],
					"tve.video.c3.marker":			["prop13","eVar13"],
					"tve.video.live.stream":		["prop14","eVar14"],
					"tve.video.adload":				["prop15","eVar15"],
					"tve.video.authentication":		["prop16","eVar16"],
					"tve.user_id":					["prop19","eVar19"],
					"tve.video.c4.marker":			["prop20","eVar20"],
					"tve.page.full_url":			["prop21"],
					"tve.products":					["products"],
					"tve.promo.external.id":		["campaign"],
					"delimiter":						"|"
				},
				eventmap: {
					"tve.page.view":					["event15"],
					"tve.video.c3.video_start":			["event8,event13,event15,event21"],
					"tve.video.c4.video_start":			["event13,event15,event23"],
					"tve.video.c4.video_complete":		["event7,event14,event20,event22"],
					"tve.video.c3.video_complete":		["event6,event14,event20,event22"],
					"tve.video.c4.video_progress":		["event7,event20,event22"],
					"tve.video.c3.video_progress":		["event6,event20,event22"],
					"tve.video.c3a.video_start":		["event9,event13,event15,event21"],
					"tve.video.c3a.video_progress":		["event5,event20,event22"],
					"tve.video.c3a.video_complete":		["event5,event14,event20,event22"],
					"tve.video.live.video_start":		["event13,event27"],
					"tve.video.offair.video_start":		["event13,event25"],
					"tve.video.live.video_progress":	["event16,event20"],
					"tve.video.live.video_complete":	["event14,event16,event26"]
				},
				premap: function() { },
				postmap: function() {

				}
			},
			"adbp-game": {
				settings: {
					"trackInlineStats":			true,
					"linkLeaveQueryString":		false
				},
				variablemap: {
					"page.name":						["eVar26"],
					"page.domain":						["eVar29"],
					"video.title":						["eVar41"],
					"business.friendly_name":			["eVar30"],
					"page.franchise":					["eVar31"],
					"page.template_type":				["eVar32"],
					"page.content_type":				["eVar33"],
					"user.authenticated":				["eVar34"],
					"user.segment":						["eVar36"],
					"search.internal.keyword":			["eVar39"],
					"page.site_section[0]":				["eVar44"],
					"page.site_section[1]":				["eVar45"],
					"video.id":							["eVar42"],
					"promo.internal.id":				["eVar43"],
					"page.transaction_id":				["eVar46"]
				},
				eventmap: {
					"search.internal.keyword":			["event27"],
					"registration.complete":			["event28"],
					"promo.internal.id":				["event31"],
					"user.login":						["event37"],
					"blog.read":						["event38"],
					"article.read":						["event39"]
				},
				premap: function() { },
				postmap: function() {

				}
			},
			"adbp-video": {
				filters: {
					"video-preroll":					{ include: ["page.domain","video.title","video.id","business.friendly_name","page.transaction_id","page.franchise","video.preroll","code.version"] }
				},
				variablemap: {
					"page.domain":						["eVar29"],
					"video.title":						["prop29","eVar41"],
					"video.id":							["eVar42"],
					"business.friendly_name":			["eVar30"],
					"page.franchise":					["eVar31"],
					"page.template_type":				["eVar32"],
					"page.content_type":				["prop33","eVar33"],
					"code.version":						["prop35"],
					"promo.internal.id":				["eVar43"],
					"promo.internal.implied":			["eVar48"],				//Campaign Stacking (SEO Driven)
					"promo.external.id":				["campaign"],			//Marketing/External Campaigns
					"page.transaction_id":				["eVar46"],
					"delimiter":						"|"
				},
				eventmap: {
					"video.start":						["event32"],
					"video.complete":					["event33"],
					"video.autostart":					["event34"],
					"video.preroll":					["event35"],
					"video.duration_watched":			["event36"]
				},
				premap: function() { },
				postmap: function() {
				}
			}
		}

	},
	plugins: {

		gCNTPageName:function(){
			/* business.cnt.pagename : prop2,eVar2 */
			var rval, hostname = _w.location.hostname.toLowerCase(), pathname = _w.location.pathname.replace(/index\.[^\/]+$/,"");
			var contextPrefix = {
				"www.cartoonnetwork.com":					"CN",
				"cartoonnetwork.com":						"CN",
				"staging.cartoonnetwork.com":				"CNStage",
				"gamecreator.cartoonnetwork.com":			"Ben10GC",
				"ben10gamecreator.cartoonnetwork.com":		"Ben10GC",
				"gcstage.cartoonnetwork.com":				"Ben10GCStage",
				"batmangamecreator.cartoonnetwork.com":		"BatmanGC",
				"bgcstage.cartoonnetwork.com":				"BatmanGCStage",
				"starwarsgamecreator.cartoonnetwork.com":	"StarWarsTCWGC",
				"swgcstage.cartoonnetwork.com":				"StarWarsGCStage",
				"theclonewars.cartoonnetwork.com":			"SW:TCW",
				"mixit.cartoonnetwork.com":					"Mixit",
				"forums.cartoonnetwork.com":				"Forum",
				"totaldramacontest.cartoonnetwork.com":		"TotalDramaContest",
				"nbakidsp1dev1.turner.com":					"NBAHoopTroop",
				"nbahooptroop.com":							"NBAHoopTroop",
				"www.nbahooptroop.com":						"NBAHoopTroop"
			} [hostname];
			if (!contextPrefix) contextPrefix = "Local";
			if (hostname.indexOf("fusionfall") != -1) {
				contextPrefix = "FF";
				var ffWinExtra = window.location.hash;
				var ffWinExtraRegExp = /\?/;
				if (ffWinExtra != "undefined") {
					if (ffWinExtraRegExp.test(ffWinExtra)) {
						var ffOmniExtra = ffWinExtraRegExp.split(ffWinExtra);
						pathname = pathname + ffOmniExtra[0];
					} else {
						pathname = pathname + ffWinExtra;
					}
				}
				if (typeof(_w.ffPageName) != "undefined") { contextPrefix = contextPrefix + " " + _w.ffPageName; }
			} else {
				if (pathname.indexOf("fb_gamecreator") != -1) { contextPrefix = "Ben10GCFB"; }
				var r = /([^\/]+\.[^\/]+$)/;
				if (!r.test(pathname)) {	//add trailing slash
					if (pathname.charAt(pathname.length - 1) != "/") { pathname = pathname + "/"; }
				}
			}
			if (document.title.indexOf("Error Page") != -1) { contextPrefix = "Error"; }
			return rval = contextPrefix + ": " + pathname;
		},
		gCNTPromo:function(){
			/* business.cnt.promo : prop5,eVar5 */
			var rval = "", path1 = _jsmd.plugin.gADBPURL("path",1), path2 = _jsmd.plugin.gADBPURL("path",2);
			if (path1 == "promos") rval = path2;
			return rval;
		},
		gCNTAuth:function(){
			/* user.authenticated : prop34,eVar34 */
			var rval = "anonymous";
			var regCookie = _jsmd.plugin.gCookie("hasReg");
			if (regCookie && regCookie != "") {		//check for hasReg cookie
				if (regCookie == 1) {
					rval = "reg:not logged in";
					this.cookie.set("hasReg",1,365);
				}
			}
			var loginCookie = _jsmd.plugin.gCookie("authid");
			if (loginCookie && loginCookie != "") {	//check for authid cookie
				rval = "reg:logged in";
				this.cookie.set("hasReg",1,365);
			}
			return rval;
		},
		gCNTVideoCollection: function() {
			/* video player collection */
			return {
				get: function (i,p) {
					var vplayer = _jsmd.plugin.md.get("video.players");
					for(var j=vplayer.length-1; j>=0; j--) {
						if (vplayer[j].videoId == i) {
							return vplayer[j][p];
						}
					}
				},
				set: function (i,p,v) {
					var vplayer = _jsmd.plugin.md.get("video.players");
					for(var j=vplayer.length-1; j>=0; j--) {
						if (vplayer[j].videoId == i) {
							vplayer[j][p] = v;
							break;
						}
					}
				},
				toggle: function (i,p) {
					var vplayer = _jsmd.plugin.md.get("video.players");
					for(var j=vplayer.length-1; j>=0; j--) {
						if (vplayer[j].videoId == i) {
							var v = vplayer[j][p];
							vplayer[j][p] = !v;
							break;
						}
					}
				},
				start: function (i,t) {
					var vplayer = _jsmd.plugin.md.get("video.players");
					for(var j=vplayer.length-1; j>=0; j--) {	//if same video player object exists, remove it
						if (vplayer[j].videoId == i) {
							vplayer.splice (j,1);
						}
					}
					vplayer.push(new objVplayer(i,t));
					function objVplayer (videoId,videoTitle) {
						this.videoId = videoId;
						this.videoTitle = videoTitle;
						this.hasScrubbed = false;
						this.isHalf = false;
						this.isBuffering = false;
						this.isPaused = false;
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
						if (vplayer[j].videoId == i) {
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
						if (vplayer[j].videoId == i) {
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
						if (vplayer[j].videoId == i) {
							var playedTime = ( new Date().getTime() - vplayer[j].startTime ) / 1000;
							vplayer[j].startTime = new Date().getTime();
							return Math.round(playedTime);
						}
					}
				},
				complete: function (i) {
					var vplayer = _jsmd.plugin.md.get("video.players");
					for(var j=vplayer.length-1; j>=0; j--) {
						if (vplayer[j].videoId == i) {
							var playedTime = ( new Date().getTime() - vplayer[j].startTime + vplayer[j].timeSpent ) / 1000;
							return Math.round(playedTime);
						}
					}
				}
			}
		},
		gTVEDevString:function(){
			var r = "dev";
			var host = window.location.host;
			if(host==="www.cartoonnetwork.com" || host==="cartoonnetwork.com"){r = "";}
			return r;
		},
		sTVEProgressMarker:function(_percentNum){
			jsmd.TVE.video_progress = _percentNum;
		},
		sTVEUserID:function(_id){
			var userID = _id+"";
			jsmd.TVE.userID = userID;
		},
		sTVEVideoExactLength: function(_vlength){
			var vl = "";
			if(_vlength*1>-1){vl = _vlength*1;}
			jsmd.set("tve.video.exact_length", vl);
		}

		,
/**
 *Description: The plugins object contains helper methods, these methods have been broken up in the core library into an ABDP specific methods file (plugins_adbp.js) and Global methods file (plugins_global.js) All the methods in both files belong to the same plugins object and are compiled together in the build process.
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
				case "hier":
					/* prop41/eVar44, prop42/eVar45 - URL Hierarchy Levels */
					hostname = hostname.replace("www.","");
					var path_array = pathname.substring(1).split("/");
					var h1 = hostname + "/" + path_array[0];
					var h2 = h1;
					if (path_array[1]) h2 = h2 + "/" + path_array[1];
					rval=[h1,h2];
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
	 * @see Function.prototype.jsmdBind
	 */
		gADBPVisitorSegments:function(_rParam, _rollday) {
			var rollDay = parseInt(_rollday);	//rolling days (max 30 days)
			/** tt = current time */
			var tt = new Date().getTime();
			/** uc = user cookie: may return back null/undefined */
			var uc = this.cookie.get('tnr:usrvtstg01');		//1303834046328|2|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|2|f|2|3|1303836463058
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
			var isThtyD = (vsDCnt>rollDay || sa[32] == 't')?true:false;
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
					if (ltV > rollDay) {
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
						for(var e=rollDay; e>(rollDay-ltV); e--) {
							if (e < rollDay){
								sa[e] = 0;
							}
						}
						sa[32] = 't';
					}
					sa[30] = 0;
				}
			}.jsmdBind(this)

			/** sets the value of the user visits cookie for all return visitors */
			sUsrVistCookieVal = function(){
				if (!ks){
				sa[31] = (sa[31]*1) + 1; // set lifetime visits
				sa[33] = (sa[34] != crntMnth)?1:(sa[33]*1)+1; //set the month visit sum
				sa[34] = crntMnth; // set value for current month
				sa[35] = tt; // set value for current month

				var av = (sa[32] === 't' && ltV<30)?30:(vsDCnt<=30)?vsDCnt:((vsDCnt-30) < 30)?((vsDCnt - 30)+1):1;
				av = av + 30 - rollDay;

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
			}.jsmdBind(this)

			/** sets the return value */
			sRtnObj = function () {
				var r;
				var lng = sa.length;
				thirtyDSum = 0;
				lifTimeSum = sa[31];
				calMnthSum = sa[33];

				for (var x=31-rollDay; x<lng; x++) {
					var cnm = sa[x];
					if (cnm != 0 && x < 31) {
						thirtyDSum += (cnm*1);
					}
				}
				r = gRtArr();
				return r;
			}.jsmdBind(this)

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
			}.jsmdBind(this)

			/* gets the new or repeat value */
			gNoR = function (_v) { if (_v <= '1') {return 'new'} else {return 'repeat'} }

			/** sets new cookie for first time visit */
			sNewCookie = function()  {
				var vStng = tt + "|";
				for (var i=0; i<30; i++) {
					vStng += (i==30-rollDay) ? 1 : 0;
					vStng += "|";
				}
				vStng = vStng + "1|f|1|" + crntMnth + "|" + tt;
				if(isIE7){ vStng = vStng+"|"+pagMtch}
				this.cookie.set('tnr:usrvtstg01', vStng, 2000, sPath);
				this.cookie.set('tnr:sesctmp01' , tt, null, sPath);
			}.jsmdBind(this)


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
				for(var i=0;i<len;i++) {
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
		gIreportgetMetaCompatible:function(mn){
		  var m = document.getElementsByTagName('meta');
		  for(var i in m){
			if(m[i].content == mn){
				return m[i].content;
			}
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

						/*
						* Plugin: getPreviousValue_v1.0 - return previous value of designated
						*   variable (requires split utility)
						*/
						s.getPreviousValue=new Function("v","c","el",""
						+"var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
						+"){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
						+"){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
						+":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
						+"s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");
						/*
						* Utility Function: split v1.5 - split a string (JS 1.0 compatible)
						*/
						s.split=new Function("l","d",""
						+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
						+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

						/*
						* Plugin: getPercentPageViewed v1.2
						*/
						s.getPercentPageViewed=new Function("",""
						+"var s=this;if(typeof(s.linkType)=='undefined'||s.linkType=='e'){var"
						+" v=s.c_r('s_ppv');s.c_w('s_ppv',0);return v;}");
						s.getPPVCalc=new Function("",""
						+"var s=s_c_il["+s._in+"],dh=Math.max(Math.max(s.d.body.scrollHeight,"
						+"s.d.documentElement.scrollHeight),Math.max(s.d.body.offsetHeight,s."
						+"d.documentElement.offsetHeight),Math.max(s.d.body.clientHeight,s.d."
						+"documentElement.clientHeight)),vph=s.wd.innerHeight||(s.d.documentE"
						+"lement.clientHeight||s.d.body.clientHeight),st=s.wd.pageYOffset||(s"
						+".wd.document.documentElement.scrollTop||s.wd.document.body.scrollTo"
						+"p),vh=st+vph,pv=Math.round(vh/dh*100),cp=s.c_r('s_ppv');if(pv>100){"
						+"s.c_w('s_ppv','');}else if(pv>cp){s.c_w('s_ppv',pv);}");
						s.getPPVSetup=new Function("",""
						+"var s=this;if(s.wd.addEventListener){s.wd.addEventListener('load',s"
						+".getPPVCalc,false);s.wd.addEventListener('scroll',s.getPPVCalc,fals"
						+"e);s.wd.addEventListener('resize',s.getPPVCalc,false);}else if(s.wd"
						+".attachEvent){s.wd.attachEvent('onload',s.getPPVCalc);s.wd.attachEv"
						+"ent('onscroll',s.getPPVCalc);s.wd.attachEvent('onresize',s.getPPVCa"
						+"lc);}");

						/*
						 * Plugin: linkHandler 0.5 - identify and report custom links
						 */
						s.linkHandler=new Function("p","t",""
						+"var s=this,h=s.p_gh(),i,l;t=t?t:'o';if(!h||(s.linkType&&(h||s.linkN"
						+"ame)))return '';i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h."
						+"substring(0,i);l=s.pt(p,'|','p_gn',h.toLowerCase());if(l){s.linkNam"
						+"e=l=='[['?'':l;s.linkType=t;return h;}return '';");
						s.p_gn=new Function("t","h",""
						+"var i=t?t.indexOf('~'):-1,n,x;if(t&&h){n=i<0?'':t.substring(0,i);x="
						+"t.substring(i+1);if(h.indexOf(x.toLowerCase())>-1)return n?n:'[[';}"
						+"return 0;");
						/*
			             * Utility Function: p_gh
			             */
			            s.p_gh=new Function(""
			            +"var s=this;if(!s.eo&&!s.lnk)return '';var o=s.eo?s.eo:s.lnk,y=s.ot("
			            +"o),n=s.oid(o),x=o.s_oidt;if(s.eo&&o==s.eo){while(o&&!n&&y!='BODY'){"
			            +"o=o.parentElement?o.parentElement:o.parentNode;if(!o)return '';y=s."
			            +"ot(o);n=s.oid(o);x=o.s_oidt}}return o.href?o.href:'';");
			            /*
						* TNT Integration Plugin v1.0
						* v - Name of the javascript variable that is used. Defaults to s_tnt
						(optional)
						* p - Name of the url parameter. Defaults to s_tnt (optional)
						* b - Blank Global variable after plugin runs. Defaults to true (Optional)
						*/
						s.trackTNT = function(v, p, b)
						{
						var s=this, n="s_tnt", p=(p)?p:n, v=(v)?v:n, r="",pm=false, b=(b)?b:true;
						if(s.getQueryParam)
						pm = s.getQueryParam(p); //grab the parameter
						if(pm)
						r += (pm + ","); // append the parameter
						if(s.wd[v] != undefined)
						r += s.wd[v]; // get the global variable
						if(b)
						s.wd[v] = ""; // Blank out the global variable for ajax requests
						return r;}
						s.getPPVSetup();

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
				if(!data.link_name) {data.link_name = "Arabic CVP Video Link";}
				this.set("link",{name: data.link_name, type: "o"});
				this.set("video.id",data.id);
				this.set("page.content_type","adbp:video start");
				if (data.events == "video.complete"){
					this.set("page.content_type", null);
					this.set("video.title", null);
					this.set("video.products",";;;;event36=" + data.trt);
				}
				if (data.events == "video.start"){
					this.set("video.title",data.title);
				}
				this.push("page.events",data.events);
				this.send();},
			"dynamic-page": function(data,map) {this.send();},
			"flash-link": "alias:dynamic-link",
			"flash-page": "alias:dynamic-page",
			"cnt-common": function(data,map) {
				var g = data.game||{};
				this.set("business.cnt.globalnav","");						//prop1,eVar1 - suppress for custom tracking
				/*
				this.set("business.cnt.game.detail",g.detail);				//prop4,eVar4
				if (g.detail && g.detail.indexOf("tko") != -1) this.set("business.cnt.game.tko",g.detail);		//prop6,eVar6
				if (g.detail && g.detail.indexOf("mixit") != -1) this.set("business.cnt.game.mixit",g.detail);	//prop10,eVar10
				*/
				this.set("business.cnt.achievement",game_achievement);		//prop16,eVar16
				this.set("business.cnt.game.title",g.title);				//prop21,eVar21
				this.set("business.cnt.game.type",g.type);					//prop22,eVar22
			},
			"cnt-page": function(data,map) {
				this.set("business.cnt.super_franchise",data.super_franchise);				//prop11,eVar11
				this.set("business.cnt.achievement",data.achievement);						//prop16,eVar16
				this.set("search.internal.number_results",data.search_results_count);		//prop27
				this.set("page.template_type",data.page_template_type);						//prop32,eVar32
				this.set("page.content_type",_jsmd.plugin.gADBPContentType("adbp:misc"));	//prop33,eVar33
				this.set("page.name",_jsmd.plugin.gADBPPageName());							//pageName,eVar26
				this.set("page.franchise",data.franchise_partner);							//prop31,eVar31
				this.push("page.events","page.view");										//event26
				if (data.search_results_count) this.push("page.events","search.internal.keyword");	//event27
				this.send();
				NielsenHybridTag.push_nielsen("us-204044h");
			},
			"cnt-social": function(data,map) {
				if (data.detail) {
					this.set("business.cnt.achievement",data.detail);		//prop16,eVar16
					game_achievement = data.detail;
					this.set("action","link");
					this.set("link",{name: "cnt-social", type: "o"});
					this.send();
				}
			},
			"cnt-interaction": function(data,map) {
				var it = data.interaction_type;
				this.set("business.cnt.event_interaction",it);
				this.set("action","link");
				this.set("link",{name: "cnt-interaction:" + it, type: "o"});
				this.send();
			},
			"kalydo-plugin": function(data,map) {
				this.push("page.events","business.cnt.kalydo.install");
				this.set("action","link");
				this.set("link",{name: "kalydo-plugin", type: "o"});
				this.send();
			},
			"formula-cartoon": function(data,map) {
				var gd = data.game_data;
				var int_type = data.interaction_type;
				this.set("action","link");
				switch(int_type){
				    case "general game start":
						jsmd_gameStartTime = new Date().getTime();
						jsmd_gameInterval = setInterval(function(){ _w.sendGameEvent("ingame-progress",gd) },60000);
						this.push("page.events","business.cnt.game.session_start");
						this.set("link",{name: "general game start", type: "o"});
						this.set("business.cnt.game.ingame_title",gd.ingame_title);
						this.set("business.cnt.game.user_type",gd.user_type);
						break;
				    case "game download": case "formula download start":
						this.push("page.events","business.cnt.game.download_start");
						this.set("link",{name: "formula download start", type: "o"});
						this.set("business.cnt.game.ingame_title",gd.ingame_title);
						break;
				    case "game download complete":
						this.push("page.events","business.cnt.game.download_complete");
						this.set("link",{name: "formula download complete", type: "o"});
						this.set("business.cnt.game.ingame_title",gd.ingame_title);
						break;
				    case "avatar creation":
						this.set("link",{name: "formula start avatar creation", type: "o"});
						this.set("business.cnt.game.ingame_title",gd.ingame_title);
						this.set("business.cnt.game.user_type",gd.user_type);
						break;
				    case "race start new":
						this.push("page.events","business.cnt.game.race_play");
						this.set("link",{name: "formula race start new", type: "o"});
						this.set("business.cnt.game.ingame_title",gd.ingame_title);
						this.set("business.cnt.formula.track_title",gd.track_title);
						this.set("business.cnt.game.user_type",gd.user_type);
						break;
				    case "race start repeat":
						this.push("page.events","business.cnt.game.session_start");
						this.push("page.events","business.cnt.game.race_play");
						this.set("link",{name: "formula race start repeat", type: "o"});
						this.set("business.cnt.game.ingame_title",gd.ingame_title);
						this.set("business.cnt.formula.track_title",gd.track_title);
						this.set("business.cnt.game.user_type",gd.user_type);
						break;
				}
				this.send();
			},
			"ingame-progress": function(data,map) {
				var gd = data.game_data;
				var progressTime = new Date().getTime();
				var timeSpent = (jsmd_gameStartTime == 0 ? 0 : Math.round((progressTime - jsmd_gameStartTime) / 1000));
				this.set("action","link");

				if(timeSpent > 60 || timeSpent < 0){
					timeSpent = 60;
				}
				if (_w.location.href.indexOf("formula-cartoon") != -1)
				{
				this.set("link",{name: "game time spent: "+gd.ingame_title, type: "o"});
				this.set("business.cnt.game.time_spent",timeSpent+"");
				}
				else if(_w.location.href.indexOf("dragons") != -1 ||_w.location.href.indexOf("ben10gamecreator") != -1 || _w.location.href.indexOf("exonaut") != -1 || _w.location.href.indexOf("splashback") != -1)

				{
				this.set("business.cnt.game.title",gd);
				this.set("link",{name: "game time spent: "+gd, type: "o"});
				this.set("business.cnt.epic.game.time_spent",timeSpent+"");
				}
				this.send();
			},
			"cnt-search": function(data,map) {	//page
				this.set("search.internal.number_results",data.detail+"");	//prop27
				this.push("page.events","page.view");						//event26
				this.push("page.events","search.internal.keyword");			//event27
				this.send();
				NielsenHybridTag.push_nielsen("us-204044h");
			},
			"cnt-allshow": function(data,map) {	//link
				this.set("business.cnt.attribution",data.attribution);		//prop14,eVar14
				this.set("action","link");
				this.set("link",{name: "cnt-allshow", type: "o"});
				this.send();
			},
			"cnt-aspace": function(data,map) {	//link
				this.set("business.cnt.attribution",data.attribution);		//prop14,eVar14
				this.set("action","link");
				this.set("link",{name: "cnt-aspace", type: "o"});
				this.send();
			},
			"cnt-gamehome-category": function(data,map) {	//link
				this.set("business.cnt.attribution",data.game.detail);		//prop14,eVar14
				this.set("action","link");
				this.set("link",{name: "cnt-gamehome-category", type: "o"});
				this.send();
			},
			"cnt-gnav": function(data,map) { //link
                this.set("business.cnt.globalnav",data.attribution);                      //prop1,eVar1
                this.set("action","link");
                this.set("link",{name: "cnt-gnav", type: "o"});
                this.send();
			},
			"cnt-login": function(data,map) {
				var it = data.interaction_type;
				if(it == "registration"){
					this.push("page.events","registration.complete");
				}else if(it == "login"){
					this.push("page.events","user.login");
				}
				this.set("business.cnt.logreg","login");
				this.set("action","link");
				this.set("link",{name: "cnt-login: " + it, type: "o"});
				this.send();
			},
			"cnt-game-achievements": function(data,map) {	//page
				/* it will be added when they convert all games to new template */
				/*
				if (data.detail) {
					this.set("business.cnt.achievement",data.detail);		//prop16,eVar16
					game_achievement = data.detail;
				}
				this.push("page.events","page.view");						//event26
				this.send();
				NielsenHybridTag.push_nielsen("us-204044h");
				*/
			},
			"cnt-game-flexspace": function(data,map) {	//link
				this.set("business.cnt.attribution",data.attribution);		//prop14,eVar14
				this.set("action","link");
				this.set("link",{name: "cnt-game-flexspace", type: "o"});
				this.send();
			},
			"cnt-game-EndSeeProfile": function(data,map) {	//link
				this.set("action","link");
				this.set("link",{name: "cnt-game-EndSeeProfile", type: "o"});
				this.send();
			},
			"cnt-game-EndPlayNow": function(data,map) {	//link
				this.set("action","link");
				this.set("link",{name: "cnt-game-EndPlayNow", type: "o"});
				this.send();
			},
			"cnt-game-PreLogIn": function(data,map) {	//link
				this.set("action","link");
				this.set("link",{name: "cnt-game-PreLogIn", type: "o"});
				this.send();
			},
			"cnt-game-PrePlayNow": function(data,map) {	//link
				this.set("action","link");
				this.set("link",{name: "cnt-game-PrePlayNow", type: "o"});
				this.send();
			},
			"cnt-game-PostLogIn": function(data,map) {	//link
				this.set("action","link");
				this.set("link",{name: "cnt-game-PostLogIn", type: "o"});
				this.send();
			},
			"cnt-game-PostPlayAgain": function(data,map) {	//link
				this.set("action","link");
				this.set("link",{name: "cnt-game-PostPlayAgain", type: "o"});
				this.send();
			},
			"cnt-game-login": function(data,map) {	//link
				this.set("action","link");
				this.set("link",{name: "cnt-game-login", type: "o"});
				this.send();
			},
			"cnt-game-playnow": function(data,map) {	//link
				var gd = data.game_data;
				this.push("page.events","business.cnt.game.play");		//event2
				this.set("action","link");
				this.set("link",{name: "cnt-game-playnow", type: "o"});
				this.set("business.cnt.game.title",gd);
				this.send();
			},
			"cnt-game-replay": function(data,map) {	//link
				var gd = data.game_data;
				this.push("page.events","business.cnt.game.replay");		//event3
				this.set("action","link");
				this.set("link",{name: "cnt-game-replay", type: "o"});
				this.set("business.cnt.game.title",gd);
				this.send();
			},
			"cnt-game-init": function(data,map) {	//link
				var gd = data.game_data;
				this.push("page.events","business.cnt.game.init");		//event15
				this.set("action","link");
				this.set("link",{name: "cnt-game-init", type: "o"});
				this.set("business.cnt.game.title",gd);
				this.send();
			},
			"cnt-game-start": function(data,map) {	//link
				var gd = data.game_data;
				jsmd_gameStartTime = new Date().getTime();
				this.push("page.events","business.cnt.game.start");		//event16
				this.set("action","link");
				this.set("link",{name: "cnt-game-start", type: "o"});
				this.set("business.cnt.game.title",gd);
				this.send();
				},
			"cnt-game-unity-download": function(data,map) {	//link
				this.push("page.events","business.cnt.game.unity_download");	//event8
				this.set("action","link");
				this.set("link",{name: "cnt-game-unity-download", type: "o"});
				this.send();
			},
			"cnt-game-unity-not-installed": function(data,map) {	//link
				this.push("page.events","business.cnt.game.unity_not_installed");	//event6
				this.set("action","link");
				this.set("link",{name: "cnt-game-unity-not-installed", type: "o"});
				this.send();
			},
			"cnt-game-unity-installed": function(data,map) {	//link
				this.push("page.events","business.cnt.game.unity_installed");		//event1
				this.set("action","link");
				this.set("link",{name: "cnt-game-unity-installed", type: "o"});
				if (_w.doSubmit) { this.send(); }
			},
			"cnt-game-unity-unknown": function(data,map) {	//link
				this.set("action","link");
				this.set("link",{name: "cnt-game-unity-unknown", type: "o"});
				this.send();
			},
			"mixit-flash-interaction": function(data,map) {	//link
				this.set("business.cnt.game.mixit",data);		//prop10,eVar10
				this.set("action","link");
				this.set("link",{name: "mixit-flash-interaction", type: "o"});
				this.send();
			},
			"mixit-page-interaction": function(data,map) {	//link
				this.set("business.cnt.game.mixit",data);		//prop10,eVar10
				this.set("action","link");
				this.set("link",{name: "mixit-page-interaction", type: "o"});
				this.send();
			},
			"mixit-video-start": function(data,map) {	//link
				this.set("business.cnt.game.mixit",data.type);		//prop10,eVar10
				this.set("business.cnt.video.type", "cli-mxt");		//prop12,eVar12
				this.set("video.id",data.id);							//eVar42
				this.set("page.franchise",data.showname);	//prop31,eVar31
				this.set("video.title",data.showname + ": " +data.title);					//prop29,eVar41
				this.set("page.template_type","adbp:video");		//prop32,eVar32
				this.set("page.content_type","adbp:video start");	//prop33,eVar33
				this.set("action","link");
				this.set("link",{name: data.type+ ": " + data.title, type: "o"});
				var vc = new _jsmd.plugin.gCNTVideoCollection();
				vc.start(data.id,data.title);
				this.push("page.events","video.start");
				sendComscoreVideoMetrixBeacon(data.id,1);	//content-related comscore call
				sendNielsenVideoCensusBeacon(this.get("m:nielsen"),"start",data.id,data.title);
				this.send();
			},
			"mixit-video-complete": function(data,map) {	//link
				this.set("business.cnt.game.mixit",data.type);		//prop10,eVar10
				this.set("business.cnt.video.type", "cli-mxt");		//prop12,eVar12
				this.set("page.franchise",data.showname);	//prop31,eVar31
				this.set("video.id",data.id);							//eVar42
				this.set("page.franchise",data.showname);	//prop31,eVar31
				this.set("video.title",data.showname + ": " +data.title);					//prop29,eVar41
				this.set("page.template_type","adbp:video");		//prop32,eVar32
				this.set("action","link");
				this.set("link",{name: data.type+ ": " + data.title, type: "o"});
				var vc = new _jsmd.plugin.gCNTVideoCollection();
				var timeSpent = vc.complete(data.id);
				this.set("video.duration_watched",timeSpent+"");
				this.push("page.events","video.complete");
				sendNielsenVideoCensusBeacon(this.get("m:nielsen"),"complete",data.id,data.title,timeSpent+"");
				var duration = (parseFloat(data.duration));
				if(duration == ""){
				} else {
					if(timeSpent > duration * 2){
						timeSpent = duration * 2;
					};
					this.send();
				};
			},
			"promo-main": function(data,map) {	//page
				var pm = this.get("business.cnt.promo");
				var pn = this.get("page.name");
				this.set("page.name",pn + " [" + pm + "]");
				this.push("page.events","page.view");	//event26
				this.send();
			},
			"promo-link": function(data,map) {	//link
				this.set("business.cnt.promo_button",data);	//prop18,eVar18
				this.set("action","link");
				this.set("link",{name: "promo-link: " + data, type: "o"});
				this.send();
			},
			"video-common": function(data,map) {
				/*
					autoplayed:	true,
					id:			"188403",
					title:		"Regular Show:Doing Solids",
					type:		"episode",
					season:		"4",
					episode:	"203",
					segment:	"1",
					franchise:	"ben 10"
				*/
				var v = data.video||{};
				this.set("video.id",v.id);							//eVar42
				var videoTitle = "";
				if(typeof(v.title) == "undefined"){
					videoTitle = (v.headline ? v.headline : "");
				}else{
						videoTitle = v.title;
				}
				var pFranchise = this.get("page.franchise");
				var vFranchise = "";
				if (v.franchise) {
					this.set("page.franchise",v.franchise);	//prop31,eVar31
					vFranchise = v.franchise;
				} else {
					vFranchise = pFranchise;
				}
				if (vFranchise) videoTitle =  vFranchise + ": " + videoTitle;	//add show name to video title
				this.set("video.title",videoTitle);					//prop29,eVar41
				this.set("business.cnt.video.type",v.type);			//prop12,eVar12
				v.segment = v.segment + "";
				if (v.segment) this.set("business.cnt.video.segment",videoTitle+": "+v.segment);	//prop13,eVar13
				this.set("page.template_type","adbp:video");		//prop32,eVar32
				this.set("page.content_type","adbp:video start");	//prop33,eVar33
			},
			"video-preroll": function(data, map) {
				var v=data.video||{};
				var videoTitle = "";
				if(typeof(v.title) == "undefined"){
					videoTitle = (v.headline ? v.headline : "");
				}else{
						videoTitle = v.title;
				}
				this.set("action","link");
				this.set("link",{name: "video-preroll: " + videoTitle, type: "o"});
				this.push("page.events","video.preroll");
				this.send();
				sendComscoreVideoMetrixBeacon(v.id,2);	//ad-related comscore call
			},
			"video-start": function(data, map) {
				_w.jsmdPreviousPaused =false;
				_w.jsmdPreviousBuffering =false;
				var v = data.video||{};
				var videoTitle = "";
				if(typeof(v.title) == "undefined"){
					videoTitle = (v.headline ? v.headline : "");
				}else{
						videoTitle = v.title;
				}
				var vc = new _jsmd.plugin.gCNTVideoCollection();
				vc.start(v.id,videoTitle);
				this.set("action","link");
				var tl_name = "video-start";
				if (v.autoplayed && (v.autoplayed == true || v.autoplayed == "true")) {
					tl_name = "video-autostart";
					this.push("page.events","video.autostart");
				}
				this.set("link",{name: tl_name + ": " + videoTitle, type: "o"});
				this.push("page.events","video.start");
				v.segment = v.segment + "";
				if (v.type && v.type.toLowerCase().indexOf("epi") != -1 && v.segment && (v.segment == "0" || v.segment == "")) this.push("page.events","video.episode_start");	//event4
				this.send();
				sendComscoreVideoMetrixBeacon(v.id,1);	//content-related comscore call
				sendNielsenVideoCensusBeacon(this.get("m:nielsen"),"start",v.id,videoTitle);
			},
			"video-autostart": function(data, map) {
				_w.jsmdPreviousPaused =false;
				_w.jsmdPreviousBuffering =false;
				var v = data.video||{};
				var videoTitle = "";
				if(typeof(v.title) == "undefined"){
					videoTitle = (v.headline ? v.headline : "");
				}else{
						videoTitle = v.title;
				}
				var vc = new _jsmd.plugin.gCNTVideoCollection();
				vc.start(v.id,videoTitle);
				this.set("action","link");
				this.set("link",{name: "video-autostart: " + videoTitle, type: "o"});
				this.push("page.events","video.start");
				this.push("page.events","video.autostart");
				v.segment = v.segment + "";
				if (v.type && v.type.toLowerCase().indexOf("epi") != -1 && v.segment && (v.segment == "0" || v.segment == "")) this.push("page.events","video.episode_start");	//event4
				this.send();
				sendComscoreVideoMetrixBeacon(v.id,1);	//content-related comscore call
				sendNielsenVideoCensusBeacon(this.get("m:nielsen"),"start",v.id,videoTitle);
			},
			"video-pause": function(data, map) {
				var paused;
				if(typeof(data.video.paused) == "undefined"){
					paused =false;
				}else{
					paused = data.video.paused;
				}
				var vc = new _jsmd.plugin.gCNTVideoCollection();
				var previousPaused = vc.get(data.video.id,"isPaused");
				if(paused != previousPaused){
				vc.pause(data.video.id);
				}
			},
			"video-buffer": function(data, map) {
				var buffering;
				if(typeof(data.video.buffering) == "undefined"){
					buffering =false;
				}else{
					buffering = data.video.buffering;
				}
				var vc = new _jsmd.plugin.gCNTVideoCollection();
				var previousBuffering = vc.get(data.video.id,"isBuffering");
				if(buffering != previousBuffering){
				vc.buffer(data.video.id);
				}
			},
			"video-complete": function(data, map) {
				var v = data.video||{};
				var videoTitle = "";
				if(typeof(v.title) == "undefined"){
					videoTitle = (v.headline ? v.headline : "");
				}else{
						videoTitle = v.title;
				}
				var vc = new _jsmd.plugin.gCNTVideoCollection();
				var timeSpent = vc.complete(v.id);
				this.set("video.duration_watched",timeSpent+"");
				this.set("action","link");
				this.set("link",{name: "video-complete: " + videoTitle, type: "o"});
				this.push("page.events","video.complete");
				var duration = (parseFloat(v.trt));
				if(duration == ""){
				} else {
					if(timeSpent > duration * 2){
						timeSpent = duration * 2;
					};
					this.send();
				};
				sendNielsenVideoCensusBeacon(this.get("m:nielsen"),"complete",v.id,videoTitle,timeSpent+"");
			},
			/* TVE Dyanmic Actions */
			"tve-ad-start": function(data, map) {

				jsmd.TVE.isAdPlayTimeSet = false;
				jsmd.TVE.isAdStart = true;
				jsmd.TVE.adDuration = Math.round(data.duration*1);
				jsmd.TVE.totalAdDurations += Math.round(data.duration*1);

				var MSO = jsmd.tveMSO;
				this.set("tve.video_title", data.title);//prop12
				jsmd.TVE.videoTitle = this.get("tve.video_title");
				jsmd.TVE.brand = this.get("tve.brand");
				var distribName = MSO;
				if (MSO == "Unauthorized")
				{
						distribName = "unspecified mvpd";
						jsmd.TVE.authState = "not authenticated";
				}
				this.set("tve.host_location", distribName+":"+jsmd.TVE.brand);//prop2,eVar2
				jsmd.TVE.host = this.get("tve.host_location");
				this.set("tve.content_id", data.contentId);//prop5,eVar5
				jsmd.TVE.vidID = this.get("tve.content_id");
				this.set("tve.publication_date", data.lastAirDate);//prop6,eVar6
				jsmd.TVE.lastAirDate = this.get("tve.publication_date");
				this.set("tve.days_since_publication", data.dayssince);//prop7,eVar7
				jsmd.TVE.dayssince = this.get("tve.days_since_publication");
				this.set("tve.mode", data.tveMode);//prop8,eVar8
				jsmd.TVE.mode = this.get("tve.mode");
				this.set("tve.franchise", data.franchise);//prop9,eVar9
				jsmd.TVE.videoFranchise = this.get("tve.franchise");
				jsmd.TVE.playerLocation = jsmd.get("tve.player_location");
				this.set("tve.video.authentication", jsmd.TVE.authState);//prop16,eVar16
				this.set("tve.user_id", jsmd.TVE.userID);// prop19,eVar19
				var grossLength = (data.grossLength)?data.grossLength:(data.trt)?data.trt:"";
				this.set("tve.full_episode_length", data.franchise+":"+data.title+":"+grossLength);//prop10,eVar10
				jsmd.TVE.fullEpisode = this.get("tve.full_episode_length");

				this.set("action","link");
				this.set("link",{name: "ad start", type: "o"});

				try {
					var s_data = {
							account:jsmd.tveRSID,
							events:"event1",
							eVar1:jsmd.TVE.brand,
							eVar2:jsmd.TVE.host,
							eVar4:jsmd.TVE.channel,
							eVar5:jsmd.TVE.vidID,
							eVar6:jsmd.TVE.lastAirDate,
							eVar7:jsmd.TVE.dayssince,
							eVar8:jsmd.TVE.mode,
							eVar9:jsmd.TVE.videoFranchise,
							eVar10:jsmd.TVE.fullEpisode,
							eVar11:jsmd.TVE.playerLocation,
							eVar14:jsmd.TVE.liveStreamName,
							eVar16:jsmd.TVE.authState,
							eVar19:jsmd.TVE.userID,
							linkTrackVars:"events,products,pageName,eVar1,eVar2,eVar4,eVar5,eVar6,eVar7,eVar8,eVar9,eVar10,eVar11,eVar13,eVar14,eVar16,eVar19,eVar20,prop35,eVar35,prop46,eVar46,prop47,eVar47"
					};

	            	this.set("business.vendor.sitecatalyst", s_data);
				}catch(e){}

				this.send();
			},
			"tve-C4_video-start": function(data, map) {
				var adTotalPlayTime = (data.adTotalPlayTime)?data.adTotalPlayTime:0;
				if(!jsmd.TVE.isAdStart){
					jsmd.TVE.nonC3C4adNum = adTotalPlayTime*1;
				}


				var MSO = jsmd.tveMSO;
				this.set("tve.video_title", data.title);//prop12
				jsmd.TVE.videoTitle = this.get("tve.video_title");
				jsmd.TVE.brand = this.get("tve.brand");
				var distribName = MSO;
				if (MSO == "Unauthorized")
				{
						distribName = "unspecified mvpd";
						jsmd.TVE.authState = "not authenticated";
				}
				this.set("tve.host_location", distribName+":"+jsmd.TVE.brand);//prop2,eVar2
				jsmd.TVE.host = this.get("tve.host_location");
				this.set("tve.content_id", data.contentId);//prop5,eVar5
				jsmd.TVE.vidID = this.get("tve.content_id");
				this.set("tve.publication_date", data.lastAirDate);//prop6,eVar6
				jsmd.TVE.lastAirDate = this.get("tve.publication_date");
				this.set("tve.days_since_publication", data.dayssince);//prop7,eVar7
				jsmd.TVE.dayssince = this.get("tve.days_since_publication");
				this.set("tve.mode", data.tveMode);//prop8,eVar8
				jsmd.TVE.mode = this.get("tve.mode");
				this.set("tve.franchise", data.franchise);//prop9,eVar9
				jsmd.TVE.videoFranchise = this.get("tve.franchise");
				jsmd.TVE.playerLocation = jsmd.get("tve.player_location");
				this.set("tve.video.authentication", jsmd.TVE.authState);//prop16,eVar16
				this.set("tve.user_id", jsmd.TVE.userID);// prop19,eVar19
				var grossLength = (data.grossLength)?data.grossLength:(data.trt)?data.trt:"";
				this.set("tve.full_episode_length", data.franchise+":"+data.title+":"+grossLength);//prop10,eVar10
				jsmd.TVE.fullEpisode = this.get("tve.full_episode_length");

				var prodFranchise = data.franchise+"";
				prodFranchise = prodFranchise.replace(/\,|\;/gi, "");
				var prodTitle = data.title+"";
				prodTitle = prodTitle.replace(/\,|\;/gi, "");

				var adTotal = null;
				if (data.grossLength && data.duration){
					adTotal = ((data.grossLength*1) - (data.duration*1))
				}

				if (!adTotal){
					ad_duration = "";
					this.set("tve.products", (";"+prodFranchise+":"+prodTitle+";;;event23="+data.trt))//products
				}else {
					this.set("tve.products", (";"+prodFranchise+":"+prodTitle+";;;event23="+data.trt+"|event21="+adTotal))//products
				}

				try {
					var s_data = {
							account:jsmd.tveRSID,
							events:"event13,event15,event23,event21",
							prop1:jsmd.TVE.brand,
							eVar1:jsmd.TVE.brand,
							prop2:jsmd.TVE.host,
							eVar2:jsmd.TVE.host,
							prop4:jsmd.TVE.channel,
							eVar4:jsmd.TVE.channel,
							prop5:jsmd.TVE.vidID,
							eVar5:jsmd.TVE.vidID,
							prop6:jsmd.TVE.lastAirDate,
							eVar6:jsmd.TVE.lastAirDate,
							prop7:jsmd.TVE.dayssince,
							eVar7:jsmd.TVE.dayssince,
							prop8:jsmd.TVE.mode,
							eVar8:jsmd.TVE.mode,
							prop9:jsmd.TVE.videoFranchise,
							eVar9:jsmd.TVE.videoFranchise,
							prop10:jsmd.TVE.fullEpisode,
							eVar10:jsmd.TVE.fullEpisode,
							prop11:jsmd.TVE.playerLocation,
							eVar11:jsmd.TVE.playerLocation,
							prop14:jsmd.TVE.liveStreamName,
							eVar14:jsmd.TVE.liveStreamName,
							prop16:jsmd.TVE.authState,
							eVar16:jsmd.TVE.authState,
							prop19:jsmd.TVE.userID,
							eVar19:jsmd.TVE.userID,
							prop20:"0:content",
							eVar20:"0:content",
							linkTrackVars:"events,products,prop1,eVar1,prop2,eVar2,prop4,eVar4,prop5,eVar5,prop6,eVar6,prop7,eVar7,prop8,eVar8,prop9,eVar9,prop10,eVar10,prop11,eVar11,prop13,eVar13,prop14,eVar14,prop16,eVar16,prop19,eVar19,prop20,eVar20,prop35,eVar35,prop46,eVar46,prop47,eVar47"
					};
	            	if(adTotal){
	            		s_data["linkTrackEvents"] = "event13,event15,event23,event21";
	            		s_data["events"] = "event13,event15,event23,event21";
	            	}else {
	            		s_data["linkTrackEvents"] = "event13,event15,event23";
            			s_data["events"] = "event13,event15,event23";
	            	}

	            	this.set("business.vendor.sitecatalyst", s_data);
				}catch(e){}

				this.send();

				sendComscoreVideoMetrixBeacon(data.contentId,1);	//content-related comscore call
				sendNielsenVideoCensusBeacon(this.get("m:nielsen"),"start",data.contentId,data.title);
			},
			"tve-C4_video-progress": function(data, map) {

				var prodFranchise = data.franchise+"";
				prodFranchise = prodFranchise.replace(/\,|\;/gi, "");
				var prodTitle = data.title+"";
				prodTitle = prodTitle.replace(/\,|\;/gi, "");

				var event22cal = (Math.round(jsmd.TVE.totalAdDurations) - Math.round(jsmd.TVE.prevAdEvent22)) - (jsmd.TVE.adIntervalsCount*60);

				if(!jsmd.TVE.isAdPlayTimeSet && event22cal > jsmd.TVE.event22cal){
					jsmd.TVE.prevAdEvent22 += event22cal;
					this.set("tve.products",(";"+prodFranchise+":"+prodTitle+";;;event7="+"60"+"|event22="+event22cal));
				} else {
					this.set("tve.products",(";"+prodFranchise+":"+prodTitle+";;;event7="+"60"));
				}

				var progressMarker = (data.grossProgressMarker)?data.grossProgressMarker+":content":"";

				this.set("action","link");
				this.set("link",{name: "video progress", type: "o"});

				try {
					var s_data = {
							account:jsmd.tveRSID,
							events:"event7,event20,event22",
							eVar1:jsmd.TVE.brand,
							eVar2:jsmd.TVE.host,
							eVar4:jsmd.TVE.channel,
							eVar5:jsmd.TVE.vidID,
							eVar6:jsmd.TVE.lastAirDate,
							eVar7:jsmd.TVE.dayssince,
							eVar8:jsmd.TVE.mode,
							eVar9:jsmd.TVE.videoFranchise,
							eVar10:jsmd.TVE.fullEpisode,
							eVar11:jsmd.TVE.playerLocation,
							eVar14:jsmd.TVE.liveStreamName,
							eVar16:jsmd.TVE.authState,
							eVar19:jsmd.TVE.userID,
							eVar20:progressMarker,
							linkTrackVars:"events,products,eVar1,eVar2,eVar4,eVar5,eVar6,eVar7,eVar8,eVar9,eVar10,eVar11,eVar13,eVar14,eVar16,eVar19,eVar20,prop35,eVar35,prop46,eVar46,prop47,eVar47"
					};
					this.set("business.vendor.sitecatalyst", s_data);

	            	if(!jsmd.TVE.isAdPlayTimeSet && event22cal > jsmd.TVE.event22cal){
	            		jsmd.TVE.isAdPlayTimeSet = true;
	            		jsmd.TVE.event22cal = event22cal;
	            		s_data["linkTrackEvents"] = "event7,event20,event22";
	            		s_data["events"] = "event7,event20,event22";
	            	}else {
	            		s_data["linkTrackEvents"] = "event7,event20";
	            		s_data["events"] = "event7,event20";
	            	}

				}catch(e){}

				this.send();
			},
			"tve-C4_video-complete": function(data, map) {

				var prodFranchise = data.franchise+"";
				prodFranchise = prodFranchise.replace(/\,|\;/gi, "");
				var prodTitle = data.title+"";
				prodTitle = prodTitle.replace(/\,|\;/gi, "");

				var adTotalPlayTime = (data.adTotalPlayTime)?data.adTotalPlayTime:0;
				if(!jsmd.TVE.isAdStart){
					jsmd.TVE.nonC3C4adNum = adTotalPlayTime*1;
				}

				var event22cal = Math.round((jsmd.TVE.totalAdDurations)) - (jsmd.TVE.adIntervalsCount*60);

				if(!jsmd.TVE.isAdPlayTimeSet && event22cal > jsmd.TVE.event22cal){
					this.set("tve.products",(";"+prodFranchise+":"+prodTitle+";;;event7="+"60"+"|event22="+event22cal));
				} else {
					this.set("tve.products",(";"+prodFranchise+":"+prodTitle+";;;event7="+"60"));
				}
				var progressMarker = (data.grossProgressMarker)?data.grossProgressMarker+":content":"";
				this.set("action","link");
				this.set("link",{name: "video complete", type: "o"});

				try {
					var s_data = {
							account:jsmd.tveRSID,
							events:"event7,event14,event20,event22",
							eVar1:jsmd.TVE.brand,
							eVar2:jsmd.TVE.host,
							eVar4:jsmd.TVE.channel,
							eVar5:jsmd.TVE.vidID,
							eVar6:jsmd.TVE.lastAirDate,
							eVar7:jsmd.TVE.dayssince,
							eVar8:jsmd.TVE.mode,
							eVar9:jsmd.TVE.videoFranchise,
							eVar10:jsmd.TVE.fullEpisode,
							eVar11:jsmd.TVE.playerLocation,
							eVar14:jsmd.TVE.liveStreamName,
							eVar16:jsmd.TVE.authState,
							eVar19:jsmd.TVE.userID,
							eVar20:progressMarker,
							linkTrackVars:"events,products,eVar1,eVar2,eVar4,eVar5,eVar6,eVar7,eVar8,eVar9,eVar10,eVar11,eVar13,eVar14,eVar16,eVar19,eVar20,prop35,eVar35,prop46,eVar46,prop47,eVar47"
					};
					if(!jsmd.TVE.isAdPlayTimeSet && event22cal > jsmd.TVE.event22cal){
	            		jsmd.TVE.isAdPlayTimeSet = true;
	            		jsmd.TVE.event22cal = event22cal;
	            		s_data["linkTrackEvents"] = "event7,event14,event20,event22";
	            		s_data["events"] = "event7,event14,event20,event22";
	            	}else {
	            		s_data["linkTrackEvents"] = "event7,event14,event20";
	            		s_data["events"] = "event7,event14,event20";
	            	}
	            	this.set("business.vendor.sitecatalyst", s_data);
				}catch(e){}

				this.send();

				sendNielsenVideoCensusBeacon(this.get("m:nielsen"),"complete",data.contentId,data.title,data.trt);
			},
			"tve-C4_ad-progress": function(data, map){
				jsmd.TVE.isAdPlayTimeSet = false;
				jsmd.TVE.isAdStart = true;

				this.set("action","link");
				this.set("link",{name: "ad progress", type: "o"});

				var totalPlayTime = "";
				if (data.totalPlayTime){
					totalPlayTime = (jsmd.TVE.prevTotalPlayTime != 0)?((data.totalPlayTime*1) - jsmd.TVE.prevTotalPlayTime)+"":data.totalPlayTime;
					jsmd.TVE.prevTotalPlayTime = (data.totalPlayTime*1);
				} else {
					totalPlayTime = "60";
				}
				jsmd.TVE.adIntervalsCount += 1;

				var grossProgressMarker = (data.grossProgressMarker)?data.grossProgressMarker+":ad":"";

				var prodFranchise = jsmd.TVE.videoFranchise+"";
				prodFranchise = prodFranchise.replace(/\,|\;/gi, "");
				var prodTitle = jsmd.TVE.videoTitle+"";
				prodTitle = prodTitle.replace(/\,|\;/gi, "");

				this.set("tve.products",(";"+prodFranchise+":"+prodTitle+";;;event7="+"0"+"|event22="+"60"));
				try {
					var s_data = {
							account:jsmd.tveRSID,
							events:"event7,event20,event22",
							eVar1:jsmd.TVE.brand,
							eVar2:jsmd.TVE.host,
							eVar4:jsmd.TVE.channel,
							eVar5:jsmd.TVE.vidID,
							eVar6:jsmd.TVE.lastAirDate,
							eVar7:jsmd.TVE.dayssince,
							eVar8:jsmd.TVE.mode,
							eVar9:jsmd.TVE.videoFranchise,
							eVar10:jsmd.TVE.fullEpisode,
							eVar11:jsmd.TVE.playerLocation,
							eVar14:jsmd.TVE.liveStreamName,
							eVar16:jsmd.TVE.authState,
							eVar19:jsmd.TVE.userID,
							eVar20:grossProgressMarker,
							linkTrackVars:"events,products,eVar1,eVar2,eVar4,eVar5,eVar6,eVar7,eVar8,eVar9,eVar10,eVar11,eVar13,eVar14,eVar16,eVar19,eVar20,prop35,eVar35,prop46,eVar46,prop47,eVar47"
					};
	            	this.set("business.vendor.sitecatalyst", s_data);
				}catch(e){}
				this.send();
			},
			"tve-C3A_video-start": function(data, map) {
				var adTotalPlayTime = (data.adTotalPlayTime)?data.adTotalPlayTime:0;
				if(!jsmd.TVE.isAdStart){
					jsmd.TVE.nonC3C4adNum = adTotalPlayTime*1;
				}


				var MSO = jsmd.tveMSO;
				this.set("tve.page.name", data.franchise+":"+data.title);
				jsmd.TVE.pageName = this.get("tve.page.name");
				this.set("tve.video_title", data.title);//prop12
				jsmd.TVE.videoTitle = this.get("tve.video_title");
				jsmd.TVE.brand = this.get("tve.brand");
				var distribName = MSO;
				if (MSO == "Unauthorized")
				{
						distribName = "unspecified mvpd";
						jsmd.TVE.authState = "not authenticated";
				}
				this.set("tve.host_location", distribName+":"+jsmd.TVE.brand);//prop2,eVar2
				jsmd.TVE.host = this.get("tve.host_location");
				this.set("tve.content_id", data.contentId);//prop5,eVar5
				jsmd.TVE.vidID = this.get("tve.content_id");
				this.set("tve.publication_date", data.lastAirDate);//prop6,eVar6
				jsmd.TVE.lastAirDate = this.get("tve.publication_date");
				this.set("tve.days_since_publication", data.dayssince);//prop7,eVar7
				jsmd.TVE.dayssince = this.get("tve.days_since_publication");
				this.set("tve.mode", "C3A");//prop8,eVar8
				jsmd.TVE.mode = "C3A";
				this.set("tve.franchise", data.franchise);//prop9,eVar9
				jsmd.TVE.videoFranchise = this.get("tve.franchise");
				jsmd.TVE.playerLocation = jsmd.get("tve.player_location");
				this.set("tve.video.authentication", jsmd.TVE.authState);//prop16,eVar16
				this.set("tve.user_id", jsmd.TVE.userID);// prop19,eVar19
				var grossLength = (data.grossLength)?data.grossLength:(data.trt)?data.trt:"";
				this.set("tve.full_episode_length", data.franchise+":"+data.title+":"+grossLength);//prop10,eVar10
				jsmd.TVE.fullEpisode = this.get("tve.full_episode_length");

				var prodFranchise = data.franchise+"";
				prodFranchise = prodFranchise.replace(/\,|\;/gi, "");
				var prodTitle = data.title+"";
				prodTitle = prodTitle.replace(/\,|\;/gi, "");

				var adTotal = null;
				if (data.grossLength && data.duration){
					adTotal = ((data.grossLength*1) - (data.duration*1))
				}

				if (!adTotal){
					ad_duration = "";
					this.set("tve.products", (";"+prodFranchise+":"+prodTitle+";;;event9="+data.trt))//products
				}else {
					this.set("tve.products", (";"+prodFranchise+":"+prodTitle+";;;event9="+data.trt+"|event21="+adTotal))//products
				}

				try {
					var s_data = {
							account:jsmd.tveRSID,
							events:"event9,event13,event15,event21",
							prop1:jsmd.TVE.brand,
							eVar1:jsmd.TVE.brand,
							prop2:jsmd.TVE.host,
							eVar2:jsmd.TVE.host,
							prop4:jsmd.TVE.channel,
							eVar4:jsmd.TVE.channel,
							prop5:jsmd.TVE.vidID,
							eVar5:jsmd.TVE.vidID,
							prop6:jsmd.TVE.lastAirDate,
							eVar6:jsmd.TVE.lastAirDate,
							prop7:jsmd.TVE.dayssince,
							eVar7:jsmd.TVE.dayssince,
							prop8:jsmd.TVE.mode,
							eVar8:jsmd.TVE.mode,
							prop9:jsmd.TVE.videoFranchise,
							eVar9:jsmd.TVE.videoFranchise,
							prop10:jsmd.TVE.fullEpisode,
							eVar10:jsmd.TVE.fullEpisode,
							prop11:jsmd.TVE.playerLocation,
							eVar11:jsmd.TVE.playerLocation,
							prop14:jsmd.TVE.liveStreamName,
							eVar14:jsmd.TVE.liveStreamName,
							prop16:jsmd.TVE.authState,
							eVar16:jsmd.TVE.authState,
							prop19:jsmd.TVE.userID,
							eVar19:jsmd.TVE.userID,
							prop13:"0:content",
							eVar13:"0:content",
							linkTrackVars:"events,products,prop1,eVar1,prop2,eVar2,prop4,eVar4,prop5,eVar5,prop6,eVar6,prop7,eVar7,prop8,eVar8,prop9,eVar9,prop10,eVar10,prop11,eVar11,prop13,eVar13,prop14,eVar14,prop16,eVar16,prop19,eVar19,prop20,eVar20,prop35,eVar35,prop46,eVar46,prop47,eVar47"
					};
					if(adTotal){
	            		s_data["linkTrackEvents"] = "event9,event13,event15,event21";
	            		s_data["events"] = "event9,event13,event15,event21";
	            	}else {
	            		s_data["linkTrackEvents"] = "event9,event13,event15";
	            		s_data["events"] = "event9,event13,event15";
	            	}

	            	this.set("business.vendor.sitecatalyst", s_data);
				}catch(e){}

				this.send();

				sendComscoreVideoMetrixBeacon(data.contentId,1);	//content-related comscore call
				sendNielsenVideoCensusBeacon(this.get("m:nielsen"),"start",data.contentId,data.title);
			},
			"tve-C3A_video-progress": function(data, map) {

				var prodFranchise = data.franchise+"";
				prodFranchise = prodFranchise.replace(/\,|\;/gi, "");
				var prodTitle = data.title+"";
				prodTitle = prodTitle.replace(/\,|\;/gi, "");

				var adTotalPlayTime = (data.adTotalPlayTime)?data.adTotalPlayTime:0;
				if(!jsmd.TVE.isAdStart){
					jsmd.TVE.nonC3C4adNum = adTotalPlayTime*1;
				}

				var adPlayTime = (data.playheadTime)?(data.playheadTime*1) - (jsmd.TVE.lastPlayHeadTime*1):0; //playheadTime
				adPlayTime = (adPlayTime<=0)?data.playheadTime:adPlayTime;
				jsmd.TVE.lastPlayHeadTime = (adPlayTime <= 0)?data.playheadTime:adPlayTime;

				var lastAdPlayTime = ((adTotalPlayTime*1)-(jsmd.TVE.nonC3C4adNum*1) - (jsmd.TVE.allAdIntervlNum*1));
				if (lastAdPlayTime <0){ lastAdPlayTime = lastAdPlayTime*(-1); }

				if(!jsmd.TVE.isAdPlayTimeSet && adTotalPlayTime>0 && lastAdPlayTime >0){
					this.set("tve.products",(";"+prodFranchise+":"+prodTitle+";;;event5="+"60"+"|event22="+lastAdPlayTime));
				} else {
					this.set("tve.products",(";"+prodFranchise+":"+prodTitle+";;;event5="+"60"));
				}

				var progressMarker = (data.grossProgressMarker)?data.grossProgressMarker+":content":"";

				this.set("action","link");
				this.set("link",{name: "video progress", type: "o"});

				try {
					var s_data = {
							account:jsmd.tveRSID,
							events:"event5,event20,event22",
							eVar1:jsmd.TVE.brand,
							eVar2:jsmd.TVE.host,
							eVar4:jsmd.TVE.channel,
							eVar5:jsmd.TVE.vidID,
							eVar6:jsmd.TVE.lastAirDate,
							eVar7:jsmd.TVE.dayssince,
							eVar8:jsmd.TVE.mode,
							eVar9:jsmd.TVE.videoFranchise,
							eVar10:jsmd.TVE.fullEpisode,
							eVar11:jsmd.TVE.playerLocation,
							eVar14:jsmd.TVE.liveStreamName,
							eVar16:jsmd.TVE.authState,
							eVar19:jsmd.TVE.userID,
							eVar13:progressMarker,
							linkTrackVars:"events,products,eVar1,eVar2,eVar4,eVar5,eVar6,eVar7,eVar8,eVar9,eVar10,eVar11,eVar13,eVar14,eVar16,eVar19,eVar20,prop35,eVar35,prop46,eVar46,prop47,eVar47"
					};

					if(!jsmd.TVE.isAdPlayTimeSet && adTotalPlayTime>0 && lastAdPlayTime >0){
	            		jsmd.TVE.isAdPlayTimeSet = true;
	            		s_data["linkTrackEvents"] = "event5,event20,event22";
	            		s_data["events"] = "event5,event20,event22";
	            	}else {
	            		s_data["linkTrackEvents"] = "event5,event20";
	            		s_data["events"] = "event5,event20";
	            	}

					this.set("business.vendor.sitecatalyst", s_data);

				}catch(e){}

				this.send();
			},
			"tve-C3A_video-complete": function(data, map) {

				var prodFranchise = data.franchise+"";
				prodFranchise = prodFranchise.replace(/\,|\;/gi, "");
				var prodTitle = data.title+"";
				prodTitle = prodTitle.replace(/\,|\;/gi, "");

				var adTotalPlayTime = (data.adTotalPlayTime)?data.adTotalPlayTime:0;
				if(!jsmd.TVE.isAdStart){
					jsmd.TVE.nonC3C4adNum = adTotalPlayTime*1;
				}

				var event22cal = Math.round((jsmd.TVE.totalAdDurations)) - (jsmd.TVE.adIntervalsCount*60);

				if(!jsmd.TVE.isAdPlayTimeSet && event22cal > jsmd.TVE.event22cal){
					this.set("tve.products",(";"+prodFranchise+":"+prodTitle+";;;event5="+"60"+"|event22="+event22cal));
				} else {
					this.set("tve.products",(";"+prodFranchise+":"+prodTitle+";;;event5="+"60"));
				}
				var progressMarker = (data.grossProgressMarker)?data.grossProgressMarker+":content":"";
				this.set("action","link");
				this.set("link",{name: "video complete", type: "o"});

				try {
					var s_data = {
							account:jsmd.tveRSID,
							events:"event5,event14,event20,event22",
							eVar1:jsmd.TVE.brand,
							eVar2:jsmd.TVE.host,
							eVar4:jsmd.TVE.channel,
							eVar5:jsmd.TVE.vidID,
							eVar6:jsmd.TVE.lastAirDate,
							eVar7:jsmd.TVE.dayssince,
							eVar8:jsmd.TVE.mode,
							eVar9:jsmd.TVE.videoFranchise,
							eVar10:jsmd.TVE.fullEpisode,
							eVar11:jsmd.TVE.playerLocation,
							eVar14:jsmd.TVE.liveStreamName,
							eVar16:jsmd.TVE.authState,
							eVar19:jsmd.TVE.userID,
							eVar13:progressMarker,
							linkTrackVars:"events,products,eVar1,eVar2,eVar4,eVar5,eVar6,eVar7,eVar8,eVar9,eVar10,eVar11,eVar13,eVar14,eVar16,eVar19,eVar20,prop35,eVar35,prop46,eVar46,prop47,eVar47"
					};
					if(!jsmd.TVE.isAdPlayTimeSet && event22cal > jsmd.TVE.event22cal){
	            		jsmd.TVE.isAdPlayTimeSet = true;
	            		jsmd.TVE.event22cal = event22cal;
	            		s_data["linkTrackEvents"] = "event5,event14,event20,event22";
	            		s_data["events"] = "event5,event14,event20,event22";
	            	}else {
	            		s_data["linkTrackEvents"] = "event5,event14,event20";
	            		s_data["events"] = "event5,event14,event20";
	            	}
	            	this.set("business.vendor.sitecatalyst", s_data);
				}catch(e){}

				this.send();

				sendNielsenVideoCensusBeacon(this.get("m:nielsen"),"complete",data.contentId,data.title,data.trt);
			},
			"tve-C3_video-start": function(data, map) {
				var adTotalPlayTime = (data.adTotalPlayTime)?data.adTotalPlayTime:0;
				if(!jsmd.TVE.isAdStart){
					jsmd.TVE.nonC3C4adNum = adTotalPlayTime*1;
				}


				var MSO = jsmd.tveMSO;
				this.set("tve.page.name", data.franchise+":"+data.title);
				jsmd.TVE.pageName = this.get("tve.page.name");
				this.set("tve.video_title", data.title);//prop12
				jsmd.TVE.videoTitle = this.get("tve.video_title");
				jsmd.TVE.brand = this.get("tve.brand");
				var distribName = MSO;
				if (MSO == "Unauthorized")
				{
						distribName = "unspecified mvpd";
						jsmd.TVE.authState = "not authenticated";
				}
				this.set("tve.host_location", distribName+":"+jsmd.TVE.brand);//prop2,eVar2
				jsmd.TVE.host = this.get("tve.host_location");
				this.set("tve.content_id", data.contentId);//prop5,eVar5
				jsmd.TVE.vidID = this.get("tve.content_id");
				this.set("tve.publication_date", data.lastAirDate);//prop6,eVar6
				jsmd.TVE.lastAirDate = this.get("tve.publication_date");
				this.set("tve.days_since_publication", data.dayssince);//prop7,eVar7
				jsmd.TVE.dayssince = this.get("tve.days_since_publication");
				this.set("tve.mode", data.tveMode);//prop8,eVar8
				jsmd.TVE.mode = this.get("tve.mode");
				this.set("tve.franchise", data.franchise);//prop9,eVar9
				jsmd.TVE.videoFranchise = this.get("tve.franchise");
				jsmd.TVE.playerLocation = jsmd.get("tve.player_location");
				this.set("tve.video.authentication", jsmd.TVE.authState);//prop16,eVar16
				this.set("tve.user_id", jsmd.TVE.userID);// prop19,eVar19
				var grossLength = (data.grossLength)?data.grossLength:(data.trt)?data.trt:"";
				this.set("tve.full_episode_length", data.franchise+":"+data.title+":"+grossLength);//prop10,eVar10
				jsmd.TVE.fullEpisode = this.get("tve.full_episode_length");

				var prodFranchise = data.franchise+"";
				prodFranchise = prodFranchise.replace(/\,|\;/gi, "");
				var prodTitle = data.title+"";
				prodTitle = prodTitle.replace(/\,|\;/gi, "");

				var adTotal = null;
				if (data.grossLength && data.duration){
					adTotal = ((data.grossLength*1) - (data.duration*1))
				}

				if (!adTotal){
					ad_duration = "";
					this.set("tve.products", (";"+prodFranchise+":"+prodTitle+";;;event8="+data.trt))//products
				}else {
					this.set("tve.products", (";"+prodFranchise+":"+prodTitle+";;;event8="+data.trt+"|event21="+adTotal))//products
				}

				try {
					var s_data = {
							account:jsmd.tveRSID,
							events:"event8,event13,event15,event21",
							prop1:jsmd.TVE.brand,
							eVar1:jsmd.TVE.brand,
							prop2:jsmd.TVE.host,
							eVar2:jsmd.TVE.host,
							prop4:jsmd.TVE.channel,
							eVar4:jsmd.TVE.channel,
							prop5:jsmd.TVE.vidID,
							eVar5:jsmd.TVE.vidID,
							prop6:jsmd.TVE.lastAirDate,
							eVar6:jsmd.TVE.lastAirDate,
							prop7:jsmd.TVE.dayssince,
							eVar7:jsmd.TVE.dayssince,
							prop8:jsmd.TVE.mode,
							eVar8:jsmd.TVE.mode,
							prop9:jsmd.TVE.videoFranchise,
							eVar9:jsmd.TVE.videoFranchise,
							prop10:jsmd.TVE.fullEpisode,
							eVar10:jsmd.TVE.fullEpisode,
							prop11:jsmd.TVE.playerLocation,
							eVar11:jsmd.TVE.playerLocation,
							prop14:jsmd.TVE.liveStreamName,
							eVar14:jsmd.TVE.liveStreamName,
							prop16:jsmd.TVE.authState,
							eVar16:jsmd.TVE.authState,
							prop19:jsmd.TVE.userID,
							eVar19:jsmd.TVE.userID,
							prop13:"0:content",
							eVar13:"0:content",
							linkTrackVars:"events,products,prop1,eVar1,prop2,eVar2,prop4,eVar4,prop5,eVar5,prop6,eVar6,prop7,eVar7,prop8,eVar8,prop9,eVar9,prop10,eVar10,prop11,eVar11,prop13,eVar13,prop14,eVar14,prop16,eVar16,prop19,eVar19,prop20,eVar20,prop35,eVar35,prop46,eVar46,prop47,eVar47"
					};
					if(adTotal){
	            		s_data["linkTrackEvents"] = "event8,event13,event15,event21";
	            		s_data["events"] = "event8,event13,event15,event21";
	            	}else {
	            		s_data["linkTrackEvents"] = "event8,event13,event15";
	            		s_data["events"] = "event8,event13,event15";
	            	}

	            	this.set("business.vendor.sitecatalyst", s_data);
				}catch(e){}

				this.send();

				sendComscoreVideoMetrixBeacon(data.contentId,1);	//content-related comscore call
				sendNielsenVideoCensusBeacon(this.get("m:nielsen"),"start",data.contentId,data.title);
			},
			"tve-C3_video-progress": function(data, map) {

				var prodFranchise = data.franchise+"";
				prodFranchise = prodFranchise.replace(/\,|\;/gi, "");
				var prodTitle = data.title+"";
				prodTitle = prodTitle.replace(/\,|\;/gi, "");

				var adTotalPlayTime = (data.adTotalPlayTime)?data.adTotalPlayTime:0;
				if(!jsmd.TVE.isAdStart){
					jsmd.TVE.nonC3C4adNum = adTotalPlayTime*1;
				}

				var adPlayTime = (data.playheadTime)?(data.playheadTime*1) - (jsmd.TVE.lastPlayHeadTime*1):0; //playheadTime
				adPlayTime = (adPlayTime<=0)?data.playheadTime:adPlayTime;
				jsmd.TVE.lastPlayHeadTime = (adPlayTime <= 0)?data.playheadTime:adPlayTime;

				var lastAdPlayTime = ((adTotalPlayTime*1)-(jsmd.TVE.nonC3C4adNum*1) - (jsmd.TVE.allAdIntervlNum*1));
				if (lastAdPlayTime <0){ lastAdPlayTime = lastAdPlayTime*(-1); }

				if(!jsmd.TVE.isAdPlayTimeSet && adTotalPlayTime>0 && lastAdPlayTime >0){
					this.set("tve.products",(";"+prodFranchise+":"+prodTitle+";;;event6="+"60"+"|event22="+lastAdPlayTime));
				} else {
					this.set("tve.products",(";"+prodFranchise+":"+prodTitle+";;;event6="+"60"));
				}

				var progressMarker = (data.grossProgressMarker)?data.grossProgressMarker+":content":"";

				this.set("action","link");
				this.set("link",{name: "video progress", type: "o"});

				try {
					var s_data = {
							account:jsmd.tveRSID,
							events:"event6,event20,event22",
							eVar1:jsmd.TVE.brand,
							eVar2:jsmd.TVE.host,
							eVar4:jsmd.TVE.channel,
							eVar5:jsmd.TVE.vidID,
							eVar6:jsmd.TVE.lastAirDate,
							eVar7:jsmd.TVE.dayssince,
							eVar8:jsmd.TVE.mode,
							eVar9:jsmd.TVE.videoFranchise,
							eVar10:jsmd.TVE.fullEpisode,
							eVar11:jsmd.TVE.playerLocation,
							eVar14:jsmd.TVE.liveStreamName,
							eVar16:jsmd.TVE.authState,
							eVar19:jsmd.TVE.userID,
							eVar13:progressMarker,
							linkTrackVars:"events,products,eVar1,eVar2,eVar4,eVar5,eVar6,eVar7,eVar8,eVar9,eVar10,eVar11,eVar13,eVar14,eVar16,eVar19,eVar20,prop35,eVar35,prop46,eVar46,prop47,eVar47"
					};

					if(!jsmd.TVE.isAdPlayTimeSet && adTotalPlayTime>0 && lastAdPlayTime >0){
	            		jsmd.TVE.isAdPlayTimeSet = true;
	            		s_data["linkTrackEvents"] = "event6,event20,event22";
	            		s_data["events"] = "event6,event20,event22";
	            	}else {
	            		s_data["linkTrackEvents"] = "event6,event20";
	            		s_data["events"] = "event6,event20";
	            	}


					this.set("business.vendor.sitecatalyst", s_data);

				}catch(e){}

				this.send();
			},
			"tve-C3_video-complete": function(data, map) {

				var prodFranchise = data.franchise+"";
				prodFranchise = prodFranchise.replace(/\,|\;/gi, "");
				var prodTitle = data.title+"";
				prodTitle = prodTitle.replace(/\,|\;/gi, "");

				var adTotalPlayTime = (data.adTotalPlayTime)?data.adTotalPlayTime:0;
				if(!jsmd.TVE.isAdStart){
					jsmd.TVE.nonC3C4adNum = adTotalPlayTime*1;
				}

				var adPlayTime = (data.playheadTime)?(data.playheadTime*1) - (jsmd.TVE.lastPlayHeadTime*1):0; //playheadTime
				adPlayTime = (adPlayTime<=0)?data.playheadTime:adPlayTime;
				jsmd.TVE.lastPlayHeadTime = (adPlayTime <= 0)?data.playheadTime:adPlayTime;

				var lastAdPlayTime = ((adTotalPlayTime*1)-(jsmd.TVE.nonC3C4adNum*1) - (jsmd.TVE.allAdIntervlNum*1));
				if (lastAdPlayTime <0){ lastAdPlayTime = lastAdPlayTime*(-1); }

				if(!jsmd.TVE.isAdPlayTimeSet && adTotalPlayTime>0 && lastAdPlayTime >0){
					this.set("tve.products",(";"+prodFranchise+":"+prodTitle+";;;event6=60|event22="+lastAdPlayTime));
				} else {
					this.set("tve.products",(";"+prodFranchise+":"+prodTitle+";;;event6=60"));
				}
				var progressMarker = (data.grossProgressMarker)?data.grossProgressMarker+":content":"";

				this.set("action","link");
				this.set("link",{name: "video complete", type: "o"});

				try {
					var s_data = {
							account:jsmd.tveRSID,
							events:"event6,event14,event20,event22",
							eVar1:jsmd.TVE.brand,
							eVar2:jsmd.TVE.host,
							eVar4:jsmd.TVE.channel,
							eVar5:jsmd.TVE.vidID,
							eVar6:jsmd.TVE.lastAirDate,
							eVar7:jsmd.TVE.dayssince,
							eVar8:jsmd.TVE.mode,
							eVar9:jsmd.TVE.videoFranchise,
							eVar10:jsmd.TVE.fullEpisode,
							eVar11:jsmd.TVE.playerLocation,
							eVar14:jsmd.TVE.liveStreamName,
							eVar16:jsmd.TVE.authState,
							eVar19:jsmd.TVE.userID,
							eVar13:progressMarker,
							linkTrackVars:"events,products,eVar1,eVar2,eVar4,eVar5,eVar6,eVar7,eVar8,eVar9,eVar10,eVar11,eVar13,eVar14,eVar16,eVar19,eVar20,prop35,eVar35,prop46,eVar46,prop47,eVar47"
					};
					if(!jsmd.TVE.isAdPlayTimeSet && adTotalPlayTime>0 && lastAdPlayTime >0){
	            		jsmd.TVE.isAdPlayTimeSet = true;
	            		s_data["linkTrackEvents"] = "event6,event14,event20,event22";
	            		s_data["events"] = "event6,event14,event20,event22";
	            	}else {
	            		s_data["linkTrackEvents"] = "event6,event14,event20";
	            		s_data["events"] = "event6,event14,event20";
	            	}
	            	this.set("business.vendor.sitecatalyst", s_data);
				}catch(e){}

				this.send();

				sendNielsenVideoCensusBeacon(this.get("m:nielsen"),"complete",data.contentId,data.title,data.trt);
			},
			"tve-C3_ad-progress": function(data, map){
				jsmd.TVE.isAdPlayTimeSet = false;
				jsmd.TVE.isAdStart = true;

				this.set("action","link");
				this.set("link",{name: "ad progress", type: "o"});

				var totalPlayTime = "";
				if (data.totalPlayTime){
					totalPlayTime = (jsmd.TVE.prevTotalPlayTime != 0)?((data.totalPlayTime*1) - jsmd.TVE.prevTotalPlayTime)+"":data.totalPlayTime;
					jsmd.TVE.prevTotalPlayTime = (data.totalPlayTime*1);
				} else {
					totalPlayTime = "60";
				}
				var adTotalPlayTime = (data.adTotalPlayTime)?data.adTotalPlayTime:"";
				var adPlayTime = (data.playheadTime)?(data.playheadTime*1) - (jsmd.TVE.lastPlayHeadTime*1):0; //playheadTime
				adPlayTime = (adPlayTime<=0)?data.playheadTime:adPlayTime;
				jsmd.TVE.lastPlayHeadTime = (data.playheadTime)?(data.playheadTime*1):adPlayTime;
				jsmd.TVE.allAdIntervlNum += adPlayTime;

				var grossProgressMarker = (data.grossProgressMarker)?data.grossProgressMarker+":ad":"";

				var prodFranchise = jsmd.TVE.videoFranchise+"";
				prodFranchise = prodFranchise.replace(/\,|\;/gi, "");
				var prodTitle = jsmd.TVE.videoTitle+"";
				prodTitle = prodTitle.replace(/\,|\;/gi, "");

				if(adPlayTime != "" && adPlayTime > 0){
					this.set("tve.products",(";"+prodFranchise+":"+prodTitle+";;;event6="+"60"+"|event22="+adPlayTime));
				}else{
					this.set("tve.products",(";"+prodFranchise+":"+prodTitle+";;;event6="+"60"));
				}

				try {
					var s_data = {
							account:jsmd.tveRSID,
							events:"event6,event20,event22",
							eVar1:jsmd.TVE.brand,
							eVar2:jsmd.TVE.host,
							eVar4:jsmd.TVE.channel,
							eVar5:jsmd.TVE.vidID,
							eVar6:jsmd.TVE.lastAirDate,
							eVar7:jsmd.TVE.dayssince,
							eVar8:jsmd.TVE.mode,
							eVar9:jsmd.TVE.videoFranchise,
							eVar10:jsmd.TVE.fullEpisode,
							eVar11:jsmd.TVE.playerLocation,
							eVar14:jsmd.TVE.liveStreamName,
							eVar16:jsmd.TVE.authState,
							eVar19:jsmd.TVE.userID,
							eVar13:grossProgressMarker,
							linkTrackVars:"events,products,eVar1,eVar2,eVar4,eVar5,eVar6,eVar7,eVar8,eVar9,eVar10,eVar11,eVar13,eVar14,eVar16,eVar19,eVar20,prop35,eVar35,prop46,eVar46,prop47,eVar47"
					};
					if(adPlayTime != "" && adPlayTime > 0){
	            		s_data["linkTrackEvents"] = "event6,event20,event22";
	            		s_data["events"] = "event6,event20,event22";
	            	}else {
	            		s_data["linkTrackEvents"] = "event6,event20";
	            		s_data["events"] = "event6,event20";
	            	}
	            	this.set("business.vendor.sitecatalyst", s_data);
				}catch(e){}
				this.send();
			},
			"tve-live_video-start": function(data, map) {

				var MSO = jsmd.tveMSO;
				this.set("tve.page.name", data.sPageName);
				jsmd.TVE.pageName = this.get("tve.page.name");
				this.set("tve.video_title", data.title);//prop12
				jsmd.TVE.videoTitle = this.get("tve.video_title");
				jsmd.TVE.brand = this.get("tve.brand");
				var distribName = MSO;
				if (MSO == "Unauthorized")
				{
						distribName = "unspecified mvpd";
						jsmd.TVE.authState = "not authenticated";
				}
				this.set("tve.host_location", distribName+":"+jsmd.TVE.brand);//prop2,eVar2
				jsmd.TVE.host = this.get("tve.host_location");
				this.set("tve.content_id", data.contentId);//prop5,eVar5
				jsmd.TVE.vidID = this.get("tve.content_id");
				this.set("tve.publication_date", data.lastAirDate);//prop6,eVar6
				jsmd.TVE.lastAirDate = this.get("tve.publication_date");
				this.set("tve.days_since_publication", data.dayssince);//prop7,eVar7
				jsmd.TVE.dayssince = this.get("tve.days_since_publication");
				this.set("tve.mode", "live");//prop8,eVar8
				jsmd.TVE.mode = "live";
				this.set("tve.franchise", data.franchise);//prop9,eVar9
				jsmd.TVE.videoFranchise = this.get("tve.franchise");
				jsmd.TVE.playerLocation = jsmd.get("tve.player_location");
				this.set("tve.video.live.stream", data.id);//prop14,eVar14
				jsmd.TVE.liveStreamName = data.id;//tve.video.live.stream refuses to set. have to explicitly set data.id
				this.set("tve.video.authentication", jsmd.TVE.authState);//prop16,eVar16
				this.set("tve.user_id", jsmd.TVE.userID);// prop19,eVar19
				jsmd.TVE.fullEpisode = this.get("tve.full_episode_length");

				this.set("tve.products", (";"+data.sPageName));

				try {
					var s_data = {
							account:jsmd.tveRSID,
							events:"event13,event27",
							prop1:jsmd.TVE.brand,
							eVar1:jsmd.TVE.brand,
							prop2:jsmd.TVE.host,
							eVar2:jsmd.TVE.host,
							prop4:jsmd.TVE.channel,
							eVar4:jsmd.TVE.channel,
							prop5:jsmd.TVE.vidID,
							eVar5:jsmd.TVE.vidID,
							prop6:jsmd.TVE.lastAirDate,
							eVar6:jsmd.TVE.lastAirDate,
							prop7:jsmd.TVE.dayssince,
							eVar7:jsmd.TVE.dayssince,
							prop8:jsmd.TVE.mode,
							eVar8:jsmd.TVE.mode,
							prop9:jsmd.TVE.videoFranchise,
							eVar9:jsmd.TVE.videoFranchise,
							prop10:jsmd.TVE.fullEpisode,
							eVar10:jsmd.TVE.fullEpisode,
							prop11:jsmd.TVE.playerLocation,
							eVar11:jsmd.TVE.playerLocation,
							prop14:jsmd.TVE.liveStreamName,
							eVar14:jsmd.TVE.liveStreamName,
							prop16:jsmd.TVE.authState,
							eVar16:jsmd.TVE.authState,
							prop19:jsmd.TVE.userID,
							eVar19:jsmd.TVE.userID,
							linkTrackVars:"events,products,prop1,eVar1,prop2,eVar2,prop4,eVar4,prop5,eVar5,prop6,eVar6,prop7,eVar7,prop8,eVar8,prop9,eVar9,prop10,eVar10,prop11,eVar11,prop13,eVar13,prop14,eVar14,prop16,eVar16,prop19,eVar19,prop20,eVar20,prop35,eVar35,prop46,eVar46,prop47,eVar47"
					};
	            	this.set("business.vendor.sitecatalyst", s_data);
				}catch(e){}

				this.send();

				sendComscoreVideoMetrixBeacon(data.contentId,1);	//content-related comscore call
				sendNielsenVideoCensusBeacon(this.get("m:nielsen"),"start",data.contentId,data.sPageName);
			},
			"tve-live_video-progress": function(data, map) {

				this.set("tve.products", (";"+data.sPageName+";;;event16=60"));

				this.set("action","link");
				this.set("link",{name: "video progress", type: "o"});

				try {
					var s_data = {
							account:jsmd.tveRSID,
							events:"event16,event20",
							eVar1:jsmd.TVE.brand,
							eVar2:jsmd.TVE.host,
							eVar4:jsmd.TVE.channel,
							eVar5:jsmd.TVE.vidID,
							eVar6:jsmd.TVE.lastAirDate,
							eVar7:jsmd.TVE.dayssince,
							eVar8:jsmd.TVE.mode,
							eVar9:jsmd.TVE.videoFranchise,
							eVar10:jsmd.TVE.fullEpisode,
							eVar11:jsmd.TVE.playerLocation,
							eVar14:jsmd.TVE.liveStreamName,
							eVar16:jsmd.TVE.authState,
							eVar19:jsmd.TVE.userID,
							linkTrackVars:"events,products,eVar1,eVar2,eVar4,eVar5,eVar6,eVar7,eVar8,eVar9,eVar10,eVar11,eVar13,eVar14,eVar16,eVar19,eVar20,prop35,eVar35,prop46,eVar46,prop47,eVar47"
					};
					this.set("business.vendor.sitecatalyst", s_data);

				}catch(e){}

				this.send();
			},
			"tve-live_video-complete": function(data, map) {
			},
			"mso_picker-open": function() {
				var s_data = {pageName:"TVE MVPD Picker"};
				this.set("business.vendor.sitecatalyst", s_data);
				this.send();
			},
			"tve_video-pause": function(data, map) {
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
				for(var i=unsetList.length-1;i>=0;i--) { vendorObject[unsetList[i]]="";} // Necessary to remove all previously defined values at the end of the call
				vendorObject.events="";
				vendorObject.products="";
			},
			setEvent: function(obj,key,value) {
				if(!value||!key) return;
				var e=(obj.events&&obj.events.length>0?obj.events.split(","):[]),etest=e.join(","); // Use a null event list if not already defined
				var k=(typeof(key)=="object"?key:[key]);
				for(var i=k.length-1;i>=0;i--) {
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
			var t=action.split("-");
			var c="";
			if(t.length > 0){
				t.pop();
				c = t.join("-");
			}
			var common=defaultDynamicNS[c+"-common"];
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
				var va = (v2.vendors)?new arrayExtender(v2.vendors):null;
				if(va&&typeof(va.forEach)=="function") {
					va.forEach(inDoVendorInitialize);
				}
			}
			m.dirty=0;
		};
		function inDoVendorInitialize(map) {
			var vendorLogic=me.config.vendor,n=map.name;
			if(!vendorLogic[n]){return;}
			var vendorInstantiate=vendorLogic[n].initialize,pre=map.prevendor,post=map.postvendor,acctKeys=map.account,emapKeys=map.eventmap,
				cmapKeys=map.settings,vmapKeys=map.variablemap,delimiter=v2.delimiter,dynamicFunctionCall=me.config.map.isDynamic;
			if(dynamicFunctionCall!=null && dynamicFunctionCall && map.dynamic_actions!=null) {
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
					var e=new arrayExtender(me.mdata.page.events),getChk=me.get(v),rval=null;
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
			var plug=me.plugin,defF=new arrayExtender(plug.tF),rval=v;
			try{
				if(typeof(defF)=="object"){rval=defF.dosequential(plug,rval);}
				if(typeof(defF)=="function"){rval=defF.call(plug,rval);}
			}catch(e){}
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
	arrayExtender.prototype = new Array();

	function arrayExtender(a){
		try{
			this.push.apply(this, a);
			return this;
		}catch(e){
			var err = e;
			return a;
		}
	}

	arrayExtender.prototype.forEach = (function(){
		var forEachFunction = function(f,tObj){
			var l=this.length,i;
			if((navigator.appVersion.indexOf("MSIE 7.")!=-1)){
				if(l == 0){
					try{
						l = 0;
						for(var p in this){
							var pName = p+"";
							if(!isNaN(parseInt(pName))){
								l+=1;
							}
						}
					}catch(e){}
				}
			}
			else if((navigator.appVersion.indexOf("MSIE 8.")!=-1))
			{
				try {
					var compatMode = _jsmd.plugin.gIreportgetMetaCompatible("IE=EmulateIE7");
					if((compatMode && compatMode.indexOf("EmulateIE7")!=-1)){
						if(l == 0){
							try{
								l = 0;
								for(var p in this){
									var pName = p+"";
									if(!isNaN(parseInt(pName))){
										l+=1;
									}
								}
							}catch(e){}
						}
					}
				} catch(e) {}
			}

			if(typeof f=="function"){
				for(i=0;i<l;i++){
					if(i in this){
						f.call(tObj,this[i],i,this);
					}
				}
			}
		};

	 	if((navigator.appVersion.indexOf("MSIE 7.")==-1)){
	 		return Array.prototype.forEach||forEachFunction;
		}else { return forEachFunction; }
	 })();

	arrayExtender.prototype.contains = Array.prototype.contains||function(obj){
		var i=this.length;
		if((navigator.appVersion.indexOf("MSIE 7.")!=-1)){
			if(i == 0 || !i){
				try{
					i = 0;
					for(var p in this){
						var pName = p+"";
						i+=1;
					}
				}catch(e){}
			}
		}
		while(i--){
			if(this[i]===obj){return true;}
		}
		return false;
	};

	arrayExtender.prototype.dosequential=function(o,val) {
		var rval=val,l=this.length;
		if((navigator.appVersion.indexOf("MSIE 7.")!=-1)){
			if(l == 0 || !l){
				try{
					l = 0;
					for(var p in this){
						var pName = p+"";
						l+=1;
					}
				}catch(e){}
			}
		}
		for (i=0;i<l;i++) {if(typeof(this[i])=="function"){rval=this[i].call(o,rval);}}
		return rval;
	};

	/**
	 *@function .jsmdBind
	 *Description: Binds the scope of any function call to the scope of the calling class, object or function. Once you use the .jsmdBind tag the scope can not be changed; if scope needs to change when function is called use .call() or .apply()
		Example:
			firstObject = {
				name: "First Object"
			}

			secondObject = {
				name: "Second Object",

			innerCall: function(value) {
				console.log(value + ", is in scope of" + this.name);
			}.jsmdBind(outerObject) // - bound to "outerObject" scope
			}

			innerObject.innerCall("This call");

			output:

			note: the output this.name is "First Object" not "Second Object".
	 *@param scope = the object that you want to keep in scope of.
	 */
	Function.prototype.jsmdBind = function(scope) {
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
	_w.JSON=window.JSON||null;
	if(!_w.JSON){_w.JSON={}}
	(function(){"use strict";function f(n){return n<10?'0'+n:n}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key)}if(typeof rep==='function'){value=rep.call(holder,key,value)}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null'}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null'}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==='string'){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v)}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v)}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v}}if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' '}}else if(typeof space==='string'){indent=space}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify')}return str('',{'':value})}}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j}throw new SyntaxError('JSON.parse')}}}());

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
if (!jsmd_gameInterval) var jsmd_gameInterval = 0;		//set generic game interval for use with game progress tracking
if (!jsmd_gameStartTime) var jsmd_gameStartTime = 0;	//set the generic game start time for use with game progress tracking

/* variable for achievement */
if (!game_achievement) var game_achievement;	//prop16,eVar16

/*
_jsmd.addOnLoad(function(){
	_jsmd.init().send();
});
*/
function sendInteractionEvent(data,event){
    try {
		trackMetrics({
			type: event,
			data: {
				interaction_type: data
			}
		});
    } catch(e){}
}

function sendGameEvent(action,info,event){

 if(event === "START"){
        action = "cnt-game-start";}
 else if(event === "INIT"){
        action = "cnt-game-init";}

 else if(event === "PLAY"){
        action = "cnt-game-playnow";}

else if(event === "REPLAY"){
        action = "cnt-game-replay";	}

else if(event === "TIME SPENT"){
 action = "ingame-progress";}

else if(event === "unity_installed"){
 action = "cnt-game-unity-installed";}

 else if(event === "unity_not_installed"){
 action = "cnt-game-unity-not-installed";}

 else if(event === "unity_download"){
 action = "cnt-game-unity-download";}

    try {
		trackMetrics({
			type: action,
			data: {
				game_data: info,
				interaction_type: event
			}
		});
    } catch(e){}
}

function sendComscoreVideoMetrixBeacon(videoId,contentFlag) {
	_jsmd.doImageBeacon("http://b.scorecardresearch.com/p?c1=${c1}&c2=${c2}&c3=${c3}&c4=${c4}&c5=${c5}&rn=${random}", {
			c1:'1',			// Video metrix tag identifier
			c2:'8586818',	// Turner Specific Tag
			c3:'00010',		// Report-suite numeric identifier for comparisons to Omniture
			c4:'8586820',	// Site Specific Tag
			c5:(contentFlag==1?'020000':'010000')
		}
	);
}
function sendNielsenVideoCensusBeacon(config,state,videoId,videoTitle,duration) {
	var url="http://secure-${sfcode}.imrworldwide.com/cgi-bin/m?ci=${clientid}&c6=${prod},${vcid}&cc=1&tl=${state}-${videoId}&rnd=${random}",
		nVC=(!config?null:config["video-census"]);
	if(!nVC) {return;}
	switch(state) {
		case "start":
			nVC.state="dav0";
			nVC.videoId=videoId.toLowerCase();
			nVC.videoTitle=videoTitle.toLowerCase();
			_jsmd.doImageBeacon(url,nVC);
			break;
		case "complete":
			nVC.state="dav2";
			nVC.videoId=videoId.toLowerCase();
			nVC.videoTitle=videoTitle.toLowerCase();
			_jsmd.doImageBeacon(url,nVC);
			break;
	}
}

function TVE_VideoEvent(_data, _event){
	var isJSON = false;
	var vidObj;
	var dataObj = {};
	try{
    	vidObj = _w.JSON.parse(_data);
    	isJSON = true;
	}catch(e){
		isJSON = false;
	}
	if(!isJSON){
		try{
			vidObj = _data;
			vidObj = vidObj.replace(/\n/g, "");
			vidObj = vidObj.replace(/^(\"|\')?(\s)*\{/, "");
			vidObj = vidObj.replace(/\}(\s)*(\"|\')?$/, "");
			vidObj = eval('({'+vidObj+'})');
			isJSON = true;
		}catch(e){
			isJSON = false;
		}
	}
	if(!isJSON){
			vidObj = _data
	}
    try{
    	if(vidObj.headline){
    		dataObj.title = vidObj.headline;
    		jsmd.TVE.videoTitle = vidObj.headline;
    	}
    	if(vidObj.id){dataObj.id = vidObj.id;}
    	if(vidObj.trt){dataObj.trt = vidObj.trt;}
    	if(vidObj.clickbackUrl){dataObj.url = vidObj.clickbackUrl;}
    	if(vidObj.franchise){
    		dataObj.franchise = vidObj.franchise;
    		jsmd.TVE.videoFranchise = vidObj.franchise;

    	}
    	if(vidObj.tveMode){dataObj.tveMode = vidObj.tveMode;}
    	if(vidObj.PullOutAdv){dataObj.PullOutAdv = vidObj.PullOutAdv;}
    	if(vidObj.contentId){dataObj.contentId = vidObj.contentId;}
    	if(vidObj.airdate){dataObj.airdate = vidObj.airdate;}
    	if(vidObj.dayssince){dataObj.dayssince = vidObj.dayssince;}
    	if(vidObj.adTotalPlayTime){dataObj.adTotalPlayTime = vidObj.adTotalPlayTime;}
    	if(vidObj.mode){dataObj.mode = vidObj.mode;}
    	if(vidObj.duration){dataObj.duration = vidObj.duration;}
    	if(vidObj.grossLength){dataObj.grossLength = vidObj.grossLength;}
    	if(vidObj.grossProgressMarker){dataObj.grossProgressMarker = vidObj.grossProgressMarker;}
    	if(vidObj.playheadTime){dataObj.playheadTime = vidObj.playheadTime;}
    	if(vidObj.precent){dataObj.precent = vidObj.precent;}
    	if(vidObj.progressMarker){dataObj.progressMarker = vidObj.progressMarker;}
    	if(vidObj.totalPlayTime){dataObj.totalPlayTime = vidObj.totalPlayTime;}
    	if(vidObj.seasonNumber){dataObj.seasonNumber = vidObj.seasonNumber;}
    	if(vidObj.episodeNumber){dataObj.episodeNumber = vidObj.episodeNumber;}
    	if(vidObj.lastAirDate){dataObj.lastAirDate = vidObj.lastAirDate;}
    	if(vidObj.sPageName){dataObj.sPageName = vidObj.sPageName;}
    	if(vidObj.omnitureVideoName){dataObj.omnitureVideoName = vidObj.omnitureVideoName;}
    	if(vidObj.omnitureFranchise){dataObj.omnitureFranchise = vidObj.omnitureFranchise;}
    	if(vidObj.franchiseId){dataObj.franchiseId = vidObj.franchiseId;}
    	if(vidObj.isLive){dataObj.isLive = vidObj.isLive;}

    }catch(e){}
	try{
        var action = vidObj.tveMode;
        if(_event === "video-complete"){
        	if(vidObj.isLive=="true"){action = "tve-live_video-complete"}
        	else if(vidObj.PullOutAdv=="true"){action = "tve-C3A_video-complete";}
        	else if(action == "C4"){action = "tve-C4_video-complete";
	        }else if(action == "C3"){ action = "tve-C3_video-complete"; }
        }else if(_event === "video-progress"){
        	if(vidObj.isLive=="true"){action = "tve-live_video-progress"}
        	else if(vidObj.PullOutAdv=="true"){action = "tve-C3A_video-progress"}
        	else if(action == "C4"){action = "tve-C4_video-progress";
	        }else if(action == "C3"){ action ="tve-C3_video-progress";}
        }else if(_event === "video-pause"){ action = "tve_video-pause";
        }else if( _event === "video-start" ){
        	if(vidObj.isLive=="true"){action = "tve-live_video-start"}
        	else if(vidObj.PullOutAdv=="true"){action = "tve-C3A_video-start"}
        	else if(action == "C4"){ action = "tve-C4_video-start";
        	}else if (action == "C3"){ action = "tve-C3_video-start";}
        }else if (_event === "ad-start") {
        	action = "tve-ad-start";
        }else if (_event === "ad-progress") {
        	if(action == "C4"){ action = "tve-C4_ad-progress";
        	}else if (action == "C3"){ action = "tve-C3_ad-progress";}
        }
        trackMetrics({type: action, data:dataObj});
	}catch(e){}
};


_jsmd.JSMD.prototype.tveMSO = "Unauthorized";

_jsmd.JSMD.prototype.tveRSIDList = {
	'Unauthorized': "tvenotauthcartoon",
    'verizon': {
        global:			"tveverizonglobal",
        tve_network:	"tveverizoncartoon"
    },
    'comcast': {
        global:			"tvecomcastglobal",
        tve_network:	"tvecomcastcartoon"
    },
    'adobe': {
        global:			"tveadobeglobaldev",
        tve_network:	"tveadobebranddev"
    },
    'dish': {
        global:			"tvedishglobal",
        tve_network:	"tvedishcartoon"
    },
    'twc': {
        global:			"tvetwcglobal",
        tve_network:	"tvetwccartoon"
    },
    'att': {
        global:			"tveattglobal",
        tve_network:	"tveattcartoon"
    },
    'charter': {
        global:			"tvecharterglobal",
        tve_network:	"tvechartercartoon"
    },
    'cox': {
        global:			"tvecoxglobal",
        tve_network:	"tvecoxcartoon"
    },
    'dtv': {
        global:			"tvedirecttvglobal",
        tve_network:	"tvedirecttvcartoon"
    },
    'google': "carnetnmgoogletv",
    'suddenlink': {
        global:			"tvesuddenlinkglobal",
        tve_network:	"tvesuddenlinkcartoon"
    },
    'cablevision': {
    	global: 		"tvecablevisionglobal",
    	tve_network:	"tvecablevisioncartoon"
    }
};

_jsmd.JSMD.prototype.tveRSID = (window.location.host === "www.cartoonnetwork.com" || window.location.host === "cartoonnetwork.com")?"tveglobal,tvecartoon,tvenotauthcartoon":"tveglobaldev,tvecartoon,tvenotauthcartoondev";

_jsmd.JSMD.prototype.sTVE_MSO = function(_MSO){
	var MSO = _MSO;
	MSO = MSO.toLowerCase();
	this.tveMSO = MSO;
	this.sTVE_RSID();
};

_jsmd.JSMD.prototype.sTVE_RSID = function(_category){
	var globalRSID = "tveglobal";
	var brandRSID = "tvecartoon";
	var networkRSID = "tve" + (this.tveMSO) + "cartoon";
	if(this.tveMSO == "dtv"){
		networkRSID = networkRSID.replace("dtv","directtv");
	}

	var devStng = (window.location.host === "www.cartoonnetwork.com" || window.location.host === "cartoonnetwork.com")?"":"dev"
	if (this.tveMSO != "Unauthorized"){
		this.tveRSID =  globalRSID+devStng+","+brandRSID+devStng+","+networkRSID+devStng;
	}
}
/*TVE Objects*/
_jsmd.JSMD.prototype.TVE = {
		video_progress: "0",
		userID: "Unspecified UserId",
		isAdPlayTimeSet: true,
		prevTotalPlayTime: 0,
		videoFranchise: "",
		videoTitle: "",
		lastPlayHeadTime: 0,
		nonC3C4adNum:0,
		allAdIntervlNum:0,
		isAdStart:false,
		adDuration:0,
		totalAdDurations:0,
		event22cal: 0,
		prevAdEvent22:0,
		adIntervalsCount:0,
		progressMarker:0,
		pageName:"",
		brand:"",
		host:"",
		channel:"",
		vidID:"",
		lastAirDate:"",
		dayssince:"",
		mode:"",
		videoFranchise:"",
		fullEpisode:"",
		playerLocation:"",
		liveStreamName: "",
		authState :"authenticated"
};

function trackAuthenticationStart(_trackingData) {
	try{
	var MSO = _trackingData[0];
	MSO = MSO.toLowerCase();
	jsmd.sTVE_MSO(MSO);
	}catch(e){}
}

function trackAuthenticationComplete(_trackingData) {
	try{
	var MSO = _trackingData[1];
	MSO = MSO.toLowerCase();
	jsmd.sTVE_MSO(MSO);
	var userID = _trackingData[2];
	jsmd.TVE.userID = userID;
	}catch(e){}
}

function trackAlreadyLoggedInPage(_trackingData) {
	try{
	var MSO = _trackingData[1];
	MSO = MSO.toLowerCase();
	jsmd.sTVE_MSO(MSO);
	var userID = _trackingData[2];
	jsmd.TVE.userID = userID;
	}catch(e){}
}

function trackNotLoggedInPage() {
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
var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s.version='H.24.1';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(m,\"\\n\",\"\\\\n\"),\""
+"\\\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return y};s.fl=function(x,l){retur"
+"n x?(''+x).substring(0,l):x};s.co=function(o){if(!o)return o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.indexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for(var p=0;p"
+"<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;return 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',i,c=s.charSet,n,l,e,y='';c=c?c.toU"
+"pperCase():'';if(x){x=''+x;if(s.em==3)x=encodeURIComponent(x);else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h"
+".substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else x=escape(''+x);x=s.rep(x,'+','%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('"
+"%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x)"
+"{var s=this;if(x){x=s.rep(''+x,'+',' ');return s.em==3?decodeURIComponent(x):unescape(x)}return x};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substri"
+"ng(0,y);r=s[f](t,a);if(r)return r;z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a"
+"=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var"
+" s=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.si=function(){var s=this,i,k,v,c=s_gi+'var s=s_gi(\"'+s.oun+'\");s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=unde"
+"fined){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}c+=\"s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';"
+"s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?pa"
+"rseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.a"
+"pe(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd"
+"(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie"
+"=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s."
+"_in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if("
+"x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return "
+"r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfs"
+"oe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=thi"
+"s,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet"
+"('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r.t,r.u)}};s.flushBufferedRequests=fun"
+"ction(){};s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Obje"
+"ct,l,imn='s_i_'+(un),im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p"
+"=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/'+s.version+(s.tcn?'T':'')+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl"
+"(rs,2047)}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window"
+".s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im."
+"s_l=0;im.onload=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;if"
+"(s.debugTracking){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;for(dln=0;dln<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im.src=rs;if((!ta||ta=='_self'||ta=='_top'||(s.wd.na"
+"me&&ta==s.wd.name))&&rs.indexOf('&pe=')>=0){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg"
+"=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s"
+"=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,l=0,q,a,b='',c='',t;if(x&&x.length>255){y=''+x;i=y.indexOf('?');if(i>0){q=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCas"
+"e();j=0;if(h.substring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='https://')j+=8;i=h.indexOf(\"/\",j);if(i>0){h=h.substring(j,i);p=y.substring(i);y=y.substring(0,i);if(h.indexOf('google')>=0)l"
+"=',q,ie,start,search_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l=',p,ei,';if(l&&q){a=s.sp(q,'&');if(a&&a.length>1){for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.su"
+"bstring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'+c;else c=''}i=253-(q.length-c.length)-y.length;x=y+(i>0?p.substring(0,i):'')+'?'+q}}}}return x};s.s2q=function(k,v,vf,vfp,f"
+"){var s=this,qs='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextData\")k=\"c\";if(v){for(sk in v) {if((!f||sk.substring(0,f.length)==f)&&v[sk]&&(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',')>="
+"0)){nfm=0;if(nfl)for(nfn=0;nfn<nfl.length;nfn++)if(sk.substring(0,nfl[nfn].length)==nfl[nfn])nfm=1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk];if(f)sk=sk.substring(f.length);if(sk.length>0){nke=sk.in"
+"dexOf('.');if(nke>0){nk=sk.substring(0,nke);nf=(f?f:'')+nk+'.';if(!nfl)nfl=new Array;nfl[nfl.length]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(typeof(sv)=='boolean'){if(sv)sv='true';else sv='false'}if(s"
+"v){if(vfp=='retrieveLightData'&&f.indexOf('.contextData.')<0){sp=sk.substring(0,4);ss=sk.substring(4);if(sk=='transactionID')sk='xact';else if(sk=='channel')sk='ch';else if(sk=='campaign')sk='v0';e"
+"lse if(s.num(ss)){if(sp=='prop')sk='c'+ss;else if(sp=='eVar')sk='v'+ss;else if(sp=='list')sk='l'+ss;else if(sp=='hier'){sk='h'+ss;sv=sv.substring(0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}}if(qs"
+"!='')qs+='&.'+k}return qs};s.hav=function(){var s=this,qs='',l,fv='',fe='',mn,i,e;if(s.lightProfileID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv=','+fv+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType"
+"){fv=s.linkTrackVars;fe=s.linkTrackEvents;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;"
+"if(fe){fe=','+fe+',';if(fv)fv+=',events,'}if (s.events2)e=(e?',':'')+s.events2}for(i=0;i<l.length;i++){var k=l[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&"
+"e){v=e;e=''}if(v&&(!fv||fv.indexOf(','+k+',')>=0)&&k!='linkName'&&k!='linkType'){if(k=='timestamp')q='ts';else if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='pageURL"
+"'){q='g';v=s.fl(v,255)}else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigrationS"
+"erverSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em==2||s"
+".em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode')q='"
+"cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j';els"
+"e if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp';else"
+" if(k=='plugins')q='p';else if(k=='events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='events2')v='';else if(k=='contextData'){qs+=s.s2q('c',s[k],fv,k,0);v=''}else if(k=='lightProfileID')q"
+"='mtp';else if(k=='lightStoreForSeconds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncrementBy'){q='mti';if(!s.lightProfileID)v=''}else if(k=='retrieveLightProfiles')q='mtsr';else if(k=="
+"'deleteLightProfiles')q='mtsd';else if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2q('mts',s[k],fv,k,0);v=''}else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if("
+"b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase("
+"):'';var qi=h.indexOf('?');h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h."
+"indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if("
+"s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.substring(0,1)!='#'&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';r"
+"eturn ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=s.co(this);s.t();s.lnk=0;if(b)return this[b](e);return true');s.bc=new Function('e','var s=s_c_il['+s._in+'],"
+"f,tcf;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;s.eo=e.srcElement?e.srcElement:e.target;tcf=new Function(\"s\",\"var e;try{if(s.eo&&(s.eo.tagName||s.eo.parentElement||s.eo.parentNode))s.t()}catch(e"
+"){}\");tcf(s);s.eo=0');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&"
+"&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/"
+"':'')+h}return h};s.ot=function(o){var t=o.tagName;if(o.tagUrn||(o.scopeName&&o.scopeName.toUpperCase()!='HTML'))return '';t=t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE')t='';if(t){if((t=='INP"
+"UT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p=o.protocol;c=o.onclick"
+";if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' ','');x=2}else if(t=='IN"
+"PUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}return o."
+"s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')>=0){if(u!=s.un&&s.un.indexOf(',')>=0)q="
+"'&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,',','rq',0)};s.sqp=funct"
+"ion(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this;s.squ[un]=q;return 0};s.sq=fun"
+"ction(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Object.prototype||!Object"
+".prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}re"
+"turn s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick"
+":\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){i"
+"f(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener)s.b.addEventListener('click',s.bc,false);else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=function(x){var s=this,v=s."
+"visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e))return 0;n=x}if(n%1000"
+"0>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.substring(0,i),x=t.substring"
+"(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowerCase();if(x&&l){if(!m)"
+"m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};s.sa=function(un){var s"
+"=this;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl"
+")s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_"
+"i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l"
+"[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(!c)c=s.wd[\"s_\"+g+"
+"\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf(\"function\")>=0)x(s);e"
+"lse s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i]"
+";if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexOf('function')>=0){if(d&"
+"&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o."
+"e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}i"
+"f((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],o=s.d.getElementById(\""
+"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)"
+"/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javascript\";'+(n?'o.id=i;o."
+"defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o"
+".n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.voa=function(vo,r){var s=this,l=s.va_g,i,k,v,x;f"
+"or(i=0;i<l.length;i++){k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"||k==\"retrieveLightData\")&&s[k])for(x in s[k])if(!v[x])v[x]=s[k][x];s[k]=v}}};s.vob=function(vo){var s=this,l=s.va"
+"_g,i,k;for(i=0;i<l.length;i++){k=l[i];vo[k]=s[k];if(!vo[k])vo['!'+k]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!"
+"s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.dl=function(vo){va"
+"r s=this,d=new Date;if(!vo)vo=new Object;s.vob(vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s.track=s.t=function(vo){var s=this,trk="
+"1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1"
+"900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',vb=new Object;s.gl(s.vl_g);s.uns();s.m_l"
+"l();if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.s"
+"etUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){"
+"}return i');i=tcf(o);if(i&&i.next)j='1.7'}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.in"
+"nerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElement.offsetWidth;bh=s.d.documentElement.of"
+"fsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}return hp');hp=tcf(s,tl);tcf=new Function('"
+"s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if("
+"p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;"
+"s.td=1}if(vo){s.vob(vb);s.voa(vo)}if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s."
+"_1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk,p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.pa"
+"rentElement?o.parentElement:o.parentNode;if(o){t=s.ot(o);n=s.oid(o);x=o.s_oidt}}if(o){oc=o.onclick?''+o.onclick:'';if((oc.indexOf('s_gs(')>=0&&oc.indexOf('.s_oc(')<0)||oc.indexOf('.tl(')>=0)o=0}}if"
+"(o){if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l)){s.pe='lnk_'+(t=='d'||t=='e'"
+"?t:'o');q+='&pe='+s.pe+(h?'&pev1='+s.ape(h):'')+(l?'&pev2='+s.ape(l):'');}else trk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(s.gg('objectID')){n=s.gg('objectID');"
+"x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}else trk=0}if(trk||qs){s.sampled=s.vs(sed);if(trk){i"
+"f(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,ta);qs='';s.m_m('t');if(s.p_r)s.p_r();s.referrer=s.lightProfileID=s.retrieveLightProfiles=s.deleteLightProfiles=''}s.sq"
+"(qs)}}else s.dl(vo);if(vo)s.voa(vb,1);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';return code"
+"};s.trackLink=s.tl=function(o,t,n,vo){var s=this;s.lnk=s.co(o);s.linkType=t;s.linkName=n;s.t(vo)};s.trackLight=function(p,ss,i,vo){var s=this;s.lightProfileID=p;s.lightStoreForSeconds=ss;s.lightInc"
+"rementBy=i;s.t(vo)};s.setTagContainer=function(n){var s=this,l=s.wd.s_c_il,i,t,x,y;s.tcn=n;if(l)for(i=0;i<l.length;i++){t=l[i];if(t&&t._c=='s_l'&&t.tagContainerName==n){s.voa(t);if(t.lmq)for(i=0;i<"
+"t.lmq.length;i++){x=t.lmq[i];y='m_'+x.n;if(!s[y]&&!s[y+'_c']){s[y]=t[y];s[y+'_c']=t[y+'_c']}s.loadModule(x.n,x.u,x.d)}if(t.ml)for(x in t.ml)if(s[x]){y=s[x];x=t.ml[x];for(i in x)if(!Object.prototype"
+"[i]){if(typeof(x[i])!='function'||(''+x[i]).indexOf('s_c_il')<0)y[i]=x[i]}}if(t.mmq)for(i=0;i<t.mmq.length;i++){x=t.mmq[i];if(s[x.m]){y=s[x.m];if(y[x.f]&&typeof(y[x.f])=='function'){if(x.a)y[x.f].a"
+"pply(y,x.a);else y[x.f].apply(y)}}}if(t.tq)for(i=0;i<t.tq.length;i++)s.t(t.tq[i]);t.s=s;return}}};s.wd=window;s.ssl=(s.wd.location.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.b"
+"ody;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.ind"
+"exOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf("
+"'Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));els"
+"e s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.s"
+"a(un);s.vl_l='dynamicVariablePrefix,visitorID,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServerSecure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pa"
+"geURL,referrer,currencyCode';s.va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,contextData,lightProfileID,lightStoreForSeconds,lightIncrementBy';s."
+"vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,events2,products,linkName,linkType,contextData,lightProfileID,lightStoreForSeconds,lightInc"
+"rementBy,retrieveLightProfiles,deleteLightProfiles,retrieveLightData';var n;for(n=1;n<=75;n++){s.vl_t+=',prop'+n+',eVar'+n;s.vl_m+=',prop'+n+',eVar'+n}for(n=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<="
+"3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage"
+",plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitor"
+"SamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,li"
+"nkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,lightTrackVars,_1_referrer,un';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);s.contextData=new Object;s.retrieveLightData=new Object;"
+"if(!ss)s.wds();if(pg){s.wd.s_co=function(o){s_gi(\"_\",1,1).co(o)};s.wd.s_gs=function(un){s_gi(un,1,1).t()};s.wd.s_dc=function(un){s_gi(un,1).t()}}",
w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,j,x,s;if(un){un=un.toLowerCase();if(l)for(j=0;j<2;j++)for(i=0;i<l.length;i++){s=l[i];x=s._c;if((!x||x=='s_c'||(j>0&&x=='s_l'))&&(s.oun==un||(s.fs&&s.sa&&s.fs(s.oun,un)))){if(s.sa)s.sa(un);if(x=='s_c')return s}else s=0}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
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
c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a<5||v.indexOf('Opera')>=0||u.indexOf('Opera')>=0)c=s_ft(c);if(!s){s=new Object;if(!w.s_c_in){w.s_c_il=new Array;w.s_c_in=0}s._il=w.s_c_il;s._in=w.s_c_in;s._il[s._in]=s;w.s_c_in++;}s._c='s_c';(new Function("s","un","pg","ss",c))(s,un,pg,ss);return s}
function s_giqf(){var w=window,q=w.s_giq,i,t,s;if(q)for(i=0;i<q.length;i++){t=q[i];s=s_gi(t.oun);s.sa(t.un);s.setTagContainer(t.tagContainerName)}w.s_giq=0}s_giqf()
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
