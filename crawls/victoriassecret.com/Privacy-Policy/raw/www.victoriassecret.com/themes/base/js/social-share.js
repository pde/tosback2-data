function share(type,url,title,description,tracking) {
	//additonal meta tags need added to the page for facebook: http://wiki.developers.facebook.com/index.php/Facebook_Share/Specifying_Meta_Tags
	
	//add the tracking code to url if present
	if(url.search(/\?/) > 0 && tracking) {
		url = url + "&cm_mmc=" + tracking;
	} else if (tracking) {
		url = url + "?cm_mmc=" + tracking;
	}
	
	//twitter
	var twitter_status = encodeURIComponent(title + ' ' + url);
	
	//email
	var email_body = encodeURIComponent(description + ' ' + url);
	
	//all
	var popup_params;
	url =  encodeURIComponent(url);
	title =  encodeURIComponent(title);
	description =  encodeURIComponent(description);

	if (type == 'facebook') {
	
		url = 'http://www.facebook.com/sharer.php?u=' + url + '&t=' + title;
		popup_params = "width=540,height=440";
	
	} else if (type == 'myspace') {
		
		url = 'http://www.myspace.com/Modules/PostTo/Pages/?u=' + url + '&t=' + title + '&c=' + description;
		popup_params = "";
	
	} else if (type == 'twitter') {
		url = "http://twitter.com/home?status=" + twitter_status;
		popup_params = "";
	
	} else if (type == 'digg') {
	
		url = 'http://digg.com/submit?url=' + url + '&title=' + title;
		popup_params = "";
	
	} else if (type == 'delicious') {
	
		url = 'http://delicious.com/save?v=5&noui&jump=close&url=' + url + '&title=' + title + '&notes=' + description;
		popup_params = "width=500,height=400";
	
	} else if (type == 'stumbleupon') {
		url = 'http://www.stumbleupon.com/submit?url=' + url + '&title=' + title;
		popup_params = "";
	
	} else if (type == 'email') {
	
		url = "mailto:?subject=" + title + "&body=" + email_body;
		popup_params = "";
	
	}
	
	window.open(url,type,popup_params);

}	