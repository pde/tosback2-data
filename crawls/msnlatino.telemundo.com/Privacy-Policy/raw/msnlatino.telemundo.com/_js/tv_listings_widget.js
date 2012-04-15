var LISTING_SERVICE='/response/tvlistings.php';
var LISTING_BLOCK_HOURS=3;
var WEEK_START=1;
var PRIMETIME_START=19;
var DEFAULT_SHOW_ICON='telemundo_generic.jpg';
var ICONS_PATH='/_images/tv_icons/';
var ANIMATE_SPEED=500; //speed of animations, in milliseconds
//var WEEK_OFFSET=WEEK_START*(60*60*24);
if($.browser.safari){
	$(window).load(function(){
		// var position=$('ul#listing_days li.selected').position();
		// alert('position.left: '+position.left+','+position.top);
		var list=new tvListings();


	});	
}
else{
	$(document).ready(function(){
		// var position=$('ul#listing_days li.selected').position();
		// alert('position.left: '+position.left+','+position.top);
		var list=new tvListings();


	});
}


function tvListings(){
	this.listings=[];
	this.listing_block_length=LISTING_BLOCK_HOURS*60*60;
	this.selected_day=false;
	this.current_day=0;  //currently selected day
	this.time_offset;  //offset from midnight, in seconds
	this.day_offset; //day offset from start of the week, in seconds
	this.week_start_time; //midnight on the start of the week
	this.current_data;
	this.now; //time it is now, in seconds
	this.set_interval();
	var self=this;
	if($.browser.msie && $.browser.version<7)
	{
		$('ul#listing_days li a').attr('href','javascript:;');
	}
	$('ul#listing_days li a').each(function(i){
		$(this).bind('click',function(){self.load_day((i+WEEK_START)%7)});
	});
	var d=new Date();
	this.now=Math.floor(d.getTime()/1000);
//	$('button#listing_primetime').bind('click',function(){self.go_primetime()});
	$('li#listing_primetime').bind('click',function(){self.go_primetime()});
//	$('button#listing_now').bind('click',function(){self.go_now()});
	$('li#listing_now').bind('click',function(){self.go_now()});
	this.load_day(this.current_day);
}
tvListings.prototype.go_primetime = function(){
	var d = new Date();
	var today=d.getDay();
	this.set_interval(this.week_start_time+(today*60*60*24)+(PRIMETIME_START*60*60));
	this.load_day(today);
	$('#listing_top').html($('li#listing_primetime a').text());
}
tvListings.prototype.go_now = function(){
	var d=new Date();
	this.now=Math.floor(d.getTime()/1000);
	this.set_interval(this.now);
	this.load_day(d.getDay());
	$('#listing_top').html($('li#listing_now a').text());
}
tvListings.prototype.set_interval = function(){ //sets week start and time offsets for the current viewable window
	var time_start=arguments[0]?arguments[0]:false;
	var d = new Date();
	if(time_start){d.setTime(time_start*1000);}
	var seconds=Math.floor(d.getTime()/1000);
	this.current_day=d.getDay();
	this.day_offset=(this.current_day*60*60*24);
	this.time_offset=(d.getSeconds())+(d.getMinutes()*60)+(d.getHours()*60*60);
	this.week_start_time=seconds-this.time_offset-this.day_offset;
	
//	this.week_start_time+=WEEK_OFFSET;
	
	
}
tvListings.prototype.load_day = function(day){
	var self=this;
	$.ajax({
		type: "GET",
		url: LISTING_SERVICE,
		dataType: "json",
		processData: true,
		data: this.get_start_end(day),
		success: function(d){
				self.go_day(day);
				self.display_data(d);
			}
	});
}
tvListings.prototype.display_data = function(data){
	data=data['programs'];
	var list='';
	for(var i=0;i<data.length;i++){
		var curr=data[i];
		var show_name;
		var image=DEFAULT_SHOW_ICON;
		if(curr["url"]!==undefined){
			show_name='<a href="'+curr['url']+'">'+curr['title']+'</a></dt>'
			image=this.parse_url_to_show_icon(curr['url']);
			
		}
		else{
			show_name=curr['title'];
		}
		var selected='';
		
		if(curr['sec_air_time']<=this.now && curr['sec_end_time']>=this.now){
			selected=' selected';
		}
		list+='<li class="tv_listing_'+(i+1)+selected+'" ><dl><dt>'+show_name+'</dt><dd class="show_time">'+this.parse_time(curr['air_time'])+'</dd><dd class="show_image"><img src="'+ICONS_PATH+image+'" width="48" height="31" /></dd></dl></li>';
	}
	$('ul.listings_list#next_listing').html(list);
	$('ul.listings_list#next_listing').fadeIn(ANIMATE_SPEED);
	$('ul.listings_list#current_listing').fadeOut(ANIMATE_SPEED);
	$('ul.listings_list#current_listing').attr('id','listing_swap');
	$('ul.listings_list#next_listing').attr('id','current_listing');
	$('ul.listings_list#listing_swap').attr('id','next_listing');
	
}
tvListings.prototype.parse_url_to_show_icon = function(url){
	url=url.replace(/^.*\/([^\/]+)\/?$/,'$1');
	url=url.toLowerCase();
	return url+'.jpg';
	
}
tvListings.prototype.parse_time = function(time){
	var t=time.split(/:/);
	var hours=parseInt(t[0]);
	var minutes=parseInt(t[1]);
	var ampm='am';
	if(hours===0){
		hours='12';
	}
	else if(hours>=12){
		ampm='pm';
		if(hours!==12){
			hours=hours-12;
		}
	}
	if(minutes!==0){
		minutes=':'+minutes;
	}
	else{
		minutes='';
	}
	return hours+minutes+ampm;
}
tvListings.prototype.go_day = function(day){
	var list_selected=(day-WEEK_START);
	if(list_selected<0){list_selected+=7}
	var pos;
	if(this.selected_day===false){
		$('ul#listing_days li:eq('+list_selected+')').addClass('selected');
		pos=$('ul#listing_days li.selected').position();
		var w=$('#tv_listings div#selected_box').width();
		var h=$('#tv_listings div#selected_box').height();
		$('#tv_listings div#selected_box').css({left:(pos.left-4),top:pos.top,display:'block'});
	}
	else{
		$('ul#listing_days li.selected').removeClass('selected');
		$('ul#listing_days li:eq('+list_selected+')').addClass('selected');
		pos=$('ul#listing_days li.selected').position();
		$('#tv_listings div#selected_box').animate({left:(pos.left-4),top:pos.top},ANIMATE_SPEED);
	}
	this.selected_day=list_selected;
	
}

tvListings.prototype.get_start_end = function(day){
	var start=this.week_start_time+this.time_offset+(day*60*60*24);
	return {'start':start,'end':(start+this.listing_block_length)};
	
}