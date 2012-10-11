/*
Singleton to be used for ad-serving for 24/7 solution
Multiples of this on the page will blow up.
*/

BI.OAS = (function(w,undefined) {
	//adserver url (trailing /)
	var OAS_url = 'http://oascentral.businessinsider.com/';

    var use_bizo = false;
    var bizo_api_key = 'd9d876ae19dc4e04bd1c49b0b0b9b9e7';
    var bizo_redirect_url = 'http://api.bizographics.com/v2/profile.redirect?api_key=' + bizo_api_key + '&callback_url=';

    var ad_call_url = '';

	//analytics crap
	var OAS_rdl = '';
	var OAS_CA = 'N';

	//additional keywords
	var OAS_taxonomy = '';

	//generated virtual url (no trailing /)
	var OAS_sitepage = 'businessinsider';

	//positions to be rendered on the page, comma deliminated list
	var OAS_listpos = '';


	//sample
	//<script src="http://oascentral.businessinsider.com/adstream_mjx.ads/businessinsider/1762@Top,Middle,Right,Right1?vertical=businessinsider&amp;tag=landingpages&amp;page=homepage&amp;XE&amp;vertical=businessinsider&amp;tag=landingpages&amp;page=homepage&amp;if_nt_CookieAccept=N&amp;XE"></script>
	var generateQuery = function() {
		return OAS_taxonomy+'&XE' + '&' + OAS_taxonomy + OAS_rdl + "&if_nt_CookieAccept=" + OAS_CA + '&XE';
	};

	return {
		//immediately after the ad is rendered, we want to check and see if OAS
		//served an empty ad, if thats the case, get rid of the entire thing
		//needs the ID element of the script tag whose parent is the container
		removeIfUnserved: function(scriptID) {
			var container = $('#'+scriptID).parent();
			if (container.length === 0) { return; }
			var img = container.find('img');
			if (img.length > 0 && img.attr('src').indexOf('empty.gif') !== -1) {				
				$(function() {container.remove()});
			}
		},
		renderAd: function(position) {
			if (typeof OAS_RICH != 'undefined') {
				OAS_RICH(position);
			}
		},
		getTaxonomy: function() {
			console.log(OAS_taxonomy);
		},
		getPositions: function() {
			console.log(OAS_listpos);
		},
		getVirtualUrl: function() {
			console.log(OAS_sitepage);
		},
		getAdCallUrl: function() {
			console.log(ad_call_url);
		},
		addTaxonomy: function(k,v) {
			v = v.replace(/ /g,"_");
			v = v.replace(/'/g,"");
			v = v.replace(/"/g,"");
			v = v.toLowerCase();
			OAS_taxonomy += (OAS_taxonomy === '') ? k+'='+v : '&'+k+'='+v;
		},
		setPositions: function(positions) {
			OAS_listpos = positions;
		},
		setUseBizo: function(bool) {
			use_bizo = bool;
		},
		setVirtualUrl: function(url) {
			if (url == 'businessinsider') {
				url = '';
			}
			if (url) {
				//get rid of contributor, per #4275
				url = url.replace('-contributor','');
				url = url.replace(/-/g,'/');
				OAS_sitepage += '/'+url;
			}
			if (typeof post != 'undefined' && post === 'story') {
				post = 'post';
			} 
            // if url is bi.com/category/BLAH then make it /category BI-496
            if (window.location.pathname.substring(0, 9) == '/category'){
				post = 'category';
            }
        
            switch (typeof post){
                case 'object':
			        OAS_sitepage += '/post';
                    break;
                case 'string':
			        OAS_sitepage += '/' + post;
                    break;
                default:
			        OAS_sitepage += '/homepage';
                    break;
            }
		},
        init: function(obj) {
            var rand = Math.floor(Math.random()*1000);
            ad_call_url = OAS_url + 'adstream_mjx.ads/' + OAS_sitepage + '/1' + rand + '@' + OAS_listpos + '?' + generateQuery();
            if (use_bizo){
                ad_call_url = bizo_redirect_url + encodeURIComponent(ad_call_url);
            }
            var html = '<script src="' + ad_call_url + '"></script>';
            if (OAS_listpos.length) {
	            document.write(html);
	        }
        }
	};
})(window);
