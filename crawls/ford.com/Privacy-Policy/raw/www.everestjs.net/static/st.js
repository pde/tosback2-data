var ef_userid = 0;
var ef_pixel_host = "pixel.everesttech.net";
var ef_event_type = "pageview";
var ef_transaction_properties = "";
var ef_impression_properties = "";
var ef_pageview_properties = "";
var ef_segment = "";
var ef_search_segment = "";
var ef_transaction_object = {};
var ef_in_floodlight = 0;
/*
 * hold a list of transaction objects.
 */
var __ef_tol = []; //ef_transaction_object_list
function add_ef_transaction_property() {
    __ef_tol[__ef_tol.length] = ef_transaction_object;
    ef_transaction_object = {};
}


/* set up some globals */
var __loc = document.location.toString();
var __ref = document.referrer;
/* find and store all query params */

function parse_query(u) {
    var a = u.match(/\?(.+)$/);
    var ql = {};
    if (a && a.length !== 0) {
	var prms = a[1];
	prms = prms.split("&");
	for(var i=0;i<prms.length;i++) {
            var t = prms[i].indexOf("=");
            ql[prms[i].slice(0, t)] = unescape(prms[i].slice(t+1));
            //ql[t[0]] = unescape(t[1]);
	}
    }
    return ql;
}
var __ql = parse_query(__loc);
var __qr = parse_query(__ref);
/* http or https? */
var __prot = document.location.protocol=="https:"?"https:":"http:";
/* generic firing function. fires pixels/loads js */
function __ef_fire(e, u) {
    var d = document;
    if (e == "img") {
        var i = new Image(1, 1);
        i.style.display = 'none';
        i.src = u;
    } else if (e == "js") {
        var __h = d.getElementsByTagName('head');
        if (__h[0]) {
           var __s = d.createElement("script");
           __s.setAttribute("language", "Javascript");
           __s.setAttribute("type", "text/javascript");
           __s.setAttribute("src", u);
           __h[0].appendChild(__s);
        } else {
	   d.write("<scr" + "ipt language='JavaScr" + "ipt' ");
	   d.write ("type='text/javascr" + "ipt' src='");
	   d.write(u);
	   d.write("'><\/scr"+"ipt>");
        }
    }
}

/* 
 * ef_fire_generic_pixel()
 * x is the event to fire.
 * props is a string which has all the properties to be sent to the pixel.
 * if sp is true then 2 special properties are appended: ev___loc and ev___ref
 * which are the location and the referral url for the page resp.
 */
function __ef_fgp(x, props, sp) {
    var u = __prot + "//" + ef_pixel_host +"/" + ef_userid + "/"+ x;
    if (props) {
	u = u + "?" + props;
    }
    if (sp) {
	var dlm = props ? "&":"?";
	u = u + dlm + "ev___loc=" + escape(__loc) + "&ev___ref=" + escape(__ref);
    }
    __ef_fire("img", u);
}
/* ef_fire_generic_javascript */
function __ef_fgjs(s) {
    var pu = __prot + "//" + ef_pixel_host + "/" + ef_userid + "/js";
    var u = __prot + "//" + "www.everestjs.net" + "/dl/" + s + ".js";
    pu = pu + "?url=" + escape(u);
    __ef_fire("js", pu);
}


/* ef_fire_pageview_pixel() */
function __ef_fpp() {
    __ef_fgp("v", ef_pageview_properties, 1);
}
/* ef_fire_impression_pixel() */
function __ef_fip() {
    __ef_fgp("i", ef_impression_properties, 1);
}
/* 
 * ef_fire_transaction_pixel() 
 * first fire a pixel with any transaction properties.
 * if ef_tol is non-empty, fire a pixel per object.
 */
function __ef_ftp() {
    if (ef_transaction_properties) {
	__ef_fgp("t", ef_transaction_properties, 0);
    } else {
	for (var i = 0; i < __ef_tol.length; i++) {
	    var ef_tp = [];
	    for (var k in __ef_tol[i]) {
		if (__ef_tol[i].hasOwnProperty(k)) {
		    ef_tp[ef_tp.length] = k+"="+escape(__ef_tol[i][k]);
		}
	    }
	    __ef_fgp("t", ef_tp.join("&"), 0);
	}
    }
}

