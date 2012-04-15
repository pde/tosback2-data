 /**
 * @author carrillos
 * @version 2.0, 05/01/2009
 */
if(typeof KIDS == "undefined" || !KIDS) var KIDS = {};
KIDS.namespace("ads.yahoo");

(function($) {
	if(!$) {
		//KIDS.utils.doLog("Yahoo Ads: jquery is unavailable");
		return;
	}

	KIDS.ads.dirtyWordsList = "abstinence, abortion, acai, Alcohol, Alpha, alzare, anal, andro, argenine," +
		" arginine, arousal, augmentation, bartender, Beer, bikini, Blood, bone, boob, booster, booze," +
		" bra, Breast, Brew, bulimia, bust, butt, caffeine, cervical, Champagne, chlamydia, cialis," +
		" circum, clitoris, colon, colonic, condom, contraception, contraceptive, cosmetic, cum," +
		" cunnilingus, dating, dependence, desensitize, desire, detox, dick, diet, disease, drug," +
		" drunk, dysfunction, ejaculat, elargement, elargment, enhanc, enlarg, enzyte, erect, erotic," +
		" estrogen, exotic, extagen, extend, ezerex, facial, fasting, fat, finger, flaccid, flacid," +
		" foreskin, freak, gay, genital, gerth, ginseng, girth, gonoria, gonorrhea, gyn, hell, hepatitis," +
		" herbal, herpes, hiv, homo, horny, hpv, implant, impot, inhancement, intercourse, intervention," +
		" intimacy, jenny craig, kiss, labia, latex, lengthen, lengthening, lesbian, levitra, lgv, libid," +
		" lingerie, longitude, lover, lubricant, magna, master cleanse, masterb, masturb, match making," +
		" mature, maxim, medicine, meet, mens health, needle, Oral, organ, orgasm, OTC, over the counter," +
		" panties, pap, pelvic, penil, penis, phallus, prostat, provestra, pubic, pussy, recovery, regimen," +
		" rehab, rx, semen, sensual, Sex, shave, single, six pack, size, slim, sperm, stamina, std, steroid," +
		" stretch, strip, surgery, syndrome, tattoo, testes, testicle, testosterone, thong, tranquilizer, trich," +
		" uncut, underwear, urethra, urin, vagina, vasectomy, vazomyne, venereal, viagra, vialipro, vibrating," +
		" vibrator, vicerex, vimax, virgin, virility, vitamin, vivaxa, vodka, vytalin, wart, Wax, weight, wine, xtend, zenerx";
	
	KIDS.ads.dirtyWords;
	KIDS.ads.filterKeywords;
	
	KIDS.ads.searchType = KIDS.get("yahooSearchType");
	KIDS.ads.searchType = KIDS.ads.searchType == null ? "shows" : KIDS.ads.searchType;
	
	KIDS.ads.yahoo.getFilterKeywords = function() {
		KIDS.ads.dirtyWords = KIDS.ads.dirtyWordsList.split(",");
		KIDS.ads.filterKeywords = KIDS.get("filterKeywords");
		KIDS.ads.filterKeywords = KIDS.ads.filterKeywords == null ? new Array() : KIDS.ads.filterKeywords.split(",");
	
		//KIDS.utils.doLog("Filter Keywords: [ "+ KIDS.ads.filterKeywords.concat(KIDS.ads.dirtyWords)+"]");
		return KIDS.ads.filterKeywords.concat(KIDS.ads.dirtyWords);
	};
	
	/**
	 * Quirky setup, inquire with yahoo about updated json request possibility.
	 *  
	 * doYahooInit needs to be called before the dom is loaded.
	 * They add a javascript script to the page that loads javascript ad results (non-json) from yahoo.
	 * We then fire off doYahooDisplay on dom ready to display them. This gives the first function time to load the data. 
	 */
	(function doYahooInit() {
		doContentMatch(KIDS.ads.searchType, null, 3, g_outputCharacterEncoding);
		doLinkSpots(10);
	})();
	
	KIDS.ads.yahoo.doDisplay = function() {
		KIDS.ads.yahoo.doContentMatchResults();
		KIDS.ads.yahoo.doLinkSpotsResults();
	}
	
	/* Specific pages can bind to the 'content_match_loaded' event
	 * see: /js/ads/yahoo/games-results/games-results.js
	 */
	KIDS.ads.yahoo.doContentMatchResults = function() {
		var yahooLinks = getLinks();
		var filteredLinks = yahooLinks == null || yahooLinks.length() <= 0 ? null :
			getFilteredLinks(yahooLinks, KIDS.ads.yahoo.getFilterKeywords());
	
		$(document).trigger({type:"content_match_loaded", ads:filteredLinks});
	}
	
	/* Specific pages can bind to the 'link_spots_loaded' event
	 * see: /js/ads/yahoo/games-results/games-results.js
	 */
	KIDS.ads.yahoo.doLinkSpotsResults = function() {
		var linkSpots = getLinkSpots();
		$(document).trigger({type:"link_spots_loaded", ads:linkSpots});
	}
	
	KIDS.ads.yahoo.initContentMatchUrls = function() {
		$('a[href].sponsor_ad').bind("click", KIDS.ads.yahoo.doContentMatchClick);
		$('a[href].sponsor_ad_description').bind("click", KIDS.ads.yahoo.doContentMatchClick);
		$('a[href].sponsor_ad_client').bind("click", KIDS.ads.yahoo.doContentMatchClick);
	}
	
	KIDS.ads.yahoo.initLinkSpotsUrls = function() {
		$('a[href].sponsor_ad_linkspot').bind("click", KIDS.ads.yahoo.doLinkSpotClick);
	}
	
	KIDS.ads.yahoo.doContentMatchClick = function(e) {
		doUrl(this.href);
		return false;
	}
	
	KIDS.ads.yahoo.doLinkSpotClick = function(e) {
		doLinkSpotUrl(this.href);
		return false;
	}
	
	$(document).ready(function() { KIDS.ads.yahoo.doDisplay(); });

})(typeof jQuery === "undefined" ? $ : jQuery);