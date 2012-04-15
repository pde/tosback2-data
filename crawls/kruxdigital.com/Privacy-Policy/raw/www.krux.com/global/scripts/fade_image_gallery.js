var display_time = 6000;
var interval_id;
var transition_speed = 1500;

var FEATURE_LOCK = false;

(function($) {
	$(document).ready(function() {
		$('body').addClass('js');
		if ($('#features div.feature-story').length > 1) {
			if (!FEATURE_LOCK)
				interval_id = setInterval('feature_rotate()', display_time);
			
			$('#features a.feature-link').click(function(event) {
				clearInterval(interval_id);
				
				var feature_id = $(this).attr('href').replace('#feature-', '');
				
				feature_rotate(feature_id);
				$('#features').unbind();
				$(this).blur();
				event.preventDefault();
			});
			
			if (!FEATURE_LOCK) {
				$('#features').mouseenter(function(event) {
					clearInterval(interval_id);
				});
				
				$('#features').mouseleave(function(event) {
					clearInterval(interval_id);
					interval_id = setInterval('feature_rotate()', display_time);
				});
			}
		}
	});
})(jQuery);

function feature_rotate(index) {
	var feature_active;
	var feature_link;
	var feature_new = false;
	
	feature_active = $('#features div.active');
	if (typeof(index) != "undefined") {
		feature_new = $('#features #feature-' + index);
		if (feature_new.attr('id') == feature_active.attr('id'))
			return;
		feature_link = $('#feature-links #feature-link-' + index);
	}
	
	feature_active.removeClass('active').fadeOut(transition_speed);
	$('#feature-links .feature-link').removeClass('active');
	
	if (!feature_new) {
		if (feature_active.next().length > 0) {
			feature_new = feature_active.next();
			var feature_id = feature_new.attr('id').replace('feature-', '');
			feature_link = $('#feature-links #feature-link-' + feature_id);
		} else {
			feature_new = $('#features #feature-1');
			feature_link = $('#feature-links #feature-link-1');
		}
	}
	
	feature_link.addClass('active');
	feature_new.addClass('active').fadeIn(transition_speed);
}