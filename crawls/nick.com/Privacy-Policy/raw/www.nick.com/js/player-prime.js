if(typeof NICK == "undefined" || !NICK) var NICK = {};
KIDS.namespace("prime", NICK);

NICK.prime.players = [];

/**
 * Player Embed Object.
 * @author <a href="mailto:andrew.moore@viacomcontractor.com">Andrew Moore</a>
 * @class
 * @memberOf NICK.prime
 * @param {object} _config Configuration overrides.
 */
NICK.prime.Player = function (_config) {

	this.defaults = {
		'playerName': 'cp_video_player',
		'autoload': true,
		'width': 256,
		'height': 192,
		'uri': '',
		'pauseOnStart': false,
		'deeplink': '',
		'showEndSlate': false,
		'playlist': false,
		'flashVars': {
			'autoPlay': false,
			'sid': ''
		},
		'params': {
			'wmode': 'opaque',
			'allowScriptAccess': 'always',
			'allowFullScreen': true
		},
		'events':{
			'onMediaEnd': this.playerEvent(),
			'onMediaStart': this.playerEvent(),
			'onMetadata': this.playerEvent(),
			'onPlayheadUpdate': this.playerEvent(),
			'onPlaylistComplete': this.playerEvent(),
			'onReady': this.playerEvent(),
			'onStateChange': this.playerEvent(),
			'onUIStateChange': this.playerEvent()
		},
		'templateURL': 'http://media.mtvnservices.com/{uri}'
	};

	// Merge the two objects recursively without changing the defaults.
	// jQuery.extend( [recursive], target, object1, object2)
	this.config = $.extend(true, {}, this.defaults, _config);

	this.playerName = this.config.playerName;

	this.load();
};

/**
 * Create the player object and embed it in the page.
 */
NICK.prime.Player.prototype.load = function () {
	this.playerObject = new MTVNPlayer.Player(this.config.playerName, this.config, this.config.events);

	// local scope.
	var player = this.playerObject;
	var playerConfig = this.config;

	// Call the imx play reporting function when playback starts.
	if (typeof NICK.imx !== 'undefined' && typeof NICK.imx.callIMXPlay !== 'undefined') {
		this.playerObject.once('onMediaStart', function () {

			var id = playerConfig.uri;
			id = id.substring(playerConfig.uri.lastIndexOf(':') + 1, id.length);

			NICK.imx.callIMXPlay(id, 'video' );
			
		});
	}
		
	// Allow for deeplinking to an item in a playlist.
	if (this.config.deeplink !== '') {

		this.playerObject.once('onReady', function () {
			player.playIndex(this.getItemIndex(this.config.deeplink));
		});

	}

	// In place to handle autoplay issues with playlist.
	if (this.config.pauseOnStart === true) {
		
		this.playerObject.once('onMediaStart', function () {
			player.pause();
		});
	}

	// Display a replay end slate when the playlist is complete.
	if (this.config.showEndSlate === true || this.config.showEndSlate === 'true') {
		
		var endSlate = $('#video-player-endslate');
		endSlate.css('width', this.playerObject.width);
		endSlate.css('height', this.playerObject.height);
		endSlate.css('display', 'none');
		endSlate.css('position', 'absolute');
		endSlate.css('cursor', 'pointer');
		endSlate.css('background', 'url(/assets/large-marge/replay_endslate.png) no-repeat center center #FF0000');
		endSlate.css('z-index', 2);

		this.playerObject.bind('onPlaylistComplete', function () {
			// display the end slate here.
			endSlate.show();
		});

		endSlate.bind('click', this.playerObject, function (event) {
			endSlate.hide();
			event.data.playIndex(0, 0);
		});

	}

	// Determine if we should initialize the playlist object.
	if (this.config.playlist === true || this.config.playlist === 'true') {
		if (typeof NICK.playlistManager !== 'undefined' && typeof NICK.playlistManager.init !== 'undefined') {
			//init the playlist object.
			NICK.playlistManager.init(this);
		}
	}

	// Add this player to an array of players on the page.
	NICK.prime.players.push(this);

};

/**
 * Act as an Intermediary for the player events and trigger them on the current object for better scoping.
 * @private
 * @return {Function} A function to retrigger the events scopped to the current object.
 */
NICK.prime.Player.prototype.playerEvent = function () {

	// Seems like overkill, but if event names change in the future we can adjust that here.

	var controller = $(this);

	/**
	* Function to catch player event.
	* @param  {object} event Event object passed from the player event.
	*/
	return function (event) {
		//console.log(event.type);
		controller.trigger(event.type, event);
	};
};

/**
 * Play the current video, or resume from pause.
 */
NICK.prime.Player.prototype.play = function () {
	this.playerObject.play();
};

/**
 * Resume play from the beginning of the video.
 */
NICK.prime.Player.prototype.playFromStart = function () {
	this.playerObject.seek(0);
	this.play();
};

/**
 * Play the video at the supplied index.
 * @param  {Number} index Index of the video item to play.
 * @param  {Number} time Starting time in the clip, used for deep linking to certain points in a video.
 */
NICK.prime.Player.prototype.playIndex = function (index, time) {

	// Make sure the time is defined, and a number.
	time = typeof time === undefined || typeof time !== 'Number' ? 0 : time;

	if (index < (this.playerObject.playlistMetadata.length - 1) || index >= 0) {
		this.playerObject.playIndex(index, time);
	}

};

/**
 * Play a specified uri
 * @param  {string} uri  URI of the video to play.
 */
