/**		
*	Required Files: 
*	/tools/js/jquery/jq.js
*	/tools/js/jquery/jquery.shim.js
*	/tools/js/LoginModule.js
*	/tools/js/global/CartoonMSIB.js
*	/tools/js/profiles/js-api-lib/toon.lib.js
*	jquery cookie
*	/games/tools/js/slurp/AchievementModuleComm.js
*	/games/tools/js/TopScoresModule.js
*/
jQuery(function(){	
	_runSocial = new socialBar;		
	_runSocial.checkBarState();	
	//assign click events
	jQuery('#_sb_alertCountWrapper').click(function(e){ 
		_runSocial.userAlertDisplay(); 
		e.stopPropagation();
	});				
	jQuery('#_sb_miniBar').click(function(e){ 
		_runSocial.maximizeBar(); 
		e.stopPropagation();
	});										
	jQuery('#_sb_tab').click(function(e){ 
		_runSocial.minimizeBar(); 
		e.stopPropagation();
	});					
	jQuery('#_sb_progress').hover(
		function(e){ 
			_runSocial.pointsRemaining(); 
			e.stopPropagation();
		},
		function(e){ 
			_runSocial.pointsRemainingClose(); 
			e.stopPropagation();
		}
	);					
	
	//if user is logged in
	if(LoginModule.isLoggedIn){				
		//_runSocial.loggedIn(); is called here /tools/js/LoginModule.js with this function: LoginModule.onCartoonLogIn_Complete
	} else {		
		_runSocial.notLoggedin();
	}		
	
	/*
	*To fix Flash object and iFrame overlapping issue on Chrome in Win XP
	*/
	var WinVer = navigator.appVersion;
	if ((WinVer.indexOf('Windows NT 5.1') > 0) && (WinVer.indexOf('Chrome') > 0)) {
		jQuery('#displayBlock').bind('DOMSubtreeModified', function(){
			/*originally the selector was the id tag of the object, but found that it not alwasys called #game
			However, it will alwasys be an object for the game*/
			var gObj = jQuery('#displayBlock object');
			if (gObj){
				gObj.attr('wmode', 'transparent');
				if (gObj.attr('wmode') == 'transparent') {
					jQuery('#displayBlock').unbind('DOMSubtreeModified', false);
					var gHTML = jQuery('#displayBlock').html();
					jQuery('#displayBlock').html('');
					jQuery('#displayBlock').html(gHTML);
				};
			};
		});
	};		
});	

