// JavaScript Document
/* Author: tmoussignac@nypost.com */

$(document).ready(function(){
	/***************! important ****************/					   
	//tabs
	function initTabs(object, rotation){$(object).tabs({ cache: true }).tabs('rotate', rotation);}	
	/*************** important !****************/
	
	//---------init functions
	
	//most popular nav
	initTabs('.section_blocks_tabs_nav');
	$('.section_blocks_tabs_nav').css({'visibility':'visible'});					   
	/*blocks hover effects*/
	$('.story_list').find("ul.story_list_holder").find("li").hover(
		function(){ $(this).find("h4").css({'color':'#c00'}); },
		function(){ $(this).find("h4").css({'color':'#000'}); }
     );
	$('.block_def').find(".data_block").hover(
		function(){ $(this).find("h4").css({'color':'#c00'}); },
		function(){ $(this).find("h4").css({'color':'#000'}); }
     );
	$('ul.links').find("li.link_block").hover(
		function(){ $(this).find("h5").css({'color':'#c00'}); },
		function(){ $(this).find("h5").css({'color':'#000'}); }
     );	
	$('.block_def').find(".sec_block_sm_data").hover(
		function(){ $(this).find("h2").css({'color':'#c00'}); },
		function(){ $(this).find("h2").css({'color':'#000'}); }
     );
	
	//Filter Alexa stories
	$('.section_block_detail_list > li').each(function(u){
		if(this.getAttribute('onclick').toLowerCase().match(/alexa/i) !== null){
			this.className = 'alexa_story';
		}
	});
	
	
});