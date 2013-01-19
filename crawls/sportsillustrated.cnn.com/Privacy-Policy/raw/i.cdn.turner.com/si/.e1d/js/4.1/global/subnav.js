/* update */
var siNav = {
	load : function (nav) {
		for (var t in nav) {
			var html = this.buildSubNav(nav[t]);
			$('#cnnBotnav li[nav=\''+t+'\']').append(html);
			siLog.debug('siNav: built ' + t + ' subnav');
		}
		cnnStartList();
	},
	buildSubNav : function (nav) {
		var out = "<ul>\n";
		for (var i=0; i<nav.length; i++) {
			var item = nav[i];
			if (item.cl) { /* class, if needed, should only be set at the beginning of a subnav */
				out = "<ul class="+ item.cl +">\n";
			}
			if (item.u && item.l) {
				if(item.u == "#") {
					if (item.c) {out += '<li class="' + item.c + '">' + item.l;}
					else {out += '<li>' + item.l;}
				} else {
					out += '<li><a href="' + item.u + '">' + item.l + '</a>';
				}
				if (item.s) {
					out += "\n";
					out += this.buildSubNav(item.s);
				}
				out += "</li>\n";
			}
		}
		out += "</ul>\n";
		return out;
	}
};

siNav.load({
	"nfl" : [
		{ "u": "/football/nfl/scoreboards/today/?eref=sinav",	"l":"Scores" },
		{ "u":"/football/nfl/teams/?eref=sinav",	"l":"Teams", 
			"s": [
				{ "u":"#", "c":"cnnTeamDivisionTitle fb-american",			"l":"American Football Conference" },
			    { "u":"#", "c":"cnnTeamDivision", 							"l":"EAST" },
			    { "u":"#", "c":"cnnTeamDivision", 							"l":"NORTH" },
			    { "u":"#", "c":"cnnTeamDivision", 							"l":"SOUTH" },
			    { "u":"#", "c":"cnnTeamDivision", 							"l":"WEST" },
			    { "u":"/football/nfl/teams/buffalo-bills/?eref=sinav", 				"l":"Bills" },
			    { "u":"/football/nfl/teams/cincinnati-bengals/?eref=sinav", 			"l":"Bengals" },
			    { "u":"/football/nfl/teams/indianapolis-colts/?eref=sinav",			"l":"Colts" },
			    { "u":"/football/nfl/teams/denver-broncos/?eref=sinav",				"l":"Broncos" },
			    { "u":"/football/nfl/teams/miami-dolphins/?eref=sinav",				"l":"Dolphins" },
			    { "u":"/football/nfl/teams/cleveland-browns/?eref=sinav",				"l":"Browns" },
			    { "u":"/football/nfl/teams/jacksonville-jaguars/?eref=sinav",			"l":"Jaguars" },
			    { "u":"/football/nfl/teams/san-diego-chargers/?eref=sinav",			"l":"Chargers" },
			    { "u":"/football/nfl/teams/new-york-jets/?eref=sinav", 				"l":"Jets" },
			    { "u":"/football/nfl/teams/baltimore-ravens/?eref=sinav",				"l":"Ravens" },
			    { "u":"/football/nfl/teams/houston-texans/?eref=sinav",				"l":"Texans" },
			    { "u":"/football/nfl/teams/kansas-city-chiefs/?eref=sinav",			"l":"Chiefs" },
			    { "u":"/football/nfl/teams/new-england-patriots/?eref=sinav",			"l":"Patriots" },
			    { "u":"/football/nfl/teams/pittsburgh-steelers/?eref=sinav",			"l":"Steelers" },
			    { "u":"/football/nfl/teams/tennessee-titans/?eref=sinav",				"l":"Titans" },
			    { "u":"/football/nfl/teams/oakland-raiders/?eref=sinav",				"l":"Raiders" },
			    { "u":"#", "c":"cnnTeamDivisionTitle fb-national bottom", 	"l":"National Football Conference" },
			    { "u":"#", "c":"cnnTeamDivision",							"l":"EAST" },
			    { "u":"#", "c":"cnnTeamDivision", 							"l":"NORTH" },
			    { "u":"#", "c":"cnnTeamDivision", 							"l":"SOUTH" },
			    { "u":"#", "c":"cnnTeamDivision", 							"l":"WEST" },
			    { "u":"/football/nfl/teams/dallas-cowboys/?eref=sinav",				"l":"Cowboys" },
			    { "u":"/football/nfl/teams/chicago-bears/?eref=sinav", 				"l":"Bears" },
			    { "u":"/football/nfl/teams/tampa-bay-buccaneers/?eref=sinav",			"l":"Buccaneers" },
			    { "u":"/football/nfl/teams/arizona-cardinals/?eref=sinav",				"l":"Cardinals" },
			    { "u":"/football/nfl/teams/philadelphia-eagles/?eref=sinav",			"l":"Eagles" },
			    { "u":"/football/nfl/teams/detroit-lions/?eref=sinav", 				"l":"Lions" },
			    { "u":"/football/nfl/teams/atlanta-falcons/?eref=sinav",				"l":"Falcons" },
			    { "u":"/football/nfl/teams/san-francisco-49ers/?eref=sinav",			"l":"Niners" },
			    { "u":"/football/nfl/teams/new-york-giants/?eref=sinav",				"l":"Giants" },
			    { "u":"/football/nfl/teams/green-bay-packers/?eref=sinav",				"l":"Packers" },
			    { "u":"/football/nfl/teams/carolina-panthers/?eref=sinav",				"l":"Panthers" },
			    { "u":"/football/nfl/teams/st-louis-rams/?eref=sinav",					"l":"Rams" },
			    { "u":"/football/nfl/teams/washington-redskins/?eref=sinav",			"l":"Redskins" },
			    { "u":"/football/nfl/teams/minnesota-vikings/?eref=sinav",				"l":"Vikings" },
			    { "u":"/football/nfl/teams/new-orleans-saints/?eref=sinav",			"l":"Saints" },
			    { "u":"/football/nfl/teams/seattle-seahawks/?eref=sinav",				"l":"Seahawks" }
			]
		},
		{ "u":"/football/nfl/rosters/alpha/A.html?eref=sinav",	"l":"Players" },
		{ "u":"/fantasy/player_news/nfl/?eref=sinav",			"l":"Player News" },
		{ "u":"/football/nfl/standings/?eref=sinav",				"l":"Standings" },
		{ "u":"/football/nfl/schedules/weekly/?eref=sinav",		"l":"Schedules" },
		{ "u":"/football/nfl/stats/?eref=sinav",					"l":"Stats" },
		{ "u":"/football/nfl/teams/?eref=sinav",					"l":"Transactions" },
		{ "u":"/football/nfl/teams/?eref=sinav",					"l":"Injuries" },
		{ "u":"/podcasts/peter_king/?eref=sinav",	"l":"Podcasts" }
	],
	"ncaaf" : [
		{ "u": "/football/ncaa/scoreboards/divia/today/?eref=sinav",	"l":"Scores", 
			"s": [
				{ "u":"/football/ncaa/scoreboards/top25/today/?eref=sinav", 			"l":"Top 25" },
				{ "u":"/football/ncaa/scoreboards/midam/today/?eref=sinav", 			"l":"MAC" },
				{ "u":"/football/ncaa/scoreboards/divia/today/?eref=sinav", 		"l":"FBS" },
				{ "u":"/football/ncaa/scoreboards/meac/today/?eref=sinav",		"l":"MEAC" },
				{ "u":"/football/ncaa/scoreboards/diviaa/today/?eref=sinav", 			"l":"FCS" },
				{ "u":"/football/ncaa/scoreboards/gate/today/?eref=sinav",			"l":"Missouri Valley" },
				{ "u":"/football/ncaa/scoreboards/acc/today/?eref=sinav",			"l":"ACC" },
				{ "u":"/football/ncaa/scoreboards/mwest/today/?eref=sinav",		"l":"MWC" },
				{ "u":"/football/ncaa/scoreboards/big12/today/?eref=sinav",		"l":"Big 12" },
				{ "u":"/football/ncaa/scoreboards/nec/today/?eref=sinav",		"l":"Northeast" },
				{ "u":"/football/ncaa/scoreboards/bige/today/?eref=sinav",	"l":"Big East" },
				{ "u":"/football/ncaa/scoreboards/ovc/today/?eref=sinav",	"l":"Ohio Valley" },
				{ "u":"/football/ncaa/scoreboards/bsky/today/?eref=sinav",		"l":"Big Sky" },
				{ "u":"/football/ncaa/scoreboards/pac12/today/?eref=sinav",			"l":"Pac-12" },
				{ "u":"/football/ncaa/scoreboards/bsou/today/?eref=sinav",		"l":"Big South" },
				{ "u":"/football/ncaa/scoreboards/patr/today/?eref=sinav",			"l":"Patriot" },
				{ "u":"/football/ncaa/scoreboards/big10/today/?eref=sinav",		"l":"Big Ten" },
				{ "u":"/football/ncaa/scoreboards/pio/today/?eref=sinav",		"l":"Pioneer" },
				{ "u":"/football/ncaa/scoreboards/caa/today/?eref=sinav",		"l":"Colonial Athletic" },
				{ "u":"/football/ncaa/scoreboards/sec/today/?eref=sinav",		"l":"SEC" },
				{ "u":"/football/ncaa/scoreboards/cusa/today/?eref=sinav",			"l":"C-USA" },
				{ "u":"/football/ncaa/scoreboards/south/today/?eref=sinav",		"l":"Southern" },
				{ "u":"/football/ncaa/scoreboards/ia/today/?eref=sinav",			"l":"FBS Independents" },
				{ "u":"/football/ncaa/scoreboards/sland/today/?eref=sinav",		"l":"Southland" },
				{ "u":"/football/ncaa/scoreboards/iaa/today/?eref=sinav",		"l":"FCS Independents" },
				{ "u":"/football/ncaa/scoreboards/swac/today/?eref=sinav",		"l":"SWAC" },
				{ "u":"/football/ncaa/scoreboards/gwest/today/?eref=sinav",			"l":"Great West" },			
				{ "u":"/football/ncaa/scoreboards/sbelt/today/?eref=sinav",			"l":"Sun Belt" },
				{ "u":"/football/ncaa/scoreboards/ivy/today/?eref=sinav",	"l":"Ivy" },
				{ "u":"/football/ncaa/scoreboards/wac/today/?eref=sinav",		"l":"WAC" }			
			]
		},
		{ "u":"/football/ncaa/teams/divia.html?eref=sinav",	"l":"Teams" },
		{ "u":"/football/ncaa/conferences/?eref=sinav",	"l":"Conferences", 
			"s": [
				{ "u":"/football/ncaa/schedules/conference/acc/?eref=sinav",			"l":"ACC" },
				{ "u":"/football/ncaa/schedules/conference/midam/?eref=sinav", 			"l":"MAC" },
				{ "u":"/football/ncaa/schedules/conference/big12/?eref=sinav",		"l":"Big 12" },
				{ "u":"/football/ncaa/schedules/conference/mwest/?eref=sinav",		"l":"Mountain West" },
				{ "u":"/football/ncaa/schedules/conference/bige/?eref=sinav",	"l":"Big East" },
				{ "u":"/football/ncaa/schedules/conference/pac12/?eref=sinav",			"l":"Pac-12" },
				{ "u":"/football/ncaa/schedules/conference/big10/?eref=sinav",		"l":"Big Ten" },
				{ "u":"/football/ncaa/schedules/conference/sec/?eref=sinav",		"l":"SEC" },
				{ "u":"/football/ncaa/schedules/conference/cusa/?eref=sinav",			"l":"C-USA" },
				{ "u":"/football/ncaa/schedules/conference/sbelt/?eref=sinav",			"l":"Sun Belt" },
				{ "u":"/football/ncaa/schedules/conference/ia/?eref=sinav",			"l":"Independents" },
				{ "u":"/football/ncaa/schedules/conference/wac/?eref=sinav",		"l":"WAC" }
			]
		},
		{ "u":"/football/ncaa/teams/divia.html?eref=sinav",			"l":"Players" },
		{ "u":"/football/ncaa/standings/?eref=sinav",				"l":"Standings" },
		{ "u":"/football/ncaa/polls/ap/?eref=sinav",		"l":"Rankings" },
		{ "u":"/football/ncaa/schedules/weekly/?eref=sinav",		"l":"Schedules" },
		{ "u":"/football/ncaa/stats/divia/?eref=sinav",					"l":"Stats" },
		{ "u":"/podcasts/stewart_mandel/?eref=sinav",					"l":"Podcasts" },
		{ "u":"/heisman/?eref=sinav",					"l":"Heisman Watch" }
	],
	"mlb" : [
		{ "u": "/baseball/mlb/scoreboards/today/?eref=sinav",	"l":"Scores" },
		{ "u":"/baseball/mlb/teams/?eref=sinav",	"l":"Teams", 
			"s": [
				{ "u":"#", "c":"cnnTeamDivisionTitle bb-national", 				"l":"National League" },
			    { "u":"#", "c":"cnnTeamDivision",								"l":"EAST" },
			    { "u":"#", "c":"cnnTeamDivision", 								"l":"CENTRAL" },
			    { "u":"#", "c":"cnnTeamDivision", 								"l":"WEST" },
			    { "u":"/baseball/mlb/teams/atlanta-braves/?eref=sinav",			"l":"Braves" },
			    { "u":"/baseball/mlb/teams/houston-astros/?eref=sinav",			"l":"Astros" },
			    { "u":"/baseball/mlb/teams/arizona-diamondbacks/?eref=sinav",	"l":"Diamondbacks" },
				{ "u":"/baseball/mlb/teams/miami-marlins/?eref=sinav",		"l":"Marlins" },
				{ "u":"/baseball/mlb/teams/milwaukee-brewers/?eref=sinav",		"l":"Brewers" },
				{ "u":"/baseball/mlb/teams/los-angeles-dodgers/?eref=sinav",	"l":"Dodgers" },
				{ "u":"/baseball/mlb/teams/new-york-mets/?eref=sinav",			"l":"Mets" },
				{ "u":"/baseball/mlb/teams/st-louis-cardinals/?eref=sinav",		"l":"Cardinals" },
				{ "u":"/baseball/mlb/teams/san-francisco-giants/?eref=sinav",	"l":"Giants" },
				{ "u":"/baseball/mlb/teams/washington-nationals/?eref=sinav",	"l":"Nationals" },
				{ "u":"/baseball/mlb/teams/chicago-cubs/?eref=sinav",			"l":"Cubs" },
				{ "u":"/baseball/mlb/teams/san-diego-padres/?eref=sinav",		"l":"Padres" },
				{ "u":"/baseball/mlb/teams/philadelphia-phillies/?eref=sinav",	"l":"Phillies" },
				{ "u":"/baseball/mlb/teams/pittsburgh-pirates/?eref=sinav",		"l":"Pirates" },
				{ "u":"/baseball/mlb/teams/colorado-rockies/?eref=sinav",		"l":"Rockies" },
				{ "u":"#",			"l":"&#160;" },
				{ "u":"/baseball/mlb/teams/cincinnati-reds/?eref=sinav",		"l":"Reds" },
				{ "u":"#",			"l":"&#160;" },
				{ "u":"#", "c":"cnnTeamDivisionTitle bb-american bottom", 		"l":"American League" },
			    { "u":"#", "c":"cnnTeamDivision",								"l":"EAST" },
			    { "u":"#", "c":"cnnTeamDivision", 								"l":"CENTRAL" },
			    { "u":"#", "c":"cnnTeamDivision", 								"l":"WEST" },
			    { "u":"/baseball/mlb/teams/toronto-blue-jays/?eref=sinav",		"l":"Blue Jays" },
			    { "u":"/baseball/mlb/teams/cleveland-indians/?eref=sinav",		"l":"Indians" },
				{ "u":"/baseball/mlb/teams/los-angeles-angels/?eref=sinav",		"l":"Angels" },
				{ "u":"/baseball/mlb/teams/baltimore-orioles/?eref=sinav",		"l":"Orioles" },
				{ "u":"/baseball/mlb/teams/kansas-city-royals/?eref=sinav",		"l":"Royals" },
				{ "u":"/baseball/mlb/teams/oakland-athletics/?eref=sinav",		"l":"Athletics" },
				{ "u":"/baseball/mlb/teams/tampa-bay-rays/?eref=sinav",			"l":"Rays" },
				{ "u":"/baseball/mlb/teams/detroit-tigers/?eref=sinav",			"l":"Tigers" },
				{ "u":"/baseball/mlb/teams/seattle-mariners/?eref=sinav",		"l":"Mariners" },
				{ "u":"/baseball/mlb/teams/boston-red-sox/?eref=sinav",			"l":"Red Sox" },
				{ "u":"/baseball/mlb/teams/minnesota-twins/?eref=sinav",		"l":"Twins" },
				{ "u":"/baseball/mlb/teams/texas-rangers/?eref=sinav",			"l":"Rangers" },
				{ "u":"/baseball/mlb/teams/new-york-yankees/?eref=sinav",		"l":"Yankees" },
				{ "u":"/baseball/mlb/teams/chicago-white-sox/?eref=sinav",		"l":"White Sox" },
				{ "u":"#",			"l":"&#160;" }
			]
		},
		{ "u":"/baseball/mlb/players/?eref=sinav",			"l":"Players" },
		{ "u":"/fantasy/player_news/mlb/?eref=sinav",			"l":"Player News" },
		{ "u":"/baseball/mlb/standings/?eref=sinav",				"l":"Standings" },
		{ "u":"/baseball/mlb/probables/today/?eref=sinav",				"l":"Probables" },
		{ "u":"/baseball/mlb/schedules/weekly/today/?eref=sinav",		"l":"Schedules" },
		{ "u":"/baseball/mlb/stats/?eref=sinav",					"l":"Stats" },
		{ "u":"/baseball/mlb/stats/alltime/american_league/?eref=sinav",					"l":"Historical Stats" },
		{ "u":"/baseball/mlb/transactions/?eref=sinav",					"l":"Transactions" },
		{ "u":"/baseball/mlb/injuries/?eref=sinav",					"l":"Injuries" },
		{ "u":"http://mlb.mlb.com/mlb/subscriptions/index.jsp?product=si&vbID=simlbtv_test&eref=sinav",					"l":"MLB.TV" }
	],
	"nba" : [
		{ "u": "/basketball/nba/scoreboards/today/?eref=sinav",	"l":"Scores" },
		{ "u":"/basketball/nba/teams/?eref=sinav",	"l":"Teams", 
			"s": [
				{ "u":"#", "c":"cnnTeamDivisionTitle bb-eastern", 				"l":"Eastern Conference" },
			    { "u":"#", "c":"cnnTeamDivision",								"l":"ATLANTIC" },
			    { "u":"#", "c":"cnnTeamDivision", 								"l":"CENTRAL" },
			    { "u":"#", "c":"cnnTeamDivision", 								"l":"SOUTHEAST" },
			    { "u":"/basketball/nba/teams/boston-celtics/?eref=sinav",			"l":"Celtics" },
				{ "u":"/basketball/nba/teams/milwaukee-bucks/?eref=sinav",			"l":"Bucks" },
				{ "u":"/basketball/nba/teams/charlotte-bobcats/?eref=sinav",			"l":"Bobcats" },
				{ "u":"/basketball/nba/teams/new-york-knicks/?eref=sinav",			"l":"Knicks" },
				{ "u":"/basketball/nba/teams/chicago-bulls/?eref=sinav",			"l":"Bulls" },
				{ "u":"/basketball/nba/teams/atlanta-hawks/?eref=sinav",			"l":"Hawks" },
				{ "u":"/basketball/nba/teams/brooklyn-nets/?eref=sinav",			"l":"Nets" },
				{ "u":"/basketball/nba/teams/cleveland-cavaliers/?eref=sinav",			"l":"Cavaliers" },
				{ "u":"/basketball/nba/teams/miami-heat/?eref=sinav",			"l":"Heat" },
				{ "u":"/basketball/nba/teams/toronto-raptors/?eref=sinav",			"l":"Raptors" },
				{ "u":"/basketball/nba/teams/indiana-pacers/?eref=sinav",			"l":"Pacers" },
				{ "u":"/basketball/nba/teams/orlando-magic/?eref=sinav",			"l":"Magic" },
				{ "u":"/basketball/nba/teams/philadelphia-76ers/?eref=sinav",			"l":"Sixers" },
				{ "u":"/basketball/nba/teams/detroit-pistons/?eref=sinav",			"l":"Pistons" },
				{ "u":"/basketball/nba/teams/washington-wizards/?eref=sinav",			"l":"Wizards" },
				{ "u":"#", "c":"cnnTeamDivisionTitle bb-western bottom", 				"l":"Western Conference" },
			    { "u":"#", "c":"cnnTeamDivision",								"l":"NORTHWEST" },
			    { "u":"#", "c":"cnnTeamDivision", 								"l":"PACIFIC" },
			    { "u":"#", "c":"cnnTeamDivision", 								"l":"SOUTHWEST" },
			    { "u":"/basketball/nba/teams/utah-jazz/?eref=sinav",			"l":"Jazz" },
			    { "u":"/basketball/nba/teams/los-angeles-clippers/?eref=sinav",			"l":"Clippers" },
				{ "u":"/basketball/nba/teams/memphis-grizzlies/?eref=sinav",			"l":"Grizzlies" },
				{ "u":"/basketball/nba/teams/denver-nuggets/?eref=sinav",			"l":"Nuggets" },
				{ "u":"/basketball/nba/teams/sacramento-kings/?eref=sinav",			"l":"Kings" },
				{ "u":"/basketball/nba/teams/new-orleans-hornets/?eref=sinav",			"l":"Hornets" },
				{ "u":"/basketball/nba/teams/oklahoma-city-thunder/?eref=sinav",			"l":"Thunder" },
				{ "u":"/basketball/nba/teams/los-angeles-lakers/?eref=sinav",			"l":"Lakers" },
				{ "u":"/basketball/nba/teams/dallas-mavericks/?eref=sinav",			"l":"Mavericks" },
				{ "u":"/basketball/nba/teams/minnesota-timberwolves/?eref=sinav",			"l":"Timberwolves" },
				{ "u":"/basketball/nba/teams/phoenix-suns/?eref=sinav",			"l":"Suns" },
				{ "u":"/basketball/nba/teams/houston-rockets/?eref=sinav",			"l":"Rockets" },
				{ "u":"/basketball/nba/teams/portland-trail-blazers/?eref=sinav",			"l":"Trail Blazers" },
				{ "u":"/basketball/nba/teams/golden-state-warriors/?eref=sinav",			"l":"Warriors" },
				{ "u":"/basketball/nba/teams/san-antonio-spurs/?eref=sinav",			"l":"Spurs" }
			]
		},
		{ "u":"/basketball/nba/rosters/alpha/A.html?eref=sinav",			"l":"Players" },
		{ "u":"/fantasy/player_news/nba/?eref=sinav",			"l":"Player News" },
		{ "u":"/basketball/nba/standings/?eref=sinav",				"l":"Standings" },
		{ "u":"/basketball/nba/schedules/weekly/today/?eref=sinav",		"l":"Schedules" },
		{ "u":"/basketball/nba/stats/?eref=sinav",					"l":"Stats" },
		{ "u":"/basketball/nba/teams/?eref=sinav",					"l":"Transactions" },
		{ "u":"/basketball/nba/teams/?eref=sinav",					"l":"Injuries" },
		{ "u":"http://sports.sportsillustrated.cnn.com/wnbafront.asp?eref=sinav",					"l":"WNBA" },
		{ "u":"/podcasts/nba/?eref=sinav",					"l":"Podcasts" }
	],
	"ncaabb" : [
		{ "u": "/basketball/ncaa/men/scoreboards/top25/today/?eref=sinav",			"l":"Scores",
			"s": [
				{ "u":"/basketball/ncaa/men/scoreboards/top25/today/?eref=sinav",			"l":"Top 25" },
				{ "u":"/basketball/ncaa/men/scoreboards/ivy/today/?eref=sinav",			"l":"Ivy League" },
				{ "u":"/basketball/ncaa/men/scoreboards/divia/today/?eref=sinav",			"l":"Division I" },
				{ "u":"/basketball/ncaa/men/scoreboards/maac/today/?eref=sinav",			"l":"MAAC" },
				{ "u":"/basketball/ncaa/men/scoreboards/ncaa64/today/?eref=sinav",			"l":"NCAA Tournament" },
				{ "u":"/basketball/ncaa/men/scoreboards/mac/today/?eref=sinav",			"l":"MAC" },
				{ "u":"/basketball/ncaa/men/scoreboards/acc/today/?eref=sinav",			"l":"ACC" },
				{ "u":"/basketball/ncaa/men/scoreboards/meac/today/?eref=sinav",			"l":"MEAC" },
				{ "u":"/basketball/ncaa/men/scoreboards/aeast/today/?eref=sinav",			"l":"America East" },
				{ "u":"/basketball/ncaa/men/scoreboards/mvc/today/?eref=sinav",			"l":"MVC" },
				{ "u":"/basketball/ncaa/men/scoreboards/atl10/today/?eref=sinav",			"l":"Atlantic 10" },
				{ "u":"/basketball/ncaa/men/scoreboards/mwest/today/?eref=sinav",			"l":"MWC" },
				{ "u":"/basketball/ncaa/men/scoreboards/atsun/today/?eref=sinav",			"l":"Atlantic Sun" },
				{ "u":"/basketball/ncaa/men/scoreboards/nec/today/?eref=sinav",			"l":"Northeast" },
				{ "u":"/basketball/ncaa/men/scoreboards/big12/today/?eref=sinav",			"l":"Big 12" },
				{ "u":"/basketball/ncaa/men/scoreboards/ovc/today/?eref=sinav",			"l":"OVC" },
				{ "u":"/basketball/ncaa/men/scoreboards/bige/today/?eref=sinav",			"l":"Big East" },
				{ "u":"/basketball/ncaa/men/scoreboards/pac12/today/?eref=sinav",			"l":"Pac-12" },
				{ "u":"/basketball/ncaa/men/scoreboards/bsky/today/?eref=sinav",			"l":"Big Sky" },
				{ "u":"/basketball/ncaa/men/scoreboards/patr/today/?eref=sinav",			"l":"Patriot" },
				{ "u":"/basketball/ncaa/men/scoreboards/bsou/today/?eref=sinav",			"l":"Big South" },
				{ "u":"/basketball/ncaa/men/scoreboards/sec/today/?eref=sinav",			"l":"SEC" },
				{ "u":"/basketball/ncaa/men/scoreboards/big10/today/?eref=sinav",			"l":"Big Ten" },
				{ "u":"/basketball/ncaa/men/scoreboards/swac/today/?eref=sinav",			"l":"SWAC" },
				{ "u":"/basketball/ncaa/men/scoreboards/bigw/today/?eref=sinav",			"l":"Big West" },
				{ "u":"/basketball/ncaa/men/scoreboards/south/today/?eref=sinav",			"l":"Southern" },
				{ "u":"/basketball/ncaa/men/scoreboards/cusa/today/?eref=sinav",			"l":"C-USA" },
				{ "u":"/basketball/ncaa/men/scoreboards/sland/today/?eref=sinav",			"l":"Southland" },
				{ "u":"/basketball/ncaa/men/scoreboards/coln/today/?eref=sinav",			"l":"Colonial" },
				{ "u":"/basketball/ncaa/men/scoreboards/sum/today/?eref=sinav",			"l":"Summit League" },
				{ "u":"/basketball/ncaa/men/scoreboards/gwc/today/?eref=sinav",			"l":"GWC" },
				{ "u":"/basketball/ncaa/men/scoreboards/sbelt/today/?eref=sinav",			"l":"Sunbelt" },
				{ "u":"/basketball/ncaa/men/scoreboards/horiz/today/?eref=sinav",			"l":"Horizon" },
				{ "u":"/basketball/ncaa/men/scoreboards/wac/today/?eref=sinav",			"l":"WAC" },
				{ "u":"/basketball/ncaa/men/scoreboards/indp/today/?eref=sinav",			"l":"Independents" },
				{ "u":"/basketball/ncaa/men/scoreboards/wcc/today/?eref=sinav",			"l":"West Coast" }
			]
		},
		{ "u": "/basketball/ncaa/men/teams/?eref=sinav",			"l":"Teams" },
		{ "u": "/basketball/ncaa/men/conferences/?eref=sinav",			"l":"Conferences",
			"s": [
				{ "u":"/basketball/ncaa/men/conferences/acc/?eref=sinav",			"l":"ACC" },
				{ "u":"/basketball/ncaa/men/conferences/midam/?eref=sinav",			"l":"MAC" },
				{ "u":"/basketball/ncaa/men/conferences/aeast/?eref=sinav",			"l":"America East" },
				{ "u":"/basketball/ncaa/men/conferences/meac/?eref=sinav",			"l":"MEAC" },
				{ "u":"/basketball/ncaa/men/conferences/atl10/?eref=sinav",			"l":"Atlantic 10" },
				{ "u":"/basketball/ncaa/men/conferences/mvc/?eref=sinav",			"l":"Missouri Valley" },
				{ "u":"/basketball/ncaa/men/conferences/atsun/?eref=sinav",			"l":"Atlantic Sun" },
				{ "u":"/basketball/ncaa/men/conferences/mwest/?eref=sinav",			"l":"Mountain West" },
				{ "u":"/basketball/ncaa/men/conferences/big12/?eref=sinav",			"l":"Big 12" },
				{ "u":"/basketball/ncaa/men/conferences/nec/?eref=sinav",			"l":"NEC" },
				{ "u":"/basketball/ncaa/men/conferences/bige/?eref=sinav",			"l":"Big East" },
				{ "u":"/basketball/ncaa/men/conferences/ovc/?eref=sinav",			"l":"Ohio Valley" },
				{ "u":"/basketball/ncaa/men/conferences/bsky/?eref=sinav",			"l":"Big Sky" },
				{ "u":"/basketball/ncaa/men/conferences/pac12/?eref=sinav",			"l":"Pac-12" },
				{ "u":"/basketball/ncaa/men/conferences/bsou/?eref=sinav",			"l":"Big South" },
				{ "u":"/basketball/ncaa/men/conferences/patr/?eref=sinav",			"l":"Patriot" },
				{ "u":"/basketball/ncaa/men/conferences/big10/?eref=sinav",			"l":"Big Ten" },
				{ "u":"/basketball/ncaa/men/conferences/sec/?eref=sinav",			"l":"SEC" },
				{ "u":"/basketball/ncaa/men/conferences/bigw/?eref=sinav",			"l":"Big West" },
				{ "u":"/basketball/ncaa/men/conferences/south/?eref=sinav",			"l":"Southern" },
				{ "u":"/basketball/ncaa/men/conferences/coln/?eref=sinav",			"l":"Colonial" },
				{ "u":"/basketball/ncaa/men/conferences/sland/?eref=sinav",			"l":"Southland" },
				{ "u":"/basketball/ncaa/men/conferences/cusa/?eref=sinav",			"l":"C-USA" },
				{ "u":"/basketball/ncaa/men/conferences/sum/?eref=sinav",			"l":"Summit" },
				{ "u":"/basketball/ncaa/men/conferences/gwc/?eref=sinav",			"l":"GWC" },
				{ "u":"/basketball/ncaa/men/conferences/sbelt/?eref=sinav",			"l":"Sun Belt" },
				{ "u":"/basketball/ncaa/men/conferences/horiz/?eref=sinav",			"l":"Horizon" },
				{ "u":"/basketball/ncaa/men/conferences/swac/?eref=sinav",			"l":"SWAC" },
				{ "u":"/basketball/ncaa/men/conferences/indp/?eref=sinav",			"l":"Independents" },
				{ "u":"/basketball/ncaa/men/conferences/wac/?eref=sinav",			"l":"WAC" },
				{ "u":"/basketball/ncaa/men/conferences/ivy/?eref=sinav",			"l":"Ivy League" },
				{ "u":"/basketball/ncaa/men/conferences/wcc/?eref=sinav",			"l":"WCC" },
				{ "u":"/basketball/ncaa/men/conferences/maac/?eref=sinav",			"l":"MAAC" }
			]
		},
		{ "u": "/basketball/ncaa/men/teams/?eref=sinav",			"l":"Players" },
		{ "u": "/basketball/ncaa/men/stats/?eref=sinav",			"l":"Stats" },
		{ "u": "/basketball/ncaa/men/standings/?eref=sinav",			"l":"Standings" },
		{ "u": "/basketball/ncaa/men/polls/?eref=sinav",			"l":"Rankings" },
		{ "u": "/basketball/ncaa/men/schedules/weekly/today/?eref=sinav",			"l":"Schedules" },
		{ "u": "http://sports.sportsillustrated.cnn.com/wcbkfront.asp?eref=sinav",			"l":"Women's Hoops" }
	],
	"golf" : [
		{ "u": "http://www.golf.com/news/leaderboards?eref=sinav",			"l":"Leaderboards" },
		{ "u": "http://www.golf.com/tours_news/tourschedule?eref=sinav",			"l":"Schedules &amp; Results" },
		{ "u": "http://www.golf.com/tours_news/tourstats?eref=sinav",			"l":"Stats" },
		{ "u": "http://www.golf.com/tours_news?eref=sinav",			"l":"Golf News" },
		{ "u": "http://www.golf.com/search/apachesolr_search/pga%20tour%20confidential?filters=is_cck_field_article_contributor_ref:151111&solrsort=created%20desc",			"l":"PGA Tour Confidential" },
		{ "u": "http://www.golf.com/instruction",			"l":"Instruction",
			"s": [
				{ "u":"http://www.golf.com/instruction/power?eref=sinav",			"l":"Power" },
				{ "u":"http://www.golf.com/instruction/slice-hook?eref=sinav",			"l":"Slice/Hook" },
				{ "u":"http://www.golf.com/instruction/putting?eref=sinav",			"l":"Putting" },

				{ "u":"http://www.golf.com/instruction/short-game?eref=sinav",			"l":"Short Game" },
				{ "u":"http://www.golf.com/instruction/solid-contact?eref=sinav",			"l":"Solid Contact" },
				{ "u":"http://www.golf.com/instruction/sand?eref=sinav",			"l":"Sand" }
			]
		},
		{ "u": "http://www.golf.com/equipment",			"l":"Equipment",
			"s": [
				{ "u":"http://www.golf.com/equipment/see-try-buy?eref=sinav",			"l":"See-Try-Buy" },
				{ "u":"http://www.golf.com/equipment/club-test?eref=sinav",			"l":"Club Test" },
				{ "u":"http://shop.golf.com?eref=sinav",			"l":"Shop.GOLF.com" },
				{ "u":"#",			"l":"&#160;" }
			]
		},
		{ "u": "http://www.golf.com/courses_travel?eref=sinav",			"l":"Courses &amp; Travel",
			"s": [
				{ "u":"http://www.golf.com/courses-and-travel/general-top-courses?eref=sinav",			"l":"Course Rankings" },
				{ "u":"http://www.golf.com/courses?eref=sinav",			"l":"Golf Course Finder" },
				{ "u":"http://www.golf.com/courses-and-travel/trip-guides?eref=sinav",			"l":"Trip Guides" },
				{ "u":"#",			"l":"&#160;" }
			]
		}
	],
	"nhl" : [
		{ "u": "/hockey/nhl/scoreboards/today/?eref=sinav",			"l":"Scores" },
		{ "u": "/hockey/nhl/teams/?eref=sinav",			"l":"Teams",
			"s": [
				{ "u":"#", "c":"cnnTeamDivisionTitle h-eastern", 				"l":"Eastern Conference" },
			    { "u":"#", "c":"cnnTeamDivision",								"l":"ATLANTIC" },
			    { "u":"#", "c":"cnnTeamDivision", 								"l":"NORTHEAST" },
			    { "u":"#", "c":"cnnTeamDivision", 								"l":"SOUTHEAST" },
			    { "u":"/hockey/nhl/teams/new-jersey-devils/?eref=sinav",			"l":"Devils" },
				{ "u":"/hockey/nhl/teams/boston-bruins/?eref=sinav",			"l":"Bruins" },
				{ "u":"/hockey/nhl/teams/washington-capitals/?eref=sinav",			"l":"Capitals" },
				{ "u":"/hockey/nhl/teams/philadelphia-flyers/?eref=sinav",			"l":"Flyers" },
				{ "u":"/hockey/nhl/teams/montreal-canadiens/?eref=sinav",			"l":"Canadiens" },
				{ "u":"/hockey/nhl/teams/carolina-hurricanes/?eref=sinav",			"l":"Hurricanes" },
				{ "u":"/hockey/nhl/teams/new-york-islanders/?eref=sinav",			"l":"Islanders" },
				{ "u":"/hockey/nhl/teams/toronto-maple-leafs/?eref=sinav",			"l":"Maple Leafs" },
				{ "u":"/hockey/nhl/teams/winnipeg-jets/?eref=sinav",			"l":"Jets" },
				{ "u":"/hockey/nhl/teams/pittsburgh-penguins/?eref=sinav",			"l":"Penguins" },
				{ "u":"/hockey/nhl/teams/buffalo-sabres/?eref=sinav",			"l":"Sabres" },
				{ "u":"/hockey/nhl/teams/tampa-bay-lightning/?eref=sinav",			"l":"Lightning" },
				{ "u":"/hockey/nhl/teams/new-york-rangers/?eref=sinav",			"l":"Rangers" },
				{ "u":"/hockey/nhl/teams/ottawa-senators/?eref=sinav",			"l":"Senators" },
				{ "u":"/hockey/nhl/teams/florida-panthers/?eref=sinav",			"l":"Panthers" },
				{ "u":"#", "c":"cnnTeamDivisionTitle h-western bottom", 				"l":"Western Conference" },
			    { "u":"#", "c":"cnnTeamDivision",								"l":"CENTRAL" },
			    { "u":"#", "c":"cnnTeamDivision", 								"l":"NORTHWEST" },
			    { "u":"#", "c":"cnnTeamDivision", 								"l":"PACIFIC" },
			    { "u":"/hockey/nhl/teams/chicago-blackhawks/?eref=sinav",			"l":"Blackhawks" },
				{ "u":"/hockey/nhl/teams/colorado-avalanche/?eref=sinav",			"l":"Avalanche" },
				{ "u":"/hockey/nhl/teams/phoenix-coyotes/?eref=sinav",			"l":"Coyotes" },
				{ "u":"/hockey/nhl/teams/columbus-blue-jackets/?eref=sinav",			"l":"Blue Jackets" },
				{ "u":"/hockey/nhl/teams/vancouver-canucks/?eref=sinav",			"l":"Canucks" },
				{ "u":"/hockey/nhl/teams/anaheim-ducks/?eref=sinav",			"l":"Ducks" },
				{ "u":"/hockey/nhl/teams/st-louis-blues/?eref=sinav",			"l":"Blues" },
				{ "u":"/hockey/nhl/teams/calgary-flames/?eref=sinav",			"l":"Flames" },
				{ "u":"/hockey/nhl/teams/los-angeles-kings/?eref=sinav",			"l":"Kings" },
				{ "u":"/hockey/nhl/teams/nashville-predators/?eref=sinav",			"l":"Predators" },
				{ "u":"/hockey/nhl/teams/edmonton-oilers/?eref=sinav",			"l":"Oilers" },
				{ "u":"/hockey/nhl/teams/san-jose-sharks/?eref=sinav",			"l":"Sharks" },
				{ "u":"/hockey/nhl/teams/detroit-red-wings/?eref=sinav",			"l":"Red Wings" },
				{ "u":"/hockey/nhl/teams/minnesota-wild/?eref=sinav",			"l":"Wild" },
				{ "u":"/hockey/nhl/teams/dallas-stars/?eref=sinav",			"l":"Stars" }
				
			]
		},
		{ "u": "/hockey/nhl/rosters/alpha/A.html?eref=sinav",			"l":"Players" },
		{ "u": "/fantasy/player_news/nhl/?eref=sinav",			"l":"Player News" },
		{ "u": "/hockey/nhl/standings/?eref=sinav",			"l":"Standings" },
		{ "u": "/hockey/nhl/schedules/weekly/today/?eref=sinav",			"l":"Season Schedules" },
		{ "u": "/hockey/nhl/stats/?eref=sinav",			"l":"Stats" },
		{ "u": "/hockey/nhl/teams/?eref=sinav",			"l":"Transactions" },
		{ "u": "/hockey/nhl/teams/?eref=sinav",			"l":"Injuries" }
	],
	"racing" : [
		{ "u": "http://sports.sportsillustrated.cnn.com/racingfront.asp?series=NASCAR&eref=sinav",			"l":"NASCAR" },
		{ "u": "http://sports.sportsillustrated.cnn.com/racingfront.asp?series=NATIONWIDE&eref=sinav",			"l":"Nationwide" },
		{ "u": "http://sports.sportsillustrated.cnn.com/racingfront.asp?series=TRUCK&eref=sinav",			"l":"Camping World Truck Series" },
		{ "u": "http://sports.sportsillustrated.cnn.com/racingfront.asp?series=IRL&eref=sinav",			"l":"IndyCar" },
		{ "u": "http://sports.sportsillustrated.cnn.com/racingfront.asp?series=Form1&eref=sinav",			"l":"Formula One" }
	],
	"soccer" : [
		{ "u": "http://sports.sportsillustrated.cnn.com/soccerfront.asp?eref=sinav",			"l":"Leagues",
			"s": [
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=mls&eref=sinav",			"l":"MLS" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=gold&eref=sinav",			"l":"CONCACAF Gold Cup" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=arge&eref=sinav",			"l":"Argentina" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=copa&eref=sinav",			"l":"Copa America" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=epl&eref=sinav",			"l":"England" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=lib&eref=sinav",			"l":"Copa Lib" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=fran&eref=sinav",			"l":"France" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=sud&eref=sinav",			"l":"Copa Sud" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=bund&eref=sinav",			"l":"Germany" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=eng_ch&eref=sinav",			"l":"English Champ" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=seri&eref=sinav",			"l":"Italy" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=fmf&eref=sinav",			"l":"Mexico" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=uefa&eref=sinav",			"l":"Europa League" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=holl&eref=sinav",			"l":"Netherlands" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=u20&eref=sinav",			"l":"FIFA U-20" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=scot&eref=sinav",			"l":"Scotland" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=jlg&eref=sinav",			"l":"J-League" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=liga&eref=sinav",			"l":"Spain" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=worldcup&eref=sinav",			"l":"World Cup" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=chlg&eref=sinav",			"l":"Champions" }
			]
		},
		{ "u": "http://sports.sportsillustrated.cnn.com/soccerfront.asp?eref=sinav",			"l":"Scores",
			"s": [
				{ "u":"http://sports.sportsillustrated.cnn.com/epl/scoreboard_daily.asp",			"l":"England" },
				{ "u":"http://sports.sportsillustrated.cnn.com/fran/scoreboard_daily.asp",			"l":"France" },	
				{ "u":"http://sports.sportsillustrated.cnn.com/bund/scoreboard_daily.asp",			"l":"Germany" },
				{ "u":"http://sports.sportsillustrated.cnn.com/seri/scoreboard_daily.asp",			"l":"Italy" },
				{ "u":"http://sports.sportsillustrated.cnn.com/fmf/scoreboard_daily.asp",			"l":"Mexico" },
				{ "u":"http://sports.sportsillustrated.cnn.com/holl/scoreboard_daily.asp",			"l":"Netherlands" },
				{ "u":"http://sports.sportsillustrated.cnn.com/scot/scoreboard_daily.asp",			"l":"Scotland" },
				{ "u":"http://sports.sportsillustrated.cnn.com/liga/scoreboard_daily.asp",			"l":"Spain" },
				{ "u":"http://sports.sportsillustrated.cnn.com/mls/scoreboard_daily.asp",			"l":"United States" },
				{ "u":"#",			"l":"&#160;" }
			]
		},
		{ "u": "/podcasts/soccer/?eref=sinav",			"l":"Podcasts" }
	],
	"boxmma" : [
		{ "u": "/mma/news/20130117/mma-schedule-results/?eref=sinav",			"l":"MMA Schedules &amp; Results" },
		{ "u": "/2012/mma/boxing/schedule/?eref=sinav",			"l":"Boxing Schedules &amp; Results" },
		{ "u": "/2011/mma/boxing/pound-for-pound-ratings/index.html",			"l":"Pound-for-Pound Ratings" }
	],
	"tennis" : [
		{ "u": "http://sports.sportsillustrated.cnn.com/tennisfront.asp?tour=ATP&eref=sinav",			"l":"ATP",
			"s": [
				{ "u": "http://sports.sportsillustrated.cnn.com/tennis/scoreboard.asp?tour=ATP&eref=sinav",			"l":"Men's Results" },
				{ "u": "http://sports.sportsillustrated.cnn.com/tennis/schedule.asp?tour=ATP&eref=sinav",			"l":"Men's Schedules" },
				{ "u": "http://sports.sportsillustrated.cnn.com/tennis/rankings.asp?tour=ATP&eref=sinav",			"l":"Men's Players" },
				{ "u":"#",			"l":"&#160;" }
			]
		},
		{ "u": "http://sports.sportsillustrated.cnn.com/tennisfront.asp?tour=WTA&eref=sinav",			"l":"WTA",
			"s": [
				{ "u": "http://sports.sportsillustrated.cnn.com/tennis/scoreboard.asp?tour=WTA&eref=sinav",			"l":"Women's Results" },
				{ "u": "http://sports.sportsillustrated.cnn.com/tennis/schedule.asp?tour=WTA&eref=sinav",			"l":"Women's Schedules" },
				{ "u": "http://sports.sportsillustrated.cnn.com/tennis/rankings.asp?tour=WTA&eref=sinav",			"l":"Women's Players" },
				{ "u":"#",			"l":"&#160;" }
			]
		},
		{ "u": "/podcasts/tennis/?eref=sinav",			"l":"Podcasts" }
	],
	"more" : [
		{ "u": "/cycling/wires/?eref=sinav",			"l":"Cycling" },
		{ "u": "http://sports.sportsillustrated.cnn.com/cfl/scoreboard.asp?eref=sinav",			"l":"CFL" },
		{ "u": "http://sports.sportsillustrated.cnn.com/cricketfront.asp?eref=sinav",			"l":"Cricket" },
		{ "u": "/horse_racing/wires/?eref=sinav",			"l":"Horse Racing" },
		{ "u": "/olympics/?eref=sinav",			"l":"Olympics" },
		{ "u": "/track_field/wires/?eref=sinav",			"l":"Track &amp; Field" },
		{ "u": "/figure_skating/wires/?eref=sinav",			"l":"Figure Skating" },
		{ "u": "http://sports.sportsillustrated.cnn.com/wcbkfront.asp?eref=sinav",			"l":"Women's College Basketball" },
		{ "u": "http://sports.sportsillustrated.cnn.com/wnbafront.asp?eref=sinav",			"l":"WNBA" },
		{ "u": "/magazine/sportsman/?eref=sinav",			"l":"Sportsman" }
	],
	"video" : [
		{ "u": "/basketball/ncaa/seth-davis/fresh-takes/?eref=sinav",			"l":"Fresh Takes" },
		{ "u": "/2012_swimsuit/video/kate-upton-profile.html?eref=sinav",			"l":"Swimsuit" },
		{ "u": "/theshow/?eref=sinav",			"l":"SI on NBC" }
	]
});
