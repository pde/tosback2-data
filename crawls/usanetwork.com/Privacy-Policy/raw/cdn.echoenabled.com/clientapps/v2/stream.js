// vim: set ts=8 sts=8 sw=8 noet:
/*
 * Copyright (c) 2006-2011 Echo <solutions@aboutecho.com>. All rights reserved.
 * You may copy and modify this script as long as the above copyright notice,
 * this condition and the following disclaimer is left intact.
 * This software is provided by the author "AS IS" and no warranties are
 * implied, including fitness for a particular purpose. In no event shall
 * the author be liable for any damages arising in any way out of the use
 * of this software, even if advised of the possibility of such damage.
 * Version: v2.6.34
 */

(function($) {

// we should not clear the window.$ variable without reason
// if $._$ is undefined it means that no lib on the page except our one is using window.$ variable
// and we do not need to clear it in order to avoid libs\versions conflicts

if (typeof($._$) != "undefined") {
        $.noConflict();
}



if (!window.Echo) window.Echo = {};
if (!Echo.Global) Echo.Global = {};
if (!Echo.Vars) Echo.Vars = {
	"regexps": {
		"matchLabel": /{Label:([^:}]+[^}]*)}/g,
		"matchData": /{Data:(([a-z]+\.)*[a-z]+)}/ig,
		"matchSelf": /{Self:(([a-z_]+\.)*[a-z_]+)}/ig,
		"mobileUA": /mobile|midp-|opera mini|iphone|ipad|blackberry|nokia|samsung|docomo|symbian|windows ce|windows phone|android|up\.browser|ipod|netfront|skyfire|palm|webos|audiovox/i,
		"parseUrl": /^((([^:\/\?#]+):)?\/\/)?([^\/\?#]*)?([^\?#]*)(\?([^#]*))?(#(.*))?/,
		"w3cdtf": /^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)Z$/
	}
};

$.extend({
	"addCss": function(cssCode, id) {
		Echo.Vars.css = Echo.Vars.css || {
			"index": 1,
			"processed": {}
		};
		if (id) {
			if (Echo.Vars.css.processed[id]) return;
			Echo.Vars.css.processed[id] = true;
		}
		var curCssCode = "";
		var oldStyle = Echo.Vars.css.anchor;
		if (oldStyle && oldStyle.length) {
			curCssCode = oldStyle.html();
		}
		// IE limit is 4095 rules per style tag
		// so we limit it to 100000 characters
		// (2000 rules x 50 characters per rule)
		if (curCssCode.length + cssCode.length > 100000) {
			Echo.Vars.css.index++;
			oldStyle = null;
			curCssCode = "";
		}
		var newStyle = $('<style id="echo-css-' + Echo.Vars.css.index + '" type="text/css">' + curCssCode + cssCode + '</style>');
		if (oldStyle && oldStyle.length) {
			// use replacing instead of adding css to existing element
			// because IE doesn't allow it
			oldStyle.replaceWith(newStyle);
		} else {
			if (Echo.Vars.css.anchor) {
				Echo.Vars.css.anchor.after(newStyle);
			} else {
				$(document.getElementsByTagName("head")[0] || document.documentElement).prepend(newStyle);
			}
		}
		Echo.Vars.css.anchor = newStyle;
	},
	"foldl": function(acc, object, callback) {
		$.each(object, function(key, item) {
			result = callback(item, acc, key);
			if (result !== undefined) acc = result;
		});
		return acc;
	},
	"intersperse": function(object, separator) {
		return $.foldl([], object, function(item, acc, key) {
			if (acc.length) acc.push(separator);
			acc.push(item);
		});
	},
	"getNestedValue": function(key, data, defaults, callback) {
		if (typeof key == "string") {
			key = key.split(/\./);
		}
		if (!key.length) return data;
		var found = true;
		var iteration = function(_key, _data) {
			if (callback) callback(_data, _key);
			if (typeof _data[_key] == "undefined") {
				found = false;
			} else {
				return _data[_key];
			}
		};
		// avoid foldl usage for plain keys
		var value = key.length == 1
			? iteration(key.pop(), data)
			: $.foldl(data, key, iteration);
		return found ? value : defaults;
	},
	"setNestedValue": function(obj, key, value) {
		var keys = key.split(/\./);
		var field = keys.pop();
		var data = $.getNestedValue(keys, obj, undefined, function(acc, v) {
			if (typeof acc[v] == "undefined") acc[v] = {};
		});
		data[field] = value;
	},
	"htmlize": function(text) {
		if (!text) return '';
		return $('<div>').text(text).html();
	},
	"object2JSON": function(obj) {
		var encodeJSONLiteral = function(string) {
			var replacements = {
				'\b': '\\b',
				'\t': '\\t',
				'\n': '\\n',
				'\f': '\\f',
				'\r': '\\r',
				'"' : '\\"',
				'\\': '\\\\'};
			return string.replace(/[\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff\\]/g,
				function (a) {
					return (replacements.hasOwnProperty(a))
						? replacements[a]
						: '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
				}
			);
		}
		var out;
		switch (typeof obj) {
			case "number"  : out = isFinite(obj) ? obj : 'null'; break;
			case "string"  : out = '"' + encodeJSONLiteral(obj) + '"'; break;
			case "boolean" : out = '"' + obj.toString() + '"'; break;
			default :
				if (obj instanceof Array) {
					var container = $.map(obj, function(element) { return $.object2JSON(element); });
					out = '[' + container.join(",") + ']';
				} else if (obj instanceof Object) {
					var source = obj.exportProperties || obj;
					var container = $.foldl([], source, function(value, acc, property) {
						if (source instanceof Array) {
							property = value;
							value = obj[property];
						}
						acc.push('"' + property + '":' + $.object2JSON(value));
					});
					out = '{' + container.join(",") + '}';
				} else {
					out = 'null';
				}
		}
		return out;
	},
	"htmlTextTruncate": function(text, limit, postfix, forceClosingTags) {
		if (!limit || text.length < limit) return text;
		var tags = [], count = 0, finalPos = 0;
		var list = "br hr input img area param base link meta option".split(" ");
		var standalone = $.foldl({}, list, function(value, acc, key) {
			acc[value] = true;
		});
		for (var i = 0; i < text.length; i++) {
			var symbol = text.charAt(i);
			if (symbol == "<") {
				var tail = text.indexOf(">", i);
				if (tail < 0) return text;
				var source = text.substring(i + 1, tail);
				var tag = {"name": "", "closing": false};
				if (source.charAt(0) == "/") {
					tag.closing = true;
					source = source.substring(1);
				}
				tag.name = source.match(/(\w)+/)[0];
				if (tag.closing) {
					var current = tags.pop();
					if (!current || current.name != tag.name) return text;
				} else if (!standalone[tag.name]) {
					tags.push(tag);
				}
				i = tail;
			} else if (symbol == "&" && text.substring(i).match(/^(\S)+;/)) {
				i = text.indexOf(";", i);
			} else {
				if (count == limit) {
					finalPos = i;
					break;
				}
				count++;
			}
		}
		if (finalPos || forceClosingTags) {
			if (finalPos) {
				text = text.substring(0, finalPos) + (postfix || "");
			}
			for (var i = tags.length - 1; i >= 0; i--) {
				text += "</" + tags[i].name + ">";
			}
		}
		return text;
	},
	"mapClass2Object": function(e, ctl) {
		ctl = ctl || {};
		e.find("*").andSelf().each(function(i, el) {
			if (el.className) {
				var arr = el.className.split(/[ ]+/);
				$.each(arr, function(i, c) { ctl[c] = el; });
			}
		});
		return ctl;
	},
	"stripTags": function(text) {
		return $('<div>').html(text).text();
	},
	"parseUrl": function(url) {
		var parts = url.match(Echo.Vars.regexps.parseUrl);
		return parts ? {
			"scheme": parts[3],
			"domain": parts[4],
			"path": parts[5],
			"query": parts[7],
			"fragment": parts[9]
		} : undefined;
	},
	"toDOM": function(template, prefix, renderer) {
		var content = $(template);
		var elements = $.mapClass2Object(content);
		var dom = {
			"set": function(name, element) {
				elements[prefix + name] = element;
			},
			"get": function(name, ignorePrefix) {
				var element = elements[(ignorePrefix ? "" : prefix) + name];
				return element && $(element);
			},
			"remove": function(element) {
				var name;
				if (typeof element == "string") {
					name = prefix + element;
				} else {
					name = element.echo.name;
				}
				$(elements[name]).remove();
				delete elements[name];
			},
			"content": content
		};
		var rendererFunction;
		if (typeof renderer == 'object') {
			rendererFunction = function(name, element, dom) {
				if (!renderer[name]) return;
				return renderer[name](element, dom);
			}
		} else {
			rendererFunction = renderer;
		}
		$.each(elements, function(id, element) {
			var pattern = id.match(prefix + "(.*)");
			var name = pattern ? pattern[1] : undefined;
			if (name && rendererFunction) {
				element = $(element);
				element.echo = element.echo || {};
				element.echo.name = id;
				var node = rendererFunction(name, element, dom);
				if (typeof node != "undefined") element.empty().append(node);
			}
		});
		return dom;
	},
	"loadScriptContent": function(url, callback) {
		Echo.Vars.scriptState = Echo.Vars.scriptState || {};
		if (Echo.Vars.scriptState[url] == "loaded") {
			callback();
			return;
		}
		var id = Echo.Broadcast.subscribe("internal.scriptLoaded",
			function(topic, scriptURL) {
				if (url != scriptURL) return;
				Echo.Broadcast.unsubscribe("internal.scriptLoaded", id);
				callback();
			});
		if (Echo.Vars.scriptState[url] == "loading") return;
		Echo.Vars.scriptState[url] = "loading";
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.charset = "utf-8";
		script.src = url;
		var container = document.getElementsByTagName("head")[0] ||
				document.documentElement;
		container.insertBefore(script, container.firstChild);
		script.onload = script.onreadystatechange = function() {
			var state = script.readyState;
			if (!state || state == "loaded" || state == "complete") {
				Echo.Vars.scriptState[url] = "loaded";
				Echo.Broadcast.publish("internal.scriptLoaded", url);
				script.onload = script.onreadystatechange = null;
			}
		};
	},
	"sendPostRequest": function(url, data, callback){
		var id = "echo-post-" + Math.random();
		var container =
			$("#echo-post-request").length
				? $("#echo-post-request").empty()
				: $('<div id="echo-post-request"/>').css({"height": 0}).prependTo("body");
		// it won't work if the attributes are specified as a hash in the second parameter
		$('<iframe id="' + id + '" name="' + id + '" width="0" height="0" frameborder="0" border="0"></iframe>').appendTo(container);
		var form = $("<form/>", {
			"target" : id,
			"method" : "POST",
			"enctype" : "application/x-www-form-urlencoded",
			"acceptCharset" : "UTF-8",
			"action" : url
		})
			.appendTo(container);
		$.each(data, function(key, value) {
			$("<input/>", {
				"type" : "hidden",
				"name" : key,
				"value" : value
			})
			.appendTo(form);
		});
		form.submit();
		callback();
	},
	"getVisibleColor": function(elem) {
		// calculate visible color of element (transparent is not visible)
		var color;
		do {
			color = elem.css('backgroundColor');
			if (color != '' && color != 'transparent' && !/rgba\(0, 0, 0, 0\)/.test(color) || $.nodeName(elem.get(0), 'body')) {
				break;
			}
		} while (elem = elem.parent());
		return color || 'transparent';
	},
	"timestampFromW3CDTF": function(t) {
		var parts = ['year', 'month', 'day', 'hours', 'minutes', 'seconds'];
		var dt = {};
		var matches = t.match(Echo.Vars.regexps.w3cdtf);
		$.each(parts, function(i, p) {
			dt[p] = matches[i + 1];
		});
		return Date.UTC(dt['year'], dt['month'] - 1, dt['day'],
			dt['hours'], dt['minutes'], dt['seconds']) / 1000;
	},
	"isMobileDevice": function() {
		return Echo.Vars.regexps.mobileUA.test(navigator.userAgent);
	}
});



if (!Echo.Plugins) Echo.Plugins = {};

Echo.isExtended = function(plugin, unique, value) {
	if (!plugin) return false;
	value = value || true;
	var id = [plugin].concat(unique).join(".");
	Echo.Vars.extensions = Echo.Vars.extensions || {};
	if (Echo.Vars.extensions[id] == value) return true;
	Echo.Vars.extensions[id] = value;
	return false;
};

Echo.extendRenderer = function(component, method, renderer, plugin) {
	if (!component || !Echo[component] || !method || !renderer || !$.isFunction(renderer) ||
		Echo.isExtended(plugin, [component, "renderer", method])) return;
	var _renderer = Echo[component].prototype.renderers[method] || function() {};
	Echo[component].prototype.renderers[method] = function() {
		var config = plugin && this.config.get("plugins." + plugin);
		if (!config || !config.enabled) {
			return _renderer.apply(this, arguments);
		}
		var self = this;
		if (!this.parentRenderer) {
			this.parentRenderer = function(name, args) {
				return self.parentRenderers[name].apply(self, args);
			}
		}
		this.parentRenderers = this.parentRenderers || {};
		this.parentRenderers[method] = _renderer;
		return renderer.apply(this, arguments);
	};
};

Echo.extendTemplate = function(component, html, action, anchor, plugin) {
	if (!component || !Echo[component] || !action || !anchor || !html ||
		Echo.isExtended(plugin, [component, "template", anchor, action], html)) return;
	var _template = Echo[component].prototype.template;
	var template = $.isFunction(_template) ? _template : function() { return _template; };
	var classify = {
		"insertBefore": "before",
		"insertAfter": "after",
		"insertAsFirstChild": "prepend",
		"insertAsLastChild": "append",
		"replace": "replaceWith"
	};
	Echo[component].prototype.template = function() {
		var config = plugin && this.config.get("plugins." + plugin);
		if (!config || !config.enabled) {
			return template.call(this);
		}
		var dom = $('<div/>').html(template.call(this));
		$('.' + anchor, dom)[classify[action]](html);
		return dom.html();
	};
};

Echo.include = function(scripts, callback) {
	if (!scripts.length) return callback();
	var script = scripts.pop();
	Echo.include(scripts, function() {
		if (typeof script.loaded == "undefined") {
			if (script.application) {
				script.loaded = function() {
					return !!Echo[script.application];
				}
			} else {
				callback();
			}
		}
		if ($.isFunction(script.loaded) && !script.loaded()) {
			$.loadScriptContent(script.url, callback);
		} else {
			callback();
		}
	});
};

Echo.createPlugin = function(config) {
	if (!config || !config.name || !config.init || !config.applications) return {};
	var name = config.name;
	var configuration = function() {
		var config = function(key) {
			return "plugins." + name + (key ? "." + key : "");
		};
		config.get = function(component, key, defaults, askParent) {
			return component.config.get(
				config(key),
				askParent ? component.config.get(key, defaults) : defaults
			);
		};
		config.set = function(component, key, value) {
			component.config.set(config(key), value);
		};
		config.remove = function(component, key) {
			component.config.remove(config(key));
		};
		return config;
	};
	var init = config.init || function() {};
	Echo.Plugins[name] = Echo.Plugins[name] || $.extend(config, {
		"init": function(plugin, application) {
			var enabled = plugin.config.get(application, "enabled");
			if (typeof enabled == "undefined") {
				plugin.config.set(application, "enabled", true);
			}
			init(plugin, application);
		},
		"set": function(component, key, value) {
			component.vars = component.vars || {};
			component.vars[name] = component.vars[name] || {};
			$.setNestedValue(component.vars[name], key, value);
		},
		"get": function(component, key) {
			var data = (component.vars || {})[name] || {};
			if (!key) return data;
			return $.getNestedValue(key, data);
		},
		"addCss": function(text) {
			$.addCss(text, "plugins-" + name);
		},
		"label": function(key, data) {
			return Echo.Localization.label(key, "Plugins." + name, data);
		},
		"addLabels": function(data) {
			Echo.Localization.extend(data, "Plugins." + name);
		},
		"topic": function(prefix, action) {
			var namespace = typeof prefix == "string" ? prefix : prefix.namespace;
			return namespace + ".Plugins." + name + "." + action;
		},
		"config": configuration(),
		"subscribe": function(application, topic, handler) {
			var self = this;
			return application.subscribe(topic, function() {
				if (!application.isPluginEnabled(self.name)) return;
				handler.apply(this, arguments);
			});
		},
		"publish": function(application, topic, data) {
			application.publish(topic, data);
		},
		"unsubscribe": function(application, topic, handlerId) {
			application.unsubscribe(topic, handlerId)
		},
		"extendRenderer": function(component, method, renderer) {
			Echo.extendRenderer(component, method, renderer, name);
		},
		"extendTemplate": function(component, html, action, anchor) {
			Echo.extendTemplate(component, html, action, anchor, name);
		},
		"addItemControl": function(application, control) {
			var controls = application.config.get("itemControls." + name, []);
			application.config.set("itemControls." + name, controls.concat(control));
		},
		"assembleConfig": function(component, data) {
			data.user = component.user;
			data.appkey = component.config.get("appkey", "");
			data.plugins = this.config.get(component, "nestedPlugins", []);
			data.contextId = component.config.get("contextId");
			data.apiBaseURL = component.config.get("apiBaseURL");
			return (new Echo.Config(data, this.config.get(component))).getAsHash();
		}
	});
	return Echo.Plugins[name];
};



if (!Echo.Broadcast) Echo.Broadcast = {};

Echo.Broadcast.initContext = function(topic, contextId) {
	contextId = contextId || 'empty';
	Echo.Vars.subscriptions = Echo.Vars.subscriptions || {};
	Echo.Vars.subscriptions[contextId] = Echo.Vars.subscriptions[contextId] || {};
	Echo.Vars.subscriptions[contextId][topic] = Echo.Vars.subscriptions[contextId][topic] || {};
	return contextId;
};

Echo.Broadcast.subscribe = function(topic, handler, contextId) {
	var handlerId = (new Date()).valueOf() + Math.random();
	contextId = Echo.Broadcast.initContext(topic, contextId);
	Echo.Vars.subscriptions[contextId][topic][handlerId] = handler;
	return handlerId;
};

Echo.Broadcast.unsubscribe = function(topic, handlerId, contextId) {
	contextId = Echo.Broadcast.initContext(topic, contextId);
	if (topic && handlerId) {
		delete Echo.Vars.subscriptions[contextId][topic][handlerId];
	} else if (topic) {
		delete Echo.Vars.subscriptions[contextId][topic];
	}
};

Echo.Broadcast.publish = function(topic, data, contextId) {
	contextId = Echo.Broadcast.initContext(topic, contextId);
	if (contextId == '*') {
		$.each(Echo.Vars.subscriptions, function(ctxId) {
			$.each(Echo.Vars.subscriptions[ctxId][topic] || {}, function(handlerId, handler) {
				handler.apply(this, [topic, data]);
			});
		});
	} else {
		if (Echo.Vars.subscriptions[contextId][topic]) {
			$.each(Echo.Vars.subscriptions[contextId][topic], function(handlerId, handler) {
				handler.apply(this, [topic, data]);
			});
		}
		if (contextId != 'empty') Echo.Broadcast.publish(topic, data, 'empty');
	}
};



if (!Echo.Object) Echo.Object = function() {};

Echo.Object.prototype.init = function(data) {
	$.extend(this, data || {});
};

Echo.Object.prototype.template = "";

Echo.Object.prototype.namespace = "";

Echo.Object.prototype.cssPrefix = "echo-";

Echo.Object.prototype.substitute = function(template, data) {
	var self = this;
	template = template.replace(Echo.Vars.regexps.matchSelf, function($0, $1) {
		return $.getNestedValue($1, self) ||
			$.getNestedValue($1, self.data || {}) ||
			self.config.get($1, "");
	});
	template = template.replace(Echo.Vars.regexps.matchLabel, function($0, $1) {
		return self.label($1);
	});
	template = template.replace(Echo.Vars.regexps.matchData, function($0, $1) {
		return $.getNestedValue($1, data, '');
	});
	return template;
};

Echo.Object.prototype.renderers = {};

Echo.Object.prototype.label = function(name, data) {
	var label = Echo.Localization.label(name, this.namespace, data);
	return label != name ? label : Echo.Localization.label(name, "", data);
};

Echo.Object.prototype.render = function(name, element, dom, extra) {
	var self = this;
	if (name) {
		if ($.isFunction(this.renderers[name])) {
			return this.renderers[name].call(this, element, dom, extra);
		}
	} else {
		var template = $.isFunction(this.template) ? this.template() : this.template;
		this.dom = $.toDOM(this.substitute(template, this.data || {}), this.cssPrefix, function() {
			return self.render.apply(self, arguments);
		});
		return this.dom.content;
	}
};

Echo.Object.prototype.rerender = function(name, recursive) {
	var self = this;
	if (!name) {
		if (this.dom) this.dom.content.replaceWith(this.render());
		return;
	}
	if (!this.dom) return;
	if (typeof name != "string") {
		$.map(name, function(element) {
			self.rerender(element, recursive);
		});
		return;
	} else if (!this.dom.get(name)) return;
	if (recursive) {
		var template = $.isFunction(this.template) ? this.template() : this.template;
		var html = this.substitute(template, this.data || {});
		var oldNode = this.dom.get(name);
		var newNode = $('.' + this.cssPrefix + name, $(html));
		newNode = $.toDOM(newNode, this.cssPrefix, function(name, element, dom) {
			self.dom.set(name, element);
			return self.render.apply(self, arguments);
		}).content;
		oldNode.replaceWith(newNode);
	} else {
		var element = this.dom.get(name);
		var node = this.renderers[name].call(this, element, this.dom);
		if (typeof node != "undefined") element.empty().append(node);
	}
};

Echo.Object.prototype.hyperlink = function(data, options) {
	options = options || {};
	if (options.openInNewWindow && !data.target) {
		data.target = '_blank';	
	}
	var caption = data.caption || "";
	delete data.caption;
	if (!options.skipEscaping) {
		data.href = $.htmlize(data.href);
	}
	data.href = data.href || "javascript:void(0)";
	var attributes = $.foldl([], data, function(value, acc, key) {
		acc.push(key + '="' + value + '"');
	});
	return "<a " + attributes.join(" ") + ">" + caption + "</a>";
};

Echo.Object.prototype.newContextId = function() {
	return (new Date()).valueOf() + Math.random();
};

Echo.Object.prototype.getContextId = function() {
	return this.config && this.config.get("contextId");
};

Echo.Object.prototype.subscribe = function(topic, handler) {
	return Echo.Broadcast.subscribe(topic, handler, this.getContextId());
};

Echo.Object.prototype.unsubscribe = function(topic, handlerId) {
	Echo.Broadcast.unsubscribe(topic, handlerId, this.getContextId());
};

Echo.Object.prototype.publish = function(topic, data) {
	Echo.Broadcast.publish(topic, data, this.getContextId());
};

Echo.Object.prototype.clearCache = function() {
	if (this.vars && this.vars.cache) this.vars.cache = {};
};



Echo.Application = function() {
	this.addCss();
};

Echo.Application.prototype = new Echo.Object();

Echo.Application.prototype.localization = {
	"loading": "Loading...",
	"retrying": "Retrying...",
	"error_busy": "Loading. Please wait...",
	"error_timeout": "Loading. Please wait...",
	"error_waiting": "Loading. Please wait...",
	"error_view_limit": "View creation rate limit has been exceeded. Retrying in {seconds} seconds...",
	"error_view_update_capacity_exceeded": "This stream is momentarily unavailable due to unusually high activity. Retrying in {seconds} seconds...",
	"error_result_too_large": "(result_too_large) The search result is too large.",
	"error_wrong_query": "(wrong_query) Incorrect or missing query parameter.",
	"error_incorrect_appkey": "(incorrect_appkey) Incorrect or missing appkey.",
	"error_internal_error": "(internal_error) Unknown server error.",
	"error_quota_exceeded": "(quota_exceeded) Required more quota than is available.",
	"error_incorrect_user_id": "(incorrect_user_id) Incorrect user specified in User ID predicate.",
	"error_unknown": "(unknown) Unknown error."
};

Echo.Application.prototype.initApplication = function(callback) {
	var self = this;
	var appkey = this.config.get("appkey");
	if (!appkey) {
		this.showMessage({
			"type": "error",
			"message": "Incorrect or missing mandatory parameter appkey"
		});
		return;
	}
	this.config.get("target").addClass("echo-ui");
	this.user = this.config.get("user") || new Echo.User({
		"appkey": appkey,
		"apiBaseURL": this.config.get("apiBaseURL"),
		"contextId": this.config.get("contextId")
	});
	this.user.init(function() {
		self.initPlugins(callback);
	});
	Echo.Localization.extend(this.localization);
};

Echo.Application.prototype.messageTemplates = {
	'compact':
		'<span class="echo-application-message-icon echo-application-message-{Data:type}" title="{Data:message}">' +
		'</span>',
	'default':
		'<div class="echo-application-message">' +
			'<span class="echo-application-message-icon echo-application-message-{Data:type} echo-primaryFont">' +
				'{Data:message}' +
			'</span>' +
		'</div>'
};

Echo.Application.prototype.showMessage = function(data, target) {
	if (!this.config.get("debug") && data.type == "error") return;
	var template = this.messageTemplates[data.layout || this.messageLayout || "default"];
	(target || this.config.get("target")).empty().append(this.substitute(template, data));
};

Echo.Application.prototype.isWaitingForData = function(data) {
	return data && $.inArray(data.errorCode, ["waiting", "timeout", "busy", "view_limit", "view_update_capacity_exceeded"]) >= 0;
};

Echo.Application.prototype.isErrorWithTimer = function(data) {
	return data && $.inArray(data.errorCode, ["view_limit", "view_update_capacity_exceeded"]) >= 0;
};

Echo.Application.prototype.handleErrorResponse = function(data, config) {
	var self = this;
	config = config || {};
	var target = this.config.get("target");
	var calcWaitingTimeout = function() {
		// interval is calculated as e^x, x=[1..4]
		if (self.waitingTimeoutStep > 0) {
			if (self.waitingTimeoutStep < 4) {
				self.waitingTimeoutStep++;
			}
		} else {
			self.waitingTimeoutStep = 1;
		}
		return Math.round(Math.exp(self.waitingTimeoutStep)) * 1000;
	};
	var maxWaitingTimeout = 0;
	var timeElapsed = 0;
	var showError = function() {
		var params = {};
		if (self.isErrorWithTimer(data)) {
			params = {"seconds": (maxWaitingTimeout - timeElapsed) / 1000};
		}
		var label = self.label("error_" + data.errorCode, params);
		var message = label == "error_" + data.errorCode ? "(" + data.errorCode + ") " + (data.errorMessage || "") : label;
		target.show();
		self.showMessage({
			"type": self.isWaitingForData(data) ? "loading" : "error",
			"message": message
		}, config.messageTarget);
	};
	if (this.isWaitingForData(data)) {
		maxWaitingTimeout = calcWaitingTimeout();
		timeout = this.isErrorWithTimer(data) ? 1000 : maxWaitingTimeout;
		this.waitingTimer = setInterval(function() {
			timeElapsed += timeout;
			if (timeElapsed == maxWaitingTimeout) {
				self.cleanupErrorHandlers();
				if (self.isErrorWithTimer(data)) {
					self.showMessage({
						"type": "loading",
						"message": self.label("retrying")
					}, config.messageTarget);
				}
				if (config.waitingHandler) {
					config.waitingHandler();
				} else {
					self.refresh();
				}
			} else {
				showError();
			}
		}, timeout);
	} else {
		this.waitingTimeoutStep = 0;
	}
	if (this.error != data || this.isErrorWithTimer(data)) {
		if (!this.config.get("debug")) {
			target.hide();
		} else {
			showError();
		}
	}
	this.error = data;
	if (config.callback) config.callback(data);
};

Echo.Application.prototype.cleanupErrorHandlers = function(successResponseReceived) {
	if (successResponseReceived) {
		this.waitingTimeoutStep = 0;
		delete this.error;
	}
	if (this.waitingTimer) {
		clearInterval(this.waitingTimer);
	}
};

Echo.Application.prototype.initPlugins = function(callback) {
	var self = this;
	var plugins = this.config.get("pluginsOrder");
	var scripts = $.foldl([], plugins, function(name, acc) {
		var plugin = Echo.Plugins[name];
		if (plugin && plugin.dependencies && plugin.dependencies.length) {
			return acc.concat(plugin.dependencies);
		}
	});
	Echo.include(scripts, function() {
		$.map(plugins, function(name) {
			var plugin = Echo.Plugins[name];
			if (plugin && plugin.init && self.isPluginApplicable(plugin)) {
				plugin.init(plugin, self);
			}
		});
		if (callback) callback();
	});
};

Echo.Application.prototype.enablePlugin = function(name) {
	this.config.set("plugins." + name + ".enabled", true);
};

Echo.Application.prototype.disablePlugin = function(name) {
	this.config.set("plugins." + name + ".enabled", false);
};

Echo.Application.prototype.isPluginEnabled = function(name) {
	return this.config.get("plugins." + name + ".enabled", true);
};

Echo.Application.prototype.isPluginApplicable = function(plugin) {
	var self = this, applicable = false;
	$.each(plugin.applications, function(i, application) {
		if (Echo[application] && self instanceof Echo[application]) {
			applicable = true;
			return false; // break
		}
	});
	return applicable;
};

Echo.Application.prototype.initConfig = function(data, defaults, normalizer) {
	var _normalizer = {};
	_normalizer.target = function(el) { return $(el); };
	_normalizer.plugins = function(list) {
		var data = $.foldl({"hash": {}, "order": []}, list || [],
			function(plugin, acc) {
				var pos = $.inArray(plugin.name, acc.order);
				if (pos >= 0) {
					acc.order.splice(pos, 1);
				}
				acc.order.push(plugin.name);
				acc.hash[plugin.name] = plugin;
			});
		this.set("pluginsOrder", data.order);
		return data.hash;
	};
	data = $.extend({
		"plugins": []
	}, data || {});
	defaults = $.extend({
		"appkey": "",
		"apiBaseURL": window.location.protocol + "//api.echoenabled.com",
		"liveUpdates": true,
		"liveUpdatesTimeout": 10,
		"liveUpdatesTimeoutMin": 3,
		"debug": true,
		"contextId": this.newContextId()
	}, defaults || {});
	this.config = new Echo.Config(data, defaults, function(key, value) {
		var handler = normalizer && normalizer[key] || _normalizer && _normalizer[key];
		return handler ? handler.call(this, value) : value;
	});
};

Echo.Application.prototype.sendAPIRequest = function(data, callback) {
	data.query.appkey = this.config.get("appkey");
	$.get(this.config.get("apiBaseURL") + "/v1/" + data.endpoint,
		data.query, callback, "jsonp");
};

Echo.Application.prototype.initLiveUpdates = function(requestParamsGetter, responseHandler) {
	var self = this;
	this.liveUpdates = {
		"originalTimeout": this.config.get("liveUpdatesTimeout"),
		"timers": {},
		"timeouts": [],
		"responseHandler": function(data) {
			if (self.liveUpdates.timers.watchdog) {
				clearTimeout(self.liveUpdates.timers.watchdog);
			}
			self.changeLiveUpdatesTimeout(data);
			responseHandler(data);
		},
		"requestParamsGetter": requestParamsGetter
	};
};

Echo.Application.prototype.changeLiveUpdatesTimeout = function(data) {
	var self = this;
	// backwards compatibility
	if (typeof data == "string") {
		data = {"liveUpdatesTimeout": data};
	}
	data.liveUpdatesTimeout = parseInt(data.liveUpdatesTimeout);
	var applyServerDefinedTimeout = function(timeout) {
		if (!timeout && self.liveUpdates.originalTimeout != self.config.get("liveUpdatesTimeout")) {
			self.config.set("liveUpdatesTimeout", self.liveUpdates.originalTimeout);
		} else if (timeout && timeout > self.config.get("liveUpdatesTimeout")) {
			self.config.set("liveUpdatesTimeout", timeout);
		}
	};
	var hasNewData = function(data) {
		// for "v1/search" endpoint at the moment
		return !!(data.entries && data.entries.length);
	};
	if (!this.nextSince) {
		applyServerDefinedTimeout(data.liveUpdatesTimeout);
		return;
	}
	var currentTimeout = this.config.get("liveUpdatesTimeout");
	var since = parseInt(this.nextSince);
	var currentTime = Math.floor((new Date()).getTime() / 1000);
	// calculate the delay before starting next request:
	//   - have new data but still behind and need to catch up - use minimum timeout
	//   - have new data but on the track - increase timeout by 1 second
	//   - have no new data - increase timeout by 2 seconds
	var timeout = hasNewData(data)
		? currentTime - since > currentTimeout
			? this.config.get("liveUpdatesTimeoutMin", 3)
			: currentTimeout + 1
		: currentTimeout + 2;
	if (timeout > this.liveUpdates.originalTimeout) {
		timeout = this.liveUpdates.originalTimeout;
	}
	this.config.set("liveUpdatesTimeout", timeout);
	// if timeout remains the same, take server side value into account
	if (timeout == this.liveUpdates.originalTimeout) {
		applyServerDefinedTimeout(data.liveUpdatesTimeout);
	}

};

Echo.Application.prototype.stopLiveUpdates = function() {
	if (this.liveUpdates.timers.regular) {
		clearTimeout(this.liveUpdates.timers.regular);
	}
	if (this.liveUpdates.timers.watchdog) {
		clearTimeout(this.liveUpdates.timers.watchdog);
	}
};

Echo.Application.prototype.startLiveUpdates = function(force) {
	var self = this;
	if (!this.liveUpdates || !force && !this.config.get("liveUpdates") && !this.liveUpdates.timeouts.length) return;
	this.stopLiveUpdates();
	if (force) {
		// if live updates requests were forced after some operation, we will
		// perform 3 attempts to get live updates: immediately, in 1 second
		// and in 3 seconds after first one
		this.liveUpdates.timeouts = [0, 1, 3];
	}
	var timeout = this.liveUpdates.timeouts.length
		? this.liveUpdates.timeouts.shift()
		: this.config.get("liveUpdatesTimeout");
	this.liveUpdates.timers.regular = setTimeout(function() {
		// if no response in the reasonable time just restart live updates
		self.liveUpdates.timers.watchdog = setTimeout(function() {
			self.startLiveUpdates();
		}, 5000);
		self.sendAPIRequest(
			self.liveUpdates.requestParamsGetter(),
			self.liveUpdates.responseHandler);
	}, timeout * 1000);
};

Echo.Application.prototype.addCss = function() {
	var id = 'echo-css-fancybox';
	if ($('#' + id).length) return;
	var container = document.getElementsByTagName("head")[0] || document.documentElement;
	// using insertBefore DOM method instead of jquery
	// because in jquery >= 1.5 link element inserted incorrectly in IE 7-8
	container
		.insertBefore($("<link>", {
			"rel": "stylesheet",
			"id": id,
			"type": "text/css",
			"href": "//cdn.echoenabled.com/css/fancybox.css"
		}).get(0), $(container).children().get(0));
	$.addCss(
		'.echo-application-message { padding: 15px 0px; text-align: center; -moz-border-radius: 0.5em; -webkit-border-radius: 0.5em; border: 1px solid #E4E4E4; }' +
		'.echo-application-message-icon { display: inline-block; height: 16px; padding-left: 16px; background: no-repeat left center; }' +
		'.echo-application-message .echo-application-message-icon { padding-left: 21px; height: auto; }' +
		'.echo-application-message-empty { background-image: url(//cdn.echoenabled.com/images/information.png); }' +
		'.echo-application-message-loading { background-image: url(//cdn.echoenabled.com/images/loading.gif); }' +
		'.echo-application-message-error { background-image: url(//cdn.echoenabled.com/images/warning.gif); }'
	, 'application');
};



Echo.User = function(config) {
	this.data = {};
	this.config = new Echo.Config(config, {
		"appkey": "",
		"apiBaseURL": window.location.protocol + "//api.echoenabled.com",
		"contextId": undefined
	});
};

Echo.User.prototype.init = function(callback) {
	var self = this;
	this.callback = callback || function() {};
	if (!this.config.get("appkey") || !window.Backplane || !Backplane.getChannelID()) {
		this.set({});
		this.callback();
		return;
	}
	this.listenEvents();
	var state = this._global("get", "state");
	if (state == "ready") {
		this.set($.extend({}, this._global("get", "data")));
		this.callback();
	} else {
		var handlerId = Echo.Broadcast.subscribe("User.onInit", function(topic, data) {
			if (data.appkey != self.config.get("appkey")) return;
			Echo.Broadcast.unsubscribe("User.onInit", handlerId);
			self.set($.extend({}, self._global("get", "data")));
			self.callback();
		});
		if (state == "init") {
			this.request();
		}
	}
}

Echo.User.prototype.listenEvents = function() {
	var self = this;
	if (this.backplaneSubscriptionID) return;
	var publish = function(global) {
		var topic = (global ? "" : "internal.") + "User.onInvalidate";
		var data = {
			"data": self.data,
			"appkey": self.config.get("appkey")
		};
		var contextId = global ? undefined : self.config.get("contextId");
		Echo.Broadcast.publish(topic, data, contextId);
	};
	this.backplaneSubscriptionID = Backplane.subscribe(function(message) {
		if (message.type == "identity/ack") {
			var global = false;
			if (self._global("get", "state") == "ready") {
				global = true;
				self._global("set", "state", "init");
			};
			self.init(function() {
				publish();
				if (global) publish(true);
			});
		}
	});
};

Echo.User.prototype._global = function(action, key, value) {
	var appkey = this.config.get("appkey");
	Echo.Vars.users = Echo.Vars.users || {};
	Echo.Vars.users[appkey] = Echo.Vars.users[appkey] || {"state": "init", "data": {}};
	if (action == "get") {
		return Echo.Vars.users[appkey][key];
	}
	Echo.Vars.users[appkey][key] = value;
};

Echo.User.prototype.set = function() {
	if (!arguments.length) return;
	//checking for object type of argument and apply changes globally
	if (arguments.length == 1 && typeof arguments[0] == "object") {
		this._global("set", "data", arguments[0]);
		this.data = this.normalize(arguments[0]);
		this.account = this.assemble();
	//checking for key-value arguments and apply changes for this instance only
	} else if (arguments.length == 2 && typeof arguments[0] == "string") {
		this.account[arguments[0]] = arguments[1];
	}
};

Echo.User.prototype.get = function(key, defaults) {
	return (this.account.hasOwnProperty(key) && typeof this.account[key] != "undefined")
		? this.account[key]
		: defaults;
};

Echo.User.prototype.logout = function(callback) {
	var self = this;
	$.get(window.location.protocol + "//apps.echoenabled.com/v2/logout", {
		"sessionID": Backplane.getChannelID()
	}, function(data) {
		Backplane.expectMessages("identity/ack");
	}, "jsonp");
};

Echo.User.prototype.request = function(callback) {
	var self = this, appkey = this.config.get("appkey");
	this._global("set", "state", "waiting");
	$.get(this.config.get("apiBaseURL") + "/v1/users/whoami", {
		"appkey": appkey,
		"sessionID": Backplane.getChannelID()
	}, function(data) {
		if (data.result && data.result == "session_not_found") {
			data = {};
		}
		self._global("set", "state", "ready");
		self.set($.extend({}, data));
		Echo.Broadcast.publish("User.onInit", {"data": data, "appkey": appkey});
		if (callback) callback();
	}, "jsonp");
};

Echo.User.prototype.normalize = function(data) {
	var array2object = function(list) {
		return $.foldl({}, list || [], function(key, acc) { acc[key] = true; });
	};
	data = data || {};
	data.echo = data.echo || {};
	$.extend(data, data.echo);
	data.poco = data.poco || {"entry": {}};
	data.roles = array2object(data.echo.roles);
	data.markers = array2object(data.echo.markers);
	data.sessionID = window.Backplane && Backplane.getChannelID() || undefined;
	data.accounts = data.poco.entry.accounts || [];
	return data;
};

Echo.User.prototype.getActiveAccounts = function() {
	return $.map(this.data.accounts, function(entry) {
		if (entry.loggedIn == "true") return entry;
	});
};

Echo.User.prototype.assemble = function() {
	var accounts = this.getActiveAccounts();
	var account = accounts[0] || {};
	return $.extend(this.data, {
		"id": account.identityUrl || this.data.poco.entry.id || account.userid,
		"name": account.displayName || account.username,
		"avatar": $.foldl(undefined, account.photos || [], function(img) {
			if (img.type == "avatar") return img.value;
		}),
		"state": this.data.echo.state || "Untouched",
		"domain": account.domain,
		"logged": !!accounts.length,
		"defaultAvatar": "//cdn.echoenabled.com/images/avatar-default.png",
		"fakeIdentityURL": "http://js-kit.com/ECHO/user/fake_user"
	});
};

Echo.User.prototype.hasIdentity = function(id) {
	var hasIdentity = false;
	$.each(this.data.accounts, function(i, account) {
		if (account.identityUrl && account.identityUrl == id) {
			hasIdentity = true;
			return false; // break
		}
	});
	return hasIdentity;
};

Echo.User.prototype.hasAny = function(field, values) {
	if (!this.account) return false;
	var self = this, satisfies = false;
	$.each(values, function(i, value) {
		var data = self.get(field, {});
		if ((typeof data == "string" && data == value) || data[value]) {
			satisfies = true;
			return false; // break
		}
	});
	return satisfies;
};

Echo.User.prototype.hasAnyRole = function(roles) {
	return this.hasAny("roles", roles);
};

Echo.User.prototype.isAdmin = function() {
	return this.hasAny("roles", ["administrator", "moderator"]);
};

Echo.User.prototype.logged = function() {
	return !!(this.account && this.account.logged);
};



Echo.Config = function(master, slave, normalizer) {
	var self = this;
	this.normalize = normalizer || function(key, value) { return value; };
	this.data = {};
	this.cache = {};
	if (!slave && !normalizer) {
		this.data = master;
	} else {
		$.each(this.combine(master, $.extend({}, slave)), function(key, value) {
			self.set(key, value);
		});
	}
};

Echo.Config.prototype.get = function(key, defaults) {
	var k = key;
	if (typeof k != "string") {
		k = k.join(".");
	}
	if (!this.cache.hasOwnProperty(k)) {
		this.cache[k] = $.getNestedValue(key, this.data);
	}
	return typeof this.cache[k] == "undefined" ? defaults : this.cache[k];
};

Echo.Config.prototype.set = function(key, value) {
	var keys = key.split(/\./);
	delete this.cache[key];
	if (typeof value == "object") {
		this.clearCacheByPrefix(key);
	}
	return $.setNestedValue(this.data, key, this.normalize(keys.pop(), value));
};

Echo.Config.prototype.remove = function(key) {
	var keys = key.split(/\./);
	var field = keys.pop();
	var data = $.getNestedValue(keys, this.data);
	delete data[field];
};

Echo.Config.prototype.combine = function(master, slave) {
	var self = this;
	return $.foldl(slave, master, function(value, acc, key) {
		acc[key] = $.isPlainObject(value) && slave.hasOwnProperty(key)
			? self.combine(value, slave[key])
			: value;
	});
};

Echo.Config.prototype.extend = function(extra) {
	var self = this;
	$.each(extra, function(key, value) {
		self.set(key, value);
	});
};

Echo.Config.prototype.getAsHash = function() {
	return this.data;
};

Echo.Config.prototype.clearCacheByPrefix = function(prefix) {
	var self = this;
	prefix += ".";
	$.each(this.cache, function(key, data) {
		// key starts with prefix
		if (!key.indexOf(prefix)) {
			delete self.cache[key];
		}
	});
};



if (!Echo.UI) Echo.UI = {
	cornersCss: function(radius, scopeClass) {
		return ('{scope}.ui-corner-tl { -moz-border-radius-topleft: {radius}; -webkit-border-top-left-radius: {radius}; border-top-left-radius: {radius}; }' +
		'{scope}.ui-corner-tr { -moz-border-radius-topright: {radius}; -webkit-border-top-right-radius: {radius}; border-top-right-radius: {radius}; }' +
		'{scope}.ui-corner-bl { -moz-border-radius-bottomleft: {radius}; -webkit-border-bottom-left-radius: {radius}; border-bottom-left-radius: {radius}; }' +
		'{scope}.ui-corner-br { -moz-border-radius-bottomright: {radius}; -webkit-border-bottom-right-radius: {radius}-bottom-right-radius: {radius}; }' +
		'{scope}.ui-corner-top { -moz-border-radius-topleft: {radius}; -webkit-border-top-left-radius: {radius}; border-top-left-radius: {radius}; -moz-border-radius-topright: {radius}; -webkit-border-top-right-radius: {radius}; border-top-right-radius: {radius}; }' +
		'{scope}.ui-corner-bottom { -moz-border-radius-bottomleft: {radius}; -webkit-border-bottom-left-radius: {radius}; border-bottom-left-radius: {radius}; -moz-border-radius-bottomright: {radius}; -webkit-border-bottom-right-radius: {radius}; border-bottom-right-radius: {radius}; }' +
		'{scope}.ui-corner-right {  -moz-border-radius-topright: {radius}; -webkit-border-top-right-radius: {radius}; border-top-right-radius: {radius}; -moz-border-radius-bottomright: {radius}; -webkit-border-bottom-right-radius: {radius}; border-bottom-right-radius: {radius}; }' +
		'{scope}.ui-corner-left { -moz-border-radius-topleft: {radius}; -webkit-border-top-left-radius: {radius}; border-top-left-radius: {radius}; -moz-border-radius-bottomleft: {radius}; -webkit-border-bottom-left-radius: {radius}; border-bottom-left-radius: {radius}; }' +
		'{scope}.ui-corner-all { -moz-border-radius: {radius}; -webkit-border-radius: {radius}; border-radius: {radius}; }').replace(/{scope}/g, scopeClass || "").replace(/{radius}/g, radius);
	}
};

(function() {
	$.addCss(
		'.echo-ui { text-align: left; }' +
		'.echo-ui .ui-helper-hidden { display: none; }' +
		'.echo-ui .ui-helper-hidden-accessible { position: absolute; left: -99999999px; }' +
		'.echo-ui .ui-helper-reset { margin: 0; padding: 0; border: 0; outline: 0; line-height: 1.3; text-decoration: none; font-size: 100%; list-style: none; }' +
		'.echo-ui .ui-helper-clearfix:after { content: "."; display: block; height: 0; clear: both; visibility: hidden; }' +
		'.echo-ui .ui-helper-clearfix { display: inline-block; }' +
		'/* required comment for clearfix to work in Opera \\*/' +
		'* html .echo-ui .ui-helper-clearfix { height:1%; }' +
		'.echo-ui .ui-helper-clearfix { display:block; }' +
		'/* end clearfix */' +
		'.echo-ui .ui-helper-zfix { width: 100%; height: 100%; top: 0; left: 0; position: absolute; opacity: 0; filter:Alpha(Opacity=0); }' +
		'.echo-ui .ui-resizable-handle { position: absolute;font-size: 0.1px;z-index: 99999; display: block;}' +
		'.echo-ui .ui-resizable-disabled .ui-resizable-handle, .ui-resizable-autohide .ui-resizable-handle { display: none; }' +
		'.echo-ui .ui-resizable-n { cursor: n-resize; height: 7px; width: 100%; top: -5px; left: 0; }' +
		'.echo-ui .ui-resizable-s { cursor: s-resize; height: 7px; width: 100%; bottom: -5px; left: 0; }' +
		'.echo-ui .ui-resizable-e { cursor: e-resize; width: 7px; right: -5px; top: 0; height: 100%; }' +
		'.echo-ui .ui-resizable-w { cursor: w-resize; width: 7px; left: -5px; top: 0; height: 100%; }' +
		'.echo-ui .ui-resizable-se { cursor: se-resize; width: 12px; height: 12px; right: 1px; bottom: 1px; }' +
		'.echo-ui .ui-resizable-sw { cursor: sw-resize; width: 9px; height: 9px; left: -5px; bottom: -5px; }' +
		'.echo-ui .ui-resizable-nw { cursor: nw-resize; width: 9px; height: 9px; left: -5px; top: -5px; }' +
		'.echo-ui .ui-resizable-ne { cursor: ne-resize; width: 9px; height: 9px; right: -5px; top: -5px;}' +
		'.echo-ui .ui-state-disabled { cursor: default !important; }' +
		'.echo-ui .ui-icon { display: block; text-indent: -99999px; overflow: hidden; background-repeat: no-repeat; width: 16px; height: 16px; }' +
		'.echo-ui .ui-widget-header { font-weight: bold; border: 0px; }' +
		'.echo-ui, .echo-ui .ui-widget :active { outline: none; }' +
		'.echo-ui .ui-state-default { border: 1px solid #d3d3d3; background: #e6e6e6; color: #555555; }' +
		'.echo-ui .ui-state-default a, .echo-ui .ui-state-default a:link, .echo-ui .ui-state-default a:visited { color: #555555; text-decoration: none; }' +
		'.echo-ui .ui-state-hover, .echo-ui .ui-state-focus { border: 1px solid #999999; background: #dfebf2; color: #212121; }' +
		'.echo-ui .ui-state-hover a, .echo-ui .ui-state-hover a:hover { color: #212121; text-decoration: none; }' +
		'.echo-ui .ui-state-active { border: 1px solid #aaaaaa; background: #dfebf2; color: #212121; }' +
		'.echo-ui .ui-state-active a, .echo-ui .ui-state-active a:link, .echo-ui .ui-state-active a:visited { color: #212121; text-decoration: none; }' +

		'.echo-primaryBackgroundColor {  }' +
		'.echo-secondaryBackgroundColor { background-color: #F4F4F4; }' +
		'.echo-trinaryBackgroundColor { background-color: #ECEFF5; }' +
		'.echo-primaryColor { color: #3A3A3A; }' +
		'.echo-secondaryColor { color: #C6C6C6; }' +
		'.echo-primaryFont { font-family: Arial, sans-serif; font-size: 12px; font-weight: normal; line-height: 16px; }' +
		'.echo-secondaryFont { font-family: Arial, sans-serif; font-size: 11px; }' +
		'.echo-linkColor, .echo-linkColor a { color: #476CB8; }' +
		'.echo-clickable { cursor: pointer; }' +
		'.echo-relative { position: relative; }' +
		'.echo-clear { clear: both; }'
	, 'ui-general');
})();



(function($) {

// jQuery Mobile uses jQuery 1.6.4+
if ($.fn.jquery && $.fn.jquery < "1.6.4") return;

Echo.UI.MobileDialog = function(data) {
	data.config = data.config || {};
	this.init(data);
	this.addCss();
	this.contentElement = this.render().addClass('echo-ui');
	this.contentElement.appendTo(document.body);
	if (this.content) {
		if ($.isFunction(this.content)) {
			this.content($(".echo-mobiledialog-content", this.contentElement));
		} else {
			$(".echo-mobiledialog-content", this.contentElement).append(this.content);
		}
	}
	if (this.hasTabs) {
		// move tabs line to dialog header to prevent tabs scrolling
		$('.echo-mobiledialog-header', this.contentElement).after($('.echo-tabs-header', this.contentElement));
	}
	$(":checkbox", this.contentElement).bind ("change", function (event) {
		// set checked attribute for checkboxes
		$(this).attr("checked", $(this).prop('checked'));
	});
	if (this.config.autoOpen) this.open();
}

Echo.UI.MobileDialog.prototype = new Echo.Object();

Echo.UI.MobileDialog.prototype.cssPrefix = "echo-mobiledialog-";

Echo.UI.MobileDialog.prototype.template =  function() {
	return  '<div data-role="dialog" class="echo-mobiledialog">' +
			'<div data-role="header" class="echo-mobiledialog-title"><h1>' + this.config.title + '</h1></div>' +
			'<div data-role="content" class="echo-mobiledialog-container">' +
				'<div class="echo-mobiledialog-header"></div>' +
				'<div class="echo-mobiledialog-content"></div>' +
			'</div>' +
		'</div>';
}

Echo.UI.MobileDialog.prototype.open = function() {
	$.mobile.changePage(this.contentElement, 'pop', false, true);
}

Echo.UI.MobileDialog.prototype.close = function() {
	this.contentElement.is(":visible") && this.contentElement.dialog('close');
};

Echo.UI.MobileDialog.prototype.addCss = function() {
	$.addCss(
		'.echo-mobiledialog .ui-icon-delete { background: url(//cdn.echoenabled.com/images/container/closeWindow.png) no-repeat 4px 5px; border-radius: 0px; }' +
		'.echo-mobiledialog .ui-select .ui-icon { height: 18px; width: 18px; }' +
		'.echo-mobiledialog .ui-checkbox { position: static; margin: 0px; float: left; height: 18px; padding-top: 2px; }' +
		'.echo-mobiledialog .ui-checkbox input { position: static; margin: 0px; margin-left: 5px; } ' +
		'.echo-mobiledialog .ui-checkbox .ui-btn { margin: -25px 0px 0px 0px; }' +
		'.echo-mobiledialog .ui-checkbox .ui-btn .ui-btn-inner { padding-left: 25px; padding-right: 10px; }' +
		'.echo-mobiledialog .ui-checkbox .ui-btn-icon-left .ui-icon { left: 5px; }' +
		'.echo-mobiledialog .echo-curation-queries-state .ui-checkbox span { margin: 0px;  padding-left: 0px; padding-right: 0px;}' +
		'.echo-mobiledialog .echo-curation-queries-state .ui-checkbox .ui-icon { margin-top: -9px;}' +
		'.echo-mobiledialog .echo-curation-queries-state .ui-checkbox .ui-btn-text { margin: 0px; padding-left: 0px; padding-right: 0px; }' +
		'.echo-mobiledialog .echo-curation-queries-state .ui-checkbox .ui-btn-text  span { margin: 0px; padding-left: 18px }' +
		'.echo-mobiledialog .ui-btn-icon-notext .ui-btn-inner { padding: 2px 1px 0px 3px; height: 16px; } ' +
		'.echo-mobiledialog .ui-btn-icon-notext .ui-btn-inner .ui-icon { margin: 0px; float: left; } ' +
		'.echo-mobiledialog .ui-btn .ui-icon { float: left }' +
		'.echo-mobiledialog .ui-btn-hidden  { line-height: normal; }' +
		'.echo-mobiledialog .ui-btn-inner  { border-top: none; }' +
		'.echo-mobiledialog .echo-submit-content { border: none; background: none; } ' +
		'.echo-mobiledialog .echo-submit-border { border: none; background: none; } ' +
		'.echo-mobiledialog .echo-curation-queries-content { margin: 18px 0px; } ' +
		'.echo-mobiledialog .echo-submit-metadata-wrapper { border: none; background: none; } ' +
		'.echo-mobiledialog .echo-curation-queries-itemsPerPage { height: 22px; width: 48px; font-size: 12px; display: inline; } ' +
		'.echo-mobiledialog .echo-curation-input { width: 100%; font-size: 12px; }' +
		'.echo-mobiledialog .echo-curation-queries-query { height: 200px; }' +
		'.echo-mobiledialog .echo-submit-metadata-label { margin-top: 8px; }' +
		'.echo-mobiledialog .echo-submit-cancelButton { margin: 19px 15px 0px 0px; }' +
		'.echo-mobiledialog .echo-submit-metadata-subwrapper input { width: 100%; }' +
		'.echo-mobiledialog .echo-submit-text-area { width: 100%; height: 102px; }' +
		'.echo-mobiledialog .echo-curation-queries-state { height: 38px; }' +
		'.echo-mobiledialog .echo-curation-queries-left { margin-right: 10px; }' +
		Echo.UI.cornersCss('7px', '.echo-mobiledialog ')
	, 'ui-dialog');
};
})(jQuery);



Echo.UI.Dialog = function(data) {
	// if jquery mobile is used
	if ($.mobile) return new Echo.UI.MobileDialog(data);
	data.config = data.config || {};
	this.init(data);
	this.config.dialogClass = 'echo-ui echo-dialog ' + (this.config.dialogClass || '');
	this.addCss();
	this.contentElement = this.render().dialog(this.config).addClass('ui-corner-all');
	if (this.content) {
		if ($.isFunction(this.content)) {
			this.content(this.contentElement);
		} else {
			this.contentElement.append(this.content);
		}
	}
	this.widget = this.contentElement.dialog('widget');
	if (this.hasTabs) {
		// move tabs line to dialog header to prevent tabs scrolling
		$('.ui-dialog-titlebar', this.widget).after($('.echo-tabs-header', this.widget));
	}
};

Echo.UI.Dialog.prototype = new Echo.Object();

Echo.UI.Dialog.prototype.cssPrefix = "echo-dialog-";

Echo.UI.Dialog.prototype.template = "<div></div>";

Echo.UI.Dialog.prototype.open = function() {
	// hide contentElement for jquery to calculate dialog height correctly in IE
	this.contentElement.hide();
	this.contentElement.dialog('open');
	this.contentElement.show();
};

Echo.UI.Dialog.prototype.close = function() {
	this.contentElement.dialog('close');
};

Echo.UI.Dialog.prototype.addCss = function() {
	$.addCss(
		'.echo-dialog { position: absolute; padding: 0px 7px 20px 7px; width: 300px; border: 1px solid #aaaaaa; background: #dfebf2; -moz-border-radius: 7px; -webkit-border-radius: 7px; border-radius: 7px;' + (!$.browser.msie ? ' overflow: hidden;' : '') + ' }' +
		'.echo-dialog .ui-dialog-titlebar { background: #dfebf2; cursor: move; padding: 7px 0px 10px 5px; position: relative; color: #4a4a4a; font: 18px Helvetica,sans-serif; }' +
		'.echo-dialog .ui-dialog-titlebar .ui-state-default, .echo-dialog .ui-dialog-titlebar .ui-state-active, .echo-dialog .ui-dialog-titlebar .ui-state-hover, .echo-dialog .ui-dialog-titlebar .ui-state-focus { border: 0px; background: none; }' +
		'.echo-dialog .ui-dialog-title { float: left; margin: .1em 16px .2em 0; } ' +
		'.echo-dialog .ui-dialog-titlebar-close { position: absolute; right: 0px; top: 50%; width: 19px; margin: -10px 0 0 0; padding: 0px; height: 18px; }' +
		'.echo-dialog .ui-dialog-titlebar-close span { display: block; margin: 1px; }' +
		'.echo-dialog .ui-dialog-titlebar-close:hover, .ui-dialog .ui-dialog-titlebar-close:focus { padding: 0px; }' +
		'.echo-dialog .ui-dialog-content { border: 0; padding: 0px; margin: 0px; background: #ffffff; overflow: auto; }' +
		'.echo-dialog .ui-resizable-se { width: 14px; height: 14px; right: 3px; bottom: 3px; }' +
		'.echo-dialog .ui-icon-closethick { background: no-repeat top right url(//cdn.echoenabled.com/images/container/closeWindow.png); }' +
		'.echo-dialog .ui-icon-grip-diagonal-se { background: no-repeat bottom right url(//cdn.echoenabled.com/images/container/resizeHandle.png); }' +
		Echo.UI.cornersCss('7px', '.echo-dialog ')
	, 'ui-dialog');
	if ($.browser.msie) {
		$.addCss('.echo-dialog .ui-dialog-content { zoom: 1; position: relative; }', 'ui-dialog-ie');
	}
};



Echo.UI.Tabs = function(data) {
	var self = this;
	data.config = data.config || {};
	this.init(data);
	if (!this.tabs) return;
	var classPrefix = this.idPrefix;
	// add random part to get unique id
	this.idPrefix = this.idPrefix + Math.ceil(Math.random() * 999999999) + '-';
	this.addCss();
	var disabledTabs = $.foldl([], this.tabs, function(tab, acc, i) {
		tab.classPrefix = classPrefix;
		tab.idPrefix = self.idPrefix;
		if (tab.icon) {
			tab.label = '<span>' + tab.label + '</span>';
		}
		if (tab.disabled) {
			acc.push(i);
		}
	});
	this.target.append(this.render());
	this.tabIndexById = {};
	$.each(this.tabs, function(i, tab) {
		self.tabIndexById[tab.id] = i;
		if (tab.content) {
			var tgt = $('#' + tab.idPrefix + tab.id);
			if ($.isFunction(tab.content)) {
				tab.content(tgt);
			} else {
				tgt.append(tab.content);
			}
		}
	});
	// if tabs will be placed into another UI element (dialog, another tabs) better not to add another echo-ui class
	if (this.addUIClass !== false) {
		this.target.addClass('echo-ui');
	}
	$.extend(this.config, {
		"disabled": disabledTabs.concat(self.config.disabled || []),
		"select": function(event, ui) {
			self.content[ui.index ? 'addClass' : 'removeClass']('ui-corner-tl');
		}
	});
	this.headerElement = $('.echo-tabs-header', this.target).tabs(this.config);
	this.panelsElement = $('.echo-tabs-panels', this.target).tabs(this.config);
	$('.echo-tabs-header, .echo-tabs-header .ui-tabs-nav', this.target).removeClass('ui-corner-all');
	this.content = $(this.content || '.echo-tabs-panels', this.target);
	// top right corner of content panel should not be rounded while first tab is selected
	this.content.removeClass('ui-corner-all').addClass('ui-corner-tr ui-corner-bottom');
};

Echo.UI.Tabs.prototype = new Echo.Object();

Echo.UI.Tabs.prototype.cssPrefix = "echo-tabs-";

Echo.UI.Tabs.prototype.template = function() {
	var self = this;
	return '<div class="echo-tabs">' +
		'<div class="echo-tabs echo-tabs-header">' +
			'<ul>' +
				$.map(this.tabs, function(tab) {
					return self.substitute('<li><a class="echo-{Data:classPrefix}{Data:id}" href="#{Data:idPrefix}{Data:id}">{Data:label}</a></li>', tab);
				}).join("\n") +
			'</ul>' +
		'</div>' +
		'<div class="echo-tabs echo-tabs-panels"></div>' +
	'</div>';
};

Echo.UI.Tabs.prototype.renderers = {};

Echo.UI.Tabs.prototype.renderers.panels = function(element) {
	var self = this;
	$.each(this.tabs, function(i, tab) {
		var node = $.toDOM(self.substitute('<div id="{Data:idPrefix}{Data:id}" class="{Data:idPrefix}{Data:id}"></div>', tab));
		element.append(node.content);
	});
};

Echo.UI.Tabs.prototype.select = function(id) {
	this.headerElement.tabs('select', this.tabIndexById[id]);
}

Echo.UI.Tabs.prototype.add = function(tab, index) {
	index ? this.tabs.splice(index, 0, tab) : (index = this.tabs.push(tab) - 1);
	tab = $.extend(tab, {
		"classPrefix": this.classPrefix,
		"idPrefix": this.idPrefix
	});
	var headerTemplate = this.substitute('<li>' +
		'<a class="echo-{Data:classPrefix}{Data:id}" href="#{Data:idPrefix}{Data:id}">' +
			'{Data:label}' +
		'</a>' +
	'</li>', tab);
	// ATTENTION: Low level code hack. Make sure that you understand what you do!
	var panels = this.panelsElement.data("tabs").panels;
	this.tabIndexById[tab.id] = index;
	this.headerElement.tabs("option", "tabTemplate", headerTemplate);
	this.headerElement.tabs("add", "#" + this.idPrefix + tab.id, tab.label, index);
	if (index >= panels.length) {
		$("#" + this.idPrefix + tab.id, this.headerElement).remove().appendTo(this.panelsElement);
	} else {
		$("#" + this.idPrefix + tab.id, this.headerElement).remove().insertBefore(panels[index]);
	}
	this.headerElement.tabs($.extend(this.config, {
		"tabs": this.tabs
	}));
	return index;
};

Echo.UI.Tabs.prototype.updateTabIndexById = function() {
	var self = this;
	$.each(this.tabs, function(i, tab) {
		self.tabIndexById[tab.id] = i;
	});
};

Echo.UI.Tabs.prototype.remove = function(id) {
	if (typeof this.tabIndexById[id] == "undefined") return;
	this.headerElement.tabs("remove", this.tabIndexById[id]);
	this.tabs.splice(this.tabIndexById[id], 1);
	this.updateTabIndexById();
	$("#" + this.idPrefix + id, this.panelsElement).remove();
	delete this.tabIndexById[id];
};

Echo.UI.Tabs.prototype.addCss = function() {
	$.addCss(
		'.echo-ui .ui-tabs { position: relative; padding: 0px; border: 0px; }' +
		'.echo-tabs .echo-tabs-panels { background: #ffffff; }' +
		'.echo-ui .ui-tabs .ui-tabs-nav { margin: 0; padding: 0px; }' +
		'.echo-ui .ui-tabs .ui-tabs-nav li { list-style: none; float: left; position: relative; top: 1px; margin: 0 .2em 1px 0; border-bottom: 0 !important; padding: 0; white-space: nowrap; }' +
		'.echo-ui .ui-tabs .ui-tabs-nav li a { float: left; padding: .3em .7em; text-decoration: none; font-size: 12px; font-family: Helvetica,sans-serif; outline: none; }' +
		'.echo-ui .ui-tabs .ui-tabs-nav li.ui-tabs-selected { margin-bottom: 0; padding-bottom: 1px; }' +
		'.echo-ui .ui-tabs .ui-tabs-nav li.ui-tabs-selected a, .echo-ui .ui-tabs .ui-tabs-nav li.ui-state-disabled a, .echo-ui .ui-tabs .ui-tabs-nav li.ui-state-processing a { cursor: text; color: #4a4a4a; }' +
		'.echo-ui .ui-tabs .ui-tabs-nav li a, .echo-ui .ui-tabs.ui-tabs-collapsible .ui-tabs-nav li.ui-tabs-selected a { cursor: pointer; color: #393939; }' +
		'.echo-ui .ui-tabs .ui-tabs-panel { display: block; border-width: 0; padding: 1em 1.4em; background: none; }' +
		'.echo-ui .ui-tabs .ui-tabs-hide { display: none !important; }' +
		'.echo-ui .echo-tabs-header .ui-state-hover, .echo-ui .echo-tabs-header .ui-state-focus { border: 0px; background: none; color: #212121; }' +
		'.echo-ui .echo-tabs-header .ui-state-default { border: 0px; background: none; font-weight: normal; }' +
		'.echo-ui .echo-tabs-header .ui-state-active { border: 0px; background: #ffffff; font-weight: bold; }' +
		'.echo-ui .ui-tabs .ui-tabs-nav li a span { display: inline-block; padding-left: 22px; }' +
		($.browser.opera ? '.echo-ui .ui-tabs-nav { height: 25px; overflow: hidden; }' : '') +
		Echo.UI.cornersCss('7px', '.echo-tabs ')
	, 'ui-tabs');
	if ($.browser.msie) {
		$.addCss('.echo-ui .ui-tabs { zoom:  1; position: static; }', 'ui-tabs-ie');
	}
};



if (!Echo.Localization) Echo.Localization = { labels: {} };

Echo.Localization.key = function(name, namespace) {
	return (namespace ? namespace + "." : "") + name;
};

Echo.Localization.extend = function(labels, namespace) {
	$.each(labels, function(name, value) {
		Echo.Localization.labels[Echo.Localization.key(name, namespace)] = value;
	});
};

Echo.Localization.label = function(name, namespace, data) {
	var label = Echo.Localization.labels[Echo.Localization.key(name, namespace)] || name;
	$.each(data || {}, function(key, value) {
		label = label.replace(new RegExp("{" + key + "}", "g"), value);
	});
	return label;
};


})(jQuery);


(function($) {
Echo.Localization.extend({
	"defaultModeSwitchTitle": "Switch to metadata view",
	"guest": "Guest",
	"today": "Today",
	"yesterday": "Yesterday",
	"lastWeek": "Last Week",
	"lastMonth": "Last Month",
	"secondAgo": "Second Ago",
	"secondsAgo": "Seconds Ago",
	"minuteAgo": "Minute Ago",
	"minutesAgo": "Minutes Ago",
	"hourAgo": "Hour Ago",
	"hoursAgo": "Hours Ago",
	"dayAgo": "Day Ago",
	"daysAgo": "Days Ago",
	"weekAgo": "Week Ago",
	"weeksAgo": "Weeks Ago",
	"metadataModeSwitchTitle": "Return to default view",
	"monthAgo": "Month Ago",
	"monthsAgo": "Months Ago",
	"sharedThisOn": "I shared this on {service}...",
	"userID": "User ID:",
	"userIP": "User IP:",
	"textToggleTruncatedMore": "more",
	"textToggleTruncatedLess": "less",
	"fromLabel": "from",
	"viaLabel": "via",
	"childrenMoreItems": "View more items"
}, "Item");

Echo.Item = function(data) {
	this.vars = {};
	this.textExpanded = false;
	this.blocked = false;
	this.controlsOrder = [];
	this.controls = {}; 
	this.init(data);
};

Echo.Item.prototype = new Echo.Object();

Echo.Item.prototype.cssPrefix = "echo-item-";

Echo.Item.prototype.namespace = "Item";

Echo.Item.prototype.template = function() {
	var childrenTemplateChunk = this.isChildrenPaginationEnabled()
		? this.config.get("children.sortOrder") == "chronological"
			? '<div class="echo-item-children"></div>' +
			  '<div class="echo-item-expandChildren echo-item-container-child echo-trinaryBackgroundColor echo-clickable">' +
				'<span class="echo-item-expandChildrenLabel echo-message-icon"></span>' +
			  '</div>' +
			  '<div class="echo-item-childrenByCurrentActorLive"></div>'
			: '<div class="echo-item-expandChildren echo-item-container-child echo-trinaryBackgroundColor echo-clickable">' +
				'<span class="echo-item-expandChildrenLabel echo-message-icon"></span>' +
			  '</div>' +
			  '<div class="echo-item-children"></div>' +
			  '<div class="echo-item-childrenByCurrentActorLive"></div>'
		: '<div class="echo-item-children"></div>';
	return '<div class="echo-item-content">' +
		'<div class="echo-item-container">' +
			'<div class="echo-item-avatar-wrapper">' +
				'<div class="echo-item-avatar"></div>' +
			'</div>' +
			'<div class="echo-item-wrapper">' +
				'<div class="echo-item-subwrapper">' +
					'<div class="echo-item-subcontainer">' +
						'<div class="echo-item-frame">' +
							'<div class="echo-item-modeSwitch echo-clickable"></div>' +
							'<div class="echo-item-authorName echo-linkColor"></div>' +
							'<div class="echo-clear"></div>' +
							'<div class="echo-item-data">' +
								'<div class="echo-item-re"></div>' +
								'<div class="echo-item-body echo-primaryColor"> ' + 
									'<span class="echo-item-text"></span>' +
									'<span class="echo-item-textEllipses">...</span>' +
									'<span class="echo-item-textToggleTruncated echo-linkColor echo-clickable"></span>' +
								'</div>' +
								'<div class="echo-item-markers echo-secondaryFont echo-secondaryColor"></div>' +
								'<div class="echo-item-tags echo-secondaryFont echo-secondaryColor"></div>' +
							'</div>' +
							'<div class="echo-item-metadata">' +
								'<div class="echo-item-metadata-userID">' +
									'<span class="echo-item-metadata-title echo-item-metadata-icon echo-item-metadata-userID">' +
										'{Label:userID}' +
									'</span>' +
									'<span class="echo-item-metadata-value">{Data:actor.id}</span>' +
								'</div>' +
								'<div class="echo-item-metadata-userIP echo-item-metadataUserIP">' +
									'<span class="echo-item-metadata-title echo-item-metadata-icon">' +
										'{Label:userIP}' +
									'</span>' +
									'<span class="echo-item-metadata-value">{Data:ip}</span>' +
								'</div>' +
							'</div>' +
							'<div class="echo-item-footer echo-secondaryColor echo-secondaryFont">' +
								'<img class="echo-item-sourceIcon echo-clickable">' +
								'<div class="echo-item-date"></div>' +
								'<div class="echo-item-from"></div>' +
								'<div class="echo-item-via"></div>' +
								'<div class="echo-item-controls"></div>' +
								'<div class="echo-clear"></div>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="echo-clear"></div>' +
				'</div>' +
			'</div>' +
			'<div class="echo-clear"></div>' +
			'<div class="echo-item-childrenMarker"></div>' +
			'</div>' +
		childrenTemplateChunk + 
	'</div>';
};

Echo.Item.prototype.renderers = {};

Echo.Item.prototype.renderers.authorName = function(element) {
	return this.data.actor.title || this.label("guest");
};

Echo.Item.prototype.renderers.markers = function(element, dom) {
	this.render("extraField", element, dom, {"type": "markers"});
};

Echo.Item.prototype.renderers.tags = function(element, dom) {
	this.render("extraField", element, dom, {"type": "tags"});
};

Echo.Item.prototype.renderers.extraField = function(element, dom, extra) {
	var self = this;
	var type = (extra || {}).type;
	if (!this.data.object[type] || !this.user.isAdmin()) {
		dom.remove(element);
		return;
	}
	var limit = this.config.get("limits." + type);
	var items = $.foldl([], this.data.object[type], function(item, acc){
		var template = (item.length > limit)
			? '<span title="{Data:item}">{Data:truncatedItem}</span>'
			: '<span>{Data:item}</span>';
		var truncatedItem = $.htmlTextTruncate(item, limit, "...");
		acc.push(self.substitute(template, {"item": item, "truncatedItem": truncatedItem}));
	});
	element.prepend(items.sort().join(", "));
};

Echo.Item.prototype.renderers.container = function(element, dom) {
	var self = this;
	element.removeClass($.map(["child", "root", "child-thread", "root-thread"],
		function(suffix) { return "echo-item-container-" + suffix; }).join(" "));
	var threadSuffix = this.threading ? '-thread' : '';
	if (this.depth) {
		element.addClass('echo-item-container-child' + threadSuffix);
		element.addClass('echo-trinaryBackgroundColor');
	} else {
		element.addClass('echo-item-container-root' + threadSuffix);
	}
	element.addClass('echo-item-depth-' + this.depth);
	var switchClasses = function(action) {
		$.map(self.controlsOrder, function(name) {
			if (!self.controls[name].element || !self.controls[name].clickableElements) return;
			self.controls[name].clickableElements[action + "Class"]("echo-linkColor");
		});
	};
	if (!$.isMobileDevice()) {
		element.unbind(["mouseleave", "mouseenter"]).hover(function() {
			if (self.user.isAdmin()) dom.get("modeSwitch").show();
			switchClasses("add");
		}, function() {
			if (self.user.isAdmin()) dom.get("modeSwitch").hide();
			switchClasses("remove");
		});
	}
};

Echo.Item.prototype.renderers.metadataUserIP = function(element) {
	if (!this.data.ip) element.hide();
}

Echo.Item.prototype.renderers.modeSwitch = function(element) {
	var self = this;
	element.hide();
	if (!this.user.isAdmin()) return;
	var mode = "default";
	var setTitle = function(el) {
		el.attr("title", self.label(mode + "ModeSwitchTitle"));
	};
	setTitle(element);
	element.click(function() {
		mode = (mode == "default" ? "metadata" : "default");
		setTitle(element);
		self.dom.get("data").toggle();
		self.dom.get("metadata").toggle();
	});
	if ($.isMobileDevice()) element.show();
};

Echo.Item.prototype.renderers.wrapper = function(element) {
	element.addClass('echo-item-wrapper' + (this.depth ? '-child' : '-root'));
};

Echo.Item.prototype.renderers.avatar = function() {
	var self = this;
	var size = (!this.depth ? 48 : 24);
	var url = this.data.actor.avatar || this.user.get("defaultAvatar");
	var img = $("<img>", { "src": url }).css({ "width": size, "height": size });
	if (url != this.user.get("defaultAvatar")) {
		img.one({
			"error" : function() {
				$(this).attr("src", self.user.get("defaultAvatar"));
			}
		});
	}
	return img;
};

Echo.Item.prototype.renderers.childrenContainer = function(element, dom, config) {
	var self = this;
	// we cannot use element.empty() because it will remove children's event handlers
	$.each(element.children(), function(i, child) {
		$(child).detach();
	});
	$.map(this.children, function(child) {
		if (config && config.filter && !config.filter(child)) return;
		var initialRendering = !child.dom;
		element.append(initialRendering ? child.render() : child.dom.content);
		if (child.deleted) {
			self.publish("internal.Item.onDelete", {"item": child, "config": config});
		} else if (child.added) {
			self.publish("internal.Item.onAdd", {"item": child});
		// don't publish events while rerendering or for Whirlpools
		} else if (initialRendering && child instanceof Echo.Item) {
			self.publish("internal.Item.onRender", {"item": child});
		}
	});
};

Echo.Item.prototype.renderers.children = function(element, dom, config) {
	this.render("childrenContainer", element, dom, {
		"filter": function(item) { return !item.byCurrentUser; },
		"keepChildren": config && config.keepChildren
	});
};

Echo.Item.prototype.renderers.childrenByCurrentActorLive = function(element, dom, config) {
	this.render("childrenContainer", element, dom, {
		"filter": function(item) { return item.byCurrentUser; },
		"keepChildren": config && config.keepChildren
	});
};

Echo.Item.prototype.renderers.control = function(element, dom, extra) {
	if (!extra || !extra.name) return;
	var template = extra.template ||
		'<a class="echo-item-control echo-item-control-{Data:name}">{Data:label}</a>';
	var data = {
		"label": extra.label || "",
		"name": extra.name
	};
	var control = $(this.substitute(template, data));
	if (!extra.clickable) return control;

	var clickables = $('.echo-clickable', control);
	if (!clickables.length) {
		clickables = control;
		control.addClass('echo-clickable');
	}
	clickables[extra.onetime ? "one" : "bind"]({
		"click": function(event) {
			event.stopPropagation();
			if (extra.callback) extra.callback();
		}
	});
	if ($.isMobileDevice()) clickables.addClass("echo-linkColor");
	return control;
};

Echo.Item.prototype.renderers.controlsDelimiter = function() {
	return $('<span class="echo-item-control-delim"> \u00b7 </span>');
};

Echo.Item.prototype.renderers.controls = function(element) {
	var self = this;
	this.assembleControls();
	this.sortControls();
	var container = element.empty();
	var delimiter = this.render("controlsDelimiter");
	$.map(this.controlsOrder, function(name) {
		var data = self.controls[name];
		if (!data || !data.visible()) return;
		var control = data.dom || self.render("control", undefined, undefined, data);
		if (control) {
			self.controls[name].element = control;
			if (data.clickable) {
				self.controls[name].clickableElements = $('.echo-clickable', control);
				if (!self.controls[name].clickableElements.length) {
					self.controls[name].clickableElements = control;
				}
			}
			container.append(delimiter.clone(true)).append(control);
		}
	});
};

Echo.Item.prototype.renderers.re = function() {
	if (!this.config.get("reTag")) return;
	var self = this;
	var context = this.data.object.context;
	var re = "";
	//XXX use normalized permalink and location instead
	var permalink = this.data.object.permalink;
	var limits = this.config.get("limits");
	var openLinksInNewWindow = this.config.get("openLinksInNewWindow");

	var getDomain = function(url) {
		var parts = $.parseUrl(url);
		return (parts && parts.domain) ? parts.domain : url;
	};

	var reOfContext = function(c) {
		var maxLength = limits.reTitle;
		if (!c.title) {
			maxLength = limits.reLink;
			c.title = c.uri.replace(/^https?:\/\/(.*)/ig, '$1');
		}
		if (c.title.length > maxLength) {
			c.title = c.title.substring(0, maxLength) + "...";
		}
		return "<div>" + self.hyperlink({
			"class": "echo-primaryColor",
			"href": c.uri,
			"caption": "Re: " + $.stripTags(c.title)
		}, {
			"openInNewWindow": openLinksInNewWindow
		}) + "</div>";
	};

	var pageHref = document.location.href;
	var pageDomain = getDomain(pageHref);

	if (permalink == pageHref || this.depth || !context || !context.length) {
		return;
	}
	var mustSkipContext = false;
	$.each(context, function(i, c) {
		//XXX use normalized uri
		if (c.uri == pageHref) {
			mustSkipContext = true;
			return false; //break
		}
	});

	if (mustSkipContext) return;

	if (this.config.get("optimizedContext")) {
		var primaryContext = context[0];
		$.each(context, function(i, c) {
			if (getDomain(c.uri) == pageDomain) {
				primaryContext = c;
				return false; //break
			}
		});
		if (primaryContext) re = reOfContext(primaryContext);
	} else {
		$.each(context, function(i, c) {
			re += reOfContext(c);
		});
	}

	return $(re);
};

Echo.Item.prototype.renderers.sourceIcon = function(element, dom) {
	if (!this.config.get("viaLabel.icon") ||
		this.data.source.name == "jskit" ||
		this.data.source.name == "echo") {
			dom.remove(element);
	}
	element.hide().attr("src", $.htmlize(
		this.data.source.icon ||
		this.config.get("providerIcon")
	))
	.show()
	.one("error", function() {
		dom.remove(element);
	})
	.wrap(this.hyperlink({
		"href": this.data.source.uri || this.data.object.permalink
	}, {
		"openInNewWindow": this.config.get("openLinksInNewWindow")
	}));
};

Echo.Item.prototype.renderers.via = function(element, dom) {
	var self = this;
	var get = function(field) {
		return (self.data[field].name || "").toLowerCase();
	};
	if (get("source") == get("provider")) return;
	this.render("viaText", element, dom, {
		"label": "via",
		"field": "provider"
	});
};

Echo.Item.prototype.renderers.from = function(element, dom) {
	this.render("viaText", element, dom, {
		"label": "from",
		"field": "source"
	});
};

Echo.Item.prototype.renderers.viaText = function(element, dom, extra) {
	extra = extra || {};
	var data = this.data[extra.field];
	if (!this.config.get("viaLabel.text") || !data.name || data.name == "jskit"  || data.name == "echo") return;
	var a = this.hyperlink({
		"class": "echo-secondaryColor",
		"href": data.uri || this.data.object.permalink,
		"caption": data.name
	}, {
		"openInNewWindow": this.config.get("openLinksInNewWindow")
	});
	element.html('&nbsp;' + this.label(extra.label + 'Label') + '&nbsp;').append(a);
};

Echo.Item.prototype.renderers.textToggleTruncated = function(element) {
	var self = this;
	element.unbind("click").click(function() {
		self.textExpanded = !self.textExpanded;
		self.rerender(["body", "textToggleTruncated"]);
	});
	return this.label("textToggleTruncated" + (this.textExpanded ? "Less" : "More"));
};

Echo.Item.prototype.renderers.body = function(element, dom) {
	var self = this;
	var output = function(text, truncated) {
		dom.get("text").empty().append(text);
		dom.get("textEllipses")[!truncated || self.textExpanded ? "hide" : "show"]();
		dom.get("textToggleTruncated")[truncated || self.textExpanded ? "show" : "hide"]();
	};
	// temporary fix because Firefox hides CDATA content
	var text = this.data.object.content.replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1');
	var source = this.data.source.name;
	var openLinksInNewWindow = this.config.get("openLinksInNewWindow");
	var contentTransformations = this.config.get("contentTransformations." +
							this.data.object.content_type, {});
	if (source && source == "Twitter" && this.config.get("aggressiveSanitization")) {
		output(this.label("sharedThisOn", {"service": source}));
		return;
	}

	var limits = this.config.get("limits");
	var wrap = function(tag) {
		var template = 
			(tag.length > limits.tags)
			? '<span class="echo-item-tag" title="{Data:tag}">{Data:truncatedTag}</span>'
			: '<span class="echo-item-tag">{Data:tag}</span>';
		var truncatedTag = tag.substring(0, limits.tags) + "...";
		return (self.substitute(template, {"tag": tag, "truncatedTag": truncatedTag}));	
	};

	if (contentTransformations.hashtags) {
		text = text.replace(/(#|\uff03)(<a[^>]*>[^<]*<\/a>)/ig, function($0, $1, $2){
			return wrap($2);
		});
	}

	var insertHashTags = function(t) {
		if (!contentTransformations.hashtags) return t;
		return t.replace(/(^|[^\w&\/])(?:#|\uff03)([^\s\.,;:'"#@\$%<>!\?\(\)\[\]]+)/ig, function($0, $1, $2) {
			return $1 + wrap($2);
		});
	};
	var tags2meta = function(text) {
		var tags = [];
		text = text.replace(/((<a\s+[^>]*>)(.*?)(<\/a>))|<.*?>/ig, function($0, $1, $2, $3, $4) {
			//we are cutting and pushing <a> tags to acc to avoid potential html issues after autolinking
			if ($1) {
				var content = tags2meta($3);
				content.text = insertHashTags(content.text);
				$0 = $2 + meta2tags(content) + $4;
			}
			tags.push($0);
			return ' %%HTML_TAG%% ';
		});
		return {"text" : text, "tags": tags};
	};
	var meta2tags = function(content) {
		$.each(content.tags, function(i, v) {
			content.text = content.text.replace(' %%HTML_TAG%% ', v);
		});
		return content.text;
	};
	var urlMatcher = "((?:http|ftp|https):\\/\\/(?:[a-z0-9#:\\/\\;\\?\\-\\.\\+,@&=%!\\*\\'(){}\\[\\]$_|^~`](?!gt;|lt;))+)";
	var normalizeLinks = function(content) {
		return content.replace(/(<a\s+[^>]*>)(.*?)(<\/a>)/ig, function($0, $1, $2, $3) {
			if (new RegExp("^" + urlMatcher + "$", "i").test($2)) {
				$2 = $2.length > limits.bodyLink ? $2.substring(0, limits.bodyLink) + "..." : $2;
			}
			if (openLinksInNewWindow && !/\s+target=("[^<>"]*"|'[^<>']*'|\w+)/.test($1)) {
				$1 = $1.replace(/(^<a\s+[^>]*)(>$)/, '$1 target="_blank"$2');
			}
			return $1 + $2 + $3;
		});
	};
	var content = tags2meta(text);
	if (source && source != 'jskit' && source != 'echo') {
		var url = this.depth
			? this.data.target.id
			: this.config.get("reTag")
				? this.data.object.permalink || this.data.target.id
				: undefined;
		if (url) {
			content.text = content.text.replace(new RegExp(url + "(\\s|$)", "g"), "$1");
			if (!/\S/.test(content.text)) {
				output(this.label("sharedThisOn", {"service": source}));
				return;
			}
		}
	}
	var textBeforeAutoLinking = content.text = insertHashTags(content.text);
	if (contentTransformations.urls) {
		content.text = content.text.replace(new RegExp(urlMatcher, 'ig'), function($0, $1) {
			return self.hyperlink({
				'href': $1,
				'caption': $1
			}, {
				'skipEscaping': true,
				'openInNewWindow': openLinksInNewWindow
			});
		})
	}
	if (contentTransformations.smileys) {
		if (content.text != textBeforeAutoLinking) {
			content = tags2meta(meta2tags(content));
		}
		var smileys = this.initSmileysConfig();
		if (content.text.match(smileys.regexps.test)) {
			$.each(smileys.codes, function(i, code) {
				content.text = content.text.replace(smileys.regexps[code], smileys.tag(smileys.hash[code]));
			});
		}
	}

	if (contentTransformations.newlines) {
		content.text = content.text.replace(/\n\n+/g, '\n\n');
		content.text = content.text.replace(/\n/g, '&nbsp;<br>');
	}
	var result = normalizeLinks(meta2tags(content));
	var truncated = false;
	if ((limits.body || limits.lines) && !self.textExpanded) {
		if (limits.lines) {
			var splitter = contentTransformations.newlines ? "<br>" : "\n";
			var chunks = result.split(splitter);
			if (chunks.length > limits.lines) {
				result = chunks.splice(0, limits.lines).join(splitter);
				truncated = true;
			}
		}
		var limit = limits.body && result.length > limits.body
			? limits.body
			: truncated
				? result.length
				: undefined;
		// we should call $.htmlTextTruncate to close
		// all tags which might remain unclosed after lines truncation
		var truncatedText = $.htmlTextTruncate(result, limit, "", true);
		if (truncatedText.length != result.length) {
			truncated = true;
		}
		result = truncatedText;
	}
	output(result, truncated);
};

Echo.Item.prototype.renderers.date = function(element) {
	var container = element || this.dom && this.dom.get("date");
	this.calcAge();
	if (container) {
		container.html(this.age);
	}
};

Echo.Item.prototype.renderers.expandChildrenLabel = function(element, dom, extra) {
	if (!this.children.length || !this.hasMoreChildren()) return;
	extra = extra || {};
	extra.state = extra.state || "regular";
	var states = {
		"loading": {
			"css": "echo-item-message-loading",
			"label": "loading"
		},
		"regular": {
			"css": "echo-linkColor echo-message-icon",
			"label": "childrenMoreItems"
		}
	};
	element
		.removeClass(states[extra.state == "loading" ? "regular" : "loading"].css)
		.addClass(states[extra.state].css)
		.html(this.label(states[extra.state].label));
};

Echo.Item.prototype.renderers.expandChildren = function(element, dom, extra) {
	if (!this.children.length) return;
	if (!this.hasMoreChildren()) {
		// IE in Quirks mode can't operate with elements with "height: 0px" correctly, 
		// element with "height: 0px" is renderered as though it doesn't have height property at all.
		// Thus we set "height: 1px" as the final value for animate function and simply hide element
		// after the animation is done.
		if ($.browser.msie && document.compatMode != "CSS1Compat") {
			element.animate(
				{
					"height": "1px",
					"marginTop": "hide",
					"marginBottom": "hide",
					"paddingTop": "hide",
					"paddingBottom": "hide"
				},
				{
					"duration": this.config.get("children.moreButtonSlideTimeout"),
					"complete": function() {
						element.hide();
					}
				}
			);
		} else {
			element.slideUp(this.config.get("children.moreButtonSlideTimeout"));
		}
		return;
	}
	var self = this;
	// extra.element is sibling element for more children button
	extra = extra || {};
	// the "show()" jQuery method doesn't work for some reason in Chrome (A:5755)
	element.css("display", "block");
	element.addClass("echo-item-depth-" + (this.depth + 1));
	element.unbind("click").one("click", function() {
		self.render("expandChildrenLabel", dom.get("expandChildrenLabel"), dom, {"state": "loading"});
		self.publish("internal.Item.onChildrenExpand", {"data": self.data});
	});
};

Echo.Item.prototype.isChildrenPaginationEnabled = function() {
	return !!this.config.get("children.itemsPerPage");
};

Echo.Item.prototype.hasMoreChildren = function() {
	return this.data.hasMoreChildren == "true";
};

Echo.Item.prototype.getNextPageAfter = function() {
	var children = $.grep(this.children, function(child) {
		return !child.live;
	});
	var index = this.config.get("children.sortOrder") == "chronological"
		? children.length - 1
		: 0;
	return children.length
		? children[index].data.pageAfter
		: undefined;
};

Echo.Item.prototype.initSmileysConfig = function() {
	if (Echo.Vars.smileys) return Echo.Vars.smileys;
	var esc = function(v) { return v.replace(/([\W])/g, "\\$1"); };
	var smileys = Echo.Vars.smileys = {"codes": [], "regexps": []};
	smileys.hash = {
		':)':		{file: 'smile.png', title: 'Smile'},
		':-)':		{file: 'smile.png', title: 'Smile'},
		';)':		{file: 'wink.png', title: 'Wink'},
		';-)':		{file: 'wink.png', title: 'Wink'},
		':(':		{file: 'unhappy.png', title: 'Frown'},
		':-(':		{file: 'unhappy.png', title: 'Frown'},
		'=-O':		{file: 'surprised.png', title: 'Surprised'},
		':-D':		{file: 'grin.png', title: 'Laughing'},
		':-P':		{file: 'tongue.png', title: 'Tongue out'},
		'=)':		{file: 'happy.png', title: 'Happy'},
		'B-)':		{file: 'evilgrin.png', title: 'Evil grin'}
	};
	var escapedCodes = [];
	$.each(smileys.hash, function(code) {
		var escaped = esc(code);
		escapedCodes.push(escaped);
		smileys.codes.push(code);
		smileys.regexps[code] = new RegExp(escaped, "g");
	});
	smileys.regexps.test = new RegExp(escapedCodes.join("|"));
	smileys.tag = function(smiley) {
		return '<img class="echo-item-smiley-icon" src="//cdn.echoenabled.com/images/smileys/emoticon_' + smiley.file + '" title="' + smiley.title + '" alt="' + smiley.title + '" />';
	};
	return smileys;
};

Echo.Item.prototype.assembleControls = function() {
	var self = this;
	var controlsOrder = [];
	$.each(this.config.get("itemControls", {}), function(plugin, controls) {
		$.map(controls, function(control) {
			var data = $.isFunction(control)
				? control.call(self)
				: $.extend({}, control);
			if (!data.name) return;
			var callback = data.callback || function() {};
			data.callback = function() {
				callback.call(self);
				self.publish("internal.Item.onControlClick", {
					"name": data.name,
					"plugin": plugin,
					"item": {
						"data": self.data,
						"target": self.dom.content
					}
				});
			};
			data.label = data.label || data.name;
			data.plugin = plugin;
			if (typeof data.clickable == "undefined") {
				data.clickable = true;
			}
			if (typeof data.visible == "undefined") {
				data.visible = true;
			}
			var visible = data.visible;
			data.visible = function() {
				return visible && self.config.get("plugins." + plugin + ".enabled");
			}
			var name = plugin + '.' + data.name;
			self.controls[name] = data;
			if ($.inArray(name, self.controlsOrder) < 0) {
				controlsOrder.push(name);
			}
		});
	});
	// keep correct order of plugins and controls
	self.controlsOrder = controlsOrder.concat(self.controlsOrder);
};

Echo.Item.prototype.sortControls = function() {
	var self = this;
	var defaultOrder = this.controlsOrder;
	var requiredOrder = this.config.get("itemControlsOrder");
	// if controls order is not specified in application config, use default order
	if (!requiredOrder) {
		this.config.set("itemControlsOrder", defaultOrder);
	} else if (requiredOrder != defaultOrder) {
		var push = function(name, acc, pos) {
			if (!self.controls[name]) return;
			acc.push(name);
			pos = pos || $.inArray(name, defaultOrder);
			if (pos >= 0) {
				delete defaultOrder[pos];
			}
		};
		var order = $.foldl([], requiredOrder, function(name, acc) {
			if (/^(.*)\./.test(name)) {
				push(name, acc);
			} else {
				var re = new RegExp("^" + name + "\.");
				$.map(defaultOrder, function(n, i) {
					if (n && n.match(re)) {
						push(n, acc, i);
					}
				});
			}
		});
		this.controlsOrder = order;
		this.config.set("itemControlsOrder", order);
	// if application config tells not to use controls
	} else if (!requiredOrder.length) {
		this.controlsOrder = [];
	}
};

Echo.Item.prototype.traverse = function(tree, callback, acc) {
	var self = this;
	$.each(tree || [], function(i, item) {
		acc = self.traverse(item.children, callback, callback(item, acc));
	});
	return acc;
};

Echo.Item.prototype.refreshDate = function() {
	this.rerender("date");
	$.map(this.children || [], function(child) {
		child.refreshDate();
	});
};

Echo.Item.prototype.calcAge = function() {
	if (!this.timestamp) return;
	var self = this;
	var d = new Date(this.timestamp * 1000);
	var now = (new Date()).getTime();
	var when;
	var diff = Math.floor((now - d.getTime()) / 1000);
	var dayDiff = Math.floor(diff / 86400);
	var getAgo = function(ago, period) {
		return ago + " " + self.label(period + (ago == 1 ? "" : "s") + "Ago");
	};

	if (isNaN(dayDiff) || dayDiff < 0 || dayDiff >= 365) {
		when = d.toLocaleDateString() + ', ' + d.toLocaleTimeString();
	} else if (diff < 60) {
		when = getAgo(diff, 'second');
	} else if (diff < 60 * 60) {
		diff = Math.floor(diff / 60);
		when = getAgo(diff, 'minute');
	} else if (diff < 60 * 60 * 24) {
		diff = Math.floor(diff / (60 * 60));
		when = getAgo(diff, 'hour');
	} else if (diff < 60 * 60 * 48) {
		when = this.label("yesterday");
	} else if (dayDiff < 7) {
		when = getAgo(dayDiff, 'day');
	} else if (dayDiff < 14) {
		when = this.label("lastWeek");
	} else if (dayDiff < 30) {
		diff =  Math.floor(dayDiff / 7);
		when = getAgo(diff, 'week');
	} else if (dayDiff < 60) {
		when = this.label("lastMonth");
	} else if (dayDiff < 365) {
		diff =  Math.floor(dayDiff / 31);
		when = getAgo(diff, 'month');
	}
	if (this.age != when) {
		this.age = when;
	}
};

Echo.Item.prototype.block = function(label) {
	if (this.blocked) return;
	this.blocked = true;
	var content = this.dom.get("container");
	var width = content.width();
	//We should take into account that container has a 10px 0px padding value
	var height = content.outerHeight();
	this.blockers = {
		"backdrop": $('<div class="echo-item-blocker-backdrop"></div>').css({
			"width": width, "height": height
		}),
		"message": $(this.substitute('<div class="echo-item-blocker-message">{Data:label}</div>', {"label": label})).css({
			"left": ((parseInt(width) - 200)/2) + 'px',
			"top": ((parseInt(height) - 20)/2) + 'px'
		})
	};
	content.addClass("echo-relative")
		.prepend(this.blockers.backdrop)
		.prepend(this.blockers.message);
};

Echo.Item.prototype.unblock = function() {
	if (!this.blocked) return;
	this.blocked = false;
	this.blockers.backdrop.remove();
	this.blockers.message.remove();
	this.dom.get("container").removeClass("echo-relative");
};

Echo.Item.prototype.getAccumulator = function(type) {
	return this.data.object.accumulators[type];
}; 

Echo.Localization.extend({
	"guest": "Guest",
	"live": "Live",
	"paused": "Paused",
	"more": "More",
	"emptyStream": "No items at this time...",
	"new": "new"
}, "Stream");

Echo.Stream = function(config) {
	if (!config || !config.target) return;
	var self = this;
	this.vars = {"cache": {}};
	this.initConfig(config, {
		"aggressiveSanitization": false,
		"contentTransformations": {
			"text": ["smileys", "hashtags", "urls", "newlines"],
			"html": ["smileys", "hashtags", "urls", "newlines"],
			"xhtml": ["smileys", "hashtags", "urls"]
		},
		"children": {
			"additionalItemsPerPage": 5,
			"displaySortOrder": "chronological",
			"sortOrder": "reverseChronological",
			"moreButtonSlideTimeout": 600,
			"itemsSlideTimeout": 600,
			"maxDepth": 1
		},
		"fadeTimeout": 2800,
		"flashColor": "#ffff99",
		"itemControlsOrder": undefined,
		"itemsPerPage": 15,
		"maxBodyLinkLength": 50,
		"maxBodyCharacters": undefined,
		"maxBodyLines": undefined,
		"maxReLinkLength": 30,
		"maxReTitleLength": 143,
		"maxTagLength": 16,
		"maxMarkerLength": 16,
		"openLinksInNewWindow": false,
		"optimizedContext": true,
		"providerIcon": "//cdn.echoenabled.com/images/favicons/comments.png",
		"reTag": true,
		"slideTimeout": 700,
		"sortOrder": "reverseChronological",
		"streamStateLabel": {
			"icon": true,
			"text": true
		},
		"submissionProxyURL": window.location.protocol + "//apps.echoenabled.com/v2/esp/activity",
		"streamStateToggleBy": "mouseover", // mouseover | button | none
		"viaLabel": {
			"icon": false,
			"text": false
		}
	}, this.assembleConfigNormalizer());
	this.initVars();
	this.initApplication(function() {
		self.addCss();
		self.config.get("target").empty().append(self.render());
		self.recalcEffectsTimeouts();
		self.initLiveUpdates(function() {
			return {
				"endpoint": "search",
				"query": {
					"q": self.constructSearchQuery(),
					"since": self.nextSince || 0
				}
			};
		}, function(data) { self.handleLiveUpdatesResponse(data); });
		if (self.config.get("data")) {
			self.handleInitialResponse(self.config.get("data"), function(data) {
				self.lastRequest = {
					"initial": true,
					"data": data
				};
				self.render("body");
			});
		} else {
			self.initialItemsRequest();
		}
		self.listenEvents();
		self.publish("Stream.onRender", self.prepareBroadcastParams());
	});
};

Echo.Stream.prototype = new Echo.Application();

Echo.Stream.prototype.namespace = "Stream";

Echo.Stream.prototype.cssPrefix = "echo-stream-";

Echo.Stream.prototype.template = 
	'<div class="echo-stream-container echo-primaryFont echo-primaryBackgroundColor">' +
		'<div class="echo-stream-header">'+
			'<div class="echo-stream-state echo-secondaryColor"></div>' +
			'<div class="echo-clear"></div>' +
		'</div>' +
		'<div class="echo-stream-body"></div>' +
		'<div class="echo-stream-more"></div>' +
		'<div class="echo-stream-brand">'+
			'<a class="echo-stream-brand-link" href="http://aboutecho.com" target="_blank">' +
				'<div class="echo-stream-brand-message">social networking by</div>' +
			'</a>' +
		'</div>' +
	'</div>';

Echo.Stream.prototype.renderers = {};

Echo.Stream.prototype.renderers.body = function(element) {
	var self = this;
	element = element || this.dom.get("body");
	if (!this.lastRequest) {
		this.showMessage({
			"type": "loading",
			"message": this.label(
				this.isErrorWithTimer(this.error)
					? "retrying"
					: this.isWaitingForData(this.error)
						? "error_" + this.error.errorCode
						: "loading"
			)
		}, element);
		return;
	}

	if (this.lastRequest.data.length) {
		if (this.lastRequest.initial) element.empty();
		this.appendRootItems(this.lastRequest.data, element);
	} else {
		this.showMessage({
			"type": "empty",
			"message": this.label("emptyStream")
		}, element);
	}
	if (this.lastRequest.initial && this.config.get("streamStateToggleBy") == "mouseover" && this.config.get("liveUpdates")) {
		element.bind({
			"mouseleave": function() {
				self.setStreamState("live");
			},
			"mouseenter": function() {
				self.setStreamState("paused");
			}
		});
	}
	this.publish("Stream.onReady", this.prepareBroadcastParams({"initial": this.lastRequest.initial}));
};

Echo.Stream.prototype.renderers.state = function(element) {
	var self = this;
	var label = this.config.get("streamStateLabel");
	if ((!label.icon && !label.text) || !this.config.get("liveUpdates")) return;

	var activitiesCount = 0;
	if (this.activities.state == "paused") {
		activitiesCount = $.foldl(0, self.activities.queue, function(entry, acc) {
			if (entry.affectCounter) {
				return ++acc;
			}
		});
	}
	var currentState = this.activities.state + activitiesCount;
	if (currentState == this.activities.lastState) return;

	element = (element || this.dom.get("state")).empty();
	if (!this.activities.lastState && this.config.get("streamStateToggleBy") == "button") {
		element.addClass("echo-linkColor echo-clickable").click(function(e) {
			self.setStreamState(self.activities.state == "paused" ? "live" : "paused");
		});
	}
	var templates = {
		"picture" : '<span class="echo-stream-state-picture echo-stream-state-picture-' + this.activities.state +'"></span>',
		"message" : this.config.get("streamStateToggleBy") == "button"
			? '<a href="javascript:void(0)" class="echo-stream-state-message">{Label:' + this.activities.state + '}</a>'
			: '<span class="echo-stream-state-message">{Label:' + this.activities.state + '}</span>',
		"count" : ' <span class="echo-stream-state-count">({Data:count} {Label:new})</span>'
	};
	if (label.icon) {
		element.append(templates.picture);
	}
	if (label.text) {
		element.append(this.substitute(templates.message));
		if (activitiesCount && this.activities.state == "paused") {
			element.append(this.substitute(
				templates.count,
				{"count": activitiesCount}
			));
		}
	}
	this.activities.lastState = currentState;
};

Echo.Stream.prototype.renderers.more = function(element, dom) {
	var self = this;
	if (this.isViewComplete || !this.threads.length) {
		element.empty().hide();
		return;
	}
	element.empty()
		.append(this.label("more"))
		.bind({
			'mouseenter': function() {
				element.addClass("echo-stream-more-hover");
			},
			'mouseleave': function() {
				element.removeClass("echo-stream-more-hover");
			}
		})
		.show()
		.unbind('click')
		.one('click', function() {
			self.publish("Stream.onMoreButtonPress", self.prepareBroadcastParams());
			element.html(self.label("loading"));
			self.moreRequestItems(element);
		});
};

Echo.Stream.prototype.initVars = function() {
	this.activities = {
		"queue": [],
		"state": this.config.get("liveUpdates") ? "live" : "paused", // live | paused
		"lastState": "", // live0 | pausedN
		"animations": 0
	};
	this.hasInitialData = false;
	this.items = {};   // items by unique key hash
	this.threads = []; // items tree
	this.cleanupErrorHandlers();
};

Echo.Stream.prototype.actualizeChildrenList = function(parent, entries) {
	var self = this;
	return $.map(entries, function(entry) {
		// we should change entry conversationID in accordance with
		// conversationID of the root item
		entry.targets = $.map(entry.targets, function(target) {
			target.conversationID = parent.conversation;
			return target;
		});
		entry = self.normalizeEntry(entry);
		var item = self.items[entry.unique];
		// drop item from items list if the item already exists
		// in the tree, which means that it was posted by the current user
		// and arrived as a live update
		if (item && item.byCurrentUser) {
			self.applyStructureUpdates("delete", item);
		}
		return entry;
	});
};

Echo.Stream.prototype.createChildrenItemsDomWrapper = function(children, parent) {
	var self = this;
	var wrapper = $("<div class='echo-item-children-wrapper'></div>");
	var getIdx = function(item) { return self.getItemListIndex(item, parent.children); };
	$.each(children, function(i, item) {
		item.render();
		var insertion = i > 0 && getIdx(children[i-1]) < getIdx(item)
			? "append"
			: "prepend";
		wrapper[insertion](item.dom.content);
	});
	return wrapper;
};

Echo.Stream.prototype.listenEvents = function() {
	var self = this;
	this.subscribe("internal.User.onInvalidate", function() {
		self.refresh();
	});
	this.subscribe("internal.Item.onAdd", function(topic, data) {
		data.item.dom.content.hide();
		self.queueActivity({
			"action": "animation",
			"actorID": data.item.data.actor.id,
			"itemUnique": data.item.data.unique,
			"priority": "highest",
			"handler": function() {
				delete data.item.added;
				self.addItemSpotUpdate(data.item);
			}
		});
	});
	this.subscribe("internal.Item.onDelete", function(topic, data) {
		self.queueActivity({
			"action": "animation",
			"itemUnique": data.item.data.unique,
			"actorID": data.item.data.actor.id,
			"priority": "highest",
			"handler": function() {
				delete data.item.deleted;
				self.deleteItemSpotUpdate(data.item, data.config);
			}
		});
	});
	this.subscribe("internal.Item.onRender", function(topic, data) {
		self.publish("Stream.Item.onRender", self.prepareBroadcastParams({
			"item": {
				"data": data.item.data,
				"target": data.item.dom.content
			}
		}));
	});
	this.subscribe("internal.Item.onControlClick", function(topic, data) {
		var topic = self.namespace + ".Item.onControlClick";
		self.publish(topic, self.prepareBroadcastParams(data));
	});
	this.subscribe("internal.Item.onChildrenExpand", function(topic, args) {
		self.childrenRequestItems(args.data.unique);
	});
	$.map(["Submit.onPostComplete", "Submit.onEditComplete"], function(topic) {
		Echo.Broadcast.subscribe(topic, function() {
			self.startLiveUpdates(true);
		});
	});
};

Echo.Stream.prototype.childrenRequestItems = function(unique) {
	var self = this;
	var item = this.items[unique];
	this.sendAPIRequest({
		"endpoint": "search",
		"query": {"q": this.constructChildrenSearchQuery(item)}
	}, function(data) {
		var element = item.dom.get("expandChildren");
		if (data.result == "error") {
			self.handleErrorResponse(data, {
				"messageTarget": element,
				"waitingHandler": function() {
					self.childrenRequestItems(unique);
				}
			});
			if (!self.isWaitingForData(data))  {
				element.removeClass("echo-clickable")
					.delay(3000)
					.slideUp(self.config.get("children.moreButtonSlideTimeout"));
			}
			return;
		}
		if (!data.hasMoreChildren || data.hasMoreChildren == "false") {
			item.data.hasMoreChildren = false;
		}
		item.data.nextPageAfter = data.nextPageAfter;
		data.entries = self.actualizeChildrenList(item, data.entries);
		self.publish("Stream.onDataReceive", self.prepareBroadcastParams({
			"entries": data.entries,
			"initial": false,
			"type": "children"
		}));
		var children = [];
		$.each(data.entries, function(i, entry) {
			var _item = self.initItem(entry);
			self.applyStructureUpdates("add", _item);
			if (entry.parentUnique == item.data.unique) children.push(_item);
		});
		self.placeChildrenItems(item, children, data.entries);
	});	
};

Echo.Stream.prototype.initialItemsRequest = function() {
	var self = this;
	this.requestItems({}, function(data) {
		self.lastRequest = {
			"initial": true,
			"data": data
		};
		self.render("body");
	});
};

Echo.Stream.prototype.moreRequestItems = function(element) {
	var self = this;
	element = element || this.dom.get("more");
	this.lastRequest = {
		"initial": false
	};
	this.requestItems({
		"pageAfter": '"' + (self.nextPageAfter || "0") + '"'
	}, function(items) {
		if (items.length) {
			self.lastRequest.data = items;
			self.render("body");
		} else {
			element.html(self.label("emptyStream")).delay(1000).fadeOut(1000);
		}
	});
};

Echo.Stream.prototype.setStreamState = function(state) {
	this.activities.state = state;
	if (state == "live") this.executeNextActivity();
	this.rerender("state");
};

Echo.Stream.prototype.refresh = function() {
	this.stopLiveUpdates();
	this.initVars();
	delete this.lastRequest;
	this.clearCache();
	this.rerender();
	this.initialItemsRequest();
	this.publish("Stream.onRerender", this.prepareBroadcastParams());
};

Echo.Stream.prototype.extractPresentationConfig = function(data) {
	return $.foldl({}, ["sortOrder", "itemsPerPage", "safeHTML", "showFlags"], function(key, acc) {
		if (typeof data[key] != "undefined") {
			acc[key] = data[key];
		}
	});
};

Echo.Stream.prototype.extractTimeframeConfig = function(data) {
	var getComparator = function(value) {
		var m = value.match(/^(<|>)(.*)$/);
		var op = m[1];
		var v = m[2].match(/^'([0-9]+) seconds ago'$/);
		var getTS = v
			? function() { return Math.floor((new Date()).getTime() / 1000) - v[1]; }
			: function() { return m[2]; };
		var f;
		if (op == '<') {
			f = function(ts) {
				return ts < getTS()
			}
		} else if (op == '>') {
			f = function(ts) {
				return ts > getTS()
			}
		}
		return f;
	};
	var timeframe = $.foldl([], ["before", "after"], function(key, acc) {
		if (!data[key]) return;
		var cmp = getComparator(data[key]);
		if (cmp) acc.push(cmp);
	});
	return {"timeframe": timeframe};
};

Echo.Stream.prototype.assembleConfigNormalizer = function() {
	var self = this;
	var ensurePositiveValue = function(v) { return v < 0 ? 0 : v; };
	var normalizer = {
		"contentTransformations": function(object) {
			$.each(object, function(contentType, options) {
				object[contentType] = $.foldl({}, options || [],
					function(option, acc) {
						acc[option] = true;
					});
			});
			return object;
		},
		"safeHTML": function(value) {
			return "off" != value;
		},
		"showFlags": function(value) {
			return "off" != value;
		},
		"streamStateToggleBy": function(value) {
			if (value == "mouseover" && $.isMobileDevice()) {
				return "button";
			}
			return value;
		},
		"fadeTimeout": ensurePositiveValue,
		"slideTimeout": ensurePositiveValue
	};
	var limits = {
		"body": "maxBodyCharacters",
		"lines": "maxBodyLines",
		"reLink": "maxReLinkLength",
		"reTitle": "maxReTitleLength",
		"bodyLink": "maxBodyLinkLength",
		"tags": "maxTagLength",
		"markers": "maxMarkerLength"
	};
	$.each(limits, function(configKey, streamKey) {
		normalizer[streamKey] = function(value) {
			this.set("limits." + configKey, value);
			return value;
		};
	});
	return normalizer;
};

Echo.Stream.prototype.getRespectiveAccumulator = function(item, sort) {
	var accBySort = {
		"likesDescending": "likesCount",
		"flagsDescending": "flagsCount",
		"repliesDescending": "repliesCount"
	};
	return item.getAccumulator(accBySort[sort]);
};

Echo.Stream.prototype.appendRootItems = function(items, container) {
	var self = this;
	var fragment = document.createDocumentFragment();
	$.each(items || [], function(i, item) {
		fragment.appendChild(item.render().get(0));
		self.publish("Stream.Item.onRender", self.prepareBroadcastParams({
			"item": {
				"data": item.data,
				"target": item.dom.content
			}
		}));
	});
	container.append(fragment);
	this.rerender("more");
};

Echo.Stream.prototype.prepareBroadcastParams = function(params) {
	params = params || {};
	params.target = this.config.get("target").get(0);
	params.query = this.config.get("query");
	if (params.item && params.item.target) {
		params.item.target = params.item.target.get(0);
	}
	return params;
};

Echo.Stream.prototype.constructSearchQuery = function(extra) {
	var after = extra && extra["pageAfter"] && "pageAfter:" + extra["pageAfter"] || "";
	return [this.config.get("query", ""), after].join(" ");
};

Echo.Stream.prototype.constructChildrenSearchQuery = function(item) {
	// depth for item children request
	var depth = this.config.get("children.maxDepth") - item.depth - 1;
	var additionalItems = parseInt(this.config.get("children.additionalItemsPerPage"));
	var pageAfter = item.getNextPageAfter();
	var filter = this.config.get("children.filter");
	var filterQuery = !filter || filter == "()" ? "" : filter + " ";
	return filterQuery + $.foldl("", {
		"childrenof": item.data.object.id,
		"children": depth,
		"childrenItemsPerPage": depth ? parseInt(this.config.get("children.itemsPerPage")) : 0,
		"itemsPerPage": additionalItems,
		"sortOrder": this.config.get("children.sortOrder"),
		"childrenSortOrder": this.config.get("children.sortOrder"),
		"pageAfter": pageAfter ? '"' + (pageAfter || 0) + '"' : undefined
	}, function(value, acc, predicate) {
		return acc += (typeof value != "undefined"
			? predicate + ":" + value + " " 
			: ""
		); 
	}) + filterQuery;
};

Echo.Stream.prototype.requestItems = function(extra, visualizer) {
	var self = this;
	this.sendAPIRequest({
		"endpoint": "search",
		"query": {"q": this.constructSearchQuery(extra)}
	}, function(data) {
		self.handleInitialResponse(data, visualizer);
	});
};

Echo.Stream.prototype.handleInitialResponse = function(data, visualizer) {
	var self = this, items = [], roots = [];
	var isMoreRequest = this.lastRequest && !this.lastRequest.initial;
	data = data || {};
	if (data.result == 'error') {
		this.handleErrorResponse(data, {
			"messageTarget": isMoreRequest ? self.dom.get("more") : self.dom.get("body"),
			"waitingHandler": function() {
				if (isMoreRequest) {
					self.moreRequestItems();
				} else {
					self.refresh();
				}
			}
		});
		return;
	}
	this.cleanupErrorHandlers(true);
	this.config.get("target").show();
	this.changeLiveUpdatesTimeout(data);
	this.nextSince = data.nextSince || 0;
	this.nextPageAfter = data.nextPageAfter;
	this.config.extend(this.extractPresentationConfig(data));
	data.children.itemsPerPage = +data.children.itemsPerPage;
	this.config.set(
		"children",
		this.config.combine(
			data.children,
			this.config.get("children")
		)
	);
	this.config.extend(this.extractTimeframeConfig(data));
	var sortOrder = this.config.get("sortOrder");
	data.entries = data.entries || [];
	this.publish("Stream.onDataReceive", self.prepareBroadcastParams({
		"entries": data.entries,
		"initial": !this.hasInitialData,
		"type": this.hasInitialData ? "more" : "initial"
	}));
	$.each(data.entries, function(i, entry) {
		entry = self.normalizeEntry(entry);
		var item = self.initItem(entry);
		// avoiding problem when children can go before parents
		self.applyStructureUpdates("add", item);
		if (self.isRootItem(item)) {
			self.addItemToList(roots, item, sortOrder);
		}
	});

	this.hasInitialData = true;
	this.isViewComplete = "hasMoreChildren" in data
		? data.hasMoreChildren === "false"
		: roots.length != this.config.get("itemsPerPage");
	visualizer(roots);
	this.startLiveUpdates();
};

Echo.Stream.prototype.checkTimeframeSatisfy = function() {
	var self = this;
	var timeframe = this.config.get("timeframe");
	var unsatisfying = $.foldl([], this.threads, function(thread, acc) {
		var satisfy = $.foldl(true, timeframe, function(p, a) {
			return a ? p(thread.timestamp) : false;
		});
		if (!satisfy) acc.push(thread);
	});
	$.map(unsatisfying, function(item) {
		self.applySpotUpdates("delete", item);
	});
};

Echo.Stream.prototype.handleLiveUpdatesResponse = function(data) {
	var self = this;
	data = data || {};
	if (data.result == "error") {
		this.startLiveUpdates();
		return;
	}
	this.nextSince = data.nextSince || 0;
	this.refreshItemsDate();
	this.checkTimeframeSatisfy();
	this.applyLiveUpdates(data.entries);
	this.render("state");
	this.executeNextActivity();
	this.startLiveUpdates();
};

Echo.Stream.prototype.applyLiveUpdates = function(entries) {
	var self = this;
	$.each(entries || [], function(i, entry) {
		entry = self.normalizeEntry(entry);
		var item = self.items[entry.unique];
		var action = self.classifyAction(entry);
		if (!item && action != "post") return;
		switch (action) {
			case "post":
				if (item) {
					self.applySpotUpdates("replace", self.updateItem(entry));
				} else {
					item = self.initItem(entry, true);
					var satisfies = self.isRootItem(item)
						? self.withinVisibleFrame(item)
						: self.withinVisibleChildrenFrame(item);
					// do not filter out items from the current user
					// they should be displayed in a special container
					if (!satisfies && !self.isRootItem(item) &&
						self.user.hasIdentity(item.data.actor.id)) {
							item.byCurrentUser = true;
					};
					if (satisfies || item.byCurrentUser) {
						self.publish("Stream.Item.onReceive",
							self.prepareBroadcastParams({
								"item": {"data": item.data}
							}));
						self.applySpotUpdates("add", item);
					} else {
						delete self.items[entry.unique];
					}
				}
				break;
			case "delete":
				self.applySpotUpdates("delete", item);
				break;
		}
	});
	this.recalcEffectsTimeouts();
};

Echo.Stream.prototype.recalcEffectsTimeouts = function() {
	// recalculating timeouts based on amount of items in activities queue
	var s = this;
	var maxTimeouts = {
		"fade": s.config.get("fadeTimeout"),
		"slide": s.config.get("slideTimeout")
	};
	s.timeouts = s.timeouts || {
		"fade": maxTimeouts.fade,
		"slide": maxTimeouts.slide
	};
	if (maxTimeouts.fade == 0 && maxTimeouts.slide == 0) return;
	s.timeouts.coeff = s.timeouts.coeff || {
		"fade": s.timeouts.fade / (maxTimeouts.fade + maxTimeouts.slide),
		"slide": s.timeouts.slide / (maxTimeouts.fade + maxTimeouts.slide)
	};
	var calc = function(timeout, value) {
		value = Math.round(value * s.timeouts.coeff[timeout]);
		if (value < 100) return 0; // no activities for small timeouts
		if (value > maxTimeouts[timeout]) return maxTimeouts[timeout];
		return value;
	};
	// reserving 80% of time between live updates for activities
	var frame = s.config.get("liveUpdatesTimeout") * 1000 * 0.8;
	var msPerItem = s.activities.queue.length ? frame / s.activities.queue.length : frame;
	s.timeouts.fade = calc("fade", msPerItem);
	s.timeouts.slide = calc("slide", msPerItem);
};

Echo.Stream.prototype.refreshItemsDate = function() {
	$.map(this.threads, function(item) {
		item.refreshDate();
	});
};

Echo.Stream.prototype.executeNextActivity = function() {
	var acts = this.activities;
	if (acts.animations > 0 || !acts.queue.length ||
		this.config.get("liveUpdates") && acts.state == "paused" && acts.queue[0].action != "replace" && !acts.queue[0].byCurrentUser) return;
	acts.queue.shift().handler();
};

Echo.Stream.prototype.applySpotUpdates = function(action, item, options) {
	var self = this;
	options = options || {};
	var handler = function(operation) {
		switch (operation) {
			case "add":
				// if we trying to add already existing item
				// and it was not due to item moving we should replace it
				var _item = self.items[item.data.unique];
				if (_item && _item.dom && options.priority != "high") {
					self.applySpotUpdates("replace", item, {"priority": "highest"});
					return;
				}
				self.applyStructureUpdates(operation, item);
				item.added = true;
				if (self.isRootItem(item)) {
					self.placeRootItem(item);
				} else {
					var parent = self.getParentItem(item);
					if (parent && parent.dom) {
						parent.rerender([
							"container",
							"children",
							"childrenByCurrentActorLive"
						]);
					}
				}
				self.executeNextActivity();
				break;
			case "replace":
				item.unblock();
				if (self.maybeMoveItem(item)) {
					var parent = self.getParentItem(item);
					var sort = self.config.get(parent ? "children.sortOrder" : "sortOrder");
					var items = parent ? parent.children : self.threads;
					var oldIdx = self.getItemListIndex(item, items);
					// We need to calculate the projected index of the item
					// after the "replace" action and compare it with the current one
					// to determine whether the item should be moved to the new place or not:
					//   - create a copy of the items list
					//   - remove the item from the copy
					//   - calculate the new index
					//   - compare the old and new indexes
					var container = $.extend([], items);
					container.splice(oldIdx, 1);
					var newIdx = self.getItemProjectedIndex(item, container, sort);
					if (oldIdx != newIdx) {
						self.applySpotUpdates("delete", item, {
							"keepChildren": true,
							"priority": "high"
						});
						self.applySpotUpdates("add", item, {"priority": "high"});
					}
				}
				if (item && item.dom) {
					item.rerender("container", true);
				}
				self.executeNextActivity();
				break;
			case "delete":
				item.deleted = true;
				// keepChildren flag is required to detect the case when item is being moved
				if (self.isRootItem(item)) {
					self.publish("internal.Item.onDelete", {"item": item, "config": options});
					self.applyStructureUpdates(operation, item, options);
				} else {
					var parent = self.getParentItem(item);
					if (parent) {
						parent.render("children", parent.dom.get("children"), parent.dom, options);
						if (self.isChildrenPaginationEnabled()) {
							parent.render("childrenByCurrentActorLive", parent.dom.get("childrenByCurrentActorLive"), parent.dom, options);
						}
						self.applyStructureUpdates(operation, item, options);
						parent.rerender("container");
					}
				}
				self.executeNextActivity();
				break;
		}
	};
	this.queueActivity({
		"action": action,
		"itemUnique": item.data.unique,
		"actorID": item.data.actor.id,
		"priority": options.priority,
		"handler": function() { handler(action); }
	});
};

Echo.Stream.prototype.queueActivity = function(params) {
	var item = this.items[params.itemUnique];
	if (!item) return;
	// we consider activity related to the current user if:
	//  - the corresponding item is blocked (moderation action in progress)
	//  - or the activity was performed by the current user
	var byCurrentUser = item.blocked || params.actorID && this.user.hasIdentity(params.actorID);
	var index = this.getActivityProjectedIndex(byCurrentUser, params);
	var data = {
		"action": params.action,
		"type": params.type || "",
		"affectCounter": params.action == "add",
		"itemUnique": params.itemUnique,
		"priority": params.priority,
		"byCurrentUser": byCurrentUser,
		"handler": function() { params.handler(); }
	};
	if (typeof index != "undefined") {
		this.activities.queue.splice(index, 0, data);
	} else {
		this.activities.queue.push(data);
	}
};

Echo.Stream.prototype.getActivityProjectedIndex = function(byCurrentUser, params) {
	var priorityWeights = {
		"highest": 0,
		"high": 10,
		"medium": 20,
		"low": 30,
		"lowest": 40
	};
	params.priority = params.priority == "highest" && "highest"
		|| byCurrentUser && "high"
		|| params.action == "replace" && "medium"
		|| params.priority
		|| "lowest";
	var index;
	if (params.action == "replace") {
		// in case we have "replace" activity for the item which was not added
		// to the stream yet but queued only we should set its priority the same
		// as that "add" activity so that to queue them in the right order
		$.each(this.activities.queue, function(i, activity) {
			if (activity.action == "add" && activity.itemUnique == params.itemUnique) {
				params.priority = activity.priority;
				return false; // break
			}
		});
	}
	$.each(this.activities.queue, function(i, activity) {
		if (priorityWeights[params.priority] < priorityWeights[activity.priority]) {
			index = i;
			return false; // break
		}
	});
	return index;
};

Echo.Stream.prototype.addItemSpotUpdate = function(item) {
	var self = this;
	this.activities.animations++;
	if (this.timeouts.slide) {
		//We should specify the element height explicitly to avoid element jumping during the animation effect
		var currentHeight = item.dom.content.show().css("height");
		item.dom.content.css("height", currentHeight).hide().animate({
			"height": "show", 
			"marginTop": "show", 
			"marginBottom": "show", 
			"paddingTop": "show", 
			"paddingBottom": "show"
		},
		this.timeouts.slide,
		function(){
			//After the animation effect we should remove explicitly set height
			if (!item.dom || !item.dom.content) return;
			item.dom.content.css("height", "");
		});
	} else {
		item.dom.content.show();
	}
	var publish = function() {
		if (!item.dom || !item.dom.content) return;
		self.publish("Stream.Item.onRender", self.prepareBroadcastParams({
			"item": {
				"data": item.data,
				"target": item.dom.content
			}
		}));
	};
	if (this.timeouts.fade) {
		var container = item.dom.get("container");
		var originalBGColor = $.getVisibleColor(container);
		container
		// delay fading out until content sliding is finished
		.delay(this.timeouts.slide)
		.css({"backgroundColor": this.config.get("flashColor")})
		// Fading out
		.animate(
			{"backgroundColor": originalBGColor},
			this.timeouts.fade,
			"linear",
			function() {
				container.css("backgroundColor", "");
				publish();
				self.activities.animations--;
				self.executeNextActivity();
			}
		);
	} else {
		publish();
		this.activities.animations--;
		this.executeNextActivity();
	}
};

Echo.Stream.prototype.deleteItemSpotUpdate = function(item, config) {
	var self = this;
	this.activities.animations++;
	config = config || {};
	var callback = $.isFunction(config) ? config : config.callback || function() {
		if (!item.dom || !item.dom.content) return;
		// if the item is being moved, we should keep all jQuery handlers
		// for the nested elements (children), thus we use "detach" instead of "remove"
		config.keepChildren ? item.dom.content.detach() : item.dom.remove("content");
		delete item.dom;
		item.vars = {};
		var itemsCount = $.foldl(0, self.items, function(_item, acc) {
			return acc + 1;
		});
		if (!itemsCount) {
			self.showMessage({
				"type": "empty",
				"message": self.label("emptyStream")
			}, self.dom.get('body'));
		}
		self.activities.animations--;
		self.executeNextActivity();
	};
	if (this.timeouts.slide) {
		item.dom.content.slideUp(this.timeouts.slide, callback);
	} else {
		callback();
	}
};

Echo.Stream.prototype.classifyAction = function(entry) {
	return (entry.verbs[0] == "http://activitystrea.ms/schema/1.0/delete") ? "delete" : "post";
};

Echo.Stream.prototype.isRootItem = function(item) {
	return !this.config.get("children.maxDepth") || item.id == item.conversation;
};

Echo.Stream.prototype.hasParentItem = function(item) {
	return !!this.getParentItem(item);
};

Echo.Stream.prototype.maybeMoveItem = function(item) {
	return item.forceInject;
};

Echo.Stream.prototype.withinVisibleFrame = function(item, items, isViewComplete, sortOrder) {
	items = items || this.threads;
	isViewComplete = typeof isViewComplete == "undefined"
		? this.isViewComplete
		: isViewComplete;
	sortOrder = sortOrder || this.config.get("sortOrder");
	var last = items.length
		? items[items.length - 1]
		: undefined;
	if (isViewComplete || last == undefined) return true;
	return this.compareItems(last, item, sortOrder);
};

Echo.Stream.prototype.withinVisibleChildrenFrame = function(item) {
	var parent = this.getParentItem(item);
	if (!this.isChildrenPaginationEnabled() || !parent) return this.hasParentItem(item);
	return this.withinVisibleFrame(item, parent.children,
			!parent.hasMoreChildren(), this.config.get("children.sortOrder"));
};

Echo.Stream.prototype.getParentItem = function(item) {
	return this.isRootItem(item) ? undefined : this.items[item.data.parentUnique];
};

Echo.Stream.prototype.compareItems = function(a, b, sort) {
	var self = this;
	switch (sort) {
		case "chronological":
			return a.timestamp > b.timestamp;
		case "reverseChronological":
			return a.timestamp <= b.timestamp;
		case "likesDescending":
		case "repliesDescending":
		case "flagsDescending":
			var getCount = function(entry) {
				return self.getRespectiveAccumulator(entry, sort);
			};
			return (getCount(a) < getCount(b) ||
					(getCount(a) == getCount(b) &&
						this.compareItems(a, b, "reverseChronological")));
	};
};

Echo.Stream.prototype.placeRootItem = function(item) {
	var content = item.render();
	if (this.threads.length > 1) {
		var id = this.getItemListIndex(item, this.threads);
		var next = this.threads[id + 1], prev = this.threads[id - 1];
		if (next) {
			next.dom.content.before(content);
		} else {
			prev.dom.content.after(content);
		}
	} else {
		this.dom.get("body").empty().append(content);
	}
	this.publish("internal.Item.onAdd", {"item": item});
};

Echo.Stream.prototype.placeChildrenItems = function(parent, children, entries) {
	var self = this;
	var itemsWrapper = this.createChildrenItemsDomWrapper(children, parent);
	// we should calculate index of the sibling item for the responsed items
	var targetItemIdx = -1;
	$.each(parent.children, function(i,_item) {
		if (self.isItemInList(_item.data, entries)) {
			targetItemIdx = i - 1;
			return false;
		}
	});
	var targetItemDom = targetItemIdx >= 0
		? parent.children[targetItemIdx].dom.content
		: parent.dom.get("children");
	var action = targetItemIdx >= 0
		? "insertAfter"
		: this.config.get("children.sortOrder") != "chronological" 
			? "prependTo"
			: "appendTo";
	itemsWrapper[action]($(targetItemDom));
	parent.rerender("childrenByCurrentActorLive");
	// we should specify the element height explicitly
	// to avoid element jumping during the animation effect
	itemsWrapper
		.css("height", itemsWrapper.show().css("height"))
		.hide()
		.animate(
			{
				"height": "show",
				"marginTop": "show",
				"marginBottom": "show",
				"paddingTop": "show", 
				"paddingBottom": "show"
			},
			{
				"duration": this.config.get("children.itemsSlideTimeout"),
				"complete": function() {
					itemsWrapper.css("height", "");
					parent.rerender(["expandChildren", "expandChildrenLabel"]);
					itemsWrapper.children().unwrap();
				}
			}
		);
};

Echo.Stream.prototype.getItemListIndex = function(item, items) {
	var idx = -1;
	$.each(items || [], function(i, entry) {
		if (entry == item || (entry.unique && item.unique && entry.unique == item.unique)) {
			idx = i;
			return false;
		}
	});
	return idx;
};

Echo.Stream.prototype.isItemInList = function(item, items) {
	return this.getItemListIndex(item, items) >= 0;
};

Echo.Stream.prototype.isChildrenPaginationEnabled = function() {
	return !!this.config.get("children.itemsPerPage");
};

Echo.Stream.prototype.initItem = function(entry, isLive) {
	var self = this;
	var item = new Echo.Item({
		"children": [],
		"config": new Echo.Config(this.config.getAsHash()),
		"conversation": entry.target.conversationID, // short cut for "conversationID" field
		"data": entry,
		"depth": 0,
		"id": entry.object.id, // short cut for "id" item field
		"live": isLive,
		"threading": false,
		"timestamp": $.timestampFromW3CDTF(entry.object.published),
		"user": this.user
	});
	// caching item template to avoid unnecessary work
	var template = item.template;
	item.template = function() {
		if (!self.vars.cache.itemTemplate) {
			self.vars.cache.itemTemplate = $.isFunction(template)
				? template.apply(this, arguments)
				: template;
		}
		return self.vars.cache.itemTemplate;
	};
	this.items[item.data.unique] = item;
	return item;
};

Echo.Stream.prototype.updateItem = function(entry) {
	var item = this.items[entry.unique];
	// forcing item re-injection if the published date or the respective accumulator was changed
	var sortOrder = this.config.get(this.isRootItem(item) ? "sortOrder" : "children.sortOrder");
	var accRelatedSortOrder = sortOrder.match(/replies|likes|flags/);
	var acc = accRelatedSortOrder && this.getRespectiveAccumulator(item, sortOrder);
	if (item.data.object.published != entry.object.published) {
		item.timestamp = $.timestampFromW3CDTF(entry.object.published);
		item.forceInject = true;
	}
	$.extend(item.data, entry);
	if (accRelatedSortOrder) {
		if (this.getRespectiveAccumulator(item, sortOrder) != acc) {
			item.forceInject = true;
		}
	}
	return item;
};

Echo.Stream.prototype.getItemProjectedIndex = function(item, items, sort) {
	var self = this;
	var index;
	if (item.live || item.forceInject) {
		$.each(items || [], function(i, entry) {
			if (self.compareItems(entry, item, sort)) {
				index = i;
				return false;
			}
		});
	}
	return typeof index != "undefined" ? index : items.length;
};

Echo.Stream.prototype.addItemToList = function(items, item, sort) {
	items.splice(this.getItemProjectedIndex(item, items, sort), 0, item);
	delete item.forceInject;
	this.items[item.data.unique] = item;
};

Echo.Stream.prototype.applyStructureUpdates = function(action, item, options) {
	var self = this;
	options = options || {};
	switch (action) {
		case "add":
			if (!this.isRootItem(item)) {
				var parent = this.getParentItem(item);
				// avoiding problem with missing parent
				if (!parent) {
					delete this.items[item.data.unique];
					return;
				}
				item.depth = parent.depth + 1;
				// backwards compatibility in case children pagination is off
				if (!this.isChildrenPaginationEnabled() && item.depth > 1) {
					item.depth = 1;
					// replace parent of the item
					item.data.parentUnique = parent.data.parentUnique;
					item.data.target.id = parent.data.target.id;
					item.forceInject = true;
					this.applyStructureUpdates("add", item);
					return;
				}
				parent.threading = true;
				item.forceInject = true;
				this.addItemToList(
					parent.children,
					item,
					this.isChildrenPaginationEnabled()
						? this.config.get("children.displaySortOrder")
						: this.config.get("children.sortOrder")
				);
			} else {
				this.addItemToList(this.threads, item, this.config.get("sortOrder"));
			}
			break;
		case "delete":
			var container = null;
			if (this.isRootItem(item)) {
				container = this.threads;
			} else {
				container = this.items[item.data.parentUnique].children;
				if (container.length == 1) {
					var parent = this.getParentItem(item);
					if (parent) parent.threading = false;
				}
			}
			container.splice(this.getItemListIndex(item, container), 1);
			if (!options.keepChildren) {
				item.traverse(item.children, function(child) {
					delete self.items[child.data.unique];
				});
				delete item.children;
			}
			delete this.items[item.data.unique];
			break;
	};
};

Echo.Stream.prototype.normalizeEntry = function(entry) {
	if (entry.normalized) return entry;
	var self = this;
	entry.normalized = true;
	// detecting actual target
	$.each(entry.targets || [], function(i, target) {
		if ((target.id == target.conversationID) ||
			(target.id == entry.object.id) ||
			(self.items[target.id + target.conversationID])) {
				entry.target = target;
		}
	});
	entry.object.content_type = entry.object.content_type || "text";
	entry.object.accumulators = entry.object.accumulators || {};
	entry.object.accumulators.repliesCount =
				parseInt(entry.object.accumulators.repliesCount || "0");
	entry.object.accumulators.flagsCount =
				parseInt(entry.object.accumulators.flagsCount || "0");
	entry.object.accumulators.likesCount =
				parseInt(entry.object.accumulators.likesCount || "0");
	entry.object.context = entry.object.context || [];
	entry.object.flags = entry.object.flags || [];
	entry.object.likes = entry.object.likes || [];
	entry.target = entry.target || entry.targets[0] || {};
	entry.target.conversationID = entry.target.conversationID || entry.object.id;
	entry.source = entry.source || {};
	entry.provider = entry.provider || {};
	entry.unique = entry.object.id + entry.target.conversationID;
	entry.parentUnique = entry.target.id + entry.target.conversationID;
	return entry;
};

Echo.Stream.prototype.addCss = function() {
	var self = this;
	$.addCss(
		'.echo-stream-message-wrapper { padding: 15px 0px; text-align: center; -moz-border-radius: 0.5em; -webkit-border-radius: 0.5em; border: 1px solid #E4E4E4; }' +
		'.echo-stream-message-empty, .echo-stream-message-loading, .echo-stream-message-error { display: inline-block; height: 16px; padding-left: 21px; background: no-repeat left center; }' +
		'.echo-stream-message-empty { background-image: url(//cdn.echoenabled.com/images/information.png); }' +
		'.echo-stream-message-loading { background-image: url(//cdn.echoenabled.com/images/loading.gif); }' +
		'.echo-stream-message-error { background-image: url(//cdn.echoenabled.com/images/warning.gif); }' +
		'.echo-stream-header { margin: 10px 0px 10px 20px; }' +
		'.echo-stream-state { float: right; }' +
		'.echo-stream-state-picture { display: inline-block; height: 9px; width: 8px; }' +
		'.echo-stream-state-picture-paused { background: url("//cdn.echoenabled.com/images/control_pause.png") no-repeat center center; }' +
		'.echo-stream-state-picture-live { background: url("//cdn.echoenabled.com/images/control_play.png") no-repeat center center; }' +
		'.echo-stream-state-message { margin-left: 5px; text-decoration: none; }' +
		'.echo-clickable a.echo-stream-state-message:hover { text-decoration: underline; }' +
		'.echo-stream-brand { text-align: right; display: none; }' +
		'.echo-stream-brand-message { display: inline-block; height: 17px; line-height: 17px; border: none; padding-right: 48px; background: url(//cdn.echoenabled.com/images/echo-brand.png) no-repeat right; font-size: 10px; font-family: Arial; }' +
		'.echo-stream-container a.echo-stream-brand-link { text-decoration: none; color: #666666; } ' +
		'.echo-stream-more-hover { background-color: #E4E4E4; }' +
		'.echo-stream-more { text-align: center; border: solid 1px #E4E4E4; margin-top: 10px; padding: 10px; -moz-border-radius: 0.5em; -webkit-border-radius: 0.5em; cursor: pointer; font-weight: bold; }' +
		'.echo-stream-more .echo-application-message { padding: 0; border: none; border-radius: 0; }'
	, 'stream');

	$.addCss(
		'.echo-item-content { word-wrap: break-word; }' +
		'.echo-item-container-root { padding: 10px 0px; }' +
		'.echo-item-container-root-thread { padding: 10px 0px 0px 0px; }' +
		'.echo-item-container-child { padding: 10px; margin: 0px 20px 2px 0px; }' +
		'.echo-item-container-child-thread { padding: 10px; margin: 0px 20px 2px 0px; }' +
		'.echo-item-avatar-wrapper { margin-right: -58px; float: left; position: relative; }' +
		'.echo-item-children .echo-item-avatar-wrapper, .echo-item-childrenByCurrentActorLive .echo-item-avatar-wrapper { margin-right: -34px; }' +
		'.echo-item-children .echo-item-subwrapper, .echo-item-childrenByCurrentActorLive .echo-item-subwrapper { margin-left: 34px; }' +
		'.echo-item-wrapper { float: left; width: 100%; }' +
		'.echo-item-subwrapper { margin-left: 58px; }' +
		'.echo-item-subcontainer { float: left; width: 100%; }' +
		'.echo-item-markers { line-height: 16px; background: url(//cdn.echoenabled.com/images/curation/metadata/marker.png) no-repeat; padding: 0px 0px 4px 21px; margin-top: 7px; }' +
		'.echo-item-tags { line-height: 16px; background: url(//cdn.echoenabled.com/images/tag_blue.png) no-repeat; padding: 0px 0px 4px 21px; }' +
		'.echo-item-metadata { display: none; }' +
		'.echo-item-metadata-title { font-weight: bold; line-height: 25px; height: 25px; margin-right: 5px; }' +
		'.echo-item-metadata-icon { display: inline-block; padding-left: 26px; }' +
		'div.echo-item-metadata-userID { border-bottom: 1px solid #e1e1e1; border-top: 1px solid #e1e1e1;}' +
		'span.echo-item-metadata-userID { background: url("//cdn.echoenabled.com/images/curation/metadata/user.png") no-repeat left center; }' +
		'.echo-item-metadata-userIP { border-bottom: 1px solid #e1e1e1; }' +
		'.echo-item-metadata-userIP .echo-item-metadata-icon { background: url("//cdn.echoenabled.com/images/curation/metadata/computer.png") no-repeat left center; }' +
		'.echo-item-modeSwitch { float: right; width: 16px; height: 16px; background:url("//cdn.echoenabled.com/images/curation/metadata/flip.png") no-repeat 0px 3px; }' +
		'.echo-item-childrenMarker { border-color: transparent transparent #ECEFF5; border-width: 0px 11px 11px; border-style: solid; margin: 3px 0px 0px 77px; height: 1px; width: 0px; display: none; }' + // This is magic "arrow up". Only color and margins could be changed
		'.echo-item-container-root-thread .echo-item-childrenMarker { display: block; }' +
		'.echo-item-avatar { width: 48px; height: 48px; }' +
		'.echo-item-children .echo-item-avatar, .echo-item-childrenByCurrentActorLive .echo-item-avatar { width: 24px; height: 24px; }' +
		'.echo-item-authorName { float: left; font-size: 15px; font-family: Arial, sans-serif; font-weight: bold; }' +
		'.echo-item-re { font-weight: bold; }' +
		'.echo-item-re a:link, .echo-item-re a:visited, .echo-item-re a:active { text-decoration: none; }' +
		'.echo-item-re a:hover { text-decoration: underline; }' +
		'.echo-item-body { padding-top: 4px; }' +
		'.echo-item-controls { float: left; margin-left: 3px; }' +
		'.echo-item-sourceIcon { float: left; height: 16px; width: 16px; margin-right: 5px; border: 0px; }' +
		'.echo-item-date, .echo-item-from, .echo-item-via { float: left; }' +
		'.echo-item-from a, .echo-item-via a { text-decoration: none; color: #C6C6C6; }' +
		'.echo-item-from a:hover, .echo-item-via a:hover { color: #476CB8; }' +
		'.echo-item-tag { display: inline-block; height: 16px; background: url("//cdn.echoenabled.com/images/tag_blue.png") no-repeat; padding-left: 18px; }' +
		'.echo-item-smiley-icon { border: 0px; }' +
		'.echo-item-textToggleTruncated { margin-left: 5px; }' +
		'.echo-item-blocker-backdrop { position: absolute; left: 0px; top: 0px; background: #FFFFFF; opacity: 0.7; z-index: 100; }' +
		'.echo-item-blocker-message { position: absolute; z-index: 200; width: 200px; height: 20px; line-height: 20px; text-align: center; background-color: #FFFF99; border: 1px solid #C6C677; opacity: 0.7; -moz-border-radius: 0.5em 0.5em 0.5em 0.5em; }' +
		'.echo-item-expandChildren { display:none; text-align: center; padding:4px; }' +
		'.echo-item-expandChildren .echo-item-expandChildrenLabel { display: inline-block; padding-left: 22px; }' +
		'.echo-item-expandChildren .echo-message-icon { background: url("//cdn.echoenabled.com/images/whirlpool.png") no-repeat 5px 4px; }' +
		'.echo-item-expandChildren .echo-item-message-loading { background: no-repeat left top url(//cdn.echoenabled.com/images/loading.gif); }' +
		'.echo-item-expandChildren .echo-application-message { padding: 0; border:none; border-radius: 0; }'
	, 'item');

	var itemDepthRules = [];
	// 100 is a maximum level of children in query, but we can apply styles for ~20
	for (var i = 0; i <= 20; i++) {
		itemDepthRules.push('.echo-item-depth-' + i + ' { margin-left: ' + (i ? 68 + (i - 1) * 44 : 0) + 'px; }');
	}
	$.addCss(itemDepthRules.join("\n"), "item-depths");

	if ($.browser.msie) {
		$.addCss(
			'.echo-item-childrenMarker { font-size: 1px; line-height: 1px; filter: chroma(color=black); }' + // filter:chroma is needed to avoid transparent borders as black in ie6
			'.echo-item-blocker-backdrop, .echo-item-blocker-message { filter:Alpha(Opacity=70); }' +
			'.echo-stream-container { zoom: 1; }' +
			'.echo-item-content { zoom: 1; }' +
			'.echo-item-container { zoom: 1; }' +
			'.echo-item-subwrapper { zoom: 1; }' +
			'.echo-item-avatar-wrapper { position: static; }' +
			'.echo-stream-state-picture { vertical-align: middle; }'
		, 'stream-ie');
	}
};
})(jQuery);

