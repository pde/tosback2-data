String.prototype.ltrim = function() {
    return this.replace(/^\s+/,"");
}

ch_ad_url = '';
ch_chitika_loaded = true;
ch_amm_version = "1.15.0";

function dq(s) { return (s != null) ? '"' + s + '"' : '""'; }
function ch_au(p,v) { if (v) { window.ch_ad_url += '&' + p + '=' + v; } }
function ch_aue(p,v) { if (v) { ch_au(p,encodeURIComponent(v)); } }
function ch_aun(p, v) { if (v) { ch_au(p, v.replace(/[\W]+/, '_').toLowerCase()); } }
function ch_def(v, def) { return (v) ? v : def; }

function ch_ad_render_search(response) {
    var w = window;
    if (response === undefined) {
        response = w.ch_mmhtml;
    }

    if (response !== undefined) {
        var thehtml = w.ch_mmhtml["output"];
        if (thehtml) {
            ch_decision(response, true);
            return;
        }
    }
    ch_decision(response, false);
}

function ch_get_real_height(body) {
    if (navigator.userAgent.match(/MSIE [6-8]\.0/)) {
        return body.scrollHeight;
    }
    return body.offsetHeight;
}

function ch_ad_locate(obj) {
    var objPos = {'x':0,'y':0};
    try {
        if(obj.offsetParent) {
            while(1) {
                objPos.x += obj.offsetLeft;
                objPos.y += obj.offsetTop;
                if(!obj.offsetParent) { break; }
                obj = obj.offsetParent;
            }
        } else if(obj.x && obj.y) {
            objPos.x += obj.x;
            objPos.y += obj.y;
        }
    } catch (err) {
        objPos.x = -1;
        objPos.y = -1;
    }
    return objPos;
}

function ch_add_script(url) {
    if (typeof(url) !== 'string') {return undefined;}
    var h = document.getElementsByTagName('head')[0];
    if (!h) {return undefined;}
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = url;
    h.appendChild(s);
    return s;
}

function get_text(node) {
    var r = '';

    if (node.innerText !== undefined) {
        r = node.innerText;
    } else if (node.textContent !== undefined) {
        r = node.textContent;
    }

    return r;
}

function ch_get_snippet(){
    try{
        var snippetPriority = new Array('title', 'h1', 'keywords', 'description');
        var snippetCount = 1;
        var snippetMaxLength = 100;
        var snippetData = new Array();

        if (document.getElementsByTagName){
            var metaTags = document.getElementsByTagName('meta');
            for(var meta=0; meta<metaTags.length; meta++){
                var name    = metaTags[meta].getAttribute('name'),
                    content = metaTags[meta].getAttribute('content');

                if (name && content) {
                    snippetData[name.toLowerCase()] = content;
                }
            }
            if (document.title){ snippetData['title'] = document.title; }

            var tags = document.getElementsByTagName('h1');
            if (tags.length > 0) {
                snippetData['h1'] = get_text(tags[0]);
            }
        }
        var snipCount = 0;
        for ( var snip in snippetPriority ) {
            if (snipCount >= snippetCount) { break; }
            var snippet = snippetPriority[snip];
            if (snippetData[snippet]) {
                snipCount++;
                ch_aue('snip_' + snippet, snippetData[snippet].substring(0, snippetMaxLength));
            }
        }
    }catch(err){}
}

function ch_get_style(x, styleProp) {
    if (x.currentStyle) {
        return x.currentStyle[styleProp];
    } else if (window.getComputedStyle) {
        return document.defaultView.getComputedStyle(x,null).getPropertyValue(styleProp);
    }
}

function append_func(o, a) {
    return function (e) {
        if (typeof(o) == "function") { o(e); }
        return a(e);
    };
}

