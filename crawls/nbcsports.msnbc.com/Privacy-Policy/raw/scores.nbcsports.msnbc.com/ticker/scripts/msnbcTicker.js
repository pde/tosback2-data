		//set a namespace for the ticker to keep it out of the main javascript variable area, this should help prevent name collisions in the event that the ticker is embedded
		try {
			if (!SHS) {
				SHS = {
				};
			}
		}
		catch(e) {
			SHS = {
			};
		}
		
		SHS.MSNBCTicker = function(params) {
			this.showSports = "";//"mlb|nfl|nba|nhl|cfb|cbk|nascar|golf" //override this to change the sports that are shown
			if (params.sports)
				this.showSports = params.sports;
			
			this.tickerCSSWidth   = "100%";
//			this.tickerPixelWidth = $(".shs_customTicker").width();	//calculate width of carousel
			if (params.width)
				this.tickerCSSWidth = params.width;
			
			this.dataPath = '';
			if (params.path != null)
				this.dataPath = params.path;
			
			this.useJSONP = true;
			
			this.selectedSport  = -1;
			this.selectedPeriod = -1;
			this.defaultPeriod = 0;
			this.sportsData = [];
			this.periodData = [];
			this.statfoxData = [];
			this.initialized = false;
			
			this.lastSportsUpdate = 0;
			this.lastGamesUpdate = 0;
			this.sportsUpdateTimer = 60; //300;
			this.gamesUpdateTimer = 15;
			this.updateThread = null;
			
			//loadStatfox - loads the statfox team names that are used to build head-to-head links
			this.loadStatfox = function(sports) {
				var ticker = this;
				
				if (this.useJSONP) {
					$.ajax({
						type: "GET",
						url: ticker.dataPath+"data/statfox.js.asp?jsonp=true&order="+ticker.showSports+'&random='+(new Date()).getTime(),
						dataType: "jsonp",
						cache: true,
						jsonp: false,
						jsonpCallback: "loadStatfoxData"
					});
				}
				else {
					$.ajax({
						type: "GET",
						url: ticker.dataPath+"data/statfox.js.asp?order="+ticker.showSports+'&random='+(new Date()).getTime(),
						dataType: "json",
						success: function(data) {
							ticker.loadStatfoxData(data);
						},
						error: function(jqXHR, textStatus, errorThrown) {
							alert("loadStatfox error: "+textStatus);
						}
					});
				}
			}
			
			//loadStatfoxData - this is the JSONP callback that actually sets the data
			this.loadStatfoxData = function(data) {
				//alert("load statfox data");
				this.statfoxData = data;
			}
			
			//loadSports - this is called in order to update the list of sports in the ticker (on initial load and then again periodically to handle the case where a day rolls over)
			this.loadSports = function() {
				var now = new Date();
				nowSecs = now.getTime();
				this.lastSportsUpdate = nowSecs;
				
				var ticker = this;
				if (this.useJSONP) {
					$.ajax({
						type: "GET",
						url: ticker.dataPath+"data/sports.js.asp?jsonp=true&order="+ticker.showSports+'&random='+nowSecs,
						dataType: "jsonp",
						cache: true,
						jsonp: false,
						jsonpCallback: "loadSportsData"
					});
				}
				else {
					$.ajax({
						type: "GET",
						url: ticker.dataPath+"data/sports.js.asp?order="+ticker.showSports+'&random='+nowSecs,
						dataType: "json",
						success: function(data) {
							ticker.loadSportsData(data);
						},
						error: function(jqXHR, textStatus, errorThrown) {
							alert("loadSports error: "+textStatus);
						}
					});
				}
			}
			
			//loadSportsData - this is the JSONP callback with the list of sports returned from sports.js.asp, it needs to lay out the sport navigation
			this.loadSportsData = function(data) {
				//alert("load sports data");
				var ticker = this;
				
				var current_sport_name  = "";
				var current_period_name = "";
				if (ticker.sportsData != "") {
					current_sport_name  = ticker.sportsData[ticker.selectedSport].sport;
					current_period_name = ticker.selectedPeriod;
				}
				
				ticker.sportsData = data;
				//loop through all the sports, updating or adding them to the list
				for (var x = 0; x < data.length; x++) {
					var this_sport_nav = $(".shs_sportNav ul li:eq("+x+") a");
					if (this_sport_nav != null && this_sport_nav.length != 0) {
						//there was already a sport in this spot, we'll need to update it
						
						if ($(this_sport_nav).attr("name") == data[x].sport) {
							//this is the same sport as was in this spot before, let's make sure it has the same periods if it's the one we're looking at
							if (ticker.selectedSport == x) {
								//if the old list of periods for this sport was longer than the current list, delete any extras
								for (var y = $(".shs_schedNav ul li").length; y > ticker.sportsData[x].period.length; y--)
									$(".shs_schedNav ul li:eq("+(y-1)+")").remove();
								
								//loop through all the periods for this sport, and update/insert them with the new values in case they changed
								for (var y = 0; y < ticker.sportsData[x].period.length; y++) {
									var this_period = ticker.sportsData[x].period[y];
									var label = this_period.label.replace(/Preseason /i, "");
									if (label.substr(label.length-1) == '.') label = label.substr(0,label.length-1);
									
									var title = '';
									if (data[x].sport.toUpperCase() != "GOLF" && data[x].sport.toUpperCase() != "NASCAR")
										title = this.formatDatestamp(this_period.period);
									
									var this_period_nav = $(".shs_schedNav ul li:eq("+y+") a");
									if (this_period_nav != null && this_period_nav.length != 0) {
										//there already is a period in this spot, so let's just set its details to the new values
										$(this_period_nav).attr("title", title);
										$(this_period_nav).attr("period", this_period.period);
										$(this_period_nav).html(label + '<span class="status"></span>');
										
										//if this is the selected period or there is no selected period and this is default, then set this one as current
										if (($(this_period_nav).hasClass('shs_active') && ticker.selectedPeriod != this_period.period) || (this_period.isdefault == true && $(".shs_schedNav ul li a.shs_active").length == 0)) {
												ticker.selectedPeriod = this_period.period;
												
												$(".shs_schedNav ul li a").removeClass("shs_active");
												$(this_period_nav).addClass("shs_active");
												
												ticker.loadPeriod(ticker.sportsData[x].sport, this_period.period, true);
										}
									}
									else {
										//there weren't this many items before, so instead of changing one add it
										$(".shs_schedNav ul").append('<li><a href="#" title="'+title+'" period="'+this_period.period+'">'+label+'<span class="status"></span></a></li>').find("li:last a").click(function() {
											var x = ticker.selectedSport;
											var clicked_period = $(this).attr("period");
											
											if (ticker.selectedPeriod != clicked_period) {
												ticker.selectedPeriod = clicked_period;
												
												$(".shs_schedNav ul li a").removeClass("shs_active");
												$(this).addClass("shs_active");
												
												ticker.loadPeriod(ticker.sportsData[x].sport, clicked_period, true);
											}
											return false;
										});
										
										//if this is the default period and no other period is selected, mark this one as the current period
										if (this_period.isdefault == true && $(".shs_schedNav ul li a.shs_active").length == 0) {
												ticker.selectedPeriod = this_period.period;
												
												$(".shs_schedNav ul li a").removeClass("shs_active");
												$(".shs_schedNav ul li:eq("+y+") a").addClass("shs_active");
												
												ticker.loadPeriod(ticker.sportsData[x].sport, this_period.period, true);
										}
									}
								}
							}
						}
						else {
							//the previous sport in this spot had a different name
							$(this_sport_nav).attr("name", data[x].sport);
							$(this_sport_nav).text(data[x].sport);
							
							//if this is the currently selected sport, we need to grab its data (FIXME: we could wait until the end to try to see if the sport just moved)
							if (ticker.selectedSport == x)
								ticker.setSport(x);
						}
					}
					else {
						//the old list of sports wasn't this long, let's add a new sport
						if (ticker.selectedSport == -1) {
							//there was no sport selected previously, so this one will be it
							$(".shs_sportNav ul").append('<li><a href="#" class="shs_active" index="'+x+'" name="'+data[x].sport+'">'+data[x].sport+'</a></li>').find("li:last a").click(function() {
								var x = parseInt($(this).attr("index"));
								if (x != ticker.selectedSport) {
									$(".shs_sportNav ul li a").removeClass("shs_active");
									$(this).addClass("shs_active");
									
									ticker.setSport(x);
								}
								return false;
							});
							
							//since this is the newly selected sport, grab its data
							ticker.setSport(x);
						}
						else {
							//there is already a selected sport, so just add this one unselected
							$(".shs_sportNav ul").append('<li><a href="#" index="'+x+'" name="'+data[x].sport+'">'+data[x].sport+'</a></li>').find("li:last a").click(function() {
								var x = parseInt($(this).attr("index"));
								if (x != ticker.selectedSport) {
									$(".shs_sportNav ul li a").removeClass("shs_active");
									$(this).addClass("shs_active");
									
									ticker.setSport(x);
								}
								return false;
							});
						}
					}
				}
				
				//if the old list of sports was longer than the current list, delete out any extras
				var all_sports_nav = $(".shs_sportNav ul li");
				for (var x = all_sports_nav.length - 1; x >= data.length; x--) {
					$(".shs_sportNav ul li:eq("+x+")").remove();
				}
			}
			
			//sets the current sport to the index given, this is called on initial load and whenever a user clicks on a different sport in the navigation
			this.setSport = function(index) {
				var ticker = this;
				
				//clean out the list of periods from the previous sport
				$(".shs_schedNav ul").empty();
				
				//(re)set a class on the #shs_centerBlock according to the current sport
				if (this.selectedSport != -1)
					$("#shs_centerBlock").removeClass("shs_"+ticker.sportsData[ticker.selectedSport].sport.toLowerCase());
				$("#shs_centerBlock").addClass("shs_"+ticker.sportsData[index].sport.toLowerCase());
				this.selectedSport = index;
				
				//loop through all the periods for this sport and add them to the subnavigation
				for (var x = 0; x < ticker.sportsData[index].period.length; x++) {
					var this_period = ticker.sportsData[index].period[x];
					
					//remove any trailing periods from the labels, since our day abbreviations are like "Tue."
					var label = this_period.label.replace(/Preseason /i, "");
					if (label.substr(label.length-1) == '.') label = label.substr(0,label.length-1);
					
					//if this is a team sport let's set a mouseover title that gives the actual date that goes with "Wed"
					var title = '';
					if (ticker.sportsData[index].sport.toUpperCase() != "GOLF" && ticker.sportsData[index].sport.toUpperCase() != "NASCAR")
						title = this.formatDatestamp(this_period.period);
					
					//add this period and it's click behavior
					$(".shs_schedNav ul").append('<li><a href="#" title="'+title+'" period="'+this_period.period+'">'+label+'<span class="status"></span></a></li>').find("li:last a").click(function() {
						var x = ticker.selectedSport;
						var clicked_period = $(this).attr("period");
						
						if (ticker.selectedPeriod != clicked_period) {
							ticker.selectedPeriod = clicked_period;
							
							$(".shs_schedNav ul li a").removeClass("shs_active");
							$(this).addClass("shs_active");
							
							ticker.loadPeriod(ticker.sportsData[x].sport, clicked_period, true);
						}
						return false;
					});
					
					//if this is the default period, set it as the selected period
					if (this_period.isdefault == true) {
						this.selectedPeriod = this.sportsData[index].period[x].period;
						$(".shs_schedNav ul li:last a").addClass("shs_active");
						this.defaultPeriod = this.sportsData[index].period[x].period;
					}
				}
				
				//load data for the selected period
				this.loadPeriod(this.sportsData[index].sport, this.selectedPeriod, true);
			}
			
			//formatDatestamp - picks apart a YYYYMMDD datestamp to reformat as MM/DD
			this.formatDatestamp = function(datestamp) {
				if (parseInt(datestamp) == datestamp && datestamp.length == 8) {
					//var temp_date = new Date(datestamp.substr(0,4), datestamp.substr(4,2), datestamp.substr(6,2));
					return datestamp.substr(4,2)+'/'+datestamp.substr(6,2);
				}
				else
					return "";
			}
			
			//zeroPad - pads zeros to the left of a numeric string
			this.zeroPad = function(target_string, desired_width) {
				var pad_string = "";
				target_string = ""+target_string;
				for (var x = 0; x < desired_width - target_string.length; x++)
					pad_string += "0";
				return pad_string+target_string;
			}
			
			//translateShortDate - the dates that we get in the app are MM/DD format, this builds a Javascript date object for the nearest date to it by testing against this year, last year, and next year
			this.translateShortDate = function(short_date) {
				var gamedateArr = short_date.split('/');
				var today = new Date();
				var lastYear = new Date(today.getFullYear()-1, parseInt(gamedateArr[0])-1, gamedateArr[1]);
				var thisYear = new Date(today.getFullYear(), parseInt(gamedateArr[0])-1, gamedateArr[1]);
				var nextYear = new Date(today.getFullYear()+1, parseInt(gamedateArr[0])-1, gamedateArr[1]);
				var lastDiff = Math.abs(lastYear - today);
				var thisDiff = Math.abs(thisYear - today);
				var nextDiff = Math.abs(nextYear - today);
				var gameday = null;
				
				//check to see which of the three dates is closer to today, and that is likely the right year
				if (lastDiff < thisDiff) {
					if (lastDiff < nextDiff)
						return lastYear;
					else
						return nextYear;
				}
				else if (thisDiff < nextDiff)
					return thisYear;
				else
					return nextYear;
			}
			
			//createDatestamp - given a Javascript date object, build the corresponding YYYYMMDD datestamp for it
			this.createDatestamp = function(gameday) {
				if (gameday != null)
					return parseInt(gameday.getFullYear() + this.zeroPad(gameday.getMonth()+1, 2) + this.zeroPad(gameday.getDate(), 2));
				else
					return 0;
			}
			
			//clearGames - this removes all the shs_board objects from the list
			this.clearGames = function() {
				$(".shs_scrollableArea").empty(); //clear out all the existing matches
				/*
				$(".shs_scrollableArea").remove(); //clear out all the existing matches
				$(".shs_scrollWrapper").append('<div class="shs_scrollableArea"></div>');
				*/
			}
			
			//loadPeriod - this is called on initial load and when the period is changed by the user, it initiates the data load for that sport/period
			this.loadPeriod = function(sport, period, is_new_period) {
				var now = new Date();
				nowSecs = now.getTime();
				this.lastGamesUpdate = nowSecs;
				
				if (is_new_period)
					this.clearGames();
				
				var ticker = this;
				if (this.useJSONP) {
					$.ajax({
						type: "GET",
						url: ticker.dataPath+"data/gamesMSNBC.js.asp?jsonp=true&sport="+sport+"&period="+period+'&random='+nowSecs,
						dataType: "jsonp",
						cache: true,
						jsonp: false,
						jsonpCallback: "loadGamesData"
					});
				}
				else {
					$.ajax({
						type: "GET",
						url: ticker.dataPath+"data/gamesMSNBC.js.asp?sport="+sport+"&period="+period+'&random='+nowSecs,
						dataType: "json",
						success: function(data) {
							ticker.loadGamesData(data);
						},
						error: function(jqXHR, textStatus, errorThrown) {
							alert("loadPeriod error: "+textStatus);
						}
					});
				}
			}
			
			//loadGamesData - this is the JSONP callback that takes the current games data and loads it into the ticker
			this.loadGamesData = function(data) {
				var is_new_period = false;
				//alert("load game data");
				var ticker = this;
				
				//save the current number of scores, so that we can tell if it changed (to reset to position #1 if so)
				var num_old_games = $(".shs_scrollableArea div.shs_board").length;
				
				if (data.games.length == 0) {
					//there are no games for this sport/period, print an appropriate message
					ticker.clearGames();
					
					var eventType = "Games";
					if (data.sport.toUpperCase() == "GOLF")
						eventType = "Round";
					else if (data.sport.toUpperCase() == "NASCAR")
						eventType = "Race";
					else if (data.sport.toUpperCase() == "CYCLING" || data.sport.toUpperCase() == "TOUR")
						eventType = "Stage";
					
					$(".shs_scrollableArea").append('<div class="shs_board">'+
						'<a href="#" onclick="return false;" class="shs_postGame">'+
						'	<span></span>'+
						'	<span class="shs_team1">No '+eventType+'</span>'+
						'	<span class="shs_team2">Scheduled</span>'+
						'	<span class="shs_team1Score"></span>'+
						'	<span class="shs_team2Score"></span>'+
						'	<span class="shs_status1"></span>'+
						'	<span class="shs_status2"></span>'+
						'</a>'+
					'</div>');
					
					is_new_period = true; //force a redraw
				}
				else if (data.sport.toUpperCase() == "GOLF") {
					var tourneyXML = $.parseXML(data.games[0]);
					var details    = $(tourneyXML).find("tournament");
					var scoringSystem = $(details).attr("scoring-system");
					
					//figure out if this is being aired on NBC
					var channels = "/"+ $(details).attr("tv") + "/";
					var classTV  = (channels.indexOf("/NBC") >= 0 ? "shs_nbcTV" : "");
					var badgeNBC = (classTV == "" ? "" : "shs_nbcBadge");
					
					//if this tournament has no link, then set the click to inactive
					//var url = $(details).attr("href");
					//if (url == undefined) {
					//	url="http://scores.nbcsports.msnbc.com/golf/final.asp";
					//}
					// MSNBC REQUESTED ALL GOLF LINK TO THE FOLLOWING URL - 8/29/2011
					var url = "http://www.golfchannel.com/tours/";
					var onclick = "";
					if (url == "") onclick='onclick="return false;"';
					
					//check the tournament status, so that you can add supplemental information
					var tourney_status = $(details).attr("status");
					var tourney_round = $(details).attr("curr-round");
					var tourney_rounds = $(details).attr("rounds");
					if (tourney_round && tourney_round != '') {
						var status_str = ' - Round '+tourney_round;
//						if (tourney_round == tourney_rounds && tourney_status == "Final")
						if (tourney_status != "In-Progress")
							status_str += ' ('+tourney_status+')';
						
						$(".shs_schedNav ul li a.shs_active span.status").html(status_str);
					}
					
					//loop through all the golfers and insert/update their scores
					var golfers    = $(tourneyXML).find("ticker-entry");

					// SEE NOTE ABOVE ABOUT THE CHANGING OF THESE LINKS ON 8/29/2011
					//if ($(golfers[0]).find("gamestate").attr("display_status1").indexOf('$') >= 0) {
					//	url="http://scores.nbcsports.msnbc.com/golf/earnings.asp";
					//}

					for (var x = 0; x < golfers.length; x++) {
						var gamestate = $(golfers[x]).find("gamestate");
						var golfer1   = $(golfers[x]).find("golfer-one");
						var golfer2   = $(golfers[x]).find("golfer-two");
						
						//if the golfer's place field is double-digit, we need to set a shs_doubleOffset class on the shs_status1
						var place1    = $(golfer1).attr("place");
						var place1Class = "";
						if (place1.length > 1) place1Class = "shs_doubleOffset";
						if (place1 != '') place1 = place1 + ') ';

						//figure out if this game is pregame/active/postgame
						var status = $(gamestate).attr("status")
						var statusClass = "shs_postGame";
						switch (status) {
							case "Pre-Round":   statusClass = "shs_preRound"; break;
							case "In-Progress": statusClass = "shs_curRound"; break;
							//case "Pre-Round":   statusClass = "shs_preGame"; break;
							//case "In-Progress": statusClass = "shs_curGame"; break;
						}
						
						//for status 2, we don't want to display it if it's the date
						var status1 = $(gamestate).attr("display_status1");
						var status2 = $(gamestate).attr("display_status2");
						if ($(gamestate).attr("display_status1") == $(gamestate).attr("tee-time"))
							status1 = (""+status1).replace(/ ([AP]M)$/, "$1 ET");
						
						//grab the scoreboard in this slot if there is one (and clear it out), otherwise add a new one
						var this_golfer = $(".shs_scrollableArea div.shs_board:eq("+x+")");
						if (this_golfer == null || this_golfer.length == 0)
							this_golfer = $(".shs_scrollableArea").append('<div class="shs_board"></div>').find("div.shs_board:eq("+x+")");
						else
							this_golfer.empty();
						
						if (!golfer2 || golfer2.length == 0) {
							//there's only one golfer, so this is stroke play
							$(this_golfer).append(
								'<a href="'+url+'" '+onclick+' target="_top" class="'+statusClass+' '+classTV+'">'+
								'	<span class="'+badgeNBC+'"></span>'+
								'	<span class="shs_team1" nowrap="true">'+place1+$(golfer1).attr("alias")+'</span>'+
								'	<span class="shs_team2" nowrap="true"></span>'+
								'	<span class="shs_team1Score"></span>'+
								'	<span class="shs_team2Score"></span>'+
								'	<span class="shs_status1 '+place1Class+'">'+$(golfer1).attr("score")+' '+status1+'</span>'+
								'	<span class="shs_status2"></span>'+
								'</a>'
							);
						}
						else {
							//there are two golfers, so grab the other guy's data and display it also
							
							var place2    = $(golfer2).attr("place");
//							var place2Class = "";
//							if (place2.length > 1) place2Class = "shs_doubleOffset";
							if (place2 != '') place2 = place2 + ') ';
							
							//if this is the Ryder Cup we need to set flags for the golfers depending on team
							var tournamentClass = "", golfer1Class = "", golfer2Class = "";
							if ($(details).attr("name") == "Ryder Cup") {
								tournamentClass ="shs_ryderCup";
								if ($(golfer1).attr("team") == "USA") golfer1Class = "shs_usa"; else golfer1Class = "shs_euro";
								if ($(golfer2).attr("team") == "USA") golfer2Class = "shs_usa"; else golfer2Class = "shs_euro";
							}
							
							$(this_golfer).append(
								'<a href="'+url+'" '+onclick+' target="_top" class="'+statusClass+' '+classTV+' shs_matchPlay '+tournamentClass+'">'+
								'	<span class="'+badgeNBC+'"></span>'+
								'	<span class="shs_team1 '+golfer1Class+'" nowrap="true">'+place1+$(golfer1).attr("alias")+'</span>'+
								'	<span class="shs_team2 '+golfer2Class+'" nowrap="true">'+place2+$(golfer2).attr("alias")+'</span>'+
								'	<span class="shs_team1Score">'+status1+'</span>'+
								'	<span class="shs_team2Score">'+status2+'</span>'+
								'	<span class="shs_status1"></span>'+
								'	<span class="shs_status2"></span>'+
								'</a>'
							);
						}
					}
				}
				else if (data.sport.toUpperCase() == "NASCAR") {
					var raceXML = $.parseXML(data.games[0]);
					var details    = $(raceXML).find("race");
					
					//figure out if this is being aired on NBC
					var channels = "/"+ $(details).attr("tv") + "/";
					var classTV  = (channels.indexOf("/NBC") >= 0 ? "shs_nbcTV" : "");
					var badgeNBC = (classTV == "" ? "" : "shs_nbcBadge");
					
					//if this race has no link, then set the click to inactive
					var url = $(details).attr("href");
					var onclick = "";
					if (url == "") onclick='onclick="return false;"';
					
					//figure out if this game is pregame/active/postgame
					var status = $(details).attr("status")
					var statusClass = "shs_curGame";
					switch (status) {
						case "Leaderboard":   statusClass = "shs_preGame"; break;
						case "Final":         statusClass = "shs_postGame"; break;
					}
					
					var race_status = $(details).attr("status");
					var race_laps_completed = $(details).attr("laps-completed");
					var race_laps = $(details).attr("laps");
					if (race_status == 'Qualifying')
						$(".shs_schedNav ul li a.shs_active span.status").html(' - Qualifying');
					else if (race_status == 'Leaderboard')
						$(".shs_schedNav ul li a.shs_active span.status").html('');
					else if (race_laps_completed && race_laps_completed != '') {
						var status_str = ' - Lap '+race_laps_completed + ' of ' + race_laps;
//						if (race_laps_completed == race_laps && race_status == "Final")
						if (race_status != "In-Progress")
							status_str += ' ('+race_status+')';
						
						$(".shs_schedNav ul li a.shs_active span.status").html(status_str);
					}
					
					//the driver details are buried inside the race node, so if they're missing the code at the start won't find them.  So be prepared to print out a message if this is qualifying and no one has results yet
					var drivers    = $(raceXML).find("ticker-entry");
					if (drivers.length == 0) {
						ticker.clearGames();
						$(".shs_scrollableArea").append('<div class="shs_board">'+
							'<a href="#" onclick="return false;" class="shs_postGame">'+
							'	<span></span>'+
							'	<span class="shs_team1">No Results</span>'+
							'	<span class="shs_team2">Available</span>'+
							'	<span class="shs_team1Score"></span>'+
							'	<span class="shs_team2Score"></span>'+
							'	<span class="shs_status1"></span>'+
							'	<span class="shs_status2"></span>'+
							'</a>'+
						'</div>');
					}
					
					//loop through all the drivers and insert/update their results
					for (var x = 0; x < drivers.length; x++) {
						var gamestate = $(drivers[x]).find("gamestate");
						var driver   = $(drivers[x]).find("driver");
						
						//if the driver's place field is double-digit, we need to set a shs_doubleOffset class on the shs_status1
						var place    = $(driver).attr("position");
						var placeClass = "";
						if (place.length > 1) placeClass = "shs_doubleOffset";
						if (place != '') place = place + ') ';
						
						//grab the scoreboard in this slot if there is one (and clear it out), otherwise add a new one
						var this_driver = $(".shs_scrollableArea div.shs_board:eq("+x+")");
						if (this_driver == null || this_driver.length == 0)
							this_driver = $(".shs_scrollableArea").append('<div class="shs_board"></div>').find("div.shs_board:eq("+x+")");
						else
							this_driver.empty();
						
						$(this_driver).append(
							'<a href="'+url+'" '+onclick+' target="_top" class="'+statusClass+' '+classTV+'">'+
							'	<span class="'+badgeNBC+'"></span>'+
							'	<span class="shs_team1" nowrap="true">'+place+$(driver).attr("alias")+'</span>'+
							'	<span class="shs_team2" nowrap="true"></span>'+
							'	<span class="shs_team1Score"></span>'+
							'	<span class="shs_team2Score"></span>'+
							'	<span class="shs_status1 '+placeClass+'">'+$(gamestate).attr("display_status")+'</span>'+
							'	<span class="shs_status2"></span>'+
							'</a>'
						);
					}
				}
				else if (data.sport.toUpperCase() == "CYCLING" || data.sport.toUpperCase() == "TOUR") {
					var stageXML = $.parseXML(data.games[0]);
					var details    = $(stageXML).find("stage");
					
					//figure out if this is being aired on NBC
					var channels = "/"+ $(details).attr("tv") + "/";
					var classTV  = (channels.indexOf("/NBC") >= 0 ? "shs_nbcTV" : "");
					var badgeNBC = (classTV == "" ? "" : "shs_nbcBadge");
					
					//if this stage has no link, then set the click to inactive
					var url = $(details).attr("href");
					var onclick = "";
					if (url == "") onclick='onclick="return false;"';
					
					//figure out if this game is pregame/active/postgame
					var status = $(details).attr("status")
					var statusClass = "shs_curGame";
					switch (status) {
						case "Standings":   statusClass = "shs_preGame"; break;
						case "Results":     statusClass = "shs_postGame"; break;
					}
					
					/*
					if (status == 'Standings')
						$(".shs_schedNav ul li a.shs_active span.status").html(' - Season Leaders');
					else if (race_laps_completed && race_laps_completed != '') {
						var status_str = ' - Lap '+race_laps_completed + ' of ' + race_laps;
//						if (race_laps_completed == race_laps && status == "Final")
						if (status == "Final")
							status_str += ' (Final)';
						
						$(".shs_schedNav ul li a.shs_active span.status").html(status_str);
					}
					*/
					
					var riders    = $(stageXML).find("ticker-entry");
					for (var x = 0; x < riders.length; x++) {
						var gamestate = $(riders[x]).find("gamestate");
						var rider   = $(riders[x]).find("rider");
						
						//if the rider's place field is double-digit, we need to set a shs_doubleOffset class on the shs_status1
						var place    = $(rider).attr("position");
						var placeClass = "";
						if (place.length > 1) placeClass = "shs_doubleOffset";
						if (place != '') place = place + ') ';
						
						//grab the scoreboard in this slot if there is one (and clear it out), otherwise add a new one
						var this_rider = $(".shs_scrollableArea div.shs_board:eq("+x+")");
						if (this_rider == null || this_rider.length == 0)
							this_rider = $(".shs_scrollableArea").append('<div class="shs_board"></div>').find("div.shs_board:eq("+x+")");
						else
							this_rider.empty();
						
						$(this_rider).append(
							'<a href="'+url+'" '+onclick+' target="_top" class="'+statusClass+' '+classTV+'">'+
							'	<span class="'+badgeNBC+'"></span>'+
							'	<span class="shs_team1" nowrap="true">'+place+$(rider).attr("alias")+'</span>'+
							'	<span class="shs_team2" nowrap="true"></span>'+
							'	<span class="shs_team1Score"></span>'+
							'	<span class="shs_team2Score"></span>'+
							'	<span class="shs_status1 '+placeClass+'">'+$(gamestate).attr("display_status")+'</span>'+
							'	<span class="shs_status2"></span>'+
							'</a>'
						);
					}
				}
				else {
					for (var x = 0; x < data.games.length; x++) {
						var matchXML  = $.parseXML(data.games[x]);
						var gamestate = $(matchXML).find("gamestate");
						var home      = $(matchXML).find("home-team");
						var away      = $(matchXML).find("visiting-team");
						var tickerent = $(matchXML).find("ticker-entry");
						var gamecode  = $(tickerent).attr("gamecode")
						var gametype  = $(tickerent).attr("gametype")
						
						//figure out if this is being aired on NBC
						var channels = "/"+ $(gamestate).attr("tv") + "/";
						var classTV  = (channels.indexOf("/NBC") >= 0 ? "shs_nbcTV" : "");
						var badgeNBC = (classTV == "" ? "" : "shs_nbcBadge");
						
						//figure out if this game is pregame/active/postgame
						var status = $(gamestate).attr("status")
						var statusClass = "shs_curGame";
						switch (status) {
							case "Suspended":
							case "Pre-Game":  statusClass = "shs_preGame"; break;
							case "Final":
							case "Postponed":
							case "Cancelled": statusClass = "shs_postGame"
						}
						
						var homePossession = "", awayPossession = "";
						if (data.sport == "NFL" || data.sport == "CFB") {
							switch ($(gamestate).attr("team-possession-id")) {
								case $(away).attr("id"): awayPossession = "shs_possesion";
								case $(home).attr("id"): homePossession = "shs_possesion";
							}
						}
						
						var homeWin = "", awayWin = "";
						if (status == "Final") {
							if (parseInt($(away).attr("score")) > parseInt($(home).attr("score")))
								awayWin = "shs_win";
							else if (parseInt($(home).attr("score")) > parseInt($(away).attr("score")))
								homeWin = "shs_win";
						}
						
						//convert the short MM/YY date to a javascript object
						var gamedate = ticker.translateShortDate($(gamestate).attr("gamedate"));
						//convert the javascript object to a YYYYMMDD datestamp
						var gamedatestamp = ticker.createDatestamp(gamedate);
						//grab today's date as a YYYYMMDD datestamp for comparison
						var todaystamp = ticker.createDatestamp(new Date());
						
						//for status 2, we don't want to display it if it's the date
						var status1 = $(gamestate).attr("display_status1");
						var status2 = $(gamestate).attr("display_status2");
						if (gamecode == "201109170107" && status1 == $(gamestate).attr("gametime"))
							status1 = "DLY";

						else if ($(gamestate).attr("display_status1") == $(gamestate).attr("gametime")) {
							if ($(gamestate).attr("display_status2") == "Susp") {
							status1 = $(gamestate).attr("display_status1") + " ET";
							status2 = "(" + $(gamestate).attr("display_status2") + ")";
							//alert(status1);
							} else {
							status2 = "ET";
							if (gamedatestamp != todaystamp)
								status2 += " "+["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][gamedate.getDay()];
							}
						}
						else if (statusClass == "shs_postGame") {
							if (status2 != "" && status1 == "Final")
								status2 = "F/" + status2;
							else if (status2 != "")
								status2 = status1 + "/" + status2;
							//else if (status1 == "Final")
								//status2 = "F";
							else if (status1 == "Ppnd")
								status2 = "PPD";
							else
								status2 = status1;
								status1 = "";
						}
						else if (status1 == "Delay")
							status1 = "DLY";
						

						//get the link for this game, and the date on which it occurs
						var url = $(gamestate).attr("href");
						var onclick = "";
						
						//FIXME: when do CFB and NFL statfox links show up?
						//if ((url == "") && (Math.abs((gamedate - (new Date()))/86400000) < 7)) {
						//if ((url.indexOf("preview.asp") >= 0 || url == "") && (gamedatestamp == todaystamp) && (data.sport.toUpperCase() != "NFL") && (status2 != 'Ppnd') && (status2 != 'PPD')) {
						if ((url.indexOf("preview.asp") >= 0 || url == "") && ((gamedatestamp == todaystamp && data.sport.toUpperCase() != "NFL") || (this.defaultPeriod == data.period && (data.sport.toUpperCase() == "NFL" || data.sport.toUpperCase() == "CFB"))) && (status2 != 'Ppnd') && (status2 != 'PPD')) {
						//document.write(status2); document.write(status1);
							//this is a preview link or no link, and the game is today.  Replace it with a statfox link if we have that info
							var sf = ticker.statfoxData[data.sport.toUpperCase()];
							if (sf != null) {
								if ((gamecode.substring(6,7) == 3) && (data.sport.toUpperCase() == "MLB")) {
								url = "http://matchups.nbcsports.msnbc.com/"+ data.sport.toUpperCase() +"/schedule/"+ ticker.createDatestamp(gamedate) + sf[$(home).attr("id")] +"2-"+ sf[$(away).attr("id")] +".html";
								}

								else if (data.sport.toUpperCase() == "CBK") {
								url = "http://matchups.nbcsports.msnbc.com/NCAAB/schedule/"+ ticker.createDatestamp(gamedate) + sf[$(home).attr("id")] +"-"+ sf[$(away).attr("id")] +".html";
								}
							
								else if (data.sport.toUpperCase() == "CFB") {
								url = "http://matchups.nbcsports.msnbc.com/NCAAF/schedule/"+ ticker.createDatestamp(gamedate) + sf[$(home).attr("id")] +"-"+ sf[$(away).attr("id")] +".html";
								}
							
								else if (data.sport.toUpperCase() == "MLB" && $(tickerent).attr("gametype") == 'Preseason') {
								url = "";
								}

								else {
								url = "http://matchups.nbcsports.msnbc.com/"+ data.sport.toUpperCase() +"/schedule/"+ ticker.createDatestamp(gamedate) + sf[$(home).attr("id")] +"-"+ sf[$(away).attr("id")] +".html";
								}
							}
						}
						//alert(this.defaultPeriod + " | " + data.period);
						if (url == "" || (status2 == "PPD") || (((data.sport.toUpperCase() == "NHL") || (data.sport.toUpperCase() == "NBA") || ((data.sport.toUpperCase() == "MLB") && (url == ""))) && $(tickerent).attr("gametype") == 'Preseason')) {
							if (data.sport.toUpperCase() == "NFL") {
								if (data.period < 0) {
									url="http://scores.nbcsports.msnbc.com/fb/scoreboard.asp?week="+ Math.abs(data.period) + "&seasontype=pre";							
								}
								else {
									url="http://scores.nbcsports.msnbc.com/fb/scoreboard.asp?week="+ data.period;
								}
							}
							else if (data.sport.toUpperCase() == "CFB") {
								url="http://scores.nbcsports.msnbc.com/cfb/scoreboard.asp?week="+ data.period;
							}
							else {
								url="http://scores.nbcsports.msnbc.com/"+ data.sport.toLowerCase() +"/scoreboard.asp?day=" + data.period;
							}
						}
							
						//DOUBLE HEADER CODE
						if (data.sport.toUpperCase() == "MLB") {
							if (gamecode.substring(6,7) == 2) {
								if (status1 == 'Top' || status1 == 'Bot') {
									status1 = status1 + ' ' + status2.substring(0,1);
									status2 = 'GM1';
								}
								else {
									status2 = status2 + ' - GM1';
								}
							}
							else if (gamecode.substring(6,7) == 3) {
								if (status1 == 'Top' || status1 == 'Bot') {
									if (status2.substring(1,1) == 't') {
										status1 = status1 + ' ' + status2.substring(0,1);
									} 
									else {
										status1 = status1 + ' ' + status2.substring(0,2);
									}
									status2 = 'GM2';
								}
								else {
									status2 = status2 + ' - GM2';
								}
							}

						}
						
						//grab the scoreboard in this slot if there is one (and clear it out), otherwise add a new one
						var this_game = $(".shs_scrollableArea div.shs_board:eq("+x+")");
						if (this_game == null || this_game.length == 0)
							this_game = $(".shs_scrollableArea").append('<div class="shs_board"></div>').find("div.shs_board:eq("+x+")");
						else
							this_game.empty();
						//alert(status1);
						$(this_game).append(
							'<a href="'+url+'" '+onclick+' target="_top" class="'+statusClass+' '+classTV+'">'+
							'	<span class="'+badgeNBC+'"></span>'+
							'	<span class="shs_team1 '+awayPossession+' '+awayWin+'" nowrap="nowrap">'+$(away).attr("alias").replace("#","")+'</span>'+
							'	<span class="shs_team2 '+homePossession+' '+homeWin+'" nowrap="nowrap">'+$(home).attr("alias").replace("#","")+'</span>'+
							'	<span class="shs_team1Score '+awayWin+'">'+$(away).attr("score")+'</span>'+
							'	<span class="shs_team2Score '+homeWin+'">'+$(home).attr("score")+'</span>'+
							'	<span class="shs_status1">'+status1+'</span>'+
							'	<span class="shs_status2">'+status2+'</span>'+
							'</a>'
						);
					}
				}
				
				//compare the old/new number of scoreboards, and if they don't match then we must have switched sports and we need to reset to position #1
				var num_new_games = $(".shs_scrollableArea div.shs_board").length;
				if (num_new_games != num_old_games)
					is_new_period = true;

				if (data.sport.toUpperCase() == "NHL" && gametype == 'All-Star'){
					var offset_value = 50;
				} else if (data.sport.toUpperCase() == "CBK"){
					var offset_value = 15;
				} else {
					var offset_value = 10;
				};
				
				//relayout the ticker
				ticker.formatTicker(is_new_period,offset_value);
			}
			
			//refreshData - initiate calls for new sport and/or game data depending on whether or not the timer has expired
			this.refreshData = function() {
				var now = new Date();
				nowSecs = now.getTime();
				
				if (nowSecs > this.lastSportsUpdate + this.sportsUpdateTimer*1000)
					this.loadSports();
				
				if (nowSecs > this.lastGamesUpdate + this.gamesUpdateTimer*1000)
					this.loadPeriod(this.sportsData[this.selectedSport].sport, this.selectedPeriod, false);
			}
			
			//format the scrolling part of the ticker
			this.formatTicker = function(is_new_period_or_sport,offset) {
				if (is_new_period_or_sport)
					this.resetSize();
				
				//if this is being called as a result of a sport/period change, reset the width of the left block in the ticker
				if (is_new_period_or_sport) {
					//Have to set the width with inline css before we can retrieve the width for the calculation. Quirky I know.
					$("#shs_leftBlock .shs_leftBlockCap").css("width", "");
					var leftcapWidth = $("#shs_leftBlock .shs_leftBlockCap").width();
					leftcapWidth = Math.max(leftcapWidth, 150);
					$("#shs_leftBlock .shs_leftBlockCap").css("width", leftcapWidth);
					
					var tickerWidth = $(".shs_customTicker").width();
					
					var tickerControlWidth = $("#shs_leftBlock .shs_leftBlockCap").outerWidth();
					var calculatedWidth = (tickerWidth - tickerControlWidth);
					$("#shs_centerBlock").css("width", calculatedWidth);
				}
				
				$(".shs_overlay").fadeOut("slow");
				
				//if this is being called as a result of a sport/period change, reset the scroll to the first element in the ticker
				if (is_new_period_or_sport)
					this.scrollFirst();
				
				//assign width values to scoreboards(fixes scrolling endpoints)
				$(".shs_board a").each(function() {

					$(this).css("width", "");
					$(this).css("width", $(this).width()+offset);
					
//					var width = Math.max($(".shs_board .shs_team1").width(), $(".shs_board .shs_team2").width());
//					$(this).css("width", width);
				});
				
				if (is_new_period_or_sport)
					this.resetSize();
				
				this.refreshScroll();
			}
			
			//scrollIsSetup - this is called after the scrolling library is loaded, set the parameters for scrolling
			this.scrollIsSetup = function(num_steps) {
				//init scroll functionality
				$("#shs_centerBlock").smoothDivScroll({ 
					scrollStep: num_steps,
					scrollInterval: 30,
					countOnlyClass: "div.shs_board"
				});
				
				this.resetSize     = function() { $("#shs_centerBlock").smoothDivScroll("recalculateScrollableArea"); }
				this.scrollFirst   = function() { $("#shs_centerBlock").smoothDivScroll("moveToElement", "first"); }
				this.refreshScroll = function() { }
				
				this.initialized = true;
				this.formatTicker();
				
				//load initial data for all categories
				this.loadStatfox();
				this.loadSports();	
				
				//start a callback timer to call refreshData periodically and reload any data
				ticker = this;
				if (this.updateThread == null) {
					this.updateThread = setInterval(function() {
						ticker.refreshData()
					}, 5000);
				}
			}
			
			this.scrollHandle = null;
			this.RESIZE_EV = 'onorientationchange' in window ? 'orientationchange' : 'resize';
			this.scrollIsSetupIOS = function(num_steps) {
				$(".scrollingHotSpotLeft").remove();
				$(".scrollingHotSpotRight").remove();
				
				//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
				
				this.initialized = true;
				//this.formatTicker();

				this.resetSize     = function() {
					//this.debugPrint('resetSize');
					if ($('.shs_scrollableArea').width() != 0 && this.scrollHandle == null) {
						//this.debugPrint('resetSize - initial setup');
						$('.shs_scrollWrapper').attr('id', 'shs_scrollWrapper').css('overflow-x', 'scroll');
						this.scrollHandle = new iScroll('shs_scrollWrapper', { vScroll: false, hScrollbar: false });
					}
					
					var width = 0;
					$(".shs_board").each(function() {
						width += $(this).outerWidth()+4;
					});
					$('.shs_scrollableArea').css("width", width);
					
					this.refreshScroll();
				}
				this.scrollFirst   = function() {
					//this.debugPrint('scrollFirst');
					this.scrollHandle.scrollToElement('div.shs_board:nth-child(1)', 0);
				}
				this.refreshScroll = function() { 
					//this.debugPrint('refreshScroll');
					ticker = this;
					setTimeout(function () {
							//ticker.debugPrint('resetSize: shs_scrollableArea width=' + $('.shs_scrollableArea').width()); 
							//ticker.debugPrint('resetSize: shs_scrollWrapper width=' + $('.shs_scrollWrapper').width()); 
							//ticker.debugPrint('resetSize: shs_centerBlock width=' + $('#shs_centerBlock').width()); 
							ticker.scrollHandle.refresh();
							//ticker.debugPrint('resetSize: shs_scrollableArea width=' + $('.shs_scrollableArea').width()); 
							//ticker.debugPrint('resetSize: shs_scrollWrapper width=' + $('.shs_scrollWrapper').width()); 
							//ticker.debugPrint('resetSize: shs_centerBlock width=' + $('#shs_centerBlock').width()); 
						}, 0);
				}
				
				//load initial data for all categories
				this.loadStatfox();
				this.loadSports();	
				
				//start a callback timer to call refreshData periodically and reload any data
				ticker = this;
				if (this.updateThread == null) {
					this.updateThread = setInterval(function() {
						ticker.refreshData()
					}, 5000);
				}
				
				window.addEventListener(this.RESIZE_EV, this, true);
			}
			this.handleEvent = function (e) {
				switch(e.type) {
					case this.RESIZE_EV:
//						this.debugPrint('handleEvent: RESIZE_EV');
						this.formatTicker(true);
						break;
				}
			},
			
			//setup the initial ticker parameters and markup depending on the browser type
			this.initializeTicker = function() {
				this.deviceAgent = navigator.userAgent.toLowerCase();
				this.iOS_agentID = this.deviceAgent.match(/(iphone|ipod|ipad)/);			  

				$(".shs_customTicker").css("width", this.tickerCSSWidth);
				
				$(".shs_customTicker").addClass("shs").html(
					'<div id="shs_leftBlock">'+
					'	<div class="shs_leftBlockCap">'+
					'		<div class="shs_sportNav">'+
					'			<ul>'+
					'			</ul>'+
					'		</div>'+
					'		<div class="shs_schedNav">'+
					'			<ul>'+
					'			</ul>'+
					'		</div>'+
					'	</div>'+
					'</div>'+
					'<div id="shs_centerBlock">'+
					'	<div class="shs_overlay"></div>'+
					'	<div class="scrollingHotSpotLeft"></div>'+
					'	<div class="scrollingHotSpotRight"></div>'+
					'	<!-- Begin Ticker Board Output -->'+
					'	<div class="shs_scrollWrapper">'+
					'		<div class="shs_scrollableArea">'+
					'		</div><!-- shs_scrollableArea -->'+
					'	</div><!-- shs_scrollWrap -->'+
					'</div><!-- shs_centerBlock -->');
				
				//load the scrolling library that's appropriate for each browser
				var ticker = this;
				if ($.browser.webkit && ($.client.os == "Mac")) {
					//alert("I am Mac Webkit")
					$('.shs_customTicker').addClass("webkit_osx");
					$.ajax({
						url: 'scripts/jquery.smoothDivScroll-1.1.js',
						dataType: 'script',
						cache: true,
						success: function() {
							ticker.scrollIsSetup(7);
						}
					});
				} else if($.browser.webkit && ($.client.os == "Windows")) {
					//alert("I am Windows Webkit")
					$('.shs_customTicker').addClass("webkit_win");
					$.ajax({
						url: 'scripts/jquery.smoothDivScroll-1.1.js',
						dataType: 'script',
						cache: true,
						success: function() {
							ticker.scrollIsSetup(7);
						}
					});
				} else if(this.iOS_agentID) {
//					alert("I am an iPad or iPhone");
					$('.shs_customTicker').addClass("webkit_ios");
					$.ajax({
						url: 'scripts/iscroll-lite.js',//jquery.smoothDivScrollIpad.js',
						dataType: 'script',
						cache: true,
						success: function() {
							ticker.scrollIsSetupIOS(9);
						}
					});
				} else {
					$.ajax({
						url: 'scripts/jquery.smoothDivScroll-1.1.js',
						dataType: 'script',
						cache: true,
						success: function() {
							ticker.scrollIsSetup(7);
						}
					});
				}
			}
			
			//set a debugging function that is appropriate for each browser
			if (window.console && 'function' === typeof window.console.log)
				this.debugPrint = function(message) {
					window.console.log(message);
				}
			else
				this.debugPrint = function(message) {
					$('#debug').prepend('<div>'+message+'</div>').find('div:gt(4)').remove();
				}
			
			//setup the ticker
			this.initializeTicker();
			
			return this;
		}