var FS = {}
		, WebFontConfig
		, routeReady
		, taggingReady
		, _gaq = [] //ensure that _gaq is defined early
		, trackingModule = {}
		, siteName;


//Prevents IE from breaking on console entries.
if (!window.console) {
	window.console = {
		log:function(){},
		warn:function(){}
	};
}

WebFontConfig = {
	custom: {
		families: ['Scout', 'ScoutCond', 'Calisto MT W01 Italic', 'CalistoMTW01-BoldItalic'],
		urls:['/wcsstore/CommonFossil/css/shell/fonts.css']
	}
};

routeReady = {
	isResolved: false,
	callback: {},
	done: function(callback, scope) {
		this.callback = callback;
		this.scope = scope;

		if (this.isResolved) {
			this.call();
		}
	},

	resolve: function() {
		/* Holiday Hack - Gift Options should load correct route. */
		var filter = new RegExp(/giftoptionsview/i);
		if (filter.test(location.href)) {
			router = 'reviewBag';
		}
		/* End holiday hack */
		this.isResolved = true;

		if (typeof this.callback === 'function') {
			this.call();
		}
	},

	call: function() {
		this.callback.call(this.scope);
	}
};

taggingReady = {
	isResolved: false,
	callback: {},
	done: function(callback, scope) {
		this.callback = callback;
		this.scope = scope;

		if (this.isResolved) {
			this.call();
		}
	},

	resolve: function() {
		this.isResolved = true;

		if (typeof this.callback === 'function') {
			this.call();
		}
	},

	call: function() {
		this.callback.call(this.scope);
	}
};
var localLanguage = 'en_US'
, country = 'US'
, catModalSrc = 'Summer1_US'
, siteName = country !== 'US' ? 'Fossil'+country : 'Fossil';
