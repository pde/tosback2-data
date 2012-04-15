/* lopez tonight metadata */
if (window.location.hostname.indexOf("lopeztonight.com") != -1) {
	//prop32,eVar32 - template type
	var domain = window.location.hostname, pathname = window.location.pathname;
	var pattern2 = {
		"adbp:section front":	[(/www\.lopeztonight\.com[\/]?(index\.php)?$/),(/lopeztonight.com\/(galleries|tickets|about|photo|photos|video|forum|groups)[\/]?$/),(/(community|photos)\.lopeztonight\.com[\/]?$/)],
		"adbp:video":			[(/\/video/)],
		"adbp:blog":			[(/\/blog/)],
		"adbp:game":			[(/\/games/)],
		"adbp:misc":			[(/\/galleries/),(/\/search/)],
		"adbp:content":			[(/lopeztonight\.com\/\w+\/\w+/)]
	};
	var templateType = gTBSMatchVal(pattern2, domain + pathname);
	if (!templateType) { templateType = "adbp:misc"; }

	//define adbp metadata
	if (tbs_metadata) {
		tbs_metadata.template_type = templateType;
		//prop28,eVar28 - subchannel
		try {
			if (tbs_metadata.section[1]) {
				tbs_metadata.section[1] = "lopez tonight:" + tbs_metadata.section[1];
			} else {
				tbs_metadata.section[1] = "lopez tonight:no sub section";
			}
		} catch(e) { }
	} else {
		var tbs_metadata = {
			section:			["lopez tonight","lopez tonight:no sub section"],	//channel,eVar27 & prop28,eVar28
			template_type:		templateType,		//prop32,eVar32
			content_type:		"",					//prop33,eVar33
			friendly_name:		"",					//prop4,eVar4
			research_category:	"",					//prop5,eVar5
			lateral_nav:		"",					//prop3,eVar3
			franchise:			"lopez tonight:(362390)"	//prop31,eVar31
		};
	}
}
/* team coco metadata */
else if (window.location.hostname.indexOf("coco") != -1) {
	//prop28,eVar28 - subchannel
	var domain = window.location.hostname.replace("cocop1dev1.turner.com","teamcoco.com"), pathname = window.location.pathname;
	var pattern1 = {
		"homepage":		[(/www\.teamcoco\.com[\/]?$/),(/teamcoco\.com[\/]?$/)],
		"celebs":		[(/teamcoco\.com\/celebs/)],
		"comedy":		[(/teamcoco\.com\/comedy/)],
		"music":		[(/teamcoco\.com\/music/)],
		"fans":			[(/teamcoco\.com\/fans/)],
		"coco moca":	[(/teamcoco\.com\/moca/)],
		"photos":		[(/teamcoco\.com\/photos/)],
		"video":		[(/teamcoco\.com\/video/),(/video\.teamcoco\.com/)],
		"news":			[(/teamcoco\.com\/news/)],
		"schedule":		[(/teamcoco\.com\/schedule/)],
		"tickets":		[(/teamcoco\.com\/tickets/)],
		"buy gear":		[(/teamcoco\.com\/buy-gear/)],
		"win stuff":	[(/teamcoco\.com\/winstuff/)],
		"to go":		[(/teamcoco\.com\/togo/)]
	};
	var subchannel = gTBSMatchVal(pattern1, domain + pathname);
	if (!subchannel) { subchannel = "no sub section"; }
	subchannel = "teamcoco.com:" + subchannel;

	//prop32,eVar32 - template type
	var pattern2 = {
		//"adbp:error":			[(/\/404/)],
		//"adbp:signup":		[(/\/user/)],
		"adbp:section front":	[(/www\.teamcoco\.com[\/]?$/),(/^teamcoco\.com[\/]?$/),(/teamcoco\.com\/(celebs|comedy|music|fans|moca|photos|video|news|schedule|tickets|buy-gear|winstuff|togo)[\/]?$/)],
		"adbp:video":			[(/\/video/)],
		"adbp:blog":			[(/\/blog/)],
		"adbp:game":			[(/\/mintygame/)],
		//"adbp:ecom":			[(/\/shop/)],
		//"adbp:interactive":	[(/oooooooooooo/)],
		"other:slideshow":		[(/teamcoco\.com\/photos/),(/\/photos-/),(/\/gallery/)],
		"adbp:content":			[(/\/content/),(/\/concerts/)],
		"other:poll":			[(/content\/what-issue-should-team-coco-solvebusters-tackle-next/)],
		"other:schedule":		[(/\/schedule/)],
		//"other:quiz":			[(/\/quiz/)],
		"other:tag":			[(/category\/tags/),(/hahaifoundanerror/)],
		//"other:enhancedtag":	[(/oooooooooooo/)],
		"other:contest":		[(/\/winstuff/)],
		"other:feature":		[(/blimp/),(/theflamingc/),(/conanobriencantstop\.com/)]
	};
	var templateType = gTBSMatchVal(pattern2, domain + pathname);
	if (templateType == "other:tag") {	//define enhanced tag
		var j = document.getElementsByTagName("div");
		for (var i = 0; i < j.length; i++) {
			if (j[i].className == "content-right") {
				templateType = "other:enhancedtag";
				break;
			}
		}
	}
	if (!templateType) { templateType = "adbp:misc"; }
	//if (document.title.indexOf("Oops! There was a problem") != -1) { templateType = "adbp:error"; }

	//prop4,eVar4 - friendly name
	var friendlyName = "TeamCoco.com:Other";
	var pathName = window.location.pathname.substring(1);
	var pathArray = pathName.split('/');
	var host = window.location.host;
	if ((host == "www.teamcoco.com" || host == "teamcoco.com") && (pathArray[0] == "index" || pathArray[0] == "/"|| pathArray[0] == "" || pathArray[0] == null)) {
		friendlyName = "TeamCoco.com:Home Page";
	} else if (host == "stage.theconanblimp.com" || host == "theconanblimp.com" || host == "blimp.teamcoco.com") {
		friendlyName = "TeamCoco:The Conan Blimp";
	} else if (host == "conanobriencantstop.com" || host == "www.conanobriencantstop.com") {
		friendlyName = "TeamCoco:Can't Stop";
	} else if (pathArray[0] == "blimp") {
		friendlyName = "TeamCoco.com:http://www.teamcoco.com/blimp";
	} else if (pathArray[0] == "blog") {
		if (pathArray[1] == "") { 	 
			friendlyName = "TeamCoco.com:Blog:Home"; 	 
		} else { 
			friendlyName = "TeamCoco.com:Blog:" + document.title;
		}
	} else if (pathArray[0] == "fans") {
		friendlyName = "TeamCoco.com:Fan Wall";
	} else {
		friendlyName = "TeamCoco.com:" + document.title;
	}

	//define adbp metadata
	var tbs_metadata = {
		section:			["teamcoco.com",subchannel],	//channel,eVar27 & prop28,eVar28
		template_type:		templateType,		//prop32,eVar32
		content_type:		"",					//prop33,eVar33
		friendly_name:		friendlyName,		//prop4,eVar4
		research_category:	"",					//prop5,eVar5
		lateral_nav:		"",					//prop3,eVar3
		franchise:			"conan:(369672)"	//prop31,eVar31
	};
} else if(window.location.hostname.indexOf("tbs") > -1){
	/**
	* This file sets the "tbs_metadata" to be used by jsmd.js
	*
	* Basic structure of tbs_metadata (json)
	*
	var tbs_metadata = {
	section: ["series","family guy"],
	template_type: "",
	content_type: "",
	friendly_name: "",
	research_category: "",
	lateral_nav: "",
	franchise: "",
	search: {
	number_results: ""
	}
	}
	*
	*/
	//prepares the URL to be parsed
	var pathname = window.location.pathname.substring(1);
	var path_array = pathname.split('/'); // path_array[0] is first element after domain. If "" then assume default "index.html"
	var host = window.location.host;
	var search_metadata;
	/* The following code is used to detect and correct auto play functionality in the video section */
	(function(){
		if((document.getElementById("vidResultsList") != null) && (isAutoPlay != null)){
			var vrl = document.getElementById("vidResultsList");
			var alist = vrl.getElementsByTagName("a");
			var alen = alist.length;
			for(var i = 0; i < alen; i++){
				if(alist[i].title == "play video"){
					alist[i].onclick = function(){isAutoPlay = false;};
				}
			}
		}
	})();
	//Skip the metadata changes if on Elements of the Big Bang Theory
	if(tbs_friendlyName != "elements of the big bang theory"){
		/**
		* set each variable according to the path
		*/
		tbs_section = {
			"": "home",
			undefined: "home",
			"index": "home",
			"games": "games",
			"movies": "movies",
			"officefun": "game",
			"schedule": "schedule",
			"sweepstakes": "sweepstakes",
			"mobileapp.jsp": "mobile apps",
			"stories": "stories",
			"shows": "shows",
			"stories": "shows",
			"Major League Baseball": "major league baseball", 
			"affinity": "game"
		}[(path_array[0] != null ? path_array[0].split(".")[0]: path_array[0])];
		if(tbs_section == "major league baseball"){
			tbs_subsection = "Schedule";
		};
		if (path_array[0].split("_")[0] == "sweepstakes"){
			tbs_section = "sweepstakes";
		}
		tbs_subsection = {
			undefined: "main",
			"": "main",
			"cast": "content",
			"games": "game",
			"officefun": "game",
			"stories": "content",
			"movietitle": "movie",
			"americandad": "american dad",
			"arewethereyet": "are we there yet",
			"meetthebrowns": "meet the browns",
			"mynameisearl": "my name is earl",
			"theoffice": "the office",
			"houseofpayne": "house of payne",
			"seinfeld": "seinfeld",
			"kingofqueens": "king of queens",
			"everybodylovesraymond": "everybody loves raymond",
			"freshprince": "fresh prince of bell-air",
			"friends": "friends",
			"savedbythebell": "saved by the bell",
			"steveharvey": "the steve harvey show",
			"yesdear": "yes dear",
			"marriedwithchildren": "married with children",
			"homeimprovement": "home improvement",
			"Schedule": "schedule",
			"familyguy": "family guy"
		}[(path_array[1] != null ? path_array[1].split(".")[0]: path_array[1])];
		if(tbs_subsection == undefined && tbs_section == "shows"){
			tbs_subsection = tbs_franchise.replace("Shows:", "");
		}
		if ((path_array[0]) && (!path_array[1]) && (tbs_section !="home")){
			tbs_templateType = path_array[1];//"section front";
		} else {
			tbs_templateType = {
				"about": "content",
				"story": "content", 
				"storywide": "content",
				"movietitle": "blog", 
				"video": "video",
				"officefun": "game"
			}[path_array[2]];
		}
		if(tbs_franchise =="TBS Games"){
			tbs_section = "TBS Game";
		}
		if(tbs_templateType == "" || tbs_templateType == null){
			tbs_templateType = {
			"": "index",
			"index":	"index",
			"shows":	((tbs_lateralNav.search("Downloads") != -1 || tbs_lateralNav.search("Ecard")!= -1 ) ? "misc" : "content"),
			"video":	"video",
			"movies":	"content",
			"games":	((path_array[1] == "") ? "section front" : "game"), 
			"cvp":	"video",
			"game": "game",
			"officefun": "game"
			}[path_array[0]];
		}
		if (tbs_lateralNav.search("Game") != -1 || tbs_lateralNav.search("Quiz")!= -1 ){
			tbs_templateType = "game"
		}
		tbs_contentType = {
			"": "content",
			"blog":	"blog read",
			//"video":	"video start",
			"game":	"game played",
			"content":	"article read",
			"officefun": "game played"
		}[tbs_templateType];
		/**
		* construct the final metadata object to be parsed by jsmd.js
		*/
		if(tbs_section == undefined || tbs_section == null || tbs_section == "" || tbs_section == " "){
			tbs_section = (path_array[0] ? path_array[0].split(".")[0] : "other");
		}
	};
	var tbs_metadata = {
		section: [tbs_section, tbs_section + ":" + tbs_subsection],
		template_type: tbs_templateType||"misc",
		content_type: tbs_contentType||"none",
		friendly_name: tbs_friendlyName||"",
		research_category: tbs_researchCategory||"",
		lateral_nav: tbs_lateralNav||"",
		franchise: tbs_franchise||"",
		search: search_metadata||""
	};
//	console.log(tbs_metadata);
	$(document).ready(function(){
		$("a[href^='http://www.tbs.com']").each(function(){
			this.href = this.href.replace(/^http:\/\/www\.tbs\.com/, " ");
		});
	});
}

/* pattern match function */
function gTBSMatchVal(_p, _m){
	var p = _p, match = _m;
	var matchVal = "", tm = false;
	function chkMatch(_ra,_val) {
		var v = false, re, l = _ra.length;
		for(var i = 0; i<l; i++) {
			re = _ra[i];
			if (re.test(match)) { return _val; }
		}
		return null;
	}
	var m = _m;
	for(m in p) {
		tm = chkMatch(p[m],m);
		if(tm) {matchVal = tm; break;}
	}
	return matchVal;
}