// global nav tray open/close
function adbpTrayNav(state){
	attrStr = "gn_games_hp_link_shw" + state;
	typeStr = "cnt-allshow";
	try {
		trackMetrics({
			type: typeStr,
			data: {
				attribution: attrStr	//current prop14
			}
		});
	} catch(e){}
}
//Add click tracking to end slate thumbnails
function adbpTVEndSlate(showName, index){
	attrStr = "tve_thumb" + index +"_"+ showName;
	typeStr = "cnt-allshow";
	try {
		trackMetrics({
			type: typeStr,
			data: {
				attribution: attrStr	//current prop14
			}
		});
	} catch(e){}
}

function adbpGnav(state){
	attrStr = "cn_miniprofile" + state;
	typeStr = "cnt-gnav";
	try {
		trackMetrics({
			type: typeStr,
			data: {
				attribution: attrStr	//current prop1
			}
		});
	} catch(e){}
}

// global nav tray open/close
function adbpFFDownload(){
	try {
		trackMetrics({
			type: "cnt-game-unity-download",
			data: {
				game : {
					detail:	"fusionfall",
					title:	"fusionfall",
					type:	""
				}
			}
		});
	} catch(e){}
}


function adbpGameCategory(catname){
	try {
		trackMetrics({
			type: "cnt-gamehome-category",
			data: {
				game : {
					detail:	catname				}
			}
		});
	} catch(e){}
}

function adbpHOGVoting(catname){
    try {
		trackMetrics({
			type: "cnt-interaction",
			data: {
				interaction_type: catname
			}
		});
    } catch(e){}
}


// old (pre-2011) games template achiement status
/*
if ((typeof pageState == "undefined") && (typeof cartoonMSIB_pid != "undefined")) {
	try {
		trackMetrics({
			type: "cnt-game-achievements",
			data: {
				detail : "unavailable"
			}
		});
	} catch(e){}
}
*/

// achievement game login clicks
function adbpAchievementActivity (state) {
	/* when user clicks on 'Log In' button */
	typeStr = "cnt-game-" + state;
	titleArray = document.title.split(' | ');
	try {
		trackMetrics({
			type: typeStr,
			data: {
				game : {
					title:	titleArray[1],
					type:	"achievement"
				}
			}
		});
	} catch(e){}
}


function adbpCNProfile(catname, state){
	typeStr = catname+ "_" +state;
	try {
		trackMetrics({
			type: "cnt-social",
			data: {
				detail:	typeStr
			}
		});
	} catch(e){}
	//alert(catname + "_" + state);
}


// search reporting
function adbpSearch () {
	try {
		trackMetrics({
			type: "cnt-search",
			data: {
				detail:	totalSearchResults
			}
		});
	} catch(e){}
}

// video reporting
function trackVideo(p_type, p_context) {            
	try {
		trackMetrics({
			type: p_type,
			data: {video : p_context}
		});
	} catch(e){}    
}

