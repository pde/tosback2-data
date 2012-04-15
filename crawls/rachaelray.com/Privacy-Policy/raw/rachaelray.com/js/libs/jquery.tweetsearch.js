/**
 * jquery.tweetsearch.js
 * 
 * bits and pieces -- indeed whole swathes -- shamelessly swiped from:
 *   https://github.com/seaofclouds/tweet (jquery.tweet.js)
 *   http://lupomontero.e-noise.com/blog/fetching-tweets-with-jquery-and-the-twitter-json-api
 */

(function ($) {
	$.fn.tweetSearch = function (obj) {
		var i,
		    api_url     = 'http://search.twitter.com/search.json',
		    search_url  = 'http://search.twitter.com/',
		    twitter_url = 'http://twitter.com/'
		    s = $.extend({
					query:       null,
					user:        null,
					hashtag:     null,
					count:       1,
					target:      this,
					result_type: 'recent',
					loading:     'Loading tweets...',
					json:        true
				}, obj)
				regex = {
					// See http://daringfireball.net/2010/07/improved_regex_for_matching_urls
					url: /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/gi,
					hashtag:   /(?:^| )[#|\uFF03]+([\w\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u00ff\u0600-\u06ff]+)/gi,
					user: /@(\w+)/gi
				};

		function getTweets() {
			$.ajax(
				{
					url: api_url + '?callback=?',
					data: {
						q: makeQuery(),
						rpp: s.count,
						include_entities: true
					},
				dataType: 'json',
				context: s.target,
				success: dumpHTML
			});
		};

		function makeQuery() {
			var i,
			    query,
			    params = ['query','user','hashtag'];
			for (i in params) {
				if (s[params[i]] && typeof(s[params[i]]) === 'string') {
					s[params[i]] = [s[params[i]]];
				}
			}
			query  = s.query ? s.query.join(' ') : '';
			query += s.hashtag ? ' #' + s.hashtag.join(' OR #') : '';
			query += s.user ? ' from:' + s.user.join(' OR from:') : '';
			return $.trim(query);
		};

		function dumpHTML(data) {
			var html = '<ul>';
			$('.loading', this).remove();
			$.each(data.results, function (i, r) {
				html += '<li>' + $([r.text]).linkUrl().linkUser().linkHash()[0]; + '</li>';
			});
			html += '</ul>';
			this.append(html);
		}

		// next two blocks lifted right out of seaofclouds' tweet.js
		function replacer (regex, replacement) {
      return function() {
        var returning = [];
        this.each(function() {
          returning.push(this.replace(regex, replacement));
        });
        return $(returning);
      };
    }

    $.fn.extend({
      linkUrl: replacer(regex.url, function(match) {
        var url = (/^[a-z]+:/i).test(match) ? match : "http://"+match;
        return "<a href=\""+url+"\" target=\"_blank\">"+match+"</a>";
      }),
      linkUser: replacer(regex.user, "@<a href=\"http://"+s.twitter_url+"/$1\" target=\"_blank\">$1</a>"),
      linkHash: replacer(regex.hashtag, ' <a href="'+search_url+'/search?tag=$1&lang=all" target=\"_blank\">#$1</a>')
    });
		
		return this.each(function () {
			$(this).append('<div class="loading">'+s.loading+'</div>');
			getTweets();
		});
	}
})(jQuery);
