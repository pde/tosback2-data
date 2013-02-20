var reporting = {
	init: function(){jQuery(document).bind("mousedown",reporting.beginCapture)},
	eventTarget: null,
	selectors: [],
	registerClass: function(className, defaultOptions, gatherMethod){reporting.selectors.push({selector:"."+className,"defaultOptions":defaultOptions,"gatherMethod":gatherMethod})},
	registerSelector: function(selector, defaultOptions, gatherMethod){reporting.selectors.push({selector:selector,"defaultOptions":defaultOptions,"gatherMethod":gatherMethod})},
	mergeMap: function(map1, map2){var map3 = {};for(x in map1){map3[x] = map1[x]};for(x in map2){map3[x] = map2[x]};return map3},
	beginCapture: function(event){
		event = event ? event : window.event;
		var target = event.target ? event.target : event.srcElement;
		reporting.eventTarget = target;
		jQuery(document).bind("mouseup",reporting.endCapture)
	},
	endCapture: function(event){
		event = event ? event : window.event;
		var target = event.target ? event.target : event.srcElement;
		if(target == reporting.eventTarget){reporting.captureClick(event)}
		jQuery(document).unbind("mouseup",reporting.endCapture);
	},
	captureClick: function(event){
		event = event ? event : window.event;
		var target = event.target ? event.target : event.srcElement;
		var body = document.getElementsByTagName("body")[0];
		var ancestry = [target];
		
		if(target == null){return}
		while(target != body && target.parentNode != null){target = target.parentNode;ancestry.push(target)}
		
		for(var i = 0; i < reporting.selectors.length; i++){
			for(var k = 0; k < ancestry.length; k++){
				target = ancestry[k];
				if(jQuery(target).is(reporting.selectors[i].selector)){
					var defaultOptions = reporting.selectors[i].defaultOptions;
					var gatheredOptions = reporting.selectors[i].gatherMethod.apply(target);
					reporting.dispatchEvent.apply(target,[reporting.mergeMap(defaultOptions,gatheredOptions)]);
					break;
				}
			}
		}
		
		return true;
	},
	dispatchEvent: function(options){
		var wtArgs = [];
		var hasHref = typeof this != "undefined" && typeof this.href != "undefined";
		
		options["DCS.dcsref"] = window.location.href;
		options["DCSext.wtNoHit"] = 1;
		
		if(hasHref){
			options["DCS.dcssip"] = this.hostname;
			options["DCS.dcsuri"] = this.pathname.replace(/^([^\/])/,'/$1');
			if(options["DCS.dcssip"] == ""){options["DCS.dcssip"] = document.domain}
			if(options["DCS.dcsuri"] == ""){options["DCS.dcsuri"] = "/"}
		}
		
		for(option in options){wtArgs.push(option); wtArgs.push((options[option] + "").replace(/^\s+|\s+$/, ''))}
		try{dcsMultiTrackTop.apply(this, wtArgs)}catch(err){}
	}
}

jQuery(reporting.init());

