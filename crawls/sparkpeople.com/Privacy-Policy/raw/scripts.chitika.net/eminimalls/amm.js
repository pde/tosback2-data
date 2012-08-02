String.prototype.ltrim = function() {
    return this.replace(/^\s+/,"");
}

ch_ad_url = '';
ch_oeh = window.onerror;
ch_chitika_loaded = true;
ch_loaded = 0;
ch_amm_version = "1.11.1";
ch_osnap_loaded = 0;

function dq(s) { return (s != null) ? '"' + s + '"' : '""'; }
function ch_au(p,v) { if (v) { window.ch_ad_url += '&' + p + '=' + v; } }
function ch_aue(p,v) { if (v) { ch_au(p,escape(v)); } }
function ch_def(v, def) { return (v) ? v : def; }

function ch_ad_render_search() {
    var w = window;
    if(typeof(w["ch_mmhtml"])!="undefined") {
        var thehtml = w.ch_mmhtml["output"];
        if (thehtml) {
            ch_decision(true);
            return;
        }
    }
    ch_decision(false);
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
            if (document.getElementsByTagName('h1').length > 0) { snippetData['h1'] = document.getElementsByTagName('h1')[0].innerHTML.replace(/(<([^>]+)>)/ig, '') }
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
                if(d[8] && d[8].length > 0) {
                    fobj.contentWindow.ch_extra_pins = d[8];
                    var ch_imp_pins = function() {
                        if(d[8] && d[8].length > 0 && fobj.contentWindow.ImportPins) {
                            fobj.contentWindow.ImportPins(d[8]);
                        }
                    }
                    if(window.attachEvent) {
                        fobj.attachEvent('onload', ch_imp_pins);
                    } else if(window.addEventListener) {
                        fobj.contentWindow.addEventListener('load', ch_imp_pins, false);
                    } else {
                        try {
                            fobj.onload = ch_imp_pins;
                        }catch(e){}
                    }
                }
                // ch_follow
                if(d[9]) {
                    fctr.style.display = 'block';
                    var ch_follow = function () {
                        if(typeof(this.moving) == 'undefined') this.moving = false;
                        if(typeof(this.prevScreen) == 'undefined') this.prevScreen = 0;
                        if(typeof(this.c) == "undefined") this.c = 0;
                        this.position = ch_ad_locate(this);
                        var screenY = 0;
                        if(typeof(window.pageYOffset) == 'number') {
                            screenY = window.pageYOffset;
                        }else if(document.body && document.body.scrollTop) {
                            screenY = document.body.scrollTop;
                        }else if(document.documentElement && document.documentElement.scrollTop){
                            screenY = document.documentElement.scrollTop;
                        }
                        if(this.prevScreen == screenY && !this.moving) return false;
                        this.prevScreen = screenY;
                        var baseY = this.position.y - this.offsetTop;
                        var dest = screenY - baseY;
                        var diff = dest - this.offsetTop;
                        var pos = this.offsetTop + Math.ceil(diff/16);
                        if(window.ch_follow_bottom) {
                            var bottom = window.ch_follow_bottom - this.offsetHeight;
                            if(pos > (bottom-baseY)) pos = (bottom-baseY);
                        }
                        if(pos < 0) pos = 0;
                        this.style.top = '' + pos + 'px';
                        this.moving = ((diff != 0 && dest >= 0) || (dest <= 0 && pos != 0) ? 1 : 0);
                    }
                    fctr.ch_follow = ch_follow;
                }
                var fdoc = fobj.contentWindow.document;
                fdoc.open();
                fdoc.write(thehtml);
                // setTimeout for a bug fix; for some reason the document's onload event doesn't fire if the containing element has position set, unless I add a delay...
                setTimeout(function() { fdoc.close(); window.ch_pending_requests--; }, 16);
                if(typeof(fobj.ch_resize) != "undefined") {
                    fobj.ch_resize();
                }
                if(typeof(fctr.ch_follow) != 'undefined') {
                    setInterval(function() { fctr.ch_follow() }, 16);
                }
            }catch(e){}
        }
    }
    interval = w.setInterval(checkDisplay, 100);
}