function __cat(x, y) {
    return x + ".*(\\?|&)" + y + "=.*";
}


var __search_patterns = [__cat("maynard", "q"), __cat("google", "q"), __cat("yahoo", "p"), __cat("msn", "q"), __cat("bing", "q"), __cat("aol", "query"), __cat("aol", "encquery"), __cat("lycos", "query"), __cat("ask", "q"), __cat("altavista", "q"), __cat("netscape", "query"), __cat("cnn", "query"), __cat("looksmart", "qt"), __cat("about", "terms"), __cat("mamma", "query"), __cat("alltheweb", "q"), __cat("gigablast", "q"), __cat("voila", "rdata"), __cat("virgilio", "qs"), __cat("live", "q"), __cat("baidu", "wd"), __cat("alice", "qs"), __cat("yandex", "text"), __cat("najdi", "q"), __cat("aol", "q"), __cat("club-internet", "query"), __cat("mama", "query"), __cat("seznam", "q"), __cat("search", "q"), __cat("wp", "szukaj"), __cat("onet", "qt"), __cat("netsprint", "q"), __cat("google.interia", "q"), __cat("szukacz", "q"), __cat("yam", "k"), __cat("pchome", "q"), __cat("kvasir", "searchExpr"), __cat("sesam", "q"), __cat("ozu", "q"), __cat("terra", "query"), __cat("nostrum", "query"), __cat("mynet", "q"), __cat("ekolay", "q"), __cat("search.ilse", "search_for")];

function __is_search_click() {
    var efid_parts, i, p;

    for (i = 0; i < __search_patterns.length; i++) {
	p = __search_patterns[i];
	if (__ref.match(p)) {
	    return 1;
	}
    }
    if ((__ql.ef_id !== undefined) || (ef_in_floodlight != 0 && __qr.ef_id !== undefined)) {
	if (__ql.ef_id !== undefined) {
	    efid_parts = __ql.ef_id.split(":");
	} else {
	    efid_parts = __qr.ef_id.split(":");
	}
	if (efid_parts[0] == "EF_IDV2") {
	    if (efid_parts.length >= 6 && efid_parts[5] == "s") {
		return 1;
	    }
	} else {
            var last_part = efid_parts[efid_parts.length-1];
            if (last_part.length == 1) {
               if (last_part == "s") {
                   return 1;
               }
             } else {
	       return 1;
             }
	}
    }
    return 0;
}
/* 
 * ef_fire_segment_pixels().
 * you should only call this function if ef_segment is non-zero.
 * fire the segment pixel.
 * if ef_search_segment is non-zero and ef_id is in the url
 * then fires a segment with the ef_search_segment.
 */
function __ef_fsp() {
    __ef_fgjs(ef_userid + "/" + ef_userid + "-" + ef_segment);
    if (ef_search_segment && __is_search_click()) {
	__ef_fgjs(ef_userid + "/" + ef_userid + "-" + ef_search_segment);
    }
}
/* ef_fire_custom_javascript */
function __ef_fcjs() {
    __ef_fgjs(ef_userid + "/" + ef_userid + "-ef-custom");
}    

/* Fire mapping pixels */
function __ef_fmp() {
    if (__prot === "http:") {
        var u = "http://pixel.everesttech.net/2368/gr?url=/static/everest/static/images/1x1.png";
        __ef_fire("img", u);
        //u = "http://pixel.everesttech.net/2368/gr?url=http%3A//tag.admeld.com/id%3Fadmeld_provider_id%3D566%26external_user_id%3D__EFGCK__%26redirect%3Dhttp%253a//pixel.everesttech.net/static/everest/static/images/1x1.png";
        //__ef_fire("img", u);
    }
}

/*
 * fire appropriate pixel.
 * if segmentation is enabled, fire segment pixels.
 * fire custom js
 */
function ef_fire_pixels() {
    if (ef_event_type == "pageview") {
	__ef_fpp();
    } else if (ef_event_type == "impression") {
	__ef_fip();
    } else if (ef_event_type == "transaction") {
        if (ef_userid == 2504) {
           __ef_fpp();
        }
	__ef_ftp();
    }
    if (ef_segment) {
	__ef_fsp();
    }
    __ef_fmp();
    //__ef_fcjs();
}

function effp() {
    ef_fire_pixels();
}

