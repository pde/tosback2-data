(function(){
var pfs={ "http://tlc.discovery.com/fansites/beyondthebull/videogallery/crashes/wrecks_crashes.html":{"nid":32023,"tr":1},
"http://dsc.discovery.com/tv/fearless-planet/adventure-sports/adventure-sports.html":{"nid":32046,"tr":1},
"http://tlc.discovery.com/fansites/beyondthebull/videogallery/upclose/up_close.html":{"nid":32022,"tr":1},
"http://animal.discovery.com/convergence/puppybowl/video_gallery/videogallery.html":{"nid":32028,"tr":1},
"http://dsc.discovery.com/convergence/sharkweek/ultimate-quiz/ultimate-quiz.html":{"nid":32034,"tr":1},
"http://animal.discovery.com/fansites/petstar/videogallery/winners/video.html":{"nid":32027,"tr":1},
"http://tlc.discovery.com/fansites/miami-ink/videogallery/videogallery.html":{"nid":32024,"tr":1},
"http://school.discoveryeducation.com/homeworkhelp/homework_help_home.html":{"nid":32041,"tr":1},
"http://dsc.discovery.com/convergence/sharkweek/view-vote/view-vote.html":{"nid":32035,"tr":1},
"http://animal.discovery.com/fansites/animalcops/videogallery/video.html":{"nid":32029,"tr":1},
"http://dsc.discovery.com/convergence/sharkweek/podcasts/podcasts.html":{"nid":32036,"tr":1},
"http://tlc.discovery.com/fansites/whatnottowear/video2/video2b.html":{"nid":32025,"tr":1},
"http://dsc.discovery.com/convergence/sharkweek/news/sharknews.html":{"nid":32033,"tr":1},
"http://dsc.discovery.com/convergence/sharkweek/widget/widget.html":{"nid":32038,"tr":1},
"http://school.discoveryeducation.com/sciencefaircentral/?pID=fair":{"nid":32044,"tr":1},
"http://dsc.discovery.com/convergence/sharkweek/games/games.html":{"nid":32037,"tr":1},
"http://animal.discovery.com/videogalleries/popular/popular.html":{"nid":32026,"tr":1},
"http://tlc.discovery.com/videogalleries/popular/popular.html":{"nid":32021,"tr":1},
"http://dsc.discovery.com/convergence/sharkweek/poll/poll.html":{"nid":32032,"tr":1},
"http://school.discoveryeducation.com/lessonplans/?pID=lesson":{"nid":32042,"tr":1},
"http://dsc.discovery.com/tv/shark-week/tv-shows.html":{"nid":32057,"tr":1},
"http://school.discoveryeducation.com/schrockguide/":{"nid":32043,"tr":1},
"http://dsc.discovery.com/sharks/shark-facts.html":{"nid":32056,"tr":1},
"http://dsc.discovery.com/sharks/shark-pictures/":{"nid":32053,"tr":1},
"http://dsc.discovery.com/sharks/shark-o-nator/":{"nid":32055,"tr":1},
"http://www.discovery.com/radio/podcasts.html":{"nid":32051,"tr":1},
"http://www.discovery.com/radio/podcasts.html":{"nid":32039,"tr":1},
"http://dsc.discovery.com/sharks/shark-games/":{"nid":32054,"tr":1},
"http://dsc.discovery.com/sharks/shark-cam/":{"nid":32052,"tr":1},
"http://school.discoveryeducation.com/":{"nid":32040,"tr":1},
"http://dsc.discovery.com/survival/":{"nid":32045,"tr":1},
"http://news.discovery.com/sharks/":{"nid":32030,"tr":1},
"http://news.discovery.com/sharks/":{"nid":32058,"tr":1},
"http://news.discovery.com/sharks/":{"nid":32048,"tr":1},
"http://curiosity.discovery.com/":{"nid":32049,"tr":1},
"http://military.discovery.com/":{"nid":32031,"tr":1},
"http://science.discovery.com/":{"nid":32019,"tr":1},
"http://health.discovery.com/":{"nid":32018,"tr":1},
"http://animal.discovery.com/":{"nid":32017,"tr":1},
"http://times.discovery.com/":{"nid":32020,"tr":1},
"http://dsc.discovery.com/":{"nid":32047,"tr":1},
"http://dsc.discovery.com/":{"nid":32015,"tr":1},
"http://tlc.discovery.com/":{"nid":32016,"tr":1},
"http://dhd.discovery.com/":{"nid":32050,"tr":1} },d=document,w=window,u=(w.gm_fake_href)?w.gm_fake_href:w.location.href;

function z(n){
var s,u;

if (Math.random()>=n['tr']) {
	return;
}

var ar_nodes = ":32023:32046:32022:32028:32034:32027:32024:32041:32035:32029:32036:32025:32033:32038:32044:32037:32026:32021:32032:32042:32057:32043:32056:32053:32055:32051:32039:32054:32052:32040:32045:32030:32058:32048:32049:32031:32019:32018:32017:32020:32047:32015:32016:32050:";
if (ar_nodes.indexOf(":"+n['nid']+":") >= 0) {	// adradar only
	(new Image).src="//amch.questionmarket.com/adscgen/adrad.php?survey_num=0&aicode=0&site="+n['nid'];
	return;
}



s=d.createElement('SCRIPT');
u='//content.dl-rms.com/dt/s/'+n['nid']+'/s.js';
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