reporting2 = {
	appname: '',
	elements: [],
	params: [],
	cookie: [],
	errors: [],
	$: jQuery,
	
	capture: function (elements) {
		var reporting = reporting2;
		for (var x in elements) {
			var element = elements[x];
			var selector = element.selector;
			var isForm = /\bform\b/.test(selector);
			var trigger = element.trigger || 'click';
			element.index = reporting.elements.push(element);
			with (this) switch (element.type) {
				case ('wtpn'):
					$(selector).live(element.trigger = 'load', element, handler);
					if (element.deferred) $(document).bind('PageModified', element, watcher);
					else watcher({data: element});
				break;
				case ('wtlink'):
					$(selector).live(element.trigger = trigger, element, handler);
				break;
				case ('wtevent'):
					$(selector).live(element.trigger = isForm ? 'submit' : trigger, element, handler);
				break;
				case ('wtcancel'):
					$(selector).live(element.trigger = isForm ? 'cancel reset' : trigger, element, handler);
				break;
				case ('wtsubmit'):
					$(selector).live(element.trigger = isForm ? 'submit' : trigger, element, handler);
				break;
				case ('wtparam'):
					$(selector).live(element.trigger = 'change mousedown', element, handler);
				break;
				case ('wtmeta'):
					$(selector).live(element.trigger = isForm ? 'submit' : trigger, element, handler);
					if (!element.deferred) $(selector).each(function (i) {reporting.handler({data: element})});
				break;
			}
		}
	},

	handler: function (event) {
		event = event || window.event;
		event.target = event.target || event.srcElement;
		var reporting = reporting2;

		if (event.data) {
			var name = (typeof event.data.name == 'function') ? event.data.name.call(this) : event.data.name;

			var value = (typeof event.data.value == 'function') ? event.data.value.call(this) : event.data.value;
			if (value == undefined) value = reporting.getLinkValue(this);
		
			var params = (event.data.params) ? event.data.params.toString().split(',') : [];
			for (var i=0; i < params.length; ++i) params.splice(i+1, 0, reporting.params[params[i++]]);
			
			switch (event.data.type) {
				case('wtpn'):
					reporting.tag.apply(window, [name, 0, 'System'].concat(params));
					reporting.tag.perform();
				break;
				case('wtlink'):
					params = params.concat(reporting.getLinkParams(this));
					reporting.tag.apply(window, [name, 0, 'User'].concat(params));
				break;
				case('wtevent'):
					reporting.tag.apply(window, [name, 0, 'User'].concat(params));
				break;
				case('wtcancel'):
					reporting.tag.apply(window, [name, -1, 'User'].concat(params));
				break;
				case('wtsubmit'):
					reporting.tag.apply(window, [name, -2, 'User'].concat(params));
				break;
				case('wtparam'):
					reporting.params[name] = value;
				break;
				case ('wtmeta'):
					reporting.addParam(name, value);
				break;
			}
		}
	},
	
	uncapture: function (elementList) {
		with (this) for (var x in elementList) {
			var element = elementList[x];
			var selector = element.selector;
			var event = 'ready load click cancel reset submit change blur mousedown keyup';
			jQuery(document).undelegate(selector, event, handler);
			delete elements[element.index-1];
		}
	},
	
	watcher: function (event) {
		event = event || window.event;
		var test = jQuery(event.data.selector).mywatch('scrollWidth', 'load', 0);
	},
	
	addParam: function (name, value, append) {
		if (name == 'wtPN') value = value.replace(/_/g, ' ');
		var meta = jQuery('meta[name*=' + name + ']');
		if (!meta.length || append) jQuery('<meta/>', {name: 'DCSext.' + name, content: value}).appendTo('head'); 
		else meta[0].setAttribute('content', value);
		DCSext[name] = value;
	},
	
	getLinkValue: function (link) {
		var reporting = reporting2;
		var value = link.value;
		value = value || (link.value || link.title || link.alt || link.name);
		value = value || (link.childNodes[0] && (link.childNodes[0].value || link.childNodes[0].title || link.childNodes[0].alt || link.childNodes[0].name)); 
		value = value || (link.href && (link.href.match('device=([^&#]*)') || ['',''])[1]);
		value = value || reporting.trim(link.text || link.innerText, false, 32);
		return value;
	},
	
	getLinkParams: function (link) {
		var reporting = reporting2;
		var params = [];
		var dcssip, dcsuri, dcsqry;
		dcssip = (link.href.match('^.*://([^/]*)') || ['',''])[1];
		dcsuri = (link.href.match(dcssip + '([^?]*)') || ['',''])[1];
		dcsqry = (link.href.match(dcsuri + '([?].*)') || ['',''])[1];
		params.push('dcssip', dcssip||location.hostname);
		params.push('dcsuri', dcsuri||location.pathname);
		params.push('dcsqry', dcsqry||'');
		params.push('wtLinkLoc', reporting.params['wtLinkLoc']);
		params.push('wtLinkName', reporting.params['wtLinkName']);
		return params;
	},
	
	getDynamicLinkLoc: function () {
		var reporting = reporting2;
		var pageName = reporting.trim(jQuery('meta[name*=wtPN]')[0].attributes['content'].value, '_').split('|')[0];
		var linkLoc = '_Body';
		//TODO: may be more efficient to split this up into separate selectors
		var sections = {_Tile_: '.tile,.fullWidthTile', _Carousel_: '.jcarousel', _Package_: '.pkgCol',
				_LinkFarm_: '.linkFarmCol', _ServiceBar: '.serviceItem', _Footer: '#footer'};
		for (var x in sections) {
			if (jQuery(this).parents(sections[x]).length) {
				linkLoc = x.replace(/_$/, '_' + (jQuery(sections[x]).index(jQuery(this).parents(sections[x]))+1));
				break;
			}
		}
		return pageName + linkLoc;
	},
	
	getDynamicLinkName: function () {
		var reporting = reporting2;
		var linkValue = reporting.getLinkValue(this);
		var linkName = '';
		if (jQuery(this).parents('.tabcontent').length) {
			linkName = reporting.trim(jQuery('.tabs li')[(jQuery('.tabcontent').index(jQuery(this).parents('.tabcontent')))].innerText, '_') + '_Tab_';
		}
		return linkName + linkValue;
	},
	
	trim: function (str, delim, size) {
		str = str || '', delim = delim || ' ', size = size || Infinity;
		return str.replace(/^\s+/g, '').replace(/\s+$/g, '').replace(/\s+/g, delim).slice(0, size);
	}
}