NICK.prime.Player.prototype.playUri = function (uri) {
	if (typeof uri !== undefined && uri !== '') {
		this.playerObject.playURI(uri);
	}
};

/**
 * Unmute the player.
 * @param {Number} volume Volume level to set the player to after unmuting.
 */
NICK.prime.Player.prototype.unmute = function (volume) {

	this.playerObject.unmute();

	if (typeof volume !== 'undefined') {

		// Make sure its a number.
		if (isNaN(volume) !== false) {
			this.playerObject.setVolume(parseInt(volume, 10));
		}
	}

};

/**
 * Pause the current playing video.
 */
NICK.prime.Player.prototype.pause = function () {
	this.playerObject.pause();
};

/**
 * Replay the video.
 */
NICK.prime.Player.prototype.replay = function () {
	this.playerObject.playIndex(0);
};

/**
 * Skip to the next video in the playlist.
 */
NICK.prime.Player.prototype.next = function () {
	if (this.isContent() === true) {
		if (this.index() === this.playerObject.playlistMetadata.items.length - 1) {
			this.playIndex(0);
		} else {
			this.playIndex(this.index() + 1);
		}
	}
};

/**
 * Skip to the previous video in the playlist.
 */
NICK.prime.Player.prototype.prev = function () {
	if (this.isContent() === true) {
		if (this.index() === 0) {
			this.playIndex(this.playerObject.playlistMetadata.items.length - 1);
		} else {
			this.playIndex(this.index() - 1);
		}
	}
};

/**
 * Return true if its not an ad or a bumper playing.
 * @return {Boolean} True if it is not an ad or a bumper playing.
 */
NICK.prime.Player.prototype.isContent = function () {
	return this.metaData().isAd === false && this.metaData().isBumper === false ? true : false;
};

/**
 * Return true a video is currently playing or trying to play.
 * @return {Boolean} True if the player is playing a video, this includes ads and bumpers.
 */
NICK.prime.Player.prototype.isPlaying = function () {
	var result = false;

	if (this.playerObject.state !== null) {
		if (this.playerObject.state.indexOf('stopped') === -1 && this.playerObject.state.indexOf('paused') === -1) {
			result = true;
		}
	}

	return result;
};

/**
 * Get the current state the player is in.
 * @return {string} The current state.
 */
NICK.prime.Player.prototype.getState = function () {
	return this.playerObject.state;
};

/**
 * Return the metadata for the current playing item.
 * @return {object} Metadata for the current playing item.
 */
NICK.prime.Player.prototype.metaData = function () {
	return this.playerObject.currentMetadata;
};

/**
 * Return the rss info for the current video.
 * @return {Object} rss information for current video.
 */
NICK.prime.Player.prototype.info = function () {
	return this.metaData().rss;
};

/**
 * Return true if the player is ready to accept commands.
 * @return {Boolean} True if the player is ready.
 */
NICK.prime.Player.prototype.isReady = function () {
	return this.playerObject.ready;
};

/**
 * Return the index of the current video if its in a playlist.
 * @return {Number} Index in the playlist.
 */
NICK.prime.Player.prototype.index = function () {
	for (var i=0; i<this.playerObject.playlistMetadata.items.length; i++) {
		if (this.playerObject.playlistMetadata.items[i].rss.guid === this.playerObject.currentMetadata.rss.guid) {
			return i;
		}
	}
};

/**
 * Get the playlist index of the supplied guid.
 * @param  {string} guid Guid of the item to look for.
 * @return {Number}      Position of the item in the playlist.
 */
NICK.prime.Player.prototype.getItemIndex = function (guid) {

	for (var i=0; i<this.playerObject.playlistMetadata.items.length; i++) {
		if (this.playerObject.playlistMetadata.items[i].rss.guid === guid) {
			return i;
		}
	}

};

/**
 * Get the embed code for the player.
 * @return {string} Embed code for the current player.
 */
NICK.prime.Player.prototype.getEmbedCode = function () {
	return this.playerObject.getEmbedCode();
};

/**
 * Document ready to check for any content that may have the auto-embed-video class attached.
 */
$(document).ready(function () {

	var targets = $('.auto-embed-video');

	// Div's want to be embedded.
	if (targets.size() > 0) {

		// Iterate through the target divs.
		for (var i = 0; i < targets.size(); i++) {

			var currentTarget = targets.get(i);

			var config = {};
			config.flashVars = {};
			config.params = {};

			// Iterate through the attributes.
			for (var a = 0; a < currentTarget.attributes.length; a++) {

				var name = currentTarget.attributes[a].name.replace('data-', '');

				if (name === 'id') {
					// Set the playerName to the id of the div.
					name = 'playerName';
				} else if (name === 'showendslate') {
					// set attribute name to camal case.
					name = 'showEndSlate';
				} else if (name === 'class') {
					// skip the class attribute as its not something we need.
					continue;
				}

				// Handle flashVars and params.
				// .toLowerCase used to combat xbrowser issues with attribute names
				if (name.toLowerCase().indexOf('flashvars') !== -1) {
					
					name = name.toLowerCase().replace('flashvars-', '');
					config.flashVars[name] = currentTarget.attributes[a].value;

				} else if (name.indexOf('params') !== -1) {
					
					name = name.replace('params-', '');
					config.flashVars[name] = currentTarget.attributes[a].value;

				} else {
					
					config[name] = currentTarget.attributes[a].value;

				}

			}

			var player = new NICK.prime.Player(config);

		}

	}

});