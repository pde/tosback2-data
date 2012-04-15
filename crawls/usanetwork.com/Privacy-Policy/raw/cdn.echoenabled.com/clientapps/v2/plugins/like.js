// vim: set ts=8 sts=8 sw=8 noet:
/*
 * Copyright (c) 2006-2011 Echo <solutions@aboutecho.com>. All rights reserved.
 * You may copy and modify this script as long as the above copyright notice,
 * this condition and the following disclaimer is left intact.
 * This software is provided by the author "AS IS" and no warranties are
 * implied, including fitness for a particular purpose. In no event shall
 * the author be liable for any damages arising in any way out of the use
 * of this software, even if advised of the possibility of such damage.
 * $Id: like.js 38007 2012-04-05 07:29:56Z jskit $
 */

(function($) {

var plugin = Echo.createPlugin({
	"name": "Like",
	"applications": ["Stream", "UserList"],
	"dependencies": [{
		"application": "UserList",
		"url": "//cdn.echoenabled.com/clientapps/v2/user-list.js"
	}],
	"init": function(plugin, application) {
		if (application instanceof Echo.Stream) {
			plugin.extendRenderer("Item", "likes", plugin.renderers.Item.likes);
			plugin.extendTemplate("Item", plugin.templates.likeList,
				"insertAsLastChild", "echo-item-data");
			plugin.addItemControl(application, plugin.assembleControl("Like", application));
			plugin.addItemControl(application, plugin.assembleControl("Unlike", application));
			plugin.subscribe(application, plugin.topic("internal.Item", "onUnlike"), function(topic, data) {
				plugin.sendRequest(application, {
					"verb": "unlike",
					"target": data.item.object.id,
					"author": data.actor.id
				}, function() {
					application.startLiveUpdates(true);
				});
			});
		} else if (application instanceof Echo.UserList) {
			plugin.extendRenderer("UserList", "container",
				plugin.renderers.UserList.container);
			plugin.extendRenderer("UserListItem", "adminUnlike",
				plugin.renderers.UserListItem.adminUnlike);
			plugin.extendTemplate("UserListItem", plugin.templates.adminUnlike,
				"insertAsLastChild", "echo-user-list-item-container");
		}
		plugin.addCss(plugin.css);
	}
});

plugin.addLabels({
	"likeThis": " like this.",
	"likesThis": " likes this.",
	"likeControl": "Like",
	"unlikeControl": "Unlike",
	"unlikeOnBehalf": "Unlike on behalf of this user",
	"likeProcessing": "Liking...",
	"unlikeProcessing": "Unliking..."
});

plugin.templates = {
	"likeList": '<div class="echo-item-likes"></div>',
	"adminUnlike": '<img class="echo-user-list-item-adminUnlike" src="//cdn.echoenabled.com/images/container/closeWindow.png" title="' + plugin.label("unlikeOnBehalf") + '" width="10" height="9">'
};

plugin.sendRequest = function(application, data, callback) {
	$.get(plugin.config.get(application, "submissionProxyURL", "", true), {
		"appkey": application.config.get("appkey"),
		"content": $.object2JSON(data),
		"target-query": application.config.get("query", ""),
		"sessionID": application.user.get("sessionID", "")
	}, callback, "jsonp");
};

plugin.assembleControl = function(name, application) {
	var callback = function() {
		var item = this;
		item.controls[plugin.name + "." + name].element
			.empty()
			.append(plugin.label(name.toLowerCase() + "Processing"));
		plugin.sendRequest(application, {
			"verb": name.toLowerCase(),
			"target": item.id
		}, function() {
			var topic = plugin.topic(application, "on" + name + "Complete");
			plugin.publish(application, topic, application.prepareBroadcastParams({
				"item": {
					"data": item.data,
					"target": item.dom.content
				}
			}));
			application.startLiveUpdates(true);
		});
	};
	return function() {
		var item = this;
		var action =
			($.map(item.data.object.likes, function(entry) {
				if (item.user.hasIdentity(entry.actor.id)) return entry;
			})).length > 0 ? "Unlike" : "Like";
		return {
			"name": name,
			"label": plugin.label(name.toLowerCase() + "Control"),
			"visible": item.user.logged() && action == name,
			"onetime": true,
			"callback": callback
		};
	};
};

plugin.renderers = {"Item": {}, "UserList": {}, "UserListItem": {}};

plugin.renderers.Item.likes = function(element) {
	var item = this;
	if (!item.data.object.likes.length) {
		element.hide();
		return;
	}
	var likesPerPage = 5;
	var visibleUsersCount = plugin.get(item, "userList")
		? plugin.get(item, "userList").getVisibleUsersCount()
		: likesPerPage;
	var youLike = false;
	var userId = item.user.get("id");
	var users = item.data.object.likes;
	$.each(users, function(i, like) {
		if (like.actor.id == userId) {
			youLike = true;
			return false; // break
		}
	});
	var config = plugin.assembleConfig(item, {
		"target": element.get(0),
		"data": {
			"itemsPerPage": likesPerPage,
			"entries": users
		},
		"initialUsersCount": visibleUsersCount,
		"totalUsersCount": item.data.object.accumulators.likesCount,
		"suffixText": plugin.label(users.length > 1 || youLike ? "likeThis" : "likesThis")
	});
	config.plugins.push({"name": "Like"});
	var userList = new Echo.UserList(config);
	plugin.set(item, "userList", userList);
	element.show();
	item.subscribe(plugin.topic("internal.UserListItem", "onUnlike"), function(topic, data) {
		if (data.target != element.get(0)) return;
		item.publish(plugin.topic("internal.Item", "onUnlike"), {
			"actor": data.actor,
			"item": item.data
		});
	});
};

plugin.renderers.UserList.container = function(element) {
	var item = this;
	item.parentRenderer("container", arguments);
	if (!item.user.isAdmin()) return;
	element.addClass("echo-user-list-highlight");
};

plugin.renderers.UserListItem.adminUnlike = function(element) {
	var item = this;
	if (!item.user.isAdmin()) {
		element.remove();
		return;
	}
	element.one("click", function() {
		item.dom.get("container").css("opacity", 0.3);
		plugin.publish(item, plugin.topic("internal.UserListItem", "onUnlike"), {
			"actor": item.data,
			"target": item.config.get("target").get(0)
		});
	});
};

plugin.css = '.echo-item-likes { background: url(//cdn.echoenabled.com/images/likes.png) no-repeat 0px 4px; padding: 0px 0px 4px 21px; }' +
	'.echo-item-likes .echo-user-list-highlight { line-height: 23px; }' +
	'.echo-item-likes .echo-user-list-highlight .echo-user-list-item-container { display: inline-block; line-height: 16px; background-color: #EEEEEE; padding: 1px 3px; border: 1px solid #D2D2D2; border-radius: 5px; -moz-border-radius: 5px; -webkit-border-radius: 5px; margin: 0px 2px; }' +
	'.echo-item-likes .echo-user-list-highlight .echo-user-list-delimiter { display: none; }' +
	'.echo-item-likes .echo-user-list-item-adminUnlike { cursor: pointer; margin-left: 3px; }' +
	($.browser.msie ?
		'.echo-item-likes .echo-user-list-highlight span { vertical-align: middle; }' +
		'.echo-item-likes { background-position: 0px 2px; }'
		: ''
	);

})(jQuery);


