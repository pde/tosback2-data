			var navColor = "ffffff";
			var totalSearchResults = 0;
			var totalVideoResults;
			var totalGameResults;
			var totalShowResults;
			var totalTextResults;
			var searchTicker = 0;

			var resultsCount = 4;
			function getVideoResultsStr (region, lookupFunc) {
				var retString;
				var availRows = parseInt(lookupFunc("{videoResultsSet::ds_RowCount}"));
				totalSearchResults += availRows;
				totalVideoResults = availRows;
				if (availRows != 0) {
					document.getElementById('videoResultsWrapper').className = "availableWrapper";
				} else {
					resultsCount = resultsCount - 1;
					if (resultsCount < 1) {
						document.getElementById('queryWrapper').className = "hiddenWrapper";
						document.getElementById('noQueryWrapper').className = "availableWrapper";
						document.getElementById('noGamesWrapper').className = "availableWrapper";
						document.getElementById('noVideoWrapper').className = "availableWrapper";
						document.getElementById('noResultsHdrWrapper').className = "availableWrapper";
					}
				}
				if (availRows > 4) {
					retString = "1 - 4 of " + availRows + " video results";
				} else if (availRows == 1) {
					retString = "1 video result"
				} else {
					retString = "1 - " + availRows + " of " + availRows + " video results";
				}
				searchTicker += 1;
				if (searchTicker == 4) {
					adbpSearch();
				}
				return retString;
			}

			function getShowResultsStr (region, lookupFunc) {
				var retString;
				var availRows = parseInt(lookupFunc("{showResultsSet::ds_RowCount}"));
				totalSearchResults += availRows;
				totalShowResults = availRows;
				if (availRows != 0) {
					document.getElementById('showResultsWrapper').className = "availableWrapper";
				} else {
					resultsCount = resultsCount - 1;
					if (resultsCount < 1) {
						document.getElementById('queryWrapper').className = "hiddenWrapper";
						document.getElementById('noQueryWrapper').className = "availableWrapper";
						document.getElementById('noGamesWrapper').className = "availableWrapper";
						document.getElementById('noVideoWrapper').className = "availableWrapper";
						document.getElementById('noResultsHdrWrapper').className = "availableWrapper";
					}
				}
				if (availRows > 4) {
					retString = "1 - 4 of " + availRows + " show results";
				} else if (availRows == 1) {
					retString = "1 show result"
				} else {
					retString = "1 - " + availRows + " of " + availRows + " show results";
				}
				searchTicker += 1;
				if (searchTicker == 4) {
					adbpSearch();
				}
				return retString;
			}

			function getGameResultsStr (region, lookupFunc) {
				var retString;
				var availRows = parseInt(lookupFunc("{gameResultsSet::ds_RowCount}"));
				totalSearchResults += availRows;
				totalGameResults = availRows;
				if (availRows != 0) {
					document.getElementById('gameResultsWrapper').className = "availableWrapper";
				} else {
					resultsCount = resultsCount - 1;
					if (resultsCount < 1) {
						document.getElementById('queryWrapper').className = "hiddenWrapper";
						document.getElementById('noQueryWrapper').className = "availableWrapper";
						document.getElementById('noGamesWrapper').className = "availableWrapper";
						document.getElementById('noVideoWrapper').className = "availableWrapper";
						document.getElementById('noResultsHdrWrapper').className = "availableWrapper";
					}
				}
				if (availRows > 6) {
					retString = "1 - 6 of " + availRows + " game results";
				} else if (availRows == 1) {
					retString = "1 game result"
				} else {
					retString = "1 - " + availRows + " of " + availRows + " game results";
				}
				searchTicker += 1;
				if (searchTicker == 4) {
					adbpSearch();
				}
				return retString;
			}

			function getGameResultsAll (region, lookupFunc) {
				var retString;
				var availRows = parseInt(lookupFunc("{gameResultsSet::ds_RowCount}"));
				if (availRows == 1) {
					retString = "1 game result"
				} else {
					retString = "1 - " + availRows + " of " + availRows + " game results";
				}
				return retString;
			}

			function getVideoResultsAll (region, lookupFunc) {
				var retString;
				var availRows = parseInt(lookupFunc("{videoResultsSet::ds_RowCount}"));
				if (availRows == 1) {
					retString = "1 video result"
				} else {
					retString = "1 - " + availRows + " of " + availRows + " video results";
				}
				return retString;
			}

			function getTextResultsStr (region, lookupFunc) {
				var retString;
				var availRows = parseInt(lookupFunc("{textResultsSet::ds_RowCount}"));
				totalSearchResults += availRows;
				totalTextResults = availRows;
				if (availRows != 0) {
					document.getElementById('textResultsWrapper').className = "availableWrapper";
				} else {
					resultsCount = resultsCount - 1;
					if (resultsCount < 1) {
						document.getElementById('queryWrapper').className = "hiddenWrapper";
						document.getElementById('noQueryWrapper').className = "availableWrapper";
						document.getElementById('noGamesWrapper').className = "availableWrapper";
						document.getElementById('noVideoWrapper').className = "availableWrapper";
						document.getElementById('noResultsHdrWrapper').className = "availableWrapper";
					}
				}
				if (availRows > 4) {
					retString = "1 - 4 of " + availRows + " text results";
				} else if (availRows == 1) {
					retString = "1 text result"
				} else {
					retString = "1 - " + availRows + " of " + availRows + " text results";
				}
				searchTicker += 1;
				if (searchTicker == 4) {
					adbpSearch();
				}
				return retString;
			}

			var activeLink = "";
			function showAllResults(targetSet) {
				if (targetSet == "all") {
					document.getElementById('singleTypeResultsWrapper').className="hiddenWrapper";
					document.getElementById('resultsWrapper').className="availableWrapper";
				} else if (targetSet == "games") {
					document.getElementById('resultsWrapper').className="hiddenWrapper";
					document.getElementById('singleTypeResultsWrapper').className="availableWrapper";
					document.getElementById('allVideoResultsWrapper').className="hiddenWrapper";
					document.getElementById('allGameResultsWrapper').className="availableWrapper";
					if (activeLink != "") {
						document.getElementById(activeLink).className="allResultsHdrLink";
					}
					document.getElementById('allGamesLinkTxt').className="allResultsHdrTxt";
					activeLink = "allGamesLinkTxt";
				} else {
					document.getElementById('resultsWrapper').className="hiddenWrapper";
					document.getElementById('singleTypeResultsWrapper').className="availableWrapper";
					document.getElementById('allGameResultsWrapper').className="hiddenWrapper";
					document.getElementById('allVideoResultsWrapper').className="availableWrapper";
					if (activeLink != "") {
						document.getElementById(activeLink).className="allResultsHdrLink";
					}
					document.getElementById('allVideoLinkTxt').className="allResultsHdrTxt";
					activeLink = "allVideoLinkTxt";
				}
			}
			function searchOne () {
				if ((document.formOne.searchTerms.value != "") && (document.formOne.searchTerms.value != "SEARCH")) {
					searchQuery = "/search/index.html?keywords=" + escape(document.formOne.searchTerms.value);
					location.href = searchQuery;
				}
			}
			function searchTwo () {
				if ((document.formTwo.searchTerms.value != "") && (document.formTwo.searchTerms.value != "SEARCH")) {
					searchQuery = "/search/index.html?keywords=" + escape(document.formTwo.searchTerms.value);
					location.href = searchQuery;
				}
			}

			function getStarsSearch (region, lookupFunc) {
				var starString = "";
				var starLimit = 0;
				tempNum = parseFloat(lookupFunc("{rating}"));
				roundedBase = Math.floor(tempNum);
				if (roundedBase <= 5) {
					starLimit = roundedBase;
				} else {
					starLimit = 5;
				}
				for (i = 1; i <= starLimit; i++) {
					starString += '<div class="ratingFullHover"><img src="http://i.cdn.turner.com/toon/tools/img/pixel.gif" width="17" height="17" alt="" border="0"></div>';
				}
				extraStar = true;
				if ((tempNum > (roundedBase + .4)) && (tempNum < (roundedBase + .6))){
					starString += '<div class="ratingHalfHover"><img src="http://i.cdn.turner.com/toon/tools/img/pixel.gif" width="17" height="17" alt="" border="0"></div>';
					extraStar = false;
				}
				emptyNum = 5 - roundedBase;
				emptyLimit = Math.round(5 - tempNum);
				for (i = 1; i <= emptyLimit; i++) {
					starString += '<span class="ratingStars"><img src="http://i.cdn.turner.com/toon/tools/img/pixel.gif" width="17" height="17" alt="" border="0"></span>';
					if (extraStar == false) {
						i += 1;
					}
				}
				return starString;
			}

			function getVideoStarsSearch (region, lookupFunc) {
				var starString = "";
				var starLimit = 0;
				tempNum = parseFloat(lookupFunc("{ranking}"));
				roundedBase = Math.floor(tempNum);
				if (roundedBase <= 5) {
					starLimit = roundedBase;
				} else {
					starLimit = 5;
				}
				for (i = 1; i <= starLimit; i++) {
					starString += '<div class="ratingFullHover"><img src="http://i.cdn.turner.com/toon/tools/img/pixel.gif" width="17" height="17" alt="" border="0"></div>';
				}
				extraStar = true;
				if ((tempNum > (roundedBase + .4)) && (tempNum < (roundedBase + .6))){
					starString += '<div class="ratingHalfHover"><img src="http://i.cdn.turner.com/toon/tools/img/pixel.gif" width="17" height="17" alt="" border="0"></div>';
					extraStar = false;
				}
//				if (document.rateForm) {
//					document.rateForm.rating_initial.value = tempNum;
//				}
				return starString;
			}
	// ===== parse times played =====
			function getTimesPlayedSearch (region, lookupFunc) {
				timesPlayed = parseInt(lookupFunc("{plays}"));
				if (isNaN(timesPlayed) == true) {
					foo = "";
				} else {
					foo = "PLAYERS: " + timesPlayed
				}
				return foo;
			}
			
	// ===== parse video views =====
			
			function getTimesViewedSearch (region, lookupFunc) {
				timesViewed = parseInt(lookupFunc("{views}"));
				return timesViewed;
			}

			function videoContextLinksNew (region, lookupFunc) {
				var urlString;
				var contextURL = lookupFunc("{@ctxPageURL}");
				if (contextURL == "") {
					urlString = "/video/index.html";
				} else {
					urlString = contextURL;
				}
				return urlString;
			}

			function videoContextLinksSearch (region, lookupFunc) {
				var urlString;
				var contextURL = lookupFunc("{ctxPageUrl}");
				if (contextURL == "") {
					urlString = "/video/index.html";
				} else {
					urlString = contextURL;
				}
				return urlString;
			}