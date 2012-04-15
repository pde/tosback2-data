$(document).ready(function(){
	$('ul.ticker li').fadeIn();
  $('.ticker').liScroll({travelocity: 0.05});
  	
  	/*$.post("/SysConfig/WebPortal/nypost/blocks/hot_topics/hot_topics_bar.jsp", function(res){
  		if(res != null){
  			alert("loaded");
  		}else(res == null){
  			alert("not loaded");
  		}
  	});*/
  	
  	//"/rw/SysConfig/WebPortal/nypost/blocks/hot_topics/hot_topics_bar.jsp"
  	
  	$.get("/Fragment/SysConfig/WebPortal/nypost/blocks/hot_topics/hot_topics_bar.jsp", function(res){
  		$('#hot_topics_loader').html(res);
  		$('#hot_topics_loader').fadeIn();
  	});
  	
  /*	$.get("/Fragment/SysConfig/WebPortal/nypost/blocks/breaking_news_bar/breaking_news_bar.jpt", function(res){
  		$('#breaking_news_loader').html(res);
  		$('#breaking_news_loader').fadeIn();
  	});
  	*/
});
