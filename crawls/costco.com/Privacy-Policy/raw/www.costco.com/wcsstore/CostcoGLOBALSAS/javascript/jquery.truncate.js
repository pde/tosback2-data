(function($){
	$.fn.jTruncate = function(options) {
	   
		var defaults = {
			length: 70,
			minTrail: 50,
			ellipsisText: " ...",
			moreAni: "",
			lessAni: ""
		};
		
		var options = $.extend(defaults, options);
	   
		return this.each(function() {
			obj = $(this);
			var body = obj.html();
			
			if(body.length > options.length + options.minTrail) {
					// truncate tip
					var r = RegExp('\\s');
					//r.lastIndex = options.length;
					var splitLocation = body.substr(options.length).search(r);
					splitLocation = splitLocation == -1 ? -1 : splitLocation + options.length;
				if(splitLocation != -1) {
					var str1 = body.substring(0, splitLocation);
					var str2 = body.substring(splitLocation, body.length);
					obj.html(str1 + '<span class="truncate_more">' + str2 + '</span>');
					obj.find('.truncate_more').css("display", "none");
					
					// insert more link
					obj.append('<a href="#" class="truncate_more_link">' + options.ellipsisText + '</a>');

					// set onclick event for more/less link
					var moreLink = $('.truncate_more_link', obj);
					var moreContent = $('.truncate_more', obj);
					moreLink.click(function() {
						if(moreLink.text() == options.ellipsisText) {
							moreContent.show(options.moreAni);
							moreLink.css("display", "none");
						} else {
						}
						return false;
				  	});
				}
			} // end if
			
		});
	};
})(jQuery);