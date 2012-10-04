//setup the ajax object
function setAjax(vars){
	var defaults={
		type: "GET",
		url: "/services/gateway.php",
		dataType: "json",
		processData: true
	};
	for(var i in vars){
		defaults[i]=vars[i];
	}
	return defaults;
}
function cacheAjax(vars){
	var defaults={
		type: "GET",
		url: "/cservices/gateway.php",
		dataType: "json",
		processData: true
	};
	for(var i in vars){
		defaults[i]=vars[i];
	}
	return defaults;
}


//message class to read and parse strings.xml
//as well as displaying the messages
function messenger(){
	this.messages={};
	this.default_message='';
	this.has_error=false;
	var self=this;
	$.ajax(setAjax({
		url:"/config/snasconfig/strings.xml",
		dataType: "xml",
		success: function(x){self.process_string_xml(x);}
	}));
}
messenger.prototype.process_string_xml = function(xml){
	var i=0;
	var self=this;
	$('string',xml).each(function(){
		var name=$(this).attr('name');
		var value=$(this).text();
		if($(this).attr('default')==='true' || i===0){
			self.default_message=value;
		}
		self.messages[name]=value;
		i++;
	});
}
messenger.prototype.get_message_string = function(){
	var code=arguments[0];
	var msg=this.messages[code];
	if(!msg){
		msg=this.default_message;
	}
	//this replaces anthing with $$NUM with the arguments after the code
	if(arguments.length>1 && msg.match(/\$\$/)){
		for(var i=1;i<arguments.length;i++){
			var re = new RegExp('\\$\\$'+i);
			msg=msg.replace(re,arguments[i]);
		}
	}
	return msg;
	
}
//d is the output from the gateway php
//message_box is the div to put the results in (it will just stick the text in there), if blank, use a lightbox
//output function is called to display any output
//use_internal_lightbox is set to the selector you want to place the internal alertbox
messenger.prototype.process_output = function(){
	//d,message_box,output_function, use_internal_lightbox
	var d=arguments[0];
	var message_box=arguments[1]?arguments[1]:'';
	var output_function=arguments[2]?arguments[2]:null;
	var internal_lightbox=arguments[3]!==undefined?arguments[3]:false;
	this.has_error=false;
	var called_hooks=false;
	if(d.hooks){
		for(var i=0;i<d.hooks.length; i++){
			var h=d.hooks[i]+'_hook';
			if(typeof window[h]=='function'){
				called_hooks=true;
				var func=window[h];
				func();
			}
		}
	}
	if(called_hooks){return;}
	if(d['errors']){
		this.has_error=true;
		this.display_errors(d['errors']);
		return;
	}
	if(output_function && typeof(output_function)=='function'){
		output_function(d['output']);
	}
	if(d['messages']){
		this.display_messages(d['messages'],message_box,internal_lightbox);
	}
}
//pops up an alertbox inside a selector
messenger.prototype.internal_alertbox = function(message,selector){
	var can_remove=arguments[2]!==undefined?arguments[2]:true; //if this is false, the user can't remove the box
	var add_class=arguments[3]!==undefined?' '+arguments[3]:'';
	if($.browser.msie && $.browser.version<7){ //do not add the second class to ie6, as you can't match properly to both classes
		add_class='';
	}
	var self=this;
	var sel_w=$(selector).outerWidth();
	var sel_h=$(selector).outerHeight();
	var old_pos=$(selector).css('position');
	$(selector).css('position','relative');
	$(selector).append('<div class="G_internal_alertbox'+add_class+'"></div><div class="G_internal_alertbox_message'+add_class+'">'+message+'</div>');
	$('.G_internal_alertbox',selector).css({width:sel_w,height:sel_h,position:'absolute',opacity:'0.5',top:0,left:0});
	var msg_w=$('.G_internal_alertbox_message',selector).outerWidth();
	var msg_h=$('.G_internal_alertbox_message',selector).outerHeight();
	var msg_left=Math.floor((sel_w-msg_w)/2);
	var msg_top=Math.floor((sel_h-msg_h)/2);
	$('.G_internal_alertbox_message',selector).css({position:'absolute',top:msg_top,left:msg_left});
	if(can_remove){
		$('.G_internal_alertbox',selector).bind('click',function(){self.remove_internal_alertbox(selector);});
		$('.G_internal_alertbox_message',selector).bind('click',function(){self.remove_internal_alertbox(selector);});
	}
}

