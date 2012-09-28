function addBookmark(title,url){
if (window.sidebar) // firefox
    window.sidebar.addPanel(title, url, "");
else if(window.opera && window.print){ // opera
    var elem = document.createElement('a');
    elem.setAttribute('href',url);
    elem.setAttribute('title',title);
    elem.setAttribute('rel','sidebar');
    elem.click();
} 
else if(document.all)// ie
    window.external.AddFavorite(url, title);
}
function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}
function show_tab(the_tab) {
		tab_info = the_tab.metadata();
		$("#" + tab_info.name + " " + "a.show-tab").parent().removeClass("show-tab-selected");
		$("#" + tab_info.name + " " + ".tab").hide();
		the_tab.parent().addClass("show-tab-selected");
		$("#" + tab_info.name + " " + ".tab-" + tab_info.tab).show();
}
function favorite(action,game) {
	$.get("/game/"+ action +"Favorite/" + game,'',function(response){
		$(".button_favorite").hide();
		if(action=="add"){
			$(".button_favorite_remove").show();
		} else {
			$(".button_favorite_add").show();
		}
	});
}
/*function comments_showResponse(responseText, statusText) {
	if(responseText=="RATE") {
		$("#comments").prepend("<div class='error'><p>You must wait a few minutes to post another comment!</p></div>");
	} else if (responseText == "NO_EMAIL") {
		$("#comments").prepend("<div class='error'><p>You must confirm your email address before adding a comment. Please check your email or <a href='/user/resendEmailConfirmation'>click here</a> to resend.</p></div>");
	} else if(responseText == "false") {
		alert("An error ocurred");
	}else{
		$("#comments").prepend(responseText);
		
		$("#comments .comment:first-child .game_wall_post").effect("highlight", {}, 8000);
		var myComment = $("#comments a:first-child").attr("name");
		$("#add_comment .button").removeAttr('disabled');
		comments_delete_buttons();
	}
}*/
function validate() {
	var text = $("#add_comment textarea#body").val();
	var subject = $("#add_comment textarea#subject").val();
	if(!text || !subject) {
		return false;
	} else {
		$("#comments .error").remove();
		return true;
	}
}
function clearLogin(){
	var username = $('form#header-login input.username').val();
	var somethingrandom = $('form#header-login input.somethingrandom').val();
	
	if (username == "Usnermae" || somethingrandom == "Password"){
		$('form#header-login input.username').val('');
		$('form#header-login input.somethingrandom').parent().remove();
		$('form#header-login input.password').parent().show();
	}
}
function comments_delete_buttons() {
	$('#comments a.delete, .comments a.delete').live("click", function(){
		var answer = confirm('Are you sure you want to delete this comment?');
		if (answer) {
			$("#comments .error").remove();
			$.get($(this).attr('href'),'',$(this).parent().parent().parent().remove());
		}
		return false;
	});
	$('#comments a.report, .comments a.report').live("click", function(){
		var answer = confirm('Are you sure you want to report this comment?');
		if (answer) {
			$.get($(this).attr('href'),'',function(response){
				alert(response);
			});
		}
		return false;
	});
	$('#blog-posts a.report').live("click", function(){
		var answer = confirm('Are you sure you want to report this post?');
		if (answer) {
			$.get($(this).attr('href'),'',function(response){
				alert(response);
			});
		}
		return false;
	});
	$('#video-report a').live("click", function(){
		var answer = confirm('Are you sure you want to report this video?');
		if (answer) {
			$.get($(this).attr('href'),'',function(response){
				alert(response);
			});
		}
		return false;
	});
}
function reply_comment(type, profileId){
	$('a.reply-comment').live('click', function() {
		var replyId = $(this).attr('rel');
		if($('div#reply-form').length!=0) {
			$('div#reply-form').remove();
		}
		$(this).parent().parent().parent().append('<div id="reply-form" class="reply-forms"><form class="reply-form" accept-charset="utf-8" method="post" action="/comment/add/'+profileId+'"><input type="hidden" name="type" value="'+type+'" /><input type="hidden" id="comment_id" name="comment_id" value="'+replyId+'"><textarea name="body" cols="5" rows="5"></textarea><button class="button button_small button_small_blue" type="submit"><span>Reply</span></button> or <a href="#" title="Cancel this reply" class="cancel-reply" rel="'+replyId+'">Cancel</a></form><br clear="all" /></div>');
		return false;
	});
	$('a.cancel-reply').live('click', function() {
		$('div#reply-form').remove();
	});
	var reply_options = { 
		success:       replies_showResponse,
		beforeSubmit:  validateReply,
		clearForm: true
	};
	$('form.reply-form').livequery("submit", function() { 
		$(this).ajaxSubmit(reply_options); 
		return false; 
	});
}

