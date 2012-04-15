// JavaScript Document
//@Author:tmoussignac@nypost.com

$(document).ready(function(){
	
	
	//*****************! important ********************//
		
	//function use to enable object
	$('#bottom_controls').fadeIn('fast');
	function setObj(object){
		$(object).css({'background-position':'top left', 'color':'#fff', 'padding-right':'10px'})
		
	;}	
	//function use to disable object
	function unsetObj(object){
		$(object).css({'background-position':'top right', 'color':'#fff', 'padding-right':'5px'})
	;}
	//function use to control the display of an object
	function visibilityOn(object){$(object).fadeIn();}
	function visibilityOff(object){$(object).fadeOut();}
	
	//caroulsel function definition
	function initCarousel(object, numScroll, isWrap){$(object).jcarousel({ wrap: isWrap , initCallback: mycarousel_initCallback, scroll: numScroll });}
	
	//tabs function definition
	function initTabs(object, rotation){$(object).tabs({ cache: true }).tabs('rotate', rotation);}
	
	//ajax function definition --- use to load data ---- Be very careful with this function!!!
	function loadData(url_val, object_holder, jpt_path){
		
		var mediaData;
		var loading_gif = "<img class='loading_gif' src='/rw/SysConfig/WebPortal/nypost/images/loading_black_big.gif' alt='Loading...' />";
		var close_btn = "<img class='close' src='/rw/SysConfig/WebPortal/nypost/blocks/top_story/images/close_mini.png' alt='close' />";
		
	
		//alert("loadData() - url="+url_val);
	
		$(object_holder).html(loading_gif);
		
		if(mediaData == null){
			$.get(url_val,jpt_path,function(result){
				$('.media_loader').empty();
				$(object_holder).html(close_btn+result );
				initCarousel('#top_story_photo_list', 1);
				
				/*get gallery function starts */
				$('.jcarousel-next').click(function(){
					/* after 2nd pic -32 */
					/* after 3rd pic -64 */
					if(($('#top_story_photo_list').position().left) < -32){
						/* this is should a 4th parameter of the loadData function */			
						window.location = ("http://"+location.host+url_val.replace(/Fragment/, 'Page'));
					}
				});
				/*get gallery function ends */
				
				//close the loader
				$('img.close').click(function(){ 
					unsetObj(".media_video");
					unsetObj(".media_photo");
					visibilityOff(object_holder);
					$(object_holder).empty();
					$('#bottom_controls').css({'position':'relative','z-index': '4'});
				});
				mediaData = result;
				//alert(mediaData);
			});
		}else{
			//alert(mediaData);
			$(object_holder).html(mediaData);	
		}
	}
	
	
	
	//***************** important !********************//
	
	//-------------Init functions 	
	
	//top story nav

	initTabs('#top_story_nav');
	$('.top_story_nav_tab .story_link').click(function(){
	 if($('.narrow:has(.top_story_nav_tab .story_link)').length){
	   new_left = 60 + (parseInt($(this).html())-1)*140;
	 }else{
	   new_left = 70 + (parseInt($(this).html())-1)*155;
	 }
	  $('.media_loader').hide();
	   $('.media_loader').empty();
	  $('#top_story_pointer').animate({left: new_left+"px"},500);
	});
						   
	//*********home page block top_story actions and effects start********//
	
	//init media containers
	function initStory(){
		unsetObj(".media_video");
	  	unsetObj(".media_photo");
	  	visibilityOff(".media_loader");
	  	$('#bottom_controls').css({'position':'relative','z-index': '4'});
	}
	
	function initPhotos(){
		setObj(".media_photo");
	  	unsetObj(".media_video");
	  	visibilityOn(".media_loader");
	  	$('#bottom_controls').css({'position':'relative','z-index': '0'});
	}
	function initVideo(){
		setObj(".media_video");
	  	unsetObj(".media_photo");
	  	visibilityOn(".media_loader");
	  	$('#bottom_controls').css({'position':'relative','z-index': '0'});
	}
	
	//----------bottom left media buttons 
	/******top story content st********/
	
	//get the number of stories present
	var numOfStories =( parseInt($('#top_story_def').children().find('ul.media_controls').length));
	if(numOfStories == 1){ $('#top_story_def').css({'background-image' : 'none'}); }
	
	//top story 1 media
	var top_story_cont_1 = $('ul.media_controls').find('li#media_story_1').find('a')
	var top_story_photo_1 = $('ul.media_controls').find('li#media_photo_1').find('a');
	var top_story_video_1 = $('ul.media_controls').find('li#media_video_1').find('a');
	//top story 2 media
	var top_story_cont_2 = $('ul.media_controls').find('li#media_story_2').find('a')
	var top_story_photo_2 = $('ul.media_controls').find('li#media_photo_2').find('a');
	var top_story_video_2 = $('ul.media_controls').find('li#media_video_2').find('a');
	//top story 3 media
	var top_story_cont_3 = $('ul.media_controls').find('li#media_story_3').find('a')
	var top_story_photo_3 = $('ul.media_controls').find('li#media_photo_3').find('a');
	var top_story_video_3 = $('ul.media_controls').find('li#media_video_3').find('a');
	
	//top story 1 controls
	$(top_story_cont_1).bind('click', function(){
		initStory();
		return false;
	});
	$(top_story_photo_1).bind('click', function(){
		//initPhotos();						
		//loadData($(this).attr('href'),'#media_loader_1', {style:'$configurationURI/blocks/top_story/photo/media_photo.jpt'});
		url_val = $(this).attr('href');
		window.location = ("http://"+location.host+url_val.replace(/Fragment/, 'Page'));
		return false;
	});
	
	$(top_story_video_1).bind('click', function(){
		initVideo();										
		loadData($(this).attr('href'),'#media_loader_1', {style:'$configurationURI/blocks/top_story/video/media_video.jpt'});
		return false;										
	});
	
	//top story 2 controls
	$(top_story_cont_2).bind('click', function(){
		initStory();
		return false;
	});
	$(top_story_photo_2).bind('click', function(){
		//initPhotos();
		//loadData($(this).attr('href'),'#media_loader_2', {style:'$configurationURI/blocks/top_story/photo/media_photo.jpt'});
		url_val = $(this).attr('href');
		window.location = ("http://"+location.host+url_val.replace(/Fragment/, 'Page'));
		return false;
	});
	
	$(top_story_video_2).bind('click', function(){
		initVideo();										
		loadData($(this).attr('href'),'#media_loader_2', {style:'$configurationURI/blocks/top_story/video/media_video.jpt'});
		return false;										
	});
	
	//top story 3 controls
	$(top_story_cont_3).bind('click', function(){
		initStory();
		return false;
	});
	$(top_story_photo_3).bind('click', function(){
		//initPhotos();						
		//loadData($(this).attr('href'),'#media_loader_3', {style:'$configurationURI/blocks/top_story/photo/media_photo.jpt'});
		url_val = $(this).attr('href');
		window.location = ("http://"+location.host+url_val.replace(/Fragment/, 'Page'));
		return false;
	});
	
	$(top_story_video_3).bind('click', function(){
		initVideo();										
		loadData($(this).attr('href'),'#media_loader_3', {style:'$configurationURI/blocks/top_story/video/media_video.jpt'});
		return false;										
	});
	
	//top story nav btn tabs
	$("a.story_btn").click(function (){
		initStory();
		return false;
	});
	/******top story content end********/
						   				   
	/** show panel 2 & 3 **/
	$('#top_story_2').show();
	$('#top_story_3').show();	   
	

	if (top_story_video_1.attr('href') != null) {
		if($(top_story_video_1).attr('href').indexOf("livestream") != -1) {	
			initVideo();										
			loadData($(top_story_video_1).attr('href'),'#media_loader_1', {style:'$configurationURI/blocks/top_story/video/media_video.jpt'});
			return false;
		}
	}
})