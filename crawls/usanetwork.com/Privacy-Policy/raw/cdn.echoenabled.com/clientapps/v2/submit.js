// vim: set ts=8 sts=8 sw=8 noet:
/*
 * Copyright (c) 2006-2011 Echo <solutions@aboutecho.com>. All rights reserved.
 * You may copy and modify this script as long as the above copyright notice,
 * this condition and the following disclaimer is left intact.
 * This software is provided by the author "AS IS" and no warranties are
 * implied, including fitness for a particular purpose. In no event shall
 * the author be liable for any damages arising in any way out of the use
 * of this software, even if advised of the possibility of such damage.
 *
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

Echo.UI.MobileButton = function(element, states) {
	this.states = states || {};
	this.element = $(element);
	this.addCss();
	var data = this.prepareData(this.states.normal || {});
	if (data.label) {
		this.setLabel(data.label);
	} else {
		this.states.normal = $.extend(this.states.normal || {}, { "label": this.element.html() });
	}
	this.element.button();
	this.wrapper = this.element.parent();
	this.wrapper.addClass("echo-mobilebutton");
	this.setIcon(data.icon);
}

Echo.UI.MobileButton.prototype = new Echo.Object();

Echo.UI.MobileButton.prototype.setState = function(name) {
	var data = this.prepareData(this.states[name]);
	this.setLabel(data.label);
	this.setIcon(data.icon);
	this.element.is(":visible") && this.element.button("refresh");
}

Echo.UI.MobileButton.prototype.setIcon = function(icon) {
	if ($('.ui-icon', this.wrapper).length) {
		$('.ui-icon', this.wrapper).removeClass().addClass(icon + " ui-icon");
	} else {
		$("<div>").addClass(icon + " ui-icon").prependTo(this.wrapper);
	}
}

Echo.UI.MobileButton.prototype.setLabel = function(label) {
	this.element.html(label);
}

Echo.UI.MobileButton.prototype.prepareData = function(state) {
	return {
		"label": state.label || "",
		"icon": (state.icons && state.icons.primary) ? state.icons.primary : ""
	};
}

Echo.UI.MobileButton.prototype.addCss = function() {
	$.addCss(
		'.echo-mobilebutton .ui-icon { position: absolute; top: 50%; background: none; margin: -7px 0px 0px 5px; float: left; }' +
		'.echo-mobilebutton .ui-icon-arrow-right { background: no-repeat center url(//cdn.echoenabled.com/images/curation/button/apply_normal.png);  float: left; }' +
		'.echo-mobilebutton .ui-icon-save { background: no-repeat center url(//cdn.echoenabled.com/images/curation/button/save_normal.png); float: left;  margin-right: 5px; }' +
		'.echo-mobilebutton .ui-icon-waiting { background: no-repeat center url(//cdn.echoenabled.com/images/loading.gif);  float: left; margin-right: 5px;}' +
		'.echo-mobilebutton .ui-btn-inner { padding: 0.6em 25px; }' +
		'.ui-page .ui-content { overflow-y: hidden}'
	, 'ui-buttons-icons');
};
})(jQuery);



Echo.UI.Button = function(element, states) {
	// if jquery mobile is used
	if ($.mobile) return new Echo.UI.MobileButton(element, states);
	this.states = states || {};
	this.element = $(element);
	this.addCss();
	if (this.states.normal && !this.states.normal.label) {
		this.states.normal.label = $(element).html();
	}
	$(element).button(this.states.normal).wrap('<span class="echo-button"></span>');
	this.wrapper = $(element).parent();
};

Echo.UI.Button.prototype = new Echo.Object();

Echo.UI.Button.prototype.setState = function(name) {
	this.element.removeClass('ui-button-text-only ui-button-text-icons ui-button-text-icon');
	this.element.button('option', this.states[name]);
}

Echo.UI.Button.prototype.addCss = function() {
	$.addCss(
		'.echo-button .ui-button { display: inline-block; position: relative; padding: 0; margin-right: .1em; text-decoration: none !important; cursor: pointer; text-align: center; overflow: visible; }' +
		'.echo-button .ui-button-icon-only { width: 1.8em; }' +
		'.echo-button button.ui-button-icon-only { width: 2em; }' +
		'.echo-button .ui-button-icons-only { width: 3em; }' +
		'.echo-button button.ui-button-icons-only { width: 3.3em; }' +
		'.echo-button .ui-button .ui-button-text { display: block; }' +
		'.echo-button .ui-button-text-only .ui-button-text { padding: .4em .8em; }' +
		'.echo-button .ui-button-icon-only .ui-button-text, .echo-button .ui-button-icons-only .ui-button-text { padding: .4em; text-indent: -9999999px; }' +
		'.echo-button .ui-button-text-icon .ui-button-text, .echo-button .ui-button-text-icons .ui-button-text { padding: .4em .8em .4em 2.1em; }' +
		'.echo-button .ui-button-text-icons .ui-button-text { padding-left: 1.9em; padding-right: 1.9em; }' +
		'.echo-button input.ui-button { padding: .4em .8em; }' +
		'.echo-button .ui-button-icon-only .ui-icon, .echo-button .ui-button-text-icon .ui-icon, .echo-button .ui-button-text-icons .ui-icon, .echo-button .ui-button-icons-only .ui-icon { position: absolute; top: 50%; margin-top: -8px; }' +
		'.echo-button .ui-button-icon-only .ui-icon { left: 50%; margin-left: -8px; }' +
		'.echo-button .ui-button-text-icon .ui-button-icon-primary, .echo-button .ui-button-text-icons .ui-button-icon-primary, .echo-button .ui-button-icons-only .ui-button-icon-primary { left: .3em; }' +
		'.echo-button .ui-button-text-icons .ui-button-icon-secondary, .echo-button .ui-button-icons-only .ui-button-icon-secondary { right: .3em; }' +
		'.echo-button button.ui-button::-moz-focus-inner { border: 0; padding: 0; }' +
		'.echo-button .ui-state-default { border: 1px solid #d3d3d3; background: #e6e6e6; color: #555555; }' +
		'.echo-button .ui-state-default a, .echo-ui .ui-state-default a:link, .echo-button .ui-state-default a:visited { color: #555555; text-decoration: none; }' +
		'.echo-button .ui-state-hover, .echo-button .ui-state-focus { border: 1px solid #999999; background: #dfebf2; color: #212121; }' +
		'.echo-button .ui-state-active { border: 1px solid #aaaaaa; background: #dfebf2; color: #212121; }' +
		Echo.UI.cornersCss('4px', '.echo-button button')
	, 'ui-buttons');
	if ($.browser.msie) {
		$.addCss('.echo-button .ui-button { zoom: 1; }', 'ui-buttons-ie'); 
	}

	$.addCss(
		'.echo-button .ui-icon-arrow-right { background: no-repeat center url(//cdn.echoenabled.com/images/curation/button/apply_normal.png); }' +
		'.echo-button .ui-icon-save { margin-right: 5px; background: no-repeat center url(//cdn.echoenabled.com/images/curation/button/save_normal.png); }' +
		'.echo-button .ui-icon-waiting { margin-right: 5px; background: no-repeat center url(//cdn.echoenabled.com/images/loading.gif); }'
	, 'ui-buttons-icons');
};


})(jQuery);


(function($) {
Echo.Localization.extend({
	"createdBy": "Created by",
	"markers": "Markers:",
	"markersHint": "Marker1, marker2, marker3, ...",
	"on": "on",
	"post": "Post",
	"posting": "Posting...",
	"postingFailed": "There was a server error while trying to submit your item. Please try again in a few minutes. <b>Error: \"{error}\"</b>.",
	"postingTimeout": "There was a network issue while trying to submit your item. Please try again in a few minutes.",
	"tagsHint": "Tag1, tag2, tag3, ...",
	"tags": "Tags:",
	"update": "Update",
	"updating": "Updating...",
	"yourName": "Your Name (required)",
	"yourWebsiteOptional": "Your website (optional)"
}, "Submit");

Echo.Submit = function(config) {
	if (!config || !config.target) return;
	var self = this;
	this.vars = {};
	this.initConfig(config, {
		"targetURL": document.location.href,
		"submissionProxyURL": window.location.protocol + "//apps.echoenabled.com/v2/esp/activity",
		"markers": [],
		"source": {},
		"tags": [],
		"requestMethod": "GET",
		"mode": "standard",
		"data": {},
		"inReplyTo": {},
		"itemURIPattern": undefined,
		"actionString": "Type your comment here...",
		"postingTimeout": 30,
		"targetQuery": undefined
	});
	this.initialMode = this.config.get("mode");
	this.initApplication(function() {
		self.contextId = self.config.get("contextId", self.newContextId());
		self.addCss();
		self.config.get("target").empty().append(self.render());
		self.listenEvents();
		self.publish("Submit.onRender", self.prepareBroadcastParams());
	});
};

Echo.Submit.prototype = new Echo.Application();

Echo.Submit.prototype.namespace = "Submit";

Echo.Submit.prototype.cssPrefix = "echo-submit-";

Echo.Submit.prototype.template = function() {
	return this.templates[this.config.get("mode")];
};

Echo.Submit.prototype.templates = {};

Echo.Submit.prototype.templates.standard =
	'<div class="echo-submit-container">' +
		'<div class="echo-submit-header"></div>' +
		'<div class="echo-submit-body">' +
			'<div class="echo-submit-content echo-submit-border">' +
				'<textarea class="echo-submit-text echo-submit-text-area echo-primaryFont echo-primaryColor"></textarea>' +
			'</div>' +
			'<div class="echo-submit-markersContainer echo-submit-metadata-container echo-primaryFont echo-primaryColor">' +
				'<div class="echo-submit-metadata-label">{Label:markers}</div>' +
				'<div class="echo-submit-metadata-wrapper">' +
					'<div class="echo-submit-metadata-subwrapper echo-submit-border ">' +
						'<input class="echo-submit-markers echo-primaryFont">' +
					'</div>' +	
				'</div>' +
				'<div class="echo-clear"></div>' +
			'</div>' +
			'<div class="echo-submit-tagsContainer echo-submit-metadata-container echo-primaryFont echo-primaryColor">' +
				'<div class="echo-submit-metadata-label">{Label:tags}</div>' +
				'<div class="echo-submit-metadata-wrapper">' +
					'<div class="echo-submit-metadata-subwrapper echo-submit-border ">' +
						'<input class="echo-submit-tags echo-submit-border echo-primaryFont">' +
					'</div>' +
				'</div>' +
				'<div class="echo-clear"></div>' +
			'</div>' +
		'</div>' +
		'<div class="echo-submit-controls">' +
			'<div class="echo-submit-post-container echo-ui">' +
				'<button type="button" class="echo-submit-postButton echo-primaryFont"></button>' +
			'</div>' +
			'<div class="echo-clear"></div>' +
		'</div>' +
	'</div>';

Echo.Submit.prototype.templates.edit = Echo.Submit.prototype.templates.standard;

Echo.Submit.prototype.templates.compact =
	'<div class="echo-submit-container">' +
		'<div class="echo-submit-content echo-submit-border">' +
			'<input class="echo-submit-text echo-submit-text-input echo-primaryFont echo-primaryColor">' +
		'</div>' +
	'</div>';

Echo.Submit.prototype.renderers = {};

Echo.Submit.prototype.renderers.container = function(element) {
	if (this.initialMode == "compact") {
		element.click(function(event) { event.stopPropagation(); });
	}
};

Echo.Submit.prototype.renderers.tagsContainer = 
Echo.Submit.prototype.renderers.markersContainer = function(element, dom) {
	if (this.user.isAdmin()) {
		element.show();
	} else {
		element.hide();
	}
};

Echo.Submit.prototype.renderers.metaFields = function(element, dom, extra) {
	var type = extra.type;
	var data = this.config.get("data.object." + type, this.config.get(type, []));
	dom.get(type)
		.iHint({
			"text": this.label(type + "Hint"),
			"className": "echo-secondaryColor"
		})
		.val($.trim($.stripTags(data.join(", "))))
		.blur();
};

Echo.Submit.prototype.renderers.markers = function(element, dom) {
	this.render("metaFields", element, dom, {"type": "markers"});
};

Echo.Submit.prototype.renderers.tags = function(element, dom) {
	this.render("metaFields", element, dom, {"type": "tags"});
};

Echo.Submit.prototype.renderers.editModeUserInfo = function(element, dom) {
	var template =
		'<div class="echo-submit-userInfoWrapper echo-primaryFont echo-primaryFont echo-primaryColor">' +
			'{Label:createdBy} ' +
			'<span class="echo-submit-author">{Data:author}</span> ' +
			'{Label:on} {Data:date}' +
		'</div>';
	var descriptors = {};
	var published = this.config.get("data.object.published");
	var date = new Date($.timestampFromW3CDTF(published) * 1000);
	return $.toDOM(this.substitute(template, {
		"date": date.toLocaleDateString() + ', ' + date.toLocaleTimeString(),
		"author": this.config.get("data.actor.title", this.label("guest"))
	}), this.cssPrefix, {}).content;
};

Echo.Submit.prototype.renderers.anonymousModeUserInfo = function(element, dom) {
	var self = this;
	var prefix = "echo-submit-anonymousUserInfo";
	var template = 
		'<div class="echo-submit-userInfoWrapper">' +
			'<div class="{Data:prefix}Avatar"></div>' +
			'<div class="{Data:prefix}Fields">' +
				'<div class="{Data:prefix}FieldsWrapper">' +
					'<div class="{Data:prefix}NameContainer echo-submit-border">' +
						'<input class="{Data:prefix}Name echo-primaryFont echo-primaryColor">' +
					'</div>' +
					'<div class="{Data:prefix}UrlContainer echo-submit-border">' +
						'<input class="{Data:prefix}Url echo-primaryFont echo-primaryColor">' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div class="echo-clear"></div>' +
		'</div>';
	var descriptors = {
		"Avatar" : function(element){
			var avatar = self.user.get("avatar", self.user.get("defaultAvatar"));
			element.append('<img src="' + avatar + '">');
			// avatars manager will be developed later
		},
		"Name" : function(element) {
			dom.set("anonymousUserInfoName", element);
			element.val(self.user.get("name", "")).iHint({
				"text": self.label("yourName"),
				"className": "echo-secondaryColor"
			});
		},
		"Url" : function(element) {
			dom.set("anonymousUserInfoUrl", element);
			element.val(self.user.get("domain", "")).iHint({
				"text": self.label("yourWebsiteOptional"),
				"className": "echo-secondaryColor"
			});
		}
	};
	var template = this.substitute(template, {"prefix": prefix});
	return $.toDOM(template, prefix, descriptors).content;
};

Echo.Submit.prototype.renderers.header = function(element, dom) {
	var mode = this.config.get("mode") == "edit" ? "edit": "anonymous";
	return this.render(mode + "ModeUserInfo", element, dom);
}

Echo.Submit.prototype.renderers.text = function(element) {
	var self = this, content = this.config.get("data.object.content");
	if (content) {
		element.val(content);
	}
	element.iHint({
		"text": self.config.get("actionString"),
		"className": "echo-secondaryColor"
	});
	if (this.config.get("mode") == "compact") {
		element.focus(function() {
			self.config.set("mode", "standard");
			self.rerender();
			setTimeout(function() {
				self.dom.get("text").focus();
			}, 0);
			self.publish("Submit.onExpand", self.prepareBroadcastParams());
		});
	}
};

Echo.Submit.prototype.renderers.postButton = function(element) {
	var self = this, isEditMode = this.config.get("mode") == "edit";
	var button = new Echo.UI.Button(element, {
		"normal": {
			"icons": false,
			"disabled": false,
			"label": self.label(isEditMode ? "update" : "post")
		},
		"posting": {
			"icons": {
				"primary": "ui-icon-waiting"
			},
			"disabled": true,
			"label": self.label(isEditMode ? "updating" : "posting")
		}
	});

	self.posting = self.posting || {};
	self.posting.subscriptions = self.posting.subscriptions || [];
	var subscribe = function(phase, state, handler) {
		$.each(["Post", "Edit"], function (i, v) {
			var topic = "Submit.on" + v + phase;
			var sub = self.posting.subscriptions;
			if (sub[topic])
				self.unsubscribe(topic, sub[topic]);
			sub[topic] = self.subscribe(topic, function(eventTopic, eventParams) {
				if (self.config.get("target").get(0) != eventParams.target) return;
				button.setState(state);
				if (handler) handler();
			});
		});
	}
	subscribe("Init", "posting");
	subscribe("Complete", "normal", function() {
		self.dom.get("text").val("").trigger("blur");
		self.rerender(["tagsContainer", "markersContainer"]);
	});
	subscribe("Error", "normal");

	this.posting.action = this.posting.action || function() {
		var highlighted = false;
		$.each(["anonymousUserInfoName", "text"], function (i, v) {
			highlighted = self.highlightMandatory(self.dom.get(v));
			return !highlighted;
		});
		if (highlighted) return;
		self.post();
	};
	element.unbind("click", this.posting.action).bind("click", this.posting.action);
};

Echo.Submit.prototype.post = function() {
	var self = this, isEditMode = this.config.get("mode") == "edit";
	var get = function(name) {
		return self.dom.get(name);
	};
	var publish = function(phase, data) {
		var mode = isEditMode ? "Edit" : "Post";
		self.publish("Submit.on" + mode + phase, self.prepareBroadcastParams({
			"postData": data
		}));
	};
	var content;
	if (isEditMode) {
		content = [].concat(
			self.getContentUpdate(get("text").val()),
			self.getMetaDataUpdates("tag", "tags", get("tags").val()),
			self.getMetaDataUpdates("mark", "markers", get("markers").val())
		);
		if (!content.length) {
			publish("Complete", []);
			return;
		}
	} else {
		content = {
			"avatar" : self.user.get("avatar", ""),
			"content" : get("text").val(),
			"markers" : $.trim(get("markers").val()),
			"name" : self.user.get("name", (self.user.logged()
					? ""
					: get("anonymousUserInfoName").val())),
			"source" : self.config.get("source"),
			"tags" : $.trim(get("tags").val()),
			"target" : self.config.get("targetURL"),
			"url" : self.user.get("domain", (self.user.logged()
					? ""
					: get("anonymousUserInfoUrl").val())),
			"verb" : "post"
		};
		if (self.config.get("type")) {
			content.type = self.config.get("type");
		}
		if (self.config.get("itemURIPattern")) {
			content.itemURIPattern = self.config.get("itemURIPattern");
		}
	};
	var timer;
	var hasPreviousTimeout = false;
	var callback = function(data) {
		if (timer) clearTimeout(timer);
		data = data || {};
		if (data.result == "error") {
			// we have previous timeout on the client side so we just ignore errors from server side
			if (hasPreviousTimeout) return;
			var isNetworkTimeout = hasPreviousTimeout = (data.errorCode == "network_timeout");
			var message = isNetworkTimeout
				? self.label("postingTimeout")
				: self.label("postingFailed", {"error": data.errorMessage || data.errorCode});
			$.fancybox({
				"content": '<div class="echo-submit-error">' + message + '</div>',
				"height": 70,
				"width": isNetworkTimeout ? 320 : 390,
				"padding": 15,
				"orig": get("text"),
				"autoDimensions": false,
				"transitionIn": "elastic",
				"transitionOut": "elastic",
				"onComplete": function() {
					// set fixed dimensions of the fancybox-wrap (for IE in quirks mode it should be bigger)
					if ($.browser.msie && document.compatMode != "CSS1Compat") {
						var options = arguments[2];
						var delta = 2 * options.padding + 40;
						$("#fancybox-wrap").css({
							"width": options.width + delta,
							"height": options.height + delta
						});
					}
				}
			});
			publish("Error", data);
		} else {
			publish("Complete", content);
		}
	};
	publish("Init", content);
	var entry = {
		"appkey" : self.config.get("appkey"),
		"content" : $.object2JSON(content),
		"sessionID": self.user.get("sessionID", "")
	};
	if (self.config.get("targetQuery")) entry["target-query"] = self.config.get("targetQuery"); 
	if (this.config.get("requestMethod").toLowerCase() == "post") {
		$.sendPostRequest(this.config.get("submissionProxyURL"), entry, callback);
	} else {
		$.ajax({
			"type": "GET",
			"url": this.config.get("submissionProxyURL"),
			"data": entry,
			"success": callback,
			"error": function() {
				callback({"result": "error", "errorCode": "internal_error"});
			},
			"dataType": "jsonp"
		});
		var postingTimeout = this.config.get("postingTimeout");
		if (postingTimeout) {
			timer = setTimeout(function() {
				callback({"result": "error", "errorCode": "network_timeout"});
			}, postingTimeout * 1000);
		}
	}
};

Echo.Submit.prototype.highlightMandatory = function(element) {
	if (element && !$.trim(element.val())) {
		element.parent().addClass("echo-submit-mandatory");
		element.focus(function() {
			$(this).parent().removeClass("echo-submit-mandatory");
		});
		return true;
	}
	return false;
};

Echo.Submit.prototype.prepareBroadcastParams = function(params) {
	params = params || {};
	params.data = this.config.get("data");
	params.target = this.config.get("target").get(0);
	params.targetURL = this.config.get("targetURL");
	params.inReplyTo = this.config.get("inReplyTo");
	return params;
};

Echo.Submit.prototype.getContentUpdate = function(content) {
	if (this.config.get("data.object.content", "") == content) {
		return [];
	}
	return [{
		"verb": "update",
		"field": "content",
		"value": content,
		"target": this.config.get("data.object.id")
	}];
};

Echo.Submit.prototype.getMetaDataUpdates = function(verb, type, data) {
	var self = this;
	var extract = function(value) {
		return $.map(value || [], function(item) { return $.trim(item); });
	};
	var items = {
		"modified": extract(data.split(",")),
		"current": extract(this.config.get("data.object." + type, ""))
	};
	var updates = [];
	var diff = function(a, b, verb) {
		$.map(a, function(item) {
			if (item && $.inArray(item, b) == -1) {
				var update = {
					"verb": verb,
					"target": self.config.get("data.object.id")
				};
				update[type] = item
				updates.push(update);
			}
		});
	};
	diff(items.current, items.modified, "un" + verb);
	diff(items.modified, items.current, verb);
	return updates;
};

Echo.Submit.prototype.switchMode = function(mode) {
	if (!mode) {
		mode = (this.config.get("mode") == "standard" ? "compact" : "standard");
	}
	if (this.config.get("mode") != mode) {
		this.config.set("mode", mode);
		this.rerender();
		var topic = "Submit.on" + (mode == "compact" ? "Collapse" : "Expand");
		this.publish(topic, this.prepareBroadcastParams());
	}
};

Echo.Submit.prototype.refresh = function() {
	this.rerender(["container", "header", "markersContainer", "tagsContainer", "postButton"]);
	this.publish("Submit.onRerender", this.prepareBroadcastParams());
};

Echo.Submit.prototype.listenEvents = function() {
	var self = this;
	this.subscribe("internal.User.onInvalidate", function() {
		self.refresh();
	});
	if (this.initialMode == "compact") {
		Echo.Broadcast.subscribe("document.onclick", function() {
			if (self.dom && self.dom.get("text").val()) return;
			self.switchMode("compact");
		});
		if (!Echo.Vars.onClickRegistered) {
			$(document).click(function() {
				Echo.Broadcast.publish("document.onclick");
			});
			Echo.Vars.onClickRegistered = true;
		}
	}
};

Echo.Submit.prototype.addCss = function() {
	$.addCss(
		'.echo-submit-header { margin-bottom: 3px; }' +
		'.echo-submit-anonymousUserInfoAvatar { float: left; margin-right: -48px; }' +
		'.echo-submit-anonymousUserInfoAvatar img { width: 48px; height: 48px; }' +
		'.echo-submit-anonymousUserInfoFields { width: 100%; float: left; }' +
		'.echo-submit-anonymousUserInfoFields input { width: 100%; }' +
		'.echo-submit-anonymousUserInfoFieldsWrapper { margin-left: 53px; }' +
		'.echo-submit-anonymousUserInfoNameContainer { margin: 1px 0px 4px 0px; padding: 0px 2px 1px 3px; background-color: #fff; }' +
		'.echo-submit-anonymousUserInfoName { font-size: 14px; font-weight: bold; border: none; }' +
		'.echo-submit-anonymousUserInfoUrlContainer { padding: 0px 2px 1px 3px; background-color: #fff; }' +
		'.echo-submit-anonymousUserInfoUrl { height: 19px; border: none; }' +
		'.echo-submit-author { font-weight: bold; }' +
		'.echo-submit-content { padding: 5px 5px 5px 6px; background-color: #fff; }' +
		'.echo-submit-text-area { width: 100%; height: 102px; padding: 0px; margin: 0px; border: none; resize:none ; }' +
		'.echo-submit-text-input { width: 100%; border: none; }' +
		'.echo-submit-metadata-container { margin-top: 6px; }' +
		'.echo-submit-metadata-label { float: left; width: 50px; margin-right: -50px; text-align: right; line-height: 22px; }' +
		'.echo-submit-metadata-wrapper { float: left; width: 100%; }' +
		'.echo-submit-metadata-subwrapper { margin-left: 55px; padding: 2px 2px 2px 3px; background-color: #fff; }' +
		'.echo-submit-metadata-subwrapper input { width: 100%; border: none; }' +
		'.echo-submit-controls { margin-top: 5px; }' +
		'.echo-submit-post-container { float: right; }' +
		'.echo-submit-border { border: 1px solid #d2d2d2; }' +
		'.echo-submit-mandatory { border: 1px solid red; }' +
		'.echo-submit-queries-view-option { padding-right: 5px; }' +
		'.echo-submit-error { color: #444444; font: 14px Arial; line-height: 150%; padding-left: 85px; background: no-repeat url(//cdn.echoenabled.com/images/info70.png); height: 70px; }'
	, 'submit');

	if ($.browser.msie) {
		$.addCss(
			'.echo-submit-container { zoom: 1; }' +
			'.echo-submit-body { zoom: 1; }' +
			'.echo-submit-header { zoom: 1; }' +
			'.echo-submit-content { zoom: 1; }' +
			'.echo-submit-markersContainer { zoom: 1; }' +
			'.echo-submit-tagsContainer { zoom: 1; }'
		, 'submit-ie');
	}

	if ($.browser.webkit) {
		$.addCss(
			// get rid of extra gray line inside input elements on iOS
			'.echo-submit-container input, .echo-submit-container textarea { background-position: 0px; }' +
			'.echo-submit-text-area { outline: none; }' +
			'.echo-submit-anonymousUserInfoName { outline: none; }' +
			'.echo-submit-anonymousUserInfoUrl { outline: none; }' +
			'.echo-submit-metadata-subwrapper input { outline: none; }'
		, 'submit-webkit');
	}
};
})(jQuery);