function comments_showResponse(responseText, statusText) {
	if($.trim(responseText)=="RATE") {
		$("#comments").prepend("<div class='error'><p>You must wait a few minutes to post another comment!</p></div>");
	} else if ($.trim(responseText) == "NO_EMAIL") {
		$("#comments").prepend("<div class='error'><p>You must confirm your email address before adding a comment. Please check your email or <a href='/user/resendEmailConfirmation'>click here</a> to resend.</p></div>");
	} else if($.trim(responseText) == "false") {
		alert("An error ocurred");
	}else{
            $("#comments").prepend(responseText);
            var myComment = $("#responses a:first-child").attr("name");
            $("#add_comment .button").removeAttr('disabled');
            comments_delete_buttons();
	}
}

function validateReply() {
	var text = $("#reply-form form textarea").val();
	if(!text) {
		return false;
	} else {
		$("#comments .error").remove();
		return true;
	}
}
function replies_showResponse(responseText, statusText) {
	if(responseText=="RATE") {
		$("#comments").prepend("<div class='error'><p>You must wait a few minutes to post another comment!</p></div>");
	} else if (responseText == "NO_EMAIL") {
		$("#comments").prepend("<div class='error'><p>You must confirm your email address before adding a comment. Please check your email or <a href='/user/resendEmailConfirmation'>click here</a> to resend.</p></div>");
	} else if(responseText == "false") {
		alert("An error ocurred");
	}else{
		loadContent("wall");
	}
}
var selectedQtip = null;
var Qtips={};
function registerQTip(){
	Qtips =(Qtips.length>0)?Qtips:$('a[rel*=register-qtip], button.register-qtip, a.register-qtip').live("click", function() {
            var self = this;
            $(this).qtip({
                content: "<div id='registerAnAccount'><h3>Register a free acount today!</h3><p>You don't have an account yet? What are you waiting? <a href='/user/signup' title=''>Register a free</a> account with us today and you will be able to:</p><ul><li>Post comments</li><li>Create and manage your own blogs.</li><li>Have a profile and save your favorite games,videos and blogs.</li><li>Interact with the bored.com community.</li><li>Report and rate games,pictures,videos and blogs.</li></ul><p>If you already have an account, please <a href='/auth/login' title='Login into your account'"+((typeof(window.object_options)!="undefined")?" onclick='showAjaxLogin(this);return false;'":"")+">login</a> here.</p></div>",
                show: {
                when: false, // Don't specify a show event
                ready: true // Show the tooltip when ready
             },
             hide: 'unfocus', // Hide it when inactive...
                position: {
                    corner: {
                        target: 'bottomMiddle',
                        tooltip: 'topLeft'
                    }
                },
             style: {
                width:{max:280},
                border: {
                   width: 5,
                   radius: 10
                },
                padding: 10,
                textAlign: 'left',
                tip: true, // Give it a speech bubble tip with automatic corner detection
                name: 'cream' // Style it according to the preset 'cream' style
             },
             api:{
                 onShow:function(){
                     selectedQtip = $(self);
                 }
             }
            });
	});
}
$(document).ready(function() {
	$(".small_button").blur();
	$("a.show-tab").click(function(){
		show_tab($(this));
	});
	$(".item .image img, .item-ad img.overlay").hover(function(){
		$(this).fadeTo("fast", 0.3).fadeTo("fast", 0.3).fadeTo("fast", 0.3).fadeTo("fast", 1.0).fadeTo("fast", 0.5).fadeTo("fast", 1.0);
	},function(){

	});
	$('form.search-form').submit(function() {
		if ($("form.search-form input#query").val() == "" || $("form.search-form input#query").val() == "Search...") {
        return false;
      }
	});
	$('form.search-form input#query').attr("value", "Search...").css({'font-style' : 'italic', 'color' : '#7F7F7F'});
	$('form.search-form input#query').focus(function() {
		if ($(this).attr("value") == "Search...") {
			$(this).attr("value", "").css({'font-style' : '', 'color' : ''});
		}
	});
	$('a.add_friend').click(function(){
		$.get($(this).attr('href'),function(data){
		    $('a.add_friend').hide();
			$('a.remove_friend').show();
		});
	});
	$('a.remove_friend').click(function(){
		$.get($(this).attr('href'),function(data){
		    $('a.remove_friend').hide();
			$('a.add_friend').show();
		});
	});
        registerQTip();
});
function destroyqTip(){
    Qtips.unbind("click");
    Qtips.each(
        function (i,elem){
            try{
                $(elem).qtip("hide");
            }catch(e){}
        }
    );
    Qtips.removeAttr("rel").removeAttr("onclick").removeClass("register-qtip");
}
function bindCommentSubmit2button(){
    $("#add_comment .button").click(
        function(){
            if(validate()){
                $('#add_comment').trigger("submit");
            }
            return false;
        }
    );
}
var ajaxLoginHandler = false;
function showAjaxLogin(ob){
    var self = this;
    try{
        var selfob = $(ob).parent().parent();
        if(selfob.find("#inplace-ajax-login").length==0){
            self.ajaxLogin = $('<div id="inplace-ajax-login"><form method="post" action="/auth/processLogin"><ul><li><label for="username">Username: </label><input type="text" class="textfield username" value="" name="username"></li><li><label for="password">Password:</label><input type="password" class="textfield password" value="" name="password"></li><li class="ajax-loading"></li><li><button type="submit" class="button submit button_medium button_medium_blue" value="Login" name="submit"><span>Login</span></button></li></ul></form></div>').hide().appendTo(selfob).fadeIn();
            self.ajaxLogin.find("form").bind('submit',
                function(){
                    self.json={};
                    self.username = self.ajaxLogin.find("[name=username]").val();
                    $.ajax(
                        {
                            url:'/auth/processLogin',
                            type:'post',
                            data:{"username":self.ajaxLogin.find("[name=username]").val(),"password":self.ajaxLogin.find("[name=password]").val(),"type":"ajax"},
                            beforeSend:function(){
                                selfob.find(".ajax-loading")
                                .css(
                                    {
                                        "font-size":"10px",
                                        "color":"#398EE8",
                                        "text-align":"left",
                                        "padding":"0 15px"
                                    }
                                )
                                .html("sending request ...");
                            },
                            success:function(response){
                                ajaxLoginHandler = true;
                                selfob
                                    .find(".ajax-loading")
                                    .css(
                                        {
                                            "color":"green"
                                        }
                                    )
                                    .html("Success!");
                                eval('self.response='+response+';');
                                if(self.response.loggedin==true){
                                    try{destroyqTip();}catch(e){if(typeof(console)!="undefined"){console.log(e);}}
                                    $.getJSON('/media/isfavorite', {objectType:window.object_options.object_type,objectId:object_options.object_id},
                                        function(favorite_response){
                                            if(favorite_response.response=="IS_FAV"){
                                                $("#favorites-buttons .button_favorite_remove").show();
                                                $("#favorites-buttons .button_favorite_add").hide();
                                            }else{
                                                $("#favorites-buttons .button_favorite_add").show();
                                                $("#favorites-buttons .button_favorite_remove").hide();
                                            }
                                        }
                                    );

                                    $(".video-report").attr("id","video-report");
                                    $(".video-report a").attr("onclick","");
                                    $("#header").find(".login-bar").html('');
                                    if(self.response.user_details!=null){
                                        $(".login-bar")
                                            .html('<div class="loggedin clearfix"><div class="col2-1"><img width="38px" alt="Avatar" class="avatar" src="'+((self.response.user_details.avatar_url==null)?'/images/avatar/avatar-150x150.jpg':self.response.user_details.avatar_url)+'"></div><div class="col2-2"><p>You are logged in as: <a title="" href="'+self.response.user_details.profile_url+'">'+self.username+'</a></p><p><a href="/auth/logout">Log out</a></p></div></div>')
                                            .css({
                                                "background":'url("/images/bg-register-logged2.png") no-repeat scroll 0 0 transparent',
                                                "float":"right",
                                                "width":"230px"
                                            });
                                    }
                                    if($("#upload-a-video").length==0){
                                        var upvideo  = $('<div style="margin-bottom: 10px;"><a id="upload-a-video" title="" href="/media/add?page=video"><img alt="" src="http://cdn1.image.bored.com/images/upload_movie.jpg"></a></div>');
                                        upvideo.prependTo($("#videos .col2-2"));
                                    }
                                    try{bindCommentSubmit2button();}catch(e){if(typeof(console)!="undefined"){console.log(e);}}
                                    selectedQtip.trigger("click");
                                    selectedQtip=null;
                                }else{
                                selfob
                                    .find(".ajax-loading")
                                    .css(
                                        {
                                            "color":"red"
                                        }
                                    )
                                    .html("Your user or password is invalid. Please try again.");
                                }
                            }
                        }
                    );
                    return false;
                }
            );
        }
    }catch(e){if(typeof(console)!="undefined"){console.log(e);}}
    return false;
}

