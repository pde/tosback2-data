// Post Processing code to update links with tracking references

var url = window.location.href.toString();
url = url.replace(/http:\/\/[^\/]*/, '');
url = url.replace(/\?.*$/, '');

// All links on page
var links = document.getElementsByTagName('a');

function ncaaLiveGame(gameID) {
	var url = "http://www.ncaa.com/sites/default/files/external/liveplayer/champplayer/player.html?gameId=" + gameID + "&playerSize=small&useProdData=1";
	window.open(url, "livePopup","width=1070,height=725,toolbar=no,location=no,menubar=no,top=0,left=0,center=true");	
}

for (var i=0; i < links.length; i++) {
	var link = links[i];
	if (link.href); else continue;
	if (link.href.indexOf('.html/')>0) { link.href = link.href.replace(/\.html\//,'.html'); }
	if (link.href.indexOf('#ncaalive')>-1) { 
		var game = link.href.replace(/^.*#ncaalive/,'').replace(/[\&\?].*/,'');
		link.href = 'javascript:ncaaLiveGame(\''+game+'\');';
	}
	
	if (!cnnPage.isHomepage) {
		// Loop through links, add erefs where expected
		if (link.href.indexOf('http://www.fannation.com/') == 0) {
			cnnAddQ( link, 'eref=fromSI' );
		}
		if (url != '/' && link.href.indexOf('/vault') > 0) {
			cnnAddQ( link, 'eref=sisf' );
		} 
		if (url.indexOf('/danpatrick') != 0 && link.href.indexOf('/danpatrick') > 0 && link.href.indexOf('.mp3') < 0) {
			cnnAddQ( link, 'eref=fromSI' );
		}
	}
	if (link.innerHTML == link.getAttribute('title')) {
		link.setAttribute('title','');
	}
}

function cnnAddQ (link, add) {
	if (link.href.toLowerCase().indexOf('javascript') == -1) {
		if (link.href.indexOf('?') > 0) link.href = link.href + '&' + add;
		else link.href = link.href + '?' + add;
	}
}

/* FIXES */

	/* Homepage */
	if (cnnPage.isHomepage) {
		cnnTagHPLinks(); 
		/* iPad */
		if(navigator.userAgent.indexOf('iPad')>-1) {
			$e('cnnShareRow_mobile').href='http://ax.itunes.apple.com/WebObjects/MZStore.'
			+'woa/wa/browserRedirect?url=itms%253A%252F%252Fax.itunes.apple.com%252FWebObj'
			+'ects%252FMZStore.woa%252Fwa%252FviewSoftware%253Fid%253D329510739%2526mt%253D8';
		}
		/* Poll frame height issue */
		if ($e('cnnPollFrame')) { $e('cnnPollFrame').setAttribute('height','169'); }
	}

	// Add whitespace to cnnClear
	var breaks = $c('cnnClear','div');

	// Gameflash comments iframe fix 
	if (url.indexOf('/gameflash/')>0 && url.indexOf('_preview.html')>0) {
		var iframe = $c('fanComments', '', 'iframe');
		if (iframe) { iframe.setAttribute('height', '425'); }
	}

/* NCAA MML Launcher */
var ncaaMmlLauncher = {
	consoleUrl: 'http://www.ncaa.com/mml/player/console.html',
	
	init: function() {
		$('.launch-mml').click(ncaaMmlLauncher.launchLink);
	},
	launchGameId: function(gid) {
		if ((gid) && (gid != '')) {
			ncaaMmlLauncher.launchMml(ncaaMmlLauncher.consoleUrl + '?gameID=' + gid);			
		} else {
			ncaaMmlLauncher.launchMml(ncaaMmlLauncher.consoleUrl);			
		}
		return false;
	},
	launchLink: function() {
		ncaaMmlLauncher.launchMml(this.href);
		return false;
	},
	launchMml: function(url) {
		if ((ncaaMmlLauncher.consoleWindow) && (!ncaaMmlLauncher.consoleWindow.closed)) {
			ncaaMmlLauncher.consoleWindow.focus();
		} else {
			ncaaMmlLauncher.consoleWindow = window.open(url,'mmlWindow','width=990,height=721,top=0,left=0,menubar=no,toolbar=no,status=no,location=no');
		}		
		return false;
	}
}
