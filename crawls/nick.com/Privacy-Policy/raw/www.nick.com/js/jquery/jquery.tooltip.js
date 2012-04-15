/**
 * @author ezdermam
 * @author ghosnf
 */
(function($) {
	$.fn.tooltip = function( options ) {
		var defaults = {
			id: "default-tooltip",
			contentSelector: "",
			contentTitle: false,
			lockTo: "",
			lockToElement: "",
			followMouse: true,
			allowAccess: true, /* Allow access inside the Tooltip */
			offsetX: 0,
			offsetY: 5,
			allowFlip: true,
			delay: 500
		};

		var options = $.extend(defaults, options);

		if ( $("#" + options.id).size() == 0 ) {
			$("<div id='" + options.id + "'><div class='arrow png'></div><div class='content png'></div></div>")
				.appendTo($("body")).css("index","9999999");
		}

		var container  = $("#" + options.id);
		var title      = "";
		var timer      = null;
		var delay      = null;
		var isOpening = false;

		this.each(function() {
			$(this).hover(
				function(e) {
					var content;

					if ( options.contentTitle == false ) {
						content = $(this).find(options.contentSelector).html()
					} else {
						content = $(this).attr("title");
						title = content;
					}

					// Tooltip prevention
					$(this).find("img,a").andSelf().attr("title", "").attr("alt", "");

					clearTimeout(delay);
					clearTimeout(timer);
					isOpening = false;
					container.hide().find(".content").html(content);

					if ( options.allowAccess == true ) {
						container.hover(function(e) {
							clearInterval(timer);
						},
						function(e) {
							container.hide();
							$(this).attr("title", title);
						});
					};
					
					_moveElement($(this), e, options);
				},
				function (e) {
					clearTimeout(delay);
					isOpening = false;
					if ( options.allowAccess == false ) {
						container.hide();
						$(this).attr("title", title);
					} else {
						timer = setTimeout(function() {
							container.hide();
							$(this).attr("title", title);
						}, options.delay);
					}
				}
			).click(function() {
				container.hide();
				$(this).attr("title", title);
			});

			if ( options.followMouse == true ) {
				
				$(this).unbind("mousemove").mousemove(function (e) { 
					_moveElement($(this), e, options);
				});
			}
		});

		function _moveElement(el, e, options) {
			var container = $("#" + options.id);
			var arrow     = container.find(".arrow");
			var top       = options.offsetY + e.pageY;
			var left      = options.offsetX + e.pageX;

			if ( options.lockTo == "side" ) {
				if ( options.lockToElement.length == 0 ) {
					left = el.offset().left + el.width() + options.offsetX;
				} else {
					var subEl = el.find(options.lockToElement).eq(0);
					left = subEl.offset().left + subEl.width() + options.offsetX;
				}

				if ( top < el.offset().top ) {
					top = el.offset().top;
				}
			} else if ( options.lockTo == "top" ) {
				top = el.offset().top - container.height();
				left -= container.width() / 2;
				arrow.css("left", (container.width() / 2) - (arrow.width() / 2));
			}

			if ( options.allowAccess == true && options.followMouse == true && options.lockTo != "side" && container.offset().top != 0 & top > container.offset().top ) {
				top = container.offset().top;
			}

			if ( options.allowFlip == true ) {
				if ( ((top + container.height()) + options.offsetY) > ($(window).scrollTop() + $(window).height()) ) {
					top -= container.height() + arrow.height() + options.offsetY;
					container.addClass("flipped");
					arrow.css("top", container.height());
				} else {
					container.removeClass("flipped");
					arrow.css("top", 0);
				}

				if ( left >= ($(window).width() - container.width()) ) {
					var scrollLeft = 0;
					var padding = (container.width() - container.find('div.content').width()) / 2;
					
					try{
						scrollLeft = $(document).scrollLeft();
					}
					catch(error){}
						
					left = ($(window).width() - container.width()) + scrollLeft;
					
					arrowX = e.pageX - left;
					if (e.pageX <= left) {
						arrowX = 0;
					}
					arrowWidth = parseInt($('#nick-tooltip').find('.arrow').css('width').replace('px',''));
					arrowX = ($(el).offset().left - left) - arrowWidth; //;
					
					if (left > ($(el).position().left - arrowWidth)){
						arrowX = arrowX + $(el).width();
						arrow.removeClass("right").css("left", arrowX);
					} else {
						arrow.addClass("right").css("left", arrowX);
					}

					
				} else {
					arrow.removeClass("right").css("left", 0);
				}
			}

			container.css({
				top: top,
				left: left
	        })
			if(!isOpening){
				delay = setTimeout(function() {
					
					var data={
						"cmsid":el.find(".cmsid").html(),
						"itemType":el.find(".item-type").html(),
						"screenShot":el.find(".screenshot").html()
					}
						if(data.cmsid!=null && data.itemType!=null ){
							$(document).trigger("tooltip.OPEN", [data]);
						}else{
							NICK.utils.doLog("Tooltip error: No tooltip.OPEN event was fired. cmsid: "+data.cmsid+"  dataType: "+data.dataType);
						}
						
						container.show();
					}, options.delay);
				isOpening = true;
			}
			
		}
	}
})(jQuery);

$(document).ready(function () {
		
	if (typeof NICK !== 'undefined' && typeof NICK.utils !== 'undefined') {
		NICK.utils.initTooltip();
	}
	
});