//if window is resized destory and build main iframe shim
jQuery(window).resize(function() {
    if(this.resizeDone) clearTimeout(this.resizeDone);
    
    this.resizeDone = setTimeout(function() {
        jQuery(this).trigger('resizeShim');
    }, 500);
});
jQuery(window).bind('resizeShim', function() {
	jQuery('#_sb_socialGlobalNav').unshim();
	jQuery('#_sb_socialGlobalNav').shim();
});	
	
	/**
	* socialBar Object/Class
	*/
	function socialBar() {
		var self = this;
		this.socialDomain = window.location.hostname; //get url
		this.sbHtmlElem = jQuery('#_sb_socialGlobalNavShim'); //set var with html to traverse
		this.miniProfileOpen = ''; //init var to track miniProfile open/close state
		this.alertBoxOpen = ''; //init var to track alertBox open/close state
		this.popIsLocked = false; //var to track if pop-ups are locked (so they dont collide and overwrite each other) 
		this.badgePopData = []; //array to store badge pop-up data
		this.leaderboardPopData = ''; //string to store leaderboard pop-up data 
		this.levelPopData = ''; //string to store level up pop-up data
		this.intervalTime = 5000; //var for setInterval timing (should be 500ms more than clearTime)
		this.clearTime = 4500; //var for setTimeout timing
		this.pointsRemainingString = "";
		
		//set cookie if bar is maximized or minimized
		if( jQuery.cookie('CNSocialBar') == null || jQuery.cookie('CNSocialBar') == 'max' ) { 
			this.tinyBar = false;
		} else {
			this.tinyBar = true;
		}				
		
		jQuery.cookie('CNSocialBar');
		
		/**
		* checks to see if bar is maximized or minimized
		* called in document ready
		*/
		this.checkBarState = function(){
			if (this.tinyBar == false){
				this.maximizeBar();		
			} else {
				this.minimizeBar();
			}
		}	

		/**
		* shows the user the amount of points they need to reach the next level
		* called in this.badgeEarn and on hover
		*/		
		this.pointsRemaining = function(timer){
			jQuery(self.sbHtmlElem).find('#_sb_pointsNeeded').html(self.pointsRemainingString);
			jQuery(self.sbHtmlElem).find('#_sb_pointsDisplayWrapper').addClass('_sb_pointsActive');		
			if(timer){
				setTimeout(self.pointsRemainingClose, self.clearTime);	
			}
		}
		/**
		* closes the user the amount of points they need to reach the next level
		* called in this.pointsRemaining, this.popLevelAlert and on hover
		*/			
		this.pointsRemainingClose = function(){
			jQuery(self.sbHtmlElem).find('#_sb_pointsDisplayWrapper').removeClass('_sb_pointsActive');
		}
			
		/**
		* Displays users level and points
		* sets cookie to be used to track users level state
		* called in this.loggedIn and this.badgeEarn after a badge is earned
		*/		
		this.userLevel = function(points){			
			toon2.user_points_level(_userInfo.tegID, function(data) {
				self.pointsRemainingString = data.pts_remaining.toString();
				//add comma if remaining points are over 1000
				if (self.pointsRemainingString.length > 3){
					var commaPlacement = self.pointsRemainingString.length - 3;
					self.pointsRemainingString = [self.pointsRemainingString.slice(0, commaPlacement), ',', self.pointsRemainingString.slice(commaPlacement)].join('');										
				} 
				//define users level and tegid
				var levelTegId = data.level + '_' + _userInfo.tegID;								
				//read cnGamerLevel cookie
				var cnGamerLevel = jQuery.cookie("cnGamerLevel");
				//if cookie exists split it
				if (cnGamerLevel != null){
					var splitCookie = cnGamerLevel.split("_")
				//if cookie does not exist - set cookie
				} else {
					var cnGamerLevel = data.level + '_' + _userInfo.tegID;
					jQuery.cookie( 'cnGamerLevel', cnGamerLevel,  { expires: 7, path: '/', domain:'cartoonnetwork.com' } ); 
				}
				//if current user tegid and cookies tegid match		
				if (splitCookie != undefined){		
					if (splitCookie[1] == _userInfo.tegID){
						//if level is higher - show level up
						if (splitCookie[0] < data.level){
							self.popLevelAlert(data);
							//reset cookie if level up alert shown
							cnGamerLevel = data.level + '_' + _userInfo.tegID;
							jQuery.cookie( 'cnGamerLevel', cnGamerLevel,  { expires: 7, path: '/', domain:'cartoonnetwork.com' } ); 											
						}
					//if tegids dont match - reset cookie	
					} else {
						cnGamerLevel = data.level + '_' + _userInfo.tegID;
						jQuery.cookie( 'cnGamerLevel', cnGamerLevel,  { expires: 7, path: '/', domain:'cartoonnetwork.com' } ); 					
					}							
				}						
				//math for this is (userValue - minValue) / (maxValue - minValue) * 100 					
				var percentageEarnedLevel = (data.points - data.cur_lvl_pts) /  (data.nxt_lvl_pts - data.cur_lvl_pts) * 100;		
				var levelImage = 
						'<img class="_sb_levelImage" height="36" width="38" src="'
					+	data.levelImage.med
					+	'" />';

				jQuery(self.sbHtmlElem).find('#_sb_progress_overlay').css('width',percentageEarnedLevel + '%');
				jQuery(self.sbHtmlElem).find('#_sb_gamerIcon').html(levelImage);
				if (points){
					self.pointsRemaining('timer');
				}
			});
		}
		
		/**
		* Displays pop-up when users level is different from the cookie
		* showing a level change
		* called in this.userLevel and this.stackPopUps
		*/				
		this.popLevelAlert = function(data){
			var effectCount = 0;
			var soundFile = 'levelUp';
			//if locked - set json to a class variable to be used after other finishes
			if (self.popIsLocked == true){
				 self.levelPopData = data;
				 return false;
			//if not locked - lock it and continue	
			} else {
				self.popIsLocked = true;
			}
				
			var levelAlertHtml = 				
					'<div class="_sb_badgeEarnAvatarWrapper"><img class="_sb_badgeEarnAvatar" height="74" width="74" src="'
				+	data.levelImage.lrg
				+	'"></div><div class="_sb_badgeEarnContent clearfix"><div class="_sb_badgeEarnTitle">YOU JUST LEVELED UP!</div><div class="_sb_badgeEarnText">Way to Go</div></div>';				
				
			jQuery(self.sbHtmlElem).find('#_sb_badgeEarn').addClass('active levelEarn').html(levelAlertHtml);
			jQuery(self.sbHtmlElem).find('#_sb_badgeEarnShim').prepend('<iframe class="shim" frameborder="0" style="background-color: black; width: 306px; height: 78px; display: block; position: fixed; top: auto; bottom: 54px; left: auto; right: 8px; z-index: auto; filter: none; opacity: 1; background-position: initial initial; background-repeat: initial initial; "></iframe>');	
			
			//bar effects
			self.effectsPopUps('level');
			//play sound
			self.soundEmbed(soundFile);			
			//unbind points hover state
			jQuery('#_sb_progress').unbind('mouseenter mouseleave');
			//close points bar if open
			self.pointsRemainingClose();

			//pulse bar
			pulse(jQuery(self.sbHtmlElem).find('#_sb_progress_overlay'), 100, 'swing', {opacity:0, width:"100%"}, {opacity:1,width:"100%"});			
			//clear earned badge pop-up
			setTimeout(clearHtml,self.clearTime);								
			
			function clearHtml(){			
				jQuery(self.sbHtmlElem).find('#_sb_badgeEarn').unshim();	
				jQuery(self.sbHtmlElem).find('#_sb_badgeEarn').html('').removeClass('active levelEarn');		
				//check if queued data is waiting to be presented and clear lock
				self.stackPopUps();						
			}
			
		    function pulse(elem, duration, easing, props_to, props_from) {
			    
		        elem.animate( props_to, duration, easing,
		        function() {
		            if (effectCount < 30 ) {
		                pulse(elem, duration, easing, props_from, props_to);
		                effectCount++;
		            } else {		            
		            	jQuery(self.sbHtmlElem).find('#_sb_progress_overlay').css({'opacity':'1'});
						//re-create points hover state
						jQuery('#_sb_progress').hover(
							function(e){ 
								_runSocial.pointsRemaining(); 
								e.stopPropagation();
							},
							function(e){ 
								_runSocial.pointsRemainingClose(); 
								e.stopPropagation();
							}
						);		            	
						//show users new points total
		            	self.userLevel('points');
		            }
		        });
		    }			
			
		}

		/**
		* Displays pop-up when badge is earned
		* called in /games/tools/js/slurp/AchievementModuleComm.js and this.stackPopUps
		*/			
		this.badgeEarn = function(o){
			var soundFile = 'badgeEarn';	
			var showPointsCounter = 1; //start at 1 since comparing to an array length			
			//if locked - set json to a class variable to be used after other finishes
			if (self.popIsLocked == true){
				 self.badgePopData.push(o);
				 return false;
			//if not locked - lock it and continue	
			} else {
				var badgeEarnArray = [];			
				if (self.badgePopData.length > 0){
					for (var x=0; x<self.badgePopData.length; x++){
						if(parseInt(x) == x){
							badgeEarnArray.push(self.badgePopData[x]);
						}
					}
				} else {
					badgeEarnArray.push(o);	
				}
				self.popIsLocked = true;
			}
			if (typeof gameId != "undefined"){		
				var productID = gameId;				
			} else if (typeof _pageVars.productId != "undefined"){
				var productID = _pageVars.productId;
			} else {
				return false;
			}
			
			toon2.product_badges({
			    products: productID
			},function(data){ 			    
			    badgeEarnObject(data);
			});
			
			function badgeEarnObject(data){		
				var badgeJson = [];
				var badgeEarnHtml = {};
				var i=0;			
				for (var y=0; y<badgeEarnArray.length; y++){
					//jsmd array prototype altering workaround
					if(parseInt(y) == y){
						for (var x=0; x<data[0].badges.length; x++){
							//jsmd array prototype altering workaround
							if(parseInt(x) == x){												
								if (data[0].badges[x].id == badgeEarnArray[y].id){						
									badgeJson[i] = {};
									badgeJson[i].badgeID 	= badgeEarnArray[y].id;
									badgeJson[i].imageUrl 	= badgeEarnArray[y].imageURL;	
									badgeJson[i].gameName 	= data[0].product_name;												
									badgeJson[i].badgeName 	= data[0].badges[x].badge_name;
									badgeJson[i].points 	= data[0].badges[x].attributes.point_value; 
									i++;
								}
							}
						}
					}
				}
		
				var badgeHtmlCount = 0;
				//create badge html
				for (var x=0; x<badgeJson.length; x++){
					if(parseInt(x) == x){				
						badgeEarnHtml[x] = 
								'<div class="_sb_badgeEarnAvatarWrapper"><img class="_sb_badgeEarnAvatar" height="47" width="47" src="'
							+	badgeJson[x].imageUrl
							+	'"></div><div class="_sb_badgeEarnContent clearfix"><div class="_sb_badgeEarnTitle">'
							+	badgeJson[x].points
							+	' points!</div><div class="_sb_badgeEarnText">You earned the <span class="_sb_badgeEarnBadgeName">'
							+	badgeJson[x].badgeName
							+	'</span> badge in <span class="_sb_badgeEarnGameName">'
							+	badgeJson[x].gameName
							+	'</span></div></div>';					
					}	
				}								

				displayBadgePopup();
									
				var displayBadgeInterval = 
					setInterval( 
						function(){
							displayBadgePopup(); 
						}, self.intervalTime
					);	
														
				function displayBadgePopup(){					
					if(badgeEarnHtml[badgeHtmlCount] != undefined){
						jQuery(self.sbHtmlElem).find('#_sb_badgeEarn').addClass('active').html(badgeEarnHtml[badgeHtmlCount]);				
						jQuery(self.sbHtmlElem).find('#_sb_badgeEarnShim').prepend('<iframe class="shim" frameborder="0" style="background-color: black; width: 306px; height: 78px; display: block; position: fixed; top: auto; bottom: 54px; left: auto; right: 8px; z-index: auto; filter: none; opacity: 1; background-position: initial initial; background-repeat: initial initial; "></iframe>');												
						badgeHtmlCount++;	 					
						//update alert count in bar
						self.userAlertCount();	
						//call pop-up effects function
						self.effectsPopUps();		
						//play sound
						self.soundEmbed(soundFile);											
						//clear earned badge pop-up					
						setTimeout(clearHtml,self.clearTime);
					} else {
						clearInterval(displayBadgeInterval);
						//check if queued data is waiting to be presented and clear lock						
						self.stackPopUps();
						badgeHtmlCount = 0;							
					}	
				}	
			}
			
			
			
			function clearHtml(){
				jQuery(self.sbHtmlElem).find('#_sb_badgeEarn').unshim();	
				jQuery(self.sbHtmlElem).find('#_sb_badgeEarn').html('').removeClass('active');			
				if (self.badgePopData.length === 0){					
					if (showPointsCounter === badgeEarnArray.length){
						//recalculate user level after last badge is earned					
						self.userLevel('points');	 					
					}					
				}
				showPointsCounter++;							
			}						
		}	
		
		this.effectsPopUps = function(level){
			if(level){
				//animate level
				jQuery('._sb_badgeEarnAvatar').animate({
				    width: "74px",
				    height: "74px",
				    top: "0px",
				    right: "0px",				    
				    opacity: "1"
				  }, 250 );				
				
				jQuery('._sb_badgeEarnContent').animate({
					marginLeft: "84px",
				    opacity: "1"
				  }, 400 );					
			} else {
				//animate badge/leaderboard
				jQuery('._sb_badgeEarnAvatar').animate({
				    width: "47px",
				    height: "47px",
				    top: "0px",
				    right: "0px",				    
				    opacity: "1"
				  }, 250 );				
				
				jQuery('._sb_badgeEarnContent').animate({
					marginLeft: "75px",
				    opacity: "1"
				  }, 400 );						
			}  
		}

		this.soundEmbed = function(soundFile){

			if (typeof self.audioSupport == undefined || typeof self.audioSupport == 'undefined'){
				var audioElement = document.createElement('audio');
				var mp3Support = !!audioElement.canPlayType && "" != audioElement.canPlayType('audio/mpeg');
				if (mp3Support !== true){
					var oggSupport = !!audioElement.canPlayType && "" != audioElement.canPlayType('audio/ogg; codecs="vorbis"');
				}
		
				if (mp3Support === true){				
					self.audioSupport = 'mp3';
				} else if (oggSupport === true){
					self.audioSupport = 'ogg';
				} else {
					self.audioSupport = 'swf';
				}		
			}	
						
			if (self.audioSupport === 'mp3'){				
				var audioPlayID = '_sb_sound_' + soundFile;
				jQuery(self.sbHtmlElem).find('#' + audioPlayID)[0].play();
			} else if (self.audioSupport === 'ogg'){
				var audioPlayID = '_sb_sound_' + soundFile;			
				jQuery(self.sbHtmlElem).find('#' + audioPlayID)[0].play();
			} else if (self.audioSupport === 'swf'){
				var swfPlayID = '_sb_sound_swf_' + soundFile;
				var swfPlayInit = document.getElementById(swfPlayID);			
				swfPlayInit.play();
			}		
		}

		/**
		* check if queued data is waiting to be presented as a pop-up
		* clears pop-up lock
		* called in this.leaderboardEarn, this.popLevelAlert and this.badgeEarn
		*/			
		this.stackPopUps = function(){		
			//clear lock
			self.popIsLocked = false;	
			if (self.badgePopData.length > 0){
				self.badgeEarn(self.badgePopData);	
				self.badgePopData = [];
			} else if (self.leaderboardPopData != ''){
				self.leaderboardEarn(self.leaderboardPopData);
				self.leaderboardPopData = '';
			} else if (self.levelPopData != ''){
				self.popLevelAlert(self.levelPopData);
				self.levelPopData = '';
			}										
		}
					

		/**
		* Displays pop-up when leaderboard(s) are earned
		* called in /games/tools/js/TopScoresModule.js and this.stackPopUps
		*/		
		this.leaderboardEarn = function(p_data){
			//if no ranking earned - stop
			if (p_data.rankings.length == 0){
				return false;
			} 
			
			//if locked - wait (so leaderboards and badges do not overwrite)
			if (self.popIsLocked == true){
				self.leaderboardPopData = p_data;
				return false;
			//if not locked - lock it and continue	
			} else {
				self.popIsLocked = true;
			}
			
			var productID = gameId;
			
			toon2.product_badges({
			    products: productID
			},function(data){ 			    
			    leaderboardEarnObject(data);
			});
					
			function leaderboardEarnObject(data){	
				
				
				var productJson = {};
					productJson.gameName 		= data[0].product_name;
					productJson.trophyAllTime	= data[0].product_ImageAllTimeTrophy;
					productJson.trophyWeekly	= data[0].product_ImageWeeklyTrophy; 
				
				var leaderboardText = {};	
					leaderboardText.personal = 'You made a Personal Best in ';
					leaderboardText.weekly = 'You made the Top 10 Weekly Leaderboard in ';					
					leaderboardText.allTime = 'You made the Top 10 All Time Leaderboard in ';					
						
				if (p_data != 'undefined'){
					var leaderboardHtml = {};
					var leaderboardHtmlCount = 0;
					
					for (var x in p_data.rankings){
						if(parseInt(x) == x){
							
							leaderboardHtml[x] = 
									'<div class="_sb_badgeEarnAvatarWrapper"><img class="_sb_badgeEarnAvatar" height="47" width="47" src="http://i.cdn.turner.com/v5cache/CARTOON/site/';
									
							if(p_data.rankings[x].type_id == 'weeklyType1' || p_data.rankings[x].type_id == '9e08d676-25f8-4022-9957-b41d53a9412f'){
								leaderboardHtml[x] += productJson.trophyAllTime;
							} else if (p_data.rankings[x].type_id == 'allTimeType1' || p_data.rankings[x].type_id == '3979c350-307d-49e4-be77-5d0c6be14bfe' && p_data.rankings[x].personal == true) {
								leaderboardHtml[x] += productJson.trophyWeekly;								 
							} else if (p_data.rankings[x].type_id == 'allTimeType1' || p_data.rankings[x].type_id == '3979c350-307d-49e4-be77-5d0c6be14bfe' && p_data.rankings[x].personal == false){
								leaderboardHtml[x] += productJson.trophyAllTime;
							}
							
							leaderboardHtml[x] += 						
									'" /></div><div class="_sb_badgeEarnContent clearfix">'
								+	'<div class="_sb_badgeEarnTitle">New High Score</div>'
								+	'<div class="_sb_badgeEarnText">';
								
							if(p_data.rankings[x].type_id == 'weeklyType1'){
								leaderboardHtml[x] += leaderboardText.weekly;
							} else if (p_data.rankings[x].type_id == 'allTimeType1' && p_data.rankings[x].personal == true){
								leaderboardHtml[x] += leaderboardText.personal;
							} else if (p_data.rankings[x].type_id == 'allTimeType1' && p_data.rankings[x].personal == false){
								leaderboardHtml[x] += leaderboardText.allTime;
							}	 	
							
							leaderboardHtml[x] +=	 
									'<span class="_sb_badgeEarnGameName">'
								+	productJson.gameName
								+	'</span></div></div>';		
						}	
					}
					
					
					//display leaderboard earned
					displayLeaderboardPopup();
					
					//display recurring leaderboards earned
					var displayLeaderboardInterval = 
						setInterval( 
							function(){
								displayLeaderboardPopup(); 
							}, self.intervalTime
						);
					
					function displayLeaderboardPopup(){
						//check to see if leaderboard data exists
						if(leaderboardHtml[leaderboardHtmlCount] != undefined){
							jQuery(self.sbHtmlElem).find('#_sb_badgeEarn').addClass('active').html(leaderboardHtml[leaderboardHtmlCount]);
							jQuery(self.sbHtmlElem).find('#_sb_badgeEarnShim').prepend('<iframe class="shim" frameborder="0" style="background-color: black; width: 306px; height: 78px; display: block; position: fixed; top: auto; bottom: 54px; left: auto; right: 8px; z-index: auto; filter: none; opacity: 1; background-position: initial initial; background-repeat: initial initial; "></iframe>');																					
							leaderboardHtmlCount++;
							//update alert count in bar
							self.userAlertCount();
							//call pop-up effects function
							self.effectsPopUps();							
							//clear earned badge pop-up
							setTimeout(clearHtml,self.clearTime);
						//if no data stop interval	
						} else {
							clearInterval(displayLeaderboardInterval);
							//check if queued data is waiting to be presented and clear lock
							self.stackPopUps();
							leaderboardHtmlCount = 0;	
						}	

					}	
					
					function clearHtml(){
						jQuery(self.sbHtmlElem).find('#_sb_badgeEarn').unshim();	
						jQuery(self.sbHtmlElem).find('#_sb_badgeEarn').html('').removeClass('active');		
					}										
				}											
				
			}		
		}


		/**
		* Displays global alert as a pop-up 
		* called in this.friendNotification clearHtml() function - after the friend notifications are complete
		* or called in the else statement of toon2.alert_friends if there are no friend notifications
		*/	
		this.popGlobalAlert = function(){
			toon2.alert_history({ alerttegid: _userInfo.tegID, alertlimit: 10 },function(data){	
				findGlobalAlert(data);	
			});
			
			function findGlobalAlert(data){
				for (var x in data){
						if(data[x].global == true){
						displayGlobalAlert(data[x]);
					}
				}
			}
			
			function displayGlobalAlert(data){
				var globalAlertHtml = 				
						'<div class="_sb_badgeEarnAvatarWrapper"><img class="_sb_badgeEarnAvatar" height="47" width="47" src="'
					+	data.content.imageUrl
					+	'"></div><div class="_sb_badgeEarnContent clearfix"><div class="_sb_badgeEarnText">'
					+	data.content.message 
					+	'</div></div>';				
					
				jQuery(self.sbHtmlElem).find('#_sb_badgeEarn').addClass('active').html(globalAlertHtml);
				jQuery(self.sbHtmlElem).find('#_sb_badgeEarnShim').prepend('<iframe class="shim" frameborder="0" style="background-color: black; width: 306px; height: 78px; display: block; position: fixed; top: auto; bottom: 54px; left: auto; right: 8px; z-index: auto; filter: none; opacity: 1; background-position: initial initial; background-repeat: initial initial; "></iframe>');					
				//clear earned badge pop-up
				setTimeout(clearHtml,self.clearTime);								
			}
			
			function clearHtml(){
				jQuery(self.sbHtmlElem).find('#_sb_badgeEarn').unshim();	
				jQuery(self.sbHtmlElem).find('#_sb_badgeEarn').html('').removeClass('active');						
			}
			
		}		

		/**
		* Minimizes socialBar
		* called in this.checkBarState
		*/
		this.minimizeBar = function(){
			jQuery(self.sbHtmlElem).find('#_sb_socialGlobalNav').unshim();
			jQuery(self.sbHtmlElem).find('#_sb_socialGlobalNav').removeClass('active');
			jQuery(self.sbHtmlElem).find('#_sb_miniBar').addClass('active');
			jQuery(self.sbHtmlElem).find('#_sb_miniBarAction').shim();
			jQuery(self.sbHtmlElem).find('#_sb_miniBarAvatarWrapper').shim();	
			if(LoginModule.isLoggedIn){	
				self.userAvatar = CartoonMSIB.avatarPath;
				var miniHtml = 
						'<img height="47" width="47" class="_sb_miniBarAvatar" src="http://i.cdn.turner.com/v5cache/CARTOON/site/'
					+	self.userAvatar
					+	'" />';	
				jQuery(self.sbHtmlElem).find('#_sb_miniBarAvatarWrapper').html(miniHtml);
			}
			jQuery.cookie( 'CNSocialBar', 'min',  { expires: 7, path: '/', domain:'cartoonnetwork.com' } ); 			
		}

		/**
		* Maximizes socialBar
		* called in this.checkBarState
		*/		
		this.maximizeBar = function(){
			jQuery(self.sbHtmlElem).find('#_sb_miniBarAction').unshim();
			jQuery(self.sbHtmlElem).find('#_sb_miniBarAvatarWrapper').unshim();			
			jQuery(self.sbHtmlElem).find('#_sb_socialGlobalNav').addClass('active');
			jQuery(self.sbHtmlElem).find('#_sb_miniBar').removeClass('active');
			jQuery(self.sbHtmlElem).find('#_sb_socialGlobalNav').shim();	
			jQuery(self.sbHtmlElem).find('#_sb_miniProfile').shim();	
			jQuery.cookie( 'CNSocialBar', 'max',  { expires: 7, path: '/', domain:'cartoonnetwork.com' } ); 							
		}
		
		/**
		* Sets socialBar not logged in state
		* called in document ready
		*/
		this.notLoggedin = function(){
			var loginToutOpenTimer = 15000; //how long until the tout opens
			var loginToutCloseTimer = 10000; //how long the tout stays open
			
			jQuery(self.sbHtmlElem).find('#_sb_miniProfileInner').addClass('_sb_innerActive');
			jQuery('#_sb_alertCountBadge').html('0');
			jQuery.cookie('cnGamerLevel', null, { path: '/', domain:'cartoonnetwork.com' });
			//click event on document to close open flyouts
			jQuery(document).click(function(e){
				e.stopPropagation();
				if (self.alertBoxOpen == true){
					self.userAlertDisplay();
				}								
			});	
			
			//login tout timer
			setTimeout(loginToutOpen, loginToutOpenTimer);			
			//login tout function
			function loginToutOpen(){		
				if (typeof _userInfo != 'undefined'){
					//do nothing
				} else {		
					//random text for speech bubble
					var loginToutText = [
						'LOG IN TO GET BADGES!',
						'LOG IN TO EARN POINTS AND LEVEL UP!',			
						'LOG IN TO CONNECT WITH FRIENDS!'			
					];				
					//random image for tout
					var loginToutImage = [
						'<img src="http://i.cdn.turner.com/toon/tools/img/social/social30/characters/ben.png" border="0">',
						'<img src="http://i.cdn.turner.com/toon/tools/img/social/social30/characters/finn.png" border="0">',			
						'<img src="http://i.cdn.turner.com/toon/tools/img/social/social30/characters/gumball.png" border="0">',
						'<img src="http://i.cdn.turner.com/toon/tools/img/social/social30/characters/rigby.png" border="0">'			
									
					];				
					var randomLoginToutText = loginToutText[Math.floor(Math.random() * loginToutText.length)];					
					var randomLoginToutImage = loginToutImage[Math.floor(Math.random() * loginToutImage.length)];
					jQuery(self.sbHtmlElem).find('#_sb_loginToutBubbleText').html(randomLoginToutText);
					jQuery(self.sbHtmlElem).find('#_sb_loginToutCharacter').html(randomLoginToutImage);
			
					//unhide containing div
					jQuery(self.sbHtmlElem).find('#_sb_loginTout').addClass('active');
					//inhide speech container so internal div can be measured
					jQuery(self.sbHtmlElem).find('#_sb_loginTout #_sb_loginToutBubble').addClass('notHidden');
					//measure width of text that was randomized
					var loginToutTextWidth = jQuery(self.sbHtmlElem).find('#_sb_loginTout #_sb_loginToutBubbleMid').width() + 'px';
					//set text width to 0px so animation will work correctly
					jQuery(self.sbHtmlElem).find('#_sb_loginTout #_sb_loginToutBubbleMid').css('width','0px');				
					//animate character and text
					jQuery(self.sbHtmlElem).find('#_sb_loginTout #_sb_loginToutCharacter').animate({bottom: '0px'}, {
						duration: 150,
						complete: function() {
							jQuery(self.sbHtmlElem).find('#_sb_loginTout #_sb_loginToutBubble').addClass('active');
							jQuery(self.sbHtmlElem).find('#_sb_loginTout #_sb_loginToutBubbleMid').animate({width: loginToutTextWidth},{duration:400});
							jQuery(self.sbHtmlElem).find('#_sb_loginTout #_sb_loginToutBubbleText').animate({opacity: '1'},400);
							//call close login tout function
							setTimeout(loginToutClose, loginToutCloseTimer);
						}
					});		
				}		
			}
			
			//reverse animations to close
			function loginToutClose(){
				jQuery(self.sbHtmlElem).find('#_sb_loginTout #_sb_loginToutBubbleMid').animate({width: '0px', paddingLeft: '0px', paddingRight: '0px'}, {
					duration: 400,
					complete: function() {
						jQuery(self.sbHtmlElem).find('#_sb_loginTout #_sb_loginToutBubble').removeClass('active');						
						jQuery(self.sbHtmlElem).find('#_sb_loginTout #_sb_loginToutCharacter').animate({bottom: '-40px'},{duration:150,complete: function(){ jQuery(self.sbHtmlElem).find('#_sb_loginTout').removeClass('active notHidden'); }});
					}
				});	
				jQuery(self.sbHtmlElem).find('#_sb_loginTout #_sb_loginToutBubbleText').animate({opacity: '0'},400);												
			}
		}
		
		/**
		* Sets socialBar if user is logged in
		* called in /tools/js/LoginModule.js with this function: LoginModule.onCartoonLogIn_Complete
		*/
		this.loggedIn = function(){
			jQuery(self.sbHtmlElem).find('#_sb_loginTout').removeClass('active');
			_userInfo = {};
			_userInfo.authID = CartoonMSIB.readCookie("authid");
			_userInfo.tegID  = CartoonMSIB.readCookie("TEGid");		

			toon2 = new toon_lib;
			toon2.init(window.location);

			self.userProfile(_userInfo);
			self.userAlertCount();
			self.userLevel();
			
			jQuery(self.sbHtmlElem).find('#_sb_alertWrapper').removeClass('not_logged_in_wrapper');			
			jQuery(self.sbHtmlElem).find('#_sb_alertContent').removeClass('not_logged_in');	
			jQuery(self.sbHtmlElem).find('#_sb_progress').addClass('active');
			jQuery(self.sbHtmlElem).find('#_sb_gamerIcon').addClass('active');
			
			//if alert box is open (not logged in state) close it	
			if (self.alertBoxOpen == true){
				self.closeAlertDisplay();
			}
			
			toon2.friend_requests({msib_id:_userInfo.tegID,authid:_userInfo.authID},function(data){ 
				var relationLength = 0;
				//count relations object
				for (var x in data.relations){
					if (data.relations.hasOwnProperty(x)) relationLength++;
				}
				//if relations found change friend icon				
				if (relationLength > 0){
					jQuery(self.sbHtmlElem).find('#_sb_btnFriends').addClass('active');
				}
			});			
			
			self.friendNotification(); 
			
			//click event on document to close open flyouts
			jQuery(document).click(function(e){
				e.stopPropagation();
				if (self.alertBoxOpen == true){
					self.userAlertDisplay();
				}
				if (self.miniProfileOpen == true){				
					self.openProfile();
				}									
			});
		}

		/**
		* Displays users mini profile
		* called in this.loggedIn
		*/
		this.userProfile = function(_userInfo){			
			self.userName = LoginModule.userDisplayName.split(' ').join('-');
			self.userDisplayName = LoginModule.userDisplayName.split(' ').join('<br />');
			self.userAvatar = CartoonMSIB.avatarPath;
			self.userProfilePath = LoginModule.getProfileURL(LoginModule.userDisplayName);
			
			
			//html for user profile
			var authProfileHtml = 
					'<div id="_sb_miniProfileInner" class="_sb_innerActive"><img class="_sb_avatar_loggedin" src="http://i.cdn.turner.com/v5cache/CARTOON/site/'
				+	self.userAvatar	
				+	'">'
				+	'<h1 class="_sb_loggedin"><span>' 
				+	'<a class="_sb_usersProfilePath" href="'
				+	self.userProfilePath
				+	'">'
				+	self.userDisplayName
				+	"</a>"
				+	'</span></h1>'
				+	'<div id="_sb_btnOpen"></div><div id="_sb_profileActions">'				
				+	'<ul>'
				+	'<li><a href="/accounts/user_pic.html"><span></span>Edit Profile</a></li>'
				+	'<li><a href="/my-badges/'
				+	self.userName
				+	'"><span></span>See Badges</a></li>'
				+	'<li><a href="/my-friendsearch"><span></span>Find Friends</a></li>'
				+	'<li class="_sb_paFoot"><a href="javascript:LoginModule.onCartoonLogOut();">Log out</a></li>'
				+	'</ul></div></div>';
			
			jQuery(self.sbHtmlElem).find('#_sb_miniProfile').html(authProfileHtml)
			//jQuery(self.sbHtmlElem).find('#_sb_miniProfileInner').addClass('_sb_innerActive');
			//jQuery('#_sb_miniProfile').html(authProfileHtml);
			
			//reassign var with new Html
			self.sbHtmlElem = jQuery('#_sb_socialGlobalNavShim');
			
			//assign open profile click event
			//jQuery(self.sbHtmlElem).find('#_sb_btnOpen').click(function(e){
			jQuery('#_sb_btnOpen').click(function(e){
				_runSocial.openProfile(); 
				e.stopPropagation();				
			});					
		}
		
		/**
		* Opens users mini profile
		* click function set in this.userProfile
		*/		
		this.openProfile = function(){	
			//if profile is not open and clicked
			if (self.miniProfileOpen != true){	
				//close alerts if open
				if (self.alertBoxOpen == true){
					this.userAlertDisplay();
				}
				jQuery(self.sbHtmlElem).find('#_sb_miniProfile').unshim();				
				jQuery(self.sbHtmlElem).find('#_sb_miniProfile').addClass('_sb_active');
				//write in iframe shim
				jQuery(self.sbHtmlElem).find('#_sb_miniProfileShim').prepend('<iframe class="shim" frameborder="0" style="background-color: black; width: 242px; height: 209px; display: block; position: absolute; top: -165px; bottom: auto; left: -22px; right: auto; z-index: auto; filter: none; opacity: 1; background-position: initial initial; background-repeat: initial initial; "></iframe>');								
				jQuery(self.sbHtmlElem).find('#_sb_btnOpen').addClass('_sb_open');
				//make miniProfile not clickable				
				jQuery(self.sbHtmlElem).find('#_sb_miniProfile').click(function(e){
					e.stopPropagation();
				});
				self.miniProfileOpen = true;
			//if profile is open and clicked
			} else {
				jQuery(self.sbHtmlElem).find('#_sb_miniProfile').unshim();			
				jQuery(self.sbHtmlElem).find('#_sb_miniProfile').removeClass('_sb_active');
				//write in iframe shim
				jQuery(self.sbHtmlElem).find('#_sb_miniProfileShim').prepend('<iframe class="shim" frameborder="0" style="background-color: black; width: 242px; height: 209px; display: block; position: absolute; top: -15px; bottom: auto; left: -22px; right: auto; z-index: auto; filter: none; opacity: 1; background-position: initial initial; background-repeat: initial initial; "></iframe>');				
				jQuery(self.sbHtmlElem).find('#_sb_btnOpen').removeClass('_sb_open');
				self.miniProfileOpen = false;				
			}
			return false;		
		}			
		
		/**
		* Displays how many alerts the user has
		* called in numerous places
		*/
		this.userAlertCount = function(){	
		
			toon2.alert_state({ alerttegid: _userInfo.tegID },function(data){
				alertCount(data);
		    });
		    
			function alertCount(data){	
				if (typeof data.userAlertCount != 'undefined'){
					if (data.userAlertCount <= 5){
						var badgeCount = data.userAlertCount;
					} else {
						var badgeCount = '5<span class="_sb_alertCountBadgePlus">+</span>'
					}
					if (data.userAlertCount > 0){
						jQuery(self.sbHtmlElem).find('#_sb_alerts').addClass('_sb_activeAlert');
					} else {
						jQuery(self.sbHtmlElem).find('#_sb_alerts').removeClass('_sb_activeAlert');
					}
					jQuery(self.sbHtmlElem).find('#_sb_alertCountBadge').html(badgeCount);					
				}
			}		    				
		}

		/**
		* Closes alert box
		*/
		this.closeAlertDisplay = function(){
			jQuery(self.sbHtmlElem).find('#_sb_alertWrapper').unshim();			
			jQuery(self.sbHtmlElem).find('#_sb_alertCountWrapper').removeClass('_sb_active');
			jQuery(self.sbHtmlElem).find('#_sb_alertWrapper').removeClass('_sb_active');										
			self.alertBoxOpen = false;					
		}	


		/**
		* Opens alert box - displays alerts
		*/
		this.userAlertDisplay = function(){		    
				//if alert flyout is closed
				if (self.alertBoxOpen != true){
					if (self.miniProfileOpen == true){
						this.openProfile();
					}					
					//if user is logged in				
					if(LoginModule.isLoggedIn){
						alertData(_userInfo.tegID , '10');	
						jQuery(self.sbHtmlElem).find('#_sb_alertCountWrapper').addClass('_sb_active');
						jQuery(self.sbHtmlElem).find('#_sb_alertWrapper').addClass('_sb_active');					
						jQuery(self.sbHtmlElem).find('#_sb_alertShim').prepend('<iframe class="shim" frameborder="0" style="background-color: black; width: 315px; height: 458px; display: block; position: absolute; top: auto; bottom: 42px; left: auto; right: 0px; z-index: auto; filter: none; opacity: 1; background-position: initial initial; background-repeat: initial initial; "></iframe>');							
					//if user is not logged in
					} else {
						alertEmpty();
						jQuery(self.sbHtmlElem).find('#_sb_alertCountWrapper').addClass('_sb_active');
						jQuery(self.sbHtmlElem).find('#_sb_alertWrapper').addClass('_sb_active');					
						jQuery(self.sbHtmlElem).find('#_sb_alertShim').prepend('<iframe class="shim" frameborder="0" style="background-color: black; width: 315px; height: 376px; display: block; position: absolute; top: auto; bottom: 42px; left: auto; right: 0px; z-index: auto; filter: none; opacity: 1; background-position: initial initial; background-repeat: initial initial; "></iframe>');							
					}						
					//make alertWrapper not clickable
					jQuery(self.sbHtmlElem).find('#_sb_alertWrapper').click(function(e){
						e.stopPropagation();
					});										
					self.alertBoxOpen = true;
				} else {
					self.closeAlertDisplay();
				}
			return false;		
			
			//call toon.lib method for alerts and user data
			function alertData (alerttegid, alertlimit) {
				var alertResultOutput = jQuery(self.sbHtmlElem).find('#_sb_alertContent');	
				toon2.alert({ alerttegid:alerttegid, alertlimit:alertlimit },function(data){	
					loopAlertData(data);	
				});			
			}
			
			//build alert flyout for non logged in user
			function alertEmpty () {
				var alertHtml = 
						'<div id="_sb_alertContentInner">'
					+	'<div class="_sb_alertEmptyMsgWrapper clearfix"><div class="_sb_alertEmptyMsgCol1"><h2>Join Now To:</h2><ul><li><span class="text"><span class="bullet"></span>Get Badges!</span></li><li><span class="text"><span class="bullet"></span>Connect with Friends!</span></li><li><span class="text"><span class="bullet"></span>Earn Points & Level Up!</span></li></ul></div><div class="_sb_alertEmptyMsgCol2"></div><div class="_sb_alertEmptyMsgFooter"></div></div>'
					+	'<div class="_sb_buttonBlackPosition"><a class="_sb_buttonBlackWrapper" href="javascript:LoginModule.showLoginWindow({visible: true}, \'reg\'); adbpGnav(\'signup\');"><span class="_sb_buttonBlack"><span>sign up</span></span></a></div>' 
					+	'<div class="_sb_message">or</div>'
					+	'<div class="_sb_buttonBlackPosition"><a class="_sb_buttonBlackWrapper" href="javascript:LoginModule.showLoginWindow({visible: true}, \'login\'); adbpGnav(\'login\');"><span class="_sb_buttonBlack"><span>log in</span></span></a></div>'
					+	'</div><div id="_sb_footer"></div>';					
				
				//alert flyout is different size if not logged in
				jQuery(self.sbHtmlElem).find('#_sb_alertWrapper').addClass('not_logged_in_wrapper');							
				jQuery(self.sbHtmlElem).find('#_sb_alertContent').addClass('not_logged_in');				
				jQuery(self.sbHtmlElem).find('#_sb_alertContent').html(alertHtml);
			}
			
			//build individual items for a alert flyout
			function loopAlertData (data) {
			
				var alertHtml = '';
				for (var x in data){
					if (typeof data[x].id != 'undefined'){
						alertHtml += buildAlertHtml(data[x]);
					}
				}
				alertHtml += 
						'<div id="_sb_footer"><div class="_sb_buttonPosition"><a class="_sb_buttonWrapper" href="'
					+	self.userProfilePath
					+	'"><span class="_sb_button"><span>see all</span></span></a></div></div>';				
					
				jQuery(self.sbHtmlElem).find('#_sb_alertContent').html(alertHtml);
				//show count after its viewed
				self.userAlertCount(data);
			}
				
			function buildAlertHtml (data) {	
				//badge alert	
				if (data.content.type == 'badge'){				
					var alertHtml = 
						'<a class="_sb_item" href="'
					+	data.content.pageUrl						
					+	'"><div class="_sb_avatarImg"><img border="0" height="50" width="50" src="http://i.cdn.turner.com/v5cache/CARTOON/site/'
					+	data.content.earnedImageUrl
					+	'" /></div>'
					+	'<div class="_sb_text">'
					+	'<div class="_sb_alertTitle">'
					+	data.content.badgePoints
					+	' points!</div>'
					+	'You earned the <span class="_sb_badgeName">'
					+	data.content.badgeName
					+	'</span> badge in '
					+ 	data.content.gameName
					+	'</div><div class="_sb_alertArrow"></div></a>';				
				//personal leaderboard alert
				} else if(data.content.type == 'leaderboard' && data.content.personal == true){
					var alertHtml = 
						'<a class="_sb_item" href="'
					+	data.content.pageUrl						
					+	'"><div class="_sb_avatarImg"><img border="0" height="50" width="50" src="http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i36/trophy_silver.png'
					+	'" /></div>'
					+	'<div class="_sb_text">'
					+	'<div class="_sb_alertTitle">'
					+	'New High Score</div>'						
					+	'You made a personal best in <span class="_sb_badgeName">'
					+	data.content.productName
					+	'</span>'
					+	'</div><div class="_sb_alertArrow"></div></a>';		
				//top 10 leaderboard alert							
				} else if(data.content.type == 'leaderboard' && data.content.leaderboardType == 'allTimeType1' && data.content.personal == false){
					var alertHtml = 
						'<a class="_sb_item" href="'
					+	data.content.pageUrl						
					+	'"><div class="_sb_avatarImg"><img border="0" height="50" width="50" src="http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i36/trophy_gold.png'
					+	'" /></div>'
					+	'<div class="_sb_text">'
					+	'<div class="_sb_alertTitle">'
					+	'New High Score</div>'	
					+	'You made the All Time Top 10 leaderboard in <span class="_sb_badgeName">'
					+	data.content.productName
					+	'</span>'
					+	'</div><div class="_sb_alertArrow"></div></a>';
				//weekly leaderboard alert										
				} else if(data.content.type == 'leaderboard' && data.content.leaderboardType == 'weeklyType1' && data.content.personal == false){
					var alertHtml = 
						'<a class="_sb_item" href="'
					+	data.content.pageUrl						
					+	'"><div class="_sb_avatarImg"><img border="0" height="50" width="50" src="http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i36/trophy_gold.png'
					+	'" /></div>'
					+	'<div class="_sb_text">'
					+	'<div class="_sb_alertTitle">'
					+	'New High Score</div>'					
					+	'You made the Weekly Top 10 leaderboard in <span class="_sb_badgeName">'
					+	data.content.productName
					+	'</span>'
					+	'</div><div class="_sb_alertArrow"></div></a>';	
				} else if (data.content.type == 'levelUp'){				
					var alertHtml = 
						'<a class="_sb_item_level" href="'
					+	self.userProfilePath						
					+	'"><div class="_sb_avatarImg"><img border="0" height="74" width="74" src="http://i.cdn.turner.com/toon/tools/img/social/social30/level/levels_'
					+	data.content.level
					+	'_lrg.png" /></div>'
					+	'<div class="_sb_text">'
					+	'<div class="_sb_alertTitle">'
					+	'Way to Go!</div>'
					+	'You advanced to Level '
					+	data.content.level
					+	'</div><div class="_sb_alertArrow"></div></a>';				
					
				//social test data - don't display	
				} else if(data.content.type == 'points'){
					var alertHtml = '';	
				//global or other alert									
				} else {
					var alertHtml = '';
					/* commenting out global alerts CN does not want to launch with them
						'<a class="_sb_item" href="'
					+	data.content.pageUrl						
					+	'"><div class="_sb_avatarImg"><img border="0" height="50" width="50" src="'
					+	data.content.imageUrl											
					+	'" /></div>'
					+	'<div class="_sb_text">'
					+	'<span class="_sb_message">'
					+	data.content.message
					+	'</span></div></a>';								
					*/
				}
				
				return alertHtml;
			}			
		}
		
		/**
		* Displays friend notifications
		* there are different displays on what type of friend notification (accept or request)
		* there are different displays on how may friend notifications (single or multiple)
		* if there are no friend notifications to display - the users unanswered friend request count is displayed	
		*/		
		this.friendNotification = function(){		
			var myRequestsUrl = 'http://' + self.socialDomain + '/my-requests';			
			var soundFile = 'friendEarn';
			jQuery(self.sbHtmlElem).find('#_sb_friends').click(function(e){				
				window.location.href = myRequestsUrl;
				e.stopPropagation();				
			});						
			jQuery(self.sbHtmlElem).find('#_sb_friends').addClass('loggedIn');
			
			//call friendData function
			friendData();			
			
			function friendData(){
				self.friendData1 = false;
				self.friendData2 = false;
				self.relationLength = 0;
				
				toon2.alert_friends({ alerttegid:_userInfo.tegID, authid: _userInfo.authID },function(data1, data2){

					if (typeof data1 != 'undefined'){
						//check if it's a relations 'fallback' call - if there are no notifications
						if (typeof data1.relations != 'undefined'){							
							//count relations object
							for (var x in data1.relations){
								if (data1.relations.hasOwnProperty(x)) self.relationLength++;
							}
							//check to see if there are any unresponded to friend requests
							if (self.relationLength > 0){	
								//read cnUnansweredFriends cookie
								var cnUnansweredFriends = jQuery.cookie("cnUnansweredFriends");
								//if cookie exists - stop
								if (cnUnansweredFriends != null){
									return false;
								//if cookie does not exist - set cookie and run function
								} else {
									var cnUnansweredFriendsdate = new Date();
									cnUnansweredFriendsdate.setTime(cnUnansweredFriendsdate.getTime() + (10 * 60 * 1000));
									jQuery.cookie( 'cnUnansweredFriends', 'viewed',  { expires: cnUnansweredFriendsdate, path: '/', domain:'cartoonnetwork.com' } ); 
									loopRelationsData(data1);
									return false;
								}							
							} else {
								//check to see if any global alerts
								//commenting out Global Alert call
								//self.popGlobalAlert();
								return false;
							}
						} 														
					}
					if (typeof data1 != 'undefined'){
						//if only one friend
						if (data1.length == 1){
							self.friendData1 = true;
							self.checkRequestsData = data1;
							var friendTegID = data1[0].content.msibID;
						} else {
							self.friendData1 = true;
							self.checkRequestsData = data1;
						}
					}
					if (typeof data2 != 'undefined'){	
						//if only one friend
						if (data2.length == 1){
							self.friendData2 = true;
							self.checkAcceptsData = data2;
							var friendTegID = data2[0].content.msibID;
						} else {					
							self.friendData2 = true;
							self.checkAcceptsData = data2;
						}
					}						
					if (typeof self.checkRequestsData != 'undefined'){							
						checkRequests();
					} else if (typeof self.checkAcceptsData != 'undefined') {
						checkAccepts();
					}
				});
			}
			
			function checkRequests(){
				if (self.checkRequestsData.length == 1){
					singleFriendRequestData();
				} else {
					multiFriendRequestData();
				}					
			}

			function checkAccepts(){
				self.friendData2 = false;
				if (self.checkAcceptsData.length == 1){
					singleFriendAcceptData();
				} else {
					multiFriendAcceptData();
				}									
			}
			
			function loopRelationsData(data1){
				var relationsTextHead = 'hey! you have';
				if (self.relationLength > 1){
					var relationsTextFoot = 'friend requests';
				} else {
					var relationsTextFoot = 'friend request';
				}	
				var relationsHtml = 
						'<div id="_sb_pendingRequestsWrapper"><div class="_sb_pendingRequestsContent">'
					+	'<div class="_sb_relationsTextHead">'
					+	relationsTextHead
					+	'</div>'
					+	'<div class="_sb_pendingRequestsTotalBG"><span id="_sb_pendingRequestsTotal">'
					+	self.relationLength
					+	'</span></div>'
					+	'<div class="_sb_relationsTextFoot">'
					+	relationsTextFoot
					+	'</div></div><div class="_sb_relationsBGFoot"></div></div>';											

				
																	
				jQuery(self.sbHtmlElem).find('#_sb_friendWrapper').html(relationsHtml);
				jQuery(self.sbHtmlElem).find('#_sb_friendShim').prepend('<iframe class="shim" frameborder="0" style="background-color: black; width: 206px; height: 172px; display: block; position: absolute; top: auto; bottom: 45px; left: auto; right: 20px; z-index: auto; filter: none; opacity: 1; background-position: initial initial; background-repeat: initial initial; "></iframe>');	
				
				//hide fly out after designated time
				setTimeout(clearHtml,self.clearTime);
			}
			
			function clearHtml(){
				jQuery(self.sbHtmlElem).find('#_sb_friendWrapper').unshim();	
				jQuery(self.sbHtmlElem).find('#_sb_friendWrapper').html('');				
				if (self.friendData2 == true){
					checkAccepts();
				} else {
					//call popGlobalAlert
					//commenting out Global Alert call
					//self.popGlobalAlert();					
				}
			}
			
			function singleFriendRequestData(){
				var friendAvatar = self.checkRequestsData[0].content.avatar;
				var friendUserName = self.checkRequestsData[0].content.playerID.split(' ').join('<br />');
				var friendLevel = self.checkRequestsData[0].content.levelInfo.levelImage.sml;
				var singleFriendDataHtml = 
						'<div id="_sb_friendRequestSingleWrapper">'
					+	'<div class="_sb_friendRequestSingleTitle">new friend request!</div>'
					+	'<div class="_sb_friendRequestSingleContent clearfix"><div class="_sb_friendRequestSingleAvatar">'
					+	'<img height="50" width="50" src="http://i.cdn.turner.com/v5cache/CARTOON/site/'
					+	friendAvatar
					+	'"><img class="_sb_friendLevel" height="23" width="23" src="'
					+	friendLevel
					+	'" /></div><div class="_sb_friendRequestSingleUser">'
					+	friendUserName
					+	'</div><div class="_sb_friendRequestBottom"></div></div></div>';				
				
				jQuery(self.sbHtmlElem).find('#_sb_friendWrapper').html(singleFriendDataHtml);
				jQuery(self.sbHtmlElem).find('#_sb_friendShim').prepend('<iframe class="shim" frameborder="0" style="background-color: black; width: 205px; height: 111px; display: block; position: absolute; top: auto; bottom: 43px; left: auto; right: 20px; z-index: auto; filter: none; opacity: 1; background-position: initial initial; background-repeat: initial initial; "></iframe>');	
				//play sound
				self.soundEmbed(soundFile);											
				//hide fly out after designated time
				setTimeout(clearHtml,self.clearTime);
			}
			
			function singleFriendAcceptData(){				
				var friendAvatar = self.checkAcceptsData[0].content.avatar;
				var friendUserName = self.checkAcceptsData[0].content.playerID.split(' ').join('<br />');
				var friendLevel = self.checkAcceptsData[0].content.levelInfo.levelImage.sml;
				var singleFriendDataHtml = 				
						'<div id="_sb_friendAcceptSingleWrapper"><div id="_sb_friendAcceptSingleInner"><div class="_sb_friendAcceptSingleContent clearfix">'
					+	'<div class="_sb_friendAcceptSingleAvatar"><img height="50" width="50" src="http://i.cdn.turner.com/v5cache/CARTOON/site/'
					+	friendAvatar
					+	'"><img class="_sb_friendLevel" height="23" width="23" src="'
					+	friendLevel
					+	'" /></div><div class="_sb_friendAcceptSingleUser">'
					+	friendUserName
					+	'</div></div><div class="_sb_friendAcceptSingleTitle"><div class="_sb_friendAcceptSingleIcon"></div><span>is now your friend!</span></div><div class="_sb_friendRequestBottom"></div></div></div>';					
		
				jQuery(self.sbHtmlElem).find('#_sb_friendWrapper').html(singleFriendDataHtml);
				jQuery(self.sbHtmlElem).find('#_sb_friendShim').prepend('<iframe class="shim" frameborder="0" style="background-color: black; width: 205px; height: 111px; display: block; position: absolute; top: auto; bottom: 45px; left: auto; right: 20px; z-index: auto; filter: none; opacity: 1; background-position: initial initial; background-repeat: initial initial; "></iframe>');
				//play sound
				self.soundEmbed(soundFile);																	
				//hide fly out after designated time
				setTimeout(clearHtml,self.clearTime);
			}
			
			function multiFriendRequestData(){				
				//determine how many friend requests to loop through and show
				if (self.checkRequestsData.length > 5){
					var multiFriendRequestShow = 5;	
				} else {
					var multiFriendRequestShow = self.checkRequestsData.length;	
				}				
								
				var multiFriendRequestHtml = 				
						'<div id="_sb_friendRequestMultiWrapper"><div class="_sb_friendRequestMultiTitle"><span id="_sb_friendRequestTitleNumber">'
					+	self.checkRequestsData.length
					+	'</span> new friend requests!</div><div class="_sb_friendRequestMultiContent clearfix">';
					
					for(var x = 0; x < multiFriendRequestShow; x++){
						if(parseInt(x) == x){
							multiFriendRequestHtml +=
								'<div class="_sb_friendRequestMultiAvatar"><img height="50" width="50" src="http://i.cdn.turner.com/v5cache/CARTOON/site/'
							+	self.checkRequestsData[x].content.avatar
							+	'"></div>';
						}
					}
					
					//if more than 5 then show number
					if (self.checkRequestsData.length > 5){
						var friendRequestMultiNumber = self.checkRequestsData.length - 5;
						multiFriendRequestHtml +=
								'<div class="_sb_friendRequestMultiNumberBG"><span id="_sb_friendRequestMultiNumber">'
							+	friendRequestMultiNumber
							+	'</span></div>';
					}	

					multiFriendRequestHtml +=
						'<div class="_sb_friendRequestBottom"></div></div></div>';
					
					jQuery(self.sbHtmlElem).find('#_sb_friendWrapper').html(multiFriendRequestHtml);
					jQuery(self.sbHtmlElem).find('#_sb_friendShim').prepend('<iframe class="shim" frameborder="0" style="background-color: black; width: 206px; height: 172px; display: block; position: absolute; top: auto; bottom: 45px; left: auto; right: 20px; z-index: auto; filter: none; opacity: 1; background-position: initial initial; background-repeat: initial initial; "></iframe>');	
					//play sound
					self.soundEmbed(soundFile);								
					setTimeout(clearHtml,self.clearTime);
			}


			function multiFriendAcceptData(){
				//determine how many friend accepts to loop through and show
				if (self.checkAcceptsData.length > 5){
					var multiFriendAcceptShow = 5;	
				} else {
					var multiFriendAcceptShow = self.checkAcceptsData.length;	
				}
				
				var multiFriendAcceptHtml = 				
						'<div id="_sb_friendAcceptMultiWrapper">'
					+	'<div class="_sb_friendAcceptMultiInner"><div class="_sb_friendAcceptMultiContent clearfix">';
					
					for(var x = 0; x < multiFriendAcceptShow; x++){
						if(parseInt(x) == x){
							multiFriendAcceptHtml +=
								'<div class="_sb_friendAcceptMultiAvatar"><img height="50" width="50" src="http://i.cdn.turner.com/v5cache/CARTOON/site/'
							+	self.checkAcceptsData[x].content.avatar
							+	'"></div>';
						}
					}
					
					//if more than 5 then show number
					if (self.checkAcceptsData.length > 5){
						var friendAcceptMultiNumber = self.checkAcceptsData.length - 5;
						multiFriendAcceptHtml +=
								'<div class="_sb_friendAcceptMultiNumberBG"><span id="_sb_friendAcceptMultiNumber">'
							+	friendAcceptMultiNumber
							+	'</span></div>';
					}	

					multiFriendAcceptHtml +=
						'</div><div class="_sb_friendAcceptMultiTitle">are now your friends!</div><div class="_sb_friendAcceptBottom"></div></div></div>';
					
					jQuery(self.sbHtmlElem).find('#_sb_friendWrapper').html(multiFriendAcceptHtml);
					jQuery(self.sbHtmlElem).find('#_sb_friendShim').prepend('<iframe class="shim" frameborder="0" style="background-color: black; width: 206px; height: 172px; display: block; position: absolute; top: auto; bottom: 45px; left: auto; right: 20px; z-index: auto; filter: none; opacity: 1; background-position: initial initial; background-repeat: initial initial; "></iframe>');	
					//play sound
					self.soundEmbed(soundFile);									
					setTimeout(clearHtml,self.clearTime);
			}
			this.flashIEFix = function(){
				var WinVer = navigator.appVersion;
				if (WinVer.indexOf('MSIE') > -1 && self.miniProfileOpen == true){
					jQuery('#_sb_socialGlobalNav').unshim();
					jQuery('#_sb_miniProfile').unshim();
					jQuery('#_sb_miniProfile').removeClass('_sb_active');
					jQuery('#_sb_socialGlobalNav').shim();				
					jQuery('#_sb_miniProfileShim').prepend('<iframe class="shim" frameborder="0" style="background-color: black; width: 238px; height: 209px; display: block; position: absolute; top: -15px; bottom: auto; left: auto; right: auto; z-index: auto; filter: none; opacity: 1; background-position: initial initial; background-repeat: initial initial; "></iframe>');
					jQuery('#_sb_btnOpen').removeClass('_sb_open');
					self.miniProfileOpen = false;
				};
			};
		}
	}

