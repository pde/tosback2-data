var sn_img_base_url = "/monk/imgaes";
var randDARTNumber=0;
function genSetRandDARTNumber()
{
	randDARTNumber = Math.round(Math.random()*1000000000000);
}

function getCookie( name )
{	
	var start = document.cookie.indexOf( name + "=" );
	var len = start + name.length + 1;
	if ( ( !start ) &&
	( name != document.cookie.substring( 0, name.length ) ) )
	{
		return null;
	}
	if ( start == -1 ) return null;
	var end = document.cookie.indexOf( ";", len );
	if ( end == -1 ) end = document.cookie.length;
		return unescape( document.cookie.substring( len, end ) );
}
jQuery.fn.extend({
	escapeVal: function(){ return(this.val().replace(/&/g,"%26"));}
})	
sn_userName = getCookie('sn_u');

// initialize to null for no comments
var sn_commentOwnerArray = null;
var sn_commentContentOwner = null;
var sn_groupMembership = [];

function sn_Pagination()
{
	this._pagesBefore = 2;
	this._pagesAfter = 2;
	this._showPrevious = 1;
	this._showNext = 1;
	this._previousPage = 0;
	this._nextPage = 0;
	this._start = 0;
	this._end = 0;
	this._totalPageChecker = 5;
	this._pageActionHREF = '#';
	this._pageActionHREFTemplate = '#';
	this._title = '';
	this._titleTemplate = '%currentPage% of %totalPages%';
	this._currentPage = 0;
	this._totalPages = 0;
}

sn_Pagination.prototype.setOptions = function(pagesBefore, pagesAfter, totalPageChecker)
{
	this._pagesBefore = pagesBefore;
	this._pagesAfter = pagesAfter;
	this._totalPageChecker = totalPageChecker;
}

sn_Pagination.prototype.setPageActionHREF = function(href)
{
	this._pageActionHREFTemplate = href;
}

sn_Pagination.prototype.setTitle = function(title)
{
	this._title = title;
}

sn_Pagination.prototype.setCurrentPage = function(page)
{
	this._currentPage = page;
}

sn_Pagination.prototype.getCurrentPage = function()
{
	return this._currentPage;
}

