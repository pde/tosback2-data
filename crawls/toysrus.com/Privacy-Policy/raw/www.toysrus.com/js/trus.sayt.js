if(0>window.location.href.toLowerCase().search("productid")){var _gaq=_gaq||[];_gaq.push(["_setAccount","UA-35518407-1"],["_trackPageview"]);var b=document.createElement("script");b.type="text/javascript";b.async=!0;b.src=("https:"==document.location.protocol?"https://ssl":"http://www")+".google-analytics.com/ga.js";var c=document.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c)};

setupSayt('004612716661364523232:ygsdagyam9y', 'AIzaSyC2WY0cRVpHYkRTn68UM3P0jshYoNSI1yU', 'kw', 'kwsearch', function(sayt) {
        if (sayt == null) {
            // SAYT is disabled
        } else {
            window['__gcs_sayt'] = sayt;
            completionObject = sayt['completionController'];
        }
    }, { 'maxCompletions': 5,
        'styleOptions': {
            xAlign: 'left'
        }
    }, { country: 'us',
        language: 'en',
        sayt_price_config: null,
        sayt_format_product: function(product) {
            sayt = __gcs_sayt;
            if(product.link.indexOf('&source') >= 0) {
                product.link = product.link.substring(0, product.link.indexOf('&source')) + product.link.substring(product.link.indexOf('&gcsct='));
                product.link = product.link.replace('entry.point?entry=', 'product/index.jsp?productId=');
            }
            var result = sayt.formatProduct(product);
            return result;
        },
        extra_params: {
            crowdBy: 'item+group+id(text):1',
            safe: false
        }
    }
);
