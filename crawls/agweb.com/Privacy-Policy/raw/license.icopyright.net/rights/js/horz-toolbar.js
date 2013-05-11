if (typeof iCopyright == 'undefined') {
    var iCopyright = {
        insertStyles:function (url) {
            if ("https:" == document.location.protocol) {
                url = url.replace('http://', 'https://');
                url = url.replace(':80/', ':443/');
            }
            try {
                // inserting via DOM fails in Safari 2.0, so brute force approach
                document.write('<link type="text/css" rel="stylesheet" href="' + url + '"></link>');
            } catch (e) {
                // for xhtml+xml served content, fall back to DOM methods
                var link = document.createElement('link');
                link.href = url;
                link.rel = 'stylesheet';
                link.type = 'text/css';
                document.getElementsByTagName('head')[0].appendChild(link);
            }
        },
        insertScript:function (url) {
            if ("https:" == document.location.protocol) {
                url = url.replace('http://', 'https://');
                url = url.replace(':80/', ':443/');
            }
            try {
                // inserting via DOM fails in Safari 2.0, so brute force approach
                document.write('<script type="text/javascript" src="' + url + '"></script>');
            } catch (e) {
                // for xhtml+xml served content, fall back to DOM methods
                var script = document.createElement('script');
                script.src = url;
                script.type = 'text/javascript';
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        }
    };
    var icx_orientation = 'horz';
    iCopyright.insertStyles('//d2uzdrx7k4koxz.cloudfront.net/rights/style/horz-toolbar.css?v=20130503-1712');
    iCopyright.insertScript('//license.icopyright.net:80/rights/js/icx-pub-' + icx_publication_id + '.js');
    iCopyright.insertScript('//d2uzdrx7k4koxz.cloudfront.net/rights/js/icx-functions.js?v=20130503-1712');
    iCopyright.insertScript('//d2uzdrx7k4koxz.cloudfront.net/rights/js/icx-toolbar.js?v=20130503-1712');
    iCopyright.insertScript('//d2uzdrx7k4koxz.cloudfront.net/rights/js/icx-page-view.js?v=20130503-1712');
} else {
    icx_writeToolbar();
    icx_writePageView();
}