sn_Pagination.prototype.draw = function(totalPages, currentPage, divID)
{
	this._currentPage = currentPage;
	this._totalPages = totalPages;
	this._previousPage = currentPage - 1;
	this._nextPage = currentPage + 1;
	this._showPrevious = 1;
	this._showNext = 1;
	if(totalPages>1)
	{
		if (currentPage <= this._pagesBefore + 1)
		{
			this._start = 1;
			if ((currentPage + this._pagesAfter) < totalPages)
			{
				this._end = currentPage + this._pagesAfter;
			}
			else
			{
				this._end = totalPages;
			}
		}
		else if (currentPage >= totalPages - this._pagesAfter)
		{
			this._start = currentPage - this._pagesBefore;
			this._end = totalPages;
		}
		else
		{
			this._start = currentPage - this._pagesBefore;
			this._end = currentPage + this._pagesAfter;
		}
		if (currentPage == 1)
		{
			this._showPrevious = 0;
		}
		if (currentPage == totalPages)
		{
			this._showNext = 0;
		}
		this._title = this._titleTemplate;
		this._title = this._title.replace(/%currentPage%/, this._currentPage);
		this._title = this._title.replace(/%totalPages%/, this._totalPages);
	
		htmlOutput = '<span class="sn_title">' + this._title + '</span>';
		htmlOutput += '<ul>';
	
		if (this._showPrevious == 1)
		{
			this._pageActionHREF = this._pageActionHREFTemplate;
			htmlOutput += '<li class="continue"><a href="' + this._pageActionHREF.replace(/%page%/, this._previousPage) + '">&laquo; prev</a></li>';
		}
		else
		{
			// @TODO needs to be a diff class to denote you cannot go back
			//htmlOutput += '<li class="continue"><a href="#">&laquo; prev</a></li>';
		}
	
		htmlOutput += '  <li class="numbering">';
	
		if (this._start > 1)
		{
			var additionalText = "";
			if (this._start > 2)
				var additionalText = "...";

			this._pageActionHREF = this._pageActionHREFTemplate;
			htmlOutput += '	<a href="' + this._pageActionHREF.replace(/%page%/, 1) + '">1' + additionalText + '</a>';
		}
	
		for (i=this._start ; i<=this._end ; i++)
		{
			linkStyle = "";
			if (i == currentPage) {
				// @TODO add a style to denote current page
				linkStyle = ' style="font-weight: bold;" ';
			}
			this._pageActionHREF = this._pageActionHREFTemplate;
			htmlOutput += '	<a href="' + this._pageActionHREF.replace(/%page%/, i) + '" ' + linkStyle + '>' + i + '</a>';
		}
	
		if (this._end <= (totalPages - 1))
		{
			var additionalText = "";
			if (this._end < (totalPages - 1))
				var additionalText = "...";
			
			this._pageActionHREF = this._pageActionHREFTemplate;
			htmlOutput += '	<a href="' + this._pageActionHREF.replace(/%page%/, totalPages) + '">' + additionalText + totalPages + '</a>';
		}
	
		htmlOutput += '  </li>';
	
		if (this._showNext == 1)
		{
			this._pageActionHREF = this._pageActionHREFTemplate;
			htmlOutput += '<li class="continue"><a href="' + this._pageActionHREF.replace(/%page%/, this._nextPage) + '">next &raquo;</a></li>';
		}
		else
		{
			// @TODO needs to be a diff class to denote you cannot go forward
			//htmlOutput += '<li class="continue"><a href="#">next &raquo;</a></li>';
			htmlOutput+='&nbsp;';
		}
	
		htmlOutput += '</ul>';

		document.getElementById(divID).innerHTML = htmlOutput;
		//$(function(){$('ul#sn_album_thumbnails').html(content);});
	}
	else
	{
		document.getElementById(divID).style.display='none';
	}
}

String.prototype.splitFirst=function(split)
{ 
	var i=this.indexOf(split);
	if(i!=-1)
	{
		var retval=new Array();
		var length=this.length;
		if(i+1<length)
		{
			retval[0]=this.substring(0,i);
			retval[1]=this.substring(i+1);
		}
		else if(i+1==length)
		{
			retval[0]=this.substring(0,i);
			retval[1]='';
		}
		else
		{
			retval[0]=this;
			retval[1]='';
		}
		return retval;
	}
	else
	{
		return new Array(this,'');
	}
}

/**********

Unicode Hex Value Lookup
version 1.0
last revision: 02.23.2006
steve@slayeroffice.com

Should you modify or improve upon this code,
please let me know so that I can update the version
hosted at slayeroffice.

Please leave this notice intact.

**********/
function convertEntities(text)
{
	fieldValue = text;
	if(!fieldValue) return '';
	var eText='';
	var ncode;

	for(var i = 0, c; c = fieldValue.charAt(i); i++)
	{
		if(c.search(/^[0-9a-z\s]/i) != -1)
		{
			eText += c;
		}
		else 
		{
			nCode = c.charCodeAt(0);
			eText += "&#" + nCode +";";
		}
	}
	return eText;
}

function so_asciiToUniHex(asciiCode)
{
	un = asciiCode.toString(16);
	while(un.length<4) un = "0" + un;
	return "\\u" + un;
}

function sn_getUsernameFromUUID(uuid)
{
	var usernameParts = (uuid).split(',');
	return usernameParts[0];
}

