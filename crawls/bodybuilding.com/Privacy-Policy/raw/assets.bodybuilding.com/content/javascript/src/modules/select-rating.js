BB.Helpers.selectRating = function (value) {
		//Clear last rating
		var listItems = $('ul.select-rating li').removeClass('rated'),
			clickedRating = value;
		
		//Colors all previous siblings up to and including the selected rating
		$('ul.select-rating li').each(function () {
			var trimmed = $(this).text().trim();
			if (trimmed === clickedRating) {
				$(this).addClass('rated');
			}
		});		
		$('ul.select-rating li.rated').prevAll().addClass('rated');
		BB.Instances.currentUser.userRating = clickedRating;
		
		// If the rating section was previously hidden because the user commented but had not rated,
		// then unhide the rating area now that there is a rating
		$('div.generated-rating div.comment-rating').text(clickedRating);
		
		if ($('div.generated-rating')){
			if($('div.generated-rating').css('display') === 'hidden') {
				$('div.generated-rating').show();
			}
		}
		if ($('div.user-rating').css('display') === 'hidden') {
			$('div.user-rating').show();
		}
		
		//Set value of ratings and update all ratings for this article
		if (typeof clickedRating !== 'function' && clickedRating) {
			//Checks for other instances of user ratings for current article and changes that view
			if($('.my-rating')) {
				$('.my-rating').text(clickedRating);
			}
		}
};