function ch_decision(render) {
    var w = window;
    var r = w.ch_mmhtml["cb"];
    var thehtml = w.ch_mmhtml["output"];
    var f = document.getElementById("ch_ad"+r);
    if (!f) {return;}

    if (w.ch_mmhtml['osnap']) {
        ch_add_script('http://scripts.chitika.net/eminimalls/osnap.js');
    }

    if (w.ch_mmhtml["js"]) {
        for (var i = 0; i < w.ch_mmhtml.js.length; i++) {
            var url = w.ch_mmhtml.js[i];
            ch_add_script(url);
        }
    }

    if (w.ch_mmhtml["hover"]) {
        w.ch_hover_content = w.ch_mmhtml["hover"]["html"];
        w.ch_mobile_height = w.ch_mmhtml["hover"]["height"];
        w.ch_mobile_width = w.ch_mmhtml["hover"]["width"];
        w.ch_mobile_padding = w.ch_mmhtml["hover"]["padding"];
        if (w.ch_mmhtml["hover"]["type"] === 'hover-iphone2' ||
            w.ch_mmhtml["hover"]["type"] === 'hover-iphone-call') {
            ch_add_script('http://labs.chitika.com/sandbox/m.js');
        } else if (w.ch_mmhtml["hover"]["type"] === 'hover-ipad') {
            ch_add_script('http://labs.chitika.com/sandbox/m.js');
        } else if (w.ch_mmhtml["hover"]["type"] === 'hover-pc') {
            ch_add_script('http://scripts.chitika.net/mobile/js/pc.js');
        } else {
            ch_add_script('http://labs.chitika.com/sandbox/m.js');
            var mobileCSS = document.createElement('link');
            mobileCSS.type = 'text/css';
            mobileCSS.rel = 'stylesheet';
            mobileCSS.href = 'http://labs.chitika.com/sandbox/m.css';
            ch_pg_head.appendChild(mobileCSS);
        }
    }

    if (w.ch_mmhtml["pixels"]) {
        for (var k = 0; k < w.ch_mmhtml.pixels.length; k++) {
            var url = w.ch_mmhtml.pixels[k];
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
        w.ch_pending_requests--;
        f.style.display = "none";
        ch_chitika_loaded = false;

        if (w.ch_mmhtml["alturl"]){
            if (f){
                var d = w.ch_dim["ch_ad"+r];
                var fobj = document.createElement("iframe");
                fobj.src = w.ch_mmhtml["alturl"];
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
        }
        w.ch_default_render_fallback(r);
    }
}

function ch_default_render_fallback(r) {
    var w = window;
    var d = document;
    if (w["ch_render_fallback"]) {
        return w.ch_render_fallback(r);
    }
    var ow,owl,di,dobj,content,s;
    ow = document.write;
    owl = document.writeln;
    var f = d.getElementById("ch_ad"+r);
    di = w.ch_dim["ch_ad"+r];
    if (typeof(di[2]) == "undefined") {
        di[2] = function () {};
    }
    w.ch_alternate_ad_js = di[3];
    w.ch_alternate_ad_html = di[4];
    w.ch_alternate_ad_blank = di[5];

    if (!w.ch_alternate_ad_js && !w.ch_alternate_ad_html && !di[2] && !w.ch_alternate_ad_blank) {
        return;
    }
    dobj = d.createElement("div");
    if (f) {
        f.parentNode.insertBefore(dobj,f);
    }
    var dio = function () {
        if (f) {
            d.write = function (c) {dobj.innerHTML += c;};
            d.writeln = function (c) {d.write(c+"\n");};
        }
    };
    var dif = function () {
        d.write = ow;
        d.writeln = owl;
    };
    var load;
    if (w.ch_alternate_ad_js) {
        if (f) {
            load = function (e) {
                dio();
                di[2]();
                s=d.createElement("script");
                s.type = "text/javascript";
                s.src = w.ch_alternate_ad_js;
                f.parentNode.insertBefore(s,f);
            };
        } else {
            load = function (e) {
                dio();
                di[2]();
                d.write(unescape("%3Cscript%20type%3D%22text/javascript%22%20src%3D%22"+escape(w.ch_alternate_ad_js)+"%22%3E%3C/script%3E"));
            };
        }
    } else if (w.ch_alternate_ad_html) {
        load = function (e) {
            dio();
            di[2]();
            d.write(w.ch_alternate_ad_html);
            dif();
        };
    } else if (w.ch_alternate_ad_blank) {
        load = function (e) {
            dio();
            di[2]();
            d.write(unescape("%3Cdiv%20style%3D%22width%3A%20"+d[0]+"px%3Bheight%3A%20"+d[1]+"px%3Bborder%3A0%3Bmargin%3A0%3B%22%3E%3C/div%3E"));
            dif();
        };
    } else {
        load = function (e) {
            dio();
            di[2]();
        }
    }
    if (!ch_loaded && f) {
        w.onload = append_func(w.onload, load);
        dif();
    } else {
        load(0);
        if (!f) {
            dif();
        }
    }
}

function ch_mm() {
    var w = window;

    if (w.ch_client == 'byethost11') {
        return;
    }

    if (w.ch_pending_requests === undefined) {
        w.ch_pending_requests = 0;
    }
    w.ch_pending_requests++;

    w.ch_host = ch_def(w.ch_host, 'mm.chitika.net');
    w.ch_ad_url = 'http://' + w.ch_host + '/minimall?';
    w.ch_cid = ch_def(ch_def(w.ch_cid, w.ch_sid), 'default');
    w.ch_impsrc = ch_def(w.ch_impsrc, 'amm-'+w.ch_amm_version);

    w.ch_referrer = document.referrer;

    var m = String(w.location.href).match(/#chitikatest(?:=(.+))?/);
    if (m) {
        var q = m[1];
        if (q == undefined) { q = 'mortgage'; }
        w.ch_referrer = "http://www.google.com/search?q="+q;
        ch_au('ip', 'us');
        ch_au('test', '1');
    }

    w.onerror = w.ch_oeh;

    if (w.ch_append_tracking) {
        ch_aue('dcc1', '1');
        w.ch_client = w.ch_client + "_" + w.ch_append_tracking;
    } else if (w.ch_client == 'epodunk') {
        ch_aue('dcc1', '2');
        if (m = w.location.hostname.match(/([^\.]+)\.(com|net|org|info|mobi|co\.uk|org\.uk|ac\.uk|uk)$/)) {
            w.ch_sid = 'epodunk_' + m[1];
        }
    }

    if (w.ch_client.match(/^epodunk_/)) {
        w.ch_sid = w.ch_client;
        w.ch_client = 'epodunk';
    } else if (w.ch_client.match(/^hgm_/)) {
        w.ch_sid = w.ch_client;
        w.ch_client = 'carconnection';
    }

    ch_screen = "" + screen.width + "x" + screen.height;
    if (navigator.appName.indexOf("Microsoft") != -1) {
        ch_window = "" + document.body.offsetWidth + "x" + document.body.offsetHeight;
    } else {
        ch_window = "" + w.outerWidth + "x" + w.outerHeight;
    }
    ch_canvas = "" + document.body.clientWidth + "x" + document.body.clientHeight;

    ch_aue('w', w.ch_width);
    ch_aue('h', w.ch_height);
    ch_aue('client', w.ch_client);
    ch_aue('sid', w.ch_sid);
    ch_aue('cid', w.ch_cid);
    ch_aue('nump', w.ch_nump);
    ch_aue('query', w.ch_query);
    if(w.ch_local_enabled) w.ch_type = "map";
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
    ch_aue('backfill',w.ch_backfill);
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
    ch_aue('theme',w.ch_theme);
    ch_aue('select',w.ch_select);
    ch_aue('screenres', w.ch_screen);
    ch_aue('winsize', w.ch_window);
    ch_aue('canvas', w.ch_canvas);
    ch_aue('extra_poi', w.ch_poi);
    ch_aue('mobile', w.ch_mobile);
    ch_aue('where', w.ch_where);
    ch_aue('frm', w.top.location != document.location ? 'true' : 'false');
    ch_aue('history', history.length);
    ch_aue('metro_id', w.ch_metro_id);
    ch_aue('city', w.ch_city);
    ch_aue('state', w.ch_state);
    ch_aue('zip', w.ch_zip);
    ch_aue('impsrc', w.ch_impsrc);
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
        w.ch_alternate_ad_js,
        w.ch_alternate_ad_html,
        w.ch_alternate_ad_blank,
        w.ch_fluidW,
        w.ch_fluidH,
        w.ch_extra_pins,
        w.ch_follow
    ];

    w.ch_bright['ch_ad'+r] = {
        client:         w.ch_client,
        cid:            w.ch_cid,
        width:          w.ch_width,
        height:         _dHeight,
        altjscb:        w.ch_alternate_js_callback,
        altjsad:        w.ch_alternate_ad_js,
        althtml:        w.ch_alternate_ad_html,
        altblank:       w.ch_alternate_ad_blank,
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

function ch_eh(m,u,l) {
    ch_mm();
    return true;
}

function ch_clear() {
    var w = window;
    //w.ch_ad_url = undefined;
    w.ch_alternate_ad_url = undefined;
    w.ch_alternate_css_url = undefined;
    w.ch_append_tracking = undefined;
    w.ch_backfill = undefined;
    w.ch_behavioral_window = undefined;
    w.ch_cat_id = undefined;
    w.ch_cid = undefined;
    w.ch_city = undefined;
    w.ch_extra_pins = undefined;
    w.ch_fluidH = undefined;
    w.ch_fluidW = undefined;
    w.ch_follow = undefined;
    w.ch_height = undefined;
    w.ch_host = undefined;
    w.ch_impsrc = undefined;
    w.ch_local_enabled = undefined;
    w.ch_metro_id = undefined;
    w.ch_must_fill = undefined;
    w.ch_noborders = undefined;
    w.ch_nump = undefined;
    w.ch_pu = undefined;
    w.ch_query = undefined;
    w.ch_select = undefined;
    w.ch_sid = undefined;
    w.ch_state = undefined;
    w.ch_theme = undefined;
    w.ch_type = undefined;
    w.ch_where = undefined;
    w.ch_width = undefined;
    w.ch_zip = undefined;
}

window.onerror = ch_eh;

if (window.ch_pu == null) {
    ch_pu = "" + document.location;
    if (window.ch_post != null){
        var post = document.getElementById(window.ch_post);
        if (post == null){ /* try reading the name? */ }
        else{
            if (post.value != null){    post = post.value;      }
            else{                       post = post.innerHTML;  }
        }
        if (post != null){
            post = post.replace(/\n/g,',').replace(/\s/g,' ');
            if (ch_pu.indexOf("?") >= 0){
                ch_pu = ch_pu + '&' + window.ch_post + '=' + escape(post);
            }
            else{
                ch_pu = ch_pu + '?' + escape(post);
            }
        }
    }
} else {
    ch_loc = document.location;
}

ch_mm();
