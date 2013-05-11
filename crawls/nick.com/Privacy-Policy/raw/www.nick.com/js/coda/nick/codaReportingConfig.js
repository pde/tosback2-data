if(typeof KIDS == "undefined" || !KIDS) var KIDS = {};

KIDS.namespace("reporting");

KIDS.reporting.config;
KIDS.reporting.qs;
KIDS.reporting.unityStatus;
KIDS.reporting.domain;
KIDS.reporting.site;
KIDS.reporting.abTest;
KIDS.reporting.badgeColorToggleCount;

KIDS.reporting.baseCTMArray = ["TopNav1", "TopNav2", "TopNav3", "TopNav4", "TopNav5", "TopNav6", "TopNav7", "TopNav8", "CharNav1", "CharNav2", "CharNav3", "CharNav4", "CharNav5", "CharNav6", "CharNav7", "CharNav8", "CharNav9", "CharNav10", "CharNav11", "CharNav12", "CharNav13", "CharNav14", "CharNav15", "CharNav16", "CharNav17", "CharNav18", "CharNav19", "CharNav20", "CharNav21", "CharNav22", "CharNav23", "CharNav24", "CharNav25", "CharNav26", "CharNav27", "CharNav28", "CharNav29", "CharNav30", "CharNav31", "CharNav32"];
KIDS.reporting.hpCTMArray = ["HomeALevel1", "Latest1", "Latest2", "Latest3", "Latest4", "TVSchedule", "FreeOnlineGames", "TopGame", "NowPlayed1", "NowPlayed2", "NowPlayed3", "NowPlayed4", "NowPlayed5", "NowPlayed6", "MoreGames", "FreeOnlineVideos", "TopVideo", "NowWatched1", "NowWatched2", "NowWatched3", "NowWatched4", "NowWatched5", "NowWatched6", "MoreVideos", "Explore1", "Explore2", "Explore3", "Explore4", "Explore5", "Explore6", "NowSaidName1", "NowSaidTitle1", "NowSaidName2", "NowSaidTitle2", "NowSaidName3", "NowSaidTitle3", "NowSaidName4", "NowSaidTitle4", "NowSaidName5", "NowSaidTitle5", "NowSaidName6", "NowSaidTitle6"];
KIDS.reporting.gamesCTMArray = ["FeatToutGame1", "MoreGame1", "MoreGame2", "MoreGame3", "MoreGame4", "MoreGame5", "MoreGame6", "GameChar1", "GameChar2", "GameChar3", "GameChar4", "GameChar5", "GameChar6", "GameChar7", "GameChar8", "GameChar9", "AllGamesByShow", "VirtualWorld1", "VirtualWorld2", "VirtualWorld3", "FeatGame", "GameCat1", "GameCat2", "GameCat3", "GameCat4", "GameCat5", "GameCat6", "GameCat7", "GameCat8", "GameCat9", "GameCat10", "GameCat11", "GameCat12", "GameCat13", "GameCat14", "GameCat15", "GameCat16", "GameCat17", "GameCat18", "GamePodAtitle", "GamePodA1", "GamePodA2", "GamePodAmore", "GamePodBtitle", "GamePodB1", "GamePodB2", "GamePodBmore", "GamePodCtitle", "GamePodC1", "GamePodC2", "GamePodCmore", "GamePodDtitle", "GamePodD1", "GamePodD2", "GamePodDmore", "GamePodEtitle", "GamePodE1", "GamePodE2", "GamePodEmore", "GamePodFtitle", "GamePodF1", "GamePodF2", "GamePodFmore", "GamePodGtitle", "GamePodG1", "GamePodG2", "GamePodGmore", "GamePodHtitle", "GamePodH1", "GamePodH2", "GamePodHmore", "GamePodItitle", "GamePodI1", "GamePodI2", "GamePodImore", "GamePodJtitle", "GamePodJ1", "GamePodJ2", "GamePodJmore", "GamePodKtitle", "GamePodK1", "GamePodK2", "GamePodKmore", "GamePodLtitle", "GamePodL1", "GamePodL2", "GamePodLmore", "SpotlightTitle", "SpotlightAll", "TopGameSeeAllA", "TopGameSeeAllB", "TopGame1", "TopGame2", "TopGame3", "TopGame4", "TopGame5", "GameBuild1", "GameBuild2", "GameBuild3", "GameBuild4", "GameBuild5", "ShoutName1", "ShoutTitle1", "ShoutName2", "ShoutTitle2", "ShoutName3", "ShoutTitle3", "ShoutName4", "ShoutTitle4", "UniversalTout1", "UniversalTout2", "UniversalTout3"];
KIDS.reporting.videosCTMArray = ["VideoNav1", "VideoNav2", "VideoNav3", "VideoNav4", "VideoNav5", "VideoALevel1", "VideoBLevel1", "VideoBLevel2", "VideoBLevel3", "VideoBLevelmore", "VideoCLevel1", "VideoCLevel2", "VideoCLevel3,VideoCLevelmore", "VideoDLevel1", "VideoDLevel2", "VideoDLevel3", "VideoDLevelmore", "VideoShow1", "VideoShow2", "VideoShow3", "VideoShow4", "VideoShow5", "VideoShow6", "VideoShow7", "VideoShow8", "VideoShow9", "VideoShow10", "VideoShow11", "VideoShow12", "VideoShow13", "VideoShow14", "VideoShow15", "VideoShow16", "VideoShow17", "VideoShow18", "VideoShow19", "VideoShow20", "VideoShow21", "VideoShow22", "VideoShow23", "VideoShow24"];

