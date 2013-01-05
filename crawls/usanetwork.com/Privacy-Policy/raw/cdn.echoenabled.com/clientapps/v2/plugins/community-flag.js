// vim: set ts=8 sts=8 sw=8 noet:
/*
 * Copyright (c) 2006-2011 Echo <solutions@aboutecho.com>. All rights reserved.
 * You may copy and modify this script as long as the above copyright notice,
 * this condition and the following disclaimer is left intact.
 * This software is provided by the author "AS IS" and no warranties are
 * implied, including fitness for a particular purpose. In no event shall
 * the author be liable for any damages arising in any way out of the use
 * of this software, even if advised of the possibility of such damage.
 * Version: v2.6.31
 */

(function($) {

var plugin = Echo.createPlugin({
	"name": "CommunityFlag",
	"applications": ["Stream"],
	"dependencies": [{
		"application": "UserList",
		"url": "//cdn.echoenabled.com/clientapps/v2/user-list.js"
	}],
	"init": function(plugin, application) {
		// show user list by default
		if (typeof plugin.config.get(application, "showUserList") == "undefined") {
			plugin.config.set(application, "showUserList", true);
		}
		plugin.extendRenderer("Item", "flags", plugin.renderers.Item.users);
		plugin.extendTemplate("Item", plugin.template,
			"insertAsLastChild", "echo-item-data");
		plugin.addItemControl(application, plugin.assembleControl("Flag", application));
		plugin.addItemControl(application, plugin.assembleControl("Unflag", application));
		plugin.addCss(plugin.css);
	}
});

plugin.template = '<div class="echo-item-flags"></div>';

plugin.addLabels({
	"flagged": "Flagged",
	"flaggedThis": " flagged this.",
	"flagControl": "Flag",
	"unflagControl": "Unflag",
	"flagProcessing": "Flagging...",
	"unflagProcessing": "Unflagging..."
});

plugin.assembleControl = function(name, application) {
	var callback = function() {
		var item = this;
		item.controls[plugin.name + "." + name].element
			.empty()
			.append(plugin.label(name.toLowerCase() + "Processing"));
		$.get(plugin.config.get(application, "submissionProxyURL", "", true), {
			"appkey": application.config.get("appkey"),
			"content": $.object2JSON({
				"verb": name.toLowerCase(),
				"target": item.id
			}),
			"target-query": application.config.get("query", ""),
			"sessionID": item.user.get("sessionID", "")
		}, function() {
			var topic = plugin.topic(application, "on" + name + "Complete");
			plugin.publish(application, topic, application.prepareBroadcastParams({
				"item": {
					"data": item.data,
					"target": item.dom.content
				}
			}));
			if (name === "Flag" && !item.config.get("showFlags")) {
				plugin.set(item, "flagged", true);
				item.rerender("controls");
			}
			application.startLiveUpdates(true);
		}, "jsonp");
	};
	return function() {
		var item = this;
		var count = item.data.object.flags.length;
		var action =
			($.map(item.data.object.flags, function(entry) {
				if (item.user.hasIdentity(entry.actor.id)) return entry;
			})).length > 0 ? "Unflag" : "Flag";
		var flagged = name === "Flag" && !item.config.get("showFlags") && plugin.get(item, "flagged");
		var data = {
			"name": name,
			"label": !flagged
				? '<span class="echo-clickable">' + plugin.label(name.toLowerCase() + "Control") + '</span>' +
					(item.user.isAdmin() && count ? " (" + count + ")" : "")
				: plugin.label("flagged"),
			"visible": item.user.logged() && action == name,
			"clickable": !flagged,
			"onetime": true,
			"callback": callback
		};
		if (flagged) {
			data.template = '<span>{Data:label}</span>';
		}
		return data;
	};
};

plugin.renderers = {"Item": {}};

plugin.renderers.Item.users = function(element, dom) {
	var item = this;
	if (!item.data.object.flags.length || !item.user.isAdmin() || !plugin.config.get(item, "showUserList")) {
		element.hide();
		return;
	}
	var flagsPerPage = 5;
	var visibleUsersCount = plugin.get(item, "userList")
		? plugin.get(item, "userList").getVisibleUsersCount()
		: flagsPerPage;
	var config = plugin.assembleConfig(item, {
		"target": element.get(0),
		"data": {
			"itemsPerPage": flagsPerPage,
			"entries": item.data.object.flags
		},
		"initialUsersCount": visibleUsersCount,
		"suffixText": plugin.label("flaggedThis")
	});
	plugin.set(item, "userList", new Echo.UserList(config));
	element.show();
};

plugin.css = '.echo-item-flags { background: url(//cdn.echoenabled.com/images/curation/status/communityflagged.png) no-repeat 0px 4px; padding: 0px 0px 4px 21px; }';

})(jQuery);


