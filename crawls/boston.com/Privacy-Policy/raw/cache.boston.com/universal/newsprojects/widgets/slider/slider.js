var SliderModel = Backbone.Model.extend({

	defaults: {
		index: 0,
		current: null,
		interval: 6000 
	}
	
});

var SliderApp = Backbone.View.extend({
	
	options: {
		autoplay: true,
		resize_photos: true,
		interval: 6000,
		source: "json"
	},
	
	template: {
		gallery: '<div class="slider-wrapper" style="width: <%= options.photo_width %>px; min-height: <%= options.height %>px; "> <a id="slider-headline-link" class="slider-headline-link" href="javascript:void(0)"> <div class="slider-photos" style="height: <%= options.photo_height %>px;"> <% _.each(collection, function(item) { %> <img class="slider-photo" src="<%= item.image_url %>" <% if (options.resize_photos) { %> style="max-width: <%= options.photo_width %>; max-height: <%= options.photo_height %>" <% } %> /> <% }); %> <div class="slider-headline-container"> <div class="slider-headline"></div> </div> </div> </a> <div class="slider-navigation"> <% if (options.autoplay) { %> <div class="slider-timer-container"> <div class="slider-timer-bar-background"> <div class="slider-timer-bar"></div> </div> <div class="slider-button slider-play"></div> </div> <% } %> <div class="slider-button slider-back"></div> <div class="slider-button slider-next"></div> <% _.each(collection, function(item, index) { %> <div class="slider-number" data-order="<%= index %>"><%= index + 1 %></div> <% }); %> <div class="slider-highlight"></div> </div> <div id="slider-caption-box" class="slider-caption-box"></div> </div>',
		image_caption: '<div class="slider-caption"><% if (image_caption) { %><%= image_caption %><% } %> <% if (image_credit) { %><span class="slider-credit"><%= image_credit %></span><% } %></div>'
	},
	
	initialize: function(settings) {
		
		// Must create separate model for each view
		if (!this.model) this.model = new SliderModel();
		
		// If we wrote the HTML, parse the data
		if (this.options.source == "html") {
			var collection = this.collection = [];
			this.el.find(".slider-photo-container").each(function() {
				var el = $(this);
				var item = {
					url: el.find(".slider-headline-link").attr("href"),
					title: el.find(".slider-headline").text(),
					image_url: el.find(".slider-photo").attr("src"),
					image_caption: el.find(".slider-caption-content").text(),
					image_credit: el.find(".slider-credit").text()
				};
				collection.push(item);
			});
		}
		
		if (this.options.height == 322) this.options.height = 300;
		
		// Create template from options + collection of items
		var html = _.template(this.template.gallery, this);
		$(this.el).html(html);
		
		// Set autoplay
		this.model.set({ autoplay: this.options.autoplay, interval: this.options.interval }, { silent: true });
		
		// Bind scope of events to "this" object
		_.bindAll(this, "render", "button", "item", "photo", "highlight", "moveHighlight", "next", "back", "to", "showPhoto", "changeHeadline", "showHeadline", "changeCaption", "changeLink", "start", "stop", "toggleAutoplay", "animateAutoplay", "autonext");
		this.model.bind("change", this.render);
		
		// Binding events manually because of jQuery 1.3.2, instead of using events hash
		this.$(".slider-number").click(this.to);
		this.$(".slider-next").click(this.next);
		this.$(".slider-back").click(this.back);
		this.$(".slider-number, .slider-next, .slider-back").click(this.stop);
		this.$(".slider-play").click(this.toggleAutoplay);
		
		// Attach the photo elements to the collection
		_.each(this.$(".slider-photo"), function(element, index) {
			this.collection[index].element = $(element);
		}, this);
		
		if (this.options.hide_controls) this.$(".slider-navigation").hide();
		if (this.options.hide_caption) this.$("#slider-caption-box").hide();
				
		// Set up CSS + initial display
		this.moveHighlight({ animate: false });
		this.render();
		if (this.options.autoplay) this.start();
		
		return this;
	},
	
	render: function() {
		
		// Set CSS for slider numbers
		this.$(".slider-number").removeClass("active");
		this.button(this.model.get("index")).addClass("active");
		
		// Highlight the active number
		this.moveHighlight();
		
		// Handle autoplay-related UI and animation	
		if (this.model.get("autoplay")) {
			this.$(".slider-play").addClass("pause");
			this.animateAutoplay();
		} else {
			this.$(".slider-play").removeClass("pause");
			this.$(".slider-timer-bar").stop().width(0);
		}
		
		// If the photo has changed, animate the change
		if (this.model.get("current") != this.model.get("index")) { 
			this.photo(this.model.get("current")).fadeOut();
			this.changeHeadline();
			this.changeCaption();
			this.changeLink();
		}
					
		setTimeout(this.showPhoto, 250);
		this.model.set({ current: this.model.get("index") }, { silent: true });
	},
	
	// Get button
	button: function(index) {
		return this.$(".slider-number:eq(" + index +")");
	},
	
	// Get item data
	item: function(index) {
		if (!index) index = 0;
		return this.collection[index];
	},
	
	// Get photo element
	photo: function(index) {
		if (!index) index = 0;
		return this.collection[index].element;
	},
	
	// Get highlight div
	highlight: function() {
		return this.$(".slider-highlight");
	},
	
	// Move highlight div to current button
	moveHighlight: function(options) {
		var defaults = {
			animate: true
		};
		defaults = _.extend(defaults, options);
		var position = { left: this.model.get("index") * 22 + 43 };
		if (defaults.animate) this.highlight().animate(position, 150);
		else this.highlight().css(position);
	},
	
	// Show next photo
	next: function() {
		var index = Number(this.model.get("index")) + 1;
		if (index > (this.collection.length - 1)) { index = 0; }
		this.model.set({ index: index });
	},
	
	// Show previous photo
	back: function() {
		var index = this.model.get("index") - 1;
		if (index < 0) index = this.collection.length - 1;
		this.model.set({ index: index });
	},
	
	// Go to photo
	to: function(event) {
		this.model.set({ index: $(event.currentTarget).attr("data-order") });
	},
	
	// Fade in next photo
	showPhoto: function() {
		this.photo(this.model.get("index")).fadeIn();
	},
	
	// Start changing headline by moving it down
	changeHeadline: function() {
		var height = this.$(".slider-headline-container").height();
		this.$(".slider-headline-container").animate({ bottom: -height }, { 
			complete: this.showHeadline
		});
	},
	
	// Finishing changing headline by moving it back up and changing text
	showHeadline: function() {
		var item = this.item(this.model.get("index"));
		if (item.title) {
			this.$(".slider-headline-container .slider-headline").html(item.title); 
			this.$(".slider-headline-container").animate({ bottom: 0 });
		}
	},
	
	changeCaption: function() {
		var item = this.item(this.model.get("index"));
		var html = "";
		if (item.image_caption || item.image_credit) { 
			if (!item.image_caption) item.image_caption = "";
			if (!item.image_credit) item.image_credit = "";
			html = _.template(this.template.image_caption, item);
		}
		this.$("#slider-caption-box").html(html);
	},
	
	changeLink: function() {
		var item = this.item(this.model.get("index"));
		var href = item.url || "";
		this.$("#slider-headline-link").attr("href", href);
	},
	
	// Start autoplaying
	start: function() {
		this.model.set({ autoplay: true });
	},
	
	// Stop autoplaying
	stop: function() {
		this.model.set({ autoplay: false });
	},
	
	// Toggle autoplaying
	toggleAutoplay: function() {
		if (this.model.get("autoplay")) this.stop();
		else this.start();
	},
	
	// Animate timer bar for autoplay
	animateAutoplay: function() {
		var result = this.$(".slider-timer-bar").width(0).animate({ width: "30" }, { duration: this.model.get("interval"), complete: this.autonext });
	},
	
	// Show next photo, IF autoplay is still on
	autonext: function() {
		if (!this.model.get("autoplay")) return false;
		this.next();
	}
	
});