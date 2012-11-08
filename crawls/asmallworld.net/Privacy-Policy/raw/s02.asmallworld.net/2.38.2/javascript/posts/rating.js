function submitRating(status, post_id, rating, rating_type) {
	status.html("Saving").animate({'opacity': 1.0}, 00).addClass("ratings-status-msg");
	jQuery.ajax({
		type: "POST",
		url: '/post_ratings/rate',
		data: {post_id: post_id, rating: rating, rating_type: rating_type},
		dataType: "json",
		success: function(data, textStatus) {
		  status.html("Saved").animate({'opacity': 1.0}, 3000);
		  status.animate({'opacity': 0.0}, 500);
		},
		error: function() {
		  status.html("Error saving like").animate({'opacity': 1.0}, 3000);
		  status.animate({'opacity': 0.0}, 500);
		}
	});
}