if (!window.dcsMultiTrack) {
	WT = [], DCS = [], DCSext = [];
	dcsMultiTrack = function () {};	
}

reporting.map = reporting2.map = function (event, status, type) {
	this.map = {}
	
	//write page specific parameters
	for (x in reporting.map.params) for (y in reporting.map.params[x]) {
		if (/\$/.test(y)) this.map[y] = reporting.map.params[x][y];
	}

	this.map['DCSext$wtEvent'] = event || '';
	this.map['DCSext$wtEventType'] = type || 'User';
	this.map['DCSext$wtStatusCode'] = status || 0;
	
	//TODO: add code awareness of <dsp:param name="dcsref" bean="/OriginatingRequest.referer" />
	//TODO: these param specifications may not be necessary as can be rolled into newer functionality
	//params in this list will be stripped from the uverse_webtrend cookie
	this.map.stripped = ['dcsref','dcssip','dcsuri','dcsqry','wtNoHit','wtStatusCode','wtStatusMsg','wtSuccessFlag'];
	//params in this list will be restricted from being set to global values
	this.map.restricted = ['wtPN','wtEvent','wtEventType','wtNoHit','wtStatusCode','wtStatusMsg','wtSuccessFlag','wtSlotClick','wtSlotContent'];
	
	this.map.init = reporting.map.init;
	this.map.findParam = reporting.map.findParam;
	this.map.toString = reporting.map.toString;
	
	return this.map.init();
}

reporting.map.params = {
	defaults: {
		DCS$dcsref : 						location.href,
		DCS$dcssip : 						location.hostname,
		DCS$dcsuri : 						location.pathname,
		DCS$dcsqry : 						location.search,
		DCSext$wtPN :						'',
		DCSext$wtNoHit : 					'',
		DCSext$wtEvent : 					'',
		DCSext$wtEventType : 				'',
		DCSext$wtStatusCode : 				'',
		DCSext$wtStatusMsg : 				'',
		DCSext$wtSuccessFlag : 				'',
		DCSext$wtSlotClick : 				'',
		DCSext$wtSlotContent : 				''
	}
}

