function shortenDescription(text, maxlength)
{
	text = text.replace(/<.*?>/g, '');
	//text = text.replace(/Image description: /g, '');
	text = text.substring(18,text.length);
	text = text.substr(0, maxlength);
	text = $.trim(text);
	var exit = false;
	var lastSpace = -1;
	for (var i=text.length-1; i!=0 && !exit; i--) {
		if (text.charAt(i) == ' ') {
			lastSpace = i;
			exit = true;
		}
	}
	text = text.substring(0, lastSpace);
	text += '&nbsp;&hellip;';
	return text;
}

function createLandscapeBlogImgPnl(photopost, divClass)
{
	function determinePadding(width)
	{
		var baselinePadding = 9;
		var baselineWidth = 250;
		return newPadding = baselinePadding + Math.round((baselineWidth-width)/2);
	}
	
	var img = photopost.photos[0].alt_sizes[2];
	var html = '';
	html += '<a href="';
	html += photopost.post_url;
	html += '"><img src="';
	html += img.url;
	html += '" height="' + img.height + '" width="' + img.width + '" alt="" />';
	html += '<br /><div class="ddimglnktext">';
	html += shortenDescription(photopost.caption,55);
	html += '<span class="ddimglnkcarrot"></span></div></a>';
	$(divClass).html(html);
	$(divClass).css('padding-left',  determinePadding(img.width));
	$(divClass +' a').width(img.width);
	//remove propreties of portrait image for testing
	$(divClass).addClass('dropdown_image_link');
	$(divClass).removeClass('blogmnuportimg');
}

function createPortraitBlogImgPnl(photopost, divClass)
{
	var img = photopost.photos[0].alt_sizes[2];
	var html = '';
	html += '<a href="';
	html += photopost.post_url;
	html += '">';
	html += '<img src="';
	html += img.url;
	html += '" height="' + img.height + '" width="' + img.width + '" alt="" />';
	html += '<p id="blogmnuportimgtxt">';
	html += shortenDescription(photopost.caption,130);
	html += '<span class="ddimglnkcarrot"></span></p></a>';
	$(divClass).html(html);
	$(divClass).removeClass('dropdown_image_link');
	$(divClass).addClass('blogmnuportimg');
	//remove properties of landscape image for testing
	$(divClass).css('padding-left',  '');
}

function createTextBlogPanel(textposts, divClass)
{
	function generateLink(post)
	{
		var html = '<li><a href="';
		html += post.post_url;
		html += '">';
		html += post.title;
		html += '</a></li>';
		return html;
	}
	
	var html = "";
	var count = textposts.length;
	var linksgenerated = 0;
	for (var i=0; linksgenerated < 4 && i < count; i++) {
		if ($.inArray("question",textposts[i].tags) == -1) {
			html += generateLink(textposts[i]);
			linksgenerated++;
		}
	}
	$(divClass).html(html);
}

function displayTextPosts(data)
{
	var textposts = data.response.posts;
	createTextBlogPanel(textposts, '.blogddpnl2');
}

function displayPhotoPosts(data)
{
	function calcBlogImageWidth(image) 
	{
		var ratio = 165 / parseInt(image.height);
		image.width = Math.round(parseInt(image.width) * ratio);
		image.height = 165;
	}
	
	function isOkLandscapeBlogImage(image) 
	{
		return ((image.width >= image.height) && (image.width <= 270));
	}
	
	function isOkPortraitBlogImage(image) 
	{
		return ((image.width < image.height) && (image.width <= 130));
	}

	var photoposts = data.response.posts;
	var count = photoposts.length;
	var pnl1 = false; //ture once first blog panel is complete
	var pnl3 = false; //true once third blog panel is complete
	var i = 0;
	while ((!pnl1 || !pnl3) && i<count) {
		//Use for testing: if (photoposts[i].caption.indexOf('Great') != -1) i++;
		var img = photoposts[i].photos[0].alt_sizes[2];
		calcBlogImageWidth(img);
		if (isOkLandscapeBlogImage(img)) {
			var post = photoposts[i];
			if (!pnl1) {
				createLandscapeBlogImgPnl(post, '.blogddpnl1');
				pnl1 = true;
			} else {
				createLandscapeBlogImgPnl(post, '.blogddpnl3');
				pnl3 = true;
			}
		} else if (isOkPortraitBlogImage(img)) {
			var post = photoposts[i];
			if (!pnl1) {
				createPortraitBlogImgPnl(post, '.blogddpnl1');
				pnl1 = true;
			} else {
				createPortraitBlogImgPnl(post, '.blogddpnl3');
				pnl3 = true;
			}
		}
		i++;
		//if (post.caption.indexOf('painting') != -1) {pnl3 = false; pnl1 = false;}
		//if (post.caption.indexOf('Hall') != -1) {pnl3 = false; pnl1 = false;}
	}
}

$.ajax({
	url: 'http://www.usa.gov/tumblrxml/textposts.js',	
	dataType: 'jsonp',
	jsonp: 'jsonp',
	jsonpCallback: 'displayTextPosts'
});
$.ajax({
	url: 'http://www.usa.gov/tumblrxml/photoposts.js',	
	dataType: 'jsonp',
	jsonp: 'jsonp',
	jsonpCallback: 'displayPhotoPosts'
});