messenger.prototype.remove_internal_alertbox = function(selector){
	$('.G_internal_alertbox',selector).remove();
	$('.G_internal_alertbox_message',selector).remove();
}

messenger.prototype.wait_on = function(selector){
	this.internal_alertbox(this.get_message_string('PLEASE_WAIT'),selector,false,'G_internal_wait');
}
messenger.prototype.wait_off = function(selector){
	this.remove_internal_alertbox(selector);
}

messenger.prototype.alertbox = function(text){
	var self=this;
	var ww=$(window).width();
	var wh=$(window).height();
	var dw=$(document).width();
	var dh=$(document).height();
	var yo=0;
	var xo=0;
	if( typeof( window.pageYOffset ) == 'number' ) {
	  //Netscape compliant
	  yo = window.pageYOffset;
	  xo = window.pageXOffset;
	} else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
	  //DOM compliant
	  yo = document.body.scrollTop;
	  xo = document.body.scrollLeft;
	} else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
	  //IE6 standards compliant mode
	  yo = document.documentElement.scrollTop;
	  xo = document.documentElement.scrollLeft;
	}
	$('body').append('<div id="lightbox"></div>');
	$('#lightbox').css('opacity','0.2');
	$('#lightbox').css({'width':dw+xo,'height':dh+yo});
	$('body').append('<div id="gateway_message_alertbox">'+text+'</div>');
	$('#gateway_message_alertbox').bind('click',function(){self.remove_alertbox()});
	var mw=$('#gateway_message_alertbox').width();
	var mh=$('#gateway_message_alertbox').height();
	$('#gateway_message_alertbox').css({'left':(Math.floor((ww-mw)/2)+xo),'top':(Math.floor((wh-mh)/2)+yo)});
	
	$('#lightbox').bind('click',function(){self.remove_alertbox()});
}
messenger.prototype.remove_alertbox = function(){
	$('#lightbox').remove();
	$('#gateway_message_alertbox').remove();
}
messenger.prototype.display_messages = function(m,box,internal_lightbox){
	var o='';
	for(var i=0;i<m.length;i++){
		o=m[i]+"<br/>";
	}
	if(box!==''){
		$(box).html(o);
	}
	else if(internal_lightbox){
		this.internal_alertbox(o,internal_lightbox);
	}
	else{
		this.alertbox(o);
	}
}
messenger.prototype.display_errors = function(e){
	var internal_alert=arguments[1]!==undefined?arguments[1]:false; //pass a selector to put the alert inside
	if(!e){
		return;
	}
	if(typeof(e)=='string'){
		e=[this.get_message_string(e)];
	}
	var m='';
	for(var i=0;i<e.length;i++){
		m+=e[i]+"</br>";
	}
	if(!internal_alert){
		this.alertbox(m);
	}
	else{
		this.internal_alertbox(m,internal_alert);
	}
	
}
messenger.prototype.format_date = function(d){
	var h=d.getHours();
	var ampm='AM';
	if(h>12){
		ampm='PM';
		h-=12;
	}
	if(h===0){
		h=12;
	}
	var out=this._date_zero_add(h)+':'+this._date_zero_add(d.getMinutes())+':'+this._date_zero_add(d.getSeconds());
	out+=' '+(d.getMonth()+1)+'/'+(d.getDate())+'/'+(d.getFullYear());
	return out;
}
messenger.prototype._date_zero_add = function(num){
	if(num<10){
		num='0'+num;
	}
	return num;
}
//object to flag content
function flagger(msg){
	this.messenger=msg;
}
flagger.prototype.flag_by_contentID = function(id){
	var self=this;
	if(id){
		$.ajax(setAjax({
			data: {'action':'flagContentByID','contentID':id},
			success: function(d){
				self.messenger.process_output(d)
				}
		}));
	}
}
var GATEWAY_MESSENGER=new messenger();
var m=GATEWAY_MESSENGER;
var GATEWAY_FLAGGER=new flagger(GATEWAY_MESSENGER);
var f=GATEWAY_FLAGGER;
var c;
(function($){
	var settings;
	var last=0;
	var content_data=[];
	var templates=[];
	var atPages=[];
	var numComments=[];
	$.fn.snasCommenting = function(options){
		settings = $.extend({}, $.fn.snasCommenting.defaults, options);
		if(!(settings.action_function && typeof settings.action_function==='function')){
			settings.action_function=function(){};
		}
		if(settings.messenger===undefined){
			if(typeof(GATEWAY_MESSENGER) === 'object'){
				settings.messenger=GATEWAY_MESSENGER;
			}
			else{
				return;
			}
		}
		if(settings.flagger===undefined){
			if(typeof(GATEWAY_FLAGGER) === 'object'){
				settings.flagger=GATEWAY_FLAGGER;
			}
			else{
				return;
			}
		}
		var self=this;
		$(this).each(function(){
			var curr_id=last;
			var curr=this;
			last++;
			templates[curr_id]={};
			atPages[curr_id]=1;
			numComments[curr_id]=0;
			if($('.comment_template .single_comment',this).length){
				templates[curr_id].comment_template=unescape($('.comment_template .single_comment',this).html());
			}
			else{
				templates[curr_id].comment_template=settings.comment_template;
			}
			if($('.comment_template .flag_comment',this).length){
				templates[curr_id].flag_comment_template=unescape($('.comment_template .flag_comment',this).html());
			}
			else{
				templates[curr_id].flag_comment_template=settings.flag_comment_template;
			}
			if($('.num_comment_template',this).length){
				templates[curr_id].num_comment_template=unescape($('.num_comment_template',this).html());
			}
			else{
				templates[curr_id].num_comment_template=settings.num_comment_template;
			}
			
			//if the selector does not have the proper items, replace it with the default
			if(!($('.messages',this).length && $('.comments',this).length && $('.commentText',this).length)){
				$(this).html(settings.entry_template);
			}
			$.fn.snasCommenting.bindEvents(curr,curr_id);
			if($('button[type=cancel]',this).length){
				$('button[type=cancel]',this).bind('click',function(e){e.preventDefault();$('textarea',self).val('');});
			}
			$(this).attr('snasCommenting_id',curr_id);
			content_data[curr_id]=set_content_data(settings,this);
			$.fn.snasCommenting.get_comments(this,curr_id);
		});
	}
	$.fn.snasCommenting.bindEvents = function(curr,curr_id){
		$('form',curr).submit(function(e){$.fn.snasCommenting.submit_comment(e,curr,curr_id);});
	}
	$.fn.snasCommenting.unbindEvents = function(curr){
		$('form',curr).unbind('submit');
		$('form',curr).submit(function(e){e.preventDefault()});
	}
	$.fn.snasCommenting.get_comments = function(self,curr_id){
		var refresh_ad=arguments[2]!==undefined?arguments[2]:false;
		settings.messenger.wait_on(self);
		var ajaxData=content_data[curr_id];
		ajaxData.action='getComments';
		ajaxData.page=atPages[curr_id];
		$.ajax(cacheAjax({
			data: ajaxData,
			success: function(d){
				settings.messenger.wait_off(self);
				settings.messenger.process_output(d,$('.messages',self),function(d){$.fn.snasCommenting.display_comments(d,self,curr_id)});
				if(refresh_ad){
					settings.action_function();
				}
			}
		}));

	}
	$.fn.snasCommenting.display_comments = function(d,curr,curr_id){
		var num=0;
		if($('.pagination',curr).length){
			var pagination=create_pagination(d.totalPages,d.perPage,d.atPage,d.paginationRange);
			$('.pagination',curr).html(pagination);
			$('.pagination li a',curr).bind('click',function(e){$.fn.snasCommenting.go_page(e,d,curr,curr_id);});
			$.fn.snasCommenting.select_at_page(curr,curr_id);
		}
		$('.comments',curr).html('');
		if(d!==undefined){
			var c=d.comments;
			if(c && c.length!==undefined){
				for(var i=0;i<c.length;i++){
					$.fn.snasCommenting.display_comment(c[i],curr,false,curr_id);
				}	
				num=d.totalComments;
			}
		}
		numComments[curr_id]=num;
		$.fn.snasCommenting.set_comments_number(curr,curr_id,numComments[curr_id],templates[curr_id].num_comment_template);


	}
	$.fn.snasCommenting.set_comments_number = function(curr,curr_id,num_comments){
		if($('.num_comments',curr).length){
			if(num_comments>0){
				var t={
					NUM_COMMENTS:num_comments
				}
				if(num_comments===1){
					t.PLURAL='';
				}
				else{
					t.PLURAL='s';
				}
		
				$('.num_comments',curr).html(template_replace(templates[curr_id].num_comment_template,t));
			}
		}
	}
	$.fn.snasCommenting.select_at_page = function(curr,curr_id){
		$('.pagination li',curr).removeClass('selected');
		$('.pagination li.G_page_'+atPages[curr_id],curr).addClass('selected');
	}
	$.fn.snasCommenting.go_page = function(e,d,curr,curr_id){
		var classes=$(e.target).parent().attr('class').split(/ /);
		var go_page=1;
		for(var i=0;i<classes.length;i++){
			if(classes[i].match(/^G_page_/)){
				go_page=parseInt(classes[i].replace(/^G_page_/,''));
				if(isNaN(go_page)){
					go_page=1;
				}
				break;
			}
		}
		atPages[curr_id]=go_page;
		$.fn.snasCommenting.select_at_page(curr,curr_id);

		
		$.fn.snasCommenting.get_comments(curr,curr_id,true);
	}
	$.fn.snasCommenting.display_comment = function(c,curr,at_top,curr_id){
		var id=c.id;

		var flag='';
		if(id!==0){
			flag=template_replace(templates[curr_id].flag_comment_template,{
				COMMENT_ID:id
			});
		}
		var out=template_replace(templates[curr_id].comment_template,{
			CREATED_DATE:c.created,
			COMMENT_ID:id,
			COMMENT_TEXT:c.comment,
			FLAG_COMMENT:flag
		});
		if(!at_top){
			$('.comments',curr).append(out);
		}
		else{
			$('.comments',curr).prepend(out);
		}
		if(id!==0){
			var curr=this;
			$('#flag_'+id).bind('click',function(){settings.flagger.flag_by_contentID(id)});
		}
	}
	$.fn.snasCommenting.submit_comment = function(e,curr,curr_id){
		e.preventDefault();
		$.fn.snasCommenting.unbindEvents(curr);
		var self=this;
		var val=$('.commentText',curr).attr('value');
		var title='';
		if($('input[name="commentTitle"]',curr).length >0){
			title=$('input[name="commentTitle"]',curr).attr('value');
		}
		if(!val){
			settings.messenger.display_errors('NO_COMMENT_ENTERED',curr);
		}
		else{
			settings.messenger.wait_on(curr);
			var ajaxData=content_data[curr_id];
			ajaxData.action='createComment';
			ajaxData.commentText=val;
			ajaxData.commentTitle=title;
			$.ajax(setAjax({
				data: ajaxData,
				success: function(d){
					settings.messenger.wait_off(curr);
					$.fn.snasCommenting.bindEvents(curr,curr_id);
					settings.messenger.process_output(d,'',function(){$.fn.snasCommenting.append_added_comment(ajaxData,curr,curr_id)}); //add ,curr to make it an internal alertbox for the added comment message
					settings.action_function();
				}
			}));
		}
	}
	$.fn.snasCommenting.append_added_comment = function(data,curr,curr_id){
		if(!settings.messenger.has_error){
			var d=new Date();
			var ctime=Math.floor(d.getTime()/1000);
			var created=settings.messenger.format_date(d);
			var comment=data.commentText;
			var title=data.commentTitle;
			var co={
				'avatar':'',
				'comment':comment,
				'ctime': ctime,
				'created': m.format_date(d),
				'id':0,
				'personUUID':'',
				'title':title,
				'userName':''
			}
			$('.messages',self).html('')
			this.display_comment(co,curr,true,curr_id)
			$('.commentText',curr).attr('disabled','true');
			$.fn.snasCommenting.unbindEvents(curr);
			$('form',curr).slideUp();
			numComments[curr_id]++;
			$.fn.snasCommenting.set_comments_number(curr,curr_id,numComments[curr_id],templates[curr_id].num_comment_template);
		}
	}
	$.fn.snasCommenting.defaults = {
		comment_template: '<li id="comment_[$$COMMENT_ID]"><span class="created_date">[$$CREATED_DATE]</span>[$$FLAG_COMMENT]<div class="comment">[$$COMMENT_TEXT]</div></li>',
		flag_comment_template: '<a id="flag_[$$COMMENT_ID]" class="flag_comment" href="javascript:;">Flag Comment</a>',
		entry_template: '<div class="messages"></div><ul class="comments"></ul><form class="comment_input"><label for="commentText">Enter Comment:</label><textarea name="commentText" class="commentText"></textarea><button type="submit">Submit Comment</button></form>',
		num_comments_template: '[$$NUM_COMMENTS] comment[$$PLURAL]'
	}
})(jQuery);



