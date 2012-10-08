(function ($) {
	var baseurl = 'http://qa.ps.newsinc.com/';
	
	$.playerServicesCall = function (trackingGroup, widgetID, callback) {
		var url = baseurl + 'players/showjson/'+trackingGroup+'/'+widgetID+'.xml';
		$.getXML(url, callback);
	};

	$.playlistServicesCall = function (trackingGroup, widgetID, playlistID, callback) {
		var url = baseurl + 'Playlist/showjson/'+trackingGroup+'/'+widgetID+'/'+playlistID+'.xml';
		$.getXML(url, callback);
	};	
	
	$.catalogServicesCall = function (videoID, callback) {
		var url = baseurl + 'Catalog/'+videoID+'.xml';
		$.getXML(url, callback);
	};	
	
    $.getXML = function (url, callback) {
		$.GetCrossDomainXML(url, callback);
    };
	
	$.GetCrossDomainXML = function (url, callback) {
		$.GetDataFromURL(url, function(data) {
			callback(data.xmlfile);
		});
	};
	
	$.GetDataFromURL = function (url, callback) {
		if(isInform == false){
			$.getJSON(url+'?callback=?', callback);
		}else{

			var separator = '?';
    		if(url.indexOf('?') >= 0) {
      			separator = '&';
    		}
    		var targetUrl = url + separator + 'callback=?';
			$.getJSON(targetUrl, callback);   	
		}
	};
})(jQuery);