function sn_hideNavIfSelf(userName)
{
	if (sn_currentUserData)
	{
		//GUUID changes
		sn_userName = sn_currentUserData.f;
		if(userName==sn_userName)
		{
			$("#sn_setnav").css("display","none");
		}
	}
}
function sn_displayCommentDeleteButtons()
{
	var contentID=arguments[0];
	var contentType=arguments[1];
	var groupName=(arguments[2])?arguments[2]: '';
	var groupMembership
	if (sn_currentUserData)
	{
		if(groupName)
	{
			groupMembership=sn_ajax_getGroupMembershipType(groupName);
		}
		//GUUID changes
		var username = sn_currentUserData.f;
		var idArray=$("#comment_id_array").html().split("||");
		var contentOwner=$("#comment_owner_id").html();
		if(idArray)
		{
			for(var i=0;i<idArray.length;i++)
			{
				var commentInfo=idArray[i].split('|');
				var commentID=commentInfo[0];
				var commentOwner=commentInfo[1];

				if(username==commentOwner || username==contentOwner || groupMembership=='OWNER')
				{
					var divID='#sn_cmt'+commentID;
					$(divID).html(' | <a href="javascript:sn_ajax_deleteComment(' + commentID+ ', ' + contentID + ',\''+ contentType +'\',\''+commentOwner+'\');" title="delete">Delete</a>')
				}
				
			}
		}
	}

}

// Ajax Code
function sn_ajax_busy(divID, visible, msg)
{
        var busyImg = '<img src="' + sn_img_base_url + '/ajax_busy.gif">';

        if (visible)
        {
                $(divID).css("display","none");
				$(divID).append('<span style="float:left;display:inline;visibility:visible;">' + busyImg + '</span>');
                if (msg.length > 0)
                {
                        $(divID).css({ padding: "5px", textAlign: "center"});
                        $(divID).append('<span style="padding-left: 5px;">' + msg + '</span>');
                }
				$(divID).slideDown();
        }
        else
        {
				if(msg!='remove')
				{
                	$(divID).slideUp('normal',function(){$(divID).children().remove();});
        		}
				else
				{
					$(divID).slideUp('normal',function(){$(divID).remove();});
				}
		}
}

var original_ajax_busy_image='';

function sn_ajax_busy_replace(elementID,visible)
{
	if(visible)
	{
		original_ajax_busy_image=$(elementID).css('background-image');
		$(elementID).css('background-image','url(' + sn_img_base_url + '/ajax_busy.gif)');

	}
	else
	{
		$(elementID).css('background-image',original_ajax_busy_image);
	}
}

function sn_ajax_addComment(id, usercomment, title)
{
	sn_ajax_busy('div#sn_ajax_busy_com', true, 'Your comment is being submitted...');
	//commentText=escape(commentText);
	//$("#sn_button_submit").attr({disabled:"disabled"});
	$.ajax({
	  type: "POST",
	  url: "/monk/commentadd.php",
	  data: "id=" + id + "&usercomment=" + usercomment + "&title=" + title,
	  success: function(msg) {
	  	if(sn_ajax_callback_multiple(msg)==1)
		{
			/*if(window.paginatorComments)
			{
				sn_ajax_pageComments(1, contentID, contentType, paginatorComments);
			}
			else
			{
				sn_ajax_pageComments(1, contentID, contentType, null);
			}
			*/
			//$("#sn_add_comment_form_wrap").slideUp();
			//$("form[@name=sn_add_comment_form]")[0].reset();
			sn_ajax_busy('div#sn_ajax_busy_com', false, '');
		}
		else
		{
			sn_ajax_busy('div#sn_ajax_busy_com', false, '');
			//$("#sn_button_submit").attr({disabled:""});
		}
  		
	
	  }
	});
}


