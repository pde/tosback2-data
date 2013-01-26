s_linkInternalFilters="javascript:,syfy.com,video.syfy.com,gamecenter.syfy.com,forums.syfy.com";


var s_account="nbcusyfydev";
var url=String(window.location);

if (url.match('http://www.syfy.com')
 || url.match('.defiance.com')
 || url.match('http://www.dvice.com')
 || url.match('http://www.blastr.com')
 || url.match('http://mt4-blogs.syfy.com/global/')
 || url.match('http://showblogs.syfy.com')
 || url.match('http://syfygames.com')
 || url.match('.syfygames.com')
 || url.match('.bigpoint.com')
 || url.match('http://letsimaginegreater.com')
 || url.match('http://forums.syfy.com')
 || url.match('http://press.syfy.com')
 || url.match('http://alphapowers.com')
 || url.match('http://syfyigniters.com')
 || url.match('http://www.syfyigniters.com')
 || url.match('.bigpoint.com')
 || url.match('.letsimaginegreater.com') 
 || url.match('http://video.syfy.com')) {
    s_account="nbcuglobal,nbcuscifid,nbcuscifibu"
} 

var s_prop8 ="Cable";
var s_prop9 ="Syfy";

function trackEvent(obj) {
        if (obj.pageName) {
                var s=s_gi(s_account);
		s.linkTrackVars += ',';
                for (prop in obj) {
                        eval('s.'+prop+"='"+obj[prop]+"';");
                        s.linkTrackVars += prop+',';
                }
                void(s.tl(true,'o',s.pageName));
        }
}

function trackImpression(obj) {
	if (obj.name) {
		var s=s_gi(s_account);
		s.campaign = obj.name;
		s.events="prodView";
		void(s.t());
	}
}

function trackClick(obj) {
	if (obj.name && obj.url) {
		var s=s_gi(s_account);
		s.campaign = obj.name;
		s.events="scAdd";
		void(s.tl(true,'o',s.campaign));
		document.location.href = obj.url;
	}
}

function trackPageView(obj) {
        if (obj.pageName) {
		var s=s_gi(s_account);
                s.linkTrackVars += ',';
                for (prop in obj) {
			eval('s.'+prop+"='"+obj[prop]+"';");
		}
		void(s.t());
        }
}

document.write('<s'+'cript src="http://www.syfy.com/global/scripts/omniture/s_code.js"></s'+'cript>');