function ch_write_iframe(f, thehtml, r, width, height) {
    var w = window;

    var d = w.ch_dim["ch_ad"+r];
    if (typeof(f) == "undefined"){
        return; //f was undefined crashing Chrome for Mac.
    }

    var fobj = document.createElement("iframe");
    var _id = "ch_ad_ctr"+r;
    fobj.src = "about:blank";
    try {fobj.contentWindow.document.designMode = "on";} catch (e) {}
    fobj.border = "0";
    fobj.style.margin = fobj.style.padding = fobj.style.border= 0;
    fobj.padding = "0";
    fobj.frameBorder = 0;
    fobj.marginWidth = 0;
    fobj.marginHeight = 0;
    fobj.vspace = 0;
    fobj.hspace = 0;
    fobj.scrolling = "no";
    fobj.setAttribute("class", "chitikaAdBlock");
    fobj.setAttribute("allowTransparency", "allowTransparency");
    fobj.setAttribute("name", _id);
    fobj.setAttribute("id", _id);

    // If we specified fluid width
    var fctr = document.createElement("div");	// Create a container div
    fctr.style.position = 'static';
    fctr.appendChild(fobj);
    if(d[6]){
        try{
            try{fctr.style.zoom = 1;}catch(e){}		// Makes IE6 behave. Zoom is not a standard property, so suppress any possible errors in other browsers
            fctr.style.width = "auto";				// Width auto and overflow hidden trigger a special box rendering mode, which causes
            fctr.style.overflow = "hidden";			// the element to not flow under floated elements
            fobj.style.width = "100%";				// Thus allowing us to specify 100% width on the iframe without breaking the page
            fctr.style.position = 'relative';
        }catch(e){}
    }
    // If we specified fluid height
    if(d[7]){
        try{
            // The function we use to resize
            var ch_resize_height = function() {
                try{
                    _height = ch_get_real_height(fobj.contentWindow.document.body);
                    if(!fobj.bResizeSet) {
                        if(w.addEventListener){
                            fobj.contentWindow.onresize = append_func(fobj.contentWindow.onresize, fobj.onload);
                        }else{
                            fobj.contentWindow.attachEvent("onresize", fobj.onload);
                        }
                        fobj.bResizeSet = true;
                    }
                    fobj.style.height = "" + _height + "px";
                }catch(e){ }
                return true;
            }
            if(window.addEventListener){ // This is the standardized method, but...
                fobj.onload = append_func(fobj.onload, ch_resize_height); // We can assign functions directly
                w.onresize = append_func(w.onresize, ch_resize_height);
            }else{ // IE doesn't use the standardized function
                fobj.attachEvent("onload", append_func(fobj.onload, ch_resize_height)); // And we have to use attachEvent, because it doesn't like
                w.attachEvent("onresize",  append_func(w.onreszize, ch_resize_height)); // direct assignment of onload.
                fobj.ch_resize = ch_resize_height;
            }
        }catch(e){}
    }

    var tries = 0;
    var interval;

    var checkDisplay = function() {
        if (typeof(f) == "undefined" || f == null){
            w.clearInterval(interval);
            return;
        }
        if (tries++ > 70) {
            w.clearInterval(interval);
        }
        var p = fobj;
        noDisplayNone = true;
        while (p != null) {
            try {
                st = ch_get_style(p, "display");
                if (st == "none") {
                    noDisplayNone = false;
                    break;
                }
            } catch(e) {}
            p = p.parentNode;
        }
        try{ p = f.parentNode; } catch(e){return;}
        if (noDisplayNone) {
            w.clearInterval(interval);
            if (width && height) {
                fobj.width = width;
                fobj.height = height;
            } else {
                fobj.width = d[0];fobj.height = d[1];
            }
            if(typeof(fctr) != "undefined"){
                f.parentNode.insertBefore(fctr,f);
            }else{
                f.parentNode.insertBefore(fobj,f);
            }
            try{
                var fdoc = fobj.contentWindow.document;
                fdoc.open();
                fdoc.write(thehtml);
                // setTimeout for a bug fix; for some reason the document's onload event doesn't fire if the containing element has position set, unless I add a delay...
                setTimeout(function() { fdoc.close(); }, 16);
                if(typeof(fobj.ch_resize) != "undefined") {
                    fobj.ch_resize();
                }
            }catch(e){}
        }
    }
    interval = w.setInterval(checkDisplay, 100);
}

