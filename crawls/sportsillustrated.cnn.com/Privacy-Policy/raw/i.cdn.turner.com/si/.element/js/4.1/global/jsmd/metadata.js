try{
        siLog.group('siAnalytics');
} catch (e){
    
}

// still need to figure out how to use the CMS written variables (cnnPageInfo_section, cnnPageInfo_pageType) before going into the backup plan

/*
			document.cnnSwim11.section = "models";
			document.cnnSwim11.pagetype = "front";
			document.cnnSwim11.subsection = "shannan-click";
			document.cnnSwim11.foldername = "/2011_swimsuit/models/shannan-click/";
			document.cnnSwim11.filename = "index.html";
			cnn_omnitureData['pageType'] = '2011 Swimsuit - models';
			cnn_omnitureData['pageName'] = '2011 Swimsuit - models - shannan-click - index';
*/

var $hostname = window.location.host;
var $pathname = window.location.pathname;
var path_array = path_array || $pathname.split('/');
var $isWordpress = (typeof isWordpress !== 'undefined' || $hostname.indexOf('si.com') > -1 ) ? true : false;
var $isStatsHosted = (typeof $isStatsHosted !== 'undefined') ? $isStatsHosted : false;
var $is404Page = ( document.title.indexOf('404 Error Message') > -1 ) ? true : false;

var cnn_metadata = {
	"section": [ "other", "other" ],
	"content_type": "none",
	"template_type": ($is404Page) ? "error" : "other"
};

//var more_sports = ['cycling', ];


