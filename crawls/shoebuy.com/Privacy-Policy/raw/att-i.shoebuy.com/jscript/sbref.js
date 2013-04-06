
function prepareAsyncRequest(URL, cb) {
	return {
		execute : function(data) {
			$.post(URL, data, cb);
		}
	}
}

function handleKeyword(keyword) {
	if(keyword)
		this.manual_cm_mmc = this.sbrefLink + '-_-none-_-none-_-' + escape(keyword);
}

function parseAsyncResponse(data) { 
	try{
		var html = $(data);
		for(var i=0;i<html.length;i++) {
			var element = html[i];
			if(element.id == 'keyword'){
				handleKeyword(element.innerHTML);
				break;
			}
		}
	} catch(e){}
}

function createSBRef (options) {
	var domain = options.domain;
	var params = getUrlVars();
	var clife = null;
	var crecall = [];
	var asyncs = [];
	if(params.link) {
		if(options.callback == null) {
			options.callback = function(data) { }
		}
		var link =params.link; 
		if(params.adtype) {
			link = link + '_' + params.adtype;
			params.link = link;
		}
		eraseCookie('ShoebuyPbar');
		if(options.special_links) {
			var special_links = options.special_links;
			for(var x=0; x<special_links.length; x++) {
				var special_link = special_links[x];
				if(special_link.link_test && special_link.link_test.test(link)) {
					clife = special_link.duration;
					if(special_link.special_durations) {
						for(var i=0; i<special_link.special_durations.length; i++) {
							var dur_param_val = params[special_link.special_durations[i].param];
							if(dur_param_val == special_link.special_durations[i].val) {
								clife = special_link.special_durations[i].duration;
								break;
							}
						}
					}
					if(special_link.extra_cookies) {
						for(var y=0; y<special_link.extra_cookies.length; y++) {
							var extra_cookie = special_link.extra_cookies[y];
							if(extra_cookie.cookie) {
								var ex_cookie_val = null;
								if(extra_cookie.param) {
									ex_cookie_val = params[extra_cookie.param];	
									if(!ex_cookie_val)
										continue;
								}
								if(extra_cookie.value) {
									ex_cookie_val = extra_cookie.value;
								}
								var ex_cookie_dur = extra_cookie.duration;
								if(ex_cookie_dur) {
									createCookie(extra_cookie.cookie, ex_cookie_val, ex_cookie_dur, domain);
								} else {
									createCookie(extra_cookie.cookie, ex_cookie_val, clife, domain);
								}
								crecall.push(extra_cookie.cookie);
								break;
							}
						}
					}
					if(special_link.async_req) {
						asyncs.push(prepareAsyncRequest(special_link.async_req, options.callback));
					}
					break;
				}
			} 
		}
		createCookie('ShoebuyEntry', params.link, clife, domain);
		crecall.push('ShoebuyEntry');
		if(options.async_req) {
			asyncs.push(prepareAsyncRequest(options.async_req, options.callback));
		}
		this.sbrefLink = params.link;
		this.manual_cm_mmc = this.sbrefLink + '-_-none-_-none-_-none';
	}
	
	if(params.pparam) {
		createCookie('Shoebuy_PParam', params.pparam, clife, domain);
	}
	
	if(params.prm) {
		createCookie('promo', params.prm, null, domain);
		createCookie('thispromo', params.prm, null, domain);
	}
	if(document.referrer && !(new RegExp('^https?:\\\/\\\/(|[^\\\/\\.]+)+' + domain + '(|\\\/.*)$', 'i')).test(document.referrer)) {
        var existing_cookie = readCookie('ShoebuyEntryExt');
        var data;
        if (existing_cookie) {
            var decoded = base64_decode(existing_cookie);
            data = JSON.parse(decoded);
        } else {
            data = [];
        }
		var new_data = { ref_domain : document.referrer, entry_url: window.location.href , entry_qry: {} };
        var exists = false;
        for (var i in data) {
            if (data[i]['ref_domain'] == new_data['ref_domain'] && data[i]['entry_url'] == new_data['entry_url']) {
                exists = true;
                break;
            }
        }
        if (!exists) {
            for(var i in options.qry_args) {
                if(params[options.qry_args[i]]) {
                    new_data['entry_qry'][options.qry_args[i]] = params[options.qry_args[i]];
                }
            }
            data.push(new_data);
            var json_str = JSON.stringify(data);
            var encoded = base64_encode(json_str);
            createCookie('ShoebuyEntryExt', encoded, null, domain);
        }
	}

	var payload;
	if(asyncs.length > 0) {
		payload = params;
		payload.crecall = crecall.join(",");
	}
	for(var a=0; a<asyncs.length; a++) {
		asyncs[a].execute(payload);
	}
}