function ch_decision(response, render) {
    var w = window;
    var r = response["cb"];
    var thehtml = response["output"];
    var f = document.getElementById("ch_ad"+r);
    if (!f) {return;}

    if (response["js"]) {
        for (var i = 0; i < response.js.length; i++) {
            var url = response.js[i];
            ch_add_script(url);
        }
    }

    if (response["hover"]) {
        w.ch_hover_content = response["hover"]["html"];
        w.ch_mobile_height = response["hover"]["height"];
        w.ch_mobile_width = response["hover"]["width"];
        w.ch_mobile_padding = response["hover"]["padding"];
        if (response["hover"]["type"] === 'hover-iphone2' ||
            response["hover"]["type"] === 'hover-iphone-call') {
            ch_add_script('http://maps-static.chitika.net/js/m.js');
        } else if (response["hover"]["type"] === 'hover-ipad') {
            ch_add_script('http://maps-static.chitika.net/js/m.js');
        } else if (response["hover"]["type"] === 'hover-pc') {
            ch_add_script('http://scripts.chitika.net/mobile/js/pc.js');
        } else {
            ch_add_script('http://maps-static.chitika.net/js/m.js');
            var mobileCSS = document.createElement('link');
            mobileCSS.type = 'text/css';
            mobileCSS.rel = 'stylesheet';
            mobileCSS.href = 'http://maps-static.chitika.net/misc/m.css';
            ch_pg_head.appendChild(mobileCSS);
        }
    }

    if (response["pixels"]) {
        for (var k = 0; k < response.pixels.length; k++) {
            var url = response.pixels[k];
            var fimg = document.createElement("img");
            fimg.border = 0;
            fimg.style.border = 'none';
            fimg.style.display = 'none';
            fimg.width = 1;
            fimg.height = 1;
            fimg.src = url;
            document.body.appendChild(fimg);
        }
    }

    if (thehtml && render) {
        ch_write_iframe(f, thehtml, r, null, null);
    } else {
        f.style.display = "none";
        ch_chitika_loaded = false;

        if (response["alturl"]) {
            var d = w.ch_dim["ch_ad"+r];
            var fobj = document.createElement("iframe");
            fobj.src = response["alturl"];
            fobj.border = "0";
            fobj.style.margin = fobj.style.padding = fobj.style.border= 0;
            fobj.padding = "0";
            fobj.frameBorder = 0;
            fobj.marginWidth = 0;
            fobj.marginHeight = 0;
            fobj.vspace = 0;
            fobj.hspace = 0;
            fobj.scrolling = "no";
            fobj.setAttribute("class", "chitikaAdBlock");
            fobj.width = d[0];
            fobj.height = d[1];
            f.parentNode.insertBefore(fobj,f);
        }
        if (w["ch_render_fallback"]) {
            return w.ch_render_fallback(r);
        }
    }
}

