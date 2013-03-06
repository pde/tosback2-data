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

window.Backplane = window.Backplane || {
	"channelByBus": {},
	"config": {},
	"initialized": false,
	"subscribers": {},
	"awaiting": {
		"since": 0,
		"until": 0,
		"queue": []
	},
	"intervals": {
		"min": 1,
		"frequent": 5,
		"regular": 60,
		"slowdown": 120
	}
};

/**
 * Initializes the backplane library
 * 
 * @param {Object} config - Hash with configuration parameters.
 *   Possible hash keys:
 *     serverBaseURL (required) - Base URL of Backplane Server
 *     busName (required) - Customer's backplane bus name
 *     channelName (optional) - Custom specified channel name
 */
Backplane.init = function(config) {
	config = config || {};
	if (this.initialized || !config.serverBaseURL || !config.busName) return false;
	this.initialized = true;
	this.timers = {};
	this.config = config;
	this.channelByBus = this.getCookieChannels();
	// save custom channel name, if passed.
	this.config.customChannelName = config.channelName;
	this.config.channelName = this.getChannelName();
	this.config.serverBaseURL = this.normalizeURL(config.serverBaseURL);
	this.config.channelID = this.generateChannelID();
	this.request();
	return true;
};

/**
 * Subscribes to messages from Backplane server
 *
 * @param {Function} Callback - Callback function which accepts backplane messages
 * @returns Subscription ID which can be used later for unsubscribing
 */
Backplane.subscribe = function(callback) {
	if (!this.initialized) return false;
	var id = (new Date()).valueOf() + Math.random();
	this.subscribers[id] = callback;
	return id;
};

/**
 * Removes specified subscription
 *
 * @param {Integer} Subscription ID
 */
Backplane.unsubscribe = function(subscriptionID) {
	if (!this.initialized || !subscriptionID) return false;
	delete this.subscribers[subscriptionID];
};

/**
 * Returns channel ID (like http://backplane.customer.com/v1/bus/customer.com/channel/8ec92f459fa70b0da1a40e8fe70a0bc8)
 *
 * @returns Backplane channel ID
 */
Backplane.getChannelID = function() {
	if (!this.initialized) return false;
	return this.config.channelID;
};

/**
 * Notifies backplane library about the fact that subscribers are going
 * to receive backplane messages of any of the specified types
 * 
 * @param {Array} List of expected backplane message types
 */
Backplane.expectMessages = function(types) {
	this.expectMessagesWithin(60, types);
};
	
/**
 * Notifies backplane library about the fact that subscribers are going
 * to receive backplane messages within specified time interval.
 * 
 * @param {Integer} TimeInterval Time interval in seconds
 */
Backplane.expectMessagesWithin = function(interval, types) {
	if (!this.initialized || !interval) return false;
	this.awaiting.since = this.getTS();
	this.awaiting.interval = interval;
	// we should wait entire interval if no types were specified
	this.awaiting.nonstop = !types;
	if (types) {
		types = typeof types == "string" ? [types] : types;
		this.awaiting.queue.push(types);
	}
	var until = this.awaiting.since + interval;
	if (until > this.awaiting.until) {
		this.awaiting.until = until;
	}
	this.request();
};

/**
 * Internal functions
 */
Backplane.generateChannelID = function() {
	return this.config.serverBaseURL + "/bus/" + this.config.busName + "/channel/" + this.config.channelName;
};

Backplane.getChannelName = function() {
	if (!this.initialized) return false;
	if (this.config.customChannelName) return this.config.customChannelName;
	if (!this.channelByBus[this.config.busName]) {
		this.channelByBus[this.config.busName] = (new Date()).valueOf().toString() + Math.random().toString().substr(2, 5);
		this.setCookieChannels();
	}
	return this.channelByBus[this.config.busName];
};

Backplane.getTS = function() {
	return Math.round((new Date()).valueOf() / 1000);
};

Backplane.getCookieChannels = function() {
	var match = (document.cookie || "").match(/backplane-channel=(.*?)(?:$|;)/);
	if (!match || !match[1]) return {};
	var channelByBus = {};
	var parts = match[1].split("|");
	for (var i = 0; i < parts.length; i++) {
		var m = parts[i].split(":");
		channelByBus[decodeURIComponent(m[0])] = decodeURIComponent(m[1]);
	}
	return channelByBus;
};

