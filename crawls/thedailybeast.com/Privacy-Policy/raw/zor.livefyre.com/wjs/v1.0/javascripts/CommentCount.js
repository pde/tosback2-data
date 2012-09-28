/*global LF: true, escape:true*/
if (typeof(LF)==='undefined') LF = {};
if (typeof(LF.modules)==='undefined') LF.modules = {};
LF.modules.CommentCount = function(LF) {
    var JSONP_CB_PREFIX = "LFCommentCount",
        JSONP_CB_RAND_MAX = 100000,
        // LF_DOMAIN is used as the host for the ncomments API call if one cannot be extracted from the script tag src
        LF_DOMAIN = 'livefyre.com',
        // LF_DOMAIN_REGEX is used to test the script tag src and extract a domain
        LF_DOMAIN_REGEX = /[^.\/]+\.fyre\.co|(\w+\.)?livefyre\.com/,
        LF_NCOMMENTS_PATH = '/api/v1.1/public/comments/ncomments/{hash}.json',
        LEGACY_ARTICLE_ID_ATTRIBUTE = 'article_id',
        DEFAULT_DOMAIN_ATTRIBUTE = 'data-lf-domain'
        DEFAULT_ARTICLE_ID_ATTRIBUTE = 'data-lf-article-id',
        DEFAULT_SITE_ID_ATTRIBUTE = 'data-lf-site-id',
        LEGACY_CLASS_NAME = 'livefyre-ncomments',
        DEFAULT_CLASS_NAME = 'livefyre-commentcount',
        // DEFAULT_RETRY_TIMEOUT is the default number of seconds to wait if the ncomments request returns a 503 envelope
        DEFAULT_RETRY_TIMEOUT = 500,
        MAX_FETCH_ATTEMPTS = 5,
        // DEFAULT_REPLACER_REGEX is used to match which part of a string should be replaced by a new comment count
        DEFAULT_REPLACER_REGEX = /(\d+,?\d*|none|no|zero|nada|leave a)/ig,
        NCOMMENTS_SCRIPT_SRC_REGEX = /(CommentCount|ncomments)\.js/,

        /**
         * Start the CommentCount processing. Able to provide a list of articles and a replacement function or regex
         * which will be used to do the replacements when counts are returned from the server.
         * @param {Object} config The object containing the User provided config params.
         */
        module = function(config) {
            var articles = config['articles'] || module.defaults.get_articles(),
                replacer = config['replacer'];
            if (typeof(replacer) === 'undefined') {
                replacer = module.defaults.replace_all;
            } else {
                replacer = module.helpers.make_replacer(replacer);
            }
            module.fetch(articles, replacer);
        };
    
    /* HELPERS */
    module.helpers = {};
    /**
     * Implements base64 encoding and decoding.
     * From http://www.webtoolkit.info/javascript-base64.html
     */
    module.helpers.Base64 = (function() {
        var Base64 = {
            // private property
            _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

            // public method for encoding
            encode : function (input) {
                var output = "";
                var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                var i = 0;

                input = Base64._utf8_encode(input);

                while (i < input.length) {

                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);

                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;

                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }

                    output = output +
                    this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                    this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

                }

                return output;
            },

            // public method for decoding
            decode : function (input) {
                var output = "";
                var chr1, chr2, chr3;
                var enc1, enc2, enc3, enc4;
                var i = 0;

                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                while (i < input.length) {

                    enc1 = this._keyStr.indexOf(input.charAt(i++));
                    enc2 = this._keyStr.indexOf(input.charAt(i++));
                    enc3 = this._keyStr.indexOf(input.charAt(i++));
                    enc4 = this._keyStr.indexOf(input.charAt(i++));

                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;

                    output = output + String.fromCharCode(chr1);

                    if (enc3 != 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output = output + String.fromCharCode(chr3);
                    }

                }

                output = Base64._utf8_decode(output);

                return output;

            },

            // private method for UTF-8 encoding
            _utf8_encode : function (string) {
                string = string.replace(/\r\n/g,"\n");
                var utftext = "";

                for (var n = 0; n < string.length; n++) {

                    var c = string.charCodeAt(n);

                    if (c < 128) {
                        utftext += String.fromCharCode(c);
                    }
                    else if((c > 127) && (c < 2048)) {
                        utftext += String.fromCharCode((c >> 6) | 192);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }
                    else {
                        utftext += String.fromCharCode((c >> 12) | 224);
                        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }

                }

                return utftext;
            },

            // private method for UTF-8 decoding
            _utf8_decode : function (utftext) {
                var string = "";
                var i = 0;
                var c = 0,
                    c1 = 0,
                    c2 = 0,
                    c3 = 0;

                while ( i < utftext.length ) {

                    c = utftext.charCodeAt(i);

                    if (c < 128) {
                        string += String.fromCharCode(c);
                        i++;
                    }
                    else if((c > 191) && (c < 224)) {
                        c2 = utftext.charCodeAt(i+1);
                        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                        i += 2;
                    }
                    else {
                        c2 = utftext.charCodeAt(i+1);
                        c3 = utftext.charCodeAt(i+2);
                        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                        i += 3;
                    }
                }
                return string;
            }
        };
        return Base64;
    })();
    /**
     * Returns true if the param is an Array, else false
     *
     * @param arr: Value to be tested for Array-ness
     */
    module.helpers.isArray = function(arr) {
        if ( ! arr) return false;
        if (arr.isArray) return arr.isArray();
        else return Object.prototype.toString.call( arr ) === '[object Array]';
    };
    /**
     * Returns true if the param is a RegExp object, else false
     *
     * @param reg: Value to be tested for RegExp-ness
     */
    module.helpers.isRegExp = function(reg) {
        if ( ! reg) return false;
        else return Object.prototype.toString.call( reg ) === '[object RegExp]';
    };
    /**
     * Given an array and an item, tests whether the item is in the Array.
     * Used because IE doesn't have Array.prototype.indexOf
     *
     * @param array: An array
     * @param item: Object to test if it's in the array
     */
    module.helpers.contains = function(array, item) {
        var i = array.length;
        while (i--) {
            if (array[i] === item) {
                return true;
            }
        }
        return false
    };
    /**
     * Provided a list of articles, this returns the hash that must be passed
     * to the ncomments API endpoint
     *
     * @param articles: A list or object indicating a collection of articles
     */
    module.helpers.hash_articles = function(articles) {
        var article_pairs = [],
            key,
            mapping = {},
            ret = '';
        // If passed an articles object, convert to list first
        if (!module.helpers.isArray(articles)) {
            articles = module.helpers.articles_object_to_list(articles);
        }
        if (articles.length == 0) {
            return null;
        }
        // Create article_id/site_id pairs
        for (var i=0, len=articles.length, arr, article; i<len; i++) {
            article = articles[i];
            arr = mapping[article.site_id] || [];
            if (!module.helpers.contains(arr, article.article_id)) {
                arr.push(article.article_id);
            }
            mapping[article.site_id] = arr;
        }
        for (key in mapping) {
            if (mapping.hasOwnProperty(key)) {
                article_pairs.push(key +':'+ mapping[key].join(','));
            }
        }
        return module.helpers.Base64.encode(article_pairs.join('|'));
    };
    /**
     * Given an ncomments hash, returns a list of article objects
     *
     * @param hash: An ncomments hash. Possibly generated by helpers.hash_articles
     */
    module.helpers.unhash_articles = function(hash) {
        var article_pairs = module.helpers.Base64.decode(hash).split('|'),
            articles = [];
        for (var i=0, len=article_pairs.length, article; i<len; i++) {
            article = article_pairs[i].split(',');
            articles.push({
                'site_id': article[0],
                'article_id': article[1]
            });
        }
        return articles;
    };
    /**
     * Given n articles objects, merges them into one
     *
     * @params: 1-n articles objects
     */
    module.helpers.merge_articles_objects = function() {
        var args = Array.prototype.slice.call(arguments),
            obj,
            site, out_site,
            article, out_article,
            out_obj = {};
        for (var i=0, len=args.length; i<len; i++) {
            obj = args[i];
            for (var site_id in obj) { 
                if (!obj.hasOwnProperty(site_id)) {
                    continue;
                }
                if (!(site_id in out_obj)) out_obj[site_id] = {};
                site = obj[site_id];
                out_site = out_obj[site_id];
                for (var article_id in site) { 
                    if (!site.hasOwnProperty(article_id)) {
                        continue;
                    }
                    if (!(article_id in out_site)) out_site[article_id] = {};
                    article = site[article_id];
                    out_site[article_id] = module.helpers.merge_simple_objects(out_site[article_id], article)
                }
            }
        }
        return out_obj;
    };
    /**
     * Converts an articles list to an articles object
     * e.g. [{site_id: 6, article_id: 1}] -> {6: {1: {}}}
     *
     * @param article_list: A list of article description objects
     */
    module.helpers.articles_list_to_object = function(article_list) {
        var obj = {},
            article,
            site_id,
            site,
            article_id,
            article_id_val = null;
        for (var i=0, len=article_list.length; i<len; i++) {
            article = article_list[i];
            site_id = article.site_id;
            article_id = article.article_id;
            article_id_val = null;
            // Make sure site_id key is there
            if ( ! (site_id in obj)) obj[site_id] = {};
            site = obj[site_id];
            obj[site_id][article_id] = module.helpers.merge_simple_objects(
                                            site[article_id] || {},
                                            module.helpers.remove_ids_from_article_object(article)
                                        );
        }
        return obj;
    };
    module.helpers.articles_object_to_list = function(article_object) {
        var article_list = [],
            site,
            article,
            obj_to_push,
            article_info;
        for (var site_id in article_object) { if (article_object.hasOwnProperty(site_id)) {
            site = article_object[site_id];
            for (var article_id in site) { if (site.hasOwnProperty(article_id)) {
                article_info = site[article_id];
                obj_to_push = module.helpers.merge_simple_objects({
                    article_id: article_id,
                    site_id: site_id
                }, article_info);
                article_list.push(obj_to_push);
            }}
        }}
        return article_list;
    };
    module.helpers.jsonp = function(url, args, callback) {
        if (typeof(args)==='undefined') args = {};
        var jsonpcb;
        // Create jsonp callback (like 'LFCommentCount12515')
        jsonpcb = JSONP_CB_PREFIX+Math.floor(Math.random()*JSONP_CB_RAND_MAX);
        window[jsonpcb] = callback;
        // Add jsonp callback to URL args
        args.callback = jsonpcb;
        
        if (url.indexOf('?') < 1) url = url + "?";
        for (var arg in args) {
            if (args.hasOwnProperty(arg)) {
                url = url + "&" + escape(arg) + "=" + escape(args[arg]);
            }
        }
        var headID = document.getElementsByTagName("head")[0];         
        var newScript = document.createElement('script');
        newScript.type = 'text/javascript';
        newScript.src = url;
        headID.appendChild(newScript);
    };
    module.helpers.on_window_load = function(func) {
        var arg_func = func;
        // If already loaded, call back immediately
        if (module.loaded === true) {
            func.call(window);
        } else {
            func = function() {
                arg_func.call(window);
                module.loaded = true;
            };
        }
        if (window.addEventListener) { // W3C standard
            window.addEventListener('load', func, false); // NB **not** 'onload'
        } else if (window.attachEvent) { // Microsoft
            window.attachEvent('onload', func);
        }
    };
    module.helpers.get_script_element = function() {
        var scripts = document.getElementsByTagName('script'),
            script,
            scriptsrc;
        for (var i=0, len=scripts.length; i<len; i++) {
            script = scripts[i];
            scriptsrc = script.src;
            if (scriptsrc && scriptsrc.match(NCOMMENTS_SCRIPT_SRC_REGEX))
                return script;
        }
    };
    module.helpers.get_domain = function() {
        var script = module.helpers.get_script_element();
        // Script not found
        if (!script) return;
        
        // Check for lf-domain data attribute
        var attrValue = script.getAttribute(DEFAULT_DOMAIN_ATTRIBUTE);
        if (attrValue) return attrValue;
        
        // Parse domain from script src
        var scriptsrc = script.src,
            match = scriptsrc.match(LF_DOMAIN_REGEX);
        if ( ! match ) return;
        
        match = match[0];

        // Don't use zor
        if (match.match(/zor\.livefyre\.com|zor\.fyre\.co/)) return;
        
        return match;
    };
    module.helpers.memoize = function(func) {
        var val = 'first-time',
            return_func;
        return_func = function() {
            if (val !== 'first-time') return val;
            val = func.apply(this, arguments);
            return val;
        };
        return return_func;
    };
    module.helpers.getElementsByClassName = function (className, tag, elm){
        var getElementsByClassName;
        if (document.getElementsByClassName) {
            getElementsByClassName = function (className, tag, elm) {
                elm = elm || document;
                var elements = elm.getElementsByClassName(className),
                    nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
                    returnElements = [],
                    current;
                for(var i=0, il=elements.length; i<il; i+=1){
                    current = elements[i];
                    if(!nodeName || nodeName.test(current.nodeName)) {
                        returnElements.push(current);
                    }
                }
                return returnElements;
            };
        }
        else if (document.evaluate) {
            getElementsByClassName = function (className, tag, elm) {
                tag = tag || "*";
                elm = elm || document;
                var classes = className.split(" "),
                    classesToCheck = "",
                    xhtmlNamespace = "http://www.w3.org/1999/xhtml",
                    namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
                    returnElements = [],
                    elements,
                    node;
                for(var j=0, jl=classes.length; j<jl; j+=1){
                    classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
                }
                try    {
                    elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
                }
                catch (e) {
                    elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
                }
                while ((node = elements.iterateNext())) {
                    returnElements.push(node);
                }
                return returnElements;
            };
        }
        else {
            getElementsByClassName = function (className, tag, elm) {
                tag = tag || "*";
                elm = elm || document;
                var classes = className.split(" "),
                    classesToCheck = [],
                    elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
                    current,
                    returnElements = [],
                    match;
                for(var k=0, kl=classes.length; k<kl; k+=1){
                    classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
                }
                for(var l=0, ll=elements.length; l<ll; l+=1){
                    current = elements[l];
                    match = false;
                    for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
                        match = classesToCheck[m].test(current.className);
                        if (!match) {
                            break;
                        }
                    }
                    if (match) {
                        returnElements.push(current);
                    }
                }
                return returnElements;
            };
        }
        return getElementsByClassName(className, tag, elm);
    };
    module.helpers.replace_innerHTML = function(element, regex, new_text) {
        element.innerHTML = element.innerHTML.replace(regex, new_text);
    };
    /**
     * Make the replacement function, which can be regex (used to determine which part of the string should be replaced)
     * or a callback function that will handle doing the replacement.
     * @param {Function|Regex} regex_or_func The function or regex that will be used for the replacement.
     */
    module.helpers.make_replacer = function(regex_or_func) {
        var replacer_func = regex_or_func;
        if (module.helpers.isRegExp(regex_or_func)) {
            replacer_func = function(htmlElement, count) {
                module.helpers.replace_innerHTML(htmlElement, regex_or_func, count)
            };
        }
        var func_to_return;
        func_to_return = function(articles) {
            var site,
                article,
                article_eles,
                article_count;
            for (var site_id in articles) { 
                if (!articles.hasOwnProperty(site_id)) {
                    continue;
                }
                site = articles[site_id];
                for (var article_id in site) { 
                    if (!site.hasOwnProperty(article_id)) {
                        continue;
                    }
                    article = site[article_id];
                    article_eles = article.elements;
                    article_count = article.total || 0;
                    for (var i=0, len=article_eles.length; i<len; i++) {
                        replacer_func(article_eles[i], article_count);
                    }
                }
            }
        };
        return func_to_return;
    };
    module.helpers.remove_ids_from_article_object = function(article) {
        var return_obj = {};
        for (var key in article) { 
            if (!article.hasOwnProperty(key)) {
                continue;
            }
            if (key !== 'site_id' && key !== 'article_id') {
                return_obj[key] = article[key];
            }
        }
        return return_obj;
    };
    module.helpers.merge_simple_objects = function(obj1, obj2) {
        var obj3 = {},
            tmp;
        // First basically just copy obj1 into obj3
        for (var key in obj1) { 
            if (obj1.hasOwnProperty(key)) {
                obj3[key] = obj1[key];
            }
        }
        // Then add obj2 into obj3, not overwriting arrays
        for (var key in obj2) { 
            if (!obj2.hasOwnProperty(key)) {
                continue;
            }
            if (module.helpers.isArray(obj2[key]) && module.helpers.isArray(obj3[key])) {
                obj3[key] = obj3[key].concat(obj2[key]);
            } else {
                obj3[key] = obj2[key];
            }
        }
        return obj3;
    }
    
    module.helpers.ensure_correct_articles_object = function(article_counts) {
        for (var site_id in article_counts) { 
            if (!article_counts.hasOwnProperty(site_id)) {
                continue;
            }
            var site = article_counts[site_id];
            for (var article_id in site) { 
                if (!site.hasOwnProperty(article_id)) {
                    continue;
                }
                if ( ! (typeof(site[article_id])==='object')) {
                    site[article_id] = {count: site[article_id]};
                }
            }
        }
        return article_counts;
    };
    
    /* DEFAULTS */
    module.defaults = {};
    module.defaults.find_elements = function(class_name) {
        var eles = module.helpers.getElementsByClassName(class_name || DEFAULT_CLASS_NAME);
        return eles;
    };
    module.defaults.get_article_id = function(element) {
        return element.getAttribute(DEFAULT_ARTICLE_ID_ATTRIBUTE);
    };
    module.defaults.get_article_id_legacy = function(element) {
        return element.getAttribute(LEGACY_ARTICLE_ID_ATTRIBUTE);
    };
    module.defaults.get_site_id_from_script_src = module.helpers.memoize(function(element) {
        var script = module.helpers.get_script_element();
        if (typeof(script)==='undefined') return null;
        var matches = script.src.match("#bn=([^\\&]*)");
        if (matches && matches.length >= 2) return matches[1];
        return null;
    });
    module.defaults.get_site_id_from_attribute = function(element) {
        return element.getAttribute(DEFAULT_SITE_ID_ATTRIBUTE);
    };
    module.defaults.get_articles = function() {
        var elements = module.defaults.find_elements(),
            element,
            articles = {},
            site_id,
            site,
            article_id;
        for (var i=0, len=elements.length; i<len; i++) {
            element = elements[i];
            site_id = module.defaults.get_site_id_from_attribute(element) || module.defaults.get_site_id_from_script_src(element);
            if ( ! (site_id in articles)) articles[site_id] = {};
            site = articles[site_id];
            article_id = module.defaults.get_article_id(element);
            if ( ! (article_id in site)) site[article_id] = {elements: []};
            site[article_id].elements.push(element);
        }
        return articles;
    };
    module.defaults.get_articles_legacy = function() {
        var elements = module.defaults.find_elements(LEGACY_CLASS_NAME),
            element,
            articles = {},
            site_id,
            site,
            article_id;
        for (var i=0, len=elements.length; i<len; i++) {
            element = elements[i];
            site_id = module.defaults.get_site_id_from_script_src(element);
            if ( ! (site_id in articles)) articles[site_id] = {};
            site = articles[site_id];
            article_id = module.defaults.get_article_id_legacy(element);
            if ( ! (article_id in site)) site[article_id] = {elements: []};
            site[article_id].elements.push(element);
        }
        return articles;
    };
    module.defaults.replace_all = module.helpers.make_replacer(DEFAULT_REPLACER_REGEX);
    
    /* PUBLIC INTERFACE */
    /**
     * Fetch comment counts for the provided articles from the server,
     * then execute `cb` with an argument containing site/article->count/element mappings
     *
     * @param articles (optional): Array of objects with site_id and article_id keys or object with site_id->article_id->[elements] mapping
     * @param cb: A callback Function.
     * @param nodata_cb: A callback if articles is empty.
     */
    module.fetch = function(articles, cb, nodata_cb) {
        var args = Array.prototype.slice.call(arguments),
            fetch_attempts = 0;

        // prevent the onload from running if called explicitly through .run, .auto, or .fetch
        module.loaded = true;

        // If they only pass a callback, use default article fetching
        if (args.length === 1) {
            cb = args[0];
            articles = module.defaults.get_articles();
        }
        // If passed article callable, call it
        if (typeof(articles)==='function') {
            articles = articles();
        }
        // If passed article object, convert to list
        if ( ! module.helpers.isArray(articles)) {
            articles = module.helpers.articles_object_to_list(articles);
        }
        
        var endpoint = "http://bootstrap.{domain}{path}",
            hash = module.helpers.hash_articles(articles);

        if (hash == null) {
            if (typeof(nodata_cb) === 'function') {
                nodata_cb();
            }
            return;
        }
        // Create the URL from template
        endpoint = endpoint.replace('{domain}', module.helpers.get_domain() || LF_DOMAIN)
                           .replace('{path}', LF_NCOMMENTS_PATH)
                           .replace('{hash}', hash);
        
        var jsonp_cb = function(article_counts) {
            fetch_attempts = fetch_attempts + 1;

            if (article_counts.status === 'ok') {
                var article_elements = module.helpers.articles_list_to_object(articles),
                    article_counts = module.helpers.ensure_correct_articles_object(article_counts.data),
                    merged_articles = module.helpers.merge_articles_objects(article_counts, article_elements);
                // This way callback function has access to elements already
                cb.call(null, merged_articles);
            } else if (article_counts.code == 503 && fetch_attempts < MAX_FETCH_ATTEMPTS) {
                // Wait a bit and try again
                setTimeout(function() {
                    module.helpers.jsonp(endpoint, {}, jsonp_cb);
                }, (article_counts.data.wait || DEFAULT_RETRY_TIMEOUT));
            }
        }
        module.helpers.jsonp(endpoint, {}, jsonp_cb);
    };
    
    /**
     * Legacy automatic ncomments behavior
     */
    module.auto_legacy = function() {
        module.fetch(module.defaults.get_articles_legacy(), module.defaults.replace_all);
    }
    /**
     * Official 'auto' behavior. Comment counts need the 'livefyre-commentcount
     * class, and attributes
     */
    module.auto = function() {
        module.fetch(module.defaults.get_articles(), module.defaults.replace_all);
    }


    /**
     * Implements automatic behavior (using legacy default article
     * gatherer and rendering callback if #bn= is on URL).
     */
    module.helpers.on_window_load(function() {
        if (module.loaded) {
            return;
        }
        var bn = module.defaults.get_site_id_from_script_src();
        if (bn) {
            module.auto_legacy();
        }
        else {
            module.auto();
        }
    });

    /**
     * Is the DOM ready?
     * Can be overwritten by module.run
     */
    module.loaded = false;

    /**
     * Run right away
     * Useful to trigger at bottom of page, instead of waiting for DOM to be ready
     */
    module.run = function() {
        if (!module.loaded) {
            module.auto();
            // auto calls out to fetch, which will set module.loaded=true
        }
    };


    LF.CommentCount = module;
};
LF.modules.CommentCount(LF);