function ch_mm() {
    var w = window;

    if (w.ch_client == 'byethost11') {
        return;
    }

    if (w.ch_unit_id === undefined) {
        w.ch_unit_id = 0;
    }
    else {
        w.ch_unit_id++;
    }

    w.ch_host = ch_def(w.ch_host, 'mm.chitika.net');
    w.ch_ad_url = 'http://' + w.ch_host + '/minimall?';
    w.ch_impsrc = ch_def(w.ch_impsrc, 'amm');

    // Detect iframes and pass appropriate frm & url values
    try {
        // Are win in an iframe?
        if (w.top.document.location.href == document.location.href) {
            // Nope. Nothing special here to do.
            if (w.ch_pu) {
                ch_aue('dcc2', '1');
            } else {
                w.ch_pu     = document.location.href;
            }
            w.ch_referrer   = document.referrer;
        } else {
            // Yes, we are
            ch_aue('frm', 1);
            ch_aue('serveUrl', document.location.href);
            w.ch_pu         = w.top.document.location.href;
            w.ch_referrer   = w.top.document.referrer;
        }
    } catch (x) { // Security exception
        // Security problem. Try something else. Hope this works...
        ch_aue('frm', 2);
        ch_aue('serveUrl', document.location.href);
        w.ch_pu = document.referrer;
    }

    var m = String(w.location.href).match(/#chitikatest(?:=(.+))?/);
    if (m) {
        var q = m[1];
        if (q == undefined) { q = 'mortgage'; }
        w.ch_referrer = "http://www.google.com/search?q="+q;
        ch_au('ip', 'us');
        ch_au('test', '1');
    }

    if (w.ch_client == 'epodunk') {
        ch_aue('dcc1', '2');
        if (m = w.location.hostname.match(/([^\.]+)\.(com|net|org|info|mobi|co\.uk|org\.uk|ac\.uk|uk)$/)) {
            w.ch_sid = 'epodunk_' + m[1];
        }
    }

    if (w.ch_client.match(/^epodunk_/)) {
        w.ch_sid = w.ch_client;
        w.ch_client = 'epodunk';
    }

    ch_screen = "" + screen.width + "x" + screen.height;
    // Get window size and visible page size; accessed differently for MSIE vs. standards-compliant browsers
    try{
        if (navigator.appName.indexOf("Microsoft") !== -1 &&
            navigator.userAgent.match(/MSIE ([^\.]+)/)[1]*1 < 9) {
            ch_window = document.documentElement.clientWidth + "x" + document.documentElement.clientHeight;
            ch_canvas = document.body.clientWidth + "x" + document.body.clientHeight;
        } else {
            ch_window = window.innerWidth + "x" + window.innerHeight;
            ch_canvas = document.body.clientWidth + "x" + document.body.clientHeight;
        }
    }catch(e){}

    // Get Configuration ID; default to unit-N or SID, if unavailable
    if (!w.ch_cid) {
        if (!w.ch_sid ||
            w.ch_sid == 'Chitika Default') {
            w.ch_cid = 'unit-'+w.ch_unit_id;
        }
        else {
            w.ch_cid = w.ch_sid;
        }
    }

    ch_aue('w', w.ch_width);
    ch_aue('h', w.ch_height);
    ch_aue('client', w.ch_client);
    ch_aue('sid', w.ch_sid);
    ch_aun('cid', w.ch_cid);
    ch_aue('nump', w.ch_nump);
    ch_aue('query', w.ch_query);
    if (w.ch_type) {
        ch_aue('type', w.ch_type);
        if (w.ch_queries && w.ch_queries.constructor.toString().indexOf("Array") != -1) {
            ch_aue('mquery', w.ch_queries.join('|'));
        } else if (w.ch_query) {
            ch_aue('mquery', w.ch_query);
        }
    }
    ch_aue('tptracker', w.ch_third_party_tracker);
    ch_aue('cttarget', w.ch_target);
    ch_aue('noborders', w.ch_noborders);
    ch_aue('cl_border', w.ch_color_border);
    ch_aue('cl_bg', w.ch_color_bg);
    ch_aue('cl_title', w.ch_color_title);
    ch_aue('cl_text', w.ch_color_text);
    ch_aue('cl_site_link', w.ch_color_site_link);
    ch_aue('fn_title', w.ch_font_title);
    ch_aue('fn_text', w.ch_font_text);
    ch_aue('alturl', w.ch_alternate_ad_url);
    ch_aue('altcss', w.ch_alternate_css_url);
    ch_aue('behavioral_window', w.ch_behavioral_window);
    ch_aue('previous_format',w.ch_previous_format);
    ch_aue('must_fill',w.ch_must_fill);
    ch_aue('select',w.ch_select);
    ch_aue('screenres', w.ch_screen);
    ch_aue('winsize', w.ch_window);
    ch_aue('canvas', w.ch_canvas);
    ch_aue('mobile', w.ch_mobile);
    ch_aue('where', w.ch_where);
    ch_aue('history', history.length);
    ch_aue('metro_id', w.ch_metro_id);
    ch_aue('city', w.ch_city);
    ch_aue('state', w.ch_state);
    ch_aue('zip', w.ch_zip);
    ch_aue('impsrc', w.ch_impsrc);
    ch_aue('vsn', ch_amm_version);
    ch_aue('url', w.ch_pu);
    ch_aue('ref', w.ch_referrer);
    ch_aue('cat_id', w.ch_cat_id);
    ch_aue('dpr', w.devicePixelRatio);

    if (w.ch_demo_mode == 1) {
        ch_au('ip', '71.248.173.210');
        ch_au('demomode', '1');
    }

    if (navigator.userAgent.match(/Chrome/) &&
        document.webkitVisibilityState !== undefined &&
        document.webkitVisibilityState == "prerender") {
        ch_au('prerender', 1);
    }

    if (document.location.href.indexOf('##chitika_ab=') !== -1) {
        ch_au('ab_overlay_which', document.location.href.match(/##chitika_ab=([^&]+)/)[1]);
    }

    var r = Math.round(Math.random() * 1000);
    ch_au('cb', r);

    ch_get_snippet();

    if (w.ch_dim === undefined) {
        w.ch_dim = {};
    }

    if (w.ch_bright === undefined) {
        w.ch_bright = {};
    }

    // For list units we pass a string for height, which IE just hates. So, if we're passing a string, we'll fake it out
    // by passing 0. Height is resized by fluidH anyway.
    _dHeight = (typeof(w.ch_height) == "string" || typeof(w.ch_height) == "undefined") ? 0 : w.ch_height;

    w.ch_dim["ch_ad"+r] = [
        w.ch_width,
        _dHeight,
        w.ch_alternate_js_callback,
        undefined,
        undefined,
        undefined,
        w.ch_fluidW,
        w.ch_fluidH
    ];

    w.ch_bright['ch_ad'+r] = {
        client:         w.ch_client,
        cid:            w.ch_cid,
        width:          w.ch_width,
        height:         _dHeight,
        altjscb:        w.ch_alternate_js_callback,
        fluidW:         w.ch_fluidW,
        fluidH:         w.ch_fluidH
    };

    if (w.ch_previous_format){
        w.ch_previous_format = w.ch_previous_format + "," + w.ch_width + "x" + w.ch_height;
    } else {
        w.ch_previous_format = w.ch_width + "x" + w.ch_height;
    }

    document.write('<div id="chitikaAdBeacon-'+r+'"></div>');
    var adBeacon = document.getElementById("chitikaAdBeacon-"+r);
    var adLoc = ch_ad_locate(adBeacon);
    ch_aue("loc", adLoc.x + "," + adLoc.y);

    w.ch_ad_url = w.ch_ad_url.substring(0, 2048);
    w.ch_ad_url = w.ch_ad_url.replace(/%\w?$/, '');

    w.ch_ad_url += "&output=simplejs&callback=ch_ad_render_search";
    if (w.ch_hq){
        var s = ch_add_script('http://scripts.chitika.net/static/hq/'+w.ch_client+'.js');
        s.ch_ad_url = w.ch_ad_url;
        s._fired = false;
        try {
            s.onload = function() {
                if(this._fired) return;
                ch_real_ad_url = this.ch_ad_url;
                ch_hq_execute();
                this._fired = true;
            }
            s.onreadystatechange = function() {
                if(this._fired) return;
                if(this.readyState == "complete" || this.readyState == "loaded") {
                    ch_real_ad_url = this.ch_ad_url;
                    ch_hq_execute();
                    this._fired = true;
                }
            }
        }catch(e){}
    } else {
        ch_add_script(w.ch_ad_url);
    }
    if(!w.ch_ad_urls) w.ch_ad_urls = [];
    w.ch_ad_urls['ch_ad'+r] = w.ch_ad_url;
    w.ch_last_ad_url = w.ch_ad_url;

    w.ch_ad_url = "about:blank";

    document.write('<ifr' + 'ame' + ' id="ch_ad'+r+'" name="ch_ad'+r+'"' + ' width="0" height="0" frameborder="0"' + ' src=' + dq(w.ch_ad_url) + ' marginwidth="0"' + ' marginheight="0"' + ' vspace="0"' + ' hspace="0"' + ' allowtransparency="true"' + ' scrolling="no">' + '</ifr' + 'ame>');
    ch_clear();
}

function ex_normal_op(){
    ch_add_script(window.ch_real_ad_url);
}

function ch_clear() {
    var w = window;
    //w.ch_ad_url = undefined;
    w.ch_alternate_ad_url = undefined;
    w.ch_alternate_css_url = undefined;
    w.ch_append_tracking = undefined;
    w.ch_behavioral_window = undefined;
    w.ch_cat_id = undefined;
    w.ch_cid = undefined;
    w.ch_city = undefined;
    w.ch_fluidH = undefined;
    w.ch_fluidW = undefined;
    w.ch_height = undefined;
    w.ch_host = undefined;
    w.ch_impsrc = undefined;
    w.ch_metro_id = undefined;
    w.ch_must_fill = undefined;
    w.ch_noborders = undefined;
    w.ch_nump = undefined;
    w.ch_query = undefined;
    w.ch_select = undefined;
    w.ch_sid = undefined;
    w.ch_state = undefined;
    w.ch_type = undefined;
    w.ch_where = undefined;
    w.ch_width = undefined;
    w.ch_zip = undefined;
}

ch_mm();
