
        var _gaq = _gaq || [];
        var url = window.location.href.toLowerCase();
        if (url.indexOf('boatingsavings.com') > -1)
        {
            _gaq.push(['_setAccount', 'UA-16288905-2']);
            _gaq.push(['_setDomainName', '.boatingsavings.com']);
        }
        else if (url.indexOf('workwearsavings.com') > -1)
        {
            _gaq.push(['_setAccount', 'UA-16288905-3']);
            _gaq.push(['_setDomainName', '.workwearsavings.com']);
        }
        else if (url.indexOf('bargainoutfitters.com') > -1)
        {
            _gaq.push(['_setAccount', 'UA-19085551-1']);
            _gaq.push(['_setDomainName', '.bargainoutfitters.com']);
        }
        else
        {
            _gaq.push(['_setAccount', 'UA-16288905-1']);
            _gaq.push(['_setDomainName', '.sportsmansguide.com']);
        }
        _gaq.push(['_setAllowLinker', true])
        _gaq.push(['_setAllowHash', false]);
        _gaq.push(['_trackPageview']);
	_gaq.push(['_trackPageLoadTime']);
        (function() {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            var pre = '';
            pre = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www');
            if (pre.indexOf('http') == -1) //trying to see if this fixes where no prefix is added and we get a 404.
                pre = 'http://www';
            ga.src =  pre + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
            
        })();