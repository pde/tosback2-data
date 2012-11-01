	var username = "Cruisedotco";
	var count = 5;
	var recentTweetsUrl = "/tweets_recent.php"
	var followerCountUrl ="/tweets_followers.php";
	$(document).ready(function()
	{
		$.ajax
		({type: "GET",url: followerCountUrl,dataType:"json",success: function(response)
			{				
				headerimage  = response.profile_image_url;
				var headerData = '<img src="'+headerimage+'" class="twitter_image"/><h3>CruiseDotCo</h3><h4><a href="https://twitter.com/Cruisedotco">@Cruisedotco</a></h4>';
				$(headerData).appendTo('#heading');
			}
		});
		$.ajax
		({type: "GET",url: recentTweetsUrl,dataType:"json",success: function(response)
		{
			var tdata='';
			for(i=0;i<response.length;i++){
				data =response[i];
				var id=data.id;
				var text=data.text;
				var created_time=data.created_at;
				var posted = cruiseTwitter.ageOfPost(created_time)
				var screen_name=data.user.screen_name;
				var source=data.source;
				text = cruiseTwitter.linkify(text)
				text = cruiseTwitter.userfy(text)
				tdata+="<div class='status' id='"+id+"'><span class='tweetUserName'>CruiseCo</span><div id='txt'>"+text+'<div id="web_intent"><span class="time">'+posted+'</span><br/><a href="http://twitter.com/intent/retweet?tweet_id='+id+'">Retweet</a> - <a href="http://twitter.com/intent/tweet?in_reply_to='+id+'">Reply</a> - <a href="http://twitter.com/intent/favorite?tweet_id='+id+'">Favorite</a></div></div></div>';
			}

			$(tdata).appendTo('#tweetsScroll');
		}
		});
	});
	
	var cruiseTwitter = {
		linkify: function(str) {  
						return str.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+/, function(m) {  
						return m.link(m);  
					});  
				},
		
		userfy:function(str) {  
						return str.replace(/@[A-Za-z0-9-_]+/g, function(m) {  
						return m.link('http://twitter.com/' + m);  
					});  
				},
				
		ageOfPost: function relative_time(time_value) {  
					  var values = time_value.split(" ");  
					  time_value = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];  
					  var parsed_date = Date.parse(time_value);  
					  var relative_to = (arguments.length > 1) ? arguments[1] : new Date();  
					  var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);  
					  delta = delta + (relative_to.getTimezoneOffset() * 60);  
					  var r = '';  
					  if (delta < 60) {  
							r = 'a minute ago';  
					  } else if(delta < 120) {  
							r = 'couple of minutes ago';  
					  } else if(delta < (45*60)) {  
							r = (parseInt(delta / 60)).toString() + ' minutes ago';  
					  } else if(delta < (90*60)) {  
							r = 'an hour ago';  
					  } else if(delta < (24*60*60)) {  
							r = '' + (parseInt(delta / 3600)).toString() + ' hours ago';  
					  } else if(delta < (48*60*60)) {  
							r = '1 day ago';  
					  } else {  
							r = (parseInt(delta / 86400)).toString() + ' days ago';  
					  }  
						  return r;  
			}  
					
	
	}
