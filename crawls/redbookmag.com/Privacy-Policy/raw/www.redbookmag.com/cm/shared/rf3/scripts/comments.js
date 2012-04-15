var cacheBust = Math.floor(Math.random()*100001);
var setPagination = new Array();
var pagePosition = new Number(1);
var charCount = "1700"; // max 

var shareCommentCount = null;

function getCommentsCount2() {
}
function displayCommentCount(){
	return false;
}

function displayCommentCount2() {
	//if (shareCommentCount != null) return false;
	cacheBust = Math.floor(Math.random()*100001);

	$.getJSON("/api/js/CommentsByArticle/" + articleID + "_count" + "?cachebust=" + cacheBust, function(json){
		shareCommentCount = json.count;
		displayPagination(json.count);
		/*if (json.count == 0) {
			$("#comment_count").html("<h3>No Comments</h3>");
		}
		else {
			$("#comment_count").html("<h3>COMMENTS \(" + json.count + "\)</h3>");
		}*/
		$("#comment_count").html(json.count);
	});
}

function displayPagination(count){
	var totalpages = Math.ceil(parseInt(count)/vardisp);
	$(".comment_pagination").empty();
	if (totalpages == 1){
		return;
	}else{	
		var pag_string = "";
		pag_string += "<div id='pagination_comment'><ul>";
		
		if (varpage != 1){pag_string += "<li><a href'#apicomments' onClick=\"setOffsetAndGo("+parseInt(varpage-1)+","+vardisp+")\">Previous</a></li>";}
		for (i = 1; i < (totalpages+1); i++){
			if (i == varpage){
				pag_string += "<li><a>"+i+"</a></li>";
			} else {
				pag_string += "<li><a href='#apicomments' name='apicomments' onClick=\"setOffsetAndGo("+i+","+vardisp+")\">"+i+"</a></li>";
			}
		}
		if (varpage < totalpages){pag_string += "<li><a href='#apicomments' onClick=\"setOffsetAndGo("+parseInt(varpage+1)+","+vardisp+")\">Next</a></li>";}

		pag_string += "</ul></div>";
		$(".comment_pagination").html(pag_string);
	}
}

function setOffsetAndGo(page,disp){
	varpage = page;
	vardisp = disp;
	getComments(theType);
}

