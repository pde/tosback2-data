(function(){
var pfs={ "http://dsc.discovery.com/tv/shark-week/tv-shows.html":{"nid":31712,"tr":1,"ex":"http://dsc.discovery.com/tv/life/life-the-game.html|http://dsc.discovery.com/games/games.html"},
"http://dsc.discovery.com/sharks/shark-facts.html":{"nid":31711,"tr":1,"ex":"http://dsc.discovery.com/tv/life/life-the-game.html|http://dsc.discovery.com/games/games.html"},
"http://dsc.discovery.com/sharks/shark-pictures/":{"nid":31708,"tr":1,"ex":"http://dsc.discovery.com/tv/life/life-the-game.html|http://dsc.discovery.com/games/games.html"},
"http://dsc.discovery.com/sharks/shark-o-nator/":{"nid":31710,"tr":1,"ex":"http://dsc.discovery.com/tv/life/life-the-game.html|http://dsc.discovery.com/games/games.html"},
"http://www.discovery.com/radio/podcasts.html":{"nid":30672,"tr":1,"ex":"http://dsc.discovery.com/tv/life/life-the-game.html|http://dsc.discovery.com/games/games.html"},
"http://dsc.discovery.com/sharks/shark-games/":{"nid":31709,"tr":1,"ex":"http://dsc.discovery.com/tv/life/life-the-game.html|http://dsc.discovery.com/games/games.html"},
"http://dsc.discovery.com/sharks/shark-cam/":{"nid":31707,"tr":1,"ex":"http://dsc.discovery.com/tv/life/life-the-game.html|http://dsc.discovery.com/games/games.html"},
"http://news.discovery.com/sharks/":{"nid":31713,"tr":1,"ex":"http://dsc.discovery.com/tv/life/life-the-game.html|http://dsc.discovery.com/games/games.html"},
"http://curiosity.discovery.com/":{"nid":30670,"tr":1,"ex":"http://dsc.discovery.com/tv/life/life-the-game.html|http://dsc.discovery.com/games/games.html"},
"http://science.discovery.com/":{"nid":3486,"tr":1},
"http://news.discovery.com/":{"nid":30669,"tr":1,"ex":"http://dsc.discovery.com/tv/life/life-the-game.html|http://dsc.discovery.com/games/games.html"},
"http://dsc.discovery.com/":{"nid":30668,"tr":1,"ex":"http://dsc.discovery.com/tv/life/life-the-game.html|http://dsc.discovery.com/games/games.html"},
"http://dhd.discovery.com/":{"nid":30671,"tr":1,"ex":"http://dsc.discovery.com/tv/life/life-the-game.html|http://dsc.discovery.com/games/games.html"},
"http://dsc.discovery.com/":{"nid":3481,"tr":1,"ex":"http://dsc.discovery.com/tv/life/life-the-game.html|http://dsc.discovery.com/games/games.html"} },d=document,w=window,u=(w.gm_fake_href)?w.gm_fake_href:w.location.href;

function z(n){
var s,u;

if (Math.random()>=n['tr']) {
	return;
}

var ar_nodes = ":31712:31711:31708:31710:30672:31709:31707:31713:30670:30671:";
if (ar_nodes.indexOf(":"+n['nid']+":") >= 0) {	// adradar only
	(new Image).src="//amch.questionmarket.com/adscgen/adrad.php?survey_num=0&aicode=0&site="+n['nid'];
	return;
}



s=d.createElement('SCRIPT');
u='http://content.dl-rms.com/dt/s/'+n['nid']+'/s.js';
s.src=u;
s.type='text/javascript';
d.getElementsByTagName('head')[0].appendChild(s);
}
function r() {
	var n="",p,x;
	while (1) {
		try {
			for (p in pfs) {
			  if (u.substring(0,p.length)==p && p.length > n.length) {
				if (pfs[p].ex) {
					x=new RegExp(pfs[p].ex,"i");
					if (x.test(u)) {
						continue;
					}
				}
				n=p;
			  }
			}
			if (n.length > 0) {
				z(pfs[n]);
				return;
			}
		} catch (e) {}
	
		if (w==top) {
			break;
		}
	
		if (w==window&&u!=d.referrer) {
			u=d.referrer;
		} else {
			w=w.parent;
		}
	}
}

if (d.readyState=="complete"){
	r();
} else if (w.addEventListener){ 
	w.addEventListener("load", r, false);
} else if (w.attachEvent){ 
	w.attachEvent("onload", r);
}
})();
