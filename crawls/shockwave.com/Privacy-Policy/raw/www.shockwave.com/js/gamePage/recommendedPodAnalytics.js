$(document).ready ( function () {
// sets up Recommended Game Pod Omniture variables
	initRecommendedGamePodAnalytics();

});
/**
 * Sets up analytics for Recommended Games Bar, if it exists.
 * Assumes that it is being used on a game page with a gameID to pass.
 */
initRecommendedGamePodAnalytics = function(){
	$( ".gameRecommendationsSidePod ol a, #daughter #recommend ol a, .gameRecommendationsSidePod2 ol a" ).live('click', function(){
		var pod = "recSideBar";
		var slot  = $( this ).closest("li").index() + 1;
		var page = gameID;
		// extract the game keyword from the href
		var recGameHref = ( this ).href;
		var recGameKeyword = recGameHref.substring( recGameHref.lastIndexOf("/") + 1, recGameHref.indexOf(".jsp") );
		var prop17 = pod + "_" + slot + "_" + page + "_" + recGameKeyword;

        /* if this is choicestream supply an event40 for online game recs click event or event 40, event 23 for download game recs
         * else give an event19 for online game recs or an event 34 for download game recs
         */

		if (choicestreamRecs.getGroup() == 'choicestream') {
            if(pageGroup == 'download'){
                var omniVars = {
                    prop17: prop17,
                    events: "event40,event23",
                    eVar6: "recommendedSide"
                };
            } else {
                var omniVars = {
                    prop17: prop17,
                    events: "event40",
                    eVar6: "recommendedSide"
                };
            }
		} else {
            if(pageGroup == 'download'){
                var omniVars = {
                    prop17: prop17,
                    events: "event34",
                    eVar6: "recommendedSide"
                };
            } else {
                var omniVars = {
                    prop17: prop17,
                    events: "event19",
                    eVar6: "recommendedSide"
                };
            }
		}
		//set a cookie with omniVars to be picked up by the next page then deleted
		btg.Cookie.set( "swOmni", btg.JSON.stringify( omniVars ) );
		// Return statement fixes Chrome not setting cookies when event is attached with jquery .click()
		return;
	});
};