(function($){
	var settings;
	var last=0;
	var content_data=[];
	$.fn.snasRate = function(options){
		settings = $.extend({}, $.fn.snasRate.defaults, options);
		$.fn.snasRate.content_data={}; //content data contains either the contentURL or the contentGUID 
		if(!(settings.action_function && typeof settings.action_function==='function')){
			settings.action_function=function(){};
		}
		if(settings.messenger==undefined){
			if(typeof(GATEWAY_MESSENGER) === 'object'){
				settings.messenger=GATEWAY_MESSENGER;
			}
			else{
				return;
			}

		}
		var self=this;
		$(this).each(function(){
			var curr_id=last;
			last++;
			$(this).attr('snasRate_id',curr_id);
			content_data[curr_id]=set_content_data(settings,this);
			$.fn.snasRate.bind_ratings(this,curr_id);
			$.fn.snasRate.load_ratings(this,curr_id);
		});
	}
	//adds the list of stars and binds the functions to them
	$.fn.snasRate.bind_ratings = function(self,curr_id){
		var ratings='';
		for(var i=1;i<=settings.ratingMax;i++){
			ratings+='<li class="rate_'+i+' rating_empty"></li>';
		}
		if(!$(self).is('ul')){
			ratings="<ul>"+ratings+"</ul>";
		}
		$(self).html(ratings);
		var ss=this;
		for(var i=1;i<=settings.ratingMax;i++){
			$('li.rate_'+i,self).bind('click',(function(ii){return function(e){$.fn.snasRate.rate(ii,e,curr_id);return false};})(i));
			$('li.rate_'+i,self).bind('mouseenter',(function(ii){return function(e){$.fn.snasRate.rate_hover(e,ii,'enter'); return false;}})(i));
			$('li.rate_'+i,self).bind('mouseleave',(function(ii){return function(e){$.fn.snasRate.rate_hover(e,ii,'leave'); return false;}})(i));
		}
	}
	//loads the rating from snas
	$.fn.snasRate.load_ratings = function(self,curr_id){
		return;
		var ajaxData=content_data[curr_id];
		ajaxData.action='getRating';
		$.ajax(cacheAjax({
			data: ajaxData,
			success: function(d){
				settings.messenger.process_output(d,'',function(){$.fn.snasRate.set_rating(d,self)});
			}
		}));
	}
	//lights up the proper amount of stars
	$.fn.snasRate.set_rating = function(data,curr){
		var children=$(curr).children();
		var value=0;
		if(data.output && data.output.averageRating){
			value=data.output.averageRating;
		}
		if(value===0 && this.current_rated_value){
			value=this.current_rated_value;
		}
		$('li',curr).removeClass('rated_value');
		$('li',curr).removeClass('rated_half_value');
		var i=0;
		var last_half=Math.round(value-Math.floor(value));
		var floor=Math.floor(value)
		var cls='';
		for(i=0;i<=floor;i++){
			cls='.rate_'+i;
			$(cls,curr).addClass('rated_value');
		}

		cls='.rate_'+i;
		if(last_half && i<=settings.ratingMax){
			$(cls,curr).removeClass('rated_value');
			$(cls,curr).addClass('rated_half_value');
		}
	}
	//sends the rating to snas
	$.fn.snasRate.rate = function(value,event,curr_id){
		var self=this;
		this.current_rated_value=value;
		var ajaxData=content_data[curr_id];
		ajaxData.action='rateContent';
		ajaxData.rateValue=value;
		$.ajax(setAjax({
			data: ajaxData,
			success: function(d){
				settings.messenger.process_output(d,'',function(){self.set_rating(d,$(event.target).parent())});
				settings.action_function();
			}
		}));
	}
	//makes the stars hover properly
	$.fn.snasRate.rate_hover = function(event,value,type){
		var parent=$(event.target).parent();
		var stars=$(event.target).parent().children();
		if(type==='enter'){
			for(var i=1;i<=value;i++){
				$('.rate_'+i,parent).addClass('rating_hover');
			}		
		}
		else{
			$('li',parent).removeClass('rating_hover');
		}

	}
	$.fn.snasRate.defaults = {
		ratingMax: 5
	}
})(jQuery);





