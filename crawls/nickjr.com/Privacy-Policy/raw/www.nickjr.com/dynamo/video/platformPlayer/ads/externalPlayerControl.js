//These settings can be changed to determine if a player gets muted when it loads up.
//true means the player gets muted, false it has the audio enabled.
//nickjr players
var nickjrHomepageMuted= false;
var nickjrRightRailMuted= false;
var nickjrPlaytimeMuted= false;
var nickjrParentsHubMuted= false;

//nick players
var nickHomepageMuted= false; //Per Steve Youngwood's request this should stay false, talk to Kristen Hague to discuss
var nickVideoPlayPageMuted= false;
var nickVideoHubCoverfan= false;
var nickGamesHubCoverfan= false;
var nickShowsHubCoverfan= false;

//nicktoons players
var nicktoonsHomepageMuted= false;
var nicktoonsVideoPlayPageMuted= false;
var nicktoonsVideoHubCoverfan= false;
var nicktoonsGamesHubCoverfan= false;
var nicktoonsShowsHubCoverfan= false;

//nickatnite players
var nanHomepageMuted= false;
var nanVideoPlayPageMuted= false;
var nanVideoHubCoverfan= false;
var nanGamesHubCoverfan= false;
var nanShowsHubCoverfan= false;

//teennick players
var teennickHomepageMuted= false;
var teennickVideoPlayPageMuted= false;
var teennickVideoHubCoverfan= false;
var teennickGamesHubCoverfan= false;
var teennickShowsHubCoverfan= false;

//pc players
var pcHomepageMuted = false;

//dont change anything below this line
//used by page embedded players
function forcedMutePlayerCheck(pid){
	
	//nickjr players
	if (pid == "nickjrHomepage") {
	   forcePlayerMuteOnLoad(nickjrHomepageMuted, pid);
	}

	if (pid == "nickjrRightRail") {
	   forcePlayerMuteOnLoad(nickjrRightRailMuted, pid);
	}
	
	if (pid == "nickjrPlaytime") {
	   forcePlayerMuteOnLoad(nickjrPlaytimeMuted, pid);
	}
	
	if (pid == "nickjrParentsHub") {
	   forcePlayerMuteOnLoad(nickjrParentsHubMuted, pid);
	}	

	
	//nick players
	if (pid == "nickHomepage") {
	   forcePlayerMuteOnLoad(nickHomepageMuted, pid);
	}
	
	if (pid == "nickVideoPlayPage") {
	   forcePlayerMuteOnLoad(nickVideoPlayPageMuted, pid);
	}	
	
	//nicktoons players		
	if (pid == "nicktoonsHomepage") {
	   forcePlayerMuteOnLoad(nicktoonsHomepageMuted, pid);
	}	
	
	if (pid == "nicktoonsVideoPlayPage") {
	   forcePlayerMuteOnLoad(nickVideoPlayPageMuted, pid);
	}		
	
	//nickatnite players
	if (pid == "nanHomepage") {
	   forcePlayerMuteOnLoad(nicktoonsHomepageMuted, pid);
	}	
	
	if (pid == "nanVideoPlayPage") {
	   forcePlayerMuteOnLoad(nickVideoPlayPageMuted, pid);
	}	
	
	//teennick players		
	if (pid == "teennickHomepage") {
	   forcePlayerMuteOnLoad(teennickHomepageMuted, pid);
	}	
	
	if (pid == "teennickVideoPlayPage") {
	   forcePlayerMuteOnLoad(nickVideoPlayPageMuted, pid);
	}		
	
	
	//pc players
	if (pid == "pcHomepage") {
	   forcePlayerMuteOnLoad(pcHomepageMuted, pid);
	}	
	
};
function forcePlayerMuteOnLoad(performMute, pid) {
		if (performMute) {
			if (player) {
				player.mute();
				$.cookie('muteOAP', true); 
			}
		} else {
			if (player) {
				if ($.cookie('muteOAP')) {
					//we muted for adops on a previous player, unmute the player now
					player.unmute();  
					$.cookie('muteOAP', false); 				
				} else {
					//do nothing, let player maintain its state unless its playtime
					if (pid == 'nickjrPlaytime') {
						if ($.cookie('playtimePopupOpened')) {
							//ensure playtime gets unmuted as it sets the mute on the player when it opens
							player.unmute();
							$.cookie('playtimePopupOpened', false);
						}						
					}
					
				}
			}
		}		
	
};


//used by coverfan players, coverfans use a different shared object currently, so dont need to check for the cookie.  
function coverfanMutePlayerCheck(pid){
	
	//nick coverfans
	if (pid == "nickVideoHub") {		
	   return nickVideoHubCoverfan;
	}

	if (pid == "nickGamesHub") {
	   return nickGamesHubCoverfan;	   
	}

	if (pid == "nickShowsHub") {
	   return nickShowsHubCoverfan;	   
	}	
	
	//nicktoons coverfans
	if (pid == "nicktoonsVideoHub") {
	   return nicktoonsVideoHubCoverfan;
	}

	if (pid == "nicktoonsGamesHub") {
	   return nicktoonsGamesHubCoverfan;	   
	}

	if (pid == "nicktoonsShowsHub") {
	   return nicktoonsShowsHubCoverfan;	   
	}	
	
	return false;

};