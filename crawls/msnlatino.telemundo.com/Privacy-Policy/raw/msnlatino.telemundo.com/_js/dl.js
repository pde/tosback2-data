function create_dl()
{
	var dl=new dynamicLead()
}
function dynamicLead()
{
	this.dl_data=[];
	this.animate_speed=500;
	this.current_index=0;
	this.dl_ids=['mod_dl_microsites_alt','mod_dl_microsites','mod_dl_photos'];
	this.current_dl_id=false;
	this.image_width=0;
	this.image_height=0;
	var self=this;
	for(var i=0;i<this.dl_ids.length;i++){
		if($('#'+this.dl_ids[i]).length){
			this.current_dl_id=this.dl_ids[i];
			break;
		}
	}
	if(!this.current_dl_id){return;}
	if(this.current_dl_id==='mod_dl_microsites_alt'){
		this.animate_speed=100;
	}
	this.image_width=$('#'+this.current_dl_id+' ul.content li:first-child dd.uxd_T img').attr('width')
	this.image_height=$('#'+this.current_dl_id+' ul.content li:first-child dd.uxd_T img').attr('height');
	this.parse_dl();

}
dynamicLead.prototype.bind_arrows = function(){
	var self=this;
	$('#'+this.current_dl_id+' ul.arrows li.go_left').bind('click',function(){self.go_left()});
	$('#'+this.current_dl_id+' ul.arrows li.go_right').bind('click',function(){self.go_right()});
}
dynamicLead.prototype.unbind_arrows = function(){
	$('#'+this.current_dl_id+' ul.arrows li').unbind();
}
dynamicLead.prototype.parse_dl = function(){
	var self=this;
	$('#'+this.current_dl_id+' ul.content li').removeClass('hidden');
	// $('#'+this.current_dl_id+' li').removeClass('first');
	// $('#'+this.current_dl_id+' li').removeClass('last');
	$('#'+this.current_dl_id+' ul.content li').each(function(i){
		var current=[];
		current['title']=$("dt",this).html();
		current['image']=$("dd.uxd_T",this).html();
		current['text']=$("dd.dl_description",this).html();
		current['link']=$("dd.dl_link",this).html();
		self.dl_data.push(current);
		if(self.current_dl_id==='mod_dl_microsites_alt'){
			$(this).bind('mouseover',function(){
				self.new_selection(i);
			});
		}
		$(this).wrapInner('<div class="dl_content_wrapper"></div>');
	
	});
	if( (this.current_dl_id==='mod_dl_microsites' || this.current_dl_id==='mod_dl_photos') && (this.dl_data.length > 1) ){

		var bg_l=$('#'+this.current_dl_id+' div.browse_tab_nav li:first-child a').css('background-image');
		var w_l=$('#'+this.current_dl_id+' div.browse_tab_nav li:first-child a').css('width');
		var h_l=$('#'+this.current_dl_id+' div.browse_tab_nav li:first-child a').css('height');
		
		var bg_r=$('#'+this.current_dl_id+' div.browse_tab_nav li:last-child a').css('background-image');
		var w_r=$('#'+this.current_dl_id+' div.browse_tab_nav li:last-child a').css('width');
		var h_r=$('#'+this.current_dl_id+' div.browse_tab_nav li:last-child a').css('height');
		$('#'+this.current_dl_id+' div.browse_tab_nav').remove();
		
		$('#'+this.current_dl_id).append('<ul class="arrows"><li class="go_left"></li><li class="go_right"></li></ul>');
		
		$('#'+this.current_dl_id+' ul.arrows li.go_left').css({background:bg_l,width:w_l,height:h_l,backgroundRepeat:'no-repeat'});
		$('#'+this.current_dl_id+' ul.arrows li.go_right').css({background:bg_r,width:w_r,height:h_r,backgroundRepeat:'no-repeat'});
		
		this.bind_arrows();
	}
	
	var image_list='';
	for(var i=0;i<this.dl_data.length;i++)
	{
		image_list+='<li>'+this.dl_data[i]['image']+'</li>';
	}

	$('#'+this.current_dl_id).append('<div id="dl_image"><ul id="dl_image_list">'+image_list+'</ul></div>');
	this.image_height=$('#'+this.current_dl_id+' div#dl_image').height();
	this.image_width=$('#'+this.current_dl_id+' div#dl_image').width();
	if(this.current_dl_id==='mod_dl_microsites' || this.current_dl_id==='mod_dl_photos'){
		var pager_buttons='';
		for(var i=0;i<this.dl_data.length;i++)
		{
			pager_buttons+='<li><a></a></li>';
		}
		if(this.dl_data.length>1){
			pager_buttons='<div id="dl_pager"><ul>'+pager_buttons+'</ul></div>';
		}
		else{
			pager_buttons='';
		}
		$('#'+this.current_dl_id).append('<div id="dl_image_background" class="uxd_T"></div>'+pager_buttons);
		$('#'+this.current_dl_id+' ul#dl_image_list').width(this.image_width*this.dl_data.length);
		$('#'+this.current_dl_id+' div#dl_pager ul li').each(function(i){
			$(this).bind('click',function(){self.new_selection(i);});
		});
		
	}
	else
	{
		$('#'+this.current_dl_id).append('<div id="dl_selection"></div>');
		
	}
	this.new_selection(0);
	
}
dynamicLead.prototype.go_left = function(){
	var curr=(this.current_index-1)%this.dl_data.length;
	if(curr<0){curr=(this.dl_data.length+curr);}
	this.new_selection(curr);
}
dynamicLead.prototype.go_right = function(){
	this.new_selection((this.current_index+1)%this.dl_data.length);
}
dynamicLead.prototype.new_selection = function(index){
	if(this.current_dl_id==='mod_dl_microsites_alt'){
		$('#'+this.current_dl_id+' ul.content li').removeClass('selected');
		$('#'+this.current_dl_id+' ul.content li:eq('+index+')').addClass('selected');	
		var p=$('#'+this.current_dl_id+' ul.content li.selected').position();
		if(index === this.current_index){
			$('#'+this.current_dl_id+' #dl_selection').css({'top':p.top,'left':(p.left)});
		}
		else{
			$('#'+this.current_dl_id+' #dl_selection').animate({'top':p.top,'left':(p.left)},1);
			this.vertical_slide_image(index);
		}		
	}
	else{
		//selecting radio button
		$('#'+this.current_dl_id+' div#dl_pager ul li a').removeClass('selected');
		$('#'+this.current_dl_id+' div#dl_pager ul li:eq('+(index)+') a').addClass('selected');
		if(index === this.current_index){
			$('#'+this.current_dl_id+' ul.content li:eq('+index+')').addClass('selected');
		}
		else{
			this.unbind_arrows();
			this.horizontal_slide_image(index);
			this.fade_caption(index);
		}

	}

}
dynamicLead.prototype.fade_caption = function(next_index){
	var self=this;
	$('#'+this.current_dl_id+' ul.content li:eq('+next_index+') div.dl_content_wrapper' ).fadeIn(this.animate_speed);
	$('#'+this.current_dl_id+' ul.content li.selected div.dl_content_wrapper').fadeOut(this.animate_speed,function(){

		$('#'+self.current_dl_id+' ul.content li').removeClass('selected');
		$('#'+self.current_dl_id+' ul.content li:eq('+next_index+')').addClass('selected');
		self.bind_arrows();
	});
}
dynamicLead.prototype.horizontal_slide_image = function(next_index){
	var self=this;
	var new_left=-($('#'+this.current_dl_id+' div#dl_image ul#dl_image_list li:eq('+next_index+')').position().left);
	$('#'+this.current_dl_id+' div#dl_image ul#dl_image_list').animate({'left':new_left},this.animate_speed,function(){
		self.current_index=next_index;
	});
}
dynamicLead.prototype.vertical_slide_image = function(next_index){
	var self=this;
	var new_top=-($('#'+this.current_dl_id+' div#dl_image ul#dl_image_list li:eq('+next_index+')').position().top);
	$('#'+this.current_dl_id+' div#dl_image ul#dl_image_list').animate({'top':new_top},this.animate_speed,function(){
		self.current_index=next_index;
	});
}
