argos.api = new (function() {
	var _classes = argos.classes;
	var _helpers = {
		getType : argos.utils.getType
	}

	this.popup = new (function() {
		var _popups = this;
		var _created = new Array();
		
		this.get = function(i) {
			// Return Array of objects created by popups.create.
			return arguments.length > 0 ? _created[i] : _created;
		}
	
		this.close = function(i) {
			// Close open popups created popup.create.
			var popups = _popups.get(i);
			for(var i=0; i<popups.length; i++) {
				popups[i].$node.close();
			}
		}
		
		this.create = function(options) {
			// Create a popup object.
			$(document).ready(function() {
				_created.push(new _classes.Popup(options ? options : {}));
			});
		}		
		
		this.created = function() { return _created; };
	});

	this.hotspot = new (function() {
		var _created = new Array();
		/* 
		  area = Object with optional properties.
		  		e.g. {
					coords : String(e.g. "0,0,82,126"), // 3 = circle, 4 = rect, > 4 = poly || String(x,y,h,w) when idOrSelector does not point to IMG element.
					message : String(e.g. "propertyId" (on argos.message) or "{title:'My title', text: 'This is a new message'}")
				}
		*/
		this.create = function(idOrSelector/*String(element id or jQuery selector)*/, area1/*[, area2, ..., areaN]*/) {
			// Create a hotspot manager for specified hotspots.
			var areas = Array.prototype.slice.call(arguments);
			var target = idOrSelector;
			areas.shift(); // Remove idOrSelector.
	
			$(document).ready(function() {
				_created.push(new argos.classes.HotspotController(target, areas));
			});			
		}
		
		this.created = function() { return _created; };
	});

	this.messages = new (function() {
		this.addProducts = function() {
			// Pass one or more partnumbers as Numbers e.g. 1547245.
			// Usage example: api.messages.addProducts(1234567,1545677,1324455);
			var queue = new argos.classes.ProductQueue();
			queue.add.apply(queue, arguments);
			queue.get().done(function(products) {
				argos.messages.addProducts($(products).filter(".product"));
			});
		}
	});

	this.slideshow = new (function() {
		this.create = function(config) {
			// See slideshow.js for full config options available.
			/* Example usage:
			 	api.slideshow.create({
		 			duration : 2000,
					replaceContent : false,
					uniqueId : "homeBanner",
					urls : argos.page.contentDir + "/homepage/banner_slides.html"
				});
			 */
			return new argos.classes.Slideshow(config);
		}
	});
	
	this.createQuickview = function(product) {
		// Pass it the DOM node for an HTML product element and it'll do the rest.
		var qpiActivatee = argos.page.elements.qvp ? argos.page.elements.qvp.get(0).Element : new argos.classes.QpiActivatee();
		var button = new _classes.Button({
			cssClass : "button",
			text : "Quick view"
		});
		
		new _classes.QpiActivator({
			container : $(".actions", product),
			product : product,
			activator : button.node,
			activatee : qpiActivatee
		});
	}
	
	this.tagging = new (function() {
		this.add = function(target, information) {
			/* target = Object(HTML Node) || String(HTML element id) || String(jQuery selector)
			 * information = {
			 * 	name : "My tagging or link action name",
			 * 	properties : {
			 * 		prop4 : "something",
			 * 		linkTrackvars : "prop4"
			 * 	}
			 */
			var el = argos.utils.createElementFrom(target);
			var name = information["name"] ? information.name : "";
			argos.tracking.set(el.node, name, information.properties);
		}
	});
});


