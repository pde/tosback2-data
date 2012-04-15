
if (document.getElementById('Adv4')){
	var url = document.location.toString();
	var urlArray = url.split("/")
	var ssts1 = urlArray[3];
	if (url.indexOf("tvt")>0) ssts1 = "news";

	if (ssts1 == "news") {
		jQuery.ajax({
			url: "/_common/_includes/_community/taboola-async.ssi",
  			success: function(html){
    				jQuery("#Adv4").append(html);
  			}
		});
    	}
	else   {
		jQuery.getJSON("/_common/_includes/_video/featured-video.ssi", buildVideos);
 	}
}
	
function buildVideos(data, textStatus) {
	var html = "<h2>Featured video</h2>";

	jQuery.each(data.videos, function(i,video){
		if (i == 0) {
			html += "<div class=\"video-thumb no-margin\">";
		} 
		else {
			html += "<div class=\"video-thumb\">";
		}
		if (i >= 3) return;
		var name = video.name;
		var desc = video.shortDescription;
		if (video.customFields && video.customFields.usatodayshortname != null) name = video.customFields.usatodayshortname;
		if (video.customFields && video.customFields.usatodayshortdesc != null) desc = video.customFields.usatodayshortdesc;
		html += " <div class=\"video-frame\">";
		html += "  <a href=\"http://www.usatoday.com/video/index.htm?bctid="+video.id+"\" class=\"video-opacity\">";
		html += "   <img src=\""+video.thumbnailURL+"\" alt=\"\" width=\"100\" height=\"75\" border=\"0\" class=\"video-thumb2\"/>";
		html += "   <img src=\"http://i.usatoday.net/_common/_images/black.gif\" class=\"video-dark\" alt=\"Play Video\"/>";
		html += "   <div class=\"video-play\">";
		html += "    <img src=\"http://i.usatoday.net/_fronts/_shared/_i/videoplay.gif\" alt=\"Play Video\"/>";
		html += "   </div>";
		html += "  </a>";
		html += " </div>";
		html += " <div class=\"headline\">";
		html += "  <a href=\"http://www.usatoday.com/video/index.htm?bctid="+video.id+"\" class=\"video-opacity\">"+name+"</a>";
		html += " </div>";
		html += " <div class=\"chatter\">"+desc+"</div>";
		html += "</div>";
	});
	html += "<a class=\"more\" href=\"http://www.usatoday.com/video/index.htm\">More: Video</a>";
	jQuery(html).appendTo("#Adv4");

}

