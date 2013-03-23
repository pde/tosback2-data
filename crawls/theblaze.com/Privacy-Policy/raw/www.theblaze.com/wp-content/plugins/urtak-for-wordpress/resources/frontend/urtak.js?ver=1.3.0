jQuery(document).ready(function($) {
	var urtak_post_ids = [];
	$('.urtak-responses-number[data-post-id]').each(function(event) {
		urtak_post_ids.push($(this).attr('data-post-id'));
	});

	if(urtak_post_ids.length > 0) {
		$.post(
			Urtak_Vars.ajaxurl,
			{
				action: 'urtak_fetch_responses_counts',
				post_ids: urtak_post_ids
			},
			function(data, status) {
				if(data.urtaks) {
					for(var post_id in data.urtaks) {
						$('.urtak-responses-number[data-post-id="' + post_id + '"]').find('span').text(data.urtaks[post_id]).end().addClass('fetched');
					}
				}
			},
			'json'
		);
	}
});
