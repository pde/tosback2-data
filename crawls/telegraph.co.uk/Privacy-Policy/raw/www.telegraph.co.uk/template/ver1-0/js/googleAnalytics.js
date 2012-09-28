function trackGoogle() {
	try {var pageTracker = _gat._getTracker("UA-7226372-1");pageTracker._trackPageview();} catch(err) {}
}

/* Extra code for DIGI-2632 - taken from http://stackoverflow.com/questions/4064783/google-analytics-track-outbound-clicks-how */
function isLinkExternal(link) {
    var r = new RegExp('^https?://(?:www.)?' + location.host.replace(/^www./, ''));
        return !r.test(link);
}

$(document).ready(function() {
    $(document).bind('click', function(e) {
        var target = (window.event) ? e.srcElement : e.target;
        while (target) {
            if (target.href) break;
            target = target.parentNode;
        }
        if (!target || !isLinkExternal(target.href)) return true;
        var link = target.href;
        link = '/outgoing/' + link.replace(/:\/\//, '/');
        _gaq.push(['_trackPageview', link]);
    });
});

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-7226372-1']);
_gaq.push(['_trackPageview']);
(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
