// JavaScript Document
//@Author: tmoussignac@nypost

$(document).ready(function() {
	/***************! important ****************/					   
	//tabs
	function initTabs(object, rotation){$(object).tabs({ cache: true }).tabs('rotate', rotation);}	
	/*************** important !****************/
	
	//---------init functions
	
	//most popular nav
	initTabs('#most_popular_nav');
	$('#most_popular ul#most_popular_nav').css({'visibility':'visible'});	
})