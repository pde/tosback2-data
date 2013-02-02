// vim: set ts=8 sts=8 sw=8 noet:
/*
 * Copyright (c) 2006-2011 Echo <solutions@aboutecho.com>. All rights reserved.
 * You may copy and modify this script as long as the above copyright notice,
 * this condition and the following disclaimer is left intact.
 * This software is provided by the author "AS IS" and no warranties are
 * implied, including fitness for a particular purpose. In no event shall
 * the author be liable for any damages arising in any way out of the use
 * of this software, even if advised of the possibility of such damage.
 * Version: v2.6.33
 */

(function($) {

var plugin = Echo.createPlugin({
	"name": "FormAuth",
	"applications": ["Submit"],
	"dependencies": [{
		"application": "Auth",
		"url": "//cdn.echoenabled.com/clientapps/v2/auth.js"
	}],
	"init": function(plugin, application) {
		plugin.extendTemplate("Submit", "<div class=\"echo-submit-auth\"></div>",
			"insertBefore", "echo-submit-header");
		plugin.extendRenderer("Submit", "auth", plugin.renderers.Submit.auth);
		plugin.extendRenderer("Submit", "header", plugin.renderers.Submit.header);
		plugin.extendRenderer("Submit", "container", plugin.renderers.Submit.container);
		plugin.extendRenderer("Submit", "postButton", plugin.renderers.Submit.postButton);
		plugin.extendRenderer("Submit", "forcedLoginUserInfo",
			plugin.renderers.Submit.forcedLoginUserInfo);
		plugin.addCss(plugin.css);
	}
});

plugin.css = '.echo-submit-forcedLoginUserInfoMessage { font-size: 14px; font-weight: bold; }';

plugin.addLabels({
	"youMustBeLoggedIn": "You must be logged in to comment"
});

plugin.renderers = {"Submit": {}};

plugin.renderers.Submit.auth = function(element, dom) {
	var application = this;
	if (!application.user.get("sessionID") || application.config.get("mode") == "edit") return;
	var identityManager = $.foldl({}, ["Edit", "Login", "Signup"], function(name, acc) {
		acc[name.toLowerCase()] = plugin.config.get(application, "identityManager" + name);
	});
	new Echo.Auth(plugin.assembleConfig(application, {
		"target": element,
		"identityManager": identityManager
	}));
};

plugin.renderers.Submit.container = function(element, dom) {
	var application = this;
	application.parentRenderer("container", arguments);
	element.removeClass("echo-submit-logged echo-submit-anonymous echo-submit-forcedLogin");
	element.addClass("echo-submit-" + plugin.getStatus(application));
};

plugin.renderers.Submit.header = function(element, dom) {
	var application = this;
	var status = plugin.getStatus(application);
	if (status == "forcedLogin") {
		return application.render("forcedLoginUserInfo", element, dom);
	}
	if (status == "logged") {
		element.empty();
		return;
	}
	return application.parentRenderer("header", arguments);
};

plugin.renderers.Submit.postButton = function(element, dom) {
	var application = this;
	var handler = plugin.get(application, "postButtonHandler");
	if (!handler) {
		handler = function(ev) {
			if (application.user.logged()) {
				ev.stopImmediatePropagation();
				if (!application.highlightMandatory(application.dom.get("text"))) {
					application.post();
				}
			} else if (application.config.get("mode") != "edit"
					&& plugin.getPermissions(application) == "forceLogin") {
				ev.stopImmediatePropagation();
				application.dom.get("forcedLoginUserInfoMessage").css({"color": "red"});
			}
		};
		plugin.set(application, "postButtonHandler", handler);
	}
	element.unbind("click", handler).bind("click", handler);
	application.parentRenderer("postButton", arguments);
};

plugin.renderers.Submit.forcedLoginUserInfo = function(element, dom) {
	var prefix = "echo-submit-forcedLoginUserInfo";
	var template = 
		'<div class="echo-submit-userInfoWrapper echo-primaryFont">' +
			'<span class="{Data:prefix}Message echo-secondaryColor">' +
				'{Data:label}' +
			'</span>' +
		'</div>';
	var descriptors = {
		"Message": function(element){
			dom.set("forcedLoginUserInfoMessage", element);
		}
	};
	var template = this.substitute(template, {
		"prefix": prefix,
		"label": plugin.label("youMustBeLoggedIn")
	});
	return $.toDOM(template, prefix, descriptors).content;
};

plugin.getPermissions = function(application) {
	return plugin.config.get(application, "submitPermissions", "allowGuest");
};

plugin.getStatus = function(application) {
	if (application.user.logged()) {
		return "logged";
	}
	if (plugin.getPermissions(application) == "forceLogin") {
		return "forcedLogin";
	}
	return "anonymous";
};

})(jQuery);