//function modified to auto refresh rating.
function sn_ajax_rateContent(contentID, rating, ratingCount, contentType)
{
	 sn_ajax_busy('div#sn_ajax_busy_rat', true, 'Rating...');
	 
	 $.ajax({
	   type: "POST",
	   url: "/rating/set",
	   data: "contentID=" + contentID + "&rating=" + rating,
	   success: function(msg) {
	   		sn_ajax_callback(msg);
	   		if(msg.indexOf("Thanks for rating")!=-1)
	   		{
		   		ratingCount=ratingCount+1;
	   		}
	   		$.ajax({
        	   type: "POST",
        	   url: "/rating/get",
        	   data: "contentID="+contentID+"&ratingCount="+ratingCount+"&contentType="+contentType,
        	        success: function(content) {
					if(contentType!="blog")
					{
						$('#rating-wrap').fadeIn("slow");
						$(function(){$('#rating-wrap').html(content);});
					}
					else
					{
						// had to comment the next line, because the fadeIn caused a shift in the thumbs up/down icons in IE6/WinXP
						//$('#rating-wrap'+contentID).fadeIn("slow");
						$(function(){$('#rating-wrap'+contentID).html(content);});                    		
					}
				}
        	 });
	   		sn_ajax_busy('div#sn_ajax_busy_rat', false, '');
	   }
	 });
}

function sortSelectList(listID,selected)
{
	var list=$('#'+listID).html();
	$('#'+listID).empty();
	list=list.replace(/^\s+|\s+$/, '') ;
	list=list.replace(/\n|\r|\f/g,'');
	list=list.replace(/<\/option\s*>/ig,"\n");
	list=list.replace(/<\/?[^>]+(>|$)/g, "");
	var sort_list=list.split("\n");
	sort_list.sort(function(x,y)
	{ 
		var a = String(x).toUpperCase().replace(/^\s+|\s+$/, ''); 
		var b = String(y).toUpperCase().replace(/^\s+|\s+$/, ''); 
		if (a > b) 
			return 1 
		if (a < b) 
			return -1 
		return 0; 
    });
	var r='';
	for(var i=0;i<sort_list.length;i++)
	{
		var item=sort_list[i].replace(/^\s+|\s+$/, '');
		if(item!='')
		{
			r+='<option value="' + item + '">' + item + '</option>\n';
		}
	}
	$('#'+listID).html(r);
	var select=document.getElementById(listID);
	for(var i=0;i<select.options.length;i++)
	{
		if(select[i].text==selected)
		{
			select[i].selected=true;
			break;
		}
	}
}

function sn_ajax_pageComments(page, contentID, contentType, paginator)
{
	 //$("div#sn_comments_container").fadeOut("slow");
	 if (paginator) paginator.setCurrentPage(page);
	 
	 $.ajax({
	   type: "POST",
	   url: "/comments/act/page",
	   data: "&contentID=" + contentID + "&page=" + page + "&contentType=" + contentType,
	   success: function(content) {
			
			//$("div#sn_comments_container").fadeIn("slow");
			$('div#sn_comments_container').html(content);
			
			if (paginator)
			{
				paginator.draw(sn_totalCommentPages, paginator.getCurrentPage(), 'sn_commentPaginationTop');
				paginator.draw(sn_totalCommentPages, paginator.getCurrentPage(), 'sn_commentPaginationBottom');
			}
			if(contentType=='VIDEO')
			{
				sn_displayCommentDeleteButtons(contentID,'VIDEO_ALBUM');
			}
			else if(contentType=='IMAGE')
			{
				sn_displayCommentDeleteButtons(contentID,'PHOTO_ALBUM');
			}
			else if(contentType=='BLOG_POST')
			{
				sn_displayCommentDeleteButtons(contentID,'BLOG');
			}
			else
			{
				sn_displayCommentDeleteButtons(contentID,contentType);
			}
	   }
	 });
}

function sn_ajax_deleteComment(commentID,contentID,contentType,commentAuthor)
{
	confirmPopup('Are you sure you want to delete this comment?',sn_ajax_deleteCommentCallback);
	function sn_ajax_deleteCommentCallback()
	{
		$.ajax({
	   type: "POST",
	   url: "/comments/act/delete",
	   data: "contentID=" + contentID + "&contentType=" + contentType + "&commentID=" +commentID+ "&commentAuthor=" +commentAuthor,
		success: function(msg)
				{
					if(sn_ajax_callback_multiple(msg)==1)
					{
						$('#sn_comment_'+commentID).slideToggle();
					}
				}
	 });
	}
}

