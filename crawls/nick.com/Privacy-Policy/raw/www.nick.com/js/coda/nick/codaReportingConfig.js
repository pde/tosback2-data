if(typeof KIDS == "undefined" || !KIDS) var KIDS = {};

KIDS.namespace("reporting");

KIDS.reporting.config;
KIDS.reporting.qs;
KIDS.reporting.unityStatus;
KIDS.reporting.domain;
KIDS.reporting.site;
KIDS.reporting.abTest;

Configuration.prototype.initialize = function(){
	try{
		this.init();
		this.setting["name"]="nickvia";
		this.setting["dynamicAccountSelection"] = true;
		this.setting["dynamicAccountList"] = "nickviadev=nick-d.mtvi.com,nick-q.mtvi.com";
		this.setting["linkInternalFilters"] = "javascript:,nick.com";
		this.setting["trackExternalLinks"] = true;
		this.setting["trackDownloadLinks"] = true;
		this.setting["trackInlineStats"] = false;
		if(!this.isLink()){
			this.setting.prop1 = KIDS.reporting.site;
			this.setting.eVar1 = KIDS.reporting.site;
			this.setting.pageName = KIDS.get("uri");
			
			this.setting.channel=KIDS.get("type");
			
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
			if(KIDS.get("urlAlias")== "")ct = "Hub page";
			else if(KIDS.get("isListingPage")=="true"){
				if(KIDS.get("urlAlias").indexOf("builder")>-1)ct = "Game";
				else if(KIDS.get("primaryType")== ""&& KIDS.get("type")== "club"){
					if (NICK.club != undefined){
						var tmp = location.pathname.split("/");
						if(tmp[2]=="main"||tmp[2]=="games" || tmp[2]=="videos" || tmp[2]=="shows" || tmp[2]=="buddies" || tmp[2]=="room" || tmp[2]=="awards"){
							this.setting.pageName = KIDS.reporting.domain+"/"+tmp[1]+"/"+tmp[2];
							this.setting.hier2 = KIDS.reporting.domain+"/"+tmp[1]+"/profiles/"+tmp[2];
							ct="Club Profile";
						}else ct="Hub page";
					}					
				}else if(KIDS.get("uri").indexOf("vote")>-1)ct = "Voting page";
				else if(KIDS.get("urlAlias").indexOf("nominee")>-1 || KIDS.get("urlAlias").indexOf("winner")>-1 || KIDS.get("urlAlias").indexOf("host")>-1)
						ct = "Host/nominees/winners";
				else if(KIDS.get("uri").indexOf("/specials/valentines")>-1)ct = "Extras";
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
				else if(KIDS.get("uri").indexOf("extras")>-1)ct="Extras";
				else if(KIDS.get("urlAlias").indexOf("nominee")>-1 || KIDS.get("urlAlias").indexOf("winner")>-1 || KIDS.get("urlAlias").indexOf("host")>-1)
					ct = "Host/nominees/winners";
			}else if(KIDS.get("uri").indexOf("extras")>-1)ct="Extras";
			else if(KIDS.get("uri").indexOf("printables")>-1)ct="Printables";
			else if(KIDS.get("isCharacterPage")== "true" || KIDS.get("isAboutPage")== "true")ct="About-info";
			else if(KIDS.get("uri").indexOf("/club/parent")>-1 || KIDS.get("uri").indexOf("/info/")>-1)ct="About-info";
			
			if(KIDS.get("urlAlias")=="winter-games-tournament")ct="Voting page";
			
			this.setting.prop17 = ct;
			this.setting.eVar17 = ct;
			
			this.setting.eVar16 = this.setting.pageName;
			this.setting.eVar13 = KIDS.reporting.qs.navid;
			this.setting.prop2 = KIDS.reporting.qs.navid;
			
			if(this.setting.prop2.length>0){
				if(this.setting.events.length>0)this.setting.events += ",";
				this.setting.events += "event13";
			}
			if(this.setting.prop4.length>0){
				if(this.setting.events.length>0)this.setting.events += ",";
				this.setting.events += "event14";
			}
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
	btg.config.Omniture.account = 'nickvia';
	btg.config.Omniture.dynamicAccountSelection = 'true';
	btg.config.Omniture.dynamicAccountList = 'nickviadev=nick-d.mtvi.com,nick-q.mtvi.com';
	btg.config.Omniture.linkInternalFilters = 'javascript:,nick.com';
	btg.config.Omniture.trackInlineStats = true;
	btg.config.Omniture.trackExternalLinks = true;
	btg.config.Omniture.trackDownloadLinks = true;
	KIDS.reporting.config.setting.name = "nickvia";
	
	//unity detection on hp	
	KIDS.reporting.unityStatus = NICK.utils.getCookie("unityStatus");
	if(typeof unityDetectObject != "undefined"){
		unityDetectObject.detectUnity(function(status) {
			KIDS.reporting.config.setting.prop8=status;
		});			
	}
	if(typeof NICK.choicestream!="undefined"){
		KIDS.reporting.abTest = {"abtestId":"CSAbTestID","abtestGroups":[{name:"Group ChoiceStream",weight:99},{name:"Control Group",weight:1}],"currentGroup":""};
	}
	mtvn.btg.config.ReportSettings.Omniture.percentPageViewedVarMap = {
		previousPage: "prop54",
		percentage:"prop55"
	}
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