function getPageURL(minus){
if(minus!=''){
var uri_split = document.location.href.split('/');
var page_url = '';
for (i=0; i < uri_split.length-minus; i++){
    page_url += uri_split[i]+'/';
}
return page_url;
}else{
    return false;
}
}

function log(something){
    if(typeof(console)!="undefined"){
        console.log(something);
    }else{
        alert(something);
    }
}

function showCloseBt(){
	$("#stickmanSwfWrapper a").fadeIn();					
}

function hideStickman(){
	$('#stickmanSwfWrapper').fadeOut();
}

$(document).ready(function() {
	// TOGGLE HEADER FROM STATIC TO RELATIVE
	$("#toggle").click(function () {
		$("#toggle").toggleClass('view');
		$("#header").toggleClass('relative');
		$("#mainContainer").toggleClass('relative');
	});
	
	$('#loginBt').click(function () {
		$('#loginBt').toggleClass('active');
		$('#header-login').toggleClass('show');	
	});
	
	$('#mainContainer').mouseover(function () {
		$('#loginBt').removeClass('active');
		$('#header-login').removeClass('show');
	});
	
	$('.boxgrid.caption').hover(function(){
            $(".cover", this).find('h5').css('color','#0060B2');
        }, function() {
            $(".cover", this).find('h5').css('color','#000000');
        });
	
	
});

