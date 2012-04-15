var webs = webs || {};
webs.visitorService = function(){
	var logEvent = function(eventType, eventData) {

        if (eventData == undefined) {
            eventData = '';
        }

		var baseUrl = 'members.webs.com/s/visitor/logEvent';
        var protocol = location.protocol == 'https:' ? 'https://' : 'http://';
        var url = protocol + baseUrl;

		var referer = "";
		var queryString = location.search;
		var start = queryString.indexOf('referer=');
		if(start >= 0) {
			var end = queryString.indexOf('&', start);
			if(end < 0) end = queryString.length;
			referer = queryString.substring(start + 8, end);
		}

        jQuery.ajax({
            type: 'GET',
            dataType: 'jsonp',
            url: url,
            data: { 'eventType': eventType, 'eventData': eventData, 'referer': referer}
            });
	};

	return {
		logEvent: logEvent
	};
}();