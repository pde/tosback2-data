// JavaScript Document

function hideOverflow(){

	var max_height = 355; //hide articles when this height is exceeded

	var tot_height = 0;

	for(i=0;i<document.getElementById('NewStuff').getElementsByTagName('li').length;i++){

		tot_height += document.getElementById('NewStuff').getElementsByTagName('li')[i].offsetHeight;

		if(tot_height>max_height){

			document.getElementById('NewStuff').getElementsByTagName('li')[i].style.display = "none";

		}//else{
//
//			document.getElementById('NewStuff').getElementsByTagName('li')[i].getElementsByTagName('a')[0].style.color = "#000000";	
//
//		}

	}

}
function hideOverflowHP(){

	var max_height = 305; //was 315 hide articles when this height is exceeded

	var tot_height = 0;

	for(i=0;i<document.getElementById('NewStuff').getElementsByTagName('li').length;i++){

		tot_height += document.getElementById('NewStuff').getElementsByTagName('li')[i].offsetHeight;

		if(tot_height>max_height){

			document.getElementById('NewStuff').getElementsByTagName('li')[i].style.display = "none";

		}//else{
//
//			document.getElementById('NewStuff').getElementsByTagName('li')[i].getElementsByTagName('a')[0].style.color = "#000000";	
//
//		}

	}

}

function img_swap(img_ID,nameoffile){
	document.getElementById(img_ID).setAttribute('src',nameoffile);
}
function jqgetComment(id){
	$.getJSON("/api_static/js/CommentsByArticle/" + id + "_count", function(json){
		if (parseInt(json.count) == 0){
			$(".comment_count_"+id).html("no comments");
		} else if(parseInt(json.count) == 1) {
			$(".comment_count_"+id).html(json.count+" comment");
		} else {
			$(".comment_count_"+id).html(json.count+" comments");
		}
	});
}
function loadPage(list) {
  location.href=list.options[list.selectedIndex].value
}

function reportingAbuse(comment_id){
if (!!mag_user.logged_in){
  var id = comment_id;
  var popWin = window.open('/comments/report-this?comment_id='+id,'popForm','width=450,height=330');
  popWin.focus();
} else {
  var id = comment_id;
  var url = document.URL;
  //alert(url);
  var popWin = window.open('/comments_report_abuse_login?comment_id='+id+'&pUrl='+url,'popForm','width=450,height=330,resizable=1');
  popWin.focus();
}
}

/* prevent exec script in search box */
$(document).ready(function(){
            
	$("form[action='/search/'] a")
	.attr("href","#")
	.click(function(e){
				e.preventDefault();
				$(this).parents("form").submit();    
	});

	$("form[action='/search/']").submit(function(){
				$input = $("input[name=q]",this);
				//get unsafe search string 
				var s = $input.val();
				//replace
				s = s.replace(/</g,'&lt;').replace(/>/g,'&gt;');
				//set safe search string 
				$input.val(s);
	});

});