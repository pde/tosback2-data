jQuery(document).ready(function(){
	
	jQuery(".column-container").filter(":first").each(function() {
		var self = jQuery(this);
		self.find(".icon").click(function() {
			self.find(".container").slideToggle("normal");
			self.find(".icon").toggleClass("close");	
			return false;
		});
	});
	
	jQuery(".column-container").filter(":last").each(function() {
		var self = jQuery(this);
		self.find(".icon").click(function() {
			self.find(".container").slideToggle("normal");
			self.find(".icon").toggleClass("close");	
			return false;
		});
	});
	
	jQuery(".commonquestionscontent .article").each(function(){
		var self = jQuery(this);
		self.find(".icon").click(function(){
			self.find(".description").slideToggle("normal");
			self.find(".icon").toggleClass("close");	
			return false;
		});
	});
	
});
