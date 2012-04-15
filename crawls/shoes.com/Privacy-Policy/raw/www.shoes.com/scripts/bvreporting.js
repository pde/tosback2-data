
function BVOmnitureReport (product){
s.linkTrackVars='products,eVar27,events';
s.linkTrackEvents='event9';
s.eVar27='Bazaarvoice^RatingsAndReviews^Action^Read^'+product;
s.events='event9';
s.tl(true,'o','Bazaarvoice^RatingsAndReviews^Action^Read^'+product);
}

function BVStars ()
{BVOmnitureReport('ResultsStars');
}
function BVResultsReview()
{BVOmnitureReport('ResultsReviews');
}

$('.reviewsTail').click(BVStars);
$('.nav-prod-review a').click(BVResultsReview);
