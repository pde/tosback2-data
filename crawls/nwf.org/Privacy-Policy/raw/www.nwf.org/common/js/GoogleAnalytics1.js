if (document.domain.match(/(backstage|hq-scqa|hq-scprod|localhost)/i)) {
    // Don't send GA data from dev or test environments.
} else {
    // 10/26/2011 DFR: Update to GA tracking
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-6031864-1']);
    _gaq.push(['_trackPageview']);
    (function () {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();
}