/* start creating adbp metadata here */
/* template type */
var domain = window.location.hostname.replace("fusionfallstaging.cartoonnetwork.com","fusionfall.cartoonnetwork.com"), pathname = window.location.pathname;
domain = domain.replace("staging.cartoonnetwork.com","www.cartoonnetwork.com");
var patterns = {
		err:[1,(/Error Page/),(/Page not found/)], //uses document.title
		sf:[0,(/\.com\/(games|video|schedule|tv_shows)\/index\.html/),(/fusionfall\.cartoonnetwork\.com[\/]?(index\.php)?$/),(/nbahooptroop\.com[\/]?$/)
			,(/\/(around|games|leaders|scores|standings|tour|forums)[\/]?$/),(/blog\.cartoonnetwork\.com[\/]?$/)],
		b:[0,(/blog\.cartoonnetwork\.com\//)],
		o:[0,(/\/video\/(problemsolverz|tvmadness)/),(/downloads/),(/\/sweepstakes/),(/\/vote\//),(/\/host\/index/)
			,(/\/evo\.htm/),(/\/third_two\.htm/),(/\/thankyou\.htm/),(/\/map\.htm/),(/\/casefiles\.htm/),(/\/gear\.htm/)
			,(/\/joinTeam\.htm/),(/\/photos\.htm/),(/\/pictures\/index\.htm/),(/\/whatweknow\.htm/),(/\/maskmaker\.htm/)
			,(/\/matches\.htm/),(/\/royalthumble\.htm/),(/\/story\.htm/),(/\/wrestlers\.htm/),(/\/factcheck\.htm/)],
		g:[0,(/\/games/),(/\/tv_shows\/starwars\/games/),(/ben10gamecreator\.cartoonnetwork\.com/)
			,(/batmangamecreator\.cartoonnetwork\.com/),(/starwarsgamecreator\.cartoonnetwork\.com/),(/\/ben10_games/)
			,(/nbahooptroop\.com\/big\-league\-bites/),(/nbahooptroop\.com\/nba\-basketball\-showdown/)
			,(/nbahooptroop\.com\/trick\-hoops/),(/nbahooptroop\.com\/three/)
			,(/fusionfall\.cartoonnetwork\.com\/play\//)],
		v:[0,(/\/video/),(/\/ben10_video/),(/\/video\.htm/),(/cartoonnetwork\.com\/full-episodes/)],
		"o:characters":[0,(/\/characters/),(/\/char(\-bad)?\.htm/)],
		"o:photo gallery":[0,(/\/gallery/)],
		"o:show":[0,(/\/tv_shows/),(/\.com\/tdi\/index/)],
		"o:services":[0,(/\/legal/),(/help\.cartoonnetwork\.com/)],
		"o:forums":[0,(/\/forums/)],
		"o:search":[0,(/\/search/)],
		"in":[0,(/www\.cartoonnetwork\.com[\/]?$/),(/www\.cartoonnetwork\.com\/index.html$/)],
		s:[0,(/\/user/),(/\/account/)]
	},
	match = [
		domain + pathname,
		document.title,
		domain
	];
var adbpTemplateObj = gADBPTemplateType("unknown", patterns, match);
var page_template_type = adbpTemplateObj["full"];
if (page_template_type == "adbp:other") page_template_type = "adbp:misc";	//according to new sdr

/* channel */
/* new file */
var path_array = pathname.replace(/([^\/]+\.[^\/]+$)/,"").split("/"), path1 = path_array[1], path2 = path_array[2]||"";
if (page_template_type && page_template_type == "adbp:index") path1 = "home";
if (domain.indexOf("fusionfall") != -1) {
	if (path1) path2 = path1;
	path1 = "fusionfall";
	if (pathname == "/splashpage.php") path2 = "splashpage";
} else if (domain.indexOf("ben10gamecreator") != -1) {
	if (path1) path2 = path1;
	path1 = "ben10gamecreator";
} else if (domain.indexOf("batmangamecreator") != -1) {
	if (path1) path2 = path1;
	path1 = "batmangamecreator";
} else if (domain.indexOf("starwarsgamecreator") != -1) {
	if (path1) path2 = path1;
	path1 = "starwarsgamecreator", path2 = "starwarsgamecreator";
} else if (pathname.indexOf('/gamecreator/')) {
	path1 = "ben10gamecreator", path2 = "ben10gamecreator";
	if (!(isIE)) {
		console.log("PATHS:");
		console.log(path1);
		console.log(path2);
	}
} else if (pathname.indexOf('/gamecreatorbm/')) {
	path1 = "batmangamecreator", path2 = "batmangamecreator";
} else if (pathname.indexOf('/gamecreatorsw/')) {
	path1 = "starwarsgamecreator", path2 = "starwarsgamecreator";
} else if (domain.indexOf("mixit") != -1) {
	if (path1) path2 = path1;
	path1 = "mixit";
} else if (domain.indexOf("nbahooptroop") != -1) {
	var path1_pattern1 = {
		"games":			[(/^\/(big\-league\-bites|nba\-basketball\-showdown|trick\-hoops|three)/)],
		"around the nba":	[(/^\/around/)],
		"playoffs":			[(/^\/playoffs/)],
		"run-it-back":		[(/^\/run\-it\-back/)]
	};
	var tmpPath1 = gCNTMatchVal(path1_pattern1, pathname);
	if (tmpPath1) path1 = tmpPath1;
	if (path1) path2 = path1;
	if (pathname.match(/^\/(topper|content)/)) path2 = "";
	path1 = "nbahooptroop";
} else if (domain.indexOf("blog.cartoonnetwork.com") != -1) {
	path1 = "blog";
	path2 = path_array[4]||"";
} else if (domain.indexOf("help.") != -1) {
	path1 = "help", path2 = "";
} else if (pathname.match(/^\/tdi\//)) {
	path1 = "tv_shows", path2 = "tdi";
} else if (pathname.match(/\/exonaut\//)) {
	path1 = "exonaut", path2 = "games";
} else if (pathname.match(/\/formula-cartoon\//)) {
	path1 = "formula-cartoon", path2 = "games";
} else if (pathname.match(/\/wild-skies\//)) {
	path1 = "dragons wild skies", path2 = "games";
} else if (pathname.match(/\/finn-and-jakes-epic-quest\//)) {
	path1 = "adventure time epic quest", path2 = "games";
} else if (pathname.match(/^\/video\/problemsolverz/) || pathname.match(/^\/video\/tvmadness/)) {
	path1 = "list";
} else if (pathname.match(/^\/accounts\//)) {
	var path_array2 = pathname.replace(/\.html/,"").split("/");
	path2 = path_array2[2];
} else if (pathname.match(/^\/(legal|forums)\//)) {
	var path_array2 = pathname.replace(/\.(html|jspa)/,"").split("/");
	path2 = path_array2[2];
}
if (!path1) path1 = "undefined";
/*
	"staging.cartoonnetwork.com":				"carnetnmtest",
	"redesign.cartoonnetwork.com":				"carnetnmtest",
	"gcstage.cartoonnetwork.com":				"carnetnmtest",
	"bgcstage.cartoonnetwork.com":				"carnetnmtest",
	"swgcstage.cartoonnetwork.com":				"carnetnmtest",
	"nbakidsp1dev1.turner.com":					"carnetnmtest",

	"www.cartoonnetwork.com":					"carnetnmprod",
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
*/
if (pathname.match(/\/tv_shows\/starwars\/games/)) path1 = "games";

/* subchannel */
if (path2 == "cc") path2 = "other";

/* game title */
var game_title = "";

/* game type */
var game_type = "";
if (pathname.match(/^\/games/) || pathname.match(/\/tv_shows\/starwars\/games/)) game_type = "mini";
//if (pathname.match(/games/)) game_type = "mini";
if (domain.indexOf("fusionfall") != -1) {
	game_type = "fusion fall";
} else if (domain.indexOf("ben10gamecreator") != -1 || domain.indexOf("batmangamecreator") != -1 || domain.indexOf("starwarsgamecreator") != -1) {
	game_type = "game creator";
}

/* super franchise */
var super_franchise = "";
if (pathname.match(/^\/(games|tv_shows)\/ben10/)) super_franchise = "ben 10";
if (pathname.match(/^\/(games|tv_shows)\/scooby/)) super_franchise = "scooby";
if (pathname.match(/^\/(games|tv_shows)\/tda/) || pathname.match(/^\/(games|tv_shows)\/tdwt/) || pathname.match(/^\/tdi\//)) super_franchise = "total drama";

/* franchise partner */
var franchise_partner = "";
var pattern1 = {
	//"nba hoop troop":					[(/\/(games|tv_shows)\/nbahooptroop/),(/nbahooptroop\.com/)],
	//"fusionfall":						[(/fusionfall\.cartoonnetwork\.com/)],
	"adventure time":					[(/\/(games|tv_shows)\/adventuretime/)],
	"almost naked animals":				[(/\/(games|tv_shows)\/almostnakedanimals/)],
	"bakugan":							[(/\/(games|tv_shows)\/bakugan/)],
	"batman: the brave and the bold":	[(/\/(games|tv_shows)\/batmanbb/),(/\/tv_shows\/thebatman/),(/batmangamecreator\.cartoonnetwork\.com/)],
	"hotwheels: battle force 5":		[(/\/(games|tv_shows)\/battleforce5/)],
	"ben 10 alien force":				[(/\/(games|tv_shows)\/ben10af/)],
	"ben 10 movie":						[(/\/(games|tv_shows)\/ben10movie/)],
	"ben 10 ultimate alien":			[(/\/(games|tv_shows)\/ben10ua/)],
	"ben 10":							[(/\/(games|tv_shows)\/ben10/),(/ben10gamecreator\.cartoonnetwork\.com/)],
	"beyblade metal fusion":			[(/\/(games|tv_shows)\/beyblade/)],
	"grim adventures of billy and mandy":	[(/\/(games|tv_shows)\/billymandy/)],
	"bobb'e says":						[(/\/(games|tv_shows)\/bobbesays/)],
	"boomerang":						[(/\/(games|tv_shows)\/boomerang/)],
	"camp lazlo":						[(/\/(games|tv_shows)\/camplazlo/)],
	"chop socky":						[(/\/(games|tv_shows)\/chopsocky/)],
	"chowder":							[(/\/(games|tv_shows)\/chowder/)],
	"courage the cowardly dog":			[(/\/(games|tv_shows)\/courage/)],
	"destroy build destroy":			[(/\/(games|tv_shows)\/dbd/)],
	"dexter's laboratory":				[(/\/(games|tv_shows)\/dexter/)],
	"dude, what would happen":			[(/\/(games|tv_shows)\/dude/)],
	"dragons":							[(/\/(games|tv_shows)\/dragons/)],
	"ed, edd n' eddy":					[(/\/(games|tv_shows)\/eds/)],
	"firebreather":						[(/\/(games|tv_shows)\/firebreather/)],
	"flapjack":							[(/\/(games|tv_shows)\/flapjack/)],
	"foster's home for imaginary friends":	[(/\/(games|tv_shows)\/fosters/)],
	"the garfield show":				[(/\/(games|tv_shows)\/garfield/)],
	"generator rex":					[(/\/(games|tv_shows)\/generatorrex/)],
	"george of the jungle":				[(/\/(games|tv_shows)\/georgejungle/),(/\/(games|tv_shows)\/georgeofthejungle/)],
	"the amazing world of gumball":		[(/\/(games|tv_shows)\/gumball/)],
	"my gym partner's a monkey":		[(/\/(games|tv_shows)\/gympartner/)],
	"hall of game":						[(/\/(games|tv_shows)\/hallofgame/)],
	"hero 108":							[(/\/(games|tv_shows)\/hero108/)],
	"hole in the wall":					[(/\/(games|tv_shows)\/hole/),(/\/(games|tv_shows)\/hole\-in\-the\-wall/)],
	"johnny test":						[(/\/(games|tv_shows)\/johnnytest/)],
	"codename: kids next door":			[(/\/(games|tv_shows)\/knd/)],
	"the looney tunes show":			[(/\/(games|tv_shows)\/looneytunesshow/)],
	"league of super evel":				[(/\/(games|tv_shows)\/lose/)],
	"mad":								[(/\/(games|tv_shows)\/mad/),(/\/video\/tvmadness/)],
	//"move it movement":					[(/\/(games|tv_shows)\/mim/)],
	"pokemon: black and white":			[(/\/(games|tv_shows)\/pokemon/)],
	"the powerpuff girls":				[(/\/(games|tv_shows)\/ppg/)],
	"regular show":						[(/\/(games|tv_shows)\/regularshow/)],
	//"run it back":						[(/\/(games|tv_shows)\/run\-it\-back/)],
	"scooby-doo! mystery incorporated":	[(/\/(games|tv_shows)\/scoobydoomysteryinc/)],
	"sidekick":							[(/\/(games|tv_shows)\/sidekicks/)],
	"star wars: the clone wars":		[(/\/(games|tv_shows)\/starwars/),(/starwarsgamecreator\.cartoonnetwork\.com/)],
	//"stop bullying: speak up":			[(/\/(games|tv_shows)\/stopbullying/)],
	"the superhero squad show":			[(/\/(games|tv_shows)\/superherosquad/)],
	"sym-bionic titan":					[(/\/(games|tv_shows)\/symbionictitan/)],
	"total drama action":				[(/\/(games|tv_shows)\/tda/)],
	"total drama island":				[(/\/(games|tv_shows)\/tdi/),(/\.com\/tdi\//)],
	"total drama world tour":			[(/\/(games|tv_shows)\/tdwt/)],
	"teen titans":						[(/\/(games|tv_shows)\/titans/),(/\/(games|tv_shows)\/teentitans/)],
	"the othersiders":					[(/\/(games|tv_shows)\/theothersiders/)],
	"the problem solverz":				[(/\/(games|tv_shows)\/theproblemsolverz/),(/\/video\/problemsolverz/)],
	"the scooby movie":					[(/\/(games|tv_shows)\/thescoobymovie/)],
	"thundercats":					[(/\/(games|tv_shows)\/thundercats/)],
	//"tko: titanic kungfubot offensive":	[(/\/(games|tv_shows)\/tko/)],
	"tom and jerry":					[(/\/(games|tv_shows)\/tomjerry/),(/\/(games|tv_shows)\/tj/)],
	"tower prep":						[(/\/(games|tv_shows)\/towerprep/)],
	"the secret saturdays":				[(/\/(games|tv_shows)\/(tss|secretsaturdays)/)],
	"thumb wrestling federation":		[(/\/(games|tv_shows)\/twf/)],
	"unnatural history":				[(/\/(games|tv_shows)\/unnaturalhistory/)],
	"young justice":					[(/\/(games|tv_shows)\/youngjustice/)],
	"TVEverywhere":					[(/full-episodes/)]
};
franchise_partner = gCNTMatchVal(pattern1, domain + pathname);
//if (!franchise_partner) franchise_partner = path2;

/* adbp metadata */
var cnt_metadata = {
	super_franchise:	super_franchise,		//prop11,eVar11 - ben 10, total drama
	game_title:			game_title,				//prop21,eVar21 - game title
	game_type:			game_type,				//prop22,eVar22 - mini, game creator, fusion fall
	page_template_type:	page_template_type,		//prop32,eVar32	- adbp:index, adbp:other, etc.
	page_channel:		path1,					//channel,eVar27 - channel
	page_subchannel:	path1 + ":" + path2,	//prop28,eVar28 - subchannel
	franchise_partner:	franchise_partner		//prop31,eVar31 - the closer, leverage, etc.
}

/* pattern match function */
function gCNTMatchVal(_p, _m){
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
/* adbp plugins */
function gADBPTemplateType(defaultString,patterns,matchStrings,bsRules,bsMatchStringIndex) {
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
}
function gADBPTranslateTemplateType (templateTypeCode,lookupType) {
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
}