function getComments(theType) {
	cacheBust = Math.floor(Math.random()*100001);
	$.ajax({
		type: "GET",
		url: "/api/js/CommentsByArticle/" + articleID + "_"+varpage+"_"+vardisp+"?cachebust=" + cacheBust,
		error: function(){
		},
		success: function(data){		
			// Evaluate and Output the Comment data.
			commentsObject = eval('(' + data + ')');
			if (theType == "article"){			
			$("#comment_container").empty();
			
			if (document.commentPost.commentText.value != "" || document.commentPost.commentText.value != null || document.commentPost.comment_title.value != "" || document.commentPost.comment_title.value != null) {
				document.commentPost.comment_title.value = "";
				document.commentPost.commentText.value = "";
			}
			
			$.each(commentsObject, function(i, item){
				
				var comment_title_c = item.comment_title;
				var comment_post_date = item.post_date;
				var comment_post_time = item.post_time;
				var comment_text_c = item.comment_text;
				var abuseLink = null;
				
				if (!comment_title_c) {
					comment_title_c = "(No Subject)";
				}
				if (!comment_post_date) {
					comment_post_date = "&nbsp;";
				}
				if (!comment_post_time) {
					comment_post_time = "&nbsp;";
				}
				if (!comment_text_c) {
					comment_text_c = "&nbsp;";
				}
				if (loggedInNow == true) {
					abuseLink = "<a href='#' onclick='javascript:reportAbuse(" + item.comment_id + ");'><div class='blog_comment_report_abuse' id='reportlnk'>Report Abuse</div></a>"
				} else {
					abuseLink = "<a href='#' onclick='javascript:reportAbusePrompt(" + item.comment_id + ");'><div class='blog_comment_report_abuse' id='reportlnk'>Report Abuse</div></a>"
				}
				
				//$("#comments").append("<div class='comment'><div class='blog_comment_title_cont'><div class='blog_comment_title'>" + comment_title_c + "</div><div class='blog_comment_time'>" + comment_post_time + "</div><div class='blog_comment_date'>" + comment_post_date + "</div></div><div class='blog_comment_user_name_cont'><div class='blog_comment_user_name'><b>Posted by: </b>" + item.user_name + "</div>" + abuseLink + "</div><div class='blog_comment_text'>" + comment_text_c + "</div></div>");
				$("#comment_container").append("<div class='comment'><p class='comment_title'>" + comment_title_c + "</p><p class='comment_time'>" + comment_post_time + "</p><p class='comment_dateby'>" + comment_post_date + "<br />Posted by: <span class='commentusername'>" + item.user_name + "</span></p><p class='report_abuse'>" + abuseLink + "</p><div class='clear'></div><p class='comment_text'>" + comment_text_c + "</p></div>");
			});
			}
			if (theType == "recipe"){
				$("#comment_container").empty();
				
				if (document.commentPost.commentText.value != "" || document.commentPost.commentText.value != null ) {
					document.commentPost.commentText.value = "";
				}
			
				$.each(commentsObject, function(i, item){
					var commentRating = '';
					if (theType == "recipe" && item.comment_title == null ){
						if (item.article_rating == 0 || item.article_rating == null || item.article_rating == "undefined"){
							commentRating = "<ul></ul>";
						} else {
							commentRating = '<ul class="rating" style="margin-left:10px;">';
							for(var _i=1; _i<=5; _i++) {
								if(_i<= item.article_rating) {
									commentRating += '<li><img src="/cm/delish/tmpl_images/icon_staron.gif" alt="Star" /></li>';
								} else {
									commentRating += '<li><img src="/cm/delish/tmpl_images/icon_star.gif" alt="No Star" /></li>';
								}
							}
							commentRating += '</ul>';
						}
					}else{
						if (item.article_rating == 0 || item.article_rating == null || item.article_rating == "undefined"){
							commentRating = "<ul></ul>";
						} else {
							commentRating = '<ul class="rating" style="margin-left:10px;">';
							for(var _i=1; _i<=5; _i++) {
								if(_i<= item.article_rating) {
									commentRating += '<li><img src="/cm/delish/tmpl_images/icon_staron.gif" alt="Star" /></li>';
								} else {
									commentRating += '<li><img src="/cm/delish/tmpl_images/icon_star.gif" alt="No Star" /></li>';
								}
							}
							commentRating += '</ul>';
						}
					}
					
					if(loggedInNow==true){
						$("#comment_container").append('<p class="says"><a href="/rf/user/' + item.user_name + '/recipebook/">' + item.user_name + '</a> says:</p>' + commentRating + '<p>' + item.comment_text + '</p><p class="report" id="report_'+item.comment_id+'"><a href="#" onclick="javascript:reportAbuse(' + item.comment_id + ');return false;">Report abuse</a></p><hr />');
					}else{
						$("#comment_container").append('<p class="says"><a href="/rf/user/' + item.user_name + '/recipebook/">' + item.user_name + '</a> says:</p>' + commentRating + '<p>' + item.comment_text + '</p><p class="report" id="report_'+item.comment_id+'"><a href="#" onclick="javascript:reportAbusePrompt(' + item.comment_id + ');return false;">Report abuse</a></p><hr />');
					}
				});
			}
			displayCommentCount2();
			loggedIn("article");
		}
	});
}
function addComment(theType) {
	var comment_text = document.commentPost.commentText.value;
	var comment_tags = document.commentPost.commentTags.value;
	
	if (comment_text == "" || comment_text == null) {
		alert("Please enter text for this comment.");
		return false;
	} else {
		if (theType == "article") {			
			var comment_title = document.commentPost.comment_title.value;
			
			var theCommentObj = {"article_id":articleID, "comment_title": comment_title, "comment_text":comment_text, "per_page": vardisp};
			
			$.ajax({
				type: "POST",
				url: "/api/js/Comment",  
				data: theCommentObj,
				error: function(){
					//alert("that didn't work.");
				},
				success: function(){
					getComments(theType);
				}
			});
		}
		if (theType == "recipe") {
			var rating = document.commentPost.rating.value;
			var comment_title = document.commentPost.comment_title.value;
			var theCommentObj = {"article_id":articleID, "rating": rating, "comment_title": comment_title, "comment_text":comment_text, "per_page": vardisp};
			
			$.ajax({
				type: "POST",
				url: "/api/js/RecipeComment",  
				data: theCommentObj,
				error: function(){
					//alert("that didn't work.");
				},
				success: function(){
					getComments(theType);
				}
			});
		}
	}
}

function loggedIn(theType) {
	if(theType == "article") {
		if (!loggedInNow) {
			$("#commentPostingForm").css("display", "none");
			$("#commentLoginForm").css("display", "block");
			$("#post_comment").css("display", "none");
		} else {
			$("#commentPostingForm").css("display", "block");
			$("#commentLoginForm").css("display", "none");
			$("#post_comment").css("display", "block");
		}	
	}
	if(theType == "recipe") {
		if (!loggedInNow) {
			$("#comment_form").css("display", "none");
		} else {
			$("#comment_login").css("display", "none");
		}
	}
}

function addRecipeLogin(theType) {
	if(theType == "recipe") {
		if (!loggedInNow) {
			$("#saveBox").css("display", "none");
		} else {
			$("#loginMsg").css("display", "none");
		}
	}
}

function charLimit(){
	var userPost = document.commentPost.commentText.value;
	var len = userPost.length;
	if(len > charCount){
		userPost = userPost.substring(0,charCount);
		document.commentPost.commentText.value=userPost;
		return false;
	}
	document.commentPost.watchCharCount.value=charCount-len;
	if(charCount-len <= 0){
		alert("You've reached the maximum length. This post may be truncated.");
		return false;
	}
}

function checkChars(){
	if(document.commentPost.watchCharCount.value >= 1700){
		alert("You've reached the maximum length. This post may be truncated.");
		return false;
	}else{
		addComment(theType);
	}
}
function reportAbuse(comment_id){
	var id = comment_id;
	var popWin = window.open('','popForm','width=450,height=330');
	popWin.location="/comments/report-this?comment_id="+id;
	popWin.focus(); 
}

function reportAbusePrompt(comment_id){
	var id = comment_id;
	var url = document.URL;
	//alert(url);
	var popWin = window.open('/comments_report_abuse_login?comment_id='+id+'&pUrl='+url,'popForm','width=450,height=330,resizable=1');
	popWin.focus();
}



