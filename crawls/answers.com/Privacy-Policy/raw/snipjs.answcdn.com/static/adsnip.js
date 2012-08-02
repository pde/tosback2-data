//<script type="text/javascript" src="adsnip.min.js" />
//<script type="text/javascript">
//Adsnip.config.watch_areas = '.ads_div, #ads';
//Adsnip.config.metadata = {'logged_in':'no', 'page_type':'question', 'keyword':'How much wood could a woodchuck chuck, if a woodchuck could chuck wood?'};
//Adsnip.init();
//</script> 
window.snipstarttime = (function () {
  var date1 = new Date();
  return date1.toGMTString();
})();
var Adsnip = (function(){
	var _encode_key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var _snipdata = [];
	var _config = {};
	var _click_data = [];
	var _initialized = false;

	var read_cookie = function(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}

	var _phpsessionid = read_cookie('PHPSESSID');
	
	var _get_base_url = function() {
		if(Adsnip.config.testing === true) {
			return 'http://staging.snip.answers.com/';
		} else {
			return 'http://snip.answers.com/';
		}
	}

	var _watch = function() {
	    for(var feed_id in _config.feeds) {
	    	var watch_areas = _config.feeds[feed_id].areas;
	    	if(!watch_areas || watch_areas === '') continue;
	    	
	    	var list = new Array();
	    	if(watch_areas.indexOf(',') !== -1) {
	    		list = watch_areas.split(',');
	    	} else {
	    		list.push(watch_areas);
	    	}

	    	var total_elements = [];
	    	for(var i = 0; i < list.length; i++) {
				var row = list[i].trim();
				var elements = _find(row, document);
	    		if(elements.length > 0) {
	    			for(var n = 0; n < elements.length; n++) {
	    				if(elements[n] && typeof elements[n] != 'undefined') {
	    					total_elements.push(elements[n]);
	    				}
	    			}
	    		}		
	    	}
	    	
	    	if(total_elements.length > 0) {
	    		_parse_ads(feed_id, total_elements);
	    	}			
	    }
	};
	
	var record_feed = function(feed_id, elements) {
		if(_config.feeds[feed_id].request_id && _config.feeds[feed_id].request_id > 1) {
			_update_ads(feed_id, elements);
			return;
		}

	    var parsed_data = {
	    	'request_url': 'no_url',
	    	'exec_time': '0',
	    	'error_code': '0',
	    	'num_results': 0, 
	    	'keyword': _snipdata.keyword, 
	    	'notes': '',
			'feed_id': feed_id,
			'phpsessionid': _phpsessionid
	    };
	    
	    var links = new Array();
	    for(var i = 0; i < elements.length; i++) {
			var atags = _find('a', elements[i]);
			for(var n = 0; n < atags.length; n++) {
				var href = atags[n].getAttribute('href');
	    		if(links.indexOf(href) == -1 && href.indexOf('adsense/support') == -1) {
	    			links.push(href);
	    		}
	    	}
	    }
	    parsed_data.num_results = links.length;
	    
	    for(var meta_name in _config.feeds[feed_id].meta) {
			parsed_data[meta_name] = escape(_config.feeds[feed_id].meta[meta_name]);
	    }

	    //_feeds[feed_id].data = parsed_data;

		_ajax({
			'url': _get_base_url()+'feed.php',
		    'type':'jsonp',
		    'data': parsed_data,
		    'timeout': 2000,
		    'callback': function(response) {
				_config.feeds[feed_id].request_id = response.feed_request_id;
				_update_ads(feed_id, elements);
		    },
		    error: function() {
				// _update_ads(feed_id, elements, 0);
		    }
		});
	};
	
	var _parse_ads = function(feed_id, elements, count) {
	    if(!count || typeof count == 'undefined') count = 1;
	    if(!elements || typeof elements == 'undefined') return;
	    
	    var empty = false;
	    for(var i = 0; i < elements.length; i++) {
	    	if(_find('a', elements[i]).length == 0) {
	    		empty = true;
	    		break;
	    	}
	    }
	    
	    if(empty === true) {
			if(count < 4) {
	    		var timer = setTimeout(function(){
	    			_parse_ads(feed_id, elements, count+1);
				}, 500);

				return false;
			}
	    }
	    
	    record_feed(feed_id, elements);
	};
	
	var _update_ads = function(feed_id, elements) {
		if(_config.click_tracking === false) return;

		var links = [];
		var dswitch = [];
		var count = 0;
	    for(var i = 0; i < elements.length; i++) {
			var atags = _find('a', elements[i]);

	    	for(var x = 0; x < atags.length; x++) {
	    		var href = atags[x].getAttribute('href');
				var ad_domain = false;
				if(feed_id !== 'google_radlink') { // Skip radlinks, as they never have display urls.
					ad_domain = _ad_domain_search(atags[x].parentNode);
				}
	    		if(href && href.indexOf('adsense/support') == -1) {
	    			if(links.indexOf(href) == -1) links.push(href);

					if(_config.click_tracking !== 'js' && _config.click_tracking !== 'dblswap') {
						atags[x].href = Adsnip.click_url({'url':href, 'n':links.length, 'visible_url':ad_domain}, feed_id);
					} else {
						atags[x].onclick = null;
						atags[x].onclick = Adsnip.on_click(feed_id, href, ad_domain, links.length);

						if(_config.debug === true) {
							atags[x].style.color = '990000';
						}
					}
				}

				count++;
	    	}
	    }
	};

	var _ad_domain_search = function(adNode) {
		var domain_checks = ['class:adUnitLink', 'class:greenSponsoredLink', 'class:rightAdLnk', 'color:#0E774A', 'color:#008000'];
		var domain_node = false;

		for(var u = 0; u < domain_checks.length; u++) {
			domain_check_parts = domain_checks[u].split(':');
			switch(domain_check_parts[0]) {
				case 'class':
					var class_check = _find('a.'+domain_check_parts[1], adNode);
					if(class_check && class_check[0]) {
						domain_node = class_check[0];
					}
					break;
				case 'color':
					var domain_links = _find('a', adNode);
					for(var t = 0; t < domain_links.length; t++) {
						if(_rgb_to_hex(domain_links[t].style.color) === domain_check_parts[1]) {
							domain_node = domain_links[t];
						}
					}
					break;
				default:
					continue;
			}

			if(domain_node) {
				var txt = domain_node.innerText || domain_node.textContent;
				if(txt !== '') {
					return txt;
				}
			}
		}

		return false;
	}

	var _rgb_to_hex = function(color) {
		if(color.substr(0, 1) === '#') {
			return color;
		}

		if(color.indexOf('rgb') != -1) {
			parts = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
			delete(parts[0]);

			for(var i = 1; i <= 3; ++i) {
				parts[i] = parseInt(parts[i]).toString(16);
				if(parts[i].length == 1) {
					parts[i] = '0' + parts[i];
				}
			}

			return '#'+parts.join('');
		}

		return false;
	}

	var _find = function(selector, root) {
	    if(!selector || typeof selector == 'undefined') return [];
	    if(!root || typeof root == 'undefined') root = document;
	
	    if (document.querySelectorAll) {
	    	return root.querySelectorAll(selector);
	    } else {
	    	var elements = null;
	    	if(selector.indexOf('#') !== -1) { // ID
	    	    var id = null;
	    	    if(selector.indexOf('#') > 0) {
					var parts = selector.split('#');
	    	    	id = parts[1];
	    	    } else {
	    	    	id = selector.substr(1);
	    	    }
	
	    	    elements = root.getElementById(id);
	    	    if(elements) return [elements];
	    	} else if (selector.indexOf('.') !== -1) { // Class
				var tag = null;
				var classname = null;
	
	    	    if(selector.indexOf('.') > 0) {
					var parts = selector.split('.');
	    	    	tag = parts[0];
	    	    	classname = parts[1]
	    	    } else {
	    	    	tag = '*';
	    	    	classname = selector.substr(1);
	    	    }
	
	    	    return _find_by_class(root, tag, classname);
	    	} else { // Tag
	    		return root.getElementsByTagName(selector);
	    	}
	    }
	
	    return [];
	};

	var _find_by_class = function(node, tag, classname) {
	    if (node.getElementsByClassName) { // use native implementation if available
	    	return node.getElementsByClassName(classname);
	    } else {
	    	return (function getElementsByClass(searchClass,node) {
	        	if ( node == null )
	    			node = document;
	    		var classElements = [],
	    			els = node.getElementsByTagName(tag),
					elsLen = els.length,
	    			pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)"), i, j;
	
	    		for (var i = 0, j = 0; i < elsLen; i++) {
	  				if ( pattern.test(els[i].className) ) {
	      				classElements[j] = els[i];
	      				j++;
	  				}
	    		}
	    		return classElements;
	    	})(classname, node);
	    }
	};

	var _is_callable = function(fn) {
	    return typeof fn !== "undefined" && typeof fn === "function";
	};
	
	var _get_rqst_params = function() {
	    if(window.location.href.indexOf('?') != -1) {
	    	var vars = {}, hash;
	    	var hashes = location.search.substr(1).split('&');
	    	for(var i = 0; i < hashes.length; i++) {
	    		hash = hashes[i].split('=');
	    		vars[hash[0]] = hash[1];
	    	}
	    	return vars;
	    }
	
	    return {};
	};	

	var _jsonp = function(params) {
		var url = params.url+'?cc='+_encode(params.data);
	
	    if(url) {
	    	// Set timer
	    	var timer = setTimeout(function(){
	    		if(params.error && _is_callable(params.error)) {
	    			params.error.call(this, 'jsonp timeout!');
	    		}
	    		return;
	    	}, params.timeout);
	
	    	// Create callback function
			var callback_fn_name = 'adsnip_jsonp_'+new Date().getTime()+'_'+Math.floor(Math.random()*9999);
	    	window[callback_fn_name] = function(rsp_obj) {
	    		clearTimeout(timer);
	    		if(params.callback && _is_callable(params.callback)) {
	    			params.callback.call(this, rsp_obj);
	    		}

	    		//window[callback_fn_name] = false;
	    	};
	
	    	// Write new script to dom...
	    	var jsonp_script = document.createElement('script');
			jsonp_script.type = 'text/javascript';
			jsonp_script.src = url+'&callback='+callback_fn_name;
			document.getElementsByTagName('head')[0].appendChild(jsonp_script);	
	    } else if(params.error && _is_callable(params.error)) {
	    	params.error.call(this);
	    }
	};

	var _ajax = function(params) { // url, params, callback
		if(!params.timeout) params.timeout = 3000;
		if(!params.data.server_addr && _config.server_addr !== false) params.data.server_addr = _config.server_addr;
	
	    if(params.type == 'jsonp') return _jsonp(params);
	
	    var url = '';
	    var data = '';

	    if(params.method === 'GET' || params.method == "") {
			url = params.url+'?cc='+_encode(params.data);
	    } else if(params.method === 'POST') {
	    	url = params.url;
	    	params = params.data;
	    }

	    if(url) {
	    	var xmlHttpReq = false;
	    	if (window.XMLHttpRequest) {
	    		xmlHttpReq = new XMLHttpRequest();
	    	} else if (window.ActiveXObject) {
	    		xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
	    	}
	
	    	xmlHttpReq.open(params.type, url, true);
	    	xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	    	xmlHttpReq.timeout = 10000;
	
	    	var timer = setTimeout(function(){
	    		xmlHttpReq.abort();
	    		if(params.error && _is_callable(params.error)) {
	    			params.error.call(this, 'Timeout!');
	    		}
	    		return;
	    	}, params.timeout);			
	
	    	xmlHttpReq.onerror = function() {
	    		if(params.error && _is_callable(params.error)) {
	    			params.error.call(this, '');
	    		}
	    	}
	    	xmlHttpReq.onreadystatechange = function() {
	    		if (xmlHttpReq.readyState != 4) { return; }
	    		clearTimeout(timer);
	
	    		if(xmlHttpReq.status > 0 && xmlHttpReq.status != 200) {
	    			if(params.error && _is_callable(params.error)) {
	    				params.error.call(this, 'Bad response.');
	    			}
	
	    			return;
	    		}
	
	    		if(xmlHttpReq.status == 200 && params.callback && _is_callable(params.callback)) {
	    			params.callback.call(this, JSON.parse(xmlHttpReq.responseText));
	    		}
	
	    		return;			
	    	}
	    	xmlHttpReq.send(_serialize(data));
	    } else if(params.error && _is_callable(params.error)) {
	    	params.error.call(this);
	    }
	};

	var _serialize = function(data) {
	    var string = new Array;
	    for(var name in data) {
	    	string.push(name+'='+data[name]);
	    }
	
	    return string.join('&');
	};

	var _encode = function(data) {
	    var input = _serialize(data);
	
	    var output = "";
	    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
	    var i = 0;
	    
	    input = _utf8_encode(input);
	
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
	    	_encode_key.charAt(enc1) + _encode_key.charAt(enc2) +
	    	_encode_key.charAt(enc3) + _encode_key.charAt(enc4);
	
	    }
	
	    return output;
	};

	var _decode = function (input) {
	    var output = "";
	    var chr1, chr2, chr3;
	    var enc1, enc2, enc3, enc4;
	    var i = 0;
	
	    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
	
	    while (i < input.length) {
	
	    	enc1 = _encode_key.indexOf(input.charAt(i++));
	    	enc2 = _encode_key.indexOf(input.charAt(i++));
	    	enc3 = _encode_key.indexOf(input.charAt(i++));
	    	enc4 = _encode_key.indexOf(input.charAt(i++));
	
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

	    output = _utf8_decode(output);

	    return output;
	};	

	var _utf8_encode = function (string) {
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
	};

	var _utf8_decode = function (utftext) {
	    var string = "";
	    var i = 0;
	    var c = c1 = c2 = 0;
	
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
	};

	return {
		config: {
			'testing': false,
			'metadata': false,
			'click_tracking': 'dblswap', // ...or: false, js, basic
			'debug': false,
			'server_addr': false,
			'feeds': {},

			'add_feed': function(name, areas, meta, request_id) {
				if(!name || !areas) return false;

				if(!meta || typeof(meta) != 'object') {
					meta = {};
				}

				if(typeof(request_id) === 'undefined') {
					request_id = 1;
				}

				Adsnip.config.feeds[name] = {
					'areas': areas,
					'meta': meta,
					'request_id': parseInt(request_id)
				};
			}
		},
		
		init: function(cur_phpsessionid) {
			_config = this.config;

			// if _initialized is set to true, then initialization has previously happened
			// just watch for any new feeds that may have been added
		    if (_initialized === true) {
				_watch();
				return this;
			}
			
			var snipdata = _get_rqst_params();

		    var meta_param_map = {
		    	'logged_in': 'param2',
		    	'page_type': 'param3',
		    	'category': 'param1',
				'question': 'keyword',
				'adq': 'param4',
				'username': 'param5',
				'flavor': 'layout_mode_id',
				'question_id': 'param6'
		    };

		    for(var key in this.config.metadata) {
				if(typeof(meta_param_map[key]) !== 'undefined') {
					snipdata[meta_param_map[key]] = escape(this.config.metadata[key]);
				}
		    }

			// Add in any environment variables
			snipdata.ref = escape(document.referrer);
			snipdata.url = escape(window.location);

			// If a phpsessionid is passed to init(), assume the init work is done and move on.
			if(typeof(cur_phpsessionid) !== 'undefined' && cur_phpsessionid !== '') {
				_snipdata = snipdata;
				_phpsessionid = cur_phpsessionid;
				_initialized = true;
				_watch();

				return this;
			}

			snipdata.javascript_enabled = escape(1);
			//snipdata.cookies_enabled = escape(navigator.cookieEnabled);
			snipdata.window_width = 0;
			snipdata.window_height = 0;
			snipdata.screen_width = escape(window.screen.width);
			snipdata.screen_height = escape(window.screen.height);
			snipdata.screen_color_depth = escape(window.screen.colorDepth);
			snipdata.timezone_offset = Math.round((new Date()).getTimezoneOffset() / 60);
			snipdata.navigator_platform = escape(navigator.platform);

			if(window.navigator.language === 'undefined') {
				snipdata.navigator_language = escape(window.navigator.userLanguage);	
			} else {
				snipdata.navigator_language = escape(window.navigator.language);
			}

			try {
				snipdata.history_length = escape(history.length);

				// IE and Opera start the history length at 0, instead of 1.
				if (navigator.appName !== 'Netscape') {
					snipdata.history_length++;
				}
			} catch(err) {
				snipdata.history_length = 1;
			}

			// Window dimensions
			if (typeof(window.innerWidth) === 'number') {
				// Non-IE
				snipdata.window_width = window.innerWidth;
				snipdata.window_height = window.innerHeight;
			} else if (document.documentElement && document.documentElement.clientWidth && document.documentElement.clientHeight) {
				// IE 6+ in 'standards compliant mode'
				snipdata.window_width = document.documentElement.clientWidth;
				snipdata.window_height = document.documentElement.clientHeight;
			} else if (document.body && document.body.clientWidth && document.body.clientHeight) {
				// IE 4 compatible
				snipdata.window_width = document.body.clientWidth;
				snipdata.window_height = document.body.clientHeight;
			}

		    _snipdata = snipdata;
			
		    _ajax({
				'url': _get_base_url()+'init.php',
		    	'type':'jsonp',
		    	'timeout': 3000,
		    	'data': snipdata,
		    	'callback': function(result) {
		    		if(result.phpsessionid !== 0) {
		    			_phpsessionid = result.phpsessionid;
						_initialized = true;
		    			_watch();
		    		}
		    	},
		    	'error': function(msg) {
		    		// _watch();
		    	}
		    });

		    return this;
		},

		get_feed_request_id: function(feed_id) {
			if(typeof Adsnip.config.feeds[feed_id] == 'undefined') {
				return 1;
			}

			return Adsnip.config.feeds[feed_id].request_id;
		},

		on_click: function(feed_id, ad_url, ad_domain, ad_rank) {
			try {
				var unit = {
					url: ad_url,
					n: ad_rank,
					visible_url: ad_domain
		    	};

				var new_url = Adsnip.click_url(unit, feed_id);
				
				if(Adsnip.config.click_tracking === 'js') {
					return function() { this.href = new_url; }
				} else if (Adsnip.config.click_tracking === 'dblswap') {
					return function() {
						var old_url = this.href;
						var old_text = this.innerHTML || this.innerText || this.textContent;

						this.href = new_url;
						if(this.innerHTML != old_text) {
							this.innerHTML = old_text;
						}

						var link = this;
						setTimeout(
							function(){
								link.href = old_url;
								link.innerHTML = old_text;
							},
							500
						);
						return true;
					};
				}

				return function() {};
			} catch(err) {
				Adsnip.error_log('client_click', err);
			}
		},

		click_url: function(unit, feed_id) {
			var payload = {
				'url': escape(unit.url),
				'display_url': escape(unit.visible_url),
				'rank': unit.n,
				'feed_request_id': Adsnip.get_feed_request_id(feed_id),
				'feed_id': feed_id,
				'phpsessionid': _phpsessionid,
				'ss_partner_id': 'unknown',
				'ss_tag_id': 'unknown'
			};

			if(_config.server_addr !== false) {
				payload['server_addr'] = _config.server_addr;
			}

			if(payload['phpsessionid'] === null) {
				payload['phpsessionid'] = 0;
			}

			if(typeof Adsnip.config.feeds[feed_id] !== 'undefined') {
				if(typeof Adsnip.config.feeds[feed_id].meta['client_id'] !== 'undefined') {
					payload['ss_partner_id'] = Adsnip.config.feeds[feed_id].meta['client_id'];
				}

				if(typeof Adsnip.config.feeds[feed_id].meta['channel'] !== 'undefined') {
					payload['ss_tag_id'] = Adsnip.config.feeds[feed_id].meta['channel'];
				}
			}

			return _get_base_url()+'click.php?cc='+_encode(payload);
		},

		error_log: function(type, error, callback_fn) {
			var payload = {
				'starttime': window.snipstarttime || null,
				'type': type,
				'msg': error,
				'phpsessionid': _phpsessionid,
				'url': document.URL
			};

			if(typeof(this.config.metadata['flavor']) !== 'undefined') {
				payload.lmi = this.config.metadata['flavor'];
			}

			var error_url = _get_base_url()+'log.php';

			_ajax({
				'url': error_url,
				'method': 'GET',
				'type':'jsonp',
				'data': payload,
				'timeout': 2000,
				'callback': function(response) {
					if(typeof callback != 'undefined') {
						callback_fn(response);
					}
				},
				error: function() {
					
				}
			});
		}
	};	
})();	

