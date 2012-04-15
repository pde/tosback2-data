var dc_tiles  = {},
		dc_numads = 0,
		c_domain  = {
			"mlb" : "mlb",
			"ana" : "angels",
			"ari" : "diamondbacks",
			"atl" : "braves",
			"bal" : "orioles",
			"bos" : "redsox",
			"chc" : "cubs",
			"cin" : "reds",
			"cle" : "indians",
			"col" : "rockies",
			"cws" : "whitesox",
			"det" : "tigers",
			"fla" : "marlins", /* can be removed eventually... */
			"hou" : "astros",
			"kc"  : "royals",
			"la"  : "dodgers",
			"mia" : "marlins",
			"mil" : "brewers",
			"min" : "twins",
			"mon" : "expos",
			"nym" : "mets",
			"nyy" : "yankees",
			"oak" : "athletics",
			"phi" : "phillies",
			"pit" : "pirates",
			"sd"  : "padres",
			"sea" : "mariners",
			"sf"  : "giants",
			"stl" : "cardinals",
			"tb"  : "rays",
			"tex" : "rangers",
			"tor" : "bluejays",
			"was" : "nationals"
		};

if (!window.page_id){    var page_id    = ""; }
if (!window.ran_number){ var ran_number = Math.round( Math.random()*1000000000 ); }
if (!window.dc_lang){    var dc_lang    = "en"; }

/**
 * Writes DC ad as either an embedded script or an iframed, depending on the internal, hard-wired switch.
 * @param w Width of ad
 * @param h Height of ad
 * @param p Position - Deprecated. It is safely ignored in this version, and calculated instead.
 */
function writeAd(w, h, p) {
	var dc_size        = w + "x" + h,
			dc_section     = window.section || "empty",  // section is defined in page wrapper
			dc_pageid      = window.page_id || window.pageid || "empty",
			dc_viewKey     = bam && bam.vkey || "",
			dc_keyValPairs = window.dc_keyVal || "",
			dc_site        = (dc_lang !== "en") ? dc_lang +"."+ c_domain[club] +".mlb" : c_domain[club] +".mlb",
			dc_contentId   = (window.content_id) ? window.content_id : "",
			protocol       = top.location.protocol || "http:",
			iframeMode     = false, // use this to switch between ADJ (javascript-based) and ADI (iframe-based) ad display
			ad_url,
			ad_urlParams;

	dc_numads++;
	dc_tiles[dc_size] = (dc_tiles[dc_size]) ? dc_tiles[dc_size]+1 : 1;
	ad_urlParams = 	"pageid=" + dc_pageid + ";" +
									(dc_viewKey     ? "vkey="+dc_viewKey+";" : "") + 
									(dc_contentId   ? "contentid="+dc_contentId+";" : "") + 
									(dc_keyValPairs ? dc_keyValPairs+";" : "") +
									"pos="  + dc_tiles[dc_size] + ";" + 
									"sz="   + dc_size + ";" +
									"tile=" + dc_numads + ";" +	
									"ord="  + ran_number + "?";	
			
	if (protocol !== "https:"){
		if (iframeMode){ 
			ad_url = protocol + "//ad.doubleclick.net/adi/"+dc_site+"/"+dc_section+";" + ad_urlParams;
			document.write("<iframe src='"+ad_url+"' width='"+w+"' height='"+h+"' frameborder='no' border='0' marginwidth='0' marginheight='0' scrolling='no'></iframe>");
		}
		else {
			ad_url = protocol + "//ad.doubleclick.net/adj/"+dc_site+"/"+dc_section+";" + ad_urlParams;
			// added to deal with dart down swap
			var adSwapMap = {
				"some/url"          : "<a href=''><img src=''/></a>",
				"asdfasdf/asdfasdf" : "<a href=''><img src=''/></a>"
			};
			if (adSwapMap[ad_url]){
				document.write(adSwapMap[ad_url]);
			}
			else {
				document.write("<script src='" + ad_url + "' type='text/javascript'></scr" + "ipt>");
			}			
//			document.write("<script language='JavaScript' src='" + ad_url + "' type='text/javascript'></scr" + "ipt>");	
		}
		if (window.$ && ($.browser.mozilla)) {
			document.write('<iframe src="#" style="display:none;"></iframe>');
		}
	} 
	else {
		document.write("<img src='/images/trans.gif' width='" + w + "' height='" + h + "' border='0'/>");
	}
}



/**
 * Writes DC ad as either an embedded script or an iframe, depending on the internal, hard-wired switch.
 * @param options object
 * Multiple ad sizes can be passed in, like so:
 * writeAds({sizes: ["300x250","300x150"]})
 * @TODO: deprecate writeAd in favor of writeAds
 */