KIDS.reporting.tracker;

Configuration.prototype.initialize = function(){
	try{
		this.init();
		this.setting["name"]="nickvia";
		this.setting["dynamicAccountSelection"] = "true";
		this.setting["dynamicAccountList"] = "nickviadev=mtvi.com,localhost,9090";
		this.setting["linkInternalFilters"] = "javascript:,nick.com";
		this.setting["trackExternalLinks"] = true;
		this.setting["trackDownloadLinks"] = true;
		this.setting["trackInlineStats"] = false;
		
		if(!this.isLink())
		{
			this.setting.prop1 = KIDS.reporting.site;
			this.setting.eVar1 = KIDS.reporting.site;
			this.setting.pageName = KIDS.get("uri");			
			this.setting.channel=KIDS.get("type");	
			
			var list1 = KIDS.reporting.baseCTMArray;
		
			if(KIDS.get("uri").indexOf("thebighelp")>-1||KIDS.get("uri").indexOf("/clubhouses/big-help")>-1){
				if (KIDS.get("uri").indexOf("/worldwide-day-of-play")>-1)this.setting.channel="WWDoP";
				else if(KIDS.get("uri").indexOf("/clubhouses/big-help")<0)this.setting.channel="The Big Help";
				KIDS.reporting.site = "TheBigHelp.com";
				this.setting.prop1 = KIDS.reporting.site;
				this.setting.eVar1 = KIDS.reporting.site;
				KIDS.reporting.domain = "thebighelp";
			}else if(KIDS.get("adfree")=="true")this.setting.channel="Ad-free";
			else if(KIDS.get("uri")=="/"){
				this.setting.channel="Homepage";
				this.setting.pageName+="index.html";
			}else if(KIDS.get("uri").indexOf("/tvschedule")>-1) this.setting.channel="TV Schedule";		
			else if(KIDS.get("uri").indexOf("/celebrity")>-1)this.setting.channel="Celebrity";

			this.setting.prop3 = location.search;	
			
			if(KIDS.get("type")=="game"){
				if(KIDS.get("isDetailPage")=="true")this.setting.prop4 = KIDS.get("urlAlias");
				else if(KIDS.get("uri").indexOf("game-builder")>0){	
					this.setting.prop4 = KIDS.get("urlAlias");
					var patt=new RegExp("^/games/(.*)-game-builder$","gi");
					var result=patt.exec(KIDS.get("uri"));
					if(result){
						this.setting.pageName="/games/GameBuilder Game Played - "+result[1];
						this.setting.hier1="games/gamebuilder/"+result[1]+"/GamePlayed";
						this.setting.hier2=this.setting.hier1+"/";
						this.setting.channel="game";
						this.setting.prop4 = "GameBuilder Game - "+result[1];
						if(this.setting.events.length>0)this.setting.events += ",event18";
					}
				}
			}
			else if(KIDS.get("primaryType")=="ClubGame")this.setting.prop4 = KIDS.get("urlAlias")+"_club";
			this.setting.prop11 = KIDS.get("fccRelatedShow");
			if(this.setting.prop11.indexOf(":")>0)this.setting.prop11=this.setting.prop11.split(":")[1];
			this.setting.eVar11 = this.setting.prop11;
			if(typeof swfobject != "undefined"){
				var version = swfobject.getFlashPlayerVersion();
				if(version)this.setting.prop13 = version.major+" | "+ version.minor+" | "+ version.release;
			}
			var xid = KIDS.reporting.qs.xid?KIDS.reporting.qs.xid:"";
			if(xid.length>0){ 
				var exdate = new Date();
				exdate.setDate(exdate.getDate()+90);	
				document.cookie="NICK.xid=" +xid+ ";expires="+exdate.toGMTString();
			}
			xid=KIDS.utils.getCookie("NICK.xid");
			xid=(xid==null)?"":xid; 
			this.setting.prop16 = xid; 
			this.setting.eVar7 = xid; 
			this.setting.campaign = xid;
			if(xid.length>0){
				if(this.setting.events.length>0)this.setting.events += ",";
				this.setting.events += "event2";
			}
 
			if(this.setting.pageName.indexOf("/kids-choice-awards")>-1||this.setting.pageName.indexOf("/kca")>-1||this.setting.pageName.indexOf("-kca-")>-1||this.setting.pageName.indexOf("-kcas-")>-1||this.setting.pageName.indexOf("/star-lounge")>-1){
				KIDS.reporting.site = "kca";
				this.setting.prop1 = KIDS.reporting.site;
				this.setting.eVar1 = KIDS.reporting.site;
				this.setting.prop11 = "kca";
				this.setting.eVar11 = "kca";
				if(!KIDS.get("adfree")=="true")this.setting.channel = "kids-choice-awards";
				if(KIDS.get("uri")=="/kids-choice-awards"){
					this.setting.channel="Homepage";
				}else if (location.pathname.indexOf("/kids-choice-awards")>-1){
					if(location.pathname.indexOf("/kids-choice-awards")>0)this.setting.pageName="/kids-choice-awards"+this.setting.pageName;
		 		}else if(location.pathname.indexOf("kca")>-1){
		 			this.setting.pageName="/kids-choice-awards"+this.setting.pageName;
		 		}
				
				if(KIDS.get("uri").indexOf("/all-winners")>-1||
					KIDS.get("uri").indexOf("/past-hosts")>-1||
					KIDS.get("uri").indexOf("/best-performances")>-1||
					KIDS.get("uri").indexOf("/greatest-slimings")>-1)
				{
					this.setting.channel="KCA Archive";
				}else if(KIDS.get("urlAlias")=="2009"||KIDS.get("urlAlias")=="2010"||KIDS.get("urlAlias")=="2011"){
					this.setting.channel="KCA Archive";
				}
				else if(KIDS.get("urlAlias").indexOf("quiz")>-1)this.setting.channel="quiz";
				else if(KIDS.get("uri")=="/kids-choice-awards/2012/news")this.setting.channel="blog";
				else if(this.setting.channel=="")this.setting.channel="show";
			}
			
			this.setting.pageName = KIDS.reporting.domain+this.setting.pageName;
			this.setting.hier2 = this.setting.pageName;	
			
			var ct = "";
			if(KIDS.get("urlAlias")== ""){
				ct = "Hub page";
				list1 = list1.concat(KIDS.reporting.hpCTMArray);
			}else if(KIDS.get("isListingPage")=="true"){
				if(KIDS.get("type")=="game"){
					ct = "Hub page";
					list1 = list1.concat(KIDS.reporting.gamesCTMArray);
				}else if(KIDS.get("type")=="video"){
					ct = "Hub page";
					list1 = list1.concat(KIDS.reporting.videosCTMArray);
				}else if(KIDS.get("urlAlias").indexOf("builder")>-1)ct = "Game";
				else if(KIDS.get("primaryType")== ""&& KIDS.get("type")== "club"){
					if (NICK.club != undefined){
						var tmp = location.pathname.split("/");
						if(tmp[2]=="main"||tmp[2]=="games" || tmp[2]=="videos" || tmp[2]=="shows" || tmp[2]=="buddies" || tmp[2]=="room" || tmp[2]=="awards" || tmp[2]=="favs" || tmp[2]=="badges"){
							this.setting.pageName = KIDS.reporting.domain+"/"+tmp[1]+"/"+tmp[2];
							this.setting.hier2 = KIDS.reporting.domain+"/"+tmp[1]+"/profiles/"+tmp[2];
							ct="Club Profile";
						}else ct="Hub page";
					}					
				}else if(KIDS.get("uri").indexOf("vote")>-1)ct = "Voting page";
				else if(KIDS.get("urlAlias").indexOf("nominee")>-1 || KIDS.get("urlAlias").indexOf("winner")>-1 || KIDS.get("urlAlias").indexOf("host")>-1)
						ct = "Host/nominees/winners";
				else if(KIDS.get("uri").indexOf("/specials/valentines")>-1)ct = "Extras";
				else if(KIDS.get("uri")=="/shows/ninja-turtles")ct = "Hub page";
				else if(KIDS.get("urlAlias").indexOf("ninja-turtles")>-1)ct = "About-info";
				else if(KIDS.get("uri").indexOf("/games/worlds/")>-1)ct = "Game";
				else ct = "Hub page";				
			}
			else if(KIDS.get("urlAlias")== "celebrity")ct = "Hub page";
			else if(KIDS.get("type")=="blog")ct = "News";
			else if(KIDS.get("type")=="quiz")ct = "Quiz";
			else if(KIDS.get("type")=="search"||KIDS.get("type")=="tag")ct = "Search result";
			else if(KIDS.get("type")=="picture")ct = "Picture";
			else if(KIDS.get("isDetailPage")=="true"){
				if(KIDS.get("type")=="game")ct = "Game";
				else if(KIDS.get("type")=="video")ct = "Video";
				else if(KIDS.get("type")=="music"){
					if(KIDS.get("uri").indexOf("artist")>-1)ct = "Hub page";
					else ct="Music";
				}else if(KIDS.get("uri").indexOf("/thebighelp/")>-1 || KIDS.get("uri").indexOf("/characters/")>-1)ct="About-info";
				else if(KIDS.get("primaryType")== "ClubHouses")ct="Clubhouse";
				else if(KIDS.get("primaryType")== "Mall")ct="Mall";
				else if(KIDS.get("uri").indexOf("/celebrity/")>-1&&KIDS.get("type")=="")ct="Nick Star profile page";
				else if(KIDS.reporting.site == "kca"&&KIDS.get("urlAlias").indexOf("quiz")>-1)ct = "Quiz";
				else if(KIDS.get("urlAlias").indexOf("-comics")>-1)ct="Comics";
				else if(KIDS.get("uri").indexOf("extras")>-1)ct="Extras";
				else if(KIDS.get("urlAlias").indexOf("nominee")>-1 || KIDS.get("urlAlias").indexOf("winner")>-1 || KIDS.get("urlAlias").indexOf("host")>-1)
					ct = "Host/nominees/winners";
			}
			else if(KIDS.get("uri").indexOf("extras")>-1)ct="Extras";
			else if(KIDS.get("uri").indexOf("printables")>-1)ct="Printables";
			else if(KIDS.get("isCharacterPage")== "true" || KIDS.get("isAboutPage")== "true")ct="About-info";
			else if(KIDS.get("uri").indexOf("/club/parent")>-1 || KIDS.get("uri").indexOf("/info/")>-1)ct="About-info";
			
			if(KIDS.get("urlAlias")=="winter-games-tournament")ct="Voting page";
			
			this.setting.prop17 = ct;
			this.setting.eVar17 = ct;
		
			this.setting.eVar16 = this.setting.pageName;
							
			if(this.setting.prop2.length>0){
				if(this.setting.events.length>0)this.setting.events += ",";
				this.setting.events += "event13";
			}

			if(this.setting.prop4.length>0){
				if(this.setting.events.length>0)this.setting.events += ",";
				this.setting.events += "event14";
			}
			this.setting.list1 = list1.join();
			this.setting.prop25 = this.setting.list1;
			
			KIDS.reporting.tracker = new ClickTracker("nickTracker", "nick-track");
			var data = KIDS.reporting.tracker.getReport();
			var navid = null;
			if(data!=null){
				for(var key in data) {
					if(key=="navid"){
						navid=data[key];
						NickLog.debug("click tracking navid="+navid);
					}
				}
			}
			navid = (navid==null) ? KIDS.reporting.qs.navid ? KIDS.reporting.qs.navid : "" : navid;
			
			this.setting.eVar13 = navid;
			this.setting.prop2 = navid;
		}
		
		if(location.pathname.indexOf("/club")!=-1){
			this.setting["name"]="nickvia";
		}
	}catch(e){KIDS.utils.doLog("Configuration.prototype.initialize failed:"+e);}
}
KIDS.reporting.init = function(){
	KIDS.reporting.qs = btg.String.queryStringToObject(location.href);
	KIDS.reporting.site = "Nick.com Proper";
	KIDS.reporting.domain = "nick.com";
	KIDS.reporting.config = new Configuration();
	KIDS.reporting.config.initialize();
		
	//unity detection on hp	
	KIDS.reporting.unityStatus = NICK.utils.getCookie("unityStatus");
	if(typeof unityDetectObject != "undefined"){
		unityDetectObject.detectUnity(function(status) {
			KIDS.reporting.config.setting.prop8=status;
		});			
	}
	if(typeof NICK.choicestream!="undefined"){
		KIDS.reporting.abTest = {"abtestId":"CSAbTestID","abtestGroups":[{name:"Group ChoiceStream",weight:0},{name:"Control Group",weight:100}],"currentGroup":""};
	}
	btg.config.Omniture.percentPageViewedVarMap = {
		previousPage: "prop54",
		percentage:"prop55"
	}
	KIDS.reporting.badgeColorToggleCount = 0;

	//reporting override for nickapp
	try{
		if(KIDS.get("uri").indexOf("/games/nickapp/")>-1){
			KIDS.reporting.config.setName("vianickapp");
			KIDS.reporting.config.setDynamicAccountSelection("true");
			KIDS.reporting.config.setDynamicAccountList("vianickappdev=mtvi.com,localhost");
			var site = "Windows8";
			KIDS.reporting.config.setProp("1",site);
			KIDS.reporting.config.setEVar("1",site);
			var pn = KIDS.reporting.config.getPageName();
			pn = pn.replace(KIDS.reporting.domain,site);
			KIDS.reporting.config.setPageName(pn);
			KIDS.reporting.config.setEVar("16",pn);
			KIDS.reporting.config.setProp("25","");
			KIDS.reporting.config.setList("1","");
			var date=new Date();
			var weekday= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
			var day=weekday[date.getUTCDay()];
			var hour=date.getUTCHours();
			KIDS.reporting.config.setProp("9",date.toUTCString());
			KIDS.reporting.config.setEVar("45",day);
			KIDS.reporting.config.setProp("33",day);
			KIDS.reporting.config.setEVar("46",hour);
			KIDS.reporting.config.setProp("34",hour);
		}
	}catch(e){}
}
KIDS.reporting.firePageLoad = function(){
	KIDS.reporting.omnifunctions.sendReportingCall();
}
KIDS.reporting.kcaVoteInit = function(){
	try{
		if(KIDS.reporting.site == "kca"){
			if(KIDS.reporting.config.setting.pageName.indexOf("/vote")>-1){
				var kcaCurrentCat = NICK.kca.getCurrentUserCategory();
				if(KIDS.reporting.config.setting.pageName.charAt(KIDS.reporting.config.setting.pageName.length-1)!="/")KIDS.reporting.config.setting.pageName+="/";	
				if(kcaCurrentCat != null){
					if(KIDS.reporting.config.setting.pageName.indexOf(kcaCurrentCat.url)<0){
						var tmp = KIDS.reporting.config.setting.pageName.split("/vote/");
						if(tmp[1].length==0)KIDS.reporting.config.setting.pageName+=kcaCurrentCat.url+"/";
					}
				}
			}	
		}
	}catch(e){KIDS.utils.doLog(e.toString());}
}