// Global error handling
window.is_error_handling = false;

window.onerror = function(msg, url, line_no) {
	if(!window.is_error_handling) {
		window.is_error_handling = true;

		var handle_error = function(msg, url, line_no) {
			Adsnip.error_log(
				'client_general', msg+' on '+url+', line:'+line_no,
				function(response) {
					window.is_error_handling = false;
				}
			);
		}

		handle_error(msg, url, line_no);
	}

	return true;
}

// From: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf#Compatibility
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(elt /*, from*/)
	{
	    var len = this.length >>> 0;
	
	    var from = Number(arguments[1]) || 0;
	    from = (from < 0)
	    	? Math.ceil(from)
	    	: Math.floor(from);
	    if (from < 0)
	    	from += len;
	
	    for (; from < len; from++)
	    {
	    	if (from in this && this[from] === elt)
	    		return from;
	    }
        return -1;
	};
}

// Push and pop for IE
if(typeof Array.prototype.push !== "function"){
	Array.prototype.pop = function() {
	    var n = this.length >>> 0, value;
	    if (n) {
			value = this[--n];
			delete this[n];
	    }
	    this.length = n;
	    return value;
	};
	
	Array.prototype.push = function() {
		var n = this.length >>> 0;
		for(var i = 0; i < arguments.length; i++)
		{
			this[n] = arguments[i];
			n+=1;
		}
		this.length = n;
	};
}