reporting.map.init = function (error) {
	var reporting = reporting2;
	var event = this['DCSext$wtEvent'];
	var type = this['DCSext$wtEventType'];
	var status = this['DCSext$wtStatusCode'];
	
	//write core parameters based on event/page name, status code/message, system/user type
	if (type == 'System') this['DCSext$wtPN'] = event.replace(/_/g, ' ');
	else this['DCSext$wtEvent'] = event;
	this['DCSext$wtNoHit'] = this['DCSext$wtPN'] ? '' : '1';
	//TODO: this next line should not be necessary, need to better separate page view/user events
	if (this['DCSext$wtEvent'].replace(/_/g, ' ') == this['DCSext$wtPN']) this['DCSext$wtEvent'] = '';
	
	var statusCodes = [], statusMsgs = [];
	if (error) reporting.errors.push(error);
	for (var i=0; i < reporting.errors.length;) {
		error = reporting.errors[i].toString().replace(/\s+$/, '').replace(/\|+$/, '');
		if (error) (/\d/.test(error)) ? statusCodes.push(error) : statusMsgs.push(error);
		reporting.errors.shift();
	}

	this['DCSext$wtStatusCode'] = statusCodes.join('|');
	this['DCSext$wtStatusMsg'] = statusMsgs.join('|');
	this['DCSext$wtSuccessFlag'] = (statusCodes.length || statusMsgs.length) ? 0 : 1;
	if (this['DCSext$wtStatusMsg'] && (this['DCSext$wtStatusCode'] == 0)) this['DCSext$wtStatusCode'] = '';
	if (this['DCSext$wtSuccessFlag']) this['DCSext$wtStatusCode'] = 0;

	//no wtEventType or wtStatusCode, etc. for link tracking
    if (!this['DCSext$wtEvent'] && this['DCSext$wtLinkName']) {
    	this['DCSext$wtEventType'] = '';
    	this['DCSext$wtStatusCode'] = '';
    	this['DCSext$wtStatusMsg'] = '';
    	this['DCSext$wtSuccessFlag'] = '';
    }

	if (this['DCS$dcsref']) DCS.dcsref = this['DCS$dcsref'];  
	if (this['DCS$dcssip']) DCS.dcssip = this['DCS$dcssip'];
	if (this['DCS$dcsuri']) DCS.dcsuri = this['DCS$dcsuri'];
	if (this['DCS$dcsqry']) DCS.dcsqry = this['DCS$dcsqry'];

	return this;
}

reporting.map.findParam = function (p) {
	for (var param in this) {
		if ((new RegExp(p+'$')).test(param)) return param;
	}
	if (~p.indexOf('dcs')) return 'DCS$' + p;
	else return 'DCSext$' + p;
}

reporting.map.toString = function (forCookie) {
	var a = [];
	var r = forCookie ? '' : '$1.'; 
	for (var param in this) {
		var _param = param.replace(/(.*)[$]/g, r);
		if (forCookie && ~this.stripped.toString().indexOf(_param)) continue;
		if (~param.indexOf('$')) a.push(_param, this[param]);
	}
	a = a.toString();
	if (forCookie) a = a.replace(/(^|,)([^,]*)(,)([^,]*)/g,'*$2^$4');
	return a.toString();
}

reporting.tag = reporting2.tag = function (event, status, type, paramName1, paramValue1, etc) {
	if (status == undefined) status = -2;
	if (status == 1) status = 0; //default

	var wtMap = new reporting.map(event, status, type);

	for (var param in wtMap) {
		var _param = param.slice(param.indexOf('$')+1);
		if (~wtMap.restricted.toString().indexOf(_param)) continue;
		if (~param.indexOf('$') && window[_param]) wtMap[param] = window[_param];
	}
	
	var params = Array.prototype.slice.apply(arguments,[3]);
	for (var i=0; i < params.length; i+=2) {
		if (!params[i]) continue;
		var _param = params[i].slice(params[i].indexOf('$')+1);
		if (~wtMap.restricted.toString().indexOf(_param)) continue;
		wtMap[wtMap.findParam(params[i])] = params[i+1];
	}

	if (status == -2) setCookie('uverse_webtrend', wtMap.toString('forCookie'), 1);
	else reporting.tag.log(wtMap);
}