function sn_ajax_deleteVideo()
{
	var videoID=arguments[0];
	var groupURLName=(arguments[1])?arguments[1]:'';
	var ajaxURL='/videos/act/delete';
	var continueURL='/videos/act/manage';
	if(groupURLName)
	{
		ajaxURL='/groups/videos/'+groupURLName+'/act/delete';
		continueURL='/groups/videos/'+groupURLName+'/act/manage';
	}
	confirmPopup('Are you sure you want to delete this video clip?',sn_ajax_deleteVideoCallback)
	function sn_ajax_deleteVideoCallback()
	{
		$.ajax({
		type: "POST",
		url: ajaxURL,
		data: "videoID=" + videoID ,
		success: function(msg)
				{
					if(sn_ajax_callback_multiple(msg)==1)
					{
						if($("#sn_video_"+videoID+"").html()!=null)
						{
							$("#sn_video_"+videoID+"").fadeOut('normal');
						}
						if($("#sn_editLiveVideo").html()!=null)
						{
							$("#sn_editLiveVideo").slideUp();
							$("#sn_editLiveVideo").after("This video has been deleted<br/><a href='"+continueURL+"'>Click to go back to your videos</a>")
						}
					}
				}
	 });

	}
}




function sn_ajax_callback(msg)
{
	if (msg.indexOf('&') != -1)
	{
		var msgParts = msg.split('&');

		var successParts = msgParts[0].splitFirst('=');
		var messageParts = msgParts[1].splitFirst('=');
		
		var message = unescape(messageParts[1]);
		var labelParts = msgParts[2].splitFirst('=');
		if(labelParts[0]=='action_label')
		{
			var urlParts = msgParts[3].splitFirst('=');
			if(urlParts[0]=='action_url')
			{
				message+='<br/><a href="'+urlParts[1]+'">'+unescape(labelParts[1])+'</a>';
			}
		}
		
		if (successParts[0] == 'success' && successParts[1] == 1)
		{
			// success		
			sendAlert(message, 'good', 300000);
			sn_ajax_callback_login_form(msgParts);
			return 1;
		}
		else if (successParts[0] == 'success' && successParts[1] == 0)
		{
			// failure
			sendAlert(message, 'bad', 300000);
			sn_ajax_callback_login_form(msgParts);
			return 0;
		}
	}
}

function sn_ajax_callback_multiple(msg)
{
	if (msg.indexOf('&') != -1)
	{
		var msgParts = msg.split('&');
		
		var successParts = msgParts[0].splitFirst('=');
		var messageParts = msgParts[1].splitFirst('=');
		
		if (successParts[0] == 'success' && successParts[1] == 1)
		{
			// success
			var message = unescape(messageParts[1]);
			
			/*var labelParts = msgParts[2].splitFirst('=');
			if(labelParts[0]=='action_label')
			{
				var urlParts = msgParts[3].splitFirst('=');
				if(urlParts[0]=='action_url')
				{
					message+='<br/><a href="'+unescape(urlParts[1])+'">'+unescape(labelParts[1])+'</a>';
				}
			}
			var redirect_message=sn_ajax_callback_redirect(msgParts)
			if(redirect_message)
			{
				message+='<br/>'+redirect_message;
			}
			
			*/
			
			sendAlert(message, 'good', 300000);
			//sn_ajax_callback_login_form(msgParts);
			return 1;
		}
		else if (successParts[0] == 'success' && successParts[1] == 0)
		{
			// failure
			var message = unescape(messageParts[1]);
			
			/*var i;
			var message='';
			for(i=1;i<msgParts.length;i++)
			{
				messageParts = msgParts[i].splitFirst('=');
				if(messageParts[0]=='error')
				{
					message+=unescape(messageParts[1])+'<br/>';
				}
			}*/
			sendAlert(message, 'bad', 300000);
			//sn_ajax_callback_login_form(msgParts);
			return 0;
		}
	}
	return 0;
}