function writeAds(options) {
	var dc_size        = "",
		dc_sizes       = options.sizes,
		dc_section     = window.section || "empty",  // section is defined in page wrapper
		dc_pageid      = window.page_id || window.pageid || "empty",
		dc_viewKey     = bam && bam.vkey || "",
		dc_keyValPairs = window.dc_keyVal || "",
		customparams   = options.customparams,
		dc_site        = (dc_lang !== "en") ? dc_lang +"."+ c_domain[club] +".mlb" : c_domain[club] +".mlb",
		dc_contentId   = (window.content_id) ? window.content_id : "",
		protocol       = top.location.protocol || "http:",
		iframeMode     = false, // use this to switch between ADJ (javascript-based) and ADI (iframe-based) ad display
		ad_url,
		ad_urlParams,
		defaultWidth = dc_sizes[0].split("x")[0],
		defaultHeight = dc_sizes[0].split("x")[1],
		i=0;

	dc_numads++;

	for(; i<dc_sizes.length; i++){
		dc_size = dc_sizes[i];
		// increment dc_tiles for every size passed in (even if they're not used)
		dc_tiles[dc_size] = (dc_tiles[dc_size]) ? dc_tiles[dc_size]+1 : 1;
	}
	if (customparams) {
		for(key in customparams){
			dc_keyValPairs += key + "=" + customparams[key] + ";";
		}
	}
	ad_urlParams = 	"pageid=" + dc_pageid + ";" +
		(dc_viewKey     ? "vkey="+dc_viewKey+";" : "") + 
		(dc_contentId   ? "contentid="+dc_contentId+";" : "") + 
		(dc_keyValPairs ? dc_keyValPairs+";" : "") +
		"pos="  + dc_tiles[dc_sizes[0]] + ";" +   // pos will use the first size in the array		
		"sz="   + dc_sizes.join(",") + ";" +
		"tile=" + dc_numads + ";" +	
		"ord="  + ran_number + "?";	

	if (protocol !== "https:"){
		ad_url = protocol + "//ad.doubleclick.net/adj/"+dc_site+"/"+dc_section+";" + ad_urlParams;
		if (iframeMode){ 			
			document.write("<iframe src='"+ad_url+"' width='"+defaultWidth+"' height='"+defaultHeight+"' frameborder='no' border='0' marginwidth='0' marginheight='0' scrolling='no'></iframe>");		
		} else {			
			// added to deal with dart down swap
			var adSwapMap = {
				"some/url"          : "<a href=''><img src=''/></a>",
				"asdfasdf/asdfasdf" : "<a href=''><img src=''/></a>"
			};
			if (adSwapMap[ad_url]){
				document.write(adSwapMap[ad_url]);
			} else {
				document.write("<script src='" + ad_url + "' type='text/javascript'></scr" + "ipt>");
			}			
		}
		if (window.$ && ($.browser.mozilla)) {
			document.write('<iframe src="#" style="display:none;"></iframe>');
		}
	} else {
		document.write("<img src='/images/trans.gif' width='" + defaultWidth + "' height='" + defaultHeight + "' border='0'/>");
	}


}



/**
 * Writes interstitial ad
 * @param w Width of ad
 * @param h Height of ad 
 */
function writeIstAd(w, h, writeAd) {
	var dc_site, 
			dc_section     = window.section   || "empty",  // section is defined in page wrapper
			dc_keyValPairs = window.dc_keyVal || "",
			dc_size        = w + "x" + h,
			writeOverlay   = !writeAd,
			ad_url;
	dc_site           = (dc_lang!=="en") ? dc_lang +"."+ c_domain[club] +".mlb" : c_domain[club] +".mlb";
	dc_tiles[dc_size] = (dc_tiles[dc_size]) ? dc_tiles[dc_size]+1 : 1;	
	dc_numads++;
	ad_url = "http://ad.doubleclick.net/adj/" + dc_site + "/" + dc_section + ";" + dc_keyValPairs;
	if (!!writeOverlay){
		ad_url += ";dcopt=ist;";
	}
	ad_url += "page="  + page_id + ";";
	ad_url += "pos="  + dc_tiles[dc_size] + ";";
	ad_url += "sz="   + dc_size + ";";
	ad_url += "tile=" + dc_numads + ";";
	ad_url += "ord="  + ran_number + "?";
	document.write("<script src='" + ad_url + "' type='text/javascript'></scr" + "ipt>");	
}


// Refreshable <iframe> ad
(function (window, $) {

  var replaceOrd = /;ord=(\d+)/,
      iFrameCount = 0;

  function rnd () {
    return Math.round(Math.random() * 10000000000000000);
  }

  function refreshIframe () {

    var frame  = window.frames[this.attr('name')],
        oldSrc = this.attr('src'),
        newSrc = oldSrc.replace(replaceOrd, ';ord=' + rnd());
    
    frame.location.replace(newSrc);
  }

  $.fn.dcRefreshableIFrame = function (cfg) {

    if (this.length === 0 || window.location.protocol === 'https:') {
      return this;
    }

    cfg = $.extend({
      club:    window.club,
      lang:    window.dc_lang,
      section: window.section,
      keyVal:  window.dc_keyVal,
      ord:     rnd(),
      domains: window.c_domain
    }, $.fn.dcRefreshableIFrame.defaults, cfg);

    var club = cfg.club || 'mlb',
        lang = cfg.lang || 'en',
        size = cfg.width + 'x' + cfg.height,
        site = (lang !== 'en' ? lang + '.' : '') + cfg.domains[club] + '.mlb',
        url  = 'http://ad.doubleclick.net/adi/' + site + '/' + [
          cfg.section || 'empty', cfg.keyVal || '', 'sz=' + size, 'ord=' + cfg.ord
        ].join(';'),

        iframes = this.map(function () {

          // Increment global DC counters for each ad
          var pos  = window.dc_tiles[size] = ~~+window.dc_tiles[size] + 1,
              tile = ++window.dc_numads,
              name = 'dcRefreshableIFrame-' + iFrameCount++;

          return $(cfg.iframe)
            .addClass(cfg.className).attr({
              src:    [url, 'pos=' + pos, 'tile=' + tile].join(';'),
              width:  cfg.width,
              height: cfg.height,
              name:   name
            })
            .appendTo(this);
          
        });

    if (cfg.interval) {
      setInterval(function () {
        iframes.each(refreshIframe);
      }, cfg.interval * 1000);
    }
    
    return this;
  };

  $.fn.dcRefreshableIFrame.defaults = {
    interval:   30,
    width:      728,
    height:     90,
    className:  'refreshable',
    iframe:     '<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no"/>'
  };

})(this, this.jQuery);