Backplane.setCookieChannels = function() {
	var parts = [];
	for (var i in this.channelByBus) {
		if (this.channelByBus.hasOwnProperty(i)) {
			parts.push(encodeURIComponent(i) + ":" + encodeURIComponent(this.channelByBus[i]));
		}
	}
	var d = new Date();
	d.setFullYear(d.getFullYear() + 5);
	document.cookie = "backplane-channel=" + parts.join("|") + ";expires=" + d.toGMTString() + ";path=/";
};

Backplane.resetCookieChannel = function() {
	delete this.channelByBus[this.config.busName];
	this.setCookieChannels();
	this.config.channelName = this.getChannelName();
	this.config.channelID = this.generateChannelID();
};

Backplane.normalizeURL = function(rawURL) {
	return rawURL.replace(/^\s*(https?:\/\/)?(.*?)[\s\/]*$/, function(match, proto, uri){
		return (proto || window.location.protocol + "//") + uri;
	});
};

Backplane.calcTimeout = function() {
	var timeout, ts = this.getTS();
	if (ts < this.awaiting.until) {
		// stop frequent polling as soon as all the necessary messages received
		if (!this.awaiting.nonstop && !this.awaiting.queue.length) {
			this.awaiting.until = ts;
			return this.calcTimeout();
		}
		var relative = ts - this.awaiting.since;
		var limit = this.intervals.frequent - this.intervals.min;
		// we should reach this.intervals.frequent at the end
		timeout = this.intervals.min +
			Math.round(limit * relative / this.awaiting.interval);
	} else if (ts < this.awaiting.until + this.intervals.slowdown) {
		var relative = ts - this.awaiting.until;
		var limit = this.intervals.regular - this.intervals.frequent;
		// we should reach this.intervals.regular at the end
		timeout = this.intervals.frequent +
			Math.round(limit * relative / this.intervals.slowdown);
	} else {
		timeout = typeof this.since == "undefined" ? 0 : this.intervals.regular;
		this.awaiting.nonstop = false;
	}
	return timeout * 1000;
};

Backplane.request = function() {
	var self = this;
	if (!this.initialized) return false;
	this.stopTimer("regular");
	this.stopTimer("watchdog");
	this.timers.regular = setTimeout(function() {
		// if no response in the reasonable time just restart request
		self.timers.watchdog = setTimeout(function() {
			self.request();
		}, 5000);
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.charset = "utf-8";
		script.src = self.config.channelID + "?callback=Backplane.response" +
				(self.since ? "&since=" + encodeURIComponent(self.since) : "") +
				"&rnd=" + Math.random();
		var container = document.getElementsByTagName("head")[0] || document.documentElement;
		container.insertBefore(script, container.firstChild);
		script.onload = script.onreadystatechange = function() {
			var state = script.readyState;
			if (!state || state === "loaded" || state === "complete") {
				script.onload = script.onreadystatechange = null;
				if (script.parentNode) {
					script.parentNode.removeChild(script);
				}
			}
		};
	}, this.calcTimeout());
};

Backplane.response = function(messages) {
	var self = this;
	this.stopTimer("watchdog");
	messages = messages || [];
	var since = messages.length ? messages[messages.length - 1].id : this.since;
	if (typeof this.since == "undefined") {
		// ignore messages frame came on initial request,
		// since we are using it only to receive id of the last message
		messages = [];
	}
	this.since = since || "";
	for (var i = 0; i < messages.length; i++) {
		// notify subscribers
		for (var j in this.subscribers) {
			if (this.subscribers.hasOwnProperty(j)) {
				this.subscribers[j](messages[i].message);
			}
		}
		// clean up awaiting specific events queue
		var queue = [];
		for (var k = 0; k < this.awaiting.queue.length; k++) {
			var satisfied = false;
			for (var l = 0; l < this.awaiting.queue[k].length; l++) {
				if (this.awaiting.queue[k][l] == messages[i].message.type) {
					satisfied = true;
				}
			}
			if (!satisfied) queue.push(this.awaiting.queue[k]);
		}
		this.awaiting.queue = queue;
	}
	this.request();
};

Backplane.stopTimer = function(name) {
	var timer = this.timers[name];
	if (timer) clearTimeout(timer);
};