function sn_ajax_callback_no_popup(msg)
{
	if (msg.indexOf('&') != -1)
	{
		var msgParts = msg.split('&');

		var successParts = msgParts[0].splitFirst('=');
		var messageParts = msgParts[1].splitFirst('=');
		var message = unescape(messageParts[1]);
		if (successParts[0] == 'success' && successParts[1] == 1)
		{
			// success
			return new Array(1,message);
		}
		else if (successParts[0] == 'success' && successParts[1] == 0)
		{
			// failure
			message='';
			for(i=1;i<msgParts.length;i++)
			{
				messageParts = msgParts[i].splitFirst('=');
				if(messageParts[0]=='error')
				{
					message+=unescape(messageParts[1])+'<br/>';
				}
			}
			return new Array(0,message);
		}
	}
	return new Array(0,'The server gave an invalid response, please try again');
}

function sn_ajax_callback_login_form(msgParts)
{
	for(i=0;i<msgParts.length;i++)
	{
		if(msgParts[i].splitFirst('=')[0]=='display_login_form')
		{
			if(msgParts[i].splitFirst('=')[1])
			{
				
				$.ajax({
					async: false,
				  type: "GET",
				  url: '/accounts/display-ajax-login',
				  data: "ii="+Math.floor(Math.random()*50000),
				success: function(msg){
							$('#sn_alert_messages').after(msg);
						}	
				});
			}
		}
	}
}

function sn_ajax_callback_redirect(msgParts)
{
	var redirectUrl='';
	var wait=0;
	var message='';
	for(i=0;i<msgParts.length;i++)
	{
		if(msgParts[i].splitFirst('=')[0]=='redirect')
		{
			redirectUrl=msgParts[i].splitFirst('=')[1];
		}
		if(msgParts[i].splitFirst('=')[0]=='redirect_wait')
		{
			wait=msgParts[i].splitFirst('=')[1];
		}
		if(msgParts[i].splitFirst('=')[0]=='redirect_message')
		{
			message=msgParts[i].splitFirst('=')[1];
		}
	}
	if(!isNaN(wait) && wait>0 && redirectUrl!='')
	{	
		setTimeout(function(){top.location=redirectUrl;},wait);
		if(message)
		{
			message=unescape(message);
			return message.replace(/%seconds%/,wait/1000);
		}
		else
		{
			return 0;
		}
	}
	else if(wait<0 && redirectUrl!='')
	{
		//do nothing
	}	
	else if(wait==0 && redirectUrl!='')
	{
		top.location=redirectUrl;
	}
	return 0;
}

var showConfirm = function(message){
	$("body","html").css({height: "100%", width: "100%"});
	$("html").css("overflow","hidden");
	if (document.getElementById("TB_HideSelect") === null) {//iframe to hide select elements in ie6
		$("body").append("<iframe id='TB_HideSelect'></iframe><div id='TB_overlay'></div><div id='TB_window'></div>");
		$('#TB_window').css({display:'block', margin:'-66px 0 0 -150px', padding: '10px'});
		$('#TB_window').width('300px');
		$('#TB_window').height('100px');
		$("#TB_window").append(message);
		$(this, '#TB_window').click(function(){tb_remove()});
		$(this, '#TB_close').click(function(){tb_remove()});
	}
}
var confirmPopup = function(mess,callback){
		
		if (typeof callback != 'function') {
			var follow=callback;
			callback = function() { window.location.href = follow; }
		}
		
		$('#box-outside').before('<div class="sn_alert_pop"  style="display:none" id="sn_alert_popID">'+mess+'<span id="close-style-box">X</span><p><form><input type="button" id="sn_alert_button_yes" value="Yes" />&nbsp;<input type="button" id="sn_alert_button_no" value="No" /></form></p></div>')
		$('.sn_alert_pop').fadeIn('fast');
		$('#close-style-box').click(function(){$('.sn_alert_pop').remove();});
		$('#sn_alert_button_yes').click(function(){$('.sn_alert_pop').remove();callback();return true;});
		$('#sn_alert_button_no').click(function(){$('.sn_alert_pop').remove();});

}
var toggleContent = function(e)
	{
		var targetContent = $('div.mod-body', this.parentNode.parentNode);
		if (targetContent.css('display') == 'none') {
			targetContent.slideDown(300);
			$(this).html('[-]');
		} else {
			targetContent.slideUp(300);
			$(this).html('[+]');
		}
		return false;
	};
	function serialize(type, s)
	{
		if (type == 'sort') {serial = $.SortSerialize(s)} else{return false};
		if (type == 'select') {serial = $.SelectSerialize(s)} else{return false};
		return serial;
		//alert(serial.hash);
	};
	