if ( $hostname === "sports.sportsillustrated.cnn.com" && $isStatsHosted ) {
	if ( ( $pathname ).match( /^\/cfl\/scoreboard\.asp/ ) ) {
		cnn_metadata.section = [ 'more sports', 'cfl' ];
		cnn_metadata.template_type = 'other:scoreboard';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/cricketfront\.asp/ ) ) {
		cnn_metadata.section = [ 'more sports', 'cricket' ];
		cnn_metadata.template_type = 'section front';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/racingfront\.asp/ ) ) {
		if(location.search.indexOf('Form1') != -1) {
			cnn_metadata.section = [ 'racing', 'formula one' ];
			cnn_metadata.template_type = 'section front';
			cnn_metadata.content_type = 'none';
              } else if(location.search.indexOf('IRL') != -1){
			cnn_metadata.section = [ 'racing', 'indycar' ];
			cnn_metadata.template_type = 'section front';
			cnn_metadata.content_type = 'none';
              } else if(location.search.indexOf('NASCAR') != -1){
			cnn_metadata.section = [ 'racing', 'nascar' ];
			cnn_metadata.template_type = 'section front';
			cnn_metadata.content_type = 'none';
              } else {
			cnn_metadata.section = [ 'racing', 'other' ];
			cnn_metadata.template_type = 'section front';
			cnn_metadata.content_type = 'none';
		}
	}
	else if ( ( $pathname ).match( /^\/soccerfront\.asp/ ) ) {
		cnn_metadata.section = [ 'soccer', '' ];
		cnn_metadata.template_type = 'section front';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/tennis\/rankings\.asp/ ) ) {
		if(location.search.indexOf('ATP') != -1) {
			cnn_metadata.section = [ 'tennis', 'ATP' ];
			cnn_metadata.template_type = 'other:standings';
			cnn_metadata.content_type = 'none';
              } else if(location.search.indexOf('WTA') != -1){
			cnn_metadata.section = [ 'tennis', 'WTA' ];
			cnn_metadata.template_type = 'other:standings';
			cnn_metadata.content_type = 'none';
              } else {
			cnn_metadata.section = [ 'tennis', 'other' ];
			cnn_metadata.template_type = 'other:standings';
			cnn_metadata.content_type = 'none';
		}
	}
	else if ( ( $pathname ).match( /^\/tennis\/schedule\.asp/ ) ) {
		if(location.search.indexOf('ATP') != -1) {
			cnn_metadata.section = [ 'tennis', 'ATP' ];
			cnn_metadata.template_type = 'other:schedules';
			cnn_metadata.content_type = 'none';
              } else if(location.search.indexOf('WTA') != -1){
			cnn_metadata.section = [ 'tennis', 'WTA' ];
			cnn_metadata.template_type = 'other:schedules';
			cnn_metadata.content_type = 'none';
              } else {
			cnn_metadata.section = [ 'tennis', 'other' ];
			cnn_metadata.template_type = 'other:schedules';
			cnn_metadata.content_type = 'none';
		}
	}
	else if ( ( $pathname ).match( /^\/tennis\/scoreboard\.asp/ ) ) {
		if(location.search.indexOf('ATP') != -1) {
			cnn_metadata.section = [ 'tennis', 'ATP' ];
			cnn_metadata.template_type = 'other:scoreboards';
			cnn_metadata.content_type = 'none';
              } else if(location.search.indexOf('WTA') != -1){
			cnn_metadata.section = [ 'tennis', 'WTA' ];
			cnn_metadata.template_type = 'other:scoreboards';
			cnn_metadata.content_type = 'none';
              } else {
			cnn_metadata.section = [ 'tennis', 'other' ];
			cnn_metadata.template_type = 'other:scoreboards';
			cnn_metadata.content_type = 'none';
		}
	}
	else if ( ( $pathname ).match( /^\/tennisfront\.asp/ ) ) {
		if(location.search.indexOf('ATP') != -1) {
			cnn_metadata.section = [ 'tennis', 'ATP' ];
			cnn_metadata.template_type = 'section front';
			cnn_metadata.content_type = 'none';
              } else if(location.search.indexOf('WTA') != -1){
			cnn_metadata.section = [ 'tennis', 'WTA' ];
			cnn_metadata.template_type = 'section front';
			cnn_metadata.content_type = 'none';
              } else {
			cnn_metadata.section = [ 'tennis', 'other' ];
			cnn_metadata.template_type = 'section front';
			cnn_metadata.content_type = 'none';
		}
	}
	else if ( ( $pathname ).match( /^\/wcbkfront\.asp/ ) ) {
		cnn_metadata.section = [ 'more sports', 'women\'s college basketball' ];
		cnn_metadata.template_type = 'section front';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/wnbafront\.asp/ ) ) {
		cnn_metadata.section = [ 'more sports', 'wnba' ];
		cnn_metadata.template_type = 'section front';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /story\.asp/ ) ){
		var stats_subsxn = (path_array[0] === 'wcbk') ? 'women\'s college basketball' : path_array[0];
		cnn_metadata.section = ['more sports', stats_subsxn];
		cnn_metadata.template_type = 'content';
		cnn_metadata.content_type = 'article read';
	}
} /*else if ($hostname.indexOf('apps.facebook.com') > 0) { 
		cnn_metadata.section = [ 'commissioner game', 'home' ]; 
		cnn_metadata.template_type = 'app'; 
		cnn_metadata.content_type = 'none'; 
}*/ else if ( ($hostname.indexOf('.si.com') > 0) || ($isWordpress) || $hostname.indexOf('si-apps') > 0 ) {
		var blogHostArray = $hostname.split(".");
		var blogName = blogHostArray[0];
		cnn_metadata.section = [ 'blogs', blogName ];
		cnn_metadata.template_type = 'blog';
		cnn_metadata.content_type = 'blog read';
} else if ( $hostname === 'www.twackle.com' ) {
		cnn_metadata.section = [ 'twackle', ''];
		cnn_metadata.template_type = 'other: twackle';
		cnn_metadata.content_type = 'none';
		
		if ( $pathname !== '/' ){
			var _twackle_section = $pathname.substring(1).toLowerCase();
			cnn_metadata.section = [ 'twackle', _twackle_section ];
		}
		
} else {
	
	var $isHomepage = ( path_array[ path_array.length - 2] === '' && path_array[ path_array.length - 1 ] === 'index.html');
	//var $isHomepage = ( jQuery('link[rel=canonical]').attr('href') === "http://sportsillustrated.cnn.com/" );
	if ( $pathname === '/' || $pathname === '/index.html' || $isHomepage ) {
		cnn_metadata.section = [ 'index', 'home' ];
		cnn_metadata.template_type = 'index';
		cnn_metadata.content_type = 'none';
	} else if ( ( $pathname ).match( /^\/\d{4}\/mma\/schedule\.results\// ) ) {
		cnn_metadata.section = [ 'mma & boxing', 'mma schedules and results' ];
		cnn_metadata.template_type = 'other:schedules';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/\d{4}\/mma\/boxing\/schedule\// ) ) {
		cnn_metadata.section = [ 'mma & boxing', 'boxing schedules and results' ];
		cnn_metadata.template_type = 'other:schedules';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/[0-9]{4}\/morning-jolt\// ) ) {
		cnn_metadata.section = [ 'morning-jolt', 'articles' ];
		cnn_metadata.template_type = 'blog';
		cnn_metadata.content_type = 'blog read';
	}	
	else if ( ( $pathname ).match( /^\/preview\/siexclusive\/[0-9]{4}\/pr\/subs\/siexclusive/ ) ) {
		cnn_metadata.section = [ 'siexclusive', 'articles' ];
		cnn_metadata.template_type = 'content';
		cnn_metadata.content_type = 'article read';
	}	
	/* Needed to add an additional condition to ensure that Extra Mustard gets excluded */
	else if ($pathname.match(/^\/[0-9]{4}\//) && !$pathname.match(/^\/[0-9]{4}\/extramustard\//)) {
		cnn_metadata.template_type = 'content';
		cnn_metadata.content_type = 'article read';
		/* Removed because this is not how the channel and sub-section variables should be formatted.
		if ( typeof( cnnPageInfo_section ) !== "undefined" ) {
			cnn_metadata.section = cnnPageInfo_section;
		} else {
		*/
		/**/ if ( ( $pathname ).match( /^\/[0-9]{4}\/baseball\/mlb\// ) ){				cnn_metadata.section = [ "mlb","articles" ];}
		else if ( ( $pathname ).match( /^\/[0-9]{4}\/basketball\/ncaa\// ) ){			cnn_metadata.section = [ "college basketball","articles" ];}
		else if ( ( $pathname ).match( /^\/[0-9]{4}\/basketball\/nba\// ) ){			cnn_metadata.section = [ "nba","articles" ];}
		//else if ( ( $pathname ).match( /^\/[0-9]{4}\/extramustard\// ) ){			cnn_metadata.section = [ "extramustard","articles" ];}
		else if ( ( $pathname ).match( /^\/[0-9]{4}\/fantasy\// ) ){				cnn_metadata.section = [ "fantasy","articles" ];}
		else if ( ( $pathname ).match( /^\/[0-9]{4}\/football\/ncaa\// ) ){			cnn_metadata.section = [ "college football","articles" ];}
		else if ( ( $pathname ).match( /^\/[0-9]{4}\/football\/nfl\// ) ){				cnn_metadata.section = [ "nfl","articles" ];}
		else if ( ( $pathname ).match( /^\/[0-9]{4}\/highschool\// ) ){				cnn_metadata.section = [ "high school","news" ];}
		else if ( ( $pathname ).match( /^\/[0-9]{4}\/hockey\/nhl\// ) ){				cnn_metadata.section = [ "nhl","articles" ];}
		else if ( ( $pathname ).match( /^\/[0-9]{4}\/magazine\// ) ){				cnn_metadata.section = [ "magazine","news" ];}
		else if ( ( $pathname ).match( /^\/[0-9]{4}\/magazine\/sportsman\// ) ){			cnn_metadata.section = [ "sportsman","news" ];}
		else if ( ( $pathname ).match( /^\/[0-9]{4}\/magazine\/specials\/sportsman\// ) ){			cnn_metadata.section = [ "sportsman","news" ];}
		else if ( ( $pathname ).match( /^\/[0-9]{4}\/mma\// ) ){					cnn_metadata.section = [ "mma & boxing","articles" ];}
		else if ( ( $pathname ).match( /^\/[0-9]{4}\/olympics\/2012\/writers\// ) ){				
			cnn_metadata.section = [ "writers","articles" ];
			var columnName = ( typeof cnnPageInfo_branding !== 'undefined' ) ? cnnPageInfo_branding :
					 ( typeof document.cnnBranding !== 'undefined' ) ? document.cnnBranding.replace(/[\.|_]/g, ' ') : '~';
			var articleTitle = ( typeof cnnShare !== 'undefined' ) ? cnnShare.t2 :
					   ( document.getElementsByTagName('h1') !== null ) ? document.getElementsByTagName('h1')[0].innerHTML : '~';
			cnn_metadata.column = {
				name: columnName,
				title: articleTitle,
				writer: path_array[4].replace('_', ' ')
			};
		}
		else if ( ( $pathname ).match( /^\/[0-9]{4}\/olympics\/2012\// ) ){					cnn_metadata.section = [ "olympics2012","articles" ];}
		else if ( ( $pathname ).match( /^\/[0-9]{4}\/more\// ) ||
				( $pathname ).match( /^\/[0-9]{4}\/cycling\// ) ||
				( $pathname ).match( /^\/[0-9]{4}\/horse_racing\// ) ||
				( $pathname ).match( /^\/[0-9]{4}\/figure_skating\// ) ||
				( $pathname ).match( /^\/[0-9]{4}\/olympics\// ) ||
				( $pathname ).match( /^\/[0-9]{4}\/track_field\// )){			
					var subsxn = (path_array[1] === 'track_field') ? 'track & field' : path_array[1].replace('_', ' ');
					cnn_metadata.section = [ "more sports", subsxn ];
		}
		else if ( ( $pathname ).match( /^\/[0-9]{4}\/racing\// ) ){				cnn_metadata.section = [ "racing","articles" ];}
		else if ( ( $pathname ).match( /^\/[0-9]{4}\/soccer\// ) ){				cnn_metadata.section = [ "soccer","articles" ];}
		else if ( ( $pathname ).match( /^\/[0-9]{4}\/tennis\// ) ){				cnn_metadata.section = [ "tennis","articles" ];}
		else if ( ( $pathname ).match( /^\/[0-9]{4}\/writers\// ) ){				
			cnn_metadata.section = [ "writers","articles" ];
			var columnName = ( typeof cnnPageInfo_branding !== 'undefined' ) ? cnnPageInfo_branding :
					 ( typeof document.cnnBranding !== 'undefined' ) ? document.cnnBranding.replace(/[\.|_]/g, ' ') : '~';
			var articleTitle = ( typeof cnnShare !== 'undefined' ) ? cnnShare.t2 :
					   ( document.getElementsByTagName('h1') !== null ) ? document.getElementsByTagName('h1')[0].innerHTML : '~';
			cnn_metadata.column = {
				name: columnName,
				title: articleTitle,
				writer: path_array[2].replace('_', ' ')
			};
		}
		else {	cnn_metadata.section = [ "other","other" ]; }
		//}
	}
	else if ( ( $pathname ).match( /^\/players\// ) ) {
		cnn_metadata.section = [ 'other', 'players' ];
		cnn_metadata.template_type = 'other:players';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/baseball\/mlb\/players\// ) ) {
		cnn_metadata.section = [ 'mlb', 'players' ];
		cnn_metadata.template_type = 'other:players';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/baseball\/mlb\/rosters\// ) ) {
		cnn_metadata.section = [ 'mlb', 'players' ];
		cnn_metadata.template_type = 'other:players';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/baseball\/mlb\/schedules\// ) ) {
		cnn_metadata.section = [ 'mlb', 'schedules' ];
		cnn_metadata.template_type = 'other:schedules';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/baseball\/mlb\/scoreboards\// ) ) {
		cnn_metadata.section = [ 'mlb', 'scoreboards' ];
		cnn_metadata.template_type = 'other:scoreboards';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/baseball\/mlb\/standings\// ) ) {
		cnn_metadata.section = [ 'mlb', 'standings' ];
		cnn_metadata.template_type = 'other:standings';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/baseball\/mlb\/stats\// ) ) {
		cnn_metadata.section = [ 'mlb', 'stats' ];
		cnn_metadata.template_type = 'other:stats';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/baseball\/mlb\/teams\// ) ) {
		cnn_metadata.section = [ 'mlb', 'teams' ];
		cnn_metadata.template_type = 'other:teams';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/baseball\/mlb\/world-series/ ) ) {
		cnn_metadata.section = [ 'mlb', 'world series' ];
		cnn_metadata.template_type = 'other:championship';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/baseball\/mlb\/probables/ ) ) {
		cnn_metadata.section = [ 'mlb', 'probables' ];
		cnn_metadata.template_type = 'other:probables';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/baseball\/mlb\/salaries/ ) ) {
		cnn_metadata.section = [ 'mlb', 'salaries' ];
		cnn_metadata.template_type = 'other:salaries';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/baseball\/mlb\/specials/ ) ) {
		cnn_metadata.section = [ 'mlb', 'specials' ];
		cnn_metadata.template_type = 'other:specials';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/baseball\/mlb\/(gameflash|boxscores|previews|recaps)/ ) ) {
		cnn_metadata.section = [ 'mlb', 'gameflash' ];
		cnn_metadata.template_type = 'other:gameflash';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/baseball\/mlb\// ) ) {
		cnn_metadata.section = [ 'mlb', 'home' ];
		if ( typeof( cnnPageInfo_pageType ) !== "undefined" ) {
			if ( cnnPageInfo_pageType === 'section' ) {
				cnn_metadata.template_type = 'section front';
				cnn_metadata.content_type = 'none';
			} else {
				cnn_metadata.section = [ 'mlb', 'other' ];
				cnn_metadata.template_type = 'other';
				cnn_metadata.content_type = 'none';
			}
		} else {
			cnn_metadata.template_type = 'other';
			cnn_metadata.content_type = 'none';
		}
	}
	else if ( ( $pathname ).match( /^\/basketball\/\d{4}|nba\/draft\// ) ) {
		cnn_metadata.section = [ 'nba', 'draft' ];
		cnn_metadata.template_type = ( ( $pathname ).match( /^\/basketball\/nba\/draft/ ) ) ? 'section front': 'other:draft';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/basketball\/nba\/draft\-\d{4}\// ) ) {
		cnn_metadata.section = [ 'nba', 'draft' ];
		cnn_metadata.content_type = 'none';
		if ( typeof( cnnPageInfo_pageType ) !== "undefined" ) {
			if ( cnnPageInfo_pageType === 'section' ) {
				cnn_metadata.template_type = 'section front';
			} else {
				cnn_metadata.template_type = 'other:draft';
			}
		} else {
			cnn_metadata.template_type = 'other';
		}
	}
	else if ( ( $pathname ).match( /^\/basketball\/nba\/players\// ) ) {
		cnn_metadata.section = [ 'nba', 'players' ];
		cnn_metadata.template_type = 'other:players';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/basketball\/nba\/rosters\// ) ) {
		cnn_metadata.section = [ 'nba', 'players' ];
		cnn_metadata.template_type = 'other:players';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/basketball\/nba\/schedules\// ) ) {
		cnn_metadata.section = [ 'nba', 'schedules' ];
		cnn_metadata.template_type = 'other:schedules';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/basketball\/nba\/scoreboards\// ) ) {
		cnn_metadata.section = [ 'nba', 'scoreboards' ];
		cnn_metadata.template_type = 'other:scoreboards';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/basketball\/nba\/standings\// ) ) {
		cnn_metadata.section = [ 'nba', 'standings' ];
		cnn_metadata.template_type = 'other:standings';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/basketball\/nba\/stats\// ) ) {
		cnn_metadata.section = [ 'nba', 'stats' ];
		cnn_metadata.template_type = 'other:stats';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/basketball\/nba\/teams\// ) ) {
		cnn_metadata.section = [ 'nba', 'teams' ];
		cnn_metadata.template_type = 'other:teams';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/basketball\/nba\/salaries/ ) ) {
		cnn_metadata.section = [ 'nba', 'salaries' ];
		cnn_metadata.template_type = 'other:salaries';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/basketball\/nba\/specials/ ) ) {
		cnn_metadata.section = [ 'nba', 'specials' ];
		cnn_metadata.template_type = 'other:specials';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/basketball\/nba\/(gameflash|boxscores|previews|recaps)/ ) ) {
		cnn_metadata.section = [ 'nba', 'gameflash' ];
		cnn_metadata.template_type = 'other:gameflash';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/basketball\/nba\// ) ) {
		cnn_metadata.section = [ 'nba', 'home' ];
		if ( typeof( cnnPageInfo_pageType ) !== "undefined" ) {
			if ( cnnPageInfo_pageType === 'section' ) {
				cnn_metadata.template_type = 'section front';
				cnn_metadata.content_type = 'none';
			} else {
				cnn_metadata.section = [ 'nba', 'other' ];
				cnn_metadata.template_type = 'other';
				cnn_metadata.content_type = 'none';
			}
		} else {
			cnn_metadata.template_type = 'other';
			cnn_metadata.content_type = 'none';
		}
	}
	else if ( ( $pathname ).match( /^\/basketball\/ncaa\/men\/players\// ) ) {
		cnn_metadata.section = [ 'college basketball', 'players' ];
		cnn_metadata.template_type = 'other:players';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/basketball\/ncaa\/men\/polls\// ) ) {
		cnn_metadata.section = [ 'college basketball', 'rankings' ];
		cnn_metadata.template_type = 'other:rankings';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/basketball\/(ncaa|college)\/men\/rosters\// ) ) {
		cnn_metadata.section = [ 'college basketball', 'players' ];
		cnn_metadata.template_type = 'other:players';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/basketball\/ncaa\/men\/schedules\// ) ) {
		cnn_metadata.section = [ 'college basketball', 'schedules' ];
		cnn_metadata.template_type = 'other:schedules';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/basketball\/ncaa\/men\/scoreboards\// ) ) {
		cnn_metadata.section = [ 'college basketball', 'scoreboards' ];
		cnn_metadata.template_type = 'other:scoreboards';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/basketball\/ncaa\/men\/stats\// ) ) {
		cnn_metadata.section = [ 'college basketball', 'players' ];
		cnn_metadata.template_type = 'other:players';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/basketball\/ncaa\/men\/teams\// ) ) {
		cnn_metadata.section = [ 'college basketball', 'teams' ];
		cnn_metadata.template_type = 'other:teams';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/basketball\/ncaa\/mens-tournament/ ) ) {
		cnn_metadata.section = [ 'college basketball', 'mens tournament' ];
		cnn_metadata.template_type = 'other:championship';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/basketball\/ncaa\/specials/ ) ) {
		cnn_metadata.section = [ 'college basketball', 'specials' ];
		cnn_metadata.template_type = 'other:specials';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/basketball\/ncaa\/(gameflash|boxscores|previews|recaps)/ ) ) {
		cnn_metadata.section = [ 'college basketball', 'gameflash' ];
		cnn_metadata.template_type = 'other:gameflash';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/basketball\/ncaa\/seth-davis\/build-a-better-bracket\// ) ||
			  ( $pathname ).match( /^\/basketball\/ncaa\/seth-davis\/ncaa-tournament-breakdown\// ) ) {
			  
		cnn_metadata.section = [ 'college basketball', 'seth-davis' ];
		cnn_metadata.template_type = 'video';
		cnn_metadata.content_type = 'none';		
	}
  	else if ( ( $pathname ).match( /^\/basketball\/ncaa\/seth-davis\/fastbreakflavor\// ) ||
                          ( $pathname ).match( /^\/basketball\/ncaa\/seth-davis\/ncaa-tournament-breakdown\// ) ) {

                cnn_metadata.section = [ 'college basketball', 'seth-davis' ];
                cnn_metadata.template_type = 'video';
                cnn_metadata.content_type = 'none';
        }
	else if ( ( $pathname ).match( /^\/basketball\/ncaa\/men\/conferences\// ) ) {
		cnn_metadata.section = [ 'college basketball', 'conferences' ];
		cnn_metadata.template_type = 'other:teams';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/basketball\/ncaa\// ) ) {
		cnn_metadata.section = [ 'college basketball', 'home' ];
		if ( typeof( cnnPageInfo_pageType ) !== "undefined" ) {
			if ( cnnPageInfo_pageType === 'section' ) {
				cnn_metadata.template_type = 'section front';
				cnn_metadata.content_type = 'none';
			} else {
				cnn_metadata.section = [ 'college basketball', 'other' ];
				cnn_metadata.template_type = 'other';
				cnn_metadata.content_type = 'none';
			}
		} else {
			cnn_metadata.template_type = 'other';
			cnn_metadata.content_type = 'none';
		}
	}
	else if ( ( $pathname ).match( /^\/cycling\/wires\// ) ) {
		cnn_metadata.section = [ 'more sports', 'cycling' ];
		cnn_metadata.template_type = 'other';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /\/extramustard\// ) ) {
		if ($pathname.substring(1).split("/").length > 2){
			cnn_metadata.section = [ 'extramustard','articles'];
		} else {
			cnn_metadata.section = [ 'extramustard', 'home' ];
		}
		if ( typeof( cnnPageInfo_pageType ) !== "undefined" ) {
			cnn_metadata.template_type = 'blog';
			cnn_metadata.content_type = 'blog read';
		} else {
			cnn_metadata.template_type = 'other';
			cnn_metadata.content_type = 'none';
		}
	}
	else if ( ( $pathname ).match( /^\/fantasy\// ) ) {
		if ( typeof( cnnPageInfo_pageType ) !== "undefined" ) {
			if ( cnnPageInfo_pageType === 'section' ) {
				cnn_metadata.section = [ 'fantasy', 'home' ];
				cnn_metadata.template_type = 'section front';
				cnn_metadata.content_type = 'none';
			/* The following code was added because the cnnPageInfo_pageType variable exists on interior pages of the fantasy section */
			} else if (cnnPageInfo_pageType === 'story') {
				cnn_metadata.section = [ 'fantasy', 'news' ];
				cnn_metadata.template_type = 'content';
				cnn_metadata.content_type = 'article read';
			} else {
				cnn_metadata.template_type = 'other';
				cnn_metadata.content_type = 'none';
			}
		/* Had to add additional code because cnnPageInfo_pageType is not defined on the fantasy homepage */
		} else if ($pathname.substring(1).split("/").length <= 2) {
			cnn_metadata.section = [ 'fantasy', 'home' ];
			cnn_metadata.template_type = 'section front';
			cnn_metadata.content_type = 'none';
		/* The following code was left in place as a failsafe in case the cnnPageInfo_pageType variable ends up undefined on interior fantasy pages */
		} else if ($pathname.substring(1).split("/").length > 2) {
			cnn_metadata.section = [ 'fantasy', 'news' ];
			cnn_metadata.template_type = 'content';
			cnn_metadata.content_type = 'article read';
		} else {
			cnn_metadata.template_type = 'other';
			cnn_metadata.content_type = 'none';
		}
	}
	else if ( ( $pathname ).match( /^\/figure_skating\/wires\// ) ) {
		cnn_metadata.section = [ 'more sports', 'figure skating' ];
		cnn_metadata.template_type = 'other';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/football\/ncaa\/conferences\// ) ) {
		cnn_metadata.section = [ 'college football', 'conferences' ];
		cnn_metadata.template_type = 'other:teams';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/football\/ncaa\/polls\// ) ) {
		cnn_metadata.section = [ 'college football', 'rankings' ];
		cnn_metadata.template_type = 'other:rankings';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/football\/(ncaa|college)\/rosters\// ) ) {
		cnn_metadata.section = [ 'college football', 'players' ];
		cnn_metadata.template_type = 'other:players';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/football\/ncaa\/schedules\// ) ) {
		cnn_metadata.section = [ 'college football', 'schedules' ];
		cnn_metadata.template_type = 'other:schedules';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/football\/ncaa\/scoreboards\// ) ) {
		cnn_metadata.section = [ 'college football', 'scoreboards' ];
		cnn_metadata.template_type = 'other:scoreboards';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/football\/ncaa\/standings\// ) ) {
		cnn_metadata.section = [ 'college football', 'standings' ];
		cnn_metadata.template_type = 'other:standings';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/football\/ncaa\/stats\// ) ) {
		cnn_metadata.section = [ 'college football', 'stats' ];
		cnn_metadata.template_type = 'other:stats';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/football\/ncaa\/teams\// ) ) {
		cnn_metadata.section = [ 'college football', 'teams' ];
		cnn_metadata.template_type = 'other:teams';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/football\/ncaa\/specials\// ) ) {
		cnn_metadata.section = [ 'college football', 'specials' ];
		cnn_metadata.template_type = 'other:specials';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/football\/ncaa\/(gameflash|boxscores|previews|recaps)/ ) ) {
		cnn_metadata.section = [ 'college football', 'gameflash' ];
		cnn_metadata.template_type = 'other:gameflash';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/football\/ncaa\// ) ) {
		cnn_metadata.section = [ 'college football', 'home' ];
		if ( typeof( cnnPageInfo_pageType ) !== "undefined" ) {
			if ( cnnPageInfo_pageType === 'section' ) {
				cnn_metadata.template_type = 'section front';
				cnn_metadata.content_type = 'none';
			} else {
				cnn_metadata.section = [ 'college football', 'other' ];
				cnn_metadata.template_type = 'other';
				cnn_metadata.content_type = 'none';
			}
		} else {
			cnn_metadata.template_type = 'other';
			cnn_metadata.content_type = 'none';
		}
	}
	else if ( ( $pathname ).match( /^\/football\/nfl|\d{4}\/draft\// ) ) {
		cnn_metadata.section = [ 'nfl', 'draft' ];
		cnn_metadata.template_type = ( ( $pathname ).match( /^\/football\/nfl\/draft/ ) ) ? 'section front': 'other:draft';
		cnn_metadata.content_type = 'none';
		if ( ($pathname).match(/popup/) ){
			cnn_metadata.section = [ 'nfl', 'draft tracker' ];
		}
	}
	else if ( ( $pathname ).match( /^\/football\/nfl\/players\// ) ) {
		cnn_metadata.section = [ 'nfl', 'players' ];
		cnn_metadata.template_type = 'other:players';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/football\/nfl\/rosters\// ) ) {
		cnn_metadata.section = [ 'nfl', 'players' ];
		cnn_metadata.template_type = 'other:players';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/football\/nfl\/schedules\// ) ) {
		cnn_metadata.section = [ 'nfl', 'schedules' ];
		cnn_metadata.template_type = 'other:schedules';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/football\/nfl\/scoreboards\// ) ) {
		cnn_metadata.section = [ 'nfl', 'scoreboards' ];
		cnn_metadata.template_type = 'other:scoreboards';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/football\/nfl\/standings\// ) ) {
		cnn_metadata.section = [ 'nfl', 'standings' ];
		cnn_metadata.template_type = 'other:standings';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/football\/nfl\/stats\// ) ) {
		cnn_metadata.section = [ 'nfl', 'stats' ];
		cnn_metadata.template_type = 'other:stats';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/football\/nfl\/super-bowl/ ) ) {
		cnn_metadata.section = [ 'nfl', 'super bowl' ];
		cnn_metadata.template_type = 'other:championship';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/football\/nfl\/teams\// ) ) {
		cnn_metadata.section = [ 'nfl', 'teams' ];
		cnn_metadata.template_type = 'other:teams';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/football\/nfl\/salaries/ ) ) {
		cnn_metadata.section = [ 'nfl', 'salaries' ];
		cnn_metadata.template_type = 'other:salaries';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/football\/nfl\/specials/ ) ) {
		cnn_metadata.section = [ 'nfl', 'specials' ];
		cnn_metadata.template_type = 'other:specials';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/football\/nfl\/(gameflash|boxscores|previews|recaps)/ ) ) {
		cnn_metadata.section = [ 'nfl', 'gameflash' ];
		cnn_metadata.template_type = 'other:gameflash';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/football\/nfl\// ) ) {
		cnn_metadata.section = [ 'nfl', 'home' ];
		if ( typeof( cnnPageInfo_pageType ) !== "undefined" ) {
			if ( cnnPageInfo_pageType === 'section' ) {
				cnn_metadata.template_type = 'section front';
				cnn_metadata.content_type = 'none';
			} else {
				cnn_metadata.section = [ 'nfl', 'other' ];
				cnn_metadata.template_type = 'other';
				cnn_metadata.content_type = 'none';
			}
		} else {
			cnn_metadata.template_type = 'other';
			cnn_metadata.content_type = 'none';
		}
	}
	else if ( ( $pathname ).match( /^\/highschool\// ) ) {
		cnn_metadata.section = [ 'high school', 'home' ];
		if ( typeof( cnnPageInfo_pageType ) !== "undefined" ) {
			if ( cnnPageInfo_pageType === 'section' ) {
				cnn_metadata.template_type = 'section front';
				cnn_metadata.content_type = 'none';
			} else {
				cnn_metadata.template_type = 'other';
				cnn_metadata.content_type = 'none';
			}
		} else {
			cnn_metadata.template_type = 'other';
			cnn_metadata.content_type = 'none';
		}
	}
	else if ( ( $pathname ).match( /^\/hockey\/nhl\/players\// ) ) {
		cnn_metadata.section = [ 'nhl', 'players' ];
		cnn_metadata.template_type = 'other:players';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/hockey\/nhl\/rosters\// ) ) {
		cnn_metadata.section = [ 'nhl', 'players' ];
		cnn_metadata.template_type = 'other:players';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/hockey\/nhl\/schedules\// ) ) {
		cnn_metadata.section = [ 'nhl', 'schedules' ];
		cnn_metadata.template_type = 'other:schedules';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/hockey\/nhl\/scoreboards\// ) ) {
		cnn_metadata.section = [ 'nhl', 'scoreboards' ];
		cnn_metadata.template_type = 'other:scoreboards';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/hockey\/nhl\/standings\// ) ) {
		cnn_metadata.section = [ 'nhl', 'standings' ];
		cnn_metadata.template_type = 'other:standings';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/hockey\/nhl\/stanley-cup/ ) ) {
		cnn_metadata.section = [ 'nhl', 'stanley cup' ];
		cnn_metadata.template_type = 'other:championship';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/hockey\/nhl\/stats\// ) ) {
		cnn_metadata.section = [ 'nhl', 'stats' ];
		cnn_metadata.template_type = 'other:stats';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/hockey\/nhl\/teams\// ) ) {
		cnn_metadata.section = [ 'nhl', 'teams' ];
		cnn_metadata.template_type = 'other:teams';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/hockey\/nhl\/salaries\// ) ) {
		cnn_metadata.section = [ 'nhl', 'salaries' ];
		cnn_metadata.template_type = 'other:salaries';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/hockey\/nhl\/specials\// ) ) {
		cnn_metadata.section = [ 'nhl', 'specials' ];
		cnn_metadata.template_type = 'other:specials';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/hockey\/nhl\/(gameflash|boxscores|previews|recaps)/ ) ) {
		cnn_metadata.section = [ 'nhl', 'gameflash' ];
		cnn_metadata.template_type = 'other:gameflash';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/hockey\/nhl\// ) ) {
		cnn_metadata.section = [ 'nhl', 'home' ];
		if ( typeof( cnnPageInfo_pageType ) !== "undefined" ) {
			if ( cnnPageInfo_pageType === 'section' ) {
				cnn_metadata.template_type = 'section front';
				cnn_metadata.content_type = 'none';
			} else {
				cnn_metadata.section = [ 'nhl', 'other' ];
				cnn_metadata.template_type = 'other';
				cnn_metadata.content_type = 'none';
			}
		} else {
			cnn_metadata.template_type = 'other';
			cnn_metadata.content_type = 'none';
		}
	}
	else if ( ( $pathname ).match( /^\/golf\/pga\/\d{4}\/stats\// ) ) {
		cnn_metadata.section = [ 'golf', 'stats' ];
		cnn_metadata.template_type = 'other:stats';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/golf\/\d{4}\/players\// ) ) {
		cnn_metadata.section = [ 'golf', 'players' ];
		cnn_metadata.template_type = 'other:players';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/racing\/drivers\/\d{4}\// ) ) {
		cnn_metadata.section = [ 'racing', 'players' ];
		cnn_metadata.template_type = 'other:players';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/racing\/standings/ ) ) {
		cnn_metadata.section = [ 'racing', 'standings' ];
		cnn_metadata.template_type = 'other:standings';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/scorecard\/archive/ ) ) {
		cnn_metadata.section = [ 'newsletter', 'newsletter' ];
		cnn_metadata.template_type = 'other:newsletter';
		cnn_metadata.content_type = 'newsletter';
	}
	else if ( ( $pathname ).match( /^\/horse_racing\/wires\// ) ) {
		cnn_metadata.section = [ 'more sports', 'horse racing' ];
		cnn_metadata.template_type = 'other';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/magazine\/sportsman\// ) ) {
		cnn_metadata.section = [ 'sportsman', 'home' ];
		if ( typeof( cnnPageInfo_pageType ) !== "undefined" ) {
			if ( cnnPageInfo_pageType === 'section' ) {
				cnn_metadata.template_type = 'section front';
				cnn_metadata.content_type = 'none';
			} else {
				cnn_metadata.template_type = 'other';
				cnn_metadata.content_type = 'none';
			}
		} else {
			cnn_metadata.template_type = 'other';
			cnn_metadata.content_type = 'none';
		}
	}
	else if ( ( $pathname ).match( /^\/magazine\// ) ) {
		cnn_metadata.section = [ 'magazine', 'home' ];
		if ( typeof( cnnPageInfo_pageType ) !== "undefined" ) {
			if ( cnnPageInfo_pageType === 'section' ) {
				cnn_metadata.template_type = 'section front';
				cnn_metadata.content_type = 'none';
			} else {
				cnn_metadata.template_type = 'other';
				cnn_metadata.content_type = 'none';
			}
		} else {
			cnn_metadata.template_type = 'other';
			cnn_metadata.content_type = 'none';
		}
	}
	else if ( ( $pathname ).match( /^\/mma\// ) ) {
		cnn_metadata.section = [ 'mma & boxing', 'home' ];
		if ( typeof( cnnPageInfo_pageType ) !== "undefined" ) {
			if ( cnnPageInfo_pageType === 'section' ) {
				cnn_metadata.template_type = 'section front';
				cnn_metadata.content_type = 'none';
			} else {
				cnn_metadata.template_type = 'other';
				cnn_metadata.content_type = 'none';
			}
		} else {
			cnn_metadata.template_type = 'other';
			cnn_metadata.content_type = 'none';
		}
	}
	else if ( ( $pathname ).match( /^\/more\// ) ) {
		cnn_metadata.section = [ 'more sports', 'home' ];
		if ( typeof( cnnPageInfo_pageType ) !== "undefined" ) {
			if ( cnnPageInfo_pageType === 'section' ) {
				cnn_metadata.template_type = 'section front';
				cnn_metadata.content_type = 'none';
			} else {
				cnn_metadata.section = [ 'more sports', 'other' ];
				cnn_metadata.template_type = 'other';
				cnn_metadata.content_type = 'none';
			}
		} else {
			cnn_metadata.section = [ 'more sports', 'other' ];
			cnn_metadata.template_type = 'other';
			cnn_metadata.content_type = 'none';
		}
	}
	else if ( ( $pathname ).match( /^\/multimedia\/photo_gallery\// ) ) {
		//cnn_metadata.section = [ 'si photos', 'photo gallery' ];
		if ( typeof( cnnPageInfo_pageType ) !== "undefined" ) {
			if ( cnnPageInfo_pageType === 'section' ) {				
				cnn_metadata.section = [ 'si photos', 'photo gallery' ];
				cnn_metadata.template_type = 'section front';
				cnn_metadata.content_type = 'none';
			} else if ( adFactory.zone == 'olympics/photos' ) {
				var galleryWrapper = document.getElementById("photoContainer");
				var galleryContainer = (galleryWrapper !== null) ? galleryWrapper.getElementsByTagName("h1") : 
									   ( document.getElementsByClassName('cnnGalleryImgHdr').length > 0 ) ? document.getElementsByClassName('cnnGalleryImgHdr') :
									   ( document.getElementsByClassName('title').length > 0 ) ? document.getElementsByClassName('title') : [];
				var galleryName = ( galleryContainer.length > 0 ) ? galleryContainer[0].innerHTML : '';//document.title.replace('SI.com - Photo Gallery - ', '');

				cnn_metadata.section = [ 'olympics2012', 'photos:' + galleryName.toLowerCase() ];
				cnn_metadata.template_type = 'other:photo gallery';
				cnn_metadata.content_type = 'none';
			} else {
				var galleryWrapper = document.getElementById("primeCont");
				var galleryContainer = (galleryWrapper !== null) ? galleryWrapper.getElementsByTagName("h1") : 
					   ( document.getElementsByClassName('cnnGalleryImgHdr').length > 0 ) ? document.getElementsByClassName('cnnGalleryImgHdr') :
					   ( document.getElementsByClassName('title').length > 0 ) ? document.getElementsByClassName('title') : [];
				var galleryName = ( galleryContainer.length > 0 ) ? galleryContainer[0].innerHTML : '';//document.title.replace('SI.com - Photo Gallery - ', '');
				cnn_metadata.section = [ 'si photos', 'photo gallery:' + galleryName.toLowerCase() ];
				cnn_metadata.template_type = 'other:photo gallery';
				cnn_metadata.content_type = 'none';
			}
		/* Had to add additional code to determine these values because cnnPageInfo_pageType is undefined on these pages */
		} else if ($pathname.substring(1).split("/").length <= 3){
			cnn_metadata.section = [ 'si photos', 'photo gallery' ];
			cnn_metadata.template_type = 'section front';
			cnn_metadata.content_type = 'none';
		} else if ($pathname.substring(1).split("/").length > 3) {
			/* Note: Makes use of the DOM object to obtain the gallery name */
			var galleryWrapper = document.getElementById("primeCont");
			var galleryContainer = (galleryWrapper !== null) ? galleryWrapper.getElementsByTagName("h1") : 
								   ( document.getElementsByClassName('cnnGalleryImgHdr').length > 0 ) ? document.getElementsByClassName('cnnGalleryImgHdr') :
								   ( document.getElementsByClassName('title').length > 0 ) ? document.getElementsByClassName('title') : [];
			var galleryName = ( galleryContainer.length > 0 ) ? galleryContainer[0].innerHTML : '';//document.title.replace('SI.com - Photo Gallery - ', '');
			cnn_metadata.section = [ 'si photos', galleryName ];
			cnn_metadata.template_type = 'other:photo gallery';
			cnn_metadata.content_type = 'none';
		} else {
			cnn_metadata.section = [ 'si photos', 'other' ];
			cnn_metadata.template_type = 'other';
			cnn_metadata.content_type = 'none';
		}
	}
	else if ( ( $pathname ).match( /^\/olympics\/2012\// ) ) {
		cnn_metadata.section = [ 'olympics2012', 'other' ];
		cnn_metadata.template_type = 'other';
		cnn_metadata.content_type = 'none';
		
		if ( typeof( cnnPageInfo_pageType ) !== "undefined" ) {
			if ( cnnPageInfo_pageType === 'section' ) {
				cnn_metadata.section = [ 'olympics2012', 'home' ];
				cnn_metadata.template_type = 'section front';
			}
		}

		if( $pathname.match(/^\/olympics\/2012\/sports/) || $pathname.match(/^\/olympics\/2012\/archery/) || $pathname.match(/^\/olympics\/2012\/badminton/) || $pathname.match(/^\/olympics\/2012\/basketball/) || $pathname.match(/^\/olympics\/2012\/beach_volleyball/) || $pathname.match(/^\/olympics\/2012\/boxing/) || $pathname.match(/^\/olympics\/2012\/canoe_kayak/) || $pathname.match(/^\/olympics\/2012\/cycling/) || $pathname.match(/^\/olympics\/2012\/diving/) || $pathname.match(/^\/olympics\/2012\/equestrian/) || $pathname.match(/^\/olympics\/2012\/fencing/) || $pathname.match(/^\/olympics\/2012\/field_hockey/) || $pathname.match(/^\/olympics\/2012\/gymnastics/) || $pathname.match(/^\/olympics\/2012\/handball/) || $pathname.match(/^\/olympics\/2012\/judo/) || $pathname.match(/^\/olympics\/2012\/modern_pentathlon/) || $pathname.match(/^\/olympics\/2012\/rowing/) || $pathname.match(/^\/olympics\/2012\/rhythmic_gymnastics/) || $pathname.match(/^\/olympics\/2012\/sailing/) || $pathname.match(/^\/olympics\/2012\/shooting/) || $pathname.match(/^\/olympics\/2012\/soccer/) || $pathname.match(/^\/olympics\/2012\/swimming/) || $pathname.match(/^\/olympics\/2012\/sync_swimming/) || $pathname.match(/^\/olympics\/2012\/table_tennis/) || $pathname.match(/^\/olympics\/2012\/taekwondo/) || $pathname.match(/^\/olympics\/2012\/tennis/) || $pathname.match(/^\/olympics\/2012\/track/) || $pathname.match(/^\/olympics\/2012\/trampoline/) || $pathname.match(/^\/olympics\/2012\/triathlon/) || $pathname.match(/^\/olympics\/2012\/volleyball/) || $pathname.match(/^\/olympics\/2012\/water_polo/) || $pathname.match(/^\/olympics\/2012\/weightlifting/) || $pathname.match(/^\/olympics\/2012\/wrestling/) ){
			cnn_metadata.section = [ 'olympics2012', 'sports' ];
			cnn_metadata.template_type = 'other:sports';
		} else if( $pathname.match(/^\/olympics\/2012\/explainers/) ){
			cnn_metadata.section = [ 'olympics2012', 'explainers' ];
			cnn_metadata.template_type = 'other:explainers';
		} else if( $pathname.match(/^\/olympics\/2012\/schedules/) ){
			cnn_metadata.section = [ 'olympics2012', 'schedules' ];
			cnn_metadata.template_type = 'other:schedules';
		} else if( $pathname.match(/^\/olympics\/2012\/teamusa/) ){
			cnn_metadata.section = [ 'olympics2012', 'teamusa' ];
			cnn_metadata.template_type = 'other:teamusa';
		} else if( $pathname.match(/^\/olympics\/2012\/athletes/) ){
			cnn_metadata.section = [ 'olympics2012', 'athletes' ];
			cnn_metadata.template_type = 'other:athletes';
		} else if( $pathname.match(/^\/olympics\/2012\/medals/) ){
			cnn_metadata.section = [ 'olympics2012', 'medal tracker' ];
			cnn_metadata.template_type = 'other:medal tracker';
		} else if( $pathname.match(/^\/olympics\/2012\/photos\/100greatestmoments/) ){
			cnn_metadata.section = [ 'si photos', 'BP-100.greatest.Olympic.moments' ];
			cnn_metadata.template_type = 'other:photo gallery';
		} else if( $pathname.match(/^\/olympics\/2012\/photos/) ){
			cnn_metadata.section = [ 'olympics2012', 'photos' ];
			cnn_metadata.template_type = 'other:photos';
		} else if( $pathname.match(/^\/olympics\/2012\/video/) ){
			cnn_metadata.section = [ 'olympics2012', 'video' ];
			cnn_metadata.template_type = 'other:video';
		} else if( $pathname.match(/^\/olympics\/2012\/writers/) ){
			cnn_metadata.section = [ 'olympics2012', 'siwriters' ];
			cnn_metadata.template_type = 'other:siwriters';
		}
	}
	else if ( ( $pathname ).match( /^\/olympics\// ) ) {
		cnn_metadata.section = [ 'more sports', 'olympics' ];
		cnn_metadata.template_type = 'section front';
		cnn_metadata.content_type = 'none';
		
		if( $pathname.match(/^\/olympics\/\d{4}\/medals/) ){
			cnn_metadata.template_type = 'other:stats';
		} else if( $pathname.match(/^\/olympics\/\d{4}\/schedules/) ){
			cnn_metadata.template_type = 'other:schedules';
		}
	}
	else if ( ( $pathname ).match( /^\/podcasts\// ) ) {
		
		cnn_metadata.template_type = 'other:podcasts';
		cnn_metadata.content_type = 'none';
		
		if ( ( $pathname ).match( /^\/podcasts\/nba\// ) ) {
			cnn_metadata.section = [ 'nba', 'podcasts' ];		
		} else if ( ( $pathname ).match( /^\/podcasts\/soccer\// ) ) {
			cnn_metadata.section = [ 'soccer', 'podcasts' ];
		} else if ( ( $pathname ).match( /^\/podcasts\/stewart_mandel\// ) ) {
			cnn_metadata.section = [ 'ncaa football', 'podcasts' ];
		}
		
		if( ( $pathname ).match( /listenlive/ ) ) {
			var audioName = document.getElementById('dpAudioNowPlaying');
			if( audioName.innerHTML !== '' ){
				cnn_metadata.audio = audioName.innerHTML;
			} else {
				cnn_metadata.audio = path_array[path-array.length - 1];
			}
		}
	}
	else if ( ( $pathname ).match( /^\/racing\// ) ) {
		cnn_metadata.section = [ 'racing', 'home' ];
		if ( typeof( cnnPageInfo_pageType ) !== "undefined" ) {
			if ( cnnPageInfo_pageType === 'section' ) {
				cnn_metadata.template_type = 'section front';
				cnn_metadata.content_type = 'none';
			} else {
				cnn_metadata.template_type = 'other';
				cnn_metadata.content_type = 'none';
			}
		} else {
			cnn_metadata.template_type = 'other';
			cnn_metadata.content_type = 'none';
		}
	}
	else if ( ( $pathname ).match( /^\/soccer\// ) ) {
		cnn_metadata.section = [ 'soccer', 'home' ];
		if ( typeof( cnnPageInfo_pageType ) !== "undefined" ) {
			if ( cnnPageInfo_pageType === 'section' ) {
				cnn_metadata.template_type = 'section front';
				cnn_metadata.content_type = 'none';
			} else {
				cnn_metadata.template_type = 'other';
				cnn_metadata.content_type = 'none';
			}
		} else {
			cnn_metadata.template_type = 'other';
			cnn_metadata.content_type = 'none';
		}
	}
	else if ( ( $pathname ).match( /^\/tennis\// ) ) {
		cnn_metadata.section = [ 'tennis', 'home' ];
		if ( typeof( cnnPageInfo_pageType ) !== "undefined" ) {
			if ( cnnPageInfo_pageType === 'section' ) {
				cnn_metadata.template_type = 'section front';
				cnn_metadata.content_type = 'none';
			} else {
				cnn_metadata.template_type = 'other';
				cnn_metadata.content_type = 'none';
			}
		} else {
			cnn_metadata.template_type = 'other';
			cnn_metadata.content_type = 'none';
		}
	}
	else if ( ( $pathname ).match( /^\/track_field\/wires\// ) ) {
		cnn_metadata.section = [ 'more sports', 'track & field' ];
		cnn_metadata.template_type = 'other';
		cnn_metadata.content_type = 'none';
	}
	else if ( ( $pathname ).match( /^\/video\// ) ) {
		cnn_metadata.section = [ 'video', 'home' ];
		cnn_metadata.template_type = 'video';
		cnn_metadata.content_type = 'none';
		
		var tokens = $pathname.split('/');
		tokens.shift();	//remove first item ('video')
		if ( tokens[tokens.length - 1].match(/\.html/) || tokens[tokens.length - 1] === ''){
			tokens.pop();
		}
		if (tokens.length > 1){
			cnn_metadata.section[1] = tokens[1];
		}
	}  else if ( ( $pathname ).match( /^\/behindthemic\// ) ) {
		cnn_metadata.section = [ 'behindthemic', 'home' ];
		cnn_metadata.template_type = 'video';
		cnn_metadata.content_type = 'none';		
	} else if ( ( $pathname ).match( /^\/specials\/just-askin\// ) ) {
		cnn_metadata.section = [ 'specials', 'just-askin' ];
		cnn_metadata.template_type = 'video';
		cnn_metadata.content_type = 'none';		
	} else if ( ( $pathname ).match( /^\/search\// ) ) {
		cnn_metadata.section = [ 'search', '' ];
		cnn_metadata.template_type = 'other:search results';
		cnn_metadata.content_type = 'none';
	} else if ( ( $pathname ).match( /^\/swimsuit\// ) || ( $pathname ).match(/^\/\d{4}_swimsuit/) ){
		var swim_year_matches = cnn_omnitureData.pageType.match(/\d{4}/);
		var swim_year = ( swim_year_matches ) ? swim_year_matches[0] : '';
		cnn_metadata.section = [ 'swimsuit ' + swim_year, '' ];
		cnn_metadata.template_type = 'other:swimsuit';
		cnn_metadata.content_type = 'none';
	} else if ( ( $pathname ).match( /^\/onlyvegas\// ) ) {
		cnn_metadata.section = [ 'sweepstakes', 'onlyvegas' ];
		cnn_metadata.template_type = 'other:sweepstakes';
		cnn_metadata.content_type = 'none';
	} else if ( ( $pathname ).match( /^\/about_us\/feedback/ ) || 
				( $pathname ).match( /^\/about_us\// ) ||
				( $pathname ).match( /^\/2008\/magazine\/si.books\// ) ||
				( $pathname ).match( /^\/sitemap\// ) ||
				( $pathname ).match( /^\/services\/map\// )	){
	
		cnn_metadata.section = [ 'services', 'other' ];
		cnn_metadata.template_type = 'other:services';
		cnn_metadata.content_type = 'none';
		
	}
}

if( $is404Page ){
	//ensuring that the 404 page is getting the right data
	var cnn_metadata = {
		"section": [ "other", "other" ],
		"content_type": "none",
		"template_type": "error"
	};
}

try{
    
siLog.info( 'siAnalytics: ', cnn_metadata );

siLog.groupEnd('siAnalytics');

} catch(e){
    
}

/* Livefyre Metrics */
$(document).ready(function(){
								function lfSocialClick(type){
																var data = type;
																
																siLog.group('lfSocialClick');
																siLog.debug( 'livefyre comment click' );
																siLog.groupEnd();
																								
																try{
																								trackMetrics({
																																type:"livefyre-click",
																																data: data
																								});
																}catch(e){
																								siLog.group('livefyre click - ');
																								siLog.debug( e );
																								siLog.groupEnd();
																							
															 }
								}
		
								if( typeof jQuery.fn.on == "function" ){						
																//Track Likes, Replies, and Posts
																/*
																$( '#livefyre' ).on( 'click', '.lf_like', function(){
																								lfSocialClick( 'Like' );
																});
																*/
																$( '#livefyre' ).on( 'click', '.lf_comment_reply_form .lf_post', function(){
																								lfSocialClick( 'Reply' );
																});
																
																$( '#livefyre' ).on( 'click', '#lf_comment_form .lf_post', function(){
																								lfSocialClick( 'Post Comment' );
																});
								} else if( typeof jQuery.fn.live == "function" ){								
																/*
																$( '#livefyre .lf_like' ).live( 'click', function(){
																								lfSocialClick( 'Like' );
																});
																*/
																$( '#livefyre .lf_comment_reply_form .lf_post' ).live( 'click', function(){
																								lfSocialClick( 'Reply' );
																});
																
																$( '#livefyre #lf_comment_form .lf_post' ).live( 'click', function(){
																								lfSocialClick( 'Post Comment' );
																});																
								} else {
																siLog.error("Omniture Error: LiveFyre commenting actions are not being tracked. Check jQuery version and binding options.");
								}
});
