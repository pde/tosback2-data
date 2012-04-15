(function($){

    var feedUrl = "/assets/esp/search/feed/autocomplete.jsonp";

    function initializeAutocomplete(item) {
        var linkCount = 0;
        var elem = $(item);
        var outerWidth = elem.outerWidth(true);
		try {
			elem.autocomplete(feedUrl, {
				dataType: 'json',
				width: (outerWidth - 6) + 'px',
				selectFirst: false,
				cacheLength: 0,
				parse: function(data){
					var i = 0;
					var parsed = [];
					$(data).each(function(index, row){
						parsed[i] = {
							data: row,
							value: row.phrase,
							result: row.phrase
						};
						i++;
					});
					return parsed;
				},
				formatItem: function(item, position, itemCount){
					if ( position == 1 ){
						linkCount = 0;
					}
					if ( item.url ){
						var prefix = 'Go to:';
						if ( item.prefix ){
							prefix = item.prefix + ':';
						}
						linkCount++;
						return {
							'formatted': '<span class="goto">' + prefix + '</span> ' + item.phrase,
							'class': 'link',
							'highlight': false
						};
					}
					else {
						var firstAfterLink = false; 
						if ( linkCount > 0 ){
							firstAfterLink = true;
							linkCount = 0;
						}
						return {
							'formatted': item.phrase,
							'class': firstAfterLink ? 'first-after-link' : '',
							'highlight' : true
						};
					}
				}

			}).result(function(val, row){
				if ( row.url ){
					window.top.location.href = row.url;
				}
				else {
					window.top.location.href = '/app/search/?searchString=' + encodeURIComponent(row.phrase);
				}
			});
		} catch(err) {
			nbcu.log(err.description);
		}
    }

    var css = document.createElement('link');
    css.type = 'text/css';
    css.rel = 'stylesheet';
    css.href = '/assets/js/search/autocomplete.css';
    document.getElementsByTagName('head')[0].appendChild(css);

    $('#searchString, .side_search .search_text').each(function() {
        initializeAutocomplete(this);
    });
})(jQuery);