//alerts
var sendAlert = function(mess, typeOf, timing){
		$(".sn_alert_pop").remove();
		$(".sn_alert_pop2").remove();
		if (typeOf == 'good') {
			$('#box-outside').before('<div class="sn_alert_pop" style="display:none"  id="sn_alert_popID"><div id="sn_alert_messages">'+mess+'</div><span id="close-style-box">X</span></div>')
			$('.sn_alert_pop').fadeIn('slow').animate({opacity: 1.0}, timing).fadeOut('slow', function(){if(this.parentNode){$(this).remove();}});
		}
		else if (typeOf == 'bad') {
			$('#box-outside').before('<div class="sn_alert_pop2"  style="display:none"  id="sn_alert_popID"><div id="sn_alert_messages">'+mess+'</div><span id="close-style-box">X</span></div>')
			$('.sn_alert_pop2').fadeIn('slow').animate({opacity: 1.0}, timing).fadeOut('slow', function(){if(this.parentNode){$(this).remove();}});
		}
		$('#close-style-box').click(function(){$('#sn_alert_popID').remove()})
}	
var xPos=0;
var yPos=0;
jQuery(document).ready(function(){
	$().click(function(e){
		xPos=e.pageX;
		yPos=e.pageY;
	}); 
})
var sendAlertAtCursor = function(mess){
	$(".sn_alert_pop").remove();
	$(".sn_alert_pop2").remove();
	//alert(xPos+" "+yPos);
	$('#sn_wrap').before('<div class="sn_alert_pop" style="display:none" id="sn_alert_popID">'+mess+'<span id="close-style-box">X</span></div>');

	$('#sn_alert_popID').css("position","absolute");
	$('#sn_alert_popID').css("left",(xPos+($('#sn_alert_popID').width()/2)));
	$('#sn_alert_popID').css("top",(yPos));


	$('#sn_alert_popID').fadeIn('slow');
	$('#close-style-box').click(function(){$('#sn_alert_popID').remove();});

}

function showContentFields(contentType){
	var activeButtonClass = 'submit_btn';
	var deactiveButtonClass = 'contest_cancel_btn';
	$('#accountOptionalForm_type').val(contentType);
	if(contentType == 'IMAGE'){
		$('.sn_accountOptionalForm_ugcVideoWrapperFormFields').css('display','none');
		addContentFields(contentType);
		$('#sn_accountOptionalForm_videoWrapper').html('');
		$('.sn_accountOptionalForm_ugcPhotoWrapperFormFields').css('display','block');
		$('#sn_accountOptionalForm_photo button').removeClass(deactiveButtonClass).addClass(activeButtonClass);
		$('#sn_accountOptionalForm_video button').removeClass(activeButtonClass).addClass(deactiveButtonClass);

	}else{
		$('.sn_accountOptionalForm_ugcPhotoWrapperFormFields').css('display','none');
		$('#sn_accountOptionalForm_videoWrapper').html(contentVideoHtml);
		$('#sn_accountOptionalForm_photoWrapper').html('');
		contentPhotoCount = 0;
		$('.sn_accountOptionalForm_ugcVideoWrapperFormFields').css('display','block');
		$('#sn_accountOptionalForm_video button').removeClass(deactiveButtonClass).addClass(activeButtonClass);
		$('#sn_accountOptionalForm_photo button').removeClass(activeButtonClass).addClass(deactiveButtonClass);
		$('#sn_accountOptionalForm_addphoto button').removeClass(deactiveButtonClass).addClass(activeButtonClass);
	}
}