if(typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, '');
  }
}

// http://www.JSON.org/js.html
if(!this.JSON){JSON=function(){function f(n){return n<10?'0'+n:n;}
Date.prototype.toJSON=function(){return this.getUTCFullYear()+'-'+
f(this.getUTCMonth()+1)+'-'+
f(this.getUTCDate())+'T'+
f(this.getUTCHours())+':'+
f(this.getUTCMinutes())+':'+
f(this.getUTCSeconds())+'Z';};var m={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};function stringify(value,whitelist){var a,i,k,l,r=/["\\\x00-\x1f\x7f-\x9f]/g,v;switch(typeof value){case'string':return r.test(value)?'"'+value.replace(r,function(a){var c=m[a];if(c){return c;}
c=a.charCodeAt();return'\\u00'+Math.floor(c/16).toString(16)+
(c%16).toString(16);})+'"':'"'+value+'"';case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}
if(typeof value.toJSON==='function'){return stringify(value.toJSON());}
a=[];if(typeof value.length==='number'&&!(value.propertyIsEnumerable('length'))){l=value.length;for(var i=0;i<l;i+=1){a.push(stringify(value[i],whitelist)||'null');}
return'['+a.join(',')+']';}
if(whitelist){l=whitelist.length;for(var i=0;i<l;i+=1){k=whitelist[i];if(typeof k==='string'){v=stringify(value[k],whitelist);if(v){a.push(stringify(k)+':'+v);}}}}else{for(k in value){if(typeof k==='string'){v=stringify(value[k],whitelist);if(v){a.push(stringify(k)+':'+v);}}}}
return'{'+a.join(',')+'}';}}
return{stringify:stringify,parse:function(text,filter){var j;function walk(k,v){var i,n;if(v&&typeof v==='object'){for(i in v){if(Object.prototype.hasOwnProperty.apply(v,[i])){n=walk(i,v[i]);if(n!==undefined){v[i]=n;}}}}
return filter(k,v);}
if(/^[\],:{}\s]*$/.test(text.replace(/\\./g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof filter==='function'?walk('',j):j;}
throw new SyntaxError('parseJSON');}};}();}
