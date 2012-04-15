jQuery.fn.iterate = function(settings) {
	
	var list = this;
	
	this.settings = jQuery.extend({
		children: "li",
    	nextBtn: ".nextBtn",
    	prevBtn: ".prevBtn"
	}, settings);
	
	jQuery(this.settings.nextBtn).click(
		function() { 
			list.next();
		}
	);
	
	jQuery(this.settings.prevBtn).click(
		function() { 
			list.prev();
		}
	);
											
	this.items = list.children(this.settings.children);

	this.counter = 0;
	this.onHit = null;
	this.offHit = null;
	
	this.rewind = function() {
		this.counter = 0;	
	}
	
	this.key = function() {
		return this.counter;
	}
		
	this.moveCounter = function(newPosition) {
		if(this.valid(newPosition)) {
			if(this.offHit) {
				this.offHit(jQuery(this.items[this.counter]));
			}		
		
			this.counter = newPosition;	
	
			if(this.onHit) {
				this.onHit(jQuery(this.items[this.counter]));
			}
		}
	}
	
	this.next = function() {
		this.moveCounter(this.counter + 1);
	}

	this.prev = function() {
		this.moveCounter(this.counter - 1);
	}
	
	this.valid = function(key) {	
		if(!key) {
			key = this.key();	
		}
				
		if(key >= 0 && key < this.items.size()) {
			return true;
		} else {
			return false;
		}
	}
	
	this.currentItem = function() {
		return jQuery(this.items[this.counter]);	
	}
	
	this.jumpTo = function(element) {

		if(typeof element == 'number') {
			this.moveCounter(element);
		} else if (typeof element == 'object') {
			var foundAt = jQuery.inArray(element, this.items);
			this.moveCounter(foundAt);
		}
	}
	
	this.getItem = function(key) {
		return jQuery(this.items[key]);	
	}
	
	return this;
}