reporting.tag.perform = function (inline) {
	var reporting = reporting2;
	var wtMap = new reporting.map('', 0, 'System');
	var cookieValue = getCookie('uverse_webtrend');

	if (cookieValue) {
		cookieValue = unescape(cookieValue).split('*');
		for (i=1; i < cookieValue.length; i++) {
			var cookiePart = cookieValue[i].split('^');
			if (cookiePart[0]) var param = wtMap.findParam(cookiePart[0]);
			if (cookiePart[1]) wtMap[param] = cookiePart[1];
			reporting2.cookie[cookiePart[0]] = cookiePart[1];
		}
	}
	
	var wtStatusCode = jQuery('meta[name*=wtStatusCode]')[0];
	if (wtStatusCode) reporting.errors.push(wtStatusCode.getAttribute('content'));
	var wtStatusMsg = jQuery('meta[name*=wtStatusMsg]')[0];
	if (wtStatusMsg) reporting.errors.push(wtStatusMsg.getAttribute('content'));
	wtMap.init(window.v_errorCode), window.v_errorCode = 0;

	if (inline) reporting.tag.inline(wtMap);
	else reporting.tag.log(wtMap);
	
	setCookie('uverse_webtrend', '', -1);
}

reporting.tag.inline = function (wtMap) {
	var reporting = reporting2;
	wtMap['DCSext$wtEventType'] = '';
	wtMap['DCSext$wtNoHit'] = '';
	for (x in wtMap) {
		if (~x.indexOf('DCSext') && wtMap[x] != undefined && wtMap[x] !== '') reporting.addParam(x.slice(7), wtMap[x]);
	}
}

reporting.tag.log = function (wtMap) {
	var reporting = reporting2;
	var wtPN_param = wtMap.findParam('wtPN');
	var wtEvent_param = wtMap.findParam('wtEvent');
	var wtLinkName_param = wtMap.findParam('wtLinkName');
	if(wtMap[wtLinkName_param])
	{
		wtMap['DCSext$wtStatusCode']='';
		wtMap['DCSext$wtSuccessFlag']='';
		wtMap['DCSext$wtEventType']='';
	}
	if (wtMap && (wtMap[wtEvent_param] || wtMap[wtPN_param] || wtMap[wtLinkName_param])) {
		reporting.tag.clear();
		//if (wtMap[wtLinkName_param] && ~wtLinkName_param['DCS$dcsqry'].indexOf('wtSlotClick')) return;
		dcsMultiTrack.apply(this, wtMap.toString().split(','));
		reporting.tag.clear();
	}
}

reporting.tag.clear = function () {
	WT = [], DCSext = [];
	DCS.dcsref = location.href;
	DCS.dcssip = location.hostname;
	DCS.dcsuri = location.pathname;
	DCS.dcsqry = location.search;
	reporting.tag.unprototype();
}

reporting.tag.unprototype = function () {
	//strip prototyped functions from dcs arrays so they are not reported as params
	for (var x in WT) if (typeof WT[x] == 'function') WT[x] = '';
	for (var x in DCS) if (typeof DCS[x] == 'function') DCS[x] = '';
	for (var x in DCSext) if (typeof DCSext[x] == 'function') DCSext[x] = '';
}
reporting.tag.unprototype();

if (!window.setCookie) {
	function setCookie(name, value, days) {
		var nameEQ = name + '=';
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days*24*60*60*1000));
			var expires = '; expires=' + date.toGMTString();
		}
		else var expires = '';
		document.cookie = nameEQ + value + expires + '; path=/';
	}
}