function addContentFields(contentType){
	
	var activeButtonClass = 'submit_btn';
	var deactiveButtonClass = 'contest_cancel_btn';

	if(contentType == 'IMAGE'){
		if(contentPhotoCount<photoLimit)
		{
			var fromTitleId = 'accountOptionalForm_contenttitle[]_div';
			var fromFileId = 'accountOptionalForm_content[]_div';

			var toTitleId = 'accountOptionalForm_contenttitle_div';
			var toFileId = 'accountOptionalForm_content_div';

			var photoHtml = contentPhotoHtml;
			contentPhotoCount = contentPhotoCount + 1;
			photoHtml = photoHtml.replace(fromTitleId, toTitleId+'_'+contentPhotoCount);
			photoHtml = photoHtml.replace(fromFileId, toFileId+'_'+contentPhotoCount);
			$('#sn_accountOptionalForm_photoWrapper').append(photoHtml);
			if(contentPhotoCount==photoLimit)
			{
				//$('#sn_accountOptionalForm_photo button').removeClass(activeButtonClass).addClass(deactiveButtonClass);
				$('#sn_accountOptionalForm_addphoto button').removeClass(activeButtonClass).addClass(deactiveButtonClass);	
			}
		}
		else
		{
			//$('#sn_accountOptionalForm_photo button').removeClass(activeButtonClass).addClass(deactiveButtonClass);
			$('#sn_accountOptionalForm_addphoto button').removeClass(activeButtonClass).addClass(deactiveButtonClass);			
		}
	}else{
	}
}

function removeContentFields(contentType){
	var activeButtonClass = 'submit_btn';
	var deactiveButtonClass = 'contest_cancel_btn';
	if(contentType == 'IMAGE'){
		
		var toTitleId = 'accountOptionalForm_contenttitle_div';
		var toFileId = 'accountOptionalForm_content_div';

		$('#'+toTitleId+'_'+contentPhotoCount).remove();
		$('#'+toFileId+'_'+contentPhotoCount).remove();
		contentPhotoCount = contentPhotoCount - 1;
		if(0 == contentPhotoCount){
			$('#sn_accountOptionalForm_video button').removeClass(deactiveButtonClass).addClass(activeButtonClass);
			$('#sn_accountOptionalForm_photo button').removeClass(deactiveButtonClass).addClass(activeButtonClass);
			$('#sn_accountOptionalForm_photoWrapper').html('');
			$('.sn_accountOptionalForm_ugcPhotoWrapperFormFields').css('display','none');
			$('#accountOptionalForm_type').val('');
		}

		if(contentPhotoCount<photoLimit)
		{
			$('#sn_accountOptionalForm_photo button').removeClass(deactiveButtonClass).addClass(activeButtonClass);
			$('#sn_accountOptionalForm_addphoto button').removeClass(deactiveButtonClass).addClass(activeButtonClass);
		}
	}else{
		$('#sn_accountOptionalForm_video button').removeClass(deactiveButtonClass).addClass(activeButtonClass);
		$('#sn_accountOptionalForm_photo button').removeClass(deactiveButtonClass).addClass(activeButtonClass);
		$('#sn_accountOptionalForm_videoWrapper').html('');
		$('.sn_accountOptionalForm_ugcVideoWrapperFormFields').css('display','none');
		$('#accountOptionalForm_type').val('');
	}
}

function allowNumerics(e){
/*
backspace => 8
delete, "." => 46
left, "%" => 37
right, "'" => 39
*/
	var key;
	key = e.which ? e.which : e.keyCode;
	if((key>=48 && key<=57) || (key == 8)) {
		return true;
	} else {
		return false;
	}	
}
