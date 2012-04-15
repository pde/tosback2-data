
//begin document ready
$(document).ready(function(){

// 01. Whole Block Clickable 						   
	$(".inner-nav li").click(function(){
    	window.location=$(this).find("a").attr("href");return false;
	});
	
	$(".more-contact").bind("click",function(){
		$('div#form-slide').toggle('slow');
	});



// form labels inside form instead of next to it

	var myText = "Comment";
	$("#comment").val(myText).bind("focus", function()
	{
	    if($(this).val() == myText)
	        $(this).val("");
	}).bind("blur", function()
	{
	    if($(this).val() == "")
	        $(this).val(myText);
	});
	
	var myText1 = "Company Name";
	$("#company").val(myText1).bind("focus", function()
	{
	    if($(this).val() == myText1)
	        $(this).val("");
	}).bind("blur", function()
	{
	    if($(this).val() == "")
	        $(this).val(myText1);
	});
	
	
	var myText2 = "E-mail (Required)";
	$("#email").val(myText2).bind("focus", function()
	{
	    if($(this).val() == myText2)
	        $(this).val("");
	}).bind("blur", function()
	{
	    if($(this).val() == "")
	        $(this).val(myText2);
	});
	
	var myText3 = "Name (Required)";
	$("#author").val(myText3).bind("focus", function()
	{
	    if($(this).val() == myText3)
	        $(this).val("");
	}).bind("blur", function()
	{
	    if($(this).val() == "")
	        $(this).val(myText3);
	});

 
	var myText4 = "Zip";
	$("#zip").val(myText4).bind("focus", function()
	{
	    if($(this).val() == myText4)
	        $(this).val("");
	}).bind("blur", function()
	{
	    if($(this).val() == "")
	        $(this).val(myText4);
	});

 	var myText5 = "Phone Number";
	$("#phone").val(myText5).bind("focus", function()
	{
	    if($(this).val() == myText5)
	        $(this).val("");
	}).bind("blur", function()
	{
	    if($(this).val() == "")
	        $(this).val(myText5);
	});



// COLOR BOX
	//This hides the inline content if JavaScript is supported.
/* 			document.write("<style type='text/css'>.hidden{display:none;}<\/style>"); */

				//Examples of Global Changes
				$.fn.colorbox.settings.bgOpacity = "0.9";
				$("a[rel='dmp']").colorbox({transition:"elastic"});
				$(".inline").each(function()
					{ 
					    //var index = $('span').index($(this).parent('span'));
					    var id = $(this).attr('id')+'div';
					    //var selector = "span:eq("+index+") > div";
					    var selector = "#"+id;
						$(this).colorbox({fixedWidth:"600px",inline:true, href:selector}); 
					}); 




//Form

	$("#contact-static").FormValidate();
	$("#contact-include").FormValidate();


//hovers for carousel
//		$("#featured-text").children('span').hide();		

$('#featured-products').children('li').hover(
	function(){
		var cap = $(this).children('div').html();
		$("#featured-text").children('div').fadeOut('fast',function(){
			$(this).html(cap).fadeIn('fast');
		})
	},
	function(){
		return true;
	});
//carousel for front page
$('#featured-products').jcarousel();


//Fancy Box
$("a.dmp-gallery").fancybox();
$("a.fancy").fancybox();
// end document ready
	});