if (!window.getCookie) {
	function getCookie(name) {
		var nameEQ = name + '=';
		var cookies = document.cookie.split(';');
		for(var i=0;i < cookies.length;i++) {
			var c = cookies[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
		}
		return null;
	}
}


(function($){
	/* LOCAL, custom selector for [href^=/],[href*=location.host],[href*=att.com] */
	/* usage: $('a:local')                                                        */
	$.expr[':'].local = function (obj) {
		if (!obj.href) return false;
		var regex = new RegExp('(^\/)|(' + location.host + ')|(att\.com)|(swot\.sbc\.com)');
		return regex.test(obj.href);
	}

	/* ISVISIBLE, custom selector for elements with scrollWidth .gt. 0 */
	/* usage: $('div:isvisible')                                       */
	$.expr[':'].isvisible = function (obj) {
		return (obj.scrollWidth > 0);
	}

	/* ISHIDDEN, custom selector for elements with scrollWidth .lt. 1 */
	/* usage: $('div:ishidden')                                       */
	$.expr[':'].ishidden = function (obj) {
		return (obj.scrollWidth < 1);
	}

	/* ENTERKEY, custom selector for binding to enterkey */
	/* usage: $('input:enterkey')                        */
	/* !!! Bad recursion here, removing entire selector  */
	$.expr[':'].enterkey = function (obj) {
		return false;
		
		$(obj).unbind('keydown', enterkey);
		$(obj).bind('keydown', enterkey);
		function enterkey (e) {
			if (e.which == 13) $(obj).trigger('blahblah');
		}
	}

	/* CONTENTS, custom selector for finding content within iframes */
	/* usage: $('iframe:contents(selector)')                        */
	$.expr[':'].contents = function (obj, index, meta, stack) {
		var contents = $(obj).contents().find(meta[3]);
		return contents.length;
		
		contents.unbind('ready load click cancel reset submit change mousedown keyup', iframeEvent);
		contents.bind('ready load click cancel reset submit change mousedown keyup', iframeEvent);	
		function iframeEvent (e) {
			$(obj).trigger(e.type);
		}
	}

	/* PAGE, custom selector for matching location.href */
	/* usage: $('head:page(/shop)')                     */
	$.expr[':'].page = function (obj, index, meta, stack) {
		return !!location.href.match(meta[3]);
	}

	/* WATCH, watches an element for changes to a property then calls an event    */
	/* usage: .watch(<changing_property>, <event_or_handler>, <restricted_value>) */
	// TODO: figure out how to namespace better and change back function name
	$.fn.mywatch = function(props, event, restricted) {
		return this.each(function() {
			var self = this;
			var fire = watch.call(self, props);

			$(self).bind('propertychange DOMAttrModified DOMSubtreeModified', run);
			self.setAttribute('test', 'test'); //test for mutation event support
			if (!self._watching.supported) setInterval(run, 500);

			return self;

			function run() {
				var newVal = fire();
				if (newVal != undefined && newVal != restricted) {
					if (run.throttle) return; else run.throttle = true;
					setTimeout(function(){run.throttle = false}, 500);
					if (typeof event == 'function') event.call(self);
					else $(self).trigger(event);
				}
			}
		});
	
		function watch(props) {
			var self = this;
			self._watching = self._watching||[];
			self._watching.props = (props||'length').replace(/\s+/g,',').split(',');

			fire('init');
			return fire;
		
			function fire(init) {
				if (!init) self._watching.supported = true;
				var props = self._watching.props;
				for (var i=0; i < props.length; ++i) {
					var _self = self.style && self.style[props[i]] != undefined ? self.style : self;
					var changed = _self[props[i]] != self._watching['$'+props[i]];
					if (!self._watching.supported || props[i] != 'innerText') self._watching['$'+props[i]] = _self[props[i]];
					if (changed && !init) return _self[props[i]];
				}
			}
		}
	}
	
	$.fn.myunwatch = function(props) {
		return $(this).each(function() {
			var self = this;
			unwatch.call(self, props);
			return self;
		});
	
		function unwatch(props) {
			var self = this;
			for (var i=0; i < self._watching.props; ++i) {
				if (self._watching.props[i].test(props)) delete self._watching.props[i];
			}
		}
	}

})(jQuery);

if (window.reporting_ready && reporting_ready.resolve) reporting_ready.resolve(reporting2);
else reporting_ready = reporting2;

jQuery(document).ready(function() {
	if (!window.webTrendTag) {
		webTrendMap = reporting.map;
		webTrendTag = reporting.tag;
		performWebTrendTag = reporting.tag.perform;
		logWebTrendTag = reporting.tag.log;
	}

	if (jQuery.fn.mywatch) jQuery(document.body).mywatch('innerText', 'PageModified');

	setTimeout(reporting.tag.clear, 500); //clear vars to help slot content tracking
});

webTrendTag_unprototype = reporting.tag.unprototype;

