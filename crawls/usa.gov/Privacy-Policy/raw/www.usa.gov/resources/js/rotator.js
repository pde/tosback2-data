$(document).ready(function() {
    $(document).ready(function() {
		$('.feature_list').removeClass('not_visible');
		$('.feature_single').removeClass('not_visible');
	});
	$('#features_pause').click(function() {
		 $('#features_rotator').cycle('pause');
	});
	$('#features_rotator').cycle({
		fx: 'fade', // choose your transition type, ex: fade, scrollUp, shuffle, etc...
		pause: 1,
		timeout: 6000,
		autostop: 1,
		autostopCount: 8,
		next: '.features_next_click',
		prev: '.features_prev_click',
		pager: '#features_controls',
    	pagerAnchorBuilder: function(idx, feature) {
			var title = $('h2',feature).text();
			var id = idx + 1;
			return '<li><a href="#" title="' + title + '">' + id + '</a></li>';
    	},
		before: function(currSlideElement, nextSlideElement, opts, forwardFlag) {
			$(currSlideElement).attr('aria-live','off');
			$(nextSlideElement).attr('aria-live','polite');
		}
	});
});