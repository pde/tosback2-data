// JavaScript Document
//@Author: tmoussignac@nypost.com

$(document).ready(function(){
						   
	//*************! important *******************/

	$('ul.poll_mini li').each(function(i){
			$(this).find(".poll_graph").animate({"width" : $(this).find('span').text() + "px"});	
	});
	
	/*wide two choice polls*/
	/*var poll_data_1 = parseInt($(".poll_two_choice").find("ul.poll_select").find("li.data_left").find("h6").find("span").text());
	var poll_data_2 = parseInt($(".poll_two_choice").find("ul.poll_select").find("li.data_right").find("h6").find("span").text());
	if(poll_data_1 > poll_data_2){
		$(".poll_two_choice").find("ul.poll_select").find("li.data_left").addClass("red");
	}if(poll_data_2 > poll_data_1){
		$(".poll_two_choice").find("ul.poll_select").find("li.data_right").addClass("red");
	}else{}*/
	
	//poll actions end

});