//integrates with gateway functions to retrieve and vote on snas polls
(function($){
	var settings;
	var question_data=[];
	var templates=[];
	$.fn.snasPoll = function(options){
		settings = $.extend({}, $.fn.snasPoll.defaults, options);
		if(!(settings.action_function && typeof settings.action_function==='function')){
			settings.action_function=function(){};
		}
		if(settings.messenger==undefined){
			if(typeof(GATEWAY_MESSENGER) === 'object'){
				settings.messenger=GATEWAY_MESSENGER;
			}
			else{
				return;
			}
		}
		var self=this;
		if(!$(this).length){
			return;
		}

		$(this).each(function(){
			var poll_id=settings.poll_id
			if($(this).attr('snas_poll_id')){
				poll_id=$(this).attr('snas_poll_id');
			}
			templates[poll_id]={};
			//retrieve templates from html if there are any
			if($('.poll_template .question',this).length){
				templates[poll_id].question_template=unescape($('.poll_template .question',this).html());
			}
			else{
				templates[poll_id].question_template=settings.question_template;
			}
			if($('.poll_template .choice',this).length){
				templates[poll_id].question_choice_template=unescape($('.poll_template .choice',this).html());
			}
			else{
				templates[poll_id].question_choice_template=settings.question_choice_template;
			}
			if($('.poll_template .submit',this).length){
				templates[poll_id].question_submit_template=unescape($('.poll_template .submit',this).html());
			}
			else{
				templates[poll_id].question_submit_template=settings.question_submit_template;
			}
			if($('.poll_results_template .question',this).length){
				templates[poll_id].result_question_template=unescape($('.poll_results_template .question',this).html());
			}
			else{
				templates[poll_id].result_question_template=settings.result_question_template;
			}
			if($('.poll_results_template .choice',this).length){
				templates[poll_id].result_choice_template=unescape($('.poll_results_template .choice',this).html());
			}
			else{
				templates[poll_id].result_choice_template=settings.result_choice_template;
			}
			if(poll_id){
				$.fn.snasPoll.loadPoll(poll_id,this);
			}

		});
	}
	$.fn.snasPoll.loadPoll = function(poll_id,self){
		settings.messenger.wait_on(self);
		$.ajax(cacheAjax({
			data:{'action':'getPollByID','pollID':poll_id},
			dataType: "json",
			processData: true,
			success: function(d){
				settings.messenger.process_output(d,self,function(){$.fn.snasPoll.displayPoll(d,self)});
				}
		}));
	}
	$.fn.snasPoll.displayPoll = function(data,self){
		settings.messenger.wait_off(self);
		var o=data.output;
		var h='';
		for(var pollID in o){
			question_data[pollID]={};
			//this blob displays the poll in the element
			h+='<form><input type="hidden" name="pollID" value="'+pollID+'"><ul>';
			for(var i=0;i<o[pollID].questions.length;i++){
				var question=o[pollID].questions[i].question;
				var questionID=o[pollID].questions[i].questionID;
				var cc='';
				question_data[pollID][questionID]={};
				question_data[pollID][questionID].question=question;
				question_data[pollID][questionID].totalVotes=0;
				question_data[pollID][questionID].choices={};
				
				for(var j=0;j<o[pollID].questions[i].choices.length;j++){
					
					var choice=o[pollID].questions[i].choices[j].choice;
					var choiceID=o[pollID].questions[i].choices[j].choiceID;
					var num_votes=o[pollID].questions[i].choices[j].votes;
					question_data[pollID][questionID].choices[choiceID]={};
					question_data[pollID][questionID].choices[choiceID].choice=choice;
					question_data[pollID][questionID].choices[choiceID].numVotes=num_votes;
					question_data[pollID][questionID].totalVotes+=num_votes;
					cc+=template_replace(templates[pollID].question_choice_template,{
							'CHOICE_ID':choiceID,
							'CHOICE':choice,
							'QUESTION_ID':questionID
						});
				}
				h+=template_replace(templates[pollID].question_template,{
						'CHOICES':cc,
						'QUESTION':question,
						'QUESTION_ID':questionID
					});
				
			}
			h+='</ul>'+templates[pollID].question_submit_template+'</form>';
		}
		$(self).html(h);
		$.fn.snasPoll.bindEvents(self);
	}
	$.fn.snasPoll.bindEvents = function(curr){
		$('form',curr).submit(function(e){return $.fn.snasPoll.votePoll(e,curr);});
	}
	$.fn.snasPoll.unbindEvents = function(curr){
		$('form',curr).submit(function(e){e.preventDefault();});
	}
	$.fn.snasPoll.votePoll = function(e,self){
		e.preventDefault();
		var numQuestions=$('dt',e.target).length;
		var pollID=$('input[name=pollID]',e.target).attr('value');
		//did not answer all the poll questions
		if($('input:radio:checked',e.target).length !== numQuestions){
			//find all the questions they missed
			var message='<ul>';
			var missed=0;
			for(var qid in question_data[pollID]){
				if($('input:radio:checked[name=question_'+qid+']',e.target).attr('value')===undefined){
					message+='<li>'+question_data[pollID][qid].question+"</li>";
					missed++;
				}
			}
			message+='</ul>'
			var msg='';
			if(missed==1){
				msg=settings.messenger.get_message_string('SELECT_ALL_ANSWERS',message);
			}
			else{
				msg=settings.messenger.get_message_string('SELECT_ALL_ANSWERS_PLURAL',message);
			}
			settings.messenger.internal_alertbox(msg,self);
		}
		else{
			var data={};
			$('input:radio:checked',e.target).each(function(){
				var q=$(this).attr('name');
				var value=$(this).attr('value');
				data[q]=value;
			})
			data['action']='votePollByID';
			data['pollID']=pollID;
			settings.messenger.wait_on(self);
			$.fn.snasPoll.unbindEvents(self);
			$.ajax(setAjax({
				data:data,
				dataType: "json",
				processData: true,
				success: function(d){//d,message_box,output_function, use_internal_lightbox
					$.fn.snasPoll.bindEvents(self);
					settings.messenger.wait_off(self);
					settings.messenger.process_output(d,'',function(){$.fn.snasPoll.displayResults(pollID,self)},self);
					settings.action_function();
					}
			}));
		}
		return false;
	}
    $.fn.snasPoll._sortChoicesByVotes = function(choices) {
        var out = [];
        // copy the choices into an array
        for (var choice in choices) {
            out.push(choices[choice]);
        }
        // apply a proper sorting algorithm to the choice array
        out.sort(function(a,b) {
            return (a.numVotes < b.numVotes) ? 1 : (a.numVotes > b.numVotes) ? -1 : 0;
        });
        // return sorted array
        return out;
    };
	$.fn.snasPoll.displayResults = function(pollID,self){
		var qd=question_data[pollID];
		var out='<ul>';
		for(var qid in qd){
			var t=qd[qid].totalVotes;
			var q=qd[qid].question;
			var cc='';
			var order=[];
			var sortedchoices=$.fn.snasPoll._sortChoicesByVotes(qd[qid].choices);
			for(var i=0; i<sortedchoices.length; i++){
				var num=sortedchoices[i].numVotes;
				var choice=sortedchoices[i].choice;
				var v=0;
				if(t!==0){
					v=Math.round(((num/t)*10000))/100;
				}
				cc+=template_replace(templates[pollID].result_choice_template,{
					'CHOICE_PERCENT':v,
					'CHOICE':choice,
					'NUM_VOTES':num
				});
			}
			out+=template_replace(templates[pollID].result_question_template,{
				'QUESTION':q,
				'TOTAL_VOTES':t,
				'CHOICES':cc
				
			})
		}
		out+='</ul>';
		$(self).html(out);
	}
	$.fn.snasPoll.defaults = {
		question_template: '<li><dl><dt>[$$QUESTION]</dt>[$$CHOICES]</dl></li>',
		question_choice_template: '<dd><input type="radio" id="choice_[$$CHOICE_ID]" value="[$$CHOICE_ID]" name="question_[$$QUESTION_ID]" /><label for="choice_[$$CHOICE_ID]">[$$CHOICE]</label></dd>',
		question_submit_template: '<button class="site_btn" type="submit">Submit Vote</button>',
		result_question_template: '<li><dl><dt>[$$QUESTION]<span class="votes">([$$TOTAL_VOTES])</span></dt>[$$CHOICES]</dl></li>',
		result_choice_template: '<dd><span class="vote_percent">([$$CHOICE_PERCENT]%)</span>[$$CHOICE]</dd>'
	}
})(jQuery);
//miscellaneous functions
function create_pagination(totalPages,perPage,atPage,maxPages){
	atPage=parseInt(atPage);
	if(totalPages>1){
		var href=' href="javascript:;"';
		// if($.browser.msie){
		// 	href=' href="javascript:;"';
		// }
		var start=false;
		var end=false;
		var page_list='';
		var size=Math.ceil((maxPages-1)/2);
		var rem=maxPages;
		for(var i=atPage-size;i<=totalPages;i++){
			if(i>=1){
				rem-=1;
				if(start===false){
					start=i;
				}
			}
			if(rem===0){
				end=i;
				break;
			}
		}
		if(end===false){
			end=totalPages;
			if((start-rem)>0){
				start-=rem;
			}
			else{
				start=1;
			}
		}
		
		var page_left_num=false;
		var page_right_num=false;
		if(start-1>0){
			page_left_num=start-1;
		}
		if(end+1<=totalPages){
			page_right_num=end+1;
		}
		for(var i=start;i<=end;i++){
			if(i!==atPage){
				page_list+='<li class="G_page_'+i+'"><a'+href+'>'+i+'</a></li>';
			}
			else{
				page_list+='<li class="G_page_'+i+' selected"><a'+href+'>'+i+'</a></li>';
			}
			
		}
		if(page_left_num){
			page_list='<li class="G_page_'+page_left_num+' G_page_left"><a'+href+'>&laquo;</a></li>'+page_list;
		}
		if((atPage-1)!=0){
			page_list='<li class="G_page_'+(atPage-1)+' G_go_left"><a'+href+'>&larr;</a></li>'+page_list;
		}
		if((atPage+1)<=totalPages){
			page_list+='<li class="G_page_'+(atPage+1)+' G_go_right"><a'+href+'>&rarr;</a></li>';
		}
		if(page_right_num){
			page_list+='<li class="G_page_'+page_right_num+' G_page_right"><a'+href+'>&raquo;</a></li>';
		}
		return page_list;
	}
	return '';
}
function set_content_data(settings,curr){ //sets the contenURL contentID etc
	var ret={};
	if($(curr).attr('item_contentType')){
		ret.contentType=$(curr).attr('item_contentType');
	}
	else if(settings.item_contentType){
		ret.contentType=settings.item_contentType;
	}
	if(settings.item_contentID){
		ret.contentID=settings.item_contentID;
	}
	else if(settings.contentGUID){
		ret.contentGUID=settings.contentGUID;
	}
	else if(settings.item_contentVideoID){
		ret.contentVideoGUID=settings.item_contentVideoID;
	}
	else if($(curr).attr('item_contentID')){
		ret.contentID=$(curr).attr('item_contentID');
	}
	else if($(curr).attr('item_guid')){
		ret.contentGUID=$(curr).attr('item_guid');
	}
	else if(window.location.toString().match(/\?.*uuid=/)){
		ret.contentVideoGUID=window.location.toString().replace(/^.*\?.*uuid=([^&]+).*$/,'$1');

	}
	else if(window.location.toString().match(/\/content\//)){
		ret.contentCMSURL=window.location.toString().replace(/^.*(\/content\/.*)(\?.*)?$/,'$1');
	}
	else{
		ret.contentURL=window.location.toString();
		
	}
	return ret;
}

function template_replace(template,replacements){
	if(template){
		for(var r in replacements){
			var reg= new RegExp('\\[\\$\\$'+r+'\\]','g');
			template=template.replace(reg,replacements[r])
		}		
	}
	return template;

}

