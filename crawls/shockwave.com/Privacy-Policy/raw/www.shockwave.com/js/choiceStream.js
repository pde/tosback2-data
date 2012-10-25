/* Created by wPowell 2011-02 */
$(document).ready( function () {
	// if we have a gameKeyword then we should be on a game page and should track the page view
	if ( gameKeyword ) {
		choiceStream.gamePageView();
	}
});
var choiceStream = {
	apiKey: '83a569a3217d4a67',
	/**
	 * Set user_id if the user is logged in or check for cookie_id and either create and pass to csRR or just pass.
	 * @param csObj the object to call setParam for user_id or cookie_id
	 */
	setAuthType: function (csObj) {
		if( userInfo.memberId ) {
			csObj.setParam( 'user_id', userInfo.memberId );
		}
		if ( mtvn.btg.util.Cookie.read('csCID') ) {
			csObj.setParam( 'cookie_id', mtvn.btg.util.Cookie.read('csCID') );
		} else {
			var newUUID = generateUUID();
			var exdate=new Date();
			exdate.setDate(exdate.getDate() + 1800);
			mtvn.btg.util.Cookie.set( 'csCID', newUUID, exdate.toUTCString(), '/', 'shockwave.com' );
			csObj.setParam( 'cookie_id', newUUID );
		}
	},
	gamePageView: function () {
		if ( !mtvn.btg.util.String.isDefined(gameKeyword) ) { return; }
		var pd = new csRR(this.apiKey, 'product_detail');
		this.setAuthType(pd);
		pd.addItem(gameKeyword);
        if (choicestreamRecs.getGroup() == 'choicestream') {
			if ($('#recommend ol.clearfix').hasClass('gamerec3')){
                $('#podRecommendedGames li a').click(function(){
                   window.opener.location = $(this).attr('href');
                   window.opener.focus();
                });
				pd.addRecoDisplayRequest("podRecommendedGames", {max: 3});
            } else if ($('.podHeader').hasClass('gamerec4')) {
				pd.addRecoDisplayRequest("podRecommendedGames", {max: 4});
			} else {
		    	pd.addRecoDisplayRequest("podRecommendedGames", {max: 5});
			}
         }
		pd.send();
	},
	favoriteAdd: function ( gameID ) {
		if ( !mtvn.btg.util.String.isDefined(gameID) ) { return; }
		var fa = new csRR(this.apiKey, 'custom');
		this.setAuthType(fa);
		fa.addActivity("fav_item_add", { item_id: gameID });
		fa.send();
	},
	rateGame: function ( gameID, rating ) {
		if ( !mtvn.btg.util.String.isDefined(gameID) || !mtvn.btg.util.String.isDefined(rating) ) { return; }
		var rg = new csRR(this.apiKey, 'custom');
		this.setAuthType(rg);
		rg.addActivity("item_ratings", { "item_id": gameID, "rating":rating }); // can be floating point values between 1.0 and 5.0
		rg.send();
	},
	shareGame: function () {
		if ( !mtvn.btg.util.String.isDefined(gameKeyword) ) { return; }
		var sg = new csRR(this.apiKey, 'custom');
		this.setAuthType(sg);
		sg.addActivity("item_shares", { "item_id": gameKeyword });
		sg.send();
	},
	// this will apply to unlimited member downloads too
	tryGame: function ( gameID ) {
		if ( !mtvn.btg.util.String.isDefined(gameID) ) { return; }
		var tg = new csRR(this.apiKey, 'custom');
		this.setAuthType(tg);
		tg.addActivity('item_trials', { item_id: gameID, unit_price: '0.00' });
		tg.send();
	},
	prerollWatched: function () {
		if ( !mtvn.btg.util.String.isDefined(gameKeyword) ) { return; }
		var pw = new csRR(this.apiKey, 'custom');
		this.setAuthType(pw);
		pw.addActivity("item_watches", { "item_id": gameKeyword });
		pw.send();
	}
};

/**
 * Generates a decent UUID rfc4122 version 4
 * Good enough for our purpose
 */
generateUUID = function () {
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		return v.toString(16);
	}).toUpperCase();
	return uuid;
};