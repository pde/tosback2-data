$(function() {
	
	// calculate the height for each one
	$('#hot-pics #hot-pics-content a.featured .caption').each(function(elt) {
		var captionHeight = $('h4', $(this)).height();
		var captionWrapHeight = $(this).height();
		var captionHeightDiff = captionWrapHeight - captionHeight;
		var captionDividedHeight = captionHeightDiff*.5;
		$('h4', $(this)).attr('style', 'margin-top:'+ captionDividedHeight +'px;');
	});
	
	if ($('.homepage,.microsite-hotpics').length > 0) {
		$('#hot-pics #hot-pics-content #slider').scrollable({
			keyboard:false,
			circular:true
		}).autoscroll({
			interval:3000
		});
	}
});