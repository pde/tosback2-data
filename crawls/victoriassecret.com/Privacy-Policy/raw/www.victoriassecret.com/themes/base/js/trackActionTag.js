<!--
// The TrackTag variable refers to the location of the
// base action tag. In the actual implementation this 
// action tag will point to a 1x1 pixel GIF.

var TrackTag = "http://view.atdmt.com/jaction/"

function TrackActionTag(URL)
{
	//create new image
	var rf_img = new Image();
	//set src of new image, add random # cache killer
	rf_img.src = TrackTag + URL + '/?' + Math.random();
	//debug alert returns actual image SRC
	
	//alert(rf_img.src);
}

-->