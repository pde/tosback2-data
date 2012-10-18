(function($){
	$.fn.jTruncate = function(options) {

		var defaults = {
			length: 200,
			minTrail: 20,
			moreText: "See More Detail",
			lessText: "See Less Detail",
			ellipsisText: "...",
			moreAni: "",
			lessAni: ""
		};

		var options = $.extend(defaults, options);

		return this.each(function() {
			obj = $(this);
			var body = obj.html();

			if(body.length > options.length + options.minTrail) {
                var htmlStartTagIndex = 0;
                var htmlEndTagIndex = 0;
                // code to make sure html tags are not truncated
                while (htmlStartTagIndex < body.length ) {
                    htmlStartTagIndex = body.indexOf('<', htmlStartTagIndex);
                    if (htmlStartTagIndex >= 0) {
                        htmlEndTagIndex = body.indexOf('</', htmlStartTagIndex);
                        if (htmlEndTagIndex == -1){
                            htmlEndTagIndex = body.indexOf('>', htmlStartTagIndex);
                        }
                        var bodySubStr = body.substring(htmlStartTagIndex, htmlEndTagIndex + 1);
                        var bodyNewSubStr = bodySubStr.replace(/ /g, '~');
                        body = body.replace(bodySubStr, bodyNewSubStr);
                        htmlStartTagIndex = htmlEndTagIndex + 1;
                    }

                    if (htmlStartTagIndex < 0){
                        break;
                    }
                }
				var splitLocation = body.indexOf(' ', options.length);
				if(splitLocation != -1) {
					// truncate tip
					var splitLocation = body.indexOf(' ', options.length);
					var str1 = body.substring(0, splitLocation);
                    str1 = str1.replace(/~/g, ' ');
					var str2 = body.substring(splitLocation, body.length);
                    str2 = str2.replace(/~/g, ' ');
					obj.html(str1 + '<span class="truncate_ellipsis">' + options.ellipsisText +
						'</span>' + '<span class="truncate_more">' + str2 + '</span>');
					obj.find('.truncate_more').css("display", "none");

					// insert more link
					obj.append(
						'<div style="display: inline;">' +
							'<a href="#" class="truncate_more_link">' + options.moreText + '</a>' +
						'</div>'
					);

					// set onclick event for more/less link
					var moreLink = $('.truncate_more_link', obj);
					var moreContent = $('.truncate_more', obj);
					var ellipsis = $('.truncate_ellipsis', obj);
					moreLink.click(function() {
						if(moreLink.text() == options.moreText) {
							moreContent.show(options.moreAni);
							moreLink.text(options.lessText);
							ellipsis.css("display", "none");
						} else {
							moreContent.hide(options.lessAni);
							moreLink.text(options.moreText);
							ellipsis.css("display", "inline");
						}
						return false;
				  	});
				}
			} // end if

		});
	};
})(jQuery);