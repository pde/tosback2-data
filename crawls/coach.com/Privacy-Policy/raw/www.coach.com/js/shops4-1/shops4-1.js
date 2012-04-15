// JavaScript Document

$(function(){
       $(".swap").click(function () {
      		 $(this).fadeOut("fast", function () {
              	 $(this).toggleClass("on").fadeIn("fast");
      		 });
		});
});
