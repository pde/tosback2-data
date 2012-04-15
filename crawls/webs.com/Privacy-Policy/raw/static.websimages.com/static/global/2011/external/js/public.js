var websPublic = {
	initializeBlog: function() {
		var feed = new google.feeds.Feed("http://blog.webs.com/feed/");
		feed.setResultFormat(google.feeds.Feed.MIXED_FORMAT);
		feed.setNumEntries(1);
		//Next line fails: "Automation server can't create object"  default+en.I.js, line 111 character 441
		feed.load(function(result) {
			if (!result.error) { 
				var blogContainer = $("#pre_footer_blog");

				var entry = result.feed.entries[0];
				var date = new Date(entry['publishedDate']);
				var attributes = ["title", "link", "publishedDate", "content"];
				var m_names = [
					glossary.month1,
					glossary.month2,
					glossary.month3,
					glossary.month4,
					glossary.month5,
					glossary.month6,
					glossary.month7,
					glossary.month8,
					glossary.month9,
					glossary.month10,
					glossary.month11,
					glossary.month12
				];

				// Create date.
				var h3 = document.createElement("h3");
				h3.className = 'tk-museo-slab';
				h3.innerHTML = glossary.from_our_blog+'<span class="from_blog_sub tk-museo-sans">' + 
					date.getDate() + ' ' + m_names[date.getMonth()] + ' ' + date.getFullYear() + '</span>';

				// Create title and link it to article.
				var h4 = document.createElement("h4");
				h4.className = 'tk-museo-slab';
				if(entry['title'].length > 30){
				  h4.innerHTML = '<a target="_blank" href="' + entry['link'] + '">' + entry['title'].substr(0,27) + "... " + '</a>';
			  }else{
				  h4.innerHTML = '<a target="_blank" href="' + entry['link'] + '">' + entry['title'] + '</a>';
			  } 

				// Add article content, elipse, and 'Read More' link.
				var p = document.createElement("p");
				p.innerHTML = entry['contentSnippet'].substr(0,113) + "... " + '<a target="_blank" href="' + entry['link'] + '">'+glossary.Read_More+'</a>';
	
					
				/* acts as a callback, append blog content when container ready, async request*/
				blogContainer.ready(function(){
					$("#loadingBlog").hide();
					blogContainer.html("").append(h3).append(h4).append(p);
				});
			} else {
				blogContainer = document.createElement('p');
				blogContainer.innerHTML = glossary.unable_to_load_entries;
				blogContainer.ready(function(){
					$("#loadingBlog").hide();
					blogContainer.html("").append(blogContainer);
				});
			}
		});
    }
}